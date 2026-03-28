/**
 * @module ChatFactory
 * 
 * Factory for creating chat driver instances.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { IChatDriver, IChatDriverFactory, EModelProvider, EModel } from './entry';
import { OpenAIChatDriver } from './Chat.OpenAI';
import { AzureOpenAIChatDriver } from './Chat.AzureOpenAI';
import { GoogleGeminiChatDriver } from './Chat.GoogleGemini';

/**
 * Factory class for creating chat drivers
 */

// ===Start StrongAI Generated Comment (20260219)===
// Factory for creating chat driver instances based on a requested model provider. The module exports ChatDriverFactory, which implements IChatDriverFactory and exposes a single method: create(model, provider). This method returns an IChatDriver implementation chosen by provider and environment.
// 
// When provider is kDefault, the factory selects Google Gemini in development and OpenAI in other environments. The decision uses the NODE_ENV environment variable (development vs non-development). When provider is kAzureOpenAI, it returns an AzureOpenAIChatDriver. When provider is kGoogleGemini, it returns a GoogleGeminiChatDriver. For any other value, it falls back to OpenAIChatDriver.
// 
// The model argument is forwarded to each driver constructor. Note that GoogleGeminiChatDriver always uses a flash variant internally, ignoring the provided model, due to rate limit constraints on the pro tier.
// 
// Key imports include the IChatDriver and IChatDriverFactory interfaces and the EModelProvider and EModel enums from ./entry, which define the contract and selection inputs. Driver implementations are imported from Chat.OpenAI, Chat.AzureOpenAI, and Chat.GoogleGemini.
// ===End StrongAI Generated Comment===

export class ChatDriverFactory implements IChatDriverFactory {
   create(model: EModel, provider: EModelProvider): IChatDriver {
      // Handle kDefault provider - maps to Gemini in development, OpenAI in production
      if (provider === EModelProvider.kDefault) {
         const isDevelopment = process.env.NODE_ENV === 'development';
         if (isDevelopment) {
            return new GoogleGeminiChatDriver(model);
         } else {
            return new OpenAIChatDriver(model);
         }
      }

      if (provider === EModelProvider.kAzureOpenAI) {
         return new AzureOpenAIChatDriver(model);
      }
      if (provider === EModelProvider.kGoogleGemini) {
         // NOTE: GoogleGeminiChatDriver always uses flash model (gemini-3-flash-preview) regardless of model parameter
         // This is due to rate limit constraints - pro model only allows 250 requests/day
         return new GoogleGeminiChatDriver(model);
      }
      return new OpenAIChatDriver(model);
   }
} 