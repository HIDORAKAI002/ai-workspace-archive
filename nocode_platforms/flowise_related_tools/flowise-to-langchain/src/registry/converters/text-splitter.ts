/**
 * Text Splitter Converters
 *
 * Converts Flowise text splitter nodes into LangChain text splitter implementations
 */

import { BaseConverter } from '../registry.js';
import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';

/**
 * Recursive Character Text Splitter Converter
 * The most commonly used text splitter for RAG workflows
 */
export class RecursiveCharacterTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'recursiveCharacterTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);
    const separators = this.getParameterValue(node, 'separators', [
      '\n\n',
      '\n',
      ' ',
      '',
    ]);
    const keepSeparator = this.getParameterValue(node, 'keepSeparator', false);

    const imports = this.generateImport('@langchain/textsplitters', [
      'RecursiveCharacterTextSplitter',
    ]);

    const implementation = `const ${variableName} = new RecursiveCharacterTextSplitter({
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap},
  separators: ${JSON.stringify(separators)},
  keepSeparator: ${keepSeparator}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}

/**
 * Character Text Splitter Converter
 * Simple character-based text splitting
 */
export class CharacterTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'characterTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);
    const separator = this.getParameterValue(node, 'separator', '\n\n');

    const imports = this.generateImport('@langchain/textsplitters', [
      'CharacterTextSplitter',
    ]);

    const implementation = `const ${variableName} = new CharacterTextSplitter({
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap},
  separator: ${this.formatParameterValue(separator)}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}

/**
 * Token Text Splitter Converter
 * Splits text based on token count
 */
export class TokenTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'tokenTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);
    const encodingName = this.getParameterValue(node, 'encodingName', 'gpt2');

    const imports = this.generateImport('@langchain/textsplitters', [
      'TokenTextSplitter',
    ]);

    const implementation = `const ${variableName} = new TokenTextSplitter({
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap},
  encodingName: ${this.formatParameterValue(encodingName)}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}

/**
 * Markdown Text Splitter Converter
 * Specialized for Markdown documents
 */
export class MarkdownTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'markdownTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);

    const imports = this.generateImport('@langchain/textsplitters', [
      'MarkdownTextSplitter',
    ]);

    const implementation = `const ${variableName} = new MarkdownTextSplitter({
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}

/**
 * LaTeX Text Splitter Converter
 * Specialized for LaTeX documents
 */
export class LatexTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'latexTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);

    const imports = this.generateImport('@langchain/textsplitters', [
      'LatexTextSplitter',
    ]);

    const implementation = `const ${variableName} = new LatexTextSplitter({
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}

/**
 * HTML Text Splitter Converter
 * Specialized for HTML documents
 */
export class HtmlTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'htmlTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);

    const imports = this.generateImport('@langchain/textsplitters', [
      'HtmlTextSplitter',
    ]);

    const implementation = `const ${variableName} = new HtmlTextSplitter({
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}

/**
 * Python Code Text Splitter Converter
 * Specialized for Python code
 */
export class PythonCodeTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'pythonCodeTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);

    const imports = this.generateImport('@langchain/textsplitters', [
      'RecursiveCharacterTextSplitter',
    ]);

    const implementation = `const ${variableName} = RecursiveCharacterTextSplitter.fromLanguage('python', {
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}

/**
 * JavaScript Code Text Splitter Converter
 * Specialized for JavaScript/TypeScript code
 */
export class JavaScriptCodeTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'javascriptCodeTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);

    const imports = this.generateImport('@langchain/textsplitters', [
      'RecursiveCharacterTextSplitter',
    ]);

    const implementation = `const ${variableName} = RecursiveCharacterTextSplitter.fromLanguage('js', {
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}

/**
 * Semantic Text Splitter Converter
 * Splits text based on semantic similarity
 */
export class SemanticTextSplitterConverter extends BaseConverter {
  readonly flowiseType = 'semanticTextSplitter';
  readonly category = 'text-splitter';

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'text_splitter');
    const chunkSize = this.getParameterValue(node, 'chunkSize', 1000);
    const chunkOverlap = this.getParameterValue(node, 'chunkOverlap', 200);

    const imports = this.generateImport('@langchain/textsplitters', [
      'SemanticTextSplitter',
    ]);

    const implementation = `const ${variableName} = new SemanticTextSplitter({
  chunkSize: ${chunkSize},
  chunkOverlap: ${chunkOverlap}
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/textsplitters'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/textsplitters'];
  }
}
