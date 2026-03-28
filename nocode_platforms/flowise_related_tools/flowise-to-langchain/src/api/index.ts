/**
 * API Server for Flowise-to-LangChain Converter
 *
 * This module provides a REST API and WebSocket interface for the CLI converter,
 * enabling web applications to interact with the conversion pipeline.
 */

import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import multer from 'multer';
import { resolve, join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';
import { ConversionService } from './services/conversion.js';
import { ValidationService } from './services/validation.js';
import { TestService } from './services/test.js';
import { UploadService } from './services/upload.js';
import { WebSocketService } from './services/websocket.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middleware/error.js';
import { logger } from './middleware/logger.js';
import { rateLimit } from './middleware/rateLimit.js';
import { ApiConfig } from './types/api.js';

/**
 * Default API configuration
 */
const DEFAULT_CONFIG: ApiConfig = {
  port: 3001,
  host: '0.0.0.0',
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ['application/json', 'text/plain'],
    tempDir: join(tmpdir(), 'flowise-api-uploads'),
  },
  websocket: {
    heartbeatInterval: 30000,
    maxConnections: 100,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
};

/**
 * API Server class that orchestrates the entire API infrastructure
 */
export class ApiServer {
  private app: express.Application;
  private server: any;
  private wss: WebSocketServer;
  private config: ApiConfig;
  private conversionService: ConversionService;
  private validationService: ValidationService;
  private testService: TestService;
  private uploadService: UploadService;
  private websocketService: WebSocketService;
  private upload: multer.Multer;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.app = express();
    this.server = createServer(this.app);
    this.wss = new WebSocketServer({ server: this.server });

    // Initialize services
    this.conversionService = new ConversionService();
    this.validationService = new ValidationService();
    this.testService = new TestService();
    this.uploadService = new UploadService(this.config.upload);
    this.websocketService = new WebSocketService(
      this.wss,
      this.config.websocket
    );

    // Setup multer for file uploads
    this.upload = multer({
      storage: multer.diskStorage({
        destination: this.config.upload.tempDir,
        filename: (req, file, cb) => {
          const uniqueName = `${randomUUID()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
      limits: {
        fileSize: this.config.upload.maxFileSize,
      },
      fileFilter: (req, file, cb) => {
        if (this.config.upload.allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(`Unsupported file type: ${file.mimetype}`));
        }
      },
    });

    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
    this.setupErrorHandling();
  }

  /**
   * Setup Express middleware
   */
  private setupMiddleware(): void {
    // Basic middleware
    this.app.use(cors(this.config.cors));
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    // Custom middleware
    this.app.use(logger);
    this.app.use(rateLimit(this.config.rateLimit));

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || '1.0.0',
      });
    });
  }

  /**
   * Setup API routes
   */
  private setupRoutes(): void {
    // Make services available to routes
    this.app.locals.services = {
      conversion: this.conversionService,
      validation: this.validationService,
      test: this.testService,
      upload: this.uploadService,
      websocket: this.websocketService,
    };

    // Make upload middleware available
    this.app.locals.upload = this.upload;

    // Mount API routes
    this.app.use('/api', apiRouter);

    // Serve static files for documentation
    this.app.use('/docs', express.static(resolve(process.cwd(), 'docs')));
  }

  /**
   * Setup WebSocket server
   */
  private setupWebSocket(): void {
    this.websocketService.initialize();

    // WebSocket endpoint for real-time updates
    this.wss.on('connection', (ws, req) => {
      this.websocketService.handleConnection(ws, req);
    });
  }

  /**
   * Setup error handling
   */
  private setupErrorHandling(): void {
    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString(),
      });
    });

    // Global error handler
    this.app.use(errorHandler);
  }

  /**
   * Start the API server
   */
  public async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.listen(this.config.port, this.config.host, () => {
        console.log(
          `🚀 API Server running on http://${this.config.host}:${this.config.port}`
        );
        console.log(`📡 WebSocket server ready for connections`);
        console.log(`📁 Upload directory: ${this.config.upload.tempDir}`);
        console.log(
          `🔗 API Documentation: http://${this.config.host}:${this.config.port}/docs`
        );
        resolve();
      });

      this.server.on('error', (error: Error) => {
        console.error('❌ Server startup error:', error);
        reject(error);
      });
    });
  }

  /**
   * Stop the API server
   */
  public async stop(): Promise<void> {
    return new Promise((resolve) => {
      this.wss.close(() => {
        this.server.close(() => {
          console.log('✅ API Server stopped');
          resolve();
        });
      });
    });
  }

  /**
   * Get server instance (for testing)
   */
  public getApp(): express.Application {
    return this.app;
  }

  /**
   * Get WebSocket server instance
   */
  public getWebSocketServer(): WebSocketServer {
    return this.wss;
  }
}

/**
 * Create and start API server
 */
export async function createApiServer(
  config?: Partial<ApiConfig>
): Promise<ApiServer> {
  const server = new ApiServer(config);
  await server.start();
  return server;
}

// Export types and services for external use
export * from './types/api.js';
export * from './services/index.js';
export * from './routes/index.js';
export * from './middleware/index.js';
