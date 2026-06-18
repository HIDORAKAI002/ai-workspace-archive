# మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ (MCP) మైక్రోసాఫ్ట్ ఫౌండ్రి తో సమగ్రత

ఈ గైడ్ మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ (MCP) సర్వర్లను మైక్రోసాఫ్ట్ ఫౌండ్రి ఏజెంట్లతో ఎలా సమగ్రపరచాలో చూపిస్తుంది, దీని ద్వారా శక్తివంతమైన టూల్ నిర్వహణ మరియు ఎంటర్ప్రైజ్ AI సామర్థ్యాలు అందుబాటులో ఉంటాయి.

## పరిచయం

మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ (MCP) అనేది AI అప్లికేషన్‌లు బాహ్య డేటా మూలాలు మరియు టూల్‌లతో సురక్షితంగా కనెక్ట్ కావడానికి అనుమతించే ఓపెన్ స్టాండర్డ్. మైక్రోసాఫ్ట్ ఫౌండ్రి తో సమగ్రత కల్పించినప్పుడు, MCP ఏజెంట్లు వివిధ బాహ్య సేవలు, APIలు మరియు డేటా మూలాలతో సౌకర్యవంతంగా యాక్సెస్ అవ్వటం మరియు పరస్పరం చర్య చేయటం సాధ్యం అవుతుంది.

ఈ సమగ్రత MCP టూల్ ఎకోసిస్టమ్ యొక్క లచీలితత్వాన్ని మైక్రోసాఫ్ట్ ఫౌండ్రి యొక్క దృఢమైన ఏజెంట్ ఫ్రేమ్‌వర్క్‌తో కలిపి, విస్తృత అనుకూలీకరణ సామర్థ్యాలతో ఎంటర్ప్రైజ్-గ్రేడ్ AI పరిష్కారాలను అందిస్తుంది.

**గమనిక:** మీరు Microsoft Foundry Agent Serviceలో MCP ఉపయోగించాలనుకుంటే, ప్రస్తుతం క్రింది ప్రాంతాలు మాత్రమే మద్దతు ఇస్తున్నాయి: westus, westus2, uaenorth, southindia మరియు switzerlandnorth

## నేర్చుకోవాల్సిన లక్ష్యాలు

ఈ గైడ్ యొక్క ముగింపు నాటికి, మీరు:

- మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ మరియు దాని ప్రయోజనాలను అర్థం చేసుకోగలరు
- Microsoft Foundry ఏజెంట్ల కోసం MCP సర్వర్లు సెటప్ చేయగలరు
- MCP టూల్ ఇంటిగ్రేషన్ ఉన్న ఏజెంట్లను సృష్టించి కాన్ఫిగర్ చేయగలరు
- వాస్తవ MCP సర్వర్లను ఉపయోగించి ప్రాథమిక ఉదాహరణలు అమలు చేయగలరు
- ఏజెంట్ సంభాషణలలో టూల్ స్పందనలు మరియు ఉటంకనలను నిర్వహించగలరు

## అవసరమయ్యే విషయాలు

ప్రారంభించే ముందు, మీరు కలిగి ఉండాలి:

- Microsoft Foundry యాక్సెస్ ఉన్న Azure చందా
- Python 3.10+ లేదా .NET 8.0+
- Azure CLI ఇన్‌స్టాల్ చేసి మరియు సెట్ అప్ చేయి
- AI వనరుల సృష్టికి అనువైన అనుమతులు

## మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ అంటే ఏమిటి?

మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ అనేది AI అప్లికేషన్‌లు బాహ్య డేటా మూలాలు మరియు టూల్‌లతో కనెక్ట్ అయ్యే ఒక ప్రమాణీకృత పద్ధతి. ముఖ్యమైన ప్రయోజనాలు:

- **ప్రామాణీకృత సమగ్రత**: విభిన్న టూల్స్ మరియు సేవలపై సూటిగా ఉండే ఇంటర్ఫేస్
- **సెక్యూరిటీ**: సురక్షిత ధృవీకరణ మరియు అధికరణ పద్ధతులు
- **లచీలితత్వం**: వివిధ డేటా మూలాలు, APIలు మరియు కస్టమ్ టూల్స్ మద్ధతు
- **విస్తరణీయత**: కొత్త సామర్థ్యాలు మరియు ఇంటిగ్రేషన్లు సులభంగా చేర్చగలగడం

## Microsoft Foundry తో MCP ని సెటప్ చేయడం

### పరిసరాల కాన్ఫిగరేషన్

మీ అభిరుచికి సరిపోయే అభివృద్ధి పరిసరాన్ని ఎంచుకోండి:

- [Python అమలు](#python-అమలు)
- [.NET అమలు](#codeblock5)

---

## Python అమలు

***గమనిక*** మీరు ఈ [నోట్‌బుక్](./mcp_support_python.ipynb) నడిపించవచ్చు

### 1. అవసరమయ్యే ప్యాకేజీలను ఇన్‌స్టాల్ చేయండి

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. డిపెండెన్సీలను దిగుమతి చేసుకోండి

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP సెట్టింగ్స్ ను కాన్ఫిగర్ చేయండి

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. ప్రాజెక్ట్ క్లయింట్ ప్రారంభించండి

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP టూల్ సృష్టించండి

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # ఐచ్ఛికం: అనుమతించబడిన పరికరాలను తెలియజేయండి
)
```

### 6. పూర్తి Python ఉదాహరణ

```python
with project_client:
    agents_client = project_client.agents

    # MCP ఉపకరణాలతో కొత్త ఏజెంట్‌ను సృష్టించండి
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # సంబంధానికి థ్రెడ్‌ను సృష్టించండి
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # థ్రెడ్‌కు సందేశాన్ని సృష్టించండి
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # ఉపకరణ ఆమోదాలను నిర్వహించి ఏజెంట్‌ను నడపండి
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

    # సంభాషణను ప్రదర్శించండి
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

## .NET అమలు

***గమనిక*** మీరు ఈ [నోట్‌బుక్](./mcp_support_dotnet.ipynb) నడిపించవచ్చు

### 1. అవసరమయ్యే ప్యాకేజీలను ఇన్‌స్టాల్ చేయండి

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. డిపెండెన్సీలను దిగుమతి చేసుకోండి

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. సెట్టింగ్స్ ను కాన్ఫిగర్ చేయండి

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP టూల్ నిర్వచనం సృష్టించండి

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. MCP టూల్స్ తో ఏజెంట్ సృష్టించండి

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. పూర్తి .NET ఉదాహరణ

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

## MCP టూల్ కాన్ఫిగరేషన్ ఎంపికలు

మీ ఏజెంట్ కోసం MCP టూల్స్ కాన్ఫిగర్ చేస్తుంటే, మీరు అనేక ముఖ్యమైన పారామీటర్లు నిర్దేశించవచ్చు:

### Python కాన్ఫిగరేషన్

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP సర్వర్ కోసం గుర్తింపు
    server_url="https://api.example.com/mcp", # MCP సర్వర్ ఎండ్‌పాయింట్
    allowed_tools=[],                       # ఐచ్ఛికం: అనుమతించబడిన ఉపకరణాలను పేర్కొనండి
)
```

### .NET కాన్ఫిగరేషన్

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## ధృవీకరణ మరియు హెడర్స్

రెండు అమలிலும் ధృవీకరణ కోసం అనుకూల హెడర్లను మద్దతు ఇస్తాయి:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## సాధారణ సమస్యలకు పరిష్కారాలు

### 1. కనెక్ట్ అవ్వడంలో సమస్యలు
- MCP సర్వర్ URL మార్గం యాక్సెస్ అయ్యేలా ఉందా చూసుకోండి
- ధృవీకరణ నివేదికలను తనిఖీ చేయండి
- నెట్‌వర్క్ కనెక్టివిటీ నిర్ధారించండి

### 2. టూల్ కాల్ విఫలమయ్యే సమస్యలు
- టూల్ ఆర్గ్యుమెంట్లు మరియు ఫార్మాటింగ్ పరిగణించండి
- సర్వర్-ప్రత్యేక అవసరాలను తనిఖీ చేయండి
- సరైన లోప నిర్వహణ అమలు చేయండి

### 3. పనితీరు సమస్యలు
- టూల్ కాల్ ఫ్రీక్వెన్సీని ఆప్టిమైజ్ చేయండి
- అవసరమైన చోట క్యాచింగ్ అమలు చేయండి
- సర్వర్ స్పందన సమయాలను పర్యవేక్షించండి

## తదుపరి దశలు

మీ MCP సమగ్రతను మరింత మెరుగుపరచడానికి:

1. **కస్టమ్ MCP సర్వర్లు అన్వేషించండి**: స్వంత MCP సర్వర్లను నిర్మించండి మీ ప్రైవేటు డేటా మూలాల కోసం
2. **అధునాతన భద్రతను అమలు చేయండి**: OAuth2 లేదా అనుకూల ధృవీకరణ పద్ధతులు జోడించండి
3. **నిరంతర పర్యవేక్షణ మరియు విశ్లేషణ**: టూల్ వాడకానికి లాగింగ్ మరియు మానిటరింగ్ అమలు చేయండి
4. **మీ పరిష్కారాన్ని స్కేల్ చేయండి**: లోడ్ బాలెన్సింగ్ మరియు పంపిణీ MCP సర్వర్ వాస్తవీకరణలను పరిగణించండి

## అదనపు వనరులు

- [Microsoft Foundry డాక్యుమెంటేషన్](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol నమూనాలు](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry ఏజెంట్లు అవలోకనం](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP స్పెసిఫికేషన్](https://spec.modelcontextprotocol.io/)

## మద్దతు

అదనపు మద్దతు మరియు ప్రశ్నల కోసం:
- [Microsoft Foundry డాక్యుమెంటేషన్](https://learn.microsoft.com/azure/ai-foundry/)ని సమీక్షించండి
- [MCP కమ్యూనిటీ వనరులు](https://modelcontextprotocol.io/)ని పరిశీలించండి

## తదుపరి ఏమిటి

- [5.14 MCP కాంటెక్స్ట్ ఇంజనీరింగ్](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->