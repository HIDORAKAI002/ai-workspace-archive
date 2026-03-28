/**
 * Test Fixtures - Sample Flowise Flows
 * Contains various sample flows for testing different scenarios
 */

export const simpleOpenAIFlow = {
  nodes: [
    {
      id: 'openai-node',
      position: { x: 100, y: 100 },
      type: 'customNode',
      data: {
        id: 'openai-node',
        label: 'OpenAI',
        version: 2,
        name: 'openAI',
        type: 'OpenAI',
        baseClasses: ['BaseLanguageModel', 'OpenAI'],
        category: 'LLMs',
        description: 'Wrapper around OpenAI large language models',
        inputParams: [
          {
            label: 'Model Name',
            name: 'modelName',
            type: 'options',
            options: [
              { label: 'text-davinci-003', name: 'text-davinci-003' },
              { label: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo' },
              { label: 'gpt-4', name: 'gpt-4' }
            ],
            default: 'text-davinci-003',
            optional: false
          },
          {
            label: 'Temperature',
            name: 'temperature',
            type: 'number',
            default: 0.9,
            optional: true
          },
          {
            label: 'Max Tokens',
            name: 'maxTokens',
            type: 'number',
            optional: true
          },
          {
            label: 'OpenAI API Key',
            name: 'openAIApiKey',
            type: 'password',
            optional: false
          }
        ],
        inputAnchors: [],
        inputs: {
          modelName: 'gpt-3.5-turbo',
          temperature: 0.7,
          maxTokens: 1000,
          openAIApiKey: 'sk-test-key'
        },
        outputAnchors: [
          {
            id: 'openai-node-output',
            name: 'output',
            label: 'OpenAI',
            type: 'OpenAI'
          }
        ]
      }
    }
  ],
  edges: [],
  chatflow: {
    id: 'simple-openai',
    name: 'Simple OpenAI Flow',
    flowData: '{}',
    deployed: false,
    isPublic: false,
    apikeyid: '',
    createdDate: '2024-01-01T00:00:00.000Z',
    updatedDate: '2024-01-01T00:00:00.000Z'
  }
};

export const chainFlow = {
  nodes: [
    {
      id: 'llm-node',
      position: { x: 100, y: 100 },
      type: 'customNode',
      data: {
        id: 'llm-node',
        label: 'ChatOpenAI',
        version: 2,
        name: 'chatOpenAI',
        type: 'ChatOpenAI',
        baseClasses: ['BaseLanguageModel', 'ChatOpenAI'],
        category: 'Chat Models',
        description: 'Wrapper around OpenAI Chat large language models',
        inputParams: [
          {
            label: 'Model Name',
            name: 'modelName',
            type: 'options',
            options: [
              { label: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo' },
              { label: 'gpt-4', name: 'gpt-4' }
            ],
            default: 'gpt-3.5-turbo',
            optional: false
          }
        ],
        inputAnchors: [],
        inputs: {
          modelName: 'gpt-3.5-turbo',
          temperature: 0.7,
          maxTokens: 1000,
          openAIApiKey: 'sk-test-key'
        },
        outputAnchors: [
          {
            id: 'llm-output',
            name: 'output',
            label: 'ChatOpenAI',
            type: 'ChatOpenAI'
          }
        ]
      }
    },
    {
      id: 'prompt-node',
      position: { x: 300, y: 100 },
      type: 'customNode',
      data: {
        id: 'prompt-node',
        label: 'Chat Prompt Template',
        version: 2,
        name: 'chatPromptTemplate',
        type: 'ChatPromptTemplate',
        baseClasses: ['BasePromptTemplate', 'ChatPromptTemplate'],
        category: 'Prompts',
        description: 'Template to format chat messages',
        inputParams: [
          {
            label: 'System Message',
            name: 'systemMessagePrompt',
            type: 'string',
            rows: 4,
            placeholder: 'You are a helpful assistant...',
            optional: true
          },
          {
            label: 'Human Message',
            name: 'humanMessagePrompt',
            type: 'string',
            rows: 4,
            placeholder: '{input}',
            optional: true
          }
        ],
        inputAnchors: [],
        inputs: {
          systemMessagePrompt: 'You are a helpful AI assistant.',
          humanMessagePrompt: 'Answer the following question: {question}'
        },
        outputAnchors: [
          {
            id: 'prompt-output',
            name: 'output',
            label: 'ChatPromptTemplate',
            type: 'ChatPromptTemplate'
          }
        ]
      }
    },
    {
      id: 'chain-node',
      position: { x: 500, y: 100 },
      type: 'customNode',
      data: {
        id: 'chain-node',
        label: 'LLM Chain',
        version: 2,
        name: 'llmChain',
        type: 'LLMChain',
        baseClasses: ['BaseChain', 'LLMChain'],
        category: 'Chains',
        description: 'Chain to run queries against LLMs',
        inputParams: [],
        inputAnchors: [
          {
            label: 'Language Model',
            name: 'model',
            type: 'BaseLanguageModel'
          },
          {
            label: 'Prompt',
            name: 'prompt',
            type: 'BasePromptTemplate'
          }
        ],
        inputs: {},
        outputAnchors: [
          {
            id: 'chain-output',
            name: 'output',
            label: 'LLMChain',
            type: 'LLMChain'
          }
        ]
      }
    }
  ],
  edges: [
    {
      source: 'llm-node',
      sourceHandle: 'llm-output',
      target: 'chain-node',
      targetHandle: 'model',
      id: 'edge-llm-chain'
    },
    {
      source: 'prompt-node',
      sourceHandle: 'prompt-output',
      target: 'chain-node',
      targetHandle: 'prompt',
      id: 'edge-prompt-chain'
    }
  ],
  chatflow: {
    id: 'chain-flow',
    name: 'LLM Chain Flow',
    flowData: '{}',
    deployed: false,
    isPublic: false,
    apikeyid: '',
    createdDate: '2024-01-01T00:00:00.000Z',
    updatedDate: '2024-01-01T00:00:00.000Z'
  }
};

export const complexFlow = {
  nodes: [
    {
      id: 'llm1',
      position: { x: 100, y: 100 },
      type: 'customNode',
      data: {
        id: 'llm1',
        label: 'OpenAI GPT-4',
        version: 2,
        name: 'chatOpenAI',
        type: 'ChatOpenAI',
        baseClasses: ['BaseLanguageModel'],
        category: 'Chat Models',
        description: 'GPT-4 model',
        inputParams: [],
        inputAnchors: [],
        inputs: { modelName: 'gpt-4' },
        outputAnchors: [{ id: 'llm1-out', name: 'output', label: 'Output', type: 'ChatOpenAI' }]
      }
    },
    {
      id: 'memory1',
      position: { x: 300, y: 100 },
      type: 'customNode',
      data: {
        id: 'memory1',
        label: 'Buffer Memory',
        version: 2,
        name: 'bufferMemory',
        type: 'BufferMemory',
        baseClasses: ['BaseMemory'],
        category: 'Memory',
        description: 'Buffer conversation memory',
        inputParams: [],
        inputAnchors: [],
        inputs: {},
        outputAnchors: [{ id: 'memory1-out', name: 'output', label: 'Output', type: 'BufferMemory' }]
      }
    },
    {
      id: 'chain1',
      position: { x: 500, y: 100 },
      type: 'customNode',
      data: {
        id: 'chain1',
        label: 'Conversation Chain',
        version: 2,
        name: 'conversationChain',
        type: 'ConversationChain',
        baseClasses: ['BaseChain'],
        category: 'Chains',
        description: 'Conversation chain with memory',
        inputParams: [],
        inputAnchors: [
          { label: 'Language Model', name: 'model', type: 'BaseLanguageModel' },
          { label: 'Memory', name: 'memory', type: 'BaseMemory' }
        ],
        inputs: {},
        outputAnchors: [{ id: 'chain1-out', name: 'output', label: 'Output', type: 'ConversationChain' }]
      }
    }
  ],
  edges: [
    {
      source: 'llm1',
      sourceHandle: 'llm1-out',
      target: 'chain1',
      targetHandle: 'model',
      id: 'edge1'
    },
    {
      source: 'memory1',
      sourceHandle: 'memory1-out',
      target: 'chain1',
      targetHandle: 'memory',
      id: 'edge2'
    }
  ],
  chatflow: {
    id: 'complex-flow',
    name: 'Complex Conversation Flow',
    flowData: '{}',
    deployed: false,
    isPublic: false,
    apikeyid: '',
    createdDate: '2024-01-01T00:00:00.000Z',
    updatedDate: '2024-01-01T00:00:00.000Z'
  }
};

export const invalidFlow = {
  nodes: [
    {
      id: '',
      position: { x: 'invalid', y: 100 },
      type: 'customNode',
      data: {
        // Missing required fields
        label: 'Invalid Node'
      }
    }
  ],
  edges: [
    {
      source: 'nonexistent',
      target: 'alsononexistent',
      sourceHandle: 'output1',
      targetHandle: 'input1',
      id: 'edge1'
    }
  ]
};

export const emptyFlow = {
  nodes: [],
  edges: []
};

export const agentWithToolsFlowAdvanced = {
  nodes: [
    {
      id: 'calculator_0',
      position: { x: 100, y: 100 },
      type: 'customNode',
      data: {
        id: 'calculator_0',
        label: 'Calculator',
        version: 3,
        name: 'calculator',
        type: 'Calculator',
        baseClasses: ['Calculator', 'Tool', 'StructuredTool'],
        category: 'Tools',
        description: 'Perform calculations on response',
        inputParams: [],
        inputAnchors: [],
        inputs: {},
        outputAnchors: [
          {
            id: 'calculator_0-output-calculator-Calculator|Tool|StructuredTool',
            name: 'calculator',
            label: 'Calculator',
            description: 'Perform calculations on response',
            type: 'Calculator | Tool | StructuredTool'
          }
        ]
      }
    },
    {
      id: 'serpAPI_0',
      position: { x: 100, y: 300 },
      type: 'customNode',
      data: {
        id: 'serpAPI_0',
        label: 'Serp API',
        version: 2,
        name: 'serpAPI',
        type: 'SerpAPI',
        baseClasses: ['SerpAPI', 'Tool', 'StructuredTool'],
        category: 'Tools',
        description: 'Wrapper around SerpAPI - a real-time API to access Google search results',
        inputParams: [
          {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['serpApi']
          }
        ],
        inputAnchors: [],
        inputs: {},
        outputAnchors: [
          {
            id: 'serpAPI_0-output-serpAPI-SerpAPI|Tool|StructuredTool',
            name: 'serpAPI',
            label: 'Serp API',
            description: 'Wrapper around SerpAPI - a real-time API to access Google search results',
            type: 'SerpAPI | Tool | StructuredTool'
          }
        ]
      }
    },
    {
      id: 'chatOpenAI_2',
      position: { x: 400, y: 200 },
      type: 'customNode',
      data: {
        id: 'chatOpenAI_2',
        label: 'ChatOpenAI',
        version: 5,
        name: 'chatOpenAI',
        type: 'ChatOpenAI',
        baseClasses: ['ChatOpenAI', 'BaseChatModel', 'BaseLanguageModel'],
        category: 'Chat Models',
        description: 'Wrapper around OpenAI large language models that use the Chat endpoint',
        inputParams: [
          {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['openAIApi']
          },
          {
            label: 'Model Name',
            name: 'modelName',
            type: 'options',
            options: [
              { label: 'gpt-4', name: 'gpt-4' },
              { label: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo' }
            ],
            default: 'gpt-3.5-turbo',
            optional: true
          },
          {
            label: 'Temperature',
            name: 'temperature',
            type: 'number',
            step: 0.1,
            default: 0.9,
            optional: true
          },
          {
            label: 'Streaming',
            name: 'streaming',
            type: 'boolean',
            default: true,
            optional: true
          }
        ],
        inputAnchors: [],
        inputs: {
          modelName: 'gpt-4',
          temperature: 0.1,
          streaming: false
        },
        outputAnchors: [
          {
            id: 'chatOpenAI_2-output-chatOpenAI-ChatOpenAI|BaseChatModel|BaseLanguageModel',
            name: 'chatOpenAI',
            label: 'ChatOpenAI',
            description: 'Wrapper around OpenAI large language models that use the Chat endpoint',
            type: 'ChatOpenAI | BaseChatModel | BaseLanguageModel'
          }
        ]
      }
    },
    {
      id: 'agentExecutor_0',
      position: { x: 700, y: 200 },
      type: 'customNode',
      data: {
        id: 'agentExecutor_0',
        label: 'Agent Executor',
        version: 3,
        name: 'agentExecutor',
        type: 'AgentExecutor',
        baseClasses: ['AgentExecutor', 'BaseChain'],
        category: 'Agents',
        description: 'Agent that can use tools to accomplish tasks',
        inputParams: [
          {
            label: 'Agent Type',
            name: 'agentType',
            type: 'options',
            options: [
              { label: 'Zero Shot React', name: 'zero-shot-react-description' },
              { label: 'React Docstore', name: 'react-docstore' },
              { label: 'Conversational React', name: 'conversational-react-description' }
            ],
            default: 'zero-shot-react-description'
          },
          {
            label: 'Max Iterations',
            name: 'maxIterations',
            type: 'number',
            default: 3,
            optional: true
          },
          {
            label: 'Verbose',
            name: 'verbose',
            type: 'boolean',
            default: false,
            optional: true
          }
        ],
        inputAnchors: [
          {
            id: 'agentExecutor_0-input-model-BaseLanguageModel',
            name: 'model',
            label: 'Language Model',
            description: 'Language Model to use for the agent',
            type: 'BaseLanguageModel'
          },
          {
            id: 'agentExecutor_0-input-tools-Tool',
            name: 'tools',
            label: 'Tools',
            description: 'Tools for the agent to use',
            type: 'Tool',
            list: true
          },
          {
            id: 'agentExecutor_0-input-memory-BaseMemory',
            name: 'memory',
            label: 'Memory',
            description: 'Memory to use for the agent',
            type: 'BaseMemory',
            optional: true
          }
        ],
        inputs: {
          agentType: 'zero-shot-react-description',
          maxIterations: 5,
          verbose: true
        },
        outputAnchors: [
          {
            id: 'agentExecutor_0-output-agentExecutor-AgentExecutor|BaseChain',
            name: 'agentExecutor',
            label: 'Agent Executor',
            description: 'Agent that can use tools to accomplish tasks',
            type: 'AgentExecutor | BaseChain'
          }
        ]
      }
    }
  ],
  edges: [
    {
      source: 'calculator_0',
      sourceHandle: 'calculator_0-output-calculator-Calculator|Tool|StructuredTool',
      target: 'agentExecutor_0',
      targetHandle: 'agentExecutor_0-input-tools-Tool',
      type: 'buttonedge',
      id: 'calculator_0-agentExecutor_0'
    },
    {
      source: 'serpAPI_0',
      sourceHandle: 'serpAPI_0-output-serpAPI-SerpAPI|Tool|StructuredTool',
      target: 'agentExecutor_0',
      targetHandle: 'agentExecutor_0-input-tools-Tool',
      type: 'buttonedge',
      id: 'serpAPI_0-agentExecutor_0'
    },
    {
      source: 'chatOpenAI_2',
      sourceHandle: 'chatOpenAI_2-output-chatOpenAI-ChatOpenAI|BaseChatModel|BaseLanguageModel',
      target: 'agentExecutor_0',
      targetHandle: 'agentExecutor_0-input-model-BaseLanguageModel',
      type: 'buttonedge',
      id: 'chatOpenAI_2-agentExecutor_0'
    }
  ],
  chatflow: {
    id: 'agent-with-tools-advanced',
    name: 'Agent with Calculator and Search (Advanced)',
    flowData: '',
    deployed: false,
    isPublic: false,
    apikeyid: '',
    createdDate: '2025-07-15T03:45:00.000Z',
    updatedDate: '2025-07-15T03:45:00.000Z',
    category: 'Complex Examples',
    description: 'An advanced intelligent agent that can perform calculations and web searches to answer complex questions'
  }
};

export const agentWithToolsFlow = {
  nodes: [
    {
      id: 'calculator_0',
      position: { x: 100, y: 100 },
      type: 'customNode',
      data: {
        id: 'calculator_0',
        label: 'Calculator',
        version: 3,
        name: 'calculator',
        type: 'Calculator',
        baseClasses: ['Calculator', 'Tool', 'StructuredTool'],
        category: 'Tools',
        description: 'Perform calculations on response',
        inputParams: [],
        inputAnchors: [],
        inputs: {},
        outputAnchors: [
          {
            id: 'calculator_0-output-calculator-Calculator|Tool|StructuredTool',
            name: 'calculator',
            label: 'Calculator',
            description: 'Perform calculations on response',
            type: 'Calculator | Tool | StructuredTool'
          }
        ]
      }
    },
    {
      id: 'serpAPI_0',
      position: { x: 100, y: 300 },
      type: 'customNode',
      data: {
        id: 'serpAPI_0',
        label: 'Serp API',
        version: 2,
        name: 'serpAPI',
        type: 'SerpAPI',
        baseClasses: ['SerpAPI', 'Tool', 'StructuredTool'],
        category: 'Tools',
        description: 'Wrapper around SerpAPI - a real-time API to access Google search results',
        inputParams: [
          {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['serpApi']
          }
        ],
        inputAnchors: [],
        inputs: {},
        outputAnchors: [
          {
            id: 'serpAPI_0-output-serpAPI-SerpAPI|Tool|StructuredTool',
            name: 'serpAPI',
            label: 'Serp API',
            description: 'Wrapper around SerpAPI - a real-time API to access Google search results',
            type: 'SerpAPI | Tool | StructuredTool'
          }
        ]
      }
    },
    {
      id: 'chatOpenAI_2',
      position: { x: 400, y: 200 },
      type: 'customNode',
      data: {
        id: 'chatOpenAI_2',
        label: 'ChatOpenAI',
        version: 5,
        name: 'chatOpenAI',
        type: 'ChatOpenAI',
        baseClasses: ['ChatOpenAI', 'BaseChatModel', 'BaseLanguageModel'],
        category: 'Chat Models',
        description: 'Wrapper around OpenAI large language models that use the Chat endpoint',
        inputParams: [
          {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['openAIApi']
          },
          {
            label: 'Model Name',
            name: 'modelName',
            type: 'options',
            options: [
              { label: 'gpt-4', name: 'gpt-4' },
              { label: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo' }
            ],
            default: 'gpt-3.5-turbo',
            optional: true
          },
          {
            label: 'Temperature',
            name: 'temperature',
            type: 'number',
            step: 0.1,
            default: 0.9,
            optional: true
          },
          {
            label: 'Streaming',
            name: 'streaming',
            type: 'boolean',
            default: true,
            optional: true
          }
        ],
        inputAnchors: [],
        inputs: {
          modelName: 'gpt-4',
          temperature: 0.1,
          streaming: false
        },
        outputAnchors: [
          {
            id: 'chatOpenAI_2-output-chatOpenAI-ChatOpenAI|BaseChatModel|BaseLanguageModel',
            name: 'chatOpenAI',
            label: 'ChatOpenAI',
            description: 'Wrapper around OpenAI large language models that use the Chat endpoint',
            type: 'ChatOpenAI | BaseChatModel | BaseLanguageModel'
          }
        ]
      }
    },
    {
      id: 'agentExecutor_0',
      position: { x: 700, y: 200 },
      type: 'customNode',
      data: {
        id: 'agentExecutor_0',
        label: 'Agent Executor',
        version: 3,
        name: 'agentExecutor',
        type: 'AgentExecutor',
        baseClasses: ['AgentExecutor', 'BaseChain'],
        category: 'Agents',
        description: 'Agent that can use tools to accomplish tasks',
        inputParams: [
          {
            label: 'Agent Type',
            name: 'agentType',
            type: 'options',
            options: [
              { label: 'Zero Shot React', name: 'zero-shot-react-description' },
              { label: 'React Docstore', name: 'react-docstore' },
              { label: 'Conversational React', name: 'conversational-react-description' }
            ],
            default: 'zero-shot-react-description'
          },
          {
            label: 'Max Iterations',
            name: 'maxIterations',
            type: 'number',
            default: 3,
            optional: true
          },
          {
            label: 'Verbose',
            name: 'verbose',
            type: 'boolean',
            default: false,
            optional: true
          }
        ],
        inputAnchors: [
          {
            id: 'agentExecutor_0-input-model-BaseLanguageModel',
            name: 'model',
            label: 'Language Model',
            description: 'Language Model to use for the agent',
            type: 'BaseLanguageModel'
          },
          {
            id: 'agentExecutor_0-input-tools-Tool',
            name: 'tools',
            label: 'Tools',
            description: 'Tools for the agent to use',
            type: 'Tool',
            list: true
          },
          {
            id: 'agentExecutor_0-input-memory-BaseMemory',
            name: 'memory',
            label: 'Memory',
            description: 'Memory to use for the agent',
            type: 'BaseMemory',
            optional: true
          }
        ],
        inputs: {
          agentType: 'zero-shot-react-description',
          maxIterations: 5,
          verbose: true
        },
        outputAnchors: [
          {
            id: 'agentExecutor_0-output-agentExecutor-AgentExecutor|BaseChain',
            name: 'agentExecutor',
            label: 'Agent Executor',
            description: 'Agent that can use tools to accomplish tasks',
            type: 'AgentExecutor | BaseChain'
          }
        ]
      }
    }
  ],
  edges: [
    {
      source: 'calculator_0',
      sourceHandle: 'calculator_0-output-calculator-Calculator|Tool|StructuredTool',
      target: 'agentExecutor_0',
      targetHandle: 'agentExecutor_0-input-tools-Tool',
      type: 'buttonedge',
      id: 'calculator_0-agentExecutor_0'
    },
    {
      source: 'serpAPI_0',
      sourceHandle: 'serpAPI_0-output-serpAPI-SerpAPI|Tool|StructuredTool',
      target: 'agentExecutor_0',
      targetHandle: 'agentExecutor_0-input-tools-Tool',
      type: 'buttonedge',
      id: 'serpAPI_0-agentExecutor_0'
    },
    {
      source: 'chatOpenAI_2',
      sourceHandle: 'chatOpenAI_2-output-chatOpenAI-ChatOpenAI|BaseChatModel|BaseLanguageModel',
      target: 'agentExecutor_0',
      targetHandle: 'agentExecutor_0-input-model-BaseLanguageModel',
      type: 'buttonedge',
      id: 'chatOpenAI_2-agentExecutor_0'
    }
  ],
  chatflow: {
    id: 'agent-with-tools',
    name: 'Agent with Calculator and Search',
    flowData: '',
    deployed: false,
    isPublic: false,
    apikeyid: '',
    createdDate: '2025-07-15T03:45:00.000Z',
    updatedDate: '2025-07-15T03:45:00.000Z',
    category: 'Complex Examples',
    description: 'An intelligent agent that can perform calculations and web searches to answer complex questions'
  }
};

export const cyclicFlow = {
  nodes: [
    {
      id: 'node1',
      position: { x: 100, y: 100 },
      type: 'customNode',
      data: {
        id: 'node1',
        label: 'Node 1',
        version: 2,
        name: 'node1',
        type: 'test',
        baseClasses: ['BaseChain'],
        category: 'test',
        description: 'Test node 1',
        inputParams: [],
        inputAnchors: [{ id: 'in1', name: 'input', label: 'Input', type: 'BaseChain' }],
        inputs: {},
        outputAnchors: [{ id: 'out1', name: 'output', label: 'Output', type: 'BaseChain' }]
      }
    },
    {
      id: 'node2',
      position: { x: 300, y: 100 },
      type: 'customNode',
      data: {
        id: 'node2',
        label: 'Node 2',
        version: 2,
        name: 'node2',
        type: 'test',
        baseClasses: ['BaseChain'],
        category: 'test',
        description: 'Test node 2',
        inputParams: [],
        inputAnchors: [{ id: 'in2', name: 'input', label: 'Input', type: 'BaseChain' }],
        inputs: {},
        outputAnchors: [{ id: 'out2', name: 'output', label: 'Output', type: 'BaseChain' }]
      }
    }
  ],
  edges: [
    {
      source: 'node1',
      sourceHandle: 'out1',
      target: 'node2',
      targetHandle: 'in2',
      id: 'edge1'
    },
    {
      source: 'node2',
      sourceHandle: 'out2',
      target: 'node1',
      targetHandle: 'in1',
      id: 'edge2'
    }
  ],
  chatflow: {
    id: 'cyclic-flow',
    name: 'Cyclic Flow',
    flowData: '{}',
    deployed: false,
    isPublic: false,
    apikeyid: '',
    createdDate: '2024-01-01T00:00:00.000Z',
    updatedDate: '2024-01-01T00:00:00.000Z'
  }
};