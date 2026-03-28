/**
 * Chain Node Converter for TypeScript Code Generation
 *
 * Converts chain nodes (LLMChain, ConversationChain, etc.) to TypeScript code.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../../ir/types.js';
import { NodeConverter } from '../emitter.js';

export class ChainConverter implements NodeConverter {
  /**
   * Convert chain node to code fragments
   */
  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Generate import fragment
    fragments.push(this.generateImportFragment(node));

    // Generate declaration fragment
    fragments.push(this.generateDeclarationFragment(node, context));

    // Generate execution fragment
    fragments.push(this.generateExecutionFragment(node, context));

    return fragments;
  }

  /**
   * Get dependencies for the chain node
   */
  getDependencies(node: IRNode, _context?: GenerationContext): string[] {
    const dependencies = ['@langchain/core'];

    switch (node.type) {
      case 'llmChain':
        dependencies.push('@langchain/core');
        break;
      case 'conversationChain':
        dependencies.push('@langchain/community');
        break;
      case 'retrievalQAChain':
        dependencies.push('@langchain/community');
        break;
      case 'multiPromptChain':
        dependencies.push('@langchain/community');
        break;
      case 'sequentialChain':
        dependencies.push('@langchain/community');
        break;
    }

    return dependencies;
  }

  /**
   * Get imports for the chain node
   */
  getImports(node: IRNode): string[] {
    const imports: string[] = [];

    switch (node.type) {
      case 'llmChain':
        imports.push('LLMChain');
        break;
      case 'conversationChain':
        imports.push('ConversationChain');
        break;
      case 'retrievalQAChain':
        imports.push('RetrievalQAChain');
        break;
      case 'multiPromptChain':
        imports.push('MultiPromptChain');
        break;
      case 'sequentialChain':
        imports.push('SequentialChain');
        break;
      case 'transformChain':
        imports.push('TransformChain');
        break;
    }

    return imports;
  }

  /**
   * Check if this converter supports the node
   */
  canConvert(node: IRNode): boolean {
    const supportedTypes = [
      'llmChain',
      'conversationChain',
      'retrievalQAChain',
      'multiPromptChain',
      'sequentialChain',
      'transformChain',
      'mapReduceChain',
    ];
    return supportedTypes.includes(node.type);
  }

  /**
   * Generate import fragment
   */
  private generateImportFragment(node: IRNode): CodeFragment {
    const className = this.getClassName(node.type);
    const packageName = this.getPackageName(node.type);

    return {
      id: `import_${node.id}`,
      type: 'import',
      content: `import { ${className} } from '${packageName}';`,
      dependencies: [packageName],
      language: 'typescript',
      metadata: {
        nodeId: node.id,
        order: 12,
        description: `Import for ${node.label}`,
        imports: [className],
      },
    };
  }

  /**
   * Generate declaration fragment
   */
  private generateDeclarationFragment(
    node: IRNode,
    context: GenerationContext
  ): CodeFragment {
    const variableName = this.sanitizeVariableName(node.label);

    let content: string;

    switch (node.type) {
      case 'llmChain':
        content = this.generateLLMChain(node, variableName, context);
        break;
      case 'conversationChain':
        content = this.generateConversationChain(node, variableName, context);
        break;
      case 'retrievalQAChain':
        content = this.generateRetrievalQAChain(node, variableName, context);
        break;
      case 'sequentialChain':
        content = this.generateSequentialChain(node, variableName, context);
        break;
      default:
        content = this.generateGenericChain(node, variableName, context);
        break;
    }

    return {
      id: `decl_${node.id}`,
      type: 'declaration',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        nodeId: node.id,
        order: 2000,
        description: `Declaration for ${node.label}`,
        category: node.category,
        async: true,
        exports: [variableName],
      },
    };
  }

  /**
   * Generate execution fragment
   */
  private generateExecutionFragment(
    node: IRNode,
    _context: GenerationContext
  ): CodeFragment {
    const variableName = this.sanitizeVariableName(node.label);
    const inputKey = this.getParameterValue(
      node,
      'inputKey',
      'input'
    ) as string;
    const outputKey = this.getParameterValue(
      node,
      'outputKey',
      'text'
    ) as string;

    const content = `// Execute ${node.label}
const ${variableName}Result = await ${variableName}.call({
  ${inputKey}: input,
  ...(options || {})
});

const result = ${variableName}Result.${outputKey} || ${variableName}Result.text || String(${variableName}Result);`;

    return {
      id: `exec_${node.id}`,
      type: 'execution',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        nodeId: node.id,
        order: 3000,
        description: `Execution for ${node.label}`,
        category: node.category,
        async: true,
      },
    };
  }

  /**
   * Generate LLMChain
   */
  private generateLLMChain(
    node: IRNode,
    variableName: string,
    context: GenerationContext
  ): string {
    const config: string[] = [];

    // LLM dependency (should be connected via input)
    config.push('  llm: llm'); // This will need to be resolved from connections

    // Prompt dependency (should be connected via input)
    config.push('  prompt: prompt'); // This will need to be resolved from connections

    // Memory (optional)
    const memoryInput = node.inputs?.find(
      (input) => input.dataType === 'memory'
    );
    if (memoryInput) {
      config.push('  memory: memory'); // This will need to be resolved from connections
    }

    // Output key
    const outputKey = this.getParameterValue(node, 'outputKey');
    if (outputKey) {
      config.push(`  outputKey: '${outputKey}'`);
    }

    // Return values
    const returnValues = this.getParameterValue(node, 'returnValues');
    if (
      returnValues &&
      Array.isArray(returnValues) &&
      returnValues.length > 0
    ) {
      config.push(`  returnValues: ${JSON.stringify(returnValues)}`);
    }

    // LangFuse callback integration
    if (context.includeLangfuse) {
      config.push(
        `  callbacks: [${this.sanitizeVariableName(node.id)}Callback].filter(Boolean)`
      );
    }

    return `// ${node.label} - ${node.type}
const ${variableName} = new LLMChain({
${config.join(',\n')}
});`;
  }

  /**
   * Generate ConversationChain
   */
  private generateConversationChain(
    node: IRNode,
    variableName: string,
    context: GenerationContext
  ): string {
    const config: string[] = [];

    config.push('  llm: llm');

    // Memory
    const memoryInput = node.inputs?.find(
      (input) => input.dataType === 'memory'
    );
    if (memoryInput) {
      config.push('  memory: memory');
    }

    // Prompt (optional for conversation chain)
    const promptInput = node.inputs?.find(
      (input) => input.dataType === 'prompt'
    );
    if (promptInput) {
      config.push('  prompt: prompt');
    }

    // LangFuse callback integration
    if (context.includeLangfuse) {
      config.push(
        `  callbacks: [${this.sanitizeVariableName(node.id)}Callback].filter(Boolean)`
      );
    }

    return `// ${node.label} - ${node.type}
const ${variableName} = new ConversationChain({
${config.join(',\n')}
});`;
  }

  /**
   * Generate RetrievalQAChain
   */
  private generateRetrievalQAChain(
    node: IRNode,
    variableName: string,
    context: GenerationContext
  ): string {
    const config: string[] = [];

    config.push('  llm: llm');
    config.push('  retriever: retriever'); // This will need to be resolved from connections

    // Chain type
    const chainType = this.getParameterValue(node, 'chainType', 'stuff');
    config.push(`  chainType: '${chainType}'`);

    // Return source documents
    const returnSourceDocuments = this.getParameterValue(
      node,
      'returnSourceDocuments',
      false
    );
    config.push(`  returnSourceDocuments: ${returnSourceDocuments}`);

    // LangFuse callback integration
    if (context.includeLangfuse) {
      config.push(
        `  callbacks: [${this.sanitizeVariableName(node.id)}Callback].filter(Boolean)`
      );
    }

    return `// ${node.label} - ${node.type}
const ${variableName} = RetrievalQAChain.fromLLM(llm, retriever, {
${config.join(',\n')}
});`;
  }

  /**
   * Generate SequentialChain
   */
  private generateSequentialChain(
    node: IRNode,
    variableName: string,
    context: GenerationContext
  ): string {
    const config: string[] = [];

    // Chains (will need to be resolved from connections)
    config.push('  chains: [/* chains will be resolved from connections */]');

    // Input variables
    const inputVariables = this.getParameterValue(node, 'inputVariables', [
      'input',
    ]);
    config.push(`  inputVariables: ${JSON.stringify(inputVariables)}`);

    // Output variables
    const outputVariables = this.getParameterValue(node, 'outputVariables');
    if (outputVariables) {
      config.push(`  outputVariables: ${JSON.stringify(outputVariables)}`);
    }

    // LangFuse callback integration
    if (context.includeLangfuse) {
      config.push(
        `  callbacks: [${this.sanitizeVariableName(node.id)}Callback].filter(Boolean)`
      );
    }

    return `// ${node.label} - ${node.type}
const ${variableName} = new SequentialChain({
${config.join(',\n')}
});`;
  }

  /**
   * Generate generic chain
   */
  private generateGenericChain(
    node: IRNode,
    variableName: string,
    context: GenerationContext
  ): string {
    const className = this.getClassName(node.type);
    const config: string[] = [];

    // Add common configuration
    config.push('  llm: llm');

    // Add any parameters as configuration
    for (const param of node.parameters) {
      if (param.value !== undefined && param.value !== null) {
        if (typeof param.value === 'string') {
          config.push(`  ${param.name}: '${param.value}'`);
        } else {
          config.push(`  ${param.name}: ${JSON.stringify(param.value)}`);
        }
      }
    }

    // LangFuse callback integration
    if (context.includeLangfuse) {
      config.push(
        `  callbacks: [${this.sanitizeVariableName(node.id)}Callback].filter(Boolean)`
      );
    }

    return `// ${node.label} - ${node.type}
const ${variableName} = new ${className}({
${config.join(',\n')}
});`;
  }

  /**
   * Get the TypeScript class name for the node type
   */
  private getClassName(nodeType: string): string {
    const classMap: Record<string, string> = {
      llmChain: 'LLMChain',
      conversationChain: 'ConversationChain',
      retrievalQAChain: 'RetrievalQAChain',
      multiPromptChain: 'MultiPromptChain',
      sequentialChain: 'SequentialChain',
      transformChain: 'TransformChain',
      mapReduceChain: 'MapReduceQAChain',
    };

    return classMap[nodeType] || 'BaseChain';
  }

  /**
   * Get the package name for the node type
   */
  private getPackageName(nodeType: string): string {
    if (nodeType === 'llmChain') {
      return '@langchain/core/chains';
    }
    return '@langchain/community/chains';
  }

  /**
   * Get parameter value from node
   */
  private getParameterValue(
    node: IRNode,
    paramName: string,
    defaultValue?: unknown
  ): unknown {
    const param = node.parameters.find((p) => p.name === paramName);
    return param?.value ?? defaultValue;
  }

  /**
   * Sanitize variable name
   */
  private sanitizeVariableName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, '_$&')
      .toLowerCase();
  }
}
