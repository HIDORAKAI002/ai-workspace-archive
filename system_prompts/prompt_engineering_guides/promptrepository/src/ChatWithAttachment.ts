/**
 * @module ChatWithAttachment
 *
 * Defines an abstract interface for chat drivers that support
 * optional file attachments alongside the conversation prompts.
 */

// ===Start StrongAI Generated Comment (20260219)===
// Defines an abstract contract for chat drivers that can include optional file attachments and structured table JSON alongside prompts. The module focuses on normalizing how callers pass raw files, reference previously uploaded files, and supply high‑fidelity table data.
// 
// Main exports:
// - ChatAttachmentInput: a union type that accepts either inline file content or a provider reference.
// - IChatTableJson: describes extracted table data with a name, arbitrary JSON payload, and optional description.
// - IChatAttachmentContent: models an inline file with filename, MIME type, and data (ArrayBuffer, Buffer, Uint8Array, or string), plus a deleteAfterUse hint that defaults to true.
// - IChatAttachmentReference: identifies an already uploaded file by provider id, with an optional deleteAfterUse hint that defaults to false.
// - IChatWithAttachmentDriver: an abstract base with three methods:
//   - getModelResponse(systemPrompt, userPrompt, verbosity, attachment?, tableJson?): returns a response string.
//   - uploadAttachment(attachment): uploads inline content and returns a reference.
//   - deleteAttachment(attachmentId): removes a previously uploaded file.
// 
// Key import:
// - EVerbosity from ./entry controls response verbosity for getModelResponse. Implementations must handle upload lifecycle and optional cleanup.
// ===End StrongAI Generated Comment===

import { EVerbosity } from './entry';

/**
 * Union of supported attachment payloads.
 * This type allows either raw file content or a reference to an
 * already uploaded attachment.
 */
export type ChatAttachmentInput = IChatAttachmentContent | IChatAttachmentReference;

/**
 * Represents table JSON data extracted from documents (e.g., via LlamaParse).
 * This structured format provides better fidelity than PDF extraction for tabular data.
 * 
 * @interface IChatTableJson
 * @property {string} name - A descriptive name for the table data (e.g., "Document Tables")
 * @property {unknown} data - The table JSON data structure (typically an array of table objects or a single table object)
 * @property {string} [description] - Optional description of what the table data represents
 */
export interface IChatTableJson {
   /** A descriptive name for the table data */
   name: string;
   /** The table JSON data structure (can be an array, object, or any valid JSON structure) */
   data: unknown;
   /** Optional description of what the table data represents */
   description?: string;
}

/**
 * Represents a file attachment provided inline with the request.
 */
export interface IChatAttachmentContent {
   /** Name of the file. */
   filename: string;
   /** Mime type describing the file contents. */
   mimeType: string;
   /** Binary payload for the file. */
   data: ArrayBuffer | Buffer | Uint8Array | string;
   /**
    * If true the underlying implementation should delete the file
    * from the provider after the request completes. Defaults to true
    * for inline uploads.
    */
   deleteAfterUse?: boolean;
}

/**
 * Reference to a file that has already been uploaded to the provider.
 */
export interface IChatAttachmentReference {
   /** Provider specific identifier for the uploaded file. */
   id: string;
   /**
    * Optional hint indicating whether the implementation should delete
    * the remote file after completing the request. Defaults to false.
    */
   deleteAfterUse?: boolean;
}

/**
 * Abstract interface for chat drivers that can operate with file attachments.
 *
 * Implementations may choose to upload files on-demand when provided via
 * {@link IChatAttachmentContent} or reference existing uploads via
 * {@link IChatAttachmentReference}.
 */
export abstract class IChatWithAttachmentDriver {
   protected constructor() {}

   /**
    * Executes a model call with optional file attachment and table JSON support.
    *
    * @param systemPrompt Optional system level instructions.
    * @param userPrompt Required user prompt for the turn.
    * @param verbosity Requested verbosity level for the response.
    * @param attachment Optional attachment provided inline or by reference.
    * @param tableJson Optional table JSON data extracted from documents (e.g., via LlamaParse).
    *                  This provides better fidelity for tabular data than PDF extraction.
    */
   abstract getModelResponse(
      systemPrompt: string | undefined,
      userPrompt: string,
      verbosity: EVerbosity,
      attachment?: ChatAttachmentInput,
      tableJson?: IChatTableJson
   ): Promise<string>;

   /**
    * Uploads an attachment and returns a provider specific reference.
    */
   abstract uploadAttachment(attachment: IChatAttachmentContent): Promise<IChatAttachmentReference>;

   /**
    * Deletes a previously uploaded attachment using its identifier.
    */
   abstract deleteAttachment(attachmentId: string): Promise<void>;
}