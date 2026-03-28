/**
 * AgentFlow V2 Converters Test Suite
 * Comprehensive tests for all AgentFlow V2 node converters
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  AgentNodeConverter,
  ToolNodeConverter,
  CustomFunctionNodeConverter,
  SubflowNodeConverter,
} from '../../src/registry/converters/agentflow-v2.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('AgentFlow V2 Converters', () => {
  let context: GenerationContext;

  // Helper function to create properly formatted test nodes
  const createTestNode = (
    id: string,
    type: string,
    label: string,
    data: Record<string, any>,
    category: IRNode['category'] = 'agent'
  ): IRNode => ({
    id,
    type,
    label,
    category,
    inputs: [],
    outputs: [],
    parameters: [],
    position: { x: 100, y: 100 },
    data,
    metadata: {
      version: '1.0.0',
    },
  });

  beforeEach(() => {
    context = {
      mode: 'typescript',
      packageManager: 'npm',
      exportFormat: 'es6',
      target: 'node',
      version: '1.0.0',
      dependencies: new Set(),
      metadata: {
        flowName: 'test-flow',
        version: '1.0.0',
        description: 'Test flow for AgentFlow V2',
        author: 'Test Suite',
        tags: ['test', 'agentflow-v2'],
        timestamp: Date.now(),
      },
    };
  });

  describe('AgentNodeConverter', () => {
    let converter: AgentNodeConverter;

    beforeEach(() => {
      converter = new AgentNodeConverter();
    });

    it('should have correct properties', () => {
      expect(converter.flowiseType).toBe('agentNode');
      expect(converter.category).toBe('agentflow-v2');
    });

    it('should convert basic agent node', () => {
      const node = createTestNode('agent-1', 'agentNode', 'TestAgent', {
        name: 'TestAgent',
        llm: 'openai-gpt4',
        tools: ['calculator', 'search'],
        maxIterations: 5,
        verbose: true,
      });

      const fragments = converter.convert(node, context);
      expect(fragments).toHaveLength(3); // import, init, and potentially post-init

      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment?.content).toContain('AgentExecutor');
      expect(importFragment?.content).toContain('createOpenAIFunctionsAgent');

      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('testagent_agent_node');
      expect(initFragment?.content).toContain('AgentExecutor');
    });

    it('should handle advanced agent configuration', () => {
      const node = createTestNode('agent-2', 'agentNode', 'AdvancedAgent', {
        name: 'AdvancedAgent',
        llm: 'openai-gpt4',
        tools: ['calculator', 'search'],
        maxIterations: 10,
        agentType: 'openai-functions',
        enableCallbacks: true,
        dynamicTools: true,
        planningStrategy: 'reactive',
        errorHandlingStrategy: 'continue',
        maxExecutionTime: 60000,
      });

      const fragments = converter.convert(node, context);
      const setupFragment = fragments.find(f => f.type === 'setup');
      expect(setupFragment).toBeDefined();
      expect(setupFragment?.content).toContain('CallbackManager');
      expect(setupFragment?.content).toContain('dynamic tool loading');
    });

    it('should validate agent configuration', () => {
      const node = createTestNode('agent-3', 'agentNode', 'InvalidAgent', {
        name: 'InvalidAgent',
        maxIterations: 150, // Invalid: too high
        agentType: 'invalid-type', // Invalid type
      });

      const validation = converter.validateConfiguration(node);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('maxIterations must be a number between 1 and 100');
      expect(validation.errors).toContain('Unsupported agent type: invalid-type');
    });

    it('should get correct dependencies', () => {
      const node = createTestNode('agent-4', 'agentNode', 'TestAgent', {
        name: 'TestAgent',
        llm: 'openai-gpt4',
        tools: ['calculator'],
        memory: 'buffer-memory',
        enableCallbacks: true,
        agentType: 'openai-functions',
      });

      const deps = converter.getDependencies(node, context);
      expect(deps).toContain('langchain');
      expect(deps).toContain('@langchain/core');
      expect(deps).toContain('@langchain/core/memory');
      expect(deps).toContain('@langchain/core/callbacks');
      expect(deps).toContain('@langchain/openai');
    });

    it('should check canConvert correctly', () => {
      const validNode = createTestNode('agent-5', 'agentNode', 'ValidAgent', {
        llm: 'openai-gpt4',
        tools: ['calculator'],
      });

      const invalidNode = createTestNode('agent-6', 'agentNode', 'InvalidAgent', {
        // Missing llm and tools
      });

      expect(converter.canConvert(validNode)).toBe(true);
      expect(converter.canConvert(invalidNode)).toBe(false);
    });
  });

  describe('ToolNodeConverter', () => {
    let converter: ToolNodeConverter;

    beforeEach(() => {
      converter = new ToolNodeConverter();
    });

    it('should have correct properties', () => {
      expect(converter.flowiseType).toBe('toolNode');
      expect(converter.category).toBe('agentflow-v2');
    });

    it('should convert basic tool node', () => {
      const node = createTestNode('tool-1', 'toolNode', 'calculator', {
        name: 'calculator',
        description: 'A calculator tool',
        func: 'function(input) { return eval(input); }',
        returnDirect: false,
      }, 'tool');

      const fragments = converter.convert(node, context);
      expect(fragments).toHaveLength(3); // import, init, and post-init

      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment?.content).toContain('DynamicTool');

      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('calculator_tool_node');
      expect(initFragment?.content).toContain('DynamicTool');
    });

    it('should handle advanced tool configuration with validation', () => {
      const node = createTestNode('tool-2', 'toolNode', 'advanced_calculator', {
        name: 'advanced_calculator',
        description: 'Advanced calculator with validation',
        func: 'function(input) { return parseFloat(input) * 2; }',
        async: true,
        inputSchema: {
          number: { type: 'number', description: 'Input number' },
        },
        outputSchema: {
          result: { type: 'number', description: 'Calculation result' },
        },
        validateInput: true,
        validateOutput: true,
        enableRetry: true,
        maxRetries: 3,
        timeout: 5000,
        enableLogging: true,
      }, 'tool');

      const fragments = converter.convert(node, context);
      
      const additionalImportsFragment = fragments.find(f => f.type === 'import' && f.id.includes('additional'));
      expect(additionalImportsFragment).toBeDefined();
      expect(additionalImportsFragment?.content).toContain('zod');
      expect(additionalImportsFragment?.content).toContain('AsyncRetrier');

      const setupFragment = fragments.find(f => f.type === 'setup');
      expect(setupFragment).toBeDefined();
      expect(setupFragment?.content).toContain('inputSchema');
      expect(setupFragment?.content).toContain('outputSchema');
      expect(setupFragment?.content).toContain('retrier');

      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('async (input: string');
      expect(initFragment?.content).toContain('Validate input');
      expect(initFragment?.content).toContain('Validate output');
    });

    it('should validate tool configuration', () => {
      const invalidNode = createTestNode('tool-3', 'toolNode', 'invalid_tool', {
        name: '', // Invalid: empty name
        func: null, // Invalid: no function
        timeout: -1, // Invalid: negative timeout
        maxRetries: 15, // Invalid: too many retries
      }, 'tool');

      const validation = converter.validateConfiguration(invalidNode);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Tool name is required and must be a non-empty string');
      expect(validation.errors).toContain('Tool function is required');
      expect(validation.errors).toContain('Timeout must be a non-negative number');
      expect(validation.errors).toContain('maxRetries must be a number between 0 and 10');
    });

    it('should get correct dependencies with schemas', () => {
      const node = createTestNode('tool-4', 'toolNode', 'schema_tool', {
        name: 'schema_tool',
        func: 'function(input) { return input; }',
        inputSchema: { name: { type: 'string' } },
        outputSchema: { result: { type: 'string' } },
        async: true,
        enableRetry: true,
      }, 'tool');

      const deps = converter.getDependencies(node, context);
      expect(deps).toContain('@langchain/core');
      expect(deps).toContain('zod');
      expect(deps).toContain('@langchain/core/callbacks');
      expect(deps).toContain('@langchain/core/utils');
    });
  });

  describe('CustomFunctionNodeConverter', () => {
    let converter: CustomFunctionNodeConverter;

    beforeEach(() => {
      converter = new CustomFunctionNodeConverter();
    });

    it('should have correct properties', () => {
      expect(converter.flowiseType).toBe('customFunctionNode');
      expect(converter.category).toBe('agentflow-v2');
    });

    it('should convert basic custom function node', () => {
      const node = createTestNode('function-1', 'customFunctionNode', 'dataProcessor', {
        name: 'dataProcessor',
        code: 'return input.toUpperCase();',
        async: false,
      }, 'utility');

      const fragments = converter.convert(node, context);
      expect(fragments.length).toBeGreaterThanOrEqual(2); // At least import and init

      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment?.content).toContain('RunnableLambda');

      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('dataProcessor');
      expect(initFragment?.content).toContain('return input.toUpperCase()');
    });

    it('should handle advanced custom function with state and validation', () => {
      const node = createTestNode('function-2', 'customFunctionNode', 'advanced_processor', {
        name: 'advanced_processor',
        code: 'state.counter += 1; return { result: input * state.counter, counter: state.counter };',
        async: true,
        enableState: true,
        stateVariables: { counter: 0 },
        enableContext: true,
        enableErrorHandling: true,
        errorStrategy: 'fallback',
        fallbackValue: { error: 'Processing failed' },
        timeout: 15000,
        enableMetrics: true,
        inputSchema: {
          value: { type: 'number', description: 'Input value' },
        },
        outputSchema: {
          result: { type: 'number', description: 'Processed result' },
          counter: { type: 'number', description: 'Current counter' },
        },
        validateInput: true,
        validateOutput: true,
      }, 'utility');

      const fragments = converter.convert(node, context);
      
      const additionalImportsFragment = fragments.find(f => f.type === 'import' && f.id.includes('additional'));
      expect(additionalImportsFragment).toBeDefined();
      expect(additionalImportsFragment?.content).toContain('zod');
      expect(additionalImportsFragment?.content).toContain('RunnablePassthrough');
      expect(additionalImportsFragment?.content).toContain('CallbackManagerForChainRun');

      const setupFragment = fragments.find(f => f.type === 'setup');
      expect(setupFragment).toBeDefined();
      expect(setupFragment?.content).toContain('inputSchema');
      expect(setupFragment?.content).toContain('outputSchema');
      expect(setupFragment?.content).toContain('State management');
      expect(setupFragment?.content).toContain('Error handling');

      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('async (input: any, config?: RunnableConfig)');
      expect(initFragment?.content).toContain('Validate input');
      expect(initFragment?.content).toContain('Initialize state');
      expect(initFragment?.content).toContain('Prepare execution context');
      expect(initFragment?.content).toContain('Timeout wrapper');
      expect(initFragment?.content).toContain('fallbackValue');
    });

    it('should validate custom function configuration', () => {
      const invalidNode = createTestNode('function-3', 'customFunctionNode', 'invalid_function', {
        code: '', // Invalid: empty code
        timeout: 400000, // Invalid: too high timeout
        stateScope: 'invalid-scope', // Invalid scope
        errorStrategy: 'unknown-strategy', // Invalid strategy
        inputSchema: 'not-an-object', // Invalid schema type
      }, 'utility');

      const validation = converter.validateConfiguration(invalidNode);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Function code is required and must be a non-empty string');
      expect(validation.errors).toContain('Timeout must be a number between 0 and 300000ms (5 minutes)');
      expect(validation.errors).toContain('Unsupported state scope: invalid-scope');
      expect(validation.errors).toContain('Unsupported error strategy: unknown-strategy');
      expect(validation.errors).toContain('Input schema must be an object');
    });

    it('should get supported scopes and modes', () => {
      expect(converter.getSupportedStateScopes()).toEqual([
        'local',
        'global',
        'session',
        'persistent'
      ]);

      expect(converter.getSupportedExecutionModes()).toEqual([
        'synchronous',
        'asynchronous',
        'streaming',
        'batch'
      ]);
    });
  });

  describe('SubflowNodeConverter', () => {
    let converter: SubflowNodeConverter;

    beforeEach(() => {
      converter = new SubflowNodeConverter();
    });

    it('should have correct properties', () => {
      expect(converter.flowiseType).toBe('subflowNode');
      expect(converter.category).toBe('agentflow-v2');
    });

    it('should convert basic subflow node', () => {
      const node = createTestNode('subflow-1', 'subflowNode', 'dataProcessing', {
        subflowId: 'nested-workflow-1',
        subflowName: 'dataProcessing',
        parallel: false,
      }, 'control_flow');

      const fragments = converter.convert(node, context);
      expect(fragments.length).toBeGreaterThanOrEqual(2); // At least import and init

      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment?.content).toContain('RunnableSequence');

      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('RunnableSequence.from');
      expect(initFragment?.content).toContain('SUBFLOW_STEPS_PLACEHOLDER');
    });

    it('should handle parallel subflow execution', () => {
      const node = createTestNode('subflow-2', 'subflowNode', 'parallelProcessing', {
        subflowId: 'parallel-workflow-1',
        subflowName: 'parallelProcessing',
        parallel: true,
        maxConcurrency: 3,
        failFast: true,
      }, 'control_flow');

      const fragments = converter.convert(node, context);
      
      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('Create parallel subflow execution');
      expect(initFragment?.content).toContain('RunnableParallel.from');
    });

    it('should handle conditional subflow execution', () => {
      const node = createTestNode('subflow-3', 'subflowNode', 'conditionalProcessing', {
        subflowId: 'conditional-workflow-1',
        subflowName: 'conditionalProcessing',
        enableConditional: true,
        conditionCode: 'input.shouldProcess === true',
        fallbackSubflow: 'fallback-workflow-1',
        inputMapping: { data: 'processData' },
        outputMapping: { result: 'finalResult' },
      }, 'control_flow');

      const fragments = converter.convert(node, context);
      
      const additionalImportsFragment = fragments.find(f => f.type === 'import' && f.id.includes('additional'));
      expect(additionalImportsFragment).toBeDefined();
      expect(additionalImportsFragment?.content).toContain('RunnableBranch');

      const setupFragment = fragments.find(f => f.type === 'setup');
      expect(setupFragment).toBeDefined();
      expect(setupFragment?.content).toContain('Input mapping');
      expect(setupFragment?.content).toContain('Output mapping');
      expect(setupFragment?.content).toContain('Conditional execution logic');
      expect(setupFragment?.content).toContain('input.shouldProcess === true');

      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('RunnableBranch');
    });

    it('should handle error handling and retry configuration', () => {
      const node = createTestNode('subflow-4', 'subflowNode', 'resilientProcessing', {
        subflowId: 'resilient-workflow-1',
        subflowName: 'resilientProcessing',
        enableErrorHandling: true,
        errorStrategy: 'fallback',
        fallbackSubflow: 'error-recovery-workflow',
        enableRetry: true,
        maxRetries: 2,
        retryDelay: 2000,
        timeout: 30000,
      }, 'control_flow');

      const fragments = converter.convert(node, context);
      
      const setupFragment = fragments.find(f => f.type === 'setup');
      expect(setupFragment).toBeDefined();
      expect(setupFragment?.content).toContain('Retry configuration');
      expect(setupFragment?.content).toContain('maxRetries: 2');
      expect(setupFragment?.content).toContain('retryDelay: 2000');

      const initFragment = fragments.find(f => f.type === 'initialization' && f.id.includes('_init'));
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('Add error handling with fallback');
      expect(initFragment?.content).toContain('Add retry capability');
      expect(initFragment?.content).toContain('withFallbacks');
      expect(initFragment?.content).toContain('withRetry');
    });

    it('should validate subflow configuration', () => {
      const invalidNode = createTestNode('subflow-5', 'subflowNode', 'invalid_subflow', {
        subflowId: '', // Invalid: empty ID
        timeout: 700000, // Invalid: too high timeout
        stateScope: 'invalid-scope', // Invalid scope
        errorStrategy: 'unknown-strategy', // Invalid strategy
        maxConcurrency: 25, // Invalid: too high concurrency
        inputMapping: 'not-an-object', // Invalid mapping type
      }, 'control_flow');

      const validation = converter.validateConfiguration(invalidNode);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Subflow ID is required and must be a non-empty string');
      expect(validation.errors).toContain('Timeout must be between 1000ms and 600000ms (10 minutes)');
      expect(validation.errors).toContain('Unsupported state scope: invalid-scope');
      expect(validation.errors).toContain('Unsupported error strategy: unknown-strategy');
      expect(validation.errors).toContain('maxConcurrency must be between 1 and 20 for parallel execution');
      expect(validation.errors).toContain('Input mapping must be an object');
    });

    it('should get supported modes and scopes', () => {
      expect(converter.getSupportedExecutionModes()).toEqual([
        'sequential',
        'parallel',
        'conditional',
        'hybrid'
      ]);

      expect(converter.getSupportedStateScopes()).toEqual([
        'subflow',
        'parent',
        'global',
        'isolated'
      ]);
    });

    it('should check canConvert correctly', () => {
      const validNode = createTestNode('subflow-6', 'subflowNode', 'valid_subflow', {
        subflowId: 'valid-workflow-id',
      }, 'control_flow');

      const invalidNode = createTestNode('subflow-7', 'subflowNode', 'invalid_subflow', {
        subflowId: '', // Empty ID
      }, 'control_flow');

      expect(converter.canConvert(validNode)).toBe(true);
      expect(converter.canConvert(invalidNode)).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    it('should work together in a workflow', () => {
      const agentConverter = new AgentNodeConverter();
      const toolConverter = new ToolNodeConverter();
      const functionConverter = new CustomFunctionNodeConverter();
      const subflowConverter = new SubflowNodeConverter();

      // Test that all converters can be instantiated and have correct types
      expect(agentConverter.flowiseType).toBe('agentNode');
      expect(toolConverter.flowiseType).toBe('toolNode');
      expect(functionConverter.flowiseType).toBe('customFunctionNode');
      expect(subflowConverter.flowiseType).toBe('subflowNode');

      // Test that all have the same category
      expect(agentConverter.category).toBe('agentflow-v2');
      expect(toolConverter.category).toBe('agentflow-v2');
      expect(functionConverter.category).toBe('agentflow-v2');
      expect(subflowConverter.category).toBe('agentflow-v2');
    });

    it('should generate compatible code fragments', () => {
      const agentNode = createTestNode('agent-main', 'agentNode', 'MainAgent', {
        name: 'MainAgent',
        llm: 'openai-gpt4',
        tools: ['calculator'],
        maxIterations: 5,
      });

      const toolNode = createTestNode('tool-calc', 'toolNode', 'calculator', {
        name: 'calculator',
        description: 'Mathematical calculator',
        func: 'function(input) { return eval(input); }',
      }, 'tool');

      const agentConverter = new AgentNodeConverter();
      const toolConverter = new ToolNodeConverter();

      const agentFragments = agentConverter.convert(agentNode, context);
      const toolFragments = toolConverter.convert(toolNode, context);

      // Check that both generate valid fragments
      expect(agentFragments.length).toBeGreaterThan(0);
      expect(toolFragments.length).toBeGreaterThan(0);

      // Check that imports are compatible
      const agentImports = agentFragments.filter(f => f.type === 'import');
      const toolImports = toolFragments.filter(f => f.type === 'import');
      
      expect(agentImports.length).toBeGreaterThan(0);
      expect(toolImports.length).toBeGreaterThan(0);

      // Both should have LangChain imports
      const allImports = [...agentImports, ...toolImports];
      const hasLangChainImports = allImports.some(f => 
        f.content.includes('@langchain/core') || f.content.includes('langchain')
      );
      expect(hasLangChainImports).toBe(true);
    });
  });
});