# Mintavételezés a Model Kontextus Protokollban

A mintavételezés egy erőteljes MCP funkció, amely lehetővé teszi a szerverek számára, hogy LLM befejezéseket kérjenek az ügyfélen keresztül, elősegítve a kifinomult, ügynöki viselkedéseket, miközben megőrzik a biztonságot és az adatvédelmet. A megfelelő mintavételezési konfiguráció drámaian javíthatja a válasz minőségét és teljesítményét. Az MCP szabványosított módot kínál arra, hogyan generálnak a modellek szöveget, meghatározott paraméterekkel, amelyek befolyásolják a véletlenszerűséget, kreativitást és koherenciát.

## Bevezetés

Ebben a leckében megvizsgáljuk, hogyan lehet konfigurálni a mintavételezési paramétereket MCP kérésekben, valamint megértjük a mintavételezés mögöttes protokoll mechanizmusait.

## Tanulási célok

A lecke végére képes leszel:

- Megérteni az MCP-ben elérhető kulcsmintavételezési paramétereket.
- Beállítani mintavételezési paramétereket különböző felhasználási esetekhez.
- Megvalósítani determinisztikus mintavételezést reprodukálható eredményekhez.
- Dinamikusan igazítani a mintavételezési paramétereket a kontextus és a felhasználói preferenciák alapján.
- Alkalmazni mintavételezési stratégiákat a modell teljesítményének javítására különféle helyzetekben.
- Megérteni, hogyan működik a mintavételezés az MCP kliens-szerver folyamatában.

## Hogyan működik a mintavételezés az MCP-ben

Az MCP mintavételezési folyamata a következő lépéseket követi:

1. A szerver küld egy `sampling/createMessage` kérést az ügyfélnek
2. Az ügyfél átnézi a kérést és módosíthatja azt
3. Az ügyfél mintát vesz egy LLM-ből
4. Az ügyfél átnézi a befejezést
5. Az ügyfél visszaküldi az eredményt a szervernek

Ez az emberi beavatkozással tervezett modell biztosítja, hogy a felhasználók ellenőrzésük alatt tartsák, mit lát és generál a LLM.

## Mintavételezési paraméterek áttekintése

Az MCP az alábbi mintavételezési paramétereket határozza meg, amelyek konfigurálhatók ügyfélkérésekben:

| Paraméter | Leírás | Tipikus tartomány |
|-----------|-------------|---------------|
| `temperature` | A token kiválasztás véletlenszerűségének vezérlése | 0.0 - 1.0 |
| `maxTokens` | Generálandó maximális tokenek száma | Egész érték |
| `stopSequences` | Egyedi szekvenciák, amelyek találatkor leállítják a generálást | Karaktersorozatok tömbje |
| `metadata` | További, szolgáltató-specifikus paraméterek | JSON objektum |

Sok LLM szolgáltató támogat további paramétereket a `metadata` mezőn keresztül, amelyek közé tartozhatnak:

| Gyakori bővítő paraméter | Leírás | Tipikus tartomány |
|-----------|-------------|---------------|
| `top_p` | Nucleus mintavételezés - korlátozza a tokeneket a legnagyobb kumulatív valószínűséghez | 0.0 - 1.0 |
| `top_k` | A token kiválasztás korlátozása a legjobb K opcióra | 1 - 100 |
| `presence_penalty` | Bünteti a szövegben már előfordult tokeneket | -2.0 - 2.0 |
| `frequency_penalty` | Bünteti tokenek gyakoriságát a szövegben | -2.0 - 2.0 |
| `seed` | Egy adott véletlenszám-generátor mag a reprodukálható eredményekhez | Egész érték |

## Kéréspélda formátuma

Íme egy példa arra, hogyan kérhetjük le a mintavételezést egy ügyféltől MCP-ben:

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

## Válasz formátuma

Az ügyfél visszaküld egy befejezési eredményt:

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

## Emberi felügyelet a folyamatban

Az MCP mintavételezés emberi ellenőrzéssel készült:

- **A promptok esetén**:
  - Az ügyfeleknek meg kell mutatniuk a felhasználóknak a javasolt promptot
  - A felhasználóknak módosíthatniuk vagy visszautasíthatniuk kell a promptokat
  - A rendszer promptokat szűrhetik vagy módosíthatják
  - A kontextus bevonását az ügyfél irányítja

- **A befejezéseknél**:
  - Az ügyfeleknek meg kell mutatniuk a felhasználóknak a befejezést
  - A felhasználóknak módosíthatniuk vagy visszautasíthatniuk kell a befejezéseket
  - Az ügyfelek szűrhetik vagy módosíthatják a befejezéseket
  - A felhasználók vezérlik, mely modell használatos

Ezekkel az elvekkel a háttérben nézzük meg, hogyan valósítható meg a mintavételezés különböző programozási nyelveken, különösen azokat a paramétereket, amelyeket a legtöbb LLM szolgáltató támogat.

## Biztonsági megfontolások

MCP-ben történő mintavételezés megvalósításakor az alábbi biztonsági legjobb gyakorlatokat érdemes betartani:

- **Érvényesíts minden üzenettartalmat** mielőtt elküldöd az ügyfélnek
- **Tisztítsd meg az érzékeny információkat** a promptokból és befejezésekből
- **Vezess be korlátozásokat** a túlzott használat megakadályozására
- **Figyeld a mintavételezés használatát** szokatlan mintákért
- **Titkosítsd az adatokat átvitel közben** biztonságos protokollokkal
- **Kezeld a felhasználói adatvédelmet** a vonatkozó szabályozások szerint
- **Ellenőrizd a mintavételezési kéréseket** megfelelőség és biztonság szempontjából
- **Szabályozd a költségeket** megfelelő korlátokkal
- **Alkalmazz időkorlátokat** a mintavételezési kérésekre
- **Kezeld a modellhibákat kifinomultan** megfelelő tartalék megoldásokkal

A mintavételezési paraméterek lehetővé teszik, hogy finomhangoljuk a nyelvi modellek viselkedését az elvárt egyensúly eléréséhez a determinisztikus és kreatív kimenetek között.

Nézzük meg, hogyan állíthatóak be ezek a paraméterek különböző programozási nyelveken.

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

Az előző kódban:

- Létrehoztunk egy MCP klienst egy adott szerver URL-lel.
- Konfiguráltunk egy kérést mintavételezési paraméterekkel, mint például `temperature`, `top_p` és `top_k`.
- Elküldtük a kérést, és kiírtuk a generált szöveget.
- Használtuk:
    - `allowedTools` megadására, hogy mely eszközöket használhat a modell a generálás során. Ebben az esetben engedélyeztük az `ideaGenerator` és `marketAnalyzer` eszközöket, hogy segítsék kreatív alkalmazásötletek generálását.
    - `frequencyPenalty` és `presencePenalty` a kimenet ismétlődésének és változatosságának szabályozására.
    - `temperature` a kimenet véletlenszerűségének szabályozására, ahol magasabb értékek kreatívabb válaszokat eredményeznek.
    - `top_p` a tokenek kiválasztásának korlátozására, hogy a legnagyobb kumulatív valószínűségű tokenekhez tartozzanak, javítva ezzel a generált szöveg minőségét.
    - `top_k` a modell korlátozására a legvalószínűbb K tokenre, ami elősegíti a koherensebb válaszokat.
    - `frequencyPenalty` és `presencePenalty` az ismétlődés csökkentésére és a változatosság növelésére a generált szövegben.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript példa: Hőmérséklet és Top-P mintavételezési konfiguráció
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inicializálja az MCP klienst
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Kérés konfigurálása különböző mintavételezési paraméterekkel
  const creativeSampling = {
    temperature: 0.9,    // Magasabb hőmérséklet = több véletlenszerűség/kreativitás
    topP: 0.92,          // A tokeneket a felső 92%-os valószínűségi tömeggel vegye figyelembe
    frequencyPenalty: 0.6, // Csökkentse a token sorozatok ismétlődését
    presencePenalty: 0.4   // Büntesse az eddig szövegben megjelent tokeneket
  };
  
  const factualSampling = {
    temperature: 0.2,    // Alacsonyabb hőmérséklet = determinisztikusabb/tényalapúbb
    topP: 0.85,          // Kicsit fókuszáltabb token kiválasztás
    frequencyPenalty: 0.2, // Minimális ismétlődési büntetés
    presencePenalty: 0.1   // Minimális jelenléti büntetés
  };
  
  try {
    // Küldjön két kérést különböző mintavételezési konfigurációkkal
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

Az előző kódban:

- Inicializáltunk egy MCP klienst szerver URL-lel és API kulccsal.
- Két készlet mintavételezési paramétert állítottunk be: az egyik kreatív feladatokra, a másik tényszerű feladatokra.
- Elküldtünk kéréseket ezekkel a beállításokkal, lehetővé téve, hogy a modell adott eszközöket használjon minden feladat során.
- Kiírtuk a generált válaszokat a különböző mintavételezési paraméterek hatásainak bemutatására.
- Használtuk az `allowedTools`-t, hogy megadjuk, mely eszközöket használhat a modell a generálás során. Ebben az esetben engedélyeztük az `ideaGenerator` és `environmentalImpactTool` eszközöket kreatív feladatokhoz, valamint a `factChecker` és `dataAnalysisTool` eszközöket tényszerű feladatokhoz.
- Használtuk a `temperature`-t a kimenet véletlenszerűségének szabályozására, ahol a magasabb értékek kreatívabb válaszokat eredményeznek.
- Használtuk a `top_p`-t a tokenek kiválasztásának korlátozására, hogy a legnagyobb kumulatív valószínűségű tokenek közé tartozzanak, javítva a generált szöveg minőségét.
- Használtuk a `frequencyPenalty` és `presencePenalty` paramétereket az ismétlődés csökkentésére és a változatosság elősegítésére a kimenetben.
- Használtuk a `top_k`-t, hogy korlátozzuk a modellt a legvalószínűbb K tokenre, ami elősegíti a koherensebb válaszokat.

---

## Determinisztikus mintavételezés

Olyan alkalmazások esetén, ahol következetes kimenetek szükségesek, a determinisztikus mintavételezés biztosítja a reprodukálható eredményeket. Ez úgy valósul meg, hogy rögzített véletlenszám-magot használunk és a hőmérsékletet nullára állítjuk.

Nézzük meg az alábbi mintapéldát, amely bemutatja a determinisztikus mintavételezést különböző programozási nyelveken.

# [Java](#tab/java)

```java
// Java példa: Determinisztikus válaszok rögzített maggal
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Rögzített mag használata a determinisztikus eredményekhez
        
        // Első kérés rögzített maggal
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nulla hőmérséklet a maximális determinisztikusságért
            .build();
            
        // Második kérés ugyanazzal a maggal
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Mindkét kérés végrehajtása
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // A válaszoknak azonosaknak kell lenniük a ugyanaz miatt a mag és hőmérséklet=0 miatt
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Az előző kódban:

- Létrehoztunk egy MCP klienst megadott szerver URL-lel.
- Két kérést konfiguráltunk ugyanazzal a prompttal, rögzített maggal és nulla hőmérséklettel.
- Mindkét kérést elküldtük és kiírtuk a generált szöveget.
- Bemutattuk, hogy a válaszok azonosak a mintavételezési konfiguráció determinisztikus jellege miatt (ugyanaz a mag és hőmérséklet).
- Használtuk a `setSeed`-et a rögzített véletlenszám-mag megadására, biztosítva, hogy a modell ugyanazt a kimenetet generálja ugyanarra a bemenetre minden alkalommal.
- Beállítottuk a `temperature`-t nullára, hogy maximális determinizmust érjünk el, vagyis a modell mindig a legvalószínűbb következő tokent választja véletlenszerűség nélkül.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript példa: Determinisztikus válaszok mag vezérléssel
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Első kérés rögzített maggal
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Nulla hőmérséklet a maximális determinisztikához
    });
    
    // Második kérés ugyanazzal a maggal és hőmérséklettel
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Harmadik kérés különböző maggal, de ugyanazzal a hőmérséklettel
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

Az előző kódban:

- Inicializáltunk egy MCP klienst szerver URL-lel.
- Két kérést konfiguráltunk ugyanazzal a prompttal, rögzített maggal és nulla hőmérséklettel.
- Mindkét kérést elküldtük és kiírtuk a generált szöveget.
- Bemutattuk, hogy a válaszok azonosak a mintavételezési konfiguráció determinisztikus jellege miatt (ugyanaz a mag és hőmérséklet).
- Használtuk a `seed`-et a rögzített véletlenszám-mag megadására, biztosítva, hogy a modell ugyanazt a kimenetet generálja ugyanarra a bemenetre minden alkalommal.
- Beállítottuk a `temperature`-t nullára, hogy maximális determinizmust érjünk el, vagyis a modell mindig a legvalószínűbb következő tokent választja véletlenszerűség nélkül.
- Egy harmadik kéréshez másik magot használtunk, hogy megmutassuk, a mag változtatása eltérő kimeneteket eredményez, még azonos prompt és hőmérséklet mellett is.

---

## Dinamikus mintavételezési konfiguráció

Az intelligens mintavételezés a paramétereket a kérés kontextusa és követelményei szerint állítja be. Ez azt jelenti, hogy dinamikusan módosítja a paramétereket, mint a hőmérséklet, top_p és büntetések, a feladat típusa, a felhasználói preferenciák vagy a történelmi teljesítmény alapján.

Nézzük meg, hogyan valósítható meg a dinamikus mintavételezés különböző programozási nyelveken.

# [Python](#tab/python)

```python
# Python példa: Dinamikus mintavételezés a kérés kontextusa alapján
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Mintavételi előbeállítások definiálása különböző feladattípusokhoz
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Alap előbeállítás kiválasztása
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Beállítás a felhasználói preferenciák alapján, ha megadott
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Hőmérséklet méretezése a kreativitási preferencia (1-10) alapján
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # top_p beállítása a kívánt válaszváltozatosság szerint
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Egyéni mintavételezési paraméterekkel kérés létrehozása és küldése
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Válasz visszaadása mintavételi metaadatokkal az átláthatóság érdekében
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Az előző kódban:

- Létrehoztunk egy `DynamicSamplingService` osztályt, amely kezeli az adaptív mintavételezést.
- Meghatároztunk mintavételezési előbeállításokat különböző feladattípusokhoz (kreatív, tényszerű, kód, analitikus).
- A feladattípus alapján kiválasztottuk az alap mintavételezési előbeállítást.
- A felhasználói preferenciák, például a kreativitási és változatossági szint alapján módosítottuk a mintavételezési paramétereket.
- Elküldtük a kérést a dinamikusan konfigurált mintavételezési paraméterekkel.
- Visszaadtuk a generált szöveget, valamint a használt mintavételezési paramétereket és a feladat típusát az átláthatóság érdekében.
- Használtuk a `temperature`-t a kimenet véletlenszerűségének szabályozására, ahol magasabb értékek kreatívabb válaszokat eredményeznek.
- Használtuk a `top_p`-t a tokenek kiválasztásának korlátozására, hogy a legnagyobb kumulatív valószínűséghez tartozzanak, javítva a generált szöveg minőségét.
- Használtuk a `frequency_penalty`-t az ismétlődés csökkentésére és a változatosság ösztönzésére a kimenetben.
- Használtuk a `user_preferences`-t, hogy a felhasználó által meghatározott kreativitási és változatossági szintek alapján testreszabhassuk a mintavételezési paramétereket.
- Használtuk a `task_type`-ot, hogy meghatározzuk a megfelelő mintavételezési stratégiát a kéréshez, lehetővé téve a feladat természetétől függő pontosabb válaszokat.
- Használtuk a `send_request` metódust a konfigurált mintavételezési paraméterekkel ellátott prompt elküldésére, biztosítva, hogy a modell a megadott követelmények szerint generáljon szöveget.
- Használtuk a `generated_text`-et, hogy lekérjük a modell válaszát, amely aztán visszaadásra került a mintavételezési paraméterekkel és a feladattípussal együtt további elemzés vagy megjelenítés céljából.
- Használtuk a `min` és `max` függvényeket annak biztosítására, hogy a felhasználói preferenciák érvényes tartományok között legyenek, megakadályozva érvénytelen mintavételezési konfigurációkat.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript példa: Dinamikus mintavételi konfiguráció a felhasználói kontextus alapján
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Alap mintavételi profilok meghatározása
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // A történelmi teljesítmény nyomon követése
    this.performanceHistory = [];
  }
  
  // Feladat típusának észlelése a promptból
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Egyszerű heurisztikus detektálás - továbbfejleszthető ML osztályozással
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
    
    // Ha nincs egyértelmű típus, alapértelmezettként beszélgetős mód
    return 'conversational';
  }
  
  // Mintavételi paraméterek kiszámítása a kontextus és a felhasználói preferenciák alapján
  getSamplingParameters(prompt, context = {}) {
    // A feladat típusának észlelése
    const taskType = this.detectTaskType(prompt, context);
    
    // Alapprofil lekérése
    let params = {...this.samplingProfiles[taskType]};
    
    // Felhasználói preferenciák szerinti igazítás
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 skáláról megfelelő hőmérséklet tartományra átalakítás
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Minél magasabb a pontosság, annál alacsonyabb a topP (koncentráltabb kiválasztás)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Minél magasabb az állandóság, annál alacsonyabb a büntetés
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Teljesítménytörténetből tanult beállítások alkalmazása
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Egyszerű adaptív logika - fejleszthető kifinomultabb algoritmusokkal
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Csak a legfrissebb történelmet figyelembe venni
    
    if (relevantHistory.length > 0) {
      // Átlagos teljesítményértékek kiszámítása
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Ha a teljesítmény a küszöb alatti, paraméterek módosítása
      if (avgScore < 0.7) {
        // Enyhe igazítás biztonságosabb értékek felé
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Teljesítmény rögzítése jövőbeli igazításokhoz
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1-es válaszminőségi értékelés
    });
    
    // Történet méretének korlátozása
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Optimalizált mintavételi paraméterek lekérése
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Kérés küldése optimalizált paraméterekkel
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Ha a felhasználó visszajelzést ad, rögzíteni a jövőbeli optimalizációhoz
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

// Példa használat
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreatív feladat egyedi felhasználói preferenciákkal
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Magas kreativitás (1-10)
          consistency: 3  // Alacsony állandóság (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Kódgenerálási feladat
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Alacsony kreativitás
          precision: 8,   // Magas pontosság
          consistency: 9  // Magas állandóság
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

Az előző kódban:

- Létrehoztunk egy `AdaptiveSamplingManager` osztályt, amely kezeli a dinamikus mintavételezést a feladattípus és a felhasználói preferenciák alapján.
- Meghatároztunk mintavételezési profilokat különböző feladattípusokhoz (kreatív, tényszerű, kód, beszélgetés-alapú).
- Megvalósítottunk egy módszert, amely egyszerű heuristikák segítségével felismeri a prompt feladattípusát.
- Kiszámítottuk a mintavételezési paramétereket a feladattípus és a felhasználói preferenciák alapján.
- Alkalmaztuk a múltbeli teljesítmény alapján tanult korrekciókat a mintavételezési paraméterek optimalizálásához.
- Rögzítettük a teljesítményt a jövőbeni módosításokhoz, lehetővé téve a rendszer számára a múltbeli interakciókból való tanulást.
- Kéréseket küldtünk dinamikusan konfigurált mintavételezési paraméterekkel, és visszaadtuk a generált szöveget a használt paraméterekkel és a felismert feladattípussal együtt.
- Használtuk:
    - `userPreferences` a mintavételezési paraméterek testreszabására a felhasználó által definiált kreativitás, precizitás és következetesség szintek alapján.
    - `detectTaskType` a feladat természetének meghatározására a prompt alapján, lehetővé téve a feladatnak megfelelő mintavételezési stratégiák alkalmazását.
    - `recordPerformance` a generált válaszok teljesítményének naplózására, elősegítve a rendszer alkalmazkodását és javulását az idő múlásával.
    - `applyLearnedAdjustments` a mintavételezési paraméterek módosítására a múltbeli teljesítmény alapján, javítva a modell képességét a magas minőségű válaszok generálására.
    - `generateResponse` a teljes mintavételezési folyamat kapszulázására, megkönnyítve a hívást különböző promptok és kontextusok esetén.
    - `allowedTools` megadására, hogy mely eszközöket használhat a modell a generálás során, lehetővé téve a kontextusra érzékeny válaszokat.
    - `feedbackScore` a felhasználók számára, hogy visszajelzést adjanak a generált válasz minőségéről, amelyet a modell teljesítményének további finomhangolására lehet használni.
    - `performanceHistory` a korábbi interakciók nyilvántartására, lehetővé téve a rendszer számára, hogy tanuljon a korábbi sikerekből és hibákból.
    - `getSamplingParameters` a mintavételezési paraméterek dinamikus beállítására a kérés kontextusa alapján, így rugalmasabb és reagálóbb modell viselkedést biztosítva.
    - `detectTaskType` a feladat osztályozására a prompt alapján, lehetővé téve a rendszer számára a különböző típusú kérésekhez megfelelő mintavételezési stratégiák alkalmazását.
    - `samplingProfiles` az alap mintavételezési konfigurációk meghatározására különböző feladattípusokhoz, megkönnyítve a gyors beállítást a kérés jellegétől függően.

---

## Mi jön ezután

- [5.7 Skálázás](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->