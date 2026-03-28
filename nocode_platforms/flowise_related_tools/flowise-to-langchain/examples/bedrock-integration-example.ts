/**
 * AWS Bedrock Integration Example
 * 
 * This example demonstrates how to use the Bedrock converters to convert
 * Flowise flows with AWS Bedrock Claude and Llama models.
 */

import { FlowtypeLangchainConverter } from '../src/index.js';
import { promises as fs } from 'fs';

async function convertBedrockFlow() {
  const converter = new FlowtypeLangchainConverter();

  // Example 1: BedrockChat with Claude
  console.log('Converting BedrockChat Claude flow...');
  const bedrockClaudeFlow = {
    nodes: [
      {
        id: 'bedrockChat_0',
        type: 'bedrockChat', 
        data: {
          inputs: {
            modelName: 'anthropic.claude-v2',
            region: 'us-west-2',
            temperature: 0.7,
            maxTokens: 2000,
            topP: 0.9,
            topK: 250,
            streaming: true,
            stopSequences: ['Human:', 'Assistant:']
          }
        }
      },
      {
        id: 'promptTemplate_0',
        type: 'promptTemplate',
        data: {
          inputs: {
            template: 'You are a helpful AI assistant. {input}',
            inputVariables: ['input']
          }
        }
      },
      {
        id: 'llmChain_0',
        type: 'llmChain',
        data: {}
      }
    ],
    edges: [
      {
        source: 'bedrockChat_0',
        target: 'llmChain_0',
        sourceHandle: 'bedrockChat_0-output-bedrockChat',
        targetHandle: 'llmChain_0-input-model'
      },
      {
        source: 'promptTemplate_0',
        target: 'llmChain_0',
        sourceHandle: 'promptTemplate_0-output-promptTemplate',
        targetHandle: 'llmChain_0-input-prompt'
      }
    ]
  };

  const bedrockClaudeResult = await converter.convert(bedrockClaudeFlow);
  console.log('BedrockChat Claude conversion completed');

  // Example 2: BedrockLLM with Llama
  console.log('\nConverting BedrockLLM Llama flow...');
  const bedrockLlamaFlow = {
    nodes: [
      {
        id: 'bedrockLLM_0',
        type: 'bedrockLLM',
        data: {
          inputs: {
            modelName: 'meta.llama2-70b-chat-v1',
            region: 'us-east-1',
            temperature: 0.5,
            maxTokens: 1000,
            topP: 0.95,
            maxRetries: 3
          }
        }
      },
      {
        id: 'bufferMemory_0',
        type: 'bufferMemory',
        data: {
          inputs: {
            memoryKey: 'chat_history',
            returnMessages: true
          }
        }
      },
      {
        id: 'conversationChain_0',
        type: 'conversationChain',
        data: {}
      }
    ],
    edges: [
      {
        source: 'bedrockLLM_0',
        target: 'conversationChain_0',
        sourceHandle: 'bedrockLLM_0-output-bedrockLLM',
        targetHandle: 'conversationChain_0-input-model'
      },
      {
        source: 'bufferMemory_0',
        target: 'conversationChain_0',
        sourceHandle: 'bufferMemory_0-output-bufferMemory',
        targetHandle: 'conversationChain_0-input-memory'
      }
    ]
  };

  const bedrockLlamaResult = await converter.convert(bedrockLlamaFlow);
  console.log('BedrockLLM Llama conversion completed');

  // Example 3: Multi-model Bedrock setup with RAG
  console.log('\nConverting multi-model Bedrock RAG flow...');
  const bedrockRAGFlow = {
    nodes: [
      {
        id: 'bedrockChat_claude',
        type: 'bedrockChat',
        data: {
          inputs: {
            modelName: 'anthropic.claude-instant-v1',
            region: 'us-west-2',
            temperature: 0.3,
            maxTokens: 1000
          }
        }
      },
      {
        id: 'bedrockEmbeddings_0',
        type: 'bedrockEmbeddings',
        data: {
          inputs: {
            modelName: 'amazon.titan-embed-text-v1',
            region: 'us-west-2'
          }
        }
      },
      {
        id: 'pineconeVectorStore_0',
        type: 'pinecone',
        data: {
          inputs: {
            apiKey: '{{PINECONE_API_KEY}}',
            environment: 'us-west1-gcp',
            indexName: 'knowledge-base'
          }
        }
      },
      {
        id: 'conversationalRetrievalQAChain_0',
        type: 'conversationalRetrievalQAChain',
        data: {
          inputs: {
            returnSourceDocuments: true
          }
        }
      }
    ],
    edges: [
      {
        source: 'bedrockChat_claude',
        target: 'conversationalRetrievalQAChain_0',
        sourceHandle: 'bedrockChat_claude-output-bedrockChat',
        targetHandle: 'conversationalRetrievalQAChain_0-input-model'
      },
      {
        source: 'bedrockEmbeddings_0',
        target: 'pineconeVectorStore_0',
        sourceHandle: 'bedrockEmbeddings_0-output-bedrockEmbeddings',
        targetHandle: 'pineconeVectorStore_0-input-embeddings'
      },
      {
        source: 'pineconeVectorStore_0',
        target: 'conversationalRetrievalQAChain_0',
        sourceHandle: 'pineconeVectorStore_0-output-retriever',
        targetHandle: 'conversationalRetrievalQAChain_0-input-retriever'
      }
    ]
  };

  const bedrockRAGResult = await converter.convert(bedrockRAGFlow);
  
  // Save all generated files
  await fs.writeFile(
    'generated-bedrock-claude.ts',
    bedrockClaudeResult.files[0].content,
    'utf-8'
  );
  
  await fs.writeFile(
    'generated-bedrock-llama.ts', 
    bedrockLlamaResult.files[0].content,
    'utf-8'
  );
  
  await fs.writeFile(
    'generated-bedrock-rag.ts',
    bedrockRAGResult.files[0].content,
    'utf-8'
  );

  console.log('\nAll Bedrock flows converted successfully!');
  console.log('Generated files:');
  console.log('- generated-bedrock-claude.ts');
  console.log('- generated-bedrock-llama.ts');
  console.log('- generated-bedrock-rag.ts');

  // Display sample generated code
  console.log('\nSample generated BedrockChat code:');
  console.log(bedrockClaudeResult.files[0].content.split('\n').slice(0, 20).join('\n'));
}

// Run the example
convertBedrockFlow().catch(console.error);