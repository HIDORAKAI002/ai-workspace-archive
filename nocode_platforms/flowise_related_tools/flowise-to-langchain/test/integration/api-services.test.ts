import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { ValidationService } from '../../src/api/services/validation.js';
import { UploadService } from '../../src/api/services/upload.js';
import { ConversionService } from '../../src/api/services/conversion.js';
import { mkdir, writeFile, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import type { ValidationOptions, ConversionOptions } from '../../src/api/types/api.js';

describe('API Services Integration Tests', () => {
  let tempDir: string;
  let testFlowPath: string;

  beforeEach(async () => {
    // Create temporary directory for tests
    tempDir = join(tmpdir(), `api-services-test-${Date.now()}`);
    await mkdir(tempDir, { recursive: true });

    // Create a test flow file
    testFlowPath = join(tempDir, 'test-flow.json');
    const testFlow = {
      nodes: [
        {
          id: 'llm-1',
          type: 'nodeType',
          position: { x: 100, y: 100 },
          data: {
            id: 'llm-1',
            label: 'OpenAI LLM',
            version: 2,
            name: 'chatOpenAI',
            type: 'ChatOpenAI',
            baseClasses: ['ChatOpenAI', 'LLM'],
            category: 'LLMs',
            description: 'OpenAI ChatGPT LLM',
            inputParams: [
              {
                label: 'Model',
                name: 'model',
                type: 'string',
                default: 'gpt-3.5-turbo',
              },
            ],
            inputAnchors: [],
            outputAnchors: [
              {
                id: 'llm-1-output',
                name: 'output',
                label: 'LLM Output',
                type: 'ChatOpenAI',
              },
            ],
            outputs: {},
            selected: false,
          },
        },
        {
          id: 'chain-1',
          type: 'nodeType',
          position: { x: 400, y: 100 },
          data: {
            id: 'chain-1',
            label: 'LLM Chain',
            version: 1,
            name: 'llmChain',
            type: 'LLMChain',
            baseClasses: ['LLMChain', 'Chain'],
            category: 'Chains',
            description: 'Basic LLM Chain',
            inputParams: [],
            inputAnchors: [
              {
                id: 'chain-1-llm',
                name: 'llm',
                label: 'Language Model',
                type: 'ChatOpenAI',
              },
            ],
            outputAnchors: [
              {
                id: 'chain-1-output',
                name: 'output',
                label: 'Chain Output',
                type: 'LLMChain',
              },
            ],
            outputs: {},
            selected: false,
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'llm-1',
          sourceHandle: 'llm-1-output',
          target: 'chain-1',
          targetHandle: 'chain-1-llm',
        },
      ],
      chatflow: {
        id: 'test-flow-1',
        name: 'Test Flow',
        flowData: '{}',
        deployed: false,
        isPublic: false,
        apikeyid: '',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
    };
    
    await writeFile(testFlowPath, JSON.stringify(testFlow, null, 2));
  });

  afterEach(async () => {
    // Clean up temporary directory
    await rm(tempDir, { recursive: true, force: true });
    jest.clearAllMocks();
  });

  describe('ValidationService Integration', () => {
    let validationService: ValidationService;

    beforeEach(() => {
      validationService = new ValidationService();
    });

    it('should validate a valid Flowise flow file', async () => {
      const options: ValidationOptions = {
        strict: true,
        checkDeprecated: true,
        suggestOptimizations: true,
        autoFix: false,
        detectCycles: true,
        validateDependencies: true,
      };

      const result = await validationService.validateFlow(testFlowPath, options);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.nodeCount).toBe(2);
      expect(result.analysis.connectionCount).toBe(1);
      expect(result.analysis.coverage).toBeGreaterThan(0);
      expect(result.analysis.complexity).toBeDefined();
    });

    it('should detect unsupported node types', async () => {
      // Create flow with unsupported node
      const unsupportedFlow = {
        nodes: [
          {
            id: 'unknown-1',
            type: 'nodeType',
            position: { x: 100, y: 100 },
            data: {
              id: 'unknown-1',
              label: 'Unknown Node',
              version: 1,
              name: 'unknownNode',
              type: 'UnknownNodeType',
              baseClasses: ['UnknownNodeType'],
              category: 'Unknown',
              description: 'This node type is not supported',
              inputAnchors: [],
              outputAnchors: [],
              outputs: {},
            },
          },
        ],
        edges: [],
      };

      const unsupportedPath = join(tempDir, 'unsupported-flow.json');
      await writeFile(unsupportedPath, JSON.stringify(unsupportedFlow, null, 2));

      const result = await validationService.validateFlow(unsupportedPath, {});

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].code).toBe('UNSUPPORTED_NODES');
      expect(result.analysis.unsupportedTypes).toContain('UnknownNodeType');
    });

    it('should detect circular dependencies', async () => {
      // Create flow with circular dependency
      const circularFlow = {
        nodes: [
          {
            id: 'node-1',
            type: 'nodeType',
            position: { x: 100, y: 100 },
            data: {
              id: 'node-1',
              label: 'Node 1',
              version: 1,
              name: 'node1',
              type: 'LLMChain',
              baseClasses: ['LLMChain'],
              category: 'Chains',
              description: 'Node 1',
              inputAnchors: [{ id: 'node-1-input', name: 'input', label: 'Input', type: 'string' }],
              outputAnchors: [{ id: 'node-1-output', name: 'output', label: 'Output', type: 'string' }],
              outputs: {},
            },
          },
          {
            id: 'node-2',
            type: 'nodeType',
            position: { x: 300, y: 100 },
            data: {
              id: 'node-2',
              label: 'Node 2',
              version: 1,
              name: 'node2',
              type: 'LLMChain',
              baseClasses: ['LLMChain'],
              category: 'Chains',
              description: 'Node 2',
              inputAnchors: [{ id: 'node-2-input', name: 'input', label: 'Input', type: 'string' }],
              outputAnchors: [{ id: 'node-2-output', name: 'output', label: 'Output', type: 'string' }],
              outputs: {},
            },
          },
        ],
        edges: [
          {
            id: 'edge-1',
            source: 'node-1',
            sourceHandle: 'node-1-output',
            target: 'node-2',
            targetHandle: 'node-2-input',
          },
          {
            id: 'edge-2',
            source: 'node-2',
            sourceHandle: 'node-2-output',
            target: 'node-1',
            targetHandle: 'node-1-input',
          },
        ],
      };

      const circularPath = join(tempDir, 'circular-flow.json');
      await writeFile(circularPath, JSON.stringify(circularFlow, null, 2));

      const result = await validationService.validateFlow(circularPath, { detectCycles: true });

      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0].code).toBe('CIRCULAR_DEPENDENCY');
    });

    it('should suggest optimizations for complex flows', async () => {
      // Create complex flow
      const complexFlow = {
        nodes: Array.from({ length: 25 }, (_, i) => ({
          id: `node-${i}`,
          type: 'nodeType',
          position: { x: (i % 5) * 200, y: Math.floor(i / 5) * 200 },
          data: {
            id: `node-${i}`,
            label: `Node ${i}`,
            version: 1,
            name: `node${i}`,
            type: 'LLMChain',
            baseClasses: ['LLMChain'],
            category: 'Chains',
            description: `Node ${i}`,
            inputAnchors: i > 0 ? [{ id: `node-${i}-input`, name: 'input', label: 'Input', type: 'string' }] : [],
            outputAnchors: [{ id: `node-${i}-output`, name: 'output', label: 'Output', type: 'string' }],
            outputs: {},
          },
        })),
        edges: Array.from({ length: 24 }, (_, i) => ({
          id: `edge-${i}`,
          source: `node-${i}`,
          sourceHandle: `node-${i}-output`,
          target: `node-${i + 1}`,
          targetHandle: `node-${i + 1}-input`,
        })),
      };

      const complexPath = join(tempDir, 'complex-flow.json');
      await writeFile(complexPath, JSON.stringify(complexFlow, null, 2));

      const result = await validationService.validateFlow(complexPath, { suggestOptimizations: true });

      expect(result.suggestions.length).toBeGreaterThan(0);
      expect(result.suggestions[0].code).toBe('COMPLEX_FLOW');
      expect(result.analysis.complexity).toBe('high');
    });
  });

  describe('UploadService Integration', () => {
    let uploadService: UploadService;

    beforeEach(() => {
      uploadService = new UploadService({
        uploadDir: tempDir,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedMimeTypes: ['application/json', 'text/plain'],
        allowedExtensions: ['.json', '.txt'],
        cleanupInterval: 3600000,
        maxStorageSize: 100 * 1024 * 1024, // 100MB
      });
    });

    it('should process uploaded file successfully', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test-flow.json',
        encoding: '7bit',
        mimetype: 'application/json',
        destination: tempDir,
        filename: 'test-flow.json',
        path: testFlowPath,
        size: 1024,
        stream: null as any,
        buffer: Buffer.from(''),
      };

      const jobId = await uploadService.processUpload(mockFile, {
        validate: true,
        autoConvert: false,
      });

      expect(jobId).toBeDefined();
      expect(typeof jobId).toBe('string');

      const job = await uploadService.getJob(jobId);
      expect(job).toBeDefined();
      expect(job?.status).toBe('completed');
      expect(job?.uploadedFile).toBeDefined();
    });

    it('should get storage stats with real filesystem data', async () => {
      // Create some test files
      await writeFile(join(tempDir, 'file1.json'), '{"test": 1}');
      await writeFile(join(tempDir, 'file2.json'), '{"test": 2}');

      const stats = await uploadService.getStorageStats();

      expect(stats.totalFiles).toBeGreaterThanOrEqual(0);
      expect(stats.totalSize).toBeGreaterThanOrEqual(0);
      expect(stats.availableSpace).toBeGreaterThan(0);
    });

    it('should reject files exceeding size limit', async () => {
      const largeFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'large-file.json',
        encoding: '7bit',
        mimetype: 'application/json',
        destination: tempDir,
        filename: 'large-file.json',
        path: join(tempDir, 'large-file.json'),
        size: 11 * 1024 * 1024, // 11MB (exceeds limit)
        stream: null as any,
        buffer: Buffer.from(''),
      };

      await expect(uploadService.processUpload(largeFile, {})).rejects.toThrow('File size');
    });

    it('should reject unsupported file types', async () => {
      const invalidFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.exe',
        encoding: '7bit',
        mimetype: 'application/x-msdownload',
        destination: tempDir,
        filename: 'test.exe',
        path: join(tempDir, 'test.exe'),
        size: 1024,
        stream: null as any,
        buffer: Buffer.from(''),
      };

      await expect(uploadService.processUpload(invalidFile, {})).rejects.toThrow('File type');
    });
  });

  describe('ConversionService Integration', () => {
    let conversionService: ConversionService;

    beforeEach(() => {
      conversionService = new ConversionService();
    });

    it('should convert flow and extract version information', async () => {
      const options: ConversionOptions = {
        format: 'typescript',
        target: 'node',
        withLangfuse: false,
        includeTests: false,
        includeDocs: false,
        includeComments: true,
        outputFormat: 'esm',
        verbose: false,
      };

      const jobId = await conversionService.startConversion(testFlowPath, options);
      expect(jobId).toBeDefined();

      // Wait for conversion to complete
      let job = await conversionService.getJob(jobId);
      let attempts = 0;
      while (job?.status === 'running' && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        job = await conversionService.getJob(jobId);
        attempts++;
      }

      expect(job?.status).toBe('completed');
      expect(job?.result).toBeDefined();
      
      const result = job?.result;
      expect(result?.analysis.flowVersion).toBeDefined();
      expect(result?.analysis.flowVersion).toMatch(/flowise-/);
      expect(result?.files.length).toBeGreaterThan(0);
    });

    it('should track conversion metrics', async () => {
      const jobId = await conversionService.startConversion(testFlowPath, {});
      
      // Wait for completion
      let job = await conversionService.getJob(jobId);
      let attempts = 0;
      while (job?.status === 'running' && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        job = await conversionService.getJob(jobId);
        attempts++;
      }

      const result = job?.result;
      expect(result?.metrics).toBeDefined();
      expect(result?.metrics.duration).toBeGreaterThan(0);
      expect(result?.metrics.nodesProcessed).toBe(2);
      expect(result?.metrics.filesGenerated).toBeGreaterThan(0);
      expect(result?.metrics.memoryUsage).toBeGreaterThan(0);
    });

    it('should handle conversion errors gracefully', async () => {
      const invalidPath = join(tempDir, 'non-existent.json');
      
      const jobId = await conversionService.startConversion(invalidPath, {});
      
      // Wait for failure
      let job = await conversionService.getJob(jobId);
      let attempts = 0;
      while (job?.status === 'running' && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        job = await conversionService.getJob(jobId);
        attempts++;
      }

      expect(job?.status).toBe('failed');
      expect(job?.error).toBeDefined();
      expect(job?.error?.code).toBe('CONVERSION_ERROR');
    });

    it('should support streaming progress updates', async () => {
      const progressEvents: any[] = [];
      
      conversionService.on('job:progress', (event) => {
        progressEvents.push(event);
      });

      const jobId = await conversionService.startConversion(testFlowPath, {});
      
      // Wait for completion
      let job = await conversionService.getJob(jobId);
      let attempts = 0;
      while (job?.status === 'running' && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        job = await conversionService.getJob(jobId);
        attempts++;
      }

      expect(progressEvents.length).toBeGreaterThan(0);
      expect(progressEvents[0].jobId).toBe(jobId);
      expect(progressEvents[0].progress).toBeDefined();
      expect(progressEvents[0].step).toBeDefined();
    });
  });

  describe('Service Integration', () => {
    it('should validate and convert uploaded files', async () => {
      const uploadService = new UploadService({
        uploadDir: tempDir,
        maxFileSize: 10 * 1024 * 1024,
        allowedMimeTypes: ['application/json'],
        allowedExtensions: ['.json'],
        cleanupInterval: 3600000,
        maxStorageSize: 100 * 1024 * 1024,
      });

      const validationService = new ValidationService();
      const conversionService = new ConversionService();

      // Upload file
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test-flow.json',
        encoding: '7bit',
        mimetype: 'application/json',
        destination: tempDir,
        filename: 'test-flow.json',
        path: testFlowPath,
        size: 1024,
        stream: null as any,
        buffer: Buffer.from(''),
      };

      const uploadJobId = await uploadService.processUpload(mockFile, {
        validate: true,
        autoConvert: true,
      });

      const uploadJob = await uploadService.getJob(uploadJobId);
      expect(uploadJob?.status).toBe('completed');

      // Validate uploaded file
      const validationResult = await validationService.validateFlow(testFlowPath, {
        strict: true,
        checkDeprecated: true,
      });

      expect(validationResult.isValid).toBe(true);

      // Convert if valid
      if (validationResult.isValid) {
        const conversionJobId = await conversionService.startConversion(testFlowPath, {
          format: 'typescript',
          includeTests: true,
        });

        // Wait for conversion
        let conversionJob = await conversionService.getJob(conversionJobId);
        let attempts = 0;
        while (conversionJob?.status === 'running' && attempts < 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          conversionJob = await conversionService.getJob(conversionJobId);
          attempts++;
        }

        expect(conversionJob?.status).toBe('completed');
        expect(conversionJob?.result?.files.length).toBeGreaterThan(0);
      }
    });
  });
});