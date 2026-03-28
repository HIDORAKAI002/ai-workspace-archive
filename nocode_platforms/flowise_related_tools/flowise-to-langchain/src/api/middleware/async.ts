/**
 * Async Handler Middleware
 *
 * Wraps async route handlers to catch errors and pass them to error middleware.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Async handler wrapper
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
