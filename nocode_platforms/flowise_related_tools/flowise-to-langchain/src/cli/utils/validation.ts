import { access, constants, stat } from 'fs/promises';
import { extname } from 'path';
import {
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ValidationSuggestion,
} from '../types.js';

export async function validateInputFile(filePath: string): Promise<void> {
  try {
    // Check if file exists and is readable
    await access(filePath, constants.R_OK);

    // Check if it's a file (not a directory)
    const stats = await stat(filePath);
    if (!stats.isFile()) {
      throw new Error(`Path '${filePath}' is not a file`);
    }

    // Check file extension
    const ext = extname(filePath).toLowerCase();
    if (ext !== '.json') {
      throw new Error(`File must have .json extension, got '${ext}'`);
    }

    // Check file size (warn if > 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (stats.size > maxSize) {
      console.warn(
        `Warning: File is large (${(stats.size / 1024 / 1024).toFixed(2)} MB). Processing may take longer.`
      );
    }

    // Check if file is empty
    if (stats.size === 0) {
      throw new Error('File is empty');
    }
  } catch (error) {
    const err = error as NodeJS.ErrnoException;

    if (err.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    } else if (err.code === 'EACCES') {
      throw new Error(`Permission denied: Cannot read file ${filePath}`);
    } else {
      throw error;
    }
  }
}

export async function validateFlowiseExport(
  data: any,
  options: { strict?: boolean; schemaVersion?: string } = {}
): Promise<ValidationResult> {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: ValidationSuggestion[] = [];
  let detectedVersion: string | undefined;
  let nodeCount = 0;
  let edgeCount = 0;
  const nodeTypes: string[] = [];
  const supportedFeatures: string[] = [];
  const unsupportedFeatures: Array<{
    name: string;
    reason: string;
    workaround?: string;
  }> = [];

  try {
    // Basic structure validation
    if (typeof data !== 'object' || data === null) {
      errors.push({
        message: 'Invalid data structure: Expected JSON object',
        code: 'INVALID_STRUCTURE',
        suggestion:
          'Ensure the file contains a valid JSON object exported from Flowise',
      });
      return { isValid: false, errors, warnings: [], suggestions: [] };
    }

    // Check for required top-level properties
    const requiredProps = ['nodes', 'edges'];
    // const optionalProps = ['version', 'metadata', 'settings']; // Future validation use

    for (const prop of requiredProps) {
      if (!(prop in data)) {
        errors.push({
          message: `Missing required property: ${prop}`,
          path: `$.${prop}`,
          code: 'MISSING_PROPERTY',
          suggestion: 'This may not be a valid Flowise export file',
        });
      }
    }

    // Detect version
    if (data.version) {
      detectedVersion = data.version;
    } else if (data.metadata?.version) {
      detectedVersion = data.metadata.version;
    } else {
      warnings.push({
        message:
          'No version information found, assuming latest compatible format',
        code: 'NO_VERSION',
      });
      detectedVersion = 'unknown';
    }

    // Validate nodes array
    if (data.nodes) {
      if (!Array.isArray(data.nodes)) {
        errors.push({
          message: 'nodes must be an array',
          path: '$.nodes',
          code: 'INVALID_TYPE',
        });
      } else {
        nodeCount = data.nodes.length;

        if (nodeCount === 0) {
          warnings.push({
            message: 'No nodes found in the flow',
            code: 'EMPTY_FLOW',
          });
        }

        // Validate individual nodes
        data.nodes.forEach((node: any, index: number) => {
          const nodePath = `$.nodes[${index}]`;

          // Required node properties
          const requiredNodeProps = ['id', 'type', 'data'];
          for (const prop of requiredNodeProps) {
            if (!(prop in node)) {
              errors.push({
                message: `Node missing required property: ${prop}`,
                path: `${nodePath}.${prop}`,
                code: 'MISSING_NODE_PROPERTY',
              });
            }
          }

          // Collect node types
          if (node.type && typeof node.type === 'string') {
            if (!nodeTypes.includes(node.type)) {
              nodeTypes.push(node.type);
            }

            // Check for supported/unsupported node types
            const supportedNodeTypes = [
              'ChatOpenAI',
              'OpenAI',
              'PromptTemplate',
              'LLMChain',
              'ConversationChain',
              'SimpleSequentialChain',
              'SequentialChain',
              'VectorStoreRetriever',
              'Document',
              'TextSplitter',
              'Memory',
              'BufferMemory',
              'ConversationBufferMemory',
            ];

            if (supportedNodeTypes.includes(node.type)) {
              if (!supportedFeatures.includes(node.type)) {
                supportedFeatures.push(node.type);
              }
            } else {
              const existing = unsupportedFeatures.find(
                (f) => f.name === node.type
              );
              if (!existing) {
                unsupportedFeatures.push({
                  name: node.type,
                  reason: 'Node type not yet supported in converter',
                  workaround:
                    'Check for updates or consider using a supported alternative',
                });
              }
            }
          }

          // Validate node data
          if (node.data) {
            if (typeof node.data !== 'object') {
              errors.push({
                message: 'Node data must be an object',
                path: `${nodePath}.data`,
                code: 'INVALID_NODE_DATA',
              });
            }
          }

          // Check for required node ID format
          if (node.id && typeof node.id === 'string') {
            if (node.id.length === 0) {
              errors.push({
                message: 'Node ID cannot be empty',
                path: `${nodePath}.id`,
                code: 'INVALID_NODE_ID',
              });
            }
          }
        });
      }
    }

    // Validate edges array
    if (data.edges) {
      if (!Array.isArray(data.edges)) {
        errors.push({
          message: 'edges must be an array',
          path: '$.edges',
          code: 'INVALID_TYPE',
        });
      } else {
        edgeCount = data.edges.length;

        // Validate individual edges
        data.edges.forEach((edge: any, index: number) => {
          const edgePath = `$.edges[${index}]`;

          // Required edge properties
          const requiredEdgeProps = ['source', 'target'];
          for (const prop of requiredEdgeProps) {
            if (!(prop in edge)) {
              errors.push({
                message: `Edge missing required property: ${prop}`,
                path: `${edgePath}.${prop}`,
                code: 'MISSING_EDGE_PROPERTY',
              });
            }
          }

          // Validate that source and target reference existing nodes
          if (data.nodes && Array.isArray(data.nodes)) {
            const nodeIds = data.nodes.map((n: any) => n.id);

            if (edge.source && !nodeIds.includes(edge.source)) {
              errors.push({
                message: `Edge source references non-existent node: ${edge.source}`,
                path: `${edgePath}.source`,
                code: 'INVALID_EDGE_REFERENCE',
              });
            }

            if (edge.target && !nodeIds.includes(edge.target)) {
              errors.push({
                message: `Edge target references non-existent node: ${edge.target}`,
                path: `${edgePath}.target`,
                code: 'INVALID_EDGE_REFERENCE',
              });
            }
          }
        });
      }
    }

    // Check for circular dependencies (basic check)
    if (
      data.nodes &&
      data.edges &&
      Array.isArray(data.nodes) &&
      Array.isArray(data.edges)
    ) {
      const graph = new Map<string, string[]>();

      // Build adjacency list
      data.edges.forEach((edge: any) => {
        if (edge.source && edge.target) {
          if (!graph.has(edge.source)) {
            graph.set(edge.source, []);
          }
          graph.get(edge.source)!.push(edge.target);
        }
      });

      // Simple cycle detection using DFS
      const visited = new Set<string>();
      const recStack = new Set<string>();

      // eslint-disable-next-line no-inner-declarations
      function hasCycle(node: string): boolean {
        if (recStack.has(node)) {
          return true;
        }
        if (visited.has(node)) {
          return false;
        }

        visited.add(node);
        recStack.add(node);

        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
          if (hasCycle(neighbor)) {
            return true;
          }
        }

        recStack.delete(node);
        return false;
      }

      for (const nodeId of graph.keys()) {
        if (hasCycle(nodeId)) {
          errors.push({
            message: 'Circular dependency detected in flow',
            code: 'CIRCULAR_DEPENDENCY',
            suggestion: 'Check the flow connections for loops',
          });
          break;
        }
      }
    }

    // Determine complexity
    let complexity: 'low' | 'medium' | 'high' = 'low';
    if (nodeCount > 20 || edgeCount > 30) {
      complexity = 'high';
    } else if (nodeCount > 5 || edgeCount > 10) {
      complexity = 'medium';
    }

    // Strict mode additional validations
    if (options.strict) {
      // Check for recommended properties
      if (!data.metadata) {
        warnings.push({
          message:
            'No metadata found - recommended for better conversion results',
          code: 'NO_METADATA',
        });
      }

      // Check for empty node data
      if (data.nodes) {
        data.nodes.forEach((node: any, index: number) => {
          if (node.data && Object.keys(node.data).length === 0) {
            warnings.push({
              message: `Node ${node.id || index} has empty data object`,
              path: `$.nodes[${index}].data`,
              code: 'EMPTY_NODE_DATA',
            });
          }
        });
      }
    }

    // Check if issues are fixable
    const fixable = errors.some((error) =>
      ['MISSING_PROPERTY', 'EMPTY_NODE_DATA', 'INVALID_NODE_ID'].includes(
        error.code || ''
      )
    );

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      detectedVersion,
      nodeCount,
      edgeCount,
      nodeTypes,
      complexity,
      supportedFeatures,
      unsupportedFeatures,
      fixable,
    };
  } catch (error) {
    errors.push({
      message: `Validation error: ${(error as Error).message}`,
      code: 'VALIDATION_ERROR',
    });

    return {
      isValid: false,
      errors,
      warnings: [],
      suggestions: [],
    };
  }
}
