/**
 * Test file demonstrating AgentFlow V2 reference resolution
 */

import { 
  AgentNodeConverter, 
  ToolNodeConverter, 
  CustomFunctionNodeConverter,
  SubflowNodeConverter
} from './agentflow-v2.js';
import { IRNode, GenerationContext } from '../../ir/types.js';

// Example of how the reference resolution works
function demonstrateReferenceResolution() {
  // Reset the reference resolver for a clean state
  AgentNodeConverter.resetReferenceResolver();
  
  // Create sample nodes
  const llmNode: IRNode = {
    id: 'llm_1',
    type: 'chatOpenAI',
    label: 'Chat OpenAI',
    category: 'llm',
    position: { x: 0, y: 0 },
    parameters: [
      { name: 'temperature', value: 0.7, type: 'number' },
      { name: 'modelName', value: 'gpt-4', type: 'string' }
    ]
  };
  
  const toolNode: IRNode = {
    id: 'tool_1',
    type: 'toolNode',
    label: 'Tool Node',
    category: 'tool',
    position: { x: 0, y: 0 },
    parameters: [
      { name: 'name', value: 'calculator', type: 'string' },
      { name: 'description', value: 'A calculator tool', type: 'string' },
      { name: 'func', value: '(input) => eval(input)', type: 'code' }
    ]
  };
  
  const memoryNode: IRNode = {
    id: 'memory_1',
    type: 'bufferMemory',
    label: 'Buffer Memory',
    category: 'memory',
    position: { x: 0, y: 0 },
    parameters: [
      { name: 'memoryKey', value: 'chat_history', type: 'string' }
    ]
  };
  
  const agentNode: IRNode = {
    id: 'agent_1',
    type: 'agentNode',
    label: 'Agent Node',
    category: 'agent',
    position: { x: 0, y: 0 },
    parameters: [
      { name: 'agentType', value: 'openai-functions', type: 'string' },
      { name: 'llm', value: 'llm_1', type: 'string' }, // Reference to LLM node
      { name: 'tools', value: ['tool_1'], type: 'array' }, // Reference to tool node
      { name: 'memory', value: 'memory_1', type: 'string' }, // Reference to memory node
      { name: 'maxIterations', value: 10, type: 'number' }
    ]
  };
  
  const context: GenerationContext = {
    targetLanguage: 'typescript',
    outputPath: './output',
    projectName: 'test-project',
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
  
  // Register nodes (this would normally happen during conversion)
  const resolver = AgentNodeConverter.getReferenceResolver();
  resolver.registerNode('llm_1', 'chatOpenAI_llm_1', 'llm');
  resolver.registerNode('tool_1', 'calculator_tool_1', 'tool');
  resolver.registerNode('memory_1', 'bufferMemory_memory_1', 'memory');
  resolver.registerNode('agent_1', 'agent_node_agent_1', 'agent');
  
  // Track dependencies
  resolver.addDependency('agent_1', 'llm_1');
  resolver.addDependency('agent_1', 'tool_1');
  resolver.addDependency('agent_1', 'memory_1');
  
  // Convert the agent node
  const converter = new AgentNodeConverter();
  const fragments = converter.convert(agentNode, context);
  
  // The generated code will have resolved references:
  // - LLM_REFERENCE_PLACEHOLDER → chatOpenAI_llm_1
  // - TOOLS_REFERENCE_PLACEHOLDER → [calculator_tool_1]
  // - MEMORY_REFERENCE_PLACEHOLDER → bufferMemory_memory_1
  
  console.log('Generated fragments:', fragments);
  
  // Get initialization order
  const initOrder = resolver.getInitializationOrder();
  console.log('Initialization order:', initOrder.map(n => n.variableName));
  // Output: ['chatOpenAI_llm_1', 'calculator_tool_1', 'bufferMemory_memory_1', 'agent_node_agent_1']
}

// Example of subflow reference resolution
function demonstrateSubflowResolution() {
  const subflowNode: IRNode = {
    id: 'subflow_1',
    type: 'subflowNode',
    label: 'Subflow Node',
    category: 'control_flow',
    position: { x: 0, y: 0 },
    parameters: [
      { name: 'subflowId', value: 'workflow_123', type: 'string' },
      { name: 'parallel', value: true, type: 'boolean' },
      { name: 'inputMapping', value: { input: 'query' }, type: 'object' },
      { name: 'outputMapping', value: { result: 'output' }, type: 'object' }
    ]
  };
  
  const context: GenerationContext = {
    targetLanguage: 'typescript',
    outputPath: './output',
    projectName: 'test-project',
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
  
  const converter = new SubflowNodeConverter();
  const fragments = converter.convert(subflowNode, context);
  
  // SUBFLOW_STEPS_PLACEHOLDER will be resolved to actual runnable references
  console.log('Subflow fragments:', fragments);
}

// Example of custom function with references
function demonstrateCustomFunctionResolution() {
  const functionNode: IRNode = {
    id: 'function_1',
    type: 'customFunctionNode',
    label: 'Custom Function',
    category: 'utility',
    position: { x: 0, y: 0 },
    parameters: [
      { name: 'name', value: 'dataProcessor', type: 'string' },
      { name: 'code', value: 'return processData(input);', type: 'code' },
      { name: 'enableState', value: true, type: 'boolean' },
      { name: 'stateVariables', value: { count: 0, results: [] }, type: 'object' }
    ]
  };
  
  const context: GenerationContext = {
    targetLanguage: 'typescript',
    outputPath: './output',
    projectName: 'test-project',
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
  
  const converter = new CustomFunctionNodeConverter();
  const fragments = converter.convert(functionNode, context);
  
  console.log('Function fragments:', fragments);
}

// Export for testing
export {
  demonstrateReferenceResolution,
  demonstrateSubflowResolution,
  demonstrateCustomFunctionResolution
};