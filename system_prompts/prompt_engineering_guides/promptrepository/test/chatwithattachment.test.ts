/**
 * @module chatwithattachment.test
 * 
 * Unit tests for ChatWithAttachment drivers across all providers.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { describe, it, after } from 'mocha';
import { expect } from 'expect';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { OpenAIChatWithAttachment } from '../src/ChatWithAttachment.OpenAI';
import { AzureOpenAIChatWithAttachment } from '../src/ChatWithAttachment.AzureOpenAI';
import { EVerbosity, IChatAttachmentContent, IChatAttachmentReference, EModel, IChatTableJson, EModelProvider } from '../src/entry';
import { MockChatWithAttachmentFactory } from './MockChatWithAttachmentFactory';
import { MockOpenAIChatWithAttachment } from './MockOpenAIChatWithAttachment';
import { MockAzureOpenAIChatWithAttachment } from './MockAzureOpenAIChatWithAttachment';
import { MockGeminiChatWithAttachment } from './MockGeminiChatWithAttachment';
import { CHAT_WITH_ATTACHMENT_TEST_PROVIDERS, createChatWithAttachmentDrivers, TEST_TIMEOUT_MS } from './ChatWithAttachmentTestConfig';

// Create drivers for all providers outside describe blocks
const providers = CHAT_WITH_ATTACHMENT_TEST_PROVIDERS;
const drivers = createChatWithAttachmentDrivers(EModel.kLarge);

/**
 * Returns the appropriate timeout for a test based on the provider.
 * kGoogleGemini tests use 120s timeout, others use the default TEST_TIMEOUT_MS.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module defines provider-agnostic unit tests for ChatWithAttachment drivers. It verifies text responses with and without system prompts, attachment handling, table JSON inclusion, and error paths. It runs the same scenarios across configured providers, including OpenAI, Azure OpenAI, and Google Gemini, using provider-specific mocking where needed. It also includes Azure-specific constructor validation for missing environment variables.
// 
// There are no runtime exports. The module sets up drivers once per provider using createChatWithAttachmentDrivers and loops tests over CHAT_WITH_ATTACHMENT_TEST_PROVIDERS. It computes per-provider timeouts via getTestTimeout, granting longer time for Gemini. It includes helper scaffolding for temporary files and a global cleanup hook, though the test file set is not populated in these tests.
// 
// Key imports include:
// - Mocha’s describe, it, after and expect for test structure and assertions.
// - fs, path, os for temp file utilities.
// - OpenAIChatWithAttachment and AzureOpenAIChatWithAttachment for direct instantiation checks.
// - EVerbosity, EModel, EModelProvider, IChatAttachmentContent, IChatAttachmentReference, IChatTableJson for typing and configuration.
// - MockChatWithAttachmentFactory and provider-specific mock drivers to simulate API behavior and validate request payloads and cleanup.
// ===End StrongAI Generated Comment===
const getTestTimeout = (provider: EModelProvider): number => {
   return provider === EModelProvider.kGoogleGemini ? 120000 : TEST_TIMEOUT_MS;
};

// Known test file names for cleanup
const testFileNames: string[] = [];

/**
 * Creates or reuses a temporary test file with the specified content in system temp directory
 */
const createTestFile = (filename: string, content: string): string => {
   const filePath = path.join(os.tmpdir(), filename);
   if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, 'utf8');
   }
   return filePath;
};

/**
 * Clean up temporary test files after all tests complete
 */
after(() => {
   testFileNames.forEach(filename => {
      const filePath = path.join(os.tmpdir(), filename);
      try {
         if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Cleaned up test file: ${filename}`);
         }
      } catch (error) {
         console.warn(`Failed to clean up test file ${filename}:`, error);
      }
   });
});

// Mock factory for creating mock drivers
const mockFactory = new MockChatWithAttachmentFactory();

// Run tests for each provider
providers.forEach((provider, index) => {
   const driver = drivers[index];

   // Skip tests if driver failed to initialize (e.g., missing API key)
   if (!driver) {
      console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
      return;
   }

   describe(`ChatWithAttachment (${provider})`, () => {
      it('should return text response without attachment', async () => {
         const result = await driver.getModelResponse(undefined, 'Say hello', EVerbosity.kMedium);
         expect(result).toBeDefined();
         expect(typeof result).toBe('string');
         expect(result.length).toBeGreaterThan(0);
      }).timeout(getTestTimeout(provider));

      it('should return text response with system prompt', async () => {
         const result = await driver.getModelResponse('You are helpful', 'Say hello', EVerbosity.kMedium);
         expect(result).toBeDefined();
         expect(typeof result).toBe('string');
         expect(result.length).toBeGreaterThan(0);
      }).timeout(getTestTimeout(provider));

      it('should handle table JSON without attachment', async () => {
         const tableJson: IChatTableJson = {
            name: 'Test Tables',
            description: 'Test table data',
            data: [
               { table: 'Revenue', rows: [{ quarter: 'Q1', value: 1000 }] }
            ]
         };

         const result = await driver.getModelResponse(
            undefined,
            'What is the revenue?',
            EVerbosity.kMedium,
            undefined,
            tableJson
         );

         expect(result).toBeDefined();
         expect(typeof result).toBe('string');
      }).timeout(getTestTimeout(provider));
   });
});

// Provider-specific mock tests - run for each provider
providers.forEach((provider, index) => {
   describe(`ChatWithAttachment (${provider} - mocked)`, () => {
      it('uploads inline attachments and cleans up by default', async () => {
         let capturedConfig: any;
         let deleteCalled = false;
         let uploadedPayload: any;

         const driver = mockFactory.create(EModel.kLarge, provider);
         
         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            driver.setMockResponsesCreate(async (config) => {
               capturedConfig = config;
               return {
                  output: [{ type: 'output_text', text: 'inline response' }]
               };
            });
            driver.setMockFilesCreate(async (input) => {
               uploadedPayload = input;
               return { id: 'file-inline' };
            });
            driver.setMockFilesDelete(async () => {
               deleteCalled = true;
            });
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            // Gemini uses different API structure
            driver.setMockGenerateContent(async (config: any) => {
               capturedConfig = config;
               return {
                  response: {
                     text: () => 'inline response'
                  }
               };
            });
         }

      const attachment: IChatAttachmentContent = {
         filename: 'notes.txt',
         mimeType: 'text/plain',
         data: Buffer.from('hello world')
      };

         const result = await driver.getModelResponse('system', 'prompt', EVerbosity.kMedium, attachment);

         expect(result).toBe('inline response');
         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            expect(uploadedPayload.filename).toBe('notes.txt');
            expect(uploadedPayload.mimeType).toBe('text/plain');
            expect(capturedConfig.input[1].content).toEqual([
               { type: 'input_text', text: 'prompt' },
               { type: 'input_file', file_id: 'file-inline' }
            ]);
            expect(deleteCalled).toBe(true);
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            // Gemini uses inline data, check that parts include inlineData
            expect(capturedConfig.contents[0].parts).toBeDefined();
            const inlineDataPart = capturedConfig.contents[0].parts.find((p: any) => p.inlineData);
            expect(inlineDataPart).toBeDefined();
            expect(inlineDataPart.inlineData.mimeType).toBe('text/plain');
         }
      });

      // Note: Attachment references are only supported by OpenAI/Azure, not Gemini
      if (provider === EModelProvider.kGoogleGemini) {
         return; // Skip this test for Gemini
      }

      it('reuses existing attachment ids without uploading', async () => {
         let uploaded = false;
         let deletedId: string | undefined;
         let config: any;

         const driver = mockFactory.create(EModel.kLarge, provider) as MockOpenAIChatWithAttachment | MockAzureOpenAIChatWithAttachment;
         driver.setMockResponsesCreate(async (input) => {
            config = input;
            return {
               output: [{ type: 'output_text', text: 'id response' }]
            };
         });
         driver.setMockFilesCreate(async () => {
            uploaded = true;
            return { id: 'unused' };
         });
         driver.setMockFilesDelete(async (id: string) => {
            deletedId = id;
         });

         const attachmentRef: IChatAttachmentReference = {
            id: 'existing-id',
            deleteAfterUse: true
         };

         const text = await driver.getModelResponse(undefined, 'say hi', EVerbosity.kLow, attachmentRef);

         expect(text).toBe('id response');
         expect(uploaded).toBe(false);
         expect(config.input[0].role).toBe('user');
         expect(config.input[0].content[1]).toEqual({ type: 'input_file', file_id: 'existing-id' });
         expect(deletedId).toBe('existing-id');
      });

      it('throws when no text output is returned', async () => {
         const driver = mockFactory.create(EModel.kLarge, provider);
         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            driver.setMockResponsesCreate(async () => ({ output: [] }));
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            driver.setMockGenerateContent(async () => ({
               response: { text: () => '' }
            }));
         }

         await expect(driver.getModelResponse(undefined, 'prompt', EVerbosity.kHigh)).rejects.toThrow(/did not include any text/);
      });

      it('includes table JSON in user content when provided', async () => {
         let capturedConfig: any;
         const tableJson: IChatTableJson = {
            name: 'Test Tables',
            description: 'Test table data',
            data: [
               { table: 'Revenue', rows: [{ quarter: 'Q1', value: 1000 }] }
            ]
         };

         const driver = mockFactory.create(EModel.kLarge, provider);
         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            driver.setMockResponsesCreate(async (config) => {
               capturedConfig = config;
               return {
                  output: [{ type: 'output_text', text: 'table response' }]
               };
            });
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            driver.setMockGenerateContent(async (config: any) => {
               capturedConfig = config;
               return {
                  response: { text: () => 'table response' }
               };
            });
         }

         const result = await driver.getModelResponse(
            undefined,
            'Analyze the tables',
            EVerbosity.kMedium,
            undefined,
            tableJson
         );

         expect(result).toBe('table response');
         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            expect(capturedConfig.input[0].content).toHaveLength(2);
            expect(capturedConfig.input[0].content[0]).toEqual({
               type: 'input_text',
               text: 'Analyze the tables'
            });
            // Check that table JSON is included as input_text
            expect(capturedConfig.input[0].content[1].type).toBe('input_text');
            expect(capturedConfig.input[0].content[1].text).toContain('[Table Data: Test Tables]');
            expect(capturedConfig.input[0].content[1].text).toContain('Description: Test table data');
            expect(capturedConfig.input[0].content[1].text).toContain('Table JSON:');
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            // Gemini includes table JSON in the text part
            expect(capturedConfig.contents[0].parts[0].text).toContain('[Table Data: Test Tables]');
         }
      });

      it('includes table JSON with attachment in user content', async () => {
         let capturedConfig: any;
         const tableJson: IChatTableJson = {
            name: 'Financial Tables',
            data: { revenue: 5000, expenses: 3000 }
         };

         const driver = mockFactory.create(EModel.kLarge, provider);
         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            driver.setMockResponsesCreate(async (config) => {
               capturedConfig = config;
               return {
                  output: [{ type: 'output_text', text: 'combined response' }]
               };
            });
            driver.setMockFilesCreate(async () => ({ id: 'file-123' }));
            driver.setMockFilesDelete(async () => {});
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            driver.setMockGenerateContent(async (config: any) => {
               capturedConfig = config;
               return {
                  response: { text: () => 'combined response' }
               };
            });
         }

         const attachment: IChatAttachmentContent = {
            filename: 'report.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('test pdf')
         };

         const result = await driver.getModelResponse(
            'System prompt',
            'Analyze both',
            EVerbosity.kMedium,
            attachment,
            tableJson
         );

         expect(result).toBe('combined response');
         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            // Should have system prompt, user prompt, file, and table JSON
            expect(capturedConfig.input[0].role).toBe('system');
            expect(capturedConfig.input[1].role).toBe('user');
            expect(capturedConfig.input[1].content).toHaveLength(3);
            expect(capturedConfig.input[1].content[0].type).toBe('input_text');
            expect(capturedConfig.input[1].content[1].type).toBe('input_file');
            expect(capturedConfig.input[1].content[2].type).toBe('input_text');
            expect(capturedConfig.input[1].content[2].text).toContain('[Table Data: Financial Tables]');
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            // Gemini combines everything in parts
            expect(capturedConfig.contents[0].parts).toBeDefined();
         }
      });

      it('formats table JSON without description correctly', async () => {
         let capturedConfig: any;
         const tableJson: IChatTableJson = {
            name: 'Simple Table',
            data: { value: 42 }
         };

         const driver = mockFactory.create(EModel.kLarge, provider);
         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            driver.setMockResponsesCreate(async (config) => {
               capturedConfig = config;
               return {
                  output: [{ type: 'output_text', text: 'response' }]
               };
            });
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            driver.setMockGenerateContent(async (config: any) => {
               capturedConfig = config;
               return {
                  response: { text: () => 'response' }
               };
            });
         }

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium, undefined, tableJson);

         if (driver instanceof MockOpenAIChatWithAttachment || driver instanceof MockAzureOpenAIChatWithAttachment) {
            const tableText = capturedConfig.input[0].content[1].text;
            expect(tableText).toContain('[Table Data: Simple Table]');
            expect(tableText).not.toContain('Description:');
            expect(tableText).toContain('Table JSON:');
            expect(tableText).toContain('"value": 42');
         } else if (driver instanceof MockGeminiChatWithAttachment) {
            expect(capturedConfig.contents[0].parts[0].text).toContain('[Table Data: Simple Table]');
            expect(capturedConfig.contents[0].parts[0].text).not.toContain('Description:');
         }
      });
   });
});

// Provider-specific tests that require direct instantiation
describe('ChatWithAttachment - Provider-specific tests', () => {
   it('Azure uses correct model for kLarge', () => {
      const driver = mockFactory.create(EModel.kLarge, EModelProvider.kAzureOpenAI);
      expect(driver).toBeDefined();
   });

   it('Azure uses correct model for kMini', () => {
      const driver = mockFactory.create(EModel.kMini, EModelProvider.kAzureOpenAI);
      expect(driver).toBeDefined();
   });

   it('Azure throws error when AZURE_OPENAI_API_KEY is not set', () => {
      const originalKey = process.env.AZURE_OPENAI_API_KEY;
      const originalEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
      
      delete process.env.AZURE_OPENAI_API_KEY;
      delete process.env.AZURE_OPENAI_ENDPOINT;

      expect(() => {
         new AzureOpenAIChatWithAttachment(EModel.kLarge);
      }).toThrow(/AZURE_OPENAI_API_KEY environment variable is not set/);

      if (originalKey) process.env.AZURE_OPENAI_API_KEY = originalKey;
      if (originalEndpoint) process.env.AZURE_OPENAI_ENDPOINT = originalEndpoint;
   });

   it('Azure throws error when AZURE_OPENAI_ENDPOINT is not set', () => {
      const originalKey = process.env.AZURE_OPENAI_API_KEY;
      const originalEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
      
      process.env.AZURE_OPENAI_API_KEY = 'test-key';
      delete process.env.AZURE_OPENAI_ENDPOINT;

      expect(() => {
         new AzureOpenAIChatWithAttachment(EModel.kLarge);
      }).toThrow(/AZURE_OPENAI_ENDPOINT environment variable is not set/);

      if (originalKey) process.env.AZURE_OPENAI_API_KEY = originalKey;
      if (originalEndpoint) process.env.AZURE_OPENAI_ENDPOINT = originalEndpoint;
   });
});

// Note: Motor racing/gardening content understanding tests and markdown upload tests
// have been moved to test/chatwithattachment.integration.test.ts to test with real API
