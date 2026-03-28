import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import type { ApiEndpoint, ApiParameter } from "./gradio_api.js";

// Type for a parameter schema in MCP Tool
export type ParameterSchema = Tool["inputSchema"]["properties"];

function parseNumberConstraints(description: string = "") {
  const constraints: { minimum?: number; maximum?: number } = {};

  // Check for "between X and Y" format
  const betweenMatch = description.match(
    /between\s+(-?\d+\.?\d*)\s+and\s+(-?\d+\.?\d*)/i,
  );
  if (betweenMatch) {
    constraints.minimum = Number(betweenMatch[1]);
    constraints.maximum = Number(betweenMatch[2]);
    return constraints;
  }

  // Fall back to existing min/max parsing
  const minMatch = description.match(/min(?:imum)?\s*[:=]\s*(-?\d+\.?\d*)/i);
  const maxMatch = description.match(/max(?:imum)?\s*[:=]\s*(-?\d+\.?\d*)/i);

  if (minMatch) constraints.minimum = Number(minMatch[1]);
  if (maxMatch) constraints.maximum = Number(maxMatch[1]);
  return constraints;
}

export function isFileParameter(param: ApiParameter): boolean {
  return (
    param.python_type?.type === "filepath" ||
    param.type === "Blob | File | Buffer" ||
    param.component === "Image" ||
    param.component === "Audio"
  );
}

export function convertParameter(param: ApiParameter): ParameterSchema {
  // Start with determining the base type and description
  let baseType = param.type || "string";
  let baseDescription =
    param.python_type?.description || param.label || undefined;

  // Special case for chat history - override type and description
  if (param.parameter_name === "history" && param.component === "Chatbot") {
    baseType = "array";
    baseDescription =
      "Chat history as an array of message pairs. Each pair is [user_message, assistant_message] where messages can be text strings or null. Advanced: messages can also be file references or UI components.";
  }

  // Handle file types with specific descriptions
  if (isFileParameter(param)) {
    baseType = "string"; // Always string for file inputs
    if (param.component === "Audio") {
      baseDescription =
        "Accepts: Audio file URL, file path, file name, or resource identifier";
    } else if (param.component === "Image") {
      baseDescription =
        "Accepts: Image file URL, file path, file name, or resource identifier";
    } else {
      baseDescription =
        "Accepts: URL, file path, file name, or resource identifier";
    }
  }

  const baseSchema = {
    type: baseType,
    description: baseDescription,
    ...(param.parameter_has_default && {
      default: param.parameter_default,
    }),
    ...(param.example_input && {
      examples: [param.example_input],
    }),
  };
  // Add number constraints if it's a number type
  if (param.type === "number" && param.python_type?.description) {
    const constraints = parseNumberConstraints(param.python_type.description);
    return { ...baseSchema, ...constraints };
  }

  // Handle Literal type to extract enum values
  if (param.python_type?.type?.startsWith("Literal[")) {
    const enumValues = param.python_type.type
      .slice(8, -1) // Remove "Literal[" and "]"
      .split(",")
      .map((value) => value.trim().replace(/['"]/g, "")); // Remove quotes and trim spaces
    return {
      ...baseSchema,
      description: param.python_type?.description || param.label || undefined,
      enum: enumValues,
    };
  }

  return baseSchema;
}

export function convertApiToSchema(endpoint: ApiEndpoint) {
  const properties: { [key: string]: ParameterSchema } = {};
  const required: string[] = [];
  let propertyCounter = 1;
  const unnamedParameters: Record<string, number> = {};

  endpoint.parameters.forEach((param: ApiParameter, index: number) => {
    // Get property name from parameter_name, label, or generate one
    const propertyName =
      param.parameter_name ||
      param.label ||
      `Unnamed Parameter ${propertyCounter++}`;
    if (!param.parameter_name) {
      unnamedParameters[propertyName] = index;
    }
    // Convert parameter using existing function
    properties[propertyName] = convertParameter(param);

    // Add to required if no default value
    if (!param.parameter_has_default) {
      required.push(propertyName);
    }
  });

  return {
    type: "object",
    properties,
    required,
  };
}
