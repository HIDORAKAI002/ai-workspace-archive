/**
 * Embeddings Converters
 *
 * Converters for various embedding models including OpenAI, Cohere, Hugging Face, etc.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Embeddings converter with common functionality
 */
abstract class BaseEmbeddingsConverter extends BaseConverter {
  readonly category = 'embeddings';

  protected generateEmbeddingsConfiguration(
    node: IRNode,
    context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
  } {
    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config: this.extractEmbeddingsConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractEmbeddingsConfig(
    node: IRNode
  ): Record<string, unknown>;

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'embeddings');
    const config = this.generateEmbeddingsConfiguration(node, _context);
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

    // Configuration fragment
    const configStr = this.generateConfigurationString(config.config);
    const initCode = configStr
      ? `const ${variableName} = new ${config.className}(${configStr});`
      : `const ${variableName} = new ${config.className}();`;

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [config.className],
        node.id,
        140
      )
    );

    return fragments;
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
}

/**
 * OpenAI Embeddings Converter
 */
export class OpenAIEmbeddingsConverter extends BaseEmbeddingsConverter {
  readonly flowiseType = 'openAIEmbeddings';

  protected override getRequiredImports(): string[] {
    return ['OpenAIEmbeddings'];
  }

  protected override getPackageName(): string {
    return '@langchain/openai';
  }

  protected override getClassName(): string {
    return 'OpenAIEmbeddings';
  }

  protected override extractEmbeddingsConfig(
    node: IRNode
  ): Record<string, unknown> {
    const config: any = {};

    const apiKey = this.getParameterValue(node, 'apiKey');
    if (apiKey) {
      config.openAIApiKey = apiKey;
    } else {
      config.openAIApiKey = 'process.env.OPENAI_API_KEY';
    }

    const model = this.getParameterValue(
      node,
      'model',
      'text-embedding-ada-002'
    );
    config.model = model;

    const batchSize = this.getParameterValue(node, 'batchSize');
    if (batchSize) {
      config.batchSize = batchSize;
    }

    const stripNewLines = this.getParameterValue(node, 'stripNewLines');
    if (stripNewLines !== undefined) {
      config.stripNewLines = stripNewLines;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/openai'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Cohere Embeddings Converter
 */
export class CohereEmbeddingsConverter extends BaseEmbeddingsConverter {
  readonly flowiseType = 'cohereEmbeddings';

  protected override getRequiredImports(): string[] {
    return ['CohereEmbeddings'];
  }

  protected override getPackageName(): string {
    return '@langchain/cohere';
  }

  protected override getClassName(): string {
    return 'CohereEmbeddings';
  }

  protected override extractEmbeddingsConfig(
    node: IRNode
  ): Record<string, unknown> {
    const config: any = {};

    const apiKey = this.getParameterValue(node, 'apiKey');
    if (apiKey) {
      config.apiKey = apiKey;
    } else {
      config.apiKey = 'process.env.COHERE_API_KEY';
    }

    const model = this.getParameterValue(node, 'model', 'embed-english-v2.0');
    config.model = model;

    const batchSize = this.getParameterValue(node, 'batchSize');
    if (batchSize) {
      config.batchSize = batchSize;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/cohere'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Hugging Face Embeddings Converter
 */
export class HuggingFaceEmbeddingsConverter extends BaseEmbeddingsConverter {
  readonly flowiseType = 'huggingFaceEmbeddings';

  protected override getRequiredImports(): string[] {
    return ['HuggingFaceInferenceEmbeddings'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/embeddings/hf';
  }

  protected override getClassName(): string {
    return 'HuggingFaceInferenceEmbeddings';
  }

  protected override extractEmbeddingsConfig(
    node: IRNode
  ): Record<string, unknown> {
    const config: any = {};

    const apiKey = this.getParameterValue(node, 'apiKey');
    if (apiKey) {
      config.apiKey = apiKey;
    } else {
      config.apiKey = 'process.env.HUGGINGFACEHUB_API_TOKEN';
    }

    const model = this.getParameterValue(
      node,
      'model',
      'sentence-transformers/all-MiniLM-L6-v2'
    );
    config.model = model;

    const endpoint = this.getParameterValue(node, 'endpoint');
    if (endpoint) {
      config.endpoint = endpoint;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/embeddings/hf'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Azure OpenAI Embeddings Converter
 */
export class AzureOpenAIEmbeddingsConverter extends BaseEmbeddingsConverter {
  readonly flowiseType = 'azureOpenAIEmbeddings';

  protected override getRequiredImports(): string[] {
    return ['AzureOpenAIEmbeddings'];
  }

  protected override getPackageName(): string {
    return '@langchain/openai';
  }

  protected override getClassName(): string {
    return 'AzureOpenAIEmbeddings';
  }

  protected override extractEmbeddingsConfig(
    node: IRNode
  ): Record<string, unknown> {
    const config: any = {};

    const apiKey = this.getParameterValue(node, 'apiKey');
    if (apiKey) {
      config.azureOpenAIApiKey = apiKey;
    } else {
      config.azureOpenAIApiKey = 'process.env.AZURE_OPENAI_API_KEY';
    }

    const instanceName = this.getParameterValue(node, 'instanceName');
    if (instanceName) {
      config.azureOpenAIApiInstanceName = instanceName;
    } else {
      config.azureOpenAIApiInstanceName =
        'process.env.AZURE_OPENAI_API_INSTANCE_NAME';
    }

    const deploymentName = this.getParameterValue(node, 'deploymentName');
    if (deploymentName) {
      config.azureOpenAIApiDeploymentName = deploymentName;
    } else {
      config.azureOpenAIApiDeploymentName =
        'process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME';
    }

    const apiVersion = this.getParameterValue(node, 'apiVersion', '2023-05-15');
    config.azureOpenAIApiVersion = apiVersion;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/openai'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Google Vertex AI Embeddings Converter
 */
export class GoogleVertexAIEmbeddingsConverter extends BaseEmbeddingsConverter {
  readonly flowiseType = 'googleVertexAIEmbeddings';

  protected override getRequiredImports(): string[] {
    return ['GoogleVertexAIEmbeddings'];
  }

  protected override getPackageName(): string {
    return '@langchain/google-vertexai';
  }

  protected override getClassName(): string {
    return 'GoogleVertexAIEmbeddings';
  }

  protected override extractEmbeddingsConfig(
    node: IRNode
  ): Record<string, unknown> {
    const config: any = {};

    const projectId = this.getParameterValue(node, 'projectId');
    if (projectId) {
      config.projectId = projectId;
    } else {
      config.projectId = 'process.env.GOOGLE_CLOUD_PROJECT_ID';
    }

    const location = this.getParameterValue(node, 'location', 'us-central1');
    config.location = location;

    const model = this.getParameterValue(
      node,
      'model',
      'textembedding-gecko@001'
    );
    config.model = model;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/google-vertexai'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}
