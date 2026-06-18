# ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ (MCP) ਦਾ Microsoft Foundry ਨਾਲ ਏਕੀਕਰਨ

ਇਹ ਗਾਈਡ ਦਿਖਾਉਂਦੀ ਹੈ ਕਿ ਕਿਵੇਂ ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ (MCP) ਸਰਵਰਾਂ ਨੂੰ Microsoft Foundry ਏਜੰਟਾਂ ਨਾਲ ਜੋੜਿਆ ਜਾ ਸਕਦਾ ਹੈ, ਇਸ ਨਾਲ ਸ਼ਕਤੀਸ਼ਾਲੀ ਟੂਲ ਆਰਕੀਸਟਰੈਸ਼ਨ ਅਤੇ ਉਦਯੋਗ AI ਸਮਰਥਾਵਾਂ ਮੁਹੱਈਆ ਹੁੰਦੀਆਂ ਹਨ।

## ਪਰਿਚਯ

ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ (MCP) ਇੱਕ ਖੁਲਾ ਮਿਆਰ ਹੈ ਜੋ AI ਐਪਲੀਕੇਸ਼ਨਾਂ ਨੂੰ ਬਾਹਰੀ ਡਾਟਾ ਸਰੋਤਾਂ ਅਤੇ ਟੂਲਾਂ ਨਾਲ ਸੁਰੱਖਿਅਤ ਤਰੀਕੇ ਨਾਲ ਜੁੜਨ ਦੇ ਯੋਗ ਬਣਾਉਂਦਾ ਹੈ। ਜਦੋਂ Microsoft Foundry ਨਾਲ ਐਕਠੇ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, MCP ਏਜੰਟਾਂ ਨੂੰ ਵੱਖ-ਵੱਖ ਬਾਹਰੀ ਸਰਵਿਸਾਂ, APIs ਅਤੇ ਡਾਟਾ ਸਰੋਤਾਂ ਤੱਕ ਸਧਾਰਨ ਤਰੀਕੇ ਨਾਲ ਪਹੁੰਚ ਅਤੇ ਇੰਟਰੈਕਟ ਕਰਨ ਦੇ ਯੋਗ ਬਣਾਉਂਦਾ ਹੈ।

ਇਹ ਏਕੀਕਰਨ MCP ਦੇ ਟੂਲ ਪਰਿਆਵਰਣ ਦੀ ਲਚਕੀਲਾਪਣਤਾ ਨੂੰ Microsoft Foundry ਦੇ ਮਜ਼ਬੂਤ ਏਜੰਟ ਫਰੇਮਵਰਕ ਨਾਲ ਜੋੜਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਉਦਯੋਗ-ਗ੍ਰੇਡ AI ਹੱਲਾਂ ਵਿਆਪਕ ਕਸਟਮਾਈਜੇਸ਼ਨ ਸਮਰਥਾਵਾਂ ਨਾਲ ਮੁਹੱਈਆ ਹੁੰਦੇ ਹਨ।

**ਨੋਟ:** ਜੇ ਤੁਸੀਂ MCP ਨੂੰ Microsoft Foundry Agent Service ਵਿੱਚ ਵਰਤਣਾ ਚਾਹੁੰਦੇ ਹੋ, ਤਾਂ ਇਸ ਸਮੇਂ ਸਿਰਫ ਹੇਠਾਂ ਦਿੱਤੇ ਖੇਤਰ ਸਮਰਥਿਤ ਹਨ: westus, westus2, uaenorth, southindia ਅਤੇ switzerlandnorth

## ਸਿੱਖਣ ਦੇ ਉਦੇਸ਼

ਇਸ ਗਾਈਡ ਦੇ ਅੰਤ ਤਕ, ਤੁਸੀਂ ਸਮਰੱਥ ਹੋਵੋਗੇ:

- ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ ਅਤੇ ਇਸਦੇ ਲਾਭਾਂ ਨੂੰ ਸਮਝਣਾ
- Microsoft Foundry ਏਜੰਟਾਂ ਨਾਲ ਵਰਤੋਂ ਲਈ MCP ਸਰਵਰ ਸੈੱਟਅਪ ਕਰਨਾ
- MCP ਟੂਲ ਏਕੀਕਰਨ ਨਾਲ ਏਜੰਟ ਬਣਾਉਣਾ ਅਤੇ ਸੰਰਚਿਤ ਕਰਨਾ
- ਅਸਲੀ MCP ਸਰਵਰਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦਿਆਂ ਪ੍ਰായੋਗਿਕ ਉਦਾਹਰਣ ਲਾਗੂ ਕਰਨਾ
- ਏਜੰਟ ਗੱਲਬਾਤਾਂ ਵਿੱਚ ਟੂਲ ਜਵਾਬਾਂ ਅਤੇ ਹਵਾਲਿਆਂ ਨੂੰ ਸੰਭਾਲਣਾ

## ਪਹਿਲਾਂ ਜ਼ਰੂਰੀਆਂ ਸ਼ਰਤਾਂ

ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, ਇਹ ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡੇ ਕੋਲ ਹੈ:

- Microsoft Foundry ਐਕਸੈਸ ਵਾਲੀ ਇੱਕ Azure ਸਬਸਕ੍ਰਿਪਸ਼ਨ
- Python 3.10+ ਜਾਂ .NET 8.0+
- Azure CLI ਇੰਸਟਾਲ ਅਤੇ ਸੰਰਚਿਤ
- AI ਸਰੋਤ ਬਣਾਉਣ ਲਈ ਯੋਗ ਅਧਿਕਾਰ

## ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ (MCP) ਕੀ ਹੈ?

ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ ਇੱਕ ਮਿਆਰੀ ਤਰੀਕਾ ਹੈ ਜੋ AI ਐਪਲੀਕੇਸ਼ਨਾਂ ਨੂੰ ਬਾਹਰੀ ਡਾਟਾ ਸਰੋਤਾਂ ਅਤੇ ਟੂਲਾਂ ਨਾਲ ਜੁੜਨ ਲਈ ਯੋਗ ਬਣਾਉਂਦਾ ਹੈ। ਮੁੱਖ ਲਾਭ ਇਸ ਪ੍ਰਕਾਰ ਹਨ:

- **ਮਿਆਰੀਕ੍ਰਿਤ ਏਕੀਕਰਨ**: ਵੱਖ-ਵੱਖ ਟੂਲਾਂ ਅਤੇ ਸੇਵਾਵਾਂ ਲਈ ਇੱਕਸਾਰ ਇੰਟਰਫੇਸ
- **ਸੁਰੱਖਿਆ**: ਸੁਰੱਖਿਅਤ ਪ੍ਰਮਾਣਿਕਤਾ ਅਤੇ ਅਧਿਕਾਰ ਪ੍ਰਣਾਲੀਆਂ
- **ਲਚਕੀਲਾਪਣਤਾ**: ਵੱਖ-ਵੱਖ ਡਾਟਾ ਸਰੋਤਾਂ, APIs ਅਤੇ ਕਸਟਮ ਟੂਲਾਂ ਲਈ ਸਮਰਥਨ
- **ਵਿਸਤਾਰਯੋਗਤਾ**: ਨਵੀਆਂ ਸਮਰਥਾਵਾਂ ਅਤੇ ਏਕੀਕਰਨੇ ਜੋੜਣਾ ਆਸਾਨ

## Microsoft Foundry ਨਾਲ MCP ਸੈੱਟਅਪ ਕਰਨਾ

### ਵਾਤਾਵਰਨ ਸੰਰਚਨਾ

ਆਪਣੇ ਮਨਪਸੰਦ ਡਿਵੈਲਪਮੈਂਟ ਵਾਤਾਵਰਨ ਦੀ ਚੋਣ ਕਰੋ:

- [Python Implementation](#python-implementation)
- [.NET Implementation](#codeblock5)

---

## Python Implementation

***ਨੋਟ*** ਤੁਸੀਂ ਇਹ [ਨੋਟਬੁੱਕ](./mcp_support_python.ipynb) ਚਲਾ ਸਕਦੇ ਹੋ

### 1. ਲੋੜੀਂਦੇ ਪੈਕੇਜ ਇੰਸਟਾਲ ਕਰੋ

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. ਡਿਪੈਂਡੈਂਸੀਜ਼ ਇੰਪੋਰਟ ਕਰੋ

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP ਸੈਟਿੰਗਸ ਸੰਰਚਿਤ ਕਰੋ

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. ਪ੍ਰੋਜੈਕਟ ਕਲਾਇੰਟ ਸ਼ੁਰੂਆਤ ਕਰੋ

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP ਟੂਲ ਬਣਾਓ

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # ਵਿਕਲਪਿਕ: ਆਗਿਆਯਤ ਸੰਦਾਂ ਨੂੰ ਦਰਸਾਓ
)
```

### 6. ਪੂਰਾ Python ਉਦਾਹਰਣ

```python
with project_client:
    agents_client = project_client.agents

    # MCP ਟੂਲਜ਼ ਨਾਲ ਨਵਾਂ ਏਜੰਟ ਬਣਾਓ
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # ਸੰਚਾਰ ਲਈ ਧਾਗਾ ਬਣਾਓ
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # ਧਾਗੇ ਲਈ ਸੁਨੇਹਾ ਬਣਾਓ
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # ਟੂਲ ਮਨਜ਼ੂਰੀਆਂ ਸੰਭਾਲੋ ਅਤੇ ਏਜੰਟ ਚਲਾਓ
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

    # ਗੱਲਬਾਤ ਦਿਖਾਓ
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

***ਨੋਟ*** ਤੁਸੀਂ ਇਹ [ਨੋਟਬੁੱਕ](./mcp_support_dotnet.ipynb) ਚਲਾ ਸਕਦੇ ਹੋ

### 1. ਲੋੜੀਂਦੇ ਪੈਕੇਜ ਇੰਸਟਾਲ ਕਰੋ

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. ਡਿਪੈਂਡੈਂਸੀਜ਼ ਇੰਪੋਰਟ ਕਰੋ

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. ਸੈਟਿੰਗਸ ਸੰਰਚਿਤ ਕਰੋ

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP ਟੂਲ ਪਰਿਭਾਸ਼ਾ ਬਣਾਓ

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. MCP ਟੂਲਾਂ ਨਾਲ ਏਜੰਟ ਬਣਾਓ

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. ਪੂਰਾ .NET ਉਦਾਹਰਣ

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

## MCP ਟੂਲ ਸੰਰਚਨਾ ਵਿਕਲਪ

ਜਦੋਂ ਤੁਸੀਂ ਆਪਣੇ ਏਜੰਟ ਲਈ MCP ਟੂਲ ਸੰਰਚਿਤ ਕਰ ਰਹੇ ਹੋ, ਤੁਸੀਂ ਕਈ ਮਹੱਤਵਪੂਰਨ ਪੈਰਾਮੀਟਰ ਨਿਰਧਾਰਤ ਕਰ ਸਕਦੇ ਹੋ:

### Python ਸੰਰਚਨਾ

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP ਸਰਵਰ ਲਈ ਪਹਚਾਣਕ
    server_url="https://api.example.com/mcp", # MCP ਸਰਵਰ ਐਂਡਪੌਇੰਟ
    allowed_tools=[],                       # ਵਿਕਲਪਿਕ: ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸਾਧਨਾਂ ਨੂੰ ਦਰਸਾਓ
)
```

### .NET ਸੰਰਚਨਾ

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## ਪ੍ਰਮਾਣਿਕਤਾ ਅਤੇ ਹੈਡਰਜ਼

ਦੋਹਾਂ ਇਮਪਲਿਮੈਂਟੇਸ਼ਨਾਂ ਵਿੱਚ ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ ਕਸਟਮ ਹੈਡਰਜ਼ ਦਾ ਸਮਰਥਨ ਹੈ:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## ਆਮ ਸਮੱਸਿਆਵਾਂ ਦਾ ਨਿਵਾਰਣ

### 1. ਕਨੈਕਸ਼ਨ ਸਮੱਸਿਆਵਾਂ
- MCP ਸਰਵਰ URL ਦੀ ਪਹੁੰਚ ਯਕੀਨੀ ਬਣਾਓ
- ਪ੍ਰਮਾਣਿਕਤਾ ਦੀਆਂ ਸਹੀ ਜਾਣਕਾਰੀਆਂ ਦੀ ਜਾਂਚ ਕਰੋ
- ਨੈੱਟਵਰਕ ਕਨੈਕਟਿਵਿਟੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ

### 2. ਟੂਲ ਕਾਲ ਫੇਲ੍ਹ
- ਟੂਲ ਆਰਗਯੂਮੈਂਟਸ ਅਤੇ ਫਾਰਮੈਟਿੰਗ ਦੀ ਸਮੀਖਿਆ ਕਰੋ
- ਸਰਵਰ-ਵਿਸ਼ੇਸ਼ ਲੋੜਾਂ ਦੀ ਜਾਂਚ ਕਰੋ
- ਠੀਕ ਤਰੀਕੇ ਨਾਲ ਗਲਤੀ ਹੈਂਡਲਿੰਗ ਲਾਗੂ ਕਰੋ

### 3. ਪ੍ਰਦਰਸ਼ਨ ਸੰਬੰਧੀ ਸਮੱਸਿਆਵਾਂ
- ਟੂਲ ਕਾਲ ਦੀ ਆਵ੍ਰਤੀ ਸੁਧਾਰੋ
- ਜਿੱਥੇ ਲੋੜ ਹੋਵੇ ਕੈਸ਼ਿੰਗ ਲਾਗੂ ਕਰੋ
- ਸਰਵਰ ਜਵਾਬ ਸਮਿਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ

## ਅੱਗੇ ਦੇ ਕਦਮ

ਆਪਣੇ MCP ਏਕੀਕਰਨ ਨੂੰ ਹੋਰ ਵਧੀਆ ਬਣਾਉਣ ਲਈ:

1. **ਕਸਟਮ MCP ਸਰਵਰਾਂ ਦੀ ਖੋਜ ਕਰੋ**: ਆਪਣੇ ਖਾਸ ਡਾਟਾ ਸਰੋਤਾਂ ਲਈ ਆਪਣਾ MCP ਸਰਵਰ ਬਣਾਓ
2. **ਉੱਚ ਸੁਰੱਖਿਆ ਲਾਗੂ ਕਰੋ**: OAuth2 ਜਾਂ ਕਸਟਮ ਪ੍ਰਮਾਣਿਕਤਾ ਤंत्र ਸ਼ਾਮਲ ਕਰੋ
3. **ਨਿਗਰਾਨੀ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ**: ਟੂਲ ਦੀ ਵਰਤੋਂ ਲਈ ਲੌਗਿੰਗ ਅਤੇ ਨਿਗਰਾਨੀ ਲਾਗੂ ਕਰੋ
4. **ਆਪਣੇ ਹੱਲ ਨੂੰ ਪੈਮਾਨੇ ‘ਤੇ ਲਿਆਓ**: ਲੋਡ ਬੈਲੈਂਸਿੰਗ ਅਤੇ ਵਿਤਰਿਤ MCP ਸਰਵਰ ਆਰਕੀਟੈਕਚਰਾਂ ਬਾਰੇ ਸੋਚੋ

## ਵਾਧੂ ਸਰੋਤ

- [Microsoft Foundry ਦਸਤਾਵੇਜ਼ੀकरण](https://learn.microsoft.com/azure/ai-foundry/)
- [ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ ਨਮੂਨੇ](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry ਏਜੰਟਸ ਦਾ ਓਵਰਵਿਊ](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP ਵਿਸ਼ੇਸ਼ਤਾ](https://spec.modelcontextprotocol.io/)

## ਸਹਾਇਤਾ

ਵਾਧੂ ਸਹਾਇਤਾ ਅਤੇ ਸਵਾਲਾਂ ਲਈ:
- [Microsoft Foundry ਦਸਤਾਵੇਜ਼ੀकरण](https://learn.microsoft.com/azure/ai-foundry/) ਵੇਖੋ
- [MCP ਕਮਿਊਨਿਟੀ ਸਰੋਤ](https://modelcontextprotocol.io/) ਚੈੱਕ ਕਰੋ

## ਅੱਗੇ ਕੀ

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->