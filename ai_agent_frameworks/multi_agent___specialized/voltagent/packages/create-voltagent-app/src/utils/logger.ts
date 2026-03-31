import chalk from "chalk";

const logLevels = {
  info: chalk.blue("ℹ"),
  success: chalk.green("✓"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✖"),
};

const logger = {
  info: (message: string): void => {
    console.log(`${logLevels.info} ${message}`);
  },
  success: (message: string): void => {
    console.log(`${logLevels.success} ${message}`);
  },
  warning: (message: string): void => {
    console.log(`${logLevels.warning} ${message}`);
  },
  error: (message: string): void => {
    console.error(`${logLevels.error} ${message}`);
  },
  title: (message: string): void => {
    console.log(chalk.bold.underline(message));
  },
  blank: (): void => {
    console.log();
  },
};

export default logger;
