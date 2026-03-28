/**
 * @module ChatWithAttachment.OpenAI.test
 * 
 * Comprehensive unit tests for OpenAI and Azure OpenAI ChatWithAttachment implementations.
 * Tests cover all code paths including error handling, data type conversions, and edge cases.
 */
// Copyright (c) 2025, 2026 Jon Verrier

// ===Start StrongAI Generated Comment (20260219)===
// This module contains comprehensive Mocha tests for the OpenAIChatWithAttachment and AzureOpenAIChatWithAttachment implementations. It validates construction behavior, environment variable requirements, client and model injection, and all response parsing paths. It exercises getModelResponse across multiple output shapes (output_text, text, message with string or array content, string outputs, and generic content) and ensures proper error handling when no text is returned. It verifies verbosity mapping and inclusion of a system prompt. It thoroughly tests attachment workflows: uploading various data types (Buffer, ArrayBuffer, Uint8Array, string, File, Blob), rejecting unsupported types, warning on non-PDF extensions, deleting by id, honoring deleteAfterUse, handling pre-existing attachment references, and gracefully warning on deletion failures. It also checks inclusion and formatting of tableJson alongside prompts and attachments. For Azure, it confirms model selection (gpt-4.1 and gpt-4.1-mini) and equivalent behaviors. Key imports include OpenAIChatWithAttachment, AzureOpenAIChatWithAttachment, enums EVerbosity and EModel, error types InvalidStateError, InvalidParameterError, InvalidOperationError, and interfaces IChatAttachmentContent, IChatAttachmentReference, IChatTableJson. The tests mock the OpenAI client responses and file APIs.
// ===End StrongAI Generated Comment===

import { describe, it } from 'mocha';
import { expect } from 'expect';
import { OpenAIChatWithAttachment } from '../src/ChatWithAttachment.OpenAI';
import { AzureOpenAIChatWithAttachment } from '../src/ChatWithAttachment.AzureOpenAI';
import { EVerbosity, EModel, InvalidStateError, InvalidParameterError, InvalidOperationError, IChatAttachmentContent, IChatAttachmentReference, IChatTableJson } from '../src/entry';
import { ChatAttachmentInput } from '../src/ChatWithAttachment';

const TEST_TIMEOUT_MS = 60000;

describe('OpenAIChatWithAttachment', () => {
   describe('Constructor', () => {
      it('should throw error when OPENAI_API_KEY is not set', () => {
         const originalKey = process.env.OPENAI_API_KEY;
         delete process.env.OPENAI_API_KEY;

         expect(() => {
            new OpenAIChatWithAttachment();
         }).toThrow(/OPENAI_API_KEY environment variable is not set/);

         if (originalKey) process.env.OPENAI_API_KEY = originalKey;
      });

      it('should use provided client when provided', () => {
         const mockClient: any = {
            responses: {
               create: async () => ({ output: [{ type: 'output_text', text: 'test' }] })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         expect(driver).toBeDefined();
      });

      it('should use provided model when provided', () => {
         const mockClient: any = {
            responses: {
               create: async () => ({ output: [{ type: 'output_text', text: 'test' }] })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient, model: 'gpt-4-custom' });
         expect(driver).toBeDefined();
      });
   });

   describe('getModelResponse', () => {
      it('should handle response with output_text type', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response text' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const result = await driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium);
         expect(result).toBe('response text');
      });

      it('should handle response with text type', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'text', text: 'text response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const result = await driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium);
         expect(result).toBe('text response');
      });

      it('should handle response with message type and string content', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'message', content: 'message content' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const result = await driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium);
         expect(result).toBe('message content');
      });

      it('should handle response with message type and array content', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{
                     type: 'message',
                     content: [
                        { type: 'text', text: 'array text' }
                     ]
                  }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const result = await driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium);
         expect(result).toBe('array text');
      });

      it('should handle response with string output', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: ['string output']
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const result = await driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium);
         expect(result).toBe('string output');
      });

      it('should handle response with content property', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ content: 'content property' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const result = await driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium);
         expect(result).toBe('content property');
      });

      it('should throw error when no text output is returned', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: []
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         await expect(driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium))
            .rejects.toThrow(InvalidOperationError);
         await expect(driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium))
            .rejects.toThrow(/did not include any text output/);
      });

      it('should handle null items in output array', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [null, undefined, { type: 'output_text', text: 'valid text' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const result = await driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium);
         expect(result).toBe('valid text');
      });

      it('should include system prompt in input', async () => {
         let capturedInput: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedInput = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         await driver.getModelResponse('system prompt', 'user prompt', EVerbosity.kMedium);

         expect(capturedInput.input[0].role).toBe('system');
         expect(capturedInput.input[0].content[0].type).toBe('input_text');
         expect(capturedInput.input[0].content[0].text).toBe('system prompt');
      });

      it('should map verbosity levels correctly', async () => {
         let capturedInput: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedInput = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kLow);
         expect(capturedInput.text.verbosity).toBe('low');

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium);
         expect(capturedInput.text.verbosity).toBe('medium');

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kHigh);
         expect(capturedInput.text.verbosity).toBe('high');
      });
   });

   describe('uploadAttachment', () => {
      it('should upload Buffer data', async () => {
         let capturedFile: any;
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async (input: any) => {
                  capturedFile = input;
                  return { id: 'file-123' };
               },
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('test content')
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-123');
         expect(capturedFile.file).toBeDefined();
         expect(capturedFile.purpose).toBe('assistants');
      });

      it('should upload ArrayBuffer data', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-456' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const arrayBuffer = new ArrayBuffer(8);
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: arrayBuffer
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-456');
      });

      it('should upload Uint8Array data', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-789' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const uint8Array = new Uint8Array([1, 2, 3, 4]);
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: uint8Array
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-789');
      });

      it('should upload string data', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-string' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: 'string content'
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-string');
      });

      it('should handle File object', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-file' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const file = new File([new Uint8Array([1, 2, 3])], 'test.pdf', { type: 'application/pdf' });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: file as any // File is handled by implementation but not in type definition
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-file');
      });

      it('should handle Blob object', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-blob' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const blob = new Blob([new Uint8Array([1, 2, 3])], { type: 'application/pdf' });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: blob as any // Blob is handled by implementation but not in type definition
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-blob');
      });

      it('should throw error for unsupported data type', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachment: any = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: { unsupported: 'type' }
         };

         await expect(driver.uploadAttachment(attachment))
            .rejects.toThrow(InvalidParameterError);
         await expect(driver.uploadAttachment(attachment))
            .rejects.toThrow(/Unsupported attachment data type/);
      });

      it('should warn for non-PDF file extensions', async () => {
         const originalWarn = console.warn;
         let warnCalled = false;
         console.warn = () => {
            warnCalled = true;
         };

         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.txt',
            mimeType: 'text/plain',
            data: Buffer.from('test')
         };

         await driver.uploadAttachment(attachment);
         expect(warnCalled).toBe(true);
         console.warn = originalWarn;
      });
   });

   describe('deleteAttachment', () => {
      it('should delete attachment by id', async () => {
         let deletedId: string | undefined;
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async (id: string) => {
                  deletedId = id;
               }
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         await driver.deleteAttachment('file-123');
         expect(deletedId).toBe('file-123');
      });
   });

   describe('getModelResponse with attachments', () => {
      it('should upload and delete attachment when deleteAfterUse is true', async () => {
         let uploadedId: string | undefined;
         let deletedId: string | undefined;
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => {
                  uploadedId = 'file-uploaded';
                  return { id: uploadedId };
               },
               delete: async (id: string) => {
                  deletedId = id;
               }
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('test'),
            deleteAfterUse: true
         };

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium, attachment);
         expect(uploadedId).toBe('file-uploaded');
         expect(deletedId).toBe('file-uploaded');
      });

      it('should upload but not delete attachment when deleteAfterUse is false', async () => {
         let uploadedId: string | undefined;
         let deletedId: string | undefined;
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => {
                  uploadedId = 'file-uploaded';
                  return { id: uploadedId };
               },
               delete: async (id: string) => {
                  deletedId = id;
               }
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('test'),
            deleteAfterUse: false
         };

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium, attachment);
         expect(uploadedId).toBe('file-uploaded');
         expect(deletedId).toBeUndefined();
      });

      it('should use existing attachment id without uploading', async () => {
         let uploaded = false;
         let deletedId: string | undefined;
         let capturedInput: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedInput = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => {
                  uploaded = true;
                  return { id: 'should-not-upload' };
               },
               delete: async (id: string) => {
                  deletedId = id;
               }
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachmentRef: IChatAttachmentReference = {
            id: 'existing-id',
            deleteAfterUse: true
         };

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium, attachmentRef);
         expect(uploaded).toBe(false);
         expect(capturedInput.input[0].content[1].file_id).toBe('existing-id');
         expect(deletedId).toBe('existing-id');
      });

      it('should not delete attachment reference when deleteAfterUse is false', async () => {
         let deletedId: string | undefined;
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async (id: string) => {
                  deletedId = id;
               }
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachmentRef: IChatAttachmentReference = {
            id: 'existing-id',
            deleteAfterUse: false
         };

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium, attachmentRef);
         expect(deletedId).toBeUndefined();
      });

      it('should handle deletion errors gracefully', async () => {
         const originalWarn = console.warn;
         let warnCalled = false;
         console.warn = () => {
            warnCalled = true;
         };

         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {
                  throw new Error('Deletion failed');
               }
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('test'),
            deleteAfterUse: true
         };

         const result = await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium, attachment);
         expect(result).toBe('response');
         expect(warnCalled).toBe(true);
         console.warn = originalWarn;
      });
   });

   describe('getModelResponse with tableJson', () => {
      it('should include table JSON in input', async () => {
         let capturedInput: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedInput = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const tableJson: IChatTableJson = {
            name: 'Test Table',
            description: 'Test description',
            data: { key: 'value' }
         };

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium, undefined, tableJson);

         const userContent = capturedInput.input[0].content;
         expect(userContent).toHaveLength(2);
         expect(userContent[0].type).toBe('input_text');
         expect(userContent[1].type).toBe('input_text');
         expect(userContent[1].text).toContain('[Table Data: Test Table]');
         expect(userContent[1].text).toContain('Description: Test description');
         expect(userContent[1].text).toContain('Table JSON:');
      });

      it('should format table JSON without description', async () => {
         let capturedInput: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedInput = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const tableJson: IChatTableJson = {
            name: 'Simple Table',
            data: { value: 42 }
         };

         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium, undefined, tableJson);

         const tableText = capturedInput.input[0].content[1].text;
         expect(tableText).toContain('[Table Data: Simple Table]');
         expect(tableText).not.toContain('Description:');
         expect(tableText).toContain('Table JSON:');
      });

      it('should include both attachment and table JSON', async () => {
         let capturedInput: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedInput = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new OpenAIChatWithAttachment({ client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('test')
         };
         const tableJson: IChatTableJson = {
            name: 'Table',
            data: { data: 'value' }
         };

         await driver.getModelResponse('system', 'prompt', EVerbosity.kMedium, attachment, tableJson);

         expect(capturedInput.input[0].role).toBe('system');
         expect(capturedInput.input[1].role).toBe('user');
         expect(capturedInput.input[1].content).toHaveLength(3);
         expect(capturedInput.input[1].content[0].type).toBe('input_text');
         expect(capturedInput.input[1].content[1].type).toBe('input_file');
         expect(capturedInput.input[1].content[2].type).toBe('input_text');
      });
   });
});

describe('AzureOpenAIChatWithAttachment', () => {
   describe('Constructor', () => {
      it('should throw error when AZURE_OPENAI_API_KEY is not set', () => {
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

      it('should throw error when AZURE_OPENAI_ENDPOINT is not set', () => {
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

      it('should use correct model for kLarge', () => {
         const mockClient: any = {
            responses: {
               create: async () => ({ output: [{ type: 'output_text', text: 'test' }] })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         expect(driver).toBeDefined();
      });

      it('should use correct model for kMini', () => {
         const mockClient: any = {
            responses: {
               create: async () => ({ output: [{ type: 'output_text', text: 'test' }] })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kMini, { client: mockClient });
         expect(driver).toBeDefined();
      });

      it('should use provided client when provided', () => {
         const mockClient: any = {
            responses: {
               create: async () => ({ output: [{ type: 'output_text', text: 'test' }] })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         expect(driver).toBeDefined();
      });
   });

   describe('getModelResponse', () => {
      it('should use correct model in API call', async () => {
         let capturedConfig: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedConfig = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium);
         expect(capturedConfig.model).toBe('gpt-4.1');
      });

      it('should use mini model for kMini', async () => {
         let capturedConfig: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedConfig = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kMini, { client: mockClient });
         await driver.getModelResponse(undefined, 'prompt', EVerbosity.kMedium);
         expect(capturedConfig.model).toBe('gpt-4.1-mini');
      });

      it('should throw error when no text output is returned', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: []
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         await expect(driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium))
            .rejects.toThrow(InvalidOperationError);
         await expect(driver.getModelResponse(undefined, 'test prompt', EVerbosity.kMedium))
            .rejects.toThrow(/did not include any text output/);
      });
   });

   describe('uploadAttachment', () => {
      it('should upload Buffer data', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('test content')
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-123');
      });

      it('should upload ArrayBuffer data', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-456' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const arrayBuffer = new ArrayBuffer(8);
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: arrayBuffer
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-456');
      });

      it('should upload Uint8Array data', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-789' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const uint8Array = new Uint8Array([1, 2, 3, 4]);
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: uint8Array
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-789');
      });

      it('should upload string data', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-string' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: 'string content'
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-string');
      });

      it('should handle File object', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-file' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const file = new File([new Uint8Array([1, 2, 3])], 'test.pdf', { type: 'application/pdf' });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: file as any // File is handled by implementation but not in type definition
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-file');
      });

      it('should handle Blob object', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-blob' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const blob = new Blob([new Uint8Array([1, 2, 3])], { type: 'application/pdf' });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: blob as any // Blob is handled by implementation but not in type definition
         };

         const result = await driver.uploadAttachment(attachment);
         expect(result.id).toBe('file-blob');
      });

      it('should throw error for unsupported data type', async () => {
         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const attachment: any = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: { unsupported: 'type' }
         };

         await expect(driver.uploadAttachment(attachment))
            .rejects.toThrow(InvalidParameterError);
         await expect(driver.uploadAttachment(attachment))
            .rejects.toThrow(/Unsupported attachment data type/);
      });

      it('should warn for non-PDF file extensions', async () => {
         const originalWarn = console.warn;
         let warnCalled = false;
         console.warn = () => {
            warnCalled = true;
         };

         const mockClient: any = {
            responses: {
               create: async () => ({
                  output: [{ type: 'output_text', text: 'response' }]
               })
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.txt',
            mimeType: 'text/plain',
            data: Buffer.from('test')
         };

         await driver.uploadAttachment(attachment);
         expect(warnCalled).toBe(true);
         console.warn = originalWarn;
      });
   });

   describe('getModelResponse with attachments and tableJson', () => {
      it('should include both attachment and table JSON', async () => {
         let capturedInput: any;
         const mockClient: any = {
            responses: {
               create: async (config: any) => {
                  capturedInput = config;
                  return {
                     output: [{ type: 'output_text', text: 'response' }]
                  };
               }
            },
            files: {
               create: async () => ({ id: 'file-123' }),
               delete: async () => {}
            }
         };

         const driver = new AzureOpenAIChatWithAttachment(EModel.kLarge, { client: mockClient });
         const attachment: IChatAttachmentContent = {
            filename: 'test.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('test')
         };
         const tableJson: IChatTableJson = {
            name: 'Table',
            data: { data: 'value' }
         };

         await driver.getModelResponse('system', 'prompt', EVerbosity.kMedium, attachment, tableJson);

         expect(capturedInput.input[0].role).toBe('system');
         expect(capturedInput.input[1].role).toBe('user');
         expect(capturedInput.input[1].content).toHaveLength(3);
         expect(capturedInput.input[1].content[0].type).toBe('input_text');
         expect(capturedInput.input[1].content[1].type).toBe('input_file');
         expect(capturedInput.input[1].content[2].type).toBe('input_text');
      });
   });
});
