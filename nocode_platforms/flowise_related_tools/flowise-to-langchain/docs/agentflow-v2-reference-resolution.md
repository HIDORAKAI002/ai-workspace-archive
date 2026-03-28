# AgentFlow V2 Reference Resolution System

## Overview

The AgentFlow V2 converter now includes a comprehensive reference resolution system that replaces placeholder references with actual runtime variable names. This system tracks node dependencies and ensures proper initialization order.

## Key Components

### 1. ReferenceResolver Class

The `ReferenceResolver` class manages the dependency graph and resolves references between nodes:

```typescript
interface NodeReference {
  nodeId: string;
  variableName: string;
  type: 'llm' | 'tool' | 'memory' | 'subflow' | 'agent' | 'function' | 'chain' | 'prompt' | 'vectorstore';
}
```

Key methods:
- `registerNode()`: Register a node with its variable name and type
- `addDependency()`: Track dependencies between nodes
- `resolveReference()`: Convert node ID to variable name
- `getTopologicalOrder()`: Get nodes in dependency order
- `hasCircularDependency()`: Detect circular references

### 2. Reference Resolution Process

#### Step 1: Node Registration
When converting a node, it's automatically registered:
```typescript
BaseAgentFlowV2Converter.referenceResolver.registerNode(
  node.id,
  variableName,
  this.getNodeType()
);
```

#### Step 2: Dependency Tracking
Dependencies are tracked from:
- Graph edges (connections between nodes)
- Parameter references (e.g., `llm`, `tools`, `memory`)

#### Step 3: Placeholder Resolution
Placeholders are replaced with actual variable names:
- `LLM_REFERENCE_PLACEHOLDER` → Resolved LLM variable
- `TOOLS_REFERENCE_PLACEHOLDER` → Array of tool variables
- `MEMORY_REFERENCE_PLACEHOLDER` → Memory variable
- `SUBFLOW_STEPS_PLACEHOLDER` → Subflow components

### 3. Supported Placeholder Types

1. **Reference Placeholders**: Direct node references
   - `LLM_REFERENCE_PLACEHOLDER`
   - `TOOLS_REFERENCE_PLACEHOLDER`
   - `MEMORY_REFERENCE_PLACEHOLDER`

2. **General Placeholders**: Custom resolution patterns
   - `FUNCTION_PLACEHOLDER`
   - `NODE_<ID>_PLACEHOLDER`
   - `SUBFLOW_<TYPE>_PLACEHOLDER`

### 4. Resolution Methods

#### resolveLLMReference()
- Checks for direct node ID references
- Searches for LLM nodes in the graph
- Falls back to chain nodes containing LLMs
- Returns `'defaultLLM'` if no match found

#### resolveToolsReference()
- Resolves array of tool references
- Includes both explicit references and connected tools
- Returns array syntax: `[tool1, tool2, ...]`

#### resolveMemoryReference()
- Resolves memory node references
- Returns `'null'` if no memory connected

#### resolveSubflowReference()
- Resolves subflow components
- Returns array of agent/runnable references

### 5. Agent Node Special Handling

Agent nodes require special initialization:
```typescript
// 1. Create the agent with resolved references
const agent = await createOpenAIFunctionsAgent({
  llm: resolvedLLM,
  tools: resolvedTools,
  prompt: ChatPromptTemplate.fromMessages([...])
});

// 2. Wrap in AgentExecutor
const executor = new AgentExecutor({
  agent: agent,
  tools: resolvedTools,
  memory: resolvedMemory,
  // ... other config
});
```

### 6. Initialization Order

The system ensures proper initialization order:
1. Dependencies are initialized before dependents
2. Topological sort prevents circular dependencies
3. Code fragments maintain correct ordering

## Usage Example

```typescript
// Input node with references
const agentNode = {
  id: 'agent_1',
  parameters: [
    { name: 'llm', value: 'llm_node_123' },
    { name: 'tools', value: ['tool_1', 'tool_2'] },
    { name: 'memory', value: 'memory_456' }
  ]
};

// After resolution
const agent = new AgentExecutor({
  llm: chatOpenAI_llm_node_123,    // Resolved reference
  tools: [calculator_tool_1, search_tool_2], // Resolved array
  memory: bufferMemory_memory_456,  // Resolved reference
  maxIterations: 10
});
```

## Benefits

1. **Type Safety**: References are validated at conversion time
2. **Dependency Management**: Automatic ordering of node initialization
3. **Flexibility**: Supports various reference patterns
4. **Error Prevention**: Detects circular dependencies
5. **Clean Code**: No manual placeholder replacement needed

## Future Enhancements

1. Support for dynamic reference resolution
2. Advanced circular dependency handling
3. Reference validation with type checking
4. Support for conditional references
5. Reference caching for performance