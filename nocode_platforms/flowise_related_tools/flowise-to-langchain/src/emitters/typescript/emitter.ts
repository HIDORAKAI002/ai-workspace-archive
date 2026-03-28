/**
 * TypeScript Code Emitter for Flowise-to-LangChain Converter
 *
 * This module generates clean, production-ready TypeScript code from IR graphs.
 * Features:
 * - ESM module structure
 * - Async/await patterns
 * - Environment variable handling
 * - Optional LangFuse integration
 * - Code formatting and organization
 */

import {
  IRGraph,
  IRNode,
  CodeFragment,
  GenerationContext,
  NodeId,
} from '../../ir/types.js';
import { ImportManager } from './import-manager.js';
import { TemplateEngine } from './template-engine.js';
import { CodeFormatter } from './code-formatter.js';
import { LangFuseIntegrator } from './langfuse-integrator.js';

/**
 * Code generation result
 */
export interface CodeGenerationResult {
  files: GeneratedFile[];
  dependencies: Record<string, string>;
  metadata: {
    projectName: string;
    targetLanguage: 'typescript' | 'python';
    langchainVersion: string;
    nodeVersion?: string;
    generatedAt: string;
    totalNodes: number;
    totalConnections: number;
    estimatedComplexity: 'simple' | 'medium' | 'complex';
    features: string[];
    warnings: string[];
  };
  scripts: Record<string, string>;
  packageInfo: {
    name: string;
    version: string;
    description?: string;
    main?: string;
    type?: 'module' | 'commonjs';
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
}

/**
 * Generated file information
 */
export interface GeneratedFile {
  path: string;
  content: string;
  type: 'main' | 'test' | 'config' | 'types' | 'utils';
  dependencies: string[];
  exports: string[];
  size: number;
}

/**
 * Node converter registry
 */
export interface NodeConverter {
  convert(node: IRNode, context: GenerationContext): CodeFragment[];
  getDependencies(node: IRNode, context?: GenerationContext): string[];
  canConvert(node: IRNode): boolean;
}

/**
 * Main TypeScript code emitter
 */
export class TypeScriptEmitter {
  private importManager: ImportManager;
  private templateEngine: TemplateEngine;
  private codeFormatter: CodeFormatter;
  private langfuseIntegrator: LangFuseIntegrator;
  private nodeConverters: Map<string, NodeConverter>;

  constructor() {
    this.importManager = new ImportManager();
    this.templateEngine = new TemplateEngine();
    this.codeFormatter = new CodeFormatter();
    this.langfuseIntegrator = new LangFuseIntegrator();
    this.nodeConverters = new Map();

    this.initializeNodeConverters();
  }

  /**
   * Generate TypeScript code from IR graph
   */
  async generateCode(
    graph: IRGraph,
    context: GenerationContext
  ): Promise<CodeGenerationResult> {
    // Validate inputs
    this.validateInputs(graph, context);

    // Initialize generation context
    this.importManager.reset();
    this.templateEngine.setContext(context);

    // Generate code fragments
    const fragments = this.generateCodeFragments(graph, context);

    // Organize fragments by type
    const organizedFragments = this.organizeFragments(fragments);

    // Generate files
    const files = await this.generateFiles(organizedFragments, graph, context);

    // Calculate metadata
    const metadata = this.calculateMetadata(graph, files, context);

    // Extract dependencies and create return structure
    const allDependencies = this.extractDependencies(
      organizedFragments,
      context
    );

    return {
      files,
      dependencies: allDependencies,
      metadata,
      scripts: this.generateScripts(context),
      packageInfo: this.generatePackageInfo(graph, context, allDependencies),
    };
  }

  /**
   * Generate code fragments for all nodes
   */
  private generateCodeFragments(
    graph: IRGraph,
    context: GenerationContext
  ): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Sort nodes in execution order
    const sortedNodes = this.sortNodesForExecution(graph);

    // Generate fragments for each node
    for (let i = 0; i < sortedNodes.length; i++) {
      const node = sortedNodes[i];
      if (!node) continue;

      const converter = this.getNodeConverter(node);

      if (converter) {
        const nodeFragments = converter.convert(node, context);

        // Add order metadata
        nodeFragments.forEach((fragment, index) => {
          fragment.metadata = {
            ...fragment.metadata,
            nodeId: node.id,
            order: i * 1000 + index, // Allow for multiple fragments per node
            description: `${node.label} - ${fragment.type}`,
            category: node.category,
            async: this.isAsyncNode(node),
            exports: this.getNodeExports(node),
            imports: [],
          };
        });

        fragments.push(...nodeFragments);
      } else {
        // Generate placeholder for unsupported nodes
        fragments.push(this.generateUnsupportedNodeFragment(node));
      }
    }

    // Add LangFuse integration if requested
    if (context.includeLangfuse) {
      fragments.push(
        ...this.langfuseIntegrator.generateIntegrationFragments(graph, context)
      );
    }

    return fragments;
  }

  /**
   * Organize fragments by type for file generation
   */
  private organizeFragments(
    fragments: CodeFragment[]
  ): Map<string, CodeFragment[]> {
    const organized = new Map<string, CodeFragment[]>();

    // Initialize categories
    const categories = [
      'import',
      'declaration',
      'initialization',
      'execution',
      'export',
    ];
    categories.forEach((category) => organized.set(category, []));

    // Sort fragments by order and organize by type
    const sortedFragments = fragments.sort(
      (a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0)
    );

    for (const fragment of sortedFragments) {
      const category = organized.get(fragment.type) || [];
      category.push(fragment);
      organized.set(fragment.type, category);
    }

    return organized;
  }

  /**
   * Generate output files
   */
  private async generateFiles(
    organizedFragments: Map<string, CodeFragment[]>,
    graph: IRGraph,
    context: GenerationContext
  ): Promise<GeneratedFile[]> {
    const files: GeneratedFile[] = [];

    // Generate main application file
    files.push(await this.generateMainFile(organizedFragments, graph, context));

    // Generate types file
    files.push(await this.generateTypesFile(graph, context));

    // Generate configuration file
    files.push(await this.generateConfigFile(graph, context));

    // Generate package.json
    files.push(
      await this.generatePackageJson(organizedFragments, graph, context)
    );

    // Generate environment file
    files.push(await this.generateEnvironmentFile(graph, context));

    // Generate tests if requested
    if (context.includeTests) {
      files.push(...(await this.generateTestFiles(graph, context)));
    }

    return files;
  }

  /**
   * Generate main application file
   */
  private async generateMainFile(
    organizedFragments: Map<string, CodeFragment[]>,
    graph: IRGraph,
    context: GenerationContext
  ): Promise<GeneratedFile> {
    const imports = organizedFragments.get('import') || [];
    const declarations = organizedFragments.get('declaration') || [];
    const initializations = organizedFragments.get('initialization') || [];
    const executions = organizedFragments.get('execution') || [];
    const exports = organizedFragments.get('export') || [];

    // Consolidate imports
    const consolidatedImports = this.importManager.consolidateImports(
      imports.map((f) => f.content)
    );

    // Build main function
    const mainFunction = this.templateEngine.renderTemplate('mainFunction', {
      graphName: graph.metadata.name,
      hasLangfuse: context.includeLangfuse,
      declarations: declarations.map((f) => f.content).join('\n\n'),
      initializations: initializations.map((f) => f.content).join('\n\n'),
      executions: executions.map((f) => f.content).join('\n\n'),
      isAsync: this.hasAsyncOperations(organizedFragments),
    });

    const content = this.templateEngine.renderTemplate('mainFile', {
      imports: consolidatedImports,
      declarations: declarations.map((f) => f.content).join('\n\n'),
      mainFunction,
      exports: exports.map((f) => f.content).join('\n\n'),
      projectName: context.projectName,
      description:
        graph.metadata.description || 'Generated LangChain application',
    });

    const formattedContent = await this.codeFormatter.format(
      content,
      'typescript'
    );

    return {
      path: 'src/index.ts',
      content: formattedContent,
      type: 'main',
      dependencies: this.extractFileDependencies(organizedFragments),
      exports: this.extractFileExports(organizedFragments),
      size: Buffer.byteLength(formattedContent, 'utf8'),
    };
  }

  /**
   * Generate types definition file
   */
  private async generateTypesFile(
    graph: IRGraph,
    context: GenerationContext
  ): Promise<GeneratedFile> {
    const types = this.extractCustomTypes(graph);
    const interfaces = this.generateInterfaces(graph);

    const content = this.templateEngine.renderTemplate('typesFile', {
      types,
      interfaces,
      projectName: context.projectName,
    });

    const formattedContent = await this.codeFormatter.format(
      content,
      'typescript'
    );

    return {
      path: 'src/types.ts',
      content: formattedContent,
      type: 'types',
      dependencies: [],
      exports: interfaces
        .map((i) => i.split(' ')[2])
        .filter((name): name is string => Boolean(name)),
      size: Buffer.byteLength(formattedContent, 'utf8'),
    };
  }

  /**
   * Generate configuration file
   */
  private async generateConfigFile(
    graph: IRGraph,
    context: GenerationContext
  ): Promise<GeneratedFile> {
    const config = this.extractConfiguration(graph);

    const content = this.templateEngine.renderTemplate('configFile', {
      config,
      hasLangfuse: context.includeLangfuse,
      environment: context.environment,
    });

    const formattedContent = await this.codeFormatter.format(
      content,
      'typescript'
    );

    return {
      path: 'src/config.ts',
      content: formattedContent,
      type: 'config',
      dependencies: [],
      exports: ['config'],
      size: Buffer.byteLength(formattedContent, 'utf8'),
    };
  }

  /**
   * Generate package.json
   */
  private async generatePackageJson(
    organizedFragments: Map<string, CodeFragment[]>,
    graph: IRGraph,
    context: GenerationContext
  ): Promise<GeneratedFile> {
    const dependencies = this.extractDependencies(organizedFragments, context);

    const packageJson = {
      name: context.projectName,
      version: '1.0.0',
      description:
        graph.metadata.description || 'Generated LangChain application',
      type: 'module',
      main: 'dist/index.js',
      scripts: {
        build: 'tsc',
        start: 'node dist/index.js',
        dev: 'tsx src/index.ts',
        'type-check': 'tsc --noEmit',
      },
      dependencies,
      devDependencies: {
        typescript: '^5.5.4',
        tsx: '^4.16.5',
        '@types/node': '^20.14.15',
      },
      engines: {
        node: '>=18.0.0',
      },
    };

    const content = JSON.stringify(packageJson, null, 2);
    return {
      path: 'package.json',
      content,
      type: 'config',
      dependencies: [],
      exports: [],
      size: Buffer.byteLength(content, 'utf8'),
    };
  }

  /**
   * Generate environment file template
   */
  private async generateEnvironmentFile(
    graph: IRGraph,
    _context: GenerationContext
  ): Promise<GeneratedFile> {
    const envVars = this.extractEnvironmentVariables(graph);

    const content = envVars
      .map(
        (variable) =>
          `# ${variable.description}\n${variable.name}=${variable.example || ''}`
      )
      .join('\n\n');

    return {
      path: '.env.example',
      content: content,
      type: 'config',
      dependencies: [],
      exports: [],
      size: Buffer.byteLength(content, 'utf8'),
    };
  }

  /**
   * Generate test files
   */
  private async generateTestFiles(
    graph: IRGraph,
    context: GenerationContext
  ): Promise<GeneratedFile[]> {
    const testFiles: GeneratedFile[] = [];

    // Generate main test file
    const mainTestContent = this.templateEngine.renderTemplate('mainTest', {
      projectName: context.projectName,
      graphName: graph.metadata.name,
      hasLangfuse: context.includeLangfuse,
    });

    const formattedTestContent = await this.codeFormatter.format(
      mainTestContent,
      'typescript'
    );
    testFiles.push({
      path: 'src/__tests__/index.test.ts',
      content: formattedTestContent,
      type: 'test',
      dependencies: [],
      exports: [],
      size: Buffer.byteLength(formattedTestContent, 'utf8'),
    });

    return testFiles;
  }

  // Helper methods

  private validateInputs(graph: IRGraph, context: GenerationContext): void {
    if (
      !graph.nodes ||
      !Array.isArray(graph.nodes) ||
      graph.nodes.length === 0
    ) {
      throw new Error('Graph must contain at least one node');
    }

    if (!context.projectName || !context.outputPath) {
      throw new Error('Project name and output path are required');
    }
  }

  private sortNodesForExecution(graph: IRGraph): IRNode[] {
    // Topological sort based on dependencies
    const visited = new Set<NodeId>();
    const sorted: IRNode[] = [];

    const visit = (nodeId: NodeId): void => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      // Visit dependencies first
      const dependencies = graph.connections
        .filter((c) => c.target === nodeId)
        .map((c) => c.source);

      dependencies.forEach(visit);

      const node = graph.nodes.find((n) => n.id === nodeId);
      if (node) {
        sorted.push(node);
      }
    };

    // Start with entry points (nodes with no incoming connections)
    const entryPoints = graph.nodes.filter(
      (node) => !graph.connections.some((c) => c.target === node.id)
    );

    entryPoints.forEach((node) => visit(node.id));

    // Add any remaining nodes
    graph.nodes.forEach((node) => visit(node.id));

    return sorted;
  }

  private getNodeConverter(node: IRNode): NodeConverter | undefined {
    return this.nodeConverters.get(node.type);
  }

  private isAsyncNode(node: IRNode): boolean {
    // Nodes that typically require async operations
    const asyncCategories = [
      'llm',
      'chain',
      'agent',
      'tool',
      'vectorstore',
      'retriever',
    ];
    return asyncCategories.includes(node.category);
  }

  private getNodeExports(node: IRNode): string[] {
    // Generate appropriate exports based on node type
    const baseName = this.sanitizeVariableName(node.label);
    return [`${baseName}`];
  }

  private sanitizeVariableName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, '_$&')
      .toLowerCase();
  }

  private generateUnsupportedNodeFragment(node: IRNode): CodeFragment {
    return {
      id: `unsupported_${node.id}`,
      type: 'declaration',
      content: `// TODO: Unsupported node type '${node.type}' (${node.label})`,
      dependencies: [],
      language: 'typescript',
      metadata: {
        nodeId: node.id,
        order: 0,
        description: `Unsupported node: ${node.label}`,
        category: node.category,
      },
    };
  }

  private hasAsyncOperations(
    organizedFragments: Map<string, CodeFragment[]>
  ): boolean {
    for (const fragments of organizedFragments.values()) {
      if (fragments.some((f) => f.metadata?.async)) {
        return true;
      }
    }
    return false;
  }

  private extractCustomTypes(graph: IRGraph): string[] {
    // Extract custom types from node parameters
    const types = new Set<string>();

    for (const node of graph.nodes || []) {
      for (const param of node.parameters) {
        if (param.type === 'object' && typeof param.value === 'object') {
          types.add(this.generateTypeFromObject(param.name, param.value));
        }
      }
    }

    return Array.from(types);
  }

  private generateTypeFromObject(name: string, obj: unknown): string {
    // Generate TypeScript interface from object
    if (typeof obj !== 'object' || obj === null) {
      return '';
    }

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const properties = Object.entries(obj as Record<string, unknown>)
      .map(([key, value]) => `  ${key}: ${this.getTypeFromValue(value)};`)
      .join('\n');

    return `export interface ${capitalizedName} {\n${properties}\n}`;
  }

  private getTypeFromValue(value: unknown): string {
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) return 'unknown[]';
    if (typeof value === 'object') return 'Record<string, unknown>';
    return 'unknown';
  }

  private generateInterfaces(_graph: IRGraph): string[] {
    // Generate common interfaces used in the application
    const interfaces = [
      `export interface AppConfig {
        llm: {
          modelName: string;
          temperature: number;
          maxTokens?: number;
        };
        memory?: {
          type: string;
          options?: Record<string, unknown>;
        };
        langfuse?: {
          enabled: boolean;
          apiKey?: string;
          baseUrl?: string;
        };
      }`,

      `export interface ChatMessage {
        role: 'system' | 'user' | 'assistant';
        content: string;
        metadata?: Record<string, unknown>;
      }`,

      `export interface ProcessingResult {
        success: boolean;
        result?: unknown;
        error?: string;
        metadata?: Record<string, unknown>;
      }`,
    ];

    return interfaces;
  }

  private extractConfiguration(graph: IRGraph): Record<string, unknown> {
    const config: Record<string, unknown> = {
      app: {
        name: graph.metadata.name,
        version: graph.metadata.version || '1.0.0',
      },
    };

    // Extract configuration from nodes
    for (const node of graph.nodes || []) {
      if (node.category === 'llm') {
        config['llm'] = {
          modelName: this.getParameterValue(node, 'modelName', 'gpt-3.5-turbo'),
          temperature: this.getParameterValue(node, 'temperature', 0.7),
          maxTokens: this.getParameterValue(node, 'maxTokens'),
        };
      }
    }

    return config;
  }

  private getParameterValue(
    node: IRNode,
    paramName: string,
    defaultValue?: unknown
  ): unknown {
    const param = node.parameters.find((p) => p.name === paramName);
    return param?.value ?? defaultValue;
  }

  private extractDependencies(
    organizedFragments: Map<string, CodeFragment[]>,
    context: GenerationContext
  ): Record<string, string> {
    const dependencies: Record<string, string> = {
      dotenv: '^16.4.5',
    };

    // Core LangChain dependencies
    dependencies['langchain'] = '^0.2.17';
    dependencies['@langchain/core'] = '^0.2.30';

    // Extract dependencies from fragments
    for (const fragments of organizedFragments.values()) {
      for (const fragment of fragments) {
        for (const dep of fragment.dependencies) {
          if (!dependencies[dep]) {
            dependencies[dep] = this.getDefaultVersion(dep);
          }
        }
      }
    }

    // Add LangFuse if requested
    if (context.includeLangfuse) {
      dependencies['langfuse'] = '^3.0.0';
    }

    return dependencies;
  }

  private getDefaultVersion(packageName: string): string {
    // Default versions for common packages
    const versions: Record<string, string> = {
      '@langchain/openai': '^0.2.7',
      '@langchain/anthropic': '^0.2.0',
      '@langchain/community': '^0.3.48',
      'faiss-node': '^0.5.1',
      'hnswlib-node': '^3.0.0',
      chromadb: '^1.8.1',
    };

    return versions[packageName] || '^1.0.0';
  }

  private extractEnvironmentVariables(graph: IRGraph): Array<{
    name: string;
    description: string;
    example?: string;
    required: boolean;
  }> {
    const envVars: Array<{
      name: string;
      description: string;
      example?: string;
      required: boolean;
    }> = [];

    // Extract from node parameters
    for (const node of graph.nodes || []) {
      for (const param of node.parameters) {
        if (param.type === 'credential') {
          const envName = this.parameterToEnvName(param.name);
          envVars.push({
            name: envName,
            description: param.description || `${param.name} for ${node.label}`,
            example: this.getCredentialExample(param.name),
            required: param.required || false,
          });
        }
      }
    }

    // Common environment variables
    envVars.push({
      name: 'NODE_ENV',
      description: 'Node environment (development, production, test)',
      example: 'development',
      required: false,
    });

    return envVars;
  }

  private parameterToEnvName(paramName: string): string {
    return paramName
      .replace(/([A-Z])/g, '_$1')
      .toUpperCase()
      .replace(/^_/, '');
  }

  private getCredentialExample(paramName: string): string {
    const examples: Record<string, string> = {
      openAIApiKey: 'sk-...',
      anthropicApiKey: 'sk-ant-...',
      pineconeApiKey: 'your-pinecone-api-key',
      serpApiKey: 'your-serpapi-key',
    };

    return examples[paramName] || 'your-api-key-here';
  }

  private calculateMetadata(
    graph: IRGraph,
    files: GeneratedFile[],
    context: GenerationContext
  ): CodeGenerationResult['metadata'] {
    const dependencies = Array.from(
      new Set(
        files
          .filter((f) => f.type === 'config')
          .flatMap((f) => Object.keys(JSON.parse(f.content).dependencies || {}))
      )
    );

    const totalNodes = graph.nodes.length;
    const totalConnections = graph.connections.length;

    // Calculate complexity based on node and connection count
    let estimatedComplexity: 'simple' | 'medium' | 'complex' = 'simple';
    const totalElements = totalNodes + totalConnections;
    if (totalElements > 10) estimatedComplexity = 'complex';
    else if (totalElements > 5) estimatedComplexity = 'medium';

    // Detect features
    const features: string[] = [];
    if (context.includeLangfuse) features.push('LangFuse Integration');
    if (dependencies.includes('@langchain/core'))
      features.push('LangChain Core');
    if (totalConnections > 0) features.push('Node Connections');

    return {
      projectName: context.projectName,
      targetLanguage: context.targetLanguage,
      langchainVersion: context.environment.langchainVersion || '0.1.0',
      nodeVersion: context.environment.nodeVersion,
      generatedAt: new Date().toISOString(),
      totalNodes,
      totalConnections,
      estimatedComplexity,
      features,
      warnings: [],
    };
  }

  /**
   * Extract file dependencies from fragments
   */
  private extractFileDependencies(
    organizedFragments: Map<string, CodeFragment[]>
  ): string[] {
    const dependencies = new Set<string>();

    for (const fragments of organizedFragments.values()) {
      for (const fragment of fragments) {
        fragment.dependencies.forEach((dep) => dependencies.add(dep));
      }
    }

    return Array.from(dependencies);
  }

  /**
   * Extract file exports from fragments
   */
  private extractFileExports(
    organizedFragments: Map<string, CodeFragment[]>
  ): string[] {
    const exports = new Set<string>();

    const exportFragments = organizedFragments.get('export') || [];
    for (const fragment of exportFragments) {
      if (fragment.metadata?.exports) {
        fragment.metadata.exports.forEach((exp) => exports.add(exp));
      }
    }

    return Array.from(exports);
  }

  /**
   * Calculate complexity of the graph (currently unused)
   */
  /*
  private calculateComplexity(graph: IRGraph): 'simple' | 'medium' | 'complex' {
    const nodeCount = graph.nodes.length;
    const connectionCount = graph.connections.length;
    const totalElements = nodeCount + connectionCount;

    if (totalElements <= 5) return 'simple';
    if (totalElements <= 15) return 'medium';
    return 'complex';
  }
  */

  /**
   * Extract features from the graph (currently unused)
   */
  /*
  private extractFeatures(graph: IRGraph): string[] {
    const features: string[] = [];
    const nodeTypes = new Set(graph.nodes.map((n) => n.category));

    if (nodeTypes.has('llm')) features.push('Large Language Models');
    if (nodeTypes.has('memory')) features.push('Conversation Memory');
    if (nodeTypes.has('tool')) features.push('Tool Integration');
    if (nodeTypes.has('vectorstore')) features.push('Vector Storage');
    if (nodeTypes.has('agent')) features.push('AI Agents');
    if (nodeTypes.has('chain')) features.push('LangChain Chains');

    return features;
  }
  */

  /**
   * Extract warnings from the graph (currently unused)
   */
  /*
  private extractWarnings(graph: IRGraph): string[] {
    const warnings: string[] = [];

    // Check for unsupported nodes
    const unsupportedNodes = graph.nodes.filter(
      (node) => !this.getNodeConverter(node)
    );
    if (unsupportedNodes.length > 0) {
      warnings.push(
        `${unsupportedNodes.length} unsupported node type(s) found`
      );
    }

    return warnings;
  }
  */

  /**
   * Generate npm scripts
   */
  private generateScripts(context: GenerationContext): Record<string, string> {
    return {
      build: 'tsc',
      start: 'node dist/index.js',
      dev: 'tsx src/index.ts',
      'type-check': 'tsc --noEmit',
      test: context.includeTests ? 'jest' : 'echo "No tests configured"',
    };
  }

  /**
   * Generate package info
   */
  private generatePackageInfo(
    graph: IRGraph,
    context: GenerationContext,
    dependencies: Record<string, string>
  ): CodeGenerationResult['packageInfo'] {
    return {
      name: context.projectName,
      version: '1.0.0',
      description:
        graph.metadata.description || 'Generated LangChain application',
      main: 'dist/index.js',
      type: 'module',
      scripts: this.generateScripts(context),
      dependencies,
      devDependencies: {
        typescript: '^5.5.4',
        tsx: '^4.16.5',
        '@types/node': '^20.14.15',
      },
    };
  }

  /**
   * Initialize node converters for different node types
   */
  private initializeNodeConverters(): void {
    // This will be implemented in separate converter files
    // For now, we'll import and register them
    import('./converters/llm-converter.js')
      .then((module) => {
        const converter = new module.LLMConverter();
        this.nodeConverters.set('openAI', converter);
        this.nodeConverters.set('chatOpenAI', converter);
        this.nodeConverters.set('anthropic', converter);
      })
      .catch(() => {
        // Converter not available yet
      });

    import('./converters/chain-converter.js')
      .then((module) => {
        const converter = new module.ChainConverter();
        this.nodeConverters.set('llmChain', converter);
        this.nodeConverters.set('conversationChain', converter);
      })
      .catch(() => {
        // Converter not available yet
      });

    import('./converters/prompt-converter.js')
      .then((module) => {
        const converter = new module.PromptConverter();
        this.nodeConverters.set('chatPromptTemplate', converter);
        this.nodeConverters.set('promptTemplate', converter);
      })
      .catch(() => {
        // Converter not available yet
      });

    import('./converters/memory-converter.js')
      .then((module) => {
        const bufferConverter = module.getMemoryConverter('bufferMemory');
        if (bufferConverter) {
          this.nodeConverters.set('bufferMemory', bufferConverter);
          this.nodeConverters.set('bufferWindowMemory', bufferConverter);
        }
      })
      .catch(() => {
        // Converter not available yet
      });

    import('./converters/tool-converter.js')
      .then((module) => {
        const calcConverter = module.getToolConverter('calculator');
        const serpConverter = module.getToolConverter('serpAPI');
        if (calcConverter) this.nodeConverters.set('calculator', calcConverter);
        if (serpConverter) this.nodeConverters.set('serpAPI', serpConverter);
      })
      .catch(() => {
        // Converter not available yet
      });
  }
}
