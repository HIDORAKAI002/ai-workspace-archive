> [ចុះចាស់៖ 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# ការសម្លាញ់ក្នុងបែបបទ Model Context Protocol

> **សេចក្តីជូនដំណឹងអំពីការចុះចាស់៖** អ្នកចាក់ចេញតម្រូវ MCP `2026-07-28` ប្រកាស Sampling ជាផ្នែកចុះចាស់ និងរើសជំនាន់ថ្មីជាមួយការរួមបញ្ចូលផ្ទាល់ជាមួយ API ផ្ដល់សេវា LLM ។ Sampling នៅតែដំណើរការបាននៅក្នុង `2025-11-25` និងយ៉ាងហោចណាស់មួយឆ្នាំក្រោយពីបានដាក់កំណត់ជាការចុះចាស់ផ្លូវការណាមួយ ដូច្នេះអ្វីគ្រប់យ៉ាងនៅក្នុងមេរៀននេះនៅតែមានតម្លៃ - ប៉ុន្តែការរចនាសេវាថ្មីគួរតែបញ្ជាក់លើគំរូជំនួស។ សូមមើល [តើអ្វីខ្លះកំពុងផ្លាស់ប្តូរនៅ MCP៖ Release Candidate 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)។

Sampling គឺជាលក្ខណៈពិសេសកម្រិតខ្ពស់នៃ MCP ដែលអនុញ្ញាតឱ្យម៉ាស៊ីនបម្រើស្នើសុំការសម្រេច LLM តាមរយៈភាគីអតិថិជន ដោយអនុវត្តអាកប្បកិរិយាជំនាញពិសេសខណៈដែលរក្សាសុវត្ថិភាព និងភាពឯកជន។ ការកំណត់សំណើ sampling ត្រឹមត្រូវអាចបង្កើនគុណភាពនិងសមត្ថភាពឆ្លើយតបយ៉ាងខ្លាំង។ MCP ផ្ដល់មធ្យោបាយស្តង់ដារសម្រាប់គ្រប់គ្រងរបៀបដែលម៉ូដែលបង្កើតអត្ថបទជាមួយប៉ារ៉ាម៉ែត្រក្នុងការប៉ះពាល់លើភាពចៃដន្យ ស្នាដៃ និងភាពរលូន។

## ការណែនាំ

នៅក្នុងមេរៀននេះ អ្នកនឹងស្វែងយល់ពីរបៀបកំណត់ប៉ារ៉ាម៉ែត្រ sampling ក្នុងសំណើ MCP និងយល់ពីមេកានិចបែបបទ sampling នៅក្រោមជម្រៅ។

## គោលបំណងការសិក្សា

នៅចុងបញ្ចប់មេរៀននេះ អ្នកនឹងអាច៖

- យល់ដឹងអំពីប៉ារ៉ាម៉ែត្រ sampling សំខាន់ៗដែលមាននៅក្នុង MCP។
- កំណត់ប៉ារ៉ាម៉ែត្រ sampling សម្រាប់ករណីប្រើប្រាស់នានា។
- អនុវត្ត sampling ដោយកំណត់តម្លៃដើម្បីទទួលបានលទ្ធផលអាចបញ្ចាក់ឡើងវិញបាន។
- ប្ដូរប៉ារ៉ាម៉ែត្រ sampling ដោយផ្អែកលើបរិបទ និងចំណង់ចំណូលចិត្តអ្នកប្រើ។
- បណ្តុះបណ្តាលយុទ្ធសាស្រ្ត sampling ដើម្បីបង្កើនសមត្ថភាពម៉ូដែលក្នុងស្ថានភាពនានា។
- យល់ដឹងពីរបៀបដែល sampling វះកាត់ក្នុងហូតថាម៉ិកសេវាកម្រិតអតិថិជន-ម៉ាស៊ីនបម្រើ MCP។

## របៀបធ្វើការសម្លាញ់នៅ MCP

ដំណើរការសម្លាញ់នៅ MCP រៀបចំតាមជំហានដូចខាងក្រោម៖

1. ម៉ាស៊ីនបម្រើផ្ញើសំណើ `sampling/createMessage` ទៅភាគីអតិថិជន
2. អតិថិជនពិនិត្យឡើងវិញសំណើនោះ ហើយអាចកែប្រែវា
3. អតិថិជនធ្វើការសម្លាញ់ពី LLM
4. អតិថិជនពិនិត្យផ្ទាល់លទ្ធផលសម្រេច
5. អតិថិជនផ្ញើលទ្ធផលត្រឡប់ទៅម៉ាស៊ីនបម្រើ

រចនាសម្ព័ន្ធមនុស្សនៅក្នុងសៀគ្វីនេះធានាថាអ្នកប្រើប្រាស់រក្សាតំណែងគ្រប់គ្រងលើអ្វីដែល LLM មើលឃើញ និងបង្កើតឡើង។

## សេចក្ដីសង្ខេបៈប៉ារ៉ាម៉ែត្រ Sampling

MCP បញ្ជាក់ពីប៉ារ៉ាម៉ែត្រ sampling ខាងក្រោមដែលអាចកំណត់ក្នុងសំណើអតិថិជន៖

| ប៉ារ៉ាម៉ែត្រ | ពណ៌នា | ជួរធម្មតា |
|-----------|-------------|---------------|
| `temperature` | គ្រប់គ្រងភាពចៃដន្យនៅក្នុងការជ្រើសរើសតូខែន | 0.0 - 1.0 |
| `maxTokens` | ចំនួនតូខែនអតិបរមា​ដែលត្រូវបង្កើត | តម្លៃគន្លងគត់ |
| `stopSequences` | ខ្សែរផ្ទាល់ខ្លួនដែលបញ្ឈប់ការបង្កើតនៅពេលប្រទះ | មាត្រដ្ឋានខ្សែអត្ថបទ |
| `metadata` | ប៉ារ៉ាម៉ែត្របន្ថែមជាក់លាក់ពីអ្នកផ្តល់សេវា | វត្ថុ JSON |

អ្នកផ្ដល់សេវា LLM ច្រើនគាំទ្រប៉ារ៉ាម៉ែត្របន្ថែមតាមដែន `metadata` ដែលប្រហែលមាន៖

| ប៉ារ៉ាម៉ែត្រការពង្រីកទូទៅ | ពណ៌នា | ជួរធម្មតា |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling - កំណត់តូខែនទៅក្រុមទៅកំពូលប្រូបាប៊ីលីតេរួម | 0.0 - 1.0 |
| `top_k` | កំណត់ការជ្រើសរើសតូខែនទៅជម្រើសលើកំពូល K | 1 - 100 |
| `presence_penalty` | ពិន័យតូខែនដោយផ្អែកលើការប្រើប្រាស់របស់វា | -2.0 - 2.0 |
| `frequency_penalty` | ពិន័យតូខែនដោយផ្អែកលើភាពញឹកញាប់របស់វា | -2.0 - 2.0 |
| `seed` | គ្រាប់ចៃដន្យជាក់លាក់សម្រាប់លទ្ធផលអាចចម្លងបាន | តម្លៃគន្លងគត់ |

## ទ្រង់ទ្រាយសំណើឧទាហរណ៍

នេះគឺជាឧទាហរណ៍សំណើសម្លាញ់ពីភាគីអតិថិជនក្នុង MCP ៖

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

## ទ្រង់ទ្រាយចំលើយ

ភាគីអតិថិជននាំមកជាលទ្ធផលសម្រេច៖

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

## ការគ្រប់គ្រងមនុស្សក្នុងសៀគ្វី

Sampling MCP ត្រូវបានរចនាឡើងជាមួយការត្រួតពិនិត្យដោយមនុស្ស៖

- **សម្រាប់សំណើរដើម**:
  - អតិថិជនគួរតែបង្ហាញសំណើដើមឱ្យអ្នកប្រើមើល
  - អ្នកប្រើអាចកែប្រែ ឬបដិសេធសំណើដើម
  - ម៉ោងសំណើប្រព័ន្ធអាចត្រូវបានត្រង់ ឬកែប្រែ
  - ការរួមបញ្ចូលបរិបទគ្រប់គ្រងដោយភាគីអតិថិជន

- **សម្រាប់ការសម្រេច**:
  - អតិថិជនគួរតែបង្ហាញឱ្យអ្នកប្រើឃើញលទ្ធផលសម្រេច
  - អ្នកប្រើអាចកែប្រែ ឬបដិសេធលទ្ធផលសម្រេច
  - អតិថិជនអាចត្រង់ ឬកែប្រែលទ្ធផលសម្រេចបាន
  - អ្នកប្រើគ្រប់គ្រងម៉ូដែលដែលប្រើ

ជាមួយគ្រឹះគ្រប់គ្រងទាំងនេះ មកមើលរបៀបអនុវត្ត sampling នៅក្នុងភាសាកម្មវិធីនានា ដែលផ្តោតលើប៉ារ៉ាម៉ែត្រដែលគាំទ្រដោយសេវាកម្ម LLM ជាទូទៅ។

## ការពិចារណាផ្នែកសុវត្ថិភាព

នៅពេលអនុវត្ត sampling ក្នុង MCP សូមពិចារណាពាក្យសុវត្ថិភាពដូចខាងក្រោម៖

- **ផ្ទៀងផ្ទាត់មាតិកាសារទាំងអស់** មុនផ្ញើវាទៅអតិថិជន
- **សម្អាតព័ត៌មានសំងាត់** ពីសំណើដើមនិងការសម្រេច
- **អនុវត្តកំណត់អត្រាហេតុ** ដើម្បីទប់ស្កាត់ការប្រើប្រាស់ខុសកាល្បះ
- **ត្រួតពិនិត្យការប្រើប្រាស់ sampling** សម្រាប់លំនាំដូចគ្នាដែលមិនធម្មតា
- **សរសេរកូដអ៊ីនគ្រីបទិន្នន័យនៅពេលផ្ទេរ** ដោយប្រើប្រព័ន្ធសុវត្ថិភាព
- **គ្រប់គ្រងភាពឯកជនទិន្នន័យអ្នកប្រើ** យោងទៅតាមបទប្បញ្ញត្តិពាក់ព័ន្ធ
- **ត្រួតពិនិត្យសំណើ sampling** ប្រកបដោយការគ្រប់គ្រង និងសុវត្ថិភាព
- **គ្រប់គ្រងការចំណាយ** ជាមួយកំណត់សមរម្យ
- **អនុវត្តការកំណត់ពេលវេលាចាំ** សម្រាប់សំណើ sampling
- **ដោះស្រាយកំហុសម៉ូដែលយ៉ាងសមរម្យ** ជាមួយការដោះស្រាយជំនួសសមរម្យ

ប៉ារ៉ាម៉ែត្រ sampling អនុញ្ញាតឱ្យកំណត់ប្រែប្រួលលក្ខណៈពិសេសនៃម៉ូដែលភាសា ដើម្បីទទួលបានតុល្យភាពដែលចង់បានចន្លោះលទ្ធផលដែលកំណត់ និងនិពន្ធច្នៃប្រឌិត។

មកមើលរបៀបកំណត់ប៉ារ៉ាម៉ែត្រទាំងអស់នៅក្នុងភាសាកម្មវិធីនានា។

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

នៅក្នុងកូដខាងមុខនេះ យើងបាន៖

- បង្កើតអតិថិជន MCP ជាមួយ URL ម៉ាស៊ីនបម្រើជាក់លាក់។
- កំណត់សំណើជាមួយប៉ារ៉ាម៉ែត្រ sampling ដូចជា `temperature`, `top_p`, និង `top_k`។
- ផ្ញើសំណើ និងបោះពុម្ភអត្ថបទដែលបានបង្កើត។
- ប្រើប្រាស់:
    - `allowedTools` ដើម្បីកំណត់ឧបករណ៍ដែលម៉ូដែលអាចប្រើក្នុងការបង្កើត។ ក្នុងករណីនេះ យើងអនុញ្ញាតឲ្យឧបករណ៍ `ideaGenerator` និង `marketAnalyzer` ជួយបង្កើតគំនិតកម្មវិធីច្នៃប្រឌិត។
    - `frequencyPenalty` និង `presencePenalty` ដើម្បីគ្រប់គ្រងការខ្វះខាត និងភាពចម្រុះក្នុងលទ្ធផល។
    - `temperature` ដើម្បីគ្រប់គ្រងភាពចៃដន្យនៃលទ្ធផល ដែលតម្លៃខ្ពស់នាំឱ្យមានចម្លើយច្នៃប្រឌិតច្រើន។
    - `top_p` ដើម្បីកំណត់ការជ្រើសរើសតូខែនទៅក្រុមដែលមាន概率សរុបខ្ពស់បំផុត ដើម្បីបង្កើនគុណភាពអត្ថបទ។
    - `top_k` ដើម្បីកំណត់ម៉ូដែលឲ្យជ្រើសរើសតូខែនកំពូល K ដែលមាន概率ខ្ពស់បំផុត ដើម្បីជួយបង្កើតចម្លើយរលូន។
    - `frequencyPenalty` និង `presencePenalty` ដើម្បីកាត់បន្ថយការចម្លង និងលើកទឹកចិត្តភាពចម្រុះលើអត្ថបទបានបង្កើត។

# [JavaScript](#tab/javascript)

```javascript
// ឧទាហរណ៍ JavaScript៖ ការកំណត់កុងហ្វីក្រេស្យុងសម្រាប់សីតុណ្ហភាព និង Top-P sampling
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // ចាប់ផ្ដើមកម្មវិធីអតិថិជន MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // កំណត់ការស្នើសុំជាមួយប៉ារ៉ាម៉ែត្រសំបុត្រផ្សេងៗ
  const creativeSampling = {
    temperature: 0.9,    // សីតុណ្ហភាពខ្ពស់ = ភាពចម្រុះ/ភាពច្នៃប្រឌិតច្រើនជាងមុន
    topP: 0.92,          // យកទោគែនដែលមានប្រហamac 92% ខាងលើ
    frequencyPenalty: 0.6, // បន្ថយការបញ្ចនារបស់របៀបទោគែន
    presencePenalty: 0.4   // គិតវាយតម្លៃទោគែនដែលបានបង្ហាញក្នុងអត្ថបទមកហើយ
  };
  
  const factualSampling = {
    temperature: 0.2,    // សីតុណ្ហភាពទាប = ការកំណត់ថាអាចទាញយកបាន/មានការពិតប្រាកដច្រើនជាង
    topP: 0.85,          // ជ្រើសរើសទោគែនបានផ្តោតចិត្តបន្ថែមបន្តិច
    frequencyPenalty: 0.2, // ប្រើពិន្ទុកបញ្ច្រាសកម្រិតតិច
    presencePenalty: 0.1   // ប្រើពិន្ទុកបញ្ច្រាសតិចសម្រាប់ការដំណើរការ
  };
  
  try {
    // ផ្ញើសំណើពីរ ដោយមានការកំណត់បញ្ជូនផ្សេងៗ
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

នៅក្នុងកូដខាងមុខនេះ យើងបាន៖

- ចាប់ផ្តើមអតិថិជន MCP ជាមួយ URL ម៉ាស៊ីនបម្រើ និងកូនសរសៃ API។
- កំណត់ពីរតំណកប៉ារ៉ាម៉ែត្រ sampling៖ មួយសម្រាប់ភារកិច្ចច្នៃប្រឌិត និងមួយសម្រាប់ភារកិច្ចភាពពិត។
- ផ្ញើសំណើជាមួយការកំណត់ទាំងនេះ អោយម៉ូដែលអាចប្រើឧបករណ៍ជាក់លាក់សម្រាប់ភារកិច្ចនីមួយៗ។
- បោះពុម្ភចម្លើយដែលបានបង្កើត ដើម្បីបង្ហាញផលប៉ះពាល់នៃប៉ារ៉ាម៉ែត្រ sampling ខុសៗគ្នា។
- ប្រើ `allowedTools` ដើម្បីកំណត់ឧបករណ៍ដែលម៉ូដែលអាចប្រើនៅពេលបង្កើត។ ក្នុងករណីនេះ យើងអនុញ្ញាតឲ្យឧបករណ៍ `ideaGenerator` និង `environmentalImpactTool` សម្រាប់ភារកិច្ចច្នៃប្រឌិត និង `factChecker` និង `dataAnalysisTool` សម្រាប់ភារកិច្ចភាពពិត។
- ប្រើ `temperature` ដើម្បីគ្រប់គ្រងភាពចៃដន្យនៃលទ្ធផល ដែលតម្លៃខ្ពស់នាំឱ្យមានចម្លើយច្នៃប្រឌិតច្រើន។
- ប្រើ `top_p` ដើម្បីកំណត់ការជ្រើសរើសតូខែនទៅក្រុមដែលមាន概率សរុបខ្ពស់បំផុត ដើម្បីបង្កើនគុណភាពអត្ថបទ។
- ប្រើ `frequencyPenalty` និង `presencePenalty` ដើម្បីកាត់បន្ថយការចម្លង និងលើកទឹកចិត្តភាពចម្រុះលើលទ្ធផល។
- ប្រើ `top_k` ដើម្បីកំណត់ម៉ូដែលឲ្យជ្រើសរើសតូខែនកំពូល K ដែលមាន概率ខ្ពស់បំផុត ដើម្បីជួយបង្កើតចម្លើយរលូន។

---

## Sampling ដោយកំណត់តម្លៃរឹតបន្តឹង

សម្រាប់កម្មវិធីដែលតម្រូវឱ្យមានលទ្ធផលអចិន្ត្រៃយ៍ sampling ដោយកំណត់តម្លៃរឹតបន្តឹងធានាលទ្ធផលអាចចម្លងបាន។ វាធ្វើដូចនេះដោយប្រើគ្រាប់ចៃដន្យថេរ និងកំណត់ temperature ទៅសូន្យ។

មកមើលការអនុវត្តនៅខាងក្រោមដើម្បីបង្ហាញពី sampling ដោយកំណត់តម្លៃរឹតបន្តឹងនៅក្នុងភាសាកម្មវិធីនានា។

# [Java](#tab/java)

```java
// ឧទាហរណ៍ Java: ចម្លើយកំណត់ជាការបញ្ជាក់ជាមួយពូជថេរ
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // ការប្រើពូជថេរសម្រាប់លទ្ធផលកំណត់ជាការបញ្ជាក់
        
        // ការស្នើទីមួយជាមួយពូជថេរ
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // សីតុណ្ហភាពសូន្យសម្រាប់កំណត់ជាការបញ្ជាក់អតិបរមា
            .build();
            
        // ការស្នើទីពីរជាមួយពូជដូចគ្នា
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // ដំណើរការបន្ទាន់ទាំងពីរ
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // ចម្លើយគួរតែដូចគ nhauដោយសារពូជ និងសីតុណ្ហភាព=0ដូចគ្នា
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

នៅក្នុងកូដខាងមុខនេះ យើងបាន៖

- បង្កើតអតិថិជន MCP ជាមួយ URL ម៉ាស៊ីនបម្រើជាក់លាក់។
- កំណត់ពីរសំណើជាមួយសំណើដើមដូចគ្នា គ្រាប់ចៃដន្យថេរ និងសីតុណ្ហភាពសូន្យ។
- ផ្ញើសំណើទាំងពីរ និងបោះពុម្ភអត្ថបទដែលបានបង្កើត។
- បង្ហាញថាចម្លើយគឺដូចគ្នាពីព្រោះ sampling របស់វាត្រូវបានកំណត់ជារឿយៗ (គ្រាប់ដូចគ្នា និងសីតុណ្ហភាពដូចគ្នា)។
- ប្រើ `setSeed` ដើម្បីកំណត់គ្រាប់ចៃដន្យថេរ ធានាថាម៉ូដែលបង្កើតចម្លើយដូចគ្នាសម្រាប់បញ្ចូលដូចគ្នា រាល់ពេល។
- កំណត់ `temperature` ទៅសូន្យ ដើម្បីធានា determinism ខ្ពស់បំផុត មានន័យថាម៉ូដែលនឹងជ្រើសរើសតូខែនដែលមាន概率ខ្ពស់បំផុតដោយគ្មានភាពចៃដន្យ។

# [JavaScript](#tab/javascript-deterministic)

```javascript
// ឧទាហរណ៍ JavaScript៖ ការឆ្លើយតបជាដំណាក់កាលជាមួយការគ្រប់គ្រងផ្លែពូជ
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // សំណើ​ដំបូង​ជាមួយផ្លែពូជថេរ
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // សីតុណ្ហភាពសូន្យសម្រាប់ការជាក់លាក់អតិបរមា
    });
    
    // សំណើទីពីរជាមួយផ្លែពូជ និងសីតុណ្ហភាពដូចគ្នា
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // សំណើទីបីជាមួយផ្លែពូជផ្សេងប៉ុន្តែសីតុណ្ហភាពដូចគ្នា
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

នៅក្នុងកូដខាងមុខនេះ យើងបាន៖

- ចាប់ផ្តើមអតិថិជន MCP ជាមួយ URL ម៉ាស៊ីនបម្រើ។
- កំណត់ពីរសំណើជាមួយសំណើដើមដូចគ្នា គ្រាប់ចៃដន្យថេរ និងសីតុណ្ហភាពសូន្យ។
- ផ្ញើសំណើទាំងពីរ និងបោះពុម្ភអត្ថបទដែលបានបង្កើត។
- បង្ហាញថាចម្លើយគឺដូចគ្នាពីព្រោះ sampling របស់វាត្រូវបានកំណត់ជារឿយៗ (គ្រាប់ដូចគ្នា និងសីតុណ្ហភាពដូចគ្នា)។
- ប្រើ `seed` ដើម្បីកំណត់គ្រាប់ចៃដន្យថេរ ធានាថាម៉ូដែលបង្កើតចម្លើយដូចគ្នាសម្រាប់បញ្ចូលដូចគ្នា រាល់ពេល។
- កំណត់ `temperature` ទៅសូន្យ ដើម្បីធានា determinism ខ្ពស់បំផុត មានន័យថាម៉ូដែលនឹងជ្រើសរើសតូខែនដែលមាន概率ខ្ពស់បំផុតដោយគ្មានភាពចៃដន្យ។
- ប្រើគ្រាប់ផ្សេងសម្រាប់សំណើទីបី ដើម្បីបង្ហាញថាការផ្លាស់ប្តូរក្រោមគ្រាប់រួមនាំឱ្យមានលទ្ធផលខុសៗគ្នា ឡើងទោះបីជាសំណើដើម និងសីតុណ្ហភាពដូចគ្នាក៏ដោយ។

---

## ការកំណត់ Sampling យ៉ាងឆាប់រហ័ស

Sampling ឆ្លាតវៃធ្វើការកែប្រែប៉ារ៉ាម៉ែត្រដោយផ្អែកលើបរិបទ និងតម្រូវការរបស់សំណើនីមួយៗ។ នេះមានន័យថាប្ដូរប៉ារ៉ាម៉ែត្រដូចជា temperature, top_p, និងការពិន័យ ដោយផ្អែកលើប្រភេទភារកិច្ច ចំណង់ចំណូលចិត្តអ្នកប្រើ ឬកាយវិការប្រកបដោយប្រសិទ្ធភាពក្នុងអតីតកាល។

មកមើលរបៀបអនុវត្ត sampling យ៉ាងឆាប់រហ័សនៅក្នុងភាសាកម្មវិធីនានា។

# [Python](#tab/python)

```python
# ឧទាហរណ៍ Python៖ ការជ្រើសយកគំរូឌីណាមិកផ្អែកលើបរិបទសំណើ
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # កំណត់លំនាំជ្រើសយកសម្រាប់ប្រភេទកិច្ចការផ្សេងៗ
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # ជ្រើសលំនាំដើម
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # បន្ថែមតាមចំណូលចិត្តអ្នកប្រើបើមានផ្ដល់
        if user_preferences:
            if "creativity_level" in user_preferences:
                # បន្ថែមសីតុណ្ហភាពផ្អែកលើចំណូលចិត្តច្នៃប្រឌិត (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # កែប្រែ top_p ផ្អែកលើភាពចម្រូងចម្រាសចម្លើយដែលចង់បាន
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # បង្កើត និងបញ្ជូនសំណើជាមួយប៉ារ៉ាម៉ែត្រជ្រើសយកប្ដូរតាមគម្លាត
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # ត្រឡប់ចម្លើយជាមួយទិន្នន័យអំពីការជ្រើសយកសម្រាប់ភាពច្បាស់លាស់
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

នៅក្នុងកូដខាងមុខនេះ យើងបាន៖

- បង្កើតថ្នាក់ `DynamicSamplingService` ដែលគ្រប់គ្រង sampling យ៉ាងឆាប់រហ័ស។
- កំណត់តម្រង sampling សម្រាប់ប្រភេទភារកិច្ចខុសៗ (ច្នៃប្រឌិត, ពិតប្រាកដ, កូដ, វិភាគ)។
- ជ្រើសរើស preset sampling មូលដ្ឋានដោយផ្អែកលើប្រភេទភារកិច្ច។
- កែប្រែរ៉ប៉ារ៉ាម៉ែត្រ sampling ផ្នែកជាចលនា ដោយផ្អែកលើចំណង់ចំណូលចិត្តអ្នកប្រើ ដូចជាកម្រិតច្នៃប្រឌិត និងភាពចម្រុះ។
- ផ្ញើសំណើជាមួយប៉ារ៉ាម៉ែត្រ sampling ដែលបានកំណត់យ៉ាងឆាប់រហ័ស។
- ត្រឡប់អត្ថបទដែលបានបង្កើតជាមួយប៉ារ៉ាម៉ែត្រ sampling និងប្រភេទភារកិច្ចសម្រាប់ភាពច្បាស់លាស់។
- ប្រើ `temperature` ដើម្បីគ្រប់គ្រងភាពចៃដន្យនៃលទ្ធផល ដែលតម្លៃខ្ពស់នាំឱ្យមានចម្លើយច្នៃប្រឌិតច្រើន។
- ប្រើ `top_p` ដើម្បីកំណត់ការជ្រើសរើសតូខែនទៅក្រុមដែលមាន概率សរុបខ្ពស់បំផុត ដើម្បីបង្កើនគុណភាពអត្ថបទ។
- ប្រើ `frequency_penalty` ដើម្បីកាត់បន្ថយការចម្លង និងលើកទឹកចិត្តភាពចម្រុះលើលទ្ធផល។
- ប្រើ `user_preferences` ដើម្បីអនុញ្ញាតឱ្យប្ដូរប៉ារ៉ាម៉ែត្រ sampling ដោយផ្អែកលើកម្រិតច្នៃប្រឌិត និងភាពចម្រុះដែលបានកំណត់ដោយអ្នកប្រើ។
- ប្រើ `task_type` ដើម្បីកំណត់យុទ្ធសាស្រ្ត sampling សមរម្យសម្រាប់សំណើ មានសមត្ថភាពមានចម្លើយតាមប្រភេទភារកិច្ច។
- ប្រើ `send_request` បញ្ជូនសំណើ ដោយមានប៉ារ៉ាម៉ែត្រ sampling បានកំណត់ ដើម្បីធានាថាម៉ូដែលបង្កើតអត្ថបទតាមតម្រូវការ។
- ប្រើ `generated_text` យកសំណើម៉ូដែល និងទ្រង់ទ្រាយ sampling ជាមួយប្រភេទភារកិច្ចសម្រាប់វិភាគ ឬបង្ហាញ។
- ប្រើ `min` និង `max` ដើម្បីធានាថាចំណង់ចំណូលចិត្តអ្នកប្រើមានតម្លៃនៅក្នុងជួរសមរម្យ ដើម្បីបញ្ឈប់ការកំណត់ sampling ដែលមិនសមរម្យ។

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// ឧទាហរណ៍ JavaScript៖ ការកំណត់ការដំណើរការឧបករណ៍សង្គ្រោះតាមបរិបទអ្នកប្រើប្រាស់
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // កំណត់ប្រវត្តិការសង្ខេបមូលដ្ឋាន
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // តាមដានការសមិទ្ធផលរង្វាន់អតីតកាល
    this.performanceHistory = [];
  }
  
  // កំណត់ប្រភេទភារកិច្ចពីការជូនដំណឹង
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // ការកំណត់យ៉ាងរហ័សសាមញ្ញ - អាចបន្ថែមជាមួយការតម្រៀប ML
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
    
    // ជ្រើសរើសជារហារិមបើមិនមានប្រភេទច្បាស់លាស់
    return 'conversational';
  }
  
  // គណនាព៉ារ៉ាម៉ែត្រសង្គ្រោះដោយផ្អែកលើបរិបទ និងចំណូលចិត្តអ្នកប្រើប្រាស់
  getSamplingParameters(prompt, context = {}) {
    // កំណត់ប្រភេទភារកិច្ច
    const taskType = this.detectTaskType(prompt, context);
    
    // ទទួលបានប្រវត្តិមូលដ្ឋាន
    let params = {...this.samplingProfiles[taskType]};
    
    // តម្រឹមតាមចំណូលចិត្តអ្នកប្រើប្រាស់
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // វាស់ពី 1-10 ទៅជាចន្លោះសីតុណ្ហភាពសមរម្យ
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ការពិតខ្ពស់មានន័យថា topP ទាប (ជ្រើសរើសផ្តោតលើបន្ថែម)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ការស្របគ្នាខ្ពស់មានន័យថាអ្នកទោសទាប
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // អនុវត្តការកែប្រែបានរៀនពីប្រវត្តិផលិតភាព
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // តំបន់ផ្ទាល់ខ្លួនសាមញ្ញ - អាចបន្ថែមជាមួយអាល់ហ្គោរីធម៍កាន់តែស្មុគស្មាញ
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // គិតតែប្រវត្តិថ្មីៗប៉ុណ្ណោះ
    
    if (relevantHistory.length > 0) {
      // គណនាពិន្ទុការសមិទ្ធផលមធ្យម
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // ប្រសិនបើសមិទ្ធផលទាបជាងគោលព្រាង កែសម្រួលព៉ារ៉ាម៉ែត្រ
      if (avgScore < 0.7) {
        // ការកែតម្រូវតូចទិសទៅតម្លៃប្រកាន់ខ្ពស់
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // កត់ត្រាសមិទ្ធផលសម្រាប់ការកែប្រែក្រោយ
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // ការវាយតម្លៃគុណភាពការឆ្លើយតបពី 0 ដល់ 1
    });
    
    // ដាក់កំណត់ទំហំប្រវត្តិ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ទទួលបានព៉ារ៉ាម៉ែត្រសង្គ្រោះបង្កើតចុងក្រោយ
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ផ្ញើសំណើជាមួយព៉ារ៉ាម៉ែត្របង្កើតចុងក្រោយ
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // ប្រសិនបើអ្នកប្រើផ្ដល់មតិយោបល់ កត់ត្រាវា សម្រាប់ការបង្កើនប្រសិទ្ធភាពក្រោយ
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

// ឧទាហរណ៍ការប្រើប្រាស់
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // ភារកិច្ចច្នៃប្រឌិតជាមួយចំណូលចិត្តអ្នកប្រើប្រាស់ប្តូរតាមតម្រូវការ
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // ភាពច្នៃប្រឌិតខ្ពស់ (1-10)
          consistency: 3  // ការស្របគ្នានៅកម្រិតទាប (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // ភារកិច្ចបង្កើតកូដ
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // ភាពច្នៃប្រឌិតទាប
          precision: 8,   // ការពិតខ្ពស់
          consistency: 9  // ការស្របគ្នាខ្ពស់
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

នៅក្នុងកូដខាងមុខនេះ យើងបាន៖

- បង្កើតថ្នាក់ `AdaptiveSamplingManager` គ្រប់គ្រង sampling យ៉ាងឆាប់រហ័ស ដោយផ្អែកលើប្រភេទភារកិច្ច និងចំណង់ចំណូលចិត្តអ្នកប្រើ។
- កំណត់ពណ៌ទ្រង់ទ្រាយ sampling សម្រាប់ប្រភេទភារកិច្ចខុសៗគ្នា (ច្នៃប្រឌិត, ពិតប្រាកដ, កូដ, និយាយ)។
- អនុវត្តវិធីសាស្រ្តសំគាល់ប្រភេទភារកិច្ចពីសំណើ ដោយប្រើ heuristics សាមញ្ញ។
- គណនាប៉ារ៉ាម៉ែត្រ sampling ផ្អែកលើប្រភេទភារកិច្ចបានសំគាល់ និងចំណង់ចំណូលចិត្តអ្នកប្រើ។
- អនុវត្តការកែប្រែផ្អែកលើការសិក្សាប្រសិទ្ធភាពក្នុងអតីតកាល ដើម្បីបង្កើនសមត្ថភាព sampling។
- កត់ត្រាការសមត្ថភាពសម្រាប់ការកែប្រែនាពេលក្រោយ ដើម្បីអនុញ្ញាតឲ្យប្រព័ន្ធរៀនពីអន្តរកម្មមុនៗ។
- ផ្ញើសំណើជាមួយប៉ារ៉ាម៉ែត្រ sampling ដែលបានកំណត់យ៉ាងឆាប់រហ័ស ហើយត្រឡប់អត្ថបទដែលបានបង្កើត និងប៉ារ៉ាម៉ែត្រ និងប្រភេទភារកិច្ចបានសំគាល់។
- ប្រើ:
    - `userPreferences` ដើម្បីអនុញ្ញាតការប្ដូរប៉ារ៉ាម៉ែត្រ sampling ដោយផ្អែកលើកម្រិតច្នៃប្រឌិត, ភាពត្រឹមត្រូវ និងភាពរឹងមាំ។
    - `detectTaskType` ដើម្បីកំណត់ប្រភេទភារកិច្ចពីសំណើ ដើម្បីអនុញ្ញាតឱ្យមានចម្លើយត្រឹមត្រូវប្រកបដោយភាពល្អប្រសើរ។
    - `recordPerformance` ដើម្បីកត់ត្រាព័ត៌មានទាក់ទងការសមត្ថភាពចម្លើយដែលបានបង្កើត ដើម្បីអនុញ្ញាតឲ្យប្រព័ន្ធស្វែងយល់ និងកែលម្អជាបន្តបន្ទាប់។
    - `applyLearnedAdjustments` ដើម្បីកែប្រែប៉ារ៉ាម៉ែត្រ sampling សំរាប់ការសមត្ថភាពអតីតកាល ដើម្បីបង្កើនសមត្ថភាពផ្តល់ចម្លើយគុណភាពខ្ពស់។
    - `generateResponse` ដើម្បីបង្រួមរៀបចំដំណើរការបង្កើតចម្លើយជាមួយ sampling យ៉ាងឆាប់រហ័ស ធ្វើឱ្យងាយស្រួលហៅជាមួយសំណើ និងបរិបទខុសៗគ្នា។
    - `allowedTools` ដើម្បីបញ្ជាក់ឧបករណ៍ដែលម៉ូដែលអាចប្រើពេលបង្កើត ដើម្បីបង្ករឱ្យមានចម្លើយកាន់តែសម្រួលបរិបទ។
    - `feedbackScore` ដើម្បីអនុញ្ញាតឲ្យអ្នកប្រើផ្ដល់មតិយោបល់លើគុណភាពចម្លើយដែលបានបង្កើត ដែលអាចប្រើសម្រាប់កែលម្អសមត្ថភាពម៉ូដែលរយៈពេលក្រោយ។
    - `performanceHistory` ដើម្បីរក្សាកំណត់ត្រាអំពីអន្តរកម្មមុនៗ ដែលអនុញ្ញាតឲ្យប្រព័ន្ធរៀនពីជោគជ័យ និងបរាជ័យកន្លងមក។
    - `getSamplingParameters` ដើម្បីកែប្រែប៉ារ៉ាម៉ែត្រ sampling ដោយផ្អែកលើបរិបទសំណើ ដើម្បីបង្កើតលទ្ធផលម៉ូដែលមានភាពបត់បែន និងឆ្លើយតបលឿន។
    - `detectTaskType` ដើម្បីចាត់ថ្នាក់ប្រភេទភារកិច្ចដោយផ្អែកលើសំណើ នាំឲ្យប្រព័ន្ធអាចអនុវត្តយុទ្ធសាស្រ្ត sampling ដែលសមរម្យសម្រាប់ប្រភេទសំណើនានា។
    - `samplingProfiles` ដើម្បីកំណត់ការកំណត់ sampling មូលដ្ឋានសម្រាប់ប្រភេទភារកិច្ចគ្រប់គ្រង ធ្វើឲ្យមានការកែប្រែរហ័សចំពោះសំណើផ្សេងៗ។

---

## តើដំណាក់កាលបន្ទាប់ជាអ្វី

- [5.7 ការពង្រីក](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->