/**
 * Zod Schema Definitions for Flowise JSON Structure
 *
 * This module provides comprehensive validation schemas for Flowise chatflow exports
 * using Zod for type-safe parsing and validation with helpful error messages.
 */

import { z } from 'zod';

/**
 * Position schema for node positioning
 */
export const PositionSchema = z.object({
  x: z.number().describe('X coordinate of the node position'),
  y: z.number().describe('Y coordinate of the node position'),
});

/**
 * Flowise input parameter option schema
 */
export const FlowiseInputParamOptionSchema = z.union([
  z.string(),
  z.object({
    label: z.string(),
    name: z.string(),
    description: z.string().optional(),
  }),
]);

/**
 * Flowise input parameter schema with validation
 */
export const FlowiseInputParamSchema = z
  .object({
    label: z.string().min(1, 'Parameter label cannot be empty'),
    name: z.string().min(1, 'Parameter name cannot be empty'),
    type: z.string().min(1, 'Parameter type cannot be empty'),
    optional: z.boolean().optional(),
    description: z.string().optional(),
    default: z.unknown().optional(),
    options: z.array(FlowiseInputParamOptionSchema).optional(),
    rows: z.number().positive().optional(),
    additionalParams: z.boolean().optional(),
    acceptVariable: z.boolean().optional(),
    list: z.boolean().optional(),
    placeholder: z.string().optional(),
    warning: z.string().optional(),
    step: z.number().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
  })
  .refine(
    (data) => {
      // If type is number, min/max should be provided if specified
      if (
        data.type === 'number' &&
        data.min !== undefined &&
        data.max !== undefined
      ) {
        return data.min <= data.max;
      }
      return true;
    },
    {
      message: 'Minimum value must be less than or equal to maximum value',
      path: ['min'],
    }
  );

/**
 * Flowise anchor (connection point) schema
 */
export const FlowiseAnchorSchema = z.object({
  id: z.string().min(1, 'Anchor ID cannot be empty'),
  name: z.string().min(1, 'Anchor name cannot be empty'),
  label: z.string().min(1, 'Anchor label cannot be empty'),
  description: z.string().optional(),
  type: z.string().min(1, 'Anchor type cannot be empty'),
  optional: z.boolean().optional(),
  list: z.boolean().optional(),
});

/**
 * Flowise node data schema with comprehensive validation
 */
export const FlowiseNodeDataSchema = z.object({
  id: z.string().min(1, 'Node data ID cannot be empty'),
  label: z.string().min(1, 'Node label cannot be empty'),
  version: z
    .number()
    .int()
    .positive('Version must be a positive integer')
    .optional(),
  name: z.string().min(1, 'Node name cannot be empty'),
  type: z.string().min(1, 'Node type cannot be empty'),
  baseClasses: z
    .array(z.string())
    .min(1, 'Node must have at least one base class'),
  category: z.string().min(1, 'Node category cannot be empty'),
  description: z.string(),
  inputParams: z.array(FlowiseInputParamSchema),
  inputAnchors: z.array(FlowiseAnchorSchema),
  inputs: z.record(z.string(), z.unknown()),
  outputAnchors: z.array(FlowiseAnchorSchema),
  outputs: z.record(z.string(), z.unknown()).optional(),
  selected: z.boolean().optional(),
});

/**
 * Flowise node schema
 */
export const FlowiseNodeSchema = z.object({
  id: z.string().min(1, 'Node ID cannot be empty'),
  position: PositionSchema,
  type: z.string().min(1, 'Node type cannot be empty'),
  data: FlowiseNodeDataSchema,
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  selected: z.boolean().optional(),
  positionAbsolute: PositionSchema.optional(),
  dragging: z.boolean().optional(),
});

/**
 * Flowise edge data schema
 */
export const FlowiseEdgeDataSchema = z
  .object({
    label: z.string().optional(),
  })
  .optional();

/**
 * Flowise edge schema with connection validation
 */
export const FlowiseEdgeSchema = z
  .object({
    source: z.string().min(1, 'Edge source cannot be empty'),
    sourceHandle: z.string().min(1, 'Source handle cannot be empty'),
    target: z.string().min(1, 'Edge target cannot be empty'),
    targetHandle: z.string().min(1, 'Target handle cannot be empty'),
    type: z.string().optional(),
    id: z.string().min(1, 'Edge ID cannot be empty'),
    data: FlowiseEdgeDataSchema,
  })
  .refine((data) => data.source !== data.target, {
    message: 'Edge cannot connect a node to itself',
    path: ['target'],
  });

/**
 * Chatflow metadata schema
 */
export const ChatflowMetadataSchema = z
  .object({
    id: z.string().min(1, 'Chatflow ID cannot be empty'),
    name: z.string().min(1, 'Chatflow name cannot be empty'),
    flowData: z.string(), // JSON string containing the flow data
    deployed: z.boolean(),
    isPublic: z.boolean(),
    apikeyid: z.string(),
    chatbotConfig: z.string().optional(),
    createdDate: z.string().datetime('Invalid created date format'),
    updatedDate: z.string().datetime('Invalid updated date format'),
    apiConfig: z.unknown().optional(),
    analytic: z.unknown().optional(),
    speechToText: z.unknown().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    badge: z.string().optional(),
    usecases: z.string().optional(),
  })
  .refine(
    (data) => {
      // Validate that createdDate <= updatedDate
      const created = new Date(data.createdDate);
      const updated = new Date(data.updatedDate);
      return created <= updated;
    },
    {
      message: 'Updated date must be after or equal to created date',
      path: ['updatedDate'],
    }
  );

/**
 * Main Flowise chatflow schema
 */
export const FlowiseChatFlowSchema = z
  .object({
    nodes: z
      .array(FlowiseNodeSchema)
      .min(1, 'Chatflow must contain at least one node'),
    edges: z.array(FlowiseEdgeSchema),
    chatflow: ChatflowMetadataSchema.optional(),
  })
  .refine(
    (data) => {
      // Validate that all edge endpoints reference existing nodes
      const nodeIds = new Set(data.nodes.map((node) => node.id));
      for (const edge of data.edges) {
        if (!nodeIds.has(edge.source)) {
          return false;
        }
        if (!nodeIds.has(edge.target)) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'All edges must reference existing nodes',
      path: ['edges'],
    }
  )
  .refine(
    (data) => {
      // Validate that edge handles exist on their respective nodes
      const nodeMap = new Map(data.nodes.map((node) => [node.id, node]));

      for (const edge of data.edges) {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);

        if (!sourceNode || !targetNode) continue;

        // Check if source handle exists
        const sourceHandles = sourceNode.data.outputAnchors.map(
          (anchor) => anchor.id
        );
        if (!sourceHandles.includes(edge.sourceHandle)) {
          return false;
        }

        // Check if target handle exists
        const targetHandles = targetNode.data.inputAnchors.map(
          (anchor) => anchor.id
        );
        if (!targetHandles.includes(edge.targetHandle)) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'Edge handles must reference valid node anchors',
      path: ['edges'],
    }
  );

/**
 * Version-specific schema variants for backward compatibility
 */

/**
 * Flowise v1.x schema (legacy support)
 */
export const FlowiseChatFlowV1Schema = z
  .object({
    nodes: z
      .array(
        FlowiseNodeSchema.extend({
          data: FlowiseNodeDataSchema.extend({
            version: z.number().int().min(1).max(1), // v1 only
          }),
        })
      )
      .min(1, 'Chatflow must contain at least one node'),
    edges: z.array(FlowiseEdgeSchema),
    chatflow: ChatflowMetadataSchema.optional(),
  })
  .refine(
    (data) => {
      // Validate that all edge endpoints reference existing nodes
      const nodeIds = new Set(data.nodes.map((node) => node.id));
      for (const edge of data.edges) {
        if (!nodeIds.has(edge.source)) {
          return false;
        }
        if (!nodeIds.has(edge.target)) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'All edges must reference existing nodes',
      path: ['edges'],
    }
  )
  .refine(
    (data) => {
      // Validate that edge handles exist on their respective nodes
      const nodeMap = new Map(data.nodes.map((node) => [node.id, node]));

      for (const edge of data.edges) {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);

        if (!sourceNode || !targetNode) continue;

        // Check if source handle exists
        const sourceHandles = sourceNode.data.outputAnchors.map(
          (anchor) => anchor.id
        );
        if (!sourceHandles.includes(edge.sourceHandle)) {
          return false;
        }

        // Check if target handle exists
        const targetHandles = targetNode.data.inputAnchors.map(
          (anchor) => anchor.id
        );
        if (!targetHandles.includes(edge.targetHandle)) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'Edge handles must reference valid node anchors',
      path: ['edges'],
    }
  );

/**
 * Flowise v2.x schema (current)
 */
export const FlowiseChatFlowV2Schema = z
  .object({
    nodes: z
      .array(
        FlowiseNodeSchema.extend({
          data: FlowiseNodeDataSchema.extend({
            version: z.number().int().min(2), // v2+
          }),
        })
      )
      .min(1, 'Chatflow must contain at least one node'),
    edges: z.array(FlowiseEdgeSchema),
    chatflow: ChatflowMetadataSchema.optional(),
  })
  .refine(
    (data) => {
      // Validate that all edge endpoints reference existing nodes
      const nodeIds = new Set(data.nodes.map((node) => node.id));
      for (const edge of data.edges) {
        if (!nodeIds.has(edge.source)) {
          return false;
        }
        if (!nodeIds.has(edge.target)) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'All edges must reference existing nodes',
      path: ['edges'],
    }
  )
  .refine(
    (data) => {
      // Validate that edge handles exist on their respective nodes
      const nodeMap = new Map(data.nodes.map((node) => [node.id, node]));

      for (const edge of data.edges) {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);

        if (!sourceNode || !targetNode) continue;

        // Check if source handle exists
        const sourceHandles = sourceNode.data.outputAnchors.map(
          (anchor) => anchor.id
        );
        if (!sourceHandles.includes(edge.sourceHandle)) {
          return false;
        }

        // Check if target handle exists
        const targetHandles = targetNode.data.inputAnchors.map(
          (anchor) => anchor.id
        );
        if (!targetHandles.includes(edge.targetHandle)) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'Edge handles must reference valid node anchors',
      path: ['edges'],
    }
  );

/**
 * Union schema that supports multiple Flowise versions
 */
export const FlowiseChatFlowVersionedSchema = z.union([
  FlowiseChatFlowV2Schema,
  FlowiseChatFlowV1Schema,
  FlowiseChatFlowSchema, // fallback for unknown versions
]);

/**
 * Minimal schema for basic validation (useful for quick checks)
 */
export const FlowiseChatFlowMinimalSchema = z.object({
  nodes: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        data: z.object({
          label: z.string(),
          type: z.string(),
          category: z.string(),
        }),
      })
    )
    .min(1),
  edges: z.array(
    z.object({
      source: z.string(),
      target: z.string(),
      id: z.string(),
    })
  ),
});

/**
 * Export all schemas as types for TypeScript usage
 */
export type FlowiseChatFlow = z.infer<typeof FlowiseChatFlowSchema>;
export type FlowiseNode = z.infer<typeof FlowiseNodeSchema>;
export type FlowiseEdge = z.infer<typeof FlowiseEdgeSchema>;
export type FlowiseNodeData = z.infer<typeof FlowiseNodeDataSchema>;
export type FlowiseInputParam = z.infer<typeof FlowiseInputParamSchema>;
export type FlowiseAnchor = z.infer<typeof FlowiseAnchorSchema>;
export type ChatflowMetadata = z.infer<typeof ChatflowMetadataSchema>;
export type Position = z.infer<typeof PositionSchema>;

/**
 * Schema validation options
 */
export interface ValidationOptions {
  /** Whether to use strict validation (default: true) */
  strict?: boolean;
  /** Flowise version to validate against */
  version?: '1.x' | '2.x' | 'auto';
  /** Whether to perform minimal validation only */
  minimal?: boolean;
  /** Custom error message formatter */
  errorFormatter?: (issues: z.ZodIssue[]) => string;
}

/**
 * Get appropriate schema based on validation options
 */
export function getValidationSchema(
  options: ValidationOptions = {}
): z.ZodSchema {
  const { version = 'auto', minimal = false } = options;

  if (minimal) {
    return FlowiseChatFlowMinimalSchema;
  }

  switch (version) {
    case '1.x':
      return FlowiseChatFlowV1Schema;
    case '2.x':
      return FlowiseChatFlowV2Schema;
    case 'auto':
    default:
      return FlowiseChatFlowVersionedSchema;
  }
}

/**
 * Default error formatter for validation issues
 */
export function formatValidationErrors(issues: z.ZodIssue[]): string {
  return issues
    .map((issue) => {
      const path = issue.path.length > 0 ? ` at ${issue.path.join('.')}` : '';
      return `${issue.message}${path}`;
    })
    .join('\n');
}
