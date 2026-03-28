# Examples

This directory contains comprehensive example Flowise JSON files for testing and validation of the flowise-to-langchain converter.

## Directory Structure

- **`basic/`** - Simple examples with linear flows (2 examples)
- **`complex/`** - Advanced examples with branching, agents, and multi-step workflows (3 examples)
- **`edge-cases/`** - Invalid flows for testing error handling (3 examples)

## Example Categories

### Basic Examples
- **Simple Prompt → LLM**: Basic linear flow with prompt template and LLM
- **Conversation with Memory**: Chat flow with conversation history

### Complex Examples
- **Agent with Tools**: Intelligent agent using calculator and search tools
- **RAG Document Q&A**: Retrieval-Augmented Generation for PDF analysis
- **Multi-Step Chain**: Sequential research and summary workflow

### Edge Cases
- **Missing Nodes**: Invalid flow with broken edge references
- **Circular Reference**: Flow with circular dependencies
- **Missing Parameters**: Nodes with invalid or missing required parameters

## Validation Features

Each example demonstrates:
1. ✅ **Schema Compliance**: Proper Flowise JSON structure
2. ✅ **Node Variety**: Different LLM, prompt, chain, and tool types
3. ✅ **Connection Patterns**: Various edge and data flow patterns
4. ✅ **Parameter Examples**: Realistic configuration values
5. ✅ **Error Scenarios**: Edge cases for robust testing

## Testing Usage

### Parser Testing
```bash
# Test basic examples
npm run test:parser -- examples/basic/

# Test complex examples
npm run test:parser -- examples/complex/

# Test error handling
npm run test:parser -- examples/edge-cases/
```

### Converter Testing
```bash
# Convert and validate examples
npm run convert examples/basic/simple-prompt-llm.flowise.json
npm run convert examples/complex/agent-with-tools.flowise.json
```

### Validation Testing
```bash
# Test schema validation
npm run validate examples/basic/
npm run validate examples/edge-cases/ # Should show validation errors
```

## File Structure

Each example includes:
1. **Flowise JSON** (`*.flowise.json`) - Original flow definition
2. **Generated Code** (`*.generated.ts`) - Converted LangChain TypeScript
3. **Documentation** (`README.md`) - Pattern explanations and usage notes

## Pattern Reference

| Pattern | Basic Examples | Complex Examples |
|---------|---------------|------------------|
| Linear Flow | ✅ Simple Prompt → LLM | - |
| Memory Integration | ✅ Conversation Memory | - |
| Agent Pattern | - | ✅ Agent with Tools |
| RAG Pattern | - | ✅ Document Q&A |
| Sequential Chains | - | ✅ Multi-Step Research |
| Error Handling | - | ✅ Edge Cases |

## Quick Start

1. **Explore Examples**: Browse the directories to understand different patterns
2. **Run Validation**: Test the parser with various example types
3. **Convert Flows**: Generate LangChain code from examples
4. **Study Output**: Examine generated TypeScript for implementation patterns
5. **Create Custom**: Use examples as templates for your own flows