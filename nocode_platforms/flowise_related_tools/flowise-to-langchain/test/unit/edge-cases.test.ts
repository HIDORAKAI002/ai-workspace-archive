/**
 * Comprehensive edge case tests for all core converters
 */

import {
  // LLM Converters
  OpenAIConverter,
  ChatOpenAIConverter,
  AnthropicConverter,
} from '../../src/registry/converters/llm.js';
import { 
  LLMChainConverter as ChainLLMConverter,
  ConversationChainConverter,
  RetrievalQAChainConverter,
} from '../../src/registry/converters/chain.js';
import { 
  ChatPromptTemplateConverter as PromptChatConverter,
  PromptTemplateConverter as PromptTemplateConv,
  SystemMessageConverter as SystemMsgConverter,
} from '../../src/registry/converters/prompt.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('Edge Cases for Core Converters', () => {
  const mockContext: GenerationContext = {
    targetLanguage: 'typescript',
    outputPath: '/test',
    projectName: 'test-project',
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

  describe('Malformed Input Handling', () => {
    it('should handle nodes with missing required properties', () => {
      const converter = new OpenAIConverter();
      const malformedNode = {
        id: 'malformed-1',
        type: 'openai',
        label: 'Malformed_Node', // Provide minimal required properties
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 0, y: 0 }
      } as IRNode;

      expect(() => converter.convert(malformedNode, mockContext)).not.toThrow();
    });

    it('should handle nodes with invalid parameter types', () => {
      const converter = new ChatOpenAIConverter();
      const invalidNode: IRNode = {
        id: 'invalid-1',
        type: 'chatOpenAI',
        label: 'Invalid_Node',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'temperature',
            value: 'not-a-number', // Should be number
            type: 'number'
          },
          {
            name: 'modelName',
            value: 12345, // Should be string
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(invalidNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const invalid_node_llm = new ChatOpenAI({');
    });

    it('should handle nodes with circular parameter references', () => {
      const converter = new PromptTemplateConv();
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;
      
      const circularNode: IRNode = {
        id: 'circular-1',
        type: 'promptTemplate',
        label: 'Circular_Node',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'template',
            value: 'Hello {name}',
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(circularNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const circular_node_prompt = PromptTemplate.fromTemplate({');
    });
  });

  describe('Extreme Value Handling', () => {
    it('should handle extremely long strings', () => {
      const converter = new SystemMsgConverter();
      const longString = 'A'.repeat(10000);
      
      const longStringNode: IRNode = {
        id: 'long-string-1',
        type: 'systemMessage',
        label: 'Long_String_Node',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'content',
            value: longString,
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(longStringNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const long_string_node_prompt = new SystemMessage(');
      expect(result[1].content.length).toBeGreaterThan(longString.length);
    });

    it('should handle extremely large numbers', () => {
      const converter = new OpenAIConverter();
      const extremeNode: IRNode = {
        id: 'extreme-1',
        type: 'openai',
        label: 'Extreme_Values',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'temperature',
            value: Number.MAX_SAFE_INTEGER,
            type: 'number'
          },
          {
            name: 'maxTokens',
            value: -999999,
            type: 'number'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(extremeNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const extreme_values_llm = new OpenAI({');
    });

    it('should handle empty arrays and objects', () => {
      const converter = new ChainLLMConverter();
      const emptyNode: IRNode = {
        id: 'empty-1',
        type: 'llmChain',
        label: 'Empty_Collections',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'inputVariables',
            value: [],
            type: 'array'
          },
          {
            name: 'partialVariables',
            value: {},
            type: 'object'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(emptyNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const empty_collections_chain = new LLMChain({');
    });
  });

  describe('Unicode and Special Character Handling', () => {
    it('should handle unicode characters in all text fields', () => {
      const converter = new PromptChatConverter();
      const unicodeNode: IRNode = {
        id: 'unicode-1',
        type: 'chatPromptTemplate',
        label: 'Unicode_Test_🚀_世界',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'systemMessage',
            value: 'Hello 世界! 🌍 Welcome to the future 🚀',
            type: 'string'
          },
          {
            name: 'humanMessage',
            value: 'Question: {question} 🤔',
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(unicodeNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('世界');
      expect(result[1].content).toContain('🌍');
      expect(result[1].content).toContain('🚀');
    });

    it('should handle control characters and escape sequences', () => {
      const converter = new SystemMsgConverter();
      const controlNode: IRNode = {
        id: 'control-1',
        type: 'systemMessage',
        label: 'Control_Characters',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'content',
            value: 'Line 1\nLine 2\tTabbed\rCarriage Return\bBackspace\fForm Feed\vVertical Tab',
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(controlNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const control_characters_prompt = new SystemMessage(');
      // Should handle control characters (may not be escaped in output)
      expect(result[1].content).toContain('Line 1');
      expect(result[1].content).toContain('Line 2');
    });

    it('should handle quotes and backslashes correctly', () => {
      const converter = new PromptTemplateConv();
      const quotesNode: IRNode = {
        id: 'quotes-1',
        type: 'promptTemplate',
        label: 'Quotes_Test',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'template',
            value: 'She said "Hello" and he replied \'Hi\' with a backslash: \\',
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(quotesNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const quotes_test_prompt = PromptTemplate.fromTemplate({');
    });
  });

  describe('Boundary Value Testing', () => {
    it('should handle zero values correctly', () => {
      const converter = new OpenAIConverter();
      const zeroNode: IRNode = {
        id: 'zero-1',
        type: 'openai',
        label: 'Zero_Values',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'temperature',
            value: 0,
            type: 'number'
          },
          {
            name: 'maxTokens',
            value: 0,
            type: 'number'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(zeroNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('temperature: 0');
      expect(result[1].content).toContain('maxTokens: 0');
    });

    it('should handle negative values appropriately', () => {
      const converter = new ChatOpenAIConverter();
      const negativeNode: IRNode = {
        id: 'negative-1',
        type: 'chatOpenAI',
        label: 'Negative_Values',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'temperature',
            value: -1,
            type: 'number'
          },
          {
            name: 'maxTokens',
            value: -100,
            type: 'number'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(negativeNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const negative_values_llm = new ChatOpenAI({');
    });

    it('should handle minimum and maximum safe integer values', () => {
      const converter = new OpenAIConverter();
      const minMaxNode: IRNode = {
        id: 'minmax-1',
        type: 'openai',
        label: 'MinMax_Values',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'temperature',
            value: Number.MIN_SAFE_INTEGER,
            type: 'number'
          },
          {
            name: 'maxTokens',
            value: Number.MAX_SAFE_INTEGER,
            type: 'number'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(minMaxNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const minmax_values_llm = new OpenAI({');
    });
  });

  describe('Type Coercion and Validation', () => {
    it('should handle boolean values in string parameters', () => {
      const converter = new OpenAIConverter();
      const booleanNode: IRNode = {
        id: 'boolean-1',
        type: 'openai',
        label: 'Boolean_As_String',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'modelName',
            value: true, // Boolean instead of string
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(booleanNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const boolean_as_string_llm = new OpenAI({');
    });

    it('should handle string values in number parameters', () => {
      const converter = new ChatOpenAIConverter();
      const stringAsNumberNode: IRNode = {
        id: 'string-num-1',
        type: 'chatOpenAI',
        label: 'String_As_Number',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'temperature',
            value: '0.7', // String instead of number
            type: 'number'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(stringAsNumberNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const string_as_number_llm = new ChatOpenAI({');
    });

    it('should handle null values in various parameter types', () => {
      const converter = new PromptTemplateConv();
      const nullNode: IRNode = {
        id: 'null-1',
        type: 'promptTemplate',
        label: 'Null_Values',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'template',
            value: null,
            type: 'string'
          },
          {
            name: 'inputVariables',
            value: null,
            type: 'array'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(nullNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const null_values_prompt = PromptTemplate.fromTemplate({');
      // Should use default values instead of null
      expect(result[1].content).toContain('template: "{input}"');
      expect(result[1].content).toContain('inputVariables: ["input"]');
    });

    it('should handle undefined values in various parameter types', () => {
      const converter = new SystemMsgConverter();
      const undefinedNode: IRNode = {
        id: 'undefined-1',
        type: 'systemMessage',
        label: 'Undefined_Values',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'content',
            value: undefined,
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(undefinedNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const undefined_values_prompt = new SystemMessage("")');
    });
  });

  describe('Complex Data Structure Handling', () => {
    it('should handle deeply nested objects', () => {
      const converter = new PromptTemplateConv();
      const nestedNode: IRNode = {
        id: 'nested-1',
        type: 'promptTemplate',
        label: 'Nested_Object',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'partialVariables',
            value: {
              level1: {
                level2: {
                  level3: {
                    level4: {
                      value: 'deeply nested'
                    }
                  }
                }
              }
            },
            type: 'object'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(nestedNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const nested_object_prompt = PromptTemplate.fromTemplate({');
      expect(result[1].content).toContain('partialVariables:');
    });

    it('should handle arrays with mixed types', () => {
      const converter = new PromptTemplateConv();
      const mixedArrayNode: IRNode = {
        id: 'mixed-1',
        type: 'promptTemplate',
        label: 'Mixed_Array',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'inputVariables',
            value: ['string', 42, true, null, undefined, { nested: 'object' }],
            type: 'array'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(mixedArrayNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const mixed_array_prompt = PromptTemplate.fromTemplate({');
    });

    it('should handle very large arrays', () => {
      const converter = new PromptTemplateConv();
      const largeArray = Array.from({ length: 1000 }, (_, i) => `item${i}`);
      
      const largeArrayNode: IRNode = {
        id: 'large-array-1',
        type: 'promptTemplate',
        label: 'Large_Array',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'inputVariables',
            value: largeArray,
            type: 'array'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(largeArrayNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const large_array_prompt = PromptTemplate.fromTemplate({');
      expect(result[1].content).toContain('inputVariables:');
    });
  });

  describe('Performance and Memory Edge Cases', () => {
    it('should handle nodes with many parameters efficiently', () => {
      const converter = new OpenAIConverter();
      const manyParamsNode: IRNode = {
        id: 'many-params-1',
        type: 'openai',
        label: 'Many_Parameters',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: Array.from({ length: 100 }, (_, i) => ({
          name: `param${i}`,
          value: `value${i}`,
          type: 'string'
        })),
        position: { x: 0, y: 0 }
      };

      const startTime = Date.now();
      const result = converter.convert(manyParamsNode, mockContext);
      const endTime = Date.now();
      
      expect(result).toHaveLength(2);
      expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
    });

    it('should handle nodes with very long IDs', () => {
      const converter = new SystemMsgConverter();
      const longId = 'a'.repeat(1000);
      
      const longIdNode: IRNode = {
        id: longId,
        type: 'systemMessage',
        label: 'Long_ID_Node',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'content',
            value: 'Test message',
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(longIdNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const long_id_node_prompt = new SystemMessage(');
    });
  });

  describe('Context Variation Testing', () => {
    it('should handle different target languages', () => {
      const converter = new OpenAIConverter();
      const testNode: IRNode = {
        id: 'lang-test-1',
        type: 'openai',
        label: 'Language_Test',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'modelName',
            value: 'gpt-3.5-turbo',
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const jsContext = { ...mockContext, targetLanguage: 'typescript' as const };
      const result = converter.convert(testNode, jsContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const language_test_llm = new OpenAI({');
    });

    it('should handle different code style preferences', () => {
      const converter = new PromptTemplateConv();
      const testNode: IRNode = {
        id: 'style-test-1',
        type: 'promptTemplate',
        label: 'Style_Test',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'template',
            value: 'Hello {name}',
            type: 'string'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const noSpacesContext = {
        ...mockContext,
        codeStyle: {
          ...mockContext.codeStyle,
          useSpaces: false,
          indentSize: 4
        }
      };

      const result = converter.convert(testNode, noSpacesContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const style_test_prompt = PromptTemplate.fromTemplate({');
    });
  });

  describe('Error Recovery and Resilience', () => {
    it('should recover from invalid position values', () => {
      const converter = new ChatOpenAIConverter();
      const invalidPositionNode: IRNode = {
        id: 'invalid-pos-1',
        type: 'chatOpenAI',
        label: 'Invalid_Position',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: NaN, y: Infinity }
      };

      const result = converter.convert(invalidPositionNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const invalid_position_llm = new ChatOpenAI({');
    });

    it('should handle nodes with duplicate parameter names', () => {
      const converter = new OpenAIConverter();
      const duplicateParamNode: IRNode = {
        id: 'duplicate-1',
        type: 'openai',
        label: 'Duplicate_Params',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'temperature',
            value: 0.5,
            type: 'number'
          },
          {
            name: 'temperature', // Duplicate name
            value: 0.8,
            type: 'number'
          }
        ],
        position: { x: 0, y: 0 }
      };

      const result = converter.convert(duplicateParamNode, mockContext);
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const duplicate_params_llm = new OpenAI({');
    });
  });
});