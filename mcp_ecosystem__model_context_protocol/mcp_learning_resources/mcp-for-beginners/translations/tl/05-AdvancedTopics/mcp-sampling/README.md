> [DEPRECATED: 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Pagsusampling sa Model Context Protocol

> **Patalastas ng pag-deprecate:** Ang `2026-07-28` MCP specification release candidate ay nagmamarka ng Sampling bilang deprecated pabor sa direktang integrasyon sa mga LLM provider APIs. Patuloy na gumagana ang Sampling sa `2025-11-25` at kahit isang taon pagkatapos ng anumang pormal na pag-deprecate, kaya ang lahat ng nasa araling ito ay nananatiling balido - ngunit dapat suriin ng mga bagong disenyo ng server ang kapalit na pattern. Tingnan ang [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Ang sampling ay isang makapangyarihang tampok ng MCP na nagpapahintulot sa mga server na humiling ng LLM completions sa pamamagitan ng client, na nagpapagana ng mas sopistikadong agentic behaviors habang pinapanatili ang seguridad at privacy. Ang tamang sampling configuration ay maaaring makaapekto nang malaki sa kalidad at performance ng tugon. Nagbibigay ang MCP ng standardized na paraan upang kontrolin kung paano bumubuo ng teksto ang mga modelo gamit ang tiyak na mga parameter na nakakaapekto sa randomness, creativity, at coherence.

## Panimula

Sa araling ito, susuriin natin kung paano isaayos ang mga sampling parameter sa mga kahilingan ng MCP at unawain ang mga mekanika ng protocol sa likod ng sampling.

## Mga Layunin ng Pagkatuto

Sa pagtatapos ng araling ito, magagawa mong:

- Unawain ang mga pangunahing parameter ng sampling na magagamit sa MCP.
- Isaayos ang mga parameter ng sampling para sa iba't ibang mga kaso ng paggamit.
- Ipatupad ang deterministic sampling para sa mga reproducible na resulta.
- Dinamikong i-adjust ang mga parameter ng sampling batay sa konteksto at mga kagustuhan ng gumagamit.
- Ilapat ang mga estratehiya sa sampling para mapabuti ang performance ng modelo sa iba't ibang senaryo.
- Unawain kung paano gumagana ang sampling sa daloy ng client-server ng MCP.

## Paano Gumagana ang Sampling sa MCP

Sinusunod ng daloy ng sampling sa MCP ang mga hakbang na ito:

1. Nagpapadala ang server ng `sampling/createMessage` na kahilingan sa client
2. Sinusuri ng client ang kahilingan at maaaring baguhin ito
3. Nag-sample ang client mula sa isang LLM
4. Sinusuri ng client ang completion
5. Ibinabalik ng client ang resulta sa server

Tinitiyak ng disenyo na may human-in-the-loop na pinapanatili ng mga gumagamit ang kontrol sa kung ano ang nakikita at ginagawa ng LLM.

## Pangkalahatang-ideya ng Mga Parameter ng Sampling

Tinukoy ng MCP ang mga sumusunod na parameter ng sampling na maaaring isaayos sa mga kahilingan ng client:

| Parameter | Deskripsyon | Karaniwang Saklaw |
|-----------|-------------|--------------------|
| `temperature` | Kinokontrol ang randomness sa pagpili ng token | 0.0 - 1.0 |
| `maxTokens` | Maximum na bilang ng tokens na bubuuin | Halaga ng integer |
| `stopSequences` | Mga pasadyang sequence na humihinto sa pagbuo kapag naabot | Array ng mga string |
| `metadata` | Karagdagang mga parameter na specific sa provider | JSON object |

Maraming LLM provider ang sumusuporta sa karagdagang mga parameter sa pamamagitan ng `metadata` field, na maaaring kabilang ang:

| Karaniwang Extension Parameter | Deskripsyon | Karaniwang Saklaw |
|-----------------------------|-------------|--------------------|
| `top_p` | Nucleus sampling - nililimitahan ang mga token sa nangungunang cumulative probability | 0.0 - 1.0 |
| `top_k` | Nililimitahan ang pagpili ng token sa nangungunang K na opsyon | 1 - 100 |
| `presence_penalty` | Pinaparusahan ang mga token base sa kanilang presensya sa teksto | -2.0 - 2.0 |
| `frequency_penalty` | Pinaparusahan ang mga token base sa kanilang dalas sa teksto | -2.0 - 2.0 |
| `seed` | Tiyak na random seed para sa reproducible na mga resulta | Halaga ng integer |

## Halimbawa ng Format ng Kahilingan

Narito ang isang halimbawa ng paghingi ng sampling mula sa isang client sa MCP:

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

## Format ng Tugon

Nagbabalik ang client ng resulta ng completion:

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

## Mga Kontrol ng Tao sa Loop

Dinisenyo ang MCP sampling na may pangangalaga ng tao:

- **Para sa mga prompt**:
  - Dapat ipakita ng mga client sa mga gumagamit ang iminungkahing prompt
  - Dapat magkaroon ng kakayahan ang mga gumagamit na baguhin o tanggihan ang mga prompt
  - Maaaring i-filter o baguhin ang mga system prompt
  - Ang pagsasama ng konteksto ay kinokontrol ng client

- **Para sa mga completion**:
  - Dapat ipakita ng mga client sa mga gumagamit ang completion
  - Dapat magkaroon ng kakayahan ang mga gumagamit na baguhin o tanggihan ang mga completion
  - Maaaring i-filter o baguhin ng mga client ang mga completion
  - Pinipili ng mga gumagamit kung aling modelo ang gagamitin

Sa mga prinsipyong ito, tingnan natin kung paano ipatupad ang sampling sa iba't ibang mga programming language, na nakatuon sa mga parameter na karaniwang sinusuportahan sa iba't ibang LLM provider.

## Mga Pagsasaalang-alang sa Seguridad

Kapag nagpapatupad ng sampling sa MCP, isaalang-alang ang mga sumusunod na pinakamahusay na kasanayan sa seguridad:

- **I-validate ang lahat ng nilalaman ng mensahe** bago ito ipadala sa client
- **Linisin ang sensitibong impormasyon** mula sa mga prompt at completion
- **Magpatupad ng rate limits** upang maiwasan ang pang-aabuso
- **Subaybayan ang paggamit ng sampling** para sa kakaibang mga pattern
- **I-encrypt ang data habang nasa transit** gamit ang mga secure na protocol
- **Pamamahalaan ang privacy ng data ng gumagamit** ayon sa mga kaugnay na regulasyon
- **I-audit ang mga kahilingan sa sampling** para sa pagsunod at seguridad
- **Kontrolin ang exposure sa gastos** gamit ang angkop na limitasyon
- **Magpatupad ng timeouts** para sa mga kahilingan sa sampling
- **Mag-handle ng mga error sa modelo nang maayos** gamit ang angkop na fallback

Pinapayagan ng mga parameter ng sampling na pinuhin ang ugali ng mga language model upang makamit ang nais na balanse sa pagitan ng deterministic at malikhaing output.

Tingnan natin kung paano isaayos ang mga parameter na ito sa iba't ibang mga programming language.

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

Sa nakaraang code, nagawa naming:

- Lumikha ng MCP client na may tiyak na URL ng server.
- Isaayos ang kahilingan gamit ang mga parameter ng sampling tulad ng `temperature`, `top_p`, at `top_k`.
- Ipinadala ang kahilingan at inilimbag ang nabuo na teksto.
- Ginamit ang:
    - `allowedTools` upang tukuyin kung aling mga tool ang maaaring gamitin ng modelo habang bumubuo. Sa kasong ito, pinayagan namin ang `ideaGenerator` at `marketAnalyzer` na tumulong sa paglikha ng mga malikhaing ideya para sa app.
    - `frequencyPenalty` at `presencePenalty` upang kontrolin ang pag-uulit at pagkakaiba-iba sa output.
    - `temperature` upang kontrolin ang randomness ng output, kung saan mas mataas ang mga halaga ay nagreresulta sa mas malikhain na mga tugon.
    - `top_p` upang limitahan ang pagpili ng mga token sa mga nag-aambag sa nangungunang cumulative probability mass, na nagpapabuti sa kalidad ng nabuo na teksto.
    - `top_k` upang limitahan ang modelo sa nangungunang K na pinakamatatag na mga token, na makakatulong sa pagbuo ng mas coherent na mga tugon.
    - `frequencyPenalty` at `presencePenalty` upang mabawasan ang pag-uulit at hikayatin ang pagkakaiba-iba ng texte na nabuo.

# [JavaScript](#tab/javascript)

```javascript
// Halimbawa sa JavaScript: Temperature at Top-P sampling configuration
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // I-initialize ang MCP client
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // I-configure ang request gamit ang iba't ibang sampling parameters
  const creativeSampling = {
    temperature: 0.9,    // Mas mataas na temperature = mas maraming randomness/kreatibidad
    topP: 0.92,          // Isaalang-alang ang mga token na may top 92% probability mass
    frequencyPenalty: 0.6, // Bawasan ang pag-uulit ng mga pagkakasunud-sunod ng token
    presencePenalty: 0.4   // Parusahan ang mga token na lumabas na sa teksto hanggang ngayon
  };
  
  const factualSampling = {
    temperature: 0.2,    // Mas mababang temperature = mas deterministic/paktwal
    topP: 0.85,          // Medyo mas pokus na pagpili ng token
    frequencyPenalty: 0.2, // Minimal na parusa sa pag-uulit
    presencePenalty: 0.1   // Minimal na parusa sa presensya
  };
  
  try {
    // Magpadala ng dalawang request na may iba't ibang sampling configuration
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

Sa nakaraang code, nagawa naming:

- Mag-initialize ng MCP client gamit ang URL ng server at API key.
- Isaayos ang dalawang set ng mga parameter ng sampling: isa para sa mga malikhaing gawain at isa pa para sa mga factual na gawain.
- Nagpadala ng mga kahilingan gamit ang mga konfigurasyong ito, pinapayagan ang modelo na gumamit ng mga tukoy na tool para sa bawat gawain.
- Inilimbag ang mga nabuo na tugon upang ipakita ang epekto ng iba't ibang parameter ng sampling.
- Ginamit ang `allowedTools` upang tukuyin kung aling mga tool ang maaaring gamitin ng modelo habang bumubuo. Sa kasong ito, pinayagan namin ang `ideaGenerator` at `environmentalImpactTool` para sa mga malikhaing gawain, at `factChecker` at `dataAnalysisTool` para sa mga factual na gawain.
- Ginamit ang `temperature` upang kontrolin ang randomness ng output, kung saan mas mataas ang mga halaga ay nagreresulta sa mas malikhain na mga tugon.
- Ginamit ang `top_p` upang limitahan ang pagpili ng mga token sa mga nag-aambag sa nangungunang cumulative probability mass, na nagpapabuti sa kalidad ng nabuo na teksto.
- Ginamit ang `frequencyPenalty` at `presencePenalty` upang mabawasan ang pag-uulit at hikayatin ang pagkakaiba-iba ng output.
- Ginamit ang `top_k` upang limitahan ang modelo sa nangungunang K na pinakamatatag na mga token, na makakatulong sa pagbuo ng mas coherent na mga tugon.

---

## Deterministic Sampling

Para sa mga aplikasyon na nangangailangan ng palagian o parehong output, tinitiyak ng deterministic sampling ang mga reproducible na resulta. Ginagawa ito sa pamamagitan ng paggamit ng fixed random seed at pagsasaayos ng temperature sa zero.

Tingnan natin sa ibaba ang halimbawa ng pagpapatupad upang ipakita ang deterministic sampling sa iba't ibang mga programming language.

# [Java](#tab/java)

```java
// Halimbawa sa Java: Deterministikong mga sagot gamit ang nakapirming binhi
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Paggamit ng nakapirming binhi para sa deterministikong mga resulta
        
        // Unang kahilingan gamit ang nakapirming binhi
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Zero temperatura para sa pinakamataas na determinismo
            .build();
            
        // Ikalawang kahilingan gamit ang parehong binhi
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Isagawa ang parehong mga kahilingan
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Dapat magkapareho ang mga sagot dahil sa parehong binhi at temperatura=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Sa nakaraang code, nagawa naming:

- Lumikha ng MCP client na may tinukoy na URL ng server.
- Isaayos ang dalawang kahilingan na may parehong prompt, fixed seed, at zero temperature.
- Ipinadala ang parehong kahilingan at inilimbag ang nabuo na teksto.
- Ipinakita na magkatulad ang mga tugon dahil sa deterministic na katangian ng sampling configuration (parehong seed at temperature).
- Ginamit ang `setSeed` upang tukuyin ang fixed random seed, na tinitiyak na ang modelo ay bumubuo ng parehong output para sa parehong input sa bawat pagkakataon.
- Itinakda ang `temperature` sa zero upang matiyak ang maximum na determinism, ibig sabihin palaging pipiliin ng modelo ang pinaka-malamalaking susunod na token nang walang randomness.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Halimbawa ng JavaScript: Deterministikong mga tugon na may kontrol sa seed
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Unang kahilingan na may nakapirming seed
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Zero na temperatura para sa pinakamataas na determinismo
    });
    
    // Pangalawang kahilingan na may parehong seed at temperatura
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Pangatlong kahilingan na may ibang seed pero parehong temperatura
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

Sa nakaraang code, nagawa naming:

- Na-initialize ang MCP client gamit ang URL ng server.
- Isaayos ang dalawang kahilingan na may parehong prompt, fixed seed, at zero temperature.
- Ipinadala ang parehong kahilingan at inilimbag ang nabuo na teksto.
- Ipinakita na magkatulad ang mga tugon dahil sa deterministic na katangian ng sampling configuration (parehong seed at temperature).
- Ginamit ang `seed` upang tukuyin ang fixed random seed, na tinitiyak na ang modelo ay bumubuo ng parehong output para sa parehong input sa bawat pagkakataon.
- Itinakda ang `temperature` sa zero upang matiyak ang maximum na determinism, ibig sabihin palaging pipiliin ng modelo ang pinaka-malamalaking susunod na token nang walang randomness.
- Ginamit ang ibang seed para sa pangatlong kahilingan upang ipakita na ang pagbabago ng seed ay nagreresulta sa iba't ibang output, kahit na pareho ang prompt at temperature.

---

## Dinamikong Sampling Configuration

Ang matalinong sampling ay inaangkop ang mga parameter batay sa konteksto at mga pangangailangan ng bawat kahilingan. Nangangahulugan ito ng dinamikong pag-aayos ng mga parameter tulad ng temperature, top_p, at mga penalty batay sa uri ng gawain, mga kagustuhan ng gumagamit, o nakaraang performance.

Tingnan natin kung paano ipatupad ang dinamikong sampling sa iba't ibang mga programming language.

# [Python](#tab/python)

```python
# Halimbawa sa Python: Dinamikong sampling batay sa konteksto ng kahilingan
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Tukuyin ang mga preset ng sampling para sa iba't ibang uri ng gawain
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Pumili ng base preset
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Ayusin batay sa mga kagustuhan ng user kung ito ay ibinigay
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Sukatin ang temperature batay sa kagustuhan sa pagkamalikhain (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Ayusin ang top_p batay sa nais na pagkakaiba-iba ng tugon
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Gumawa at magpadala ng kahilingan gamit ang pasadyang mga parameter ng sampling
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Ibalik ang tugon kasama ng sampling metadata para sa transparency
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Sa nakaraang code, nagawa naming:

- Lumikha ng `DynamicSamplingService` class na nagmamanage ng adaptive sampling.
- Nagtakda ng mga sampling preset para sa iba't ibang uri ng gawain (malikhain, factual, code, analytical).
- Pinili ang base sampling preset batay sa uri ng gawain.
- In-adjust ang mga parameter ng sampling batay sa mga kagustuhan ng gumagamit, tulad ng creativity level at diversity.
- Ipinadala ang kahilingan gamit ang dinamikong na-configure na mga parameter ng sampling.
- Ibinalik ang nabuo na teksto kasama ang mga inilapat na parameter ng sampling at uri ng gawain para sa transparency.
- Ginamit ang `temperature` upang kontrolin ang randomness ng output, kung saan mas mataas ang mga halaga ay nagreresulta sa mas malikhain na mga tugon.
- Ginamit ang `top_p` upang limitahan ang pagpili ng mga token sa mga nag-aambag sa nangungunang cumulative probability mass, na nagpapabuti sa kalidad ng nabuo na teksto.
- Ginamit ang `frequency_penalty` upang mabawasan ang pag-uulit at hikayatin ang pagkakaiba-iba ng output.
- Ginamit ang `user_preferences` upang payagan ang customisasyon ng mga parameter ng sampling batay sa mga antas ng creativity at diversity na itinatakda ng gumagamit.
- Ginamit ang `task_type` upang tukuyin ang angkop na estratehiya sa sampling para sa kahilingan, na nagpapahintulot ng mas nakaangkop na mga tugon batay sa kalikasan ng gawain.
- Ginamit ang `send_request` method upang ipadala ang prompt na may na-configure na mga parameter ng sampling, na tinitiyak na bumubuo ang modelo ng teksto ayon sa mga tinakdang pangangailangan.
- Ginamit ang `generated_text` upang kunin ang tugon ng modelo, na pagkatapos ay ibinabalik kasama ang mga parameter ng sampling at uri ng gawain para sa karagdagang pagsusuri o pagpapakita.
- Ginamit ang `min` at `max` na mga function upang matiyak na ang mga kagustuhan ng gumagamit ay nakakulong sa loob ng balidong mga saklaw, na pumipigil sa mga hindi wastong konfigurasyon ng sampling.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Halimbawa ng JavaScript: Dynamic na pagsasaayos ng sampling batay sa konteksto ng gumagamit
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Tukuyin ang mga pangunahing profile ng sampling
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Subaybayan ang makasaysayang performance
    this.performanceHistory = [];
  }
  
  // Tuklasin ang uri ng gawain mula sa prompt
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Simpleng heuristic na pagtuklas - maaaring pahusayin gamit ang ML classification
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
    
    // Default sa conversational kung walang malinaw na uri na matukoy
    return 'conversational';
  }
  
  // Kalkulahin ang mga parameter ng sampling base sa konteksto at mga kagustuhan ng gumagamit
  getSamplingParameters(prompt, context = {}) {
    // Tuklasin ang uri ng gawain
    const taskType = this.detectTaskType(prompt, context);
    
    // Kunin ang base profile
    let params = {...this.samplingProfiles[taskType]};
    
    // Ayusin batay sa mga kagustuhan ng gumagamit
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // I-scale mula 1-10 patungo sa angkop na temperatura
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Mas mataas na precision ay nangangahulugang mas mababang topP (mas nakatuon na pagpili)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Mas mataas na consistency ay nangangahulugang mas mababang penalties
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Ipatupad ang mga natutunang pagsasaayos mula sa kasaysayan ng performance
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Simpleng adaptive na lohika - maaaring pahusayin gamit ang mas sopistikadong mga algorithm
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Isaalang-alang lamang ang kamakailang kasaysayan
    
    if (relevantHistory.length > 0) {
      // Kalkulahin ang average na score ng performance
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Kung ang performance ay mababa sa threshold, ayusin ang mga parameter
      if (avgScore < 0.7) {
        // Bahagyang pagsasaayos patungo sa mas ligtas na mga halaga
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Itala ang performance para sa mga hinaharap na pagsasaayos
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 na rating ng kalidad ng sagot
    });
    
    // Limitahan ang laki ng kasaysayan
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Kunin ang na-optimize na mga parameter ng sampling
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Ipadala ang request gamit ang na-optimize na mga parameter
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Kung nagbibigay ng feedback ang gumagamit, itala ito para sa hinaharap na pag-optimize
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

// Halimbawa ng paggamit
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Malikhaing gawain na may sariling mga kagustuhan ng gumagamit
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Mataas na pagkamalikhain (1-10)
          consistency: 3  // Mababa ang consistency (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Gawain sa pagbuo ng code
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Mababa ang pagkamalikhain
          precision: 8,   // Mataas na precision
          consistency: 9  // Mataas na consistency
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

Sa nakaraang code, nagawa naming:

- Lumikha ng `AdaptiveSamplingManager` class na nagmamanage ng dinamikong sampling batay sa uri ng gawain at mga kagustuhan ng gumagamit.
- Nag-defina ng mga profile sa sampling para sa iba't ibang uri ng gawain (malikhain, factual, code, conversational).
- Ipinatupad ang isang metodo upang tuklasin ang uri ng gawain mula sa prompt gamit ang simpleng heuristics.
- Kinalkula ang mga parameter ng sampling batay sa natukoy na uri ng gawain at mga kagustuhan ng gumagamit.
- Inilapat ang mga natutunang ayos batay sa nakaraang performance upang i-optimize ang mga parameter ng sampling.
- Nirekord ang performance para sa mga susunod na ayos, na nagpapahintulot sa system na matuto mula sa mga nakaraang interaksyon.
- Nagpadala ng mga kahilingan gamit ang dinamikong na-configure na mga parameter ng sampling at ibinalik ang nabuo na teksto kasama ang mga inilapat na parameter at natukoy na uri ng gawain.
- Ginamit ang:
    - `userPreferences` upang pahintulutan ang customisasyon ng mga parameter ng sampling batay sa mga antas ng creativity, precision, at consistency na itinakda ng gumagamit.
    - `detectTaskType` upang tukuyin ang kalikasan ng gawain batay sa prompt, na nagpapahintulot ng mas nakaangkop na mga tugon.
    - `recordPerformance` upang i-log ang performance ng mga nabuo na tugon, na nagpapahintulot sa system na mag-adapt at mag-improve sa paglipas ng panahon.
    - `applyLearnedAdjustments` upang baguhin ang mga parameter ng sampling batay sa nakaraang performance, na nagpapahusay sa kakayahan ng modelo sa pagbuo ng mataas na kalidad na mga tugon.
    - `generateResponse` upang isalpak ang buong proseso ng pagbuo ng tugon gamit ang adaptive sampling, na nagpapadali sa pagtawag gamit ang iba't ibang mga prompt at konteksto.
    - `allowedTools` upang tukuyin kung aling mga tool ang maaaring gamitin ng modelo habang bumubuo, na nagpapahintulot ng mas kontekstuwalisadong mga tugon.
    - `feedbackScore` upang payagan ang mga gumagamit na magbigay ng puna sa kalidad ng nabuo na tugon, na maaaring gamitin upang higit pang pinuhin ang performance ng modelo sa paglipas ng panahon.
    - `performanceHistory` upang panatilihin ang talaan ng mga nakaraang interaksyon, na nagpapahintulot sa system na matuto mula sa mga nakaraang tagumpay at pagkabigo.
    - `getSamplingParameters` upang dinamikong i-adjust ang mga parameter ng sampling batay sa konteksto ng kahilingan, na nagpapahintulot ng mas flexible at responsive na pag-uugali ng modelo.
    - `detectTaskType` upang iklase ang gawain batay sa prompt, na nagpapa-apply ng angkop na mga estratehiya sa sampling para sa iba't ibang uri ng kahilingan.
    - `samplingProfiles` upang tukuyin ang base sampling configurations para sa iba't ibang uri ng gawain, na nagpapahintulot ng mabilisang pag-aayos batay sa kalikasan ng kahilingan.

---

## Ano ang susunod

- [5.7 Scaling](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->