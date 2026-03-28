/**
 * @module Embed.AzureOpenAI
 * 
 * Concrete implementation of OpenAIModelEmbeddingDriver for Azure OpenAI embedding model.
 * Provides specific configuration for Azure OpenAI embedding services.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { AzureOpenAI } from 'openai';
import { EModel, EModelProvider, InvalidStateError } from './entry';
import { OpenAIModelEmbeddingDriver } from './Embed';

const AZURE_DEPLOYMENTS = {
   LARGE: "text-embedding-3-large",
   MINI: "text-embedding-3-small"
} as const;

/**
 * Azure OpenAI embedding model driver.
 * Provides specific configuration for Azure OpenAI embedding services.
 * 
 * @extends {OpenAIModelEmbeddingDriver}
 * 
 * @property {string} deploymentName - The Azure deployment name to use
 * @property {AzureOpenAI} openai - Instance of Azure OpenAI API client
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a concrete embedding driver for Azure OpenAI. It implements the provider-specific wiring needed to use Azure-hosted embedding models within a shared embedding driver abstraction.
// 
// The main export is AzureOpenAIEmbeddingDriver. It extends a base OpenAIModelEmbeddingDriver and configures it for Azure. The constructor accepts a model type and selects the correct Azure deployment name, choosing between a large and a small embedding model. It validates required environment configuration and throws InvalidStateError if the Azure API key or endpoint is missing. It then instantiates an AzureOpenAI client bound to the chosen deployment and a fixed API version. The class exposes deploymentName for introspection and overrides getModelName to return that value.
// 
// Key imported dependencies:
// - AzureOpenAI from the openai package, used to create the Azure client instance.
// - EModel and EModelProvider from the local entry module, used to select the deployment and label the provider as Azure.
// - InvalidStateError from the same entry module, used for configuration validation.
// - OpenAIModelEmbeddingDriver from the local Embed module, providing the base embedding driver behavior.
// ===End StrongAI Generated Comment===

export class AzureOpenAIEmbeddingDriver extends OpenAIModelEmbeddingDriver {
   public deploymentName: string;
   protected declare openai: AzureOpenAI;

   constructor(modelType: EModel) {
      super(modelType, EModelProvider.kAzureOpenAI);
      this.deploymentName = modelType === EModel.kLarge ? 
         AZURE_DEPLOYMENTS.LARGE : 
         AZURE_DEPLOYMENTS.MINI;

      if (!process.env.AZURE_OPENAI_API_KEY) {
         throw new InvalidStateError('AZURE_OPENAI_API_KEY environment variable is not set');
      }
      if (!process.env.AZURE_OPENAI_ENDPOINT) {
         throw new InvalidStateError('AZURE_OPENAI_ENDPOINT environment variable is not set');
      }

      this.openai = new AzureOpenAI({
         apiKey: process.env.AZURE_OPENAI_API_KEY,
         endpoint: process.env.AZURE_OPENAI_ENDPOINT,
         deployment: this.deploymentName,
         apiVersion: "2024-02-01"
      });
   }

   protected getModelName(): string {
      return this.deploymentName;
   }
} 