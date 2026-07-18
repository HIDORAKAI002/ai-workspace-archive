# 🌍 AI Utazási Ügynök a Microsoft Agent Framework-kel (.NET)

## 📋 Forgatókönyv áttekintése

Ez a példa bemutatja, hogyan lehet intelligens utazástervező ügynököt építeni a Microsoft Agent Framework .NET-es verziójával. Az ügynök automatikusan képes személyre szabott egynapos kirándulásokat generálni véletlenszerű célpontokra szerte a világon.

### Kulcsfontosságú képességek:

- 🎲 **Véletlenszerű célpont választás**: Egyedi eszközt használ a nyaralóhelyek kiválasztására
- 🗺️ **Intelligens utazástervezés**: Részletes napi lebontású útiterv készítése
- 🔄 **Valós idejű streaming**: Azonnali és folyamatos válaszadás támogatása
- 🛠️ **Egyedi eszköz integráció**: Bemutatja, hogyan bővíthető az ügynök képessége

## 🔧 Műszaki architektúra

### Központi technológiák

- **Microsoft Agent Framework**: Legújabb .NET megvalósítás AI ügynök fejlesztéshez
- **Azure OpenAI (Responses API)**: Az Azure OpenAI Responses API használata a modell lekérdezéséhez
- **Azure Identity**: Biztonságos bejelentkezés `AzureCliCredential` segítségével (`az login`)
- **Biztonságos konfiguráció**: Környezet alapú végpont kezelés

### Főbb összetevők

1. **AIAgent**: A fő ügynök, amely irányítja a beszélgetés folyamatát
2. **Egyedi eszközök**: `GetRandomDestination()` függvény elérhető az ügynök számára
3. **Responses kliens**: Azure OpenAI Responses alapú beszélgetési felület
4. **Streaming támogatás**: Valós idejű válaszgenerálási képességek

### Integrációs minta

```mermaid
graph LR
    A[Felhasználói kérelem] --> B[MI ügynök]
    B --> C[Azure OpenAI (Válaszok API)]
    B --> D[GetRandomDestination eszköz]
    C --> E[Utazási útvonalterv]
    D --> E
```

## 🚀 Kezdés

### Előfeltételek

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) vagy újabb
- Egy [Azure előfizetés](https://azure.microsoft.com/free/) Azure OpenAI erőforrással és modell telepítéssel
- Az [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — bejelentkezés `az login` segítségével

### Szükséges környezeti változók

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Ezután jelentkezzen be, hogy az AzureCliCredential tokenhez juthasson
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Ezután jelentkezz be, hogy az AzureCliCredential tokenhez jusson
az login
```

### Mintakód

A kód példány futtatásához,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

Vagy a dotnet CLI használatával:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

Lásd a [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) fájlt a teljes kódért.

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

## 🎓 Főbb tanulságok

1. **Ügynök architektúra**: A Microsoft Agent Framework tiszta, típusbiztos megközelítést kínál AI ügynökök .NET-ben történő fejlesztéséhez
2. **Eszköz integráció**: A `[Description]` attribútummal ellátott függvények elérhető eszközökké válnak az ügynöknek
3. **Konfiguráció kezelés**: A környezeti változók és a biztonságos hitelesítő adatok kezelése a .NET legjobb gyakorlatait követi
4. **Azure OpenAI Responses API**: Az ügynök az Azure.AI.OpenAI SDK-n keresztül használja az Azure OpenAI Responses API-t

## 🔗 További források

- [Microsoft Agent Framework dokumentáció](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI a Microsoft Foundry-ban](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Egy fájl alkalmazások](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->