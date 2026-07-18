# 🔍 Verkennen van Microsoft Agent Framework - Basisagent (.NET)

## 📋 Leerdoelen

Dit voorbeeld onderzoekt de fundamentele concepten van het Microsoft Agent Framework via een basisimplementatie van een agent in .NET. Je leert kernpatronen van agenten en begrijpt hoe intelligente agenten werken achter de schermen met C# en het .NET-ecosysteem.

### Wat je zult ontdekken

- 🏗️ **Agentarchitectuur**: Begrip van de basisstructuur van AI-agenten in .NET
- 🛠️ **Toolintegratie**: Hoe agenten externe functies gebruiken om mogelijkheden uit te breiden  
- 💬 **Gespreksflow**: Beheren van meervoudige gespreksturns en context met threadbeheer
- 🔧 **Configuratiepatronen**: Best practices voor agentconfiguratie en -beheer in .NET

## 🎯 Belangrijke begrippen behandeld

### Principes van het Agent Framework

- **Autonomie**: Hoe agenten onafhankelijke beslissingen nemen met behulp van .NET AI-abstrahenten
- **Reactiviteit**: Reageren op veranderingen in de omgeving en gebruikersinvoer
- **Proactiviteit**: Initiatief nemen op basis van doelen en context
- **Sociale vaardigheden**: Interactie via natuurlijke taal met gespreksthreads

### Technische componenten

- **AIAgent**: Kernagent orkestratie en gesprekbeheer (.NET)
- **Toolfuncties**: Uitbreiden van agentmogelijkheden met C#-methoden en attributen
- **Azure OpenAI-integratie**: Taalmodellen aanroepen via de Azure OpenAI Responses API
- **Veilige configuratie**: Endpoints beheren op basis van de omgeving

## 🔧 Technische stack

### Kerntechnologieën

- Microsoft Agent Framework (.NET)
- Azure OpenAI (Responses API) integratie
- Azure.AI.OpenAI clientpatronen
- Omgevingsconfiguratie met DotNetEnv

### Agentmogelijkheden

- Begrip en genereren van natuurlijke taal
- Functieaanroep en toolgebruik met C#-attributen
- Contextbewuste respons met gesprekssessies
- Uitbreidbare architectuur met dependency injection patronen

## 📚 Frameworkvergelijking

Dit voorbeeld toont de aanpak van het Microsoft Agent Framework vergeleken met andere agentframeworks:

| Kenmerk | Microsoft Agent Framework | Andere Frameworks |
|---------|-------------------------|------------------|
| **Integratie** | Native Microsoft-ecosysteem | Gevarieerde compatibiliteit |
| **Eenvoud** | Schone, intuïtieve API | Vaak complexe setup |
| **Uitbreidbaarheid** | Gemakkelijke toolintegratie | Afhankelijk van framework |
| **Geschikt voor productie** | Ontworpen voor productie | Verschilt per framework |

## 🚀 Aan de slag

### Vereisten

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) of hoger
- Een [Azure-abonnement](https://azure.microsoft.com/free/) met een Azure OpenAI-resource en een modeluitrol
- De [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — inloggen met `az login`

### Vereiste omgevingsvariabelen

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Meld je dan aan zodat AzureCliCredential een token kan verkrijgen
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Meld je dan aan zodat AzureCliCredential een token kan krijgen
az login
```

### Voorbeeldcode

Om de code uit te voeren,

```bash
# zsh/bash
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

Of met de dotnet CLI:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

Zie [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) voor de volledige code.

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

## 🎓 Belangrijkste leerpunten

1. **Agentarchitectuur**: Het Microsoft Agent Framework biedt een schone, typesafe benadering om AI-agenten te bouwen in .NET
2. **Toolintegratie**: Functies met `[Description]` attributen worden beschikbare tools voor de agent
3. **Gesprekscontext**: Sessiebeheer maakt meerturn-gesprekken met volledige contextbewustzijn mogelijk
4. **Configuratiebeheer**: Omgevingsvariabelen en veilige credentialafhandeling volgen .NET best practices
5. **Azure OpenAI Responses API**: De agent gebruikt de Azure OpenAI Responses API via de Azure.AI.OpenAI SDK

## 🔗 Aanvullende bronnen

- [Microsoft Agent Framework Documentatie](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->