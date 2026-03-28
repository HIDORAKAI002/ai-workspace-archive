/**
 * Phase 1 Output Parser Converter Test Suite
 * 
 * Tests for StructuredOutputParserConverter including:
 * - Basic instantiation and configuration
 * - Zod schema generation and validation
 * - Parameter mapping and validation
 * - Code generation and TypeScript compilation
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

// Import StructuredOutputParser converter
import {
  StructuredOutputParserConverter,
} from '../../src/registry/converters/output-parser.js';

import {
  createIRNode,
  createMockNode,
  validateTypeScriptCode,
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers.js';

// Test utilities
function createOutputParserNode(overrides: Partial<any> = {}): IRNode {
  const defaultSchema = {
    fields: [
      {
        name: 'name',
        type: 'string',
        description: 'The name of the person',
        required: true
      },
      {
        name: 'age',
        type: 'number',
        description: 'The age of the person',
        required: true
      },
      {
        name: 'email',
        type: 'string',
        description: 'Email address',
        required: false
      }
    ]
  };

  const defaultParameters = [
    { 
      name: 'schema', 
      value: overrides.schema || defaultSchema, 
      type: 'object', 
      required: true 
    },
    { 
      name: 'outputKey', 
      value: overrides.outputKey || 'parsed_output', 
      type: 'string', 
      required: false 
    },
    { 
      name: 'formatInstructions', 
      value: overrides.formatInstructions || '', 
      type: 'string', 
      required: false 
    },
  ];

  return createIRNode(
    'structuredOutputParser',
    'output-parser',
    overrides.parameters || defaultParameters
  );
}

const mockContext: GenerationContext = {
  targetLanguage: 'typescript',
  outputPath: '/test',
  projectName: 'test-output-parser',
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

describe('Phase 1 StructuredOutputParser Converter', () => {
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

  describe('StructuredOutputParserConverter', () => {
    const converter = new StructuredOutputParserConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(StructuredOutputParserConverter);
      expect(converter.flowiseType).toBe('structuredOutputParser');
      expect(converter.category).toBe('output-parser');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('zod');
    });

    test('should convert basic structured output parser node', () => {
      const mockNode = createOutputParserNode();
      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(4); // langchain import, zod import, schema, declaration
      
      // Validate LangChain import fragment
      const lcImportFragment = fragments.find(f => 
        f.type === 'import' && f.content.includes('@langchain/core')
      );
      expect(lcImportFragment).toBeDefined();
      expect(lcImportFragment!.content).toContain('@langchain/core/output_parsers');
      expect(lcImportFragment!.content).toContain('StructuredOutputParser');
      
      // Validate Zod import fragment
      const zodImportFragment = fragments.find(f => 
        f.type === 'import' && f.content.includes('zod')
      );
      expect(zodImportFragment).toBeDefined();
      expect(zodImportFragment!.content).toContain('zod');
      expect(zodImportFragment!.content).toContain('z');
      
      // Validate schema definition fragment
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      expect(schemaFragment).toBeDefined();
      expect(schemaFragment!.content).toContain('z.object');
      expect(schemaFragment!.content).toContain('name: z.string()');
      expect(schemaFragment!.content).toContain('age: z.number()');
      expect(schemaFragment!.content).toContain('email: z.string()');
      expect(schemaFragment!.content).toContain('.optional()');
      
      // Validate parser declaration fragment
      const declarationFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('StructuredOutputParser')
      );
      expect(declarationFragment).toBeDefined();
      expect(declarationFragment!.content).toContain('StructuredOutputParser.fromZodSchema');
      expect(declarationFragment!.content).toContain('schema:');
    });

    test('should handle complex nested schema', () => {
      const complexSchema = {
        fields: [
          {
            name: 'person',
            type: 'object',
            description: 'Person information',
            required: true,
            properties: {
              name: {
                name: 'name',
                type: 'string',
                description: 'Full name',
                required: true
              },
              contacts: {
                name: 'contacts',
                type: 'array',
                description: 'Contact methods',
                required: false,
                items: {
                  name: 'contact',
                  type: 'string'
                }
              }
            }
          },
          {
            name: 'metadata',
            type: 'object',
            description: 'Additional metadata',
            required: false,
            properties: {
              timestamp: {
                name: 'timestamp',
                type: 'string',
                required: true
              },
              source: {
                name: 'source',
                type: 'string',
                required: false
              }
            }
          }
        ]
      };

      const mockNode = createOutputParserNode({
        schema: complexSchema
      });

      const fragments = converter.convert(mockNode, mockContext);
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      
      expect(schemaFragment!.content).toContain('person: z.object');
      expect(schemaFragment!.content).toContain('contacts: z.array(z.string()).optional()');
      expect(schemaFragment!.content).toContain('metadata: z.object');
      expect(schemaFragment!.content).toContain('timestamp: z.string()');
      expect(schemaFragment!.content).toContain('source: z.string().optional()');
    });

    test('should handle array schema types', () => {
      const arraySchema = {
        fields: [
          {
            name: 'tags',
            type: 'array',
            description: 'List of tags',
            required: true,
            items: {
              name: 'tag',
              type: 'string'
            }
          },
          {
            name: 'scores',
            type: 'array',
            description: 'List of scores',
            required: false,
            items: {
              name: 'score',
              type: 'number'
            }
          },
          {
            name: 'flags',
            type: 'array',
            description: 'Boolean flags',
            required: false,
            items: {
              name: 'flag',
              type: 'boolean'
            }
          }
        ]
      };

      const mockNode = createOutputParserNode({
        schema: arraySchema
      });

      const fragments = converter.convert(mockNode, mockContext);
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      
      expect(schemaFragment!.content).toContain('tags: z.array(z.string())');
      expect(schemaFragment!.content).toContain('scores: z.array(z.number()).optional()');
      expect(schemaFragment!.content).toContain('flags: z.array(z.boolean()).optional()');
    });

    test('should handle all primitive schema types', () => {
      const primitiveSchema = {
        fields: [
          {
            name: 'title',
            type: 'string',
            description: 'Document title',
            required: true
          },
          {
            name: 'count',
            type: 'number',
            description: 'Item count',
            required: true
          },
          {
            name: 'isPublic',
            type: 'boolean',
            description: 'Public visibility',
            required: false
          }
        ]
      };

      const mockNode = createOutputParserNode({
        schema: primitiveSchema
      });

      const fragments = converter.convert(mockNode, mockContext);
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      
      expect(schemaFragment!.content).toContain('title: z.string().describe("Document title")');
      expect(schemaFragment!.content).toContain('count: z.number().describe("Item count")');
      expect(schemaFragment!.content).toContain('isPublic: z.boolean().describe("Public visibility").optional()');
    });

    test('should handle empty or minimal schema', () => {
      const mockNode = createOutputParserNode({
        inputs: {
          schema: {
            fields: []
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      
      // Should generate default schema
      expect(schemaFragment!.content).toContain('z.object');
      expect(schemaFragment!.content).toContain('output: z.string().describe("The parsed output")');
    });

    test('should handle custom output key and format instructions', () => {
      const mockNode = createOutputParserNode({
        inputs: {
          outputKey: 'custom_result',
          formatInstructions: 'Format the output as JSON with proper structure',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const declarationFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('StructuredOutputParser')
      );
      
      expect(declarationFragment!.content).toContain('outputKey: "custom_result"');
      expect(declarationFragment!.content).toContain('formatInstructions: "Format the output as JSON with proper structure"');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createOutputParserNode();
      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n\n');
      
      const validation = validateTypeScriptCode(code);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should handle schema with descriptions properly escaped', () => {
      const mockNode = createOutputParserNode({
        inputs: {
          schema: {
            fields: [
              {
                name: 'message',
                type: 'string',
                description: 'The user\'s "quoted" message with special chars',
                required: true
              },
              {
                name: 'metadata',
                type: 'string',
                description: 'JSON string with embedded "quotes" and \n newlines',
                required: false
              }
            ]
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      
      // Should properly escape quotes in descriptions
      expect(schemaFragment!.content).toContain('describe("The user');
      expect(schemaFragment!.content).toContain('quoted');
      expect(schemaFragment!.content).toContain('message with special chars")');
      expect(schemaFragment!.content).toContain('describe("JSON string');
      expect(schemaFragment!.content).toContain('embedded');
      expect(schemaFragment!.content).toContain('quotes');
    });

    test('should handle missing schema gracefully', () => {
      const mockNode = createOutputParserNode({
        inputs: {
          schema: undefined,
          outputKey: 'result',
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      expect(fragments).toHaveLength(4);
      
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      
      // Should generate default schema
      expect(schemaFragment!.content).toContain('output: z.string().describe("The parsed output")');
    });

    test('should provide correct variable naming', () => {
      const mockNode = createOutputParserNode();
      mockNode.id = 'parser-test-123';

      const fragments = converter.convert(mockNode, mockContext);
      
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      const declarationFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('StructuredOutputParser')
      );
      
      // Should generate reasonable variable names
      expect(schemaFragment!.code).toMatch(/const \w+ParserSchema = /);
      expect(declarationFragment!.code).toMatch(/const \w+Parser = StructuredOutputParser\.fromZodSchema/);
    });
  });

  describe('Integration Tests', () => {
    test('should work with different generation contexts', () => {
      const converter = new StructuredOutputParserConverter();
      const mockNode = createOutputParserNode();

      // Test with different project names
      const contexts = [
        { ...mockContext, projectName: 'simple-parser' },
        { ...mockContext, projectName: 'complex-ai-parser' },
        { ...mockContext, projectName: 'output-parser-test' },
      ];

      contexts.forEach(context => {
        const fragments = converter.convert(mockNode, context);
        expect(fragments).toHaveLength(4);
        
        const code = fragments.map(f => f.content).join('\n\n');
        const validation = validateTypeScriptCode(code);
        expect(validation.valid).toBe(true);
      });
    });

    test('should handle concurrent conversions', () => {
      const converter = new StructuredOutputParserConverter();
      const promises = [];

      // Create 10 concurrent conversions
      for (let i = 0; i < 10; i++) {
        const mockNode = createOutputParserNode({
          inputs: {
            schema: {
              fields: [
                {
                  name: `field_${i}`,
                  type: 'string',
                  description: `Field number ${i}`,
                  required: i % 2 === 0
                }
              ]
            }
          }
        });

        promises.push(
          Promise.resolve(converter.convert(mockNode, mockContext))
        );
      }

      return Promise.all(promises).then(results => {
        expect(results).toHaveLength(10);
        results.forEach(fragments => {
          expect(fragments).toHaveLength(4);
        });
      });
    });
  });

  describe('Performance Tests', () => {
    test('should handle bulk conversion efficiently', () => {
      const converter = new StructuredOutputParserConverter();
      const timer = new PerformanceTimer();
      
      timer.start();
      
      // Convert 100 nodes
      for (let i = 0; i < 100; i++) {
        const mockNode = createOutputParserNode({
          inputs: {
            schema: {
              fields: [
                {
                  name: `dynamic_field_${i}`,
                  type: i % 3 === 0 ? 'string' : i % 3 === 1 ? 'number' : 'boolean',
                  description: `Dynamic field ${i}`,
                  required: i % 2 === 0
                }
              ]
            }
          }
        });
        converter.convert(mockNode, mockContext);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(2000); // Should complete within 2s
    });

    test('should have consistent memory usage', () => {
      const converter = new StructuredOutputParserConverter();
      const tracker = new MemoryTracker();
      
      tracker.start();
      
      // Convert multiple times
      for (let i = 0; i < 50; i++) {
        const mockNode = createOutputParserNode();
        converter.convert(mockNode, mockContext);
      }
      
      const memory = tracker.getUsage();
      expect(memory.difference).toBeLessThan(20 * 1024 * 1024); // Less than 20MB
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed node data gracefully', () => {
      const converter = new StructuredOutputParserConverter();
      
      const malformedNode = {
        id: 'malformed',
        type: 'structuredOutputParser',
        // Missing required fields
      } as any as IRNode;

      expect(() => {
        converter.convert(malformedNode, mockContext);
      }).not.toThrow();
    });

    test('should handle missing input parameters', () => {
      const converter = new StructuredOutputParserConverter();
      
      const nodeWithoutInputs = createOutputParserNode();
      delete nodeWithoutInputs.data.inputs;

      const fragments = converter.convert(nodeWithoutInputs, mockContext);
      expect(fragments).toHaveLength(4);
    });

    test('should handle invalid schema types', () => {
      const converter = new StructuredOutputParserConverter();
      
      const nodeWithInvalidSchema = createOutputParserNode({
        inputs: {
          schema: {
            fields: [
              {
                name: 'invalid_field',
                type: 'unknown_type' as any,
                description: 'Invalid type field',
                required: true
              }
            ]
          }
        }
      });

      const fragments = converter.convert(nodeWithInvalidSchema, mockContext);
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );
      
      // Should fall back to unknown type
      expect(schemaFragment!.content).toContain('invalid_field: z.unknown()');
    });
  });

  describe('Code Quality Tests', () => {
    test('should generate properly formatted TypeScript', () => {
      const converter = new StructuredOutputParserConverter();
      const mockNode = createOutputParserNode();

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n\n');

      // Check for proper formatting
      expect(code).toMatch(/import.*from.*@langchain\/core/);
      expect(code).toMatch(/import.*from.*zod/);
      expect(code).toMatch(/const \w+Schema = z\.object/);
      expect(code).toMatch(/StructuredOutputParser\.fromZodSchema/);
      
      // Check for proper indentation (2 spaces as per config)
      const lines = code.split('\n');
      const objectLines = lines.filter(line => line.includes(':') && !line.includes('import'));
      objectLines.forEach(line => {
        if (line.trim().length > 0) {
          expect(line).toMatch(/^\s+\w+:/); // Should have indentation
        }
      });
    });

    test('should use single quotes as per style guide', () => {
      const converter = new StructuredOutputParserConverter();
      const mockNode = createOutputParserNode();

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');

      // Should use single quotes for imports
      expect(code).toMatch(/import.*from\s+'@langchain\/core/);
      expect(code).toMatch(/import.*from\s+'zod'/);
    });

    test('should generate valid Zod schema syntax', () => {
      const converter = new StructuredOutputParserConverter();
      const mockNode = createOutputParserNode();

      const fragments = converter.convert(mockNode, mockContext);
      const schemaFragment = fragments.find(f => 
        f.type === 'declaration' && f.content.includes('Schema')
      );

      // Should use proper Zod syntax
      expect(schemaFragment!.code).toMatch(/z\.object\(\{[\s\S]*\}\)/);
      expect(schemaFragment!.code).toMatch(/z\.(string|number|boolean)\(\)/);
      expect(schemaFragment!.code).toMatch(/\.describe\(/);
      expect(schemaFragment!.code).toMatch(/\.optional\(\)/);
    });
  });
});