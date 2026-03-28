import axios from 'axios'
import {
  FlowiseFlow,
  TestResult,
  ConversionResult,
  ApiResponse,
  PaginatedResponse,
  Analytics,
  SystemHealth,
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API methods
export const api = {
  // Flow management
  flows: {
    getAll: async (params?: {
      page?: number
      limit?: number
    }): Promise<PaginatedResponse<FlowiseFlow>> => {
      const response = await apiClient.get('/api/flows', { params })
      return response.data
    },

    getById: async (id: string): Promise<FlowiseFlow> => {
      const response = await apiClient.get(`/api/flows/${id}`)
      return response.data
    },

    create: async (flow: Partial<FlowiseFlow>): Promise<FlowiseFlow> => {
      const response = await apiClient.post('/api/flows', flow)
      return response.data
    },

    update: async (
      id: string,
      flow: Partial<FlowiseFlow>
    ): Promise<FlowiseFlow> => {
      const response = await apiClient.put(`/api/flows/${id}`, flow)
      return response.data
    },

    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`/api/flows/${id}`)
    },

    upload: async (file: File): Promise<FlowiseFlow> => {
      const formData = new FormData()
      formData.append('file', file)
      const response = await apiClient.post('/api/flows/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data
    },

    validate: async (flowData: any): Promise<ApiResponse> => {
      const response = await apiClient.post('/api/flows/validate', flowData)
      return response.data
    },
  },

  // Test management
  tests: {
    run: async (flowId: string, input: any): Promise<TestResult> => {
      const response = await apiClient.post('/api/tests/run', { flowId, input })
      return response.data
    },

    getResults: async (params?: {
      flowId?: string
      status?: string
      page?: number
      limit?: number
    }): Promise<PaginatedResponse<TestResult>> => {
      const response = await apiClient.get('/api/tests/results', { params })
      return response.data
    },

    getById: async (id: string): Promise<TestResult> => {
      const response = await apiClient.get(`/api/tests/${id}`)
      return response.data
    },

    cancel: async (id: string): Promise<void> => {
      await apiClient.post(`/api/tests/${id}/cancel`)
    },

    retry: async (id: string): Promise<TestResult> => {
      const response = await apiClient.post(`/api/tests/${id}/retry`)
      return response.data
    },

    getLogs: async (id: string): Promise<any[]> => {
      const response = await apiClient.get(`/api/tests/${id}/logs`)
      return response.data
    },
  },

  // Conversion
  conversion: {
    convert: async (
      flowId: string,
      options?: any
    ): Promise<ConversionResult> => {
      const response = await apiClient.post('/api/conversion/convert', {
        flowId,
        options,
      })
      return response.data
    },

    getResult: async (id: string): Promise<ConversionResult> => {
      const response = await apiClient.get(`/api/conversion/${id}`)
      return response.data
    },

    getHistory: async (params?: {
      flowId?: string
      page?: number
      limit?: number
    }): Promise<PaginatedResponse<ConversionResult>> => {
      const response = await apiClient.get('/api/conversion/history', {
        params,
      })
      return response.data
    },

    downloadCode: async (
      id: string,
      format: 'python' | 'javascript'
    ): Promise<string> => {
      const response = await apiClient.get(`/api/conversion/${id}/download`, {
        params: { format },
        responseType: 'text',
      })
      return response.data
    },
  },

  // Analytics
  analytics: {
    getOverview: async (timeframe?: string): Promise<Analytics> => {
      const response = await apiClient.get('/api/analytics/overview', {
        params: { timeframe },
      })
      return response.data
    },

    getTestTrends: async (days: number = 30): Promise<any[]> => {
      const response = await apiClient.get('/api/analytics/trends', {
        params: { days },
      })
      return response.data
    },

    getFlowUsage: async (): Promise<any[]> => {
      const response = await apiClient.get('/api/analytics/flow-usage')
      return response.data
    },

    getPerformanceMetrics: async (): Promise<any> => {
      const response = await apiClient.get('/api/analytics/performance')
      return response.data
    },
  },

  // System health
  health: {
    check: async (): Promise<SystemHealth> => {
      const response = await apiClient.get('/health', { timeout: 3000 }) // 3 second timeout
      return response.data
    },

    getStatus: async (): Promise<any> => {
      const response = await apiClient.get('/api/health/status')
      return response.data
    },
  },

  // WebSocket connection for real-time updates
  websocket: {
    connect: (onMessage: (data: any) => void): WebSocket => {
      const wsUrl = API_BASE_URL.replace(/^http/, 'ws')
      const ws = new WebSocket(`${wsUrl}/ws`)

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        onMessage(data)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      return ws
    },
  },
}

// Utility functions
export const apiUtils = {
  isApiError: (error: any): boolean => {
    return error.response && error.response.data
  },

  getErrorMessage: (error: any): string => {
    if (error.response?.data?.message) {
      return error.response.data.message
    }
    if (error.message) {
      return error.message
    }
    return 'An unexpected error occurred'
  },

  formatApiResponse: <T>(data: T): ApiResponse<T> => ({
    success: true,
    data,
    timestamp: new Date(),
  }),

  handleApiError: (error: any): ApiResponse => ({
    success: false,
    error: apiUtils.getErrorMessage(error),
    timestamp: new Date(),
  }),
}

export default api
