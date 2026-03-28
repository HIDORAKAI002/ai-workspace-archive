/**
 * @module Chat.OpenAI
 * 
 * Concrete implementation of GenericOpenAIChatDriver for OpenAI model.
 * Provides specific configuration for OpenAI model.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import OpenAI from 'openai';
import { EChatRole, InvalidStateError } from './entry';
import { EModel, IChatMessage, IFunction } from './entry';
import { GenericOpenAIChatDriver } from './Chat.GenericOpenAI';

/**
 * Concrete implementation of GenericOpenAIChatDriver for OpenAI model.
 * Provides specific configuration for OpenAI model.
 * 
 * @extends {GenericOpenAIChatDriver}
 * 
 * @property {string} model - The OpenAI model identifier to use
 * @property {OpenAI} openai - Instance of OpenAI API client
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides the OpenAI-backed chat driver used by the project’s chat framework. It specializes the generic OpenAI driver with concrete configuration for OpenAI’s GPT-5 family and wires up the OpenAI API client. The main export is OpenAIChatDriver, a subclass of GenericOpenAIChatDriver. Construct it with an EModel to choose the model size: large maps to gpt-5.2, otherwise gpt-5-mini (no gpt-5.2-mini exists). The driver enforces that an OpenAI API key is present in the OPENAI_API_KEY environment variable and throws InvalidStateError if it is missing. On creation, it initializes an OpenAI client instance with that key. It supplies the selected model name to the base class and indicates that tool messages are supported, enabling tool-calling via the Responses API.
// 
// Key dependencies include:
// - OpenAI from the openai package for API calls.
// - GenericOpenAIChatDriver, which provides the core chat flow and request/response handling this class customizes.
// - EModel to select model tier.
// - InvalidStateError for configuration validation failures.
// - EChatRole, IChatMessage, and IFunction, which define roles, message shapes, and tool/function metadata used across the chat system.
// ===End StrongAI Generated Comment===

export class OpenAIChatDriver extends GenericOpenAIChatDriver {
   private model: string;
   protected declare openai: OpenAI;

   constructor(modelType: EModel) {
      super(modelType);
      this.model = modelType === EModel.kLarge ? 'gpt-5.2' : 'gpt-5-mini';

      if (!process.env.OPENAI_API_KEY) {
         throw new InvalidStateError('OPENAI_API_KEY environment variable is not set');
      }
      this.openai = new OpenAI({
         apiKey: process.env.OPENAI_API_KEY,
      });
   }

   protected getModelName(): string {
      return this.model;
   }

   protected shouldUseToolMessages(): boolean {
      return true; // GPT-5 with Responses API supports tool messages
   }
} 