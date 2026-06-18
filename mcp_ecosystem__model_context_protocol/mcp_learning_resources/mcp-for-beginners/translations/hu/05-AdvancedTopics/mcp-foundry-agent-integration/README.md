# Model Context Protocol (MCP) integráció a Microsoft Foundry-val

Ez az útmutató bemutatja, hogyan integrálhatók a Model Context Protocol (MCP) szerverek a Microsoft Foundry ügynökeivel, lehetővé téve a hatékony eszköz-orchesztrációt és vállalati AI képességeket.

## Bevezetés

A Model Context Protocol (MCP) egy nyílt szabvány, amely lehetővé teszi az AI alkalmazások számára, hogy biztonságosan csatlakozzanak külső adatforrásokhoz és eszközökhöz. A Microsoft Foundry-val való integráció esetén az MCP lehetővé teszi az ügynökök számára, hogy szabványos módon hozzáférjenek és kölcsönhatásba lépjenek különféle külső szolgáltatásokkal, API-kkal és adatforrásokkal.

Ez az integráció egyesíti az MCP eszközök ökoszisztémájának rugalmasságát a Microsoft Foundry megbízható ügynökkeretével, vállalati szintű AI megoldásokat kínálva kiterjedt testreszabási lehetőségekkel.

**Megjegyzés:** Ha az MCP-t szeretné használni a Microsoft Foundry Agent Service-ben, jelenleg csak az alábbi régiók támogatottak: westus, westus2, uaenorth, southindia és switzerlandnorth

## Tanulási célok

Az útmutató végére képes lesz:

- Megérteni a Model Context Protocol működését és előnyeit
- Beállítani MCP szervereket Microsoft Foundry ügynökök használatához
- Ügynökök létrehozása és konfigurálása az MCP eszközintegrációval
- Gyakorlati példák megvalósítása valódi MCP szerverek használatával
- Kezelni az eszközválaszokat és forrásokat az ügynökök beszélgetéseiben

## Előfeltételek

A kezdés előtt győződjön meg arról, hogy rendelkezik:

- Egy Azure előfizetéssel, amely hozzáfér a Microsoft Foundry-hoz
- Python 3.10+ vagy .NET 8.0+ környezettel
- Telepített és konfigurált Azure CLI-vel
- Megfelelő jogosultságokkal AI erőforrások létrehozásához

## Mi az a Model Context Protocol (MCP)?

A Model Context Protocol egy szabványosított módja az AI alkalmazásoknak, hogy külső adatforrásokhoz és eszközökhöz csatlakozzanak. Főbb előnyei:

- **Szabványos Integráció**: Egységes felület különböző eszközök és szolgáltatások között
- **Biztonság**: Biztonságos hitelesítési és jogosultságkezelési mechanizmusok
- **Rugalmasság**: Különféle adatforrások, API-k és egyedi eszközök támogatása
- **Bővíthetőség**: Új képességek és integrációk egyszerű hozzáadása

## MCP beállítása Microsoft Foundry-val

### Környezet konfiguráció

Válassza ki a preferált fejlesztői környezetet:

- [Python megvalósítás](#python-megvalósítás)
- [.NET megvalósítás](#codeblock5)

---

## Python megvalósítás

***Megjegyzés*** Ezt a [notebookot](./mcp_support_python.ipynb) futtathatja

### 1. Szükséges csomagok telepítése

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Függőségek importálása

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP beállítások konfigurálása

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Projekt kliens inicializálása

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP eszköz létrehozása

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Opcionális: adja meg az engedélyezett eszközöket
)
```

### 6. Teljes Python példa

```python
with project_client:
    agents_client = project_client.agents

    # Új ügynök létrehozása MCP eszközökkel
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Szál létrehozása a kommunikációhoz
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Üzenet létrehozása a szálhoz
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Eszközjóváhagyások kezelése és az ügynök futtatása
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

    # Beszélgetés megjelenítése
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

## .NET megvalósítás

***Megjegyzés*** Ezt a [notebookot](./mcp_support_dotnet.ipynb) futtathatja

### 1. Szükséges csomagok telepítése

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Függőségek importálása

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. Beállítások konfigurálása

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP eszköz definíció létrehozása

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Ügynök létrehozása MCP eszközökkel

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Teljes .NET példa

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

## MCP eszköz konfigurációs opciók

Az MCP eszközök konfigurálásakor az ügynök számára számos fontos paramétert megadhat:

### Python konfiguráció

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # Az MCP szerver azonosítója
    server_url="https://api.example.com/mcp", # MCP szerver végpont
    allowed_tools=[],                       # Opcionális: engedélyezett eszközök megadása
)
```

### .NET konfiguráció

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Hitelesítés és fejléc beállítások

Mindkét megvalósítás támogat egyedi fejléceket a hitelesítéshez:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Gyakori problémák elhárítása

### 1. Kapcsolódási problémák
- Ellenőrizze, hogy a MCP szerver URL elérhető-e
- Ellenőrizze a hitelesítési adatokat
- Biztosítsa a hálózati kapcsolatot

### 2. Eszköz hívás hibái
- Vizsgálja felül az eszköz paramétereit és formátumát
- Ellenőrizze a szerver-specifikus követelményeket
- Alkalmazzon megfelelő hibakezelést

### 3. Teljesítmény problémák
- Optimalizálja az eszköz hívások gyakoriságát
- Alkalmazzon gyorsítótárazást ahol indokolt
- Figyelje a szerver válaszidejét

## Következő lépések

Az MCP integráció további fejlesztéséhez:

1. **Fedezze fel az egyedi MCP szervereket**: Építsen saját MCP szervereket vállalati adatforrásokhoz
2. **Valósítson meg fejlett biztonságot**: Adjon hozzá OAuth2 vagy egyedi hitelesítési mechanizmusokat
3. **Figyelés és elemzés**: Vezessen be naplózást és figyelést az eszközhasználathoz
4. **Skálázza megoldását**: Vegye fontolóra a terheléselosztást és az elosztott MCP szerver architektúrákat

## További források

- [Microsoft Foundry dokumentáció](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol példák](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry ügynökök áttekintése](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP specifikáció](https://spec.modelcontextprotocol.io/)

## Támogatás

További támogatásért és kérdések esetén:
- Tekintse át a [Microsoft Foundry dokumentációt](https://learn.microsoft.com/azure/ai-foundry/)
- Nézze meg az [MCP közösségi forrásokat](https://modelcontextprotocol.io/)

## Mi következik

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->