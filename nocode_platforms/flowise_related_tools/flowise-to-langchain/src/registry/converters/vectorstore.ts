/**
 * Vector Store Converters
 *
 * Converters for various vector store types including Pinecone, Chroma, FAISS, etc.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Vector Store converter with common functionality
 */
abstract class BaseVectorStoreConverter extends BaseConverter {
  readonly category = 'vectorstore';

  protected generateVectorStoreConfiguration(
    node: IRNode,
    _context: GenerationContext
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
      config: this.extractVectorStoreConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractVectorStoreConfig(
    node: IRNode
  ): Record<string, unknown>;

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'vectorstore');
    const config = this.generateVectorStoreConfiguration(node, _context);
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
        150
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
 * Pinecone Vector Store Converter
 */
export class PineconeConverter extends BaseVectorStoreConverter {
  readonly flowiseType = 'pinecone';

  protected override getRequiredImports(): string[] {
    return ['PineconeStore'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/vectorstores/pinecone';
  }

  protected override getClassName(): string {
    return 'PineconeStore';
  }

  protected override extractVectorStoreConfig(
    _node: IRNode
  ): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const apiKey = this.getParameterValue(_node, 'apiKey');
    if (apiKey) {
      config['apiKey'] = apiKey;
    } else {
      config['apiKey'] = 'process.env.PINECONE_API_KEY';
    }

    const environment = this.getParameterValue(_node, 'environment');
    if (environment) {
      config['environment'] = environment;
    } else {
      config['environment'] = 'process.env.PINECONE_ENVIRONMENT';
    }

    const indexName = this.getParameterValue(_node, 'indexName');
    if (indexName) {
      config['indexName'] = indexName;
    }

    return config;
  }

  override getDependencies(): string[] {
    return [
      '@langchain/community/vectorstores/pinecone',
      '@pinecone-database/pinecone',
    ];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Chroma Vector Store Converter
 */
export class ChromaConverter extends BaseVectorStoreConverter {
  readonly flowiseType = 'chroma';

  protected override getRequiredImports(): string[] {
    return ['Chroma'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/vectorstores/chroma';
  }

  protected override getClassName(): string {
    return 'Chroma';
  }

  protected override extractVectorStoreConfig(
    _node: IRNode
  ): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const url = this.getParameterValue(_node, 'url', 'http://localhost:8000');
    config['url'] = url;

    const collectionName = this.getParameterValue(_node, 'collectionName');
    if (collectionName) {
      config['collectionName'] = collectionName;
    }

    const collectionMetadata = this.getParameterValue(
      _node,
      'collectionMetadata'
    );
    if (collectionMetadata) {
      config['collectionMetadata'] = collectionMetadata;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/vectorstores/chroma', 'chromadb'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * FAISS Vector Store Converter
 */
export class FAISSConverter extends BaseVectorStoreConverter {
  readonly flowiseType = 'faiss';

  protected override getRequiredImports(): string[] {
    return ['FaissStore'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/vectorstores/faiss';
  }

  protected override getClassName(): string {
    return 'FaissStore';
  }

  protected override extractVectorStoreConfig(
    _node: IRNode
  ): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const directory = this.getParameterValue(_node, 'directory');
    if (directory) {
      config['directory'] = directory;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/vectorstores/faiss', 'faiss-node'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * MemoryVectorStore Converter
 */
export class MemoryVectorStoreConverter extends BaseVectorStoreConverter {
  readonly flowiseType = 'memoryVectorStore';

  protected override getRequiredImports(): string[] {
    return ['MemoryVectorStore'];
  }

  protected override getPackageName(): string {
    return 'langchain/vectorstores/memory';
  }

  protected override getClassName(): string {
    return 'MemoryVectorStore';
  }

  protected override extractVectorStoreConfig(
    _node: IRNode
  ): Record<string, unknown> {
    // MemoryVectorStore doesn't require configuration
    return {};
  }

  override getDependencies(): string[] {
    return ['langchain/vectorstores/memory'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Supabase Vector Store Converter
 */
export class SupabaseConverter extends BaseVectorStoreConverter {
  readonly flowiseType = 'supabase';

  protected override getRequiredImports(): string[] {
    return ['SupabaseVectorStore'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/vectorstores/supabase';
  }

  protected override getClassName(): string {
    return 'SupabaseVectorStore';
  }

  protected override extractVectorStoreConfig(
    _node: IRNode
  ): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const supabaseUrl = this.getParameterValue(_node, 'supabaseUrl');
    if (supabaseUrl) {
      config['supabaseUrl'] = supabaseUrl;
    } else {
      config['supabaseUrl'] = 'process.env.SUPABASE_URL';
    }

    const supabaseKey = this.getParameterValue(_node, 'supabaseKey');
    if (supabaseKey) {
      config['supabaseKey'] = supabaseKey;
    } else {
      config['supabaseKey'] = 'process.env.SUPABASE_SERVICE_ROLE_KEY';
    }

    const tableName = this.getParameterValue(_node, 'tableName', 'documents');
    config['tableName'] = tableName;

    return config;
  }

  override getDependencies(): string[] {
    return [
      '@langchain/community/vectorstores/supabase',
      '@supabase/supabase-js',
    ];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Weaviate Vector Store Converter
 */
export class WeaviateConverter extends BaseVectorStoreConverter {
  readonly flowiseType = 'weaviate';

  protected override getRequiredImports(): string[] {
    return ['WeaviateStore'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/vectorstores/weaviate';
  }

  protected override getClassName(): string {
    return 'WeaviateStore';
  }

  protected override extractVectorStoreConfig(
    _node: IRNode
  ): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Client configuration
    const scheme = this.getParameterValue(_node, 'scheme', 'https');
    const host = this.getParameterValue(_node, 'host', 'localhost:8080');

    config['client'] =
      `new WeaviateClient({ scheme: '${scheme}', host: '${host}' })`;

    // API Key (optional)
    const apiKey = this.getParameterValue(_node, 'apiKey');
    if (apiKey) {
      config['apiKey'] = apiKey;
    } else {
      // Only add apiKey to client config if it exists in environment
      config['client'] = `new WeaviateClient({ 
        scheme: '${scheme}', 
        host: '${host}',
        ...(process.env.WEAVIATE_API_KEY && { apiKey: process.env.WEAVIATE_API_KEY })
      })`;
    }

    // Index/Class name
    const indexName = this.getParameterValue(_node, 'indexName');
    if (indexName) {
      config['indexName'] = indexName;
    }

    // Text key for document content
    const textKey = this.getParameterValue(_node, 'textKey', 'text');
    config['textKey'] = textKey;

    // Metadata keys
    const metadataKeys = this.getParameterValue(_node, 'metadataKeys');
    if (metadataKeys) {
      if (Array.isArray(metadataKeys)) {
        config['metadataKeys'] = metadataKeys;
      } else if (typeof metadataKeys === 'string') {
        // Parse comma-separated string
        config['metadataKeys'] = metadataKeys
          .split(',')
          .map((key) => key.trim());
      }
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/vectorstores/weaviate', 'weaviate-ts-client'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }

  // Override to handle custom client initialization
  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'vectorstore');
    const config = this.generateVectorStoreConfiguration(node, context);
    const fragments: CodeFragment[] = [];

    // Import fragments - need both WeaviateStore and client
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

    // Add client import
    fragments.push(
      this.createCodeFragment(
        `${node.id}_client_import`,
        'import',
        "import { weaviate } from 'weaviate-ts-client';",
        ['weaviate-ts-client'],
        node.id,
        2
      )
    );

    // Client initialization
    const clientConfig = config.config['client'];
    const clientVarName = `${variableName}Client`;
    fragments.push(
      this.createCodeFragment(
        `${node.id}_client_init`,
        'initialization',
        `const ${clientVarName} = weaviate.client(${clientConfig});`,
        ['weaviate'],
        node.id,
        140
      )
    );

    // Vector store configuration without client
    const vectorStoreConfig = { ...config.config };
    delete vectorStoreConfig['client'];
    vectorStoreConfig['client'] = clientVarName;

    const configStr = this.generateConfigurationString(vectorStoreConfig);
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
        150
      )
    );

    return fragments;
  }
}

/**
 * Qdrant Vector Store Converter
 */
export class QdrantConverter extends BaseVectorStoreConverter {
  readonly flowiseType = 'qdrant';

  protected override getRequiredImports(): string[] {
    return ['QdrantVectorStore'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/vectorstores/qdrant';
  }

  protected override getClassName(): string {
    return 'QdrantVectorStore';
  }

  protected override extractVectorStoreConfig(
    _node: IRNode
  ): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // URL configuration with default
    const url = this.getParameterValue(_node, 'url', 'http://localhost:6333');
    config['url'] = url;

    // API key configuration (optional, from environment variable if not provided)
    const apiKey = this.getParameterValue(_node, 'apiKey');
    if (apiKey) {
      config['apiKey'] = apiKey;
    } else {
      // Only add apiKey to config if it should be used from environment
      const useApiKey = this.getParameterValue(_node, 'useApiKey', false);
      if (useApiKey) {
        config['apiKey'] = 'process.env.QDRANT_API_KEY';
      }
    }

    // Collection name
    const collectionName = this.getParameterValue(_node, 'collectionName');
    if (collectionName) {
      config['collectionName'] = collectionName;
    }

    // Content payload key
    const contentPayloadKey = this.getParameterValue(
      _node,
      'contentPayloadKey',
      'page_content'
    );
    config['contentPayloadKey'] = contentPayloadKey;

    // Metadata payload key
    const metadataPayloadKey = this.getParameterValue(
      _node,
      'metadataPayloadKey',
      'metadata'
    );
    config['metadataPayloadKey'] = metadataPayloadKey;

    // Collection configuration for distance metric and vector size
    const distanceMetric = this.getParameterValue(
      _node,
      'distanceMetric',
      'Cosine'
    );
    const vectorSize = this.getParameterValue(_node, 'vectorSize', 1536);

    if (distanceMetric || vectorSize) {
      const collectionConfig: Record<string, unknown> = {
        vectors: {
          size: vectorSize,
          distance: distanceMetric,
        },
      };
      config['collectionConfig'] = collectionConfig;
    }

    return config;
  }

  override getDependencies(): string[] {
    return [
      '@langchain/community/vectorstores/qdrant',
      '@qdrant/js-client-rest',
    ];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}
