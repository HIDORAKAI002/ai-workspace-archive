/**
 * Mock Server Utility for API Testing
 * 
 * Provides a configurable mock server that simulates Flowise API behavior
 * for comprehensive testing scenarios including error conditions and performance testing.
 */

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Server } from 'http';

export interface MockServerConfig {
  enableErrorSimulation?: boolean;
  enablePerformanceSimulation?: boolean;
  errorRates?: {
    network?: number;
    timeout?: number;
    serverError?: number;
    rateLimitError?: number;
  };
  responseDelays?: {
    fast?: number;
    medium?: number;
    slow?: number;
  };
  rateLimitConfig?: {
    windowMs?: number;
    maxRequests?: number;
  };
}

export class MockServer {
  private app: express.Application;
  private server: Server | null = null;
  private config: MockServerConfig;
  private requestCounts: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(config: MockServerConfig = {}) {
    this.config = {
      enableErrorSimulation: false,
      enablePerformanceSimulation: false,
      errorRates: {
        network: 0.05,
        timeout: 0.02,
        serverError: 0.03,
        rateLimitError: 0.01
      },
      responseDelays: {
        fast: 50,
        medium: 200,
        slow: 1000
      },
      rateLimitConfig: {
        windowMs: 60000, // 1 minute
        maxRequests: 100
      },
      ...config
    };

    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging middleware
    this.app.use((req, res, next) => {
      console.log(`[MockServer] ${req.method} ${req.path}`);
      next();
    });

    // Rate limiting middleware
    this.app.use(this.rateLimitMiddleware.bind(this));

    // Error simulation middleware
    if (this.config.enableErrorSimulation) {
      this.app.use(this.errorSimulationMiddleware.bind(this));
    }

    // Performance simulation middleware
    if (this.config.enablePerformanceSimulation) {
      this.app.use(this.performanceSimulationMiddleware.bind(this));
    }
  }

  private rateLimitMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const clientId = req.ip || 'default';
    const now = Date.now();
    const windowMs = this.config.rateLimitConfig?.windowMs || 60000;
    const maxRequests = this.config.rateLimitConfig?.maxRequests || 100;

    let clientData = this.requestCounts.get(clientId);
    
    if (!clientData || now > clientData.resetTime) {
      clientData = {
        count: 0,
        resetTime: now + windowMs
      };
      this.requestCounts.set(clientId, clientData);
    }

    clientData.count++;

    // Add rate limit headers
    res.set({
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': Math.max(0, maxRequests - clientData.count).toString(),
      'X-RateLimit-Reset': new Date(clientData.resetTime).toISOString()
    });

    if (clientData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message: `Too many requests. Limit: ${maxRequests} per ${windowMs}ms`
      });
    }

    next();
  }

  private errorSimulationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const random = Math.random();
    const errorRates = this.config.errorRates!;

    // Check for specific error triggers in the URL
    if (req.path.includes('trigger-server-error')) {
      return res.status(500).json({
        success: false,
        error: 'Simulated server error',
        message: 'This is a test server error'
      });
    }

    if (req.path.includes('trigger-gateway-error')) {
      return res.status(502).json({
        success: false,
        error: 'Bad Gateway',
        message: 'Upstream server error'
      });
    }

    if (req.path.includes('trigger-service-unavailable')) {
      return res.status(503).json({
        success: false,
        error: 'Service Unavailable',
        message: 'Service temporarily unavailable'
      });
    }

    if (req.path.includes('malformed-json-response')) {
      res.set('Content-Type', 'application/json');
      return res.send('{ invalid json response }');
    }

    if (req.path.includes('binary-response')) {
      res.set('Content-Type', 'application/octet-stream');
      return res.send(Buffer.from([0x89, 0x50, 0x4E, 0x47])); // PNG header
    }

    // Simulate random network errors
    if (random < errorRates.network!) {
      // Simulate connection reset
      req.socket.destroy();
      return;
    }

    // Simulate timeout errors
    if (random < errorRates.network! + errorRates.timeout!) {
      // Don't respond (timeout)
      return;
    }

    // Simulate server errors
    if (random < errorRates.network! + errorRates.timeout! + errorRates.serverError!) {
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Simulated random server error'
      });
    }

    next();
  }

  private performanceSimulationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    let delay = 0;
    const delays = this.config.responseDelays!;

    // Determine delay based on path
    if (req.path.includes('slow-response') || req.path.includes('large-response')) {
      delay = delays.slow!;
    } else if (req.path.includes('variable-response-time')) {
      delay = Math.random() * delays.slow!;
    } else if (req.path.includes('/api/')) {
      delay = delays.medium!;
    } else {
      delay = delays.fast!;
    }

    // Add jitter (±25%)
    const jitter = delay * 0.25 * (Math.random() - 0.5);
    const actualDelay = Math.max(0, delay + jitter);

    setTimeout(() => {
      next();
    }, actualDelay);
  }

  private setupRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0-mock'
      });
    });

    // Flowise API compatibility endpoints
    this.app.get('/api/v1/ping', (req, res) => {
      res.json({
        status: 'ok',
        version: '1.0.0-mock'
      });
    });

    // Flow listing endpoint
    this.app.get('/api/v1/chatflows', (req, res) => {
      const mockFlows = [
        {
          id: 'test-flow-123',
          name: 'Test Chat Flow',
          description: 'A test flow for API testing',
          flowData: JSON.stringify({
            nodes: [
              {
                id: 'llm_1',
                data: {
                  name: 'ChatOpenAI',
                  inputs: { modelName: 'gpt-3.5-turbo' }
                }
              }
            ],
            edges: []
          }),
          deployed: true,
          isPublic: false,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString()
        },
        {
          id: 'test-flow-456',
          name: 'Another Test Flow',
          description: 'Another test flow',
          flowData: JSON.stringify({
            nodes: [
              {
                id: 'prompt_1',
                data: {
                  name: 'PromptTemplate',
                  inputs: { template: 'Test template' }
                }
              }
            ],
            edges: []
          }),
          deployed: false,
          isPublic: true,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString()
        }
      ];

      res.json(mockFlows);
    });

    // Individual flow endpoint
    this.app.get('/api/v1/chatflows/:id', (req, res) => {
      const { id } = req.params;

      if (id === 'non-existent-flow' || id.includes('non-existent')) {
        return res.status(404).json({
          success: false,
          error: 'Flow not found',
          message: `Flow with ID ${id} not found`
        });
      }

      if (id.includes('large-response')) {
        // Generate a large response
        const largeData = {
          id,
          name: 'Large Response Flow',
          description: 'A' + 'a'.repeat(100000), // Large description
          flowData: JSON.stringify({
            nodes: Array.from({ length: 1000 }, (_, i) => ({
              id: `node_${i}`,
              data: { name: 'TestNode', description: 'x'.repeat(1000) }
            })),
            edges: []
          }),
          deployed: true,
          isPublic: false,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString()
        };

        return res.json(largeData);
      }

      // Standard mock flow
      res.json({
        id,
        name: `Test Flow ${id}`,
        description: 'A test flow',
        flowData: JSON.stringify({
          nodes: [
            {
              id: 'test_node',
              data: {
                name: 'TestNode',
                inputs: { param: 'value' }
              }
            }
          ],
          edges: []
        }),
        deployed: true,
        isPublic: false,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
      });
    });

    // Flow creation endpoint
    this.app.post('/api/v1/chatflows', (req, res) => {
      const { name, description, flowData, isPublic } = req.body;

      // Validate required fields
      if (!name || !flowData) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: 'Name and flowData are required'
        });
      }

      // Check for malformed flowData
      try {
        const parsed = typeof flowData === 'string' ? JSON.parse(flowData) : flowData;
        if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
          return res.status(400).json({
            success: false,
            error: 'Invalid flow data',
            message: 'flowData must contain a nodes array'
          });
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON',
          message: 'flowData must be valid JSON'
        });
      }

      const newFlow = {
        id: `flow_${Date.now()}`,
        name,
        description: description || '',
        flowData: typeof flowData === 'string' ? flowData : JSON.stringify(flowData),
        deployed: false,
        isPublic: isPublic || false,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
      };

      res.status(201).json(newFlow);
    });

    // Flow update endpoint
    this.app.put('/api/v1/chatflows/:id', (req, res) => {
      const { id } = req.params;
      const updates = req.body;

      res.json({
        id,
        ...updates,
        updatedDate: new Date().toISOString()
      });
    });

    // Flow deletion endpoint
    this.app.delete('/api/v1/chatflows/:id', (req, res) => {
      const { id } = req.params;

      if (id.includes('protected')) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden',
          message: 'Cannot delete protected flow'
        });
      }

      res.json({
        success: true,
        message: `Flow ${id} deleted successfully`
      });
    });

    // Chat prediction endpoint
    this.app.post('/api/v1/prediction/:flowId', (req, res) => {
      const { flowId } = req.params;
      const { question, history, chatId } = req.body;

      if (flowId === 'invalid-flow') {
        return res.status(404).json({
          success: false,
          error: 'Flow not found',
          message: 'Invalid flow ID'
        });
      }

      res.json({
        text: `Mock response to: ${question}`,
        question,
        chatId: chatId || `chat_${Date.now()}`,
        chatMessageId: `msg_${Date.now()}`,
        sessionId: `session_${Date.now()}`,
        memoryType: 'buffer',
        uploads: [],
        followUpPrompts: ['Tell me more', 'Can you explain further?']
      });
    });

    // Chat history endpoint
    this.app.get('/api/v1/chatmessage/:flowId', (req, res) => {
      const { flowId } = req.params;

      res.json([
        {
          id: 'msg_1',
          message: 'Hello',
          type: 'userMessage',
          timestamp: new Date().toISOString(),
          chatId: 'chat_1',
          flowId
        },
        {
          id: 'msg_2',
          message: 'Hi there! How can I help you?',
          type: 'apiMessage',
          timestamp: new Date().toISOString(),
          chatId: 'chat_1',
          flowId
        }
      ]);
    });

    // API keys endpoint
    this.app.get('/api/v1/apikey', (req, res) => {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || authHeader === 'Bearer invalid-api-key-12345') {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Invalid API key'
        });
      }

      res.json([
        {
          id: 'key_1',
          keyName: 'Test Key',
          created: new Date().toISOString()
        }
      ]);
    });

    // File upload endpoint
    const upload = multer({ 
      limits: { 
        fileSize: 5 * 1024 * 1024 // 5MB
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/json') {
          cb(null, true);
        } else {
          cb(new Error('Only JSON files are allowed'));
        }
      }
    });

    this.app.post('/api/upload', upload.single('file'), (req, res) => {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded',
          message: 'Please provide a file'
        });
      }

      res.json({
        success: true,
        id: `upload_${Date.now()}`,
        filename: req.file.originalname,
        size: req.file.size,
        status: 'success'
      });
    });

    // Error handling middleware
    this.app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (error.message.includes('File too large')) {
        return res.status(413).json({
          success: false,
          error: 'Payload Too Large',
          message: 'File exceeds maximum size limit'
        });
      }

      if (error.message.includes('Only JSON files')) {
        return res.status(400).json({
          success: false,
          error: 'Invalid file type',
          message: 'Only JSON files are allowed'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: error.message
      });
    });

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Endpoint ${req.method} ${req.path} not found`
      });
    });
  }

  public async start(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(port, () => {
        console.log(`[MockServer] Running on port ${port}`);
        resolve();
      });

      this.server.on('error', (error) => {
        reject(error);
      });
    });
  }

  public async close(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          console.log('[MockServer] Stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

// Factory function for creating mock servers
export async function createMockServer(port: number, config?: MockServerConfig): Promise<MockServer> {
  const server = new MockServer(config);
  await server.start(port);
  return server;
}