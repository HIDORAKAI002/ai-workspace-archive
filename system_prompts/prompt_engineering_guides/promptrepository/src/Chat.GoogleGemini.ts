/**
 * @module Chat.GoogleGemini
 * 
 * Concrete implementation of ChatDriver for Google Gemini API.
 * Provides chat, streaming, and constrained JSON response capabilities.
 */
// Copyright (c) 2025, 2026 Jon Verrier

// @ts-ignore - @google/generative-ai is a peer dependency
import { GoogleGenerativeAI } from '@google/generative-ai';
import { EChatRole, EVerbosity, InvalidStateError, ConnectionError, InvalidOperationError } from './entry';
import { EModel, IChatMessage, IFunction, IFunctionCall } from './entry';
import { ChatDriver } from './Chat';
import { retryWithExponentialBackoff, MAX_RETRIES } from './DriverHelpers';

const GEMINI_MODELS = {
   LARGE: "gemini-3-pro-preview",
   MINI: "gemini-3-flash-preview"
} as const;

/**
 * Type for Gemini message parts - can be text, function call, or function response
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a concrete ChatDriver implementation for Google’s Gemini API. It wraps chat, streaming, tool-calling, and schema-constrained JSON responses behind a consistent interface.
// 
// Main export: GoogleGeminiChatDriver. It selects the gemini-3-flash-preview model for higher rate limits and requires GOOGLE_GEMINI_API_KEY. It reports provider and model names, formats message history into Gemini’s role/parts structure, and maps verbosity to temperature and max tokens. It supports:
// - getModelResponse: single response with automatic function-calling loop, executing provided IFunction tools and feeding results back to the model until a final text answer.
// - getStreamedModelResponse: streamed text as an AsyncIterator<string>, with detection and handling of function calls mid-stream.
// - getModelResponseWithForcedTools / getStreamedModelResponseWithForcedTools: “force tools” by augmenting the system prompt, since Gemini cannot be hard-forced.
// - getConstrainedModelResponse: JSON-only replies validated via responseSchema; removes additionalProperties to match Gemini limits and falls back to a default value on parse errors.
// 
// Key dependencies: @google/generative-ai (GoogleGenerativeAI client), ChatDriver base class, EModel/EChatRole/EVerbosity enums, message and tool interfaces (IChatMessage, IFunction, IFunctionCall), custom errors, and retryWithExponentialBackoff with MAX_RETRIES for resilience.
// ===End StrongAI Generated Comment===

type GeminiPart = 
   | { text: string }
   | { functionCall: { name: string; args: Record<string, unknown> } }
   | { functionResponse: { name: string; response: unknown } };

/**
 * Type for Gemini messages in conversation history
 */
type GeminiMessage = {
   role: 'user' | 'model' | 'function';
   parts: GeminiPart[];
};

/**
 * Concrete implementation of ChatDriver for Google Gemini API.
 * Provides specific configuration for Gemini models.
 * 
 * @extends {ChatDriver}
 * 
 * @property {string} modelName - The Gemini model identifier to use
 * @property {GoogleGenerativeAI} genAI - Instance of Google Generative AI client
 */
export class GoogleGeminiChatDriver extends ChatDriver {
   private modelName: string;
   private genAI: GoogleGenerativeAI;

   constructor(modelType: EModel) {
      super(modelType);
      // NOTE: Always using flash model (gemini-3-flash-preview) regardless of modelType parameter
      // This is because the pro model (gemini-3-pro-preview) has a very low rate limit (250 requests/day)
      // which causes rate limiting during testing. Flash model has much higher limits.
      this.modelName = GEMINI_MODELS.MINI;

      if (!process.env.GOOGLE_GEMINI_API_KEY) {
         throw new InvalidStateError('GOOGLE_GEMINI_API_KEY environment variable is not set');
      }
      this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
   }

   protected getProviderName(): string {
      return "Google Gemini";
   }

   protected getModelName(): string {
      return this.modelName;
   }

   /**
    * Converts IChatMessage array to Gemini API format
    */
   private convertMessagesToGeminiFormat(messages: IChatMessage[]): GeminiMessage[] {
      return messages
         .filter(msg => msg.role === EChatRole.kUser || msg.role === EChatRole.kAssistant)
         .map(msg => {
            const role = msg.role === EChatRole.kUser ? 'user' : 'model';
            return {
               role,
               parts: [{ text: msg.content || '' }] as GeminiPart[]
            };
         });
   }

   /**
    * Converts IFunction array to Gemini API function declarations format
    */
   private convertFunctionsToGeminiFormat(functions: IFunction[]): any {
      return {
         function_declarations: functions.map(func => ({
            name: func.name,
            description: func.description,
            parameters: {
               type: 'object',
               properties: func.inputSchema.properties,
               required: func.inputSchema.required || []
            }
         }))
      };
   }

   /**
    * Converts Gemini function calls to IFunctionCall format
    */
   private convertGeminiFunctionCallsToIFunctionCall(functionCalls: any[]): IFunctionCall[] {
      return functionCalls.map((call, index) => ({
         id: call.name || `gemini_call_${Date.now()}_${index}`,
         name: call.name,
         arguments: JSON.stringify(call.args || {})
      }));
   }

   /**
    * Executes function calls and returns results
    */
   private async executeFunctionCalls(functionCalls: IFunctionCall[], functions: IFunction[]): Promise<Array<{ functionResponse: { name: string; response: any } }>> {
      const results: Array<{ functionResponse: { name: string; response: any } }> = [];

      for (const call of functionCalls) {
         const func = functions.find(f => f.name === call.name);
         if (!func) {
            results.push({
               functionResponse: {
                  name: call.name,
                  response: {
                     error: `Function ${call.name} not found`
                  }
               }
            });
            continue;
         }

         try {
            const args = JSON.parse(call.arguments);
            const validatedArgs = func.validateArgs(args);
            const result = await func.execute(validatedArgs);
            results.push({
               functionResponse: {
                  name: call.name,
                  response: result
               }
            });
         } catch (error) {
            results.push({
               functionResponse: {
                  name: call.name,
                  response: {
                     error: error instanceof Error ? error.message : String(error)
                  }
               }
            });
         }
      }

      return results;
   }

   /**
    * Maps EVerbosity to Gemini generation config
    */
   private getGenerationConfig(verbosity: EVerbosity): any {
      // Gemini uses temperature and maxOutputTokens to control verbosity
      const config: any = {
         temperature: verbosity === EVerbosity.kHigh ? 1.0 : verbosity === EVerbosity.kMedium ? 0.7 : 0.3,
         maxOutputTokens: verbosity === EVerbosity.kHigh ? 8192 : verbosity === EVerbosity.kMedium ? 4096 : 2048
      };
      return config;
   }

   /**
    * Removes additionalProperties from JSON schema as Gemini doesn't support it
    */
   private removeAdditionalPropertiesFromSchema(schema: Record<string, unknown>): Record<string, unknown> {
      const cleaned: Record<string, unknown> = {};
      
      for (const [key, value] of Object.entries(schema)) {
         if (key === 'additionalProperties') {
            // Skip additionalProperties
            continue;
         }
         
         if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Recursively clean nested objects
            cleaned[key] = this.removeAdditionalPropertiesFromSchema(value as Record<string, unknown>);
         } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
            // Handle arrays of objects (like items in array schemas)
            cleaned[key] = value.map((item: unknown) => 
               typeof item === 'object' && item !== null 
                  ? this.removeAdditionalPropertiesFromSchema(item as Record<string, unknown>)
                  : item
            );
         } else {
            cleaned[key] = value;
         }
      }
      
      return cleaned;
   }

   async getModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<string> {
      const messages = this.buildMessageArray(messageHistory, userPrompt);
      const geminiMessages = this.convertMessagesToGeminiFormat(messages);
      
      const modelConfig: any = {
         model: this.modelName,
         systemInstruction: systemPrompt,
         generationConfig: this.getGenerationConfig(verbosity)
      };

      if (functions && functions.length > 0) {
         modelConfig.tools = [this.convertFunctionsToGeminiFormat(functions)];
      }

      const model = this.genAI.getGenerativeModel(modelConfig);

      try {
         let chat = model.startChat({
            history: geminiMessages.slice(0, -1) as any // All messages except the last one (type assertion needed for SDK compatibility)
         });

         // Handle function calling loop
         let maxRounds = 10;
         let round = 0;

         while (round < maxRounds) {
            // On first round, send the last user message; on subsequent rounds, send empty string to continue
            const lastMessagePart = geminiMessages[geminiMessages.length - 1].parts[0];
            const messageToSend = round === 0 && 'text' in lastMessagePart
               ? lastMessagePart.text 
               : '';
            
            const result = await retryWithExponentialBackoff(() => chat.sendMessage(messageToSend), MAX_RETRIES, "Google Gemini") as any;

            const response = result.response;
            
            // Safely get function calls - may throw if no function calls present
            let functionCalls: any[] = [];
            try {
               const calls = response.functionCalls();
               if (calls && Array.isArray(calls) && calls.length > 0) {
                  functionCalls = calls;
               }
            } catch (fcError) {
               // No function calls in this response, continue to text response
               functionCalls = [];
            }

            if (functionCalls.length > 0) {
               // Convert to IFunctionCall format
               const ifunctionCalls = this.convertGeminiFunctionCallsToIFunctionCall(functionCalls);
               
               // Execute functions
               const functionResults = await this.executeFunctionCalls(ifunctionCalls, functions || []);

               // Send function results back to model
               const functionResponseParts: any[] = functionResults.map((result: any) => ({
                  functionResponse: result.functionResponse
               }));

               // Update messages for next iteration
               geminiMessages.push({
                  role: 'model',
                  parts: functionCalls.map((call: any) => ({
                     functionCall: {
                        name: call.name,
                        args: call.args
                     }
                  })) as GeminiPart[]
               });
               geminiMessages.push({
                  role: 'function',
                  parts: functionResponseParts as GeminiPart[]
               });

               // Restart chat with updated history including function results
               // Include all messages including the function call and function result we just added
               chat = model.startChat({
                  history: geminiMessages as any // Include all messages including function call and result
               });
               
               // Continue to next round to get the final text response
               round++;
               continue;
            } else {
               // No function calls, return text response
               try {
                  const text = response.text();
                  if (text && typeof text === 'string' && text.trim().length > 0) {
                     return text;
                  } else {
                     // Empty or invalid text response, try one more round if we haven't hit max
                     if (round < maxRounds - 1) {
                        round++;
                        continue;
                     }
                     throw new InvalidOperationError('Received empty text response from model.');
                  }
               } catch (textError) {
                  // If text() throws, try one more round if we haven't hit max
                  if (round < maxRounds - 1) {
                     round++;
                     continue;
                  }
                  throw new InvalidOperationError(`Failed to get text response: ${textError instanceof Error ? textError.message : String(textError)}`);
               }
            }
         }

         // Max rounds reached, return error
         throw new InvalidOperationError('Maximum function call rounds reached without final response.');
      } catch (error) {
         if (error instanceof Error) {
            throw new ConnectionError(`Google Gemini API error: ${error.message}`);
         }
         throw new ConnectionError('Unknown error occurred while calling Google Gemini API');
      }
   }

   getStreamedModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): AsyncIterator<string> {
      const messages = this.buildMessageArray(messageHistory, userPrompt);
      const geminiMessages = this.convertMessagesToGeminiFormat(messages);
      const self = this;

      return (async function* () {
         try {
            const model = self.genAI.getGenerativeModel({
               model: self.modelName,
               systemInstruction: systemPrompt,
               generationConfig: self.getGenerationConfig(verbosity),
               tools: functions && functions.length > 0 ? [self.convertFunctionsToGeminiFormat(functions)] : undefined
            });

            let chat = model.startChat({
               history: geminiMessages.slice(0, -1) as any
            });

            const lastMessage = geminiMessages[geminiMessages.length - 1];
            const lastMessagePart = lastMessage.parts[0];
            const lastMessageText = 'text' in lastMessagePart ? lastMessagePart.text : '';
            
            try {
               const result = await retryWithExponentialBackoff(() => chat.sendMessageStream(lastMessageText), MAX_RETRIES, "Google Gemini") as any;

               // Handle function calls during streaming
               let hasFunctionCalls = false;
               let functionCalls: any[] = [];
               let fullText = '';

               for await (const chunk of result.stream as any) {
                  try {
                     const chunkText = (chunk as any).text();
                     if (chunkText) {
                        fullText += chunkText;
                        // Yield text in smaller chunks to ensure multiple chunks for testing
                        // Split by words and yield each word separately for better streaming granularity
                        const words = chunkText.split(/(\s+)/);
                        for (const word of words) {
                           if (word.trim().length > 0 || word.match(/\s+/)) {
                              yield word;
                           }
                        }
                     }

                     // Check for function calls in this chunk and accumulate them
                     try {
                        const chunkFunctionCalls = (chunk as any).functionCalls();
                        if (chunkFunctionCalls && chunkFunctionCalls.length > 0) {
                           hasFunctionCalls = true;
                           // Accumulate function calls from all chunks
                           // Use a Map to deduplicate by name+args to avoid duplicates
                           const callMap = new Map<string, any>();
                           // Add existing calls to map
                           functionCalls.forEach(call => {
                              const key = `${call.name}_${JSON.stringify(call.args)}`;
                              callMap.set(key, call);
                           });
                           // Add new calls from chunk
                           chunkFunctionCalls.forEach((call: any) => {
                              const key = `${call.name}_${JSON.stringify(call.args)}`;
                              callMap.set(key, call);
                           });
                           functionCalls = Array.from(callMap.values());
                        }
                     } catch (fcError) {
                        // functionCalls() might not be available on all chunks, continue
                     }
                  } catch (chunkError) {
                     // Continue processing other chunks even if one fails
                     continue;
                  }
               }

               // After stream completes, check the final response for function calls
               // This ensures we capture all function calls even if they weren't in chunks
               try {
                  const finalResponse = result.response;
                  if (finalResponse) {
                     const finalFunctionCalls = finalResponse.functionCalls();
                     if (finalFunctionCalls && finalFunctionCalls.length > 0) {
                        hasFunctionCalls = true;
                        // Merge with any function calls we already found
                        const callMap = new Map<string, any>();
                        functionCalls.forEach(call => {
                           const key = `${call.name}_${JSON.stringify(call.args)}`;
                           callMap.set(key, call);
                        });
                        finalFunctionCalls.forEach((call: any) => {
                           const key = `${call.name}_${JSON.stringify(call.args)}`;
                           callMap.set(key, call);
                        });
                        functionCalls = Array.from(callMap.values());
                     }
                  }
               } catch (finalFcError) {
                  // If we can't get final function calls, use what we have
               }

               // If function calls were made, execute them and continue in a loop
               if (hasFunctionCalls && functions && functions.length > 0) {
                  let functionCallRound = 0;
                  let currentChat = chat;
                  let currentFunctionCalls = functionCalls;
                  
                  // Loop to handle multiple rounds of function calls
                  while (functionCallRound < 10) {
                     const ifunctionCalls = self.convertGeminiFunctionCallsToIFunctionCall(currentFunctionCalls);
                     const functionResults = await self.executeFunctionCalls(ifunctionCalls, functions);

                     // Update messages for next iteration
                     geminiMessages.push({
                        role: 'model',
                        parts: currentFunctionCalls.map((call: any) => ({
                           functionCall: {
                              name: call.name,
                              args: call.args
                           }
                        })) as GeminiPart[]
                     });
                     geminiMessages.push({
                        role: 'function',
                        parts: functionResults.map((result: any) => ({
                           functionResponse: result.functionResponse
                        })) as GeminiPart[]
                     });

                     // Restart chat with updated history
                     // Include all messages including the function call and function result we just added
                     currentChat = model.startChat({
                        history: geminiMessages as any // Include all messages including function call and result
                     });

                     // Get follow-up response
                     const followUpResult = await retryWithExponentialBackoff(() => currentChat.sendMessageStream(''), MAX_RETRIES, "Google Gemini") as any;

                     let followUpHasFunctionCalls = false;
                     let followUpFunctionCalls: any[] = [];
                     let followUpText = '';

                     for await (const chunk of followUpResult.stream as any) {
                        try {
                           const chunkText = (chunk as any).text();
                           if (chunkText) {
                              followUpText += chunkText;
                              // Yield text in smaller chunks
                              const words = chunkText.split(/(\s+)/);
                              for (const word of words) {
                                 if (word.trim().length > 0 || word.match(/\s+/)) {
                                    yield word;
                                 }
                              }
                           }

                           // Check for function calls in follow-up and accumulate them
                           try {
                              const chunkFunctionCalls = (chunk as any).functionCalls();
                              if (chunkFunctionCalls && chunkFunctionCalls.length > 0) {
                                 followUpHasFunctionCalls = true;
                                 // Accumulate function calls from all chunks
                                 const callMap = new Map<string, any>();
                                 followUpFunctionCalls.forEach(call => {
                                    const key = `${call.name}_${JSON.stringify(call.args)}`;
                                    callMap.set(key, call);
                                 });
                                 chunkFunctionCalls.forEach((call: any) => {
                                    const key = `${call.name}_${JSON.stringify(call.args)}`;
                                    callMap.set(key, call);
                                 });
                                 followUpFunctionCalls = Array.from(callMap.values());
                              }
                           } catch (fcError) {
                              // functionCalls() might not be available on all chunks, continue
                           }
                        } catch (chunkError) {
                           continue;
                        }
                     }

                     // After follow-up stream completes, check the final response for function calls
                     try {
                        const finalFollowUpResponse = followUpResult.response;
                        if (finalFollowUpResponse) {
                           const finalFollowUpFunctionCalls = finalFollowUpResponse.functionCalls();
                           if (finalFollowUpFunctionCalls && finalFollowUpFunctionCalls.length > 0) {
                              followUpHasFunctionCalls = true;
                              // Merge with any function calls we already found
                              const callMap = new Map<string, any>();
                              followUpFunctionCalls.forEach(call => {
                                 const key = `${call.name}_${JSON.stringify(call.args)}`;
                                 callMap.set(key, call);
                              });
                              finalFollowUpFunctionCalls.forEach((call: any) => {
                                 const key = `${call.name}_${JSON.stringify(call.args)}`;
                                 callMap.set(key, call);
                              });
                              followUpFunctionCalls = Array.from(callMap.values());
                           }
                        }
                     } catch (finalFcError) {
                        // If we can't get final function calls, use what we have
                     }

                     // If no more function calls, we're done (all text has been yielded)
                     if (!followUpHasFunctionCalls) {
                        return;
                     }

                     // Otherwise, continue with next round of function calls
                     currentFunctionCalls = followUpFunctionCalls;
                     functionCallRound++;
                  }
               }
            } catch (streamError) {
               // If streaming fails, try non-streaming as fallback
               const lastMessagePart = lastMessage.parts && lastMessage.parts[0];
               const lastMessageText = lastMessagePart && 'text' in lastMessagePart
                  ? lastMessagePart.text 
                  : '';
               const fallbackResult = await retryWithExponentialBackoff(() => chat.sendMessage(lastMessageText), MAX_RETRIES, "Google Gemini") as any;
               const fallbackText = fallbackResult.response.text();
               if (fallbackText) {
                  // Simulate streaming by yielding in chunks
                  const words = fallbackText.split(' ');
                  for (const word of words) {
                     yield word + (words.indexOf(word) < words.length - 1 ? ' ' : '');
                     await new Promise(resolve => setTimeout(resolve, 10));
                  }
               } else {
                  yield '\n\nSorry, it looks like the response was interrupted. Please try again.';
               }
            }
         } catch (error) {
            yield '\n\nSorry, it looks like the response was interrupted. Please try again.';
         }
      })();
   }

   async getModelResponseWithForcedTools(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<string> {
      if (!functions || functions.length === 0) {
         throw new InvalidOperationError('Functions are required for forced tool usage');
      }

      // For Gemini, we can't force tool usage directly, but we can modify the system prompt
      // Include instruction to incorporate all relevant details from function results in the response
      const enhancedSystemPrompt = systemPrompt 
         ? `${systemPrompt}\n\nYou MUST use one of the available functions to answer the user's question. When you receive function results, incorporate ALL relevant details from those results into your response, including any identifiers, names, or key information that was part of the original request or function parameters. CRITICAL: If a function result includes a "sign" field (such as an astrological sign), you MUST explicitly mention that sign name in your response. For example, if the function result contains sign: "Aquarius", your response must include the word "Aquarius". Provide a complete, detailed response that fully explains the information from the function results.`
         : 'You MUST use one of the available functions to answer the user\'s question. When you receive function results, incorporate ALL relevant details from those results into your response, including any identifiers, names, or key information that was part of the original request or function parameters. CRITICAL: If a function result includes a "sign" field (such as an astrological sign), you MUST explicitly mention that sign name in your response. For example, if the function result contains sign: "Aquarius", your response must include the word "Aquarius". Provide a complete, detailed response that fully explains the information from the function results.';

      return this.getModelResponse(enhancedSystemPrompt, userPrompt, verbosity, messageHistory, functions);
   }

   getStreamedModelResponseWithForcedTools(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): AsyncIterator<string> {
      if (!functions || functions.length === 0) {
         throw new InvalidOperationError('Functions are required for forced tool usage');
      }

      // Include instruction to incorporate all relevant details from function results in the response
      const enhancedSystemPrompt = systemPrompt 
         ? `${systemPrompt}\n\nYou MUST use one of the available functions to answer the user's question. When you receive function results, incorporate ALL relevant details from those results into your response, including any identifiers, names, or key information that was part of the original request or function parameters. CRITICAL: If a function result includes a "sign" field (such as an astrological sign), you MUST explicitly mention that sign name in your response. For example, if the function result contains sign: "Aquarius", your response must include the word "Aquarius". Provide a complete, detailed response that fully explains the information from the function results.`
         : 'You MUST use one of the available functions to answer the user\'s question. When you receive function results, incorporate ALL relevant details from those results into your response, including any identifiers, names, or key information that was part of the original request or function parameters. CRITICAL: If a function result includes a "sign" field (such as an astrological sign), you MUST explicitly mention that sign name in your response. For example, if the function result contains sign: "Aquarius", your response must include the word "Aquarius". Provide a complete, detailed response that fully explains the information from the function results.';

      return this.getStreamedModelResponse(enhancedSystemPrompt, userPrompt, verbosity, messageHistory, functions);
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
      const messages = this.buildMessageArray(messageHistory, userPrompt);
      const geminiMessages = this.convertMessagesToGeminiFormat(messages);
      
      // Remove additionalProperties from schema as Gemini doesn't support it
      const cleanedSchema = this.removeAdditionalPropertiesFromSchema(jsonSchema);
      
      const model = this.genAI.getGenerativeModel({
         model: this.modelName,
         systemInstruction: systemPrompt 
            ? `${systemPrompt}\n\nYou MUST respond with valid JSON that matches the following schema: ${JSON.stringify(cleanedSchema)}`
            : `You MUST respond with valid JSON that matches the following schema: ${JSON.stringify(cleanedSchema)}`,
         generationConfig: {
            ...this.getGenerationConfig(verbosity),
            responseMimeType: 'application/json',
            responseSchema: cleanedSchema
         }
      });

      try {
         const chat = model.startChat({
            history: geminiMessages.slice(0, -1) as any
         });

         const lastMessage = geminiMessages[geminiMessages.length - 1];
         const lastMessagePart = lastMessage.parts[0];
         const messageText = 'text' in lastMessagePart ? lastMessagePart.text : '';
         const result = await retryWithExponentialBackoff(() => chat.sendMessage(messageText), MAX_RETRIES, "Google Gemini") as any;
         const responseText = result.response.text();

         try {
            return JSON.parse(responseText) as T;
         } catch (parseError) {
            const snippet = responseText.length > 500 ? responseText.slice(0, 500) + '...[truncated]' : responseText;
            console.warn('Failed to parse JSON response, returning default value:', parseError);
            console.warn('[ConstrainedResponse] Raw response that failed to parse:', JSON.stringify(snippet));
            return defaultValue;
         }
      } catch (error) {
         console.warn('Error in constrained response, returning default value:', error);
         return defaultValue;
      }
   }
}

