> [FORÆLDET: 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Sampling i Model Context Protocol

> **Forældelsesmeddelelse:** MCP-specifikationsreleasekandidaten `2026-07-28` markerer Sampling som forældet til fordel for direkte integration med LLM-udbyder-API'er. Sampling fortsætter med at fungere i `2025-11-25` og mindst et år efter enhver formel forældelse, så alt i denne lektion forbliver gyldigt - men nye serverdesigns bør evaluere erstatningsmønstret. Se [Hvad ændres i MCP: Releasekandidaten 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Sampling er en kraftfuld MCP-funktion, der tillader servere at anmode om LLM-fuldførelser gennem klienten, hvilket muliggør sofistikerede agentiske adfærdsmønstre samtidig med at sikkerhed og privatliv opretholdes. Den rette samplingkonfiguration kan dramatisk forbedre responskvalitet og ydeevne. MCP tilbyder en standardiseret måde at kontrollere, hvordan modeller genererer tekst med specifikke parametre, der påvirker tilfældighed, kreativitet og sammenhæng.

## Introduktion

I denne lektion vil vi udforske, hvordan man konfigurerer samplingparametre i MCP-anmodninger og forstå de underliggende protokolmekanismer for sampling.

## Læringsmål

Ved slutningen af denne lektion vil du kunne:

- Forstå de vigtigste samplingparametre, der er tilgængelige i MCP.
- Konfigurere samplingparametre til forskellige anvendelsestilfælde.
- Implementere deterministisk sampling for reproducerbare resultater.
- Dynamisk justere samplingparametre baseret på kontekst og brugerpræferencer.
- Anvende samplingstrategier til at forbedre modelpræstation i forskellige scenarier.
- Forstå, hvordan sampling fungerer i klient-server-flowet i MCP.

## Hvordan Sampling Fungerer i MCP

Sampling-flowet i MCP følger disse trin:

1. Server sender en `sampling/createMessage`-anmodning til klienten
2. Klienten gennemgår anmodningen og kan ændre den
3. Klienten sampler fra en LLM
4. Klienten gennemgår fuldførelsen
5. Klienten returnerer resultatet til serveren

Dette design med menneskelig involvering sikrer, at brugerne bevarer kontrol over, hvad LLM'en ser og genererer.

## Oversigt over Samplingparametre

MCP definerer følgende samplingparametre, som kan konfigureres i klientanmodninger:

| Parameter | Beskrivelse | Typisk Interval |
|-----------|-------------|----------------|
| `temperature` | Kontrollerer tilfældighed i tokenvalg | 0.0 - 1.0 |
| `maxTokens` | Maksimalt antal tokens, der skal genereres | Heltal |
| `stopSequences` | Tilpassede sekvenser, der stopper generering ved møde | Array af strenge |
| `metadata` | Yderligere udbyderspecifikke parametre | JSON-objekt |

Mange LLM-udbydere understøtter yderligere parametre gennem `metadata`-feltet, som kan inkludere:

| Almindeligt Udvidelsesparameter | Beskrivelse | Typisk Interval |
|-----------|-------------|----------------|
| `top_p` | Nucleus sampling - begrænser tokens til top kumulativ sandsynlighed | 0.0 - 1.0 |
| `top_k` | Begrænser tokenvalg til top K muligheder | 1 - 100 |
| `presence_penalty` | Straffer tokens baseret på deres tilstedeværelse i teksten indtil nu | -2.0 - 2.0 |
| `frequency_penalty` | Straffer tokens baseret på deres frekvens i teksten indtil nu | -2.0 - 2.0 |
| `seed` | Specifik tilfældig seed for reproducerbare resultater | Heltal |

## Eksempel på Anmodningsformat

Her er et eksempel på at anmode om sampling fra en klient i MCP:

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

## Svarformat

Klienten returnerer et fuldførelsesresultat:

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

## Menneskelig Kontrol i Loop

MCP-sampling er designet med menneskelig overvågning for øje:

- **For prompts**:
  - Klienter bør vise brugerne den foreslåede prompt
  - Brugere bør kunne ændre eller afvise prompts
  - Systemprompts kan filtreres eller ændres
  - Inklusion af kontekst styres af klienten

- **For fuldførelser**:
  - Klienter bør vise brugerne fuldførelsen
  - Brugere bør kunne ændre eller afvise fuldførelser
  - Klienter kan filtrere eller ændre fuldførelser
  - Brugere kontrollerer, hvilken model der bruges

Med disse principper i tankerne, lad os se på, hvordan sampling implementeres i forskellige programmeringssprog med fokus på parametrene, som almindeligvis understøttes på tværs af LLM-udbydere.

## Sikkerhedsovervejelser

Når sampling implementeres i MCP, bør følgende sikkerhedspraksisser overvejes:

- **Valider alt beskedindhold** før det sendes til klienten
- **Rens følsomme oplysninger** fra prompts og fuldførelser
- **Implementer hastighedsbegrænsninger** for at forhindre misbrug
- **Overvåg samplingbrug** for usædvanlige mønstre
- **Krypter data under overførsel** med sikre protokoller
- **Håndter brugerdata-privatliv** i overensstemmelse med relevante regler
- **Revider samplinganmodninger** for overholdelse og sikkerhed
- **Kontroller omkostningseksponering** med passende grænser
- **Implementer timeout** for samplinganmodninger
- **Håndter model-fejl yndefuldt** med passende fallback-løsninger

Samplingparametre tillader finjustering af sprogmodellers adfærd for at opnå den ønskede balance mellem deterministiske og kreative output.

Lad os se på, hvordan man konfigurerer disse parametre i forskellige programmeringssprog.

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

I den foregående kode har vi:

- Oprettet en MCP-klient med en specifik server-URL.
- Konfigureret en anmodning med samplingparametre som `temperature`, `top_p` og `top_k`.
- Sendt anmodningen og udskrevet den genererede tekst.
- Brugte:
    - `allowedTools` til at specificere, hvilke værktøjer modellen kan bruge under generering. I dette tilfælde tillod vi `ideaGenerator` og `marketAnalyzer` til at hjælpe med at generere kreative appidéer.
    - `frequencyPenalty` og `presencePenalty` til at kontrollere gentagelse og diversitet i outputtet.
    - `temperature` til at kontrollere tilfældigheden i outputtet, hvor højere værdier fører til mere kreative svar.
    - `top_p` til at begrænse valg af tokens til dem, der bidrager til den højeste kumulative sandsynlighed, hvilket forbedrer kvaliteten af genereret tekst.
    - `top_k` til at begrænse modellen til de top K mest sandsynlige tokens, hvilket kan hjælpe med at generere mere sammenhængende svar.
    - `frequencyPenalty` og `presencePenalty` til at reducere gentagelse og opmuntre diversitet i den genererede tekst.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript-eksempel: Temperatur- og Top-P-samplekonfiguration
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Initialiser MCP-klienten
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigurer forespørgsel med forskellige sampleparametre
  const creativeSampling = {
    temperature: 0.9,    // Højere temperatur = mere tilfældighed/kreativitet
    topP: 0.92,          // Overvej tokens med top 92 % sandsynlighedsmængde
    frequencyPenalty: 0.6, // Reducer gentagelse af tokensekvenser
    presencePenalty: 0.4   // Straf tokens, der tidligere er optrådt i teksten
  };
  
  const factualSampling = {
    temperature: 0.2,    // Lavere temperatur = mere deterministisk/faktuel
    topP: 0.85,          // En smule mere fokuseret tokenvalg
    frequencyPenalty: 0.2, // Minimal gentagelsesstraf
    presencePenalty: 0.1   // Minimal tilstedeværelsesstraf
  };
  
  try {
    // Send to forespørgsler med forskellige samplekonfigurationer
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

I den foregående kode har vi:

- Initialiseret en MCP-klient med en server-URL og API-nøgle.
- Konfigureret to sæt samplingparametre: ét til kreative opgaver og ét til faktuelle opgaver.
- Sendt anmodninger med disse konfigurationer, hvilket tillader modellen at bruge specifikke værktøjer til hver opgave.
- Udskrevet de genererede svar for at demonstrere effekterne af forskellige samplingparametre.
- Brugte `allowedTools` til at specificere, hvilke værktøjer modellen kan bruge under generering. I dette tilfælde tillod vi `ideaGenerator` og `environmentalImpactTool` til kreative opgaver, og `factChecker` og `dataAnalysisTool` til faktuelle opgaver.
- Brugte `temperature` til at kontrollere tilfældigheden i outputtet, hvor højere værdier fører til mere kreative svar.
- Brugte `top_p` til at begrænse valg af tokens til dem, der bidrager til den højeste kumulative sandsynlighed, hvilket forbedrer kvaliteten af genereret tekst.
- Brugte `frequencyPenalty` og `presencePenalty` til at reducere gentagelse og opmuntre diversitet i outputtet.
- Brugte `top_k` til at begrænse modellen til de top K mest sandsynlige tokens, hvilket kan hjælpe med at generere mere sammenhængende svar.

---

## Deterministisk Sampling

For applikationer, der kræver konsistente output, sikrer deterministisk sampling reproducerbare resultater. Det gør den ved at bruge en fast tilfældig seed og sætte temperaturen til nul.

Lad os se på et eksempel nedenfor, der demonstrerer deterministisk sampling i forskellige programmeringssprog.

# [Java](#tab/java)

```java
// Java Eksempel: Deterministiske svar med fast seed
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Brug af et fast seed for deterministiske resultater
        
        // Første forespørgsel med fast seed
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nultemperatur for maksimal determinisme
            .build();
            
        // Anden forespørgsel med samme seed
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Udfør begge forespørgsler
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Svarene bør være identiske på grund af samme seed og temperatur=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

I den foregående kode har vi:

- Oprettet en MCP-klient med en specificeret server-URL.
- Konfigureret to anmodninger med samme prompt, fast seed og nul temperatur.
- Sendt begge anmodninger og udskrevet den genererede tekst.
- Demonstreret, at svarene er identiske på grund af samplingkonfigurationens deterministiske natur (samme seed og temperatur).
- Brugte `setSeed` til at specificere en fast tilfældig seed, hvilket sikrer, at modellen genererer samme output for samme input hver gang.
- Satte `temperature` til nul for at sikre maksimal determinisme, hvilket betyder, at modellen altid vælger den mest sandsynlige næste token uden tilfældighed.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript-eksempel: Deterministiske svar med kontrol over seed
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Første forespørgsel med fast seed
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Temperatur nul for maksimal determinisme
    });
    
    // Anden forespørgsel med samme seed og temperatur
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Tredje forespørgsel med forskelligt seed, men samme temperatur
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

I den foregående kode har vi:

- Initialiseret en MCP-klient med en server-URL.
- Konfigureret to anmodninger med samme prompt, fast seed og nul temperatur.
- Sendt begge anmodninger og udskrevet den genererede tekst.
- Demonstreret, at svarene er identiske på grund af samplingkonfigurationens deterministiske natur (samme seed og temperatur).
- Brugte `seed` til at specificere en fast tilfældig seed, hvilket sikrer, at modellen genererer samme output for samme input hver gang.
- Satte `temperature` til nul for at sikre maksimal determinisme, hvilket betyder, at modellen altid vælger den mest sandsynlige næste token uden tilfældighed.
- Brugte en anden seed til den tredje anmodning for at vise, at ændring af seed resulterer i forskellige output, selv med samme prompt og temperatur.

---

## Dynamisk Samplingkonfiguration

Intelligent sampling tilpasser parametre baseret på konteksten og kravene i hver anmodning. Det betyder dynamisk justering af parametre som temperatur, top_p og straffe baseret på opgavetype, brugerpræferencer eller historisk ydeevne.

Lad os se på, hvordan man implementerer dynamisk sampling i forskellige programmeringssprog.

# [Python](#tab/python)

```python
# Python Eksempel: Dynamisk prøveudtagning baseret på anmodningskontekst
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definer prøveudtagningsforudindstillinger for forskellige opgavetyper
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Vælg basisforudindstilling
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Juster baseret på brugerpræferencer, hvis angivet
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skaler temperatur baseret på kreativitetspreference (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Juster top_p baseret på ønsket svardiversitet
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Opret og send anmodning med brugerdefinerede prøveudtagningsparametre
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Returner svar med prøveudtagningsmetadata for gennemsigtighed
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

I den foregående kode har vi:

- Oprettet en `DynamicSamplingService`-klasse, der håndterer adaptiv sampling.
- Defineret sampling-forudindstillinger for forskellige opgavetyper (kreativ, faktuel, kode, analytisk).
- Valgt en basis sampling-forudindstilling baseret på opgavetypen.
- Justeret samplingparametre baseret på brugerpræferencer, såsom kreativt niveau og diversitet.
- Sendt anmodningen med de dynamisk konfigurerede samplingparametre.
- Returneret den genererede tekst sammen med de anvendte samplingparametre og opgavetype for gennemsigtighed.
- Brugte `temperature` til at kontrollere tilfældigheden i outputtet, hvor højere værdier fører til mere kreative svar.
- Brugte `top_p` til at begrænse valg af tokens til dem, der bidrager til den højeste kumulative sandsynlighed, hvilket forbedrer kvaliteten af genereret tekst.
- Brugte `frequency_penalty` til at reducere gentagelse og opmuntre diversitet i outputtet.
- Brugte `user_preferences` til at tillade tilpasning af samplingparametre baseret på brugerdefinerede niveauer af kreativitet og diversitet.
- Brugte `task_type` til at bestemme den passende samplingstrategi for anmodningen, hvilket tillader mere skræddersyede svar baseret på opgavens art.
- Brugte `send_request`-metoden til at sende prompten med de konfigurerede samplingparametre, hvilket sikrer, at modellen genererer tekst i henhold til de specificerede krav.
- Brugte `generated_text` til at hente modellens svar, som derefter returneres sammen med samplingparametre og opgavetype til yderligere analyse eller visning.
- Brugte `min` og `max` funktioner til at sikre, at brugerpræferencer er spændt inden for gyldige intervaller, hvilket forhindrer ugyldige samplingkonfigurationer.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript-eksempel: Dynamisk prøveudtagningskonfiguration baseret på brugerkontekst
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Definer grundlæggende prøveudtagningsprofiler
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Spor historisk ydeevne
    this.performanceHistory = [];
  }
  
  // Registrer opgavetype fra prompt
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Enkel heuristisk detektion - kan forbedres med ML-klassificering
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
    
    // Standard til samtale, hvis ingen klar type opdages
    return 'conversational';
  }
  
  // Beregn prøveudtagningsparametre baseret på kontekst og brugerpræferencer
  getSamplingParameters(prompt, context = {}) {
    // Registrer typen af opgave
    const taskType = this.detectTaskType(prompt, context);
    
    // Hent grundprofil
    let params = {...this.samplingProfiles[taskType]};
    
    // Juster baseret på brugerpræferencer
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Skaler fra 1-10 til passende temperaturinterval
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Højere præcision betyder lavere topP (mere fokuseret udvælgelse)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Højere konsistens betyder lavere sanktioner
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Anvend lærte justeringer fra ydeevnehistorik
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Enkel adaptiv logik - kan forbedres med mere sofistikerede algoritmer
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Overvej kun nylig historik
    
    if (relevantHistory.length > 0) {
      // Beregn gennemsnitlige præstationsscore
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Hvis ydeevnen er under tærskel, juster parametrene
      if (avgScore < 0.7) {
        // Let justering mod sikrere værdier
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Registrer ydeevne til fremtidige justeringer
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 vurdering af responsens kvalitet
    });
    
    // Begræns historiestørrelse
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Hent optimerede prøveudtagningsparametre
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Send forespørgsel med optimerede parametre
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Hvis brugeren giver feedback, registrer det til fremtidig optimering
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

// Eksempel på brug
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreativ opgave med brugerdefinerede præferencer
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Høj kreativitet (1-10)
          consistency: 3  // Lav konsistens (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Kodegenereringsopgave
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Lav kreativitet
          precision: 8,   // Høj præcision
          consistency: 9  // Høj konsistens
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

I den foregående kode har vi:

- Oprettet en `AdaptiveSamplingManager`-klasse, der håndterer dynamisk sampling baseret på opgavetype og brugerpræferencer.
- Defineret samplingprofiler for forskellige opgavetyper (kreativ, faktuel, kode, samtale).
- Implementeret en metode til at opdage opgavetypen fra prompten ved hjælp af simple heuristikker.
- Beregnet samplingparametre baseret på den opdagede opgavetype og brugerpræferencer.
- Anvendt lærte justeringer baseret på historisk ydeevne for at optimere samplingparametre.
- Registreret ydeevne til fremtidige justeringer, hvilket tillader systemet at lære af tidligere interaktioner.
- Sendt anmodninger med dynamisk konfigurerede samplingparametre og returneret den genererede tekst sammen med anvendte parametre og opdaget opgavetype.
- Brugte:
    - `userPreferences` til at tillade tilpasning af samplingparametre baseret på brugerdefinerede niveauer af kreativitet, præcision og konsistens.
    - `detectTaskType` til at bestemme opgavens art baseret på prompten, hvilket muliggør mere skræddersyede svar.
    - `recordPerformance` til at logge ydeevnen af genererede svar, hvilket giver systemet mulighed for at tilpasse og forbedre sig over tid.
    - `applyLearnedAdjustments` til at ændre samplingparametre baseret på historisk ydeevne, hvilket forbedrer modellens evne til at generere svar af høj kvalitet.
    - `generateResponse` til at omslutte hele processen af at generere et svar med adaptiv sampling, hvilket gør det nemt at kalde med forskellige prompts og kontekster.
    - `allowedTools` til at specificere, hvilke værktøjer modellen kan bruge under generering, hvilket muliggør mere kontekstbevidste svar.
    - `feedbackScore` til at tillade brugere at give feedback på kvaliteten af det genererede svar, som kan bruges til yderligere at forbedre modellens ydeevne over tid.
    - `performanceHistory` til at opretholde en registrering af tidligere interaktioner, hvilket gør det muligt for systemet at lære af tidligere succeser og fejl.
    - `getSamplingParameters` til dynamisk at justere samplingparametre baseret på anmodningens kontekst, hvilket muliggør mere fleksibel og responsiv modeladfærd.
    - `detectTaskType` til at klassificere opgaven baseret på prompten, hvilket muliggør, at systemet kan anvende passende samplingstrategier for forskellige typer anmodninger.
    - `samplingProfiles` til at definere basis-samplingkonfigurationer for forskellige opgavetyper, hvilket tillader hurtige justeringer baseret på anmodningens art.

---

## Hvad er det næste

- [5.7 Skalering](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->