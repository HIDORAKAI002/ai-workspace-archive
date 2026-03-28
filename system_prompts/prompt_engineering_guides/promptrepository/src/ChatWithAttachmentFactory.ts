/**
 * @module ChatWithAttachmentFactory
 * 
 * Factory for creating chat driver instances with attachment support.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { IChatWithAttachmentDriverFactory, IChatWithAttachmentDriver, EModelProvider, EModel } from './entry';
import { OpenAIChatWithAttachment } from './ChatWithAttachment.OpenAI';
import { AzureOpenAIChatWithAttachment } from './ChatWithAttachment.AzureOpenAI';
import { GoogleGeminiChatWithAttachment } from './ChatWithAttachment.GoogleGemini';

/**
 * Factory class for creating chat drivers with attachment support
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a factory for creating chat drivers that support message attachments. It centralizes provider selection and model mapping so callers only specify a model size and a provider.
// 
// The module exports a single class, ChatWithAttachmentDriverFactory, which implements IChatWithAttachmentDriverFactory. Its create(model, provider) method returns an IChatWithAttachmentDriver for the requested provider:
// - For Azure OpenAI, it instantiates AzureOpenAIChatWithAttachment with the provided EModel.
// - For Google Gemini, it instantiates GoogleGeminiChatWithAttachment. This implementation always uses the Gemini “flash” model due to rate limits, ignoring the EModel size.
// - For the Default provider, it chooses Gemini in development and OpenAI in production. In production it maps EModel.kLarge to gpt-4.1 and other sizes to gpt-4.1-mini.
// - For OpenAI (or any other case), it defaults to OpenAI with the same model mapping.
// 
// Key imports:
// - IChatWithAttachmentDriverFactory, IChatWithAttachmentDriver, EModelProvider, and EModel define the factory contract and provider/model enums.
// - OpenAIChatWithAttachment, AzureOpenAIChatWithAttachment, and GoogleGeminiChatWithAttachment are the concrete driver implementations.
// - process.env.NODE_ENV influences Default provider routing.
// ===End StrongAI Generated Comment===

export class ChatWithAttachmentDriverFactory implements IChatWithAttachmentDriverFactory {
   create(model: EModel, provider: EModelProvider): IChatWithAttachmentDriver {
      if (provider === EModelProvider.kAzureOpenAI) {
         return new AzureOpenAIChatWithAttachment(model);
      }
      
      if (provider === EModelProvider.kGoogleGemini) {
         // NOTE: GoogleGeminiChatWithAttachment always uses flash model (gemini-3-flash-preview) regardless of model parameter
         // This is due to rate limit constraints - pro model only allows 250 requests/day
         return new GoogleGeminiChatWithAttachment(model);
      }
      
      if (provider === EModelProvider.kDefault) {
         // In development, use Gemini; in production, use OpenAI
         if (process.env.NODE_ENV === 'development') {
            return new GoogleGeminiChatWithAttachment(model);
         } else {
            const modelString = model === EModel.kLarge ? 'gpt-4.1' : 'gpt-4.1-mini';
            return new OpenAIChatWithAttachment({ model: modelString });
         }
      }
      
      // Default to OpenAI for kOpenAI provider
      const modelString = model === EModel.kLarge ? 'gpt-4.1' : 'gpt-4.1-mini';
      return new OpenAIChatWithAttachment({ model: modelString });
   }
}

