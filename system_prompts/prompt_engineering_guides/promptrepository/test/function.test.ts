/**
 * @module function.test
 * 
 * Unit tests for the Function module which handles function definitions for LLM interactions.
 */

// Copyright (c) 2025, 2026 Jon Verrier

import { expect } from 'expect';
import { describe, it } from 'mocha';
import { ChatDriverFactory, EModelProvider, EModel, EVerbosity } from '../src/entry';
import { IFunction, EDataType, IFunctionArgs } from '../src/Function';

import { CHAT_TEST_PROVIDERS, createChatDrivers, TEST_TIMEOUT_MS } from './ChatTestConfig';

// Create chat drivers for all providers outside describe blocks
const providers = CHAT_TEST_PROVIDERS;
const chatDrivers = createChatDrivers(EModel.kLarge);

/**
 * Returns the appropriate timeout for a test based on the provider.
 * kGoogleGemini tests use 120s timeout, others use the default TEST_TIMEOUT_MS.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module defines a comprehensive Mocha test suite for the Function integration layer that enables LLM tool calls. It verifies function schemas, argument validation, execution flow, call counting, and both non-streaming and streaming responses across multiple model providers.
// 
// The module does not export runtime APIs. Instead, it provides internal test helpers:
// - createMotorsportFunction builds an IFunction with basic or strict validation and a mocked execute that returns leader data by race series.
// - resetCallCounter and getCallCount track how many tool executions occur.
// - testFunctionIntegration asserts that models handle function definitions and validation errors in streamed and non-streamed modes.
// - testFunctionCallCounting forces tool usage, verifies exact call counts, and checks response content.
// - createListMemoriesFunction and createSaveMemoryFunction simulate multi-step memory operations.
// - testMultiStepFunctionCalling ensures parallel, multi-call tool execution and validates content and minimum call counts.
// 
// Key imports:
// - expect (assertions) and mocha’s describe/it (test structure).
// - Chat driver APIs and enums (EModelProvider, EModel, EVerbosity) from entry for provider selection and verbosity.
// - IFunction, EDataType, IFunctionArgs from Function for tool schemas and execution.
// - CHAT_TEST_PROVIDERS, createChatDrivers, TEST_TIMEOUT_MS for provider matrix setup and timeouts, with special handling for Google Gemini.
// ===End StrongAI Generated Comment===
const getTestTimeout = (provider: EModelProvider): number => {
   return provider === EModelProvider.kGoogleGemini ? 120000 : TEST_TIMEOUT_MS;
};

// Mock data for different race series
const mockRaceData: { [key: string]: { driver: string; points: number } } = {
   'Formula 1': { driver: 'Max Verstappen', points: 575 },
   'NASCAR': { driver: 'Kyle Larson', points: 4040 },
   'IndyCar': { driver: 'Alex Palou', points: 656 },
   'Formula E': { driver: 'Jake Dennis', points: 229 },
   'WEC': { driver: 'Toyota Gazoo Racing', points: 172 }
};

// Valid race series for strict validation
const validRaceSeries = ['Formula 1', 'NASCAR', 'IndyCar', 'Formula E', 'WEC'];

// Global call counter for tracking function executions
let functionCallCount = 0;

// Factory function to create motorsport function with configurable validation
const createMotorsportFunction = (validationLevel: 'basic' | 'strict' = 'basic'): IFunction => {
   const validateArgs = (args: IFunctionArgs): IFunctionArgs => {
      if (!args.raceSeries || typeof args.raceSeries !== 'string') {
         throw new Error('raceSeries is required and must be a string');
      }
      
      if (validationLevel === 'strict') {
         if (args.raceSeries.length < 5) {
            throw new Error('raceSeries must be at least 5 characters long');
         }
         if (!validRaceSeries.includes(args.raceSeries)) {
            throw new Error(`Invalid race series: ${args.raceSeries}. Must be one of: ${validRaceSeries.join(', ')}`);
         }
      }
      
      return args;
   };

   return {
      name: 'get_leading_driver',
      description: 'Get the current leading driver in a specific motorsport race series',
      inputSchema: {
         type: EDataType.kObject,
         properties: {
            raceSeries: {
               type: EDataType.kString,
               description: 'The name of the motorsport race series, e.g. Formula 1, NASCAR, IndyCar'
            }
         },
         required: ['raceSeries']
      },
      outputSchema: {
         type: EDataType.kObject,
         properties: {
            leadingDriver: {
               type: EDataType.kString,
               description: 'The name of the current leading driver in the championship'
            },
            raceSeries: {
               type: EDataType.kString,
               description: 'The race series that was queried'
            },
            points: {
               type: EDataType.kNumber,
               description: 'The current championship points of the leading driver'
            }
         },
         required: ['leadingDriver', 'raceSeries', 'points']
      },
      validateArgs,
      execute: async (args: IFunctionArgs): Promise<IFunctionArgs> => {
         // Increment call counter
         functionCallCount++;
         
         // Log the parameters being passed to the execute function
         console.log(`[Function Execute] get_leading_driver called with parameters:`, JSON.stringify(args, null, 2));
         
         const raceSeries = args.raceSeries as string;
         const data = mockRaceData[raceSeries] || { driver: 'Unknown Driver', points: 0 };
         
         // Log the result being returned
         const result = {
            leadingDriver: data.driver,
            raceSeries: raceSeries,
            points: data.points
         };
         console.log(`[Function Execute] get_leading_driver returning:`, JSON.stringify(result, null, 2));
         
         return result;
      }
   };
};

// Helper function to reset call counter
const resetCallCounter = () => {
   functionCallCount = 0;
};

// Helper function to get current call count
const getCallCount = () => functionCallCount;

// Helper function to test both streaming and non-streaming responses
const testFunctionIntegration = async (
   chatDriver: any,
   testName: string,
   systemPrompt: string,
   userPrompt: string,
   functions: IFunction[],
   expectedValidation: (result: string) => boolean,
   provider: EModelProvider
) => {
   // Test non-streaming response
   it(`${testName} (getModelResponse)`, async () => {
      const result = await chatDriver.getModelResponse(
         systemPrompt,
         userPrompt,
         EVerbosity.kMedium,
         undefined, // messageHistory
         functions
      );
      
      expect(expectedValidation(result)).toBe(true);
   }).timeout(getTestTimeout(provider));

   // Test streaming response
   it(`${testName} (getStreamedModelResponse)`, async () => {
      const iterator = chatDriver.getStreamedModelResponse(
         systemPrompt,
         userPrompt,
         EVerbosity.kMedium,
         undefined, // messageHistory
         functions
      );
      
      const chunks: string[] = [];
      while (true) {
         const result = await iterator.next();
         if (result.done) break;
         if (result.value) {
            chunks.push(result.value);
         }
      }
      
      const fullText = chunks.join('');
      expect(expectedValidation(fullText)).toBe(true);
   }).timeout(getTestTimeout(provider));

   
};

// Run all tests for each provider
providers.forEach((provider, index) => {
  const chatDriver = chatDrivers[index];

  // Skip tests if driver failed to initialize (e.g., missing API key)
  if (!chatDriver) {
    console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
    return;
  }

  describe(`Function Integration Tests (${provider})`, () => {
    testFunctionIntegration(
      chatDriver,
      'should successfully return text response with function definition',
      'You are a helpful assistant that can call functions to get motorsport information.',
      'Who is the leading driver in Formula 1?',
      [createMotorsportFunction('basic')],
      (result: string) => {
         // The model should respond acknowledging the function call capability
         return result.match(/driver|formula|racing|function|call/i) !== null && result.length > 10;
      },
      provider
    );

    testFunctionIntegration(
      chatDriver,
      'should handle validation failure and include error information in response',
      'You are a helpful assistant that can call functions to get motorsport information.',
      'Who is the leading driver in F35?',
      [createMotorsportFunction('strict')],
      (result: string) => {
         // The model should respond with error information from validation failure
         // Check for various error indicators that might appear in the response
         const lowerResult = result.toLowerCase();
         return lowerResult.includes('error') ||
                lowerResult.includes('issue') ||
                lowerResult.includes('problem') ||
                lowerResult.includes('misunderstanding') ||         
                lowerResult.includes('not recognized') ||
                lowerResult.includes('not a valid') ||
                lowerResult.includes('no recognized') ||
                lowerResult.includes('not a recognized') ||
                lowerResult.includes('confusion') ||
                lowerResult.includes('no widely recognized') ||
                lowerResult.includes('unknown') ||
                lowerResult.includes('unclear') ||
                lowerResult.includes('not sure') ||
                lowerResult.includes('not familiar') ||
                lowerResult.includes('don\'t recognize') ||
                lowerResult.includes('cannot') ||
                lowerResult.includes('unable') ||
                lowerResult.includes('sorry') ||
                lowerResult.includes('f35') || // F35 is not a valid race series
                lowerResult.includes('invalid') ||
                lowerResult.includes('incorrect');
      },
      provider
    );
  });
});

describe('Function Interface Tests', () => {
   it('should validate function interface structure', () => {
      const testFunction: IFunction = {
         name: 'test_function',
         description: 'A test function for validation',
         inputSchema: {
            type: EDataType.kObject,
            properties: {
               testParam: {
                  type: EDataType.kString,
                  description: 'A test parameter'
               }
            },
            required: ['testParam']
         },
         outputSchema: {
            type: EDataType.kObject,
            properties: {
               testResult: {
                  type: EDataType.kString,
                  description: 'A test result'
               }
            },
            required: ['testResult']
         },
         validateArgs: (args: IFunctionArgs): IFunctionArgs => {
            if (!args.testParam || typeof args.testParam !== 'string') {
               throw new Error('testParam is required and must be a string');
            }
            return args;
         },
         execute: async (args: IFunctionArgs): Promise<IFunctionArgs> => {
            const testParam = args.testParam as string;
            return {
               testResult: `Processed: ${testParam}`
            };
         }
      };

      expect(testFunction.name).toBe('test_function');
      expect(testFunction.description).toBe('A test function for validation');
      expect(testFunction.inputSchema.properties.testParam.type).toBe(EDataType.kString);
      expect(testFunction.outputSchema.properties.testResult.type).toBe(EDataType.kString);
      expect(testFunction.inputSchema.required).toContain('testParam');
      expect(testFunction.outputSchema.required).toContain('testResult');
   });

   it('should validate EDataType enum values', () => {
      expect(EDataType.kObject).toBe('object');
      expect(EDataType.kString).toBe('string');
      expect(EDataType.kNumber).toBe('number');
      expect(EDataType.kArray).toBe('array');
   });
});

describe('Function Call Counting and Content Verification Tests', () => {
   beforeEach(() => {
      resetCallCounter();
   });

   // Helper function to test function call counting and content verification
   const testFunctionCallCounting = async (
      chatDriver: any,
      testName: string,
      systemPrompt: string,
      userPrompt: string,
      functions: IFunction[],
      expectedCallCount: number,
      expectedFacts: string[],
      provider: EModelProvider
   ) => {
      // Test non-streaming response
      it(`${testName} (getModelResponse)`, async () => {
         const initialCallCount = getCallCount();
         const result = await chatDriver.getModelResponseWithForcedTools(
            systemPrompt,
            userPrompt,
            EVerbosity.kMedium,
            undefined, // messageHistory
            functions
         );
         
         const finalCallCount = getCallCount();
         const actualCallCount = finalCallCount - initialCallCount;
         
         // Verify function was called the expected number of times
         expect(actualCallCount).toBe(expectedCallCount);
         
         // Verify response contains expected facts from function execution
         const resultLower = result.toLowerCase();
         expectedFacts.forEach(fact => {
            const factLower = fact.toLowerCase();
            // Handle number formatting - accept both "4040" and "4,040" formats
            if (factLower === '4040') {
               const hasNumber = resultLower.includes('4040') || resultLower.includes('4,040');
               expect(hasNumber).toBe(true);
            } else {
               expect(resultLower).toContain(factLower);
            }
         });
         
         // Additional verification: check that response is substantial
         expect(result.length).toBeGreaterThan(50);
      }).timeout(getTestTimeout(provider));

      // Test streaming response
      it(`${testName} (getStreamedModelResponse)`, async () => {
         const initialCallCount = getCallCount();
         const iterator = chatDriver.getStreamedModelResponseWithForcedTools(
            systemPrompt,
            userPrompt,
            EVerbosity.kMedium,
            undefined, // messageHistory
            functions
         );
         
         const chunks: string[] = [];
         while (true) {
            const result = await iterator.next();
            if (result.done) break;
            if (result.value) {
               chunks.push(result.value);
            }
         }
         
         const fullText = chunks.join('');
         
         // Log the model response
         
         const finalCallCount = getCallCount();
         const actualCallCount = finalCallCount - initialCallCount;
         
         // Verify function was called the expected number of times
         expect(actualCallCount).toBe(expectedCallCount);
         
         // Verify response contains expected facts from function execution
         const fullTextLower = fullText.toLowerCase();
         expectedFacts.forEach(fact => {
            const factLower = fact.toLowerCase();
            // Handle number formatting - accept both "4040" and "4,040" formats
            if (factLower === '4040') {
               const hasNumber = fullTextLower.includes('4040') || fullTextLower.includes('4,040');
               expect(hasNumber).toBe(true);
            } else {
               expect(fullTextLower).toContain(factLower);
            }
         });
         
         // Additional verification: check that response is substantial
         expect(fullText.length).toBeGreaterThan(50);
      }).timeout(getTestTimeout(provider));
   };

   // Run function call counting tests for each provider
   providers.forEach((provider, index) => {
      const chatDriver = chatDrivers[index];

      // Skip tests if driver failed to initialize (e.g., missing API key)
      if (!chatDriver) {
         console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
         return;
      }

      describe(`Function Call Counting Tests (${provider})`, () => {
         testFunctionCallCounting(
            chatDriver,
            'should call function once and return Formula 1 facts',
            'You are a helpful assistant that can call functions to get motorsport information. When asked about leading drivers, call the get_leading_driver function with the raceSeries parameter extracted from the user\'s question (e.g., if they ask about "Formula 1", pass raceSeries: "Formula 1").',
            'Who is the leading driver in Formula 1?',
            [createMotorsportFunction('basic')],
            1, // Expected call count
            ['max verstappen', '575'], // Expected facts from function
            provider
         );

         testFunctionCallCounting(
            chatDriver,
            'should call function once and return NASCAR facts',
            'You are a helpful assistant that can call functions to get motorsport information. When asked about leading drivers, call the get_leading_driver function with the raceSeries parameter extracted from the user\'s question (e.g., if they ask about "NASCAR", pass raceSeries: "NASCAR").',
            'Who is leading the NASCAR championship?',
            [createMotorsportFunction('basic')],
            1, // Expected call count
            ['kyle larson', '4040'], // Expected facts from function
            provider
         );

         testFunctionCallCounting(
            chatDriver,
            'should call function once and return IndyCar facts',
            'You are a helpful assistant that can call functions to get motorsport information. When asked about leading drivers, call the get_leading_driver function with the raceSeries parameter extracted from the user\'s question (e.g., if they ask about "IndyCar", pass raceSeries: "IndyCar").',
            'Tell me about the IndyCar leader',
            [createMotorsportFunction('basic')],
            1, // Expected call count
            ['alex palou', '656'], // Expected facts from function
            provider
         );

         // Test non-motorsport queries (should NOT call functions)
         it('should handle multiple questions without calling function for non-motorsport queries (getModelResponse)', async () => {
            const initialCallCount = getCallCount();
            const result = await chatDriver.getModelResponse(
               'You are a helpful assistant that can call functions to get motorsport information. Only call the get_leading_driver function when specifically asked about motorsport drivers.',
               'What is the weather like today?',
               EVerbosity.kMedium,
               undefined, // messageHistory
               [createMotorsportFunction('basic')]
            );
            
            const finalCallCount = getCallCount();
            const actualCallCount = finalCallCount - initialCallCount;
            
            // Verify function was NOT called
            expect(actualCallCount).toBe(0);
            
            // Verify response is reasonable for weather query
            expect(result.length).toBeGreaterThan(10);
         }).timeout(getTestTimeout(provider));

         it('should handle multiple questions without calling function for non-motorsport queries (getStreamedModelResponse)', async () => {
            const initialCallCount = getCallCount();
            const iterator = chatDriver.getStreamedModelResponse(
               'You are a helpful assistant that can call functions to get motorsport information. Only call the get_leading_driver function when specifically asked about motorsport drivers.',
               'What is the weather like today?',
               EVerbosity.kMedium,
               undefined, // messageHistory
               [createMotorsportFunction('basic')]
            );
            
            const chunks: string[] = [];
            while (true) {
               const result = await iterator.next();
               if (result.done) break;
               if (result.value) {
                  chunks.push(result.value);
               }
            }
            
            const finalCallCount = getCallCount();
            const actualCallCount = finalCallCount - initialCallCount;
            
            // Verify function was NOT called
            expect(actualCallCount).toBe(0);
            
            // Verify response is reasonable for weather query
            const fullText = chunks.join('');
            expect(fullText.length).toBeGreaterThan(10);
         }).timeout(getTestTimeout(provider));
      });
   });
});

// Multi-step function calling tests
describe('Multi-Step Function Calling Tests', () => {
   let memoryStore: { [key: string]: any } = {};
   
   beforeEach(() => {
      // Reset memory store before each test
      memoryStore = {};
      resetCallCounter();
   });

   // Create a memory management function that lists existing memories
   const createListMemoriesFunction = (): IFunction => {
      return {
         name: 'listMemories',
         description: 'Lists all stored memories',
         inputSchema: {
            type: 'object',
            properties: {},
            required: []
         },
         outputSchema: {
            type: EDataType.kObject,
            properties: {
               memories: {
                  type: EDataType.kArray,
                  description: 'Array of stored memories'
               },
               count: {
                  type: EDataType.kNumber,
                  description: 'Number of memories stored'
               },
               status: {
                  type: EDataType.kString,
                  description: 'Status message indicating the result of the operation'
               },
               timestamp: {
                  type: EDataType.kString,
                  description: 'Timestamp of the operation'
               }
            },
            required: ['memories', 'count', 'status', 'timestamp']
         },
         validateArgs: (args: any): any => {
            return {}; // No validation needed for listing
         },
         execute: async (args: any): Promise<any> => {
            functionCallCount++;
            console.log(`[FUNCTION CALL] listMemories() called - Call #${functionCallCount}`);
            const memories = Object.keys(memoryStore).map(key => ({
               key,
               value: memoryStore[key]
            }));
            const result = {
               memories,
               count: memories.length,
               status: memories.length === 0 ? "No existing memories found. Ready to save new memories." : "Existing memories retrieved successfully.",
               timestamp: new Date().toISOString()
            };
            console.log(`[FUNCTION RESULT] listMemories() returned:`, result);
            return {
               memories,
               count: memories.length,
               status: memories.length === 0 ? "No existing memories found. Ready to save new memories." : "Existing memories retrieved successfully.",
               timestamp: new Date().toISOString()
            };
         }
      };
   };

   // Create a memory management function that saves new memories
   const createSaveMemoryFunction = (): IFunction => {
      return {
         name: 'saveMemory',
         description: 'Saves a new memory with a key and value',
         inputSchema: {
            type: 'object',
            properties: {
               key: {
                  type: 'string',
                  description: 'The key to store the memory under'
               },
               value: {
                  type: 'string', 
                  description: 'The value to store'
               }
            },
            required: ['key', 'value']
         },
         outputSchema: {
            type: EDataType.kObject,
            properties: {
               success: {
                  type: EDataType.kBoolean,
                  description: 'Whether the save operation was successful'
               },
               key: {
                  type: EDataType.kString,
                  description: 'The key that was used to store the memory'
               },
               value: {
                  type: EDataType.kString,
                  description: 'The value that was stored'
               },
               timestamp: {
                  type: EDataType.kString,
                  description: 'Timestamp of the operation'
               }
            },
            required: ['success', 'key', 'value', 'timestamp']
         },
         validateArgs: (args: any): any => {
            if (!args.key || typeof args.key !== 'string') {
               throw new Error('Key must be a non-empty string');
            }
            if (!args.value || typeof args.value !== 'string') {
               throw new Error('Value must be a non-empty string');
            }
            return args;
         },
         execute: async (args: any): Promise<any> => {
            functionCallCount++;
            console.log(`[FUNCTION CALL] saveMemory() called - Call #${functionCallCount} with args:`, args);
            memoryStore[args.key] = args.value;
            console.log(`[FUNCTION RESULT] saveMemory() saved to memory store:`, memoryStore);
            return {
               success: true,
               key: args.key,
               value: args.value,
               timestamp: new Date().toISOString()
            };
         }
      };
   };

   // Helper function to test multi-step function calling
   const testMultiStepFunctionCalling = async (
      chatDriver: any,
      testName: string,
      systemPrompt: string,
      userPrompt: string,
      functions: IFunction[],
      expectedMinCallCount: number,
      expectedContent: string[],
      provider: EModelProvider
   ) => {
      // Test non-streaming response with forced tools
      it(`${testName} (getModelResponseWithForcedTools)`, async () => {
         const initialCallCount = getCallCount();
         const result = await chatDriver.getModelResponseWithForcedTools(
            systemPrompt,
            userPrompt,
            EVerbosity.kMedium,
            undefined, // messageHistory
            functions
         );
         
         // Log the model response for debugging
         console.log(`[Multi-Step Test] ${testName}:`);
         console.log(`Model Response: ${result}`);
         console.log(`Memory Store: ${JSON.stringify(memoryStore)}`);
         console.log('---');
         
         const finalCallCount = getCallCount();
         const actualCallCount = finalCallCount - initialCallCount;
         
         // Add detailed logging for debugging
         console.log(`📊 Function Call Analysis:`);
         console.log(`   Expected minimum calls: ${expectedMinCallCount}`);
         console.log(`   Actual calls made: ${actualCallCount}`);
         console.log(`   Total function call count: ${functionCallCount}`);
         console.log(`   Memory store contents:`, JSON.stringify(memoryStore, null, 2));
         console.log(`   Memory store keys: [${Object.keys(memoryStore).join(', ')}]`);
         
         // Verify at least the minimum expected number of function calls occurred
         expect(actualCallCount).toBeGreaterThanOrEqual(expectedMinCallCount);
         
         // For memory tests, verify that at least one saveMemory call was made (memory store should not be empty)
         if (testName.includes('memory')) {
            expect(Object.keys(memoryStore).length).toBeGreaterThan(0);
         }
         
         // Verify response contains expected content
         const resultLower = result.toLowerCase();
         expectedContent.forEach(content => {
            expect(resultLower).toContain(content.toLowerCase());
         });
         
         // Verify response is substantial (not just a function result)
         expect(result.length).toBeGreaterThan(100);
      }).timeout(getTestTimeout(provider));

      // Test streaming response with forced tools
      it(`${testName} (getStreamedModelResponseWithForcedTools)`, async () => {
         // Reset for streaming test
         memoryStore = {};
         resetCallCounter();
         
         const initialCallCount = getCallCount();
         const iterator = chatDriver.getStreamedModelResponseWithForcedTools(
            systemPrompt,
            userPrompt,
            EVerbosity.kMedium,
            undefined, // messageHistory
            functions
         );
         
         const chunks: string[] = [];
         while (true) {
            const result = await iterator.next();
            if (result.done) break;
            if (result.value) {
               chunks.push(result.value);
            }
         }
         
         const fullText = chunks.join('');
         const finalCallCount = getCallCount();
         const actualCallCount = finalCallCount - initialCallCount;
         
         // Log the streaming response for debugging
         console.log(`[Multi-Step Streaming Test] ${testName}:`);
         console.log(`Streamed Response: ${fullText}`);
         console.log(`Memory Store: ${JSON.stringify(memoryStore)}`);
         console.log('---');
         
         // Add detailed logging for debugging
         console.log(`📊 Streaming Function Call Analysis:`);
         console.log(`   Expected minimum calls: ${expectedMinCallCount}`);
         console.log(`   Actual calls made: ${actualCallCount}`);
         console.log(`   Total function call count: ${functionCallCount}`);
         console.log(`   Memory store contents:`, JSON.stringify(memoryStore, null, 2));
         console.log(`   Memory store keys: [${Object.keys(memoryStore).join(', ')}]`);
         
         // Verify at least the minimum expected number of function calls occurred
         expect(actualCallCount).toBeGreaterThanOrEqual(expectedMinCallCount);
         
         // For memory tests, verify that at least one saveMemory call was made (memory store should not be empty)
         if (testName.includes('memory')) {
            expect(Object.keys(memoryStore).length).toBeGreaterThan(0);
         }
         
         // Verify response contains expected content
         const resultLower = fullText.toLowerCase();
         expectedContent.forEach(content => {
            expect(resultLower).toContain(content.toLowerCase());
         });
         
         // Verify response is substantial
         expect(fullText.length).toBeGreaterThan(100);
      }).timeout(getTestTimeout(provider));
   };

   // Run multi-step tests for each provider
   providers.forEach((provider, index) => {
      const chatDriver = chatDrivers[index];

      // Skip tests if driver failed to initialize (e.g., missing API key)
      if (!chatDriver) {
         console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
         return;
      }

      describe(`Multi-Step Function Calling Tests (${provider})`, () => {
         testMultiStepFunctionCalling(
            chatDriver,
            'should call listMemories then saveMemory when user provides new information',
            'You are a helpful assistant with memory capabilities. CRITICAL: You MUST make ALL necessary function calls in a SINGLE response. When a user provides information: 1) FIRST call listMemories() to check existing memories, 2) THEN call saveMemory() for each piece of information that needs to be saved. Make ALL these function calls in the SAME response - do not wait for function results before making additional calls. Use parallel function calling to complete the entire task in one response.',
            'I am 50 years old and want to improve my snatch technique in weightlifting.',
            [createListMemoriesFunction(), createSaveMemoryFunction()],
            2, // Expected minimum call count (listMemories + saveMemory)
            ['50', 'snatch'], // Expected content in response
            provider
         );

         testMultiStepFunctionCalling(
            chatDriver,
            'should handle multiple memory operations for complex user information',
            'You are a helpful assistant with memory capabilities. CRITICAL: You MUST make ALL necessary function calls in a SINGLE response. When a user provides information: 1) FIRST call listMemories() to check existing memories, 2) THEN call saveMemory() for each piece of information that needs to be saved. Make ALL these function calls in the SAME response - do not wait for function results before making additional calls. Use parallel function calling to complete the entire task in one response.',
            'My name is John Smith, I live in Seattle, and I work as a software engineer at Microsoft.',
            [createListMemoriesFunction(), createSaveMemoryFunction()],
            2, // Expected minimum call count (listMemories + at least one saveMemory call)
            ['john', 'seattle', 'software', 'microsoft'], // Expected content in response
            provider
         );
      });
   });
});