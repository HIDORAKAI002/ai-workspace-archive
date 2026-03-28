/**
 * @module MockAzureOpenAIChatWithAttachment
 * 
 * Mock implementation of AzureOpenAIChatWithAttachment for testing.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { EModel, EVerbosity } from '../src/entry';
import { AzureOpenAIChatWithAttachment } from '../src/ChatWithAttachment.AzureOpenAI';

/**
 * Mock class for testing Azure OpenAI ChatWithAttachment driver
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a test-friendly mock for the AzureOpenAIChatWithAttachment driver. It lets you exercise chat-with-attachment flows without calling the real Azure OpenAI service. The module exports a single class, MockAzureOpenAIChatWithAttachment, which extends the production AzureOpenAIChatWithAttachment and injects a fake client.
// 
// The constructor accepts an optional model type (defaults to a large model via EModel.kLarge) and builds a mock client with responses.create, files.create, and files.delete methods. By default, responses.create returns a simple text output, files.create returns a stub file id, and files.delete is a no-op.
// 
// You can override each behavior using setMockResponsesCreate, setMockFilesCreate, and setMockFilesDelete. These setters both store your mock functions and swap them into the underlying openai client used by the base class. The resetMocks method restores the default behaviors for all three endpoints.
// 
// Key imports: AzureOpenAIChatWithAttachment supplies the base functionality and expected client shape; EModel supplies model selection. EVerbosity is imported but not used. This mock is intended for unit tests and controlled simulations.
// ===End StrongAI Generated Comment===
export class MockAzureOpenAIChatWithAttachment extends AzureOpenAIChatWithAttachment {
   private mockResponsesCreate?: (config: any) => Promise<any>;
   private mockFilesCreate?: (input: any) => Promise<any>;
   private mockFilesDelete?: (id: string) => Promise<void>;

   constructor(modelType: EModel = EModel.kLarge) {
      // Create a mock client
      const client: any = {
         responses: {
            create: async (config: any) => {
               if (this.mockResponsesCreate) {
                  return this.mockResponsesCreate(config);
               }
               return {
                  output: [{ type: 'output_text', text: 'default response' }]
               };
            }
         },
         files: {
            create: async (input: any) => {
               if (this.mockFilesCreate) {
                  return this.mockFilesCreate(input);
               }
               return { id: 'file-123' };
            },
            delete: async (id: string) => {
               if (this.mockFilesDelete) {
                  return this.mockFilesDelete(id);
               }
            }
         }
      };

      super(modelType, { client });
   }

   /**
    * Set mock behavior for responses.create
    */
   setMockResponsesCreate(mockFn: (config: any) => Promise<any>): void {
      this.mockResponsesCreate = mockFn;
      (this as any).openai.responses.create = mockFn;
   }

   /**
    * Set mock behavior for files.create
    */
   setMockFilesCreate(mockFn: (input: any) => Promise<any>): void {
      this.mockFilesCreate = mockFn;
      (this as any).openai.files.create = mockFn;
   }

   /**
    * Set mock behavior for files.delete
    */
   setMockFilesDelete(mockFn: (id: string) => Promise<void>): void {
      this.mockFilesDelete = mockFn;
      (this as any).openai.files.delete = mockFn;
   }

   /**
    * Reset all mocks to defaults
    */
   resetMocks(): void {
      this.mockResponsesCreate = undefined;
      this.mockFilesCreate = undefined;
      this.mockFilesDelete = undefined;
      (this as any).openai.responses.create = async (config: any) => ({
         output: [{ type: 'output_text', text: 'default response' }]
      });
      (this as any).openai.files.create = async () => ({ id: 'file-123' });
      (this as any).openai.files.delete = async () => {};
   }
}

