#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';

const DEFAULTS = {
  server: 'https://diagramless.xyz',
  scale: 2,
  type: 'auto',
  theme: 'default',
};

function usage() {
  console.log(`Usage: diagram-to-image [input-file] -o <output.png> [options]

Options:
  -o, --output <file>    Output PNG file (required)
  --theme <name>         Theme: default, dark, forest, neutral, ocean, emerald, midnight, slate, lavender, blueprint
  --type <type>          Content type: auto, mermaid, table (default: auto)
  --scale <n>            Scale factor 1-4 (default: 2)
  --bg <color>           Background color (default: white)
  --server <url>         Server URL (default: ${DEFAULTS.server})
  -h, --help             Show this help

Examples:
  diagram-to-image diagram.mmd -o output.png
  diagram-to-image table.md -o table.png --type table --theme ocean
  echo "graph TD; A-->B" | diagram-to-image -o out.png`);
  process.exit(0);
}

// Parse args
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('-h') || args.includes('--help')) usage();

let inputFile = null;
let output = null;
let theme = DEFAULTS.theme;
let type = DEFAULTS.type;
let scale = DEFAULTS.scale;
let bg = 'white';
let server = DEFAULTS.server;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-o' || arg === '--output') { output = args[++i]; }
  else if (arg === '--theme') { theme = args[++i]; }
  else if (arg === '--type') { type = args[++i]; }
  else if (arg === '--scale') { scale = Number(args[++i]); }
  else if (arg === '--bg') { bg = args[++i]; }
  else if (arg === '--server') { server = args[++i]; }
  else if (!arg.startsWith('-')) { inputFile = arg; }
  else { console.error(`Unknown option: ${arg}`); process.exit(1); }
}

if (!output) { console.error('Error: -o/--output is required'); process.exit(1); }

// Read input from file or stdin
let code;
if (inputFile) {
  code = readFileSync(inputFile, 'utf-8');
} else if (!process.stdin.isTTY) {
  code = readFileSync(0, 'utf-8');
} else {
  console.error('Error: provide an input file or pipe content via stdin');
  process.exit(1);
}

// POST to server
const url = `${server}/api/render`;
const body = JSON.stringify({ code, theme, type, scale, bg });

try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    console.error(`Error ${res.status}: ${err.error || res.statusText}`);
    process.exit(1);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(output, buffer);
  console.log(`Saved ${output} (${buffer.length} bytes)`);
} catch (err) {
  console.error(`Failed to connect to ${url}: ${err.message}`);
  console.error('Is the diagramless.xyz server reachable?');
  process.exit(1);
}
