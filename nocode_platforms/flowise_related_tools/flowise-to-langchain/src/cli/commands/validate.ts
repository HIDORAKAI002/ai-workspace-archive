import { Command } from 'commander';
import { resolve } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import {
  validateInputFile,
  validateFlowiseExport,
} from '../utils/validation.js';

export const validateCommand = new Command('validate')
  .description('Validate Flowise export file format and structure')
  .argument('<input>', 'Flowise JSON export file path')
  .option('--strict', 'enable strict validation mode', false)
  .option(
    '--schema-version <version>',
    'validate against specific Flowise schema version'
  )
  .option('--fix-issues', 'attempt to automatically fix common issues', false)
  .option('--output-report', 'generate detailed validation report', false)
  .action(async (inputPath: string, options: any) => {
    const spinner = ora('Starting validation...').start();

    try {
      const resolvedInput = resolve(inputPath);

      // Basic file validation
      spinner.text = 'Checking file accessibility...';
      await validateInputFile(resolvedInput);

      // Load and parse JSON
      spinner.text = 'Parsing JSON structure...';
      const { readFile } = await import('fs/promises');
      const fileContent = await readFile(resolvedInput, 'utf-8');

      let flowiseData;
      try {
        flowiseData = JSON.parse(fileContent);
      } catch (parseError) {
        spinner.fail();
        logger.error('Invalid JSON format:', {
          error: (parseError as Error).message,
        });

        if (options.fixIssues) {
          console.log();
          console.log(chalk.yellow('🔧 Attempting to fix JSON issues...'));
          const { fixJsonIssues } = await import('../utils/json-fixer.js');
          const fixedData = await fixJsonIssues(fileContent);

          if (fixedData) {
            console.log(chalk.green('✅ JSON issues fixed successfully'));
            flowiseData = fixedData;
          } else {
            console.log(
              chalk.red('❌ Unable to automatically fix JSON issues')
            );
            process.exit(1);
          }
        } else {
          console.log();
          console.log(
            chalk.yellow(
              '💡 Try using --fix-issues to automatically repair common JSON problems'
            )
          );
          process.exit(1);
        }
      }

      // Use integrated validation pipeline
      spinner.text = 'Validating Flowise export structure...';
      const { ConverterPipeline } = await import('../../converter.js');

      const pipeline = new ConverterPipeline({
        verbose: process.env['FLOWISE_LOG_LEVEL'] === 'debug',
        silent: false,
      });

      const validationResult = await pipeline.validate(flowiseData);

      if (!validationResult.isValid) {
        spinner.fail();
        console.log();
        console.log(chalk.red('❌ Validation failed:'));

        // Display errors and warnings
        const errors = validationResult.errors || [];
        const warnings = validationResult.warnings || [];

        if (errors.length > 0) {
          console.log();
          console.log(chalk.bold.red('Errors:'));
          errors.forEach((error, index) => {
            console.log(`  ${chalk.red(`${index + 1}.`)} ${error}`);
          });
        }

        if (warnings.length > 0) {
          console.log();
          console.log(chalk.bold.yellow('Warnings:'));
          warnings.forEach((warning, index) => {
            console.log(`  ${chalk.yellow(`${index + 1}.`)} ${warning}`);
          });
        }

        if (options.fixIssues && (validationResult as any).fixable) {
          console.log();
          console.log(
            chalk.yellow(
              '🔧 Some issues can be automatically fixed. Attempting repairs...'
            )
          );

          const { fixFlowiseIssues } = await import(
            '../utils/flowise-fixer.js'
          );
          const fixedData = await fixFlowiseIssues(
            flowiseData,
            validationResult as any
          );

          if (fixedData) {
            // Re-validate the fixed data
            const revalidationResult = await validateFlowiseExport(fixedData, {
              strict: options.strict,
              schemaVersion: options.schemaVersion,
            });

            if (revalidationResult.isValid) {
              console.log(chalk.green('✅ Issues fixed successfully!'));
              console.log(
                chalk.blue('💾 Fixed data can be saved with --output option')
              );
            } else {
              console.log(
                chalk.yellow('⚠️  Some issues were fixed, but others remain')
              );
            }
          }
        }

        process.exit(1);
      }

      spinner.succeed(chalk.green('Validation completed successfully!'));

      // Display validation summary
      console.log();
      console.log(chalk.bold('📋 Validation Summary:'));
      console.log(`  ${chalk.cyan('File:')} ${resolvedInput}`);
      console.log(
        `  ${chalk.cyan('Status:')} ${chalk.green('Valid Flowise Export')}`
      );
      console.log(
        `  ${chalk.cyan('Nodes:')} ${validationResult.analysis?.nodeCount || 0}`
      );
      console.log(
        `  ${chalk.cyan('Connections:')} ${validationResult.analysis?.connectionCount || 0}`
      );
      console.log(
        `  ${chalk.cyan('File size:')} ${(fileContent.length / 1024).toFixed(2)} KB`
      );
      console.log(
        `  ${chalk.cyan('Type coverage:')} ${validationResult.analysis?.coverage.toFixed(1) || 0}%`
      );
      console.log(
        `  ${chalk.cyan('Complexity:')} ${validationResult.analysis?.complexity || 'unknown'}`
      );

      if (
        validationResult.analysis?.supportedTypes &&
        validationResult.analysis.supportedTypes.length > 0
      ) {
        console.log();
        console.log(chalk.bold('🎯 Supported Node Types:'));
        validationResult.analysis.supportedTypes.forEach((nodeType) => {
          console.log(`  ${chalk.green('✅')} ${nodeType}`);
        });
      }

      if (
        validationResult.analysis?.unsupportedTypes &&
        validationResult.analysis.unsupportedTypes.length > 0
      ) {
        console.log();
        console.log(chalk.bold('⚠️  Unsupported Node Types:'));
        validationResult.analysis.unsupportedTypes.forEach((nodeType) => {
          console.log(`  ${chalk.yellow('⚠️ ')} ${nodeType}`);
        });
        console.log(
          `  ${chalk.gray('These nodes will be skipped during conversion')}`
        );
      }

      if (validationResult.warnings && validationResult.warnings.length > 0) {
        console.log();
        console.log(chalk.bold.yellow('⚠️  Warnings:'));
        validationResult.warnings.forEach((warning) => {
          console.log(`  ${chalk.yellow('•')} ${warning}`);
        });
      }

      // Generate detailed report if requested
      if (options.outputReport) {
        const reportPath = resolve(`${resolvedInput}.validation-report.json`);
        const { writeFile } = await import('fs/promises');

        await writeFile(
          reportPath,
          JSON.stringify(
            {
              timestamp: new Date().toISOString(),
              inputFile: resolvedInput,
              validationResult,
              metadata: {
                fileSize: fileContent.length,
                nodeTypes: (validationResult as any).nodeTypes || [],
                complexity: (validationResult as any).complexity || 'unknown',
              },
            },
            null,
            2
          )
        );

        console.log();
        console.log(chalk.blue(`📄 Detailed report saved to: ${reportPath}`));
      }

      console.log();
      console.log(chalk.bold('🚀 Next steps:'));
      console.log(
        `  ${chalk.cyan('1.')} Convert to LangChain: flowise-to-lc convert ${inputPath}`
      );
      console.log(
        `  ${chalk.cyan('2.')} View supported node types: flowise-to-lc --help`
      );
    } catch (error) {
      spinner.fail();
      const err = error as Error;
      logger.error('Validation failed:', { error: err.message });

      if (process.env['FLOWISE_LOG_LEVEL'] === 'debug') {
        console.error(err.stack);
      }

      // Provide helpful error messages
      if (err.message.includes('ENOENT')) {
        console.log();
        console.log(
          chalk.yellow(
            '💡 Make sure the file exists and you have read permissions.'
          )
        );
      } else if (err.message.includes('too large')) {
        console.log();
        console.log(
          chalk.yellow(
            '💡 The file might be too large. Consider splitting it into smaller exports.'
          )
        );
      }

      process.exit(1);
    }
  });

// Add examples to the validate command help
validateCommand.addHelpText(
  'after',
  `
${chalk.bold('Examples:')}
  ${chalk.cyan('# Basic validation')}
  $ flowise-to-lc validate my-flow.json

  ${chalk.cyan('# Strict validation with detailed report')}
  $ flowise-to-lc validate my-flow.json --strict --output-report

  ${chalk.cyan('# Validate and fix common issues')}
  $ flowise-to-lc validate my-flow.json --fix-issues

  ${chalk.cyan('# Validate against specific Flowise version')}
  $ flowise-to-lc validate my-flow.json --schema-version 1.8.0
`
);
