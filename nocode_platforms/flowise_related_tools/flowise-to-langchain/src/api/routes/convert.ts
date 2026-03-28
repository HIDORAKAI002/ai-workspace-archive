/**
 * Convert Routes
 *
 * API routes for converting Flowise flows to LangChain code.
 */

import { Router } from 'express';
import { ConvertRequest, ConvertResponse, ApiResponse } from '../types/api.js';
import { ConversionService } from '../services/conversion.js';
import { WebSocketService } from '../services/websocket.js';
import { asyncHandler } from '../middleware/async.js';
import { validateRequest } from '../middleware/validation.js';
import { logger } from '../../cli/utils/logger.js';

export const convertRouter = Router();

/**
 * POST /api/convert
 * Convert Flowise flow to LangChain code
 */
convertRouter.post(
  '/',
  validateRequest({
    body: {
      type: 'object',
      properties: {
        input: {
          oneOf: [{ type: 'string' }, { type: 'object' }],
        },
        options: {
          type: 'object',
          properties: {
            format: {
              type: 'string',
              enum: ['typescript', 'javascript', 'python'],
            },
            target: { type: 'string', enum: ['node', 'browser', 'edge'] },
            withLangfuse: { type: 'boolean' },
            includeTests: { type: 'boolean' },
            includeDocs: { type: 'boolean' },
            includeComments: { type: 'boolean' },
            outputFormat: { type: 'string', enum: ['esm', 'cjs'] },
            verbose: { type: 'boolean' },
          },
        },
        stream: { type: 'boolean' },
        connectionId: { type: 'string' },
      },
      required: ['input'],
    },
  }),
  asyncHandler(async (req, res) => {
    const request: ConvertRequest = req.body;
    const conversionService: ConversionService =
      req.app.locals.services.conversion;
    const websocketService: WebSocketService =
      req.app.locals.services.websocket;

    logger.info('Convert request received:', {
      hasInput: !!request.input,
      inputType: typeof request.input,
      options: request.options,
      stream: request.stream,
      connectionId: request.connectionId,
    });

    try {
      // If streaming is enabled, set up WebSocket progress updates
      if (request.stream && request.connectionId) {
        // Subscribe to conversion progress
        const progressHandler = (progress: any) => {
          websocketService.broadcastProgress(progress.jobId, progress);
        };
        conversionService.on('job:progress', progressHandler);

        // Subscribe to conversion completion
        const completeHandler = (event: any) => {
          websocketService.broadcastResult(
            event.jobId,
            event.result,
            'convert'
          );
        };
        conversionService.on('conversion:completed', completeHandler);

        // Subscribe to conversion failure
        const failedHandler = (event: any) => {
          websocketService.broadcastError(event.jobId, event.error, 'convert');
        };
        conversionService.on('conversion:failed', failedHandler);

        // Clean up listeners after some time
        setTimeout(
          () => {
            conversionService.off('job:progress', progressHandler);
            conversionService.off('conversion:completed', completeHandler);
            conversionService.off('conversion:failed', failedHandler);
          },
          5 * 60 * 1000
        ); // 5 minutes
      }

      // Start conversion
      const result = await conversionService.convert(request);

      // Send response
      const response: ApiResponse<ConvertResponse> = {
        success: true,
        data: result,
        message: 'Conversion completed successfully',
        timestamp: new Date().toISOString(),
        requestId: req.headers['x-request-id'] as string,
      };

      res.json(response);

      logger.info('Convert request completed:', {
        jobId: result.jobId,
        filesGenerated: result.files.length,
        duration: result.metrics.duration,
        success: true,
      });
    } catch (error) {
      logger.error('Convert request failed:', { error });

      // Send error via WebSocket if streaming
      if (request.stream && request.connectionId) {
        websocketService.broadcastError(
          'unknown',
          {
            code: 'CONVERSION_ERROR',
            message: error instanceof Error ? error.message : 'Unknown error',
          },
          'convert'
        );
      }

      // Re-throw for error middleware
      throw error;
    }
  })
);

/**
 * GET /api/convert/:jobId
 * Get conversion job status
 */
convertRouter.get(
  '/:jobId',
  asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const conversionService: ConversionService =
      req.app.locals.services.conversion;

    logger.info('Convert status request:', { jobId });

    const jobStatus = conversionService.getJobStatus(jobId);

    if (!jobStatus) {
      return res.status(404).json({
        success: false,
        error: 'Job not found',
        message: `Conversion job ${jobId} not found`,
        timestamp: new Date().toISOString(),
      });
    }

    const response: ApiResponse = {
      success: true,
      data: jobStatus,
      message: 'Job status retrieved successfully',
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
    };

    return res.json(response);
  })
);

/**
 * DELETE /api/convert/:jobId
 * Cancel conversion job
 */
convertRouter.delete(
  '/:jobId',
  asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const conversionService: ConversionService =
      req.app.locals.services.conversion;

    logger.info('Convert cancel request:', { jobId });

    const cancelled = await conversionService.cancelJob(jobId);

    if (!cancelled) {
      return res.status(404).json({
        success: false,
        error: 'Job not found or cannot be cancelled',
        message: `Conversion job ${jobId} not found or not in a cancellable state`,
        timestamp: new Date().toISOString(),
      });
    }

    const response: ApiResponse = {
      success: true,
      message: 'Job cancelled successfully',
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
    };

    return res.json(response);
  })
);

/**
 * GET /api/convert
 * Get all conversion jobs
 */
convertRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const conversionService: ConversionService =
      req.app.locals.services.conversion;

    logger.info('Convert jobs list request');

    const jobs = conversionService.getAllJobs();

    const response: ApiResponse = {
      success: true,
      data: jobs,
      message: 'Conversion jobs retrieved successfully',
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
    };

    return res.json(response);
  })
);

/**
 * POST /api/convert/:jobId/subscribe
 * Subscribe to conversion job progress via WebSocket
 */
convertRouter.post(
  '/:jobId/subscribe',
  validateRequest({
    body: {
      type: 'object',
      properties: {
        connectionId: { type: 'string' },
      },
      required: ['connectionId'],
    },
  }),
  asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const { connectionId } = req.body;
    const conversionService: ConversionService =
      req.app.locals.services.conversion;
    const websocketService: WebSocketService =
      req.app.locals.services.websocket;

    logger.info('Convert subscribe request:', { jobId, connectionId });

    // Check if job exists
    const jobStatus = conversionService.getJobStatus(jobId);
    if (!jobStatus) {
      return res.status(404).json({
        success: false,
        error: 'Job not found',
        message: `Conversion job ${jobId} not found`,
        timestamp: new Date().toISOString(),
      });
    }

    // Check if WebSocket connection exists
    const connectionInfo = websocketService.getConnectionInfo(connectionId);
    if (!connectionInfo) {
      return res.status(404).json({
        success: false,
        error: 'Connection not found',
        message: `WebSocket connection ${connectionId} not found`,
        timestamp: new Date().toISOString(),
      });
    }

    // Subscribe to job progress
    const unsubscribe = conversionService.subscribeToJob(jobId, (progress) => {
      websocketService.broadcastProgress(jobId, progress);
    });

    // Clean up subscription after job completion or timeout
    setTimeout(
      () => {
        unsubscribe();
      },
      10 * 60 * 1000
    ); // 10 minutes

    const response: ApiResponse = {
      success: true,
      message: 'Subscribed to job progress successfully',
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
    };

    return res.json(response);
  })
);
