/**
 * Legacy converter compatibility wrapper
 * This file provides backward compatibility for tests expecting FlowiseConverter
 */

const { FlowiseToLangChainConverter } = require('./index.js');
const { TypeScriptEmitter } = require('./emitters/typescript/emitter.js');

/**
 * Legacy FlowiseConverter wrapper for tests
 */
class FlowiseConverter {
  constructor(options = {}) {
    this.converter = new FlowiseToLangChainConverter(options);
    this.emitter = new TypeScriptEmitter();
  }

  /**
   * Convert a Flowise flow to LangChain code
   * Returns a flat structure with code property for backward compatibility
   */
  async convertFlow(flow) {
    try {
      // Convert using the main converter
      const result = await this.converter.convert(flow);

      if (!result.success) {
        throw new Error(result.errors.join('; '));
      }

      // Flatten the result to match expected test structure
      const codeGenerationResult = result.result;

      // Combine all code fragments into a single code string
      const code = codeGenerationResult.files
        .map((file) => file.content)
        .join('\n\n');

      // Extract dependencies from package.json if present
      const packageFile = codeGenerationResult.files.find(
        (f) => f.path === 'package.json'
      );
      let dependencies = [];

      if (packageFile) {
        try {
          const packageData = JSON.parse(packageFile.content);
          dependencies = Object.keys(packageData.dependencies || {});
        } catch (e) {
          // Ignore parse errors
        }
      }

      // Return flat structure expected by tests
      return {
        success: true,
        code,
        dependencies,
        metadata: {
          nodeCount: flow.nodes?.length || 0,
          connectionCount: flow.edges?.length || 0,
          hasVectorStore: flow.nodes?.some(
            (n) =>
              n.data?.category === 'vectorstore' ||
              n.data?.type?.includes('vector') ||
              n.data?.name?.toLowerCase().includes('vector')
          ),
          hasEmbeddings: flow.nodes?.some(
            (n) =>
              n.data?.category === 'embeddings' ||
              n.data?.type?.includes('embedding') ||
              n.data?.name?.toLowerCase().includes('embedding')
          ),
        },
        errors: result.errors || [],
        warnings: result.warnings || [],
      };
    } catch (error) {
      return {
        success: false,
        code: '',
        dependencies: [],
        metadata: {
          nodeCount: 0,
          connectionCount: 0,
          hasVectorStore: false,
          hasEmbeddings: false,
        },
        errors: [error.message],
        warnings: [],
      };
    }
  }
}

module.exports = {
  FlowiseConverter,
};
