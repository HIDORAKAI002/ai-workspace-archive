/**
 * Node and Edge Definitions for Flowise-to-LangChain IR
 *
 * This module provides specific node type definitions and edge handling
 * for the Intermediate Representation system.
 */

import { IRNode, IRPort, IRParameter, IRConnection, NodeId } from './types.js';

/**
 * Base node factory interface
 */
export interface NodeFactory {
  createNode(type: string, id: NodeId, label: string): IRNode;
  validateNode(node: IRNode): boolean;
  getDefaultParameters(type: string): IRParameter[];
  getPortConfiguration(type: string): { inputs: IRPort[]; outputs: IRPort[] };
}

/**
 * LLM node types
 */
export type LLMNodeType =
  | 'openAI'
  | 'chatOpenAI'
  | 'anthropic'
  | 'azureOpenAI'
  | 'ollama'
  | 'huggingFace'
  | 'cohere'
  | 'replicate';

/**
 * Chain node types
 */
export type ChainNodeType =
  | 'llmChain'
  | 'conversationChain'
  | 'retrievalQAChain'
  | 'multiPromptChain'
  | 'sequentialChain'
  | 'transformChain'
  | 'mapReduceChain';

/**
 * Agent node types
 */
export type AgentNodeType =
  | 'zeroShotAgent'
  | 'conversationalAgent'
  | 'chatAgent'
  | 'toolCallingAgent'
  | 'openAIFunctionsAgent'
  | 'structuredChatAgent';

/**
 * Tool node types
 */
export type ToolNodeType =
  | 'calculator'
  | 'serpAPI'
  | 'webBrowser'
  | 'wolfram'
  | 'customTool'
  | 'httpTool'
  | 'pythonTool'
  | 'bashTool'
  | 'requestsGet'
  | 'requestsPost';

/**
 * Memory node types
 */
export type MemoryNodeType =
  | 'bufferMemory'
  | 'bufferWindowMemory'
  | 'summaryBufferMemory'
  | 'vectorStoreRetrieverMemory'
  | 'conversationSummaryMemory'
  | 'entityMemory';

/**
 * Vector store node types
 */
export type VectorStoreNodeType =
  | 'pinecone'
  | 'qdrant'
  | 'faiss'
  | 'chroma'
  | 'weaviate'
  | 'supabase'
  | 'redis'
  | 'memoryVectorStore';

/**
 * Embedding node types
 */
export type EmbeddingNodeType =
  | 'openAIEmbeddings'
  | 'huggingFaceEmbeddings'
  | 'cohereEmbeddings'
  | 'azureOpenAIEmbeddings'
  | 'tensorFlowEmbeddings';

/**
 * Prompt node types
 */
export type PromptNodeType =
  | 'promptTemplate'
  | 'chatPromptTemplate'
  | 'fewShotPromptTemplate'
  | 'systemMessage'
  | 'humanMessage'
  | 'aiMessage';

/**
 * Text Splitter node types
 */
export type TextSplitterNodeType =
  | 'recursiveCharacterTextSplitter'
  | 'characterTextSplitter'
  | 'tokenTextSplitter'
  | 'markdownTextSplitter'
  | 'latexTextSplitter'
  | 'htmlTextSplitter'
  | 'pythonCodeTextSplitter'
  | 'jsCodeTextSplitter';

/**
 * All supported node types
 */
export type SupportedNodeType =
  | LLMNodeType
  | ChainNodeType
  | AgentNodeType
  | ToolNodeType
  | MemoryNodeType
  | VectorStoreNodeType
  | EmbeddingNodeType
  | PromptNodeType
  | TextSplitterNodeType;

/**
 * Node configuration template
 */
export interface NodeTemplate {
  type: SupportedNodeType;
  category: string;
  label: string;
  description: string;
  version: string;
  inputs: IRPort[];
  outputs: IRPort[];
  parameters: IRParameter[];
  tags: string[];
  deprecated?: boolean;
  replacedBy?: string;
  documentation?: string;
  examples?: string[];
}

/**
 * Connection constraints
 */
export interface ConnectionConstraint {
  sourceType: string;
  targetType: string;
  sourcePort: string;
  targetPort: string;
  required: boolean;
  dataType: string;
  validation?: (sourceNode: IRNode, targetNode: IRNode) => boolean;
}

/**
 * Port type definitions
 */
export const PortTypes = {
  // Core data types
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',

  // LangChain types
  LLM: 'llm',
  CHAT_MODEL: 'chatModel',
  PROMPT: 'prompt',
  CHAIN: 'chain',
  AGENT: 'agent',
  TOOL: 'tool',
  MEMORY: 'memory',
  VECTOR_STORE: 'vectorStore',
  EMBEDDINGS: 'embeddings',
  RETRIEVER: 'retriever',
  DOCUMENT: 'document',
  OUTPUT_PARSER: 'outputParser',
  TEXT_SPLITTER: 'textSplitter',

  // Special types
  ANY: 'any',
  VOID: 'void',
} as const;

/**
 * Default node templates for common Flowise nodes
 */
export const NodeTemplates: Record<string, NodeTemplate> = {
  // LLM Nodes
  openAI: {
    type: 'openAI',
    category: 'llm',
    label: 'OpenAI',
    description: 'OpenAI language model',
    version: '1.0.0',
    inputs: [],
    outputs: [
      {
        id: 'output',
        label: 'LLM',
        type: 'output',
        dataType: PortTypes.LLM,
        description: 'OpenAI language model instance',
      },
    ],
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        value: 'gpt-3.5-turbo',
        required: true,
        description: 'Model name to use',
        options: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'],
      },
      {
        name: 'temperature',
        type: 'number',
        value: 0.7,
        required: false,
        description: 'Temperature for randomness',
        validation: { min: 0, max: 2 },
      },
      {
        name: 'maxTokens',
        type: 'number',
        value: undefined,
        required: false,
        description: 'Maximum tokens to generate',
        validation: { min: 1, max: 4096 },
      },
      {
        name: 'openAIApiKey',
        type: 'credential',
        value: undefined,
        required: true,
        description: 'OpenAI API Key',
      },
    ],
    tags: ['llm', 'openai', 'gpt'],
  },

  // Chat-based LLM
  chatOpenAI: {
    type: 'chatOpenAI',
    category: 'llm',
    label: 'ChatOpenAI',
    description: 'Chat-based OpenAI language model',
    version: '1.0.0',
    inputs: [],
    outputs: [
      {
        id: 'output',
        label: 'ChatModel',
        type: 'output',
        dataType: PortTypes.LLM,
        description: 'ChatOpenAI language model instance',
      },
    ],
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        value: 'gpt-3.5-turbo',
        required: true,
        description: 'Model name to use',
        options: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'],
      },
      {
        name: 'temperature',
        type: 'number',
        value: 0.7,
        required: false,
        description: 'Temperature for randomness',
        validation: { min: 0, max: 2 },
      },
      {
        name: 'maxTokens',
        type: 'number',
        value: undefined,
        required: false,
        description: 'Maximum tokens to generate',
        validation: { min: 1, max: 4096 },
      },
      {
        name: 'openAIApiKey',
        type: 'credential',
        value: undefined,
        required: true,
        description: 'OpenAI API Key',
      },
    ],
    tags: ['llm', 'openai', 'gpt', 'chat'],
  },

  // Prompt Templates
  promptTemplate: {
    type: 'promptTemplate',
    category: 'prompt',
    label: 'Prompt Template',
    description: 'Template for single prompts',
    version: '1.0.0',
    inputs: [],
    outputs: [
      {
        id: 'output',
        label: 'Prompt',
        type: 'output',
        dataType: PortTypes.PROMPT,
        description: 'Prompt template instance',
      },
    ],
    parameters: [
      {
        name: 'template',
        type: 'string',
        value: '{input}',
        required: true,
        description: 'Prompt template string',
      },
      {
        name: 'inputVariables',
        type: 'array',
        value: ['input'],
        required: true,
        description: 'Input variable names',
      },
    ],
    tags: ['prompt', 'template'],
  },

  chatPromptTemplate: {
    type: 'chatPromptTemplate',
    category: 'prompt',
    label: 'Chat Prompt Template',
    description: 'Template for chat-based prompts',
    version: '1.0.0',
    inputs: [],
    outputs: [
      {
        id: 'output',
        label: 'Prompt',
        type: 'output',
        dataType: PortTypes.PROMPT,
        description: 'Chat prompt template instance',
      },
    ],
    parameters: [
      {
        name: 'systemMessage',
        type: 'string',
        value: '',
        required: false,
        description: 'System message template',
      },
      {
        name: 'humanMessage',
        type: 'string',
        value: '{input}',
        required: true,
        description: 'Human message template',
      },
      {
        name: 'formatInstructions',
        type: 'string',
        value: '',
        required: false,
        description: 'Additional formatting instructions',
      },
    ],
    tags: ['prompt', 'template', 'chat'],
  },

  llmChain: {
    type: 'llmChain',
    category: 'chain',
    label: 'LLM Chain',
    description: 'Chain combining LLM and prompt',
    version: '1.0.0',
    inputs: [
      {
        id: 'llm',
        label: 'Language Model',
        type: 'input',
        dataType: PortTypes.LLM,
        description: 'Language model to use',
      },
      {
        id: 'prompt',
        label: 'Prompt',
        type: 'input',
        dataType: PortTypes.PROMPT,
        description: 'Prompt template',
      },
      {
        id: 'memory',
        label: 'Memory',
        type: 'input',
        dataType: PortTypes.MEMORY,
        optional: true,
        description: 'Memory for conversation history',
      },
    ],
    outputs: [
      {
        id: 'output',
        label: 'Chain',
        type: 'output',
        dataType: PortTypes.CHAIN,
        description: 'LLM Chain instance',
      },
    ],
    parameters: [
      {
        name: 'outputKey',
        type: 'string',
        value: 'text',
        required: false,
        description: 'Output key name',
      },
      {
        name: 'returnValues',
        type: 'array',
        value: [],
        required: false,
        description: 'Keys to return in output',
      },
    ],
    tags: ['chain', 'llm', 'prompt'],
  },

  bufferMemory: {
    type: 'bufferMemory',
    category: 'memory',
    label: 'Buffer Memory',
    description: 'Simple conversation buffer memory',
    version: '1.0.0',
    inputs: [],
    outputs: [
      {
        id: 'output',
        label: 'Memory',
        type: 'output',
        dataType: PortTypes.MEMORY,
        description: 'Buffer memory instance',
      },
    ],
    parameters: [
      {
        name: 'memoryKey',
        type: 'string',
        value: 'history',
        required: false,
        description: 'Key to store memory under',
      },
      {
        name: 'inputKey',
        type: 'string',
        value: 'input',
        required: false,
        description: 'Input variable name',
      },
      {
        name: 'outputKey',
        type: 'string',
        value: 'output',
        required: false,
        description: 'Output variable name',
      },
      {
        name: 'returnMessages',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Return messages instead of string',
      },
    ],
    tags: ['memory', 'buffer', 'conversation'],
  },

  calculator: {
    type: 'calculator',
    category: 'tool',
    label: 'Calculator',
    description: 'Basic calculator tool',
    version: '1.0.0',
    inputs: [],
    outputs: [
      {
        id: 'output',
        label: 'Tool',
        type: 'output',
        dataType: PortTypes.TOOL,
        description: 'Calculator tool instance',
      },
    ],
    parameters: [],
    tags: ['tool', 'calculator', 'math'],
  },

  serpAPI: {
    type: 'serpAPI',
    category: 'tool',
    label: 'SerpAPI',
    description: 'Search engine results tool',
    version: '1.0.0',
    inputs: [],
    outputs: [
      {
        id: 'output',
        label: 'Tool',
        type: 'output',
        dataType: PortTypes.TOOL,
        description: 'SerpAPI tool instance',
      },
    ],
    parameters: [
      {
        name: 'apiKey',
        type: 'credential',
        value: undefined,
        required: true,
        description: 'SerpAPI API Key',
      },
    ],
    tags: ['tool', 'search', 'serpapi'],
  },

  bufferWindowMemory: {
    type: 'bufferWindowMemory',
    category: 'memory',
    label: 'Buffer Window Memory',
    description:
      'Memory that maintains a sliding window of conversation history',
    version: '1.0.0',
    inputs: [],
    outputs: [
      {
        id: 'output',
        label: 'Memory',
        type: 'output',
        dataType: PortTypes.MEMORY,
        description: 'Buffer window memory instance',
      },
    ],
    parameters: [
      {
        name: 'memoryKey',
        type: 'string',
        value: 'history',
        required: false,
        description: 'Key to store memory under',
      },
      {
        name: 'inputKey',
        type: 'string',
        value: 'input',
        required: false,
        description: 'Input variable name',
      },
      {
        name: 'outputKey',
        type: 'string',
        value: 'output',
        required: false,
        description: 'Output variable name',
      },
      {
        name: 'k',
        type: 'number',
        value: 5,
        required: false,
        description: 'Number of previous messages to keep in buffer',
        validation: { min: 1, max: 50 },
      },
      {
        name: 'returnMessages',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Return messages instead of string',
      },
    ],
    tags: ['memory', 'buffer', 'window', 'conversation'],
  },

  conversationSummaryMemory: {
    type: 'conversationSummaryMemory',
    category: 'memory',
    label: 'Conversation Summary Memory',
    description: 'Memory that summarizes conversation history using an LLM',
    version: '1.0.0',
    inputs: [
      {
        id: 'llm',
        label: 'LLM',
        type: 'input',
        dataType: PortTypes.LLM,
        description: 'Language model for summarization',
      },
    ],
    outputs: [
      {
        id: 'output',
        label: 'Memory',
        type: 'output',
        dataType: PortTypes.MEMORY,
        description: 'Conversation summary memory instance',
      },
    ],
    parameters: [
      {
        name: 'memoryKey',
        type: 'string',
        value: 'history',
        required: false,
        description: 'Key to store memory under',
      },
      {
        name: 'inputKey',
        type: 'string',
        value: 'input',
        required: false,
        description: 'Input variable name',
      },
      {
        name: 'outputKey',
        type: 'string',
        value: 'output',
        required: false,
        description: 'Output variable name',
      },
      {
        name: 'maxTokenLimit',
        type: 'number',
        value: 2000,
        required: false,
        description: 'Maximum tokens before summarization',
        validation: { min: 100, max: 10000 },
      },
      {
        name: 'returnMessages',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Return messages instead of string',
      },
    ],
    tags: ['memory', 'summary', 'conversation', 'llm'],
  },

  webBrowser: {
    type: 'webBrowser',
    category: 'tool',
    label: 'Web Browser',
    description: 'Tool for browsing and extracting information from web pages',
    version: '1.0.0',
    inputs: [
      {
        id: 'llm',
        label: 'LLM',
        type: 'input',
        dataType: PortTypes.LLM,
        description: 'Language model for text processing',
      },
      {
        id: 'embeddings',
        label: 'Embeddings',
        type: 'input',
        dataType: PortTypes.EMBEDDINGS,
        description: 'Embeddings model for text vectorization',
      },
    ],
    outputs: [
      {
        id: 'output',
        label: 'Tool',
        type: 'output',
        dataType: PortTypes.TOOL,
        description: 'Web browser tool instance',
      },
    ],
    parameters: [
      {
        name: 'headless',
        type: 'boolean',
        value: true,
        required: false,
        description: 'Run browser in headless mode',
      },
      {
        name: 'timeout',
        type: 'number',
        value: 30000,
        required: false,
        description: 'Timeout for web requests in milliseconds',
        validation: { min: 1000, max: 120000 },
      },
    ],
    tags: ['tool', 'browser', 'web', 'scraping'],
  },

  // Agent Templates
  openAIFunctionsAgent: {
    type: 'openAIFunctionsAgent',
    category: 'agent',
    label: 'OpenAI Functions Agent',
    description: 'Agent that uses OpenAI function calling to determine actions',
    version: '1.0.0',
    inputs: [
      {
        id: 'llm',
        label: 'Language Model',
        type: 'input',
        dataType: PortTypes.LLM,
        description: 'Language model (must support function calling)',
      },
      {
        id: 'tools',
        label: 'Tools',
        type: 'input',
        dataType: PortTypes.TOOL,
        description: 'Tools for the agent to use',
      },
      {
        id: 'prompt',
        label: 'Prompt',
        type: 'input',
        dataType: PortTypes.PROMPT,
        optional: true,
        description:
          'Optional custom prompt (defaults to hwchase17/openai-functions-agent)',
      },
    ],
    outputs: [
      {
        id: 'output',
        label: 'Agent',
        type: 'output',
        dataType: PortTypes.AGENT,
        description: 'OpenAI Functions Agent executor',
      },
    ],
    parameters: [
      {
        name: 'maxIterations',
        type: 'number',
        value: 15,
        required: false,
        description: 'Maximum number of iterations the agent can take',
        validation: { min: 1, max: 100 },
      },
      {
        name: 'maxExecutionTime',
        type: 'number',
        value: undefined,
        required: false,
        description: 'Maximum execution time in seconds',
        validation: { min: 1, max: 3600 },
      },
      {
        name: 'verbose',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Enable verbose logging',
      },
      {
        name: 'returnIntermediateSteps',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Return intermediate steps in the response',
      },
    ],
    tags: ['agent', 'openai', 'functions', 'tools'],
  },

  conversationalAgent: {
    type: 'conversationalAgent',
    category: 'agent',
    label: 'Conversational Agent',
    description: 'Agent optimized for conversations that can use tools',
    version: '1.0.0',
    inputs: [
      {
        id: 'llm',
        label: 'Language Model',
        type: 'input',
        dataType: PortTypes.LLM,
        description: 'Language model for the agent',
      },
      {
        id: 'tools',
        label: 'Tools',
        type: 'input',
        dataType: PortTypes.TOOL,
        description: 'Tools for the agent to use',
      },
      {
        id: 'memory',
        label: 'Memory',
        type: 'input',
        dataType: PortTypes.MEMORY,
        optional: true,
        description: 'Memory for conversation history',
      },
    ],
    outputs: [
      {
        id: 'output',
        label: 'Agent',
        type: 'output',
        dataType: PortTypes.AGENT,
        description: 'Conversational Agent executor',
      },
    ],
    parameters: [
      {
        name: 'agentType',
        type: 'string',
        value: 'chat-conversational-react-description',
        required: false,
        description: 'Type of conversational agent',
        options: [
          'chat-conversational-react-description',
          'conversational-react-description',
          'zero-shot-react-description',
        ],
      },
      {
        name: 'maxIterations',
        type: 'number',
        value: 15,
        required: false,
        description: 'Maximum number of iterations the agent can take',
        validation: { min: 1, max: 100 },
      },
      {
        name: 'maxExecutionTime',
        type: 'number',
        value: undefined,
        required: false,
        description: 'Maximum execution time in seconds',
        validation: { min: 1, max: 3600 },
      },
      {
        name: 'verbose',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Enable verbose logging',
      },
      {
        name: 'returnIntermediateSteps',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Return intermediate steps in the response',
      },
    ],
    tags: ['agent', 'conversational', 'chat', 'tools'],
  },

  toolCallingAgent: {
    type: 'toolCallingAgent',
    category: 'agent',
    label: 'Tool Calling Agent',
    description: 'Modern agent that uses tool calling for action determination',
    version: '1.0.0',
    inputs: [
      {
        id: 'llm',
        label: 'Language Model',
        type: 'input',
        dataType: PortTypes.LLM,
        description: 'Language model (must support tool calling)',
      },
      {
        id: 'tools',
        label: 'Tools',
        type: 'input',
        dataType: PortTypes.TOOL,
        description: 'Tools for the agent to use',
      },
      {
        id: 'prompt',
        label: 'Prompt',
        type: 'input',
        dataType: PortTypes.PROMPT,
        description: 'Prompt template for the agent',
      },
    ],
    outputs: [
      {
        id: 'output',
        label: 'Agent',
        type: 'output',
        dataType: PortTypes.AGENT,
        description: 'Tool Calling Agent executor',
      },
    ],
    parameters: [
      {
        name: 'maxIterations',
        type: 'number',
        value: 15,
        required: false,
        description: 'Maximum number of iterations the agent can take',
        validation: { min: 1, max: 100 },
      },
      {
        name: 'maxExecutionTime',
        type: 'number',
        value: undefined,
        required: false,
        description: 'Maximum execution time in seconds',
        validation: { min: 1, max: 3600 },
      },
      {
        name: 'verbose',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Enable verbose logging',
      },
      {
        name: 'returnIntermediateSteps',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Return intermediate steps in the response',
      },
    ],
    tags: ['agent', 'tool-calling', 'modern', 'tools'],
  },

  structuredChatAgent: {
    type: 'structuredChatAgent',
    category: 'agent',
    label: 'Structured Chat Agent',
    description: 'Agent that can use structured input/output tools',
    version: '1.0.0',
    inputs: [
      {
        id: 'llm',
        label: 'Language Model',
        type: 'input',
        dataType: PortTypes.LLM,
        description: 'Language model for the agent',
      },
      {
        id: 'tools',
        label: 'Tools',
        type: 'input',
        dataType: PortTypes.TOOL,
        description: 'Tools for the agent to use',
      },
      {
        id: 'prompt',
        label: 'Prompt',
        type: 'input',
        dataType: PortTypes.PROMPT,
        description: 'Prompt template for the agent',
      },
    ],
    outputs: [
      {
        id: 'output',
        label: 'Agent',
        type: 'output',
        dataType: PortTypes.AGENT,
        description: 'Structured Chat Agent executor',
      },
    ],
    parameters: [
      {
        name: 'maxIterations',
        type: 'number',
        value: 15,
        required: false,
        description: 'Maximum number of iterations the agent can take',
        validation: { min: 1, max: 100 },
      },
      {
        name: 'maxExecutionTime',
        type: 'number',
        value: undefined,
        required: false,
        description: 'Maximum execution time in seconds',
        validation: { min: 1, max: 3600 },
      },
      {
        name: 'verbose',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Enable verbose logging',
      },
      {
        name: 'returnIntermediateSteps',
        type: 'boolean',
        value: false,
        required: false,
        description: 'Return intermediate steps in the response',
      },
    ],
    tags: ['agent', 'structured', 'chat', 'tools'],
  },
};

/**
 * Connection validation rules
 */
export const ConnectionConstraints: ConnectionConstraint[] = [
  // LLM to Chain connections
  {
    sourceType: 'openAI',
    targetType: 'llmChain',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },
  {
    sourceType: 'chatOpenAI',
    targetType: 'llmChain',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.CHAT_MODEL,
  },

  // Prompt to Chain connections
  {
    sourceType: 'chatPromptTemplate',
    targetType: 'llmChain',
    sourcePort: 'output',
    targetPort: 'prompt',
    required: true,
    dataType: PortTypes.PROMPT,
  },

  // Memory to Chain connections
  {
    sourceType: 'bufferMemory',
    targetType: 'llmChain',
    sourcePort: 'output',
    targetPort: 'memory',
    required: false,
    dataType: PortTypes.MEMORY,
  },

  // Tool to Agent connections
  {
    sourceType: 'calculator',
    targetType: 'zeroShotAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },

  // Memory to Chain connections - extended
  {
    sourceType: 'bufferWindowMemory',
    targetType: 'llmChain',
    sourcePort: 'output',
    targetPort: 'memory',
    required: false,
    dataType: PortTypes.MEMORY,
  },
  {
    sourceType: 'conversationSummaryMemory',
    targetType: 'llmChain',
    sourcePort: 'output',
    targetPort: 'memory',
    required: false,
    dataType: PortTypes.MEMORY,
  },

  // LLM to ConversationSummaryMemory connections
  {
    sourceType: 'openAI',
    targetType: 'conversationSummaryMemory',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },
  {
    sourceType: 'chatOpenAI',
    targetType: 'conversationSummaryMemory',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },

  // WebBrowser tool connections
  {
    sourceType: 'openAI',
    targetType: 'webBrowser',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },
  {
    sourceType: 'chatOpenAI',
    targetType: 'webBrowser',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },

  // Additional tool connections
  {
    sourceType: 'serpAPI',
    targetType: 'zeroShotAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'webBrowser',
    targetType: 'zeroShotAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },

  // OpenAI Functions Agent connections
  {
    sourceType: 'chatOpenAI',
    targetType: 'openAIFunctionsAgent',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },
  {
    sourceType: 'calculator',
    targetType: 'openAIFunctionsAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'serpAPI',
    targetType: 'openAIFunctionsAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'webBrowser',
    targetType: 'openAIFunctionsAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'chatPromptTemplate',
    targetType: 'openAIFunctionsAgent',
    sourcePort: 'output',
    targetPort: 'prompt',
    required: false,
    dataType: PortTypes.PROMPT,
  },

  // Conversational Agent connections
  {
    sourceType: 'chatOpenAI',
    targetType: 'conversationalAgent',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },
  {
    sourceType: 'openAI',
    targetType: 'conversationalAgent',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },
  {
    sourceType: 'calculator',
    targetType: 'conversationalAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'serpAPI',
    targetType: 'conversationalAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'webBrowser',
    targetType: 'conversationalAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'bufferMemory',
    targetType: 'conversationalAgent',
    sourcePort: 'output',
    targetPort: 'memory',
    required: false,
    dataType: PortTypes.MEMORY,
  },
  {
    sourceType: 'bufferWindowMemory',
    targetType: 'conversationalAgent',
    sourcePort: 'output',
    targetPort: 'memory',
    required: false,
    dataType: PortTypes.MEMORY,
  },
  {
    sourceType: 'conversationSummaryMemory',
    targetType: 'conversationalAgent',
    sourcePort: 'output',
    targetPort: 'memory',
    required: false,
    dataType: PortTypes.MEMORY,
  },

  // Tool Calling Agent connections
  {
    sourceType: 'chatOpenAI',
    targetType: 'toolCallingAgent',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },
  {
    sourceType: 'calculator',
    targetType: 'toolCallingAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'serpAPI',
    targetType: 'toolCallingAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'webBrowser',
    targetType: 'toolCallingAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'chatPromptTemplate',
    targetType: 'toolCallingAgent',
    sourcePort: 'output',
    targetPort: 'prompt',
    required: true,
    dataType: PortTypes.PROMPT,
  },

  // Structured Chat Agent connections
  {
    sourceType: 'chatOpenAI',
    targetType: 'structuredChatAgent',
    sourcePort: 'output',
    targetPort: 'llm',
    required: true,
    dataType: PortTypes.LLM,
  },
  {
    sourceType: 'calculator',
    targetType: 'structuredChatAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'serpAPI',
    targetType: 'structuredChatAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'webBrowser',
    targetType: 'structuredChatAgent',
    sourcePort: 'output',
    targetPort: 'tools',
    required: false,
    dataType: PortTypes.TOOL,
  },
  {
    sourceType: 'chatPromptTemplate',
    targetType: 'structuredChatAgent',
    sourcePort: 'output',
    targetPort: 'prompt',
    required: true,
    dataType: PortTypes.PROMPT,
  },
];

/**
 * Node factory implementation
 */
export class StandardNodeFactory implements NodeFactory {
  createNode(type: string, id: NodeId, label: string): IRNode {
    const template = NodeTemplates[type];
    if (!template) {
      throw new Error(`Unknown node type: ${type}`);
    }

    return {
      id,
      type: template.type,
      label: label || template.label,
      category: template.category as any,
      inputs: structuredClone(template.inputs),
      outputs: structuredClone(template.outputs),
      parameters: structuredClone(template.parameters),
      position: { x: 0, y: 0 },
      metadata: {
        version: template.version,
        description: template.description,
        tags: template.tags,
        deprecated: template.deprecated,
        documentation: template.documentation,
      },
    };
  }

  validateNode(node: IRNode): boolean {
    const template = NodeTemplates[node.type];
    if (!template) {
      return false;
    }

    // Validate required parameters
    for (const param of template.parameters) {
      if (param.required) {
        const nodeParam = node.parameters.find((p) => p.name === param.name);
        if (
          !nodeParam ||
          nodeParam.value === undefined ||
          nodeParam.value === null
        ) {
          return false;
        }
      }
    }

    return true;
  }

  getDefaultParameters(type: string): IRParameter[] {
    const template = NodeTemplates[type];
    return template ? structuredClone(template.parameters) : [];
  }

  getPortConfiguration(type: string): { inputs: IRPort[]; outputs: IRPort[] } {
    const template = NodeTemplates[type];
    return template
      ? {
          inputs: structuredClone(template.inputs),
          outputs: structuredClone(template.outputs),
        }
      : { inputs: [], outputs: [] };
  }
}

/**
 * Connection validator
 */
export class ConnectionValidator {
  static validateConnection(
    sourceNode: IRNode,
    targetNode: IRNode,
    sourcePort: string,
    targetPort: string
  ): { valid: boolean; error?: string } {
    // Find matching constraint
    const constraint = ConnectionConstraints.find(
      (c) =>
        c.sourceType === sourceNode.type &&
        c.targetType === targetNode.type &&
        c.sourcePort === sourcePort &&
        c.targetPort === targetPort
    );

    if (!constraint) {
      return {
        valid: false,
        error: `No valid connection path from ${sourceNode.type}.${sourcePort} to ${targetNode.type}.${targetPort}`,
      };
    }

    // Validate data types
    const sourcePortDef = sourceNode.outputs?.find((p) => p.id === sourcePort);
    const targetPortDef = targetNode.inputs?.find((p) => p.id === targetPort);

    if (!sourcePortDef || !targetPortDef) {
      return {
        valid: false,
        error: 'Source or target port not found',
      };
    }

    if (
      sourcePortDef.dataType !== targetPortDef.dataType &&
      targetPortDef.dataType !== PortTypes.ANY
    ) {
      return {
        valid: false,
        error: `Data type mismatch: ${sourcePortDef.dataType} cannot connect to ${targetPortDef.dataType}`,
      };
    }

    // Run custom validation if provided
    if (constraint.validation) {
      try {
        if (!constraint.validation(sourceNode, targetNode)) {
          return {
            valid: false,
            error: 'Custom validation failed',
          };
        }
      } catch (error) {
        return {
          valid: false,
          error: `Validation error: ${error}`,
        };
      }
    }

    return { valid: true };
  }

  static getValidTargets(sourceNode: IRNode, sourcePort: string): string[] {
    return ConnectionConstraints.filter(
      (c) => c.sourceType === sourceNode.type && c.sourcePort === sourcePort
    ).map((c) => `${c.targetType}.${c.targetPort}`);
  }

  static getValidSources(targetNode: IRNode, targetPort: string): string[] {
    return ConnectionConstraints.filter(
      (c) => c.targetType === targetNode.type && c.targetPort === targetPort
    ).map((c) => `${c.sourceType}.${c.sourcePort}`);
  }
}

/**
 * Edge utilities
 */
export class EdgeUtils {
  static createConnection(
    id: string,
    source: NodeId,
    target: NodeId,
    sourceHandle: string,
    targetHandle: string,
    label?: string
  ): IRConnection {
    return {
      id,
      source,
      target,
      sourceHandle,
      targetHandle,
      label,
      metadata: {
        createdAt: new Date().toISOString(),
      },
    };
  }

  static isValidEdge(connection: IRConnection, nodes: IRNode[]): boolean {
    const sourceNode = nodes.find((n) => n.id === connection.source);
    const targetNode = nodes.find((n) => n.id === connection.target);

    if (!sourceNode || !targetNode) {
      return false;
    }

    const validation = ConnectionValidator.validateConnection(
      sourceNode,
      targetNode,
      connection.sourceHandle,
      connection.targetHandle
    );

    return validation.valid;
  }

  static getConnectionMetadata(
    connection: IRConnection
  ): Record<string, unknown> {
    return connection.metadata || {};
  }
}

/**
 * Utility functions for working with nodes
 */
export class NodeUtils {
  static getNodesByCategory(nodes: IRNode[], category: string): IRNode[] {
    return nodes.filter((node) => node.category === category);
  }

  static getNodesByType(nodes: IRNode[], type: string): IRNode[] {
    return nodes.filter((node) => node.type === type);
  }

  static findNodeById(nodes: IRNode[], id: NodeId): IRNode | undefined {
    return nodes.find((node) => node.id === id);
  }

  static getConnectedNodes(
    nodeId: NodeId,
    connections: IRConnection[]
  ): {
    inputs: NodeId[];
    outputs: NodeId[];
  } {
    const inputs = connections
      .filter((c) => c.target === nodeId)
      .map((c) => c.source);

    const outputs = connections
      .filter((c) => c.source === nodeId)
      .map((c) => c.target);

    return { inputs, outputs };
  }

  static cloneNode(node: IRNode, newId?: NodeId): IRNode {
    return {
      ...structuredClone(node),
      id: newId || `${node.id}_copy`,
    };
  }

  static validateNodeParameters(node: IRNode): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    for (const param of node.parameters) {
      if (
        param.required &&
        (param.value === undefined || param.value === null)
      ) {
        errors.push(`Required parameter '${param.name}' is missing`);
      }

      if (param.validation && param.value !== undefined) {
        const { min, max, pattern } = param.validation;

        if (typeof param.value === 'number') {
          if (min !== undefined && param.value < min) {
            errors.push(
              `Parameter '${param.name}' value ${param.value} is below minimum ${min}`
            );
          }
          if (max !== undefined && param.value > max) {
            errors.push(
              `Parameter '${param.name}' value ${param.value} is above maximum ${max}`
            );
          }
        }

        if (typeof param.value === 'string' && pattern) {
          const regex = new RegExp(pattern);
          if (!regex.test(param.value)) {
            errors.push(
              `Parameter '${param.name}' value does not match required pattern`
            );
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
