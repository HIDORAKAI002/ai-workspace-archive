> [FÖRÅLDRAD: 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Sampling i Model Context Protocol

> **Nedläggningsmeddelande:** MCP-specifikationsreleasekandidaten `2026-07-28` markerar Sampling som föråldrad till förmån för direkt integration med LLM-leverantörernas API:er. Sampling fortsätter att fungera i `2025-11-25` och åtminstone ett år efter någon formell nedläggning, så allt i denna lektion förblir giltigt – men nya serverdesigner bör utvärdera ersättningsmönstret. Se [Vad som ändras i MCP: Releasekandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Sampling är en kraftfull MCP-funktion som låter servrar begära LLM-kompletteringar via klienten, vilket möjliggör sofistikerade agentliknande beteenden samtidigt som säkerhet och integritet bibehålls. Rätt samplingkonfiguration kan dramatiskt förbättra svarskvaliteten och prestandan. MCP erbjuder ett standardiserat sätt att kontrollera hur modeller genererar text med specifika parametrar som påverkar slumpmässighet, kreativitet och sammanhållning.

## Introduktion

I denna lektion ska vi utforska hur man konfigurerar samplingparametrar i MCP-förfrågningar och förstå den underliggande protokollmekaniken för sampling.

## Lärandemål

I slutet av denna lektion kommer du att kunna:

- Förstå de viktigaste samplingparametrarna som finns i MCP.
- Konfigurera samplingparametrar för olika användningsfall.
- Implementera deterministisk sampling för reproducerbara resultat.
- Dynamiskt justera samplingparametrar baserat på kontext och användarpreferenser.
- Tillämpa samplingstrategier för att förbättra modellens prestanda i olika scenarier.
- Förstå hur sampling fungerar i klient-server-flödet i MCP.

## Hur sampling fungerar i MCP

Samplingflödet i MCP följer dessa steg:

1. Server skickar en `sampling/createMessage`-förfrågan till klienten
2. Klienten granskar förfrågan och kan modifiera den
3. Klienten tar ett urval från en LLM
4. Klienten granskar resultatet
5. Klienten returnerar resultatet till servern

Denna design med mänsklig medverkan säkerställer att användare behåller kontrollen över vad LLM ser och genererar.

## Översikt över samplingparametrar

MCP definierar följande samplingparametrar som kan konfigureras i klientförfrågningar:

| Parameter | Beskrivning | Typiskt intervall |
|-----------|-------------|---------------|
| `temperature` | Styr slumpmässighet i tokenval | 0.0 - 1.0 |
| `maxTokens` | Max antal tokens att generera | Heltalsvärde |
| `stopSequences` | Anpassade sekvenser som stoppar generering när de påträffas | Array av strängar |
| `metadata` | Ytterligare leverantörsspecifika parametrar | JSON-objekt |

Många LLM-leverantörer stöder ytterligare parametrar via fältet `metadata`, som kan inkludera:

| Vanlig extensionsparameter | Beskrivning | Typiskt intervall |
|-----------|-------------|---------------|
| `top_p` | Nucleus-sampling – begränsar tokens till topp kumulativ sannolikhet | 0.0 - 1.0 |
| `top_k` | Begränsar tokenval till topp K alternativ | 1 - 100 |
| `presence_penalty` | Straffar tokens baserat på deras närvaro i texten hittills | -2.0 - 2.0 |
| `frequency_penalty` | Straffar tokens baserat på deras frekvens i texten hittills | -2.0 - 2.0 |
| `seed` | Specifik slumptalsfrö för reproducerbara resultat | Heltalsvärde |

## Exempel på förfrågningsformat

Här är ett exempel på att begära sampling från en klient i MCP:

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

## Svarsformat

Klienten returnerar ett slutförandresultat:

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

## Mänsklig kontroll i flödet

MCP-sampling är utformad med mänsklig övervakning i åtanke:

- **För promptar**:
  - Klienter bör visa användarna den föreslagna prompten
  - Användare bör kunna ändra eller avvisa promptar
  - Systempromptar kan filtreras eller modifieras
  - Kontextinkludering styrs av klienten

- **För fullbordanden**:
  - Klienter bör visa användarna fullbordandet
  - Användare bör kunna ändra eller avvisa fullbordanden
  - Klienter kan filtrera eller modifiera fullbordanden
  - Användarna kontrollerar vilken modell som används

Med dessa principer i åtanke, låt oss titta på hur sampling implementeras i olika programmeringsspråk med fokus på parametrarna som vanligtvis stöds av LLM-leverantörer.

## Säkerhetsöverväganden

Vid implementering av sampling i MCP, beakta dessa säkerhetsbästa praxis:

- **Validera allt meddelandeinnehåll** innan det skickas till klienten
- **Sanera känslig information** från promptar och fullbordanden
- **Implementera begränsningar för antal förfrågningar** för att förhindra missbruk
- **Övervaka samplinganvändning** för ovanliga mönster
- **Kryptera data i transit** med säkra protokoll
- **Hantera användardataintegritet** enligt tillämpliga regler
- **Granska samplingförfrågningar** för efterlevnad och säkerhet
- **Kontrollera kostnadsexponering** med lämpliga begränsningar
- **Implementera tidsgränser** för samplingförfrågningar
- **Hantera modellfel smidigt** med lämpliga fallbacks

Samplingparametrar tillåter finjustering av språkmodellers beteende för att uppnå önskad balans mellan deterministiska och kreativa utdata.

Låt oss titta på hur man konfigurerar dessa parametrar i olika programmeringsspråk.

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

I föregående kod har vi:

- Skapat en MCP-klient med en specifik server-URL.
- Konfigurerat en förfrågan med samplingparametrar som `temperature`, `top_p` och `top_k`.
- Skickat förfrågan och skrivit ut den genererade texten.
- Använt:
    - `allowedTools` för att specificera vilka verktyg modellen kan använda under generering. I detta fall tillät vi verktygen `ideaGenerator` och `marketAnalyzer` för att hjälpa till att skapa kreativa appidéer.
    - `frequencyPenalty` och `presencePenalty` för att kontrollera upprepning och mångfald i utdata.
    - `temperature` för att styra slumpmässigheten i utdata, där högre värden leder till mer kreativa svar.
    - `top_p` för att begränsa val av tokens till de som bidrar till den övre kumulativa sannolikhetsmassan, vilket förbättrar kvaliteten på genererad text.
    - `top_k` för att begränsa modellen till de topp K mest sannolika tokens, vilket kan hjälpa till att generera mer sammanhängande svar.
    - `frequencyPenalty` och `presencePenalty` för att minska upprepning och uppmuntra mångfald i den genererade texten.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript Exempel: Temperatur- och Top-P provtagningskonfiguration
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Initiera MCP-klienten
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigurera förfrågan med olika provtagningsparametrar
  const creativeSampling = {
    temperature: 0.9,    // Högre temperatur = mer slumpmässighet/kreativitet
    topP: 0.92,          // Beakta token med topp 92% sannolikhetsmassa
    frequencyPenalty: 0.6, // Minska upprepning av tokensekvenser
    presencePenalty: 0.4   // Straffa token som har förekommit i texten hittills
  };
  
  const factualSampling = {
    temperature: 0.2,    // Lägre temperatur = mer deterministisk/faktabaserad
    topP: 0.85,          // Lite mer fokuserat tokenval
    frequencyPenalty: 0.2, // Minimal upprepningsstraff
    presencePenalty: 0.1   // Minimal närvarostraff
  };
  
  try {
    // Skicka två förfrågningar med olika provtagningskonfigurationer
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

I föregående kod har vi:

- Initierat en MCP-klient med server-URL och API-nyckel.
- Konfigurerat två uppsättningar samplingparametrar: en för kreativa uppgifter och en annan för faktabaserade uppgifter.
- Skickat förfrågningar med dessa konfigurationer, vilket tillåter modellen att använda specifika verktyg för varje uppgift.
- Skrivit ut de genererade svaren för att demonstrera effekterna av olika samplingparametrar.
- Använt `allowedTools` för att specificera vilka verktyg modellen kan använda under generering. Här tillät vi `ideaGenerator` och `environmentalImpactTool` för kreativa uppgifter, samt `factChecker` och `dataAnalysisTool` för faktabaserade uppgifter.
- Använt `temperature` för att kontrollera slumpmässigheten i utdata, där högre värden leder till mer kreativa svar.
- Använt `top_p` för att begränsa val av tokens till de som bidrar till den övre kumulativa sannolikhetsmassan, vilket förbättrar kvaliteten på genererad text.
- Använt `frequencyPenalty` och `presencePenalty` för att minska upprepning och uppmuntra mångfald i utdata.
- Använt `top_k` för att begränsa modellen till de topp K mest sannolika tokens, vilket kan hjälpa till att generera mer sammanhängande svar.

---

## Deterministisk Sampling

För applikationer som kräver konsekventa utdata säkerställer deterministisk sampling reproducerbara resultat. Hur det görs är genom att använda ett fast slumptalsfrö och sätta temperaturen till noll.

Låt oss titta på ett exempel som demonstrerar deterministisk sampling i olika programmeringsspråk.

# [Java](#tab/java)

```java
// Java-exempel: Deterministiska svar med fast seed
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Använder ett fast seed för deterministiska resultat
        
        // Första förfrågan med fast seed
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Noll temperatur för maximal determinism
            .build();
            
        // Andra förfrågan med samma seed
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Kör båda förfrågningarna
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Svaren bör vara identiska på grund av samma seed och temperatur=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

I föregående kod har vi:

- Skapat en MCP-klient med en angiven server-URL.
- Konfigurerat två förfrågningar med samma prompt, fast frö och noll temperatur.
- Skickat båda förfrågningarna och skrivit ut den genererade texten.
- Visat att svaren är identiska på grund av samplingskonfigurationens deterministiska natur (samma frö och temperatur).
- Använt `setSeed` för att specificera ett fast slumptalsfrö, vilket säkerställer att modellen genererar samma output för samma input varje gång.
- Satt `temperature` till noll för att säkerställa maximal determinism, vilket betyder att modellen alltid väljer den mest sannolika nästa token utan slumpmässighet.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript Exempel: Deterministiska svar med fröstyrning
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Första förfrågan med fast frö
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Noll temperatur för maximal determinism
    });
    
    // Andra förfrågan med samma frö och temperatur
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Tredje förfrågan med annat frö men samma temperatur
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

I föregående kod har vi:

- Initierat en MCP-klient med server-URL.
- Konfigurerat två förfrågningar med samma prompt, fast frö och noll temperatur.
- Skickat båda förfrågningarna och skrivit ut den genererade texten.
- Visat att svaren är identiska på grund av samplingskonfigurationens deterministiska natur (samma frö och temperatur).
- Använt `seed` för att specificera ett fast slumptalsfrö, vilket säkerställer att modellen genererar samma output för samma input varje gång.
- Satt `temperature` till noll för att säkerställa maximal determinism, vilket betyder att modellen alltid väljer den mest sannolika nästa token utan slumpmässighet.
- Använt ett annat frö för den tredje förfrågan för att visa att ändring av fröet resulterar i olika utdata, även med samma prompt och temperatur.

---

## Dynamisk Samplingkonfiguration

Intelligent sampling anpassar parametrar baserat på kontexten och kraven för varje förfrågan. Det innebär att dynamiskt justera parametrar som temperature, top_p och straffar baserat på uppgiftstyp, användarpreferenser eller historisk prestanda.

Låt oss titta på hur man implementerar dynamisk sampling i olika programmeringsspråk.

# [Python](#tab/python)

```python
# Python Exempel: Dynamisk provtagning baserat på förfrågningskontext
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definiera provtagningspresetter för olika uppgiftstyper
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Välj grundpreset
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Justera baserat på användarpreferenser om angivet
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skala temperatur baserat på kreativitetspreferens (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Justera top_p baserat på önskad svarsmångfald
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Skapa och skicka förfrågan med anpassade provtagningsparametrar
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Returnera svar med provtagningsmetadata för transparens
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

I föregående kod har vi:

- Skapat en klass `DynamicSamplingService` som hanterar adaptiv sampling.
- Definierat samplinginställningar för olika uppgiftstyper (kreativ, faktabaserad, kod, analytisk).
- Valde en grundläggande samplinginställning baserat på uppgiftstyp.
- Justerade samplingparametrar baserat på användarpreferenser, som kreativitet och mångfald.
- Skickade förfrågan med de dynamiskt konfigurerade samplingparametrarna.
- Returnerade den genererade texten tillsammans med tillämpade samplingparametrar och uppgiftstyp för transparens.
- Använt `temperature` för att styra slumpmässigheten i utdata, där högre värden leder till mer kreativa svar.
- Använt `top_p` för att begränsa val av tokens till de som bidrar till den övre kumulativa sannolikhetsmassan, vilket förbättrar kvaliteten på genererad text.
- Använt `frequency_penalty` för att minska upprepning och uppmuntra mångfald i utdata.
- Använt `user_preferences` för att tillåta anpassning av samplingparametrar baserat på användardefinierade nivåer av kreativitet och mångfald.
- Använt `task_type` för att bestämma lämplig samplingstrategi för förfrågan, vilket möjliggör mer skräddarsydda svar beroende på uppgiftens natur.
- Använt `send_request`-metoden för att skicka prompten med konfigurerade samplingparametrar, vilket säkerställer att modellen genererar text enligt angivna krav.
- Använt `generated_text` för att hämta modellens svar, som sedan returneras tillsammans med samplingparametrar och uppgiftstyp för vidare analys eller visning.
- Använt `min` och `max`-funktioner för att säkerställa att användarpreferenser begränsas inom giltiga intervall, för att undvika ogiltiga samplingkonfigurationer.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript-exempel: Dynamisk provtagningskonfiguration baserad på användarkontext
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Definiera grundläggande provtagningsprofiler
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Spåra historisk prestanda
    this.performanceHistory = [];
  }
  
  // Identifiera uppgiftstyp från prompt
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Enkel heuristisk detektion - kan förbättras med ML-klassificering
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
    
    // Standard till konversationell om ingen tydlig typ upptäcks
    return 'conversational';
  }
  
  // Beräkna provtagningsparametrar baserat på kontext och användarpreferenser
  getSamplingParameters(prompt, context = {}) {
    // Identifiera typ av uppgift
    const taskType = this.detectTaskType(prompt, context);
    
    // Hämta grundprofil
    let params = {...this.samplingProfiles[taskType]};
    
    // Justera baserat på användarpreferenser
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Skala från 1-10 till lämpligt temperaturområde
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Högre precision innebär lägre topP (mer fokuserat urval)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Högre konsekvens innebär lägre straff
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Tillämpa inlärda justeringar från prestandahistorik
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Enkel adaptiv logik - kan förbättras med mer avancerade algoritmer
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Beakta endast senaste historik
    
    if (relevantHistory.length > 0) {
      // Beräkna genomsnittliga prestandapoäng
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Om prestanda ligger under tröskeln, justera parametrar
      if (avgScore < 0.7) {
        // Liten justering mot säkrare värden
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Registrera prestanda för framtida justeringar
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 betyg av svarskvalitet
    });
    
    // Begränsa historikstorlek
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Hämta optimerade provtagningsparametrar
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Skicka förfrågan med optimerade parametrar
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Om användaren ger feedback, registrera den för framtida optimering
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

// Exempel på användning
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreativ uppgift med anpassade användarpreferenser
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Hög kreativitet (1-10)
          consistency: 3  // Låg konsekvens (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Kodgenereringsuppgift
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Låg kreativitet
          precision: 8,   // Hög precision
          consistency: 9  // Hög konsekvens
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

I föregående kod har vi:

- Skapat en klass `AdaptiveSamplingManager` som hanterar dynamisk sampling baserat på uppgiftstyp och användarpreferenser.
- Definierat samplingprofiler för olika uppgiftstyper (kreativ, faktabaserad, kod, konversationell).
- Implementerat en metod för att detektera uppgiftstyp från prompten med enkla heuristiker.
- Beräknat samplingparametrar baserat på upptäckt uppgiftstyp och användarpreferenser.
- Tillämpat inlärda justeringar baserat på historisk prestanda för att optimera samplingparametrarna.
- Registrerat prestanda för framtida justeringar, vilket gör att systemet kan lära från tidigare interaktioner.
- Skickat förfrågningar med dynamiskt konfigurerade samplingparametrar och returnerat genererad text tillsammans med tillämpade parametrar och upptäckt uppgiftstyp.
- Använt:
    - `userPreferences` för att tillåta anpassning av samplingparametrar baserat på användardefinierade nivåer av kreativitet, precision och konsekvens.
    - `detectTaskType` för att bestämma uppgiftens natur baserat på prompten, vilket möjliggör mer skräddarsydda svar.
    - `recordPerformance` för att logga prestanda för genererade svar, vilket gör att systemet kan anpassa sig och förbättras över tid.
    - `applyLearnedAdjustments` för att modifiera samplingparametrar baserat på historisk prestanda, vilket förbättrar modellens förmåga att generera högkvalitativa svar.
    - `generateResponse` för att kapsla in hela processen att generera ett svar med adaptiv sampling, vilket gör det enkelt att anropa med olika prompts och kontexter.
    - `allowedTools` för att specificera vilka verktyg modellen kan använda under generering, vilket möjliggör mer kontextmedvetna svar.
    - `feedbackScore` för att låta användare ge feedback på kvaliteten på det genererade svaret, vilket kan användas för att ytterligare förbättra modellens prestanda över tid.
    - `performanceHistory` för att bevara en historik av tidigare interaktioner, vilket gör att systemet kan lära av tidigare framgångar och misslyckanden.
    - `getSamplingParameters` för att dynamiskt justera samplingparametrar baserat på förfrågans kontext, vilket möjliggör ett mer flexibelt och responsivt modellbeteende.
    - `detectTaskType` för att klassificera uppgiften baserat på prompten, vilket möjliggör att systemet kan tillämpa lämpliga samplingstrategier för olika typer av förfrågningar.
    - `samplingProfiles` för att definiera grundläggande samplingkonfigurationer för olika uppgiftstyper, vilket möjliggör snabba justeringar baserat på förfrågans natur.

---

## Vad är nästa steg

- [5.7 Skalning](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->