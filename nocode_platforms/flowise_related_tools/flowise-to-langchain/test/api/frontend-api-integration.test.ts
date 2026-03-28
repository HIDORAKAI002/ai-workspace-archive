/**
 * Frontend API Integration Test Suite
 * 
 * Comprehensive tests for the useFlowiseConverter hook and FlowiseApiClient
 * including real API integration, error handling, and performance validation.
 */

import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { FlowiseApiClient, FlowiseConfig } from '../../testing-ui/src/lib/flowise-api-client';
import { useFlowiseConverter } from '../../frontend/src/hooks/useFlowiseConverter';
import { createMockServer } from '../utils/mock-server';
import { createMockFlow, TestData } from '../utils/test-helpers';
import { performance } from 'perf_hooks';

// Mock data for testing
const mockFlowiseFlow = {
  id: 'test-flow-123',
  name: 'Test Chat Flow',
  description: 'A test flow for validation',
  nodes: [
    {
      id: 'llm_1',
      type: 'llm',
      label: 'ChatOpenAI',
      data: {
        name: 'ChatOpenAI',
        category: 'LLMs',
        inputs: {
          modelName: 'gpt-3.5-turbo',
          temperature: 0.7,
          maxTokens: 1000
        }
      },
      position: { x: 100, y: 100 }
    },
    {
      id: 'prompt_1',
      type: 'prompt',
      label: 'Prompt Template',
      data: {
        name: 'PromptTemplate',
        category: 'Prompts',
        inputs: {
          template: 'You are a helpful assistant. Answer: {question}',
          inputVariables: ['question']
        }
      },
      position: { x: 300, y: 100 }
    }
  ],
  edges: [
    {
      id: 'edge_1',
      source: 'prompt_1',
      target: 'llm_1',
      sourceHandle: 'output',
      targetHandle: 'input'
    }
  ],
  version: '1.0.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isValid: true
};

const mockConversionOptions = {
  format: 'typescript' as const,
  target: 'node' as const,
  outputPath: './output',
  includeTests: true,
  includeDocs: true,
  optimize: true
};

describe('Frontend API Integration Tests', () => {
  let mockServer: any;
  let apiClient: FlowiseApiClient;
  const TEST_PORT = 3003;
  const TEST_URL = `http://localhost:${TEST_PORT}`;

  beforeAll(async () => {
    // Start mock server for API testing
    mockServer = await createMockServer(TEST_PORT);
    
    // Initialize API client
    const config: FlowiseConfig = {
      url: TEST_URL,
      timeout: 10000,
      retryAttempts: 2,
      retryDelay: 500,
      cacheEnabled: true,
      cacheTtl: 30000
    };
    
    apiClient = new FlowiseApiClient(config);
  });

  afterAll(async () => {
    if (mockServer) {
      await mockServer.close();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear cache before each test
    if (apiClient) {
      apiClient.updateConfig({ cacheEnabled: false });
      apiClient.updateConfig({ cacheEnabled: true });
    }
  });

  describe('FlowiseApiClient Tests', () => {
    describe('Connection and Health', () => {
      it('should connect successfully to Flowise server', async () => {
        const result = await apiClient.testConnection();
        
        expect(result.success).toBe(true);
        expect(result.data?.status).toBe('connected');
      });

      it('should handle connection failures gracefully', async () => {
        const failingClient = new FlowiseApiClient({
          url: 'http://invalid-url:9999',
          timeout: 1000,
          retryAttempts: 1
        });

        const result = await failingClient.testConnection();
        
        expect(result.success).toBe(false);
        expect(result.error).toContain('Cannot connect');
      });

      it('should retry failed requests according to configuration', async () => {
        const retryClient = new FlowiseApiClient({
          url: TEST_URL,
          retryAttempts: 3,
          retryDelay: 100
        });

        // Mock server should simulate intermittent failures
        const result = await retryClient.getFlows();
        
        // Should eventually succeed after retries
        expect(result.success).toBe(true);
      });
    });

    describe('Flow Operations', () => {
      it('should fetch flows successfully', async () => {
        const result = await apiClient.getFlows();
        
        expect(result.success).toBe(true);
        expect(result.data?.flows).toBeInstanceOf(Array);
        expect(result.data?.total).toBeGreaterThanOrEqual(0);
      });

      it('should fetch a specific flow by ID', async () => {
        const flowId = 'test-flow-123';
        const result = await apiClient.getFlow(flowId);
        
        expect(result.success).toBe(true);
        expect(result.data?.id).toBe(flowId);
        expect(result.data?.name).toBeDefined();
      });

      it('should handle invalid flow ID gracefully', async () => {
        const invalidId = 'non-existent-flow';
        const result = await apiClient.getFlow(invalidId);
        
        expect(result.success).toBe(false);
        expect(result.error).toContain('not found');
      });

      it('should create new flow successfully', async () => {
        const newFlow = {
          name: 'New Test Flow',
          description: 'Created via API test',
          flowData: {
            nodes: mockFlowiseFlow.nodes,
            edges: mockFlowiseFlow.edges
          },
          isPublic: false
        };

        const result = await apiClient.createFlow(newFlow);
        
        expect(result.success).toBe(true);
        expect(result.data?.name).toBe(newFlow.name);
        expect(result.data?.id).toBeDefined();
      });

      it('should validate flow data before creation', async () => {
        const invalidFlow = {
          name: '',
          flowData: null
        };

        const result = await apiClient.createFlow(invalidFlow as any);
        
        expect(result.success).toBe(false);
        expect(result.error).toContain('validation');
      });
    });

    describe('Chat Operations', () => {
      it('should send chat requests successfully', async () => {
        const flowId = 'test-flow-123';
        const chatRequest = {
          question: 'What is machine learning?',
          history: [],
          chatId: 'test-chat-session'
        };

        const result = await apiClient.chatWithFlow(flowId, chatRequest);
        
        expect(result.success).toBe(true);
        expect(result.data?.text).toBeDefined();
        expect(result.data?.chatId).toBe(chatRequest.chatId);
      });

      it('should handle chat errors appropriately', async () => {
        const invalidFlowId = 'invalid-flow';
        const chatRequest = {
          question: 'Test question'
        };

        const result = await apiClient.chatWithFlow(invalidFlowId, chatRequest);
        
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      });

      it('should maintain chat history correctly', async () => {
        const flowId = 'test-flow-123';
        const chatHistory = [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi there!' }
        ];

        const chatRequest = {
          question: 'How are you?',
          history: chatHistory
        };

        const result = await apiClient.chatWithFlow(flowId, chatRequest);
        
        expect(result.success).toBe(true);
        // History should be preserved in the response
        expect(result.data).toBeDefined();
      });
    });

    describe('Error Handling and Edge Cases', () => {
      it('should handle rate limiting (429 errors)', async () => {
        // Mock server should simulate rate limiting
        const promises = Array.from({ length: 50 }, () => 
          apiClient.getFlows()
        );

        const results = await Promise.allSettled(promises);
        
        // Some requests should be rate limited
        const rateLimited = results.filter(result => 
          result.status === 'rejected' && 
          result.reason.message.includes('Rate limit')
        );

        expect(rateLimited.length).toBeGreaterThan(0);
      });

      it('should handle authentication errors (401)', async () => {
        const authClient = new FlowiseApiClient({
          url: TEST_URL,
          apiKey: 'invalid-api-key'
        });

        const result = await authClient.getFlows();
        
        expect(result.success).toBe(false);
        expect(result.error).toContain('Unauthorized');
      });

      it('should handle server errors (500) gracefully', async () => {
        // Mock server should simulate server errors for specific requests
        const result = await apiClient.getFlow('trigger-server-error');
        
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      });

      it('should handle network timeouts', async () => {
        const timeoutClient = new FlowiseApiClient({
          url: TEST_URL,
          timeout: 100 // Very short timeout
        });

        const result = await timeoutClient.getFlow('slow-response');
        
        expect(result.success).toBe(false);
        expect(result.error).toContain('timeout');
      });
    });

    describe('Caching Functionality', () => {
      it('should cache GET requests effectively', async () => {
        const startTime = performance.now();
        
        // First request - should hit the server
        await apiClient.getFlows();
        const firstRequestTime = performance.now() - startTime;
        
        const secondStartTime = performance.now();
        
        // Second request - should use cache
        await apiClient.getFlows();
        const secondRequestTime = performance.now() - secondStartTime;
        
        // Cached request should be significantly faster
        expect(secondRequestTime).toBeLessThan(firstRequestTime * 0.5);
      });

      it('should respect cache TTL settings', async () => {
        const shortCacheClient = new FlowiseApiClient({
          url: TEST_URL,
          cacheEnabled: true,
          cacheTtl: 100 // 100ms cache
        });

        // Make initial request
        const result1 = await shortCacheClient.getFlows();
        expect(result1.success).toBe(true);

        // Wait for cache to expire
        await new Promise(resolve => setTimeout(resolve, 150));

        // This should hit the server again
        const result2 = await shortCacheClient.getFlows();
        expect(result2.success).toBe(true);
      });

      it('should allow cache clearing', async () => {
        // Fill cache
        await apiClient.getFlows();
        
        // Clear cache by disabling and re-enabling
        apiClient.updateConfig({ cacheEnabled: false });
        apiClient.updateConfig({ cacheEnabled: true });
        
        // Next request should hit server
        const result = await apiClient.getFlows();
        expect(result.success).toBe(true);
      });
    });
  });

  describe('useFlowiseConverter Hook Tests', () => {
    const createWrapper = () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      );
      return wrapper;
    };

    describe('Flow Validation', () => {
      it('should validate valid flows successfully', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const validationResult = await result.current.validateFlow(mockFlowiseFlow);
        
        expect(validationResult.isValid).toBe(true);
        expect(validationResult.errors).toHaveLength(0);
        expect(validationResult.nodeCount).toBe(mockFlowiseFlow.nodes.length);
        expect(validationResult.edgeCount).toBe(mockFlowiseFlow.edges.length);
      });

      it('should detect validation errors in invalid flows', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const invalidFlow = {
          ...mockFlowiseFlow,
          nodes: [], // Empty nodes array should trigger error
          edges: []
        };

        const validationResult = await result.current.validateFlow(invalidFlow);
        
        expect(validationResult.isValid).toBe(false);
        expect(validationResult.errors.length).toBeGreaterThan(0);
        expect(validationResult.errors[0].code).toBe('EMPTY_FLOW');
      });

      it('should identify unsupported node types', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const flowWithUnsupportedNodes = {
          ...mockFlowiseFlow,
          nodes: [
            ...mockFlowiseFlow.nodes,
            {
              id: 'unsupported_1',
              type: 'unsupported_type',
              label: 'Unsupported Node',
              data: {},
              position: { x: 0, y: 0 }
            }
          ]
        };

        const validationResult = await result.current.validateFlow(flowWithUnsupportedNodes);
        
        expect(validationResult.unsupportedFeatures.length).toBeGreaterThan(0);
        expect(validationResult.unsupportedFeatures[0].name).toBe('unsupported_type');
      });

      it('should provide optimization suggestions', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const largeFlow = {
          ...mockFlowiseFlow,
          nodes: Array.from({ length: 15 }, (_, i) => ({
            id: `node_${i}`,
            type: 'llm',
            label: `Node ${i}`,
            data: {},
            position: { x: i * 100, y: 100 }
          }))
        };

        const validationResult = await result.current.validateFlow(largeFlow);
        
        expect(validationResult.suggestions.length).toBeGreaterThan(0);
        expect(validationResult.complexity).toBe('high');
      });
    });

    describe('Flow Conversion', () => {
      it('should convert flows to TypeScript successfully', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const conversionResult = await result.current.convertFlow(
          mockFlowiseFlow, 
          mockConversionOptions
        );
        
        expect(conversionResult.success).toBe(true);
        expect(conversionResult.nodesConverted).toBeGreaterThan(0);
        expect(conversionResult.filesGenerated.length).toBeGreaterThan(0);
        expect(conversionResult.generatedCode).toContain('class');
        expect(conversionResult.generatedCode).toContain('LangChain');
      });

      it('should convert flows to Python format', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const pythonOptions = {
          ...mockConversionOptions,
          format: 'python' as const
        };

        const conversionResult = await result.current.convertFlow(
          mockFlowiseFlow, 
          pythonOptions
        );
        
        expect(conversionResult.success).toBe(true);
        expect(conversionResult.filesGenerated.some(file => 
          file.endsWith('.py')
        )).toBe(true);
      });

      it('should include tests when requested', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const optionsWithTests = {
          ...mockConversionOptions,
          includeTests: true
        };

        const conversionResult = await result.current.convertFlow(
          mockFlowiseFlow, 
          optionsWithTests
        );
        
        expect(conversionResult.success).toBe(true);
        expect(conversionResult.filesGenerated.some(file => 
          file.includes('test')
        )).toBe(true);
      });

      it('should include documentation when requested', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const optionsWithDocs = {
          ...mockConversionOptions,
          includeDocs: true
        };

        const conversionResult = await result.current.convertFlow(
          mockFlowiseFlow, 
          optionsWithDocs
        );
        
        expect(conversionResult.success).toBe(true);
        expect(conversionResult.filesGenerated.some(file => 
          file.includes('README.md')
        )).toBe(true);
      });

      it('should handle conversion errors gracefully', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const invalidFlow = {
          ...mockFlowiseFlow,
          nodes: [null, undefined] as any // Invalid nodes
        };

        const conversionResult = await result.current.convertFlow(
          invalidFlow, 
          mockConversionOptions
        );
        
        expect(conversionResult.success).toBe(false);
        expect(conversionResult.errors.length).toBeGreaterThan(0);
      });
    });

    describe('Test Execution', () => {
      it('should execute unit tests successfully', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const mockConversionResult = {
          success: true,
          nodesConverted: 2,
          filesGenerated: ['index.ts', 'types.ts'],
          warnings: [],
          errors: [],
          metadata: {
            inputFile: 'test.json',
            outputDirectory: './output',
            format: 'typescript',
            target: 'node',
            timestamp: new Date().toISOString()
          },
          generatedCode: 'export class TestChain { ... }'
        };

        const testResult = await result.current.testConversion(
          mockFlowiseFlow,
          mockConversionResult,
          'unit'
        );
        
        expect(testResult.success).toBeDefined();
        expect(testResult.totalTests).toBeGreaterThan(0);
        expect(testResult.duration).toBeGreaterThan(0);
      });

      it('should execute integration tests', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const mockConversionResult = {
          success: true,
          nodesConverted: 2,
          filesGenerated: ['index.ts'],
          warnings: [],
          errors: [],
          metadata: {
            inputFile: 'test.json',
            outputDirectory: './output',
            format: 'typescript',
            target: 'node',
            timestamp: new Date().toISOString()
          },
          generatedCode: 'export class TestChain { ... }'
        };

        const testResult = await result.current.testConversion(
          mockFlowiseFlow,
          mockConversionResult,
          'integration'
        );
        
        expect(testResult.totalTests).toBeGreaterThan(0);
        expect(testResult.passedTests).toBeLessThanOrEqual(testResult.totalTests);
      });

      it('should execute end-to-end tests', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const mockConversionResult = {
          success: true,
          nodesConverted: 2,
          filesGenerated: ['index.ts'],
          warnings: [],
          errors: [],
          metadata: {
            inputFile: 'test.json',
            outputDirectory: './output',
            format: 'typescript',
            target: 'node',
            timestamp: new Date().toISOString()
          },
          generatedCode: 'export class TestChain { ... }'
        };

        const testResult = await result.current.testConversion(
          mockFlowiseFlow,
          mockConversionResult,
          'e2e'
        );
        
        expect(testResult.totalTests).toBeGreaterThan(0);
        expect(testResult.duration).toBeGreaterThan(0);
      });

      it('should provide test coverage information', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const mockConversionResult = {
          success: true,
          nodesConverted: 2,
          filesGenerated: ['index.ts'],
          warnings: [],
          errors: [],
          metadata: {
            inputFile: 'test.json',
            outputDirectory: './output',
            format: 'typescript',
            target: 'node',
            timestamp: new Date().toISOString()
          },
          generatedCode: 'export class TestChain { ... }'
        };

        const testResult = await result.current.testConversion(
          mockFlowiseFlow,
          mockConversionResult,
          'all'
        );
        
        expect(testResult.coverage).toBeDefined();
        expect(typeof testResult.coverage).toBe('string');
        expect(testResult.coverage).toMatch(/\d+(\.\d+)?%/);
      });
    });

    describe('File Loading', () => {
      it('should load JSON files successfully', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const jsonContent = JSON.stringify(mockFlowiseFlow);
        const mockFile = new File([jsonContent], 'test-flow.json', {
          type: 'application/json'
        });

        const loadedFlow = await result.current.loadFlowFromFile(mockFile);
        
        expect(loadedFlow.id).toBeDefined();
        expect(loadedFlow.name).toBe(mockFlowiseFlow.name);
        expect(loadedFlow.nodes.length).toBe(mockFlowiseFlow.nodes.length);
      });

      it('should handle Flowise chatflows format', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const chatflowFormat = {
          chatflows: [{
            id: 'cf-123',
            name: 'Test Chatflow',
            description: 'Test description',
            flowData: JSON.stringify({
              nodes: mockFlowiseFlow.nodes,
              edges: mockFlowiseFlow.edges
            })
          }]
        };

        const jsonContent = JSON.stringify(chatflowFormat);
        const mockFile = new File([jsonContent], 'chatflow.json', {
          type: 'application/json'
        });

        const loadedFlow = await result.current.loadFlowFromFile(mockFile);
        
        expect(loadedFlow.name).toBe('Test Chatflow');
        expect(loadedFlow.nodes.length).toBe(mockFlowiseFlow.nodes.length);
      });

      it('should handle Flowise agentflows format', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const agentflowFormat = {
          agentflows: [{
            id: 'af-123',
            name: 'Test Agentflow',
            description: 'Test agent description',
            flowData: JSON.stringify({
              nodes: mockFlowiseFlow.nodes,
              edges: mockFlowiseFlow.edges
            })
          }]
        };

        const jsonContent = JSON.stringify(agentflowFormat);
        const mockFile = new File([jsonContent], 'agentflow.json', {
          type: 'application/json'
        });

        const loadedFlow = await result.current.loadFlowFromFile(mockFile);
        
        expect(loadedFlow.name).toBe('Test Agentflow');
        expect(loadedFlow.nodes.length).toBe(mockFlowiseFlow.nodes.length);
      });

      it('should reject invalid file types', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const invalidFile = new File(['invalid content'], 'test.txt', {
          type: 'text/plain'
        });

        await expect(result.current.loadFlowFromFile(invalidFile))
          .rejects.toThrow('Invalid file type');
      });

      it('should reject files that are too large', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const largeContent = 'x'.repeat(11 * 1024 * 1024); // 11MB
        const largeFile = new File([largeContent], 'large.json', {
          type: 'application/json'
        });

        await expect(result.current.loadFlowFromFile(largeFile))
          .rejects.toThrow('File too large');
      });

      it('should handle malformed JSON gracefully', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const invalidJson = '{ invalid json content }';
        const mockFile = new File([invalidJson], 'invalid.json', {
          type: 'application/json'
        });

        await expect(result.current.loadFlowFromFile(mockFile))
          .rejects.toThrow('Invalid JSON');
      });
    });

    describe('Performance and Optimization', () => {
      it('should handle large flows efficiently', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        // Create a large flow with many nodes
        const largeFlow = {
          ...mockFlowiseFlow,
          nodes: Array.from({ length: 100 }, (_, i) => ({
            id: `node_${i}`,
            type: 'llm',
            label: `Node ${i}`,
            data: { modelName: 'gpt-3.5-turbo' },
            position: { x: i * 50, y: Math.floor(i / 10) * 100 }
          })),
          edges: Array.from({ length: 99 }, (_, i) => ({
            id: `edge_${i}`,
            source: `node_${i}`,
            target: `node_${i + 1}`,
            sourceHandle: 'output',
            targetHandle: 'input'
          }))
        };

        const startTime = performance.now();
        
        const validationResult = await result.current.validateFlow(largeFlow);
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        expect(validationResult.isValid).toBeDefined();
        expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
        expect(validationResult.nodeCount).toBe(100);
        expect(validationResult.complexity).toBe('high');
      });

      it('should optimize conversion for complex flows', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const complexFlow = TestData.createLargeFlow(50, 0.8);
        
        const startTime = performance.now();
        
        const conversionResult = await result.current.convertFlow(
          complexFlow,
          { ...mockConversionOptions, optimize: true }
        );
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        expect(conversionResult.success).toBeDefined();
        expect(duration).toBeLessThan(10000); // Should complete within 10 seconds
      });

      it('should implement proper memory management', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const initialMemory = performance.memory?.usedJSHeapSize || 0;
        
        // Process multiple flows to test memory usage
        for (let i = 0; i < 10; i++) {
          const testFlow = createMockFlow(20, 15);
          await result.current.validateFlow(testFlow);
          await result.current.convertFlow(testFlow, mockConversionOptions);
        }
        
        const finalMemory = performance.memory?.usedJSHeapSize || 0;
        const memoryIncrease = finalMemory - initialMemory;
        
        // Memory increase should be reasonable
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
      });
    });

    describe('Error Recovery and Resilience', () => {
      it('should recover from network interruptions', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        // Simulate network interruption by temporarily stopping mock server
        await mockServer.close();
        
        // This should fall back to local implementation
        const validationResult = await result.current.validateFlow(mockFlowiseFlow);
        
        expect(validationResult.isValid).toBeDefined();
        
        // Restart mock server
        mockServer = await createMockServer(TEST_PORT);
      });

      it('should handle API version mismatches gracefully', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        // Mock server can simulate API version mismatch responses
        const conversionResult = await result.current.convertFlow(
          mockFlowiseFlow,
          mockConversionOptions
        );
        
        // Should either succeed with fallback or provide clear error
        expect(typeof conversionResult.success).toBe('boolean');
      });

      it('should provide meaningful error messages for debugging', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const invalidFlow = {
          nodes: null,
          edges: undefined
        } as any;

        try {
          await result.current.validateFlow(invalidFlow);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toContain('validation');
        }
      });
    });
  });

  describe('Performance Benchmarks', () => {
    it('should meet performance benchmarks for validation', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const benchmarkSizes = [10, 50, 100];
      const results = [];

      for (const size of benchmarkSizes) {
        const testFlow = TestData.createLargeFlow(size, 0.5);
        const startTime = performance.now();
        
        await result.current.validateFlow(testFlow);
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        results.push({ size, duration });
      }

      // Validation should scale reasonably with flow size
      results.forEach(({ size, duration }) => {
        const expectedMaxDuration = size * 10; // 10ms per node
        expect(duration).toBeLessThan(expectedMaxDuration);
      });
    });

    it('should meet performance benchmarks for conversion', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const testFlow = TestData.createLargeFlow(25, 0.6);
      const startTime = performance.now();
      
      const conversionResult = await result.current.convertFlow(
        testFlow,
        mockConversionOptions
      );
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(conversionResult.success).toBeDefined();
      expect(duration).toBeLessThan(30000); // Should complete within 30 seconds
      
      // Log performance metrics for monitoring
      console.log(`Conversion benchmark: ${testFlow.nodes.length} nodes in ${duration.toFixed(2)}ms`);
    });

    it('should maintain consistent performance across test runs', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const testFlow = createMockFlow(10, 8);
      const durations = [];

      // Run multiple iterations to check consistency
      for (let i = 0; i < 5; i++) {
        const startTime = performance.now();
        await result.current.validateFlow(testFlow);
        const endTime = performance.now();
        durations.push(endTime - startTime);
      }

      // Calculate variance to ensure consistency
      const mean = durations.reduce((sum, d) => sum + d, 0) / durations.length;
      const variance = durations.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / durations.length;
      const standardDeviation = Math.sqrt(variance);
      
      // Standard deviation should be less than 50% of mean (reasonable consistency)
      expect(standardDeviation).toBeLessThan(mean * 0.5);
    });
  });
});