/**
 * @module entry
 * 
 * Core interfaces and types for the PromptRepository system.
 * Defines the structure of prompts, parameters, and repository interfaces
 * used throughout the application for managing and retrieving LLM prompts.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module defines the core types and interfaces for a prompt and chat system that works across multiple LLM providers. It standardizes models, providers, roles, verbosity, prompt templates, function calls, chat messages, and embedding workflows.
// 
// Key exports include enums for EModel, EModelProvider, EChatRole, and EVerbosity. It defines parameter typing via EParameterType and constants, plus IPromptParameterSpec and IPrompt for templated system and user prompts. IPromptRepository provides prompt lookup and expansion APIs. IChatMessage models unified chat history with tool and function call metadata. IChatDriver specifies methods for simple, streamed, forced-tool, and schema-constrained responses. Factory interfaces create chat and attachment-enabled drivers. IEmbeddingModelDriver and IEmbeddingDriverFactory cover embeddings. Chunk types (IChunk, IChunkStore) support vectorized content storage. Utility exports include cosine similarity, formatting helpers, and common validation functions.
// 
// Important dependencies: IFunction and related types power tool calling. IChatWithAttachmentDriver enables multimodal inputs. Concrete factories and drivers are re-exported for OpenAI, Azure OpenAI, and Google Gemini.
// ===End StrongAI Generated Comment===

import { IFunction } from './Function';
import { IChatWithAttachmentDriver } from './ChatWithAttachment';

/**
 * Enum representing model sizes
 */
export enum EModel {
   kLarge = "kLarge",
   kMini = "kMini"  
}

/**
 * Enum representing model providers
 */
export enum EModelProvider {
   kOpenAI = "kOpenAI",
   kAzureOpenAI = "kAzureOpenAI",
   kGoogleGemini = "kGoogleGemini",
   kDefault = "kDefault"
}

/**
 * An enumeration of possible chat roles.
 * Used to identify the sender of a message in chat interactions.
 * Follows OpenAI's Responses API guidelines.
 */
export enum EChatRole {
   kUser = 'user',
   kAssistant = 'assistant',
   kFunction = 'function',
   kTool = 'tool'
}

/** Hint on how much text to generate  */
export enum EVerbosity {
   kLow = "kLow",
   kMedium = "kMedium",
   kHigh = "kHigh"
}

export { PromptFileRepository, PromptInMemoryRepository } from "./PromptRepository";
export { ChatDriverFactory } from "./ChatFactory";
export { GoogleGeminiChatDriver } from "./Chat.GoogleGemini";
export { EmbeddingDriverFactory } from "./EmbedFactory";
export { cosineSimilarity as CosineSimilarity } from "./Embed";
export { throwIfUndefined, throwIfNull, throwIfFalse, InvalidParameterError, InvalidOperationError, ConnectionError, InvalidStateError, sanitizeInputString, sanitizeOutputString } from "@jonverrier/assistant-common";
export { formatChatMessageTimestamp, renderChatMessageAsText } from "./FormatChatMessage";
export { IFunction, IFunctionArgs, EDataType, ILLMFunctionCall, IFunctionCallOutput, IFunctionExecutionContext, FunctionExecutionResult } from "./Function";
export { IChatWithAttachmentDriver, IChatAttachmentContent, IChatAttachmentReference, ChatAttachmentInput, IChatTableJson } from "./ChatWithAttachment";
export { OpenAIChatWithAttachment } from "./ChatWithAttachment.OpenAI";
export { AzureOpenAIChatWithAttachment } from "./ChatWithAttachment.AzureOpenAI";
export { GoogleGeminiChatWithAttachment } from "./ChatWithAttachment.GoogleGemini";
export { ChatWithAttachmentDriverFactory } from "./ChatWithAttachmentFactory";

/**
 * Enum representing parameter types as strings
 */
export const ParameterTypeNumber = "kNumber";
export const ParameterTypeString = "kString";
export const ParameterTypeEnum = "kEnum";
export type EParameterType = "kNumber" | "kString" | "kEnum";

/**
 * Interface representing a parameter used in prompt templates
 * 
 * @interface IPromptParameter
 * @property {string} name - The name of the parameter used in placeholder substitution
 * @property {string} description - A description of what the parameter represents
 * @property {EType} type - The type of the parameter
 * @property {boolean} required - Whether this parameter must be provided
 * @property {string} defaultValue - The default value to use if parameter is not provided
 * @property {string[]} allowedValues - Array of allowed values for this parameter if type is enum
 */
export interface IPromptParameterSpec {
   name: string,
   description: string,
   type: EParameterType,
   required: boolean,
   defaultValue?: string | undefined,
   allowedValues?: string[] | undefined
} 

/**
 * Interface representing a prompt template
 * 
 * @interface IPrompt
 * @property {string} id - The unique identifier of the prompt
 * @property {string} version - The version of the prompt
 * @property {string} schemaVersion - The version of the prompt schema
 * @property {string} name - The name of the prompt
 * @property {string} [description] - The description of the prompt
 * @property {string} systemPrompt - The system prompt template
 * @property {IPromptParameterSpec[]} [systemPromptParameters] - The parameters for the system prompt
 * @property {string} userPrompt - The user prompt template
 * @property {IPromptParameterSpec[]} [userPromptParameters] - The parameters for the user prompt
 */
export interface IPrompt {
   id: string,
   version: string,
   schemaVersion?: string   
   name: string,
   description?: string,
   systemPrompt?: string,
   systemPromptParameters?: IPromptParameterSpec[] | undefined,
   userPrompt: string,
   userPromptParameters?: IPromptParameterSpec[] | undefined,
}

/**
 * Interface for a repository that manages prompt storage and retrieval
 */
export interface IPromptRepository {
   /**
    * Retrieves a stored prompt by its unique identifier
    * @param id The unique identifier of the prompt
    * @returns The stored prompt if found
    */
   getPrompt(id: string): IPrompt | undefined;

   /**
    * Expands a prompt with given parameters
    * @param prompt The prompt to expand
    * @param params The parameters to expand the prompt with. Optional parameters may be undefined.
    * @returns The expanded prompt
    */
   expandSystemPrompt(prompt: IPrompt, params: { [key: string]: string | undefined }): string;

   /**
    * Expands a prompt with given parameters
    * @param prompt The prompt to expand
    * @param params The parameters to expand the prompt with. Optional parameters may be undefined.
    * @returns The expanded prompt
    */
   expandUserPrompt(prompt: IPrompt, params: { [key: string]: string | undefined }): string;   
}

// --- Optional identity for storage/retrieval (used by IChatMessage and backend persistence) ---

/**
 * Base type for entities that carry optional storage identity.
 * Used by IChatMessage and by backend persistence layers; not required for basic prompt/chat usage.
 * @property id - Optional id; undefined before the entity has been persisted
 * @property className - Discriminator for the entity type
 */
export interface IQueryReturnable {
   id: string | undefined;
   className: string;
}

/**
 * Generic interface for function calls from any LLM provider
 * Represents a function call request in a provider-agnostic way
 * @property {string} id - Unique identifier for the function call
 * @property {string} name - The name of the function to call
 * @property {string} arguments - JSON string of function arguments
 */
export interface IFunctionCall {
   id: string; // Required unique identifier for all function calls
   name: string;
   arguments: string; // JSON string of arguments
}

/**
 * A message in a chat interaction.
 * Supports OpenAI Responses API format with backward compatibility.
 * Handles single function calls, multiple tool calls, and function call outputs.
 * 
 * @interface IChatMessage
 * @extends IQueryReturnable
 * @property {EChatRole} role - The role of the message sender
 * @property {string | undefined} content - Message content (undefined for function calls)
 * @property {Date} timestamp - When the message was created
 * @property {string} [name] - Function name for function/tool messages
 * @property {IFunctionCall} [function_call] - Single function call (legacy format)
 * @property {IFunctionCall[]} [tool_calls] - Multiple function calls
 * @property {string} [tool_call_id] - ID linking tool response to tool call
 * @property {string} [type] - Message type for Responses API (e.g., 'function_call_output')
 * @property {string} [call_id] - Call ID for Responses API function outputs
 * @property {string} [output] - Function output for Responses API
 */   
export interface IChatMessage extends IQueryReturnable {
   role: EChatRole;
   content: string | undefined; // undefined for assistant messages with function_call or tool_calls
   timestamp: Date;
   name?: string; // Required for function/tool messages, optional for others
   function_call?: IFunctionCall; // Present in assistant messages when calling a single function (id optional)
   tool_calls?: IFunctionCall[]; // Present in assistant messages when calling multiple tools (id required)
   tool_call_id?: string; // For tool use pattern - links tool response to specific tool call
   
   // Responses API specific fields
   type?: string; // Message type (e.g., 'function_call_output')
   call_id?: string; // Call ID for function call outputs in Responses API
   output?: string; // Function execution result for Responses API
}

export const ChatMessageClassName = "IChatMessage";

/**
 * Interface for chat driver - has a number of concrete sub-classes, each of which implements the methods below
 */
export interface IChatDriver {

   /**
    * Retrieves a chat response from the model with optional function calling support.
    * Handles both single and multiple tool calls automatically.
    * 
    * @param systemPrompt The system prompt to send to the model
    * @param userPrompt The user prompt to send to the model
    * @param verbosity The verbosity of the response
    * @param messageHistory Optional array of previous chat messages
    * @param functions Optional array of functions available for the model to call
    * @returns Promise resolving to the final text response from the model
    * 
    * @example
    * ```typescript
    * const response = await chatDriver.getModelResponse(
    *   'You are a helpful assistant with access to weather data.',
    *   'What is the weather in London and Paris?',
    *   EVerbosity.kMedium,
    *   [],
    *   [getWeatherFunction]
    * );
    * // Model may call getWeatherFunction twice (for London and Paris)
    * // and return a combined response
    * ```
    */
   getModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<string>;

   /**
    * Retrieves a streamed chat response from the model with function calling support.
    * Function calls are executed during streaming, with final response streamed back.
    * 
    * @param systemPrompt The system prompt to send to the model
    * @param userPrompt The user prompt to send to the model
    * @param verbosity The verbosity of the response
    * @param messageHistory Optional array of previous chat messages
    * @param functions Optional array of functions available for the model to call
    * @returns AsyncIterator yielding chunks of the final response
    * 
    * @example
    * ```typescript
    * const iterator = chatDriver.getStreamedModelResponse(
    *   'You are a helpful assistant.',
    *   'Get weather for multiple cities',
    *   EVerbosity.kMedium,
    *   [],
    *   [getWeatherFunction]
    * );
    * 
    * for await (const chunk of iterator) {
    *   process.stdout.write(chunk); // Stream response as it arrives
    * }
    * ```
    */
   getStreamedModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,      
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): AsyncIterator<string>;

   /**
    * Retrieves a chat response from the model with forced tool usage.
    * The model MUST call at least one of the provided functions before responding.
    * Supports multiple tool calls in a single interaction.
    * 
    * @param systemPrompt The system prompt to send to the model
    * @param userPrompt The user prompt to send to the model
    * @param verbosity The verbosity of the response
    * @param messageHistory Optional array of previous chat messages
    * @param functions Array of functions that the model must choose from
    * @returns Promise resolving to the final text response after tool execution
    * 
    * @example
    * ```typescript
    * const response = await chatDriver.getModelResponseWithForcedTools(
    *   'You must use the available tools to answer questions.',
    *   'I need weather data for London',
    *   EVerbosity.kMedium,
    *   [],
    *   [getWeatherFunction, getLocationFunction]
    * );
    * // Model will be forced to call at least one function
    * ```
    */
   getModelResponseWithForcedTools(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<string>;

   /**
    * Retrieves a streamed chat response from the model with forced tool usage.
    * The model MUST call at least one function, with results streamed back.
    * 
    * @param systemPrompt The system prompt to send to the model
    * @param userPrompt The user prompt to send to the model
    * @param verbosity The verbosity of the response
    * @param messageHistory Optional array of previous chat messages
    * @param functions Array of functions that the model must choose from
    * @returns AsyncIterator yielding chunks of the final response after tool execution
    * 
    * @example
    * ```typescript
    * const iterator = chatDriver.getStreamedModelResponseWithForcedTools(
    *   'Use tools to gather information before responding.',
    *   'Compare weather in multiple cities',
    *   EVerbosity.kMedium,
    *   [],
    *   [getWeatherFunction]
    * );
    * 
    * for await (const chunk of iterator) {
    *   console.log(chunk); // Streamed response after tool execution
    * }
    * ```
    */
   getStreamedModelResponseWithForcedTools(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): AsyncIterator<string>;


   /**
    * Retrieves a chat response from the model with JSON schema validation.
    * The model output will be constrained to match the provided schema.
    * Functions can still be called during the interaction.
    * 
    * @param systemPrompt The system prompt to send to the model
    * @param userPrompt The user prompt to send to the model 
    * @param verbosity The verbosity of the response
    * @param jsonSchema The JSON schema to constrain the model output
    * @param defaultValue The default value to return if parsing fails
    * @param messageHistory Optional array of previous chat messages
    * @param functions Optional array of functions available for the model to call
    * @returns Promise resolving to a validated JSON object of type T
    * 
    * @example
    * ```typescript
    * interface WeatherSummary {
    *   cities: string[];
    *   averageTemp: number;
    * }
    * 
    * const schema = {
    *   type: 'object',
    *   properties: {
    *     cities: { type: 'array', items: { type: 'string' } },
    *     averageTemp: { type: 'number' }
    *   },
    *   required: ['cities', 'averageTemp']
    * };
    * 
    * const result = await chatDriver.getConstrainedModelResponse<WeatherSummary>(
    *   'Analyze weather data and return structured results.',
    *   'Get weather for London and Paris, return summary',
    *   EVerbosity.kMedium,
    *   schema,
    *   { cities: [], averageTemp: 0 },
    *   [],
    *   [getWeatherFunction]
    * );
    * ```
    */
   getConstrainedModelResponse<T>(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      jsonSchema: Record<string, unknown>,
      defaultValue: T,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<T>;
}

/**
 * Interface for a simple factory class for creating chat drivers
 */
export interface IChatDriverFactory {

   create(model: EModel, provider: EModelProvider): IChatDriver;
}

/**
 * Interface for a simple factory class for creating chat drivers with attachment support
 */
export interface IChatWithAttachmentDriverFactory {

   create(model: EModel, provider: EModelProvider): IChatWithAttachmentDriver;
}

/**
 * Interface for drivers that provide text embedding capabilities.
 * Text embeddings are vector representations of text that capture semantic meaning,
 * allowing for operations like semantic search and similarity comparisons.
 * 
 * @interface IEmbeddingModelDriver
 */
export interface IEmbeddingModelDriver {

   deploymentName : string;
   drivenModelType: EModel;
   drivenModelProvider: EModelProvider;
   
   
    /**
     * Converts text into a vector embedding representation.
     * 
     * @param {string} text - The input text to be embedded
     * @returns {Promise<Array<number>>} A promise that resolves to an array of numbers 
     *         representing the text embedding vector
     */
    embed(text: string): Promise<Array<number>>;
}

/**
 * Interface for a simple factory class for creating embedding drivers
 */
export interface IEmbeddingDriverFactory {

   create(model: EModel, provider: EModelProvider): IEmbeddingModelDriver;
}

/**
 * Interface for a chunk of text 
 */

 export interface IChunk {
   id: string;              // SHA-256 hash of content
   title: string;           // Human-readable title (5-10 words)
   text: string;            // Existing enriched content
   embedding: number[];     // Existing vector embedding
   metadata: {              // Metadata 
     source: string;        // Source document name
     created: string;       // (date in ISO format)
     chunkNumber: number;   // Position in source document
     totalChunks: number;   // Total chunks in source
   };
 }

/**
 * Interface for a store of chunks of text and their embeddings
 */
export interface IChunkStore {
   checkCount: number;
   chunks: IChunk[];
}