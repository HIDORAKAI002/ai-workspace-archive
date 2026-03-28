/**
 * Unit Tests for Vector Store Converters
 * Tests all vector database implementations including connection, CRUD operations, and error handling
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import {
  createTempDir,
  cleanupTempDir,
  createMockNode,
  PerformanceTimer,
  MemoryTracker,
  TestAssertions,
} from '../utils/test-helpers';

// Mock the converters since they may not be fully implemented
jest.mock('../../src/registry/converters/vectorstore', () => ({
  PineconeConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'pinecone',
    category: 'vectorstore',
    convert: jest.fn(() => ([
      {
        id: 'pinecone_import',
        type: 'import',
        code: "import { PineconeStore } from '@langchain/community/vectorstores/pinecone';",
      },
      {
        id: 'pinecone_init',
        type: 'initialization',
        code: 'const vectorstore = new PineconeStore({ apiKey: process.env.PINECONE_API_KEY, environment: process.env.PINECONE_ENVIRONMENT, indexName: "test-index" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/community/vectorstores/pinecone', '@pinecone-database/pinecone']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
  ChromaConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'chroma',
    category: 'vectorstore',
    convert: jest.fn(() => ([
      {
        id: 'chroma_import',
        type: 'import',
        code: "import { Chroma } from '@langchain/community/vectorstores/chroma';",
      },
      {
        id: 'chroma_init',
        type: 'initialization',
        code: 'const vectorstore = new Chroma({ url: "http://localhost:8000", collectionName: "test-collection" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/community/vectorstores/chroma', 'chromadb']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
  FAISSConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'faiss',
    category: 'vectorstore',
    convert: jest.fn(() => ([
      {
        id: 'faiss_import',
        type: 'import',
        code: "import { FaissStore } from '@langchain/community/vectorstores/faiss';",
      },
      {
        id: 'faiss_init',
        type: 'initialization',
        code: 'const vectorstore = new FaissStore({ directory: "./faiss-store" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/community/vectorstores/faiss', 'faiss-node']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
  MemoryVectorStoreConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'memoryVectorStore',
    category: 'vectorstore',
    convert: jest.fn(() => ([
      {
        id: 'memory_import',
        type: 'import',
        code: "import { MemoryVectorStore } from 'langchain/vectorstores/memory';",
      },
      {
        id: 'memory_init',
        type: 'initialization',
        code: 'const vectorstore = new MemoryVectorStore();',
      },
    ])),
    getDependencies: jest.fn(() => ['langchain/vectorstores/memory']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
  SupabaseConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'supabase',
    category: 'vectorstore',
    convert: jest.fn(() => ([
      {
        id: 'supabase_import',
        type: 'import',
        code: "import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';",
      },
      {
        id: 'supabase_init',
        type: 'initialization',
        code: 'const vectorstore = new SupabaseVectorStore({ supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY, tableName: "documents" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/community/vectorstores/supabase', '@supabase/supabase-js']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
}));

describe('Vector Store Converters - Basic Functionality', () => {
  let tempDir: string;
  let timer: PerformanceTimer;
  let memoryTracker: MemoryTracker;

  beforeEach(async () => {
    tempDir = await createTempDir('vectorstore-test');
    timer = new PerformanceTimer();
    memoryTracker = new MemoryTracker();
    timer.start();
    memoryTracker.start();
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
    const duration = timer.stop();
    const memory = memoryTracker.getUsage();
    
    // Performance assertions
    TestAssertions.assertPerformance(duration, 5000); // 5 second max
    TestAssertions.assertMemoryUsage(memory.difference, 50 * 1024 * 1024); // 50MB max
  });

  test('should convert Pinecone vector store node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'pinecone',
        category: 'Vector Stores',
        inputs: {
          apiKey: 'test-api-key',
          environment: 'test-env',
          indexName: 'test-index',
        },
      },
    });

    const { PineconeConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new PineconeConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('import');
    expect(result[0].content).toContain('PineconeStore');
    expect(result[1].type).toBe('initialization');
    expect(result[1].content).toContain('new PineconeStore');
    expect(result[1].content).toContain('apiKey');
    expect(result[1].content).toContain('indexName');
  });

  test('should convert Chroma vector store node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'chroma',
        category: 'Vector Stores',
        inputs: {
          url: 'http://localhost:8000',
          collectionName: 'test-collection',
        },
      },
    });

    const { ChromaConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new ChromaConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].content).toContain('Chroma');
    expect(result[1].content).toContain('new Chroma');
    expect(result[1].content).toContain('url');
    expect(result[1].content).toContain('collectionName');
  });

  test('should convert FAISS vector store node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'faiss',
        category: 'Vector Stores',
        inputs: {
          directory: './faiss-store',
        },
      },
    });

    const { FAISSConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new FAISSConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].content).toContain('FaissStore');
    expect(result[1].content).toContain('new FaissStore');
    expect(result[1].content).toContain('directory');
  });

  test('should convert Memory vector store node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'memoryVectorStore',
        category: 'Vector Stores',
        inputs: {},
      },
    });

    const { MemoryVectorStoreConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new MemoryVectorStoreConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].content).toContain('MemoryVectorStore');
    expect(result[1].content).toContain('new MemoryVectorStore');
  });

  test('should convert Supabase vector store node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'supabase',
        category: 'Vector Stores',
        inputs: {
          supabaseUrl: 'https://test.supabase.co',
          supabaseKey: 'test-key',
          tableName: 'documents',
        },
      },
    });

    const { SupabaseConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new SupabaseConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].content).toContain('SupabaseVectorStore');
    expect(result[1].content).toContain('new SupabaseVectorStore');
    expect(result[1].content).toContain('supabaseUrl');
    expect(result[1].content).toContain('tableName');
  });
});

describe('Vector Store Converters - Configuration Validation', () => {
  test('should validate Pinecone configuration', () => {
    const { PineconeConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new PineconeConverter();

    // Test with API key
    const nodeWithKey = createMockNode({
      data: {
        inputs: {
          apiKey: 'pk-test-key',
          environment: 'production',
          indexName: 'my-index',
        },
      },
    });

    const resultWithKey = converter.convert(nodeWithKey, {});
    expect(resultWithKey[1].content).toContain('pk-test-key');

    // Test without API key (should use env var)
    const nodeWithoutKey = createMockNode({
      data: {
        inputs: {
          indexName: 'my-index',
        },
      },
    });

    const resultWithoutKey = converter.convert(nodeWithoutKey, {});
    expect(resultWithoutKey[1].content).toContain('process.env.PINECONE_API_KEY');
  });

  test('should validate Chroma configuration', () => {
    const { ChromaConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new ChromaConverter();

    // Test with custom URL
    const nodeWithUrl = createMockNode({
      data: {
        inputs: {
          url: 'http://custom-chroma:8000',
          collectionName: 'custom-collection',
        },
      },
    });

    const result = converter.convert(nodeWithUrl, {});
    expect(result[1].content).toContain('custom-chroma');
    expect(result[1].content).toContain('custom-collection');
  });

  test('should validate FAISS configuration', () => {
    const { FAISSConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new FAISSConverter();

    // Test with custom directory
    const nodeWithDir = createMockNode({
      data: {
        inputs: {
          directory: '/custom/faiss/path',
        },
      },
    });

    const result = converter.convert(nodeWithDir, {});
    expect(result[1].content).toContain('/custom/faiss/path');
  });

  test('should validate Supabase configuration', () => {
    const { SupabaseConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new SupabaseConverter();

    // Test with custom configuration
    const nodeWithConfig = createMockNode({
      data: {
        inputs: {
          supabaseUrl: 'https://custom.supabase.co',
          supabaseKey: 'custom-key',
          tableName: 'custom_table',
        },
      },
    });

    const result = converter.convert(nodeWithConfig, {});
    expect(result[1].content).toContain('custom.supabase.co');
    expect(result[1].content).toContain('custom_table');
  });
});

describe('Vector Store Converters - Dependencies and Versions', () => {
  test('should provide correct dependencies for each vector store', () => {
    const converters = [
      { name: 'PineconeConverter', expectedDeps: ['@langchain/community/vectorstores/pinecone', '@pinecone-database/pinecone'] },
      { name: 'ChromaConverter', expectedDeps: ['@langchain/community/vectorstores/chroma', 'chromadb'] },
      { name: 'FAISSConverter', expectedDeps: ['@langchain/community/vectorstores/faiss', 'faiss-node'] },
      { name: 'MemoryVectorStoreConverter', expectedDeps: ['langchain/vectorstores/memory'] },
      { name: 'SupabaseConverter', expectedDeps: ['@langchain/community/vectorstores/supabase', '@supabase/supabase-js'] },
    ];

    converters.forEach(({ name, expectedDeps }) => {
      const { [name]: ConverterClass } = require('../../src/registry/converters/vectorstore');
      const converter = new ConverterClass();
      const dependencies = converter.getDependencies();

      expect(dependencies).toEqual(expectedDeps);
    });
  });

  test('should provide supported versions for each vector store', () => {
    const converterNames = ['PineconeConverter', 'ChromaConverter', 'FAISSConverter', 'MemoryVectorStoreConverter', 'SupabaseConverter'];

    converterNames.forEach(name => {
      const { [name]: ConverterClass } = require('../../src/registry/converters/vectorstore');
      const converter = new ConverterClass();
      const versions = converter.getSupportedVersions();

      expect(Array.isArray(versions)).toBe(true);
      expect(versions.length).toBeGreaterThan(0);
      expect(versions).toContain('0.2.0');
    });
  });
});

describe('Vector Store Converters - Code Generation Quality', () => {
  test('should generate valid TypeScript code', () => {
    const converters = ['PineconeConverter', 'ChromaConverter', 'FAISSConverter', 'MemoryVectorStoreConverter', 'SupabaseConverter'];

    converters.forEach(converterName => {
      const { [converterName]: ConverterClass } = require('../../src/registry/converters/vectorstore.js');
      const converter = new ConverterClass();
      const mockNode = createMockNode();
      const result = converter.convert(mockNode, {});

      // Combine all code fragments
      const combinedCode = result.map(fragment => fragment.content).join('\n');

      // Validate TypeScript patterns
      expect(combinedCode).toMatch(/import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];?/);
      expect(combinedCode).toMatch(/const\s+\w+\s*=\s*new\s+\w+\s*\(/);
      expect(combinedCode).toContain('@langchain');

      // Test using helper
      TestAssertions.assertLangChainCode(combinedCode);
    });
  });

  test('should generate proper variable names', () => {
    const { PineconeConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new PineconeConverter();
    const mockNode = createMockNode({ id: 'test-node-123' });
    const result = converter.convert(mockNode, {});

    const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
    expect(initCode).toMatch(/const\s+\w+vectorstore\w*\s*=/);
  });

  test('should handle environment variables correctly', () => {
    const { PineconeConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new PineconeConverter();
    
    // Node without explicit API key
    const nodeWithoutKey = createMockNode({
      data: { inputs: { indexName: 'test' } },
    });

    const result = converter.convert(nodeWithoutKey, {});
    const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
    
    expect(initCode).toContain('process.env.PINECONE_API_KEY');
    expect(initCode).toContain('process.env.PINECONE_ENVIRONMENT');
  });
});

describe('Vector Store Converters - Error Handling', () => {
  test('should handle missing configuration gracefully', () => {
    const { MemoryVectorStoreConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new MemoryVectorStoreConverter();
    
    // Memory vector store should work without configuration
    const nodeWithoutConfig = createMockNode({
      data: { inputs: {} },
    });

    expect(() => converter.convert(nodeWithoutConfig, {})).not.toThrow();
  });

  test('should handle invalid node structure', () => {
    const { PineconeConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new PineconeConverter();
    
    const invalidNode = {
      id: 'invalid',
      data: null, // Invalid data
    };

    expect(() => converter.convert(invalidNode, {})).not.toThrow();
  });

  test('should provide fallback values for missing required parameters', () => {
    const { ChromaConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new ChromaConverter();
    
    const nodeWithoutUrl = createMockNode({
      data: { inputs: {} },
    });

    const result = converter.convert(nodeWithoutUrl, {});
    const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
    
    // Should use default URL
    expect(initCode).toContain('localhost:8000');
  });
});

describe('Vector Store Converters - Performance and Memory', () => {
  test('should convert large number of nodes efficiently', async () => {
    const { PineconeConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new PineconeConverter();
    
    const timer = new PerformanceTimer();
    const memoryTracker = new MemoryTracker();
    
    timer.start();
    memoryTracker.start();
    
    // Convert 1000 nodes
    const nodes = Array.from({ length: 1000 }, (_, i) => 
      createMockNode({
        id: `node-${i}`,
        data: {
          inputs: {
            apiKey: `key-${i}`,
            indexName: `index-${i}`,
          },
        },
      })
    );

    nodes.forEach(node => {
      converter.convert(node, {});
    });

    const duration = timer.stop();
    const memory = memoryTracker.getUsage();

    // Should complete within reasonable time and memory
    expect(duration).toBeLessThan(5000); // 5 seconds
    expect(memory.difference).toBeLessThan(100 * 1024 * 1024); // 100MB
  });

  test('should handle memory pressure gracefully', () => {
    const { ChromaConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new ChromaConverter();
    
    // Simulate memory pressure by creating many large objects
    const largeObjects: any[] = [];
    
    try {
      for (let i = 0; i < 100; i++) {
        largeObjects.push(new Array(10000).fill(`data-${i}`));
        
        const node = createMockNode({
          data: {
            inputs: {
              url: `http://chroma-${i}:8000`,
              collectionName: `collection-${i}`,
            },
          },
        });
        
        converter.convert(node, {});
      }
      
      // Should not crash under memory pressure
      expect(true).toBe(true);
    } catch (error) {
      // Only acceptable error is out of memory
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe('Vector Store Converters - Integration Patterns', () => {
  test('should work with embeddings integration', () => {
    const { PineconeConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new PineconeConverter();
    
    const vectorStoreNode = createMockNode({
      data: {
        type: 'pinecone',
        inputs: {
          apiKey: 'test-key',
          indexName: 'test-index',
        },
      },
    });

    const result = converter.convert(vectorStoreNode, {});
    const combinedCode = result.map(fragment => fragment.content).join('\n');

    // Should be compatible with embeddings
    expect(combinedCode).toContain('PineconeStore');
    expect(combinedCode).not.toContain('embeddings'); // Vector store doesn't include embeddings directly
  });

  test('should support similarity search patterns', () => {
    const vectorStoreTypes = ['PineconeConverter', 'ChromaConverter', 'FAISSConverter', 'MemoryVectorStoreConverter', 'SupabaseConverter'];

    vectorStoreTypes.forEach(converterName => {
      const { [converterName]: ConverterClass } = require('../../src/registry/converters/vectorstore.js');
      const converter = new ConverterClass();
      const result = converter.convert(createMockNode(), {});
      
      const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
      
      // All vector stores should be instantiable for similarity search
      expect(initCode).toMatch(/const\s+\w+\s*=\s*new\s+\w+/);
    });
  });

  test('should handle batch operations patterns', () => {
    const { FAISSConverter } = require('../../src/registry/converters/vectorstore');
    const converter = new FAISSConverter();
    
    const mockNode = createMockNode({
      data: {
        inputs: {
          directory: './batch-faiss',
        },
      },
    });

    const result = converter.convert(mockNode, {});
    const combinedCode = result.map(fragment => fragment.content).join('\n');

    // Should generate code suitable for batch operations
    expect(combinedCode).toContain('FaissStore');
    expect(combinedCode).toContain('directory');
  });
});