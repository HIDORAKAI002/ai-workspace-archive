/**
 * @module MockOpenAIChatDriver
 * 
 * Mock implementation of GenericOpenAIChatDriver for testing exponential backoff and error handling.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { EModel, IChatMessage, IFunction, EVerbosity, EModelProvider } from '../src/entry';
import { GenericOpenAIChatDriver } from '../src/Chat.GenericOpenAI';

/**
 * Mock class for testing exponential backoff
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a mock chat driver for testing retry logic, exponential backoff, and error handling without calling a real API. It exports MockOpenAIChatDriver, which extends GenericOpenAIChatDriver but overrides network calls with in-memory stubs.
// 
// The class simulates the OpenAI Responses API via an internal openai.responses object. The create method can be configured to fail with 429 errors a set number of times, then return either a JSON-formatted text payload or a simple success string. The stream method yields two text delta events to mimic streaming output. setShouldFail controls failure behavior and counters; getFailCount exposes how many retries occurred. setMockCreate lets tests inject a custom implementation. getConstrainedModelResponse wraps a mocked create call with retryWithExponentialBackoff and parses JSON to a typed result, falling back to a provided default on parse or content issues.
// 
// Key imports include GenericOpenAIChatDriver for base behavior, enums and types from entry (EModel, IChatMessage, IFunction, EVerbosity, EModelProvider), and retryWithExponentialBackoff from DriverHelpers. The driver reports provider name (OpenAI or Azure OpenAI) and uses a fixed mock model.
// ===End StrongAI Generated Comment===
export class MockOpenAIChatDriver extends GenericOpenAIChatDriver {
   private failCount = 0;
   private shouldFail = false;
   private maxFailures = 0;
   private provider: EModelProvider;

   constructor(provider: EModelProvider = EModelProvider.kOpenAI) {
      super(EModel.kLarge);
      this.provider = provider;
      // Initialize with default mock
      this.resetMock();
   }

   protected getProviderName(): string {
      return this.provider === EModelProvider.kAzureOpenAI ? "Azure OpenAI" : "OpenAI";
   }

   private resetMock() {
      (this as any).openai = {
         responses: {
            create: async (config: any) => {
               if (this.shouldFail && this.failCount < this.maxFailures) {
                  this.failCount++;
                  const error: any = new Error('Rate limit exceeded');
                  error.status = 429;
                  throw error;
               }
               
               // Return Responses API format
               if (config.text?.format) {
                  return { 
                     output: [{ type: 'text', text: JSON.stringify({ test: 'data' }) }]
                  };
               }
               
               return { 
                  output: [{ type: 'text', text: 'Success response' }]
               };
            },
            stream: async (config: any) => {
               if (this.shouldFail && this.failCount < this.maxFailures) {
                  this.failCount++;
                  const error: any = new Error('Rate limit exceeded');
                  error.status = 429;
                  throw error;
               }
               
               return {
                  [Symbol.asyncIterator]: async function* () {
                     yield { type: 'response.output_text.delta', delta: 'Success ' };
                     yield { type: 'response.output_text.delta', delta: 'response' };
                  }
               };
            }
         }
      };
   }

   protected getModelName(): string {
      return 'mock-model';
   }

   protected shouldUseToolMessages(): boolean {
      return false; // Mock implementation defaults to false
   }

   setShouldFail(shouldFail: boolean, maxFailures: number = 0) {
      this.shouldFail = shouldFail;
      this.maxFailures = maxFailures;
      this.failCount = 0;
      // Reset to default mock functions
      this.resetMock();
   }

   getFailCount() {
      return this.failCount;
   }

   // Method to override the mock for specific tests
   setMockCreate(mockFn: () => Promise<any>) {
      (this as any).openai.responses.create = mockFn;
      (this as any).openai.responses.stream = mockFn;
   }

   async getConstrainedModelResponse<T>(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      jsonSchema: Record<string, unknown>,
      defaultValue: T,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<T> {
      // Use retry wrapper like the base class - import retryWithExponentialBackoff
      const { retryWithExponentialBackoff } = await import('../src/DriverHelpers');
      
      const response = await retryWithExponentialBackoff(async () => {
         return (this as any).openai.responses.create({ 
            text: {
               format: {
                  type: "json_schema", 
                  name: "constrainedOutput", 
                  schema: jsonSchema 
               }
            }
         });
      });
      
      // Parse the JSON content from the Responses API format
      const content = response.output?.[0]?.text;
      if (content) {
         try {
            return JSON.parse(content) as T;
         } catch (parseError) {
            return defaultValue;
         }
      }
      return defaultValue;
   }
}

