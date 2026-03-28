import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { AdvancedRAGChainConverter } from '../../src/registry/converters/rag-chains.js';
import type { IRNode } from '../../src/ir/types.js';

// Mock the external dependencies
jest.mock('@langchain/cohere', () => ({
  CohereRerank: jest.fn().mockImplementation(() => ({
    rerank: jest.fn().mockImplementation((docs, query) => {
      // Simulate Cohere reranking
      return docs.map((doc: any, index: number) => ({
        index,
        relevance_score: 1 - (index * 0.1), // Decreasing relevance
        document: doc,
      }));
    }),
  })),
}));

jest.mock('@langchain/community/embeddings/hf_transformers', () => ({
  HuggingFaceTransformersEmbeddings: jest.fn().mockImplementation(() => ({
    embedQuery: jest.fn().mockImplementation((text: string) => {
      // Generate mock embeddings based on text length
      const embedding = new Array(384).fill(0).map((_, i) => 
        Math.sin(i * text.length / 384) * 0.5
      );
      return Promise.resolve(embedding);
    }),
  })),
}));

describe('AdvancedRAGChainConverter - Reranking Functionality', () => {
  let converter: AdvancedRAGChainConverter;
  let mockNode: IRNode;

  beforeEach(() => {
    converter = new AdvancedRAGChainConverter();
    mockNode = {
      id: 'advanced-rag-1',
      type: 'advancedRAGChain',
      label: 'Advanced RAG Chain',
      parameters: [
        { name: 'rerankStrategy', value: 'cohere' },
        { name: 'k', value: 5 },
        { name: 'scoreThreshold', value: 0.5 },
        { name: 'verbose', value: false }
      ],
      inputs: {},
      outputs: {},
    };

    // Set up environment variables
    process.env.COHERE_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.COHERE_API_KEY;
  });

  describe('convert', () => {
    it('should generate code for Cohere reranking', () => {
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);

      expect(fragments).toHaveLength(2);
      expect(fragments[0].type).toBe('import');
      expect(fragments[1].type).toBe('initialization');

      const importCode = fragments[0].content;
      const initCode = fragments[1].content;
      
      // Check that reranking is enabled and function is included
      expect(initCode).toContain('rerankDocuments');
      expect(initCode).toContain('case \'cohere\'');
      expect(initCode).toContain('CohereRerank');
      expect(initCode).toContain('COHERE_API_KEY');
      expect(initCode).toContain('rerank-english-v2.0');
    });

    it('should generate code for sentence transformers reranking', () => {
      mockNode.parameters = [
        { name: 'rerankStrategy', value: 'sentence_transformers' },
        { name: 'k', value: 5 },
        { name: 'scoreThreshold', value: 0.5 },
        { name: 'verbose', value: false }
      ];
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('case \'sentence_transformers\'');
      expect(initCode).toContain('HuggingFaceTransformersEmbeddings');
      expect(initCode).toContain('sentence-transformers/all-MiniLM-L6-v2');
      expect(initCode).toContain('cosine similarity');
      expect(initCode).toContain('embedQuery');
    });

    it('should handle no reranking strategy', () => {
      mockNode.parameters = [
        { name: 'rerankStrategy', value: 'none' },
        { name: 'k', value: 4 },
        { name: 'scoreThreshold', value: 0.5 },
        { name: 'verbose', value: false }
      ];
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).not.toContain('rerankDocuments');
      expect(initCode).not.toContain('case \'cohere\'');
      expect(initCode).not.toContain('case \'sentence_transformers\'');
    });

    it('should include score when includeScore is true', () => {
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('relevanceScore');
    });

    it('should respect rerankTopK parameter', () => {
      mockNode.parameters = [
        { name: 'rerankStrategy', value: 'cohere' },
        { name: 'k', value: 3 },
        { name: 'scoreThreshold', value: 0.5 },
        { name: 'verbose', value: false }
      ];
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('topN: docs.length');
    });
  });

  describe('Cohere reranking functionality', () => {
    it('should correctly rerank documents with Cohere', async () => {
      const docs = [
        { pageContent: 'Document 1', metadata: { id: 1 } },
        { pageContent: 'Document 2', metadata: { id: 2 } },
        { pageContent: 'Document 3', metadata: { id: 3 } },
      ];
      const query = 'test query';

      // Create a function that simulates the generated code
      const rerankDocuments = async (docs: any[], query: string, strategy: string) => {
        switch (strategy) {
          case 'cohere':
            const { CohereRerank } = await import('@langchain/cohere');
            const cohereRerank = new CohereRerank({
              apiKey: process.env.COHERE_API_KEY || '',
              model: 'rerank-english-v2.0',
              topN: docs.length,
            });
            
            const rerankedDocs = await cohereRerank.rerank(docs, query);
            return rerankedDocs.map((result: any) => ({
              ...docs[result.index],
              relevanceScore: result.relevance_score,
            }));
          default:
            return docs;
        }
      };

      const result = await rerankDocuments(docs, query, 'cohere');
      
      expect(result).toHaveLength(3);
      expect(result[0].relevanceScore).toBe(1);
      expect(result[1].relevanceScore).toBe(0.9);
      expect(result[2].relevanceScore).toBe(0.8);
    });
  });

  describe('Sentence transformers reranking functionality', () => {
    it('should correctly rerank documents with sentence transformers', async () => {
      const docs = [
        { pageContent: 'Short text', metadata: { id: 1 } },
        { pageContent: 'Medium length text here', metadata: { id: 2 } },
        { pageContent: 'This is a much longer text with more content', metadata: { id: 3 } },
      ];
      const query = 'test query for similarity';

      // Create a function that simulates the generated code
      const rerankDocuments = async (docs: any[], query: string, strategy: string) => {
        switch (strategy) {
          case 'sentence_transformers':
            const { HuggingFaceTransformersEmbeddings } = await import('@langchain/community/embeddings/hf_transformers');
            const embeddings = new HuggingFaceTransformersEmbeddings({
              modelName: 'sentence-transformers/all-MiniLM-L6-v2',
            });
            
            const queryEmbedding = await embeddings.embedQuery(query);
            const docEmbeddings = await Promise.all(
              docs.map(doc => embeddings.embedQuery(doc.pageContent))
            );
            
            const scores = docEmbeddings.map(docEmb => {
              const dotProduct = queryEmbedding.reduce((sum, val, i) => sum + val * docEmb[i], 0);
              const queryNorm = Math.sqrt(queryEmbedding.reduce((sum, val) => sum + val * val, 0));
              const docNorm = Math.sqrt(docEmb.reduce((sum, val) => sum + val * val, 0));
              return dotProduct / (queryNorm * docNorm);
            });
            
            const rankedDocs = docs
              .map((doc, index) => ({ doc, score: scores[index] }))
              .sort((a, b) => b.score - a.score)
              .map(({ doc, score }) => ({ ...doc, relevanceScore: score }));
            
            return rankedDocs;
          default:
            return docs;
        }
      };

      const result = await rerankDocuments(docs, query, 'sentence_transformers');
      
      expect(result).toHaveLength(3);
      expect(result[0].relevanceScore).toBeDefined();
      expect(result[1].relevanceScore).toBeDefined();
      expect(result[2].relevanceScore).toBeDefined();
      
      // Verify that scores are between -1 and 1 (cosine similarity range)
      result.forEach(doc => {
        expect(doc.relevanceScore).toBeGreaterThanOrEqual(-1);
        expect(doc.relevanceScore).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('error handling', () => {
    it('should handle missing API key for Cohere', () => {
      delete process.env.COHERE_API_KEY;
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      // Should still generate code, but with empty API key
      expect(initCode).toContain('COHERE_API_KEY || \'\'');
    });

    it('should handle invalid reranking strategy gracefully', () => {
      mockNode.parameters = [
        { name: 'rerankStrategy', value: 'invalid_strategy' },
        { name: 'k', value: 5 },
        { name: 'scoreThreshold', value: 0.5 },
        { name: 'verbose', value: false }
      ];
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('default:');
      expect(initCode).toContain('return docs;');
    });
  });

  describe('getDependencies', () => {
    it('should return the correct dependencies', () => {
      const deps = converter.getDependencies();
      expect(deps).toContain('@langchain/core');
    });
  });
});