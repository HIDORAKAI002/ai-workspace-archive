import { renderHook, waitFor } from '../utils/test-utils'
import { useApiQuery, useApiMutation } from '@/hooks/useApi'
import { mockFlowiseFlow, mockConversionResult, mockTestResult } from '../mocks/data'

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}))

const mockAxios = require('axios')
const mockAxiosInstance = mockAxios.create()

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useApiQuery', () => {
    it('fetches health check data successfully', async () => {
      const healthData = { status: 'ok', timestamp: new Date().toISOString() }
      mockAxiosInstance.get.mockResolvedValueOnce({ data: healthData })

      const { result } = renderHook(() => 
        useApiQuery(['health'], '/health')
      )

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(healthData)
      expect(result.current.error).toBeNull()
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/health')
    })

    it('fetches analytics data with proper error handling', async () => {
      const errorMessage = 'Analytics service unavailable'
      mockAxiosInstance.get.mockRejectedValueOnce(new Error(errorMessage))

      const { result } = renderHook(() => 
        useApiQuery(['analytics'], '/api/analytics')
      )

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toBeTruthy()
      expect(result.current.error?.message).toBe(errorMessage)
    })

    it('handles network timeout errors', async () => {
      const timeoutError = { 
        code: 'TIMEOUT',
        message: 'Request timeout'
      }
      mockAxiosInstance.get.mockRejectedValueOnce(timeoutError)

      const { result } = renderHook(() => 
        useApiQuery(['flows'], '/api/flows', {
          timeout: 5000
        })
      )

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toEqual(timeoutError)
    })

    it('retries failed requests according to configuration', async () => {
      mockAxiosInstance.get
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ data: [mockFlowiseFlow] })

      const { result } = renderHook(() => 
        useApiQuery(['flows'], '/api/flows', {
          retry: 2,
          retryDelay: 100
        })
      )

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual([mockFlowiseFlow])
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(3)
    })
  })

  describe('useApiMutation', () => {
    it('posts conversion data successfully', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ 
        data: mockConversionResult 
      })

      const { result } = renderHook(() => 
        useApiMutation('/api/convert')
      )

      const conversionData = {
        flowData: mockFlowiseFlow,
        settings: {
          outputFormat: 'typescript',
          withLangfuse: false
        }
      }

      result.current.mutate(conversionData)

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockConversionResult)
      expect(result.current.error).toBeNull()
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/convert',
        conversionData
      )
    })

    it('handles conversion errors with detailed error information', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: {
            message: 'Invalid flow configuration',
            details: 'Missing required node connections',
            code: 'INVALID_FLOW'
          }
        }
      }

      mockAxiosInstance.post.mockRejectedValueOnce(errorResponse)

      const { result } = renderHook(() => 
        useApiMutation('/api/convert')
      )

      result.current.mutate({
        flowData: { invalid: 'data' },
        settings: {}
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBeTruthy()
      expect(result.current.data).toBeNull()
    })

    it('posts test execution data and handles streaming responses', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ 
        data: mockTestResult 
      })

      const { result } = renderHook(() => 
        useApiMutation('/api/test')
      )

      const testData = {
        flowData: mockFlowiseFlow,
        testConfig: {
          timeout: 30000,
          retries: 3,
          verbose: true
        }
      }

      result.current.mutate(testData)

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockTestResult)
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/test',
        testData
      )
    })

    it('handles file upload with proper form data', async () => {
      const mockFile = new File(['test content'], 'test.json', {
        type: 'application/json'
      })

      const uploadResponse = {
        id: 'upload-123',
        filename: 'test.json',
        size: 1024,
        status: 'success'
      }

      mockAxiosInstance.post.mockResolvedValueOnce({ 
        data: uploadResponse 
      })

      const { result } = renderHook(() => 
        useApiMutation('/api/upload')
      )

      const formData = new FormData()
      formData.append('file', mockFile)

      result.current.mutate(formData)

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(uploadResponse)
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/upload',
        formData,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'multipart/form-data'
          })
        })
      )
    })
  })

  describe('Error Handling', () => {
    it('handles 401 unauthorized errors', async () => {
      const unauthorizedError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized access' }
        }
      }

      mockAxiosInstance.get.mockRejectedValueOnce(unauthorizedError)

      const { result } = renderHook(() => 
        useApiQuery(['protected'], '/api/protected')
      )

      await waitFor(() => {
        expect(result.current.error).toBeTruthy()
      })

      expect(result.current.error?.response?.status).toBe(401)
    })

    it('handles 500 server errors with fallback', async () => {
      const serverError = {
        response: {
          status: 500,
          data: { message: 'Internal server error' }
        }
      }

      mockAxiosInstance.post.mockRejectedValueOnce(serverError)

      const { result } = renderHook(() => 
        useApiMutation('/api/convert')
      )

      result.current.mutate({ flowData: mockFlowiseFlow })

      await waitFor(() => {
        expect(result.current.error).toBeTruthy()
      })

      expect(result.current.error?.response?.status).toBe(500)
    })

    it('handles network connectivity issues', async () => {
      const networkError = {
        code: 'NETWORK_ERROR',
        message: 'Network request failed'
      }

      mockAxiosInstance.get.mockRejectedValueOnce(networkError)

      const { result } = renderHook(() => 
        useApiQuery(['health'], '/health')
      )

      await waitFor(() => {
        expect(result.current.error).toBeTruthy()
      })

      expect(result.current.error?.code).toBe('NETWORK_ERROR')
    })
  })

  describe('Request Interceptors', () => {
    it('adds authentication headers when available', async () => {
      // Mock localStorage with auth token
      const mockToken = 'auth-token-123'
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => mockToken),
          setItem: jest.fn(),
          removeItem: jest.fn(),
        },
        writable: true
      })

      mockAxiosInstance.get.mockResolvedValueOnce({ 
        data: { message: 'Authenticated request' } 
      })

      const { result } = renderHook(() => 
        useApiQuery(['auth-test'], '/api/auth-test')
      )

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled()
    })

    it('handles request timeout configuration', async () => {
      mockAxiosInstance.get.mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject({ code: 'TIMEOUT' }), 100)
        )
      )

      const { result } = renderHook(() => 
        useApiQuery(['timeout-test'], '/api/slow-endpoint', {
          timeout: 50
        })
      )

      await waitFor(() => {
        expect(result.current.error?.code).toBe('TIMEOUT')
      })
    })
  })

  describe('Response Interceptors', () => {
    it('transforms response data correctly', async () => {
      const rawResponse = {
        data: {
          result: mockConversionResult,
          meta: { timestamp: '2024-01-01' }
        }
      }

      mockAxiosInstance.get.mockResolvedValueOnce(rawResponse)

      const { result } = renderHook(() => 
        useApiQuery(['conversion'], '/api/conversion/123')
      )

      await waitFor(() => {
        expect(result.current.data).toEqual(rawResponse.data)
      })

      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled()
    })

    it('handles token refresh on 401 responses', async () => {
      const refreshTokenResponse = { data: { token: 'new-token' } }
      
      mockAxiosInstance.post
        .mockResolvedValueOnce(refreshTokenResponse) // Token refresh
        .mockResolvedValueOnce({ data: mockFlowiseFlow }) // Retry original request

      mockAxiosInstance.get
        .mockRejectedValueOnce({ response: { status: 401 } }) // Initial 401
        .mockResolvedValueOnce({ data: mockFlowiseFlow }) // Successful retry

      const { result } = renderHook(() => 
        useApiQuery(['flows'], '/api/flows')
      )

      await waitFor(() => {
        expect(result.current.data).toEqual(mockFlowiseFlow)
      })
    })
  })
})