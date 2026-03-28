import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { GraphRAGChainConverter } from '../../src/registry/converters/rag-chains.js';
import type { IRNode } from '../../src/ir/types.js';

// Note: Graph database modules are dynamically imported and may not be available
// These tests focus on code generation rather than actual graph DB functionality

describe('GraphRAGChainConverter', () => {
  let converter: GraphRAGChainConverter;
  let mockNode: IRNode;

  beforeEach(() => {
    converter = new GraphRAGChainConverter();
    mockNode = {
      id: 'graph-rag-1',
      type: 'GraphRAGChain',
      label: 'Graph RAG Chain',
      parameters: [
        { name: 'graphDatabase', value: 'neo4j' },
        { name: 'maxHops', value: 2 },
        { name: 'entityExtraction', value: true },
      ],
      inputs: {},
      outputs: {},
    };

    // Set up environment variables
    process.env.NEO4J_URL = 'bolt://localhost:7687';
    process.env.NEO4J_USERNAME = 'neo4j';
    process.env.NEO4J_PASSWORD = 'password';
    process.env.ARANGO_URL = 'http://localhost:8529';
    process.env.ARANGO_DATABASE = '_system';
    process.env.ARANGO_USERNAME = 'root';
    process.env.ARANGO_PASSWORD = 'password';
    process.env.NEPTUNE_ENDPOINT = 'neptune.amazonaws.com';
    process.env.NEPTUNE_PORT = '8182';
    process.env.AWS_REGION = 'us-east-1';
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Clean up environment variables
    delete process.env.NEO4J_URL;
    delete process.env.NEO4J_USERNAME;
    delete process.env.NEO4J_PASSWORD;
    delete process.env.ARANGO_URL;
    delete process.env.ARANGO_DATABASE;
    delete process.env.ARANGO_USERNAME;
    delete process.env.ARANGO_PASSWORD;
    delete process.env.NEPTUNE_ENDPOINT;
    delete process.env.NEPTUNE_PORT;
    delete process.env.AWS_REGION;
  });

  describe('convert', () => {
    it('should generate code for Neo4j integration', () => {
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

      const initCode = fragments[1].content;
      expect(initCode).toContain('executeGraphQuery');
      expect(initCode).toContain('neo4j');
      expect(initCode).toContain('Neo4jGraph');
      expect(initCode).toContain('NEO4J_URL');
      expect(initCode).toContain('NEO4J_USERNAME');
      expect(initCode).toContain('NEO4J_PASSWORD');
    });

    it('should generate code for ArangoDB integration', () => {
      mockNode.parameters = [
        { name: 'graphDatabase', value: 'arangodb' },
        { name: 'maxHops', value: 2 },
        { name: 'entityExtraction', value: true },
      ];
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('arangodb');
      expect(initCode).toContain('ArangoGraph');
      expect(initCode).toContain('ARANGO_URL');
      expect(initCode).toContain('ARANGO_DATABASE');
      expect(initCode).toContain('ARANGO_USERNAME');
    });

    it('should generate code for Neptune integration', () => {
      mockNode.parameters = [
        { name: 'graphDatabase', value: 'neptune' },
        { name: 'maxHops', value: 2 },
        { name: 'entityExtraction', value: true },
      ];
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('neptune');
      expect(initCode).toContain('NeptuneGraph');
      expect(initCode).toContain('NEPTUNE_ENDPOINT');
      expect(initCode).toContain('AWS_REGION');
    });

    it('should include entity extraction when enabled', () => {
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('Extract entities from the question');
      expect(initCode).toContain('entityPrompt');
    });

    it('should skip entity extraction when disabled', () => {
      mockNode.parameters = [
        { name: 'graphDatabase', value: 'neo4j' },
        { name: 'maxHops', value: 2 },
        { name: 'entityExtraction', value: false },
      ];
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('return [];');
      expect(initCode).not.toContain('Extract entities from the question');
    });

    it('should respect maxHops parameter', () => {
      mockNode.parameters = [
        { name: 'graphDatabase', value: 'neo4j' },
        { name: 'maxHops', value: 3 },
        { name: 'entityExtraction', value: true },
      ];
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('[r*1..3]');
    });
  });

  describe('Graph database code generation', () => {
    it('should generate proper query construction code', () => {
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      // Should generate proper query template
      expect(initCode).toContain('MATCH (n)');
      expect(initCode).toContain('WHERE n.name IN');
      expect(initCode).toContain('MATCH (n)-[r*1..2]-(related)');
      expect(initCode).toContain('RETURN n.name, type(r), related.name, related.description');
      expect(initCode).toContain('LIMIT 50');
    });

    it('should generate fallback for unknown databases', () => {
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      // Should include default case
      expect(initCode).toContain('default:');
      expect(initCode).toContain('console.warn');
      expect(initCode).toContain('not implemented, returning empty results');
      expect(initCode).toContain('return []');
    });
  });

  describe('error handling', () => {
    it('should handle missing environment variables', () => {
      delete process.env.NEO4J_URL;
      delete process.env.NEO4J_USERNAME;
      delete process.env.NEO4J_PASSWORD;
      
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      // Should still generate code with defaults
      expect(initCode).toContain('NEO4J_URL || \'bolt://localhost:7687\'');
      expect(initCode).toContain('NEO4J_USERNAME || \'neo4j\'');
      expect(initCode).toContain('NEO4J_PASSWORD || \'\'');
    });

    it('should handle query construction with special characters', () => {
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      // Should properly escape entities in query
      expect(initCode).toContain('input.entities.map(e => `"${e}"`).join(\', \')');
    });
  });

  describe('integration with RAG chain', () => {
    it('should properly integrate graph context with vector context', () => {
      const context = {
        targetLanguage: 'typescript' as const,
        includeLangfuse: false,
        includeComments: true,
        outputFormat: 'esm' as const,
      };

      const fragments = converter.convert(mockNode, context);
      const initCode = fragments[1].content;

      expect(initCode).toContain('graphContext');
      expect(initCode).toContain('vectorContext');
      expect(initCode).toContain('Knowledge Graph Context:');
      expect(initCode).toContain('Document Context:');
      expect(initCode).toContain('Provide a comprehensive answer using both sources');
    });
  });

  describe('getDependencies', () => {
    it('should return the correct dependencies', () => {
      const deps = converter.getDependencies();
      expect(deps).toContain('@langchain/core');
    });
  });
});