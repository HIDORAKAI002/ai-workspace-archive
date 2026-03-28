/**
 * @module MockChatWithAttachmentFactory
 * 
 * Factory for creating mock ChatWithAttachment drivers for testing.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { EModelProvider, EModel, IChatWithAttachmentDriver } from '../src/entry';
import { MockOpenAIChatWithAttachment } from './MockOpenAIChatWithAttachment';
import { MockAzureOpenAIChatWithAttachment } from './MockAzureOpenAIChatWithAttachment';
import { MockGeminiChatWithAttachment } from './MockGeminiChatWithAttachment';

/**
 * Factory class for creating mock chat drivers with attachment support
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a factory for creating mock chat drivers that support attachments, used in tests. It centralizes provider selection so callers do not need to instantiate specific mock drivers.
// 
// It exports one class: MockChatWithAttachmentFactory. The class exposes a single method, create(model, provider), which returns an IChatWithAttachmentDriver. The method chooses a mock implementation based on the requested EModelProvider and environment. For kAzureOpenAI it returns MockAzureOpenAIChatWithAttachment. For kGoogleGemini it returns MockGeminiChatWithAttachment. For kDefault it switches by NODE_ENV: in development it uses the Gemini mock; otherwise it uses the OpenAI mock. For kOpenAI or any unrecognized case it defaults to the OpenAI mock. The provided EModel argument is passed to the Azure and Gemini mocks; the OpenAI mock is constructed without a model.
// 
// Key imports are EModelProvider, EModel, and IChatWithAttachmentDriver from the shared entry module, which define provider and model enums and the driver interface. The factory also imports the three concrete mock drivers it instantiates.
// ===End StrongAI Generated Comment===
export class MockChatWithAttachmentFactory {
   /**
    * Creates a mock driver for the specified provider
    */
   create(model: EModel, provider: EModelProvider): IChatWithAttachmentDriver {
      if (provider === EModelProvider.kAzureOpenAI) {
         return new MockAzureOpenAIChatWithAttachment(model);
      }
      
      if (provider === EModelProvider.kGoogleGemini) {
         return new MockGeminiChatWithAttachment(model);
      }
      
      if (provider === EModelProvider.kDefault) {
         // In development, use Gemini; in production, use OpenAI
         if (process.env.NODE_ENV === 'development') {
            return new MockGeminiChatWithAttachment(model);
         } else {
            return new MockOpenAIChatWithAttachment();
         }
      }
      
      // Default to OpenAI for kOpenAI provider
      return new MockOpenAIChatWithAttachment();
   }
}

