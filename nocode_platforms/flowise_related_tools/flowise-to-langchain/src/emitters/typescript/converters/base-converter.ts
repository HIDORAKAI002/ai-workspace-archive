/**
 * Base Converter Class
 *
 * Provides common utilities and methods for all converter implementations.
 */

import type { IRNode, IRParameter, CodeFragment } from '../../../ir/types.js';

/**
 * Base converter class with common utilities
 */
export abstract class BaseConverter {
  /**
   * Get parameter value from node with fallback
   */
  protected getParameterValue(
    node: IRNode,
    paramName: string,
    defaultValue?: any
  ): any {
    const param = node.parameters.find((p) => p.name === paramName);
    return param?.value ?? defaultValue;
  }

  /**
   * Get variable name for a node (sanitized)
   */
  protected getVariableName(node: IRNode): string {
    // Sanitize the ID to create a valid variable name
    return `node_${node.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
  }

  /**
   * Create import code fragment
   */
  protected createImportFragment(
    id: string,
    imports: string[],
    from: string
  ): CodeFragment {
    const content = `import { ${imports.join(', ')} } from '${from}';`;

    return {
      id,
      type: 'import',
      content,
      dependencies: [],
      language: 'typescript',
      metadata: {
        order: 0,
        description: `Import ${imports.join(', ')} from ${from}`,
        category: 'imports',
        imports,
      },
    };
  }

  /**
   * Create declaration code fragment
   */
  protected createDeclarationFragment(
    id: string,
    content: string,
    dependencies: string[] = [],
    nodeId?: string
  ): CodeFragment {
    return {
      id,
      type: 'declaration',
      content,
      dependencies,
      language: 'typescript',
      metadata: {
        ...(nodeId && { nodeId }),
        order: 50,
        description: `Declaration for ${nodeId || id}`,
        category: 'declarations',
      },
    };
  }

  /**
   * Create initialization code fragment
   */
  protected createInitializationFragment(
    id: string,
    content: string,
    dependencies: string[] = [],
    nodeId?: string
  ): CodeFragment {
    return {
      id,
      type: 'initialization',
      content,
      dependencies,
      language: 'typescript',
      metadata: {
        ...(nodeId && { nodeId }),
        order: 75,
        description: `Initialization for ${nodeId || id}`,
        category: 'initialization',
      },
    };
  }

  /**
   * Create execution code fragment
   */
  protected createExecutionFragment(
    id: string,
    content: string,
    dependencies: string[] = [],
    nodeId?: string,
    async: boolean = false
  ): CodeFragment {
    return {
      id,
      type: 'execution',
      content,
      dependencies,
      language: 'typescript',
      metadata: {
        ...(nodeId && { nodeId }),
        order: 100,
        description: `Execution for ${nodeId || id}`,
        category: 'execution',
        async,
      },
    };
  }

  /**
   * Create export code fragment
   */
  protected createExportFragment(
    id: string,
    exports: string[],
    content?: string
  ): CodeFragment {
    const exportContent = content || `export { ${exports.join(', ')} };`;

    return {
      id,
      type: 'export',
      content: exportContent,
      dependencies: exports,
      language: 'typescript',
      metadata: {
        order: 200,
        description: `Export ${exports.join(', ')}`,
        category: 'exports',
        exports,
      },
    };
  }

  /**
   * Validate required parameters
   */
  protected validateRequiredParameters(
    node: IRNode,
    requiredParams: string[]
  ): void {
    for (const paramName of requiredParams) {
      const param = node.parameters.find((p) => p.name === paramName);
      if (
        !param ||
        param.value === undefined ||
        param.value === null ||
        param.value === ''
      ) {
        throw new Error(
          `Required parameter '${paramName}' is missing for node ${node.id} (${node.type})`
        );
      }
    }
  }

  /**
   * Escape string for code generation
   */
  protected escapeString(str: string): string {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }

  /**
   * Convert parameter value to TypeScript code
   */
  protected parameterToCode(param: IRParameter): string {
    switch (param.type) {
      case 'string':
        return `"${this.escapeString(String(param.value))}"`;
      case 'number':
        return String(param.value);
      case 'boolean':
        return String(param.value);
      case 'json':
      case 'object':
        try {
          return JSON.stringify(param.value, null, 2);
        } catch {
          return '{}';
        }
      case 'array':
        try {
          return JSON.stringify(param.value, null, 2);
        } catch {
          return '[]';
        }
      case 'code':
        return String(param.value); // Raw code, no quotes
      default:
        return `"${this.escapeString(String(param.value))}"`;
    }
  }

  /**
   * Generate configuration object from node parameters
   */
  protected generateConfigObject(
    node: IRNode,
    excludeParams: string[] = [],
    includeOnly?: string[]
  ): string {
    const relevantParams = node.parameters.filter((param) => {
      if (excludeParams.includes(param.name)) return false;
      if (includeOnly && !includeOnly.includes(param.name)) return false;
      return param.value !== undefined && param.value !== null;
    });

    if (relevantParams.length === 0) {
      return '{}';
    }

    const configEntries = relevantParams.map((param) => {
      const value = this.parameterToCode(param);
      return `  ${param.name}: ${value}`;
    });

    return `{\n${configEntries.join(',\n')}\n}`;
  }

  /**
   * Check if node has parameter
   */
  protected hasParameter(node: IRNode, paramName: string): boolean {
    return node.parameters.some((p) => p.name === paramName);
  }

  /**
   * Get parameter by name
   */
  protected getParameter(
    node: IRNode,
    paramName: string
  ): IRParameter | undefined {
    return node.parameters.find((p) => p.name === paramName);
  }

  /**
   * Create environment variable reference
   */
  protected createEnvVar(varName: string, fallback?: string): string {
    if (fallback) {
      return `process.env.${varName} || "${fallback}"`;
    }
    return `process.env.${varName}`;
  }

  /**
   * Generate conditional code based on parameter
   */
  protected conditionalCode(
    condition: string,
    trueCode: string,
    falseCode?: string
  ): string {
    if (falseCode) {
      return `${condition} ? ${trueCode} : ${falseCode}`;
    }
    return `${condition} && ${trueCode}`;
  }

  /**
   * Generate array from parameter
   */
  protected arrayFromParameter(
    node: IRNode,
    paramName: string,
    defaultValue: any[] = []
  ): string {
    const param = this.getParameter(node, paramName);
    if (!param || !Array.isArray(param.value)) {
      return JSON.stringify(defaultValue);
    }
    return JSON.stringify(param.value);
  }
}
