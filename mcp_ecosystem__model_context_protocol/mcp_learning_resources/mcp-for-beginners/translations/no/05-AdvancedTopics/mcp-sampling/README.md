> [UTE: 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Sampling i Model Context Protocol

> **Nedtrappingsvarsel:** MCP-spesifikasjonskandidaten `2026-07-28` markerer Sampling som utdatert til fordel for direkte integrasjon med LLM-leverandør-APIer. Sampling fungerer fortsatt i `2025-11-25` og i minst ett år etter en formell nedtrapping, så alt i denne leksjonen forblir gyldig - men nye serverdesign bør vurdere erstatningsmønsteret. Se [Hva endres i MCP: Release Candidate 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Sampling er en kraftig MCP-funksjon som lar servere forespørre LLM-fullføringer gjennom klienten, noe som muliggjør sofistikerte agentlignende oppførsler samtidig som sikkerhet og personvern opprettholdes. Riktig sampling-konfigurasjon kan dramatisk forbedre responskvalitet og ytelse. MCP gir en standardisert måte å kontrollere hvordan modeller genererer tekst med spesifikke parametere som påvirker tilfeldighet, kreativitet og sammenheng.

## Introduksjon

I denne leksjonen skal vi utforske hvordan man konfigurerer sampling-parametere i MCP-forespørsler og forstå de underliggende protokollmekanismene for sampling.

## Læringsmål

Ved slutten av denne leksjonen vil du kunne:

- Forstå de viktigste sampling-parametrene som finnes i MCP.
- Konfigurere sampling-parametere for ulike bruksområder.
- Implementere deterministisk sampling for reproduserbare resultater.
- Dynamisk justere sampling-parametere basert på kontekst og brukerpreferanser.
- Anvende sampling-strategier for å forbedre modellens ytelse i ulike scenarioer.
- Forstå hvordan sampling fungerer i klient-server-flyten til MCP.

## Hvordan sampling fungerer i MCP

Samplingsflyten i MCP følger disse stegene:

1. Server sender en `sampling/createMessage` forespørsel til klienten
2. Klienten gjennomgår forespørselen og kan endre den
3. Klienten tar prøver fra en LLM
4. Klienten gjennomgår fullføringen
5. Klienten returnerer resultatet til serveren

Dette menneske-i-løkken-designet sikrer at brukere beholder kontroll over hva LLM-en ser og genererer.

## Oversikt over sampling-parametere

MCP definerer følgende sampling-parametere som kan konfigureres i klientforespørsler:

| Parameter | Beskrivelse | Typisk område |
|-----------|-------------|---------------|
| `temperature` | Kontrollerer tilfeldighet i valg av token | 0.0 - 1.0 |
| `maxTokens` | Maksimalt antall tokens som skal genereres | Heltallsverdi |
| `stopSequences` | Egne sekvenser som stopper generering når de oppdages | Array av strenger |
| `metadata` | Ytterligere leverandør-spesifikke parametere | JSON-objekt |

Mange LLM-leverandører støtter ekstra parametere gjennom `metadata`-feltet, som kan inkludere:

| Vanlig utvidelsesparameter | Beskrivelse | Typisk område |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling - begrenser tokens til topp kumulativ sannsynlighet | 0.0 - 1.0 |
| `top_k` | Begrens valg av tokens til topp K alternativer | 1 - 100 |
| `presence_penalty` | Straffer tokens basert på deres tilstedeværelse i teksten hittil | -2.0 - 2.0 |
| `frequency_penalty` | Straffer tokens basert på frekvensen i teksten hittil | -2.0 - 2.0 |
| `seed` | Spesifikk tilfeldig frø for reproduserbare resultater | Heltallsverdi |

## Eksempel på forespørselsformat

Her er et eksempel på hvordan man ber om sampling fra en klient i MCP:

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

Klienten returnerer et resultat på fullføringen:

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

## Menneske-i-løkken-kontroller

MCP-sampling er designet med menneskelig tilsyn i tankene:

- **For spørsmål**:
  - Klienter bør vise brukere det foreslåtte spørsmålet
  - Brukere bør kunne endre eller avvise spørsmål
  - Systemspørsmål kan filtreres eller endres
  - Kontekstinkludering styres av klienten

- **For fullføringer**:
  - Klienter bør vise brukere fullføringen
  - Brukere bør kunne endre eller avvise fullføringer
  - Klienter kan filtrere eller endre fullføringer
  - Brukere kontrollerer hvilken modell som brukes

Med disse prinsippene i tankene, la oss se på hvordan sampling implementeres i ulike programmeringsspråk, med fokus på parametrene som ofte støttes på tvers av LLM-leverandører.

## Sikkerhetshensyn

Når sampling implementeres i MCP, bør du vurdere disse beste sikkerhetspraksisene:

- **Valider alt meldingsinnhold** før det sendes til klienten
- **Rens sensitiv informasjon** fra spørsmål og fullføringer
- **Implementer tak for frekvens** for å forhindre misbruk
- **Overvåk sampling-bruk** for uvanlige mønstre
- **Krypter data under overføring** med sikre protokoller
- **Håndter brukerdata-personvern** i samsvar med relevante regler
- **Revider sampling-forespørsler** for overholdelse og sikkerhet
- **Kontroller kostnadseksponering** med passende grenser
- **Implementer tidsavbrudd** for sampling-forespørsler
- **Håndter modellfeil på en god måte** med passende nødtiltak

Sampling-parametere lar deg finjustere oppførselen til språkmodeller for å oppnå ønsket balanse mellom deterministiske og kreative utganger.

La oss se på hvordan man konfigurerer disse parametrene i ulike programmeringsspråk.

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

I koden ovenfor har vi:

- Opprettet en MCP-klient med en spesifikk server-URL.
- Konfigurert en forespørsel med sampling-parametere som `temperature`, `top_p` og `top_k`.
- Sendt forespørselen og skrevet ut den genererte teksten.
- Brukt:
    - `allowedTools` for å spesifisere hvilke verktøy modellen kan bruke under generering. I dette tilfellet tillot vi verktøyene `ideaGenerator` og `marketAnalyzer` for å hjelpe med å generere kreative appideer.
    - `frequencyPenalty` og `presencePenalty` for å kontrollere repetisjon og variasjon i output.
    - `temperature` for å kontrollere tilfeldigheten i output, hvor høyere verdier fører til mer kreative svar.
    - `top_p` for å begrense utvalg av tokens til de som bidrar til topp kumulativ sannsynlighetsmasse, og dermed forbedrer kvaliteten på generert tekst.
    - `top_k` for å begrense modellen til topp K mest sannsynlige tokens, noe som kan hjelpe til med mer sammenhengende svar.
    - `frequencyPenalty` og `presencePenalty` for å redusere repetisjon og oppmuntre til variasjon i generert tekst.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript-eksempel: Temperatur- og Top-P samplingkonfigurasjon
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Initialiser MCP-klienten
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigurer forespørsel med forskjellige samplingparametere
  const creativeSampling = {
    temperature: 0.9,    // Høyere temperatur = mer tilfeldighet/kreativitet
    topP: 0.92,          // Vurder tokens med topp 92 % sannsynlighetsmasse
    frequencyPenalty: 0.6, // Reduser gjentakelse av tokensekvenser
    presencePenalty: 0.4   // Straff tokens som har dukket opp i teksten så langt
  };
  
  const factualSampling = {
    temperature: 0.2,    // Lavere temperatur = mer deterministisk/faktabasert
    topP: 0.85,          // Litt mer fokusert tokenutvalg
    frequencyPenalty: 0.2, // Minimal gjentakelsesstraff
    presencePenalty: 0.1   // Minimal tilstedeværelsesstraff
  };
  
  try {
    // Send to forespørsler med forskjellige samplingkonfigurasjoner
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

I koden ovenfor har vi:

- Initialisert en MCP-klient med server-URL og API-nøkkel.
- Konfigurert to sett sampling-parametere: ett for kreative oppgaver og ett for faktuelle oppgaver.
- Sendt forespørsler med disse konfigurasjonene, slik at modellen kan bruke spesifikke verktøy for hver oppgave.
- Skrevet ut de genererte svarene for å demonstrere effekten av ulike sampling-parametere.
- Brukt `allowedTools` for å spesifisere hvilke verktøy modellen kan bruke under generering. Her tillot vi `ideaGenerator` og `environmentalImpactTool` for kreative oppgaver, og `factChecker` og `dataAnalysisTool` for faktuelle oppgaver.
- Brukt `temperature` for å kontrollere tilfeldigheten i output, hvor høyere verdier fører til mer kreative svar.
- Brukt `top_p` for å begrense valg av tokens til de som bidrar til topp kumulativ sannsynlighetsmasse, og forbedre kvaliteten på generert tekst.
- Brukt `frequencyPenalty` og `presencePenalty` for å redusere repetisjon og oppmuntre til variasjon i output.
- Brukt `top_k` for å begrense modellen til topp K mest sannsynlige tokens, noe som kan hjelpe til med mer sammenhengende svar.

---

## Deterministisk sampling

For applikasjoner som krever konsistente utganger, sikrer deterministisk sampling reproduserbare resultater. Det gjøres ved å bruke et fast tilfeldig frø og sette temperaturen til null.

La oss se på følgende eksempelimplementering for å demonstrere deterministisk sampling i ulike programmeringsspråk.

# [Java](#tab/java)

```java
// Java-eksempel: Deterministiske svar med fast frø
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Bruk av et fast frø for deterministiske resultater
        
        // Første forespørsel med fast frø
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Null temperatur for maksimal determinisme
            .build();
            
        // Andre forespørsel med samme frø
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Utfør begge forespørsler
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Svarene skal være identiske på grunn av samme frø og temperatur=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

I koden ovenfor har vi:

- Opprettet en MCP-klient med en angitt server-URL.
- Konfigurert to forespørsler med samme prompt, fast frø, og temperatur lik null.
- Sendt begge forespørsler og skrevet ut generert tekst.
- Demonstrert at svarene er identiske på grunn av sampling-konfigurasjonens deterministiske natur (samme frø og temperatur).
- Brukt `setSeed` for å spesifisere et fast tilfeldig frø, som sikrer at modellen genererer samme output for samme input hver gang.
- Satt `temperature` til null for å sikre maksimal determinisme, noe som betyr at modellen alltid vil velge det mest sannsynlige neste token uten tilfeldighet.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript-eksempel: Deterministiske svar med frøkontroll
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Første forespørsel med fast frø
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Null temperatur for maksimal determinisme
    });
    
    // Andre forespørsel med samme frø og temperatur
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Tredje forespørsel med forskjellig frø, men samme temperatur
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

I koden ovenfor har vi:

- Initialisert en MCP-klient med server-URL.
- Konfigurert to forespørsler med samme prompt, fast frø og null temperatur.
- Sendt begge forespørsler og skrevet ut generert tekst.
- Demonstrert at svarene er identiske på grunn av sampling-konfigurasjonens deterministiske natur (samme frø og temperatur).
- Brukt `seed` for å spesifisere et fast tilfeldig frø, som sikrer at modellen genererer samme output for samme input hver gang.
- Satt `temperature` til null for å sikre maksimal determinisme, slik at modellen alltid velger den mest sannsynlige neste token uten tilfeldighet.
- Brukt et annet frø for den tredje forespørselen for å vise at endring av frø fører til ulike utganger, selv med samme prompt og temperatur.

---

## Dynamisk sampling-konfigurasjon

Intelligent sampling tilpasser parametere basert på konteksten og kravene til hver forespørsel. Det betyr dynamisk justering av parametere som temperatur, top_p og straffer basert på oppgavetypen, brukerpreferanser eller historisk ytelse.

La oss se på hvordan vi kan implementere dynamisk sampling i ulike programmeringsspråk.

# [Python](#tab/python)

```python
# Python-eksempel: Dynamisk prøvetaking basert på forespørselskontekst
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definer prøvetakingsforhåndsinnstillinger for forskjellige oppgavetyper
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Velg grunnleggende forhåndsinnstilling
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Juster basert på brukerpreferanser hvis oppgitt
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skaler temperatur basert på ønsket kreativitet (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Juster top_p basert på ønsket responsmangfold
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Opprett og send forespørsel med tilpassede prøvetakingsparametere
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Returner svar med prøvetakingsmetadata for åpenhet
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

I koden ovenfor har vi:

- Opprettet en `DynamicSamplingService`-klasse som håndterer adaptiv sampling.
- Definert sampling-presetts for ulike oppgavetyper (kreativ, faktuell, kode, analytisk).
- Valgt en basis sampling-preset basert på oppgavetypen.
- Justert sampling-parametere basert på brukerpreferanser, som kreativitet og variasjon.
- Sendt forespørselen med de dynamisk konfigurerte sampling-parametere.
- Returnert generert tekst sammen med de brukte sampling-parametere og oppgavetypen for åpenhet.
- Brukt `temperature` for å kontrollere tilfeldigheten i output, hvor høyere verdier gir mer kreative svar.
- Brukt `top_p` for å begrense valget av tokens til de som bidrar til topp kumulativ sannsynlighetsmasse, forbedrende kvaliteten på generert tekst.
- Brukt `frequency_penalty` for å redusere repetisjon og oppmuntre til variasjon i output.
- Brukt `user_preferences` for å tillate tilpasning av sampling-parametere basert på brukerspesifiserte nivåer av kreativitet og variasjon.
- Brukt `task_type` for å bestemme passende sampling-strategi for forespørselen, som tillater mer skreddersydde svar basert på oppgavens art.
- Brukt `send_request`-metoden for å sende prompt med konfigurerte sampling-parametere, og sikre at modellen genererer tekst i samsvar med spesifiserte krav.
- Brukt `generated_text` for å hente modellens respons, som så returneres sammen med sampling-parametre og oppgavetypen for videre analyse eller visning.
- Brukt `min` og `max` funksjoner for å sikre at brukerpreferanser holdes innen gyldige områder, og unngå ugyldige sampling-konfigurasjoner.

# [JavaScript Dynamisk](#tab/javascript-dynamic)

```javascript
// JavaScript-eksempel: Dynamisk prøveuttaksoppsett basert på brukerkontekst
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Definer grunnleggende prøveuttaksprofiler
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Spor historisk ytelse
    this.performanceHistory = [];
  }
  
  // Oppdag oppgavetype fra prompt
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Enkel heuristisk deteksjon - kan forbedres med ML-klassifisering
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
    
    // Standard til samtale hvis ingen klar type oppdages
    return 'conversational';
  }
  
  // Beregn prøveuttaksparametere basert på kontekst og brukerpreferanser
  getSamplingParameters(prompt, context = {}) {
    // Oppdag typen oppgave
    const taskType = this.detectTaskType(prompt, context);
    
    // Hent grunnprofil
    let params = {...this.samplingProfiles[taskType]};
    
    // Juster basert på brukerpreferanser
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Skaler fra 1-10 til passende temperaturområde
        params.temperature = 0.1 + (creativity * 0.09); // 0,1-1,0
      }
      
      if (precision !== undefined) {
        // Høyere presisjon betyr lavere topP (mer fokusert utvalg)
        params.topP = 1.0 - (precision * 0.05); // 0,5-1,0
      }
      
      if (consistency !== undefined) {
        // Høyere konsistens betyr lavere straffer
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0,1-0,9
      }
    }
    
    // Anvend lærte justeringer fra ytelseshistorikk
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Enkel adaptiv logikk - kan forbedres med mer sofistikerte algoritmer
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Vurder kun nylig historie
    
    if (relevantHistory.length > 0) {
      // Beregn gjennomsnittlige ytelsesscore
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Hvis ytelsen er under terskel, juster parametere
      if (avgScore < 0.7) {
        // Lett justering mot tryggere verdier
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Registrer ytelse for fremtidige justeringer
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 vurdering av svarenes kvalitet
    });
    
    // Begrens historikkstørrelse
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Hent optimaliserte prøveuttaksparametere
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Send forespørsel med optimaliserte parametere
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Hvis bruker gir tilbakemelding, registrer dette for fremtidig optimalisering
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

// Eksempel på bruk
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreativ oppgave med tilpassede brukerpreferanser
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Høy kreativitet (1-10)
          consistency: 3  // Lav konsistens (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Kodegenereringsoppgave
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Lav kreativitet
          precision: 8,   // Høy presisjon
          consistency: 9  // Høy konsistens
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

I koden ovenfor har vi:

- Opprettet en `AdaptiveSamplingManager`-klasse som administrerer dynamisk sampling basert på oppgavetype og brukerpreferanser.
- Definert sampling-profiler for ulike oppgavetyper (kreativ, faktuell, kode, samtale).
- Implementert en metode for å detektere oppgavetypen fra prompten ved hjelp av enkle heuristikker.
- Kalkulert sampling-parametre basert på den detekterte oppgavetypen og brukerpreferanser.
- Anvendt lærte justeringer basert på historisk ytelse for å optimalisere sampling-parametre.
- Registrert ytelse for fremtidige justeringer, slik at systemet kan lære av tidligere interaksjoner.
- Sendt forespørsler med dynamisk konfigurerte sampling-parametre og returnert generert tekst sammen med anvendte parametre og oppgavetypen som ble detektert.
- Brukt:
    - `userPreferences` for å tillate tilpasning av sampling-parametere basert på brukerdefinerte nivåer for kreativitet, presisjon og konsistens.
    - `detectTaskType` for å avgjøre oppgavens natur ut fra prompt, og dermed tillate mer skreddersydde svar.
    - `recordPerformance` for å logge ytelsen til genererte svar, som gjør at systemet kan tilpasse og forbedre seg over tid.
    - `applyLearnedAdjustments` for å modifisere sampling-parametre basert på historisk ytelse, og forbedre modellens evne til å generere svar av høy kvalitet.
    - `generateResponse` for å kapsle inn hele prosessen med å generere svar med adaptiv sampling, og gjøre det enkelt å kalle med ulike prompt og kontekster.
    - `allowedTools` for å spesifisere hvilke verktøy modellen kan bruke under generering, slik at svarene blir mer kontekstsensitive.
    - `feedbackScore` som gir brukere mulighet til å gi tilbakemelding på kvaliteten av generert svar, som kan brukes til ytterligere forbedring av modellens ytelse over tid.
    - `performanceHistory` for å opprettholde en oversikt over tidligere interaksjoner, slik at systemet kan lære av tidligere suksesser og feil.
    - `getSamplingParameters` for å dynamisk justere sampling-parametre basert på sammenhengen i forespørselen, som gir mer fleksibel og responsiv modelloppførsel.
    - `detectTaskType` for å klassifisere oppgaven basert på prompt, slik at systemet kan bruke passende sampling-strategier for ulike typer forespørsler.
    - `samplingProfiles` for å definere basis sampling-konfigurasjoner for ulike oppgavetyper, for rask justering basert på forespørselens art.

---

## Hva nå

- [5.7 Skalering](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->