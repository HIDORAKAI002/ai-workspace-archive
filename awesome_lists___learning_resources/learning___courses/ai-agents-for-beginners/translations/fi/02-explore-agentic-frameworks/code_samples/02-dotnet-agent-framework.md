# 🔍 Microsoft Agent Frameworkin tutkiminen - Perusagentti (.NET)

## 📋 Oppimistavoitteet

Tässä esimerkissä tutustutaan Microsoft Agent Frameworkin peruskäsitteisiin toteuttamalla perusagentti .NET:ssä. Opit keskeiset agenttiperusteiset mallit ja ymmärrät, miten älykkäät agentit toimivat taustalla käyttäen C#:ta ja .NET-ekosysteemiä.

### Mitä Tulet Löytämään

- 🏗️ **Agentin arkkitehtuuri**: Ymmärtäminen AI-agenttien perusrakenteesta .NET:ssä
- 🛠️ **Työkalujen integrointi**: Kuinka agentit käyttävät ulkoisia toimintoja laajentaakseen kyvykkyyksiään  
- 💬 **Keskustelun kulku**: Monivuoroisten keskustelujen ja kontekstin hallinta säikeiden avulla
- 🔧 **Konfigurointimallit**: Parhaat käytännöt agentin asennukseen ja hallintaan .NET:ssä

## 🎯 Käsitellyt keskeiset käsitteet

### Agenttiperusteiset periaatteet

- **Itsenäisyys**: Kuinka agentit tekevät itsenäisiä päätöksiä käyttämällä .NET AI -abstraktioita
- **Reaktiivisuus**: Ympäristön muutoksiin ja käyttäjän syötteisiin vastaaminen
- **Proaktiivisuus**: Aloitteellisuus perustuen tavoitteisiin ja kontekstiin
- **Sosiaalinen kyky**: Vuorovaikutus luonnollisen kielen kautta keskustelusäikeissä

### Teknisiä komponentteja

- **AIAgent**: Keskeinen agentin orkestrointi ja keskustelun hallinta (.NET)
- **Työkalutoiminnot**: Agentin kyvykkyyksien laajentaminen C#-metodeilla ja atribuuteilla
- **Azure OpenAI -integraatio**: Kielenmallien hyödyntäminen Azure OpenAI Responses -rajapinnan kautta
- **Turvallinen konfigurointi**: Ympäristöön perustuva päätepisteiden hallinta

## 🔧 Tekninen pinorakenne

### Keskeiset teknologiat

- Microsoft Agent Framework (.NET)
- Azure OpenAI (Responses API) integraatio
- Azure.AI.OpenAI -asiakasprototyypit
- Ympäristöön perustuva konfigurointi DotNetEnv-kirjastolla

### Agentin kyvykkyydet

- Luonnollisen kielen ymmärtäminen ja generointi
- Funktioiden kutsuminen ja työkalujen käyttö C#-attribuuteilla
- Kontekstitietoisiin vastauksiin perustuvat keskustelusessiot
- Laajennettava arkkitehtuuri riippuvuussuihkutuksen malleilla

## 📚 Kehyksen vertailu

Tämä esimerkki havainnollistaa Microsoft Agent Framework -lähestymistapaa muihin agenttiperusteisiin kehyksiin verrattuna:

| Ominaisuus | Microsoft Agent Framework | Muut kehykset |
|---------|-------------------------|------------------|
| **Integraatio** | Microsoftin natiiviekosysteemi | Vaihteleva yhteensopivuus |
| **Yksinkertaisuus** | Selkeä, intuitiivinen API | Usein monimutkainen asennus |
| **Laajennettavuus** | Helppo työkalujen integrointi | Riippuu kehyksestä |
| **Yrityskäyttövalmius** | Rakennettu tuotantoon | Riippuu kehyksestä |

## 🚀 Aloittaminen

### Esivaatimukset

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) tai uudempi
- [Azure-tilaus](https://azure.microsoft.com/free/) Azure OpenAI -resurssilla ja mallin käyttöönotolla
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — kirjaudu sisään `az login` -komennolla

### Vaaditut ympäristömuuttujat

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Kirjaudu sitten sisään, jotta AzureCliCredential voi hankkia tokenin
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Kirjaudu sitten sisään, jotta AzureCliCredential voi saada tokenin
az login
```

### Esimerkkikoodi

Suorita koodiesimerkki,

```bash
# zsh/bash
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

Tai käytä dotnet CLI:tä:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

Katso täydellinen koodi tiedostosta [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs).

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

## 🎓 Tärkeimmät opetukset

1. **Agentin arkkitehtuuri**: Microsoft Agent Framework tarjoaa puhtaan, tyyppiturvallisen lähestymistavan AI-agenttien rakentamiseen .NET:ssä
2. **Työkalujen integrointi**: `[Description]`-attribuutilla koristellut funktiot ovat agentin käytettävissä olevia työkaluja
3. **Keskustelun konteksti**: Sessiomanagement mahdollistaa monivuoroiset keskustelut täydellä kontekstitietoisuudella
4. **Konfiguraation hallinta**: Ympäristömuuttujat ja turvallinen tunnistetietojen käsittely noudattavat .NET:n parhaita käytäntöjä
5. **Azure OpenAI Responses API**: Agentti käyttää Azure OpenAI Responses APIa Azure.AI.OpenAI SDK:n kautta

## 🔗 Lisäresurssit

- [Microsoft Agent Frameworkin dokumentaatio](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI Microsoft Foundryssa](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET yksittäistiedostosovellukset](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->