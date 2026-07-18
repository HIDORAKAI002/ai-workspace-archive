# 🔍 Esplorando Microsoft Agent Framework - Agente Base (.NET)

## 📋 Obiettivi di Apprendimento

Questo esempio esplora i concetti fondamentali del Microsoft Agent Framework attraverso una implementazione base di agente in .NET. Imparerai i modelli agentici principali e comprenderai come funzionano gli agenti intelligenti internamente usando C# e l’ecosistema .NET.

### Cosa Scoprirai

- 🏗️ **Architettura dell’Agente**: Comprendere la struttura base degli agenti AI in .NET
- 🛠️ **Integrazione degli Strumenti**: Come gli agenti usano funzioni esterne per estendere le capacità  
- 💬 **Flusso di Conversazione**: Gestire conversazioni multi-turno e contesto con gestione dei thread
- 🔧 **Modelli di Configurazione**: Best practice per la configurazione e gestione degli agenti in .NET

## 🎯 Concetti Chiave Coperti

### Principi del Framework Agentico

- **Autonomia**: Come gli agenti prendono decisioni indipendenti usando astrazioni AI in .NET
- **Reattività**: Rispondere ai cambiamenti ambientali e agli input degli utenti
- **Proattività**: Prendere iniziativa basata su obiettivi e contesto
- **Capacità Sociale**: Interagire tramite linguaggio naturale con thread di conversazione

### Componenti Tecnici

- **AIAgent**: Core per orchestrazione agente e gestione conversazioni (.NET)
- **Funzioni Strumento**: Estendere le capacità dell’agente con metodi e attributi C#
- **Integrazione Azure OpenAI**: Sfruttare modelli linguistici tramite l’API Azure OpenAI Responses
- **Configurazione Sicura**: Gestione degli endpoint basata su ambiente

## 🔧 Stack Tecnico

### Tecnologie Core

- Microsoft Agent Framework (.NET)
- Integrazione Azure OpenAI (API Responses)
- Pattern client Azure.AI.OpenAI
- Configurazione basata su ambiente con DotNetEnv

### Capacità dell’Agente

- Comprensione e generazione del linguaggio naturale
- Chiamate a funzioni e uso di strumenti con attributi C#
- Risposte consapevoli del contesto con sessioni di conversazione
- Architettura estensibile con pattern di dependency injection

## 📚 Confronto Framework

Questo esempio mostra l’approccio del Microsoft Agent Framework rispetto ad altri framework agentici:

| Feature | Microsoft Agent Framework | Altri Framework |
|---------|-------------------------|------------------|
| **Integrazione** | Ecosistema Microsoft nativo | Compatibilità varia |
| **Semplicità** | API pulita e intuitiva | Configurazione spesso complessa |
| **Estendibilità** | Facilità di integrazione strumenti | Dipendente dal framework |
| **Pronto per l’Enterprise** | Costruito per la produzione | Varia a seconda del framework |

## 🚀 Primi Passi

### Prerequisiti

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) o superiore
- Un [abbonamento Azure](https://azure.microsoft.com/free/) con una risorsa Azure OpenAI e un deployment modello
- L’[Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — accedi con `az login`

### Variabili d’Ambiente Richieste

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Quindi accedi in modo che AzureCliCredential possa ottenere un token
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Quindi accedi in modo che AzureCliCredential possa ottenere un token
az login
```

### Codice di Esempio

Per eseguire l’esempio di codice,

```bash
# zsh/bash
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

Oppure usando la CLI dotnet:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

Vedi [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) per il codice completo.

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.*
#:package Microsoft.Agents.AI.OpenAI@1.*-*
#:package Azure.AI.OpenAI@2.1.0
#:package Azure.Identity@1.13.1

using System.ComponentModel;

using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

using Azure.AI.OpenAI;
using Azure.Identity;

// Tool Function: Random Destination Generator
// This static method will be available to the agent as a callable tool
// The [Description] attribute helps the AI understand when to use this function
// This demonstrates how to create custom tools for AI agents
[Description("Provides a random vacation destination.")]
static string GetRandomDestination()
{
    // List of popular vacation destinations around the world
    // The agent will randomly select from these options
    var destinations = new List<string>
    {
        "Paris, France",
        "Tokyo, Japan",
        "New York City, USA",
        "Sydney, Australia",
        "Rome, Italy",
        "Barcelona, Spain",
        "Cape Town, South Africa",
        "Rio de Janeiro, Brazil",
        "Bangkok, Thailand",
        "Vancouver, Canada"
    };

    // Generate random index and return selected destination
    // Uses System.Random for simple random selection
    var random = new Random();
    int index = random.Next(destinations.Count);
    return destinations[index];
}

// Azure OpenAI with the Responses API (stable v1 endpoint). Sign in with `az login`.
var azureEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deployment = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT") ?? "gpt-4.1-mini";

var azureClient = new AzureOpenAIClient(new Uri(azureEndpoint), new AzureCliCredential());

// Define Agent Identity and Comprehensive Instructions
// Agent name for identification and logging purposes
var AGENT_NAME = "TravelAgent";

// Detailed instructions that define the agent's personality, capabilities, and behavior
// This system prompt shapes how the agent responds and interacts with users
var AGENT_INSTRUCTIONS = """
You are a helpful AI Agent that can help plan vacations for customers.

Important: When users specify a destination, always plan for that location. Only suggest random destinations when the user hasn't specified a preference.

When the conversation begins, introduce yourself with this message:
"Hello! I'm your TravelAgent assistant. I can help plan vacations and suggest interesting destinations for you. Here are some things you can ask me:
1. Plan a day trip to a specific location
2. Suggest a random vacation destination
3. Find destinations with specific features (beaches, mountains, historical sites, etc.)
4. Plan an alternative trip if you don't like my first suggestion

What kind of trip would you like me to help you plan today?"

Always prioritize user preferences. If they mention a specific destination like "Bali" or "Paris," focus your planning on that location rather than suggesting alternatives.
""";

// Create AI Agent with Advanced Travel Planning Capabilities
// Get the Responses client for the deployment and create the AI agent
// Configure agent with name, detailed instructions, and available tools
// This demonstrates the .NET agent creation pattern with full configuration
AIAgent agent = azureClient
    .GetChatClient(deployment)
    .AsAIAgent(
        name: AGENT_NAME,
        instructions: AGENT_INSTRUCTIONS,
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Create New Session for Context Management.
// Initialize a new conversation session to maintain context across multiple interactions
// Sessions enable the agent to remember previous exchanges and maintain conversational state
// This is essential for multi-turn conversations and contextual understanding
AgentSession session = await agent.CreateSessionAsync();

// Execute Agent: First Travel Planning Request
// Run the agent with an initial request that will likely trigger the random destination tool
// The agent will analyze the request, use the GetRandomDestination tool, and create an itinerary
// Using the session parameter maintains conversation context for subsequent interactions
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip", session))
{
    await Task.Delay(10);
    Console.Write(update);
}

Console.WriteLine();

// Execute Agent: Follow-up Request with Context Awareness
// Demonstrate contextual conversation by referencing the previous response
// The agent remembers the previous destination suggestion and will provide an alternative
// This showcases the power of conversation sessions and contextual understanding in .NET agents
await foreach (var update in agent.RunStreamingAsync("I don't like that destination. Plan me another vacation.", session))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 Punti Chiave

1. **Architettura Agente**: Microsoft Agent Framework fornisce un approccio pulito e type-safe per costruire agenti AI in .NET
2. **Integrazione Strumenti**: Le funzioni decorate con attributi `[Description]` diventano strumenti disponibili per l’agente
3. **Contesto di Conversazione**: La gestione delle sessioni consente conversazioni multi-turno con piena consapevolezza del contesto
4. **Gestione Configurazioni**: Variabili d’ambiente e gestione sicura delle credenziali seguono best practice .NET
5. **Azure OpenAI Responses API**: L’agente utilizza l’Azure OpenAI Responses API tramite il SDK Azure.AI.OpenAI

## 🔗 Risorse Aggiuntive

- [Documentazione Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->