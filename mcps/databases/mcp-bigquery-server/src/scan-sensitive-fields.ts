#!/usr/bin/env node

import { BigQuery } from '@google-cloud/bigquery';
import { promises as fs } from 'fs';
import path from 'path';
import { scanSensitiveFields, mergeFields, DEFAULT_SENSITIVE_PATTERNS } from './sensitive-field-scanner.js';

// --- Interfaces ---

interface ScanConfig {
  projectId: string;
  keyFilename?: string;
  configFile?: string;
  location?: string;
}

interface ConfigFile {
  maximumBytesBilled: string;
  preventedFields: Record<string, string[]>;
  [key: string]: unknown;
}

// --- CLI arg parsing (mirrors src/index.ts pattern) ---

function parseArgs(): ScanConfig {
  const args = process.argv.slice(2);
  const config: ScanConfig = { projectId: '' };

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
      case 'key-file':
        config.keyFilename = value;
        break;
      case 'config-file':
        config.configFile = value;
        break;
      case 'location':
        config.location = value;
        break;
      default:
        throw new Error(
          `Unknown argument: ${arg}\n` +
          'Usage: scan-sensitive-fields --project-id <id> [--key-file <path>] [--config-file <path>] [--location <region>]'
        );
    }
  }

  if (!config.projectId) {
    throw new Error(
      'Missing required argument: --project-id\n' +
      'Usage: scan-sensitive-fields --project-id <id> [--key-file <path>] [--config-file <path>] [--location <region>]'
    );
  }

  return config;
}

// --- Main ---

async function main() {
  const scanConfig = parseArgs();

  console.error(`Initializing BigQuery for project: ${scanConfig.projectId}`);

  const bigqueryOptions: { projectId: string; keyFilename?: string } = {
    projectId: scanConfig.projectId,
  };

  if (scanConfig.keyFilename) {
    bigqueryOptions.keyFilename = path.resolve(scanConfig.keyFilename);
    console.error(`Using key file: ${bigqueryOptions.keyFilename}`);
  }

  const bigquery = new BigQuery(bigqueryOptions);

  // Resolve config path
  const configPath = scanConfig.configFile
    ? path.resolve(scanConfig.configFile)
    : path.resolve(process.cwd(), 'config.json');

  // Load existing config
  let existingConfig: ConfigFile;
  try {
    const raw = await fs.readFile(configPath, 'utf-8');
    existingConfig = JSON.parse(raw) as ConfigFile;
    console.error(
      `Loaded config from ${configPath} (${Object.keys(existingConfig.preventedFields || {}).length} tables)`
    );
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError?.code === 'ENOENT') {
      console.error(`No config at ${configPath}, creating new one`);
      existingConfig = { maximumBytesBilled: '10000000000', preventedFields: {} };
    } else {
      throw new Error(`Cannot read ${configPath}: ${nodeError?.message ?? 'Unknown error'}`);
    }
  }

  // Read patterns from config, fall back to defaults
  const patterns = Array.isArray(existingConfig.sensitiveFieldPatterns)
    ? existingConfig.sensitiveFieldPatterns as string[]
    : DEFAULT_SENSITIVE_PATTERNS;

  // Scan BigQuery
  const sensitiveColumns = await scanSensitiveFields(bigquery, patterns, scanConfig.location);

  // Merge and write
  const mergedFields = mergeFields(existingConfig.preventedFields || {}, sensitiveColumns);

  const updatedConfig: ConfigFile = {
    ...existingConfig,
    preventedFields: mergedFields,
  };

  await fs.writeFile(configPath, JSON.stringify(updatedConfig, null, 2) + '\n', 'utf-8');
  console.error(`Config updated: ${configPath} (${Object.keys(mergedFields).length} tables)`);
}

main().catch((error) => {
  console.error('Fatal error:', error instanceof Error ? error.message : error);
  process.exit(1);
});
