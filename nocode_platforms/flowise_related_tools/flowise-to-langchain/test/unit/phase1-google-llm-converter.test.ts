/**
 * Phase 1 Google Generative AI Converter Test Suite
 * 
 * Tests for Google Generative AI LLM converter including:
 * - Basic instantiation and configuration
 * - Parameter mapping and validation
 * - Code generation and TypeScript compilation
 * - Integration with LangChain packages
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

// Import Google Generative AI converter
import {
  GoogleGenerativeAIConverter,
} from '../../src/registry/converters/llm.js';

import {
  createMockNode,
  validateTypeScriptCode,
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers.js';

// Test utilities
function createGoogleLLMNode(overrides: Partial<any> = {}): IRNode {
  const baseInputs = {
    modelName: 'gemini-pro',
    temperature: 0.7,
    maxOutputTokens: 1024,
    apiKey: 'your-google-api-key',
    streaming: false,
    ...overrides.inputs,
  };

  const parameters = Object.entries(baseInputs).map(([name, value]) => ({
    name,
    value,
    type: typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'boolean' : 'string'
  }));

  return {
    id: `google-llm-${Math.random().toString(36).substr(2, 9)}`,
    type: 'googleGenerativeAI',
    label: 'Google_Generative_AI',
    category: 'llm',
    inputs: [],
    outputs: [],
    parameters,
    position: { x: 100, y: 100 },
    metadata: {
      version: '2.0',
      description: 'Google Generative AI LLM (Gemini)',
    },
    ...overrides,
  } as IRNode;
}

const mockContext: GenerationContext = {
  targetLanguage: 'typescript',
  outputPath: '/test',
  projectName: 'test-google-llm',
  includeTests: false,
  includeDocs: false,
  includeLangfuse: false,
  packageManager: 'npm',
  environment: {},
  codeStyle: {
    indentSize: 2,
    useSpaces: true,
    semicolons: true,
    singleQuotes: true,
    trailingCommas: true
  }
};

describe('Phase 1 Google Generative AI Converter', () => {
  let performanceTimer: PerformanceTimer;
  let memoryTracker: MemoryTracker;

  beforeEach(() => {
    performanceTimer = new PerformanceTimer();
    memoryTracker = new MemoryTracker();
    performanceTimer.start();
    memoryTracker.start();
  });

  afterEach(() => {
    const duration = performanceTimer.stop();
    const memory = memoryTracker.getUsage();
    
    // Performance assertions
    expect(duration).toBeLessThan(1000); // Should complete within 1s
    expect(memory.difference).toBeLessThan(50 * 1024 * 1024); // Should use less than 50MB
  });

  describe('GoogleGenerativeAIConverter', () => {
    const converter = new GoogleGenerativeAIConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(GoogleGenerativeAIConverter);
      expect(converter.flowiseType).toBe('googleGenerativeAI');
      expect(converter.category).toBe('llm');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/google-genai');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic Google Generative AI node', () => {
      const mockNode = createGoogleLLMNode({
        inputs: {
          modelName: 'gemini-pro',
          temperature: 0.5,
          maxOutputTokens: 2048,
          apiKey: 'test-api-key-123',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2); // import and declaration
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('@langchain/google-genai');
      expect(importFragment!.content).toContain('GoogleGenerativeAI');
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment).toBeDefined();
      expect(declarationFragment!.content).toContain('new GoogleGenerativeAI');
      expect(declarationFragment!.content).toContain('model: "gemini-pro"');
      expect(declarationFragment!.content).toContain('temperature: 0.5');
      expect(declarationFragment!.content).toContain('maxOutputTokens: 2048');
      expect(declarationFragment!.content).toContain('apiKey: "test-api-key-123"');
    });

    test('should handle Gemini-specific parameters', () => {
      const mockNode = createGoogleLLMNode({
        inputs: {
          modelName: 'gemini-pro-vision',
          topP: 0.8,
          topK: 40,
          streaming: true,
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ],
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('model: "gemini-pro-vision"');
      expect(declarationFragment!.content).toContain('topP: 0.8');
      expect(declarationFragment!.content).toContain('topK: 40');
      expect(declarationFragment!.content).toContain('streaming: true');
    });

    test('should handle different Gemini models', () => {
      const models = [
        'gemini-pro',
        'gemini-pro-vision',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'text-bison-001',
        'chat-bison-001'
      ];

      models.forEach(modelName => {
        const mockNode = createGoogleLLMNode({
          inputs: { modelName }
        });

        const fragments = converter.convert(mockNode, mockContext);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment!.content).toContain(`model: "${modelName}"`);
      });
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createGoogleLLMNode();
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should handle minimal configuration with defaults', () => {
      const mockNode = createGoogleLLMNode({
        inputs: {
          apiKey: 'minimal-api-key'
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('new GoogleGenerativeAI');
      expect(declarationFragment!.content).toContain('apiKey: "minimal-api-key"');
      // Should use default model
      expect(declarationFragment!.content).toContain('model: "gemini-pro"');
    });

    test('should handle environment variable API key', () => {
      const mockNode = createGoogleLLMNode({
        inputs: {
          modelName: 'gemini-pro',
          // No API key provided - should use environment variable
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('new GoogleGenerativeAI');
      // Should not include apiKey in config when not provided
      expect(declarationFragment!.content).not.toContain('apiKey: undefined');
    });

    test('should handle advanced configuration options', () => {
      const mockNode = createGoogleLLMNode({
        inputs: {
          modelName: 'gemini-1.5-pro',
          temperature: 0.3,
          maxOutputTokens: 4096,
          topP: 0.95,
          topK: 64,
          streaming: true,
          apiKey: 'advanced-config-key',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('model: "gemini-1.5-pro"');
      expect(declarationFragment!.content).toContain('temperature: 0.3');
      expect(declarationFragment!.content).toContain('maxOutputTokens: 4096');
      expect(declarationFragment!.content).toContain('topP: 0.95');
      expect(declarationFragment!.content).toContain('topK: 64');
      expect(declarationFragment!.content).toContain('streaming: true');
      expect(declarationFragment!.content).toContain('apiKey: "advanced-config-key"');
    });

    test('should handle edge cases and validation', () => {
      // Test with null/undefined inputs
      const mockNode = createGoogleLLMNode({
        inputs: {
          modelName: null,
          temperature: undefined,
          maxOutputTokens: '',
          topP: 'invalid',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('new GoogleGenerativeAI');
    });

    test('should provide correct variable naming', () => {
      const mockNode = createGoogleLLMNode();
      mockNode.id = 'google-test-123';

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      // Should generate a reasonable variable name
      expect(declarationFragment!.content).toMatch(/const \w+Llm = new GoogleGenerativeAI/);
    });
  });

  describe('Integration Tests', () => {
    test('should work with different generation contexts', () => {
      const converter = new GoogleGenerativeAIConverter();
      const mockNode = createGoogleLLMNode();

      // Test with different project names
      const contexts = [
        { ...mockContext, projectName: 'simple-project' },
        { ...mockContext, projectName: 'complex-ai-project' },
        { ...mockContext, projectName: 'google-gemini-test' },
      ];

      contexts.forEach(context => {
        const fragments = converter.convert(mockNode, context);
        expect(fragments).toHaveLength(2);
        
        const code = fragments.map(f => f.content).join('\n');
        const validation = validateTypeScriptCode(code);
        expect(validation.valid).toBe(true);
      });
    });

    test('should handle concurrent conversions', () => {
      const converter = new GoogleGenerativeAIConverter();
      const promises = [];

      // Create 10 concurrent conversions
      for (let i = 0; i < 10; i++) {
        const mockNode = createGoogleLLMNode({
          inputs: {
            modelName: `gemini-pro-${i}`,
            temperature: i * 0.1,
          }
        });

        promises.push(
          Promise.resolve(converter.convert(mockNode, mockContext))
        );
      }

      return Promise.all(promises).then(results => {
        expect(results).toHaveLength(10);
        results.forEach(fragments => {
          expect(fragments).toHaveLength(2);
        });
      });
    });
  });

  describe('Performance Tests', () => {
    test('should handle bulk conversion efficiently', () => {
      const converter = new GoogleGenerativeAIConverter();
      const timer = new PerformanceTimer();
      
      timer.start();
      
      // Convert 100 nodes
      for (let i = 0; i < 100; i++) {
        const mockNode = createGoogleLLMNode({
          inputs: {
            modelName: 'gemini-pro',
            temperature: Math.random(),
            maxOutputTokens: 1000 + i * 10,
          }
        });
        converter.convert(mockNode, mockContext);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(2000); // Should complete within 2s
    });

    test('should have consistent memory usage', () => {
      const converter = new GoogleGenerativeAIConverter();
      const tracker = new MemoryTracker();
      
      tracker.start();
      
      // Convert multiple times
      for (let i = 0; i < 50; i++) {
        const mockNode = createGoogleLLMNode();
        converter.convert(mockNode, mockContext);
      }
      
      const memory = tracker.getUsage();
      expect(memory.difference).toBeLessThan(20 * 1024 * 1024); // Less than 20MB
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed node data gracefully', () => {
      const converter = new GoogleGenerativeAIConverter();
      
      const malformedNode = {
        id: 'malformed',
        type: 'googleGenerativeAI',
        // Missing required fields
      } as any as IRNode;

      expect(() => {
        converter.convert(malformedNode, mockContext);
      }).not.toThrow();
    });

    test('should handle missing input parameters', () => {
      const converter = new GoogleGenerativeAIConverter();
      
      const nodeWithoutInputs = createGoogleLLMNode();
      delete nodeWithoutInputs.data.inputs;

      const fragments = converter.convert(nodeWithoutInputs, mockContext);
      expect(fragments).toHaveLength(2);
    });
  });

  describe('Code Quality Tests', () => {
    test('should generate properly formatted TypeScript', () => {
      const converter = new GoogleGenerativeAIConverter();
      const mockNode = createGoogleLLMNode();

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n\n');

      // Check for proper formatting
      expect(code).toMatch(/import.*from.*@langchain\/google-genai/);
      expect(code).toMatch(/const \w+ = new GoogleGenerativeAI\({[\s\S]*}\);/);
      
      // Check for proper indentation (2 spaces as per config)
      const lines = code.split('\n');
      const configLines = lines.filter(line => line.includes(':'));
      configLines.forEach(line => {
        if (line.trim().length > 0) {
          expect(line).toMatch(/^  \w+:/); // Should start with 2 spaces
        }
      });
    });

    test('should use single quotes as per style guide', () => {
      const converter = new GoogleGenerativeAIConverter();
      const mockNode = createGoogleLLMNode();

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');

      // Should use single quotes for imports
      expect(code).toMatch(/import.*from\s+'@langchain\/google-genai'/);
    });
  });
});