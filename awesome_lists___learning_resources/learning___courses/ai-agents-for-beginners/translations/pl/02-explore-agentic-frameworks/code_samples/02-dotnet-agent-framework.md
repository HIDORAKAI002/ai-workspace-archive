# 🔍 Eksploracja Microsoft Agent Framework - Podstawowy agent (.NET)

## 📋 Cele nauki

Ten przykład bada podstawowe koncepcje Microsoft Agent Framework poprzez implementację podstawowego agenta w .NET. Nauczysz się kluczowych wzorców agentów i zrozumiesz, jak działają inteligentne agenty pod maską, korzystając z C# i ekosystemu .NET.

### Co odkryjesz

- 🏗️ **Architektura agenta**: Zrozumienie podstawowej struktury agentów AI w .NET
- 🛠️ **Integracja narzędzi**: Jak agenty korzystają z zewnętrznych funkcji, aby rozszerzyć możliwości  
- 💬 **Przepływ rozmowy**: Zarządzanie wieloetapowymi rozmowami i kontekstem z zarządzaniem wątkami
- 🔧 **Wzorce konfiguracji**: Najlepsze praktyki dotyczące konfiguracji i zarządzania agentem w .NET

## 🎯 Kluczowe pojęcia omówione

### Zasady frameworku agentowego

- **Autonomia**: Jak agenty podejmują niezależne decyzje, korzystając z abstrakcji AI w .NET
- **Reaktywność**: Reagowanie na zmiany środowiska i wejścia użytkownika
- **Proaktywność**: Podejmowanie inicjatywy na podstawie celów i kontekstu
- **Umiejętności społeczne**: Interakcja w naturalnym języku z wykorzystaniem wątków rozmowy

### Komponenty techniczne

- **AIAgent**: Główna orkiestracja agenta i zarządzanie rozmową (.NET)
- **Funkcje narzędzi**: Rozszerzanie możliwości agenta za pomocą metod i atrybutów C#
- **Integracja Azure OpenAI**: Wykorzystanie modeli językowych przez Azure OpenAI Responses API
- **Bezpieczna konfiguracja**: Zarządzanie punktami końcowymi oparte na środowisku

## 🔧 Stos technologiczny

### Główne technologie

- Microsoft Agent Framework (.NET)
- Integracja Azure OpenAI (Responses API)
- Wzorce klienta Azure.AI.OpenAI
- Konfiguracja oparta na środowisku z DotNetEnv

### Możliwości agenta

- Rozumienie i generowanie języka naturalnego
- Wywoływanie funkcji i korzystanie z narzędzi z atrybutami C#
- Odpowiedzi kontekstowe z sesjami rozmów
- Rozszerzalna architektura z wzorcami wstrzykiwania zależności

## 📚 Porównanie frameworków

Ten przykład pokazuje podejście Microsoft Agent Framework w porównaniu z innymi frameworkami agentowymi:

| Funkcja | Microsoft Agent Framework | Inne Frameworki |
|---------|-------------------------|------------------|
| **Integracja** | Natywny ekosystem Microsoft | Różnorodna kompatybilność |
| **Prostota** | Czyste, intuicyjne API | Często skomplikowana konfiguracja |
| **Rozszerzalność** | Łatwa integracja narzędzi | Zależne od frameworku |
| **Gotowość do przedsiębiorstw** | Stworzone do produkcji | Zależy od frameworku |

## 🚀 Rozpoczęcie pracy

### Wymagania wstępne

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) lub nowszy
- Subskrypcja [Azure](https://azure.microsoft.com/free/) z zasobem Azure OpenAI i wdrożeniem modelu
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — zaloguj się za pomocą `az login`

### Wymagane zmienne środowiskowe

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Następnie zaloguj się, aby AzureCliCredential mógł pobrać token
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Następnie zaloguj się, aby AzureCliCredential mógł uzyskać token
az login
```

### Przykładowy kod

Aby uruchomić przykład kodu,

```bash
# zsh/bash
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

Lub za pomocą interfejsu dotnet CLI:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

Zobacz [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) dla pełnego kodu.

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

## 🎓 Kluczowe wnioski

1. **Architektura agenta**: Microsoft Agent Framework zapewnia czyste, typowo bezpieczne podejście do budowy agentów AI w .NET
2. **Integracja narzędzi**: Funkcje opatrzone atrybutami `[Description]` stają się dostępnymi narzędziami dla agenta
3. **Kontekst rozmowy**: Zarządzanie sesjami umożliwia wieloetapowe rozmowy z pełną świadomością kontekstu
4. **Zarządzanie konfiguracją**: Zmienne środowiskowe i bezpieczne zarządzanie poświadczeniami zgodnie z najlepszymi praktykami .NET
5. **Azure OpenAI Responses API**: Agent korzysta z Azure OpenAI Responses API za pomocą SDK Azure.AI.OpenAI

## 🔗 Dodatkowe zasoby

- [Dokumentacja Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI w Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [Aplikacje jednolity plik .NET](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->