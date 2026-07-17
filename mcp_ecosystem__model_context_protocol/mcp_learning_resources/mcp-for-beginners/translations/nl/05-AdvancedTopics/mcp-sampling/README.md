> [VEROUDERD: 2026-07-28 RELEASEKANDIDAAT](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Sampling in Model Context Protocol

> **Melding van veroudering:** de `2026-07-28` MCP specificatie releasekandidaat markeert Sampling als verouderd ten gunste van directe integratie met LLM provider API's. Sampling blijft werken in `2025-11-25` en voor ten minste een jaar na een formele veroudering, dus alles in deze les blijft geldig - maar nieuwe serverontwerpen moeten het vervangende patroon evalueren. Zie [Wat verandert er in MCP: De 2026-07-28 Releasekandidaat](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Sampling is een krachtige MCP-functie die servers in staat stelt LLM-afrondingen via de client op te vragen, waardoor geavanceerd agent-gedrag mogelijk is terwijl veiligheid en privacy worden gewaarborgd. De juiste samplingconfiguratie kan de kwaliteit en prestaties van de respons aanzienlijk verbeteren. MCP biedt een gestandaardiseerde manier om te bepalen hoe modellen tekst genereren met specifieke parameters die de willekeur, creativiteit en samenhang beïnvloeden.

## Inleiding

In deze les gaan we onderzoeken hoe samplingparameters geconfigureerd kunnen worden in MCP-verzoeken en begrijpen we de onderliggende protocolmechanica van sampling.

## Leerdoelen

Aan het eind van deze les kun je:

- De belangrijkste samplingparameters in MCP begrijpen.
- Samplingparameters configureren voor verschillende gebruikssituaties.
- Deterministische sampling implementeren voor reproduceerbare resultaten.
- Samplingparameters dynamisch aanpassen op basis van context en gebruikersvoorkeuren.
- Samplingstrategieën toepassen om modelprestaties in diverse scenario's te verbeteren.
- Begrijpen hoe sampling werkt in de client-server flow van MCP.

## Hoe Sampling Werkt in MCP

De samplingstroom in MCP volgt deze stappen:

1. Server stuurt een `sampling/createMessage` verzoek naar de client
2. Client bekijkt het verzoek en kan het aanpassen
3. Client samplet uit een LLM
4. Client beoordeelt de afronding
5. Client retourneert het resultaat aan de server

Dit ontwerp met mens-in-de-lus zorgt ervoor dat gebruikers controle houden over wat de LLM ziet en genereert.

## Overzicht Samplingparameters

MCP definieert de volgende samplingparameters die geconfigureerd kunnen worden in clientverzoeken:

| Parameter | Beschrijving | Typisch bereik |
|-----------|-------------|---------------|
| `temperature` | Stuurt de willekeurigheid bij tokenselectie | 0.0 - 1.0 |
| `maxTokens` | Maximale aantal tokens om te genereren | Geheel getal |
| `stopSequences` | Aangepaste sequenties die generatie stoppen als ze worden tegengekomen | Array van strings |
| `metadata` | Extra provider-specifieke parameters | JSON-object |

Veel LLM-providers ondersteunen extra parameters via het `metadata` veld, dat kan bevatten:

| Veelvoorkomende Extensieparameter | Beschrijving | Typisch bereik |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling - beperkt tokens tot top cumulatieve waarschijnlijkheid | 0.0 - 1.0 |
| `top_k` | Beperkt tokenselectie tot top K opties | 1 - 100 |
| `presence_penalty` | Straf tokens op basis van hun aanwezigheid in de tekst tot nu toe | -2.0 - 2.0 |
| `frequency_penalty` | Straf tokens op basis van hun frequentie in de tekst tot nu toe | -2.0 - 2.0 |
| `seed` | Specifieke willekeurige seed voor reproduceerbare resultaten | Geheel getal |

## Voorbeeld Verzoek Formaat

Hier een voorbeeld van het opvragen van sampling van een client in MCP:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## Respons Formaat

De client retourneert een voltooiingsresultaat:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## Mens in de Lus Controle

MCP sampling is ontworpen met menselijke controle in gedachten:

- **Voor prompts**:
  - Clients moeten gebruikers de voorgestelde prompt tonen
  - Gebruikers moeten prompts kunnen aanpassen of weigeren
  - Systeem prompts kunnen gefilterd of aangepast worden
  - Context-inclusie wordt door de client geregeld

- **Voor afrondingen**:
  - Clients moeten gebruikers de afronding tonen
  - Gebruikers moeten afrondingen kunnen aanpassen of weigeren
  - Clients kunnen afrondingen filteren of aanpassen
  - Gebruikers bepalen welk model wordt gebruikt

Met deze principes in gedachten kijken we hoe sampling geïmplementeerd wordt in verschillende programmeertalen, met focus op de parameters die algemeen ondersteund worden door LLM-providers.

## Beveiligingsoverwegingen

Bij het implementeren van sampling in MCP, houd rekening met deze beste beveiligingspraktijken:

- **Valideer alle message-inhoud** voordat deze naar de client wordt gestuurd
- **Reinig gevoelige informatie** uit prompts en afrondingen
- **Implementeer snelheidslimieten** om misbruik te voorkomen
- **Monitor samplinggebruik** voor ongebruikelijke patronen
- **Versleutel gegevens tijdens overdracht** met veilige protocollen
- **Behandel privacy van gebruikersgegevens** volgens relevante regelgeving
- **Auditeer samplingverzoeken** voor naleving en beveiliging
- **Beperk kostenblootstelling** met passende limieten
- **Implementeer time-outs** voor samplingverzoeken
- **Ga gracieus om met model fouten** met passende fallbacks

Samplingparameters maken het mogelijk het gedrag van taalmodellen fijn af te stellen om de gewenste balans te bereiken tussen deterministische en creatieve output.

Laten we kijken hoe deze parameters geconfigureerd kunnen worden in verschillende programmeertalen.

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

In bovenstaande code hebben we:

- Een MCP-client aangemaakt met een specifieke server-URL.
- Een verzoek geconfigureerd met samplingparameters zoals `temperature`, `top_p` en `top_k`.
- Het verzoek verzonden en de gegenereerde tekst afgedrukt.
- Gebruikt:
    - `allowedTools` om te specificeren welke tools het model mag gebruiken tijdens generatie. In dit geval gaven we toestemming aan de `ideaGenerator` en `marketAnalyzer` tools om te helpen bij het genereren van creatieve app ideeën.
    - `frequencyPenalty` en `presencePenalty` om herhaling tegen te gaan en diversiteit in de output te stimuleren.
    - `temperature` om de willekeurigheid van de output te beheersen, waarbij hogere waarden leiden tot creatievere reacties.
    - `top_p` om de selectie van tokens te beperken tot die bijdragen aan de top cumulatieve waarschijnlijkheidsmassa, wat de kwaliteit van gegenereerde tekst verbetert.
    - `top_k` om het model te beperken tot de top K meest waarschijnlijke tokens, wat kan helpen bij het genereren van meer coherente reacties.
    - `frequencyPenalty` en `presencePenalty` om herhaling te verminderen en diversiteit in de gegenereerde tekst te bevorderen.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript Voorbeeld: Temperatuur- en Top-P samplingconfiguratie
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Initialiseer de MCP-client
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Stel verzoek in met verschillende samplingparameters
  const creativeSampling = {
    temperature: 0.9,    // Hogere temperatuur = meer willekeur/creativiteit
    topP: 0.92,          // Beschouw tokens met een top 92% waarschijnlijkheidsmassa
    frequencyPenalty: 0.6, // Verminder herhaling van tokenreeksen
    presencePenalty: 0.4   // Straf tokens die tot nu toe in de tekst zijn verschenen
  };
  
  const factualSampling = {
    temperature: 0.2,    // Lagere temperatuur = meer deterministisch/factueel
    topP: 0.85,          // Iets meer gerichte tokenselectie
    frequencyPenalty: 0.2, // Minimale herhalingsstraf
    presencePenalty: 0.1   // Minimale aanwezigheidstraf
  };
  
  try {
    // Verzend twee verzoeken met verschillende samplingconfiguraties
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

In bovenstaande code hebben we:

- Een MCP-client geïnitialiseerd met een server-URL en API-sleutel.
- Twee sets samplingparameters geconfigureerd: één voor creatieve taken en een andere voor feitelijke taken.
- Verzoeken verzonden met deze configuraties, waarmee het model specifieke tools mag gebruiken voor elke taak.
- De gegenereerde antwoorden afgedrukt om de effecten van verschillende samplingparameters te demonstreren.
- `allowedTools` gebruikt om te specificeren welke tools het model tijdens generatie mag gebruiken. In dit geval gaven we toestemming aan de `ideaGenerator` en `environmentalImpactTool` voor creatieve taken, en `factChecker` en `dataAnalysisTool` voor feitelijke taken.
- `temperature` gebruikt om de willekeurigheid van de output te beheersen, waarbij hogere waarden leiden tot creatievere reacties.
- `top_p` gebruikt om de selectie van tokens te beperken tot die bijdragen aan de top cumulatieve waarschijnlijkheidsmassa, wat de kwaliteit van gegenereerde tekst verbetert.
- `frequencyPenalty` en `presencePenalty` gebruikt om herhaling te verminderen en diversiteit in de output te stimuleren.
- `top_k` gebruikt om het model te beperken tot de top K meest waarschijnlijke tokens, wat kan helpen bij het genereren van meer coherente reacties.

---

## Deterministische Sampling

Voor toepassingen die consistente output vereisen, zorgt deterministische sampling voor reproduceerbare resultaten. Dat gebeurt door een vaste willekeurige seed te gebruiken en de temperature op nul te zetten.

Laten we hieronder een voorbeeldimplementatie bekijken die deterministische sampling laat zien in verschillende programmeertalen.

# [Java](#tab/java)

```java
// Java Voorbeeld: Deterministische antwoorden met vaste seed
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Gebruik van een vaste seed voor deterministische resultaten
        
        // Eerste verzoek met vaste seed
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nul temperatuur voor maximale determinisme
            .build();
            
        // Tweede verzoek met dezelfde seed
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Beide verzoeken uitvoeren
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Antwoorden zouden identiek moeten zijn vanwege dezelfde seed en temperatuur=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

In bovenstaande code hebben we:

- Een MCP-client aangemaakt met een opgegeven server-URL.
- Twee verzoeken geconfigureerd met dezelfde prompt, vaste seed en nul temperature.
- Beide verzoeken verzonden en de gegenereerde tekst afgedrukt.
- Aangetoond dat de antwoorden identiek zijn vanwege het deterministische karakter van de samplingconfiguratie (zelfde seed en temperature).
- `setSeed` gebruikt om een vaste willekeurige seed op te geven, wat garandeert dat het model elke keer dezelfde output genereert voor dezelfde input.
- `temperature` op nul gezet om maximale determinisme te verzekeren, wat betekent dat het model altijd de meest waarschijnlijke volgende token selecteert zonder willekeur.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript Voorbeeld: Deterministische reacties met zaadcontrole
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Eerste verzoek met vaste zaad
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Nultemperatuur voor maximale determinisme
    });
    
    // Tweede verzoek met dezelfde zaad en temperatuur
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Derde verzoek met andere zaad maar dezelfde temperatuur
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

In bovenstaande code hebben we:

- Een MCP-client geïnitialiseerd met een server-URL.
- Twee verzoeken geconfigureerd met dezelfde prompt, vaste seed en nul temperature.
- Beide verzoeken verzonden en de gegenereerde tekst afgedrukt.
- Aangetoond dat de antwoorden identiek zijn vanwege het deterministische karakter van de samplingconfiguratie (zelfde seed en temperature).
- `seed` gebruikt om een vaste willekeurige seed op te geven, wat garandeert dat het model elke keer dezelfde output genereert voor dezelfde input.
- `temperature` op nul gezet om maximale determinisme te verzekeren, wat betekent dat het model altijd de meest waarschijnlijke volgende token selecteert zonder willekeur.
- Voor het derde verzoek een andere seed gebruikt om te laten zien dat het veranderen van de seed leidt tot verschillende outputs, zelfs met dezelfde prompt en temperature.

---

## Dynamische Samplingconfiguratie

Intelligente sampling past parameters aan op basis van de context en vereisten van elk verzoek. Dat betekent dat parameters zoals temperature, top_p en straffen dynamisch worden aangepast op basis van het type taak, gebruikersvoorkeuren of historische prestaties.

Laten we kijken hoe dynamische sampling geïmplementeerd wordt in verschillende programmeertalen.

# [Python](#tab/python)

```python
# Python Voorbeeld: Dynamische sampling gebaseerd op aanvraagcontext
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definieer sampleerinstellingen voor verschillende taaktypen
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Selecteer basisinstelling
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Pas aan op basis van gebruikersvoorkeuren indien opgegeven
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Schaal temperatuur op basis van creativiteitsvoorkeur (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Pas top_p aan op basis van gewenste responsdiversiteit
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Maak aanvraag aan en verzend met aangepaste sampleerparameters
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Retourneer respons met sampleermetagegevens voor transparantie
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

In bovenstaande code hebben we:

- Een `DynamicSamplingService` klasse gemaakt die adaptieve sampling beheert.
- Samplingpresets gedefinieerd voor verschillende taaktypes (creatief, feitelijk, code, analytisch).
- Een basale samplingpreset geselecteerd op basis van het taaktype.
- Samplingparameters aangepast op basis van gebruikersvoorkeuren, zoals creativiteitsniveau en diversiteit.
- Het verzoek verzonden met dynamisch geconfigureerde samplingparameters.
- De gegenereerde tekst teruggegeven samen met de toegepaste samplingparameters en het type taak voor transparantie.
- `temperature` gebruikt om de willekeurigheid van de output te sturen, waarbij hogere waarden leiden tot creatievere reacties.
- `top_p` gebruikt om de selectie van tokens te beperken tot die die bijdragen aan de top cumulatieve waarschijnlijkheidsmassa, wat de kwaliteit van gegenereerde tekst verbetert.
- `frequency_penalty` gebruikt om herhaling te verminderen en diversiteit in de output te stimuleren.
- `user_preferences` gebruikt om aanpassing van samplingparameters mogelijk te maken op basis van door gebruikers gedefinieerde creativiteits- en diversiteitsniveaus.
- `task_type` gebruikt om de juiste samplingstrategie voor het verzoek te bepalen, waardoor meer op maat gemaakte antwoorden mogelijk zijn afhankelijk van het soort taak.
- `send_request` methode gebruikt om de prompt met geconfigureerde samplingparameters te verzenden, waarmee wordt verzekerd dat het model tekst genereert volgens de opgegeven vereisten.
- `generated_text` gebruikt om de reactie van het model op te halen, die vervolgens samen met de samplingparameters en het taaktype wordt geretourneerd voor verdere analyse of weergave.
- `min` en `max` functies gebruikt om te garanderen dat gebruikersvoorkeuren binnen geldige grenzen blijven, zodat ongeldige samplingconfiguraties worden voorkomen.

# [JavaScript Dynamisch](#tab/javascript-dynamic)

```javascript
// JavaScript Voorbeeld: Dynamische samplingconfiguratie gebaseerd op gebruikerscontext
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Basale samplingprofielen definiëren
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Historische prestaties bijhouden
    this.performanceHistory = [];
  }
  
  // Taaktype detecteren vanuit prompt
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Eenvoudige heuristische detectie - kan worden verbeterd met ML-classificatie
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // Standaard naar conversatie als geen duidelijk type wordt gedetecteerd
    return 'conversational';
  }
  
  // Samplingparameters berekenen op basis van context en gebruikersvoorkeuren
  getSamplingParameters(prompt, context = {}) {
    // Het type taak detecteren
    const taskType = this.detectTaskType(prompt, context);
    
    // Basispofil ophalen
    let params = {...this.samplingProfiles[taskType]};
    
    // Aanpassen op basis van gebruikersvoorkeuren
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Schalen van 1-10 naar passende temperatuurbereik
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Hogere precisie betekent lagere topP (meer gefocuste selectie)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Hogere consistentie betekent lagere straffen
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Geleerde aanpassingen toepassen vanuit prestatiegeschiedenis
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Eenvoudige adaptieve logica - kan worden verbeterd met meer geavanceerde algoritmes
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Alleen recente geschiedenis meenemen
    
    if (relevantHistory.length > 0) {
      // Gemiddelde prestatie scores berekenen
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Als prestatie onder drempel ligt, parameters aanpassen
      if (avgScore < 0.7) {
        // Kleine aanpassing richting veiligere waarden
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Prestatie vastleggen voor toekomstige aanpassingen
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 beoordeling van de kwaliteit van de reactie
    });
    
    // Historiegrootte beperken
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Geoptimaliseerde samplingparameters ophalen
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Verzoek verzenden met geoptimaliseerde parameters
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Als gebruiker feedback geeft, vastleggen voor toekomstige optimalisatie
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// Voorbeeld gebruik
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Creatieve taak met aangepaste gebruikersvoorkeuren
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Hoge creativiteit (1-10)
          consistency: 3  // Lage consistentie (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Codegeneratietaak
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Lage creativiteit
          precision: 8,   // Hoge precisie
          consistency: 9  // Hoge consistentie
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

In bovenstaande code hebben we:

- Een `AdaptiveSamplingManager` klasse gemaakt die dynamische sampling beheert op basis van taaktype en gebruikersvoorkeuren.
- Samplingprofielen gedefinieerd voor verschillende taaktypes (creatief, feitelijk, code, conversatie).
- Een methode geïmplementeerd die het taaktype uit de prompt detecteert via eenvoudige heuristieken.
- Samplingparameters berekend op basis van het gedetecteerde taaktype en gebruikersvoorkeuren.
- Toegepaste aanpassingen op basis van geleerde prestaties om samplingparameters te optimaliseren.
- Prestaties vastgelegd voor toekomstige aanpassingen, zodat het systeem kan leren van eerdere interacties.
- Verzoeken verzonden met dynamisch geconfigureerde samplingparameters en de gegenereerde tekst geretourneerd met toegepaste parameters en gedetecteerd taaktype.
- Gebruikt:
    - `userPreferences` om aanpassing van samplingparameters mogelijk te maken op basis van door de gebruiker gedefinieerde creativiteits-, precisie- en consistentieniveaus.
    - `detectTaskType` om de aard van de taak op basis van de prompt te bepalen, zodat passende samplingstrategieën toegepast worden voor verschillende soorten verzoeken.
    - `recordPerformance` om de prestaties van gegenereerde reacties te registreren, zodat het systeem zich in de tijd kan aanpassen en verbeteren.
    - `applyLearnedAdjustments` om samplingparameters aan te passen op basis van historische prestaties, waardoor het vermogen van het model om kwalitatief hoogstaande reacties te genereren wordt verbeterd.
    - `generateResponse` voor het encapsuleren van het gehele proces van een antwoord genereren met adaptieve sampling, zodat het eenvoudig kan worden aangeroepen met verschillende prompts en contexten.
    - `allowedTools` om te specificeren welke tools het model tijdens generatie mag gebruiken, voor meer contextbewuste reacties.
    - `feedbackScore` om gebruikers feedback te laten geven op de kwaliteit van de gegenereerde reactie, wat gebruikt kan worden om de modelprestaties verder te verfijnen in de tijd.
    - `performanceHistory` om een geschiedenis van eerdere interacties bij te houden, zodat het systeem kan leren van eerdere successen en mislukkingen.
    - `getSamplingParameters` om samplingparameters dynamisch aan te passen op basis van de context van het verzoek, waardoor flexibelere en responsievere modelgedrag mogelijk wordt.
    - `detectTaskType` om de taak te classificeren op basis van de prompt, waardoor passend samplingstrategieën toegepast kunnen worden voor verschillende soorten verzoeken.
    - `samplingProfiles` om basis samplingconfiguraties te definiëren voor verschillende taaktypes, wat snelle aanpassingen mogelijk maakt afhankelijk van de aard van het verzoek.

---

## Wat nu

- [5.7 Schalen](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->