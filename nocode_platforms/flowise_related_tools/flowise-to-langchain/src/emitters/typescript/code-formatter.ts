/**
 * Code Formatter for TypeScript Code Generation
 *
 * Provides code formatting and beautification for generated TypeScript code.
 */

import { GenerationContext } from '../../ir/types.js';

export interface FormattingOptions {
  indentSize: number;
  useSpaces: boolean;
  semicolons: boolean;
  singleQuotes: boolean;
  trailingCommas: boolean;
  printWidth: number;
  tabWidth: number;
  insertFinalNewline: boolean;
}

/**
 * Default formatting options based on common TypeScript practices
 */
export const defaultFormattingOptions: FormattingOptions = {
  indentSize: 2,
  useSpaces: true,
  semicolons: true,
  singleQuotes: true,
  trailingCommas: true,
  printWidth: 80,
  tabWidth: 2,
  insertFinalNewline: true,
};

/**
 * Code formatter for TypeScript code generation
 */
export class CodeFormatter {
  private options: FormattingOptions;

  constructor(options: Partial<FormattingOptions> = {}) {
    this.options = { ...defaultFormattingOptions, ...options };
  }

  /**
   * Format TypeScript code
   */
  async format(
    code: string,
    _language: 'typescript' | 'javascript' = 'typescript'
  ): Promise<string> {
    // Basic formatting - in a real implementation, you might use prettier
    let formatted = code;

    // Normalize line endings
    formatted = formatted.replace(/\r\n/g, '\n');

    // Remove excessive blank lines
    formatted = formatted.replace(/\n\s*\n\s*\n/g, '\n\n');

    // Fix indentation
    formatted = this.fixIndentation(formatted);

    // Fix semicolons
    if (this.options.semicolons) {
      formatted = this.addMissingSemicolons(formatted);
    } else {
      formatted = this.removeSemicolons(formatted);
    }

    // Fix quotes
    formatted = this.normalizeQuotes(formatted);

    // Fix trailing commas
    if (this.options.trailingCommas) {
      formatted = this.addTrailingCommas(formatted);
    }

    // Ensure final newline
    if (this.options.insertFinalNewline && !formatted.endsWith('\n')) {
      formatted += '\n';
    }

    return formatted.trim() + (this.options.insertFinalNewline ? '\n' : '');
  }

  /**
   * Update formatting options from generation context
   */
  updateFromContext(context: GenerationContext): void {
    if (context.codeStyle) {
      this.options = {
        ...this.options,
        indentSize: context.codeStyle.indentSize,
        useSpaces: context.codeStyle.useSpaces,
        semicolons: context.codeStyle.semicolons,
        singleQuotes: context.codeStyle.singleQuotes,
        trailingCommas: context.codeStyle.trailingCommas,
      };
    }
  }

  /**
   * Format a code block with specific indentation
   */
  formatBlock(code: string, indentLevel: number = 0): string {
    const indent = this.getIndentString(indentLevel);
    return code
      .split('\n')
      .map((line) => (line.trim() ? indent + line.trim() : ''))
      .join('\n');
  }

  /**
   * Format function parameters
   */
  formatParameters(
    params: Array<{ name: string; type?: string; defaultValue?: string }>
  ): string {
    if (params.length === 0) return '()';

    const formatted = params.map((param) => {
      let result = param.name;
      if (param.type) {
        result += `: ${param.type}`;
      }
      if (param.defaultValue !== undefined) {
        result += ` = ${param.defaultValue}`;
      }
      return result;
    });

    // Single line if short enough
    const singleLine = `(${formatted.join(', ')})`;
    if (singleLine.length <= this.options.printWidth) {
      return singleLine;
    }

    // Multi-line for longer parameter lists
    const indent = this.getIndentString(1);
    return `(\n${formatted.map((p) => indent + p).join(',\n')}\n)`;
  }

  /**
   * Format object literal
   */
  formatObject(obj: Record<string, unknown>, indentLevel: number = 0): string {
    if (Object.keys(obj).length === 0) return '{}';

    const indent = this.getIndentString(indentLevel + 1);
    const closeIndent = this.getIndentString(indentLevel);

    const entries = Object.entries(obj).map(([key, value]) => {
      const formattedKey = this.needsQuotes(key) ? this.quote(key) : key;
      const formattedValue = this.formatValue(value, indentLevel + 1);
      return `${indent}${formattedKey}: ${formattedValue}`;
    });

    // const trailingComma = this.options.trailingCommas ? ',' : ''; // Used in future logic
    const lastEntry = entries[entries.length - 1];
    if (lastEntry && this.options.trailingCommas) {
      entries[entries.length - 1] = lastEntry + ',';
    }

    return `{\n${entries.join(',\n')}\n${closeIndent}}`;
  }

  /**
   * Format array literal
   */
  formatArray(arr: unknown[], indentLevel: number = 0): string {
    if (arr.length === 0) return '[]';

    const formatted = arr.map((item) => this.formatValue(item, indentLevel));

    // Single line if short enough
    const singleLine = `[${formatted.join(', ')}]`;
    if (singleLine.length <= this.options.printWidth) {
      return singleLine;
    }

    // Multi-line for longer arrays
    const indent = this.getIndentString(indentLevel + 1);
    const closeIndent = this.getIndentString(indentLevel);
    const trailingComma = this.options.trailingCommas ? ',' : '';

    return `[\n${formatted.map((v) => indent + v).join(',\n')}${trailingComma}\n${closeIndent}]`;
  }

  /**
   * Format a value based on its type
   */
  private formatValue(value: unknown, indentLevel: number = 0): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'boolean') return String(value);
    if (typeof value === 'number') return String(value);
    if (typeof value === 'string') return this.quote(value);
    if (Array.isArray(value)) return this.formatArray(value, indentLevel);
    if (typeof value === 'object')
      return this.formatObject(value as Record<string, unknown>, indentLevel);
    return String(value);
  }

  /**
   * Fix indentation throughout the code
   */
  private fixIndentation(code: string): string {
    const lines = code.split('\n');
    const indentChar = this.options.useSpaces ? ' ' : '\t';
    const indentSize = this.options.useSpaces ? this.options.indentSize : 1;
    let indentLevel = 0;

    const result: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();

      if (!trimmed) {
        result.push('');
        continue;
      }

      // Decrease indent for closing brackets
      if (
        trimmed.match(/^[}\])]/) ||
        trimmed.startsWith('} else') ||
        trimmed.startsWith('} catch') ||
        trimmed.startsWith('} finally')
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Apply indentation
      const indent = indentChar.repeat(indentLevel * indentSize);
      result.push(indent + trimmed);

      // Increase indent for opening brackets
      if (
        trimmed.match(/[{[(]\s*$/) ||
        trimmed.endsWith(' {') ||
        trimmed.endsWith(' => {')
      ) {
        indentLevel++;
      }

      // Handle specific TypeScript patterns
      if (trimmed.includes('if (') && trimmed.endsWith(') {')) indentLevel++;
      if (trimmed.includes('else {')) indentLevel++;
      if (trimmed.includes('try {')) indentLevel++;
      if (trimmed.includes('catch (') && trimmed.endsWith(') {')) indentLevel++;
      if (trimmed.includes('finally {')) indentLevel++;
      if (trimmed.includes('function') && trimmed.endsWith(') {'))
        indentLevel++;
      if (trimmed.match(/^\w+\s*\([^)]*\)\s*\{$/)) indentLevel++;
    }

    return result.join('\n');
  }

  /**
   * Add missing semicolons
   */
  private addMissingSemicolons(code: string): string {
    const lines = code.split('\n');
    return lines
      .map((line) => {
        const trimmed = line.trim();

        // Skip empty lines, comments, and lines that already end with semicolon
        if (
          !trimmed ||
          trimmed.startsWith('//') ||
          trimmed.startsWith('/*') ||
          trimmed.endsWith(';')
        ) {
          return line;
        }

        // Skip lines that shouldn't have semicolons
        if (
          trimmed.endsWith('{') ||
          trimmed.endsWith('}') ||
          trimmed.includes('if (') ||
          trimmed.includes('else') ||
          trimmed.includes('try') ||
          trimmed.includes('catch') ||
          trimmed.includes('finally') ||
          trimmed.includes('function') ||
          trimmed.includes('class') ||
          trimmed.includes('interface') ||
          trimmed.includes('type ') ||
          trimmed.includes('enum ')
        ) {
          return line;
        }

        // Add semicolon to statements
        if (
          trimmed.includes('import ') ||
          trimmed.includes('export ') ||
          trimmed.includes('const ') ||
          trimmed.includes('let ') ||
          trimmed.includes('var ') ||
          trimmed.includes('return ') ||
          trimmed.includes('throw ') ||
          trimmed.includes('break') ||
          trimmed.includes('continue') ||
          trimmed.match(/^\w+\s*\(/)
        ) {
          return line + ';';
        }

        return line;
      })
      .join('\n');
  }

  /**
   * Remove semicolons
   */
  private removeSemicolons(code: string): string {
    return code.replace(/;(\s*$)/gm, '$1');
  }

  /**
   * Normalize quotes to single or double based on preference
   */
  private normalizeQuotes(code: string): string {
    const targetQuote = this.options.singleQuotes ? "'" : '"';
    const sourceQuote = this.options.singleQuotes ? '"' : "'";

    // Simple replacement - in a real implementation, you'd need to handle escaped quotes
    return code.replace(new RegExp(sourceQuote, 'g'), targetQuote);
  }

  /**
   * Add trailing commas to multiline structures
   */
  private addTrailingCommas(code: string): string {
    if (!this.options.trailingCommas) return code;

    // Add trailing commas to object literals and arrays
    return code.replace(/([^,\s])\s*\n\s*([}\]])/g, '$1,\n$2');
  }

  /**
   * Get indent string for given level
   */
  private getIndentString(level: number): string {
    const char = this.options.useSpaces ? ' ' : '\t';
    const size = this.options.useSpaces ? this.options.indentSize : 1;
    return char.repeat(level * size);
  }

  /**
   * Check if object key needs quotes
   */
  private needsQuotes(key: string): boolean {
    return !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
  }

  /**
   * Quote a string value
   */
  private quote(value: string): string {
    const quote = this.options.singleQuotes ? "'" : '"';
    // Escape quotes in the string
    const escaped = value.replace(new RegExp(quote, 'g'), '\\' + quote);
    return quote + escaped + quote;
  }

  /**
   * Format TypeScript interface
   */
  formatInterface(
    name: string,
    properties: Record<string, string>,
    exported: boolean = true
  ): string {
    const exportKeyword = exported ? 'export ' : '';

    if (Object.keys(properties).length === 0) {
      return `${exportKeyword}interface ${name} {}`;
    }

    const indent = this.getIndentString(1);
    const props = Object.entries(properties).map(([key, type]) => {
      const formattedKey = this.needsQuotes(key) ? this.quote(key) : key;
      return `${indent}${formattedKey}: ${type};`;
    });

    return `${exportKeyword}interface ${name} {\n${props.join('\n')}\n}`;
  }

  /**
   * Format TypeScript type alias
   */
  formatTypeAlias(
    name: string,
    type: string,
    exported: boolean = true
  ): string {
    const exportKeyword = exported ? 'export ' : '';
    return `${exportKeyword}type ${name} = ${type};`;
  }

  /**
   * Format function declaration
   */
  formatFunction(
    name: string,
    params: Array<{ name: string; type?: string; defaultValue?: string }>,
    returnType: string,
    body: string,
    options: { async?: boolean; exported?: boolean } = {}
  ): string {
    const asyncKeyword = options.async ? 'async ' : '';
    const exportKeyword = options.exported ? 'export ' : '';
    const formattedParams = this.formatParameters(params);
    const formattedBody = this.formatBlock(body, 1);

    return `${exportKeyword}${asyncKeyword}function ${name}${formattedParams}: ${returnType} {\n${formattedBody}\n}`;
  }
}
