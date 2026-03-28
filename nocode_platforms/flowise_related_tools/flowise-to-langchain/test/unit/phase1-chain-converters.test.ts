/**
 * Phase 1 Chain Converters Test Suite
 * 
 * Tests for chain converters including:
 * - APIChainConverter
 * - SQLDatabaseChainConverter
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

// Import Chain converters
import {
  APIChainConverter,
  SQLDatabaseChainConverter,
} from '../../src/registry/converters/chain.js';

import {
  createMockNode,
  validateTypeScriptCode,
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers.js';

// Test utilities
function createChainNode(type: string, overrides: Partial<any> = {}): IRNode {
  return {
    id: `chain-${Math.random().toString(36).substr(2, 9)}`,
    type,
    label: `${type}_Chain`,
    category: 'chain',
    inputs: [],
    outputs: [],
    data: {
      id: `chain-${Math.random().toString(36).substr(2, 9)}`,
      label: `${type} Chain`,
      version: 2,
      name: type,
      type,
      baseClasses: ['BaseChain', 'Runnable'],
      category: 'Chains',
      description: `${type} chain implementation`,
      inputParams: [
        { label: 'Chain Type', name: 'chainType', type: 'string' },
        { label: 'Input Variables', name: 'inputVariables', type: 'json' },
        { label: 'Output Variables', name: 'outputVariables', type: 'json' },
        { label: 'Verbose', name: 'verbose', type: 'boolean' },
      ],
      inputAnchors: [
        {
          id: 'llm',
          name: 'model',
          label: 'Language Model',
          type: 'BaseLanguageModel',
        }
      ],
      inputs: {
        chainType: type,
        verbose: false,
        ...overrides.inputs,
      },
      outputAnchors: [{
        id: 'output',
        name: 'output',
        label: 'APIChain | SQLDatabaseChain',
        type: 'BaseChain',
      }],
    },
    ...overrides,
  } as IRNode;
}

const mockContext: GenerationContext = {
  targetLanguage: 'typescript',
  outputPath: '/test',
  projectName: 'test-chains',
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

describe('Phase 1 Chain Converters', () => {
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

  describe('APIChainConverter', () => {
    const converter = new APIChainConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(APIChainConverter);
      expect(converter.flowiseType).toBe('apiChain');
      expect(converter.category).toBe('chain');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/community');
    });

    test('should convert basic API chain node', () => {
      const mockNode = createChainNode('apiChain', {
        inputs: {
          apiUrl: 'https://api.example.com',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token123'
          },
          inputVariables: ['query'],
          outputKey: 'result',
        }
      });

      // Add LLM input connection
      mockNode.inputs = [
        {
          id: 'llm-input',
          dataType: 'llm',
          sourceNodeId: 'llm-node-1',
          sourcePortName: 'output',
        }
      ];

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2); // import and declaration
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('@langchain/community');
      expect(importFragment!.content).toContain('APIChain');
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment).toBeDefined();
      expect(declarationFragment!.content).toContain('APIChain.fromLLMAndAPIUrl');
      expect(declarationFragment!.content).toContain('apiUrl: "https://api.example.com"');
      expect(declarationFragment!.content).toContain('inputVariables: ["query"]');
    });

    test('should handle API chain with custom headers', () => {
      const mockNode = createChainNode('apiChain', {
        inputs: {
          apiUrl: 'https://custom-api.example.com/data',
          method: 'POST',
          headers: {
            'X-API-Key': 'secret-key',
            'User-Agent': 'LangChain-Client'
          },
          requestBodyKey: 'data',
          responseKey: 'response',
          verbose: true,
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('apiUrl: "https://custom-api.example.com/data"');
      expect(declarationFragment!.content).toContain('headers:');
      expect(declarationFragment!.content).toContain('"X-API-Key": "secret-key"');
      expect(declarationFragment!.content).toContain('verbose: true');
    });

    test('should handle API chain with prompt template', () => {
      const mockNode = createChainNode('apiChain', {
        inputs: {
          apiUrl: 'https://search-api.example.com',
          apiUrlPrompt: 'Create a search query for: {input}',
          requestMethod: 'GET',
          inputVariables: ['input'],
          outputKey: 'searchResults',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('APIChain.fromLLMAndAPIUrl');
      expect(declarationFragment!.content).toContain('apiUrl: "https://search-api.example.com"');
      expect(declarationFragment!.content).toContain('inputVariables: ["input"]');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createChainNode('apiChain');
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should handle minimal configuration', () => {
      const mockNode = createChainNode('apiChain', {
        inputs: {
          apiUrl: 'https://minimal-api.com',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('APIChain.fromLLMAndAPIUrl');
      expect(declarationFragment!.content).toContain('apiUrl: "https://minimal-api.com"');
    });
  });

  describe('SQLDatabaseChainConverter', () => {
    const converter = new SQLDatabaseChainConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(SQLDatabaseChainConverter);
      expect(converter.flowiseType).toBe('sqlDatabaseChain');
      expect(converter.category).toBe('chain');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });

    test('should convert basic SQL database chain node', () => {
      const mockNode = createChainNode('sqlDatabaseChain', {
        inputs: {
          database: 'postgresql://user:pass@localhost:5432/mydb',
          topK: 5,
          returnSql: true,
          sqlOnly: false,
          inputVariables: ['question'],
          outputKey: 'result',
        }
      });

      // Add LLM input connection
      mockNode.inputs = [
        {
          id: 'llm-input',
          dataType: 'llm',
          sourceNodeId: 'llm-node-1',
          sourcePortName: 'output',
        }
      ];

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2); // import and declaration
      
      // Validate import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('@langchain/community');
      expect(importFragment!.content).toContain('SqlDatabaseChain');
      
      // Validate declaration fragment
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment).toBeDefined();
      expect(declarationFragment!.content).toContain('SqlDatabaseChain.fromLLM');
      expect(declarationFragment!.content).toContain('topK: 5');
      expect(declarationFragment!.content).toContain('returnSql: true');
    });

    test('should handle SQL chain with custom configuration', () => {
      const mockNode = createChainNode('sqlDatabaseChain', {
        inputs: {
          database: 'mysql://admin:secret@db.example.com:3306/analytics',
          topK: 10,
          returnSql: true,
          sqlOnly: false,
          returnIntermediateSteps: true,
          ignoreTables: ['temp_tables', 'audit_logs'],
          sampleRowsInTableInfo: 3,
          verbose: true,
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('topK: 10');
      expect(declarationFragment!.content).toContain('returnSql: true');
      expect(declarationFragment!.content).toContain('returnIntermediateSteps: true');
      expect(declarationFragment!.content).toContain('sampleRowsInTableInfo: 3');
      expect(declarationFragment!.content).toContain('verbose: true');
    });

    test('should handle different database types', () => {
      const databases = [
        'postgresql://user:pass@localhost:5432/db',
        'mysql://user:pass@localhost:3306/db',
        'sqlite:///path/to/database.db',
        'mssql://user:pass@localhost:1433/db',
      ];

      databases.forEach(database => {
        const mockNode = createChainNode('sqlDatabaseChain', {
          inputs: { database }
        });

        const fragments = converter.convert(mockNode, mockContext);
        const declarationFragment = fragments.find(f => f.type === 'declaration');
        
        expect(declarationFragment!.content).toContain('SqlDatabaseChain.fromLLM');
      });
    });

    test('should handle SQL chain with table restrictions', () => {
      const mockNode = createChainNode('sqlDatabaseChain', {
        inputs: {
          database: 'postgresql://localhost/mydb',
          includeTables: ['users', 'orders', 'products'],
          ignoreTables: ['audit', 'temp'],
          customTableInfo: {
            users: 'Contains user information with columns: id, name, email',
            orders: 'Contains order data with columns: id, user_id, total, date'
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment!.content).toContain('SqlDatabaseChain.fromLLM');
      expect(declarationFragment!.content).toContain('includeTables: ["users", "orders", "products"]');
      expect(declarationFragment!.content).toContain('ignoreTables: ["audit", "temp"]');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createChainNode('sqlDatabaseChain');
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should handle minimal configuration', () => {
      const mockNode = createChainNode('sqlDatabaseChain', {
        inputs: {
          database: 'sqlite:///local.db',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      expect(fragments).toHaveLength(2);
      
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment!.content).toContain('SqlDatabaseChain.fromLLM');
    });
  });

  describe('Integration Tests', () => {
    test('should handle multiple chain converters together', () => {
      const apiConverter = new APIChainConverter();
      const sqlConverter = new SQLDatabaseChainConverter();

      const apiNode = createChainNode('apiChain', {
        inputs: {
          apiUrl: 'https://test-api.com',
          method: 'GET',
        }
      });

      const sqlNode = createChainNode('sqlDatabaseChain', {
        inputs: {
          database: 'postgresql://localhost/test',
          topK: 5,
        }
      });

      const apiFragments = apiConverter.convert(apiNode, mockContext);
      const sqlFragments = sqlConverter.convert(sqlNode, mockContext);

      // Both conversions should succeed
      expect(apiFragments).toHaveLength(2);
      expect(sqlFragments).toHaveLength(2);

      // Should have different chain types
      const apiDeclaration = apiFragments.find(f => f.type === 'declaration');
      const sqlDeclaration = sqlFragments.find(f => f.type === 'declaration');

      expect(apiDeclaration!.content).toContain('APIChain');
      expect(sqlDeclaration!.content).toContain('SqlDatabaseChain');
    });

    test('should work with different chain configurations', () => {
      const converters = [
        { converter: new APIChainConverter(), type: 'apiChain' },
        { converter: new SQLDatabaseChainConverter(), type: 'sqlDatabaseChain' },
      ];

      converters.forEach(({ converter, type }) => {
        const configs = [
          { verbose: false },
          { verbose: true, inputVariables: ['input'] },
          { outputKey: 'result', inputVariables: ['query', 'context'] },
        ];

        configs.forEach(config => {
          const mockNode = createChainNode(type, { inputs: config });
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
        { converter: new APIChainConverter(), type: 'apiChain' },
        { converter: new SQLDatabaseChainConverter(), type: 'sqlDatabaseChain' },
      ];

      converters.forEach(({ converter, type }) => {
        // Test with null/undefined inputs
        const mockNode = createChainNode(type, {
          inputs: {
            verbose: null,
            inputVariables: undefined,
            outputKey: '',
          }
        });

        const fragments = converter.convert(mockNode, mockContext);
        expect(fragments).toHaveLength(2);
      });
    });
  });

  describe('Performance Tests', () => {
    test('should handle bulk conversion efficiently', () => {
      const apiConverter = new APIChainConverter();
      const sqlConverter = new SQLDatabaseChainConverter();
      const timer = new PerformanceTimer();
      
      timer.start();
      
      // Convert 50 nodes of each type
      for (let i = 0; i < 50; i++) {
        const apiNode = createChainNode('apiChain', {
          inputs: {
            apiUrl: `https://api-${i}.example.com`,
            method: i % 2 === 0 ? 'GET' : 'POST',
          }
        });
        
        const sqlNode = createChainNode('sqlDatabaseChain', {
          inputs: {
            database: `postgresql://localhost:5432/db_${i}`,
            topK: 5 + i,
          }
        });

        apiConverter.convert(apiNode, mockContext);
        sqlConverter.convert(sqlNode, mockContext);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(3000); // Should complete within 3s
    });

    test('should have consistent memory usage', () => {
      const converter = new APIChainConverter();
      const tracker = new MemoryTracker();
      
      tracker.start();
      
      // Convert multiple times
      for (let i = 0; i < 50; i++) {
        const mockNode = createChainNode('apiChain');
        converter.convert(mockNode, mockContext);
      }
      
      const memory = tracker.getUsage();
      expect(memory.difference).toBeLessThan(20 * 1024 * 1024); // Less than 20MB
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed node data gracefully', () => {
      const converter = new APIChainConverter();
      
      const malformedNode = {
        id: 'malformed',
        type: 'apiChain',
        // Missing required fields
      } as any as IRNode;

      expect(() => {
        converter.convert(malformedNode, mockContext);
      }).not.toThrow();
    });

    test('should handle missing input parameters', () => {
      const converter = new SQLDatabaseChainConverter();
      
      const nodeWithoutInputs = createChainNode('sqlDatabaseChain');
      delete nodeWithoutInputs.data.inputs;

      const fragments = converter.convert(nodeWithoutInputs, mockContext);
      expect(fragments).toHaveLength(2);
    });
  });

  describe('Code Quality Tests', () => {
    test('should generate properly formatted TypeScript', () => {
      const converter = new APIChainConverter();
      const mockNode = createChainNode('apiChain');

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n\n');

      // Check for proper formatting
      expect(code).toMatch(/import.*from.*@langchain/);
      expect(code).toMatch(/APIChain\.fromLLMAndAPIUrl/);
      
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
      const apiConverter = new APIChainConverter();
      const sqlConverter = new SQLDatabaseChainConverter();

      const apiNode = createChainNode('apiChain');
      const sqlNode = createChainNode('sqlDatabaseChain');

      const apiFragments = apiConverter.convert(apiNode, mockContext);
      const sqlFragments = sqlConverter.convert(sqlNode, mockContext);

      // Should generate reasonable variable names
      const apiDeclaration = apiFragments.find(f => f.type === 'declaration');
      const sqlDeclaration = sqlFragments.find(f => f.type === 'declaration');

      expect(apiDeclaration!.content).toMatch(/const \w+Chain = /);
      expect(sqlDeclaration!.content).toMatch(/const \w+Chain = /);
    });
  });
});