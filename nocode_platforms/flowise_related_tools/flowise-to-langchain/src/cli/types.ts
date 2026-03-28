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

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  detectedVersion?: string | undefined;
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
  fixable?: boolean;
  analysis?: {
    nodeCount: number;
    connectionCount: number;
    coverage: number;
    complexity: 'low' | 'medium' | 'high';
    supportedTypes: string[];
    unsupportedTypes: string[];
  };
}

export interface TestConfiguration {
  inputPath: string;
  outputPath: string;
  testType: 'unit' | 'integration' | 'e2e' | 'all';
  timeout: number;
  envFile: string;
  mockExternal: boolean;
  generateReport: boolean;
  fixTests: boolean;
  dryRun: boolean;
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
  coverage: string | undefined;
}

export interface TestPlan {
  totalTests: number;
  estimatedDuration: number;
  unitTests: Array<{
    name: string;
    description: string;
    dependencies?: string[];
  }>;
  integrationTests: Array<{
    name: string;
    description: string;
    requirements?: string[];
  }>;
  e2eTests: Array<{
    name: string;
    description: string;
    scenarios?: string[];
  }>;
}

export interface ConversionResult {
  nodesConverted: number;
  filesGenerated: string[];
  warnings: string[];
  metadata: {
    inputFile: string;
    outputDirectory: string;
    format: string;
    target: string;
    timestamp: string;
  };
}

export interface LogLevel {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp?: Date;
  context?: Record<string, unknown>;
}

export interface CliError extends Error {
  code?: string;
  exitCode?: number;
  suggestions?: string[];
}
