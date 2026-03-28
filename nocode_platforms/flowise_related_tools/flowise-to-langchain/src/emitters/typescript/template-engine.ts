/**
 * Template Engine for TypeScript Code Generation
 *
 * Provides templating capabilities for generating consistent, well-structured TypeScript code.
 */

import { GenerationContext } from '../../ir/types.js';

export interface TemplateContext {
  [key: string]: unknown;
}

export interface CodeTemplate {
  name: string;
  template: string;
  description: string;
  requiredContext: string[];
}

/**
 * Template engine for generating TypeScript code
 */
export class TemplateEngine {
  private context: GenerationContext | null = null;
  private templates: Map<string, CodeTemplate> = new Map();

  constructor() {
    this.initializeDefaultTemplates();
  }

  /**
   * Set the generation context
   */
  setContext(context: GenerationContext): void {
    this.context = context;
  }

  /**
   * Render a template with the given context
   */
  renderTemplate(
    templateName: string,
    templateContext: TemplateContext = {}
  ): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    // Validate required context
    for (const required of template.requiredContext) {
      if (
        !(required in templateContext) &&
        !(this.context && required in this.context)
      ) {
        throw new Error(
          `Required context '${required}' missing for template '${templateName}'`
        );
      }
    }

    // Merge contexts
    const fullContext = {
      ...this.context,
      ...templateContext,
      // Helper functions
      helpers: this.getTemplateHelpers(),
    };

    return this.processTemplate(template.template, fullContext);
  }

  /**
   * Add a custom template
   */
  addTemplate(
    name: string,
    template: string,
    description: string,
    requiredContext: string[] = []
  ): void {
    this.templates.set(name, {
      name,
      template,
      description,
      requiredContext,
    });
  }

  /**
   * Process template string with context
   */
  private processTemplate(template: string, context: TemplateContext): string {
    // Simple template processing using string replacement
    let result = template;

    // Replace {{variable}} patterns
    result = result.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const value = this.getValueFromPath(context, path.trim());
      return value !== undefined ? String(value) : match;
    });

    // Process conditional blocks {{#if condition}}...{{/if}}
    result = this.processConditionals(result, context);

    // Process loops {{#each array}}...{{/each}}
    result = this.processLoops(result, context);

    return result;
  }

  /**
   * Get value from object path (e.g., 'user.name')
   */
  private getValueFromPath(obj: TemplateContext, path: string): unknown {
    return path.split('.').reduce((current, key) => {
      return current && typeof current === 'object'
        ? (current as any)[key]
        : undefined;
    }, obj);
  }

  /**
   * Process conditional blocks
   */
  private processConditionals(
    template: string,
    context: TemplateContext
  ): string {
    return template.replace(
      /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
      (_match, condition, content) => {
        const value = this.getValueFromPath(context, condition.trim());
        return this.isTruthy(value) ? content : '';
      }
    );
  }

  /**
   * Process loop blocks
   */
  private processLoops(template: string, context: TemplateContext): string {
    return template.replace(
      /\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
      (_match, arrayPath, content) => {
        const array = this.getValueFromPath(context, arrayPath.trim());
        if (!Array.isArray(array)) {
          return '';
        }

        return array
          .map((item, index) => {
            const itemContext = {
              ...context,
              this: item,
              '@index': index,
              '@first': index === 0,
              '@last': index === array.length - 1,
            };
            return this.processTemplate(content, itemContext);
          })
          .join('');
      }
    );
  }

  /**
   * Check if value is truthy for template conditions
   */
  private isTruthy(value: unknown): boolean {
    if (value === false || value === null || value === undefined) {
      return false;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === 'string') {
      return value.length > 0;
    }
    return Boolean(value);
  }

  /**
   * Get template helper functions
   */
  private getTemplateHelpers(): Record<string, Function> {
    return {
      camelCase: (str: string) =>
        str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')),
      pascalCase: (str: string) => {
        const camel = str.replace(/[-_\s]+(.)?/g, (_, c) =>
          c ? c.toUpperCase() : ''
        );
        return camel.charAt(0).toUpperCase() + camel.slice(1);
      },
      kebabCase: (str: string) =>
        str.replace(/[A-Z]/g, '-$&').toLowerCase().replace(/^-/, ''),
      snakeCase: (str: string) =>
        str.replace(/[A-Z]/g, '_$&').toLowerCase().replace(/^_/, ''),
      upperCase: (str: string) => str.toUpperCase(),
      lowerCase: (str: string) => str.toLowerCase(),
      capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
      indent: (str: string, spaces: number = 2) => {
        const indent = ' '.repeat(spaces);
        return str
          .split('\n')
          .map((line) => (line.trim() ? indent + line : line))
          .join('\n');
      },
      join: (arr: unknown[], separator: string = ', ') =>
        Array.isArray(arr) ? arr.join(separator) : '',
      quote: (str: string) => `"${str}"`,
      singleQuote: (str: string) => `'${str}'`,
      sanitizeVariableName: (str: string) =>
        str.replace(/[^a-zA-Z0-9]/g, '').replace(/^[0-9]/, '_$&'),
    };
  }

  /**
   * Initialize default templates
   */
  private initializeDefaultTemplates(): void {
    // Main file template
    this.addTemplate(
      'mainFile',
      `/**
 * {{description}}
 * Generated by flowise-to-langchain
 */

{{imports}}

{{declarations}}

{{mainFunction}}

{{exports}}
`,
      'Main application file',
      ['description', 'imports', 'mainFunction']
    );

    // Main function template
    this.addTemplate(
      'mainFunction',
      `/**
 * Main function for {{graphName}}
 */
export async function main(input: string, options: Record<string, unknown> = {}): Promise<string> {
  try {
    {{#if hasLangfuse}}
    // Initialize LangFuse tracing
    const trace = langfuse.trace({
      name: '{{graphName}}',
      input: { text: input, options }
    });
    {{/if}}

    {{declarations}}

    {{initializations}}

    {{#if hasLangfuse}}
    // Start generation span
    const generation = trace.generation({
      name: 'llm-generation',
      input: { text: input }
    });
    {{/if}}

    {{executions}}

    {{#if hasLangfuse}}
    // End generation span
    generation.end({
      output: { text: result }
    });

    // End trace
    trace.update({ output: { text: result } });
    {{/if}}

    return result;
  } catch (error) {
    console.error('Error in main function:', error);
    {{#if hasLangfuse}}
    trace.update({
      output: { error: error.message }
    });
    {{/if}}
    throw error;
  }
}

{{#if isAsync}}
// CLI entry point
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  const input = process.argv[2] || 'Hello, world!';
  main(input)
    .then(result => {
      console.log('Result:', result);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}
{{/if}}
`,
      'Main function template',
      ['graphName']
    );

    // Types file template
    this.addTemplate(
      'typesFile',
      `/**
 * Type definitions for {{projectName}}
 * Generated by flowise-to-langchain
 */

{{types}}

{{interfaces}}
`,
      'Types file template',
      ['projectName']
    );

    // Config file template
    this.addTemplate(
      'configFile',
      `/**
 * Configuration for the application
 * Generated by flowise-to-langchain
 */

import type { AppConfig } from './types.js';

export const config: AppConfig = {{config}};

{{#if hasLangfuse}}
// LangFuse configuration
export const langfuseConfig = {
  apiKey: process.env.LANGFUSE_API_KEY,
  baseUrl: process.env.LANGFUSE_BASE_URL || 'https://cloud.langfuse.com',
  enabled: process.env.LANGFUSE_ENABLED === 'true'
};
{{/if}}

// Environment configuration
export const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  {{#each environment}}
  {{@key}}: process.env.{{helpers.snakeCase @key | helpers.upperCase}} || '{{this}}',
  {{/each}}
};
`,
      'Configuration file template',
      ['config']
    );

    // LLM node template
    this.addTemplate(
      'llmNode',
      `// {{label}} - {{type}}
const {{variableName}} = new {{className}}({
  {{#each parameters}}
  {{name}}: {{#if isEnvVar}}process.env.{{envName}}{{else}}{{value}}{{/if}},
  {{/each}}
});
`,
      'LLM node template',
      ['label', 'type', 'variableName', 'className', 'parameters']
    );

    // Prompt template
    this.addTemplate(
      'promptNode',
      `// {{label}} - {{type}}
const {{variableName}} = {{className}}.fromTemplate(\`{{template}}\`);
`,
      'Prompt node template',
      ['label', 'type', 'variableName', 'className', 'template']
    );

    // Chain template
    this.addTemplate(
      'chainNode',
      `// {{label}} - {{type}}
const {{variableName}} = new {{className}}({
  llm: {{llmVariable}},
  prompt: {{promptVariable}},
  {{#if memoryVariable}}
  memory: {{memoryVariable}},
  {{/if}}
  {{#each parameters}}
  {{name}}: {{value}},
  {{/each}}
});
`,
      'Chain node template',
      ['label', 'type', 'variableName', 'className']
    );

    // Memory template
    this.addTemplate(
      'memoryNode',
      `// {{label}} - {{type}}
const {{variableName}} = new {{className}}({
  {{#each parameters}}
  {{name}}: {{value}},
  {{/each}}
});
`,
      'Memory node template',
      ['label', 'type', 'variableName', 'className']
    );

    // Tool template
    this.addTemplate(
      'toolNode',
      `// {{label}} - {{type}}
const {{variableName}} = new {{className}}({{#if hasConfig}}{
  {{#each parameters}}
  {{name}}: {{#if isEnvVar}}process.env.{{envName}}{{else}}{{value}}{{/if}},
  {{/each}}
}{{/if}});
`,
      'Tool node template',
      ['label', 'type', 'variableName', 'className']
    );

    // Execution template
    this.addTemplate(
      'execution',
      `// Execute the chain
const result = await {{chainVariable}}.call({
  {{inputKey}}: input,
  ...options
});

return result.{{outputKey}} || result.text || String(result);
`,
      'Execution template',
      ['chainVariable']
    );

    // Test file template
    this.addTemplate(
      'mainTest',
      `/**
 * Tests for {{projectName}}
 * Generated by flowise-to-langchain
 */

import { jest } from '@jest/globals';
import { main } from '../index.js';

describe('{{graphName}}', () => {
  beforeEach(() => {
    // Setup test environment
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should process basic input', async () => {
    const result = await main('test input');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('should handle empty input', async () => {
    const result = await main('');
    expect(typeof result).toBe('string');
  });

  test('should handle options', async () => {
    const options = { temperature: 0.5 };
    const result = await main('test input', options);
    expect(typeof result).toBe('string');
  });

  {{#if hasLangfuse}}
  test('should initialize langfuse when enabled', async () => {
    process.env.LANGFUSE_ENABLED = 'true';
    process.env.LANGFUSE_API_KEY = 'test-key';
    
    const result = await main('test input');
    expect(typeof result).toBe('string');
  });
  {{/if}}
});
`,
      'Test file template',
      ['projectName', 'graphName']
    );

    // Error handling template
    this.addTemplate(
      'errorHandling',
      `try {
  {{content}}
} catch (error) {
  console.error('Error in {{context}}:', error);
  {{#if hasLangfuse}}
  trace?.update({
    output: { error: error.message }
  });
  {{/if}}
  throw error;
}
`,
      'Error handling template',
      ['content', 'context']
    );

    // Import template
    this.addTemplate(
      'imports',
      `{{#each imports}}
import {{#if default}}{{default}}{{#if named}}, {{/if}}{{/if}}{{#if named}}{ {{join named ', '}} }{{/if}}{{#if namespace}} * as {{namespace}}{{/if}} from '{{from}}';
{{/each}}
`,
      'Import statements template'
    );
  }
}
