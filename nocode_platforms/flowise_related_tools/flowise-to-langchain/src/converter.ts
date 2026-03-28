/**
 * High-Level Converter Pipeline
 *
 * This module provides a simplified, high-level interface for converting
 * Flowise flows to LangChain code with sensible defaults and error handling.
 */

import {
  FlowiseToLangChainConverter,
  type ConversionMetrics,
} from './index.js';
import { writeFile, mkdir } from 'fs/promises';
import { dirname, resolve, join } from 'path';
import { Logger } from './cli/utils/logger.js';
import type {
  CodeGenerationResult,
  GenerationContext,
  FlowiseChatFlow,
} from './ir/types.js';

/**
 * Conversion options for the high-level pipeline
 */
export interface ConversionOptions {
  /** Output directory for generated files */
  outputPath?: string;

  /** Include LangFuse tracing integration */
  includeLangfuse?: boolean;

  /** Target language/format (currently only 'typescript') */
  target?: 'typescript';

  /** Output module format */
  outputFormat?: 'esm' | 'cjs';

  /** Include detailed comments in generated code */
  includeComments?: boolean;

  /** Overwrite existing files */
  overwrite?: boolean;

  /** Verbose logging */
  verbose?: boolean;

  /** Silent mode (errors only) */
  silent?: boolean;

  /** Additional generation context */
  context?: Partial<GenerationContext>;
}

/**
 * Conversion result with file paths and metrics
 */
export interface ConversionResult {
  /** Whether conversion was successful */
  success: boolean;

  /** Generated files with their paths */
  files: Array<{
    path: string;
    relativePath: string;
    size: number;
    type: 'main' | 'types' | 'config' | 'test';
  }>;

  /** Conversion errors */
  errors: string[];

  /** Conversion warnings */
  warnings: string[];

  /** Performance and analysis metrics */
  metrics: ConversionMetrics & {
    totalFiles: number;
    totalBytes: number;
    analysisTime: number;
    generationTime: number;
    ioTime: number;
  };

  /** Analysis of the converted flow */
  analysis: {
    nodeCount: number;
    connectionCount: number;
    supportedTypes: string[];
    unsupportedTypes: string[];
    coverage: number;
    complexity: 'simple' | 'moderate' | 'complex';
  };
}

/**
 * High-level converter pipeline with file I/O and error handling
 */
export class ConverterPipeline {
  private converter: FlowiseToLangChainConverter;
  private logger: Logger;

  constructor(options: Pick<ConversionOptions, 'verbose' | 'silent'> = {}) {
    this.logger = new Logger();

    this.converter = new FlowiseToLangChainConverter({
      verbose: options.verbose || false,
      silent: options.silent || false,
    });
  }

  /**
   * Convert a Flowise flow file to LangChain code with file output
   */
  async convertFile(
    inputPath: string,
    options: ConversionOptions = {}
  ): Promise<ConversionResult> {
    const startTime = Date.now();
    this.logger.info(`Converting file: ${inputPath}`);

    try {
      // Read input file
      const { readFile } = await import('fs/promises');
      const inputContent = await readFile(inputPath, 'utf-8');
      this.logger.debug('Input file loaded');

      return await this.convertContent(inputContent, options);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error('File conversion failed: ' + err.message);

      return {
        success: false,
        files: [],
        errors: [err.message],
        warnings: [],
        metrics: this.createExtendedMetrics(startTime, 'file_error'),
        analysis: this.createEmptyAnalysis(),
      };
    }
  }

  /**
   * Convert Flowise JSON content to LangChain code
   */
  async convertContent(
    input: string | FlowiseChatFlow,
    options: ConversionOptions = {}
  ): Promise<ConversionResult> {
    const startTime = Date.now();
    const analysisStart = Date.now();

    try {
      // Build generation context
      const baseContext: Partial<GenerationContext> = {
        targetLanguage:
          (options.target as 'typescript' | 'python') || 'typescript',
        includeLangfuse: options.includeLangfuse || false,
        outputPath: '',
        projectName: 'converted-flow',
        includeTests: false,
        includeDocs: false,
        packageManager: 'npm',
        environment: {},
        codeStyle: {
          indentSize: 2,
          useSpaces: true,
          semicolons: true,
          singleQuotes: true,
          trailingCommas: true,
        },
      };

      const context = {
        ...baseContext,
        ...options.context,
      };

      this.logger.debug('Starting conversion with context:', context);

      // Perform conversion
      const analysisTime = Date.now() - analysisStart;
      const generationStart = Date.now();

      const result = await this.converter.convert(
        input,
        context as GenerationContext
      );
      const generationTime = Date.now() - generationStart;

      if (!result.success || !result.result) {
        return {
          success: false,
          files: [],
          errors: result.errors,
          warnings: result.warnings,
          metrics: this.createExtendedMetrics(startTime, 'conversion_error', {
            analysisTime,
            generationTime,
            ioTime: 0,
          }),
          analysis: this.createEmptyAnalysis(),
        };
      }

      // Write files if output path is specified
      const ioStart = Date.now();
      const files = options.outputPath
        ? await this.writeFiles(
            result.result,
            options.outputPath,
            options.overwrite || false
          )
        : [];
      const ioTime = Date.now() - ioStart;

      // Get analysis
      const validation = await this.converter.validate(input);
      const analysis = validation.analysis || this.createEmptyAnalysis();

      this.logger.info(`Conversion completed: ${files.length} files generated`);

      return {
        success: true,
        files,
        errors: result.errors,
        warnings: result.warnings,
        metrics: this.createExtendedMetrics(startTime, 'success', {
          analysisTime,
          generationTime,
          ioTime,
          totalFiles: files.length,
          totalBytes: files.reduce((sum, f) => sum + f.size, 0),
        }),
        analysis: {
          ...analysis,
          complexity: this.calculateComplexity(
            analysis.nodeCount,
            analysis.connectionCount
          ),
        },
      };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error('Content conversion failed: ' + err.message);

      return {
        success: false,
        files: [],
        errors: [err.message],
        warnings: [],
        metrics: this.createExtendedMetrics(startTime, 'error'),
        analysis: this.createEmptyAnalysis(),
      };
    }
  }

  /**
   * Validate a Flowise flow without conversion
   */
  async validate(input: string | FlowiseChatFlow): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    analysis: ConversionResult['analysis'];
  }> {
    try {
      const result = await this.converter.validate(input);
      const analysis = result.analysis || this.createEmptyAnalysis();

      return {
        isValid: result.isValid,
        errors: result.errors,
        warnings: result.warnings,
        analysis: {
          ...analysis,
          complexity: this.calculateComplexity(
            analysis.nodeCount,
            analysis.connectionCount
          ),
        },
      };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return {
        isValid: false,
        errors: [err.message],
        warnings: [],
        analysis: this.createEmptyAnalysis(),
      };
    }
  }

  /**
   * Get converter capabilities and statistics
   */
  async getInfo(): Promise<{
    totalConverters: number;
    supportedTypes: string[];
    categories: Record<string, number>;
    aliases: Record<string, string>;
    version: string;
  }> {
    const capabilities = await this.converter.getCapabilities();

    // Get version from package.json
    const { readFile } = await import('fs/promises');
    const { fileURLToPath } = await import('url');
    const { dirname, join } = await import('path');

    try {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const packagePath = join(__dirname, '../package.json');
      const packageContent = await readFile(packagePath, 'utf-8');
      const packageJson = JSON.parse(packageContent);

      return {
        ...capabilities,
        version: packageJson.version || '1.0.0',
      };
    } catch {
      return {
        ...capabilities,
        version: '1.0.0',
      };
    }
  }

  /**
   * Write generated files to disk
   */
  private async writeFiles(
    codeResult: CodeGenerationResult,
    outputPath: string,
    overwrite: boolean
  ): Promise<ConversionResult['files']> {
    const files: ConversionResult['files'] = [];
    const outputDir = resolve(outputPath);

    this.logger.debug(
      `Writing ${codeResult.files.length} files to ${outputDir}`
    );

    // Create output directory
    await mkdir(outputDir, { recursive: true });

    for (const file of codeResult.files) {
      const filePath = join(outputDir, file.path);
      const fileDir = dirname(filePath);

      // Create subdirectories if needed
      await mkdir(fileDir, { recursive: true });

      // Check if file exists and overwrite is false
      if (!overwrite) {
        try {
          const { access } = await import('fs/promises');
          await access(filePath);
          this.logger.warn(`File exists, skipping: ${file.path}`);
          continue;
        } catch {
          // File doesn't exist, proceed with writing
        }
      }

      // Write the file
      await writeFile(filePath, file.content, 'utf-8');
      const size = Buffer.byteLength(file.content, 'utf-8');

      files.push({
        path: filePath,
        relativePath: file.path,
        size,
        type: this.getFileType(file.path),
      });

      this.logger.debug(`Written: ${file.path} (${size} bytes)`);
    }

    return files;
  }

  /**
   * Determine file type based on path
   */
  private getFileType(filePath: string): ConversionResult['files'][0]['type'] {
    if (filePath.includes('test') || filePath.includes('spec')) {
      return 'test';
    }
    if (filePath.includes('types') || filePath.includes('.d.ts')) {
      return 'types';
    }
    if (filePath.includes('config') || filePath.includes('.config.')) {
      return 'config';
    }
    return 'main';
  }

  /**
   * Calculate complexity based on node and connection counts
   */
  private calculateComplexity(
    nodeCount: number,
    connectionCount: number
  ): 'simple' | 'moderate' | 'complex' {
    const totalElements = nodeCount + connectionCount;

    if (totalElements <= 5) return 'simple';
    if (totalElements <= 15) return 'moderate';
    return 'complex';
  }

  /**
   * Create extended metrics object
   */
  private createExtendedMetrics(
    startTime: number,
    status: string,
    additional: Partial<ConversionResult['metrics']> = {}
  ): ConversionResult['metrics'] {
    return {
      startTime,
      endTime: Date.now(),
      duration: Date.now() - startTime,
      status,
      totalFiles: 0,
      totalBytes: 0,
      analysisTime: 0,
      generationTime: 0,
      ioTime: 0,
      ...additional,
    };
  }

  /**
   * Create empty analysis object
   */
  private createEmptyAnalysis(): ConversionResult['analysis'] {
    return {
      nodeCount: 0,
      connectionCount: 0,
      supportedTypes: [],
      unsupportedTypes: [],
      coverage: 0,
      complexity: 'simple',
    };
  }
}

/**
 * Quick conversion utility functions
 */

/**
 * Convert a Flowise file to LangChain code
 */
export async function convertFile(
  inputPath: string,
  outputPath: string,
  options: Omit<ConversionOptions, 'outputPath'> = {}
): Promise<ConversionResult> {
  const pipeline = new ConverterPipeline(options);
  return await pipeline.convertFile(inputPath, { ...options, outputPath });
}

/**
 * Convert Flowise JSON content to LangChain code
 */
export async function convertContent(
  content: string | FlowiseChatFlow,
  options: ConversionOptions = {}
): Promise<ConversionResult> {
  const pipeline = new ConverterPipeline(options);
  return await pipeline.convertContent(content, options);
}

/**
 * Validate a Flowise flow
 */
export async function validateFlow(input: string | FlowiseChatFlow): Promise<{
  isValid: boolean;
  errors: string[];
  warnings: string[];
  analysis: ConversionResult['analysis'];
}> {
  const pipeline = new ConverterPipeline();
  return await pipeline.validate(input);
}

/**
 * Get converter information
 */
export async function getConverterInfo(): Promise<{
  totalConverters: number;
  supportedTypes: string[];
  categories: Record<string, number>;
  aliases: Record<string, string>;
  version: string;
}> {
  const pipeline = new ConverterPipeline();
  return await pipeline.getInfo();
}

// Export the pipeline class as default
export default ConverterPipeline;
