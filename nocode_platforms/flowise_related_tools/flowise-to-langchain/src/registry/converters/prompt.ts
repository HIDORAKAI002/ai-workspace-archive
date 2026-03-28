/**
 * Prompt Template Converters
 *
 * Converters for various prompt template nodes including ChatPromptTemplate,
 * PromptTemplate, FewShotPromptTemplate, and message types.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Prompt converter with common functionality
 */
abstract class BasePromptConverter extends BaseConverter {
  readonly category = 'prompt';

  protected generatePromptConfiguration(
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
      config: this.extractPromptConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractPromptConfig(node: IRNode): Record<string, unknown>;

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'prompt');
    const config = this.generatePromptConfiguration(node, _context);
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

    // Generate the prompt instantiation
    const instantiation = this.generateInstantiation(
      variableName,
      config.className,
      config.config
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

    return fragments;
  }

  protected generateInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>
  ): string {
    const configStr = Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `  ${key}: ${this.formatParameterValue(value)}`)
      .join(',\n');

    return `const ${variableName} = ${className}.fromTemplate({\n${configStr}\n});`;
  }
}

/**
 * Chat Prompt Template Converter
 */
export class ChatPromptTemplateConverter extends BasePromptConverter {
  readonly flowiseType = 'chatPromptTemplate';

  protected getRequiredImports(): string[] {
    return ['ChatPromptTemplate', 'SystemMessage', 'HumanMessage'];
  }

  protected getPackageName(): string {
    return '@langchain/core/prompts';
  }

  protected getClassName(): string {
    return 'ChatPromptTemplate';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractPromptConfig(node: IRNode): Record<string, unknown> {
    const systemMessage = this.getParameterValue<string>(node, 'systemMessage');
    const humanMessage = this.getParameterValue<string>(
      node,
      'humanMessage',
      '{input}'
    );
    const formatInstructions = this.getParameterValue<string>(
      node,
      'formatInstructions'
    );

    const messages: string[] = [];

    if (systemMessage) {
      messages.push(`["system", ${this.formatParameterValue(systemMessage)}]`);
    }

    if (humanMessage) {
      messages.push(`["human", ${this.formatParameterValue(humanMessage)}]`);
    }

    if (formatInstructions) {
      messages.push(
        `["system", ${this.formatParameterValue(formatInstructions)}]`
      );
    }

    return {
      template: `[${messages.join(', ')}]`,
    };
  }

  protected override generateInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>
  ): string {
    return `const ${variableName} = ${className}.fromMessages(${config['template']});`;
  }
}

/**
 * Prompt Template Converter
 */
export class PromptTemplateConverter extends BasePromptConverter {
  readonly flowiseType = 'promptTemplate';

  protected getRequiredImports(): string[] {
    return ['PromptTemplate'];
  }

  protected getPackageName(): string {
    return '@langchain/core/prompts';
  }

  protected getClassName(): string {
    return 'PromptTemplate';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractPromptConfig(node: IRNode): Record<string, unknown> {
    const template = this.getParameterValue<string>(
      node,
      'template',
      '{input}'
    );
    const inputVariables = this.getParameterValue<string[]>(
      node,
      'inputVariables',
      ['input']
    );
    const partialVariables = this.getParameterValue<Record<string, string>>(
      node,
      'partialVariables'
    );

    return {
      template,
      inputVariables,
      ...(partialVariables && { partialVariables }),
    };
  }
}

/**
 * Few Shot Prompt Template Converter
 */
export class FewShotPromptTemplateConverter extends BasePromptConverter {
  readonly flowiseType = 'fewShotPromptTemplate';

  protected getRequiredImports(): string[] {
    return ['FewShotPromptTemplate', 'PromptTemplate'];
  }

  protected getPackageName(): string {
    return '@langchain/core/prompts';
  }

  protected getClassName(): string {
    return 'FewShotPromptTemplate';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractPromptConfig(node: IRNode): Record<string, unknown> {
    const examples = this.getParameterValue<Array<Record<string, string>>>(
      node,
      'examples',
      []
    );
    const examplePromptTemplate = this.getParameterValue<string>(
      node,
      'examplePrompt',
      '{input}\n{output}'
    );
    const prefix = this.getParameterValue<string>(node, 'prefix', '');
    const suffix = this.getParameterValue<string>(node, 'suffix', '{input}');
    const inputVariables = this.getParameterValue<string[]>(
      node,
      'inputVariables',
      ['input']
    );
    const exampleSeparator = this.getParameterValue<string>(
      node,
      'exampleSeparator',
      '\n\n'
    );

    return {
      examples,
      examplePrompt: `PromptTemplate.fromTemplate(${this.formatParameterValue(examplePromptTemplate)})`,
      prefix,
      suffix,
      inputVariables,
      exampleSeparator,
    };
  }

  protected override generateInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>
  ): string {
    const configEntries = Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        if (key === 'examplePrompt') {
          return `  ${key}: ${value}`; // Already formatted
        }
        return `  ${key}: ${this.formatParameterValue(value)}`;
      })
      .join(',\n');

    return `const ${variableName} = new ${className}({\n${configEntries}\n});`;
  }
}

/**
 * System Message Converter
 */
export class SystemMessageConverter extends BasePromptConverter {
  readonly flowiseType = 'systemMessage';

  protected getRequiredImports(): string[] {
    return ['SystemMessage'];
  }

  protected getPackageName(): string {
    return '@langchain/core/messages';
  }

  protected getClassName(): string {
    return 'SystemMessage';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractPromptConfig(node: IRNode): Record<string, unknown> {
    const content = this.getParameterValue<string>(node, 'content', '');
    return { content };
  }

  protected override generateInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>
  ): string {
    return `const ${variableName} = new ${className}(${this.formatParameterValue(config['content'])});`;
  }
}

/**
 * Human Message Converter
 */
export class HumanMessageConverter extends BasePromptConverter {
  readonly flowiseType = 'humanMessage';

  protected getRequiredImports(): string[] {
    return ['HumanMessage'];
  }

  protected getPackageName(): string {
    return '@langchain/core/messages';
  }

  protected getClassName(): string {
    return 'HumanMessage';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractPromptConfig(node: IRNode): Record<string, unknown> {
    const content = this.getParameterValue<string>(node, 'content', '');
    return { content };
  }

  protected override generateInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>
  ): string {
    return `const ${variableName} = new ${className}(${this.formatParameterValue(config['content'])});`;
  }
}

/**
 * AI Message Converter
 */
export class AIMessageConverter extends BasePromptConverter {
  readonly flowiseType = 'aiMessage';

  protected getRequiredImports(): string[] {
    return ['AIMessage'];
  }

  protected getPackageName(): string {
    return '@langchain/core/messages';
  }

  protected getClassName(): string {
    return 'AIMessage';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  protected extractPromptConfig(node: IRNode): Record<string, unknown> {
    const content = this.getParameterValue<string>(node, 'content', '');
    return { content };
  }

  protected override generateInstantiation(
    variableName: string,
    className: string,
    config: Record<string, unknown>
  ): string {
    return `const ${variableName} = new ${className}(${this.formatParameterValue(config['content'])});`;
  }
}
