import { TestConfiguration, TestPlan } from '../types.js';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * Analyzes converted code and plans appropriate tests
 */
export async function planTests(config: TestConfiguration): Promise<TestPlan> {
  const plan: TestPlan = {
    totalTests: 0,
    estimatedDuration: 0,
    unitTests: [],
    integrationTests: [],
    e2eTests: [],
  };

  try {
    // Analyze the converted code structure
    const codeAnalysis = await analyzeConvertedCode(config.outputPath);

    // Plan unit tests
    if (config.testType === 'unit' || config.testType === 'all') {
      plan.unitTests = await planUnitTests(codeAnalysis);
    }

    // Plan integration tests
    if (config.testType === 'integration' || config.testType === 'all') {
      plan.integrationTests = await planIntegrationTests(codeAnalysis);
    }

    // Plan e2e tests
    if (config.testType === 'e2e' || config.testType === 'all') {
      plan.e2eTests = await planE2ETests(codeAnalysis, config.inputPath);
    }

    // Calculate totals
    plan.totalTests =
      plan.unitTests.length +
      plan.integrationTests.length +
      plan.e2eTests.length;
    plan.estimatedDuration = calculateEstimatedDuration(plan);

    return plan;
  } catch (error) {
    throw new Error(`Failed to plan tests: ${(error as Error).message}`);
  }
}

interface CodeAnalysis {
  hasLangChain: boolean;
  hasLangFuse: boolean;
  nodeTypes: string[];
  chainTypes: string[];
  memoryTypes: string[];
  hasRetrieval: boolean;
  hasChat: boolean;
  hasEmbeddings: boolean;
  hasTools: boolean;
  complexityScore: number;
  entryPoints: string[];
  dependencies: string[];
}

async function analyzeConvertedCode(outputPath: string): Promise<CodeAnalysis> {
  const analysis: CodeAnalysis = {
    hasLangChain: false,
    hasLangFuse: false,
    nodeTypes: [],
    chainTypes: [],
    memoryTypes: [],
    hasRetrieval: false,
    hasChat: false,
    hasEmbeddings: false,
    hasTools: false,
    complexityScore: 0,
    entryPoints: [],
    dependencies: [],
  };

  try {
    // Check package.json for dependencies
    const packageJsonPath = join(outputPath, 'package.json');
    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      analysis.dependencies = Object.keys(deps);
      analysis.hasLangChain = 'langchain' in deps || '@langchain/core' in deps;
      analysis.hasLangFuse = 'langfuse-langchain' in deps || 'langfuse' in deps;
    }

    // Scan TypeScript/JavaScript files for patterns
    const { glob } = await import('glob');
    const codeFiles = await glob('**/*.{ts,js,tsx,jsx}', { cwd: outputPath });

    for (const file of codeFiles) {
      const filePath = join(outputPath, file);
      const content = await readFile(filePath, 'utf-8');

      // Detect LangChain patterns
      if (
        content.includes('from "langchain"') ||
        content.includes('from "@langchain/')
      ) {
        analysis.hasLangChain = true;
      }

      // Detect specific node types
      const nodePatterns = [
        { pattern: /ChatOpenAI|OpenAI/g, type: 'llm' },
        { pattern: /PromptTemplate/g, type: 'prompt' },
        { pattern: /LLMChain|ConversationChain/g, type: 'chain' },
        { pattern: /BufferMemory|ConversationBufferMemory/g, type: 'memory' },
        { pattern: /VectorStore|Retriever/g, type: 'retrieval' },
        { pattern: /Embeddings/g, type: 'embeddings' },
        { pattern: /Tool|Agent/g, type: 'tools' },
      ];

      for (const { pattern, type } of nodePatterns) {
        const matches = content.match(pattern);
        if (matches) {
          if (!analysis.nodeTypes.includes(type)) {
            analysis.nodeTypes.push(type);
          }
          analysis.complexityScore += matches.length;
        }
      }

      // Detect specific features
      if (
        content.includes('ChatOpenAI') ||
        content.includes('ConversationChain')
      ) {
        analysis.hasChat = true;
      }
      if (content.includes('VectorStore') || content.includes('Retriever')) {
        analysis.hasRetrieval = true;
      }
      if (content.includes('Embeddings')) {
        analysis.hasEmbeddings = true;
      }
      if (content.includes('Tool') || content.includes('Agent')) {
        analysis.hasTools = true;
      }

      // Look for main/index files as entry points
      if (
        file.includes('index.') ||
        file.includes('main.') ||
        file.includes('app.')
      ) {
        analysis.entryPoints.push(file);
      }
    }
  } catch (error) {
    console.warn(
      `Warning: Could not fully analyze code: ${(error as Error).message}`
    );
  }

  return analysis;
}

async function planUnitTests(
  analysis: CodeAnalysis
): Promise<
  Array<{ name: string; description: string; dependencies?: string[] }>
> {
  const tests = [];

  // Basic LangChain component tests
  if (analysis.hasLangChain) {
    tests.push({
      name: 'LangChain Import Test',
      description:
        'Verify all LangChain imports are valid and modules load correctly',
      dependencies: ['langchain'],
    });
  }

  // Node-specific tests
  if (analysis.nodeTypes.includes('llm')) {
    tests.push({
      name: 'LLM Configuration Test',
      description: 'Test LLM model initialization and configuration',
      dependencies: ['openai-api-key'],
    });
  }

  if (analysis.nodeTypes.includes('prompt')) {
    tests.push({
      name: 'Prompt Template Test',
      description: 'Verify prompt templates format correctly with variables',
    });
  }

  if (analysis.nodeTypes.includes('chain')) {
    tests.push({
      name: 'Chain Construction Test',
      description: 'Test that chains are constructed with proper components',
    });
  }

  if (analysis.nodeTypes.includes('memory')) {
    tests.push({
      name: 'Memory Functionality Test',
      description: 'Verify memory stores and retrieves conversation history',
    });
  }

  if (analysis.nodeTypes.includes('retrieval')) {
    tests.push({
      name: 'Retrieval Setup Test',
      description: 'Test vector store and retriever configuration',
      dependencies: ['vector-store'],
    });
  }

  // Configuration tests
  tests.push({
    name: 'Environment Configuration Test',
    description: 'Verify all required environment variables are documented',
  });

  // Error handling tests
  tests.push({
    name: 'Error Handling Test',
    description: 'Test graceful handling of API errors and invalid inputs',
  });

  // LangFuse integration tests
  if (analysis.hasLangFuse) {
    tests.push({
      name: 'LangFuse Integration Test',
      description: 'Verify tracing and monitoring integration works correctly',
      dependencies: ['langfuse-api-key'],
    });
  }

  return tests;
}

async function planIntegrationTests(
  analysis: CodeAnalysis
): Promise<
  Array<{ name: string; description: string; requirements?: string[] }>
> {
  const tests = [];

  // Chain integration tests
  if (analysis.hasChat) {
    tests.push({
      name: 'Chat Flow Integration Test',
      description: 'Test complete chat conversation flow with memory',
      requirements: ['openai-api-key', 'test-prompts'],
    });
  }

  if (analysis.hasRetrieval) {
    tests.push({
      name: 'RAG Pipeline Integration Test',
      description:
        'Test retrieval-augmented generation with document ingestion',
      requirements: ['vector-store', 'test-documents'],
    });
  }

  // Multi-component tests
  if (
    analysis.nodeTypes.includes('chain') &&
    analysis.nodeTypes.includes('memory')
  ) {
    tests.push({
      name: 'Chain with Memory Integration Test',
      description: 'Test chain execution with persistent memory across calls',
    });
  }

  // External API integration
  if (analysis.hasLangChain) {
    tests.push({
      name: 'LLM API Integration Test',
      description: 'Test actual API calls to language model providers',
      requirements: ['api-keys', 'network-access'],
    });
  }

  // Tool integration tests
  if (analysis.hasTools) {
    tests.push({
      name: 'Agent Tool Integration Test',
      description: 'Test agent tool usage and decision making',
      requirements: ['tool-apis', 'test-scenarios'],
    });
  }

  // Performance tests
  if (analysis.complexityScore > 5) {
    tests.push({
      name: 'Performance Integration Test',
      description: 'Test system performance under load with realistic data',
      requirements: ['load-test-data'],
    });
  }

  return tests;
}

async function planE2ETests(
  analysis: CodeAnalysis,
  inputPath: string
): Promise<Array<{ name: string; description: string; scenarios?: string[] }>> {
  const tests = [];

  // Load original Flowise data to understand the flow
  try {
    const flowiseData = JSON.parse(await readFile(inputPath, 'utf-8'));
    const nodeCount = flowiseData.nodes?.length || 0;
    // const edgeCount = flowiseData.edges?.length || 0; // Future use for edge-based tests

    // Basic flow execution test
    tests.push({
      name: 'Complete Flow Execution Test',
      description:
        'Execute the entire converted flow end-to-end with sample inputs',
      scenarios: [
        'Execute with minimal valid input',
        'Execute with complex realistic input',
        'Handle invalid input gracefully',
      ],
    });

    // Scenario-based tests
    if (analysis.hasChat) {
      tests.push({
        name: 'Conversational Flow E2E Test',
        description: 'Test multi-turn conversation capabilities',
        scenarios: [
          'Single question-answer',
          'Multi-turn conversation with context',
          'Conversation with follow-up questions',
          'Handle conversation reset',
        ],
      });
    }

    if (analysis.hasRetrieval) {
      tests.push({
        name: 'Document Query E2E Test',
        description: 'Test document ingestion and query flow',
        scenarios: [
          'Ingest documents and query',
          'Query with no matching documents',
          'Query with multiple relevant documents',
          'Update document store and re-query',
        ],
      });
    }

    // Comparison test with original Flowise
    if (nodeCount > 1) {
      tests.push({
        name: 'Fidelity Comparison Test',
        description:
          'Compare outputs between original Flowise and converted code',
        scenarios: [
          'Same input produces similar output',
          'Performance comparison',
          'Feature parity validation',
        ],
      });
    }

    // Stress tests for complex flows
    if (analysis.complexityScore > 10 || nodeCount > 10) {
      tests.push({
        name: 'Complex Flow Stress Test',
        description: 'Test system stability under various conditions',
        scenarios: [
          'High concurrency test',
          'Large input processing',
          'Error recovery and retry',
          'Resource cleanup verification',
        ],
      });
    }
  } catch (error) {
    console.warn('Could not analyze original Flowise data for E2E planning');
  }

  // Deployment simulation test
  tests.push({
    name: 'Deployment Simulation Test',
    description: 'Simulate production deployment and usage patterns',
    scenarios: [
      'Cold start performance',
      'Warm execution performance',
      'Configuration loading',
      'Graceful shutdown',
    ],
  });

  return tests;
}

function calculateEstimatedDuration(plan: TestPlan): number {
  // Estimate in milliseconds
  const unitTestTime = plan.unitTests.length * 2000; // 2s per unit test
  const integrationTestTime = plan.integrationTests.length * 10000; // 10s per integration test
  const e2eTestTime = plan.e2eTests.length * 30000; // 30s per e2e test

  return unitTestTime + integrationTestTime + e2eTestTime;
}
