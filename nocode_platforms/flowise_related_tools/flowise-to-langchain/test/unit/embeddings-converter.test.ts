/**
 * Unit Tests for Embeddings Converters
 * Tests all embedding model implementations including OpenAI, Cohere, HuggingFace, Azure, and Google
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

// Mock the embeddings converters
jest.mock('../../src/registry/converters/embeddings.js', () => ({
  OpenAIEmbeddingsConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'openAIEmbeddings',
    category: 'embeddings',
    convert: jest.fn(() => ([
      {
        id: 'openai_embeddings_import',
        type: 'import',
        code: "import { OpenAIEmbeddings } from '@langchain/openai';",
      },
      {
        id: 'openai_embeddings_init',
        type: 'initialization',
        code: 'const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY, model: "text-embedding-ada-002" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/openai']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
  CohereEmbeddingsConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'cohereEmbeddings',
    category: 'embeddings',
    convert: jest.fn(() => ([
      {
        id: 'cohere_embeddings_import',
        type: 'import',
        code: "import { CohereEmbeddings } from '@langchain/cohere';",
      },
      {
        id: 'cohere_embeddings_init',
        type: 'initialization',
        code: 'const embeddings = new CohereEmbeddings({ apiKey: process.env.COHERE_API_KEY, model: "embed-english-v2.0" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/cohere']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
  HuggingFaceEmbeddingsConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'huggingFaceEmbeddings',
    category: 'embeddings',
    convert: jest.fn(() => ([
      {
        id: 'hf_embeddings_import',
        type: 'import',
        code: "import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';",
      },
      {
        id: 'hf_embeddings_init',
        type: 'initialization',
        code: 'const embeddings = new HuggingFaceInferenceEmbeddings({ apiKey: process.env.HUGGINGFACEHUB_API_TOKEN, model: "sentence-transformers/all-MiniLM-L6-v2" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/community/embeddings/hf']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
  AzureOpenAIEmbeddingsConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'azureOpenAIEmbeddings',
    category: 'embeddings',
    convert: jest.fn(() => ([
      {
        id: 'azure_embeddings_import',
        type: 'import',
        code: "import { AzureOpenAIEmbeddings } from '@langchain/openai';",
      },
      {
        id: 'azure_embeddings_init',
        type: 'initialization',
        code: 'const embeddings = new AzureOpenAIEmbeddings({ azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY, azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME, azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME, azureOpenAIApiVersion: "2023-05-15" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/openai']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
  GoogleVertexAIEmbeddingsConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'googleVertexAIEmbeddings',
    category: 'embeddings',
    convert: jest.fn(() => ([
      {
        id: 'gvertex_embeddings_import',
        type: 'import',
        code: "import { GoogleVertexAIEmbeddings } from '@langchain/google-vertexai';",
      },
      {
        id: 'gvertex_embeddings_init',
        type: 'initialization',
        code: 'const embeddings = new GoogleVertexAIEmbeddings({ projectId: process.env.GOOGLE_CLOUD_PROJECT_ID, location: "us-central1", model: "textembedding-gecko@001" });',
      },
    ])),
    getDependencies: jest.fn(() => ['@langchain/google-vertexai']),
    getSupportedVersions: jest.fn(() => ['0.2.0', '0.2.1', '0.2.2']),
  })),
}));

describe('Embeddings Converters - Basic Functionality', () => {
  let tempDir: string;
  let timer: PerformanceTimer;
  let memoryTracker: MemoryTracker;

  beforeEach(async () => {
    tempDir = await createTempDir('embeddings-test');
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

  test('should convert OpenAI embeddings node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'openAIEmbeddings',
        category: 'Embeddings',
        inputs: {
          apiKey: 'test-api-key',
          model: 'text-embedding-3-small',
          batchSize: 512,
          stripNewLines: true,
        },
      },
    });

    const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new OpenAIEmbeddingsConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('import');
    expect(result[0].content).toContain('OpenAIEmbeddings');
    expect(result[1].type).toBe('initialization');
    expect(result[1].content).toContain('new OpenAIEmbeddings');
    expect(result[1].content).toContain('openAIApiKey');
    expect(result[1].content).toContain('model');
  });

  test('should convert Cohere embeddings node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'cohereEmbeddings',
        category: 'Embeddings',
        inputs: {
          apiKey: 'test-cohere-key',
          model: 'embed-multilingual-v2.0',
          batchSize: 96,
        },
      },
    });

    const { CohereEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new CohereEmbeddingsConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].content).toContain('CohereEmbeddings');
    expect(result[1].content).toContain('new CohereEmbeddings');
    expect(result[1].content).toContain('apiKey');
    expect(result[1].content).toContain('model');
  });

  test('should convert HuggingFace embeddings node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'huggingFaceEmbeddings',
        category: 'Embeddings',
        inputs: {
          apiKey: 'test-hf-token',
          model: 'sentence-transformers/all-mpnet-base-v2',
          endpoint: 'https://api-inference.huggingface.co',
        },
      },
    });

    const { HuggingFaceEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new HuggingFaceEmbeddingsConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].content).toContain('HuggingFaceInferenceEmbeddings');
    expect(result[1].content).toContain('new HuggingFaceInferenceEmbeddings');
    expect(result[1].content).toContain('apiKey');
    expect(result[1].content).toContain('model');
  });

  test('should convert Azure OpenAI embeddings node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'azureOpenAIEmbeddings',
        category: 'Embeddings',
        inputs: {
          apiKey: 'test-azure-key',
          instanceName: 'test-instance',
          deploymentName: 'text-embedding-ada-002',
          apiVersion: '2024-02-15-preview',
        },
      },
    });

    const { AzureOpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new AzureOpenAIEmbeddingsConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].content).toContain('AzureOpenAIEmbeddings');
    expect(result[1].content).toContain('new AzureOpenAIEmbeddings');
    expect(result[1].content).toContain('azureOpenAIApiKey');
    expect(result[1].content).toContain('azureOpenAIApiInstanceName');
    expect(result[1].content).toContain('azureOpenAIApiDeploymentName');
  });

  test('should convert Google Vertex AI embeddings node', () => {
    const mockNode = createMockNode({
      data: {
        type: 'googleVertexAIEmbeddings',
        category: 'Embeddings',
        inputs: {
          projectId: 'test-project-123',
          location: 'us-west1',
          model: 'textembedding-gecko@002',
        },
      },
    });

    const { GoogleVertexAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new GoogleVertexAIEmbeddingsConverter();
    const result = converter.convert(mockNode, {});

    expect(result).toHaveLength(2);
    expect(result[0].content).toContain('GoogleVertexAIEmbeddings');
    expect(result[1].content).toContain('new GoogleVertexAIEmbeddings');
    expect(result[1].content).toContain('projectId');
    expect(result[1].content).toContain('location');
    expect(result[1].content).toContain('model');
  });
});

describe('Embeddings Converters - Model Configuration', () => {
  test('should handle OpenAI model variations', () => {
    const models = [
      'text-embedding-ada-002',
      'text-embedding-3-small',
      'text-embedding-3-large',
    ];

    models.forEach(model => {
      const mockNode = createMockNode({
        data: {
          inputs: { model },
        },
      });

      const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
      const converter = new OpenAIEmbeddingsConverter();
      const result = converter.convert(mockNode, {});

      const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
      expect(initCode).toContain(model);
    });
  });

  test('should handle Cohere model variations', () => {
    const models = [
      'embed-english-v2.0',
      'embed-multilingual-v2.0',
      'embed-english-light-v2.0',
    ];

    models.forEach(model => {
      const mockNode = createMockNode({
        data: {
          inputs: { model },
        },
      });

      const { CohereEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
      const converter = new CohereEmbeddingsConverter();
      const result = converter.convert(mockNode, {});

      const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
      expect(initCode).toContain(model);
    });
  });

  test('should handle HuggingFace model variations', () => {
    const models = [
      'sentence-transformers/all-MiniLM-L6-v2',
      'sentence-transformers/all-mpnet-base-v2',
      'sentence-transformers/multi-qa-MiniLM-L6-cos-v1',
    ];

    models.forEach(model => {
      const mockNode = createMockNode({
        data: {
          inputs: { model },
        },
      });

      const { HuggingFaceEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
      const converter = new HuggingFaceEmbeddingsConverter();
      const result = converter.convert(mockNode, {});

      const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
      expect(initCode).toContain(model);
    });
  });

  test('should handle batch size configurations', () => {
    const batchSizes = [1, 16, 32, 512, 1000];

    batchSizes.forEach(batchSize => {
      const mockNode = createMockNode({
        data: {
          inputs: { batchSize },
        },
      });

      const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
      const converter = new OpenAIEmbeddingsConverter();
      const result = converter.convert(mockNode, {});

      if (batchSize > 1) {
        const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
        expect(initCode).toContain(`batchSize: ${batchSize}`);
      }
    });
  });
});

describe('Embeddings Converters - Environment Variables', () => {
  test('should use environment variables when API keys not provided', () => {
    const envTests = [
      {
        converter: 'OpenAIEmbeddingsConverter',
        envVar: 'process.env.OPENAI_API_KEY',
      },
      {
        converter: 'CohereEmbeddingsConverter',
        envVar: 'process.env.COHERE_API_KEY',
      },
      {
        converter: 'HuggingFaceEmbeddingsConverter',
        envVar: 'process.env.HUGGINGFACEHUB_API_TOKEN',
      },
      {
        converter: 'AzureOpenAIEmbeddingsConverter',
        envVar: 'process.env.AZURE_OPENAI_API_KEY',
      },
      {
        converter: 'GoogleVertexAIEmbeddingsConverter',
        envVar: 'process.env.GOOGLE_CLOUD_PROJECT_ID',
      },
    ];

    envTests.forEach(({ converter, envVar }) => {
      const nodeWithoutKey = createMockNode({
        data: { inputs: {} },
      });

      const { [converter]: ConverterClass } = require('../../src/registry/converters/embeddings.js');
      const converterInstance = new ConverterClass();
      const result = converterInstance.convert(nodeWithoutKey, {});

      const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
      expect(initCode).toContain(envVar);
    });
  });

  test('should use provided API keys over environment variables', () => {
    const mockNode = createMockNode({
      data: {
        inputs: {
          apiKey: 'explicit-api-key',
        },
      },
    });

    const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new OpenAIEmbeddingsConverter();
    const result = converter.convert(mockNode, {});

    const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
    expect(initCode).toContain('explicit-api-key');
    expect(initCode).not.toContain('process.env.OPENAI_API_KEY');
  });
});

describe('Embeddings Converters - Dependencies and Versions', () => {
  test('should provide correct dependencies for each embeddings provider', () => {
    const dependencyTests = [
      { converter: 'OpenAIEmbeddingsConverter', expectedDeps: ['@langchain/openai'] },
      { converter: 'CohereEmbeddingsConverter', expectedDeps: ['@langchain/cohere'] },
      { converter: 'HuggingFaceEmbeddingsConverter', expectedDeps: ['@langchain/community/embeddings/hf'] },
      { converter: 'AzureOpenAIEmbeddingsConverter', expectedDeps: ['@langchain/openai'] },
      { converter: 'GoogleVertexAIEmbeddingsConverter', expectedDeps: ['@langchain/google-vertexai'] },
    ];

    dependencyTests.forEach(({ converter, expectedDeps }) => {
      const { [converter]: ConverterClass } = require('../../src/registry/converters/embeddings.js');
      const converterInstance = new ConverterClass();
      const dependencies = converterInstance.getDependencies();

      expect(dependencies).toEqual(expectedDeps);
    });
  });

  test('should provide supported versions for each embeddings provider', () => {
    const converterNames = ['OpenAIEmbeddingsConverter', 'CohereEmbeddingsConverter', 'HuggingFaceEmbeddingsConverter', 'AzureOpenAIEmbeddingsConverter', 'GoogleVertexAIEmbeddingsConverter'];

    converterNames.forEach(converterName => {
      const { [converterName]: ConverterClass } = require('../../src/registry/converters/embeddings.js');
      const converter = new ConverterClass();
      const versions = converter.getSupportedVersions();

      expect(Array.isArray(versions)).toBe(true);
      expect(versions.length).toBeGreaterThan(0);
      expect(versions).toContain('0.2.0');
    });
  });
});

describe('Embeddings Converters - Code Generation Quality', () => {
  test('should generate valid TypeScript code for all providers', () => {
    const converters = ['OpenAIEmbeddingsConverter', 'CohereEmbeddingsConverter', 'HuggingFaceEmbeddingsConverter', 'AzureOpenAIEmbeddingsConverter', 'GoogleVertexAIEmbeddingsConverter'];

    converters.forEach(converterName => {
      const { [converterName]: ConverterClass } = require('../../src/registry/converters/embeddings.js');
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
    const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new OpenAIEmbeddingsConverter();
    const mockNode = createMockNode({ id: 'test-embeddings-456' });
    const result = converter.convert(mockNode, {});

    const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
    expect(initCode).toMatch(/const\s+\w+embeddings\w*\s*=/);
  });

  test('should handle special characters in configuration', () => {
    const mockNode = createMockNode({
      data: {
        inputs: {
          apiKey: 'key-with-special-chars!@#$%',
          model: 'model/with/slashes',
        },
      },
    });

    const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new OpenAIEmbeddingsConverter();
    
    expect(() => converter.convert(mockNode, {})).not.toThrow();
  });
});

describe('Embeddings Converters - Error Handling and Edge Cases', () => {
  test('should handle empty configuration gracefully', () => {
    const converters = ['OpenAIEmbeddingsConverter', 'CohereEmbeddingsConverter', 'HuggingFaceEmbeddingsConverter', 'AzureOpenAIEmbeddingsConverter', 'GoogleVertexAIEmbeddingsConverter'];

    converters.forEach(converterName => {
      const { [converterName]: ConverterClass } = require('../../src/registry/converters/embeddings.js');
      const converter = new ConverterClass();
      
      const nodeWithoutConfig = createMockNode({
        data: { inputs: {} },
      });

      expect(() => converter.convert(nodeWithoutConfig, {})).not.toThrow();
    });
  });

  test('should handle null and undefined values', () => {
    const mockNode = createMockNode({
      data: {
        inputs: {
          apiKey: null,
          model: undefined,
          batchSize: null,
        },
      },
    });

    const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new OpenAIEmbeddingsConverter();
    
    expect(() => converter.convert(mockNode, {})).not.toThrow();
  });

  test('should provide default values for missing required parameters', () => {
    const defaultTests = [
      {
        converter: 'OpenAIEmbeddingsConverter',
        defaultModel: 'text-embedding-ada-002',
      },
      {
        converter: 'CohereEmbeddingsConverter',
        defaultModel: 'embed-english-v2.0',
      },
      {
        converter: 'HuggingFaceEmbeddingsConverter',
        defaultModel: 'sentence-transformers/all-MiniLM-L6-v2',
      },
      {
        converter: 'GoogleVertexAIEmbeddingsConverter',
        defaultModel: 'textembedding-gecko@001',
      },
    ];

    defaultTests.forEach(({ converter, defaultModel }) => {
      const nodeWithoutModel = createMockNode({
        data: { inputs: {} },
      });

      const { [converter]: ConverterClass } = require('../../src/registry/converters/embeddings.js');
      const converterInstance = new ConverterClass();
      const result = converterInstance.convert(nodeWithoutModel, {});

      const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
      expect(initCode).toContain(defaultModel);
    });
  });

  test('should handle invalid node structure', () => {
    const invalidNodes = [
      { id: 'invalid1', data: null },
      { id: 'invalid2', data: { inputs: null } },
      { id: 'invalid3' }, // Missing data entirely
      null,
      undefined,
    ];

    const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new OpenAIEmbeddingsConverter();

    invalidNodes.forEach(invalidNode => {
      expect(() => converter.convert(invalidNode, {})).not.toThrow();
    });
  });
});

describe('Embeddings Converters - Performance and Scalability', () => {
  test('should handle large batch processing efficiently', () => {
    const { OpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new OpenAIEmbeddingsConverter();
    
    const timer = new PerformanceTimer();
    const memoryTracker = new MemoryTracker();
    
    timer.start();
    memoryTracker.start();
    
    // Process 500 embedding nodes
    const nodes = Array.from({ length: 500 }, (_, i) => 
      createMockNode({
        id: `embeddings-${i}`,
        data: {
          inputs: {
            apiKey: `key-${i}`,
            model: i % 2 === 0 ? 'text-embedding-ada-002' : 'text-embedding-3-small',
            batchSize: 16 + (i % 10),
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
    expect(duration).toBeLessThan(3000); // 3 seconds
    expect(memory.difference).toBeLessThan(50 * 1024 * 1024); // 50MB
  });

  test('should maintain consistency across multiple conversions', () => {
    const { CohereEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new CohereEmbeddingsConverter();
    
    const mockNode = createMockNode({
      data: {
        inputs: {
          apiKey: 'consistent-key',
          model: 'embed-english-v2.0',
        },
      },
    });

    // Convert the same node multiple times
    const results = Array.from({ length: 10 }, () => 
      converter.convert(mockNode, {})
    );

    // All results should be identical
    const firstResult = JSON.stringify(results[0]);
    results.forEach(result => {
      expect(JSON.stringify(result)).toBe(firstResult);
    });
  });

  test('should handle concurrent conversion requests', async () => {
    const { GoogleVertexAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new GoogleVertexAIEmbeddingsConverter();
    
    // Create multiple nodes for concurrent processing
    const nodes = Array.from({ length: 20 }, (_, i) => 
      createMockNode({
        id: `concurrent-${i}`,
        data: {
          inputs: {
            projectId: `project-${i}`,
            location: i % 2 === 0 ? 'us-central1' : 'us-west1',
            model: 'textembedding-gecko@001',
          },
        },
      })
    );

    // Process nodes concurrently
    const promises = nodes.map(node => 
      Promise.resolve(converter.convert(node, {}))
    );

    const results = await Promise.all(promises);

    // All conversions should succeed
    expect(results).toHaveLength(20);
    results.forEach(result => {
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('import');
      expect(result[1].type).toBe('initialization');
    });
  });
});

describe('Embeddings Converters - Integration with Vector Stores', () => {
  test('should generate embeddings compatible with vector stores', () => {
    const embeddingConverters = ['OpenAIEmbeddingsConverter', 'CohereEmbeddingsConverter', 'HuggingFaceEmbeddingsConverter'];

    embeddingConverters.forEach(converterName => {
      const { [converterName]: ConverterClass } = require('../../src/registry/converters/embeddings.js');
      const converter = new ConverterClass();
      const result = converter.convert(createMockNode(), {});
      
      const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
      
      // Should create embeddings instance that can be used with vector stores
      expect(initCode).toMatch(/const\s+\w+\s*=\s*new\s+\w+Embeddings\s*\(/);
    });
  });

  test('should support embeddings chaining patterns', () => {
    const { AzureOpenAIEmbeddingsConverter } = require('../../src/registry/converters/embeddings.js');
    const converter = new AzureOpenAIEmbeddingsConverter();
    
    const result = converter.convert(createMockNode(), {});
    const combinedCode = result.map(fragment => fragment.content).join('\n');

    // Should be suitable for method chaining with vector operations
    expect(combinedCode).toContain('AzureOpenAIEmbeddings');
    expect(combinedCode).toMatch(/const\s+\w+\s*=\s*new/);
  });

  test('should handle embedding dimension consistency', () => {
    // Test that embeddings configurations are consistent for vector store compatibility
    const providers = [
      { converter: 'OpenAIEmbeddingsConverter', models: ['text-embedding-ada-002', 'text-embedding-3-small'] },
      { converter: 'CohereEmbeddingsConverter', models: ['embed-english-v2.0', 'embed-multilingual-v2.0'] },
    ];

    providers.forEach(({ converter, models }) => {
      models.forEach(model => {
        const mockNode = createMockNode({
          data: { inputs: { model } },
        });

        const { [converter]: ConverterClass } = require('../../src/registry/converters/embeddings.js');
        const converterInstance = new ConverterClass();
        const result = converterInstance.convert(mockNode, {});

        const initCode = result.find(fragment => fragment.type === 'initialization')?.code || '';
        expect(initCode).toContain(model);
      });
    });
  });
});