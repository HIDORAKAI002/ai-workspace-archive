# மாடல் கான்டெக்ஸ்ட் புரோடோக்கால் (MCP) Microsoft Foundry உடன் ஒருமைப்படுத்தல்

இந்த வழிகாட்டி மாடல் கான்டெக்ஸ்ட் புரோடோக்கால் (MCP) சர்வர்களை Microsoft Foundry முகவர்களுடன் ஒருமைப்படுத்தும் விதத்தை காணவைக்கிறது, இது சக்திவாய்ந்த கருவி ஒழுங்குபடுத்தல் மற்றும் நிறுவன ஏ.ஐ. திறன்களை உள்ளடக்கியது.

## அறிமுகம்

மாடல் கான்டெக்ஸ்ட் புரோடோக்கால் (MCP) என்பது ஏ.ஐ. பயன்பாடுகள் வெளிப்புற தரவுக்-कő வைத்தியகள் மற்றும் கருவிகளுடன் பாதுகாப்பான முறையில் இணைவதற்கான திறந்த தரநிலை ஆகும். Microsoft Foundry உடன் ஒருமைப்படுத்தப்பட்டபோது, MCP முகவர்கள் பன்முக வெளிப்புற சேவைகள், API கள் மற்றும் தரவுக் கő வைத்தியகளுடன் ஒழுங்கு செய்யப்பட்ட முறையில் அணுகிச் செயல்பட அனுமதிக்கும்.

இந்த ஒருமைப்படுத்தல் MCP யின் கருவி பரிமாணத்தின் நெகிழ்வுத்தன்மையை Microsoft Foundry யின் வலுவான முகவர் கட்டமைப்புடன் இணைத்து, விரிவான தனிப்பயன்பாடு திறன்களுடன் நிறுவனத்தர ஏ.ஐ. தீர்வுகளை வழங்குகிறது.

**குறிப்பு:** Microsoft Foundry முகவர் சேவையில் MCP ஐப் பயன்படுத்த விரும்பினால், தற்பொழுது பின்வரும் பகுதிகள் மட்டுமே ஆதரிக்கப்படுகின்றன: westus, westus2, uaenorth, southindia மற்றும் switzerlandnorth

## கற்கும் நோக்கங்கள்

இந்த வழிகாட்டியை முடித்தவுடன், நீங்கள் திறங்கக்கூடியவை:

- மாடல் கான்டெக்ஸ்ட் புரோடோக்காலின் மற்றும் அதன் நன்மைகள் பற்றி புரிதல்
- Microsoft Foundry முகவர்களுடன் பயன்பாட்டிற்கு MCP சர்வர்களை அமைத்தல்
- MCP கருவி ஒருமைப்படுத்தலுடன் முகவர்களை உருவாக்கி வடிவமைத்தல்
- உண்மையான MCP சர்வர்கள் பயன்படுத்தி நடைமுறை உதாரணங்களை செயல்படுத்தல்
- முகவர் உரையாடல்களில் கருவி பதில்கள் மற்றும் மேற்கோள்களை கையாள்தல்

## முன் தேவைகள்

தொடங்குவதற்கு முன், நீங்கள் கொண்டிருப்பதை உறுதி செய்யுங்கள்:

- Microsoft Foundry அணுகல் கொண்ட Azure சந்தா
- Python 3.10+ அல்லது .NET 8.0+
- Azure CLI நிறுவப்பட்டு பிரிவாணப்படுகிறது
- ஏ.ஐ. வளங்களை உருவாக்க ஆவணப்படுத்தப்பட்ட உரிமைகள்

## என்னது மாடல் கான்டெக்ஸ்ட் புரோடோக்கால் (MCP)?

மாடல் கான்டெக்ஸ்ட் புரோடோக்கால் என்பது ஏ.ஐ. பயன்பாடுகள் வெளிப்புற தரவுக்-кő வைத்தியகள் மற்றும் கருவிகளுடன் இணைவதற்கான தரநிலை வழி ஆகும். முக்கிய நன்மைகள்:

- **தரநிலை ஒருமைப்படுத்தல்**: பன்முக கருவிகள் மற்றும் சேவைகளுக்கு ஒரே மாதிரியான இடைமுகம்
- **பாதுகாப்பு**: பாதுகாப்பான அங்கீகாரம் மற்றும் அங்கீகாரக் கூறுகள்
- **நெகிழ்வுத்தன்மை**: பல்வேறு தரவுக்-кő வைத்தியகள், API கள் மற்றும் தனிப்பயன் கருவிகளுக்கான ஆதரவு
- **பெருக்குதல்**: புதிய திறன்கள் மற்றும் ஒருமைப்படுத்தல்களை எளிதில் சேர்க்க வசதி

## Microsoft Foundry உடன் MCP அமைத்தல்

### சுற்றுப்புற அமைப்பமைவு

உங்கள் விருப்பமான வளர்ச்சி சுற்றுப்புறத்தை தேர்ந்தெடுங்கள்:

- [Python செயலாக்கம்](#python-செயலாக்கம்)
- [.NET செயலாக்கம்](#codeblock5)

---

## Python செயலாக்கம்

***குறிப்பு*** நீங்கள் இந்த [நோட்புக்](./mcp_support_python.ipynb) இயக்கலாம்

### 1. தேவையான பாக்கெஜுகளை நிறுவுக

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. சார்ந்தவை இறக்குமதி செய்க

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP அமைப்புகளை கட்டமைக்கவும்

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. திட்ட கிளையண்டை துவக்கவும்

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP கருவியை உருவாக்கவும்

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # விருப்பமானது: அனுமதிக்கப்பட்ட கருவிகளை குறிப்பிடவும்
)
```

### 6. முழுமையான Python உதாரணம்

```python
with project_client:
    agents_client = project_client.agents

    # MCP கருவிகளுடன் ஒரு புதிய Агент உருவாக்கவும்
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # தொடர்புக்கு திருமலை உருவாக்கவும்
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # திரூட்டுக்கு செய்தி உருவாக்கவும்
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # கருவி ஒப்புதல்களை கையாளவும் மற்றும் Агент ஐ இயக்கவும்
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

    # உரையாடலை காட்டு
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

## .NET செயலாக்கம்

***குறிப்பு*** நீங்கள் இந்த [நோட்புக்](./mcp_support_dotnet.ipynb) இயக்கலாம்

### 1. தேவையான பாக்கெஜுகளை நிறுவுக

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. சார்ந்தவை இறக்குமதி செய்க

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. அமைப்புகளை கட்டமைக்கவும்

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP கருவி வரையறையை உருவாக்கவும்

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. MCP கருவிகளுடன் முகவர்களை உருவாக்கவும்

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. முழுமையான .NET உதாரணம்

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

## MCP கருவி கட்டமைப்பு விருப்பங்கள்

உங்கள் முகவருக்கான MCP கருவிகளை கட்டமைக்கும் போது, நீங்கள் சில முக்கிய அளவுருக்களை குறிப்பிடலாம்:

### Python கட்டமைப்பு

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP சேவையகத்திற்கான அடையாளம்
    server_url="https://api.example.com/mcp", # MCP சேவையக கடைசியில்
    allowed_tools=[],                       # விருப்பமானது: அனுமதிக்கப்பட்ட கருவிகளை குறிப்பிடவும்
)
```

### .NET கட்டமைப்பு

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## அங்கீகாரம் மற்றும் தலைப்புகள்

இரு செயலாக்கங்களும் அங்கீகாரத்திற்கு தனிப்பயன் தலைப்புகளை ஆதரிக்கும்:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## பொதுவான சிக்கல் தீர்வுகள்

### 1. இணைப்பு பிரச்சினைகள்
- MCP சர்வர் URL உள்நுழையக்கூடியதா என சரிபார்க்கவும்
- அங்கீகாரச் சான்றுகளை பரிசீலிக்கவும்
- நெட்வொர்க் இணைப்பை உறுதி செய்யவும்

### 2. கருவி அழைப்பு தோல்விகள்
- கருவி வாதங்களும் வடிவமைப்பும் சரிபார்க்கவும்
- சர்வர் குறிப்பிட்ட தேவைகள் உள்ளதா பாருங்கள்
- சரியான பிழை கையாளலை செயல்படுத்தவும்

### 3. செயல்திறன் பிரச்சினைகள்
- கருவி அழைப்பு அடிக்கடி சரிசெய்க
- தேவையான இடங்களில் கேஷிங் செய்க
- சர்வர் பதில் நேரங்களை கண்காணிக்கவும்

## அடுத்த படிகள்

உங்கள் MCP ஒருமைப்படுத்தலை மேலும் மேம்படுத்த:

1. **தனிப்பயன் MCP சர்வர்களை ஆராயவும்**: சொந்த MCP சர்வர்களை கட்டியெழுதவும்
2. **மேம்பட்ட பாதுகாப்பை செயல்படுத்தவும்**: OAuth2 அல்லது தனிப்பயன் அங்கீகார முறைகளைச் சேர்க்கவும்
3. **கண்காணிப்பு மற்றும் பகுப்பாய்வு**: கருவி பயன்பாட்டுக்கான பதிவு மற்றும் கண்காணிப்பை செயல்படுத்தவும்
4. **உங்கள் தீர்வை அளவுகோல் செய்யவும்**: சரிவு சமநிலை மற்றும் பகிர்ந்த MCP சர்வர் கட்டமைப்புகளை கருதவும்

## கூடுதல் வளங்கள்

- [Microsoft Foundry ஆவணம்](https://learn.microsoft.com/azure/ai-foundry/)
- [மாடல் கான்டெக்ஸ்ட் புரோடோக்கால் மாதிரிகள்](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry முகவர்கள் கண்ணோட்டம்](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP விவரக்கோப்பு](https://spec.modelcontextprotocol.io/)

## ஆதரவு

கூடுதல் ஆதரவு மற்றும் கேள்விகளுக்கு:
- [Microsoft Foundry ஆவணத்தை](https://learn.microsoft.com/azure/ai-foundry/) பரிசீலிக்கவும்
- [MCP சமூக வளங்களை](https://modelcontextprotocol.io/) சரிபார்க்கவும்

## அடுத்தது என்ன

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->