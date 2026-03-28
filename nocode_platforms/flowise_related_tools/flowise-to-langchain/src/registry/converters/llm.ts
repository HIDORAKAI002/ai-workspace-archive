/**
 * LLM Node Converters
 *
 * Converters for various Language Model nodes including OpenAI, Anthropic, etc.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base LLM converter with common functionality
 */
abstract class BaseLLMConverter extends BaseConverter {
  readonly category = 'llm';

  protected generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
  } {
    const modelName = this.getParameterValue<string>(node, 'modelName');
    const temperature = this.getParameterValue<number>(
      node,
      'temperature',
      0.7
    );
    const maxTokens = this.getParameterValue<number>(node, 'maxTokens');
    const apiKey = this.getParameterValue<string>(node, 'apiKey');

    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config: {
        ...(modelName && { modelName }),
        ...(temperature !== undefined && { temperature }),
        ...(maxTokens !== undefined && { maxTokens }),
        ...(apiKey && { openAIApiKey: apiKey }),
      },
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'llm');
    const config = this.generateLLMConfiguration(node, _context);
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
 * OpenAI LLM Converter
 */
export class OpenAIConverter extends BaseLLMConverter {
  readonly flowiseType = 'openAI';

  protected override getRequiredImports(): string[] {
    return ['OpenAI'];
  }

  protected override getPackageName(): string {
    return '@langchain/openai';
  }

  protected override getClassName(): string {
    return 'OpenAI';
  }

  override getDependencies(): string[] {
    return ['@langchain/openai', '@langchain/core'];
  }
}

/**
 * ChatOpenAI Converter
 */
export class ChatOpenAIConverter extends BaseLLMConverter {
  readonly flowiseType = 'chatOpenAI';

  protected override getRequiredImports(): string[] {
    return ['ChatOpenAI'];
  }

  protected override getPackageName(): string {
    return '@langchain/openai';
  }

  protected override getClassName(): string {
    return 'ChatOpenAI';
  }

  override getDependencies(): string[] {
    return ['@langchain/openai', '@langchain/core'];
  }

  protected override generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateLLMConfiguration(node, _context);

    // ChatOpenAI specific parameters
    const streaming = this.getParameterValue<boolean>(node, 'streaming', false);
    const topP = this.getParameterValue<number>(node, 'topP');
    const frequencyPenalty = this.getParameterValue<number>(
      node,
      'frequencyPenalty'
    );
    const presencePenalty = this.getParameterValue<number>(
      node,
      'presencePenalty'
    );

    config.config = {
      ...config.config,
      ...(streaming !== undefined && { streaming }),
      ...(topP !== undefined && { topP }),
      ...(frequencyPenalty !== undefined && { frequencyPenalty }),
      ...(presencePenalty !== undefined && { presencePenalty }),
    };

    return config;
  }
}

/**
 * Anthropic Claude Converter
 */
export class AnthropicConverter extends BaseLLMConverter {
  readonly flowiseType = 'anthropic';

  protected override getRequiredImports(): string[] {
    return ['ChatAnthropic'];
  }

  protected override getPackageName(): string {
    return '@langchain/anthropic';
  }

  protected override getClassName(): string {
    return 'ChatAnthropic';
  }

  override getDependencies(): string[] {
    return ['@langchain/anthropic', '@langchain/core'];
  }

  protected override generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateLLMConfiguration(node, _context);

    // Anthropic specific parameters
    const model = this.getParameterValue<string>(
      node,
      'modelName',
      'claude-3-sonnet-20240229'
    );
    const anthropicApiKey = this.getParameterValue<string>(
      node,
      'anthropicApiKey'
    );

    config.config = {
      ...(typeof model === 'string' && model ? { model } : {}),
      ...(config.config['temperature'] !== undefined
        ? { temperature: config.config['temperature'] }
        : {}),
      ...(config.config['maxTokens']
        ? { maxTokens: config.config['maxTokens'] }
        : {}),
      ...(typeof anthropicApiKey === 'string' && anthropicApiKey
        ? { anthropicApiKey }
        : {}),
    };

    // Remove OpenAI specific fields
    delete config.config['modelName'];
    delete config.config['openAIApiKey'];

    return config;
  }
}

/**
 * Azure OpenAI Converter
 */
export class AzureOpenAIConverter extends BaseLLMConverter {
  readonly flowiseType = 'azureOpenAI';

  protected override getRequiredImports(): string[] {
    return ['AzureOpenAI'];
  }

  protected override getPackageName(): string {
    return '@langchain/openai';
  }

  protected override getClassName(): string {
    return 'AzureOpenAI';
  }

  override getDependencies(): string[] {
    return ['@langchain/openai', '@langchain/core'];
  }

  protected override generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateLLMConfiguration(node, _context);

    // Azure specific parameters
    const azureOpenAIApiKey = this.getParameterValue<string>(
      node,
      'azureOpenAIApiKey'
    );
    const azureOpenAIApiVersion = this.getParameterValue<string>(
      node,
      'azureOpenAIApiVersion'
    );
    const azureOpenAIApiInstanceName = this.getParameterValue<string>(
      node,
      'azureOpenAIApiInstanceName'
    );
    const azureOpenAIApiDeploymentName = this.getParameterValue<string>(
      node,
      'azureOpenAIApiDeploymentName'
    );

    config.config = {
      ...config.config,
      ...(azureOpenAIApiKey && { azureOpenAIApiKey }),
      ...(azureOpenAIApiVersion && { azureOpenAIApiVersion }),
      ...(azureOpenAIApiInstanceName && { azureOpenAIApiInstanceName }),
      ...(azureOpenAIApiDeploymentName && { azureOpenAIApiDeploymentName }),
    };

    return config;
  }
}

/**
 * Ollama Converter
 */
export class OllamaConverter extends BaseLLMConverter {
  readonly flowiseType = 'ollama';

  protected override getRequiredImports(): string[] {
    return ['Ollama'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/llms/ollama';
  }

  protected override getClassName(): string {
    return 'Ollama';
  }

  override getDependencies(): string[] {
    return ['@langchain/community', '@langchain/core'];
  }

  protected override generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateLLMConfiguration(node, _context);

    // Ollama specific parameters
    const baseUrl = this.getParameterValue<string>(
      node,
      'baseUrl',
      'http://localhost:11434'
    );
    const model = this.getParameterValue<string>(node, 'modelName', 'llama2');

    config.config = {
      ...(typeof model === 'string' && model ? { model } : {}),
      ...(typeof baseUrl === 'string' && baseUrl ? { baseUrl } : {}),
      ...(config.config['temperature'] !== undefined
        ? { temperature: config.config['temperature'] }
        : {}),
      ...(config.config['maxTokens']
        ? { numPredict: config.config['maxTokens'] }
        : {}),
    };

    // Remove OpenAI specific fields
    delete config.config['modelName'];
    delete config.config['maxTokens'];
    delete config.config['openAIApiKey'];

    return config;
  }
}

/**
 * Hugging Face Converter
 */
export class HuggingFaceConverter extends BaseLLMConverter {
  readonly flowiseType = 'huggingFace';

  protected override getRequiredImports(): string[] {
    return ['HuggingFaceInference'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/llms/hf';
  }

  protected override getClassName(): string {
    return 'HuggingFaceInference';
  }

  override getDependencies(): string[] {
    return ['@langchain/community', '@langchain/core'];
  }

  protected override generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateLLMConfiguration(node, _context);

    // Hugging Face specific parameters
    const model = this.getParameterValue<string>(node, 'modelName', 'gpt2');
    const apiKey = this.getParameterValue<string>(node, 'huggingFaceApiKey');
    const endpointUrl = this.getParameterValue<string>(node, 'endpointUrl');

    config.config = {
      ...(typeof model === 'string' && model ? { model } : {}),
      ...(config.config['temperature'] !== undefined
        ? { temperature: config.config['temperature'] }
        : {}),
      ...(config.config['maxTokens']
        ? { maxTokens: config.config['maxTokens'] }
        : {}),
      ...(typeof apiKey === 'string' && apiKey ? { apiKey } : {}),
      ...(typeof endpointUrl === 'string' && endpointUrl
        ? { endpointUrl }
        : {}),
    };

    // Remove OpenAI specific fields
    delete config.config['modelName'];
    delete config.config['openAIApiKey'];

    return config;
  }
}

/**
 * Cohere Converter
 */
export class CohereConverter extends BaseLLMConverter {
  readonly flowiseType = 'cohere';

  protected override getRequiredImports(): string[] {
    return ['Cohere'];
  }

  protected override getPackageName(): string {
    return '@langchain/cohere';
  }

  protected override getClassName(): string {
    return 'Cohere';
  }

  override getDependencies(): string[] {
    return ['@langchain/cohere', '@langchain/core'];
  }

  protected override generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateLLMConfiguration(node, _context);

    // Cohere specific parameters
    const model = this.getParameterValue<string>(node, 'modelName', 'command');
    const apiKey = this.getParameterValue<string>(node, 'cohereApiKey');

    config.config = {
      ...(typeof model === 'string' && model ? { model } : {}),
      ...(config.config['temperature'] !== undefined
        ? { temperature: config.config['temperature'] }
        : {}),
      ...(config.config['maxTokens']
        ? { maxTokens: config.config['maxTokens'] }
        : {}),
      ...(typeof apiKey === 'string' && apiKey ? { apiKey } : {}),
    };

    // Remove OpenAI specific fields
    delete config.config['modelName'];
    delete config.config['openAIApiKey'];

    return config;
  }
}

/**
 * Replicate Converter
 */
export class ReplicateConverter extends BaseLLMConverter {
  readonly flowiseType = 'replicate';

  protected override getRequiredImports(): string[] {
    return ['Replicate'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/llms/replicate';
  }

  protected override getClassName(): string {
    return 'Replicate';
  }

  override getDependencies(): string[] {
    return ['@langchain/community', '@langchain/core'];
  }

  protected override generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateLLMConfiguration(node, _context);

    // Replicate specific parameters
    const model = this.getParameterValue<string>(
      node,
      'modelName',
      'replicate/llama-2-70b-chat:latest'
    );
    const apiKey = this.getParameterValue<string>(node, 'replicateApiKey');

    config.config = {
      ...(typeof model === 'string' && model ? { model } : {}),
      ...(config.config['temperature'] !== undefined
        ? { temperature: config.config['temperature'] }
        : {}),
      ...(config.config['maxTokens']
        ? { maxTokens: config.config['maxTokens'] }
        : {}),
      ...(typeof apiKey === 'string' && apiKey ? { apiKey } : {}),
    };

    // Remove OpenAI specific fields
    delete config.config['modelName'];
    delete config.config['openAIApiKey'];

    return config;
  }
}

/**
 * Google Generative AI (Gemini) Converter
 */
export class GoogleGenerativeAIConverter extends BaseLLMConverter {
  readonly flowiseType = 'googleGenerativeAI';

  protected override getRequiredImports(): string[] {
    return ['GoogleGenerativeAI'];
  }

  protected override getPackageName(): string {
    return '@langchain/google-genai';
  }

  protected override getClassName(): string {
    return 'GoogleGenerativeAI';
  }

  override getDependencies(): string[] {
    return ['@langchain/google-genai', '@langchain/core'];
  }

  protected override generateLLMConfiguration(
    node: IRNode,
    _context: GenerationContext
  ) {
    const config = super.generateLLMConfiguration(node, _context);

    // Google Generative AI specific parameters
    const modelName = this.getParameterValue<string>(
      node,
      'modelName',
      'gemini-pro'
    );
    const apiKey = this.getParameterValue<string>(node, 'googleApiKey');
    const maxOutputTokens = this.getParameterValue<number>(
      node,
      'maxOutputTokens'
    );
    const topP = this.getParameterValue<number>(node, 'topP');
    const topK = this.getParameterValue<number>(node, 'topK');
    const streaming = this.getParameterValue<boolean>(node, 'streaming', false);

    config.config = {
      ...(typeof modelName === 'string' && modelName ? { modelName } : {}),
      ...(config.config['temperature'] !== undefined
        ? { temperature: config.config['temperature'] }
        : {}),
      ...(typeof maxOutputTokens === 'number' && maxOutputTokens
        ? { maxOutputTokens }
        : {}),
      ...(typeof topP === 'number' && topP !== undefined ? { topP } : {}),
      ...(typeof topK === 'number' && topK !== undefined ? { topK } : {}),
      ...(typeof streaming === 'boolean' && streaming !== undefined
        ? { streaming }
        : {}),
      ...(typeof apiKey === 'string' && apiKey ? { apiKey } : {}),
    };

    // Remove base LLM fields that don't apply to Google Generative AI
    delete config.config['maxTokens'];
    delete config.config['openAIApiKey'];

    return config;
  }
}
