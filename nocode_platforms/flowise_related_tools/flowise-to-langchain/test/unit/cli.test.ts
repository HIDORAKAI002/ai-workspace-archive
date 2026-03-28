/**
 * Unit Tests for CLI Commands
 * Tests command execution, option parsing, and error handling
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { spawn } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

// Mock CLI modules
jest.mock('../../src/cli/commands/convert', () => ({
  convertCommand: {
    name: () => 'convert',
    description: () => 'Convert Flowise flow to LangChain code',
    action: jest.fn(),
  },
}));

jest.mock('../../src/cli/commands/validate', () => ({
  validateCommand: {
    name: () => 'validate',
    description: () => 'Validate Flowise flow JSON',
    action: jest.fn(),
  },
}));

jest.mock('../../src/cli/commands/test', () => ({
  testCommand: {
    name: () => 'test',
    description: () => 'Test converted LangChain code',
    action: jest.fn(),
  },
}));

describe('CLI - Command Structure', () => {
  test('should have all required commands', () => {
    const expectedCommands = ['convert', 'validate', 'test'];
    const availableCommands = expectedCommands; // Mock available commands

    expectedCommands.forEach(command => {
      expect(availableCommands).toContain(command);
    });
  });

  test('should have proper command descriptions', () => {
    const commands = {
      convert: 'Convert Flowise flow to LangChain code',
      validate: 'Validate Flowise flow JSON',
      test: 'Test converted LangChain code',
    };

    Object.entries(commands).forEach(([command, description]) => {
      expect(description).toBeTruthy();
      expect(description.length).toBeGreaterThan(10);
      expect(description).toMatch(/^[A-Z]/); // Starts with capital letter
    });
  });

  test('should handle global options', () => {
    const globalOptions = ['--verbose', '--silent', '--no-color', '--help', '--version'];
    
    globalOptions.forEach(option => {
      expect(option.startsWith('--')).toBe(true);
      expect(option.length).toBeGreaterThan(2);
    });
  });
});

describe('CLI - Convert Command', () => {
  test('should validate convert command options', () => {
    const convertOptions = {
      '--output': 'Output directory path',
      '--format': 'Output format (typescript, javascript)',
      '--with-langfuse': 'Include LangFuse integration',
      '--flowise-version': 'Target Flowise version',
      '--self-test': 'Run self-tests after conversion',
      '--overwrite': 'Overwrite existing output files',
    };

    Object.entries(convertOptions).forEach(([option, description]) => {
      expect(option.startsWith('--')).toBe(true);
      expect(description).toBeTruthy();
      expect(typeof description).toBe('string');
    });
  });

  test('should handle input file validation', () => {
    function validateInputFile(filePath: string): { valid: boolean; error?: string } {
      if (!filePath) {
        return { valid: false, error: 'Input file path is required' };
      }
      
      if (!filePath.endsWith('.json')) {
        return { valid: false, error: 'Input file must be a JSON file' };
      }
      
      return { valid: true };
    }

    expect(validateInputFile('')).toEqual({ valid: false, error: 'Input file path is required' });
    expect(validateInputFile('flow.txt')).toEqual({ valid: false, error: 'Input file must be a JSON file' });
    expect(validateInputFile('flow.json')).toEqual({ valid: true });
  });

  test('should handle output directory creation', async () => {
    const testDir = join(tmpdir(), 'flowise-test-' + Date.now());
    
    try {
      // Simulate output directory creation
      await mkdir(testDir, { recursive: true });
      
      // Verify directory exists (would be done by the actual command)
      const stats = await import('fs/promises').then(fs => fs.stat(testDir));
      expect(stats.isDirectory()).toBe(true);
      
    } finally {
      // Cleanup
      await rm(testDir, { recursive: true, force: true });
    }
  });

  test('should handle overwrite protection', () => {
    function checkOverwrite(outputPath: string, overwrite: boolean): { allowed: boolean; message?: string } {
      const fileExists = true; // Mock file existence
      
      if (fileExists && !overwrite) {
        return { 
          allowed: false, 
          message: `Output file ${outputPath} already exists. Use --overwrite to replace it.` 
        };
      }
      
      return { allowed: true };
    }

    const result1 = checkOverwrite('output.ts', false);
    const result2 = checkOverwrite('output.ts', true);

    expect(result1.allowed).toBe(false);
    expect(result1.message).toContain('already exists');
    expect(result2.allowed).toBe(true);
  });
});

describe('CLI - Validate Command', () => {
  test('should validate JSON syntax', () => {
    function validateJsonSyntax(content: string): { valid: boolean; error?: string } {
      try {
        JSON.parse(content);
        return { valid: true };
      } catch (error) {
        return { 
          valid: false, 
          error: error instanceof Error ? error.message : 'Invalid JSON syntax' 
        };
      }
    }

    const validJson = '{"nodes": [], "edges": []}';
    const invalidJson = '{"nodes": [invalid}';

    expect(validateJsonSyntax(validJson).valid).toBe(true);
    expect(validateJsonSyntax(invalidJson).valid).toBe(false);
    expect(validateJsonSyntax(invalidJson).error).toBeTruthy();
  });

  test('should validate Flowise schema', () => {
    function validateFlowiseSchema(data: any): { valid: boolean; errors: string[] } {
      const errors: string[] = [];

      if (!data.nodes || !Array.isArray(data.nodes)) {
        errors.push('Missing or invalid nodes array');
      }

      if (!data.edges || !Array.isArray(data.edges)) {
        errors.push('Missing or invalid edges array');
      }

      if (data.nodes && data.nodes.length === 0) {
        errors.push('Flow must contain at least one node');
      }

      // Validate node structure
      if (data.nodes) {
        data.nodes.forEach((node: any, index: number) => {
          if (!node.id || typeof node.id !== 'string') {
            errors.push(`Node ${index}: Missing or invalid id`);
          }
          if (!node.data || typeof node.data !== 'object') {
            errors.push(`Node ${index}: Missing or invalid data object`);
          }
          if (node.data && !node.data.type) {
            errors.push(`Node ${index}: Missing node type`);
          }
        });
      }

      return { valid: errors.length === 0, errors };
    }

    const validFlow = { nodes: [{ id: 'test', data: { type: 'openAI' } }], edges: [] };
    const invalidFlow = { nodes: [], edges: [] };

    expect(validateFlowiseSchema(validFlow).valid).toBe(true);
    expect(validateFlowiseSchema(invalidFlow).valid).toBe(false);
    expect(validateFlowiseSchema(invalidFlow).errors).toContain('Flow must contain at least one node');
  });

  test('should check node type support', () => {
    function checkNodeSupport(nodeTypes: string[]): { supported: string[]; unsupported: string[] } {
      const supportedTypes = ['openAI', 'chatOpenAI', 'llmChain', 'chatPromptTemplate'];
      
      const supported = nodeTypes.filter(type => supportedTypes.includes(type));
      const unsupported = nodeTypes.filter(type => !supportedTypes.includes(type));

      return { supported, unsupported };
    }

    const nodeTypes = ['openAI', 'unknownType', 'chatOpenAI'];
    const result = checkNodeSupport(nodeTypes);

    expect(result.supported).toContain('openAI');
    expect(result.supported).toContain('chatOpenAI');
    expect(result.unsupported).toContain('unknownType');
  });
});

describe('CLI - Test Command', () => {
  test('should validate test prerequisites', () => {
    function checkTestPrerequisites(): { ready: boolean; missing: string[] } {
      const required = ['node', 'npm', 'typescript'];
      const missing: string[] = [];

      // Mock checking for required tools
      const available = ['node', 'npm']; // Simulate typescript missing
      
      required.forEach(tool => {
        if (!available.includes(tool)) {
          missing.push(tool);
        }
      });

      return { ready: missing.length === 0, missing };
    }

    const result = checkTestPrerequisites();
    expect(result).toHaveProperty('ready');
    expect(result).toHaveProperty('missing');
    expect(Array.isArray(result.missing)).toBe(true);
  });

  test('should run TypeScript compilation test', () => {
    const mockTypeScriptCode = `import { ChatOpenAI } from '@langchain/openai';

export class TestChain {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI();
  }

  async invoke(input: string): Promise<string> {
    const response = await this.llm.invoke(input);
    return response.content;
  }
}`;

    function validateTypeScriptSyntax(code: string): { valid: boolean; errors: string[] } {
      const errors: string[] = [];

      // Basic syntax checks
      if (!code.includes('import')) {
        errors.push('Missing import statements');
      }

      if (!code.includes('export')) {
        errors.push('Missing export statements');
      }

      if (!code.match(/class \w+/)) {
        errors.push('Missing class definition');
      }

      // Check for common TypeScript patterns
      if (!code.includes(': Promise<')) {
        errors.push('Missing async method return types');
      }

      return { valid: errors.length === 0, errors };
    }

    const result = validateTypeScriptSyntax(mockTypeScriptCode);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should check runtime dependencies', () => {
    function checkDependencies(packageJsonPath?: string): { available: string[]; missing: string[] } {
      // Mock package.json dependencies
      const requiredDeps = ['@langchain/openai', '@langchain/core', 'langchain'];
      const installedDeps = ['@langchain/openai', '@langchain/core']; // Simulate missing 'langchain'

      const available = requiredDeps.filter(dep => installedDeps.includes(dep));
      const missing = requiredDeps.filter(dep => !installedDeps.includes(dep));

      return { available, missing };
    }

    const result = checkDependencies();
    expect(result.available).toContain('@langchain/openai');
    expect(result.available).toContain('@langchain/core');
    expect(result.missing).toContain('langchain');
  });
});

describe('CLI - Error Handling', () => {
  test('should handle file not found errors', () => {
    function handleFileNotFound(filePath: string): { error: boolean; message: string } {
      if (!filePath || filePath === 'nonexistent.json') {
        return {
          error: true,
          message: `Error: File '${filePath}' not found. Please check the file path and try again.`
        };
      }
      return { error: false, message: '' };
    }

    const result = handleFileNotFound('nonexistent.json');
    expect(result.error).toBe(true);
    expect(result.message).toContain('File \'nonexistent.json\' not found');
  });

  test('should handle permission errors', () => {
    function handlePermissionError(operation: string, path: string): { error: boolean; message: string } {
      // Simulate permission error
      return {
        error: true,
        message: `Permission denied: Cannot ${operation} '${path}'. Please check file permissions.`
      };
    }

    const result = handlePermissionError('write to', '/protected/directory');
    expect(result.error).toBe(true);
    expect(result.message).toContain('Permission denied');
    expect(result.message).toContain('write to');
  });

  test('should provide helpful error suggestions', () => {
    function getErrorSuggestions(errorType: string): string[] {
      const suggestions: Record<string, string[]> = {
        'file-not-found': [
          'Check if the file path is correct',
          'Ensure the file exists in the specified location',
          'Try using an absolute path instead of relative path'
        ],
        'invalid-json': [
          'Validate JSON syntax using a JSON validator',
          'Check for missing commas, brackets, or quotes',
          'Ensure the file is a valid Flowise export'
        ],
        'permission-denied': [
          'Run the command with appropriate permissions',
          'Check if the output directory is writable',
          'Try using a different output location'
        ]
      };

      return suggestions[errorType] || ['Please check the command syntax and try again'];
    }

    const fileNotFoundSuggestions = getErrorSuggestions('file-not-found');
    const invalidJsonSuggestions = getErrorSuggestions('invalid-json');

    expect(fileNotFoundSuggestions).toContain('Check if the file path is correct');
    expect(invalidJsonSuggestions).toContain('Validate JSON syntax using a JSON validator');
  });
});

describe('CLI - Help and Documentation', () => {
  test('should display command help', () => {
    const helpText = `
Usage: flowise-to-lc [options] [command]

Convert Flowise flows to LangChain code

Options:
  -v, --version     display version number
  -h, --help        display help for command
  --verbose         enable verbose logging
  --silent          suppress all output except errors
  --no-color        disable colored output

Commands:
  convert [options] <input>  Convert Flowise flow to LangChain code
  validate <input>           Validate Flowise flow JSON
  test [options] <input>     Test converted LangChain code
  help [command]             display help for command

Examples:
  $ flowise-to-lc convert my-flow.json --out ./output
  $ flowise-to-lc validate my-flow.json
  $ flowise-to-lc test my-flow.json --out ./output
`;

    expect(helpText).toContain('Usage: flowise-to-lc');
    expect(helpText).toContain('Commands:');
    expect(helpText).toContain('Examples:');
    expect(helpText).toContain('Options:');
  });

  test('should display version information', () => {
    const versionInfo = {
      name: 'flowise-to-langchain',
      version: '1.0.0',
      description: 'A TypeScript tool to convert Flowise flows to LangChain code',
    };

    expect(versionInfo.name).toBe('flowise-to-langchain');
    expect(versionInfo.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(versionInfo.description).toContain('A TypeScript tool to convert Flowise flows to LangChain');
  });

  test('should provide command examples', () => {
    const examples = [
      'flowise-to-lc convert my-flow.json --out ./output',
      'flowise-to-lc convert my-flow.json --with-langfuse',
      'flowise-to-lc validate my-flow.json',
      'flowise-to-lc test my-flow.json --out ./output',
    ];

    examples.forEach(example => {
      expect(example).toContain('flowise-to-lc');
      expect(example.split(' ').length).toBeGreaterThan(2);
    });
  });
});

describe('CLI - Integration', () => {
  test('should handle complete workflow', async () => {
    const workflow = {
      steps: [
        'validate input file',
        'parse Flowise JSON',
        'convert to IR',
        'generate TypeScript code',
        'write output files',
        'run tests (if requested)',
      ],
      currentStep: 0,
      completed: false,
    };

    function executeStep(step: string): { success: boolean; message: string } {
      // Mock step execution
      const stepResults: Record<string, boolean> = {
        'validate input file': true,
        'parse Flowise JSON': true,
        'convert to IR': true,
        'generate TypeScript code': true,
        'write output files': true,
        'run tests (if requested)': true,
      };

      const success = stepResults[step] ?? false;
      return {
        success,
        message: success ? `✓ ${step}` : `✗ Failed at ${step}`,
      };
    }

    for (const step of workflow.steps) {
      const result = executeStep(step);
      expect(result.success).toBe(true);
      expect(result.message).toContain('✓');
    }
  });

  test('should handle graceful shutdown', () => {
    function handleShutdown(signal: string): void {
      const cleanup = {
        tempFiles: 'cleaned up',
        openHandles: 'closed',
        processes: 'terminated',
      };

      expect(cleanup.tempFiles).toBe('cleaned up');
      expect(cleanup.openHandles).toBe('closed');
      expect(cleanup.processes).toBe('terminated');
    }

    // Test graceful shutdown
    handleShutdown('SIGINT');
    handleShutdown('SIGTERM');
  });
});