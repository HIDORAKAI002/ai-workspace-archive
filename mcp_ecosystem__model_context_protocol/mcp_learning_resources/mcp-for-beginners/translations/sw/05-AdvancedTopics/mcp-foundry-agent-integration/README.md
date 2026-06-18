# Itifaki ya Muktadha wa Mfano (MCP) Ushirikiano na Microsoft Foundry

Mwongozo huu unaonyesha jinsi ya kuunganisha seva za Itifaki ya Muktadha wa Mfano (MCP) na maajenti wa Microsoft Foundry, kuruhusu uratibu wa zana wenye nguvu na uwezo wa AI wa mashirika.

## Utangulizi

Itifaki ya Muktadha wa Mfano (MCP) ni kiwango wazi kinachoruhusu programu za AI kuunganishwa salama na vyanzo vya data na zana za nje. Inapounganishwa na Microsoft Foundry, MCP inaruhusu maajenti kufikia na kuingiliana na huduma mbalimbali za nje, API, na vyanzo vya data kwa njia iliyobinafsishwa.

Ushirikiano huu unachanganya unyumbufu wa mfumo wa zana wa MCP na mfumo imara wa maajenti wa Microsoft Foundry, ukitoa suluhisho za AI za kiwango cha shirika zenye uwezo mkubwa wa kusanidiwa.

**Kumbuka:** Ikiwa unataka kutumia MCP katika Huduma ya Maajenti ya Microsoft Foundry, kwa sasa mikoa ifuatayo tu inasaidiwa: westus, westus2, uaenorth, southindia na switzerlandnorth

## Malengo ya Kujifunza

Mwisho wa mwongozo huu, utakuwa na uwezo wa:

- Kuelewa Itifaki ya Muktadha wa Mfano na faida zake
- Kuweka seva za MCP kwa matumizi na maajenti wa Microsoft Foundry
- Kuunda na kusanidi maajenti na ushirikiano wa zana za MCP
- Kutekeleza mifano halisi kwa kutumia seva za MCP halisi
- Kushughulikia majibu ya zana na marejeleo katika mazungumzo ya maajenti

## Masharti ya Awali

Kabla ya kuanza, hakikisha una:

- Usajili wa Azure wenye ufikiaji wa Microsoft Foundry
- Python 3.10+ au .NET 8.0+
- Azure CLI imewekwa na kusanidiwa
- Ruhusa zinazofaa za kuunda rasilimali za AI

## Model Context Protocol (MCP) ni Nini?

Itifaki ya Muktadha wa Mfano ni njia iliyowekwa viwango kwa programu za AI kuunganishwa na vyanzo vya data na zana za nje. Faida kuu ni:

- **Ushirikiano wa Viwango**: Kiolesura cha mara kwa mara kwa zana na huduma mbalimbali
- **Usalama**: Mbinu salama za utambulisho na idhini
- **Unyumbufu**: Msaada kwa vyanzo vya data mbalimbali, API, na zana maalum
- **Ukuaji**: Rahisi kuongeza uwezo na ushirikiano mpya

## Kuweka MCP na Microsoft Foundry

### Usanidi wa Mazingira

Chagua mazingira yako unayopendelea ya maendeleo:

- [Utekelezaji wa Python](#utekelezaji-wa-python)
- [Utekelezaji wa .NET](#codeblock5)

---

## Utekelezaji wa Python

***Kumbuka*** Unaweza kuendesha [daftari hili](./mcp_support_python.ipynb)

### 1. Sakinisha Vifurushi Vinavyohitajika

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Ingiza Mategemeo

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. Sanidi Mipangilio ya MCP

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Anzisha Mteja wa Mradi

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. Unda Zana ya MCP

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Hiari: eleza zana zilizoruhusiwa
)
```

### 6. Mfano Kamili wa Python

```python
with project_client:
    agents_client = project_client.agents

    # Unda wakala mpya kwa kutumia zana za MCP
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Unda thread kwa mawasiliano
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Tuma ujumbe kwa thread
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Shughulikia idhini za zana na endesha wakala
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

    # Onyesha mazungumzo
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

## Utekelezaji wa .NET

***Kumbuka*** Unaweza kuendesha [daftari hili](./mcp_support_dotnet.ipynb)

### 1. Sakinisha Vifurushi Vinavyohitajika

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Ingiza Mategemeo

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. Sanidi Mipangilio

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. Unda Ufafanuzi wa Zana ya MCP

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Unda Mwakala na Vifaa vya MCP

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Mfano Kamili wa .NET

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

## Chaguzi za Usanidi wa Zana za MCP

Unapokuwa unasanidi zana za MCP kwa mwakala wako, unaweza kubainisha vigezo kadhaa muhimu:

### Usanidi wa Python

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # Kitambulisho cha seva ya MCP
    server_url="https://api.example.com/mcp", # Mwangizo wa seva ya MCP
    allowed_tools=[],                       # Hiari: bainisha zana zinazoruhusiwa
)
```

### Usanidi wa .NET

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Utambuzi na Vichwa

Utekelezaji wote unasaidia vichwa maalum kwa utambuzi:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Utatuzi wa Matatizo ya Kawaida

### 1. Matatizo ya Muunganisho
- Hakiki URL ya seva ya MCP iwe inapatikana
- Angalia nywila za utambuzi
- Hakikisha muunganisho wa mtandao

### 2. Kushindwa kwa Miito ya Zana
- Kagua hoja na muundo wa zana
- Angalia mahitaji maalum ya seva
- Tekeleza usimamizi sahihi wa makosa

### 3. Matatizo ya Utendaji
- Boresha mara za miito ya zana
- Tekeleza uhifadhi wa muda inapofaa
- Fuatilia nyakati za majibu ya seva

## Hatua Zifuatazo

Ili kuimarisha zaidi ushirikiano wako wa MCP:

1. **Chunguza Seva za MCP Zilizobinafsishwa**: Jenga seva zako za MCP kwa vyanzo vya data vya kipekee
2. **Tekeleza Usalama wa Juu**: Ongeza OAuth2 au mbinu za utambuzi maalum
3. **Fuatilia na Uchambuzi**: Tekeleza uandikishaji na ufuatiliaji wa matumizi ya zana
4. **Panua Suluhisho lako**: Fikiria usawa wa mzigo na usanifu wa seva za MCP zilizogatuliwa

## Rasilimali Zaidi

- [Nyaraka za Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- [Mifano ya Model Context Protocol](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Muhtasari wa Maajenti wa Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [Maelezo ya MCP](https://spec.modelcontextprotocol.io/)

## Msaada

Kwa msaada zaidi na maswali:
- Pitia [nyaraka za Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- Angalia [rasilimali za jamii za MCP](https://modelcontextprotocol.io/)

## Ifuatayo

- [5.14 Uhandisi wa Muktadha wa MCP](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->