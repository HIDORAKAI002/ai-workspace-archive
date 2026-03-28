/**
 * Flowise to LangChain Converter - Main Integration Pipeline
 *
 * This is the main entry point that orchestrates the complete conversion pipeline:
 * Flowise JSON → Parser → IR → Registry → Code Emitter → TypeScript/LangChain Code
 */

// Core module exports (selective to avoid conflicts)
export { FlowiseParser, parseFlowiseJson } from './parser/index.js';
export { IRProcessor, createIRProcessor } from './ir/index.js';
export { ConverterRegistry, createRegistry } from './registry/index.js';
export {
  TypeScriptEmitter,
  createTypeScriptEmitter,
} from './emitters/typescript/index.js';
export { createCli } from './cli/index.js';

// Type exports
export type {
  FlowiseChatFlow,
  FlowiseNode,
  FlowiseEdge,
  IRGraph,
  IRNode,
  GenerationContext,
  CodeGenerationResult,
  ValidationResult,
} from './ir/types.js';

// Import main components for pipeline
import { parseFlowiseJson, type FlowiseChatFlow } from './parser/index.js';
import { IRProcessor, type GenerationContext } from './ir/index.js';
import { initializeRegistry, ConverterFactory } from './registry/index.js';
import { type CodeGenerationResult } from './emitters/typescript/index.js';
import { Logger } from './cli/utils/logger.js';

// Types are automatically exported via "export * from" statements above

/**
 * Main conversion pipeline that integrates all components
 */
export class FlowiseToLangChainConverter {
  private irProcessor: IRProcessor;
  private logger: Logger;
  private initialized: boolean = false;

  constructor(
    _options: {
      verbose?: boolean;
      silent?: boolean;
    } = {}
  ) {
    this.logger = new Logger();

    this.irProcessor = new IRProcessor();
  }

  /**
   * Initialize the converter by setting up the registry
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.logger.info('Initializing Flowise to LangChain converter...');

    try {
      // Initialize the converter registry with all built-in converters
      initializeRegistry();
      this.logger.debug('Registry initialized with built-in converters');

      // Verify registry is properly set up
      const registry = ConverterFactory.getRegistry();
      const stats = registry.getStatistics();
      this.logger.info(
        `Registry ready: ${stats.totalConverters} converters, ${stats.totalAliases} aliases`
      );

      this.initialized = true;
      this.logger.info('Converter initialization complete');
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error('Failed to initialize converter:', {
        message: err.message,
      });
      throw new Error(`Converter initialization failed: ${err.message}`);
    }
  }

  /**
   * Convert Flowise JSON to LangChain TypeScript code
   */
  async convert(
    input: string | FlowiseChatFlow,
    context: Partial<GenerationContext> = {}
  ): Promise<{
    success: boolean;
    result?: CodeGenerationResult;
    errors: string[];
    warnings: string[];
    metrics: ConversionMetrics;
  }> {
    // Ensure converter is initialized
    await this.initialize();

    const startTime = Date.now();
    this.logger.info('Starting conversion pipeline...');

    try {
      // Step 1: Parse Flowise JSON
      this.logger.debug('Step 1: Parsing Flowise JSON...');
      const parseResult =
        typeof input === 'string'
          ? await parseFlowiseJson(input)
          : { success: true, data: input, errors: [], warnings: [] };

      if (!parseResult.success || !parseResult.data) {
        return {
          success: false,
          errors: parseResult.errors.map((e) => e.message),
          warnings: parseResult.warnings?.map((w) => w.message) || [],
          metrics: this.createMetrics(startTime, 'parse_failed'),
        };
      }

      this.logger.debug(
        `Parsed flow: ${parseResult.data.chatflow?.name || 'Unknown'}`
      );

      // Step 2: Transform to IR
      this.logger.debug(
        'Step 2: Transforming to Intermediate Representation...'
      );
      // The parser returns the full structure with nodes, edges, and chatflow metadata
      const flowData = parseResult.data as FlowiseChatFlow;
      const irResult = await this.irProcessor.processFlow(flowData as any, {
        targetLanguage: 'typescript',
        outputPath: './output',
        projectName: 'generated-langchain-app',
        includeTests: false,
        includeDocs: false,
        includeLangfuse: false,
        packageManager: 'npm',
        environment: {
          langchainVersion: '0.2.0',
        },
        codeStyle: {
          indentSize: 2,
          useSpaces: true,
          semicolons: true,
          singleQuotes: true,
          trailingCommas: true,
        },
        ...context,
      });

      this.logger.debug(
        `IR Graph: ${irResult.ir.nodes.length} nodes, ${irResult.ir.connections.length} connections`
      );

      // Step 3: Generate TypeScript code
      this.logger.debug('Step 3: Generating TypeScript code...');
      const codeResult = irResult.code;

      this.logger.info(`Conversion completed in ${Date.now() - startTime}ms`);

      return {
        success: true,
        result: codeResult,
        errors: [],
        warnings: parseResult.warnings?.map((w) => w.message) || [],
        metrics: this.createMetrics(startTime, 'success', {
          nodeCount: irResult.ir.nodes.length,
          connectionCount: irResult.ir.connections.length,
          fileCount: codeResult.files.length,
        }),
      };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error('Conversion failed:', { message: err.message });

      return {
        success: false,
        errors: [err.message],
        warnings: [],
        metrics: this.createMetrics(startTime, 'error'),
      };
    }
  }

  /**
   * Validate Flowise JSON without full conversion
   */
  async validate(input: string | FlowiseChatFlow): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    analysis?: {
      nodeCount: number;
      connectionCount: number;
      supportedTypes: string[];
      unsupportedTypes: string[];
      coverage: number;
    };
  }> {
    await this.initialize();

    try {
      // Parse the input
      const parseResult =
        typeof input === 'string'
          ? await parseFlowiseJson(input)
          : { success: true, data: input, errors: [], warnings: [] };

      if (!parseResult.success || !parseResult.data) {
        return {
          isValid: false,
          errors: parseResult.errors.map((e) => e.message),
          warnings: parseResult.warnings?.map((w) => w.message) || [],
        };
      }

      // Validate against IR
      const flowData = parseResult.data as FlowiseChatFlow;
      const validation = await this.irProcessor.validateFlow(flowData as any);

      // Check registry support
      const registry = ConverterFactory.getRegistry();
      const nodeTypes =
        (flowData as FlowiseChatFlow).nodes?.map(
          (node: any) => node.data?.name || node.type
        ) || [];
      const supportedTypes: string[] = [];
      const unsupportedTypes: string[] = [];

      for (const nodeType of nodeTypes) {
        if (registry.hasConverter(nodeType)) {
          supportedTypes.push(nodeType);
        } else {
          unsupportedTypes.push(nodeType);
        }
      }

      const coverage =
        nodeTypes.length > 0
          ? (supportedTypes.length / nodeTypes.length) * 100
          : 100;

      return {
        isValid: validation.isValid,
        errors: validation.errors.map((e) => e.message),
        warnings: validation.warnings.map((w) => w.message),
        analysis: {
          nodeCount: (flowData as FlowiseChatFlow).nodes?.length || 0,
          connectionCount: (flowData as FlowiseChatFlow).edges?.length || 0,
          supportedTypes: [...new Set(supportedTypes)],
          unsupportedTypes: [...new Set(unsupportedTypes)],
          coverage: Math.round(coverage * 100) / 100,
        },
      };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return {
        isValid: false,
        errors: [err.message],
        warnings: [],
      };
    }
  }

  /**
   * Get information about supported node types and converters
   */
  async getCapabilities(): Promise<{
    totalConverters: number;
    supportedTypes: string[];
    categories: Record<string, number>;
    aliases: Record<string, string>;
  }> {
    await this.initialize();

    const registry = ConverterFactory.getRegistry();
    const stats = registry.getStatistics();

    return {
      totalConverters: stats.totalConverters,
      supportedTypes: registry.getRegisteredTypes().sort(),
      categories: stats.convertersByCategory,
      aliases: registry.getRegisteredAliases(),
    };
  }

  /**
   * Create metrics object for conversion tracking
   */
  private createMetrics(
    startTime: number,
    status: string,
    data?: any
  ): ConversionMetrics {
    return {
      startTime,
      endTime: Date.now(),
      duration: Date.now() - startTime,
      status,
      ...data,
    };
  }
}

/**
 * Metrics interface for tracking conversion performance
 */
export interface ConversionMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  status: string;
  nodeCount?: number;
  connectionCount?: number;
  fileCount?: number;
}

/**
 * Quick conversion utility function
 */
export async function convertFlowiseToLangChain(
  input: string | FlowiseChatFlow,
  options: {
    outputPath?: string;
    context?: Partial<GenerationContext>;
    verbose?: boolean;
    silent?: boolean;
  } = {}
): Promise<{
  success: boolean;
  result?: CodeGenerationResult;
  errors: string[];
  warnings: string[];
  metrics: ConversionMetrics;
}> {
  const converter = new FlowiseToLangChainConverter({
    verbose: options.verbose,
    silent: options.silent,
  });

  return await converter.convert(input, options.context);
}

/**
 * Quick validation utility function
 */
export async function validateFlowiseJson(
  input: string | FlowiseChatFlow
): Promise<{
  isValid: boolean;
  errors: string[];
  warnings: string[];
  analysis?: {
    nodeCount: number;
    connectionCount: number;
    supportedTypes: string[];
    unsupportedTypes: string[];
    coverage: number;
  };
}> {
  const converter = new FlowiseToLangChainConverter();
  return await converter.validate(input);
}

/**
 * Get converter capabilities
 */
export async function getConverterCapabilities(): Promise<{
  totalConverters: number;
  supportedTypes: string[];
  categories: Record<string, number>;
  aliases: Record<string, string>;
}> {
  const converter = new FlowiseToLangChainConverter();
  return await converter.getCapabilities();
}

// Export the main converter class as default
export default FlowiseToLangChainConverter;
