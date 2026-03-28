/**
 * @module ChatWithAttachment.OpenAI
 *
 * Provides an OpenAI implementation of the IChatWithAttachmentDriver
 * abstraction. The driver uploads attachments when required and
 * executes prompts using the Responses API.
 */

// ===Start StrongAI Generated Comment (20260219)===
// Provides an OpenAI-backed implementation of the IChatWithAttachmentDriver abstraction. It sends prompts through the OpenAI Responses API and optionally attaches a file and/or structured table data. The driver can create its own OpenAI client using the OPENAI_API_KEY environment variable or accept a preconfigured client. The default model is gpt-4.1-mini, but a custom model can be passed.
// 
// Main export: OpenAIChatWithAttachment. Its getModelResponse builds a Responses API input with optional system text, user text, an input_file reference, and formatted table JSON. It maps EVerbosity to OpenAI’s text verbosity settings and returns the first textual output found, throwing InvalidOperationError if none is present. It supports attachments as raw content or as an existing file reference. When uploading, uploadAttachment converts various data types to File/Blob, warns for non-PDF files, and creates a Files API object with purpose assistants. deleteAttachment removes uploaded files and is invoked automatically when deleteAfterUse is set. Helpers include isAttachmentContent, buildInput, formatTableJson, and extractTextFromOutput.
// 
// Key imports: OpenAI SDK, EVerbosity and error types (InvalidStateError, InvalidParameterError, InvalidOperationError), and chat/attachment type interfaces.
// ===End StrongAI Generated Comment===

import OpenAI from 'openai';
import { EVerbosity, InvalidStateError, InvalidParameterError, InvalidOperationError } from './entry';
import { ChatAttachmentInput, IChatAttachmentContent, IChatAttachmentReference, IChatWithAttachmentDriver, IChatTableJson } from './ChatWithAttachment';

const DEFAULT_MODEL = 'gpt-4.1-mini';

/**
 * Maps library verbosity settings to OpenAI verbosity strings.
 */
const VERBOSITY_MAP: Record<EVerbosity, 'low' | 'medium' | 'high'> = {
   [EVerbosity.kLow]: 'low',
   [EVerbosity.kMedium]: 'medium',
   [EVerbosity.kHigh]: 'high'
};

/**
 * OpenAI-backed chat driver with attachment support.
 */
export class OpenAIChatWithAttachment extends IChatWithAttachmentDriver {
   private readonly openai: OpenAI;
   private readonly model: string;

   constructor(options?: { client?: OpenAI; model?: string }) {
      super();
      this.model = options?.model ?? DEFAULT_MODEL;

      if (options?.client) {
         this.openai = options.client;
      } else {
         const apiKey = process.env.OPENAI_API_KEY;
         if (!apiKey) {
            throw new InvalidStateError('OPENAI_API_KEY environment variable is not set');
         }
         this.openai = new OpenAI({ apiKey });
      }
   }

   async getModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      attachment?: ChatAttachmentInput,
      tableJson?: IChatTableJson
   ): Promise<string> {
      let fileId: string | undefined;
      let shouldDeleteAfterUse = false;

      if (attachment) {
         if (this.isAttachmentContent(attachment)) {
            const reference = await this.uploadAttachment(attachment);
            fileId = reference.id;
            shouldDeleteAfterUse = attachment.deleteAfterUse ?? true;
         } else {
            fileId = attachment.id;
            shouldDeleteAfterUse = attachment.deleteAfterUse ?? false;
         }
      }

      try {
         const input = this.buildInput(systemPrompt, userPrompt, fileId, tableJson);
         const response = await this.openai.responses.create({
            model: this.model,
            input,
            text: { verbosity: VERBOSITY_MAP[verbosity] }
         });

         const outputText = this.extractTextFromOutput((response as any).output ?? []);
         if (!outputText) {
            throw new InvalidOperationError('OpenAI response did not include any text output');
         }
         return outputText;
      } finally {
         if (shouldDeleteAfterUse && fileId) {
            try {
               await this.deleteAttachment(fileId);
            } catch (error) {
               // Swallow deletion errors to avoid masking the primary response.
               console.warn('Failed to delete attachment', error);
            }
         }
      }
   }

   /**
    * Uploads an attachment to OpenAI's Files API.
    * 
    * Note: When using files with the Responses API (input_file), only PDF files are accepted.
    * This is a limitation of the Responses API's file attachment feature, which uses a
    * different extraction technique than vector stores. For text/markdown files, consider
    * converting them to PDF first, or using a different API approach.
    * 
    * @param attachment - The file attachment to upload
    * @returns A reference to the uploaded file
    * @throws Error if the file type is not supported or upload fails
    */
   async uploadAttachment(attachment: IChatAttachmentContent): Promise<IChatAttachmentReference> {
      // Validate file extension for Responses API compatibility
      // The Responses API input_file only accepts PDF files
      const fileExtension = attachment.filename.toLowerCase().split('.').pop();
      if (fileExtension !== 'pdf') {
         console.warn(
            `Warning: File "${attachment.filename}" has extension .${fileExtension}. ` +
            `The Responses API only accepts PDF files for message attachments. ` +
            `Consider converting to PDF before uploading.`
         );
      }

      // Convert data to a format the OpenAI SDK expects (File object)
      let fileData: File | Blob;
      
      if (attachment.data instanceof File) {
         fileData = attachment.data;
      } else if (attachment.data instanceof Blob) {
         fileData = attachment.data;
      } else {
         // Convert Buffer, ArrayBuffer, Uint8Array, or string to Blob/File
         let buffer: Buffer;
         if (Buffer.isBuffer(attachment.data)) {
            buffer = attachment.data;
         } else if (attachment.data instanceof ArrayBuffer) {
            buffer = Buffer.from(attachment.data);
         } else if (attachment.data instanceof Uint8Array) {
            buffer = Buffer.from(attachment.data);
         } else if (typeof attachment.data === 'string') {
            buffer = Buffer.from(attachment.data, 'utf8');
         } else {
            throw new InvalidParameterError(`Unsupported attachment data type: ${typeof attachment.data}`);
         }

         // Create a File object (available in Node.js 18+)
         // If File is not available, fall back to Blob
         // Convert Buffer to Uint8Array for compatibility with BlobPart type
         const uint8Array = new Uint8Array(buffer);
         if (typeof File !== 'undefined') {
            fileData = new File([uint8Array], attachment.filename, { type: attachment.mimeType });
         } else {
            // Fallback to Blob if File is not available
            fileData = new Blob([uint8Array], { type: attachment.mimeType });
         }
      }

      // Use 'assistants' purpose for files that will be used with Responses API
      // Note: The actual file type restrictions are enforced by the Responses API,
      // not by the Files API purpose parameter
      const response = await this.openai.files.create({
         file: fileData,
         purpose: 'assistants'
      });

      return {
         id: (response as any).id,
      };
   }

   async deleteAttachment(attachmentId: string): Promise<void> {
      await this.openai.files.delete(attachmentId);
   }

   private isAttachmentContent(attachment: ChatAttachmentInput): attachment is IChatAttachmentContent {
      return (attachment as IChatAttachmentContent).data !== undefined;
   }

   private buildInput(systemPrompt: string | undefined, userPrompt: string, fileId: string | undefined, tableJson?: IChatTableJson) {
      const input: any[] = [];

      if (systemPrompt) {
         input.push({
            role: 'system',
            content: [
               {
                  type: 'input_text',
                  text: systemPrompt
               }
            ]
         });
      }

      const userContent: any[] = [
         {
            type: 'input_text',
            text: userPrompt
         }
      ];

      if (fileId) {
         userContent.push({
            type: 'input_file',
            file_id: fileId
         });
      }

      if (tableJson) {
         // Format table JSON as a structured text input
         // This provides better fidelity than PDF extraction for tabular data
         const tableJsonText = this.formatTableJson(tableJson);
         userContent.push({
            type: 'input_text',
            text: tableJsonText
         });
      }

      input.push({
         role: 'user',
         content: userContent
      });

      return input;
   }

   /**
    * Formats table JSON data as a readable text string for inclusion in the prompt.
    * The formatted text includes the table name, description (if provided), and the JSON data.
    * 
    * @param tableJson The table JSON to format
    * @returns A formatted string representation of the table JSON
    */
   private formatTableJson(tableJson: IChatTableJson): string {
      const lines: string[] = [];
      
      lines.push(`\n[Table Data: ${tableJson.name}]`);
      
      if (tableJson.description) {
         lines.push(`Description: ${tableJson.description}`);
      }
      
      lines.push('Table JSON:');
      lines.push(JSON.stringify(tableJson.data, null, 2));
      
      return lines.join('\n');
   }

   private extractTextFromOutput(outputArr: any[]): string | null {
      for (const item of outputArr) {
         if (!item) {
            continue;
         }

         if (item.type === 'output_text' && typeof item.text === 'string') {
            return item.text;
         }

         if (item.type === 'text' && typeof item.text === 'string') {
            return item.text;
         }

         if (item.type === 'message' && item.content) {
            if (typeof item.content === 'string') {
               return item.content;
            }

            if (Array.isArray(item.content)) {
               for (const contentItem of item.content) {
                  if ((contentItem.type === 'text' || contentItem.type === 'output_text') && typeof contentItem.text === 'string') {
                     return contentItem.text;
                  }
               }
            }
         }

         if (typeof item === 'string') {
            return item;
         }

         if (item.content && typeof item.content === 'string') {
            return item.content;
         }
      }

      return null;
   }
}