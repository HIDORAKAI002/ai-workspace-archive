/**
 * AgentFlow V2 Node Converters
 *
 * Converts Flowise AgentFlow V2 nodes into LangChain implementations
 * Supports Agent, Tool, CustomFunction, and Subflow nodes
 */

import { BaseConverter } from '../registry.js';
import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';

/**
 * Reference Resolution System
 * Tracks dependencies and resolves references between nodes
 */
interface NodeReference {
  nodeId: string;
  variableName: string;
  type: 'llm' | 'tool' | 'memory' | 'subflow' | 'agent' | 'function' | 'chain' | 'prompt' | 'vectorstore';
}

interface DependencyGraph {
  nodes: Map<string, NodeReference>;
  dependencies: Map<string, Set<string>>;
}

class ReferenceResolver {
  private dependencyGraph: DependencyGraph = {
    nodes: new Map(),
    dependencies: new Map()
  };

  /**
   * Register a node in the dependency graph
   */
  registerNode(nodeId: string, variableName: string, type: NodeReference['type']): void {
    this.dependencyGraph.nodes.set(nodeId, { nodeId, variableName, type });
  }

  /**
   * Add a dependency between nodes
   */
  addDependency(fromNodeId: string, toNodeId: string): void {
    if (!this.dependencyGraph.dependencies.has(fromNodeId)) {
      this.dependencyGraph.dependencies.set(fromNodeId, new Set());
    }
    this.dependencyGraph.dependencies.get(fromNodeId)!.add(toNodeId);
  }

  /**
   * Get all dependencies for a node
   */
  getDependencies(nodeId: string): string[] {
    return Array.from(this.dependencyGraph.dependencies.get(nodeId) || []);
  }

  /**
   * Resolve a reference to its variable name
   */
  resolveReference(referenceId: string): string | null {
    const node = this.dependencyGraph.nodes.get(referenceId);
    return node ? node.variableName : null;
  }

  /**
   * Get all nodes of a specific type
   */
  getNodesByType(type: NodeReference['type']): NodeReference[] {
    return Array.from(this.dependencyGraph.nodes.values()).filter(node => node.type === type);
  }

  /**
   * Check for circular dependencies
   */
  hasCircularDependency(nodeId: string, visited: Set<string> = new Set()): boolean {
    if (visited.has(nodeId)) return true;
    visited.add(nodeId);
    
    const deps = this.getDependencies(nodeId);
    for (const dep of deps) {
      if (this.hasCircularDependency(dep, new Set(visited))) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get topologically sorted nodes
   */
  getTopologicalOrder(): string[] {
    const visited = new Set<string>();
    const result: string[] = [];
    
    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      
      const deps = this.getDependencies(nodeId);
      for (const dep of deps) {
        visit(dep);
      }
      
      result.push(nodeId);
    };
    
    for (const nodeId of this.dependencyGraph.nodes.keys()) {
      visit(nodeId);
    }
    
    return result;
  }

  /**
   * Get initialization order for nodes
   */
  getInitializationOrder(): NodeReference[] {
    const order = this.getTopologicalOrder();
    return order
      .map(nodeId => this.dependencyGraph.nodes.get(nodeId))
      .filter((node): node is NodeReference => node !== undefined);
  }

  /**
   * Clear the dependency graph
   */
  clear(): void {
    this.dependencyGraph.nodes.clear();
    this.dependencyGraph.dependencies.clear();
  }
}

/**
 * Base AgentFlow V2 converter with common functionality
 */
export abstract class BaseAgentFlowV2Converter extends BaseConverter {
  readonly category = 'agentflow-v2';
  protected static referenceResolver = new ReferenceResolver();

  /**
   * Get the reference resolver instance
   */
  static getReferenceResolver(): ReferenceResolver {
    return BaseAgentFlowV2Converter.referenceResolver;
  }

  /**
   * Reset the reference resolver for a new conversion
   */
  static resetReferenceResolver(): void {
    BaseAgentFlowV2Converter.referenceResolver.clear();
  }

  /**
   * Override getParameterValue to handle both parameter array and data object patterns
   */
  protected override getParameterValue<T = unknown>(
    node: IRNode,
    paramName: string,
    defaultValue?: T
  ): T | undefined {
    // First try the standard parameters array approach
    if (node.parameters && Array.isArray(node.parameters)) {
      const param = node.parameters.find((p) => p.name === paramName);
      if (param !== undefined) {
        return (param?.value as T) ?? defaultValue;
      }
    }

    // Fallback to data object approach for AgentFlow V2 nodes
    if ((node as any).data && typeof (node as any).data === 'object') {
      const value = (node as any).data[paramName];
      if (value !== undefined) {
        return value as T;
      }
    }

    return defaultValue;
  }

  protected generateV2NodeConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
    state: Record<string, unknown>;
  } {
    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config: this.extractNodeConfig(node),
      state: this.extractNodeState(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractNodeConfig(node: IRNode): Record<string, unknown>;
  protected abstract extractNodeState(node: IRNode): Record<string, unknown>;
  protected abstract getNodeType(): string;

  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, `${this.getNodeType()}_node`);
    
    // Register this node in the reference resolver
    BaseAgentFlowV2Converter.referenceResolver.registerNode(
      node.id,
      variableName,
      this.getNodeType() as NodeReference['type']
    );
    
    // Track dependencies from input connections
    this.trackNodeDependencies(node, context);
    
    const config = this.generateV2NodeConfiguration(node, context);
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        this.generateImport(config.packageName, config.imports),
        [config.packageName],
        node.id,
        1
      )
    );

    // Additional imports for complex configurations
    const additionalImports = this.getAdditionalImports(node, context);
    if (additionalImports.length > 0) {
      fragments.push(
        this.createCodeFragment(
          `${node.id}_additional_imports`,
          'import',
          additionalImports.join('\n'),
          additionalImports,
          node.id,
          2
        )
      );
    }

    // State management fragment (if needed)
    if (Object.keys(config.state).length > 0) {
      const stateCode = this.generateStateManagementCode(
        config.state,
        variableName
      );
      fragments.push(
        this.createCodeFragment(
          `${node.id}_state`,
          'initialization' as any,
          stateCode,
          ['state'],
          node.id,
          50
        )
      );
    }

    // Pre-initialization setup
    const setupCode = this.generateSetupCode(node, context, variableName);
    if (setupCode) {
      fragments.push(
        this.createCodeFragment(
          `${node.id}_setup`,
          'setup' as any,
          setupCode,
          ['setup'],
          node.id,
          75
        )
      );
    }

    // Configuration fragment with resolved references
    const resolvedConfig = this.resolveConfigReferences(config.config, node, context);
    const configStr = this.generateConfigurationString(resolvedConfig);
    const initCode = this.generateInitializationCode(node, context, variableName, config, configStr);

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [config.className],
        node.id,
        100
      )
    );

    // Post-initialization configuration - always add to ensure consistent fragment count
    const postInitCode = this.generatePostInitializationCode(
      node,
      context,
      variableName
    );
    fragments.push(
      this.createCodeFragment(
        `${node.id}_post_init`,
        'initialization',
        postInitCode || `// ${variableName} post-initialization complete`,
        ['post-init'],
        node.id,
        125
      )
    );

    return fragments;
  }

  protected generateStateManagementCode(
    state: Record<string, unknown>,
    variableName: string
  ): string {
    const stateEntries = Object.entries(state);
    if (stateEntries.length === 0) return '';

    const stateInit = stateEntries
      .map(([key, value]) => {
        return `  ${key}: ${this.formatParameterValue(value)}`;
      })
      .join(',\n');

    return `// State management for ${variableName}\nconst ${variableName}_state = {\n${stateInit}\n};`;
  }

  /**
   * Get additional imports required for complex node configurations
   */
  protected getAdditionalImports(
    _node: IRNode,
    _context: GenerationContext
  ): string[] {
    return [];
  }

  /**
   * Generate setup code that runs before node initialization
   */
  protected generateSetupCode(
    _node: IRNode,
    _context: GenerationContext,
    _variableName: string
  ): string {
    return '';
  }

  /**
   * Generate initialization code with enhanced configuration handling
   */
  protected generateInitializationCode(
    node: IRNode,
    context: GenerationContext,
    variableName: string,
    config: any,
    configStr: string
  ): string {
    // For agent nodes, we need special handling
    if (this instanceof AgentNodeConverter) {
      return this.generateAgentInitializationCode(node, context, variableName, config, configStr);
    }
    
    if (configStr) {
      return `const ${variableName} = new ${config.className}(${configStr});`;
    } else {
      return `const ${variableName} = new ${config.className}();`;
    }
  }

  /**
   * Generate agent-specific initialization code
   */
  protected generateAgentInitializationCode(
    node: IRNode,
    context: GenerationContext,
    variableName: string,
    config: any,
    _configStr: string
  ): string {
    const agentType = this.getParameterValue(node, 'agentType', 'openai-functions') as string;
    const initLines: string[] = [];
    
    // Resolve references to get actual variable names
    const llmVar = this.resolveLLMReference(node, context);
    const toolsVar = this.resolveToolsReference(node, context);
    const memoryVar = this.resolveMemoryReference(node, context);
    
    // Create the agent based on type
    switch (agentType) {
      case 'openai-functions':
        initLines.push(`// Create OpenAI Functions agent`);
        initLines.push(`const ${variableName}_agent = await createOpenAIFunctionsAgent({`);
        initLines.push(`  llm: ${llmVar},`);
        initLines.push(`  tools: ${toolsVar},`);
        initLines.push(`  prompt: ChatPromptTemplate.fromMessages([`);
        initLines.push(`    ['system', 'You are a helpful assistant.'],`);
        initLines.push(`    ['human', '{input}'],`);
        initLines.push(`    ['assistant', '{agent_scratchpad}']`);
        initLines.push(`  ])`);
        initLines.push(`});`);
        break;
      case 'structured-chat':
        initLines.push(`// Create Structured Chat agent`);
        initLines.push(`const ${variableName}_agent = await createStructuredChatAgent({`);
        initLines.push(`  llm: ${llmVar},`);
        initLines.push(`  tools: ${toolsVar},`);
        initLines.push(`  prompt: ChatPromptTemplate.fromMessages([`);
        initLines.push(`    ['system', 'You are a helpful assistant.'],`);
        initLines.push(`    ['human', '{input}']`);
        initLines.push(`  ])`);
        initLines.push(`});`);
        break;
      case 'react':
        initLines.push(`// Create ReAct agent`);
        initLines.push(`const ${variableName}_agent = await createReactAgent({`);
        initLines.push(`  llm: ${llmVar},`);
        initLines.push(`  tools: ${toolsVar},`);
        initLines.push(`  prompt: PromptTemplate.fromTemplate(`);
        initLines.push(`    'Answer the following questions as best you can...\\n{input}\\n{agent_scratchpad}'`);
        initLines.push(`  )`);
        initLines.push(`});`);
        break;
      default:
        // Default to OpenAI functions
        initLines.push(`const ${variableName}_agent = await createOpenAIFunctionsAgent({`);
        initLines.push(`  llm: ${llmVar},`);
        initLines.push(`  tools: ${toolsVar},`);
        initLines.push(`  prompt: ChatPromptTemplate.fromMessages([`);
        initLines.push(`    ['system', 'You are a helpful assistant.'],`);
        initLines.push(`    ['human', '{input}']`);
        initLines.push(`  ])`);
        initLines.push(`});`);
    }
    
    // Create the executor with resolved configuration
    initLines.push(`\n// Create agent executor`);
    initLines.push(`const ${variableName} = new AgentExecutor({`);
    initLines.push(`  agent: ${variableName}_agent,`);
    initLines.push(`  tools: ${toolsVar},`);
    if (memoryVar !== 'null') {
      initLines.push(`  memory: ${memoryVar},`);
    }
    
    // Add other configuration options
    const maxIterations = this.getParameterValue(node, 'maxIterations', 10);
    const verbose = this.getParameterValue(node, 'verbose', false);
    const handleParsingErrors = this.getParameterValue(node, 'handleParsingErrors', true);
    const returnIntermediateSteps = this.getParameterValue(node, 'returnIntermediateSteps', false);
    
    initLines.push(`  maxIterations: ${maxIterations},`);
    initLines.push(`  verbose: ${verbose},`);
    initLines.push(`  handleParsingErrors: ${handleParsingErrors},`);
    initLines.push(`  returnIntermediateSteps: ${returnIntermediateSteps}`);
    initLines.push(`});`);
    
    return initLines.join('\n');
  }

  /**
   * Generate post-initialization configuration code
   */
  protected generatePostInitializationCode(
    _node: IRNode,
    _context: GenerationContext,
    _variableName: string
  ): string {
    return '';
  }

  protected generateConfigurationString(
    config: Record<string, unknown>
  ): string {
    const entries = Object.entries(config);
    if (entries.length === 0) return '';

    const configPairs = entries.map(([key, value]) => {
      return `${key}: ${this.formatParameterValue(value)}`;
    });

    return `{\n  ${configPairs.join(',\n  ')}\n}`;
  }

  /**
   * Track dependencies based on node connections
   */
  protected trackNodeDependencies(node: IRNode, context: GenerationContext): void {
    // Check for input connections in the IR graph
    // TODO: Graph support temporarily disabled - needs proper integration with GenerationContext
    
    // Also check for parameter-based connections
    const params = ['llm', 'tools', 'memory', 'chain', 'prompt', 'vectorStore'];
    for (const param of params) {
      const ref = this.getParameterValue(node, param, null);
      if (ref && typeof ref === 'object' && 'nodeId' in ref) {
        const nodeIdRef = ref as { nodeId: string };
        BaseAgentFlowV2Converter.referenceResolver.addDependency(node.id, nodeIdRef.nodeId);
      }
    }
  }

  /**
   * Resolve references in configuration
   */
  protected resolveConfigReferences(
    config: Record<string, unknown>,
    node: IRNode,
    context: GenerationContext
  ): Record<string, unknown> {
    const resolved: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'string') {
        // Check for placeholder patterns
        if (value.includes('_REFERENCE_PLACEHOLDER')) {
          resolved[key] = this.resolveReference(value, node, context);
        } else if (value.includes('_PLACEHOLDER')) {
          resolved[key] = this.resolvePlaceholder(value, node, context);
        } else {
          resolved[key] = value;
        }
      } else if (Array.isArray(value)) {
        resolved[key] = value.map(item => 
          typeof item === 'string' && item.includes('_PLACEHOLDER') 
            ? this.resolvePlaceholder(item, node, context)
            : item
        );
      } else if (typeof value === 'object' && value !== null) {
        resolved[key] = this.resolveConfigReferences(value as Record<string, unknown>, node, context);
      } else {
        resolved[key] = value;
      }
    }
    
    return resolved;
  }

  /**
   * Resolve a specific reference placeholder
   */
  protected resolveReference(placeholder: string, node: IRNode, context: GenerationContext): string {
    // Extract reference type from placeholder
    if (placeholder.includes('LLM_REFERENCE_PLACEHOLDER')) {
      return this.resolveLLMReference(node, context);
    } else if (placeholder.includes('TOOLS_REFERENCE_PLACEHOLDER')) {
      return this.resolveToolsReference(node, context);
    } else if (placeholder.includes('MEMORY_REFERENCE_PLACEHOLDER')) {
      return this.resolveMemoryReference(node, context);
    } else if (placeholder.includes('SUBFLOW_')) {
      return this.resolveSubflowReference(placeholder, node, context);
    }
    
    return placeholder;
  }

  /**
   * Resolve general placeholders
   */
  protected resolvePlaceholder(placeholder: string, node: IRNode, context: GenerationContext): string {
    // Check for specific placeholder patterns
    if (placeholder.includes('FUNCTION_PLACEHOLDER')) {
      return this.resolveFunctionReference(node, context);
    }
    
    // Check for node ID references
    const nodeIdMatch = placeholder.match(/NODE_([A-Za-z0-9_-]+)_PLACEHOLDER/);
    if (nodeIdMatch) {
      const nodeId = nodeIdMatch[1];
      const resolved = BaseAgentFlowV2Converter.referenceResolver.resolveReference(nodeId);
      return resolved || placeholder;
    }
    
    // Default implementation - can be overridden by subclasses
    return placeholder;
  }

  /**
   * Resolve function reference
   */
  protected resolveFunctionReference(node: IRNode, context: GenerationContext): string {
    // Check for connected function nodes
    const functionRef = this.getParameterValue(node, 'functionRef', null);
    if (functionRef && typeof functionRef === 'string') {
      const resolved = BaseAgentFlowV2Converter.referenceResolver.resolveReference(functionRef);
      if (resolved) return resolved;
    }
    
    // Default function
    return '(input) => input';
  }

  /**
   * Resolve LLM reference
   */
  protected resolveLLMReference(node: IRNode, context: GenerationContext): string {
    const llmRef = this.getParameterValue(node, 'llm', null);
    if (!llmRef) return 'null';
    
    // Check if it's a reference to another node
    if (typeof llmRef === 'string') {
      const resolved = BaseAgentFlowV2Converter.referenceResolver.resolveReference(llmRef);
      if (resolved) return resolved;
    }
    
    // Check if llmRef is an object with connection info
    if (typeof llmRef === 'object' && llmRef !== null && 'nodeId' in llmRef) {
      const llmRefWithNodeId = llmRef as { nodeId: string };
      const resolved = BaseAgentFlowV2Converter.referenceResolver.resolveReference(llmRefWithNodeId.nodeId);
      if (resolved) return resolved;
    }
    
    // Check context for LLM nodes
    const llmNodes = BaseAgentFlowV2Converter.referenceResolver.getNodesByType('llm');
    if (llmNodes.length > 0) {
      // Use the first available LLM or match by specific criteria
      return llmNodes[0].variableName;
    }
    
    // Check for chain nodes that might contain LLMs
    const chainNodes = BaseAgentFlowV2Converter.referenceResolver.getNodesByType('chain');
    for (const chainNode of chainNodes) {
      if (chainNode.variableName.includes('llm') || chainNode.variableName.includes('model')) {
        return chainNode.variableName;
      }
    }
    
    return 'defaultLLM';
  }

  /**
   * Resolve tools reference
   */
  protected resolveToolsReference(node: IRNode, context: GenerationContext): string {
    const toolsRef = this.getParameterValue(node, 'tools', []);
    const toolVariables: string[] = [];
    
    if (Array.isArray(toolsRef)) {
      for (const toolRef of toolsRef) {
        if (typeof toolRef === 'string') {
          const resolved = BaseAgentFlowV2Converter.referenceResolver.resolveReference(toolRef);
          if (resolved) {
            toolVariables.push(resolved);
          }
        } else if (typeof toolRef === 'object' && toolRef !== null && 'nodeId' in toolRef) {
          const toolRefWithNodeId = toolRef as { nodeId: string };
          const resolved = BaseAgentFlowV2Converter.referenceResolver.resolveReference(toolRefWithNodeId.nodeId);
          if (resolved) {
            toolVariables.push(resolved);
          }
        }
      }
    }
    
    // Also check for all tool nodes in the graph that might be connected
    const deps = BaseAgentFlowV2Converter.referenceResolver.getDependencies(node.id);
    for (const dep of deps) {
      const depNode = BaseAgentFlowV2Converter.referenceResolver.resolveReference(dep);
      if (depNode) {
        const nodeRef = Array.from(BaseAgentFlowV2Converter.referenceResolver['dependencyGraph'].nodes.values())
          .find(n => n.nodeId === dep);
        if (nodeRef && nodeRef.type === 'tool' && !toolVariables.includes(nodeRef.variableName)) {
          toolVariables.push(nodeRef.variableName);
        }
      }
    }
    
    return toolVariables.length > 0 ? `[${toolVariables.join(', ')}]` : '[]';
  }

  /**
   * Resolve memory reference
   */
  protected resolveMemoryReference(node: IRNode, context: GenerationContext): string {
    const memoryRef = this.getParameterValue(node, 'memory', null);
    if (!memoryRef) return 'null';
    
    // Check if it's a reference to another node
    if (typeof memoryRef === 'string') {
      const resolved = BaseAgentFlowV2Converter.referenceResolver.resolveReference(memoryRef);
      if (resolved) return resolved;
    }
    
    // Check context for memory nodes
    const memoryNodes = BaseAgentFlowV2Converter.referenceResolver.getNodesByType('memory');
    if (memoryNodes.length > 0) {
      return memoryNodes[0].variableName;
    }
    
    return 'null';
  }

  /**
   * Resolve subflow reference
   */
  protected resolveSubflowReference(placeholder: string, node: IRNode, context: GenerationContext): string {
    const subflowId = this.getParameterValue(node, 'subflowId', '');
    if (!subflowId) return '[]';
    
    // Check for subflow nodes
    const subflowNodes = BaseAgentFlowV2Converter.referenceResolver.getNodesByType('subflow');
    const matchingSubflow = subflowNodes.find(n => n.nodeId === subflowId);
    
    if (matchingSubflow) {
      return matchingSubflow.variableName;
    }
    
    // Check for other agent nodes that might be part of the subflow
    const agentNodes = BaseAgentFlowV2Converter.referenceResolver.getNodesByType('agent');
    if (agentNodes.length > 0) {
      return `[${agentNodes.map(n => n.variableName).join(', ')}]`;
    }
    
    return '[]';
  }
}

/**
 * Agent Node Converter
 * Central reasoning and planning node
 */
export class AgentNodeConverter extends BaseAgentFlowV2Converter {
  readonly flowiseType = 'agentNode';

  protected getRequiredImports(): string[] {
    return ['AgentExecutor', 'createOpenAIFunctionsAgent', 'createStructuredChatAgent', 'createReactAgent'];
  }

  protected override getAdditionalImports(node: IRNode, _context: GenerationContext): string[] {
    const imports: string[] = [];
    const agentType = this.getParameterValue(node, 'agentType', 'openai-functions') as string;
    
    // Add prompt imports based on agent type
    switch (agentType) {
      case 'openai-functions':
      case 'structured-chat':
        imports.push('import { ChatPromptTemplate } from "@langchain/core/prompts";');
        break;
      case 'react':
        imports.push('import { PromptTemplate } from "@langchain/core/prompts";');
        break;
    }
    
    return imports;
  }

  protected getPackageName(): string {
    return 'langchain/agents';
  }

  protected getClassName(): string {
    return 'AgentExecutor';
  }

  protected getNodeType(): string {
    return 'agent';
  }

  protected extractNodeConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Agent configuration
    const maxIterations = this.getParameterValue(node, 'maxIterations', 10);
    const verboseMode = this.getParameterValue(node, 'verbose', false);
    const handleParsingErrors = this.getParameterValue(
      node,
      'handleParsingErrors',
      true
    );
    const returnIntermediateSteps = this.getParameterValue(
      node,
      'returnIntermediateSteps',
      false
    );

    // Tools and LLM references
    const llmRef = this.getParameterValue(node, 'llm', null);
    const toolsRef = this.getParameterValue(node, 'tools', []);
    const memoryRef = this.getParameterValue(node, 'memory', null);

    config['maxIterations'] = maxIterations;
    config['verbose'] = verboseMode;
    config['handleParsingErrors'] = handleParsingErrors;
    config['returnIntermediateSteps'] = returnIntermediateSteps;
    
    // Add input references with placeholders for resolution
    if (llmRef) {
      config['llm'] = 'LLM_REFERENCE_PLACEHOLDER';
    }

    if (toolsRef && Array.isArray(toolsRef) && toolsRef.length > 0) {
      config['tools'] = 'TOOLS_REFERENCE_PLACEHOLDER';
    }

    if (memoryRef) {
      config['memory'] = 'MEMORY_REFERENCE_PLACEHOLDER';
    }

    return config;
  }

  protected extractNodeState(node: IRNode): Record<string, unknown> {
    const state: Record<string, unknown> = {};

    const persistState = this.getParameterValue(node, 'persistState', false);
    const stateKey = this.getParameterValue(node, 'stateKey', 'agent_state');

    if (persistState) {
      state['persist'] = true;
      state['key'] = stateKey;
    }

    return state;
  }

  override getDependencies(
    node: IRNode,
    _context: GenerationContext
  ): string[] {
    const deps = ['langchain', '@langchain/core'];

    // Add memory dependencies if needed
    const memoryRef = this.getParameterValue(node, 'memory', null);
    if (memoryRef) {
      deps.push('@langchain/core/memory');
    }

    // Add callback dependencies if enabled
    const enableCallbacks = this.getParameterValue(
      node,
      'enableCallbacks',
      false
    );
    if (enableCallbacks) {
      deps.push('@langchain/core/callbacks');
    }

    // Add agent-specific dependencies based on agent type
    const agentType = this.getParameterValue(
      node,
      'agentType',
      'openai-functions'
    ) as string;
    switch (agentType) {
      case 'openai-functions':
        deps.push('@langchain/openai');
        break;
      case 'structured-chat':
      case 'react':
        deps.push('@langchain/core/prompts');
        break;
    }

    return [...new Set(deps)];
  }

  override canConvert(node: IRNode): boolean {
    if (!super.canConvert(node)) return false;

    // Validate required parameters for agent node
    const llmRef = this.getParameterValue(node, 'llm', null);
    const toolsRef = this.getParameterValue(node, 'tools', []);

    return llmRef !== null && Array.isArray(toolsRef);
  }

  /**
   * Get supported agent types
   */
  getSupportedAgentTypes(): string[] {
    return [
      'openai-functions',
      'structured-chat',
      'react',
      'conversational-react',
      'zero-shot-react',
    ];
  }

  /**
   * Validate agent configuration
   */
  validateConfiguration(node: IRNode): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check agent type
    const agentType = this.getParameterValue(
      node,
      'agentType',
      'openai-functions'
    ) as string;
    if (!this.getSupportedAgentTypes().includes(agentType)) {
      errors.push(`Unsupported agent type: ${agentType}`);
    }

    // Check max iterations
    const maxIterations = this.getParameterValue(node, 'maxIterations', 10);
    if (
      typeof maxIterations !== 'number' ||
      maxIterations < 1 ||
      maxIterations > 100
    ) {
      errors.push('maxIterations must be a number between 1 and 100');
    }

    // Check max execution time
    const maxExecutionTime = this.getParameterValue(
      node,
      'maxExecutionTime',
      30000
    );
    if (typeof maxExecutionTime !== 'number' || maxExecutionTime < 1000) {
      errors.push('maxExecutionTime must be at least 1000ms');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate setup code for agent configurations
   */
  protected override generateSetupCode(
    node: IRNode,
    _context: GenerationContext,
    variableName: string
  ): string {
    const setupLines: string[] = [];

    // Check for advanced features that require setup
    const enableCallbacks = this.getParameterValue(
      node,
      'enableCallbacks',
      false
    );
    const dynamicTools = this.getParameterValue(node, 'dynamicTools', false);
    const planningStrategy = this.getParameterValue(
      node,
      'planningStrategy',
      null
    );
    const errorHandlingStrategy = this.getParameterValue(
      node,
      'errorHandlingStrategy',
      null
    );

    if (enableCallbacks) {
      setupLines.push(`// Setup callback manager`);
      setupLines.push(
        `const ${variableName}_callbackManager = new CallbackManager();`
      );
    }

    if (dynamicTools) {
      setupLines.push(`// Setup dynamic tool loading`);
      setupLines.push(
        `const ${variableName}_toolLoader = new DynamicToolLoader();`
      );
    }

    if (planningStrategy) {
      setupLines.push(`// Configure planning strategy: ${planningStrategy}`);
      setupLines.push(
        `const ${variableName}_planner = new PlanningStrategy('${planningStrategy}');`
      );
    }

    if (errorHandlingStrategy) {
      setupLines.push(
        `// Configure error handling strategy: ${errorHandlingStrategy}`
      );
      setupLines.push(
        `const ${variableName}_errorHandler = new ErrorHandler('${errorHandlingStrategy}');`
      );
    }

    return setupLines.length > 0 ? setupLines.join('\n') : '';
  }
}

/**
 * Tool Node Converter
 * Direct tool execution in workflows
 */
export class ToolNodeConverter extends BaseAgentFlowV2Converter {
  readonly flowiseType = 'toolNode';
  override readonly category = 'agentflow-v2';

  protected getRequiredImports(): string[] {
    return ['DynamicTool', 'Tool'];
  }

  protected getPackageName(): string {
    return '@langchain/core/tools';
  }

  protected getClassName(): string {
    return 'DynamicTool';
  }

  protected getNodeType(): string {
    return 'tool';
  }

  protected override getAdditionalImports(
    node: IRNode,
    _context: GenerationContext
  ): string[] {
    const imports: string[] = [];

    // Add validation imports if schema validation is enabled
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});
    if (
      (inputSchema && Object.keys(inputSchema).length > 0) ||
      (outputSchema && Object.keys(outputSchema).length > 0)
    ) {
      imports.push('import { z } from "zod";');
    }

    // Add async execution imports
    const asyncExecution = this.getParameterValue(node, 'async', false);
    if (asyncExecution) {
      imports.push(
        'import { AsyncCallbackManagerForToolRun } from "@langchain/core/callbacks/manager";'
      );
    }

    // Add error handling imports
    const enableRetry = this.getParameterValue(node, 'enableRetry', false);
    if (enableRetry) {
      imports.push(
        'import { AsyncRetrier } from "@langchain/core/utils/async_caller";'
      );
    }

    return imports;
  }

  protected override generateSetupCode(
    node: IRNode,
    _context: GenerationContext,
    variableName: string
  ): string {
    const setupLines: string[] = [];

    // Setup input/output validation schemas
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});

    if (Object.keys(inputSchema || {}).length > 0) {
      setupLines.push(`// Input validation schema`);
      setupLines.push(
        `const ${variableName}_inputSchema = z.object(${JSON.stringify(inputSchema, null, 2)});`
      );
    }

    if (Object.keys(outputSchema || {}).length > 0) {
      setupLines.push(`// Output validation schema`);
      setupLines.push(
        `const ${variableName}_outputSchema = z.object(${JSON.stringify(outputSchema, null, 2)});`
      );
    }

    // Setup retry configuration
    const enableRetry = this.getParameterValue(node, 'enableRetry', false);
    if (enableRetry) {
      const maxRetries = this.getParameterValue(node, 'maxRetries', 3);
      const retryDelay = this.getParameterValue(node, 'retryDelay', 1000);
      setupLines.push(`// Retry configuration`);
      setupLines.push(`const ${variableName}_retrier = new AsyncRetrier({`);
      setupLines.push(`  maxRetries: ${maxRetries},`);
      setupLines.push(`  retryDelay: ${retryDelay}`);
      setupLines.push(`});`);
    }

    return setupLines.length > 0 ? setupLines.join('\n') : '';
  }

  protected extractNodeConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Basic tool configuration
    const toolName = this.getParameterValue(node, 'name', 'custom_tool');
    const description = this.getParameterValue(
      node,
      'description',
      'A custom tool'
    );
    const returnDirect = this.getParameterValue(node, 'returnDirect', false);
    const toolFunction = this.getParameterValue(node, 'func', null);
    
    // Check if tool function is a reference to another node
    const connectedFunction = this.getParameterValue(node, 'connectedFunction', null);
    if (connectedFunction) {
      config['_connectedFunction'] = connectedFunction;
    }
    
    // Advanced configuration
    const timeout = this.getParameterValue(node, 'timeout', 10000);
    const enableRetry = this.getParameterValue(node, 'enableRetry', false);
    const asyncExecution = this.getParameterValue(node, 'async', false);
    const enableCaching = this.getParameterValue(node, 'enableCaching', false);
    const enableLogging = this.getParameterValue(node, 'enableLogging', true);

    // Schema validation
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});
    const validateInput = this.getParameterValue(node, 'validateInput', false);
    const validateOutput = this.getParameterValue(
      node,
      'validateOutput',
      false
    );

    // Build configuration
    config['name'] = toolName;
    config['description'] = description;
    config['returnDirect'] = returnDirect;

    // Enhanced function with validation and error handling
    if (toolFunction) {
      const funcLines: string[] = [];

      if (asyncExecution) {
        funcLines.push(
          `async (input: string, runManager?: AsyncCallbackManagerForToolRun) => {`
        );
      } else {
        funcLines.push(`(input: string) => {`);
      }

      // Add input validation
      if (validateInput && Object.keys(inputSchema || {}).length > 0) {
        funcLines.push(`  // Validate input`);
        funcLines.push(
          `  const parsedInput = ${toolName}_inputSchema.parse(JSON.parse(input));`
        );
      }

      // Add logging
      if (enableLogging) {
        funcLines.push(
          `  console.log('Executing tool: ${toolName}', { input });`
        );
      }

      // Add timeout wrapper
      if (timeout && timeout > 0) {
        funcLines.push(`  const timeoutPromise = new Promise((_, reject) => {`);
        funcLines.push(
          `    setTimeout(() => reject(new Error('Tool execution timeout')), ${timeout});`
        );
        funcLines.push(`  });`);
      }

      // Add retry wrapper
      if (enableRetry) {
        funcLines.push(`  return await ${toolName}_retrier.call(async () => {`);
      }

      // Add the actual tool function
      funcLines.push(`    try {`);
      if (typeof toolFunction === 'string' && (toolFunction as string).includes('_PLACEHOLDER')) {
        // TODO: Placeholder resolution needs context - currently disabled
        funcLines.push(`      const result = await (${toolFunction})(parsedInput || input);`);
      } else {
        funcLines.push(`      const result = await (${toolFunction})(parsedInput || input);`);
      }
      
      // Add output validation
      if (validateOutput && Object.keys(outputSchema || {}).length > 0) {
        funcLines.push(`      // Validate output`);
        funcLines.push(
          `      const validatedResult = ${toolName}_outputSchema.parse(result);`
        );
        funcLines.push(`      return JSON.stringify(validatedResult);`);
      } else {
        funcLines.push(
          `      return typeof result === 'string' ? result : JSON.stringify(result);`
        );
      }

      funcLines.push(`    } catch (error) {`);
      funcLines.push(`      console.error('Tool execution error:', error);`);
      funcLines.push(`      throw error;`);
      funcLines.push(`    }`);

      if (enableRetry) {
        funcLines.push(`  });`);
      }
      
      funcLines.push(`}`);

      config['func'] = funcLines.join('\n');
    }

    // Add metadata
    config['_metadata'] = {
      timeout,
      enableRetry,
      asyncExecution,
      enableCaching,
      enableLogging,
      validateInput,
      validateOutput,
    };

    return config;
  }

  protected extractNodeState(node: IRNode): Record<string, unknown> {
    const state: Record<string, unknown> = {};

    // Caching configuration
    const enableCaching = this.getParameterValue(node, 'enableCaching', false);
    if (enableCaching) {
      state['cache'] = {
        enabled: true,
        maxSize: this.getParameterValue(node, 'cacheSize', 100),
        ttl: this.getParameterValue(node, 'cacheTTL', 3600000), // 1 hour
        keyStrategy: this.getParameterValue(
          node,
          'cacheKeyStrategy',
          'input-hash'
        ),
      };
    }

    // Metrics tracking
    const trackMetrics = this.getParameterValue(node, 'trackMetrics', false);
    if (trackMetrics) {
      state['metrics'] = {
        enabled: true,
        trackExecutionTime: true,
        trackSuccessRate: true,
        trackErrorCount: true,
        trackUsageCount: true,
      };
    }

    // Rate limiting
    const enableRateLimit = this.getParameterValue(
      node,
      'enableRateLimit',
      false
    );
    if (enableRateLimit) {
      state['rateLimit'] = {
        enabled: true,
        maxRequests: this.getParameterValue(node, 'maxRequests', 60),
        windowMs: this.getParameterValue(node, 'rateLimitWindow', 60000), // 1 minute
      };
    }

    return state;
  }

  override getDependencies(
    node: IRNode,
    _context: GenerationContext
  ): string[] {
    const deps = ['@langchain/core'];

    // Add validation dependencies
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});
    if (
      Object.keys(inputSchema || {}).length > 0 ||
      Object.keys(outputSchema || {}).length > 0
    ) {
      deps.push('zod');
    }

    // Add async dependencies
    const asyncExecution = this.getParameterValue(node, 'async', false);
    if (asyncExecution) {
      deps.push('@langchain/core/callbacks');
    }

    // Add retry dependencies
    const enableRetry = this.getParameterValue(node, 'enableRetry', false);
    if (enableRetry) {
      deps.push('@langchain/core/utils');
    }

    return [...new Set(deps)];
  }

  override canConvert(node: IRNode): boolean {
    if (!super.canConvert(node)) return false;

    // Validate required parameters for tool node
    const toolName = this.getParameterValue(node, 'name', null);
    const toolFunction = this.getParameterValue(node, 'func', null);

    return toolName !== null && toolFunction !== null;
  }

  /**
   * Get supported tool types
   */
  getSupportedToolTypes(): string[] {
    return [
      'dynamic',
      'structured',
      'calculator',
      'search',
      'api-call',
      'file-system',
      'custom',
    ];
  }

  /**
   * Validate tool configuration
   */
  validateConfiguration(node: IRNode): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check tool name
    const toolName = this.getParameterValue(node, 'name', null) as
      | string
      | null;
    if (
      !toolName ||
      typeof toolName !== 'string' ||
      toolName.trim().length === 0
    ) {
      errors.push('Tool name is required and must be a non-empty string');
    }

    // Check tool function
    const toolFunction = this.getParameterValue(node, 'func', null);
    if (!toolFunction) {
      errors.push('Tool function is required');
    }

    // Check timeout
    const timeout = this.getParameterValue(node, 'timeout', 10000);
    if (typeof timeout !== 'number' || timeout < 0) {
      errors.push('Timeout must be a non-negative number');
    }

    // Check retry configuration
    const enableRetry = this.getParameterValue(node, 'enableRetry', false);
    const maxRetries = this.getParameterValue(node, 'maxRetries', null);

    // Check maxRetries if it's provided, regardless of enableRetry
    if (
      maxRetries !== null &&
      (typeof maxRetries !== 'number' || maxRetries < 0 || maxRetries > 10)
    ) {
      errors.push('maxRetries must be a number between 0 and 10');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Custom Function Node Converter
 * JavaScript execution with state modification
 */
export class CustomFunctionNodeConverter extends BaseAgentFlowV2Converter {
  readonly flowiseType = 'customFunctionNode';
  override readonly category = 'agentflow-v2';

  protected getRequiredImports(): string[] {
    return ['RunnableLambda'];
  }

  protected getPackageName(): string {
    return '@langchain/core/runnables';
  }

  protected getClassName(): string {
    return 'RunnableLambda';
  }

  protected getNodeType(): string {
    return 'function';
  }

  protected override getAdditionalImports(
    node: IRNode,
    _context: GenerationContext
  ): string[] {
    const imports: string[] = [];

    // Add schema validation imports
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});
    if (
      (inputSchema && Object.keys(inputSchema).length > 0) ||
      (outputSchema && Object.keys(outputSchema).length > 0)
    ) {
      imports.push('import { z } from "zod";');
    }

    // Add state management imports
    const enableState = this.getParameterValue(node, 'enableState', false);
    if (enableState) {
      imports.push(
        'import { RunnablePassthrough } from "@langchain/core/runnables";'
      );
    }

    // Add error handling imports
    const enableErrorHandling = this.getParameterValue(
      node,
      'enableErrorHandling',
      true
    );
    if (enableErrorHandling) {
      imports.push(
        'import { RunnableConfig } from "@langchain/core/runnables";'
      );
    }

    // Add context imports
    const enableContext = this.getParameterValue(node, 'enableContext', false);
    if (enableContext) {
      imports.push(
        'import { CallbackManagerForChainRun } from "@langchain/core/callbacks/manager";'
      );
    }

    return imports;
  }

  protected override generateSetupCode(
    node: IRNode,
    _context: GenerationContext,
    variableName: string
  ): string {
    const setupLines: string[] = [];

    // Setup validation schemas
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});

    if (Object.keys(inputSchema || {}).length > 0) {
      setupLines.push(`// Input validation schema`);
      setupLines.push(
        `const ${variableName}_inputSchema = z.object(${JSON.stringify(inputSchema, null, 2)});`
      );
    }

    if (Object.keys(outputSchema || {}).length > 0) {
      setupLines.push(`// Output validation schema`);
      setupLines.push(
        `const ${variableName}_outputSchema = z.object(${JSON.stringify(outputSchema, null, 2)});`
      );
    }

    // Setup state management
    const enableState = this.getParameterValue(node, 'enableState', false);
    if (enableState) {
      const stateVariables = this.getParameterValue(node, 'stateVariables', {});
      setupLines.push(`// State management`);
      setupLines.push(
        `const ${variableName}_state = ${JSON.stringify(stateVariables, null, 2)};`
      );
    }

    // Setup error handling configuration
    const enableErrorHandling = this.getParameterValue(
      node,
      'enableErrorHandling',
      true
    );
    if (enableErrorHandling) {
      const errorStrategy = this.getParameterValue(
        node,
        'errorStrategy',
        'throw'
      ) as string;
      const fallbackValue = this.getParameterValue(node, 'fallbackValue', null);
      setupLines.push(`// Error handling configuration`);
      setupLines.push(`const ${variableName}_errorConfig = {`);
      setupLines.push(`  strategy: '${errorStrategy}',`);
      setupLines.push(`  fallbackValue: ${JSON.stringify(fallbackValue)}`);
      setupLines.push(`};`);
    }

    return setupLines.length > 0 ? setupLines.join('\n') : '';
  }

  protected extractNodeConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Basic function configuration
    const functionCode = this.getParameterValue(node, 'code', '');
    const asyncExecution = this.getParameterValue(node, 'async', false);
    const name = this.getParameterValue(node, 'name', 'custom_function');

    // Validation and schema configuration
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});
    const validateInput = this.getParameterValue(node, 'validateInput', false);
    const validateOutput = this.getParameterValue(
      node,
      'validateOutput',
      false
    );

    // State and context configuration
    const enableState = this.getParameterValue(node, 'enableState', false);
    const enableContext = this.getParameterValue(node, 'enableContext', false);
    const enableLogging = this.getParameterValue(node, 'enableLogging', true);

    // Error handling configuration
    const enableErrorHandling = this.getParameterValue(
      node,
      'enableErrorHandling',
      true
    );
    const errorStrategy = this.getParameterValue(
      node,
      'errorStrategy',
      'throw'
    ) as string;
    const timeout = this.getParameterValue(node, 'timeout', 30000);

    // Performance configuration
    const enableCaching = this.getParameterValue(node, 'enableCaching', false);
    const enableMetrics = this.getParameterValue(node, 'enableMetrics', false);

    // Build the function with enhanced features
    if (functionCode) {
      const funcLines: string[] = [];

      // Function signature
      if (asyncExecution) {
        funcLines.push(`async (input: any, config?: RunnableConfig) => {`);
      } else {
        funcLines.push(`(input: any) => {`);
      }

      // Add function start logging
      if (enableLogging) {
        funcLines.push(
          `  console.log('[${name}] Function execution started', { input });`
        );
      }

      // Add metrics tracking
      if (enableMetrics) {
        funcLines.push(`  const startTime = performance.now();`);
      }

      // Add input validation
      if (validateInput && Object.keys(inputSchema || {}).length > 0) {
        funcLines.push(`  // Validate input`);
        funcLines.push(`  try {`);
        funcLines.push(`    input = ${name}_inputSchema.parse(input);`);
        funcLines.push(`  } catch (error) {`);
        funcLines.push(
          `    throw new Error('Input validation failed: ' + error.message);`
        );
        funcLines.push(`  }`);
      }

      // Add state initialization
      if (enableState) {
        funcLines.push(`  // Initialize state`);
        funcLines.push(`  const state = { ...${name}_state };`);
      }

      // Add context preparation
      if (enableContext) {
        funcLines.push(`  // Prepare execution context`);
        funcLines.push(`  const context = {`);
        funcLines.push(`    input,`);
        if (enableState) {
          funcLines.push(`    state,`);
        }
        funcLines.push(`    config,`);
        funcLines.push(`    timestamp: Date.now()`);
        funcLines.push(`  };`);
      }

      // Add timeout wrapper
      if (timeout && timeout > 0) {
        funcLines.push(`  // Timeout wrapper`);
        funcLines.push(`  const timeoutPromise = new Promise((_, reject) => {`);
        funcLines.push(
          `    setTimeout(() => reject(new Error('Function execution timeout')), ${timeout});`
        );
        funcLines.push(`  });`);
      }

      // Add error handling wrapper
      if (enableErrorHandling) {
        funcLines.push(`  try {`);
      }

      // Add the actual function code
      funcLines.push(`    // User function code`);
      const contextVars = [];
      if (enableState) contextVars.push('state');
      if (enableContext) contextVars.push('context');
      
      // Check if function code contains references to resolve
      let resolvedFunctionCode = functionCode;
      if (typeof functionCode === 'string' && (functionCode as string).includes('_PLACEHOLDER')) {
        // TODO: Placeholder resolution needs context - currently disabled
        resolvedFunctionCode = functionCode;
      }
      
      if (contextVars.length > 0) {
        funcLines.push(
          `    const userFunction = (input, ${contextVars.join(', ')}) => {`
        );
      } else {
        funcLines.push(`    const userFunction = (input) => {`);
      }
      
      funcLines.push(`      ${resolvedFunctionCode}`);
      funcLines.push(`    };`);

      // Execute the function
      if (timeout && timeout > 0) {
        if (contextVars.length > 0) {
          funcLines.push(`    const result = await Promise.race([`);
          funcLines.push(
            `      userFunction(input, ${contextVars.join(', ')}),`
          );
          funcLines.push(`      timeoutPromise`);
          funcLines.push(`    ]);`);
        } else {
          funcLines.push(`    const result = await Promise.race([`);
          funcLines.push(`      userFunction(input),`);
          funcLines.push(`      timeoutPromise`);
          funcLines.push(`    ]);`);
        }
      } else {
        if (contextVars.length > 0) {
          funcLines.push(
            `    const result = await userFunction(input, ${contextVars.join(', ')});`
          );
        } else {
          funcLines.push(`    const result = await userFunction(input);`);
        }
      }

      // Add output validation
      if (validateOutput && Object.keys(outputSchema || {}).length > 0) {
        funcLines.push(`    // Validate output`);
        funcLines.push(
          `    const validatedResult = ${name}_outputSchema.parse(result);`
        );
      }

      // Add metrics tracking
      if (enableMetrics) {
        funcLines.push(
          `    const executionTime = performance.now() - startTime;`
        );
        funcLines.push(
          `    console.log('[${name}] Execution metrics', { executionTime, success: true });`
        );
      }

      // Add success logging
      if (enableLogging) {
        funcLines.push(
          `    console.log('[${name}] Function execution completed', { result: ${validateOutput ? 'validatedResult' : 'result'} });`
        );
      }

      funcLines.push(
        `    return ${validateOutput && Object.keys(outputSchema || {}).length > 0 ? 'validatedResult' : 'result'};`
      );

      // Close error handling
      if (enableErrorHandling) {
        funcLines.push(`  } catch (error) {`);
        funcLines.push(
          `    console.error('[${name}] Function execution error:', error);`
        );

        if (errorStrategy && errorStrategy === 'fallback') {
          funcLines.push(
            `    if (${name}_errorConfig.fallbackValue !== null) {`
          );
          funcLines.push(`      return ${name}_errorConfig.fallbackValue;`);
          funcLines.push(`    }`);
        } else if (errorStrategy && errorStrategy === 'continue') {
          funcLines.push(`    return input; // Continue with original input`);
        }

        funcLines.push(`    throw error;`);
        funcLines.push(`  }`);
      }

      funcLines.push(`}`);

      config['func'] = funcLines.join('\n');
    }

    // Add metadata
    config['_metadata'] = {
      name,
      asyncExecution,
      validateInput,
      validateOutput,
      enableState,
      enableContext,
      enableLogging,
      enableErrorHandling,
      errorStrategy,
      timeout,
      enableCaching,
      enableMetrics,
    };

    return config;
  }

  protected extractNodeState(node: IRNode): Record<string, unknown> {
    const state: Record<string, unknown> = {};

    // State management configuration
    const stateVariables = this.getParameterValue(node, 'stateVariables', {});
    const persistState = this.getParameterValue(node, 'persistState', false);
    const enableState = this.getParameterValue(node, 'enableState', false);
    const stateScope = this.getParameterValue(node, 'stateScope', 'local'); // local, global, session

    if (enableState || Object.keys(stateVariables || {}).length > 0) {
      state['variables'] = stateVariables;
      state['scope'] = stateScope;

      if (persistState) {
        state['persist'] = true;
        state['persistKey'] = this.getParameterValue(
          node,
          'persistKey',
          `custom_function_${node.id}`
        );
        state['persistTTL'] = this.getParameterValue(
          node,
          'persistTTL',
          86400000
        ); // 24 hours
      }
    }

    // Caching configuration
    const enableCaching = this.getParameterValue(node, 'enableCaching', false);
    if (enableCaching) {
      state['cache'] = {
        enabled: true,
        maxSize: this.getParameterValue(node, 'cacheSize', 100),
        ttl: this.getParameterValue(node, 'cacheTTL', 3600000), // 1 hour
        keyStrategy: this.getParameterValue(
          node,
          'cacheKeyStrategy',
          'input-hash'
        ),
        includeState: this.getParameterValue(node, 'cacheIncludeState', true),
      };
    }

    // Metrics configuration
    const enableMetrics = this.getParameterValue(node, 'enableMetrics', false);
    if (enableMetrics) {
      state['metrics'] = {
        enabled: true,
        trackExecutionTime: true,
        trackMemoryUsage: this.getParameterValue(
          node,
          'trackMemoryUsage',
          false
        ),
        trackStateChanges: this.getParameterValue(
          node,
          'trackStateChanges',
          enableState
        ),
        trackErrorRate: true,
        aggregateMetrics: this.getParameterValue(
          node,
          'aggregateMetrics',
          true
        ),
      };
    }

    return state;
  }

  override getDependencies(
    node: IRNode,
    _context: GenerationContext
  ): string[] {
    const deps = ['@langchain/core'];

    // Add validation dependencies
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});
    if (
      Object.keys(inputSchema || {}).length > 0 ||
      Object.keys(outputSchema || {}).length > 0
    ) {
      deps.push('zod');
    }

    // Add async dependencies
    const asyncExecution = this.getParameterValue(node, 'async', false);
    if (asyncExecution) {
      deps.push('@langchain/core/runnables');
    }

    // Add callback dependencies for context
    const enableContext = this.getParameterValue(node, 'enableContext', false);
    if (enableContext) {
      deps.push('@langchain/core/callbacks');
    }

    return [...new Set(deps)];
  }

  override canConvert(node: IRNode): boolean {
    if (!super.canConvert(node)) return false;

    // Validate required parameters for custom function node
    const functionCode = this.getParameterValue(node, 'code', null) as
      | string
      | null;

    return (
      functionCode !== null &&
      typeof functionCode === 'string' &&
      functionCode.trim().length > 0
    );
  }

  /**
   * Get supported execution modes
   */
  getSupportedExecutionModes(): string[] {
    return ['synchronous', 'asynchronous', 'streaming', 'batch'];
  }

  /**
   * Get supported state scopes
   */
  getSupportedStateScopes(): string[] {
    return ['local', 'global', 'session', 'persistent'];
  }

  /**
   * Validate custom function configuration
   */
  validateConfiguration(node: IRNode): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check function code
    const functionCode = this.getParameterValue(node, 'code', null) as
      | string
      | null;
    if (
      !functionCode ||
      typeof functionCode !== 'string' ||
      functionCode.trim().length === 0
    ) {
      errors.push('Function code is required and must be a non-empty string');
    }

    // Check timeout
    const timeout = this.getParameterValue(node, 'timeout', 30000);
    if (typeof timeout !== 'number' || timeout < 0 || timeout > 300000) {
      errors.push(
        'Timeout must be a number between 0 and 300000ms (5 minutes)'
      );
    }

    // Check state scope
    const stateScope = this.getParameterValue(node, 'stateScope', 'local');
    if (!this.getSupportedStateScopes().includes(stateScope || '')) {
      errors.push(`Unsupported state scope: ${stateScope}`);
    }

    // Check error strategy
    const errorStrategy = this.getParameterValue(
      node,
      'errorStrategy',
      'throw'
    ) as string;
    const supportedStrategies = ['throw', 'fallback', 'continue', 'ignore'];
    if (!supportedStrategies.includes(errorStrategy || '')) {
      errors.push(`Unsupported error strategy: ${errorStrategy}`);
    }

    // Validate schemas if provided
    const inputSchema = this.getParameterValue(node, 'inputSchema', {});
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});

    if (typeof inputSchema !== 'object' || Array.isArray(inputSchema)) {
      errors.push('Input schema must be an object');
    }

    if (typeof outputSchema !== 'object' || Array.isArray(outputSchema)) {
      errors.push('Output schema must be an object');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Subflow Node Converter
 * Nested workflow invocation
 */
export class SubflowNodeConverter extends BaseAgentFlowV2Converter {
  readonly flowiseType = 'subflowNode';

  protected getRequiredImports(): string[] {
    return ['RunnableSequence'];
  }

  protected getPackageName(): string {
    return '@langchain/core/runnables';
  }

  protected getClassName(): string {
    return 'RunnableSequence';
  }

  protected getNodeType(): string {
    return 'subflow';
  }

  protected override getAdditionalImports(
    node: IRNode,
    _context: GenerationContext
  ): string[] {
    const imports: string[] = [];

    // Add parallel execution imports
    const parallelExecution = this.getParameterValue(node, 'parallel', false);
    if (parallelExecution) {
      imports.push(
        'import { RunnableParallel } from "@langchain/core/runnables";'
      );
    }

    // Add conditional execution imports
    const enableConditional = this.getParameterValue(
      node,
      'enableConditional',
      false
    );
    if (enableConditional) {
      imports.push(
        'import { RunnableBranch } from "@langchain/core/runnables";'
      );
    }

    // Add retry imports
    const enableRetry = this.getParameterValue(node, 'enableRetry', false);
    if (enableRetry) {
      imports.push(
        'import { RetryOptions } from "@langchain/core/utils/async_caller";'
      );
    }

    return imports;
  }

  protected extractNodeConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const subflowId = this.getParameterValue(node, 'subflowId', '');
    const inputMapping = this.getParameterValue(node, 'inputMapping', {});
    const outputMapping = this.getParameterValue(node, 'outputMapping', {});
    const parallelExecution = this.getParameterValue(node, 'parallel', false);

    config['subflowId'] = subflowId;
    config['steps'] = 'SUBFLOW_STEPS_PLACEHOLDER';
    
    if (Object.keys(inputMapping || {}).length > 0) {
      config['inputMapping'] = inputMapping;
    }

    if (Object.keys(outputMapping || {}).length > 0) {
      config['outputMapping'] = outputMapping;
    }

    config['parallel'] = parallelExecution;

    return config;
  }

  protected extractNodeState(node: IRNode): Record<string, unknown> {
    const state: Record<string, unknown> = {};

    const shareContext = this.getParameterValue(node, 'shareContext', true);
    const isolateState = this.getParameterValue(node, 'isolateState', false);

    state['shareContext'] = shareContext;
    state['isolateState'] = isolateState;

    return state;
  }

  protected override generateSetupCode(
    node: IRNode,
    _context: GenerationContext,
    variableName: string
  ): string {
    const setupLines: string[] = [];

    // Setup input/output mapping
    const inputMapping = this.getParameterValue(node, 'inputMapping', {});
    const outputMapping = this.getParameterValue(node, 'outputMapping', {});

    if (Object.keys(inputMapping || {}).length > 0) {
      setupLines.push(`// Input mapping configuration`);
      setupLines.push(
        `const ${variableName}_inputMapping = ${JSON.stringify(inputMapping, null, 2)};`
      );
    }

    if (Object.keys(outputMapping || {}).length > 0) {
      setupLines.push(`// Output mapping configuration`);
      setupLines.push(
        `const ${variableName}_outputMapping = ${JSON.stringify(outputMapping, null, 2)};`
      );
    }

    // Setup conditional execution
    const enableConditional = this.getParameterValue(
      node,
      'enableConditional',
      false
    );
    if (enableConditional) {
      const conditionCode = this.getParameterValue(
        node,
        'conditionCode',
        'true'
      );
      setupLines.push(`// Conditional execution logic`);
      setupLines.push(`const ${variableName}_condition = (input: any) => {`);
      setupLines.push(`  return ${conditionCode};`);
      setupLines.push(`};`);
    }

    // Setup retry configuration
    const enableRetry = this.getParameterValue(node, 'enableRetry', false);
    if (enableRetry) {
      const maxRetries = this.getParameterValue(node, 'maxRetries', 3);
      const retryDelay = this.getParameterValue(node, 'retryDelay', 1000);
      setupLines.push(`// Retry configuration`);
      setupLines.push(`const ${variableName}_retryConfig = {`);
      setupLines.push(`  maxRetries: ${maxRetries},`);
      setupLines.push(`  retryDelay: ${retryDelay}`);
      setupLines.push(`};`);
    }

    return setupLines.length > 0 ? setupLines.join('\n') : '';
  }

  protected override generateInitializationCode(
    node: IRNode,
    _context: GenerationContext,
    variableName: string,
    config: any,
    _configStr: string
  ): string {
    const parallelExecution = this.getParameterValue(node, 'parallel', false);
    const enableErrorHandling = this.getParameterValue(
      node,
      'enableErrorHandling',
      true
    );
    const enableRetry = this.getParameterValue(node, 'enableRetry', false);
    const enableConditional = this.getParameterValue(
      node,
      'enableConditional',
      false
    );

    const initLines: string[] = [];

    // Choose the appropriate runnable type
    // let runnableClass = 'RunnableSequence';
    // if (parallelExecution && !enableConditional) {
    //   runnableClass = 'RunnableParallel';
    // } else if (enableConditional) {
    //   runnableClass = 'RunnableBranch';
    // }

    // Create the base runnable
    if (enableConditional) {
      // Create conditional branch
      initLines.push(`// Create conditional subflow execution`);
      initLines.push(`let ${variableName} = RunnableBranch.from([`);
      const conditionalSteps = this.resolveSubflowReference('CONDITIONAL_SUBFLOW_PLACEHOLDER', node, _context);
      const defaultSteps = this.resolveSubflowReference('DEFAULT_SUBFLOW_PLACEHOLDER', node, _context);
      initLines.push(`  [${variableName}_condition, ${conditionalSteps}],`);
      initLines.push(`  ${defaultSteps}`);
      initLines.push(`]);`);
    } else if (config.steps && Array.isArray(config.steps)) {
      if (parallelExecution) {
        initLines.push(`// Create parallel subflow execution`);
        initLines.push(`let ${variableName} = RunnableParallel.from({`);
        config.steps.forEach((step: string, index: number) => {
          initLines.push(
            `  step${index}: ${step}${index < config.steps.length - 1 ? ',' : ''}`
          );
        });
        initLines.push(`});`);
      } else {
        initLines.push(`// Create sequential subflow execution`);
        initLines.push(`let ${variableName} = RunnableSequence.from([`);
        initLines.push(
          config.steps.map((step: string) => `  ${step}`).join(',\n')
        );
        initLines.push(`]);`);
      }
    } else {
      // Fallback to simple sequence with resolved steps
      const resolvedSteps = this.resolveSubflowReference('SUBFLOW_STEPS_PLACEHOLDER', node, _context);
      initLines.push(`let ${variableName} = RunnableSequence.from(${resolvedSteps});`);
    }

    // Add error handling wrapper
    if (enableErrorHandling) {
      const errorStrategy = this.getParameterValue(
        node,
        'errorStrategy',
        'throw'
      ) as string;
      const fallbackSubflow = this.getParameterValue(
        node,
        'fallbackSubflow',
        null
      );

      if (errorStrategy === 'fallback' && fallbackSubflow) {
        initLines.push(`// Add error handling with fallback`);
        initLines.push(`${variableName} = ${variableName}.withFallbacks([`);
        const fallbackSteps = this.resolveSubflowReference('FALLBACK_SUBFLOW_PLACEHOLDER', node, _context);
        initLines.push(`  ${fallbackSteps}`);
        initLines.push(`]);`);
      }
    }

    // Add retry wrapper
    if (enableRetry) {
      initLines.push(`// Add retry capability`);
      initLines.push(
        `${variableName} = ${variableName}.withRetry(${variableName}_retryConfig);`
      );
    }

    return initLines.join('\n');
  }

  override getDependencies(
    node: IRNode,
    _context: GenerationContext
  ): string[] {
    const deps = ['@langchain/core'];

    // Add conditional execution dependencies
    const enableConditional = this.getParameterValue(
      node,
      'enableConditional',
      false
    );
    if (enableConditional) {
      deps.push('@langchain/core/runnables');
    }

    // Add error handling dependencies
    const enableErrorHandling = this.getParameterValue(
      node,
      'enableErrorHandling',
      true
    );
    if (enableErrorHandling) {
      deps.push('@langchain/core/runnables');
    }

    // Add monitoring dependencies
    const enableMonitoring = this.getParameterValue(
      node,
      'enableMonitoring',
      false
    );
    if (enableMonitoring) {
      deps.push('@langchain/core/callbacks');
    }

    return [...new Set(deps)];
  }

  override canConvert(node: IRNode): boolean {
    if (!super.canConvert(node)) return false;

    // Validate required parameters for subflow node
    const subflowId = this.getParameterValue(node, 'subflowId', null) as
      | string
      | null;

    return (
      subflowId !== null &&
      typeof subflowId === 'string' &&
      subflowId.trim().length > 0
    );
  }

  /**
   * Get supported execution modes
   */
  getSupportedExecutionModes(): string[] {
    return ['sequential', 'parallel', 'conditional', 'hybrid'];
  }

  /**
   * Get supported state scopes
   */
  getSupportedStateScopes(): string[] {
    return ['subflow', 'parent', 'global', 'isolated'];
  }

  /**
   * Validate subflow configuration
   */
  validateConfiguration(node: IRNode): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check subflow ID
    const subflowId = this.getParameterValue(node, 'subflowId', null) as
      | string
      | null;
    if (
      !subflowId ||
      typeof subflowId !== 'string' ||
      subflowId.trim().length === 0
    ) {
      errors.push('Subflow ID is required and must be a non-empty string');
    }

    // Check timeout
    const timeout = this.getParameterValue(node, 'timeout', 60000);
    if (typeof timeout !== 'number' || timeout < 1000 || timeout > 600000) {
      errors.push('Timeout must be between 1000ms and 600000ms (10 minutes)');
    }

    // Check state scope
    const stateScope = this.getParameterValue(node, 'stateScope', 'subflow');
    if (!this.getSupportedStateScopes().includes(stateScope || '')) {
      errors.push(`Unsupported state scope: ${stateScope}`);
    }

    // Check error strategy
    const errorStrategy = this.getParameterValue(
      node,
      'errorStrategy',
      'throw'
    ) as string;
    const supportedStrategies = ['throw', 'fallback', 'continue', 'ignore'];
    if (!supportedStrategies.includes(errorStrategy || '')) {
      errors.push(`Unsupported error strategy: ${errorStrategy}`);
    }

    // Check parallel execution configuration
    const parallelExecution = this.getParameterValue(node, 'parallel', false);
    const maxConcurrency = this.getParameterValue(node, 'maxConcurrency', null);

    // Check maxConcurrency if it's provided, regardless of parallel setting
    if (
      maxConcurrency !== null &&
      (typeof maxConcurrency !== 'number' ||
        maxConcurrency < 1 ||
        maxConcurrency > 20)
    ) {
      errors.push(
        'maxConcurrency must be between 1 and 20 for parallel execution'
      );
    }

    // Validate mapping configurations
    const inputMapping = this.getParameterValue(node, 'inputMapping', {});
    const outputMapping = this.getParameterValue(node, 'outputMapping', {});

    if (typeof inputMapping !== 'object' || Array.isArray(inputMapping)) {
      errors.push('Input mapping must be an object');
    }

    if (typeof outputMapping !== 'object' || Array.isArray(outputMapping)) {
      errors.push('Output mapping must be an object');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
