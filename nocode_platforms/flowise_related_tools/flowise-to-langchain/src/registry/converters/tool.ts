/**
 * Tool Converters
 *
 * Converters for various tool types including Calculator, SerpAPI, WebBrowser,
 * and other tool implementations.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Tool converter with common functionality
 */
abstract class BaseToolConverter extends BaseConverter {
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

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
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
 * Calculator Tool Converter
 */
export class CalculatorConverter extends BaseToolConverter {
  readonly flowiseType = 'calculator';

  protected override getRequiredImports(): string[] {
    return ['Calculator'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/tools/calculator';
  }

  protected override getClassName(): string {
    return 'Calculator';
  }

  protected override extractToolConfig(_node: IRNode): Record<string, unknown> {
    // Calculator tool has no configuration parameters
    return {};
  }

  override getDependencies(): string[] {
    return ['@langchain/community/tools/calculator'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Search API (SerpAPI) Tool Converter
 */
export class SearchAPIConverter extends BaseToolConverter {
  readonly flowiseType = 'serpAPI';

  protected override getRequiredImports(): string[] {
    return ['SerpAPI'];
  }

  protected override getPackageName(): string {
    return '@langchain/community/tools/serpapi';
  }

  protected override getClassName(): string {
    return 'SerpAPI';
  }

  protected override extractToolConfig(_node: IRNode): Record<string, unknown> {
    // SerpAPI constructor takes a string parameter (API key), not an object
    const apiKey = this.getParameterValue(_node, 'apiKey');
    if (apiKey) {
      return { _apiKey: apiKey };
    } else {
      return { _apiKey: 'process.env.SERPAPI_API_KEY' };
    }
  }

  override getDependencies(): string[] {
    return ['@langchain/community/tools/serpapi'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }

  // Override to generate string parameter constructor
  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'tool');
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

    // Get API key parameter
    const apiKey = this.getParameterValue(node, 'apiKey');
    const keyParam = apiKey
      ? this.formatParameterValue(apiKey)
      : 'process.env.SERPAPI_API_KEY';

    // Configuration fragment - SerpAPI takes string parameter
    const initCode = `const ${variableName} = new SerpAPI(${keyParam});`;

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        ['SerpAPI'],
        node.id,
        100
      )
    );

    return fragments;
  }
}

/**
 * Web Browser Tool Converter
 */
export class WebBrowserConverter extends BaseToolConverter {
  readonly flowiseType = 'webBrowser';

  protected override getRequiredImports(): string[] {
    return ['WebBrowser'];
  }

  protected override getPackageName(): string {
    return 'langchain/tools/webbrowser';
  }

  protected override getClassName(): string {
    return 'WebBrowser';
  }

  protected override extractToolConfig(_node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Web browser requires model and embeddings from connections
    // This would need to be handled by the connection system
    config['model'] = `\${${this.generateVariableName(_node, 'llm')}}`;
    config['embeddings'] =
      `\${${this.generateVariableName(_node, 'embeddings')}}`;

    const headless = this.getParameterValue(_node, 'headless');
    if (headless !== undefined) {
      config['headless'] = headless;
    }

    const timeout = this.getParameterValue(_node, 'timeout');
    if (timeout !== undefined) {
      config['timeout'] = timeout;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['langchain/tools/webbrowser'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Custom Tool Converter
 */
export class CustomToolConverter extends BaseToolConverter {
  readonly flowiseType = 'customTool';

  protected override getRequiredImports(): string[] {
    return ['Tool'];
  }

  protected override getPackageName(): string {
    return 'langchain/tools';
  }

  protected override getClassName(): string {
    return 'Tool';
  }

  protected override extractToolConfig(_node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const name = this.getParameterValue(_node, 'name');
    if (name) {
      config['name'] = name;
    }

    const description = this.getParameterValue(_node, 'description');
    if (description) {
      config['description'] = description;
    }

    const schema = this.getParameterValue(_node, 'schema');
    if (schema) {
      config['schema'] = schema;
    }

    const func = this.getParameterValue(_node, 'func');
    if (func) {
      config['func'] = func;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['langchain/tools'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Shell Tool Converter
 */
export class ShellToolConverter extends BaseToolConverter {
  readonly flowiseType = 'shellTool';

  protected override getRequiredImports(): string[] {
    return ['ShellTool'];
  }

  protected override getPackageName(): string {
    return 'langchain/tools/shell';
  }

  protected override getClassName(): string {
    return 'ShellTool';
  }

  protected override extractToolConfig(_node: IRNode): Record<string, unknown> {
    // Shell tool has no configuration parameters
    return {};
  }

  override getDependencies(): string[] {
    return ['langchain/tools/shell'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Request Tool Converter
 */
export class RequestToolConverter extends BaseToolConverter {
  readonly flowiseType = 'requestTool';

  protected override getRequiredImports(): string[] {
    return ['RequestsGetTool', 'RequestsPostTool'];
  }

  protected override getPackageName(): string {
    return 'langchain/tools';
  }

  protected override getClassName(): string {
    // This will be called with actual node in convert method
    return 'RequestsGetTool'; // Default, will be overridden in convert
  }

  protected override extractToolConfig(_node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const headers = this.getParameterValue(_node, 'headers');
    if (headers) {
      config['headers'] = headers;
    }

    return config;
  }

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const method = this.getParameterValue(node, 'method', 'GET');
    const className =
      method?.toString().toUpperCase() === 'POST'
        ? 'RequestsPostTool'
        : 'RequestsGetTool';

    const variableName = this.generateVariableName(node, 'tool');
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

    // Configuration fragment
    const config = this.extractToolConfig(node);
    const configStr = this.generateRequestConfigString(config);
    const initCode = configStr
      ? `const ${variableName} = new ${className}(${configStr});`
      : `const ${variableName} = new ${className}();`;

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [className],
        node.id,
        100
      )
    );

    return fragments;
  }

  private generateRequestConfigString(config: Record<string, unknown>): string {
    const entries = Object.entries(config);
    if (entries.length === 0) return '';

    const configPairs = entries.map(([key, value]) => {
      return `${key}: ${this.formatParameterValue(value)}`;
    });

    return `{\n  ${configPairs.join(',\n  ')}\n}`;
  }

  override getDependencies(): string[] {
    return ['langchain/tools'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * File System Tool Converter
 */
export class FileSystemConverter extends BaseToolConverter {
  readonly flowiseType = 'fileSystem';

  protected override getRequiredImports(): string[] {
    return ['ReadFileTool', 'WriteFileTool', 'ListDirectoryTool'];
  }

  protected override getPackageName(): string {
    return 'langchain/tools/fs';
  }

  protected override getClassName(): string {
    // This will be called with actual node in convert method
    return 'ReadFileTool'; // Default, will be overridden in convert
  }

  protected override extractToolConfig(_node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const rootDir = this.getParameterValue(_node, 'rootDir');
    if (rootDir) {
      config['rootDir'] = rootDir;
    }

    return config;
  }

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const operation = this.getParameterValue(node, 'operation', 'read');
    let className = 'ReadFileTool';
    switch (operation?.toString().toLowerCase()) {
      case 'write':
        className = 'WriteFileTool';
        break;
      case 'list':
        className = 'ListDirectoryTool';
        break;
      default:
        className = 'ReadFileTool';
    }

    const variableName = this.generateVariableName(node, 'tool');
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

    // Configuration fragment
    const config = this.extractToolConfig(node);
    const configStr = this.generateFileSystemConfigString(config);
    const initCode = configStr
      ? `const ${variableName} = new ${className}(${configStr});`
      : `const ${variableName} = new ${className}();`;

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [className],
        node.id,
        100
      )
    );

    return fragments;
  }

  private generateFileSystemConfigString(
    config: Record<string, unknown>
  ): string {
    const entries = Object.entries(config);
    if (entries.length === 0) return '';

    const configPairs = entries.map(([key, value]) => {
      return `${key}: ${this.formatParameterValue(value)}`;
    });

    return `{\n  ${configPairs.join(',\n  ')}\n}`;
  }

  override getDependencies(): string[] {
    return ['langchain/tools/fs'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}
