/**
 * @module MockGeminiChatWithAttachment
 * 
 * Mock implementation of GoogleGeminiChatWithAttachment for testing.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { EModel, EVerbosity } from '../src/entry';
import { GoogleGeminiChatWithAttachment } from '../src/ChatWithAttachment.GoogleGemini';
import { ChatAttachmentInput, IChatTableJson } from '../src/ChatWithAttachment';

/**
 * Mock class for testing Gemini ChatWithAttachment driver
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a mock driver for Gemini chat with attachments, intended for tests that should not call the live API. It exports a single class, MockGeminiChatWithAttachment, which extends the real GoogleGeminiChatWithAttachment to preserve behavior and interfaces while allowing controlled responses.
// 
// The class accepts an optional model type in the constructor and defaults to a large model via EModel.kLarge. Tests can inject a custom async function through setMockGenerateContent to override the underlying generateContent behavior. The overridden getModelResponse builds the same request parts as the base class and, when a mock is set, routes the request to the mock and returns its text result, falling back to a simple default when absent. If no mock is configured, it defers to the parent implementation for normal behavior. resetMocks clears the injected mock.
// 
// Key imports include EModel and EVerbosity for configuration, GoogleGeminiChatWithAttachment as the base implementation, and ChatAttachmentInput and IChatTableJson to support attachments and table payloads. The mock relies on inherited genAI, modelName, buildParts, and the base getModelResponse.
// ===End StrongAI Generated Comment===
export class MockGeminiChatWithAttachment extends GoogleGeminiChatWithAttachment {
   private mockGenerateContent?: (config: any) => Promise<any>;

   constructor(modelType: EModel = EModel.kLarge) {
      super(modelType);
   }

   /**
    * Set mock behavior for generateContent
    */
   setMockGenerateContent(mockFn: (config: any) => Promise<any>): void {
      this.mockGenerateContent = mockFn;
   }

   /**
    * Override getModelResponse to use mock
    */
   async getModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      attachment?: ChatAttachmentInput,
      tableJson?: IChatTableJson
   ): Promise<string> {
      if (this.mockGenerateContent) {
         const model = (this as any).genAI.getGenerativeModel({ model: (this as any).modelName });
         const parts = (this as any).buildParts(systemPrompt, userPrompt, attachment, tableJson);
         const result = await this.mockGenerateContent({ contents: [{ role: 'user', parts }] });
         return result.response?.text() || 'mock response';
      }

      // Otherwise call parent implementation
      return super.getModelResponse(systemPrompt, userPrompt, verbosity, attachment, tableJson);
   }

   /**
    * Reset all mocks to defaults
    */
   resetMocks(): void {
      this.mockGenerateContent = undefined;
   }
}

