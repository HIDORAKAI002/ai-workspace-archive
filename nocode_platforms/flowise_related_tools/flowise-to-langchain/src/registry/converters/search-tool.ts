/**
 * Search Tool Converters
 *
 * Converters for search tools including DuckDuckGoSearch and other search implementations.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Search Tool converter with common functionality
 */
abstract class BaseSearchToolConverter extends BaseConverter {
  readonly category = 'tool';

  protected generateToolConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
  } {
    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config: this.extractToolConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractToolConfig(node: IRNode): Record<string, unknown>;

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'tool');
    const config = this.generateToolConfiguration(node, _context);
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        this.generateImport(config.packageName, config.imports),
        [config.packageName],
        node.id,
        1
      )
    );

    // Configuration fragment
    const configStr = this.generateConfigurationString(config.config);
    const initCode = configStr
      ? `const ${variableName} = new ${config.className}(${configStr});`
      : `const ${variableName} = new ${config.className}();`;

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [config.className],
        node.id,
        100
      )
    );

    return fragments;
  }

  protected generateConfigurationString(
    config: Record<string, unknown>
  ): string {
    const entries = Object.entries(config);
    if (entries.length === 0) return '';

    const configPairs = entries.map(([key, value]) => {
      return `${key}: ${this.formatParameterValue(value)}`;
    });

    return `{\n  ${configPairs.join(',\n  ')}\n}`;
  }
}

/**
 * DuckDuckGo Search Tool Converter
 */
export class DuckDuckGoSearchConverter extends BaseSearchToolConverter {
  readonly flowiseType = 'duckDuckGoSearch';

  protected getRequiredImports(): string[] {
    return ['DuckDuckGoSearch'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/duckduckgo_search';
  }

  protected getClassName(): string {
    return 'DuckDuckGoSearch';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Extract maxResults parameter if provided
    const maxResults = this.getParameterValue(node, 'maxResults');
    if (maxResults !== undefined) {
      config['maxResults'] = maxResults;
    } else {
      // Default to 4 results as commonly used in LangChain
      config['maxResults'] = 4;
    }

    // Extract searchParams if provided (for advanced search options)
    const searchParams = this.getParameterValue(node, 'searchParams');
    if (searchParams) {
      config['searchParams'] = searchParams;
    }

    // Extract timeout parameter if provided
    const timeout = this.getParameterValue(node, 'timeout');
    if (timeout !== undefined) {
      config['timeout'] = timeout;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2', '0.2.3', '0.2.33'];
  }
}
