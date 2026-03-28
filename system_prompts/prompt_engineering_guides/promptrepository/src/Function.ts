/**
 * @module Function
 * 
 * Interfaces and types for function calling with LLMs.
 * Supports OpenAI-style function calling with proper function execution patterns.
 * Handles both single and multiple function calls in accordance with OpenAI Responses API.
 */
// Copyright (c) 2025, 2026 Jon Verrier

/**
 * Enum for basic data types used in function schemas
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module defines types and interfaces for LLM function calling compatible with the OpenAI Responses API. It standardizes how functions are described, validated, executed, and how their results are reported back to the model.
// 
// Main exports:
// - EDataType enum lists JSON schema data types used in function schemas.
// - IFunctionArgs models JSON-serializable argument objects accepted by functions.
// - FnValidateFunctionArgs is a validator signature that returns sanitized args or throws.
// - FnExecuteFunction is an async executor signature that returns a result payload.
// - IFunctionExecutionContext provides metadata for execution attempts, including callId, functionName, timestamp, and retry attempt.
// - ISchemaProperty and ISchema describe input and output JSON schemas, including nested properties, arrays, required fields, and additionalProperties.
// - ILLMFunctionCall represents an LLM-emitted function_call with a name and JSON-encoded arguments, plus an optional call_id.
// - IFunctionCallOutput represents function_call_output with the matching call_id and JSON-encoded result.
// - IFunction defines a callable function contract with name, description, input and output schemas, validateArgs, and execute.
// - FunctionExecutionResult is a discriminated union for success or structured error reporting.
// 
// This module has no external imports or dependencies.
// ===End StrongAI Generated Comment===

export enum EDataType {
   kObject = "object",
   kString = "string",
   kNumber = "number",
   kBoolean = "boolean",
   kArray = "array"
}

/**
 * Base interface for function argument objects
 * Supports all JSON-serializable types that can be passed to functions
 */
export interface IFunctionArgs {
   [key: string]: string | number | boolean | string[] | number[] | boolean[] | object | object[] | undefined;   
}

/**
 * Function type for validating function arguments
 * Should throw an error if validation fails, otherwise return validated args
 */
export type FnValidateFunctionArgs = (args: IFunctionArgs) => IFunctionArgs;

/**
 * Function type for executing functions
 * Should return a Promise that resolves to the function result
 */
export type FnExecuteFunction = (args: IFunctionArgs) => Promise<IFunctionArgs>;

/**
 * Interface for function execution context
 * Provides context information during function execution
 */
export interface IFunctionExecutionContext {
   callId: string;
   functionName: string;
   timestamp: Date;
   attempt: number; // For retry logic
}

export interface ISchemaProperty {
   type: EDataType | string; // Accepts both enum and string literal
   description: string;
   properties?: { [key: string]: ISchemaProperty };
   items?: ISchemaProperty;
   required?: string[] | readonly string[];
   additionalProperties?: boolean;
 }
 
 export interface ISchema {
   type: EDataType | string;
   properties: { [key: string]: ISchemaProperty };
   required?: string[] | readonly string[];
   additionalProperties?: boolean;
 }
 
/**
 * Interface for a function call as received from the LLM
 * Follows OpenAI Responses API format for function calls
 */
export interface ILLMFunctionCall {
   type: 'function_call';
   name: string;
   arguments: string; // JSON string of arguments
   call_id?: string; // Unique identifier for this function call
}

/**
 * Interface for function call output in Responses API format
 * Used to provide function execution results back to the LLM
 */
export interface IFunctionCallOutput {
   type: 'function_call_output';
   call_id: string;
   output: string; // JSON string of function result
}

/**
 * Interface for a function that can be called by the LLM
 * 
 * @interface IFunction
 * @property {string} name - The name of the function
 * @property {string} description - The description of the function
 * @property {ISchema} inputSchema - The input schema defining expected parameters
 * @property {ISchema} outputSchema - The output schema defining return value structure
 * @property {Function} validateArgs - Function to validate input arguments
 * @property {Function} execute - Function to execute with validated arguments
 * 
 * @example
 * ```typescript
 * const getWeatherFunction: IFunction = {
 *   name: 'get_weather',
 *   description: 'Get current weather for a location',
 *   inputSchema: {
 *     type: EDataType.kObject,
 *     properties: {
 *       location: { type: EDataType.kString, description: 'City name' }
 *     },
 *     required: ['location']
 *   },
 *   outputSchema: {
 *     type: EDataType.kObject,
 *     properties: {
 *       temperature: { type: EDataType.kNumber, description: 'Temperature in Celsius' },
 *       condition: { type: EDataType.kString, description: 'Weather condition' }
 *     },
 *     required: ['temperature', 'condition']
 *   },
 *   validateArgs: (args) => {
 *     if (!args.location) throw new Error('Location is required');
 *     return args;
 *   },
 *   execute: async (args) => {
 *     // Implementation here
 *     return { temperature: 22, condition: 'sunny' };
 *   }
 * };
 * ```
 */
export interface IFunction {
   name: string;
   description: string;
   inputSchema: ISchema;
   outputSchema: ISchema;
   validateArgs: (args: any) => any;
   execute: (args: any) => Promise<any>;
}

/**
 * Utility type for function execution results
 * Can be either successful result or error information
 */
export type FunctionExecutionResult = {
   success: true;
   result: any;
} | {
   success: false;
   error: string;
   functionName: string;
   timestamp: string;
};
