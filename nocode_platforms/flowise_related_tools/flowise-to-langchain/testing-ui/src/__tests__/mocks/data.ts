import { FlowiseFlow, TestResult, ConversionResult, TestConfiguration, TestSuite } from '@/types'

// Mock Flowise Flow Data
export const mockFlowiseFlow: FlowiseFlow = {
  id: 'test-flow-1',
  name: 'Test OpenAI Chat Flow',
  description: 'A test flow with OpenAI chat and search capabilities',
  data: {
    nodes: [
      {
        id: 'chatOpenAI_0',
        type: 'chatOpenAI',
        data: {
          id: 'chatOpenAI_0',
          label: 'ChatOpenAI',
          version: 3,
          name: 'chatOpenAI',
          type: 'ChatOpenAI',
          baseClasses: ['ChatOpenAI', 'BaseChatModel', 'BaseLanguageModel'],
          inputs: {
            modelName: 'gpt-3.5-turbo',
            temperature: 0.7,
            maxTokens: 1000,
            openAIApiKey: '{{OPENAI_API_KEY}}'
          }
        },
        position: { x: 100, y: 100 }
      },
      {
        id: 'serpAPI_0',
        type: 'serpAPI', 
        data: {
          id: 'serpAPI_0',
          label: 'SerpAPI',
          version: 2,
          name: 'serpAPI',
          type: 'SerpAPI',
          baseClasses: ['SerpAPI', 'Tool', 'StructuredTool'],
          inputs: {
            serpApiKey: '{{SERPAPI_KEY}}'
          }
        },
        position: { x: 300, y: 100 }
      }
    ],
    edges: [
      {
        id: 'edge_1',
        source: 'chatOpenAI_0',
        target: 'serpAPI_0',
        sourceHandle: 'chatOpenAI_0-output-chatOpenAI-ChatOpenAI|BaseChatModel|BaseLanguageModel',
        targetHandle: 'serpAPI_0-input-model-BaseChatModel'
      }
    ]
  },
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
  version: '1.0.0'
}

// Mock Test Results
export const mockTestResult: TestResult = {
  id: 'test-result-1',
  flowId: 'test-flow-1',
  testSuiteId: 'test-suite-1',
  status: 'passed',
  duration: 2500,
  timestamp: '2024-01-15T10:45:00Z',
  details: {
    totalTests: 5,
    passedTests: 5,
    failedTests: 0,
    skippedTests: 0,
    coverage: 95.2
  },
  logs: [
    { level: 'info', message: 'Starting test execution', timestamp: '2024-01-15T10:45:00Z' },
    { level: 'info', message: 'Flow validation passed', timestamp: '2024-01-15T10:45:01Z' },
    { level: 'info', message: 'All tests completed successfully', timestamp: '2024-01-15T10:45:02Z' }
  ],
  artifacts: {
    screenshots: [],
    reports: ['test-report.html'],
    traces: ['execution-trace.json']
  }
}

// Mock Conversion Result
export const mockConversionResult: ConversionResult = {
  id: 'conversion-1',
  flowId: 'test-flow-1',
  status: 'success',
  timestamp: '2024-01-15T10:30:00Z',
  generatedCode: `import { ChatOpenAI } from "@langchain/openai";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";

// OpenAI Model
const chatOpenAI = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Search Tool
const serpAPI = new SerpAPI(process.env.SERPAPI_KEY);

export async function runFlow(input: string): Promise<string> {
  const agent = await createOpenAIFunctionsAgent({
    llm: chatOpenAI,
    tools: [serpAPI],
  });
  
  const executor = new AgentExecutor({
    agent,
    tools: [serpAPI],
  });
  
  const result = await executor.call({ input });
  return result.output;
}`,
  outputFormat: 'typescript',
  settings: {
    withLangfuse: false,
    includeComments: true,
    format: 'esm'
  },
  dependencies: [
    '@langchain/openai',
    '@langchain/community',
    'langchain'
  ],
  files: [
    {
      name: 'generated-flow.ts',
      content: '// Generated code content here',
      size: 1024
    }
  ],
  metrics: {
    conversionTime: 1500,
    nodeCount: 2,
    codeLines: 35,
    complexity: 'medium'
  }
}

// Mock Test Configuration
export const mockTestConfiguration: TestConfiguration = {
  id: 'test-config-1',
  name: 'Standard Test Configuration',
  timeout: 30000,
  retries: 3,
  parallel: false,
  coverage: true,
  verbose: true,
  environment: 'development',
  variables: {
    OPENAI_API_KEY: 'test-key-123',
    SERPAPI_KEY: 'test-serp-key'
  },
  testCases: [
    {
      id: 'test-case-1',
      name: 'Basic Query Test',
      input: 'What is the weather today?',
      expectedOutput: 'Weather information response',
      timeout: 10000
    },
    {
      id: 'test-case-2',
      name: 'Complex Query Test',
      input: 'Find me information about artificial intelligence trends',
      expectedOutput: 'AI trends information',
      timeout: 15000
    }
  ]
}

// Mock Test Suite
export const mockTestSuite: TestSuite = {
  id: 'test-suite-1',
  name: 'OpenAI Flow Test Suite',
  description: 'Comprehensive tests for OpenAI-based flows',
  flowId: 'test-flow-1',
  configuration: mockTestConfiguration,
  tests: [
    {
      id: 'unit-test-1',
      name: 'Node Validation Test',
      type: 'unit',
      target: 'nodes',
      assertions: [
        'ChatOpenAI node configured correctly',
        'SerpAPI tool initialized properly'
      ]
    },
    {
      id: 'integration-test-1',
      name: 'Flow Execution Test',
      type: 'integration',
      target: 'flow',
      assertions: [
        'Flow executes without errors',
        'Returns valid response'
      ]
    }
  ],
  createdAt: '2024-01-15T09:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
}

// Mock Analytics Data
export const mockAnalyticsData = {
  conversions: {
    total: 156,
    successful: 142,
    failed: 14,
    successRate: 91.0
  },
  tests: {
    total: 89,
    passed: 81,
    failed: 8,
    passRate: 91.0
  },
  performance: {
    avgConversionTime: 2.3,
    avgTestDuration: 15.7,
    systemUptime: 99.2
  },
  usage: {
    dailyActiveUsers: 23,
    totalFlows: 67,
    popularNodes: ['ChatOpenAI', 'SerpAPI', 'PromptTemplate']
  }
}

// Mock API Responses
export const mockApiResponses = {
  health: { status: 'ok', timestamp: new Date().toISOString() },
  flows: [mockFlowiseFlow],
  testResults: [mockTestResult],
  conversionResults: [mockConversionResult],
  testSuites: [mockTestSuite],
  analytics: mockAnalyticsData
}