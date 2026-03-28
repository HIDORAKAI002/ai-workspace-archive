/**
 * Workflow Integration Tests
 * Tests complete end-to-end workflows from input to output
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { writeFile, mkdir, rm, readFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { spawn } from 'child_process';
import { promisify } from 'util';
import { ConversionService } from '../../src/api/services/conversion';
import { ConverterPipeline } from '../../src/converter';
import { simpleOpenAIFlow, chainFlow, complexFlow } from '../fixtures/sample-flows';

describe('End-to-End Workflow Integration', () => {
  let testDir: string;
  let conversionService: ConversionService;
  let pipeline: ConverterPipeline;

  beforeEach(async () => {
    testDir = join(tmpdir(), 'workflow-integration-' + Date.now());
    await mkdir(testDir, { recursive: true });
    conversionService = new ConversionService();
    pipeline = new ConverterPipeline({ verbose: false, silent: true });
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe('Complete Conversion Workflows', () => {
    test('should handle complete CLI to generated code workflow', async () => {
      // Arrange
      const inputFile = join(testDir, 'test-flow.json');
      const outputDir = join(testDir, 'generated');
      
      await writeFile(inputFile, JSON.stringify(simpleOpenAIFlow, null, 2));
      await mkdir(outputDir, { recursive: true });

      // Act - Run full conversion pipeline
      const result = await pipeline.convertFile(inputFile, {
        outputPath: outputDir,
        includeLangfuse: false,
        target: 'typescript',
        outputFormat: 'esm',
        includeComments: true,
        overwrite: true
      });

      // Assert - Verify complete workflow
      expect(result.success).toBe(true);
      expect(result.files).toHaveLength(3); // main, package.json, tsconfig.json
      expect(result.metrics.duration).toBeGreaterThan(0);
      expect(result.analysis.nodeCount).toBeGreaterThan(0);

      // Verify generated files are functional
      const mainFile = result.files.find(f => f.relativePath.includes('.ts'));
      expect(mainFile).toBeDefined();
      expect(mainFile!.size).toBeGreaterThan(0);

      // Read and verify main file content
      const mainContent = await readFile(mainFile!.path, 'utf-8');
      expect(mainContent).toContain('import');
      expect(mainContent).toContain('export');
      expect(mainContent).toContain('class');
    });

    test('should handle API service integration workflow', async () => {
      // Arrange
      const conversionRequest = {
        input: simpleOpenAIFlow,
        options: {
          withLangfuse: false,
          format: 'typescript' as const,
          target: 'node' as const,
          includeTests: true,
          includeDocs: true,
          outputFormat: 'esm' as const
        }
      };

      // Act - Run conversion through API service
      const response = await conversionService.convert(conversionRequest);

      // Assert
      expect(response.jobId).toBeDefined();
      expect(response.files).toHaveLength(3);
      expect(response.metrics.nodesProcessed).toBeGreaterThan(0);
      expect(response.analysis.complexity).toBe('simple');

      // Verify job tracking
      const jobStatus = conversionService.getJobStatus(response.jobId);
      expect(jobStatus).toBeDefined();
      expect(jobStatus!.status).toBe('completed');
      expect(jobStatus!.progress).toBe(100);
    });

    test('should handle batch processing workflow', async () => {
      // Arrange - Multiple flows
      const flows = [simpleOpenAIFlow, chainFlow, complexFlow];
      const results: any[] = [];

      // Act - Process each flow
      for (let i = 0; i < flows.length; i++) {
        const outputDir = join(testDir, `batch-${i}`);
        await mkdir(outputDir, { recursive: true });

        const result = await pipeline.convertContent(flows[i], {
          outputPath: outputDir,
          includeLangfuse: false,
          target: 'typescript',
          overwrite: true
        });

        results.push(result);
      }

      // Assert - All conversions successful
      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.success).toBe(true);
        expect(result.files.length).toBeGreaterThan(0);
      });

      // Verify batch processing efficiency
      const totalDuration = results.reduce((sum, r) => sum + r.metrics.duration, 0);
      expect(totalDuration).toBeLessThan(10000); // Should complete in under 10 seconds
    });
  });

  describe('Service Communication Integration', () => {
    test('should handle concurrent conversion requests', async () => {
      // Arrange - Multiple concurrent requests
      const requests = Array.from({ length: 5 }, () => ({
        input: simpleOpenAIFlow,
        options: {
          withLangfuse: false,
          format: 'typescript' as const
        }
      }));

      // Act - Run concurrent conversions
      const promises = requests.map(req => conversionService.convert(req));
      const results = await Promise.all(promises);

      // Assert - All requests completed successfully
      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(result.jobId).toBeDefined();
        expect(result.files).toHaveLength(3);
        expect(result.analysis).toBeDefined();
      });

      // Verify each job is tracked
      const allJobs = conversionService.getAllJobs();
      expect(allJobs).toHaveLength(5);
      allJobs.forEach(job => {
        expect(job.status).toBe('completed');
      });
    });

    test('should handle service event emission', async () => {
      // Arrange - Event listeners
      const events: any[] = [];
      
      conversionService.on('conversion:completed', (event) => {
        events.push({ type: 'completed', ...event });
      });

      conversionService.on('job:progress', (event) => {
        events.push({ type: 'progress', ...event });
      });

      // Act - Run conversion
      const result = await conversionService.convert({
        input: simpleOpenAIFlow,
        options: { format: 'typescript' as const }
      });

      // Assert - Events were emitted
      expect(events.length).toBeGreaterThan(0);
      
      const completedEvents = events.filter(e => e.type === 'completed');
      expect(completedEvents).toHaveLength(1);
      expect(completedEvents[0].jobId).toBe(result.jobId);

      const progressEvents = events.filter(e => e.type === 'progress');
      expect(progressEvents.length).toBeGreaterThan(0);
    });

    test('should handle service cleanup and resource management', async () => {
      // Arrange - Create multiple jobs
      const jobs = await Promise.all([
        conversionService.convert({ input: simpleOpenAIFlow, options: {} }),
        conversionService.convert({ input: chainFlow, options: {} }),
        conversionService.convert({ input: complexFlow, options: {} })
      ]);

      // Act - Cleanup old jobs
      const oldDate = new Date(Date.now() + 1000); // Future date to clean all
      conversionService.cleanupJobs(oldDate);

      // Assert - Jobs were cleaned up
      const remainingJobs = conversionService.getAllJobs();
      expect(remainingJobs).toHaveLength(0);
    });
  });

  describe('Database Integration Scenarios', () => {
    test('should handle persistent flow validation', async () => {
      // Mock database scenarios for validation
      const validationResults = [];

      // Test different flow types
      const flows = [simpleOpenAIFlow, chainFlow, complexFlow];
      
      for (const flow of flows) {
        const validation = await pipeline.validate(flow);
        validationResults.push({
          flowType: flow.nodes[0]?.data?.type || 'unknown',
          isValid: validation.isValid,
          errors: validation.errors,
          nodeCount: validation.analysis.nodeCount
        });
      }

      // Assert validation consistency
      expect(validationResults).toHaveLength(3);
      validationResults.forEach(result => {
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.nodeCount).toBeGreaterThan(0);
      });
    });

    test('should handle flow metadata persistence', async () => {
      // Simulate metadata storage/retrieval
      const flowMetadata = {
        flowId: 'test-flow-123',
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        nodeCount: simpleOpenAIFlow.nodes.length,
        edgeCount: simpleOpenAIFlow.edges.length
      };

      // Act - Convert with metadata tracking
      const result = await pipeline.convertContent(simpleOpenAIFlow, {
        context: {
          projectName: flowMetadata.flowId,
          targetLanguage: 'typescript',
          environment: { FLOW_VERSION: flowMetadata.version }
        }
      });

      // Assert - Metadata is preserved
      expect(result.success).toBe(true);
      expect(result.analysis.nodeCount).toBe(flowMetadata.nodeCount);
    });
  });

  describe('Error Propagation and Recovery', () => {
    test('should handle invalid JSON gracefully', async () => {
      // Arrange - Invalid JSON
      const invalidJson = '{ "nodes": [invalid json }';
      const inputFile = join(testDir, 'invalid.json');
      await writeFile(inputFile, invalidJson);

      // Act & Assert - Should handle error gracefully
      const result = await pipeline.convertFile(inputFile);
      
      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('JSON');
    });

    test('should recover from partial conversion failures', async () => {
      // Arrange - Flow with unsupported node type
      const mixedFlow = {
        ...simpleOpenAIFlow,
        nodes: [
          ...simpleOpenAIFlow.nodes,
          {
            id: 'unsupported-node',
            position: { x: 200, y: 200 },
            type: 'customNode',
            data: {
              id: 'unsupported-node',
              label: 'Unsupported Node',
              type: 'UnsupportedType',
              category: 'Unknown'
            }
          }
        ]
      };

      // Act - Should convert supported nodes and warn about unsupported
      const result = await pipeline.convertContent(mixedFlow);

      // Assert - Partial success with warnings
      expect(result.success).toBe(true); // Should succeed with warnings
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.files.length).toBeGreaterThan(0);
    });

    test('should handle service timeout and cancellation', async () => {
      // Arrange - Create a long-running job
      const promise = conversionService.convert({
        input: complexFlow,
        options: { format: 'typescript' as const }
      });

      // Get job ID from the service
      const jobs = conversionService.getAllJobs();
      let jobId: string;
      
      // Wait for job to start
      await new Promise(resolve => setTimeout(resolve, 100));
      const runningJobs = conversionService.getAllJobs().filter(j => j.status === 'running');
      
      if (runningJobs.length > 0) {
        jobId = runningJobs[0].id;
        
        // Act - Cancel the job
        const cancelled = await conversionService.cancelJob(jobId);
        
        // Assert - Job was cancelled
        expect(cancelled).toBe(true);
        
        const jobStatus = conversionService.getJobStatus(jobId);
        expect(jobStatus?.status).toBe('cancelled');
      }

      // Complete the original promise (should succeed despite cancellation test)
      const result = await promise;
      expect(result).toBeDefined();
    });
  });

  describe('Performance Under Load', () => {
    test('should handle memory constraints efficiently', async () => {
      // Arrange - Monitor memory usage
      const initialMemory = process.memoryUsage().heapUsed;
      const largeFlow = {
        nodes: Array.from({ length: 100 }, (_, i) => ({
          id: `node-${i}`,
          position: { x: i * 10, y: i * 10 },
          type: 'customNode',
          data: {
            id: `node-${i}`,
            label: `Node ${i}`,
            type: 'openAI',
            category: 'LLMs'
          }
        })),
        edges: Array.from({ length: 99 }, (_, i) => ({
          source: `node-${i}`,
          target: `node-${i + 1}`,
          id: `edge-${i}`
        }))
      };

      // Act - Process large flow
      const result = await pipeline.convertContent(largeFlow);

      // Assert - Memory usage is reasonable
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      expect(result.success).toBe(true);
      expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024); // Less than 100MB
    });

    test('should handle high throughput scenarios', async () => {
      // Arrange - Multiple rapid requests
      const startTime = Date.now();
      const batchSize = 10;
      
      const requests = Array.from({ length: batchSize }, (_, i) => ({
        input: simpleOpenAIFlow,
        options: { format: 'typescript' as const }
      }));

      // Act - Process in batches
      const results = await Promise.all(
        requests.map(req => conversionService.convert(req))
      );

      const duration = Date.now() - startTime;

      // Assert - High throughput achieved
      expect(results).toHaveLength(batchSize);
      results.forEach(result => {
        expect(result.files.length).toBeGreaterThan(0);
      });

      // Should complete within reasonable time
      expect(duration).toBeLessThan(30000); // 30 seconds for 10 conversions
      
      // Average processing time per request should be reasonable
      const avgTime = duration / batchSize;
      expect(avgTime).toBeLessThan(5000); // Less than 5 seconds per conversion
    });

    test('should maintain performance with concurrent operations', async () => {
      // Arrange - Mix of different operation types
      const operations = [
        // Conversions
        () => conversionService.convert({ input: simpleOpenAIFlow, options: {} }),
        () => conversionService.convert({ input: chainFlow, options: {} }),
        // Validations
        () => pipeline.validate(complexFlow),
        () => pipeline.validate(simpleOpenAIFlow),
        // Info requests
        () => pipeline.getInfo(),
        () => pipeline.getInfo()
      ];

      // Act - Run all operations concurrently
      const startTime = Date.now();
      const results = await Promise.allSettled(operations.map(op => op()));
      const duration = Date.now() - startTime;

      // Assert - All operations completed successfully
      const successful = results.filter(r => r.status === 'fulfilled');
      expect(successful.length).toBe(operations.length);
      
      // Performance should remain good under concurrent load
      expect(duration).toBeLessThan(15000); // 15 seconds for mixed operations
    });
  });

  describe('Cross-Service Data Consistency', () => {
    test('should maintain data consistency between CLI and API', async () => {
      // Arrange - Same input through different interfaces
      const inputFile = join(testDir, 'consistency-test.json');
      await writeFile(inputFile, JSON.stringify(simpleOpenAIFlow, null, 2));

      // Act - Convert through both CLI pipeline and API service
      const cliResult = await pipeline.convertFile(inputFile);
      const apiResult = await conversionService.convert({
        input: simpleOpenAIFlow,
        options: { format: 'typescript' as const }
      });

      // Assert - Results should be consistent
      expect(cliResult.success).toBe(apiResult.files.length > 0);
      expect(cliResult.analysis.nodeCount).toBe(apiResult.analysis.nodeCount);
      expect(cliResult.analysis.complexity).toBe(apiResult.analysis.complexity);
      
      // File counts should match (accounting for different output formats)
      expect(Math.abs(cliResult.files.length - apiResult.files.length)).toBeLessThanOrEqual(1);
    });

    test('should maintain validation consistency across services', async () => {
      // Arrange - Test flows with known characteristics
      const testFlows = [simpleOpenAIFlow, chainFlow, complexFlow];
      
      // Act - Validate through different methods
      const validationResults = await Promise.all(
        testFlows.map(async (flow) => {
          const pipelineValidation = await pipeline.validate(flow);
          
          // Simulate API validation (would go through conversion service)
          const conversionResult = await conversionService.convert({
            input: flow,
            options: { format: 'typescript' as const }
          });
          
          return {
            pipelineValid: pipelineValidation.isValid,
            apiSuccess: conversionResult.files.length > 0,
            nodeCount: pipelineValidation.analysis.nodeCount,
            apiNodeCount: conversionResult.analysis.nodeCount
          };
        })
      );

      // Assert - Consistency across services
      validationResults.forEach(result => {
        expect(result.pipelineValid).toBe(result.apiSuccess);
        expect(result.nodeCount).toBe(result.apiNodeCount);
      });
    });

    test('should handle state transitions consistently', async () => {
      // Arrange - Job lifecycle tracking
      const jobStates: string[] = [];
      const jobId = 'test-job-' + Date.now();

      // Mock job state tracking
      conversionService.on('job:progress', (event) => {
        if (event.jobId === jobId) {
          jobStates.push(`progress-${event.progress}`);
        }
      });

      conversionService.on('conversion:completed', (event) => {
        if (event.jobId === jobId) {
          jobStates.push('completed');
        }
      });

      // Act - Run conversion and track states
      const result = await conversionService.convert({
        input: simpleOpenAIFlow,
        options: { format: 'typescript' as const }
      });

      // Wait for events to propagate
      await new Promise(resolve => setTimeout(resolve, 100));

      // Assert - State transitions are logical
      expect(jobStates.length).toBeGreaterThan(0);
      expect(jobStates).toContain('completed');
      
      // Progress should increase monotonically
      const progressStates = jobStates
        .filter(s => s.startsWith('progress-'))
        .map(s => parseInt(s.split('-')[1]));
      
      for (let i = 1; i < progressStates.length; i++) {
        expect(progressStates[i]).toBeGreaterThanOrEqual(progressStates[i - 1]);
      }
    });
  });
});