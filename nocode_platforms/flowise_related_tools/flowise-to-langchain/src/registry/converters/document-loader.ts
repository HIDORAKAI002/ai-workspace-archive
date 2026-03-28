/**
 * Document Loader Converters
 *
 * Converters for various document loader types including PDF, CSV, JSON, etc.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Document Loader converter with common functionality
 */
abstract class BaseDocumentLoaderConverter extends BaseConverter {
  readonly category = 'documentloader';

  /**
   * Override getParameterValue to support data.inputs structure
   */
  protected override getParameterValue<T = unknown>(
    node: IRNode,
    paramName: string,
    defaultValue?: T
  ): T | undefined {
    // First try the standard parameters array
    if (node.parameters) {
      const param = node.parameters.find((p) => p.name === paramName);
      if (param) {
        return (param.value as T) ?? defaultValue;
      }
    }

    // Then try data.inputs structure (common in Flowise)
    if (node.data?.inputs && paramName in node.data.inputs) {
      return (node.data.inputs[paramName] as T) ?? defaultValue;
    }

    return defaultValue;
  }

  protected generateDocumentLoaderConfiguration(
    node: IRNode,
    context: GenerationContext
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
      config: this.extractDocumentLoaderConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractDocumentLoaderConfig(
    node: IRNode
  ): Record<string, unknown>;

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'loader');
    const config = this.generateDocumentLoaderConfiguration(node, _context);
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

    // Generate initialization code based on loader type
    const initCode = this.generateInitializationCode(
      node,
      variableName,
      config
    );

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [config.className],
        node.id,
        130
      )
    );

    return fragments;
  }

  protected generateInitializationCode(
    node: IRNode,
    variableName: string,
    config: ReturnType<typeof this.generateDocumentLoaderConfiguration>
  ): string {
    // For file-based loaders, the file path is typically the first parameter
    const filePath = this.getParameterValue(node, 'filePath');
    const url =
      this.getParameterValue(node, 'url') ||
      this.getParameterValue(node, 'webPath');

    // Handle file-based loaders (PDF, CSV, Text, Docx, Excel)
    if (
      filePath &&
      [
        'PDFLoader',
        'CSVLoader',
        'TextLoader',
        'DocxLoader',
        'ExcelLoader',
      ].includes(config.className)
    ) {
      const otherConfig = { ...config.config };
      delete otherConfig.filePath;
      const configStr = this.generateConfigurationString(otherConfig);
      return configStr
        ? `const ${variableName} = new ${config.className}(${this.formatParameterValue(filePath)}, ${configStr});`
        : `const ${variableName} = new ${config.className}(${this.formatParameterValue(filePath)});`;
    }

    // Handle web-based loaders
    if (
      url &&
      ['WebBaseLoader', 'CheerioWebBaseLoader'].includes(config.className)
    ) {
      const otherConfig = { ...config.config };
      delete otherConfig.url;
      delete otherConfig.webPath;
      const configStr = this.generateConfigurationString(otherConfig);
      return configStr
        ? `const ${variableName} = new ${config.className}(${this.formatParameterValue(url)}, ${configStr});`
        : `const ${variableName} = new ${config.className}(${this.formatParameterValue(url)});`;
    }

    // Handle directory loader
    if (config.className === 'DirectoryLoader') {
      const directoryPath = this.getParameterValue(node, 'directoryPath');
      if (directoryPath) {
        const otherConfig = { ...config.config };
        delete otherConfig.directoryPath;
        const configStr = this.generateConfigurationString(otherConfig);
        return configStr
          ? `const ${variableName} = new ${config.className}(${this.formatParameterValue(directoryPath)}, ${configStr});`
          : `const ${variableName} = new ${config.className}(${this.formatParameterValue(directoryPath)});`;
      }
    }

    // Default: use config object
    const configStr = this.generateConfigurationString(config.config);
    return configStr
      ? `const ${variableName} = new ${config.className}(${configStr});`
      : `const ${variableName} = new ${config.className}();`;
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
 * PDF Loader Converter
 */
export class PDFLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'pdfLoader';

  protected getRequiredImports(): string[] {
    return ['PDFLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/fs/pdf';
  }

  protected getClassName(): string {
    return 'PDFLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const filePath = this.getParameterValue(node, 'filePath');
    if (filePath) {
      config.filePath = filePath;
    }

    const splitPages = this.getParameterValue(node, 'splitPages', true);
    if (splitPages !== undefined) {
      config.splitPages = splitPages;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/fs/pdf', 'pdf-parse'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * CSV Loader Converter
 */
export class CSVLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'csvLoader';

  protected getRequiredImports(): string[] {
    return ['CSVLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/fs/csv';
  }

  protected getClassName(): string {
    return 'CSVLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const filePath = this.getParameterValue(node, 'filePath');
    if (filePath) {
      config.filePath = filePath;
    }

    const column = this.getParameterValue(node, 'column');
    if (column) {
      config.column = column;
    }

    const separator = this.getParameterValue(node, 'separator', ',');
    if (separator) {
      config.separator = separator;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/fs/csv', 'csv-parser'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * JSON Loader Converter
 */
export class JSONLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'jsonLoader';

  protected getRequiredImports(): string[] {
    return ['JSONLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/fs/json';
  }

  protected getClassName(): string {
    return 'JSONLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const filePath = this.getParameterValue(node, 'filePath');
    if (filePath) {
      config.filePath = filePath;
    }

    const pointers = this.getParameterValue(node, 'pointers');
    if (pointers) {
      config.pointers = pointers;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/fs/json'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Text Loader Converter
 */
export class TextLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'textLoader';

  protected getRequiredImports(): string[] {
    return ['TextLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/fs/text';
  }

  protected getClassName(): string {
    return 'TextLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const filePath = this.getParameterValue(node, 'filePath');
    if (filePath) {
      config.filePath = filePath;
    }

    const encoding = this.getParameterValue(node, 'encoding', 'utf8');
    if (encoding) {
      config.encoding = encoding;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/fs/text'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Docx Loader Converter
 */
export class DocxLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'docxLoader';

  protected getRequiredImports(): string[] {
    return ['DocxLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/fs/docx';
  }

  protected getClassName(): string {
    return 'DocxLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const filePath = this.getParameterValue(node, 'filePath');
    if (filePath) {
      config.filePath = filePath;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/fs/docx', 'mammoth'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Directory Loader Converter
 */
export class DirectoryLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'directoryLoader';

  protected getRequiredImports(): string[] {
    return ['DirectoryLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/fs/directory';
  }

  protected getClassName(): string {
    return 'DirectoryLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const directoryPath = this.getParameterValue(node, 'directoryPath');
    if (directoryPath) {
      config.directoryPath = directoryPath;
    }

    const extensions = this.getParameterValue(node, 'extensions', ['.txt']);
    if (extensions) {
      config.extensions = extensions;
    }

    const recursive = this.getParameterValue(node, 'recursive', true);
    if (recursive !== undefined) {
      config.recursive = recursive;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/fs/directory'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Excel Loader Converter
 */
export class ExcelLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'excelLoader';

  protected getRequiredImports(): string[] {
    return ['ExcelLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/fs/excel';
  }

  protected getClassName(): string {
    return 'ExcelLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // filePath is handled separately in generateInitializationCode
    const sheetName = this.getParameterValue(node, 'sheetName');
    if (sheetName) {
      config.sheetName = sheetName;
    }

    const headerRow = this.getParameterValue(node, 'headerRow', 1);
    if (headerRow !== undefined && headerRow !== 1) {
      config.headerRow = headerRow;
    }

    const range = this.getParameterValue(node, 'range');
    if (range) {
      config.range = range;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/fs/excel', 'xlsx'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Web Base Loader Converter
 */
export class WebBaseLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'webBaseLoader';

  protected getRequiredImports(): string[] {
    return ['WebBaseLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/web/web_base';
  }

  protected getClassName(): string {
    return 'WebBaseLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const url =
      this.getParameterValue(node, 'url') ||
      this.getParameterValue(node, 'webPath');
    if (url) {
      config.url = url;
    }

    const selector = this.getParameterValue(node, 'selector');
    if (selector) {
      config.selector = selector;
    }

    const maxConcurrency = this.getParameterValue(node, 'maxConcurrency', 1);
    if (maxConcurrency !== undefined) {
      config.maxConcurrency = maxConcurrency;
    }

    const timeout = this.getParameterValue(node, 'timeout');
    if (timeout !== undefined) {
      config.timeout = timeout;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/web/web_base'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }
}

/**
 * Web Loader Converter (Alias for CheerioWebBaseLoader)
 */
export class WebLoaderConverter extends BaseDocumentLoaderConverter {
  readonly flowiseType = 'webLoader';

  protected getRequiredImports(): string[] {
    return ['CheerioWebBaseLoader'];
  }

  protected getPackageName(): string {
    return '@langchain/community/document_loaders/web/cheerio';
  }

  protected getClassName(): string {
    return 'CheerioWebBaseLoader';
  }

  protected extractDocumentLoaderConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const webPath =
      this.getParameterValue(node, 'webPath') ||
      this.getParameterValue(node, 'url');
    if (webPath) {
      config.webPath = webPath;
    }

    const selector = this.getParameterValue(node, 'selector');
    if (selector) {
      config.selector = selector;
    }

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community/document_loaders/web/cheerio', 'cheerio'];
  }

  override getSupportedVersions(): string[] {
    return ['0.2.0', '0.2.1', '0.2.2'];
  }

  override isDeprecated(): boolean {
    return true;
  }

  override getReplacementType(): string | undefined {
    return 'webBaseLoader';
  }
}
