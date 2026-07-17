> [ZASTARALÉ: KANDIDÁT NA VYDÁNÍ 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Vzorkování v Model Context Protocol

> **Upozornění na zastarání:** kandidát na vydání specifikace MCP `2026-07-28` označuje vzorkování jako zastaralé ve prospěch přímé integrace s API poskytovatelů LLM. Vzorkování nadále funguje ve verzi `2025-11-25` a minimálně rok po jakémkoliv formálním zastarání, takže vše v této lekci zůstává platné – ale nové návrhy serverů by měly vyhodnotit náhradní vzor. Viz [Co se mění v MCP: kandidát na vydání 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Vzorkování je výkonná funkce MCP, která umožňuje serverům požadovat doplnění LLM přes klienta, což umožňuje sofistikované agentní chování při zachování bezpečnosti a soukromí. Správná konfigurace vzorkování může dramaticky zlepšit kvalitu odpovědi a výkon. MCP poskytuje standardizovaný způsob řízení generování textu modely pomocí specifických parametrů, které ovlivňují náhodnost, kreativitu a soudržnost.

## Úvod

V této lekci prozkoumáme, jak konfigurovat parametry vzorkování v požadavcích MCP a porozumět základním mechanikám protokolu vzorkování.

## Výukové cíle

Na konci této lekce budete schopni:

- Porozumět klíčovým parametrům vzorkování dostupným v MCP.
- Konfigurovat parametry vzorkování pro různé případy použití.
- Implementovat deterministické vzorkování pro reprodukovatelné výsledky.
- Dynamicky upravovat parametry vzorkování na základě kontextu a uživatelských preferencí.
- Používat strategie vzorkování ke zlepšení výkonu modelu v různých scénářích.
- Porozumět, jak vzorkování funguje ve flow klient-server MCP.

## Jak funguje vzorkování v MCP

Průběh vzorkování v MCP probíhá těmito kroky:

1. Server pošle požadavek `sampling/createMessage` klientovi
2. Klient požadavek zkontroluje a může jej upravit
3. Klient provede vzorkování z LLM
4. Klient zkontroluje doplnění
5. Klient vrátí výsledek serveru

Tento design s lidským dohledem zajišťuje, že uživatelé mají kontrolu nad tím, co LLM vidí a generuje.

## Přehled parametrů vzorkování

MCP definuje následující parametry vzorkování, které lze konfigurovat v klientských požadavcích:

| Parametr | Popis | Typický rozsah |
|-----------|-------------|---------------|
| `temperature` | Řídí náhodnost při výběru tokenů | 0.0 - 1.0 |
| `maxTokens` | Maximální počet tokenů k vygenerování | Celé číslo |
| `stopSequences` | Vlastní sekvence, které zastaví generování při jejich výskytu | Pole řetězců |
| `metadata` | Další parametry specifické pro poskytovatele | JSON objekt |

Mnoho poskytovatelů LLM podporuje další parametry přes pole `metadata`, které mohou zahrnovat:

| Běžný rozšiřující parametr | Popis | Typický rozsah |
|-----------|-------------|---------------|
| `top_p` | Jaderné vzorkování – omezuje tokeny na horní kumulativní pravděpodobnost | 0.0 - 1.0 |
| `top_k` | Omezuje výběr tokenů na top K možností | 1 - 100 |
| `presence_penalty` | Penalizuje tokeny na základě jejich přítomnosti v dosud napsaném textu | -2.0 - 2.0 |
| `frequency_penalty` | Penalizuje tokeny na základě jejich četnosti v dosavadním textu | -2.0 - 2.0 |
| `seed` | Specifické náhodné semeno pro reprodukovatelné výsledky | Celé číslo |

## Příklad formátu požadavku

Zde je příklad požadavku na vzorkování z klienta v MCP:

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

## Formát odpovědi

Klient vrátí výsledek doplnění:

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

## Řízení lidským dohledem

Vzorkování MCP je navrženo s ohledem na lidský dohled:

- **Pro výzvy (prompty)**:
  - Klienti by měli uživatelům zobrazit navržený prompt
  - Uživatelé by měli mít možnost prompt upravit nebo zamítnout
  - Systémové prompty mohou být filtrovány nebo upraveny
  - Za začlenění kontextu odpovídá klient

- **Pro doplnění**:
  - Klienti by měli uživatelům zobrazit doplnění
  - Uživatelé by měli mít možnost doplnění upravit nebo zamítnout
  - Klienti mohou doplnění filtrovat nebo upravovat
  - Uživatelé kontrolují, který model se používá

S těmito principy se podívejme, jak implementovat vzorkování v různých programovacích jazycích se zaměřením na parametry běžně podporované u poskytovatelů LLM.

## Bezpečnostní aspekty

Při implementaci vzorkování v MCP zvažte tyto bezpečnostní doporučené postupy:

- **Validujte veškerý obsah zpráv** před jejich odesláním klientovi
- **Sanitizujte citlivé informace** z promptů a doplnění
- **Implementujte limity rychlosti** pro zabránění zneužití
- **Sledujte vzorkování na neobvyklé vzory**
- **Šifrujte data při přenosu** pomocí bezpečných protokolů
- **Řiďte soukromí uživatelských dat** dle platných předpisů
- **Auditujte požadavky na vzorkování** pro shodu a bezpečnost
- **Kontrolujte náklady** s vhodnými limity
- **Implementujte časové limity** pro požadavky na vzorkování
- **Zacházejte s chybami modelu** s patřičnými záložními mechanismy

Parametry vzorkování umožňují jemné doladění chování jazykových modelů pro dosažení požadované rovnováhy mezi deterministickými a kreativními výstupy.

Podívejme se, jak tyto parametry konfigurovat v různých programovacích jazycích.

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

V předešlém kódu jsme:

- Vytvořili MCP klienta s konkrétní URL serveru.
- Nakonfigurovali požadavek s parametry vzorkování jako `temperature`, `top_p` a `top_k`.
- Odeslali požadavek a vytiskli vygenerovaný text.
- Použili jsme:
    - `allowedTools` pro specifikaci, které nástroje může model během generování používat. V tomto případě jsme povolili nástroje `ideaGenerator` a `marketAnalyzer`, aby pomohly s generováním kreativních nápadů na aplikace.
    - `frequencyPenalty` a `presencePenalty` pro kontrolu opakování a rozmanitosti ve výstupu.
    - `temperature` pro řízení náhodnosti výstupu, kdy vyšší hodnoty vedou ke kreativnějším odpovědím.
    - `top_p` pro omezení výběru tokenů na ty, které přispívají k horní kumulativní pravděpodobnosti, což zlepšuje kvalitu generovaného textu.
    - `top_k` pro omezení modelu na top K nejpravděpodobnějších tokenů, což může pomoci generovat soudržnější odpovědi.
    - `frequencyPenalty` a `presencePenalty` pro snížení opakování a podporu rozmanitosti v generovaném textu.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript Příklad: Konfigurace teploty a Top-P vzorkování
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inicializace MCP klienta
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigurace požadavku s různými parametry vzorkování
  const creativeSampling = {
    temperature: 0.9,    // Vyšší teplota = více náhodnosti/kreativity
    topP: 0.92,          // Zvažte tokeny s pravděpodobnostní hmotou horních 92 %
    frequencyPenalty: 0.6, // Snížit opakování posloupností tokenů
    presencePenalty: 0.4   // Penalizovat tokeny, které se v textu dosud objevily
  };
  
  const factualSampling = {
    temperature: 0.2,    // Nižší teplota = více deterministické/faktické
    topP: 0.85,          // Mírně více zaměřený výběr tokenů
    frequencyPenalty: 0.2, // Minimální penalizace opakování
    presencePenalty: 0.1   // Minimální penalizace přítomnosti
  };
  
  try {
    // Odeslat dva požadavky s různými konfiguracemi vzorkování
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

V předešlém kódu jsme:

- Inicializovali MCP klienta s URL serveru a API klíčem.
- Nakonfigurovali dvě sady parametrů vzorkování: jednu pro kreativní úkoly a druhou pro faktické úkoly.
- Odeslali požadavky s těmito konfiguracemi, což umožnilo modelu používat konkrétní nástroje pro každý úkol.
- Vytiskli vygenerované odpovědi, aby demonstrovali efekty různých parametrů vzorkování.
- Použili `allowedTools` pro specifikaci nástrojů, které může model během generování použít. V tomto případě jsme povolili `ideaGenerator` a `environmentalImpactTool` pro kreativní úkoly a `factChecker` a `dataAnalysisTool` pro faktické úkoly.
- Použili `temperature` pro řízení náhodnosti výstupu, kdy vyšší hodnoty vedou ke kreativnějším odpovědím.
- Použili `top_p` pro omezení výběru tokenů na ty, které přispívají k horní kumulativní pravděpodobnosti, což zlepšuje kvalitu generovaného textu.
- Použili `frequencyPenalty` a `presencePenalty` ke snížení opakování a podpoře rozmanitosti ve výstupu.
- Použili `top_k` pro omezení modelu na top K nejpravděpodobnějších tokenů, což může pomoci generovat soudržnější odpovědi.

---

## Deterministické vzorkování

Pro aplikace vyžadující konzistentní výstupy zajišťuje deterministické vzorkování reprodukovatelné výsledky. Jak toho dosahuje? Použitím pevného náhodného semene a nastavením teploty na nulu.

Níže uvádíme ukázkovou implementaci deterministického vzorkování v různých programovacích jazycích.

# [Java](#tab/java)

```java
// Java příklad: Deterministické odpovědi s pevně nastaveným seedem
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Použití pevného seedu pro deterministické výsledky
        
        // První požadavek s pevným seedem
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nulová teplota pro maximální determinismus
            .build();
            
        // Druhý požadavek se stejným seedem
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Proveďte oba požadavky
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Odpovědi by měly být totožné díky stejnému seedu a teplotě=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

V předešlém kódu jsme:

- Vytvořili MCP klienta se specifikovanou URL serveru.
- Nakonfigurovali dva požadavky se stejným promptem, pevným semenem a nulovou teplotou.
- Odeslali oba požadavky a vytiskli vygenerovaný text.
- Ukázali, že odpovědi jsou shodné díky deterministické povaze konfigurace vzorkování (stejné semeno a teplota).
- Použili `setSeed` pro specifikaci pevného náhodného semene, čímž bylo zajištěno, že model pokaždé generuje stejný výstup pro stejný vstup.
- Nastavili `temperature` na nulu pro maximální determinismus, což znamená, že model vždy vybere nejpravděpodobnější následující token bez náhodnosti.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript příklad: Deterministické odpovědi s řízením semene
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // První požadavek s pevným semenem
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Nulová teplota pro maximální determinismus
    });
    
    // Druhý požadavek se stejným semenem a teplotou
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Třetí požadavek s jiným semenem, ale stejnou teplotou
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

V předešlém kódu jsme:

- Inicializovali MCP klienta s URL serveru.
- Nakonfigurovali dva požadavky se stejným promptem, pevným semenem a nulovou teplotou.
- Odeslali oba požadavky a vytiskli vygenerovaný text.
- Ukázali, že odpovědi jsou shodné díky deterministické povaze konfigurace vzorkování (stejné semeno a teplota).
- Použili `seed` pro specifikaci pevného náhodného semene, čímž bylo zajištěno, že model pokaždé generuje stejný výstup pro stejný vstup.
- Nastavili `temperature` na nulu pro maximální determinismus, což znamená, že model vždy vybere nejpravděpodobnější následující token bez náhodnosti.
- Použili jiné semeno pro třetí požadavek, aby ukázali, že změna semene vede k odlišným výstupům i se stejným promptem a teplotou.

---

## Dynamická konfigurace vzorkování

Inteligentní vzorkování přizpůsobuje parametry na základě kontextu a požadavků každého požadavku. To znamená dynamické upravování parametrů jako teplota, top_p a penalty podle typu úkolu, uživatelských preferencí nebo historického výkonu.

Podívejme se, jak implementovat dynamické vzorkování v různých programovacích jazycích.

# [Python](#tab/python)

```python
# Python příklad: Dynamické vzorkování na základě kontextu požadavku
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definujte přednastavení vzorkování pro různé typy úkolů
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Vyberte základní přednastavení
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Upravte podle preferencí uživatele, pokud jsou poskytnuty
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Škálujte teplotu na základě preference kreativity (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Upravte top_p podle požadované rozmanitosti odpovědí
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Vytvořte a odešlete požadavek s vlastními parametry vzorkování
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Vrátit odpověď s metadaty vzorkování pro transparentnost
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

V předešlém kódu jsme:

- Vytvořili třídu `DynamicSamplingService`, která spravuje adaptivní vzorkování.
- Definovali přednastavení vzorkování pro různé typy úkolů (kreativní, faktické, kódování, analytické).
- Vybrali základní přednastavení vzorkování na základě typu úkolu.
- Upraveny parametry vzorkování podle uživatelských preferencí, jako jsou úroveň kreativity a rozmanitosti.
- Odeslali požadavek s dynamicky nakonfigurovanými parametry vzorkování.
- Vrátili generovaný text spolu s použitými parametry vzorkování a typem úkolu pro transparentnost.
- Použili `temperature` pro řízení náhodnosti výstupu, kdy vyšší hodnoty vedou ke kreativnějším odpovědím.
- Použili `top_p` pro omezení výběru tokenů na ty, které přispívají k horní kumulativní pravděpodobnosti, což zlepšuje kvalitu generovaného textu.
- Použili `frequency_penalty` ke snížení opakování a podpoře rozmanitosti ve výstupu.
- Použili `user_preferences` pro umožnění přizpůsobení parametrů vzorkování na základě uživatelem definované úrovně kreativity a rozmanitosti.
- Použili `task_type` k určení vhodné strategie vzorkování pro požadavek, což umožňuje přizpůsobenější odpovědi na základě povahy úkolu.
- Použili metodu `send_request` k odeslání promptu s nakonfigurovanými parametry vzorkování, čímž je zajištěno, že model generuje text dle specifikovaných požadavků.
- Použili `generated_text` pro získání odpovědi modelu, která je následně vrácena spolu s parametry vzorkování a typem úkolu pro další analýzu nebo zobrazení.
- Použili funkce `min` a `max` k zajištění, že uživatelské preference jsou ohraničeny v platných rozmezích, čímž se zabrání neplatným konfiguracím vzorkování.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Příklad v JavaScriptu: Dynamická konfigurace vzorkování založená na uživatelském kontextu
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Definujte základní profily vzorkování
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Sledujte historický výkon
    this.performanceHistory = [];
  }
  
  // Detekujte typ úkolu z promptu
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Jednoduchá heuristická detekce – může být vylepšena pomocí ML klasifikace
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
    
    // Pokud není detekován jasný typ, použijte výchozí konverzační
    return 'conversational';
  }
  
  // Vypočítejte parametry vzorkování na základě kontextu a uživatelských preferencí
  getSamplingParameters(prompt, context = {}) {
    // Detekujte typ úkolu
    const taskType = this.detectTaskType(prompt, context);
    
    // Získejte základní profil
    let params = {...this.samplingProfiles[taskType]};
    
    // Upravte podle uživatelských preferencí
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Převeďte rozsah 1-10 na odpovídající rozsah teploty
        params.temperature = 0.1 + (creativity * 0.09); // 0,1-1,0
      }
      
      if (precision !== undefined) {
        // Vyšší přesnost znamená nižší topP (více zaměřený výběr)
        params.topP = 1.0 - (precision * 0.05); // 0,5-1,0
      }
      
      if (consistency !== undefined) {
        // Vyšší konzistence znamená nižší penalizace
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0,1-0,9
      }
    }
    
    // Aplikujte naučené úpravy z historie výkonu
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Jednoduchá adaptivní logika – může být vylepšena složitějšími algoritmy
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Zvažujte pouze nedávnou historii
    
    if (relevantHistory.length > 0) {
      // Vypočítejte průměrné skóre výkonu
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Pokud je výkon pod prahem, upravte parametry
      if (avgScore < 0.7) {
        // Jemná úprava směrem k bezpečnějším hodnotám
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Zaznamenejte výkon pro budoucí úpravy
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Hodnocení kvality odpovědi od 0 do 1
    });
    
    // Omezte velikost historie
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Získejte optimalizované parametry vzorkování
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Odešlete požadavek s optimalizovanými parametry
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Pokud uživatel poskytne zpětnou vazbu, zaznamenejte ji pro budoucí optimalizaci
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

// Příklad použití
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreativní úkol s vlastními uživatelskými preferencemi
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Vysoká kreativita (1-10)
          consistency: 3  // Nízká konzistence (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Úkol generování kódu
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Nízká kreativita
          precision: 8,   // Vysoká přesnost
          consistency: 9  // Vysoká konzistence
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

V předešlém kódu jsme:

- Vytvořili třídu `AdaptiveSamplingManager`, která spravuje dynamické vzorkování na základě typu úkolu a uživatelských preferencí.
- Definovali profily vzorkování pro různé typy úkolů (kreativní, faktické, kódování, konverzační).
- Implementovali metodu k detekci typu úkolu z promptu pomocí jednoduchých heuristik.
- Vypočítali parametry vzorkování na základě detekovaného typu úkolu a uživatelských preferencí.
- Použili naučené úpravy na základě historického výkonu pro optimalizaci parametrů vzorkování.
- Zaznamenávali výkon pro budoucí úpravy, takže systém se může učit z minulých interakcí.
- Odesílali požadavky s dynamicky nakonfigurovanými parametry vzorkování a vraceli vygenerovaný text spolu s použitými parametry a detekovaným typem úkolu.
- Použili:
    - `userPreferences` pro umožnění přizpůsobení parametrů vzorkování na základě uživatelem definovaných úrovní kreativity, přesnosti a konzistence.
    - `detectTaskType` k určení povahy úkolu na základě promptu, což umožňuje přizpůsobenější odpovědi.
    - `recordPerformance` k zaznamenání výkonu generovaných odpovědí, což systému umožňuje adaptovat se a zlepšovat v čase.
    - `applyLearnedAdjustments` pro modifikaci parametrů vzorkování na základě historického výkonu, což zvyšuje schopnost modelu generovat vysoce kvalitní odpovědi.
    - `generateResponse` pro zapouzdření celého procesu generování odpovědi s adaptivním vzorkováním, což usnadňuje volání s různými prompty a kontexty.
    - `allowedTools` pro specifikaci, které nástroje může model během generování používat, což umožňuje odpovědi více kontextově uvědomělé.
    - `feedbackScore` pro umožnění uživatelům poskytnout zpětnou vazbu k vysoce generované odpovědi, která může být použita k dalšímu vylepšení výkonu modelu v čase.
    - `performanceHistory` k udržování záznamu o minulých interakcích, což systému umožňuje učit se z předchozích úspěchů a neúspěchů.
    - `getSamplingParameters` pro dynamické nastavení parametrů vzorkování na základě kontextu požadavku, což umožňuje flexibilnější a responzivnější chování modelu.
    - `detectTaskType` pro klasifikaci úkolu na základě promptu, což systému umožňuje použít vhodné strategie vzorkování pro různé typy požadavků.
    - `samplingProfiles` pro definování základních konfigurací vzorkování pro různé typy úkolů, což umožňuje rychlé úpravy na základě povahy požadavku.

---

## Co dál

- [5.7 Škálování](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->