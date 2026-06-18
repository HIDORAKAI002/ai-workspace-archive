# Model Context Protocol (MCP) Integration wit Microsoft Foundry

Dis guide go show how you fit join Model Context Protocol (MCP) servers wit Microsoft Foundry agents, wey go enable powerful tool waka-togeda and enterprise AI fiture.

## Introduction

Model Context Protocol (MCP) na open standard wey make AI apps fit connect wella wit outside data sources and tools. Wen you join am wit Microsoft Foundry, MCP go allow agents to sabi reach and use different outside services, APIs, and data sources for one standard way.

Dis integration mix the flexibility of MCP tool system wit the strong agent structure of Microsoft Foundry, wey fit give big-big enterprise AI solution with plenty customization power.

**Note:** If you want use MCP for Microsoft Foundry Agent Service, as e be now na only dis regions dem di support: westus, westus2, uaenorth, southindia and switzerlandnorth

## Learning Objectives

By di time you finish dis guide, you go fit:

- Understand Model Context Protocol and wetin e make sense
- Set up MCP servers to work wit Microsoft Foundry agents
- Create and arrange agents wit MCP tool join
- Use real MCP servers make example
- Manage tool answers and citations for agent talks

## Prerequisites

Before you start, make sure say you get:

- Azure subscription wey get access for Microsoft Foundry
- Python 3.10+ or .NET 8.0+
- Azure CLI wey you don install and set
- Correct permission to create AI stuff

## Wetin be Model Context Protocol (MCP)?

Model Context Protocol na one standard way wey AI apps take connect outside data sources and tools. Wetin e good for na:

- **Standardized Integration**: One type kind interface for different tools and services
- **Security**: Strong authentication and authorization
- **Flexibility**: Fit handle many different data sources, APIs, and special tools
- **Extensibility**: Easy to add new power or join new things

## How to Set Up MCP wit Microsoft Foundry

### Environment Configuration

Choose your development environment wey you like:

- [Python Implementation](#python-implementation)
- [.NET Implementation](#codeblock5)

---

## Python Implementation

***Note*** You fit run dis [notebook](./mcp_support_python.ipynb)

### 1. Install Required Packages

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Import Dependencies

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. Configure MCP Settings

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Initialize Project Client

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. Create MCP Tool

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Optional: tok am which tools you fit use
)
```

### 6. Complete Python Example

```python
with project_client:
    agents_client = project_client.agents

    # Make new agent with MCP tools
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Make thread for talk
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Make message go thread
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Manage tool permission dem and run agent
    mcp_tool.update_headers("SuperSecret", "123456")
    run = agents_client.runs.create(thread_id=thread.id, agent_id=agent.id, tool_resources=mcp_tool.resources)
    print(f"Created run, ID: {run.id}")

    while run.status in ["queued", "in_progress", "requires_action"]:
        time.sleep(1)
        run = agents_client.runs.get(thread_id=thread.id, run_id=run.id)

        if run.status == "requires_action" and isinstance(run.required_action, SubmitToolApprovalAction):
            tool_calls = run.required_action.submit_tool_approval.tool_calls
            if not tool_calls:
                print("No tool calls provided - cancelling run")
                agents_client.runs.cancel(thread_id=thread.id, run_id=run.id)
                break

            tool_approvals = []
            for tool_call in tool_calls:
                if isinstance(tool_call, RequiredMcpToolCall):
                    try:
                        print(f"Approving tool call: {tool_call}")
                        tool_approvals.append(
                            ToolApproval(
                                tool_call_id=tool_call.id,
                                approve=True,
                                headers=mcp_tool.headers,
                            )
                        )
                    except Exception as e:
                        print(f"Error approving tool_call {tool_call.id}: {e}")

            if tool_approvals:
                agents_client.runs.submit_tool_outputs(
                    thread_id=thread.id, run_id=run.id, tool_approvals=tool_approvals
                )

        print(f"Current run status: {run.status}")

    print(f"Run completed with status: {run.status}")

    # Show conversation
    messages = agents_client.messages.list(thread_id=thread.id)
    print("\nConversation:")
    print("-" * 50)
    for msg in messages:
        if msg.text_messages:
            last_text = msg.text_messages[-1]
            print(f"{msg.role.upper()}: {last_text.text.value}")
            print("-" * 50)
```

---

## .NET Implementation

***Note*** You fit run dis [notebook](./mcp_support_dotnet.ipynb)

### 1. Install Required Packages

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Import Dependencies

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. Configure Settings

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. Create MCP Tool Definition

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Create Agent with MCP Tools

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Complete .NET Example

```csharp
// Create thread and message
PersistentAgentThread thread = await agentClient.Threads.CreateThreadAsync();

PersistentThreadMessage message = await agentClient.Messages.CreateMessageAsync(
    thread.Id,
    MessageRole.User,
    "What's difference between Azure OpenAI and OpenAI?");

// Configure tool resources with headers
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
ToolResources toolResources = mcpToolResource.ToToolResources();

// Create and handle run
ThreadRun run = await agentClient.Runs.CreateRunAsync(thread, agent, toolResources);

while (run.Status == RunStatus.Queued || run.Status == RunStatus.InProgress || run.Status == RunStatus.RequiresAction)
{
    await Task.Delay(TimeSpan.FromMilliseconds(1000));
    run = await agentClient.Runs.GetRunAsync(thread.Id, run.Id);

    if (run.Status == RunStatus.RequiresAction && run.RequiredAction is SubmitToolApprovalAction toolApprovalAction)
    {
        var toolApprovals = new List<ToolApproval>();
        foreach (var toolCall in toolApprovalAction.SubmitToolApproval.ToolCalls)
        {
            if (toolCall is RequiredMcpToolCall mcpToolCall)
            {
                Console.WriteLine($"Approving MCP tool call: {mcpToolCall.Name}");
                toolApprovals.Add(new ToolApproval(mcpToolCall.Id, approve: true)
                {
                    Headers = { ["SuperSecret"] = "123456" }
                });
            }
        }

        if (toolApprovals.Count > 0)
        {
            run = await agentClient.Runs.SubmitToolOutputsToRunAsync(thread.Id, run.Id, toolApprovals: toolApprovals);
        }
    }
}

// Display messages
using Azure;

AsyncPageable<PersistentThreadMessage> messages = agentClient.Messages.GetMessagesAsync(
    threadId: thread.Id,
    order: ListSortOrder.Ascending
);

await foreach (PersistentThreadMessage threadMessage in messages)
{
    Console.Write($"{threadMessage.CreatedAt:yyyy-MM-dd HH:mm:ss} - {threadMessage.Role,10}: ");
    foreach (MessageContent contentItem in threadMessage.ContentItems)
    {
        if (contentItem is MessageTextContent textItem)
        {
            Console.Write(textItem.Text);
        }
        else if (contentItem is MessageImageFileContent imageFileItem)
        {
            Console.Write($"<image from ID: {imageFileItem.FileId}>");
        }
        Console.WriteLine();
    }
}
```

---

## MCP Tool Configuration Options

When you dey arrange MCP tools for your agent, you fit put some important settings:

### Python Configuration

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # Identifier for di MCP server
    server_url="https://api.example.com/mcp", # MCP server endpoint
    allowed_tools=[],                       # Optional: specify allowed tools
)
```

### .NET Configuration

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Authentication and Headers

Both ways support custom headers for authentication:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Troubleshooting Common Issues

### 1. Connection Issues
- Make sure MCP server URL dey work
- Check authentication credentials well
- Make sure network no get wahala

### 2. Tool Call Failures
- Check tool argument dem and how you format am
- Make sure you follow server own rules
- Use correct way to handle errors

### 3. Performance Issues
- Make tool call no too frequent
- Use caching if e fit help
- Check how fast server dey respond

## Next Steps

To make your MCP integration beta:

1. **Explore Custom MCP Servers**: Build your own MCP servers for your own data
2. **Implement Advanced Security**: Add OAuth2 or your own authentication style
3. **Monitor and Analytics**: Setup logging and monitoring for tool use
4. **Scale Your Solution**: Think about load balancing and spread MCP server architectures

## Additional Resources

- [Microsoft Foundry Documentation](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol Samples](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry Agents Overview](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

## Support

If you want more support and get questions:
- Check di [Microsoft Foundry documentation](https://learn.microsoft.com/azure/ai-foundry/)
- Look di [MCP community resources](https://modelcontextprotocol.io/)

## Wetin dey next 

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->