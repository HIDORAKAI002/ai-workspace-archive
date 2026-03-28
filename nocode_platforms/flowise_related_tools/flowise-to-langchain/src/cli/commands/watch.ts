/**
 * Watch Command - Monitor Flowise files for changes and auto-convert
 */

import { Command } from 'commander';
import { promises as fs } from 'fs';
import { watch } from 'fs';
import { join, basename, extname } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { FlowiseToLangChainConverter } from '../../index.js';

interface WatchOptions {
  output: string;
  recursive?: boolean;
  ignore?: string[];
  debounce?: number;
  verbose?: boolean;
  overwrite?: boolean;
}

export function createWatchCommand(): Command {
  return new Command('watch')
    .description('Watch Flowise files for changes and auto-convert')
    .argument('<input>', 'Input directory or file pattern to watch')
    .option('-o, --output <path>', 'Output directory', './output')
    .option('-r, --recursive', 'Watch subdirectories recursively', false)
    .option('--ignore <patterns...>', 'Patterns to ignore (glob patterns)', [])
    .option('--debounce <ms>', 'Debounce delay in milliseconds', '500')
    .option('-v, --verbose', 'Verbose output', false)
    .option('--overwrite', 'Overwrite existing files', false)
    .action(async (input: string, options: WatchOptions) => {
      await watchFiles(input, options);
    });
}

async function watchFiles(input: string, options: WatchOptions): Promise<void> {
  const converter = new FlowiseToLangChainConverter({
    verbose: options.verbose,
  });
  const debounceMs = parseInt(options.debounce?.toString() || '500');
  const watchedFiles = new Map<string, NodeJS.Timeout>();

  console.log(chalk.blue('🔍 Starting Flowise file watcher...'));
  console.log(chalk.gray(`   Input: ${input}`));
  console.log(chalk.gray(`   Output: ${options.output}`));
  console.log(chalk.gray(`   Debounce: ${debounceMs}ms`));

  // Ensure output directory exists
  await fs.mkdir(options.output, { recursive: true });

  try {
    const stats = await fs.stat(input);

    if (stats.isFile()) {
      // Watch single file
      await watchSingleFile(
        input,
        options,
        converter,
        debounceMs,
        watchedFiles
      );
    } else if (stats.isDirectory()) {
      // Watch directory
      await watchDirectory(input, options, converter, debounceMs, watchedFiles);
    } else {
      throw new Error('Input must be a file or directory');
    }
  } catch (error) {
    console.error(chalk.red('❌ Error starting watcher:'), error);
    process.exit(1);
  }
}

async function watchSingleFile(
  filePath: string,
  options: WatchOptions,
  converter: FlowiseToLangChainConverter,
  debounceMs: number,
  watchedFiles: Map<string, NodeJS.Timeout>
): Promise<void> {
  if (!isFlowiseFile(filePath)) {
    console.error(chalk.yellow('⚠️  File is not a Flowise JSON file'));
    return;
  }

  console.log(chalk.green(`👀 Watching file: ${filePath}`));

  const watcher = watch(filePath, (eventType) => {
    if (eventType === 'change') {
      handleFileChange(filePath, options, converter, debounceMs, watchedFiles);
    }
  });

  // Handle initial conversion
  await convertFile(filePath, options, converter);

  // Keep process running
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n🛑 Stopping watcher...'));
    watcher.close();
    process.exit(0);
  });
}

async function watchDirectory(
  dirPath: string,
  options: WatchOptions,
  converter: FlowiseToLangChainConverter,
  debounceMs: number,
  watchedFiles: Map<string, NodeJS.Timeout>
): Promise<void> {
  console.log(chalk.green(`👀 Watching directory: ${dirPath}`));

  const watcher = watch(
    dirPath,
    { recursive: options.recursive },
    (eventType, filename) => {
      if (!filename) return;

      const fullPath = join(dirPath, filename);

      if (eventType === 'change' && isFlowiseFile(fullPath)) {
        handleFileChange(
          fullPath,
          options,
          converter,
          debounceMs,
          watchedFiles
        );
      }
    }
  );

  // Convert existing files
  await convertExistingFiles(dirPath, options, converter);

  // Keep process running
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n🛑 Stopping watcher...'));
    watcher.close();
    process.exit(0);
  });
}

function handleFileChange(
  filePath: string,
  options: WatchOptions,
  converter: FlowiseToLangChainConverter,
  debounceMs: number,
  watchedFiles: Map<string, NodeJS.Timeout>
): void {
  // Clear existing timeout for this file
  const existingTimeout = watchedFiles.get(filePath);
  if (existingTimeout) {
    clearTimeout(existingTimeout);
  }

  // Set new debounced timeout
  const timeout = setTimeout(async () => {
    await convertFile(filePath, options, converter);
    watchedFiles.delete(filePath);
  }, debounceMs);

  watchedFiles.set(filePath, timeout);
}

async function convertFile(
  filePath: string,
  options: WatchOptions,
  converter: FlowiseToLangChainConverter
): Promise<void> {
  const spinner = ora(`Converting ${basename(filePath)}...`).start();

  try {
    // Read file content
    const content = await fs.readFile(filePath, 'utf-8');

    // Convert using the converter
    const result = await converter.convert(content, {
      outputPath: options.output,
      targetLanguage: 'typescript',
    });

    if (!result.success) {
      spinner.fail(`Conversion failed for ${basename(filePath)}`);
      console.error(chalk.red('Errors:'));
      result.errors.forEach((error) =>
        console.error(chalk.red(`  - ${error}`))
      );
      return;
    }

    // Generate output filename
    const outputFileName = basename(filePath, extname(filePath)) + '.ts';
    const outputPath = join(options.output, outputFileName);

    // Check if file exists and overwrite option
    if (!options.overwrite) {
      try {
        await fs.access(outputPath);
        spinner.warn(
          `File exists: ${outputFileName} (use --overwrite to replace)`
        );
        return;
      } catch {
        // File doesn't exist, proceed
      }
    }

    // Write converted code
    if (result.result?.files && result.result.files.length > 0) {
      const mainFile =
        result.result.files.find((f) => f.path.endsWith('.ts')) ||
        result.result.files[0];
      if (mainFile) {
        await fs.writeFile(outputPath, mainFile.content, 'utf-8');
      }

      spinner.succeed(`Converted ${basename(filePath)} → ${outputFileName}`);

      if (options.verbose) {
        console.log(chalk.gray(`  Nodes: ${result.metrics.nodeCount}`));
        console.log(chalk.gray(`  Duration: ${result.metrics.duration}ms`));
      }
    } else {
      spinner.fail(`No output generated for ${basename(filePath)}`);
    }
  } catch (error) {
    spinner.fail(`Error converting ${basename(filePath)}`);
    console.error(chalk.red('Error:'), error);
  }
}

async function convertExistingFiles(
  dirPath: string,
  options: WatchOptions,
  converter: FlowiseToLangChainConverter
): Promise<void> {
  try {
    const files = await fs.readdir(dirPath, { recursive: options.recursive });
    const flowiseFiles = files
      .map((file) => join(dirPath, file.toString()))
      .filter((file) => isFlowiseFile(file));

    if (flowiseFiles.length > 0) {
      console.log(
        chalk.blue(`📁 Converting ${flowiseFiles.length} existing files...`)
      );

      for (const file of flowiseFiles) {
        await convertFile(file, options, converter);
      }
    }
  } catch (error) {
    console.error(
      chalk.yellow('⚠️  Could not scan directory for existing files:'),
      error
    );
  }
}

function isFlowiseFile(filePath: string): boolean {
  return filePath.endsWith('.json') && !filePath.includes('node_modules');
}

export default createWatchCommand;
