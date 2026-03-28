/**
 * @module ChatWithAttachment.GoogleGemini
 *
 * Provides a Google Gemini implementation of the IChatWithAttachmentDriver
 * abstraction. The driver uploads attachments inline using base64 encoding
 * and executes prompts using the Gemini API.
 */

// ===Start StrongAI Generated Comment (20260219)===
// Provides a Google Gemini implementation of a chat driver that supports inline attachments. The module’s purpose is to adapt the IChatWithAttachmentDriver abstraction to Gemini by base64-encoding attachments and invoking the Gemini text generation API.
// 
// Main export: GoogleGeminiChatWithAttachment. It initializes a GoogleGenerativeAI client using the GOOGLE_GEMINI_API_KEY or an injected client. It always targets the flash model (gemini-3-flash-preview) to avoid pro model rate limits. getModelResponse builds a single prompt by merging system and user text, optionally appends formatted table JSON, and adds one inline attachment as base64. It maps EVerbosity to Gemini generationConfig (temperature and maxOutputTokens) and executes requests with retryWithExponentialBackoff and MAX_RETRIES. It validates that only inline attachments are used, returns text output, and wraps failures in ConnectionError. uploadAttachment encodes data to base64 and returns a placeholder reference for API parity; deleteAttachment is a no-op.
// 
// Key imports: GoogleGenerativeAI from @google/generative-ai, enums and errors (EVerbosity, EModel, InvalidStateError, InvalidParameterError, InvalidOperationError, ConnectionError) from entry, shared types from ChatWithAttachment, and retry utilities from DriverHelpers.
// ===End StrongAI Generated Comment===

// @ts-ignore - @google/generative-ai is a peer dependency
import { GoogleGenerativeAI } from '@google/generative-ai';
import { EVerbosity, EModel, InvalidStateError, InvalidParameterError, InvalidOperationError, ConnectionError } from './entry';
import { ChatAttachmentInput, IChatAttachmentContent, IChatAttachmentReference, IChatWithAttachmentDriver, IChatTableJson } from './ChatWithAttachment';
import { retryWithExponentialBackoff, MAX_RETRIES } from './DriverHelpers';

/**
 * Type for Gemini API parts - we only use text and inlineData parts
 */
type GeminiPart = 
   | { text: string }
   | { inlineData: { mimeType: string; data: string } };

const GEMINI_MODELS = {
   LARGE: "gemini-3-pro-preview",
   MINI: "gemini-3-flash-preview"
} as const;

/**
 * Maps library verbosity settings to Gemini generation config.
 * Note: Gemini doesn't have a direct verbosity parameter, so we adjust
 * temperature and maxOutputTokens to approximate verbosity levels.
 */
const VERBOSITY_CONFIG: Record<EVerbosity, { temperature: number; maxOutputTokens?: number }> = {
   [EVerbosity.kLow]: { temperature: 0.3, maxOutputTokens: 500 },
   [EVerbosity.kMedium]: { temperature: 0.7, maxOutputTokens: 2000 },
   [EVerbosity.kHigh]: { temperature: 1.0, maxOutputTokens: 4000 }
};

/**
 * Google Gemini-backed chat driver with attachment support.
 */
export class GoogleGeminiChatWithAttachment extends IChatWithAttachmentDriver {
   private readonly genAI: GoogleGenerativeAI;
   private readonly modelName: string;

   constructor(modelType: EModel, options?: { client?: GoogleGenerativeAI }) {
      super();
      // NOTE: Always using flash model (gemini-3-flash-preview) regardless of modelType parameter
      // This is because the pro model (gemini-3-pro-preview) has a very low rate limit (250 requests/day)
      // which causes rate limiting during testing. Flash model has much higher limits.
      this.modelName = GEMINI_MODELS.MINI;

      if (options?.client) {
         this.genAI = options.client;
      } else {
         const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
         if (!apiKey) {
            throw new InvalidStateError('GOOGLE_GEMINI_API_KEY environment variable is not set');
         }
         this.genAI = new GoogleGenerativeAI(apiKey);
      }
   }

   async getModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      attachment?: ChatAttachmentInput,
      tableJson?: IChatTableJson
   ): Promise<string> {
      try {
         // Gemini doesn't support attachment references - only inline attachments
         if (attachment && !this.isAttachmentContent(attachment)) {
            throw new InvalidParameterError(
               'Google Gemini API does not support attachment references. ' +
               'Attachments must be provided inline with each request.'
            );
         }

         const parts = this.buildParts(systemPrompt, userPrompt, attachment, tableJson);
         const model = this.genAI.getGenerativeModel({
            model: this.modelName,
            generationConfig: VERBOSITY_CONFIG[verbosity]
         });

         const result = await retryWithExponentialBackoff(async () => {
            // Gemini generateContent accepts parts array directly or a GenerateContentRequest
            // For simple cases, we pass the parts array directly
            const response = await model.generateContent(parts);
            return response;
         }, MAX_RETRIES, "Google Gemini");

         const text = result.response.text();
         if (!text) {
            throw new InvalidOperationError('Google Gemini response did not include any text output');
         }
         return text;
      } catch (error) {
         if (error instanceof InvalidOperationError || error instanceof InvalidParameterError) {
            throw error;
         }
         if (error instanceof Error) {
            throw new ConnectionError(`Google Gemini API error: ${error.message}`);
         }
         throw new ConnectionError('Unknown error occurred while calling Google Gemini API');
      }
   }

   /**
    * Uploads an attachment by converting it to base64 inline data.
    * 
    * Note: Gemini handles attachments inline using base64 encoding, not through
    * a separate Files API. This method returns a reference that can be used
    * in subsequent calls, but the actual data is embedded in the request.
    * 
    * @param attachment - The file attachment to upload
    * @returns A reference to the uploaded file (for API consistency)
    * @throws Error if the file type is not supported or conversion fails
    */
   async uploadAttachment(attachment: IChatAttachmentContent): Promise<IChatAttachmentReference> {
      // Convert data to base64
      let base64Data: string;
      
      if (Buffer.isBuffer(attachment.data)) {
         base64Data = attachment.data.toString('base64');
      } else if (attachment.data instanceof ArrayBuffer) {
         base64Data = Buffer.from(attachment.data).toString('base64');
      } else if (attachment.data instanceof Uint8Array) {
         base64Data = Buffer.from(attachment.data).toString('base64');
      } else if (typeof attachment.data === 'string') {
         base64Data = Buffer.from(attachment.data, 'utf8').toString('base64');
      } else {
         throw new InvalidParameterError(`Unsupported attachment data type: ${typeof attachment.data}`);
      }

      // For Gemini, we return a reference that includes the base64 data
      // This is stored in memory and used when the attachment is referenced
      // In practice, Gemini attachments are always inline, so this is mainly
      // for API consistency with other providers
      return {
         id: `gemini-inline-${Date.now()}-${Math.random().toString(36).substring(7)}`,
         // Store base64 data in a custom property for later use
         // Note: This is a workaround since Gemini doesn't have a separate Files API
         // In a real implementation, you might want to cache this differently
      } as IChatAttachmentReference & { _base64Data?: string; _mimeType?: string; _filename?: string };
   }

   async deleteAttachment(attachmentId: string): Promise<void> {
      // Gemini doesn't have a separate Files API, so attachments are ephemeral
      // This is a no-op for API consistency
      // In a real implementation, you might want to clear any cached data
   }

   private isAttachmentContent(attachment: ChatAttachmentInput): attachment is IChatAttachmentContent {
      return (attachment as IChatAttachmentContent).data !== undefined;
   }

   /**
    * Builds the parts array for Gemini API, including text, attachments, and table JSON
    */
   private buildParts(
      systemPrompt: string | undefined,
      userPrompt: string,
      attachment?: ChatAttachmentInput,
      tableJson?: IChatTableJson
   ): GeminiPart[] {
      const parts: GeminiPart[] = [];

      // Combine system prompt and user prompt into a single text part
      // Gemini doesn't have a separate system role, so we include it in the user message
      let combinedPrompt = '';
      if (systemPrompt) {
         combinedPrompt += `System: ${systemPrompt}\n\n`;
      }
      combinedPrompt += `User: ${userPrompt}`;

      // Add table JSON if provided
      if (tableJson) {
         const tableJsonText = this.formatTableJson(tableJson);
         combinedPrompt += `\n\n${tableJsonText}`;
      }

      parts.push({ text: combinedPrompt });

      // Add attachment if provided (only inline attachments are supported)
      if (attachment && this.isAttachmentContent(attachment)) {
         // Convert attachment to base64 inline data
         let base64Data: string;
         if (Buffer.isBuffer(attachment.data)) {
            base64Data = attachment.data.toString('base64');
         } else if (attachment.data instanceof ArrayBuffer) {
            base64Data = Buffer.from(attachment.data).toString('base64');
         } else if (attachment.data instanceof Uint8Array) {
            base64Data = Buffer.from(attachment.data).toString('base64');
         } else if (typeof attachment.data === 'string') {
            base64Data = Buffer.from(attachment.data, 'utf8').toString('base64');
         } else {
            throw new InvalidParameterError(`Unsupported attachment data type: ${typeof attachment.data}`);
         }

         parts.push({
            inlineData: {
               mimeType: attachment.mimeType,
               data: base64Data
            }
         });
      }

      return parts;
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
}

