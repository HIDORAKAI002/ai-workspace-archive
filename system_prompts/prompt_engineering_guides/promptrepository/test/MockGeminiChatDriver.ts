/**
 * @module MockGeminiChatDriver
 * 
 * Mock implementation of GoogleGeminiChatDriver for testing exponential backoff and error handling.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { EModel, IChatMessage, IFunction, EVerbosity } from '../src/entry';
import { GoogleGeminiChatDriver } from '../src/Chat.GoogleGemini';

/**
 * Mock class for testing Gemini driver with exponential backoff support
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a mock chat driver for testing exponential backoff, error handling, streaming, and constrained JSON responses without calling Google Gemini. It exports MockGeminiChatDriver, which extends the real GoogleGeminiChatDriver and defaults to the large model.
// 
// Use setShouldFail to simulate rate-limit errors a fixed number of times. getFailCount reports how many failures occurred. setMockCreate injects a custom async generator for full control over responses or errors. setMockSendMessage adapts a simpler mock to the same path.
// 
// getModelResponse wraps calls in retryWithExponentialBackoff and returns a simple success string unless failures are configured or a custom mock is provided. getStreamedModelResponse supports streaming by yielding word-sized chunks, handling async iterables, and recognizing OpenAI-style delta chunks. It emits a friendly interruption message on streaming errors. getConstrainedModelResponse returns parsed JSON when possible and falls back to a provided default on errors or invalid JSON; it can also derive JSON from the user prompt.
// 
// Key dependencies: GoogleGeminiChatDriver for base behavior, retryWithExponentialBackoff and MAX_RETRIES for resilience, and shared types EModel, EVerbosity, IChatMessage, and IFunction.
// ===End StrongAI Generated Comment===
export class MockGeminiChatDriver extends GoogleGeminiChatDriver {
   private failCount = 0;
   private shouldFail = false;
   private maxFailures = 0;
   private mockGenerateContent?: () => Promise<any>;
   private mockSendMessageStream?: () => AsyncIterable<any>;

   constructor() {
      super(EModel.kLarge);
   }

   /**
    * Set whether the mock should fail and how many times
    */
   setShouldFail(shouldFail: boolean, maxFailures: number = 0): void {
      this.shouldFail = shouldFail;
      this.maxFailures = maxFailures;
      this.failCount = 0;
      this.mockGenerateContent = undefined;
      this.mockSendMessageStream = undefined;
   }

   /**
    * Get the number of failures that occurred
    */
   getFailCount(): number {
      return this.failCount;
   }

   /**
    * Set custom mock behavior for generateContent
    */
   setMockCreate(mockFn: () => Promise<any>): void {
      this.mockGenerateContent = mockFn;
   }

   /**
    * Override getModelResponse to use mock
    */
   async getModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<string> {
      const { retryWithExponentialBackoff, MAX_RETRIES } = await import('../src/DriverHelpers');
      
      // If custom mock is set, use it (this handles error cases from setMockCreate)
      if (this.mockGenerateContent) {
         const result = await retryWithExponentialBackoff(
            this.mockGenerateContent,
            MAX_RETRIES,
            "Google Gemini"
         ) as any;
         return result.response?.text() || result.response?.text || 'Success response';
      }

      // Otherwise, use shouldFail logic for exponential backoff testing
      // The error must be thrown inside the retry function so it gets wrapped with provider name
      const result = await retryWithExponentialBackoff(async () => {
         if (this.shouldFail && this.failCount < this.maxFailures) {
            this.failCount++;
            const error: any = new Error('Rate limit exceeded');
            error.status = 429;
            throw error;
         }

         // Success case
         return {
            response: {
               text: () => 'Success response'
            }
         };
      }, MAX_RETRIES, "Google Gemini") as any;

      return result.response?.text() || 'Success response';
   }

   /**
    * Override getStreamedModelResponse to use mock
    */
   getStreamedModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): AsyncIterator<string> {
      const self = this;
      const { retryWithExponentialBackoff, MAX_RETRIES } = require('../src/DriverHelpers');

      return (async function* () {
         // If custom mock is set (from setMockCreate), handle it
         if (self.mockGenerateContent) {
            try {
               // Check if the mock returns an async iterator (for streaming tests)
               const mockResult = await retryWithExponentialBackoff(
                  self.mockGenerateContent,
                  MAX_RETRIES,
                  "Google Gemini"
               ) as any;
               
               // If it's an async iterable, iterate over it
               if (mockResult && typeof mockResult[Symbol.asyncIterator] === 'function') {
                  for await (const chunk of mockResult) {
                     // Handle OpenAI-style chunks
                     if (chunk.choices && chunk.choices[0]?.delta?.content) {
                        yield chunk.choices[0].delta.content;
                     } else if ((chunk as any).text?.()) {
                        yield (chunk as any).text();
                     } else if (typeof chunk === 'string') {
                        yield chunk;
                     }
                  }
                  return;
               }
               
               // Otherwise treat as regular response
               const text = mockResult.response?.text?.() || mockResult.response?.text || '';
               if (text) {
                  const words = text.split(/(\s+)/);
                  for (const word of words) {
                     if (word.trim().length > 0 || word.match(/\s+/)) {
                        yield word;
                     }
                  }
               }
               return;
            } catch (error) {
               // If error occurs during streaming, yield interruption message
               yield 'Sorry, it looks like the response was interrupted. Please try again.';
               return;
            }
         }

         // If custom stream mock is set, use it
         if (self.mockSendMessageStream) {
            for await (const chunk of self.mockSendMessageStream()) {
               const text = (chunk as any).text?.() || (chunk as any).text || '';
               if (text) {
                  // Split into words for granular streaming
                  const words = text.split(/(\s+)/);
                  for (const word of words) {
                     if (word.trim().length > 0 || word.match(/\s+/)) {
                        yield word;
                     }
                  }
               }
            }
            return;
         }

         // Otherwise, use shouldFail logic for exponential backoff testing
         // The error must be thrown inside the retry function so it gets wrapped with provider name
         try {
            const { retryWithExponentialBackoff, MAX_RETRIES } = await import('../src/DriverHelpers');
            
            await retryWithExponentialBackoff(async () => {
               if (self.shouldFail && self.failCount < self.maxFailures) {
                  self.failCount++;
                  const error: any = new Error('Rate limit exceeded');
                  error.status = 429;
                  throw error;
               }
               return { success: true };
            }, MAX_RETRIES, "Google Gemini");

            // Success case - yield chunks
            const words = 'Success response'.split(/(\s+)/);
            for (const word of words) {
               if (word.trim().length > 0 || word.match(/\s+/)) {
                  yield word;
               }
            }
         } catch (error) {
            // Error was already wrapped by retryWithExponentialBackoff, re-throw it
            throw error;
         }
      })();
   }

   /**
    * Method to set custom mock behavior for sendMessage (for constrained response tests)
    */
   setMockSendMessage(mockFn: (message: string) => Promise<any>): void {
      // Convert to generateContent mock
      this.mockGenerateContent = async () => {
         const result = await mockFn('');
         return {
            response: {
               text: () => result.response?.text?.() || result.response?.text || ''
            }
         };
      };
   }

   /**
    * Override getConstrainedModelResponse to use mock
    */
   async getConstrainedModelResponse<T>(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      jsonSchema: Record<string, unknown>,
      defaultValue: T,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<T> {
      const { retryWithExponentialBackoff, MAX_RETRIES } = await import('../src/DriverHelpers');
      
      // If mock is set, use it
      if (this.mockGenerateContent) {
         try {
            const result = await retryWithExponentialBackoff(
               this.mockGenerateContent,
               MAX_RETRIES,
               "Google Gemini"
            ) as any;
            
            const responseText = result.response?.text?.() || result.response?.text || '';
            
            try {
               return JSON.parse(responseText) as T;
            } catch (parseError) {
               return defaultValue;
            }
         } catch (error) {
            return defaultValue;
         }
      }

      // Otherwise, use shouldFail logic for exponential backoff testing
      // The error must be thrown inside the retry function so it gets wrapped with provider name
      try {
         const result = await retryWithExponentialBackoff(async () => {
            if (this.shouldFail && this.failCount < this.maxFailures) {
               this.failCount++;
               const error: any = new Error('Rate limit exceeded');
               error.status = 429;
               throw error;
            }

            // Success case - return JSON response matching test expectations
            // Parse userPrompt to extract expected JSON if present, otherwise use default
            let jsonData: any = { test: 'data' };
            if (userPrompt.includes('return test data')) {
               jsonData = { test: 'data' };
            } else {
               // Try to extract JSON from userPrompt if it looks like a JSON request
               const jsonMatch = userPrompt.match(/\{[\s\S]*\}/);
               if (jsonMatch) {
                  try {
                     jsonData = JSON.parse(jsonMatch[0]);
                  } catch {
                     // Use default
                  }
               }
            }

            return {
               response: {
                  text: () => JSON.stringify(jsonData)
               }
            };
         }, MAX_RETRIES, "Google Gemini") as any;

         const responseText = result.response?.text?.() || result.response?.text || '';
         try {
            return JSON.parse(responseText) as T;
         } catch (parseError) {
            return defaultValue;
         }
      } catch (error) {
         // If error occurs, return default value
         return defaultValue;
      }
   }
}

