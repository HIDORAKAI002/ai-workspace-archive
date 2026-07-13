# Imtinis modelio konteksto protokole

Imtinis yra galinga MCP funkcija, leidžianti serveriams per klientą prašyti LLM baiginių, taip leidžiant sudėtingą agentišką elgesį ir tuo pačiu užtikrinant saugumą bei privatumą. Teisinga imtinio konfigūracija gali dramatiškai pagerinti atsakymų kokybę ir veikimą. MCP suteikia standartizuotą būdą kontroliuoti, kaip modeliai generuoja tekstą pagal specifinius parametrus, kurie įtakoja atsitiktinumą, kūrybiškumą ir nuoseklumą.

## Įvadas

Šioje pamokoje nagrinėsime, kaip konfigūruoti imtinio parametrus MCP užklausose ir suprasti imtinio pagrindines protokolo mechanikas.

## Mokymosi tikslai

Pamokos pabaigoje mokėsite:

- Suprasti pagrindinius MCP galimus imtinio parametrus.
- Konfigūruoti imtinio parametrus įvairiems panaudojimo atvejams.
- Įgyvendinti deterministinį imtinį reproducijai užtikrinti.
- Dinamiškai derinti imtinio parametrus pagal kontekstą ir vartotojo pageidavimus.
- Taikyti imtinio strategijas modelio našumo gerinimui įvairiose situacijose.
- Suprasti, kaip imtinis veikia klientų-serverio MCP sraute.

## Kaip veikia imtinis MCP

Imtinio srautas MCP vyksta taip:

1. Serveris siunčia `sampling/createMessage` užklausą klientui
2. Klientas peržiūri užklausą ir gali ją modifikuoti
3. Klientas ima mėginį iš LLM
4. Klientas peržiūri baigimą
5. Klientas grąžina rezultatą serveriui

Šis žmogiškas valdymas užtikrina, kad naudotojai kontroliuoja, ką LLM mato ir generuoja.

## Imtinio parametrų apžvalga

MCP apibrėžia šiuos imtinio parametrus, kuriuos galima konfigūruoti klientų užklausose:

| Parametras | Aprašymas | Tipinis intervalas |
|-----------|-------------|---------------|
| `temperature` | Kontroliuoja atsitiktinumą žodžių pasirinkime | 0.0 - 1.0 |
| `maxTokens` | Maksimalus sugeneruotų žodžių skaičius | Sveikasis skaičius |
| `stopSequences` | Specialios sekos, sustabdančios generavimą | Eilučių masyvas |
| `metadata` | Papildomi tiekėjui specifiniai parametrai | JSON objektas |

Daugelis LLM tiekėjų palaiko papildomus parametrus per `metadata` lauką, kuris gali apimti:

| Bendrai paplitęs plėtinio parametras | Aprašymas | Tipinis intervalas |
|-----------|-------------|---------------|
| `top_p` | Nucleus imtinys - riboja žodžius iki viršutinės kumuliatyvinės tikimybės | 0.0 - 1.0 |
| `top_k` | Riboja pasirinkimą iki viršutinių K variantų | 1 - 100 |
| `presence_penalty` | Baudo žodžius, atsižvelgiant į jų buvimą tekste iki šiol | -2.0 - 2.0 |
| `frequency_penalty` | Baudo žodžius pagal jų dažnumą tekste iki šiol | -2.0 - 2.0 |
| `seed` | Konkretus atsitiktinis sėklos skaičius reproducijai | Sveikasis skaičius |

## Užklausos pavyzdžio formatas

Štai pavyzdys, kaip prašyti imtinio iš kliento MCP:

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

Klientas grąžina baigimo rezultatą:

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

## Žmogus cikle valdymas

MCP imtinys projektuotas atsižvelgiant į žmogaus priežiūrą:

- **Dėl užklausų**:
  - Klientai turėtų rodyti naudotojams siūlomą užklausą
  - Vartotojai turėtų galėti keisti arba atmesti užklausas
  - Sistemos užklausos gali būti filtruojamos arba keistos
  - Konteksto įtraukimas kontroliuojamas kliento

- **Dėl baigimų**:
  - Klientai turėtų rodyti naudotojams baigimą
  - Vartotojai turėtų galėti keisti arba atmesti baigimus
  - Klientai gali filtruoti arba modifikuoti baigimus
  - Naudotojai kontroliuoja, kuris modelis naudojamas

Turėdami šias principus, pažvelkime, kaip įgyvendinti imtinį įvairiomis programavimo kalbomis, akcentuodami parametrus, kuriuos dažnai palaiko LLM tiekėjai.

## Saugumo svarstymai

Įgyvendinant imtinį MCP, atsižvelkite į šias saugumo gerąsias praktikas:

- **Patikrinkite visą žinutės turinį** prieš siųsdami jį klientui
- **Valykite jautrią informaciją** iš užklausų ir baigimų
- **Įgyvendinkite apsaugos nuo piktnaudžiavimo ribas**
- **Stebėkite imtinio naudojimą** dėl neįprastų modelių
- **Užšifruokite duomenis tranzitu** naudodami saugius protokolus
- **Tvarkykite naudotojų duomenų privatumą** pagal galiojančius reglamentus
- **Atlikite imtinio užklausų auditą** atitikties ir saugumo tikslais
- **Kontroliuokite išlaidų patiriamus kiekius** su tinkamomis ribomis
- **Įgyvendinkite laiko apribojimus** imtinio užklausoms
- **Tvarkykite modelių klaidas maloniai** su tinkamomis atsargomis

Imtinio parametrai leidžia tiksliai reguliuoti kalbos modelių elgesį, siekiant pasiekti norimą deterministinį ir kūrybinį išėjimą pusiausvyrą.

Pažiūrėkime, kaip konfigūruoti šiuos parametrus įvairiomis programavimo kalbomis.

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
- Konfigūravome užklausą imtinio parametrais, tokiais kaip `temperature`, `top_p` ir `top_k`.
- Išsiuntėme užklausą ir atspausdinome sugeneruotą tekstą.
- Naudojome:
    - `allowedTools`, nurodant, kokius įrankius modelis gali naudoti generavimo metu. Šiuo atveju leidome `ideaGenerator` ir `marketAnalyzer` įrankius kūrybingų programėlių idėjų generavimui.
    - `frequencyPenalty` ir `presencePenalty`, kontroliuojančius pasikartojimą ir įvairovę išvestyje.
    - `temperature`, kontroliuojantį išvesties atsitiktinumą, kai didesnės reikšmės skatina kūrybiškesnius atsakymus.
    - `top_p`, ribojantį žodžių pasirinkimą iki tų, kurie prisideda prie aukščiausios kumuliatyvinės tikimybės masės ir gerina sugeneruoto teksto kokybę.
    - `top_k`, apribojantį modelį prie top K tikėtiniausių žodžių, kas padeda generuoti nuoseklesnius atsakymus.
    - `frequencyPenalty` ir `presencePenalty`, mažinančius pasikartojimus ir skatinančius įvairovę sugeneruotame tekste.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript pavyzdys: temperatūros ir Top-P imties nustatymai
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inicializuoti MCP klientą
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigūruoti užklausą su skirtingais imties parametrais
  const creativeSampling = {
    temperature: 0.9,    // Didesnė temperatūra = daugiau atsitiktinumo/kūrybiškumo
    topP: 0.92,          // Apsvarstyti žodžius su viršutinių 92 % tikimybės mase
    frequencyPenalty: 0.6, // Sumažinti žodžių sekų kartojimąsi
    presencePenalty: 0.4   // Bausti žodžius, kurie jau pasirodė tekste
  };
  
  const factualSampling = {
    temperature: 0.2,    // Mažesnė temperatūra = labiau deterministinė/faktinė
    topP: 0.85,          // Šiek tiek labiau koncentruotas žodžių pasirinkimas
    frequencyPenalty: 0.2, // Minimalus kartojimo bausmės taikymas
    presencePenalty: 0.1   // Minimalus buvimo bausmės taikymas
  };
  
  try {
    // Siųsti dvi užklausas su skirtingais imties nustatymais
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
- Konfigūravome du imtinio parametrų rinkinius: vieną kūrybinėms užduotims, kitą faktinėms užduotims.
- Siuntėme užklausas su šiomis konfigūracijomis, leidžiant modeliu naudoti specifinius įrankius kiekvienai užduočiai.
- Išspausdinome sugeneruotus atsakymus parodydami skirtingų imtinio parametrų poveikį.
- Naudojome `allowedTools`, nurodant, kokius įrankius modelis gali naudoti generavimo metu. Šiuo atveju leidome `ideaGenerator` ir `environmentalImpactTool` kūrybinėms užduotims, ir `factChecker` bei `dataAnalysisTool` faktinėms užduotims.
- Naudojome `temperature`, kontroliuojantį išvesties atsitiktinumą, kai didesnės reikšmės skatina kūrybiškesnius atsakymus.
- Naudojome `top_p`, ribojantį žodžių pasirinkimą iki tų, kurie prisideda prie aukščiausios kumuliatyvinės tikimybės masės ir gerina sugeneruoto teksto kokybę.
- Naudojome `frequencyPenalty` ir `presencePenalty`, mažinančius pasikartojimus ir skatinančius įvairovę išvestyje.
- Naudojome `top_k`, apribojantį modelį prie top K tikėtiniausių žodžių, kas padeda generuoti nuoseklesnius atsakymus.

---

## Deterministinis imtinis

Programėlėms, kur reikia nuoseklių atsakymų, deterministinis imtinis užtikrina reproducijai skirtus rezultatus. Tai pasiekiama naudojant fiksuotą atsitiktinį sėklą ir temperatūrą, lygią nuliui.

Žemiau pateiktas imtinio determinizmo pavyzdys keliomis programavimo kalbomis.

# [Java](#tab/java)

```java
// Java pavyzdys: deterministiniai atsakymai su fiksuotu sėklos numeriu
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Naudojamas fiksuotas sėklos numeris deterministiniams rezultatams
        
        // Pirmas užklausa su fiksuotu sėklos numeriu
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nulinė temperatūra maksimaliam deterministiškumui
            .build();
            
        // Antras užklausa su tuo pačiu sėklos numeriu
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Vykdyti abi užklausas
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Atsakymai turėtų būti identiški dėl to paties sėklos numero ir temperatūros=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Ankstesniame kode mes:

- Sukūrėme MCP klientą su nurodytu serverio URL.
- Konfigūravome dvi užklausas su ta pačia užklausa, fiksuota sėkla ir nulinė temperatūra.
- Išsiuntėme abi užklausas ir atspausdinome sugeneruotą tekstą.
- Parodėme, kad atsakymai yra identiški dėl deterministinio imtinio pobūdžio (vienoda sėkla ir temperatūra).
- Naudojome `setSeed`, kad nurodytume fiksuotą atsitiktinę sėklą, užtikrinant, kad modelis kiekvieną kartą sugeneruos tokį patį išėjimą tam pačiam įėjimui.
- Nustatėme `temperature` į nulį, kad būtų užtikrintas maksimalus deterministiškumas, tai reiškia, kad modelis visada pasirinks tikėtiniausią kitą žodį be atsitiktinumų.

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
      temperature: 0.0  // Nulinė temperatūra maksimaliam deterministiškumui
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
- Konfigūravome dvi užklausas su ta pačia užklausa, fiksuota sėkla ir nulinė temperatūra.
- Išsiuntėme abi užklausas ir atspausdinome sugeneruotą tekstą.
- Parodėme, kad atsakymai yra identiški dėl deterministinio imtinio pobūdžio (vienoda sėkla ir temperatūra).
- Naudojome `seed`, kad nurodytume fiksuotą atsitiktinę sėklą, užtikrinant, kad modelis kiekvieną kartą sugeneruos tokį patį išėjimą tam pačiam įėjimui.
- Nustatėme `temperature` į nulį, kad būtų užtikrintas maksimalus deterministiškumas, tai reiškia, kad modelis visada pasirinks tikėtiniausią kitą žodį be atsitiktinumų.
- Trečiai užklausai panaudojome kitokią sėklą, kad parodytume, jog sėklos pakeitimas lemia skirtingus rezultatus, net esant tos pačios užklausos ir temperatūros reikšmei.

---

## Dinaminis imtinio konfigūravimas

Protingas imtinis pritaiko parametrus pagal kontekstą ir užklausos reikalavimus. Tai reiškia dinamiškai koreguoti parametrus, tokius kaip temperature, top_p ir baudos, pagal užduoties tipą, vartotojo pageidavimus ar ankstesnį našumą.

Pažiūrėkime, kaip įgyvendinti dinaminį imtinį keliomis programavimo kalbomis.

# [Python](#tab/python)

```python
# Python Pavyzdys: Dinaminis ėmimas pagal užklausos kontekstą
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Apibrėžti ėmimo iš anksto nustatytus parametrus skirtingų užduočių tipams
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Pasirinkti pagrindinį iš anksto nustatytą parametrą
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Koreguoti pagal vartotojo pageidavimus, jei jie pateikti
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skalė temperatūrai pagal kūrybiškumo pageidavimą (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Koreguoti top_p pagal pageidaujamą atsakymo įvairovę
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Sukurti ir siųsti užklausą su pasirinktiniais ėmimo parametrais
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Grąžinti atsakymą su ėmimo metaduomenimis už skaidrumą
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Ankstesniame kode mes:

- Sukūrėme klasę `DynamicSamplingService`, valdžiusią adaptuojamą imtinį.
- Apibrėžėme imtinio profilus įvairiems užduočių tipams (kūrybinė, faktinė, kodas, analitinis).
- Pasirinkome bazinį imtinio profilį pagal užduoties tipą.
- Koregavome imtinio parametrus pagal vartotojo pageidavimus, tokius kaip kūrybiškumo ir įvairovės lygis.
- Išsiuntėme užklausą su dinamiškai sukonfigūruotais imtinio parametrais.
- Grąžinome sugeneruotą tekstą kartu su panaudotais imtinio parametrais ir užduoties tipu skaidrumui.
- Naudojome `temperature`, kontroliuojantį išvesties atsitiktinumą, kai didesnės reikšmės skatina kūrybiškesnius atsakymus.
- Naudojome `top_p`, ribojantį žodžių pasirinkimą iki tų, kurie prisideda prie aukščiausios kumuliatyvinės tikimybės masės ir gerina sugeneruoto teksto kokybę.
- Naudojome `frequency_penalty`, mažinantį pasikartojimus ir skatinantį įvairovę išvestyje.
- Naudojome `user_preferences`, leidžiantį pritaikyti imtinio parametrus pagal vartotojo nurodytus kūrybiškumo ir įvairovės lygius.
- Naudojome `task_type`, nustatantį tinkamą imtinio strategiją užklausai pagal užduoties pobūdį.
- Naudojome `send_request` metodą užklausos siuntimui su sukonfigūruotais imtinio parametrais, užtikrinant, kad modelis generuotų tekstą pagal nurodytus reikalavimus.
- Naudojome `generated_text`, kad gautume modelio atsakymą, kurį tuomet grąžiname kartu su imtinio parametrais ir užduoties tipu tolesnei analizei arba rodymui.
- Naudojome `min` ir `max` funkcijas, kad vartotojo pageidavimai būtų apriboti galiojančiose ribose, išvengiant netinkamų imtinio konfigūracijų.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript pavyzdys: dinaminė atrankos konfigūracija pagal vartotojo kontekstą
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Apibrėžti pagrindinius atrankos profilius
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Stebėti istorinį našumą
    this.performanceHistory = [];
  }
  
  // Aptikti užduoties tipą iš užklausos
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Paprastas heuristinis aptikimas - galima patobulinti naudojant ML klasifikaciją
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
    
    // Pagal nutylėjimą pasirinkti pokalbį, jei aiškus tipas nenustatytas
    return 'conversational';
  }
  
  // Apskaičiuoti atrankos parametrus pagal kontekstą ir vartotojo pageidavimus
  getSamplingParameters(prompt, context = {}) {
    // Aptikti užduoties tipą
    const taskType = this.detectTaskType(prompt, context);
    
    // Gauti pagrindinį profilį
    let params = {...this.samplingProfiles[taskType]};
    
    // Koreguoti pagal vartotojo pageidavimus
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Pakeisti skalę nuo 1-10 į tinkamą temperatūros intervalą
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Didesnis tikslumas reiškia žemesnį topP (didesnė fokusavimo sritis)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Didesnis nuoseklumas reiškia mažesnes baudas
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Taikyti išmoktas korekcijas pagal našumo istoriją
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Paprasta adaptacinė logika - galima patobulinti naudojant sudėtingesnius algoritmus
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Apsvarstyti tik naujausią istoriją
    
    if (relevantHistory.length > 0) {
      // Apskaičiuoti vidurkius našumo balų
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Jei našumas žemesnis už ribą, koreguoti parametrus
      if (avgScore < 0.7) {
        // Nedidelė korekcija link saugesnių reikšmių
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Įrašyti našumą būsimoms korekcijoms
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 atsakymo kokybės įvertinimas
    });
    
    // Apriboti istorijos dydį
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Gauti optimizuotus atrankos parametrus
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Siųsti užklausą su optimizuotais parametrais
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Jei vartotojas pateikia atsiliepimą, įrašyti jį būsimai optimizacijai
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

// Pavyzdinis naudojimas
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kūrybinė užduotis su individualiais vartotojo pageidavimais
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Aukštas kūrybingumas (1-10)
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
          creativity: 2,  // Žemas kūrybingumas
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

- Sukūrėme klasę `AdaptiveSamplingManager`, valdžiusią dinaminį imtinį pagal užduoties tipą ir vartotojo pageidavimus.
- Apibrėžėme profilius įvairiems užduočių tipams (kūrybinė, faktinė, kodas, pokalbių).
- Įdiegėme metodą užduoties tipui nustatyti pagal užklausą naudojant paprastus heuristinius būdus.
- Apskaičiavome imtinio parametrus pagal aptiktą užduoties tipą ir vartotojo pageidavimus.
- Taikėme su mokymusi susijusias korekcijas pagal istorinį našumą, optimizuojant imtinio parametrus.
- Fiksavome našumą būsimoms korekcijoms, leisdami sistemai mokytis iš ankstesnių sąveikų.
- Išsiuntėme užklausas su dinamiškai konfigūruotais imtinio parametrais ir grąžinome sugeneruotą tekstą kartu su panaudotais parametrais ir aptiktu užduoties tipu.
- Naudojome:
    - `userPreferences`, leidžiantį pritaikyti imtinio parametrus pagal vartotojo apibrėžtus kūrybiškumo, tikslumo ir nuoseklumo lygius.
    - `detectTaskType`, nustatantį užduoties pobūdį pagal užklausą, leidžiantį labiau pritaikyti atsakymus.
    - `recordPerformance`, fiksuojantį sugeneruotų atsakymų našumą, leidžiantį sistemai prisitaikyti ir gerinti laikui bėgant.
    - `applyLearnedAdjustments`, koreguojantį imtinio parametrus pagal istorinį našumą, gerinant modelio gebėjimą generuoti aukštos kokybės atsakymus.
    - `generateResponse`, apimančią visą procesą generuoti atsakymą adaptuoto imtinio būdu, palengvinantį kvietimą su skirtingomis užklausomis ir kontekstais.
    - `allowedTools`, nurodantį, kokius įrankius modelis gali naudoti generavimo metu, leidžiantį kontekstui labiau pritaikytus atsakymus.
    - `feedbackScore`, leidžiantį naudotojams pateikti atsiliepimus apie sugeneruoto atsakymo kokybę, kurie gali būti panaudoti tolimesniam modelio našumo tobulinimui.
    - `performanceHistory`, saugantį ankstesnių sąveikų įrašus, leidžiantį sistemai mokytis iš ankstesnių sėkmių ir nesėkmių.
    - `getSamplingParameters`, dinamiškai koreguojantį imtinio parametrus pagal užklausos kontekstą, leidžiantį lankstesnį ir jautresnį modelio elgesį.
    - `detectTaskType`, klasifikuojantį užduotį pagal užklausą, leidžiantį sistemai taikyti tinkamas imtinio strategijas skirtingoms užklausoms.
    - `samplingProfiles`, apibrėžiantį bazines imtinio konfigūracijas įvairiems užduočių tipams, leidžiantį greitai keisti konfigūraciją pagal užduoties pobūdį.

---

## Kas toliau

- [5.7 Masto keitimas](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->