# Flowise to LangChain Converter API Documentation

## Overview

The Flowise to LangChain Converter is a comprehensive TypeScript library that converts Flowise visual workflows into executable LangChain code. This document provides detailed API documentation for developers who want to integrate the converter into their applications or extend its functionality.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Core Classes](#core-classes)
4. [Converter Registry](#converter-registry)
5. [Built-in Converters](#built-in-converters)
6. [Types and Interfaces](#types-and-interfaces)
7. [CLI Reference](#cli-reference)
8. [Error Handling](#error-handling)
9. [Extension Guide](#extension-guide)
10. [Examples](#examples)

## Installation

```bash
npm install flowise-to-langchain
```

## Quick Start

### Basic Usage

```typescript
import { FlowiseToLangChainConverter } from 'flowise-to-langchain';

const converter = new FlowiseToLangChainConverter();
const result = await converter.convert(flowiseJson);

if (result.success) {
  console.log('Generated files:', result.result?.files);
} else {
  console.error('Conversion failed:', result.errors);
}
```

### Utility Functions

```typescript
import { 
  convertFlowiseToLangChain, 
  validateFlowiseJson, 
  getConverterCapabilities 
} from 'flowise-to-langchain';

// Quick conversion
const result = await convertFlowiseToLangChain(flowiseJson, {
  outputPath: './output',
  verbose: true
});

// Validation only
const validation = await validateFlowiseJson(flowiseJson);

// Get supported node types
const capabilities = await getConverterCapabilities();
```

## Core Classes

### FlowiseToLangChainConverter

The main class that orchestrates the conversion pipeline.

#### Constructor

```typescript
constructor(options?: {
  verbose?: boolean;
  silent?: boolean;
})
```

**Parameters:**
- `options.verbose` (boolean, optional): Enable verbose logging
- `options.silent` (boolean, optional): Disable all logging

#### Methods

##### convert()

Converts Flowise JSON to LangChain TypeScript code.

```typescript
async convert(
  input: string | FlowiseChatFlow,
  context?: Partial<GenerationContext>
): Promise<ConversionResult>
```

**Parameters:**
- `input`: Flowise JSON string or parsed FlowiseChatFlow object
- `context`: Optional generation context with configuration options

**Returns:** `ConversionResult` object containing:
- `success`: boolean indicating if conversion succeeded
- `result`: CodeGenerationResult with generated files (if successful)
- `errors`: array of error messages
- `warnings`: array of warning messages
- `metrics`: performance metrics

##### validate()

Validates Flowise JSON without full conversion.

```typescript
async validate(input: string | FlowiseChatFlow): Promise<ValidationResult>
```

**Parameters:**
- `input`: Flowise JSON string or parsed FlowiseChatFlow object

**Returns:** `ValidationResult` object containing:
- `isValid`: boolean indicating if input is valid
- `errors`: array of error messages
- `warnings`: array of warning messages
- `analysis`: optional analysis data with node counts and coverage

##### getCapabilities()

Returns information about supported node types and converters.

```typescript
async getCapabilities(): Promise<CapabilityInfo>
```

**Returns:** `CapabilityInfo` object containing:
- `totalConverters`: number of registered converters
- `supportedTypes`: array of supported node types
- `categories`: converter counts by category
- `aliases`: map of aliases to actual types

### FlowiseParser

Parses and validates Flowise JSON input.

```typescript
import { FlowiseParser } from 'flowise-to-langchain';

const parser = new FlowiseParser();
const result = await parser.parse(jsonString);
```

### IRProcessor

Processes parsed Flowise data into Intermediate Representation (IR).

```typescript
import { IRProcessor } from 'flowise-to-langchain';

const processor = new IRProcessor();
const result = await processor.processFlow(flowData, context);
```

### TypeScriptEmitter

Generates TypeScript code from IR.

```typescript
import { TypeScriptEmitter } from 'flowise-to-langchain';

const emitter = new TypeScriptEmitter();
const code = await emitter.emit(irGraph, context);
```

## Converter Registry

The converter registry manages all available node type converters.

### ConverterRegistry

```typescript
import { ConverterRegistry, ConverterFactory } from 'flowise-to-langchain';

const registry = ConverterFactory.getRegistry();
```

#### Methods

##### hasConverter()

Check if a converter exists for a node type.

```typescript
hasConverter(nodeType: string): boolean
```

##### getConverter()

Get a converter instance for a node type.

```typescript
getConverter(nodeType: string): BaseConverter | null
```

##### getRegisteredTypes()

Get all registered node types.

```typescript
getRegisteredTypes(): string[]
```

##### getStatistics()

Get registry statistics.

```typescript
getStatistics(): RegistryStatistics
```

### BaseConverter

Base class for all converters.

```typescript
abstract class BaseConverter {
  abstract flowiseType: string;
  abstract category: string;
  
  abstract canConvert(node: IRNode): boolean;
  abstract convert(node: IRNode, context: GenerationContext): CodeFragment[];
  abstract getDependencies(node: IRNode, context?: GenerationContext): string[];
  
  getSupportedVersions(): string[];
  isDeprecated(): boolean;
  getReplacementType(): string | undefined;
}
```

## Built-in Converters

### LLM Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `openAI` | `OpenAI` | `@langchain/openai` |
| `chatOpenAI` | `ChatOpenAI` | `@langchain/openai` |
| `anthropic` | `ChatAnthropic` | `@langchain/anthropic` |
| `azureOpenAI` | `AzureChatOpenAI` | `@langchain/openai` |
| `ollama` | `ChatOllama` | `@langchain/ollama` |
| `huggingFace` | `HuggingFaceInference` | `@langchain/community` |
| `cohere` | `ChatCohere` | `@langchain/cohere` |
| `replicate` | `ChatReplicate` | `@langchain/community` |

### Chain Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `llmChain` | `LLMChain` | `langchain/chains` |
| `conversationChain` | `ConversationChain` | `langchain/chains` |
| `retrievalQAChain` | `RetrievalQAChain` | `langchain/chains` |
| `multiPromptChain` | `MultiPromptChain` | `langchain/chains` |
| `sequentialChain` | `SequentialChain` | `langchain/chains` |
| `transformChain` | `TransformChain` | `langchain/chains` |
| `mapReduceChain` | `MapReduceChain` | `langchain/chains` |

### Agent Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `openAIFunctionsAgent` | `createOpenAIFunctionsAgent` | `langchain/agents` |
| `conversationalAgent` | `createReactAgent` | `langchain/agents` |
| `toolCallingAgent` | `createOpenAIToolsAgent` | `langchain/agents` |
| `structuredChatAgent` | `createStructuredChatAgent` | `langchain/agents` |
| `agentExecutor` | `AgentExecutor` | `langchain/agents` |
| `zeroShotReactDescriptionAgent` | `createReactAgent` | `langchain/agents` |
| `reactDocstoreAgent` | `createReactAgent` | `langchain/agents` |
| `conversationalReactDescriptionAgent` | `createReactAgent` | `langchain/agents` |
| `chatAgent` | `createOpenAIToolsAgent` | `langchain/agents` |

### Memory Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `bufferMemory` | `BufferMemory` | `langchain/memory` |
| `bufferWindowMemory` | `BufferWindowMemory` | `langchain/memory` |
| `summaryBufferMemory` | `ConversationSummaryBufferMemory` | `langchain/memory` |
| `vectorStoreRetrieverMemory` | `VectorStoreRetrieverMemory` | `langchain/memory` |
| `conversationSummaryMemory` | `ConversationSummaryMemory` | `langchain/memory` |
| `entityMemory` | `EntityMemory` | `langchain/memory` |

### Tool Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `calculator` | `Calculator` | `langchain/tools` |
| `serpAPI` | `SerpAPI` | `langchain/tools` |
| `webBrowser` | `WebBrowser` | `langchain/tools` |
| `customTool` | `DynamicTool` | `langchain/tools` |
| `shellTool` | `ShellTool` | `langchain/tools` |
| `requestTool` | `RequestTool` | `langchain/tools` |
| `fileSystem` | `FileSystemTool` | `langchain/tools` |

### Vector Store Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `pinecone` | `PineconeStore` | `@langchain/pinecone` |
| `chroma` | `Chroma` | `@langchain/community` |
| `faiss` | `FaissStore` | `@langchain/community` |
| `memoryVectorStore` | `MemoryVectorStore` | `langchain/vectorstores` |
| `supabase` | `SupabaseVectorStore` | `@langchain/community` |

### Embeddings Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `openAIEmbeddings` | `OpenAIEmbeddings` | `@langchain/openai` |
| `cohereEmbeddings` | `CohereEmbeddings` | `@langchain/cohere` |
| `huggingFaceEmbeddings` | `HuggingFaceEmbeddings` | `@langchain/community` |
| `azureOpenAIEmbeddings` | `AzureOpenAIEmbeddings` | `@langchain/openai` |
| `googleVertexAIEmbeddings` | `GoogleVertexAIEmbeddings` | `@langchain/google-vertexai` |

### Document Loader Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `pdfLoader` | `PDFLoader` | `langchain/document_loaders` |
| `csvLoader` | `CSVLoader` | `langchain/document_loaders` |
| `jsonLoader` | `JSONLoader` | `langchain/document_loaders` |
| `textLoader` | `TextLoader` | `langchain/document_loaders` |
| `docxLoader` | `DocxLoader` | `langchain/document_loaders` |
| `directoryLoader` | `DirectoryLoader` | `langchain/document_loaders` |
| `webLoader` | `WebLoader` | `langchain/document_loaders` |

### Text Splitter Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `recursiveCharacterTextSplitter` | `RecursiveCharacterTextSplitter` | `langchain/text_splitter` |
| `characterTextSplitter` | `CharacterTextSplitter` | `langchain/text_splitter` |
| `tokenTextSplitter` | `TokenTextSplitter` | `langchain/text_splitter` |
| `markdownTextSplitter` | `MarkdownTextSplitter` | `langchain/text_splitter` |
| `latexTextSplitter` | `LatexTextSplitter` | `langchain/text_splitter` |
| `htmlTextSplitter` | `HTMLTextSplitter` | `langchain/text_splitter` |
| `pythonCodeTextSplitter` | `PythonCodeTextSplitter` | `langchain/text_splitter` |
| `javascriptCodeTextSplitter` | `JavaScriptCodeTextSplitter` | `langchain/text_splitter` |
| `semanticTextSplitter` | `SemanticTextSplitter` | `langchain/text_splitter` |

### Streaming Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `streamingLLM` | `StreamingLLM` | `langchain/llms` |
| `streamingChain` | `StreamingChain` | `langchain/chains` |
| `streamingAgent` | `StreamingAgent` | `langchain/agents` |
| `realTimeStreaming` | `RealTimeStreaming` | `langchain/streaming` |
| `webSocketStreaming` | `WebSocketStreaming` | `langchain/streaming` |
| `sseStreaming` | `SSEStreaming` | `langchain/streaming` |

### RAG Chain Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `advancedRAGChain` | `AdvancedRAGChain` | `langchain/chains` |
| `multiVectorRAGChain` | `MultiVectorRAGChain` | `langchain/chains` |
| `conversationalRAGChain` | `ConversationalRAGChain` | `langchain/chains` |
| `graphRAGChain` | `GraphRAGChain` | `langchain/chains` |
| `adaptiveRAGChain` | `AdaptiveRAGChain` | `langchain/chains` |

### Function Calling Converters

| Flowise Type | LangChain Class | Module |
|--------------|-----------------|--------|
| `enhancedOpenAIFunctionsAgent` | `EnhancedOpenAIFunctionsAgent` | `langchain/agents` |
| `structuredOutputFunction` | `StructuredOutputFunction` | `langchain/functions` |
| `multiStepFunctionChain` | `MultiStepFunctionChain` | `langchain/chains` |
| `functionCallValidator` | `FunctionCallValidator` | `langchain/functions` |
| `functionCallRouter` | `FunctionCallRouter` | `langchain/functions` |

## Types and Interfaces

### FlowiseChatFlow

```typescript
interface FlowiseChatFlow {
  id: string;
  chatflow: {
    name: string;
    description?: string;
    version?: string;
  };
  nodes: FlowiseNode[];
  edges: FlowiseEdge[];
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
}
```

### FlowiseNode

```typescript
interface FlowiseNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    name: string;
    label?: string;
    description?: string;
    category?: string;
    inputParams?: NodeParameter[];
    outputParams?: NodeParameter[];
    inputs?: Record<string, any>;
    outputs?: Record<string, any>;
  };
  selected?: boolean;
  dragging?: boolean;
  width?: number;
  height?: number;
}
```

### FlowiseEdge

```typescript
interface FlowiseEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  animated?: boolean;
  style?: Record<string, any>;
  data?: Record<string, any>;
}
```

### IRNode

```typescript
interface IRNode {
  id: string;
  type: string;
  category: string;
  position: Position;
  inputs: IRConnection[];
  outputs: IRConnection[];
  parameters: NodeParameter[];
  metadata: Record<string, any>;
}
```

### IRConnection

```typescript
interface IRConnection {
  id: string;
  name: string;
  type: string;
  required: boolean;
  sourceNodeId?: string;
  sourceOutputName?: string;
  targetNodeId?: string;
  targetInputName?: string;
}
```

### GenerationContext

```typescript
interface GenerationContext {
  targetLanguage: 'typescript' | 'javascript';
  outputPath: string;
  projectName: string;
  includeTests: boolean;
  includeDocs: boolean;
  includeLangfuse: boolean;
  packageManager: 'npm' | 'yarn' | 'pnpm';
  environment: {
    nodeVersion?: string;
    langchainVersion?: string;
    packageVersion?: string;
  };
  codeStyle: {
    indentSize: number;
    useSpaces: boolean;
    semicolons: boolean;
    singleQuotes: boolean;
    trailingCommas: boolean;
  };
  optimization: {
    treeshaking: boolean;
    minification: boolean;
    bundling: boolean;
  };
  features: {
    streaming: boolean;
    async: boolean;
    errorHandling: boolean;
    logging: boolean;
    metrics: boolean;
  };
}
```

### CodeFragment

```typescript
interface CodeFragment {
  id: string;
  type: 'import' | 'initialization' | 'usage' | 'export' | 'configuration';
  content: string;
  dependencies: string[];
  language: string;
  metadata: {
    nodeId: string;
    order: number;
    category: string;
    exports?: string[];
    imports?: string[];
  };
}
```

### CodeGenerationResult

```typescript
interface CodeGenerationResult {
  success: boolean;
  files: GeneratedFile[];
  dependencies: string[];
  warnings: string[];
  stats: {
    totalFiles: number;
    totalLines: number;
    totalNodes: number;
    conversionTime: number;
  };
}
```

### GeneratedFile

```typescript
interface GeneratedFile {
  path: string;
  content: string;
  type: 'typescript' | 'javascript' | 'json' | 'markdown' | 'config';
  metadata: {
    generated: boolean;
    nodeIds: string[];
    imports: string[];
    exports: string[];
  };
}
```

### ConversionResult

```typescript
interface ConversionResult {
  success: boolean;
  result?: CodeGenerationResult;
  errors: string[];
  warnings: string[];
  metrics: ConversionMetrics;
}
```

### ConversionMetrics

```typescript
interface ConversionMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  status: string;
  nodeCount?: number;
  connectionCount?: number;
  fileCount?: number;
}
```

### ValidationResult

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  analysis?: {
    nodeCount: number;
    connectionCount: number;
    supportedTypes: string[];
    unsupportedTypes: string[];
    coverage: number;
  };
}
```

### CapabilityInfo

```typescript
interface CapabilityInfo {
  totalConverters: number;
  supportedTypes: string[];
  categories: Record<string, number>;
  aliases: Record<string, string>;
}
```

### RegistryStatistics

```typescript
interface RegistryStatistics {
  totalConverters: number;
  totalAliases: number;
  deprecatedConverters: number;
  convertersByCategory: Record<string, number>;
}
```

### NodeParameter

```typescript
interface NodeParameter {
  name: string;
  type: string;
  value?: any;
  required?: boolean;
  description?: string;
  options?: Array<{
    name: string;
    value: any;
    description?: string;
  }>;
}
```

### Position

```typescript
interface Position {
  x: number;
  y: number;
}
```

## CLI Reference

### Installation

```bash
npm install -g flowise-to-langchain
```

### Commands

#### convert

Convert Flowise JSON to LangChain TypeScript code.

```bash
flowise-to-lc convert <input> [options]
```

**Arguments:**
- `input`: Path to Flowise JSON file or URL

**Options:**
- `-o, --output <path>`: Output directory (default: "./output")
- `-n, --name <name>`: Project name (default: "langchain-app")
- `-f, --format <format>`: Output format: typescript|javascript (default: "typescript")
- `--no-tests`: Skip test file generation
- `--no-docs`: Skip documentation generation
- `--langfuse`: Include Langfuse integration
- `--package-manager <manager>`: Package manager: npm|yarn|pnpm (default: "npm")
- `-v, --verbose`: Verbose output
- `-s, --silent`: Silent mode

**Examples:**

```bash
# Basic conversion
flowise-to-lc convert flow.json

# Custom output directory and project name
flowise-to-lc convert flow.json -o ./my-app -n my-langchain-app

# Include tests and documentation
flowise-to-lc convert flow.json --tests --docs

# Use yarn and include Langfuse
flowise-to-lc convert flow.json --package-manager yarn --langfuse
```

#### validate

Validate Flowise JSON without conversion.

```bash
flowise-to-lc validate <input> [options]
```

**Arguments:**
- `input`: Path to Flowise JSON file or URL

**Options:**
- `-v, --verbose`: Verbose output
- `-s, --silent`: Silent mode

**Examples:**

```bash
# Validate a flow file
flowise-to-lc validate flow.json

# Validate with verbose output
flowise-to-lc validate flow.json -v
```

#### test

Test generated LangChain code.

```bash
flowise-to-lc test <path> [options]
```

**Arguments:**
- `path`: Path to generated project directory

**Options:**
- `-t, --type <type>`: Test type: compile|runtime|all (default: "all")
- `-v, --verbose`: Verbose output

**Examples:**

```bash
# Test all aspects of generated code
flowise-to-lc test ./output

# Test only TypeScript compilation
flowise-to-lc test ./output -t compile
```

#### info

Show information about supported node types and capabilities.

```bash
flowise-to-lc info [options]
```

**Options:**
- `-c, --category <category>`: Filter by category
- `-s, --search <term>`: Search for specific node types
- `-v, --verbose`: Verbose output

**Examples:**

```bash
# Show all supported node types
flowise-to-lc info

# Show only LLM node types
flowise-to-lc info -c llm

# Search for agent-related nodes
flowise-to-lc info -s agent
```

#### version

Show version information.

```bash
flowise-to-lc version
```

#### help

Show help information.

```bash
flowise-to-lc help [command]
```

## Error Handling

### Error Types

The converter provides detailed error information through structured error objects:

```typescript
interface ConversionError {
  type: 'parse' | 'validation' | 'conversion' | 'generation';
  message: string;
  code?: string;
  nodeId?: string;
  details?: any;
}
```

### Common Error Codes

- `INVALID_JSON`: Malformed JSON input
- `UNSUPPORTED_NODE_TYPE`: No converter available for node type
- `MISSING_REQUIRED_INPUT`: Node missing required input connection
- `CIRCULAR_DEPENDENCY`: Circular dependency detected in flow
- `INVALID_PARAMETER`: Invalid parameter value
- `GENERATION_FAILED`: Code generation failed
- `DEPENDENCY_CONFLICT`: Dependency version conflict

### Error Handling Example

```typescript
try {
  const result = await converter.convert(flowiseJson);
  
  if (!result.success) {
    for (const error of result.errors) {
      console.error(`Error: ${error}`);
    }
    
    for (const warning of result.warnings) {
      console.warn(`Warning: ${warning}`);
    }
  }
} catch (error) {
  console.error('Unexpected error:', error);
}
```

## Extension Guide

### Creating Custom Converters

1. **Extend BaseConverter**

```typescript
import { BaseConverter, IRNode, CodeFragment, GenerationContext } from 'flowise-to-langchain';

export class CustomNodeConverter extends BaseConverter {
  flowiseType = 'customNode';
  category = 'custom';

  canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    // Implementation here
    return [];
  }

  getDependencies(node: IRNode, context?: GenerationContext): string[] {
    return ['custom-package'];
  }
}
```

2. **Register the Converter**

```typescript
import { ConverterFactory } from 'flowise-to-langchain';

const converter = new CustomNodeConverter();
ConverterFactory.getRegistry().registerConverter(converter);
```

3. **Create a Plugin**

```typescript
import { createPlugin } from 'flowise-to-langchain';

export const CustomPlugin = createPlugin(
  'custom-plugin',
  '1.0.0',
  [CustomNodeConverter],
  'Custom node types for specific use cases',
  {
    'custom': 'customNode'
  }
);
```

### Adding New Node Categories

1. **Define Category Constants**

```typescript
export const CUSTOM_CATEGORIES = {
  CUSTOM: 'custom',
  ANALYTICS: 'analytics',
  SECURITY: 'security'
} as const;
```

2. **Create Category-Specific Base Class**

```typescript
export abstract class CustomBaseConverter extends BaseConverter {
  category = CUSTOM_CATEGORIES.CUSTOM;
  
  protected getCustomConfiguration(node: IRNode): any {
    // Common configuration logic
  }
}
```

### Extending Code Generation

1. **Custom Emitter**

```typescript
import { TypeScriptEmitter } from 'flowise-to-langchain';

export class CustomEmitter extends TypeScriptEmitter {
  protected generateCustomCode(fragments: CodeFragment[]): string {
    // Custom code generation logic
    return super.generateCode(fragments);
  }
}
```

2. **Custom Templates**

```typescript
const customTemplate = `
import { {{className}} } from '{{module}}';

export class {{variableName}} {
  private {{instanceName}}: {{className}};
  
  constructor({{parameters}}) {
    this.{{instanceName}} = new {{className}}({{configuration}});
  }
}
`;
```

## Examples

### Basic Flow Conversion

```typescript
import { FlowiseToLangChainConverter } from 'flowise-to-langchain';

const flowiseJson = {
  id: 'simple-flow',
  chatflow: {
    name: 'Simple OpenAI Chat',
    description: 'Basic chat using OpenAI'
  },
  nodes: [
    {
      id: 'openai-1',
      type: 'chatOpenAI',
      position: { x: 100, y: 100 },
      data: {
        name: 'ChatOpenAI',
        inputs: {
          temperature: 0.7,
          modelName: 'gpt-3.5-turbo'
        }
      }
    }
  ],
  edges: []
};

const converter = new FlowiseToLangChainConverter();
const result = await converter.convert(flowiseJson);

console.log('Generated files:', result.result?.files);
```

### Complex Agent Flow

```typescript
const agentFlowJson = {
  id: 'agent-flow',
  chatflow: {
    name: 'Research Agent',
    description: 'Agent with tools and memory'
  },
  nodes: [
    {
      id: 'openai-1',
      type: 'chatOpenAI',
      position: { x: 100, y: 100 },
      data: {
        name: 'ChatOpenAI',
        inputs: {
          temperature: 0,
          modelName: 'gpt-4'
        }
      }
    },
    {
      id: 'serpapi-1',
      type: 'serpAPI',
      position: { x: 300, y: 100 },
      data: {
        name: 'SerpAPI'
      }
    },
    {
      id: 'agent-1',
      type: 'openAIFunctionsAgent',
      position: { x: 500, y: 100 },
      data: {
        name: 'OpenAI Functions Agent',
        inputs: {
          maxIterations: 3,
          verbose: true
        }
      }
    }
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'openai-1',
      target: 'agent-1',
      sourceHandle: 'output',
      targetHandle: 'llm'
    },
    {
      id: 'edge-2',
      source: 'serpapi-1',
      target: 'agent-1',
      sourceHandle: 'output',
      targetHandle: 'tools'
    }
  ]
};

const result = await converter.convert(agentFlowJson, {
  targetLanguage: 'typescript',
  outputPath: './research-agent',
  projectName: 'research-agent',
  includeTests: true,
  includeDocs: true
});
```

### Validation and Error Handling

```typescript
import { validateFlowiseJson } from 'flowise-to-langchain';

const validation = await validateFlowiseJson(flowiseJson);

if (!validation.isValid) {
  console.error('Validation failed:');
  validation.errors.forEach(error => console.error(`- ${error}`));
  
  if (validation.warnings.length > 0) {
    console.warn('Warnings:');
    validation.warnings.forEach(warning => console.warn(`- ${warning}`));
  }
} else {
  console.log('Flow is valid!');
  console.log(`Coverage: ${validation.analysis?.coverage}%`);
  console.log(`Supported types: ${validation.analysis?.supportedTypes.join(', ')}`);
  
  if (validation.analysis?.unsupportedTypes.length > 0) {
    console.warn(`Unsupported types: ${validation.analysis.unsupportedTypes.join(', ')}`);
  }
}
```

### Custom Converter Example

```typescript
import { BaseConverter, IRNode, CodeFragment, GenerationContext } from 'flowise-to-langchain';

export class CustomAnalyticsConverter extends BaseConverter {
  flowiseType = 'customAnalytics';
  category = 'analytics';

  canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const variableName = `analytics_${node.id}`;
    const config = this.extractParameters(node);
    
    const imports = [
      'import { CustomAnalytics } from "@custom/analytics";'
    ];
    
    const initialization = `
// Initialize Custom Analytics
const ${variableName} = new CustomAnalytics({
  apiKey: "${config.apiKey}",
  endpoint: "${config.endpoint}",
  enableLogging: ${config.enableLogging || false}
});`;

    return [
      {
        id: `analytics-${node.id}`,
        type: 'initialization',
        content: initialization,
        dependencies: ['@custom/analytics'],
        language: context.targetLanguage,
        metadata: {
          nodeId: node.id,
          order: 100,
          category: 'analytics',
          exports: [variableName],
          imports: imports
        }
      }
    ];
  }

  getDependencies(node: IRNode, context?: GenerationContext): string[] {
    return ['@custom/analytics'];
  }

  private extractParameters(node: IRNode): any {
    const params: any = {};
    for (const param of node.parameters) {
      params[param.name] = param.value;
    }
    return params;
  }
}

// Register the converter
import { ConverterFactory } from 'flowise-to-langchain';
ConverterFactory.getRegistry().registerConverter(new CustomAnalyticsConverter());
```

### Capabilities and Registry Information

```typescript
import { getConverterCapabilities } from 'flowise-to-langchain';

const capabilities = await getConverterCapabilities();

console.log(`Total converters: ${capabilities.totalConverters}`);
console.log('Supported categories:');
Object.entries(capabilities.categories).forEach(([category, count]) => {
  console.log(`  ${category}: ${count} converters`);
});

console.log('Available aliases:');
Object.entries(capabilities.aliases).forEach(([alias, target]) => {
  console.log(`  ${alias} -> ${target}`);
});

// Check if specific types are supported
const requiredTypes = ['chatOpenAI', 'serpAPI', 'openAIFunctionsAgent'];
const supportedTypes = capabilities.supportedTypes;
const unsupported = requiredTypes.filter(type => !supportedTypes.includes(type));

if (unsupported.length > 0) {
  console.warn(`Unsupported types: ${unsupported.join(', ')}`);
} else {
  console.log('All required types are supported!');
}
```

---

## Support

For questions, issues, or contributions:

- **GitHub Repository**: https://github.com/flowise-langchain/flowise-to-langchain
- **Issues**: https://github.com/flowise-langchain/flowise-to-langchain/issues
- **Documentation**: https://github.com/flowise-langchain/flowise-to-langchain#readme

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please read the contributing guidelines and submit pull requests for any improvements.

---

*This API documentation is generated for Flowise to LangChain Converter v1.0.2*