/**
 * Performance Benchmarking Test Suite
 * 
 * Comprehensive performance tests for API operations including:
 * - Response time benchmarks
 * - Throughput testing
 * - Memory usage monitoring
 * - Concurrent operation testing
 * - Load testing scenarios
 */

import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { FlowiseApiClient } from '../../testing-ui/src/lib/flowise-api-client';
import { useFlowiseConverter } from '../../frontend/src/hooks/useFlowiseConverter';
import { createMockServer } from '../utils/mock-server';
import { TestData, createMockFlow } from '../utils/test-helpers';
import { performance } from 'perf_hooks';

// Performance monitoring utilities
class PerformanceMonitor {
  private measurements: { [key: string]: number[] } = {};
  private memorySnapshots: { [key: string]: NodeJS.MemoryUsage } = {};

  startMeasurement(name: string): void {
    this.measurements[name] = this.measurements[name] || [];
    this.measurements[name].push(performance.now());
  }

  endMeasurement(name: string): number {
    if (!this.measurements[name] || this.measurements[name].length === 0) {
      throw new Error(`No active measurement for ${name}`);
    }
    
    const startTime = this.measurements[name].pop()!;
    const duration = performance.now() - startTime;
    
    // Store the measurement for analysis
    const measurementKey = `${name}_durations`;
    this.measurements[measurementKey] = this.measurements[measurementKey] || [];
    this.measurements[measurementKey].push(duration);
    
    return duration;
  }

  takeMemorySnapshot(name: string): void {
    this.memorySnapshots[name] = process.memoryUsage();
  }

  getMemoryDiff(startSnapshot: string, endSnapshot: string): NodeJS.MemoryUsage {
    const start = this.memorySnapshots[startSnapshot];
    const end = this.memorySnapshots[endSnapshot];
    
    if (!start || !end) {
      throw new Error('Memory snapshots not found');
    }

    return {
      rss: end.rss - start.rss,
      heapTotal: end.heapTotal - start.heapTotal,
      heapUsed: end.heapUsed - start.heapUsed,
      external: end.external - start.external,
      arrayBuffers: end.arrayBuffers - start.arrayBuffers
    };
  }

  getStatistics(measurementName: string): {
    count: number;
    min: number;
    max: number;
    mean: number;
    median: number;
    p95: number;
    p99: number;
    stdDev: number;
  } {
    const durations = this.measurements[`${measurementName}_durations`] || [];
    
    if (durations.length === 0) {
      throw new Error(`No measurements found for ${measurementName}`);
    }

    const sorted = durations.slice().sort((a, b) => a - b);
    const count = durations.length;
    const min = sorted[0];
    const max = sorted[count - 1];
    const mean = durations.reduce((sum, d) => sum + d, 0) / count;
    
    const median = count % 2 === 0 
      ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
      : sorted[Math.floor(count / 2)];
    
    const p95Index = Math.floor(count * 0.95);
    const p99Index = Math.floor(count * 0.99);
    const p95 = sorted[p95Index];
    const p99 = sorted[p99Index];
    
    const variance = durations.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    return { count, min, max, mean, median, p95, p99, stdDev };
  }

  reset(): void {
    this.measurements = {};
    this.memorySnapshots = {};
  }

  generateReport(): string {
    const report = ['Performance Report', '='.repeat(50)];
    
    Object.keys(this.measurements).forEach(key => {
      if (key.endsWith('_durations')) {
        const measurementName = key.replace('_durations', '');
        try {
          const stats = this.getStatistics(measurementName);
          report.push(`\n${measurementName}:`);
          report.push(`  Count: ${stats.count}`);
          report.push(`  Mean: ${stats.mean.toFixed(2)}ms`);
          report.push(`  Median: ${stats.median.toFixed(2)}ms`);
          report.push(`  Min/Max: ${stats.min.toFixed(2)}ms / ${stats.max.toFixed(2)}ms`);
          report.push(`  P95/P99: ${stats.p95.toFixed(2)}ms / ${stats.p99.toFixed(2)}ms`);
          report.push(`  Std Dev: ${stats.stdDev.toFixed(2)}ms`);
        } catch (error) {
          report.push(`\n${measurementName}: Error generating stats`);
        }
      }
    });

    return report.join('\n');
  }
}

describe('Performance Benchmarking Tests', () => {
  let mockServer: any;
  let apiClient: FlowiseApiClient;
  let monitor: PerformanceMonitor;
  const TEST_PORT = 3005;
  const TEST_URL = `http://localhost:${TEST_PORT}`;

  beforeAll(async () => {
    mockServer = await createMockServer(TEST_PORT, {
      enablePerformanceSimulation: true,
      responseDelays: {
        fast: 50,
        medium: 200,
        slow: 1000
      }
    });

    apiClient = new FlowiseApiClient({
      url: TEST_URL,
      timeout: 30000,
      retryAttempts: 1,
      cacheEnabled: false // Disable cache for accurate performance testing
    });

    monitor = new PerformanceMonitor();
  });

  afterAll(async () => {
    if (mockServer) {
      await mockServer.close();
    }
    
    // Output performance report
    console.log('\n' + monitor.generateReport());
  });

  beforeEach(() => {
    monitor.reset();
    jest.clearAllMocks();
  });

  describe('API Response Time Benchmarks', () => {
    it('should meet response time SLA for health check', async () => {
      const iterations = 50;
      const maxResponseTime = 100; // 100ms SLA

      for (let i = 0; i < iterations; i++) {
        monitor.startMeasurement('health_check');
        await apiClient.testConnection();
        const duration = monitor.endMeasurement('health_check');
        
        expect(duration).toBeLessThan(maxResponseTime);
      }

      const stats = monitor.getStatistics('health_check');
      expect(stats.p95).toBeLessThan(maxResponseTime);
      expect(stats.mean).toBeLessThan(maxResponseTime * 0.7); // Mean should be well below max
    });

    it('should meet response time SLA for flow listing', async () => {
      const iterations = 30;
      const maxResponseTime = 500; // 500ms SLA

      for (let i = 0; i < iterations; i++) {
        monitor.startMeasurement('list_flows');
        await apiClient.getFlows();
        const duration = monitor.endMeasurement('list_flows');
        
        expect(duration).toBeLessThan(maxResponseTime);
      }

      const stats = monitor.getStatistics('list_flows');
      expect(stats.p95).toBeLessThan(maxResponseTime);
    });

    it('should meet response time SLA for individual flow retrieval', async () => {
      const iterations = 25;
      const maxResponseTime = 300; // 300ms SLA

      for (let i = 0; i < iterations; i++) {
        monitor.startMeasurement('get_flow');
        await apiClient.getFlow('test-flow-123');
        const duration = monitor.endMeasurement('get_flow');
        
        expect(duration).toBeLessThan(maxResponseTime);
      }

      const stats = monitor.getStatistics('get_flow');
      expect(stats.p95).toBeLessThan(maxResponseTime);
    });

    it('should meet response time SLA for chat operations', async () => {
      const iterations = 20;
      const maxResponseTime = 2000; // 2 second SLA for chat

      for (let i = 0; i < iterations; i++) {
        monitor.startMeasurement('chat_request');
        await apiClient.chatWithFlow('test-flow-123', {
          question: `Test question ${i}`,
          chatId: `benchmark-chat-${i}`
        });
        const duration = monitor.endMeasurement('chat_request');
        
        expect(duration).toBeLessThan(maxResponseTime);
      }

      const stats = monitor.getStatistics('chat_request');
      expect(stats.p95).toBeLessThan(maxResponseTime);
    });

    it('should handle response time degradation gracefully', async () => {
      const baselineIterations = 10;
      const stressIterations = 50;

      // Measure baseline performance
      for (let i = 0; i < baselineIterations; i++) {
        monitor.startMeasurement('baseline_performance');
        await apiClient.getFlows();
        monitor.endMeasurement('baseline_performance');
      }

      const baselineStats = monitor.getStatistics('baseline_performance');

      // Measure performance under load
      const promises = Array.from({ length: stressIterations }, () => {
        monitor.startMeasurement('stress_performance');
        return apiClient.getFlows().then(() => {
          monitor.endMeasurement('stress_performance');
        });
      });

      await Promise.all(promises);

      const stressStats = monitor.getStatistics('stress_performance');

      // Performance degradation should be reasonable
      const degradationRatio = stressStats.mean / baselineStats.mean;
      expect(degradationRatio).toBeLessThan(3); // No more than 3x slower under load
    });
  });

  describe('Frontend Hook Performance Tests', () => {
    const createWrapper = () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      );
      return wrapper;
    };

    it('should validate flows within performance constraints', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const testSizes = [1, 5, 10, 25, 50];
      
      for (const size of testSizes) {
        const testFlow = TestData.createLargeFlow(size, 0.5);
        
        monitor.startMeasurement(`validation_${size}_nodes`);
        monitor.takeMemorySnapshot(`validation_${size}_start`);
        
        const validationResult = await result.current.validateFlow(testFlow);
        
        monitor.endMeasurement(`validation_${size}_nodes`);
        monitor.takeMemorySnapshot(`validation_${size}_end`);
        
        const memoryDiff = monitor.getMemoryDiff(
          `validation_${size}_start`,
          `validation_${size}_end`
        );
        
        expect(validationResult.isValid).toBeDefined();
        
        // Memory usage should scale reasonably
        const memoryPerNode = memoryDiff.heapUsed / size;
        expect(memoryPerNode).toBeLessThan(1024 * 1024); // Less than 1MB per node
      }

      // Validation time should scale sub-linearly
      const smallStats = monitor.getStatistics('validation_5_nodes');
      const largeStats = monitor.getStatistics('validation_50_nodes');
      
      const scalingRatio = largeStats.mean / smallStats.mean;
      const nodeRatio = 50 / 5; // 10x more nodes
      
      expect(scalingRatio).toBeLessThan(nodeRatio); // Should be better than linear scaling
    });

    it('should convert flows within performance constraints', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const conversionOptions = {
        format: 'typescript' as const,
        target: 'node' as const,
        outputPath: './output',
        includeTests: false,
        includeDocs: false,
        optimize: true
      };

      const testSizes = [1, 3, 5, 10];
      
      for (const size of testSizes) {
        const testFlow = TestData.createLargeFlow(size, 0.7);
        
        monitor.startMeasurement(`conversion_${size}_nodes`);
        monitor.takeMemorySnapshot(`conversion_${size}_start`);
        
        const conversionResult = await result.current.convertFlow(
          testFlow,
          conversionOptions
        );
        
        monitor.endMeasurement(`conversion_${size}_nodes`);
        monitor.takeMemorySnapshot(`conversion_${size}_end`);
        
        expect(conversionResult.success).toBeDefined();
        
        // Conversion should complete within reasonable time based on size
        const stats = monitor.getStatistics(`conversion_${size}_nodes`);
        const maxTimePerNode = 2000; // 2 seconds per node
        expect(stats.mean).toBeLessThan(size * maxTimePerNode);
      }
    });

    it('should handle file loading performance efficiently', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const fileSizes = [1024, 10240, 102400, 1024000]; // 1KB to 1MB
      
      for (const size of fileSizes) {
        const flow = TestData.createLargeFlow(Math.floor(size / 1000), 0.5);
        const jsonContent = JSON.stringify(flow);
        const paddedContent = jsonContent + ' '.repeat(Math.max(0, size - jsonContent.length));
        
        const file = new File([paddedContent], `test-${size}.json`, {
          type: 'application/json'
        });

        monitor.startMeasurement(`file_loading_${size}`);
        
        const loadedFlow = await result.current.loadFlowFromFile(file);
        
        const duration = monitor.endMeasurement(`file_loading_${size}`);
        
        expect(loadedFlow).toBeDefined();
        
        // File loading should be fast regardless of size (within reason)
        expect(duration).toBeLessThan(5000); // 5 seconds max
      }
    });

    it('should maintain performance consistency across multiple operations', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const testFlow = TestData.createLargeFlow(10, 0.6);
      const iterations = 20;
      
      // Perform multiple validation operations
      for (let i = 0; i < iterations; i++) {
        monitor.startMeasurement('consistency_validation');
        await result.current.validateFlow(testFlow);
        monitor.endMeasurement('consistency_validation');
      }

      const stats = monitor.getStatistics('consistency_validation');
      
      // Performance should be consistent (low standard deviation)
      const coefficientOfVariation = stats.stdDev / stats.mean;
      expect(coefficientOfVariation).toBeLessThan(0.5); // CV < 50%
      
      // No single operation should be more than 3x the median
      expect(stats.max).toBeLessThan(stats.median * 3);
    });
  });

  describe('Concurrent Operation Performance', () => {
    it('should handle concurrent API calls efficiently', async () => {
      const concurrencyLevels = [1, 5, 10, 20];
      
      for (const concurrency of concurrencyLevels) {
        monitor.startMeasurement(`concurrent_${concurrency}`);
        
        const promises = Array.from({ length: concurrency }, () =>
          apiClient.getFlows()
        );

        const results = await Promise.all(promises);
        
        monitor.endMeasurement(`concurrent_${concurrency}`);
        
        // All requests should succeed
        results.forEach(result => {
          expect(result.success).toBe(true);
        });
      }

      // Compare performance at different concurrency levels
      const serialStats = monitor.getStatistics('concurrent_1');
      const concurrentStats = monitor.getStatistics('concurrent_10');
      
      // Concurrent operations shouldn't be significantly slower than serial
      const efficiencyRatio = concurrentStats.mean / serialStats.mean;
      expect(efficiencyRatio).toBeLessThan(2); // No more than 2x slower per operation
    });

    it('should handle mixed operation types concurrently', async () => {
      const operations = [
        () => apiClient.testConnection(),
        () => apiClient.getFlows(),
        () => apiClient.getFlow('test-flow-123'),
        () => apiClient.chatWithFlow('test-flow-123', { question: 'Test' }),
        () => apiClient.getFlowHistory('test-flow-123')
      ];

      monitor.startMeasurement('mixed_concurrent_operations');
      monitor.takeMemorySnapshot('mixed_operations_start');

      const promises = Array.from({ length: 25 }, (_, i) => {
        const operation = operations[i % operations.length];
        return operation();
      });

      const results = await Promise.all(promises);
      
      monitor.endMeasurement('mixed_concurrent_operations');
      monitor.takeMemorySnapshot('mixed_operations_end');

      const memoryDiff = monitor.getMemoryDiff(
        'mixed_operations_start',
        'mixed_operations_end'
      );

      // Most operations should succeed
      const successCount = results.filter(r => r.success).length;
      expect(successCount).toBeGreaterThan(results.length * 0.8); // 80% success rate

      // Memory usage should be reasonable
      expect(memoryDiff.heapUsed).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
    });

    it('should scale performance linearly with worker count', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      const workerCounts = [1, 2, 4];
      const taskCount = 12; // Divisible by all worker counts
      
      for (const workers of workerCounts) {
        const tasksPerWorker = taskCount / workers;
        
        monitor.startMeasurement(`workers_${workers}`);
        
        const workerPromises = Array.from({ length: workers }, async () => {
          const tasks = Array.from({ length: tasksPerWorker }, () => {
            const testFlow = TestData.createLargeFlow(5, 0.5);
            return result.current.validateFlow(testFlow);
          });
          
          return Promise.all(tasks);
        });

        const results = await Promise.all(workerPromises);
        
        monitor.endMeasurement(`workers_${workers}`);
        
        // Verify all tasks completed
        const totalResults = results.flat();
        expect(totalResults).toHaveLength(taskCount);
      }

      // More workers should complete faster (up to a point)
      const oneWorkerStats = monitor.getStatistics('workers_1');
      const fourWorkerStats = monitor.getStatistics('workers_4');
      
      expect(fourWorkerStats.mean).toBeLessThan(oneWorkerStats.mean);
    });
  });

  describe('Memory Usage and Leak Detection', () => {
    it('should not leak memory during repeated operations', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      monitor.takeMemorySnapshot('leak_test_start');
      const initialMemory = process.memoryUsage();

      // Perform many operations that could potentially leak
      for (let i = 0; i < 100; i++) {
        const testFlow = TestData.createLargeFlow(10, 0.5);
        await result.current.validateFlow(testFlow);
        
        // Occasionally force garbage collection
        if (i % 20 === 0 && global.gc) {
          global.gc();
        }
      }

      // Force final garbage collection
      if (global.gc) {
        global.gc();
      }

      monitor.takeMemorySnapshot('leak_test_end');
      const finalMemory = process.memoryUsage();

      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      
      // Memory increase should be minimal (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });

    it('should handle large objects without excessive memory usage', async () => {
      const { result } = renderHook(() => useFlowiseConverter(), {
        wrapper: createWrapper()
      });

      monitor.takeMemorySnapshot('large_object_start');

      // Create and process a very large flow
      const largeFlow = TestData.createLargeFlow(200, 0.8);
      
      await result.current.validateFlow(largeFlow);
      
      monitor.takeMemorySnapshot('large_object_after_validation');
      
      await result.current.convertFlow(largeFlow, {
        format: 'typescript',
        target: 'node',
        outputPath: './output',
        includeTests: false,
        includeDocs: false,
        optimize: true
      });
      
      monitor.takeMemorySnapshot('large_object_after_conversion');

      const validationMemory = monitor.getMemoryDiff(
        'large_object_start',
        'large_object_after_validation'
      );

      const conversionMemory = monitor.getMemoryDiff(
        'large_object_after_validation',
        'large_object_after_conversion'
      );

      // Memory usage should be proportional to data size
      const nodeCount = largeFlow.nodes.length;
      const validationMemoryPerNode = validationMemory.heapUsed / nodeCount;
      const conversionMemoryPerNode = conversionMemory.heapUsed / nodeCount;

      expect(validationMemoryPerNode).toBeLessThan(512 * 1024); // 512KB per node for validation
      expect(conversionMemoryPerNode).toBeLessThan(1024 * 1024); // 1MB per node for conversion
    });

    it('should clean up resources after operations complete', async () => {
      const initialHandles = process.getActiveResourcesInfo?.() || [];
      const initialHandleCount = initialHandles.length;

      // Perform operations that might leave resources open
      await apiClient.testConnection();
      await apiClient.getFlows();
      await apiClient.chatWithFlow('test-flow-123', { question: 'Test' });

      // Wait for potential async cleanup
      await new Promise(resolve => setTimeout(resolve, 1000));

      const finalHandles = process.getActiveResourcesInfo?.() || [];
      const finalHandleCount = finalHandles.length;

      // Should not have significantly more handles open
      const handleIncrease = finalHandleCount - initialHandleCount;
      expect(handleIncrease).toBeLessThan(5); // Allow some variance
    });
  });

  describe('Load Testing Scenarios', () => {
    it('should maintain performance under sustained load', async () => {
      const duration = 30000; // 30 seconds
      const requestRate = 10; // 10 requests per second
      const interval = 1000 / requestRate;
      
      const startTime = Date.now();
      const results: any[] = [];
      
      while (Date.now() - startTime < duration) {
        const requestStart = Date.now();
        
        try {
          const result = await apiClient.getFlows();
          results.push({
            success: result.success,
            timestamp: Date.now(),
            duration: Date.now() - requestStart
          });
        } catch (error) {
          results.push({
            success: false,
            error: error,
            timestamp: Date.now(),
            duration: Date.now() - requestStart
          });
        }

        const elapsed = Date.now() - requestStart;
        const waitTime = Math.max(0, interval - elapsed);
        
        if (waitTime > 0) {
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }

      // Analyze results
      const successRate = results.filter(r => r.success).length / results.length;
      const avgResponseTime = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
      
      expect(successRate).toBeGreaterThan(0.95); // 95% success rate
      expect(avgResponseTime).toBeLessThan(1000); // Average response time under 1 second
      expect(results.length).toBeGreaterThan(duration / interval * 0.9); // Achieved close to target rate
    });

    it('should handle burst traffic gracefully', async () => {
      // Simulate normal load followed by burst
      const normalLoadRequests = 10;
      const burstRequests = 50;
      
      // Normal load phase
      monitor.startMeasurement('normal_load');
      
      const normalPromises = Array.from({ length: normalLoadRequests }, () =>
        apiClient.getFlows()
      );
      
      await Promise.all(normalPromises);
      monitor.endMeasurement('normal_load');
      
      // Burst phase
      monitor.startMeasurement('burst_load');
      
      const burstPromises = Array.from({ length: burstRequests }, () =>
        apiClient.getFlows()
      );
      
      const burstResults = await Promise.allSettled(burstPromises);
      monitor.endMeasurement('burst_load');
      
      // Analyze burst handling
      const burstSuccesses = burstResults.filter(r => 
        r.status === 'fulfilled' && r.value.success
      ).length;
      
      const burstSuccessRate = burstSuccesses / burstRequests;
      
      // Should handle majority of burst requests successfully
      expect(burstSuccessRate).toBeGreaterThan(0.7); // 70% success rate under burst
      
      const normalStats = monitor.getStatistics('normal_load');
      const burstStats = monitor.getStatistics('burst_load');
      
      // Performance degradation should be reasonable
      const degradationFactor = burstStats.mean / normalStats.mean;
      expect(degradationFactor).toBeLessThan(5); // No more than 5x slower
    });

    it('should recover quickly after load spikes', async () => {
      // Create load spike
      const spikePromises = Array.from({ length: 100 }, () =>
        apiClient.getFlows()
      );
      
      await Promise.allSettled(spikePromises);
      
      // Wait for potential recovery
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Measure recovery performance
      monitor.startMeasurement('recovery_test');
      
      const recoveryPromises = Array.from({ length: 10 }, () =>
        apiClient.getFlows()
      );
      
      const recoveryResults = await Promise.all(recoveryPromises);
      
      monitor.endMeasurement('recovery_test');
      
      // All recovery requests should succeed
      recoveryResults.forEach(result => {
        expect(result.success).toBe(true);
      });
      
      const recoveryStats = monitor.getStatistics('recovery_test');
      
      // Recovery performance should be close to normal
      expect(recoveryStats.mean).toBeLessThan(1000); // Under 1 second
    });
  });

  describe('Performance Regression Detection', () => {
    it('should maintain baseline performance benchmarks', async () => {
      // Define performance baselines (these would be updated as the system evolves)
      const baselines = {
        health_check: 100, // 100ms
        list_flows: 500,   // 500ms
        get_flow: 300,     // 300ms
        validate_flow: 200, // 200ms per 10 nodes
        convert_flow: 2000  // 2 seconds per 10 nodes
      };

      // Test each baseline
      for (const [operation, maxTime] of Object.entries(baselines)) {
        monitor.startMeasurement(`baseline_${operation}`);
        
        switch (operation) {
          case 'health_check':
            await apiClient.testConnection();
            break;
          case 'list_flows':
            await apiClient.getFlows();
            break;
          case 'get_flow':
            await apiClient.getFlow('test-flow-123');
            break;
          case 'validate_flow':
            const { result: hookResult } = renderHook(() => useFlowiseConverter(), {
              wrapper: createWrapper()
            });
            const testFlow = TestData.createLargeFlow(10, 0.5);
            await hookResult.current.validateFlow(testFlow);
            break;
          case 'convert_flow':
            const { result: convertHookResult } = renderHook(() => useFlowiseConverter(), {
              wrapper: createWrapper()
            });
            const convertFlow = TestData.createLargeFlow(10, 0.5);
            await convertHookResult.current.convertFlow(convertFlow, {
              format: 'typescript',
              target: 'node',
              outputPath: './output',
              includeTests: false,
              includeDocs: false,
              optimize: true
            });
            break;
        }
        
        const duration = monitor.endMeasurement(`baseline_${operation}`);
        
        expect(duration).toBeLessThan(maxTime);
      }
    });

    it('should track performance trends over time', async () => {
      // This test would typically run multiple times and store results
      // For now, we'll simulate trend analysis
      
      const operations = ['health_check', 'list_flows', 'get_flow'];
      const measurements: { [key: string]: number[] } = {};
      
      // Simulate multiple measurement sessions
      for (let session = 0; session < 5; session++) {
        for (const operation of operations) {
          monitor.startMeasurement(`trend_${operation}_${session}`);
          
          switch (operation) {
            case 'health_check':
              await apiClient.testConnection();
              break;
            case 'list_flows':
              await apiClient.getFlows();
              break;
            case 'get_flow':
              await apiClient.getFlow('test-flow-123');
              break;
          }
          
          const duration = monitor.endMeasurement(`trend_${operation}_${session}`);
          
          measurements[operation] = measurements[operation] || [];
          measurements[operation].push(duration);
        }
        
        // Small delay between sessions
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Analyze trends
      Object.entries(measurements).forEach(([operation, durations]) => {
        const firstHalf = durations.slice(0, Math.floor(durations.length / 2));
        const secondHalf = durations.slice(Math.floor(durations.length / 2));
        
        const firstHalfAvg = firstHalf.reduce((sum, d) => sum + d, 0) / firstHalf.length;
        const secondHalfAvg = secondHalf.reduce((sum, d) => sum + d, 0) / secondHalf.length;
        
        // Performance shouldn't significantly degrade over time
        const trendRatio = secondHalfAvg / firstHalfAvg;
        expect(trendRatio).toBeLessThan(1.5); // No more than 50% slower
      });
    });
  });

  const createWrapper = () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    );
    return wrapper;
  };
});