/**
 * @module Embed.OpenAI
 * 
 * Concrete implementation of OpenAIModelEmbeddingDriver for direct OpenAI embedding model.
 * Provides specific configuration for direct OpenAI embedding services.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import OpenAI from 'openai';
import { EModel, EModelProvider, InvalidStateError } from './entry';
import { OpenAIModelEmbeddingDriver as OpenAIEmbeddingDriver } from './Embed';

/**
 * Direct OpenAI embedding model driver.
 * Provides specific configuration for direct OpenAI embedding services.
 * 
 * @extends {OpenAIEmbeddingDriver}
 * 
 * @property {string} deploymentName - The OpenAI model name to use
 * @property {OpenAI} openai - Instance of OpenAI API client
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a concrete embedding driver that talks directly to OpenAI’s embedding API. It specializes a generic OpenAI embedding driver with configuration specific to native OpenAI access, including model name selection and client initialization.
// 
// The main export is the class NativeOpenAIEmbeddingDriver. It extends the base OpenAIModelEmbeddingDriver to set the provider to OpenAI and to choose an embedding model name based on the requested EModel. Large maps to text-embedding-3-large; other sizes map to text-embedding-3-small. It exposes deploymentName for the selected model and overrides getModelName to return it.
// 
// The constructor validates that the OPENAI_API_KEY environment variable is present. If missing, it throws InvalidStateError. When valid, it creates an OpenAI client instance and stores it for use by the base driver.
// 
// Key imports are:
// - OpenAI from the openai SDK, used to send requests.
// - EModel and EModelProvider from ./entry to select the model tier and declare the provider.
// - InvalidStateError from ./entry for configuration validation.
// - OpenAIModelEmbeddingDriver from ./Embed as the superclass providing core embedding logic.
// ===End StrongAI Generated Comment===

export class NativeOpenAIEmbeddingDriver extends OpenAIEmbeddingDriver {
   public deploymentName: string;
   protected declare openai: OpenAI;

   private static readonly OPENAI_MODELS = {
      LARGE: "text-embedding-3-large",
      MINI: "text-embedding-3-small"
   } as const;

   constructor(modelType: EModel) {
      super(modelType, EModelProvider.kOpenAI);
      this.deploymentName = modelType === EModel.kLarge ? 
         NativeOpenAIEmbeddingDriver.OPENAI_MODELS.LARGE : 
         NativeOpenAIEmbeddingDriver.OPENAI_MODELS.MINI;

      if (!process.env.OPENAI_API_KEY) {
         throw new InvalidStateError('OPENAI_API_KEY environment variable is not set');
      }

      this.openai = new OpenAI({
         apiKey: process.env.OPENAI_API_KEY,
      });
   }

   protected getModelName(): string {
      return this.deploymentName;
   }
} 