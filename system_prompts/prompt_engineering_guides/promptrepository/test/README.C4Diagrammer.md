# PromptRepository Test Documentation

## Overview
This directory contains the test suite for the PromptRepository system, implementing comprehensive unit and integration tests for prompt management, validation, and LLM interactions.

## Test File Summaries

### chat.test.ts
Unit tests for the Chat module that handles LLM interactions. Tests verify successful text responses with and without system prompts using the OpenAI Responses API. Includes timeout configurations for API calls and basic response validation patterns.

### promptrepository.test.ts
Comprehensive unit tests for the PromptRepository module. Tests cover loading prompts from JSON storage, retrieving prompts by ID, parameter validation, and template replacement functionality. Uses temporary test files to validate repository operations in isolation. Includes tests for both required and optional parameters, as well as proper error handling.

### prompts.test.ts
Implements the PromptValidator class and its test suite. Tests validate prompt structure, parameter requirements, and type checking. Includes validation for required fields, parameter arrays, default values for optional parameters, and enum parameter handling. Contains a custom PromptValidationError class for specific error reporting.

### prompts.eval.test.ts
Integration tests for evaluating prompt responses from the LLM. Tests verify that prompts produce consistent and appropriate responses across different scenarios. Focuses on testing similar inputs for consistent outputs and variant inputs for appropriately different outputs. Uses motor racing welcome messages as test cases.

### makepromptids.test.ts
Unit tests for the MakePromptIds module that generates TypeScript prompt ID declarations. Verifies correct camelCase conversion of prompt names, handling of special characters and spaces, and generation of valid JSON output. Tests include edge cases like empty prompt arrays and numeric prompt names. 