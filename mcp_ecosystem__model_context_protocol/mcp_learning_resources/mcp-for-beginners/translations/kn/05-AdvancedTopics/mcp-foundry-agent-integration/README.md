# ಮಾದರಿ ಸಂದರ್ಭ ಪ್ರೋಟೋಕಾಲ್ (MCP) ಇಂಟಿಗ್ರೇಷನ್‌ ಸಹಿತ Microsoft Foundry

ಈ ಮಾರ್ಗದರ್ಶಕವು ಹೇಗೆ ಮಾದರಿ ಸಂದರ್ಭ ಪ್ರೋಟೋಕಾಲ್ (MCP) ಸರ್ವರ್‌ಗಳನ್ನು Microsoft Foundry ಏಜೆಂಟ್‌ಗಳೊಂದಿಗೆ ಇಂಟಿಗ್ರೇಟ್ ಮಾಡುವುದು ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ, ಶಕ್ತಿಶಾಲಿ ಉಪಕರಣ ಸಂಯೋಜನೆ ಮತ್ತು ಉದ್ಯಮ AI ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು.

## ಪರಿಚಯ

ಮಾದರಿ ಸಂದರ್ಭ ಪ್ರೋಟೋಕಾಲ್ (MCP) ಒಂದು ತೆರವಾದ ಮಾನಕವಾಗಿದೆ ಅದು AI ಅನ್ವಯಿಕೆಗಳನ್ನು ಹೊರಗಿನ ಡೇಟಾ ಮೂಲಗಳು ಮತ್ತು ಉಪಕರಣಗಳೊಂದಿಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಪರ್ಕಿಸಲು ಅನುಮತಿಸುತ್ತದೆ. Microsoft Foundry ಜೊತೆಗೆ ಒಗ್ಗೂಡಿಸಿದಾಗ, MCP ಏಜೆಂಟ್‌ಗಳಿಗೆ ವಿವಿಧ ಹೊರಗಿನ ಸೇವೆಗಳು, APIಗಳು ಮತ್ತು ಡೇಟಾ ಮೂಲಗಳೊಂದಿಗೆ ಮಾನಕೃತ ರೀತಿಯಲ್ಲಿ ಪ್ರವೇಶ ಮತ್ತು ಪರಸ್ಪರ ಕ್ರಿಯಾಕರಿಸಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ.

ಈ ಸಂಯೋಜನೆ MCP ಯ ಉಪಕರಣ ಪರಿಸರದ ಲವಚಿಕತೆ ಮತ್ತು Microsoft Foundry ಯ ಸ್ಥಿರ ಏಜೆಂಟ್ ಫ್ರೇಮ್ವರ್ಕ್ ಅನ್ನು ಒಟ್ಟುಗೂಡಿಸುವ ಮೂಲಕ, ವ್ಯಾಪಕ ಸೌಲಭ್ಯ ಹೊಂದಿರುವ ಉದ್ಯಮ ಹಂತದ AI ಪರಿಹಾರಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.

**ಟಿಪ್ಪಣಿ:** ನೀವು Microsoft Foundry ಏಜೆಂಟ್ ಸೇವೆಯಲ್ಲಿ MCP ಅನ್ನು ಬಳಸುವ ಬಯಕೆ ಇದ್ದರೆ, ಪ್ರಸ್ತುತ ಕೆಳಗಿನ ಪ್ರದೇಶಗಳಲ್ಲೇ ಇದಕ್ಕೆ ಬೆಂಬಲ ಇದೆ: westus, westus2, uaenorth, southindia ಮತ್ತು switzerlandnorth

## ಅಧ್ಯಯನ ಗುರಿಗಳು

ಈ ಮಾರ್ಗದರ್ಶಕದ ಕೊನೆಯಲ್ಲಿ ನೀವು:

- ಮಾದರಿ ಸಂದರ್ಭ ಪ್ರೋಟೋಕಾಲ್ ಮತ್ತು ಅದರ ಲಾಭಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದು  
- Microsoft Foundry ಏಜೆಂಟ್‌ಗಳೊಂದಿಗೆ ಬಳಸಲು MCP ಸರ್ವರ್‌ಗಳನ್ನು ಸ್ಥಾಪಿಸಬಹುದು  
- MCP ಉಪಕರಣ ಇಂಟಿಗ್ರೇಷನ್‌ನೊಂದಿಗೆ ಏಜೆಂಟ್‌ಗಳನ್ನು ರಚಿಸಿ ಮತ್ತು ಸಂರಚಿಸಬಹುದು  
- ನೈಜ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಬಳಸಿ ಆಚರಣೆ ಉದಾಹರಣೆಗಳನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಬಹುದು  
- ಏಜೆಂಟ್ ಸಂಭಾಷಣೆಯಲ್ಲಿ ಉಪಕರಣ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಮತ್ತು ಉಲ್ಲೇಖಗಳನ್ನು ನಿಭಾಯಿಸಬಲ್ಲಿರಿ

## ಪೂರ್ವಾಪೇಕ್ಷೆಗಳು

ಆರಂಭಿಸುವ ಮೊದಲು, ನೀವು ಹೊಂದಿರಬೇಕಾದವು:

- Microsoft Foundry ಪ್ರವೇಶವಿರುವ Azure ಸಬ್ಸ್ಕ್ರಿಪ್ಶನ್  
- Python 3.10+ ಅಥವಾ .NET 8.0+  
- ಆಸುರು CLI ಸ್ಥಾಪಿಸಲಾಗಿದೆ ಮತ್ತು ಸಂರಚಿತವಾಗಿದೆ  
- AI ಸಂಪನ್ಮೂಲಗಳನ್ನು ರಚಿಸಲು ಅನುವು permissions

## ಮಾದರಿ ಸಂದರ್ಭ ಪ್ರೋಟೋಕಾಲ್ (MCP) ಎಂಬುದು ಏನು?

ಮಾದರಿ ಸಂದರ್ಭ ಪ್ರೋಟೋಕಾಲ್ AI ಅನ್ವಯಿಕೆಗಳು ಹೊರಗಿನ ಡೇಟಾ ಮೂಲಗಳು ಮತ್ತು ಉಪಕರಣಗಳಿಗೆ ಸಂಪರ್ಕಿಸಲು ಮಾನಕೃತ ವಿಧಾನ. ಪ್ರಮುಖ ಲಾಭಗಳಾಗಿವೆ:

- **ಮಾನಕೃತ ಇಂಟಿಗ್ರೇಷನ್**: ವಿವಿಧ ಉಪಕರಣಗಳು ಮತ್ತು ಸೇವೆಗಳ ನಡುವೆ ಸತತ ಇಂಟರ್ಫೇಸ್  
- **ಭದ್ರತೆ**: ಸುರಕ್ಷಿತ ದೃಢೀಕರಣ ಮತ್ತು ಪ್ರಾಧಿಕಾರ ಯಂತ್ರಗಳು  
- **ಲವಚಿಕತೆ**: ವಿಭಿನ್ನ ಡೇಟಾ ಮೂಲಗಳು, APIಗಳು ಮತ್ತು ಕಸ್ಟಮ್ ಉಪಕರಣಗಳ ಬೆಂಬಲ  
- **ವಿಸ್ತರಣೆ ಸಾಮರ್ಥ್ಯ**: ಹೊಸ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಇಂಟಿಗ್ರೇಷನ್‌ಗಳನ್ನು ಸುಲಭವಾಗಿ ಸೇರಿಸುವಿಕೆ

## Microsoft Foundry ಜೊತೆಗೆ MCP ಸ್ಥಾಪನೆ

### ಪರಿಸರ ಸಂರಚನೆ

ನೀವು ಬಯಸುವ ಅಭಿವೃದ್ಧಿ ಪರಿಸರವನ್ನು ಆಯ್ಕೆಮಾಡಿ:

- [Python ಜಾರಿಗೊಳಿಸುವಿಕೆ](#python-ಜಾರಿಗೊಳಿಸುವಿಕೆ)  
- [.NET ಜಾರಿಗೊಳಿಸುವಿಕೆ](#codeblock5)  

---

## Python ಜಾರಿಗೊಳಿಸುವಿಕೆ

***ಟಿಪ್ಪಣಿ*** ನೀವು ಈ [ನೋಟ್ಬುಕ್](./mcp_support_python.ipynb) ಅನ್ನು ನಡೆಸಬಹುದು

### 1. ಅಗತ್ಯ ಪ್ಯಾಕೇಜ್‌ಗಳು ಇನ್ಸ್ಟಾಲ್ ಮಾಡಿ

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. ಅವಲಂಬನೆಗಳನ್ನು ಇಂಪೋರ್ಟ್ ಮಾಡಿ

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP ಸೆಟ್ಟಿಂಗ್ಸ್ ಸಂರಚನೆ

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. ಪ್ರಾಜೆಕ್ಟ್ ಕ್ಲೈಂಟ್ ಪ್ರಾರಂಭಿಸಿ

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP ಉಪಕರಣ ರಚಿಸಿ

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # ಐಚ್ಛಿಕ: ಅನುಮತಿಸಲಾದ ಉಪಕರಣಗಳನ್ನು ನಿರ್ದಿಷ್ಟಗೊಳಿಸಿ
)
```

### 6. ಪೂರ್ಣ Python ಉದಾಹರಣೆ

```python
with project_client:
    agents_client = project_client.agents

    # MCP ಸಾಧನಗಳೊಂದಿಗೆ ಹೊಸ ಏಜೆಂಟ್ ಅನ್ನು ರಚಿಸಿ
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # ಸಂವಹನಕ್ಕಾಗಿ ಥ್ರೆಡ್ ರಚಿಸಿ
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # ಥ್ರೆಡ್‌ಗೆ ಸಂದೇಶ ರಚಿಸಿ
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # ಸಾಧನ ಅನುಮೋದನೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಏಜೆಂಟ್ ಅನ್ನು ನಡಿಸು
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

    # ಸಂಭಾಷಣೆ ಪ್ರದರ್ಶಿಸಿ
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

## .NET ಜಾರಿಗೊಳಿಸುವಿಕೆ

***ಟಿಪ್ಪಣಿ*** ನೀವು ಈ [ನೋಟ್ಬುಕ್](./mcp_support_dotnet.ipynb) ಅನ್ನು ನಡೆಸಬಹುದು

### 1. ಅಗತ್ಯ ಪ್ಯಾಕೇಜ್‌ಗಳು ಇನ್ಸ್ಟಾಲ್ ಮಾಡಿ

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. ಅವಲಂಬನೆಗಳನ್ನು ಇಂಪೋರ್ಟ್ ಮಾಡಿ

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. ಸೆಟ್ಟಿಂಗ್ಸ್ ಸಂರಚನೆ

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP ಉಪಕರಣದ ವ್ಯಾಖ್ಯಾನ ರಚಿಸಿ

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. MCP ಉಪಕರಣಗಳೊಂದಿಗಿನ ಏಜೆಂಟ್ ರಚಿಸಿ

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. ಪೂರ್ಣ .NET ಉದಾಹರಣೆ

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

## MCP ಉಪಕರಣ ಸಂರಚನಾ ಆಯ್ಕೆಗಳು

ನಿಮ್ಮ ಏಜೆಂಟ್‌ಗಾಗಿ MCP ಉಪಕರಣಗಳನ್ನು ಸಂರಚಿಸುವಾಗ, ನೀವು ಅನೇಕ ಪ್ರಮುಖ ನಿಯಮಾಪಟ್ಟಿಗಳನ್ನು ನಿರ್ದೇಶಿಸಬಹುದು:

### Python ಸಂರಚನೆ

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP ಸರ್ವರ್‌ನ ಗುರುತು
    server_url="https://api.example.com/mcp", # MCP ಸರ್ವರ್ ಎಂಡ್ಪಾಯಿಂಟ್
    allowed_tools=[],                       # ಐಚ್ಛಿಕ: ಅನುಮತಿಸಲಾದ ಸಾಧನಗಳನ್ನು ಸೂಚಿಸಿ
)
```

### .NET ಸಂರಚನೆ

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## ದೃಢೀಕರಣ ಮತ್ತು ಹೆಡರ್‌ಗಳು

ಎರಡು ಜಾರಿಗೊಳಿಸುವಿಕೆಗಳೂ ದೃಢೀಕರಣಕ್ಕಾಗಿಯೂ ಕಸ್ಟಮ್ ಹೆಡರ್‌ಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತವೆ:

### Python  
```python
mcp_tool.update_headers("SuperSecret", "123456")
```
  
### .NET  
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```
  
## ಸಾಮಾನ್ಯ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರ

### 1. ಸಂಪರ್ಕ ಸಮಸ್ಯೆಗಳು  
- MCP ಸರ್ವರ್ URL ಪ್ರವೇಶಾರ್ಹವಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ  
- ದೃಢೀಕರಣ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ  
- ನೆಟ್ವರ್ಕ್ ಸಂಪರ್ಕವನ್ನು ಖಚಿತಪಡಿಸಿ  

### 2. ಉಪಕರಣ ಕರೆ ವಿಫಲತೆಗಳು  
- ಉಪಕರಣದ ಅರ್ಗುಮೆಂಟ್‌ಗಳು ಮತ್ತು ಫಾರ್ಮ್ಯಾಟಿಂಗ್ ಪರಿಶೀಲಿಸಿ  
- ಸರ್ವರ್-ನಿರ್ದಿಷ್ಟ ಅಗತ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ  
- ಸರಿಯಾದ ದೋಷ ನಿರ್ವಹಣೆಯನ್ನು ಜಾರಿಗೊಳಿಸಿ  

### 3. ಕಾರ್ಯಕ್ಷಮತೆ ಸಮಸ್ಯೆಗಳು  
- ಉಪಕರಣ ಕರೆ частоту ಗಳನ್ನು ಆಪ್ಟಿಮೈಸ್ ಮಾಡಿ  
- ಕೈಪಿಡಿ ಉಪಯುಕ್ತತೆ ಅನ್ವಯಿಸುತ್ತಾ ಕಾಯ್ದಿರಿಸಿ  
- ಸರ್ವರ್ ಪ್ರತಿಕ್ರಿಯಾ ಸಮಯಗಳನ್ನು ನಿರೀಕ್ಷಿಸಿ  

## ಮುಂದಿನ ಹಂತಗಳು

ನಿಮ್ಮ MCP ಇಂಟಿಗ್ರೇಷನ್ ಇನ್ನಷ್ಟು ಶಕ್ತಿಶಾಲಿಯಾಗಿಸಲು:

1. **ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ**: ಸ್ವಂತ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸಿ ಗೌಪ್ಯ ಡೇಟಾ ಮೂಲಗಳಿಗೆ  
2. **ಅತ್ಯಾಧುನಿಕ ಭದ್ರತೆ ಜಾರಿಗೊಳಿ**: OAuth2 ಅಥವಾ ಕಸ್ಟಮ್ ದೃಢೀಕರಣ ವಿಧಾನಗಳನ್ನು ಸೇರಿಸಿ  
3. **ನಿರೀಕ್ಷಣಾ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ**: ಉಪಕರಣ ಬಳಕೆಗೆ ಲಾಗಿಂಗ್ ಮತ್ತು ಪರಿಶೀಲನೆಯನ್ನು ಜಾರಿಗೊಳಿ  
4. **ಪ್ರಣಾಳಿಕೆಯನ್ನು ವಿಸ್ತರಿಸಿ**: ಲೋಡ್ ಬ್ಯಾಲೆನ್ಸಿಂಗ್ ಮತ್ತು ವಿತರಿತ MCP ಸರ್ವರ್ ಸ್ಥಾಪನೆಗಳನ್ನು ಗಮನಿಸಿ  

## ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳು

- [Microsoft Foundry ಡಾಕ್ಯುಮೆಂಟೇಷನ್](https://learn.microsoft.com/azure/ai-foundry/)  
- [ಮಾದರಿ ಸಂದರ್ಭ ಪ್ರೋಟೋಕಾಲ್ ಮಾದರಿಗಳು](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)  
- [Microsoft Foundry ಏಜೆಂಟ್‌ಗಳ ಅವಲೋಕನ](https://learn.microsoft.com/azure/ai-foundry/agents/)  
- [MCP ನಿರ್ದಿಷ್ಟೀಕರಣ](https://spec.modelcontextprotocol.io/)  

## ಬೆಂಬಲ

ಹೆಚ್ಛಿನ ಬೆಂಬಲ ಮತ್ತು ಪ್ರಶ್ನೆಗಳಿಗಾಗಿ:  
- [Microsoft Foundry ಡಾಕ್ಯುಮೆಂಟೇಷನ್](https://learn.microsoft.com/azure/ai-foundry/) ಪರಿಶೀಲಿಸಿ  
- [MCP ಸಮುದಾಯ ಸಂಪನ್ಮೂಲಗಳು](https://modelcontextprotocol.io/) ತಪಾಸಿಸಿ  

## ಮುಂದೇನಿದೆ

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->