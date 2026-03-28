/**
 * Comprehensive tests for Chain converters
 */

import {
  LLMChainConverter,
  ConversationChainConverter,
  RetrievalQAChainConverter,
  MultiPromptChainConverter,
  SequentialChainConverter,
  TransformChainConverter,
  MapReduceChainConverter,
} from '../../src/registry/converters/chain.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('Chain Converters', () => {
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

  describe('LLMChain Converter', () => {
    const converter = new LLMChainConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(LLMChainConverter);
      expect(converter.flowiseType).toBe('llmChain');
      expect(converter.category).toBe('chain');
    });

    it('should convert basic LLMChain node', () => {
      const mockNode: IRNode = {
        id: 'llmchain-1',
        type: 'llmChain',
        label: 'LLM_Chain',
        category: 'chain',
        inputs: [
          {
            id: 'llm-input-1',
            label: 'llm',
            type: 'target',
            dataType: 'llm',
            optional: false
          },
          {
            id: 'prompt-input-1',
            label: 'prompt',
            type: 'target',
            dataType: 'prompt',
            optional: false
          }
        ],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'chain',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'chainName',
            value: 'testChain',
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('import');
      expect(result[0].content).toContain('import { LLMChain } from \'@langchain/core/chains\';');
      expect(result[1].type).toBe('declaration');
      expect(result[1].content).toContain('const llm_chain_chain = new LLMChain({');
      expect(result[1].content).toContain('llm:');
      expect(result[1].content).toContain('prompt:');
    });

    it('should handle missing inputs gracefully', () => {
      const mockNode: IRNode = {
        id: 'llmchain-2',
        type: 'llmChain',
        label: 'LLM_Chain_Basic',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const llm_chain_basic_chain = new LLMChain({');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/core');
    });

    it('should validate node type correctly', () => {
      const validNode: IRNode = {
        id: 'llmchain-3',
        type: 'llmChain',
        label: 'Valid_Chain',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const invalidNode: IRNode = {
        id: 'invalid-1',
        type: 'invalidType',
        label: 'Invalid_Node',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      expect(converter.canConvert(validNode)).toBe(true);
      expect(converter.canConvert(invalidNode)).toBe(false);
    });
  });

  describe('ConversationChain Converter', () => {
    const converter = new ConversationChainConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(ConversationChainConverter);
      expect(converter.flowiseType).toBe('conversationChain');
      expect(converter.category).toBe('chain');
    });

    it('should convert ConversationChain node with memory', () => {
      const mockNode: IRNode = {
        id: 'convchain-1',
        type: 'conversationChain',
        label: 'Conversation_Chain',
        category: 'chain',
        inputs: [
          {
            id: 'llm-input-1',
            label: 'llm',
            type: 'target',
            dataType: 'llm',
            optional: false
          },
          {
            id: 'memory-input-1',
            label: 'memory',
            type: 'target',
            dataType: 'memory',
            optional: true
          }
        ],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'chain',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'verbose',
            value: true,
            type: 'boolean'
          }
        ],
        position: { x: 200, y: 200 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { ConversationChain } from \'@langchain/core/chains\';');
      expect(result[1].content).toContain('const conversation_chain_chain = new ConversationChain({');
      expect(result[1].content).toContain('llm:');
      expect(result[1].content).toContain('memory:');
      expect(result[1].content).toContain('verbose: true');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('RetrievalQAChain Converter', () => {
    const converter = new RetrievalQAChainConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(RetrievalQAChainConverter);
      expect(converter.flowiseType).toBe('retrievalQAChain');
      expect(converter.category).toBe('chain');
    });

    it('should convert RetrievalQAChain node with retriever', () => {
      const mockNode: IRNode = {
        id: 'qachain-1',
        type: 'retrievalQAChain',
        label: 'QA_Chain',
        category: 'chain',
        inputs: [
          {
            id: 'llm-input-1',
            label: 'llm',
            type: 'target',
            dataType: 'llm',
            optional: false
          },
          {
            id: 'retriever-input-1',
            label: 'retriever',
            type: 'target',
            dataType: 'retriever',
            optional: false
          }
        ],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'chain',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'chainType',
            value: 'stuff',
            type: 'string'
          },
          {
            name: 'returnSourceDocuments',
            value: true,
            type: 'boolean'
          }
        ],
        position: { x: 300, y: 300 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { RetrievalQAChain } from \'@langchain/core/chains\';');
      expect(result[1].content).toContain('const qa_chain_chain = new RetrievalQAChain({');
      expect(result[1].content).toContain('llm:');
      expect(result[1].content).toContain('retriever:');
      expect(result[1].content).toContain('chainType: "stuff"');
      expect(result[1].content).toContain('returnSourceDocuments: true');
    });

    it('should handle different chain types', () => {
      const mockNode: IRNode = {
        id: 'qachain-2',
        type: 'retrievalQAChain',
        label: 'QA_Chain_MapReduce',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'chainType',
            value: 'map_reduce',
            type: 'string'
          }
        ],
        position: { x: 300, y: 300 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('chainType: "map_reduce"');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('MultiPromptChain Converter', () => {
    const converter = new MultiPromptChainConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(MultiPromptChainConverter);
      expect(converter.flowiseType).toBe('multiPromptChain');
      expect(converter.category).toBe('chain');
    });

    it('should convert MultiPromptChain node', () => {
      const mockNode: IRNode = {
        id: 'multichain-1',
        type: 'multiPromptChain',
        label: 'Multi_Prompt_Chain',
        category: 'chain',
        inputs: [
          {
            id: 'llm-input-1',
            label: 'llm',
            type: 'target',
            dataType: 'llm',
            optional: false
          }
        ],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'chain',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'destinationChains',
            value: { prompt1: 'chain1', prompt2: 'chain2' },
            type: 'object'
          },
          {
            name: 'verbose',
            value: true,
            type: 'boolean'
          }
        ],
        position: { x: 400, y: 400 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { MultiPromptChain } from \'@langchain/core/chains\';');
      expect(result[1].content).toContain('const multi_prompt_chain_chain = new MultiPromptChain({');
      expect(result[1].content).toContain('llm:');
      expect(result[1].content).toContain('destinationChains:');
      expect(result[1].content).toContain('verbose: true');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('SequentialChain Converter', () => {
    const converter = new SequentialChainConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(SequentialChainConverter);
      expect(converter.flowiseType).toBe('sequentialChain');
      expect(converter.category).toBe('chain');
    });

    it('should convert SequentialChain node', () => {
      const mockNode: IRNode = {
        id: 'seqchain-1',
        type: 'sequentialChain',
        label: 'Sequential_Chain',
        category: 'chain',
        inputs: [
          {
            id: 'chains-input-1',
            label: 'chains',
            type: 'target',
            dataType: 'chain',
            optional: false
          }
        ],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'chain',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'inputVariables',
            value: ['input1', 'input2'],
            type: 'array'
          },
          {
            name: 'outputVariables',
            value: ['output1'],
            type: 'array'
          },
          {
            name: 'verbose',
            value: true,
            type: 'boolean'
          }
        ],
        position: { x: 500, y: 500 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { SequentialChain } from \'@langchain/core/chains\';');
      expect(result[1].content).toContain('const sequential_chain_chain = new SequentialChain({');
      expect(result[1].content).toContain('chains:');
      expect(result[1].content).toContain('verbose: true');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('TransformChain Converter', () => {
    const converter = new TransformChainConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(TransformChainConverter);
      expect(converter.flowiseType).toBe('transformChain');
      expect(converter.category).toBe('chain');
    });

    it('should convert TransformChain node', () => {
      const mockNode: IRNode = {
        id: 'transformchain-1',
        type: 'transformChain',
        label: 'Transform_Chain',
        category: 'chain',
        inputs: [],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'chain',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'inputVariables',
            value: ['input'],
            type: 'array'
          },
          {
            name: 'outputVariables',
            value: ['output'],
            type: 'array'
          },
          {
            name: 'transform',
            value: 'return { output: input.toUpperCase() }',
            type: 'string'
          }
        ],
        position: { x: 600, y: 600 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { TransformChain } from \'@langchain/core/chains\';');
      expect(result[1].content).toContain('const transform_chain_chain = new TransformChain({');
      expect(result[1].content).toContain('inputVariables:');
      expect(result[1].content).toContain('outputVariables:');
      expect(result[1].content).toContain('transform:');
    });

    it('should handle custom transform functions', () => {
      const mockNode: IRNode = {
        id: 'transformchain-2',
        type: 'transformChain',
        label: 'Custom_Transform',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'transform',
            value: 'return { result: input.text.toLowerCase() }',
            type: 'string'
          }
        ],
        position: { x: 600, y: 600 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result[1].content).toContain('return { result: input.text.toLowerCase() }');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('MapReduceChain Converter', () => {
    const converter = new MapReduceChainConverter();
    
    it('should be instantiable', () => {
      expect(converter).toBeInstanceOf(MapReduceChainConverter);
      expect(converter.flowiseType).toBe('mapReduceChain');
      expect(converter.category).toBe('chain');
    });

    it('should convert MapReduceChain node', () => {
      const mockNode: IRNode = {
        id: 'mapreduce-1',
        type: 'mapReduceChain',
        label: 'MapReduce_Chain',
        category: 'chain',
        inputs: [
          {
            id: 'llm-input-1',
            label: 'llm',
            type: 'target',
            dataType: 'llm',
            optional: false
          },
          {
            id: 'map-chain-input-1',
            label: 'mapChain',
            type: 'target',
            dataType: 'chain',
            optional: false
          },
          {
            id: 'reduce-chain-input-1',
            label: 'reduceChain',
            type: 'target',
            dataType: 'chain',
            optional: false
          }
        ],
        outputs: [
          {
            id: 'output-1',
            label: 'output',
            type: 'source',
            dataType: 'chain',
            optional: true
          }
        ],
        parameters: [
          {
            name: 'verbose',
            value: true,
            type: 'boolean'
          }
        ],
        position: { x: 700, y: 700 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('import { MapReduceChain } from \'@langchain/core/chains\';');
      expect(result[1].content).toContain('const mapreduce_chain_chain = new MapReduceChain({');
      expect(result[1].content).toContain('llm:');
      expect(result[1].content).toContain('mapChain:');
      expect(result[1].content).toContain('reduceChain:');
      expect(result[1].content).toContain('inputKey: "input"');
      expect(result[1].content).toContain('verbose: true');
    });

    it('should return correct dependencies', () => {
      const dependencies = converter.getDependencies();
      
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/core');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle chains with missing required inputs', () => {
      const converter = new LLMChainConverter();
      const mockNode: IRNode = {
        id: 'edge-1',
        type: 'llmChain',
        label: 'Edge_Case_Chain',
        category: 'chain',
        inputs: [], // Missing required inputs
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const edge_case_chain_chain = new LLMChain({');
    });

    it('should handle chains with null/undefined parameters', () => {
      const converter = new ConversationChainConverter();
      const mockNode: IRNode = {
        id: 'edge-2',
        type: 'conversationChain',
        label: 'Null_Params_Chain',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'verbose',
            value: null,
            type: 'boolean'
          },
          {
            name: 'chainName',
            value: undefined,
            type: 'string'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const null_params_chain_chain = new ConversationChain({');
      // Should not contain null/undefined values
      expect(result[1].content).not.toContain('verbose: null');
      expect(result[1].content).not.toContain('chainName: undefined');
    });

    it('should handle chains with complex array parameters', () => {
      const converter = new MultiPromptChainConverter();
      const mockNode: IRNode = {
        id: 'edge-3',
        type: 'multiPromptChain',
        label: 'Complex_Array_Chain',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [
          {
            name: 'destinationChains',
            value: { 
              'prompt with spaces': 'chain1',
              'prompt-with-dashes': 'chain2',
              'prompt_with_underscores': 'chain3'
            },
            type: 'object'
          },
          {
            name: 'verbose',
            value: true,
            type: 'boolean'
          }
        ],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toContain('const complex_array_chain_chain = new MultiPromptChain({');
      // Should properly handle object keys with special characters
      expect(result[1].content).toContain('destinationChains:');
      expect(result[1].content).toContain('verbose: true');
    });

    it('should handle special characters in node labels', () => {
      const converter = new LLMChainConverter();
      const mockNode: IRNode = {
        id: 'edge-4',
        type: 'llmChain',
        label: 'Special-Chars!@#$%^&*()_+{}[]|\\:";\'<>?,./',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const result = converter.convert(mockNode, mockContext);
      
      expect(result).toHaveLength(2);
      // Should generate a valid variable name
      expect(result[1].content).toMatch(/const special_chars_\w* = new LLMChain\({/);
    });
  });

  describe('Performance and Memory Tests', () => {
    it('should handle multiple converter instances efficiently', () => {
      const converters = [
        new LLMChainConverter(),
        new ConversationChainConverter(),
        new RetrievalQAChainConverter(),
        new MultiPromptChainConverter(),
        new SequentialChainConverter(),
        new TransformChainConverter(),
        new MapReduceChainConverter()
      ];

      expect(converters).toHaveLength(7);
      converters.forEach((converter, index) => {
        expect(converter.category).toBe('chain');
        expect(typeof converter.flowiseType).toBe('string');
        expect(converter.flowiseType.length).toBeGreaterThan(0);
      });
    });

    it('should efficiently convert large numbers of chain nodes', () => {
      const converter = new LLMChainConverter();
      const startTime = Date.now();
      
      // Convert 50 chain nodes
      for (let i = 0; i < 50; i++) {
        const mockNode: IRNode = {
          id: `perf-chain-${i}`,
          type: 'llmChain',
          label: `Performance_Chain_${i}`,
          category: 'chain',
          inputs: [],
          outputs: [],
          parameters: [
            {
              name: 'chainName',
              value: `chain_${i}`,
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
      
      // Should complete within reasonable time (less than 500ms)
      expect(duration).toBeLessThan(500);
    });
  });

  describe('Integration with Registry', () => {
    it('should be properly integrated with converter registry', () => {
      const converters = [
        new LLMChainConverter(),
        new ConversationChainConverter(),
        new RetrievalQAChainConverter(),
        new MultiPromptChainConverter(),
        new SequentialChainConverter(),
        new TransformChainConverter(),
        new MapReduceChainConverter()
      ];

      converters.forEach(converter => {
        expect(converter.getSupportedVersions()).toContain('*');
        expect(converter.isDeprecated()).toBe(false);
        expect(converter.getReplacementType()).toBeUndefined();
      });
    });

    it('should handle complex chain compositions', () => {
      const llmChain = new LLMChainConverter();
      const seqChain = new SequentialChainConverter();
      
      const mockLLMNode: IRNode = {
        id: 'llm-chain-1',
        type: 'llmChain',
        label: 'LLM_Chain_1',
        category: 'chain',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 100, y: 100 }
      };

      const mockSeqNode: IRNode = {
        id: 'seq-chain-1',
        type: 'sequentialChain',
        label: 'Sequential_Chain_1',
        category: 'chain',
        inputs: [
          {
            id: 'chains-input-1',
            label: 'chains',
            type: 'target',
            dataType: 'chain',
            optional: false
          }
        ],
        outputs: [],
        parameters: [],
        position: { x: 200, y: 200 }
      };

      const llmResult = llmChain.convert(mockLLMNode, mockContext);
      const seqResult = seqChain.convert(mockSeqNode, mockContext);
      
      expect(llmResult).toHaveLength(2);
      expect(seqResult).toHaveLength(2);
      
      // Sequential chain should reference the LLM chain
      expect(seqResult[1].content).toContain('chains:');
    });
  });

  describe('Chain-specific Features', () => {
    it('should handle RetrievalQA chain types correctly', () => {
      const converter = new RetrievalQAChainConverter();
      const chainTypes = ['stuff', 'map_reduce', 'refine', 'map_rerank'];
      
      chainTypes.forEach(chainType => {
        const mockNode: IRNode = {
          id: `qa-chain-${chainType}`,
          type: 'retrievalQAChain',
          label: `QA_Chain_${chainType}`,
          category: 'chain',
          inputs: [],
          outputs: [],
          parameters: [
            {
              name: 'chainType',
              value: chainType,
              type: 'string'
            }
          ],
          position: { x: 100, y: 100 }
        };

        const result = converter.convert(mockNode, mockContext);
        expect(result[1].content).toContain(`chainType: "${chainType}"`);
      });
    });

    it('should handle TransformChain function parsing', () => {
      const converter = new TransformChainConverter();
      const transformFunctions = [
        'return { output: input.toUpperCase() }',
        'return { result: input.text.split(" ").length }',
        'return { processed: input.data.map(x => x * 2) }'
      ];
      
      transformFunctions.forEach((transformFunc, index) => {
        const mockNode: IRNode = {
          id: `transform-${index}`,
          type: 'transformChain',
          label: `Transform_${index}`,
          category: 'chain',
          inputs: [],
          outputs: [],
          parameters: [
            {
              name: 'transform',
              value: transformFunc,
              type: 'string'
            }
          ],
          position: { x: 100, y: 100 }
        };

        const result = converter.convert(mockNode, mockContext);
        expect(result[1].content).toContain(transformFunc);
      });
    });
  });
});