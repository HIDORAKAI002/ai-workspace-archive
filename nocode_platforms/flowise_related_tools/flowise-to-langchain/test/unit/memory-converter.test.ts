/**
 * Memory Converter Comprehensive Test Suite
 * 
 * Tests all memory converter implementations including:
 * - BufferMemoryConverter
 * - BufferWindowMemoryConverter  
 * - SummaryBufferMemoryConverter
 * - VectorStoreRetrieverMemoryConverter
 * - ConversationSummaryMemoryConverter
 * - EntityMemoryConverter
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment, IRConnection } from '../../src/ir/types.js';

// Registry converters
import {
  BufferMemoryConverter as RegistryBufferMemoryConverter,
  BufferWindowMemoryConverter as RegistryBufferWindowMemoryConverter,
  SummaryBufferMemoryConverter as RegistrySummaryBufferMemoryConverter,
  VectorStoreRetrieverMemoryConverter as RegistryVectorStoreRetrieverMemoryConverter,
  ConversationSummaryMemoryConverter as RegistryConversationSummaryMemoryConverter,
  EntityMemoryConverter as RegistryEntityMemoryConverter,
} from '../../src/registry/converters/memory.js';

// TypeScript emitter converters
import {
  BufferMemoryConverter as EmitterBufferMemoryConverter,
  ConversationSummaryMemoryConverter as EmitterConversationSummaryMemoryConverter,
  BufferWindowMemoryConverter as EmitterBufferWindowMemoryConverter,
  ConversationSummaryBufferMemoryConverter as EmitterConversationSummaryBufferMemoryConverter,
  VectorStoreRetrieverMemoryConverter as EmitterVectorStoreRetrieverMemoryConverter,
  memoryConverters,
  getMemoryConverter,
  hasMemoryConverter,
  getSupportedMemoryTypes,
} from '../../src/emitters/typescript/converters/memory-converter.js';

import { 
  createMockNode, 
  createMockEdge,
  validateTypeScriptCode,
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers.js';

// Test utilities
function createMemoryNode(type: string, overrides: Partial<any> = {}): IRNode {
  return {
    id: `memory-${Math.random().toString(36).substr(2, 9)}`,
    type,
    position: { x: 100, y: 100 },
    parameters: {
      memoryKey: 'history',
      inputKey: 'input',
      outputKey: 'output',
      returnMessages: false,
      humanPrefix: 'Human',
      aiPrefix: 'AI',
      ...overrides.parameters,
    },
    connections: overrides.connections || [],
    ...overrides,
  } as IRNode;
}

function createGenerationContext(connections: IRConnection[] = []): GenerationContext {
  return {
    connections,
    metadata: {},
    imports: new Set(),
    exports: new Set(),
  } as GenerationContext;
}

describe('Memory Converter Test Suite', () => {
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
    
    // Performance assertions - memory converters should be fast
    expect(duration).toBeLessThan(1000); // Max 1 second
    expect(memory.difference).toBeLessThan(50 * 1024 * 1024); // Max 50MB
  });

  describe('Registry Memory Converters', () => {
    describe('BufferMemoryConverter', () => {
      let converter: RegistryBufferMemoryConverter;

      beforeEach(() => {
        converter = new RegistryBufferMemoryConverter();
      });

      test('should have correct metadata', () => {
        expect(converter.flowiseType).toBe('bufferMemory');
        expect(converter.category).toBe('memory');
        expect(converter.getDependencies()).toEqual(['@langchain/core']);
      });

      test('should convert basic buffer memory node', () => {
        const node = createMemoryNode('bufferMemory');
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        
        expect(fragments).toHaveLength(2); // Import + declaration
        
        const importFragment = fragments.find(f => f.type === 'import');
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(importFragment).toBeDefined();
        expect(importFragment?.content).toContain('BufferMemory');
        expect(importFragment?.content).toContain('@langchain/core/memory');
        
        expect(declarationFragment).toBeDefined();
        expect(declarationFragment?.content).toContain('new BufferMemory');
        expect(declarationFragment?.content).toContain('memoryKey: "history"');
        expect(declarationFragment?.content).toContain('returnMessages: false');
      });

      test('should handle custom configuration', () => {
        const node = createMemoryNode('bufferMemory', {
          parameters: {
            memoryKey: 'chat_history',
            returnMessages: true,
            humanPrefix: 'User',
            aiPrefix: 'Assistant',
            inputKey: 'question',
            outputKey: 'answer',
          },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('memoryKey: "chat_history"');
        expect(declarationFragment?.content).toContain('returnMessages: true');
        expect(declarationFragment?.content).toContain('humanPrefix: "User"');
        expect(declarationFragment?.content).toContain('aiPrefix: "Assistant"');
        expect(declarationFragment?.content).toContain('inputKey: "question"');
        expect(declarationFragment?.content).toContain('outputKey: "answer"');
      });

      test('should generate valid TypeScript code', () => {
        const node = createMemoryNode('bufferMemory');
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const fullCode = fragments.map(f => f.content).join('\n');
        
        const validation = validateTypeScriptCode(fullCode);
        expect(validation.valid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });
    });

    describe('BufferWindowMemoryConverter', () => {
      let converter: RegistryBufferWindowMemoryConverter;

      beforeEach(() => {
        converter = new RegistryBufferWindowMemoryConverter();
      });

      test('should have correct metadata', () => {
        expect(converter.flowiseType).toBe('bufferWindowMemory');
        expect(converter.category).toBe('memory');
        expect(converter.getDependencies()).toEqual(['@langchain/core']);
      });

      test('should convert buffer window memory with k parameter', () => {
        const node = createMemoryNode('bufferWindowMemory', {
          parameters: { k: 10 },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('new BufferWindowMemory');
        expect(declarationFragment?.content).toContain('k: 10');
      });

      test('should use default k value if not provided', () => {
        const node = createMemoryNode('bufferWindowMemory');
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('k: 5'); // Default value
      });

      test('should handle edge cases for k parameter', () => {
        // Test with k = 0
        const nodeZero = createMemoryNode('bufferWindowMemory', {
          parameters: { k: 0 },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(nodeZero, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('k: 0');

        // Test with very large k
        const nodeLarge = createMemoryNode('bufferWindowMemory', {
          parameters: { k: 1000 },
        });
        
        const fragmentsLarge = converter.convert(nodeLarge, context);
        const declarationFragmentLarge = fragmentsLarge.find(f => f.type === 'declaration');
        
        expect(declarationFragmentLarge?.content).toContain('k: 1000');
      });
    });

    describe('SummaryBufferMemoryConverter', () => {
      let converter: RegistrySummaryBufferMemoryConverter;

      beforeEach(() => {
        converter = new RegistrySummaryBufferMemoryConverter();
      });

      test('should have correct metadata', () => {
        expect(converter.flowiseType).toBe('summaryBufferMemory');
        expect(converter.category).toBe('memory');
        expect(converter.getDependencies()).toEqual(['@langchain/core']);
      });

      test('should convert summary buffer memory with LLM comment', () => {
        const node = createMemoryNode('summaryBufferMemory', {
          parameters: { maxTokenLimit: 4000 },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('new ConversationSummaryBufferMemory');
        expect(declarationFragment?.content).toContain('maxTokenLimit: 4000');
        expect(declarationFragment?.content).toContain('// llm: will be provided by connection resolution');
      });

      test('should handle token limit edge cases', () => {
        // Test with very low token limit
        const lowLimitNode = createMemoryNode('summaryBufferMemory', {
          parameters: { maxTokenLimit: 100 },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(lowLimitNode, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('maxTokenLimit: 100');

        // Test with very high token limit
        const highLimitNode = createMemoryNode('summaryBufferMemory', {
          parameters: { maxTokenLimit: 100000 },
        });
        
        const fragmentsHigh = converter.convert(highLimitNode, context);
        const declarationFragmentHigh = fragmentsHigh.find(f => f.type === 'declaration');
        
        expect(declarationFragmentHigh?.content).toContain('maxTokenLimit: 100000');
      });
    });

    describe('VectorStoreRetrieverMemoryConverter', () => {
      let converter: RegistryVectorStoreRetrieverMemoryConverter;

      beforeEach(() => {
        converter = new RegistryVectorStoreRetrieverMemoryConverter();
      });

      test('should have correct metadata', () => {
        expect(converter.flowiseType).toBe('vectorStoreRetrieverMemory');
        expect(converter.category).toBe('memory');
        expect(converter.getDependencies()).toEqual(['@langchain/core']);
      });

      test('should convert vector store retriever memory with retriever comment', () => {
        const node = createMemoryNode('vectorStoreRetrieverMemory', {
          parameters: { returnDocs: true },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('new VectorStoreRetrieverMemory');
        expect(declarationFragment?.content).toContain('returnDocs: true');
        expect(declarationFragment?.content).toContain('// retriever: will be provided by connection resolution');
      });

      test('should handle return docs configuration', () => {
        const node = createMemoryNode('vectorStoreRetrieverMemory', {
          parameters: { returnDocs: false },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('returnDocs: false');
      });
    });

    describe('ConversationSummaryMemoryConverter', () => {
      let converter: RegistryConversationSummaryMemoryConverter;

      beforeEach(() => {
        converter = new RegistryConversationSummaryMemoryConverter();
      });

      test('should have correct metadata', () => {
        expect(converter.flowiseType).toBe('conversationSummaryMemory');
        expect(converter.category).toBe('memory');
        expect(converter.getDependencies()).toEqual(['@langchain/core']);
      });

      test('should convert conversation summary memory with LLM comment', () => {
        const node = createMemoryNode('conversationSummaryMemory');
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('new ConversationSummaryMemory');
        expect(declarationFragment?.content).toContain('// llm: will be provided by connection resolution');
      });
    });

    describe('EntityMemoryConverter', () => {
      let converter: RegistryEntityMemoryConverter;

      beforeEach(() => {
        converter = new RegistryEntityMemoryConverter();
      });

      test('should have correct metadata', () => {
        expect(converter.flowiseType).toBe('entityMemory');
        expect(converter.category).toBe('memory');
        expect(converter.getDependencies()).toEqual(['@langchain/core']);
      });

      test('should convert entity memory with custom configuration', () => {
        const node = createMemoryNode('entityMemory', {
          parameters: {
            memoryKey: 'entities',
            k: 5,
            entityExtractionPrompt: 'Extract entities from: {input}',
            entitySummarizationPrompt: 'Summarize entities: {entities}',
          },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('new EntityMemory');
        expect(declarationFragment?.content).toContain('memoryKey: "entities"');
        expect(declarationFragment?.content).toContain('k: 5');
        expect(declarationFragment?.content).toContain('entityExtractionPrompt');
        expect(declarationFragment?.content).toContain('entitySummarizationPrompt');
        expect(declarationFragment?.content).toContain('// llm: will be provided by connection resolution');
      });

      test('should handle optional prompt parameters', () => {
        const node = createMemoryNode('entityMemory', {
          parameters: { memoryKey: 'entities', k: 3 },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment?.content).toContain('k: 3');
        expect(declarationFragment?.content).not.toContain('entityExtractionPrompt');
        expect(declarationFragment?.content).not.toContain('entitySummarizationPrompt');
      });
    });
  });

  describe('TypeScript Emitter Memory Converters', () => {
    describe('EmitterBufferMemoryConverter', () => {
      let converter: EmitterBufferMemoryConverter;

      beforeEach(() => {
        converter = new EmitterBufferMemoryConverter();
      });

      test('should convert buffer memory node', () => {
        const node = createMemoryNode('bufferMemory');
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        
        expect(fragments).toHaveLength(2);
        
        const importFragment = fragments[0];
        const declarationFragment = fragments[1];
        
        expect(importFragment.content).toContain('BufferMemory');
        expect(importFragment.content).toContain('langchain/memory');
        
        expect(declarationFragment.content).toContain('new BufferMemory');
        expect(declarationFragment.content).toContain('memoryKey: "history"');
      });

      test('should handle custom parameters', () => {
        const node = createMemoryNode('bufferMemory', {
          parameters: {
            memoryKey: 'custom_history',
            returnMessages: true,
            humanPrefix: 'User',
            aiPrefix: 'Bot',
          },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments[1];
        
        expect(declarationFragment.content).toContain('memoryKey: "custom_history"');
        expect(declarationFragment.content).toContain('returnMessages: true');
        expect(declarationFragment.content).toContain('humanPrefix: "User"');
        expect(declarationFragment.content).toContain('aiPrefix: "Bot"');
      });

      test('should validate node type correctly', () => {
        expect(converter.canConvert(createMemoryNode('bufferMemory'))).toBe(true);
        expect(converter.canConvert(createMemoryNode('BufferMemory'))).toBe(true);
        expect(converter.canConvert(createMemoryNode('bufferWindowMemory'))).toBe(false);
      });

      test('should return correct dependencies', () => {
        const dependencies = converter.getDependencies(createMemoryNode('bufferMemory'));
        expect(dependencies).toEqual(['langchain/memory']);
      });
    });

    describe('EmitterConversationSummaryMemoryConverter', () => {
      let converter: EmitterConversationSummaryMemoryConverter;

      beforeEach(() => {
        converter = new EmitterConversationSummaryMemoryConverter();
      });

      test('should require LLM connection', () => {
        const node = createMemoryNode('conversationSummaryMemory');
        const context = createGenerationContext(); // No connections
        
        expect(() => converter.convert(node, context)).toThrow(
          'ConversationSummaryMemory node'
        );
        expect(() => converter.convert(node, context)).toThrow(
          'requires an LLM connection'
        );
      });

      test('should convert with LLM connection', () => {
        const llmConnection: IRConnection = {
          id: 'conn-1',
          source: 'llm-node',
          target: 'memory-node',
          sourceHandle: 'output',
          targetHandle: 'llm',
        };
        
        const node = createMemoryNode('conversationSummaryMemory', { id: 'memory-node' });
        const context = createGenerationContext([llmConnection]);
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments[1];
        
        expect(declarationFragment.content).toContain('new ConversationSummaryMemory');
        expect(declarationFragment.content).toContain('llm: llmNode');
        expect(declarationFragment.content).toContain('maxTokenLimit: 2000');
      });

      test('should handle custom token limit', () => {
        const llmConnection: IRConnection = {
          id: 'conn-1',
          source: 'llm-node',
          target: 'memory-node',
          sourceHandle: 'output',
          targetHandle: 'llm',
        };
        
        const node = createMemoryNode('conversationSummaryMemory', {
          id: 'memory-node',
          parameters: { maxTokenLimit: 5000 },
        });
        const context = createGenerationContext([llmConnection]);
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments[1];
        
        expect(declarationFragment.content).toContain('maxTokenLimit: 5000');
      });
    });

    describe('EmitterBufferWindowMemoryConverter', () => {
      let converter: EmitterBufferWindowMemoryConverter;

      beforeEach(() => {
        converter = new EmitterBufferWindowMemoryConverter();
      });

      test('should convert buffer window memory with k parameter', () => {
        const node = createMemoryNode('bufferWindowMemory', {
          parameters: { k: 8 },
        });
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments[1];
        
        expect(declarationFragment.content).toContain('new BufferWindowMemory');
        expect(declarationFragment.content).toContain('k: 8');
      });

      test('should use default k value', () => {
        const node = createMemoryNode('bufferWindowMemory');
        const context = createGenerationContext();
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments[1];
        
        expect(declarationFragment.content).toContain('k: 5');
      });
    });

    describe('EmitterConversationSummaryBufferMemoryConverter', () => {
      let converter: EmitterConversationSummaryBufferMemoryConverter;

      beforeEach(() => {
        converter = new EmitterConversationSummaryBufferMemoryConverter();
      });

      test('should require LLM connection', () => {
        const node = createMemoryNode('conversationSummaryBufferMemory');
        const context = createGenerationContext();
        
        expect(() => converter.convert(node, context)).toThrow(
          'ConversationSummaryBufferMemory node'
        );
        expect(() => converter.convert(node, context)).toThrow(
          'requires an LLM connection'
        );
      });

      test('should convert with LLM connection', () => {
        const llmConnection: IRConnection = {
          id: 'conn-1',
          source: 'llm-node',
          target: 'memory-node',
          sourceHandle: 'output',
          targetHandle: 'llm',
        };
        
        const node = createMemoryNode('conversationSummaryBufferMemory', { id: 'memory-node' });
        const context = createGenerationContext([llmConnection]);
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments[1];
        
        expect(declarationFragment.content).toContain('new ConversationSummaryBufferMemory');
        expect(declarationFragment.content).toContain('llm: llmNode');
      });
    });

    describe('EmitterVectorStoreRetrieverMemoryConverter', () => {
      let converter: EmitterVectorStoreRetrieverMemoryConverter;

      beforeEach(() => {
        converter = new EmitterVectorStoreRetrieverMemoryConverter();
      });

      test('should require vector store connection', () => {
        const node = createMemoryNode('vectorStoreRetrieverMemory');
        const context = createGenerationContext();
        
        expect(() => converter.convert(node, context)).toThrow(
          'VectorStoreRetrieverMemory node'
        );
        expect(() => converter.convert(node, context)).toThrow(
          'requires a vector store connection'
        );
      });

      test('should convert with vector store connection', () => {
        const vectorStoreConnection: IRConnection = {
          id: 'conn-1',
          source: 'vectorstore-node',
          target: 'memory-node',
          sourceHandle: 'output',
          targetHandle: 'vectorStore',
        };
        
        const node = createMemoryNode('vectorStoreRetrieverMemory', {
          id: 'memory-node',
          parameters: { topK: 6 },
        });
        const context = createGenerationContext([vectorStoreConnection]);
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments[1];
        
        expect(declarationFragment.content).toContain('new VectorStoreRetrieverMemory');
        expect(declarationFragment.content).toContain('vectorStoreRetriever: vectorstoreNode.asRetriever(6)');
      });

      test('should handle default topK value', () => {
        const vectorStoreConnection: IRConnection = {
          id: 'conn-1',
          source: 'vectorstore-node',
          target: 'memory-node',
          sourceHandle: 'output',
          targetHandle: 'vectorStore',
        };
        
        const node = createMemoryNode('vectorStoreRetrieverMemory', { id: 'memory-node' });
        const context = createGenerationContext([vectorStoreConnection]);
        
        const fragments = converter.convert(node, context);
        const declarationFragment = fragments[1];
        
        expect(declarationFragment.content).toContain('asRetriever(4)'); // Default topK
      });
    });
  });

  describe('Memory Converter Registry Functions', () => {
    test('getMemoryConverter should return correct converters', () => {
      expect(getMemoryConverter('bufferMemory')).toBeInstanceOf(EmitterBufferMemoryConverter);
      expect(getMemoryConverter('bufferWindowMemory')).toBeInstanceOf(EmitterBufferWindowMemoryConverter);
      expect(getMemoryConverter('conversationSummaryMemory')).toBeInstanceOf(EmitterConversationSummaryMemoryConverter);
      expect(getMemoryConverter('conversationSummaryBufferMemory')).toBeInstanceOf(EmitterConversationSummaryBufferMemoryConverter);
      expect(getMemoryConverter('vectorStoreRetrieverMemory')).toBeInstanceOf(EmitterVectorStoreRetrieverMemoryConverter);
      
      // Test aliases
      expect(getMemoryConverter('BufferMemory')).toBeInstanceOf(EmitterBufferMemoryConverter);
      expect(getMemoryConverter('BufferWindowMemory')).toBeInstanceOf(EmitterBufferWindowMemoryConverter);
      
      // Test unknown type
      expect(getMemoryConverter('unknownMemoryType')).toBeNull();
    });

    test('hasMemoryConverter should correctly identify supported types', () => {
      expect(hasMemoryConverter('bufferMemory')).toBe(true);
      expect(hasMemoryConverter('bufferWindowMemory')).toBe(true);
      expect(hasMemoryConverter('conversationSummaryMemory')).toBe(true);
      expect(hasMemoryConverter('conversationSummaryBufferMemory')).toBe(true);
      expect(hasMemoryConverter('vectorStoreRetrieverMemory')).toBe(true);
      
      // Test aliases
      expect(hasMemoryConverter('BufferMemory')).toBe(true);
      expect(hasMemoryConverter('BufferWindowMemory')).toBe(true);
      
      // Test unknown type
      expect(hasMemoryConverter('unknownMemoryType')).toBe(false);
    });

    test('getSupportedMemoryTypes should return all supported types', () => {
      const supportedTypes = getSupportedMemoryTypes();
      
      expect(supportedTypes).toContain('bufferMemory');
      expect(supportedTypes).toContain('bufferWindowMemory');
      expect(supportedTypes).toContain('conversationSummaryMemory');
      expect(supportedTypes).toContain('conversationSummaryBufferMemory');
      expect(supportedTypes).toContain('vectorStoreRetrieverMemory');
      
      // Should also contain aliases
      expect(supportedTypes).toContain('BufferMemory');
      expect(supportedTypes).toContain('BufferWindowMemory');
      
      expect(supportedTypes.length).toBeGreaterThan(5);
    });

    test('memoryConverters registry should contain all converters', () => {
      expect(memoryConverters).toHaveProperty('bufferMemory');
      expect(memoryConverters).toHaveProperty('bufferWindowMemory');
      expect(memoryConverters).toHaveProperty('conversationSummaryMemory');
      expect(memoryConverters).toHaveProperty('conversationSummaryBufferMemory');
      expect(memoryConverters).toHaveProperty('vectorStoreRetrieverMemory');
      
      // Test that all converters are constructors
      Object.values(memoryConverters).forEach(ConverterClass => {
        expect(typeof ConverterClass).toBe('function');
        expect(() => new ConverterClass()).not.toThrow();
      });
    });
  });

  describe('Memory Converter Performance Tests', () => {
    test('should handle large conversation history efficiently', () => {
      const timer = new PerformanceTimer();
      timer.start();
      
      // Create node with many parameters
      const node = createMemoryNode('bufferMemory', {
        parameters: {
          memoryKey: 'very_long_conversation_history_key_with_lots_of_data',
          returnMessages: true,
          humanPrefix: 'Human with very long prefix that might cause performance issues',
          aiPrefix: 'AI Assistant with equally long prefix that tests string handling',
          inputKey: 'extremely_verbose_input_key_for_performance_testing',
          outputKey: 'equally_verbose_output_key_for_comprehensive_testing',
        },
      });
      
      const converter = new RegistryBufferMemoryConverter();
      const context = createGenerationContext();
      
      // Convert multiple times to test consistency
      for (let i = 0; i < 100; i++) {
        const fragments = converter.convert(node, context);
        expect(fragments).toHaveLength(2);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(500); // Should complete in under 500ms
    });

    test('should handle memory overflow scenarios gracefully', () => {
      const node = createMemoryNode('bufferWindowMemory', {
        parameters: {
          k: Number.MAX_SAFE_INTEGER, // Test extreme values
          memoryKey: 'a'.repeat(10000), // Very long string
        },
      });
      
      const converter = new RegistryBufferWindowMemoryConverter();
      const context = createGenerationContext();
      
      expect(() => converter.convert(node, context)).not.toThrow();
      
      const fragments = converter.convert(node, context);
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment?.content).toContain(`k: ${Number.MAX_SAFE_INTEGER}`);
    });

    test('should handle concurrent converter operations', async () => {
      const converters = [
        new RegistryBufferMemoryConverter(),
        new RegistryBufferWindowMemoryConverter(),
        new RegistrySummaryBufferMemoryConverter(),
        new RegistryVectorStoreRetrieverMemoryConverter(),
        new RegistryConversationSummaryMemoryConverter(),
        new RegistryEntityMemoryConverter(),
      ];
      
      const nodes = [
        createMemoryNode('bufferMemory'),
        createMemoryNode('bufferWindowMemory'),
        createMemoryNode('summaryBufferMemory'),
        createMemoryNode('vectorStoreRetrieverMemory'),
        createMemoryNode('conversationSummaryMemory'),
        createMemoryNode('entityMemory'),
      ];
      
      const context = createGenerationContext();
      
      // Run all conversions concurrently
      const promises = converters.map((converter, index) => 
        Promise.resolve(converter.convert(nodes[index], context))
      );
      
      const results = await Promise.all(promises);
      
      // All should complete successfully
      results.forEach((fragments, index) => {
        expect(fragments).toHaveLength(2);
        expect(fragments[0].type).toBe('import');
        expect(fragments[1].type).toBe('declaration');
      });
    });
  });

  describe('Memory Converter Error Handling', () => {
    test('should handle missing required connections gracefully', () => {
      const summaryMemoryConverter = new EmitterConversationSummaryMemoryConverter();
      const summaryBufferConverter = new EmitterConversationSummaryBufferMemoryConverter();
      const vectorStoreConverter = new EmitterVectorStoreRetrieverMemoryConverter();
      
      const node = createMemoryNode('conversationSummaryMemory');
      const context = createGenerationContext(); // No connections
      
      // Should throw for memory types that require connections
      expect(() => summaryMemoryConverter.convert(node, context)).toThrow();
      expect(() => summaryBufferConverter.convert(node, context)).toThrow();
      expect(() => vectorStoreConverter.convert(node, context)).toThrow();
    });

    test('should handle invalid node parameters gracefully', () => {
      const converter = new RegistryBufferMemoryConverter();
      
      // Test with null/undefined parameters
      const nodeWithNullParams = createMemoryNode('bufferMemory', {
        parameters: null,
      });
      
      const nodeWithUndefinedParams = createMemoryNode('bufferMemory', {
        parameters: undefined,
      });
      
      const context = createGenerationContext();
      
      // Should not throw and should use defaults
      expect(() => converter.convert(nodeWithNullParams, context)).not.toThrow();
      expect(() => converter.convert(nodeWithUndefinedParams, context)).not.toThrow();
      
      const fragments = converter.convert(nodeWithNullParams, context);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      // Should contain default values
      expect(declarationFragment?.content).toContain('memoryKey: "history"');
      expect(declarationFragment?.content).toContain('returnMessages: false');
    });

    test('should handle malformed node structure', () => {
      const converter = new RegistryBufferMemoryConverter();
      const context = createGenerationContext();
      
      // Test with missing id
      const nodeWithoutId = {
        type: 'bufferMemory',
        parameters: {},
      } as any;
      
      // Should not throw but handle gracefully
      expect(() => converter.convert(nodeWithoutId, context)).not.toThrow();
    });

    test('should validate code generation output', () => {
      const converter = new EmitterBufferMemoryConverter();
      const node = createMemoryNode('bufferMemory');
      const context = createGenerationContext();
      
      const fragments = converter.convert(node, context);
      
      // Validate each fragment
      fragments.forEach(fragment => {
        expect(fragment).toHaveProperty('id');
        expect(fragment).toHaveProperty('type');
        expect(fragment).toHaveProperty('content');
        expect(typeof fragment.content).toBe('string');
        expect(fragment.content.length).toBeGreaterThan(0);
      });
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment?.content).toMatch(/import.*from/);
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment?.content).toMatch(/const.*=.*new/);
    });
  });

  describe('Memory Converter Integration Tests', () => {
    test('should work with complex node graphs', () => {
      // Create a complex setup with LLM -> Memory -> Chain
      const llmNode = createMemoryNode('chatOpenAI', { id: 'llm-1' });
      const memoryNode = createMemoryNode('conversationSummaryMemory', { id: 'memory-1' });
      const chainNode = createMemoryNode('conversationChain', { id: 'chain-1' });
      
      const connections: IRConnection[] = [
        {
          id: 'conn-1',
          source: 'llm-1',
          target: 'memory-1',
          sourceHandle: 'output',
          targetHandle: 'llm',
        },
        {
          id: 'conn-2',
          source: 'memory-1',
          target: 'chain-1',
          sourceHandle: 'output',
          targetHandle: 'memory',
        },
      ];
      
      const context = createGenerationContext(connections);
      const converter = new EmitterConversationSummaryMemoryConverter();
      
      const fragments = converter.convert(memoryNode, context);
      
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments[1];
      expect(declarationFragment.content).toContain('llm: llm1'); // Should reference the connected LLM
      expect(declarationFragment.content).toContain('new ConversationSummaryMemory');
    });

    test('should generate code that works with LangChain patterns', () => {
      const converter = new RegistryBufferMemoryConverter();
      const node = createMemoryNode('bufferMemory');
      const context = createGenerationContext();
      
      const fragments = converter.convert(node, context);
      const fullCode = fragments.map(f => f.content).join('\n');
      
      // Should follow LangChain patterns
      expect(fullCode).toMatch(/import.*BufferMemory.*from.*@langchain\/core\/memory/);
      expect(fullCode).toMatch(/const \w+ = new BufferMemory\(/);
      expect(fullCode).toMatch(/memoryKey:/);
      expect(fullCode).toMatch(/returnMessages:/);
      expect(fullCode).toMatch(/humanPrefix:/);
      expect(fullCode).toMatch(/aiPrefix:/);
    });

    test('should maintain consistency between registry and emitter converters', () => {
      const registryConverter = new RegistryBufferMemoryConverter();
      const emitterConverter = new EmitterBufferMemoryConverter();
      
      const node = createMemoryNode('bufferMemory', {
        parameters: {
          memoryKey: 'test_history',
          returnMessages: true,
        },
      });
      const context = createGenerationContext();
      
      const registryFragments = registryConverter.convert(node, context);
      const emitterFragments = emitterConverter.convert(node, context);
      
      // Both should generate imports and declarations
      expect(registryFragments).toHaveLength(2);
      expect(emitterFragments).toHaveLength(2);
      
      // Both should contain similar content patterns
      const registryDeclaration = registryFragments.find(f => f.type === 'declaration')?.content;
      const emitterDeclaration = emitterFragments[1].content;
      
      expect(registryDeclaration).toContain('BufferMemory');
      expect(emitterDeclaration).toContain('BufferMemory');
      expect(registryDeclaration).toContain('memoryKey: "test_history"');
      expect(emitterDeclaration).toContain('memoryKey: "test_history"');
    });
  });
});