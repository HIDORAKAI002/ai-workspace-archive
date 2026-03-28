/**
 * LLM Node Converter for TypeScript Code Generation
 *
 * Converts LLM nodes (OpenAI, Anthropic, etc.) to TypeScript code.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../../ir/types.js';
import { NodeConverter } from '../emitter.js';

export class LLMConverter implements NodeConverter {
  /**
   * Convert LLM node to code fragments
   */
  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Generate import fragment
    fragments.push(this.generateImportFragment(node));

    // Generate declaration fragment
    fragments.push(this.generateDeclarationFragment(node, context));

    return fragments;
  }

  /**
   * Get dependencies for the LLM node
   */
  getDependencies(node: IRNode, _context?: GenerationContext): string[] {
    const dependencies: string[] = [];

    switch (node.type) {
      case 'openAI':
      case 'chatOpenAI':
        dependencies.push('@langchain/openai');
        break;
      case 'anthropic':
        dependencies.push('@langchain/anthropic');
        break;
      case 'azureOpenAI':
        dependencies.push('@langchain/azure-openai');
        break;
      case 'ollama':
        dependencies.push('@langchain/ollama');
        break;
      case 'huggingFace':
        dependencies.push('@langchain/community');
        break;
      case 'cohere':
        dependencies.push('@langchain/cohere');
        break;
    }

    return dependencies;
  }

  /**
   * Get imports for the LLM node
   */
  getImports(node: IRNode): string[] {
    const imports: string[] = [];

    switch (node.type) {
      case 'openAI':
        imports.push('OpenAI');
        break;
      case 'chatOpenAI':
        imports.push('ChatOpenAI');
        break;
      case 'anthropic':
        imports.push('ChatAnthropic');
        break;
      case 'azureOpenAI':
        imports.push('AzureChatOpenAI');
        break;
      case 'ollama':
        imports.push('Ollama');
        break;
      case 'huggingFace':
        imports.push('HuggingFaceInference');
        break;
      case 'cohere':
        imports.push('ChatCohere');
        break;
    }

    return imports;
  }

  /**
   * Check if this converter supports the node
   */
  canConvert(node: IRNode): boolean {
    const supportedTypes = [
      'openAI',
      'chatOpenAI',
      'anthropic',
      'azureOpenAI',
      'ollama',
      'huggingFace',
      'cohere',
      'replicate',
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
        order: 10,
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
    const className = this.getClassName(node.type);
    const config = this.generateConfiguration(node, context);

    const content = `// ${node.label} - ${node.type}
const ${variableName} = new ${className}(${config});`;

    return {
      id: `decl_${node.id}`,
      type: 'declaration',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        nodeId: node.id,
        order: 1000,
        description: `Declaration for ${node.label}`,
        category: node.category,
        async: true,
        exports: [variableName],
      },
    };
  }

  /**
   * Get the TypeScript class name for the node type
   */
  private getClassName(nodeType: string): string {
    const classMap: Record<string, string> = {
      openAI: 'OpenAI',
      chatOpenAI: 'ChatOpenAI',
      anthropic: 'ChatAnthropic',
      azureOpenAI: 'AzureChatOpenAI',
      ollama: 'Ollama',
      huggingFace: 'HuggingFaceInference',
      cohere: 'ChatCohere',
      replicate: 'Replicate',
    };

    return classMap[nodeType] || 'BaseLLM';
  }

  /**
   * Get the package name for the node type
   */
  private getPackageName(nodeType: string): string {
    const packageMap: Record<string, string> = {
      openAI: '@langchain/openai',
      chatOpenAI: '@langchain/openai',
      anthropic: '@langchain/anthropic',
      azureOpenAI: '@langchain/azure-openai',
      ollama: '@langchain/ollama',
      huggingFace: '@langchain/community',
      cohere: '@langchain/cohere',
      replicate: '@langchain/community',
    };

    return packageMap[nodeType] || '@langchain/community';
  }

  /**
   * Generate configuration object for the LLM
   */
  private generateConfiguration(
    node: IRNode,
    context: GenerationContext
  ): string {
    const config: string[] = [];

    // Model name
    const modelName = this.getParameterValue(node, 'modelName');
    if (modelName) {
      config.push(`  modelName: '${modelName}'`);
    }

    // Temperature
    const temperature = this.getParameterValue(node, 'temperature');
    if (temperature !== undefined) {
      config.push(`  temperature: ${temperature}`);
    }

    // Max tokens
    const maxTokens = this.getParameterValue(node, 'maxTokens');
    if (maxTokens !== undefined) {
      config.push(`  maxTokens: ${maxTokens}`);
    }

    // API Key (from environment)
    const apiKeyParam = this.findCredentialParameter(node);
    if (apiKeyParam) {
      const envName = this.parameterToEnvName(apiKeyParam.name);
      config.push(`  apiKey: process.env.${envName}`);
    }

    // OpenAI specific configuration
    if (node.type === 'openAI' || node.type === 'chatOpenAI') {
      const topP = this.getParameterValue(node, 'topP');
      if (topP !== undefined) {
        config.push(`  topP: ${topP}`);
      }

      const frequencyPenalty = this.getParameterValue(node, 'frequencyPenalty');
      if (frequencyPenalty !== undefined) {
        config.push(`  frequencyPenalty: ${frequencyPenalty}`);
      }

      const presencePenalty = this.getParameterValue(node, 'presencePenalty');
      if (presencePenalty !== undefined) {
        config.push(`  presencePenalty: ${presencePenalty}`);
      }
    }

    // Anthropic specific configuration
    if (node.type === 'anthropic') {
      const maxTokensToSample = this.getParameterValue(
        node,
        'maxTokensToSample'
      );
      if (maxTokensToSample !== undefined) {
        config.push(`  maxTokensToSample: ${maxTokensToSample}`);
      }
    }

    // Streaming support
    const streaming = this.getParameterValue(node, 'streaming');
    if (streaming !== undefined) {
      config.push(`  streaming: ${streaming}`);
    }

    // LangFuse callback integration
    if (context.includeLangfuse) {
      config.push(
        `  callbacks: [${this.sanitizeVariableName(node.id)}Callback].filter(Boolean)`
      );
    }

    if (config.length === 0) {
      return '{}';
    }

    return `{\n${config.join(',\n')}\n}`;
  }

  /**
   * Get parameter value from node
   */
  private getParameterValue(node: IRNode, paramName: string): unknown {
    const param = node.parameters.find((p) => p.name === paramName);
    return param?.value;
  }

  /**
   * Find credential parameter
   */
  private findCredentialParameter(
    node: IRNode
  ): { name: string; value: unknown } | undefined {
    const credentialParam = node.parameters.find(
      (p) => p.type === 'credential'
    );
    return credentialParam
      ? { name: credentialParam.name, value: credentialParam.value }
      : undefined;
  }

  /**
   * Convert parameter name to environment variable name
   */
  private parameterToEnvName(paramName: string): string {
    return paramName
      .replace(/([A-Z])/g, '_$1')
      .toUpperCase()
      .replace(/^_/, '');
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
