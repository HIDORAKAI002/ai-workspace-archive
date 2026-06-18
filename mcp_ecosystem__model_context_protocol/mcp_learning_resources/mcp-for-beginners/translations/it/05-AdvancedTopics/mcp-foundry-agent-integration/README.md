# Integrazione del Model Context Protocol (MCP) con Microsoft Foundry

Questa guida dimostra come integrare i server Model Context Protocol (MCP) con gli agenti Microsoft Foundry, consentendo potenti orchestrazioni di strumenti e capacità di intelligenza artificiale enterprise.

## Introduzione

Model Context Protocol (MCP) è uno standard aperto che consente alle applicazioni AI di connettersi in modo sicuro a fonti di dati e strumenti esterni. Quando integrato con Microsoft Foundry, MCP permette agli agenti di accedere e interagire con vari servizi esterni, API e fonti di dati in modo standardizzato.

Questa integrazione combina la flessibilità dell'ecosistema di strumenti MCP con il robusto framework per agenti di Microsoft Foundry, offrendo soluzioni AI di livello enterprise con ampie capacità di personalizzazione.

**Nota:** Se desideri utilizzare MCP nel Microsoft Foundry Agent Service, attualmente sono supportate soltanto le seguenti regioni: westus, westus2, uaenorth, southindia e switzerlandnorth

## Obiettivi di Apprendimento

Al termine di questa guida sarai in grado di:

- Comprendere il Model Context Protocol e i suoi vantaggi
- Configurare i server MCP per l'uso con gli agenti Microsoft Foundry
- Creare e configurare agenti con integrazione degli strumenti MCP
- Implementare esempi pratici utilizzando server MCP reali
- Gestire risposte degli strumenti e citazioni nelle conversazioni degli agenti

## Prerequisiti

Prima di iniziare, assicurati di avere:

- Un abbonamento Azure con accesso a Microsoft Foundry
- Python 3.10+ o .NET 8.0+
- Azure CLI installata e configurata
- Permessi appropriati per creare risorse AI

## Cos’è il Model Context Protocol (MCP)?

Model Context Protocol è un modo standardizzato per le applicazioni AI di connettersi a fonti di dati e strumenti esterni. I principali vantaggi includono:

- **Integrazione Standardizzata**: Interfaccia coerente tra diversi strumenti e servizi
- **Sicurezza**: Meccanismi sicuri di autenticazione e autorizzazione
- **Flessibilità**: Supporto per varie fonti di dati, API e strumenti personalizzati
- **Estendibilità**: Facilità di aggiungere nuove funzionalità e integrazioni

## Configurazione di MCP con Microsoft Foundry

### Configurazione dell'Ambiente

Scegli il tuo ambiente di sviluppo preferito:

- [Implementazione Python](#implementazione-python)
- [Implementazione .NET](#codeblock5)

---

## Implementazione Python

***Nota*** Puoi eseguire questo [notebook](./mcp_support_python.ipynb)

### 1. Installa i Pacchetti Richiesti

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Importa le Dipendenze

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. Configura le Impostazioni MCP

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Inizializza il Client del Progetto

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. Crea lo Strumento MCP

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Facoltativo: specificare gli strumenti consentiti
)
```

### 6. Esempio Completo in Python

```python
with project_client:
    agents_client = project_client.agents

    # Crea un nuovo agente con gli strumenti MCP
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Crea un thread per la comunicazione
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Crea un messaggio per il thread
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Gestisci le approvazioni degli strumenti ed esegui l'agente
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

    # Mostra la conversazione
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

## Implementazione .NET

***Nota*** Puoi eseguire questo [notebook](./mcp_support_dotnet.ipynb)

### 1. Installa i Pacchetti Richiesti

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Importa le Dipendenze

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. Configura le Impostazioni

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. Crea la Definizione dello Strumento MCP

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Crea l'Agente con gli Strumenti MCP

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Esempio Completo in .NET

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

## Opzioni di Configurazione degli Strumenti MCP

Quando configuri gli strumenti MCP per il tuo agente, puoi specificare diversi parametri importanti:

### Configurazione Python

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # Identificatore per il server MCP
    server_url="https://api.example.com/mcp", # Endpoint del server MCP
    allowed_tools=[],                       # Opzionale: specificare gli strumenti consentiti
)
```

### Configurazione .NET

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Autenticazione e Header

Entrambe le implementazioni supportano header personalizzati per l'autenticazione:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Risoluzione di Problemi Comuni

### 1. Problemi di Connessione
- Verifica che l’URL del server MCP sia accessibile
- Controlla le credenziali di autenticazione
- Assicurati della connettività di rete

### 2. Errori nelle Chiamate agli Strumenti
- Controlla gli argomenti e il formato degli strumenti
- Verifica i requisiti specifici del server
- Implementa una corretta gestione degli errori

### 3. Problemi di Prestazioni
- Ottimizza la frequenza delle chiamate agli strumenti
- Implementa caching quando opportuno
- Monitora i tempi di risposta del server

## Passi Successivi

Per migliorare ulteriormente la tua integrazione MCP:

1. **Esplora Server MCP Personalizzati**: Costruisci i tuoi server MCP per fonti di dati proprietarie
2. **Implementa Sicurezza Avanzata**: Aggiungi OAuth2 o meccanismi di autenticazione personalizzati
3. **Monitoraggio e Analytics**: Implementa logging e monitoraggio per l’uso degli strumenti
4. **Scala la Soluzione**: Considera il bilanciamento del carico e architetture di server MCP distribuiti

## Risorse Aggiuntive

- [Documentazione Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- [Esempi Model Context Protocol](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Panoramica Agenti Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [Specifiche MCP](https://spec.modelcontextprotocol.io/)

## Supporto

Per supporto aggiuntivo e domande:
- Consulta la [documentazione Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- Controlla le [risorse comunitarie MCP](https://modelcontextprotocol.io/)

## Cosa c’è dopo

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->