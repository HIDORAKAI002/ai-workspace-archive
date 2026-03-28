/**
 * Component Interface Definitions
 *
 * This file contains TypeScript interfaces for all component types
 * used in the Flowise-to-LangChain converter application.
 */
// React types are optional for this converter
// import * as React from 'react';
// Import ValidationResult from API to avoid circular dependencies
import type { ValidationResult } from './api.js';

// Import remaining types from index
import {
  FlowiseJSON,
  Node,
  Edge,
  ConversionConfig,
  TestConfig,
  TestResult,
  GeneratedFile,
  LogEntry,
  NodeTemplate,
  ProjectSettings,
  PerformanceMetrics,
  FileTreeNode,
  ContextMenuItem,
  TabItem,
  NotificationItem,
  Position,
  NodeData,
  EdgeData,
  InputParam,
  FlowAnalysis,
  ConversionMetadata,
  TestSummary,
  CoverageReport,
} from './index.js';

// Base Component Props
export interface BaseComponentProps {
  className?: string;
  style?: Record<string, any>;
  id?: string;
  'data-testid'?: string;
}

export interface WithChildren<T = {}> extends BaseComponentProps {
  children?: unknown;
}

export interface WithRequiredChildren<T = {}> extends BaseComponentProps {
  children: unknown;
}

// Main Application Components
export interface AppProps extends BaseComponentProps {
  initialFlow?: FlowiseJSON;
  initialConfig?: ConversionConfig;
  onFlowChange?: (flow: FlowiseJSON) => void;
  onConfigChange?: (config: ConversionConfig) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

export interface MainLayoutProps extends BaseComponentProps {
  sidebar: unknown;
  editor: unknown;
  panels: unknown;
  statusBar: unknown;
  toolbar: unknown;
  onLayoutChange?: (layout: LayoutConfig) => void;
}

export interface LayoutConfig {
  sidebarWidth: number;
  panelSizes: number[];
  showSidebar: boolean;
  showPanels: boolean;
  showStatusBar: boolean;
  showToolbar: boolean;
}

// Flow Editor Components
export interface FlowEditorProps extends BaseComponentProps {
  flow: FlowiseJSON;
  onFlowChange: (flow: FlowiseJSON) => void;
  onNodeSelect?: (nodeId: string | null) => void;
  onEdgeSelect?: (edgeId: string | null) => void;
  onNodeAdd?: (node: Node) => void;
  onNodeRemove?: (nodeId: string) => void;
  onEdgeAdd?: (edge: Edge) => void;
  onEdgeRemove?: (edgeId: string) => void;
  selectedNodeId?: string | null;
  selectedEdgeId?: string | null;
  readOnly?: boolean;
  showGrid?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
  zoomLevel?: number;
  onZoomChange?: (zoom: number) => void;
  onViewportChange?: (viewport: { x: number; y: number; zoom: number }) => void;
}

export interface FlowCanvasProps extends BaseComponentProps {
  flow: FlowiseJSON;
  onFlowChange: (flow: FlowiseJSON) => void;
  viewport: { x: number; y: number; zoom: number };
  onViewportChange: (viewport: { x: number; y: number; zoom: number }) => void;
  selectedNodes: string[];
  selectedEdges: string[];
  onSelectionChange: (nodes: string[], edges: string[]) => void;
  onNodeDrag?: (nodeId: string, position: Position) => void;
  onEdgeCreate?: (connection: {
    source: string;
    target: string;
    sourceHandle: string;
    targetHandle: string;
  }) => void;
  showGrid?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
  readOnly?: boolean;
}

export interface FlowNodeProps extends BaseComponentProps {
  node: Node;
  selected?: boolean;
  onSelect?: (nodeId: string) => void;
  onUpdate?: (nodeId: string, data: Partial<NodeData>) => void;
  onDelete?: (nodeId: string) => void;
  onDrag?: (nodeId: string, position: Position) => void;
  onConnect?: (
    nodeId: string,
    handleId: string,
    handleType: 'source' | 'target'
  ) => void;
  readOnly?: boolean;
  showHandles?: boolean;
  showLabels?: boolean;
}

export interface FlowEdgeProps extends BaseComponentProps {
  edge: Edge;
  selected?: boolean;
  onSelect?: (edgeId: string) => void;
  onUpdate?: (edgeId: string, data: Partial<EdgeData>) => void;
  onDelete?: (edgeId: string) => void;
  readOnly?: boolean;
  animated?: boolean;
  showLabel?: boolean;
}

export interface MiniMapProps extends BaseComponentProps {
  flow: FlowiseJSON;
  viewport: { x: number; y: number; zoom: number };
  onViewportChange: (viewport: { x: number; y: number; zoom: number }) => void;
  width?: number;
  height?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface FlowControlsProps extends BaseComponentProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  onFitView?: () => void;
  onToggleGrid?: () => void;
  onToggleMinimap?: () => void;
  showGrid?: boolean;
  showMinimap?: boolean;
  zoomLevel?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

// Node Palette Components
export interface NodePaletteProps extends BaseComponentProps {
  categories: NodeCategory[];
  onNodeSelect: (nodeType: string) => void;
  onNodeDrag?: (nodeType: string, event: DragEvent) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export interface NodeCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  nodes: NodeType[];
  expanded?: boolean;
}

export interface NodeType {
  id: string;
  name: string;
  label: string;
  description: string;
  icon?: string;
  color?: string;
  category: string;
  tags: string[];
  inputs: NodePort[];
  outputs: NodePort[];
  parameters: NodeParameter[];
  examples?: NodeExample[];
  documentation?: string;
  deprecated?: boolean;
  replacedBy?: string;
}

export interface NodePort {
  id: string;
  name: string;
  label: string;
  type: string;
  dataType: string;
  required?: boolean;
  description?: string;
  defaultValue?: unknown;
}

export interface NodeParameter {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  description?: string;
  defaultValue?: unknown;
  options?: { label: string; value: unknown }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: unknown) => boolean | string;
  };
}

export interface NodeExample {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
}

export interface NodeItemProps extends BaseComponentProps {
  nodeType: NodeType;
  onSelect: (nodeType: string) => void;
  onDrag?: (nodeType: string, event: DragEvent) => void;
  selected?: boolean;
  draggable?: boolean;
  showDescription?: boolean;
  showTags?: boolean;
}

export interface NodeSearchProps extends BaseComponentProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  showSuggestions?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

export interface NodeCategoryProps extends BaseComponentProps {
  category: NodeCategory;
  onNodeSelect: (nodeType: string) => void;
  onNodeDrag?: (nodeType: string, event: DragEvent) => void;
  onToggleExpand?: (categoryId: string) => void;
  searchQuery?: string;
  showIcons?: boolean;
  showDescriptions?: boolean;
}

// Inspector Components
export interface NodeInspectorProps extends BaseComponentProps {
  node: Node | null;
  onNodeChange: (node: Node) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeDuplicate?: (nodeId: string) => void;
  onNodeValidate?: (nodeId: string) => void;
  validation?: ValidationResult;
  readOnly?: boolean;
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
}

export interface EdgeInspectorProps extends BaseComponentProps {
  edge: Edge | null;
  onEdgeChange: (edge: Edge) => void;
  onEdgeDelete: (edgeId: string) => void;
  onEdgeValidate?: (edgeId: string) => void;
  validation?: ValidationResult;
  readOnly?: boolean;
}

export interface PropertyEditorProps extends BaseComponentProps {
  property: InputParam;
  value: unknown;
  onChange: (value: unknown) => void;
  onValidate?: (value: unknown) => boolean | string;
  errors?: string[];
  warnings?: string[];
  readOnly?: boolean;
  showHelp?: boolean;
  onToggleHelp?: () => void;
}

export interface PropertyGroupProps extends BaseComponentProps {
  title: string;
  properties: InputParam[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
  errors?: Record<string, string[]>;
  warnings?: Record<string, string[]>;
  readOnly?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export interface PropertyFieldProps extends BaseComponentProps {
  type: string;
  value: unknown;
  onChange: (value: unknown) => void;
  options?: { label: string; value: unknown }[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: unknown) => boolean | string;
  };
  error?: string;
  warning?: string;
  help?: string;
  showHelp?: boolean;
}

// Configuration Components
export interface ConfigurationPanelProps extends BaseComponentProps {
  config: ConversionConfig;
  onConfigChange: (config: ConversionConfig) => void;
  onValidate?: () => void;
  onReset?: () => void;
  onSave?: (name: string) => void;
  onLoad?: (name: string) => void;
  validation?: ValidationResult;
  presets?: ConfigPreset[];
  readOnly?: boolean;
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
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

export interface ConfigSectionProps extends BaseComponentProps {
  title: string;
  description?: string;
  icon?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  children: unknown;
}

export interface ConfigFieldProps extends BaseComponentProps {
  label: string;
  description?: string;
  type:
    | 'text'
    | 'number'
    | 'boolean'
    | 'select'
    | 'multiselect'
    | 'file'
    | 'directory'
    | 'json'
    | 'code';
  value: unknown;
  onChange: (value: unknown) => void;
  options?: { label: string; value: unknown }[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: unknown) => boolean | string;
  };
  error?: string;
  warning?: string;
  help?: string;
  showHelp?: boolean;
}

export interface ConfigPresetManagerProps extends BaseComponentProps {
  presets: ConfigPreset[];
  onPresetSave: (preset: ConfigPreset) => void;
  onPresetLoad: (presetId: string) => void;
  onPresetDelete: (presetId: string) => void;
  onPresetExport: (presetId: string) => void;
  onPresetImport: (preset: ConfigPreset) => void;
  currentConfig?: ConversionConfig;
}

// Test Components
export interface TestPanelProps extends BaseComponentProps {
  testConfig: TestConfig;
  onTestConfigChange: (config: TestConfig) => void;
  onRunTests: () => void;
  onStopTests: () => void;
  onClearResults: () => void;
  isRunning: boolean;
  results: TestResult[];
  summary?: TestSummary;
  coverage?: CoverageReport;
  logs?: LogEntry[];
  progress?: number;
  currentTest?: string;
}

export interface TestRunnerProps extends BaseComponentProps {
  config: TestConfig;
  onConfigChange: (config: TestConfig) => void;
  onRun: () => void;
  onStop: () => void;
  onClear: () => void;
  isRunning: boolean;
  canRun: boolean;
  progress?: number;
  currentTest?: string;
}

export interface TestResultsProps extends BaseComponentProps {
  results: TestResult[];
  summary?: TestSummary;
  onResultSelect: (resultId: string) => void;
  onResultRerun: (resultId: string) => void;
  onResultExport: (format: 'json' | 'junit' | 'html') => void;
  selectedResult?: string;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

export interface TestResultItemProps extends BaseComponentProps {
  result: TestResult;
  onSelect: (resultId: string) => void;
  onRerun: (resultId: string) => void;
  selected?: boolean;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

export interface TestCoverageProps extends BaseComponentProps {
  coverage: CoverageReport;
  onFileSelect: (filePath: string) => void;
  selectedFile?: string;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

export interface TestConfigEditorProps extends BaseComponentProps {
  config: TestConfig;
  onChange: (config: TestConfig) => void;
  onValidate?: () => void;
  onReset?: () => void;
  validation?: ValidationResult;
  readOnly?: boolean;
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
}

// Output Components
export interface OutputPanelProps extends BaseComponentProps {
  files: GeneratedFile[];
  selectedFile: string | null;
  onFileSelect: (filename: string) => void;
  onFileDownload: (filename: string) => void;
  onFileView: (filename: string) => void;
  onFileEdit?: (filename: string, content: string) => void;
  onDownloadAll: () => void;
  onPreview?: () => void;
  metadata?: ConversionMetadata;
  analysis?: FlowAnalysis;
  showMetadata?: boolean;
  onToggleMetadata?: () => void;
}

export interface FileListProps extends BaseComponentProps {
  files: GeneratedFile[];
  selectedFile: string | null;
  onFileSelect: (filename: string) => void;
  onFileDownload: (filename: string) => void;
  onFileView: (filename: string) => void;
  onFileEdit?: (filename: string, content: string) => void;
  showSize?: boolean;
  showType?: boolean;
  showModified?: boolean;
  sortBy?: 'name' | 'size' | 'type' | 'modified';
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: string, order: 'asc' | 'desc') => void;
}

export interface FileViewerProps extends BaseComponentProps {
  file: GeneratedFile | null;
  onFileEdit?: (filename: string, content: string) => void;
  onFileDownload?: (filename: string) => void;
  onFileClose?: () => void;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  showMinimap?: boolean;
  theme?: 'light' | 'dark';
  language?: string;
  wrap?: boolean;
}

export interface CodeViewerProps extends BaseComponentProps {
  code: string;
  language:
    | 'typescript'
    | 'javascript'
    | 'python'
    | 'json'
    | 'yaml'
    | 'markdown'
    | 'html'
    | 'css'
    | 'xml';
  filename?: string;
  onEdit?: (code: string) => void;
  onDownload?: () => void;
  onCopy?: () => void;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  showMinimap?: boolean;
  theme?: 'light' | 'dark';
  wrap?: boolean;
  highlightLines?: number[];
  foldRanges?: { start: number; end: number }[];
}

export interface MetadataViewerProps extends BaseComponentProps {
  metadata: ConversionMetadata;
  analysis?: FlowAnalysis;
  onExport?: (format: 'json' | 'yaml' | 'csv') => void;
  showAnalysis?: boolean;
  onToggleAnalysis?: () => void;
}

// Log Components
export interface LogPanelProps extends BaseComponentProps {
  logs: LogEntry[];
  level: 'debug' | 'info' | 'warn' | 'error';
  onLevelChange: (level: string) => void;
  onClear: () => void;
  onExport?: (format: 'json' | 'csv' | 'txt') => void;
  onFilter?: (filter: LogFilter) => void;
  filter?: LogFilter;
  maxLines?: number;
  showTimestamp?: boolean;
  showSource?: boolean;
  autoScroll?: boolean;
  onToggleAutoScroll?: () => void;
}

export interface LogFilter {
  level?: string;
  source?: string;
  message?: string;
  dateRange?: { start: Date; end: Date };
}

export interface LogEntryProps extends BaseComponentProps {
  entry: LogEntry;
  showTimestamp?: boolean;
  showSource?: boolean;
  showLevel?: boolean;
  onSelect?: (entryId: string) => void;
  selected?: boolean;
  highlight?: boolean;
}

export interface LogViewerProps extends BaseComponentProps {
  logs: LogEntry[];
  onEntrySelect?: (entryId: string) => void;
  selectedEntry?: string;
  filter?: LogFilter;
  showTimestamp?: boolean;
  showSource?: boolean;
  showLevel?: boolean;
  virtualScroll?: boolean;
  maxHeight?: number;
}

// Status Components
export interface StatusBarProps extends BaseComponentProps {
  status: 'idle' | 'loading' | 'converting' | 'testing' | 'error' | 'success';
  message?: string;
  progress?: number;
  nodeCount?: number;
  edgeCount?: number;
  fileCount?: number;
  errors?: number;
  warnings?: number;
  onStatusClick?: () => void;
  onProgressClick?: () => void;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

export interface StatusIndicatorProps extends BaseComponentProps {
  status: 'idle' | 'loading' | 'success' | 'error' | 'warning';
  message?: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  showMessage?: boolean;
  onClick?: () => void;
}

export interface ProgressIndicatorProps extends BaseComponentProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'linear' | 'circular';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  animated?: boolean;
}

// Toolbar Components
export interface ToolbarProps extends BaseComponentProps {
  onNew?: () => void;
  onOpen?: () => void;
  onSave?: () => void;
  onSaveAs?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onDelete?: () => void;
  onSelectAll?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  onFitView?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  canCut?: boolean;
  canCopy?: boolean;
  canPaste?: boolean;
  canDelete?: boolean;
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'icons' | 'text' | 'both';
}

export interface ToolbarButtonProps extends BaseComponentProps {
  icon?: string;
  label?: string;
  tooltip?: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'icon' | 'text' | 'both';
}

export interface ToolbarGroupProps extends BaseComponentProps {
  title?: string;
  children: unknown;
  separator?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export interface ToolbarSeparatorProps extends BaseComponentProps {
  vertical?: boolean;
}

// Utility Components
export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  message?: string;
  showMessage?: boolean;
  overlay?: boolean;
  backdrop?: boolean;
}

export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: (props: { error: Error; reset: () => void }) => unknown;
  onError?: (error: Error, errorInfo: unknown) => void;
  showDetails?: boolean;
  showStack?: boolean;
  children: unknown;
}

export interface ErrorMessageProps extends BaseComponentProps {
  error: Error;
  onRetry?: () => void;
  onReport?: (error: Error) => void;
  onDismiss?: () => void;
  showDetails?: boolean;
  showStack?: boolean;
  showActions?: boolean;
}

export interface NotificationProps extends BaseComponentProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  onClose?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  showIcon?: boolean;
  showClose?: boolean;
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';
}

export interface TooltipProps extends BaseComponentProps {
  content: unknown;
  title?: string;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
  delay?: number;
  hideDelay?: number;
  disabled?: boolean;
  arrow?: boolean;
  interactive?: boolean;
  maxWidth?: number;
  zIndex?: number;
  children: unknown;
}

export interface PopoverProps extends BaseComponentProps {
  content: unknown;
  title?: string;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  arrow?: boolean;
  interactive?: boolean;
  maxWidth?: number;
  zIndex?: number;
  children: unknown;
}

export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  destroyOnClose?: boolean;
  footer?: unknown;
  bodyStyle?: Record<string, unknown>;
  maskStyle?: Record<string, unknown>;
  zIndex?: number;
  children: unknown;
}

export interface DrawerProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  height?: number | string;
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  destroyOnClose?: boolean;
  footer?: unknown;
  bodyStyle?: Record<string, unknown>;
  maskStyle?: Record<string, unknown>;
  zIndex?: number;
  children: unknown;
}

export interface ContextMenuProps extends BaseComponentProps {
  items: ContextMenuItem[];
  position: Position;
  onItemClick: (itemId: string) => void;
  onClose: () => void;
  zIndex?: number;
}

export interface DropdownProps extends BaseComponentProps {
  items: DropdownItem[];
  onItemClick: (itemId: string) => void;
  placement?:
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  trigger?: 'hover' | 'click' | 'focus';
  disabled?: boolean;
  children: unknown;
}

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
  children?: DropdownItem[];
}

// Layout Components
export interface SplitPaneProps extends BaseComponentProps {
  direction: 'horizontal' | 'vertical';
  sizes: number[];
  onSizeChange: (sizes: number[]) => void;
  minSizes?: number[];
  maxSizes?: number[];
  resizerStyle?: Record<string, unknown>;
  disabled?: boolean;
  children: unknown[];
}

export interface ResizablePanelProps extends BaseComponentProps {
  size: number;
  minSize?: number;
  maxSize?: number;
  onSizeChange?: (size: number) => void;
  resizable?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  title?: string;
  actions?: unknown;
  children: unknown;
}

export interface TabsProps extends BaseComponentProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  onTabAdd?: () => void;
  onTabMove?: (fromIndex: number, toIndex: number) => void;
  closable?: boolean;
  addable?: boolean;
  movable?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'pills' | 'underline';
}

export interface TabPanelProps extends BaseComponentProps {
  tab: TabItem;
  active: boolean;
  onClose?: (tabId: string) => void;
  closable?: boolean;
  children: unknown;
}

export interface AccordionProps extends BaseComponentProps {
  items: AccordionItem[];
  activeItems: string[];
  onItemToggle: (itemId: string) => void;
  multiple?: boolean;
  collapsible?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'bordered' | 'filled';
}

export interface AccordionItem {
  id: string;
  title: string;
  content: unknown;
  disabled?: boolean;
  icon?: string;
  extra?: unknown;
}

export interface AccordionPanelProps extends BaseComponentProps {
  item: AccordionItem;
  active: boolean;
  onToggle: (itemId: string) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'bordered' | 'filled';
}

// Form Components
export interface FormProps extends BaseComponentProps {
  onSubmit: (values: Record<string, unknown>) => void;
  onValidate?: (values: Record<string, unknown>) => Record<string, string>;
  initialValues?: Record<string, unknown>;
  validationSchema?: Record<string, unknown>;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelAlign?: 'left' | 'right' | 'top';
  children: unknown;
}

export interface FormItemProps extends BaseComponentProps {
  name: string;
  label?: string;
  required?: boolean;
  rules?: ValidationRule[];
  help?: string;
  extra?: unknown;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  hasFeedback?: boolean;
  labelAlign?: 'left' | 'right' | 'top';
  labelCol?: { span: number };
  wrapperCol?: { span: number };
  children: unknown;
}

export interface ValidationRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  len?: number;
  validator?: (value: unknown) => Promise<void> | void;
}

export interface InputProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  onPressEnter?: (event: Event) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'text' | 'password' | 'email' | 'number' | 'url' | 'tel' | 'search';
  prefix?: unknown;
  suffix?: unknown;
  addonBefore?: unknown;
  addonAfter?: unknown;
  allowClear?: boolean;
  bordered?: boolean;
  maxLength?: number;
  showCount?: boolean;
  status?: 'error' | 'warning';
}

export interface TextAreaProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  rows?: number;
  autoSize?: boolean | { minRows: number; maxRows: number };
  allowClear?: boolean;
  bordered?: boolean;
  maxLength?: number;
  showCount?: boolean;
  status?: 'error' | 'warning';
}

export interface SelectProps extends BaseComponentProps {
  value?: unknown;
  defaultValue?: unknown;
  onChange?: (value: unknown) => void;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  mode?: 'single' | 'multiple' | 'tags';
  options?: SelectOption[];
  children?: unknown;
  allowClear?: boolean;
  bordered?: boolean;
  showSearch?: boolean;
  filterOption?: (input: string, option: SelectOption) => boolean;
  loading?: boolean;
  notFoundContent?: unknown;
  status?: 'error' | 'warning';
}

export interface SelectOption {
  value: unknown;
  label: string;
  disabled?: boolean;
  title?: string;
  children?: unknown;
}

export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  indeterminate?: boolean;
  children?: unknown;
}

export interface RadioProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  value?: unknown;
  children?: unknown;
}

export interface RadioGroupProps extends BaseComponentProps {
  value?: unknown;
  defaultValue?: unknown;
  onChange?: (value: unknown) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  direction?: 'horizontal' | 'vertical';
  options?: RadioOption[];
  children?: unknown;
}

export interface RadioOption {
  value: unknown;
  label: string;
  disabled?: boolean;
  children?: unknown;
}

export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  checkedChildren?: unknown;
  unCheckedChildren?: unknown;
}

export interface SliderProps extends BaseComponentProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  onAfterChange?: (value: number | [number, number]) => void;
  disabled?: boolean;
  range?: boolean;
  min?: number;
  max?: number;
  step?: number;
  marks?: Record<number, string | any>;
  included?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  tooltip?: {
    formatter?: (value: number) => any;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    open?: boolean;
  };
}

export interface ButtonProps extends BaseComponentProps {
  type?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'link'
    | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: unknown;
  shape?: 'default' | 'circle' | 'round';
  block?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: (event: Event) => void;
  onMouseEnter?: (event: Event) => void;
  onMouseLeave?: (event: Event) => void;
  children?: unknown;
}

export interface ButtonGroupProps extends BaseComponentProps {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: unknown;
}

// Table Components
export interface TableProps extends BaseComponentProps {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  loading?: boolean;
  pagination?: boolean | PaginationProps;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  showHeader?: boolean;
  scroll?: { x?: number; y?: number };
  onRow?: (
    record: Record<string, unknown>,
    index: number
  ) => Record<string, unknown>;
  onHeaderRow?: (column: TableColumn, index: number) => Record<string, unknown>;
  onSelectionChange?: (
    selectedRowKeys: string[],
    selectedRows: Record<string, unknown>[]
  ) => void;
  onSortChange?: (sorter: TableSorter) => void;
  onFilterChange?: (filters: Record<string, unknown>) => void;
  onExpandChange?: (expanded: boolean, record: Record<string, unknown>) => void;
}

export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  filters?: TableFilter[];
  render?: (
    value: unknown,
    record: Record<string, unknown>,
    index: number
  ) => any;
  sorter?: (a: Record<string, unknown>, b: Record<string, unknown>) => number;
  filterMultiple?: boolean;
  filterSearch?: boolean;
  onFilter?: (value: unknown, record: Record<string, unknown>) => boolean;
  defaultSortOrder?: 'ascend' | 'descend';
  defaultFilteredValue?: unknown[];
}

export interface TableFilter {
  text: string;
  value: unknown;
  children?: TableFilter[];
}

export interface TableSorter {
  field: string;
  order: 'ascend' | 'descend';
}

export interface PaginationProps extends BaseComponentProps {
  current?: number;
  defaultCurrent?: number;
  total: number;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: string[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => any;
  simple?: boolean;
  size?: 'small' | 'medium' | 'large';
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

// Tree Components
export interface TreeProps extends BaseComponentProps {
  data: TreeNode[];
  selectedKeys?: string[];
  expandedKeys?: string[];
  checkedKeys?: string[];
  loadedKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultCheckedKeys?: string[];
  multiple?: boolean;
  checkable?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  draggable?: boolean;
  showLine?: boolean;
  showIcon?: boolean;
  autoExpandParent?: boolean;
  checkStrictly?: boolean;
  disabled?: boolean;
  loadData?: (node: TreeNode) => Promise<void>;
  onSelect?: (selectedKeys: string[], info: TreeSelectInfo) => void;
  onExpand?: (expandedKeys: string[], info: TreeExpandInfo) => void;
  onCheck?: (checkedKeys: string[], info: TreeCheckInfo) => void;
  onLoad?: (loadedKeys: string[], info: TreeLoadInfo) => void;
  onDrop?: (info: TreeDropInfo) => void;
  onDragStart?: (info: TreeDragInfo) => void;
  onDragEnter?: (info: TreeDragInfo) => void;
  onDragOver?: (info: TreeDragInfo) => void;
  onDragLeave?: (info: TreeDragInfo) => void;
  onDragEnd?: (info: TreeDragInfo) => void;
}

export interface TreeNode {
  key: string;
  title: string;
  icon?: unknown;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
  children?: TreeNode[];
  switcherIcon?: unknown;
  data?: Record<string, unknown>;
}

export interface TreeSelectInfo {
  node: TreeNode;
  selected: boolean;
  selectedNodes: TreeNode[];
  nativeEvent: Event;
}

export interface TreeExpandInfo {
  node: TreeNode;
  expanded: boolean;
  nativeEvent: Event;
}

export interface TreeCheckInfo {
  node: TreeNode;
  checked: boolean;
  checkedNodes: TreeNode[];
  checkedNodesPositions: { node: TreeNode; pos: string }[];
  halfCheckedKeys: string[];
  nativeEvent: Event;
}

export interface TreeLoadInfo {
  node: TreeNode;
}

export interface TreeDropInfo {
  node: TreeNode;
  dragNode: TreeNode;
  dragNodesKeys: string[];
  dropPosition: number;
  dropToGap: boolean;
}

export interface TreeDragInfo {
  node: TreeNode;
  dragNode: TreeNode;
  dragNodesKeys: string[];
}

// Menu Components
export interface MenuProps extends BaseComponentProps {
  items: MenuItem[];
  selectedKeys?: string[];
  openKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  mode?: 'horizontal' | 'vertical' | 'inline';
  theme?: 'light' | 'dark';
  multiple?: boolean;
  selectable?: boolean;
  inlineCollapsed?: boolean;
  inlineIndent?: number;
  onSelect?: (info: MenuSelectInfo) => void;
  onDeselect?: (info: MenuSelectInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
  onClick?: (info: MenuClickInfo) => void;
}

export interface MenuItem {
  key: string;
  label: string;
  icon?: unknown;
  disabled?: boolean;
  danger?: boolean;
  title?: string;
  children?: MenuItem[];
  type?: 'group' | 'divider';
  onClick?: (info: MenuClickInfo) => void;
}

export interface MenuSelectInfo {
  key: string;
  keyPath: string[];
  selectedKeys: string[];
  domEvent: Event;
  item: MenuItem;
}

export interface MenuClickInfo {
  key: string;
  keyPath: string[];
  domEvent: Event;
  item: MenuItem;
}

// All component interfaces are already exported individually above
