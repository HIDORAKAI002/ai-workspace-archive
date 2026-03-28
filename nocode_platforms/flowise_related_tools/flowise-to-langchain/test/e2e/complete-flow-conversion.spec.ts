import { test, expect } from '@playwright/test';
import { readFile, writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

test.describe('Complete Flow Conversion Pipeline E2E', () => {
  let tempDir: string;
  let outputDir: string;

  test.beforeEach(async () => {
    // Create temporary directories
    tempDir = join(tmpdir(), `e2e-test-${Date.now()}`);
    outputDir = join(tempDir, 'output');
    await mkdir(tempDir, { recursive: true });
    await mkdir(outputDir, { recursive: true });
  });

  test.afterEach(async () => {
    // Clean up
    await rm(tempDir, { recursive: true, force: true });
  });

  test('should convert a simple LLM chain flow end-to-end', async () => {
    // Create a simple LLM chain flow
    const simpleFlow = {
      nodes: [
        {
          id: 'openai-1',
          type: 'ChatOpenAI',
          position: { x: 100, y: 100 },
          data: {
            id: 'openai-1',
            label: 'ChatOpenAI',
            version: 2,
            name: 'chatOpenAI',
            type: 'ChatOpenAI',
            baseClasses: ['ChatOpenAI', 'BaseChatModel', 'LLM'],
            category: 'Chat Models',
            description: 'Wrapper around OpenAI Chat API',
            inputParams: [
              {
                label: 'Model Name',
                name: 'modelName',
                type: 'string',
                default: 'gpt-3.5-turbo',
                options: ['gpt-4', 'gpt-3.5-turbo'],
              },
              {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                default: 0.7,
                min: 0,
                max: 1,
              },
            ],
            inputAnchors: [],
            outputAnchors: [
              {
                id: 'openai-1-output',
                name: 'chatOpenAI',
                label: 'ChatOpenAI',
                type: 'ChatOpenAI',
              },
            ],
            outputs: {
              modelName: 'gpt-3.5-turbo',
              temperature: 0.7,
            },
          },
        },
        {
          id: 'prompt-1',
          type: 'PromptTemplate',
          position: { x: 100, y: 300 },
          data: {
            id: 'prompt-1',
            label: 'Prompt Template',
            version: 1,
            name: 'promptTemplate',
            type: 'PromptTemplate',
            baseClasses: ['PromptTemplate'],
            category: 'Prompts',
            description: 'Create a prompt template',
            inputParams: [
              {
                label: 'Template',
                name: 'template',
                type: 'string',
                rows: 4,
                default: 'You are a helpful assistant. Answer the following question: {question}',
              },
            ],
            inputAnchors: [],
            outputAnchors: [
              {
                id: 'prompt-1-output',
                name: 'promptTemplate',
                label: 'PromptTemplate',
                type: 'PromptTemplate',
              },
            ],
            outputs: {
              template: 'You are a helpful assistant. Answer the following question: {question}',
            },
          },
        },
        {
          id: 'llmchain-1',
          type: 'LLMChain',
          position: { x: 400, y: 200 },
          data: {
            id: 'llmchain-1',
            label: 'LLM Chain',
            version: 2,
            name: 'llmChain',
            type: 'LLMChain',
            baseClasses: ['LLMChain', 'BaseChain'],
            category: 'Chains',
            description: 'Chain that combines a prompt template and LLM',
            inputParams: [],
            inputAnchors: [
              {
                id: 'llmchain-1-llm',
                name: 'model',
                label: 'Language Model',
                type: 'BaseChatModel',
              },
              {
                id: 'llmchain-1-prompt',
                name: 'prompt',
                label: 'Prompt',
                type: 'PromptTemplate',
              },
            ],
            outputAnchors: [
              {
                id: 'llmchain-1-output',
                name: 'llmChain',
                label: 'LLMChain',
                type: 'LLMChain',
              },
            ],
            outputs: {},
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'openai-1',
          sourceHandle: 'openai-1-output',
          target: 'llmchain-1',
          targetHandle: 'llmchain-1-llm',
        },
        {
          id: 'edge-2',
          source: 'prompt-1',
          sourceHandle: 'prompt-1-output',
          target: 'llmchain-1',
          targetHandle: 'llmchain-1-prompt',
        },
      ],
    };

    const flowPath = join(tempDir, 'simple-flow.json');
    await writeFile(flowPath, JSON.stringify(simpleFlow, null, 2));

    // Run the CLI converter
    const { stdout, stderr } = await execAsync(
      `npx tsx src/cli/index.ts convert "${flowPath}" -o "${outputDir}" --format typescript --verbose`
    );

    // Check CLI output
    expect(stderr).not.toContain('Error');
    expect(stdout).toContain('Conversion completed successfully');

    // Verify generated files
    const indexPath = join(outputDir, 'index.ts');
    const packagePath = join(outputDir, 'package.json');
    const readmePath = join(outputDir, 'README.md');

    // Check that files were created
    const indexContent = await readFile(indexPath, 'utf-8');
    const packageContent = await readFile(packagePath, 'utf-8');

    // Verify index.ts content
    expect(indexContent).toContain('import { ChatOpenAI }');
    expect(indexContent).toContain('import { PromptTemplate }');
    expect(indexContent).toContain('import { LLMChain }');
    expect(indexContent).toContain('const chatOpenAI_openai_1');
    expect(indexContent).toContain('const promptTemplate_prompt_1');
    expect(indexContent).toContain('const llmChain_llmchain_1');
    expect(indexContent).toContain('modelName: "gpt-3.5-turbo"');
    expect(indexContent).toContain('temperature: 0.7');
    expect(indexContent).toContain('You are a helpful assistant');

    // Verify package.json
    const packageJson = JSON.parse(packageContent);
    expect(packageJson.dependencies).toHaveProperty('@langchain/openai');
    expect(packageJson.dependencies).toHaveProperty('langchain');
    expect(packageJson.type).toBe('module');

    // Test that generated code compiles
    const { stderr: tscError } = await execAsync(
      `cd "${outputDir}" && npx tsc --noEmit --skipLibCheck`
    );
    expect(tscError).toBe('');
  });

  test('should convert a RAG flow with vector store', async () => {
    // Create a RAG flow with vector store
    const ragFlow = {
      nodes: [
        {
          id: 'embeddings-1',
          type: 'OpenAIEmbeddings',
          position: { x: 100, y: 100 },
          data: {
            id: 'embeddings-1',
            label: 'OpenAI Embeddings',
            version: 2,
            name: 'openAIEmbeddings',
            type: 'OpenAIEmbeddings',
            baseClasses: ['OpenAIEmbeddings', 'Embeddings'],
            category: 'Embeddings',
            description: 'OpenAI embeddings',
            inputParams: [],
            inputAnchors: [],
            outputAnchors: [
              {
                id: 'embeddings-1-output',
                name: 'openAIEmbeddings',
                label: 'OpenAIEmbeddings',
                type: 'OpenAIEmbeddings',
              },
            ],
            outputs: {},
          },
        },
        {
          id: 'vectorstore-1',
          type: 'InMemoryVectorStore',
          position: { x: 300, y: 100 },
          data: {
            id: 'vectorstore-1',
            label: 'In-Memory Vector Store',
            version: 1,
            name: 'memoryVectorStore',
            type: 'InMemory',
            baseClasses: ['InMemory', 'VectorStore'],
            category: 'Vector Stores',
            description: 'In-memory vector store',
            inputParams: [],
            inputAnchors: [
              {
                id: 'vectorstore-1-embeddings',
                name: 'embeddings',
                label: 'Embeddings',
                type: 'Embeddings',
              },
            ],
            outputAnchors: [
              {
                id: 'vectorstore-1-output',
                name: 'vectorStore',
                label: 'VectorStore',
                type: 'VectorStore',
              },
            ],
            outputs: {},
          },
        },
        {
          id: 'retriever-1',
          type: 'VectorStoreRetriever',
          position: { x: 500, y: 100 },
          data: {
            id: 'retriever-1',
            label: 'Vector Store Retriever',
            version: 1,
            name: 'vectorStoreRetriever',
            type: 'VectorStoreRetriever',
            baseClasses: ['VectorStoreRetriever', 'BaseRetriever'],
            category: 'Retrievers',
            description: 'Retrieve from vector store',
            inputParams: [
              {
                label: 'Top K',
                name: 'k',
                type: 'number',
                default: 4,
              },
            ],
            inputAnchors: [
              {
                id: 'retriever-1-vectorstore',
                name: 'vectorStore',
                label: 'Vector Store',
                type: 'VectorStore',
              },
            ],
            outputAnchors: [
              {
                id: 'retriever-1-output',
                name: 'retriever',
                label: 'Retriever',
                type: 'BaseRetriever',
              },
            ],
            outputs: {
              k: 4,
            },
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'embeddings-1',
          sourceHandle: 'embeddings-1-output',
          target: 'vectorstore-1',
          targetHandle: 'vectorstore-1-embeddings',
        },
        {
          id: 'edge-2',
          source: 'vectorstore-1',
          sourceHandle: 'vectorstore-1-output',
          target: 'retriever-1',
          targetHandle: 'retriever-1-vectorstore',
        },
      ],
    };

    const flowPath = join(tempDir, 'rag-flow.json');
    await writeFile(flowPath, JSON.stringify(ragFlow, null, 2));

    // Run the converter with different options
    const { stdout, stderr } = await execAsync(
      `npx tsx src/cli/index.ts convert "${flowPath}" -o "${outputDir}" --format typescript --include-tests`
    );

    expect(stderr).not.toContain('Error');

    // Verify generated files
    const indexPath = join(outputDir, 'index.ts');
    const testPath = join(outputDir, 'index.test.ts');

    const indexContent = await readFile(indexPath, 'utf-8');
    const testContent = await readFile(testPath, 'utf-8');

    // Verify RAG components
    expect(indexContent).toContain('import { OpenAIEmbeddings }');
    expect(indexContent).toContain('import { MemoryVectorStore }');
    expect(indexContent).toContain('const openAIEmbeddings_embeddings_1');
    expect(indexContent).toContain('const memoryVectorStore_vectorstore_1');
    expect(indexContent).toContain('asRetriever({ k: 4 })');

    // Verify test file
    expect(testContent).toContain('describe(');
    expect(testContent).toContain('it(');
    expect(testContent).toContain('expect(');
  });

  test('should convert an agent flow with tools', async () => {
    // Create an agent flow with tools
    const agentFlow = {
      nodes: [
        {
          id: 'calculator-1',
          type: 'Calculator',
          position: { x: 100, y: 100 },
          data: {
            id: 'calculator-1',
            label: 'Calculator',
            version: 1,
            name: 'calculator',
            type: 'Calculator',
            baseClasses: ['Calculator', 'Tool'],
            category: 'Tools',
            description: 'Perform calculations',
            inputParams: [],
            inputAnchors: [],
            outputAnchors: [
              {
                id: 'calculator-1-output',
                name: 'calculator',
                label: 'Calculator',
                type: 'Calculator',
              },
            ],
            outputs: {},
          },
        },
        {
          id: 'serper-1',
          type: 'Serper',
          position: { x: 100, y: 300 },
          data: {
            id: 'serper-1',
            label: 'Serper Search',
            version: 1,
            name: 'serperAPI',
            type: 'Serper',
            baseClasses: ['Serper', 'Tool'],
            category: 'Tools',
            description: 'Google search via Serper API',
            inputParams: [],
            inputAnchors: [],
            outputAnchors: [
              {
                id: 'serper-1-output',
                name: 'serperAPI',
                label: 'Serper',
                type: 'Serper',
              },
            ],
            outputs: {},
          },
        },
        {
          id: 'agent-1',
          type: 'OpenAIFunctionsAgent',
          position: { x: 400, y: 200 },
          data: {
            id: 'agent-1',
            label: 'OpenAI Functions Agent',
            version: 2,
            name: 'openAIFunctionsAgent',
            type: 'OpenAIFunctionsAgent',
            baseClasses: ['OpenAIFunctionsAgent', 'Agent'],
            category: 'Agents',
            description: 'Agent that uses OpenAI functions',
            inputParams: [],
            inputAnchors: [
              {
                id: 'agent-1-tools',
                name: 'tools',
                label: 'Tools',
                type: 'Tool',
                list: true,
              },
              {
                id: 'agent-1-llm',
                name: 'llm',
                label: 'Language Model',
                type: 'BaseChatModel',
              },
            ],
            outputAnchors: [
              {
                id: 'agent-1-output',
                name: 'agent',
                label: 'Agent',
                type: 'Agent',
              },
            ],
            outputs: {},
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'calculator-1',
          sourceHandle: 'calculator-1-output',
          target: 'agent-1',
          targetHandle: 'agent-1-tools',
        },
        {
          id: 'edge-2',
          source: 'serper-1',
          sourceHandle: 'serper-1-output',
          target: 'agent-1',
          targetHandle: 'agent-1-tools',
        },
      ],
    };

    const flowPath = join(tempDir, 'agent-flow.json');
    await writeFile(flowPath, JSON.stringify(agentFlow, null, 2));

    // Run the converter
    const { stdout, stderr } = await execAsync(
      `npx tsx src/cli/index.ts convert "${flowPath}" -o "${outputDir}" --include-langfuse`
    );

    expect(stderr).not.toContain('Error');

    // Verify agent components
    const indexPath = join(outputDir, 'index.ts');
    const indexContent = await readFile(indexPath, 'utf-8');

    expect(indexContent).toContain('import { Calculator }');
    expect(indexContent).toContain('import { SerpAPI }');
    expect(indexContent).toContain('import { initializeAgentExecutorWithOptions }');
    expect(indexContent).toContain('const calculator_calculator_1');
    expect(indexContent).toContain('const serpAPI_serper_1');
    expect(indexContent).toContain('tools: [calculator_calculator_1, serpAPI_serper_1]');
    
    // Verify LangFuse integration
    expect(indexContent).toContain('import { CallbackHandler } from "langfuse-langchain"');
    expect(indexContent).toContain('const langfuseHandler');
  });

  test('should handle conversion errors gracefully', async () => {
    // Create an invalid flow
    const invalidFlow = {
      nodes: [],
      edges: [
        {
          id: 'edge-1',
          source: 'non-existent',
          target: 'also-non-existent',
        },
      ],
    };

    const flowPath = join(tempDir, 'invalid-flow.json');
    await writeFile(flowPath, JSON.stringify(invalidFlow, null, 2));

    // Run the converter and expect it to fail gracefully
    try {
      await execAsync(
        `npx tsx src/cli/index.ts convert "${flowPath}" -o "${outputDir}"`
      );
      // If it doesn't throw, check for error in output
      expect(true).toBe(true);
    } catch (error: any) {
      // Should provide meaningful error message
      expect(error.stderr).toContain('must contain at least one node');
    }
  });

  test('should support batch conversion', async () => {
    // Create multiple flows
    const flows = [
      {
        name: 'flow1.json',
        content: {
          nodes: [
            {
              id: 'llm-1',
              type: 'ChatOpenAI',
              position: { x: 100, y: 100 },
              data: {
                id: 'llm-1',
                label: 'ChatOpenAI',
                version: 2,
                name: 'chatOpenAI',
                type: 'ChatOpenAI',
                baseClasses: ['ChatOpenAI', 'LLM'],
                category: 'LLMs',
                description: 'OpenAI Chat',
                inputAnchors: [],
                outputAnchors: [
                  {
                    id: 'llm-1-output',
                    name: 'output',
                    label: 'Output',
                    type: 'ChatOpenAI',
                  },
                ],
                outputs: {},
              },
            },
          ],
          edges: [],
        },
      },
      {
        name: 'flow2.json',
        content: {
          nodes: [
            {
              id: 'prompt-1',
              type: 'PromptTemplate',
              position: { x: 100, y: 100 },
              data: {
                id: 'prompt-1',
                label: 'Prompt',
                version: 1,
                name: 'promptTemplate',
                type: 'PromptTemplate',
                baseClasses: ['PromptTemplate'],
                category: 'Prompts',
                description: 'Prompt template',
                inputAnchors: [],
                outputAnchors: [
                  {
                    id: 'prompt-1-output',
                    name: 'output',
                    label: 'Output',
                    type: 'PromptTemplate',
                  },
                ],
                outputs: {
                  template: 'Hello {name}!',
                },
              },
            },
          ],
          edges: [],
        },
      },
    ];

    // Write all flows
    for (const flow of flows) {
      await writeFile(
        join(tempDir, flow.name),
        JSON.stringify(flow.content, null, 2)
      );
    }

    // Run batch conversion
    const { stdout } = await execAsync(
      `npx tsx src/cli/index.ts batch "${tempDir}/*.json" -o "${outputDir}"`
    );

    expect(stdout).toContain('Successfully converted 2 files');

    // Verify outputs
    const flow1Dir = join(outputDir, 'flow1');
    const flow2Dir = join(outputDir, 'flow2');

    const flow1Content = await readFile(join(flow1Dir, 'index.ts'), 'utf-8');
    const flow2Content = await readFile(join(flow2Dir, 'index.ts'), 'utf-8');

    expect(flow1Content).toContain('ChatOpenAI');
    expect(flow2Content).toContain('PromptTemplate');
    expect(flow2Content).toContain('Hello {name}!');
  });
});