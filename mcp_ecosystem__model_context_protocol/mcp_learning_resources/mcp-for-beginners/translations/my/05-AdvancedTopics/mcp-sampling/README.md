# မော်ဒယ်စနစ်အတွင်း Sampling

Sampling သည် MCP ၏ အင်အားကြီးသော လက္ခဏာတစ်ခုဖြစ်ပြီး ဆာဗာများကို client မှတဆင့် LLM စတင်ပြီးဖြည့်စွက်မှုများကို တောင်းဆိုခွင့်ပြုသည်၊ ဤသည်က agentic လုပ်ဆောင်ချက်များကို ဖန်တီးနိုင်စေပြီး လုံခြုံမှုနှင့် ကိုယ်ရေးကာကွယ်မှုကို ထိန်းသိမ်းထားသည်။ Sampling ကို မှန်ကန်စွာ ပြင်ဆင်ခြင်းဖြင့် ဖြေကြားမှုအရည်အသွေးနှင့် စွမ်းဆောင်ရည်ကို အလွန်ကောင်းမွန်စေသည်။ MCP သည် မော်ဒယ်များက စာသားများကို ဘယ်လိုထုတ်ပေးသည့် ပုံစံကို စံပြဖော်ပြပေးပြီး randomness, ဖန်တီးမှုနှင့် သေချာမှုတို့ကို ထိန်းချုပ်ပေးသော parameters များဖြင့် ထိန်းချုပ်နိုင်ရန် စံတမ်းတစ်ခုကို ပံ့ပိုးပေးသည်။

## နိဒါန်း

ဒီသင်ခန်းစာထဲမှာ MCP တောင်းဆိုမှုများတွင် sampling parameters များကို မည်သို့ပြင်ဆင်ရမည်ကို လေ့လာပြီး sampling ၏ အခြေခံ protocol ကိရိယာများကို နားလည်မည်ဖြစ်သည်။

## သင်ယူရမည့်ရည်ရွယ်ချက်များ

ဒီသင်ခန်းစာပြီးဆုံးသောအချိန်တွင် သင်သည် သူ့ကိုလုပ်နိင်ပါမည်။

- MCP တွင်ရရှိနိုင်သော sampling parameter များ၏ အဓိကကို နားလည်။
- မတူညီသော အသုံးပြုမှုများအတွက် sampling parameter များကို ပြင်ဆင်။
- ပြန်လည်ထုတ်ပေးနိုင်သော ရလဒ်များအတွက် deterministic sampling ကို လုပ်ဆောင်။
- လက်ရှိ context နှင့် အသုံးပြုသူ စိတ်ကြိုက်ချက်များအပေါ် မူတည်၍ sampling parameter များကို သက်ဆိုင်ရာ အတိုင်း ပြင်ဆင်။
- မတူညီသော အခြေအနေများတွင် model စွမ်းဆောင်ရည်မြှင့်တင်ရန် sampling မဟာဗျူဟာများကို ချိတ်ဆက် အသုံးပြု။
- MCP ၏ client-server လိုင်းတွင် sampling ၏ လုပ်ဆောင်မှု နားလည်။

## MCP တွင် Sampling ၏ လုပ်ဆောင်ပုံ

MCP ၏ sampling လုပ်ငန်းစဉ်မှာ အောက်ပါအဆင့်များကို လိုက်နာသည်။

1. ဆာဗာက client ကို `sampling/createMessage` တောင်းဆိုခြင်း ပို့သည်။
2. Client က တောင်းဆိုမှုကို ပြန်လည်သုံးသပ်ပြီး ပြင်ဆင်နိုင်သည်။
3. Client က LLM မှ sampling လုပ်သည်။
4. Client က ပြီးစီးမှုကို သုံးသပ်သည်။
5. Client က ရလဒ်ကို ဆာဗာဆီ ပြန်လှန်ပေးသည်။

လူသားပါဝင်သည့် ဒီဇိုင်းကြောင့် အသုံးပြုသူများသည် LLM ကြည့်သည့်အရာနှင့် ထုတ်ပေးသည့်အရာကို ထိန်းချုပ်နိုင်သည်။

## Sampling Parameters အနှစ်ချုပ်

MCP သည် client တောင်းဆိုမှုများတွင် ပြင်ဆင်နိုင်သော sampling parameter များကို အောက်ပါအတိုင်း သတ်မှတ်ပေးသည်။

| Parameter | ဖော်ပြချက် | ပုံမှန်အတိုင်းအတာ |
|-----------|-------------|---------------|
| `temperature` | token ရွေးချယ်မှုတွင် မတည့်မှုကို ထိန်းချုပ်သည် | 0.0 - 1.0 |
| `maxTokens` | ထုတ်ပေးရန် token အများဆုံး အရေအတွက် | ကိန်းဂဏန်းတန်ဖိုး |
| `stopSequences` | ထုတ်ပေးမှုကို ရပ်စဲရန် အထူးစဉ်များ | စာသားများ Array |
| `metadata` | ပရိုဗိုင်ဒါအထူး parameter များ | JSON object |

အများသော LLM ပရိုဗိုင်ဒါများသည် `metadata` အကွက်ဖြင့် နောက်ထပ် parameter များကို ထောက်ခံပေးပြီး အောက်ပါအတိုင်း ဖြစ်နိုင်သည်။

| လူသုံးများသော အပို parameter | ဖော်ပြချက် | ပုံမှန်အတိုင်းအတာ |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling - token များကို ထိပ်တန်း စုစုပေါင်း ဖြစ်နိုင်မှုအတိုင်း ကန့်သတ်ခြင်း | 0.0 - 1.0 |
| `top_k` | token ရွေးချယ်မှုကို ထိပ်တန်း K ရွေးချယ်ခြင်း | 1 - 100 |
| `presence_penalty` | စာသားတွင် ရှိနေမှုအပေါ် အပြစ်ပေးခြင်း | -2.0 - 2.0 |
| `frequency_penalty` | စာသားတွင် ထပ်ခါတလဲလဲ ဖြစ်ခြင်းအပေါ် အပြစ်ပေးခြင်း | -2.0 - 2.0 |
| `seed` | ပြန်လည်ထုတ်ပေးနိုင်ရန် အထူး random seed | ကိန်းဂဏန်းတန်ဖိုး |

## နမူနာ တောင်းဆိုမှု ပုံစံ

MCP တွင် sampling ကို client ကနေ တောင်းဆိုနေတဲ့ နမူနာတစ်ရပ်က ဒီလိုဖြစ်ပါတယ်။

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

## ပြန်လည်တုံ့ပြန်မှု ပုံစံ

Client မှ ပြီးစီးမှုရလဒ်ကို ပြန်ပေးသည်။

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

## လူသားပါဝင် ထိန်းချုပ်မှုများ

MCP Sampling ကို လူသား ထိန်းသိမ်းမှုဖြင့် ဒီဇိုင်းဆွဲထားသည်။

- **Prompt များအတွက်**:
  - Clients သည် အသုံးပြုသူများကို တင်ပြရန် prompt ကို ပြသသင့်သည်။
  - အသုံးပြုသူများသည် prompt များကို ပြင်ဆင်ခြင်း သို့မဟုတ် ပယ်ဖျက်ခြင်း ပြုနိုင်သည်။
  - စနစ် prompt များကို စစ်ထုတ်ခြင်း သို့မဟုတ် ပြင်ဆင်ခြင်း ပြုလုပ်နိုင်သည်။
  - Context ပါဝင်မှုကို client က ထိန်းချုပ်သည်။

- **Completion များအတွက်**:
  - Clients သည် အသုံးပြုသူများကို completion ကို ပြသသင့်သည်။
  - အသုံးပြုသူများသည် completion များကို ပြင်ဆင်ခြင်း သို့မဟုတ် ပယ်ဖျက်ခြင်း ပြုနိုင်သည်။
  - Clients သည် completion များကို စစ်ထုတ်ခြင်း သို့မဟုတ် ပြင်ဆင်ခြင်း ပြုနိုင်သည်။
  - အသုံးပြုသူများသည် ထည့်သွင်းသုံးမည့် မော်ဒယ်ကို ထိန်းချုပ်သည်။

ဤသဘောတူညီချက်များကို စဉ်းစားပြီး မတူညီသော programming ဘာသာစကားများတွင် sampling ကို မည်သို့ အကောင်အထည်ဖော်မည်ကို ကြည့်ကြရအောင်။ LLM ပရိုဗိုင်ဒါများတွင် ပုံမှန်ထောက်ခံသော parameter များအပေါ် အာရုံစိုက်မည်။

## လုံခြုံရေးစဥ်းစားချက်များ

MCP တွင် sampling ကို အကောင်အထည်ဖော်စဉ်အတွင်း ဒီလို လုံခြုံရေး ကောင်းမွန်သော အလေ့အထများကို စဉ်းစားပါ။

- **မက်ဆေ့ခ်ျအကြောင်းအရာအားလုံးကို စစ်ဆေးခြင်း** client သို့ ပို့ရန်မတိုင်မီ
- **prompt နှင့် completion များမှ အချက်အလက်အားသိသာစွာ စင်ကြယ်ရေးဆွဲခြင်း**
- **အနှောင့်အယှက် ရှောင်ရန် အချိန်ကန့်သတ်ဖျက်သိမ်းခြင်း**
- **sampling သုံးစွဲမှုကို မမှန်ကန်သော ပုံစံများအတွက် စောင့်ကြည့်ခြင်း**
- **လုံခြုံသော ပရိုတိုကောများဖြင့် ဒေတာ သယ်ဆောင်မှု အချိန်တွင် စွန့်အမှတ်ထားခြင်း**
- **သက်ဆိုင်ရာ ဥပဒေများအတိုင်း အသုံးပြုသူ ဒေတာ ကိုယ်ရေးကာကွယ်မှု ပြုလုပ်ခြင်း**
- **sampling တောင်းဆိုမှုများအား လုံခြုံမှုနှင့် သက်ဆိုင်မှု ရှင်းလင်း စစ်ဆေးခြင်း**
- **ကုန်ကျစရိတ် ထိန်းချုပ်မှု အတိုင်း အကန့်အသတ်ပေးခြင်း**
- **sampling တောင်းဆိုမှုများအတွက် အချိန်ကန့်သတ်ချမှတ်ခြင်း**
- **မော်ဒယ် အမှားများကို သင့်တော်သော နည်းလမ်းဖြင့် ကိုင်တွယ်ခြင်း**

Sampling parameter များကဘာသာစကား မော်ဒယ်များ၏ အပြုအမူကို ကျွမ်းကျင်စွာ ညီညာမှု နှင့် ဖန်တီးမှု အတွင်း ညီမျှမှုကို သတ်မှတ်စီမံထိန်းချုပ်ရန် အခွင့်အလမ်း ပေးသည်။

ဒီ parameters များကို မတူညီသော programming ဘာသာစကားများတွင် မည်သို့ ပြင်ဆင်ရမည်နည်း ကြည့်ကြမယ်။

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

ယခင် ကုဒ်တွင် ကျွန်ုပ်တို့သည်-

- သိသိသာသာ စာဝန်ဆောင်မှု URL နှင့် MCP client တစ်ခု ဖန်တီးခဲ့သည်။
- `temperature`, `top_p`, နှင့် `top_k` ကဲ့သို့သော sampling parameter များနှင့် တောင်းဆိုမှုကို ပြင်ဆင်ခဲ့သည်။
- တောင်းဆိုမှုကို ပို့ပြီး ထုတ်ပေးသော စာသားကို ပရင့်ထုတ်ပြခဲ့သည်။
- အသုံးပြုခဲ့သည်-
    - ထုတ်ပေးမှု အတွင်း မော်ဒယ် အသုံးပြုခွင့် ရရှိသော ကိရိယာများကို သတ်မှတ်ရန် `allowedTools` ကို အသုံးပြုပြီး creative app ideas ဖန်တီးရာတွင် `ideaGenerator` နှင့် `marketAnalyzer` ကိရိယာများ ခွင့်ပြုခဲ့သည်။
    - ထုတ်ပေးမှုတွင် ထပ်ခါတလဲလဲ ဖြစ်မှုနှင့် ကွဲပြားမှုကို ထိန်းချုပ်ရန် `frequencyPenalty` နှင့် `presencePenalty` အသုံးပြုသည်။
    - ထုတ်ပေးမှု မှ randomness ကို ထိန်းချုပ်ရန် `temperature`  ကို အသုံးပြုသည်၊ တန်ဖိုးမြင့်သည်နှင့် ဖန်တီးမှုပိုမိုများသည်။
    - စုစုပေါင်းဖြစ်နိုင်မှု၏ ထိပ်တန်းပမာဏကို ထောက်ပံ့သော token များကို ရွေးချယ်ရာတွင် ကန့်သတ်ရန် `top_p` ကို အသုံးပြုသည်၊ ထုတ်ပေးမှုအရည်အသွေး မြှင့်တင်ရန်။
    - မော်ဒယ်၏ ထိပ်တန်း K ဖြစ်နိုင်ခွင့်ရှိသော token များသို့ ကန့်သတ်ရန် `top_k` ကို အသုံးပြုသည်၊ ပိုမိုညီညာသော ဖြေကြားမှုများ ထုတ်ပေးရန်။
    - ထပ်ခါတလဲလဲ ဖြစ်မှုကို လျော့နည်းစေရန်နှင့် ထွက်ရှိမှုအမျိုးမျိုးကို တိုးတက်စေရန် `frequencyPenalty` နှင့် `presencePenalty` ကို အသုံးပြုသည်။

# [JavaScript](#tab/javascript)

```javascript
// JavaScript ဥပမာ: အပူချိန်နှင့် Top-P စမပ်ပလင်း ဖော်ပြချက်
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP client ကို စတင်ပြင်ဆင်သည်
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // မတူညီသော စမပ်ပလင်း ပါရာမီတာများဖြင့် တောင်းဆိုမှုကို ဖော်ပြတပ်ဆင်သည်
  const creativeSampling = {
    temperature: 0.9,    // အပူချိန်မြင့်မားသည် = ပိုမိုမမှန်ကန်ခြင်း/ဖန်တီးမှု
    topP: 0.92,          // ထိပ်ဆုံး ၉၂% အလားအလာအုပ်စု ပါသော token များကို စဉ်းစားပါ
    frequencyPenalty: 0.6, // token များ ဆက်တိုက်ပြန်ထပ်မှု လျော့နည်းစေရန်
    presencePenalty: 0.4   // အချက်အလက်တွင် ယခုအထိ ပြသထားသည့် token များကို ဒဏ်ခတ်ပါ
  };
  
  const factualSampling = {
    temperature: 0.2,    // အပူချိန်နိမ့်သည် = ပိုမိုသေချာတိကျမှု/အချက်အလက်ဆိုင်ရာ
    topP: 0.85,          // token ရွေးချယ်မှု ပိုမိုဂရုပြုခြင်း
    frequencyPenalty: 0.2, // ပြန်ထပ်မှုဒဏ်ခတ်မှု အနည်းဆုံး
    presencePenalty: 0.1   // ရှိမှုဒဏ်ခတ်မှု အနည်းဆုံး
  };
  
  try {
    // မတူညီသော စမပ်ပလင်း ဖော်ပြချက်နှင့် တောင်းဆိုမှုနှစ်ခုကို ပို့ပါ
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

ယခင် ကုဒ်တွင် ကျွန်ုပ်တို့သည်-

- ဆာဗာ URL နှင့် API key ဖြင့် MCP client ကို စတင်ထားသည်။
- ဖန်တီးမှုဆိုင်ရာ လုပ်ငန်းများနှင့် သက်ဆိုင်သော လုပ်ငန်းများအတွက် sampling parameter နှစ်ခုကို ပြင်ဆင်ထားသည်။
- မော်ဒယ်အတွက် အထူးကိရိယာ အသုံးပြုခွင့်ပြု၍ ဒီ parameter များဖြင့် တောင်းဆိုမှုပို့သွားသည်။
- မတူညီသော sampling parameter များ၏ သက်ရောက်မှုကို ပြသရန် ထုတ်ပေးသော ဖြေကြားချက်များကို ပရင့်ထုတ်ပြသည်။
- ထုတ်ပေးမှုတွင် မော်ဒယ် အသုံးပြုခွင့် ရရှိသော tool များကို သတ်မှတ်ရန် `allowedTools` ကို အသုံးပြုသည်။ ဒီအတွက် creative လုပ်ငန်းများအတွက် `ideaGenerator` နှင့် `environmentalImpactTool` ကိရိယာများ၊ factual လုပ်ငန်းများအတွက် `factChecker` နှင့် `dataAnalysisTool` ကိရိယာများ ခွင့်ပြုခဲ့သည်။
- ထွက်ရှိမှု၏ မတည့်မှုကို ထိန်းချုပ်ရန် `temperature` ကို အသုံးပြုသည်၊ တန်ဖိုးမြင့်သည်နှင့် ဖန်တီးမှုပိုမိုများသည်။
- စုစုပေါင်းဖြစ်နိုင်မှု၏ ထိပ်တန်းပမာဏကို token များကို ကန့်သတ်ရန် `top_p` ကို အသုံးပြုသည်၊ ထုတ်ပေးမှုအရည်အသွေး မြှင့်တင်ရန်။
- ထပ်ခါတလဲလဲ ဖြစ်မှုကို လျော့နည်းစေရန်နှင့် ထွက်ရှိမှုအမျိုးမျိုးကို တိုးတက်စေရန် `frequencyPenalty` နှင့် `presencePenalty` ကို အသုံးပြုသည်။
- မော်ဒယ်၏ ထိပ်တန်း K ဖြစ်နိုင်ခွင့်ရှိသော token များသို့ ကန့်သတ်ရန် `top_k` ကို အသုံးပြုသည်၊ ပိုမိုညီညာသော ဖြေကြားမှုများ ထုတ်ပေးရန်။

---

## Deterministic Sampling

အတိုင်းအတာ တူညီမှုလိုအပ်သော ဆော့ဗ်ဝဲများအတွက် deterministic sampling သည် ထပ်မံထွက်ရှိမည့်ရလဒ်များ ထုတ်ပေးသည်။ ၎င်းကို ပြုလုပ်ရာတွင် တိကျသည့် random seed တစ်ခုကို အသုံးပြုပြီး temperature ကို သုညထားသည်။

မတူညီသော programming ဘာသာစကားများတွင် deterministic sampling ကို ပြသရန် နမူနာအကောင်အထည်ဖော်မှုကို ကြည့်ကြရအောင်။

# [Java](#tab/java)

```java
// Java ဥပမာ: ပြည့်ပြည့်စုံစုံ ပြန်လည် ဖြေကြားချက်များနှင့် တည်ငြိမ်သောစပါးမှတ်
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // တည်ငြိမ်သောရလဒ်များအတွက် စပါးမှတ်တစ်ခု အသုံးပြုခြင်း
        
        // စပါးမှတ်တစ်ခုဖြင့် ပထမဆုံး တောင်းဆိုချက်
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // အမြင့်ဆုံး တည်ငြိမ်မှုအတွက် ဆူးညဉ်းမှု ၀
            .build();
            
        // အဲ့ဒီစပါးမှတ်နှင့် ဒုတိယ တောင်းဆိုချက်
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // တောင်းဆိုချက် နှစ်ခုလုံးကို အကောင်အထည်ဖော်ပါ
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // အဲ့ဒီစပါးမှတ်တစ်ခုနှင့် ဆူးညဉ်းမှု=0 ကြောင့် ပြန်လည် ဖြေကြားချက်များ ဆင်တူမှုရှိသင့်သည်
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

ယခင် ကုဒ်တွင် ကျွန်ုပ်တို့သည်-

- ထူးခြားသော စာဝန်ဆောင်မှု URL ဖြင့် MCP client တစ်ခု ဖန်တီးခဲ့သည်။
- prompt တူညီပြီး seed တိကျနေသော နှင့် temperature သုညဖြင့် တောင်းဆိုမှု နှစ်ခု setup လုပ်ထားသည်။
- လွှဲပြောင်းပေးပြီး ထုတ်ပေးသော စာသားများကို ပရင့်ထုတ်ပြခဲ့သည်။
- sampling configuration ၏ deterministic nature ကြောင့် ပြန်လည်ရရှိသော ဖြေကြားချက်များသည် တူညီကြောင်း ဖော်ပြခဲ့သည် (seed နှင့် temperature တူညီသောကြောင့်)။
- `setSeed` ကို အသုံးပြုပြီး မှန်ကန်သော random seed များ သတ်မှတ်သည်၊ ထို့ကြောင့် မော်ဒယ်သည် မည်သည့် input မဆို တူညီသော output ကို ရသောအခါ။
- `temperature` ကို သုညထား၍ အများဆုံး deterministic ဖြစ်စေရန် သတ်မှတ်ထားသည်၊ ထိုမျိုးတွင် မော်ဒယ်သည် နောက်ဆုံး token ဖြစ်နိုင်ခြေ အများဆုံး ဖြစ်သော token ကိုသာ ရွေးချယ်သည်။

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript ဥပမာ: seed ထိန်းချုပ်မှုဖြင့် သတ်မှတ်နိုင်သော ပြန်ကြားချက်များ
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // အစောပိုင်း တောင်းဆိုမှုသည် ကြေငြာထားသော seed နှင့်တစ်ပြေးညီ
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // အများဆုံး သတ်မှတ်နိုင်မှုအတွက် ဇီဝဓာတ်အပူချိန် သုည
    });
    
    // ဒုတိယတောင်းဆိုမှုသည် တူညီသော seed နှင့် ဇီဝဓာတ်အပူချိန်ဖြင့်
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // တတိယတောင်းဆိုမှုသည် seed ကွဲပြားသော်လည်း ဇီဝဓာတ်အပူချိန်တူညီသည်
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

ယခင် ကုဒ်တွင် ကျွန်ုပ်တို့သည်-

- ဆာဗာ URL ဖြင့် MCP client ကို စတင်ထားသည်။
- prompt တူညီပြီး seed တိကျမြောက်သော နှင့် temperature သုညဖြင့် တောင်းဆိုမှု နှစ်ခု configure လုပ်ထားသည်။
- တောင်းဆိုမှု နှစ်ခု လွှဲပြောင်းပေးပြီး ထုတ်ပေးသော စာသားများကို ပရင့်ထုတ်ပြခဲ့သည်။
- sampling configuration ၏ deterministic nature ကြောင့် ပြန်လည်ရရှိသော ဖြေကြားချက်များသည် တူညီကြောင်း ဖော်ပြခဲ့သည် (seed နှင့် temperature တူညီသောကြောင့်)။
- `seed` ကို တိကျသော random seed သတ်မှတ်ရန် အသုံးပြုသည်၊ ထို့ကြောင့် မော်ဒယ်သည် တူညီသော input အတွက် မည်သည့်အချိန်မဆို တူညီသော output ကို ထုတ်ပေးသည်။
- `temperature` ကို သုညစွာ သတ်မှတ်၍ အများဆုံး deterministic ဖြစ်စေရန် ပြုလုပ်ထားသည်၊ ထိုမျိုးတွင် မော်ဒယ်သည် နောက်ဆုံး token ဖြစ်နိုင်ခြေ အများဆုံး ဖြစ်သော token ကိုသာ ရွေးချယ်သည်။
- တတိယတောင်းဆိုမှုအတွက် သတ်မှတ် seed အသစ် အသုံးပြုပြီး seed ပြောင်းလဲခြင်းဖြင့် prompt နှင့် temperature တွဲတင်ထားသော်လည်း output မတူကြောင်း ပြသထားသည်။

---

## ဒိုင်နမစ် Sampling ပြင်ဆင်မှု

ပညာရှင်သော sampling သည် တောင်းဆိုမှု၏ context နှင့် လိုအပ်ချက်များအပေါ် တိုက်ဆိုင်သလို parameters များကို တွဲသတ်ထားသည်။ ၎င်းမှာ temperature, top_p, နှင့် အပြစ်ပေးမှုများကို လုပ်ငန်းအမျိုးအစား၊ အသုံးပြုသူ စိတ်ကြိုက်ချက်များ သို့မဟုတ် အတိတ်မှားရောက်မှုများအပေါ်မူတည်၍ ဒိုင်နမစ်ပြင်ဆင်ခြင်း ဖြစ်သည်။

မတူညီသော programming ဘာသာစကားများတွင် ဒိုင်နမစ် sampling ကို မည်သို့ အကောင်အထည်ဖော်မည်ကို ကြည့်ကြရအောင်။

# [Python](#tab/python)

```python
# Python ဥပမာ။ တောင်းဆိုချက် အခြေခံ၍ လိုက်လံနမူနာယူခြင်းကိုဒီနံပါတ်ဖြင့်ပြောင်းလဲခြင်း
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # အလုပ်အမျိုးအစား များအတွက် နမူနာ preset များ သတ်မှတ်ပါ
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # အခြေခံ preset ကို ရွေးပါ
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # အသုံးပြုသူ စိတ်ကြိုက်အောက်ကရဲ့ ပြင်ဆင်မှု အရ ကိုင်တွယ်ပါ
        if user_preferences:
            if "creativity_level" in user_preferences:
                # ဖန်တီးမှု စိတ်ကြိုက်နှုန်း (1-10) အရ အပူချိန်ကို အရွယ်အစားချိန်ညှိပါ
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # လိုချင်သော တုံ့ပြန်မှု မျိုးစုံမှုအရ top_p ကို ပြင်ဆင်ပါ
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # ကိုယ်ပိုင် နမူနာ parameter များဖြင့် တောင်းဆိုမှု တည်ဆောက်ပြီး ပို့ပါ
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # ပွင့်လင်းပြတ်သားမှုအတွက် နမူနာယူမှု metadata နှင့်အတူ တုံ့ပြန်ချက် ပြန်ပေးပါ
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

ယခင် ကုဒ်တွင် ကျွန်ုပ်တို့သည်-

- adaptive sampling ကို စီမံခန့်ခွဲသော `DynamicSamplingService` ကုလားထိုင်ကို ဖန်တီးခဲ့သည်။
- အသုံးပြုမှုလုပ်ငန်းအမျိုးအစားအလိုက် (creative, factual, code, analytical) sampling presets များသတ်မှတ်ခဲ့သည်။
- လုပ်ငန်းအမျိုးအစားအပေါ် မူတည်၍ base sampling preset များကို ရွေးချယ်ခဲ့သည်။
- ဖန်တီးမှုနှင့် ကွဲပြားမှုအဆင့်များ သုံး၍ အသုံးပြုသူ စိတ်ကြိုက်ချက်အပေါ် မူတည်ကာ sampling parameters များကို ပြင်ဆင်ခဲ့သည်။
- ဒိုင်နမစ် sampling parameter များဖြင့် တောင်းဆိုမှုကို ပို့ခဲ့သည်။
- ပြောင်းလဲသတ်မှတ်ထားသော sampling parameter များနှင့်လုပ်ငန်းအမျိုးအစားကို တင်ပြပြီး ထုတ်ပေးသော စာသားကို ပြန်ဆိုပေးခဲ့သည်။
- ထွက်ရှိမှု၏ မတည့်မှုကို ထိန်းချုပ်ရန် `temperature` ကို အသုံးပြုသည်၊ တန်ဖိုးမြင့်သည်နှင့် ဖန်တီးမှုပိုမိုများသည်။
- token ရွေးချယ်မှုကို ကန့်သတ်ရန် `top_p` ကို အသုံးပြုသည်၊ ထုတ်ပေးမှုအရည်အသွေး မြှင့်တင်ရန်။
- ထပ်ခါတလဲလဲ ဖြစ်မှုကို လျော့နည်းစေရန် `frequency_penalty` ကို အသုံးပြုသည်။
- အသုံးပြုသူ သတ်မှတ်ထားသည့် ဖန်တီးမှုနှင့် ကွဲပြားမှု အဆင့်အတန်းများအပေါ် မူတည်၍ `user_preferences` ဖြင့် sampling parameter များကို မူတည်စွာ ချိန်ညှိသည်။
- လုပ်ငန်းအမျိုးအစား အရ sampling မဟာဗျူဟာ သတ်မှတ်ရန် `task_type` ကို အသုံးပြုသည်။ ထိုမျိုးသည် တောင်းဆိုမှုအမျိုးအစားအပေါ် မူတည်၍ တုံ့ပြန်မှု ပိုမိုသင့်တော်စေရန်။
- ထိပ်တန်း sampling parameter များနှင့် prompt ကို တောင်းဆိုမှုဖြင့် ပို့ရန် `send_request` ကို အသုံးပြုသည်။
- မော်ဒယ်၏ တုံ့ပြန်မှုသည် `generated_text` မှ ဒေတာရယူပြီး sampling parameterများနှင့် task type နှင့်အတူ ပြန်လည်ထုတ်ပေးသည်။
- အသုံးပြုသူ စိတ်ကြိုက်ချက်များကို အတည်ပြုရန်နှင့် sampling configuration မမှန်ကန်မှုကိုရပ်တန့်ရန် min နှင့် max function များကို အသုံးပြုသည်။

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript ဥပမာ - အသုံးပြုသူ ဆက်စပ်မှုအပေါ်မူတည်၍ ဒိုင်နမစ် စင်ပလ်နမ့် ဖွဲ့စည်းမှု
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // မူရင်း စင်ပလ်နမ့် ပရိုဖိုင်များ သတ်မှတ်ပါ
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // အတိတ်အချက်အလက်များ နဲ့ တိုးတက်မှုကို ထိန်းသိမ်းမှာယူပါ
    this.performanceHistory = [];
  }
  
  // ပရိုမ့် အတိုင်း လုပ်ငန်းအမျိုးအစား ကို တွေ့ရှိပါ
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // ရိုးရှင်းသော ခန့်မှန်းချက် သတ်မှတ်မှုပုံစံ - ML ခွဲခြားမှုနည်းပညာဖြင့် မြှင့်တင်နိုင်ပါသည်
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
    
    // ဖော်ပြချက်ရှင်းလင်းမှုမရှိလျှင် စကားပြောတစ်ခုအဖြစ် Default ပြုလုပ်ပါ
    return 'conversational';
  }
  
  // စက်တင်များကို ဆက်စပ်မှုနှင့် အသုံးပြုသူ စိတ်ကြိုက်ပေါ်မူတည်၍တွက်ချက်ပါ
  getSamplingParameters(prompt, context = {}) {
    // လုပ်ငန်းအမျိုးအစား ကို သိရှိပါ
    const taskType = this.detectTaskType(prompt, context);
    
    // မူရင်း ပရိုဖိုင်မရယူပါ
    let params = {...this.samplingProfiles[taskType]};
    
    // အသုံးပြုသူ စိတ်ကြိုက်များအပေါ် အညီ ဖြည့်ဆည်းပါ
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1 မှ 10 အတွင်းမှ တိုင်းတာမှုကို စုံလင်သော အပူချိန်အတိုင်းအတာသို့ ပြောင်းလဲပါ
        params.temperature = 0.1 + (creativity * 0.09); // 0.1 မှ 1.0
      }
      
      if (precision !== undefined) {
        // နှိမ့်သော topP ဆို precision မြင့်မားခြင်း (ရွေးချယ်မှု ပိုစိစစ်မှု ကြီး)
        params.topP = 1.0 - (precision * 0.05); // 0.5 မှ 1.0
      }
      
      if (consistency !== undefined) {
        // အတည်ပြုမှု မြင့်တက်ခြင်းသည် ဒဏ်ကြေးများအနည်းဆုံး ဖြစ်စေသည်
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1 မှ 0.9
      }
    }
    
    // အပြီးချိန် တိုးတက်မှုမှ သင်ယူထားသော ပြုပြင်မှုများကို အကောင်အထည်ဖော်ပါ
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // ရိုးရှင်းသော ယေဘုယျ လိုက်လျောညီထွေမှု - နည်းပညာပိုမို မြင့်မားသော algorithm များနှင့် တိုးတက်နိုင်သည်
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // မကြာသေးမီအတိတ်မှသာ စဉ်းစားပါ
    
    if (relevantHistory.length > 0) {
      // အမြတ်အစွန်း များကို အလယ်အလတ်ထွက်ချက် ထုတ်ယူပါ
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // စွမ်းဆောင်ရည်နိမ့်ပါက စက်တင်များကို ပြင်ဆင်ပါ
      if (avgScore < 0.7) {
        // ဘေးကင်းသော တန်ဖိုးများဆီသို့ နည်းနည်း ပြင်ဆင်မှု
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // အနာဂတ် အချက်အလက်ပြင်ဆင်မှုများအတွက် စွမ်းဆောင်ရည် မှတ်တမ်းတင်ပါ
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // တုံ့ပြန်မှုအရည်အသွေး 0-1 အဆင့်သတ်မှတ်ချက်
    });
    
    // အတိတ်မှတ်တမ်း အရွယ်အစားကို ကန့်သတ်ပါ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ဖြည့်တင်းပြီး စင်ပလ်နမ့် စက်တင်များရယူပါ
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ဖြည့်တင်းပြီး စက်တင်များဖြင့် တောင်းဆိုမှု ပို့ပါ
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // အသုံးပြုသူတုံ့ပြန်ချက် ရရှိပါက အနာဂတ် အဆင်ပြေမှုအတွက် မှတ်တမ်းတင်ပါ
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

// အသုံးပြုချက် ဥပမာ
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // ဖန်တီးမှု လုပ်ငန်းနှင့် အသုံးပြုသူ စိတ်ကြိုက်များ
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // ဖန်တီးမှုမြင့်မားခြင်း (1-10)
          consistency: 3  // လုံခြုံမှုနိမ့်ခြင်း (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // ကုတ်ရေးဆွဲမှု လုပ်ငန်း
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // ဖန်တီးမှုနိမ့်ခြင်း
          precision: 8,   // တိကျမှု မြင့်မားခြင်း
          consistency: 9  // လုံခြုံမှု မြင့်မားခြင်း
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

ယခင် ကုဒ်တွင် ကျွန်ုပ်တို့သည်-

- လုပ်ငန်းအမျိုးအစားနှင့် အသုံးပြုသူ စိတ်ကြိုက်ချက်အတိုင်း ဒိုင်နမစ် sampling ကို စီမံခန့်ခွဲသော `AdaptiveSamplingManager` class ကို ဖန်တီးခဲ့သည်။
- creative, factual, code, conversational အမျိုးအစားများအတွက် sampling profiles သတ်မှတ်ထားသည်။
- မူလ prompt များမှ လုပ်ငန်းအမျိုးအစားကို ရိုးရိုးရှင်းရှင်း heuristics ဖြင့် တွက်ချက်သည်။
- တွက်ချက်ထားသော task type နှင့် အသုံးပြုသူ စိတ်ကြိုက်ချက်အပေါ်မူတည်၍ sampling parameter များကို ဆုံးဖြတ်သည်။
- အတိတ် လုပ်ဆောင်မှုများအပေါ် မူတည်၍ တိုက်ရိုက်ပြောင်းလဲမှုများကို အသုံးပြုပြီး sampling parameter များကို စိစစ်ညှိသည်။
- နောက်တစ်ကြိမ် ပြောင်းလဲမှုအတွက်လုပ်ဆောင်မှုများကို မှတ်တမ်းတင်သည်၊ စနစ်သည် အတိတ် အဆက်အသွယ်မှ သင်ယူသည်။
- sampling parameter များကို ဒိုင်နမစ် ပြင်ဆင်ပြီး တောင်းဆိုချက်များ ပို့၍ ထုတ်ပေးသော စာသားနှင့် သတ်မှတ်ထားသော task type ကို ပြန်ပေးသည်။
- အသုံးပြုသည်-
    - `userPreferences` ဖြင့် အသုံးပြုသူ သတ်မှတ်ထားသော ဖန်တီးမှု, တိကျမှု, နှင့် တစ်ညီတစ်မျှမှု အဆင့်များအပေါ် sampling parameter များ ကို ချိန်ညှိခွင့်။
    - `detectTaskType` ဖြင့် prompt အပေါ်မူတည်၍ လုပ်ငန်းသဘာဝ ကို သတ်မှတ်ကာ ပိုမိုသင့်တော်သော တုံ့ပြန်မှုများပေးခြင်း။
    - `recordPerformance` ဖြင့် ထုတ်ပေးသော ဖြေကြားချက်များ စွမ်းဆောင်ရည် မှတ်တမ်းတင်ခြင်း၊ စနစ် သင်ယူမှုအတွက်။
    - `applyLearnedAdjustments` ဖြင့် အတိတ်စွမ်းဆောင်ရည်အပေါ်မူတည်၍ sampling parameter များ ပြင်ဆင်ခြင်း၊ မော်ဒယ်၏ အရည်အသွေးမြင့်မားသော တုံ့ပြန်မှုများ ပေးနိုင်စေရန်။
    - `generateResponse` ဖြင့် အပြည့်အစုံ sampling ကို ချုပ်ကိုင်ပြီး prompt နှင့် context မတူညီသော တောင်းဆိုမှုများတွင် ချိတ်ဆက်ခေါ်ဆိုရေး ၊ ပိုမိုလွယ်ကူစေရန်။
    - မော်ဒယ် အသုံးပြုခွင့် ရရှိသော ကိရိယာများကို သတ်မှတ်ရန် `allowedTools` ကို အသုံးပြု၊ context ကို ပိုမိုသိရှိပြီး တုံ့ပြန်မှုများပေးနိုင်ရန်။
    - ထုတ်ပေးသော ဖြေကြားချက်အရည်အသွေးနှင့်ပတ်သက်၍ အသုံးပြုသူမှ အကြံပြုချက်များ `feedbackScore` ဖြင့် ပေးနိုင်လွယ်ကူစေရန်၊ မော်ဒယ် စွမ်းဆောင်ရည် ကောင်းမွန်ရေးအတွက်။
    - ယခင် အပြန်အလှန်ဆက်သွယ်မှုမှတ်တမ်းများကို `performanceHistory` ဖြင့် သိုလှောင်ခြင်း၊ စနစ် သင်ယူရေးအတွက်။
    - sampling parameter များကို ဒိုင်နမစ်ချိန်ညှိရန် အသုံးပြုသူတောင်းဆိုမှု၏ context အပေါ် မူတည်၍ `getSamplingParameters` ကို အသုံးပြု။
    - prompt အပေါ် မူတည်၍ လုပ်ငန်းအမျိုးအစားသတ်မှတ်ပြီး sampling မဟာဗျူဟာ သက်ဆိုင်ရာ ချိန်ညှိချက် ပြုလုပ်ရန် `detectTaskType` ကို အသုံးပြု။
    - sampling များအတွက် အခြေခံ configuration များကို sampling profiles အဖြစ် သတ်မှတ်ထားသည်၊ တောင်းဆိုမှုအမျိုးအစားအပေါ် မူတည်၍ တိကျအမြန်ပြောင်းလဲနိုင်ရန်။

---

##နောက်တစ်ဆင့်

- [5.7 Scaling](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->