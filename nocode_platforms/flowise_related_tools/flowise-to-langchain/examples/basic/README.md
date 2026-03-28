# Basic Examples

This directory contains simple, linear Flowise flow examples that demonstrate fundamental patterns for the flowise-to-langchain converter.

## Examples

### 1. Simple Prompt → LLM Flow (`simple-prompt-llm.flowise.json`)
**Components:** PromptTemplate → ChatOpenAI → LLMChain
**Description:** A basic linear flow connecting a prompt template to an LLM via a chain
**Use Case:** Simple text generation, Q&A, content creation
**Key Features:**
- Single prompt template with variable substitution
- ChatOpenAI with configurable temperature and max tokens
- LLM chain for orchestration

### 2. Conversation with Memory (`conversation-memory.flowise.json`)
**Components:** BufferMemory + ChatPromptTemplate → ChatOpenAI → ConversationChain
**Description:** A chat flow that maintains conversation context using buffer memory
**Use Case:** Chatbots, conversational AI, multi-turn dialogue
**Key Features:**
- Buffer memory for conversation history
- Chat prompt template with system and human messages
- Conversation chain for context-aware responses

## Pattern Guide

### Basic Linear Flow Pattern
```
Input → Processing → Output
```
Most basic examples follow this simple pattern where data flows linearly from input through processing to output.

### Memory Integration Pattern
```
Memory ← → Processing → Output
      ↑      ↓
      └─ Feedback ─┘
```
Conversations and stateful flows use memory to maintain context across interactions.

## Validation Notes

These examples are designed to:
1. ✅ Pass schema validation with proper node structure
2. ✅ Have valid edge connections between existing nodes
3. ✅ Include realistic parameter values
4. ✅ Demonstrate common use patterns
5. ✅ Be convertible to working LangChain code

## Testing Usage

Use these examples for:
- **Parser testing**: Validate JSON structure parsing
- **Converter testing**: Test node-to-LangChain conversion
- **Integration testing**: End-to-end flow validation
- **Documentation**: Reference implementations for users