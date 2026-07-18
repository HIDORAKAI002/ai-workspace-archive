# 🎨 Agentní návrhové vzory s Azure OpenAI (Responses API) (.NET)

## 📋 Cíle učení

Tento příklad demonstruje podnikové návrhové vzory pro tvorbu inteligentních agentů pomocí Microsoft Agent Framework v .NET s integrací Azure OpenAI (Responses API). Naučíte se profesionální vzory a architektonické přístupy, které činí agenty připravenými pro produkci, udržitelnými a škálovatelnými.

### Podnikové návrhové vzory

- 🏭 **Factory Pattern**: Standardizovaná tvorba agentů s dependency injection
- 🔧 **Builder Pattern**: Fluent konfigurace a nastavení agentů
- 🧵 **Thread-Safe Patterns**: Současné řízení konverzací
- 📋 **Repository Pattern**: Organizované řízení nástrojů a schopností

## 🎯 Architektonické výhody specifické pro .NET

### Podnikové funkce

- **Silné typování**: Ověření při kompilaci a podpora IntelliSense
- **Dependency Injection**: Integrovaný DI container
- **Správa konfigurace**: Vzory IConfiguration a Options
- **Async/Await**: Prvotřídní podpora asynchronního programování

### Vzory připravené na produkci

- **Integrace logování**: ILogger a strukturované logování
- **Kontroly zdravotního stavu**: Integrovaný monitoring a diagnostika
- **Validace konfigurace**: Silné typování s datovými anotacemi
- **Zpracování chyb**: Strukturované řízení výjimek

## 🔧 Technická architektura

### Jádrové komponenty .NET

- **Microsoft.Extensions.AI**: Unified AI service abstractions
- **Microsoft.Agents.AI**: Podnikový framework pro orchestraci agentů
- **Azure OpenAI (Responses API)**: Vysokovýkonné vzory klientů API
- **Konfigurační systém**: appsettings.json a integrace prostředí

### Implementace návrhových vzorů

```mermaid
graph LR
    A[IServiceCollection] --> B[Tvůrce agenta]
    B --> C[Konfigurace]
    C --> D[Registr nástrojů]
    D --> E[AI agent]
```

## 🏗️ Demonstrované podnikové vzory

### 1. **Tvořivé vzory**

- **Agent Factory**: Centralizovaná tvorba agentů s konzistentní konfigurací
- **Builder Pattern**: Fluent API pro komplexní konfiguraci agentů
- **Singleton Pattern**: Sdílené zdroje a správa konfigurace
- **Dependency Injection**: Volné vazby a testovatelnost

### 2. **Behaviorální vzory**

- **Strategy Pattern**: Zaměnitelné strategie provádění nástrojů
- **Command Pattern**: Zapouzdřené operace agenta s undo/redo
- **Observer Pattern**: Řízení životního cyklu agenta na základě událostí
- **Template Method**: Standardizované pracovní postupy agentů

### 3. **Strukturální vzory**

- **Adapter Pattern**: Vrstvu integrace Azure OpenAI (Responses API)
- **Decorator Pattern**: Vylepšení schopností agenta
- **Facade Pattern**: Zjednodušené rozhraní interakce s agentem
- **Proxy Pattern**: Lazy loading a caching pro výkon

## 📚 Principy návrhu v .NET

### Principy SOLID

- **Single Responsibility**: Každá komponenta má jeden jasný účel
- **Open/Closed**: Rozšiřitelná bez úprav
- **Liskov Substitution**: Implementace nástrojů založené na rozhraní
- **Interface Segregation**: Zaměřená, kohezní rozhraní
- **Dependency Inversion**: Závislost na abstrakcích, ne na konkrétnostech

### Čistá architektura

- **Doménová vrstva**: Základní abstrakce agentů a nástrojů
- **Aplikační vrstva**: Orchestraci a pracovní postupy agentů
- **Infrastrukturní vrstva**: Integrace Azure OpenAI (Responses API) a externích služeb
- **Prezentační vrstva**: Uživatelská interakce a formátování odpovědí

## 🔒 Podnikové aspekty

### Zabezpečení

- **Správa přihlašovacích údajů**: Bezpečné zacházení s API klíči pomocí IConfiguration
- **Validace vstupů**: Silné typování a validace pomocí datových anotací
- **Sanitizace výstupů**: Bezpečné zpracování a filtrování odpovědí
- **Auditní logování**: Komplexní sledování operací

### Výkon

- **Asynchronní vzory**: Nezablokované I/O operace
- **Pooling připojení**: Efektivní správa HTTP klienta
- **Caching**: Kešování odpovědí pro lepší výkon
- **Správa zdrojů**: Správné uvolňování a vzory úklidu

### Škálovatelnost

- **Bezpečnost vlákna**: Podpora současného provádění agentů
- **Přístup ke zdrojům**: Efektivní využívání zdrojů
- **Řízení zátěže**: Omezení rychlosti a zvládání zpětného tlaku
- **Monitoring**: Metriky výkonu a kontroly zdravotního stavu

## 🚀 Produkční nasazení

- **Správa konfigurace**: Nastavení specifická pro prostředí
- **Strategie logování**: Strukturované logování s korelačními ID
- **Zpracování chyb**: Globální správa výjimek s řádným zotavením
- **Monitorování**: Application Insights a výkonnostní čítače
- **Testování**: Jednotkové testy, integrační testy a vzory zatěžovacího testování

Připraveni tvořit inteligentní agenty podnikového rázu s .NET? Postavme něco robustního! 🏢✨

## 🚀 Začínáme

### Požadavky

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) nebo novější
- Předplatné [Azure](https://azure.microsoft.com/free/) s Azure OpenAI zdrojem a nasazením modelu
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — přihlaste se pomocí `az login`

### Požadované proměnné prostředí

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Pak se přihlaste, aby AzureCliCredential mohl získat token
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Pak se přihlaste, aby AzureCliCredential mohl získat token
az login
```

### Ukázkový kód

Pro spuštění ukázkového kódu,

```bash
# zsh/bash
chmod +x ./03-dotnet-agent-framework.cs
./03-dotnet-agent-framework.cs
```

Nebo pomocí dotnet CLI:

```bash
dotnet run ./03-dotnet-agent-framework.cs
```

Viz [`03-dotnet-agent-framework.cs`](../../../../03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.cs) pro kompletní kód.

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
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->