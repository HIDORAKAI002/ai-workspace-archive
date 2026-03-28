/**
 * @module DriverHelpers
 * 
 * Shared utilities and helpers for OpenAI model drivers.
 * Provides common functionality for retry logic, error handling, and backoff strategies.
 * Includes rate limit detection with Retry-After header support and exponential backoff.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { InvalidOperationError, ConnectionError } from '@jonverrier/assistant-common';

export const MAX_RETRIES = 5;
export const INITIAL_RETRY_DELAY = 1000; // 1 second
export const MAX_RETRY_DELAY = 60000; // 60 seconds maximum (prevents excessive wait times)

/**
 * Implements exponential backoff delay calculation
 * @param retryCount The current retry attempt number (0-based)
 * @returns Promise that resolves after the calculated delay
 */

// ===Start StrongAI Generated Comment (20260219)===
// Provides shared retry and error-handling utilities for OpenAI-style drivers. It centralizes exponential backoff, rate-limit handling, and consistent error wrapping so callers can run API operations robustly.
// 
// Exports three tuning constants: MAX_RETRIES, INITIAL_RETRY_DELAY, and MAX_RETRY_DELAY. Exported function exponentialBackoff(retryCount) waits with an exponential delay capped by MAX_RETRY_DELAY. Exported function retryWithExponentialBackoff(operation, maxRetries?, providerName?) executes an async operation with retries. It detects 429 rate limits, respects Retry-After headers (with small jitter), retries transiently, but fails fast on quota or billing exhaustion. It also retries 5xx server errors with backoff.
// 
// The retry wrapper classifies 4xx errors. It converts provider refusal and safety/content-filter responses into InvalidOperationError and does not retry. Other unexpected errors are wrapped as ConnectionError with a provider-scoped message. It normalizes status codes from varied SDK error shapes and reads Retry-After from multiple locations.
// 
// Key imports are InvalidOperationError and ConnectionError from @jonverrier/assistant-common, which standardize error semantics for callers. The module logs retry decisions via console.warn to aid observability.
// ===End StrongAI Generated Comment===

export async function exponentialBackoff(retryCount: number): Promise<void> {
   const delay = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, retryCount), MAX_RETRY_DELAY);
   await new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Extracts HTTP status code from error in various formats
 * Handles multiple error formats from OpenAI SDK
 * @param error The error to extract status from
 * @returns The HTTP status code, or null if not found
 */
function getErrorStatus(error: any): number | null {
   const status = error?.status || 
                  error?.statusCode || 
                  error?.response?.status || 
                  error?.response?.statusCode ||
                  (error?.code && typeof error.code === 'number' ? error.code : null);
   
   if (status === null || status === undefined) {
      return null;
   }
   
   // Convert string status codes to numbers
   const numericStatus = typeof status === 'string' ? parseInt(status, 10) : status;
   return isNaN(numericStatus) ? null : numericStatus;
}

/**
 * Checks if an error is a rate limit error (429 status code)
 * Handles multiple error formats from OpenAI SDK
 * @param error The error to check
 * @returns true if the error is a rate limit error
 */
function isRateLimitError(error: any): boolean {
   const status = getErrorStatus(error);
   return status === 429;
}

/**
 * Checks if a 429 error indicates quota/billing exhaustion (do not retry).
 * OpenAI returns 429 for both transient rate limits (retry) and quota exceeded (fail fast).
 * @param error The error to check
 * @returns true if the error indicates quota or billing limit exceeded
 */
function isQuotaExceededError(error: any): boolean {
   const message = [
      error?.message,
      error?.error?.message,
      error?.body?.error?.message,
      typeof error?.body === 'string' ? error.body : undefined,
   ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
   return (
      message.includes('quota') ||
      message.includes('billing') ||
      message.includes('insufficient_quota') ||
      message.includes('exceeded your current quota')
   );
}

/**
 * Checks if an error is a transient server error (5xx status codes)
 * These errors are typically retryable
 * @param error The error to check
 * @returns true if the error is a transient server error
 */
function isTransientServerError(error: any): boolean {
   const status = getErrorStatus(error);
   return status !== null && status >= 500 && status < 600;
}

/**
 * Parses Retry-After header from error response
 * Returns the retry delay in milliseconds, or null if not available
 * @param error The error object that may contain retry-after information
 * @returns Retry delay in milliseconds, or null if not available
 */
function parseRetryAfter(error: any): number | null {
   // Check various locations for retry-after header
   const retryAfter = error?.headers?.['retry-after'] ||
                     error?.headers?.['Retry-After'] ||
                     error?.response?.headers?.['retry-after'] ||
                     error?.response?.headers?.['Retry-After'] ||
                     error?.retry_after ||
                     error?.retryAfter;
   
   if (!retryAfter) {
      return null;
   }
   
   // Parse as seconds (most common format)
   const seconds = parseInt(String(retryAfter), 10);
   if (!isNaN(seconds) && seconds > 0) {
      // Add small jitter (10%) to avoid thundering herd
      // Jitter is calculated in milliseconds to match the retry delay unit
      const jitter = seconds * 0.1 * Math.random() * 1000;
      return Math.min((seconds * 1000) + jitter, MAX_RETRY_DELAY);
   }
   
   return null;
}

/**
 * Executes an operation with exponential backoff retry logic
 * Handles rate limiting and other retryable errors from LLM APIs
 * Automatically detects rate limit errors and respects Retry-After headers
 * 
 * @param operation The async operation to execute
 * @param maxRetries Maximum number of retry attempts (default: MAX_RETRIES)
 * @param providerName Optional provider name for error messages (default: "API")
 * @returns Promise resolving to the operation result
 * @throws Error for non-retryable errors or after max retries exceeded
 */
export async function retryWithExponentialBackoff<T>(
   operation: () => Promise<T>,
   maxRetries: number = MAX_RETRIES,
   providerName: string = "API"
): Promise<T> {
   let retryCount = 0;
   
   while (true) {
      try {
         return await operation();
      } catch (error: any) {
         const status = getErrorStatus(error);
         
         // Handle rate limiting: retry only for transient rate limit; fail fast for quota exceeded
         if (isRateLimitError(error)) {
            if (isQuotaExceededError(error)) {
               // Quota/billing exhausted – retrying won't help
               const msg = error?.message ?? error?.error?.message ?? 'Quota or billing limit exceeded';
               throw new ConnectionError(`${providerName} API error: ${msg}`);
            }
            if (retryCount < maxRetries) {
               // Transient rate limit – retry with backoff or Retry-After
               const retryAfterMs = parseRetryAfter(error);
               if (retryAfterMs !== null) {
                  console.warn(`Rate limit detected (429). Retrying after ${Math.round(retryAfterMs)}ms (attempt ${retryCount + 1}/${maxRetries})`);
                  await new Promise(resolve => setTimeout(resolve, retryAfterMs));
               } else {
                  const delay = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, retryCount), MAX_RETRY_DELAY);
                  console.warn(`Rate limit detected (429). Retrying after ${delay}ms (exponential backoff, attempt ${retryCount + 1}/${maxRetries})`);
                  await exponentialBackoff(retryCount);
               }
               retryCount++;
               continue;
            }
         }
         
         // Handle transient server errors (5xx) with exponential backoff
         if (isTransientServerError(error) && retryCount < maxRetries) {
            const delay = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, retryCount), MAX_RETRY_DELAY);
            console.warn(`Transient server error (${status}). Retrying after ${delay}ms (exponential backoff, attempt ${retryCount + 1}/${maxRetries})`);
            await exponentialBackoff(retryCount);
            retryCount++;
            continue;
         }
         
         // Handle provider refusal errors - these should not be retried
         if (status === 400) {
            // Check for specific refusal error types
            if (error?.error?.type === 'content_filter' || 
                error?.error?.code === 'content_filter' ||
                error?.message?.toLowerCase().includes('content filter')) {
               throw new InvalidOperationError(`${providerName} content filter triggered: ${error?.error?.message || error?.message || `Content violates ${providerName} safety policies`}`);
            }
            
            if (error?.error?.type === 'safety' || 
                error?.error?.code === 'safety' ||
                error?.message?.toLowerCase().includes('safety')) {
               throw new InvalidOperationError(`${providerName} safety system triggered: ${error?.error?.message || error?.message || `Content violates ${providerName} safety guidelines`}`);
            }
            
            if (error?.error?.type === 'invalid_request' && 
                (error?.error?.message?.toLowerCase().includes('refuse') ||
                 error?.error?.message?.toLowerCase().includes('cannot') ||
                 error?.error?.message?.toLowerCase().includes('unable'))) {
               throw new InvalidOperationError(`${providerName} refused request: ${error?.error?.message || error?.message || `Request was refused by ${providerName}`}`);
            }
         }
         
         // Handle other 4xx errors that indicate refusal (but not 429, which is handled above)
         if (status !== null && status >= 400 && status < 500 && status !== 429) {
            if (error?.message?.toLowerCase().includes('refuse') ||
                error?.message?.toLowerCase().includes('cannot') ||
                error?.message?.toLowerCase().includes('unable') ||
                error?.message?.toLowerCase().includes('forbidden')) {
               throw new InvalidOperationError(`${providerName} refused request (${status}): ${error?.message || 'Request was refused'}`);
            }
         }
         
         // Wrap remaining errors with provider name for consistent error messages
         if (error instanceof Error) {
            throw new ConnectionError(`${providerName} API error: ${error.message}`);
         }
         throw new ConnectionError(`${providerName} API error: Unknown error occurred`);
      }
   }
} 