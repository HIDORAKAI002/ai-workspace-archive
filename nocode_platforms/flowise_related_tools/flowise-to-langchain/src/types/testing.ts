/**
 * Testing Interface Definitions
 *
 * This file contains comprehensive TypeScript interfaces for all testing-related
 * functionality, including test configurations, results, runners, and utilities.
 */

// Import ValidationResult from API to avoid circular dependencies
import type { ValidationResult } from './api.js';

// Import remaining types from index
import {
  FlowiseJSON,
  ConversionConfig,
  GeneratedFile,
  LogEntry,
  PerformanceMetrics,
} from './index.js';

// Base Testing Types
export interface TestSuite {
  id: string;
  name: string;
  description: string;
  type:
    | 'unit'
    | 'integration'
    | 'e2e'
    | 'performance'
    | 'security'
    | 'accessibility';
  tests: Test[];
  setup?: TestSetup;
  teardown?: TestTeardown;
  timeout: number;
  retries: number;
  tags: string[];
  metadata: TestMetadata;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  type:
    | 'unit'
    | 'integration'
    | 'e2e'
    | 'performance'
    | 'security'
    | 'accessibility';
  suite: string;
  function: TestFunction;
  setup?: TestSetup;
  teardown?: TestTeardown;
  timeout: number;
  retries: number;
  skip?: boolean;
  only?: boolean;
  tags: string[];
  dependencies: string[];
  metadata: TestMetadata;
}

export interface TestMetadata {
  author: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  component?: string;
  feature?: string;
  environment?: string[];
  browser?: string[];
  device?: string[];
  os?: string[];
  requirements?: string[];
  estimatedDuration: number;
  complexity: 'simple' | 'moderate' | 'complex';
}

export interface TestFunction {
  (context: TestContext): Promise<void> | void;
}

export interface TestSetup {
  (context: TestContext): Promise<void> | void;
}

export interface TestTeardown {
  (context: TestContext): Promise<void> | void;
}

export interface TestContext {
  test: Test;
  suite: TestSuite;
  runner: TestRunner;
  config: TestConfig;
  data: Record<string, unknown>;
  mocks: TestMocks;
  fixtures: TestFixtures;
  utils: TestUtils;
  logger: TestLogger;
  metrics: TestMetrics;
}

export interface TestMocks {
  api: ApiMocks;
  fs: FileSystemMocks;
  network: NetworkMocks;
  database: DatabaseMocks;
  external: ExternalMocks;
  custom: Record<string, unknown>;
}

export interface ApiMocks {
  mock(endpoint: string, response: unknown): void;
  restore(endpoint?: string): void;
  verify(endpoint: string, times?: number): boolean;
  getCalls(endpoint: string): ApiCall[];
}

export interface ApiCall {
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  body: unknown;
  timestamp: string;
  response?: unknown;
  error?: Error;
}

export interface FileSystemMocks {
  mock(path: string, content: string | Buffer): void;
  restore(path?: string): void;
  exists(path: string): boolean;
  read(path: string): string | Buffer;
  write(path: string, content: string | Buffer): void;
  delete(path: string): void;
  list(path: string): string[];
}

export interface NetworkMocks {
  mock(url: string, response: NetworkResponse): void;
  restore(url?: string): void;
  intercept(pattern: string, handler: NetworkHandler): void;
  verify(url: string, times?: number): boolean;
}

export interface NetworkResponse {
  status: number;
  headers: Record<string, string>;
  body: unknown;
  delay?: number;
}

export interface NetworkHandler {
  (request: NetworkRequest): NetworkResponse | Promise<NetworkResponse>;
}

export interface NetworkRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: unknown;
  query: Record<string, string>;
}

export interface DatabaseMocks {
  mock(query: string, result: unknown): void;
  restore(query?: string): void;
  execute(query: string, params?: unknown[]): unknown;
  begin(): void;
  commit(): void;
  rollback(): void;
}

export interface ExternalMocks {
  mock(service: string, method: string, response: unknown): void;
  restore(service?: string, method?: string): void;
  verify(service: string, method: string, times?: number): boolean;
}

export interface TestFixtures {
  load(name: string): unknown;
  save(name: string, data: unknown): void;
  list(): string[];
  exists(name: string): boolean;
  delete(name: string): void;
  clear(): void;
}

export interface TestUtils {
  wait(ms: number): Promise<void>;
  waitFor(condition: () => boolean, timeout?: number): Promise<void>;
  retry<T>(fn: () => T, options?: RetryOptions): Promise<T>;
  timeout<T>(promise: Promise<T>, ms: number): Promise<T>;
  random: TestRandom;
  crypto: TestCrypto;
  time: TestTime;
  string: TestString;
  number: TestNumber;
  array: TestArray;
  object: TestObject;
}

export interface RetryOptions {
  retries: number;
  delay: number;
  backoff: 'fixed' | 'exponential' | 'linear';
  factor: number;
  maxDelay: number;
}

export interface TestRandom {
  int(min: number, max: number): number;
  float(min: number, max: number): number;
  string(length: number, charset?: string): string;
  boolean(): boolean;
  array<T>(generator: () => T, length: number): T[];
  choice<T>(items: T[]): T;
  uuid(): string;
  email(): string;
  url(): string;
  date(start?: Date, end?: Date): Date;
}

export interface TestCrypto {
  hash(data: string, algorithm?: string): string;
  encrypt(data: string, key: string): string;
  decrypt(data: string, key: string): string;
  sign(data: string, key: string): string;
  verify(data: string, signature: string, key: string): boolean;
}

export interface TestTime {
  now(): number;
  freeze(time?: number): void;
  unfreeze(): void;
  travel(ms: number): void;
  format(time: number, format?: string): string;
}

export interface TestString {
  contains(str: string, substr: string): boolean;
  startsWith(str: string, prefix: string): boolean;
  endsWith(str: string, suffix: string): boolean;
  matches(str: string, pattern: RegExp): boolean;
  normalize(str: string): string;
  truncate(str: string, length: number): string;
  escape(str: string): string;
  unescape(str: string): string;
}

export interface TestNumber {
  isClose(a: number, b: number, tolerance?: number): boolean;
  isInteger(n: number): boolean;
  isFloat(n: number): boolean;
  isPositive(n: number): boolean;
  isNegative(n: number): boolean;
  isZero(n: number): boolean;
  round(n: number, precision?: number): number;
}

export interface TestArray {
  isEmpty(arr: unknown[]): boolean;
  contains(arr: unknown[], item: unknown): boolean;
  containsAll(arr: unknown[], items: unknown[]): boolean;
  isEqual(a: unknown[], b: unknown[]): boolean;
  isSubset(subset: unknown[], superset: unknown[]): boolean;
  unique(arr: unknown[]): unknown[];
  flatten(arr: unknown[][]): unknown[];
  chunk(arr: unknown[], size: number): unknown[][];
  shuffle(arr: unknown[]): unknown[];
}

export interface TestObject {
  isEmpty(obj: object): boolean;
  hasKey(obj: object, key: string): boolean;
  hasValue(obj: object, value: unknown): boolean;
  isEqual(a: object, b: object): boolean;
  isSubset(subset: object, superset: object): boolean;
  keys(obj: object): string[];
  values(obj: object): unknown[];
  entries(obj: object): [string, unknown][];
  clone(obj: object): object;
  merge(target: object, source: object): object;
  pick(obj: object, keys: string[]): object;
  omit(obj: object, keys: string[]): object;
}

export interface TestLogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  group(name: string): void;
  groupEnd(): void;
  time(label: string): void;
  timeEnd(label: string): void;
  getLogs(level?: 'debug' | 'info' | 'warn' | 'error'): LogEntry[];
  clearLogs(): void;
}

export interface TestMetrics {
  startTimer(name: string): void;
  endTimer(name: string): number;
  incrementCounter(name: string, value?: number): void;
  setGauge(name: string, value: number): void;
  addHistogram(name: string, value: number): void;
  getMetrics(): Record<string, TestMetric>;
  reset(): void;
}

export interface TestMetric {
  type: 'counter' | 'gauge' | 'histogram' | 'timer';
  name: string;
  value: number;
  count?: number;
  sum?: number;
  min?: number;
  max?: number;
  avg?: number;
  percentiles?: Record<string, number>;
  timestamp: number;
}

// Test Configuration
export interface TestConfig {
  // General settings
  name: string;
  description: string;
  version: string;
  author: string;

  // Test selection
  testType:
    | 'unit'
    | 'integration'
    | 'e2e'
    | 'performance'
    | 'security'
    | 'accessibility'
    | 'all';
  includePatterns: string[];
  excludePatterns: string[];
  tags: string[];

  // Execution settings
  timeout: number;
  retries: number;
  parallel: boolean;
  maxConcurrency: number;
  bail: boolean;
  failFast: boolean;
  randomize: boolean;
  seed?: number;

  // Environment
  environment: string;
  variables: Record<string, string>;
  setupFiles: string[];
  teardownFiles: string[];

  // Mocking
  mockExternal: boolean;
  mockNetwork: boolean;
  mockFileSystem: boolean;
  mockDatabase: boolean;
  mockApis: ApiMockConfig[];

  // Reporting
  reporter:
    | 'default'
    | 'json'
    | 'junit'
    | 'html'
    | 'tap'
    | 'spec'
    | 'dot'
    | 'nyan'
    | 'lcov';
  outputDir: string;
  verbose: boolean;
  silent: boolean;
  showSummary: boolean;
  showProgress: boolean;
  showSkipped: boolean;
  showPassed: boolean;
  showFailed: boolean;
  showTodo: boolean;

  // Coverage
  coverage: boolean;
  coverageDir: string;
  coverageReporters: string[];
  coverageThreshold: CoverageThreshold;
  collectCoverageFrom: string[];
  coveragePathIgnorePatterns: string[];

  // Snapshots
  updateSnapshots: boolean;
  snapshotDir: string;
  snapshotSerializers: string[];

  // Performance
  performanceThreshold: PerformanceThreshold;
  memoryThreshold: number;
  cpuThreshold: number;

  // Security
  securityChecks: SecurityCheck[];
  vulnerabilityThreshold: 'low' | 'medium' | 'high' | 'critical';

  // Accessibility
  accessibilityStandards: string[];
  accessibilityLevel: 'A' | 'AA' | 'AAA';

  // Browser testing
  browsers: BrowserConfig[];
  headless: boolean;
  slowMo: number;
  devtools: boolean;

  // Device testing
  devices: DeviceConfig[];

  // Screenshots
  screenshots: boolean;
  screenshotDir: string;
  screenshotOnFailure: boolean;

  // Videos
  videos: boolean;
  videoDir: string;
  videoOnFailure: boolean;

  // Artifacts
  artifacts: boolean;
  artifactDir: string;

  // Notifications
  notifications: NotificationConfig[];

  // Hooks
  hooks: TestHooks;

  // Plugins
  plugins: TestPlugin[];

  // Custom
  custom: Record<string, unknown>;
}

export interface ApiMockConfig {
  name: string;
  baseUrl: string;
  endpoints: ApiEndpointMock[];
  enabled: boolean;
  delay?: number;
  errorRate?: number;
}

export interface ApiEndpointMock {
  path: string;
  method: string;
  response: unknown;
  status: number;
  headers: Record<string, string>;
  delay?: number;
  conditional?: (request: NetworkRequest) => boolean;
}

export interface CoverageThreshold {
  global: {
    branches: number;
    functions: number;
    lines: number;
    statements: number;
  };
  perFile?: {
    branches: number;
    functions: number;
    lines: number;
    statements: number;
  };
}

export interface PerformanceThreshold {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  cpuUsage: number;
  networkRequests: number;
}

export interface SecurityCheck {
  type:
    | 'xss'
    | 'sql_injection'
    | 'csrf'
    | 'clickjacking'
    | 'insecure_dependencies'
    | 'custom';
  enabled: boolean;
  config?: Record<string, unknown>;
}

export interface BrowserConfig {
  name: string;
  version?: string;
  headless?: boolean;
  slowMo?: number;
  devtools?: boolean;
  args?: string[];
  ignoreHTTPSErrors?: boolean;
  defaultViewport?: {
    width: number;
    height: number;
    deviceScaleFactor: number;
    isMobile: boolean;
    hasTouch: boolean;
    isLandscape: boolean;
  };
}

export interface DeviceConfig {
  name: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
    deviceScaleFactor: number;
    isMobile: boolean;
    hasTouch: boolean;
    isLandscape: boolean;
  };
}

export interface NotificationConfig {
  type: 'email' | 'slack' | 'webhook' | 'custom';
  enabled: boolean;
  config: Record<string, unknown>;
  triggers: ('start' | 'end' | 'failure' | 'success' | 'timeout')[];
}

export interface TestHooks {
  beforeAll?: TestHookFunction[];
  afterAll?: TestHookFunction[];
  beforeEach?: TestHookFunction[];
  afterEach?: TestHookFunction[];
  beforeSuite?: TestHookFunction[];
  afterSuite?: TestHookFunction[];
  beforeTest?: TestHookFunction[];
  afterTest?: TestHookFunction[];
  onFailure?: TestHookFunction[];
  onSuccess?: TestHookFunction[];
  onTimeout?: TestHookFunction[];
  onError?: TestHookFunction[];
}

export interface TestHookFunction {
  (context: TestContext): Promise<void> | void;
}

export interface TestPlugin {
  name: string;
  version: string;
  config: Record<string, unknown>;
  hooks?: TestHooks;
  commands?: Record<string, TestCommand>;
  matchers?: Record<string, TestMatcher>;
}

export interface TestCommand {
  (context: TestContext, ...args: unknown[]): Promise<unknown> | unknown;
}

export interface TestMatcher {
  (actual: unknown, expected: unknown): TestMatcherResult;
}

export interface TestMatcherResult {
  pass: boolean;
  message: string;
  actual?: unknown;
  expected?: unknown;
  diff?: string;
}

// Test Results
export interface TestResult {
  id: string;
  name: string;
  description: string;
  type:
    | 'unit'
    | 'integration'
    | 'e2e'
    | 'performance'
    | 'security'
    | 'accessibility';
  suite: string;
  status: 'passed' | 'failed' | 'skipped' | 'pending' | 'todo';
  duration: number;
  startTime: number;
  endTime: number;
  retries: number;
  error?: TestError;
  logs: LogEntry[];
  metrics: TestMetric[];
  assertions: TestAssertion[];
  screenshots: TestScreenshot[];
  videos: TestVideo[];
  artifacts: TestArtifact[];
  coverage?: TestCoverage;
  performance?: TestPerformance;
  security?: TestSecurity;
  accessibility?: TestAccessibility;
  tags: string[];
  metadata: TestMetadata;
}

export interface TestError {
  name: string;
  message: string;
  stack?: string;
  code?: string;
  expected?: unknown;
  actual?: unknown;
  diff?: string;
  file?: string;
  line?: number;
  column?: number;
}

export interface TestAssertion {
  id: string;
  name: string;
  passed: boolean;
  expected: unknown;
  actual: unknown;
  message: string;
  stack?: string;
  diff?: string;
  file?: string;
  line?: number;
  column?: number;
}

export interface TestScreenshot {
  id: string;
  name: string;
  path: string;
  url?: string;
  timestamp: number;
  width: number;
  height: number;
  size: number;
  type: 'full' | 'element' | 'viewport';
  element?: string;
  annotations?: ScreenshotAnnotation[];
}

export interface ScreenshotAnnotation {
  type: 'highlight' | 'arrow' | 'text' | 'box' | 'circle';
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color?: string;
  style?: Record<string, unknown>;
}

export interface TestVideo {
  id: string;
  name: string;
  path: string;
  url?: string;
  timestamp: number;
  duration: number;
  size: number;
  width: number;
  height: number;
  fps: number;
  codec: string;
  format: string;
}

export interface TestArtifact {
  id: string;
  name: string;
  type:
    | 'log'
    | 'screenshot'
    | 'video'
    | 'report'
    | 'trace'
    | 'profile'
    | 'custom';
  path: string;
  url?: string;
  timestamp: number;
  size: number;
  mimeType: string;
  encoding?: string;
  metadata?: Record<string, unknown>;
}

export interface TestCoverage {
  statements: CoverageMetric;
  branches: CoverageMetric;
  functions: CoverageMetric;
  lines: CoverageMetric;
  files: FileCoverage[];
}

export interface CoverageMetric {
  total: number;
  covered: number;
  skipped: number;
  percentage: number;
  threshold?: number;
  passed?: boolean;
}

export interface FileCoverage {
  path: string;
  statements: CoverageMetric;
  branches: CoverageMetric;
  functions: CoverageMetric;
  lines: CoverageMetric;
  uncoveredLines: number[];
  source?: string;
}

export interface TestPerformance {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  cpuUsage: number;
  networkRequests: number;
  cacheHits: number;
  cacheMisses: number;
  domNodes: number;
  domDepth: number;
  layoutDuration: number;
  paintDuration: number;
  scriptDuration: number;
  taskDuration: number;
  metrics: PerformanceMetric[];
  traces: PerformanceTrace[];
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold?: number;
  passed?: boolean;
  timestamp: number;
}

export interface PerformanceTrace {
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
  children: PerformanceTrace[];
  metadata?: Record<string, unknown>;
}

export interface TestSecurity {
  vulnerabilities: SecurityVulnerability[];
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  passed: boolean;
  checks: SecurityCheckResult[];
}

export interface SecurityVulnerability {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  references: string[];
  file?: string;
  line?: number;
  column?: number;
  code?: string;
  cwe?: string;
  cvss?: number;
}

export interface SecurityCheckResult {
  type: string;
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
  vulnerabilities?: SecurityVulnerability[];
}

export interface TestAccessibility {
  violations: AccessibilityViolation[];
  score: number;
  grade: 'A' | 'AA' | 'AAA';
  passed: boolean;
  standards: string[];
  checks: AccessibilityCheckResult[];
}

export interface AccessibilityViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  tags: string[];
  description: string;
  help: string;
  helpUrl: string;
  nodes: AccessibilityNode[];
}

export interface AccessibilityNode {
  target: string[];
  html: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  any: AccessibilityCheckResult[];
  all: AccessibilityCheckResult[];
  none: AccessibilityCheckResult[];
}

export interface AccessibilityCheckResult {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  message: string;
  data?: Record<string, unknown>;
  relatedNodes?: AccessibilityNode[];
}

// Test Summary
export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  pending: number;
  todo: number;
  duration: number;
  startTime: number;
  endTime: number;
  success: boolean;
  coverage?: TestCoverage;
  performance?: TestPerformance;
  security?: TestSecurity;
  accessibility?: TestAccessibility;
  suites: TestSuiteSummary[];
  files: TestFileSummary[];
  tags: TestTagSummary[];
}

export interface TestSuiteSummary {
  name: string;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  pending: number;
  todo: number;
  duration: number;
  success: boolean;
}

export interface TestFileSummary {
  path: string;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  pending: number;
  todo: number;
  duration: number;
  success: boolean;
}

export interface TestTagSummary {
  tag: string;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  pending: number;
  todo: number;
  duration: number;
  success: boolean;
}

// Test Runner
export interface TestRunner {
  id: string;
  name: string;
  version: string;
  config: TestConfig;
  status: 'idle' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  currentTest?: string;
  currentSuite?: string;
  startTime?: number;
  endTime?: number;

  // Methods
  run(config?: Partial<TestConfig>): Promise<TestSummary>;
  stop(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  reset(): Promise<void>;
  getResults(): TestResult[];
  getSummary(): TestSummary | null;
  getStatus(): TestRunnerStatus;

  // Events
  on(event: string, listener: (...args: unknown[]) => void): void;
  off(event: string, listener?: (...args: unknown[]) => void): void;
  emit(event: string, ...args: unknown[]): void;
}

export interface TestRunnerStatus {
  status: 'idle' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  currentTest?: string;
  currentSuite?: string;
  startTime?: number;
  endTime?: number;
  estimatedCompletion?: number;
  testsRun: number;
  testsTotal: number;
  testsPassed: number;
  testsFailed: number;
  testsSkipped: number;
  errors: string[];
  warnings: string[];
}

// Test Discovery
export interface TestDiscovery {
  discover(
    patterns: string[],
    options?: DiscoveryOptions
  ): Promise<TestSuite[]>;
  getTestCount(patterns: string[]): Promise<number>;
  validateTests(tests: TestSuite[]): Promise<ValidationResult>;
  getDependencies(tests: TestSuite[]): Promise<TestDependency[]>;
}

export interface DiscoveryOptions {
  includePatterns?: string[];
  excludePatterns?: string[];
  tags?: string[];
  recursive?: boolean;
  followSymlinks?: boolean;
  maxDepth?: number;
}

export interface TestDependency {
  id: string;
  name: string;
  type: 'test' | 'suite' | 'fixture' | 'mock' | 'plugin';
  path: string;
  dependencies: string[];
  dependents: string[];
  circular?: boolean;
}

// Test Execution
export interface TestExecutor {
  execute(test: Test, context: TestContext): Promise<TestResult>;
  executeParallel(tests: Test[], context: TestContext): Promise<TestResult[]>;
  executeSequential(tests: Test[], context: TestContext): Promise<TestResult[]>;
  cancel(testId: string): Promise<void>;
  pause(testId: string): Promise<void>;
  resume(testId: string): Promise<void>;
}

export interface TestScheduler {
  schedule(tests: Test[], config: TestConfig): Promise<TestExecution[]>;
  reschedule(execution: TestExecution): Promise<TestExecution>;
  cancel(executionId: string): Promise<void>;
  getQueue(): TestExecution[];
  getRunning(): TestExecution[];
  getCompleted(): TestExecution[];
}

export interface TestExecution {
  id: string;
  test: Test;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  priority: number;
  estimatedDuration: number;
  actualDuration?: number;
  startTime?: number;
  endTime?: number;
  worker?: string;
  result?: TestResult;
  error?: Error;
}

// Test Utilities
export interface TestGenerator {
  generateUnitTests(flow: FlowiseJSON, config: ConversionConfig): TestSuite[];
  generateIntegrationTests(
    flow: FlowiseJSON,
    config: ConversionConfig
  ): TestSuite[];
  generateE2ETests(flow: FlowiseJSON, config: ConversionConfig): TestSuite[];
  generatePerformanceTests(
    flow: FlowiseJSON,
    config: ConversionConfig
  ): TestSuite[];
  generateSecurityTests(
    flow: FlowiseJSON,
    config: ConversionConfig
  ): TestSuite[];
  generateAccessibilityTests(
    flow: FlowiseJSON,
    config: ConversionConfig
  ): TestSuite[];
}

export interface TestDataGenerator {
  generateTestData(schema: TestDataSchema): unknown;
  generateMockData(type: string, count: number): unknown[];
  generateFixtures(templates: FixtureTemplate[]): Record<string, unknown>;
  generateValidationData(rules: ValidationRule[]): TestValidationData[];
}

export interface TestDataSchema {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  properties?: Record<string, TestDataSchema>;
  items?: TestDataSchema;
  enum?: unknown[];
  format?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  required?: string[];
  additionalProperties?: boolean;
  faker?: string;
}

export interface FixtureTemplate {
  name: string;
  schema: TestDataSchema;
  count: number;
  seed?: number;
  relationships?: FixtureRelationship[];
}

export interface FixtureRelationship {
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  source: string;
  target: string;
  sourceKey: string;
  targetKey: string;
}

export interface TestValidationData {
  input: unknown;
  expected: unknown;
  description: string;
  valid: boolean;
}

export interface ValidationRule {
  field: string;
  type: string;
  required: boolean;
  format?: string;
  min?: number;
  max?: number;
  pattern?: string;
  enum?: unknown[];
  custom?: (value: unknown) => boolean;
}

// Test Reporting
export interface TestReporter {
  name: string;
  generate(
    results: TestResult[],
    summary: TestSummary,
    config: TestConfig
  ): Promise<TestReport>;
  stream(
    results: TestResult[],
    summary: TestSummary,
    config: TestConfig
  ): AsyncIterable<string>;
  supports(format: string): boolean;
}

export interface TestReport {
  id: string;
  name: string;
  format: string;
  content: string;
  path?: string;
  url?: string;
  size: number;
  generatedAt: string;
  metadata?: Record<string, unknown>;
}

// Test Assertions
export interface TestAssertions {
  expect(actual: unknown): TestExpectation;
  assert(condition: boolean, message?: string): void;
  fail(message?: string): void;
  skip(message?: string): void;
  todo(message?: string): void;
}

export interface TestExpectation {
  toBe(expected: unknown): void;
  toEqual(expected: unknown): void;
  toStrictEqual(expected: unknown): void;
  toBeCloseTo(expected: number, precision?: number): void;
  toBeDefined(): void;
  toBeUndefined(): void;
  toBeNull(): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
  toBeGreaterThan(expected: number): void;
  toBeGreaterThanOrEqual(expected: number): void;
  toBeLessThan(expected: number): void;
  toBeLessThanOrEqual(expected: number): void;
  toBeNaN(): void;
  toBeInstanceOf(expected: new (...args: unknown[]) => unknown): void;
  toContain(expected: unknown): void;
  toContainEqual(expected: unknown): void;
  toHaveLength(expected: number): void;
  toHaveProperty(expected: string, value?: unknown): void;
  toMatch(expected: string | RegExp): void;
  toMatchObject(expected: object): void;
  toMatchSnapshot(name?: string): void;
  toThrow(expected?: string | RegExp | Error): void;
  toThrowError(expected?: string | RegExp | Error): void;
  resolves: TestExpectation;
  rejects: TestExpectation;
  not: TestExpectation;
}

// All types are already exported above as interface/type declarations
