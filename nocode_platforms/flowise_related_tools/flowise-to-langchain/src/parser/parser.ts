/**
 * Flowise JSON Parser Implementation
 *
 * This module provides robust parsing and validation of Flowise chatflow exports
 * with comprehensive error handling, version detection, and helpful error messages.
 */

import { z } from 'zod';
import {
  // FlowiseChatFlowSchema as _FlowiseChatFlowSchema, // Unused import
  // FlowiseChatFlowVersionedSchema as _FlowiseChatFlowVersionedSchema, // Unused import
  FlowiseChatFlowMinimalSchema,
  getValidationSchema,
  formatValidationErrors,
  type FlowiseChatFlow,
  type ValidationOptions,
} from './schema.js';

/**
 * Parse result interface
 */
export interface ParseResult<T = FlowiseChatFlow> {
  success: boolean;
  data?: T;
  errors: ParseError[];
  warnings: ParseWarning[];
  metadata: ParseMetadata;
}

/**
 * Parse error details
 */
export interface ParseError {
  type: 'validation' | 'syntax' | 'structure' | 'version' | 'network';
  message: string;
  path: string | undefined;
  line: number | undefined;
  column: number | undefined;
  code: string | undefined;
  suggestion: string | undefined;
}

/**
 * Parse warning details
 */
export interface ParseWarning {
  type: 'deprecated' | 'compatibility' | 'performance' | 'best_practice';
  message: string;
  path: string | undefined;
  suggestion: string | undefined;
}

/**
 * Parse metadata
 */
export interface ParseMetadata {
  sourceType: 'file' | 'string' | 'url' | 'buffer';
  sourceSize: number;
  parseTime: number;
  flowiseVersion: string | undefined;
  nodeCount: number;
  edgeCount: number;
  complexity: 'simple' | 'medium' | 'complex';
  hasMetadata: boolean;
  timestamp: number;
}

/**
 * Parser configuration options
 */
export interface ParserOptions extends ValidationOptions {
  /** Whether to include performance metadata */
  includeMetadata?: boolean;
  /** Maximum file size in bytes (default: 10MB) */
  maxFileSize?: number;
  /** Whether to auto-detect Flowise version */
  autoDetectVersion?: boolean;
  /** Custom preprocessing function */
  preprocessor?: (content: string) => string;
  /** Whether to include warnings in result */
  includeWarnings?: boolean;
  /** Timeout for URL fetching in milliseconds */
  fetchTimeout?: number;
}

/**
 * Required parser options (for internal use)
 */
interface RequiredParserOptions extends ValidationOptions {
  includeMetadata: boolean;
  maxFileSize: number;
  autoDetectVersion: boolean;
  preprocessor?: (content: string) => string;
  includeWarnings: boolean;
  fetchTimeout: number;
}

/**
 * Version detection result
 */
interface VersionDetectionResult {
  version: '1.x' | '2.x' | 'unknown';
  confidence: number;
  indicators: string[];
}

/**
 * Main Flowise JSON Parser class
 */
export class FlowiseParser {
  private options: RequiredParserOptions;

  constructor(options: ParserOptions = {}) {
    this.options = {
      strict: true,
      version: 'auto',
      minimal: false,
      includeMetadata: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      autoDetectVersion: true,
      includeWarnings: true,
      fetchTimeout: 30000, // 30 seconds
      errorFormatter: formatValidationErrors,
      ...options,
    };
  }

  /**
   * Parse Flowise JSON from string
   */
  async parseString(content: string): Promise<ParseResult> {
    const startTime = performance.now();
    const errors: ParseError[] = [];
    const warnings: ParseWarning[] = [];

    try {
      // Validate input size
      if (content.length > this.options.maxFileSize) {
        errors.push({
          type: 'structure',
          message: `Content size (${content.length} bytes) exceeds maximum allowed size (${this.options.maxFileSize} bytes)`,
          path: undefined,
          line: undefined,
          column: undefined,
          code: undefined,
          suggestion: 'Consider breaking down the flow into smaller components',
        });
        return this.createFailureResult(
          errors,
          warnings,
          startTime,
          'string',
          content.length
        );
      }

      // Preprocess content if preprocessor is provided
      const processedContent = this.options.preprocessor
        ? this.options.preprocessor(content)
        : content;

      // Parse JSON
      let jsonData: unknown;
      try {
        jsonData = JSON.parse(processedContent);
      } catch (error) {
        const syntaxError = error as SyntaxError;
        const match = syntaxError.message.match(/at position (\d+)/);
        const position = match ? parseInt(match[1] || '0', 10) : undefined;
        const lineInfo = position
          ? this.getLineColumnFromPosition(processedContent, position)
          : undefined;

        errors.push({
          type: 'syntax',
          message: `JSON syntax error: ${syntaxError.message}`,
          path: undefined,
          line: lineInfo?.line ?? 1,
          column: lineInfo?.column ?? 1,
          code: undefined,
          suggestion:
            'Ensure the JSON is properly formatted with matching brackets and quotes',
        });
        return this.createFailureResult(
          errors,
          warnings,
          startTime,
          'string',
          content.length
        );
      }

      // Detect version if auto-detection is enabled
      let detectedVersion = this.options.version;
      if (this.options.autoDetectVersion && this.options.version === 'auto') {
        const versionResult = this.detectFlowiseVersion(jsonData);
        detectedVersion =
          versionResult.version === 'unknown' ? 'auto' : versionResult.version;

        if (versionResult.confidence < 0.7) {
          warnings.push({
            type: 'compatibility',
            message: `Low confidence (${Math.round(versionResult.confidence * 100)}%) in version detection. Detected: ${versionResult.version}`,
            path: undefined,
            suggestion:
              'Consider specifying the version explicitly in parser options',
          });
        }
      }

      // Get appropriate schema
      const schema = getValidationSchema({
        ...this.options,
        version:
          this.options.version === 'auto'
            ? 'auto'
            : (detectedVersion as '1.x' | '2.x' | 'auto'),
      });

      // Validate data
      const result = schema.safeParse(jsonData);

      if (!result.success) {
        // Convert Zod errors to ParseErrors
        const validationErrors = result.error.issues.map(
          (issue): ParseError => ({
            type: 'validation',
            message: issue.message,
            path: issue.path.join('.'),
            line: undefined,
            column: undefined,
            code: issue.code,
            suggestion: this.getValidationSuggestion(issue) || undefined,
          })
        );

        errors.push(...validationErrors);
        return this.createFailureResult(
          errors,
          warnings,
          startTime,
          'string',
          content.length
        );
      }

      // Generate warnings for best practices
      if (this.options.includeWarnings) {
        warnings.push(...this.generateWarnings(result.data));
      }

      // Create metadata
      const metadata = this.createMetadata(
        result.data,
        startTime,
        'string',
        content.length,
        detectedVersion !== 'auto' ? detectedVersion : undefined
      );

      return {
        success: true,
        data: result.data as FlowiseChatFlow,
        errors,
        warnings,
        metadata,
      };
    } catch (error) {
      errors.push({
        type: 'structure',
        message: `Unexpected error during parsing: ${error instanceof Error ? error.message : 'Unknown error'}`,
        path: undefined,
        line: undefined,
        column: undefined,
        code: undefined,
        suggestion: 'Please check the input format and try again',
      });
      return this.createFailureResult(
        errors,
        warnings,
        startTime,
        'string',
        content.length
      );
    }
  }

  /**
   * Parse Flowise JSON from file
   */
  async parseFile(filePath: string): Promise<ParseResult> {
    const fs = await import('fs/promises');
    const path = await import('path');

    try {
      // Validate file extension
      const ext = path.extname(filePath).toLowerCase();
      if (!['.json', '.flowise'].includes(ext)) {
        return this.createFailureResult(
          [
            {
              type: 'structure',
              message: `Unsupported file extension: ${ext}`,
              path: undefined,
              line: undefined,
              column: undefined,
              code: undefined,
              suggestion: 'Use .json or .flowise files',
            },
          ],
          [],
          performance.now(),
          'file',
          0
        );
      }

      // Check file size before reading
      const stats = await fs.stat(filePath);
      if (stats.size > this.options.maxFileSize) {
        return this.createFailureResult(
          [
            {
              type: 'structure',
              message: `File size (${stats.size} bytes) exceeds maximum allowed size (${this.options.maxFileSize} bytes)`,
              path: undefined,
              line: undefined,
              column: undefined,
              code: undefined,
              suggestion:
                'Consider breaking down the flow into smaller components',
            },
          ],
          [],
          performance.now(),
          'file',
          stats.size
        );
      }

      // Read and parse file
      const content = await fs.readFile(filePath, 'utf-8');
      const result = await this.parseString(content);

      // Update metadata to reflect file source
      result.metadata.sourceType = 'file';

      return result;
    } catch (error) {
      return this.createFailureResult(
        [
          {
            type: 'structure',
            message: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`,
            path: undefined,
            line: undefined,
            column: undefined,
            code: undefined,
            suggestion: 'Check file path and permissions',
          },
        ],
        [],
        performance.now(),
        'file',
        0
      );
    }
  }

  /**
   * Parse Flowise JSON from URL
   */
  async parseUrl(url: string): Promise<ParseResult> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.options.fetchTimeout
      );

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Flowise-to-LangChain Parser/1.0.0',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return this.createFailureResult(
          [
            {
              type: 'network',
              message: `HTTP ${response.status}: ${response.statusText}`,
              path: undefined,
              line: undefined,
              column: undefined,
              code: undefined,
              suggestion: 'Check URL and network connectivity',
            },
          ],
          [],
          performance.now(),
          'url',
          0
        );
      }

      const content = await response.text();
      const result = await this.parseString(content);

      // Update metadata to reflect URL source
      result.metadata.sourceType = 'url';

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return this.createFailureResult(
        [
          {
            type: 'network',
            message: `Failed to fetch from URL: ${errorMessage}`,
            path: undefined,
            line: undefined,
            column: undefined,
            code: undefined,
            suggestion: 'Check URL validity and network connectivity',
          },
        ],
        [],
        performance.now(),
        'url',
        0
      );
    }
  }

  /**
   * Parse Flowise JSON from Buffer
   */
  async parseBuffer(buffer: Buffer): Promise<ParseResult> {
    try {
      const content = buffer.toString('utf-8');
      const result = await this.parseString(content);

      // Update metadata to reflect buffer source
      result.metadata.sourceType = 'buffer';
      result.metadata.sourceSize = buffer.length;

      return result;
    } catch (error) {
      return this.createFailureResult(
        [
          {
            type: 'structure',
            message: `Failed to parse buffer: ${error instanceof Error ? error.message : 'Unknown error'}`,
            path: undefined,
            line: undefined,
            column: undefined,
            code: undefined,
            suggestion: 'Ensure buffer contains valid UTF-8 encoded JSON',
          },
        ],
        [],
        performance.now(),
        'buffer',
        buffer.length
      );
    }
  }

  /**
   * Validate only (without full parsing)
   */
  async validate(content: string): Promise<{
    isValid: boolean;
    errors: ParseError[];
    warnings: ParseWarning[];
  }> {
    const result = await this.parseString(content);
    return {
      isValid: result.success,
      errors: result.errors,
      warnings: result.warnings,
    };
  }

  /**
   * Quick validation using minimal schema
   */
  async quickValidate(
    content: string
  ): Promise<{ isValid: boolean; errors: string[] }> {
    try {
      const jsonData = JSON.parse(content);
      const result = FlowiseChatFlowMinimalSchema.safeParse(jsonData);

      return {
        isValid: result.success,
        errors: result.success
          ? []
          : result.error.issues.map((issue) => issue.message),
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [
          `JSON parse error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ],
      };
    }
  }

  /**
   * Detect Flowise version from data structure
   */
  private detectFlowiseVersion(data: unknown): VersionDetectionResult {
    const indicators: string[] = [];
    let score = 0;
    let version: '1.x' | '2.x' | 'unknown' = 'unknown';

    try {
      if (typeof data === 'object' && data !== null && 'nodes' in data) {
        const nodes = (data as any).nodes;
        if (Array.isArray(nodes) && nodes.length > 0) {
          const firstNode = nodes[0];

          // Check version field first - this is the most reliable indicator
          let hasExplicitVersion = false;
          if (firstNode.data?.version >= 2) {
            score += 0.7;
            indicators.push('Node version >= 2');
            version = '2.x';
            hasExplicitVersion = true;
          } else if (firstNode.data?.version === 1) {
            score += 0.7;
            indicators.push('Node version = 1');
            version = '1.x';
            hasExplicitVersion = true;
          }

          // Only check for v2-specific fields if no explicit version found
          if (
            !hasExplicitVersion &&
            firstNode.data?.baseClasses?.includes('BaseChain')
          ) {
            score += 0.2;
            indicators.push('BaseChain support');
            version = '2.x';
          }

          // Check for new node types
          const nodeTypes = nodes.map((n: any) => n.data?.type || n.type);
          const v2Types = [
            'conversationChain',
            'sqlDatabaseChain',
            'vectorDBQAChain',
          ];
          if (v2Types.some((type) => nodeTypes.includes(type))) {
            score += 0.3;
            indicators.push('V2-specific node types');
            version = '2.x';
          }

          // Check metadata structure
          if ('chatflow' in data && typeof data.chatflow === 'object') {
            const chatflow = data.chatflow as any;
            if (chatflow.createdDate || chatflow.updatedDate) {
              score += 0.1;
              indicators.push('Extended metadata');
            }
          }
        }
      }
    } catch {
      // Ignore errors in version detection
    }

    return {
      version: score > 0.3 ? version : 'unknown',
      confidence: Math.min(score, 1),
      indicators,
    };
  }

  /**
   * Generate warnings for best practices
   */
  private generateWarnings(data: FlowiseChatFlow): ParseWarning[] {
    const warnings: ParseWarning[] = [];

    // Check for deprecated nodes
    const deprecatedTypes = ['textSplitter', 'pdfLoader']; // Example deprecated types
    for (const node of data.nodes) {
      if (deprecatedTypes.includes(node.data.type)) {
        warnings.push({
          type: 'deprecated',
          message: `Node type '${node.data.type}' is deprecated`,
          path: `nodes.${node.id}`,
          suggestion: 'Consider upgrading to newer node types',
        });
      }
    }

    // Check for performance concerns
    if (data.nodes.length > 50) {
      warnings.push({
        type: 'performance',
        message: `Large number of nodes (${data.nodes.length}) may impact performance`,
        path: undefined,
        suggestion: 'Consider breaking the flow into smaller sub-flows',
      });
    }

    // Check for missing descriptions
    const nodesWithoutDescription = data.nodes.filter(
      (node) => !node.data.description
    );
    if (nodesWithoutDescription.length > 0) {
      warnings.push({
        type: 'best_practice',
        message: `${nodesWithoutDescription.length} nodes are missing descriptions`,
        path: undefined,
        suggestion: 'Add descriptions to improve flow documentation',
      });
    }

    return warnings;
  }

  /**
   * Get validation suggestion for Zod issues
   */
  private getValidationSuggestion(issue: z.ZodIssue): string | undefined {
    switch (issue.code) {
      case 'invalid_type':
        return `Expected ${issue.expected}, got ${issue.received}`;
      case 'too_small':
        return `Value must be at least ${issue.minimum}`;
      case 'too_big':
        return `Value must be at most ${issue.maximum}`;
      case 'invalid_string':
        return 'String format is invalid';
      case 'unrecognized_keys':
        return `Unexpected properties: ${issue.keys?.join(', ')}`;
      case 'custom':
        return 'Check the validation requirements for this field';
      default:
        return 'Please verify the data structure and format';
    }
  }

  /**
   * Get line and column from position in text
   */
  private getLineColumnFromPosition(
    text: string,
    position: number
  ): { line: number; column: number } {
    const lines = text.substring(0, position).split('\n');
    const lastLine = lines[lines.length - 1];
    return {
      line: lines.length,
      column: (lastLine?.length ?? 0) + 1,
    };
  }

  /**
   * Create metadata object
   */
  private createMetadata(
    data: FlowiseChatFlow,
    startTime: number,
    sourceType: ParseMetadata['sourceType'],
    sourceSize: number,
    detectedVersion?: string
  ): ParseMetadata {
    const parseTime = performance.now() - startTime;
    const nodeCount = data.nodes.length;
    const edgeCount = data.edges.length;

    // Calculate complexity
    let complexity: 'simple' | 'medium' | 'complex' = 'simple';
    if (nodeCount > 20 || edgeCount > 30) {
      complexity = 'complex';
    } else if (nodeCount > 8 || edgeCount > 12) {
      complexity = 'medium';
    }

    return {
      sourceType,
      sourceSize,
      parseTime,
      flowiseVersion: detectedVersion || undefined,
      nodeCount,
      edgeCount,
      complexity,
      hasMetadata: !!data.chatflow,
      timestamp: Date.now(),
    };
  }

  /**
   * Create failure result
   */
  private createFailureResult(
    errors: ParseError[],
    warnings: ParseWarning[],
    startTime: number,
    sourceType: ParseMetadata['sourceType'],
    sourceSize: number
  ): ParseResult {
    return {
      success: false,
      errors,
      warnings,
      metadata: {
        sourceType,
        sourceSize,
        parseTime: performance.now() - startTime,
        flowiseVersion: undefined,
        nodeCount: 0,
        edgeCount: 0,
        complexity: 'simple',
        hasMetadata: false,
        timestamp: Date.now(),
      },
    };
  }
}

/**
 * Convenience function for quick parsing
 */
export async function parseFlowiseJson(
  content: string,
  options?: ParserOptions
): Promise<ParseResult> {
  const parser = new FlowiseParser(options);
  return parser.parseString(content);
}

/**
 * Convenience function for file parsing
 */
export async function parseFlowiseFile(
  filePath: string,
  options?: ParserOptions
): Promise<ParseResult> {
  const parser = new FlowiseParser(options);
  return parser.parseFile(filePath);
}

/**
 * Convenience function for URL parsing
 */
export async function parseFlowiseUrl(
  url: string,
  options?: ParserOptions
): Promise<ParseResult> {
  const parser = new FlowiseParser(options);
  return parser.parseUrl(url);
}

/**
 * Export parser utilities
 */
export { FlowiseParser as Parser };
export * from './schema.js';
