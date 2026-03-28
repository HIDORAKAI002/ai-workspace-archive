/**
 * Output Parser Converters
 *
 * Converters for various output parser types including StructuredOutputParser
 * for schema-based output parsing with Zod validation.
 */

import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Interface for schema field definition
 */
interface SchemaField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description?: string;
  required?: boolean;
  items?: SchemaField; // For array types
  properties?: Record<string, SchemaField>; // For object types
}

/**
 * Interface for Flowise schema format
 */
interface FlowiseSchema {
  fields: SchemaField[];
  name?: string;
  description?: string;
}

/**
 * Base Output Parser converter with common functionality
 */
abstract class BaseOutputParserConverter extends BaseConverter {
  readonly category = 'output-parser';

  protected generateOutputParserConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    zodImports: string[];
    packageName: string;
    zodPackageName: string;
    className: string;
    config: Record<string, unknown>;
    zodSchema: string;
  } {
    return {
      imports: this.getRequiredImports(),
      zodImports: this.getRequiredZodImports(),
      packageName: this.getPackageName(),
      zodPackageName: this.getZodPackageName(),
      className: this.getClassName(),
      config: this.extractParserConfig(node),
      zodSchema: this.generateZodSchema(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getRequiredZodImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getZodPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractParserConfig(node: IRNode): Record<string, unknown>;

  /**
   * Generate Zod schema from Flowise schema format
   */
  protected generateZodSchema(node: IRNode): string {
    const schema = this.getParameterValue<FlowiseSchema>(node, 'schema');

    if (!schema || !schema.fields || schema.fields.length === 0) {
      // Default schema if none provided
      return 'z.object({\n  output: z.string().describe("The parsed output")\n})';
    }

    const schemaFields = schema.fields
      .map((field) => this.generateZodFieldDefinition(field))
      .join(',\n');

    return `z.object({\n${schemaFields}\n})`;
  }

  /**
   * Generate individual Zod field definition
   */
  protected generateZodFieldDefinition(
    field: SchemaField,
    indent: string = '  '
  ): string {
    let zodType = this.getZodTypeForField(field);

    // Add description if provided
    if (field.description) {
      zodType += `.describe("${field.description.replace(/"/g, '\\"')}")`;
    }

    // Make optional if not required
    if (field.required === false) {
      zodType += '.optional()';
    }

    return `${indent}${field.name}: ${zodType}`;
  }

  /**
   * Get appropriate Zod type for a field
   */
  protected getZodTypeForField(field: SchemaField): string {
    switch (field.type) {
      case 'string':
        return 'z.string()';
      case 'number':
        return 'z.number()';
      case 'boolean':
        return 'z.boolean()';
      case 'array':
        if (field.items) {
          const itemType = this.getZodTypeForField(field.items);
          return `z.array(${itemType})`;
        }
        return 'z.array(z.unknown())';
      case 'object':
        if (field.properties) {
          const properties = Object.entries(field.properties)
            .map(([name, propField]) =>
              this.generateZodFieldDefinition({ ...propField, name }, '    ')
            )
            .join(',\n');
          return `z.object({\n${properties}\n  })`;
        }
        return 'z.object({})';
      default:
        return 'z.unknown()';
    }
  }

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'parser');
    const config = this.generateOutputParserConfiguration(node, _context);
    const fragments: CodeFragment[] = [];

    // Import fragment for langchain
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

    // Import fragment for zod
    fragments.push(
      this.createCodeFragment(
        `${node.id}_zod_import`,
        'import',
        this.generateImport(config.zodPackageName, config.zodImports),
        [config.zodPackageName],
        node.id,
        1
      )
    );

    // Generate the schema definition
    const schemaVariableName = `${variableName}Schema`;
    const schemaDefinition = `const ${schemaVariableName} = ${config.zodSchema};`;

    // Schema declaration fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_schema`,
        'declaration',
        schemaDefinition,
        [],
        node.id,
        2,
        {
          exports: [schemaVariableName],
        }
      )
    );

    // Generate the parser instantiation
    const instantiation = this.generateParserInstantiation(
      variableName,
      config.className,
      schemaVariableName,
      config.config
    );

    // Parser declaration fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_declaration`,
        'declaration',
        instantiation,
        [],
        node.id,
        3,
        {
          exports: [variableName],
          schema: schemaVariableName,
        }
      )
    );

    return fragments;
  }

  protected generateParserInstantiation(
    variableName: string,
    className: string,
    schemaVariableName: string,
    config: Record<string, unknown>
  ): string {
    const configLines: string[] = [];

    // Add the schema as the first parameter
    configLines.push(`  schema: ${schemaVariableName}`);

    // Add other configuration
    Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        configLines.push(`  ${key}: ${this.formatParameterValue(value)}`);
      });

    const configStr = configLines.join(',\n');

    return `const ${variableName} = ${className}.fromZodSchema({\n${configStr}\n});`;
  }
}

/**
 * Structured Output Parser Converter
 */
export class StructuredOutputParserConverter extends BaseOutputParserConverter {
  readonly flowiseType = 'structuredOutputParser';

  protected getRequiredImports(): string[] {
    return ['StructuredOutputParser'];
  }

  protected override getRequiredZodImports(): string[] {
    return ['z'];
  }

  protected getPackageName(): string {
    return '@langchain/core/output_parsers';
  }

  protected override getZodPackageName(): string {
    return 'zod';
  }

  protected getClassName(): string {
    return 'StructuredOutputParser';
  }

  override getDependencies(): string[] {
    return ['@langchain/core', 'zod'];
  }

  protected override extractParserConfig(
    node: IRNode
  ): Record<string, unknown> {
    const outputKey = this.getParameterValue<string>(node, 'outputKey');
    const formatInstructions = this.getParameterValue<string>(
      node,
      'formatInstructions'
    );

    return {
      ...(outputKey && { outputKey }),
      ...(formatInstructions && { formatInstructions }),
    };
  }
}

/**
 * JSON Output Parser Converter
 */
export class JsonOutputParserConverter extends BaseOutputParserConverter {
  readonly flowiseType = 'jsonOutputParser';

  protected getRequiredImports(): string[] {
    return ['JsonOutputParser'];
  }

  protected override getRequiredZodImports(): string[] {
    return ['z'];
  }

  protected getPackageName(): string {
    return '@langchain/core/output_parsers';
  }

  protected override getZodPackageName(): string {
    return 'zod';
  }

  protected getClassName(): string {
    return 'JsonOutputParser';
  }

  override getDependencies(): string[] {
    return ['@langchain/core', 'zod'];
  }

  protected override extractParserConfig(
    node: IRNode
  ): Record<string, unknown> {
    const outputKey = this.getParameterValue<string>(node, 'outputKey');

    return {
      ...(outputKey && { outputKey }),
    };
  }

  protected override generateParserInstantiation(
    variableName: string,
    className: string,
    schemaVariableName: string,
    config: Record<string, unknown>
  ): string {
    const configLines: string[] = [];

    // For JsonOutputParser, schema might be optional
    const hasSchema = schemaVariableName && schemaVariableName !== 'undefined';
    if (hasSchema) {
      configLines.push(`  schema: ${schemaVariableName}`);
    }

    // Add other configuration
    Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        configLines.push(`  ${key}: ${this.formatParameterValue(value)}`);
      });

    if (configLines.length === 0) {
      return `const ${variableName} = new ${className}();`;
    }

    const configStr = configLines.join(',\n');
    return `const ${variableName} = new ${className}({\n${configStr}\n});`;
  }
}

/**
 * List Output Parser Converter
 */
export class ListOutputParserConverter extends BaseConverter {
  readonly flowiseType = 'listOutputParser';
  readonly category = 'output-parser';

  protected getRequiredImports(): string[] {
    return ['CommaSeparatedListOutputParser'];
  }

  protected getPackageName(): string {
    return '@langchain/core/output_parsers';
  }

  protected getClassName(): string {
    return 'CommaSeparatedListOutputParser';
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  override convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
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

    // Simple instantiation for list parser
    const instantiation = `const ${variableName} = new ${this.getClassName()}();`;

    // Declaration fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_declaration`,
        'declaration',
        instantiation,
        [],
        node.id,
        2,
        {
          exports: [variableName],
        }
      )
    );

    return fragments;
  }
}
