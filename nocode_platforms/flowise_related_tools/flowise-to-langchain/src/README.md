# Source Code Structure

This directory contains the main source code for the flowise-to-langchain converter.

## Directory Structure

- **`parser/`** - JSON parsing logic for Flowise export files
- **`ir/`** - Intermediate Representation interfaces and types
- **`registry/`** - Plugin registry for node type mappings
- **`emitters/`** - Code generation modules
  - **`typescript/`** - TypeScript code emitter
  - **`langchain/`** - LangChain-specific utilities
- **`cli/`** - Command-line interface implementation
- **`utils/`** - Shared utility functions and helpers

## Development Guidelines

- Each module should have clear interfaces and minimal dependencies
- Use TypeScript for type safety
- Follow functional programming principles where possible
- Maintain comprehensive unit tests
