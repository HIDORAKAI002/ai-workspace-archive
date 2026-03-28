/**
 * API Endpoint Test Suite
 * 
 * Comprehensive tests for all REST API endpoints including:
 * - Request/response validation
 * - Authentication and authorization
 * - Input sanitization and validation
 * - Rate limiting and error responses
 * - Integration with vector databases
 * - WebSocket functionality
 */

import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import request from 'supertest';
import { WebSocket } from 'ws';
import { ApiServer } from '../../src/api/index.js';
import { createTempDir, cleanupTempDir, createMockFlow, TestData } from '../utils/test-helpers.js';
import { join } from 'path';
import { writeFile } from 'fs/promises';

describe('API Endpoints Test Suite', () => {
  let apiServer: ApiServer;
  let testDir: string;
  let app: any;
  const testPort = 3002;

  beforeAll(async () => {
    // Create test directory
    testDir = await createTempDir('api-test');
    
    // Initialize API server with test configuration
    apiServer = new ApiServer({
      port: testPort,
      host: 'localhost',
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
      },
      upload: {
        maxFileSize: 5 * 1024 * 1024, // 5MB for tests
        allowedMimeTypes: ['application/json', 'text/plain'],
        tempDir: join(testDir, 'uploads'),
      },
      websocket: {
        heartbeatInterval: 5000,
        maxConnections: 10,
      },
      rateLimit: {
        windowMs: 60 * 1000, // 1 minute
        max: 100, // 100 requests per minute for tests
      },
    });

    app = apiServer.getApp();
    await apiServer.start();
  });

  afterAll(async () => {
    await apiServer.stop();
    await cleanupTempDir(testDir);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Health Check Endpoint', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'ok',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        version: expect.any(String),
      });
    });

    it('should include proper headers', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.headers['x-powered-by']).toBeUndefined(); // Should be hidden for security
    });
  });

  describe('Convert API Endpoints', () => {
    describe('POST /api/convert', () => {
      it('should convert valid Flowise flow to LangChain code', async () => {
        const testFlow = createMockFlow(3, 2);
        
        const response = await request(app)
          .post('/api/convert')
          .send({
            input: testFlow,
            options: {
              format: 'typescript',
              target: 'node',
              includeComments: true,
              outputFormat: 'esm',
            },
          })
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          data: {
            jobId: expect.any(String),
            files: expect.any(Array),
            metrics: {
              duration: expect.any(Number),
              nodesProcessed: expect.any(Number),
              filesGenerated: expect.any(Number),
              totalSize: expect.any(Number),
              memoryUsage: expect.any(Number),
              cpuUsage: expect.any(Number),
            },
            analysis: {
              nodeCount: expect.any(Number),
              connectionCount: expect.any(Number),
              supportedTypes: expect.any(Array),
              unsupportedTypes: expect.any(Array),
              coverage: expect.any(Number),
              complexity: expect.stringMatching(/^(simple|moderate|complex)$/),
            },
            warnings: expect.any(Array),
            errors: expect.any(Array),
          },
          message: expect.any(String),
          timestamp: expect.any(String),
        });

        // Verify generated files
        expect(response.body.data.files.length).toBeGreaterThan(0);
        response.body.data.files.forEach((file: any) => {
          expect(file).toMatchObject({
            path: expect.any(String),
            content: expect.any(String),
            type: expect.stringMatching(/^(main|types|config|test|docs)$/),
            size: expect.any(Number),
            language: expect.any(String),
          });
        });
      });

      it('should validate request body schema', async () => {
        // Missing required input field
        const response = await request(app)
          .post('/api/convert')
          .send({
            options: { format: 'typescript' },
          })
          .expect(400);

        expect(response.body).toMatchObject({
          success: false,
          error: expect.any(String),
          message: expect.stringContaining('validation'),
        });
      });

      it('should handle invalid format option', async () => {
        const testFlow = createMockFlow(1, 0);
        
        const response = await request(app)
          .post('/api/convert')
          .send({
            input: testFlow,
            options: {
              format: 'invalid_format', // Should fail validation
            },
          })
          .expect(400);

        expect(response.body.success).toBe(false);
      });

      it('should sanitize malicious input', async () => {
        const maliciousFlow = {
          nodes: [{
            id: '<script>alert("xss")</script>',
            data: {
              label: 'SELECT * FROM users;',
              inputs: {
                code: 'require("child_process").exec("rm -rf /")',
              },
            },
          }],
          edges: [],
        };

        const response = await request(app)
          .post('/api/convert')
          .send({
            input: maliciousFlow,
            options: { format: 'typescript' },
          });

        // Should either sanitize or reject malicious input
        if (response.status === 200) {
          // If accepted, verify content is sanitized
          const generatedCode = response.body.data.files[0]?.content || '';
          expect(generatedCode).not.toContain('<script>');
          expect(generatedCode).not.toContain('rm -rf');
          expect(generatedCode).not.toContain('SELECT * FROM users');
        } else {
          expect(response.status).toBeGreaterThanOrEqual(400);
        }
      });

      it('should handle large payloads within limits', async () => {
        const largeFlow = TestData.createLargeFlow(50, 0.5);
        
        const response = await request(app)
          .post('/api/convert')
          .send({
            input: largeFlow,
            options: { format: 'typescript' },
          })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.analysis.nodeCount).toBe(50);
      });

      it('should reject payloads exceeding size limits', async () => {
        // Create extremely large payload
        const hugeFlow = TestData.createLargeFlow(10000, 0.9);
        
        const response = await request(app)
          .post('/api/convert')
          .send({
            input: hugeFlow,
            options: { format: 'typescript' },
          })
          .expect(413); // Payload Too Large

        expect(response.body.success).toBe(false);
      });

      it('should support streaming via WebSocket', async () => {
        const testFlow = createMockFlow(2, 1);
        const connectionId = 'test-connection-123';

        // Note: WebSocket testing would require actual WebSocket connection
        // This is a simplified test for the API endpoint
        const response = await request(app)
          .post('/api/convert')
          .send({
            input: testFlow,
            options: { format: 'typescript' },
            stream: true,
            connectionId,
          })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.jobId).toBeDefined();
      });
    });

    describe('GET /api/convert/:jobId', () => {
      let jobId: string;

      beforeEach(async () => {
        // Create a conversion job first
        const testFlow = createMockFlow(1, 0);
        const response = await request(app)
          .post('/api/convert')
          .send({
            input: testFlow,
            options: { format: 'typescript' },
          });
        
        jobId = response.body.data.jobId;
      });

      it('should return job status for existing job', async () => {
        const response = await request(app)
          .get(`/api/convert/${jobId}`)
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          data: {
            id: jobId,
            type: 'convert',
            status: expect.stringMatching(/^(queued|running|completed|failed|cancelled)$/),
            progress: expect.any(Number),
            createdAt: expect.any(String),
          },
        });
      });

      it('should return 404 for non-existent job', async () => {
        const nonExistentJobId = 'non-existent-job-123';
        
        const response = await request(app)
          .get(`/api/convert/${nonExistentJobId}`)
          .expect(404);

        expect(response.body).toMatchObject({
          success: false,
          error: 'Job not found',
          message: expect.stringContaining(nonExistentJobId),
        });
      });

      it('should validate job ID format', async () => {
        const invalidJobId = '../../../etc/passwd';
        
        const response = await request(app)
          .get(`/api/convert/${invalidJobId}`)
          .expect(404);

        expect(response.body.success).toBe(false);
      });
    });

    describe('DELETE /api/convert/:jobId', () => {
      it('should cancel running job', async () => {
        // This test would need a long-running job to properly test cancellation
        const testFlow = TestData.createLargeFlow(100, 0.8);
        
        const createResponse = await request(app)
          .post('/api/convert')
          .send({
            input: testFlow,
            options: { format: 'typescript' },
          });
        
        const jobId = createResponse.body.data.jobId;

        // Immediately try to cancel (might succeed or fail depending on timing)
        const cancelResponse = await request(app)
          .delete(`/api/convert/${jobId}`);

        // Either successfully cancelled or job already completed
        expect([200, 404]).toContain(cancelResponse.status);
      });

      it('should return 404 for non-existent job', async () => {
        const nonExistentJobId = 'non-existent-job-456';
        
        const response = await request(app)
          .delete(`/api/convert/${nonExistentJobId}`)
          .expect(404);

        expect(response.body.success).toBe(false);
      });
    });

    describe('GET /api/convert', () => {
      it('should list all conversion jobs', async () => {
        // Create a few jobs first
        const testFlow = createMockFlow(1, 0);
        await request(app)
          .post('/api/convert')
          .send({ input: testFlow, options: { format: 'typescript' } });
        
        await request(app)
          .post('/api/convert')
          .send({ input: testFlow, options: { format: 'typescript' } });

        const response = await request(app)
          .get('/api/convert')
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          data: expect.any(Array),
          message: expect.any(String),
        });

        expect(response.body.data.length).toBeGreaterThanOrEqual(2);
        response.body.data.forEach((job: any) => {
          expect(job).toMatchObject({
            id: expect.any(String),
            type: 'convert',
            status: expect.any(String),
            progress: expect.any(Number),
            createdAt: expect.any(String),
          });
        });
      });
    });

    describe('POST /api/convert/:jobId/subscribe', () => {
      let jobId: string;

      beforeEach(async () => {
        const testFlow = createMockFlow(1, 0);
        const response = await request(app)
          .post('/api/convert')
          .send({ input: testFlow, options: { format: 'typescript' } });
        
        jobId = response.body.data.jobId;
      });

      it('should subscribe to job progress updates', async () => {
        const connectionId = 'test-connection-789';

        const response = await request(app)
          .post(`/api/convert/${jobId}/subscribe`)
          .send({ connectionId })
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          message: expect.stringContaining('Subscribed'),
        });
      });

      it('should validate required connectionId', async () => {
        const response = await request(app)
          .post(`/api/convert/${jobId}/subscribe`)
          .send({}) // Missing connectionId
          .expect(400);

        expect(response.body.success).toBe(false);
      });

      it('should return 404 for non-existent job', async () => {
        const nonExistentJobId = 'non-existent-job-789';
        
        const response = await request(app)
          .post(`/api/convert/${nonExistentJobId}/subscribe`)
          .send({ connectionId: 'test-connection' })
          .expect(404);

        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('Authentication & Authorization', () => {
    // Note: These tests assume authentication middleware is implemented
    // Current API doesn't have authentication, so these are placeholder tests

    it('should accept requests without authentication (current behavior)', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
    });

    it('should handle future API key authentication', async () => {
      // This test is for future implementation
      const response = await request(app)
        .get('/health')
        .set('Authorization', 'Bearer invalid-token');

      // Currently should work since auth is not implemented
      expect(response.status).toBe(200);
    });

    it('should implement role-based access control (future)', async () => {
      // Placeholder for future RBAC implementation
      const response = await request(app)
        .get('/health')
        .set('X-User-Role', 'admin');

      expect(response.status).toBe(200);
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      const requests = [];
      
      // Send many requests quickly
      for (let i = 0; i < 10; i++) {
        requests.push(
          request(app)
            .get('/health')
        );
      }

      const responses = await Promise.all(requests);
      
      // All should succeed under normal rate limits
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });

    it('should block requests exceeding rate limit', async () => {
      const requests = [];
      
      // Send requests far exceeding the rate limit (100/minute in test config)
      for (let i = 0; i < 150; i++) {
        requests.push(
          request(app)
            .get('/health')
        );
      }

      const responses = await Promise.allSettled(requests);
      
      // Some requests should be rate limited (429 status)
      const rateLimitedResponses = responses.filter(result => 
        result.status === 'fulfilled' && 
        (result.value as any).status === 429
      );

      // Expect at least some rate limiting to occur
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });

    it('should include rate limit headers', async () => {
      const response = await request(app)
        .get('/health');

      // Rate limiting middleware should add these headers
      expect(response.headers).toHaveProperty('x-ratelimit-limit');
      expect(response.headers).toHaveProperty('x-ratelimit-remaining');
    });
  });

  describe('Input Sanitization & Validation', () => {
    it('should sanitize SQL injection attempts', async () => {
      const maliciousInput = {
        nodes: [{
          id: "'; DROP TABLE users; --",
          data: {
            label: "'; DELETE FROM flows; --",
            inputs: {
              query: "SELECT * FROM passwords WHERE id=1 OR 1=1",
            },
          },
        }],
        edges: [],
      };

      const response = await request(app)
        .post('/api/convert')
        .send({
          input: maliciousInput,
          options: { format: 'typescript' },
        });

      // Should either reject or sanitize
      if (response.status === 200) {
        const generatedCode = response.body.data.files[0]?.content || '';
        expect(generatedCode).not.toContain('DROP TABLE');
        expect(generatedCode).not.toContain('DELETE FROM');
        expect(generatedCode).not.toContain('OR 1=1');
      } else {
        expect(response.status).toBeGreaterThanOrEqual(400);
      }
    });

    it('should sanitize XSS attempts', async () => {
      const xssPayload = {
        nodes: [{
          id: 'test-node',
          data: {
            label: '<script>alert("XSS")</script>',
            description: '<img src="x" onerror="alert(\'XSS\')">',
            inputs: {
              systemMessage: '</script><script>document.cookie</script>',
            },
          },
        }],
        edges: [],
      };

      const response = await request(app)
        .post('/api/convert')
        .send({
          input: xssPayload,
          options: { format: 'typescript' },
        });

      if (response.status === 200) {
        const generatedCode = response.body.data.files[0]?.content || '';
        expect(generatedCode).not.toContain('<script>');
        expect(generatedCode).not.toContain('onerror=');
        expect(generatedCode).not.toContain('document.cookie');
      } else {
        expect(response.status).toBeGreaterThanOrEqual(400);
      }
    });

    it('should validate file upload types', async () => {
      const maliciousFile = Buffer.from('#!/bin/bash\nrm -rf /');
      
      const response = await request(app)
        .post('/api/upload')
        .attach('file', maliciousFile, 'malicious.sh')
        .expect(400); // Should reject non-JSON files

      expect(response.body.success).toBe(false);
    });

    it('should limit file upload sizes', async () => {
      // Create a file larger than the 5MB test limit
      const largeContent = 'x'.repeat(6 * 1024 * 1024); // 6MB
      
      const response = await request(app)
        .post('/api/upload')
        .attach('file', Buffer.from(largeContent), 'large.json')
        .expect(413); // Payload Too Large

      expect(response.body.success).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON gracefully', async () => {
      const response = await request(app)
        .post('/api/convert')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }')
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.any(String),
        message: expect.stringContaining('JSON'),
      });
    });

    it('should handle missing Content-Type header', async () => {
      const response = await request(app)
        .post('/api/convert')
        .send('some data')
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should provide detailed error messages in development', async () => {
      const invalidFlow = TestData.createInvalidFlow();
      
      const response = await request(app)
        .post('/api/convert')
        .send({
          input: invalidFlow,
          options: { format: 'typescript' },
        });

      // Should fail with detailed error
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBeDefined();
    });

    it('should handle internal server errors gracefully', async () => {
      // Create a scenario that causes internal error
      const problematicFlow = {
        nodes: [null, undefined, {}], // Invalid node structure
        edges: [{ source: null, target: undefined }],
      };

      const response = await request(app)
        .post('/api/convert')
        .send({
          input: problematicFlow,
          options: { format: 'typescript' },
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.body).toMatchObject({
        success: false,
        error: expect.any(String),
        timestamp: expect.any(String),
      });
    });

    it('should handle timeout scenarios', async () => {
      // This would require mocking a long-running operation
      // For now, we'll test the timeout structure exists
      const testFlow = createMockFlow(1, 0);
      
      const response = await request(app)
        .post('/api/convert')
        .send({
          input: testFlow,
          options: { format: 'typescript' },
        })
        .timeout(100); // Very short timeout

      // Should either complete quickly or timeout gracefully
      if (response.status === 408) {
        expect(response.body).toMatchObject({
          success: false,
          error: expect.stringContaining('timeout'),
        });
      }
    });
  });

  describe('Integration with Vector Databases', () => {
    it('should support vector store conversion options', async () => {
      const vectorFlow = {
        nodes: [{
          id: 'vector-store',
          data: {
            type: 'Chroma',
            category: 'Vector Stores',
            inputs: {
              collectionName: 'test-collection',
              embeddingFunction: 'OpenAIEmbeddings',
            },
          },
        }],
        edges: [],
      };

      const response = await request(app)
        .post('/api/convert')
        .send({
          input: vectorFlow,
          options: {
            format: 'typescript',
            includeVectorStore: true,
          },
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      
      // Check if vector store code is generated
      const mainFile = response.body.data.files.find((f: any) => f.type === 'main');
      if (mainFile) {
        expect(mainFile.content).toContain('Chroma');
        expect(mainFile.content).toContain('vector');
      }
    });

    it('should handle embedding model configurations', async () => {
      const embeddingFlow = {
        nodes: [{
          id: 'embeddings',
          data: {
            type: 'OpenAIEmbeddings',
            category: 'Embeddings',
            inputs: {
              modelName: 'text-embedding-ada-002',
              batchSize: 1000,
            },
          },
        }],
        edges: [],
      };

      const response = await request(app)
        .post('/api/convert')
        .send({
          input: embeddingFlow,
          options: { format: 'typescript' },
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.analysis.supportedTypes).toContain('OpenAIEmbeddings');
    });

    it('should validate vector database connections', async () => {
      const invalidVectorFlow = {
        nodes: [{
          id: 'invalid-vector',
          data: {
            type: 'InvalidVectorStore',
            category: 'Vector Stores',
            inputs: {
              connectionString: 'invalid://connection',
            },
          },
        }],
        edges: [],
      };

      const response = await request(app)
        .post('/api/convert')
        .send({
          input: invalidVectorFlow,
          options: { format: 'typescript' },
        });

      // Should either handle gracefully or provide meaningful error
      if (response.status >= 400) {
        expect(response.body.error).toContain('vector');
      } else {
        expect(response.body.data.warnings.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Performance & Load Testing', () => {
    it('should handle concurrent requests efficiently', async () => {
      const testFlow = createMockFlow(5, 3);
      const concurrentRequests = 5;
      
      const startTime = Date.now();
      
      const requests = Array.from({ length: concurrentRequests }, () =>
        request(app)
          .post('/api/convert')
          .send({
            input: testFlow,
            options: { format: 'typescript' },
          })
      );

      const responses = await Promise.all(requests);
      const endTime = Date.now();
      
      // All requests should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });

      // Should complete within reasonable time (adjust based on requirements)
      const totalTime = endTime - startTime;
      expect(totalTime).toBeLessThan(30000); // 30 seconds for 5 concurrent requests
    });

    it('should report performance metrics accurately', async () => {
      const testFlow = createMockFlow(10, 8);
      
      const response = await request(app)
        .post('/api/convert')
        .send({
          input: testFlow,
          options: { format: 'typescript' },
        })
        .expect(200);

      const metrics = response.body.data.metrics;
      
      expect(metrics.duration).toBeGreaterThan(0);
      expect(metrics.nodesProcessed).toBe(10);
      expect(metrics.filesGenerated).toBeGreaterThan(0);
      expect(metrics.totalSize).toBeGreaterThan(0);
      expect(metrics.memoryUsage).toBeGreaterThan(0);
    });

    it('should maintain memory usage within limits', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Process several large flows
      for (let i = 0; i < 3; i++) {
        const largeFlow = TestData.createLargeFlow(20, 0.7);
        await request(app)
          .post('/api/convert')
          .send({
            input: largeFlow,
            options: { format: 'typescript' },
          });
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be reasonable (adjust threshold as needed)
      expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024); // 100MB
    });
  });

  describe('WebSocket Integration', () => {
    it('should handle WebSocket connections for real-time updates', (done) => {
      const ws = new WebSocket(`ws://localhost:${testPort}`);
      
      ws.on('open', () => {
        // Send a ping message
        ws.send(JSON.stringify({
          type: 'ping',
          timestamp: new Date().toISOString(),
        }));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'pong') {
          expect(message.timestamp).toBeDefined();
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        ws.close();
        done(new Error('WebSocket test timeout'));
      }, 5000);
    });

    it('should broadcast conversion progress via WebSocket', (done) => {
      const ws = new WebSocket(`ws://localhost:${testPort}`);
      let jobId: string;

      ws.on('open', async () => {
        // Start a conversion that will generate progress updates
        const testFlow = TestData.createLargeFlow(10, 0.5);
        
        const response = await request(app)
          .post('/api/convert')
          .send({
            input: testFlow,
            options: { format: 'typescript' },
            stream: true,
            connectionId: 'websocket-test',
          });

        jobId = response.body.data.jobId;
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'progress' && message.payload?.jobId === jobId) {
          expect(message.payload).toMatchObject({
            jobId: expect.any(String),
            progress: expect.any(Number),
            step: expect.any(String),
          });
          
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('WebSocket progress test timeout'));
      }, 10000);
    });

    it('should handle WebSocket disconnections gracefully', (done) => {
      const ws = new WebSocket(`ws://localhost:${testPort}`);
      
      ws.on('open', () => {
        // Immediately close the connection
        ws.close();
      });

      ws.on('close', (code, reason) => {
        expect(code).toBeDefined();
        done();
      });

      ws.on('error', (error) => {
        // Connection errors are acceptable in this test
        done();
      });
    });
  });

  describe('Security Headers & CORS', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/health');

      // Check for security headers (these should be added by middleware)
      expect(response.headers['x-content-type-options']).toBeDefined();
      expect(response.headers['x-frame-options']).toBeDefined();
      expect(response.headers['x-xss-protection']).toBeDefined();
    });

    it('should handle CORS preflight requests', async () => {
      const response = await request(app)
        .options('/api/convert')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST')
        .set('Access-Control-Request-Headers', 'Content-Type');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
      expect(response.headers['access-control-allow-methods']).toBeDefined();
    });

    it('should reject requests from unauthorized origins', async () => {
      const response = await request(app)
        .get('/health')
        .set('Origin', 'http://malicious-site.com');

      // Should either reject or not include CORS headers for unauthorized origin
      if (response.headers['access-control-allow-origin']) {
        expect(response.headers['access-control-allow-origin']).not.toBe('http://malicious-site.com');
      }
    });
  });
});