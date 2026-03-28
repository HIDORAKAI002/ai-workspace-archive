/**
 * Unit Tests for Flowise API Client
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals'
import { FlowiseApiClient } from '../../testing-ui/src/lib/flowise-api-client'

// Mock fetch globally
global.fetch = jest.fn()

describe('FlowiseApiClient', () => {
  let client: FlowiseApiClient
  const mockBaseUrl = 'http://localhost:3000'
  const mockApiKey = 'test-api-key-123'

  beforeEach(() => {
    client = new FlowiseApiClient({ 
      url: mockBaseUrl, 
      apiKey: mockApiKey 
    })
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Authentication', () => {
    it('should include API key in headers', async () => {
      const mockResponse = { status: 'healthy' }
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      await client.testConnection()

      expect(fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/v1/health`,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${mockApiKey}`,
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('should handle authentication errors', async () => {
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: () => Promise.resolve({ error: 'Invalid API key' }),
      } as Response)

      await expect(client.testConnection()).rejects.toThrow('Authentication failed')
    })
  })

  describe('Connection Testing', () => {
    it('should test connection successfully', async () => {
      const mockResponse = { 
        status: 'healthy',
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      const result = await client.testConnection()

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/v1/health`,
        expect.any(Object)
      )
    })

    it('should handle network errors', async () => {
      jest.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await expect(client.testConnection()).rejects.toThrow('Connection failed')
    })

    it('should handle timeout errors', async () => {
      // Mock a delayed response that exceeds timeout
      jest.mocked(fetch).mockImplementationOnce(() => 
        new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve({ status: 'healthy' }),
        } as Response), 10000))
      )

      await expect(client.testConnection()).rejects.toThrow('Connection timeout')
    })
  })

  describe('Flow Operations', () => {
    const mockFlows = [
      {
        id: 'flow-1',
        name: 'Test Flow 1',
        description: 'A test flow',
        deployed: true,
        isPublic: true,
        category: 'Test',
        createdDate: '2024-01-01T00:00:00Z',
        updatedDate: '2024-01-01T00:00:00Z',
        flowData: JSON.stringify({ nodes: [], edges: [] })
      },
      {
        id: 'flow-2',
        name: 'Test Flow 2',
        description: 'Another test flow',
        deployed: false,
        isPublic: false,
        category: 'Test',
        createdDate: '2024-01-02T00:00:00Z',
        updatedDate: '2024-01-02T00:00:00Z',
        flowData: JSON.stringify({ nodes: [], edges: [] })
      }
    ]

    it('should list flows successfully', async () => {
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockFlows),
      } as Response)

      const flows = await client.listFlows()

      expect(flows).toEqual(mockFlows)
      expect(fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/v1/chatflows`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${mockApiKey}`,
          }),
        })
      )
    })

    it('should handle empty flow list', async () => {
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)

      const flows = await client.listFlows()

      expect(flows).toEqual([])
    })

    it('should get flow by ID', async () => {
      const mockFlow = mockFlows[0]
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockFlow),
      } as Response)

      const flow = await client.getFlow('flow-1')

      expect(flow).toEqual(mockFlow)
      expect(fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/v1/chatflows/flow-1`,
        expect.any(Object)
      )
    })

    it('should handle flow not found', async () => {
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ error: 'Flow not found' }),
      } as Response)

      await expect(client.getFlow('non-existent')).rejects.toThrow('Flow not found')
    })

    it('should search flows with filters', async () => {
      const filteredFlows = [mockFlows[0]]
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(filteredFlows),
      } as Response)

      const flows = await client.searchFlows({
        query: 'Test Flow 1',
        category: 'Test',
        deployed: true
      })

      expect(flows).toEqual(filteredFlows)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Test%20Flow%201'),
        expect.any(Object)
      )
    })
  })

  describe('Retry Logic', () => {
    it('should retry failed requests', async () => {
      // First call fails, second succeeds
      jest.mocked(fetch)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ status: 'healthy' }),
        } as Response)

      const result = await client.testConnection()

      expect(fetch).toHaveBeenCalledTimes(2)
      expect(result).toEqual({ status: 'healthy' })
    })

    it('should respect max retry attempts', async () => {
      jest.mocked(fetch).mockRejectedValue(new Error('Persistent error'))

      await expect(client.testConnection()).rejects.toThrow('Connection failed')
      expect(fetch).toHaveBeenCalledTimes(4) // Initial + 3 retries
    })

    it('should use exponential backoff', async () => {
      const startTime = Date.now()
      jest.mocked(fetch).mockRejectedValue(new Error('Persistent error'))

      try {
        await client.testConnection()
      } catch (error) {
        // Should have waited at least for the backoff delays
        const elapsed = Date.now() - startTime
        expect(elapsed).toBeGreaterThan(1000) // At least 1 second for retries
      }
    })
  })

  describe('Caching', () => {
    it('should cache flow list responses', async () => {
      const mockFlows = [{ id: 'flow-1', name: 'Cached Flow' }]
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockFlows),
      } as Response)

      // First call
      const flows1 = await client.listFlows()
      
      // Second call should use cache
      const flows2 = await client.listFlows()

      expect(flows1).toEqual(mockFlows)
      expect(flows2).toEqual(mockFlows)
      expect(fetch).toHaveBeenCalledTimes(1) // Only one actual request
    })

    it('should invalidate cache after TTL', async () => {
      const mockFlows = [{ id: 'flow-1', name: 'TTL Test Flow' }]
      jest.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockFlows),
      } as Response)

      // Set short cache TTL for testing
      client.setCacheTTL(100) // 100ms

      await client.listFlows()
      
      // Wait for cache to expire
      await new Promise(resolve => setTimeout(resolve, 150))
      
      await client.listFlows()

      expect(fetch).toHaveBeenCalledTimes(2)
    })

    it('should clear cache manually', async () => {
      const mockFlows = [{ id: 'flow-1', name: 'Clear Cache Test' }]
      jest.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockFlows),
      } as Response)

      await client.listFlows()
      client.clearCache()
      await client.listFlows()

      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('Rate Limiting', () => {
    it('should queue requests when rate limited', async () => {
      const mockResponse = { status: 'healthy' }
      jest.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      // Make multiple concurrent requests
      const promises = Array(5).fill(0).map(() => client.testConnection())
      
      await Promise.all(promises)

      // All requests should complete successfully
      expect(fetch).toHaveBeenCalledTimes(5)
    })

    it('should handle 429 rate limit responses', async () => {
      jest.mocked(fetch)
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
          statusText: 'Too Many Requests',
          headers: new Headers({ 'Retry-After': '1' }),
          json: () => Promise.resolve({ error: 'Rate limited' }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ status: 'healthy' }),
        } as Response)

      const result = await client.testConnection()

      expect(result).toEqual({ status: 'healthy' })
      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('Error Handling', () => {
    it('should handle malformed JSON responses', async () => {
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      } as Response)

      await expect(client.testConnection()).rejects.toThrow('Invalid response format')
    })

    it('should handle server errors gracefully', async () => {
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({ error: 'Database connection failed' }),
      } as Response)

      await expect(client.testConnection()).rejects.toThrow('Server error')
    })

    it('should provide detailed error information', async () => {
      const errorResponse = {
        error: 'Validation failed',
        details: 'Invalid flow format',
        code: 'VALIDATION_ERROR'
      }
      
      jest.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve(errorResponse),
      } as Response)

      try {
        await client.testConnection()
      } catch (error) {
        expect(error.message).toContain('Validation failed')
        expect(error.details).toBe('Invalid flow format')
        expect(error.code).toBe('VALIDATION_ERROR')
      }
    })
  })

  describe('Configuration', () => {
    it('should update configuration', () => {
      const newConfig = {
        maxRetries: 5,
        retryDelay: 2000,
        timeout: 15000,
        cacheTTL: 300000
      }

      client.updateConfig(newConfig)
      
      // Verify configuration is applied (implementation-specific test)
      expect(client.getConfig()).toEqual(expect.objectContaining(newConfig))
    })

    it('should validate configuration values', () => {
      expect(() => {
        client.updateConfig({ maxRetries: -1 })
      }).toThrow('Invalid configuration')

      expect(() => {
        client.updateConfig({ timeout: 0 })
      }).toThrow('Invalid configuration')
    })
  })
})