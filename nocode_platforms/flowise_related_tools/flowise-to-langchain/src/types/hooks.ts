/**
 * Hook Interface Definitions
 *
 * This file contains comprehensive TypeScript interfaces for all hooks
 * used throughout the Flowise-to-LangChain converter application.
 */
// Import from API types directly to avoid circular dependencies
import type {
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ValidationSuggestion,
  ApiError,
  ApiResponse,
  WebSocketMessage,
  UserInfo,
} from './api.js';

// Import remaining types from index
import {
  FlowiseJSON,
  Node,
  Edge,
  ConversionConfig,
  TestConfig,
  TestResult,
  TestSuite,
  GeneratedFile,
  TestSummary,
  CoverageReport,
  LogEntry,
  FlowAnalysis,
  ConversionMetadata,
  PerformanceMetrics,
  ProjectInfo,
  ConfigPreset,
  NodeTemplate,
  NotificationItem,
  FileTreeNode,
  TabItem,
  ContextMenuItem,
  TestRunner,
  TestRunnerStatus,
  State,
  StateAction,
  StateReducer,
  EventHandler,
  AsyncEventHandler,
  Stream,
  StreamSubscriber,
  StreamUnsubscriber,
  CacheKey,
  CacheValue,
  CacheOptions,
  Result,
  Success,
  Failure,
  Option,
  Some,
  None,
} from './index.js';

// Base Hook Types
export interface HookState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  success: boolean;
}

export interface AsyncHookState<T> extends HookState<T> {
  refetch: () => Promise<void>;
  cancel: () => void;
}

export interface MutationHookState<T, V = any> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  success: boolean;
  mutate: (variables: V) => Promise<T>;
  reset: () => void;
}

export interface PaginationHookState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  page: number;
  limit: number;
  total: number;
  fetchNext: () => Promise<void>;
  fetchPrev: () => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refresh: () => Promise<void>;
}

export interface InfiniteScrollHookState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  fetchMore: () => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
}

// Flow Management Hooks
export interface UseFlowHook {
  flow: FlowiseJSON;
  setFlow: (flow: FlowiseJSON) => void;
  updateFlow: (updates: Partial<FlowiseJSON>) => void;

  // Node operations
  nodes: Node[];
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updates: Partial<Node>) => void;
  getNode: (nodeId: string) => Node | null;
  duplicateNode: (nodeId: string) => void;

  // Edge operations
  edges: Edge[];
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
  updateEdge: (edgeId: string, updates: Partial<Edge>) => void;
  getEdge: (edgeId: string) => Edge | null;

  // Selection
  selectedNodes: string[];
  selectedEdges: string[];
  setSelectedNodes: (nodeIds: string[]) => void;
  setSelectedEdges: (edgeIds: string[]) => void;
  clearSelection: () => void;
  selectAll: () => void;

  // Clipboard
  copy: () => void;
  paste: () => void;
  cut: () => void;
  canPaste: boolean;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Validation
  validate: () => Promise<ValidationResult>;
  validation: ValidationResult | null;
  isValid: boolean;

  // Conversion
  convert: (config: ConversionConfig) => Promise<GeneratedFile[]>;

  // Utilities
  clear: () => void;
  reset: () => void;
  exportFlow: () => string;
  importFlow: (flowData: string) => void;

  // State
  loading: boolean;
  error: Error | null;
  isDirty: boolean;
  lastSaved: Date | null;
}

export interface UseFlowOptionsHook {
  flow?: FlowiseJSON;
  autosave?: boolean;
  autosaveInterval?: number;
  maxHistorySize?: number;
  validateOnChange?: boolean;
  persistState?: boolean;
  storageKey?: string;
  onFlowChange?: (flow: FlowiseJSON) => void;
  onValidationChange?: (validation: ValidationResult) => void;
  onError?: (error: Error) => void;
}

export interface UseFlowSelectionHook {
  selectedNodes: string[];
  selectedEdges: string[];
  setSelectedNodes: (nodeIds: string[]) => void;
  setSelectedEdges: (edgeIds: string[]) => void;
  toggleNodeSelection: (nodeId: string) => void;
  toggleEdgeSelection: (edgeId: string) => void;
  clearSelection: () => void;
  selectAll: () => void;
  selectNodes: (nodeIds: string[]) => void;
  selectEdges: (edgeIds: string[]) => void;
  isNodeSelected: (nodeId: string) => boolean;
  isEdgeSelected: (edgeId: string) => boolean;
  hasSelection: boolean;
  selectionCount: number;
}

export interface UseFlowHistoryHook {
  history: FlowiseJSON[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  pushHistory: (flow: FlowiseJSON) => void;
  clearHistory: () => void;
  goToHistory: (index: number) => void;
  maxHistorySize: number;
  setMaxHistorySize: (size: number) => void;
}

export interface UseFlowClipboardHook {
  copy: () => void;
  paste: () => void;
  cut: () => void;
  canPaste: boolean;
  clipboardData: {
    nodes: Node[];
    edges: Edge[];
  } | null;
  clearClipboard: () => void;
}

export interface UseFlowValidationHook {
  validation: ValidationResult | null;
  isValid: boolean;
  isValidating: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  validate: (flow?: FlowiseJSON) => Promise<ValidationResult>;
  clearValidation: () => void;
  autoValidate: boolean;
  setAutoValidate: (enabled: boolean) => void;
  debounceTime: number;
  setDebounceTime: (time: number) => void;
}

// Configuration Hooks
export interface UseConfigHook {
  config: ConversionConfig;
  setConfig: (config: ConversionConfig) => void;
  updateConfig: (updates: Partial<ConversionConfig>) => void;
  resetConfig: () => void;

  // Validation
  validateConfig: () => ValidationResult;
  isValidConfig: boolean;
  configErrors: ValidationError[];

  // Presets
  presets: ConfigPreset[];
  loadPreset: (presetId: string) => void;
  savePreset: (name: string, description?: string) => void;
  deletePreset: (presetId: string) => void;

  // Persistence
  save: () => void;
  load: () => void;
  autoSave: boolean;
  setAutoSave: (enabled: boolean) => void;

  // State
  loading: boolean;
  error: Error | null;
  isDirty: boolean;
  lastSaved: Date | null;
}

export interface UseConfigOptionsHook {
  config?: ConversionConfig;
  presets?: ConfigPreset[];
  autoSave?: boolean;
  persistState?: boolean;
  storageKey?: string;
  onConfigChange?: (config: ConversionConfig) => void;
  onPresetChange?: (presets: ConfigPreset[]) => void;
  onError?: (error: Error) => void;
}

export interface UseConfigPresetsHook {
  presets: ConfigPreset[];
  loading: boolean;
  error: Error | null;
  fetchPresets: () => Promise<void>;
  createPreset: (preset: Omit<ConfigPreset, 'id'>) => Promise<ConfigPreset>;
  updatePreset: (
    id: string,
    updates: Partial<ConfigPreset>
  ) => Promise<ConfigPreset>;
  deletePreset: (id: string) => Promise<void>;
  getPreset: (id: string) => ConfigPreset | null;
  searchPresets: (query: string) => ConfigPreset[];
  filterPresets: (tags: string[]) => ConfigPreset[];
}

// Testing Hooks
export interface UseTestingHook {
  testConfig: TestConfig;
  setTestConfig: (config: TestConfig) => void;
  updateTestConfig: (updates: Partial<TestConfig>) => void;

  // Test execution
  runTests: (config?: TestConfig) => Promise<void>;
  stopTests: () => void;
  pauseTests: () => void;
  resumeTests: () => void;

  // Results
  results: TestResult[];
  summary: TestSummary | null;
  coverage: CoverageReport | null;
  logs: LogEntry[];

  // State
  isRunning: boolean;
  isPaused: boolean;
  progress: number;
  currentTest: string | null;

  // Utilities
  clearResults: () => void;
  exportResults: (format: 'json' | 'junit' | 'html') => void;
  retryFailedTests: () => Promise<void>;

  // Configuration
  generateTestConfig: (flow: FlowiseJSON) => TestConfig;
  validateTestConfig: (config: TestConfig) => ValidationResult;

  // Reporting
  generateReport: (format: 'json' | 'junit' | 'html') => Promise<string>;
  saveReport: (
    format: 'json' | 'junit' | 'html',
    path: string
  ) => Promise<void>;

  // State
  loading: boolean;
  error: Error | null;
}

export interface UseTestingOptionsHook {
  testConfig?: TestConfig;
  flow?: FlowiseJSON;
  autoRun?: boolean;
  autoSave?: boolean;
  persistState?: boolean;
  storageKey?: string;
  onTestStart?: () => void;
  onTestEnd?: (results: TestResult[]) => void;
  onTestProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
}

export interface UseTestRunnerHook {
  runner: TestRunner | null;
  status: TestRunnerStatus;

  // Control
  start: (config: TestConfig) => Promise<void>;
  stop: () => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  reset: () => Promise<void>;

  // Results
  getResults: () => TestResult[];
  getSummary: () => TestSummary | null;

  // Events
  onProgress: (callback: (progress: number) => void) => void;
  onComplete: (callback: (results: TestResult[]) => void) => void;
  onError: (callback: (error: Error) => void) => void;

  // State
  isReady: boolean;
  isRunning: boolean;
  isCompleted: boolean;
  hasError: boolean;
}

export interface UseTestGeneratorHook {
  generateUnitTests: (flow: FlowiseJSON) => TestSuite[];
  generateIntegrationTests: (flow: FlowiseJSON) => TestSuite[];
  generateE2ETests: (flow: FlowiseJSON) => TestSuite[];
  generatePerformanceTests: (flow: FlowiseJSON) => TestSuite[];
  generateSecurityTests: (flow: FlowiseJSON) => TestSuite[];
  generateAccessibilityTests: (flow: FlowiseJSON) => TestSuite[];
  generateAllTests: (flow: FlowiseJSON) => TestSuite[];

  // Options
  options: TestGeneratorOptions;
  setOptions: (options: TestGeneratorOptions) => void;

  // State
  loading: boolean;
  error: Error | null;
}

export interface TestGeneratorOptions {
  includeUnitTests: boolean;
  includeIntegrationTests: boolean;
  includeE2ETests: boolean;
  includePerformanceTests: boolean;
  includeSecurityTests: boolean;
  includeAccessibilityTests: boolean;
  generateMocks: boolean;
  generateFixtures: boolean;
  generateHelpers: boolean;
  outputFormat: 'jest' | 'mocha' | 'vitest';
  language: 'typescript' | 'javascript';
}

// Validation Hooks
export interface UseValidationHook {
  validation: ValidationResult | null;
  isValid: boolean;
  isValidating: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];

  // Validation
  validate: (
    input: FlowiseJSON | ConversionConfig | TestConfig
  ) => Promise<ValidationResult>;
  validateAsync: (
    input: FlowiseJSON | ConversionConfig | TestConfig
  ) => Promise<ValidationResult>;

  // Auto-validation
  autoValidate: boolean;
  setAutoValidate: (enabled: boolean) => void;
  debounceTime: number;
  setDebounceTime: (time: number) => void;

  // Utilities
  clearValidation: () => void;
  revalidate: () => Promise<void>;

  // Filtering
  filterErrors: (severity?: 'error' | 'warning') => ValidationError[];
  filterWarnings: (type?: string) => ValidationWarning[];
  filterSuggestions: (
    impact?: 'low' | 'medium' | 'high'
  ) => ValidationSuggestion[];

  // State
  loading: boolean;
  error: Error | null;
}

export interface UseValidationOptionsHook {
  strict?: boolean;
  version?: string;
  minimal?: boolean;
  includeWarnings?: boolean;
  includeSuggestions?: boolean;
  autoValidate?: boolean;
  debounceTime?: number;
  onValidationChange?: (validation: ValidationResult) => void;
  onError?: (error: Error) => void;
}

// Generation Hooks
export interface UseGenerationHook {
  files: GeneratedFile[];
  metadata: ConversionMetadata | null;
  analysis: FlowAnalysis | null;

  // Generation
  generate: (flow: FlowiseJSON, config: ConversionConfig) => Promise<void>;
  generateAsync: (
    flow: FlowiseJSON,
    config: ConversionConfig
  ) => Promise<GeneratedFile[]>;

  // State
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  estimatedTime: number;

  // Results
  getFiles: () => GeneratedFile[];
  getFile: (path: string) => GeneratedFile | null;
  downloadFile: (path: string) => void;
  downloadAll: () => void;
  previewFile: (path: string) => void;

  // Utilities
  clearResults: () => void;
  cancel: () => void;

  // Errors
  errors: string[];
  warnings: string[];
  clearErrors: () => void;

  // State
  loading: boolean;
  error: Error | null;
  success: boolean;
}

export interface UseGenerationOptionsHook {
  flow?: FlowiseJSON;
  config?: ConversionConfig;
  autoGenerate?: boolean;
  persistState?: boolean;
  storageKey?: string;
  onGenerationStart?: () => void;
  onGenerationProgress?: (progress: number) => void;
  onGenerationComplete?: (files: GeneratedFile[]) => void;
  onError?: (error: Error) => void;
}

// API Hooks
export interface UseApiHook<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  success: boolean;
  refetch: () => Promise<void>;
  cancel: () => void;
}

export interface UseApiOptionsHook {
  enabled?: boolean;
  refetchOnMount?: boolean;
  refetchOnFocus?: boolean;
  refetchOnReconnect?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retryAttempts?: number;
  retryDelay?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export interface UseMutationHook<T, V> {
  mutate: (variables: V) => Promise<T>;
  mutateAsync: (variables: V) => Promise<T>;
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  success: boolean;
  reset: () => void;
}

export interface UseMutationOptionsHook<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: ApiError, variables: V) => void;
  onMutate?: (variables: V) => void;
  onSettled?: (data: T | null, error: ApiError | null, variables: V) => void;
}

export interface UseWebSocketHook {
  // Connection
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;

  // Messaging
  send: (message: WebSocketMessage) => void;
  sendRequest: (method: string, path: string, data?: any) => Promise<any>;

  // Subscriptions
  subscribe: (event: string, callback: (data: any) => void) => () => void;
  unsubscribe: (event: string, callback?: (data: any) => void) => void;

  // State
  readyState: number;
  bufferedAmount: number;

  // Events
  onOpen: (callback: () => void) => void;
  onClose: (callback: (event: CloseEvent) => void) => void;
  onError: (callback: (error: Error) => void) => void;
  onMessage: (callback: (message: WebSocketMessage) => void) => void;
}

export interface UseWebSocketOptionsHook {
  url: string;
  protocols?: string[];
  autoConnect?: boolean;
  reconnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  heartbeat?: boolean;
  heartbeatInterval?: number;
  onConnect?: () => void;
  onDisconnect?: (event: CloseEvent) => void;
  onError?: (error: Error) => void;
  onMessage?: (message: WebSocketMessage) => void;
}

// UI State Hooks
export interface UseUIStateHook {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Layout
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Panels
  panelSizes: number[];
  setPanelSizes: (sizes: number[]) => void;

  // Tabs
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openTab: (tab: TabItem) => void;
  closeTab: (tabId: string) => void;

  // Modals
  modals: string[];
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;

  // Notifications
  notifications: NotificationItem[];
  showNotification: (
    notification: Omit<NotificationItem, 'id' | 'timestamp'>
  ) => void;
  hideNotification: (id: string) => void;
  clearNotifications: () => void;

  // Context menu
  contextMenu: {
    isOpen: boolean;
    position: { x: number; y: number };
    items: ContextMenuItem[];
  } | null;
  showContextMenu: (
    position: { x: number; y: number },
    items: ContextMenuItem[]
  ) => void;
  hideContextMenu: () => void;

  // Loading states
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;

  // Error states
  globalError: Error | null;
  setGlobalError: (error: Error | null) => void;

  // Settings
  settings: Record<string, unknown>;
  getSetting: (key: string) => unknown;
  setSetting: (key: string, value: unknown) => void;

  // Persistence
  saveState: () => void;
  loadState: () => void;
  resetState: () => void;
}

export interface UseUIStateOptionsHook {
  theme?: 'light' | 'dark';
  sidebarOpen?: boolean;
  panelSizes?: number[];
  activeTab?: string;
  persistState?: boolean;
  storageKey?: string;
  onThemeChange?: (theme: 'light' | 'dark') => void;
  onSidebarToggle?: (open: boolean) => void;
  onTabChange?: (tab: string) => void;
  onError?: (error: Error) => void;
}

// Project Hooks
export interface UseProjectHook {
  project: ProjectInfo | null;
  setProject: (project: ProjectInfo) => void;

  // Project management
  createProject: (name: string, description?: string) => Promise<ProjectInfo>;
  updateProject: (
    id: string,
    updates: Partial<ProjectInfo>
  ) => Promise<ProjectInfo>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string, name: string) => Promise<ProjectInfo>;

  // Project list
  projects: ProjectInfo[];
  fetchProjects: () => Promise<void>;
  searchProjects: (query: string) => ProjectInfo[];
  filterProjects: (filter: ProjectFilter) => ProjectInfo[];

  // Recent projects
  recentProjects: ProjectInfo[];
  addRecentProject: (project: ProjectInfo) => void;
  clearRecentProjects: () => void;

  // State
  loading: boolean;
  error: Error | null;
  isDirty: boolean;

  // Utilities
  exportProject: (id: string) => Promise<string>;
  importProject: (data: string) => Promise<ProjectInfo>;
}

export interface ProjectFilter {
  status?: 'active' | 'archived' | 'deleted';
  author?: string;
  dateRange?: { start: Date; end: Date };
  tags?: string[];
}

export interface UseProjectOptionsHook {
  project?: ProjectInfo;
  autoSave?: boolean;
  persistState?: boolean;
  storageKey?: string;
  onProjectChange?: (project: ProjectInfo) => void;
  onProjectsChange?: (projects: ProjectInfo[]) => void;
  onError?: (error: Error) => void;
}

// User Hooks
export interface UseUserHook {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;

  // Authentication
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;

  // Profile
  updateProfile: (updates: Partial<UserInfo>) => Promise<UserInfo>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;

  // Preferences
  preferences: UserPreferences;
  updatePreferences: (
    updates: Partial<UserPreferences>
  ) => Promise<UserPreferences>;

  // State
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;

  // Utilities
  refresh: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  editor: {
    fontSize: number;
    fontFamily: string;
    theme: string;
    tabSize: number;
  };
  privacy: {
    showProfile: boolean;
    showActivity: boolean;
    allowMessages: boolean;
  };
}

export interface UseUserOptionsHook {
  user?: UserInfo;
  autoLogin?: boolean;
  persistState?: boolean;
  storageKey?: string;
  onUserChange?: (user: UserInfo) => void;
  onLogin?: (user: UserInfo) => void;
  onLogout?: () => void;
  onError?: (error: Error) => void;
}

// Utility Hooks
export interface UseLocalStorageHook<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
  loading: boolean;
  error: Error | null;
}

export interface UseSessionStorageHook<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
  loading: boolean;
  error: Error | null;
}

export interface UseDebounceHook<T> {
  debouncedValue: T;
  isDebouncing: boolean;
  cancel: () => void;
  flush: () => void;
}

export interface UseThrottleHook<T> {
  throttledValue: T;
  isThrottling: boolean;
  cancel: () => void;
  flush: () => void;
}

export interface UseAsyncHook<T> {
  execute: () => Promise<T>;
  data: T | null;
  loading: boolean;
  error: Error | null;
  success: boolean;
  cancel: () => void;
  reset: () => void;
}

export interface UseIntervalHook {
  start: () => void;
  stop: () => void;
  reset: () => void;
  isActive: boolean;
  interval: number;
  setInterval: (interval: number) => void;
}

export interface UseTimeoutHook {
  start: () => void;
  stop: () => void;
  reset: () => void;
  isActive: boolean;
  timeout: number;
  setTimeout: (timeout: number) => void;
}

export interface UseKeyboardHook {
  keys: Record<string, boolean>;
  isKeyPressed: (key: string) => boolean;
  registerShortcut: (keys: string[], callback: () => void) => void;
  unregisterShortcut: (keys: string[]) => void;
  enableShortcuts: () => void;
  disableShortcuts: () => void;
}

export interface UseClipboardHook {
  copy: (text: string) => Promise<void>;
  paste: () => Promise<string>;
  copied: boolean;
  error: Error | null;
  isSupported: boolean;
}

export interface UseFileHook {
  files: FileList | null;
  selectFiles: (accept?: string, multiple?: boolean) => Promise<FileList>;
  readFile: (file: File) => Promise<string>;
  readFileAsBuffer: (file: File) => Promise<ArrayBuffer>;
  readFileAsDataURL: (file: File) => Promise<string>;
  downloadFile: (content: string, filename: string, type?: string) => void;
  loading: boolean;
  error: Error | null;
}

export interface UseMediaQueryHook {
  matches: boolean;
  media: string;
}

export interface UseOnlineHook {
  isOnline: boolean;
  wasOnline: boolean;
  onOnline: (callback: () => void) => void;
  onOffline: (callback: () => void) => void;
}

export interface UseGeolocationHook {
  location: GeolocationPosition | null;
  error: GeolocationPositionError | null;
  loading: boolean;
  getCurrentPosition: () => Promise<GeolocationPosition>;
  watchPosition: () => void;
  clearWatch: () => void;
}

export interface UseIntersectionObserverHook {
  ref: { current: Element | null };
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export interface UseResizeObserverHook {
  ref: { current: Element | null };
  width: number;
  height: number;
  entry: ResizeObserverEntry | null;
}

export interface UseMutationObserverHook {
  ref: { current: Element | null };
  mutations: MutationRecord[];
  observe: () => void;
  disconnect: () => void;
}

export interface UseEventListenerHook {
  addEventListener: (
    element: Element | Window | Document,
    event: string,
    handler: EventHandler
  ) => void;
  removeEventListener: (
    element: Element | Window | Document,
    event: string,
    handler: EventHandler
  ) => void;
  removeAllEventListeners: () => void;
}

export interface UsePreviousHook<T> {
  previous: T | undefined;
}

export interface UseToggleHook {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

export interface UseCounterHook {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

export interface UseArrayHook<T> {
  array: T[];
  push: (item: T) => void;
  pop: () => T | undefined;
  shift: () => T | undefined;
  unshift: (item: T) => void;
  insert: (index: number, item: T) => void;
  remove: (index: number) => T | undefined;
  clear: () => void;
  filter: (predicate: (item: T) => boolean) => void;
  update: (index: number, item: T) => void;
  move: (from: number, to: number) => void;
  sort: (compareFn?: (a: T, b: T) => number) => void;
  reverse: () => void;
}

export interface UseMapHook<K, V> {
  map: Map<K, V>;
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  has: (key: K) => boolean;
  remove: (key: K) => boolean;
  clear: () => void;
  size: number;
  keys: () => IterableIterator<K>;
  values: () => IterableIterator<V>;
  entries: () => IterableIterator<[K, V]>;
}

export interface UseSetHook<T> {
  set: Set<T>;
  add: (item: T) => void;
  remove: (item: T) => boolean;
  has: (item: T) => boolean;
  clear: () => void;
  toggle: (item: T) => void;
  size: number;
  values: () => IterableIterator<T>;
}

export interface UseQueueHook<T> {
  queue: T[];
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  size: number;
  isEmpty: boolean;
}

export interface UseStackHook<T> {
  stack: T[];
  push: (item: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  size: number;
  isEmpty: boolean;
}

export interface UseUndoRedoHook<T> {
  state: T;
  setState: (state: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
  reset: (state: T) => void;
}

export interface UseFormHook<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (name: keyof T, value: any) => void;
  setError: (name: keyof T, error: string) => void;
  setTouched: (name: keyof T, touched: boolean) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (event: Event) => void;
  handleReset: () => void;
  validate: () => boolean;
  reset: (values?: T) => void;
}

export interface UseFieldHook<T> {
  value: T;
  error: string | null;
  touched: boolean;
  setValue: (value: T) => void;
  setError: (error: string | null) => void;
  setTouched: (touched: boolean) => void;
  validate: () => boolean;
  reset: () => void;
}

export interface UseSearchHook<T> {
  query: string;
  results: T[];
  loading: boolean;
  error: Error | null;
  setQuery: (query: string) => void;
  search: (query: string) => Promise<T[]>;
  clearResults: () => void;
  debounceTime: number;
  setDebounceTime: (time: number) => void;
}

export interface UseFilterHook<T> {
  items: T[];
  filteredItems: T[];
  filters: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  addFilter: (key: string, predicate: (item: T) => boolean) => void;
  removeFilterPredicate: (key: string) => void;
}

export interface UseSortHook<T> {
  items: T[];
  sortedItems: T[];
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  setSortBy: (field: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  toggleSortOrder: () => void;
  sort: (compareFn: (a: T, b: T) => number) => void;
  clearSort: () => void;
}

export interface UsePaginationHook<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  paginatedItems: T[];
  hasNext: boolean;
  hasPrevious: boolean;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  goToPage: (page: number) => void;
}

// All hook types are already exported individually above
