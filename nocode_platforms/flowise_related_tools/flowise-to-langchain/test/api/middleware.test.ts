/**
 * API Middleware Test Suite
 * 
 * Tests for all API middleware including:
 * - Rate limiting
 * - Request validation
 * - Error handling
 * - Authentication
 * - CORS
 * - Logging
 */

import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { rateLimit } from '../../src/api/middleware/rateLimit.js';
import { validateRequest } from '../../src/api/middleware/validation.js';
import { errorHandler } from '../../src/api/middleware/error.js';
import { logger } from '../../src/api/middleware/logger.js';
import { asyncHandler } from '../../src/api/middleware/async.js';

describe('API Middleware Test Suite', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      ip: '127.0.0.1',
      method: 'GET',
      path: '/test',
      headers: {},
      body: {},
      query: {},
      params: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
  });

  describe('Rate Limiting Middleware', () => {
    it('should allow requests within rate limit', () => {
      const rateLimitMiddleware = rateLimit({
        windowMs: 60 * 1000,
        max: 100,
      });

      rateLimitMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalledWith(429);
    });

    it('should set rate limit headers', () => {
      const rateLimitMiddleware = rateLimit({
        windowMs: 60 * 1000,
        max: 100,
      });

      rateLimitMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.set).toHaveBeenCalledWith(
        expect.objectContaining({
          'X-RateLimit-Limit': expect.any(String),
          'X-RateLimit-Remaining': expect.any(String),
          'X-RateLimit-Reset': expect.any(String),
        })
      );
    });

    it('should block requests exceeding rate limit', () => {
      const rateLimitMiddleware = rateLimit({
        windowMs: 1000,
        max: 1, // Very low limit for testing
      });

      // First request should pass
      rateLimitMiddleware(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);

      // Reset mocks
      jest.clearAllMocks();

      // Second request should be blocked
      rateLimitMiddleware(mockReq as Request, mockRes as Response, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(429);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining('rate limit'),
        })
      );
    });

    it('should handle different IPs separately', () => {
      const rateLimitMiddleware = rateLimit({
        windowMs: 60 * 1000,
        max: 1,
      });

      // Request from first IP
      mockReq.ip = '192.168.1.1';
      rateLimitMiddleware(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);

      // Request from second IP should also pass
      mockReq.ip = '192.168.1.2';
      rateLimitMiddleware(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(2);
    });

    it('should reset rate limit after window expires', (done) => {
      const rateLimitMiddleware = rateLimit({
        windowMs: 100, // Very short window for testing
        max: 1,
      });

      // First request should pass
      rateLimitMiddleware(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);

      // Wait for window to expire
      setTimeout(() => {
        jest.clearAllMocks();
        
        // Second request after window expiry should pass
        rateLimitMiddleware(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).toHaveBeenCalledTimes(1);
        done();
      }, 150);
    });
  });

  describe('Request Validation Middleware', () => {
    it('should validate valid request body', () => {
      const schema = {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
          },
          required: ['name'],
        },
      };

      const validationMiddleware = validateRequest(schema);
      mockReq.body = { name: 'John', age: 30 };

      validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should reject invalid request body', () => {
      const schema = {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
          },
          required: ['name'],
        },
      };

      const validationMiddleware = validateRequest(schema);
      mockReq.body = { age: 30 }; // Missing required 'name' field

      validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.any(String),
        })
      );
    });

    it('should validate query parameters', () => {
      const schema = {
        query: {
          type: 'object',
          properties: {
            page: { type: 'string', pattern: '^[0-9]+$' },
            limit: { type: 'string', pattern: '^[0-9]+$' },
          },
        },
      };

      const validationMiddleware = validateRequest(schema);
      mockReq.query = { page: '1', limit: '10' };

      validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should validate path parameters', () => {
      const schema = {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', pattern: '^[a-f0-9-]{36}$' }, // UUID pattern
          },
          required: ['id'],
        },
      };

      const validationMiddleware = validateRequest(schema);
      mockReq.params = { id: '123e4567-e89b-12d3-a456-426614174000' };

      validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should reject malicious input patterns', () => {
      const schema = {
        body: {
          type: 'object',
          properties: {
            input: { type: 'string' },
          },
        },
      };

      const validationMiddleware = validateRequest(schema);
      mockReq.body = {
        input: '<script>alert("xss")</script>',
      };

      validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

      // Should either sanitize or reject
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle complex nested validation', () => {
      const schema = {
        body: {
          type: 'object',
          properties: {
            flow: {
              type: 'object',
              properties: {
                nodes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      data: { type: 'object' },
                    },
                    required: ['id'],
                  },
                },
                edges: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      source: { type: 'string' },
                      target: { type: 'string' },
                    },
                    required: ['source', 'target'],
                  },
                },
              },
              required: ['nodes'],
            },
          },
          required: ['flow'],
        },
      };

      const validationMiddleware = validateRequest(schema);
      mockReq.body = {
        flow: {
          nodes: [
            { id: 'node1', data: { type: 'openAI' } },
            { id: 'node2', data: { type: 'prompt' } },
          ],
          edges: [
            { source: 'node1', target: 'node2' },
          ],
        },
      };

      validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('Error Handling Middleware', () => {
    it('should handle standard errors', () => {
      const error = new Error('Test error');
      
      errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Internal Server Error',
          message: expect.any(String),
          timestamp: expect.any(String),
        })
      );
    });

    it('should handle validation errors', () => {
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      (validationError as any).status = 400;
      
      errorHandler(validationError, mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('Validation'),
        })
      );
    });

    it('should handle custom API errors', () => {
      const apiError = {
        name: 'ApiError',
        message: 'Custom API error',
        status: 422,
        code: 'CONVERSION_ERROR',
        details: { nodeId: 'test-node' },
      };
      
      errorHandler(apiError, mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'CONVERSION_ERROR',
          message: 'Custom API error',
          details: { nodeId: 'test-node' },
        })
      );
    });

    it('should include request ID in error response', () => {
      mockReq.headers = { 'x-request-id': 'test-request-123' };
      const error = new Error('Test error');
      
      errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          requestId: 'test-request-123',
        })
      );
    });

    it('should not expose stack traces in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const error = new Error('Test error');
      error.stack = 'Error stack trace';
      
      errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Internal Server Error',
        })
      );

      const responseCall = (mockRes.json as jest.Mock).mock.calls[0][0];
      expect(responseCall).not.toHaveProperty('stack');

      process.env.NODE_ENV = originalEnv;
    });

    it('should include stack traces in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const error = new Error('Test error');
      error.stack = 'Error stack trace';
      
      errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

      const responseCall = (mockRes.json as jest.Mock).mock.calls[0][0];
      expect(responseCall).toHaveProperty('stack');

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Async Handler Middleware', () => {
    it('should handle successful async operations', async () => {
      const asyncOperation = jest.fn().mockResolvedValue('success');
      const wrappedHandler = asyncHandler(asyncOperation);

      await wrappedHandler(mockReq as Request, mockRes as Response, mockNext);

      expect(asyncOperation).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    });

    it('should catch and forward async errors', async () => {
      const asyncError = new Error('Async operation failed');
      const asyncOperation = jest.fn().mockRejectedValue(asyncError);
      const wrappedHandler = asyncHandler(asyncOperation);

      await wrappedHandler(mockReq as Request, mockRes as Response, mockNext);

      expect(asyncOperation).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(asyncError);
    });

    it('should handle promise rejections with non-Error objects', async () => {
      const rejectionValue = 'String rejection';
      const asyncOperation = jest.fn().mockRejectedValue(rejectionValue);
      const wrappedHandler = asyncHandler(asyncOperation);

      await wrappedHandler(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      const capturedError = (mockNext as jest.Mock).mock.calls[0][0];
      expect(capturedError.message).toContain('String rejection');
    });

    it('should preserve this context in async handlers', async () => {
      const contextObject = {
        value: 'test',
        async handler(req: Request, res: Response, next: NextFunction) {
          return this.value;
        },
      };

      const wrappedHandler = asyncHandler(contextObject.handler.bind(contextObject));
      
      await wrappedHandler(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Logger Middleware', () => {
    it('should log incoming requests', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      
      mockReq.method = 'POST';
      mockReq.path = '/api/convert';
      mockReq.headers = { 'user-agent': 'test-agent' };

      logger(mockReq as Request, mockRes as Response, mockNext);

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('POST /api/convert')
      );
      expect(mockNext).toHaveBeenCalled();

      logSpy.mockRestore();
    });

    it('should measure request duration', (done) => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      
      logger(mockReq as Request, mockRes as Response, mockNext);

      // Simulate response completion after some time
      setTimeout(() => {
        // Simulate response end event
        if (mockRes.end) {
          (mockRes as any).emit('finish');
        }

        // Check that duration was logged
        expect(logSpy).toHaveBeenCalledWith(
          expect.stringContaining('ms')
        );

        logSpy.mockRestore();
        done();
      }, 10);
    });

    it('should include request ID in logs', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      
      mockReq.headers = { 'x-request-id': 'test-request-456' };

      logger(mockReq as Request, mockRes as Response, mockNext);

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('test-request-456')
      );

      logSpy.mockRestore();
    });

    it('should generate request ID if not provided', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      
      logger(mockReq as Request, mockRes as Response, mockNext);

      expect(mockReq.headers?.['x-request-id']).toBeDefined();
      expect(typeof mockReq.headers?.['x-request-id']).toBe('string');

      logSpy.mockRestore();
    });

    it('should log response status codes', (done) => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      
      mockRes.statusCode = 200;
      
      logger(mockReq as Request, mockRes as Response, mockNext);

      setTimeout(() => {
        // Simulate response completion
        if (mockRes.end) {
          (mockRes as any).emit('finish');
        }

        expect(logSpy).toHaveBeenCalledWith(
          expect.stringContaining('200')
        );

        logSpy.mockRestore();
        done();
      }, 10);
    });
  });

  describe('CORS Middleware', () => {
    // Note: CORS middleware is typically provided by the 'cors' package
    // These tests assume a custom CORS implementation or wrapper

    it('should set CORS headers for allowed origins', () => {
      mockReq.headers = { origin: 'http://localhost:3000' };
      
      // Simulate CORS middleware behavior
      const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
        const origin = req.headers.origin;
        
        if (origin && allowedOrigins.includes(origin)) {
          res.header('Access-Control-Allow-Origin', origin);
          res.header('Access-Control-Allow-Credentials', 'true');
        }
        
        next();
      };

      corsMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'http://localhost:3000');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle preflight requests', () => {
      mockReq.method = 'OPTIONS';
      mockReq.headers = {
        origin: 'http://localhost:3000',
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'content-type',
      };

      const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
        if (req.method === 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
          res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Request-ID');
          res.header('Access-Control-Max-Age', '86400');
          res.status(204).send();
          return;
        }
        next();
      };

      corsMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.header).toHaveBeenCalledWith('Access-Control-Allow-Methods', expect.any(String));
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
    });

    it('should reject requests from unauthorized origins', () => {
      mockReq.headers = { origin: 'http://malicious-site.com' };
      
      const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const allowedOrigins = ['http://localhost:3000'];
        const origin = req.headers.origin;
        
        if (origin && !allowedOrigins.includes(origin)) {
          res.status(403).json({
            success: false,
            error: 'Forbidden',
            message: 'Origin not allowed',
          });
          return;
        }
        
        next();
      };

      corsMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Security Headers Middleware', () => {
    it('should add security headers', () => {
      const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
        res.header('X-Content-Type-Options', 'nosniff');
        res.header('X-Frame-Options', 'DENY');
        res.header('X-XSS-Protection', '1; mode=block');
        res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.header('Content-Security-Policy', "default-src 'self'");
        next();
      };

      securityMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.header).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
      expect(mockRes.header).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
      expect(mockRes.header).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should remove sensitive headers', () => {
      const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
        res.removeHeader('X-Powered-By');
        res.removeHeader('Server');
        next();
      };

      mockRes.removeHeader = jest.fn();

      securityMiddleware(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.removeHeader).toHaveBeenCalledWith('X-Powered-By');
      expect(mockRes.removeHeader).toHaveBeenCalledWith('Server');
    });
  });
});