#!/usr/bin/env node

/**
 * Flowise to LangChain CLI Binary
 * 
 * This is the main executable entry point for the flowise-to-langchain CLI tool.
 * It imports and runs the compiled TypeScript CLI from the dist directory.
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Determine the correct path to the compiled CLI
const projectRoot = join(__dirname, '..');
const distCliPath = join(projectRoot, 'dist', 'cli', 'index.js');
const srcCliPath = join(projectRoot, 'src', 'cli', 'index.ts');

// Check if built version exists, otherwise fall back to development mode
if (existsSync(distCliPath)) {
  // Production mode: use compiled JavaScript
  try {
    const { program } = await import(distCliPath);
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error('Error loading compiled CLI:', error.message);
    process.exit(1);
  }
} else if (existsSync(srcCliPath)) {
  // Development mode: use tsx to run TypeScript directly
  console.warn('⚠️  Built version not found, running in development mode...');
  console.warn('   Run "npm run build" to create optimized executable');
  
  try {
    // Try to use tsx if available
    const { spawn } = require('child_process');
    const args = process.argv.slice(2);
    const tsxProcess = spawn('npx', ['tsx', srcCliPath, ...args], {
      stdio: 'inherit',
      cwd: projectRoot
    });
    
    tsxProcess.on('close', (code) => {
      process.exit(code || 0);
    });
    
    tsxProcess.on('error', (error) => {
      console.error('Error running TypeScript CLI:', error.message);
      console.error('Please install tsx: npm install -g tsx');
      process.exit(1);
    });
  } catch (error) {
    console.error('Development mode failed:', error.message);
    console.error('Please build the project first: npm run build');
    process.exit(1);
  }
} else {
  console.error('❌ CLI not found. Please build the project first:');
  console.error('   npm run build');
  console.error('');
  console.error('Or install dependencies:');
  console.error('   npm install');
  process.exit(1);
}