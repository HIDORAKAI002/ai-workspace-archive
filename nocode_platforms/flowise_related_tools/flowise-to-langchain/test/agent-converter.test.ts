/**
 * Simple test to verify agent converter implementation
 */

import { OpenAIFunctionsAgentConverter, ConversationalAgentConverter, AgentExecutorConverter } from '../src/registry/converters/agent';
import { IRNode, GenerationContext } from '../src/ir/types';

describe('Agent Converters', () => {
  const mockContext: GenerationContext = {
    targetLanguage: 'typescript',
    outputPath: '/test',
    projectName: 'test',
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

  const mockNode: IRNode = {
    id: 'test-agent',
    type: 'openAIFunctionsAgent',
    label: 'Test Agent',
    category: 'agent',
    inputs: [],
    outputs: [],
    parameters: [
      {
        name: 'agentType',
        value: 'openai-functions',
        type: 'string'
      },
      {
        name: 'maxIterations',
        value: 5,
        type: 'number'
      },
      {
        name: 'verbose',
        value: true,
        type: 'boolean'
      }
    ],
    position: { x: 0, y: 0 },
    metadata: {}
  };

  test('OpenAIFunctionsAgentConverter should be instantiable', () => {
    const converter = new OpenAIFunctionsAgentConverter();
    
    expect(converter.flowiseType).toBe('openAIFunctionsAgent');
    expect(converter.category).toBe('agent');
    expect(converter.getDependencies(mockNode)).toContain('@langchain/openai');
    expect(converter.getDependencies(mockNode)).toContain('@langchain/core/prompts');
  });

  test('ConversationalAgentConverter should be instantiable', () => {
    const converter = new ConversationalAgentConverter();
    
    expect(converter.flowiseType).toBe('conversationalAgent');
    expect(converter.category).toBe('agent');
    expect(converter.getDependencies(mockNode)).toContain('@langchain/core/prompts');
  });

  test('AgentExecutorConverter should be instantiable', () => {
    const converter = new AgentExecutorConverter();
    
    expect(converter.flowiseType).toBe('agentExecutor');
    expect(converter.category).toBe('agent');
    expect(converter.getDependencies(mockNode)).toContain('@langchain/core/prompts');
  });

  test('AgentExecutorConverter should convert node to code fragments', () => {
    const converter = new AgentExecutorConverter();
    
    const mockNode: IRNode = {
      id: 'test-agent',
      type: 'agentExecutor',
      label: 'Test Agent',
      category: 'agent',
      inputs: [
        {
          id: 'model-input',
          label: 'Model',
          type: 'input',
          dataType: 'BaseLanguageModel',
          optional: false
        },
        {
          id: 'tools-input',
          label: 'Tools',
          type: 'input',
          dataType: 'Tool',
          optional: false
        }
      ],
      outputs: [
        {
          id: 'agent-output',
          label: 'Agent',
          type: 'output',
          dataType: 'AgentExecutor',
          optional: false
        }
      ],
      parameters: [
        {
          name: 'agentType',
          value: 'zero-shot-react-description',
          type: 'string'
        },
        {
          name: 'maxIterations',
          value: 5,
          type: 'number'
        },
        {
          name: 'verbose',
          value: true,
          type: 'boolean'
        }
      ],
      position: { x: 100, y: 100 }
    };

    const result = converter.convert(mockNode, mockContext);
    
    expect(result).toHaveLength(1);
    expect(result[0]?.type).toBe('initialization');
    expect(result[0]?.content).toContain('new AgentExecutor');
    expect(result[0]?.content).toContain('maxIterations: 5');
    expect(result[0]?.content).toContain('verbose: true');
    expect(result[0]?.dependencies).toContain('langchain/agents');
  });

  test('OpenAIFunctionsAgentConverter should generate correct imports', () => {
    const converter = new OpenAIFunctionsAgentConverter();
    
    const mockNode: IRNode = {
      id: 'test-openai-agent',
      type: 'openAIFunctionsAgent',
      label: 'Test OpenAI Agent',
      category: 'agent',
      inputs: [],
      outputs: [],
      parameters: [],
      position: { x: 100, y: 100 }
    };

    const result = converter.convert(mockNode, mockContext);
    
    expect(result).toHaveLength(1);
    expect(result[0]?.type).toBe('initialization');
    expect(result[0]?.content).toContain('createOpenAIFunctionsAgent');
    expect(result[0]?.dependencies).toContain('langchain/agents');
    expect(result[0]?.metadata?.imports).toBeDefined();
    expect(result[0]?.metadata?.imports).toContain('import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";');
  });
});