/**
 * @module multiple-tool-calling.test
 * 
 * Comprehensive tests for multiple tool calling functionality.
 * Demonstrates the enhanced tool calling capabilities following OpenAI Responses API patterns.
 * Tests scenarios where the model calls multiple tools in a single interaction.
 */

// Copyright (c) 2025, 2026 Jon Verrier

import { expect } from 'expect';
import { describe, it } from 'mocha';
import { ChatDriverFactory, EModelProvider, EModel, EVerbosity } from '../src/entry';
import { IFunction, EDataType, IFunctionArgs } from '../src/Function';

import { CHAT_TEST_PROVIDERS, createChatDrivers } from './ChatTestConfig';

const TEST_TIMEOUT_MS = 90000; // 90 second timeout for complex multi-tool scenarios

// Create chat drivers for all providers outside describe blocks
const providers = CHAT_TEST_PROVIDERS;
const chatDrivers = createChatDrivers(EModel.kLarge);

/**
 * Returns the appropriate timeout for a test based on the provider.
 * kGoogleGemini tests use 120s timeout, others use the default TEST_TIMEOUT_MS.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module is a Mocha test suite that verifies multiple tool calling behavior across chat model providers. It focuses on scenarios where the model must invoke several tools in a single response, both non-streaming and streaming. It asserts that required tools are called, results are incorporated, and responses are substantive.
// 
// The module defines helper factories for test tools: createReadFileFunction, createHoroscopeFunction, and createTimeZoneFunction. Each returns an IFunction with input/output schemas, validation, and a mocked execute that records calls. It also provides execution tracking utilities (resetExecutionTracking, getExecutionCount) and a test harness function testMultipleToolCalling that runs consistent assertions for each provider. Additional tests validate the tool interface shapes and tracking logic.
// 
// Key imports include Mocha’s describe and it, expect for assertions, and the chat driver API from ../src/entry (EModelProvider, EModel, EVerbosity). It relies on CHAT_TEST_PROVIDERS and createChatDrivers to instantiate drivers per provider. The tests use chatDriver.getModelResponseWithForcedTools and getStreamedModelResponseWithForcedTools, with provider-sensitive timeouts (longer for Google Gemini).
// ===End StrongAI Generated Comment===
const getTestTimeout = (provider: EModelProvider): number => {
   return provider === EModelProvider.kGoogleGemini ? 120000 : TEST_TIMEOUT_MS;
};

// Global execution tracking for testing
let functionExecutions: Array<{functionName: string, args: any, result: any, timestamp: Date}> = [];

// Helper function to reset execution tracking
const resetExecutionTracking = () => {
   functionExecutions = [];
};

// Helper function to get execution count for a specific function
const getExecutionCount = (functionName: string): number => {
   return functionExecutions.filter(exec => exec.functionName === functionName).length;
};

// Mock weather data for different cities

// Mock horoscope data for different signs
const mockHoroscopeData: { [key: string]: string } = {
   'aquarius': 'Next Tuesday you will befriend a baby otter.',
   'taurus': 'The stars align for financial opportunities this week.',
   'gemini': 'Communication will be key to your success today.',
   'cancer': 'Home and family take center stage in your life.',
   'leo': 'Your creativity shines brighter than ever before.',
   'virgo': 'Attention to detail will serve you well today.',
   'libra': 'Balance and harmony guide your decisions.',
   'scorpio': 'Deep transformation awaits you this month.',
   'sagittarius': 'Adventure calls to your restless spirit.',
   'capricorn': 'Hard work will pay off in unexpected ways.',
   'pisces': 'Your intuition is especially strong right now.',
   'aries': 'Bold action leads to exciting opportunities.'
};

/**
 * Creates a file reading function that requires separate calls for each file
 */
const createReadFileFunction = (): IFunction => {
   return {
      name: 'read_file',
      description: 'Read the contents of a specific file and return file information',
      inputSchema: {
         type: EDataType.kObject,
         properties: {
            filename: {
               type: EDataType.kString,
               description: 'The name of the file to read (e.g., "config.json", "data.txt")'
            }
         },
         required: ['filename']
      },
      outputSchema: {
         type: EDataType.kObject,
         properties: {
            filename: {
               type: EDataType.kString,
               description: 'The name of the file that was read'
            },
            size: {
               type: EDataType.kNumber,
               description: 'File size in bytes'
            },
            content: {
               type: EDataType.kString,
               description: 'File contents or summary'
            },
            last_modified: {
               type: EDataType.kString,
               description: 'Last modification timestamp'
            }
         },
         required: ['filename', 'size', 'content', 'last_modified']
      },
      validateArgs: (args: IFunctionArgs): IFunctionArgs => {
         if (!args.filename || typeof args.filename !== 'string') {
            throw new Error('filename is required and must be a string');
         }
         return args;
      },
      execute: async (args: IFunctionArgs): Promise<IFunctionArgs> => {
         const filename = args.filename as string;
         
         // Mock file data based on filename
         const mockFiles: { [key: string]: { size: number, content: string } } = {
            'config.json': { size: 1024, content: '{"version": "1.0", "debug": true}' },
            'data.txt': { size: 2048, content: 'Sample data file with important information' },
            'readme.md': { size: 512, content: '# Project Documentation\n\nThis is the readme file.' },
            'log.txt': { size: 4096, content: 'Application log entries from today' },
            'settings.ini': { size: 256, content: '[Settings]\ntheme=dark\nlanguage=en' }
         };
         
         const fileData = mockFiles[filename.toLowerCase()] || { size: 100, content: `Contents of ${filename}` };
         
         const result = {
            filename: filename,
            size: fileData.size,
            content: fileData.content,
            last_modified: new Date().toISOString()
         };
         
         // Track execution
         functionExecutions.push({
            functionName: 'read_file',
            args: args,
            result: result,
            timestamp: new Date()
         });
         
         console.log(`[FILE READER] Read file ${filename}:`, result);
         return result;
      }
   };
};

/**
 * Creates a horoscope function following the official OpenAI example pattern
 */
const createHoroscopeFunction = (): IFunction => {
   return {
      name: 'get_horoscope',
      description: "Get today's horoscope for an astrological sign",
      inputSchema: {
         type: EDataType.kObject,
         properties: {
            sign: {
               type: EDataType.kString,
               description: 'An astrological sign like Taurus or Aquarius'
            }
         },
         required: ['sign']
      },
      outputSchema: {
         type: EDataType.kObject,
         properties: {
            sign: {
               type: EDataType.kString,
               description: 'The astrological sign'
            },
            horoscope: {
               type: EDataType.kString,
               description: 'The horoscope text'
            }
         },
         required: ['sign', 'horoscope']
      },
      validateArgs: (args: IFunctionArgs): IFunctionArgs => {
         if (!args.sign || typeof args.sign !== 'string') {
            throw new Error('sign is required and must be a string');
         }
         return args;
      },
      execute: async (args: IFunctionArgs): Promise<IFunctionArgs> => {
         const sign = (args.sign as string).toLowerCase();
         const horoscope = mockHoroscopeData[sign] || 'The stars are mysterious today.';
         
         const result = {
            sign: args.sign as string,
            horoscope: horoscope
         };
         
         // Track execution
         functionExecutions.push({
            functionName: 'get_horoscope',
            args: args,
            result: result,
            timestamp: new Date()
         });
         
         console.log(`[HOROSCOPE FUNCTION] Called for ${args.sign}:`, result);
         return result;
      }
   };
};

/**
 * Creates a time zone function for testing multiple tool scenarios
 */
const createTimeZoneFunction = (): IFunction => {
   return {
      name: 'get_timezone',
      description: 'Get the current time zone information for a city',
      inputSchema: {
         type: EDataType.kObject,
         properties: {
            city: {
               type: EDataType.kString,
               description: 'The name of the city to get timezone for'
            }
         },
         required: ['city']
      },
      outputSchema: {
         type: EDataType.kObject,
         properties: {
            city: {
               type: EDataType.kString,
               description: 'The city name'
            },
            timezone: {
               type: EDataType.kString,
               description: 'The timezone identifier'
            },
            offset: {
               type: EDataType.kString,
               description: 'UTC offset'
            }
         },
         required: ['city', 'timezone', 'offset']
      },
      validateArgs: (args: IFunctionArgs): IFunctionArgs => {
         if (!args.city || typeof args.city !== 'string') {
            throw new Error('city is required and must be a string');
         }
         return args;
      },
      execute: async (args: IFunctionArgs): Promise<IFunctionArgs> => {
         const city = args.city as string;
         const timezoneMap: { [key: string]: { timezone: string, offset: string } } = {
            'london': { timezone: 'Europe/London', offset: '+00:00' },
            'paris': { timezone: 'Europe/Paris', offset: '+01:00' },
            'tokyo': { timezone: 'Asia/Tokyo', offset: '+09:00' },
            'new york': { timezone: 'America/New_York', offset: '-05:00' },
            'sydney': { timezone: 'Australia/Sydney', offset: '+11:00' }
         };
         
         const timezoneData = timezoneMap[city.toLowerCase()] || { timezone: 'UTC', offset: '+00:00' };
         
         const result = {
            city: city,
            timezone: timezoneData.timezone,
            offset: timezoneData.offset
         };
         
         // Track execution
         functionExecutions.push({
            functionName: 'get_timezone',
            args: args,
            result: result,
            timestamp: new Date()
         });
         
         console.log(`[TIMEZONE FUNCTION] Called for ${city}:`, result);
         return result;
      }
   };
};

// Helper function to test multiple tool calling scenarios
const testMultipleToolCalling = async (
   chatDriver: any,
   testName: string,
   systemPrompt: string,
   userPrompt: string,
   functions: IFunction[],
   expectedMinExecutions: number,
   expectedFunctionNames: string[],
   contentValidation: (result: string) => boolean,
   provider: EModelProvider
) => {
   // Test non-streaming response
   it(`${testName} (getModelResponseWithForcedTools)`, async () => {
      resetExecutionTracking();
      
      const result = await chatDriver.getModelResponseWithForcedTools(
         systemPrompt,
         userPrompt,
         EVerbosity.kMedium,
         undefined, // messageHistory
         functions
      );
      
      console.log(`[MULTI-TOOL NON-STREAMING TEST] ${testName}:`);
      console.log(`Response: ${result}`);
      console.log(`Function Executions: ${functionExecutions.length}`);
      console.log('---');
      
      // Verify minimum number of function executions
      expect(functionExecutions.length).toBeGreaterThanOrEqual(expectedMinExecutions);
      
      // Verify expected functions were called
      expectedFunctionNames.forEach(functionName => {
         const executionCount = getExecutionCount(functionName);
         expect(executionCount).toBeGreaterThan(0);
      });
      
      // Verify response content
      expect(contentValidation(result)).toBe(true);
      
      // Verify response is substantial
      expect(result.length).toBeGreaterThan(50);
   }).timeout(getTestTimeout(provider));

   // Test streaming response
   it(`${testName} (getStreamedModelResponseWithForcedTools)`, async () => {
      resetExecutionTracking();
      
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
      
      console.log(`[MULTI-TOOL STREAMING TEST] ${testName}:`);
      console.log(`Streamed Response: ${fullText}`);
      console.log(`Function Executions: ${functionExecutions.length}`);
      console.log('---');
      
      // Verify minimum number of function executions
      expect(functionExecutions.length).toBeGreaterThanOrEqual(expectedMinExecutions);
      
      // Verify expected functions were called
      expectedFunctionNames.forEach(functionName => {
         const executionCount = getExecutionCount(functionName);
         expect(executionCount).toBeGreaterThan(0);
      });
      
      // Verify response content
      expect(contentValidation(fullText)).toBe(true);
      
      // Verify response is substantial
      expect(fullText.length).toBeGreaterThan(50);
   }).timeout(getTestTimeout(provider));
};

// Run tests for each provider
providers.forEach((provider, index) => {
   const chatDriver = chatDrivers[index];

   describe(`Multiple Tool Calling Tests (${provider})`, () => {
      
      // Test 1: Mixed function calls (file reading + horoscope)
      testMultipleToolCalling(
         chatDriver,
         'should call different types of functions in one interaction',
         'You are a helpful assistant with access to file reading and horoscope services. CRITICAL: You MUST make ALL necessary function calls in a SINGLE response. When asked about multiple things, call the appropriate functions for EACH request separately. Make ALL these function calls in the SAME response - do not wait for function results before making additional calls. Use parallel function calling to handle ALL requests.',
         'Please read the file readme.md and give me my horoscope for Aquarius.',
         [createReadFileFunction(), createHoroscopeFunction()],
         2, // Expected minimum executions (file reading + horoscope)
         ['read_file', 'get_horoscope'], // Expected function names
         (result: string) => {
            const lowerResult = result.toLowerCase();
            return lowerResult.includes('readme.md') && lowerResult.includes('aquarius') &&
                   (lowerResult.includes('file') || lowerResult.includes('read') || lowerResult.includes('contents')) &&
                   (lowerResult.includes('horoscope') || lowerResult.includes('otter'));
         },
         provider
      );

      // Test 2: All three functions in one complex request
      testMultipleToolCalling(
         chatDriver,
         'should handle requests requiring all available functions',
         'You are a comprehensive assistant with access to file reading, horoscope, and timezone services. CRITICAL: You MUST make ALL necessary function calls in a SINGLE response. When asked about multiple types of information, call the appropriate functions for EACH request separately. Make ALL these function calls in the SAME response - do not wait for function results before making additional calls. Use parallel function calling to provide ALL requested information.',
         'I am an Aquarius working in Sydney and need to read the file log.txt. Can you read the file, get the timezone for Sydney, and give me my horoscope?',
         [createReadFileFunction(), createHoroscopeFunction(), createTimeZoneFunction()],
         3, // Expected minimum executions (one for each function)
         ['read_file', 'get_horoscope', 'get_timezone'], // Expected function names
         (result: string) => {
            const lowerResult = result.toLowerCase();
            return lowerResult.includes('log.txt') && lowerResult.includes('sydney') && lowerResult.includes('aquarius') &&
                   (lowerResult.includes('file') || lowerResult.includes('read') || lowerResult.includes('contents')) &&
                   (lowerResult.includes('horoscope') || lowerResult.includes('otter')) &&
                   (lowerResult.includes('timezone') || lowerResult.includes('australia'));
         },
         provider
      );

      // Test 3: Official OpenAI example recreation
      testMultipleToolCalling(
         chatDriver,
         'should recreate the official OpenAI horoscope example pattern',
         'You are a helpful assistant that can provide horoscope information. When asked about horoscopes, use the get_horoscope function.',
         'What is my horoscope? I am an Aquarius.',
         [createHoroscopeFunction()],
         1, // Expected minimum executions
         ['get_horoscope'], // Expected function names
         (result: string) => {
            const lowerResult = result.toLowerCase();
            // Check for keyword combinations that indicate function was called and result incorporated
            // We look for combinations like: aquarius+horoscope, aquarius+otter, aquarius+tuesday
            // This is more flexible than requiring exact strings
            const hasSign = lowerResult.includes('aquarius');
            const hasHoroscopeKeyword = lowerResult.includes('horoscope');
            const hasOtter = lowerResult.includes('otter');
            const hasTuesday = lowerResult.includes('tuesday');
            
            // Must have the sign AND at least one horoscope-related keyword
            return hasSign && (hasHoroscopeKeyword || hasOtter || hasTuesday);
         },
         provider
      );
   });
});

describe('Multiple Tool Calling Interface Tests', () => {
   it('should validate multiple function interface structures', () => {
      const fileReadingFunction = createReadFileFunction();
      const horoscopeFunction = createHoroscopeFunction();
      const timezoneFunction = createTimeZoneFunction();
      
      // Validate file reading function
      expect(fileReadingFunction.name).toBe('read_file');
      expect(fileReadingFunction.inputSchema.properties.filename.type).toBe(EDataType.kString);
      expect(fileReadingFunction.outputSchema.properties.content.type).toBe(EDataType.kString);
      
      // Validate horoscope function
      expect(horoscopeFunction.name).toBe('get_horoscope');
      expect(horoscopeFunction.inputSchema.properties.sign.type).toBe(EDataType.kString);
      expect(horoscopeFunction.outputSchema.properties.horoscope.type).toBe(EDataType.kString);
      
      // Validate timezone function
      expect(timezoneFunction.name).toBe('get_timezone');
      expect(timezoneFunction.inputSchema.properties.city.type).toBe(EDataType.kString);
      expect(timezoneFunction.outputSchema.properties.timezone.type).toBe(EDataType.kString);
   });

   it('should handle function execution tracking correctly', () => {
      resetExecutionTracking();
      expect(functionExecutions.length).toBe(0);
      
      // Simulate some executions
      functionExecutions.push({
         functionName: 'get_weather',
         args: { city: 'London' },
         result: { temperature: 15 },
         timestamp: new Date()
      });
      
      expect(getExecutionCount('get_weather')).toBe(1);
      expect(getExecutionCount('get_horoscope')).toBe(0);
   });
});
