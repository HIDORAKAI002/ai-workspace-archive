#!/usr/bin/env node
import { buildFramework } from './build.js';

if (process.argv[1].endsWith('mcp-build') || process.argv[1].endsWith('build-cli.js')) {
    buildFramework().catch(error => {
        process.stderr.write(`Fatal error: ${error instanceof Error ? error.message : String(error)}\n`);
        process.exit(1);
    });
} 
