/**
 * Memory Converter for Flowise Memory Nodes
 *
 * Converts Flowise memory nodes (like BufferMemory, ConversationSummaryMemory, etc.)
 * to LangChain memory implementations.
 */

import type {
  IRNode,
  IRConnection,
  CodeFragment,
  GenerationContext,
} from '../../../ir/types.js';
import { BaseConverter } from './base-converter.js';

import type { NodeConverter } from '../emitter.js';

/**
 * Buffer Memory Converter
 */
export class BufferMemoryConverter
  extends BaseConverter
  implements NodeConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createImportFragment(
        'langchain-memory-import',
        ['BufferMemory'],
        'langchain/memory'
      )
    );

    // Configuration parameters
    const memoryKey = this.getParameterValue(node, 'memoryKey', 'history');
    const returnMessages = this.getParameterValue(
      node,
      'returnMessages',
      false
    );
    const humanPrefix = this.getParameterValue(node, 'humanPrefix', 'Human');
    const aiPrefix = this.getParameterValue(node, 'aiPrefix', 'AI');

    // Memory initialization
    const initCode = `const ${this.getVariableName(node)} = new BufferMemory({
  memoryKey: "${memoryKey}",
  returnMessages: ${returnMessages},
  humanPrefix: "${humanPrefix}",
  aiPrefix: "${aiPrefix}"
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['BufferMemory'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context?: GenerationContext): string[] {
    return ['langchain/memory'];
  }

  canConvert(node: IRNode): boolean {
    return node.type === 'bufferMemory' || node.type === 'BufferMemory';
  }
}

/**
 * Conversation Summary Memory Converter
 */
export class ConversationSummaryMemoryConverter
  extends BaseConverter
  implements NodeConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    // Get connections from context or graph if available
    const connections: IRConnection[] = (_context as any).connections || [];
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-memory-summary-import',
        ['ConversationSummaryMemory'],
        'langchain/memory'
      )
    );

    // Get connected LLM
    const llmConnection = connections.find(
      (conn) => conn.target === node.id && conn.targetHandle === 'llm'
    );

    if (!llmConnection) {
      throw new Error(
        `ConversationSummaryMemory node ${node.id} requires an LLM connection`
      );
    }

    // Configuration parameters
    const memoryKey = this.getParameterValue(node, 'memoryKey', 'history');
    const returnMessages = this.getParameterValue(
      node,
      'returnMessages',
      false
    );
    const maxTokenLimit = this.getParameterValue(node, 'maxTokenLimit', 2000);

    // Memory initialization
    const llmVar = this.getVariableName({ id: llmConnection.source } as IRNode);
    const initCode = `const ${this.getVariableName(node)} = new ConversationSummaryMemory({
  llm: ${llmVar},
  memoryKey: "${memoryKey}",
  returnMessages: ${returnMessages},
  maxTokenLimit: ${maxTokenLimit}
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['ConversationSummaryMemory'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context?: GenerationContext): string[] {
    return ['langchain/memory'];
  }

  canConvert(node: IRNode): boolean {
    return (
      node.type === 'conversationSummaryMemory' ||
      node.type === 'ConversationSummaryMemory'
    );
  }
}

/**
 * Buffer Window Memory Converter
 */
export class BufferWindowMemoryConverter
  extends BaseConverter
  implements NodeConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createImportFragment(
        'langchain-memory-window-import',
        ['BufferWindowMemory'],
        'langchain/memory'
      )
    );

    // Configuration parameters
    const memoryKey = this.getParameterValue(node, 'memoryKey', 'history');
    const returnMessages = this.getParameterValue(
      node,
      'returnMessages',
      false
    );
    const humanPrefix = this.getParameterValue(node, 'humanPrefix', 'Human');
    const aiPrefix = this.getParameterValue(node, 'aiPrefix', 'AI');
    const k = this.getParameterValue(node, 'k', 5);

    // Memory initialization
    const initCode = `const ${this.getVariableName(node)} = new BufferWindowMemory({
  memoryKey: "${memoryKey}",
  returnMessages: ${returnMessages},
  humanPrefix: "${humanPrefix}",
  aiPrefix: "${aiPrefix}",
  k: ${k}
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['BufferWindowMemory'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context?: GenerationContext): string[] {
    return ['langchain/memory'];
  }

  canConvert(node: IRNode): boolean {
    return (
      node.type === 'bufferWindowMemory' || node.type === 'BufferWindowMemory'
    );
  }
}

/**
 * Conversation Summary Buffer Memory Converter
 */
export class ConversationSummaryBufferMemoryConverter
  extends BaseConverter
  implements NodeConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    // Get connections from context or graph if available
    const connections: IRConnection[] = (_context as any).connections || [];
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-memory-summary-buffer-import',
        ['ConversationSummaryBufferMemory'],
        'langchain/memory'
      )
    );

    // Get connected LLM
    const llmConnection = connections.find(
      (conn) => conn.target === node.id && conn.targetHandle === 'llm'
    );

    if (!llmConnection) {
      throw new Error(
        `ConversationSummaryBufferMemory node ${node.id} requires an LLM connection`
      );
    }

    // Configuration parameters
    const memoryKey = this.getParameterValue(node, 'memoryKey', 'history');
    const returnMessages = this.getParameterValue(
      node,
      'returnMessages',
      false
    );
    const maxTokenLimit = this.getParameterValue(node, 'maxTokenLimit', 2000);

    // Memory initialization
    const llmVar = this.getVariableName({ id: llmConnection.source } as IRNode);
    const initCode = `const ${this.getVariableName(node)} = new ConversationSummaryBufferMemory({
  llm: ${llmVar},
  memoryKey: "${memoryKey}",
  returnMessages: ${returnMessages},
  maxTokenLimit: ${maxTokenLimit}
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['ConversationSummaryBufferMemory'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context?: GenerationContext): string[] {
    return ['langchain/memory'];
  }

  canConvert(node: IRNode): boolean {
    return (
      node.type === 'conversationSummaryBufferMemory' ||
      node.type === 'ConversationSummaryBufferMemory'
    );
  }
}

/**
 * Vector Store Retriever Memory Converter
 */
export class VectorStoreRetrieverMemoryConverter
  extends BaseConverter
  implements NodeConverter
{
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    // Get connections from context or graph if available
    const connections: IRConnection[] = (_context as any).connections || [];
    const fragments: CodeFragment[] = [];

    // Import fragments
    fragments.push(
      this.createImportFragment(
        'langchain-memory-vectorstore-import',
        ['VectorStoreRetrieverMemory'],
        'langchain/memory'
      )
    );

    // Get connected vector store
    const vectorStoreConnection = connections.find(
      (conn) => conn.target === node.id && conn.targetHandle === 'vectorStore'
    );

    if (!vectorStoreConnection) {
      throw new Error(
        `VectorStoreRetrieverMemory node ${node.id} requires a vector store connection`
      );
    }

    // Configuration parameters
    const memoryKey = this.getParameterValue(node, 'memoryKey', 'history');
    const inputKey = this.getParameterValue(node, 'inputKey', 'input');
    const k = this.getParameterValue(node, 'topK', 4);

    // Memory initialization
    const vectorStoreVar = this.getVariableName({
      id: vectorStoreConnection.source,
    } as IRNode);
    const initCode = `const ${this.getVariableName(node)} = new VectorStoreRetrieverMemory({
  vectorStoreRetriever: ${vectorStoreVar}.asRetriever(${k}),
  memoryKey: "${memoryKey}",
  inputKey: "${inputKey}"
});`;

    fragments.push(
      this.createDeclarationFragment(
        `${node.id}-init`,
        initCode,
        ['VectorStoreRetrieverMemory'],
        node.id
      )
    );

    return fragments;
  }

  getDependencies(_node: IRNode, _context?: GenerationContext): string[] {
    return ['langchain/memory'];
  }

  canConvert(node: IRNode): boolean {
    return (
      node.type === 'vectorStoreRetrieverMemory' ||
      node.type === 'VectorStoreRetrieverMemory'
    );
  }
}

// Memory converter registry
export const memoryConverters: Record<string, new () => NodeConverter> = {
  bufferMemory: BufferMemoryConverter,
  bufferWindowMemory: BufferWindowMemoryConverter,
  conversationSummaryMemory: ConversationSummaryMemoryConverter,
  conversationSummaryBufferMemory: ConversationSummaryBufferMemoryConverter,
  vectorStoreRetrieverMemory: VectorStoreRetrieverMemoryConverter,
  // Aliases
  BufferMemory: BufferMemoryConverter,
  BufferWindowMemory: BufferWindowMemoryConverter,
  ConversationSummaryMemory: ConversationSummaryMemoryConverter,
  ConversationSummaryBufferMemory: ConversationSummaryBufferMemoryConverter,
  VectorStoreRetrieverMemory: VectorStoreRetrieverMemoryConverter,
};

/**
 * Get memory converter for a node type
 */
export function getMemoryConverter(nodeType: string): NodeConverter | null {
  const ConverterClass = memoryConverters[nodeType];
  return ConverterClass ? new ConverterClass() : null;
}

/**
 * Check if a node type has a memory converter
 */
export function hasMemoryConverter(nodeType: string): boolean {
  return nodeType in memoryConverters;
}

/**
 * Get all supported memory node types
 */
export function getSupportedMemoryTypes(): string[] {
  return Object.keys(memoryConverters);
}

// Default export
export default {
  getMemoryConverter,
  hasMemoryConverter,
  getSupportedMemoryTypes,
  memoryConverters,
};
