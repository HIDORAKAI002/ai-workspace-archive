> [IMEZUIWA: 2026-07-28 OMBI LA TOLEO](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Kuchanganya Sampuli katika Itifaki ya Muktadha wa Mfano

> **Kiarifa cha kuachwa:** mgombea wa toleo la sifa ya MCP `2026-07-28` unaweka Sampuli kama imeachwa kwa ajili ya muingiliano wa moja kwa moja na API za wasambazaji wa LLM. Sampuli inaendelea kufanya kazi katika `2025-11-25` na kwa angalau mwaka mmoja baada ya kuachwa rasmi, kwa hivyo kila kitu katika somo hili kinabaki halali - lakini miundo mipya ya seva inapaswa kutathmini mfano wa mbadala. Angalia [Nini Kinabadilika katika MCP: Mgombea wa Toleo la 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Sampuli ni kipengele chenye nguvu cha MCP kinachoruhusu seva kutuma maombi ya ukamilishaji wa LLM kupitia mteja, kuwezesha tabia za wakala zilizo na ubunifu huku zikidumisha usalama na faragha. Mipangilio sahihi ya sampuli inaweza kuboresha sana ubora na utendaji wa majibu. MCP hutoa njia sanifu ya kudhibiti jinsi mifano inavyotengeneza maandishi kwa vigezo maalum vinavyoathiri urandikaji, ubunifu, na mlingano.

## Utangulizi

Katika somo hili, tutaangalia jinsi ya kuweka mipangilio ya sampuli katika maombi ya MCP na kuelewa mbinu za msingi za itifaki ya sampuli.

## Malengo ya Kujifunza

Mwisho wa somo hili, utakuwa na uwezo wa:

- Kuelewa vigezo muhimu vya sampuli vinavyopatikana katika MCP.
- Kuweka mipangilio ya sampuli kwa matumizi tofauti.
- Kutekeleza sampuli ya uhakika kwa matokeo yanayoweza kurudiwa.
- Kurekebisha kwa nguvu vigezo vya sampuli kulingana na muktadha na mapendeleo ya mtumiaji.
- Kutumia mikakati ya sampuli kuboresha utendaji wa mfano katika hali tofauti.
- Kuelewa jinsi sampuli inavyofanya kazi katika mzunguko wa mteja-seva wa MCP.

## Jinsi Sampuli Inavyofanya Kazi katika MCP

Mzunguko wa sampuli katika MCP unafuata hatua hizi:

1. Seva inatuma ombi la `sampling/createMessage` kwa mteja
2. Mteja anapitia ombi na anaweza kuibadilisha
3. Mteja huchangamsha sampuli kutoka kwa LLM
4. Mteja anapitia ukamilishaji
5. Mteja hurudisha matokeo kwa seva

Muundo huu wa binadamu-katika-mzunguko unahakikisha watumiaji wanadhibiti kile LLM inachoona na kinachotengeneza.

## Muhtasari wa Vigezo vya Sampuli

MCP inafafanua vigezo vifuatavyo vya sampuli vinavyoweza kuwekwa katika maombi ya mteja:

| Kigezo | Maelezo | Kiwango cha Kawaida |
|-----------|-------------|---------------|
| `temperature` | Hudhibiti urandikaji katika uteuzi wa tokeni | 0.0 - 1.0 |
| `maxTokens` | Idadi kubwa kabisa ya tokeni kutengeneza | Thamani ya nambari kamili |
| `stopSequences` | Mraba wa mfuatano unaosimamisha uundaji wakati unapotokea | Safu ya mistari |
| `metadata` | Vigezo vya ziada vya kihususi kwa mtoa huduma | Kielelezo cha JSON |

Watoa huduma wengi wa LLM wanaunga mkono vigezo za ziada kupitia uwanja wa `metadata`, ambazo zinaweza kujumuisha:

| Kigezo cha Ziada Kinachotumika | Maelezo | Kiwango cha Kawaida |
|-----------|-------------|---------------|
| `top_p` | Sampuli ya nyufa - inazuia tokeni kwa uwezekano wa juu zaidi wa thamani ya jumla | 0.0 - 1.0 |
| `top_k` | Inazuia uteuzi wa tokeni kwa chaguzi K bora | 1 - 100 |
| `presence_penalty` | Inakemea tokeni kulingana na uwepo wao katika maandishi hadi sasa | -2.0 - 2.0 |
| `frequency_penalty` | Inakemea tokeni kulingana na mara ngapi zinaonekana katika maandishi hadi sasa | -2.0 - 2.0 |
| `seed` | Mchanga maalum wa nasibu kwa matokeo yanayoweza kurudiwa | Thamani ya nambari kamili |

## Mfano wa Muundo wa Ombi

Hapa kuna mfano wa kuomba sampuli kutoka kwa mteja katika MCP:

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

## Muundo wa Jibu

Mteja hurudisha matokeo ya ukamilishaji:

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

## Udhibiti wa Binadamu katika Mzunguko

Sampuli ya MCP imesanifiwa kwa kuzingatia uangalizi wa binadamu:

- **Kwa msukumo**:
  - Wateja wanapaswa kuwaonyesha watumiaji msukumo uliopendekezwa
  - Watumiaji wanapaswa kuweza kubadilisha au kukataa misukumo
  - Misukumo ya mfumo inaweza kuchujwa au kubadilishwa
  - Ujumuishaji wa muktadha unadhibitiwa na mteja

- **Kwa makamilisho**:
  - Wateja wanapaswa kuwaonyesha watumiaji ukamilishaji
  - Watumiaji wanapaswa kuweza kubadilisha au kukataa makamilisho
  - Wateja wanaweza kuchuja au kubadilisha makamilisho
  - Watumiaji wanadhibiti ni mfano gani unapotumika

Kwa misingi hii, tuchukulie jinsi ya kutekeleza sampuli katika lugha mbalimbali za programu, tukizingatia vigezo vinavyoungwa mkono kawaida na watoa huduma wa LLM.

## Kujali Usalama

Unapotekeleza sampuli katika MCP, zizingatie kanuni hizi bora za usalama:

- **Thibitisha maudhui yote ya ujumbe** kabla ya kuutuma kwa mteja
- **Safisha taarifa nyeti** kutoka katika misukumo na makamilisho
- **Tekeleza mipaka ya kasi** kuzuia matumizi mabaya
- **Fuatilia matumizi ya sampuli** kwa mifumo isiyo ya kawaida
- **Ficha data inayosafiri** kwa kutumia itifaki salama
- **Dhibiti faragha ya data ya mtumiaji** kulingana na kanuni husika
- **Kagua maombi ya sampuli** kwa ulinganifu na usalama
- **Dhibiti mfiduo wa gharama** kwa mipaka inayofaa
- **Tekeleza muda wa kusubiri** kwa maombi ya sampuli
- **Shughulikia makosa ya mfano kwa upole** kwa mbadala zinazofaa

Vigezo vya sampuli huruhusu kurekebisha tabia za mifano ya lugha ili kupata usawa unaotakiwa kati ya matokeo ya uhakika na ubunifu.

Tuchukulie jinsi ya kuweka vigezo hivi katika lugha tofauti za programu.

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

Katika msimbo uliotangulia tumefanya:

- Kuunda mteja wa MCP kwa URL maalum ya seva.
- Kuweka ombi na vigezo vya sampuli kama `temperature`, `top_p`, na `top_k`.
- Kutuma ombi na kuchapisha maandishi yaliyotengenezwa.
- Kutumia:
    - `allowedTools` kubainisha zana gani mfano unaweza kutumia wakati wa uundaji. Katika kesi hii, tuliruhusu zana za `ideaGenerator` na `marketAnalyzer` kusaidia kuunda mawazo ya ubunifu ya programu.
    - `frequencyPenalty` na `presencePenalty` kudhibiti rudia na utofauti katika matokeo.
    - `temperature` kudhibiti urandikaji wa matokeo, ambapo thamani kubwa hupelekea majibu ya ubunifu zaidi.
    - `top_p` kuzuia uteuzi wa tokeni kwa zile zinazochangia wingi wa uwezekano wa kilele, kuboresha ubora wa maandishi yaliyotengenezwa.
    - `top_k` kupunguza mfano kwa tokeni K bora kabisa, ambayo inaweza kusaidia kuzalisha majibu yenye mlingano bora zaidi.
    - `frequencyPenalty` na `presencePenalty` kupunguza rudia na kuhamasisha utofauti katika maandishi yaliyotengenezwa.

# [JavaScript](#tab/javascript)

```javascript
// Mfano wa JavaScript: Mipangilio ya Sampuli ya Joto na Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Anzisha mteja wa MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Sanidi ombi kwa vigezo tofauti vya sampuli
  const creativeSampling = {
    temperature: 0.9,    // Joto kubwa = randomness/ubunifu zaidi
    topP: 0.92,          // Zingatia tokeni zenye nafasi ya juu ya 92%
    frequencyPenalty: 0.6, // Punguza kurudiwa kwa mfuatano wa tokeni
    presencePenalty: 0.4   // Laana tokeni ambazo zimetokea katika maandishi hadi sasa
  };
  
  const factualSampling = {
    temperature: 0.2,    // Joto la chini = utabiri sahihi/wa kweli zaidi
    topP: 0.85,          // Uchaguzi kidogo wa tokeni ulio na lengo zaidi
    frequencyPenalty: 0.2, // Adhabu kidogo kwa kurudiwa
    presencePenalty: 0.1   // Adhabu kidogo kwa uwepo
  };
  
  try {
    // Tuma maombi mawili yenye mipangilio tofauti ya sampuli
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

Katika msimbo uliotangulia tumefanya:

- Kuanzisha mteja wa MCP na URL ya seva na ufunguo wa API.
- Kuweka seti mbili za vigezo vya sampuli: moja kwa kazi za ubunifu na nyingine kwa kazi za ukweli.
- Kutuma maombi na mipangilio hii, kuwezesha mfano kutumia zana maalum kwa kila kazi.
- Kuchapisha majibu yaliyotengenezwa kuonyesha athari za vigezo tofauti vya sampuli.
- Kutumia `allowedTools` kubainisha zana gani mfano unaweza kutumia wakati wa uundaji. Katika kesi hii, tuliruhusu `ideaGenerator` na `environmentalImpactTool` kwa kazi za ubunifu, na `factChecker` na `dataAnalysisTool` kwa kazi za ukweli.
- Kutumia `temperature` kudhibiti urandikaji wa matokeo, ambapo thamani kubwa hupelekea majibu ya ubunifu zaidi.
- Kutumia `top_p` kuzuia uteuzi wa tokeni kwa zile zinazochangia wingi wa uwezekano wa kilele, kuboresha ubora wa maandishi yaliyotengenezwa.
- Kutumia `frequencyPenalty` na `presencePenalty` kupunguza rudia na kuhamasisha utofauti katika matokeo.
- Kutumia `top_k` kupunguza mfano kwa tokeni K bora kabisa, ambayo inaweza kusaidia kuzalisha majibu yenye mlingano bora zaidi.

---

## Sampuli ya Uhakika

Kwa matumizi yanayohitaji matokeo yanayojirudia, sampuli ya uhakika huhakikisha matokeo yanayoweza kurudiwa. Inayofanya hivyo ni kwa kutumia mbegu ya nasibu thabiti na kuweka joto (temperature) kuwa sifuri.

Tuchukulie mfano wa utekelezaji hapa chini kuonyesha sampuli ya uhakika katika lugha mbalimbali za programu.

# [Java](#tab/java)

```java
// Mfano wa Java: Majibu ya uhakika yenye mbegu thabiti
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Kutumia mbegu thabiti kwa matokeo ya uhakika
        
        // Ombi la kwanza na mbegu thabiti
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Joto sifuri kwa uhakika wa juu zaidi
            .build();
            
        // Ombi la pili na mbegu moja
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Tekeleza maombi yote mawili
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Majibu yanapaswa kuwa sawa kutokana na mbegu na joto sawa = 0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Katika msimbo uliotangulia tumefanya:

- Kuunda mteja wa MCP na URL maalum ya seva.
- Kuweka maombi mawili na msukumo ule ule, mbegu thabiti, na joto la sifuri.
- Kutuma maombi yote mawili na kuchapisha maandishi yaliyotengenezwa.
- Kuonyesha kuwa majibu ni sawa kwa sababu ya asili ya uhakika ya mipangilio ya sampuli (mbegu na joto zile zile).
- Kutumia `setSeed` kubainisha mbegu thabiti ya nasibu, kuhakikisha mfano unazalisha matokeo yale yale kwa pembejeo ile ile kila wakati.
- Kuweka `temperature` kuwa sifuri kuhakikisha uhakika wa juu, ikimaanisha mfano daima huchagua tokeni inayowezekana zaidi ifuatayo bila urandikaji.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Mfano wa JavaScript: Majibu ya uhakika kwa udhibiti wa mbegu
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Ombi la kwanza lenye mbegu iliyowekwa
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Halijoto sifuri kwa uhakika mkubwa
    });
    
    // Ombi la pili lenye mbegu na halijoto sawa
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Ombi la tatu lenye mbegu tofauti lakini halijoto ile ile
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

Katika msimbo uliotangulia tumefanya:

- Kuanzisha mteja wa MCP na URL ya seva.
- Kuweka maombi mawili na msukumo ule ule, mbegu thabiti, na joto la sifuri.
- Kutuma maombi yote mawili na kuchapisha maandishi yaliyotengenezwa.
- Kuonyesha kuwa majibu ni sawa kwa sababu ya asili ya uhakika ya mipangilio ya sampuli (mbegu na joto zile zile).
- Kutumia `seed` kubainisha mbegu thabiti ya nasibu, kuhakikisha mfano unazalisha matokeo yale yale kwa pembejeo ile ile kila wakati.
- Kuweka `temperature` kuwa sifuri kuhakikisha uhakika wa juu, ikimaanisha mfano daima huchagua tokeni inayowezekana zaidi ifuatayo bila urandikaji.
- Kutumia mbegu tofauti kwa ombi la tatu kuonyesha kuwa kubadilisha mbegu kunaleta matokeo tofauti, hata kwa msukumo na joto lile lile.

---

## Mipangilio ya Sampuli Inayobadilika

Sampuli ya akili hubadilisha vigezo kulingana na muktadha na mahitaji ya kila ombi. Hii inamaanisha kurekebisha vigezo kama joto, top_p, na adhabu kulingana na aina ya kazi, mapendeleo ya mtumiaji, au utendaji wa kihistoria.

Tuchukulie jinsi ya kutekeleza sampuli inayobadilika katika lugha tofauti za programu.

# [Python](#tab/python)

```python
# Mfano wa Python: Sampuli inayobadilika kulingana na muktadha wa ombi
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Eleza mipangilio ya sampuli kwa aina tofauti za kazi
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Chagua mpangilio msingi
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Rekebisha kulingana na mapendeleo ya mtumiaji ikiwa yametolewa
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Pima joto kulingana na upendeleo wa ubunifu (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Rekebisha top_p kulingana na utofauti unaotakiwa wa majibu
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Tengeneza na tuma ombi lenye vigezo vya sampuli maalum
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Rudisha jibu lenye metadata ya sampuli kwa uwazi
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Katika msimbo uliotangulia tumefanya:

- Kuunda darasa la `DynamicSamplingService` linalosimamia sampuli inayobadilika.
- Kufafanua mipangilio ya sampuli kwa aina tofauti za kazi (ubunifu, ukweli, msimbo, uchambuzi).
- Kuchagua mipangilio ya msingi ya sampuli kulingana na aina ya kazi.
- Kurekebisha vigezo vya sampuli kulingana na mapendeleo ya mtumiaji, kama kiwango cha ubunifu na utofauti.
- Kutuma ombi na vigezo vya sampuli vilivyorekebishwa kwa nguvu.
- Kurudisha maandishi yaliyotengenezwa pamoja na vigezo vya sampuli vilivyotumika na aina ya kazi kwa uwazi.
- Kutumia `temperature` kudhibiti urandikaji wa matokeo, ambapo thamani kubwa hupelekea majibu ya ubunifu zaidi.
- Kutumia `top_p` kuzuia uteuzi wa tokeni kwa zile zinazochangia wingi wa uwezekano wa kilele, kuboresha ubora wa maandishi yaliyotengenezwa.
- Kutumia `frequency_penalty` kupunguza rudia na kuhamasisha utofauti katika matokeo.
- Kutumia `user_preferences` kuruhusu ubinafsishaji wa vigezo vya sampuli kulingana na viwango vya ubunifu na utofauti vilivyoainishwa na mtumiaji.
- Kutumia `task_type` kubainisha mkakati sahihi wa sampuli kwa ombi, kuruhusu majibu yaliyobinafsishwa zaidi kulingana na sifa ya kazi.
- Kutumia njia ya `send_request` kutuma msukumo na vigezo vilivyorekebishwa vya sampuli, kuhakikisha mfano unazalisha maandishi kulingana na mahitaji yaliyobainishwa.
- Kutumia `generated_text` kupata jibu la mfano, ambalo hurudishwa pamoja na vigezo na aina ya kazi kwa uchambuzi zaidi au kuonyesha.
- Kutumia `min` na `max` kuhakikisha mapendeleo ya mtumiaji yamezuiwa ndani ya mipaka halali, kuzuia mipangilio isiyo halali ya sampuli.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Mfano wa JavaScript: usanidi wa sampuli unaobadilika kulingana na muktadha wa mtumiaji
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Eleza wasifu wa msingi wa sampuli
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Fuatilia utendaji wa kihistoria
    this.performanceHistory = [];
  }
  
  // Gundua aina ya kazi kutoka kwa maelekezo
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Ugunduzi rahisi wa kanuni - unaweza kuboreshwa kwa matumizi ya uainishaji wa ML
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
    
    // Chagua mazungumzo kama chaguo la msingi ikiwa hakuna aina wazi inayotambulika
    return 'conversational';
  }
  
  // Hesabu vigezo vya sampuli kulingana na muktadha na mapendeleo ya mtumiaji
  getSamplingParameters(prompt, context = {}) {
    // Gundua aina ya kazi
    const taskType = this.detectTaskType(prompt, context);
    
    // Pata wasifu wa msingi
    let params = {...this.samplingProfiles[taskType]};
    
    // Rekebisha kulingana na mapendeleo ya mtumiaji
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Pima kutoka 1-10 hadi kiwango kinachofaa cha joto
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Uhakika zaidi maana ya topP chini (uchaguzi uliolengwa zaidi)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Ulinganifu wa juu maana adhabu za chini
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Tumia marekebisho yaliyojifunza kutoka kwa historia ya utendaji
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Mantiki rahisi inayobadilika - inaweza kuboreshwa kwa algoriti za hali ya juu zaidi
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Chukua tu historia ya hivi karibuni
    
    if (relevantHistory.length > 0) {
      // Hesabu alama za wastani za utendaji
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Ikiwa utendaji uko chini ya kiwango, rekebisha vigezo
      if (avgScore < 0.7) {
        // Marekebisho kidogo kuelekea thamani salama zaidi
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Rekodi utendaji kwa ajili ya marekebisho ya baadaye
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Upimaji wa ubora wa majibu 0-1
    });
    
    // Punguza ukubwa wa historia
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Pata vigezo vya sampuli vilivyoboreshwa
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Tuma ombi lenye vigezo vilivyoboreshwa
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Ikiwa mtumiaji anatoa maoni, rekodi kwa uboreshaji wa baadaye
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

// Mfano wa matumizi
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kazi ya ubunifu yenye mapendeleo ya mtumiaji ya kawaida
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Ubunifu wa hali ya juu (1-10)
          consistency: 3  // Ulinganifu mdogo (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Kazi ya uandishi wa msimbo
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Ubunifu mdogo
          precision: 8,   // Uhakika wa juu
          consistency: 9  // Ulinganifu wa juu
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

Katika msimbo uliotangulia tumefanya:

- Kuunda darasa la `AdaptiveSamplingManager` linalosimamia sampuli inayobadilika kulingana na aina ya kazi na mapendeleo ya mtumiaji.
- Kufafanua wasifu wa sampuli kwa aina tofauti za kazi (ubunifu, ukweli, msimbo, mazungumzo).
- Kutekeleza njia ya kugundua aina ya kazi kutoka kwa msukumo kwa kutumia sheria rahisi.
- Kukokotoa vigezo vya sampuli kulingana na aina ya kazi iliyogunduliwa na mapendeleo ya mtumiaji.
- Kutumia marekebisho yaliyojifunza kulingana na utendaji wa kihistoria kuboresha vigezo vya sampuli.
- Kurekodi utendaji kwa marekebisho ya baadaye, kuruhusu mfumo kujifunza kutokana na mwingiliano ya zamani.
- Kutuma maombi na vigezo vya sampuli vilivyorekebishwa kwa nguvu na kurudisha maandishi yaliyotengenezwa pamoja na vigezo na aina ya kazi iliyogunduliwa.
- Kutumia:
    - `userPreferences` kuruhusu ubinafsishaji wa vigezo vya sampuli kulingana na viwango vya ubunifu, usahihi, na uthabiti vilivyoainishwa na mtumiaji.
    - `detectTaskType` kubainisha asili ya kazi kutoka kwa msukumo, kuruhusu majibu yaliyobinafsishwa zaidi.
    - `recordPerformance` kurekodi utendaji wa majibu yaliyotengenezwa, kuwezesha mfumo kubadilika na kuboresha kwa muda.
    - `applyLearnedAdjustments` kurekebisha vigezo vya sampuli kulingana na utendaji wa kihistoria, kuboresha uwezo wa mfano kutoa majibu ya ubora wa juu.
    - `generateResponse` kuhusisha mchakato mzima wa kutoa jibu na sampuli inayobadilika, kurahisisha kuitwa na misukumo na muktadha tofauti.
    - `allowedTools` kubainisha zana gani mfano unaweza kutumia wakati wa uundaji, kuruhusu majibu yenye ufahamu zaidi wa muktadha.
    - `feedbackScore` kuruhusu watumiaji kutoa maoni juu ya ubora wa jibu lililotengenezwa, ambalo linaweza kutumika kuboresha utendaji wa mfano kwa muda.
    - `performanceHistory` kudumisha rekodi ya mwingiliano wa zamani, kuwezesha mfumo kujifunza kutoka kwa mafanikio na matatizo ya zamani.
    - `getSamplingParameters` kurekebisha vigezo vya sampuli kiurahisi kulingana na muktadha wa ombi, kuruhusu tabia ya mfano kuwa nyepesi na yenye uwajibikaji zaidi.
    - `detectTaskType` kuainisha kazi kulingana na msukumo, kuwezesha mfumo kutumia mikakati sahihi ya sampuli kwa aina tofauti za maombi.
    - `samplingProfiles` kufafanua usanidi wa msingi wa sampuli kwa aina tofauti za kazi, kuruhusu marekebisho ya haraka kulingana na asili ya ombi.

---

## Nini kifuatacho

- [5.7 Kupanua](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->