/**
 * Import Manager for TypeScript Code Generation
 *
 * Handles import consolidation, deduplication, and organization for generated TypeScript code.
 */

export interface ImportStatement {
  from: string;
  named: string[];
  default?: string;
  namespace?: string;
  type: 'value' | 'type' | 'both';
}

export interface ImportGroup {
  external: ImportStatement[];
  internal: ImportStatement[];
  types: ImportStatement[];
}

/**
 * Manages imports for TypeScript code generation
 */
export class ImportManager {
  private imports: Map<string, ImportStatement> = new Map();
  private typeImports: Map<string, ImportStatement> = new Map();

  /**
   * Reset the import manager
   */
  reset(): void {
    this.imports.clear();
    this.typeImports.clear();
  }

  /**
   * Add an import statement
   */
  addImport(
    from: string,
    imported: string | string[],
    options: {
      default?: string;
      namespace?: string;
      isType?: boolean;
    } = {}
  ): void {
    const targetMap = options.isType ? this.typeImports : this.imports;
    const existing = targetMap.get(from);

    if (existing) {
      // Merge with existing import
      if (Array.isArray(imported)) {
        existing.named.push(...imported);
      } else {
        existing.named.push(imported);
      }

      if (options.default && !existing.default) {
        existing.default = options.default;
      }

      if (options.namespace && !existing.namespace) {
        existing.namespace = options.namespace;
      }

      // Deduplicate named imports
      existing.named = Array.from(new Set(existing.named));
    } else {
      // Create new import
      targetMap.set(from, {
        from,
        named: Array.isArray(imported) ? imported : [imported],
        default: options.default,
        namespace: options.namespace,
        type: options.isType ? 'type' : 'value',
      });
    }
  }

  /**
   * Add LangChain import
   */
  addLangChainImport(module: string, imports: string | string[]): void {
    const importList = Array.isArray(imports) ? imports : [imports];
    this.addImport(`@langchain/${module}`, importList);
  }

  /**
   * Add core LangChain import
   */
  addCoreImport(imports: string | string[]): void {
    const importList = Array.isArray(imports) ? imports : [imports];
    this.addImport('@langchain/core', importList);
  }

  /**
   * Add Node.js built-in import
   */
  addNodeImport(
    module: string,
    imports: string | string[],
    namespace?: string
  ): void {
    const importList = Array.isArray(imports) ? imports : [imports];
    this.addImport(`node:${module}`, importList, { namespace });
  }

  /**
   * Add environment variable import
   */
  addEnvImport(): void {
    this.addImport('dotenv/config', []);
  }

  /**
   * Consolidate imports from generated code fragments
   */
  consolidateImports(importStatements: string[]): string {
    // Parse existing import statements
    for (const statement of importStatements) {
      this.parseImportStatement(statement);
    }

    // Generate consolidated imports
    return this.generateImportStatements();
  }

  /**
   * Generate formatted import statements
   */
  generateImportStatements(): string {
    const groups = this.groupImports();
    const statements: string[] = [];

    // Add environment imports first
    if (this.hasEnvImports()) {
      statements.push("import 'dotenv/config';");
      statements.push('');
    }

    // Add external imports
    if (groups.external.length > 0) {
      statements.push(
        ...groups.external.map((imp) => this.formatImportStatement(imp))
      );
      statements.push('');
    }

    // Add internal imports
    if (groups.internal.length > 0) {
      statements.push(
        ...groups.internal.map((imp) => this.formatImportStatement(imp))
      );
      statements.push('');
    }

    // Add type imports
    if (groups.types.length > 0) {
      statements.push(
        ...groups.types.map((imp) => this.formatImportStatement(imp))
      );
      statements.push('');
    }

    return statements.join('\n').trim();
  }

  /**
   * Parse an import statement string
   */
  private parseImportStatement(statement: string): void {
    // Basic parsing for common import patterns
    const trimmed = statement.trim();

    // Skip non-import statements
    if (!trimmed.startsWith('import ')) {
      return;
    }

    // Parse: import defaultExport from 'module';
    const defaultMatch = trimmed.match(
      /^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?$/
    );
    if (defaultMatch) {
      this.addImport(defaultMatch[2]!, [], { default: defaultMatch[1]! });
      return;
    }

    // Parse: import { named } from 'module';
    const namedMatch = trimmed.match(
      /^import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"];?$/
    );
    if (namedMatch) {
      const named = namedMatch[1]!
        .split(',')
        .map((n) => n.trim())
        .filter((n) => n.length > 0);
      this.addImport(namedMatch[2]!, named);
      return;
    }

    // Parse: import * as namespace from 'module';
    const namespaceMatch = trimmed.match(
      /^import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"];?$/
    );
    if (namespaceMatch) {
      this.addImport(namespaceMatch[2]!, [], { namespace: namespaceMatch[1]! });
      return;
    }

    // Parse: import type { Type } from 'module';
    const typeMatch = trimmed.match(
      /^import\s+type\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"];?$/
    );
    if (typeMatch) {
      const types = typeMatch[1]!
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      this.addImport(typeMatch[2]!, types, { isType: true });
      return;
    }

    // Parse side-effect imports: import 'module';
    const sideEffectMatch = trimmed.match(/^import\s+['"]([^'"]+)['"];?$/);
    if (sideEffectMatch) {
      this.addImport(sideEffectMatch[1]!, []);
      return;
    }
  }

  /**
   * Group imports by category
   */
  private groupImports(): ImportGroup {
    const external: ImportStatement[] = [];
    const internal: ImportStatement[] = [];
    const types: ImportStatement[] = [];

    // Combine value and type imports
    const allImports = new Map([...this.imports, ...this.typeImports]);

    for (const [, importStmt] of allImports) {
      if (importStmt.type === 'type') {
        types.push(importStmt);
      } else if (this.isExternalModule(importStmt.from)) {
        external.push(importStmt);
      } else {
        internal.push(importStmt);
      }
    }

    // Sort within each group
    external.sort((a, b) => a.from.localeCompare(b.from));
    internal.sort((a, b) => a.from.localeCompare(b.from));
    types.sort((a, b) => a.from.localeCompare(b.from));

    return { external, internal, types };
  }

  /**
   * Check if module is external (npm package)
   */
  private isExternalModule(modulePath: string): boolean {
    return (
      !modulePath.startsWith('.') &&
      !modulePath.startsWith('/') &&
      !modulePath.startsWith('node:')
    );
  }

  /**
   * Check if there are environment imports
   */
  private hasEnvImports(): boolean {
    return this.imports.has('dotenv/config') || this.imports.has('dotenv');
  }

  /**
   * Format a single import statement
   */
  private formatImportStatement(importStmt: ImportStatement): string {
    const parts: string[] = [];

    // Handle type imports
    if (importStmt.type === 'type') {
      parts.push('import type');
    } else {
      parts.push('import');
    }

    const importParts: string[] = [];

    // Add default import
    if (importStmt.default) {
      importParts.push(importStmt.default);
    }

    // Add namespace import
    if (importStmt.namespace) {
      importParts.push(`* as ${importStmt.namespace}`);
    }

    // Add named imports
    if (importStmt.named.length > 0) {
      const namedImports = importStmt.named.sort().join(', ');
      if (namedImports.length > 60) {
        // Multi-line for long imports
        const formattedNamed = `{\n  ${importStmt.named.sort().join(',\n  ')}\n}`;
        importParts.push(formattedNamed);
      } else {
        importParts.push(`{ ${namedImports} }`);
      }
    }

    // Combine import parts
    if (importParts.length > 0) {
      parts.push(importParts.join(', '));
      parts.push('from');
    }

    // Add module path
    parts.push(`'${importStmt.from}';`);

    return parts.join(' ');
  }

  /**
   * Get commonly used LangChain imports
   */
  static getCommonLangChainImports(): Record<string, string[]> {
    return {
      '@langchain/core/messages': [
        'HumanMessage',
        'AIMessage',
        'SystemMessage',
        'BaseMessage',
      ],
      '@langchain/core/prompts': [
        'ChatPromptTemplate',
        'PromptTemplate',
        'MessagesPlaceholder',
      ],
      '@langchain/core/language_models/llms': ['LLM'],
      '@langchain/core/language_models/chat_models': ['BaseChatModel'],
      '@langchain/core/memory': ['BaseMemory'],
      '@langchain/core/tools': ['Tool', 'DynamicTool'],
      '@langchain/core/agents': ['AgentExecutor'],
      '@langchain/core/chains': ['LLMChain'],
      '@langchain/core/vectorstores': ['VectorStore'],
      '@langchain/core/embeddings': ['Embeddings'],
      '@langchain/core/retrievers': ['BaseRetriever'],
      '@langchain/core/output_parsers': ['BaseOutputParser'],
    };
  }

  /**
   * Get provider-specific imports
   */
  static getProviderImports(): Record<string, Record<string, string[]>> {
    return {
      '@langchain/openai': {
        llm: ['OpenAI', 'ChatOpenAI'],
        embeddings: ['OpenAIEmbeddings'],
      },
      '@langchain/anthropic': {
        llm: ['ChatAnthropic'],
      },
      '@langchain/community': {
        tools: ['Calculator', 'SerpAPI'],
        vectorstores: ['Chroma', 'Pinecone', 'FAISS'],
        memory: ['BufferMemory', 'BufferWindowMemory'],
        retrievers: ['VectorStoreRetriever'],
      },
    };
  }
}
