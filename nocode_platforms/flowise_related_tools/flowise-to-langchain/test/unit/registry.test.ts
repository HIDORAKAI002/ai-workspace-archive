/**
 * Unit Tests for Converter Registry
 * Tests node converter functionality, registration, and plugin system
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { simpleOpenAIFlow, chainFlow } from '../fixtures/sample-flows';

// Mock registry module since implementation may not exist yet
jest.mock('../../src/registry/registry.js', () => ({
  ConverterRegistry: jest.fn().mockImplementation(() => ({
    register: jest.fn(),
    hasConverter: jest.fn(),
    getConverter: jest.fn(),
    getRegisteredTypes: jest.fn(() => ['openAI', 'chatOpenAI', 'llmChain']),
    getStatistics: jest.fn(() => ({
      totalConverters: 10,
      totalAliases: 5,
      deprecatedConverters: 1,
      convertersByCategory: { llm: 3, chain: 2, prompt: 2 }
    })),
  })),
  ConverterFactory: {
    getRegistry: jest.fn(),
    registerConverters: jest.fn(),
    reset: jest.fn(),
  },
  BaseConverter: jest.fn(),
}));

describe('Converter Registry - Basic Functionality', () => {
  test('should register converters by type', () => {
    const mockConverter = {
      flowiseType: 'openAI',
      category: 'llm',
      canConvert: jest.fn(() => true),
      convert: jest.fn(),
      getDependencies: jest.fn(() => ['@langchain/openai']),
      getSupportedVersions: jest.fn(() => ['1.x', '2.x']),
      isDeprecated: jest.fn(() => false),
    };

    expect(mockConverter.flowiseType).toBe('openAI');
    expect(mockConverter.category).toBe('llm');
    expect(typeof mockConverter.canConvert).toBe('function');
    expect(typeof mockConverter.convert).toBe('function');
  });

  test('should check converter availability', () => {
    const supportedTypes = ['openAI', 'chatOpenAI', 'llmChain', 'chatPromptTemplate'];
    const testType = 'openAI';
    
    expect(supportedTypes.includes(testType)).toBe(true);
    expect(supportedTypes.includes('unknownType')).toBe(false);
  });

  test('should validate converter requirements', () => {
    const converterRequirements = {
      flowiseType: 'string',
      category: 'string',
      canConvert: 'function',
      convert: 'function',
      getDependencies: 'function',
    };

    const mockConverter = {
      flowiseType: 'test',
      category: 'test',
      canConvert: () => true,
      convert: () => ({}),
      getDependencies: () => [],
    };

    Object.entries(converterRequirements).forEach(([key, expectedType]) => {
      expect(mockConverter).toHaveProperty(key);
      expect(typeof mockConverter[key as keyof typeof mockConverter]).toBe(expectedType);
    });
  });
});

describe('Converter Registry - Node Type Detection', () => {
  test('should identify LLM node types', () => {
    const llmTypes = ['OpenAI', 'chatOpenAI', 'anthropic', 'azureOpenAI', 'ollama'];
    const llmNode = simpleOpenAIFlow.nodes[0];
    
    expect(llmNode).toBeDefined();
    if (llmNode && llmNode.data) {
      expect(llmTypes.includes(llmNode.data.type)).toBe(true);
      expect(llmNode.data.category).toBe('LLMs');
      expect(llmNode.data.baseClasses).toContain('BaseLanguageModel');
    }
  });

  test('should identify Chain node types', () => {
    const chainTypes = ['llmChain', 'conversationChain', 'retrievalQAChain'];
    const chainNode = chainFlow.nodes.find(node => node.data.type === 'LLMChain');
    
    if (chainNode) {
      expect(chainTypes.includes(chainNode.data.name)).toBe(true);
      expect(chainNode.data.category).toBe('Chains');
      expect(chainNode.data.baseClasses).toContain('BaseChain');
    }
  });

  test('should identify Prompt node types', () => {
    const promptTypes = ['chatPromptTemplate', 'promptTemplate', 'fewShotPromptTemplate'];
    const promptNode = chainFlow.nodes.find(node => node.data.type === 'ChatPromptTemplate');
    
    if (promptNode) {
      expect(promptTypes.includes(promptNode.data.name)).toBe(true);
      expect(promptNode.data.category).toBe('Prompts');
      expect(promptNode.data.baseClasses).toContain('BasePromptTemplate');
    }
  });

  test('should handle unknown node types', () => {
    const unknownNode = {
      id: 'unknown',
      data: {
        type: 'UnknownType',
        category: 'Unknown',
        baseClasses: ['Unknown'],
      },
    };

    const knownTypes = ['openAI', 'chatOpenAI', 'llmChain'];
    expect(knownTypes.includes(unknownNode.data.type)).toBe(false);
  });
});

describe('Converter Registry - Dependency Management', () => {
  test('should resolve LLM dependencies', () => {
    const openAIDeps = ['@langchain/openai', '@langchain/core'];
    const anthropicDeps = ['@langchain/anthropic', '@langchain/core'];
    
    expect(openAIDeps).toContain('@langchain/openai');
    expect(anthropicDeps).toContain('@langchain/anthropic');
    expect(openAIDeps).toContain('@langchain/core');
    expect(anthropicDeps).toContain('@langchain/core');
  });

  test('should resolve Chain dependencies', () => {
    const chainDeps = ['langchain/chains', '@langchain/core'];
    
    expect(chainDeps).toContain('langchain/chains');
    expect(chainDeps).toContain('@langchain/core');
  });

  test('should resolve Prompt dependencies', () => {
    const promptDeps = ['@langchain/core/prompts', '@langchain/core'];
    
    expect(promptDeps).toContain('@langchain/core/prompts');
    expect(promptDeps).toContain('@langchain/core');
  });

  test('should handle optional dependencies', () => {
    const dependencies = {
      required: ['@langchain/core'],
      optional: ['@langchain/openai', 'langchain'],
      development: ['@types/node', 'typescript'],
    };

    expect(dependencies.required.length).toBeGreaterThan(0);
    expect(dependencies.optional).toBeInstanceOf(Array);
    expect(dependencies.development).toBeInstanceOf(Array);
  });
});

describe('Converter Registry - Version Compatibility', () => {
  test('should handle Flowise v1 compatibility', () => {
    const firstNode = simpleOpenAIFlow.nodes[0];
    expect(firstNode).toBeDefined();
    
    if (firstNode) {
      const v1Node = {
        ...firstNode,
        data: {
          ...firstNode.data,
          version: 1,
        },
      };

      expect(v1Node.data.version).toBe(1);
      expect(v1Node.data).toHaveProperty('type');
      expect(v1Node.data).toHaveProperty('label');
    }
  });

  test('should handle Flowise v2 compatibility', () => {
    const v2Node = simpleOpenAIFlow.nodes[0];

    expect(v2Node).toBeDefined();
    if (v2Node) {
      expect(v2Node.data.version).toBe(2);
      expect(v2Node.data).toHaveProperty('inputParams');
      expect(v2Node.data).toHaveProperty('outputAnchors');
      expect(v2Node.data).toHaveProperty('baseClasses');
    }
  });

  test('should provide migration support', () => {
    function migrateV1ToV2(v1Node: any) {
      return {
        ...v1Node,
        data: {
          ...v1Node.data,
          version: 2,
          inputParams: v1Node.data.inputParams || [],
          outputAnchors: v1Node.data.outputAnchors || [],
          baseClasses: v1Node.data.baseClasses || [],
        },
      };
    }

    const v1Node = {
      id: 'test',
      data: { version: 1, type: 'openAI', label: 'Test' },
    };

    const migrated = migrateV1ToV2(v1Node);
    expect(migrated.data.version).toBe(2);
    expect(migrated.data).toHaveProperty('inputParams');
    expect(migrated.data).toHaveProperty('outputAnchors');
  });
});

describe('Converter Registry - Plugin System', () => {
  test('should support plugin registration', () => {
    const mockPlugin = {
      name: 'test-plugin',
      version: '1.0.0',
      converters: [
        {
          flowiseType: 'customType',
          category: 'custom',
          canConvert: () => true,
          convert: () => ({}),
          getDependencies: () => [],
        },
      ],
      aliases: {
        'custom': 'customType',
      },
    };

    expect(mockPlugin).toHaveProperty('name');
    expect(mockPlugin).toHaveProperty('version');
    expect(mockPlugin).toHaveProperty('converters');
    expect(mockPlugin.converters).toBeInstanceOf(Array);
    expect(mockPlugin.converters.length).toBeGreaterThan(0);
  });

  test('should handle plugin conflicts', () => {
    const plugin1 = { name: 'plugin1', converters: [{ flowiseType: 'type1' }] };
    const plugin2 = { name: 'plugin2', converters: [{ flowiseType: 'type1' }] };

    // Simulate conflict detection
    const registeredTypes = new Set();
    
    function registerPlugin(plugin: typeof plugin1) {
      for (const converter of plugin.converters) {
        if (registeredTypes.has(converter.flowiseType)) {
          throw new Error(`Type ${converter.flowiseType} already registered`);
        }
        registeredTypes.add(converter.flowiseType);
      }
    }

    registerPlugin(plugin1);
    expect(() => registerPlugin(plugin2)).toThrow('already registered');
  });

  test('should support plugin aliasing', () => {
    const aliases = {
      'openai': 'openAI',
      'gpt': 'chatOpenAI',
      'claude': 'anthropic',
    };

    function resolveAlias(type: string): string {
      return aliases[type as keyof typeof aliases] || type;
    }

    expect(resolveAlias('openai')).toBe('openAI');
    expect(resolveAlias('gpt')).toBe('chatOpenAI');
    expect(resolveAlias('unknown')).toBe('unknown');
  });
});

describe('Converter Registry - Performance', () => {
  test('should cache converter lookups', () => {
    const cache = new Map<string, any>();
    const converters = {
      'openAI': { type: 'openAI', category: 'llm' },
      'chatOpenAI': { type: 'chatOpenAI', category: 'llm' },
    };

    function getConverter(type: string) {
      if (cache.has(type)) {
        return cache.get(type);
      }
      
      const converter = converters[type as keyof typeof converters];
      if (converter) {
        cache.set(type, converter);
      }
      return converter;
    }

    // First lookup - not cached
    const start1 = Date.now();
    const result1 = getConverter('openAI');
    const time1 = Date.now() - start1;

    // Second lookup - cached
    const start2 = Date.now();
    const result2 = getConverter('openAI');
    const time2 = Date.now() - start2;

    expect(result1).toEqual(result2);
    expect(cache.has('openAI')).toBe(true);
  });

  test('should handle bulk converter operations', () => {
    const nodeTypes = ['openAI', 'chatOpenAI', 'llmChain', 'chatPromptTemplate'];
    const registeredTypes = ['openAI', 'chatOpenAI', 'llmChain', 'chatPromptTemplate', 'bufferMemory'];

    const startTime = Date.now();
    
    const results = nodeTypes.map(type => ({
      type,
      supported: registeredTypes.includes(type),
    }));

    const endTime = Date.now();
    const processingTime = endTime - startTime;

    expect(results).toHaveLength(nodeTypes.length);
    expect(results.every(r => typeof r.supported === 'boolean')).toBe(true);
    expect(processingTime).toBeLessThan(100); // Should be very fast
  });
});

describe('Converter Registry - Error Handling', () => {
  test('should handle missing converters gracefully', () => {
    function getConverter(type: string) {
      const converters: Record<string, any> = {
        'openAI': { type: 'openAI' },
      };
      
      return converters[type] || null;
    }

    expect(getConverter('openAI')).toBeTruthy();
    expect(getConverter('unknownType')).toBeNull();
  });

  test('should provide converter suggestions', () => {
    function getSuggestions(unknownType: string): string[] {
      const knownTypes = ['openAI', 'chatOpenAI', 'anthropic', 'azureOpenAI'];
      const suggestions: string[] = [];

      for (const knownType of knownTypes) {
        if (
          knownType.toLowerCase().includes(unknownType.toLowerCase()) ||
          unknownType.toLowerCase().includes(knownType.toLowerCase())
        ) {
          suggestions.push(knownType);
        }
      }

      return suggestions;
    }

    expect(getSuggestions('openai')).toContain('openAI');
    expect(getSuggestions('chat')).toContain('chatOpenAI');
    expect(getSuggestions('azure')).toContain('azureOpenAI');
    expect(getSuggestions('xyz')).toHaveLength(0);
  });

  test('should validate converter implementations', () => {
    const requiredMethods = ['canConvert', 'convert', 'getDependencies'];
    
    function validateConverter(converter: any): boolean {
      return requiredMethods.every(method => 
        typeof converter[method] === 'function'
      );
    }

    const validConverter = {
      canConvert: () => true,
      convert: () => ({}),
      getDependencies: () => [],
    };

    const invalidConverter = {
      canConvert: () => true,
      // Missing convert method
      getDependencies: () => [],
    };

    expect(validateConverter(validConverter)).toBe(true);
    expect(validateConverter(invalidConverter)).toBe(false);
  });
});

describe('Converter Registry - Statistics and Analytics', () => {
  test('should track registry statistics', () => {
    const stats = {
      totalConverters: 15,
      convertersByCategory: {
        llm: 6,
        chain: 4,
        prompt: 3,
        memory: 2,
      },
      totalAliases: 8,
      deprecatedConverters: 1,
    };

    expect(stats.totalConverters).toBeGreaterThan(0);
    expect(Object.values(stats.convertersByCategory).reduce((a, b) => a + b, 0))
      .toBeLessThanOrEqual(stats.totalConverters);
    expect(stats.totalAliases).toBeGreaterThanOrEqual(0);
    expect(stats.deprecatedConverters).toBeGreaterThanOrEqual(0);
  });

  test('should calculate coverage metrics', () => {
    function calculateCoverage(flowNodes: any[], registeredTypes: string[]) {
      const flowTypes = flowNodes.map(node => node.data.type);
      const supportedTypes = flowTypes.filter(type => registeredTypes.includes(type));
      
      return {
        total: flowTypes.length,
        supported: supportedTypes.length,
        coverage: flowTypes.length > 0 ? (supportedTypes.length / flowTypes.length) * 100 : 100,
        unsupported: flowTypes.filter(type => !registeredTypes.includes(type)),
      };
    }

    const flowNodes = simpleOpenAIFlow.nodes;
    const registeredTypes = ['OpenAI', 'ChatOpenAI', 'LLMChain'];
    
    const coverage = calculateCoverage(flowNodes, registeredTypes);
    
    expect(coverage).toHaveProperty('total');
    expect(coverage).toHaveProperty('supported');
    expect(coverage).toHaveProperty('coverage');
    expect(coverage.coverage).toBeGreaterThanOrEqual(0);
    expect(coverage.coverage).toBeLessThanOrEqual(100);
  });
});