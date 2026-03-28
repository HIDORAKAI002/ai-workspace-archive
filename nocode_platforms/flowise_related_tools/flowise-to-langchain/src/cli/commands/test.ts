import { Command } from 'commander';
import { resolve, join } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { validateInputFile } from '../utils/validation.js';

export const testCommand = new Command('test')
  .description('Test converted LangChain code functionality')
  .argument('<input>', 'original Flowise JSON export file path')
  .option(
    '-o, --out <directory>',
    'directory containing converted code',
    './output'
  )
  .option(
    '--test-type <type>',
    'type of test to run (unit|integration|e2e|all)',
    'all'
  )
  .option('--timeout <ms>', 'test timeout in milliseconds', '30000')
  .option('--env <file>', 'environment file for testing', '.env.test')
  .option('--mock-external', 'mock external API calls for testing', false)
  .option('--generate-report', 'generate detailed test report', false)
  .option('--fix-tests', 'attempt to fix failing tests automatically', false)
  .option(
    '--dry-run',
    'show what tests would run without executing them',
    false
  )
  .action(async (inputPath: string, options: any) => {
    const spinner = ora('Initializing test environment...').start();

    try {
      const resolvedInput = resolve(inputPath);
      const resolvedOutput = resolve(options.out);

      // Validate input file
      spinner.text = 'Validating input file...';
      await validateInputFile(resolvedInput);

      // Check if output directory exists
      if (!existsSync(resolvedOutput)) {
        spinner.fail();
        logger.error(
          `Output directory '${resolvedOutput}' does not exist.`,
          {}
        );
        console.log();
        console.log(chalk.yellow('💡 Run conversion first:'));
        console.log(
          `   flowise-to-lc convert ${inputPath} --out ${options.out}`
        );
        process.exit(1);
      }

      // Check if the output directory contains converted code
      const packageJsonPath = join(resolvedOutput, 'package.json');
      if (!existsSync(packageJsonPath)) {
        spinner.fail();
        logger.error(
          'Output directory does not contain a valid Node.js project (missing package.json).',
          {}
        );
        console.log();
        console.log(
          chalk.yellow('💡 Make sure the conversion completed successfully.')
        );
        process.exit(1);
      }

      // Load test configuration
      spinner.text = 'Loading test configuration...';
      const testConfig = {
        inputPath: resolvedInput,
        outputPath: resolvedOutput,
        testType: options.testType,
        timeout: parseInt(options.timeout),
        envFile: options.env,
        mockExternal: options.mockExternal,
        generateReport: options.generateReport,
        fixTests: options.fixTests,
        dryRun: options.dryRun,
      };

      if (testConfig.dryRun) {
        spinner.info('Dry run mode - showing planned tests...');

        const { planTests } = await import('../utils/test-planner.js');
        const testPlan = await planTests(testConfig);

        console.log();
        console.log(chalk.bold('📋 Test Plan:'));
        console.log(`  ${chalk.cyan('Test Type:')} ${testConfig.testType}`);
        console.log(`  ${chalk.cyan('Total Tests:')} ${testPlan.totalTests}`);
        console.log(
          `  ${chalk.cyan('Estimated Duration:')} ${testPlan.estimatedDuration}ms`
        );

        if (testPlan.unitTests.length > 0) {
          console.log();
          console.log(chalk.bold('🧪 Unit Tests:'));
          testPlan.unitTests.forEach((test) => {
            console.log(
              `  ${chalk.green('•')} ${test.name} - ${test.description}`
            );
          });
        }

        if (testPlan.integrationTests.length > 0) {
          console.log();
          console.log(chalk.bold('🔗 Integration Tests:'));
          testPlan.integrationTests.forEach((test) => {
            console.log(
              `  ${chalk.blue('•')} ${test.name} - ${test.description}`
            );
          });
        }

        if (testPlan.e2eTests.length > 0) {
          console.log();
          console.log(chalk.bold('🚀 End-to-End Tests:'));
          testPlan.e2eTests.forEach((test) => {
            console.log(
              `  ${chalk.magenta('•')} ${test.name} - ${test.description}`
            );
          });
        }

        console.log();
        console.log(
          chalk.yellow('To run these tests, remove the --dry-run flag.')
        );
        return;
      }

      // Import test runner dynamically
      const { TestRunner } = await import('../utils/test-runner.js');
      const testRunner = new TestRunner(testConfig);

      // Setup test environment
      spinner.text = 'Setting up test environment...';
      await testRunner.setupEnvironment();

      // Run tests based on type
      const results = {
        unit: null as any,
        integration: null as any,
        e2e: null as any,
      };

      if (testConfig.testType === 'unit' || testConfig.testType === 'all') {
        spinner.text = 'Running unit tests...';
        results.unit = await testRunner.runUnitTests();

        if (!results.unit.success) {
          if (testConfig.fixTests) {
            spinner.text = 'Attempting to fix failing unit tests...';
            const fixResult = await testRunner.fixFailingTests(results.unit);
            if (fixResult.success) {
              results.unit = await testRunner.runUnitTests();
            }
          }
        }
      }

      if (
        testConfig.testType === 'integration' ||
        testConfig.testType === 'all'
      ) {
        spinner.text = 'Running integration tests...';
        results.integration = await testRunner.runIntegrationTests();

        if (!results.integration.success && testConfig.fixTests) {
          spinner.text = 'Attempting to fix failing integration tests...';
          const fixResult = await testRunner.fixFailingTests(
            results.integration
          );
          if (fixResult.success) {
            results.integration = await testRunner.runIntegrationTests();
          }
        }
      }

      if (testConfig.testType === 'e2e' || testConfig.testType === 'all') {
        spinner.text = 'Running end-to-end tests...';
        results.e2e = await testRunner.runE2ETests();

        if (!results.e2e.success && testConfig.fixTests) {
          spinner.text = 'Attempting to fix failing e2e tests...';
          const fixResult = await testRunner.fixFailingTests(results.e2e);
          if (fixResult.success) {
            results.e2e = await testRunner.runE2ETests();
          }
        }
      }

      // Calculate overall success
      const allResults = Object.values(results).filter(Boolean);
      const overallSuccess = allResults.every((result) => result.success);
      const totalTests = allResults.reduce(
        (sum, result) => sum + result.totalTests,
        0
      );
      const passedTests = allResults.reduce(
        (sum, result) => sum + result.passedTests,
        0
      );

      if (overallSuccess) {
        spinner.succeed(chalk.green('All tests passed successfully!'));
      } else {
        spinner.fail(chalk.red('Some tests failed.'));
      }

      // Display test results summary
      console.log();
      console.log(chalk.bold('📊 Test Results Summary:'));
      console.log(`  ${chalk.cyan('Total Tests:')} ${totalTests}`);
      console.log(`  ${chalk.green('Passed:')} ${passedTests}`);
      console.log(`  ${chalk.red('Failed:')} ${totalTests - passedTests}`);
      console.log(
        `  ${chalk.cyan('Success Rate:')} ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0}%`
      );

      if (results.unit) {
        console.log();
        console.log(chalk.bold('🧪 Unit Tests:'));
        console.log(
          `  ${chalk.cyan('Tests:')} ${results.unit.passedTests}/${results.unit.totalTests}`
        );
        console.log(`  ${chalk.cyan('Duration:')} ${results.unit.duration}ms`);
        console.log(
          `  ${chalk.cyan('Coverage:')} ${results.unit.coverage || 'N/A'}`
        );
      }

      if (results.integration) {
        console.log();
        console.log(chalk.bold('🔗 Integration Tests:'));
        console.log(
          `  ${chalk.cyan('Tests:')} ${results.integration.passedTests}/${results.integration.totalTests}`
        );
        console.log(
          `  ${chalk.cyan('Duration:')} ${results.integration.duration}ms`
        );
      }

      if (results.e2e) {
        console.log();
        console.log(chalk.bold('🚀 End-to-End Tests:'));
        console.log(
          `  ${chalk.cyan('Tests:')} ${results.e2e.passedTests}/${results.e2e.totalTests}`
        );
        console.log(`  ${chalk.cyan('Duration:')} ${results.e2e.duration}ms`);
      }

      // Show failed tests details
      const failedTests = allResults.flatMap(
        (result) => result.failedTests || []
      );
      if (failedTests.length > 0) {
        console.log();
        console.log(chalk.bold.red('❌ Failed Tests:'));
        failedTests.forEach((test, index) => {
          console.log(`  ${chalk.red(`${index + 1}.`)} ${test.name}`);
          console.log(`     ${chalk.gray(test.error)}`);
          if (test.suggestion) {
            console.log(`     ${chalk.yellow(`💡 ${test.suggestion}`)}`);
          }
        });
      }

      // Generate detailed report if requested
      if (testConfig.generateReport) {
        const reportPath = join(resolvedOutput, 'test-report.json');
        const { writeFile } = await import('fs/promises');

        await writeFile(
          reportPath,
          JSON.stringify(
            {
              timestamp: new Date().toISOString(),
              inputFile: resolvedInput,
              outputDirectory: resolvedOutput,
              configuration: testConfig,
              results,
              summary: {
                totalTests,
                passedTests,
                failedTests: totalTests - passedTests,
                successRate:
                  totalTests > 0 ? (passedTests / totalTests) * 100 : 0,
                overallSuccess,
              },
            },
            null,
            2
          )
        );

        console.log();
        console.log(
          chalk.blue(`📄 Detailed test report saved to: ${reportPath}`)
        );
      }

      // Cleanup test environment
      await testRunner.cleanup();

      if (!overallSuccess) {
        console.log();
        console.log(chalk.bold('🔧 Troubleshooting:'));
        console.log(
          `  ${chalk.cyan('1.')} Check environment variables in ${testConfig.envFile}`
        );
        console.log(
          `  ${chalk.cyan('2.')} Verify all dependencies are installed: cd ${resolvedOutput} && npm install`
        );
        console.log(
          `  ${chalk.cyan('3.')} Review the original Flowise export for unsupported features`
        );
        console.log(
          `  ${chalk.cyan('4.')} Use --fix-tests to automatically repair common issues`
        );

        process.exit(1);
      }

      console.log();
      console.log(chalk.bold('🎉 Conversion validation complete!'));
      console.log('Your LangChain code is ready for deployment.');
    } catch (error) {
      spinner.fail();
      const err = error as Error;
      logger.error('Testing failed:', { error: err.message });

      if (process.env['FLOWISE_LOG_LEVEL'] === 'debug') {
        console.error(err.stack);
      }

      // Provide helpful error messages
      if (err.message.includes('dependencies')) {
        console.log();
        console.log(chalk.yellow('💡 Install dependencies first:'));
        console.log(`   cd ${options.out} && npm install`);
      } else if (err.message.includes('environment')) {
        console.log();
        console.log(chalk.yellow('💡 Check your environment configuration:'));
        console.log(
          `   cp ${options.out}/.env.example ${options.out}/${options.env}`
        );
      }

      process.exit(1);
    }
  });

// Add examples to the test command help
testCommand.addHelpText(
  'after',
  `
${chalk.bold('Examples:')}
  ${chalk.cyan('# Test converted code')}
  $ flowise-to-lc test my-flow.json --out ./output

  ${chalk.cyan('# Run only unit tests')}
  $ flowise-to-lc test my-flow.json --test-type unit

  ${chalk.cyan('# Test with custom environment and timeout')}
  $ flowise-to-lc test my-flow.json --env .env.staging --timeout 60000

  ${chalk.cyan('# Generate detailed test report')}
  $ flowise-to-lc test my-flow.json --generate-report

  ${chalk.cyan('# Mock external APIs for testing')}
  $ flowise-to-lc test my-flow.json --mock-external

  ${chalk.cyan('# Preview test plan without running')}
  $ flowise-to-lc test my-flow.json --dry-run

  ${chalk.cyan('# Auto-fix failing tests')}
  $ flowise-to-lc test my-flow.json --fix-tests
`
);
