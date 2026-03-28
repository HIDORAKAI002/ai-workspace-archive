import { Command } from 'commander';
import { resolve } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { validateInputFile } from '../utils/validation.js';
import { ConversionOptions } from '../types.js';

export const convertCommand = new Command('convert')
  .description('Convert Flowise flow to LangChain code')
  .argument('<input>', 'Flowise JSON export file path')
  .option(
    '-o, --out <directory>',
    'output directory for generated code',
    './output'
  )
  .option('--with-langfuse', 'include LangFuse tracing integration', false)
  .option(
    '--flowise-version <version>',
    'target Flowise version for compatibility',
    'latest'
  )
  .option('--self-test', 'run self-tests on generated code', false)
  .option('--overwrite', 'overwrite existing output directory', false)
  .option(
    '--format <format>',
    'output format (typescript|javascript|python)',
    'typescript'
  )
  .option('--target <target>', 'target environment (node|browser|edge)', 'node')
  .option(
    '--include-tests',
    'generate test files for the converted code',
    false
  )
  .option(
    '--include-docs',
    'generate documentation for the converted code',
    false
  )
  .action(async (inputPath: string, options: any) => {
    const spinner = ora('Starting conversion...').start();

    try {
      // Resolve paths
      const resolvedInput = resolve(inputPath);
      const resolvedOutput = resolve(options.out);

      // Validate input file
      spinner.text = 'Validating input file...';
      await validateInputFile(resolvedInput);

      // Check if output directory exists and handle overwrite
      if (existsSync(resolvedOutput) && !options.overwrite) {
        spinner.fail();
        logger.error(
          `Output directory '${resolvedOutput}' already exists. Use --overwrite to replace it.`,
          {}
        );
        process.exit(1);
      }

      // Build conversion options
      const conversionOptions: ConversionOptions = {
        inputPath: resolvedInput,
        outputPath: resolvedOutput,
        withLangfuse: options.withLangfuse,
        flowiseVersion: options.flowiseVersion,
        selfTest: options.selfTest,
        overwrite: options.overwrite,
        format: options.format as 'typescript' | 'javascript' | 'python',
        target: options.target as 'node' | 'browser' | 'edge',
        includeTests: options.includeTests,
        includeDocs: options.includeDocs,
      };

      logger.info('Starting conversion with options:', { conversionOptions });

      // Import the integrated converter pipeline
      const { ConverterPipeline } = await import('../../converter.js');

      spinner.text = 'Initializing converter...';
      const pipeline = new ConverterPipeline({
        verbose: process.env['FLOWISE_LOG_LEVEL'] === 'debug',
        silent: false,
      });

      spinner.text = 'Converting Flowise flow to LangChain code...';
      const result = await pipeline.convertFile(resolvedInput, {
        outputPath: resolvedOutput,
        includeLangfuse: conversionOptions.withLangfuse,
        target: 'typescript',
        outputFormat: conversionOptions.format === 'javascript' ? 'cjs' : 'esm',
        includeComments: true,
        overwrite: conversionOptions.overwrite,
        verbose: process.env['FLOWISE_LOG_LEVEL'] === 'debug',
        silent: false,
      });

      // Check conversion result
      if (!result.success) {
        spinner.fail();
        logger.error('Conversion failed:', { errors: result.errors });

        if (result.errors.length > 0) {
          console.log();
          console.log(chalk.red('❌ Errors:'));
          result.errors.forEach((error: string) => {
            console.log(`  ${chalk.red('•')} ${error}`);
          });
        }

        process.exit(1);
      }

      if (conversionOptions.selfTest) {
        spinner.text = 'Running self-tests on generated code...';

        // Import and run test utilities
        const { TestRunner } = await import('../utils/test-runner.js');
        const testConfig = {
          inputPath: resolvedInput,
          outputPath: resolvedOutput,
          testType: 'all' as const,
          timeout: 30000,
          envFile: '.env.test',
          mockExternal: true,
          generateReport: false,
          fixTests: false,
          dryRun: false,
        };
        const testRunner = new TestRunner(testConfig);

        // Setup and run tests
        await testRunner.setupEnvironment();
        const testResults = await testRunner.runUnitTests();

        if (!testResults.success) {
          spinner.fail();
          logger.error('Self-tests failed:', {
            errors: testResults.failedTests,
          });
          process.exit(1);
        }

        logger.info(
          `Self-tests passed: ${testResults.totalTests} tests completed successfully`,
          { testResults }
        );
      }

      spinner.succeed(chalk.green('Conversion completed successfully!'));

      // Display results summary
      console.log();
      console.log(chalk.bold('📋 Conversion Summary:'));
      console.log(`  ${chalk.cyan('Input:')} ${resolvedInput}`);
      console.log(`  ${chalk.cyan('Output:')} ${resolvedOutput}`);
      console.log(`  ${chalk.cyan('Format:')} ${conversionOptions.format}`);
      console.log(`  ${chalk.cyan('Target:')} ${conversionOptions.target}`);
      console.log(
        `  ${chalk.cyan('Nodes processed:')} ${result.analysis.nodeCount}`
      );
      console.log(
        `  ${chalk.cyan('Connections:')} ${result.analysis.connectionCount}`
      );
      console.log(`  ${chalk.cyan('Files generated:')} ${result.files.length}`);
      console.log(
        `  ${chalk.cyan('Total size:')} ${(result.metrics.totalBytes / 1024).toFixed(1)} KB`
      );
      console.log(
        `  ${chalk.cyan('Conversion time:')} ${result.metrics.duration}ms`
      );
      console.log(
        `  ${chalk.cyan('Type coverage:')} ${result.analysis.coverage.toFixed(1)}%`
      );
      console.log(
        `  ${chalk.cyan('Complexity:')} ${result.analysis.complexity}`
      );

      if (conversionOptions.withLangfuse) {
        console.log(`  ${chalk.cyan('LangFuse:')} ✅ Enabled`);
      }

      if (result.warnings.length > 0) {
        console.log();
        console.log(chalk.yellow('⚠️  Warnings:'));
        result.warnings.forEach((warning: string) => {
          console.log(`  ${chalk.yellow('•')} ${warning}`);
        });
      }

      if (result.analysis.unsupportedTypes.length > 0) {
        console.log();
        console.log(chalk.yellow('🔶 Unsupported node types:'));
        result.analysis.unsupportedTypes.forEach((nodeType: string) => {
          console.log(`  ${chalk.yellow('•')} ${nodeType}`);
        });
        console.log(
          `  ${chalk.gray('These nodes were skipped during conversion')}`
        );
      }

      console.log();
      console.log(chalk.bold('🚀 Next steps:'));
      console.log(
        `  ${chalk.cyan('1.')} Review the generated code in: ${resolvedOutput}`
      );
      console.log(
        `  ${chalk.cyan('2.')} Install dependencies: cd ${resolvedOutput} && npm install`
      );
      console.log(
        `  ${chalk.cyan('3.')} Configure environment variables (see .env.example)`
      );

      if (conversionOptions.includeTests) {
        console.log(`  ${chalk.cyan('4.')} Run tests: npm test`);
      }

      if (!conversionOptions.selfTest) {
        console.log(
          `  ${chalk.cyan('4.')} Test the conversion: flowise-to-lc test ${inputPath} --out ${options.out}`
        );
      }
    } catch (error) {
      spinner.fail();
      const err = error as Error;
      logger.error('Conversion failed:', { error: err.message });

      if (process.env['FLOWISE_LOG_LEVEL'] === 'debug') {
        console.error(err.stack);
      }

      // Provide helpful error messages for common issues
      if (err.message.includes('ENOENT')) {
        console.log();
        console.log(
          chalk.yellow(
            '💡 Make sure the input file exists and you have read permissions.'
          )
        );
      } else if (err.message.includes('JSON')) {
        console.log();
        console.log(
          chalk.yellow(
            '💡 The input file may not be a valid Flowise export. Try:'
          )
        );
        console.log(`   flowise-to-lc validate ${inputPath}`);
      } else if (err.message.includes('permission')) {
        console.log();
        console.log(
          chalk.yellow(
            '💡 Check that you have write permissions to the output directory.'
          )
        );
      }

      process.exit(1);
    }
  });

// Add examples to the convert command help
convertCommand.addHelpText(
  'after',
  `
${chalk.bold('Examples:')}
  ${chalk.cyan('# Basic conversion')}
  $ flowise-to-lc convert my-flow.json

  ${chalk.cyan('# Convert to custom directory with LangFuse')}
  $ flowise-to-lc convert my-flow.json --out ./my-project --with-langfuse

  ${chalk.cyan('# Generate JavaScript instead of TypeScript')}
  $ flowise-to-lc convert my-flow.json --format javascript

  ${chalk.cyan('# Generate Python code')}
  $ flowise-to-lc convert my-flow.json --format python

  ${chalk.cyan('# Include tests and documentation')}
  $ flowise-to-lc convert my-flow.json --include-tests --include-docs

  ${chalk.cyan('# Target browser environment')}
  $ flowise-to-lc convert my-flow.json --target browser

  ${chalk.cyan('# Convert with self-testing')}
  $ flowise-to-lc convert my-flow.json --self-test
`
);
