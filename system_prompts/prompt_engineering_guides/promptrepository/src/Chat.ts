/**
 * @module Chat
 * 
 * Generic base functionality for interacting with any LLM provider.
 * This class provides the common interface and utilities that all
 * chat drivers should implement, regardless of the underlying provider.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { EChatRole, EVerbosity } from './entry';
import { IChatDriver, EModel, IChatMessage, IFunction } from './entry';

/**
 * Abstract base class for all chat drivers.
 * Provides common functionality that any LLM provider can inherit from,
 * including message handling and basic utilities.
 * 
 * @implements {IChatDriver}
 * @abstract
 * 
 * This class is provider-agnostic and contains no OpenAI-specific code.
 * Provider-specific implementations should inherit from this class.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module defines a provider-agnostic base class for LLM chat integrations. It supplies a common interface and utilities that concrete drivers extend to talk to specific providers.
// 
// Main export: ChatDriver, an abstract class implementing IChatDriver. It is constructed with a modelType (EModel). Subclasses must implement getProviderName and getModelName to identify the provider and concrete model.
// 
// Core APIs that subclasses implement:
// - getModelResponse: returns a full response as a string.
// - getStreamedModelResponse: returns tokens via AsyncIterator<string>.
// - getModelResponseWithForcedTools and getStreamedModelResponseWithForcedTools: same as above but require tool/function usage.
// - getConstrainedModelResponse: returns a typed result validated against a JSON schema, with a caller-supplied default.
// 
// Utilities:
// - createUserMessage builds an IChatMessage with role, content, timestamp, id, and a CSS-friendly class name.
// - buildMessageArray merges optional history with a new user message.
// 
// Key dependencies from ./entry:
// - EChatRole labels message roles.
// - EVerbosity influences response detail.
// - IChatDriver defines the driver contract.
// - EModel identifies model families.
// - IChatMessage describes chat messages.
// - IFunction represents callable tools available to the model.
// ===End StrongAI Generated Comment===

export abstract class ChatDriver implements IChatDriver {
   constructor(protected modelType: EModel) {}

   /**
    * Returns the provider name for error messages
    * Subclasses must override to return their specific provider name
    */
   protected abstract getProviderName(): string;

   /**
    * Returns the model name/identifier used by this driver
    * Subclasses must override to return their specific model name
    */
   protected abstract getModelName(): string;

   /**
    * Creates a user message with the given prompt
    */
   protected createUserMessage(userPrompt: string): IChatMessage {
      return {
         role: EChatRole.kUser,
         content: userPrompt,
         timestamp: new Date(),
         id: `user-${Date.now()}`,
         className: 'user-message'
      };
   }

   /**
    * Builds the complete message array including history and new user message
    */
   protected buildMessageArray(messageHistory: IChatMessage[] | undefined, userPrompt: string): IChatMessage[] {
      return [
         ...(messageHistory || []),
         this.createUserMessage(userPrompt)
      ];
   }

   // Abstract methods that must be implemented by provider-specific subclasses
   abstract getModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<string>;

   abstract getStreamedModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): AsyncIterator<string>;

   abstract getModelResponseWithForcedTools(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<string>;

   abstract getStreamedModelResponseWithForcedTools(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): AsyncIterator<string>;

   abstract getConstrainedModelResponse<T>(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      jsonSchema: Record<string, unknown>,
      defaultValue: T,
      messageHistory?: IChatMessage[],
      functions?: IFunction[]
   ): Promise<T>;
}