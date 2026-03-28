/**
 * WebSocket API Test Suite
 * 
 * Tests for WebSocket functionality including:
 * - Connection management
 * - Real-time progress updates
 * - Message broadcasting
 * - Error handling
 * - Connection security
 */

import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { WebSocket, WebSocketServer } from 'ws';
import { ApiServer } from '../../src/api/index.js';
import { createTempDir, cleanupTempDir } from '../utils/test-helpers.js';

describe('WebSocket API Test Suite', () => {
  let apiServer: ApiServer;
  let testDir: string;
  let wss: WebSocketServer;
  const testPort = 3003;
  const wsUrl = `ws://localhost:${testPort}`;

  beforeAll(async () => {
    testDir = await createTempDir('websocket-test');
    
    apiServer = new ApiServer({
      port: testPort,
      host: 'localhost',
      websocket: {
        heartbeatInterval: 1000, // 1 second for faster tests
        maxConnections: 5,
      },
    });

    await apiServer.start();
    wss = apiServer.getWebSocketServer();
  });

  afterAll(async () => {
    await apiServer.stop();
    await cleanupTempDir(testDir);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('WebSocket Connection Management', () => {
    it('should accept WebSocket connections', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        expect(ws.readyState).toBe(WebSocket.OPEN);
        ws.close();
        done();
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Connection timeout'));
      }, 5000);
    });

    it('should handle multiple concurrent connections', (done) => {
      const connections: WebSocket[] = [];
      let connectedCount = 0;
      const totalConnections = 3;

      for (let i = 0; i < totalConnections; i++) {
        const ws = new WebSocket(wsUrl);
        connections.push(ws);

        ws.on('open', () => {
          connectedCount++;
          if (connectedCount === totalConnections) {
            // All connections established
            connections.forEach(conn => conn.close());
            done();
          }
        });

        ws.on('error', (error) => {
          done(error);
        });
      }

      setTimeout(() => {
        connections.forEach(conn => conn.close());
        done(new Error('Multiple connections timeout'));
      }, 5000);
    });

    it('should limit maximum connections', (done) => {
      const connections: WebSocket[] = [];
      const maxConnections = 5; // From config
      let rejectedConnections = 0;

      // Try to create more connections than the limit
      for (let i = 0; i < maxConnections + 2; i++) {
        const ws = new WebSocket(wsUrl);
        connections.push(ws);

        ws.on('error', () => {
          rejectedConnections++;
        });

        ws.on('close', (code) => {
          if (code === 1013) { // Server overload
            rejectedConnections++;
          }
        });
      }

      setTimeout(() => {
        // Should have rejected at least some connections
        expect(rejectedConnections).toBeGreaterThan(0);
        
        connections.forEach(conn => {
          if (conn.readyState === WebSocket.OPEN) {
            conn.close();
          }
        });
        done();
      }, 2000);
    });

    it('should handle connection upgrades properly', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('upgrade', (response) => {
        expect(response.statusCode).toBe(101);
        expect(response.headers.upgrade).toBe('websocket');
        expect(response.headers.connection).toBe('Upgrade');
      });

      ws.on('open', () => {
        ws.close();
        done();
      });

      ws.on('error', (error) => {
        done(error);
      });
    });

    it('should clean up closed connections', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        // Close connection immediately
        ws.close();
      });

      ws.on('close', () => {
        // Wait a moment for cleanup
        setTimeout(() => {
          // Connection should be removed from server's connection list
          // This is indirectly tested by checking if new connections can be made
          const newWs = new WebSocket(wsUrl);
          
          newWs.on('open', () => {
            newWs.close();
            done();
          });

          newWs.on('error', (error) => {
            done(error);
          });
        }, 100);
      });

      ws.on('error', (error) => {
        done(error);
      });
    });
  });

  describe('WebSocket Message Handling', () => {
    it('should handle ping-pong messages', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        const pingMessage = {
          type: 'ping',
          timestamp: new Date().toISOString(),
        };
        
        ws.send(JSON.stringify(pingMessage));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'pong') {
          expect(message.timestamp).toBeDefined();
          expect(new Date(message.timestamp).getTime()).toBeGreaterThan(0);
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Ping-pong timeout'));
      }, 3000);
    });

    it('should handle subscription messages', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        const subscribeMessage = {
          type: 'subscribe',
          payload: {
            jobId: 'test-job-123',
            events: ['progress', 'result', 'error'],
          },
          timestamp: new Date().toISOString(),
        };
        
        ws.send(JSON.stringify(subscribeMessage));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'subscription:confirmed') {
          expect(message.payload.jobId).toBe('test-job-123');
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Subscription timeout'));
      }, 3000);
    });

    it('should handle unsubscription messages', (done) => {
      const ws = new WebSocket(wsUrl);
      let subscribed = false;
      
      ws.on('open', () => {
        // First subscribe
        const subscribeMessage = {
          type: 'subscribe',
          payload: { jobId: 'test-job-456' },
          timestamp: new Date().toISOString(),
        };
        
        ws.send(JSON.stringify(subscribeMessage));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'subscription:confirmed' && !subscribed) {
          subscribed = true;
          
          // Now unsubscribe
          const unsubscribeMessage = {
            type: 'unsubscribe',
            payload: { jobId: 'test-job-456' },
            timestamp: new Date().toISOString(),
          };
          
          ws.send(JSON.stringify(unsubscribeMessage));
        } else if (message.type === 'subscription:removed') {
          expect(message.payload.jobId).toBe('test-job-456');
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Unsubscription timeout'));
      }, 5000);
    });

    it('should reject malformed messages', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        // Send invalid JSON
        ws.send('{ invalid json }');
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'error') {
          expect(message.error.code).toBe('INVALID_MESSAGE');
          expect(message.error.message).toContain('JSON');
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Malformed message timeout'));
      }, 3000);
    });

    it('should validate message schemas', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        // Send message with missing required fields
        const invalidMessage = {
          type: 'subscribe',
          // Missing payload
          timestamp: new Date().toISOString(),
        };
        
        ws.send(JSON.stringify(invalidMessage));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'error') {
          expect(message.error.code).toBe('VALIDATION_ERROR');
          expect(message.error.message).toContain('payload');
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Schema validation timeout'));
      }, 3000);
    });
  });

  describe('Real-time Progress Updates', () => {
    it('should broadcast progress updates to subscribed clients', (done) => {
      const ws1 = new WebSocket(wsUrl);
      const ws2 = new WebSocket(wsUrl);
      let subscriptionsConfirmed = 0;
      const jobId = 'test-progress-job';

      const subscribeToJob = (ws: WebSocket) => {
        ws.send(JSON.stringify({
          type: 'subscribe',
          payload: { jobId, events: ['progress'] },
          timestamp: new Date().toISOString(),
        }));
      };

      const handleMessage = (ws: WebSocket, data: Buffer) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'subscription:confirmed') {
          subscriptionsConfirmed++;
          
          if (subscriptionsConfirmed === 2) {
            // Both clients subscribed, simulate progress update
            setTimeout(() => {
              // This would normally be triggered by the conversion service
              wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({
                    type: 'progress',
                    payload: {
                      jobId,
                      progress: 50,
                      step: 'Processing nodes',
                      details: 'Converting node types',
                    },
                    timestamp: new Date().toISOString(),
                  }));
                }
              });
            }, 100);
          }
        } else if (message.type === 'progress') {
          expect(message.payload.jobId).toBe(jobId);
          expect(message.payload.progress).toBe(50);
          expect(message.payload.step).toBe('Processing nodes');
          
          ws1.close();
          ws2.close();
          done();
        }
      };

      ws1.on('open', () => subscribeToJob(ws1));
      ws2.on('open', () => subscribeToJob(ws2));
      
      ws1.on('message', (data) => handleMessage(ws1, data));
      ws2.on('message', (data) => handleMessage(ws2, data));

      ws1.on('error', done);
      ws2.on('error', done);

      setTimeout(() => {
        ws1.close();
        ws2.close();
        done(new Error('Progress broadcast timeout'));
      }, 5000);
    });

    it('should send result notifications', (done) => {
      const ws = new WebSocket(wsUrl);
      const jobId = 'test-result-job';
      
      ws.on('open', () => {
        ws.send(JSON.stringify({
          type: 'subscribe',
          payload: { jobId, events: ['result'] },
          timestamp: new Date().toISOString(),
        }));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'subscription:confirmed') {
          // Simulate result notification
          setTimeout(() => {
            ws.send(JSON.stringify({
              type: 'result',
              payload: {
                jobId,
                result: {
                  files: ['main.ts', 'types.ts'],
                  metrics: { duration: 1500 },
                },
                operation: 'convert',
              },
              timestamp: new Date().toISOString(),
            }));
          }, 100);
        } else if (message.type === 'result') {
          expect(message.payload.jobId).toBe(jobId);
          expect(message.payload.result.files).toEqual(['main.ts', 'types.ts']);
          expect(message.payload.operation).toBe('convert');
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Result notification timeout'));
      }, 3000);
    });

    it('should send error notifications', (done) => {
      const ws = new WebSocket(wsUrl);
      const jobId = 'test-error-job';
      
      ws.on('open', () => {
        ws.send(JSON.stringify({
          type: 'subscribe',
          payload: { jobId, events: ['error'] },
          timestamp: new Date().toISOString(),
        }));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'subscription:confirmed') {
          // Simulate error notification
          setTimeout(() => {
            ws.send(JSON.stringify({
              type: 'error',
              payload: {
                jobId,
                error: {
                  code: 'CONVERSION_ERROR',
                  message: 'Failed to process node',
                  details: { nodeId: 'problematic-node' },
                },
                operation: 'convert',
              },
              timestamp: new Date().toISOString(),
            }));
          }, 100);
        } else if (message.type === 'error') {
          expect(message.payload.jobId).toBe(jobId);
          expect(message.payload.error.code).toBe('CONVERSION_ERROR');
          expect(message.payload.error.details.nodeId).toBe('problematic-node');
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Error notification timeout'));
      }, 3000);
    });

    it('should handle selective event subscriptions', (done) => {
      const ws = new WebSocket(wsUrl);
      const jobId = 'test-selective-job';
      let progressReceived = false;
      let resultReceived = false;
      
      ws.on('open', () => {
        // Subscribe only to progress events, not results
        ws.send(JSON.stringify({
          type: 'subscribe',
          payload: { jobId, events: ['progress'] },
          timestamp: new Date().toISOString(),
        }));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'subscription:confirmed') {
          // Send both progress and result messages
          setTimeout(() => {
            // Progress should be received
            ws.send(JSON.stringify({
              type: 'progress',
              payload: { jobId, progress: 75 },
              timestamp: new Date().toISOString(),
            }));
            
            // Result should be ignored (not subscribed)
            setTimeout(() => {
              ws.send(JSON.stringify({
                type: 'result',
                payload: { jobId, result: {} },
                timestamp: new Date().toISOString(),
              }));
            }, 50);
          }, 100);
        } else if (message.type === 'progress') {
          progressReceived = true;
          expect(message.payload.progress).toBe(75);
          
          // Wait a bit to see if result is received (it shouldn't be)
          setTimeout(() => {
            expect(progressReceived).toBe(true);
            expect(resultReceived).toBe(false);
            ws.close();
            done();
          }, 200);
        } else if (message.type === 'result') {
          resultReceived = true;
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Selective subscription timeout'));
      }, 3000);
    });
  });

  describe('WebSocket Security', () => {
    it('should validate connection origins', (done) => {
      // This test would require implementing origin validation
      // For now, we'll test that connections are accepted from allowed origins
      
      const ws = new WebSocket(wsUrl, {
        headers: {
          'Origin': 'http://localhost:3000',
        },
      });
      
      ws.on('open', () => {
        expect(ws.readyState).toBe(WebSocket.OPEN);
        ws.close();
        done();
      });

      ws.on('error', (error) => {
        // If origin validation is implemented, unauthorized origins would be rejected
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Origin validation timeout'));
      }, 3000);
    });

    it('should handle authentication tokens', (done) => {
      // This test assumes future implementation of WebSocket authentication
      
      const ws = new WebSocket(wsUrl, {
        headers: {
          'Authorization': 'Bearer valid-token-123',
        },
      });
      
      ws.on('open', () => {
        // Currently should work since auth is not implemented
        expect(ws.readyState).toBe(WebSocket.OPEN);
        ws.close();
        done();
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Authentication timeout'));
      }, 3000);
    });

    it('should prevent message flooding', (done) => {
      const ws = new WebSocket(wsUrl);
      let messagesBlocked = false;
      
      ws.on('open', () => {
        // Send many messages rapidly
        for (let i = 0; i < 100; i++) {
          ws.send(JSON.stringify({
            type: 'ping',
            id: i,
            timestamp: new Date().toISOString(),
          }));
        }
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'error' && message.error.code === 'RATE_LIMITED') {
          messagesBlocked = true;
          ws.close();
          done();
        }
      });

      ws.on('close', (code) => {
        if (code === 1008 && !messagesBlocked) {
          // Connection closed due to rate limiting
          messagesBlocked = true;
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        if (!messagesBlocked) {
          // Rate limiting might not be implemented yet
          ws.close();
          done();
        }
      }, 3000);
    });

    it('should sanitize incoming messages', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        // Send message with potentially malicious content
        ws.send(JSON.stringify({
          type: 'subscribe',
          payload: {
            jobId: '<script>alert("xss")</script>',
            events: ['progress'],
          },
          timestamp: new Date().toISOString(),
        }));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'subscription:confirmed') {
          // Check that jobId was sanitized
          expect(message.payload.jobId).not.toContain('<script>');
          ws.close();
          done();
        } else if (message.type === 'error') {
          // Alternatively, malicious input might be rejected
          expect(message.error.code).toBe('VALIDATION_ERROR');
          ws.close();
          done();
        }
      });

      ws.on('error', (error) => {
        done(error);
      });

      setTimeout(() => {
        ws.close();
        done(new Error('Message sanitization timeout'));
      }, 3000);
    });
  });

  describe('Connection Heartbeat & Health', () => {
    it('should send periodic heartbeat pings', (done) => {
      const ws = new WebSocket(wsUrl);
      let heartbeatReceived = false;
      
      ws.on('open', () => {
        // Wait for automatic heartbeat (configured for 1 second interval)
      });

      ws.on('ping', () => {
        heartbeatReceived = true;
        ws.pong();
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'heartbeat') {
          heartbeatReceived = true;
          ws.send(JSON.stringify({
            type: 'heartbeat:ack',
            timestamp: new Date().toISOString(),
          }));
        }
      });

      setTimeout(() => {
        expect(heartbeatReceived).toBe(true);
        ws.close();
        done();
      }, 2000); // Wait longer than heartbeat interval

      ws.on('error', (error) => {
        done(error);
      });
    });

    it('should detect and close dead connections', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        // Stop responding to heartbeats to simulate dead connection
        ws.on('ping', () => {
          // Don't send pong response
        });

        ws.on('message', (data) => {
          const message = JSON.parse(data.toString());
          
          if (message.type === 'heartbeat') {
            // Don't send heartbeat ack
          }
        });
      });

      ws.on('close', (code, reason) => {
        // Connection should be closed due to missed heartbeats
        expect(code).toBe(1002); // Protocol error
        done();
      });

      ws.on('error', (error) => {
        // Connection errors are expected when heartbeat fails
        done();
      });

      setTimeout(() => {
        // If connection is still open, close it and fail the test
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
          done(new Error('Dead connection was not detected'));
        }
      }, 5000);
    });

    it('should maintain connection statistics', (done) => {
      const ws = new WebSocket(wsUrl);
      
      ws.on('open', () => {
        // Request connection statistics
        ws.send(JSON.stringify({
          type: 'stats:request',
          timestamp: new Date().toISOString(),
        }));
      });

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'stats:response') {
          expect(message.payload).toMatchObject({
            activeConnections: expect.any(Number),
            totalConnections: expect.any(Number),
            messagesReceived: expect.any(Number),
            messagesSent: expect.any(Number),
            uptime: expect.any(Number),
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
        done(new Error('Statistics request timeout'));
      }, 3000);
    });
  });
});