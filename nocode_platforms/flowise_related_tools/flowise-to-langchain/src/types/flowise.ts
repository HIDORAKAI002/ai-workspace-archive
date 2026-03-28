/**
 * Flowise-specific types for development tools and other converters
 */

export interface NodeData {
  id: string;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  outputAnchors?: string[];
  selected?: boolean;
  name?: string;
  type?: string;
  category?: string;
  label?: string;
}

export interface ConversionResult {
  success: boolean;
  code?: string;
  imports?: string[];
  dependencies?: string[];
  error?: string;
  warnings?: string[];
  metadata?: Record<string, any>;
}

// Re-export for backward compatibility
export type { NodeData as FlowiseNodeData };
