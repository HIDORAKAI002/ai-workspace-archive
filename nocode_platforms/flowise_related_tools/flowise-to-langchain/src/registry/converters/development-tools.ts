/**
 * Development Tools Converters
 *
 * This module provides converters for various development tools including:
 * - Code Interpreter (Python, JavaScript, Bash execution)
 * - OpenAPI Tool (REST API integration)
 * - GitHub Tool (repository management)
 * - Docker Tool (containerization)
 * - Shell Tool (system commands)
 * - Database Tool (SQL/NoSQL operations)
 */

import { ConversionResult, NodeData } from '../../types/flowise';

// Code Interpreter Converter
export class CodeInterpreterConverter {
  static convert(nodeData: NodeData): ConversionResult {
    const code = nodeData.inputs?.code || '';
    const language = nodeData.inputs?.language || 'python';

    if (!code) {
      return {
        success: false,
        error: 'Code is required for Code Interpreter',
      };
    }

    const langchainCode = `
// Code Interpreter Tool
const codeInterpreterTool = {
  name: "code_interpreter",
  description: "Execute ${language} code in a secure environment",
  parameters: {
    type: "object",
    properties: {
      code: { type: "string", description: "Code to execute" }
    },
    required: ["code"]
  },
  func: async ({ code }) => {
    // Security validation
    const dangerousPatterns = [
      /import\\s+os|from\\s+os\\s+import/,
      /subprocess|exec|eval|__import__/,
      /rm\\s+-rf|del\\s+\\/|format\\s+c:/,
      /shutdown|reboot|halt/
    ];
    
    const isDangerous = dangerousPatterns.some(pattern => pattern.test(code));
    if (isDangerous) {
      throw new Error('Code contains potentially dangerous operations');
    }
    
    try {
      ${
        language === 'python'
          ? `
      const { PythonShell } = require('python-shell');
      return new Promise((resolve, reject) => {
        const pyshell = new PythonShell(null, { mode: 'text' });
        let output = '';
        pyshell.send(code);
        pyshell.on('message', (message) => output += message + '\\n');
        pyshell.end((err) => {
          if (err) reject(err);
          else resolve(output.trim());
        });
      });`
          : language === 'javascript'
            ? `
      const { VM } = require('vm2');
      const vm = new VM({ timeout: 30000 });
      return vm.run(code);`
            : `
      const { exec } = require('child_process');
      return new Promise((resolve, reject) => {
        exec(code, (error, stdout, stderr) => {
          if (error) reject(error);
          else resolve(stdout || stderr);
        });
      });`
      }
    } catch (error) {
      throw new Error(\`Execution failed: \${error.message}\`);
    }
  }
};`;

    const imports =
      language === 'python'
        ? [
            'import { DynamicStructuredTool } from "langchain/tools"',
            'import { PythonShell } from "python-shell"',
          ]
        : language === 'javascript'
          ? [
              'import { DynamicStructuredTool } from "langchain/tools"',
              'import { VM } from "vm2"',
            ]
          : ['import { DynamicStructuredTool } from "langchain/tools"'];

    const dependencies =
      language === 'python'
        ? ['langchain', 'python-shell']
        : language === 'javascript'
          ? ['langchain', 'vm2']
          : ['langchain'];

    return {
      success: true,
      code: langchainCode,
      imports,
      dependencies,
    };
  }
}

// OpenAPI Tool Converter
export class OpenAPIConverter {
  static convert(nodeData: NodeData): ConversionResult {
    const apiSpecUrl = nodeData.inputs?.apiSpecUrl || '';
    const operationId = nodeData.inputs?.operationId || '';

    if (!apiSpecUrl || !operationId) {
      return {
        success: false,
        error: 'API Spec URL and Operation ID are required',
      };
    }

    const langchainCode = `
// OpenAPI Tool
const openAPITool = {
  name: "openapi_tool",
  description: "Execute OpenAPI operations",
  parameters: {
    type: "object",
    properties: {
      operationId: { type: "string", default: "${operationId}" },
      parameters: { type: "object", default: {} }
    },
    required: ["operationId"]
  },
  func: async ({ operationId = "${operationId}", parameters = {} }) => {
    try {
      const SwaggerParser = require('swagger-parser');
      const api = await SwaggerParser.parse('${apiSpecUrl}');
      
      // Find operation and build request
      const operation = findOperation(api, operationId);
      if (!operation) {
        throw new Error(\`Operation \${operationId} not found\`);
      }
      
      const request = buildRequest(api, operation, parameters);
      const response = await axios(request);
      return response.data;
      
    } catch (error) {
      throw new Error(\`API call failed: \${error.message}\`);
    }
  }
};`;

    return {
      success: true,
      code: langchainCode,
      imports: [
        'import { DynamicStructuredTool } from "langchain/tools"',
        'import axios from "axios"',
      ],
      dependencies: ['langchain', 'axios', 'swagger-parser'],
    };
  }
}

// GitHub Tool Converter
export class GitHubConverter {
  static convert(nodeData: NodeData): ConversionResult {
    const token = nodeData.inputs?.token || '';
    const owner = nodeData.inputs?.owner || '';
    const repo = nodeData.inputs?.repo || '';

    if (!token || !owner || !repo) {
      return {
        success: false,
        error: 'GitHub token, owner, and repo are required',
      };
    }

    const langchainCode = `
// GitHub Tool
const gitHubTool = {
  name: "github_tool",
  description: "Interact with GitHub repositories",
  parameters: {
    type: "object",
    properties: {
      operation: { 
        type: "string", 
        enum: ["create_issue", "create_pr", "get_content", "update_file"],
        default: "get_content"
      },
      data: { type: "object", default: {} }
    },
    required: ["operation"]
  },
  func: async ({ operation = "get_content", data = {} }) => {
    const { Octokit } = require('@octokit/rest');
    const octokit = new Octokit({ auth: "${token}" });
    
    try {
      switch (operation) {
        case 'create_issue':
          return await octokit.rest.issues.create({
            owner: "${owner}",
            repo: "${repo}",
            title: data.title || 'New Issue',
            body: data.body || ''
          });
        case 'get_content':
          return await octokit.rest.repos.getContent({
            owner: "${owner}",
            repo: "${repo}",
            path: data.path || 'README.md'
          });
        default:
          throw new Error(\`Unsupported operation: \${operation}\`);
      }
    } catch (error) {
      throw new Error(\`GitHub operation failed: \${error.message}\`);
    }
  }
};`;

    return {
      success: true,
      code: langchainCode,
      imports: [
        'import { DynamicStructuredTool } from "langchain/tools"',
        'import { Octokit } from "@octokit/rest"',
      ],
      dependencies: ['langchain', '@octokit/rest'],
    };
  }
}

// Docker Tool Converter
export class DockerConverter {
  static convert(nodeData: NodeData): ConversionResult {
    const operation = nodeData.inputs?.operation || 'run';

    const langchainCode = `
// Docker Tool
const dockerTool = {
  name: "docker_tool",
  description: "Execute Docker operations",
  parameters: {
    type: "object",
    properties: {
      operation: { 
        type: "string", 
        enum: ["build", "run", "exec", "logs", "ps", "pull"],
        default: "${operation}"
      },
      image: { type: "string" },
      containerName: { type: "string" },
      command: { type: "string" }
    },
    required: ["operation"]
  },
  func: async ({ operation = "${operation}", image, containerName, command }) => {
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    try {
      let dockerCommand = '';
      
      switch (operation) {
        case 'run':
          dockerCommand = \`docker run \${containerName ? '--name ' + containerName : ''} \${image} \${command || ''}\`;
          break;
        case 'exec':
          dockerCommand = \`docker exec \${containerName} \${command}\`;
          break;
        case 'logs':
          dockerCommand = \`docker logs \${containerName}\`;
          break;
        case 'ps':
          dockerCommand = 'docker ps -a';
          break;
        default:
          throw new Error(\`Unsupported Docker operation: \${operation}\`);
      }
      
      const { stdout, stderr } = await execPromise(dockerCommand);
      return { stdout: stdout.trim(), stderr: stderr.trim(), success: true };
      
    } catch (error) {
      return { stdout: '', stderr: error.message, success: false };
    }
  }
};`;

    return {
      success: true,
      code: langchainCode,
      imports: ['import { DynamicStructuredTool } from "langchain/tools"'],
      dependencies: ['langchain'],
    };
  }
}

// Shell Tool Converter
export class ShellConverter {
  static convert(nodeData: NodeData): ConversionResult {
    const command = nodeData.inputs?.command || '';

    if (!command) {
      return {
        success: false,
        error: 'Command is required for Shell Tool',
      };
    }

    const langchainCode = `
// Shell Tool
const shellTool = {
  name: "shell_tool",
  description: "Execute shell commands securely",
  parameters: {
    type: "object",
    properties: {
      command: { type: "string", description: "Command to execute" }
    },
    required: ["command"]
  },
  func: async ({ command }) => {
    // Security validation
    const dangerousCommands = [
      /rm\\s+-rf\\s+\\/|del\\s+\\/s|format\\s+c:/i,
      /shutdown|reboot|halt|poweroff/i,
      /passwd|sudo\\s+passwd|chpasswd/i
    ];
    
    const isDangerous = dangerousCommands.some(pattern => pattern.test(command));
    if (isDangerous) {
      throw new Error('Command contains potentially dangerous operations and is blocked for security');
    }
    
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    try {
      const { stdout, stderr } = await execPromise(command);
      return {
        command,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        success: true
      };
    } catch (error) {
      return {
        command,
        stdout: '',
        stderr: error.message,
        success: false
      };
    }
  }
};`;

    return {
      success: true,
      code: langchainCode,
      imports: ['import { DynamicStructuredTool } from "langchain/tools"'],
      dependencies: ['langchain'],
    };
  }
}

// Database Tool Converter
export class DatabaseConverter {
  static convert(nodeData: NodeData): ConversionResult {
    const connectionString = nodeData.inputs?.connectionString || '';
    const query = nodeData.inputs?.query || '';
    const database = nodeData.inputs?.database || 'postgresql';

    if (!connectionString || !query) {
      return {
        success: false,
        error: 'Connection string and query are required',
      };
    }

    const langchainCode = `
// Database Tool
const databaseTool = {
  name: "database_tool",
  description: "Execute database operations",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "SQL query to execute" },
      parameters: { type: "object", default: {} }
    },
    required: ["query"]
  },
  func: async ({ query, parameters = {} }) => {
    ${
      database === 'postgresql'
        ? `
    const { Client } = require('pg');
    const client = new Client('${connectionString}');
    await client.connect();
    
    try {
      const result = await client.query(query, Object.values(parameters));
      return { success: true, result: result.rows, rowCount: result.rowCount };
    } finally {
      await client.end();
    }`
        : database === 'mysql'
          ? `
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection('${connectionString}');
    
    try {
      const [result] = await connection.execute(query, Object.values(parameters));
      return { success: true, result, rowCount: result.affectedRows };
    } finally {
      await connection.end();
    }`
          : `
    // Generic database implementation
    throw new Error('Database type ${database} not fully implemented');`
    }
  }
};`;

    const imports =
      database === 'postgresql'
        ? [
            'import { DynamicStructuredTool } from "langchain/tools"',
            'import { Client } from "pg"',
          ]
        : database === 'mysql'
          ? [
              'import { DynamicStructuredTool } from "langchain/tools"',
              'import mysql from "mysql2/promise"',
            ]
          : ['import { DynamicStructuredTool } from "langchain/tools"'];

    const dependencies =
      database === 'postgresql'
        ? ['langchain', 'pg']
        : database === 'mysql'
          ? ['langchain', 'mysql2']
          : ['langchain'];

    return {
      success: true,
      code: langchainCode,
      imports,
      dependencies,
    };
  }
}

// Main converter function
export function convertDevelopmentTool(
  nodeData: NodeData,
  nodeType: string
): ConversionResult {
  switch (nodeType) {
    case 'codeInterpreter':
      return CodeInterpreterConverter.convert(nodeData);
    case 'openAPITool':
      return OpenAPIConverter.convert(nodeData);
    case 'githubTool':
      return GitHubConverter.convert(nodeData);
    case 'dockerTool':
      return DockerConverter.convert(nodeData);
    case 'shellTool':
      return ShellConverter.convert(nodeData);
    case 'databaseTool':
      return DatabaseConverter.convert(nodeData);
    default:
      return {
        success: false,
        error: `Unknown development tool type: ${nodeType}`,
      };
  }
}

// Export all converters
export const developmentToolConverters = {
  codeInterpreter: CodeInterpreterConverter,
  openAPITool: OpenAPIConverter,
  githubTool: GitHubConverter,
  dockerTool: DockerConverter,
  shellTool: ShellConverter,
  databaseTool: DatabaseConverter,
};
