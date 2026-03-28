/**
 * @module MockOpenAIChatWithAttachment
 * 
 * Mock implementation of OpenAIChatWithAttachment for testing.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { EVerbosity, IChatAttachmentContent, IChatAttachmentReference } from '../src/entry';
import { OpenAIChatWithAttachment } from '../src/ChatWithAttachment.OpenAI';
import { ChatAttachmentInput, IChatTableJson } from '../src/ChatWithAttachment';

/**
 * Mock class for testing OpenAI ChatWithAttachment driver
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module provides a test double for the OpenAI ChatWithAttachment driver. It lets you run unit tests without calling the real OpenAI API. The main export is MockOpenAIChatWithAttachment, which extends OpenAIChatWithAttachment and injects a mock client.
// 
// The constructor builds a minimal client with responses.create, files.create, and files.delete. Each method returns a deterministic default: a single output_text message for responses, a fixed file id for file creation, and a no-op for deletion. You can override each behavior at runtime using setMockResponsesCreate, setMockFilesCreate, and setMockFilesDelete. These setters store the mock functions and also swap the underlying openai client methods so all internal calls use your mocks. resetMocks restores the default behaviors.
// 
// The class relies on OpenAIChatWithAttachment from ../src/ChatWithAttachment.OpenAI for higher-level request assembly and attachment handling. Types imported from ../src/entry and ../src/ChatWithAttachment (EVerbosity, IChatAttachmentContent, IChatAttachmentReference, ChatAttachmentInput, IChatTableJson) are not used directly here but signal compatibility with the surrounding chat-with-attachments API.
// ===End StrongAI Generated Comment===
export class MockOpenAIChatWithAttachment extends OpenAIChatWithAttachment {
   private mockResponsesCreate?: (config: any) => Promise<any>;
   private mockFilesCreate?: (input: any) => Promise<any>;
   private mockFilesDelete?: (id: string) => Promise<void>;

   constructor() {
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

      super({ client, model: 'gpt-test' });
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

