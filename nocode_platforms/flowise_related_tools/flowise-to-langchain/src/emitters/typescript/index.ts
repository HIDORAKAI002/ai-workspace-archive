/**
 * TypeScript Emitter Module
 *
 * Main entry point for TypeScript code generation functionality.
 */

import { TypeScriptEmitter } from './emitter.js';
export { TypeScriptEmitter };
export { type CodeGenerationResult, type GeneratedFile } from './emitter.js';
export {
  ImportManager,
  type ImportStatement,
  type ImportGroup,
} from './import-manager.js';
export {
  TemplateEngine,
  type TemplateContext,
  type CodeTemplate,
} from './template-engine.js';
export {
  CodeFormatter,
  type FormattingOptions,
  defaultFormattingOptions,
} from './code-formatter.js';
export {
  LangFuseIntegrator,
  type LangFuseConfig,
  type TraceMetadata,
} from './langfuse-integrator.js';

// Converters
export { LLMConverter } from './converters/llm-converter.js';
export { PromptConverter } from './converters/prompt-converter.js';
export { ChainConverter } from './converters/chain-converter.js';
// Additional converters can be imported here as they are created

/**
 * Create a new TypeScript emitter with default configuration
 */
export function createTypeScriptEmitter(): TypeScriptEmitter {
  return new TypeScriptEmitter();
}

/**
 * Quick generation utility function
 */
export async function generateTypeScriptCode(
  graph: any,
  context: any
): Promise<import('./emitter.js').CodeGenerationResult> {
  const emitter = createTypeScriptEmitter();
  return await emitter.generateCode(graph, context);
}
