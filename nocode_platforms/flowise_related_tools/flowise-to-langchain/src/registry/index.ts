/**
 * Registry Index - Main export for the converter registry system
 *
 * This module provides the main entry point for the converter registry,
 * including all built-in converters and setup utilities.
 */

// Core registry exports
export {
  ConverterRegistry,
  BaseConverter,
  ConverterFactory,
  PluginManager,
  converterRegistry,
} from './registry.js';
export type { NodeConverter } from './registry.js';

// LLM Converters
export {
  OpenAIConverter,
  ChatOpenAIConverter,
  AnthropicConverter,
  AzureOpenAIConverter,
  OllamaConverter,
  HuggingFaceConverter,
  CohereConverter,
  ReplicateConverter,
  GoogleGenerativeAIConverter,
} from './converters/llm.js';

// Bedrock Converters
export {
  BedrockChatConverter,
  BedrockLLMConverter,
  BedrockEmbeddingConverter,
} from './converters/bedrock.js';

// Prompt Converters
export {
  ChatPromptTemplateConverter,
  PromptTemplateConverter,
  FewShotPromptTemplateConverter,
  SystemMessageConverter,
  HumanMessageConverter,
  AIMessageConverter,
} from './converters/prompt.js';

// Chain Converters
export {
  LLMChainConverter,
  ConversationChainConverter,
  RetrievalQAChainConverter,
  MultiPromptChainConverter,
  SequentialChainConverter,
  TransformChainConverter,
  MapReduceChainConverter,
  APIChainConverter,
  SQLDatabaseChainConverter,
} from './converters/chain.js';

// Memory Converters
export {
  BufferMemoryConverter,
  BufferWindowMemoryConverter,
  SummaryBufferMemoryConverter,
  VectorStoreRetrieverMemoryConverter,
  ConversationSummaryMemoryConverter,
  EntityMemoryConverter,
  ZepMemoryConverter,
} from './converters/memory.js';

// Tool Converters
export {
  CalculatorConverter,
  SearchAPIConverter as ToolSearchAPIConverter,
  WebBrowserConverter,
  CustomToolConverter,
  ShellToolConverter,
  RequestToolConverter,
  FileSystemConverter,
} from './converters/tool.js';

// Google Suite Tool Converters
export {
  GmailToolConverter,
  GoogleCalendarToolConverter,
  GoogleDriveToolConverter,
  GoogleDocsToolConverter,
  GoogleSheetsToolConverter,
} from './converters/google-tools.js';

// Extended Google Suite Tool Converters
export {
  GoogleWorkspaceToolConverter,
  GoogleMeetToolConverter,
  GoogleFormsToolConverter,
} from './converters/google-tools-extended.js';

// Search Tool Converters
export { DuckDuckGoSearchConverter } from './converters/search-tool.js';

// Advanced Search API Converters
export {
  TavilySearchConverter,
  BraveSearchConverter,
  GoogleSearchConverter,
  ExaSearchConverter,
  ArxivSearchConverter,
  WolframAlphaConverter,
  SerpAPIConverter,
  SearchAPIConverter,
  DataForSEOConverter,
  SearXNGSearchConverter,
} from './converters/advanced-search-apis.js';

// Vector Store Converters
export {
  PineconeConverter,
  ChromaConverter,
  FAISSConverter,
  MemoryVectorStoreConverter,
  SupabaseConverter,
  WeaviateConverter,
  QdrantConverter,
} from './converters/vectorstore.js';

// Embeddings Converters
export {
  OpenAIEmbeddingsConverter,
  CohereEmbeddingsConverter,
  HuggingFaceEmbeddingsConverter,
  AzureOpenAIEmbeddingsConverter,
  GoogleVertexAIEmbeddingsConverter,
} from './converters/embeddings.js';

// Document Loader Converters
export {
  PDFLoaderConverter,
  CSVLoaderConverter,
  JSONLoaderConverter,
  TextLoaderConverter,
  DocxLoaderConverter,
  DirectoryLoaderConverter,
  ExcelLoaderConverter,
  WebBaseLoaderConverter,
  WebLoaderConverter,
} from './converters/document-loader.js';

// Text Splitter Converters
export {
  RecursiveCharacterTextSplitterConverter,
  CharacterTextSplitterConverter,
  TokenTextSplitterConverter,
  MarkdownTextSplitterConverter,
  LatexTextSplitterConverter,
  HtmlTextSplitterConverter,
  PythonCodeTextSplitterConverter,
  JavaScriptCodeTextSplitterConverter,
  SemanticTextSplitterConverter,
} from './converters/text-splitter.js';

// Streaming Converters
export {
  StreamingLLMConverter,
  StreamingChainConverter,
  StreamingAgentConverter,
  RealTimeStreamingConverter,
  WebSocketStreamingConverter,
  SSEStreamingConverter,
} from './converters/streaming.js';

// RAG Chain Converters
export {
  AdvancedRAGChainConverter,
  MultiVectorRAGChainConverter,
  ConversationalRAGChainConverter,
  GraphRAGChainConverter,
  AdaptiveRAGChainConverter,
} from './converters/rag-chains.js';

// Function Calling Converters
export {
  EnhancedOpenAIFunctionsAgentConverter,
  StructuredOutputFunctionConverter,
  MultiStepFunctionChainConverter,
  FunctionCallValidatorConverter,
  FunctionCallRouterConverter,
} from './converters/function-calling.js';

// Agent Converters
export {
  OpenAIFunctionsAgentConverter,
  ConversationalAgentConverter,
  ToolCallingAgentConverter,
  StructuredChatAgentConverter,
  AgentExecutorConverter,
  ZeroShotReactDescriptionAgentConverter,
  ReactDocstoreAgentConverter,
  ConversationalReactDescriptionAgentConverter,
  ChatAgentConverter,
} from './converters/agent.js';

// Output Parser Converters
export {
  StructuredOutputParserConverter,
  JsonOutputParserConverter,
  ListOutputParserConverter,
} from './converters/output-parser.js';

export { OutputFixingParserConverter } from './converters/output-fixing-parser.js';

// AgentFlow V2 Converters
export {
  AgentNodeConverter,
  ToolNodeConverter,
  CustomFunctionNodeConverter,
  SubflowNodeConverter,
} from './converters/agentflow-v2.js';

// Import all converter classes for registration
import {
  OpenAIConverter,
  ChatOpenAIConverter,
  AnthropicConverter,
  AzureOpenAIConverter,
  OllamaConverter,
  HuggingFaceConverter,
  CohereConverter,
  ReplicateConverter,
  GoogleGenerativeAIConverter,
} from './converters/llm.js';

import {
  BedrockChatConverter,
  BedrockLLMConverter,
  BedrockEmbeddingConverter,
} from './converters/bedrock.js';

import {
  ChatPromptTemplateConverter,
  PromptTemplateConverter,
  FewShotPromptTemplateConverter,
  SystemMessageConverter,
  HumanMessageConverter,
  AIMessageConverter,
} from './converters/prompt.js';

import {
  LLMChainConverter,
  ConversationChainConverter,
  RetrievalQAChainConverter,
  MultiPromptChainConverter,
  SequentialChainConverter,
  TransformChainConverter,
  MapReduceChainConverter,
  APIChainConverter,
  SQLDatabaseChainConverter,
} from './converters/chain.js';

import {
  BufferMemoryConverter,
  BufferWindowMemoryConverter,
  SummaryBufferMemoryConverter,
  VectorStoreRetrieverMemoryConverter,
  ConversationSummaryMemoryConverter,
  EntityMemoryConverter,
  ZepMemoryConverter,
} from './converters/memory.js';

import {
  CalculatorConverter,
  SearchAPIConverter as ToolSearchAPIConverter,
  WebBrowserConverter,
  CustomToolConverter,
  ShellToolConverter,
  RequestToolConverter,
  FileSystemConverter,
} from './converters/tool.js';

import {
  GmailToolConverter,
  GoogleCalendarToolConverter,
  GoogleDriveToolConverter,
  GoogleDocsToolConverter,
  GoogleSheetsToolConverter,
} from './converters/google-tools.js';

import {
  GoogleWorkspaceToolConverter,
  GoogleMeetToolConverter,
  GoogleFormsToolConverter,
} from './converters/google-tools-extended.js';

import { DuckDuckGoSearchConverter } from './converters/search-tool.js';

import {
  TavilySearchConverter,
  BraveSearchConverter,
  GoogleSearchConverter,
  ExaSearchConverter,
  ArxivSearchConverter,
  WolframAlphaConverter,
  SerpAPIConverter,
  SearchAPIConverter,
  DataForSEOConverter,
  SearXNGSearchConverter,
} from './converters/advanced-search-apis.js';

import {
  PineconeConverter,
  ChromaConverter,
  FAISSConverter,
  MemoryVectorStoreConverter,
  SupabaseConverter,
  WeaviateConverter,
  QdrantConverter,
} from './converters/vectorstore.js';

import {
  OpenAIEmbeddingsConverter,
  CohereEmbeddingsConverter,
  HuggingFaceEmbeddingsConverter,
  AzureOpenAIEmbeddingsConverter,
  GoogleVertexAIEmbeddingsConverter,
} from './converters/embeddings.js';

import {
  PDFLoaderConverter,
  CSVLoaderConverter,
  JSONLoaderConverter,
  TextLoaderConverter,
  DocxLoaderConverter,
  DirectoryLoaderConverter,
  ExcelLoaderConverter,
  WebBaseLoaderConverter,
  WebLoaderConverter,
} from './converters/document-loader.js';

import {
  RecursiveCharacterTextSplitterConverter,
  CharacterTextSplitterConverter,
  TokenTextSplitterConverter,
  MarkdownTextSplitterConverter,
  LatexTextSplitterConverter,
  HtmlTextSplitterConverter,
  PythonCodeTextSplitterConverter,
  JavaScriptCodeTextSplitterConverter,
  SemanticTextSplitterConverter,
} from './converters/text-splitter.js';

import {
  StreamingLLMConverter,
  StreamingChainConverter,
  StreamingAgentConverter,
  RealTimeStreamingConverter,
  WebSocketStreamingConverter,
  SSEStreamingConverter,
} from './converters/streaming.js';

import {
  AdvancedRAGChainConverter,
  MultiVectorRAGChainConverter,
  ConversationalRAGChainConverter,
  GraphRAGChainConverter,
  AdaptiveRAGChainConverter,
} from './converters/rag-chains.js';

import {
  EnhancedOpenAIFunctionsAgentConverter,
  StructuredOutputFunctionConverter,
  MultiStepFunctionChainConverter,
  FunctionCallValidatorConverter,
  FunctionCallRouterConverter,
} from './converters/function-calling.js';

import {
  OpenAIFunctionsAgentConverter,
  ConversationalAgentConverter,
  ToolCallingAgentConverter,
  StructuredChatAgentConverter,
  AgentExecutorConverter,
  ZeroShotReactDescriptionAgentConverter,
  ReactDocstoreAgentConverter,
  ConversationalReactDescriptionAgentConverter,
  ChatAgentConverter,
} from './converters/agent.js';

import {
  StructuredOutputParserConverter,
  JsonOutputParserConverter,
  ListOutputParserConverter,
} from './converters/output-parser.js';

import { OutputFixingParserConverter } from './converters/output-fixing-parser.js';

import {
  AgentNodeConverter,
  ToolNodeConverter,
  CustomFunctionNodeConverter,
  SubflowNodeConverter,
} from './converters/agentflow-v2.js';

// Cache Converters
export {
  RedisCacheConverter,
  InMemoryCacheConverter,
  MomentoCacheConverter,
  UpstashRedisCacheConverter,
} from './converters/cache.js';

// Business Tool Converters
export {
  JiraToolConverter,
  StripeToolConverter,
  AirtableToolConverter,
  NotionToolConverter,
  SlackToolConverter,
  HubSpotToolConverter,
  SalesforceToolConverter,
  MicrosoftTeamsToolConverter,
  AsanaToolConverter,
} from './converters/business-tools.js';

// Development Tool Converters
export {
  CodeInterpreterConverter,
  OpenAPIConverter,
  GitHubConverter,
  DockerConverter,
  ShellConverter,
  DatabaseConverter,
  convertDevelopmentTool,
  developmentToolConverters,
} from './converters/development-tools.js';

import {
  RedisCacheConverter,
  InMemoryCacheConverter,
  MomentoCacheConverter,
  UpstashRedisCacheConverter,
} from './converters/cache.js';

import {
  JiraToolConverter,
  StripeToolConverter,
  AirtableToolConverter,
  NotionToolConverter,
  SlackToolConverter,
  HubSpotToolConverter,
  SalesforceToolConverter,
  MicrosoftTeamsToolConverter,
  AsanaToolConverter,
} from './converters/business-tools.js';

import {
  CodeInterpreterConverter,
  OpenAPIConverter,
  GitHubConverter,
  DockerConverter,
  ShellConverter,
  DatabaseConverter,
} from './converters/development-tools.js';

import {
  CodeInterpreterWrapper,
  OpenAPIWrapper,
  GitHubWrapper,
  DockerWrapper,
  ShellWrapper,
  DatabaseWrapper,
} from './converters/development-tools-wrapper.js';

import { ConverterFactory, ConverterRegistry } from './registry.js';

/**
 * All built-in converter classes
 */
export const BUILT_IN_CONVERTERS = [
  // LLM Converters
  OpenAIConverter,
  ChatOpenAIConverter,
  AnthropicConverter,
  AzureOpenAIConverter,
  OllamaConverter,
  HuggingFaceConverter,
  CohereConverter,
  ReplicateConverter,
  GoogleGenerativeAIConverter,

  // Bedrock Converters
  BedrockChatConverter,
  BedrockLLMConverter,
  BedrockEmbeddingConverter,

  // Prompt Converters
  ChatPromptTemplateConverter,
  PromptTemplateConverter,
  FewShotPromptTemplateConverter,
  SystemMessageConverter,
  HumanMessageConverter,
  AIMessageConverter,

  // Chain Converters
  LLMChainConverter,
  ConversationChainConverter,
  RetrievalQAChainConverter,
  MultiPromptChainConverter,
  SequentialChainConverter,
  TransformChainConverter,
  MapReduceChainConverter,
  APIChainConverter,
  SQLDatabaseChainConverter,

  // Memory Converters
  BufferMemoryConverter,
  BufferWindowMemoryConverter,
  SummaryBufferMemoryConverter,
  VectorStoreRetrieverMemoryConverter,
  ConversationSummaryMemoryConverter,
  EntityMemoryConverter,
  ZepMemoryConverter,

  // Tool Converters
  CalculatorConverter,
  ToolSearchAPIConverter,
  WebBrowserConverter,
  CustomToolConverter,
  ShellToolConverter,
  RequestToolConverter,
  FileSystemConverter,

  // Google Suite Tool Converters
  GmailToolConverter,
  GoogleCalendarToolConverter,
  GoogleDriveToolConverter,
  GoogleDocsToolConverter,
  GoogleSheetsToolConverter,

  // Extended Google Suite Tool Converters
  GoogleWorkspaceToolConverter,
  GoogleMeetToolConverter,
  GoogleFormsToolConverter,

  // Search Tool Converters
  DuckDuckGoSearchConverter,

  // Advanced Search API Converters
  TavilySearchConverter,
  BraveSearchConverter,
  GoogleSearchConverter,
  ExaSearchConverter,
  ArxivSearchConverter,
  WolframAlphaConverter,
  SerpAPIConverter,
  SearchAPIConverter,
  DataForSEOConverter,
  SearXNGSearchConverter,

  // Vector Store Converters
  PineconeConverter,
  ChromaConverter,
  FAISSConverter,
  MemoryVectorStoreConverter,
  SupabaseConverter,
  WeaviateConverter,
  QdrantConverter,

  // Embeddings Converters
  OpenAIEmbeddingsConverter,
  CohereEmbeddingsConverter,
  HuggingFaceEmbeddingsConverter,
  AzureOpenAIEmbeddingsConverter,
  GoogleVertexAIEmbeddingsConverter,

  // Document Loader Converters
  PDFLoaderConverter,
  CSVLoaderConverter,
  JSONLoaderConverter,
  TextLoaderConverter,
  DocxLoaderConverter,
  DirectoryLoaderConverter,
  ExcelLoaderConverter,
  WebBaseLoaderConverter,
  WebLoaderConverter,

  // Text Splitter Converters
  RecursiveCharacterTextSplitterConverter,
  CharacterTextSplitterConverter,
  TokenTextSplitterConverter,
  MarkdownTextSplitterConverter,
  LatexTextSplitterConverter,
  HtmlTextSplitterConverter,
  PythonCodeTextSplitterConverter,
  JavaScriptCodeTextSplitterConverter,
  SemanticTextSplitterConverter,

  // Streaming Converters
  StreamingLLMConverter,
  StreamingChainConverter,
  StreamingAgentConverter,
  RealTimeStreamingConverter,
  WebSocketStreamingConverter,
  SSEStreamingConverter,

  // RAG Chain Converters
  AdvancedRAGChainConverter,
  MultiVectorRAGChainConverter,
  ConversationalRAGChainConverter,
  GraphRAGChainConverter,
  AdaptiveRAGChainConverter,

  // Function Calling Converters
  EnhancedOpenAIFunctionsAgentConverter,
  StructuredOutputFunctionConverter,
  MultiStepFunctionChainConverter,
  FunctionCallValidatorConverter,
  FunctionCallRouterConverter,

  // Agent Converters
  OpenAIFunctionsAgentConverter,
  ConversationalAgentConverter,
  ToolCallingAgentConverter,
  StructuredChatAgentConverter,
  AgentExecutorConverter,
  ZeroShotReactDescriptionAgentConverter,
  ReactDocstoreAgentConverter,
  ConversationalReactDescriptionAgentConverter,
  ChatAgentConverter,

  // Output Parser Converters
  StructuredOutputParserConverter,
  JsonOutputParserConverter,
  ListOutputParserConverter,
  OutputFixingParserConverter,

  // AgentFlow V2 Converters
  AgentNodeConverter,
  ToolNodeConverter,
  CustomFunctionNodeConverter,
  SubflowNodeConverter,

  // Cache Converters
  RedisCacheConverter,
  InMemoryCacheConverter,
  MomentoCacheConverter,
  UpstashRedisCacheConverter,

  // Business Tool Converters
  JiraToolConverter,
  StripeToolConverter,
  AirtableToolConverter,
  NotionToolConverter,
  SlackToolConverter,
  HubSpotToolConverter,
  SalesforceToolConverter,
  MicrosoftTeamsToolConverter,
  AsanaToolConverter,

  // Development Tool Converters (wrapped)
  CodeInterpreterWrapper,
  OpenAPIWrapper,
  GitHubWrapper,
  DockerWrapper,
  ShellWrapper,
  DatabaseWrapper,
];

/**
 * Initialize the registry with all built-in converters
 */
export function initializeRegistry(): void {
  // Reset registry first to ensure clean state
  ConverterFactory.reset();

  // Register all built-in converters
  ConverterFactory.registerConverters(BUILT_IN_CONVERTERS);

  // Register common aliases
  const registry = ConverterFactory.getRegistry();

  // LLM aliases
  registry.registerAlias('openai', 'openAI');
  registry.registerAlias('gpt', 'chatOpenAI');
  registry.registerAlias('claude', 'anthropic');
  registry.registerAlias('azure', 'azureOpenAI');
  registry.registerAlias('gemini', 'googleGenerativeAI');
  registry.registerAlias('google', 'googleGenerativeAI');

  // Bedrock aliases
  registry.registerAlias('bedrock', 'bedrockChat');
  registry.registerAlias('aws', 'bedrockChat');
  registry.registerAlias('awsBedrock', 'bedrockChat');
  registry.registerAlias('bedrockLlm', 'bedrockLLM');
  registry.registerAlias('bedrockEmbeddings', 'bedrockEmbedding');

  // Prompt aliases
  registry.registerAlias('chatPrompt', 'chatPromptTemplate');
  registry.registerAlias('prompt', 'promptTemplate');
  registry.registerAlias('fewShot', 'fewShotPromptTemplate');

  // Chain aliases
  registry.registerAlias('llm_chain', 'llmChain');
  registry.registerAlias('conversation_chain', 'conversationChain');
  registry.registerAlias('qa_chain', 'retrievalQAChain');
  registry.registerAlias('sql_chain', 'sqlDatabaseChain');
  registry.registerAlias('database_chain', 'sqlDatabaseChain');
  registry.registerAlias('api_chain', 'apiChain');
  registry.registerAlias('apiCall', 'apiChain');

  // Memory aliases
  registry.registerAlias('buffer', 'bufferMemory');
  registry.registerAlias('window', 'bufferWindowMemory');
  registry.registerAlias('summary', 'summaryBufferMemory');
  registry.registerAlias('zep', 'zepMemory');

  // Tool aliases
  registry.registerAlias('calc', 'calculator');
  registry.registerAlias('search', 'serpAPI');
  registry.registerAlias('browser', 'webBrowser');
  registry.registerAlias('custom', 'customTool');
  registry.registerAlias('shell', 'shellTool');
  registry.registerAlias('request', 'requestTool');
  registry.registerAlias('fs', 'fileSystem');

  // Search Tool aliases
  registry.registerAlias('duckduckgo', 'duckDuckGoSearch');
  registry.registerAlias('ddg', 'duckDuckGoSearch');
  registry.registerAlias('duckDuckGo', 'duckDuckGoSearch');
  registry.registerAlias('duck', 'duckDuckGoSearch');

  // Google Suite Tool aliases
  registry.registerAlias('gmail', 'gmailTool');
  registry.registerAlias('googleGmail', 'gmailTool');
  registry.registerAlias('calendar', 'googleCalendarTool');
  registry.registerAlias('googleCalendar', 'googleCalendarTool');
  registry.registerAlias('gcal', 'googleCalendarTool');
  registry.registerAlias('drive', 'googleDriveTool');
  registry.registerAlias('googleDrive', 'googleDriveTool');
  registry.registerAlias('gdrive', 'googleDriveTool');
  registry.registerAlias('docs', 'googleDocsTool');
  registry.registerAlias('googleDocs', 'googleDocsTool');
  registry.registerAlias('gdocs', 'googleDocsTool');
  registry.registerAlias('sheets', 'googleSheetsTool');
  registry.registerAlias('googleSheets', 'googleSheetsTool');
  registry.registerAlias('gsheets', 'googleSheetsTool');
  registry.registerAlias('spreadsheet', 'googleSheetsTool');
  registry.registerAlias('workspace', 'googleWorkspaceTool');
  registry.registerAlias('googleWorkspace', 'googleWorkspaceTool');
  registry.registerAlias('admin', 'googleWorkspaceTool');
  registry.registerAlias('meet', 'googleMeetTool');
  registry.registerAlias('googleMeet', 'googleMeetTool');
  registry.registerAlias('video', 'googleMeetTool');
  registry.registerAlias('forms', 'googleFormsTool');
  registry.registerAlias('googleForms', 'googleFormsTool');
  registry.registerAlias('gforms', 'googleFormsTool');

  // Advanced Search API aliases
  registry.registerAlias('tavily', 'tavilySearch');
  registry.registerAlias('brave', 'braveSearch');
  registry.registerAlias('google', 'googleSearchAPI');
  registry.registerAlias('googleSearch', 'googleSearchAPI');
  registry.registerAlias('exa', 'exaSearch');
  registry.registerAlias('arxiv', 'arxivSearch');
  registry.registerAlias('wolfram', 'wolframAlpha');
  registry.registerAlias('wolframalpha', 'wolframAlpha');
  registry.registerAlias('serpapi', 'serpAPI');
  registry.registerAlias('serp', 'serpAPI');
  registry.registerAlias('searchapi', 'searchAPI');
  registry.registerAlias('dataforseo', 'dataForSEO');
  registry.registerAlias('searxng', 'searxngSearch');
  registry.registerAlias('searx', 'searxngSearch');

  // Vector Store aliases
  registry.registerAlias('vectorstore', 'memoryVectorStore');
  registry.registerAlias('vector', 'memoryVectorStore');
  registry.registerAlias('pineconeVectorStore', 'pinecone');
  registry.registerAlias('chromaVectorStore', 'chroma');
  registry.registerAlias('faissVectorStore', 'faiss');
  registry.registerAlias('supabaseVectorStore', 'supabase');
  registry.registerAlias('weaviateVectorStore', 'weaviate');
  registry.registerAlias('qdrantVectorStore', 'qdrant');

  // Embeddings aliases
  registry.registerAlias('openaiEmbeddings', 'openAIEmbeddings');
  registry.registerAlias('embeddings', 'openAIEmbeddings');
  registry.registerAlias('cohere', 'cohereEmbeddings');
  registry.registerAlias('huggingface', 'huggingFaceEmbeddings');
  registry.registerAlias('hf', 'huggingFaceEmbeddings');
  registry.registerAlias('azure', 'azureOpenAIEmbeddings');
  registry.registerAlias('vertexai', 'googleVertexAIEmbeddings');

  // Document Loader aliases
  registry.registerAlias('pdf', 'pdfLoader');
  registry.registerAlias('csv', 'csvLoader');
  registry.registerAlias('json', 'jsonLoader');
  registry.registerAlias('text', 'textLoader');
  registry.registerAlias('docx', 'docxLoader');
  registry.registerAlias('directory', 'directoryLoader');
  registry.registerAlias('web', 'webLoader');
  registry.registerAlias('url', 'webLoader');

  // Text Splitter aliases
  registry.registerAlias('textSplitter', 'recursiveCharacterTextSplitter');
  registry.registerAlias(
    'recursiveTextSplitter',
    'recursiveCharacterTextSplitter'
  );
  registry.registerAlias('characterSplitter', 'characterTextSplitter');
  registry.registerAlias('tokenSplitter', 'tokenTextSplitter');
  registry.registerAlias('markdownSplitter', 'markdownTextSplitter');
  registry.registerAlias('latexSplitter', 'latexTextSplitter');
  registry.registerAlias('htmlSplitter', 'htmlTextSplitter');
  registry.registerAlias('pythonSplitter', 'pythonCodeTextSplitter');
  registry.registerAlias('jsSplitter', 'javascriptCodeTextSplitter');
  registry.registerAlias('semanticSplitter', 'semanticTextSplitter');

  // Streaming aliases
  registry.registerAlias('streaming', 'streamingLLM');
  registry.registerAlias('streamingModel', 'streamingLLM');
  registry.registerAlias('streamChain', 'streamingChain');
  registry.registerAlias('streamAgent', 'streamingAgent');
  registry.registerAlias('realTimeStream', 'realTimeStreaming');
  registry.registerAlias('websocketStream', 'webSocketStreaming');
  registry.registerAlias('sseStream', 'sseStreaming');

  // RAG Chain aliases
  registry.registerAlias('advancedRag', 'advancedRAGChain');
  registry.registerAlias('multiVectorRag', 'multiVectorRAGChain');
  registry.registerAlias('conversationalRag', 'conversationalRAGChain');
  registry.registerAlias('graphRag', 'graphRAGChain');
  registry.registerAlias('adaptiveRag', 'adaptiveRAGChain');

  // Function Calling aliases
  registry.registerAlias('enhancedFunctions', 'enhancedOpenAIFunctionsAgent');
  registry.registerAlias('structuredOutput', 'structuredOutputFunction');
  registry.registerAlias('multiStepFunctions', 'multiStepFunctionChain');
  registry.registerAlias('functionValidator', 'functionCallValidator');
  registry.registerAlias('functionRouter', 'functionCallRouter');
  registry.registerAlias('functionCalling', 'enhancedOpenAIFunctionsAgent');

  // Agent aliases
  registry.registerAlias('openAIAgent', 'openAIFunctionsAgent');
  registry.registerAlias('conversationalAgent', 'conversationalAgent');
  registry.registerAlias('agentExecutor', 'agentExecutor');
  registry.registerAlias('reactAgent', 'zeroShotReactDescriptionAgent');
  registry.registerAlias('zeroShotAgent', 'zeroShotReactDescriptionAgent');
  registry.registerAlias('chatAgent', 'chatAgent');
  registry.registerAlias('structuredAgent', 'structuredChatAgent');

  // Output Parser aliases
  registry.registerAlias('structuredParser', 'structuredOutputParser');
  registry.registerAlias('jsonParser', 'jsonOutputParser');
  registry.registerAlias('listParser', 'listOutputParser');
  registry.registerAlias('outputParser', 'structuredOutputParser');
  registry.registerAlias('parser', 'structuredOutputParser');

  // AgentFlow V2 aliases
  registry.registerAlias('agentNode', 'agentNode');
  registry.registerAlias('agent', 'agentNode');
  registry.registerAlias('agentflowAgent', 'agentNode');
  registry.registerAlias('toolNode', 'toolNode');
  registry.registerAlias('tool', 'toolNode');
  registry.registerAlias('agentflowTool', 'toolNode');
  registry.registerAlias('customFunctionNode', 'customFunctionNode');
  registry.registerAlias('customFunction', 'customFunctionNode');
  registry.registerAlias('function', 'customFunctionNode');
  registry.registerAlias('agentflowFunction', 'customFunctionNode');
  registry.registerAlias('subflowNode', 'subflowNode');
  registry.registerAlias('subflow', 'subflowNode');
  registry.registerAlias('nestedWorkflow', 'subflowNode');
  registry.registerAlias('agentflowSubflow', 'subflowNode');

  // Cache aliases
  registry.registerAlias('cache', 'inMemoryCache');
  registry.registerAlias('redis', 'redisCache');
  registry.registerAlias('redisCache', 'redisCache');
  registry.registerAlias('memory', 'inMemoryCache');
  registry.registerAlias('memoryCache', 'inMemoryCache');
  registry.registerAlias('momento', 'momentoCache');
  registry.registerAlias('momentoCache', 'momentoCache');
  registry.registerAlias('upstash', 'upstashRedisCache');
  registry.registerAlias('upstashCache', 'upstashRedisCache');
  registry.registerAlias('upstashRedis', 'upstashRedisCache');

  // Development Tool aliases
  registry.registerAlias('code', 'codeInterpreter');
  registry.registerAlias('codeExecution', 'codeInterpreter');
  registry.registerAlias('python', 'codeInterpreter');
  registry.registerAlias('javascript', 'codeInterpreter');
  registry.registerAlias('jupyter', 'codeInterpreter');
  registry.registerAlias('notebook', 'codeInterpreter');
  registry.registerAlias('openapi', 'openAPITool');
  registry.registerAlias('restapi', 'openAPITool');
  registry.registerAlias('api', 'openAPITool');
  registry.registerAlias('swagger', 'openAPITool');
  registry.registerAlias('github', 'githubTool');
  registry.registerAlias('git', 'githubTool');
  registry.registerAlias('repository', 'githubTool');
  registry.registerAlias('repo', 'githubTool');
  registry.registerAlias('docker', 'dockerTool');
  registry.registerAlias('container', 'dockerTool');
  registry.registerAlias('containerization', 'dockerTool');
  registry.registerAlias('terminal', 'shellTool');
  registry.registerAlias('bash', 'shellTool');
  registry.registerAlias('command', 'shellTool');
  registry.registerAlias('cli', 'shellTool');
  registry.registerAlias('database', 'databaseTool');
  registry.registerAlias('db', 'databaseTool');
  registry.registerAlias('sql', 'databaseTool');
  registry.registerAlias('postgres', 'databaseTool');
  registry.registerAlias('postgresql', 'databaseTool');
  registry.registerAlias('mysql', 'databaseTool');
  registry.registerAlias('sqlite', 'databaseTool');
  registry.registerAlias('mongodb', 'databaseTool');
  registry.registerAlias('mongo', 'databaseTool');
  registry.registerAlias('nosql', 'databaseTool');

  // Business Tool aliases
  registry.registerAlias('jira', 'jiraTool');
  registry.registerAlias('atlassian', 'jiraTool');
  registry.registerAlias('projectManagement', 'jiraTool');
  registry.registerAlias('stripe', 'stripeTool');
  registry.registerAlias('payment', 'stripeTool');
  registry.registerAlias('payments', 'stripeTool');
  registry.registerAlias('billing', 'stripeTool');
  registry.registerAlias('airtable', 'airtableTool');
  registry.registerAlias('database', 'airtableTool');
  registry.registerAlias('crm', 'airtableTool');
  registry.registerAlias('notion', 'notionTool');
  registry.registerAlias('knowledge', 'notionTool');
  registry.registerAlias('knowledgeBase', 'notionTool');
  registry.registerAlias('docs', 'notionTool');
  registry.registerAlias('slack', 'slackTool');
  registry.registerAlias('chat', 'slackTool');
  registry.registerAlias('messaging', 'slackTool');
  registry.registerAlias('communication', 'slackTool');
  registry.registerAlias('hubspot', 'hubspotTool');
  registry.registerAlias('hubSpot', 'hubspotTool');
  registry.registerAlias('marketing', 'hubspotTool');
  registry.registerAlias('salesforce', 'salesforceTool');
  registry.registerAlias('sfdc', 'salesforceTool');
  registry.registerAlias('enterpriseCrm', 'salesforceTool');
  registry.registerAlias('teams', 'microsoftTeamsTool');
  registry.registerAlias('microsoftTeams', 'microsoftTeamsTool');
  registry.registerAlias('msteams', 'microsoftTeamsTool');
  registry.registerAlias('asana', 'asanaTool');
  registry.registerAlias('taskManagement', 'asanaTool');
}

/**
 * Get registry statistics and health information
 */
export function getRegistryInfo(): {
  initialized: boolean;
  totalConverters: number;
  supportedTypes: string[];
  statistics: any; // Use any to avoid circular type issues
} {
  const registry = ConverterFactory.getRegistry();
  const stats = registry.getStatistics();

  return {
    initialized: stats.totalConverters > 0,
    totalConverters: stats.totalConverters,
    supportedTypes: registry.getRegisteredTypes().sort(),
    statistics: stats,
  };
}

/**
 * Validate that the registry can handle a set of node types
 */
export function validateRegistrySupport(nodeTypes: string[]): {
  supported: string[];
  unsupported: string[];
  coverage: number;
} {
  const registry = ConverterFactory.getRegistry();
  const supported: string[] = [];
  const unsupported: string[] = [];

  for (const nodeType of nodeTypes) {
    if (registry.hasConverter(nodeType)) {
      supported.push(nodeType);
    } else {
      unsupported.push(nodeType);
    }
  }

  const coverage =
    nodeTypes.length > 0 ? (supported.length / nodeTypes.length) * 100 : 100;

  return {
    supported,
    unsupported,
    coverage: Math.round(coverage * 100) / 100,
  };
}

/**
 * Get recommended converters for unsupported node types
 */
export function getConverterRecommendations(
  unsupportedTypes: string[]
): Record<string, string[]> {
  const registry = ConverterFactory.getRegistry();
  const recommendations: Record<string, string[]> = {};

  for (const type of unsupportedTypes) {
    const suggestions: string[] = [];

    // Look for similar converter names
    const registeredTypes = registry.getRegisteredTypes();
    for (const registeredType of registeredTypes) {
      // Simple similarity check
      if (
        registeredType.toLowerCase().includes(type.toLowerCase()) ||
        type.toLowerCase().includes(registeredType.toLowerCase())
      ) {
        suggestions.push(registeredType);
      }
    }

    // Look for common patterns
    if (
      type.toLowerCase().includes('llm') ||
      type.toLowerCase().includes('model')
    ) {
      suggestions.push(
        ...registeredTypes.filter(
          (t) => registry.getConverter(t)?.['category'] === 'llm'
        )
      );
    }

    if (
      type.toLowerCase().includes('prompt') ||
      type.toLowerCase().includes('template')
    ) {
      suggestions.push(
        ...registeredTypes.filter(
          (t) => registry.getConverter(t)?.['category'] === 'prompt'
        )
      );
    }

    if (type.toLowerCase().includes('chain')) {
      suggestions.push(
        ...registeredTypes.filter(
          (t) => registry.getConverter(t)?.['category'] === 'chain'
        )
      );
    }

    if (type.toLowerCase().includes('memory')) {
      suggestions.push(
        ...registeredTypes.filter(
          (t) => registry.getConverter(t)?.['category'] === 'memory'
        )
      );
    }

    if (type.toLowerCase().includes('agent')) {
      suggestions.push(
        ...registeredTypes.filter(
          (t) => registry.getConverter(t)?.['category'] === 'agent'
        )
      );
    }

    if (
      type.toLowerCase().includes('parser') ||
      type.toLowerCase().includes('output') ||
      type.toLowerCase().includes('structured')
    ) {
      suggestions.push(
        ...registeredTypes.filter(
          (t) => registry.getConverter(t)?.['category'] === 'output-parser'
        )
      );
    }

    // Remove duplicates and limit suggestions
    recommendations[type] = [...new Set(suggestions)].slice(0, 5);
  }

  return recommendations;
}

/**
 * Create a registry plugin from a set of converters
 */
export function createPlugin(
  name: string,
  version: string,
  converters: Array<new () => any>,
  description?: string,
  aliases?: Record<string, string>
): {
  name: string;
  version: string;
  description?: string;
  converters: Array<new () => any>;
  aliases?: Record<string, string>;
} {
  return {
    name,
    version,
    ...(description !== undefined && { description }),
    converters,
    ...(aliases !== undefined && { aliases }),
  };
}

/**
 * Registry debugging utilities
 */
export const RegistryDebug = {
  /**
   * List all registered converters with details
   */
  listConverters(): void {
    const registry = ConverterFactory.getRegistry();
    const stats = registry.getStatistics();

    console.log('\n=== Converter Registry Debug Info ===');
    console.log(`Total Converters: ${stats.totalConverters}`);
    console.log(`Total Aliases: ${stats.totalAliases}`);
    console.log(`Deprecated Converters: ${stats.deprecatedConverters}`);

    console.log('\n--- Converters by Category ---');
    for (const [category, count] of Object.entries(
      stats.convertersByCategory
    )) {
      console.log(`${category}: ${count} converters`);

      const converters = registry.getConvertersByCategory(category);
      for (const converter of converters) {
        const status = converter.isDeprecated() ? ' (DEPRECATED)' : '';
        console.log(`  - ${converter['flowiseType']}${status}`);
      }
    }

    console.log('\n--- Registered Aliases ---');
    const aliases = registry.getRegisteredAliases();
    for (const [alias, target] of Object.entries(aliases)) {
      console.log(`  ${alias} → ${target}`);
    }
  },

  /**
   * Test a converter with sample data
   */
  testConverter(nodeType: string, sampleNode?: Partial<any>): void {
    const registry = ConverterFactory.getRegistry();
    const converter = registry.getConverter(nodeType);

    if (!converter) {
      console.error(`No converter found for type: ${nodeType}`);
      return;
    }

    console.log(`\n=== Testing Converter: ${nodeType} ===`);
    console.log(`Category: ${converter['category']}`);
    console.log(`Deprecated: ${converter.isDeprecated()}`);
    console.log(
      `Supported Versions: ${converter.getSupportedVersions().join(', ')}`
    );

    if (sampleNode) {
      try {
        const canConvert = converter.canConvert(sampleNode as any);
        console.log(`Can Convert: ${canConvert}`);

        if (canConvert) {
          const dependencies = converter.getDependencies(
            sampleNode as any,
            {} as any
          );
          console.log(`Dependencies: ${dependencies.join(', ')}`);
        }
      } catch (error) {
        console.error(`Test failed: ${error}`);
      }
    }
  },
};

// Initialize the registry on module load
initializeRegistry();

/**
 * Factory function to create a new registry
 */
export function createRegistry(): ConverterRegistry {
  return new ConverterRegistry();
}

// Export the initialized registry as default
export default ConverterFactory.getRegistry();
