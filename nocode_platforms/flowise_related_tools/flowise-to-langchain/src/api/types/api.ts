/**
 * API Types and Interfaces
 *
 * This module defines all TypeScript interfaces and types used across the API.
 */

import { ConversionOptions as CliConversionOptions } from '../../cli/types.js';
import { ValidationResult } from '../../cli/types.js';
import { TestResult } from '../../cli/types.js';

/**
 * API Configuration
 */
export interface ApiConfig {
  port: number;
  host: string;
  cors: {
    origin: string[];
    credentials: boolean;
  };
  upload: {
    maxFileSize: number;
    allowedMimeTypes: string[];
    tempDir: string;
  };
  websocket: {
    heartbeatInterval: number;
    maxConnections: number;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

/**
 * API Request/Response Types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  requestId?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  stack?: string;
}

/**
 * Conversion API Types
 */
export interface ConvertRequest {
  /** JSON content or file path */
  input: string | object;
  /** Conversion options */
  options?: ConversionOptions;
  /** Stream results via WebSocket */
  stream?: boolean;
  /** WebSocket connection ID for streaming */
  connectionId?: string;
}

export interface ConversionOptions {
  /** Output format */
  format?: 'typescript' | 'javascript' | 'python';
  /** Target environment */
  target?: 'node' | 'browser' | 'edge';
  /** Include LangFuse integration */
  withLangfuse?: boolean;
  /** Include test files */
  includeTests?: boolean;
  /** Include documentation */
  includeDocs?: boolean;
  /** Include detailed comments */
  includeComments?: boolean;
  /** Output module format */
  outputFormat?: 'esm' | 'cjs';
  /** Enable verbose output */
  verbose?: boolean;
}

export interface ConvertResponse {
  /** Conversion job ID */
  jobId: string;
  /** Generated files */
  files: GeneratedFile[];
  /** Conversion metrics */
  metrics: ConversionMetrics;
  /** Analysis results */
  analysis: FlowAnalysis;
  /** Warnings and errors */
  warnings: string[];
  errors: string[];
}

export interface GeneratedFile {
  /** File path relative to output directory */
  path: string;
  /** File content */
  content: string;
  /** File type */
  type: 'main' | 'types' | 'config' | 'test' | 'docs';
  /** File size in bytes */
  size: number;
  /** Language/format */
  language: string;
}

export interface ConversionMetrics {
  /** Total conversion time in milliseconds */
  duration: number;
  /** Number of nodes processed */
  nodesProcessed: number;
  /** Number of files generated */
  filesGenerated: number;
  /** Total code size in bytes */
  totalSize: number;
  /** Memory usage in bytes */
  memoryUsage: number;
  /** CPU usage percentage */
  cpuUsage: number;
}

export interface FlowAnalysis {
  /** Total number of nodes */
  nodeCount: number;
  /** Total number of connections */
  connectionCount: number;
  /** Supported node types */
  supportedTypes: string[];
  /** Unsupported node types */
  unsupportedTypes: string[];
  /** Type coverage percentage */
  coverage: number;
  /** Flow complexity */
  complexity: 'simple' | 'moderate' | 'complex';
  /** Detected flow version */
  flowVersion?: string;
}

/**
 * Validation API Types
 */
export interface ValidateRequest {
  /** JSON content or file path */
  input: string | object;
  /** Validation options */
  options?: ValidationOptions;
}

export interface ValidationOptions {
  /** Strict validation mode */
  strict?: boolean;
  /** Check for deprecated features */
  checkDeprecated?: boolean;
  /** Suggest optimizations */
  suggestOptimizations?: boolean;
  /** Fix common issues */
  autoFix?: boolean;
}

export interface ValidateResponse {
  /** Validation result */
  result: ValidationResult;
  /** Fixed content (if autoFix enabled) */
  fixed?: string;
  /** Suggestions for improvement */
  suggestions: ValidationSuggestion[];
}

export interface ValidationSuggestion {
  type: 'error' | 'warning' | 'info' | 'optimization';
  message: string;
  nodeId?: string;
  path?: string;
  line?: number;
  column?: number;
  fixable?: boolean;
  autoFix?: string;
}

/**
 * Test API Types
 */
export interface TestRequest {
  /** Generated code files */
  files: GeneratedFile[];
  /** Test options */
  options?: TestOptions;
  /** Stream results via WebSocket */
  stream?: boolean;
  /** WebSocket connection ID for streaming */
  connectionId?: string;
}

export interface TestOptions {
  /** Test type to run */
  testType?: 'unit' | 'integration' | 'e2e' | 'all';
  /** Test timeout in milliseconds */
  timeout?: number;
  /** Mock external dependencies */
  mockExternal?: boolean;
  /** Generate test report */
  generateReport?: boolean;
  /** Environment file path */
  envFile?: string;
}

export interface TestResponse {
  /** Test job ID */
  jobId: string;
  /** Test results */
  results: TestResult;
  /** Test report (if requested) */
  report?: TestReport;
  /** Generated test files */
  testFiles: GeneratedFile[];
}

export interface TestReport {
  /** HTML report content */
  html: string;
  /** JSON report data */
  json: any;
  /** Coverage report */
  coverage?: CoverageReport;
}

export interface CoverageReport {
  /** Overall coverage percentage */
  total: number;
  /** Line coverage */
  lines: number;
  /** Branch coverage */
  branches: number;
  /** Function coverage */
  functions: number;
  /** Statement coverage */
  statements: number;
}

/**
 * Upload API Types
 */
export interface UploadRequest {
  /** File content */
  file: Express.Multer.File;
  /** Upload options */
  options?: UploadOptions;
}

export interface UploadOptions {
  /** Validate file after upload */
  validate?: boolean;
  /** Auto-convert after upload */
  autoConvert?: boolean;
  /** Conversion options (if autoConvert enabled) */
  conversionOptions?: ConversionOptions;
}

export interface UploadResponse {
  /** Upload job ID */
  jobId: string;
  /** File information */
  file: UploadedFile;
  /** Validation result (if requested) */
  validation?: ValidateResponse;
  /** Conversion result (if autoConvert enabled) */
  conversion?: ConvertResponse;
}

export interface UploadedFile {
  /** Original filename */
  originalName: string;
  /** Stored filename */
  filename: string;
  /** File path */
  path: string;
  /** File size in bytes */
  size: number;
  /** MIME type */
  mimetype: string;
  /** Upload timestamp */
  uploadedAt: string;
}

/**
 * WebSocket Message Types
 */
export interface WebSocketMessage {
  /** Message type */
  type:
    | 'ping'
    | 'pong'
    | 'progress'
    | 'result'
    | 'error'
    | 'subscribe'
    | 'unsubscribe';
  /** Message ID */
  id?: string;
  /** Message payload */
  payload?: any;
  /** Timestamp */
  timestamp: string;
}

export interface ProgressMessage {
  /** Job ID */
  jobId: string;
  /** Progress percentage (0-100) */
  progress: number;
  /** Current step */
  step: string;
  /** Step details */
  details?: string;
  /** Estimated time remaining in milliseconds */
  eta?: number;
}

export interface ResultMessage {
  /** Job ID */
  jobId: string;
  /** Result data */
  result: any;
  /** Operation type */
  operation: 'convert' | 'validate' | 'test' | 'upload';
}

export interface ErrorMessage {
  /** Job ID */
  jobId?: string;
  /** Error information */
  error: ApiError;
  /** Operation type */
  operation?: 'convert' | 'validate' | 'test' | 'upload';
}

/**
 * Job Management Types
 */
export interface JobInfo {
  /** Job ID */
  id: string;
  /** Job type */
  type: 'convert' | 'validate' | 'test' | 'upload';
  /** Job status */
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  /** Job progress (0-100) */
  progress: number;
  /** Creation timestamp */
  createdAt: string;
  /** Start timestamp */
  startedAt?: string;
  /** Completion timestamp */
  completedAt?: string;
  /** Job result */
  result?: any;
  /** Job error */
  error?: ApiError;
}

/**
 * Batch Operation Types
 */
export interface BatchRequest {
  /** List of operations */
  operations: BatchOperation[];
  /** Batch options */
  options?: BatchOptions;
}

export interface BatchOperation {
  /** Operation type */
  type: 'convert' | 'validate' | 'test';
  /** Operation input */
  input: any;
  /** Operation options */
  options?: any;
}

export interface BatchOptions {
  /** Maximum concurrent operations */
  maxConcurrency?: number;
  /** Stop on first error */
  stopOnError?: boolean;
  /** Stream results via WebSocket */
  stream?: boolean;
  /** WebSocket connection ID for streaming */
  connectionId?: string;
}

export interface BatchResponse {
  /** Batch job ID */
  jobId: string;
  /** Operation results */
  results: BatchResult[];
  /** Batch metrics */
  metrics: BatchMetrics;
}

export interface BatchResult {
  /** Operation index */
  index: number;
  /** Operation type */
  type: string;
  /** Operation status */
  status: 'completed' | 'failed' | 'skipped';
  /** Operation result */
  result?: any;
  /** Operation error */
  error?: ApiError;
  /** Operation duration */
  duration: number;
}

export interface BatchMetrics {
  /** Total operations */
  total: number;
  /** Completed operations */
  completed: number;
  /** Failed operations */
  failed: number;
  /** Skipped operations */
  skipped: number;
  /** Total duration */
  duration: number;
}

/**
 * API Statistics Types
 */
export interface ApiStats {
  /** Total requests processed */
  totalRequests: number;
  /** Active connections */
  activeConnections: number;
  /** Running jobs */
  runningJobs: number;
  /** Completed jobs */
  completedJobs: number;
  /** Failed jobs */
  failedJobs: number;
  /** Average response time */
  avgResponseTime: number;
  /** Memory usage */
  memoryUsage: NodeJS.MemoryUsage;
  /** CPU usage */
  cpuUsage: number;
  /** Uptime */
  uptime: number;
}

/**
 * API Configuration Types
 */
export interface ServerConfig {
  /** Server port */
  port: number;
  /** Server host */
  host: string;
  /** Enable HTTPS */
  https?: boolean;
  /** SSL certificate options */
  ssl?: {
    key: string;
    cert: string;
  };
  /** Body parser limits */
  bodyLimit: string;
  /** Request timeout */
  timeout: number;
  /** Enable compression */
  compression: boolean;
  /** Trust proxy */
  trustProxy: boolean;
}
