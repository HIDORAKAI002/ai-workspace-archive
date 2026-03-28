/**
 * Graph Representation and Analysis for Flowise-to-LangChain IR
 *
 * This module provides utilities for working with IR graphs, including
 * analysis, transformation, and optimization operations.
 */

import {
  IRGraph,
  IRNode,
  IRConnection,
  NodeId,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ValidationSuggestion,
} from './types.js';

/**
 * Graph traversal direction
 */
export type TraversalDirection = 'forward' | 'backward' | 'bidirectional';

/**
 * Graph traversal options
 */
export interface TraversalOptions {
  direction: TraversalDirection;
  visitOnce?: boolean;
  depthFirst?: boolean;
  includeStart?: boolean;
  maxDepth?: number;
  filter?: (node: IRNode) => boolean;
}

/**
 * Topological sort result
 */
export interface TopologicalSortResult {
  sorted: NodeId[];
  cycles: NodeId[][];
  isAcyclic: boolean;
}

/**
 * Path between two nodes
 */
export interface NodePath {
  nodes: NodeId[];
  connections: string[];
  length: number;
  isValid: boolean;
}

/**
 * Graph analysis statistics
 */
export interface GraphStats {
  nodeCount: number;
  connectionCount: number;
  averageDegree: number;
  maxDepth: number;
  complexity: 'simple' | 'medium' | 'complex';

  // Node type distribution
  nodeTypes: Record<string, number>;
  categories: Record<string, number>;

  // Connectivity analysis
  entryPoints: NodeId[];
  exitPoints: NodeId[];
  isolatedNodes: NodeId[];

  // Performance characteristics
  parallelizableChains: NodeId[][];
  bottlenecks: NodeId[];
  criticalPath: NodeId[];
}

/**
 * Subgraph extraction result
 */
export interface Subgraph {
  nodes: IRNode[];
  connections: IRConnection[];
  metadata: {
    extractedFrom: string;
    purpose: string;
    dependencies: NodeId[];
  };
}

/**
 * Graph transformation operation
 */
export interface GraphTransformation {
  type: 'merge' | 'split' | 'inline' | 'extract' | 'optimize' | 'simplify';
  description: string;
  apply: (graph: IRGraph) => IRGraph;
  validate: (graph: IRGraph) => boolean;
  reversible: boolean;
}

/**
 * Graph dependency information
 */
export interface DependencyInfo {
  node: NodeId;
  dependencies: NodeId[];
  dependents: NodeId[];
  level: number;
  isCritical: boolean;
  canParallelize: boolean;
}

/**
 * Graph execution plan
 */
export interface GraphExecutionPlan {
  phases: ExecutionPhase[];
  totalPhases: number;
  estimatedTime: number;
  parallelizationFactor: number;
  criticalPath: NodeId[];
}

/**
 * Execution phase in the plan
 */
export interface ExecutionPhase {
  id: string;
  nodes: NodeId[];
  dependencies: string[];
  canParallelize: boolean;
  estimatedTime: number;
  description: string;
}

/**
 * Node clustering result
 */
export interface NodeCluster {
  id: string;
  nodes: NodeId[];
  type: 'sequential' | 'parallel' | 'conditional' | 'loop';
  purpose: string;
  complexity: number;
  canOptimize: boolean;
}

/**
 * Graph pattern matching result
 */
export interface PatternMatch {
  pattern: string;
  nodes: NodeId[];
  confidence: number;
  optimization?: GraphTransformation;
  description: string;
}

/**
 * Graph utility class for analysis and manipulation
 */
export class IRGraphAnalyzer {
  /**
   * Validate an IR graph for correctness and completeness
   */
  static validate(graph: IRGraph): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];

    // Check for missing nodes referenced in connections
    for (const connection of graph.connections) {
      const sourceExists = graph.nodes.some((n) => n.id === connection.source);
      const targetExists = graph.nodes.some((n) => n.id === connection.target);

      if (!sourceExists) {
        errors.push({
          type: 'missing_node',
          message: `Connection references missing source node: ${connection.source}`,
          connectionId: connection.id,
          severity: 'error',
          fixSuggestion: 'Remove the connection or add the missing node',
        });
      }

      if (!targetExists) {
        errors.push({
          type: 'missing_node',
          message: `Connection references missing target node: ${connection.target}`,
          connectionId: connection.id,
          severity: 'error',
          fixSuggestion: 'Remove the connection or add the missing node',
        });
      }
    }

    // Check for circular dependencies
    const cycles = this.findCycles(graph);
    if (cycles.length > 0) {
      for (const cycle of cycles) {
        errors.push({
          type: 'circular_dependency',
          message: `Circular dependency detected: ${cycle.join(' → ')}`,
          severity: 'critical',
          fixSuggestion: 'Break the cycle by removing one of the connections',
        });
      }
    }

    // Check for isolated nodes
    const isolated = this.findIsolatedNodes(graph);
    for (const nodeId of isolated) {
      warnings.push({
        type: 'performance_concern',
        message: `Node ${nodeId} is isolated and may not contribute to the flow`,
        nodeId,
        suggestion: 'Connect this node or remove it if unnecessary',
      });
    }

    // Check for missing required parameters
    for (const node of graph.nodes || []) {
      for (const param of node.parameters) {
        if (
          param.required &&
          (param.value === undefined || param.value === null)
        ) {
          errors.push({
            type: 'missing_parameter',
            message: `Required parameter '${param.name}' is missing in node ${node.id}`,
            nodeId: node.id,
            parameterName: param.name,
            severity: 'error',
            fixSuggestion: `Provide a value for parameter '${param.name}'`,
          });
        }
      }
    }

    // Suggest optimizations
    const stats = this.analyzeGraph(graph);
    if (
      stats.complexity === 'complex' &&
      stats.parallelizableChains.length > 1
    ) {
      suggestions.push({
        type: 'optimization',
        message:
          'Consider parallelizing independent chains for better performance',
        impact: 'high',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }

  /**
   * Analyze graph structure and compute statistics
   */
  static analyzeGraph(graph: IRGraph): GraphStats {
    const nodeTypes: Record<string, number> = {};
    const categories: Record<string, number> = {};

    // Count node types and categories
    for (const node of graph.nodes || []) {
      nodeTypes[node.type] = (nodeTypes[node.type] || 0) + 1;
      categories[node.category] = (categories[node.category] || 0) + 1;
    }

    // Find entry and exit points
    const entryPoints = this.findEntryPoints(graph);
    const exitPoints = this.findExitPoints(graph);
    const isolatedNodes = this.findIsolatedNodes(graph);

    // Calculate complexity
    const complexity = this.calculateComplexity(graph);

    // Find parallelizable chains
    const parallelizableChains = this.findParallelizableChains(graph);

    // Identify bottlenecks
    const bottlenecks = this.findBottlenecks(graph);

    // Calculate critical path
    const criticalPath = this.findCriticalPath(graph);

    return {
      nodeCount: graph.nodes.length,
      connectionCount: graph.connections.length,
      averageDegree:
        (graph.connections.length * 2) / Math.max(graph.nodes.length, 1),
      maxDepth: this.calculateMaxDepth(graph),
      complexity,
      nodeTypes,
      categories,
      entryPoints,
      exitPoints,
      isolatedNodes,
      parallelizableChains,
      bottlenecks,
      criticalPath,
    };
  }

  /**
   * Find cycles in the graph using DFS
   */
  static findCycles(graph: IRGraph): NodeId[][] {
    const visited = new Set<NodeId>();
    const recursionStack = new Set<NodeId>();
    const cycles: NodeId[][] = [];
    const currentPath: NodeId[] = [];

    const dfs = (nodeId: NodeId): void => {
      visited.add(nodeId);
      recursionStack.add(nodeId);
      currentPath.push(nodeId);

      const outgoingConnections = graph.connections.filter(
        (c) => c.source === nodeId
      );

      for (const connection of outgoingConnections) {
        const targetId = connection.target;

        if (recursionStack.has(targetId)) {
          // Found a cycle
          const cycleStart = currentPath.indexOf(targetId);
          const cycle = currentPath.slice(cycleStart);
          cycles.push([...cycle, targetId]);
        } else if (!visited.has(targetId)) {
          dfs(targetId);
        }
      }

      recursionStack.delete(nodeId);
      currentPath.pop();
    };

    for (const node of graph.nodes || []) {
      if (!visited.has(node.id)) {
        dfs(node.id);
      }
    }

    return cycles;
  }

  /**
   * Perform topological sort of nodes
   */
  static topologicalSort(graph: IRGraph): TopologicalSortResult {
    const cycles = this.findCycles(graph);

    if (cycles.length > 0) {
      return {
        sorted: [],
        cycles,
        isAcyclic: false,
      };
    }

    const inDegree = new Map<NodeId, number>();
    const queue: NodeId[] = [];
    const sorted: NodeId[] = [];

    // Initialize in-degrees
    for (const node of graph.nodes || []) {
      inDegree.set(node.id, 0);
    }

    // Calculate in-degrees
    for (const connection of graph.connections) {
      const current = inDegree.get(connection.target) || 0;
      inDegree.set(connection.target, current + 1);
    }

    // Add nodes with no incoming edges to queue
    for (const [nodeId, degree] of inDegree) {
      if (degree === 0) {
        queue.push(nodeId);
      }
    }

    // Process queue
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      sorted.push(nodeId);

      // Update in-degrees of adjacent nodes
      const outgoingConnections = graph.connections.filter(
        (c) => c.source === nodeId
      );
      for (const connection of outgoingConnections) {
        const targetId = connection.target;
        const newDegree = (inDegree.get(targetId) || 0) - 1;
        inDegree.set(targetId, newDegree);

        if (newDegree === 0) {
          queue.push(targetId);
        }
      }
    }

    return {
      sorted,
      cycles: [],
      isAcyclic: sorted.length === graph.nodes.length,
    };
  }

  /**
   * Find the shortest path between two nodes
   */
  static findPath(graph: IRGraph, start: NodeId, end: NodeId): NodePath | null {
    if (start === end) {
      return {
        nodes: [start],
        connections: [],
        length: 0,
        isValid: true,
      };
    }

    const visited = new Set<NodeId>();
    const queue: { nodeId: NodeId; path: NodeId[]; connections: string[] }[] =
      [];

    queue.push({ nodeId: start, path: [start], connections: [] });
    visited.add(start);

    while (queue.length > 0) {
      const { nodeId, path, connections } = queue.shift()!;

      const outgoingConnections = graph.connections.filter(
        (c) => c.source === nodeId
      );

      for (const connection of outgoingConnections) {
        const targetId = connection.target;

        if (targetId === end) {
          return {
            nodes: [...path, targetId],
            connections: [...connections, connection.id],
            length: path.length,
            isValid: true,
          };
        }

        if (!visited.has(targetId)) {
          visited.add(targetId);
          queue.push({
            nodeId: targetId,
            path: [...path, targetId],
            connections: [...connections, connection.id],
          });
        }
      }
    }

    return null;
  }

  /**
   * Extract a subgraph containing specified nodes and their connections
   */
  static extractSubgraph(
    graph: IRGraph,
    nodeIds: NodeId[],
    includeDependencies = false
  ): Subgraph {
    const targetNodes = new Set(nodeIds);

    if (includeDependencies) {
      // Add all dependencies recursively
      const queue = [...nodeIds];
      const visited = new Set<NodeId>();

      while (queue.length > 0) {
        const nodeId = queue.shift()!;
        if (visited.has(nodeId)) continue;
        visited.add(nodeId);

        // Add incoming connections
        const incoming = graph.connections.filter((c) => c.target === nodeId);
        for (const connection of incoming) {
          if (!targetNodes.has(connection.source)) {
            targetNodes.add(connection.source);
            queue.push(connection.source);
          }
        }
      }
    }

    const nodes = graph.nodes.filter((node) => targetNodes.has(node.id));
    const connections = graph.connections.filter(
      (connection) =>
        targetNodes.has(connection.source) && targetNodes.has(connection.target)
    );

    const dependencies = graph.connections
      .filter((c) => targetNodes.has(c.target) && !targetNodes.has(c.source))
      .map((c) => c.source);

    return {
      nodes,
      connections,
      metadata: {
        extractedFrom: graph.metadata.name,
        purpose: 'Subgraph extraction',
        dependencies,
      },
    };
  }

  // Helper methods
  private static findEntryPoints(graph: IRGraph): NodeId[] {
    const hasIncoming = new Set(graph.connections.map((c) => c.target));
    return graph.nodes
      .filter((node) => !hasIncoming.has(node.id))
      .map((node) => node.id);
  }

  private static findExitPoints(graph: IRGraph): NodeId[] {
    const hasOutgoing = new Set(graph.connections.map((c) => c.source));
    return graph.nodes
      .filter((node) => !hasOutgoing.has(node.id))
      .map((node) => node.id);
  }

  private static findIsolatedNodes(graph: IRGraph): NodeId[] {
    const connected = new Set([
      ...graph.connections.map((c) => c.source),
      ...graph.connections.map((c) => c.target),
    ]);
    return graph.nodes
      .filter((node) => !connected.has(node.id))
      .map((node) => node.id);
  }

  private static calculateComplexity(
    graph: IRGraph
  ): 'simple' | 'medium' | 'complex' {
    const nodeCount = graph.nodes.length;
    const connectionCount = graph.connections.length;
    const cyclomaticComplexity = connectionCount - nodeCount + 2;

    if (nodeCount <= 5 && cyclomaticComplexity <= 3) return 'simple';
    if (nodeCount <= 20 && cyclomaticComplexity <= 10) return 'medium';
    return 'complex';
  }

  private static calculateMaxDepth(graph: IRGraph): number {
    const entryPoints = this.findEntryPoints(graph);
    let maxDepth = 0;

    const dfs = (nodeId: NodeId, depth: number, visited: Set<NodeId>): void => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      maxDepth = Math.max(maxDepth, depth);

      const outgoing = graph.connections.filter((c) => c.source === nodeId);
      for (const connection of outgoing) {
        dfs(connection.target, depth + 1, new Set(visited));
      }
    };

    for (const entryPoint of entryPoints) {
      dfs(entryPoint, 0, new Set());
    }

    return maxDepth;
  }

  private static findParallelizableChains(graph: IRGraph): NodeId[][] {
    // Find independent paths that can run in parallel
    const chains: NodeId[][] = [];
    const visited = new Set<NodeId>();

    for (const node of graph.nodes || []) {
      if (!visited.has(node.id)) {
        const chain = this.traceChain(graph, node.id, visited);
        if (chain.length > 1) {
          chains.push(chain);
        }
      }
    }

    return chains;
  }

  private static traceChain(
    graph: IRGraph,
    startNode: NodeId,
    visited: Set<NodeId>
  ): NodeId[] {
    const chain: NodeId[] = [];
    let currentNode = startNode;

    while (currentNode && !visited.has(currentNode)) {
      visited.add(currentNode);
      chain.push(currentNode);

      const outgoing = graph.connections.filter(
        (c) => c.source === currentNode
      );
      if (outgoing.length === 1 && outgoing[0]) {
        currentNode = outgoing[0].target;
      } else {
        break;
      }
    }

    return chain;
  }

  private static findBottlenecks(graph: IRGraph): NodeId[] {
    const bottlenecks: NodeId[] = [];

    for (const node of graph.nodes || []) {
      const incoming = graph.connections.filter((c) => c.target === node.id);
      const outgoing = graph.connections.filter((c) => c.source === node.id);

      // A node is a bottleneck if it has multiple incoming or outgoing connections
      if (incoming.length > 1 || outgoing.length > 1) {
        bottlenecks.push(node.id);
      }
    }

    return bottlenecks;
  }

  private static findCriticalPath(graph: IRGraph): NodeId[] {
    // Simplified critical path - find longest path from entry to exit
    const entryPoints = this.findEntryPoints(graph);
    const exitPoints = this.findExitPoints(graph);

    let longestPath: NodeId[] = [];

    for (const entry of entryPoints) {
      for (const exit of exitPoints) {
        const path = this.findPath(graph, entry, exit);
        if (path && path.nodes.length > longestPath.length) {
          longestPath = path.nodes;
        }
      }
    }

    return longestPath;
  }
}
