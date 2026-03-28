import {
  EmbeddedResource,
  ImageContent,
  TextContent,
} from "@modelcontextprotocol/sdk/types.js";
import { ApiReturn } from "./gradio_api.js";
import * as fs from "fs/promises";
import { pathToFileURL } from "url";
import path from "path";
import { config } from "./config.js";
import { EndpointPath } from "./endpoint_wrapper.js";
import { WorkingDirectory } from "./working_directory.js";

// Add types for Gradio component values
export interface GradioResourceValue {
  url?: string;
  mime_type?: string;
  orig_name?: string;
}

// Component types enum
enum GradioComponentType {
  Image = "Image",
  Audio = "Audio",
  Chatbot = "Chatbot",
}

// Resource response interface
interface ResourceResponse {
  mimeType: string;
  base64Data: string;
  arrayBuffer: ArrayBuffer;
  originalExtension: string | null;
}

// Simple converter registry
type ContentConverter = (
  component: ApiReturn,
  value: GradioResourceValue,
  endpointPath: EndpointPath,
) => Promise<TextContent | ImageContent | EmbeddedResource>;

// Type for converter functions that may not succeed
type ConverterFn = (
  component: ApiReturn,
  value: GradioResourceValue,
  endpointPath: EndpointPath,
) => Promise<TextContent | ImageContent | EmbeddedResource | null>;
// Default converter implementation
const defaultConverter: ConverterFn = async () => null;

export class GradioConverter {
  private converters: Map<string, ContentConverter> = new Map();

  constructor(private readonly workingDir: WorkingDirectory) {
    // Register converters with fallback behavior
    this.register(
      GradioComponentType.Image,
      withFallback(this.imageConverter.bind(this)),
    );
    this.register(
      GradioComponentType.Audio,
      withFallback(this.audioConverter.bind(this)),
    );
    this.register(
      GradioComponentType.Chatbot,
      withFallback(async () => null),
    );
  }

  register(component: string, converter: ContentConverter) {
    this.converters.set(component, converter);
  }

  async convert(
    component: ApiReturn,
    value: GradioResourceValue,
    endpointPath: EndpointPath,
  ): Promise<TextContent | ImageContent | EmbeddedResource> {
    if (config.debug) {
      await fs.writeFile(
        generateFilename("debug", "json", endpointPath.mcpToolName),
        JSON.stringify(value, null, 2),
      );
    }
    const converter =
      this.converters.get(component.component) ||
      withFallback(defaultConverter);
    return converter(component, value, endpointPath);
  }

  private async saveFile(
    arrayBuffer: ArrayBuffer,
    mimeType: string,
    prefix: string,
    mcpToolName: string,
    originalExtension?: string | null,
  ): Promise<string> {
    const extension = originalExtension || mimeType.split("/")[1] || "bin";
    const filename = await this.workingDir.generateFilename(
      prefix,
      extension,
      mcpToolName,
    );
    await this.workingDir.saveFile(arrayBuffer, filename);
    return filename;
  }

  private readonly imageConverter: ConverterFn = async (
    _component,
    value,
    endpointPath,
  ) => {
    if (!value?.url) return null;
    try {
      const response = await convertUrlToBase64(value.url, value);

      try {
        await this.saveFile(
          response.arrayBuffer,
          response.mimeType,
          GradioComponentType.Image,
          endpointPath.mcpToolName,
          response.originalExtension,
        );
      } catch (saveError) {
        if (config.claudeDesktopMode) {
          console.error(
            `Failed to save image file: ${saveError instanceof Error ? saveError.message : String(saveError)}`,
          );
        } else {
          throw saveError;
        }
      }

      return {
        type: "image",
        data: response.base64Data,
        mimeType: response.mimeType,
      };
    } catch (error) {
      console.error("Image conversion failed:", error);
      return createTextContent(
        _component,
        `Failed to load image: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  private readonly audioConverter: ConverterFn = async (
    _component,
    value,
    endpointPath,
  ) => {
    if (!value?.url) return null;
    try {
      const { mimeType, base64Data, arrayBuffer, originalExtension } =
        await convertUrlToBase64(value.url, value);
      const filename = await this.saveFile(
        arrayBuffer,
        mimeType,
        "audio",
        endpointPath.mcpToolName,
        originalExtension,
      );

      if (config.claudeDesktopMode) {
        return {
          type: "resource",
          resource: {
            uri: `${pathToFileURL(path.resolve(filename)).href}`,
            mimetype: `text/plain`,
            text: `Your audio was succesfully created and is available for playback at ${path.resolve(filename)}. Claude Desktop does not currently support audio content`,
          },
        };
      } else {
        return {
          type: "resource",
          resource: {
            uri: `${pathToFileURL(path.resolve(filename)).href}`,
            mimeType,
            blob: base64Data,
          },
        };
      }
    } catch (error) {
      console.error("Audio conversion failed:", error);
      return {
        type: "text",
        text: `Failed to load audio: ${(error as Error).message}`,
      };
    }
  };
}

// Shared text content creator
const createTextContent = (
  component: ApiReturn,
  value: unknown,
): TextContent => {
  const label = component.label ? `${component.label}: ` : "";
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return {
    type: "text",
    text: `${label}${text}`,
  };
};

// Wrapper that adds fallback behavior
const withFallback = (converter: ConverterFn): ContentConverter => {
  return async (
    component: ApiReturn,
    value: GradioResourceValue,
    endpointPath: EndpointPath,
  ) => {
    const result = await converter(component, value, endpointPath);
    return result ?? createTextContent(component, value);
  };
};

// Update generateFilename to use space name
const generateFilename = (
  prefix: string,
  extension: string,
  mcpToolName: string,
): string => {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const randomId = crypto.randomUUID().slice(0, 5); // First 5 chars
  return `${date}_${mcpToolName}_${prefix}_${randomId}.${extension}`;
};

const getExtensionFromFilename = (url: string): string | null => {
  const match = url.match(/\/([^/?#]+)[^/]*$/);
  if (match && match[1].includes(".")) {
    return match[1].split(".").pop() || null;
  }
  return null;
};

const getMimeTypeFromOriginalName = (origName: string): string | null => {
  const extension = origName.split(".").pop()?.toLowerCase();
  if (!extension) return null;

  // Common image formats
  if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(extension)) {
    return `image/${extension}`;
  }

  // Common audio formats
  if (["mp3", "wav", "ogg", "aac", "m4a"].includes(extension)) {
    return `audio/${extension}`;
  }

  // For unknown types, fall back to application/*
  return `application/${extension}`;
};

const determineMimeType = (
  value: GradioResourceValue,
  responseHeaders: Headers,
): string => {
  // First priority: mime_type from the value object
  if (value?.mime_type) {
    return value.mime_type;
  }

  // Second priority: derived from orig_name
  if (value?.orig_name) {
    const mimeFromName = getMimeTypeFromOriginalName(value.orig_name);
    if (mimeFromName) {
      return mimeFromName;
    }
  }

  // Third priority: response headers
  const headerMimeType = responseHeaders.get("content-type");
  if (headerMimeType && headerMimeType !== "text/plain") {
    return headerMimeType;
  }

  // Final fallback
  return "text/plain";
};

const convertUrlToBase64 = async (
  url: string,
  value: GradioResourceValue,
): Promise<ResourceResponse> => {
  const headers: HeadersInit = {};
  if (config.hfToken) {
    headers.Authorization = `Bearer ${config.hfToken}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch resource: ${response.status} ${response.statusText}`,
    );
  }

  const mimeType = determineMimeType(value, response.headers);
  const originalExtension = getExtensionFromFilename(url);
  const arrayBuffer = await response.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString("base64");

  return { mimeType, base64Data, arrayBuffer, originalExtension };
};
