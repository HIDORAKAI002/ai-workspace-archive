# മോഡൽ കോൺടക്‌സ് പ്രോട്ടോക്കോൾ (MCP) മൈക്രോസോഫ്റ്റ് ഫൗണ്ടറിയുമായി ഇന്റഗ്രേഷൻ

ഇത് മോഡൽ കോൺടക്‌സ് പ്രോട്ടോക്കോൾ (MCP) സെർവർಗಳನ್ನು മൈക്രോസോഫ്റ്റ് ഫൗണ്ടറി ഏജന്റുകളുമായി എങ്ങനെ ഇന്റഗ്രേറ്റ് ചെയ്യാമെന്ന് കാണിക്കുന്നു, ശക്തമായ ടൂൾ ഓർക്കസ്ട്രേഷൻയും എന്റർപ്രൈസ് AI കഴിവുകളും ഉറപ്പാക്കുന്നു.

## പരിചയം

മോഡൽ കോൺടക്‌സ് പ്രോട്ടോക്കോൾ (MCP) ഒരു തുറന്ന നിലവാരമാണ്, ഇത് AI അപ്ലിക്കേഷനുകൾക്ക് ബാഹ്യ ഡാറ്റാ ഉറവിടങ്ങളിലേക്കും ടൂളുകളിലേക്കും സുരക്ഷിതമായി കണക്ട് ചെയ്യാൻ സാധ്യമാക്കുന്നു. മൈക്രോസോഫ്റ്റ് ഫൗണ്ടറിയുമായി ഇന്റഗ്രേറ്റ് ചെയ്തപ്പോൾ MCP ഏജന്റുകൾക്ക് വിവിധ ബാഹ്യ സേവനങ്ങൾ, APIകൾ, ഡാറ്റാ ഉറവിടങ്ങൾ എളുപ്പത്തിൽ ആക്സസ് ചെയ്യാനും അവയുമായി ബന്ധപ്പെടാനും സാധിക്കുന്നു.

ഈ ഇന്റഗ്രേഷൻ MCPയുടെ ടൂൾ ഇക്കോസിസ്റ്റത്തിന്റെ സാന്ദ്രീകതയും മൈക്രോസോഫ്റ്റ് ഫൗണ്ടറിയുടെ ശക്തമായ ഏജന്റ് ഘടനയും ചേർത്ത്, എന്റർപ്രൈസ് ഗ്രേഡ് AI പരിഹാരങ്ങൾ വ്യാപകമായ കസ്റ്റമൈസേഷൻ കഴിവുകളോടെ നൽകുന്നു.

**കുറിപ്പ്:** Microsoft Foundry Agent Serviceന്റെ MCP ഉപയോഗത്തിന്, നിലവിൽ പിന്തുണയ്ക്കുന്ന പ്രദേശങ്ങൾ: westus, westus2, uaenorth, southindia, switzerlandnorth മാത്രമായിരിക്കുന്നു.

## പഠന ഉദ്ദേശ്യങ്ങൾ

ഈ ഗൈഡ് അവസാനിപ്പിച്ചപ്പോൾ നിങ്ങൾക്ക് കഴിയും:

- മോഡൽ കോൺടക്‌സ് പ്രോട്ടോക്കോൾ പഠിക്കുകയും അതിന്റെ നേട്ടങ്ങൾ മനസ്സിലാക്കുകയും ചെയ്യുക
- മൈക്രോസോഫ്റ്റ് ഫൗണ്ടറി ഏജന്റുകളുമായി ഉപയോഗിക്കാനായി MCP സെർവറുകൾ സജ്ജമാക്കുക
- MCP ടൂൾ ഇന്റഗ്രേഷനോടുകൂടി ഏജന്റുകൾ സൃഷ്ടിക്കുകയും കോൺഫിഗർ ചെയ്യുകയും ചെയ്യുക
- യഥാർത്ഥ MCP സെർവറുകൾ ഉപയോഗിച്ച് പ്രായോഗിക ഉദാഹരണങ്ങൾ നടപ്പിലാക്കുക
- ഏജന്റ് സംഭാഷണങ്ങളിൽ ടൂൾ പ്രതികരണങ്ങളും സൈറ്റേഷനുകളും കൈകാര്യം ചെയ്യുക

## മുൻകൂട്ടിയുള്ള ആവശ്യകതകൾ

തുടങ്ങുന്നതിന് മുമ്പ് ഉറപ്പാക്കുക:

- മൈക്രോസോഫ്റ്റ് ഫൗണ്ടറി ആക്‌സസ് ഉള്ള ഒരു ആസ്യൂർ സബ്സ്ക്രിപ്ഷൻ
- Python 3.10+ അല്ലെങ്കിൽ .NET 8.0+
- ആസ്യൂർ CLI ഇൻസ്റ്റാൾ ചെയ്തും കോൺഫിഗർ ചെയ്തും ഉണ്ടായിരിക്കണം
- AI റിസോഴ്സുകൾ സൃഷ്ടിക്കാൻ അനുയോജ്യമായ അനുമതികൾ

## മോഡൽ കോൺടക്‌സ് പ്രോട്ടോക്കോൾ (MCP) എന്താണ്?

മോഡൽ കോൺടക്‌സ് പ്രോട്ടോക്കോൾ AI അപ്ലിക്കേഷനുകൾക്ക് ബാഹ്യ ഡാറ്റാ ഉറവിടങ്ങളിലേക്കും ടൂളുകളിലേക്കും കണക്റ്റ് ചെയ്യാനുള്ള ഒരു സ്റ്റാൻഡേർഡ് മാർഗമാണ്. പ്രധാന നേട്ടങ്ങൾ:

- **സ്റ്റാൻഡേർഡൈസ്ഡ് ഇന്റഗ്രേഷൻ**: വിവിധ ടൂളുകൾക്കും സേവനങ്ങൾക്കും ഏകീകൃത ഇന്റർഫേസ്
- **സുരക്ഷ**: സുരക്ഷിതമായ ഓതന്റിക്കേഷൻ, ആഘോഷmechanിസംകൾ
- **വൈവിധ്യം**: വിവിധ ഡാറ്റാ ഉറവിടങ്ങൾ, APIകൾ, കസ്റ്റം ടൂളുകൾ പിന്തുണയ്‌ക്കൽ
- **വിസ്തൃതമാക്കാവുന്ന ശേഷി**: പുതിയ കഴിവുകളും ഇന്റഗ്രേഷനുകളും എളുപ്പത്തിൽ ചേർക്കാൻ സാധിക്കും

## മൈക്രോസോഫ്റ്റ് ഫൗണ്ടറിയുമായി MCP സജ്ജീകരിക്കൽ

### പരിസ്ഥിതി ക്രമീകരണം

നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഡെവലപ്പ്മെന്റ് എൻവയോൺമെന്റ് തിരഞ്ഞെടുക്കുക:

- [Python നടപ്പാക്കൽ](#python-നടപ്പാക്കൽ)
- [.NET നടപ്പാക്കൽ](#codeblock5)

---

## Python നടപ്പാക്കൽ

***കുറിപ്പ്*** നിങ്ങൾക്ക് ഈ [നോട്ട്ബുക്ക്](./mcp_support_python.ipynb) റൺ ചെയ്യാം

### 1. ആവശ്യമായ പാക്കേജുകൾ ഇൻസ്റ്റാൾ ചെയ്യുക

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. ഡിപ്പെൻഡൻസികൾ ഇമ്പോർട്ട് ചെയ്യുക

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP സെറ്റിംഗുകൾ കോൺഫിഗർ ചെയ്യുക

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. പ്രോജക്ട് ക്ലയന്റ് ഇൻഷിയലൈസ് ചെയ്യുക

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP ടൂൾ സൃഷ്ടിക്കുക

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # ഐച്ഛികം: അനുവദිතമായ ടൂളുകൾ വ്യക്തമാക്കുക
)
```

### 6. പൂർണ Python ഉദാഹരണം

```python
with project_client:
    agents_client = project_client.agents

    # MCP ഉപകരണങ്ങളുമായി പുതിയ ഏജന്റ് സൃഷ്ടിക്കുക
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # ആശയവിനിമായ്ക്ക് ത്രെഡ് സൃഷ്ടിക്കുക
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # ത്രെഡിലേക്ക് സന്ദേശം സൃഷ്ടിക്കുക
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # ഉപകരണ അനുമതികൾ കൈകാര്യം ചെയ്ത് ഏജന്റ് പ്രവർത്തിപ്പിക്കുക
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

    # സംഭാഷണം പ്രദർശിപ്പിക്കുക
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

## .NET നടപ്പാക്കൽ

***കുറിപ്പ്*** നിങ്ങൾക്ക് ഈ [നോട്ട്ബുക്ക്](./mcp_support_dotnet.ipynb) റൺ ചെയ്യാം

### 1. ആവശ്യപ്പെട്ട പാക്കേജുകൾ ഇൻസ്റ്റാൾ ചെയ്യുക

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. ഡിപ്പെൻഡൻസികൾ ഇമ്പോർട്ട് ചെയ്യുക

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. സെറ്റിംഗുകൾ കോൺഫിഗർ ചെയ്യുക

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP ടൂൾ നിർവചനവും സൃഷ്ടിക്കുക

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. MCP ടൂളുകളോടെയുള്ള ഏജന്റ് സൃഷ്ടിക്കുക

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. പൂർണ .NET ഉദാഹരണം

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

## MCP ടൂൾ കോൺഫിഗറേഷൻ ഓപ്ഷനുകൾ

നിങ്ങളുടെ ഏജന്റിനായി MCP ടൂളുകൾ കോൺഫിഗർ ചെയ്യുമ്പോൾ, നിങ്ങൾക്ക് ചില പ്രധാന പാരാമീറ്ററുകൾ നിർവചിക്കാൻ സാധിക്കും:

### Python കോൺഫിഗറേഷൻ

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP സേർവറിന്റെ ഐഡന്റിഫയർ
    server_url="https://api.example.com/mcp", # MCP സേർവർ എൻഡ്‌പോയ്ൻറ്
    allowed_tools=[],                       # ഓപ്ഷണൽ: അനുവദനീയമായ ടൂളുകൾ വ്യക്തമാക്കുക
)
```

### .NET കോൺഫിഗറേഷൻ

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## ഓതന്റിക്കേഷൻ ആൻഡ് ഹെഡറുകൾ

രണ്ടിലും ഇംപ്ലിമെന്റേഷനുകളും ഓതന്റിക്കേഷനായി കസ്റ്റം ഹെഡറുകൾ പിന്തുണയ്ക്കുന്നു:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## സാധാരണ പ്രശ്നങ്ങൾ പരിഹരിക്കൽ

### 1. കണക്ഷൻ പ്രശ്നങ്ങൾ
- MCP സെർവർ URL ലഭ്യമായിരിക്കുന്നുവെന്ന് പരിശോധിക്കുക
- ഓതന്റിക്കേഷൻ ക്രെഡൻഷ്യൽസുകൾ പരിശോധിക്കുക
- നെറ്റ്‌വർക്ക് കണക്ടിവിറ്റി ഉറപ്പാക്കുക

### 2. ടൂൾ കോളിൽ പരാജയങ്ങൾ
- ടൂൾ ആർഗ്യുമെന്റുകളും ഫോർമാറ്റിംഗും പരിശോധിക്കുക
- സെർവർ വിഷയകമായ ആവശ്യകതകൾ പരിശോധിക്കുക
- ശരിയായ എറർ ഹാൻഡ്ലിംഗ് നടപ്പിലാക്കുക

### 3. പ്രകടന പ്രശ്നങ്ങൾ
- ടൂൾ കോളിന്റെ ആവൃത്തി മെച്ചപ്പെടുത്തുക
- ആവശ്യമായിടത്ത് ക്യാഷിംഗ് നടപ്പിലാക്കുക
- സെർവർ പ്രതികരണസമയം നിരീക്ഷിക്കുക

## അടുത്ത പടികൾ

നിങ്ങളുടെ MCP ഇന്റഗ്രേഷൻ മെച്ചപ്പെടുത്താൻ:

1. **കസ്റ്റം MCP സെർവറുകൾ ആഷ്‌ടം**: പ്രൈവറ്റ് ഡാറ്റാ ഉറവിടങ്ങൾക്ക് നിങ്ങളുടെ MCP സെർവർ നിർമ്മിക്കുക
2. **അഡവാൻസ്ഡ് സുരക്ഷ നടപ്പിലാക്കുക**: OAuth2 അല്ലെങ്കിൽ കസ്റ്റം ഓതന്റിക്കേഷൻ സംവിധാനങ്ങൾ ചേർക്കുക
3. **മോണിറ്ററിംഗും അനലിറ്റിക്സും**: ടൂൾ ഉപയോഗത്തിന് ലോഗിങ്ങും മോണിറ്ററിംഗും നടപ്പിലാക്കുക
4. **നിങ്ങളുടെ പരിഹാരം സ്കെയിൽ ചെയ്യുക**: ലോഡ് ബാലൻസിങ്ങും വിതരണ MCP സെർവർ ഘടനകളും പരിഗണിക്കുക

## അധിക ഉറവിടങ്ങൾ

- [Microsoft Foundry ഡോക്യുമെന്റേഷൻ](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol സാമ്പിളുകൾ](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry ഏജന്റുകൾ അവലോകനം](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP സ്പെസിഫിക്കേഷൻ](https://spec.modelcontextprotocol.io/)

## പിന്തുണ

കൂടുതൽ പിന്തുണക്കും ചോദ്യങ്ങൾക്കും:
- [Microsoft Foundry ഡോക്യുമെന്റേഷൻ](https://learn.microsoft.com/azure/ai-foundry/) പരിശോധിക്കുക
- [MCP കമ്മ്യൂണിറ്റി റിസോഴ്‌സുകൾ](https://modelcontextprotocol.io/) പരിശോധിക്കുക

## അടുത്തത്

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->