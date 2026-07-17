> [ZASTARALÉ: KANDIDÁT NA VYDANIE 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Sampling v Model Context Protocol

> **Oznámenie o zastaraní:** kandidát na vydanie špecifikácie MCP `2026-07-28` označuje Sampling za zastaraný v prospech priamej integrácie s API poskytovateľov LLM. Sampling naďalej funguje v `2025-11-25` a aspoň rok po formálnom zastaraní, takže všetko v tejto lekcii zostáva platné - ale nové návrhy serverov by mali zvážiť náhradný vzor. Pozrite si [Čo sa mení v MCP: Kandidát na vydanie 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Sampling je silná funkcia MCP, ktorá umožňuje serverom žiadať dokončenia LLM prostredníctvom klienta, čo umožňuje sofistikované agentné správanie pri zachovaní bezpečnosti a súkromia. Správna konfigurácia sampleingu môže dramaticky zlepšiť kvalitu a výkon odpovedí. MCP poskytuje štandardizovaný spôsob ako ovládať, ako modely generujú text s použitím špecifických parametrov, ktoré ovplyvňujú náhodnosť, kreativitu a súdržnosť.

## Úvod

V tejto lekcii preskúmame, ako nakonfigurovať parametre sampleingu v požiadavkách MCP a porozumieme základným protokolovým mechanizmom sampleingu.

## Výukové ciele

Po skončení tejto lekcie budete schopní:

- Pochopiť kľúčové parametre sampleingu dostupné v MCP.
- Konfigurovať parametre sampleingu pre rôzne použitia.
- Implementovať deterministický sampling pre opakovateľné výsledky.
- Dynamicky upravovať parametre sampleingu podľa kontextu a preferencií používateľa.
- Použiť stratégie sampleingu na zlepšenie výkonu modelu v rôznych scenároch.
- Pochopiť, ako sampling funguje v klient-server toku MCP.

## Ako sampling funguje v MCP

Priebeh sampleingu v MCP nasledovne:

1. Server pošle požiadavku `sampling/createMessage` klientovi
2. Klient požiadavku skontroluje a môže ju upraviť
3. Klient vykoná sampling z LLM
4. Klient dokončenie skontroluje
5. Klient vráti výsledok serveru

Tento dizajn s človekom v slučke zabezpečuje, že používatelia majú kontrolu nad tým, čo LLM vidí a generuje.

## Prehľad parametrov sampleingu

MCP definuje nasledujúce parametre sampleingu, ktoré môžu byť konfigurované v požiadavkách klienta:

| Parameter | Popis | Typický rozsah |
|-----------|-------------|---------------|
| `temperature` | Ovláda náhodnosť vo výbere tokenov | 0.0 - 1.0 |
| `maxTokens` | Maximálny počet tokenov na generovanie | Celé číslo |
| `stopSequences` | Vlastné sekvencie, ktoré zastavia generovanie ak sa vyskytnú | Pole reťazcov |
| `metadata` | Ďalšie parametre špecifické pre poskytovateľa | JSON objekt |

Mnoho poskytovateľov LLM podporuje ďalšie parametre cez pole `metadata`, ktoré môžu obsahovať:

| Bežný rozširujúci parameter | Popis | Typický rozsah |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling – obmedzuje tokeny na top kumulatívnu pravdepodobnosť | 0.0 - 1.0 |
| `top_k` | Obmedzuje výber tokenov na top K možností | 1 - 100 |
| `presence_penalty` | Penalizuje tokeny podľa ich výskytu v texte | -2.0 - 2.0 |
| `frequency_penalty` | Penalizuje tokeny podľa ich frekvencie v texte | -2.0 - 2.0 |
| `seed` | Konkrétne náhodné semeno pre reprodukovateľné výsledky | Celé číslo |

## Príklad formátu požiadavky

Tu je príklad požiadavky na sampling klientovi v MCP:

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

## Formát odpovede

Klient vráti výsledok dokončenia:

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

## Ovládanie človekom v slučke

Sampling v MCP je navrhnutý s ohľadom na dohľad človeka:

- **Pre prompt-y**:
  - Klienti by mali používateľom zobrazovať navrhovaný prompt
  - Používatelia by mali mať možnosť prompt upraviť alebo zamietnuť
  - Systémové prompt-y môžu byť filtrované alebo upravené
  - Zahrnutie kontextu riadi klient

- **Pre dokončenia**:
  - Klienti by mali používateľom zobrazovať dokončenie
  - Používatelia by mali mať možnosť dokončenia upraviť alebo zamietnuť
  - Klienti môžu filtrovať alebo upravovať dokončenia
  - Používatelia riadia, ktorý model sa použije

S týmito princípmi na pamäti sa pozrime, ako implementovať sampling v rôznych programovacích jazykoch so zameraním na parametre, ktoré podporujú väčšina poskytovateľov LLM.

## Bezpečnostné úvahy

Pri implementácii sampleingu v MCP zvážte tieto bezpečnostné odporúčania:

- **Validujte všetok obsah správ** pred ich odoslaním klientovi
- **Sanitizujte citlivé informácie** z promptov a dokončení
- **Implementujte limity rýchlosti** pre zabránenie zneužitia
- **Monitorujte používanie sampleingu** pre neobvyklé vzory
- **Šifrujte dáta počas prenosu** pomocou bezpečných protokolov
- **Zaobchádzajte s ochranou údajov používateľov** v súlade s miestnymi predpismi
- **Auditujte požiadavky na sampling** pre súlad a bezpečnosť
- **Kontrolujte výdaje nákladov** vhodnými limitmi
- **Implementujte časové limity** pre požiadavky na sampling
- **Zaobchádzajte s chybami modelu** elegantne s vhodnými záložnými riešeniami

Parametre sampleingu umožňujú jemné doladenie správania jazykových modelov, aby sa dosiahla požadovaná rovnováha medzi deterministickými a kreatívnymi výstupmi.

Pozrime sa, ako nakonfigurovať tieto parametre v rôznych programovacích jazykoch.

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

V predchádzajúcom kóde sme:

- Vytvorili klienta MCP so špecifickou URL servera.
- Nakonfigurovali požiadavku s parametrami sampleingu ako `temperature`, `top_p` a `top_k`.
- Odoslali požiadavku a vypísali generovaný text.
- Použili:
    - `allowedTools` na špecifikovanie, ktoré nástroje môže model používať počas generovania. V tomto prípade sme povolili nástroje `ideaGenerator` a `marketAnalyzer` na pomoc pri tvorbe kreatívnych nápadov pre aplikácie.
    - `frequencyPenalty` a `presencePenalty` na kontrolu opakovania a rôznorodosti výstupu.
    - `temperature` na ovládanie náhodnosti výstupu, kde vyššie hodnoty vedú k kreatívnejším odpovediam.
    - `top_p` na obmedzenie výberu tokenov na tie, ktoré prispievajú k najvyššej kumulatívnej pravdepodobnosti, zvyšujúcej kvalitu generovaného textu.
    - `top_k` na obmedzenie modelu na top K najpravdepodobnejších tokenov, čo môže pomôcť pri generovaní koherentnejších odpovedí.
    - `frequencyPenalty` a `presencePenalty` na zníženie opakovania a podporu rôznorodosti v generovanom texte.

# [JavaScript](#tab/javascript)

```javascript
// Príklad JavaScriptu: Konfigurácia teploty a Top-P vzorkovania
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inicializujte MCP klienta
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigurujte požiadavku s rôznymi parametrami vzorkovania
  const creativeSampling = {
    temperature: 0.9,    // Vyššia teplota = väčšia náhodnosť/kreativita
    topP: 0.92,          // Zohľadnite tokeny s top 92% pravdepodobnostnou hmotnosťou
    frequencyPenalty: 0.6, // Znížte opakovanie sekvencií tokenov
    presencePenalty: 0.4   // Penalizujte tokeny, ktoré sa už v texte objavili
  };
  
  const factualSampling = {
    temperature: 0.2,    // Nižšia teplota = viac deterministické/faktické
    topP: 0.85,          // O niečo viac zameraný výber tokenov
    frequencyPenalty: 0.2, // Minimálny trest za opakovanie
    presencePenalty: 0.1   // Minimálny trest za prítomnosť
  };
  
  try {
    // Odoslať dve požiadavky s rôznymi konfiguráciami vzorkovania
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

V predchádzajúcom kóde sme:

- Inicializovali klienta MCP s URL servera a API kľúčom.
- Nakonfigurovali dva súbory parametrov sampleingu: jeden pre kreatívne úlohy a druhý pre faktické úlohy.
- Odoslali požiadavky s týmito konfiguráciami, umožňujúc modelu používať špecifické nástroje pre každú úlohu.
- Vypísali generované odpovede, aby sme demonštrovali vplyv rôznych parametrov sampleingu.
- Použili sme `allowedTools` na špecifikovanie nástrojov, ktoré môže model používať počas generovania. V tomto prípade sme povolili `ideaGenerator` a `environmentalImpactTool` pre kreatívne úlohy a `factChecker` a `dataAnalysisTool` pre faktické úlohy.
- Použili sme `temperature` na ovládanie náhodnosti výstupu, kde vyššie hodnoty vedú k kreatívnejším odpovediam.
- Použili sme `top_p` na obmedzenie výberu tokenov na tie, ktoré prispievajú k najvyššej kumulatívnej pravdepodobnosti, čím sa zvyšuje kvalita generovaného textu.
- Použili sme `frequencyPenalty` a `presencePenalty` na zníženie opakovania a podporu rôznorodosti vo výstupe.
- Použili sme `top_k` na obmedzenie modelu na top K najpravdepodobnejších tokenov, čo môže pomôcť pri generovaní koherentnejších odpovedí.

---

## Deterministický sampling

Pre aplikácie vyžadujúce konzistentné výstupy zabezpečuje deterministický sampling reprodukovateľné výsledky. Dosahuje sa to použitím pevného náhodného semena a nastavením teploty na nulu.

Pozrime sa na ukážkovú implementáciu na demonštráciu deterministického sampleingu v rôznych programovacích jazykoch.

# [Java](#tab/java)

```java
// Java príklad: Deterministické odpovede s pevne daným seedom
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Použitie pevne daného seedu pre deterministické výsledky
        
        // Prvá požiadavka s pevným seedom
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nulová teplota pre maximálny determinismus
            .build();
            
        // Druhá požiadavka s rovnakým seedom
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Vykonaj obe požiadavky
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Odpovede by mali byť identické vďaka rovnakému seedu a teplote=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

V predchádzajúcom kóde sme:

- Vytvorili klienta MCP so zadanou URL servera.
- Nakonfigurovali dve požiadavky s rovnakým promptom, pevným semenom a nulovou teplotou.
- Odoslali obe požiadavky a vypísali generovaný text.
- Ukázali, že odpovede sú identické vďaka deterministickej povahe konfigurácie sampleingu (rovnaké semeno a teplota).
- Použili `setSeed` na špecifikovanie pevného náhodného semena, ktoré zabezpečuje, že model vždy pre rovnaký vstup generuje rovnaký výstup.
- Nastavili `temperature` na nulu pre maximálnu deterministickosť, čo znamená, že model vždy vyberie najpravdepodobnejší nasledujúci token bez náhodnosti.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Príklad JavaScriptu: Deterministické odpovede s riadením semienka
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Prvý požiadavok s pevne daným semienkom
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Nulová teplota pre maximálnu deterministickosť
    });
    
    // Druhý požiadavok s rovnakým semienkom a teplotou
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Tretí požiadavok s iným semienkom, ale rovnakou teplotou
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

V predchádzajúcom kóde sme:

- Inicializovali klienta MCP s URL servera.
- Nakonfigurovali dve požiadavky s rovnakým promptom, pevným semenom a nulovou teplotou.
- Odoslali obe požiadavky a vypísali generovaný text.
- Ukázali, že odpovede sú identické vďaka deterministickej povahe konfigurácie sampleingu (rovnaké semeno a teplota).
- Použili `seed` na špecifikovanie pevného náhodného semena, zabezpečujúceho rovnaký výstup pre rovnaký vstup zakaždým.
- Nastavili `temperature` na nulu pre maximálnu deterministickosť, teda model vždy vyberie najpravdepodobnejší nasledujúci token bez náhodnosti.
- Použili iné semeno pre tretiu požiadavku, aby sme ukázali, že zmena semena vedie k rôznym výstupom, aj pri rovnakom prompte a teplote.

---

## Dynamická konfigurácia sampleingu

Inteligentný sampling prispôsobuje parametre na základe kontextu a požiadaviek každej požiadavky. To znamená dynamicky upravovať parametre ako temperature, top_p a penalty podľa typu úlohy, preferencií používateľa alebo historického výkonu.

Pozrime sa, ako implementovať dynamický sampling v rôznych programovacích jazykoch.

# [Python](#tab/python)

```python
# Python príklad: Dynamické vzorkovanie založené na kontexte požiadavky
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definovať prednastavenia vzorkovania pre rôzne typy úloh
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Vybrať základné prednastavenie
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Upraviť podľa preferencií používateľa, ak sú poskytnuté
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Nastaviť teplotu podľa preferencie kreativity (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Upraviť top_p podľa požadovanej rôznorodosti odpovedí
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Vytvoriť a odoslať požiadavku s vlastnými parametrami vzorkovania
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Vrátiť odpoveď s metadátami vzorkovania pre transparentnosť
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

V predchádzajúcom kóde sme:

- Vytvorili triedu `DynamicSamplingService`, ktorá spravuje adaptívny sampling.
- Definovali vzory sampleingu pre rôzne typy úloh (kreatívne, faktické, kódové, analytické).
- Vybrali základný vzor sampleingu na základe typu úlohy.
- Upravili parametre sampleingu na základe preferencií používateľa, ako sú úroveň kreativity a rôznorodosti.
- Odoslali požiadavku s dynamicky nakonfigurovanými parametrami sampleingu.
- Vrátili generovaný text spolu s použitými parametrami sampleingu a typom úlohy pre transparentnosť.
- Použili `temperature` na ovládanie náhodnosti výstupu, kde vyššie hodnoty vedú k kreatívnejším odpovediam.
- Použili `top_p` na obmedzenie výberu tokenov na tie, ktoré prispievajú k najvyššej kumulatívnej pravdepodobnosti, čím sa zvyšuje kvalita generovaného textu.
- Použili `frequency_penalty` na zníženie opakovania a podporu rôznorodosti výstupu.
- Použili `user_preferences` na umožnenie prispôsobenia parametrov sampleingu podľa používateľom definovaných úrovní kreativity a rôznorodosti.
- Použili `task_type` na určenie vhodnej stratégie sampleingu pre požiadavku, čím umožnili cielené odpovede podľa povahy úlohy.
- Použili metódu `send_request` na odoslanie promptu s nakonfigurovanými parametrami sampleingu, aby model generoval text podľa špecifikovaných požiadaviek.
- Použili `generated_text` na získanie odpovede modelu, ktorá je následne vrátená spolu s parametrami sampleingu a typom úlohy na ďalšiu analýzu alebo zobrazenie.
- Použili funkcie `min` a `max` na zaistenie, že používateľské preferencie sú ohraničené v platných rozsahoch, aby sa zabránilo neplatným konfiguráciám sampleingu.

# [JavaScript Dynamický](#tab/javascript-dynamic)

```javascript
// Príklad JavaScript: Dynamická konfigurácia vzoriek na základe kontextu používateľa
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Definujte základné profily vzoriek
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Sledovanie historickej výkonnosti
    this.performanceHistory = [];
  }
  
  // Zistiť typ úlohy z promptu
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Jednoduché heuristické rozpoznávanie - môže byť vylepšené pomocou ML klasifikácie
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
    
    // Predvolené na konverzačné, ak nie je zistený jasný typ
    return 'conversational';
  }
  
  // Vypočítať parametre vzoriek na základe kontextu a preferencií používateľa
  getSamplingParameters(prompt, context = {}) {
    // Detekovať typ úlohy
    const taskType = this.detectTaskType(prompt, context);
    
    // Získať základný profil
    let params = {...this.samplingProfiles[taskType]};
    
    // Upravte podľa preferencií používateľa
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Škálovanie od 1 do 10 na vhodný rozsah teploty
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Vyššia presnosť znamená nižšie topP (viac zameraný výber)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Vyššia konzistencia znamená nižšie tresty
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Použiť naučené úpravy z histórie výkonnosti
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Jednoduchá adaptívna logika - môže byť vylepšená sofistikovanejšími algoritmami
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Zohľadniť iba nedávnu históriu
    
    if (relevantHistory.length > 0) {
      // Vypočítať priemerné skóre výkonnosti
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Ak je výkonnosť pod prahom, upraviť parametre
      if (avgScore < 0.7) {
        // Jemná úprava smerom k bezpečnejším hodnotám
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Zaznamenať výkonnosť pre budúce úpravy
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Hodnotenie kvality odpovede od 0 do 1
    });
    
    // Obmedziť veľkosť histórie
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Získať optimalizované parametre vzoriek
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Odoslať požiadavku s optimalizovanými parametrami
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Ak používateľ poskytne spätnú väzbu, zaznamenať ju pre budúcu optimalizáciu
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

// Príklad použitia
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreatívna úloha s vlastnými preferenciami používateľa
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Vysoká kreativita (1-10)
          consistency: 3  // Nízka konzistencia (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Úloha generovania kódu
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Nízka kreativita
          precision: 8,   // Vysoká presnosť
          consistency: 9  // Vysoká konzistencia
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

V predchádzajúcom kóde sme:

- Vytvorili triedu `AdaptiveSamplingManager`, ktorá spravuje dynamický sampling na základe typu úlohy a preferencií používateľa.
- Definovali profily sampleingu pre rôzne typy úloh (kreatívne, faktické, kódové, konverzačné).
- Implementovali metódu na detekciu typu úlohy z promptu pomocou jednoduchých heuristík.
- Vypočítali parametre sampleingu na základe detegovaného typu úlohy a preferencií používateľa.
- Aplikovali naučené úpravy na základe historického výkonu za účelom optimalizácie parametrov sampleingu.
- Zaznamenali výkon pre budúce úpravy, čo umožňuje systému učiť sa z minulých interakcií.
- Odoslali požiadavky s dynamicky nakonfigurovanými parametrami sampleingu a vrátili generovaný text spolu s použitými parametrami a detegovaným typom úlohy.
- Použili:
    - `userPreferences` na prispôsobenie parametrov sampleingu podľa používateľmi definovaných úrovní kreativity, presnosti a konzistencie.
    - `detectTaskType` na určenie povahy úlohy podľa promptu, umožňujúce cielené odpovede.
    - `recordPerformance` na zaznamenanie výkonu generovaných odpovedí, čo umožňuje systému adaptovať sa a zlepšovať v priebehu času.
    - `applyLearnedAdjustments` na úpravu parametrov sampleingu na základe historického výkonu, čím sa zlepšuje schopnosť modelu generovať kvalitné odpovede.
    - `generateResponse` na zapuzdrenie celého procesu generovania odpovede s adaptívnym samplingom, čo uľahčuje volanie s rôznymi promptmi a kontextami.
    - `allowedTools` na špecifikovanie, ktoré nástroje môže model používať počas generovania, čím sa umožňujú kontextovo uvedomelé odpovede.
    - `feedbackScore` na umožnenie používateľom poskytovať spätnú väzbu o kvalite generovanej odpovede, ktorú možno využiť na ďalšie zdokonaľovanie výkonu modelu.
    - `performanceHistory` na udržiavanie záznamu predchádzajúcich interakcií, čo umožňuje systému učiť sa z minulých úspechov a neúspechov.
    - `getSamplingParameters` na dynamickú úpravu parametrov sampleingu podľa kontextu požiadavky, čo umožňuje flexibilnejšie a reagujúce správanie modelu.
    - `detectTaskType` na klasifikáciu úlohy podľa promptu, čo umožňuje systému aplikovať vhodné stratégie sampleingu pre rôzne typy požiadaviek.
    - `samplingProfiles` na definovanie základných konfigurácií sampleingu pre rôzne typy úloh, čo umožňuje rýchle úpravy podľa povahy požiadavky.

---

## Čo ďalej

- [5.7 Škálovanie](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->