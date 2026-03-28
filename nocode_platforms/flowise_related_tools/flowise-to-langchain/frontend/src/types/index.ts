// Core types for the Flowise-to-LangChain React frontend
export interface FlowiseNode {
  id: string;
  type: string;
  label: string;
  data: {
    [key: string]: any;
  };
  position: {
    x: number;
    y: number;
  };
  inputs?: {
    [key: string]: any;
  };
  outputs?: {
    [key: string]: any;
  };
}

export interface FlowiseEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export interface FlowiseFlow {
  id: string;
  name: string;
  description?: string;
  nodes: FlowiseNode[];
  edges: FlowiseEdge[];
  version: string;
  createdAt: string;
  updatedAt: string;
  isValid?: boolean;
}

export interface ConversionOptions {
  inputPath: string;
  outputPath: string;
  withLangfuse: boolean;
  flowiseVersion: string;
  selfTest: boolean;
  overwrite: boolean;
  format: 'typescript' | 'javascript' | 'python';
  target: 'node' | 'browser' | 'edge';
  includeTests: boolean;
  includeDocs: boolean;
}

export interface ConversionResult {
  success: boolean;
  nodesConverted: number;
  filesGenerated: string[];
  warnings: string[];
  errors: string[];
  metadata: {
    inputFile: string;
    outputDirectory: string;
    format: string;
    target: string;
    timestamp: string;
  };
  generatedCode?: string;
  testResults?: TestResult;
}

export interface TestResult {
  success: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: Array<{
    name: string;
    error: string;
    suggestion?: string;
  }>;
  duration: number;
  coverage?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  detectedVersion?: string;
  nodeCount?: number;
  edgeCount?: number;
  nodeTypes?: string[];
  complexity?: 'low' | 'medium' | 'high';
  supportedFeatures?: string[];
  unsupportedFeatures?: Array<{
    name: string;
    reason: string;
    workaround?: string;
  }>;
}

export interface ValidationError {
  message: string;
  path?: string;
  code?: string;
  suggestion?: string;
}

export interface ValidationWarning {
  message: string;
  path?: string;
  code?: string;
}

export interface ValidationSuggestion {
  type: 'optimization' | 'best_practice' | 'simplification' | 'modernization';
  message: string;
  nodeId?: string;
  action?: string;
  impact?: 'low' | 'medium' | 'high';
}

export interface RecentConversion {
  id: string;
  name: string;
  createdAt: string;
  status: 'success' | 'failed' | 'pending';
  format: 'typescript' | 'javascript' | 'python';
  nodeCount: number;
  filesGenerated: number;
}

export interface AppState {
  currentFlow: FlowiseFlow | null;
  conversionOptions: ConversionOptions;
  lastConversionResult: ConversionResult | null;
  recentConversions: RecentConversion[];
  isConverting: boolean;
  isTesting: boolean;
  isValidating: boolean;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FlowViewerProps extends ComponentProps {
  flow: FlowiseFlow;
  onNodeSelect?: (node: FlowiseNode) => void;
  onEdgeSelect?: (edge: FlowiseEdge) => void;
  selectedNode?: FlowiseNode | null;
  selectedEdge?: FlowiseEdge | null;
  readOnly?: boolean;
  showValidation?: boolean;
  validationResult?: ValidationResult;
}

export interface ConversionWorkspaceProps extends ComponentProps {
  flow: FlowiseFlow;
  options: ConversionOptions;
  onOptionsChange: (options: ConversionOptions) => void;
  onConvert: () => void;
  isConverting: boolean;
  result?: ConversionResult;
}

export interface TestingInterfaceProps extends ComponentProps {
  flow: FlowiseFlow;
  conversionResult: ConversionResult;
  onRunTest: (testType: 'unit' | 'integration' | 'e2e' | 'all') => void;
  isTesting: boolean;
  testResult?: TestResult;
}

export interface DashboardProps extends ComponentProps {
  recentConversions: RecentConversion[];
  onLoadConversion: (id: string) => void;
  onDeleteConversion: (id: string) => void;
  onNewConversion: () => void;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  actions?: Array<{
    label: string;
    handler: () => void;
  }>;
}