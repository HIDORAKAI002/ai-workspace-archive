/**
 * Test Service
 *
 * This service provides API integration with the existing CLI testing,
 * handling test execution requests and providing detailed results.
 */

import { randomUUID } from 'crypto';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, mkdir, rm, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { TestRunner } from '../../cli/utils/test-runner.js';
import { planTests } from '../../cli/utils/test-planner.js';
import { logger } from '../../cli/utils/logger.js';
import {
  TestRequest,
  TestResponse,
  TestOptions,
  GeneratedFile,
  TestReport,
  CoverageReport,
  JobInfo,
  ApiError,
} from '../types/api.js';
import { TestResult, TestConfiguration } from '../../cli/types.js';
import { EventEmitter } from 'events';

/**
 * Test job tracking
 */
interface TestJob {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  startedAt?: Date;
  completedAt?: Date;
  result?: TestResponse;
  error?: ApiError;
  tempDir?: string;
  emitter: EventEmitter;
}

/**
 * Test Service class
 */
export class TestService extends EventEmitter {
  private jobs: Map<string, TestJob> = new Map();
  private tempDir: string;

  constructor() {
    super();
    this.tempDir = join(tmpdir(), 'flowise-api-testing');
    this.ensureTempDir();
  }

  /**
   * Ensure temp directory exists
   */
  private async ensureTempDir(): Promise<void> {
    if (!existsSync(this.tempDir)) {
      await mkdir(this.tempDir, { recursive: true });
    }
  }

  /**
   * Run tests on generated code
   */
  public async runTests(request: TestRequest): Promise<TestResponse> {
    const jobId = randomUUID();
    const job: TestJob = {
      id: jobId,
      status: 'queued',
      progress: 0,
      emitter: new EventEmitter(),
    };

    this.jobs.set(jobId, job);

    try {
      // Update job status
      job.status = 'running';
      job.startedAt = new Date();
      this.emitProgress(job, 10, 'Preparing test environment...');

      // Create temporary workspace
      const workspaceDir = join(this.tempDir, jobId);
      await mkdir(workspaceDir, { recursive: true });
      job.tempDir = workspaceDir;

      // Setup test project structure
      await this.setupTestProject(workspaceDir, request.files);
      this.emitProgress(job, 30, 'Setting up test configuration...');

      // Create test configuration
      const testConfig = this.createTestConfiguration(
        workspaceDir,
        request.options || {}
      );

      // Initialize test runner
      const testRunner = new TestRunner(testConfig);
      await testRunner.setupEnvironment();

      this.emitProgress(job, 50, 'Running tests...');

      // Run tests based on type
      let testResult: TestResult;
      const testType = request.options?.testType || 'all';

      switch (testType) {
        case 'unit':
          testResult = await testRunner.runUnitTests();
          break;
        case 'integration':
          testResult = await testRunner.runIntegrationTests();
          break;
        case 'e2e':
          testResult = await testRunner.runE2ETests();
          break;
        case 'all':
        default:
          // Run all test types sequentially
          const unitResult = await testRunner.runUnitTests();
          const integrationResult = await testRunner.runIntegrationTests();
          const e2eResult = await testRunner.runE2ETests();

          // Combine results
          testResult = {
            success:
              unitResult.success &&
              integrationResult.success &&
              e2eResult.success,
            totalTests:
              unitResult.totalTests +
              integrationResult.totalTests +
              e2eResult.totalTests,
            passedTests:
              unitResult.passedTests +
              integrationResult.passedTests +
              e2eResult.passedTests,
            failedTests: [
              ...unitResult.failedTests,
              ...integrationResult.failedTests,
              ...e2eResult.failedTests,
            ],
            duration:
              unitResult.duration +
              integrationResult.duration +
              e2eResult.duration,
            coverage:
              unitResult.coverage ||
              integrationResult.coverage ||
              e2eResult.coverage,
          };
          break;
      }

      this.emitProgress(job, 80, 'Generating test report...');

      // Generate test report if requested
      let report: TestReport | undefined;
      if (request.options?.generateReport) {
        report = await this.generateTestReport(testResult, workspaceDir);
      }

      this.emitProgress(job, 90, 'Collecting generated test files...');

      // Collect generated test files
      const testFiles = await this.collectTestFiles(workspaceDir);

      // Build response
      const response: TestResponse = {
        jobId,
        results: testResult,
        report,
        testFiles,
      };

      // Update job status
      job.status = 'completed';
      job.completedAt = new Date();
      job.result = response;
      job.progress = 100;
      this.emitProgress(job, 100, 'Testing completed!');

      // Emit completion event
      this.emit('test:completed', {
        jobId,
        result: response,
      });

      return response;
    } catch (error) {
      // Handle test error
      const apiError: ApiError = {
        code: 'TEST_ERROR',
        message: error instanceof Error ? error.message : 'Unknown test error',
        details: error,
      };

      job.status = 'failed';
      job.completedAt = new Date();
      job.error = apiError;

      this.emit('test:failed', {
        jobId,
        error: apiError,
      });

      throw apiError;
    } finally {
      // Clean up temporary files after a delay
      setTimeout(() => {
        if (job.tempDir) {
          rm(job.tempDir, { recursive: true, force: true }).catch(
            console.error
          );
        }
      }, 60000); // Clean up after 1 minute
    }
  }

  /**
   * Get job status
   */
  public getJobStatus(jobId: string): JobInfo | null {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    return {
      id: job.id,
      type: 'test',
      status: job.status,
      progress: job.progress,
      createdAt: job.startedAt?.toISOString() || new Date().toISOString(),
      startedAt: job.startedAt?.toISOString(),
      completedAt: job.completedAt?.toISOString(),
      result: job.result,
      error: job.error,
    };
  }

  /**
   * Cancel a test job
   */
  public async cancelJob(jobId: string): Promise<boolean> {
    const job = this.jobs.get(jobId);
    if (!job || job.status !== 'running') return false;

    job.status = 'cancelled';
    job.completedAt = new Date();

    // Clean up temporary files
    if (job.tempDir) {
      await rm(job.tempDir, { recursive: true, force: true }).catch(
        console.error
      );
    }

    this.emit('test:cancelled', { jobId });
    return true;
  }

  /**
   * Get all jobs
   */
  public getAllJobs(): JobInfo[] {
    return Array.from(this.jobs.values()).map((job) => ({
      id: job.id,
      type: 'test',
      status: job.status,
      progress: job.progress,
      createdAt: job.startedAt?.toISOString() || new Date().toISOString(),
      startedAt: job.startedAt?.toISOString(),
      completedAt: job.completedAt?.toISOString(),
      result: job.result,
      error: job.error,
    }));
  }

  /**
   * Subscribe to job progress updates
   */
  public subscribeToJob(
    jobId: string,
    callback: (progress: any) => void
  ): () => void {
    const job = this.jobs.get(jobId);
    if (!job) return () => {};

    const handler = (progress: any) => callback(progress);
    job.emitter.on('progress', handler);

    return () => {
      job.emitter.removeListener('progress', handler);
    };
  }

  /**
   * Clean up completed jobs
   */
  public cleanupJobs(
    olderThan: Date = new Date(Date.now() - 24 * 60 * 60 * 1000)
  ): void {
    for (const [jobId, job] of this.jobs.entries()) {
      if (job.completedAt && job.completedAt < olderThan) {
        this.jobs.delete(jobId);
      }
    }
  }

  /**
   * Setup test project structure
   */
  private async setupTestProject(
    workspaceDir: string,
    files: GeneratedFile[]
  ): Promise<void> {
    // Create directories
    await mkdir(join(workspaceDir, 'src'), { recursive: true });
    await mkdir(join(workspaceDir, 'tests'), { recursive: true });

    // Write generated files
    for (const file of files) {
      const filePath = join(workspaceDir, file.path);
      await mkdir(join(filePath, '..'), { recursive: true });
      await writeFile(filePath, file.content);
    }

    // Create package.json
    const packageJson = {
      name: 'flowise-test-project',
      version: '1.0.0',
      type: 'module',
      scripts: {
        test: 'jest',
        'test:watch': 'jest --watch',
        'test:coverage': 'jest --coverage',
      },
      devDependencies: {
        '@jest/globals': '^29.7.0',
        '@types/jest': '^29.5.12',
        '@types/node': '^20.14.15',
        jest: '^29.7.0',
        'ts-jest': '^29.2.4',
        typescript: '^5.5.4',
      },
      dependencies: {
        '@langchain/core': '^0.2.30',
        '@langchain/openai': '^0.2.7',
        langchain: '^0.2.17',
      },
    };

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create jest configuration
    const jestConfig = {
      preset: 'ts-jest',
      testEnvironment: 'node',
      roots: ['<rootDir>/src', '<rootDir>/tests'],
      testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/**/*.test.ts',
        '!src/**/*.spec.ts',
      ],
      coverageDirectory: 'coverage',
      coverageReporters: ['text', 'lcov', 'html'],
    };

    await writeFile(
      join(workspaceDir, 'jest.config.js'),
      `module.exports = ${JSON.stringify(jestConfig, null, 2)};`
    );

    // Create TypeScript configuration
    const tsConfig = {
      compilerOptions: {
        target: 'es2022',
        module: 'esnext',
        moduleResolution: 'node',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        declaration: true,
        outDir: './dist',
        rootDir: './src',
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist', 'tests'],
    };

    await writeFile(
      join(workspaceDir, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );
  }

  /**
   * Create test configuration
   */
  private createTestConfiguration(
    workspaceDir: string,
    options: TestOptions
  ): TestConfiguration {
    return {
      inputPath: join(workspaceDir, 'input.json'), // Placeholder
      outputPath: workspaceDir,
      testType: options.testType || 'all',
      timeout: options.timeout || 30000,
      envFile: options.envFile || '.env.test',
      mockExternal: options.mockExternal !== false,
      generateReport: options.generateReport !== false,
      fixTests: false,
      dryRun: false,
    };
  }

  /**
   * Generate test report
   */
  private async generateTestReport(
    testResult: TestResult,
    workspaceDir: string
  ): Promise<TestReport> {
    // Generate HTML report
    const htmlReport = this.generateHTMLReport(testResult);

    // Generate JSON report
    const jsonReport = {
      testResults: testResult,
      timestamp: new Date().toISOString(),
      summary: {
        total: testResult.totalTests,
        passed: testResult.passedTests,
        failed: testResult.failedTests.length,
        duration: testResult.duration,
        success: testResult.success,
      },
    };

    // Generate coverage report (if available)
    let coverageReport: CoverageReport | undefined;
    try {
      const coveragePath = join(workspaceDir, 'coverage/coverage-final.json');
      if (existsSync(coveragePath)) {
        const coverageData = JSON.parse(await readFile(coveragePath, 'utf-8'));
        coverageReport = this.processCoverageData(coverageData);
      }
    } catch (error) {
      logger.warn('Failed to generate coverage report:', { error });
    }

    return {
      html: htmlReport,
      json: jsonReport,
      coverage: coverageReport,
    };
  }

  /**
   * Generate HTML test report
   */
  private generateHTMLReport(testResult: TestResult): string {
    const status = testResult.success ? 'SUCCESS' : 'FAILURE';
    const statusColor = testResult.success ? '#4CAF50' : '#F44336';

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: ${statusColor}; color: white; padding: 20px; border-radius: 5px; }
        .summary { margin: 20px 0; }
        .test-case { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 3px; }
        .passed { background: #f0f8f0; }
        .failed { background: #f8f0f0; }
        .error { color: #d32f2f; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Test Report - ${status}</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
      </div>
      
      <div class="summary">
        <h2>Summary</h2>
        <p>Total Tests: ${testResult.totalTests}</p>
        <p>Passed: ${testResult.passedTests}</p>
        <p>Failed: ${testResult.failedTests.length}</p>
        <p>Duration: ${testResult.duration}ms</p>
      </div>
      
      <div class="failures">
        <h2>Failed Tests</h2>
        ${testResult.failedTests
          .map(
            (test) => `
          <div class="test-case failed">
            <h3>${test.name}</h3>
            <div class="error">${test.error}</div>
            ${test.suggestion ? `<p><strong>Suggestion:</strong> ${test.suggestion}</p>` : ''}
          </div>
        `
          )
          .join('')}
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Process coverage data
   */
  private processCoverageData(coverageData: any): CoverageReport {
    // Extract coverage metrics from Jest coverage format
    const totals = coverageData.total || {};

    return {
      total: totals.lines?.pct || 0,
      lines: totals.lines?.pct || 0,
      branches: totals.branches?.pct || 0,
      functions: totals.functions?.pct || 0,
      statements: totals.statements?.pct || 0,
    };
  }

  /**
   * Collect generated test files
   */
  private async collectTestFiles(
    workspaceDir: string
  ): Promise<GeneratedFile[]> {
    const testFiles: GeneratedFile[] = [];
    const testDir = join(workspaceDir, 'tests');

    if (existsSync(testDir)) {
      const { readdir, stat } = await import('fs/promises');
      const files = await readdir(testDir);

      for (const file of files) {
        const filePath = join(testDir, file);
        const stats = await stat(filePath);

        if (stats.isFile() && file.endsWith('.ts')) {
          const content = await readFile(filePath, 'utf-8');
          testFiles.push({
            path: `tests/${file}`,
            content,
            type: 'test',
            size: stats.size,
            language: 'typescript',
          });
        }
      }
    }

    return testFiles;
  }

  /**
   * Emit progress update
   */
  private emitProgress(
    job: TestJob,
    progress: number,
    step: string,
    details?: string
  ): void {
    job.progress = progress;

    const progressMessage = {
      jobId: job.id,
      progress,
      step,
      details,
    };

    job.emitter.emit('progress', progressMessage);
    this.emit('job:progress', progressMessage);
  }
}
