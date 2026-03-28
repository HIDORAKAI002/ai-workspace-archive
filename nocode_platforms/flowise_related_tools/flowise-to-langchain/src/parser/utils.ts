/**
 * Parser Utilities and Helpers
 *
 * This module provides utility functions for working with parsed Flowise data,
 * including data transformation, analysis, and helper methods.
 */

import {
  type FlowiseChatFlow,
  type FlowiseNode,
  type FlowiseEdge,
  type ParseResult,
  // type ParseError as _ParseError, // Unused import
  // type ParseWarning as _ParseWarning, // Unused import
} from './parser.js';

/**
 * Node analysis result
 */
export interface NodeAnalysis {
  nodeId: string;
  nodeType: string;
  category: string;
  hasRequiredInputs: boolean;
  missingInputs: string[];
  unusedOutputs: string[];
  connectedNodes: {
    inputs: string[];
    outputs: string[];
  };
  complexity: number;
  issues: string[];
}

/**
 * Flow analysis result
 */
export interface FlowAnalysis {
  isValid: boolean;
  entryPoints: string[];
  exitPoints: string[];
  cycles: string[][];
  orphanedNodes: string[];
  nodeAnalysis: NodeAnalysis[];
  totalComplexity: number;
  criticalPath: string[];
  recommendations: string[];
}

/**
 * Flow statistics
 */
export interface FlowStatistics {
  totalNodes: number;
  totalEdges: number;
  nodesByCategory: Record<string, number>;
  nodesByType: Record<string, number>;
  averageNodeConnections: number;
  maxDepth: number;
  cyclomaticComplexity: number;
  estimatedExecutionTime: number;
}

/**
 * Data transformation options
 */
export interface TransformOptions {
  /** Remove metadata that's not needed for processing */
  stripMetadata?: boolean;
  /** Normalize node IDs to sequential numbers */
  normalizeIds?: boolean;
  /** Remove unused nodes */
  removeOrphans?: boolean;
  /** Simplify complex structures */
  simplify?: boolean;
  /** Add missing default values */
  addDefaults?: boolean;
}

/**
 * Merge options for combining flows
 */
export interface MergeOptions {
  /** How to handle ID conflicts */
  idConflictStrategy: 'rename' | 'merge' | 'error';
  /** Whether to validate the merged result */
  validateResult?: boolean;
  /** Prefix for renamed nodes */
  renamePrefix?: string;
}

/**
 * Parse multiple Flowise files and combine results
 */
export async function parseMultipleFiles(
  filePaths: string[],
  options?: { stopOnError?: boolean; includeFailures?: boolean }
): Promise<{
  successful: ParseResult[];
  failed: Array<{ filePath: string; result: ParseResult }>;
  combined?: FlowiseChatFlow;
}> {
  const { stopOnError = false, includeFailures = true } = options || {};
  const successful: ParseResult[] = [];
  const failed: Array<{ filePath: string; result: ParseResult }> = [];

  const { parseFlowiseFile } = await import('./parser.js');

  for (const filePath of filePaths) {
    const result = await parseFlowiseFile(filePath);

    if (result.success) {
      successful.push(result);
    } else {
      failed.push({ filePath, result });
      if (stopOnError) {
        break;
      }
    }
  }

  // Attempt to combine successful results
  let combined: FlowiseChatFlow | undefined;
  if (successful.length > 1) {
    try {
      combined = mergeFlows(
        successful.map((r) => r.data!),
        { idConflictStrategy: 'rename', validateResult: true }
      );
    } catch (error) {
      // Ignore merge errors for now
    }
  } else if (successful.length === 1) {
    combined = successful[0]?.data;
  }

  return {
    successful: includeFailures
      ? successful
      : successful.filter((r) => r.success),
    failed,
    combined: combined!,
  };
}

/**
 * Analyze a parsed Flowise flow for issues and insights
 */
export function analyzeFlow(flow: FlowiseChatFlow): FlowAnalysis {
  const nodeMap = new Map(flow.nodes.map((node) => [node.id, node]));
  const edgeMap = new Map<string, FlowiseEdge[]>();

  // Build edge maps
  for (const edge of flow.edges) {
    if (!edgeMap.has(edge.source)) {
      edgeMap.set(edge.source, []);
    }
    if (!edgeMap.has(edge.target)) {
      edgeMap.set(edge.target, []);
    }
    edgeMap.get(edge.source)!.push(edge);
  }

  // Find entry and exit points
  const entryPoints = flow.nodes
    .filter((node) => !flow.edges.some((edge) => edge.target === node.id))
    .map((node) => node.id);

  const exitPoints = flow.nodes
    .filter((node) => !flow.edges.some((edge) => edge.source === node.id))
    .map((node) => node.id);

  // Detect cycles
  const cycles = detectCycles(flow);

  // Find orphaned nodes
  const connectedNodes = new Set([
    ...flow.edges.map((e) => e.source),
    ...flow.edges.map((e) => e.target),
  ]);
  const orphanedNodes = flow.nodes
    .filter((node) => !connectedNodes.has(node.id))
    .map((node) => node.id);

  // Analyze individual nodes
  const nodeAnalysis = flow.nodes.map((node) =>
    analyzeNode(node, flow, nodeMap, edgeMap)
  );

  // Calculate total complexity
  const totalComplexity = nodeAnalysis.reduce(
    (sum, analysis) => sum + analysis.complexity,
    0
  );

  // Find critical path
  const criticalPath = findCriticalPath(flow, nodeAnalysis);

  // Generate recommendations
  const recommendations = generateRecommendations(
    flow,
    nodeAnalysis,
    cycles,
    orphanedNodes
  );

  return {
    isValid: cycles.length === 0 && orphanedNodes.length === 0,
    entryPoints,
    exitPoints,
    cycles,
    orphanedNodes,
    nodeAnalysis,
    totalComplexity,
    criticalPath,
    recommendations,
  };
}

/**
 * Calculate statistics for a flow
 */
export function calculateFlowStatistics(flow: FlowiseChatFlow): FlowStatistics {
  const nodesByCategory: Record<string, number> = {};
  const nodesByType: Record<string, number> = {};

  for (const node of flow.nodes) {
    const category = node.data.category;
    const type = node.data.type;

    nodesByCategory[category] = (nodesByCategory[category] || 0) + 1;
    nodesByType[type] = (nodesByType[type] || 0) + 1;
  }

  const totalConnections = flow.edges.length * 2; // Each edge connects 2 nodes
  const averageNodeConnections =
    flow.nodes.length > 0 ? totalConnections / flow.nodes.length : 0;

  const maxDepth = calculateMaxDepth(flow);
  const cyclomaticComplexity = calculateCyclomaticComplexity(flow);
  const estimatedExecutionTime = estimateExecutionTime(flow);

  return {
    totalNodes: flow.nodes.length,
    totalEdges: flow.edges.length,
    nodesByCategory,
    nodesByType,
    averageNodeConnections,
    maxDepth,
    cyclomaticComplexity,
    estimatedExecutionTime,
  };
}

/**
 * Transform flow data according to options
 */
export function transformFlow(
  flow: FlowiseChatFlow,
  options: TransformOptions = {}
): FlowiseChatFlow {
  let transformedFlow = { ...flow };

  if (options.stripMetadata) {
    transformedFlow = stripUnnecessaryMetadata(transformedFlow);
  }

  if (options.normalizeIds) {
    transformedFlow = normalizeNodeIds(transformedFlow);
  }

  if (options.removeOrphans) {
    transformedFlow = removeOrphanedNodes(transformedFlow);
  }

  if (options.addDefaults) {
    transformedFlow = addDefaultValues(transformedFlow);
  }

  if (options.simplify) {
    transformedFlow = simplifyStructure(transformedFlow);
  }

  return transformedFlow;
}

/**
 * Merge multiple flows into one
 */
export function mergeFlows(
  flows: FlowiseChatFlow[],
  options: MergeOptions
): FlowiseChatFlow {
  if (flows.length === 0) {
    throw new Error('Cannot merge empty array of flows');
  }

  if (flows.length === 1) {
    return flows[0]!;
  }

  const mergedNodes: FlowiseNode[] = [];
  const mergedEdges: FlowiseEdge[] = [];
  const nodeIdMap = new Map<string, string>(); // original -> new mapping

  // Track used IDs to handle conflicts
  const usedIds = new Set<string>();

  for (let flowIndex = 0; flowIndex < flows.length; flowIndex++) {
    const flow = flows[flowIndex];
    if (!flow) continue;
    const prefix = options.renamePrefix || `flow${flowIndex}_`;

    // Process nodes
    for (const node of flow.nodes) {
      let newId = node.id;

      // Handle ID conflicts
      if (usedIds.has(newId)) {
        switch (options.idConflictStrategy) {
          case 'rename':
            newId = `${prefix}${node.id}`;
            while (usedIds.has(newId)) {
              newId = `${prefix}${Math.random().toString(36).substr(2, 9)}_${node.id}`;
            }
            break;
          case 'error':
            throw new Error(`Node ID conflict: ${newId}`);
          case 'merge':
            // Skip this node as it will be merged with existing
            continue;
        }
      }

      usedIds.add(newId);
      nodeIdMap.set(node.id, newId);

      mergedNodes.push({
        ...node,
        id: newId,
      });
    }

    // Process edges
    for (const edge of flow.edges || []) {
      const newSourceId = nodeIdMap.get(edge.source);
      const newTargetId = nodeIdMap.get(edge.target);

      if (newSourceId && newTargetId) {
        const newEdgeId = `${newSourceId}_to_${newTargetId}_${edge.sourceHandle}_${edge.targetHandle}`;

        mergedEdges.push({
          ...edge,
          id: newEdgeId,
          source: newSourceId,
          target: newTargetId,
        });
      }
    }
  }

  const mergedFlow: FlowiseChatFlow = {
    nodes: mergedNodes,
    edges: mergedEdges,
    chatflow: flows[0]?.chatflow
      ? {
          ...flows[0].chatflow,
          name: `Merged_${flows[0].chatflow?.name || 'Unknown'}`,
          id: `merged_${Date.now()}`,
        }
      : undefined,
  };

  // Validate result if requested
  if (options.validateResult) {
    const analysis = analyzeFlow(mergedFlow);
    if (!analysis.isValid) {
      throw new Error(
        `Merged flow validation failed: ${analysis.recommendations.join(', ')}`
      );
    }
  }

  return mergedFlow;
}

/**
 * Extract subflow containing only specified nodes
 */
export function extractSubflow(
  flow: FlowiseChatFlow,
  nodeIds: string[]
): FlowiseChatFlow {
  const nodeIdSet = new Set(nodeIds);

  const subflowNodes = flow.nodes.filter((node) => nodeIdSet.has(node.id));
  const subflowEdges = flow.edges.filter(
    (edge) => nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target)
  );

  return {
    nodes: subflowNodes,
    edges: subflowEdges,
    chatflow: flow.chatflow
      ? {
          ...flow.chatflow,
          name: `${flow.chatflow.name}_subflow`,
          id: `${flow.chatflow.id}_sub_${Date.now()}`,
        }
      : undefined,
  };
}

/**
 * Compare two flows and highlight differences
 */
export function compareFlows(
  flow1: FlowiseChatFlow,
  flow2: FlowiseChatFlow
): {
  addedNodes: FlowiseNode[];
  removedNodes: FlowiseNode[];
  modifiedNodes: Array<{ before: FlowiseNode; after: FlowiseNode }>;
  addedEdges: FlowiseEdge[];
  removedEdges: FlowiseEdge[];
} {
  const nodes1Map = new Map(flow1.nodes.map((n) => [n.id, n]));
  const nodes2Map = new Map(flow2.nodes.map((n) => [n.id, n]));
  const edges1Set = new Set(flow1.edges.map((e) => e.id));
  const edges2Set = new Set(flow2.edges.map((e) => e.id));

  const addedNodes = flow2.nodes.filter((n) => !nodes1Map.has(n.id));
  const removedNodes = flow1.nodes.filter((n) => !nodes2Map.has(n.id));
  const modifiedNodes: Array<{ before: FlowiseNode; after: FlowiseNode }> = [];

  // Check for modified nodes
  nodes2Map.forEach((node2, id) => {
    const node1 = nodes1Map.get(id);
    if (node1 && JSON.stringify(node1) !== JSON.stringify(node2)) {
      modifiedNodes.push({ before: node1, after: node2 });
    }
  });

  const addedEdges = flow2.edges.filter((e) => !edges1Set.has(e.id));
  const removedEdges = flow1.edges.filter((e) => !edges2Set.has(e.id));

  return {
    addedNodes,
    removedNodes,
    modifiedNodes,
    addedEdges,
    removedEdges,
  };
}

// Helper functions

function analyzeNode(
  node: FlowiseNode,
  flow: FlowiseChatFlow,
  _nodeMap: Map<string, FlowiseNode>,
  _edgeMap: Map<string, FlowiseEdge[]>
): NodeAnalysis {
  const incomingEdges = flow.edges.filter((e) => e.target === node.id);
  const outgoingEdges = flow.edges.filter((e) => e.source === node.id);

  const requiredInputs = node.data.inputAnchors.filter(
    (anchor) => !anchor.optional
  );
  const providedInputs = incomingEdges.map((e) => e.targetHandle);
  const missingInputs = requiredInputs
    .filter((input) => !providedInputs.includes(input.id))
    .map((input) => input.label);

  const availableOutputs = node.data.outputAnchors.map((anchor) => anchor.id);
  const usedOutputs = outgoingEdges.map((e) => e.sourceHandle);
  const unusedOutputs = availableOutputs.filter(
    (output) => !usedOutputs.includes(output)
  );

  const connectedInputNodes = incomingEdges.map((e) => e.source);
  const connectedOutputNodes = outgoingEdges.map((e) => e.target);

  // Calculate complexity based on various factors
  let complexity = 1; // Base complexity
  complexity += node.data.inputParams.length * 0.1;
  complexity += incomingEdges.length * 0.2;
  complexity += outgoingEdges.length * 0.2;

  const issues: string[] = [];
  if (missingInputs.length > 0) {
    issues.push(`Missing required inputs: ${missingInputs.join(', ')}`);
  }
  if (unusedOutputs.length > 0) {
    issues.push(`Unused outputs: ${unusedOutputs.join(', ')}`);
  }

  return {
    nodeId: node.id,
    nodeType: node.data.type,
    category: node.data.category,
    hasRequiredInputs: missingInputs.length === 0,
    missingInputs,
    unusedOutputs,
    connectedNodes: {
      inputs: connectedInputNodes,
      outputs: connectedOutputNodes,
    },
    complexity,
    issues,
  };
}

function detectCycles(flow: FlowiseChatFlow): string[][] {
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recStack = new Set<string>();
  const adjacencyList = new Map<string, string[]>();

  // Build adjacency list
  for (const node of flow.nodes) {
    adjacencyList.set(node.id, []);
  }
  for (const edge of flow.edges) {
    adjacencyList.get(edge.source)?.push(edge.target);
  }

  function dfs(nodeId: string, path: string[]): void {
    visited.add(nodeId);
    recStack.add(nodeId);
    path.push(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, [...path]);
      } else if (recStack.has(neighbor)) {
        // Found a cycle
        const cycleStart = path.indexOf(neighbor);
        cycles.push(path.slice(cycleStart));
      }
    }

    recStack.delete(nodeId);
  }

  for (const node of flow.nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id, []);
    }
  }

  return cycles;
}

function findCriticalPath(
  _flow: FlowiseChatFlow,
  nodeAnalysis: NodeAnalysis[]
): string[] {
  // Simple implementation - find longest path by complexity
  // Create complexity map for potential future use
  // const _complexityMap = new Map(nodeAnalysis.map((na) => [na.nodeId, na.complexity]));

  // For now, return the path with highest total complexity
  // This is a simplified version - a real critical path would consider dependencies
  return nodeAnalysis
    .sort((a, b) => b.complexity - a.complexity)
    .slice(0, Math.min(5, nodeAnalysis.length))
    .map((na) => na.nodeId);
}

function generateRecommendations(
  _flow: FlowiseChatFlow,
  nodeAnalysis: NodeAnalysis[],
  cycles: string[][],
  orphanedNodes: string[]
): string[] {
  const recommendations: string[] = [];

  if (cycles.length > 0) {
    recommendations.push(`Fix ${cycles.length} cycle(s) in the flow`);
  }

  if (orphanedNodes.length > 0) {
    recommendations.push(
      `Connect or remove ${orphanedNodes.length} orphaned node(s)`
    );
  }

  const nodesWithIssues = nodeAnalysis.filter((na) => na.issues.length > 0);
  if (nodesWithIssues.length > 0) {
    recommendations.push(`Resolve issues in ${nodesWithIssues.length} node(s)`);
  }

  const highComplexityNodes = nodeAnalysis.filter((na) => na.complexity > 5);
  if (highComplexityNodes.length > 0) {
    recommendations.push(
      `Consider simplifying ${highComplexityNodes.length} complex node(s)`
    );
  }

  return recommendations;
}

function calculateMaxDepth(flow: FlowiseChatFlow): number {
  // Implementation would calculate the maximum depth of the flow graph
  // For now, return a simple estimate
  return Math.ceil(Math.sqrt(flow.nodes.length));
}

function calculateCyclomaticComplexity(flow: FlowiseChatFlow): number {
  // Simplified cyclomatic complexity calculation
  // Real implementation: M = E - N + 2P (E=edges, N=nodes, P=connected components)
  return flow.edges.length - flow.nodes.length + 2;
}

function estimateExecutionTime(flow: FlowiseChatFlow): number {
  // Rough estimation based on node types and complexity
  let totalTime = 0;

  for (const node of flow.nodes) {
    switch (node.data.category) {
      case 'llm':
        totalTime += 2000; // 2 seconds for LLM calls
        break;
      case 'vectorstore':
        totalTime += 500; // 0.5 seconds for vector operations
        break;
      case 'loader':
        totalTime += 1000; // 1 second for loading operations
        break;
      default:
        totalTime += 100; // 0.1 seconds for simple operations
    }
  }

  return totalTime;
}

function stripUnnecessaryMetadata(flow: FlowiseChatFlow): FlowiseChatFlow {
  return {
    ...flow,
    nodes: flow.nodes.map((node) => ({
      ...node,
      selected: undefined,
      dragging: undefined,
      positionAbsolute: undefined,
      data: {
        ...node.data,
        selected: undefined,
      },
    })),
  };
}

function normalizeNodeIds(flow: FlowiseChatFlow): FlowiseChatFlow {
  const idMap = new Map<string, string>();
  const normalizedNodes = flow.nodes.map((node, index) => {
    const newId = `node_${index + 1}`;
    idMap.set(node.id, newId);
    return { ...node, id: newId };
  });

  const normalizedEdges = flow.edges.map((edge, index) => ({
    ...edge,
    id: `edge_${index + 1}`,
    source: idMap.get(edge.source) || edge.source,
    target: idMap.get(edge.target) || edge.target,
  }));

  return {
    ...flow,
    nodes: normalizedNodes,
    edges: normalizedEdges,
  };
}

function removeOrphanedNodes(flow: FlowiseChatFlow): FlowiseChatFlow {
  const connectedNodeIds = new Set([
    ...flow.edges.map((e) => e.source),
    ...flow.edges.map((e) => e.target),
  ]);

  return {
    ...flow,
    nodes: flow.nodes.filter((node) => connectedNodeIds.has(node.id)),
  };
}

function addDefaultValues(flow: FlowiseChatFlow): FlowiseChatFlow {
  return {
    ...flow,
    nodes: flow.nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        inputs: {
          ...node.data.inputs,
          // Add default values for missing inputs
          ...Object.fromEntries(
            node.data.inputParams
              .filter(
                (param) =>
                  param.default !== undefined &&
                  !(param.name in node.data.inputs)
              )
              .map((param) => [param.name, param.default])
          ),
        },
      },
    })),
  };
}

function simplifyStructure(flow: FlowiseChatFlow): FlowiseChatFlow {
  // Remove unnecessary fields and simplify structure
  return {
    nodes: flow.nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: {
        id: node.data.id,
        label: node.data.label,
        type: node.data.type,
        category: node.data.category,
        inputs: node.data.inputs,
        inputAnchors: node.data.inputAnchors,
        outputAnchors: node.data.outputAnchors,
      },
    })) as FlowiseNode[],
    edges: flow.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    })) as FlowiseEdge[],
    chatflow: flow.chatflow
      ? ({
          id: flow.chatflow.id,
          name: flow.chatflow.name,
          deployed: flow.chatflow.deployed,
          createdDate: flow.chatflow.createdDate,
          updatedDate: flow.chatflow.updatedDate,
        } as any)
      : undefined,
  };
}
