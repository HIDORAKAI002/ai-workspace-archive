/**
 * API Interface Definitions
 *
 * This file contains TypeScript interfaces for all API endpoints,
 * request/response types, and related networking types.
 */

import {
  FlowiseJSON,
  ConversionConfig,
  TestConfig,
  TestResult,
  GeneratedFile,
  ConversionMetadata,
  FlowAnalysis,
  TestSummary,
  CoverageReport,
  LogEntry,
  PerformanceMetrics,
  ProjectInfo,
  ConfigPreset,
  NodeTemplate,
} from './index.js';

// Base API Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  warnings?: string[];
  metadata?: ResponseMetadata;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
  timestamp: string;
  requestId?: string;
  path?: string;
  method?: string;
}

export interface ResponseMetadata {
  requestId: string;
  timestamp: string;
  duration: number;
  version: string;
  rateLimit?: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    offset: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Flow Management API
export interface FlowListRequest extends PaginationParams {
  search?: string;
  category?: string;
  tags?: string[];
  status?: 'draft' | 'valid' | 'invalid';
  author?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface FlowListResponse extends PaginationResponse<FlowInfo> {}

export interface FlowInfo {
  id: string;
  name: string;
  description?: string;
  category?: string;
  tags: string[];
  status: 'draft' | 'valid' | 'invalid';
  author: string;
  createdAt: string;
  updatedAt: string;
  nodeCount: number;
  edgeCount: number;
  complexity: 'simple' | 'moderate' | 'complex';
  version: string;
  isPublic: boolean;
  thumbnail?: string;
}

export interface FlowGetRequest {
  id: string;
  includeValidation?: boolean;
  includeAnalysis?: boolean;
  includeMetadata?: boolean;
}

export interface FlowGetResponse {
  flow: FlowiseJSON;
  validation?: ValidationResult;
  analysis?: FlowAnalysis;
  metadata?: FlowMetadata;
}

export interface FlowMetadata {
  id: string;
  name: string;
  description?: string;
  category?: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  isPublic: boolean;
  permissions: FlowPermissions;
  statistics: FlowStatistics;
}

export interface FlowPermissions {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canShare: boolean;
  canPublish: boolean;
  owner: string;
  collaborators: string[];
}

export interface FlowStatistics {
  views: number;
  conversions: number;
  shares: number;
  likes: number;
  forks: number;
  lastAccessed: string;
  accessCount: number;
}

export interface FlowCreateRequest {
  name: string;
  description?: string;
  category?: string;
  tags?: string[];
  flow: FlowiseJSON;
  isPublic?: boolean;
  templateId?: string;
}

export interface FlowCreateResponse {
  id: string;
  flow: FlowiseJSON;
  metadata: FlowMetadata;
}

export interface FlowUpdateRequest {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  tags?: string[];
  flow?: FlowiseJSON;
  isPublic?: boolean;
}

export interface FlowUpdateResponse {
  flow: FlowiseJSON;
  metadata: FlowMetadata;
}

export interface FlowDeleteRequest {
  id: string;
  force?: boolean;
}

export interface FlowDeleteResponse {
  success: boolean;
  message: string;
}

export interface FlowCloneRequest {
  id: string;
  name?: string;
  description?: string;
  isPublic?: boolean;
}

export interface FlowCloneResponse {
  id: string;
  flow: FlowiseJSON;
  metadata: FlowMetadata;
}

export interface FlowShareRequest {
  id: string;
  users: string[];
  permissions: Partial<FlowPermissions>;
  message?: string;
}

export interface FlowShareResponse {
  shareId: string;
  shareUrl: string;
  expiresAt?: string;
}

export interface FlowPublishRequest {
  id: string;
  public: boolean;
  publishToMarketplace?: boolean;
}

export interface FlowPublishResponse {
  publicUrl?: string;
  marketplaceUrl?: string;
}

// Validation API
export interface ValidateRequest {
  flow: FlowiseJSON;
  options?: {
    strict?: boolean;
    version?: string;
    minimal?: boolean;
    includeWarnings?: boolean;
    includeSuggestions?: boolean;
  };
}

export interface ValidateResponse {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  analysis?: FlowAnalysis;
  performance?: PerformanceMetrics;
}

export interface ValidationError {
  type: string;
  message: string;
  path?: string;
  nodeId?: string;
  severity: 'error' | 'critical';
  fixable?: boolean;
  suggestion?: string;
  code?: string;
  line?: number;
  column?: number;
}

export interface ValidationWarning {
  type: string;
  message: string;
  path?: string;
  nodeId?: string;
  suggestion?: string;
  code?: string;
  line?: number;
  column?: number;
}

export interface ValidationSuggestion {
  type: 'optimization' | 'best_practice' | 'simplification' | 'modernization';
  message: string;
  nodeId?: string;
  impact: 'low' | 'medium' | 'high';
  action?: string;
  code?: string;
  line?: number;
  column?: number;
}

export interface BatchValidateRequest {
  flows: { id: string; flow: FlowiseJSON }[];
  options?: {
    strict?: boolean;
    version?: string;
    minimal?: boolean;
    includeWarnings?: boolean;
    includeSuggestions?: boolean;
  };
}

export interface BatchValidateResponse {
  results: Array<{
    id: string;
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    suggestions: ValidationSuggestion[];
  }>;
  summary: {
    total: number;
    valid: number;
    invalid: number;
    totalErrors: number;
    totalWarnings: number;
    totalSuggestions: number;
  };
}

// Conversion API
export interface ConvertRequest {
  flow: FlowiseJSON;
  config: ConversionConfig;
  options?: {
    validate?: boolean;
    analyze?: boolean;
    preview?: boolean;
    includeTests?: boolean;
    includeDocs?: boolean;
    includeMetadata?: boolean;
  };
}

export interface ConvertResponse {
  files: GeneratedFile[];
  metadata: ConversionMetadata;
  analysis?: FlowAnalysis;
  validation?: ValidationResult;
  performance?: PerformanceMetrics;
  preview?: PreviewData;
}

export interface PreviewData {
  structure: FileStructure[];
  dependencies: Record<string, string>;
  scripts: Record<string, string>;
  estimatedSize: number;
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
}

export interface FileStructure {
  path: string;
  type: 'file' | 'directory';
  size?: number;
  description?: string;
  children?: FileStructure[];
}

export interface BatchConvertRequest {
  flows: Array<{
    id: string;
    flow: FlowiseJSON;
    config: ConversionConfig;
  }>;
  options?: {
    validate?: boolean;
    analyze?: boolean;
    preview?: boolean;
    includeTests?: boolean;
    includeDocs?: boolean;
    includeMetadata?: boolean;
  };
}

export interface BatchConvertResponse {
  results: Array<{
    id: string;
    success: boolean;
    files?: GeneratedFile[];
    metadata?: ConversionMetadata;
    analysis?: FlowAnalysis;
    validation?: ValidationResult;
    error?: string;
  }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
    totalFiles: number;
    totalSize: number;
    totalErrors: number;
    totalWarnings: number;
  };
}

export interface ConversionStatusRequest {
  jobId: string;
}

export interface ConversionStatusResponse {
  jobId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  currentStep: string;
  estimatedCompletion?: string;
  result?: ConvertResponse;
  error?: string;
  logs?: LogEntry[];
}

export interface ConversionCancelRequest {
  jobId: string;
}

export interface ConversionCancelResponse {
  jobId: string;
  cancelled: boolean;
  message: string;
}

// Testing API
export interface TestRequest {
  flow: FlowiseJSON;
  config: TestConfig;
  options?: {
    dryRun?: boolean;
    generateReport?: boolean;
    includeMetrics?: boolean;
    includeCoverage?: boolean;
  };
}

export interface TestResponse {
  results: TestResult[];
  summary: TestSummary;
  coverage?: CoverageReport;
  report?: TestReport;
  metrics?: TestMetrics;
  logs?: LogEntry[];
}

export interface TestReport {
  id: string;
  name: string;
  description: string;
  format: 'json' | 'junit' | 'html' | 'markdown';
  content: string;
  generatedAt: string;
  size: number;
}

export interface TestMetrics {
  totalTests: number;
  executionTime: number;
  memoryUsage: number;
  cpuUsage: number;
  networkRequests: number;
  cacheHits: number;
  cacheMisses: number;
  errors: number;
  warnings: number;
  performance: {
    slowestTest: string;
    fastestTest: string;
    averageTime: number;
    medianTime: number;
  };
}

export interface TestStatusRequest {
  jobId: string;
}

export interface TestStatusResponse {
  jobId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  currentTest: string;
  estimatedCompletion?: string;
  result?: TestResponse;
  error?: string;
  logs?: LogEntry[];
}

export interface TestCancelRequest {
  jobId: string;
}

export interface TestCancelResponse {
  jobId: string;
  cancelled: boolean;
  message: string;
}

// Template API
export interface TemplateListRequest extends PaginationParams {
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
}

export interface TemplateListResponse
  extends PaginationResponse<TemplateInfo> {}

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  downloads: number;
  rating: number;
  ratingCount: number;
  featured: boolean;
  thumbnail?: string;
  preview?: string;
}

export interface TemplateGetRequest {
  id: string;
}

export interface TemplateGetResponse {
  template: NodeTemplate;
  metadata: TemplateMetadata;
}

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  downloads: number;
  rating: number;
  ratingCount: number;
  featured: boolean;
  license: string;
  repository?: string;
  homepage?: string;
  documentation?: string;
}

export interface TemplateCreateRequest {
  name: string;
  description: string;
  category: string;
  tags: string[];
  template: NodeTemplate;
  license?: string;
  repository?: string;
  homepage?: string;
  documentation?: string;
}

export interface TemplateCreateResponse {
  id: string;
  template: NodeTemplate;
  metadata: TemplateMetadata;
}

export interface TemplateUpdateRequest {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  tags?: string[];
  template?: NodeTemplate;
  license?: string;
  repository?: string;
  homepage?: string;
  documentation?: string;
}

export interface TemplateUpdateResponse {
  template: NodeTemplate;
  metadata: TemplateMetadata;
}

export interface TemplateDeleteRequest {
  id: string;
}

export interface TemplateDeleteResponse {
  success: boolean;
  message: string;
}

// Project API
export interface ProjectListRequest extends PaginationParams {
  search?: string;
  status?: 'active' | 'archived' | 'deleted';
  author?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ProjectListResponse extends PaginationResponse<ProjectInfo> {}

export interface ProjectGetRequest {
  id: string;
}

export interface ProjectGetResponse {
  project: ProjectInfo;
  flows: FlowInfo[];
  settings: ProjectSettings;
  statistics: ProjectStatistics;
}

export interface ProjectSettings {
  general: {
    name: string;
    description: string;
    defaultConfig: ConversionConfig;
    defaultTestConfig: TestConfig;
  };
  permissions: {
    isPublic: boolean;
    allowCollaborators: boolean;
    allowForks: boolean;
    allowComments: boolean;
  };
  integrations: {
    git?: {
      repository: string;
      branch: string;
      autoSync: boolean;
    };
    ci?: {
      provider: string;
      config: Record<string, unknown>;
      enabled: boolean;
    };
  };
}

export interface ProjectStatistics {
  totalFlows: number;
  totalConversions: number;
  totalTests: number;
  totalGeneratedFiles: number;
  totalSize: number;
  lastActivity: string;
  collaborators: number;
  forks: number;
  stars: number;
}

export interface ProjectCreateRequest {
  name: string;
  description?: string;
  settings?: Partial<ProjectSettings>;
  templateId?: string;
}

export interface ProjectCreateResponse {
  project: ProjectInfo;
  settings: ProjectSettings;
}

export interface ProjectUpdateRequest {
  id: string;
  name?: string;
  description?: string;
  settings?: Partial<ProjectSettings>;
  status?: 'active' | 'archived' | 'deleted';
}

export interface ProjectUpdateResponse {
  project: ProjectInfo;
  settings: ProjectSettings;
}

export interface ProjectDeleteRequest {
  id: string;
  force?: boolean;
}

export interface ProjectDeleteResponse {
  success: boolean;
  message: string;
}

// Analytics API
export interface AnalyticsRequest {
  type: 'usage' | 'performance' | 'errors' | 'conversions' | 'tests';
  timeRange: {
    start: string;
    end: string;
  };
  granularity?: 'hour' | 'day' | 'week' | 'month';
  filters?: Record<string, unknown>;
}

export interface AnalyticsResponse {
  data: AnalyticsData[];
  summary: AnalyticsSummary;
  metadata: AnalyticsMetadata;
}

export interface AnalyticsData {
  timestamp: string;
  metrics: Record<string, number>;
  dimensions: Record<string, string>;
}

export interface AnalyticsSummary {
  total: Record<string, number>;
  average: Record<string, number>;
  peak: Record<string, number>;
  growth: Record<string, number>;
  trends: Record<string, 'up' | 'down' | 'stable'>;
}

export interface AnalyticsMetadata {
  timeRange: { start: string; end: string };
  granularity: string;
  dataPoints: number;
  filters: Record<string, unknown>;
  generatedAt: string;
}

export interface UsageAnalyticsRequest extends AnalyticsRequest {
  type: 'usage';
  metrics?: string[];
}

export interface PerformanceAnalyticsRequest extends AnalyticsRequest {
  type: 'performance';
  metrics?: string[];
}

export interface ErrorAnalyticsRequest extends AnalyticsRequest {
  type: 'errors';
  severity?: 'error' | 'warning' | 'info';
}

export interface ConversionAnalyticsRequest extends AnalyticsRequest {
  type: 'conversions';
  format?: 'typescript' | 'javascript' | 'python';
}

export interface TestAnalyticsRequest extends AnalyticsRequest {
  type: 'tests';
  testType?: 'unit' | 'integration' | 'e2e';
}

// User API
export interface UserInfoRequest {
  id?: string;
}

export interface UserInfoResponse {
  user: UserInfo;
  preferences: UserPreferences;
  statistics: UserStatistics;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin: string;
  verified: boolean;
  plan: 'free' | 'pro' | 'enterprise';
  limits: UserLimits;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showActivity: boolean;
    allowSearch: boolean;
  };
  editor: {
    fontSize: number;
    fontFamily: string;
    theme: string;
    keyBinding: string;
  };
}

export interface UserStatistics {
  totalFlows: number;
  totalConversions: number;
  totalTests: number;
  totalProjects: number;
  joinDate: string;
  lastActivity: string;
  streakDays: number;
  achievements: string[];
  reputation: number;
}

export interface UserLimits {
  maxFlows: number;
  maxProjects: number;
  maxFileSize: number;
  maxApiCalls: number;
  maxStorage: number;
  current: {
    flows: number;
    projects: number;
    storage: number;
    apiCalls: number;
  };
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

export interface UserUpdateResponse {
  user: UserInfo;
  preferences: UserPreferences;
}

// Configuration API
export interface ConfigListRequest extends PaginationParams {
  type?: 'conversion' | 'test' | 'validation';
  name?: string;
  author?: string;
  shared?: boolean;
}

export interface ConfigListResponse extends PaginationResponse<ConfigInfo> {}

export interface ConfigInfo {
  id: string;
  name: string;
  description: string;
  type: 'conversion' | 'test' | 'validation';
  author: string;
  createdAt: string;
  updatedAt: string;
  shared: boolean;
  downloads: number;
  rating: number;
  tags: string[];
}

export interface ConfigGetRequest {
  id: string;
}

export interface ConfigGetResponse {
  config: ConfigPreset;
  metadata: ConfigMetadata;
}

export interface ConfigMetadata {
  id: string;
  name: string;
  description: string;
  type: 'conversion' | 'test' | 'validation';
  author: string;
  createdAt: string;
  updatedAt: string;
  shared: boolean;
  downloads: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  version: string;
}

export interface ConfigSaveRequest {
  name: string;
  description: string;
  type: 'conversion' | 'test' | 'validation';
  config: ConversionConfig | TestConfig | ValidationConfig;
  shared?: boolean;
  tags?: string[];
}

export interface ConfigSaveResponse {
  id: string;
  config: ConfigPreset;
  metadata: ConfigMetadata;
}

export interface ValidationConfig {
  strict: boolean;
  version: string;
  minimal: boolean;
  includeWarnings: boolean;
  includeSuggestions: boolean;
  customRules: ValidationRule[];
}

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  type: string;
  enabled: boolean;
  severity: 'error' | 'warning' | 'info';
  pattern?: string;
  message: string;
  fixable: boolean;
  categories: string[];
}

// WebSocket API
export interface WebSocketMessage {
  type: string;
  id: string;
  timestamp: string;
  data?: unknown;
}

export interface WebSocketRequest extends WebSocketMessage {
  type: 'request';
  method: string;
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface WebSocketResponse extends WebSocketMessage {
  type: 'response';
  requestId: string;
  success: boolean;
  data?: unknown;
  error?: ApiError;
}

export interface WebSocketNotification extends WebSocketMessage {
  type: 'notification';
  event: string;
  data: unknown;
}

export interface WebSocketSubscription extends WebSocketMessage {
  type: 'subscribe' | 'unsubscribe';
  event: string;
  filters?: Record<string, unknown>;
}

// Real-time Events
export interface FlowChangeEvent {
  type: 'flow.change';
  flowId: string;
  userId: string;
  changes: FlowChange[];
  timestamp: string;
}

export interface FlowChange {
  type:
    | 'node.add'
    | 'node.remove'
    | 'node.update'
    | 'edge.add'
    | 'edge.remove'
    | 'edge.update';
  nodeId?: string;
  edgeId?: string;
  before?: unknown;
  after?: unknown;
}

export interface ConversionProgressEvent {
  type: 'conversion.progress';
  jobId: string;
  progress: number;
  currentStep: string;
  estimatedCompletion?: string;
  timestamp: string;
}

export interface TestProgressEvent {
  type: 'test.progress';
  jobId: string;
  progress: number;
  currentTest: string;
  estimatedCompletion?: string;
  timestamp: string;
}

export interface ValidationCompleteEvent {
  type: 'validation.complete';
  flowId: string;
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  timestamp: string;
}

export interface SystemNotificationEvent {
  type: 'system.notification';
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// File Upload API
export interface FileUploadRequest {
  file: File;
  type: 'flow' | 'template' | 'config' | 'asset';
  metadata?: Record<string, unknown>;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  metadata: Record<string, unknown>;
  uploadedAt: string;
}

export interface FileDownloadRequest {
  id: string;
  format?: 'original' | 'json' | 'yaml' | 'zip';
}

export interface FileDownloadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
  expiresAt: string;
}

// Export API
export interface ExportRequest {
  type: 'flow' | 'project' | 'template' | 'config';
  ids: string[];
  format: 'json' | 'yaml' | 'zip' | 'tar';
  includeMetadata?: boolean;
  includeAssets?: boolean;
}

export interface ExportResponse {
  id: string;
  type: string;
  format: string;
  url: string;
  filename: string;
  size: number;
  expiresAt: string;
  generatedAt: string;
}

// Import API
export interface ImportRequest {
  type: 'flow' | 'project' | 'template' | 'config';
  file: File;
  options?: {
    overwrite?: boolean;
    merge?: boolean;
    validateOnly?: boolean;
  };
}

export interface ImportResponse {
  success: boolean;
  imported: ImportedItem[];
  errors: ImportError[];
  warnings: string[];
}

export interface ImportedItem {
  id: string;
  type: string;
  name: string;
  status: 'imported' | 'updated' | 'skipped';
}

export interface ImportError {
  item: string;
  error: string;
  line?: number;
  column?: number;
}

// Health Check API
export interface HealthCheckRequest {
  detailed?: boolean;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  checks?: HealthCheck[];
}

export interface HealthCheck {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  duration: number;
  message?: string;
  details?: Record<string, unknown>;
}

// API Client Types
export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
  auth?: {
    type: 'bearer' | 'basic' | 'apikey';
    token?: string;
    username?: string;
    password?: string;
    apiKey?: string;
  };
  interceptors?: {
    request?: RequestInterceptor[];
    response?: ResponseInterceptor[];
  };
}

export interface RequestInterceptor {
  (config: RequestConfig): RequestConfig | Promise<RequestConfig>;
}

export interface ResponseInterceptor {
  (response: Response): Response | Promise<Response>;
}

export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Record<string, string>;
  body?: unknown;
  params?: Record<string, unknown>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  signal?: AbortSignal;
}

export interface Response<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

// API Client Interface
export interface ApiClient {
  get<T>(url: string, config?: Partial<RequestConfig>): Promise<Response<T>>;
  post<T>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>
  ): Promise<Response<T>>;
  put<T>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>
  ): Promise<Response<T>>;
  delete<T>(url: string, config?: Partial<RequestConfig>): Promise<Response<T>>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>
  ): Promise<Response<T>>;
  upload<T>(
    url: string,
    file: File,
    config?: Partial<RequestConfig>
  ): Promise<Response<T>>;
  download(url: string, config?: Partial<RequestConfig>): Promise<Blob>;
  stream(url: string, config?: Partial<RequestConfig>): Promise<ReadableStream>;
  subscribe(event: string, callback: (data: unknown) => void): void;
  unsubscribe(event: string, callback?: (data: unknown) => void): void;
  connect(): Promise<void>;
  disconnect(): void;
  isConnected(): boolean;
}

// All API types are already exported individually above

// Re-export ConversionResult from flowise.ts for API usage
export type { ConversionResult } from './flowise.js';

// Export ChatflowMetadata as an alias for FlowMetadata for backward compatibility
export type ChatflowMetadata = FlowMetadata;

// Create a unified ValidationResult type that matches IR types
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
