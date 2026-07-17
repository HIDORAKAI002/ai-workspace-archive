> [အသုံးမပြုတော့ပါ: ၂၀၂၆-၀၇-၂၈ ထွက်ရှိရေး မိတ်ဆက်ခုနှစ်](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Model Context Protocol မှာ Sampling

> **အသိပေးချက်ရှောင်ကြဉ်ခြင်း:** `2026-07-28` MCP specification ထွက်ရှိရေး မိတ်ဆက်ခုနှစ်သည် Sampling ကို LLM ပံ့ပိုးသူ APIs နှင့်တိုက်ရိုက်ပေါင်းစပ်သည့် နည်းလမ်းကို ဦးစားပေးရန် မသုံးတော့တော့ကြောင်း အမှတ်ပြုသည်။ Sampling သည် `2025-11-25` မှာနှစ်သတ်ထားပြီး၊ တရားဝင်ရှောင်ကြဉ်ခြင်းဖြစ်ပွားပြီးနောက် အနည်းဆုံး တစ်နှစ်အတွင်း လည်းအလုပ်လုပ်နေဆဲ ဖြစ်သေးသည်။ ထို့ကြောင့် ဒီသင်ခန်းစာမှာ ပါဝင်သော အချက်အလက်များ မှန်ကန်တင်းကျပ်သည်- ဒါပေမယ့် server အသစ်ဒီဇိုင်းများတွင် အစားထိုးနည်းလမ်းကို အကဲဖြတ်သင့်သည်။ အောက်ပါစာမျက်နှာတွင် ကြည့်ရှုပါ - [MCP တွင် ဘာတွေပြောင်းလဲလာသလဲ: ၂၀၂၆-၀၇-၂၈ ထွက်ရှိရေး မိတ်ဆက်ခုနှစ်](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)။

Sampling သည် MCP ၏ အာဏာကြီးသော လက္ခဏာတစ်ခုဖြစ်ပြီး servers များသည် client မှတစ်ဆင့် LLM ကနေ completion များကို တောင်းဆိုနိုင်ခြင်းဖြင့် agentic မျိုးစုံ အပြုအမှုများပြုလုပ်နိုင်စေပြီး လုံခြုံမှုနှင့် ကိုယ်ရေးကိုယ်တာ ကာကွယ်မှုကို ထိန်းသိမ်းပေးသည်။ Sampling ပြင်ဆင်မှု ချိန်ညှိမှုမှန်ကန်ပါက ဖြေကြားမှု အရည်အသွေး နှင့် လည်ပတ်မှု ထိရောက်မှုကို ထူးခြားစွာ တိုးတက်စေပါသည်။ MCP သည် မော်ဒယ်များသည် စာသားတုထုတ်မှုကို ထိန်းချုပ်ရန် အလွယ်တကူ သတ်မှတ်နိုင်သော နည်းလမ်းတစ်ခုဖြစ်၍ ရှုပ်ထွေးမှု၊ ဖန်တီးမှုနှင့် တိကျမှုတို့ကို ထိန်းချုပ်ပေးသော ပဲရမည့် အချက်များပါရှိသည်။

## အကျဉ်းချုပ်

ဒီသင်ခန်းစာတွင် ကျွန်တော်တို့ MCP တောင်းဆိုမှုများအတွက် sampling parameter များကို ချိန်ညှိခြင်းနည်းလမ်းများနဲ့ Sampling ၏ အတွင်းစိတ် protocol လည်ပတ်မှုကို လေ့လာပါမယ်။

## သင်ယူရမည့် အရာများ

ဒီသင်ခန်းစာပြီးဆုံးချိန်တွင်၊ သင့်အား အောက်ပါအရာများကို နားလည်ပြီး အသုံးပြုနိုင်ပါမည် -

- MCP တွင် ရနိုင်သော sampling parameter အဓိကများကို နားလည်ခြင်း။
- အသုံးအမျိုးမျိုးအတွက် sampling parameter များကို ချိန်ညှိရန် ပြုလုပ်နိုင်ခြင်း။
- ထပ်တလဲလဲရပြီး ပြန်ဖြေကြားမှုများရရှိစေမည့် deterministic sampling ကို အသုံးပြုဆောင်ရွက်ခြင်း။
- အခြေအနေ နှင့် အသုံးပြုသူ စိတ်တိုင်းကျအလိုက် sampling parameter များကို လိုက်လျောညီထွေ ပြင်ဆင် ချိန်ညှိခြင်း။
- မော်ဒယ် လုပ်ဆောင်မှုပိုင်းကို အဆင့်မြှင့်တင်စေရန် sampling နည်းဗျူဟာများကို အသုံးပြုခြင်း။
- MCP ၏ Client-Server လည်ပတ်မှုတွင် sampling ၏ လည်ပတ်ပုံနားလည်ခြင်း။

## MCP တွင် Sampling လည်ပတ်ပုံ

MCP မှာ Sampling လည်ပတ်မှု အဆင့်များမှာ ဒါနဲ့တူပါသည် -

၁။ Server မှ client ထံသို့ `sampling/createMessage` တောင်းဆိုချက် ပို့သည်။
၂။ Client သည် တောင်းဆိုချက်ကို ပြန်လည် စစ်ဆေးပြီး ပြင်ဆင်နိုင်သည်။
၃။ Client သည် LLM မှအစမ်းယူသည်။
၄။ Client သည် ဖြည့်စွက်မှုကို ဂရုစိုက်စွာ စစ်ဆေးသည်။
၅။ Client မှ Server ထံ ရလဒ်ကို ပြန်ပေးပို့သည်။

လူနေထိုင်ထိန်းချုပ်မှုပါဝင်သည့် ဒီဒီဇိုင်းသည် အသုံးပြုသူများအား LLM အချက်အလက်များကို ကြည့်ရှုစောင့်ကြည့်ကာ ထိန်းချုပ်ခွင့် ရရှိစေသည်။

## Sampling Parameter များ အနှစ်ချုပ်

MCP သည် client တောင်းဆိုမှုများတွင် ချိန်ညှိနိုင်သော sampling parameter များကို အောက်ပါအတိုင်း သတ်မှတ်ပေးထားသည် -

| Parameter | ဖော်ပြချက် | ပုံမှန်အကွာအဝေး |
|-----------|-------------|---------------|
| `temperature` | Token ရွေးချယ်မှုတွင် ရှုပ်ထွေးမှု ထိန်းချုပ်မှု | 0.0 - 1.0 |
| `maxTokens` | ထုတ်ပေးမည့် token အများဆုံးအရေအတွက် | ကိန်းဂဏန်းတန်ဖိုး |
| `stopSequences` | ထုတ်လွှင့်မှုကို ရပ်တန့်စေမည့် အထူးစဉ်တန်းများ | string များ array |
| `metadata` | ပံ့ပိုးသူ အထူး parameter များ | JSON object |

LLM ပံ့ပိုးသူများစွာသည် `metadata` ခြေလှမ်းမှတဆင့် အပို parameter များကို ထောက်ခံသည်၊ များသောအားဖြင့် အောက်ပါအတိုင်းဖြစ်သည် -

| ပေါ်ပေါက်လွယ်သော ထပ်ဆင့် parameter | ဖော်ပြချက် | ပုံမှန်အကွာအဝေး |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling - အထူး token များအတွက် စုစုပေါင်း ကုလ်မြောက် စာရင်း အသေးစားမှု | 0.0 - 1.0 |
| `top_k` | Token ရွေးချယ်မှုကန့်သတ်မှု အဆင့်အရ K ထိ | 1 - 100 |
| `presence_penalty` | စာသားထဲရှိ တုခတ်မှု အပေါ် အပြစ်ပေးခြင်း | -2.0 - 2.0 |
| `frequency_penalty` | စာသားတွင် တူညီမှုများ အပေါ် အပြစ်ပေးခြင်း | -2.0 - 2.0 |
| `seed` | ထပ်တလဲလဲဖြစ်စေသည့် သတ္တု random seed | ကိန်းဂဏန်းတန်ဖိုး |

## တောင်းဆိုမှုနမူနာ ပုံစံ

ဒီမှာ MCP client ကနေ sampling တောင်းဆိုမှု များ ပြုလုပ်ထားတဲ့ နမူနာတစ်ခု ရှိသည် -

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

## ပြန်လည်တုံ့ပြန်ပုံစံ

Client မှ ပြန်ပေးပို့သော completion ရလဒ် -

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

## လူနေထိုင်ထိန်းချုပ်မှု အတတ်ပညာများ

MCP sampling သည် လူနေထိုင်ထိန်းချုပ်မှုဖြင့် ဒီဇိုင်းရေးဆွဲထားသည် -

- **Prompt များအတွက်**:
  - Client များသည် အသုံးပြုသူများအား အကြံပြုသော prompt ကို ပြသသင့်သည်။
  - အသုံးပြုသူများသည် prompt များကို ပြင်ဆင်၍ ငြင်းပယ်နိုင်သင့်သည်။
  - System prompts များကို ရှင်းလင်း သို့မဟုတ် ပြင်ဆင်နိုင်သည်။
  - context ထည့်သွင်းမှုကို client မှ ထိန်းချုပ်သည်။

- **Completions များအတွက်**:
  - Client များသည် အသုံးပြုသူများအား completion ကို ပြသသင့်သည်။
  - အသုံးပြုသူများသည် completion များကို ပြင်ဆင်၍ ငြင်းပယ်နိုင်သင့်သည်။
  - Client များသည် completion များ ကို ရှင်းလင်း သို့မဟုတ် ပြင်ဆင်နိုင်သည်။
  - အသုံးပြုသူများသည် မော်ဒယ်ရွေးချယ်မှုကို ထိန်းချုပ်သည်။

ဒီသဘောတရားများ ဖြင့် MCP ၌ sampling ကို သုံးစွဲခြင်းအတွက် အထောက်အကူပြုဖို့ မျိုးစုံသော programming language များနှင့် ကွဲပြားသည့် parameter များအား ပေါ်လစီတစ်ခုအဖြစ် လေ့လာကြမယ်။

## လုံခြုံရေး ပညာရပ်များ

MCP မှာ sampling ကို ထည့်သွင်းစဉ် အောက်ပါ လုံခြုံရေး လုပ်ထုံးလုပ်နည်းများကို စဉ်းစားပါ -

- **တိုက်ရိုက် client ထံ ပို့မည့် message များအားလုံးကို သေချာစွာ စစ်ဆေးပါ**
- **Prompt နှင့် completion များမှ အချက်အလက် အာရုံစိုက်မှုရှိသော အချက်အလက်များကို စင်ကြယ်စေပါ**
- **အကြီးစား လွဲမှားသုံးစွဲမှုအား ကာကွယ်ရန် တားမြစ်မှုများ ထည့်သွင်းပါ**
- **Sampling အသုံးပြုမှုစနစ်ကို ထူးခြားသော ပုံစံများအတွက် သတိထားစောင့်ကြည့်ပါ**
- **ဒေတာများ လမ်းကြောင်းမှာ သေချာစွာ စာလုံးကောက်ခြင်းဖြင့် လုံခြုံစိတ်ချစေရန်**
- **အသုံးပြုသူ အချက်အလက်ကို သက်ဆိုင်ရာ ဥပဒေစည်းမျဉ်းများအတိုင်း ကာကွယ်သည်ကို ထိန်းသိမ်းပါ**
- **Sampling တောင်းဆိုမှုများအား စည်းကမ်းထိန်းသိမ်းမှုနှင့် လုံခြုံရေးအတွက် စစ်ဆေးပါ**
- **ကုန်ကျစရိတ်ထိန်းချုပ်မှုအတွက် သင့်တော်သော ကန့်သတ်မှုများအသုံးပြုပါ**
- **Sampling တောင်းဆိုမှုများအတွက် အချိန်ကန့်သတ်မှု ထည့်သွင်းပါ**
- **မော်ဒယ် အမှားအယွင်းများကို သေချာစွာ ဖြေရှင်းရန် fallback များ ထည့်သွင်းပါ**

Sampling parameter များဖြင့် ဘာသာစကားမော်ဒယ်များ၏ လုပ်ဆောင်ချက်ကို ချိန်ညှိခြင်းဖြင့် ကျွန်တော်တို့ တိကျသော သုံးနိုင်စွမ်းနှင့် ဖန်တီးမှုအရင်းအမြစ်အကြား သင့်တော်သော ညှိနှိုင်းမှုကို ရရှိစေသည်။

ခုနက parameter များကို မျိုးစုံသော programming language များတွင် မည်သို့ ချိန်ညှိကြမည်ကို ကြည့်မယ်။

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

နောက်ကွယ်က ကုဒ်အပိုင်းမှာ ကျွန်တော်တို့ -

- server URL တစ်ခုနဲ့ MCP client တည်ဆောက်ထားပါသည်။
- `temperature`, `top_p`, `top_k` ကဲ့သို့ sampling parameter များနဲ့ တောင်းဆိုချက်ကို ပြင်ဆင်ထားပါသည်။
- တောင်းဆိုမှု ပို့ပြီး ထုတ်ပေးသည့် စာသားကို ပြသထားပါသည်။
- အသုံးပြုထားသည် -
    - မော်ဒယ်ကို မည်သည့် tools များအသုံးပြုနိုင်ကြောင်း `allowedTools` မှတစ်ဆင့် သတ်မှတ်ရန်။ ဒီကိစ္စမှာ `ideaGenerator` နဲ့ `marketAnalyzer` tools များကို ဖန်တီးမှု app အတွေးများ ထုတ်ရန် ခွင့်ပြုထားသည်။
    - ထုတ်ပေးမှုတွင် ထပ်တလဲလဲမှုနှင့် အမျိုးသားမှုကို ထိန်းချုပ်ရန် `frequencyPenalty` နဲ့ `presencePenalty` အသုံးပြုသည်။
    - ထုတ်ပေးမှု ရှုပ်ထွေးမှုကို ထိန်းချုပ်ရန် `temperature` ကို အသုံးပြုသည်၊ တန်ဖိုးမြင့်သည့်အခါ ဖန်တီးမှု အနက်ပိုမိုရရှိသည်။
    - ရွေးချယ်မှုကို ကန့်သတ်ပေးပြီး ထိရောက်မှုကို တိုးတက်စေသော `top_p`။
    - မော်ဒယ်ကို အမြင့်ဆုံးသေချာမှန်ကန်သော token များအတွက် ကန့်သတ်မှုပေးသော `top_k`။
    - ထပ်တလဲလဲမှုများကို လျော့နည်းစေပြီး မတူညီမှုကို မြှင့်တင်ပေးသော `frequencyPenalty` နှင့် `presencePenalty`။

# [JavaScript](#tab/javascript)

```javascript
// JavaScript ဥပမာ: အပူချိန်နှင့် Top-P စမ်းသပ်မှု ဖွဲ့စည်းခြင်း
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP client ကို စတင်ဖြည့်စွက်ပါ
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // ကွဲပြားသော စမ်းသပ်မှု ပါရာမီတာများဖြင့် တောင်းဆိုမှု ဖွဲ့စည်းပါ
  const creativeSampling = {
    temperature: 0.9,    // အပူချိန်မြင့်ခြင်း = ပိုမို အလွတ်အလပ်/ဖန်တီးခြင်း
    topP: 0.92,          // ရှေးဦးဆုံး ၉၂% ဖြစ်နိုင်မှုများ ပါဝင်သော token များကို စဉ်းစားပါ
    frequencyPenalty: 0.6, // token အကြိမ်ရေအနည်းဆုံးဖြစ်အောင် လျှော့ချပါ
    presencePenalty: 0.4   // ယခင်စာသားထဲတွင် ဖြစ်ပေါ်ပြီးသား token များကို ပြစ်ဒဏ် ချမှတ်ပါ
  };
  
  const factualSampling = {
    temperature: 0.2,    // အပူချိန် နိမ့်ခြင်း = ပိုမို သတ်မှတ်နိုင်သော/အချက်အလက်အရ မှန်ကန်မှု
    topP: 0.85,          // token ရွေးချယ်မှုကို တစ်ဆင့်ပို အာရုံစိုက်ခြင်း
    frequencyPenalty: 0.2, // အလွန်နည်းသော ထပ်ခါထပ်ခါ ပြစ်ဒဏ်
    presencePenalty: 0.1   // အနည်းဆုံး တက်ကြွမှု ပြစ်ဒဏ်
  };
  
  try {
    // ကွဲပြားသော စမ်းသပ်မှု ဖွဲ့စည်းမှုများနှင့် တောင်းဆိုမှု နှစ်ခု ပို့ပါ
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

နောက်ကွယ်က ကုဒ်အပိုင်းမှာ ကျွန်တော်တို့ -

- server URL နဲ႔ API key ပါဝင်ပြီး MCP client တစ်ခု ဖန်တီးထားသည်။
- တစ်ချို့အလုပ်များအတွက် sampling parameter များကို တူးထွင်ဖန်တီးမှု၊ တစ်ချို့အတွက် အချက်အလက်အားကောင်းမှု အတွက် ခွဲခြားထားသည်။
- တောင်းဆိုမှုများ ပို၍ ထုတ်ပေး၍ မော်ဒယ်အပိုင်းကို ဆောက်ထားသည့် tools များ အစီအစဉ်အတိုင်း အသုံးပြုခွင့်ပြုထားသည်။
- sampling parameter ကွဲပြားမှုများရဲ့ အကျိုးသက်ရောက်မှုကို ပြသရန် ထုတ်၊ နောက်ပြန်သော ဖြေကြားမှုများကို ပုံနှိပ်ထားသည်။
- ဖန်တီးမှု အစီအစဉ်များအတွက် `ideaGenerator` အားနှင့် `environmentalImpactTool` ကို အသုံးပြုခွင့်ပြု၍ factual အလုပ်များအတွက် `factChecker` နှင့် `dataAnalysisTool` ကို သတ်မှတ်ထားသည်။
- ထုတ်ပေးမှု ရှုပ်ထွေးမှုကို ထိန်းချုပ်ရန်  `temperature` ကို အသုံးပြုသည်။
- ထုတ်ပေးမှု အရည်အသွေးမြှင့်တင်ရန် `top_p` ကို အသုံးပြုသည်။
- ထပ်တလဲလဲမှု လျော့နည်းစေရန်နှင့် မတူညီမှုကို တိုးတက်စေရန် `frequencyPenalty` နဲ့ `presencePenalty` အသုံးပြုသည်။
- မော်ဒယ်ကို အမြင့်ဆုံးသေချာမှုရှိသော token များအတွက် အကန့်အသတ်များ သတ်မှတ်ရန် `top_k` ကို အသုံးပြုသည်။

---

## ထပ်တလဲလဲ sampling

တိကျမြဲမြံသော ဖြေကြားမှု လိုအပ်သော အကြောင်းအရာများအတွက်, deterministic sampling သည် တူညီသော ရလဒ်များ ရရှိစေသည်။ ၎င်းကိုလုပ်ဆောင်ရာတွင် ဘယ်လိုဆိုတော့ မပြောင်းလဲသော random seed သုံးပြီး temperature ကို သုညထားသည်။

မျိုးစုံ programming language များတွင် deterministic sampling ကို ပြသရန် နမူနာကို အောက်တွင် ကြည့်ပါ။

# [Java](#tab/java)

```java
// Java နမူနာ: တိကျသော တုံ့ပြန်ချက်များ အတည်ပြုသော စပါးနှင့်
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // တိကျသော ရလဒ်များအတွက် အတည်ပြုစပါးကို အသုံးပြုခြင်း
        
        // အတည်ပြုစပါးဖြင့် ပထမဆုံး အမိန့်
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // အများဆုံး တိကျမှုအတွက် အပူချိန်သုည
            .build();
            
        // အတူတူ စပါးဖြင့် ဒုတိယ အမိန့်
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // နှစ်ခုလုံး အမိန့်များကို အကောင်အထည်ဖော်ပါ
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // အတူတူ စပါးနှင့် အပူချိန်=0 ကြောင့် တုံ့ပြန်ချက်များ တူညီသင့်သည်
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

နောက်ကွယ်က ကုဒ်တွင် ကျွန်တော်တို့ -

- server URL သတ်မှတ်ပြီး MCP client တစ်ခု ဖန်တီးထားသည်။
- တောင်းဆိုချက် နှစ်ခုကို တူညီသော prompt၊ fixed seed နှင့် zero temperature ဖြင့် ပြင်ဆင်ထားသည်။
- နှစ်ခုလုံးကို ပို့ပြီး ထုတ်ပေးသော စာသားကို ပုံနှိပ်ပြသထားသည်။
- စampling parameter ၏ deterministic ဖြစ်သော သိပ္ပံအရ ဆင်တူသော ဖြစ်စဉ်ကြောင့် နှစ်ခုလုံး ရလဒ် တူညီသည်ကို ပြသထားသည်။
- `setSeed` ကိုသတ်မှတ်ထားသော random seed အဖြစ် အသုံးပြုပါသည်၊ အဲ့ဒီလိုနဲ့ တူညီသော input များအတွက် အဆက်မပြတ် အထွက်များ ရရှိစေသည်။
- `temperature` ကို သုညထားပြီး အမြင့်ဆုံး deterministic ဖြစ်စေရန် သတ်မှတ်ထားသည်၊ ဤကောင့်တိုင်မှာ မော်ဒယ်သည် နောက်ပြီး token မှန်ကန်မှု အမြင့်ဆုံးကို ထည့်သွင်း ရွေးချယ်သည်၊ ရောထွေးမှု မရှိပါ။

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript ဥပမာ: ရေစီးမှုထိန်းချုပ်မှုဖြင့် သက်သေပြတုံ့ပြန်မှုများ
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // ပထမဆုံး တောင်းဆိုမှု မြဲမြံသောရေစီးနှင့်
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // အနည်းဆုံး အပူချိန်ဖြင့် အများဆုံး ရေစီးမှု
    });
    
    // ဒုတိယ တောင်းဆိုမှု တူညီသောရေစီးနှင့် အပူချိန်ဖြင့်
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // တတိယ တောင်းဆိုမှု ခြားနားသောရေစီးဖြင့် သို့သော် အပူချိန်တူညီသော
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

နောက်ကွယ်က ကုဒ်တွင် ကျွန်တော်တို့ -

- server URL နှင့် MCP client ဖန်တီးထားသည်။
- တောင်းဆိုချက် နှစ်ချက်ကို တူညီသော prompt၊ fixed seed နှင့် zero temperature ဖြင့်ပြင်ဆင်ထားသည်။
- နှစ်ခုလုံး တောင်းဆိုချက် ပို့ပြီး ထုတ်ပေးသည့် စာသားကို ပုံနှိပ်ပြသထားသည်။
- Sampling parameter ၏ deterministic ဖြစ်မှုကြောင့် တူညီသော ရလဒ်များ ရရှိသည်ကို ပြသထားသည်။
- `seed` နှင့် သတ်မှတ်ထားသော random seed ကို အသုံးပြုသည်၊ တူညီသော input များအတွက် အမြဲတမ်း အထွက် တူညီစေရန်။
- `temperature` ကို သုညထားပြီး အမြင့်ဆုံး deterministic ဖြစ်စေရန် သတ်မှတ်ထားသည်။
- တတိယ တောင်းဆိုချက်အတွက် seed ကို မတူညီတဲ့ တန်ဖိုးအသစ်ဖြင့် သတ်မှတ်ထားပြီး အဲဒါကြောင့် prompt နှင့် temperature တူညီပေမယ့် ထွက်ရှိမှု မတူညီကြောင်း ပြသထားသည်။

---

## မျက်နှာကြည့် sampling ပြင်ဆင်မှု

အချက်အလက်များနှင့် တောင်းဆိုချက်များလိုအပ်ချက်အပေါ် မူတည်၍ sampling parameter များကို တုံ့ပြန်မှုအကျိုးပြုသော နည်းလမ်းဖြင့် ပြောင်းလဲ ချိန်ညှိခြင်းဖြစ်သည်။ ဒါမှာ temperature၊ top_p နှင့် penalty များကို အလုပ်အမျိုးအစား၊ အသုံးပြုသူ စိတ်တိုင်းကျနှင့် ငွမ်းသွားသည့် စွမ်းဆောင်ရည်စာရင်းအပေါ် မူတည်၍ လိုက်လျောညီထွေ ပြင်ဆင်ခြင်း ဖြစ်သည်။

မျိုးစုံ programming language များတွင် dynamic sampling ကို မည်သို့ အသုံးပြုမည်ကို ကြည့်ကြရအောင်။

# [Python](#tab/python)

```python
# Python ဥပမာ - တောင်းဆိုမှု အခြေအနေပေါ် မူတည်၍ သုံးစွဲမှု စမ်းသပ်မှုအား လှုပ်ရှားမှုဖြင့် သတ်မှတ်ခြင်း
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # အလုပ်အမျိုးအစားများအတွက် စမ်းသပ်မှုနမူနာများ သတ်မှတ်ပါ
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # အခြေခံနမူနာကို ရွေးချယ်ပါ
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # သုံးစွဲသူနှစ်သက်မှုများ ပါလာလျှင် ပြင်ဆင်ပေးပါ
        if user_preferences:
            if "creativity_level" in user_preferences:
                # ဖန်တီးမှုနှစ်သက်မှုအပေါ်မူတည်၍ အပူချိန်ကို စိတ်ကြိုက်ချိန်ညှိပါ (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # ပြန်လည်ဖြေကြားမှု အမျိုးမျိုးမှုလိုအပ်ချက်အပေါ်မူတည်၍ top_p ကို ချိန်ညှိပါ
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # စိတ်ကြိုက် စမ်းသပ်မှု ညွှန်ကြားချက်များ ဖြင့် တောင်းဆိုမှုကို ဖန်တီးပို့ဆောင်ပါ
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # ထင်ရှားမှုအတွက် စမ်းသပ်မှု metadata နှင့်အတူ ပြန်လည်ဖြေကြားမှုကို ပြန်ပေးပါ
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

နောက်ကွယ်က ကုဒ်တွင် ကျွန်တော်တို့ -

- adaptive sampling ကို စီမံခန့်ခွဲသော `DynamicSamplingService` class ဖန်တီးထားသည်။
- မျိုးစုံ အလုပ်အမျိုးအစားအလိုက် sampling presets သတ်မှတ်ထားသည် (ဖန်တီးမှု, အချက်အလက်, ကုဒ်, ချဥ်းကပ်ခြင်း)။
- အလုပ်အမျိုးအစားအား အခြေခံ၍ base sampling preset ရွေးချယ်သည်။
- အသုံးပြုသူစိတ်ကြိုက်မှုများ၊ ဖန်တီးမှုနှင့် မတူညီမှု အဆင့်များအရ sampling parameter များ ပြင်ဆင်သည်။
- ပြင်ဆင်ပြီးသော sampling parameter များနှင့် prompt ကို တောင်းဆို၍ ပို့သည်။
- ထုတ်ပေးသော စာသားကို sampling parameter နှင့် အလုပ်အမျိုးအစား တို့နှင့် အတူ ပြန်လည် တုံ့ပြန်ပေးသည်။
- `temperature` ကို ထုတ်ပေးမှု အနက် ရှုပ်ထွေးမှု ထိန်းချုပ်ရန် အသုံးပြုသည်။
- `top_p` ကို ထုတ်ပေးမှု အရည်အသွေးမြှင့်တင်ရန် အသုံးပြုသည်။
- ထပ်တလဲလဲမှု လျော့နည်းစေရန် ဖန်တီးမှုကို မြှင့်တင်ရန် `frequency_penalty` ကို အသုံးပြုသည်။
- user preferences ကို အသုံးပြု၍ sampling parameter customization ခွင့်ပြုသည်။
- sampling strategy သတ်မှတ်ရန် task_type ထည့်သွင်းထားသည်။
- sampling parameter နှင့် prompt ကို ပါဝင်သည့် `send_request` method ကို အသုံးပြု၍ တောင်းဆိုသည်။
- ထုတ်ပေးသော စာသား၊ parameter နှင့် အလုပ်အမျိုးအစား သေချာ အတည်ပြုရန် အသုံးပြုသည်။
- user preferences များကို သတ်မှတ်လိုက်သော အကန့်အသတ်အတွင်းထားရန် min နှင့် max function များကို အသုံးပြုသည်။

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript နမူနာ: အသုံးပြုသူအခြေအနေပေါ် မူတည်ပြီး ဒိုင်နမစ် စမ်းသပ်မှု ဖွဲ့စည်းတည်ဆောက်မှု
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // အခြေခံ စမ်းသပ်မှု ပရိုဖိုင်များ သတ်မှတ်ပါ
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // သမိုင်းကြောင်း ဆောင်ရွက်မှုများ ကို စောင့်ကြည့်ပါ
    this.performanceHistory = [];
  }
  
  // prompt မှ တာဝန်အမျိုးအစား ရှာဖွေပါ
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // ရိုးရှင်းသဘောထား တွေ့ရှိမှု - ML သင်ခန်းစာတန်း ရရှိမှုဖြင့် တိုးတက်နိုင်သည်
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
    
    // အမှန်ရှင်း ပြလွန်းသောအမျိုးအစား မတွေ့ပါက စကားပြော အတိုင်း ဖြစ်စေပါ
    return 'conversational';
  }
  
  // အခြေအနေ နှင့် အသုံးပြုသူ ဆန္ဒများ အပေါ် မူတည်ပြီး စမ်းသပ်မှု ပါရာမီတာများ ကို တွက်ချက်ပါ
  getSamplingParameters(prompt, context = {}) {
    // တာဝန်အမျိုးအစား ကို ရှာဖွေပါ
    const taskType = this.detectTaskType(prompt, context);
    
    // အခြေခံ ပရိုဖိုင် ရယူပါ
    let params = {...this.samplingProfiles[taskType]};
    
    // အသုံးပြုသူ ဆန္ဒများ အပေါ် မူတည်၍ ချိန်ညှိပါ
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // ၁ မှ ၁၀ အတွင်းမှ အညီ အပူချိန် တန်းခေါင်းသင့်သော အတိုင်း ပမာဏပြောင်းပါ
        params.temperature = 0.1 + (creativity * 0.09); // ၀.၁ မှ ၁.၀
      }
      
      if (precision !== undefined) {
        // တိကျမှန်ကန်မှု မြင့်မားခြင်းသည် topP နည်းပါးခြင်း ဖြစ်သည် (ရွေးချယ်မှု ပိုမိုစီမံထား)
        params.topP = 1.0 - (precision * 0.05); // ၀.၅ မှ ၁.၀
      }
      
      if (consistency !== undefined) {
        // တစ်ပါတည်းခံနိုင်မှု မြင့်မားခြင်းသည် ပြစ်ဒဏ် လျှော့ပါးခြင်း ဖြစ်သည်
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // ၀.၁ မှ ၀.၉
      }
    }
    
    // ဆောင်ရွက်မှု သမိုင်းကြောင်းမှ သင်ယူထားသော ပြင်ဆင်မှုများ ကို အသုံးပြုပါ
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // ရိုးရှင်းသော အလိုအလျောက် သဘောထား - ပိုမိုရှုပ်ထွေးသော အယ်လဂိုရစ်သမ်များ ဖြင့် တိုးတက်နိုင်သည်
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // မကြာသေးသော သမိုင်းကြောင်းသာ သတိပြုပါ
    
    if (relevantHistory.length > 0) {
      // ပျမ်းမျှ ဆောင်ရွက်မှုအသီးသီး တွက်ချက်ပါ
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // ဆောင်ရွက်မှုအားအကန့်အသတ်အောက်ရှိပါက ပါရာမီတာများ ကို ချိန်ညှိပါ
      if (avgScore < 0.7) {
        // ဘေးကင်းသော တန်ဖိုးများသို့ နည်းနည်း ပြင်ဆင်မှု
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // နောက်အတွက် ပြင်ဆင်မှုများ ရရှိရန် ဆောင်ရွက်မှုမှတ်တမ်းတင်ပါ
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // တုံ့ပြန်မှု အရည်အသွေး ၀ မှ ၁ အတွင်း အဆင့်ပေးခြင်း
    });
    
    // သမိုင်းကြောင်း အရွယ်အစား ကန့်သတ်ပါ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // အကောင်းဆုံး စမ်းသပ်မှု ပါရာမီတာများ ရယူပါ
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // အကောင်းဆုံး ပါရာမီတာများဖြင့် တောင်းဆိုမှု ပို့ပါ
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // အသုံးပြုသူ သဘောထား ပြပါက များအတွက် ပိုမိုကောင်းမွန်အောင် မှတ်တမ်းတင်ပါ
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

// နမူနာ အသုံးပြုမှု
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // အသုံးပြုသူ ဆန္ဒစိတ်များပါ၍ ဖန်တီးမှု တာဝန်
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // ဖန်တီးမှုမြင့် (၁ မှ ၁၀)
          consistency: 3  // တိကျမှန်ကန်မှုနည်း (၁ မှ ၁၀)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // ကုဒ်ဖန်တီးခြင်း တာဝန်
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // ဖန်တီးမှုနည်း
          precision: 8,   // တိကျမှန်ကန်မှုမြင့်
          consistency: 9  // တိကျမှန်ကန်မှုမြင့်
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

နောက်ကွယ်က ကုဒ်တွင် ကျွန်တော်တို့ -

- adaptive sampling ကို စီမံခန့်ခွဲသော `AdaptiveSamplingManager` class ဖန်တီးထားသည်, task type နှင့် user preferences အပေါ် မူတည်သည်။
- မျိုးစုံဖြစ်သော အလုပ်အမျိုးအစားများအတွက် sampling profile များ သတ်မှတ်ထားသည် (ဖန်တီးမှု, အချက်အလက်, ကုဒ်, စကားပြောနယ်ပယ်)။
- prompt မှ task type ကို ရိုးရှင်းသော heuristic များဖြင့် သတ်မှတ်ခြင်း အချက်အလက်ရှာဖွေရေးကို ထည့်သွင်းထားသည်။
- sampling parameter များကို task type နှင့် user preferences များအပေါ် မူတည်၍ တွက်ချက်ထားသည်။
- အတိတ် လုပ်ဆောင်မှုများအပေါ် မူတည်၍ sampling parameter များ တိုးတက်ထိန်းသိမ်းမှု အတွက် အလေ့အထ ဖြည့်သည်။
- အနာဂတ် ပြင်ဆင်မှုများအတွက် စွမ်းဆောင်ရည် မှတ်တမ်းတင်ထားသည်, စနစ်သည် နောက်ကွယ်က တိုးတက်မှု ဆောင်ရွက်နိုင်သည်။
- dynamic sampling parameter များဖြင့် တောင်းဆိုချက် ပို့ပြီး ထုတ်ပေးသည့် စာသား၊ parameter များနှင့် task type ကို ပြန်ပေးပို့သည်။
- အသုံးပြုသည် -
    - `userPreferences` ဖြင့် sampling parameter များကို user-defined ဖန်တီးမှု၊ တိကျမှုနှင့် မပြတ်တောက်မှု အဆင့်များအတိုင်း ဖွဲ့စည်းသည်။
    - `detectTaskType` ဖြင့် prompt အပေါ် မူတည်၍ task အမျိုးအစား သတ်မှတ်ခြင်း။
    - `recordPerformance` ဖြင့် ထုတ်ပေးမှု စွမ်းဆောင်ရည် မှတ်တမ်းတင်ခြင်း။
    - `applyLearnedAdjustments` မှတဆင့် အတိတ် စွမ်းဆောင်ရည်အပေါ်မူတည်ပြီး sampling parameter များ တိုးတက်အောင် ပြင်ဆင်ခြင်း။
    - `generateResponse` ဖြင့် adaptive sampling ဖြင့် ဖြေကြားမှု တစ်ခုလုံးကို ထုတ်လုပ်၊ အပေါ်တွင် ပုံမှန်လွယ်ကူစေသည်။
    - `allowedTools` ဖြင့် မော်ဒယ်ကို ဗဟိုစုံကိရိယာများ အသုံးပြုခွင့် ဖြည့်စွက်သည်။
    - `feedbackScore` ဖြင့် အသုံးပြုသူများ၏ တုံ့ပြန်ချက်ကို လက်ခံကူညီသည်။
    - `performanceHistory` မှတ်တမ်းတင်ထားသော အကြောင်းအရာများ ပါဝင်သည်။
    - `getSamplingParameters` ဖြင့် တောင်းဆိုမှု context အပေါ် မူတည်၍ sampling parameter များကို ကျဆင်း ပြင်ဆင်သည်။
    - `detectTaskType` ဖြင့် sampling နည်းဗျူဟာများ အမျိုးမျိုး အသုံးပြုရန် အလုပ်အမျိုးအစား အလိုက်ခွဲခြားသည်။
    - `samplingProfiles` ဖြင့် task အမျိုးအစားအလိုက် base sampling configurations အတိုင်း သတ်မှတ်ထားသည်။

---

## အနာဂတ်တွင် ဘာလိုမြင်ရမလဲ

- [5.7 Scaling](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->