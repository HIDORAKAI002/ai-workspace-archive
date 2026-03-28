/**
 * Comprehensive tests for Prompt converters
 */

import {
  ChatPromptTemplateConverter,
  PromptTemplateConverter,
  FewShotPromptTemplateConverter,
  SystemMessageConverter,
  HumanMessageConverter,
  AIMessageConverter,
} from '../../src/registry/converters/prompt.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('Prompt Converters', () => {
  const mockContext: GenerationContext = {
    targetLanguage: 'typescript',
    outputPath: '/test',
    projectName: 'test',
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

  describe('ChatPromptTemplate Converter', () => {
    const converter = new ChatPromptTemplateConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(ChatPromptTemplateConverter);
      expect(converter.flowiseType).toBe('chatPromptTemplate');
      expect(converter.category).toBe('prompt');
    });

    it('should convert basic ChatPromptTemplate node', () => {
      const mockNode: IRNode = {
        id: 'chatprompt-1',
        type: 'chatPromptTemplate',
        label: 'Chat_Prompt_Template',
        category: 'prompt',
        inputs: [],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'prompt',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'systemMessage',
            value: 'You are a helpful assistant.',
            type: 'string'
          },
          {
            name: 'humanMessage',
            value: 'Question: {input}',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('import');
      expect(result[0].content).toContain('import {');
      expect(result[0].content).toContain('ChatPromptTemplate,');
      expect(result[0].content).toContain('SystemMessage,');
      expect(result[0].content).toContain('HumanMessage');
      expect(result[0].content).toContain('} from \'@langchain/core/prompts\';');
      expect(result[1].type).toBe('declaration');
      expect(result[1].content).toContain('const chat_prompt_template_prompt = ChatPromptTemplate.fromMessages([');
      expect(result[1].content).toContain('["system", "You are a helpful assistant."]');
      expect(result[1].content).toContain('["human", "Question: {input}"]');
    });

    it('should handle system message only', () => {
      const mockNode: IRNode = {
        id: 'chatprompt-2',
        type: 'chatPromptTemplate',
        label: 'System_Only_Prompt',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'systemMessage',
            value: 'System instructions only.',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('["system", "System instructions only."]');
      expect(result[1].content).toContain('["human", "{input}"]'); // Default human message
    });

    it('should handle format instructions', () => {
      const mockNode: IRNode = {
        id: 'chatprompt-3',
        type: 'chatPromptTemplate',
        label: 'Format_Instructions_Prompt',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'systemMessage',
            value: 'You are a helpful assistant.',
            type: 'string'
          },
          {
            name: 'humanMessage',
            value: 'Question: {input}',
            type: 'string'
          },
          {
            name: 'formatInstructions',
            value: 'Please format your response as JSON.',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('["system", "You are a helpful assistant."]');
      expect(result[1].content).toContain('["human", "Question: {input}"]');
      expect(result[1].content).toContain('["system", "Please format your response as JSON."]');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
    });

    it('should validate node type correctly', () => {
      const validNode: IRNode = {
        id: 'chatprompt-4',
        type: 'chatPromptTemplate',
        label: 'Valid_Prompt',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const invalidNode: IRNode = {
        id: 'invalid-1',
        type: 'invalidType',
        label: 'Invalid_Node',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      expect(converter.canConvert(validNode)).toBe(true);
      expect(converter.canConvert(invalidNode)).toBe(false);
    });
  });

  describe('PromptTemplate Converter', () => {
    const converter = new PromptTemplateConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(PromptTemplateConverter);
      expect(converter.flowiseType).toBe('promptTemplate');
      expect(converter.category).toBe('prompt');
    });

    it('should convert basic PromptTemplate node', () => {
      const mockNode: IRNode = {
        id: 'prompt-1',
        type: 'promptTemplate',
        label: 'Basic_Prompt_Template',
        category: 'prompt',
        inputs: [],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'prompt',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'template',
            value: 'Translate the following text to {language}: {text}',
            type: 'string'
          },
          {
            name: 'inputVariables',
            value: ['language', 'text'],
            type: 'array'
          }
        ],
        position: { x: 200, y: 200 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { PromptTemplate } from \'@langchain/core/prompts\';');
      expect(result[1].content).toContain('const basic_prompt_template_prompt = PromptTemplate.fromTemplate({');
      expect(result[1].content).toContain('template: "Translate the following text to {language}: {text}"');
      expect(result[1].content).toContain('inputVariables: ["language", "text"]');
    });

    it('should handle default template and input variables', () => {
      const mockNode: IRNode = {
        id: 'prompt-2',
        type: 'promptTemplate',
        label: 'Default_Prompt',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 200, y: 200 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('template: "{input}"');
      expect(result[1].content).toContain('inputVariables: ["input"]');
    });

    it('should handle partial variables', () => {
      const mockNode: IRNode = {
        id: 'prompt-3',
        type: 'promptTemplate',
        label: 'Partial_Variables_Prompt',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'template',
            value: 'Hello {name}, today is {date}',
            type: 'string'
          },
          {
            name: 'inputVariables',
            value: ['name'],
            type: 'array'
          },
          {
            name: 'partialVariables',
            value: { date: '2023-01-01' },
            type: 'object'
          }
        ],
        position: { x: 200, y: 200 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('template: "Hello {name}, today is {date}"');
      expect(result[1].content).toContain('inputVariables: ["name"]');
      expect(result[1].content).toContain('partialVariables: { date: "2023-01-01" }');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('FewShotPromptTemplate Converter', () => {
    const converter = new FewShotPromptTemplateConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(FewShotPromptTemplateConverter);
      expect(converter.flowiseType).toBe('fewShotPromptTemplate');
      expect(converter.category).toBe('prompt');
    });

    it('should convert FewShotPromptTemplate node', () => {
      const mockNode: IRNode = {
        id: 'fewshot-1',
        type: 'fewShotPromptTemplate',
        label: 'Few_Shot_Prompt',
        category: 'prompt',
        inputs: [],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'prompt',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'examples',
            value: [
              { input: 'happy', output: 'sad' },
              { input: 'tall', output: 'short' }
            ],
            type: 'array'
          },
          {
            name: 'examplePrompt',
            value: 'Input: {input}\nOutput: {output}',
            type: 'string'
          },
          {
            name: 'prefix',
            value: 'Give the antonym of every input',
            type: 'string'
          },
          {
            name: 'suffix',
            value: 'Input: {adjective}\nOutput:',
            type: 'string'
          },
          {
            name: 'inputVariables',
            value: ['adjective'],
            type: 'array'
          },
          {
            name: 'exampleSeparator',
            value: '\n\n',
            type: 'string'
          }
        ],
        position: { x: 300, y: 300 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import {');
      expect(result[0].content).toContain('FewShotPromptTemplate,');
      expect(result[0].content).toContain('PromptTemplate');
      expect(result[0].content).toContain('} from \'@langchain/core/prompts\';');
      expect(result[1].content).toContain('const few_shot_prompt_prompt = new FewShotPromptTemplate({');
      expect(result[1].content).toContain('examples: [{ input: "happy", output: "sad" }, { input: "tall", output: "short" }]');
      expect(result[1].content).toContain('examplePrompt: PromptTemplate.fromTemplate(');
      expect(result[1].content).toContain('prefix: "Give the antonym of every input"');
      expect(result[1].content).toContain('suffix: "Input: {adjective}');
      expect(result[1].content).toContain('inputVariables: ["adjective"]');
      expect(result[1].content).toContain('exampleSeparator:');
    });

    it('should handle default values', () => {
      const mockNode: IRNode = {
        id: 'fewshot-2',
        type: 'fewShotPromptTemplate',
        label: 'Default_Few_Shot',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 300, y: 300 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('examples: []');
      expect(result[1].content).toContain('examplePrompt: PromptTemplate.fromTemplate(');
      expect(result[1].content).toContain('prefix: ""');
      expect(result[1].content).toContain('suffix: "{input}"');
      expect(result[1].content).toContain('inputVariables: ["input"]');
      expect(result[1].content).toContain('exampleSeparator:');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('SystemMessage Converter', () => {
    const converter = new SystemMessageConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(SystemMessageConverter);
      expect(converter.flowiseType).toBe('systemMessage');
      expect(converter.category).toBe('prompt');
    });

    it('should convert SystemMessage node', () => {
      const mockNode: IRNode = {
        id: 'system-1',
        type: 'systemMessage',
        label: 'System_Message',
        category: 'prompt',
        inputs: [],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'message',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'content',
            value: 'You are a helpful AI assistant.',
            type: 'string'
          }
        ],
        position: { x: 400, y: 400 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { SystemMessage } from \'@langchain/core/messages\';');
      expect(result[1].content).toContain('const system_message_prompt = new SystemMessage("You are a helpful AI assistant.");');
    });

    it('should handle empty content', () => {
      const mockNode: IRNode = {
        id: 'system-2',
        type: 'systemMessage',
        label: 'Empty_System_Message',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 400, y: 400 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('const empty_system_message_prompt = new SystemMessage("");');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('HumanMessage Converter', () => {
    const converter = new HumanMessageConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(HumanMessageConverter);
      expect(converter.flowiseType).toBe('humanMessage');
      expect(converter.category).toBe('prompt');
    });

    it('should convert HumanMessage node', () => {
      const mockNode: IRNode = {
        id: 'human-1',
        type: 'humanMessage',
        label: 'Human_Message',
        category: 'prompt',
        inputs: [],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'message',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'content',
            value: 'What is the weather like today?',
            type: 'string'
          }
        ],
        position: { x: 500, y: 500 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { HumanMessage } from \'@langchain/core/messages\';');
      expect(result[1].content).toContain('const human_message_prompt = new HumanMessage("What is the weather like today?");');
    });

    it('should handle empty content', () => {
      const mockNode: IRNode = {
        id: 'human-2',
        type: 'humanMessage',
        label: 'Empty_Human_Message',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 500, y: 500 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('const empty_human_message_prompt = new HumanMessage("");');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('AIMessage Converter', () => {
    const converter = new AIMessageConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(AIMessageConverter);
      expect(converter.flowiseType).toBe('aiMessage');
      expect(converter.category).toBe('prompt');
    });

    it('should convert AIMessage node', () => {
      const mockNode: IRNode = {
        id: 'ai-1',
        type: 'aiMessage',
        label: 'AI_Message',
        category: 'prompt',
        inputs: [],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'message',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'content',
            value: 'I am here to help you with any questions.',
            type: 'string'
          }
        ],
        position: { x: 600, y: 600 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { AIMessage } from \'@langchain/core/messages\';');
      expect(result[1].content).toContain('const ai_message_prompt = new AIMessage("I am here to help you with any questions.");');
    });

    it('should handle empty content', () => {
      const mockNode: IRNode = {
        id: 'ai-2',
        type: 'aiMessage',
        label: 'Empty_AI_Message',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 600, y: 600 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('const empty_ai_message_prompt = new AIMessage("");');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle prompts with special characters in content', () => {
      const converter = new SystemMessageConverter();
      const mockNode: IRNode = {
        id: 'edge-1',
        type: 'systemMessage',
        label: 'Special_Chars_Message',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'content',
            value: 'Special chars: "quotes", \'single\', \\backslash, \n newline, \t tab',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const special_chars_message_prompt = new SystemMessage(');
      // Should properly escape special characters
      expect(result[1].content).toContain('Special chars');
    });

    it('should handle null/undefined parameters', () => {
      const converter = new PromptTemplateConverter();
      const mockNode: IRNode = {
        id: 'edge-2',
        type: 'promptTemplate',
        label: 'Null_Params_Prompt',
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
            value: undefined,
            type: 'array'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const null_params_prompt_prompt = PromptTemplate.fromTemplate({');
      // Should use default values
      expect(result[1].content).toContain('template: "{input}"');
      expect(result[1].content).toContain('inputVariables: ["input"]');
    });

    it('should handle complex nested examples in FewShotPromptTemplate', () => {
      const converter = new FewShotPromptTemplateConverter();
      const mockNode: IRNode = {
        id: 'edge-3',
        type: 'fewShotPromptTemplate',
        label: 'Complex_Examples_Prompt',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'examples',
            value: [
              { 
                input: 'What is 2+2?', 
                output: 'The answer is 4.',
                reasoning: 'Simple arithmetic'
              },
              { 
                input: 'What is the capital of France?', 
                output: 'Paris is the capital of France.',
                context: 'Geography question'
              }
            ],
            type: 'array'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const complex_examples_prompt_prompt = new FewShotPromptTemplate({');
      expect(result[1].content).toContain('examples:');
      expect(result[1].content).toContain('What is 2+2?');
      expect(result[1].content).toContain('What is the capital of France?');
    });

    it('should handle special characters in node labels', () => {
      const converter = new ChatPromptTemplateConverter();
      const mockNode: IRNode = {
        id: 'edge-4',
        type: 'chatPromptTemplate',
        label: 'Special-Chars!@#$%^&*()_+{}[]|\\:";\'<>?,./',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      // Should generate a valid variable name
      expect(result[1].content).toMatch(/const special_chars_\w+ = ChatPromptTemplate\.fromMessages/);
    });
  });

  describe('Performance and Memory Tests', () => {
    it('should handle multiple converter instances efficiently', () => {
      const converters = [
        new ChatPromptTemplateConverter(),
        new PromptTemplateConverter(),
        new FewShotPromptTemplateConverter(),
        new SystemMessageConverter(),
        new HumanMessageConverter(),
        new AIMessageConverter()
      ];

      expect(converters).toHaveLength(6);
      converters.forEach((converter, index) => {
        expect(converter.category).toBe('prompt');
        expect(typeof converter.flowiseType).toBe('string');
        expect(converter.flowiseType.length).toBeGreaterThan(0);
      });
    });

    it('should efficiently convert large numbers of prompt nodes', () => {
      const converter = new PromptTemplateConverter();
      const startTime = Date.now();
      
      // Convert 100 prompt nodes
      for (let i = 0; i < 100; i++) {
        const mockNode: IRNode = {
          id: `perf-prompt-${i}`,
          type: 'promptTemplate',
          label: `Performance_Prompt_${i}`,
          category: 'prompt',
          inputs: [],
          outputs: [],
          parameters: [
            {
              name: 'template',
              value: `Template ${i}: {input}`,
              type: 'string'
            }
          ],
          position: { x: i * 10, y: i * 10 }
        };

        const result = converter.convert(mockNode, mockContext);
        expect(result).toHaveLength(2);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time (less than 1000ms)
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Integration with Registry', () => {
    it('should be properly integrated with converter registry', () => {
      const converters = [
        new ChatPromptTemplateConverter(),
        new PromptTemplateConverter(),
        new FewShotPromptTemplateConverter(),
        new SystemMessageConverter(),
        new HumanMessageConverter(),
        new AIMessageConverter()
      ];

      converters.forEach(converter => {
        expect(converter.getSupportedVersions()).toContain('*');
        expect(converter.isDeprecated()).toBe(false);
        expect(converter.getReplacementType()).toBeUndefined();
      });
    });

    it('should handle complex prompt compositions', () => {
      const chatPrompt = new ChatPromptTemplateConverter();
      const systemMessage = new SystemMessageConverter();
      const humanMessage = new HumanMessageConverter();
      
      const mockChatNode: IRNode = {
        id: 'chat-prompt-1',
        type: 'chatPromptTemplate',
        label: 'Chat_Prompt_1',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'systemMessage',
            value: 'You are helpful.',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const mockSystemNode: IRNode = {
        id: 'system-1',
        type: 'systemMessage',
        label: 'System_1',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'content',
            value: 'System context',
            type: 'string'
          }
        ],
        position: { x: 200, y: 200 }
      };

      const mockHumanNode: IRNode = {
        id: 'human-1',
        type: 'humanMessage',
        label: 'Human_1',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'content',
            value: 'User input',
            type: 'string'
          }
        ],
        position: { x: 300, y: 300 }
      };

      const chatResult = chatPrompt.convert(mockChatNode, mockContext);
      const systemResult = systemMessage.convert(mockSystemNode, mockContext);
      const humanResult = humanMessage.convert(mockHumanNode, mockContext);
      
      expect(chatResult).toHaveLength(2);
      expect(systemResult).toHaveLength(2);
      expect(humanResult).toHaveLength(2);
      
      // All should have different import requirements
      expect(chatResult[0].content).toContain('@langchain/core/prompts');
      expect(systemResult[0].content).toContain('@langchain/core/messages');
      expect(humanResult[0].content).toContain('@langchain/core/messages');
    });
  });

  describe('Prompt-specific Features', () => {
    it('should handle ChatPromptTemplate with all message types', () => {
      const converter = new ChatPromptTemplateConverter();
      const mockNode: IRNode = {
        id: 'full-chat-prompt',
        type: 'chatPromptTemplate',
        label: 'Full_Chat_Prompt',
        category: 'prompt',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'systemMessage',
            value: 'You are a helpful assistant.',
            type: 'string'
          },
          {
            name: 'humanMessage',
            value: 'Question: {question}',
            type: 'string'
          },
          {
            name: 'formatInstructions',
            value: 'Respond in JSON format.',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('["system", "You are a helpful assistant."]');
      expect(result[1].content).toContain('["human", "Question: {question}"]');
      expect(result[1].content).toContain('["system", "Respond in JSON format."]');
    });

    it('should handle PromptTemplate with complex templates', () => {
      const converter = new PromptTemplateConverter();
      const templates = [
        'Simple template: {input}',
        'Multi-variable: {name} is {age} years old in {city}',
        'With formatting: Answer the question about {topic} in {format} format'
      ];
      
      templates.forEach((template, index) => {
        const mockNode: IRNode = {
          id: `complex-template-${index}`,
          type: 'promptTemplate',
          label: `Complex_Template_${index}`,
          category: 'prompt',
          inputs: [],
          outputs: [],
          parameters: [
            {
              name: 'template',
              value: template,
              type: 'string'
            }
          ],
          position: { x: 100, y: 100 }
        };

        const result = converter.convert(mockNode, mockContext);
        expect(result[1].content).toContain(`template: "${template}"`);
      });
    });
  });
});