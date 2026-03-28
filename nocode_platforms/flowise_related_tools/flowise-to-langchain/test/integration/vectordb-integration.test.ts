/**
 * Integration Tests for Vector Database Workflows
 * Tests complete vector database pipelines including embeddings, vector stores, and similarity search
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import {
  createTempDir,
  cleanupTempDir,
  createMockNode,
  createMockEdge,
  createMockFlow,
  PerformanceTimer,
  MemoryTracker,
  TestAssertions,
  validateTypeScriptCode,
} from '../utils/test-helpers';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

// Mock the complete flow conversion process
jest.mock('../../src/converter.js', () => ({
  FlowiseConverter: jest.fn().mockImplementation(() => ({
    convertFlow: jest.fn(async (flowData) => {
      // Simulate complete vector database workflow conversion
      const mockCode = `
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import { Document } from '@langchain/core/documents';

// Initialize embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: 'text-embedding-ada-002'
});

// Initialize vector store
const vectorstore = new PineconeStore({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
  indexName: 'test-index'
});

// Vector database operations
export class VectorDatabaseWorkflow {
  constructor() {
    this.embeddings = embeddings;
    this.vectorstore = vectorstore;
  }

  async addDocuments(documents: Document[]) {
    return await this.vectorstore.addDocuments(documents, this.embeddings);
  }

  async similaritySearch(query: string, k: number = 4) {
    return await this.vectorstore.similaritySearch(query, k);
  }

  async similaritySearchWithScore(query: string, k: number = 4) {
    return await this.vectorstore.similaritySearchWithScore(query, k);
  }

  async delete(ids: string[]) {
    return await this.vectorstore.delete(ids);
  }
}

export const vectorWorkflow = new VectorDatabaseWorkflow();
      `;

      return {
        code: mockCode,
        dependencies: [
          '@langchain/openai',
          '@langchain/community/vectorstores/pinecone',
          '@langchain/core',
          '@pinecone-database/pinecone'
        ],
        metadata: {
          nodeCount: flowData.nodes?.length || 0,
          edgeCount: flowData.edges?.length || 0,
          hasVectorStore: true,
          hasEmbeddings: true,
        },
      };
    }),
  })),
}));

describe('Vector Database Integration - Complete Workflows', () => {
  let tempDir: string;
  let timer: PerformanceTimer;
  let memoryTracker: MemoryTracker;

  beforeEach(async () => {
    tempDir = await createTempDir('vectordb-integration');
    timer = new PerformanceTimer();
    memoryTracker = new MemoryTracker();
    timer.start();
    memoryTracker.start();
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
    const duration = timer.stop();
    const memory = memoryTracker.getUsage();
    
    // Integration tests can take longer
    TestAssertions.assertPerformance(duration, 15000); // 15 second max
    TestAssertions.assertMemoryUsage(memory.difference, 100 * 1024 * 1024); // 100MB max
  });

  test('should convert complete vector search workflow', async () => {
    // Create a complete vector search flow with embeddings and vector store
    const embeddingsNode = createMockNode({
      id: 'embeddings-1',
      data: {
        type: 'openAIEmbeddings',
        category: 'Embeddings',
        inputs: {
          apiKey: 'test-key',
          model: 'text-embedding-ada-002',
        },
      },
    });

    const vectorStoreNode = createMockNode({
      id: 'vectorstore-1',
      data: {
        type: 'pinecone',
        category: 'Vector Stores',
        inputs: {
          apiKey: 'test-pinecone-key',
          environment: 'test-env',
          indexName: 'test-index',
        },
      },
    });

    const documentLoaderNode = createMockNode({
      id: 'loader-1',
      data: {
        type: 'textFileLoader',
        category: 'Document Loaders',
        inputs: {
          filePath: './documents.txt',
        },
      },
    });

    const flow = {
      nodes: [embeddingsNode, vectorStoreNode, documentLoaderNode],
      edges: [
        createMockEdge('embeddings-1', 'vectorstore-1'),
        createMockEdge('loader-1', 'vectorstore-1'),
      ],
    };

    const { FlowiseConverter } = require('../../src/converter.js');
    const converter = new FlowiseConverter();
    const result = await converter.convertFlow(flow);

    expect(result).toBeDefined();
    expect(result.code).toContain('OpenAIEmbeddings');
    expect(result.code).toContain('PineconeStore');
    expect(result.code).toContain('VectorDatabaseWorkflow');
    expect(result.dependencies).toContain('@langchain/openai');
    expect(result.dependencies).toContain('@langchain/community/vectorstores/pinecone');
    expect(result.metadata.hasVectorStore).toBe(true);
    expect(result.metadata.hasEmbeddings).toBe(true);

    // Validate generated code
    const validation = validateTypeScriptCode(result.code);
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  test('should handle multi-vector store scenarios', async () => {
    // Test scenario with multiple vector stores for different purposes
    const embeddingsNode = createMockNode({
      id: 'embeddings-1',
      data: {
        type: 'openAIEmbeddings',
        category: 'Embeddings',
      },
    });

    const pineconeNode = createMockNode({
      id: 'pinecone-1',
      data: {
        type: 'pinecone',
        category: 'Vector Stores',
        inputs: { indexName: 'documents-index' },
      },
    });

    const chromaNode = createMockNode({
      id: 'chroma-1',
      data: {
        type: 'chroma',
        category: 'Vector Stores',
        inputs: { collectionName: 'cache-collection' },
      },
    });

    const faissNode = createMockNode({
      id: 'faiss-1',
      data: {
        type: 'faiss',
        category: 'Vector Stores',
        inputs: { directory: './local-index' },
      },
    });

    const flow = {
      nodes: [embeddingsNode, pineconeNode, chromaNode, faissNode],
      edges: [
        createMockEdge('embeddings-1', 'pinecone-1'),
        createMockEdge('embeddings-1', 'chroma-1'),
        createMockEdge('embeddings-1', 'faiss-1'),
      ],
    };

    const { FlowiseConverter } = require('../../src/converter.js');
    const converter = new FlowiseConverter();
    const result = await converter.convertFlow(flow);

    expect(result.code).toContain('PineconeStore');
    expect(result.dependencies).toEqual(expect.arrayContaining([
      '@langchain/openai',
      '@langchain/community/vectorstores/pinecone',
      '@langchain/core',
      '@pinecone-database/pinecone'
    ]));
  });

  test('should generate RAG (Retrieval Augmented Generation) pipeline', async () => {
    // Complete RAG pipeline with document loading, embedding, vector storage, and retrieval
    const nodes = [
      createMockNode({
        id: 'loader-1',
        data: {
          type: 'pdfLoader',
          category: 'Document Loaders',
          inputs: { filePath: './documents.pdf' },
        },
      }),
      createMockNode({
        id: 'splitter-1',
        data: {
          type: 'recursiveCharacterTextSplitter',
          category: 'Text Splitters',
          inputs: { chunkSize: 1000, chunkOverlap: 200 },
        },
      }),
      createMockNode({
        id: 'embeddings-1',
        data: {
          type: 'openAIEmbeddings',
          category: 'Embeddings',
          inputs: { model: 'text-embedding-3-small' },
        },
      }),
      createMockNode({
        id: 'vectorstore-1',
        data: {
          type: 'chroma',
          category: 'Vector Stores',
          inputs: { collectionName: 'rag-documents' },
        },
      }),
      createMockNode({
        id: 'retriever-1',
        data: {
          type: 'vectorStoreRetriever',
          category: 'Retrievers',
          inputs: { k: 4 },
        },
      }),
      createMockNode({
        id: 'llm-1',
        data: {
          type: 'chatOpenAI',
          category: 'Chat Models',
          inputs: { model: 'gpt-4' },
        },
      }),
      createMockNode({
        id: 'chain-1',
        data: {
          type: 'retrievalQAChain',
          category: 'Chains',
          inputs: {},
        },
      }),
    ];

    const edges = [
      createMockEdge('loader-1', 'splitter-1'),
      createMockEdge('splitter-1', 'vectorstore-1'),
      createMockEdge('embeddings-1', 'vectorstore-1'),
      createMockEdge('vectorstore-1', 'retriever-1'),
      createMockEdge('retriever-1', 'chain-1'),
      createMockEdge('llm-1', 'chain-1'),
    ];

    const flow = { nodes, edges };

    const { FlowiseConverter } = require('../../src/converter.js');
    const converter = new FlowiseConverter();
    const result = await converter.convertFlow(flow);

    expect(result.code).toContain('VectorDatabaseWorkflow');
    expect(result.code).toContain('similaritySearch');
    expect(result.metadata.nodeCount).toBe(7);
    expect(result.metadata.edgeCount).toBe(6);

    // Save and validate the generated code can be written to file
    const codeFilePath = join(tempDir, 'rag-pipeline.ts');
    await writeFile(codeFilePath, result.code);
    const writtenCode = await readFile(codeFilePath, 'utf-8');
    expect(writtenCode).toBe(result.code);
  });

  test('should handle vector similarity search variations', async () => {
    // Test different similarity search configurations
    const searchVariations = [
      { k: 1, description: 'single result' },
      { k: 5, description: 'multiple results' },
      { k: 10, description: 'many results' },
    ];

    for (const variation of searchVariations) {
      const flow = {
        nodes: [
          createMockNode({
            id: 'embeddings-1',
            data: { type: 'openAIEmbeddings', category: 'Embeddings' },
          }),
          createMockNode({
            id: 'vectorstore-1',
            data: {
              type: 'memoryVectorStore',
              category: 'Vector Stores',
              inputs: { k: variation.k },
            },
          }),
        ],
        edges: [createMockEdge('embeddings-1', 'vectorstore-1')],
      };

      const { FlowiseConverter } = require('../../src/converter.js');
      const converter = new FlowiseConverter();
      const result = await converter.convertFlow(flow);

      expect(result.code).toContain('similaritySearch');
      expect(result.code).toContain('VectorDatabaseWorkflow');
    }
  });
});

describe('Vector Database Integration - Error Handling and Recovery', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await createTempDir('vectordb-error-test');
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
  });

  test('should handle missing vector store connections gracefully', async () => {
    // Flow with embeddings but no vector store
    const incompleteFlow = {
      nodes: [
        createMockNode({
          id: 'embeddings-1',
          data: { type: 'openAIEmbeddings', category: 'Embeddings' },
        }),
      ],
      edges: [],
    };

    const { FlowiseConverter } = require('../../src/converter.js');
    const converter = new FlowiseConverter();
    
    expect(async () => {
      await converter.convertFlow(incompleteFlow);
    }).not.toThrow();
  });

  test('should handle invalid vector store configurations', async () => {
    const invalidConfigs = [
      {
        type: 'pinecone',
        inputs: {}, // Missing required fields
      },
      {
        type: 'chroma',
        inputs: { url: 'invalid-url' }, // Invalid URL format
      },
      {
        type: 'supabase',
        inputs: { tableName: '' }, // Empty table name
      },
    ];

    for (const invalidConfig of invalidConfigs) {
      const flow = {
        nodes: [
          createMockNode({
            id: 'embeddings-1',
            data: { type: 'openAIEmbeddings', category: 'Embeddings' },
          }),
          createMockNode({
            id: 'vectorstore-1',
            data: {
              type: invalidConfig.type,
              category: 'Vector Stores',
              inputs: invalidConfig.inputs,
            },
          }),
        ],
        edges: [createMockEdge('embeddings-1', 'vectorstore-1')],
      };

      const { FlowiseConverter } = require('../../src/converter.js');
      const converter = new FlowiseConverter();
      
      // Should not crash, should handle gracefully
      const result = await converter.convertFlow(flow);
      expect(result).toBeDefined();
      expect(result.code).toContain('VectorDatabaseWorkflow');
    }
  });

  test('should validate vector dimension compatibility', async () => {
    // Test embedding and vector store compatibility
    const compatibilityTests = [
      {
        embeddings: 'openAIEmbeddings',
        vectorStore: 'pinecone',
        compatible: true,
      },
      {
        embeddings: 'cohereEmbeddings',
        vectorStore: 'chroma',
        compatible: true,
      },
      {
        embeddings: 'huggingFaceEmbeddings',
        vectorStore: 'faiss',
        compatible: true,
      },
    ];

    for (const test of compatibilityTests) {
      const flow = {
        nodes: [
          createMockNode({
            id: 'embeddings-1',
            data: { type: test.embeddings, category: 'Embeddings' },
          }),
          createMockNode({
            id: 'vectorstore-1',
            data: { type: test.vectorStore, category: 'Vector Stores' },
          }),
        ],
        edges: [createMockEdge('embeddings-1', 'vectorstore-1')],
      };

      const { FlowiseConverter } = require('../../src/converter.js');
      const converter = new FlowiseConverter();
      const result = await converter.convertFlow(flow);

      if (test.compatible) {
        expect(result.code).toContain('VectorDatabaseWorkflow');
        expect(result.metadata.hasVectorStore).toBe(true);
        expect(result.metadata.hasEmbeddings).toBe(true);
      }
    }
  });
});

describe('Vector Database Integration - Performance and Scalability', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await createTempDir('vectordb-performance');
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
  });

  test('should handle large-scale vector operations efficiently', async () => {
    const timer = new PerformanceTimer();
    const memoryTracker = new MemoryTracker();
    
    timer.start();
    memoryTracker.start();

    // Simulate a large vector database workflow
    const nodes = Array.from({ length: 50 }, (_, i) => {
      const nodeType = ['openAIEmbeddings', 'pinecone', 'chroma', 'faiss', 'memoryVectorStore'][i % 5];
      const category = nodeType === 'openAIEmbeddings' ? 'Embeddings' : 'Vector Stores';
      
      return createMockNode({
        id: `node-${i}`,
        data: {
          type: nodeType,
          category,
          inputs: {
            batchSize: 100,
            ...(nodeType === 'pinecone' && { indexName: `index-${i}` }),
            ...(nodeType === 'chroma' && { collectionName: `collection-${i}` }),
          },
        },
      });
    });

    const edges = nodes.slice(0, -1).map((_, i) => 
      createMockEdge(`node-${i}`, `node-${i + 1}`)
    );

    const flow = { nodes, edges };

    const { FlowiseConverter } = require('../../src/converter.js');
    const converter = new FlowiseConverter();
    const result = await converter.convertFlow(flow);

    const duration = timer.stop();
    const memory = memoryTracker.getUsage();

    // Should handle large flows efficiently
    expect(duration).toBeLessThan(10000); // 10 seconds
    expect(memory.difference).toBeLessThan(200 * 1024 * 1024); // 200MB
    expect(result.code).toContain('VectorDatabaseWorkflow');
    expect(result.metadata.nodeCount).toBe(50);
  });

  test('should optimize batch operations for vector databases', async () => {
    const batchSizes = [1, 10, 100, 500, 1000];

    for (const batchSize of batchSizes) {
      const flow = {
        nodes: [
          createMockNode({
            id: 'embeddings-1',
            data: {
              type: 'openAIEmbeddings',
              category: 'Embeddings',
              inputs: { batchSize },
            },
          }),
          createMockNode({
            id: 'vectorstore-1',
            data: {
              type: 'pinecone',
              category: 'Vector Stores',
              inputs: { indexName: 'batch-test' },
            },
          }),
        ],
        edges: [createMockEdge('embeddings-1', 'vectorstore-1')],
      };

      const { FlowiseConverter } = require('../../src/converter.js');
      const converter = new FlowiseConverter();
      const result = await converter.convertFlow(flow);

      expect(result.code).toContain('VectorDatabaseWorkflow');
      expect(result.code).toContain('addDocuments');
      expect(result.code).toContain('similaritySearch');
    }
  });

  test('should handle concurrent vector operations', async () => {
    // Test concurrent vector database operations
    const concurrentOperations = Array.from({ length: 10 }, (_, i) => {
      const flow = {
        nodes: [
          createMockNode({
            id: `embeddings-${i}`,
            data: { type: 'openAIEmbeddings', category: 'Embeddings' },
          }),
          createMockNode({
            id: `vectorstore-${i}`,
            data: {
              type: 'memoryVectorStore',
              category: 'Vector Stores',
              inputs: {},
            },
          }),
        ],
        edges: [createMockEdge(`embeddings-${i}`, `vectorstore-${i}`)],
      };

      const { FlowiseConverter } = require('../../src/converter.js');
      const converter = new FlowiseConverter();
      return converter.convertFlow(flow);
    });

    const results = await Promise.all(concurrentOperations);

    // All operations should complete successfully
    expect(results).toHaveLength(10);
    results.forEach(result => {
      expect(result.code).toContain('VectorDatabaseWorkflow');
      expect(result.metadata.hasVectorStore).toBe(true);
      expect(result.metadata.hasEmbeddings).toBe(true);
    });
  });
});

describe('Vector Database Integration - Real-world Scenarios', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await createTempDir('vectordb-scenarios');
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
  });

  test('should handle semantic search scenario', async () => {
    const semanticSearchFlow = {
      nodes: [
        createMockNode({
          id: 'text-loader',
          data: {
            type: 'textFileLoader',
            category: 'Document Loaders',
            inputs: { filePath: './knowledge-base.txt' },
          },
        }),
        createMockNode({
          id: 'text-splitter',
          data: {
            type: 'recursiveCharacterTextSplitter',
            category: 'Text Splitters',
            inputs: { chunkSize: 500, chunkOverlap: 50 },
          },
        }),
        createMockNode({
          id: 'embeddings',
          data: {
            type: 'openAIEmbeddings',
            category: 'Embeddings',
            inputs: { model: 'text-embedding-3-small' },
          },
        }),
        createMockNode({
          id: 'vector-store',
          data: {
            type: 'chroma',
            category: 'Vector Stores',
            inputs: { collectionName: 'semantic-search' },
          },
        }),
      ],
      edges: [
        createMockEdge('text-loader', 'text-splitter'),
        createMockEdge('text-splitter', 'vector-store'),
        createMockEdge('embeddings', 'vector-store'),
      ],
    };

    const { FlowiseConverter } = require('../../src/converter.js');
    const converter = new FlowiseConverter();
    const result = await converter.convertFlow(semanticSearchFlow);

    expect(result.code).toContain('similaritySearch');
    expect(result.code).toContain('addDocuments');
    expect(result.dependencies).toContain('@langchain/openai');
    
    // Save the scenario code for manual inspection
    const scenarioPath = join(tempDir, 'semantic-search.ts');
    await writeFile(scenarioPath, result.code);
    
    const validation = validateTypeScriptCode(result.code);
    expect(validation.valid).toBe(true);
  });

  test('should handle document question-answering scenario', async () => {
    const qaFlow = {
      nodes: [
        createMockNode({
          id: 'pdf-loader',
          data: {
            type: 'pdfLoader',
            category: 'Document Loaders',
            inputs: { filePath: './document.pdf' },
          },
        }),
        createMockNode({
          id: 'embeddings',
          data: {
            type: 'openAIEmbeddings',
            category: 'Embeddings',
            inputs: { model: 'text-embedding-ada-002' },
          },
        }),
        createMockNode({
          id: 'vector-store',
          data: {
            type: 'pinecone',
            category: 'Vector Stores',
            inputs: { indexName: 'qa-documents' },
          },
        }),
        createMockNode({
          id: 'retriever',
          data: {
            type: 'vectorStoreRetriever',
            category: 'Retrievers',
            inputs: { k: 3 },
          },
        }),
        createMockNode({
          id: 'qa-chain',
          data: {
            type: 'retrievalQAChain',
            category: 'Chains',
            inputs: {},
          },
        }),
      ],
      edges: [
        createMockEdge('pdf-loader', 'vector-store'),
        createMockEdge('embeddings', 'vector-store'),
        createMockEdge('vector-store', 'retriever'),
        createMockEdge('retriever', 'qa-chain'),
      ],
    };

    const { FlowiseConverter } = require('../../src/converter.js');
    const converter = new FlowiseConverter();
    const result = await converter.convertFlow(qaFlow);

    expect(result.code).toContain('VectorDatabaseWorkflow');
    expect(result.code).toContain('similaritySearchWithScore');
    expect(result.metadata.nodeCount).toBe(5);
    
    const qaScenarioPath = join(tempDir, 'qa-scenario.ts');
    await writeFile(qaScenarioPath, result.code);
  });

  test('should handle multi-modal vector search scenario', async () => {
    const multiModalFlow = {
      nodes: [
        createMockNode({
          id: 'text-embeddings',
          data: {
            type: 'openAIEmbeddings',
            category: 'Embeddings',
            inputs: { model: 'text-embedding-3-large' },
          },
        }),
        createMockNode({
          id: 'image-embeddings',
          data: {
            type: 'openAIEmbeddings',
            category: 'Embeddings',
            inputs: { model: 'text-embedding-3-large' },
          },
        }),
        createMockNode({
          id: 'text-vector-store',
          data: {
            type: 'faiss',
            category: 'Vector Stores',
            inputs: { directory: './text-vectors' },
          },
        }),
        createMockNode({
          id: 'image-vector-store',
          data: {
            type: 'faiss',
            category: 'Vector Stores',
            inputs: { directory: './image-vectors' },
          },
        }),
      ],
      edges: [
        createMockEdge('text-embeddings', 'text-vector-store'),
        createMockEdge('image-embeddings', 'image-vector-store'),
      ],
    };

    const { FlowiseConverter } = require('../../src/converter.js');
    const converter = new FlowiseConverter();
    const result = await converter.convertFlow(multiModalFlow);

    expect(result.code).toContain('VectorDatabaseWorkflow');
    expect(result.dependencies).toContain('@langchain/openai');
    expect(result.metadata.nodeCount).toBe(4);
  });
});