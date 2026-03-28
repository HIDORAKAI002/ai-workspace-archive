# AgentFlow Converter for Flowise to LangChain

This converter transforms Flowise AgentFlow JSON files into executable LangChain TypeScript code, enabling multi-agent workflows with coordination, conditional routing, and loops.

## Overview

AgentFlows represent multi-agent workflows in Flowise where multiple AI agents collaborate to solve complex tasks. The converter supports the following node types:

- **Start**: Entry point of the workflow with flow state initialization
- **Agent**: Individual agents with specific roles (Software Engineer, Code Reviewer, etc.)
- **Condition**: Conditional branching logic for routing between agents
- **Loop**: Iterative execution with loop back to previous nodes
- **LLM**: Language model nodes (often used as supervisors)

## Usage

### Quick Conversion Script

Use the standalone script to convert AgentFlow JSON files:

```bash
# Convert all agentflows in the chatflows directory
node convert-all-agentflows.cjs

# This will convert:
# - Software Team Agents.json → software-team-agentflow-converted.ts
# - Strategy Team Agents.json → strategy-team-agentflow-converted.ts
```

### Using the Converter Classes

For programmatic conversion, use the individual converter classes:

```typescript
import {
  StartAgentFlowConverter,
  AgentAgentFlowConverter,
  ConditionAgentFlowConverter,
  LoopAgentFlowConverter,
  LLMAgentFlowConverter
} from './flowise-to-langchain/src/emitters/typescript/converters/agentflow';

// Example: Convert an agent node
const agentConverter = new AgentAgentFlowConverter();
const codeFragments = agentConverter.convert(agentNode, context);
```

## Generated Code Structure

The converter generates a complete multi-agent workflow with:

### 1. Flow State Management
```typescript
interface FlowState {
  next: string;      // Next agent to execute
  instruction: string; // Instructions for the agent
  // ... other state variables
}
```

### 2. Supervisor Agent
```typescript
// Supervisor with structured output
const supervisorOutputSchema = z.object({
  next: z.enum(["FINISH", "SOFTWARE", "REVIEWER"]),
  instructions: z.string(),
  reasoning: z.string()
});

async function runSupervisor(input: string, chatHistory: any[]): Promise<SupervisorOutput>
```

### 3. Worker Agents
```typescript
// Individual agent implementations
async function runSoftwareEngineer(input?: string): Promise<any>
async function runCodeReviewer(input?: string): Promise<any>
```

### 4. Workflow Orchestration
```typescript
// Main orchestration loop
async function runSoftwareTeamWorkflow(initialInput: string): Promise<string> {
  // Supervisor determines next agent
  // Routes to appropriate agent
  // Maintains conversation history
  // Handles termination conditions
}
```

## Node Type Details

### Start Node
- Initializes flow state variables
- Configures input type (chat or form)
- Sets up memory persistence options

### Agent Node
- Creates LangChain agents with tools
- Configures model settings (OpenAI, Anthropic, etc.)
- Implements memory management
- Handles system prompts and user messages

### Condition Node
- Evaluates flow state conditions
- Routes to different execution paths
- Supports various comparison operations

### Loop Node
- Implements iteration control
- Tracks loop history
- Enforces maximum iteration limits

### LLM Node
- Can act as supervisor or regular LLM
- Supports structured output with Zod schemas
- Updates flow state based on decisions

## Example: Software Team Workflow

The Software Team AgentFlow demonstrates a code development workflow:

1. **Supervisor** receives the initial request
2. **Supervisor** analyzes and assigns to either:
   - **Software Engineer**: Implements new features
   - **Code Reviewer**: Reviews and provides feedback
3. **Loop** continues until FINISH condition
4. **Final Answer Generator** summarizes the complete solution

## Configuration

### Model Support
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Azure OpenAI
- DeepSeek
- Custom endpoints

### Memory Types
- All Messages
- Window Size (last N messages)
- Conversation Summary
- Summary Buffer

### Tools Integration
Agents can be configured with tools:
- Custom functions
- API integrations
- Document stores
- Vector databases

## Advanced Features

### Structured Output
Supervisors use Zod schemas for consistent decision-making:
```typescript
const schema = z.object({
  next: z.enum(["AGENT1", "AGENT2", "FINISH"]),
  instructions: z.string(),
  reasoning: z.string()
});
```

### Flow State Variables
Dynamic variable substitution in prompts:
```
{{ $flow.state.instruction }}  → ${flowState.instruction}
{{ output.next }}              → ${result.next}
```

### Conditional Routing
Complex conditions with multiple operations:
- Equal/Not Equal
- Contains/Not Contains
- Starts/Ends With
- Regex matching
- Empty/Not Empty

## Testing

Run the unit tests:
```bash
npm test -- agentflow-converter.test.ts
```

## Limitations & Next Steps

Current limitations:
1. Tools need to be manually added to agents
2. Vector store connections require configuration
3. Authentication tokens need environment setup

Future enhancements:
- Automatic tool detection and configuration
- Support for more node types (human-in-loop, external APIs)
- Visual workflow diagram generation
- Runtime monitoring and debugging

## Contributing

To add support for new AgentFlow node types:

1. Create a new converter class extending `AgentFlowBaseConverter`
2. Implement the `convert()` and `getDependencies()` methods
3. Register the converter in `agentflow.ts`
4. Add unit tests
5. Update the standalone script if needed

## License

Same as the parent flowise-to-langchain project.