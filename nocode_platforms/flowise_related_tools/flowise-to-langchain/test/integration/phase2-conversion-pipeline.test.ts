/**
 * Phase 2 Conversion Pipeline Integration Tests
 * 
 * These tests verify that the complete conversion pipeline works for Phase 2 components
 * including DuckDuckGo search, Zep memory, output fixing parsers, and document loaders.
 */

import { FlowtypeLangchainConverter } from '../../src/index.js';
import { IRNode, IRConnection } from '../../src/ir/types.js';

describe('Phase 2 Conversion Pipeline Integration', () => {
  let converter: FlowtypeLangchainConverter;

  beforeEach(() => {
    converter = new FlowtypeLangchainConverter();
  });

  describe('DuckDuckGo Search Integration', () => {
    it('should convert agent flow with DuckDuckGo search tool', async () => {
      const flow = {
        nodes: [
          {
            id: 'chatOpenAI_0',
            type: 'chatOpenAI',
            label: 'ChatOpenAI',
            category: 'llm',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'modelName', value: 'gpt-3.5-turbo', type: 'string' },
              { name: 'temperature', value: 0.7, type: 'number' }
            ],
            position: { x: 100, y: 100 }
          },
          {
            id: 'duckDuckGoSearch_0',
            type: 'duckDuckGoSearch',
            label: 'DuckDuckGo Search',
            category: 'tool',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'maxResults', value: 5, type: 'number' },
              { name: 'timeout', value: 30000, type: 'number' }
            ],
            position: { x: 300, y: 100 }
          },
          {
            id: 'conversationalAgent_0',
            type: 'conversationalAgent',
            label: 'Conversational Agent',
            category: 'agent',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'systemMessage', value: 'You are a helpful AI assistant.', type: 'string' }
            ],
            position: { x: 500, y: 100 }
          }
        ],
        edges: [
          {
            id: 'edge1',
            source: 'chatOpenAI_0',
            target: 'conversationalAgent_0',
            sourceHandle: 'chatOpenAI_0-output-chatOpenAI',
            targetHandle: 'conversationalAgent_0-input-model'
          },
          {
            id: 'edge2',
            source: 'duckDuckGoSearch_0',
            target: 'conversationalAgent_0',
            sourceHandle: 'duckDuckGoSearch_0-output-duckDuckGoSearch',
            targetHandle: 'conversationalAgent_0-input-tools'
          }
        ]
      };

      const result = await converter.convert(flow);
      
      expect(result).toBeDefined();
      expect(result.files).toHaveLength(1);
      expect(result.files[0].content).toContain('DuckDuckGoSearch');
      expect(result.files[0].content).toContain('ChatOpenAI');
      expect(result.files[0].content).toContain('ConversationalAgent');
      expect(result.files[0].content).toContain('maxResults: 5');
    });
  });

  describe('Zep Memory Integration', () => {
    it('should convert chat flow with Zep memory', async () => {
      const flow = {
        nodes: [
          {
            id: 'chatOpenAI_0',
            type: 'chatOpenAI',
            label: 'ChatOpenAI',
            category: 'llm',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'modelName', value: 'gpt-3.5-turbo', type: 'string' }
            ],
            position: { x: 100, y: 100 }
          },
          {
            id: 'zepMemory_0',
            type: 'zepMemory',
            label: 'Zep Memory',
            category: 'memory',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'baseURL', value: 'http://localhost:8000', type: 'string' },
              { name: 'sessionId', value: 'test-session', type: 'string' },
              { name: 'memoryType', value: 'perpetual', type: 'string' },
              { name: 'apiKey', value: '{{ZEP_API_KEY}}', type: 'string' }
            ],
            position: { x: 300, y: 100 }
          },
          {
            id: 'conversationChain_0',
            type: 'conversationChain',
            label: 'Conversation Chain',
            category: 'chain',
            inputs: [],
            outputs: [],
            parameters: [],
            position: { x: 500, y: 100 }
          }
        ],
        edges: [
          {
            id: 'edge1',
            source: 'chatOpenAI_0',
            target: 'conversationChain_0',
            sourceHandle: 'chatOpenAI_0-output-chatOpenAI',
            targetHandle: 'conversationChain_0-input-model'
          },
          {
            id: 'edge2',
            source: 'zepMemory_0',
            target: 'conversationChain_0',
            sourceHandle: 'zepMemory_0-output-zepMemory',
            targetHandle: 'conversationChain_0-input-memory'
          }
        ]
      };

      const result = await converter.convert(flow);
      
      expect(result).toBeDefined();
      expect(result.files).toHaveLength(1);
      expect(result.files[0].content).toContain('ZepMemory');
      expect(result.files[0].content).toContain('baseURL: "http://localhost:8000"');
      expect(result.files[0].content).toContain('sessionId: "test-session"');
      expect(result.files[0].content).toContain('memoryType: "perpetual"');
    });
  });

  describe('Document Loader Integration', () => {
    it('should convert RAG flow with Excel and PDF loaders', async () => {
      const flow = {
        nodes: [
          {
            id: 'excelFile_0',
            type: 'excelFile',
            label: 'Excel File',
            category: 'loader',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'filePath', value: './data/sales.xlsx', type: 'string' },
              { name: 'sheetName', value: 'Sheet1', type: 'string' },
              { name: 'headerRow', value: 1, type: 'number' }
            ],
            position: { x: 100, y: 100 }
          },
          {
            id: 'pdfFile_0',
            type: 'pdfFile',
            label: 'PDF File',
            category: 'loader',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'filePath', value: './docs/manual.pdf', type: 'string' },
              { name: 'splitPages', value: true, type: 'boolean' }
            ],
            position: { x: 300, y: 100 }
          },
          {
            id: 'openAIEmbeddings_0',
            type: 'openAIEmbeddings',
            label: 'OpenAI Embeddings',
            category: 'embedding',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'modelName', value: 'text-embedding-ada-002', type: 'string' }
            ],
            position: { x: 500, y: 100 }
          }
        ],
        edges: []
      };

      const result = await converter.convert(flow);
      
      expect(result).toBeDefined();
      expect(result.files).toHaveLength(1);
      expect(result.files[0].content).toContain('ExcelLoader');
      expect(result.files[0].content).toContain('PDFLoader');
      expect(result.files[0].content).toContain('./data/sales.xlsx');
      expect(result.files[0].content).toContain('./docs/manual.pdf');
      expect(result.files[0].content).toContain('sheetName: "Sheet1"');
    });
  });

  describe('Output Fixing Parser Integration', () => {
    it('should convert flow with output fixing parser', async () => {
      const flow = {
        nodes: [
          {
            id: 'chatOpenAI_0',
            type: 'chatOpenAI',
            label: 'ChatOpenAI',
            category: 'llm',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'modelName', value: 'gpt-3.5-turbo', type: 'string' }
            ],
            position: { x: 100, y: 100 }
          },
          {
            id: 'structuredOutputParser_0',
            type: 'structuredOutputParser',
            label: 'Structured Output Parser',
            category: 'output-parser',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'schema', value: '{"name": "string", "age": "number"}', type: 'json' }
            ],
            position: { x: 300, y: 100 }
          },
          {
            id: 'outputFixingParser_0',
            type: 'outputFixingParser',
            label: 'Output Fixing Parser',
            category: 'output-parser',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'maxRetries', value: 3, type: 'number' },
              { name: 'includeRaw', value: false, type: 'boolean' }
            ],
            position: { x: 500, y: 100 }
          }
        ],
        edges: [
          {
            id: 'edge1',
            source: 'chatOpenAI_0',
            target: 'outputFixingParser_0',
            sourceHandle: 'chatOpenAI_0-output-chatOpenAI',
            targetHandle: 'outputFixingParser_0-input-llm'
          },
          {
            id: 'edge2',
            source: 'structuredOutputParser_0',
            target: 'outputFixingParser_0',
            sourceHandle: 'structuredOutputParser_0-output-structuredOutputParser',
            targetHandle: 'outputFixingParser_0-input-baseParser'
          }
        ]
      };

      const result = await converter.convert(flow);
      
      expect(result).toBeDefined();
      expect(result.files).toHaveLength(1);
      expect(result.files[0].content).toContain('OutputFixingParser');
      expect(result.files[0].content).toContain('maxRetries: 3');
      expect(result.files[0].content).toContain('includeRaw: false');
    });
  });

  describe('Complex Multi-Component Flow', () => {
    it('should convert complete agent flow with all Phase 2 components', async () => {
      const flow = {
        nodes: [
          {
            id: 'chatOpenAI_0',
            type: 'chatOpenAI',
            label: 'ChatOpenAI',
            category: 'llm',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'modelName', value: 'gpt-4', type: 'string' },
              { name: 'temperature', value: 0.3, type: 'number' }
            ],
            position: { x: 100, y: 100 }
          },
          {
            id: 'zepMemory_0',
            type: 'zepMemory',
            label: 'Zep Memory',
            category: 'memory',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'baseURL', value: 'http://localhost:8000', type: 'string' },
              { name: 'sessionId', value: 'complex-session', type: 'string' }
            ],
            position: { x: 200, y: 200 }
          },
          {
            id: 'duckDuckGoSearch_0',
            type: 'duckDuckGoSearch',
            label: 'DuckDuckGo Search',
            category: 'tool',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'maxResults', value: 3, type: 'number' }
            ],
            position: { x: 300, y: 300 }
          },
          {
            id: 'excelFile_0',
            type: 'excelFile',
            label: 'Excel Knowledge Base',
            category: 'loader',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'filePath', value: './knowledge.xlsx', type: 'string' }
            ],
            position: { x: 400, y: 400 }
          },
          {
            id: 'conversationalAgent_0',
            type: 'conversationalAgent',
            label: 'Main Agent',
            category: 'agent',
            inputs: [],
            outputs: [],
            parameters: [
              { name: 'systemMessage', value: 'You are a knowledgeable AI assistant.', type: 'string' }
            ],
            position: { x: 500, y: 250 }
          }
        ],
        edges: [
          {
            id: 'edge1',
            source: 'chatOpenAI_0',
            target: 'conversationalAgent_0',
            sourceHandle: 'chatOpenAI_0-output-chatOpenAI',
            targetHandle: 'conversationalAgent_0-input-model'
          },
          {
            id: 'edge2',
            source: 'zepMemory_0',
            target: 'conversationalAgent_0',
            sourceHandle: 'zepMemory_0-output-zepMemory',
            targetHandle: 'conversationalAgent_0-input-memory'
          },
          {
            id: 'edge3',
            source: 'duckDuckGoSearch_0',
            target: 'conversationalAgent_0',
            sourceHandle: 'duckDuckGoSearch_0-output-duckDuckGoSearch',
            targetHandle: 'conversationalAgent_0-input-tools'
          }
        ]
      };

      const result = await converter.convert(flow);
      
      expect(result).toBeDefined();
      expect(result.files).toHaveLength(1);
      
      const generatedCode = result.files[0].content;
      
      // Verify all components are included
      expect(generatedCode).toContain('ChatOpenAI');
      expect(generatedCode).toContain('ZepMemory');
      expect(generatedCode).toContain('DuckDuckGoSearch');
      expect(generatedCode).toContain('ExcelLoader');
      expect(generatedCode).toContain('ConversationalAgent');
      
      // Verify configuration parameters
      expect(generatedCode).toContain('modelName: "gpt-4"');
      expect(generatedCode).toContain('temperature: 0.3');
      expect(generatedCode).toContain('baseURL: "http://localhost:8000"');
      expect(generatedCode).toContain('sessionId: "complex-session"');
      expect(generatedCode).toContain('maxResults: 3');
      expect(generatedCode).toContain('./knowledge.xlsx');
      
      // Verify imports
      expect(generatedCode).toContain('from "langchain/chat_models/openai"');
      expect(generatedCode).toContain('from "@langchain/community/memory/zep"');
      expect(generatedCode).toContain('from "@langchain/community/tools/duckduckgo_search"');
      expect(generatedCode).toContain('from "langchain/document_loaders/fs/excel"');
      
      console.log('Generated complex flow code:', generatedCode);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle missing parameters gracefully', async () => {
      const flow = {
        nodes: [
          {
            id: 'duckDuckGoSearch_0',
            type: 'duckDuckGoSearch',
            label: 'DuckDuckGo Search',
            category: 'tool',
            inputs: [],
            outputs: [],
            parameters: [], // No parameters provided
            position: { x: 100, y: 100 }
          }
        ],
        edges: []
      };

      const result = await converter.convert(flow);
      
      expect(result).toBeDefined();
      expect(result.files).toHaveLength(1);
      expect(result.files[0].content).toContain('DuckDuckGoSearch');
      // Should use default configuration
      expect(result.files[0].content).toContain('new DuckDuckGoSearch()');
    });

    it('should handle malformed node structure', async () => {
      const flow = {
        nodes: [
          {
            id: 'invalid_node',
            type: 'unknownType',
            label: 'Invalid Node',
            category: 'unknown',
            inputs: [],
            outputs: [],
            parameters: [],
            position: { x: 100, y: 100 }
          }
        ],
        edges: []
      };

      // Should not throw an error but may skip unsupported nodes
      const result = await converter.convert(flow);
      expect(result).toBeDefined();
    });
  });

  describe('Performance with Phase 2 Components', () => {
    it('should handle bulk conversion efficiently', async () => {
      const startTime = Date.now();
      
      const promises = Array.from({ length: 10 }, async (_, i) => {
        const flow = {
          nodes: [
            {
              id: `duckDuckGoSearch_${i}`,
              type: 'duckDuckGoSearch',
              label: `Search ${i}`,
              category: 'tool',
              inputs: [],
              outputs: [],
              parameters: [
                { name: 'maxResults', value: i + 1, type: 'number' }
              ],
              position: { x: 100, y: 100 }
            }
          ],
          edges: []
        };
        
        return converter.convert(flow);
      });

      const results = await Promise.all(promises);
      const endTime = Date.now();
      
      expect(results).toHaveLength(10);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
      
      // Verify each result is unique
      results.forEach((result, i) => {
        expect(result.files[0].content).toContain(`maxResults: ${i + 1}`);
      });
    });
  });
});