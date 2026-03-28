/**
 * Tool Converter for Flowise Tool Nodes
 *
 * Converts Flowise tool nodes (like Calculator, WebBrowser, Custom Tools, etc.)
 * to LangChain tool implementations.
 */

import type {
  IRNode,
  IRConnection,
  CodeFragment,
  GenerationContext,
} from '../../../ir/types.js';
import { BaseConverter } from './base-converter.js';

export interface ToolConverter {
  convert(node: IRNode, _context: GenerationContext): CodeFragment[];
  getDependencies(node: IRNode, _context: GenerationContext): string[];
  canConvert(node: IRNode): boolean;
}

/**
 * Calculator Tool Converter
 */
export class CalculatorConverter
  extends BaseConverter
  implements ToolConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createImportFragment(
        'langchain-calculator-import',
        ['Calculator'],
        'langchain/tools/calculator'
      )
    );

    // Tool initialization
    const initCode = `const ${this.getVariableName(node)} = new Calculator();`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['Calculator'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context: GenerationContext): string[] {
    return ['langchain/tools/calculator'];
  }

  canConvert(node: IRNode): boolean {
    return node.type === 'calculator' || node.type === 'Calculator';
  }
}

/**
 * Web Browser Tool Converter
 */
export class WebBrowserConverter
  extends BaseConverter
  implements ToolConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    // Get connections from context or graph if available
    const connections: IRConnection[] = (_context as any).connections || [];
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-webbrowser-import',
        ['WebBrowser'],
        'langchain/tools/webbrowser'
      )
    );

    // Get connected LLM and embeddings
    const llmConnection = connections.find(
      (conn) => conn.target === node.id && conn.targetHandle === 'llm'
    );
    const embeddingsConnection = connections.find(
      (conn) => conn.target === node.id && conn.targetHandle === 'embeddings'
    );

    if (!llmConnection || !embeddingsConnection) {
      throw new Error(
        `WebBrowser tool ${node.id} requires both LLM and embeddings connections`
      );
    }

    // Tool initialization
    const llmVar = this.getVariableName({ id: llmConnection.source } as IRNode);
    const embeddingsVar = this.getVariableName({
      id: embeddingsConnection.source,
    } as IRNode);

    const initCode = `const ${this.getVariableName(node)} = new WebBrowser({
  model: ${llmVar},
  embeddings: ${embeddingsVar}
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['WebBrowser'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context: GenerationContext): string[] {
    return ['langchain/tools/webbrowser'];
  }

  canConvert(node: IRNode): boolean {
    return node.type === 'webBrowser' || node.type === 'WebBrowser';
  }
}

/**
 * Custom Tool Converter
 */
export class CustomToolConverter
  extends BaseConverter
  implements ToolConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-tool-import',
        ['Tool'],
        'langchain/tools'
      )
    );

    // Configuration parameters
    const name = this.getParameterValue(node, 'name', 'custom_tool');
    const description = this.getParameterValue(
      node,
      'description',
      'A custom tool'
    );
    const schema = this.getParameterValue(node, 'schema', '{}');
    const func = this.getParameterValue(
      node,
      'func',
      'async (input) => { return "Result"; }'
    );

    // Tool initialization
    const initCode = `const ${this.getVariableName(node)} = new Tool({
  name: "${name}",
  description: "${description}",
  schema: ${schema},
  func: ${func}
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['Tool'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context: GenerationContext): string[] {
    return ['langchain/tools'];
  }

  canConvert(node: IRNode): boolean {
    return node.type === 'customTool' || node.type === 'CustomTool';
  }
}

/**
 * Shell Tool Converter
 */
export class ShellToolConverter extends BaseConverter implements ToolConverter {
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-shell-import',
        ['ShellTool'],
        'langchain/tools/shell'
      )
    );

    // Tool initialization
    const initCode = `const ${this.getVariableName(node)} = new ShellTool();`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['ShellTool'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context: GenerationContext): string[] {
    return ['langchain/tools/shell'];
  }

  canConvert(node: IRNode): boolean {
    return node.type === 'shellTool' || node.type === 'ShellTool';
  }
}

/**
 * Search API Tool Converter (SerpAPI)
 */
export class SearchAPIConverter extends BaseConverter implements ToolConverter {
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-search-import',
        ['SerpAPI'],
        '@langchain/community/tools/serpapi'
      )
    );

    // Configuration parameters
    const apiKey = this.getParameterValue(
      node,
      'apiKey',
      'process.env.SERPAPI_API_KEY'
    );

    // Tool initialization - SerpAPI takes string parameter, not object
    const keyParam =
      typeof apiKey === 'string' && !apiKey.startsWith('process.env')
        ? `"${apiKey}"`
        : apiKey;
    const initCode = `const ${this.getVariableName(node)} = new SerpAPI(${keyParam});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['SerpAPI'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context: GenerationContext): string[] {
    return ['@langchain/community/tools/serpapi'];
  }

  canConvert(node: IRNode): boolean {
    return (
      node.type === 'searchAPI' ||
      node.type === 'SearchAPI' ||
      node.type === 'SerpAPI' ||
      node.type === 'serpAPI'
    );
  }
}

/**
 * Request Tool Converter
 */
export class RequestToolConverter
  extends BaseConverter
  implements ToolConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-request-import',
        ['RequestsGetTool', 'RequestsPostTool'],
        'langchain/tools'
      )
    );

    // Configuration parameters
    const method = this.getParameterValue(node, 'method', 'GET');
    const headers = this.getParameterValue(node, 'headers', '{}');

    // Tool initialization based on method
    const toolClass =
      method.toUpperCase() === 'POST' ? 'RequestsPostTool' : 'RequestsGetTool';
    const initCode = `const ${this.getVariableName(node)} = new ${toolClass}({
  headers: ${headers}
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        [toolClass],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context: GenerationContext): string[] {
    return ['langchain/tools'];
  }

  canConvert(node: IRNode): boolean {
    return node.type === 'requestTool' || node.type === 'RequestTool';
  }
}

/**
 * File System Tool Converter
 */
export class FileSystemConverter
  extends BaseConverter
  implements ToolConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-filesystem-import',
        ['ReadFileTool', 'WriteFileTool', 'ListDirectoryTool'],
        'langchain/tools/fs'
      )
    );

    // Configuration parameters
    const operation = this.getParameterValue(node, 'operation', 'read');
    const rootDir = this.getParameterValue(node, 'rootDir', 'process.cwd()');

    // Tool initialization based on operation
    let toolClass = 'ReadFileTool';
    switch (operation.toLowerCase()) {
      case 'write':
        toolClass = 'WriteFileTool';
        break;
      case 'list':
        toolClass = 'ListDirectoryTool';
        break;
      default:
        toolClass = 'ReadFileTool';
    }

    const initCode = `const ${this.getVariableName(node)} = new ${toolClass}({
  rootDir: ${rootDir}
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        [toolClass],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context: GenerationContext): string[] {
    return ['langchain/tools/fs'];
  }

  canConvert(node: IRNode): boolean {
    return node.type === 'fileSystem' || node.type === 'FileSystem';
  }
}

// Tool converter registry
export const toolConverters: Record<string, new () => ToolConverter> = {
  calculator: CalculatorConverter,
  webBrowser: WebBrowserConverter,
  customTool: CustomToolConverter,
  shellTool: ShellToolConverter,
  searchAPI: SearchAPIConverter,
  serpAPI: SearchAPIConverter,
  requestTool: RequestToolConverter,
  fileSystem: FileSystemConverter,
  // Aliases
  Calculator: CalculatorConverter,
  WebBrowser: WebBrowserConverter,
  CustomTool: CustomToolConverter,
  ShellTool: ShellToolConverter,
  SearchAPI: SearchAPIConverter,
  SerpAPI: SearchAPIConverter,
  RequestTool: RequestToolConverter,
  FileSystem: FileSystemConverter,
  RequestsGetTool: RequestToolConverter,
  RequestsPostTool: RequestToolConverter,
};

/**
 * Get tool converter for a node type
 */
export function getToolConverter(nodeType: string): ToolConverter | null {
  const ConverterClass = toolConverters[nodeType];
  return ConverterClass ? new ConverterClass() : null;
}

/**
 * Check if a node type has a tool converter
 */
export function hasToolConverter(nodeType: string): boolean {
  return nodeType in toolConverters;
}

/**
 * Get all supported tool node types
 */
export function getSupportedToolTypes(): string[] {
  return Object.keys(toolConverters);
}

/**
 * Create a tool array for agent usage
 */
export function createToolArray(
  toolNodes: IRNode[],
  _context: GenerationContext
): CodeFragment {
  const toolVars = toolNodes.map(
    (node) => `node_${node.id.replace(/[^a-zA-Z0-9]/g, '_')}`
  );

  const arrayCode = `const tools = [
  ${toolVars.join(',\n  ')}
];`;

  return {
    id: 'tools-array',
    type: 'declaration',
    content: arrayCode,
    dependencies: toolVars,
    language: 'typescript',
    metadata: {
      order: 100,
      description: 'Array of tools for agent usage',
      category: 'tools',
      exports: ['tools'],
    },
  };
}

// Default export
export default {
  getToolConverter,
  hasToolConverter,
  getSupportedToolTypes,
  createToolArray,
  toolConverters,
};
