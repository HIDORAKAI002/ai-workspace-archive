/**
 * Rate Limit Middleware
 *
 * Simple in-memory rate limiting middleware.
 */

import { Request, Response, NextFunction } from 'express';

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

/**
 * Create rate limit middleware
 */
export const rateLimit = (config: RateLimitConfig) => {
  const store: RateLimitStore = {};

  const {
    windowMs,
    max,
    message = 'Too many requests from this IP, please try again later.',
    standardHeaders = true,
    legacyHeaders = false,
  } = config;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const resetTime = now + windowMs;

    // Clean up expired entries
    if (store[key] && now > store[key].resetTime) {
      delete store[key];
    }

    // Initialize or increment counter
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime,
      };
    } else {
      store[key].count++;
    }

    const current = store[key];
    const remaining = Math.max(0, max - current.count);
    const resetTimeSeconds = Math.ceil(current.resetTime / 1000);

    // Add headers
    if (standardHeaders) {
      res.set({
        'RateLimit-Limit': max.toString(),
        'RateLimit-Remaining': remaining.toString(),
        'RateLimit-Reset': resetTimeSeconds.toString(),
      });
    }

    if (legacyHeaders) {
      res.set({
        'X-RateLimit-Limit': max.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTimeSeconds.toString(),
      });
    }

    // Check if limit exceeded
    if (current.count > max) {
      res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message,
        timestamp: new Date().toISOString(),
        retryAfter: Math.ceil((current.resetTime - now) / 1000),
      });
      return;
    }

    next();
  };
};
