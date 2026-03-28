/**
 * Chain Converters
 *
 * Converters for various chain types including LLMChain, ConversationChain,
 * RetrievalQAChain, and other chain types.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Chain converter with common functionality
 */
abstract class BaseChainConverter extends BaseConverter {
  readonly category = 'chain';

  protected generateChainConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
    _inputVariables: string[];
  } {
    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config: this.extractChainConfig(node),
      _inputVariables: this.getInputVariables(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractChainConfig(node: IRNode): Record<string, unknown>;

  protected getInputVariables(node: IRNode): string[] {
    // Look for connected nodes to determine input variables
    const inputVariables: string[] = [];

    // Check for LLM input
    const llmInput = node.inputs?.find((port) => port.dataType === 'llm');
    if (llmInput) {
      inputVariables.push('llm');
    }

    // Check for prompt input
    const promptInput = node.inputs?.find((port) => port.dataType === 'prompt');
    if (promptInput) {
      inputVariables.push('prompt');
    }

    // Check for memory input
    const memoryInput = node.inputs?.find((port) => port.dataType === 'memory');
    if (memoryInput) {
      inputVariables.push('memory');
    }

    return inputVariables;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'chain');
    const config = this.generateChainConfiguration(node, _context);
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

    // Generate the chain instantiation
    const instantiation = this.generateChainInstantiation(
      variableName,
      config.className,
      config.config,
      config._inputVariables
    );

    // Declaration fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_declaration`,
        'declaration',
        instantiation,
        [],
        node.id,
        2,
        {
          exports: [variableName],
          inputVariables: config._inputVariables,
        }
      )
    );

    return fragments;
  }

  protected generateChainInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>,
    _inputVariables: string[]
  ): string {
    const configLines: string[] = [];

    // Add input references (these will be populated by connection resolution)
    for (const inputVar of _inputVariables) {
      configLines.push(`  ${inputVar}: ${inputVar}`);
    }

    // Add other configuration
    Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        configLines.push(`  ${key}: ${this.formatParameterValue(value)}`);
      });

    const configStr = configLines.join(',\n');

    return `const ${variableName} = new ${className}({\n${configStr}\n});`;
  }
}

/**
 * LLM Chain Converter
 */
export class LLMChainConverter extends BaseChainConverter {
  readonly flowiseType = 'llmChain';

  protected override getRequiredImports(): string[] {
    return ['LLMChain'];
  }

  protected getPackageName(): string {
    return '@langchain/core/chains';
  }

  protected getClassName(): string {
    return 'LLMChain';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const outputKey = this.getParameterValue<string>(node, 'outputKey', 'text');
    const returnValues = this.getParameterValue<string[]>(node, 'returnValues');
    const verbose = this.getParameterValue<boolean>(node, 'verbose', false);

    return {
      outputKey,
      verbose,
      ...(returnValues && returnValues.length > 0 && { returnValues }),
    };
  }
}

/**
 * Conversation Chain Converter
 */
export class ConversationChainConverter extends BaseChainConverter {
  readonly flowiseType = 'conversationChain';

  protected override getRequiredImports(): string[] {
    return ['ConversationChain'];
  }

  protected getPackageName(): string {
    return '@langchain/core/chains';
  }

  protected getClassName(): string {
    return 'ConversationChain';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const outputKey = this.getParameterValue<string>(
      node,
      'outputKey',
      'response'
    );
    const inputKey = this.getParameterValue<string>(node, 'inputKey', 'input');
    const verbose = this.getParameterValue<boolean>(node, 'verbose', false);

    return {
      outputKey,
      inputKey,
      verbose,
    };
  }
}

/**
 * Retrieval QA Chain Converter
 */
export class RetrievalQAChainConverter extends BaseChainConverter {
  readonly flowiseType = 'retrievalQAChain';

  protected override getRequiredImports(): string[] {
    return ['RetrievalQAChain'];
  }

  protected getPackageName(): string {
    return '@langchain/core/chains';
  }

  protected getClassName(): string {
    return 'RetrievalQAChain';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const chainType = this.getParameterValue<string>(
      node,
      'chainType',
      'stuff'
    );
    const returnSourceDocuments = this.getParameterValue<boolean>(
      node,
      'returnSourceDocuments',
      false
    );
    const verbose = this.getParameterValue<boolean>(node, 'verbose', false);

    return {
      chainType,
      returnSourceDocuments,
      verbose,
    };
  }

  protected override getInputVariables(node: IRNode): string[] {
    const baseVars = super.getInputVariables(node);

    // RetrievalQA also needs a retriever
    const retrieverInput = node.inputs?.find(
      (port) => port.dataType === 'retriever'
    );
    if (retrieverInput) {
      baseVars.push('retriever');
    }

    return baseVars;
  }
}

/**
 * Multi Prompt Chain Converter
 */
export class MultiPromptChainConverter extends BaseChainConverter {
  readonly flowiseType = 'multiPromptChain';

  protected override getRequiredImports(): string[] {
    return ['MultiPromptChain'];
  }

  protected getPackageName(): string {
    return '@langchain/core/chains';
  }

  protected getClassName(): string {
    return 'MultiPromptChain';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const routerChain = this.getParameterValue<string>(node, 'routerChain');
    const destinationChains = this.getParameterValue<Record<string, unknown>>(
      node,
      'destinationChains',
      {}
    );
    const defaultChain = this.getParameterValue<string>(node, 'defaultChain');
    const verbose = this.getParameterValue<boolean>(node, 'verbose', false);

    return {
      destinationChains,
      verbose,
      ...(routerChain && { routerChain }),
      ...(defaultChain && { defaultChain }),
    };
  }
}

/**
 * Sequential Chain Converter
 */
export class SequentialChainConverter extends BaseChainConverter {
  readonly flowiseType = 'sequentialChain';

  protected override getRequiredImports(): string[] {
    return ['SequentialChain'];
  }

  protected getPackageName(): string {
    return '@langchain/core/chains';
  }

  protected getClassName(): string {
    return 'SequentialChain';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const chains = this.getParameterValue<unknown[]>(node, 'chains', []);
    const inputVariables = this.getParameterValue<string[]>(
      node,
      'inputVariables',
      ['input']
    );
    const outputVariables = this.getParameterValue<string[]>(
      node,
      'outputVariables'
    );
    const verbose = this.getParameterValue<boolean>(node, 'verbose', false);

    return {
      chains,
      _inputVariables: inputVariables,
      verbose,
      ...(outputVariables && { outputVariables }),
    };
  }
}

/**
 * Transform Chain Converter
 */
export class TransformChainConverter extends BaseChainConverter {
  readonly flowiseType = 'transformChain';

  protected override getRequiredImports(): string[] {
    return ['TransformChain'];
  }

  protected getPackageName(): string {
    return '@langchain/core/chains';
  }

  protected getClassName(): string {
    return 'TransformChain';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const transform = this.getParameterValue<string>(node, 'transform');
    const inputVariables = this.getParameterValue<string[]>(
      node,
      'inputVariables',
      ['input']
    );
    const outputVariables = this.getParameterValue<string[]>(
      node,
      'outputVariables',
      ['output']
    );

    return {
      _inputVariables: inputVariables,
      outputVariables,
      ...(transform && {
        transform: `(${transform})`, // Assume transform is a function string
      }),
    };
  }

  protected override generateChainInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>,
    _inputVariables: string[]
  ): string {
    const configLines: string[] = [];

    // Handle the transform function specially
    Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        if (key === 'transform') {
          configLines.push(`  ${key}: ${value}`); // Don't quote the function
        } else {
          configLines.push(`  ${key}: ${this.formatParameterValue(value)}`);
        }
      });

    const configStr = configLines.join(',\n');

    return `const ${variableName} = new ${className}({\n${configStr}\n});`;
  }
}

/**
 * Map Reduce Chain Converter
 */
export class MapReduceChainConverter extends BaseChainConverter {
  readonly flowiseType = 'mapReduceChain';

  protected override getRequiredImports(): string[] {
    return ['MapReduceChain'];
  }

  protected getPackageName(): string {
    return '@langchain/core/chains';
  }

  protected getClassName(): string {
    return 'MapReduceChain';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const mapChain = this.getParameterValue<string>(node, 'mapChain');
    const reduceChain = this.getParameterValue<string>(node, 'reduceChain');
    const inputKey = this.getParameterValue<string>(node, 'inputKey', 'input');
    const outputKey = this.getParameterValue<string>(
      node,
      'outputKey',
      'output'
    );
    const verbose = this.getParameterValue<boolean>(node, 'verbose', false);

    return {
      inputKey,
      outputKey,
      verbose,
      ...(mapChain && { mapChain }),
      ...(reduceChain && { reduceChain }),
    };
  }

  protected override getInputVariables(node: IRNode): string[] {
    const baseVars = super.getInputVariables(node);

    // Map-reduce chains might have specific chain inputs
    baseVars.push('mapChain', 'reduceChain');

    return baseVars;
  }
}

/**
 * API Chain Converter
 */
export class APIChainConverter extends BaseChainConverter {
  readonly flowiseType = 'apiChain';

  protected getRequiredImports(): string[] {
    return ['APIChain'];
  }

  protected getPackageName(): string {
    return 'langchain/chains';
  }

  protected getClassName(): string {
    return 'APIChain';
  }

  override getDependencies(): string[] {
    return ['langchain'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const apiDocumentation = this.getParameterValue<string>(
      node,
      'apiDocumentation'
    );
    const baseUrl = this.getParameterValue<string>(node, 'baseUrl');
    const headers = this.getParameterValue<Record<string, string>>(
      node,
      'headers',
      {}
    );
    const inputKey = this.getParameterValue<string>(
      node,
      'inputKey',
      'question'
    );
    const outputKey = this.getParameterValue<string>(node, 'outputKey', 'text');
    const method = this.getParameterValue<string>(node, 'method', 'GET');
    const verbose = this.getParameterValue<boolean>(node, 'verbose', false);

    const config: Record<string, unknown> = {
      inputKey,
      outputKey,
      verbose,
    };

    // Add API documentation if provided
    if (apiDocumentation) {
      config.apiDocs = apiDocumentation;
    }

    // Add base URL if provided
    if (baseUrl) {
      config.baseUrl = baseUrl;
    }

    // Add HTTP method if not default
    if (method && method.toUpperCase() !== 'GET') {
      config.method = method.toUpperCase();
    }

    // Add headers if provided and not empty
    if (headers && Object.keys(headers).length > 0) {
      config.headers = headers;
    }

    return config;
  }

  protected override generateChainInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>,
    _inputVariables: string[]
  ): string {
    const configLines: string[] = [];

    // Add input references (these will be populated by connection resolution)
    for (const inputVar of _inputVariables) {
      configLines.push(`  ${inputVar}: ${inputVar}`);
    }

    // Handle special configuration for APIChain
    Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        if (key === 'apiDocs' && typeof value === 'string') {
          // API documentation might be a string that needs special handling
          configLines.push(`  ${key}: \`${value}\``);
        } else {
          configLines.push(`  ${key}: ${this.formatParameterValue(value)}`);
        }
      });

    const configStr = configLines.join(',\n');

    return `const ${variableName} = new ${className}({\n${configStr}\n});`;
  }
}

/**
 * SQL Database Chain Converter
 * Converts Flowise SQL database chain nodes to LangChain SQL database implementations
 */
export class SQLDatabaseChainConverter extends BaseChainConverter {
  readonly flowiseType = 'sqlDatabaseChain';

  protected override getRequiredImports(): string[] {
    return ['SqlDatabaseChain'];
  }

  protected getPackageName(): string {
    return 'langchain/chains/sql_db';
  }

  protected getClassName(): string {
    return 'SqlDatabaseChain';
  }

  override getDependencies(): string[] {
    return ['langchain', 'typeorm'];
  }

  protected extractChainConfig(node: IRNode): Record<string, unknown> {
    const topK = this.getParameterValue<number>(node, 'topK', 5);
    const returnIntermediateSteps = this.getParameterValue<boolean>(
      node,
      'returnIntermediateSteps',
      false
    );
    const returnDirect = this.getParameterValue<boolean>(
      node,
      'returnDirect',
      false
    );
    const verbose = this.getParameterValue<boolean>(node, 'verbose', false);

    return {
      topK,
      returnIntermediateSteps,
      returnDirect,
      verbose,
    };
  }

  protected override getInputVariables(node: IRNode): string[] {
    const baseVars = super.getInputVariables(node);

    // SQL Database chains need database and llm
    const databaseInput = node.inputs?.find(
      (port) => port.dataType === 'database' || port.dataType === 'sqlDatabase'
    );
    if (databaseInput) {
      baseVars.push('database');
    }

    return baseVars;
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'sql_chain');
    const config = this.generateChainConfiguration(node, context);
    const fragments: CodeFragment[] = [];

    // Get database configuration parameters
    const databaseType = this.getParameterValue<string>(
      node,
      'databaseType',
      'sqlite'
    );
    const connectionString = this.getParameterValue<string>(
      node,
      'connectionString',
      ''
    );
    const includeTables = this.getParameterValue<string[]>(
      node,
      'includeTables',
      []
    );
    const sampleRows = this.getParameterValue<number>(node, 'sampleRows', 3);

    // Import fragments for SQL database functionality
    fragments.push(
      this.createCodeFragment(
        `${node.id}_import_sql`,
        'import',
        this.generateImport('langchain/chains/sql_db', ['SqlDatabaseChain']),
        ['langchain'],
        node.id,
        1
      )
    );

    fragments.push(
      this.createCodeFragment(
        `${node.id}_import_sql_db`,
        'import',
        this.generateImport('langchain/sql_db', ['SqlDatabase']),
        ['langchain'],
        node.id,
        2
      )
    );

    fragments.push(
      this.createCodeFragment(
        `${node.id}_import_typeorm`,
        'import',
        this.generateImport('typeorm', ['DataSource']),
        ['typeorm'],
        node.id,
        3
      )
    );

    // Database setup and configuration
    const databaseSetup = this.generateDatabaseSetup(
      databaseType || '',
      connectionString || '',
      includeTables || [],
      sampleRows || 5
    );

    fragments.push(
      this.createCodeFragment(
        `${node.id}_database_setup`,
        'initialization',
        databaseSetup,
        [],
        node.id,
        4
      )
    );

    // Generate the SQL chain instantiation with database connection
    const chainInstantiation = this.generateSQLChainInstantiation(
      variableName,
      config.config,
      config._inputVariables
    );

    fragments.push(
      this.createCodeFragment(
        `${node.id}_chain_declaration`,
        'declaration',
        chainInstantiation,
        [],
        node.id,
        5,
        {
          exports: [variableName],
          inputVariables: config._inputVariables,
        }
      )
    );

    return fragments;
  }

  private generateDatabaseSetup(
    databaseType: string,
    connectionString: string,
    includeTables: string[],
    sampleRows: number
  ): string {
    const connectionConfig = this.generateConnectionConfig(
      databaseType,
      connectionString
    );

    return `// Database configuration
const dataSource = new DataSource(${connectionConfig});

// Initialize database connection
await dataSource.initialize();

// Create SQL database instance
const database = await SqlDatabase.fromDataSourceParams({
  appDataSource: dataSource,${
    includeTables.length > 0
      ? `
  includesTables: ${this.formatParameterValue(includeTables)},`
      : ''
  }
  sampleRowsInTableInfo: ${sampleRows}
});`;
  }

  private generateConnectionConfig(
    databaseType: string,
    connectionString: string
  ): string {
    if (connectionString) {
      return `{
  type: "${databaseType}" as const,
  url: "${connectionString}",
  synchronize: false,
  logging: false
}`;
    }

    // Generate default configuration based on database type
    switch (databaseType.toLowerCase()) {
      case 'sqlite':
        return `{
  type: "sqlite" as const,
  database: ":memory:",
  synchronize: false,
  logging: false
}`;
      case 'postgres':
      case 'postgresql':
        return `{
  type: "postgres" as const,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "postgres",
  synchronize: false,
  logging: false
}`;
      case 'mysql':
        return `{
  type: "mysql" as const,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mysql",
  synchronize: false,
  logging: false
}`;
      default:
        return `{
  type: "${databaseType}" as const,
  // Configure your database connection parameters
  synchronize: false,
  logging: false
}`;
    }
  }

  private generateSQLChainInstantiation(
    variableName: string,
    config: Record<string, unknown>,
    _inputVariables: string[]
  ): string {
    const configLines: string[] = [];

    // Add LLM reference
    if (_inputVariables.includes('llm')) {
      configLines.push(`  llm: llm`);
    }

    // Add database reference
    configLines.push(`  database: database`);

    // Add other configuration options
    Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        configLines.push(`  ${key}: ${this.formatParameterValue(value)}`);
      });

    const configStr = configLines.join(',\n');

    return `const ${variableName} = new SqlDatabaseChain({
${configStr}
});`;
  }
}
