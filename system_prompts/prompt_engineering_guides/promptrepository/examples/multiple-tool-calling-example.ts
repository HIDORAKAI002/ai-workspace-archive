/**
 * @module multiple-tool-calling-example
 * 
 * Example demonstrating multiple tool calling with PromptRepository library.
 * This example closely follows the official OpenAI Responses API pattern
 * and shows how to handle multiple function calls in a single interaction.
 */

// Copyright (c) 2025, 2026 Jon Verrier

import { ChatDriverFactory, EModelProvider, EModel, EVerbosity } from '../src/entry';
import { IFunction, EDataType, IFunctionArgs } from '../src/Function';

/**
 * Example recreating the official OpenAI horoscope function
 * This follows the exact pattern from the OpenAI documentation
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module demonstrates multiple tool calling with the PromptRepository chat driver, modeled after the OpenAI Responses API. It defines two example tools and shows how to invoke them singly, in combination, and via streaming, plus a walkthrough of the input_list pattern.
// 
// Exports:
// - createHoroscopeFunction creates an IFunction for get_horoscope with input/output schemas, argument validation, and a mock execute that returns a canned horoscope.
// - createWeatherFunction creates an IFunction for get_weather with schemas, validation, and a mock execute that returns simple city-based weather data.
// - runMultipleToolCallingExample runs three examples: a single tool call matching the official pattern, multiple tool calls with forced tools, and a streamed response using only the weather tool.
// - demonstrateInputListPattern prints a step-by-step simulation of function_call, tool execution, and final response assembly.
// 
// Key dependencies:
// - ChatDriverFactory, EModelProvider, EModel, EVerbosity from ../src/entry to construct a chat driver (OpenAI, large model) and control verbosity and invocation style.
// - IFunction, EDataType, IFunctionArgs from ../src/Function to define tool contracts, JSON-like schemas, validation, and execution behavior.
// ===End StrongAI Generated Comment===
function createHoroscopeFunction(): IFunction {
   return {
      name: "get_horoscope",
      description: "Get today's horoscope for an astrological sign.",
      inputSchema: {
         type: EDataType.kObject,
         properties: {
            sign: {
               type: EDataType.kString,
               description: "An astrological sign like Taurus or Aquarius"
            }
         },
         required: ["sign"]
      },
      outputSchema: {
         type: EDataType.kObject,
         properties: {
            horoscope: {
               type: EDataType.kString,
               description: "The horoscope text for the sign"
            },
            sign: {
               type: EDataType.kString,
               description: "The astrological sign"
            }
         },
         required: ["horoscope", "sign"]
      },
      validateArgs: (args: IFunctionArgs): IFunctionArgs => {
         if (!args.sign || typeof args.sign !== 'string') {
            throw new Error('sign is required and must be a string');
         }
         return args;
      },
      execute: async (args: IFunctionArgs): Promise<IFunctionArgs> => {
         const sign = args.sign as string;
         // Following the official example
         const horoscope = sign + " Next Tuesday you will befriend a baby otter.";
         
         console.log(`[HOROSCOPE FUNCTION] Called for ${sign}`);
         return {
            horoscope: horoscope,
            sign: sign
         };
      }
   };
}

/**
 * Weather function for demonstrating multiple tool calls
 */
function createWeatherFunction(): IFunction {
   return {
      name: "get_weather",
      description: "Get current weather information for a city.",
      inputSchema: {
         type: EDataType.kObject,
         properties: {
            city: {
               type: EDataType.kString,
               description: "The name of the city to get weather for"
            }
         },
         required: ["city"]
      },
      outputSchema: {
         type: EDataType.kObject,
         properties: {
            city: {
               type: EDataType.kString,
               description: "The city name"
            },
            temperature: {
               type: EDataType.kNumber,
               description: "Temperature in Celsius"
            },
            condition: {
               type: EDataType.kString,
               description: "Weather condition"
            }
         },
         required: ["city", "temperature", "condition"]
      },
      validateArgs: (args: IFunctionArgs): IFunctionArgs => {
         if (!args.city || typeof args.city !== 'string') {
            throw new Error('city is required and must be a string');
         }
         return args;
      },
      execute: async (args: IFunctionArgs): Promise<IFunctionArgs> => {
         const city = args.city as string;
         
         // Mock weather data
         const weatherData: { [key: string]: { temperature: number, condition: string } } = {
            'london': { temperature: 15, condition: 'cloudy' },
            'paris': { temperature: 18, condition: 'sunny' },
            'tokyo': { temperature: 22, condition: 'rainy' },
            'new york': { temperature: 12, condition: 'snowy' }
         };
         
         const weather = weatherData[city.toLowerCase()] || { temperature: 20, condition: 'unknown' };
         
         console.log(`[WEATHER FUNCTION] Called for ${city}`);
         return {
            city: city,
            temperature: weather.temperature,
            condition: weather.condition
         };
      }
   };
}

/**
 * Main example function demonstrating multiple tool calling patterns
 */
async function runMultipleToolCallingExample() {
   console.log('🚀 Multiple Tool Calling Example');
   console.log('================================');
   
   // Create chat driver (using OpenAI as example)
   const chatDriverFactory = new ChatDriverFactory();
   const chatDriver = chatDriverFactory.create(EModel.kLarge, EModelProvider.kOpenAI);
   
   // Define available tools (following official OpenAI example pattern)
   const tools = [
      createHoroscopeFunction(),
      createWeatherFunction()
   ];
   
   console.log('\\n📋 Available Tools:');
   tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
   });
   
   // Example 1: Single tool call (recreating official OpenAI example)
   console.log('\\n🔧 Example 1: Single Tool Call (Official OpenAI Pattern)');
   console.log('--------------------------------------------------------');
   
   try {
      const response1 = await chatDriver.getModelResponse(
         'You are a helpful assistant that can provide horoscope information.',
         'What is my horoscope? I am an Aquarius.',
         EVerbosity.kMedium,
         undefined, // messageHistory
         tools
      );
      
      console.log('User: What is my horoscope? I am an Aquarius.');
      console.log('Assistant:', response1);
   } catch (error) {
      console.error('Error in Example 1:', error);
   }
   
   // Example 2: Multiple tool calls in one interaction
   console.log('\\n🔧 Example 2: Multiple Tool Calls');
   console.log('----------------------------------');
   
   try {
      const response2 = await chatDriver.getModelResponseWithForcedTools(
         'You are a helpful assistant with access to weather and horoscope data. Use the appropriate tools to answer user questions.',
         'I am an Aquarius planning a trip to London and Paris. Can you give me my horoscope and the weather for both cities?',
         EVerbosity.kMedium,
         undefined, // messageHistory
         tools
      );
      
      console.log('User: I am an Aquarius planning a trip to London and Paris. Can you give me my horoscope and the weather for both cities?');
      console.log('Assistant:', response2);
   } catch (error) {
      console.error('Error in Example 2:', error);
   }
   
   // Example 3: Streaming with multiple tool calls
   console.log('\\n🔧 Example 3: Streaming Multiple Tool Calls');
   console.log('--------------------------------------------');
   
   try {
      console.log('User: What\\'s the weather like in Tokyo and New York?');
      console.log('Assistant: ', { end: '' });
      
      const iterator = chatDriver.getStreamedModelResponseWithForcedTools(
         'You are a weather assistant. Use the get_weather function to provide current weather information.',
         'What\\'s the weather like in Tokyo and New York?',
         EVerbosity.kMedium,
         undefined, // messageHistory
         [createWeatherFunction()] // Only weather function for this example
      );
      
      for await (const chunk of iterator) {
         process.stdout.write(chunk);
      }
      console.log(''); // New line after streaming
   } catch (error) {
      console.error('Error in Example 3:', error);
   }
   
   console.log('\\n✅ Multiple Tool Calling Example Complete');
   console.log('==========================================');
}

/**
 * Example showing the input_list pattern (following official OpenAI example)
 */
async function demonstrateInputListPattern() {
   console.log('\\n📝 Input List Pattern Demonstration');
   console.log('===================================');
   
   // This demonstrates the conceptual flow that happens internally
   // Following the official OpenAI Responses API example structure
   
   console.log('1. Initial input_list:');
   const inputList = [
      { role: 'user', content: 'What is my horoscope? I am an Aquarius.' }
   ];
   console.log(JSON.stringify(inputList, null, 2));
   
   console.log('\\n2. Model responds with function_call:');
   const mockResponse = {
      output: [
         {
            type: 'function_call',
            name: 'get_horoscope',
            arguments: JSON.stringify({ sign: 'Aquarius' }),
            call_id: 'call_123'
         }
      ]
   };
   console.log(JSON.stringify(mockResponse, null, 2));
   
   console.log('\\n3. Execute function and add result to input_list:');
   const functionResult = { horoscope: 'Aquarius Next Tuesday you will befriend a baby otter.', sign: 'Aquarius' };
   inputList.push({
      type: 'function_call_output',
      call_id: 'call_123',
      output: JSON.stringify(functionResult)
   } as any);
   console.log(JSON.stringify(inputList, null, 2));
   
   console.log('\\n4. Model provides final response using function results');
   console.log('   "Based on your horoscope, as an Aquarius, next Tuesday you will befriend a baby otter!"');
}

// Run the examples
if (require.main === module) {
   runMultipleToolCallingExample()
      .then(() => demonstrateInputListPattern())
      .catch(error => {
         console.error('Example failed:', error);
         process.exit(1);
      });
}

export { 
   createHoroscopeFunction, 
   createWeatherFunction, 
   runMultipleToolCallingExample, 
   demonstrateInputListPattern 
};
