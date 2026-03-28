#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { convertCommand } from './commands/convert.js';
import { validateCommand } from './commands/validate.js';
import { testCommand } from './commands/test.js';
import createWatchCommand from './commands/watch.js';
import createBatchCommand from './commands/batch.js';
import createRunCommand from './commands/run.js';
// import { createApiCommand } from '../api/cli.js';

// Get package.json for version info
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packagePath = join(__dirname, '../../package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));

const program = new Command();

// Configure the main program
program
  .name('flowise-to-lc')
  .description('Convert Flowise flows to LangChain code')
  .version(packageJson.version, '-v, --version', 'display version number')
  .helpOption('-h, --help', 'display help for command');

// Global options
program
  .option('--verbose', 'enable verbose logging', false)
  .option('--silent', 'suppress all output except errors', false)
  .option('--no-color', 'disable colored output')
  .hook('preAction', (thisCommand) => {
    // Set up global logging based on options
    const opts = thisCommand.opts() as {
      silent?: boolean;
      verbose?: boolean;
      noColor?: boolean;
    };
    if (opts.silent) {
      process.env['FLOWISE_LOG_LEVEL'] = 'error';
    } else if (opts.verbose) {
      process.env['FLOWISE_LOG_LEVEL'] = 'debug';
    } else {
      process.env['FLOWISE_LOG_LEVEL'] = 'info';
    }

    // Disable chalk colors if requested
    if (opts.noColor) {
      chalk.level = 0;
    }
  });

// Register commands
program.addCommand(convertCommand);
program.addCommand(validateCommand);
program.addCommand(testCommand);
program.addCommand(createWatchCommand());
program.addCommand(createBatchCommand());
program.addCommand(createRunCommand());
// program.addCommand(createApiCommand());

// Add examples to help
program.addHelpText(
  'after',
  `
${chalk.bold('Examples:')}
  ${chalk.cyan('# Convert a Flowise export to LangChain code')}
  $ flowise-to-lc convert my-flow.json --out ./output

  ${chalk.cyan('# Convert with LangFuse integration')}
  $ flowise-to-lc convert my-flow.json --out ./output --with-langfuse

  ${chalk.cyan('# Validate a Flowise export before conversion')}
  $ flowise-to-lc validate my-flow.json

  ${chalk.cyan('# Test converted code')}
  $ flowise-to-lc test my-flow.json --out ./output

  ${chalk.cyan('# Convert for specific Flowise version')}
  $ flowise-to-lc convert my-flow.json --flowise-version 1.8.0

  ${chalk.cyan('# Run with self-testing enabled')}
  $ flowise-to-lc convert my-flow.json --self-test

  ${chalk.cyan('# Watch for changes and auto-convert')}
  $ flowise-to-lc watch ./flows --output ./output --recursive

  ${chalk.cyan('# Batch convert multiple files')}
  $ flowise-to-lc batch ./flows --output ./output --parallel 4

  ${chalk.cyan('# Convert and run a workflow')}
  $ flowise-to-lc run my-flow.json "What is the weather today?"

  ${chalk.cyan('# Start API server')}
  $ flowise-to-lc api --port 3001 --cors-origin "http://localhost:3000"

  ${chalk.cyan('# Start API server with authentication')}
  $ flowise-to-lc api --api-key "your-secret-key" --verbose
`
);

// Error handling
program.exitOverride((err) => {
  if (err.code === 'commander.version') {
    console.log(packageJson.version);
    process.exit(0);
  }

  if (err.code === 'commander.help') {
    process.exit(0);
  }

  if (err.code === 'commander.helpDisplayed') {
    process.exit(0);
  }

  // For other errors, show them in red
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(err.exitCode || 1);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red('Uncaught Exception:'), error.message);
  if (process.env['FLOWISE_LOG_LEVEL'] === 'debug') {
    console.error(error.stack);
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('Unhandled Rejection at:'), promise);
  console.error(chalk.red('Reason:'), reason);
  if (process.env['FLOWISE_LOG_LEVEL'] === 'debug') {
    console.error((reason as Error)?.stack);
  }
  process.exit(1);
});

// Parse arguments and execute
async function main(): Promise<void> {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    const err = error as Error;
    console.error(chalk.red('CLI Error:'), err.message);
    if (process.env['FLOWISE_LOG_LEVEL'] === 'debug') {
      console.error(err.stack);
    }
    process.exit(1);
  }
}

// Only run main if this file is being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

/**
 * Factory function to create CLI program
 */
export function createCli(): Command {
  return program;
}

export { program };
