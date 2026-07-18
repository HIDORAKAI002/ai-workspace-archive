# 🌍 Inteligentny Agent Podróży z Microsoft Agent Framework (.NET)

## 📋 Przegląd scenariusza

Ten przykład pokazuje, jak zbudować inteligentnego agenta planującego podróże przy użyciu Microsoft Agent Framework dla .NET. Agent potrafi automatycznie generować spersonalizowane plany jednodniowych wycieczek do losowych miejsc na świecie.

### Kluczowe funkcje:

- 🎲 **Losowy wybór destynacji**: Używa niestandardowego narzędzia do wyboru miejsc wakacyjnych
- 🗺️ **Inteligentne planowanie podróży**: Tworzy szczegółowe plany dzień po dniu
- 🔄 **Transmisja w czasie rzeczywistym**: Wspiera odpowiedzi natychmiastowe i strumieniowe
- 🛠️ **Integracja niestandardowych narzędzi**: Pokazuje, jak rozszerzać możliwości agenta

## 🔧 Architektura techniczna

### Główne technologie

- **Microsoft Agent Framework**: Najnowsza implementacja .NET do tworzenia AI agentów
- **Azure OpenAI (Responses API)**: Wykorzystuje Azure OpenAI Responses API do inferencji modeli
- **Azure Identity**: Bezpieczne logowanie przez `AzureCliCredential` (`az login`)
- **Bezpieczna konfiguracja**: Zarządzanie punktami końcowymi oparte na środowisku

### Kluczowe komponenty

1. **AIAgent**: Główny koordynator agenta obsługujący przepływ rozmowy
2. **Niestandardowe narzędzia**: Funkcja `GetRandomDestination()` dostępna dla agenta
3. **Klient Responses**: Interfejs rozmowy oparty na Azure OpenAI Responses
4. **Obsługa transmisji strumieniowej**: Możliwości generowania odpowiedzi w czasie rzeczywistym

### Wzorzec integracji

```mermaid
graph LR
    A[Żądanie Użytkownika] --> B[Agent AI]
    B --> C[Azure OpenAI (API Odpowiedzi)]
    B --> D[Narzędzie GetRandomDestination]
    C --> E[Plan Podróży]
    D --> E
```

## 🚀 Pierwsze kroki

### Wymagania wstępne

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) lub wyższy
- Subskrypcja [Azure](https://azure.microsoft.com/free/) z zasobem Azure OpenAI i wdrożeniem modelu
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — zaloguj się za pomocą `az login`

### Wymagane zmienne środowiskowe

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Następnie zaloguj się, aby AzureCliCredential mógł uzyskać token
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
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

Lub używając CLI dotnet:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

Zobacz [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) dla kompletnego kodu.

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

## 🎓 Najważniejsze wnioski

1. **Architektura agenta**: Microsoft Agent Framework zapewnia czyste, bezpieczne typu podejście do budowania AI agentów w .NET
2. **Integracja narzędzi**: Funkcje oznaczone atrybutami `[Description]` stają się dostępnymi narzędziami dla agenta
3. **Zarządzanie konfiguracją**: Zmienne środowiskowe i bezpieczne obsługiwanie poświadczeń zgodnie z najlepszymi praktykami .NET
4. **Azure OpenAI Responses API**: Agent korzysta z Azure OpenAI Responses API przez SDK Azure.AI.OpenAI

## 🔗 Dodatkowe zasoby

- [Dokumentacja Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI w Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->