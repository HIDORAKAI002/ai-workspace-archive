/**
 * Supported MIME types and related utilities
 * @packageDocumentation
 */

/** Known MIME types that should be handled as text */
export const textBasedMimeTypes = [
  // Standard text formats
  "text/*",

  // Data interchange
  "application/json",
  "application/xml",
  "application/yaml",
  "application/javascript",
  "application/typescript",
] as readonly string[];

/** Supported document types */
export const documentMimeTypes = ["application/pdf"] as const;

export const imageMimeTypes = [
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/png",
];

/** All supported MIME types */
export const claudeSupportedMimeTypes = [
  ...textBasedMimeTypes,
  ...documentMimeTypes,
  ...imageMimeTypes,
] as const;

export const FALLBACK_MIME_TYPE = "application/octet-stream";

export function treatAsText(mimetype: string) {
  if (mimetype.startsWith("text/")) return true;
  if (textBasedMimeTypes.includes(mimetype)) return true;
  if (mimetype.indexOf("vnd.openxmlformats") > 0) return true;
  return false;
}
