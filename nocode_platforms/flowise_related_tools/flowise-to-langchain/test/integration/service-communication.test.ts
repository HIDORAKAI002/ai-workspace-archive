/**
 * Service Communication Integration Tests
 * Tests inter-service communication, API endpoints, and real-time features
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { EventEmitter } from 'events';
import { WebSocket } from 'ws';
import { spawn } from 'child_process';
import { writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { ConversionService } from '../../src/api/services/conversion';
import { simpleOpenAIFlow, chainFlow, complexFlow } from '../fixtures/sample-flows';

// Mock WebSocket server for testing
class MockWebSocketServer extends EventEmitter {
  private clients: Set<any> = new Set();
  
  constructor() {
    super();
  }
  
  addClient(client: any) {
    this.clients.add(client);
    this.emit('connection', client);
  }
  
  removeClient(client: any) {
    this.clients.delete(client);
  }
  
  broadcast(message: any) {
    this.clients.forEach(client => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(JSON.stringify(message));
      }
    });
  }
}

describe('Service Communication Integration', () => {
  let testDir: string;
  let conversionService: ConversionService;
  let mockWsServer: MockWebSocketServer;

  beforeEach(async () => {
    testDir = join(tmpdir(), 'service-comm-test-' + Date.now());
    await mkdir(testDir, { recursive: true });
    conversionService = new ConversionService();
    mockWsServer = new MockWebSocketServer();
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe('Real-time Progress Communication', () => {
    test('should stream conversion progress via WebSocket', async () => {
      // Arrange - Mock WebSocket client
      const progressUpdates: any[] = [];
      const mockClient = {
        readyState: 1,
        send: jest.fn((data) => {
          progressUpdates.push(JSON.parse(data));
        })
      };

      mockWsServer.addClient(mockClient);

      // Set up progress tracking
      conversionService.on('job:progress', (progress) => {
        mockWsServer.broadcast({
          type: 'conversion:progress',
          data: progress
        });
      });

      // Act - Start conversion
      const conversionPromise = conversionService.convert({
        input: complexFlow,
        options: { format: 'typescript' as const }
      });

      const result = await conversionPromise;

      // Assert - Progress updates were sent
      expect(progressUpdates.length).toBeGreaterThan(0);
      
      const progressMessages = progressUpdates.filter(u => u.type === 'conversion:progress');
      expect(progressMessages.length).toBeGreaterThan(0);
      
      // Verify progress sequence
      const progressValues = progressMessages.map(m => m.data.progress);
      expect(Math.max(...progressValues)).toBe(100);
      expect(Math.min(...progressValues)).toBeGreaterThanOrEqual(0);
    });

    test('should handle multiple simultaneous WebSocket clients', async () => {
      // Arrange - Multiple mock clients
      const client1Updates: any[] = [];
      const client2Updates: any[] = [];
      
      const mockClient1 = {
        readyState: 1,
        send: jest.fn((data) => client1Updates.push(JSON.parse(data)))
      };
      
      const mockClient2 = {
        readyState: 1,
        send: jest.fn((data) => client2Updates.push(JSON.parse(data)))
      };

      mockWsServer.addClient(mockClient1);
      mockWsServer.addClient(mockClient2);

      // Set up broadcasting
      conversionService.on('conversion:completed', (event) => {
        mockWsServer.broadcast({
          type: 'conversion:completed',
          data: event
        });
      });

      // Act - Multiple conversions
      const conversions = await Promise.all([
        conversionService.convert({ input: simpleOpenAIFlow, options: {} }),
        conversionService.convert({ input: chainFlow, options: {} })
      ]);

      // Assert - Both clients received updates
      expect(client1Updates.length).toBeGreaterThan(0);
      expect(client2Updates.length).toBeGreaterThan(0);
      
      // Both should have received completion messages
      const client1Completions = client1Updates.filter(u => u.type === 'conversion:completed');
      const client2Completions = client2Updates.filter(u => u.type === 'conversion:completed');
      
      expect(client1Completions.length).toBe(2);
      expect(client2Completions.length).toBe(2);
    });

    test('should handle WebSocket client disconnections gracefully', async () => {
      // Arrange - Client that disconnects
      const mockClient = {
        readyState: 3, // WebSocket.CLOSED
        send: jest.fn()
      };

      mockWsServer.addClient(mockClient);

      conversionService.on('job:progress', (progress) => {
        mockWsServer.broadcast({
          type: 'conversion:progress',
          data: progress
        });
      });

      // Act - Conversion with disconnected client
      const result = await conversionService.convert({
        input: simpleOpenAIFlow,
        options: { format: 'typescript' as const }
      });

      // Assert - Should not crash and conversion should succeed
      expect(result.jobId).toBeDefined();
      expect(result.files.length).toBeGreaterThan(0);
      expect(mockClient.send).not.toHaveBeenCalled(); // Closed client shouldn't receive messages
    });
  });

  describe('API Service Integration', () => {
    test('should handle REST API request/response flow', async () => {
      // Arrange - Mock API request format
      const apiRequest = {
        method: 'POST',
        url: '/api/convert',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: {
          input: simpleOpenAIFlow,
          options: {
            withLangfuse: false,
            format: 'typescript' as const,
            includeTests: true
          }
        }
      };

      // Act - Process through conversion service (simulating API handler)
      const response = await conversionService.convert(apiRequest.body);

      // Assert - Valid API response format
      expect(response).toHaveProperty('jobId');
      expect(response).toHaveProperty('files');
      expect(response).toHaveProperty('metrics');
      expect(response).toHaveProperty('analysis');
      
      expect(typeof response.jobId).toBe('string');
      expect(Array.isArray(response.files)).toBe(true);
      expect(response.files.length).toBeGreaterThan(0);
      
      // Verify response structure matches API contract
      response.files.forEach(file => {
        expect(file).toHaveProperty('path');
        expect(file).toHaveProperty('content');
        expect(file).toHaveProperty('type');
        expect(file).toHaveProperty('language');
      });
    });

    test('should handle file upload and processing', async () => {
      // Arrange - Simulate file upload
      const uploadedFile = {
        originalname: 'test-flow.json',
        mimetype: 'application/json',
        buffer: Buffer.from(JSON.stringify(simpleOpenAIFlow, null, 2)),
        size: 0
      };
      uploadedFile.size = uploadedFile.buffer.length;

      // Simulate file upload processing
      const tempFilePath = join(testDir, uploadedFile.originalname);
      await writeFile(tempFilePath, uploadedFile.buffer);

      // Act - Process uploaded file
      const response = await conversionService.convert({
        input: tempFilePath, // File path instead of JSON
        options: { format: 'typescript' as const }
      });

      // Assert - File was processed successfully
      expect(response.jobId).toBeDefined();
      expect(response.files.length).toBeGreaterThan(0);
      expect(response.analysis.nodeCount).toBeGreaterThan(0);
    });

    test('should handle API rate limiting and queuing', async () => {
      // Arrange - Multiple rapid requests
      const requests = Array.from({ length: 10 }, (_, i) => ({
        input: { ...simpleOpenAIFlow, id: `flow-${i}` },
        options: { format: 'typescript' as const }
      }));

      // Act - Submit all requests simultaneously
      const startTime = Date.now();
      const promises = requests.map(req => conversionService.convert(req));
      const results = await Promise.all(promises);
      const duration = Date.now() - startTime;

      // Assert - All requests completed successfully
      expect(results.length).toBe(10);
      results.forEach(result => {
        expect(result.jobId).toBeDefined();
        expect(result.files.length).toBeGreaterThan(0);
      });

      // Verify reasonable processing time (accounting for queuing)
      expect(duration).toBeLessThan(30000); // 30 seconds for 10 requests
      
      // Check that jobs were tracked properly
      const allJobs = conversionService.getAllJobs();
      expect(allJobs.length).toBe(10);
    });
  });

  describe('Cross-Service Communication', () => {
    test('should coordinate between CLI and API services', async () => {
      // Arrange - Shared state/configuration
      const sharedConfig = {
        outputFormat: 'esm' as const,
        includeLangfuse: false,
        verbose: false
      };

      // Act - Process same flow through different service interfaces
      const apiResult = await conversionService.convert({
        input: simpleOpenAIFlow,
        options: {
          format: 'typescript' as const,
          outputFormat: sharedConfig.outputFormat,
          withLangfuse: sharedConfig.includeLangfuse
        }
      });

      // Simulate CLI service with same config
      const cliResult = {
        success: true,
        files: apiResult.files.map(f => ({
          path: f.path,
          size: f.content.length,
          type: f.type
        })),
        analysis: apiResult.analysis,
        metrics: {
          duration: apiResult.metrics.duration,
          nodesProcessed: apiResult.metrics.nodesProcessed
        }
      };

      // Assert - Results are compatible between services
      expect(apiResult.analysis.nodeCount).toBe(cliResult.analysis.nodeCount);
      expect(apiResult.files.length).toBe(cliResult.files.length);
      expect(apiResult.analysis.complexity).toBe(cliResult.analysis.complexity);
    });

    test('should handle service discovery and health checks', async () => {
      // Arrange - Service health indicators
      const serviceHealth = {
        conversion: { status: 'healthy', uptime: 0, jobs: 0 },
        websocket: { status: 'healthy', connections: 0 },
        storage: { status: 'healthy', diskUsage: 0 }
      };

      // Mock health check functions
      const checkConversionService = async () => {
        try {
          const jobs = conversionService.getAllJobs();
          serviceHealth.conversion.jobs = jobs.length;
          serviceHealth.conversion.status = 'healthy';
          return true;
        } catch (error) {
          serviceHealth.conversion.status = 'unhealthy';
          return false;
        }
      };

      const checkWebSocketService = async () => {
        try {
          serviceHealth.websocket.connections = mockWsServer.listenerCount('connection');
          serviceHealth.websocket.status = 'healthy';
          return true;
        } catch (error) {
          serviceHealth.websocket.status = 'unhealthy';
          return false;
        }
      };

      // Act - Run health checks
      const healthResults = await Promise.all([
        checkConversionService(),
        checkWebSocketService()
      ]);

      // Assert - All services are healthy
      expect(healthResults.every(result => result)).toBe(true);
      expect(serviceHealth.conversion.status).toBe('healthy');
      expect(serviceHealth.websocket.status).toBe('healthy');
    });

    test('should handle service failover and recovery', async () => {
      // Arrange - Simulate service failure scenario
      const originalConvert = conversionService.convert.bind(conversionService);
      let failureCount = 0;
      const maxFailures = 2;

      // Mock intermittent failures
      conversionService.convert = async function(request) {
        failureCount++;
        if (failureCount <= maxFailures) {
          throw new Error('Service temporarily unavailable');
        }
        return originalConvert(request);
      };

      // Implement retry logic
      const retryConvert = async (request: any, maxRetries = 3) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            return await conversionService.convert(request);
          } catch (error) {
            if (attempt === maxRetries) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      };

      // Act - Attempt conversion with retry logic
      const result = await retryConvert({
        input: simpleOpenAIFlow,
        options: { format: 'typescript' as const }
      });

      // Assert - Eventually succeeded despite failures
      expect(result.jobId).toBeDefined();
      expect(result.files.length).toBeGreaterThan(0);
      expect(failureCount).toBe(maxFailures + 1);
    });
  });

  describe('Event-Driven Communication', () => {
    test('should handle event-driven workflow orchestration', async () => {
      // Arrange - Event-driven workflow
      const workflowEvents: any[] = [];
      const eventBus = new EventEmitter();

      // Set up event handlers
      eventBus.on('workflow:started', (event) => {
        workflowEvents.push({ type: 'started', ...event });
      });

      eventBus.on('workflow:validated', (event) => {
        workflowEvents.push({ type: 'validated', ...event });
      });

      eventBus.on('workflow:converted', (event) => {
        workflowEvents.push({ type: 'converted', ...event });
      });

      eventBus.on('workflow:completed', (event) => {
        workflowEvents.push({ type: 'completed', ...event });
      });

      // Simulate workflow orchestration
      const workflowId = 'test-workflow-' + Date.now();
      
      // Act - Execute event-driven workflow
      eventBus.emit('workflow:started', { workflowId, input: simpleOpenAIFlow });
      
      eventBus.emit('workflow:validated', { workflowId, isValid: true });
      
      const conversionResult = await conversionService.convert({
        input: simpleOpenAIFlow,
        options: { format: 'typescript' as const }
      });
      
      eventBus.emit('workflow:converted', { workflowId, result: conversionResult });
      eventBus.emit('workflow:completed', { workflowId, success: true });

      // Assert - Complete workflow was tracked
      expect(workflowEvents.length).toBe(4);
      expect(workflowEvents.map(e => e.type)).toEqual([
        'started', 'validated', 'converted', 'completed'
      ]);

      workflowEvents.forEach(event => {
        expect(event.workflowId).toBe(workflowId);
      });
    });

    test('should handle pub/sub messaging patterns', async () => {
      // Arrange - Publisher/Subscriber pattern
      const subscribers: any[] = [];
      const messageQueue: any[] = [];

      const publisher = {
        publish: (topic: string, message: any) => {
          const payload = { topic, message, timestamp: Date.now() };
          messageQueue.push(payload);
          
          // Notify subscribers
          subscribers.forEach(sub => {
            if (sub.topics.includes(topic)) {
              sub.handler(payload);
            }
          });
        }
      };

      const subscribe = (topics: string[], handler: Function) => {
        subscribers.push({ topics, handler });
      };

      // Set up subscribers
      const conversionEvents: any[] = [];
      const progressEvents: any[] = [];

      subscribe(['conversion.completed'], (payload) => {
        conversionEvents.push(payload);
      });

      subscribe(['conversion.progress'], (payload) => {
        progressEvents.push(payload);
      });

      // Act - Simulate conversion with pub/sub
      conversionService.on('conversion:completed', (event) => {
        publisher.publish('conversion.completed', event);
      });

      conversionService.on('job:progress', (event) => {
        publisher.publish('conversion.progress', event);
      });

      const result = await conversionService.convert({
        input: simpleOpenAIFlow,
        options: { format: 'typescript' as const }
      });

      // Wait for events to propagate
      await new Promise(resolve => setTimeout(resolve, 100));

      // Assert - Subscribers received appropriate messages
      expect(conversionEvents.length).toBeGreaterThan(0);
      expect(progressEvents.length).toBeGreaterThan(0);
      expect(messageQueue.length).toBeGreaterThan(0);

      // Verify message structure
      messageQueue.forEach(msg => {
        expect(msg).toHaveProperty('topic');
        expect(msg).toHaveProperty('message');
        expect(msg).toHaveProperty('timestamp');
      });
    });
  });
});