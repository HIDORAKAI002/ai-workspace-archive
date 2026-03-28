/**
 * Comprehensive tests for LLM converters
 */

import {
  OpenAIConverter,
  ChatOpenAIConverter,
  AnthropicConverter,
  AzureOpenAIConverter,
  OllamaConverter,
  HuggingFaceConverter,
  CohereConverter,
  ReplicateConverter,
} from '../../src/registry/converters/llm.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('LLM Converters', () => {
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

  describe('OpenAI Converter', () => {
    const converter = new OpenAIConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(OpenAIConverter);
      expect(converter.flowiseType).toBe('openAI');
      expect(converter.category).toBe('llm');
    });

    it('should convert basic OpenAI node', () => {
      const mockNode: IRNode = {
        id: 'openai-1',
        type: 'openAI',
        label: 'OpenAI_Model',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'modelName',
            value: 'gpt-3.5-turbo',
            type: 'string'
          },
          {
            name: 'temperature',
            value: 0.7,
            type: 'number'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('import');
      expect(result[0].content).toContain('import { OpenAI } from \'@langchain/openai\';');
      expect(result[1].type).toBe('declaration');
      expect(result[1].content).toContain('const openai_model_llm = new OpenAI({');
      expect(result[1].content).toContain('modelName: "gpt-3.5-turbo"');
      expect(result[1].content).toContain('temperature: 0.7');
    });

    it('should handle missing parameters gracefully', () => {
      const mockNode: IRNode = {
        id: 'openai-2',
        type: 'openAI',
        label: 'OpenAI_Basic',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const openai_basic_llm = new OpenAI({');
    });

    it('should return correct dependencies', () => {
      const mockNode: IRNode = {
        id: 'openai-3',
        type: 'openAI',
        label: 'OpenAI_Test',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/openai');
      expect(dependencies).toContain('@langchain/core');
    });

    it('should validate node type correctly', () => {
      const validNode: IRNode = {
        id: 'openai-4',
        type: 'openAI',
        label: 'OpenAI_Valid',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const invalidNode: IRNode = {
        id: 'invalid-1',
        type: 'invalidType',
        label: 'Invalid_Node',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      expect(converter.canConvert(validNode)).toBe(true);
      expect(converter.canConvert(invalidNode)).toBe(false);
    });

    it('should handle API key parameter', () => {
      const mockNode: IRNode = {
        id: 'openai-5',
        type: 'openAI',
        label: 'OpenAI_With_Key',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'apiKey',
            value: 'sk-test-key',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('openAIApiKey: "sk-test-key"');
    });
  });

  describe('ChatOpenAI Converter', () => {
    const converter = new ChatOpenAIConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(ChatOpenAIConverter);
      expect(converter.flowiseType).toBe('chatOpenAI');
      expect(converter.category).toBe('llm');
    });

    it('should convert ChatOpenAI node with streaming', () => {
      const mockNode: IRNode = {
        id: 'chatopenai-1',
        type: 'chatOpenAI',
        label: 'ChatOpenAI_Model',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'modelName',
            value: 'gpt-4',
            type: 'string'
          },
          {
            name: 'temperature',
            value: 0.3,
            type: 'number'
          },
          {
            name: 'streaming',
            value: true,
            type: 'boolean'
          },
          {
            name: 'maxTokens',
            value: 2000,
            type: 'number'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { ChatOpenAI } from \'@langchain/openai\';');
      expect(result[1].content).toContain('const chatopenai_model_llm = new ChatOpenAI({');
      expect(result[1].content).toContain('modelName: "gpt-4"');
      expect(result[1].content).toContain('temperature: 0.3');
      expect(result[1].content).toContain('streaming: true');
      expect(result[1].content).toContain('maxTokens: 2000');
    });

    it('should handle ChatOpenAI-specific parameters', () => {
      const mockNode: IRNode = {
        id: 'chatopenai-2',
        type: 'chatOpenAI',
        label: 'ChatOpenAI_Advanced',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'topP',
            value: 0.9,
            type: 'number'
          },
          {
            name: 'frequencyPenalty',
            value: 0.5,
            type: 'number'
          },
          {
            name: 'presencePenalty',
            value: 0.2,
            type: 'number'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('topP: 0.9');
      expect(result[1].content).toContain('frequencyPenalty: 0.5');
      expect(result[1].content).toContain('presencePenalty: 0.2');
    });
  });

  describe('Anthropic Converter', () => {
    const converter = new AnthropicConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(AnthropicConverter);
      expect(converter.flowiseType).toBe('anthropic');
      expect(converter.category).toBe('llm');
    });

    it('should convert Anthropic node correctly', () => {
      const mockNode: IRNode = {
        id: 'anthropic-1',
        type: 'anthropic',
        label: 'Anthropic_Model',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'modelName',
            value: 'claude-3-sonnet-20240229',
            type: 'string'
          },
          {
            name: 'temperature',
            value: 0.5,
            type: 'number'
          },
          {
            name: 'maxTokens',
            value: 1000,
            type: 'number'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { ChatAnthropic } from \'@langchain/anthropic\';');
      expect(result[1].content).toContain('const anthropic_model_llm = new ChatAnthropic({');
      expect(result[1].content).toContain('model: "claude-3-sonnet-20240229"');
      expect(result[1].content).toContain('temperature: 0.5');
      expect(result[1].content).toContain('maxTokens: 1000');
    });

    it('should return correct dependencies', () => {
      const mockNode: IRNode = {
        id: 'anthropic-2',
        type: 'anthropic',
        label: 'Anthropic_Test',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/anthropic');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('Azure OpenAI Converter', () => {
    const converter = new AzureOpenAIConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(AzureOpenAIConverter);
      expect(converter.flowiseType).toBe('azureOpenAI');
      expect(converter.category).toBe('llm');
    });

    it('should convert Azure OpenAI node with specific parameters', () => {
      const mockNode: IRNode = {
        id: 'azure-1',
        type: 'azureOpenAI',
        label: 'Azure_OpenAI_Model',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'azureOpenAIApiKey',
            value: 'azure-key-123',
            type: 'string'
          },
          {
            name: 'azureOpenAIApiInstanceName',
            value: 'my-azure-instance',
            type: 'string'
          },
          {
            name: 'azureOpenAIApiDeploymentName',
            value: 'gpt-35-turbo',
            type: 'string'
          },
          {
            name: 'azureOpenAIApiVersion',
            value: '2023-05-15',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { AzureOpenAI } from \'@langchain/openai\';');
      expect(result[1].content).toContain('const azure_openai_model_llm = new AzureOpenAI({');
      expect(result[1].content).toContain('azureOpenAIApiKey: "azure-key-123"');
      expect(result[1].content).toContain('azureOpenAIApiInstanceName: "my-azure-instance"');
      expect(result[1].content).toContain('azureOpenAIApiDeploymentName: "gpt-35-turbo"');
      expect(result[1].content).toContain('azureOpenAIApiVersion: "2023-05-15"');
    });
  });

  describe('Ollama Converter', () => {
    const converter = new OllamaConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(OllamaConverter);
      expect(converter.flowiseType).toBe('ollama');
      expect(converter.category).toBe('llm');
    });

    it('should convert Ollama node correctly', () => {
      const mockNode: IRNode = {
        id: 'ollama-1',
        type: 'ollama',
        label: 'Ollama_Model',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'modelName',
            value: 'llama2:7b',
            type: 'string'
          },
          {
            name: 'baseUrl',
            value: 'http://localhost:11434',
            type: 'string'
          },
          {
            name: 'temperature',
            value: 0.8,
            type: 'number'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { Ollama } from \'@langchain/community/llms/ollama\';');
      expect(result[1].content).toContain('const ollama_model_llm = new Ollama({');
      expect(result[1].content).toContain('model: "llama2:7b"');
      expect(result[1].content).toContain('baseUrl: "http://localhost:11434"');
      expect(result[1].content).toContain('temperature: 0.8');
    });

    it('should return correct dependencies', () => {
      const mockNode: IRNode = {
        id: 'ollama-2',
        type: 'ollama',
        label: 'Ollama_Test',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('HuggingFace Converter', () => {
    const converter = new HuggingFaceConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(HuggingFaceConverter);
      expect(converter.flowiseType).toBe('huggingFace');
      expect(converter.category).toBe('llm');
    });

    it('should convert HuggingFace node correctly', () => {
      const mockNode: IRNode = {
        id: 'hf-1',
        type: 'huggingFace',
        label: 'HuggingFace_Model',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'modelName',
            value: 'microsoft/DialoGPT-large',
            type: 'string'
          },
          {
            name: 'huggingFaceApiKey',
            value: 'hf_token_123',
            type: 'string'
          },
          {
            name: 'temperature',
            value: 0.6,
            type: 'number'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { HuggingFaceInference } from \'@langchain/community/llms/hf\';');
      expect(result[1].content).toContain('const huggingface_model_llm = new HuggingFaceInference({');
      expect(result[1].content).toContain('model: "microsoft/DialoGPT-large"');
      expect(result[1].content).toContain('apiKey: "hf_token_123"');
      expect(result[1].content).toContain('temperature: 0.6');
    });

    it('should return correct dependencies', () => {
      const mockNode: IRNode = {
        id: 'hf-2',
        type: 'huggingFace',
        label: 'HuggingFace_Test',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('Cohere Converter', () => {
    const converter = new CohereConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(CohereConverter);
      expect(converter.flowiseType).toBe('cohere');
      expect(converter.category).toBe('llm');
    });

    it('should convert Cohere node correctly', () => {
      const mockNode: IRNode = {
        id: 'cohere-1',
        type: 'cohere',
        label: 'Cohere_Model',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'model',
            value: 'command',
            type: 'string'
          },
          {
            name: 'cohereApiKey',
            value: 'cohere-key-123',
            type: 'string'
          },
          {
            name: 'temperature',
            value: 0.4,
            type: 'number'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { Cohere } from \'@langchain/cohere\';');
      expect(result[1].content).toContain('const cohere_model_llm = new Cohere({');
      expect(result[1].content).toContain('model: "command"');
      expect(result[1].content).toContain('apiKey: "cohere-key-123"');
      expect(result[1].content).toContain('temperature: 0.4');
    });

    it('should return correct dependencies', () => {
      const mockNode: IRNode = {
        id: 'cohere-2',
        type: 'cohere',
        label: 'Cohere_Test',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/cohere');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('Replicate Converter', () => {
    const converter = new ReplicateConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(ReplicateConverter);
      expect(converter.flowiseType).toBe('replicate');
      expect(converter.category).toBe('llm');
    });

    it('should convert Replicate node correctly', () => {
      const mockNode: IRNode = {
        id: 'replicate-1',
        type: 'replicate',
        label: 'Replicate_Model',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'model',
            value: 'replicate/llama-2-70b-chat:latest',
            type: 'string'
          },
          {
            name: 'replicateApiKey',
            value: 'r8_token_123',
            type: 'string'
          },
          {
            name: 'temperature',
            value: 0.75,
            type: 'number'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { Replicate } from \'@langchain/community/llms/replicate\';');
      expect(result[1].content).toContain('const replicate_model_llm = new Replicate({');
      expect(result[1].content).toContain('model: "replicate/llama-2-70b-chat:latest"');
      expect(result[1].content).toContain('apiKey: "r8_token_123"');
      expect(result[1].content).toContain('temperature: 0.75');
    });

    it('should return correct dependencies', () => {
      const mockNode: IRNode = {
        id: 'replicate-2',
        type: 'replicate',
        label: 'Replicate_Test',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle nodes with null/undefined parameters', () => {
      const converter = new OpenAIConverter();
      const mockNode: IRNode = {
        id: 'edge-1',
        type: 'openAI',
        label: 'Edge_Case_Node',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'temperature',
            value: null,
            type: 'number'
          },
          {
            name: 'modelName',
            value: undefined,
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const edge_case_node_llm = new OpenAI({');
      // Should not contain null/undefined values
      expect(result[1].content).not.toContain('temperature: null');
      expect(result[1].content).not.toContain('modelName: undefined');
    });

    it('should handle empty parameter arrays', () => {
      const converter = new ChatOpenAIConverter();
      const mockNode: IRNode = {
        id: 'edge-2',
        type: 'chatOpenAI',
        label: 'Empty_Params_Node',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const empty_params_node_llm = new ChatOpenAI({');
    });

    it('should handle special characters in node labels', () => {
      const converter = new OpenAIConverter();
      const mockNode: IRNode = {
        id: 'edge-3',
        type: 'openAI',
        label: 'Special-Chars!@#$%^&*()_+{}[]|\\:";\'<>?,./',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      // Should generate a valid variable name
      expect(result[1].content).toMatch(/const special_chars_llm = new OpenAI\({/);
    });

    it('should handle very long parameter values', () => {
      const converter = new OpenAIConverter();
      const longApiKey = 'sk-' + 'a'.repeat(1000);
      const mockNode: IRNode = {
        id: 'edge-4',
        type: 'openAI',
        label: 'Long_Value_Node',
        category: 'llm',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'apiKey',
            value: longApiKey,
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain(`openAIApiKey: "${longApiKey}"`);
    });
  });

  describe('Performance and Memory Tests', () => {
    it('should handle multiple converter instances efficiently', () => {
      const converters = [
        new OpenAIConverter(),
        new ChatOpenAIConverter(),
        new AnthropicConverter(),
        new AzureOpenAIConverter(),
        new OllamaConverter(),
        new HuggingFaceConverter(),
        new CohereConverter(),
        new ReplicateConverter()
      ];

      expect(converters).toHaveLength(8);
      converters.forEach((converter, index) => {
        expect(converter.category).toBe('llm');
        expect(typeof converter.flowiseType).toBe('string');
        expect(converter.flowiseType.length).toBeGreaterThan(0);
      });
    });

    it('should efficiently convert large numbers of nodes', () => {
      const converter = new OpenAIConverter();
      const startTime = Date.now();
      
      // Convert 100 nodes
      for (let i = 0; i < 100; i++) {
        const mockNode: IRNode = {
          id: `perf-test-${i}`,
          type: 'openAI',
          label: `Performance_Test_Node_${i}`,
          category: 'llm',
          inputs: [],
          outputs: [],
          parameters: [
            {
              name: 'temperature',
              value: Math.random(),
              type: 'number'
            }
          ],
          position: { x: i * 10, y: i * 10 }
        };

        const result = converter.convert(mockNode, mockContext);
        expect(result).toHaveLength(2);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time (less than 1 second)
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Integration with Registry', () => {
    it('should be properly integrated with converter registry', () => {
      const converters = [
        new OpenAIConverter(),
        new ChatOpenAIConverter(),
        new AnthropicConverter(),
        new AzureOpenAIConverter(),
        new OllamaConverter(),
        new HuggingFaceConverter(),
        new CohereConverter(),
        new ReplicateConverter()
      ];

      converters.forEach(converter => {
        expect(converter.getSupportedVersions()).toContain('*');
        expect(converter.isDeprecated()).toBe(false);
        expect(converter.getReplacementType()).toBeUndefined();
      });
    });
  });
});