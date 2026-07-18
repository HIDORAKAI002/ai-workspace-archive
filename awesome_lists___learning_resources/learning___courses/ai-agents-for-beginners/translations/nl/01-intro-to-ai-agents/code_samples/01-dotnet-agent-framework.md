# 🌍 AI Reisagent met Microsoft Agent Framework (.NET)

## 📋 Scenario Overzicht

Dit voorbeeld laat zien hoe je een intelligente reisplanningsagent bouwt met het Microsoft Agent Framework voor .NET. De agent kan automatisch gepersonaliseerde daguitstapjes samenstellen voor willekeurige bestemmingen over de hele wereld.

### Belangrijkste mogelijkheden:

- 🎲 **Willekeurige bestemmingsselectie**: Gebruikt een aangepast hulpmiddel om vakantiebestemmingen te kiezen
- 🗺️ **Intelligente reisplanning**: Maakt gedetailleerde dag-tot-dag reisroutes
- 🔄 **Realtime streaming**: Ondersteunt zowel directe als streaming reacties
- 🛠️ **Integratie van aangepaste hulpmiddelen**: Laat zien hoe je agentmogelijkheden uitbreidt

## 🔧 Technische architectuur

### Kerntechnologieën

- **Microsoft Agent Framework**: Laatste .NET-implementatie voor AI-agentontwikkeling
- **Azure OpenAI (Responses API)**: Gebruikt de Azure OpenAI Responses API voor modelinferencia
- **Azure Identity**: Veilig aanmelden via `AzureCliCredential` (`az login`)
- **Beveiligde configuratie**: Endpointbeheer op basis van omgeving

### Belangrijke componenten

1. **AIAgent**: De hoofdagent die het gesprek regelt
2. **Aangepaste hulpmiddelen**: `GetRandomDestination()` functie beschikbaar voor de agent
3. **Responses Client**: Gespreksinterface gebaseerd op Azure OpenAI Responses
4. **Streaming ondersteuning**: Mogelijkheden voor realtime reactie generatie

### Integratiepatroon

```mermaid
graph LR
    A[Gebruikersverzoek] --> B[AI Agent]
    B --> C[Azure OpenAI (Responses API)]
    B --> D[GetRandomDestination Tool]
    C --> E[Reisroute]
    D --> E
```

## 🚀 Aan de slag

### Vereisten

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) of hoger
- Een [Azure-abonnement](https://azure.microsoft.com/free/) met een Azure OpenAI-resource en een model-implementatie
- De [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — meld je aan met `az login`

### Vereiste omgevingsvariabelen

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Meld u vervolgens aan zodat AzureCliCredential een token kan verkrijgen
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Meld u vervolgens aan zodat AzureCliCredential een token kan verkrijgen
az login
```

### Voorbeeldcode

Om het codevoorbeeld uit te voeren,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

Of via de dotnet CLI:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

Zie [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) voor de complete code.

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.4.1
#:package Microsoft.Agents.AI.OpenAI@1.1.0
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

// Create AI Agent with Travel Planning Capabilities
// Get the Responses client for the specified deployment and create the AI agent
// Configure agent with travel planning instructions and random destination tool
// The agent can now plan trips using the GetRandomDestination function
AIAgent agent = azureClient
    .GetChatClient(deployment)
    .AsAIAgent(
        instructions: "You are a helpful AI Agent that can help plan vacations for customers at random destinations",
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Execute Agent: Plan a Day Trip
// Run the agent with streaming enabled for real-time response display
// Shows the agent's thinking and response as it generates the content
// Provides better user experience with immediate feedback
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip"))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 Belangrijkste inzichten

1. **Agent Architectuur**: Het Microsoft Agent Framework biedt een schone, type-veilige aanpak om AI-agents in .NET te bouwen
2. **Hulpmiddelen Integratie**: Functies met `[Description]` attributen worden beschikbare hulpmiddelen voor de agent
3. **Configuratiebeheer**: Omgevingsvariabelen en veilige credentialverwerking volgen .NET best practices
4. **Azure OpenAI Responses API**: De agent gebruikt de Azure OpenAI Responses API via de Azure.AI.OpenAI SDK

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