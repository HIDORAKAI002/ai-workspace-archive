> [ELAVULT: 2026-07-28 KIBOCSÁTÁSI KANDIDÁTUS](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Mintavételezés a Model Context Protocol-ban

> **Elavulási értesítés:** a `2026-07-28` MCP specifikáció kibocsátási jelöltje a Mintavételezést közvetlen integrációval az LLM szolgáltató API-ival szemben elavultként jelöli meg. A mintavételezés továbbra is működik a `2025-11-25` verzióban, és legalább egy évig az esetleges hivatalos elavulás után, így a tananyagban található információk érvényesek maradnak – de az új szerverterveknek érdemes értékelniük a helyettesítő mintát. Lásd: [Mi változik az MCP-ben: a 2026-07-28 kibocsátási jelölt](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

A mintavételezés egy erőteljes MCP funkció, amely lehetővé teszi, hogy a szerverek az ügyfélen keresztül kérjék az LLM kiegészítéseket, elősegítve kifinomult ügynökös viselkedések megvalósítását, miközben fenntartják a biztonságot és adatvédelmet. A megfelelő mintavételezési konfiguráció jelentősen javíthatja a válasz minőségét és teljesítményét. Az MCP egy szabványosított módot kínál arra, hogy hogyan generáljanak a modellek szöveget speciális paraméterekkel, melyek befolyásolják a véletlenszerűséget, kreativitást és koherenciát.

## Bevezetés

Ebben a tananyagban megvizsgáljuk, hogyan lehet konfigurálni a mintavételezési paramétereket az MCP kéréseiben, valamint megértjük a mintavételezés mögöttes protokollmechanizmusait.

## Tanulási célok

A tananyag végére képes leszel:

- Megérteni az MCP-ben elérhető fő mintavételezési paramétereket.
- Konfigurálni mintavételezési paramétereket különféle felhasználási esetekhez.
- Meghatározott mintavételezést megvalósítani reprodukálható eredményekhez.
- Dinamikusan igazítani a mintavételezési paramétereket a kontextus és a felhasználói preferenciák alapján.
- Alkalmazni mintavételezési stratégiákat a modell teljesítményének javítására különböző helyzetekben.
- Megérteni, hogyan működik a mintavételezés az MCP kliens-szerver folyamatában.

## Hogyan működik a mintavételezés az MCP-ben

Az MCP mintavételezési folyamata a következő lépésekből áll:

1. A szerver egy `sampling/createMessage` kérést küld az ügyfélnek
2. Az ügyfél felülvizsgálja a kérelmet, és módosíthatja azt
3. Az ügyfél mintát vesz az LLM-ből
4. Az ügyfél felülvizsgálja a kiegészítést
5. Az ügyfél visszaküldi az eredményt a szervernek

Ez az emberi beavatkozást biztosító tervezés garantálja, hogy a felhasználók irányításuk alatt tarthatják, mit lát és generál az LLM.

## Mintavételezési paraméterek áttekintése

Az MCP a következő mintavételezési paramétereket definiálja az ügyfél kérések konfigurálásához:

| Paraméter | Leírás | Tipikus tartomány |
|-----------|-------------|---------------|
| `temperature` | Szabályozza a tokenválasztás véletlenszerűségét | 0.0 - 1.0 |
| `maxTokens` | A generálandó tokenek maximális száma | Egész szám |
| `stopSequences` | Egyedi sorozatok, melyek találatakor leáll a generálás | String tömb |
| `metadata` | További, szolgáltató-specifikus paraméterek | JSON objektum |

Sok LLM szolgáltató támogat további paramétereket a `metadata` mezőn keresztül, melyek közül néhány:

| Gyakori kiterjesztési paraméter | Leírás | Tipikus tartomány |
|-----------|-------------|---------------|
| `top_p` | Nucleus mintavételezés – korlátozza a tokeneket a legmagasabb kumulatív valószínűségre | 0.0 - 1.0 |
| `top_k` | Korlátozza a tokenválasztást a legjobb K opcióra | 1 - 100 |
| `presence_penalty` | Bünteti a tokeneket az eddigi előfordulások alapján | -2.0 - 2.0 |
| `frequency_penalty` | Bünteti a tokeneket az eddigi gyakoriságuk alapján | -2.0 - 2.0 |
| `seed` | Konkrét véletlenszám-generátor mag reprodukálható eredményekhez | Egész szám |

## Példa kérés formátumára

Íme egy példa egy MCP mintavételezési kérésre az ügyféltől:

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

## Válasz formátum

Az ügyfél egy kiegészítési eredményt küld vissza:

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

## Emberi beavatkozásos vezérlések

Az MCP mintavételezést emberi felügyelettel tervezték:

- **Kérés esetén**:
  - Az ügyfelek mutassák meg a felhasználóknak a javasolt kérést
  - A felhasználók módosíthassák vagy elutasíthassák a kéréseket
  - A rendszerkérések szűrhetők vagy módosíthatók
  - A kontextus bevonása az ügyfél ellenőrzése alatt áll

- **Kiegészítések esetén**:
  - Az ügyfelek mutassák meg a felhasználóknak a kiegészítést
  - A felhasználók módosíthassák vagy elutasíthassák a kiegészítéseket
  - Az ügyfelek szűrhetik vagy módosíthatják a kiegészítéseket
  - A felhasználók irányíthatják, mely modellt használják

Ezekkel az alapelvekkel nézzük meg, hogyan valósítható meg a mintavételezés különböző programozási nyelveken, a leggyakrabban támogatott paraméterekre összpontosítva az LLM szolgáltatók körében.

## Biztonsági megfontolások

Az MCP mintavételezésének megvalósításakor a következő biztonsági bevált gyakorlatokat tartsuk szem előtt:

- **Validáld az összes üzenettartalmat** mielőtt elküldenéd az ügyfélnek
- **Tisztítsd meg az érzékeny információkat** a kérésekből és kiegészítésekből
- **Vezess be sebességkorlátokat** a visszaélések megakadályozására
- **Figyeld a mintavételezés használatát** rendellenes minták esetén
- **Titkosítsd az adatokat átvitel közben** biztonságos protokollokkal
- **Kezeld a felhasználói adatvédelmet** a vonatkozó szabályozásoknak megfelelően
- **Auditáld a mintavételezési kéréseket** megfelelőség és biztonság érdekében
- **Szabályozd a költség kitettséget** megfelelő limitekkel
- **Alkalmazz időkorlátokat** a mintavételezési kérésekre
- **Kezeld a modell hibáit kifinomultan** megfelelő megoldásokkal

A mintavételezési paraméterek finomhangolják a nyelvi modellek viselkedését, hogy elérjük a kívánt egyensúlyt a determinisztikus és kreatív kimenetek között.

Nézzük meg, hogyan konfigurálhatók ezek a paraméterek különböző programozási nyelveken.

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

- Létrehoztunk egy MCP ügyfelet egy adott szerver URL-lel.
- Konfiguráltunk egy kérést mintavételezési paraméterekkel, mint `temperature`, `top_p` és `top_k`.
- Elküldtük a kérést és kiírtuk a generált szöveget.
- Használtuk:
    - `allowedTools` megadására, mely eszközöket használhat a modell a generálás során. Ebben az esetben engedélyeztük az `ideaGenerator` és `marketAnalyzer` eszközöket kreatív alkalmazásötletek generálásához.
    - `frequencyPenalty` és `presencePenalty` az ismétlés és változatosság szabályozására a kimenetben.
    - `temperature`, hogy szabályozzuk a kimenet véletlenszerűségét, ahol a magasabb értékek kreatívabb válaszokat eredményeznek.
    - `top_p`, hogy korlátozza a tokenválasztást a legmagasabb kumulatív valószínűség hozzájárulású tokenekre a generált szöveg jobb minősége érdekében.
    - `top_k`, hogy korlátozza a modellt a legjobb K legvalószínűbb tokenre, ami segíthet összefüggőbb válaszok generálásában.
    - `frequencyPenalty` és `presencePenalty` az ismétlés csökkentésére és változatosság ösztönzésére a generált szövegben.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript példa: Hőmérséklet és Top-P mintavételezési konfiguráció
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP kliens inicializálása
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Kérés konfigurálása különböző mintavételezési paraméterekkel
  const creativeSampling = {
    temperature: 0.9,    // Magasabb hőmérséklet = több véletlenszerűség/kreativitás
    topP: 0.92,          // Az össz valószínűségi tömeg 92%-ával rendelkező tokenek figyelembevétele
    frequencyPenalty: 0.6, // Token szekvenciák ismétlődésének csökkentése
    presencePenalty: 0.4   // Büntetés azoknak a tokeneknek, amelyek eddig megjelentek a szövegben
  };
  
  const factualSampling = {
    temperature: 0.2,    // Alacsonyabb hőmérséklet = inkább determinisztikus/tény alapú
    topP: 0.85,          // Kissé fókuszáltabb token kiválasztás
    frequencyPenalty: 0.2, // Minimális ismétlési büntetés
    presencePenalty: 0.1   // Minimális jelenléti büntetés
  };
  
  try {
    // Két kérés küldése különböző mintavételezési konfigurációkkal
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

- Inicializáltunk egy MCP ügyfelet szerver URL-lel és API kulccsal.
- Konfiguráltunk két mintavételezési paraméter csoportot: egyet kreatív feladatokhoz, egyet tényszerű feladatokhoz.
- Elküldtük a kéréseket ezekkel a konfigurációkkal, lehetővé téve a modell számára, hogy adott feladathoz specifikus eszközöket használjon.
- Kinyomtattuk a generált válaszokat, hogy bemutassuk a különböző mintavételezési paraméterek hatását.
- Használtuk az `allowedTools`-t, hogy meghatározzuk, mely eszközöket használhat a modell a generálás során. Ebben az esetben engedélyeztük az `ideaGenerator` és `environmentalImpactTool` eszközöket a kreatív feladatokhoz, valamint a `factChecker` és `dataAnalysisTool` eszközöket tényszerű feladatokhoz.
- Használtuk a `temperature`-t a kimenet véletlenszerűségének szabályozására, ahol a magasabb értékek kreatívabb válaszokat eredményeznek.
- Használtuk a `top_p`-t, hogy korlátozzuk a tokenválasztást a legmagasabb kumulatív valószínűségű tokenekre, javítva a generált szöveg minőségét.
- Használtuk a `frequencyPenalty` és `presencePenalty`-t az ismétlés csökkentésére és a kimenet változatosságának ösztönzésére.
- Használtuk a `top_k`-t, hogy korlátozzuk a modellt a legjobb K legvalószínűbb tokenre, ami segíthet koherensebb válaszokat generálni.

---

## Determinisztikus mintavételezés

Olyan alkalmazásokhoz, amelyek következetes eredményeket igényelnek, a determinisztikus mintavételezés biztosítja a reprodukálható kimeneteket. Ezt úgy éri el, hogy rögzített véletlenszám-generátor magot használ, illetve a hőmérsékletet nullára állítja.

Nézzük meg az alábbi példát, amely különböző programozási nyelveken demonstrálja a determinisztikus mintavételezést.

# [Java](#tab/java)

```java
// Java példa: Determinisztikus válaszok rögzített maggal
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Rögzített mag használata determinisztikus eredményekhez
        
        // Első kérés rögzített maggal
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nulla hőmérséklet a maximális determinizmusért
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
        
        // A válaszoknak azonosnak kell lenniük az azonos mag és a 0 hőmérséklet miatt
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Az előző kódban:

- Létrehoztunk egy MCP ügyfelet adott szerver URL-lel.
- Konfiguráltunk két kérést azonos prompttal, rögzített maggal és nulla hőmérséklettel.
- Mindkét kérést elküldtük és kiírtuk a generált szöveget.
- Bemutattuk, hogy a válaszok azonosak a mintavételezés determinisztikus jellege miatt (azonos mag és hőmérséklet).
- Használtuk a `setSeed`-et a rögzített véletlenszám-generátor mag megadására, biztosítva, hogy a modell ugyanazt a kimenetet adja ugyanarra a bemenetre mindig.
- A hőmérsékletet nulla értékre állítottuk a maximális determinisztikusság eléréséhez, azaz a modell mindig az legvalószínűbb következő tokent választja véletlenszerűség nélkül.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript példa: Determinisztikus válaszok magvezérléssel
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Első lekérés fix maggal
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Nulla hőmérséklet a maximális determinisztikusságért
    });
    
    // Második lekérés ugyanazzal a maggal és hőmérséklettel
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Harmadik lekérés különböző maggal, de ugyanolyan hőmérséklettel
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

- Inicializáltunk egy MCP ügyfelet szerver URL-lel.
- Konfiguráltunk két kérést azonos prompttal, rögzített maggal és nulla hőmérséklettel.
- Mindkét kérést elküldtük és kiírtuk a generált szöveget.
- Bemutattuk, hogy a válaszok azonosak a mintavételezés determinisztikus jellege miatt (azonos mag és hőmérséklet).
- Használtuk a `seed`-et a rögzített véletlenszám-generátor mag megadására, biztosítva, hogy a modell mindig ugyanazt az eredményt generálja ugyanarra a bemenetre.
- A hőmérsékletet nulla értékre állítottuk a maximális determinisztikusság érdekében, azaz a modell mindig a legvalószínűbb következő tokent választja véletlenszerűség nélkül.
- Egy másik magot használtunk a harmadik kéréshez, hogy bemutassuk, a mag változtatásával eltérő kimeneteket kapunk, még azonos prompt és hőmérséklet mellett is.

---

## Dinamikus mintavételezési konfiguráció

Az intelligens mintavételezés a kontextus és az egyes kérések igényei alapján állítja be a paramétereket. Ez azt jelenti, hogy dinamikusan igazítja a hőmérsékletet, a top_p-t és a büntetéseket a feladattípus, a felhasználói preferenciák vagy a korábbi teljesítmény alapján.

Nézzük meg, hogyan valósítható meg a dinamikus mintavételezés különböző programozási nyelveken.

# [Python](#tab/python)

```python
# Python példa: Dinamikus mintavételezés a kérés kontextusa alapján
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Mintavételi előbeállítások meghatározása különböző feladattípusokhoz
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Alap előbeállítás kiválasztása
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Igény esetén felhasználói preferenciák alapján igazítás
        if user_preferences:
            if "creativity_level" in user_preferences:
                # A hőmérséklet skálázása a kreativitás preferencia szerint (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # A top_p értékének igazítása a kívánt válaszsokféleség alapján
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Kérés létrehozása és küldése egyéni mintavételi paraméterekkel
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Válasz visszaadása a mintavételezési metaadatokkal a transzparencia érdekében
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Az előző kódban:

- Létrehoztunk egy `DynamicSamplingService` osztályt, amely az adaptív mintavételezést kezeli.
- Meghatároztunk mintavételezési előbeállításokat különféle feladattípusokhoz (kreatív, tényszerű, kód, analitikus).
- Kiválasztottuk az alap mintavételezési előbeállítást a feladattípus alapján.
- Igazítottuk a mintavételezési paramétereket a felhasználói preferenciák (pl. kreativitás szintje és változatosság) alapján.
- Elküldtük a kérést a dinamikusan konfigurált mintavételezési paraméterekkel.
- Visszaadtuk a generált szöveget a használt mintavételezési paraméterekkel és feladattípussal együtt az átláthatóság érdekében.
- Használtuk a `temperature`-t a kimenet véletlenszerűségének szabályozására, ahol a magasabb értékek kreatívabb válaszokat eredményeznek.
- Használtuk a `top_p`-t, hogy korlátozzuk a tokenválasztást a legmagasabb kumulatív valószínűséget képviselő tokenekre, javítva a generált szöveg minőségét.
- Használtuk a `frequency_penalty`-t az ismétlődések csökkentésére és a változatosság ösztönzésére a kimeneten.
- Használtuk a `user_preferences`-t, hogy a felhasználó által meghatározott kreativitás és változatosság alapján személyre szabjuk a mintavételezési paramétereket.
- Használtuk a `task_type`-ot a megfelelő mintavételezési stratégia meghatározásához az adott kéréshez, lehetővé téve a feladat jellegéhez igazított válaszokat.
- Használtuk a `send_request` metódust, hogy elküldjük a promptot a konfigurált mintavételezési paraméterekkel, biztosítva, hogy a modell az előírt feltételek szerint generáljon szöveget.
- Használtuk a `generated_text`-et a modell válaszának lekérésére, amely visszaküldésre kerül a mintavételezési paraméterekkel és feladattípussal további elemzés vagy megjelenítés céljából.
- Használtuk a `min` és `max` függvényeket, hogy biztosítsuk, hogy a felhasználói preferenciák érvényes tartományba essenek, megelőzve a hibás mintavételezési konfigurációkat.

# [JavaScript Dinamikus](#tab/javascript-dynamic)

```javascript
// JavaScript példa: Dinamikus mintavételezési konfiguráció felhasználói kontextus alapján
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Alap mintavételezési profilok meghatározása
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Korábbi teljesítmény követése
    this.performanceHistory = [];
  }
  
  // Feladat típusának felismerése a promptból
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Egyszerű heurisztikus felismerés - gépi tanulással továbbfejleszthető
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
    
    // Alapértelmezett beállítás beszélgetéses esetben, ha nincs egyértelmű típus
    return 'conversational';
  }
  
  // Mintavételezési paraméterek kiszámítása a kontextus és felhasználói preferenciák alapján
  getSamplingParameters(prompt, context = {}) {
    // A feladat típusának felismerése
    const taskType = this.detectTaskType(prompt, context);
    
    // Alapprofil lekérése
    let params = {...this.samplingProfiles[taskType]};
    
    // Felhasználói preferenciák szerinti igazítás
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 skáláról megfelelő hőmérsékleti tartományra történő átalakítás
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Magasabb precizitás alacsonyabb topP-t jelent (koncentráltabb kiválasztás)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Magasabb konzisztencia alacsonyabb büntetést jelent
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Korábbi teljesítmény alapján tanult igazítások alkalmazása
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Egyszerű adaptív logika - fejlettebb algoritmusokkal továbbfejleszthető
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Csak a legutóbbi előzményeket vesszük figyelembe
    
    if (relevantHistory.length > 0) {
      // Átlagos teljesítményértékek kiszámítása
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Ha a teljesítmény küszöb alatt van, paraméterek igazítása
      if (avgScore < 0.7) {
        // Enyhe beállítás biztonságosabb értékek felé
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Teljesítmény rögzítése a későbbi igazításhoz
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 közötti értékelés a válasz minőségére
    });
    
    // Az előzmények méretének korlátozása
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Optimalizált mintavételezési paraméterek lekérése
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Kérés küldése optimalizált paraméterekkel
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Ha a felhasználó visszajelzést ad, azt a későbbi optimalizációhoz rögzíteni kell
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
          consistency: 3  // Alacsony konzisztencia (1-10)
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
          precision: 8,   // Magas precizitás
          consistency: 9  // Magas konzisztencia
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

- Létrehoztunk egy `AdaptiveSamplingManager` osztályt, amely a feladattípus és a felhasználói preferenciák alapján kezeli a dinamikus mintavételezést.
- Meghatároztunk mintavételezési profilokat különböző feladattípusokhoz (kreatív, tényszerű, kód, beszélgetés).
- Implementáltunk egy metódust, amely egyszerű heurisztikák alapján észleli a feladat típusát a promptból.
- Kiszámítottuk a mintavételezési paramétereket a felismert feladattípus és a felhasználói preferenciák alapján.
- Alkalmaztuk a tanult módosításokat a korábbi teljesítmény alapján a mintavételezési paraméterek optimalizálására.
- Rögzítettük a teljesítményt a jövőbeli módosításokhoz, lehetővé téve a rendszer számára a múltbeli interakciókból való tanulást.
- Elküldtük a dinamikusan konfigurált mintavételezési paraméterekkel ellátott kéréseket, majd visszaadtuk a generált szöveget az alkalmazott paraméterekkel és az észlelt feladattípussal együtt.
- Használtuk:
    - `userPreferences`, hogy a felhasználó által definiált kreativitási, precizitási és következetességi szintek alapján személyre szabjuk a mintavételezési paramétereket.
    - `detectTaskType`, hogy a prompt alapján meghatározzuk a feladat jellegét, így célzottabb válaszokat adva.
    - `recordPerformance`, hogy naplózzuk a generált válaszok teljesítményét, lehetővé téve a rendszer folyamatos alkalmazkodását és fejlesztését.
    - `applyLearnedAdjustments`, hogy a korábbi teljesítmény alapján módosítsuk a mintavételezési paramétereket, javítva a modell minőségét.
    - `generateResponse`, amely az egész adaptív mintavételezési folyamatot magába foglalja, megkönnyítve a különböző promptok és kontextusok kezelését.
    - `allowedTools`, hogy megadjuk, mely eszközöket használhat a modell generáláshoz, lehetővé téve a kontextusra érzékenyebb válaszokat.
    - `feedbackScore`, hogy a felhasználók visszajelzést adhassanak a generált válasz minőségéről, amely felhasználható a modell teljesítményének további finomítására.
    - `performanceHistory`, hogy nyilvántartsuk a korábbi interakciókat, lehetővé téve a rendszer számára a múlt sikeréből és hibáiból való tanulást.
    - `getSamplingParameters`, hogy dinamikusan állítsuk be a mintavételezési paramétereket a kérés kontextusa alapján, rugalmasságot és reagálóképességet biztosítva a modell viselkedésében.
    - `detectTaskType`, hogy osztályozzuk a feladatot a prompt alapján, így a rendszer megfelelő mintavételezési stratégiát alkalmazhat különféle kérés típusokon.
    - `samplingProfiles`, hogy alap mintavételezési konfigurációkat definiáljunk különböző feladattípusokhoz, gyors beállítást engedve a kérés jellegétől függően.

---

## Mi a következő lépés

- [5.7 Skálázás](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->