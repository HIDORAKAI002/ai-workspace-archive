/**
 * Phase 1 Vector Store Converters Test Suite
 * 
 * Tests for vector store converters including:
 * - WeaviateConverter
 * - QdrantConverter
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

// Import Vector Store converters
import {
  WeaviateConverter,
  QdrantConverter,
} from '../../src/registry/converters/vectorstore';

import {
  createMockNode,
  validateTypeScriptCode,
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers';

// Test utilities
function createVectorStoreNode(type: string, overrides: Partial<any> = {}): IRNode {
  return {
    id: `vectorstore-${Math.random().toString(36).substr(2, 9)}`,
    type,
    label: `${type}_VectorStore`,
    category: 'vectorstore',
    inputs: [],
    outputs: [],
    data: {
      id: `vectorstore-${Math.random().toString(36).substr(2, 9)}`,
      label: `${type} Vector Store`,
      version: 2,
      name: type,
      type,
      baseClasses: ['VectorStore'],
      category: 'Vector Stores',
      description: `${type} vector database`,
      inputParams: [
        { label: 'Collection Name', name: 'collectionName', type: 'string' },
        { label: 'Index Name', name: 'indexName', type: 'string' },
        { label: 'Host', name: 'host', type: 'string' },
        { label: 'Port', name: 'port', type: 'number' },
        { label: 'API Key', name: 'apiKey', type: 'password' },
        { label: 'Embeddings', name: 'embeddings', type: 'Embeddings' },
      ],
      inputAnchors: [
        {
          id: 'embeddings',
          name: 'embeddings',
          label: 'Embeddings',
          type: 'Embeddings',
        }
      ],
      inputs: {
        collectionName: 'test_collection',
        indexName: 'test_index',
        host: 'localhost',
        port: type === 'weaviate' ? 8080 : 6333,
        ...overrides.inputs,
      },
      outputAnchors: [{
        id: 'output',
        name: 'output',
        label: 'Weaviate | Qdrant',
        type: 'VectorStore',
      }],
    },
    ...overrides,
  } as IRNode;
}

const mockContext: GenerationContext = {
  targetLanguage: 'typescript',
  outputPath: '/test',
  projectName: 'test-vectorstores',
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

describe('Phase 1 Vector Store Converters', () => {
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

  describe('WeaviateConverter', () => {
    const converter = new WeaviateConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(WeaviateConverter);
      expect(converter.flowiseType).toBe('weaviate');
      expect(converter.category).toBe('vectorstore');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/weaviate');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic Weaviate node', () => {
      const mockNode = createVectorStoreNode('weaviate', {
        inputs: {
          collectionName: 'documents',
          host: 'http://localhost:8080',
          apiKey: 'weaviate-api-key',
          indexName: 'Document',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2); // import and declaration
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('@langchain/weaviate');
      expect(importFragment!.content).toContain('WeaviateStore');
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment).toBeDefined();
      expect(declarationFragment!.content).toContain('WeaviateStore.fromExistingIndex');
      expect(declarationFragment!.content).toContain('url: "http://localhost:8080"');
      expect(declarationFragment!.content).toContain('indexName: "Document"');
      expect(declarationFragment!.content).toContain('apiKey: "weaviate-api-key"');
    });

    test('should handle Weaviate client configuration', () => {
      const mockNode = createVectorStoreNode('weaviate', {
        inputs: {
          collectionName: 'vectors',
          host: 'https://weaviate-cluster.weaviate.network',
          apiKey: 'secure-weaviate-key',
          indexName: 'VectorCollection',
          scheme: 'https',
          headers: {
            'X-OpenAI-Api-Key': 'openai-key'
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('url: "https://weaviate-cluster.weaviate.network"');
      expect(declarationFragment!.content).toContain('indexName: "VectorCollection"');
      expect(declarationFragment!.content).toContain('apiKey: "secure-weaviate-key"');
    });

    test('should handle embeddings input', () => {
      const mockNode = createVectorStoreNode('weaviate', {
        inputs: {
          collectionName: 'test_docs',
          host: 'localhost:8080',
          indexName: 'TestDocs',
        }
      });

      // Add embeddings input connection
      mockNode.inputs = [
        {
          id: 'embeddings-input',
          dataType: 'embeddings',
          sourceNodeId: 'embeddings-node-1',
          sourcePortName: 'output',
        }
      ];

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('WeaviateStore.fromExistingIndex');
      expect(declarationFragment!.content).toContain('embeddings');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createVectorStoreNode('weaviate');
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should handle minimal configuration', () => {
      const mockNode = createVectorStoreNode('weaviate', {
        inputs: {
          collectionName: 'minimal',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('WeaviateStore.fromExistingIndex');
    });
  });

  describe('QdrantConverter', () => {
    const converter = new QdrantConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(QdrantConverter);
      expect(converter.flowiseType).toBe('qdrant');
      expect(converter.category).toBe('vectorstore');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/qdrant');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic Qdrant node', () => {
      const mockNode = createVectorStoreNode('qdrant', {
        inputs: {
          collectionName: 'documents',
          host: 'localhost',
          port: 6333,
          apiKey: 'qdrant-api-key',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2); // import and declaration
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('@langchain/qdrant');
      expect(importFragment!.content).toContain('QdrantVectorStore');
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment).toBeDefined();
      expect(declarationFragment!.content).toContain('QdrantVectorStore.fromExistingCollection');
      expect(declarationFragment!.content).toContain('url: "http://localhost:6333"');
      expect(declarationFragment!.content).toContain('collectionName: "documents"');
      expect(declarationFragment!.content).toContain('apiKey: "qdrant-api-key"');
    });

    test('should handle Qdrant cloud configuration', () => {
      const mockNode = createVectorStoreNode('qdrant', {
        inputs: {
          collectionName: 'production_vectors',
          host: 'https://xyz-abc.eu-central.aws.cloud.qdrant.io',
          port: 6333,
          apiKey: 'cloud-qdrant-key',
          prefer_grpc: false,
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('url: "https://xyz-abc.eu-central.aws.cloud.qdrant.io:6333"');
      expect(declarationFragment!.content).toContain('collectionName: "production_vectors"');
      expect(declarationFragment!.content).toContain('apiKey: "cloud-qdrant-key"');
    });

    test('should handle Qdrant client options', () => {
      const mockNode = createVectorStoreNode('qdrant', {
        inputs: {
          collectionName: 'test_collection',
          host: 'localhost',
          port: 6333,
          prefer_grpc: true,
          timeout: 30000,
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('QdrantVectorStore.fromExistingCollection');
      expect(declarationFragment!.content).toContain('collectionName: "test_collection"');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createVectorStoreNode('qdrant');
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should handle embeddings input', () => {
      const mockNode = createVectorStoreNode('qdrant', {
        inputs: {
          collectionName: 'embedded_docs',
          host: 'localhost',
          port: 6333,
        }
      });

      // Add embeddings input connection
      mockNode.inputs = [
        {
          id: 'embeddings-input',
          dataType: 'embeddings',
          sourceNodeId: 'embeddings-node-1',
          sourcePortName: 'output',
        }
      ];

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('QdrantVectorStore.fromExistingCollection');
      expect(declarationFragment!.content).toContain('embeddings');
    });
  });

  describe('Integration Tests', () => {
    test('should handle multiple vector store converters together', () => {
      const weaviateConverter = new WeaviateConverter();
      const qdrantConverter = new QdrantConverter();

      const weaviateNode = createVectorStoreNode('weaviate', {
        inputs: {
          collectionName: 'weaviate_docs',
          host: 'localhost:8080',
          indexName: 'WeaviateDocs',
        }
      });

      const qdrantNode = createVectorStoreNode('qdrant', {
        inputs: {
          collectionName: 'qdrant_docs',
          host: 'localhost',
          port: 6333,
        }
      });

      const weaviateFragments = weaviateConverter.convert(weaviateNode, mockContext);
      const qdrantFragments = qdrantConverter.convert(qdrantNode, mockContext);

      // Both conversions should succeed
      expect(weaviateFragments).toHaveLength(2);
      expect(qdrantFragments).toHaveLength(2);

      // Should have different imports
      const weaviateImport = weaviateFragments.find(f => f.type === 'import');
      const qdrantImport = qdrantFragments.find(f => f.type === 'import');

      expect(weaviateImport!.content).toContain('@langchain/weaviate');
      expect(qdrantImport!.content).toContain('@langchain/qdrant');
    });

    test('should work with different vector store configurations', () => {
      const converters = [
        { converter: new WeaviateConverter(), type: 'weaviate' },
        { converter: new QdrantConverter(), type: 'qdrant' },
      ];

      converters.forEach(({ converter, type }) => {
        const configs = [
          { collectionName: 'simple' },
          { collectionName: 'complex', host: 'remote-host', port: 9999 },
          { collectionName: 'secure', apiKey: 'secret-key' },
        ];

        configs.forEach(config => {
          const mockNode = createVectorStoreNode(type, { inputs: config });
          const fragments = converter.convert(mockNode, mockContext);
          
          expect(fragments).toHaveLength(2);
          const code = fragments.map(f => f.content).join('\n');
          const validation = validateTypeScriptCode(code);
          expect(validation.valid).toBe(true);
        });
      });
    });

    test('should handle edge cases and error conditions', () => {
      const converters = [
        { converter: new WeaviateConverter(), type: 'weaviate' },
        { converter: new QdrantConverter(), type: 'qdrant' },
      ];

      converters.forEach(({ converter, type }) => {
        // Test with null/undefined inputs
        const mockNode = createVectorStoreNode(type, {
          inputs: {
            collectionName: null,
            host: undefined,
            port: '',
          }
        });

        const fragments = converter.convert(mockNode, mockContext);
        expect(fragments).toHaveLength(2);
      });
    });
  });

  describe('Performance Tests', () => {
    test('should handle bulk conversion efficiently', () => {
      const weaviateConverter = new WeaviateConverter();
      const qdrantConverter = new QdrantConverter();
      const timer = new PerformanceTimer();
      
      timer.start();
      
      // Convert 50 nodes of each type
      for (let i = 0; i < 50; i++) {
        const weaviateNode = createVectorStoreNode('weaviate', {
          inputs: {
            collectionName: `collection_${i}`,
            host: `host-${i}.example.com`,
          }
        });
        
        const qdrantNode = createVectorStoreNode('qdrant', {
          inputs: {
            collectionName: `qdrant_collection_${i}`,
            host: 'localhost',
            port: 6333 + i,
          }
        });

        weaviateConverter.convert(weaviateNode, mockContext);
        qdrantConverter.convert(qdrantNode, mockContext);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(3000); // Should complete within 3s
    });

    test('should have consistent memory usage', () => {
      const converter = new WeaviateConverter();
      const tracker = new MemoryTracker();
      
      tracker.start();
      
      // Convert multiple times
      for (let i = 0; i < 50; i++) {
        const mockNode = createVectorStoreNode('weaviate');
        converter.convert(mockNode, mockContext);
      }
      
      const memory = tracker.getUsage();
      expect(memory.difference).toBeLessThan(20 * 1024 * 1024); // Less than 20MB
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed node data gracefully', () => {
      const converter = new WeaviateConverter();
      
      const malformedNode = {
        id: 'malformed',
        type: 'weaviate',
        // Missing required fields
      } as any as IRNode;

      expect(() => {
        converter.convert(malformedNode, mockContext);
      }).not.toThrow();
    });

    test('should handle missing input parameters', () => {
      const converter = new QdrantConverter();
      
      const nodeWithoutInputs = createVectorStoreNode('qdrant');
      delete nodeWithoutInputs.data.inputs;

      const fragments = converter.convert(nodeWithoutInputs, mockContext);
      expect(fragments).toHaveLength(2);
    });
  });

  describe('Code Quality Tests', () => {
    test('should generate properly formatted TypeScript', () => {
      const converter = new WeaviateConverter();
      const mockNode = createVectorStoreNode('weaviate');

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n\n');

      // Check for proper formatting
      expect(code).toMatch(/import.*from.*@langchain\/weaviate/);
      expect(code).toMatch(/WeaviateStore\.fromExistingIndex/);
      
      // Check for proper indentation
      const lines = code.split('\n');
      const configLines = lines.filter(line => line.includes(':') && !line.includes('import'));
      configLines.forEach(line => {
        if (line.trim().length > 0) {
          expect(line).toMatch(/^\s+\w+:/); // Should have indentation
        }
      });
    });

    test('should use consistent variable naming', () => {
      const weaviateConverter = new WeaviateConverter();
      const qdrantConverter = new QdrantConverter();

      const weaviateNode = createVectorStoreNode('weaviate');
      const qdrantNode = createVectorStoreNode('qdrant');

      const weaviateFragments = weaviateConverter.convert(weaviateNode, mockContext);
      const qdrantFragments = qdrantConverter.convert(qdrantNode, mockContext);

      // Should generate reasonable variable names
      const weaviateDeclaration = weaviateFragments.find(f => f.type === 'declaration');
      const qdrantDeclaration = qdrantFragments.find(f => f.type === 'declaration');

      expect(weaviateDeclaration!.content).toMatch(/const \w+Vectorstore = /);
      expect(qdrantDeclaration!.content).toMatch(/const \w+Vectorstore = /);
    });
  });
});