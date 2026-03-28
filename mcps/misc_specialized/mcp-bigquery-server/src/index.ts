#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { BigQuery } from '@google-cloud/bigquery';

import { promises as fs, constants as fsConstants } from 'fs';
import path from 'path';

// Define configuration interface
interface ServerConfig {
  projectId: string;
  location?: string;
  keyFilename?: string;
}

async function validateConfig(config: ServerConfig): Promise<void> {
  // Check if key file exists and is readable
  if (config.keyFilename) {
    const resolvedKeyPath = path.resolve(config.keyFilename);
    try {
      await fs.access(resolvedKeyPath, fsConstants.R_OK);
      // Update the config to use the resolved path
      config.keyFilename = resolvedKeyPath;
    } catch (error) {
      console.error('File access error details:', error);
      if (error instanceof Error) {
        const nodeError = error as NodeJS.ErrnoException;
        if (nodeError.code === 'EACCES') {
          throw new Error(`Permission denied accessing key file: ${resolvedKeyPath}. Please check file permissions.`);
        } else if (nodeError.code === 'ENOENT') {
          throw new Error(`Key file not found: ${resolvedKeyPath}. Please verify the file path.`);
        } else {
          throw new Error(`Unable to access key file: ${resolvedKeyPath}. Error: ${nodeError.message}`);
        }
      } else {
        throw new Error(`Unexpected error accessing key file: ${resolvedKeyPath}`);
      }
    }

    // Validate file contents
    try {
      const keyFileContent = await fs.readFile(config.keyFilename, 'utf-8');
      const keyData = JSON.parse(keyFileContent);
      
      // Basic validation of key file structure
      if (!keyData.type || keyData.type !== 'service_account' || !keyData.project_id) {
        throw new Error('Invalid service account key file format');
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Service account key file is not valid JSON');
      }
      throw error;
    }
  }

  // Validate project ID format (basic check)
  if (!/^[a-z0-9-]+$/.test(config.projectId)) {
    throw new Error('Invalid project ID format');
  }
}

function parseArgs(): ServerConfig {
  const args = process.argv.slice(2);
  const config: ServerConfig = {
    projectId: '',
    location: 'US' 
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith('--')) {
      throw new Error(`Invalid argument: ${arg}`);
    }

    const key = arg.slice(2);
    if (i + 1 >= args.length || args[i + 1].startsWith('--')) {
      throw new Error(`Missing value for argument: ${arg}`);
    }

    const value = args[++i];
    
    switch (key) {
      case 'project-id':
        config.projectId = value;
        break;
      case 'location':
        config.location = value;
        break;
      case 'key-file':
        config.keyFilename = value;
        break;
      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!config.projectId) {
    throw new Error(
      "Missing required argument: --project-id\n" +
      "Usage: mcp-server-bigquery --project-id <project-id> [--location <location>] [--key-file <path-to-key-file>]"
    );
  }

  return config;
}

const server = new Server(
  {
    name: "mcp-server/bigquery",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  },
);

let config: ServerConfig;
let bigquery: BigQuery;
let resourceBaseUrl: URL;

try {
  config = parseArgs();
  await validateConfig(config);
  
  console.error(`Initializing BigQuery with project ID: ${config.projectId} and location: ${config.location}`);
  
  const bigqueryConfig: {
    projectId: string;
    keyFilename?: string;
  } = {
    projectId: config.projectId
  };
  
  if (config.keyFilename) {
    console.error(`Using service account key file: ${config.keyFilename}`);
    bigqueryConfig.keyFilename = config.keyFilename;
  }
  
  bigquery = new BigQuery(bigqueryConfig);
  resourceBaseUrl = new URL(`bigquery://${config.projectId}`);
} catch (error) {
  console.error('Initialization error:', error);
  process.exit(1);
}

const SCHEMA_PATH = "schema";

function qualifyTablePath(sql: string, projectId: string): string {
  // Match FROM INFORMATION_SCHEMA.TABLES or FROM dataset.INFORMATION_SCHEMA.TABLES
  const unqualifiedPattern = /FROM\s+(?:(\w+)\.)?INFORMATION_SCHEMA\.TABLES/gi;
  return sql.replace(unqualifiedPattern, (match, dataset) => {
    if (dataset) {
      return `FROM \`${projectId}.${dataset}.INFORMATION_SCHEMA.TABLES\``;
    }
    throw new Error("Dataset must be specified when querying INFORMATION_SCHEMA (e.g. dataset.INFORMATION_SCHEMA.TABLES)");
  });
}

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  try {
    console.error('Fetching datasets...');
    const [datasets] = await bigquery.getDatasets();
    console.error(`Found ${datasets.length} datasets`);
    
    const resources = [];

    for (const dataset of datasets) {
      console.error(`Processing dataset: ${dataset.id}`);
      const [tables] = await dataset.getTables();
      console.error(`Found ${tables.length} tables and views in dataset ${dataset.id}`);
      
      for (const table of tables) {
        // Get the metadata to check if it's a table or view
        const [metadata] = await table.getMetadata();
        const resourceType = metadata.type === 'VIEW' ? 'view' : 'table';
        
        resources.push({
          uri: new URL(`${dataset.id}/${table.id}/${SCHEMA_PATH}`, resourceBaseUrl).href,
          mimeType: "application/json",
          name: `"${dataset.id}.${table.id}" ${resourceType} schema`,
        });
      }
    }

    console.error(`Total resources found: ${resources.length}`);
    return { resources };
  } catch (error) {
    console.error('Error in ListResourcesRequestSchema:', error);
    throw error;
  }
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const resourceUrl = new URL(request.params.uri);
  const pathComponents = resourceUrl.pathname.split("/");
  const schema = pathComponents.pop();
  const tableId = pathComponents.pop();
  const datasetId = pathComponents.pop();

  if (schema !== SCHEMA_PATH) {
    throw new Error("Invalid resource URI");
  }

  const dataset = bigquery.dataset(datasetId!);
  const table = dataset.table(tableId!);
  const [metadata] = await table.getMetadata();

  return {
    contents: [
      {
        uri: request.params.uri,
        mimeType: "application/json",
        text: JSON.stringify(metadata.schema.fields, null, 2),
      },
    ],
  };
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query",
        description: "Run a read-only BigQuery SQL query",
        inputSchema: {
          type: "object",
          properties: {
            sql: { type: "string" },
            maximumBytesBilled: { 
              type: "string",
              description: "Maximum bytes billed (default: 1GB)",
              optional: true
            }
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "query") {
    let sql = request.params.arguments?.sql as string;
    let maximumBytesBilled = request.params.arguments?.maximumBytesBilled || "1000000000";
    
    // Validate read-only query
    const forbiddenPattern = /\b(INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|MERGE|TRUNCATE|GRANT|REVOKE|EXECUTE|BEGIN|COMMIT|ROLLBACK)\b/i;
    if (forbiddenPattern.test(sql)) {
      throw new Error('Only READ operations are allowed');
    }    

    try {
      // Qualify INFORMATION_SCHEMA queries
      if (sql.toUpperCase().includes('INFORMATION_SCHEMA')) {
        sql = qualifyTablePath(sql, config.projectId);
      }

      const [rows] = await bigquery.query({
        query: sql,
        location: config.location,
        maximumBytesBilled: maximumBytesBilled.toString(),
      });

      return {
        content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
        isError: false,
      };
    } catch (error) {
      throw error;
    }
  }
  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function runServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('BigQuery MCP server running on stdio');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    process.exit(1);
  }
}

runServer().catch(console.error);