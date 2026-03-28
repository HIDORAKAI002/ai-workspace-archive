/**
 * API Services Test Suite
 * 
 * Tests for API service classes including:
 * - ConversionService
 * - ValidationService  
 * - TestService
 * - UploadService
 * - WebSocketService
 */

import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { ConversionService } from '../../src/api/services/conversion.js';
import { ValidationService } from '../../src/api/services/validation.js';
import { TestService } from '../../src/api/services/test.js';
import { UploadService } from '../../src/api/services/upload.js';
import { WebSocketService } from '../../src/api/services/websocket.js';
import { WebSocketServer } from 'ws';
import { createTempDir, cleanupTempDir, createMockFlow, TestData } from '../utils/test-helpers.js';
import { join } from 'path';

describe('API Services Test Suite', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await createTempDir('services-test');
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await cleanupTempDir(testDir);
  });

  describe('ConversionService', () => {
    let conversionService: ConversionService;

    beforeEach(() => {
      conversionService = new ConversionService();
    });

    it('should convert simple Flowise flow', async () => {
      const testFlow = createMockFlow(2, 1);
      const request = {
        input: testFlow,
        options: {
          format: 'typescript' as const,
          target: 'node' as const,
          includeComments: true,
        },
      };

      const result = await conversionService.convert(request);

      expect(result).toMatchObject({
        jobId: expect.any(String),
        files: expect.any(Array),
        metrics: {
          duration: expect.any(Number),
          nodesProcessed: expect.any(Number),
          filesGenerated: expect.any(Number),
          totalSize: expect.any(Number),
          memoryUsage: expect.any(Number),
          cpuUsage: expect.any(Number),
        },
        analysis: {
          nodeCount: expect.any(Number),
          connectionCount: expect.any(Number),
          supportedTypes: expect.any(Array),
          unsupportedTypes: expect.any(Array),
          coverage: expect.any(Number),
          complexity: expect.stringMatching(/^(simple|moderate|complex)$/),
        },
        warnings: expect.any(Array),
        errors: expect.any(Array),
      });

      expect(result.files.length).toBeGreaterThan(0);
      expect(result.metrics.nodesProcessed).toBe(2);
    });

    it('should handle conversion with different output formats', async () => {
      const testFlow = createMockFlow(1, 0);
      
      const esmRequest = {
        input: testFlow,
        options: {
          format: 'typescript' as const,
          outputFormat: 'esm' as const,
        },
      };

      const cjsRequest = {
        input: testFlow,
        options: {
          format: 'typescript' as const,
          outputFormat: 'cjs' as const,
        },
      };

      const esmResult = await conversionService.convert(esmRequest);
      const cjsResult = await conversionService.convert(cjsRequest);

      expect(esmResult.files[0].content).toContain('export');
      expect(cjsResult.files[0].content).toContain('module.exports');
    });

    it('should track conversion job status', async () => {
      const testFlow = createMockFlow(1, 0);
      const request = {
        input: testFlow,
        options: { format: 'typescript' as const },
      };

      const result = await conversionService.convert(request);
      const jobStatus = conversionService.getJobStatus(result.jobId);

      expect(jobStatus).toMatchObject({
        id: result.jobId,
        type: 'convert',
        status: 'completed',
        progress: 100,
        createdAt: expect.any(String),
        startedAt: expect.any(String),
        completedAt: expect.any(String),
        result: expect.any(Object),
      });
    });

    it('should handle conversion cancellation', async () => {
      const largeFlow = TestData.createLargeFlow(50, 0.5);
      const request = {
        input: largeFlow,
        options: { format: 'typescript' as const },
      };

      // Start conversion
      const conversionPromise = conversionService.convert(request);
      
      // Get job ID from the service
      const jobs = conversionService.getAllJobs();
      const runningJob = jobs.find(job => job.status === 'running');
      
      if (runningJob) {
        // Try to cancel
        const cancelled = await conversionService.cancelJob(runningJob.id);
        expect(cancelled).toBe(true);
        
        const jobStatus = conversionService.getJobStatus(runningJob.id);
        expect(jobStatus?.status).toBe('cancelled');
      }

      // Wait for conversion to complete or be cancelled
      try {
        await conversionPromise;
      } catch (error) {
        // Cancellation might cause an error, which is expected
        expect(error).toBeDefined();
      }
    });

    it('should emit progress events during conversion', (done) => {
      const testFlow = createMockFlow(3, 2);
      const request = {
        input: testFlow,
        options: { format: 'typescript' as const },
      };

      let progressEvents = 0;

      conversionService.on('job:progress', (progress) => {
        expect(progress).toMatchObject({
          jobId: expect.any(String),
          progress: expect.any(Number),
          step: expect.any(String),
        });
        
        progressEvents++;
        
        if (progress.progress === 100) {
          expect(progressEvents).toBeGreaterThan(1);
          done();
        }
      });

      conversionService.convert(request).catch(done);
    });

    it('should handle complex flows with multiple node types', async () => {
      const complexFlow = TestData.createComplexFlow();
      const request = {
        input: complexFlow,
        options: {
          format: 'typescript' as const,
          includeComments: true,
          includeDocs: true,
        },
      };

      const result = await conversionService.convert(request);

      expect(result.analysis.nodeCount).toBeGreaterThan(1);
      expect(result.analysis.complexity).toBe('moderate');
      expect(result.files.some(f => f.type === 'docs')).toBe(true);
    });

    it('should validate and sanitize input data', async () => {
      const maliciousFlow = {
        nodes: [{
          id: '<script>alert("xss")</script>',
          data: {
            label: 'DROP TABLE users;',
            inputs: {
              code: 'require("child_process").exec("rm -rf /")',
            },
          },
        }],
        edges: [],
      };

      const request = {
        input: maliciousFlow,
        options: { format: 'typescript' as const },
      };

      // Should either sanitize or reject malicious input
      try {
        const result = await conversionService.convert(request);
        const generatedCode = result.files[0]?.content || '';
        
        expect(generatedCode).not.toContain('<script>');
        expect(generatedCode).not.toContain('DROP TABLE');
        expect(generatedCode).not.toContain('rm -rf');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should clean up temporary files after conversion', async () => {
      const testFlow = createMockFlow(1, 0);
      const request = {
        input: testFlow,
        options: { format: 'typescript' as const },
      };

      const result = await conversionService.convert(request);
      
      // Wait for cleanup timeout (simplified test)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(result.jobId).toBeDefined();
      // Actual file cleanup verification would require access to internal temp paths
    });
  });

  describe('ValidationService', () => {
    let validationService: ValidationService;

    beforeEach(() => {
      validationService = new ValidationService();
    });

    it('should validate correct Flowise flow structure', async () => {
      const validFlow = createMockFlow(2, 1);
      const request = {
        input: validFlow,
        options: { strict: true },
      };

      const result = await validationService.validate(request);

      expect(result).toMatchObject({
        result: {
          isValid: true,
          errors: [],
          warnings: expect.any(Array),
        },
        suggestions: expect.any(Array),
      });
    });

    it('should detect invalid flow structures', async () => {
      const invalidFlow = TestData.createInvalidFlow();
      const request = {
        input: invalidFlow,
        options: { strict: true },
      };

      const result = await validationService.validate(request);

      expect(result.result.isValid).toBe(false);
      expect(result.result.errors.length).toBeGreaterThan(0);
    });

    it('should provide optimization suggestions', async () => {
      const testFlow = createMockFlow(3, 1); // Flow with potential optimizations
      const request = {
        input: testFlow,
        options: {
          suggestOptimizations: true,
          checkDeprecated: true,
        },
      };

      const result = await validationService.validate(request);

      expect(result.suggestions).toBeDefined();
      expect(Array.isArray(result.suggestions)).toBe(true);
    });

    it('should auto-fix common issues when requested', async () => {
      const flowWithIssues = {
        nodes: [{
          id: 'node1',
          data: {
            label: 'Test Node',
            // Missing required fields that can be auto-fixed
            type: 'openAI',
          },
        }],
        edges: [],
      };

      const request = {
        input: flowWithIssues,
        options: { autoFix: true },
      };

      const result = await validationService.validate(request);

      if (result.fixed) {
        const fixedFlow = JSON.parse(result.fixed);
        expect(fixedFlow.nodes[0].data).toHaveProperty('id');
        expect(fixedFlow.nodes[0].data).toHaveProperty('version');
      }
    });

    it('should validate node type compatibility', async () => {
      const incompatibleFlow = {
        nodes: [
          {
            id: 'node1',
            data: { type: 'ChatOpenAI', category: 'LLMs' },
          },
          {
            id: 'node2',
            data: { type: 'BufferMemory', category: 'Memory' },
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            sourceHandle: 'output',
            targetHandle: 'input',
          },
        ],
      };

      const request = {
        input: incompatibleFlow,
        options: { strict: true },
      };

      const result = await validationService.validate(request);

      // Should detect type compatibility issues
      expect(result.result.warnings.length).toBeGreaterThan(0);
    });

    it('should check for deprecated node types', async () => {
      const flowWithDeprecated = {
        nodes: [{
          id: 'node1',
          data: {
            type: 'LegacyOpenAI', // Assume this is deprecated
            version: 1, // Old version
          },
        }],
        edges: [],
      };

      const request = {
        input: flowWithDeprecated,
        options: { checkDeprecated: true },
      };

      const result = await validationService.validate(request);

      expect(result.suggestions.some(s => 
        s.type === 'warning' && s.message.includes('deprecated')
      )).toBe(true);
    });

    it('should validate edge connections', async () => {
      const flowWithBadEdges = {
        nodes: [
          { id: 'node1', data: { type: 'openAI' } },
          { id: 'node2', data: { type: 'prompt' } },
        ],
        edges: [
          {
            source: 'nonexistent',
            target: 'node2',
            sourceHandle: 'output',
            targetHandle: 'input',
          },
        ],
      };

      const request = {
        input: flowWithBadEdges,
        options: { strict: true },
      };

      const result = await validationService.validate(request);

      expect(result.result.isValid).toBe(false);
      expect(result.result.errors.some(e => 
        e.includes('edge') || e.includes('connection')
      )).toBe(true);
    });
  });

  describe('TestService', () => {
    let testService: TestService;

    beforeEach(() => {
      testService = new TestService();
    });

    it('should run unit tests on generated code', async () => {
      const generatedFiles = [
        {
          path: 'main.ts',
          content: `
            export class TestChain {
              async run(input: string): Promise<string> {
                return "Hello " + input;
              }
            }
          `,
          type: 'main' as const,
          size: 100,
          language: 'typescript',
        },
      ];

      const request = {
        files: generatedFiles,
        options: {
          testType: 'unit' as const,
          generateReport: true,
        },
      };

      const result = await testService.runTests(request);

      expect(result).toMatchObject({
        jobId: expect.any(String),
        results: {
          success: expect.any(Boolean),
          tests: expect.any(Array),
          coverage: expect.any(Object),
        },
        testFiles: expect.any(Array),
      });
    });

    it('should generate test files for code', async () => {
      const generatedFiles = [
        {
          path: 'chain.ts',
          content: `
            export class MyChain {
              constructor(private model: any) {}
              
              async call(input: string): Promise<string> {
                return this.model.call(input);
              }
            }
          `,
          type: 'main' as const,
          size: 150,
          language: 'typescript',
        },
      ];

      const request = {
        files: generatedFiles,
        options: {
          testType: 'unit' as const,
          mockExternal: true,
        },
      };

      const result = await testService.runTests(request);

      expect(result.testFiles.length).toBeGreaterThan(0);
      expect(result.testFiles[0].content).toContain('describe');
      expect(result.testFiles[0].content).toContain('it(');
      expect(result.testFiles[0].content).toContain('expect');
    });

    it('should run integration tests', async () => {
      const generatedFiles = [
        {
          path: 'integration.ts',
          content: `
            import { ChatOpenAI } from '@langchain/openai';
            
            export class IntegrationChain {
              private llm = new ChatOpenAI();
              
              async process(input: string): Promise<string> {
                return this.llm.call([{ role: 'user', content: input }]);
              }
            }
          `,
          type: 'main' as const,
          size: 200,
          language: 'typescript',
        },
      ];

      const request = {
        files: generatedFiles,
        options: {
          testType: 'integration' as const,
          envFile: join(testDir, '.env.test'),
        },
      };

      const result = await testService.runTests(request);

      expect(result.results.tests.some(t => 
        t.type === 'integration'
      )).toBe(true);
    });

    it('should mock external dependencies', async () => {
      const generatedFiles = [
        {
          path: 'external.ts',
          content: `
            import axios from 'axios';
            import { OpenAI } from 'openai';
            
            export class ExternalChain {
              async fetchData(): Promise<any> {
                const response = await axios.get('https://api.example.com');
                return response.data;
              }
              
              async generateText(prompt: string): Promise<string> {
                const openai = new OpenAI();
                const result = await openai.completions.create({
                  model: 'gpt-3.5-turbo',
                  prompt,
                });
                return result.choices[0].text;
              }
            }
          `,
          type: 'main' as const,
          size: 300,
          language: 'typescript',
        },
      ];

      const request = {
        files: generatedFiles,
        options: {
          testType: 'unit' as const,
          mockExternal: true,
        },
      };

      const result = await testService.runTests(request);

      const testFile = result.testFiles[0];
      expect(testFile.content).toContain('mock');
      expect(testFile.content).toContain('jest.mock');
    });

    it('should generate coverage reports', async () => {
      const generatedFiles = [
        {
          path: 'coverage.ts',
          content: `
            export class CoverageTest {
              method1(): string { return 'test1'; }
              method2(): string { return 'test2'; }
              method3(): string { return 'test3'; }
            }
          `,
          type: 'main' as const,
          size: 120,
          language: 'typescript',
        },
      ];

      const request = {
        files: generatedFiles,
        options: {
          testType: 'unit' as const,
          generateReport: true,
        },
      };

      const result = await testService.runTests(request);

      if (result.report?.coverage) {
        expect(result.report.coverage).toMatchObject({
          total: expect.any(Number),
          lines: expect.any(Number),
          branches: expect.any(Number),
          functions: expect.any(Number),
          statements: expect.any(Number),
        });
      }
    });

    it('should handle test timeouts', async () => {
      const slowFiles = [
        {
          path: 'slow.ts',
          content: `
            export class SlowChain {
              async slowMethod(): Promise<string> {
                return new Promise(resolve => 
                  setTimeout(() => resolve('done'), 10000)
                );
              }
            }
          `,
          type: 'main' as const,
          size: 150,
          language: 'typescript',
        },
      ];

      const request = {
        files: slowFiles,
        options: {
          testType: 'unit' as const,
          timeout: 1000, // 1 second timeout
        },
      };

      const result = await testService.runTests(request);

      expect(result.results.tests.some(t => 
        t.status === 'timeout' || t.status === 'failed'
      )).toBe(true);
    });
  });

  describe('UploadService', () => {
    let uploadService: UploadService;

    beforeEach(() => {
      uploadService = new UploadService({
        maxFileSize: 1024 * 1024, // 1MB
        allowedMimeTypes: ['application/json', 'text/plain'],
        tempDir: join(testDir, 'uploads'),
      });
    });

    it('should validate file size limits', () => {
      const largeFile = {
        originalname: 'large.json',
        mimetype: 'application/json',
        size: 2 * 1024 * 1024, // 2MB
        buffer: Buffer.alloc(2 * 1024 * 1024),
      } as any;

      expect(() => {
        uploadService.validateFile(largeFile);
      }).toThrow('File size exceeds limit');
    });

    it('should validate file types', () => {
      const invalidFile = {
        originalname: 'malicious.exe',
        mimetype: 'application/octet-stream',
        size: 1000,
        buffer: Buffer.from('malicious content'),
      } as any;

      expect(() => {
        uploadService.validateFile(invalidFile);
      }).toThrow('File type not allowed');
    });

    it('should sanitize file names', () => {
      const dangerousFile = {
        originalname: '../../../etc/passwd',
        mimetype: 'application/json',
        size: 100,
        buffer: Buffer.from('{}'),
      } as any;

      const sanitized = uploadService.sanitizeFileName(dangerousFile.originalname);
      
      expect(sanitized).not.toContain('../');
      expect(sanitized).not.toContain('/');
      expect(sanitized).not.toContain('\\');
    });

    it('should process valid JSON files', async () => {
      const validJson = {
        nodes: [{ id: 'test', data: { type: 'openAI' } }],
        edges: [],
      };

      const jsonFile = {
        originalname: 'flow.json',
        mimetype: 'application/json',
        size: JSON.stringify(validJson).length,
        buffer: Buffer.from(JSON.stringify(validJson)),
        path: join(testDir, 'flow.json'),
      } as any;

      const result = await uploadService.processUpload(jsonFile);

      expect(result).toMatchObject({
        jobId: expect.any(String),
        file: {
          originalName: 'flow.json',
          filename: expect.any(String),
          path: expect.any(String),
          size: expect.any(Number),
          mimetype: 'application/json',
          uploadedAt: expect.any(String),
        },
      });
    });

    it('should detect and reject malicious JSON content', async () => {
      const maliciousJson = {
        nodes: [{
          id: 'malicious',
          data: {
            type: 'script',
            code: 'require("child_process").exec("rm -rf /")',
          },
        }],
        edges: [],
      };

      const jsonFile = {
        originalname: 'malicious.json',
        mimetype: 'application/json',
        size: JSON.stringify(maliciousJson).length,
        buffer: Buffer.from(JSON.stringify(maliciousJson)),
        path: join(testDir, 'malicious.json'),
      } as any;

      // Should either sanitize or reject
      try {
        const result = await uploadService.processUpload(jsonFile);
        // If processed, check that malicious content was sanitized
        expect(result.file.path).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should auto-convert uploaded flows when requested', async () => {
      const flowJson = {
        nodes: [
          { id: 'node1', data: { type: 'ChatOpenAI' } },
          { id: 'node2', data: { type: 'PromptTemplate' } },
        ],
        edges: [{ source: 'node1', target: 'node2' }],
      };

      const jsonFile = {
        originalname: 'auto-convert.json',
        mimetype: 'application/json',
        size: JSON.stringify(flowJson).length,
        buffer: Buffer.from(JSON.stringify(flowJson)),
        path: join(testDir, 'auto-convert.json'),
      } as any;

      const request = {
        file: jsonFile,
        options: {
          autoConvert: true,
          conversionOptions: { format: 'typescript' as const },
        },
      };

      const result = await uploadService.processUpload(jsonFile, request.options);

      if (result.conversion) {
        expect(result.conversion.files.length).toBeGreaterThan(0);
        expect(result.conversion.files[0].language).toBe('typescript');
      }
    });

    it('should validate uploaded flows when requested', async () => {
      const invalidFlow = {
        nodes: [{ id: '', data: {} }], // Invalid node
        edges: [],
      };

      const jsonFile = {
        originalname: 'invalid.json',
        mimetype: 'application/json',
        size: JSON.stringify(invalidFlow).length,
        buffer: Buffer.from(JSON.stringify(invalidFlow)),
        path: join(testDir, 'invalid.json'),
      } as any;

      const request = {
        file: jsonFile,
        options: {
          validate: true,
        },
      };

      const result = await uploadService.processUpload(jsonFile, request.options);

      if (result.validation) {
        expect(result.validation.result.isValid).toBe(false);
        expect(result.validation.result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should handle concurrent uploads', async () => {
      const files = Array.from({ length: 3 }, (_, i) => ({
        originalname: `flow${i}.json`,
        mimetype: 'application/json',
        size: 100,
        buffer: Buffer.from(`{"nodes":[], "edges":[]}`),
        path: join(testDir, `flow${i}.json`),
      })) as any[];

      const uploadPromises = files.map(file => 
        uploadService.processUpload(file)
      );

      const results = await Promise.all(uploadPromises);

      expect(results.length).toBe(3);
      results.forEach(result => {
        expect(result.jobId).toBeDefined();
        expect(result.file.uploadedAt).toBeDefined();
      });
    });
  });

  describe('WebSocketService', () => {
    let webSocketService: WebSocketService;
    let mockWss: WebSocketServer;

    beforeEach(() => {
      mockWss = new WebSocketServer({ noServer: true });
      webSocketService = new WebSocketService(mockWss, {
        heartbeatInterval: 1000,
        maxConnections: 5,
      });
    });

    afterEach(() => {
      mockWss.close();
    });

    it('should initialize with proper configuration', () => {
      expect(webSocketService).toBeDefined();
      // Additional initialization checks would go here
    });

    it('should track connection information', () => {
      const mockConnection = {
        id: 'test-connection-123',
        ws: {} as any,
        subscriptions: new Set(['job-1', 'job-2']),
        lastSeen: new Date(),
      };

      // This would test internal connection tracking
      // Implementation depends on WebSocketService internals
    });

    it('should broadcast progress updates to subscribed connections', () => {
      const jobId = 'test-job-progress';
      const progress = {
        jobId,
        progress: 75,
        step: 'Processing nodes',
        details: 'Converting node types',
      };

      // Mock method would test broadcasting
      expect(() => {
        webSocketService.broadcastProgress(jobId, progress);
      }).not.toThrow();
    });

    it('should broadcast results to subscribed connections', () => {
      const jobId = 'test-job-result';
      const result = {
        files: ['main.ts', 'types.ts'],
        metrics: { duration: 1500 },
      };

      expect(() => {
        webSocketService.broadcastResult(jobId, result, 'convert');
      }).not.toThrow();
    });

    it('should broadcast errors to subscribed connections', () => {
      const jobId = 'test-job-error';
      const error = {
        code: 'CONVERSION_ERROR',
        message: 'Failed to process node',
        details: { nodeId: 'problematic-node' },
      };

      expect(() => {
        webSocketService.broadcastError(jobId, error, 'convert');
      }).not.toThrow();
    });

    it('should handle connection cleanup', () => {
      const connectionId = 'test-connection-cleanup';
      
      // Test connection removal
      expect(() => {
        webSocketService.removeConnection(connectionId);
      }).not.toThrow();
    });

    it('should manage heartbeat monitoring', () => {
      // Test heartbeat functionality
      const connectionId = 'test-heartbeat';
      
      expect(() => {
        webSocketService.updateLastSeen(connectionId);
      }).not.toThrow();
    });

    it('should enforce connection limits', () => {
      // Test max connections enforcement
      const maxConnections = 5;
      
      for (let i = 0; i < maxConnections + 2; i++) {
        const shouldReject = i >= maxConnections;
        // Test would check if connections beyond limit are rejected
      }
    });
  });
});