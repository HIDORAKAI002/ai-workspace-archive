/**
 * Prompt Node Converter for TypeScript Code Generation
 *
 * Converts prompt nodes (ChatPromptTemplate, PromptTemplate, etc.) to TypeScript code.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../../ir/types.js';
import { NodeConverter } from '../emitter.js';

export class PromptConverter implements NodeConverter {
  /**
   * Convert prompt node to code fragments
   */
  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const fragments: CodeFragment[] = [];

    // Generate import fragment
    fragments.push(this.generateImportFragment(node));

    // Generate declaration fragment
    fragments.push(this.generateDeclarationFragment(node, _context));

    return fragments;
  }

  /**
   * Get dependencies for the prompt node
   */
  getDependencies(_node: IRNode, _context?: GenerationContext): string[] {
    return ['@langchain/core'];
  }

  /**
   * Get imports for the prompt node
   */
  getImports(node: IRNode): string[] {
    const imports: string[] = [];

    switch (node.type) {
      case 'chatPromptTemplate':
        imports.push('ChatPromptTemplate');
        break;
      case 'promptTemplate':
        imports.push('PromptTemplate');
        break;
      case 'fewShotPromptTemplate':
        imports.push('FewShotPromptTemplate');
        break;
      case 'systemMessage':
        imports.push('SystemMessage');
        break;
      case 'humanMessage':
        imports.push('HumanMessage');
        break;
      case 'aiMessage':
        imports.push('AIMessage');
        break;
    }

    return imports;
  }

  /**
   * Check if this converter supports the node
   */
  canConvert(node: IRNode): boolean {
    const supportedTypes = [
      'chatPromptTemplate',
      'promptTemplate',
      'fewShotPromptTemplate',
      'systemMessage',
      'humanMessage',
      'aiMessage',
    ];
    return supportedTypes.includes(node.type);
  }

  /**
   * Generate import fragment
   */
  private generateImportFragment(node: IRNode): CodeFragment {
    const className = this.getClassName(node.type);
    const packageName = this.getPackageName(node.type);

    return {
      id: `import_${node.id}`,
      type: 'import',
      content: `import { ${className} } from '${packageName}';`,
      dependencies: [packageName],
      language: 'typescript',
      metadata: {
        nodeId: node.id,
        order: 11,
        description: `Import for ${node.label}`,
        imports: [className],
      },
    };
  }

  /**
   * Generate declaration fragment
   */
  private generateDeclarationFragment(
    node: IRNode,
    _context: GenerationContext
  ): CodeFragment {
    const variableName = this.sanitizeVariableName(node.label);

    let content: string;

    if (node.type === 'chatPromptTemplate') {
      content = this.generateChatPromptTemplate(node, variableName);
    } else if (node.type === 'promptTemplate') {
      content = this.generatePromptTemplate(node, variableName);
    } else if (node.type === 'fewShotPromptTemplate') {
      content = this.generateFewShotPromptTemplate(node, variableName);
    } else {
      content = this.generateMessageTemplate(node, variableName);
    }

    return {
      id: `decl_${node.id}`,
      type: 'declaration',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        nodeId: node.id,
        order: 1100,
        description: `Declaration for ${node.label}`,
        category: node.category,
        async: false,
        exports: [variableName],
      },
    };
  }

  /**
   * Generate ChatPromptTemplate
   */
  private generateChatPromptTemplate(
    node: IRNode,
    variableName: string
  ): string {
    const systemMessage =
      (this.getParameterValue(node, 'systemMessage') as string) || '';
    const humanMessage =
      (this.getParameterValue(node, 'humanMessage') as string) || '{input}';
    const formatInstructions =
      (this.getParameterValue(node, 'formatInstructions') as string) || '';

    const messages: string[] = [];

    if (systemMessage) {
      messages.push(`  ['system', \`${this.escapeTemplate(systemMessage)}\`]`);
    }

    messages.push(`  ['human', \`${this.escapeTemplate(humanMessage)}\`]`);

    if (formatInstructions) {
      messages.push(
        `  ['system', \`${this.escapeTemplate(formatInstructions)}\`]`
      );
    }

    return `// ${node.label} - ${node.type}
const ${variableName} = ChatPromptTemplate.fromMessages([
${messages.join(',\n')}
]);`;
  }

  /**
   * Generate PromptTemplate
   */
  private generatePromptTemplate(node: IRNode, variableName: string): string {
    const template =
      (this.getParameterValue(node, 'template') as string) || '{input}';
    // const _inputVariables = this.extractInputVariables(template);

    return `// ${node.label} - ${node.type}
const ${variableName} = PromptTemplate.fromTemplate(\`${this.escapeTemplate(template)}\`);`;
  }

  /**
   * Generate FewShotPromptTemplate
   */
  private generateFewShotPromptTemplate(
    node: IRNode,
    variableName: string
  ): string {
    const examplePrompt =
      (this.getParameterValue(node, 'examplePrompt') as string) || '';
    const examples =
      (this.getParameterValue(node, 'examples') as unknown[]) || [];
    const prefix = (this.getParameterValue(node, 'prefix') as string) || '';
    const suffix =
      (this.getParameterValue(node, 'suffix') as string) || '{input}';

    const exampleArray = Array.isArray(examples) ? examples : [];
    const formattedExamples = exampleArray
      .map((example) => JSON.stringify(example, null, 2).replace(/\n/g, '\n  '))
      .join(',\n  ');

    return `// ${node.label} - ${node.type}
const ${variableName}ExamplePrompt = PromptTemplate.fromTemplate(\`${this.escapeTemplate(examplePrompt)}\`);

const ${variableName} = new FewShotPromptTemplate({
  examples: [
    ${formattedExamples}
  ],
  examplePrompt: ${variableName}ExamplePrompt,
  prefix: \`${this.escapeTemplate(prefix)}\`,
  suffix: \`${this.escapeTemplate(suffix)}\`,
  inputVariables: ${JSON.stringify(this.extractInputVariables(suffix))}
});`;
  }

  /**
   * Generate message template
   */
  private generateMessageTemplate(node: IRNode, variableName: string): string {
    const className = this.getClassName(node.type);
    const content =
      (this.getParameterValue(node, 'content') as string) ||
      (this.getParameterValue(node, 'text') as string) ||
      '';

    return `// ${node.label} - ${node.type}
const ${variableName} = new ${className}(\`${this.escapeTemplate(content)}\`);`;
  }

  /**
   * Get the TypeScript class name for the node type
   */
  private getClassName(nodeType: string): string {
    const classMap: Record<string, string> = {
      chatPromptTemplate: 'ChatPromptTemplate',
      promptTemplate: 'PromptTemplate',
      fewShotPromptTemplate: 'FewShotPromptTemplate',
      systemMessage: 'SystemMessage',
      humanMessage: 'HumanMessage',
      aiMessage: 'AIMessage',
    };

    return classMap[nodeType] || 'BasePromptTemplate';
  }

  /**
   * Get the package name for the node type
   */
  private getPackageName(nodeType: string): string {
    if (nodeType.includes('Message')) {
      return '@langchain/core/messages';
    }
    return '@langchain/core/prompts';
  }

  /**
   * Extract input variables from template
   */
  private extractInputVariables(template: string): string[] {
    const variables = new Set<string>();

    // Match {variable} patterns
    const matches = template.match(/\{([^}]+)\}/g);
    if (matches) {
      for (const match of matches) {
        const variable = match.slice(1, -1).trim();
        if (variable && !variable.includes(' ')) {
          variables.add(variable);
        }
      }
    }

    return Array.from(variables).sort();
  }

  /**
   * Escape template strings for TypeScript
   */
  private escapeTemplate(template: string): string {
    return template
      .replace(/\\/g, '\\\\') // Escape backslashes
      .replace(/`/g, '\\`') // Escape backticks
      .replace(/\${/g, '\\${'); // Escape template literals
  }

  /**
   * Get parameter value from node
   */
  private getParameterValue(node: IRNode, paramName: string): unknown {
    const param = node.parameters.find((p) => p.name === paramName);
    return param?.value;
  }

  /**
   * Sanitize variable name
   */
  private sanitizeVariableName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, '_$&')
      .toLowerCase();
  }
}
