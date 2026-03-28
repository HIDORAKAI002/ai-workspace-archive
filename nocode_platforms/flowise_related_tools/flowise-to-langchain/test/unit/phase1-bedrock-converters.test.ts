/**
 * Phase 1 Bedrock Converters Test Suite
 * 
 * Tests for AWS Bedrock converters including:
 * - BedrockChatConverter
 * - BedrockLLMConverter
 * - BedrockEmbeddingConverter
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

// Import Bedrock converters
import {
  BedrockChatConverter,
  BedrockLLMConverter,
  BedrockEmbeddingConverter,
} from '../../src/registry/converters/bedrock.js';

import {
  createMockNode,
  validateTypeScriptCode,
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers.js';

// Test utilities
function createBedrockNode(type: string, overrides: Partial<any> = {}): IRNode {
  const baseInputs = {
    modelName: 'anthropic.claude-v2',
    region: 'us-east-1',
    temperature: 0.7,
    maxTokens: 256,
    ...overrides.inputs,
  };

  const parameters = Object.entries(baseInputs).map(([name, value]) => ({
    name,
    value,
    type: typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'boolean' : 'string'
  }));

  return {
    id: `bedrock-${Math.random().toString(36).substr(2, 9)}`,
    type,
    label: `Bedrock_${type}`,
    category: 'llm',
    inputs: [],
    outputs: [],
    parameters,
    position: { x: 100, y: 100 },
    metadata: {
      version: '2.0',
      description: `AWS Bedrock ${type} model`,
    },
    ...overrides,
  } as IRNode;
}

const mockContext: GenerationContext = {
  targetLanguage: 'typescript',
  outputPath: '/test',
  projectName: 'test-bedrock',
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

describe('Phase 1 Bedrock Converters', () => {
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

  describe('BedrockChatConverter', () => {
    const converter = new BedrockChatConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(BedrockChatConverter);
      expect(converter.flowiseType).toBe('bedrockChat');
      expect(converter.category).toBe('llm');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic BedrockChat node', () => {
      const mockNode = createBedrockNode('bedrockChat', {
        inputs: {
          modelName: 'anthropic.claude-v2',
          region: 'us-east-1',
          temperature: 0.7,
          maxTokens: 512,
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2); // import and declaration
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('@langchain/community/chat_models/bedrock');
      expect(importFragment!.content).toContain('BedrockChat');
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment).toBeDefined();
      expect(declarationFragment!.content).toContain('new BedrockChat');
      expect(declarationFragment!.content).toContain('model: "anthropic.claude-v2"');
      expect(declarationFragment!.content).toContain('region: "us-east-1"');
      expect(declarationFragment!.content).toContain('temperature: 0.7');
      expect(declarationFragment!.content).toContain('maxTokens: 512');
    });

    test('should handle BedrockChat specific parameters', () => {
      const mockNode = createBedrockNode('bedrockChat', {
        inputs: {
          modelName: 'anthropic.claude-instant-v1',
          topP: 0.9,
          topK: 10,
          stopSequences: ['Human:', 'AI:'],
          maxRetries: 3,
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('topP: 0.9');
      expect(declarationFragment!.content).toContain('topK: 10');
      expect(declarationFragment!.content).toContain('stopSequences: ["Human:", "AI:"]');
      expect(declarationFragment!.content).toContain('maxRetries: 3');
    });

    test('should handle AWS credentials', () => {
      const mockNode = createBedrockNode('bedrockChat', {
        inputs: {
          modelName: 'anthropic.claude-v2',
          accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
          secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
          sessionToken: 'temporary-token',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('credentials:');
      expect(declarationFragment!.content).toContain('accessKeyId: "AKIAIOSFODNN7EXAMPLE"');
      expect(declarationFragment!.content).toContain('secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"');
      expect(declarationFragment!.content).toContain('sessionToken: "temporary-token"');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createBedrockNode('bedrockChat');
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should handle minimal configuration', () => {
      const mockNode = createBedrockNode('bedrockChat', {
        inputs: {} // Empty inputs
      });

      const fragments = converter.convert(mockNode, mockContext);
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('new BedrockChat');
      // Should use defaults
      expect(declarationFragment!.content).toContain('model: "anthropic.claude-v2"');
      expect(declarationFragment!.content).toContain('region: "us-east-1"');
    });
  });

  describe('BedrockLLMConverter', () => {
    const converter = new BedrockLLMConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(BedrockLLMConverter);
      expect(converter.flowiseType).toBe('bedrockLLM');
      expect(converter.category).toBe('llm');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic BedrockLLM node', () => {
      const mockNode = createBedrockNode('bedrockLLM', {
        inputs: {
          modelName: 'amazon.titan-text-lite-v1',
          region: 'us-west-2',
          temperature: 0.5,
          maxTokens: 1024,
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2);
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment!.content).toContain('@langchain/community/llms/bedrock');
      expect(importFragment!.content).toContain('Bedrock');
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('new Bedrock');
      expect(declarationFragment!.content).toContain('model: "amazon.titan-text-lite-v1"');
      expect(declarationFragment!.content).toContain('region: "us-west-2"');
      expect(declarationFragment!.content).toContain('temperature: 0.5');
      expect(declarationFragment!.content).toContain('maxTokens: 1024');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createBedrockNode('bedrockLLM');
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('BedrockEmbeddingConverter', () => {
    const converter = new BedrockEmbeddingConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(BedrockEmbeddingConverter);
      expect(converter.flowiseType).toBe('bedrockEmbedding');
      expect(converter.category).toBe('embedding');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic BedrockEmbedding node', () => {
      const mockNode = createBedrockNode('bedrockEmbedding', {
        inputs: {
          modelName: 'amazon.titan-embed-text-v1',
          region: 'us-east-1',
        }
      });
      mockNode.category = 'embedding';

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2);
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment!.content).toContain('@langchain/community/embeddings/bedrock');
      expect(importFragment!.content).toContain('BedrockEmbeddings');
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('new BedrockEmbeddings');
      expect(declarationFragment!.content).toContain('model: "amazon.titan-embed-text-v1"');
      expect(declarationFragment!.content).toContain('region: "us-east-1"');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createBedrockNode('bedrockEmbedding');
      mockNode.category = 'embedding';
      
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('Integration Tests', () => {
    test('should handle multiple Bedrock converters together', () => {
      const chatConverter = new BedrockChatConverter();
      const llmConverter = new BedrockLLMConverter();
      const embeddingConverter = new BedrockEmbeddingConverter();

      const chatNode = createBedrockNode('bedrockChat');
      const llmNode = createBedrockNode('bedrockLLM');
      const embeddingNode = createBedrockNode('bedrockEmbedding');
      embeddingNode.category = 'embedding';

      const chatFragments = chatConverter.convert(chatNode, mockContext);
      const llmFragments = llmConverter.convert(llmNode, mockContext);
      const embeddingFragments = embeddingConverter.convert(embeddingNode, mockContext);

      // All conversions should succeed
      expect(chatFragments).toHaveLength(2);
      expect(llmFragments).toHaveLength(2);
      expect(embeddingFragments).toHaveLength(2);

      // Each should have unique imports
      const allImports = [
        ...chatFragments.filter(f => f.type === 'import'),
        ...llmFragments.filter(f => f.type === 'import'),
        ...embeddingFragments.filter(f => f.type === 'import')
      ];

      expect(allImports).toHaveLength(3);
      expect(allImports[0].content).toContain('chat_models/bedrock');
      expect(allImports[1].content).toContain('llms/bedrock');
      expect(allImports[2].content).toContain('embeddings/bedrock');
    });

    test('should handle edge cases and error conditions', () => {
      const converter = new BedrockChatConverter();
      
      // Test with null/undefined inputs
      const mockNode = createBedrockNode('bedrockChat', {
        inputs: {
          modelName: null,
          temperature: undefined,
          maxTokens: '',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('new BedrockChat');
    });

    test('should provide correct parameter mapping', () => {
      const converter = new BedrockChatConverter();
      const mockNode = createBedrockNode('bedrockChat', {
        inputs: {
          modelName: 'anthropic.claude-3-sonnet-20240229-v1:0',
          temperature: 0.3,
          maxTokens: 2048,
          topP: 0.8,
          topK: 5,
          stopSequences: ['Human:', 'Assistant:'],
          streaming: true,
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      // Check all parameters are correctly mapped
      expect(declarationFragment!.content).toContain('model: "anthropic.claude-3-sonnet-20240229-v1:0"');
      expect(declarationFragment!.content).toContain('temperature: 0.3');
      expect(declarationFragment!.content).toContain('maxTokens: 2048');
      expect(declarationFragment!.content).toContain('topP: 0.8');
      expect(declarationFragment!.content).toContain('topK: 5');
      expect(declarationFragment!.content).toContain('stopSequences: ["Human:", "Assistant:"]');
      expect(declarationFragment!.content).toContain('streaming: true');
    });
  });

  describe('Performance Tests', () => {
    test('should handle bulk conversion efficiently', () => {
      const converter = new BedrockChatConverter();
      const timer = new PerformanceTimer();
      
      timer.start();
      
      // Convert 100 nodes
      for (let i = 0; i < 100; i++) {
        const mockNode = createBedrockNode('bedrockChat', {
          inputs: {
            modelName: `model-${i}`,
            temperature: Math.random(),
          }
        });
        converter.convert(mockNode, mockContext);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(2000); // Should complete within 2s
    });

    test('should have consistent memory usage', () => {
      const converter = new BedrockChatConverter();
      const tracker = new MemoryTracker();
      
      tracker.start();
      
      // Convert multiple times
      for (let i = 0; i < 50; i++) {
        const mockNode = createBedrockNode('bedrockChat');
        converter.convert(mockNode, mockContext);
      }
      
      const memory = tracker.getUsage();
      expect(memory.difference).toBeLessThan(20 * 1024 * 1024); // Less than 20MB
    });
  });
});