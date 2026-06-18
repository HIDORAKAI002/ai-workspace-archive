# Model Context Protocol (MCP) Integration mit Microsoft Foundry

Dieser Leitfaden zeigt, wie Model Context Protocol (MCP)-Server mit Microsoft Foundry-Agenten integriert werden, um leistungsstarke Tool-Orchestrierung und Unternehmens-KI-Funktionen zu ermöglichen.

## Einführung

Model Context Protocol (MCP) ist ein offener Standard, der es KI-Anwendungen ermöglicht, sicher eine Verbindung zu externen Datenquellen und Tools herzustellen. Wenn MCP in Microsoft Foundry integriert wird, können Agenten auf verschiedene externe Dienste, APIs und Datenquellen auf standardisierte Weise zugreifen und mit ihnen interagieren.

Diese Integration verbindet die Flexibilität des MCP-Tool-Ökosystems mit dem robusten Agentenframework von Microsoft Foundry und bietet unternehmensgerechte KI-Lösungen mit umfangreichen Anpassungsmöglichkeiten.

**Hinweis:** Wenn Sie MCP im Microsoft Foundry Agent Service verwenden möchten, werden derzeit nur die folgenden Regionen unterstützt: westus, westus2, uaenorth, southindia und switzerlandnorth

## Lernziele

Am Ende dieses Leitfadens werden Sie in der Lage sein:

- Das Model Context Protocol und dessen Vorteile zu verstehen
- MCP-Server für die Verwendung mit Microsoft Foundry-Agenten einzurichten
- Agenten mit MCP-Tool-Integration zu erstellen und zu konfigurieren
- Praktische Beispiele mit realen MCP-Servern umzusetzen
- Tool-Antworten und Zitationen in Agentengesprächen zu behandeln

## Voraussetzungen

Bevor Sie starten, stellen Sie sicher, dass Sie über Folgendes verfügen:

- Ein Azure-Abonnement mit Zugriff auf Microsoft Foundry
- Python 3.10+ oder .NET 8.0+
- Azure CLI installiert und konfiguriert
- Entsprechende Berechtigungen zum Erstellen von KI-Ressourcen

## Was ist Model Context Protocol (MCP)?

Model Context Protocol ist eine standardisierte Methode, durch die KI-Anwendungen eine Verbindung zu externen Datenquellen und Tools herstellen können. Wichtige Vorteile sind:

- **Standardisierte Integration**: Einheitliche Schnittstelle über verschiedene Tools und Dienste hinweg
- **Sicherheit**: Sichere Authentifizierungs- und Autorisierungsmechanismen
- **Flexibilität**: Unterstützung verschiedener Datenquellen, APIs und benutzerdefinierter Tools
- **Erweiterbarkeit**: Einfache Erweiterung um neue Funktionen und Integrationen

## Einrichtung von MCP mit Microsoft Foundry

### Umgebungs-Konfiguration

Wählen Sie Ihre bevorzugte Entwicklungsumgebung:

- [Python-Implementierung](#python-implementierung)
- [.NET-Implementierung](#codeblock5)

---

## Python-Implementierung

***Hinweis*** Sie können dieses [Notebook](./mcp_support_python.ipynb) ausführen

### 1. Benötigte Pakete installieren

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Abhängigkeiten importieren

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP-Einstellungen konfigurieren

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Projekt-Client initialisieren

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP-Tool erstellen

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Optional: erlaubte Werkzeuge angeben
)
```

### 6. Vollständiges Python-Beispiel

```python
with project_client:
    agents_client = project_client.agents

    # Erstellen Sie einen neuen Agenten mit MCP-Werkzeugen
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Erstellen Sie einen Thread für die Kommunikation
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Erstellen Sie eine Nachricht an den Thread
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Verarbeiten Sie Werkzeuggenehmigungen und führen Sie den Agenten aus
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

    # Anzeige der Konversation
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

## .NET-Implementierung

***Hinweis*** Sie können dieses [Notebook](./mcp_support_dotnet.ipynb) ausführen

### 1. Benötigte Pakete installieren

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Abhängigkeiten importieren

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. Einstellungen konfigurieren

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP-Tool-Definition erstellen

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Agent mit MCP-Tools erstellen

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Vollständiges .NET-Beispiel

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

## MCP Tool Konfigurationsoptionen

Bei der Konfiguration von MCP-Tools für Ihren Agenten können Sie mehrere wichtige Parameter angeben:

### Python-Konfiguration

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # Bezeichner für den MCP-Server
    server_url="https://api.example.com/mcp", # Endpunkt des MCP-Servers
    allowed_tools=[],                       # Optional: erlaubte Werkzeuge angeben
)
```

### .NET-Konfiguration

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Authentifizierung und Header

Beide Implementierungen unterstützen benutzerdefinierte Header für die Authentifizierung:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Behebung häufiger Probleme

### 1. Verbindungsprobleme
- Überprüfen Sie, ob die MCP-Server-URL erreichbar ist
- Prüfen Sie die Authentifizierungsdaten
- Stellen Sie die Netzwerkverbindung sicher

### 2. Fehler bei Tool-Aufrufen
- Überprüfen Sie die Tool-Argumente und deren Formatierung
- Prüfen Sie serverseitige Anforderungen
- Implementieren Sie eine korrekte Fehlerbehandlung

### 3. Leistungsprobleme
- Optimieren Sie die Häufigkeit der Tool-Aufrufe
- Implementieren Sie gegebenenfalls Caching
- Überwachen Sie die Server-Antwortzeiten

## Nächste Schritte

Um Ihre MCP-Integration weiter zu verbessern:

1. **Eigene MCP-Server entwickeln**: Erstellen Sie eigene MCP-Server für firmeneigene Datenquellen
2. **Erweiterte Sicherheit implementieren**: Fügen Sie OAuth2 oder benutzerdefinierte Authentifizierungsmechanismen hinzu
3. **Überwachung und Analyse**: Implementieren Sie Protokollierung und Monitoring für Tool-Nutzung
4. **Lösung skalieren**: Berücksichtigen Sie Lastverteilung und verteilte MCP-Server-Architekturen

## Weitere Ressourcen

- [Microsoft Foundry Dokumentation](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol Beispiele](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry Agents Übersicht](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP Spezifikation](https://spec.modelcontextprotocol.io/)

## Support

Für zusätzlichen Support und Fragen:
- Lesen Sie die [Microsoft Foundry Dokumentation](https://learn.microsoft.com/azure/ai-foundry/)
- Schauen Sie sich die [MCP Community-Ressourcen](https://modelcontextprotocol.io/) an

## Was kommt als Nächstes

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->