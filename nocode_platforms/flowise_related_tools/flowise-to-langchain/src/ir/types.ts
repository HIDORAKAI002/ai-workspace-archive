/**
 * Intermediate Representation (IR) Types for Flowise-to-LangChain Converter
 *
 * This module defines the core interfaces used to represent Flowise chatflows
 * in an intermediate form that can be processed by various emitters (TypeScript, Python, etc.)
 */

/**
 * Unique identifier for nodes and connections
 */
export type NodeId = string;

/**
 * Represents connection handle types used in Flowise
 */
export interface ConnectionHandle {
  id: string;
  type: 'source' | 'target';
  position?: 'top' | 'bottom' | 'left' | 'right';
  dataType?: string;
}

/**
 * Represents a connection between two nodes
 */
export interface IRConnection {
  id: string;
  source: NodeId;
  target: NodeId;
  sourceHandle: string;
  targetHandle: string;
  label?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Parameter definition for a node
 */
export interface IRParameter {
  name: string;
  value: unknown;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'array'
    | 'json'
    | 'code'
    | 'file'
    | 'credential';
  required?: boolean;
  description?: string;
  defaultValue?: unknown;
  options?: string[]; // For enum-like parameters
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string;
  };
}

/**
 * Input/Output port definition for a node
 */
export interface IRPort {
  id: string;
  label: string;
  type: string;
  dataType: string;
  optional?: boolean;
  description?: string;
  acceptedTypes?: string[];
}

/**
 * Core node representation in the intermediate representation
 */
export interface IRNode {
  id: NodeId;
  type: string; // Flowise node type (e.g., 'llmChain', 'openAI', 'chatPromptTemplate')
  label: string;
  version?: number; // Node version for backward compatibility
  name?: string; // Node name for identification
  category:
    | 'llm'
    | 'chain'
    | 'agent'
    | 'tool'
    | 'memory'
    | 'vectorstore'
    | 'embedding'
    | 'prompt'
    | 'retriever'
    | 'output_parser'
    | 'text_splitter'
    | 'loader'
    | 'utility'
    | 'control_flow';

  // Node connectivity
  inputs?: IRPort[];
  outputs?: IRPort[];

  // Node configuration
  parameters: IRParameter[];

  // Raw Flowise node data (important for converters)
  data?: {
    id?: string;
    label?: string;
    version?: number;
    name?: string;
    type?: string;
    baseClasses?: string[];
    category?: string;
    description?: string;
    inputs?: Record<string, unknown>;
    outputs?: Record<string, unknown>;
    outputAnchors?: any[];
    selected?: boolean;
    [key: string]: unknown;
  };

  // Position and UI metadata
  position: {
    x: number;
    y: number;
  };

  // Additional metadata
  metadata?: {
    version?: string;
    description?: string;
    documentation?: string;
    deprecated?: boolean;
    tags?: string[];
    [key: string]: unknown;
  };
}

/**
 * Graph metadata containing flow-level information
 */
export interface IRGraphMetadata {
  name: string;
  description?: string;
  version?: string;
  flowiseVersion?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  category?: string;
  isTemplate?: boolean;

  // Configuration settings
  settings?: {
    enableHistory?: boolean;
    sessionId?: string;
    chatId?: string;
    followUpPrompts?: boolean;
    [key: string]: unknown;
  };

  // API configuration
  apiConfig?: {
    id: string;
    name: string;
    deployed?: boolean;
    isPublic?: boolean;
    apikeyid?: string;
  };
}

/**
 * Complete graph representation
 */
export interface IRGraph {
  metadata: IRGraphMetadata;
  nodes: IRNode[];
  connections: IRConnection[];

  // Analysis results
  analysis?: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    complexity: 'simple' | 'medium' | 'complex';
    entryPoints: NodeId[];
    exitPoints: NodeId[];
    cycles: NodeId[][];
    dependencies: Map<NodeId, NodeId[]>;
  };
}

/**
 * Raw Flowise node structure (as exported from Flowise)
 */
export interface FlowiseNode {
  id: string;
  position: {
    x: number;
    y: number;
  };
  type: string;
  data: {
    id: string;
    label: string;
    version: number;
    name: string;
    type: string;
    baseClasses: string[];
    category: string;
    description: string;
    inputParams: FlowiseInputParam[];
    inputAnchors: FlowiseAnchor[];
    inputs: Record<string, unknown>;
    outputAnchors: FlowiseAnchor[];
    outputs?: Record<string, unknown>;
    selected?: boolean;
  };
  width?: number;
  height?: number;
  selected?: boolean;
  positionAbsolute?: {
    x: number;
    y: number;
  };
  dragging?: boolean;
}

/**
 * Flowise input parameter definition
 */
export interface FlowiseInputParam {
  label: string;
  name: string;
  type: string;
  optional?: boolean;
  description?: string;
  default?: unknown;
  options?: string[] | { label: string; name: string; description?: string }[];
  rows?: number;
  additionalParams?: boolean;
  acceptVariable?: boolean;
  list?: boolean;
  placeholder?: string;
  warning?: string;
  step?: number;
  min?: number;
  max?: number;
}

/**
 * Flowise anchor (connection point)
 */
export interface FlowiseAnchor {
  id: string;
  name: string;
  label: string;
  description?: string;
  type: string;
  optional?: boolean;
  list?: boolean;
}

/**
 * Raw Flowise edge/connection structure
 */
export interface FlowiseEdge {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  type?: string;
  id: string;
  data?: {
    label?: string;
  };
}

/**
 * Complete Flowise chatflow export structure
 */
export interface FlowiseChatFlow {
  nodes: FlowiseNode[];
  edges: FlowiseEdge[];
  chatflow?: {
    id: string;
    name: string;
    flowData: string;
    deployed: boolean;
    isPublic: boolean;
    apikeyid: string;
    chatbotConfig?: string;
    createdDate: string;
    updatedDate: string;
    apiConfig?: unknown;
    analytic?: unknown;
    speechToText?: unknown;
    category?: string;
    tags?: string[];
    description?: string;
    badge?: string;
    usecases?: string;
  };
}

/**
 * Code section for new converter pattern
 */
export interface CodeSection {
  type: 'import' | 'declaration' | 'initialization' | 'execution' | 'export';
  content: string;
  dependencies?: string[];
  metadata?: {
    nodeId?: NodeId;
    order?: number;
    description?: string;
    category?: string;
    async?: boolean;
    exports?: string[];
    imports?: string[];
  };
}

/**
 * Code fragment representing generated code
 */
export interface CodeFragment {
  id: string;
  type: 'import' | 'declaration' | 'initialization' | 'execution' | 'export';
  content: string;
  dependencies: string[];
  language: 'typescript' | 'javascript' | 'python';

  // Metadata for code organization
  metadata?: {
    nodeId?: NodeId;
    order: number;
    description?: string;
    category?: string;
    async?: boolean;
    exports?: string[];
    imports?: string[];
  };
}

/**
 * Validation result for IR processing
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
}

/**
 * Validation error details
 */
export interface ValidationError {
  type:
    | 'missing_node'
    | 'invalid_connection'
    | 'missing_parameter'
    | 'type_mismatch'
    | 'circular_dependency'
    | 'unsupported_node';
  message: string;
  nodeId?: NodeId;
  connectionId?: string;
  parameterName?: string;
  severity: 'error' | 'critical';
  fixSuggestion?: string;
}

/**
 * Validation warning details
 */
export interface ValidationWarning {
  type:
    | 'deprecated_node'
    | 'performance_concern'
    | 'compatibility_issue'
    | 'missing_documentation';
  message: string;
  nodeId?: NodeId;
  suggestion?: string;
}

/**
 * Validation suggestion for improvements
 */
export interface ValidationSuggestion {
  type: 'optimization' | 'best_practice' | 'simplification' | 'modernization';
  message: string;
  nodeId?: NodeId;
  impact: 'low' | 'medium' | 'high';
}

/**
 * Reference to a generated code fragment
 */
export interface CodeReference {
  fragmentId: string;
  exportedAs: string;
  nodeId: NodeId;
}

/**
 * Context for code generation
 */
export interface GenerationContext {
  targetLanguage: 'typescript' | 'python';
  outputPath: string;
  projectName: string;
  includeTests: boolean;
  includeDocs: boolean;
  includeLangfuse: boolean;
  packageManager: 'npm' | 'yarn' | 'pnpm';

  // Environment configuration
  environment: {
    nodeVersion?: string;
    langchainVersion?: string;
    additionalDependencies?: Record<string, string>;
  };

  // Code style preferences
  codeStyle: {
    indentSize: number;
    useSpaces: boolean;
    semicolons: boolean;
    singleQuotes: boolean;
    trailingCommas: boolean;
  };

  // Reference resolution for connected nodes
  getReference?: (input: any) => CodeReference | string | null;

  // Additional context methods for enhanced functionality
  resolveNodeReference?: (nodeId: NodeId) => string;
  addDependency?: (dependency: string) => void;
  addImport?: (importStatement: string) => void;
}

/**
 * Converter registry entry for mapping Flowise nodes to code
 */
export interface ConverterRegistryEntry {
  flowiseType: string;
  category: string;
  converter: (node: IRNode, context: GenerationContext) => CodeFragment[];
  dependencies: string[];
  supportedVersions: string[];
  deprecated?: boolean;
  replacedBy?: string;
  documentation?: string;
}

/**
 * Execution plan for code generation
 */
export interface ExecutionPlan {
  steps: ExecutionStep[];
  totalSteps: number;
  estimatedDuration: number;
  dependencies: Record<string, string[]>;
  parallelizable: boolean;
}

/**
 * Individual execution step
 */
export interface ExecutionStep {
  id: string;
  type: 'parse' | 'validate' | 'transform' | 'generate' | 'write' | 'test';
  description: string;
  dependencies: string[];
  estimatedDuration: number;
  required: boolean;
  nodeIds?: NodeId[];
}

/**
 * Performance metrics for conversion process
 */
/**
 * Transformation metrics for tracking conversion performance
 */
export interface TransformationMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  nodeCount?: number;
  connectionCount?: number;
  fileCount?: number;
}

/**
 * Conversion metrics interface (legacy alias)
 */
export interface ConversionMetrics {
  startTime: number;
  endTime: number;
  duration: number;

  // Statistics
  nodesProcessed: number;
  connectionsProcessed: number;
  codeFragmentsGenerated: number;
  filesGenerated: number;

  // Performance breakdown
  phases: {
    parsing: number;
    validation: number;
    transformation: number;
    generation: number;
    writing: number;
  };

  // Quality metrics
  coverage: {
    supportedNodes: number;
    unsupportedNodes: number;
    partiallySupported: number;
  };

  // Memory usage
  memoryUsage: {
    peak: number;
    average: number;
    final: number;
  };
}

/**
 * Generated file information
 */
export interface GeneratedFile {
  path: string;
  content: string;
  type: 'main' | 'test' | 'config' | 'types' | 'utils';
  dependencies: string[];
  exports: string[];
  size: number;
}

/**
 * Code generation result containing all generated files and metadata
 */
export interface CodeGenerationResult {
  files: GeneratedFile[];
  dependencies: Record<string, string>;
  metadata: {
    projectName: string;
    targetLanguage: 'typescript' | 'python';
    langchainVersion: string;
    nodeVersion?: string;
    generatedAt: string;
    totalNodes: number;
    totalConnections: number;
    estimatedComplexity: 'simple' | 'medium' | 'complex';
    features: string[];
    warnings: string[];
  };
  scripts: Record<string, string>;
  packageInfo: {
    name: string;
    version: string;
    description?: string;
    main?: string;
    type?: 'module' | 'commonjs';
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
}

/**
 * Transformation result containing the converted IR and metadata
 */
export interface TransformationResult {
  graph: IRGraph;
  metrics: ConversionMetrics;
  validation: ValidationResult;
  warnings: string[];
}

/**
 * Graph analysis statistics
 */
export interface GraphStats {
  nodeCount: number;
  connectionCount: number;
  averageDegree: number;
  maxDepth: number;
  complexity: 'simple' | 'medium' | 'complex';

  // Node type distribution
  nodeTypes: Record<string, number>;
  categories: Record<string, number>;

  // Connectivity analysis
  entryPoints: NodeId[];
  exitPoints: NodeId[];
  isolatedNodes: NodeId[];

  // Performance characteristics
  parallelizableChains: NodeId[][];
  bottlenecks: NodeId[];
  criticalPath: NodeId[];
}
