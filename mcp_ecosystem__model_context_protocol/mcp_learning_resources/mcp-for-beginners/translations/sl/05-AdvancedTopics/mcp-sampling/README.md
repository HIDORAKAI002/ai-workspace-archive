> [ZASTARELO: Kandidat za izdajo 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Vzorcevanje v Model Context Protocol

> **Obvestilo o zastarelosti:** kandidat za izdajo specifikacije MCP `2026-07-28` označuje vzorcevanje kot zastarelo v korist neposredne integracije z API-ji ponudnikov LLM. Vzorcevanje še vedno deluje v `2025-11-25` in še vsaj leto dni po formalni zastarelosti, zato je vse v tej lekciji še vedno veljavno - vendar naj nove zasnove strežnikov ocenijo nadomestni vzorec. Oglejte si [Kaj se spreminja v MCP: Kandidat za izdajo 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Vzorcevanje je zmogljiva funkcija MCP, ki omogoča strežnikom, da prek odjemalca zahtevajo zaključke LLM, kar omogoča sofisticirano agentsko vedenje ob ohranjanju varnosti in zasebnosti. Prava konfiguracija vzorcevanja lahko dramatično izboljša kakovost in zmogljivost odziva. MCP zagotavlja standardiziran način za nadzor, kako modeli generirajo besedilo z določenimi parametri, ki vplivajo na naključnost, kreativnost in koherentnost.

## Uvod

V tej lekciji bomo raziskali, kako konfigurirati parametre vzorcevanja v MCP zahtevah in razumeti osnovno mehaniko protokola vzorcevanja.

## Cilji učenja

Do konca te lekcije boste:

- Razumeli ključne parametre vzorcevanja, ki so na voljo v MCP.
- Konfigurirali parametre vzorcevanja za različne primere uporabe.
- Implementirali deterministično vzorcevanje za ponovljive rezultate.
- Dinamično prilagodili parametre vzorcevanja glede na kontekst in uporabniške preference.
- Uporabili strategije vzorcevanja za izboljšanje zmogljivosti modela v različnih scenarijih.
- Razumeli, kako vzorcevanje deluje v odjemalcu-strežniku poteku MCP.

## Kako vzorcevanje deluje v MCP

Potek vzorcevanja v MCP sledi naslednjim korakom:

1. Strežnik pošlje zahtevo `sampling/createMessage` odjemalcu
2. Odjemalec pregleda zahtevo in jo lahko spremeni
3. Odjemalec vzorči iz LLM
4. Odjemalec pregleda dokončanje
5. Odjemalec vrne rezultat strežniku

Ta zasnova z vključenim človekom zagotavlja, da imajo uporabniki nadzor nad tem, kaj LLM vidi in generira.

## Pregled parametrov vzorcevanja

MCP določa naslednje parametre vzorcevanja, ki jih je mogoče konfigurirati v zahtevah odjemalca:

| Parameter | Opis | Tipični razpon |
|-----------|-------------|---------------|
| `temperature` | Nadzoruje naključnost pri izbiri tokenov | 0.0 - 1.0 |
| `maxTokens` | Največje število tokenov za generiranje | Celotno število |
| `stopSequences` | Nizka zaporedja, ki ustavijo generiranje, ko se pojavijo | Polje nizov |
| `metadata` | Dodatni parametri specifični za ponudnika | JSON objekt |

Mnogi ponudniki LLM podpirajo dodatne parametre preko polja `metadata`, ki lahko vključujejo:

| Pogost parameter razširitve | Opis | Tipični razpon |
|-----------|-------------|---------------|
| `top_p` | Nucleus vzorcevanje - omejuje tokene na top kumulativno verjetnost | 0.0 - 1.0 |
| `top_k` | Omejuje izbiro tokenov na top K možnosti | 1 - 100 |
| `presence_penalty` | Kaznuje tokene glede na njihovo prisotnost v besedilu do zdaj | -2.0 - 2.0 |
| `frequency_penalty` | Kaznuje tokene glede na njihovo pogostost v besedilu do zdaj | -2.0 - 2.0 |
| `seed` | Poseben naključni seme za ponovljive rezultate | Celotno število |

## Primer oblike zahteve

Tukaj je primer zahteve za vzorcevanje odjemalca v MCP:

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

## Oblika odgovora

Odjemalec vrne rezultat dokončanja:

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

## Nadzor človeka v zanki

MCP vzorcevanje je zasnovano z mislijo na človeški nadzor:

- **Za pozive (prompte)**:
  - Odjemalci naj prikažejo uporabnikom predlagani prompt
  - Uporabniki naj lahko spremenijo ali zavrnejo prompte
  - Sistemski prompts se lahko filtrirajo ali spremenijo
  - Vključitev konteksta nadzoruje odjemalec

- **Za zaključke (completions)**:
  - Odjemalci naj prikažejo uporabnikom dokončanje
  - Uporabniki naj lahko spremenijo ali zavrnejo zaključke
  - Odjemalci lahko filtrirajo ali spreminjajo zaključke
  - Uporabniki nadzorujejo, kateri model se uporablja

S temi načeli v mislih si poglejmo, kako implementirati vzorcevanje v različnih programskih jezikih, s poudarkom na parametrih, ki jih običajno podpirajo ponudniki LLM.

## Varnostni premisleki

Pri implementaciji vzorcevanja v MCP upoštevajte naslednje varnostne dobre prakse:

- **Validirajte vse vsebine sporočil** pred pošiljanjem odjemalcu
- **Sanitizirajte občutljive podatke** iz promptov in zaključkov
- **Implementirajte omejitve hitrosti** za preprečevanje zlorab
- **Nadzorujte uporabo vzorcevanja** zaradi nenavadnih vzorcev
- **Šifrirajte podatke med prenosom** z uporabo varnih protokolov
- **Upravljajte zasebnost uporabniških podatkov** v skladu z ustreznimi predpisi
- **Revizirajte zahteve za vzorcevanje** za skladnost in varnost
- **Nadzorujte stroške** z ustreznimi omejitvami
- **Implementirajte časovne omejitve** za zahteve vzorcevanja
- **Obravnavajte napake modela na eleganten način** z ustreznimi rezervnimi rešitvami

Parametri vzorcevanja omogočajo fino nastavitev obnašanja jezikovnih modelov za doseganje želene uravnoteženosti med determinističnimi in kreativnimi izhodi.

Poglejmo, kako konfigurirati te parametre v različnih programskih jezikih.

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

V zgornji kodi smo:

- Ustvarili MCP odjemalca s specifičnim URL-jem strežnika.
- Konfigurirali zahtevo s parametri vzorcevanja, kot so `temperature`, `top_p` in `top_k`.
- Poslali zahtevo in izpisali generirano besedilo.
- Uporabili:
    - `allowedTools` za določitev, katera orodja lahko model uporablja med generiranjem. V tem primeru smo dovolili orodji `ideaGenerator` in `marketAnalyzer` za pomoč pri generiranju kreativnih idej za aplikacije.
    - `frequencyPenalty` in `presencePenalty` za nadzor ponavljanja in raznolikosti v izhodu.
    - `temperature` za nadzor naključnosti izhoda, pri višjih vrednostih vodi do bolj kreativnih odgovorov.
    - `top_p` za omejitev izbire tokenov na tiste, ki prispevajo k najvišji kumulativni verjetnostni masi, kar izboljša kakovost generiranega besedila.
    - `top_k` za omejitev modela na top K najbolj verjetnih tokenov, kar lahko pomaga pri nastanku bolj koherentnih odgovorov.
    - `frequencyPenalty` in `presencePenalty` za zmanjšanje ponavljanja ter spodbujanje raznolikosti v generiranem besedilu.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript primer: konfiguracija temperature in Top-P vzorčenja
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inicializirajte MCP odjemalca
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigurirajte zahtevo z različnimi parametri vzorčenja
  const creativeSampling = {
    temperature: 0.9,    // Višja temperatura = več naključnosti/kreativnosti
    topP: 0.92,          // Upoštevajte tokene z vrhnjih 92 % verjetnostne mase
    frequencyPenalty: 0.6, // Zmanjšajte ponavljanje zaporedij tokenov
    presencePenalty: 0.4   // Kaznujte tokene, ki so se že pojavili v besedilu
  };
  
  const factualSampling = {
    temperature: 0.2,    // Nižja temperatura = bolj deterministično/faktično
    topP: 0.85,          // Malenkost bolj osredotočen izbor tokenov
    frequencyPenalty: 0.2, // Minimalna kazen za ponavljanje
    presencePenalty: 0.1   // Minimalna kazen za prisotnost
  };
  
  try {
    // Pošlji dve zahtevi z različnimi konfiguracijami vzorčenja
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

V zgornji kodi smo:

- Inicializirali MCP odjemalca z URL-jem strežnika in API ključem.
- Konfigurirali dva kompleta parametrov vzorcevanja: enega za kreativna opravila in drugega za dejanske naloge.
- Poslali zahteve s temi konfiguracijami, kar je omogočilo modelu uporabo specifičnih orodij za vsak primer.
- Izpisali generirane odzive, da prikažemo učinke različnih parametrov vzorcevanja.
- Uporabili `allowedTools` za določitev, katera orodja lahko model uporablja med generiranjem. V tem primeru smo dovolili orodji `ideaGenerator` in `environmentalImpactTool` za kreativne naloge, ter `factChecker` in `dataAnalysisTool` za dejanske naloge.
- Uporabili `temperature` za nadzor naključnosti izhoda, pri višjih vrednostih vodi do bolj kreativnih odgovorov.
- Uporabili `top_p` za omejitev izbire tokenov na tiste, ki prispevajo k najvišji kumulativni verjetnostni masi, kar izboljša kakovost generiranega besedila.
- Uporabili `frequencyPenalty` in `presencePenalty` za zmanjšanje ponavljanja ter spodbujanje raznolikosti v izhodu.
- Uporabili `top_k` za omejitev modela na top K najbolj verjetnih tokenov, kar lahko pomaga pri nastanku bolj koherentnih odgovorov.

---

## Deterministično vzorcevanje

Za aplikacije, ki zahtevajo dosledne rezultate, deterministično vzorcevanje zagotavlja ponovljive rezultate. To doseže z uporabo fiksnega naključnega semena in nastavitvijo temperature na nič.

Poglejmo spodnji vzorec implementacije, ki prikazuje deterministično vzorcevanje v različnih programskih jezikih.

# [Java](#tab/java)

```java
// Java Primer: Deterministični odgovori s fiksnim semenom
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Uporaba fiksnega semena za deterministične rezultate
        
        // Prvi zahtevek s fiksnim semenom
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Temperatura nič za največjo determinističnost
            .build();
            
        // Drugi zahtevek z enakim semenom
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Izvedi oba zahtevka
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Odgovori bi morali biti enaki zaradi istega semena in temperature=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

V zgornji kodi smo:

- Ustvarili MCP odjemalca s specifičnim URL-jem strežnika.
- Konfigurirali dve zahtevi z istim promptom, fiksnim semenom in temperaturo nič.
- Poslali obe zahtevi in izpisali generirano besedilo.
- Pokazali, da so odzivi enaki zaradi deterministične narave konfiguracije vzorcevanja (isto seme in temperatura).
- Uporabili `setSeed` za določitev fiksnega naključnega semena, kar zagotavlja, da model vedno generira isti izhod za isti vhod.
- Nastavili `temperature` na nič za največjo determinističnost, kar pomeni, da bo model vedno izbral najbolj verjeten naslednji token brez naključnosti.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Primer JavaScripta: Deterministični odzivi s kontrolo začetnega semena
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Prvi zahtevek s fiksnim semenom
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Temperatura nič za največjo determinističnost
    });
    
    // Drugi zahtevek z istim semenom in temperaturo
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Tretji zahtevek z drugačnim semenom, vendar enako temperaturo
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

V zgornji kodi smo:

- Inicializirali MCP odjemalca z URL-jem strežnika.
- Konfigurirali dve zahtevi z istim promptom, fiksnim semenom in temperaturo nič.
- Poslali obe zahtevi in izpisali generirano besedilo.
- Pokazali, da so odzivi enaki zaradi deterministične narave konfiguracije vzorcevanja (isto seme in temperatura).
- Uporabili `seed` za določitev fiksnega naključnega semena, kar zagotavlja, da model vedno generira isti izhod za isti vhod.
- Nastavili `temperature` na nič za največjo determinističnost, kar pomeni, da bo model vedno izbral najbolj verjeten naslednji token brez naključnosti.
- Uporabili drugačno seme za tretjo zahtevo, da pokažemo, da spreminjanje semena privede do različnih izhodov, tudi z enakim promptom in temperaturo.

---

## Dinamična konfiguracija vzorcevanja

Inteligentno vzorcevanje prilagaja parametre glede na kontekst in zahteve posamezne zahteve. To pomeni dinamično prilagajanje parametrov, kot so temperatura, top_p in kazni, glede na vrsto naloge, uporabniške preference ali preteklo zmogljivost.

Poglejmo, kako implementirati dinamično vzorcevanje v različnih programskih jezikih.

# [Python](#tab/python)

```python
# Python primer: Dinamično vzorčenje na podlagi konteksta zahteve
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Določite vzorčne prednastavitve za različne vrste nalog
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Izberite osnovno prednastavitev
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Prilagodite glede na uporabniške preference, če so podane
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Prilagodite temperaturo glede na željo po kreativnosti (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Prilagodite top_p glede na želeno raznolikost odziva
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Ustvarite in pošljite zahtevo z lastnimi parametri vzorčenja
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Vrnite odziv z metapodatki vzorčenja za preglednost
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

V zgornji kodi smo:

- Ustvarili razred `DynamicSamplingService`, ki upravlja prilagodljivo vzorcevanje.
- Določili vzorčne prednastavitve za različne vrste nalog (kreativno, dejansko, koda, analitično).
- Izbrali osnovno prednastavitev vzorcevanja glede na vrsto naloge.
- Prilagodili parametre vzorcevanja glede na uporabniške preference, kot so raven kreativnosti in raznolikosti.
- Poslali zahtevo s dinamično konfiguriranimi parametri vzorcevanja.
- Vrnil generirano besedilo skupaj z uporabljenimi parametri vzorcevanja in vrsto naloge za preglednost.
- Uporabili `temperature` za nadzor naključnosti izhoda, pri višjih vrednostih vodi do bolj kreativnih odgovorov.
- Uporabili `top_p` za omejitev izbire tokenov na tiste, ki prispevajo k najvišji kumulativni verjetnostni masi, kar izboljša kakovost generiranega besedila.
- Uporabili `frequency_penalty` za zmanjšanje ponavljanja in spodbujanje raznolikosti v izhodu.
- Uporabili `user_preferences` za omogočanje prilagoditve parametrov vzorcevanja glede na uporabniško določene ravni kreativnosti in raznolikosti.
- Uporabili `task_type` za določitev ustrezne strategije vzorcevanja za zahtevo, kar omogoča prilagojene odzive glede na naravo naloge.
- Uporabili metodo `send_request` za pošiljanje prompta s konfiguriranimi parametri vzorcevanja, kar zagotavlja, da model generira besedilo v skladu z zahtevami.
- Uporabili `generated_text` za pridobitev odziva modela, ki je nato vrnjen skupaj z parametri vzorcevanja in vrsto naloge za nadaljnjo analizo ali prikaz.
- Uporabili funkciji `min` in `max` za zagotovitev, da so uporabniške preference omejene znotraj veljavnih območij, da preprečimo neveljavne konfiguracije vzorcevanja.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Primer JavaScript: Dinamična konfiguracija vzorčenja glede na uporabniški kontekst
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Določi osnovne profile vzorčenja
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Spremljaj zgodovinsko uspešnost
    this.performanceHistory = [];
  }
  
  // Zaznaj tip naloge iz poziva
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Enostavna heuristična zaznava - lahko se izboljša s klasifikacijo strojnega učenja
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
    
    // Privzeto na pogovorni, če ni zaznan jasen tip
    return 'conversational';
  }
  
  // Izračunaj parametre vzorčenja glede na kontekst in uporabniške nastavitve
  getSamplingParameters(prompt, context = {}) {
    // Zaznaj tip naloge
    const taskType = this.detectTaskType(prompt, context);
    
    // Pridobi osnovni profil
    let params = {...this.samplingProfiles[taskType]};
    
    // Prilagodi glede na uporabniške nastavitve
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Pretvori iz 1-10 v ustrezen temperaturni razpon
        params.temperature = 0.1 + (creativity * 0.09); // 0,1-1,0
      }
      
      if (precision !== undefined) {
        // Višja natančnost pomeni nižji topP (bolj osredotočen izbor)
        params.topP = 1.0 - (precision * 0.05); // 0,5-1,0
      }
      
      if (consistency !== undefined) {
        // Višja konsistentnost pomeni manjše kazni
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0,1-0,9
      }
    }
    
    // Uporabi naučene prilagoditve iz zgodovine uspešnosti
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Enostavna prilagodljiva logika - lahko se izboljša z bolj sofisticiranimi algoritmi
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Upoštevaj le nedavno zgodovino
    
    if (relevantHistory.length > 0) {
      // Izračunaj povprečne ocene uspešnosti
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Če je uspešnost pod pragom, prilagodi parametre
      if (avgScore < 0.7) {
        // Rahla prilagoditev proti varnejšim vrednostim
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Zabeleži uspešnost za prihodnje prilagoditve
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Ocena kakovosti odgovora od 0 do 1
    });
    
    // Omeji velikost zgodovine
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Pridobi optimizirane parametre vzorčenja
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Pošlji zahtevo z optimiziranimi parametri
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Če uporabnik poda povratno informacijo, jo zabeleži za prihodnjo optimizacijo
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

// Primer uporabe
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreativna naloga s prilagojenimi uporabniškimi nastavitvami
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Visoka kreativnost (1-10)
          consistency: 3  // Nizka konsistentnost (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Naloga generiranja kode
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Nizka kreativnost
          precision: 8,   // Visoka natančnost
          consistency: 9  // Visoka konsistentnost
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

V zgornji kodi smo:

- Ustvarili razred `AdaptiveSamplingManager`, ki upravlja dinamično vzorcevanje glede na vrsto naloge in uporabniške preference.
- Določili vzorčne profile za različne vrste nalog (kreativno, dejansko, koda, pogovorno).
- Implementirali metodo za zaznavanje vrste naloge iz prompta z uporabo preprostih pravil.
- Izračunali parametre vzorcevanja glede na zaznano vrsto naloge in uporabniške preference.
- Uporabili naučene prilagoditve na podlagi pretekle zmogljivosti za optimizacijo parametrov vzorcevanja.
- Zabeležili uspešnost za prihodnje prilagoditve, kar omogoča sistemu učenje iz preteklih interakcij.
- Poslali zahteve z dinamično konfiguriranimi parametri vzorcevanja in vrnili generirano besedilo skupaj z uporabljenimi parametri in zaznano vrsto naloge.
- Uporabili:
    - `userPreferences` za prilagoditev parametrov vzorcevanja na podlagi uporabniško določenih stopenj kreativnosti, natančnosti in doslednosti.
    - `detectTaskType` za določitev narave naloge na podlagi prompta, kar omogoča bolj prilagojene odzive.
    - `recordPerformance` za beleženje uspešnosti generiranih odgovorov, kar omogoča sistemu prilagajanje in izboljševanje skozi čas.
    - `applyLearnedAdjustments` za spreminjanje parametrov vzorcevanja na podlagi pretekle uspešnosti, s čimer se izboljša sposobnost modela za generiranje kakovostnih odgovorov.
    - `generateResponse` za ovijanje celotnega procesa generiranja odziva z adaptivnim vzorcevanjem, kar olajša klic z različnimi prompti in konteksti.
    - `allowedTools` za določitev, katera orodja lahko model uporablja med generiranjem, kar omogoča odzive z večjo ozaveščenostjo o kontekstu.
    - `feedbackScore` za omogočanje uporabnikom, da podajo povratne informacije o kakovosti generiranega odziva, ki se lahko uporabi za nadaljnjo optimizacijo uspešnosti modela skozi čas.
    - `performanceHistory` za vzdrževanje evidence preteklih interakcij, kar omogoča sistemu učenje iz preteklih uspehov in neuspehov.
    - `getSamplingParameters` za dinamično prilagajanje parametrov vzorcevanja glede na kontekst zahteve, kar omogoča bolj prilagodljivo in odzivno obnašanje modela.
    - `detectTaskType` za klasifikacijo naloge na podlagi prompta, kar omogoča sistemu uporabo ustreznih strategij vzorcevanja za različne vrste zahtev.
    - `samplingProfiles` za določitev osnovnih konfiguracij vzorcevanja za različne vrste nalog, kar omogoča hitro prilagajanje glede na naravo zahteve.

---

## Kaj sledi

- [5.7 Skaliranje](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->