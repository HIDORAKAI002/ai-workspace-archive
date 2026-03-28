# Agent Node Architecture Design

## Overview

This document describes the architecture and implementation of agent node types for the Flowise-to-LangChain converter. The agent system enables intelligent task execution through tool usage and conversation management.

## Agent Node Types

### 1. OpenAI Functions Agent (`openAIFunctionsAgent`)

**Description**: Uses OpenAI's function calling capabilities to determine which tools to use and how to use them.

**Key Features**:
- Leverages OpenAI's fine-tuned models for function calling
- Intelligent tool selection based on user input
- Structured function arguments generation
- Compatible with GPT-3.5-turbo and GPT-4 models

**Inputs**:
- `llm`: Language model (must support function calling)
- `tools`: Array of tools the agent can use
- `prompt`: Optional custom prompt (defaults to LangSmith hub prompt)

**Parameters**:
- `maxIterations`: Maximum number of iterations (default: 15)
- `maxExecutionTime`: Maximum execution time in seconds
- `verbose`: Enable verbose logging
- `returnIntermediateSteps`: Return intermediate steps in response

**Generated Code Example**:
```typescript
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents';
import { pull } from 'langchain/hub';
import { ChatPromptTemplate } from '@langchain/core/prompts';

// Get the prompt from LangSmith Hub
const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-functions-agent");

const agent = await createOpenAIFunctionsAgent({
  llm,
  tools,
  prompt
});

const executor = new AgentExecutor({
  agent: agent,
  tools,
  maxIterations: 15,
  verbose: false,
  returnIntermediateSteps: false
});
```

### 2. Conversational Agent (`conversationalAgent`)

**Description**: Optimized for multi-turn conversations while maintaining the ability to use tools when needed.

**Key Features**:
- Maintains conversation context
- Natural conversation flow
- Optional memory integration
- Multiple agent types support

**Inputs**:
- `llm`: Language model for the agent
- `tools`: Array of tools the agent can use
- `memory`: Optional memory for conversation history

**Parameters**:
- `agentType`: Type of conversational agent (default: "chat-conversational-react-description")
- `maxIterations`: Maximum number of iterations (default: 15)
- `maxExecutionTime`: Maximum execution time in seconds
- `verbose`: Enable verbose logging
- `returnIntermediateSteps`: Return intermediate steps in response

**Generated Code Example**:
```typescript
import { initializeAgentExecutorWithOptions } from 'langchain/agents';

const executor = await initializeAgentExecutorWithOptions(tools, llm, {
  agentType: "chat-conversational-react-description",
  verbose: false,
  maxIterations: 15,
  returnIntermediateSteps: false,
  memory
});
```

### 3. Tool Calling Agent (`toolCallingAgent`)

**Description**: Modern agent implementation that uses tool calling for action determination.

**Key Features**:
- Modern LangChain agent architecture
- Flexible tool calling mechanism
- Custom prompt support
- Efficient tool selection

**Inputs**:
- `llm`: Language model (must support tool calling)
- `tools`: Array of tools the agent can use
- `prompt`: Prompt template for the agent

**Generated Code Example**:
```typescript
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';

const agent = await createToolCallingAgent({
  llm,
  tools,
  prompt
});

const executor = new AgentExecutor({
  agent: agent,
  tools,
  maxIterations: 15,
  verbose: false,
  returnIntermediateSteps: false
});
```

### 4. Structured Chat Agent (`structuredChatAgent`)

**Description**: Agent that can handle tools with structured input and output schemas.

**Key Features**:
- Structured input/output handling
- Complex tool schemas support
- Enhanced error handling
- Schema validation

**Inputs**:
- `llm`: Language model for the agent
- `tools`: Array of tools the agent can use
- `prompt`: Prompt template for the agent

**Generated Code Example**:
```typescript
import { createStructuredChatAgent, AgentExecutor } from 'langchain/agents';

const agent = await createStructuredChatAgent({
  llm,
  tools,
  prompt
});

const executor = new AgentExecutor({
  agent: agent,
  tools,
  maxIterations: 15,
  verbose: false,
  returnIntermediateSteps: false
});
```

## Architecture Components

### Base Agent Converter

The `BaseAgentConverter` provides common functionality for all agent types:

- **Agent Configuration**: Extracts and validates agent parameters
- **Executor Configuration**: Configures the AgentExecutor wrapper
- **Input Variable Resolution**: Determines required inputs (LLM, tools, memory, prompt)
- **Code Generation**: Generates TypeScript code for agent creation

### Connection Constraints

Agent nodes have specific connection requirements:

- **LLM Connection**: Required for all agent types (ChatOpenAI, OpenAI, etc.)
- **Tools Connection**: Required for tool usage (Calculator, SerpAPI, WebBrowser, etc.)
- **Memory Connection**: Optional for conversation history (BufferMemory, ConversationSummaryMemory)
- **Prompt Connection**: Optional/required depending on agent type

### Registry Integration

Agent converters are registered in the converter registry:

```typescript
// Agent Converters
OpenAIFunctionsAgentConverter,
ConversationalAgentConverter,
ToolCallingAgentConverter,
StructuredChatAgentConverter
```

## Implementation Details

### Code Generation Strategy

1. **Import Generation**: Generates appropriate imports for LangChain agent modules
2. **Agent Creation**: Creates the agent instance using the appropriate factory function
3. **Executor Wrapping**: Wraps the agent in an AgentExecutor for execution
4. **Configuration**: Applies user-specified parameters and defaults

### Error Handling

- **Validation**: Validates required inputs and parameters
- **Type Safety**: Ensures proper TypeScript type checking
- **Dependency Management**: Manages LangChain package dependencies
- **Connection Validation**: Validates proper node connections

### Performance Considerations

- **Async Support**: All agent creation is properly async
- **Memory Management**: Optional memory integration for conversation history
- **Timeout Handling**: Configurable execution timeouts
- **Iteration Limits**: Configurable maximum iterations

## Usage Examples

### Basic OpenAI Functions Agent

```json
{
  "nodes": [
    {
      "id": "chatOpenAI_0",
      "type": "chatOpenAI",
      "inputs": { "modelName": "gpt-4", "temperature": 0.1 }
    },
    {
      "id": "calculator_0",
      "type": "calculator"
    },
    {
      "id": "agent_0",
      "type": "openAIFunctionsAgent",
      "inputs": { "maxIterations": 20, "verbose": true }
    }
  ],
  "edges": [
    { "source": "chatOpenAI_0", "target": "agent_0", "targetHandle": "llm" },
    { "source": "calculator_0", "target": "agent_0", "targetHandle": "tools" }
  ]
}
```

### Conversational Agent with Memory

```json
{
  "nodes": [
    {
      "id": "chatOpenAI_0",
      "type": "chatOpenAI",
      "inputs": { "modelName": "gpt-3.5-turbo", "temperature": 0.7 }
    },
    {
      "id": "bufferMemory_0",
      "type": "bufferMemory",
      "inputs": { "memoryKey": "chat_history" }
    },
    {
      "id": "agent_0",
      "type": "conversationalAgent",
      "inputs": { "agentType": "chat-conversational-react-description" }
    }
  ],
  "edges": [
    { "source": "chatOpenAI_0", "target": "agent_0", "targetHandle": "llm" },
    { "source": "bufferMemory_0", "target": "agent_0", "targetHandle": "memory" }
  ]
}
```

## Dependencies

The agent system requires these LangChain packages:

- `langchain`: Core agent functionality
- `@langchain/core`: Core abstractions
- `@langchain/openai`: OpenAI-specific implementations
- `langchain/hub`: Prompt hub integration (for OpenAI Functions Agent)

## Testing

Example flows are provided in the `examples/complex/` directory:

- `openai-functions-agent.flowise.json`: OpenAI Functions Agent example
- `conversational-agent.flowise.json`: Conversational Agent with memory example

## Future Enhancements

1. **Additional Agent Types**: Support for more specialized agent types
2. **Custom Prompts**: Better support for custom agent prompts
3. **Agent Composition**: Support for multi-agent workflows
4. **Streaming Support**: Real-time agent response streaming
5. **Error Recovery**: Advanced error handling and retry mechanisms

## Conclusion

The agent node architecture provides a flexible and extensible foundation for building intelligent agents in the Flowise-to-LangChain converter. Each agent type is optimized for specific use cases while maintaining a consistent interface and code generation strategy.