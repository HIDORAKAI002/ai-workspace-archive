/**
 * Phase 1 Comprehensive Converter Test Suite
 * 
 * Tests for all Phase 1 converters:
 * - BedrockChatConverter
 * - GoogleGenerativeAIConverter  
 * - WeaviateConverter
 * - QdrantConverter
 * - APIChainConverter
 * - SQLDatabaseChainConverter
 * - StructuredOutputParserConverter
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

// Import all Phase 1 converters
import { BedrockChatConverter } from '../../src/registry/converters/bedrock';
import { GoogleGenerativeAIConverter } from '../../src/registry/converters/llm';
import { WeaviateConverter, QdrantConverter } from '../../src/registry/converters/vectorstore';
import { APIChainConverter, SQLDatabaseChainConverter } from '../../src/registry/converters/chain';
import { StructuredOutputParserConverter } from '../../src/registry/converters/output-parser';

import {
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers.js';

// Universal test utility
function createTestNode(type: string, category: string, inputs: Record<string, any> = {}): IRNode {
  const parameters = Object.entries(inputs).map(([name, value]) => ({
    name,
    value,
    type: typeof value === 'number' ? 'number' : 
          typeof value === 'boolean' ? 'boolean' : 
          typeof value === 'object' ? 'object' : 'string'
  }));

  return {
    id: `test-node-${Math.random().toString(36).substr(2, 9)}`,
    type,
    label: `Test_${type}`,
    category: category as any,
    inputs: [],
    outputs: [],
    parameters,
    position: { x: 100, y: 100 },
    metadata: {
      version: '2.0',
      description: `Test ${type} node`,
    },
  };
}

const mockContext: GenerationContext = {
  targetLanguage: 'typescript',
  outputPath: '/test',
  projectName: 'phase1-comprehensive-test',
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

describe('Phase 1 Comprehensive Converter Tests', () => {
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
    expect(duration).toBeLessThan(2000); // Should complete within 2s
    expect(memory.difference).toBeLessThan(100 * 1024 * 1024); // Should use less than 100MB
  });

  describe('1. BedrockChatConverter', () => {
    const converter = new BedrockChatConverter();

    test('should instantiate and have correct properties', () => {
      expect(converter).toBeInstanceOf(BedrockChatConverter);
      expect(converter.flowiseType).toBe('bedrockChat');
      expect(converter.category).toBe('llm');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic node', () => {
      const node = createTestNode('bedrockChat', 'llm', {
        modelName: 'anthropic.claude-v2',
        temperature: 0.7,
        region: 'us-east-1'
      });

      const fragments = converter.convert(node, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
      
      const hasImport = fragments.some(f => f.content?.includes('BedrockChat'));
      const hasDeclaration = fragments.some(f => f.content?.includes('new BedrockChat'));
      
      expect(hasImport).toBe(true);
      expect(hasDeclaration).toBe(true);
    });
  });

  describe('2. GoogleGenerativeAIConverter', () => {
    const converter = new GoogleGenerativeAIConverter();

    test('should instantiate and have correct properties', () => {
      expect(converter).toBeInstanceOf(GoogleGenerativeAIConverter);
      expect(converter.flowiseType).toBe('googleGenerativeAI');
      expect(converter.category).toBe('llm');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/google-genai');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic node', () => {
      const node = createTestNode('googleGenerativeAI', 'llm', {
        modelName: 'gemini-pro',
        temperature: 0.7,
        apiKey: 'test-key'
      });

      const fragments = converter.convert(node, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
      
      const hasImport = fragments.some(f => f.content?.includes('GoogleGenerativeAI'));
      const hasDeclaration = fragments.some(f => f.content?.includes('new GoogleGenerativeAI'));
      
      expect(hasImport).toBe(true);
      expect(hasDeclaration).toBe(true);
    });
  });

  describe('3. WeaviateConverter', () => {
    const converter = new WeaviateConverter();

    test('should instantiate and have correct properties', () => {
      expect(converter).toBeInstanceOf(WeaviateConverter);
      expect(converter.flowiseType).toBe('weaviate');
      expect(converter.category).toBe('vectorstore');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic node', () => {
      const node = createTestNode('weaviate', 'vectorstore', {
        host: 'localhost:8080',
        indexName: 'Documents',
        collectionName: 'test_collection'
      });

      const fragments = converter.convert(node, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
      
      const hasImport = fragments.some(f => f.content?.includes('WeaviateStore') || f.content?.includes('weaviate'));
      const hasDeclaration = fragments.some(f => f.content?.includes('WeaviateStore') || f.content?.includes('Weaviate'));
      
      expect(hasImport || hasDeclaration).toBe(true);
    });
  });

  describe('4. QdrantConverter', () => {
    const converter = new QdrantConverter();

    test('should instantiate and have correct properties', () => {
      expect(converter).toBeInstanceOf(QdrantConverter);
      expect(converter.flowiseType).toBe('qdrant');
      expect(converter.category).toBe('vectorstore');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic node', () => {
      const node = createTestNode('qdrant', 'vectorstore', {
        url: 'http://localhost:6333',
        collectionName: 'test_collection'
      });

      const fragments = converter.convert(node, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
      
      const hasImport = fragments.some(f => f.content?.includes('QdrantVectorStore') || f.content?.includes('qdrant'));
      const hasDeclaration = fragments.some(f => f.content?.includes('QdrantVectorStore') || f.content?.includes('Qdrant'));
      
      expect(hasImport || hasDeclaration).toBe(true);
    });
  });

  describe('5. APIChainConverter', () => {
    const converter = new APIChainConverter();

    test('should instantiate and have correct properties', () => {
      expect(converter).toBeInstanceOf(APIChainConverter);
      expect(converter.flowiseType).toBe('apiChain');
      expect(converter.category).toBe('chain');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('langchain');
    });

    test('should convert basic node', () => {
      const node = createTestNode('apiChain', 'chain', {
        apiUrl: 'https://api.example.com',
        method: 'GET'
      });

      const fragments = converter.convert(node, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
      
      const hasImport = fragments.some(f => f.content?.includes('APIChain'));
      const hasDeclaration = fragments.some(f => f.content?.includes('APIChain'));
      
      expect(hasImport || hasDeclaration).toBe(true);
    });
  });

  describe('6. SQLDatabaseChainConverter', () => {
    const converter = new SQLDatabaseChainConverter();

    test('should instantiate and have correct properties', () => {
      expect(converter).toBeInstanceOf(SQLDatabaseChainConverter);
      expect(converter.flowiseType).toBe('sqlDatabaseChain');
      expect(converter.category).toBe('chain');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('langchain');
      expect(dependencies).toContain('typeorm');
    });

    test('should convert basic node', () => {
      const node = createTestNode('sqlDatabaseChain', 'chain', {
        database: 'postgresql://localhost/test',
        topK: 5
      });

      const fragments = converter.convert(node, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
      
      const hasImport = fragments.some(f => f.content?.includes('SqlDatabaseChain'));
      const hasDeclaration = fragments.some(f => f.content?.includes('SqlDatabaseChain'));
      
      expect(hasImport || hasDeclaration).toBe(true);
    });
  });

  describe('7. StructuredOutputParserConverter', () => {
    const converter = new StructuredOutputParserConverter();

    test('should instantiate and have correct properties', () => {
      expect(converter).toBeInstanceOf(StructuredOutputParserConverter);
      expect(converter.flowiseType).toBe('structuredOutputParser');
      expect(converter.category).toBe('output-parser');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('zod');
    });

    test('should convert basic node', () => {
      const node = createTestNode('structuredOutputParser', 'output-parser', {
        schema: {
          fields: [
            { name: 'name', type: 'string', required: true },
            { name: 'age', type: 'number', required: true }
          ]
        }
      });

      const fragments = converter.convert(node, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
      
      const hasImport = fragments.some(f => f.content?.includes('StructuredOutputParser') || f.content?.includes('zod'));
      const hasDeclaration = fragments.some(f => f.content?.includes('StructuredOutputParser') || f.content?.includes('Schema'));
      
      expect(hasImport || hasDeclaration).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    test('should handle all converters together', () => {
      const converters = [
        { name: 'BedrockChat', converter: new BedrockChatConverter(), type: 'bedrockChat', category: 'llm' },
        { name: 'GoogleGenerativeAI', converter: new GoogleGenerativeAIConverter(), type: 'googleGenerativeAI', category: 'llm' },
        { name: 'Weaviate', converter: new WeaviateConverter(), type: 'weaviate', category: 'vectorstore' },
        { name: 'Qdrant', converter: new QdrantConverter(), type: 'qdrant', category: 'vectorstore' },
        { name: 'APIChain', converter: new APIChainConverter(), type: 'apiChain', category: 'chain' },
        { name: 'SQLDatabaseChain', converter: new SQLDatabaseChainConverter(), type: 'sqlDatabaseChain', category: 'chain' },
        { name: 'StructuredOutputParser', converter: new StructuredOutputParserConverter(), type: 'structuredOutputParser', category: 'output-parser' }
      ];

      converters.forEach(({ name, converter, type, category }) => {
        const node = createTestNode(type, category);
        const fragments = converter.convert(node, mockContext);
        
        expect(fragments.length).toBeGreaterThan(0);
        console.log(`${name}: Generated ${fragments.length} fragments`);
      });
    });

    test('should have unique dependencies per converter', () => {
      const converters = [
        new BedrockChatConverter(),
        new GoogleGenerativeAIConverter(),
        new WeaviateConverter(),
        new QdrantConverter(),
        new APIChainConverter(),
        new SQLDatabaseChainConverter(),
        new StructuredOutputParserConverter()
      ];

      const allDependencies = new Set();
      
      converters.forEach(converter => {
        const deps = converter.getDependencies();
        deps.forEach(dep => allDependencies.add(dep));
      });

      // Should have multiple unique dependencies
      expect(allDependencies.size).toBeGreaterThan(5);
    });
  });

  describe('Performance Tests', () => {
    test('should handle bulk conversion efficiently', () => {
      const timer = new PerformanceTimer();
      timer.start();
      
      const converter = new BedrockChatConverter();
      
      // Convert 100 nodes
      for (let i = 0; i < 100; i++) {
        const node = createTestNode('bedrockChat', 'llm', {
          modelName: `model-${i}`,
          temperature: Math.random()
        });
        converter.convert(node, mockContext);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(3000); // Should complete within 3s
    });

    test('should have consistent memory usage', () => {
      const tracker = new MemoryTracker();
      tracker.start();
      
      const converter = new GoogleGenerativeAIConverter();
      
      // Convert multiple times
      for (let i = 0; i < 50; i++) {
        const node = createTestNode('googleGenerativeAI', 'llm');
        converter.convert(node, mockContext);
      }
      
      const memory = tracker.getUsage();
      expect(memory.difference).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed nodes gracefully', () => {
      const converters = [
        new BedrockChatConverter(),
        new GoogleGenerativeAIConverter(),
        new WeaviateConverter(),
        new QdrantConverter(),
        new APIChainConverter(),
        new SQLDatabaseChainConverter(),
        new StructuredOutputParserConverter()
      ];

      converters.forEach(converter => {
        const malformedNode = {
          id: 'malformed',
          type: converter.flowiseType,
          // Missing required fields
        } as any as IRNode;

        // Should not throw errors
        expect(() => {
          converter.convert(malformedNode, mockContext);
        }).not.toThrow();
      });
    });

    test('should handle missing parameters gracefully', () => {
      const converter = new BedrockChatConverter();
      const nodeWithoutParams = createTestNode('bedrockChat', 'llm');
      nodeWithoutParams.parameters = [];

      const fragments = converter.convert(nodeWithoutParams, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
    });
  });
});