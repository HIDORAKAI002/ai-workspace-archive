/**
 * Conversion Service
 *
 * This service provides API integration with the existing CLI converter,
 * handling file conversion requests and streaming results.
 */

import { randomUUID } from 'crypto';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, readFile, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { ConverterPipeline } from '../../converter.js';
import { FlowiseToLangChainConverter } from '../../index.js';
import { logger } from '../../cli/utils/logger.js';
import {
  ConvertRequest,
  ConvertResponse,
  ConversionOptions,
  GeneratedFile,
  ConversionMetrics,
  FlowAnalysis,
  JobInfo,
  ProgressMessage,
  ApiError,
} from '../types/api.js';
import { EventEmitter } from 'events';

/**
 * Job status tracking
 */
interface ConversionJob {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  startedAt?: Date;
  completedAt?: Date;
  result?: ConvertResponse;
  error?: ApiError;
  inputPath?: string;
  outputPath?: string;
  tempDir?: string;
  emitter: EventEmitter;
}

/**
 * Conversion Service class
 */
export class ConversionService extends EventEmitter {
  private jobs: Map<string, ConversionJob> = new Map();
  private converter: FlowiseToLangChainConverter;
  private pipeline: ConverterPipeline;
  private tempDir: string;

  constructor() {
    super();
    this.tempDir = join(tmpdir(), 'flowise-api-conversions');
    this.converter = new FlowiseToLangChainConverter();
    this.pipeline = new ConverterPipeline({
      verbose: false,
      silent: false,
    });
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
   * Convert Flowise flow to LangChain code
   */
  public async convert(request: ConvertRequest): Promise<ConvertResponse> {
    const jobId = randomUUID();
    const job: ConversionJob = {
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
      this.emitProgress(job, 10, 'Preparing conversion...');

      // Create temporary workspace
      const workspaceDir = join(this.tempDir, jobId);
      await mkdir(workspaceDir, { recursive: true });
      job.tempDir = workspaceDir;

      // Process input (either file path or JSON content)
      let inputPath: string;
      if (typeof request.input === 'string') {
        // Assume it's a file path
        inputPath = request.input;
      } else {
        // It's JSON content, write to temp file
        inputPath = join(workspaceDir, 'input.json');
        await writeFile(inputPath, JSON.stringify(request.input, null, 2));
      }

      job.inputPath = inputPath;
      this.emitProgress(job, 20, 'Validating input...');

      // Set up output directory
      const outputDir = join(workspaceDir, 'output');
      await mkdir(outputDir, { recursive: true });
      job.outputPath = outputDir;

      this.emitProgress(job, 30, 'Starting conversion...');

      // Convert options from API format to CLI format
      const conversionOptions = this.mapApiOptionsToCliOptions(
        request.options || {}
      );

      // Run the conversion using the existing pipeline
      const startTime = Date.now();
      const result = await this.pipeline.convertFile(inputPath, {
        outputPath: outputDir,
        includeLangfuse: conversionOptions.withLangfuse,
        target: 'typescript',
        outputFormat: conversionOptions.outputFormat || 'esm',
        includeComments: conversionOptions.includeComments !== false,
        overwrite: true,
        verbose: conversionOptions.verbose || false,
        silent: false,
      });

      const duration = Date.now() - startTime;
      this.emitProgress(job, 80, 'Processing results...');

      if (!result.success) {
        throw new Error(`Conversion failed: ${result.errors.join(', ')}`);
      }

      this.emitProgress(job, 90, 'Finalizing...');

      // Read generated files
      const files = await this.readGeneratedFiles(result.files);

      // Build response
      const response: ConvertResponse = {
        jobId,
        files,
        metrics: {
          duration,
          nodesProcessed: result.analysis.nodeCount,
          filesGenerated: result.files.length,
          totalSize: result.metrics.totalBytes,
          memoryUsage: process.memoryUsage().heapUsed,
          cpuUsage: process.cpuUsage().system,
        },
        analysis: {
          nodeCount: result.analysis.nodeCount,
          connectionCount: result.analysis.connectionCount,
          supportedTypes: result.analysis.supportedTypes,
          unsupportedTypes: result.analysis.unsupportedTypes,
          coverage: result.analysis.coverage,
          complexity: result.analysis.complexity,
          flowVersion: this.extractFlowVersion(result),
        },
        warnings: result.warnings,
        errors: result.errors,
      };

      // Update job status
      job.status = 'completed';
      job.completedAt = new Date();
      job.result = response;
      job.progress = 100;
      this.emitProgress(job, 100, 'Conversion completed!');

      // Emit completion event
      this.emit('conversion:completed', {
        jobId,
        result: response,
        duration,
      });

      return response;
    } catch (error) {
      // Handle conversion error
      const apiError: ApiError = {
        code: 'CONVERSION_ERROR',
        message:
          error instanceof Error ? error.message : 'Unknown conversion error',
        details: error,
      };

      job.status = 'failed';
      job.completedAt = new Date();
      job.error = apiError;

      this.emit('conversion:failed', {
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
      type: 'convert',
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
   * Cancel a conversion job
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

    this.emit('conversion:cancelled', { jobId });
    return true;
  }

  /**
   * Get all jobs
   */
  public getAllJobs(): JobInfo[] {
    return Array.from(this.jobs.values()).map((job) => ({
      id: job.id,
      type: 'convert',
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
    callback: (progress: ProgressMessage) => void
  ): () => void {
    const job = this.jobs.get(jobId);
    if (!job) return () => {};

    const handler = (progress: ProgressMessage) => callback(progress);
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
   * Map API options to CLI options
   */
  private mapApiOptionsToCliOptions(apiOptions: ConversionOptions): any {
    return {
      withLangfuse: apiOptions.withLangfuse || false,
      format: apiOptions.format || 'typescript',
      target: apiOptions.target || 'node',
      includeTests: apiOptions.includeTests || false,
      includeDocs: apiOptions.includeDocs || false,
      includeComments: apiOptions.includeComments !== false,
      outputFormat: apiOptions.outputFormat || 'esm',
      verbose: apiOptions.verbose || false,
    };
  }

  /**
   * Read generated files from the output directory
   */
  private async readGeneratedFiles(
    filePaths: Array<{
      path: string;
      relativePath: string;
      size: number;
      type: string;
    }>
  ): Promise<GeneratedFile[]> {
    const files: GeneratedFile[] = [];

    for (const file of filePaths) {
      try {
        const content = await readFile(file.path, 'utf-8');
        const language = this.detectLanguage(file.path);

        files.push({
          path: file.relativePath,
          content,
          type: file.type as any,
          size: file.size,
          language,
        });
      } catch (error) {
        logger.error(`Failed to read file ${file.path}:`, { error });
      }
    }

    return files;
  }

  /**
   * Detect programming language from file extension
   */
  private detectLanguage(filePath: string): string {
    const ext = filePath.split('.').pop()?.toLowerCase();

    switch (ext) {
      case 'ts':
        return 'typescript';
      case 'js':
        return 'javascript';
      case 'py':
        return 'python';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'yaml':
      case 'yml':
        return 'yaml';
      default:
        return 'text';
    }
  }

  /**
   * Extract flow version from conversion result
   */
  private extractFlowVersion(result: any): string | undefined {
    try {
      // Check if the result contains flow data with chatflow metadata
      if (result.flowData?.chatflow) {
        // If chatflow metadata exists, use its version or dates
        const chatflow = result.flowData.chatflow;
        if (chatflow.version) {
          return chatflow.version;
        }
        // Use updated date as version indicator
        if (chatflow.updatedDate) {
          return `flowise-${new Date(chatflow.updatedDate).toISOString().split('T')[0]}`;
        }
      }
      
      // Check node versions to determine Flowise version
      if (result.flowData?.nodes?.length > 0) {
        const nodeVersions = result.flowData.nodes
          .map((node: any) => node.data?.version || 0)
          .filter((v: number) => v > 0);
        
        if (nodeVersions.length > 0) {
          const maxVersion = Math.max(...nodeVersions);
          // Flowise 1.x typically has node versions 1-2
          // Flowise 2.x typically has node versions 3+
          if (maxVersion >= 3) {
            return 'flowise-2.x';
          } else if (maxVersion > 0) {
            return 'flowise-1.x';
          }
        }
      }
      
      // Default to unknown version
      return 'flowise-unknown';
    } catch (error) {
      console.error('Failed to extract flow version:', error);
      return undefined;
    }
  }
  
  /**
   * Emit progress update
   */
  private emitProgress(
    job: ConversionJob,
    progress: number,
    step: string,
    details?: string
  ): void {
    job.progress = progress;

    const progressMessage: ProgressMessage = {
      jobId: job.id,
      progress,
      step,
      details,
    };

    job.emitter.emit('progress', progressMessage);
    this.emit('job:progress', progressMessage);
  }
}
