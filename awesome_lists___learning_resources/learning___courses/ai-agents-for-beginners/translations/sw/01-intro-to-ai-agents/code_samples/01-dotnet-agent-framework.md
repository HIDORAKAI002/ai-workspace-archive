# 🌍 Wakala wa Safari wa AI kwa kutumia Microsoft Agent Framework (.NET)

## 📋 Muhtasari wa Muktadha

Mfano huu unaonyesha jinsi ya kujenga wakala mwerevu wa kupanga safari kwa kutumia Microsoft Agent Framework kwa .NET. Wakala anaweza kuunda itinerary za siku ya ziara kwa maeneo tofauti duniani kwa njia ya moja kwa moja na binafsi.

### Uwezo Muhimu:

- 🎲 **Uchaguzi wa Mahali kwa Bahati Nasibu**: Inatumia chombo maalum kuchagua maeneo ya likizo
- 🗺️ **Mpangilio Mwerevu wa Safari**: Huunda itinerary za kina siku kwa siku
- 🔄 **Utoaji wa Moja kwa Moja**: Inasaidia majibu ya papo hapo na ya kuendelea
- 🛠️ **Uunganishaji wa Zana Maalum**: Unaonesha jinsi ya kuongeza uwezo wa wakala

## 🔧 Mambo ya Kiufundi

### Teknolojia Muhimu

- **Microsoft Agent Framework**: Utekelezaji wa hivi karibuni wa .NET kwa uundaji wa wakala wa AI
- **Azure OpenAI (API za Majibu)**: Inatumia Azure OpenAI Responses API kwa uchambuzi wa modeli
- **Azure Identity**: Kuingia salama kwa kutumia `AzureCliCredential` (`az login`)
- **Usimamizi Salama**: Usimamizi wa anwani za mazingira

### Vipengele Vikuu

1. **AIAgent**: Msimamizi mkuu wa wakala anayetoa mtiririko wa mazungumzo
2. **Zana Maalum**: Kazi ya `GetRandomDestination()` inapatikana kwa wakala
3. **Mteja wa Majibu**: Kiolesura cha mazungumzo kinachotumia Azure OpenAI Responses
4. **Msaada wa Utoaji wa Moja kwa Moja**: Uwezo wa kutoa majibu papo hapo

### Mchoro wa Muunganisho

```mermaid
graph LR
    A[Ombi la Mtumiaji] --> B[Wakala wa AI]
    B --> C[Azure OpenAI (API za Majibu)]
    B --> D[Zana ya KupataMwendokasiNasibu]
    C --> E[Ratiba ya Safari]
    D --> E
```

## 🚀 Kuanzia

### Mahitaji Kabla ya Kuanzia

- [SDK ya .NET 10](https://dotnet.microsoft.com/download/dotnet/10.0) au zaidi
- Usajili wa [Azure](https://azure.microsoft.com/free/) una rasilimali ya Azure OpenAI na usambazaji wa modeli
- CLI ya [Azure](https://learn.microsoft.com/cli/azure/install-azure-cli) — ingia kwa `az login`

### Vigezo Vinavyohitajika katika Mazingira

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Kisha ingia ili AzureCliCredential ipate tokeni
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Kisha ingia ili AzureCliCredential iweze kupata tokeni
az login
```

### Mfano wa Msimbo

Ili kuendesha mfano wa msimbo,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

Au kwa kutumia CLI ya dotnet:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

Tazama [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) kwa msimbo kamili.

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

## 🎓 Mambo Muhimu Kujifunza

1. **Mikakati ya Wakala**: Microsoft Agent Framework hutoa njia safi na salama ya kutumia aina kwa ujenzi wa mawakala wa AI katika .NET
2. **Uunganishaji wa Zana**: Kazi zilizo na sifa za `[Description]` zinakuwa zana zinazopatikana kwa wakala
3. **Usimamizi wa Usanidi**: Vigezo vya mazingira na usimamizi salama wa cheti hufuata mbinu bora za .NET
4. **Azure OpenAI Responses API**: Wakala hutumia Azure OpenAI Responses API kupitia Azure.AI.OpenAI SDK

## 🔗 Rasilimali Zaidi

- [Nyaraka za Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI katika Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [Programu za Faili Moja za .NET](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->