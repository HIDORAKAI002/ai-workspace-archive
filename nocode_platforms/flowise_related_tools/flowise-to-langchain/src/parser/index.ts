/**
 * Flowise JSON Parser Module
 *
 * Complete parsing solution for Flowise chatflow exports with validation,
 * error handling, version detection, and analysis utilities.
 */

// Re-export everything from schema
export * from './schema.js';

// Re-export everything from parser
export * from './parser.js';

// Re-export everything from utils
export * from './utils.js';

// Convenience exports for common use cases
export {
  FlowiseParser as Parser,
  parseFlowiseJson as parse,
  parseFlowiseFile as parseFile,
  parseFlowiseUrl as parseUrl,
} from './parser.js';

export {
  analyzeFlow as analyze,
  calculateFlowStatistics as getStatistics,
  transformFlow as transform,
  mergeFlows as merge,
  compareFlows as compare,
} from './utils.js';

/**
 * Quick start function for basic parsing needs
 */
export async function quickParse(input: string | Buffer): Promise<{
  success: boolean;
  data?: any;
  errors?: string[];
}> {
  try {
    const { parseFlowiseJson } = await import('./parser.js');
    const content = Buffer.isBuffer(input) ? input.toString('utf-8') : input;
    const result = await parseFlowiseJson(content, { minimal: true });

    return {
      success: result.success,
      data: result.data,
      errors: result.errors.map((e) => e.message),
    };
  } catch (error) {
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

/**
 * Validate Flowise JSON without full parsing
 */
export async function validate(input: string): Promise<{
  isValid: boolean;
  errors: string[];
  warnings: string[];
}> {
  try {
    const { FlowiseParser } = await import('./parser.js');
    const parser = new FlowiseParser();
    const result = await parser.validate(input);

    return {
      isValid: result.isValid,
      errors: result.errors.map((e) => e.message),
      warnings: result.warnings.map((w) => w.message),
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
      warnings: [],
    };
  }
}
