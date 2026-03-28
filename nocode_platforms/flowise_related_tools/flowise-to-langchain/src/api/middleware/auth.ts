/**
 * Authentication Middleware
 *
 * Optional authentication middleware for API security.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Simple API key authentication
 */
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  // If no API key is configured, skip authentication
  if (!process.env.API_KEY) {
    return next();
  }

  // Check if API key matches
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or missing API key',
      timestamp: new Date().toISOString(),
    });
  }

  next();
};

/**
 * Optional authentication - only authenticate if API key is configured
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If API key is configured, require authentication
  if (process.env.API_KEY) {
    return apiKeyAuth(req, res, next);
  }

  // Otherwise, skip authentication
  next();
};
