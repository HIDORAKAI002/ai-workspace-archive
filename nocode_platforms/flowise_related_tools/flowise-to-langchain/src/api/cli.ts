/**
 * CLI Integration for API Server
 *
 * This module provides CLI commands to start and manage the API server.
 */

import { Command } from 'commander';
import { ApiServer } from './index.js';
import { logger } from '../cli/utils/logger.js';

/**
 * Create API server command
 */
export const createApiCommand = (): Command => {
  const apiCommand = new Command('api');

  apiCommand
    .description('Start the API server')
    .option('-p, --port <port>', 'server port', '3001')
    .option('-h, --host <host>', 'server host', '0.0.0.0')
    .option('--max-file-size <size>', 'maximum file upload size in MB', '10')
    .option('--max-connections <count>', 'maximum WebSocket connections', '100')
    .option('--rate-limit <requests>', 'requests per 15 minutes per IP', '100')
    .option(
      '--cors-origin <origins>',
      'allowed CORS origins (comma-separated)',
      'http://localhost:3000'
    )
    .option('--api-key <key>', 'API key for authentication (optional)')
    .option('--verbose', 'enable verbose logging')
    .option('--silent', 'suppress all output except errors')
    .action(async (options) => {
      try {
        // Set up environment
        if (options.apiKey) {
          process.env.API_KEY = options.apiKey;
        }

        if (options.verbose) {
          process.env.FLOWISE_LOG_LEVEL = 'debug';
        } else if (options.silent) {
          process.env.FLOWISE_LOG_LEVEL = 'error';
        }

        // Parse configuration
        const config = {
          port: parseInt(options.port, 10),
          host: options.host,
          cors: {
            origin: options.corsOrigin.split(',').map((o: string) => o.trim()),
            credentials: true,
          },
          upload: {
            maxFileSize: parseInt(options.maxFileSize, 10) * 1024 * 1024, // Convert MB to bytes
            allowedMimeTypes: ['application/json', 'text/plain'],
            tempDir: '/tmp/flowise-api-uploads',
          },
          websocket: {
            heartbeatInterval: 30000,
            maxConnections: parseInt(options.maxConnections, 10),
          },
          rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: parseInt(options.rateLimit, 10),
          },
        };

        logger.info('Starting API server...', { config });

        // Create and start server
        const server = new ApiServer(config);
        await server.start();

        // Handle graceful shutdown
        const gracefulShutdown = async (signal: string) => {
          logger.info(`Received ${signal}, shutting down gracefully...`);

          try {
            await server.stop();
            logger.info('Server stopped successfully');
            process.exit(0);
          } catch (error) {
            logger.error('Error during shutdown:', { error });
            process.exit(1);
          }
        };

        // Register shutdown handlers
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon restart

        logger.info('API server started successfully');
      } catch (error) {
        logger.error('Failed to start API server:', { error });
        process.exit(1);
      }
    });

  return apiCommand;
};

/**
 * Add API command to existing CLI
 */
export const addApiCommand = (program: Command): void => {
  program.addCommand(createApiCommand());
};
