// Core types for the Flowise Converter application

export interface FlowiseFlow {
  id: string
  name: string
  description?: string
  nodes: FlowiseNode[]
  edges: FlowiseEdge[]
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface FlowiseNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: Record<string, any>
  inputs?: Record<string, any>
  outputs?: Record<string, any>
}

export interface FlowiseEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  type?: string
}

export interface TestResult {
  id: string
  flowId: string
  testName: string
  status: 'pending' | 'running' | 'passed' | 'failed' | 'error'
  startTime: Date
  endTime?: Date
  duration?: number
  input?: any
  output?: any
  error?: string
  logs: TestLog[]
  metadata?: Record<string, any>
}

export interface TestLog {
  id: string
  timestamp: Date
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  data?: any
}

export interface ConversionResult {
  id: string
  flowId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  langchainCode?: string
  pythonCode?: string
  javascriptCode?: string
  errors?: string[]
  warnings?: string[]
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface TestSuite {
  id: string
  name: string
  description?: string
  flows: string[] // Flow IDs
  tests: TestCase[]
  createdAt: Date
  updatedAt: Date
}

export interface TestCase {
  id: string
  name: string
  description?: string
  input: any
  expectedOutput?: any
  timeout?: number
  assertions: TestAssertion[]
}

export interface TestAssertion {
  id: string
  type: 'equals' | 'contains' | 'matches' | 'custom'
  field: string
  value: any
  message?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: Date
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  flows: FlowiseFlow[]
  testSuites: TestSuite[]
  settings: ProjectSettings
  createdAt: Date
  updatedAt: Date
}

export interface ProjectSettings {
  defaultTimeout: number
  maxRetries: number
  enableLogging: boolean
  logLevel: 'info' | 'warn' | 'error' | 'debug'
  autoSave: boolean
  theme: 'light' | 'dark' | 'system'
}

export interface WebhookEvent {
  id: string
  type: string
  data: any
  timestamp: Date
  processed: boolean
}

export interface Analytics {
  totalTests: number
  passedTests: number
  failedTests: number
  averageDuration: number
  testTrends: TestTrend[]
  flowUsage: FlowUsage[]
}

export interface TestTrend {
  date: string
  passed: number
  failed: number
  total: number
}

export interface FlowUsage {
  flowId: string
  flowName: string
  testCount: number
  successRate: number
  averageDuration: number
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down'
  services: ServiceHealth[]
  timestamp: Date
}

export interface ServiceHealth {
  name: string
  status: 'healthy' | 'degraded' | 'down'
  response_time?: number
  error?: string
}

// Form types
export interface CreateFlowForm {
  name: string
  description?: string
  file?: File
}

export interface CreateTestForm {
  name: string
  description?: string
  flowId: string
  input: any
  expectedOutput?: any
  timeout?: number
}

export interface EditFlowForm {
  name?: string
  description?: string
  nodes?: FlowiseNode[]
  edges?: FlowiseEdge[]
}

// API endpoints
export const API_ENDPOINTS = {
  FLOWS: '/api/flows',
  TESTS: '/api/tests',
  RESULTS: '/api/results',
  CONVERSION: '/api/conversion',
  ANALYTICS: '/api/analytics',
  HEALTH: '/api/health',
  WEBHOOKS: '/api/webhooks',
} as const

// Constants
export const TEST_STATUSES = {
  PENDING: 'pending',
  RUNNING: 'running',
  PASSED: 'passed',
  FAILED: 'failed',
  ERROR: 'error',
} as const

export const LOG_LEVELS = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug',
} as const

export const CONVERSION_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const

// App-specific types
export interface AppState {
  currentPage: string
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  lastActivity: string
  preferences: AppPreferences
}

export interface AppPreferences {
  autoSave: boolean
  showNotifications: boolean
  darkMode: boolean
}

export interface NavigationItem {
  id: string
  label: string
  icon: string
  href?: string
  badge?: number
  children?: NavigationItem[]
}

export interface NotificationItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export interface ChatMessage {
  id: string
  type: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface WorkspaceState {
  activeFlow?: FlowiseFlow
  testResults: TestResult[]
  conversionResults: ConversionResult[]
  isLoading: boolean
  error?: string
}
