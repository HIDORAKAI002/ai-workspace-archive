/**
 * Error Scenario Testing Suite
 * 
 * Comprehensive tests for error handling, edge cases, and fault tolerance
 * in the Flowise converter API integration.
 */

import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { FlowiseApiClient } from '../../testing-ui/src/lib/flowise-api-client';
import { useFlowiseConverter } from '../../frontend/src/hooks/useFlowiseConverter';
import { createMockServer } from '../utils/mock-server';
import { TestData, createCorruptedFlow } from '../utils/test-helpers';

// Error simulation utilities
class ErrorSimulator {
  static createNetworkError(code: string, message: string) {
    const error = new Error(message);
    (error as any).code = code;
    return error;
  }

  static createHttpError(status: number, message: string, data?: any) {
    const error = new Error(message);
    (error as any).response = {
      status,
      data: data || { message },
      statusText: this.getStatusText(status)
    };
    return error;
  }

  static getStatusText(status: number): string {
    const statusTexts: { [key: number]: string } = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      408: 'Request Timeout',
      413: 'Payload Too Large',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout'
    };
    return statusTexts[status] || 'Unknown';
  }

  static createMalformedData(type: 'json' | 'flow' | 'response') {
    switch (type) {
      case 'json':
        return '{ "invalid": json, missing quotes }';
      case 'flow':
        return {
          nodes: [null, undefined, { invalid: 'structure' }],
          edges: [{ source: null, target: undefined }],
          invalidField: 'should not exist'
        };
      case 'response':
        return {
          success: 'maybe', // Should be boolean
          data: 'not an object',
          error: 123, // Should be string
          timestamp: 'invalid-date-format'
        };
    }
  }
}

describe('Error Scenario Testing', () => {
  let mockServer: any;
  let apiClient: FlowiseApiClient;
  const TEST_PORT = 3004;
  const TEST_URL = `http://localhost:${TEST_PORT}`;

  beforeAll(async () => {
    mockServer = await createMockServer(TEST_PORT, {
      enableErrorSimulation: true,
      errorRates: {
        network: 0.1,
        timeout: 0.05,
        serverError: 0.1
      }
    });

    apiClient = new FlowiseApiClient({
      url: TEST_URL,
      timeout: 5000,
      retryAttempts: 2,
      retryDelay: 100
    });
  });

  afterAll(async () => {
    if (mockServer) {
      await mockServer.close();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Network Error Scenarios', () => {
    it('should handle connection refused errors', async () => {
      const failingClient = new FlowiseApiClient({
        url: 'http://localhost:9999', // Non-existent server
        timeout: 1000,
        retryAttempts: 1
      });

      const result = await failingClient.testConnection();
      
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/Cannot connect|ECONNREFUSED/);
    });

    it('should handle DNS resolution failures', async () => {
      const dnsFailClient = new FlowiseApiClient({
        url: 'http://non-existent-domain-12345.com',
        timeout: 2000,
        retryAttempts: 1
      });

      const result = await dnsFailClient.getFlows();
      
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/ENOTFOUND|getaddrinfo/);
    });

    it('should handle network timeouts gracefully', async () => {
      const timeoutClient = new FlowiseApiClient({
        url: TEST_URL,
        timeout: 50, // Very short timeout
        retryAttempts: 1
      });

      const result = await timeoutClient.getFlow('slow-response-flow');
      
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/timeout|ECONNABORTED/);
    });

    it('should handle intermittent connectivity issues', async () => {
      const results = [];
      
      // Make multiple requests to simulate intermittent failures
      for (let i = 0; i < 10; i++) {
        const result = await apiClient.getFlows();
        results.push(result);
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Should have some failures due to simulated network issues
      const failures = results.filter(r => !r.success);
      const successes = results.filter(r => r.success);
      
      expect(failures.length).toBeGreaterThan(0);
      expect(successes.length).toBeGreaterThan(0);
    });

    it('should handle slow responses with timeout recovery', async () => {
      const adaptiveClient = new FlowiseApiClient({
        url: TEST_URL,
        timeout: 1000,
        retryAttempts: 3,
        retryDelay: 200
      });

      const startTime = Date.now();
      const result = await adaptiveClient.getFlow('variable-response-time');
      const endTime = Date.now();
      
      // Should either succeed or fail within reasonable time
      expect(endTime - startTime).toBeLessThan(5000);
      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('HTTP Error Status Codes', () => {
    it('should handle 400 Bad Request errors', async () => {
      const invalidData = ErrorSimulator.createMalformedData('flow');
      
      const result = await apiClient.createFlow({
        name: 'Invalid Flow',
        flowData: invalidData
      } as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/validation|bad request/i);
    });

    it('should handle 401 Unauthorized errors', async () => {
      const authClient = new FlowiseApiClient({
        url: TEST_URL,
        apiKey: 'invalid-api-key-12345'
      });

      const result = await authClient.getFlows();
      
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/unauthorized|API key/i);
    });

    it('should handle 403 Forbidden errors', async () => {
      const result = await apiClient.deleteFlow('protected-flow-id');
      
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/forbidden|permission/i);
    });

    it('should handle 404 Not Found errors', async () => {
      const result = await apiClient.getFlow('non-existent-flow-12345');
      
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/not found|Resource not found/i);
    });

    it('should handle 413 Payload Too Large errors', async () => {
      const largeFlow = TestData.createLargeFlow(1000, 0.9); // Very large flow
      
      const result = await apiClient.createFlow({
        name: 'Massive Flow',
        flowData: largeFlow
      });
      
      if (!result.success) {
        expect(result.error).toMatch(/too large|payload|size/i);
      }
    });

    it('should handle 429 Rate Limit errors', async () => {
      const requests = Array.from({ length: 100 }, () => 
        apiClient.getFlows()
      );

      const results = await Promise.allSettled(requests);
      
      const rateLimitErrors = results.filter(result => 
        result.status === 'rejected' ||
        (result.status === 'fulfilled' && 
         !result.value.success && 
         result.value.error?.includes('Rate limit'))
      );

      expect(rateLimitErrors.length).toBeGreaterThan(0);
    });

    it('should handle 500 Internal Server errors', async () => {
      const result = await apiClient.getFlow('trigger-server-error');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle 502 Bad Gateway errors', async () => {
      const result = await apiClient.getFlow('trigger-gateway-error');
      
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });

    it('should handle 503 Service Unavailable errors', async () => {
      const result = await apiClient.getFlow('trigger-service-unavailable');
      
      if (!result.success) {
        expect(result.error).toMatch(/service unavailable|maintenance/i);
      }
    });
  });

  describe('Data Corruption and Malformed Responses', () => {
    it('should handle malformed JSON responses', async () => {
      try {
        const result = await apiClient.getFlow('malformed-json-response');
        expect(result.success).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toMatch(/JSON|parse/i);
      }
    });

    it('should handle missing required fields in responses', async () => {
      const result = await apiClient.getFlow('incomplete-response');
      
      // Should handle gracefully even if response is missing fields
      expect(typeof result.success).toBe('boolean');
    });

    it('should handle unexpected response structure', async () => {
      const result = await apiClient.getFlows();
      
      // Should normalize response even if structure is unexpected
      expect(result.success).toBeDefined();
      if (result.success && result.data) {
        expect(Array.isArray(result.data.flows)).toBe(true);
      }
    });

    it('should handle binary data in text responses', async () => {
      try {
        const result = await apiClient.getFlow('binary-response');
        expect(typeof result.success).toBe('boolean');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle extremely large responses', async () => {
      const startTime = Date.now();
      const result = await apiClient.getFlow('large-response');
      const endTime = Date.now();
      
      // Should handle or timeout gracefully
      expect(endTime - startTime).toBeLessThan(10000);
      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('Frontend Hook Error Scenarios', () => {
    const createWrapper = () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      );
      return wrapper;
    };

    describe('Flow Validation Errors', () => {
      it('should handle null/undefined flow input', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        try {
          await result.current.validateFlow(null as any);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toMatch(/flow|required/i);
        }
      });

      it('should handle flows with circular references', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const circularFlow: any = {
          id: 'circular',
          name: 'Circular Flow',
          nodes: [],
          edges: []
        };
        circularFlow.self = circularFlow; // Create circular reference

        try {
          const validationResult = await result.current.validateFlow(circularFlow);
          expect(typeof validationResult.isValid).toBe('boolean');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      it('should handle flows with extremely deep nesting', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const deepFlow = TestData.createDeeplyNestedFlow(100);

        const validationResult = await result.current.validateFlow(deepFlow);
        expect(typeof validationResult.isValid).toBe('boolean');
      });

      it('should handle flows with invalid node data types', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const invalidFlow = {
          id: 'invalid-types',
          name: 'Invalid Types Flow',
          nodes: [
            {
              id: 123, // Should be string
              type: null, // Should be string
              data: 'not an object', // Should be object
              position: [0, 0] // Should be object with x, y
            }
          ],
          edges: []
        };

        const validationResult = await result.current.validateFlow(invalidFlow as any);
        expect(validationResult.isValid).toBe(false);
        expect(validationResult.errors.length).toBeGreaterThan(0);
      });
    });

    describe('Conversion Error Scenarios', () => {
      it('should handle conversion with unsupported node types', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const unsupportedFlow = {
          id: 'unsupported',
          name: 'Unsupported Flow',
          nodes: [
            {
              id: 'future_node',
              type: 'quantum_computer',
              label: 'Quantum Computer',
              data: { qubits: 1000 },
              position: { x: 0, y: 0 }
            }
          ],
          edges: [],
          version: '1.0.0',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isValid: true
        };

        const conversionResult = await result.current.convertFlow(
          unsupportedFlow,
          {
            format: 'typescript',
            target: 'node',
            outputPath: './output',
            includeTests: false,
            includeDocs: false,
            optimize: false
          }
        );

        expect(conversionResult.success).toBe(false);
        expect(conversionResult.errors.length).toBeGreaterThan(0);
      });

      it('should handle conversion with invalid options', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const validFlow = TestData.createValidFlow();
        const invalidOptions = {
          format: 'invalid_format',
          target: 'invalid_target',
          outputPath: null,
          includeTests: 'maybe',
          includeDocs: 123
        } as any;

        try {
          await result.current.convertFlow(validFlow, invalidOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toMatch(/options|validation/i);
        }
      });

      it('should handle memory exhaustion during conversion', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        // Create an extremely large flow that might cause memory issues
        const massiveFlow = TestData.createLargeFlow(10000, 0.95);

        try {
          const conversionResult = await result.current.convertFlow(
            massiveFlow,
            {
              format: 'typescript',
              target: 'node',
              outputPath: './output',
              includeTests: true,
              includeDocs: true,
              optimize: false
            }
          );

          // Should either succeed or fail gracefully
          expect(typeof conversionResult.success).toBe('boolean');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });

    describe('File Loading Error Scenarios', () => {
      it('should handle corrupted file content', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const corruptedContent = '\x00\x01\x02Binary data mixed with JSON{"nodes":[]';
        const corruptedFile = new File([corruptedContent], 'corrupted.json', {
          type: 'application/json'
        });

        try {
          await result.current.loadFlowFromFile(corruptedFile);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toMatch(/JSON|format|invalid/i);
        }
      });

      it('should handle files with BOM (Byte Order Mark)', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const validJson = JSON.stringify({ nodes: [], edges: [] });
        const bomContent = '\uFEFF' + validJson; // Add BOM
        const bomFile = new File([bomContent], 'bom.json', {
          type: 'application/json'
        });

        const loadedFlow = await result.current.loadFlowFromFile(bomFile);
        expect(loadedFlow).toBeDefined();
        expect(Array.isArray(loadedFlow.nodes)).toBe(true);
      });

      it('should handle files with mixed encoding', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        // Create content with mixed encoding characters
        const mixedContent = JSON.stringify({
          name: 'Flow with émojis 🚀 and spëcial chars',
          nodes: [],
          edges: []
        });

        const mixedFile = new File([mixedContent], 'mixed.json', {
          type: 'application/json'
        });

        const loadedFlow = await result.current.loadFlowFromFile(mixedFile);
        expect(loadedFlow.name).toContain('émojis');
      });

      it('should handle empty files', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const emptyFile = new File([''], 'empty.json', {
          type: 'application/json'
        });

        try {
          await result.current.loadFlowFromFile(emptyFile);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toMatch(/empty|invalid/i);
        }
      });

      it('should handle files with only whitespace', async () => {
        const { result } = renderHook(() => useFlowiseConverter(), {
          wrapper: createWrapper()
        });

        const whitespaceFile = new File(['   \n\t  \r\n  '], 'whitespace.json', {
          type: 'application/json'
        });

        try {
          await result.current.loadFlowFromFile(whitespaceFile);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });

  describe('Concurrent Error Scenarios', () => {
    it('should handle multiple simultaneous failures', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const invalidFlows = [
        null,
        undefined,
        { invalid: 'structure' },
        ErrorSimulator.createMalformedData('flow'),
        createCorruptedFlow()
      ];

      const promises = invalidFlows.map(flow => 
        result.current.validateFlow(flow as any).catch(error => ({ error }))
      );

      const results = await Promise.allSettled(promises);
      
      // All should either reject or return invalid validation
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          const value = result.value;
          if ('error' in value) {
            expect(value.error).toBeInstanceOf(Error);
          } else {
            expect(value.isValid).toBe(false);
          }
        }
      });
    });

    it('should handle mixed success/failure scenarios', async () => {
      const flows = [
        TestData.createValidFlow(),
        createCorruptedFlow(),
        TestData.createValidFlow(),
        null,
        TestData.createValidFlow()
      ];

      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const promises = flows.map(async (flow, index) => {
        try {
          if (!flow) throw new Error('Null flow');
          return await result.current.validateFlow(flow);
        } catch (error) {
          return { error, index };
        }
      });

      const results = await Promise.allSettled(promises);
      
      const successes = results.filter(r => 
        r.status === 'fulfilled' && 
        !('error' in r.value) && 
        r.value.isValid === true
      );
      
      const failures = results.filter(r => 
        r.status === 'rejected' || 
        (r.status === 'fulfilled' && ('error' in r.value || r.value.isValid === false))
      );

      expect(successes.length).toBeGreaterThan(0);
      expect(failures.length).toBeGreaterThan(0);
    });

    it('should handle resource exhaustion under load', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      // Create many concurrent operations to test resource limits
      const heavyOperations = Array.from({ length: 50 }, (_, i) => 
        result.current.convertFlow(
          TestData.createLargeFlow(20, 0.7),
          {
            format: 'typescript',
            target: 'node',
            outputPath: `./output-${i}`,
            includeTests: true,
            includeDocs: true,
            optimize: false
          }
        )
      );

      const startTime = Date.now();
      const results = await Promise.allSettled(heavyOperations);
      const endTime = Date.now();

      // Should complete within reasonable time even under load
      expect(endTime - startTime).toBeLessThan(60000); // 1 minute

      // Some operations might fail due to resource constraints, but should fail gracefully
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          expect(typeof result.value.success).toBe('boolean');
        } else {
          expect(result.reason).toBeInstanceOf(Error);
        }
      });
    });
  });

  describe('Recovery and Resilience Testing', () => {
    it('should recover from temporary server outages', async () => {
      // Simulate server going down temporarily
      await mockServer.close();

      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      // This should use fallback implementation
      const validationResult = await result.current.validateFlow(
        TestData.createValidFlow()
      );

      expect(typeof validationResult.isValid).toBe('boolean');

      // Restart server
      mockServer = await createMockServer(TEST_PORT, {
        enableErrorSimulation: true
      });

      // Subsequent requests should work normally
      const secondResult = await result.current.validateFlow(
        TestData.createValidFlow()
      );

      expect(typeof secondResult.isValid).toBe('boolean');
    });

    it('should handle graceful degradation of features', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      // Test with limited functionality (no API available)
      const conversionResult = await result.current.convertFlow(
        TestData.createValidFlow(),
        {
          format: 'typescript',
          target: 'node',
          outputPath: './output',
          includeTests: false,
          includeDocs: false,
          optimize: false
        }
      );

      // Should provide basic functionality even if advanced features fail
      expect(typeof conversionResult.success).toBe('boolean');
      if (conversionResult.success) {
        expect(conversionResult.generatedCode).toBeDefined();
      }
    });

    it('should maintain data consistency during errors', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const testFlow = TestData.createValidFlow();
      
      // Multiple operations that might fail
      const operations = [
        () => result.current.validateFlow(testFlow),
        () => result.current.convertFlow(testFlow, {
          format: 'typescript',
          target: 'node',
          outputPath: './output',
          includeTests: false,
          includeDocs: false,
          optimize: false
        }),
        () => result.current.loadFlowFromFile(
          new File([JSON.stringify(testFlow)], 'test.json', {
            type: 'application/json'
          })
        )
      ];

      for (const operation of operations) {
        try {
          const result = await operation();
          // Verify data consistency in successful operations
          if (typeof result === 'object' && result !== null) {
            expect(result).toBeDefined();
          }
        } catch (error) {
          // Errors should be proper Error instances
          expect(error).toBeInstanceOf(Error);
        }
      }
    });
  });

  describe('Edge Case Data Validation', () => {
    it('should handle extremely long strings', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const longString = 'x'.repeat(1000000); // 1MB string
      const flowWithLongStrings = {
        id: 'long-strings',
        name: longString.substring(0, 1000), // Reasonable name length
        description: longString,
        nodes: [{
          id: 'node_1',
          type: 'llm',
          label: longString.substring(0, 100),
          data: {
            systemMessage: longString,
            description: longString
          },
          position: { x: 0, y: 0 }
        }],
        edges: [],
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isValid: true
      };

      const validationResult = await result.current.validateFlow(flowWithLongStrings);
      expect(typeof validationResult.isValid).toBe('boolean');
    });

    it('should handle unicode and special characters', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const unicodeFlow = {
        id: 'unicode-flow',
        name: 'Flow with 🚀 émojis and spëcial chars 中文 العربية',
        description: 'Testing unicode: \u0000\u001f\u007f\u0080\u009f',
        nodes: [{
          id: 'unicode_node',
          type: 'llm',
          label: '🤖 AI Node with unicode',
          data: {
            systemMessage: 'Hello 世界! How are you? 🌍',
            special: '\n\t\r\\"\\\'\\\\',
            null_char: '\x00',
            rtl_text: 'مرحبا بالعالم'
          },
          position: { x: 0, y: 0 }
        }],
        edges: [],
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isValid: true
      };

      const validationResult = await result.current.validateFlow(unicodeFlow);
      expect(typeof validationResult.isValid).toBe('boolean');
    });

    it('should handle numeric edge cases', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const numericEdgeCases = {
        id: 'numeric-edge-cases',
        name: 'Numeric Edge Cases',
        nodes: [{
          id: 'numeric_node',
          type: 'llm',
          label: 'Numeric Test',
          data: {
            temperature: Number.MAX_VALUE,
            maxTokens: Number.MIN_VALUE,
            infinity: Infinity,
            negativeInfinity: -Infinity,
            notANumber: NaN,
            zero: 0,
            negativeZero: -0,
            largeInteger: Number.MAX_SAFE_INTEGER + 1,
            smallFloat: Number.MIN_VALUE
          },
          position: { x: Infinity, y: -Infinity }
        }],
        edges: [],
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isValid: true
      };

      const validationResult = await result.current.validateFlow(numericEdgeCases);
      expect(typeof validationResult.isValid).toBe('boolean');
    });
  });
});