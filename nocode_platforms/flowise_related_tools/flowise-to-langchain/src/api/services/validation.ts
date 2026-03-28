/**
 * Validation Service
 *
 * This service provides API integration with the existing CLI validation,
 * handling validation requests and providing detailed feedback.
 */

import { randomUUID } from 'crypto';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { validateInputFile } from '../../cli/utils/validation.js';
import { fixJsonIssues } from '../../cli/utils/json-fixer.js';
import { logger } from '../../cli/utils/logger.js';
import {
  ValidateRequest,
  ValidateResponse,
  ValidationOptions,
  ValidationSuggestion,
  JobInfo,
  ApiError,
} from '../types/api.js';
import { ValidationResult } from '../../cli/types.js';
import { EventEmitter } from 'events';

/**
 * Validation job tracking
 */
interface ValidationJob {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  startedAt?: Date;
  completedAt?: Date;
  result?: ValidateResponse;
  error?: ApiError;
  tempDir?: string;
  emitter: EventEmitter;
}

/**
 * Validation Service class
 */
export class ValidationService extends EventEmitter {
  private jobs: Map<string, ValidationJob> = new Map();
  private tempDir: string;
  // JSON fixing is done via fixJsonIssues function

  constructor() {
    super();
    this.tempDir = join(tmpdir(), 'flowise-api-validation');
    // JSON fixing is handled by fixJsonIssues function
    this.ensureTempDir();
  }

  /**
   * Ensure temp directory exists
   */
  private async ensureTempDir(): Promise<void> {
    if (!existsSync(this.tempDir)) {
      await mkdir(this.tempDir, { recursive: true });
    }
  }

  /**
   * Validate Flowise flow JSON
   */
  public async validate(request: ValidateRequest): Promise<ValidateResponse> {
    const jobId = randomUUID();
    const job: ValidationJob = {
      id: jobId,
      status: 'queued',
      progress: 0,
      emitter: new EventEmitter(),
    };

    this.jobs.set(jobId, job);

    try {
      // Update job status
      job.status = 'running';
      job.startedAt = new Date();
      this.emitProgress(job, 10, 'Preparing validation...');

      // Create temporary workspace
      const workspaceDir = join(this.tempDir, jobId);
      await mkdir(workspaceDir, { recursive: true });
      job.tempDir = workspaceDir;

      // Process input (either file path or JSON content)
      let inputPath: string;
      let inputContent: string;

      if (typeof request.input === 'string') {
        // Assume it's a file path
        inputPath = request.input;
        inputContent = await this.readFileContent(inputPath);
      } else {
        // It's JSON content, write to temp file
        inputContent = JSON.stringify(request.input, null, 2);
        inputPath = join(workspaceDir, 'input.json');
        await writeFile(inputPath, inputContent);
      }

      this.emitProgress(job, 30, 'Validating JSON structure...');

      // Parse and validate JSON
      let parsedInput: any;
      try {
        parsedInput = JSON.parse(inputContent);
      } catch (error) {
        throw new Error(
          `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown parsing error'}`
        );
      }

      this.emitProgress(job, 50, 'Validating Flowise flow...');

      // Run basic validation using existing CLI validation
      const validationResult = await this.runFlowiseValidation(
        inputPath,
        request.options || {}
      );

      this.emitProgress(job, 70, 'Generating suggestions...');

      // Generate additional suggestions based on API options
      const suggestions = this.generateSuggestions(
        parsedInput,
        validationResult,
        request.options || {}
      );

      this.emitProgress(job, 90, 'Processing results...');

      // Auto-fix if requested
      let fixedContent: string | undefined;
      if (request.options?.autoFix && validationResult.fixable) {
        fixedContent = await this.autoFixFlow(inputContent, validationResult);
      }

      // Build response
      const response: ValidateResponse = {
        result: validationResult,
        fixed: fixedContent,
        suggestions,
      };

      // Update job status
      job.status = 'completed';
      job.completedAt = new Date();
      job.result = response;
      job.progress = 100;
      this.emitProgress(job, 100, 'Validation completed!');

      // Emit completion event
      this.emit('validation:completed', {
        jobId,
        result: response,
      });

      return response;
    } catch (error) {
      // Handle validation error
      const apiError: ApiError = {
        code: 'VALIDATION_ERROR',
        message:
          error instanceof Error ? error.message : 'Unknown validation error',
        details: error,
      };

      job.status = 'failed';
      job.completedAt = new Date();
      job.error = apiError;

      this.emit('validation:failed', {
        jobId,
        error: apiError,
      });

      throw apiError;
    } finally {
      // Clean up temporary files after a delay
      setTimeout(() => {
        if (job.tempDir) {
          rm(job.tempDir, { recursive: true, force: true }).catch(
            console.error
          );
        }
      }, 60000); // Clean up after 1 minute
    }
  }

  /**
   * Get job status
   */
  public getJobStatus(jobId: string): JobInfo | null {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    return {
      id: job.id,
      type: 'validate',
      status: job.status,
      progress: job.progress,
      createdAt: job.startedAt?.toISOString() || new Date().toISOString(),
      startedAt: job.startedAt?.toISOString(),
      completedAt: job.completedAt?.toISOString(),
      result: job.result,
      error: job.error,
    };
  }

  /**
   * Cancel a validation job
   */
  public async cancelJob(jobId: string): Promise<boolean> {
    const job = this.jobs.get(jobId);
    if (!job || job.status !== 'running') return false;

    job.status = 'cancelled';
    job.completedAt = new Date();

    // Clean up temporary files
    if (job.tempDir) {
      await rm(job.tempDir, { recursive: true, force: true }).catch(
        console.error
      );
    }

    this.emit('validation:cancelled', { jobId });
    return true;
  }

  /**
   * Get all jobs
   */
  public getAllJobs(): JobInfo[] {
    return Array.from(this.jobs.values()).map((job) => ({
      id: job.id,
      type: 'validate',
      status: job.status,
      progress: job.progress,
      createdAt: job.startedAt?.toISOString() || new Date().toISOString(),
      startedAt: job.startedAt?.toISOString(),
      completedAt: job.completedAt?.toISOString(),
      result: job.result,
      error: job.error,
    }));
  }

  /**
   * Subscribe to job progress updates
   */
  public subscribeToJob(
    jobId: string,
    callback: (progress: any) => void
  ): () => void {
    const job = this.jobs.get(jobId);
    if (!job) return () => {};

    const handler = (progress: any) => callback(progress);
    job.emitter.on('progress', handler);

    return () => {
      job.emitter.removeListener('progress', handler);
    };
  }

  /**
   * Clean up completed jobs
   */
  public cleanupJobs(
    olderThan: Date = new Date(Date.now() - 24 * 60 * 60 * 1000)
  ): void {
    for (const [jobId, job] of this.jobs.entries()) {
      if (job.completedAt && job.completedAt < olderThan) {
        this.jobs.delete(jobId);
      }
    }
  }

  /**
   * Read file content safely
   */
  private async readFileContent(filePath: string): Promise<string> {
    try {
      const { readFile } = await import('fs/promises');
      return await readFile(filePath, 'utf-8');
    } catch (error) {
      throw new Error(
        `Failed to read file ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Run Flowise validation using existing CLI validation
   */
  private async runFlowiseValidation(
    inputPath: string,
    options: ValidationOptions
  ): Promise<ValidationResult> {
    try {
      // Use existing CLI validation for basic file checks
      await validateInputFile(inputPath);
      
      // Parse and analyze the flow
      const { parseFlowiseFile } = await import('../../parser/parser.js');
      const { analyzeFlow } = await import('../../parser/utils.js');
      const { getSupportedNodeTypes } = await import('../../registry/registry.js');
      
      const parseResult = await parseFlowiseFile(inputPath);
      
      if (!parseResult.success || !parseResult.data) {
        return {
          isValid: false,
          errors: parseResult.errors.map(err => ({
            message: err.message,
            code: err.code || 'PARSE_ERROR',
            line: err.line,
            column: err.column,
          })),
          warnings: [],
          suggestions: [],
          fixable: parseResult.errors.some(err => err.code === 'FIXABLE_ERROR'),
          analysis: {
            nodeCount: 0,
            connectionCount: 0,
            coverage: 0,
            complexity: 'high',
            supportedTypes: [],
            unsupportedTypes: [],
          },
        };
      }
      
      // Analyze the parsed flow
      const flowAnalysis = analyzeFlow(parseResult.data);
      const supportedTypes = getSupportedNodeTypes();
      
      // Categorize node types
      const usedNodeTypes = new Set(parseResult.data.nodes.map(node => node.data.type));
      const supportedUsedTypes = Array.from(usedNodeTypes).filter(type => supportedTypes.includes(type));
      const unsupportedUsedTypes = Array.from(usedNodeTypes).filter(type => !supportedTypes.includes(type));
      
      // Calculate coverage
      const coverage = usedNodeTypes.size > 0 
        ? Math.round((supportedUsedTypes.length / usedNodeTypes.size) * 100)
        : 100;
      
      // Determine complexity based on flow analysis
      let complexity: 'low' | 'medium' | 'high' = 'low';
      if (flowAnalysis.cyclomaticComplexity > 10) complexity = 'high';
      else if (flowAnalysis.cyclomaticComplexity > 5) complexity = 'medium';
      
      // Build validation result
      const errors: ValidationError[] = [];
      const warnings: ValidationWarning[] = [];
      const suggestions: ValidationSuggestion[] = [];
      
      // Check for issues
      if (flowAnalysis.orphanedNodes.length > 0) {
        warnings.push({
          message: `Found ${flowAnalysis.orphanedNodes.length} orphaned node(s) that are not connected`,
          code: 'ORPHANED_NODES',
          nodeIds: flowAnalysis.orphanedNodes,
        });
      }
      
      if (flowAnalysis.cycles.length > 0 && options.detectCycles) {
        warnings.push({
          message: `Detected ${flowAnalysis.cycles.length} cycle(s) in the flow`,
          code: 'CIRCULAR_DEPENDENCY',
          paths: flowAnalysis.cycles,
        });
      }
      
      if (unsupportedUsedTypes.length > 0) {
        errors.push({
          message: `Flow contains unsupported node types: ${unsupportedUsedTypes.join(', ')}`,
          code: 'UNSUPPORTED_NODES',
          nodeTypes: unsupportedUsedTypes,
        });
      }
      
      if (flowAnalysis.criticalPath.length > 20) {
        suggestions.push({
          message: 'Consider breaking down this complex flow into smaller sub-flows',
          code: 'COMPLEX_FLOW',
          actionable: true,
          priority: 'medium',
        });
      }
      
      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        suggestions,
        fixable: errors.some(err => err.code === 'FIXABLE_ERROR'),
        analysis: {
          nodeCount: parseResult.data.nodes.length,
          connectionCount: parseResult.data.edges.length,
          coverage,
          complexity,
          supportedTypes: supportedUsedTypes,
          unsupportedTypes: unsupportedUsedTypes,
        },
      };
    } catch (error) {
      // Convert any unexpected errors to API format
      return {
        isValid: false,
        errors: [
          {
            message:
              error instanceof Error ? error.message : 'Validation failed',
            code: 'VALIDATION_ERROR',
          },
        ],
        warnings: [],
        suggestions: [],
        fixable: false,
        analysis: {
          nodeCount: 0,
          connectionCount: 0,
          coverage: 0,
          complexity: 'high',
          supportedTypes: [],
          unsupportedTypes: [],
        },
      };
    }
  }

  /**
   * Generate validation suggestions
   */
  private generateSuggestions(
    flow: any,
    validationResult: ValidationResult,
    options: ValidationOptions
  ): ValidationSuggestion[] {
    const suggestions: ValidationSuggestion[] = [];

    // Check for deprecated features
    if (options.checkDeprecated) {
      suggestions.push(...this.checkDeprecatedFeatures(flow));
    }

    // Suggest optimizations
    if (options.suggestOptimizations) {
      suggestions.push(...this.suggestOptimizations(flow));
    }

    // Convert validation errors to suggestions
    validationResult.errors.forEach((error) => {
      suggestions.push({
        type: 'error',
        message: error.message,
        path: error.path,
        fixable: !!error.suggestion,
        autoFix: error.suggestion,
      });
    });

    // Convert validation warnings to suggestions
    validationResult.warnings.forEach((warning) => {
      suggestions.push({
        type: 'warning',
        message: warning.message,
        path: warning.path,
        fixable: false,
      });
    });

    return suggestions;
  }

  /**
   * Check for deprecated features
   */
  private checkDeprecatedFeatures(flow: any): ValidationSuggestion[] {
    const suggestions: ValidationSuggestion[] = [];

    // Check for deprecated node types
    if (flow.nodes) {
      flow.nodes.forEach((node: any, index: number) => {
        if (node.type && this.isDeprecatedNodeType(node.type)) {
          suggestions.push({
            type: 'warning',
            message: `Node type "${node.type}" is deprecated`,
            nodeId: node.id,
            path: `nodes[${index}].type`,
            fixable: false,
          });
        }
      });
    }

    return suggestions;
  }

  /**
   * Suggest optimizations
   */
  private suggestOptimizations(flow: any): ValidationSuggestion[] {
    const suggestions: ValidationSuggestion[] = [];

    // Check for performance optimizations
    if (flow.nodes && flow.nodes.length > 20) {
      suggestions.push({
        type: 'optimization',
        message:
          'Large flow detected. Consider breaking it into smaller sub-flows for better performance.',
        fixable: false,
      });
    }

    // Check for unused nodes
    if (flow.nodes && flow.edges) {
      const connectedNodes = new Set();
      flow.edges.forEach((edge: any) => {
        connectedNodes.add(edge.source);
        connectedNodes.add(edge.target);
      });

      flow.nodes.forEach((node: any, index: number) => {
        if (!connectedNodes.has(node.id)) {
          suggestions.push({
            type: 'info',
            message: `Node "${node.data?.label || node.id}" appears to be unused`,
            nodeId: node.id,
            path: `nodes[${index}]`,
            fixable: true,
            autoFix: 'Remove unused node',
          });
        }
      });
    }

    return suggestions;
  }

  /**
   * Check if node type is deprecated
   */
  private isDeprecatedNodeType(nodeType: string): boolean {
    const deprecatedTypes = ['oldLLM', 'deprecatedMemory', 'legacyTool'];
    return deprecatedTypes.includes(nodeType);
  }

  /**
   * Auto-fix flow issues
   */
  private async autoFixFlow(
    inputContent: string,
    validationResult: ValidationResult
  ): Promise<string> {
    try {
      // Use the existing JSON fixer
      const fixedJson = await fixJsonIssues(inputContent);

      if (fixedJson !== null) {
        return JSON.stringify(fixedJson, null, 2);
      }

      return inputContent;
    } catch (error) {
      logger.error('Auto-fix failed:', { error });
      return inputContent;
    }
  }

  /**
   * Emit progress update
   */
  private emitProgress(
    job: ValidationJob,
    progress: number,
    step: string,
    details?: string
  ): void {
    job.progress = progress;

    const progressMessage = {
      jobId: job.id,
      progress,
      step,
      details,
    };

    job.emitter.emit('progress', progressMessage);
    this.emit('job:progress', progressMessage);
  }
}
