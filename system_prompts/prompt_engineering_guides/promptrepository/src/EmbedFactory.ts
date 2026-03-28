/**
 * @module EmbedFactory
 * 
 * Factory for creating embedding driver instances.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { IEmbeddingModelDriver, IEmbeddingDriverFactory, EModelProvider, EModel } from './entry';
import { NativeOpenAIEmbeddingDriver } from './Embed.OpenAI';
import { AzureOpenAIEmbeddingDriver } from './Embed.AzureOpenAI';

/**
 * Factory class for creating embedding drivers
 * Supports both Azure OpenAI and direct OpenAI providers
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a simple factory for constructing embedding model drivers. Its goal is to hide provider-specific details and let callers request an embedding driver by model and provider only.
// 
// The main export is EmbeddingDriverFactory, which implements the IEmbeddingDriverFactory interface from the shared entry module. Call create(model, provider) to receive an IEmbeddingModelDriver. The factory chooses the correct concrete driver based on the EModelProvider value. If the provider is Azure OpenAI, it returns an AzureOpenAIEmbeddingDriver. Otherwise, it returns a NativeOpenAIEmbeddingDriver for direct OpenAI access.
// 
// The module depends on several key imports. From ./entry, it relies on IEmbeddingModelDriver for the returned interface, IEmbeddingDriverFactory for the factory contract, and the EModel and EModelProvider enums to capture the requested model size and provider. It also imports the concrete driver classes AzureOpenAIEmbeddingDriver and NativeOpenAIEmbeddingDriver, which contain provider-specific logic, configuration, and API integration. The factory passes the EModel through unchanged, allowing each driver to map model size appropriately.
// ===End StrongAI Generated Comment===

export class EmbeddingDriverFactory implements IEmbeddingDriverFactory {
   /**
    * Creates an embedding driver instance based on the specified model and provider
    * 
    * @param {EModel} model - The model size to use (kLarge or kMini)
    * @param {EModelProvider} provider - The provider to use (kAzureOpenAI or kOpenAI)
    * @returns {IEmbeddingModelDriver} An embedding driver instance
    */
   create(model: EModel, provider: EModelProvider): IEmbeddingModelDriver {
      if (provider === EModelProvider.kAzureOpenAI) {
         return new AzureOpenAIEmbeddingDriver(model);
      }
      return new NativeOpenAIEmbeddingDriver(model);
   }
} 