/**
 * Logger Middleware
 *
 * HTTP request logging middleware.
 */

import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { logger as cliLogger } from '../../cli/utils/logger.js';

/**
 * Logger middleware
 */
export const logger = (req: Request, res: Response, next: NextFunction) => {
  // Add request ID if not present
  if (!req.headers['x-request-id']) {
    req.headers['x-request-id'] = randomUUID();
  }

  const requestId = req.headers['x-request-id'] as string;
  const startTime = Date.now();

  // Log request
  cliLogger.info('HTTP Request', {
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    contentLength: req.headers['content-length'],
  });

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function (body: any) {
    const duration = Date.now() - startTime;

    cliLogger.info('HTTP Response', {
      requestId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      contentLength: JSON.stringify(body).length,
      success: res.statusCode < 400,
    });

    return originalJson.call(this, body);
  };

  next();
};
