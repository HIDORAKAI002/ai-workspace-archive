# Model Context Protocol (MCP) Integration med Microsoft Foundry

Denne guide viser, hvordan du integrerer Model Context Protocol (MCP) servere med Microsoft Foundry agenter, hvilket muliggør kraftfuld værktøjsorkestrering og virksomheders AI-funktionaliteter.

## Introduktion

Model Context Protocol (MCP) er en åben standard, der gør det muligt for AI-applikationer sikkert at forbinde til eksterne datakilder og værktøjer. Når det integreres med Microsoft Foundry, tillader MCP agenter at få adgang til og interagere med forskellige eksterne tjenester, API'er og datakilder på en standardiseret måde.

Denne integration kombinerer fleksibiliteten i MCP's værktøjsøkosystem med Microsoft Foundrys robuste agentrammeværk, hvilket giver virksomhedens AI-løsninger med omfattende tilpasningsmuligheder.

**Bemærk:** Hvis du ønsker at bruge MCP i Microsoft Foundry Agent Service, understøttes p.t. kun følgende regioner: westus, westus2, uaenorth, southindia og switzerlandnorth

## Læringsmål

Når du er færdig med denne guide, vil du kunne:

- Forstå Model Context Protocol og dets fordele
- Sætte MCP servere op til brug med Microsoft Foundry agenter
- Oprette og konfigurere agenter med MCP værktøjsintegration
- Implementere praktiske eksempler ved brug af rigtige MCP servere
- Håndtere værktøjsresponser og kildehenvisninger i agent-samtaler

## Forudsætninger

Inden du begynder, skal du sikre dig, at du har:

- Et Azure-abonnement med adgang til Microsoft Foundry
- Python 3.10+ eller .NET 8.0+
- Azure CLI installeret og konfigureret
- De nødvendige tilladelser til at oprette AI-ressourcer

## Hvad er Model Context Protocol (MCP)?

Model Context Protocol er en standardiseret måde for AI-applikationer at forbinde til eksterne datakilder og værktøjer. Centrale fordele inkluderer:

- **Standardiseret Integration**: Ensartet grænseflade på tværs af forskellige værktøjer og tjenester
- **Sikkerhed**: Sikre autentifikations- og autorisationsmekanismer
- **Fleksibilitet**: Understøttelse af forskellige datakilder, API’er og brugerdefinerede værktøjer
- **Udvidelsesmuligheder**: Let at tilføje nye funktioner og integrationer

## Opsætning af MCP med Microsoft Foundry

### Miljøkonfiguration

Vælg dit foretrukne udviklingsmiljø:

- [Python-implementering](#python-implementering)
- [.NET-implementering](#codeblock5)

---

## Python-implementering

***Bemærk*** Du kan køre denne [notebook](./mcp_support_python.ipynb)

### 1. Installer nødvendige pakker

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Importer afhængigheder

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. Konfigurer MCP-indstillinger

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Initialiser projektklient

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. Opret MCP-værktøj

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Valgfrit: angiv tilladte værktøjer
)
```

### 6. Færdigt Python-eksempel

```python
with project_client:
    agents_client = project_client.agents

    # Opret en ny agent med MCP-værktøjer
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Opret tråd til kommunikation
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Opret besked til tråd
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Håndter værktøjsgodkendelser og kør agent
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

    # Vis samtale
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

## .NET-implementering

***Bemærk*** Du kan køre denne [notebook](./mcp_support_dotnet.ipynb)

### 1. Installer nødvendige pakker

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Importer afhængigheder

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. Konfigurer indstillinger

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. Opret MCP-værktøjsdefinition

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Opret agent med MCP-værktøjer

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Færdigt .NET-eksempel

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

## MCP-værktøjskonfigurationsmuligheder

Når du konfigurerer MCP-værktøjer til din agent, kan du angive flere vigtige parametre:

### Python-konfiguration

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # Identifikator for MCP-serveren
    server_url="https://api.example.com/mcp", # MCP-server endepunkt
    allowed_tools=[],                       # Valgfrit: angiv tilladte værktøjer
)
```

### .NET-konfiguration

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Godkendelse og Headers

Begge implementeringer understøtter brugerdefinerede headers til godkendelse:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Fejlfinding af almindelige problemer

### 1. Forbindelsesproblemer
- Bekræft at MCP server-URL er tilgængelig
- Tjek autentifikationsoplysninger
- Sørg for netværksforbindelse

### 2. Fejl ved værktøjsopkald
- Gennemgå værktøjsargumenter og formatering
- Tjek serverspecifikke krav
- Implementer korrekt fejlhåndtering

### 3. Ydeevneproblemer
- Optimer kaldhastigheden til værktøjer
- Implementer caching hvor relevant
- Overvåg svartider på serveren

## Næste skridt

For at forbedre din MCP-integration yderligere:

1. **Udforsk brugerdefinerede MCP-servere**: Byg dine egne MCP-servere til proprietære datakilder
2. **Implementer avanceret sikkerhed**: Tilføj OAuth2 eller brugerdefinerede autentifikationsmekanismer
3. **Overvågning og analyse**: Implementer logning og overvågning af værktøjsbrug
4. **Skaler din løsning**: Overvej belastningsbalancering og distribuerede MCP-serverarkitekturer

## Yderligere ressourcer

- [Microsoft Foundry Dokumentation](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol-eksempler](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry Agents Oversigt](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP-specifikation](https://spec.modelcontextprotocol.io/)

## Support

For yderligere support og spørgsmål:
- Gennemgå [Microsoft Foundry dokumentationen](https://learn.microsoft.com/azure/ai-foundry/)
- Tjek [MCP fællesskabsressourcer](https://modelcontextprotocol.io/)

## Hvad er det næste

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->