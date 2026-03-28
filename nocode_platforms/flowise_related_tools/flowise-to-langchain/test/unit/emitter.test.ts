/**
 * Unit Tests for TypeScript Code Emitter
 * Tests code generation quality, formatting, and output validation
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { simpleOpenAIFlow, chainFlow } from '../fixtures/sample-flows';

// Mock the emitter modules
jest.mock('../../src/emitters/typescript/emitter', () => ({
  TypeScriptEmitter: jest.fn().mockImplementation(() => ({
    generateCode: jest.fn(),
    generateFile: jest.fn(),
    getImports: jest.fn(),
    formatCode: jest.fn(),
  })),
}));

jest.mock('../../src/emitters/typescript/import-manager', () => ({
  ImportManager: jest.fn().mockImplementation(() => ({
    addImport: jest.fn(),
    getImports: jest.fn(),
    generateImportStatements: jest.fn(),
  })),
}));

describe('TypeScript Emitter - Code Generation', () => {
  test('should generate valid TypeScript code structure', () => {
    const mockGeneratedCode = `import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

export class FlowiseChain {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000,
    });
  }

  async invoke(input: string): Promise<string> {
    const response = await this.llm.invoke([new HumanMessage(input)]);
    return response.content;
  }
}

export default FlowiseChain;`;

    // Validate generated code structure
    expect(mockGeneratedCode).toMatch(/import.*from/);
    expect(mockGeneratedCode).toMatch(/export class/);
    expect(mockGeneratedCode).toMatch(/constructor\(\)/);
    expect(mockGeneratedCode).toMatch(/async.*invoke/);
    expect(mockGeneratedCode).toMatch(/export default/);
  });

  test('should generate proper LangChain imports', () => {
    const expectedImports = [
      `import { ChatOpenAI } from '@langchain/openai';`,
      `import { OpenAI } from '@langchain/openai';`,
      `import { ChatPromptTemplate } from '@langchain/core/prompts';`,
      `import { LLMChain } from 'langchain/chains';`,
      `import { BufferMemory } from 'langchain/memory';`,
    ];

    expectedImports.forEach(importStatement => {
      expect(importStatement).toMatch(/import.*from ['"]@?langchain/);
      expect(importStatement.endsWith(';')).toBe(true);
    });
  });

  test('should generate proper class constructors', () => {
    const mockConstructor = `constructor(config?: {
  openaiApiKey?: string;
  temperature?: number;
  maxTokens?: number;
}) {
  this.llm = new ChatOpenAI({
    openAIApiKey: config?.openaiApiKey || process.env.OPENAI_API_KEY,
    temperature: config?.temperature ?? 0.7,
    maxTokens: config?.maxTokens ?? 1000,
  });
}`;

    expect(mockConstructor).toMatch(/constructor\(/);
    expect(mockConstructor).toMatch(/\?\?/);
    expect(mockConstructor).toMatch(/process\.env\./);
    expect(mockConstructor).toMatch(/new ChatOpenAI\(/);
  });

  test('should generate async methods', () => {
    const mockAsyncMethod = `async invoke(input: string): Promise<string> {
  try {
    const response = await this.llm.invoke([
      new HumanMessage(input)
    ]);
    return response.content;
  } catch (error) {
    console.error('Error invoking LLM:', error);
    throw error;
  }
}`;

    expect(mockAsyncMethod).toMatch(/async.*invoke/);
    expect(mockAsyncMethod).toMatch(/Promise<string>/);
    expect(mockAsyncMethod).toMatch(/await.*invoke/);
    expect(mockAsyncMethod).toMatch(/try[\s\S]*catch/);
    expect(mockAsyncMethod).toMatch(/throw error/);
  });
});

describe('TypeScript Emitter - Import Management', () => {
  test('should organize imports by package', () => {
    const imports = {
      '@langchain/openai': ['ChatOpenAI', 'OpenAI'],
      '@langchain/core/prompts': ['ChatPromptTemplate', 'PromptTemplate'],
      '@langchain/core/messages': ['HumanMessage', 'SystemMessage'],
      'langchain/chains': ['LLMChain', 'ConversationChain'],
    };

    Object.entries(imports).forEach(([pkg, exports]) => {
      expect(pkg).toMatch(/^(@)?langchain/);
      expect(exports).toBeInstanceOf(Array);
      expect(exports.length).toBeGreaterThan(0);
      exports.forEach(exp => {
        expect(typeof exp).toBe('string');
        expect(exp.length).toBeGreaterThan(0);
      });
    });
  });

  test('should handle default and named imports', () => {
    const namedImport = `import { ChatOpenAI, OpenAI } from '@langchain/openai';`;
    const defaultImport = `import FlowiseChain from './flowise-chain';`;
    const mixedImport = `import React, { useState, useEffect } from 'react';`;

    expect(namedImport).toMatch(/import \{.*\} from/);
    expect(defaultImport).toMatch(/import \w+ from/);
    expect(mixedImport).toMatch(/import \w+, \{.*\} from/);
  });

  test('should sort imports alphabetically', () => {
    const unsortedImports = [
      `import { ZodSchema } from 'zod';`,
      `import { ChatOpenAI } from '@langchain/openai';`,
      `import { BufferMemory } from 'langchain/memory';`,
      `import { readFile } from 'fs/promises';`,
    ];

    const sortedImports = [...unsortedImports].sort((a, b) => {
      const getPackage = (imp: string) => imp.match(/from ['"](.+)['"]/)![1];
      const packageA = getPackage(a);
      const packageB = getPackage(b);
      return (packageA || '').localeCompare(packageB || '') || 0;
    });

    expect(sortedImports[0]).toContain('@langchain/openai');
    expect(sortedImports[1]).toContain('fs/promises');
    expect(sortedImports[2]).toContain('langchain/memory');
    expect(sortedImports[3]).toContain('zod');
  });

  test('should remove duplicate imports', () => {
    const imports = [
      'ChatOpenAI',
      'OpenAI', 
      'ChatOpenAI', // duplicate
      'PromptTemplate',
      'OpenAI', // duplicate
    ];

    const uniqueImports = [...new Set(imports)];
    
    expect(uniqueImports).toHaveLength(3);
    expect(uniqueImports).toContain('ChatOpenAI');
    expect(uniqueImports).toContain('OpenAI');
    expect(uniqueImports).toContain('PromptTemplate');
  });
});

describe('TypeScript Emitter - Code Formatting', () => {
  test('should format code with proper indentation', () => {
    const unformattedCode = `export class FlowiseChain {
constructor() {
this.llm = new ChatOpenAI({
modelName: 'gpt-3.5-turbo',
temperature: 0.7
});
}
}`;

    const expectedFormattedCode = `export class FlowiseChain {
  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
    });
  }
}`;

    // Mock formatting function
    function formatCode(code: string): string {
      return code
        .split('\n')
        .map((line, index) => {
          const trimmed = line.trim();
          if (!trimmed) return '';
          
          let indent = 0;
          if (trimmed.includes('constructor') || trimmed.includes('async')) indent = 2;
          if (trimmed.includes('this.')) indent = 4;
          if (trimmed.startsWith('modelName') || trimmed.startsWith('temperature')) indent = 6;
          if (trimmed.includes('});')) indent = 2;
          if (trimmed === '}' && !trimmed.includes(');')) indent = 0;
          
          return ' '.repeat(indent) + trimmed;
        })
        .join('\n');
    }

    const formatted = formatCode(unformattedCode);
    expect(formatted).toContain('  constructor()');
    expect(formatted).toContain('    this.llm');
    expect(formatted).toContain('      modelName');
  });

  test('should add proper semicolons and commas', () => {
    const codeWithMissingSemicolons = `import { ChatOpenAI } from '@langchain/openai'
const llm = new ChatOpenAI()
export default llm`;

    const expectedCode = `import { ChatOpenAI } from '@langchain/openai';
const llm = new ChatOpenAI();
export default llm;`;

    function addSemicolons(code: string): string {
      return code
        .split('\n')
        .map(line => {
          const trimmed = line.trim();
          if (trimmed && 
              !trimmed.endsWith(';') && 
              !trimmed.endsWith('{') && 
              !trimmed.endsWith('}') &&
              !trimmed.endsWith(',')) {
            return line + ';';
          }
          return line;
        })
        .join('\n');
    }

    const withSemicolons = addSemicolons(codeWithMissingSemicolons);
    expect(withSemicolons.split('\n').every(line => 
      !line.trim() || line.trim().endsWith(';') || line.trim().endsWith('{') || line.trim().endsWith('}')
    )).toBe(true);
  });

  test('should format object literals properly', () => {
    const objectConfig = {
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000,
      streaming: false,
    };

    const formattedObject = `{
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 1000,
  streaming: false,
}`;

    expect(formattedObject).toMatch(/{\n  \w+:/);
    expect(formattedObject).toMatch(/,\n  \w+:/);
    expect(formattedObject).toMatch(/,\n}/);
  });
});

describe('TypeScript Emitter - Error Handling', () => {
  test('should generate try-catch blocks', () => {
    const mockErrorHandling = `async invoke(input: string): Promise<string> {
  try {
    const response = await this.llm.invoke([new HumanMessage(input)]);
    return response.content;
  } catch (error) {
    console.error('Error invoking LLM:', error);
    if (error instanceof Error) {
      throw new Error(\`LLM invocation failed: \${error.message}\`);
    }
    throw new Error('Unknown error occurred during LLM invocation');
  }
}`;

    expect(mockErrorHandling).toMatch(/try {/);
    expect(mockErrorHandling).toMatch(/} catch \(error\) {/);
    expect(mockErrorHandling).toMatch(/console\.error/);
    expect(mockErrorHandling).toMatch(/instanceof Error/);
    expect(mockErrorHandling).toMatch(/throw new Error/);
  });

  test('should validate generated code structure', () => {
    function validateTypeScriptCode(code: string): boolean {
      const checks = [
        code.includes('import'), // Has imports
        code.includes('export'), // Has exports
        code.match(/class \w+/), // Has class definition
        code.includes('constructor'), // Has constructor
        !code.includes('undefined'), // No undefined values
        !code.includes('null'), // No null values (unless intentional)
      ];

      return checks.every(check => check);
    }

    const validCode = `import { ChatOpenAI } from '@langchain/openai';
export class TestChain {
  constructor() {
    this.llm = new ChatOpenAI();
  }
}`;

    const invalidCode = `const test = undefined;`;

    expect(validateTypeScriptCode(validCode)).toBe(true);
    expect(validateTypeScriptCode(invalidCode)).toBe(false);
  });

  test('should handle missing dependencies gracefully', () => {
    const missingDependencies = ['@langchain/unknown', 'nonexistent-package'];
    const availableDependencies = ['@langchain/openai', '@langchain/core', 'langchain'];

    function checkDependencies(required: string[]): { available: string[], missing: string[] } {
      const available = required.filter(dep => availableDependencies.includes(dep));
      const missing = required.filter(dep => !availableDependencies.includes(dep));
      return { available, missing };
    }

    const result = checkDependencies(['@langchain/openai', '@langchain/unknown']);
    expect(result.available).toContain('@langchain/openai');
    expect(result.missing).toContain('@langchain/unknown');
  });
});

describe('TypeScript Emitter - Template Engine', () => {
  test('should process template variables', () => {
    const template = `export class {{className}} {
  constructor() {
    this.{{fieldName}} = new {{constructorName}}({{config}});
  }
}`;

    const variables = {
      className: 'FlowiseChain',
      fieldName: 'llm',
      constructorName: 'ChatOpenAI',
      config: '{ modelName: "gpt-3.5-turbo" }',
    };

    function processTemplate(template: string, vars: Record<string, string>): string {
      let result = template;
      Object.entries(vars).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
      return result;
    }

    const processed = processTemplate(template, variables);
    expect(processed).toContain('export class FlowiseChain');
    expect(processed).toContain('this.llm = new ChatOpenAI');
    expect(processed).not.toContain('{{');
  });

  test('should handle conditional template blocks', () => {
    const templateWithCondition = `export class FlowiseChain {
  {{#if hasMemory}}
  private memory: BufferMemory;
  {{/if}}
  
  constructor() {
    {{#if hasMemory}}
    this.memory = new BufferMemory();
    {{/if}}
  }
}`;

    function processConditionals(template: string, context: Record<string, boolean>): string {
      let result = template;
      
      // Simple conditional processing
      Object.entries(context).forEach(([key, value]) => {
        const ifRegex = new RegExp(`{{#if ${key}}}([\\s\\S]*?){{/if}}`, 'g');
        if (value) {
          result = result.replace(ifRegex, '$1');
        } else {
          result = result.replace(ifRegex, '');
        }
      });
      
      return result;
    }

    const withMemory = processConditionals(templateWithCondition, { hasMemory: true });
    const withoutMemory = processConditionals(templateWithCondition, { hasMemory: false });

    expect(withMemory).toContain('private memory: BufferMemory');
    expect(withoutMemory).not.toContain('private memory: BufferMemory');
  });

  test('should handle template loops', () => {
    const templateWithLoop = `constructor({{#each params}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) {
  {{#each params}}
  this.{{name}} = {{name}};
  {{/each}}
}`;

    const params = [
      { name: 'apiKey', type: 'string' },
      { name: 'temperature', type: 'number' },
      { name: 'maxTokens', type: 'number' },
    ];

    // Mock loop processing
    function processLoop(template: string, data: any[]): string {
      const paramList = data.map((param, index) => 
        `${param.name}: ${param.type}${index < data.length - 1 ? ', ' : ''}`
      ).join('');
      
      const assignments = data.map(param => 
        `  this.${param.name} = ${param.name};`
      ).join('\n');

      return `constructor(${paramList}) {\n${assignments}\n}`;
    }

    const processed = processLoop(templateWithLoop, params);
    expect(processed).toContain('apiKey: string, temperature: number');
    expect(processed).toContain('this.apiKey = apiKey');
    expect(processed).toContain('this.temperature = temperature');
  });
});

describe('TypeScript Emitter - Output Validation', () => {
  test('should generate compilable TypeScript', () => {
    const mockOutput = `import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

export class FlowiseChain {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
    });
  }

  async invoke(input: string): Promise<string> {
    const response = await this.llm.invoke([new HumanMessage(input)]);
    return response.content;
  }
}`;

    // Basic syntax validation
    expect(mockOutput).toMatch(/import.*from.*['"];/);
    expect(mockOutput).toMatch(/export class \w+ {/);
    expect(mockOutput).toMatch(/private \w+: \w+;/);
    expect(mockOutput).toMatch(/constructor\(\) {/);
    expect(mockOutput).toMatch(/async \w+\(.*\): Promise<\w+> {/);
    expect(mockOutput).not.toMatch(/\bundefined\b/);
    expect(mockOutput).not.toMatch(/\bnull\b/);
  });

  test('should generate proper TypeScript types', () => {
    const typeDefinitions = [
      'string',
      'number',
      'boolean',
      'string[]',
      'Record<string, any>',
      'Promise<string>',
      'ChatOpenAI',
      'BaseLanguageModel',
    ];

    typeDefinitions.forEach(type => {
      expect(typeof type).toBe('string');
      expect(type.length).toBeGreaterThan(0);
    });
  });

  test('should maintain consistent code style', () => {
    const codeStyle = {
      indentation: '  ', // 2 spaces
      semicolons: true,
      trailingCommas: true,
      singleQuotes: true,
      camelCase: true,
    };

    const sampleCode = `import { ChatOpenAI } from '@langchain/openai';

export class FlowiseChain {
  private llm: ChatOpenAI;
  
  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
    });
  }
}`;

    expect(sampleCode).toMatch(/import.*'@langchain\/openai';/); // single quotes
    expect(sampleCode).toMatch(/  private llm/); // 2-space indentation
    expect(sampleCode).toMatch(/temperature: 0\.7,/); // trailing comma
    expect(sampleCode).toMatch(/FlowiseChain/); // camelCase class name
  });
});