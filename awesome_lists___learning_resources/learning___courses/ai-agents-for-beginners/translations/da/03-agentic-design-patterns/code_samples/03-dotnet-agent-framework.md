# 🎨 Agentbaserede Designmønstre med Azure OpenAI (Responses API) (.NET)

## 📋 Læringsmål

Dette eksempel demonstrerer virksomhedsstandard designmønstre til at bygge intelligente agenter ved brug af Microsoft Agent Framework i .NET med Azure OpenAI (Responses API) integration. Du vil lære professionelle mønstre og arkitektoniske tilgange, der gør agenter produktionsklare, vedligeholdelsesvenlige og skalerbare.

### Virksomhedsdesignmønstre

- 🏭 **Factory Pattern**: Standardiseret agentoprettelse med dependency injection
- 🔧 **Builder Pattern**: Fluent agentkonfiguration og opsætning
- 🧵 **Trådsikre mønstre**: Samtidig samtalestyring
- 📋 **Repository Pattern**: Organiseret værktøjs- og kapabilitetsstyring

## 🎯 .NET-specifikke Arkitektoniske Fordele

### Virksomhedsfunktioner

- **Stærk Typning**: Kompileringstid validering og IntelliSense support
- **Dependency Injection**: Indbygget DI-container integration
- **Konfigurationsstyring**: IConfiguration og Options mønstre
- **Async/Await**: Førsteklasses asynkron programmeringssupport

### Produktionsklare mønstre

- **Logging Integration**: ILogger og struktureret logging support
- **Sundhedstjek**: Indbygget overvågning og diagnostik
- **Konfigurationsvalidering**: Stærk typning med data annotationer
- **Fejlhåndtering**: Struktureret undtagelseshåndtering

## 🔧 Teknisk Arkitektur

### Kerne .NET Komponenter

- **Microsoft.Extensions.AI**: Unified AI service abstraktioner
- **Microsoft.Agents.AI**: Enterprise agent orkestreringsframework
- **Azure OpenAI (Responses API)**: Højtydende API klientmønstre
- **Konfigurationssystem**: appsettings.json og miljøintegration

### Designmønster Implementering

```mermaid
graph LR
    A[IServiceCollection] --> B[Agentbygger]
    B --> C[Konfiguration]
    C --> D[Værktøjsregister]
    D --> E[AI-agent]
```

## 🏗️ Virksomhedsmønstre Demonstreret

### 1. **Skabelsesmønstre**

- **Agent Factory**: Centraliseret agentoprettelse med konsistent konfiguration
- **Builder Pattern**: Fluent API til kompleks agentkonfiguration
- **Singleton Pattern**: Delte ressourcer og konfigurationsstyring
- **Dependency Injection**: Løs kobling og testbarhed

### 2. **Adfærdsmønstre**

- **Strategy Pattern**: Udskiftelige værktøjs-eksekveringsstrategier
- **Command Pattern**: Indkapslede agentoperationer med fortryd/gendan
- **Observer Pattern**: Begivenhedsdrevet agent livscyklusstyring
- **Template Method**: Standardiserede agent eksekverings-workflows

### 3. **Strukturelle mønstre**

- **Adapter Pattern**: Azure OpenAI (Responses API) integrationslag
- **Decorator Pattern**: Agent kapabilitetsforbedring
- **Facade Pattern**: Forenklede agent interaktionsinterfaces
- **Proxy Pattern**: Lazy loading og caching for ydeevne

## 📚 .NET Designprincipper

### SOLID Principper

- **Single Responsibility**: Hver komponent har ét klart formål
- **Open/Closed**: Udvidelig uden modifikation
- **Liskov Substitution**: Interface-baserede værktøjsimplementeringer
- **Interface Segregation**: Fokuserede, sammenhængende interfaces
- **Dependency Inversion**: Afhæng af abstraktioner, ikke konkrete implementeringer

### Clean Architecture

- **Domain Layer**: Kerne agent- og værktøjsabstraktioner
- **Application Layer**: Agent orkestrering og workflows
- **Infrastructure Layer**: Azure OpenAI (Responses API) integration og eksterne tjenester
- **Presentation Layer**: Brugerinteraktion og svarformatering

## 🔒 Virksomhedshensyn

### Sikkerhed

- **Credential Management**: Sikker API-nøgler håndtering med IConfiguration
- **Inputvalidering**: Stærk typning og data annotation validering
- **Outputsanitering**: Sikker svarbehandling og filtrering
- **Audit Logging**: Omfattende operationsovervågning

### Ydelse

- **Async mønstre**: Ikke-blokerende I/O operationer
- **Connection Pooling**: Effektiv HTTP klientstyring
- **Caching**: Response caching for forbedret ydelse
- **Ressourcestyring**: Korrekt oprydning og oprydningsmønstre

### Skalerbarhed

- **Trådsikkerhed**: Samtidig agenteksekveringssupport
- **Resource Pooling**: Effektiv ressourceudnyttelse
- **Load Management**: Ratebegrænsning og backpressure håndtering
- **Overvågning**: Ydelsesmålinger og sundhedstjek

## 🚀 Produktionsimplementering

- **Konfigurationsstyring**: Miljøspecifikke indstillinger
- **Logging strategi**: Struktureret logging med korrelations-ID'er
- **Fejlhåndtering**: Global undtagelseshåndtering med korrekt genopretning
- **Overvågning**: Applikationsindsigter og ydelsesindikatorer
- **Testning**: Unit tests, integrationstests og belastningstests mønstre

Klar til at bygge virksomhedsstandard intelligente agenter med .NET? Lad os arkitekture noget robust! 🏢✨

## 🚀 Kom godt i gang

### Forudsætninger

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) eller nyere
- Et [Azure abonnement](https://azure.microsoft.com/free/) med en Azure OpenAI ressource og en modeludrulning
- Azure CLI'en ([Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)) — log ind med `az login`

### Påkrævede Miljøvariabler

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Log ind, så AzureCliCredential kan få et token
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Log derefter ind, så AzureCliCredential kan få et token
az login
```

### Eksempelkode

For at køre kodeeksemplet,

```bash
# zsh/bash
chmod +x ./03-dotnet-agent-framework.cs
./03-dotnet-agent-framework.cs
```

Eller brug dotnet CLI:

```bash
dotnet run ./03-dotnet-agent-framework.cs
```

Se [`03-dotnet-agent-framework.cs`](../../../../03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.cs) for den komplette kode.

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

// Create New Conversation Session for Context Management
// Initialize a new conversation session to maintain context across multiple interactions
// Sessions enable the agent to remember previous exchanges and maintain conversational state
// This is essential for multi-turn conversations and contextual understanding
var session = await agent.CreateSessionAsync();

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

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->