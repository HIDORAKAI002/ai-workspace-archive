/**
 * Zep Memory Converter
 *
 * Converter for ZepMemory - a long-term memory service for AI Assistant apps
 * that provides automatic summarization, message enrichment, and vector search.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Zep Memory Converter
 */
export class ZepMemoryConverter extends BaseConverter {
  readonly flowiseType = 'zepMemory';
  readonly category = 'memory';

  protected getRequiredImports(): string[] {
    return ['ZepMemory'];
  }

  protected getPackageName(): string {
    return '@langchain/community/memory/zep';
  }

  protected getClassName(): string {
    return 'ZepMemory';
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }

  protected extractMemoryConfig(node: IRNode): Record<string, unknown> {
    // Extract Zep-specific configuration
    const baseURL = this.getParameterValue<string>(node, 'baseURL', undefined);
    const apiKey = this.getParameterValue<string>(node, 'apiKey', undefined);
    const sessionId = this.getParameterValue<string>(
      node,
      'sessionId',
      undefined
    );
    const memoryKey = this.getParameterValue<string>(
      node,
      'memoryKey',
      'chat_history'
    );
    const inputKey = this.getParameterValue<string>(
      node,
      'inputKey',
      'question'
    );
    const outputKey = this.getParameterValue<string>(node, 'outputKey', 'text');
    const returnMessages = this.getParameterValue<boolean>(
      node,
      'returnMessages',
      false
    );

    // Build configuration object
    const config: Record<string, unknown> = {
      memoryKey,
      inputKey,
      outputKey,
      returnMessages,
    };

    // Add required Zep configuration
    if (baseURL) {
      config['baseURL'] = baseURL;
    }
    if (apiKey) {
      config['apiKey'] = apiKey;
    }
    if (sessionId) {
      config['sessionId'] = sessionId;
    }

    return config;
  }

  protected generateMemoryInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>
  ): string {
    // Check for required parameters
    const hasRequiredParams = config['baseURL'] && config['sessionId'];

    if (!hasRequiredParams) {
      // Generate with placeholders and comments for missing required params
      const configEntries: string[] = [];

      if (!config['baseURL']) {
        configEntries.push(
          '  // baseURL: "YOUR_ZEP_API_URL", // Required: Zep server URL'
        );
      } else {
        configEntries.push(
          `  baseURL: ${this.formatParameterValue(config['baseURL'])}`
        );
      }

      if (!config['apiKey']) {
        configEntries.push(
          '  // apiKey: "YOUR_ZEP_API_KEY", // Optional: Zep API key if authentication is enabled'
        );
      } else {
        configEntries.push(
          `  apiKey: ${this.formatParameterValue(config['apiKey'])}`
        );
      }

      if (!config['sessionId']) {
        configEntries.push(
          '  // sessionId: "SESSION_ID", // Required: Unique session identifier'
        );
      } else {
        configEntries.push(
          `  sessionId: ${this.formatParameterValue(config['sessionId'])}`
        );
      }

      // Add other configuration options
      configEntries.push(
        `  memoryKey: ${this.formatParameterValue(config['memoryKey'])}`
      );
      configEntries.push(
        `  inputKey: ${this.formatParameterValue(config['inputKey'])}`
      );
      configEntries.push(
        `  outputKey: ${this.formatParameterValue(config['outputKey'])}`
      );
      configEntries.push(
        `  returnMessages: ${this.formatParameterValue(config['returnMessages'])}`
      );

      return `const ${variableName} = new ${className}({\n${configEntries.join(',\n')}\n});`;
    }

    // Generate normal instantiation with all parameters
    const configEntries = Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `  ${key}: ${this.formatParameterValue(value)}`)
      .join(',\n');

    return `const ${variableName} = new ${className}({\n${configEntries}\n});`;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'zepMemory');
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        this.generateImport(this.getPackageName(), this.getRequiredImports()),
        [this.getPackageName()],
        node.id,
        1
      )
    );

    // Extract configuration
    const config = this.extractMemoryConfig(node);

    // Generate the memory instantiation
    const instantiation = this.generateMemoryInstantiation(
      variableName,
      this.getClassName(),
      config
    );

    // Declaration fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_declaration`,
        'declaration',
        instantiation,
        [],
        node.id,
        2,
        { exports: [variableName] }
      )
    );

    // Add a comment about Zep server requirements if baseURL is missing
    if (!config['baseURL']) {
      const setupComment = `// Note: ZepMemory requires a running Zep server instance.\n// See https://github.com/getzep/zep for setup instructions.\n// You can install Zep using Docker: docker run -p 8000:8000 ghcr.io/getzep/zep:latest\n`;

      fragments.push(
        this.createCodeFragment(
          `${node.id}_setup_comment`,
          'initialization',
          setupComment,
          [],
          node.id,
          0
        )
      );
    }

    return fragments;
  }

  protected override formatParameterValue(value: unknown): string {
    if (typeof value === 'string') {
      return `"${value}"`;
    }
    if (typeof value === 'boolean' || typeof value === 'number') {
      return String(value);
    }
    if (value === null) {
      return 'null';
    }
    if (value === undefined) {
      return 'undefined';
    }
    if (Array.isArray(value)) {
      return `[${value.map((v) => this.formatParameterValue(v)).join(', ')}]`;
    }
    if (typeof value === 'object') {
      const entries = Object.entries(value)
        .map(([k, v]) => `${k}: ${this.formatParameterValue(v)}`)
        .join(', ');
      return `{ ${entries} }`;
    }
    return JSON.stringify(value);
  }
}
