/**
 * Transformation utilities for converting Flowise JSON to IR and IR to code
 *
 * This module handles the conversion between different representations:
 * - Flowise JSON → IR
 * - IR → Code Fragments
 * - IR optimization and validation
 */

import {
  FlowiseChatFlow,
  FlowiseNode,
  FlowiseEdge,
  IRGraph,
  IRNode,
  IRConnection,
  IRGraphMetadata,
  CodeFragment,
  GenerationContext,
  ValidationResult,
  ConversionMetrics,
  CodeGenerationResult,
  GeneratedFile,
} from './types.js';
import { StandardNodeFactory } from './nodes.js';
import { IRGraphAnalyzer } from './graph.js';
import { ConverterFactory } from '../registry/registry.js';

/**
 * Transformation result containing the converted IR and metadata
 */
export interface TransformationResult {
  graph: IRGraph;
  metrics: ConversionMetrics;
  validation: ValidationResult;
  warnings: string[];
}

/**
 * Code generation metrics (specific to transformation process)
 */
export interface GenerationMetrics {
  fragmentsGenerated: number;
  filesGenerated: number;
  linesOfCode: number;
  dependencies: number;
  generationTime: number;
  codeSize: number;
}

/**
 * Flowise to IR transformer
 */
export class FlowiseToIRTransformer {
  private nodeFactory: StandardNodeFactory;
  private metrics: Partial<ConversionMetrics>;

  constructor() {
    this.nodeFactory = new StandardNodeFactory();
    this.metrics = {};
  }

  /**
   * Transform Flowise chatflow JSON to IR graph
   */
  async transform(flowiseData: FlowiseChatFlow): Promise<TransformationResult> {
    const _startTime = Date.now();
    this.metrics = {
      startTime: _startTime,
      phases: {
        parsing: 0,
        validation: 0,
        transformation: 0,
        generation: 0,
        writing: 0,
      },
    };

    try {
      // Parse metadata
      const parseStart = Date.now();
      const metadata = this.extractMetadata(flowiseData);
      this.metrics.phases!.parsing = Date.now() - parseStart;

      // Transform nodes
      const transformStart = Date.now();
      const nodes = await this.transformNodes(flowiseData.nodes || []);
      const connections = this.transformConnections(
        flowiseData.edges || [],
        nodes
      );
      this.metrics.phases!.transformation = Date.now() - transformStart;

      // Create IR graph
      const graph: IRGraph = {
        metadata,
        nodes,
        connections,
      };

      // Validate and analyze
      const validationStart = Date.now();
      const validation = IRGraphAnalyzer.validate(graph);
      const analysis = IRGraphAnalyzer.analyzeGraph(graph);
      graph.analysis = {
        isValid: validation.isValid,
        errors: validation.errors.map((e) => e.message),
        warnings: validation.warnings.map((w) => w.message),
        complexity: analysis.complexity,
        entryPoints: analysis.entryPoints,
        exitPoints: analysis.exitPoints,
        cycles: IRGraphAnalyzer.findCycles(graph),
        dependencies: new Map(),
      };
      this.metrics.phases!.validation = Date.now() - validationStart;

      // Complete metrics
      const endTime = Date.now();
      const completeMetrics: ConversionMetrics = {
        startTime: _startTime,
        endTime,
        duration: endTime - _startTime,
        nodesProcessed: nodes.length,
        connectionsProcessed: connections.length,
        codeFragmentsGenerated: 0,
        filesGenerated: 0,
        phases: this.metrics.phases!,
        coverage: {
          supportedNodes: nodes.filter((n) => !n.metadata?.deprecated).length,
          unsupportedNodes: 0,
          partiallySupported: 0,
        },
        memoryUsage: {
          peak: process.memoryUsage().heapUsed,
          average: process.memoryUsage().heapUsed,
          final: process.memoryUsage().heapUsed,
        },
      };

      return {
        graph,
        metrics: completeMetrics,
        validation,
        warnings: this.collectWarnings(flowiseData, graph),
      };
    } catch (error) {
      throw new Error(`Transformation failed: ${error}`);
    }
  }

  private extractMetadata(flowiseData: FlowiseChatFlow): IRGraphMetadata {
    const chatflow = flowiseData.chatflow;

    return {
      name: chatflow?.name || 'Untitled Flow',
      description: chatflow?.description || '',
      version: '1.0.0',
      flowiseVersion: this.detectFlowiseVersion(flowiseData),
      createdAt: chatflow?.createdDate,
      updatedAt: chatflow?.updatedDate,
      category: chatflow?.category,
      tags: chatflow?.tags || [],
      isTemplate: false,
      settings: {
        enableHistory: true,
        followUpPrompts: false,
      },
      apiConfig: chatflow
        ? {
            id: chatflow.id,
            name: chatflow.name,
            deployed: chatflow.deployed,
            isPublic: chatflow.isPublic,
            apikeyid: chatflow.apikeyid,
          }
        : undefined,
    };
  }

  private detectFlowiseVersion(flowiseData: FlowiseChatFlow): string {
    // Detect version based on node structure and available fields
    const hasNewStructure =
      flowiseData.nodes &&
      Array.isArray(flowiseData.nodes) &&
      flowiseData.nodes.some((node) => node.data?.version !== undefined);

    return hasNewStructure ? '1.5.0' : '1.4.0';
  }

  private async transformNodes(flowiseNodes: FlowiseNode[]): Promise<IRNode[]> {
    const nodes: IRNode[] = [];

    if (!flowiseNodes || !Array.isArray(flowiseNodes)) {
      return nodes;
    }

    for (const flowiseNode of flowiseNodes) {
      try {
        const irNode = await this.transformNode(flowiseNode);
        nodes.push(irNode);
      } catch (error) {
        console.warn(`Failed to transform node ${flowiseNode.id}: ${error}`);
        // Create a fallback node for unsupported types
        nodes.push(this.createFallbackNode(flowiseNode));
      }
    }

    return nodes;
  }

  private async transformNode(flowiseNode: FlowiseNode): Promise<IRNode> {
    const { data } = flowiseNode;

    // Create base node using factory
    const node = this.nodeFactory.createNode(
      data.name || data.type,
      flowiseNode.id,
      data.label
    );

    // Update position
    node.position = {
      x: flowiseNode.position.x,
      y: flowiseNode.position.y,
    };

    // Transform parameters
    node.parameters = this.transformParameters(
      data.inputs,
      data.inputParams || []
    );

    // Update metadata
    node.metadata = {
      ...node.metadata,
      version: data.version?.toString(),
      description: data.description,
      baseClasses: data.baseClasses,
      flowiseNodeData: {
        originalType: data.type,
        originalName: data.name,
        category: data.category,
      },
    };

    return node;
  }

  private transformParameters(
    inputs: Record<string, unknown>,
    inputParams: any[]
  ): import('./types.js').IRParameter[] {
    const parameters: import('./types.js').IRParameter[] = [];

    // Transform actual input values
    for (const [name, value] of Object.entries(inputs)) {
      if (value !== undefined && value !== null && value !== '') {
        const paramDef = inputParams.find((p) => p.name === name);

        parameters.push({
          name,
          value,
          type: this.inferParameterType(value, paramDef?.type),
          required: !paramDef?.optional,
          description: paramDef?.description,
          options: paramDef?.options?.map((opt: any) =>
            typeof opt === 'string' ? opt : opt.name
          ),
        });
      }
    }

    return parameters;
  }

  private inferParameterType(
    value: unknown,
    flowiseType?: string
  ):
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'array'
    | 'json'
    | 'code'
    | 'file'
    | 'credential' {
    if (flowiseType) {
      switch (flowiseType) {
        case 'password':
        case 'credential':
          return 'credential';
        case 'json':
          return 'json';
        case 'code':
          return 'code';
        case 'file':
          return 'file';
      }
    }

    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';

    return 'string';
  }

  private transformConnections(
    flowiseEdges: FlowiseEdge[],
    _nodes: IRNode[]
  ): IRConnection[] {
    return flowiseEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      label: edge.data?.label,
      metadata: {
        originalEdge: edge,
      },
    }));
  }

  private createFallbackNode(flowiseNode: FlowiseNode): IRNode {
    return {
      id: flowiseNode.id,
      type: 'unknown',
      label: flowiseNode.data.label || 'Unknown Node',
      category: 'utility',
      inputs: [],
      outputs: [],
      parameters: [],
      position: flowiseNode.position,
      metadata: {
        unsupported: true,
        originalType: flowiseNode.data.type,
        originalName: flowiseNode.data.name,
        description: `Unsupported node type: ${flowiseNode.data.type}`,
      },
    };
  }

  private collectWarnings(
    _flowiseData: FlowiseChatFlow,
    graph: IRGraph
  ): string[] {
    const warnings: string[] = [];

    // Check for unsupported nodes
    const unsupportedNodes = graph.nodes.filter(
      (n) => n.metadata?.['unsupported']
    );
    if (unsupportedNodes.length > 0) {
      warnings.push(`Found ${unsupportedNodes.length} unsupported node types`);
    }

    // Check for deprecated features
    const hasDeprecatedNodes =
      graph.nodes &&
      Array.isArray(graph.nodes) &&
      graph.nodes.some((n) => n.metadata?.deprecated);
    if (hasDeprecatedNodes) {
      warnings.push('Graph contains deprecated node types');
    }

    // Check version compatibility
    const version = graph.metadata.flowiseVersion;
    if (version && version < '1.4.0') {
      warnings.push(`Flowise version ${version} may have compatibility issues`);
    }

    return warnings;
  }
}

/**
 * IR to Code transformer
 */
export class IRToCodeTransformer {
  /**
   * Generate code fragments from IR graph
   */
  async generateCode(
    graph: IRGraph,
    context: GenerationContext
  ): Promise<CodeGenerationResult> {
    // const _startTime = Date.now(); // Unused
    const fragments: CodeFragment[] = [];

    try {
      // Generate imports
      fragments.push(...this.generateImports(graph, context));

      // Generate node implementations
      for (const node of graph.nodes || []) {
        fragments.push(...this.generateNodeCode(node, context, graph));
      }

      // Generate flow execution code
      fragments.push(...this.generateExecutionCode(graph, context));

      // Generate files
      const files = this.generateFiles(fragments, context);

      const endTime = Date.now();
      // Remove unused variable warning
      void endTime;
      // Removed unused _metrics variable

      return {
        files,
        dependencies: this.generateDependencyList(graph, context),
        metadata: {
          projectName: context.projectName || 'langchain-app',
          targetLanguage: context.targetLanguage || 'typescript',
          langchainVersion: context.environment?.langchainVersion || '0.2.17',
          nodeVersion: context.environment?.nodeVersion,
          generatedAt: new Date().toISOString(),
          totalNodes: graph.nodes.length,
          totalConnections: graph.connections.length,
          estimatedComplexity: graph.analysis?.complexity || 'simple',
          features: this.extractFeatures(graph),
          warnings: [],
        },
        scripts: this.generateScripts(context),
        packageInfo: this.generatePackageJson(context),
      };
    } catch (error) {
      throw new Error(`Code generation failed: ${error}`);
    }
  }

  private generateImports(
    graph: IRGraph,
    context: GenerationContext
  ): CodeFragment[] {
    const imports = new Set<string>();
    const fragments: CodeFragment[] = [];

    // Standard LangChain imports
    imports.add('import { LLMChain } from "langchain/chains";');
    imports.add(
      'import { PromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";'
    );

    // Add imports based on node types
    for (const node of graph.nodes || []) {
      switch (node.type) {
        case 'openAI':
          imports.add('import { OpenAI } from "@langchain/openai";');
          break;
        case 'chatOpenAI':
          imports.add('import { ChatOpenAI } from "@langchain/openai";');
          break;
        case 'bufferMemory':
          imports.add('import { BufferMemory } from "langchain/memory";');
          break;
        case 'bufferWindowMemory':
          imports.add('import { BufferWindowMemory } from "langchain/memory";');
          break;
        case 'conversationSummaryMemory':
          imports.add(
            'import { ConversationSummaryMemory } from "langchain/memory";'
          );
          break;
        case 'calculator':
          imports.add(
            'import { Calculator } from "langchain/tools/calculator";'
          );
          break;
        case 'serpAPI':
          imports.add('import { SerpAPI } from "langchain/tools";');
          break;
        case 'webBrowser':
          imports.add(
            'import { WebBrowser } from "langchain/tools/webbrowser";'
          );
          break;
        // Add more cases as needed
      }
    }

    // LangFuse imports if enabled
    if (context.includeLangfuse) {
      imports.add(
        'import { LangfuseCallbackHandler } from "@langfuse/langchain";'
      );
    }

    // Environment imports
    imports.add('import * as dotenv from "dotenv";');
    imports.add('dotenv.config();');

    let order = 0;
    for (const importStatement of imports) {
      fragments.push({
        id: `import-${order}`,
        type: 'import',
        content: importStatement,
        dependencies: [],
        language: context.targetLanguage,
        metadata: {
          order: order++,
          category: 'imports',
        },
      });
    }

    return fragments;
  }

  private generateNodeCode(
    node: IRNode,
    context: GenerationContext,
    graph?: IRGraph
  ): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    switch (node.type) {
      case 'openAI':
        fragments.push(this.generateOpenAINode(node, context));
        break;
      case 'chatOpenAI':
        fragments.push(this.generateChatOpenAINode(node, context));
        break;
      case 'chatPromptTemplate':
        fragments.push(this.generatePromptTemplateNode(node, context));
        break;
      case 'promptTemplate':
        fragments.push(this.generatePromptTemplateNode(node, context));
        break;
      case 'llmChain':
        fragments.push(this.generateLLMChainNode(node, context, graph));
        break;
      case 'bufferMemory':
        fragments.push(this.generateBufferMemoryNode(node, context));
        break;
      case 'bufferWindowMemory':
        fragments.push(this.generateBufferWindowMemoryNode(node, context));
        break;
      case 'conversationSummaryMemory':
        fragments.push(
          this.generateConversationSummaryMemoryNode(node, context, graph)
        );
        break;
      case 'calculator':
        fragments.push(this.generateCalculatorNode(node, context));
        break;
      case 'serpAPI':
        fragments.push(this.generateSerpAPINode(node, context));
        break;
      case 'webBrowser':
        fragments.push(this.generateWebBrowserNode(node, context, graph));
        break;
      case 'openAIFunctionsAgent':
      case 'conversationalAgent':
      case 'toolCallingAgent':
      case 'structuredChatAgent':
      case 'agentExecutor':
      case 'zeroShotReactDescriptionAgent':
      case 'reactDocstoreAgent':
      case 'conversationalReactDescriptionAgent':
      case 'chatAgent':
        fragments.push(...this.generateAgentNode(node, context, graph));
        break;
      default:
        fragments.push(this.generateGenericNode(node, context));
    }

    return fragments;
  }

  private generateOpenAINode(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const modelName = params['modelName'] || 'gpt-3.5-turbo';
    const temperature = params['temperature'] || 0.7;

    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new OpenAI({\n`;
    content += `  modelName: "${modelName}",\n`;
    content += `  temperature: ${temperature},\n`;

    if (params['maxTokens']) {
      content += `  maxTokens: ${params['maxTokens']},\n`;
    }

    content += `  openAIApiKey: process.env.OPENAI_API_KEY,\n`;
    content += `});`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['OpenAI'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 100,
        category: 'llm',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateChatOpenAINode(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const modelName = params['modelName'] || 'gpt-3.5-turbo';
    const temperature = params['temperature'] || 0.7;

    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new ChatOpenAI({\n`;
    content += `  modelName: "${modelName}",\n`;
    content += `  temperature: ${temperature},\n`;

    if (params['maxTokens']) {
      content += `  maxTokens: ${params['maxTokens']},\n`;
    }

    content += `  openAIApiKey: process.env.OPENAI_API_KEY,\n`;
    content += `});`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['ChatOpenAI'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 100,
        category: 'llm',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generatePromptTemplateNode(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const systemMessage = params['systemMessage'];
    const humanMessage = params['humanMessage'] || '{input}';

    let content = `// ${node.label}\n`;

    if (systemMessage) {
      content += `const ${this.getVariableName(node)} = ChatPromptTemplate.fromMessages([\n`;
      content += `  ["system", "${this.escapeString(systemMessage)}"],\n`;
      content += `  ["human", "${this.escapeString(humanMessage)}"],\n`;
      content += `]);`;
    } else {
      content += `const ${this.getVariableName(node)} = PromptTemplate.fromTemplate(\n`;
      content += `  "${this.escapeString(humanMessage)}"\n`;
      content += `);`;
    }

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: systemMessage ? ['ChatPromptTemplate'] : ['PromptTemplate'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 200,
        category: 'prompt',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateLLMChainNode(
    node: IRNode,
    context: GenerationContext,
    graph?: IRGraph
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const outputKey = params['outputKey'] || 'text';

    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new LLMChain({\n`;

    const llmInput = this.getInputVariableName(node, 'model', graph);
    const promptInput = this.getInputVariableName(node, 'prompt', graph);

    content += `  llm: ${llmInput},\n`;
    content += `  prompt: ${promptInput},\n`;

    const memoryInput = this.getInputVariableName(node, 'memory', graph);
    if (memoryInput && memoryInput !== `memory_${node.id}`) {
      content += `  memory: ${memoryInput},\n`;
    }

    content += `  outputKey: "${outputKey}",\n`;
    content += `});`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['LLMChain'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 300,
        category: 'chain',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateBufferMemoryNode(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const memoryKey = params['memoryKey'] || 'history';
    const returnMessages = params['returnMessages'] || false;

    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new BufferMemory({\n`;
    content += `  memoryKey: "${memoryKey}",\n`;
    content += `  returnMessages: ${returnMessages},\n`;
    content += `});`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['BufferMemory'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 150,
        category: 'memory',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateBufferWindowMemoryNode(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const memoryKey = params['memoryKey'] || 'history';
    const returnMessages = params['returnMessages'] || false;
    const k = params['k'] || 5;

    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new BufferWindowMemory({\n`;
    content += `  memoryKey: "${memoryKey}",\n`;
    content += `  returnMessages: ${returnMessages},\n`;
    content += `  k: ${k},\n`;
    content += `});`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['BufferWindowMemory'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 150,
        category: 'memory',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateConversationSummaryMemoryNode(
    node: IRNode,
    context: GenerationContext,
    graph?: IRGraph
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const memoryKey = params['memoryKey'] || 'history';
    const returnMessages = params['returnMessages'] || false;
    const maxTokenLimit = params['maxTokenLimit'] || 2000;

    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new ConversationSummaryMemory({\n`;
    content += `  llm: ${this.getInputVariableName(node, 'llm', graph)},\n`;
    content += `  memoryKey: "${memoryKey}",\n`;
    content += `  returnMessages: ${returnMessages},\n`;
    content += `  maxTokenLimit: ${maxTokenLimit},\n`;
    content += `});`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['ConversationSummaryMemory'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 150,
        category: 'memory',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateCalculatorNode(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new Calculator();`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['Calculator'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 200,
        category: 'tool',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateSerpAPINode(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const apiKey = params['apiKey'] || 'process.env.SERPAPI_API_KEY';

    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new SerpAPI(${this.formatParameterValue(apiKey)});`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['SerpAPI'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 200,
        category: 'tool',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateAgentNode(
    node: IRNode,
    context: GenerationContext,
    graph?: IRGraph
  ): CodeFragment[] {
    // Remove unused graph parameter warning
    void graph;
    // Try to use the registry converter first
    const registry = ConverterFactory.getRegistry();
    const converter = registry.getConverter(node.type);

    if (converter) {
      try {
        const fragments = converter.convert(node, context);
        if (fragments.length > 0) {
          return fragments; // Return all fragments
        }
      } catch (error) {
        console.warn(
          `Failed to use registry converter for ${node.type}: ${error}`
        );
      }
    }

    // Fall back to placeholder if converter fails
    const variableName = this.getVariableName(node);

    let content = `// ${node.label}\n`;
    content += `const ${variableName} = {\n`;
    content += `  // Agent implementation placeholder\n`;
    content += `  type: "${node.type}",\n`;
    content += `  id: "${node.id}"\n`;
    content += `};`;

    return [
      {
        id: `node-${node.id}`,
        type: 'initialization',
        content,
        dependencies: [],
        language: context.targetLanguage,
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
        },
      },
    ];
  }

  private generateWebBrowserNode(
    node: IRNode,
    context: GenerationContext,
    graph?: IRGraph
  ): CodeFragment {
    const params = this.getNodeParameters(node);
    const headless =
      params['headless'] !== undefined ? params['headless'] : true;
    const timeout = params['timeout'] || 30000;

    let content = `// ${node.label}\n`;
    content += `const ${this.getVariableName(node)} = new WebBrowser({\n`;
    content += `  model: ${this.getInputVariableName(node, 'llm', graph)},\n`;
    content += `  embeddings: ${this.getInputVariableName(node, 'embeddings', graph)},\n`;
    content += `  headless: ${headless},\n`;
    content += `  timeout: ${timeout},\n`;
    content += `});`;

    return {
      id: `node-${node.id}`,
      type: 'initialization',
      content,
      dependencies: ['WebBrowser'],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 200,
        category: 'tool',
        exports: [this.getVariableName(node)],
      },
    };
  }

  private generateGenericNode(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    const variableName = this.getVariableName(node);
    let content = `// ${node.label} (${node.type})\n`;
    
    // Attempt to generate meaningful code based on node type patterns
    const nodeType = node.type.toLowerCase();
    
    // Check for common patterns and generate appropriate code
    if (nodeType.includes('loader') || nodeType.includes('reader')) {
      // Document/Data loaders
      content += `// Generic data loader implementation\n`;
      content += `const ${variableName} = {\n`;
      content += `  async load(source: string): Promise<any[]> {\n`;
      content += `    console.warn('Generic loader for ${node.type} - implement specific logic');\n`;
      content += `    // Placeholder: return empty array\n`;
      content += `    return [];\n`;
      content += `  }\n`;
      content += `};`;
    } else if (nodeType.includes('splitter') || nodeType.includes('chunker')) {
      // Text splitters
      content += `// Generic text splitter implementation\n`;
      content += `const ${variableName} = {\n`;
      content += `  splitText(text: string, chunkSize: number = 1000): string[] {\n`;
      content += `    console.warn('Generic splitter for ${node.type} - implement specific logic');\n`;
      content += `    // Simple character-based splitting\n`;
      content += `    const chunks: string[] = [];\n`;
      content += `    for (let i = 0; i < text.length; i += chunkSize) {\n`;
      content += `      chunks.push(text.slice(i, i + chunkSize));\n`;
      content += `    }\n`;
      content += `    return chunks;\n`;
      content += `  }\n`;
      content += `};`;
    } else if (nodeType.includes('parser') || nodeType.includes('extractor')) {
      // Parsers/Extractors
      content += `// Generic parser implementation\n`;
      content += `const ${variableName} = {\n`;
      content += `  parse(input: any): any {\n`;
      content += `    console.warn('Generic parser for ${node.type} - implement specific logic');\n`;
      content += `    // Pass through input\n`;
      content += `    return input;\n`;
      content += `  }\n`;
      content += `};`;
    } else if (nodeType.includes('transform') || nodeType.includes('processor')) {
      // Transformers/Processors
      content += `// Generic transformer implementation\n`;
      content += `const ${variableName} = {\n`;
      content += `  async transform(input: any): Promise<any> {\n`;
      content += `    console.warn('Generic transformer for ${node.type} - implement specific logic');\n`;
      content += `    // Pass through with timestamp\n`;
      content += `    return {\n`;
      content += `      ...input,\n`;
      content += `      _processed: new Date().toISOString(),\n`;
      content += `      _processorType: '${node.type}'\n`;
      content += `    };\n`;
      content += `  }\n`;
      content += `};`;
    } else if (nodeType.includes('store') || nodeType.includes('database')) {
      // Storage nodes
      content += `// Generic storage implementation\n`;
      content += `const ${variableName} = {\n`;
      content += `  async save(data: any, key?: string): Promise<void> {\n`;
      content += `    console.warn('Generic storage for ${node.type} - implement specific logic');\n`;
      content += `    // In-memory storage placeholder\n`;
      content += `    console.log('Would save:', { key, data });\n`;
      content += `  },\n`;
      content += `  async retrieve(key: string): Promise<any> {\n`;
      content += `    console.warn('Generic retrieval for ${node.type} - implement specific logic');\n`;
      content += `    return null;\n`;
      content += `  }\n`;
      content += `};`;
    } else if (nodeType.includes('api') || nodeType.includes('http') || nodeType.includes('webhook')) {
      // API/HTTP nodes
      content += `// Generic API client implementation\n`;
      content += `const ${variableName} = {\n`;
      content += `  async request(method: string, url: string, data?: any): Promise<any> {\n`;
      content += `    console.warn('Generic API for ${node.type} - implement specific logic');\n`;
      content += `    // Placeholder response\n`;
      content += `    return {\n`;
      content += `      status: 200,\n`;
      content += `      data: { message: 'Generic API response for ${node.type}' }\n`;
      content += `    };\n`;
      content += `  }\n`;
      content += `};`;
    } else if (nodeType.includes('util') || nodeType.includes('helper')) {
      // Utility nodes
      content += `// Generic utility implementation\n`;
      content += `const ${variableName} = {\n`;
      content += `  execute(...args: any[]): any {\n`;
      content += `    console.warn('Generic utility for ${node.type} - implement specific logic');\n`;
      content += `    return args.length > 0 ? args[0] : null;\n`;
      content += `  }\n`;
      content += `};`;
    } else {
      // Default fallback for completely unknown types
      content += `// Unknown node type - creating generic handler\n`;
      content += `const ${variableName} = {\n`;
      content += `  _nodeType: '${node.type}',\n`;
      content += `  _nodeLabel: '${node.label}',\n`;
      content += `  _warning: 'This is a generic placeholder for an unsupported node type',\n`;
      content += `  \n`;
      content += `  async process(input: any): Promise<any> {\n`;
      content += `    console.warn(\`Unimplemented node type: ${node.type} (${node.label})\`);\n`;
      content += `    console.log('Input received:', input);\n`;
      content += `    console.log('Node configuration:', ${JSON.stringify(node.data, null, 2)});\n`;
      content += `    \n`;
      content += `    // Pass through the input unchanged\n`;
      content += `    return input;\n`;
      content += `  }\n`;
      content += `};`;
    }
    
    content += `\n\n// Note: This is a generic implementation for '${node.type}'.\n`;
    content += `// You should replace this with the specific implementation for your use case.`;

    return {
      id: `node-${node.id}`,
      type: 'declaration',
      content,
      dependencies: [],
      language: context.targetLanguage,
      metadata: {
        nodeId: node.id,
        order: 1000,
        category: 'generic',
        exports: [variableName],
      },
    };
  }

  private generateExecutionCode(
    graph: IRGraph,
    context: GenerationContext
  ): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Main execution function
    let content = `\n// Main execution function\n`;
    content += `export async function runFlow(input: string): Promise<string> {\n`;

    if (context.includeLangfuse) {
      content += `  // Initialize LangFuse callback\n`;
      content += `  const langfuseHandler = new LangfuseCallbackHandler({\n`;
      content += `    publicKey: process.env.LANGFUSE_PUBLIC_KEY,\n`;
      content += `    secretKey: process.env.LANGFUSE_SECRET_KEY,\n`;
      content += `    baseUrl: process.env.LANGFUSE_BASE_URL,\n`;
      content += `  });\n\n`;
    }

    // Find the main chain or entry point
    // Analysis entry points available if needed
    // const entryPoints = graph.analysis?.entryPoints || [];
    const exitPoints = graph.analysis?.exitPoints || [];

    if (exitPoints.length > 0) {
      const mainChain = graph.nodes.find((n) => exitPoints.includes(n.id));
      if (mainChain) {
        const variableName = this.getVariableName(mainChain);

        // Check if this is an agent that needs initialization
        if (
          mainChain.type.includes('Agent') ||
          mainChain.type.includes('agent')
        ) {
          content += `  // Initialize agent if not already initialized\n`;
          content += `  if (!${variableName}) {\n`;
          content += `    ${variableName} = await setupAgent();\n`;
          content += `  }\n\n`;
        }

        content += `  const result = await ${variableName}.call({\n`;
        content += `    input: input,\n`;

        if (context.includeLangfuse) {
          content += `    callbacks: [langfuseHandler],\n`;
        }

        content += `  });\n\n`;
        content += `  return result.text || result.output || JSON.stringify(result);\n`;
      }
    } else {
      // Complex flow with multiple entry points or no clear exit point
      content += `  // Execute flow based on graph topology\n`;
      
      // Get entry points - nodes with no incoming edges
      const entryPoints = graph.analysis?.entryPoints || [];
      
      if (entryPoints.length === 0) {
        content += `  // No entry points found - check for isolated nodes\n`;
        const isolatedNodes = graph.nodes.filter(node => {
          const hasIncoming = graph.connections.some(c => c.target === node.id);
          const hasOutgoing = graph.connections.some(c => c.source === node.id);
          return !hasIncoming && !hasOutgoing;
        });
        
        if (isolatedNodes.length > 0) {
          content += `  // Execute isolated nodes\n`;
          content += `  const results = [];\n`;
          for (const node of isolatedNodes) {
            const varName = this.getVariableName(node);
            if (node.type.includes('Agent') || node.type.includes('agent')) {
              content += `  if (!${varName}) {\n`;
              content += `    ${varName} = await setupAgent();\n`;
              content += `  }\n`;
            }
            content += `  results.push(await ${varName}.call({ input })`;;
            if (context.includeLangfuse) {
              content += `, callbacks: [langfuseHandler] }`;
            } else {
              content += ` }`;
            }
            content += `);\n`;
          }
          content += `  return results.length === 1 ? results[0] : results;\n`;
        } else {
          content += `  return "No executable nodes found in the flow";\n`;
        }
      } else {
        // Multiple entry points - execute in topological order
        content += `  // Execute nodes in topological order\n`;
        
        // Use topological sort to determine execution order
        const sortResult = IRGraphAnalyzer.topologicalSort(graph);
        
        if (!sortResult.isAcyclic) {
          content += `  // Warning: Cycles detected in graph\n`;
          content += `  console.warn("Cycles detected:", ${JSON.stringify(sortResult.cycles)});\n`;
        }
        
        content += `  const nodeOutputs = new Map();\n`;
        content += `  nodeOutputs.set('input', input);\n\n`;
        
        // Generate execution code for each node in topological order
        if (sortResult.sorted.length > 0) {
          for (const nodeId of sortResult.sorted) {
            const node = graph.nodes.find(n => n.id === nodeId);
            if (!node) continue;
            
            const varName = this.getVariableName(node);
            content += `  // Execute ${node.label}\n`;
            
            // Check if node needs special initialization
            if (node.type.includes('Agent') || node.type.includes('agent')) {
              content += `  if (!${varName}) {\n`;
              content += `    ${varName} = await setupAgent();\n`;
              content += `  }\n`;
            }
            
            // Find inputs for this node
            const nodeInputs = graph.connections
              .filter(c => c.target === nodeId)
              .map(c => ({
                source: c.source,
                targetHandle: c.targetHandle || 'input'
              }));
            
            // Build input object
            content += `  const ${varName}_input = {\n`;
            if (nodeInputs.length === 0) {
              // No inputs - use the main input
              content += `    input: input,\n`;
            } else {
              // Map inputs from source nodes
              for (const input of nodeInputs) {
                const sourceOutput = `nodeOutputs.get('${input.source}')`;
                content += `    ${input.targetHandle}: ${sourceOutput},\n`;
              }
            }
            content += `  };\n\n`;
            
            // Execute the node
            content += `  const ${varName}_output = await ${varName}.call({\n`;
            content += `    ...${varName}_input,\n`;
            if (context.includeLangfuse) {
              content += `    callbacks: [langfuseHandler],\n`;
            }
            content += `  });\n`;
            
            // Store output for downstream nodes
            content += `  nodeOutputs.set('${nodeId}', ${varName}_output.text || ${varName}_output.output || ${varName}_output);\n\n`;
          }
          
          // Return the output of the last node(s)
          const exitPoints = graph.analysis?.exitPoints || [];
          if (exitPoints.length > 0) {
            if (exitPoints.length === 1) {
              content += `  return nodeOutputs.get('${exitPoints[0]}');\n`;
            } else {
              // Multiple exit points - return all outputs
              content += `  const results = {};\n`;
              for (const exitPoint of exitPoints) {
                const node = graph.nodes.find(n => n.id === exitPoint);
                if (node) {
                  content += `  results['${node.label}'] = nodeOutputs.get('${exitPoint}');\n`;
                }
              }
              content += `  return results;\n`;
            }
          } else {
            // No explicit exit points - return last executed node's output
            const lastNodeId = sortResult.sorted[sortResult.sorted.length - 1];
            content += `  return nodeOutputs.get('${lastNodeId}');\n`;
          }
        } else {
          // No nodes to execute
          content += `  return "No nodes to execute";\n`;
        }
      }
    }

    content += `}\n\n`;

    // CLI entry point
    content += `// CLI entry point\n`;
    content += `if (import.meta.url === \`file://\${process.argv[1]}\`) {\n`;
    content += `  const input = process.argv[2] || "Hello, world!";\n`;
    content += `  runFlow(input)\n`;
    content += `    .then(result => {\n`;
    content += `      console.log("Result:", result);\n`;
    content += `    })\n`;
    content += `    .catch(error => {\n`;
    content += `      console.error("Error:", error);\n`;
    content += `      process.exit(1);\n`;
    content += `    });\n`;
    content += `}`;

    fragments.push({
      id: 'execution',
      type: 'execution',
      content,
      dependencies: [],
      language: context.targetLanguage,
      metadata: {
        order: 1000,
        category: 'execution',
        async: true,
        exports: ['runFlow'],
      },
    });

    return fragments;
  }

  private generateFiles(
    fragments: CodeFragment[],
    context: GenerationContext
  ): GeneratedFile[] {
    const files: GeneratedFile[] = [];

    // Main source file
    const sourceFragments = fragments.filter(
      (f) =>
        f.type === 'import' ||
        f.type === 'initialization' ||
        f.type === 'execution' ||
        f.type === 'declaration'
    );

    sourceFragments.sort(
      (a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0)
    );

    const sourceContent = sourceFragments.map((f) => f.content).join('\n\n');

    files.push({
      path: 'src/index.ts',
      content: sourceContent,
      type: 'main',
      dependencies: [],
      exports: ['default'],
      size: sourceContent.length,
    });

    // Package.json
    const packageJson = this.generatePackageJson(context);
    files.push({
      path: 'package.json',
      content: JSON.stringify(packageJson, null, 2),
      type: 'config',
      dependencies: [],
      exports: [],
      size: JSON.stringify(packageJson).length,
    });

    // Environment file
    const envContent = this.generateEnvFile(context);
    files.push({
      path: '.env.example',
      content: envContent,
      type: 'config',
      dependencies: [],
      exports: [],
      size: envContent.length,
    });

    // README
    if (context.includeDocs) {
      const readmeContent = this.generateReadme(context);
      files.push({
        path: 'README.md',
        content: readmeContent,
        type: 'utils',
        dependencies: [],
        exports: [],
        size: readmeContent.length,
      });
    }

    return files;
  }

  // Helper methods
  private getVariableName(node: IRNode): string {
    return `${node.type}_${node.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
  }

  private getInputVariableName(
    node: IRNode,
    inputName: string,
    graph?: IRGraph
  ): string {
    // Find the source node connected to this input using improved algorithm
    if (graph) {
      const connection = this.findConnectionWithMultipleStrategies(
        node,
        inputName,
        graph
      );

      if (connection) {
        const sourceNode = graph.nodes.find((n) => n.id === connection.source);
        if (sourceNode) {
          return this.getVariableName(sourceNode);
        }
      }
    }

    // Intelligent fallback based on input type
    return this.generateIntelligentFallback(node, inputName);
  }

  /**
   * Multi-strategy connection finder with comprehensive pattern matching
   */
  private findConnectionWithMultipleStrategies(
    node: IRNode,
    inputName: string,
    graph: IRGraph
  ): IRConnection | undefined {
    // Strategy 1: Exact input name match
    let connection = graph.connections.find(
      (c) => c.target === node.id && c.targetHandle === inputName
    );
    if (connection) return connection;

    // Strategy 2: Standard Flowise pattern: {nodeId}-input-{inputName}-{Type}
    connection = graph.connections.find(
      (c) =>
        c.target === node.id &&
        c.targetHandle?.match(new RegExp(`^${node.id}-input-${inputName}-`))
    );
    if (connection) return connection;

    // Strategy 3: Flexible pattern matching for union types
    connection = graph.connections.find(
      (c) =>
        c.target === node.id && c.targetHandle?.includes(`-input-${inputName}-`)
    );
    if (connection) return connection;

    // Strategy 4: Semantic mapping for common aliases
    const inputAliases = this.getInputAliases(inputName);
    for (const alias of inputAliases) {
      connection = graph.connections.find(
        (c) =>
          c.target === node.id && c.targetHandle?.includes(`-input-${alias}-`)
      );
      if (connection) return connection;
    }

    return undefined;
  }

  /**
   * Get common aliases for input names
   */
  private getInputAliases(inputName: string): string[] {
    const aliasMap: Record<string, string[]> = {
      model: ['llm', 'chatModel', 'languageModel'],
      llm: ['model', 'chatModel', 'languageModel'],
      prompt: ['promptTemplate', 'template'],
      memory: ['conversationMemory', 'chatMemory'],
      embeddings: ['embedding', 'vectorizer'],
    };

    return aliasMap[inputName] || [];
  }

  /**
   * Generate intelligent fallback variable names
   */
  private generateIntelligentFallback(node: IRNode, inputName: string): string {
    // Use meaningful names based on input type
    const typeMapping: Record<string, string> = {
      model: 'llm',
      llm: 'llm',
      prompt: 'prompt',
      memory: 'memory',
      embeddings: 'embeddings',
      tools: 'tools',
    };

    const baseName = typeMapping[inputName] || inputName;
    return `${baseName}_${node.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
  }

  private getNodeParameters(node: IRNode): Record<string, any> {
    const params: Record<string, any> = {};
    for (const param of node.parameters) {
      params[param.name] = param.value;
    }
    return params;
  }

  private escapeString(str: string): string {
    return str.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  }

  private formatParameterValue(value: any): string {
    if (typeof value === 'string') {
      // Check if it's already an environment variable reference
      if (value.startsWith('process.env.')) {
        return value;
      }
      // Quote string values
      return `"${this.escapeString(value)}"`;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    if (value === null || value === undefined) {
      return 'undefined';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  // private countLines(fragments: CodeFragment[]): number {
  //   return fragments.reduce(
  //     (total, fragment) => total + fragment.content.split('\n').length,
  //     0
  //   );
  // }

  // Removed unused methods _extractDependencies and _calculateCodeSize

  private generateDependencyList(
    graph: IRGraph,
    context: GenerationContext
  ): Record<string, string> {
    const deps: Record<string, string> = {
      langchain: '^0.2.17',
      '@langchain/core': '^0.2.30',
      '@langchain/openai': '^0.2.7',
      dotenv: '^16.4.5',
    };

    if (context.includeLangfuse) {
      deps['@langfuse/langchain'] = '^3.0.0';
    }

    // Add dependencies based on node types
    for (const node of graph.nodes || []) {
      switch (node.type) {
        case 'anthropic':
          deps['@langchain/anthropic'] = '^0.2.7';
          break;
        case 'pinecone':
          deps['@pinecone-database/pinecone'] = '^2.2.0';
          break;
        // Add more as needed
      }
    }

    return deps;
  }

  private generatePackageJson(context: GenerationContext): any {
    return {
      name: context.projectName || 'langchain-app',
      version: '1.0.0',
      description: 'Generated LangChain application from Flowise',
      type: 'module',
      main: 'dist/index.js',
      scripts: {
        build: 'tsc',
        start: 'node dist/index.js',
        dev: 'tsx src/index.ts',
      },
      dependencies: this.generateDependencyList({} as IRGraph, context),
      devDependencies: {
        typescript: '^5.5.4',
        '@types/node': '^20.14.15',
        tsx: '^4.16.5',
      },
    };
  }

  private extractFeatures(graph: IRGraph): string[] {
    const features: string[] = [];
    const nodeTypes = new Set(graph.nodes.map((n) => n.type));

    if (nodeTypes.has('openAI') || nodeTypes.has('chatOpenAI')) {
      features.push('OpenAI Integration');
    }
    if (nodeTypes.has('bufferMemory')) {
      features.push('Memory Management');
    }
    if (nodeTypes.has('llmChain')) {
      features.push('LLM Chains');
    }
    if (nodeTypes.has('chatPromptTemplate')) {
      features.push('Prompt Templates');
    }

    return features;
  }

  private generateScripts(_context: GenerationContext): Record<string, string> {
    return {
      build: 'tsc',
      start: 'node dist/index.js',
      dev: 'tsx src/index.ts',
      test: 'echo "Error: no test specified" && exit 1',
    };
  }

  private generateEnvFile(context: GenerationContext): string {
    let content = '# Environment Variables\n';
    content += '# Copy this file to .env and fill in your values\n\n';
    content += 'OPENAI_API_KEY=your_openai_api_key_here\n';

    if (context.includeLangfuse) {
      content += '\n# LangFuse Configuration\n';
      content += 'LANGFUSE_PUBLIC_KEY=your_langfuse_public_key\n';
      content += 'LANGFUSE_SECRET_KEY=your_langfuse_secret_key\n';
      content += 'LANGFUSE_BASE_URL=https://cloud.langfuse.com\n';
    }

    return content;
  }

  private generateReadme(context: GenerationContext): string {
    return `# ${context.projectName}

Generated LangChain application from Flowise chatflow.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Copy environment file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. Fill in your API keys in \`.env\`

## Usage

\`\`\`bash
npm run dev "Your input text here"
\`\`\`

## Build

\`\`\`bash
npm run build
npm start "Your input text here"
\`\`\`
`;
  }
}
