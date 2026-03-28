# Project Structure Documentation

This document explains the organization and structure of the flowise-langchain repository.

## Repository Overview

This repository contains the **Enhanced Flowise-to-LangChain Converter** - a comprehensive tool for converting Flowise workflows to LangChain code with advanced AI agent coordination capabilities.

## Directory Structure

```
flowise-langchain/
├── flowise-to-langchain/          # Main converter project
│   ├── src/                       # TypeScript source code
│   │   ├── cli/                   # Command-line interface
│   │   ├── emitters/              # Code generation (TS, JS, Python)
│   │   ├── parser/                # Flowise JSON parsing
│   │   ├── registry/              # Converter registry (89 converters)
│   │   └── ir/                    # Intermediate representation
│   ├── test/                      # Test suites
│   ├── examples/                  # Example Flowise flows
│   ├── docs/                      # Project documentation
│   ├── bin/                       # CLI executables
│   ├── dist/                      # Compiled distribution
│   └── scripts/                   # Build utilities
├── docs/                          # Repository documentation
├── coordination/                  # Claude Flow coordination
├── memory/                        # Persistent agent memory
├── plans/                         # Development plans
└── README.md                      # Main documentation
```

## Core Components

### Main Project (`flowise-to-langchain/`)

The primary TypeScript project containing:

- **89 Converters** across 13 categories (LLM, Agent, Chain, etc.)
- **Multi-language output** (TypeScript, JavaScript, Python)
- **Professional CLI** with 6 commands
- **Enterprise features** (RAG, streaming, function calling)

### Claude Flow Integration

- **Coordination directory**: Agent coordination patterns
- **Memory system**: Persistent cross-session memory
- **Swarm orchestration**: Multi-agent development workflows

### Documentation

- **Repository docs**: In `/docs/` directory
- **Project docs**: In `flowise-to-langchain/docs/`
- **Examples**: Comprehensive flow examples in `flowise-to-langchain/examples/`

## Key Features

### Converter Registry
- **13 Categories**: LLM, Prompt, Chain, Memory, Tool, Vector Store, Embeddings, Document Loader, Text Splitter, Streaming, RAG Chains, Function Calling, Agent
- **89 Total Converters**: Comprehensive coverage of Flowise components
- **Extensible Architecture**: Easy to add new converters

### Multi-Language Support
- **TypeScript**: Primary output format with full type safety
- **JavaScript**: ES6+ compatible output
- **Python**: LangChain Python code generation

### Professional CLI
- `convert` - Convert Flowise flows to LangChain
- `validate` - Validate flow files
- `test` - Test generated code
- `batch` - Batch process multiple flows
- `watch` - Watch for changes and auto-convert
- `run` - Execute generated LangChain code

### Enterprise Features
- **Advanced Agent Architecture**: Multi-agent support with coordinators
- **RAG Chains**: Retrieval Augmented Generation patterns
- **Streaming**: Real-time response capabilities
- **Function Calling**: Enhanced function calling patterns
- **Python Support**: Full Python LangChain generation

## Development Workflow

### Building the Project
```bash
cd flowise-to-langchain
npm install
npm run build
```

### Testing
```bash
npm test
npm run test:coverage
```

### CLI Usage
```bash
# Convert a Flowise flow
flowise-to-lc convert input.json --output ./output

# Batch convert multiple flows
flowise-to-lc batch ./flows --output ./output

# Watch for changes
flowise-to-lc watch ./flows --output ./output
```

## Architecture

### Conversion Pipeline
1. **Parser**: Reads Flowise JSON files
2. **IR Transform**: Converts to intermediate representation
3. **Registry**: Matches components to converters
4. **Emitters**: Generates target language code
5. **Validation**: Ensures output correctness

### Code Generation
- **Template Engine**: Flexible code templating
- **Import Manager**: Automatic import optimization
- **Code Formatter**: Consistent code styling
- **Type Safety**: Full TypeScript type generation

### Claude Flow Integration
- **Swarm Coordination**: Multi-agent development
- **Memory Persistence**: Cross-session context
- **Neural Learning**: Pattern recognition and optimization
- **Performance Tracking**: Real-time metrics

## File Conventions

### Source Code
- **TypeScript**: `.ts` files in `src/`
- **Tests**: `.test.ts` files in `test/`
- **Examples**: `.json` files in `examples/`

### Generated Files
- **Distribution**: Compiled `.js` and `.d.ts` in `dist/`
- **CLI Binaries**: Executable scripts in `bin/`

### Documentation
- **README files**: In each major directory
- **API docs**: Generated in `docs/api/`
- **Guides**: Step-by-step in `docs/guides/`

## Contributing

See `CONTRIBUTING.md` for development guidelines and contribution process.

## Support

- **Documentation**: This repository
- **Issues**: GitHub Issues
- **Troubleshooting**: `TROUBLESHOOTING.md`

---

*Enhanced Flowise-to-LangChain Converter*  
*Production-ready tool with 89 converters and multi-language support*