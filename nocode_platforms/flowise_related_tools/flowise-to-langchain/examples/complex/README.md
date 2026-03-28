# Complex Examples

This directory contains advanced Flowise flow examples that demonstrate complex patterns including agents, RAG, multi-step chains, and branching logic.

## Examples

### 1. Agent with Tools (`agent-with-tools.flowise.json`)
**Components:** Calculator + SerpAPI → ChatOpenAI → AgentExecutor
**Description:** An intelligent agent that can perform calculations and web searches
**Use Case:** Question answering with external tools, research assistance, problem solving
**Key Features:**
- Multiple tool integration (calculator, search)
- Zero-shot React agent pattern
- Dynamic tool selection based on task requirements

### 2. RAG Document Q&A (`rag-document-qa.flowise.json`)
**Components:** PDFLoader → TextSplitter → Embeddings → VectorStore → RetrievalQAChain
**Description:** Retrieval-Augmented Generation for answering questions about PDF documents
**Use Case:** Document analysis, knowledge base Q&A, research assistance
**Key Features:**
- Document loading and processing pipeline
- Vector embeddings for semantic search
- Retrieval-based question answering
- Source document attribution

### 3. Multi-Step Research Chain (`multi-step-chain.flowise.json`)
**Components:** Research Chain → Summary Chain → SequentialChain
**Description:** A workflow that first researches a topic, then creates a structured summary
**Use Case:** Research automation, content generation, analysis workflows
**Key Features:**
- Sequential processing with intermediate results
- Different LLM configurations for different tasks
- Output passing between chain steps
- Structured multi-phase workflow

## Pattern Guide

### Agent Pattern
```
Tools → Agent → Dynamic Execution
```
Agents can dynamically select and use tools based on the task requirements.

### RAG Pattern
```
Documents → Embeddings → VectorStore → Retrieval → Generation
```
Retrieval-Augmented Generation combines document retrieval with text generation.

### Sequential Chain Pattern
```
Input → Step1 → Step2 → ... → StepN → Output
```
Multi-step workflows where each step processes the output of the previous step.

### Branching Pattern
```
Input → Decision → Branch A
              ├─→ Branch B
              └─→ Branch C
```
Complex flows with conditional logic and multiple execution paths.

## Validation Notes

These examples are designed to:
1. ✅ Test complex node relationships and dependencies
2. ✅ Validate multi-input/output scenarios
3. ✅ Exercise advanced converter functionality
4. ✅ Demonstrate real-world use cases
5. ✅ Test performance with larger flows

## Integration Patterns

### Document Processing Pipeline
- File loading → Text splitting → Embedding → Storage → Retrieval
- Supports various document formats (PDF, text, etc.)
- Configurable chunk sizes and overlap

### Agent-Tool Integration
- Dynamic tool selection based on natural language
- Error handling and retry logic
- Tool composition and chaining

### Memory and Context Management
- Conversation history maintenance
- Context passing between chain steps
- Stateful processing workflows

## Testing Usage

Use these examples for:
- **Performance testing**: Large flows with multiple nodes
- **Integration testing**: Complex inter-node dependencies
- **Feature testing**: Advanced converter capabilities
- **Real-world scenarios**: Production-like use cases