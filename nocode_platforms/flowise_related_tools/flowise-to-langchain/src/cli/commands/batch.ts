/**
 * Batch Command - Convert multiple Flowise files in parallel
 */

import { Command } from 'commander';
import { promises as fs } from 'fs';
import { join, basename, extname, dirname } from 'path';
import { glob } from 'glob';
import chalk from 'chalk';
import ora from 'ora';
import { FlowiseToLangChainConverter } from '../../index.js';

interface BatchOptions {
  output: string;
  pattern?: string;
  recursive?: boolean;
  parallel?: number;
  verbose?: boolean;
  overwrite?: boolean;
  dryRun?: boolean;
  summary?: boolean;
}

interface ConversionResult {
  file: string;
  success: boolean;
  outputFile?: string;
  duration: number;
  errors?: string[];
  warnings?: string[];
  nodeCount?: number;
}

export function createBatchCommand(): Command {
  return new Command('batch')
    .description('Convert multiple Flowise files in parallel')
    .argument('<input>', 'Input directory or glob pattern')
    .option('-o, --output <path>', 'Output directory', './output')
    .option('-p, --pattern <glob>', 'File pattern to match', '**/*.json')
    .option('-r, --recursive', 'Search subdirectories recursively', true)
    .option('--parallel <num>', 'Number of parallel conversions', '4')
    .option('-v, --verbose', 'Verbose output', false)
    .option('--overwrite', 'Overwrite existing files', false)
    .option(
      '--dry-run',
      'Show what would be converted without actually converting',
      false
    )
    .option('--summary', 'Show detailed summary after conversion', true)
    .action(async (input: string, options: BatchOptions) => {
      await batchConvert(input, options);
    });
}

async function batchConvert(
  input: string,
  options: BatchOptions
): Promise<void> {
  const startTime = Date.now();
  const converter = new FlowiseToLangChainConverter({
    verbose: options.verbose,
  });
  const parallelLimit = parseInt(options.parallel?.toString() || '4');

  console.log(chalk.blue('🚀 Starting batch conversion...'));
  console.log(chalk.gray(`   Input: ${input}`));
  console.log(chalk.gray(`   Pattern: ${options.pattern}`));
  console.log(chalk.gray(`   Output: ${options.output}`));
  console.log(chalk.gray(`   Parallel: ${parallelLimit}`));

  // Find files to convert
  const files = await findFiles(input, options);

  if (files.length === 0) {
    console.log(chalk.yellow('⚠️  No Flowise files found'));
    return;
  }

  console.log(chalk.green(`📁 Found ${files.length} files to convert`));

  if (options.dryRun) {
    console.log(chalk.blue('🔍 Dry run - files that would be converted:'));
    files.forEach((file) => {
      const outputFile = generateOutputPath(file, input, options.output);
      console.log(chalk.gray(`  ${file} → ${outputFile}`));
    });
    return;
  }

  // Ensure output directory exists
  await fs.mkdir(options.output, { recursive: true });

  // Process files in parallel batches
  const results: ConversionResult[] = [];
  const spinner = ora('Converting files...').start();

  for (let i = 0; i < files.length; i += parallelLimit) {
    const batch = files.slice(i, i + parallelLimit);
    const batchPromises = batch.map((file) =>
      convertSingleFile(file, input, options, converter)
    );

    try {
      const batchResults = await Promise.allSettled(batchPromises);

      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push({
            file: batch[index] || '',
            success: false,
            duration: 0,
            errors: [result.reason?.message || 'Unknown error'],
          });
        }
      });

      // Update spinner
      const completed = i + batch.length;
      const percentage = Math.round((completed / files.length) * 100);
      spinner.text = `Converting files... ${completed}/${files.length} (${percentage}%)`;
    } catch (error) {
      spinner.fail('Batch conversion failed');
      console.error(chalk.red('Error:'), error);
      return;
    }
  }

  spinner.succeed('Batch conversion completed');

  // Show results
  displayResults(results, Date.now() - startTime, options);
}

async function findFiles(
  input: string,
  options: BatchOptions
): Promise<string[]> {
  try {
    const stats = await fs.stat(input);

    if (stats.isFile()) {
      return isFlowiseFile(input) ? [input] : [];
    } else if (stats.isDirectory()) {
      const pattern = join(input, options.pattern || '**/*.json');
      const files = await glob(pattern, {
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
        nodir: true,
      });

      return files.filter(isFlowiseFile);
    } else {
      // Treat as glob pattern
      const files = await glob(input, {
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
        nodir: true,
      });

      return files.filter(isFlowiseFile);
    }
  } catch (error) {
    throw new Error(`Cannot access input: ${input}`);
  }
}

async function convertSingleFile(
  filePath: string,
  inputBase: string,
  options: BatchOptions,
  converter: FlowiseToLangChainConverter
): Promise<ConversionResult> {
  const startTime = Date.now();

  try {
    // Read file content
    const content = await fs.readFile(filePath, 'utf-8');

    // Convert using the converter
    const result = await converter.convert(content, {
      outputPath: options.output,
      targetLanguage: 'typescript',
    });

    if (!result.success) {
      return {
        file: filePath,
        success: false,
        duration: Date.now() - startTime,
        errors: result.errors,
        warnings: result.warnings,
      };
    }

    // Generate output path
    const outputPath = generateOutputPath(filePath, inputBase, options.output);
    const outputDir = dirname(outputPath);

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Check if file exists
    if (!options.overwrite) {
      try {
        await fs.access(outputPath);
        return {
          file: filePath,
          success: false,
          duration: Date.now() - startTime,
          errors: [`Output file exists: ${outputPath} (use --overwrite)`],
        };
      } catch {
        // File doesn't exist, proceed
      }
    }

    // Write converted code
    if (result.result?.files && result.result.files.length > 0) {
      const mainFile =
        result.result.files.find((f) => f.path.endsWith('.ts')) ||
        result.result.files[0];

      if (!mainFile) {
        throw new Error('No output file generated');
      }

      await fs.writeFile(outputPath, mainFile.content, 'utf-8');

      return {
        file: filePath,
        success: true,
        outputFile: outputPath,
        duration: Date.now() - startTime,
        warnings: result.warnings,
        nodeCount: result.metrics.nodeCount,
      };
    } else {
      return {
        file: filePath,
        success: false,
        duration: Date.now() - startTime,
        errors: ['No output generated'],
      };
    }
  } catch (error) {
    return {
      file: filePath,
      success: false,
      duration: Date.now() - startTime,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

function generateOutputPath(
  filePath: string,
  inputBase: string,
  outputBase: string
): string {
  try {
    const stats = require('fs').statSync(inputBase);
    if (stats.isFile()) {
      // Input is a single file, output directly to output directory
      const fileName = basename(filePath, extname(filePath)) + '.ts';
      return join(outputBase, fileName);
    } else {
      // Input is a directory, preserve structure
      const relativePath = require('path').relative(inputBase, filePath);
      const outputFileName =
        basename(relativePath, extname(relativePath)) + '.ts';
      const outputDir = dirname(relativePath);
      return join(outputBase, outputDir, outputFileName);
    }
  } catch {
    // Fallback
    const fileName = basename(filePath, extname(filePath)) + '.ts';
    return join(outputBase, fileName);
  }
}

function displayResults(
  results: ConversionResult[],
  totalDuration: number,
  options: BatchOptions
): void {
  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  const totalNodes = successful.reduce((sum, r) => sum + (r.nodeCount || 0), 0);

  console.log('\n' + chalk.blue('📊 Conversion Summary'));
  console.log(chalk.green(`✅ Successful: ${successful.length}`));
  console.log(chalk.red(`❌ Failed: ${failed.length}`));
  console.log(chalk.gray(`⏱️  Total time: ${totalDuration}ms`));
  console.log(chalk.gray(`🔢 Total nodes: ${totalNodes}`));

  if (failed.length > 0) {
    console.log('\n' + chalk.red('❌ Failed conversions:'));
    failed.forEach((result) => {
      console.log(chalk.red(`  ${result.file}`));
      if (result.errors) {
        result.errors.forEach((error) => {
          console.log(chalk.gray(`    - ${error}`));
        });
      }
    });
  }

  if (options.summary && successful.length > 0) {
    console.log('\n' + chalk.green('✅ Successful conversions:'));
    successful.forEach((result) => {
      console.log(chalk.green(`  ${result.file} → ${result.outputFile}`));
      if (options.verbose) {
        console.log(
          chalk.gray(
            `    Nodes: ${result.nodeCount}, Duration: ${result.duration}ms`
          )
        );
        if (result.warnings && result.warnings.length > 0) {
          result.warnings.forEach((warning) => {
            console.log(chalk.yellow(`    ⚠️  ${warning}`));
          });
        }
      }
    });
  }

  // Performance stats
  if (successful.length > 0) {
    const avgDuration =
      successful.reduce((sum, r) => sum + r.duration, 0) / successful.length;
    const avgNodes = totalNodes / successful.length;

    console.log('\n' + chalk.blue('📈 Performance Stats'));
    console.log(chalk.gray(`  Average duration: ${Math.round(avgDuration)}ms`));
    console.log(
      chalk.gray(`  Average nodes per file: ${Math.round(avgNodes)}`)
    );
    console.log(
      chalk.gray(
        `  Conversion rate: ${Math.round(successful.length / (totalDuration / 1000))} files/sec`
      )
    );
  }
}

function isFlowiseFile(filePath: string): boolean {
  if (!filePath.endsWith('.json')) return false;
  if (filePath.includes('node_modules')) return false;
  if (filePath.includes('package.json')) return false;
  if (filePath.includes('tsconfig.json')) return false;

  // Additional check: could verify JSON structure contains Flowise-specific fields
  return true;
}

export default createBatchCommand;
