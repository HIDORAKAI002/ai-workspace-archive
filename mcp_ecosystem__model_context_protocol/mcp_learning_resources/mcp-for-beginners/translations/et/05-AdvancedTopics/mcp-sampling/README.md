> [VANANENUD: 2026-07-28 VÄLJAANDEKANDIDAAT](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Proovid Model Context Protocolis

> **Vananemise teade:** MCP spetsifikatsiooni `2026-07-28` väljaandekandidaat märgib proovid vananemisena, eelistades otsest integreerimist LLM pakkujate API-dega. Proovid töötavad jätkuvalt versioonis `2025-11-25` ja vähemalt aasta pärast ametlikku vananemist, seega on selle õppetunni sisu endiselt kehtiv - kuid uued serveri disainid peaksid hindama asendusmustrid. Vaata [Mis muutub MCP-s: 2026-07-28 väljaandekandidaat](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Proovid on MCP võimas funktsioon, mis võimaldab serveritel taotleda LLM lõpetusi kliendi kaudu, võimaldades keerukaid agentlikke käitumisi, säilitades samal ajal turvalisuse ja privaatsuse. Õige proovide seadistamine võib oluliselt parandada vastuse kvaliteeti ja jõudlust. MCP pakub standardiseeritud viisi kontrollida, kuidas mudelid genereerivad teksti spetsiifiliste parameetritega, mis mõjutavad juhuslikkust, loovust ja sidusust.

## Sissejuhatus

Selles õppetükis uurime, kuidas seadistada proovimisparameetreid MCP taotlustes ning mõista proovimise protokolli toimemehhanisme.

## Õpieesmärgid

Selle õppetüki lõpuks suudad:

- Mõista MCP-s saadaval olevaid peamisi proovimisparameetreid.
- Seadistada proovimisparameetreid erinevate kasutusjuhtude jaoks.
- Rakendada deterministlikku proovimist korduvate tulemuste saavutamiseks.
- Dünaamiliselt kohandada proovimisparameetreid vastavalt kontekstile ja kasutajateelistustele.
- Rakendada proovimisstrateegiaid mudeli jõudluse parandamiseks erinevates stsenaariumites.
- Mõista, kuidas proovimine toimib MCP kliendi-serveri töövoos.

## Kuidas proovimine MCP-s toimib

Proovimise protsess MCP-s järgib järgmisi samme:

1. Server saadab kliendile `sampling/createMessage` taotluse
2. Klient vaatab taotluse üle ja võib seda muuta
3. Klient võtab proovimisi LLM-ist
4. Klient vaatab täienduse läbi
5. Klient edastab tulemuse serverile

See inimaju kaasav disain tagab, et kasutajad säilitavad kontrolli selle üle, mida LLM näeb ja genereerib.

## Proovimisparameetrite ülevaade

MCP määratleb järgmised proovimisparameetrid, mida saab seadistada klienditaotlustes:

| Parameeter | Kirjeldus | Tüüpiline vahemik |
|-----------|-------------|---------------|
| `temperature` | Juhuslikkuse kontroll tokeni valikul | 0.0 - 1.0 |
| `maxTokens` | Maksimaalne genereeritavate tokenite arv | Täisarvuline väärtus |
| `stopSequences` | Kohandatud jadasid, mis peatavad genereerimise kui neid kohtatakse | Stringide massiiv |
| `metadata` | Täiendavad pakkuja-spetsiifilised parameetrid | JSON-objekt |

Paljud LLM pakkujad toetavad täiendavaid parameetreid `metadata` välja kaudu, mis võivad sisaldada:

| Levinud laiendusparameeter | Kirjeldus | Tüüpiline vahemik |
|-----------|-------------|---------------|
| `top_p` | Nucleus-proovimine - piirab tokeneid tipp-kumulatiivse tõenäosusega | 0.0 - 1.0 |
| `top_k` | Piirab tokenite valiku K tipptõenäolise hulka | 1 - 100 |
| `presence_penalty` | Karistab tokeneid nende senise teksti esinemise põhjal | -2.0 - 2.0 |
| `frequency_penalty` | Karistab tokeneid nende esinemissageduse põhjal senises tekstis | -2.0 - 2.0 |
| `seed` | Spetsiifiline juhuslik seeme korduvate tulemuste jaoks | Täisarvuline väärtus |

## Näidistaotluse vorming

Näide proovimisest kliendist MCP-s:

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

## Vastuse vorming

Klient tagastab täiendustulemuse:

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

## Inimese kaasamise kontrollid

MCP proovimine on loodud inimjärelevalvet silmas pidades:

- **Käskude puhul**:
  - Kliendid peaksid kasutajatele näitama pakutud käsku
  - Kasutajatel peaks olema võimalik käskusid muuta või tagasi lükata
  - Süsteemis käsku saab filtreerida või muuta
  - Konteksti kaasamine on kliendi kontrolli all

- **Täienduste puhul**:
  - Kliendid peaksid kasutajatele näitama täiendust
  - Kasutajatel peaks olema võimalik täiendusi muuta või tagasi lükata
  - Kliendid võivad täiendusi filtreerida või muuta
  - Kasutajad kontrollivad, millist mudelit kasutatakse

Nende põhimõtete valguses vaatame, kuidas proovimist rakendada erinevates programmeerimiskeeltes, keskendudes parameetritele, mida toetavad mitmed LLM pakkujad.

## Turvalisuse kaalutlused

Proovimist rakendades MCP-s, kaalu järgmisi turvalisuse parimaid tavasid:

- **Kontrolli kogu sõnumisisu** enne selle kliendile saatmist
- **Puhasta tundlik info** käsudest ja täiendustest
- **Rakenda kiirusepiiranguid** kuritarvituste vältimiseks
- **Jälgi proovimiste kasutust** ebatavaliste mustrite osas
- **Krüpteeri andmed edastamisel** turvaliste protokollide abil
- **Käsitle kasutajaandmete privaatsust** vastavalt kehtivatele regulatsioonidele
- **Audit'i proovimistaotlusi** vastavuse ja turvalisuse tagamiseks
- **Kontrolli kulutusi** asjakohaste piirangute abil
- **Rakenda läbipaistvusaegu** proovimistaotluste jaoks
- **Käsitle mudelivigu graatsiliselt** sobivate varukohtadega

Proovimisparameetrid võimaldavad keelemudelite käitumist peenhäälestada, saavutades soovitud tasakaalu deterministlike ja loominguliste väljundite vahel.

Vaatame, kuidas neid parameetreid seadistada erinevates programmeerimiskeeltes.

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

Eelnevas koodis oleme:

- Loonud MCP kliendi kindla serveri URL-iga.
- Seadistanud proovimisparameetrid nagu `temperature`, `top_p` ja `top_k`.
- Saadanud taotluse ja väljastanud genereeritud teksti.
- Kasutanud:
    - `allowedTools` määramaks, milliseid tööriistu mudel võib genereerimise ajal kasutada. Selles näites lubasime `ideaGenerator` ja `marketAnalyzer` tööriistu loovate rakendusideede genereerimiseks.
    - `frequencyPenalty` ja `presencePenalty` korduste ja mitmekesisuse kontrolliks väljundis.
    - `temperature` juhuslikkuse kontrolliks, kus kõrgemad väärtused toovad esile loomingulisemaid vastuseid.
    - `top_p` piiramiseks, valides ainult need tokenid, mis annavad kõige kõrgema kumulatiivse tõenäosuse, parandades teksti kvaliteeti.
    - `top_k` mudeli piiramiseks vaid kõige tõenäolisemate K tokeniga, aidates genereerida sidusamaid vastuseid.
    - `frequencyPenalty` ja `presencePenalty` korduste vähendamiseks ja mitmekesisuse julgustamiseks tekstis.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript näide: temperatuuri ja Top-P valimi seadistus
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Algatage MCP klient
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigureerige päring erinevate valimi parameetritega
  const creativeSampling = {
    temperature: 0.9,    // Kõrgem temperatuur = rohkem juhuslikkust/loovust
    topP: 0.92,          // Võtke arvesse top 92% tõenäosusmassiga tokeneid
    frequencyPenalty: 0.6, // Vähendage tokenite järjestuste kordamist
    presencePenalty: 0.4   // Karistage tokeneid, mis on seni tekstis esinenud
  };
  
  const factualSampling = {
    temperature: 0.2,    // Madalam temperatuur = deterministlikum/faktipõhisem
    topP: 0.85,          // Veidi keskendunum tokenite valik
    frequencyPenalty: 0.2, // Minimaalne korduskaristus
    presencePenalty: 0.1   // Minimaalne esinemiskaristus
  };
  
  try {
    // Saada kaks päringut erinevate valimi seadistustega
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

Eelnevas koodis oleme:

- Algatanud MCP kliendi serveri URL-i ja API võtmega.
- Seadistanud kaks proovimisparameetrite komplekti: ühe loovate ülesannete jaoks ja teise faktipõhiste ülesannete jaoks.
- Saadanud nende konfiguratsioonidega taotlused, võimaldades mudelil kasutada konkreetseid tööriistu iga ülesande tähtsuseks.
- Väljaprinditud genereeritud vastused, et demonstreerida erinevate proovimisparameetrite mõju.
- Kasutanud `allowedTools` määramaks, milliseid tööriistu mudel võib kasutamisel kasutada. Selles näites lubasime `ideaGenerator` ja `environmentalImpactTool` loovate ülesannete jaoks ning `factChecker` ja `dataAnalysisTool` faktipõhiste jaoks.
- Kasutanud `temperature` juhuslikkuse kontrolliks, kus kõrgemad väärtused toovad esile loomingulisemaid vastuseid.
- Kasutanud `top_p` piiramiseks, valides ainult need tokenid, mis annavad kõige kõrgema kumulatiivse tõenäosuse, parandades teksti kvaliteeti.
- Kasutanud `frequencyPenalty` ja `presencePenalty` korduste vähendamiseks ja mitmekesisuse julgustamiseks väljundis.
- Kasutanud `top_k` mudeli piiramiseks vaid kõige tõenäolisemate K tokeniga, aidates genereerida sidusamaid vastuseid.

---

## Deterministlik proovimine

Rakendustele, mis vajavad ühtlaseid väljundeid, tagab deterministlik proovimine korduvad tulemused. Seda tehakse, kasutades fikseeritud juhuslikku seemet ja seades temperatuuri nulli.

Vaatame alljärgnevat näidisrakendust deterministliku proovimise demonstreerimiseks erinevates programmeerimiskeeltes.

# [Java](#tab/java)

```java
// Java näide: Deterministlikud vastused fikseeritud seemnega
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Deterministlike tulemuste jaoks fikseeritud seemne kasutamine
        
        // Esimene päring fikseeritud seemnega
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Maksimaalse determinismi saavutamiseks temperatuur null
            .build();
            
        // Teine päring sama seemnega
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Mõlema päringu täitmine
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Vastused peaksid olema identsed sama seemne ja temperatuuri=0 tõttu
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Eelnevas koodis oleme:

- Loonud MCP kliendi kindla serveri URL-iga.
- Seadistanud kaks taotlust sama käsu, fikseeritud seemne ja null temperatuuri väärtusega.
- Saadanud mõlemad taotlused ja väljastanud genereeritud teksti.
- Demonstreerinud, et vastused on identsed tänu proovimisparameetrite deterministlikule loomusele (sama seeme ja temperatuur).
- Kasutanud `setSeed`, et määrata fikseeritud juhuslik seeme, tagades, et mudel genereerib iga kord sama väljundi sama sisendi jaoks.
- Seadistanud `temperature` väärtuseks nulli maksimaalse determinismi tagamiseks, mis tähendab, et mudel valib alati kõige tõenäolisema järgmise tokeni ilma juhuslikkuseta.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript näide: Deterministlikud vastused seemne kontrolliga
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Esimene päring fikseeritud seemnega
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Null temperatuur maksimaalse determinismi jaoks
    });
    
    // Teine päring sama seemne ja temperatuuriga
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Kolmas päring erineva seemnega, kuid sama temperatuuriga
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

Eelnevas koodis oleme:

- Algatanud MCP kliendi serveri URL-iga.
- Seadistanud kaks taotlust sama käsu, fikseeritud seemne ja null temperatuuri väärtusega.
- Saadanud mõlemad taotlused ja väljastanud genereeritud teksti.
- Demonstreerinud, et vastused on identsed tänu proovimisparameetrite deterministlikule loomusele (sama seeme ja temperatuur).
- Kasutanud `seed`, et määrata fikseeritud juhuslik seeme, tagades, et mudel genereerib iga kord sama väljundi sama sisendi jaoks.
- Seadistanud `temperature` väärtuseks nulli maksimaalse determinismi tagamiseks, mis tähendab, et mudel valib alati kõige tõenäolisema järgmise tokeni ilma juhuslikkuseta.
- Kasutanud teist seemet kolmandas taotluses näitamaks, et seemne muutmine annab erinevaid väljundeid, isegi kui käsk ja temperatuur on samad.

---

## Dünaamiline proovimise seadistamine

Intelligentsed proovimised kohandavad parameetreid vastavalt iga taotluse kontekstile ja tingimustele. See tähendab selliste parameetrite nagu temperatuur, top_p ja karistused dünaamilist reguleerimist ülesandetüübist, kasutaja eelistustest või ajaloolisest jõudlusest lähtuvalt.

Vaatame, kuidas rakendada dünaamilist proovimist erinevates programmeerimiskeeltes.

# [Python](#tab/python)

```python
# Python näide: dünaamiline proovivõtt põhineb päringu kontekstis
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Määra proovivõtu eelseaded erinevate ülesandetüüpide jaoks
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Vali baas-eelseade
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Kohanda kasutaja eelistuste alusel, kui need on antud
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skaaleeri temperatuur loomingulisuse eelistuse põhjal (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Kohanda top_p soovitud vastuse mitmekesisuse põhjal
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Loo ja saada päring kohandatud proovivõtu parameetritega
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Tagasta vastus koos proovivõtu metaandmetega läbipaistvuse tagamiseks
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Eelnevas koodis oleme:

- Loonud `DynamicSamplingService` klassi, mis haldab adaptiivset proovimist.
- Määratlenud proovimise eelseaded erinevatele ülesandetüüpidele (loov, faktipõhine, kood, analüütiline).
- Valinud põhilise proovimise eelseadistuse ülesandetüübi põhjal.
- Kohandanud proovimisparameetreid kasutaja eelistuste alusel, näiteks loovus ja mitmekesisus.
- Saadanud taotluse dünaamiliselt seadistatud proovimisparameetritega.
- Tagastanud genereeritud teksti koos rakendatud proovimisparameetrite ja ülesandetüübiga läbipaistvuse tagamiseks.
- Kasutanud `temperature`, et juhtida väljundi juhuslikkust, kus kõrgemad väärtused tagavad loomingulisemad vastused.
- Kasutanud `top_p`, et piirata tokenite valikut neile, mis annavad kõige kõrgema kumulatiivse tõenäosuse massi, parandades teksti kvaliteeti.
- Kasutanud `frequency_penalty` korduste vähendamiseks ja mitmekesisuse julgustamiseks väljundis.
- Kasutanud `user_preferences`, et võimaldada proovimisparameetrite kohandamist kasutaja määratud loovus- ja mitmekesisustasemete põhjal.
- Kasutanud `task_type`, et määrata sobiv proovimisstrateegia taotluse põhjal, võimaldades paremini kohandatud vastuseid ülesande olemuse järgi.
- Kasutanud `send_request` meetodit, et saata käsk seadistatud proovimisparameetritega, tagades, et mudel genereerib teksti vastavalt määratletud nõuetele.
- Kasutanud `generated_text` mudelivastuse saamiseks, mis tagastatakse koos proovimisparameetrite ja ülesandetüübiga edasiseks analüüsiks või kuvamiseks.
- Kasutanud `min` ja `max` funktsioone, et tagada kasutaja eelistuste piiramist kehtivatesse vahemikesse, vältides kehtetut proovimise konfiguratsiooni.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript näide: dünaamiline proovivõtu konfiguratsioon kasutaja konteksti põhjal
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Määra põhiproovide profiilid
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Jälgi ajaloolist sooritust
    this.performanceHistory = [];
  }
  
  // Tuvasta ülesande tüüp prompti põhjal
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Lihtne heuristiline tuvastus - võiks täiendada masinõppe klassifikatsiooniga
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
    
    // Vaikimisi vestluslik, kui selget tüüpi ei tuvastata
    return 'conversational';
  }
  
  // Arvuta proovivõtu parameetrid konteksti ja kasutaja eelistuste põhjal
  getSamplingParameters(prompt, context = {}) {
    // Tuvasta ülesande tüüp
    const taskType = this.detectTaskType(prompt, context);
    
    // Hangi põhiprofiil
    let params = {...this.samplingProfiles[taskType]};
    
    // Kohanda kasutaja eelistuste põhjal
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Skaala 1-10 sobivale temperatuuri vahemikule
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Kõrgem täpsus tähendab madalamat topP-d (täpsem valik)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Kõrgem järjepidevus tähendab madalamaid trahve
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Rakenda soorituse ajaloo põhjal õpitud kohandusi
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Lihtne adaptiivne loogika - võiks täiendada keerukamate algoritmidega
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Võta arvesse ainult viimast ajalugu
    
    if (relevantHistory.length > 0) {
      // Arvuta keskmised soorituspunktid
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Kui sooritus on künnisest madalam, kohanda parameetreid
      if (avgScore < 0.7) {
        // Väike kohandus turvalisemate väärtuste suunas
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Salvesta sooritus tulevaste kohanduste jaoks
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 hinnang vastuse kvaliteedile
    });
    
    // Piira ajaloo suurust
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Hangi optimeeritud proovivõtu parameetrid
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Saada päring optimeeritud parameetritega
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Kui kasutaja annab tagasisidet, salvesta see tulevaseks optimeerimiseks
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

// Näidiskasutus
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Loominguline ülesanne kohandatud kasutaja eelistustega
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Kõrge loomingulisus (1-10)
          consistency: 3  // Madal järjepidevus (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Koodi genereerimise ülesanne
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Madal loomingulisus
          precision: 8,   // Kõrge täpsus
          consistency: 9  // Kõrge järjepidevus
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

Eelnevas koodis oleme:

- Loonud `AdaptiveSamplingManager` klassi, mis juhib dünaamilist proovimist ülesandetüübi ja kasutaja eelistuste põhjal.
- Määratlenud proovimisprofiilid erinevate ülesandetüüpide jaoks (loov, faktipõhine, kood, vestlus).
- Rakendanud meetodi ülesande tüübi tuvastamiseks käsust lihtsate heuristikute abil.
- Arvutanud proovimisparameetrid tuvastatud ülesandetüübi ja kasutaja eelistuste põhjal.
- Rakendanud ajaloolisel jõudlusel põhinevaid õpitud kohandusi proovimisparameetrite optimeerimiseks.
- Salvestanud tulemuslikkuse tulevaste kohanduste jaoks, võimaldades süsteemil õppida varasematest interaktsioonidest.
- Saatnud taotlused dünaamiliselt seadistatud proovimisparameetritega ning tagastanud genereeritud teksti koos rakendatud parameetrite ja tuvastatud ülesandetüübiga.
- Kasutanud:
    - `userPreferences` võimaldamaks proovimisparameetrite kohandamist kasutaja määratud loovuse, täpsuse ja järjepidevuse tasemete alusel.
    - `detectTaskType` ülesande olemuse määramiseks käsu põhjal, võimaldades paremini kohandatud vastuseid.
    - `recordPerformance` genereeritud vastuste tulemuse logimiseks, pakkudes süsteemile kohanemisvõimet ja parendamist aja jooksul.
    - `applyLearnedAdjustments` proovimisparameetrite muutmiseks ajaloolise jõudluse põhjal, parandades mudeli võimet genereerida kvaliteetseid vastuseid.
    - `generateResponse` kogu protsessi kapseldamiseks, võimaldades hõlpsat käivitamist erinevate käskude ja kontekstidega.
    - `allowedTools` määramaks, milliseid tööriistu mudel genereerimise ajal kasutada tohib, võimaldades kontekstitundlikumaid vastuseid.
    - `feedbackScore` kasutajate tagasiside võimaldamiseks genereeritud vastuse kvaliteedile, mida saab kasutada mudeli jõudluse täiendavaks parendamiseks ajas.
    - `performanceHistory` varasemate interaktsioonide kogumi hoidmiseks, võimaldades süsteemil õppida varasematest õnnestumistest ja ebaõnnestumistest.
    - `getSamplingParameters` proovimisparameetrite dünaamiliseks kohandamiseks taotluse konteksti alusel, võimaldades mudelil käituda paindlikumalt ja reageerivamalt.
    - `detectTaskType` ülesande klassifitseerimiseks käsu põhjal, võimaldades süsteemil rakendada sobivaid proovimisstrateegiaid erinevat tüüpi taotluste jaoks.
    - `samplingProfiles` baasproovimise konfiguratsioonide määratlemiseks erinevate ülesandetüüpide jaoks, võimaldades kiireid kohandusi taotluse olemuse põhjal.

---

## Mis järgmiseks

- [5.7 Skaalumine](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->