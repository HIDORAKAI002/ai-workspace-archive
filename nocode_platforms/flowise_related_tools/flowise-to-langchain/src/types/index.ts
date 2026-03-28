/**
 * Comprehensive TypeScript Interfaces for Flowise-to-LangChain Converter
 *
 * This file contains all the core TypeScript interfaces and types needed
 * for the converter system, including testing, configuration, and component interfaces.
 */

// Import types for internal use
import type { FlowiseNode, FlowiseEdge } from '../parser/schema.js';

import type {
  FlowMetadata,
  ConversionResult as APIConversionResult,
} from './api.js';

import type {
  ValidationWarning as IRValidationWarning,
  ValidationSuggestion as IRValidationSuggestion,
  GenerationContext as IRGenerationContext,
  ValidationResult as IRValidationResult,
} from '../ir/types.js';

// Re-export core types from existing modules (explicit to avoid ambiguity)
export type {
  FlowiseNode as FlowiseNodeSchema,
  FlowiseEdge as FlowiseEdgeSchema,
  FlowiseInputParam,
  FlowiseChatFlow,
  FlowiseAnchor,
} from '../parser/schema.js';

export type {
  IRNode,
  IRConnection,
  IRGraph,
  CodeFragment,
  GenerationContext,
  ValidationResult as IRValidationResult,
  ValidationWarning as IRValidationWarning,
  ValidationSuggestion as IRValidationSuggestion,
  NodeId,
} from '../ir/types.js';

// Re-export specific types to avoid conflicts
export type { ConversionOptions } from '../cli/types.js';
export type { ChatflowMetadata, ConversionResult } from './api.js';
export type {
  TestMetrics as APITestMetrics,
  TestReport as APITestReport,
} from './api.js';
export type { UserPreferences as APIUserPreferences } from './api.js';
export type { LogFilter as ComponentLogFilter } from './components.js';

// Export remaining modules without conflicts
export * from './testing.js';
export * from './utils.js';
export * from './hooks.js';

// Re-export API types for compatibility
export type {
  ValidationResult,
  ApiResponse,
  WebSocketMessage,
  UserInfo,
} from './api.js';

// Re-export specific validation types
export type { ValidationWarning, ValidationSuggestion } from './api.js';

// Core Data Interfaces
export interface FlowiseJSON {
  nodes: FlowiseNode[];
  edges: FlowiseEdge[];
  chatflow?: FlowMetadata;
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
  version?: string;
}

export interface Node {
  id: string;
  type: string;
  position: Position;
  data: NodeData;
  width?: number;
  height?: number;
  selected?: boolean;
  dragging?: boolean;
  positionAbsolute?: Position;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  type?: string;
  animated?: boolean;
  label?: string;
  labelStyle?: Record<string, unknown>;
  labelShowBg?: boolean;
  labelBgStyle?: Record<string, unknown>;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: Record<string, string | number>;
  data?: EdgeData;
}

export interface NodeData {
  id: string;
  label: string;
  name: string;
  type: string;
  category: string;
  description: string;
  baseClasses: string[];
  version?: number;
  inputParams: InputParam[];
  inputAnchors: Anchor[];
  outputAnchors: Anchor[];
  inputs: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  selected?: boolean;
}

export interface EdgeData {
  label?: string;
  [key: string]: unknown;
}

export interface InputParam {
  label: string;
  name: string;
  type: string;
  optional?: boolean;
  description?: string;
  default?: unknown;
  options?: ParamOption[];
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

export interface ParamOption {
  label: string;
  name: string;
  description?: string;
}

export interface Anchor {
  id: string;
  name: string;
  label: string;
  type: string;
  description?: string;
  optional?: boolean;
  list?: boolean;
}

export interface Position {
  x: number;
  y: number;
}

// Configuration Interfaces
export interface ConversionConfig {
  input: string;
  output: string;
  format: 'typescript' | 'javascript' | 'python';
  target: 'node' | 'browser' | 'edge';
  includeTests: boolean;
  includeDocs: boolean;
  includeLangfuse: boolean;
  overwrite: boolean;
  verbose: boolean;
  silent: boolean;
  dryRun: boolean;
  projectName?: string;
  packageManager: 'npm' | 'yarn' | 'pnpm';
  environment: {
    nodeVersion?: string;
    langchainVersion?: string;
    additionalDependencies?: Record<string, string>;
  };
  codeStyle: {
    indentSize: number;
    useSpaces: boolean;
    semicolons: boolean;
    singleQuotes: boolean;
    trailingCommas: boolean;
  };
}

export interface TestConfig {
  testType: 'unit' | 'integration' | 'e2e' | 'all';
  timeout: number;
  retries: number;
  parallel: boolean;
  coverage: boolean;
  watch: boolean;
  verbose: boolean;
  silent: boolean;
  reporter: 'default' | 'json' | 'junit' | 'html';
  outputDir: string;
  includeSnapshots: boolean;
  mockExternal: boolean;
  env: Record<string, string>;
  setupFiles: string[];
  testMatch: string[];
  collectCoverageFrom: string[];
  coverageThreshold: {
    global: {
      branches: number;
      functions: number;
      lines: number;
      statements: number;
    };
  };
}

// API Interfaces
export interface ConvertRequest {
  input: string | FlowiseJSON;
  config: ConversionConfig;
  options?: {
    validate?: boolean;
    analyze?: boolean;
    preview?: boolean;
  };
}

export interface ConvertResponse {
  success: boolean;
  data?: {
    files: GeneratedFile[];
    metadata: ConversionMetadata;
    analysis: FlowAnalysis;
  };
  errors?: ApiError[];
  warnings?: string[];
  metrics?: {
    duration: number;
    memoryUsage: number;
    nodeCount: number;
    edgeCount: number;
    fileCount: number;
    linesOfCode: number;
  };
}

export interface ValidateRequest {
  input: string | FlowiseJSON;
  options?: {
    strict?: boolean;
    version?: string;
    minimal?: boolean;
  };
}

export interface ValidateResponse {
  isValid: boolean;
  errors?: ValidationError[];
  warnings?: IRValidationWarning[];
  suggestions?: IRValidationSuggestion[];
  analysis?: FlowAnalysis;
}

export interface TestRequest {
  config: TestConfig;
  files?: string[];
  options?: {
    dryRun?: boolean;
    fixTests?: boolean;
    generateReport?: boolean;
  };
}

export interface TestResponse {
  success: boolean;
  results?: TestResult[];
  summary?: TestSummary;
  coverage?: CoverageReport;
  errors?: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
  timestamp: string;
}

// Component Prop Interfaces
export interface FlowEditorProps {
  flow: FlowiseJSON;
  onFlowChange: (flow: FlowiseJSON) => void;
  onConvert: (config: ConversionConfig) => void;
  readOnly?: boolean;
  className?: string;
  style?: Record<string, string | number>;
}

export interface NodePaletteProps {
  categories: NodeCategory[];
  onNodeSelect: (nodeType: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
}

export interface NodeInspectorProps {
  node: Node | null;
  onNodeChange: (node: Node) => void;
  onNodeDelete: (nodeId: string) => void;
  className?: string;
}

export interface ConnectionPanelProps {
  edges: Edge[];
  nodes: Node[];
  onEdgeChange: (edge: Edge) => void;
  onEdgeDelete: (edgeId: string) => void;
  className?: string;
}

export interface ConfigurationPanelProps {
  config: ConversionConfig;
  onConfigChange: (config: ConversionConfig) => void;
  onValidate: () => void;
  onReset: () => void;
  className?: string;
}

export interface TestPanelProps {
  testConfig: TestConfig;
  onTestConfigChange: (config: TestConfig) => void;
  onRunTests: () => void;
  onStopTests: () => void;
  isRunning: boolean;
  results?: TestResult[];
  className?: string;
}

export interface OutputPanelProps {
  files: GeneratedFile[];
  selectedFile: string | null;
  onFileSelect: (filename: string) => void;
  onDownload: (filename: string) => void;
  onDownloadAll: () => void;
  className?: string;
}

export interface LogPanelProps {
  logs: LogEntry[];
  level: 'debug' | 'info' | 'warn' | 'error';
  onLevelChange: (level: string) => void;
  onClear: () => void;
  className?: string;
}

export interface StatusBarProps {
  status: 'idle' | 'converting' | 'testing' | 'error' | 'success';
  message?: string;
  progress?: number;
  nodeCount?: number;
  edgeCount?: number;
  className?: string;
}

export interface ToolbarProps {
  onNew: () => void;
  onOpen: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  className?: string;
}

export interface PropertyEditorProps {
  property: InputParam;
  value: unknown;
  onChange: (value: unknown) => void;
  errors?: string[];
  className?: string;
}

export interface CodeEditorProps {
  code: string;
  language: 'typescript' | 'javascript' | 'python' | 'json';
  onChange: (code: string) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
  showLineNumbers?: boolean;
  showMinimap?: boolean;
  className?: string;
}

export interface FlowValidatorProps {
  flow: FlowiseJSON;
  onValidationChange: (result: ValidateResponse) => void;
  realtime?: boolean;
  className?: string;
}

export interface NodeTemplateProps {
  template: NodeTemplate;
  onApply: (nodeId: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export interface DependencyManagerProps {
  dependencies: Record<string, string>;
  onDependencyChange: (deps: Record<string, string>) => void;
  onInstall: (packageName: string) => void;
  onUninstall: (packageName: string) => void;
  className?: string;
}

export interface PerformanceMonitorProps {
  metrics: PerformanceMetrics;
  onRefresh: () => void;
  autoRefresh?: boolean;
  refreshInterval?: number;
  className?: string;
}

export interface ProjectSettingsProps {
  settings: ProjectSettings;
  onSettingsChange: (settings: ProjectSettings) => void;
  onSave: () => void;
  onReset: () => void;
  className?: string;
}

export interface FileExplorerProps {
  files: FileTreeNode[];
  selectedFile: string | null;
  onFileSelect: (path: string) => void;
  onFileCreate: (path: string, type: 'file' | 'folder') => void;
  onFileDelete: (path: string) => void;
  onFileRename: (oldPath: string, newPath: string) => void;
  className?: string;
}

export interface ErrorBoundaryProps {
  children: any;
  fallback?: (props: { error: Error; reset: () => void }) => unknown;
  onError?: (error: Error, errorInfo: unknown) => void;
  className?: string;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  position: { x: number; y: number };
  onItemClick: (itemId: string) => void;
  onClose: () => void;
  className?: string;
}

export interface TooltipProps {
  content: unknown;
  children: any;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  children: any;
  className?: string;
}

export interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose: () => void;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  className?: string;
}

export interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  suggestions?: string[];
  className?: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  className?: string;
}

export interface SplitPaneProps {
  direction: 'horizontal' | 'vertical';
  sizes: number[];
  onSizeChange: (sizes: number[]) => void;
  children: unknown[];
  className?: string;
}

// State Management Interfaces
export interface AppState {
  flow: FlowiseJSON;
  config: ConversionConfig;
  testConfig: TestConfig;
  ui: UiState;
  editor: EditorState;
  validation: ValidationState;
  testing: TestingState;
  generation: GenerationState;
  projects: ProjectState;
  settings: SettingsState;
}

export interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  panelSizes: number[];
  activeTab: string;
  selectedFile: string | null;
  showGrid: boolean;
  showMinimap: boolean;
  zoomLevel: number;
  notifications: NotificationItem[];
  modals: ModalState[];
  contextMenu: ContextMenuState | null;
}

export interface EditorState {
  selectedNodes: string[];
  selectedEdges: string[];
  draggedNode: string | null;
  clipboard: ClipboardItem[];
  history: HistoryItem[];
  historyIndex: number;
  viewportPosition: Position;
  viewportZoom: number;
  snapToGrid: boolean;
  gridSize: number;
}

export interface ValidationState {
  isValid: boolean;
  errors: ValidationError[];
  warnings: IRValidationWarning[];
  suggestions: IRValidationSuggestion[];
  lastValidation: number;
  autoValidate: boolean;
}

export interface TestingState {
  isRunning: boolean;
  currentSuite: string | null;
  results: TestResult[];
  summary: TestSummary | null;
  coverage: CoverageReport | null;
  logs: LogEntry[];
  progress: number;
}

export interface GenerationState {
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  files: GeneratedFile[];
  metadata: ConversionMetadata | null;
  analysis: FlowAnalysis | null;
  errors: string[];
  warnings: string[];
}

export interface ProjectState {
  currentProject: string | null;
  projects: ProjectInfo[];
  recentProjects: string[];
}

export interface SettingsState {
  general: GeneralSettings;
  editor: EditorSettings;
  validation: ValidationSettings;
  testing: TestingSettings;
  generation: GenerationSettings;
  appearance: AppearanceSettings;
  advanced: AdvancedSettings;
}

// Utility Type Definitions
export type NodeCategory =
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

export type FileType = 'main' | 'test' | 'config' | 'types' | 'utils' | 'docs';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type ValidationSeverity = 'error' | 'warning' | 'info';

export type TestStatus =
  | 'pending'
  | 'running'
  | 'passed'
  | 'failed'
  | 'skipped';

export type GenerationPhase =
  | 'parsing'
  | 'validation'
  | 'transformation'
  | 'generation'
  | 'writing';

export type ConnectionType = 'data' | 'control' | 'trigger';

export type ParameterType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'json'
  | 'code'
  | 'file'
  | 'credential'
  | 'password'
  | 'multiline'
  | 'select'
  | 'multiselect';

export type NodeStatus =
  | 'idle'
  | 'processing'
  | 'completed'
  | 'error'
  | 'disabled';

export type FlowStatus =
  | 'draft'
  | 'valid'
  | 'invalid'
  | 'converting'
  | 'testing'
  | 'ready';

export type ProjectStatus = 'new' | 'active' | 'archived' | 'deleted';

export type Theme = 'light' | 'dark' | 'auto';

export type Language = 'typescript' | 'javascript' | 'python';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export type Target = 'node' | 'browser' | 'edge';

export type Format = 'esm' | 'cjs' | 'umd';

// Supporting Interfaces
export interface NodeTemplate {
  id: string;
  name: string;
  description: string;
  category: NodeCategory;
  template: Partial<NodeData>;
  parameters: Record<string, unknown>;
  tags: string[];
  author: string;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceMetrics {
  memoryUsage: number;
  cpuUsage: number;
  renderTime: number;
  validationTime: number;
  conversionTime: number;
  testTime: number;
  fileCount: number;
  nodeCount: number;
  edgeCount: number;
  linesOfCode: number;
}

export interface ProjectSettings {
  name: string;
  description: string;
  author: string;
  version: string;
  license: string;
  homepage: string;
  repository: string;
  bugs: string;
  keywords: string[];
  private: boolean;
  engines: Record<string, string>;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
}

export interface FileTreeNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  modified?: string;
  children?: FileTreeNode[];
  expanded?: boolean;
  selected?: boolean;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: ContextMenuItem[];
  onClick?: () => void;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  closable?: boolean;
  modified?: boolean;
  content: unknown;
}

export interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  timestamp: number;
  read: boolean;
}

export interface ModalState {
  id: string;
  type: string;
  props: Record<string, unknown>;
  isOpen: boolean;
}

export interface ContextMenuState {
  items: ContextMenuItem[];
  position: Position;
  target: string;
}

export interface ClipboardItem {
  type: 'nodes' | 'edges' | 'flow';
  data: unknown;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  type: 'add' | 'remove' | 'update' | 'move';
  description: string;
  data: unknown;
  timestamp: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  level: LogLevel;
  message: string;
  source?: string;
  data?: unknown;
}

export interface TestResult {
  id: string;
  name: string;
  description: string;
  status: TestStatus;
  duration: number;
  error?: string;
  output?: string;
  assertions?: AssertionResult[];
  coverage?: FileCoverage;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  coverage: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
}

export interface CoverageReport {
  files: FileCoverage[];
  summary: CoverageSummary;
}

export interface FileCoverage {
  path: string;
  statements: CoverageMetric;
  branches: CoverageMetric;
  functions: CoverageMetric;
  lines: CoverageMetric;
}

export interface CoverageMetric {
  total: number;
  covered: number;
  skipped: number;
  percentage: number;
}

export interface CoverageSummary {
  statements: CoverageMetric;
  branches: CoverageMetric;
  functions: CoverageMetric;
  lines: CoverageMetric;
}

export interface AssertionResult {
  name: string;
  passed: boolean;
  expected: unknown;
  actual: unknown;
  message?: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
  type: FileType;
  size: number;
  dependencies: string[];
  exports: string[];
  imports: string[];
  metadata: FileMetadata;
}

export interface FileMetadata {
  nodeId?: string;
  category?: string;
  description?: string;
  author?: string;
  version?: string;
  license?: string;
  generated: boolean;
  timestamp: number;
  checksum?: string;
}

export interface ConversionMetadata {
  projectName: string;
  version: string;
  targetLanguage: Language;
  target: Target;
  format: Format;
  generatedAt: string;
  totalFiles: number;
  totalLines: number;
  totalSize: number;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  features: string[];
  warnings: string[];
  errors: string[];
}

export interface FlowAnalysis {
  nodeCount: number;
  edgeCount: number;
  complexity: 'simple' | 'moderate' | 'complex';
  coverage: number;
  supportedNodes: number;
  unsupportedNodes: number;
  supportedTypes: string[];
  unsupportedTypes: string[];
  entryPoints: string[];
  exitPoints: string[];
  cycles: string[][];
  dependencies: Record<string, string[]>;
  performance: {
    estimatedMemory: number;
    estimatedCpu: number;
    bottlenecks: string[];
    optimizations: string[];
  };
}

export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  path: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  lastOpened: string;
  settings: ProjectSettings;
  metadata: {
    nodeCount: number;
    edgeCount: number;
    fileCount: number;
    totalSize: number;
    version: string;
    tags: string[];
  };
}

export interface GeneralSettings {
  autoSave: boolean;
  autoSaveInterval: number;
  checkUpdates: boolean;
  telemetry: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
}

export interface EditorSettings {
  theme: Theme;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  showLineNumbers: boolean;
  showMinimap: boolean;
  wordWrap: boolean;
  tabSize: number;
  insertSpaces: boolean;
  trimTrailingWhitespace: boolean;
  renderWhitespace: boolean;
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

export interface ValidationSettings {
  enabled: boolean;
  realtime: boolean;
  debounceTime: number;
  strict: boolean;
  showWarnings: boolean;
  showSuggestions: boolean;
  autoFix: boolean;
  customRules: ValidationRule[];
}

export interface TestingSettings {
  autoRun: boolean;
  runOnSave: boolean;
  parallel: boolean;
  timeout: number;
  retries: number;
  coverage: boolean;
  coverageThreshold: number;
  mockExternal: boolean;
  reporter: string;
  outputDir: string;
}

export interface GenerationSettings {
  targetLanguage: Language;
  target: Target;
  format: Format;
  packageManager: PackageManager;
  includeTests: boolean;
  includeDocs: boolean;
  includeLangfuse: boolean;
  codeStyle: CodeStyle;
  optimization: OptimizationSettings;
}

export interface AppearanceSettings {
  theme: Theme;
  accentColor: string;
  fontSize: number;
  fontFamily: string;
  compactMode: boolean;
  showTooltips: boolean;
  animationsEnabled: boolean;
  highContrast: boolean;
  colorBlindMode: boolean;
}

export interface AdvancedSettings {
  debugMode: boolean;
  verboseLogging: boolean;
  memoryLimit: number;
  concurrentTasks: number;
  cacheSize: number;
  networkTimeout: number;
  retryAttempts: number;
  experimentalFeatures: boolean;
  customPlugins: string[];
}

export interface CodeStyle {
  indentSize: number;
  useSpaces: boolean;
  semicolons: boolean;
  singleQuotes: boolean;
  trailingCommas: boolean;
  bracketSpacing: boolean;
  arrowParens: 'always' | 'avoid';
  endOfLine: 'lf' | 'crlf' | 'cr' | 'auto';
  printWidth: number;
  tabWidth: number;
}

export interface OptimizationSettings {
  minify: boolean;
  treeshake: boolean;
  bundleSize: boolean;
  performance: boolean;
  memory: boolean;
  caching: boolean;
  lazyLoading: boolean;
  codesplitting: boolean;
}

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  severity: ValidationSeverity;
  enabled: boolean;
  pattern: string;
  message: string;
  fixable: boolean;
  categories: string[];
}

// Event Interfaces
export interface FlowEvent {
  type: string;
  timestamp: number;
  source: string;
  data: unknown;
}

export interface NodeEvent extends FlowEvent {
  nodeId: string;
  nodeType: string;
}

export interface EdgeEvent extends FlowEvent {
  edgeId: string;
  sourceId: string;
  targetId: string;
}

export interface ValidationEvent extends FlowEvent {
  isValid: boolean;
  errors: ValidationError[];
  warnings: IRValidationWarning[];
}

export interface ConversionEvent extends FlowEvent {
  phase: GenerationPhase;
  progress: number;
  message: string;
}

export interface TestEvent extends FlowEvent {
  testId: string;
  status: TestStatus;
  result?: TestResult;
}

// Hook Interfaces
export interface UseFlowHook {
  flow: FlowiseJSON;
  setFlow: (flow: FlowiseJSON) => void;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updates: Partial<NodeData>) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
  updateEdge: (edgeId: string, updates: Partial<EdgeData>) => void;
  validate: () => Promise<IRValidationResult>;
  convert: (config: ConversionConfig) => Promise<APIConversionResult>;
  clear: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export interface UseConfigHook {
  config: ConversionConfig;
  setConfig: (config: ConversionConfig) => void;
  updateConfig: (updates: Partial<ConversionConfig>) => void;
  resetConfig: () => void;
  validateConfig: () => string[];
  saveConfig: (name: string) => void;
  loadConfig: (name: string) => void;
  deleteConfig: (name: string) => void;
  getPresets: () => ConfigPreset[];
}

export interface UseTestingHook {
  testConfig: TestConfig;
  setTestConfig: (config: TestConfig) => void;
  results: TestResult[];
  summary: TestSummary | null;
  coverage: CoverageReport | null;
  isRunning: boolean;
  runTests: () => Promise<void>;
  stopTests: () => void;
  clearResults: () => void;
  exportResults: (format: 'json' | 'junit' | 'html') => void;
}

export interface UseValidationHook {
  errors: ValidationError[];
  warnings: IRValidationWarning[];
  suggestions: IRValidationSuggestion[];
  isValid: boolean;
  isValidating: boolean;
  validate: (flow: FlowiseJSON) => Promise<IRValidationResult>;
  autoValidate: boolean;
  setAutoValidate: (enabled: boolean) => void;
  clearValidation: () => void;
}

export interface UseGenerationHook {
  files: GeneratedFile[];
  metadata: ConversionMetadata | null;
  analysis: FlowAnalysis | null;
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  errors: string[];
  warnings: string[];
  generate: (flow: FlowiseJSON, config: ConversionConfig) => Promise<void>;
  cancel: () => void;
  clearResults: () => void;
  downloadFile: (filename: string) => void;
  downloadAll: () => void;
}

export interface ConfigPreset {
  id: string;
  name: string;
  description: string;
  config: ConversionConfig;
  tags: string[];
  author: string;
  version: string;
  createdAt: string;
  updatedAt: string;
}

// Type Guards
export function isFlowiseJSON(obj: unknown): obj is FlowiseJSON {
  return (
    typeof obj === 'object' && obj !== null && 'nodes' in obj && 'edges' in obj
  );
}

export function isNode(obj: unknown): obj is Node {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'type' in obj &&
    'data' in obj
  );
}

export function isEdge(obj: unknown): obj is Edge {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'source' in obj &&
    'target' in obj
  );
}

export function isValidationError(obj: unknown): obj is ValidationError {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}

export function isTestResult(obj: unknown): obj is TestResult {
  return (
    typeof obj === 'object' && obj !== null && 'id' in obj && 'status' in obj
  );
}

export function isGeneratedFile(obj: unknown): obj is GeneratedFile {
  return (
    typeof obj === 'object' && obj !== null && 'path' in obj && 'content' in obj
  );
}

// Default Values
export const DEFAULT_CONVERSION_CONFIG: ConversionConfig = {
  input: '',
  output: './output',
  format: 'typescript',
  target: 'node',
  includeTests: true,
  includeDocs: true,
  includeLangfuse: false,
  overwrite: false,
  verbose: false,
  silent: false,
  dryRun: false,
  packageManager: 'npm',
  environment: {},
  codeStyle: {
    indentSize: 2,
    useSpaces: true,
    semicolons: true,
    singleQuotes: true,
    trailingCommas: true,
  },
};

export const DEFAULT_TEST_CONFIG: TestConfig = {
  testType: 'all',
  timeout: 30000,
  retries: 2,
  parallel: true,
  coverage: true,
  watch: false,
  verbose: false,
  silent: false,
  reporter: 'default',
  outputDir: './test-results',
  includeSnapshots: false,
  mockExternal: true,
  env: {},
  setupFiles: [],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export const DEFAULT_VALIDATION_OPTIONS = {
  strict: true,
  version: 'auto',
  minimal: false,
};

export const DEFAULT_GENERATION_CONTEXT: IRGenerationContext = {
  targetLanguage: 'typescript',
  outputPath: './output',
  projectName: 'flowise-converted',
  includeTests: true,
  includeDocs: true,
  includeLangfuse: false,
  packageManager: 'npm',
  environment: {
    nodeVersion: '18.0.0',
    langchainVersion: '0.2.0',
  },
  codeStyle: {
    indentSize: 2,
    useSpaces: true,
    semicolons: true,
    singleQuotes: true,
    trailingCommas: true,
  },
};

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};

export type PickByType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type OmitByType<T, U> = {
  [K in keyof T]: T[K] extends U ? never : K;
}[keyof T];

export type NonNullable<T> = T extends null | undefined ? never : T;

export type Awaited<T> = T extends Promise<infer U> ? U : T;

export type EventHandler<T = Event> = (event: T) => void;

export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

export type Callback<T = void> = () => T;

export type AsyncCallback<T = void> = () => Promise<T>;

export type Predicate<T> = (item: T) => boolean;

export type Comparator<T> = (a: T, b: T) => number;

export type Transformer<T, U> = (input: T) => U;

export type AsyncTransformer<T, U> = (input: T) => Promise<U>;

export type Reducer<T, U> = (accumulator: U, current: T) => U;

export type AsyncReducer<T, U> = (accumulator: U, current: T) => Promise<U>;

export type Mapper<T, U> = (item: T, index: number) => U;

export type AsyncMapper<T, U> = (item: T, index: number) => Promise<U>;

export type Filter<T> = (item: T, index: number) => boolean;

export type AsyncFilter<T> = (item: T, index: number) => Promise<boolean>;

export type Validator<T> = (value: T) => boolean | string | ValidationError[];

export type AsyncValidator<T> = (
  value: T
) => Promise<boolean | string | ValidationError[]>;

export type Serializer<T> = (value: T) => string;

export type Deserializer<T> = (value: string) => T;

export type Factory<T> = (...args: unknown[]) => T;

export type AsyncFactory<T> = (...args: unknown[]) => Promise<T>;

export type Disposable = {
  dispose(): void;
};

export type AsyncDisposable = {
  dispose(): Promise<void>;
};

// Component Types (Framework-agnostic)
export type ComponentProps<T extends (...args: unknown[]) => unknown> =
  T extends (props: infer P) => unknown ? P : never;

export type StyleProps = {
  className?: string;
  style?: Record<string, string | number>;
};

export type WithChildren<T = {}> = T & {
  children?: unknown;
};

export type WithOptionalChildren<T = {}> = T & {
  children?: unknown;
};

export type WithRequiredChildren<T = {}> = T & {
  children: unknown;
};

// Generic component types for various frameworks
export type ComponentWithChildren<T = {}> = (props: WithChildren<T>) => unknown;
export type ComponentWithOptionalChildren<T = {}> = (
  props: WithOptionalChildren<T>
) => unknown;
export type ComponentWithRequiredChildren<T = {}> = (
  props: WithRequiredChildren<T>
) => unknown;

// Generic ref types
export type RefObject<T> = { current: T | null };
export type MutableRefObject<T> = { current: T };
export type RefCallback<T> = (instance: T | null) => void;
export type Ref<T> = RefCallback<T> | RefObject<T> | null;

// Generic element types (framework-agnostic)
export type Key = string | number;
export type ElementType = unknown;
export type NodeType = unknown;
export type FragmentType = unknown;
export type PortalType = unknown;
export type TextType = string | number;
export type ChildType = ElementType | TextType;
export type ChildrenType = ChildType | ChildType[];

// Error Types
export class FlowiseConversionError extends Error {
  constructor(
    message: string,
    public code: string,
    public nodeId?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'FlowiseConversionError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public path: string,
    public code: string,
    public severity: ValidationSeverity = 'error'
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class TestError extends Error {
  constructor(
    message: string,
    public testId: string,
    public expected?: unknown,
    public actual?: unknown
  ) {
    super(message);
    this.name = 'TestError';
  }
}

export class GenerationError extends Error {
  constructor(
    message: string,
    public phase: GenerationPhase,
    public nodeId?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'GenerationError';
  }
}

export class ConfigurationError extends Error {
  constructor(
    message: string,
    public key: string,
    public value?: unknown
  ) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export class FileSystemError extends Error {
  constructor(
    message: string,
    public path: string,
    public operation: string
  ) {
    super(message);
    this.name = 'FileSystemError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public url: string,
    public status?: number
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(
    message: string,
    public timeout: number
  ) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class AbortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AbortError';
  }
}

export class UnsupportedError extends Error {
  constructor(
    message: string,
    public feature: string,
    public version?: string
  ) {
    super(message);
    this.name = 'UnsupportedError';
  }
}

// Export utilities and constants as default
export default {
  // Only export actual values, not TypeScript types/interfaces
  DEFAULT_CONVERSION_CONFIG,
  DEFAULT_TEST_CONFIG,
  DEFAULT_VALIDATION_OPTIONS,
  DEFAULT_GENERATION_CONTEXT,

  // Utilities (actual functions)
  isFlowiseJSON,
  isNode,
  isEdge,
  isValidationError,
  isTestResult,
  isGeneratedFile,

  // Error classes (actual constructors)
  FlowiseConversionError,
  ValidationError,
  TestError,
  GenerationError,
  ConfigurationError,
  FileSystemError,
  NetworkError,
  TimeoutError,
  AbortError,
  UnsupportedError,
};
