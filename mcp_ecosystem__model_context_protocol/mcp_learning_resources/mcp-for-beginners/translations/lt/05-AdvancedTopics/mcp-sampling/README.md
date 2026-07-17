> [PASENĘS: 2026-07-28 LEIDIMO KANDIDATAS](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Atranka Model Context Protocol

> **Perspėjimas dėl pasenimo:** `2026-07-28` MCP specifikacijos leidimo kandidatas žymi Atranką kaip pasenusią, vietoje jos skatinama tiesioginė integracija su LLM tiekėjų API. Atranka veikia `2025-11-25` versijoje ir bent metus po formalaus pasenimo, todėl visa šio pamokos medžiaga išlieka galiojanti – bet nauji serverių dizainai turėtų įvertinti pakaitinį modelį. Žr. [Kas keičiasi MCP: 2026-07-28 leidimo kandidatas](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Atranka yra galinga MCP funkcija, leidžianti serveriams prašyti LLM užbaigimų per klientą, taip įgalinant sudėtingą agentinį elgesį ir tuo pačiu išlaikant saugumą bei privatumą. Tinkama atrankos konfigūracija gali ženkliai pagerinti atsakymų kokybę ir našumą. MCP suteikia standartizuotą būdą kontroliuoti, kaip modeliai generuoja tekstą naudojant konkrečius parametrus, kurie veikia atsitiktinumą, kūrybiškumą ir nuoseklumą.

## Įvadas

Šioje pamokoje nagrinėsime, kaip konfigūruoti atrankos parametrus MCP užklausose ir suprasti pagrindinę atrankos protokolo mechaniką.

## Mokymosi tikslai

Pamokos pabaigoje gebėsite:

- Suprasti pagrindinius MCP prieinamus atrankos parametrus.
- Konfigūruoti atrankos parametrus skirtingiems naudojimo atvejams.
- Įgyvendinti determinuotą atranką norint gauti kartojamus rezultatus.
- Dinamiškai pritaikyti atrankos parametrus pagal kontekstą ir vartotojo pageidavimus.
- Taikyti atrankos strategijas, kad pagerintumėte modelio našumą įvairiose situacijose.
- Suprasti, kaip veikia atranka kliento-serverio MCP sraute.

## Kaip veikia atranka MCP

Atrankos eiga MCP vyksta tokiomis stadijomis:

1. Serveris siunčia `sampling/createMessage` užklausą klientui
2. Klientas peržiūri užklausą ir gali ją pakeisti
3. Klientas atlieka atranką iš LLM
4. Klientas peržiūri užbaigimą
5. Klientas pateikia rezultatą serveriui

Šis žmogus-procede dizainas užtikrina, kad vartotojai išlaiko kontrolę, ką LLM mato ir generuoja.

## Atrankos parametrų apžvalga

MCP apibrėžia šiuos atrankos parametrus, kurie gali būti konfigūruojami kliento užklausose:

| Parametras | Aprašymas | Įprastas diapazonas |
|-----------|-------------|---------------------|
| `temperature` | Kontroliuoja atsitiktinumą pasirenkant žodžius | 0.0 - 1.0 |
| `maxTokens` | Maksimalus sugeneruotų žodžių skaičius | Sveikasis skaičius |
| `stopSequences` | Pasirinktinių sekų, stabdančių generavimą, rinkinys | Stringų masyvas |
| `metadata` | Papildomi tiekėjui būdingi parametrai | JSON objektas |

Daugelis LLM tiekėjų palaiko papildomus parametrus per `metadata` lauką, kurie gali būti:

| Įprastas papildomas parametras | Aprašymas | Įprastas diapazonas |
|-----------|-------------|---------------------|
| `top_p` | Nucleus atranka – riboja žodžius pagal kumuliatyvią ties viršutine riba | 0.0 - 1.0 |
| `top_k` | Ribojama žodžių pasirinkimui pagal viršutinius K variantus | 1 - 100 |
| `presence_penalty` | Bauda žodžiams pagal jų pasirodymą tekstuose iki šiol | -2.0 - 2.0 |
| `frequency_penalty` | Bauda žodžiams pagal jų dažnį tekstuose iki šiol | -2.0 - 2.0 |
| `seed` | Konkretus atsitiktinis sėklos numeris kartojamiems rezultatams | Sveikasis skaičius |

## Užklausos pavyzdys

Štai pavyzdys, kaip paprašyti atrankos kliente MCP:

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

## Atsakymo formatas

Klientas pateikia užbaigimo rezultatą:

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

## Žmogus kontrolei cikle

MCP atranka sukurta remiantis žmogaus priežiūra:

- **Skatinimams (prompts)**:
  - Klientai turėtų rodyti vartotojams siūlomą skatinimą
  - Vartotojai turėtų galėti pakeisti arba atmesti skatinimus
  - Sisteminiai skatinimai gali būti filtruojami arba keičiami
  - Konteksto įtraukimą kontroliuoja klientas

- **Užbaigimams (completions)**:
  - Klientai turėtų rodyti vartotojams užbaigimą
  - Vartotojai turėtų galėti pakeisti arba atmesti užbaigimus
  - Klientai gali filtruoti arba keisti užbaigimus
  - Vartotojai valdo, kuris modelis yra naudojamas

Turėdami šias principus omenyje, pažvelkime, kaip įgyvendinti atranką skirtingomis programavimo kalbomis, daugiausiai dėmesio skiriant parametrams, kuriuos dažniausiai palaiko LLM tiekėjai.

## Saugos svarstymai

Įgyvendinant atranką MCP, atkreipkite dėmesį į šias gerąsias saugumo praktikas:

- **Patikrinkite visą žinutės turinį** prieš siųsdami jį klientui
- **Išskalaukite jautrią informaciją** iš skatinimų ir užbaigimų
- **Įgyvendinkite dažnio ribojimus,** kad išvengtumėte piktnaudžiavimo
- **Stebėkite atrankos naudojimą** neįprastiems modeliams aptikti
- **Užšifruokite perduodamus duomenis** naudodami saugius protokolus
- **Rūpinkitės vartotojo duomenų privatumu** pagal atitinkamus reglamentus
- **Audituokite atrankos užklausas** siekiant atitikimo ir saugumo
- **Valdykite kaštų riziką** nustatydami tinkamas ribas
- **Įgyvendinkite užklausų laiko apribojimus (timeouts)**
- **Kreipkitės tinkamai į modelio klaidas** su atitinkamomis alternatyvomis

Atrankos parametrai leidžia tiksliai reguliuoti kalbos modelių elgesį siekiant norimo balanso tarp determinuotų bei kūrybiškų atsakymų.

Pažvelkime, kaip konfigūruoti šiuos parametrus skirtingomis programavimo kalbomis.

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

Ankstesniame kode mes:

- Sukūrėme MCP klientą su konkrečiu serverio URL.
- Konfigūravome užklausą su atrankos parametrais, tokiomis kaip `temperature`, `top_p` ir `top_k`.
- Išsiuntėme užklausą ir atspausdinome sugeneruotą tekstą.
- Naudojome:
    - `allowedTools`, kad nurodytume, kokias priemones modelis gali naudoti generavimo metu. Šiuo atveju leidome `ideaGenerator` ir `marketAnalyzer` įrankius kūrybinių idėjų generavimui.
    - `frequencyPenalty` ir `presencePenalty`, kad kontroliuotume teksto kartojimą ir įvairovę.
    - `temperature`, kuris kontroliuoja atsitiktinumą generuojant, kur aukštesnės reikšmės sukuria kūrybiškesnius atsakymus.
    - `top_p`, apribojant žodžių pasirinkimą iki tų, kurie sudaro geriausią kumuliatyvią tikimybę, gerinant sugeneruoto teksto kokybę.
    - `top_k`, ribojant modelį prie labiausiai tikėtinų K žodžių, kas padeda generuoti labiau nuoseklius atsakymus.
    - `frequencyPenalty` ir `presencePenalty`, kad sumažintume kartojimą ir skatintume tekstų įvairovę.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript pavyzdys: temperatūros ir Top-P mėginių ėmimo konfigūracija
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inicializuoti MCP klientą
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigūruoti užklausą su skirtingais mėginių ėmimo parametrais
  const creativeSampling = {
    temperature: 0.9,    // Aukštesnė temperatūra = daugiau atsitiktinumo/kūrybiškumo
    topP: 0.92,          // Žiūrėti į simbolius su 92 % viršutine tikimybių mase
    frequencyPenalty: 0.6, // Sumažinti simbolių sekų pasikartojimą
    presencePenalty: 0.4   // Bausti simbolius, kurie pasirodė tekste iki šiol
  };
  
  const factualSampling = {
    temperature: 0.2,    // Žemesnė temperatūra = labiau deterministinė/faktinė
    topP: 0.85,          // Šiek tiek labiau susikoncentravęs simbolių pasirinkimas
    frequencyPenalty: 0.2, // Minimalus pasikartojimo bausmės taikymas
    presencePenalty: 0.1   // Minimalus buvimo bausmės taikymas
  };
  
  try {
    // Siųsti dvi užklausas su skirtinga mėginių ėmimo konfigūracija
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

Ankstesniame kode mes:

- Inicializavome MCP klientą su serverio URL ir API raktu.
- Konfigūravome dvi atrankos parametrų rinkinius: vieną kūrybingiems užduotims, kitą – faktų tikrinimui.
- Išsiuntėme užklausas su šiomis konfiguracijomis, leidžiant modeliui naudoti specifinius įrankius kiekvienai užduočiai.
- Atspausdinome sugeneruotus atsakymus, kad pademonstruotume skirtingų atrankos parametrų poveikį.
- Naudojome `allowedTools`, kad nurodytume, kokias priemones modelis gali naudoti generavimo metu. Šiuo atveju kūrybinėms užduotims leidome `ideaGenerator` ir `environmentalImpactTool`, o faktų tikrinimui – `factChecker` ir `dataAnalysisTool`.
- Naudojome `temperature` kontroliuoti atsitiktinumą generuojant, kur aukštesnės reikšmės lemia kūrybiškesnius atsakymus.
- Naudojome `top_p`, ribojant žodžių pasirinkimą iki tų, kurie sudaro geriausią kumuliatyvią tikimybę, gerinant sugeneruoto teksto kokybę.
- Naudojome `frequencyPenalty` ir `presencePenalty` mažinti kartojimą ir skatinti įvairovę išėjime.
- Naudojome `top_k` riboti modelį prie labiausiai tikėtinų K žodžių, kas padeda generuoti labiau nuoseklius atsakymus.

---

## Determinuota atranka

Programėlėms, kurioms reikalingi nuoseklūs rezultatai, determinuota atranka užtikrina kartojamus atsakymus. Tai daroma naudojant fiksuotą atsitiktinį sėklos numerį ir temperatūros nustatymą į nulį.

Žemiau pateikiamas pavyzdinis įgyvendinimas, demonstruojantis determinuotą atranką skirtingomis programavimo kalbomis.

# [Java](#tab/java)

```java
// Java pavyzdys: deterministiniai atsakymai su fiksuotu sėklos numeriu
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Naudojant fiksuotą sėklą deterministinėms rezultatams gauti
        
        // Pirmasis užklausimas su fiksuotu sėklos numeriu
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nulinė temperatūra maksimaliai deterministiškumui
            .build();
            
        // Antrasis užklausimas su ta pačia sėkla
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Vykdyti abu užklausimus
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Atsakymai turėtų būti identiški dėl tos pačios sėklos ir temperatūros=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Ankstesniame kode mes:

- Sukūrėme MCP klientą su nurodytu serverio URL.
- Konfigūravome dvi užklausas su tuo pačiu skatinimu, fiksuotu sėklos numeriu ir nulinės temperatūros reikšme.
- Išsiuntėme abi užklausas ir atspausdinome sugeneruotą tekstą.
- Pademonstravome, kad atsakymai yra identiški dėl determinuotos atrankos konfigūracijos (tas pats sėklos numeris ir temperatūra).
- Naudojome `setSeed`, kad nurodytume fiksuotą atsitiktinį sėklos numerį, užtikrinantį, kad modelis kiekvieną kartą sugeneruotų tą patį išėjimą tam pačiam įvesties duomenų rinkiniui.
- Nustatėme `temperature` į nulį, kad būtų maksimalus determinizmas, t. y. modelis visuomet pasirinkins tikėtinesnį kitą žodį be atsitiktinių svyravimų.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript pavyzdys: deterministiniai atsakymai su sėklos kontrole
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Pirmas užklausimas su fiksuota sėkla
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Nulinė temperatūra maksimaliai determinizmui
    });
    
    // Antras užklausimas su ta pačia sėkla ir temperatūra
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Trečias užklausimas su skirtinga sėkla, bet ta pačia temperatūra
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

Ankstesniame kode mes:

- Inicializavome MCP klientą su serverio URL.
- Konfigūravome dvi užklausas su tuo pačiu skatinimu, fiksuotu sėklos numeriu ir nulinės temperatūros reikšme.
- Išsiuntėme abi užklausas ir atspausdinome sugeneruotą tekstą.
- Pademonstravome, kad atsakymai yra identiški dėl determinuotos atrankos konfigūracijos (tas pats sėklos numeris ir temperatūra).
- Naudojome `seed`, kad nurodytume fiksuotą atsitiktinį sėklos numerį, užtikrinantį, kad modelis kiekvieną kartą sugeneruotų tą patį išėjimą tam pačiam įvesties duomenų rinkiniui.
- Nustatėme `temperature` į nulį, kad būtų maksimalus determinizmas, t. y. modelis visuomet pasirinkins tikėtinesnį kitą žodį be atsitiktinių svyravimų.
- Trečiajai užklausai panaudojome kitą sėklos numerį, kad parodytume, jog jį pakeitus, net su tokiu pačiu skatinimu ir temperatūra, gaunami skirtingi rezultatai.

---

## Dinaminė atrankos konfigūracija

Išmanioji atranka pritaiko parametrus pagal užklausos kontekstą ir reikalavimus. Tai reiškia, kad dinamiškai koreguojami tokie parametrai kaip temperatūra, top_p ir baudos, priklausomai nuo užduoties tipo, vartotojo pageidavimų ar ankstesnio našumo.

Pažvelkime, kaip įgyvendinti dinaminę atranką skirtingomis programavimo kalbomis.

# [Python](#tab/python)

```python
# Python pavyzdys: dinaminis atranka pagal užklausos kontekstą
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Apibrėžti atrankos iš anksto nustatytas reikšmes skirtingiems užduočių tipams
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Pasirinkti pagrindinę iš anksto nustatytą reikšmę
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Koreguoti pagal vartotojo pageidavimus, jei jie pateikti
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Koreguoti temperatūrą pagal kūrybiškumo lygį (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Koreguoti top_p pagal norimą atsakymų įvairovę
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Sukurti ir išsiųsti užklausą su pasirinktinais atrankos parametrais
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Grąžinti atsakymą su atrankos metaduomenimis skaidrumui užtikrinti
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Ankstesniame kode mes:

- Sukūrėme `DynamicSamplingService` klasę, kuri valdo adaptuotą atranką.
- Apibrėžėme atrankos nustatymus skirtingoms užduočių rūšims (kūrybinė, faktinė, kodas, analitinė).
- Pasirinkome bazinius atrankos nustatymus pagal užduoties tipą.
- Pritaikėme atrankos parametrus pagal vartotojo pageidavimus, tokius kaip kūrybiškumo lygis ir įvairovė.
- Išsiuntėme užklausą su dinamiškai sukonfigūruotais atrankos parametrais.
- Gavome sugeneruotą tekstą kartu su pritaikytais atrankos parametrais ir užduoties tipu skaidrumui.
- Naudojome `temperature`, kad kontroliuotume generavimo atsitiktinumą, kuriame didesnės reikšmės reiškia kūrybiškesnius atsakymus.
- Naudojome `top_p`, kad apribotume žodžių pasirinkimą iki tų, kurie sudaro aukščiausią kumuliatyvią tikimybę, gerindami teksto kokybę.
- Naudojome `frequency_penalty`, kad sumažintume kartojimą ir skatintume įvairiapusiškumą išėjime.
- Naudojome `user_preferences`, leidžiantį daryti personalizuotą atrankos parametrų konfigūraciją pagal vartotojo apibrėžtus kūrybiškumo ir įvairovės lygius.
- Naudojome `task_type`, kad nustatytume tinkamą atrankos strategiją pagal užduoties pobūdį, leidžiant labiau pritaikytus atsakymus.
- Naudojome `send_request` metodą siųsti skatinimą su konfigūruotais parametrais, užtikrindami, kad modelis generuos tekstą pagal reikalavimus.
- Naudojome `generated_text`, kad gautume modelio atsakymą, kuris yra grąžinamas kartu su atrankos parametrais ir užduoties tipu tolimesnei analizei ar rodymui.
- Naudojome `min` ir `max` funkcijas, kad vartotojo pageidavimai būtų ribojami leistinuose intervaluose, išvengiant klaidingų atrankos konfigūracijų.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript Pavyzdys: Dinaminė mėginių ėmimo konfigūracija pagal vartotojo kontekstą
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Apibrėžkite pagrindinius mėginių ėmimo profilius
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Sekite istorinį našumą
    this.performanceHistory = [];
  }
  
  // Nustatykite užduoties tipą pagal tekstą
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Paprasta heuristinė detekcija – gali būti patobulinta naudojant ML klasifikaciją
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
    
    // Jei tipas nėra aiškus, numatytas pokalbio režimas
    return 'conversational';
  }
  
  // Apskaičiuokite mėginių ėmimo parametrus pagal kontekstą ir vartotojo nuostatas
  getSamplingParameters(prompt, context = {}) {
    // Nustatyti užduoties tipą
    const taskType = this.detectTaskType(prompt, context);
    
    // Gautas pagrindinis profilis
    let params = {...this.samplingProfiles[taskType]};
    
    // Reguliuoti pagal vartotojo nuostatas
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Mastelį nuo 1 iki 10 į tinkamą temperatūros diapazoną
        params.temperature = 0.1 + (creativity * 0.09); // 0,1-1,0
      }
      
      if (precision !== undefined) {
        // Didesnis tikslumas reiškia mažesnį topP (didesnis fokusavimas)
        params.topP = 1.0 - (precision * 0.05); // 0,5-1,0
      }
      
      if (consistency !== undefined) {
        // Didesnis nuoseklumas reiškia mažesnius bausmių lygius
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0,1-0,9
      }
    }
    
    // Taikyti išmoktas korekcijas pagal našumo istoriją
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Paprasta adaptacinė logika – gali būti patobulinta sudėtingesniais algoritmais
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Atkreipti dėmesį tik į neseną istoriją
    
    if (relevantHistory.length > 0) {
      // Apskaičiuokite vidutinius našumo balus
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Jei našumas žemesnis nei slenkstis, koreguokite parametrus
      if (avgScore < 0.7) {
        // Šiek tiek patikslinti link saugesnių reikšmių
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Įrašykite našumo duomenis būsimoms korekcijoms
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 įvertinimas atsakymo kokybei
    });
    
    // Riboti istorijos dydį
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Gauti optimizuotus mėginių ėmimo parametrus
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Siųsti užklausą su optimizuotais parametrais
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Jei vartotojas pateikia atsiliepimą, įrašykite jį būsimai optimizacijai
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

// Naudojimo pavyzdys
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kūrybinė užduotis su individualiomis vartotojo nuostatomis
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Aukštas kūrybiškumas (1-10)
          consistency: 3  // Žemas nuoseklumas (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Kodo generavimo užduotis
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Žemas kūrybiškumas
          precision: 8,   // Aukštas tikslumas
          consistency: 9  // Aukštas nuoseklumas
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

Ankstesniame kode mes:

- Sukūrėme `AdaptiveSamplingManager` klasę, kuri valdo dinaminę atranką pagal užduoties tipą ir vartotojo pageidavimus.
- Apibrėžėme atrankos profilius skirtingoms užduočių rūšims (kūrybinė, faktinė, kodas, pokalbių).
- Įgyvendinome metodą aptikti užduoties tipą iš skatinimo, naudojant paprastus heuristinius metodus.
- Apskaičiavome atrankos parametrus pagal aptiktą užduoties tipą ir vartotojo pageidavimus.
- Pritaikėme išmoktas korekcijas pagal ankstesnį našumą optimizuoti atrankos parametrus.
- Įrašėme veiklos rezultatus ateities koregavimams, leidžiant sistemai mokytis iš ankstesnių sąveikų.
- Išsiuntėme užklausas su dinamiškai sukonfigūruotais atrankos parametrais ir pateikėme sugeneruotą tekstą kartu su parametrais ir aptiktu užduoties tipu.
- Naudojome:
    - `userPreferences`, leidžiantį suasmeninti atrankos parametrus pagal vartotojo apibrėžtus kūrybiškumo, tikslumo ir nuoseklumo lygius.
    - `detectTaskType`, kad nustatytume užduoties pobūdį pagal skatinimą, leidžiant taikyti tinkamas atrankos strategijas skirtingiems užklausų tipams.
    - `recordPerformance`, registruoti sugeneruotų atsakymų našumą, leidžiant sistemai prisitaikyti ir gerinti laikui bėgant.
    - `applyLearnedAdjustments`, koreguoti atrankos parametrus remiantis ankstesniu našumu, pagerinant modelio gebėjimą generuoti kokybiškus atsakymus.
    - `generateResponse`, apjungti visą procesą generuoti atsakymą su adaptyvia atranka, palengvinant kvietimą su skirtingais skatinimais ir kontekstais.
    - `allowedTools`, nurodyti, kokias priemones modelis gali naudoti generavimo metu, leidžiant suteikti daugiau konteksto informacijos.
    - `feedbackScore`, leisti vartotojams pateikti atsiliepimus apie sugeneruoto atsakymo kokybę, kuriuos galima naudoti modelio našumo tobulinimui.
    - `performanceHistory`, saugoti ankstesnių sąveikų įrašus, leidžiant sistemai mokytis iš sėkmių ir nesėkmių.
    - `getSamplingParameters`, dinamiškai keisti atrankos parametrus pagal užklausos kontekstą, suteikiant lankstesnį ir jautresnį modelio elgesį.
    - `detectTaskType`, klasifikuoti užduotį pagal skatinimą, leidžiant sistemai taikyti tinkamas atrankos strategijas skirtingoms užklausų rūšims.
    - `samplingProfiles`, apibrėžti bazines atrankos konfigūracijas skirtingoms užduočių rūšims, leidžiant greitai pritaikyti priklausomai nuo užduoties pobūdžio.

---

## Kas toliau

- [5.7 Masto keitimas](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->