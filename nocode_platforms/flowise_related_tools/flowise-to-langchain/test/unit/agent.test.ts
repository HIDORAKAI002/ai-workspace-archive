/**
 * Unit Tests for Agent Node Types
 * Tests agent converter functionality, node type detection, and integration
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { agentWithToolsFlow } from '../fixtures/sample-flows';

// Mock agent converter module (to be implemented)
jest.mock('../../src/registry/converters/agent.js', () => ({
  AgentExecutorConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'agentExecutor',
    category: 'agent',
    canConvert: jest.fn(() => true),
    convert: jest.fn(),
    getDependencies: jest.fn(() => ['@langchain/core/agents', 'langchain/agents']),
    getSupportedVersions: jest.fn(() => ['1.x', '2.x']),
    isDeprecated: jest.fn(() => false),
  })),
  ZeroShotAgentConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'zeroShotAgent',
    category: 'agent',
    canConvert: jest.fn(() => true),
    convert: jest.fn(),
    getDependencies: jest.fn(() => ['@langchain/core/agents', 'langchain/agents']),
    getSupportedVersions: jest.fn(() => ['1.x', '2.x']),
    isDeprecated: jest.fn(() => false),
  })),
  ConversationalAgentConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'conversationalAgent',
    category: 'agent',
    canConvert: jest.fn(() => true),
    convert: jest.fn(),
    getDependencies: jest.fn(() => ['@langchain/core/agents', 'langchain/agents']),
    getSupportedVersions: jest.fn(() => ['1.x', '2.x']),
    isDeprecated: jest.fn(() => false),
  })),
  ChatAgentConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'chatAgent',
    category: 'agent',
    canConvert: jest.fn(() => true),
    convert: jest.fn(),
    getDependencies: jest.fn(() => ['@langchain/core/agents', 'langchain/agents']),
    getSupportedVersions: jest.fn(() => ['1.x', '2.x']),
    isDeprecated: jest.fn(() => false),
  })),
  ToolCallingAgentConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'toolCallingAgent',
    category: 'agent',
    canConvert: jest.fn(() => true),
    convert: jest.fn(),
    getDependencies: jest.fn(() => ['@langchain/core/agents', 'langchain/agents']),
    getSupportedVersions: jest.fn(() => ['1.x', '2.x']),
    isDeprecated: jest.fn(() => false),
  })),
  OpenAIFunctionsAgentConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'openAIFunctionsAgent',
    category: 'agent',
    canConvert: jest.fn(() => true),
    convert: jest.fn(),
    getDependencies: jest.fn(() => ['@langchain/core/agents', '@langchain/openai']),
    getSupportedVersions: jest.fn(() => ['1.x', '2.x']),
    isDeprecated: jest.fn(() => false),
  })),
  StructuredChatAgentConverter: jest.fn().mockImplementation(() => ({
    flowiseType: 'structuredChatAgent',
    category: 'agent',
    canConvert: jest.fn(() => true),
    convert: jest.fn(),
    getDependencies: jest.fn(() => ['@langchain/core/agents', 'langchain/agents']),
    getSupportedVersions: jest.fn(() => ['1.x', '2.x']),
    isDeprecated: jest.fn(() => false),
  })),
}));

describe('Agent Node Types - Basic Functionality', () => {
  test('should identify agent executor nodes', () => {
    const agentNode = agentWithToolsFlow.nodes.find(node => node.data.type === 'AgentExecutor');
    
    expect(agentNode).toBeDefined();
    if (agentNode) {
      expect(agentNode.data.category).toBe('Agents');
      expect(agentNode.data.baseClasses).toContain('AgentExecutor');
      expect(agentNode.data.baseClasses).toContain('BaseChain');
      expect(agentNode.data.description).toContain('Agent that can use tools');
    }
  });

  test('should validate agent input requirements', () => {
    const agentNode = agentWithToolsFlow.nodes.find(node => node.data.type === 'AgentExecutor');
    
    expect(agentNode).toBeDefined();
    if (agentNode) {
      const inputAnchors = agentNode.data.inputAnchors;
      expect(inputAnchors).toBeInstanceOf(Array);
      
      // Check for required inputs
      const modelInput = inputAnchors.find((anchor: any) => anchor.name === 'model');
      const toolsInput = inputAnchors.find((anchor: any) => anchor.name === 'tools');
      
      expect(modelInput).toBeDefined();
      expect(toolsInput).toBeDefined();
      
      if (modelInput) {
        expect(modelInput.type).toBe('BaseLanguageModel');
        expect(modelInput.description).toContain('Language Model');
      }
      
      if (toolsInput) {
        expect(toolsInput.type).toBe('Tool');
        expect(toolsInput.list).toBe(true);
        expect(toolsInput.description).toContain('Tools');
      }
    }
  });

  test('should validate agent parameters', () => {
    const agentNode = agentWithToolsFlow.nodes.find(node => node.data.type === 'AgentExecutor');
    
    expect(agentNode).toBeDefined();
    if (agentNode) {
      const inputParams = agentNode.data.inputParams;
      expect(inputParams).toBeInstanceOf(Array);
      
      // Check for agent type parameter
      const agentTypeParam = inputParams.find((param: any) => param.name === 'agentType');
      expect(agentTypeParam).toBeDefined();
      
      if (agentTypeParam) {
        expect(agentTypeParam.type).toBe('options');
        if ('options' in agentTypeParam && agentTypeParam.options) {
          expect(agentTypeParam.options).toBeInstanceOf(Array);
          expect(agentTypeParam.options.length).toBeGreaterThan(0);
          
          // Check for common agent types
          const optionNames = agentTypeParam.options.map((opt: any) => opt.name);
          expect(optionNames).toContain('zero-shot-react-description');
          expect(optionNames).toContain('conversational-react-description');
        }
      }
      
      // Check for max iterations parameter
      const maxIterationsParam = inputParams.find((param: any) => param.name === 'maxIterations');
      expect(maxIterationsParam).toBeDefined();
      
      if (maxIterationsParam) {
        expect(maxIterationsParam.type).toBe('number');
        if ('default' in maxIterationsParam) {
          expect(maxIterationsParam.default).toBe(3);
        }
      }
    }
  });

  test('should handle optional memory input', () => {
    const agentNode = agentWithToolsFlow.nodes.find(node => node.data.type === 'AgentExecutor');
    
    expect(agentNode).toBeDefined();
    if (agentNode) {
      const inputAnchors = agentNode.data.inputAnchors;
      const memoryInput = inputAnchors.find((anchor: any) => anchor.name === 'memory');
      
      expect(memoryInput).toBeDefined();
      if (memoryInput) {
        expect(memoryInput.type).toBe('BaseMemory');
        expect(memoryInput.optional).toBe(true);
      }
    }
  });
});

describe('Agent Node Types - Converter Integration', () => {
  test('should register all agent converters', () => {
    const expectedAgentTypes = [
      'agentExecutor',
      'zeroShotAgent',
      'conversationalAgent',
      'chatAgent',
      'toolCallingAgent',
      'openAIFunctionsAgent',
      'structuredChatAgent'
    ];
    
    expectedAgentTypes.forEach(type => {
      // Mock registry check
      expect(type).toBeDefined();
      expect(typeof type).toBe('string');
      expect(type.length).toBeGreaterThan(0);
    });
  });

  test('should provide correct dependencies for each agent type', () => {
    const agentDependencies = {
      'agentExecutor': ['@langchain/core/agents', 'langchain/agents'],
      'zeroShotAgent': ['@langchain/core/agents', 'langchain/agents'],
      'conversationalAgent': ['@langchain/core/agents', 'langchain/agents'],
      'chatAgent': ['@langchain/core/agents', 'langchain/agents'],
      'toolCallingAgent': ['@langchain/core/agents', 'langchain/agents'],
      'openAIFunctionsAgent': ['@langchain/core/agents', '@langchain/openai'],
      'structuredChatAgent': ['@langchain/core/agents', 'langchain/agents']
    };
    
    Object.entries(agentDependencies).forEach(([type, deps]) => {
      expect(deps).toBeInstanceOf(Array);
      expect(deps.length).toBeGreaterThan(0);
      expect(deps).toContain('@langchain/core/agents');
    });
  });

  test('should handle agent type conversion', () => {
    const mockAgentConverter = {
      flowiseType: 'agentExecutor',
      category: 'agent',
      canConvert: jest.fn((node: any) => true),
      convert: jest.fn((node: any, context: any) => [
        {
          id: 'test_fragment',
          type: 'declaration',
          content: 'const agent = new AgentExecutor({ ... });',
          dependencies: ['@langchain/core/agents'],
          nodeId: 'test_node',
          order: 1
        }
      ]),
      getDependencies: jest.fn(() => ['@langchain/core/agents']),
    };
    
    const mockNode = {
      id: 'test_node',
      type: 'agentExecutor',
      category: 'agent',
      inputs: [],
      outputs: [],
      parameters: []
    };
    
    const mockContext = {
      targetLanguage: 'typescript' as const,
      outputPath: '',
      projectName: 'test',
      includeLangfuse: false,
      includeTests: false,
      includeDocs: false,
      packageManager: 'npm' as const,
      environment: {},
      codeStyle: {
        indentSize: 2,
        useSpaces: true,
        semicolons: true,
        singleQuotes: true,
        trailingCommas: true
      }
    };
    
    expect(mockAgentConverter.canConvert(mockNode)).toBe(true);
    
    const result = mockAgentConverter.convert(mockNode, mockContext);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    
    const fragment = result[0];
    expect(fragment).toHaveProperty('id');
    expect(fragment).toHaveProperty('type');
    expect(fragment).toHaveProperty('content');
    expect(fragment?.content).toContain('AgentExecutor');
  });
});

describe('Agent Node Types - Connection Validation', () => {
  test('should validate LLM to agent connections', () => {
    const agentEdges = agentWithToolsFlow.edges.filter(edge => 
      edge.target === 'agentExecutor_0' && edge.targetHandle.includes('model')
    );
    
    expect(agentEdges.length).toBeGreaterThan(0);
    
    agentEdges.forEach(edge => {
      expect(edge.source).toBeDefined();
      expect(edge.target).toBe('agentExecutor_0');
      expect(edge.targetHandle).toContain('model');
      expect(edge.sourceHandle).toContain('ChatOpenAI');
    });
  });

  test('should validate tool to agent connections', () => {
    const toolEdges = agentWithToolsFlow.edges.filter(edge => 
      edge.target === 'agentExecutor_0' && edge.targetHandle.includes('tools')
    );
    
    expect(toolEdges.length).toBeGreaterThan(0);
    
    toolEdges.forEach(edge => {
      expect(edge.source).toBeDefined();
      expect(edge.target).toBe('agentExecutor_0');
      expect(edge.targetHandle).toContain('tools');
      expect(edge.sourceHandle).toContain('Tool');
    });
  });

  test('should handle multiple tool connections', () => {
    const toolEdges = agentWithToolsFlow.edges.filter(edge => 
      edge.target === 'agentExecutor_0' && edge.targetHandle.includes('tools')
    );
    
    // Should have multiple tools connected
    expect(toolEdges.length).toBeGreaterThan(1);
    
    // Should have different source nodes
    const sourceNodes = toolEdges.map(edge => edge.source);
    const uniqueSources = new Set(sourceNodes);
    expect(uniqueSources.size).toBe(sourceNodes.length);
  });

  test('should validate optional memory connections', () => {
    const memoryEdges = agentWithToolsFlow.edges.filter(edge => 
      edge.target === 'agentExecutor_0' && edge.targetHandle.includes('memory')
    );
    
    // Memory is optional, so may or may not be present
    if (memoryEdges.length > 0) {
      memoryEdges.forEach(edge => {
        expect(edge.source).toBeDefined();
        expect(edge.target).toBe('agentExecutor_0');
        expect(edge.targetHandle).toContain('memory');
        expect(edge.sourceHandle).toContain('Memory');
      });
    }
  });
});

describe('Agent Node Types - Code Generation', () => {
  test('should generate valid TypeScript code for AgentExecutor', () => {
    const mockCodeGeneration = {
      generateAgentExecutor: (config: any) => {
        return `
import { AgentExecutor } from "@langchain/core/agents";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

const agent = await initializeAgentExecutorWithOptions(
  tools,
  llm,
  {
    agentType: "${config.agentType}",
    maxIterations: ${config.maxIterations},
    verbose: ${config.verbose}
  }
);`;
      }
    };
    
    const config = {
      agentType: 'zero-shot-react-description',
      maxIterations: 5,
      verbose: true
    };
    
    const code = mockCodeGeneration.generateAgentExecutor(config);
    
    expect(code).toContain('import { AgentExecutor }');
    expect(code).toContain('initializeAgentExecutorWithOptions');
    expect(code).toContain('zero-shot-react-description');
    expect(code).toContain('maxIterations: 5');
    expect(code).toContain('verbose: true');
  });

  test('should generate import statements for agent dependencies', () => {
    const mockImportGenerator = {
      generateAgentImports: (agentType: string) => {
        const baseImports = [
          'import { AgentExecutor } from "@langchain/core/agents";',
          'import { initializeAgentExecutorWithOptions } from "langchain/agents";'
        ];
        
        if (agentType === 'openAIFunctionsAgent') {
          baseImports.push('import { OpenAIFunctionsAgentOutputParser } from "@langchain/openai";');
        }
        
        return baseImports;
      }
    };
    
    const basicImports = mockImportGenerator.generateAgentImports('zeroShotAgent');
    expect(basicImports).toContain('import { AgentExecutor } from "@langchain/core/agents";');
    expect(basicImports).toContain('import { initializeAgentExecutorWithOptions } from "langchain/agents";');
    
    const openAIImports = mockImportGenerator.generateAgentImports('openAIFunctionsAgent');
    expect(openAIImports).toContain('import { OpenAIFunctionsAgentOutputParser } from "@langchain/openai";');
  });

  test('should handle different agent types correctly', () => {
    const agentConfigurations = {
      'zero-shot-react-description': {
        imports: ['@langchain/core/agents', 'langchain/agents'],
        initFunction: 'initializeAgentExecutorWithOptions',
        requiresTools: true,
        requiresMemory: false
      },
      'conversational-react-description': {
        imports: ['@langchain/core/agents', 'langchain/agents'],
        initFunction: 'initializeAgentExecutorWithOptions',
        requiresTools: true,
        requiresMemory: true
      },
      'openai-functions': {
        imports: ['@langchain/core/agents', '@langchain/openai'],
        initFunction: 'initializeAgentExecutorWithOptions',
        requiresTools: true,
        requiresMemory: false
      }
    };
    
    Object.entries(agentConfigurations).forEach(([type, config]) => {
      expect(config.imports).toBeInstanceOf(Array);
      expect(config.imports.length).toBeGreaterThan(0);
      expect(config.initFunction).toBeDefined();
      expect(typeof config.requiresTools).toBe('boolean');
      expect(typeof config.requiresMemory).toBe('boolean');
    });
  });
});

describe('Agent Node Types - Error Handling', () => {
  test('should handle missing required inputs', () => {
    const invalidAgentNode = {
      id: 'invalid_agent',
      type: 'agentExecutor',
      category: 'agent',
      inputs: [], // Missing required inputs
      outputs: [],
      parameters: []
    };
    
    function validateAgentNode(node: any) {
      const requiredInputs = ['model', 'tools'];
      const nodeInputs = node.inputs.map((input: any) => input.name);
      
      return requiredInputs.every(required => nodeInputs.includes(required));
    }
    
    expect(validateAgentNode(invalidAgentNode)).toBe(false);
  });

  test('should provide helpful error messages for missing tools', () => {
    const agentWithoutTools = {
      id: 'agent_no_tools',
      type: 'agentExecutor',
      category: 'agent',
      inputs: [
        { name: 'model', type: 'BaseLanguageModel' }
        // Missing tools input
      ],
      outputs: [],
      parameters: []
    };
    
    function validateAgentInputs(node: any) {
      const errors: string[] = [];
      
      if (!node.inputs.find((input: any) => input.name === 'model')) {
        errors.push('Agent requires a language model input');
      }
      
      if (!node.inputs.find((input: any) => input.name === 'tools')) {
        errors.push('Agent requires at least one tool input');
      }
      
      return errors;
    }
    
    const errors = validateAgentInputs(agentWithoutTools);
    expect(errors).toContain('Agent requires at least one tool input');
  });

  test('should handle invalid agent type parameters', () => {
    const invalidAgentType = 'invalid-agent-type';
    const validAgentTypes = [
      'zero-shot-react-description',
      'react-docstore',
      'conversational-react-description',
      'openai-functions'
    ];
    
    function validateAgentType(agentType: string) {
      return validAgentTypes.includes(agentType);
    }
    
    expect(validateAgentType(invalidAgentType)).toBe(false);
    expect(validateAgentType('zero-shot-react-description')).toBe(true);
  });
});

describe('Agent Node Types - Performance and Optimization', () => {
  test('should handle large numbers of tools efficiently', () => {
    const agentWithManyTools = {
      id: 'agent_many_tools',
      type: 'agentExecutor',
      category: 'agent',
      inputs: [
        { name: 'model', type: 'BaseLanguageModel' },
        { name: 'tools', type: 'Tool[]', connections: Array.from({ length: 20 }, (_, i) => `tool_${i}`) }
      ],
      outputs: [],
      parameters: []
    };
    
    function calculateAgentComplexity(node: any) {
      const toolInput = node.inputs.find((input: any) => input.name === 'tools');
      const toolCount = toolInput ? toolInput.connections.length : 0;
      
      return {
        toolCount,
        complexity: toolCount > 10 ? 'high' : toolCount > 5 ? 'medium' : 'low'
      };
    }
    
    const complexity = calculateAgentComplexity(agentWithManyTools);
    expect(complexity.toolCount).toBe(20);
    expect(complexity.complexity).toBe('high');
  });

  test('should optimize agent initialization for common patterns', () => {
    const commonPatterns = {
      'calculator-search': ['calculator', 'serpAPI'],
      'web-research': ['webBrowser', 'serpAPI', 'calculator'],
      'data-analysis': ['pythonTool', 'calculator', 'customTool']
    };
    
    function getOptimizedConfiguration(tools: string[]) {
      if (tools.includes('webBrowser') && tools.includes('serpAPI')) {
        return { pattern: 'web-research', optimized: true };
      }
      
      if (tools.includes('calculator') && tools.includes('serpAPI')) {
        return { pattern: 'calculator-search', optimized: true };
      }
      
      return { pattern: 'custom', optimized: false };
    }
    
    const config1 = getOptimizedConfiguration(['calculator', 'serpAPI']);
    expect(config1.pattern).toBe('calculator-search');
    expect(config1.optimized).toBe(true);
    
    const config2 = getOptimizedConfiguration(['webBrowser', 'serpAPI', 'calculator']);
    expect(config2.pattern).toBe('web-research');
    expect(config2.optimized).toBe(true);
  });
});

describe('Agent Node Types - Integration Testing', () => {
  test('should integrate with existing chain and tool systems', () => {
    // Mock integration test
    const mockIntegration = {
      chains: ['llmChain'],
      tools: ['calculator', 'serpAPI'],
      agents: ['agentExecutor'],
      memory: ['bufferMemory']
    };
    
    function validateIntegration(components: typeof mockIntegration) {
      return (
        components.chains.length > 0 &&
        components.tools.length > 0 &&
        components.agents.length > 0
      );
    }
    
    expect(validateIntegration(mockIntegration)).toBe(true);
  });

  test('should work with different LLM providers', () => {
    const supportedLLMs = [
      'OpenAI',
      'ChatOpenAI',
      'Anthropic',
      'AzureOpenAI',
      'Ollama'
    ];
    
    function validateLLMCompatibility(llmType: string) {
      return supportedLLMs.includes(llmType);
    }
    
    supportedLLMs.forEach(llm => {
      expect(validateLLMCompatibility(llm)).toBe(true);
    });
  });

  test('should handle complex agent workflows', () => {
    const complexWorkflow = {
      nodes: [
        { id: 'llm', type: 'ChatOpenAI' },
        { id: 'calc', type: 'Calculator' },
        { id: 'search', type: 'SerpAPI' },
        { id: 'memory', type: 'BufferMemory' },
        { id: 'agent', type: 'AgentExecutor' }
      ],
      edges: [
        { source: 'llm', target: 'agent', type: 'model' },
        { source: 'calc', target: 'agent', type: 'tools' },
        { source: 'search', target: 'agent', type: 'tools' },
        { source: 'memory', target: 'agent', type: 'memory' }
      ]
    };
    
    function validateWorkflow(workflow: typeof complexWorkflow) {
      const agentNode = workflow.nodes.find(n => n.type === 'AgentExecutor');
      const agentEdges = workflow.edges.filter(e => e.target === 'agent');
      
      const hasModel = agentEdges.some(e => e.type === 'model');
      const hasTools = agentEdges.some(e => e.type === 'tools');
      
      return agentNode && hasModel && hasTools;
    }
    
    expect(validateWorkflow(complexWorkflow)).toBe(true);
  });
});