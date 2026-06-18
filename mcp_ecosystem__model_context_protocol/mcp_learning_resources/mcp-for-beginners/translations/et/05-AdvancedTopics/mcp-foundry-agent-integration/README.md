# Model Context Protocoli (MCP) integratsioon Microsoft Foundryga

See juhend näitab, kuidas integreerida Model Context Protocol (MCP) serverid Microsoft Foundry agentidega, võimaldades võimsat tööriistade orkestreerimist ja ettevõtte AI võimalusi.

## Sissejuhatus

Model Context Protocol (MCP) on avatud standard, mis võimaldab AI rakendustel turvaliselt ühenduda väliste andmeallikate ja tööriistadega. Microsoft Foundryga integreerides võimaldab MCP agentidel standardiseeritud viisil juurde pääseda ja suhelda erinevate väliste teenuste, API-de ja andmeallikatega.

See integratsioon ühendab MCP tööriistade ökosüsteemi paindlikkuse Microsoft Foundry tugeva agendi raamistikuga, pakkudes ettevõtte tasemel AI lahendusi ulatuslike kohandamisvõimalustega.

**Märkus:** Kui soovite kasutada MCP-d Microsoft Foundry Agendi teenuses, siis praegu on toetatud ainult järgmised piirkonnad: westus, westus2, uaenorth, southindia ja switzerlandnorth

## Õpieesmärgid

Selle juhendi lõpuks oskad:

- Mõista Model Context Protocoli ja selle eeliseid
- Seadistada MCP serverid Microsoft Foundry agentidega kasutamiseks
- Luua ja konfigureerida agente MCP tööriistade integratsiooniga
- Rakendada praktilisi näiteid reaalseid MCP servereid kasutades
- Töötlema tööriistade vastuseid ja viiteid agendi vestlustes

## Eeldused

Enne alustamist veendu, et sul on:

- Azure tellimus Microsoft Foundry juurdepääsuga
- Python 3.10+ või .NET 8.0+
- Azure CLI installitud ja konfigureeritud
- Sobivad õigused AI ressursside loomiseks

## Mis on Model Context Protocol (MCP)?

Model Context Protocol on standardiseeritud viis AI rakenduste ühendamiseks väliste andmeallikate ja tööriistadega. Peamised eelised hõlmavad:

- **Standardiseeritud integratsioon**: Ühtne liides erinevate tööriistade ja teenuste vahel
- **Turvalisus**: Turvalised autentimis- ja autoriseerimismehhanismid
- **Paindlikkus**: Tugi erinevatele andmeallikatele, API-dele ja kohandatud tööriistadele
- **Laiendatavus**: Lihtne lisada uusi funktsioone ja integratsioone

## MCP seadistamine Microsoft Foundryga

### Keskkonna seadistamine

Vali oma eelistatud arenduskeskkond:

- [Python'i rakendus](#pythoni-rakendus)
- [.NET rakendus](#codeblock5)

---

## Python'i rakendus

***Märkus*** Seda [märkmikku](./mcp_support_python.ipynb) saab jooksutada

### 1. Vajalikud paketid paigalda

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Sõltuvused impordi

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP seadistused määra

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Projekti klienti algata

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP tööriist loo

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Valikuline: määrake lubatud tööriistad
)
```

### 6. Täielik Python'i näide

```python
with project_client:
    agents_client = project_client.agents

    # Loo uus agent MCP tööriistadega
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Loo suhtlemiseks lõim
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Loo lõimile sõnum
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Töötle tööriistade heakskiite ja käivita agent
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

    # Kuvage vestlus
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

## .NET rakendus

***Märkus*** Seda [märkmikku](./mcp_support_dotnet.ipynb) saab jooksutada

### 1. Vajalikud paketid paigalda

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Sõltuvused impordi

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. Seaded määra

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP tööriista definitsioon loo

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Agent MCP tööriistadega loo

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Täielik .NET näide

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

## MCP tööriista seadistamise valikud

Agentide MCP tööriistade seadistamisel saad määrata mitmeid olulisi parameetreid:

### Python'i seadistamine

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP serveri identifikaator
    server_url="https://api.example.com/mcp", # MCP serveri lõpp-punkt
    allowed_tools=[],                       # Valikuline: määra lubatud tööriistad
)
```

### .NET seadistamine

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Autentimine ja päised

Mõlemad rakendused toetavad kohandatud päiseid autentimiseks:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Tavalised probleemid ja lahendused

### 1. Ühendusprobleemid
- Kontrolli, et MCP serveri URL on ligipääsetav
- Kontrolli autentimiskinnitust
- Veendu võrgukonnektiivsusest

### 2. Tööriista kõnede tõrked
- Kontrolli tööriista argumente ja vormingut
- Jälgi serveri spetsiifilisi nõudeid
- Rakenda korralik veahaldus

### 3. Jõudlusprobleemid
- Optimeeri tööriista kõnede sagedust
- Kasuta vahemällu salvestamist, kui sobib
- Jälgi serveri vastuse aega

## Järgmised sammud

Selleks, et oma MCP integratsiooni veelgi täiustada:

1. **Uuri kohandatud MCP servereid**: Ehita oma MCP serverid omapäraste andmeallikate jaoks
2. **Rakenda täiustatud turvalisus**: Lisa OAuth2 või kohandatud autentimismehhanismid
3. **Jälgimine ja analüütika**: Lisa logimine ja tööriistakasutuse jälgimine
4. **Skaleeri oma lahendus**: Mõtle koormuse tasakaalustamisele ja jaotatud MCP serveri arhitektuurile

## Lisamaterjalid

- [Microsoft Foundry dokumentatsioon](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol'i näited](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry agentide ülevaade](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP spetsifikatsioon](https://spec.modelcontextprotocol.io/)

## Tugi

Lisatoe ja küsimuste korral:
- Vaata [Microsoft Foundry dokumentatsiooni](https://learn.microsoft.com/azure/ai-foundry/)
- Kontrolli [MCP kogukonna ressursse](https://modelcontextprotocol.io/)

## Mis edasi

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->