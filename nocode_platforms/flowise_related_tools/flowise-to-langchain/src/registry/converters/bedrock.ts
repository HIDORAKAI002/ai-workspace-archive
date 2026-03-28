/**
 * AWS Bedrock LLM Converters
 *
 * Converters for AWS Bedrock models including BedrockChat and BedrockLLM.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Bedrock converter with common functionality
 */
abstract class BaseBedrockConverter extends BaseConverter {
  readonly category = 'llm';

  protected generateBedrockConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
  } {
    const modelName = this.getParameterValue<string>(
      node,
      'modelName',
      'anthropic.claude-v2'
    );
    const region = this.getParameterValue<string>(node, 'region', 'us-east-1');
    const temperature = this.getParameterValue<number>(
      node,
      'temperature',
      0.7
    );
    const maxTokens = this.getParameterValue<number>(node, 'maxTokens');
    const streaming = this.getParameterValue<boolean>(node, 'streaming', false);

    // AWS Credentials - these would typically come from environment variables
    const accessKeyId = this.getParameterValue<string>(node, 'accessKeyId');
    const secretAccessKey = this.getParameterValue<string>(
      node,
      'secretAccessKey'
    );
    const sessionToken = this.getParameterValue<string>(node, 'sessionToken');

    const config: Record<string, unknown> = {
      ...(typeof modelName === 'string' && modelName
        ? { model: modelName }
        : {}),
      ...(typeof region === 'string' && region ? { region } : {}),
      ...(temperature !== undefined && { temperature }),
      ...(maxTokens !== undefined && { maxTokens }),
      ...(streaming !== undefined && { streaming }),
    };

    // Add credentials if provided (though typically these come from environment)
    if (accessKeyId || secretAccessKey || sessionToken) {
      const credentials: any = {};
      if (accessKeyId) credentials.accessKeyId = accessKeyId;
      if (secretAccessKey) credentials.secretAccessKey = secretAccessKey;
      if (sessionToken) credentials.sessionToken = sessionToken;

      if (Object.keys(credentials).length > 0) {
        config['credentials'] = credentials;
      }
    }

    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config,
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'llm');
    const config = this.generateBedrockConfiguration(node, _context);
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

    // Configuration object
    const configStr = Object.entries(config.config)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `  ${key}: ${this.formatParameterValue(value)}`)
      .join(',\n');

    // Declaration fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_declaration`,
        'declaration',
        `const ${variableName} = new ${config.className}({\n${configStr}\n});`,
        [],
        node.id,
        2,
        { exports: [variableName] }
      )
    );

    return fragments;
  }
}

/**
 * BedrockChat Converter for AWS Bedrock Chat models
 */
export class BedrockChatConverter extends BaseBedrockConverter {
  readonly flowiseType = 'bedrockChat';

  protected override getRequiredImports(): string[] {
    return ['BedrockChat'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/chat_models/bedrock';
  }

  protected override getClassName(): string {
    return 'BedrockChat';
  }

  override getDependencies(): string[] {
    return ['@langchain/community', '@langchain/core'];
  }

  protected override generateBedrockConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateBedrockConfiguration(node, _context);

    // BedrockChat specific parameters
    const topP = this.getParameterValue<number>(node, 'topP');
    const topK = this.getParameterValue<number>(node, 'topK');
    const stopSequences = this.getParameterValue<string[]>(
      node,
      'stopSequences'
    );
    const maxRetries = this.getParameterValue<number>(node, 'maxRetries', 2);

    // Add BedrockChat specific configuration
    const configObj = config.config as any;
    if (topP !== undefined) configObj.topP = topP;
    if (topK !== undefined) configObj.topK = topK;
    if (
      stopSequences &&
      Array.isArray(stopSequences) &&
      stopSequences.length > 0
    ) {
      configObj.stopSequences = stopSequences;
    }
    if (maxRetries !== undefined) configObj.maxRetries = maxRetries;

    return config;
  }
}

/**
 * BedrockLLM Converter for AWS Bedrock LLM models
 */
export class BedrockLLMConverter extends BaseBedrockConverter {
  readonly flowiseType = 'bedrockLLM';

  protected override getRequiredImports(): string[] {
    return ['Bedrock'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/llms/bedrock';
  }

  protected override getClassName(): string {
    return 'Bedrock';
  }

  override getDependencies(): string[] {
    return ['@langchain/community', '@langchain/core'];
  }

  protected override generateBedrockConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateBedrockConfiguration(node, _context);

    // BedrockLLM specific parameters
    const topP = this.getParameterValue<number>(node, 'topP');
    const topK = this.getParameterValue<number>(node, 'topK');
    const stopSequences = this.getParameterValue<string[]>(
      node,
      'stopSequences'
    );
    const maxRetries = this.getParameterValue<number>(node, 'maxRetries', 2);

    // Add BedrockLLM specific configuration
    const configObj = config.config as any;
    if (topP !== undefined) configObj.topP = topP;
    if (topK !== undefined) configObj.topK = topK;
    if (
      stopSequences &&
      Array.isArray(stopSequences) &&
      stopSequences.length > 0
    ) {
      configObj.stopSequences = stopSequences;
    }
    if (maxRetries !== undefined) configObj.maxRetries = maxRetries;

    return config;
  }
}

/**
 * Bedrock Embedding Converter for AWS Bedrock embedding models
 */
export class BedrockEmbeddingConverter extends BaseConverter {
  readonly flowiseType = 'bedrockEmbedding';
  readonly category = 'embedding';

  protected getRequiredImports(): string[] {
    return ['BedrockEmbeddings'];
  }

  protected getPackageName(): string {
    return '@langchain/community/embeddings/bedrock';
  }

  protected getClassName(): string {
    return 'BedrockEmbeddings';
  }

  override getDependencies(): string[] {
    return ['@langchain/community', '@langchain/core'];
  }

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'embedding');
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        this.generateImport(this.getPackageName(), this.getRequiredImports()),
        [this.getPackageName()],
        node.id,
        1
      )
    );

    // Configuration
    const modelName = this.getParameterValue<string>(
      node,
      'modelName',
      'amazon.titan-embed-text-v1'
    );
    const region = this.getParameterValue<string>(node, 'region', 'us-east-1');
    const accessKeyId = this.getParameterValue<string>(node, 'accessKeyId');
    const secretAccessKey = this.getParameterValue<string>(
      node,
      'secretAccessKey'
    );
    const sessionToken = this.getParameterValue<string>(node, 'sessionToken');

    const config: Record<string, unknown> = {
      ...(typeof modelName === 'string' && modelName
        ? { model: modelName }
        : {}),
      ...(typeof region === 'string' && region ? { region } : {}),
    };

    // Add credentials if provided
    if (accessKeyId || secretAccessKey || sessionToken) {
      const credentials: any = {};
      if (accessKeyId) credentials.accessKeyId = accessKeyId;
      if (secretAccessKey) credentials.secretAccessKey = secretAccessKey;
      if (sessionToken) credentials.sessionToken = sessionToken;

      if (Object.keys(credentials).length > 0) {
        config['credentials'] = credentials;
      }
    }

    const configStr = Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `  ${key}: ${this.formatParameterValue(value)}`)
      .join(',\n');

    // Declaration fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_declaration`,
        'declaration',
        `const ${variableName} = new ${this.getClassName()}({\n${configStr}\n});`,
        [],
        node.id,
        2,
        { exports: [variableName] }
      )
    );

    return fragments;
  }
}
