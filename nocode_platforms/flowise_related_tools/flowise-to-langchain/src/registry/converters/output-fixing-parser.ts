/**
 * Output Fixing Parser Converter
 *
 * Converter for OutputFixingParser which wraps another parser and uses an LLM
 * to fix parsing errors by reformatting malformed outputs.
 */

import {
  IRNode,
  CodeFragment,
  GenerationContext,
  CodeReference,
} from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Output Fixing Parser Converter
 *
 * OutputFixingParser wraps another output parser and uses an LLM to fix
 * parsing errors when the initial parser fails. It's useful for handling
 * inconsistent or malformed outputs.
 */
export class OutputFixingParserConverter extends BaseConverter {
  readonly flowiseType = 'outputFixingParser';
  readonly category = 'output-parser';

  protected getRequiredImports(): string[] {
    return ['OutputFixingParser'];
  }

  protected getPackageName(): string {
    return '@langchain/core/output_parsers';
  }

  protected getClassName(): string {
    return 'OutputFixingParser';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'parser');
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

    // Get the base parser reference
    const baseParserInput = node.inputs?.find(
      (input) => input.id === 'baseParser'
    );
    if (!baseParserInput) {
      throw new Error(
        `OutputFixingParser node ${node.id} is missing required baseParser input`
      );
    }

    // Get the LLM reference
    const llmInput = node.inputs?.find((input) => input.id === 'llm');
    if (!llmInput) {
      throw new Error(
        `OutputFixingParser node ${node.id} is missing required llm input`
      );
    }

    // Resolve the base parser reference
    const baseParserRefResult = _context.getReference?.(baseParserInput);
    if (!baseParserRefResult) {
      throw new Error(
        `Failed to resolve base parser reference for OutputFixingParser node ${node.id}`
      );
    }
    const baseParserRef = baseParserRefResult as CodeReference;

    // Resolve the LLM reference
    const llmRefResult = _context.getReference?.(llmInput);
    if (!llmRefResult) {
      throw new Error(
        `Failed to resolve LLM reference for OutputFixingParser node ${node.id}`
      );
    }
    const llmRef = llmRefResult as CodeReference;

    // Extract configuration options from data
    const maxRetries = node.data?.maxRetries as number | undefined;
    const includeRaw = node.data?.includeRaw as boolean | undefined;
    const validationErrorMessage = node.data?.validationErrorMessage as
      | string
      | undefined;

    // Build configuration object
    const configLines: string[] = [];
    configLines.push(`  parser: ${baseParserRef.exportedAs}`);
    configLines.push(`  llm: ${llmRef.exportedAs}`);

    if (maxRetries !== undefined) {
      configLines.push(`  maxRetries: ${maxRetries}`);
    }
    if (includeRaw !== undefined) {
      configLines.push(`  includeRaw: ${includeRaw}`);
    }
    if (validationErrorMessage) {
      configLines.push(
        `  validationErrorMessage: ${this.formatParameterValue(validationErrorMessage)}`
      );
    }

    // const configStr = configLines.join(',\n');

    // Generate the parser instantiation
    const instantiation = `const ${variableName} = OutputFixingParser.fromLLM(
  ${llmRef.exportedAs},
  ${baseParserRef.exportedAs},
  {
${configLines.slice(2).join(',\n')}
  }
);`;

    // Declaration fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_declaration`,
        'declaration',
        instantiation,
        [baseParserRef.fragmentId, llmRef.fragmentId],
        node.id,
        3,
        {
          exports: [variableName],
          baseParser: baseParserRef.exportedAs,
          llm: llmRef.exportedAs,
        }
      )
    );

    return fragments;
  }
}
