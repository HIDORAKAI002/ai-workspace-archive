/**
 * Intermediate Representation (IR) Module
 *
 * This module provides a complete IR system for converting Flowise chatflows
 * to LangChain code. It includes type definitions, graph analysis, node handling,
 * and transformation utilities.
 */

// Selective exports to avoid conflicts
export type {
  IRNode,
  IRGraph,
  IRConnection,
  GenerationContext,
  CodeGenerationResult,
  GeneratedFile,
  ValidationResult,
  FlowiseChatFlow,
  FlowiseNode,
  FlowiseEdge,
  ConversionMetrics,
  TransformationMetrics,
  GraphStats,
  TransformationResult,
} from './types.js';

export { IRGraphAnalyzer } from './graph.js';
export { FlowiseToIRTransformer, IRToCodeTransformer } from './transformer.js';

// Import classes for processor
import { FlowiseToIRTransformer, IRToCodeTransformer } from './transformer.js';
import { IRGraphAnalyzer } from './graph.js';
import type {
  FlowiseChatFlow,
  GenerationContext,
  IRGraph,
  ValidationResult,
  TransformationResult,
  CodeGenerationResult,
  GraphStats,
  NodeId,
} from './types.js';

// Note: Main types are exported via "export * from" statements above
// Only export non-conflicting additional exports here

// Export additional utility interfaces
export interface IRConversionMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  nodeCount?: number;
  connectionCount?: number;
  fileCount?: number;
}

/**
 * Main IR processor that orchestrates the entire conversion pipeline
 */
export class IRProcessor {
  private flowiseTransformer: FlowiseToIRTransformer;
  private codeTransformer: IRToCodeTransformer;

  constructor() {
    this.flowiseTransformer = new FlowiseToIRTransformer();
    this.codeTransformer = new IRToCodeTransformer();
  }

  /**
   * Complete pipeline: Flowise JSON → IR → TypeScript code
   */
  async processFlow(
    flowiseData: FlowiseChatFlow,
    context: GenerationContext
  ): Promise<{
    ir: IRGraph;
    code: CodeGenerationResult;
    transformationResult: TransformationResult;
  }> {
    // Transform Flowise to IR
    const transformationResult =
      await this.flowiseTransformer.transform(flowiseData);

    if (!transformationResult.validation.isValid) {
      throw new Error(
        `Invalid flow: ${transformationResult.validation.errors.map((e) => e.message).join(', ')}`
      );
    }

    // Generate code from IR
    const code = await this.codeTransformer.generateCode(
      transformationResult.graph,
      context
    );

    return {
      ir: transformationResult.graph,
      code,
      transformationResult,
    };
  }

  /**
   * Validate a Flowise flow without full conversion
   */
  async validateFlow(flowiseData: FlowiseChatFlow): Promise<ValidationResult> {
    const result = await this.flowiseTransformer.transform(flowiseData);
    return result.validation;
  }

  /**
   * Get conversion metrics and analysis
   */
  async analyzeFlow(flowiseData: FlowiseChatFlow): Promise<{
    metrics: IRConversionMetrics;
    stats: GraphStats;
    validation: ValidationResult;
  }> {
    const result = await this.flowiseTransformer.transform(flowiseData);
    const stats = IRGraphAnalyzer.analyzeGraph(result.graph);

    return {
      metrics: result.metrics,
      stats,
      validation: result.validation,
    };
  }
}

/**
 * Utility functions for working with IR
 */
export class IRUtils {
  /**
   * Create a minimal IR graph for testing
   */
  static createTestGraph(name: string = 'Test Graph'): IRGraph {
    return {
      metadata: {
        name,
        description: 'Test graph for development',
        version: '1.0.0',
        flowiseVersion: '1.5.0',
        isTemplate: false,
        settings: {},
      },
      nodes: [],
      connections: [],
      analysis: {
        isValid: true,
        errors: [],
        warnings: [],
        complexity: 'simple',
        entryPoints: [],
        exitPoints: [],
        cycles: [],
        dependencies: new Map(),
      },
    };
  }

  /**
   * Merge multiple IR graphs into one
   */
  static mergeGraphs(
    graphs: IRGraph[],
    name: string = 'Merged Graph'
  ): IRGraph {
    const merged = this.createTestGraph(name);

    for (const graph of graphs) {
      merged.nodes.push(...graph.nodes);
      merged.connections.push(...graph.connections);
    }

    // Re-analyze the merged graph
    const stats = IRGraphAnalyzer.analyzeGraph(merged);
    merged.analysis = {
      isValid: true,
      errors: [],
      warnings: [],
      complexity: stats.complexity,
      entryPoints: stats.entryPoints,
      exitPoints: stats.exitPoints,
      cycles: [],
      dependencies: new Map(),
    };

    return merged;
  }

  /**
   * Extract subgraph by node IDs
   */
  static extractSubgraph(graph: IRGraph, nodeIds: NodeId[]): IRGraph {
    const subgraph = IRGraphAnalyzer.extractSubgraph(graph, nodeIds, true);

    return {
      metadata: {
        ...graph.metadata,
        name: `${graph.metadata.name} (Subgraph)`,
        description: 'Extracted subgraph',
      },
      nodes: subgraph.nodes,
      connections: subgraph.connections,
      analysis: {
        isValid: true,
        errors: [],
        warnings: [],
        complexity: 'simple',
        entryPoints: [],
        exitPoints: [],
        cycles: [],
        dependencies: new Map(),
      },
    };
  }

  /**
   * Convert IR graph to DOT format for visualization
   */
  static toDot(graph: IRGraph): string {
    let dot = `digraph "${graph.metadata.name}" {\n`;
    dot += '  rankdir=TB;\n';
    dot += '  node [shape=box, style=rounded];\n\n';

    // Add nodes
    for (const node of graph.nodes) {
      const label = `${node.label}\\n(${node.type})`;
      const color = this.getNodeColor(node.category);
      dot += `  "${node.id}" [label="${label}", fillcolor="${color}", style="filled,rounded"];\n`;
    }

    dot += '\n';

    // Add edges
    for (const connection of graph.connections) {
      const label = connection.label ? ` [label="${connection.label}"]` : '';
      dot += `  "${connection.source}" -> "${connection.target}"${label};\n`;
    }

    dot += '}\n';
    return dot;
  }

  /**
   * Get summary statistics for an IR graph
   */
  static getSummary(graph: IRGraph): {
    nodeCount: number;
    connectionCount: number;
    categories: Record<string, number>;
    complexity: string;
    isValid: boolean;
    errorCount: number;
    warningCount: number;
  } {
    const stats = IRGraphAnalyzer.analyzeGraph(graph);
    const validation = IRGraphAnalyzer.validate(graph);

    return {
      nodeCount: graph.nodes.length,
      connectionCount: graph.connections.length,
      categories: stats.categories,
      complexity: stats.complexity,
      isValid: validation.isValid,
      errorCount: validation.errors.length,
      warningCount: validation.warnings.length,
    };
  }

  private static getNodeColor(category: string): string {
    const colors: Record<string, string> = {
      llm: '#FF6B6B',
      chain: '#4ECDC4',
      agent: '#45B7D1',
      tool: '#96CEB4',
      memory: '#FFEAA7',
      vectorstore: '#DDA0DD',
      embedding: '#98D8C8',
      prompt: '#F7DC6F',
      retriever: '#BB8FCE',
      output_parser: '#85C1E9',
      text_splitter: '#F8C471',
      loader: '#82E0AA',
      utility: '#D5DBDB',
      control_flow: '#EC7063',
    };

    return colors[category] || '#D5DBDB';
  }
}

/**
 * Factory function to create an IR processor
 */
export function createIRProcessor(): IRProcessor {
  return new IRProcessor();
}

// Export the main processor as default
export default IRProcessor;
