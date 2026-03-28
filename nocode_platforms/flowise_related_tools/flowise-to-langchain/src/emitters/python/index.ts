/**
 * Python Code Emitter
 *
 * Generates Python LangChain code from intermediate representation
 */

import {
  CodeFragment,
  CodeGenerationResult,
  GeneratedFile,
  GenerationContext,
  IRGraph,
} from '../../ir/types.js';

export interface PythonEmitterOptions {
  indentSize?: number;
  useSpaces?: boolean;
  importStyle?: 'from' | 'import';
  asyncAwait?: boolean;
  typeHints?: boolean;
  packageManager?: 'pip' | 'poetry' | 'conda';
}

export class PythonEmitter {
  private options: Required<PythonEmitterOptions>;

  constructor(options: PythonEmitterOptions = {}) {
    this.options = {
      indentSize: 4,
      useSpaces: true,
      importStyle: 'from',
      asyncAwait: true,
      typeHints: true,
      packageManager: 'pip',
      ...options,
    };
  }

  async generateCode(
    _ir: IRGraph,
    _context: GenerationContext,
    fragments: CodeFragment[]
  ): Promise<CodeGenerationResult> {
    // const startTime = Date.now(); // Future performance tracking

    // Group fragments by type
    const importFragments = fragments.filter((f) => f.type === 'import');
    const declarationFragments = fragments.filter(
      (f) => f.type === 'declaration'
    );
    const initFragments = fragments.filter((f) => f.type === 'initialization');
    const executionFragments = fragments.filter((f) => f.type === 'execution');

    // Generate Python code
    const pythonCode = this.assemblePythonCode(
      importFragments,
      declarationFragments,
      initFragments,
      executionFragments,
      _context
    );

    // Generate requirements.txt
    const requirements = this.generateRequirements(fragments);

    // Generate package files based on package manager
    const packageFiles = this.generatePackageFiles(fragments, _context);

    const files: GeneratedFile[] = [
      {
        path: 'main.py',
        content: pythonCode,
        type: 'main',
        dependencies: this.extractPythonDependencies(fragments),
        exports: ['run_workflow'],
        size: pythonCode.length,
      },
      {
        path: 'requirements.txt',
        content: requirements,
        type: 'config',
        dependencies: [],
        exports: [],
        size: requirements.length,
      },
      ...packageFiles,
    ];

    return {
      files,
      dependencies: this.extractPythonDependenciesAsRecord(fragments),
      metadata: {
        projectName: _context.projectName || 'langchain-workflow',
        targetLanguage: 'python',
        langchainVersion: '0.1.0',
        generatedAt: new Date().toISOString(),
        totalNodes: 0, // This should be populated from the IR graph
        totalConnections: 0, // This should be populated from the IR graph
        estimatedComplexity: 'medium',
        features: ['async', 'cli', 'error-handling'],
        warnings: [],
      },
      scripts: {
        start: 'python main.py',
        test: 'pytest',
        lint: 'flake8 .',
        format: 'black .',
      },
      packageInfo: {
        name: _context.projectName || 'langchain-workflow',
        version: '1.0.0',
        description: 'Generated LangChain workflow from Flowise',
        main: 'main.py',
        scripts: {
          start: 'python main.py',
          test: 'pytest',
          lint: 'flake8 .',
          format: 'black .',
        },
        dependencies: this.extractPythonDependenciesAsRecord(fragments),
        devDependencies: {
          pytest: '^7.0.0',
          black: '^23.0.0',
          flake8: '^6.0.0',
          mypy: '^1.0.0',
        },
      },
    };
  }

  private assemblePythonCode(
    imports: CodeFragment[],
    declarations: CodeFragment[],
    initializations: CodeFragment[],
    executions: CodeFragment[],
    _context: GenerationContext
  ): string {
    const indent = this.getIndent();
    const lines: string[] = [];

    // Header comment
    lines.push('"""');
    lines.push('Generated LangChain Python Code');
    lines.push('Converted from Flowise workflow');
    lines.push('');
    lines.push('This file contains the complete workflow implementation.');
    lines.push('"""');
    lines.push('');

    // Standard imports
    lines.push('import os');
    lines.push('import asyncio');
    if (this.options.typeHints) {
      lines.push('from typing import Any, Dict, List, Optional, Union');
    }
    lines.push('from dotenv import load_dotenv');
    lines.push('');

    // Load environment variables
    lines.push('# Load environment variables');
    lines.push('load_dotenv()');
    lines.push('');

    // LangChain imports
    const langchainImports = this.generateLangChainImports(imports);
    if (langchainImports.length > 0) {
      lines.push('# LangChain imports');
      lines.push(...langchainImports);
      lines.push('');
    }

    // Component declarations
    if (declarations.length > 0) {
      lines.push('# Component declarations');
      for (const decl of declarations) {
        const pythonDecl = this.convertToPythonImplementation(decl);
        lines.push(...pythonDecl);
        lines.push('');
      }
    }

    // Component executions
    if (executions.length > 0) {
      lines.push('# Component executions');
      for (const exec of executions) {
        const pythonExec = this.convertToPythonImplementation(exec);
        lines.push(...pythonExec);
        lines.push('');
      }
    }

    // Main workflow function
    lines.push('# Main workflow function');
    if (this.options.asyncAwait) {
      if (this.options.typeHints) {
        lines.push('async def run_workflow(input_text: str) -> str:');
      } else {
        lines.push('async def run_workflow(input_text):');
      }
    } else {
      if (this.options.typeHints) {
        lines.push('def run_workflow(input_text: str) -> str:');
      } else {
        lines.push('def run_workflow(input_text):');
      }
    }
    lines.push(`${indent}"""Execute the LangChain workflow."""`);
    lines.push(`${indent}try:`);

    // Initialize components
    if (initializations.length > 0) {
      lines.push(`${indent}${indent}# Initialize components`);
      for (const init of initializations) {
        const pythonInit = this.convertToPythonImplementation(init);
        pythonInit.forEach((line) => {
          lines.push(`${indent}${indent}${line}`);
        });
      }
      lines.push('');
    }

    // Execute workflow
    lines.push(`${indent}${indent}# Execute workflow`);
    if (this.options.asyncAwait) {
      lines.push(
        `${indent}${indent}result = await workflow_executor.ainvoke({"input": input_text})`
      );
    } else {
      lines.push(
        `${indent}${indent}result = workflow_executor.invoke({"input": input_text})`
      );
    }
    lines.push(`${indent}${indent}return result.get("output", str(result))`);
    lines.push('');

    // Error handling
    lines.push(`${indent}except Exception as e:`);
    lines.push(`${indent}${indent}print(f"Workflow execution failed: {e}")`);
    lines.push(`${indent}${indent}raise`);
    lines.push('');

    // CLI interface
    lines.push('# CLI interface');
    lines.push('if __name__ == "__main__":');
    lines.push(`${indent}import sys`);
    lines.push(`${indent}if len(sys.argv) < 2:`);
    lines.push(
      `${indent}${indent}print("Usage: python main.py '<input_text>'")`
    );
    lines.push(`${indent}${indent}sys.exit(1)`);
    lines.push('');
    lines.push(`${indent}input_text = sys.argv[1]`);
    lines.push(`${indent}print(f"Input: {input_text}")`);
    lines.push('');

    if (this.options.asyncAwait) {
      lines.push(`${indent}# Run async workflow`);
      lines.push(`${indent}result = asyncio.run(run_workflow(input_text))`);
    } else {
      lines.push(`${indent}# Run workflow`);
      lines.push(`${indent}result = run_workflow(input_text)`);
    }

    lines.push(`${indent}print(f"Output: {result}")`);

    return lines.join('\n');
  }

  private generateLangChainImports(importFragments: CodeFragment[]): string[] {
    const imports: string[] = [];
    const importMap = new Map<string, Set<string>>();

    // Parse TypeScript imports and convert to Python
    for (const fragment of importFragments) {
      const tsImports = this.parseTsImports(fragment.content);
      for (const { module, imports: moduleImports } of tsImports) {
        const pythonModule = this.convertModuleNameToPython(module);
        if (!importMap.has(pythonModule)) {
          importMap.set(pythonModule, new Set());
        }
        moduleImports.forEach((imp) => {
          const pythonImport = this.convertImportNameToPython(imp);
          importMap.get(pythonModule)!.add(pythonImport);
        });
      }
    }

    // Generate Python import statements
    for (const [module, moduleImports] of importMap.entries()) {
      const importList = Array.from(moduleImports).sort();
      if (this.options.importStyle === 'from') {
        imports.push(`from ${module} import ${importList.join(', ')}`);
      } else {
        imports.push(`import ${module}`);
        importList.forEach((imp) => {
          imports.push(`from ${module} import ${imp}`);
        });
      }
    }

    return imports;
  }

  private parseTsImports(
    content: string
  ): Array<{ module: string; imports: string[] }> {
    const results: Array<{ module: string; imports: string[] }> = [];
    const importRegex =
      /import\s+(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+))\s+from\s+['"]([^'"]+)['"]/g;

    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const [, namedImports, namespaceImport, defaultImport, module] = match;
      const imports: string[] = [];

      if (namedImports) {
        imports.push(...namedImports.split(',').map((imp) => imp.trim()));
      } else if (namespaceImport) {
        imports.push(namespaceImport);
      } else if (defaultImport) {
        imports.push(defaultImport);
      }

      if (module) {
        results.push({ module, imports });
      }
    }

    return results;
  }

  private convertModuleNameToPython(tsModule: string): string {
    const moduleMap: Record<string, string> = {
      '@langchain/openai': 'langchain_openai',
      '@langchain/community': 'langchain_community',
      '@langchain/core': 'langchain_core',
      '@langchain/textsplitters': 'langchain_text_splitters',
      'langchain/chains': 'langchain.chains',
      'langchain/agents': 'langchain.agents',
      'langchain/memory': 'langchain.memory',
      'langchain/tools': 'langchain.tools',
      'langchain/prompts': 'langchain.prompts',
      'langchain/embeddings': 'langchain.embeddings',
      'langchain/vectorstores': 'langchain.vectorstores',
      'langchain/document_loaders': 'langchain.document_loaders',
      'langchain/text_splitter': 'langchain.text_splitter',
    };

    return (
      moduleMap[tsModule] || tsModule.replace(/[@/]/g, '_').replace(/-/g, '_')
    );
  }

  private convertImportNameToPython(tsImport: string): string {
    const importMap: Record<string, string> = {
      ChatOpenAI: 'ChatOpenAI',
      OpenAI: 'OpenAI',
      LLMChain: 'LLMChain',
      ConversationChain: 'ConversationChain',
      PromptTemplate: 'PromptTemplate',
      ChatPromptTemplate: 'ChatPromptTemplate',
      BufferMemory: 'ConversationBufferMemory',
      BufferWindowMemory: 'ConversationBufferWindowMemory',
      RecursiveCharacterTextSplitter: 'RecursiveCharacterTextSplitter',
      SerpAPI: 'SerpAPIWrapper',
      Calculator: 'LLMMathChain',
    };

    return importMap[tsImport] || tsImport;
  }

  private convertToPythonImplementation(fragment: CodeFragment): string[] {
    const lines: string[] = [];
    const tsCode = fragment.content;

    // Convert TypeScript to Python syntax
    let pythonCode = tsCode
      // Convert const/let/var to variable assignment
      .replace(/(?:const|let|var)\s+(\w+)\s*=\s*new\s+(\w+)\(/g, '$1 = $2(')
      .replace(/(?:const|let|var)\s+(\w+)\s*=\s*/g, '$1 = ')
      // Convert function declarations
      .replace(/async\s+function\s+(\w+)\(/g, 'async def $1(')
      .replace(/function\s+(\w+)\(/g, 'def $1(')
      // Convert arrow functions (basic)
      .replace(/(\w+)\s*=>\s*{/g, 'def $1():')
      // Convert object literals to dictionaries
      .replace(/{\s*([^}]+)\s*}/g, (_match, content) => {
        const props = content.split(',').map((prop: string) => {
          const [key, value] = prop.split(':').map((s: string) => s.trim());
          if (key && value) {
            return `"${key}": ${value}`;
          }
          return prop;
        });
        return `{${props.join(', ')}}`;
      })
      // Convert template literals
      .replace(/`([^`]+)`/g, 'f"$1"')
      .replace(/\$\{([^}]+)\}/g, '{$1}')
      // Convert console.log to print
      .replace(/console\.log\(/g, 'print(')
      // Convert true/false/null/undefined
      .replace(/\btrue\b/g, 'True')
      .replace(/\bfalse\b/g, 'False')
      .replace(/\bnull\b/g, 'None')
      .replace(/\bundefined\b/g, 'None')
      // Convert await
      .replace(/await\s+/g, 'await ')
      // Convert semicolons to nothing
      .replace(/;$/gm, '');

    // Split into lines and adjust indentation
    const codeLines = pythonCode.split('\n');
    for (let line of codeLines) {
      line = line.trim();
      if (line && !line.startsWith('#') && !line.startsWith('//')) {
        lines.push(line);
      }
    }

    return lines;
  }

  private generateRequirements(fragments: CodeFragment[]): string {
    const dependencies = new Set([
      'langchain>=0.1.0',
      'langchain-openai>=0.1.0',
      'langchain-community>=0.0.20',
      'python-dotenv>=1.0.0',
    ]);

    // Add dependencies based on converters used
    for (const fragment of fragments) {
      if (fragment.dependencies) {
        for (const dep of fragment.dependencies) {
          const pythonDep = this.convertDependencyToPython(dep);
          if (pythonDep) {
            dependencies.add(pythonDep);
          }
        }
      }
    }

    return Array.from(dependencies).sort().join('\n');
  }

  private convertDependencyToPython(tsDependency: string): string | null {
    const depMap: Record<string, string> = {
      '@langchain/openai': 'langchain-openai>=0.1.0',
      '@langchain/community': 'langchain-community>=0.0.20',
      '@langchain/core': 'langchain-core>=0.1.0',
      '@langchain/textsplitters': 'langchain-text-splitters>=0.0.1',
      ws: 'websockets>=11.0.0',
      express: 'fastapi>=0.104.0',
      validator: 'validators>=0.22.0',
    };

    return depMap[tsDependency] || null;
  }

  private generatePackageFiles(
    fragments: CodeFragment[],
    context: GenerationContext
  ): GeneratedFile[] {
    const files: GeneratedFile[] = [];

    if (this.options.packageManager === 'poetry') {
      const pyprojectToml = this.generatePyprojectToml(fragments, context);
      files.push({
        path: 'pyproject.toml',
        content: pyprojectToml,
        type: 'config',
        dependencies: [],
        exports: [],
        size: pyprojectToml.length,
      });
    }

    // Generate setup.py for pip
    const setupPy = this.generateSetupPy(context);
    files.push({
      path: 'setup.py',
      content: setupPy,
      type: 'config',
      dependencies: [],
      exports: [],
      size: setupPy.length,
    });

    // Generate README
    const readme = this.generatePythonReadme(context);
    files.push({
      path: 'README.md',
      content: readme,
      type: 'config',
      dependencies: [],
      exports: [],
      size: readme.length,
    });

    return files;
  }

  private generatePyprojectToml(
    fragments: CodeFragment[],
    context: GenerationContext
  ): string {
    const dependencies = this.extractPythonDependenciesAsRecord(fragments);

    const depLines = Object.entries(dependencies)
      .map(([name, version]) => {
        const poetryVersion = version.replace('>=', '^');
        return `${name} = "${poetryVersion}"`;
      })
      .join('\n');

    return `[tool.poetry]
name = "${context.projectName || 'langchain-workflow'}"
version = "1.0.0"
description = "Generated LangChain workflow from Flowise"
authors = ["Generated <generated@example.com>"]

[tool.poetry.dependencies]
python = "^3.8"
${depLines}

[tool.poetry.group.dev.dependencies]
pytest = "^7.0.0"
black = "^23.0.0"
flake8 = "^6.0.0"
mypy = "^1.0.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"

[tool.poetry.scripts]
run-workflow = "main:run_workflow"
`;
  }

  private generateSetupPy(context: GenerationContext): string {
    return `from setuptools import setup, find_packages

setup(
    name="${context.projectName || 'langchain-workflow'}",
    version="1.0.0",
    description="Generated LangChain workflow from Flowise",
    author="Generated",
    author_email="generated@example.com",
    packages=find_packages(),
    install_requires=[
        line.strip()
        for line in open("requirements.txt").readlines()
        if line.strip() and not line.startswith("#")
    ],
    python_requires=">=3.8",
    entry_points={
        "console_scripts": [
            "run-workflow=main:run_workflow",
        ],
    },
)`;
  }

  private generatePythonReadme(context: GenerationContext): string {
    return `# ${context.projectName || 'LangChain Workflow'}

Generated Python LangChain code from Flowise workflow.

## Installation

### Using pip:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Using poetry:
\`\`\`bash
poetry install
\`\`\`

## Usage

\`\`\`bash
python main.py "Your input text here"
\`\`\`

## Environment Variables

Create a \`.env\` file with your API keys:

\`\`\`
OPENAI_API_KEY=your_openai_api_key_here
SERPAPI_API_KEY=your_serpapi_key_here
\`\`\`

## Development

\`\`\`bash
# Format code
black main.py

# Type checking
mypy main.py

# Run tests
pytest
\`\`\`
`;
  }

  private extractPythonDependencies(fragments: CodeFragment[]): string[] {
    const deps = new Set<string>();

    for (const fragment of fragments) {
      if (fragment.dependencies) {
        for (const dep of fragment.dependencies) {
          const pythonDep = this.convertDependencyToPython(dep);
          if (pythonDep) {
            deps.add(pythonDep);
          }
        }
      }
    }

    return Array.from(deps).sort();
  }

  private extractPythonDependenciesAsRecord(
    fragments: CodeFragment[]
  ): Record<string, string> {
    const depsRecord: Record<string, string> = {};

    // Default dependencies
    depsRecord['langchain'] = '>=0.1.0';
    depsRecord['langchain-openai'] = '>=0.1.0';
    depsRecord['langchain-community'] = '>=0.0.20';
    depsRecord['python-dotenv'] = '>=1.0.0';

    for (const fragment of fragments) {
      if (fragment.dependencies) {
        for (const dep of fragment.dependencies) {
          const pythonDep = this.convertDependencyToPython(dep);
          if (pythonDep) {
            const [name, version] = pythonDep.split('>=');
            if (name && version) {
              depsRecord[name] = `>=${version}`;
            }
          }
        }
      }
    }

    return depsRecord;
  }

  private getIndent(): string {
    return this.options.useSpaces ? ' '.repeat(this.options.indentSize) : '\t';
  }
}

export function createPythonEmitter(
  options?: PythonEmitterOptions
): PythonEmitter {
  return new PythonEmitter(options);
}
