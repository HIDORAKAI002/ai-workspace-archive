/**
 * @module makepromptids.test
 * 
 * Unit tests for the MakePromptIds module which generates TypeScript prompt ID declarations.
 * Tests verify:
 * - Correct camelCase conversion of prompt names
 * - Proper handling of special characters and spaces
 * - Generation of valid JSON output mapping prompt names to IDs
 * 
 * Uses temporary test files to validate ID generation functionality.
 */

// Copyright (c) 2025, 2026 Jon Verrier

// ===Start StrongAI Generated Comment (20260219)===
// This module contains unit tests for the MakePromptIds script, focusing on the generateJsonIds function. Its purpose is to verify that human-readable prompt names are converted into consistent camelCase keys with a PromptId suffix, and that the function writes a valid JSON file mapping these keys to their source IDs.
// 
// The test suite is organized with Mocha’s describe and it helpers. It asserts expectations using the expect assertion library. It uses fs and path to create, read, and clean up a temporary JSON output file on disk. afterEach removes the file to keep tests isolated.
// 
// Tests cover several behaviors:
// - Basic camelCase conversion from space-separated names.
// - Stripping or normalizing special characters and collapsing multiple spaces.
// - Handling of an empty prompts array by producing an empty JSON object.
// - Preservation and placement of numeric segments in names, including leading numbers.
// 
// The module relies on:
// - generateJsonIds from ../scripts/MakePromptIds to perform name normalization and file generation.
// - Node’s fs for file I/O and path for path construction.
// - Mocha and expect for test structure and assertions.
// ===End StrongAI Generated Comment===

import { expect } from 'expect';
import { describe, it, afterEach } from 'mocha';
import fs from 'fs';
import path from 'path';
import { generateJsonIds } from '../scripts/MakePromptIds';


describe('generateJsonIds', () => {
    const testOutputPath = path.join(__dirname, 'test-promptIds.ts');
    
    // Clean up test file after each test
    afterEach(() => {
        if (fs.existsSync(testOutputPath)) {
            fs.unlinkSync(testOutputPath);
        }
    });

    it('should generate correct camelCase IDs from simple prompt names', () => {
        const testPrompts = [
            { name: 'hello world', id: '123' },
            { name: 'test prompt', id: '456' }
        ];

        generateJsonIds(testPrompts, testOutputPath);

        const result = JSON.parse(fs.readFileSync(testOutputPath, 'utf-8'));
        expect(result).toEqual({
            helloWorldPromptId: '123',
            testPromptPromptId: '456'
        });
    });

    it('should handle special characters and multiple spaces', () => {
        const testPrompts = [
            { name: 'hello!!!world', id: '123' },
            { name: 'test  multiple    spaces', id: '456' }
        ];

        generateJsonIds(testPrompts, testOutputPath);

        const result = JSON.parse(fs.readFileSync(testOutputPath, 'utf-8'));
        expect(result).toEqual({
            helloWorldPromptId: '123',
            testMultipleSpacesPromptId: '456'
        });
    });

    it('should handle empty array of prompts', () => {
        const testPrompts: any[] = [];

        generateJsonIds(testPrompts, testOutputPath);

        const result = JSON.parse(fs.readFileSync(testOutputPath, 'utf-8'));
        expect(result).toEqual({});
    });

    it('should handle numbers in prompt names', () => {
        const testPrompts = [
            { name: 'prompt 123', id: '456' },
            { name: '123 prompt', id: '789' }
        ];

        generateJsonIds(testPrompts, testOutputPath);

        const result = JSON.parse(fs.readFileSync(testOutputPath, 'utf-8'));
        expect(result).toEqual({
            prompt123PromptId: '456',
            '123PromptPromptId': '789'
        });
    });
});