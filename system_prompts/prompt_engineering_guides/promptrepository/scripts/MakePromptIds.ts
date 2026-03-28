/**
 * This script generates a TypeScript file containing prompt ID declarations.
 * It reads a JSON file with prompt data and creates a TypeScript file with
 * camelCase versions of the prompt names, each mapped to its corresponding ID.
 * 
 * Usage:
 * node MakePromptIds.ts -f <path-to-prompts-file.json>
 * 
 * Example:
 * node MakePromptIds.ts -f prompts/Default.Prompts.json
 */ 

// Copyright (c) 2025, 2026 Jon Verrier

import fs from 'fs';
import path from 'path';

/**
 * Generates a JSON file with prompt ID declarations.
 * The output JSON maps a camelCase version of the prompt name (appended with "PromptId")
 * to the prompt's id.
 *
 * @param prompts - Array of prompt objects (each should have "name" and "id" properties).
 * @param outputPath - The file path where the JSON output will be written.
 */

// ===Start StrongAI Generated Comment (20260219)===
// Generates a file of prompt ID constants from a JSON prompts source. The module’s goal is to take an array of prompt objects, convert each prompt name to camelCase, append “PromptId”, and map that key to the prompt’s original id. It writes a pretty-printed JSON object to the target file path.
// 
// The main export is generateJsonIds(prompts, outputPath). It expects each item in prompts to include name and id. It splits names on non-alphanumeric characters, lowercases the first segment, capitalizes subsequent segments, then appends “PromptId” to build the key. It serializes the result as JSON with two-space indentation and writes it to disk at outputPath.
// 
// When run directly as a script, it accepts a -f argument pointing to a JSON file containing the prompts array. It reads and parses that file, computes the ID map, and writes the output alongside the input as promptIds.ts, logging a summary. If -f is missing, it prints an error.
// 
// Relies on Node’s fs for file I/O and path for path resolution.
// ===End StrongAI Generated Comment===
export function generateJsonIds(prompts: any[], outputPath: string) {
    const ids: Record<string, string> = {};

    for (const prompt of prompts) {
        // Convert the prompt name to camelCase
        const camelCaseName = prompt.name
            .split(/[^a-zA-Z0-9]+/)
            .map((word: string, index: number) => 
                index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join('');
        
        // Create a key by appending "PromptId" and set its value to prompt.id
        ids[camelCaseName + "PromptId"] = prompt.id;
    }

    // Write the resulting JSON object to the specified output path with pretty printing
    fs.writeFileSync(outputPath, JSON.stringify(ids, null, 2), "utf-8");
}

// Only run if this module is being run directly
if (require.main === module) {
    // Parse command line arguments
    let inputFile = '';
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] === '-f' && i + 1 < process.argv.length) {
            inputFile = process.argv[i + 1];
            break;
        }
    }

    if (!inputFile) {
        console.error('Please provide an input file using the -f parameter');
    }
    else {
        // Read and parse the input file
        const prompts = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

        // Generate IDs in the same directory of the input file
        const outputPath = path.join(
            path.dirname(inputFile),
            'promptIds.ts'
        );

        generateJsonIds(prompts, outputPath);
        console.log(`Generated prompt IDs JSON in ${outputPath}`);        
    }
}


