import chalk from 'chalk';
import { LogLevel } from '../types.js';

export class Logger {
  private logLevel: string;

  constructor() {
    this.logLevel = process.env['FLOWISE_LOG_LEVEL'] || 'info';
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentIndex = levels.indexOf(this.logLevel);
    const messageIndex = levels.indexOf(level);
    return messageIndex >= currentIndex;
  }

  private formatMessage(
    level: string,
    message: string,
    context?: Record<string, unknown>
  ): string {
    const timestamp = new Date().toISOString();
    const levelColors = {
      debug: chalk.gray,
      info: chalk.blue,
      warn: chalk.yellow,
      error: chalk.red,
    };

    const colorFn =
      levelColors[level as keyof typeof levelColors] || chalk.white;
    const levelStr = colorFn(`[${level.toUpperCase()}]`);

    let formatted = `${chalk.gray(timestamp)} ${levelStr} ${message}`;

    if (context && Object.keys(context).length > 0) {
      const contextStr = JSON.stringify(context, null, 2);
      formatted += `\n${chalk.gray(contextStr)}`;
    }

    return formatted;
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, context));
    }
  }

  log(logEntry: LogLevel): void {
    const message = logEntry.message;
    const context = logEntry.context;

    switch (logEntry.level) {
      case 'debug':
        this.debug(message, context);
        break;
      case 'info':
        this.info(message, context);
        break;
      case 'warn':
        this.warn(message, context);
        break;
      case 'error':
        this.error(message, context);
        break;
    }
  }

  setLevel(level: string): void {
    this.logLevel = level;
    process.env['FLOWISE_LOG_LEVEL'] = level;
  }

  getLevel(): string {
    return this.logLevel;
  }

  // Utility methods for CLI feedback
  success(message: string): void {
    console.log(`${chalk.green('✅')} ${message}`);
  }

  failure(message: string): void {
    console.log(`${chalk.red('❌')} ${message}`);
  }

  warning(message: string): void {
    console.log(`${chalk.yellow('⚠️ ')} ${message}`);
  }

  step(message: string): void {
    console.log(`${chalk.blue('🔄')} ${message}`);
  }

  result(message: string): void {
    console.log(`${chalk.cyan('📋')} ${message}`);
  }

  tip(message: string): void {
    console.log(`${chalk.yellow('💡')} ${message}`);
  }
}

// Export a singleton instance
export const logger = new Logger();
