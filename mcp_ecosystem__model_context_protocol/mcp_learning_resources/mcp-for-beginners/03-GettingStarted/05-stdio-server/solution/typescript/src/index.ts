#!/usr/bin/env node
/**
 * MCP stdio server example - Updated for MCP Specification 2025-06-18
 * 
 * This server demonstrates the recommended stdio transport instead of the 
 * deprecated SSE transport. The stdio transport is simpler, more secure,
 * and provides better performance.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Create server instance
const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool schemas
const AddArgsSchema = z.object({
  a: z.number().describe("First number"),
  b: z.number().describe("Second number"),
});

const MultiplyArgsSchema = z.object({
  a: z.number().describe("First number"),
  b: z.number().describe("Second number"),
});

const GreetingArgsSchema = z.object({
  name: z.string().describe("Name of the person to greet"),
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "add",
        description: "Add two numbers together",
        inputSchema: {
          type: "object",
          properties: {
            a: { type: "number", description: "First number" },
            b: { type: "number", description: "Second number" },
          },
          required: ["a", "b"],
        },
      },
      {
        name: "multiply",
        description: "Multiply two numbers together",
        inputSchema: {
          type: "object",
          properties: {
            a: { type: "number", description: "First number" },
            b: { type: "number", description: "Second number" },
          },
          required: ["a", "b"],
        },
      },
      {
        name: "get_greeting",
        description: "Generate a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Name of the person to greet" },
          },
          required: ["name"],
        },
      },
      {
        name: "get_server_info",
        description: "Get information about this MCP server",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "add": {
      const { a, b } = AddArgsSchema.parse(args);
      const result = a + b;
      console.error(`Adding ${a} + ${b} = ${result}`); // Log to stderr
      return {
        content: [
          {
            type: "text",
            text: `${a} + ${b} = ${result}`,
          },
        ],
      };
    }

    case "multiply": {
      const { a, b } = MultiplyArgsSchema.parse(args);
      const result = a * b;
      console.error(`Multiplying ${a} * ${b} = ${result}`); // Log to stderr
      return {
        content: [
          {
            type: "text",
            text: `${a} × ${b} = ${result}`,
          },
        ],
      };
    }

    case "get_greeting": {
      const { name } = GreetingArgsSchema.parse(args);
      const greeting = `Hello, ${name}! Welcome to the MCP stdio server.`;
      console.error(`Generated greeting for ${name}`); // Log to stderr
      return {
        content: [
          {
            type: "text",
            text: greeting,
          },
        ],
      };
    }

    case "get_server_info": {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              server_name: "example-stdio-server",
              version: "1.0.0",
              transport: "stdio",
              capabilities: ["tools"],
              description: "Example MCP server using stdio transport (MCP 2025-06-18 specification)",
            }, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start the server using stdio transport
async function runServer() {
  console.error("Starting MCP stdio server..."); // Log to stderr
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server connected via stdio transport"); // Log to stderr
}

// Handle process termination gracefully
process.on("SIGINT", () => {
  console.error("Received SIGINT, shutting down gracefully");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.error("Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

// Start the server
runServer().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});