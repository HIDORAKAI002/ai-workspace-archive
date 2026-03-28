/**
 * Data Consistency and Recovery Integration Tests
 * Tests data integrity, consistency across services, and error recovery scenarios
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { writeFile, mkdir, rm, readFile, copyFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { EventEmitter } from 'events';
import { ConversionService } from '../../src/api/services/conversion';
import { ConverterPipeline } from '../../src/converter';
import { FlowiseToLangChainConverter } from '../../src/index';
import { simpleOpenAIFlow, chainFlow, complexFlow } from '../fixtures/sample-flows';

// Mock database interface for testing
class MockDatabase extends EventEmitter {
  private data: Map<string, any> = new Map();
  private transactions: Map<string, any> = new Map();
  private isConnected = true;

  async connect() {
    this.isConnected = true;
    this.emit('connected');
  }

  async disconnect() {
    this.isConnected = false;
    this.emit('disconnected');
  }

  async store(key: string, value: any, transactionId?: string) {
    if (!this.isConnected) throw new Error('Database not connected');
    
    if (transactionId) {
      if (!this.transactions.has(transactionId)) {
        this.transactions.set(transactionId, new Map());
      }
      this.transactions.get(transactionId).set(key, value);
    } else {
      this.data.set(key, { ...value, timestamp: Date.now() });
    }
    
    this.emit('stored', { key, value, transactionId });
  }

  async retrieve(key: string) {
    if (!this.isConnected) throw new Error('Database not connected');
    return this.data.get(key);
  }

  async commit(transactionId: string) {
    if (!this.transactions.has(transactionId)) {
      throw new Error('Transaction not found');
    }
    
    const transactionData = this.transactions.get(transactionId);
    for (const [key, value] of transactionData.entries()) {
      this.data.set(key, { ...value, timestamp: Date.now() });
    }
    
    this.transactions.delete(transactionId);
    this.emit('committed', { transactionId });
  }

  async rollback(transactionId: string) {
    this.transactions.delete(transactionId);
    this.emit('rolledback', { transactionId });
  }

  getAll() {
    return new Map(this.data);
  }

  clear() {
    this.data.clear();
    this.transactions.clear();
  }
}

describe('Data Consistency and Recovery Integration', () => {
  let testDir: string;
  let conversionService: ConversionService;
  let pipeline: ConverterPipeline;
  let converter: FlowiseToLangChainConverter;
  let mockDb: MockDatabase;

  beforeEach(async () => {
    testDir = join(tmpdir(), 'data-consistency-test-' + Date.now());
    await mkdir(testDir, { recursive: true });
    conversionService = new ConversionService();
    pipeline = new ConverterPipeline({ verbose: false, silent: true });
    converter = new FlowiseToLangChainConverter();
    mockDb = new MockDatabase();
    await mockDb.connect();
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
    await mockDb.disconnect();
    mockDb.clear();
  });

  describe('Cross-Service Data Consistency', () => {
    test('should maintain flow data integrity across different service interfaces', async () => {
      // Arrange - Same flow processed through different interfaces
      const flowId = 'consistency-test-flow';
      const testFlow = {
        ...simpleOpenAIFlow,
        id: flowId,
        metadata: {
          version: '1.0.0',
          createdAt: new Date().toISOString(),
          checksum: 'abc123'
        }
      };

      // Store original flow data
      await mockDb.store(`flow:${flowId}`, testFlow);

      // Act - Process through different service interfaces
      const cliResult = await pipeline.convertContent(testFlow, {
        context: {
          projectName: flowId,
          targetLanguage: 'typescript'
        }
      });

      const apiResult = await conversionService.convert({
        input: testFlow,
        options: { format: 'typescript' as const }
      });

      const directResult = await converter.convert(testFlow, {
        targetLanguage: 'typescript',
        projectName: flowId,
        outputPath: '',
        includeTests: false,
        includeDocs: false,
        packageManager: 'npm',
        environment: {},
        codeStyle: {
          indentSize: 2,
          useSpaces: true,
          semicolons: true,
          singleQuotes: true,
          trailingCommas: true
        }
      });

      // Store results for comparison
      await mockDb.store(`cli:${flowId}`, {
        success: cliResult.success,
        nodeCount: cliResult.analysis.nodeCount,
        fileCount: cliResult.files.length,
        complexity: cliResult.analysis.complexity
      });

      await mockDb.store(`api:${flowId}`, {
        success: apiResult.files.length > 0,
        nodeCount: apiResult.analysis.nodeCount,
        fileCount: apiResult.files.length,
        complexity: apiResult.analysis.complexity
      });

      await mockDb.store(`direct:${flowId}`, {
        success: directResult.success,
        nodeCount: directResult.result?.analysis?.nodeCount || 0,
        fileCount: directResult.result?.files?.length || 0
      });

      // Assert - Results are consistent across all interfaces
      const cliData = await mockDb.retrieve(`cli:${flowId}`);
      const apiData = await mockDb.retrieve(`api:${flowId}`);
      const directData = await mockDb.retrieve(`direct:${flowId}`);

      expect(cliData.success).toBe(apiData.success);
      expect(cliData.nodeCount).toBe(apiData.nodeCount);
      expect(cliData.complexity).toBe(apiData.complexity);
      
      // File counts may vary slightly due to different output formats
      expect(Math.abs(cliData.fileCount - apiData.fileCount)).toBeLessThanOrEqual(1);
      
      expect(directData.success).toBe(cliData.success);
      expect(directData.nodeCount).toBe(cliData.nodeCount);
    });

    test('should handle concurrent modifications consistently', async () => {
      // Arrange - Multiple concurrent operations on same flow
      const flowId = 'concurrent-test-flow';
      const baseFlow = { ...chainFlow, id: flowId };
      
      const operations = [
        // Operation 1: Add validation metadata
        async () => {
          const result = await pipeline.validate(baseFlow);
          await mockDb.store(`validation:${flowId}:${Date.now()}`, {
            isValid: result.isValid,
            nodeCount: result.analysis.nodeCount,
            timestamp: Date.now()
          });
          return result;
        },
        
        // Operation 2: Convert to TypeScript
        async () => {
          const result = await conversionService.convert({
            input: baseFlow,
            options: { format: 'typescript' as const }
          });
          await mockDb.store(`conversion:${flowId}:${Date.now()}`, {
            files: result.files.length,
            nodeCount: result.analysis.nodeCount,
            timestamp: Date.now()
          });
          return result;
        },
        
        // Operation 3: Get capabilities info
        async () => {
          const result = await pipeline.getInfo();
          await mockDb.store(`info:${flowId}:${Date.now()}`, {
            supportedTypes: result.supportedTypes.length,
            totalConverters: result.totalConverters,
            timestamp: Date.now()
          });
          return result;
        }
      ];

      // Act - Execute operations concurrently
      const results = await Promise.all(operations.map(op => op()));

      // Retrieve all stored data
      const allData = mockDb.getAll();
      const validationEntries = Array.from(allData.entries())
        .filter(([key]) => key.startsWith(`validation:${flowId}`));
      const conversionEntries = Array.from(allData.entries())
        .filter(([key]) => key.startsWith(`conversion:${flowId}`));

      // Assert - Data consistency maintained despite concurrency
      expect(results.length).toBe(3);
      expect(validationEntries.length).toBeGreaterThan(0);
      expect(conversionEntries.length).toBeGreaterThan(0);

      // Node counts should be consistent across operations
      const validationNodeCount = validationEntries[0][1].nodeCount;
      const conversionNodeCount = conversionEntries[0][1].nodeCount;
      expect(validationNodeCount).toBe(conversionNodeCount);
    });

    test('should maintain referential integrity in complex flows', async () => {
      // Arrange - Complex flow with cross-references
      const complexFlowWithRefs = {
        ...complexFlow,
        nodes: [
          {
            id: 'llm-1',
            data: { type: 'openAI', name: 'Primary LLM' }
          },
          {
            id: 'memory-1',
            data: { type: 'bufferMemory', name: 'Conversation Memory' }
          },
          {
            id: 'chain-1',
            data: { 
              type: 'conversationChain',
              name: 'Main Chain',
              inputs: {
                llm: 'llm-1',
                memory: 'memory-1'
              }
            }
          }
        ],
        edges: [
          { source: 'llm-1', target: 'chain-1', id: 'edge-1' },
          { source: 'memory-1', target: 'chain-1', id: 'edge-2' }
        ]
      };

      // Act - Convert and verify references
      const result = await conversionService.convert({
        input: complexFlowWithRefs,
        options: { format: 'typescript' as const }
      });

      // Store reference mapping
      const referenceMap = new Map();
      complexFlowWithRefs.nodes.forEach(node => {
        if (node.data.inputs) {
          Object.entries(node.data.inputs).forEach(([inputName, refId]) => {
            referenceMap.set(`${node.id}.${inputName}`, refId);
          });
        }
      });

      await mockDb.store('references', Object.fromEntries(referenceMap));

      // Verify all references exist
      const referencedNodes = new Set(referenceMap.values());
      const existingNodes = new Set(complexFlowWithRefs.nodes.map(n => n.id));

      // Assert - All references are valid
      expect(result.files.length).toBeGreaterThan(0);
      
      for (const refId of referencedNodes) {
        expect(existingNodes.has(refId as string)).toBe(true);
      }

      // Generated code should maintain these references
      const mainFile = result.files.find(f => f.path.endsWith('.ts'));
      expect(mainFile?.content).toContain('llm');
      expect(mainFile?.content).toContain('memory');
      expect(mainFile?.content).toContain('chain');
    });
  });

  describe('Transactional Data Operations', () => {
    test('should handle atomic conversion operations', async () => {
      // Arrange - Multi-step conversion process
      const transactionId = `tx-${Date.now()}`;
      const flows = [simpleOpenAIFlow, chainFlow, complexFlow];
      const results: any[] = [];

      try {
        // Act - Perform atomic conversion batch
        for (let i = 0; i < flows.length; i++) {
          const flow = flows[i];
          const result = await conversionService.convert({
            input: { ...flow, id: `batch-${i}` },
            options: { format: 'typescript' as const }
          });

          // Store intermediate results in transaction
          await mockDb.store(`conversion:${i}`, {
            flowId: `batch-${i}`,
            success: result.files.length > 0,
            files: result.files.length,
            nodeCount: result.analysis.nodeCount
          }, transactionId);

          results.push(result);

          // Simulate potential failure on last item
          if (i === flows.length - 1 && Math.random() > 0.7) {
            throw new Error('Simulated conversion failure');
          }
        }

        // Commit transaction if all successful
        await mockDb.commit(transactionId);

        // Assert - All conversions committed successfully
        expect(results.length).toBe(flows.length);
        results.forEach(result => {
          expect(result.files.length).toBeGreaterThan(0);
        });

        // Verify data is committed
        for (let i = 0; i < flows.length; i++) {
          const data = await mockDb.retrieve(`conversion:${i}`);
          expect(data).toBeDefined();
          expect(data.success).toBe(true);
        }

      } catch (error) {
        // Rollback transaction on failure
        await mockDb.rollback(transactionId);

        // Assert - No partial data committed
        for (let i = 0; i < flows.length; i++) {
          const data = await mockDb.retrieve(`conversion:${i}`);
          expect(data).toBeUndefined();
        }
      }
    });

    test('should maintain data consistency during service failures', async () => {
      // Arrange - Simulate service instability
      const originalConvert = conversionService.convert.bind(conversionService);
      let callCount = 0;

      // Mock intermittent failures
      conversionService.convert = async function(request) {
        callCount++;
        if (callCount === 2) {
          // Simulate service failure on second call
          throw new Error('Service temporarily unavailable');
        }
        return originalConvert(request);
      };

      const testData = [
        { id: 'flow-1', flow: simpleOpenAIFlow },
        { id: 'flow-2', flow: chainFlow },
        { id: 'flow-3', flow: complexFlow }
      ];

      const successfulConversions: any[] = [];
      const failedConversions: any[] = [];

      // Act - Process with failure handling
      for (const item of testData) {
        try {
          const result = await conversionService.convert({
            input: { ...item.flow, id: item.id },
            options: { format: 'typescript' as const }
          });

          await mockDb.store(`success:${item.id}`, {
            flowId: item.id,
            files: result.files.length,
            timestamp: Date.now()
          });

          successfulConversions.push({ id: item.id, result });

        } catch (error) {
          await mockDb.store(`failure:${item.id}`, {
            flowId: item.id,
            error: (error as Error).message,
            timestamp: Date.now()
          });

          failedConversions.push({ id: item.id, error });
        }
      }

      // Assert - Consistent data state despite failures
      expect(successfulConversions.length).toBe(2); // First and third should succeed
      expect(failedConversions.length).toBe(1);     // Second should fail

      // Verify database state
      const successData = await mockDb.retrieve('success:flow-1');
      const failureData = await mockDb.retrieve('failure:flow-2');
      const successData3 = await mockDb.retrieve('success:flow-3');

      expect(successData).toBeDefined();
      expect(failureData).toBeDefined();
      expect(successData3).toBeDefined();

      expect(successData.files).toBeGreaterThan(0);
      expect(failureData.error).toContain('Service temporarily unavailable');
    });

    test('should handle distributed transaction scenarios', async () => {
      // Arrange - Simulate distributed services
      const services = {
        conversion: conversionService,
        validation: pipeline,
        storage: mockDb
      };

      const distributedTransactionId = `dist-tx-${Date.now()}`;
      const flowData = { ...simpleOpenAIFlow, id: 'distributed-test' };

      // Act - Distributed transaction
      try {
        // Step 1: Validate (Service A)
        const validation = await services.validation.validate(flowData);
        if (!validation.isValid) {
          throw new Error('Validation failed');
        }

        await services.storage.store('step:validation', {
          flowId: flowData.id,
          isValid: validation.isValid,
          errors: validation.errors
        }, distributedTransactionId);

        // Step 2: Convert (Service B)
        const conversion = await services.conversion.convert({
          input: flowData,
          options: { format: 'typescript' as const }
        });

        await services.storage.store('step:conversion', {
          flowId: flowData.id,
          files: conversion.files.length,
          success: conversion.files.length > 0
        }, distributedTransactionId);

        // Step 3: Store metadata (Service C)
        await services.storage.store('step:metadata', {
          flowId: flowData.id,
          processingTime: Date.now(),
          version: '1.0.0'
        }, distributedTransactionId);

        // Commit distributed transaction
        await services.storage.commit(distributedTransactionId);

        // Assert - All steps committed successfully
        const validationData = await services.storage.retrieve('step:validation');
        const conversionData = await services.storage.retrieve('step:conversion');
        const metadataData = await services.storage.retrieve('step:metadata');

        expect(validationData).toBeDefined();
        expect(conversionData).toBeDefined();
        expect(metadataData).toBeDefined();

        expect(validationData.isValid).toBe(true);
        expect(conversionData.success).toBe(true);
        expect(metadataData.version).toBe('1.0.0');

      } catch (error) {
        // Rollback distributed transaction
        await services.storage.rollback(distributedTransactionId);
        throw error;
      }
    });
  });

  describe('Error Recovery and Data Integrity', () => {
    test('should recover from corrupted flow data', async () => {
      // Arrange - Corrupted flow scenarios
      const corruptedFlows = [
        // Missing required fields
        {
          nodes: [{ id: 'incomplete-node' }], // Missing data field
          edges: []
        },
        // Invalid references
        {
          nodes: [{ id: 'valid-node', data: { type: 'openAI' } }],
          edges: [{ source: 'nonexistent', target: 'valid-node', id: 'bad-edge' }]
        },
        // Circular references
        {
          nodes: [
            { id: 'node-a', data: { type: 'chain', inputs: { llm: 'node-b' } } },
            { id: 'node-b', data: { type: 'llm', inputs: { chain: 'node-a' } } }
          ],
          edges: [
            { source: 'node-a', target: 'node-b', id: 'edge-1' },
            { source: 'node-b', target: 'node-a', id: 'edge-2' }
          ]
        }
      ];

      const recoveryResults: any[] = [];

      // Act - Attempt recovery for each corrupted flow
      for (let i = 0; i < corruptedFlows.length; i++) {
        const corruptedFlow = corruptedFlows[i];
        
        try {
          // First try validation
          const validation = await pipeline.validate(corruptedFlow);
          
          if (validation.isValid) {
            // If valid, attempt conversion
            const result = await conversionService.convert({
              input: corruptedFlow,
              options: { format: 'typescript' as const }
            });
            
            recoveryResults.push({
              index: i,
              status: 'recovered',
              files: result.files.length,
              warnings: result.warnings.length
            });
          } else {
            // If invalid, record the issues
            recoveryResults.push({
              index: i,
              status: 'validation_failed',
              errors: validation.errors,
              warnings: validation.warnings
            });
          }

        } catch (error) {
          recoveryResults.push({
            index: i,
            status: 'error',
            error: (error as Error).message
          });
        }
      }

      // Assert - Appropriate recovery behavior
      expect(recoveryResults.length).toBe(corruptedFlows.length);

      // First flow (missing fields) should fail validation
      expect(recoveryResults[0].status).toBe('validation_failed');
      
      // Second flow (invalid references) should be caught
      expect(['validation_failed', 'error']).toContain(recoveryResults[1].status);
      
      // Third flow (circular references) should be detected
      expect(['validation_failed', 'error']).toContain(recoveryResults[2].status);
    });

    test('should maintain backup and recovery capabilities', async () => {
      // Arrange - Create backup scenarios
      const originalFlow = { ...simpleOpenAIFlow, id: 'backup-test' };
      const backupDir = join(testDir, 'backups');
      await mkdir(backupDir, { recursive: true });

      // Create initial conversion
      const originalResult = await conversionService.convert({
        input: originalFlow,
        options: { format: 'typescript' as const }
      });

      // Store backup data
      const backupData = {
        flow: originalFlow,
        result: {
          files: originalResult.files.length,
          analysis: originalResult.analysis,
          timestamp: Date.now()
        }
      };

      const backupFile = join(backupDir, 'flow-backup.json');
      await writeFile(backupFile, JSON.stringify(backupData, null, 2));

      // Simulate data corruption/loss
      const corruptedFlow = {
        ...originalFlow,
        nodes: [] // Simulate data loss
      };

      // Act - Recovery process
      let recoveredResult;
      
      try {
        // Attempt normal conversion (will fail)
        await conversionService.convert({
          input: corruptedFlow,
          options: { format: 'typescript' as const }
        });
      } catch (error) {
        // Recovery: restore from backup
        const backupContent = await readFile(backupFile, 'utf-8');
        const backup = JSON.parse(backupContent);
        
        recoveredResult = await conversionService.convert({
          input: backup.flow,
          options: { format: 'typescript' as const }
        });
      }

      // Assert - Successful recovery
      expect(recoveredResult).toBeDefined();
      expect(recoveredResult!.files.length).toBe(originalResult.files.length);
      expect(recoveredResult!.analysis.nodeCount).toBe(originalResult.analysis.nodeCount);
    });

    test('should handle incremental recovery scenarios', async () => {
      // Arrange - Multi-stage recovery process
      const partialFlows = [
        // Stage 1: Basic flow
        {
          nodes: [{ id: 'llm-1', data: { type: 'openAI' } }],
          edges: []
        },
        // Stage 2: Add memory
        {
          nodes: [
            { id: 'llm-1', data: { type: 'openAI' } },
            { id: 'memory-1', data: { type: 'bufferMemory' } }
          ],
          edges: []
        },
        // Stage 3: Connect with chain
        {
          nodes: [
            { id: 'llm-1', data: { type: 'openAI' } },
            { id: 'memory-1', data: { type: 'bufferMemory' } },
            { id: 'chain-1', data: { type: 'conversationChain', inputs: { llm: 'llm-1', memory: 'memory-1' } } }
          ],
          edges: [
            { source: 'llm-1', target: 'chain-1', id: 'edge-1' },
            { source: 'memory-1', target: 'chain-1', id: 'edge-2' }
          ]
        }
      ];

      const incrementalResults: any[] = [];

      // Act - Process incremental recovery
      for (let stage = 0; stage < partialFlows.length; stage++) {
        const flow = { ...partialFlows[stage], id: `incremental-${stage}` };
        
        const result = await conversionService.convert({
          input: flow,
          options: { format: 'typescript' as const }
        });

        incrementalResults.push({
          stage,
          nodeCount: flow.nodes.length,
          edgeCount: flow.edges.length,
          files: result.files.length,
          complexity: result.analysis.complexity
        });

        // Store incremental state
        await mockDb.store(`incremental:stage-${stage}`, {
          flow,
          result: {
            files: result.files.length,
            analysis: result.analysis
          }
        });
      }

      // Assert - Successful incremental recovery
      expect(incrementalResults.length).toBe(3);
      
      // Verify progression
      expect(incrementalResults[0].nodeCount).toBe(1);
      expect(incrementalResults[1].nodeCount).toBe(2);
      expect(incrementalResults[2].nodeCount).toBe(3);
      
      // All stages should produce valid output
      incrementalResults.forEach(result => {
        expect(result.files).toBeGreaterThan(0);
      });

      // Complexity should increase with more nodes
      expect(incrementalResults[2].complexity).not.toBe('simple');
    });
  });
});