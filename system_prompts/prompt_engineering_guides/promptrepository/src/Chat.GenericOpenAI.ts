/**
 * @module Chat.GenericOpenAI
 * 
 * Generic base functionality for interacting with OpenAI-compatible APIs.
 * This includes both native OpenAI and Azure OpenAI implementations.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import OpenAI from 'openai';
import { EChatRole, EVerbosity, ConnectionError, InvalidOperationError } from './entry';
import { IChatDriver, EModel, IChatMessage, IFunction, ILLMFunctionCall, IFunctionCallOutput, IFunctionCall } from './entry';
import { retryWithExponentialBackoff, MAX_RETRIES } from './DriverHelpers';
import { ChatDriver } from './Chat';

/**
 * OpenAI-specific tool call interface
 * Used internally for OpenAI API communication
 */

// ===Start StrongAI Generated Comment (20260219)===
// Provides a shared base for OpenAI‑compatible chat drivers (OpenAI and Azure OpenAI) using the Responses API. It centralizes auth, request shaping, tool/function calling, streaming, constrained JSON output, and robust retry/error handling.
// 
// Main export: GenericOpenAIChatDriver, an abstract class extending ChatDriver. Key methods:
// - createResponseConfig and createResponsesInputConfig build Responses API payloads, including verbosity mapping and GPT‑5 reasoning effort.
// - convertMessagesToInputList adapts history to input_list format.
// - handleFunctionCall, processToolCalls, and processOpenAIToolCalls execute registered functions, validate args, and return function_call_output items.
// - extractTextFromOutput normalizes text extraction from varied output shapes.
// - handleToolUseLoop and handleToolUseLoopWithForcedTools manage multi‑tool flows; the latter encourages parallel tool calls.
// - getModelResponse and getModelResponseWithForcedTools perform non‑streaming calls with retries.
// - getStreamedModelResponse and getStreamedModelResponseWithForcedTools provide streaming or simulated chunking.
// - getConstrainedModelResponse enforces a JSON schema and handles parsing fallbacks.
// - handleToolUseWithResponsesAPI follows the official loop for function_call and function_call_output.
// 
// Relies on:
// - OpenAI SDK for responses.create.
// - Enums/interfaces and errors from ./entry (EChatRole, EVerbosity, IChatMessage, IFunction, IFunctionCall, EModel, ConnectionError, InvalidOperationError).
// - retryWithExponentialBackoff and MAX_RETRIES from DriverHelpers.
// ===End StrongAI Generated Comment===

interface IOpenAIToolCall {
   id: string;
   type: 'function';
   function: {
      name: string;
      arguments: string;
   };
}

interface AsyncResponse {
   [Symbol.asyncIterator](): AsyncIterator<any>;
}

/**
 * Converts generic tool calls to OpenAI-specific format
 */
function convertToOpenAIToolCalls(functionCalls: IFunctionCall[]): IOpenAIToolCall[] {
   return functionCalls.map(call => ({
      id: call.id, // ID is now required in IFunctionCall
      type: 'function' as const,
      function: {
         name: call.name,
         arguments: call.arguments
      }
   }));
}

/**
 * Converts OpenAI-specific tool calls to generic format
 */
function convertFromOpenAIToolCalls(openAIToolCalls: IOpenAIToolCall[]): IFunctionCall[] {
   return openAIToolCalls.map(call => ({
      id: call.id,
      name: call.function.name,
      arguments: call.function.arguments
   }));
}

/**
 * Determines if an error is a content filter/moderation error.
 * @param error - The error to check
 * @returns True if the error is a content filter error, false otherwise
 */
function isContentFilterError(error: any): boolean {
   return error instanceof InvalidOperationError &&
          error.message?.toLowerCase().includes('content filter');
}

/**
 * Abstract base class for OpenAI-compatible model drivers.
 * Provides common functionality for interacting with OpenAI's Responses API
 * including authentication, error handling, and function calling.
 * 
 * @extends {ChatDriver}
 * @abstract
 * 
 * @property {OpenAI} openai - Instance of OpenAI API client
 */
export abstract class GenericOpenAIChatDriver extends ChatDriver {
   protected openai!: OpenAI;

   constructor(modelType: EModel) {
      super(modelType);
   }

   protected shouldUseToolMessages(): boolean {
      // Default implementation - subclasses can override
      return false;
   }

   /**
    * Returns the provider name for error messages
    * Subclasses should override to return their specific provider name
    */
   protected getProviderName(): string {
      return "OpenAI";
   }

   protected createResponseConfig(
      systemPrompt: string | undefined,
      messages: IChatMessage[],
      verbosity: EVerbosity,
      functions?: IFunction[],
      useToolMessages?: boolean,
      forceToolUse?: boolean
   ): any {
      const filteredMessages = messages.filter(msg => msg.role !== EChatRole.kFunction);
      const formattedMessages = filteredMessages.map(msg => {
         // Handle function_call_output messages (Responses API format)
         if ((msg as any).type === "function_call_output") {
            return {
               type: "function_call_output",
               call_id: (msg as any).call_id,
               output: (msg as any).output
            };
         }

         const isAssistantWithFunctionCall = msg.role === EChatRole.kAssistant && msg.function_call;
         const isAssistantWithToolCalls = msg.role === EChatRole.kAssistant && msg.tool_calls;
         const baseMessage: any = {
            role: msg.role === EChatRole.kUser ? 'user' :
               msg.role === EChatRole.kAssistant ? 'assistant' :
                  msg.role === EChatRole.kFunction ? 'function' :
                     msg.role === EChatRole.kTool ? 'tool' : 'user',
            content: (isAssistantWithFunctionCall || isAssistantWithToolCalls) ? '' : (msg.content || '')
         };

         // Add tool_calls for assistant messages with tool calls (Responses API format)
         if (isAssistantWithToolCalls && msg.tool_calls) {
            baseMessage.tool_calls = convertToOpenAIToolCalls(msg.tool_calls);
         }

         // Add name property for function messages
         if (msg.role === EChatRole.kFunction && msg.name) {
            baseMessage.name = msg.name;
         }

         // Add tool_call_id for tool messages (required by Responses API)
         if (msg.role === EChatRole.kTool && msg.tool_call_id) {
            baseMessage.tool_call_id = msg.tool_call_id;
         }

         return baseMessage;
      });

      // Map EVerbosity enum to Responses API verbosity values
      // Note: Azure GPT-4.1 only supports 'medium', so we map high to medium for Azure
      const currentModelName = this.getModelName();
      const isAzureModel = currentModelName.startsWith('gpt-4.1');

      const verbosityMap: Record<EVerbosity, string> = {
         [EVerbosity.kLow]: isAzureModel ? 'medium' : 'low',
         [EVerbosity.kMedium]: 'medium',
         [EVerbosity.kHigh]: isAzureModel ? 'medium' : 'high'
      };

      // Map EVerbosity to thinking time (one level below verbosity)
      const thinkingTimeMap: Record<EVerbosity, string> = {
         [EVerbosity.kLow]: 'low',      // Low verbosity -> low thinking
         [EVerbosity.kMedium]: 'low',   // Medium verbosity -> low thinking  
         [EVerbosity.kHigh]: 'medium'   // High verbosity -> medium thinking
      };

      // Build messages array with system prompt if provided
      const allMessages = systemPrompt
         ? [{ role: 'system', content: systemPrompt }, ...formattedMessages]
         : formattedMessages;

      // For Responses API, we use a different structure
      const config: any = {
         model: this.getModelName(),
         input: allMessages,
         text: {
            verbosity: verbosityMap[verbosity] // Add verbosity parameter for GPT-5
         }
      };

      // Add thinking time for GPT-5 models (one level below verbosity)
      const modelName = this.getModelName();
      if (modelName.startsWith('gpt-5')) {
         config.reasoning = {
            effort: thinkingTimeMap[verbosity]
         };
      }

      // Add functions to the configuration if provided
      if (functions && functions.length > 0) {
         config.tools = functions.map(func => {
            // Try a flatter structure that might work better with Responses API
            const tool = {
               type: 'function',
               name: func.name,
               description: func.description,
               parameters: {
                  type: 'object',
                  properties: func.inputSchema.properties,
                  required: func.inputSchema.required,
                  additionalProperties: false
               }
            };
            // Schema is correctly formatted for Responses API
            return tool;
         });
         // Configure tool choice - only force tools when explicitly requested
         config.tool_choice = forceToolUse ? "required" : "auto";

      }

      return config;
   }

   /**
    * Creates a Responses API configuration with proper input_list format
    * This follows the official Responses API pattern exactly
    */
   protected createResponsesInputConfig(
      systemPrompt: string | undefined,
      inputList: any[],
      verbosity: EVerbosity,
      functions?: IFunction[],
      forceToolUse?: boolean
   ): any {
      // Map EVerbosity enum to Responses API verbosity values
      const currentModelName = this.getModelName();
      const isAzureModel = currentModelName.startsWith('gpt-4.1');

      const verbosityMap: Record<EVerbosity, string> = {
         [EVerbosity.kLow]: isAzureModel ? 'medium' : 'low',
         [EVerbosity.kMedium]: 'medium',
         [EVerbosity.kHigh]: isAzureModel ? 'medium' : 'high'
      };

      const thinkingTimeMap: Record<EVerbosity, string> = {
         [EVerbosity.kLow]: 'low',
         [EVerbosity.kMedium]: 'low',
         [EVerbosity.kHigh]: 'medium'
      };

      // Build the configuration object for Responses API
      const config: any = {
         model: this.getModelName(),
         input: inputList,
         text: {
            verbosity: verbosityMap[verbosity]
         }
      };

      // Add system prompt as instructions
      if (systemPrompt) {
         config.instructions = systemPrompt;
      }

      // Add thinking time for GPT-5 models
      const modelName = this.getModelName();
      if (modelName.startsWith('gpt-5')) {
         config.reasoning = {
            effort: thinkingTimeMap[verbosity]
         };
      }

      // Add tools if provided
      if (functions && functions.length > 0) {
         config.tools = functions.map(func => ({
            type: 'function',
            name: func.name,
            description: func.description,
            parameters: {
               type: 'object',
               properties: func.inputSchema.properties,
               required: func.inputSchema.required,
               additionalProperties: false
            }
         }));

         // Force tool use if requested
         if (forceToolUse) {
            config.tool_choice = 'required';
         }
      }

      return config;
   }

   /**
    * Converts IChatMessage array to Responses API input_list format
    */
   protected convertMessagesToInputList(messages: IChatMessage[]): any[] {
      const inputList: any[] = [];

      for (const msg of messages) {
         // Handle function_call_output messages (already in correct format)
         if ((msg as any).type === "function_call_output") {
            inputList.push({
               type: "function_call_output",
               call_id: (msg as any).call_id,
               output: (msg as any).output
            });
            continue;
         }

         // Convert regular messages to Responses API format
         if (msg.role === EChatRole.kUser) {
            inputList.push({
               role: 'user',
               content: msg.content || ''
            });
         } else if (msg.role === EChatRole.kAssistant) {
            inputList.push({
               role: 'assistant',
               content: msg.content || ''
            });
         }
      }

      return inputList;
   }

   /**
    * Handles a single function call and returns the result
    */
   protected async handleFunctionCall(call: any, functions: IFunction[], toolCallId?: string): Promise<IChatMessage> {
      const functionName = call.function_call?.name || call.name;
      let functionArgs: any = {};
      let functionResult: any;

      try {
         // Parse function arguments
         try {
            const argsString = call.function_call?.arguments || call.arguments;
            functionArgs = JSON.parse(argsString);
         } catch (e) {
            functionResult = {
               error: true,
               message: `Failed to parse function call arguments: ${e instanceof Error ? e.message : String(e)}`,
               functionName: functionName,
               timestamp: new Date().toISOString()
            };
         }

         // Find the function
         const func = functions.find(f => f.name === functionName);
         if (!func) {
            functionResult = {
               error: true,
               message: `Function ${functionName} not found in provided functions`,
               functionName: functionName,
               timestamp: new Date().toISOString()
            };
         } else if (!functionResult) {
            // Validate and execute only if no previous errors occurred
            try {
               const validatedArgs = func.validateArgs(functionArgs);
               functionResult = await func.execute(validatedArgs);
            } catch (error) {
               // Set functionResult to an error string including exception details
               const errorMessage = error instanceof Error ? error.message : String(error);
               functionResult = {
                  error: true,
                  message: `Function execution failed: ${errorMessage}`,
                  functionName: functionName,
                  timestamp: new Date().toISOString()
               };
            }
         }
      } catch (error) {
         // Catch any unexpected errors
         const errorMessage = error instanceof Error ? error.message : String(error);
         functionResult = {
            error: true,
            message: `Unexpected error: ${errorMessage}`,
            functionName: functionName,
            timestamp: new Date().toISOString()
         };
      }

      // For Responses API, use function_call_output format (not assistant messages)
      // We need to satisfy IChatMessage interface while adding Responses API fields
      const message: IChatMessage & { type?: string; call_id?: string; output?: string } = {
         role: EChatRole.kAssistant, // Required by IChatMessage interface
         content: undefined, // Will be ignored due to type field
         type: "function_call_output",
         call_id: toolCallId,
         output: JSON.stringify(functionResult),
         timestamp: new Date(),
         id: `function-output-${Date.now()}`,
         className: 'function-output-message'
      };
      console.log(`[FUNCTION MESSAGE] Created function_call_output message:`, {
         type: message.type,
         call_id: message.call_id,
         output: message.output ? message.output.substring(0, 200) + (message.output.length > 200 ? '...' : '') : ''
      });
      return message;
   }

   /**
    * Processes tool calls and returns tool messages
    */
   protected async processToolCalls(toolCalls: any[], functions: IFunction[]): Promise<IChatMessage[]> {
      const toolMessages: IChatMessage[] = [];
      for (const call of toolCalls) {
         const toolMessage = await this.handleFunctionCall(call, functions, call.id);
         toolMessages.push(toolMessage);
      }
      return toolMessages;
   }

   /**
    * Processes OpenAI tool calls and returns tool messages
    */
   protected async processOpenAIToolCalls(toolCalls: any[], functions: IFunction[]): Promise<IChatMessage[]> {
      const toolMessages: IChatMessage[] = [];
      for (const call of toolCalls) {
         // Convert OpenAI tool call format to our internal format
         const convertedCall = {
            type: 'function_call',
            function_call: {
               name: call.function.name,
               arguments: call.function.arguments
            }
         };
         const toolMessage = await this.handleFunctionCall(convertedCall, functions, call.id);
         toolMessages.push(toolMessage);
      }
      return toolMessages;
   }

   /**
    * Extracts text content from response output array
    */
   protected extractTextFromOutput(outputArr: any[]): string | null {
      // Handle different possible output structures
      for (const item of outputArr) {
         if (item.type === 'text' && item.text) {
            return item.text;
         } else if (item.type === 'message' && item.content) {
            if (typeof item.content === 'string') {
               return item.content;
            } else if (Array.isArray(item.content)) {
               const textContent = item.content.find((c: any) => c.type === 'text' || c.type === 'output_text');
               if (textContent && textContent.text) {
                  return textContent.text;
               }
            }
         } else if (typeof item === 'string') {
            return item;
         } else if (item.content && typeof item.content === 'string') {
            return item.content;
         }
      }
      return null;
   }

   /**
    * Handles the tool use loop for both streaming and non-streaming responses
    */
   protected async handleToolUseLoop(
      systemPrompt: string | undefined,
      messages: IChatMessage[],
      verbosity: EVerbosity,
      functions: IFunction[] | undefined,
      createResponse: (config: any) => Promise<any>
   ): Promise<string> {
      // Use the Responses API pattern for modern tool calling support
      return this.handleToolUseWithResponsesAPI(systemPrompt, messages, verbosity, functions, false, createResponse);
   }

   /**
    * Handles the tool use loop with forced tool usage
    */
   protected async handleToolUseLoopWithForcedTools(
      systemPrompt: string | undefined,
      messages: IChatMessage[],
      verbosity: EVerbosity,
      functions: IFunction[] | undefined,
      createResponse: (config: any) => Promise<any>
   ): Promise<string> {
      // Enhance system prompt to emphasize parallel function calling for forced tools
      // This helps ensure the model makes all necessary function calls in a single response
      const enhancedSystemPrompt = systemPrompt 
         ? `${systemPrompt}\n\nCRITICAL: When multiple function calls are needed, you MUST make ALL necessary function calls in a SINGLE response. Do not wait for function results before making additional calls. Use parallel function calling to complete the entire task in one response.`
         : 'CRITICAL: When multiple function calls are needed, you MUST make ALL necessary function calls in a SINGLE response. Do not wait for function results before making additional calls. Use parallel function calling to complete the entire task in one response.';
      
      // Use the Responses API pattern for modern tool calling support
      return this.handleToolUseWithResponsesAPI(enhancedSystemPrompt, messages, verbosity, functions, true, createResponse);
   }

   async getModelResponse(systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]): Promise<string> {

      const messages = this.buildMessageArray(messageHistory, userPrompt);

      try {
         return await this.handleToolUseLoop(
            systemPrompt,
            messages,
            verbosity,
            functions,
            (config) => retryWithExponentialBackoff(() => this.openai.responses.create(config), MAX_RETRIES, this.getProviderName())
         );
      } catch (error) {
         // If error is already a ConnectionError or InvalidOperationError from retryWithExponentialBackoff, just rethrow it
         if (error instanceof ConnectionError || error instanceof InvalidOperationError) {
            throw error;
         }
         // Otherwise, wrap it with provider name
         if (error instanceof Error) {
            throw new ConnectionError(`${this.getProviderName()} API error: ${error.message}`);
         }
         throw new ConnectionError(`Unknown error occurred while calling ${this.getProviderName()} API`);
      }
   }

   async getModelResponseWithForcedTools(systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]): Promise<string> {

      const messages = this.buildMessageArray(messageHistory, userPrompt);

      try {
         return await this.handleToolUseLoopWithForcedTools(
            systemPrompt,
            messages,
            verbosity,
            functions,
            (config) => retryWithExponentialBackoff(() => this.openai.responses.create(config), MAX_RETRIES, this.getProviderName())
         );
      } catch (error) {
         // If error is already a ConnectionError or InvalidOperationError from retryWithExponentialBackoff, just rethrow it
         if (error instanceof ConnectionError || error instanceof InvalidOperationError) {
            throw error;
         }
         // Otherwise, wrap it with provider name
         if (error instanceof Error) {
            throw new ConnectionError(`${this.getProviderName()} API error: ${error.message}`);
         }
         throw new ConnectionError(`Unknown error occurred while calling ${this.getProviderName()} API`);
      }
   }

   getStreamedModelResponse(systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]): AsyncIterator<string> {

      const messages = this.buildMessageArray(messageHistory, userPrompt);
      const self = this;

      return (async function* () {
         try {
            // Try to call the API - this might return a streaming iterator for testing
            const config = self.createResponseConfig(systemPrompt, messages, verbosity, functions, false, false);
            const response = await retryWithExponentialBackoff(() => self.openai.responses.create(config), MAX_RETRIES, self.getProviderName());

            // Check if the response has an async iterator (for testing)
            if (response && typeof (response as any)[Symbol.asyncIterator] === 'function') {
               // Handle real streaming (for testing)
               try {
                  for await (const chunk of (response as any)) {
                     // Handle both test mock format and real API format
                     let content = chunk.value?.choices?.[0]?.delta?.content || chunk.choices?.[0]?.delta?.content;
                     if (content) {
                        yield content;
                     }
                  }
               } catch (streamError) {
                  // Handle mid-stream errors gracefully
                  yield '\n\nSorry, it looks like the response was interrupted. Please try again.';
               }
               return;
            }

            // Use the tool use loop to handle function calls properly, then simulate streaming
            const result = await self.handleToolUseLoop(
               systemPrompt,
               messages,
               verbosity,
               functions,
               (config) => retryWithExponentialBackoff(() => self.openai.responses.create(config), MAX_RETRIES, self.getProviderName())
            );

            // Simulate streaming by yielding the result in chunks
            const words = result.split(' ').filter(word => word.trim().length > 0);

            // If we have very few words, split by characters to ensure multiple chunks
            if (words.length <= 2) {
               const chars = result.trim();
               const chunkSize = Math.max(1, Math.floor(chars.length / 3)); // Split into ~3 chunks
               for (let i = 0; i < chars.length; i += chunkSize) {
                  const chunk = chars.slice(i, i + chunkSize);
                  yield chunk;
                  await new Promise(resolve => setTimeout(resolve, 50));
               }
            } else {
               // Normal word-by-word streaming for longer responses
               for (let i = 0; i < words.length; i++) {
                  const chunkText = i < words.length - 1 ? words[i] + ' ' : words[i];
                  yield chunkText;
                  await new Promise(resolve => setTimeout(resolve, 50));
               }
            }
         } catch (error) {
            // Handle errors gracefully
            yield '\n\nSorry, it looks like the response was interrupted. Please try again.';
         }
      })();
   }

   getStreamedModelResponseWithForcedTools(systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]): AsyncIterator<string> {

      const messages = this.buildMessageArray(messageHistory, userPrompt);
      const self = this;

      return (async function* () {
         try {
            // Use the forced tool use loop for the initial call
            const result = await self.handleToolUseLoopWithForcedTools(
               systemPrompt,
               messages,
               verbosity,
               functions,
               (config) => retryWithExponentialBackoff(() => self.openai.responses.create(config), MAX_RETRIES, self.getProviderName())
            );

            // Simulate streaming by yielding the result in chunks (1 word at a time for better granularity)
            const words = result.split(' ').filter(word => word.trim().length > 0);
            for (let i = 0; i < words.length; i++) {
               const chunkText = i < words.length - 1 ? words[i] + ' ' : words[i];
               yield chunkText;
               // Add a small delay to simulate streaming
               await new Promise(resolve => setTimeout(resolve, 50));
            }
         } catch (error) {
            // Log the actual error for debugging
            console.error('🚨 Error in getStreamedModelResponseWithForcedTools:', error);
            // Handle errors gracefully
            yield '\n\nSorry, it looks like the response was interrupted. Please try again.';
         }
      })();
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

      const config = this.createResponseConfig(systemPrompt, messages, verbosity, functions, false, false);
      // Merge the format configuration with existing text configuration
      config.text = {
         ...config.text,
         format: {
            type: "json_schema",
            name: "constrainedOutput",
            schema: jsonSchema
         }
      };

      // Note: Content filtering for Azure OpenAI Responses API is controlled at the
      // deployment/resource level, not per-request. To minimize false-positive content
      // filter triggers on workout descriptions (e.g., "devils press", "burpees") when
      // using constrained JSON schema outputs, configure content filtering settings at
      // the Azure OpenAI deployment level. Structured outputs with JSON schema constraints
      // already help reduce false positives by constraining the model's output format.

      try {
         const response = await retryWithExponentialBackoff(() =>
            this.openai.responses.create(config), MAX_RETRIES, this.getProviderName()
         );

         const content = this.extractTextFromOutput(response.output || []);
         if (content) {
            try {
               return JSON.parse(content) as T;
            } catch (parseError) {
               const snippet = content.length > 500 ? content.slice(0, 500) + '...[truncated]' : content;
               console.warn('Failed to parse JSON response, returning default value:', parseError);
               console.warn('[ConstrainedResponse] Raw response that failed to parse:', JSON.stringify(snippet));
               return defaultValue;
            }
         }
         return defaultValue;
      } catch (error) {
         // Detect and log content filter errors with full prompts for debugging
         if (isContentFilterError(error)) {
            console.error('[ContentFilter] Content moderation triggered:', {
               error: error instanceof Error ? error.message : String(error),
               systemPrompt: systemPrompt || '(none)',
               userPrompt: userPrompt
            });
         } else {
            console.warn('Error in constrained response, returning default value:', error);
         }
         return defaultValue;
      }
   }

   /**
    * Handles tool use with the exact Responses API pattern from the official OpenAI example.
    * Supports multiple tool calls in a single response and follows the input_list approach.
    * 
    * This implementation closely follows the official OpenAI example:
    * 1. Create input_list with user message
    * 2. Call responses.create() with tools defined
    * 3. Check response.output for function_call items
    * 4. Execute functions and add function_call_output items to input_list
    * 5. Call responses.create() again with updated input_list
    * 6. Repeat until no more function calls
    * 
    * @param systemPrompt Optional system prompt (added as instructions)
    * @param messages Message history to convert to input_list
    * @param verbosity Response verbosity level
    * @param functions Available functions for the model to call
    * @param forceToolUse Whether to force tool usage on first call
    * @param createResponse Function to create API response (for testing)
    * @returns Final text response after all tool executions
    */
   protected async handleToolUseWithResponsesAPI(
      systemPrompt: string | undefined,
      messages: IChatMessage[],
      verbosity: EVerbosity,
      functions?: IFunction[],
      forceToolUse?: boolean,
      createResponse: (config: any) => Promise<any> = (config) => retryWithExponentialBackoff(() => this.openai.responses.create(config), MAX_RETRIES, this.getProviderName())
   ): Promise<string> {
      // Step 1: Build initial input_list from message history (following official example)
      let inputList = this.convertMessagesToInputList(messages);

      // Tool use loop: handle multiple rounds of tool calls
      let toolUseRounds = 0;
      const MAX_TOOL_USE_ROUNDS = 10; // Increased to handle complex multi-tool scenarios
      const executedFunctions = new Set<string>(); // Track executed functions to prevent infinite loops

      while (toolUseRounds < MAX_TOOL_USE_ROUNDS) {
         // Step 2: The Responses API works differently than Chat Completions
         // It expects all function calls to happen in a single request, not across multiple rounds
         // If we already have function outputs, we should NOT continue the loop
         const hasFunctionOutputs = inputList.some((item: any) => item.type === 'function_call_output');

         if (hasFunctionOutputs) {

            // Extract the function results and return a summary
            const functionOutputs = inputList.filter((item: any) => item.type === 'function_call_output');
            const summaries = functionOutputs.map((output: any) => `Function executed: ${output.output}`);
            return `Function execution completed:\n${summaries.join('\n')}`;
         }

         const shouldIncludeTools = functions && functions.length > 0;

         const config = this.createResponsesInputConfig(
            systemPrompt,
            inputList,
            verbosity,
            shouldIncludeTools ? functions : undefined,
            forceToolUse && toolUseRounds === 0  // Only force on first round
         );

         // Add max_tool_calls to encourage multiple function calls in a single response
         // This is the key: the model should make ALL necessary calls in one response
         if (shouldIncludeTools && functions && functions.length > 0) {
            config.max_tool_calls = 10; // Allow up to 10 tool calls in a single response
         }


         // Step 3: Get response from API
         const response = await createResponse(config);

         // Step 4: Process response.output (following official example)
         const output = response.output;
         if (!output || !Array.isArray(output)) {
            return 'Sorry, we received an invalid response from the API.';
         }

         // Extract text content and function calls from output
         const textContent = this.extractTextFromOutput(output);
         const rawFunctionCalls = output.filter((item: any) => item.type === 'function_call');

         // Convert API function calls to our IFunctionCall format with proper ID assignment
         const functionCalls: IFunctionCall[] = rawFunctionCalls.map((call: any, index: number) => ({
            id: call.call_id || `generated_${Date.now()}_${index}`, // Ensure ID is always present
            name: call.name,
            arguments: call.arguments || '{}'
         }));


         // If no function calls, return the text response
         if (functionCalls.length === 0) {
            return textContent || 'Response completed successfully.';
         }

         // All function calls should use the proper multi-round execution path
         // to maintain consistent ID handling for the Responses API

         // Step 5: This should not be reached with the simplified approach above
         // But keeping the complex logic as fallback
         if (functions && functions.length > 0) {

            // Process each function call in the response
            const functionResults: Array<{ call_id: string, output: string }> = [];

            for (let i = 0; i < functionCalls.length; i++) {
               const functionCall = functionCalls[i];
               // Get function name and arguments from our standardized IFunctionCall format
               const currentFunctionName = functionCall.name;
               const functionArgs = functionCall.arguments;
               const callSignature = `${currentFunctionName}:${functionArgs}`;

               // Extract call_id from the function call - ID is now required in IFunctionCall
               const callId = functionCall.id;


               // Check for infinite loops (same function with same args called too many times)
               if (executedFunctions.has(callSignature)) {
                  functionResults.push({
                     call_id: callId,
                     output: JSON.stringify({
                        error: 'Function already executed with same parameters',
                        functionName: currentFunctionName,
                        timestamp: new Date().toISOString()
                     })
                  });
                  continue;
               }

               // Find the matching function definition
               const func = functions.find(f => f.name === currentFunctionName);
               if (!func) {
                  functionResults.push({
                     call_id: callId,
                     output: JSON.stringify({
                        error: `Function ${currentFunctionName} not found`,
                        functionName: currentFunctionName,
                        timestamp: new Date().toISOString()
                     })
                  });
                  continue;
               }

               try {
                  // Parse function arguments - handle different API response formats
                  let parsedFunctionArgs: any = {};
                  try {
                     // Use the functionArgs we extracted earlier
                     parsedFunctionArgs = JSON.parse(functionArgs);
                  } catch (parseError) {
                     functionResults.push({
                        call_id: callId,
                        output: JSON.stringify({
                           error: `Invalid JSON arguments: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
                           functionName: currentFunctionName,
                           timestamp: new Date().toISOString()
                        })
                     });
                     continue;
                  }

                  // Validate arguments using function's validation
                  const validatedArgs = func.validateArgs(parsedFunctionArgs);

                  // Execute the function
                  const functionResult = await func.execute(validatedArgs);

                  // Track this function execution
                  executedFunctions.add(callSignature);

                  // Store result for adding to input_list
                  functionResults.push({
                     call_id: callId,
                     output: JSON.stringify(functionResult)
                  });

               } catch (error) {
                  functionResults.push({
                     call_id: callId,
                     output: JSON.stringify({
                        error: error instanceof Error ? error.message : String(error),
                        functionName: currentFunctionName,
                        timestamp: new Date().toISOString()
                     })
                  });
               }
            }

            // Step 6: Add function call outputs to input_list
            // Based on the error, the Responses API doesn't accept function_calls in assistant messages
            // Let's try just adding the function outputs directly as the official example shows
            for (const result of functionResults) {
               inputList.push({
                  type: "function_call_output",
                  call_id: result.call_id,
                  output: result.output
               });
            }

         }

         toolUseRounds++;

         // After first round, don't force tool use anymore (let model decide)
         forceToolUse = false;

         // Clear executed functions tracking every few rounds to allow re-execution with different contexts
         if (toolUseRounds % 3 === 0) {
            executedFunctions.clear();
            console.log('🔄 Cleared executed functions tracking for fresh context');
         }
      }

      console.log('🛑 Max tool use rounds reached');
      return "I've reached the maximum number of tool execution rounds. The conversation may be too complex or there might be an issue with the tool calls. Please try rephrasing your request or breaking it into smaller parts.";
   }
}
