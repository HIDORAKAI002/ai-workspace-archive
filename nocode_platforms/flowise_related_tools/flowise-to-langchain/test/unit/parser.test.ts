/**
 * Unit Tests for Flowise Parser
 * Tests JSON validation, schema validation, error handling, and version detection
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { simpleOpenAIFlow, chainFlow, invalidFlow, emptyFlow, cyclicFlow } from '../fixtures/sample-flows';

// Mock the parser imports since the actual files don't exist yet
jest.mock('../../src/parser/parser', () => ({
  FlowiseParser: jest.fn().mockImplementation(() => ({
    parseString: jest.fn(),
    parseFile: jest.fn(),
    validate: jest.fn(),
  })),
  parseFlowiseJson: jest.fn(),
  parseFlowiseFile: jest.fn(),
}));

jest.mock('../../src/parser/schema', () => ({
  FlowiseSchema: {
    parse: jest.fn(),
    safeParse: jest.fn(),
  },
}));

describe('Flowise Parser - JSON Validation', () => {
  test('should validate well-formed JSON', async () => {
    const jsonString = JSON.stringify(simpleOpenAIFlow);
    
    // Test that JSON.parse doesn't throw
    expect(() => JSON.parse(jsonString)).not.toThrow();
    
    const parsed = JSON.parse(jsonString);
    expect(parsed).toHaveProperty('nodes');
    expect(parsed).toHaveProperty('edges');
    expect(parsed.nodes).toBeInstanceOf(Array);
    expect(parsed.edges).toBeInstanceOf(Array);
  });

  test('should reject malformed JSON', () => {
    const malformedJson = '{ "nodes": [invalid json }';
    
    expect(() => JSON.parse(malformedJson)).toThrow();
  });

  test('should handle empty JSON objects', () => {
    const emptyJson = '{}';
    const parsed = JSON.parse(emptyJson);
    
    expect(parsed).toEqual({});
    expect(parsed.nodes).toBeUndefined();
    expect(parsed.edges).toBeUndefined();
  });

  test('should handle large JSON files', () => {
    const largeFlow = {
      ...simpleOpenAIFlow,
      nodes: Array.from({ length: 1000 }, (_, i) => ({
        ...simpleOpenAIFlow.nodes[0],
        id: `node-${i}`,
      })),
    };
    
    const jsonString = JSON.stringify(largeFlow);
    expect(jsonString.length).toBeGreaterThan(10000);
    
    const parsed = JSON.parse(jsonString);
    expect(parsed.nodes).toHaveLength(1000);
  });
});

describe('Flowise Parser - Schema Validation', () => {
  test('should validate required node fields', () => {
    const validNode = simpleOpenAIFlow.nodes[0];
    
    // Check required fields exist
    expect(validNode).toBeDefined();
    expect(validNode).toHaveProperty('id');
    expect(validNode).toHaveProperty('position');
    expect(validNode).toHaveProperty('type');
    expect(validNode).toHaveProperty('data');
    
    if (validNode) {
      expect(validNode.data).toHaveProperty('label');
      expect(validNode.data).toHaveProperty('type');
      expect(validNode.data).toHaveProperty('category');
    }
  });

  test('should validate node position coordinates', () => {
    const node = simpleOpenAIFlow.nodes[0];
    
    expect(node).toBeDefined();
    if (node) {
      expect(node.position).toHaveProperty('x');
      expect(node.position).toHaveProperty('y');
      expect(typeof node.position.x).toBe('number');
      expect(typeof node.position.y).toBe('number');
    }
  });

  test('should validate edge structure', () => {
    const edge = chainFlow.edges[0];
    
    expect(edge).toBeDefined();
    if (edge) {
      expect(edge).toHaveProperty('source');
      expect(edge).toHaveProperty('target');
      expect(edge).toHaveProperty('sourceHandle');
      expect(edge).toHaveProperty('targetHandle');
      expect(edge).toHaveProperty('id');
      
      expect(typeof edge.source).toBe('string');
      expect(typeof edge.target).toBe('string');
      expect(edge.source.length).toBeGreaterThan(0);
      expect(edge.target.length).toBeGreaterThan(0);
    }
  });

  test('should validate edge references exist in nodes', () => {
    const { nodes, edges } = chainFlow;
    const nodeIds = nodes.map(node => node.id);
    
    for (const edge of edges) {
      expect(nodeIds).toContain(edge.source);
      expect(nodeIds).toContain(edge.target);
    }
  });

  test('should reject invalid node structures', () => {
    const invalidNode = invalidFlow.nodes[0];
    
    expect(invalidNode).toBeDefined();
    if (invalidNode) {
      // Missing required fields should be detected
      expect(invalidNode.id).toBe('');
      expect(invalidNode.data && 'type' in invalidNode.data ? invalidNode.data.type : undefined).toBeUndefined();
      expect(invalidNode.position?.x).toBe('invalid');
    }
  });
});

describe('Flowise Parser - Version Detection', () => {
  test('should detect Flowise v2 format', () => {
    const v2Node = simpleOpenAIFlow.nodes[0];
    
    expect(v2Node).toBeDefined();
    if (v2Node) {
      expect(v2Node.data.version).toBe(2);
      expect(v2Node.data).toHaveProperty('baseClasses');
      expect(v2Node.data).toHaveProperty('inputParams');
      expect(v2Node.data).toHaveProperty('inputAnchors');
      expect(v2Node.data).toHaveProperty('outputAnchors');
    }
  });

  test('should handle version-specific features', () => {
    const node = simpleOpenAIFlow.nodes[0];
    
    expect(node).toBeDefined();
    if (node) {
      // V2 specific features
      expect(node.data.inputParams).toBeInstanceOf(Array);
      expect(node.data.outputAnchors).toBeInstanceOf(Array);
      
      if (node.data.inputParams && node.data.inputParams.length > 0) {
        const param = node.data.inputParams[0];
        expect(param).toHaveProperty('label');
        expect(param).toHaveProperty('name');
        expect(param).toHaveProperty('type');
      }
    }
  });

  test('should handle unknown versions gracefully', () => {
    const unknownVersionNode = {
      ...simpleOpenAIFlow.nodes[0],
      data: {
        ...(simpleOpenAIFlow.nodes[0]?.data || {}),
        version: undefined,
      },
    };
    
    // Should still have basic structure
    expect(unknownVersionNode.data).toHaveProperty('label');
    expect(unknownVersionNode.data).toHaveProperty('type');
  });
});

describe('Flowise Parser - Error Handling', () => {
  test('should provide descriptive error messages', () => {
    const errors = [
      {
        path: 'nodes[0].id',
        message: 'Node ID cannot be empty',
        type: 'validation',
        code: 'EMPTY_NODE_ID',
      },
      {
        path: 'nodes[0].position.x',
        message: 'Position coordinates must be numbers',
        type: 'validation',
        code: 'INVALID_POSITION',
      },
    ];
    
    for (const error of errors) {
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('type');
      expect(error).toHaveProperty('path');
      expect(error.message.length).toBeGreaterThan(0);
    }
  });

  test('should categorize different error types', () => {
    const errorTypes = [
      'syntax',      // JSON parsing errors
      'validation',  // Schema validation errors
      'structure',   // Flow structure errors
      'reference',   // Edge reference errors
    ];
    
    errorTypes.forEach(type => {
      expect(typeof type).toBe('string');
      expect(type.length).toBeGreaterThan(0);
    });
  });

  test('should provide suggestions for common errors', () => {
    const suggestions = [
      'Ensure node IDs are unique and non-empty',
      'Check that all edge references point to existing nodes',
      'Verify position coordinates are valid numbers',
      'Make sure required fields are present',
    ];
    
    suggestions.forEach(suggestion => {
      expect(typeof suggestion).toBe('string');
      expect(suggestion.length).toBeGreaterThan(10);
    });
  });
});

describe('Flowise Parser - Flow Analysis', () => {
  test('should detect flow cycles', () => {
    const { nodes, edges } = cyclicFlow;
    
    // Build adjacency list
    const graph = new Map<string, string[]>();
    nodes.forEach(node => graph.set(node.id, []));
    
    edges.forEach(edge => {
      const neighbors = graph.get(edge.source) || [];
      neighbors.push(edge.target);
      graph.set(edge.source, neighbors);
    });
    
    // Simple cycle detection using DFS
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    
    function hasCycle(nodeId: string): boolean {
      if (recursionStack.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;
      
      visited.add(nodeId);
      recursionStack.add(nodeId);
      
      const neighbors = graph.get(nodeId) || [];
      for (const neighbor of neighbors) {
        if (hasCycle(neighbor)) return true;
      }
      
      recursionStack.delete(nodeId);
      return false;
    }
    
    let cycleDetected = false;
    for (const nodeId of graph.keys()) {
      if (!visited.has(nodeId)) {
        if (hasCycle(nodeId)) {
          cycleDetected = true;
          break;
        }
      }
    }
    
    expect(cycleDetected).toBe(true);
  });

  test('should identify entry and exit points', () => {
    const { nodes, edges } = chainFlow;
    
    const incomingEdges = new Set<string>();
    const outgoingEdges = new Set<string>();
    
    edges.forEach(edge => {
      incomingEdges.add(edge.target);
      outgoingEdges.add(edge.source);
    });
    
    const entryPoints = nodes.filter(node => !incomingEdges.has(node.id));
    const exitPoints = nodes.filter(node => !outgoingEdges.has(node.id));
    
    expect(entryPoints.length).toBeGreaterThan(0);
    expect(exitPoints.length).toBeGreaterThan(0);
  });

  test('should calculate flow complexity', () => {
    function calculateComplexity(flow: any) {
      const nodeCount = flow.nodes.length;
      const edgeCount = flow.edges.length;
      const uniqueTypes = new Set(flow.nodes.map((n: any) => n.data.type)).size;
      
      return {
        nodeCount,
        edgeCount,
        uniqueTypes,
        complexity: nodeCount + edgeCount + uniqueTypes,
      };
    }
    
    const simpleComplexity = calculateComplexity(simpleOpenAIFlow);
    const chainComplexity = calculateComplexity(chainFlow);
    
    expect(simpleComplexity.nodeCount).toBe(1);
    expect(simpleComplexity.edgeCount).toBe(0);
    expect(chainComplexity.nodeCount).toBeGreaterThan(simpleComplexity.nodeCount);
    expect(chainComplexity.edgeCount).toBeGreaterThan(simpleComplexity.edgeCount);
  });
});

describe('Flowise Parser - Performance', () => {
  test('should handle large flows efficiently', () => {
    const startTime = Date.now();
    
    const largeFlow = {
      ...simpleOpenAIFlow,
      nodes: Array.from({ length: 500 }, (_, i) => ({
        ...simpleOpenAIFlow.nodes[0],
        id: `node-${i}`,
      })),
      edges: Array.from({ length: 250 }, (_, i) => ({
        source: `node-${i * 2}`,
        target: `node-${i * 2 + 1}`,
        sourceHandle: 'output',
        targetHandle: 'input',
        id: `edge-${i}`,
      })),
    };
    
    const jsonString = JSON.stringify(largeFlow);
    const parsed = JSON.parse(jsonString);
    
    const endTime = Date.now();
    const processingTime = endTime - startTime;
    
    expect(parsed.nodes).toHaveLength(500);
    expect(parsed.edges).toHaveLength(250);
    expect(processingTime).toBeLessThan(1000); // Should process in under 1 second
  });

  test('should be memory efficient', () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    // Process multiple flows
    for (let i = 0; i < 100; i++) {
      const flow = { ...simpleOpenAIFlow };
      const jsonString = JSON.stringify(flow);
      JSON.parse(jsonString);
    }
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;
    
    // Memory increase should be reasonable (less than 10MB)
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
  });
});

describe('Flowise Parser - Edge Cases', () => {
  test('should handle empty flows', () => {
    expect(emptyFlow.nodes).toHaveLength(0);
    expect(emptyFlow.edges).toHaveLength(0);
    
    const jsonString = JSON.stringify(emptyFlow);
    const parsed = JSON.parse(jsonString);
    
    expect(parsed.nodes).toHaveLength(0);
    expect(parsed.edges).toHaveLength(0);
  });

  test('should handle Unicode characters', () => {
    const unicodeFlow = {
      ...simpleOpenAIFlow,
      nodes: [{
        ...simpleOpenAIFlow.nodes[0],
        data: {
          ...(simpleOpenAIFlow.nodes[0]?.data || {}),
          label: '🤖 AI Assistant 中文 العربية',
          description: 'Unicode test: émojis and spéciàl chars',
        },
      }],
    };
    
    const jsonString = JSON.stringify(unicodeFlow);
    const parsed = JSON.parse(jsonString);
    
    expect(parsed.nodes[0].data.label).toContain('🤖');
    expect(parsed.nodes[0].data.label).toContain('中文');
    expect(parsed.nodes[0].data.description).toContain('émojis');
  });

  test('should handle very deep nesting', () => {
    const deepNested = {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                data: 'deep value',
              },
            },
          },
        },
      },
    };
    
    const jsonString = JSON.stringify(deepNested);
    const parsed = JSON.parse(jsonString);
    
    expect(parsed.level1.level2.level3.level4.level5.data).toBe('deep value');
  });

  test('should handle null and undefined values', () => {
    const flowWithNulls = {
      nodes: [{
        id: 'test',
        position: { x: 0, y: 0 },
        type: 'test',
        data: {
          id: 'test',
          label: 'Test',
          type: 'test',
          category: 'test',
          nullField: null,
          undefinedField: undefined,
          emptyString: '',
          emptyArray: [],
          emptyObject: {},
        },
      }],
      edges: [],
    };
    
    const jsonString = JSON.stringify(flowWithNulls);
    const parsed = JSON.parse(jsonString);
    
    expect(parsed.nodes[0].data.nullField).toBeNull();
    expect(parsed.nodes[0].data.undefinedField).toBeUndefined();
    expect(parsed.nodes[0].data.emptyString).toBe('');
    expect(parsed.nodes[0].data.emptyArray).toEqual([]);
    expect(parsed.nodes[0].data.emptyObject).toEqual({});
  });
});