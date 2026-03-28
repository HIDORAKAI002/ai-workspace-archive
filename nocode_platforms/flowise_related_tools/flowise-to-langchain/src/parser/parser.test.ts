/**
 * Comprehensive tests for Flowise JSON Parser
 */

import { describe, test, expect, beforeEach } from '@jest/globals';
import {
  FlowiseParser,
  parseFlowiseJson,
  quickParse,
  validate,
  analyzeFlow,
  mergeFlows,
  type FlowiseChatFlow,
  // type ParserOptions as _ParserOptions, // Unused import
} from './index';

// Test data
const validFlowiseJson = {
  nodes: [
    {
      id: 'node1',
      position: { x: 100, y: 100 },
      type: 'customNode',
      data: {
        id: 'node1',
        label: 'Test Node',
        version: 2,
        name: 'testNode',
        type: 'llmChain',
        baseClasses: ['BaseChain'],
        category: 'llm',
        description: 'A test node',
        inputParams: [
          {
            label: 'Test Param',
            name: 'testParam',
            type: 'string',
            optional: false,
          },
        ],
        inputAnchors: [
          {
            id: 'input1',
            name: 'input',
            label: 'Input',
            type: 'BaseLanguageModel',
          },
        ],
        inputs: {
          testParam: 'test value',
        },
        outputAnchors: [
          {
            id: 'output1',
            name: 'output',
            label: 'Output',
            type: 'BaseChain',
          },
        ],
      },
    },
    {
      id: 'node2',
      position: { x: 300, y: 100 },
      type: 'customNode',
      data: {
        id: 'node2',
        label: 'Test Node 2',
        version: 2,
        name: 'testNode2',
        type: 'openAI',
        baseClasses: ['BaseLanguageModel'],
        category: 'llm',
        description: 'Another test node',
        inputParams: [],
        inputAnchors: [],
        inputs: {},
        outputAnchors: [
          {
            id: 'output1',
            name: 'output',
            label: 'Output',
            type: 'BaseLanguageModel',
          },
        ],
      },
    },
  ],
  edges: [
    {
      source: 'node2',
      sourceHandle: 'output1',
      target: 'node1',
      targetHandle: 'input1',
      id: 'edge1',
    },
  ],
  chatflow: {
    id: 'test-chatflow',
    name: 'Test Chatflow',
    flowData: '{}',
    deployed: false,
    isPublic: false,
    apikeyid: '',
    createdDate: '2024-01-01T00:00:00.000Z',
    updatedDate: '2024-01-01T00:00:00.000Z',
  },
};

const invalidFlowiseJson = {
  nodes: [
    {
      // Missing required fields
      id: '',
      position: { x: 'invalid', y: 100 },
      data: {
        // Missing required fields
      },
    },
  ],
  edges: [
    {
      // Invalid edge - references non-existent nodes
      source: 'nonexistent',
      target: 'alsononexistent',
      sourceHandle: 'output1',
      targetHandle: 'input1',
      id: 'edge1',
    },
  ],
};

describe('FlowiseParser', () => {
  let parser: FlowiseParser;

  beforeEach(() => {
    parser = new FlowiseParser({ strict: true });
  });

  describe('Schema Validation', () => {
    test('should validate correct Flowise JSON', async () => {
      const result = await parser.parseString(JSON.stringify(validFlowiseJson));

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.errors).toHaveLength(0);
      expect(result.metadata.nodeCount).toBe(2);
      expect(result.metadata.edgeCount).toBe(1);
    });

    test('should reject invalid JSON syntax', async () => {
      const result = await parser.parseString('{ invalid json }');

      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]?.type).toBe('syntax');
    });

    test('should detect validation errors', async () => {
      const result = await parser.parseString(
        JSON.stringify(invalidFlowiseJson)
      );

      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.type === 'validation')).toBe(true);
    });

    test('should validate edge references', async () => {
      const invalidEdgeFlow = {
        nodes: validFlowiseJson.nodes,
        edges: [
          {
            source: 'nonexistent',
            target: 'node1',
            sourceHandle: 'output1',
            targetHandle: 'input1',
            id: 'edge1',
          },
        ],
      };

      const result = await parser.parseString(JSON.stringify(invalidEdgeFlow));

      expect(result.success).toBe(false);
      expect(
        result.errors.some(
          (e) =>
            e.message.includes('reference existing nodes') ||
            e.message.includes('edges must reference existing nodes')
        )
      ).toBe(true);
    });
  });

  describe('Version Detection', () => {
    test('should detect Flowise v2', async () => {
      const result = await parser.parseString(JSON.stringify(validFlowiseJson));

      expect(result.success).toBe(true);
      expect(result.metadata.flowiseVersion).toBe('2.x');
    });

    test('should detect Flowise v1', async () => {
      const v1Flow = {
        ...validFlowiseJson,
        nodes: validFlowiseJson.nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            version: 1,
          },
        })),
      };

      const result = await parser.parseString(JSON.stringify(v1Flow));

      expect(result.success).toBe(true);
      expect(result.metadata.flowiseVersion).toBe('1.x');
    });

    test('should handle unknown versions', async () => {
      const unknownVersionFlow = {
        nodes: [
          {
            id: 'node1',
            position: { x: 100, y: 100 },
            type: 'customNode',
            data: {
              id: 'node1',
              label: 'Test',
              // No version field
              name: 'test',
              type: 'unknown',
              baseClasses: ['BaseChain'],
              category: 'unknown',
              description: 'test',
              inputParams: [],
              inputAnchors: [],
              inputs: {},
              outputAnchors: [],
            },
          },
        ],
        edges: [],
      };

      const result = await parser.parseString(
        JSON.stringify(unknownVersionFlow)
      );

      expect(result.success).toBe(true);
      expect(result.metadata.flowiseVersion).toBeUndefined();
    });
  });

  describe('Parser Options', () => {
    test('should respect minimal validation option', async () => {
      const parser = new FlowiseParser({ minimal: true });
      const result = await parser.parseString(
        JSON.stringify({
          nodes: [
            {
              id: 'test',
              type: 'test',
              data: { label: 'test', type: 'test', category: 'test' },
            },
          ],
          edges: [],
        })
      );

      expect(result.success).toBe(true);
    });

    test('should respect strict validation option', async () => {
      const parser = new FlowiseParser({ strict: true });
      const result = await parser.parseString(
        JSON.stringify(invalidFlowiseJson)
      );

      expect(result.success).toBe(false);
    });

    test('should handle custom error formatter', async () => {
      const customFormatter = (_issues: any[]) => 'Custom error format';
      const parser = new FlowiseParser({ errorFormatter: customFormatter });

      const result = await parser.parseString(
        JSON.stringify(invalidFlowiseJson)
      );

      expect(result.success).toBe(false);
    });

    test('should respect maxFileSize option', async () => {
      const parser = new FlowiseParser({ maxFileSize: 10 }); // 10 bytes
      const largeContent = JSON.stringify(validFlowiseJson);

      const result = await parser.parseString(largeContent);

      expect(result.success).toBe(false);
      expect(result.errors[0]?.message).toContain(
        'exceeds maximum allowed size'
      );
    });
  });

  describe('Warnings Generation', () => {
    test('should generate warnings for large flows', async () => {
      const largeFlow = {
        ...validFlowiseJson,
        nodes: Array.from({ length: 60 }, (_, i) => ({
          ...validFlowiseJson.nodes[0],
          id: `node${i}`,
        })),
      };

      const result = await parser.parseString(JSON.stringify(largeFlow));

      expect(result.success).toBe(true);
      expect(result.warnings.some((w) => w.type === 'performance')).toBe(true);
    });

    test('should warn about missing descriptions', async () => {
      const flowWithoutDescriptions = {
        ...validFlowiseJson,
        nodes: validFlowiseJson.nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            description: '',
          },
        })),
      };

      const result = await parser.parseString(
        JSON.stringify(flowWithoutDescriptions)
      );

      expect(result.success).toBe(true);
      expect(result.warnings.some((w) => w.type === 'best_practice')).toBe(
        true
      );
    });
  });

  describe('Error Handling', () => {
    test('should provide helpful error messages', async () => {
      const result = await parser.parseString(
        JSON.stringify(invalidFlowiseJson)
      );

      expect(result.success).toBe(false);
      expect(result.errors.every((e) => e.message.length > 0)).toBe(true);
      expect(result.errors.some((e) => e.suggestion)).toBe(true);
    });

    test('should handle unexpected errors gracefully', async () => {
      const parser = new FlowiseParser({
        preprocessor: () => {
          throw new Error('Preprocessor error');
        },
      });

      const result = await parser.parseString(JSON.stringify(validFlowiseJson));

      expect(result.success).toBe(false);
      expect(result.errors[0]?.type).toBe('structure');
    });
  });

  describe('Metadata Generation', () => {
    test('should generate comprehensive metadata', async () => {
      const result = await parser.parseString(JSON.stringify(validFlowiseJson));

      expect(result.metadata).toMatchObject({
        sourceType: 'string',
        nodeCount: 2,
        edgeCount: 1,
        complexity: 'simple',
        hasMetadata: true,
      });
      expect(result.metadata.parseTime).toBeGreaterThan(0);
      expect(result.metadata.timestamp).toBeGreaterThan(0);
    });

    test('should calculate complexity correctly', async () => {
      const complexFlow = {
        ...validFlowiseJson,
        nodes: Array.from({ length: 25 }, (_, i) => ({
          ...validFlowiseJson.nodes[0],
          id: `node${i}`,
        })),
        edges: Array.from({ length: 35 }, (_, i) => ({
          source: `node${i % 25}`,
          target: `node${(i + 1) % 25}`,
          sourceHandle: 'output1',
          targetHandle: 'input1',
          id: `edge${i}`,
        })),
      };

      const result = await parser.parseString(JSON.stringify(complexFlow));

      expect(result.success).toBe(true);
      expect(result.metadata.complexity).toBe('complex');
    });
  });
});

describe('Convenience Functions', () => {
  test('parseFlowiseJson should work', async () => {
    const result = await parseFlowiseJson(JSON.stringify(validFlowiseJson));

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  test('quickParse should work with string', async () => {
    const result = await quickParse(JSON.stringify(validFlowiseJson));

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  test('quickParse should work with Buffer', async () => {
    const buffer = Buffer.from(JSON.stringify(validFlowiseJson), 'utf-8');
    const result = await quickParse(buffer);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  test('validate function should work', async () => {
    const result = await validate(JSON.stringify(validFlowiseJson));

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('validate should detect errors', async () => {
    const result = await validate(JSON.stringify(invalidFlowiseJson));

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe('Flow Analysis', () => {
  test('should analyze flow correctly', () => {
    const analysis = analyzeFlow(validFlowiseJson as FlowiseChatFlow);

    expect(analysis.isValid).toBe(true);
    expect(analysis.entryPoints).toContain('node2');
    expect(analysis.exitPoints).toContain('node1');
    expect(analysis.nodeAnalysis).toHaveLength(2);
    expect(analysis.totalComplexity).toBeGreaterThan(0);
  });

  test('should detect cycles', () => {
    const cyclicFlow = {
      ...validFlowiseJson,
      edges: [
        ...validFlowiseJson.edges,
        {
          source: 'node1',
          target: 'node2',
          sourceHandle: 'output1',
          targetHandle: 'input1',
          id: 'edge2',
        },
      ],
    };

    const analysis = analyzeFlow(cyclicFlow as FlowiseChatFlow);

    expect(analysis.cycles.length).toBeGreaterThan(0);
    expect(analysis.isValid).toBe(false);
  });

  test('should detect orphaned nodes', () => {
    const flowWithOrphans = {
      ...validFlowiseJson,
      nodes: [
        ...validFlowiseJson.nodes,
        {
          ...validFlowiseJson.nodes[0],
          id: 'orphan',
        },
      ],
      edges: [], // No edges means all nodes are orphaned
    };

    const analysis = analyzeFlow(flowWithOrphans as FlowiseChatFlow);

    expect(analysis.orphanedNodes.length).toBeGreaterThan(0);
    expect(analysis.isValid).toBe(false);
  });
});

describe('Flow Merging', () => {
  test('should merge flows successfully', () => {
    const flow1 = validFlowiseJson as FlowiseChatFlow;
    const flow2 = {
      ...validFlowiseJson,
      nodes: [
        {
          ...validFlowiseJson.nodes[0],
          id: 'node3',
        },
      ],
      edges: [],
    } as FlowiseChatFlow;

    const merged = mergeFlows([flow1, flow2], { idConflictStrategy: 'rename' });

    expect(merged.nodes.length).toBe(3);
    expect(merged.edges.length).toBe(1);
  });

  test('should handle ID conflicts', () => {
    const flow1 = validFlowiseJson as FlowiseChatFlow;
    const flow2 = validFlowiseJson as FlowiseChatFlow; // Same IDs

    const merged = mergeFlows([flow1, flow2], { idConflictStrategy: 'rename' });

    expect(merged.nodes.length).toBe(4); // 2 + 2 renamed
    expect(new Set(merged.nodes.map((n) => n.id)).size).toBe(4); // All unique IDs
  });

  test('should throw on ID conflicts when strategy is error', () => {
    const flow1 = validFlowiseJson as FlowiseChatFlow;
    const flow2 = validFlowiseJson as FlowiseChatFlow;

    expect(() => {
      mergeFlows([flow1, flow2], { idConflictStrategy: 'error' });
    }).toThrow('Node ID conflict');
  });
});

describe('Edge Cases', () => {
  test('should handle empty flows', async () => {
    const emptyFlow = { nodes: [], edges: [] };
    const parser = new FlowiseParser();
    const result = await parser.parseString(JSON.stringify(emptyFlow));

    expect(result.success).toBe(false);
    expect(
      result.errors.some((e) => e.message.includes('at least one node'))
    ).toBe(true);
  });

  test('should handle very large files', async () => {
    const parser = new FlowiseParser({ maxFileSize: 1000000 }); // 1MB
    const largeFlow = {
      ...validFlowiseJson,
      nodes: Array.from({ length: 1000 }, (_, i) => ({
        ...validFlowiseJson.nodes[0],
        id: `node${i}`,
      })),
    };

    const result = await parser.parseString(JSON.stringify(largeFlow));

    expect(result.success).toBe(true);
    expect(result.metadata.nodeCount).toBe(1000);
  });

  test('should handle malformed Unicode', async () => {
    const malformedJson =
      '{"nodes": [{"id": "\uFFFD", "position": {"x": 0, "y": 0}}], "edges": []}';

    const result = await parseFlowiseJson(malformedJson);

    expect(result.success).toBe(false);
  });
});
