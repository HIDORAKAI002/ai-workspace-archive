> [ZASTARJELO: IZDANJE KANDIDATA 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Uzorkovanje u Model Context Protocolu

> **Obavijest o zastarijevanju:** specifikacija MCP izdanja kandidata verzije `2026-07-28` označava Uzorkovanje kao zastarjelo u korist izravne integracije s API-jima LLM pružatelja. Uzorkovanje nastavlja funkcionirati u `2025-11-25` i barem godinu dana nakon bilo kojeg formalnog zastarijevanja, tako da je sve u ovom lekciji i dalje valjano - no novi dizajni poslužitelja trebali bi razmotriti zamjenski obrazac. Vidi [Što se mijenja u MCP-u: Izdanju kandidata 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Uzorkovanje je moćna značajka MCP-a koja omogućuje poslužiteljima da zahtijevaju LLM dovršetke putem klijenta, omogućujući sofisticirano agentno ponašanje uz održavanje sigurnosti i privatnosti. Prava konfiguracija uzorkovanja dramatično može poboljšati kvalitetu i performanse odgovora. MCP pruža standardizirani način za kontrolu kako modeli generiraju tekst s određenim parametrima koji utječu na slučajnost, kreativnost i koherentnost.

## Uvod

U ovoj lekciji istražit ćemo kako konfigurirati parametre uzorkovanja u MCP zahtjevima i razumjeti osnovnu protokolarnu mehaniku uzorkovanja.

## Ciljevi učenja

Do kraja ove lekcije moći ćete:

- Razumjeti ključne parametre uzorkovanja dostupne u MCP-u.
- Konfigurirati parametre uzorkovanja za različite slučajeve upotrebe.
- Implementirati determinističko uzorkovanje za reproducibilne rezultate.
- Dinamički prilagoditi parametre uzorkovanja na temelju konteksta i korisničkih preferencija.
- Primijeniti strategije uzorkovanja za unapređenje performansi modela u različitim scenarijima.
- Razumjeti kako uzorkovanje funkcionira u protoku klijent-poslužitelj MCP-a.

## Kako uzorkovanje funkcionira u MCP-u

Tijek uzorkovanja u MCP-u slijedi ove korake:

1. Poslužitelj šalje `sampling/createMessage` zahtjev klijentu
2. Klijent pregledava zahtjev i može ga modificirati
3. Klijent uzorkuje iz LLM-a
4. Klijent pregledava dovršetak
5. Klijent vraća rezultat poslužitelju

Ovaj dizajn sa sudjelovanjem čovjeka osigurava da korisnici zadržavaju kontrolu nad onim što LLM vidi i generira.

## Pregled parametara uzorkovanja

MCP definira sljedeće parametre uzorkovanja koje je moguće konfigurirati u zahtjevima klijenta:

| Parametar | Opis | Tipični raspon |
|-----------|-------------|---------------|
| `temperature` | Kontrolira slučajnost u izboru tokena | 0.0 - 1.0 |
| `maxTokens` | Najveći broj tokena za generiranje | Cijela vrijednost |
| `stopSequences` | Prilagođene sekvence koje zaustavljaju generiranje kad se pojave | Niz stringova |
| `metadata` | Dodatni parametri specifični za pružatelja | JSON objekt |

Mnogi LLM pružatelji podržavaju dodatne parametre putem polja `metadata`, koja mogu uključivati:

| Uobičajeni prošireni parametar | Opis | Tipični raspon |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling - ograničava tokene na vrhovnu kumulativnu vjerojatnost | 0.0 - 1.0 |
| `top_k` | Ograničava izbor tokena na top K opcija | 1 - 100 |
| `presence_penalty` | Kažnjava tokene na temelju njihovog prisustva u tekstu do sada | -2.0 - 2.0 |
| `frequency_penalty` | Kažnjava tokene na temelju njihove učestalosti u tekstu do sada | -2.0 - 2.0 |
| `seed` | Specifičan slučajni početni broj za reproducibilne rezultate | Cijela vrijednost |

## Primjer formata zahtjeva

Evo primjera zahtjeva za uzorkovanje od klijenta u MCP-u:

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

## Format odgovora

Klijent vraća rezultat dovršetka:

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

## Kontrole sudjelovanja čovjeka

MCP uzorkovanje je dizajnirano s ljudskom nadzorom na umu:

- **Za upite**:
  - Klijenti bi trebali prikazivati korisnicima predloženi upit
  - Korisnici bi trebali moći mijenjati ili odbacivati upite
  - Sistemski upiti mogu biti filtrirani ili modificirani
  - Uključivanje konteksta kontrolira klijent

- **Za dovršetke**:
  - Klijenti bi trebali prikazivati korisnicima dovršetak
  - Korisnici bi trebali moći mijenjati ili odbacivati dovršetke
  - Klijenti mogu filtrirati ili mijenjati dovršetke
  - Korisnici kontroliraju koji se model koristi

S ovim principima na umu, pogledajmo kako implementirati uzorkovanje u različitim programskim jezicima, fokusirajući se na parametre koje uglavnom podržavaju svi LLM pružatelji.

## Sigurnosne napomene

Kada implementirate uzorkovanje u MCP-u, uzmite u obzir ove najbolje sigurnosne prakse:

- **Provjerite sav sadržaj poruka** prije slanja klijentu
- **Očistite osjetljive informacije** iz upita i dovršetaka
- **Primijenite ograničenja brzine** da spriječite zloupotrebe
- **Nadzor upotrebe uzorkovanja** za neuobičajene obrasce
- **Šifrirajte podatke u prijenosu** koristeći sigurne protokole
- **Upravljajte privatnošću korisničkih podataka** u skladu s relevantnim propisima
- **Revizija zahtjeva za uzorkovanje** zbog usklađenosti i sigurnosti
- **Kontrola izloženosti troškovima** s odgovarajućim ograničenjima
- **Implementacija vremenskih ograničenja** za zahtjeve uzorkovanja
- **Upravljanje pogreškama modela s prikladnim rezervnim opcijama**

Parametri uzorkovanja omogućuju fino podešavanje ponašanja jezičnih modela radi postizanja željene ravnoteže između determinističkih i kreativnih izlaza.

Pogledajmo kako konfigurirati ove parametre u različitim programskim jezicima.

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

U prethodnom kodu smo:

- Kreirali MCP klijenta s određenim URL-om poslužitelja.
- Konfigurirali zahtjev s parametrima uzorkovanja kao što su `temperature`, `top_p` i `top_k`.
- Poslali zahtjev i ispisali generirani tekst.
- Koristili smo:
    - `allowedTools` za specificiranje koje alate model može koristiti tijekom generiranja. U ovom slučaju, dozvolili smo alate `ideaGenerator` i `marketAnalyzer` za pomoć u generiranju kreativnih ideja za aplikacije.
    - `frequencyPenalty` i `presencePenalty` za kontrolu ponavljanja i raznolikosti u izlazu.
    - `temperature` za kontrolu slučajnosti izlaza, gdje veće vrijednosti vode do kreativnijih odgovora.
    - `top_p` za ograničenje izbora tokena na one koji doprinose vrhovnoj kumulativnoj vjerojatnosti, poboljšavajući kvalitetu generiranog teksta.
    - `top_k` za ograničenje modela na top K najvjerojatnije tokene, što može pomoći u stvaranju koherentnijih odgovora.
    - `frequencyPenalty` i `presencePenalty` za smanjenje ponavljanja i poticanje raznolikosti u generiranom tekstu.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript primjer: Konfiguracija temperature i Top-P uzorkovanja
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inicijaliziraj MCP klijenta
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfiguriraj zahtjev s različitim parametrima uzorkovanja
  const creativeSampling = {
    temperature: 0.9,    // Viša temperatura = veća slučajnost/kreativnost
    topP: 0.92,          // Uzmite u obzir tokene s 92% ukupne vjerojatnosti
    frequencyPenalty: 0.6, // Smanji ponavljanje sekvenci tokena
    presencePenalty: 0.4   // Kazni tokene koji su se do sada pojavili u tekstu
  };
  
  const factualSampling = {
    temperature: 0.2,    // Niža temperatura = više deterministički/činjenični
    topP: 0.85,          // Malo fokusiraniji odabir tokena
    frequencyPenalty: 0.2, // Minimalna kazna za ponavljanje
    presencePenalty: 0.1   // Minimalna kazna za prisutnost
  };
  
  try {
    // Pošalji dva zahtjeva s različitim konfiguracijama uzorkovanja
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

U prethodnom kodu smo:

- Inicijalizirali MCP klijenta s URL-om poslužitelja i API ključem.
- Konfigurirali dvije skupine parametara uzorkovanja: jednu za kreativne zadatke, drugu za faktografske.
- Poslali zahtjeve s ovim konfiguracijama, dopuštajući modelu korištenje specifičnih alata za svaki zadatak.
- Ispisali generirane odgovore da demonstriramo učinke različitih parametara uzorkovanja.
- Koristili `allowedTools` kako bismo naveli koje alate model može koristiti tijekom generiranja. U ovom slučaju, dozvolili smo `ideaGenerator` i `environmentalImpactTool` za kreativne zadatke, te `factChecker` i `dataAnalysisTool` za faktografske zadatke.
- Koristili `temperature` za kontrolu slučajnosti izlaza, gdje veće vrijednosti vode do kreativnijih odgovora.
- Koristili `top_p` za ograničenje izbora tokena na one koji doprinose vrhovnoj kumulativnoj vjerojatnosti, poboljšavajući kvalitetu generiranog teksta.
- Koristili `frequencyPenalty` i `presencePenalty` za smanjenje ponavljanja i poticanje raznolikosti u izlazu.
- Koristili `top_k` za ograničenje modela na top K najvjerojatnije tokene, što može pomoći u stvaranju koherentnijih odgovora.

---

## Determinističko uzorkovanje

Za aplikacije koje zahtijevaju dosljedne izlaze, determinističko uzorkovanje osigurava reproducibilne rezultate. To postiže upotrebom fiksnog slučajnog sjemena i postavljanjem temperature na nulu.

Pogledajmo primjer implementacije u nastavku za demonstraciju determinističkog uzorkovanja u različitim programskim jezicima.

# [Java](#tab/java)

```java
// Primjer u Javi: Deterministički odgovori s fiksnim sjeme
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Korištenje fiksnog sjemena za determinističke rezultate
        
        // Prvi zahtjev s fiksnim sjemenom
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Temperatura nula za maksimalnu determinističnost
            .build();
            
        // Drugi zahtjev s istim sjemenom
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Izvrši oba zahtjeva
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Odgovori bi trebali biti identični zbog istog sjemena i temperature=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

U prethodnom kodu smo:

- Kreirali MCP klijenta sa specificiranim URL-om poslužitelja.
- Konfigurirali dva zahtjeva s istim upitom, fiksnim sjemenom i temperaturom nula.
- Poslali oba zahtjeva i ispisali generirani tekst.
- Demonstrirali da su odgovori identični zbog determinističke prirode konfiguracije uzorkovanja (isto sjeme i temperatura).
- Koristili `setSeed` za specificiranje fiksnog slučajnog sjemena, osiguravajući da model uvijek generira isti izlaz za isti unos.
- Postavili `temperature` na nulu da zajamče maksimalni deterministički rezultat, što znači da model uvijek bira najvjerojatniji sljedeći token bez slučajnosti.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript primjer: Deterministički odgovori s kontrolom sjemena
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Prvi zahtjev s fiksnim sjemenom
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Temperatura nula za maksimalni determinizam
    });
    
    // Drugi zahtjev s istim sjemenom i temperaturom
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Treći zahtjev s različitim sjemenom ali istom temperaturom
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

U prethodnom kodu smo:

- Inicijalizirali MCP klijenta s URL-om poslužitelja.
- Konfigurirali dva zahtjeva s istim upitom, fiksnim sjemenom i temperaturom nula.
- Poslali oba zahtjeva i ispisali generirani tekst.
- Demonstrirali da su odgovori identični zbog determinističke prirode konfiguracije uzorkovanja (isto sjeme i temperatura).
- Koristili `seed` za specificiranje fiksnog slučajnog sjemena, osiguravajući da model uvijek generira isti izlaz za isti unos.
- Postavili `temperature` na nulu da zajamče maksimalni deterministički rezultat, što znači da model uvijek bira najvjerojatniji sljedeći token bez slučajnosti.
- Koristili drugačije sjeme za treći zahtjev da pokažemo kako promjena sjemena dovodi do različitih izlaza, čak i sa istim upitom i temperaturom.

---

## Dinamička konfiguracija uzorkovanja

Inteligentno uzorkovanje prilagođava parametre na temelju konteksta i zahtjeva svakog zahtjeva. To znači dinamičko podešavanje parametara kao što su temperatura, top_p i kazne na temelju vrste zadatka, korisničkih preferencija ili povijesnih rezultata.

Pogledajmo kako implementirati dinamičko uzorkovanje u različitim programskim jezicima.

# [Python](#tab/python)

```python
# Python Primjer: Dinamično uzorkovanje temeljeno na kontekstu zahtjeva
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definirajte presete uzorkovanja za različite vrste zadataka
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Odaberite osnovni preset
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Prilagodite prema korisničkim preferencijama ako su dostupne
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skalirajte temperaturu prema preferenciji kreativnosti (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Prilagodite top_p prema željenoj raznolikosti odgovora
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Kreirajte i pošaljite zahtjev s prilagođenim parametrima uzorkovanja
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Vratite odgovor s metadata uzorkovanja za transparentnost
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

U prethodnom kodu smo:

- Kreirali klasu `DynamicSamplingService` koja upravlja prilagodljivim uzorkovanjem.
- Definirali uzorkovne presete za različite vrste zadataka (kreativni, faktografski, kodni, analitički).
- Odabrali osnovni preset uzorkovanja na temelju vrste zadatka.
- Prilagodili parametre uzorkovanja prema korisničkim preferencijama, poput razine kreativnosti i raznolikosti.
- Poslali zahtjev s dinamički konfiguriranim parametrima uzorkovanja.
- Vratili generirani tekst zajedno s primijenjenim parametrima uzorkovanja i vrstom zadatka radi transparentnosti.
- Koristili `temperature` za kontrolu slučajnosti izlaza, gdje veće vrijednosti vode do kreativnijih odgovora.
- Koristili `top_p` za ograničenje izbora tokena na one koji doprinose vrhovnoj kumulativnoj vjerojatnosti, poboljšavajući kvalitetu generiranog teksta.
- Koristili `frequency_penalty` za smanjenje ponavljanja i poticanje raznolikosti u izlazu.
- Koristili `user_preferences` za omogućavanje prilagodbe parametara uzorkovanja na temelju korisnički definirane razine kreativnosti i raznolikosti.
- Koristili `task_type` za određivanje primjerene strategije uzorkovanja za zahtjev, dopuštajući preciznije odgovore bazirane na prirodi zadatka.
- Koristili metodu `send_request` za slanje upita s konfiguriranim parametrima uzorkovanja, osiguravajući da model generira tekst prema specificiranim zahtjevima.
- Koristili `generated_text` za dohvaćanje odgovora modela, koji se zatim vraća zajedno s parametrima uzorkovanja i vrstom zadatka za daljnju analizu ili prikaz.
- Koristili funkcije `min` i `max` da osiguramo da su korisničke preferencije ograničene unutar valjanih raspona, sprječavajući nevaljane konfiguracije uzorkovanja.

# [JavaScript Dinamički](#tab/javascript-dynamic)

```javascript
// JavaScript primjer: Dinamička konfiguracija uzorkovanja temeljena na korisničkom kontekstu
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Definirajte osnovne profile uzorkovanja
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Pratite povijesne performanse
    this.performanceHistory = [];
  }
  
  // Otkrivanje vrste zadatka iz upita
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Jednostavna heuristička detekcija - može se poboljšati klasifikacijom strojnog učenja
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
    
    // Zadano na razgovorni način ako nije otkrivena jasna vrsta
    return 'conversational';
  }
  
  // Izračunajte parametre uzorkovanja temeljeno na kontekstu i korisničkim postavkama
  getSamplingParameters(prompt, context = {}) {
    // Otkrivanje vrste zadatka
    const taskType = this.detectTaskType(prompt, context);
    
    // Dohvati osnovni profil
    let params = {...this.samplingProfiles[taskType]};
    
    // Prilagodba temeljem korisničkih preferencija
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Skaliranje s 1-10 na odgovarajući raspon temperature
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Veća preciznost znači manji topP (fokusiraniji odabir)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Veća konzistentnost znači manje kazni
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Primijeni naučene prilagodbe iz povijesti performansi
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Jednostavna prilagodljiva logika - može se poboljšati sofisticiranijim algoritmima
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Razmotri samo nedavnu povijest
    
    if (relevantHistory.length > 0) {
      // Izračunaj prosječne ocjene performansi
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Ako su performanse ispod praga, prilagodi parametre
      if (avgScore < 0.7) {
        // Blaga prilagodba prema sigurnijim vrijednostima
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Zabilježi performanse za buduće prilagodbe
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Ocjena kvalitete odgovora od 0 do 1
    });
    
    // Ograniči veličinu povijesti
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Dohvati optimizirane parametre uzorkovanja
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Pošalji zahtjev s optimiziranim parametrima
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Ako korisnik da povratnu informaciju, zabilježi je za buduću optimizaciju
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

// Primjer korištenja
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreativni zadatak s prilagođenim korisničkim postavkama
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Visoka kreativnost (1-10)
          consistency: 3  // Niska konzistentnost (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Zadatak generiranja koda
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Niska kreativnost
          precision: 8,   // Visoka preciznost
          consistency: 9  // Visoka konzistentnost
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

U prethodnom kodu smo:

- Kreirali klasu `AdaptiveSamplingManager` koja upravlja dinamičkim uzorkovanjem prema vrsti zadatka i korisničkim preferencijama.
- Definirali profile uzorkovanja za različite vrste zadataka (kreativni, faktografski, kodni, konverzacijski).
- Implementirali metodu za detekciju vrste zadatka iz upita koristeći jednostavne heuristike.
- Izračunali parametre uzorkovanja na temelju otkrivene vrste zadatka i korisničkih preferencija.
- Primijenili naučene prilagodbe temeljene na povijesnim rezultatima za optimizaciju parametara uzorkovanja.
- Evidentirali performanse za buduće prilagodbe, omogućujući sustavu učenje iz prošlih interakcija.
- Poslali zahtjeve s dinamički konfiguriranim parametrima uzorkovanja i vratili generirani tekst zajedno s primijenjenim parametrima i otkrivenom vrstom zadatka.
- Koristili smo:
    - `userPreferences` za omogućavanje prilagodbe parametara uzorkovanja na temelju korisnički definiranih razina kreativnosti, preciznosti i dosljednosti.
    - `detectTaskType` za određivanje prirode zadatka na temelju upita, što omogućuje preciznije odgovore.
    - `recordPerformance` za evidentiranje performansi generiranih odgovora, omogućujući sustavu prilagodbu i poboljšanje tijekom vremena.
    - `applyLearnedAdjustments` za modificiranje parametara uzorkovanja na temelju povijesnih rezultata, unapređujući sposobnost modela za generiranje kvalitetnijih odgovora.
    - `generateResponse` za objedinjavanje cjelokupnog procesa generiranja odgovora s adaptivnim uzorkovanjem, što olakšava pozive s različitim upitima i kontekstima.
    - `allowedTools` za specificiranje alata koje model može koristiti tijekom generiranja, omogućujući odgovore koji bolje razumiju kontekst.
    - `feedbackScore` za dopuštanje korisnicima da daju povratne informacije o kvaliteti generiranog odgovora, što se može koristiti za dodatno usavršavanje performansi modela tijekom vremena.
    - `performanceHistory` za održavanje zapisa o prošlim interakcijama, omogućujući sustavu učenje iz prethodnih uspjeha i neuspjeha.
    - `getSamplingParameters` za dinamičko prilagođavanje parametara uzorkovanja na temelju konteksta zahtjeva, omogućujući fleksibilnije i reaktivnije ponašanje modela.
    - `detectTaskType` za klasifikaciju zadatka na temelju upita, omogućujući sustavu primjenu odgovarajućih strategija uzorkovanja za različite vrste zahtjeva.
    - `samplingProfiles` za definiranje osnovnih konfiguracija uzorkovanja za različite vrste zadataka, što omogućuje brze prilagodbe temeljene na prirodi zahtjeva.

---

## Što slijedi

- [5.7 Skaliranje](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->