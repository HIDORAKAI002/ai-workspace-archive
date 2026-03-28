/**
 * CORS Middleware
 *
 * Custom CORS middleware for API security.
 */

import { Request, Response, NextFunction } from 'express';

interface CorsOptions {
  origin?: string | string[] | boolean;
  methods?: string[];
  allowedHeaders?: string[];
  credentials?: boolean;
  optionsSuccessStatus?: number;
}

/**
 * Custom CORS middleware
 */
export const cors = (options: CorsOptions = {}) => {
  const {
    origin = true,
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders = [
      'Content-Type',
      'Authorization',
      'X-API-Key',
      'X-Request-ID',
    ],
    credentials = false,
    optionsSuccessStatus = 204,
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const requestOrigin = req.headers.origin;

    // Set Access-Control-Allow-Origin
    if (origin === true) {
      res.set('Access-Control-Allow-Origin', requestOrigin || '*');
    } else if (origin === false) {
      // No CORS allowed
    } else if (typeof origin === 'string') {
      res.set('Access-Control-Allow-Origin', origin);
    } else if (Array.isArray(origin)) {
      if (requestOrigin && origin.includes(requestOrigin)) {
        res.set('Access-Control-Allow-Origin', requestOrigin);
      }
    }

    // Set Access-Control-Allow-Methods
    res.set('Access-Control-Allow-Methods', methods.join(', '));

    // Set Access-Control-Allow-Headers
    res.set('Access-Control-Allow-Headers', allowedHeaders.join(', '));

    // Set Access-Control-Allow-Credentials
    if (credentials) {
      res.set('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(optionsSuccessStatus).end();
      return;
    }

    next();
  };
};
