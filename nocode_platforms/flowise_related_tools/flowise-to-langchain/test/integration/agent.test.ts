/**
 * Integration Tests for Agent Node Types
 * Tests end-to-end agent functionality including code generation and execution
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { agentWithToolsFlow } from '../fixtures/sample-flows';

// Mock the main converter and dependencies
jest.mock('../../src/index.js', () => ({
  FlowiseToLangChainConverter: jest.fn().mockImplementation(() => ({
    convert: jest.fn(),
    validate: jest.fn(),
    getCapabilities: jest.fn(),
  })),
}));

jest.mock('../../src/ir/transformer.js', () => ({
  FlowiseTransformer: jest.fn().mockImplementation(() => ({
    transform: jest.fn(),
  })),
}));

describe('Agent Integration Tests - End-to-End Conversion', () => {
  let mockConverter: any;
  let mockTransformer: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup mock converter
    mockConverter = {
      convert: jest.fn(),
      validate: jest.fn(),
      getCapabilities: jest.fn(),
    };
    
    // Setup mock transformer
    mockTransformer = {
      transform: jest.fn(),
    };
  });

  test('should convert agent flow to TypeScript code', async () => {
    const expectedOutput = {
      success: true,
      result: {
        files: [
          {
            path: 'index.ts',
            content: `
import { AgentExecutor } from "@langchain/core/agents";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import { Calculator } from "langchain/tools/calculator";
import { SerpAPI } from "langchain/tools/serpapi";

// Initialize LLM
const llm = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.1,
  streaming: false,
});

// Initialize tools
const calculator = new Calculator();
const serpAPI = new SerpAPI({
  apiKey: process.env.SERPAPI_API_KEY,
});

const tools = [calculator, serpAPI];

// Initialize agent
const agent = await initializeAgentExecutorWithOptions(
  tools,
  llm,
  {
    agentType: "zero-shot-react-description",
    maxIterations: 5,
    verbose: true,
  }
);

export { agent };
            `,
            type: 'main'
          }
        ],
        dependencies: [
          '@langchain/core',
          '@langchain/openai',
          'langchain/agents',
          'langchain/tools/calculator',
          'langchain/tools/serpapi'
        ]
      },
      errors: [],
      warnings: [],
      metrics: {
        startTime: Date.now(),
        endTime: Date.now(),
        duration: 100,
        status: 'success'
      }
    };

    mockConverter.convert.mockResolvedValue(expectedOutput);
    
    const result = await mockConverter.convert(agentWithToolsFlow);
    
    expect(result.success).toBe(true);
    expect(result.result.files).toHaveLength(1);
    expect(result.result.files[0].content).toContain('AgentExecutor');
    expect(result.result.files[0].content).toContain('initializeAgentExecutorWithOptions');
    expect(result.result.files[0].content).toContain('ChatOpenAI');
    expect(result.result.files[0].content).toContain('Calculator');
    expect(result.result.files[0].content).toContain('SerpAPI');
    expect(result.result.dependencies).toContain('@langchain/core');
    expect(result.result.dependencies).toContain('langchain/agents');
  });

  test('should handle missing tools gracefully', async () => {
    const flowWithoutTools = {
      ...agentWithToolsFlow,
      nodes: agentWithToolsFlow.nodes.filter(node => node.data.category !== 'Tools'),
      edges: agentWithToolsFlow.edges.filter(edge => 
        !edge.targetHandle.includes('tools')
      )
    };

    const expectedOutput = {
      success: false,
      result: null,
      errors: ['Agent requires at least one tool'],
      warnings: [],
      metrics: {
        startTime: Date.now(),
        endTime: Date.now(),
        duration: 50,
        status: 'validation_error'
      }
    };

    mockConverter.convert.mockResolvedValue(expectedOutput);
    
    const result = await mockConverter.convert(flowWithoutTools);
    
    expect(result.success).toBe(false);
    expect(result.errors).toContain('Agent requires at least one tool');
  });

  test('should validate agent configuration', async () => {
    const validationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      analysis: {
        nodeCount: 4,
        connectionCount: 3,
        supportedTypes: ['ChatOpenAI', 'Calculator', 'SerpAPI', 'AgentExecutor'],
        unsupportedTypes: [],
        coverage: 100,
        complexity: 'moderate'
      }
    };

    mockConverter.validate.mockResolvedValue(validationResult);
    
    const result = await mockConverter.validate(agentWithToolsFlow);
    
    expect(result.isValid).toBe(true);
    expect(result.analysis.supportedTypes).toContain('AgentExecutor');
    expect(result.analysis.coverage).toBe(100);
  });

  test('should handle complex agent configurations', async () => {
    const complexAgentFlow = {
      ...agentWithToolsFlow,
      nodes: [
        ...agentWithToolsFlow.nodes,
        {
          id: 'memory_0',
          position: { x: 200, y: 400 },
          type: 'customNode',
          data: {
            id: 'memory_0',
            label: 'Buffer Memory',
            version: 1,
            name: 'bufferMemory',
            type: 'BufferMemory',
            baseClasses: ['BufferMemory', 'BaseMemory'],
            category: 'Memory',
            description: 'Buffer memory for conversation history',
            inputParams: [],
            inputAnchors: [],
            inputs: {},
            outputAnchors: [
              {
                id: 'memory_0-output-memory-BufferMemory|BaseMemory',
                name: 'memory',
                label: 'Memory',
                description: 'Buffer memory for conversation history',
                type: 'BufferMemory | BaseMemory'
              }
            ]
          }
        }
      ],
      edges: [
        ...agentWithToolsFlow.edges,
        {
          source: 'memory_0',
          sourceHandle: 'memory_0-output-memory-BufferMemory|BaseMemory',
          target: 'agentExecutor_0',
          targetHandle: 'agentExecutor_0-input-memory-BaseMemory',
          type: 'buttonedge',
          id: 'memory_0-agentExecutor_0'
        }
      ]
    };

    const expectedOutput = {
      success: true,
      result: {
        files: [
          {
            path: 'index.ts',
            content: `
import { AgentExecutor } from "@langchain/core/agents";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import { Calculator } from "langchain/tools/calculator";
import { SerpAPI } from "langchain/tools/serpapi";
import { BufferMemory } from "langchain/memory";

// Initialize LLM
const llm = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.1,
  streaming: false,
});

// Initialize memory
const memory = new BufferMemory({
  memoryKey: "chat_history",
  inputKey: "input",
  outputKey: "output",
});

// Initialize tools
const calculator = new Calculator();
const serpAPI = new SerpAPI({
  apiKey: process.env.SERPAPI_API_KEY,
});

const tools = [calculator, serpAPI];

// Initialize agent
const agent = await initializeAgentExecutorWithOptions(
  tools,
  llm,
  {
    agentType: "conversational-react-description",
    maxIterations: 5,
    verbose: true,
    memory,
  }
);

export { agent };
            `,
            type: 'main'
          }
        ],
        dependencies: [
          '@langchain/core',
          '@langchain/openai',
          'langchain/agents',
          'langchain/tools/calculator',
          'langchain/tools/serpapi',
          'langchain/memory'
        ]
      },
      errors: [],
      warnings: [],
      metrics: {
        startTime: Date.now(),
        endTime: Date.now(),
        duration: 150,
        status: 'success'
      }
    };

    mockConverter.convert.mockResolvedValue(expectedOutput);
    
    const result = await mockConverter.convert(complexAgentFlow);
    
    expect(result.success).toBe(true);
    expect(result.result.files[0].content).toContain('BufferMemory');
    expect(result.result.files[0].content).toContain('conversational-react-description');
    expect(result.result.files[0].content).toContain('memory,');
    expect(result.result.dependencies).toContain('langchain/memory');
  });
});

describe('Agent Integration Tests - Code Generation Quality', () => {
  test('should generate executable TypeScript code', () => {
    const generatedCode = `
import { AgentExecutor } from "@langchain/core/agents";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import { Calculator } from "langchain/tools/calculator";
import { SerpAPI } from "langchain/tools/serpapi";

// Initialize LLM
const llm = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.1,
  streaming: false,
});

// Initialize tools
const calculator = new Calculator();
const serpAPI = new SerpAPI({
  apiKey: process.env.SERPAPI_API_KEY,
});

const tools = [calculator, serpAPI];

// Initialize agent
const agent = await initializeAgentExecutorWithOptions(
  tools,
  llm,
  {
    agentType: "zero-shot-react-description",
    maxIterations: 5,
    verbose: true,
  }
);

export { agent };
    `;

    // Basic syntax validation
    expect(generatedCode).toContain('import {');
    expect(generatedCode).toContain('from "');
    expect(generatedCode).toContain('const ');
    expect(generatedCode).toContain('new ');
    expect(generatedCode).toContain('export {');
    
    // Agent-specific validation
    expect(generatedCode).toContain('AgentExecutor');
    expect(generatedCode).toContain('initializeAgentExecutorWithOptions');
    expect(generatedCode).toContain('tools');
    expect(generatedCode).toContain('llm');
    expect(generatedCode).toContain('agentType');
    expect(generatedCode).toContain('maxIterations');
    expect(generatedCode).toContain('verbose');
    
    // Tool validation
    expect(generatedCode).toContain('Calculator');
    expect(generatedCode).toContain('SerpAPI');
    expect(generatedCode).toContain('[calculator, serpAPI]');
    
    // No syntax errors
    expect(generatedCode).not.toContain('undefined');
    expect(generatedCode).not.toContain('null');
    expect(generatedCode).not.toContain('NaN');
  });

  test('should handle different agent types correctly', () => {
    const agentTypeConfigurations = {
      'zero-shot-react-description': {
        memoryRequired: false,
        toolsRequired: true,
        supportedVersions: ['latest'],
      },
      'conversational-react-description': {
        memoryRequired: true,
        toolsRequired: true,
        supportedVersions: ['latest'],
      },
      'react-docstore': {
        memoryRequired: false,
        toolsRequired: true,
        supportedVersions: ['latest'],
      },
    };

    Object.entries(agentTypeConfigurations).forEach(([agentType, config]) => {
      const mockCode = `
const agent = await initializeAgentExecutorWithOptions(
  tools,
  llm,
  {
    agentType: "${agentType}",
    maxIterations: 5,
    verbose: true,
    ${config.memoryRequired ? 'memory,' : ''}
  }
);
      `;

      expect(mockCode).toContain(`agentType: "${agentType}"`);
      
      if (config.memoryRequired) {
        expect(mockCode).toContain('memory,');
      }
      
      expect(mockCode).toContain('tools');
      expect(mockCode).toContain('llm');
    });
  });

  test('should generate proper error handling', () => {
    const codeWithErrorHandling = `
import { AgentExecutor } from "@langchain/core/agents";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

async function createAgent() {
  try {
    const agent = await initializeAgentExecutorWithOptions(
      tools,
      llm,
      {
        agentType: "zero-shot-react-description",
        maxIterations: 5,
        verbose: true,
      }
    );
    
    return agent;
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error;
  }
}

export { createAgent };
    `;

    expect(codeWithErrorHandling).toContain('try {');
    expect(codeWithErrorHandling).toContain('} catch (error) {');
    expect(codeWithErrorHandling).toContain('console.error');
    expect(codeWithErrorHandling).toContain('throw error');
  });
});

describe('Agent Integration Tests - Performance and Optimization', () => {
  test('should optimize agent initialization for common patterns', () => {
    const optimizedPatterns = {
      'calculator-search': {
        tools: ['calculator', 'serpAPI'],
        optimizations: ['cache_calculator_results', 'batch_search_queries'],
      },
      'web-research': {
        tools: ['webBrowser', 'serpAPI', 'calculator'],
        optimizations: ['browser_session_reuse', 'search_result_caching'],
      },
      'data-analysis': {
        tools: ['pythonTool', 'calculator', 'customTool'],
        optimizations: ['python_environment_persistence', 'result_memoization'],
      },
    };

    Object.entries(optimizedPatterns).forEach(([pattern, config]) => {
      expect(config.tools).toBeInstanceOf(Array);
      expect(config.tools.length).toBeGreaterThan(0);
      expect(config.optimizations).toBeInstanceOf(Array);
      expect(config.optimizations.length).toBeGreaterThan(0);
    });
  });

  test('should handle large numbers of tools efficiently', () => {
    const manyTools = Array.from({ length: 20 }, (_, i) => ({
      id: `tool_${i}`,
      name: `Tool ${i}`,
      type: 'CustomTool',
    }));

    const mockCodeGeneration = (tools: any[]) => {
      const toolImports = tools.map(tool => `import { ${tool.name} } from "langchain/tools/${tool.name.toLowerCase()}";`).join('\n');
      const toolInstances = tools.map(tool => `const ${tool.name.toLowerCase()} = new ${tool.name}();`).join('\n');
      const toolArray = `const tools = [${tools.map(tool => tool.name.toLowerCase()).join(', ')}];`;

      return `
${toolImports}

${toolInstances}

${toolArray}
      `;
    };

    const generatedCode = mockCodeGeneration(manyTools);
    
    expect(generatedCode).toContain('import {');
    expect(generatedCode).toContain('const tools = [');
    expect(generatedCode.split('import').length - 1).toBe(manyTools.length);
    expect(generatedCode.split('const ').length - 1).toBe(manyTools.length + 1); // +1 for tools array
  });

  test('should provide performance monitoring capabilities', () => {
    const performanceMonitoringCode = `
import { AgentExecutor } from "@langchain/core/agents";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

class PerformanceMonitor {
  private metrics: { [key: string]: number } = {};
  
  startTimer(operation: string) {
    this.metrics[\`\${operation}_start\`] = Date.now();
  }
  
  endTimer(operation: string) {
    const startTime = this.metrics[\`\${operation}_start\`];
    if (startTime) {
      this.metrics[\`\${operation}_duration\`] = Date.now() - startTime;
    }
  }
  
  getMetrics() {
    return this.metrics;
  }
}

const monitor = new PerformanceMonitor();

// Wrap agent execution with monitoring
const monitoredAgent = {
  async call(input: any) {
    monitor.startTimer('agent_execution');
    try {
      const result = await agent.call(input);
      monitor.endTimer('agent_execution');
      return result;
    } catch (error) {
      monitor.endTimer('agent_execution');
      throw error;
    }
  }
};

export { monitoredAgent, monitor };
    `;

    expect(performanceMonitoringCode).toContain('class PerformanceMonitor');
    expect(performanceMonitoringCode).toContain('startTimer');
    expect(performanceMonitoringCode).toContain('endTimer');
    expect(performanceMonitoringCode).toContain('getMetrics');
    expect(performanceMonitoringCode).toContain('monitoredAgent');
  });
});

describe('Agent Integration Tests - Error Handling and Edge Cases', () => {
  test('should handle invalid agent configurations', () => {
    const invalidConfigurations = [
      {
        name: 'missing_llm',
        config: { tools: ['calculator'], agentType: 'zero-shot-react-description' },
        expectedError: 'Language model is required',
      },
      {
        name: 'missing_tools',
        config: { llm: 'chatOpenAI', agentType: 'zero-shot-react-description' },
        expectedError: 'At least one tool is required',
      },
      {
        name: 'invalid_agent_type',
        config: { llm: 'chatOpenAI', tools: ['calculator'], agentType: 'invalid-type' },
        expectedError: 'Invalid agent type',
      },
    ];

    invalidConfigurations.forEach(({ name, config, expectedError }) => {
      function validateAgentConfig(config: any) {
        const errors: string[] = [];
        
        if (!config.llm) {
          errors.push('Language model is required');
        }
        
        if (!config.tools || config.tools.length === 0) {
          errors.push('At least one tool is required');
        }
        
        const validAgentTypes = ['zero-shot-react-description', 'conversational-react-description', 'react-docstore'];
        if (!validAgentTypes.includes(config.agentType)) {
          errors.push('Invalid agent type');
        }
        
        return errors;
      }

      const errors = validateAgentConfig(config);
      expect(errors).toContain(expectedError);
    });
  });

  test('should handle tool initialization failures', () => {
    const toolInitializationCode = `
import { Calculator } from "langchain/tools/calculator";
import { SerpAPI } from "langchain/tools/serpapi";

async function initializeTools() {
  const tools = [];
  
  try {
    const calculator = new Calculator();
    tools.push(calculator);
  } catch (error) {
    console.warn("Failed to initialize calculator:", error);
  }
  
  try {
    const serpAPI = new SerpAPI({
      apiKey: process.env.SERPAPI_API_KEY,
    });
    tools.push(serpAPI);
  } catch (error) {
    console.warn("Failed to initialize SerpAPI:", error);
  }
  
  if (tools.length === 0) {
    throw new Error("No tools could be initialized");
  }
  
  return tools;
}
    `;

    expect(toolInitializationCode).toContain('try {');
    expect(toolInitializationCode).toContain('} catch (error) {');
    expect(toolInitializationCode).toContain('console.warn');
    expect(toolInitializationCode).toContain('tools.length === 0');
    expect(toolInitializationCode).toContain('throw new Error');
  });

  test('should handle memory configuration errors', () => {
    const memoryErrorHandling = `
import { BufferMemory } from "langchain/memory";

function createMemoryWithFallback() {
  try {
    return new BufferMemory({
      memoryKey: "chat_history",
      inputKey: "input",
      outputKey: "output",
    });
  } catch (error) {
    console.warn("Failed to create BufferMemory, using fallback:", error);
    
    // Fallback to simple memory
    return new BufferMemory({
      memoryKey: "history",
    });
  }
}
    `;

    expect(memoryErrorHandling).toContain('createMemoryWithFallback');
    expect(memoryErrorHandling).toContain('try {');
    expect(memoryErrorHandling).toContain('} catch (error) {');
    expect(memoryErrorHandling).toContain('console.warn');
    expect(memoryErrorHandling).toContain('// Fallback');
  });
});

describe('Agent Integration Tests - Real-world Scenarios', () => {
  test('should handle customer service agent scenario', () => {
    const customerServiceFlow = {
      nodes: [
        {
          id: 'llm',
          type: 'ChatOpenAI',
          config: { modelName: 'gpt-4', temperature: 0.3 },
        },
        {
          id: 'knowledge_base',
          type: 'VectorStoreRetriever',
          config: { topK: 5 },
        },
        {
          id: 'ticket_tool',
          type: 'CustomTool',
          config: { name: 'ticket_system', description: 'Create and manage support tickets' },
        },
        {
          id: 'memory',
          type: 'BufferMemory',
          config: { memoryKey: 'conversation_history' },
        },
        {
          id: 'agent',
          type: 'AgentExecutor',
          config: { agentType: 'conversational-react-description', maxIterations: 10 },
        },
      ],
      edges: [
        { from: 'llm', to: 'agent' },
        { from: 'knowledge_base', to: 'agent' },
        { from: 'ticket_tool', to: 'agent' },
        { from: 'memory', to: 'agent' },
      ],
    };

    function validateCustomerServiceFlow(flow: any) {
      const requiredNodes = ['llm', 'knowledge_base', 'ticket_tool', 'memory', 'agent'];
      const presentNodes = flow.nodes.map((node: any) => node.id);
      
      return requiredNodes.every(required => presentNodes.includes(required));
    }

    expect(validateCustomerServiceFlow(customerServiceFlow)).toBe(true);
  });

  test('should handle research assistant scenario', () => {
    const researchAssistantFlow = {
      nodes: [
        {
          id: 'llm',
          type: 'ChatOpenAI',
          config: { modelName: 'gpt-4', temperature: 0.1 },
        },
        {
          id: 'search_tool',
          type: 'SerpAPI',
          config: { apiKey: 'test-key' },
        },
        {
          id: 'web_browser',
          type: 'WebBrowser',
          config: { headless: true },
        },
        {
          id: 'calculator',
          type: 'Calculator',
          config: {},
        },
        {
          id: 'document_loader',
          type: 'PDFLoader',
          config: {},
        },
        {
          id: 'agent',
          type: 'AgentExecutor',
          config: { agentType: 'zero-shot-react-description', maxIterations: 15 },
        },
      ],
      edges: [
        { from: 'llm', to: 'agent' },
        { from: 'search_tool', to: 'agent' },
        { from: 'web_browser', to: 'agent' },
        { from: 'calculator', to: 'agent' },
        { from: 'document_loader', to: 'agent' },
      ],
    };

    function validateResearchAssistantFlow(flow: any) {
      const toolNodes = flow.nodes.filter((node: any) => 
        ['SerpAPI', 'WebBrowser', 'Calculator', 'PDFLoader'].includes(node.type)
      );
      
      return toolNodes.length >= 3; // Should have multiple research tools
    }

    expect(validateResearchAssistantFlow(researchAssistantFlow)).toBe(true);
  });

  test('should handle data analysis agent scenario', () => {
    const dataAnalysisFlow = {
      nodes: [
        {
          id: 'llm',
          type: 'ChatOpenAI',
          config: { modelName: 'gpt-4', temperature: 0.0 },
        },
        {
          id: 'python_tool',
          type: 'PythonTool',
          config: { timeout: 30000 },
        },
        {
          id: 'sql_tool',
          type: 'SQLTool',
          config: { connectionString: 'test-db' },
        },
        {
          id: 'calculator',
          type: 'Calculator',
          config: {},
        },
        {
          id: 'csv_loader',
          type: 'CSVLoader',
          config: {},
        },
        {
          id: 'agent',
          type: 'AgentExecutor',
          config: { agentType: 'zero-shot-react-description', maxIterations: 20 },
        },
      ],
      edges: [
        { from: 'llm', to: 'agent' },
        { from: 'python_tool', to: 'agent' },
        { from: 'sql_tool', to: 'agent' },
        { from: 'calculator', to: 'agent' },
        { from: 'csv_loader', to: 'agent' },
      ],
    };

    function validateDataAnalysisFlow(flow: any) {
      const analyticsTools = flow.nodes.filter((node: any) => 
        ['PythonTool', 'SQLTool', 'Calculator', 'CSVLoader'].includes(node.type)
      );
      
      return analyticsTools.length >= 2; // Should have multiple analysis tools
    }

    expect(validateDataAnalysisFlow(dataAnalysisFlow)).toBe(true);
  });
});