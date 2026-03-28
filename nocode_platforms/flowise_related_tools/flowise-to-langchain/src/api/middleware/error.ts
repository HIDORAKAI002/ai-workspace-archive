/**
 * Error Handler Middleware
 *
 * Centralized error handling for the API.
 */

import { Request, Response, NextFunction } from 'express';
import { ApiError, ApiResponse } from '../types/api.js';
import { logger } from '../../cli/utils/logger.js';

/**
 * Error handler middleware
 */
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let apiError: ApiError;

  // Handle different types of errors
  if (error.code === 'VALIDATION_ERROR') {
    statusCode = 400;
    apiError = {
      code: 'VALIDATION_ERROR',
      message: error.message,
      details: error.details,
    };
  } else if (error.code === 'CONVERSION_ERROR') {
    statusCode = 422;
    apiError = {
      code: 'CONVERSION_ERROR',
      message: error.message,
      details: error.details,
    };
  } else if (error.code === 'TEST_ERROR') {
    statusCode = 422;
    apiError = {
      code: 'TEST_ERROR',
      message: error.message,
      details: error.details,
    };
  } else if (error.code === 'UPLOAD_ERROR') {
    statusCode = 400;
    apiError = {
      code: 'UPLOAD_ERROR',
      message: error.message,
      details: error.details,
    };
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    apiError = {
      code: 'UPLOAD_ERROR',
      message: `File upload error: ${error.message}`,
      details: error,
    };
  } else if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
    statusCode = 400;
    apiError = {
      code: 'INVALID_JSON',
      message: 'Invalid JSON in request body',
      details: error.message,
    };
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    apiError = {
      code: 'VALIDATION_ERROR',
      message: error.message,
      details: error.details,
    };
  } else {
    // Generic server error
    apiError = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
  }

  // Log error
  logger.error('API Error:', {
    error: apiError,
    stack: error.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  });

  // Send error response
  const response: ApiResponse = {
    success: false,
    error: apiError.message,
    message: apiError.message,
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] as string,
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    (response as any).stack = error.stack;
  }

  res.status(statusCode).json(response);
};
