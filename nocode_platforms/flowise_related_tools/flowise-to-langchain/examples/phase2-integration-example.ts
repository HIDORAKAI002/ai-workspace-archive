/**
 * Phase 2 Integration Example
 * 
 * This example demonstrates how to use the Phase 2 converters to convert
 * Flowise flows with DuckDuckGo search, Zep memory, output fixing parsers,
 * and various document loaders.
 */

import { FlowtypeLangchainConverter } from '../src/index.js';
import { promises as fs } from 'fs';
import { join } from 'path';

async function convertPhase2Flow() {
  const converter = new FlowtypeLangchainConverter();

  // Example 1: Convert a flow with DuckDuckGo search tool
  console.log('Converting DuckDuckGo search flow...');
  const duckDuckGoFlow = {
    nodes: [
      {
        id: 'chatOpenAI_0',
        type: 'chatOpenAI',
        data: {
          inputs: {
            modelName: 'gpt-3.5-turbo',
            temperature: 0.7,
            openAIApiKey: '{{OPENAI_API_KEY}}'
          }
        }
      },
      {
        id: 'duckDuckGoSearch_0',
        type: 'duckDuckGoSearch',
        data: {
          inputs: {
            query: 'latest AI news',
            maxResults: 5
          }
        }
      }
    ],
    edges: []
  };

  const duckDuckGoResult = await converter.convert(duckDuckGoFlow);
  console.log('DuckDuckGo conversion result:', duckDuckGoResult.files[0].content);

  // Example 2: Convert a flow with Zep memory
  console.log('\nConverting Zep memory flow...');
  const zepMemoryFlow = {
    nodes: [
      {
        id: 'chatOpenAI_0',
        type: 'chatOpenAI',
        data: {
          inputs: {
            modelName: 'gpt-3.5-turbo',
            temperature: 0.7
          }
        }
      },
      {
        id: 'zepMemory_0',
        type: 'zepMemory',
        data: {
          inputs: {
            baseURL: 'http://localhost:8000',
            apiKey: '{{ZEP_API_KEY}}',
            sessionId: 'user123',
            memoryType: 'perpetual'
          }
        }
      }
    ],
    edges: [
      {
        source: 'chatOpenAI_0',
        target: 'zepMemory_0',
        sourceHandle: 'chatOpenAI_0-output-chatOpenAI',
        targetHandle: 'zepMemory_0-input-llm'
      }
    ]
  };

  const zepResult = await converter.convert(zepMemoryFlow);
  console.log('Zep memory conversion result:', zepResult.files[0].content);

  // Example 3: Convert a flow with output fixing parser
  console.log('\nConverting output fixing parser flow...');
  const outputFixingFlow = {
    nodes: [
      {
        id: 'chatOpenAI_0',
        type: 'chatOpenAI',
        data: {
          inputs: {
            modelName: 'gpt-3.5-turbo'
          }
        }
      },
      {
        id: 'structuredOutputParser_0',
        type: 'structuredOutputParser',
        data: {
          inputs: {
            schema: '{"name": "string", "age": "number"}'
          }
        }
      },
      {
        id: 'outputFixingParser_0',
        type: 'outputFixingParser',
        data: {
          inputs: {
            maxRetries: 3,
            includeRaw: false
          }
        }
      }
    ],
    edges: [
      {
        source: 'chatOpenAI_0',
        target: 'outputFixingParser_0',
        sourceHandle: 'chatOpenAI_0-output-chatOpenAI',
        targetHandle: 'outputFixingParser_0-input-llm'
      },
      {
        source: 'structuredOutputParser_0',
        target: 'outputFixingParser_0',
        sourceHandle: 'structuredOutputParser_0-output-structuredOutputParser',
        targetHandle: 'outputFixingParser_0-input-baseParser'
      }
    ]
  };

  const outputFixingResult = await converter.convert(outputFixingFlow);
  console.log('Output fixing parser conversion result:', outputFixingResult.files[0].content);

  // Example 4: Convert a flow with various document loaders
  console.log('\nConverting document loader flow...');
  const documentLoaderFlow = {
    nodes: [
      {
        id: 'excelFile_0',
        type: 'excelFile',
        data: {
          inputs: {
            filePath: './data/sample.xlsx',
            sheetName: 'Sheet1',
            columnToExtract: 'content'
          }
        }
      },
      {
        id: 'notionDB_0',
        type: 'notionDB',
        data: {
          inputs: {
            notionApiKey: '{{NOTION_API_KEY}}',
            databaseId: 'database123',
            queryFilter: '{"property": "Status", "select": {"equals": "Published"}}'
          }
        }
      },
      {
        id: 'notionPage_0',
        type: 'notionPage',
        data: {
          inputs: {
            notionApiKey: '{{NOTION_API_KEY}}',
            pageId: 'page456'
          }
        }
      },
      {
        id: 'playwright_0',
        type: 'playwrightWebScraper',
        data: {
          inputs: {
            url: 'https://example.com',
            selector: '.content',
            waitUntil: 'networkidle'
          }
        }
      },
      {
        id: 'playwrightCrawler_0',
        type: 'playwrightWebCrawler',
        data: {
          inputs: {
            url: 'https://example.com',
            maxCrawlDepth: 2,
            maxCrawlPages: 10,
            crawlerMode: 'fast'
          }
        }
      }
    ],
    edges: []
  };

  const documentLoaderResult = await converter.convert(documentLoaderFlow);
  console.log('Document loader conversion result:', documentLoaderResult.files[0].content);

  // Example 5: Complete agent flow with multiple Phase 2 components
  console.log('\nConverting complete agent flow...');
  const completeFlow = {
    nodes: [
      {
        id: 'chatOpenAI_0',
        type: 'chatOpenAI',
        data: {
          inputs: {
            modelName: 'gpt-4',
            temperature: 0.3
          }
        }
      },
      {
        id: 'zepMemory_0',
        type: 'zepMemory',
        data: {
          inputs: {
            baseURL: 'http://localhost:8000',
            sessionId: 'agent-session',
            memoryType: 'message_window',
            k: 10
          }
        }
      },
      {
        id: 'duckDuckGoSearch_0',
        type: 'duckDuckGoSearch',
        data: {
          inputs: {
            maxResults: 3
          }
        }
      },
      {
        id: 'excelFile_0',
        type: 'excelFile',
        data: {
          inputs: {
            filePath: './knowledge-base.xlsx'
          }
        }
      },
      {
        id: 'outputFixingParser_0',
        type: 'outputFixingParser',
        data: {
          inputs: {
            maxRetries: 2
          }
        }
      },
      {
        id: 'conversationalAgent_0',
        type: 'conversationalAgent',
        data: {
          inputs: {
            systemMessage: 'You are a helpful AI assistant with access to search and document tools.'
          }
        }
      }
    ],
    edges: [
      {
        source: 'chatOpenAI_0',
        target: 'conversationalAgent_0',
        sourceHandle: 'chatOpenAI_0-output-chatOpenAI',
        targetHandle: 'conversationalAgent_0-input-model'
      },
      {
        source: 'zepMemory_0',
        target: 'conversationalAgent_0',
        sourceHandle: 'zepMemory_0-output-zepMemory',
        targetHandle: 'conversationalAgent_0-input-memory'
      },
      {
        source: 'duckDuckGoSearch_0',
        target: 'conversationalAgent_0',
        sourceHandle: 'duckDuckGoSearch_0-output-duckDuckGoSearch',
        targetHandle: 'conversationalAgent_0-input-tools'
      },
      {
        source: 'excelFile_0',
        target: 'conversationalAgent_0',
        sourceHandle: 'excelFile_0-output-document',
        targetHandle: 'conversationalAgent_0-input-tools'
      }
    ]
  };

  const completeResult = await converter.convert(completeFlow);
  
  // Save the generated code
  await fs.writeFile(
    join(process.cwd(), 'generated-agent.ts'),
    completeResult.files[0].content,
    'utf-8'
  );
  
  console.log('Complete agent flow converted and saved to generated-agent.ts');
  
  // Display conversion metrics
  console.log('\nConversion Metrics:');
  console.log(`- Total nodes converted: ${completeFlow.nodes.length}`);
  console.log(`- Total connections: ${completeFlow.edges.length}`);
  console.log(`- Generated files: ${completeResult.files.length}`);
  console.log(`- Warnings: ${completeResult.warnings?.length || 0}`);
}

// Run the examples
convertPhase2Flow().catch(console.error);