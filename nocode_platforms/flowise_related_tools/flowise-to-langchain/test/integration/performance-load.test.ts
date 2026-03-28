/**
 * Performance and Load Integration Tests
 * Tests system performance under various load conditions and stress scenarios
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { Worker } from 'worker_threads';
import { writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { ConversionService } from '../../src/api/services/conversion';
import { ConverterPipeline } from '../../src/converter';
import { simpleOpenAIFlow, chainFlow, complexFlow } from '../fixtures/sample-flows';

describe('Performance and Load Integration Tests', () => {
  let testDir: string;
  let conversionService: ConversionService;
  let pipeline: ConverterPipeline;

  beforeEach(async () => {
    testDir = join(tmpdir(), 'perf-load-test-' + Date.now());
    await mkdir(testDir, { recursive: true });
    conversionService = new ConversionService();
    pipeline = new ConverterPipeline({ verbose: false, silent: true });
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe('High Throughput Scenarios', () => {
    test('should handle sustained high-volume conversions', async () => {
      // Arrange - High volume test parameters
      const batchSize = 20;
      const batchCount = 3;
      const totalConversions = batchSize * batchCount;
      
      const performanceMetrics = {
        totalRequests: 0,
        successfulConversions: 0,
        failedConversions: 0,
        totalDuration: 0,
        averageResponseTime: 0,
        throughputPerSecond: 0,
        peakMemoryUsage: 0,
        memoryLeaks: false
      };

      // Act - Execute sustained load
      const startTime = Date.now();
      const initialMemory = process.memoryUsage().heapUsed;

      for (let batch = 0; batch < batchCount; batch++) {
        const batchPromises = Array.from({ length: batchSize }, (_, i) => {
          const flowVariant = {
            ...simpleOpenAIFlow,
            id: `batch-${batch}-flow-${i}`,
            nodes: simpleOpenAIFlow.nodes.map(node => ({
              ...node,
              id: `${node.id}-${batch}-${i}`
            }))
          };

          return conversionService.convert({
            input: flowVariant,
            options: { format: 'typescript' as const }
          }).then(result => {
            performanceMetrics.totalRequests++;
            if (result.files.length > 0) {
              performanceMetrics.successfulConversions++;
            } else {
              performanceMetrics.failedConversions++;
            }
            return result;
          }).catch(error => {
            performanceMetrics.totalRequests++;
            performanceMetrics.failedConversions++;
            throw error;
          });
        });

        await Promise.allSettled(batchPromises);
        
        // Monitor memory usage between batches
        const currentMemory = process.memoryUsage().heapUsed;
        performanceMetrics.peakMemoryUsage = Math.max(
          performanceMetrics.peakMemoryUsage,
          currentMemory
        );

        // Brief pause between batches to simulate real-world usage
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const endTime = Date.now();
      performanceMetrics.totalDuration = endTime - startTime;
      performanceMetrics.averageResponseTime = performanceMetrics.totalDuration / performanceMetrics.totalRequests;
      performanceMetrics.throughputPerSecond = (performanceMetrics.totalRequests / performanceMetrics.totalDuration) * 1000;

      // Check for memory leaks
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      performanceMetrics.memoryLeaks = memoryIncrease > (50 * 1024 * 1024); // More than 50MB increase

      // Assert - Performance requirements met
      expect(performanceMetrics.totalRequests).toBe(totalConversions);
      expect(performanceMetrics.successfulConversions).toBeGreaterThan(totalConversions * 0.95); // 95% success rate
      expect(performanceMetrics.averageResponseTime).toBeLessThan(5000); // Under 5 seconds average
      expect(performanceMetrics.throughputPerSecond).toBeGreaterThan(1); // At least 1 conversion per second
      expect(performanceMetrics.memoryLeaks).toBe(false);
    });

    test('should maintain performance with concurrent users', async () => {
      // Arrange - Simulate multiple concurrent users
      const userCount = 5;
      const conversionsPerUser = 4;
      const userSessions: Promise<any>[] = [];

      // Act - Simulate concurrent user sessions
      for (let userId = 0; userId < userCount; userId++) {
        const userSession = (async () => {
          const userResults = [];
          const userStartTime = Date.now();

          for (let conversionIndex = 0; conversionIndex < conversionsPerUser; conversionIndex++) {
            const flow = userId % 2 === 0 ? simpleOpenAIFlow : chainFlow;
            const result = await conversionService.convert({
              input: {
                ...flow,
                id: `user-${userId}-conversion-${conversionIndex}`
              },
              options: { format: 'typescript' as const }
            });

            userResults.push({
              userId,
              conversionIndex,
              success: result.files.length > 0,
              duration: result.metrics.duration,
              files: result.files.length
            });

            // Simulate user think time
            await new Promise(resolve => setTimeout(resolve, 200));
          }

          const userDuration = Date.now() - userStartTime;
          return {
            userId,
            results: userResults,
            totalDuration: userDuration,
            averageDuration: userDuration / conversionsPerUser
          };
        })();

        userSessions.push(userSession);
      }

      const sessionResults = await Promise.all(userSessions);

      // Assert - All users had successful sessions
      expect(sessionResults.length).toBe(userCount);
      
      sessionResults.forEach(session => {
        expect(session.results.length).toBe(conversionsPerUser);
        
        const successfulConversions = session.results.filter(r => r.success).length;
        expect(successfulConversions).toBe(conversionsPerUser);
        
        // Each user's average response time should be reasonable
        expect(session.averageDuration).toBeLessThan(10000); // Under 10 seconds per conversion
      });

      // Verify overall system performance
      const allResults = sessionResults.flatMap(s => s.results);
      const successRate = allResults.filter(r => r.success).length / allResults.length;
      expect(successRate).toBe(1.0); // 100% success rate expected
    });

    test('should handle burst traffic patterns', async () => {
      // Arrange - Burst pattern: quiet -> spike -> quiet
      const burstSizes = [2, 15, 3]; // Small -> Large burst -> Small
      const burstResults: any[][] = [];

      // Act - Execute burst pattern
      for (let burstIndex = 0; burstIndex < burstSizes.length; burstIndex++) {
        const burstSize = burstSizes[burstIndex];
        const burstStartTime = Date.now();

        const burstPromises = Array.from({ length: burstSize }, (_, i) => 
          conversionService.convert({
            input: {
              ...complexFlow,
              id: `burst-${burstIndex}-request-${i}`
            },
            options: { format: 'typescript' as const }
          })
        );

        const burstResponse = await Promise.allSettled(burstPromises);
        const burstDuration = Date.now() - burstStartTime;

        burstResults.push(burstResponse.map((result, i) => ({
          burstIndex,
          requestIndex: i,
          success: result.status === 'fulfilled',
          duration: burstDuration
        })));

        // Wait between bursts
        if (burstIndex < burstSizes.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // Assert - System handled burst patterns effectively
      expect(burstResults.length).toBe(3);
      
      // Large burst (index 1) should still maintain good performance
      const largeBurstResults = burstResults[1];
      const largeBurstSuccessRate = largeBurstResults.filter(r => r.success).length / largeBurstResults.length;
      expect(largeBurstSuccessRate).toBeGreaterThan(0.8); // 80% success rate during burst

      // Smaller bursts should have perfect success rates
      const smallBurstResults = [...burstResults[0], ...burstResults[2]];
      const smallBurstSuccessRate = smallBurstResults.filter(r => r.success).length / smallBurstResults.length;
      expect(smallBurstSuccessRate).toBe(1.0); // 100% success rate for smaller loads
    });
  });

  describe('Resource Constraint Testing', () => {
    test('should handle memory-constrained environments', async () => {
      // Arrange - Monitor memory usage closely
      const memorySnapshots: number[] = [];
      const memoryThreshold = 100 * 1024 * 1024; // 100MB threshold

      const monitorMemory = () => {
        const usage = process.memoryUsage().heapUsed;
        memorySnapshots.push(usage);
        return usage;
      };

      // Act - Process large flows while monitoring memory
      const largeFlows = Array.from({ length: 10 }, (_, i) => ({
        ...complexFlow,
        nodes: [
          ...complexFlow.nodes,
          ...Array.from({ length: 20 }, (_, j) => ({
            id: `large-node-${i}-${j}`,
            position: { x: j * 50, y: i * 50 },
            type: 'customNode',
            data: {
              id: `large-node-${i}-${j}`,
              label: `Large Node ${i}-${j}`,
              type: 'openAI',
              category: 'LLMs',
              inputs: Array.from({ length: 5 }, (_, k) => `input-${k}`),
              outputs: Array.from({ length: 5 }, (_, k) => `output-${k}`)
            }
          }))
        ]
      }));

      monitorMemory(); // Initial snapshot

      for (const flow of largeFlows) {
        const beforeConversion = monitorMemory();
        
        await conversionService.convert({
          input: flow,
          options: { format: 'typescript' as const }
        });

        const afterConversion = monitorMemory();
        
        // Verify memory increase per conversion is reasonable
        const memoryIncrease = afterConversion - beforeConversion;
        expect(memoryIncrease).toBeLessThan(memoryThreshold);

        // Force garbage collection if available
        if (global.gc) {
          global.gc();
        }
      }

      // Assert - Memory usage remained stable
      const maxMemory = Math.max(...memorySnapshots);
      const minMemory = Math.min(...memorySnapshots);
      const memoryVariation = maxMemory - minMemory;

      expect(memoryVariation).toBeLessThan(memoryThreshold * 2); // Memory variation under 200MB
    });

    test('should handle CPU-intensive operations efficiently', async () => {
      // Arrange - CPU-intensive conversion scenarios
      const cpuIntensiveFlows = [
        // Complex flow with many nodes
        {
          ...complexFlow,
          nodes: Array.from({ length: 50 }, (_, i) => ({
            id: `cpu-node-${i}`,
            position: { x: i * 10, y: i * 10 },
            type: 'customNode',
            data: {
              id: `cpu-node-${i}`,
              type: 'conversationChain',
              category: 'Chains',
              inputs: { 
                llm: `node-${Math.max(0, i-1)}`,
                memory: `memory-${i}`,
                prompt: `prompt-${i}`
              }
            }
          })),
          edges: Array.from({ length: 49 }, (_, i) => ({
            source: `cpu-node-${i}`,
            target: `cpu-node-${i + 1}`,
            id: `edge-${i}`
          }))
        }
      ];

      // Act - Process CPU-intensive flows
      const startCpuUsage = process.cpuUsage();
      const startTime = Date.now();

      const results = await Promise.all(
        cpuIntensiveFlows.map(flow => 
          conversionService.convert({
            input: flow,
            options: { format: 'typescript' as const }
          })
        )
      );

      const endTime = Date.now();
      const cpuUsage = process.cpuUsage(startCpuUsage);
      const duration = endTime - startTime;

      // Assert - Efficient CPU usage
      expect(results.length).toBe(cpuIntensiveFlows.length);
      results.forEach(result => {
        expect(result.files.length).toBeGreaterThan(0);
      });

      // CPU efficiency check (user + system time should be reasonable)
      const totalCpuTime = (cpuUsage.user + cpuUsage.system) / 1000; // Convert to milliseconds
      const cpuEfficiency = totalCpuTime / duration;
      expect(cpuEfficiency).toBeLessThan(2.0); // CPU time should be less than 2x wall clock time
    });

    test('should handle disk I/O efficiently', async () => {
      // Arrange - Multiple concurrent file operations
      const fileOperations: Promise<any>[] = [];
      const tempFiles: string[] = [];

      // Create multiple flows and save to disk
      for (let i = 0; i < 10; i++) {
        const flowFile = join(testDir, `flow-${i}.json`);
        tempFiles.push(flowFile);
        
        const operation = (async () => {
          // Write flow to disk
          await writeFile(flowFile, JSON.stringify(simpleOpenAIFlow, null, 2));
          
          // Convert from file
          const result = await pipeline.convertFile(flowFile, {
            outputPath: join(testDir, `output-${i}`),
            includeLangfuse: false,
            target: 'typescript',
            overwrite: true
          });

          return {
            flowIndex: i,
            inputSize: (await require('fs').promises.stat(flowFile)).size,
            outputFiles: result.files.length,
            totalOutputSize: result.metrics.totalBytes
          };
        })();

        fileOperations.push(operation);
      }

      // Act - Execute all file operations concurrently
      const startTime = Date.now();
      const results = await Promise.all(fileOperations);
      const duration = Date.now() - startTime;

      // Assert - Efficient file I/O
      expect(results.length).toBe(10);
      results.forEach(result => {
        expect(result.outputFiles).toBeGreaterThan(0);
        expect(result.totalOutputSize).toBeGreaterThan(0);
      });

      // I/O efficiency check
      const averageOperationTime = duration / results.length;
      expect(averageOperationTime).toBeLessThan(2000); // Under 2 seconds per file operation
    });
  });

  describe('Stress Testing', () => {
    test('should handle extreme load conditions', async () => {
      // Arrange - Extreme load parameters
      const extremeLoad = {
        concurrentRequests: 25,
        requestsPerBatch: 5,
        batchCount: 5
      };

      const stressMetrics = {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        timeouts: 0,
        errors: []
      };

      // Act - Apply extreme load
      for (let batch = 0; batch < extremeLoad.batchCount; batch++) {
        const batchPromises: Promise<any>[] = [];

        for (let request = 0; request < extremeLoad.requestsPerBatch; request++) {
          for (let concurrent = 0; concurrent < extremeLoad.concurrentRequests; concurrent++) {
            const promise = conversionService.convert({
              input: {
                ...complexFlow,
                id: `stress-${batch}-${request}-${concurrent}`
              },
              options: { format: 'typescript' as const }
            }).then(result => {
              stressMetrics.totalRequests++;
              stressMetrics.successfulRequests++;
              return result;
            }).catch(error => {
              stressMetrics.totalRequests++;
              stressMetrics.failedRequests++;
              stressMetrics.errors.push(error.message);
              
              if (error.message.includes('timeout')) {
                stressMetrics.timeouts++;
              }
            });

            batchPromises.push(promise);
          }
        }

        await Promise.allSettled(batchPromises);
        
        // Brief recovery period between batches
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Assert - System survived extreme load
      expect(stressMetrics.totalRequests).toBeGreaterThan(0);
      
      const successRate = stressMetrics.successfulRequests / stressMetrics.totalRequests;
      expect(successRate).toBeGreaterThan(0.7); // At least 70% success rate under extreme load
      
      // Timeout rate should be manageable
      const timeoutRate = stressMetrics.timeouts / stressMetrics.totalRequests;
      expect(timeoutRate).toBeLessThan(0.3); // Less than 30% timeouts
    });

    test('should recover from system overload', async () => {
      // Arrange - Overload scenario followed by recovery
      const overloadResults: any[] = [];
      const recoveryResults: any[] = [];

      // Act - Phase 1: Overload the system
      const overloadPromises = Array.from({ length: 30 }, (_, i) =>
        conversionService.convert({
          input: complexFlow,
          options: { format: 'typescript' as const }
        }).then(result => ({ success: true, files: result.files.length }))
          .catch(error => ({ success: false, error: error.message }))
      );

      const overloadSettled = await Promise.allSettled(overloadPromises);
      overloadResults.push(...overloadSettled.map(r => 
        r.status === 'fulfilled' ? r.value : { success: false, error: 'Promise rejected' }
      ));

      // Brief pause to allow system recovery
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Phase 2: Normal load after recovery
      const recoveryPromises = Array.from({ length: 5 }, (_, i) =>
        conversionService.convert({
          input: simpleOpenAIFlow,
          options: { format: 'typescript' as const }
        }).then(result => ({ success: true, files: result.files.length }))
          .catch(error => ({ success: false, error: error.message }))
      );

      const recoverySettled = await Promise.all(recoveryPromises);
      recoveryResults.push(...recoverySettled);

      // Assert - System recovered successfully
      const overloadSuccessRate = overloadResults.filter(r => r.success).length / overloadResults.length;
      const recoverySuccessRate = recoveryResults.filter(r => r.success).length / recoveryResults.length;

      // During overload, some failures are expected
      expect(overloadSuccessRate).toBeGreaterThan(0.3); // At least 30% should succeed
      
      // After recovery, success rate should be much higher
      expect(recoverySuccessRate).toBeGreaterThan(0.8); // At least 80% should succeed after recovery
      expect(recoverySuccessRate).toBeGreaterThan(overloadSuccessRate); // Recovery should be better than overload
    });

    test('should handle long-running operations', async () => {
      // Arrange - Very large, complex flow that takes time to process
      const longRunningFlow = {
        nodes: Array.from({ length: 200 }, (_, i) => ({
          id: `long-node-${i}`,
          position: { x: (i % 20) * 50, y: Math.floor(i / 20) * 50 },
          type: 'customNode',
          data: {
            id: `long-node-${i}`,
            label: `Complex Node ${i}`,
            type: i % 3 === 0 ? 'conversationChain' : i % 3 === 1 ? 'openAI' : 'bufferMemory',
            category: i % 3 === 0 ? 'Chains' : i % 3 === 1 ? 'LLMs' : 'Memory',
            inputs: Array.from({ length: 3 }, (_, j) => `input-${j}`),
            outputs: Array.from({ length: 2 }, (_, j) => `output-${j}`)
          }
        })),
        edges: Array.from({ length: 199 }, (_, i) => ({
          source: `long-node-${i}`,
          target: `long-node-${i + 1}`,
          id: `long-edge-${i}`
        }))
      };

      // Act - Process long-running operation with timeout monitoring
      const timeout = 60000; // 60 second timeout
      const startTime = Date.now();

      const result = await Promise.race([
        conversionService.convert({
          input: longRunningFlow,
          options: { format: 'typescript' as const }
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Operation timeout')), timeout)
        )
      ]);

      const duration = Date.now() - startTime;

      // Assert - Long-running operation completed successfully
      expect(result).toBeDefined();
      expect((result as any).files).toBeDefined();
      expect((result as any).files.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(timeout);
      
      // Should complete in reasonable time even for large flows
      expect(duration).toBeLessThan(30000); // Under 30 seconds for 200 nodes
    });
  });
});