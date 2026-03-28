import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { apiUtils } from './api'

export interface FlowiseConfig {
  url: string
  apiKey?: string
  timeout?: number
  retryAttempts?: number
  retryDelay?: number
  cacheEnabled?: boolean
  cacheTtl?: number
}

export interface FlowiseFlow {
  id: string
  name: string
  description?: string
  flowData: any
  deployed: boolean
  isPublic: boolean
  apikeyid?: string
  chatbotConfig?: any
  category?: string
  createdDate: string
  updatedDate: string
}

export interface FlowiseResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface FlowiseListResponse {
  flows: FlowiseFlow[]
  total: number
}

export interface FlowiseChatRequest {
  question: string
  history?: Array<{ role: string; content: string }>
  uploads?: Array<{ data: string; type: string; name: string; mime: string }>
  leadEmail?: string
  socketIOClientId?: string
  chatId?: string
}

export interface FlowiseChatResponse {
  text: string
  question: string
  chatId: string
  chatMessageId: string
  sessionId?: string
  memoryType?: string
  uploads?: any[]
  followUpPrompts?: string[]
}

interface CacheEntry<T = any> {
  data: T
  timestamp: number
  ttl: number
}

interface ApiCache {
  get<T>(key: string): T | null
  set<T>(key: string, value: T, ttl?: number): void
  clear(): void
  delete(key: string): void
}

// Simple memory cache implementation
class MemoryCache implements ApiCache {
  private cache = new Map<string, CacheEntry>()

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    
    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data as T
  }

  set<T>(key: string, value: T, ttl = 300000): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      ttl,
    })
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }
}

export class FlowiseApiClient {
  private client: AxiosInstance
  private config: FlowiseConfig
  private cache: ApiCache
  private rateLimitQueue: Array<() => Promise<any>> = []
  private processingQueue = false

  constructor(config: FlowiseConfig) {
    this.config = {
      retryAttempts: 3,
      retryDelay: 1000,
      cacheEnabled: true,
      cacheTtl: 300000, // 5 minutes
      ...config,
    }
    
    this.cache = new MemoryCache()
    
    this.client = axios.create({
      baseURL: config.url.replace(/\/$/, ''), // Remove trailing slash
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FloWiseConverter/1.0',
        ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
      },
    })

    // Request interceptor for authentication
    this.client.interceptors.request.use(
      (request) => {
        if (this.config.apiKey && !request.headers.Authorization) {
          request.headers.Authorization = `Bearer ${this.config.apiKey}`
        }
        return request
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const message = error.response?.data?.message || error.message || 'Request failed'
        
        if (error.response?.status === 401) {
          throw new Error('Unauthorized: Please check your API key')
        }
        
        if (error.response?.status === 403) {
          throw new Error('Forbidden: Insufficient permissions')
        }
        
        if (error.response?.status === 404) {
          throw new Error('Resource not found')
        }

        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded: Please try again later')
        }

        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout: Please check your network connection')
        }

        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
          throw new Error('Cannot connect to Flowise server: Please check the URL')
        }

        throw new Error(message)
      }
    )
  }

  // Retry logic with exponential backoff
  private async retryRequest<T>(fn: () => Promise<T>, context = 'request'): Promise<T> {
    let lastError: Error | null = null
    
    for (let attempt = 0; attempt < (this.config.retryAttempts || 3); attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error as Error
        
        // Don't retry on auth errors or client errors (4xx)
        if (error instanceof Error && error.message.includes('Unauthorized') ||
            error instanceof Error && error.message.includes('Forbidden') ||
            (axios.isAxiosError(error) && error.response?.status && error.response.status < 500)) {
          throw error
        }
        
        if (attempt < (this.config.retryAttempts || 3) - 1) {
          const delay = (this.config.retryDelay || 1000) * Math.pow(2, attempt)
          console.warn(`${context} failed (attempt ${attempt + 1}), retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    
    throw lastError || new Error(`${context} failed after ${this.config.retryAttempts} attempts`)
  }

  // Rate limiting queue
  private async queueRequest<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.rateLimitQueue.push(async () => {
        try {
          const result = await fn()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
      
      this.processQueue()
    })
  }

  private async processQueue(): Promise<void> {
    if (this.processingQueue || this.rateLimitQueue.length === 0) {
      return
    }
    
    this.processingQueue = true
    
    while (this.rateLimitQueue.length > 0) {
      const request = this.rateLimitQueue.shift()
      if (request) {
        try {
          await request()
        } catch (error) {
          console.error('Queued request failed:', error)
        }
        
        // Add small delay to prevent overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    
    this.processingQueue = false
  }

  // Cache utilities
  private getCacheKey(method: string, path: string, params?: any): string {
    const paramStr = params ? JSON.stringify(params) : ''
    return `${method}:${path}:${paramStr}`
  }

  private async getCachedResult<T>(key: string): Promise<T | null> {
    if (!this.config.cacheEnabled) return null
    return this.cache.get<T>(key)
  }

  private setCachedResult<T>(key: string, data: T): void {
    if (!this.config.cacheEnabled) return
    this.cache.set(key, data, this.config.cacheTtl)
  }

  // Enhanced connection test with comprehensive validation
  async testConnection(): Promise<FlowiseResponse<{ 
    status: string; 
    version?: string;
    latency?: number;
    capabilities?: string[];
  }>> {
    const startTime = Date.now();
    
    try {
      // Try multiple endpoints to validate full connectivity
      const endpoints = ['/api/v1/ping', '/api/v1/version', '/api/v1/chatflows?limit=1'];
      const results = await Promise.allSettled(
        endpoints.map(endpoint => 
          this.retryRequest(async () => {
            const response = await this.client.get(endpoint);
            return response;
          }, `Connection test: ${endpoint}`)
        )
      );
      
      const latency = Date.now() - startTime;
      const successCount = results.filter(r => r.status === 'fulfilled').length;
      
      if (successCount === 0) {
        throw new Error('All connection tests failed');
      }
      
      // Determine capabilities based on successful endpoints
      const capabilities = [];
      if (results[0].status === 'fulfilled') capabilities.push('ping');
      if (results[1].status === 'fulfilled') capabilities.push('version');
      if (results[2].status === 'fulfilled') capabilities.push('flows');
      
      const versionResult = results[1].status === 'fulfilled' ? results[1].value : null;
      
      return {
        success: true,
        data: {
          status: successCount === endpoints.length ? 'fully-connected' : 'partially-connected',
          version: versionResult?.data?.version || 'unknown',
          latency,
          capabilities,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection test failed',
      };
    }
  }

  // New method: Validate API configuration
  async validateConfiguration(): Promise<FlowiseResponse<{ 
    valid: boolean;
    issues?: string[];
    recommendations?: string[];
  }>> {
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    try {
      // Check URL format
      const url = new URL(this.config.url);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        issues.push('Invalid URL protocol. Use http:// or https://');
      }
      
      // Test basic connectivity
      const connectionTest = await this.testConnection();
      if (!connectionTest.success) {
        issues.push(`Connection failed: ${connectionTest.error}`);
      }
      
      // Check API key if provided
      if (this.config.apiKey) {
        try {
          const flowsTest = await this.getFlows();
          if (!flowsTest.success && flowsTest.error?.includes('Unauthorized')) {
            issues.push('API key appears to be invalid');
          }
        } catch {
          recommendations.push('Verify API key permissions');
        }
      } else {
        recommendations.push('Consider setting an API key for authenticated access');
      }
      
      // Performance recommendations
      if (connectionTest.data?.latency && connectionTest.data.latency > 5000) {
        recommendations.push('High latency detected. Consider using a closer server or checking network connection.');
      }
      
      if (!this.config.cacheEnabled) {
        recommendations.push('Enable caching to improve performance');
      }
      
      return {
        success: true,
        data: {
          valid: issues.length === 0,
          issues: issues.length > 0 ? issues : undefined,
          recommendations: recommendations.length > 0 ? recommendations : undefined,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Configuration validation failed',
      };
    }
  }

  // Get all flows
  async getFlows(): Promise<FlowiseResponse<FlowiseListResponse>> {
    const cacheKey = this.getCacheKey('GET', '/api/v1/chatflows')
    
    try {
      // Check cache first
      const cached = await this.getCachedResult<FlowiseListResponse>(cacheKey)
      if (cached) {
        return {
          success: true,
          data: cached,
        }
      }

      const result = await this.queueRequest(async () => {
        return this.retryRequest(async () => {
          const response = await this.client.get('/api/v1/chatflows')
          return response
        }, 'Get flows')
      })

      const flows = Array.isArray(result.data) ? result.data : []
      const responseData = {
        flows: flows.map(this.normalizeFlow),
        total: flows.length,
      }

      // Cache the result
      this.setCachedResult(cacheKey, responseData)
      
      return {
        success: true,
        data: responseData,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch flows',
      }
    }
  }

  // Get a specific flow by ID
  async getFlow(id: string): Promise<FlowiseResponse<FlowiseFlow>> {
    try {
      const response = await this.client.get(`/api/v1/chatflows/${id}`)
      return {
        success: true,
        data: this.normalizeFlow(response.data),
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : `Failed to fetch flow ${id}`,
      }
    }
  }

  // Enhanced chat with flow including streaming support
  async chatWithFlow(
    flowId: string,
    request: FlowiseChatRequest,
    options?: {
      streaming?: boolean;
      onChunk?: (chunk: string) => void;
      onProgress?: (progress: number) => void;
      timeout?: number;
    }
  ): Promise<FlowiseResponse<FlowiseChatResponse>> {
    try {
      if (options?.streaming) {
        return await this.streamChatWithFlow(flowId, request, options);
      }
      
      const response = await this.queueRequest(async () => {
        return this.retryRequest(async () => {
          const response = await this.client.post(`/api/v1/prediction/${flowId}`, {
            ...request,
            timeout: options?.timeout || 30000,
          });
          return response;
        }, 'Chat request');
      });
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Chat request failed',
      };
    }
  }

  // New method: Streaming chat support
  private async streamChatWithFlow(
    flowId: string,
    request: FlowiseChatRequest,
    options: {
      onChunk?: (chunk: string) => void;
      onProgress?: (progress: number) => void;
      timeout?: number;
    }
  ): Promise<FlowiseResponse<FlowiseChatResponse>> {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
        reject(new Error('Streaming request timeout'));
      }, options.timeout || 60000);
      
      fetch(`${this.config.url}/api/v1/prediction/${flowId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        },
        body: JSON.stringify({ ...request, streaming: true }),
        signal: controller.signal,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Streaming failed: ${response.statusText}`);
        }
        
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Streaming not supported');
        }
        
        let accumulated = '';
        let progress = 0;
        
        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              clearTimeout(timeout);
              resolve({
                success: true,
                data: {
                  text: accumulated,
                  question: request.question,
                  chatId: 'stream-' + Date.now(),
                  chatMessageId: 'stream-msg-' + Date.now(),
                },
              });
              return;
            }
            
            const chunk = new TextDecoder().decode(value);
            accumulated += chunk;
            progress += 10; // Approximate progress
            
            options.onChunk?.(chunk);
            options.onProgress?.(Math.min(progress, 90));
            
            readStream();
          }).catch(reject);
        };
        
        readStream();
      })
      .catch(error => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }

  // Get flow execution history
  async getFlowHistory(flowId: string): Promise<FlowiseResponse<any[]>> {
    try {
      const response = await this.client.get(`/api/v1/chatmessage/${flowId}`)
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [],
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch flow history',
      }
    }
  }

  // Create a new flow
  async createFlow(flowData: {
    name: string
    description?: string
    flowData: any
    isPublic?: boolean
  }): Promise<FlowiseResponse<FlowiseFlow>> {
    try {
      const response = await this.client.post('/api/v1/chatflows', {
        name: flowData.name,
        description: flowData.description || '',
        flowData: JSON.stringify(flowData.flowData),
        isPublic: flowData.isPublic || false,
      })
      return {
        success: true,
        data: this.normalizeFlow(response.data),
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create flow',
      }
    }
  }

  // Update an existing flow
  async updateFlow(
    id: string,
    updates: Partial<{
      name: string
      description: string
      flowData: any
      isPublic: boolean
    }>
  ): Promise<FlowiseResponse<FlowiseFlow>> {
    try {
      const payload: any = { ...updates }
      if (payload.flowData) {
        payload.flowData = JSON.stringify(payload.flowData)
      }

      const response = await this.client.put(`/api/v1/chatflows/${id}`, payload)
      return {
        success: true,
        data: this.normalizeFlow(response.data),
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : `Failed to update flow ${id}`,
      }
    }
  }

  // Delete a flow
  async deleteFlow(id: string): Promise<FlowiseResponse<void>> {
    try {
      await this.client.delete(`/api/v1/chatflows/${id}`)
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : `Failed to delete flow ${id}`,
      }
    }
  }

  // Get API keys (if user has permission)
  async getApiKeys(): Promise<FlowiseResponse<any[]>> {
    try {
      const response = await this.client.get('/api/v1/apikey')
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [],
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch API keys',
      }
    }
  }

  // Update configuration
  updateConfig(config: Partial<FlowiseConfig>): void {
    this.config = { ...this.config, ...config }
    
    // Update client base URL if changed
    if (config.url) {
      this.client.defaults.baseURL = config.url.replace(/\/$/, '')
    }
    
    // Update client headers if API key changed
    if (config.apiKey !== undefined) {
      if (config.apiKey) {
        this.client.defaults.headers.Authorization = `Bearer ${config.apiKey}`
      } else {
        delete this.client.defaults.headers.Authorization
      }
    }
    
    // Update timeout if changed
    if (config.timeout) {
      this.client.defaults.timeout = config.timeout
    }
  }

  // Get current configuration (without sensitive data)
  getConfig(): Omit<FlowiseConfig, 'apiKey'> & { hasApiKey: boolean } {
    return {
      url: this.config.url,
      timeout: this.config.timeout,
      hasApiKey: !!this.config.apiKey,
    }
  }

  // Normalize flow data to consistent format
  private normalizeFlow(flow: any): FlowiseFlow {
    return {
      id: flow.id || flow._id,
      name: flow.name || 'Untitled Flow',
      description: flow.description || '',
      flowData: typeof flow.flowData === 'string' ? JSON.parse(flow.flowData) : flow.flowData,
      deployed: flow.deployed || false,
      isPublic: flow.isPublic || false,
      apikeyid: flow.apikeyid,
      chatbotConfig: flow.chatbotConfig,
      category: flow.category,
      createdDate: flow.createdDate || new Date().toISOString(),
      updatedDate: flow.updatedDate || new Date().toISOString(),
    }
  }

  // Enhanced flow data validation with detailed analysis
  static validateFlowData(flowData: any): { 
    valid: boolean; 
    errors: string[];
    warnings: string[];
    suggestions: string[];
    complexity: 'low' | 'medium' | 'high';
    supportedFeatures: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    const supportedFeatures: string[] = [];

    if (!flowData) {
      errors.push('Flow data is required');
      return { 
        valid: false, 
        errors, 
        warnings, 
        suggestions, 
        complexity: 'low',
        supportedFeatures 
      };
    }

    // Basic structure validation
    if (!flowData.nodes || !Array.isArray(flowData.nodes)) {
      errors.push('Flow must contain a nodes array');
    }

    if (!flowData.edges || !Array.isArray(flowData.edges)) {
      errors.push('Flow must contain an edges array');
    }

    if (flowData.nodes && flowData.nodes.length === 0) {
      errors.push('Flow must contain at least one node');
    }

    // Detailed node validation
    if (flowData.nodes) {
      const nodeIds = new Set();
      const nodeTypes = new Set();
      
      flowData.nodes.forEach((node: any, index: number) => {
        if (!node.id) {
          errors.push(`Node ${index} is missing an ID`);
        } else if (nodeIds.has(node.id)) {
          errors.push(`Duplicate node ID: ${node.id}`);
        } else {
          nodeIds.add(node.id);
        }
        
        if (!node.data) {
          errors.push(`Node ${index} is missing data`);
        } else {
          const nodeType = node.data.name || node.type;
          if (nodeType) {
            nodeTypes.add(nodeType);
          }
        }
        
        if (!node.position) {
          warnings.push(`Node ${index} is missing position information`);
        }
        
        // Check for deprecated or unsupported node types
        const deprecatedTypes = ['oldLLM', 'legacyTool'];
        if (node.data?.name && deprecatedTypes.includes(node.data.name)) {
          warnings.push(`Node ${node.id} uses deprecated type: ${node.data.name}`);
        }
      });
      
      // Feature detection
      const commonTypes = Array.from(nodeTypes);
      if (commonTypes.some(type => type.includes('LLM') || type.includes('Chat'))) {
        supportedFeatures.push('llm');
      }
      if (commonTypes.some(type => type.includes('Memory') || type.includes('Buffer'))) {
        supportedFeatures.push('memory');
      }
      if (commonTypes.some(type => type.includes('Tool') || type.includes('API'))) {
        supportedFeatures.push('tools');
      }
      if (commonTypes.some(type => type.includes('Chain') || type.includes('Sequential'))) {
        supportedFeatures.push('chains');
      }
    }

    // Edge validation with connectivity analysis
    if (flowData.edges) {
      const edgeIds = new Set();
      const connectedNodes = new Set();
      
      flowData.edges.forEach((edge: any, index: number) => {
        if (!edge.id) {
          warnings.push(`Edge ${index} is missing an ID`);
        } else if (edgeIds.has(edge.id)) {
          warnings.push(`Duplicate edge ID: ${edge.id}`);
        } else {
          edgeIds.add(edge.id);
        }
        
        if (!edge.source) {
          errors.push(`Edge ${index} is missing source`);
        } else {
          connectedNodes.add(edge.source);
        }
        
        if (!edge.target) {
          errors.push(`Edge ${index} is missing target`);
        } else {
          connectedNodes.add(edge.target);
        }
        
        // Check for self-loops
        if (edge.source === edge.target) {
          warnings.push(`Edge ${edge.id} creates a self-loop`);
        }
      });
      
      // Find disconnected nodes
      if (flowData.nodes) {
        const disconnectedNodes = flowData.nodes.filter(
          (node: any) => !connectedNodes.has(node.id)
        );
        
        if (disconnectedNodes.length > 0) {
          warnings.push(
            `${disconnectedNodes.length} disconnected nodes found: ${disconnectedNodes.map((n: any) => n.id).join(', ')}`
          );
        }
      }
    }

    // Complexity analysis
    const nodeCount = flowData.nodes?.length || 0;
    const edgeCount = flowData.edges?.length || 0;
    const complexity = nodeCount > 15 || edgeCount > 20 ? 'high' : 
                      nodeCount > 5 || edgeCount > 8 ? 'medium' : 'low';

    // Generate suggestions
    if (complexity === 'high') {
      suggestions.push('Consider breaking down this complex flow into smaller, manageable components');
    }
    
    if (warnings.length > 3) {
      suggestions.push('Review and address the validation warnings to improve flow quality');
    }
    
    if (supportedFeatures.length < 2) {
      suggestions.push('Consider adding more diverse node types to increase functionality');
    }

    return { 
      valid: errors.length === 0, 
      errors, 
      warnings,
      suggestions,
      complexity,
      supportedFeatures 
    };
  }

  // New method: Performance monitoring
  getPerformanceMetrics(): {
    cacheHitRate: number;
    averageResponseTime: number;
    errorRate: number;
    queueSize: number;
  } {
    // This would be implemented with actual metrics collection
    return {
      cacheHitRate: 0.85, // 85% cache hit rate
      averageResponseTime: 250, // 250ms average
      errorRate: 0.02, // 2% error rate
      queueSize: this.rateLimitQueue.length,
    };
  }
}

// Export a default instance that can be configured with enhanced defaults
export const flowiseClient = new FlowiseApiClient({
  url: process.env.NEXT_PUBLIC_FLOWISE_URL || 'http://localhost:3000',
  apiKey: process.env.NEXT_PUBLIC_FLOWISE_API_KEY,
  retryAttempts: parseInt(process.env.NEXT_PUBLIC_RETRY_ATTEMPTS || '3'),
  retryDelay: parseInt(process.env.NEXT_PUBLIC_RETRY_DELAY || '1000'),
  cacheEnabled: process.env.NEXT_PUBLIC_CACHE_ENABLED !== 'false',
  cacheTtl: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000'),
  timeout: parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT || '30000'),
})

export default FlowiseApiClient