/**
 * @module chat.test
 * 
 * Unit tests for the Chat module which handles interactions with the LLM.
 */

// Copyright (c) 2025, 2026 Jon Verrier

import { expect } from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { ChatDriverFactory, EModelProvider, EModel, EChatRole, IChatMessage, ChatMessageClassName, IFunction, EVerbosity, GoogleGeminiChatDriver } from '../src/entry';
import { TEST_TARGET_SUPPORTS_VERBOSITY } from './ChatTestConfig';
import { GenericOpenAIChatDriver } from '../src/Chat.GenericOpenAI';
import { MockOpenAIChatDriver } from './MockOpenAIChatDriver';
import { MockGeminiChatDriver } from './MockGeminiChatDriver';

import { CHAT_TEST_PROVIDERS, createChatDrivers, TEST_TIMEOUT_MS } from './ChatTestConfig';

// Create chat drivers for all providers outside describe blocks
const providers = CHAT_TEST_PROVIDERS;
const chatDrivers = createChatDrivers(EModel.kLarge);

/**
 * Returns the appropriate timeout for a test based on the provider.
 * kGoogleGemini tests use 120s timeout, others use the default TEST_TIMEOUT_MS.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module defines comprehensive unit tests for the Chat abstraction across multiple model providers. It validates basic completions, streaming responses, message history handling, constrained JSON output with schema validation and defaults, verbosity effects on response length, and behavior under errors and rate limits. It also tests mini/compact model variants.
// 
// There are no exports from this file. Tests are organized per provider created via createChatDrivers and ChatDriverFactory. Two local helpers exist: getTestTimeout selects longer timeouts for Google Gemini; getProviderName formats provider names for logs.
// 
// Key dependencies:
// - Mocha’s describe, it, beforeEach, afterEach and Expect’s assertions.
// - Core Chat APIs and types from ../src/entry: ChatDriverFactory, EModelProvider, EModel, EChatRole, IChatMessage, ChatMessageClassName, EVerbosity, GoogleGeminiChatDriver.
// - Provider-specific and mock drivers: GenericOpenAIChatDriver, MockOpenAIChatDriver, MockGeminiChatDriver.
// - Test configuration from ChatTestConfig: CHAT_TEST_PROVIDERS, createChatDrivers, TEST_TIMEOUT_MS.
// 
// The exponential backoff suite verifies retry logic on 429 errors, timing of backoff, and no-retry paths for authentication, content filter, safety, invalid request, and forbidden errors, including graceful handling of mid-stream failures.
// ===End StrongAI Generated Comment===
const getTestTimeout = (provider: EModelProvider): number => {
   return provider === EModelProvider.kGoogleGemini ? 120000 : TEST_TIMEOUT_MS;
};

// Create factory for mini model tests
const chatDriverFactory = new ChatDriverFactory();


// Run all tests for each provider
providers.forEach((provider, index) => {
  const chatDriver = chatDrivers[index];

  // Skip tests if driver failed to initialize (e.g., missing API key)
  if (!chatDriver) {
    console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
    return;
  }

  describe(`getChatCompletion (${provider})`, () => {
    it('should successfully return text response with system prompt', async () => {
      const result = await chatDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium);
      expect(result).toMatch(/(Hi|Hello)/);
    }).timeout(getTestTimeout(provider));

    it('should successfully return text response without system prompt', async () => {
      const result = await chatDriver.getModelResponse(undefined, 'say Hi', EVerbosity.kMedium);
      expect(result).toMatch(/(Hi|Hello)/);
    }).timeout(getTestTimeout(provider));

    it('should successfully return text response with message history', async () => {
      const messageHistory: IChatMessage[] = [
        {
          id: '1',
          className: ChatMessageClassName,
          role: EChatRole.kUser,
          content: 'My name is Alice',
          timestamp: new Date()
        },
        {
          id: '2',
          className: ChatMessageClassName,
          role: EChatRole.kAssistant,
          content: 'Hello Alice, nice to meet you!',
          timestamp: new Date()
        }
      ];
      const result = await chatDriver.getModelResponse('You are helpful', 'What is my name?', EVerbosity.kMedium, messageHistory);
      expect(result.toLowerCase()).toContain('alice');
    }).timeout(getTestTimeout(provider));
  });

  describe(`getStreamedModelResponse (${provider})`, () => {
    it('should successfully stream text response with system prompt', async () => {
      const iterator = chatDriver.getStreamedModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium);
      let result = '';
      while (true) {
        const chunk = await iterator.next();
        if (chunk.done) break;
        if (chunk.value) result += chunk.value;
      }
      expect(result).toMatch(/[A-Za-z]+/); // Expect at least one word (sequence of letters)
      expect(result.toLowerCase()).toMatch(/(hi|hello)/); // Check for hi or hello substring
    }).timeout(getTestTimeout(provider));

    it('should successfully stream text response without system prompt', async () => {
      const iterator = chatDriver.getStreamedModelResponse(undefined, 'say Hi', EVerbosity.kMedium);
      let result = '';
      while (true) {
        const chunk = await iterator.next();
        if (chunk.done) break;
        if (chunk.value) result += chunk.value;
      }
      expect(result).toMatch(/[A-Za-z]+/); // Expect at least one word (sequence of letters)
      expect(result.toLowerCase()).toMatch(/(hi|hello)/); // Check for hi or hello substring
    }).timeout(getTestTimeout(provider));

    it('should successfully stream text response with message history', async () => {
      const messageHistory: IChatMessage[] = [
        {
          id: '1',
          className: ChatMessageClassName,
          role: EChatRole.kUser,
          content: 'My name is Bob',
          timestamp: new Date()
        },
        {
          id: '2',
          className: ChatMessageClassName,
          role: EChatRole.kAssistant,
          content: 'Hello Bob, nice to meet you!',
          timestamp: new Date()
        }
      ];
      const iterator = chatDriver.getStreamedModelResponse('You are helpful', 'What is my name?', EVerbosity.kMedium, messageHistory);
      let fullText = '';
      while (true) {
        const result = await iterator.next();
        if (result.done) break;
        if (result.value) fullText += result.value;
      }
      expect(fullText.toLowerCase()).toContain('bob');
    }).timeout(getTestTimeout(provider));

    it('should stream long-form content in multiple chunks', async () => {
      const prompt = 'Write a haiku about artificial intelligence';
      const iterator = chatDriver.getStreamedModelResponse(undefined, prompt, EVerbosity.kHigh);

      const chunks: string[] = [];
      let totalLength = 0;

      try {
        while (true) {
          const result = await iterator.next();
          if (result.done) break;
          if (result.value) {
            chunks.push(result.value);
            totalLength += result.value.length;
            // If we've collected enough text to verify it's a response, we can stop
            if (totalLength > 50 && chunks.length > 1) break;
          }
        }
      } finally {
        // Ensure we clean up the iterator
        await iterator.return?.();
      }

      // We expect multiple chunks for a haiku
      expect(chunks.length).toBeGreaterThan(1);

      // Combine chunks and verify we got meaningful content
      const fullText = chunks.join('');

      expect(fullText).toMatch(/[A-Za-z]/); // Contains letters
      expect(fullText.length).toBeGreaterThan(20); // Got enough content to verify streaming works
    }).timeout(getTestTimeout(provider)); // 60 second timeout for haiku (GPT-5 can be slow)
  });

  describe(`Constrained Model Response Tests (${provider})`, () => {
    it('should return constrained JSON response matching schema', async () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        },
        required: ['name', 'age'],
        additionalProperties: false
      };

      const defaultValue = { name: 'default', age: 0 };
      const result = await chatDriver.getConstrainedModelResponse(
        'You are a helpful assistant that returns person data',
        'Give me details about a person named Bob who is 42 years old',
        EVerbosity.kMedium,
        schema,
        defaultValue
      );

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('age');
      expect(result.name).toBe('Bob');
      expect(result.age).toBe(42);
    }).timeout(getTestTimeout(provider));

    it('should return constrained JSON response with message history', async () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        },
        required: ['name', 'age'],
        additionalProperties: false
      };

      const messageHistory: IChatMessage[] = [
        {
          id: '1',
          className: ChatMessageClassName,
          role: EChatRole.kUser,
          content: 'I am talking about Charlie who is 25 years old',
          timestamp: new Date()
        },
        {
          id: '2',
          className: ChatMessageClassName,
          role: EChatRole.kAssistant,
          content: 'I understand you are referring to Charlie, age 25.',
          timestamp: new Date()
        }
      ];

      const defaultValue = { name: 'default', age: 0 };
      const result = await chatDriver.getConstrainedModelResponse(
        'You are a helpful assistant that returns person data',
        'Give me the details about the person we discussed',
        EVerbosity.kMedium,
        schema,
        defaultValue,
        messageHistory
      );

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('age');
      expect(result.name).toBe('Charlie');
      expect(result.age).toBe(25);
    }).timeout(getTestTimeout(provider));

    it('should return default value when response parsing fails', async () => {
      const schema = {
        type: 'object',
        properties: {
          validKey: { type: 'boolean' }
        },
        required: ['validKey'],
        additionalProperties: false
      };

      const defaultValue = { validKey: false };
      
      // Mock the driver to return malformed JSON that will fail parsing
      let testDriver = chatDriver;
      const originalCreate = (chatDriver as any).openai?.responses?.create;
      if (originalCreate) {
        // OpenAI driver - mock openai.responses.create
        (chatDriver as any).openai.responses.create = async () => ({
          output: [{ type: 'text', text: 'This is not valid JSON at all!' }]
        });
      } else if (chatDriver && chatDriver instanceof GoogleGeminiChatDriver) {
        // Gemini driver - use MockGeminiChatDriver
        const mockDriver = new MockGeminiChatDriver();
        mockDriver.setMockSendMessage(async () => ({
          response: {
            text: () => 'This is not valid JSON at all!'
          }
        }));
        testDriver = mockDriver as any;
      }

      if (!testDriver) {
        throw new Error('Driver not available for testing');
      }

      try {
        const result = await testDriver.getConstrainedModelResponse(
          undefined,
          'Give me a response',
          EVerbosity.kMedium,
          schema,
          defaultValue
        );

        expect(result).toEqual(defaultValue);
      } finally {
        // Restore original method
        if (originalCreate) {
          (chatDriver as any).openai.responses.create = originalCreate;
        }
      }
    }).timeout(getTestTimeout(provider));

    it('should handle complex nested schema constraints', async () => {
      const schema = {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              contacts: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string', enum: ['email', 'phone'] },
                    value: { type: 'string' }
                  },
                  required: ['type', 'value'],
                  additionalProperties: false
                }
              }
            },
            required: ['name', 'contacts'],
            additionalProperties: false
          }
        },
        required: ['user'],
        additionalProperties: false
      };

      const defaultValue = {
        user: {
          name: 'default',
          contacts: []
        }
      };

      const result = await chatDriver.getConstrainedModelResponse(
        'You are a helpful assistant that returns user contact information',
        'Create a user named Alice with an email contact alice@example.com and phone contact 555-0123',
        EVerbosity.kMedium,
        schema,
        defaultValue
      );

      expect(result.user.name).toBe('Alice');
      expect(result.user.contacts).toHaveLength(2);
      expect(result.user.contacts).toContainEqual({
        type: 'email',
        value: 'alice@example.com'
      });
      expect(result.user.contacts).toContainEqual({
        type: 'phone',
        value: '555-0123'
      });
    }).timeout(getTestTimeout(provider));

    it('should log full prompts when content filter error occurs', async () => {
      const schema = {
        type: 'object',
        properties: {
          result: { type: 'string' }
        },
        required: ['result'],
        additionalProperties: false
      };

      const systemPrompt = 'You are a helpful assistant';
      const userPrompt = 'This is a test prompt that should trigger content filter';
      const defaultValue = { result: 'default' };

      // Mock console.error to capture logs
      const consoleErrorSpy = console.error;
      const loggedMessages: any[] = [];
      console.error = (...args: any[]) => {
        loggedMessages.push(args);
        consoleErrorSpy.apply(console, args);
      };

      // Mock the driver to throw a content filter error
      let testDriver = chatDriver;
      const originalCreate = (chatDriver as any).openai?.responses?.create;
      if (originalCreate) {
        // OpenAI driver - mock openai.responses.create
        (chatDriver as any).openai.responses.create = async () => {
          const error: any = new Error('Content filter triggered');
          error.status = 400;
          error.error = {
            type: 'content_filter',
            message: `Content violates ${getProviderName(provider)} safety policies`
          };
          throw error;
        };
      } else if (chatDriver && chatDriver instanceof GoogleGeminiChatDriver) {
        // Gemini driver - use MockGeminiChatDriver
        const mockDriver = new MockGeminiChatDriver();
        mockDriver.setMockSendMessage(async () => {
          const error: any = new Error('Content filter triggered');
          error.status = 400;
          error.error = {
            type: 'content_filter',
            message: 'Content violates Google Gemini safety policies'
          };
          throw error;
        });
        testDriver = mockDriver as any;
      }

      if (!testDriver) {
        throw new Error('Driver not available for testing');
      }

      try {
        const result = await testDriver.getConstrainedModelResponse(
          systemPrompt,
          userPrompt,
          EVerbosity.kMedium,
          schema,
          defaultValue
        );

        // Should return default value
        expect(result).toEqual(defaultValue);

        // Should have logged content filter error with full prompts (for OpenAI)
        // Note: Gemini error handling may differ, so we check if logs exist
        if (originalCreate) {
          expect(loggedMessages.length).toBeGreaterThan(0);
          const contentFilterLog = loggedMessages.find(msg => 
            msg[0] && typeof msg[0] === 'string' && msg[0].includes('[ContentFilter]')
          );
          expect(contentFilterLog).toBeDefined();
          
          if (contentFilterLog && contentFilterLog[1]) {
            const logData = contentFilterLog[1];
            expect(logData.systemPrompt).toBe(systemPrompt);
            expect(logData.userPrompt).toBe(userPrompt);
            expect(logData.error).toContain('content filter');
          }
        }
      } finally {
        // Restore original methods
        console.error = consoleErrorSpy;
        if (originalCreate) {
          (chatDriver as any).openai.responses.create = originalCreate;
        }
      }
    }).timeout(getTestTimeout(provider));
  });

  describe(`Verbosity Level Tests (${provider})`, () => {
    it('should return longer responses with high verbosity compared to low verbosity', async function() {
      // Only run this test for OpenAI, as Azure only supports 'medium' verbosity
      if (provider !== EModelProvider.kOpenAI) {
        this.skip();
        return;
      }

      const systemPrompt = 'You are a helpful assistant that explains concepts clearly.';
      const userPrompt = 'Explain artificial intelligence.';

      let lowVerbosityResponse = '';
      let highVerbosityResponse = '';
      let lowWordCount = 0;
      let highWordCount = 0;

      // Test with low verbosity
      try {
        lowVerbosityResponse = await chatDriver.getModelResponse(
          systemPrompt, 
          userPrompt, 
          EVerbosity.kLow
        );
        lowWordCount = lowVerbosityResponse.trim().split(/\s+/).length;
      } catch (error) {
        console.warn(`WARNING: Low verbosity not supported by current model: ${error instanceof Error ? error.message : String(error)}`);
        // Use medium verbosity as fallback for comparison
        lowVerbosityResponse = await chatDriver.getModelResponse(systemPrompt, userPrompt, EVerbosity.kMedium);
        lowWordCount = lowVerbosityResponse.trim().split(/\s+/).length;
      }

      // Test with high verbosity  
      try {
        highVerbosityResponse = await chatDriver.getModelResponse(
          systemPrompt, 
          userPrompt, 
          EVerbosity.kHigh
        );
        highWordCount = highVerbosityResponse.trim().split(/\s+/).length;
      } catch (error) {
        console.warn(`WARNING: High verbosity not supported by current model: ${error instanceof Error ? error.message : String(error)}`);
        // Use medium verbosity as fallback for comparison
        highVerbosityResponse = await chatDriver.getModelResponse(systemPrompt, userPrompt, EVerbosity.kMedium);
        highWordCount = highVerbosityResponse.trim().split(/\s+/).length;
      }

      // Test that low verbosity produces less than or equal words compared to high verbosity
      expect(lowWordCount).toBeLessThanOrEqual(highWordCount);
      
      // Both should contain relevant content
      expect(lowVerbosityResponse.toLowerCase()).toMatch(/artificial intelligence|ai/);
      expect(highVerbosityResponse.toLowerCase()).toMatch(/artificial intelligence|ai/);
      
      // Log the results for verification
      console.log(`Low verbosity (${lowWordCount} words): ${lowVerbosityResponse.substring(0, 100)}...`);
      console.log(`High verbosity (${highWordCount} words): ${highVerbosityResponse.substring(0, 100)}...`);
      
      if (lowWordCount === highWordCount) {
        console.warn('WARNING: Both responses have same word count - current model may not differentiate verbosity levels');
      }
    }).timeout(getTestTimeout(provider) * 2); // Double timeout for two API calls
  });

  // Mini model tests for each provider
  let miniChatDriver: any;
  try {
    miniChatDriver = chatDriverFactory.create(EModel.kMini, provider);
  } catch (error) {
    console.warn(`Skipping mini model tests for ${provider} - driver initialization failed`);
    return;
  }

  describe(`Mini Model Tests (${provider})`, () => {
    it('should successfully return simple text response', async () => {
      const result = await miniChatDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium);
      expect(result).toMatch(/(Hi|Hello)/);
    }).timeout(getTestTimeout(provider));

    it('should successfully stream text response', async () => {
      const iterator = miniChatDriver.getStreamedModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium);
      let result = '';
      while (true) {
        const chunk = await iterator.next();
        if (chunk.done) break;
        if (chunk.value) result += chunk.value;
      }
      expect(result).toMatch(/[A-Za-z]+/); // Expect at least one word (sequence of letters)
      expect(result.toLowerCase()).toMatch(/(hi|hello)/); // Check for hi or hello substring
    }).timeout(getTestTimeout(provider));
  });
});

// Helper function to get provider name from enum
function getProviderName(provider: EModelProvider): string {
   switch (provider) {
      case EModelProvider.kOpenAI:
         return 'OpenAI';
      case EModelProvider.kAzureOpenAI:
         return 'Azure OpenAI';
      case EModelProvider.kGoogleGemini:
         return 'Google Gemini';
      case EModelProvider.kDefault:
         return process.env.NODE_ENV === 'development' ? 'Google Gemini' : 'OpenAI';
      default:
         return 'API';
   }
}

// Run exponential backoff tests for each provider
providers.forEach((provider, index) => {
   const chatDriver = chatDrivers[index];
   
   // Skip tests if driver failed to initialize
   if (!chatDriver) {
      console.warn(`Skipping exponential backoff tests for ${provider} - driver initialization failed`);
      return;
   }

   const providerName = getProviderName(provider);

describe(`Exponential Backoff Tests (${provider})`, () => {
   let mockDriver: MockOpenAIChatDriver | MockGeminiChatDriver;

   beforeEach(() => {
      if (provider === EModelProvider.kGoogleGemini) {
         mockDriver = new MockGeminiChatDriver();
      } else {
         mockDriver = new MockOpenAIChatDriver(provider);
      }
   });

   afterEach(() => {
      if (mockDriver && typeof mockDriver.setShouldFail === 'function') {
         mockDriver.setShouldFail(false);
      }
   });

   it('should retry on 429 errors and eventually succeed', async () => {
      // Set up to fail 2 times then succeed
      mockDriver.setShouldFail(true, 2);

      const startTime = Date.now();
      const result = await mockDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium);
      const endTime = Date.now();

      expect(result).toBe('Success response');
      expect(mockDriver.getFailCount()).toBe(2);

      // Verify exponential backoff timing (should be ~3 seconds: 1s + 2s)
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).toBeGreaterThan(2500); // At least 2.5 seconds
      expect(elapsedTime).toBeLessThan(5000); // Less than 5 seconds
   }).timeout(10000);

   it('should retry on 429 errors for constrained responses', async () => {
      // Set up to fail 1 time then succeed
      mockDriver.setShouldFail(true, 1);

      const schema = {
         type: 'object',
         properties: { test: { type: 'string' } },
         required: ['test']
      };

      const startTime = Date.now();
      const result = await mockDriver.getConstrainedModelResponse(
         'You are helpful',
         'return test data',
         EVerbosity.kMedium,
         schema,
         { test: 'default' }
      );
      const endTime = Date.now();

      expect(result).toEqual({ test: 'data' });
      expect(mockDriver.getFailCount()).toBe(1);

      // Verify exponential backoff timing (should be ~1 second)
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).toBeGreaterThan(800); // At least 800ms
      expect(elapsedTime).toBeLessThan(2000); // Less than 2 seconds
   }).timeout(5000);

   it('should throw error after max retries exceeded', async () => {
      // Set up to fail more than max retries (5)
      mockDriver.setShouldFail(true, 6);

      const startTime = Date.now();
      await expect(
         mockDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium)
      ).rejects.toThrow(/API error.*Rate limit exceeded|Rate limit exceeded.*API error/i);
      const endTime = Date.now();

      expect(mockDriver.getFailCount()).toBe(6); // Should have tried 6 times (1 initial + 5 retries)
      
      // Verify it took reasonable time (should be ~31 seconds: 1+2+4+8+16)
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).toBeGreaterThan(25000); // At least 25 seconds
      expect(elapsedTime).toBeLessThan(40000); // Less than 40 seconds
   }).timeout(45000);

   it('should not retry on non-429 errors', async () => {
      // Mock to throw a different error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Authentication failed');
         error.status = 401;
         throw error;
      });

      await expect(
         mockDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium)
      ).rejects.toThrow(/API error.*Authentication failed|Authentication failed.*API error/i);
   }).timeout(5000);

   it('should handle content filter errors without retrying', async () => {
      // Mock to throw a content filter error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Content filter triggered');
         error.status = 400;
         error.error = {
            type: 'content_filter',
            message: `Content violates ${providerName} safety policies`
         };
         throw error;
      });

      await expect(
         mockDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium)
      ).rejects.toThrow(/content filter.*triggered.*safety policies|safety policies.*content filter.*triggered/i);
   }).timeout(5000);

   it('should handle safety system errors without retrying', async () => {
      // Mock to throw a safety error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Safety system triggered');
         error.status = 400;
         error.error = {
            type: 'safety',
            message: `Content violates ${providerName} safety guidelines`
         };
         throw error;
      });

      await expect(
         mockDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium)
      ).rejects.toThrow(/safety system.*triggered.*safety guidelines|safety guidelines.*safety system.*triggered/i);
   }).timeout(5000);

   it('should handle general refusal errors without retrying', async () => {
      // Mock to throw a general refusal error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Request refused');
         error.status = 400;
         error.error = {
            type: 'invalid_request',
            message: 'I cannot process this request'
         };
         throw error;
      });

      await expect(
         mockDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium)
      ).rejects.toThrow(/refused request.*cannot process|cannot process.*refused request/i);
   }).timeout(5000);

   it('should handle 403 forbidden errors as refusals', async () => {
      // Mock to throw a 403 error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Forbidden');
         error.status = 403;
         error.message = 'Access forbidden';
         throw error;
      });

      await expect(
         mockDriver.getModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium)
      ).rejects.toThrow(/refused request.*403.*Access forbidden|Access forbidden.*refused request.*403/i);
   }).timeout(5000);

   it('should handle streaming with exponential backoff', async () => {
      // Set up to fail 1 time then succeed
      mockDriver.setShouldFail(true, 1);

      const startTime = Date.now();
      const iterator = mockDriver.getStreamedModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium);
      
      // Collect all chunks to get the complete response
      let fullResponse = '';
      while (true) {
         const result = await iterator.next();
         if (result.done) break;
         if (result.value) fullResponse += result.value;
      }
      const endTime = Date.now();

      expect(fullResponse).toBe('Success response');
      expect(mockDriver.getFailCount()).toBe(1);

      // Verify exponential backoff timing
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).toBeGreaterThan(800);
      expect(elapsedTime).toBeLessThan(2000);
   }).timeout(5000);

   it('should handle mid-stream errors gracefully', async () => {
      // Mock that returns some chunks then throws an error
      mockDriver.setMockCreate(async () => {
         let chunkCount = 0;
         return {
            [Symbol.asyncIterator]: () => ({
               next: async () => {
                  chunkCount++;
                  if (chunkCount <= 3) {
                     // Return successful chunks
                     return {
                        value: {
                           choices: [{
                              delta: { content: `Chunk ${chunkCount} ` }
                           }]
                        },
                        done: false
                     };
                  } else {
                     // Throw error after a few chunks
                     const error: any = new Error('Network connection lost');
                     error.status = 500;
                     throw error;
                  }
               }
            })
         };
      });

      const iterator = mockDriver.getStreamedModelResponse('You are helpful', 'say Hi', EVerbosity.kMedium);
      const chunks: string[] = [];
      let finalResult: any;
      let hitError = false;

      try {
         while (true) {
            const result = await iterator.next();
            if (result.done) {
               finalResult = result;
               // Also add the final value if it exists (this could be the interruption message)
               if (result.value) {
                  chunks.push(result.value);
               }
               break;
            }
            if (result.value) {
               chunks.push(result.value);
            }
         }
      } catch (error) {
         hitError = true;
      }

      // Should not throw an exception - should handle gracefully
      expect(hitError).toBe(false);
      
      // Should have received the successful chunks
      expect(chunks.length).toBe(4); // 3 data chunks + 1 interruption message
      expect(chunks.join('')).toContain('Chunk 1');
      expect(chunks.join('')).toContain('Chunk 2');
      expect(chunks.join('')).toContain('Chunk 3');
      
      // Should have received the interruption message as the final chunk
      const allContent = chunks.join('');
      expect(allContent).toContain('Sorry, it looks like the response was interrupted. Please try again.');
      
      // Stream should be marked as done
      expect(finalResult.done).toBe(true);
      
      // Verify the interruption message is the last chunk
      expect(chunks[chunks.length - 1]).toContain('Sorry, it looks like the response was interrupted. Please try again.');
   }).timeout(5000);
   });
});

