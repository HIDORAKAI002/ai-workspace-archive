/**
 * Run Command - Convert Flowise file and execute the generated LangChain code
 */

import { Command } from 'commander';
import { promises as fs } from 'fs';
import { join, basename, extname } from 'path';
import { spawn } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import { FlowiseToLangChainConverter } from '../../index.js';

interface RunOptions {
  input?: string;
  output?: string;
  verbose?: boolean;
  args?: string[];
  timeout?: number;
  env?: string[];
  keepFiles?: boolean;
}

export function createRunCommand(): Command {
  return new Command('run')
    .description('Convert and execute Flowise workflow')
    .argument('<file>', 'Flowise JSON file to convert and run')
    .argument('[input]', 'Input to pass to the workflow')
    .option(
      '-o, --output <path>',
      'Output directory for generated files',
      './temp'
    )
    .option('-v, --verbose', 'Verbose output', false)
    .option('--args <args...>', 'Additional arguments to pass to the script')
    .option('--timeout <ms>', 'Execution timeout in milliseconds', '30000')
    .option('--env <vars...>', 'Environment variables (KEY=value)')
    .option('--keep-files', 'Keep generated files after execution', false)
    .action(async (file: string, input: string, options: RunOptions) => {
      await runWorkflow(file, input, options);
    });
}

async function runWorkflow(
  file: string,
  input: string = '',
  options: RunOptions
): Promise<void> {
  const converter = new FlowiseToLangChainConverter({
    verbose: options.verbose,
  });
  const timeout = parseInt(options.timeout?.toString() || '30000');

  console.log(chalk.blue('🚀 Converting and running Flowise workflow...'));
  console.log(chalk.gray(`   File: ${file}`));
  console.log(chalk.gray(`   Input: ${input || '(none)'}`));
  console.log(chalk.gray(`   Timeout: ${timeout}ms`));

  let tempDir = options.output || './temp';

  try {
    // Step 1: Convert the Flowise file
    const conversionSpinner = ora('Converting Flowise file...').start();

    const content = await fs.readFile(file, 'utf-8');
    const result = await converter.convert(content, {
      outputPath: tempDir,
      targetLanguage: 'typescript',
    });

    if (!result.success) {
      conversionSpinner.fail('Conversion failed');
      console.error(chalk.red('Errors:'));
      result.errors.forEach((error) =>
        console.error(chalk.red(`  - ${error}`))
      );
      return;
    }

    conversionSpinner.succeed('Conversion completed');

    // Step 2: Prepare the execution environment
    const setupSpinner = ora('Setting up execution environment...').start();

    await fs.mkdir(tempDir, { recursive: true });

    if (!result.result?.files || result.result.files.length === 0) {
      setupSpinner.fail('No files generated');
      return;
    }

    // Write all generated files
    const filePromises = result.result.files.map(async (file) => {
      const filePath = join(tempDir, file.path);
      await fs.mkdir(join(tempDir, file.path, '..'), { recursive: true });
      await fs.writeFile(filePath, file.content, 'utf-8');
      return filePath;
    });

    const writtenFiles = await Promise.all(filePromises);
    const mainFile =
      writtenFiles.find((f) => f.endsWith('.ts')) || writtenFiles[0];

    // Create package.json for dependencies
    const packageJson = {
      name: 'flowise-langchain-runner',
      version: '1.0.0',
      type: 'module',
      dependencies: {
        langchain: '^0.2.17',
        '@langchain/core': '^0.2.30',
        '@langchain/openai': '^0.2.7',
        '@langchain/community': '^0.2.31',
        '@langchain/textsplitters': '^0.0.3',
        dotenv: '^16.4.5',
        tsx: '^4.16.5',
      },
    };

    await fs.writeFile(
      join(tempDir, 'package.json'),
      JSON.stringify(packageJson, null, 2),
      'utf-8'
    );

    // Create a runner script
    const runnerScript = await createRunnerScript(
      mainFile || '',
      input,
      options
    );
    const runnerPath = join(tempDir, 'runner.ts');
    await fs.writeFile(runnerPath, runnerScript, 'utf-8');

    setupSpinner.succeed('Environment setup completed');

    // Step 3: Install dependencies
    const installSpinner = ora('Installing dependencies...').start();

    try {
      await executeCommand('npm', ['install'], tempDir, timeout);
      installSpinner.succeed('Dependencies installed');
    } catch (error) {
      installSpinner.fail('Failed to install dependencies');
      throw error;
    }

    // Step 4: Execute the workflow
    const executionSpinner = ora('Executing workflow...').start();

    try {
      // Filter out undefined values from process.env
      const cleanProcessEnv = Object.fromEntries(
        Object.entries(process.env).filter(([_, value]) => value !== undefined)
      ) as Record<string, string>;

      const env = {
        ...cleanProcessEnv,
        ...parseEnvVars(options.env || []),
      };

      const output = await executeCommand(
        'npx',
        ['tsx', 'runner.ts', ...(options.args || [])],
        tempDir,
        timeout,
        env
      );

      executionSpinner.succeed('Execution completed');

      // Show output
      console.log('\n' + chalk.blue('📤 Workflow Output:'));
      console.log(chalk.white(output.stdout));

      if (output.stderr) {
        console.log('\n' + chalk.yellow('⚠️  Warnings/Errors:'));
        console.log(chalk.yellow(output.stderr));
      }
    } catch (error) {
      executionSpinner.fail('Execution failed');
      throw error;
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error);
  } finally {
    // Cleanup temporary files unless --keep-files is specified
    if (!options.keepFiles && tempDir !== options.output) {
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
        console.log(chalk.gray('🗑️  Cleaned up temporary files'));
      } catch (error) {
        console.warn(
          chalk.yellow('⚠️  Could not clean up temporary files:'),
          error
        );
      }
    } else {
      console.log(chalk.gray(`📁 Generated files saved in: ${tempDir}`));
    }
  }
}

async function createRunnerScript(
  mainFile: string,
  input: string,
  _options: RunOptions
): Promise<string> {
  const fileName = basename(mainFile, extname(mainFile));

  return `import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Load environment variables
config();

// Import the generated workflow
import { runFlow } from './${fileName}.js';

async function main() {
  try {
    console.log('🚀 Starting workflow execution...');
    console.log('Input:', ${JSON.stringify(input)});
    
    const startTime = Date.now();
    
    // Execute the workflow
    const result = await runFlow(${JSON.stringify(input)});
    
    const duration = Date.now() - startTime;
    
    console.log('\\n📊 Execution Summary:');
    console.log(\`Duration: \${duration}ms\`);
    console.log('Result type:', typeof result);
    
    console.log('\\n🎯 Result:');
    console.log(result);
    
  } catch (error) {
    console.error('❌ Workflow execution failed:', error);
    process.exit(1);
  }
}

// Handle unhandled errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

// Run the workflow
main().catch((error) => {
  console.error('Main execution failed:', error);
  process.exit(1);
});`;
}

function executeCommand(
  command: string,
  args: string[],
  cwd: string,
  timeout: number,
  env?: Record<string, string>
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, {
      cwd,
      env: { ...process.env, ...env },
      stdio: 'pipe',
    });

    let stdout = '';
    let stderr = '';

    childProcess.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    childProcess.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    const timeoutHandle = setTimeout(() => {
      childProcess.kill('SIGTERM');
      reject(new Error(`Command timed out after ${timeout}ms`));
    }, timeout);

    childProcess.on('close', (code) => {
      clearTimeout(timeoutHandle);

      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(
          new Error(`Command failed with exit code ${code}\\nstderr: ${stderr}`)
        );
      }
    });

    childProcess.on('error', (error) => {
      clearTimeout(timeoutHandle);
      reject(error);
    });
  });
}

function parseEnvVars(envVars: string[]): Record<string, string> {
  const result: Record<string, string> = {};

  for (const envVar of envVars) {
    const [key, ...valueParts] = envVar.split('=');
    if (key && valueParts.length > 0) {
      result[key] = valueParts.join('=');
    }
  }

  return result;
}

export default createRunCommand;
