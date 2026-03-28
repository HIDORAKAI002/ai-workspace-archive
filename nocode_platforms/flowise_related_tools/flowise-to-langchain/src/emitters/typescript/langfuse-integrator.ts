/**
 * LangFuse Integration for TypeScript Code Generation
 *
 * Provides LangFuse observability integration for generated LangChain applications.
 */

import {
  IRGraph,
  IRNode,
  CodeFragment,
  GenerationContext,
} from '../../ir/types.js';

export interface LangFuseConfig {
  enabled: boolean;
  apiKey?: string;
  baseUrl?: string;
  projectName?: string;
  generateTraces: boolean;
  generateGenerations: boolean;
  generateSpans: boolean;
  trackTokenUsage: boolean;
  trackLatency: boolean;
}

export interface TraceMetadata {
  name: string;
  tags: string[];
  metadata: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
}

/**
 * LangFuse integration for observability and tracing
 */
export class LangFuseIntegrator {
  private config: LangFuseConfig;

  constructor(config: Partial<LangFuseConfig> = {}) {
    this.config = {
      enabled: true,
      generateTraces: true,
      generateGenerations: true,
      generateSpans: true,
      trackTokenUsage: true,
      trackLatency: true,
      ...config,
    };
  }

  /**
   * Generate LangFuse integration code fragments
   */
  generateIntegrationFragments(
    graph: IRGraph,
    context: GenerationContext
  ): CodeFragment[] {
    if (!context.includeLangfuse || !this.config.enabled) {
      return [];
    }

    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(this.generateImportFragment());

    // Configuration fragment
    fragments.push(this.generateConfigFragment(graph, context));

    // Initialization fragment
    fragments.push(this.generateInitializationFragment(graph));

    // Tracing fragments for different node types
    fragments.push(...this.generateNodeTracingFragments(graph));

    return fragments;
  }

  /**
   * Generate import fragment for LangFuse
   */
  private generateImportFragment(): CodeFragment {
    return {
      id: 'langfuse_import',
      type: 'import',
      content: `import { Langfuse } from 'langfuse';`,
      dependencies: ['langfuse'],
      language: 'typescript',
      metadata: {
        order: 1,
        description: 'LangFuse import',
        category: 'observability',
      },
    };
  }

  /**
   * Generate configuration fragment
   */
  private generateConfigFragment(
    _graph: IRGraph,
    _context: GenerationContext
  ): CodeFragment {
    const config = {
      apiKey: 'process.env.LANGFUSE_API_KEY',
      baseUrl: 'process.env.LANGFUSE_BASE_URL || "https://cloud.langfuse.com"',
      enabled: 'process.env.LANGFUSE_ENABLED === "true"',
    };

    const content = `// LangFuse configuration
const langfuseConfig = {
  apiKey: ${config.apiKey},
  baseUrl: ${config.baseUrl},
  enabled: ${config.enabled}
};`;

    return {
      id: 'langfuse_config',
      type: 'declaration',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        order: 100,
        description: 'LangFuse configuration',
        category: 'observability',
      },
    };
  }

  /**
   * Generate initialization fragment
   */
  private generateInitializationFragment(graph: IRGraph): CodeFragment {
    const content = `// Initialize LangFuse client
const langfuse = langfuseConfig.enabled ? new Langfuse({
  apiKey: langfuseConfig.apiKey,
  baseUrl: langfuseConfig.baseUrl,
  projectName: '${graph.metadata.name}',
  environment: process.env.NODE_ENV || 'development'
}) : null;`;

    return {
      id: 'langfuse_init',
      type: 'initialization',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        order: 200,
        description: 'LangFuse initialization',
        category: 'observability',
      },
    };
  }

  /**
   * Generate tracing fragments for different node types
   */
  private generateNodeTracingFragments(graph: IRGraph): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Main trace fragment
    fragments.push(this.generateMainTraceFragment(graph));

    // Generation tracking for LLM nodes
    const llmNodes = graph.nodes.filter((node) => node.category === 'llm');
    if (llmNodes.length > 0) {
      fragments.push(this.generateLLMTracingFragment(llmNodes));
    }

    // Chain tracing
    const chainNodes = graph.nodes.filter((node) => node.category === 'chain');
    if (chainNodes.length > 0) {
      fragments.push(this.generateChainTracingFragment(chainNodes));
    }

    // Tool tracing
    const toolNodes = graph.nodes.filter((node) => node.category === 'tool');
    if (toolNodes.length > 0) {
      fragments.push(this.generateToolTracingFragment(toolNodes));
    }

    return fragments;
  }

  /**
   * Generate main trace fragment
   */
  private generateMainTraceFragment(graph: IRGraph): CodeFragment {
    const content = `// Start main trace
const mainTrace = langfuse?.trace({
  name: '${graph.metadata.name}',
  input: { text: input, options },
  tags: ['${graph.metadata.category || 'chatflow'}', 'generated'],
  metadata: {
    version: '${graph.metadata.version || '1.0.0'}',
    flowiseVersion: '${graph.metadata.flowiseVersion || 'unknown'}',
    nodeCount: ${graph.nodes.length},
    generatedAt: new Date().toISOString()
  }
});`;

    return {
      id: 'langfuse_main_trace',
      type: 'execution',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        order: 500,
        description: 'Main trace initialization',
        category: 'observability',
        async: false,
      },
    };
  }

  /**
   * Generate LLM tracing fragment
   */
  private generateLLMTracingFragment(llmNodes: IRNode[]): CodeFragment {
    const content = `// LLM generation tracking
const llmGenerations = new Map();

${llmNodes
  .map((node, _index) => {
    const variableName = this.sanitizeVariableName(node.label);
    const modelName = this.getParameterValue(node, 'modelName', 'unknown');

    return `// Track ${node.label} generations
const ${variableName}Generation = mainTrace?.generation({
  name: '${node.label}',
  model: '${modelName}',
  tags: ['llm', '${node.type}']
});
llmGenerations.set('${node.id}', ${variableName}Generation);`;
  })
  .join('\n\n')}`;

    return {
      id: 'langfuse_llm_tracing',
      type: 'execution',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        order: 510,
        description: 'LLM generation tracking',
        category: 'observability',
        async: false,
      },
    };
  }

  /**
   * Generate chain tracing fragment
   */
  private generateChainTracingFragment(chainNodes: IRNode[]): CodeFragment {
    const content = `// Chain execution tracking
const chainSpans = new Map();

${chainNodes
  .map((node, _index) => {
    const variableName = this.sanitizeVariableName(node.label);

    return `// Track ${node.label} execution
const ${variableName}Span = mainTrace?.span({
  name: '${node.label}',
  tags: ['chain', '${node.type}'],
  metadata: {
    nodeId: '${node.id}',
    category: '${node.category}'
  }
});
chainSpans.set('${node.id}', ${variableName}Span);`;
  })
  .join('\n\n')}`;

    return {
      id: 'langfuse_chain_tracing',
      type: 'execution',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        order: 520,
        description: 'Chain execution tracking',
        category: 'observability',
        async: false,
      },
    };
  }

  /**
   * Generate tool tracing fragment
   */
  private generateToolTracingFragment(toolNodes: IRNode[]): CodeFragment {
    const content = `// Tool usage tracking
const toolSpans = new Map();

${toolNodes
  .map((node, _index) => {
    const variableName = this.sanitizeVariableName(node.label);

    return `// Track ${node.label} usage
const ${variableName}Span = mainTrace?.span({
  name: '${node.label}',
  tags: ['tool', '${node.type}'],
  metadata: {
    nodeId: '${node.id}',
    toolType: '${node.type}'
  }
});
toolSpans.set('${node.id}', ${variableName}Span);`;
  })
  .join('\n\n')}`;

    return {
      id: 'langfuse_tool_tracing',
      type: 'execution',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        order: 530,
        description: 'Tool usage tracking',
        category: 'observability',
        async: false,
      },
    };
  }

  /**
   * Generate trace completion fragment
   */
  generateTraceCompletion(hasError: boolean = false): string {
    if (hasError) {
      return `// Complete trace with error
if (mainTrace) {
  mainTrace.update({
    output: { error: error.message },
    level: 'ERROR'
  });
  
  // End all open spans
  for (const span of [...llmGenerations.values(), ...chainSpans.values(), ...toolSpans.values()]) {
    span?.end({ output: { error: error.message } });
  }
}`;
    }

    return `// Complete trace successfully
if (mainTrace) {
  mainTrace.update({
    output: { text: result },
    level: 'INFO'
  });
  
  // End all open spans with results
  for (const generation of llmGenerations.values()) {
    generation?.end({
      output: { text: result },
      usage: { 
        // Token usage would be tracked here if available
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0
      }
    });
  }
  
  for (const span of [...chainSpans.values(), ...toolSpans.values()]) {
    span?.end({ output: { success: true } });
  }
}`;
  }

  /**
   * Generate callback wrapper for LangChain components
   */
  generateCallbackWrapper(nodeId: string, _nodeType: string): string {
    return `// LangFuse callback for ${nodeId}
const ${this.sanitizeVariableName(nodeId)}Callback = langfuse ? {
  handleLLMStart: (llm, prompts) => {
    const generation = llmGenerations.get('${nodeId}');
    generation?.update({
      input: prompts[0]
    });
  },
  
  handleLLMEnd: (output) => {
    const generation = llmGenerations.get('${nodeId}');
    generation?.end({
      output: output.generations[0][0].text,
      usage: output.llmOutput?.tokenUsage
    });
  },
  
  handleChainStart: (chain, inputs) => {
    const span = chainSpans.get('${nodeId}');
    span?.update({
      input: inputs
    });
  },
  
  handleChainEnd: (outputs) => {
    const span = chainSpans.get('${nodeId}');
    span?.end({
      output: outputs
    });
  },
  
  handleToolStart: (tool, input) => {
    const span = toolSpans.get('${nodeId}');
    span?.update({
      input: { query: input }
    });
  },
  
  handleToolEnd: (output) => {
    const span = toolSpans.get('${nodeId}');
    span?.end({
      output: { result: output }
    });
  }
} : undefined;`;
  }

  /**
   * Generate environment variables for LangFuse
   */
  generateEnvironmentVariables(): Array<{
    name: string;
    description: string;
    example: string;
    required: boolean;
  }> {
    return [
      {
        name: 'LANGFUSE_API_KEY',
        description: 'LangFuse API key for observability tracking',
        example: 'lf_...',
        required: false,
      },
      {
        name: 'LANGFUSE_BASE_URL',
        description: 'LangFuse instance URL (defaults to cloud.langfuse.com)',
        example: 'https://cloud.langfuse.com',
        required: false,
      },
      {
        name: 'LANGFUSE_ENABLED',
        description: 'Enable/disable LangFuse tracking (true/false)',
        example: 'true',
        required: false,
      },
    ];
  }

  /**
   * Generate performance monitoring code
   */
  generatePerformanceMonitoring(): string {
    return `// Performance monitoring
const performanceTracker = {
  startTime: Date.now(),
  
  trackLatency: (operationName: string, startTime: number) => {
    const latency = Date.now() - startTime;
    mainTrace?.event({
      name: 'latency_measurement',
      metadata: {
        operation: operationName,
        latencyMs: latency
      }
    });
    return latency;
  },
  
  trackTokenUsage: (tokens: { prompt: number; completion: number }) => {
    mainTrace?.event({
      name: 'token_usage',
      metadata: {
        promptTokens: tokens.prompt,
        completionTokens: tokens.completion,
        totalTokens: tokens.prompt + tokens.completion
      }
    });
  },
  
  trackError: (error: Error, context: string) => {
    mainTrace?.event({
      name: 'error_occurred',
      level: 'ERROR',
      metadata: {
        error: error.message,
        context,
        stack: error.stack
      }
    });
  }
};`;
  }

  /**
   * Helper methods
   */
  private sanitizeVariableName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, '_$&')
      .toLowerCase();
  }

  private getParameterValue(
    node: IRNode,
    paramName: string,
    defaultValue: string = 'unknown'
  ): string {
    const param = node.parameters.find((p) => p.name === paramName);
    return param?.value?.toString() || defaultValue;
  }

  /**
   * Generate LangFuse dashboard query helpers
   */
  generateDashboardQueries(): string {
    return `// LangFuse dashboard query helpers
export const langfuseDashboard = {
  // Get traces for this application
  getTraces: async (limit: number = 100) => {
    if (!langfuse) return [];
    
    try {
      return await langfuse.getTraces({
        tags: ['generated'],
        limit
      });
    } catch (error) {
      console.error('Failed to fetch traces:', error);
      return [];
    }
  },
  
  // Get performance metrics
  getMetrics: async (timeRange: string = '24h') => {
    if (!langfuse) return null;
    
    try {
      return await langfuse.getMetrics({
        timeRange,
        tags: ['generated']
      });
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      return null;
    }
  },
  
  // Create feedback
  createFeedback: async (traceId: string, rating: number, comment?: string) => {
    if (!langfuse) return null;
    
    try {
      return await langfuse.createFeedback({
        traceId,
        rating,
        comment
      });
    } catch (error) {
      console.error('Failed to create feedback:', error);
      return null;
    }
  }
};`;
  }
}
