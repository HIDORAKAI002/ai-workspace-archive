> [متروک: 2026-07-28 ریلیز کینڈڈیٹ](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# موڈل کانٹیکسٹ پروٹوکول میں سیمپلنگ

> **متروک ہونے کا نوٹس:** `2026-07-28` MCP وضاحت ریلیز کینڈڈیٹ سیمپلنگ کو LLM فراہم کنندہ APIs کے ساتھ براہ راست انضمام کی حمایت میں متروک قرار دیتا ہے۔ سیمپلنگ `2025-11-25` اور کسی بھی رسمی متروک ہونے کے کم از کم ایک سال بعد بھی کام کرتی رہے گی، لہٰذا اس سبق میں سب کچھ درست رہے گا - لیکن نئے سرور ڈیزائنز کو تبدیلی کے نمونہ کا جائزہ لینا چاہیے۔ تفصیلات کے لیے دیکھیں [MCP میں کیا بدل رہا ہے: 2026-07-28 ریلیز کینڈڈیٹ](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)۔

سیمپلنگ ایک طاقتور MCP فیچر ہے جو سرورز کو کلائنٹ کے ذریعے LLM مکملات کے لیے درخواست کرنے کی اجازت دیتا ہے، جس سے پیچیدہ ایجنٹک رویے ممکن ہوتے ہیں جبکہ سیکیورٹی اور پرائیویسی برقرار رہتی ہے۔ صحیح سیمپلنگ کنفیگریشن ردعمل کے معیار اور کارکردگی کو نمایاں طور پر بہتر بنا سکتی ہے۔ MCP ایک معیاری طریقہ فراہم کرتا ہے کہ ماڈلز کس طرح مخصوص پیرامیٹرز کے ساتھ متن تیار کریں جو بے ترتیبی، تخلیقی صلاحیت اور ہم آہنگی کو متاثر کرتے ہیں۔

## تعارف

اس سبق میں، ہم MCP درخواستوں میں سیمپلنگ پیرامیٹرز کو کنفیگر کرنے کا طریقہ سیکھیں گے اور سیمپلنگ کے بنیادی پروٹوکول میکانکس کو سمجھیں گے۔

## سیکھنے کے مقاصد

اس سبق کے آخر تک آپ کر سکیں گے:

- MCP میں دستیاب کلیدی سیمپلنگ پیرامیٹرز کو سمجھنا۔
- مختلف استعمال کے کیسز کے لیے سیمپلنگ پیرامیٹرز کو کنفیگر کرنا۔
- قابلِ تکرار نتائج کے لیے ڈیٹرمنسٹک سیمپلنگ کو نافذ کرنا۔
- سیاق و سباق اور صارف کی ترجیحات کی بنیاد پر سیمپلنگ پیرامیٹرز کو متحرک طور پر ایڈجسٹ کرنا۔
- مختلف حالات میں ماڈل کی کارکردگی بڑھانے کے لیے سیمپلنگ حکمت عملیاں اپنانا۔
- MCP کے کلائنٹ-سرور فلو میں سیمپلنگ کیسے کام کرتی ہے، اسے سمجھنا۔

## MCP میں سیمپلنگ کیسے کام کرتی ہے

MCP میں سیمپلنگ کا عمل درج ذیل مراحل پر مشتمل ہے:

1. سرور کلائنٹ کو `sampling/createMessage` درخواست بھیجتا ہے
2. کلائنٹ درخواست کا جائزہ لیتا ہے اور اسے ترمیم کر سکتا ہے
3. کلائنٹ LLM سے سیمپلنگ کرتا ہے
4. کلائنٹ مکملات کا جائزہ لیتا ہے
5. کلائنٹ سرور کو نتیجہ واپس بھیجتا ہے

یہ ہومین ان دی لوپ ڈیزائن صارفین کو کنٹرول فراہم کرتا ہے کہ وہ LLM کو کیا دکھایا جاتا ہے اور وہ کیا تیار کرتا ہے۔

## سیمپلنگ پیرامیٹرز کا جائزہ

MCP میں وہ سیمپلنگ پیرامیٹرز مخصوص کیے گئے ہیں جنہیں کلائنٹ درخواستوں میں کنفیگر کیا جا سکتا ہے:

| پیرامیٹر | وضاحت | معمول کی حد |
|-----------|-------------|---------------|
| `temperature` | ٹوکن کے انتخاب میں بے ترتیبی کو کنٹرول کرتا ہے | 0.0 - 1.0 |
| `maxTokens` | جنریٹ کرنے والے زیادہ سے زیادہ ٹوکن کی تعداد | عددی قدر |
| `stopSequences` | مخصوص تسلسل جو جنریشن کو روک دیتے ہیں | سٹرنگز کی صف |
| `metadata` | اضافی فراہم کنندہ مخصوص پیرامیٹرز | JSON آبجیکٹ |

بہت سے LLM فراہم کنندہ اضافی پیرامیٹرز `metadata` فیلڈ کے ذریعے سپورٹ کرتے ہیں، جن میں شامل ہو سکتے ہیں:

| عام توسیعی پیرامیٹر | وضاحت | معمول کی حد |
|-----------|-------------|---------------|
| `top_p` | نیوکلیئس سیمپلنگ - ٹوکنز کو مجموعی امکانات کی چوٹی تک محدود کرتا ہے | 0.0 - 1.0 |
| `top_k` | ٹوکن انتخاب کو اوپر کے K اختیارات تک محدود کرتا ہے | 1 - 100 |
| `presence_penalty` | اب تک متن میں موجودگی کی بنیاد پر ٹوکنز کو سزا دیتا ہے | -2.0 - 2.0 |
| `frequency_penalty` | متن میں بار بار ہونے کی بنیاد پر ٹوکنز کو سزا دیتا ہے | -2.0 - 2.0 |
| `seed` | قابلِ تکرار نتائج کے لیے مخصوص رینڈم سیڈ | عددی قدر |

## درخواست کی مثال کا فارمیٹ

یہاں MCP میں کلائنٹ سے سیمپلنگ کی درخواست کی ایک مثال ہے:

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

## جواب کا فارمیٹ

کلائنٹ ایک مکملات کا نتیجہ واپس کرتا ہے:

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

## انسانی نگرانی کے اختیارات

MCP سیمپلنگ کو انسانی نگرانی کے ساتھ ڈیزائن کیا گیا ہے:

- **پرومپٹس کے لیے**:
  - کلائنٹس کو صارفین کو پرومپٹ دکھانا چاہیے
  - صارفین کو پرومپٹ میں ترمیم یا اسے مسترد کرنے کی اجازت ہونی چاہیے
  - سسٹم پرومپٹس کو فلٹر یا ترمیم کیا جا سکتا ہے
  - سیاق و سباق کی شمولیت کلائنٹ کے ذریعہ کنٹرول کی جاتی ہے

- **مکملتوں کے لیے**:
  - کلائنٹس کو مکملات صارفین کو دکھانے چاہئیں
  - صارفین کو مکملات میں ترمیم یا اسے مسترد کرنے کی اجازت ہونی چاہیے
  - کلائنٹس مکملات کو فلٹر یا ترمیم کر سکتے ہیں
  - صارفین فیصلہ کرتے ہیں کہ کون سا ماڈل استعمال ہوگا

ان اصولوں کو ذہن میں رکھتے ہوئے، آئیے مختلف پروگرامنگ زبانوں میں سیمپلنگ کو نافذ کرنے کا جائزہ لیتے ہیں، خاص طور پر ان پیرامیٹرز پر توجہ دیتے ہوئے جو عام طور پر LLM فراہم کنندہ کے درمیان حمایت شدہ ہیں۔

## سیکیورٹی کے پہلو

MCP میں سیمپلنگ کو نافذ کرتے وقت ان حفاظتی بہترین طریقوں پر غور کریں:

- **تمام پیغام کے مواد کی تصدیق کریں** کلائنٹ کو بھیجنے سے پہلے
- **محفوظ معلومات کو صفائی کریں** پرومپٹس اور مکملات سے
- **ریٹ لمٹس نافذ کریں** تاکہ زیادتی سے بچا جا سکے
- **سیمپلنگ کے استعمال کی نگرانی کریں** غیر معمولی پیٹرنز کے لیے
- **درخواست میں ڈیٹا کو انکرپٹ کریں** محفوظ پروٹوکول کے ذریعے
- **صارف کے ڈیٹا کی پرائیویسی کو سنبھالیں** متعلقہ قوانین کے مطابق
- **سیمپلنگ کی درخواستوں کا آڈٹ کریں** تعمیل اور سیکیورٹی کے لیے
- **لاگت کی نمائش کو کنٹرول کریں** مناسب حدود کے ذریعے
- **سیمپلنگ درخواستوں کے لیے ٹائم آؤٹ نافذ کریں**
- **ماڈل کی غلطیوں کو نرمی سے سنبھالیں** مناسب متبادل کے ساتھ

سیمپلنگ پیرامیٹرز زبان کے ماڈلز کے رویے کو باریک بینی سے ترتیب دینے کی اجازت دیتے ہیں تاکہ متعین اور تخلیقی نتائج کے درمیان مطلوبہ توازن حاصل کیا جا سکے۔

آئیے دیکھتے ہیں کہ مختلف پروگرامنگ زبانوں میں ان پیرامیٹرز کو کیسے کنفیگر کریں۔

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

پچھلے کوڈ میں ہم نے:

- مخصوص سرور URL کے ساتھ MCP کلائنٹ بنایا ہے۔
- `temperature`, `top_p`, اور `top_k` جیسے سیمپلنگ پیرامیٹرز کے ساتھ درخواست کنفیگر کی۔
- درخواست بھیجی اور جنریٹ کردہ متن پرنٹ کیا۔
- استعمال کیا:
    - `allowedTools` تاکہ جنریٹ کرنے کے دوران ماڈل کن ٹولز استعمال کر سکتا ہے، اس کی وضاحت کی جائے۔ اس معاملے میں، ہم نے `ideaGenerator` اور `marketAnalyzer` ٹولز کو تخلیقی ایپ خیالات تیار کرنے میں مدد کے لیے اجازت دی۔
    - `frequencyPenalty` اور `presencePenalty` بار بار پن اور متنوعی کو کنٹرول کرنے کے لیے۔
    - `temperature` آؤٹ پٹ کی بے ترتیبی کو کنٹرول کرنے کے لیے، جہاں زیادہ قیمتیں زیادہ تخلیقی ردعمل کی طرف لے جاتی ہیں۔
    - `top_p` ٹوکنز کے انتخاب کو اعلی مجموعی احتمال ماس تک محدود کرنے کے لیے، جو جنریٹ کردہ متن کے معیار کو بہتر بناتا ہے۔
    - `top_k` ماڈل کو سب سے زیادہ ممکنہ K ٹوکنز تک محدود کرنے کے لیے، جو زیادہ ہم آہنگ ردعمل فراہم کرنے میں مددگار ہوتا ہے۔
    - `frequencyPenalty` اور `presencePenalty` ٹوکنز کی بار بار تکرار کو کم کرنے اور جنریٹ کردہ متن میں تنوع کو فروغ دینے کے لیے۔

# [JavaScript](#tab/javascript)

```javascript
// جاوا اسکرپٹ کی مثال: درجہ حرارت اور ٹاپ-پی سیمپلنگ کی ترتیب
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP کلائنٹ کو ابتدائیہ بنائیں
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // مختلف سیمپلنگ پیرامیٹرز کے ساتھ درخواست کی ترتیب کریں
  const creativeSampling = {
    temperature: 0.9,    // زیادہ درجہ حرارت = زیادہ بے ترتیب/تخلیقی
    topP: 0.92,          // 92٪ اعلی احتمال ماس کے ساتھ ٹوکنز پر غور کریں
    frequencyPenalty: 0.6, // ٹوکن تسلسل کی تکرار کو کم کریں
    presencePenalty: 0.4   // ٹیکسٹ میں اب تک ظاہر ہونے والے ٹوکنز کو سزا دیں
  };
  
  const factualSampling = {
    temperature: 0.2,    // کم درجہ حرارت = زیادہ متعین/حقیقی
    topP: 0.85,          // تھوڑا زیادہ مرکوز ٹوکن انتخاب
    frequencyPenalty: 0.2, // معمولی تکرار سزا
    presencePenalty: 0.1   // معمولی موجودگی سزا
  };
  
  try {
    // مختلف سیمپلنگ ترتیب کے ساتھ دو درخواستیں بھیجیں
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

پچھلے کوڈ میں ہم نے:

- سرور URL اور API کلید کے ساتھ MCP کلائنٹ کی ابتدا کی۔
- سیمپلنگ پیرامیٹرز کے دو سیٹ کنفیگر کیے: ایک تخلیقی کاموں کے لیے اور دوسرا حقائق پر مبنی کاموں کے لیے۔
- ان کنفیگریشنز کے ساتھ درخواستیں بھیجی، ماڈل کو ہر کام کے لیے مخصوص ٹولز استعمال کرنے کی اجازت دی۔
- مختلف سیمپلنگ پیرامیٹرز کے اثرات کو دکھانے کے لیے پیدا کردہ ردعمل کو پرنٹ کیا۔
- استعمال کیا `allowedTools` تاکہ ماڈل جنریٹر کے دوران استعمال کیے جانے والے ٹولز کی وضاحت کی جا سکے۔ اس معاملے میں ہم نے تخلیقی کاموں کے لیے `ideaGenerator` اور `environmentalImpactTool` اجازت دی، اور حقائق پر مبنی کاموں کے لیے `factChecker` اور `dataAnalysisTool`۔
- `temperature` استعمال کیا تاکہ آؤٹ پٹ کی بے ترتیبی کو کنٹرول کیا جا سکے، جہاں زیادہ قیمت زیادہ تخلیقی ردعمل لاتی ہے۔
- `top_p` استعمال کیا تاکہ ٹوکنز کے انتخاب کو ان تک محدود کیا جا سکے جو اعلی مجموعی امکان ماس میں حصہ لیتے ہیں، جس سے جنریٹ کردہ متن کا معیار بڑھتا ہے۔
- `frequencyPenalty` اور `presencePenalty` استعمال کیے تاکہ تکرار کو کم کیا جائے اور آؤٹ پٹ میں تنوع کو فروغ دیا جائے۔
- `top_k` استعمال کیا تاکہ ماڈل کو سب سے زیادہ ممکنہ K ٹوکنز تک محدود کیا جا سکے، جو زیادہ ہم آہنگ ردعمل پیدا کرنے میں مدد دیتا ہے۔

---

## ڈیٹرمنسٹک سیمپلنگ

ایسی ایپلیکیشنز کے لیے جنہیں مستقل آؤٹ پٹ چاہیے، ڈیٹرمنسٹک سیمپلنگ یقینی بناتی ہے کہ نتائج قابلِ تکرار ہوں۔ اسے حاصل کرنے کے لیے ایک مقررہ رینڈم سیڈ استعمال کیا جاتا ہے اور temperature صفر مقرر کیا جاتا ہے۔

آئیے ذیل میں مختلف پروگرامنگ زبانوں میں ڈیٹرمنسٹک سیمپلنگ کی ایک مثال دیکھتے ہیں۔

# [Java](#tab/java)

```java
// جاوا کی مثال: نمایاں جوابات کے لیے مقررہ سیڈ کے ساتھ
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // نمایاں نتائج کے لیے مقررہ سیڈ کا استعمال
        
        // مقررہ سیڈ کے ساتھ پہلا درخواست
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // زیادہ سے زیادہ ترتیب کے لیے زیرو درجہ حرارت
            .build();
            
        // ایک ہی سیڈ کے ساتھ دوسرا درخواست
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // دونوں درخواستوں کو چلائیں
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // جوابات ایک جیسے ہونے چاہئیں کیونکہ ایک ہی سیڈ اور درجہ حرارت=0 ہے
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

پچھلے کوڈ میں ہم نے:

- مخصوص سرور URL کے ساتھ MCP کلائنٹ بنایا۔
- دو درخواستیں کنفیگر کیں جن میں ایک ہی پرومپٹ، فکسڈ سیڈ، اور صفر temperature تھا۔
- دونوں درخواستیں بھیجیں اور جنریٹ شدہ متن پرنٹ کیا۔
- دکھایا کہ جوابات یکساں ہیں کیونکہ سیمپلنگ کنفیگریشن (ایک جیسا سیڈ اور temperature) ڈیٹرمنسٹک ہے۔
- `setSeed` استعمال کیا تاکہ ایک مقررہ رینڈم سیڈ مختص کیا جائے، یہ یقینی بنانے کے لیے کہ ماڈل ہر بار ایک ہی ان پٹ کے لیے ایک ہی آؤٹ پٹ تیار کرے۔
- `temperature` صفر مقرر کیا تاکہ زیادہ سے زیادہ ڈیٹرمنزم یقینی بنایا جا سکے، یعنی ماڈل ہمیشہ سب سے ممکنہ اگلا ٹوکن منتخب کرے گا بغیر کسی بے ترتیبی کے۔

# [JavaScript](#tab/javascript-deterministic)

```javascript
// جاوا اسکرپٹ کی مثال: بیج کنٹرول کے ساتھ متعین جوابات
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // پہلے درخواست کے لئے مقررہ بیج
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // زیادہ سے زیادہ تعین کے لیے صفر درجہ حرارت
    });
    
    // دوسری درخواست اسی بیج اور درجہ حرارت کے ساتھ
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // تیسری درخواست مختلف بیج لیکن ایک ہی درجہ حرارت کے ساتھ
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

پچھلے کوڈ میں ہم نے:

- سرور URL کے ساتھ MCP کلائنٹ کی ابتدا کی۔
- دو درخواستیں کنفیگر کیں جن میں ایک ہی پرومپٹ، فکسڈ سیڈ، اور صفر temperature تھا۔
- دونوں درخواستیں بھیجیں اور جنریٹ شدہ متن پرنٹ کیا۔
- دکھایا کہ جوابات یکساں ہیں کیونکہ سیمپلنگ کنفیگریشن (ایک جیسا سیڈ اور temperature) ڈیٹرمنسٹک ہے۔
- `seed` استعمال کیا تاکہ ایک مقررہ رینڈم سیڈ مختص کیا جا سکے، تاکہ ایک ہی ان پٹ کے لیے ماڈل ہر بار ایک ہی آؤٹ پٹ تیار کرے۔
- `temperature` صفر مقرر کیا تاکہ زیادہ سے زیادہ ڈیٹرمنزم یقینی بنایا جا سکے، یعنی ماڈل ہمیشہ سب سے ممکنہ اگلا ٹوکن منتخب کرے بغیر بے ترتیبی کے۔
- تیسرے درخواست کے لیے مختلف سیڈ استعمال کیا تاکہ دکھایا جا سکے کہ سیڈ کی تبدیلی سے مختلف آؤٹ پٹ موصول ہوتے ہیں، حالانکہ پرومپٹ اور temperature ایک جیسے ہیں۔

---

## متحرک سیمپلنگ کنفیگریشن

ذہین سیمپلنگ درخواست کی نوعیت اور ضروریات کے مطابق پیرامیٹرز کو ایڈجسٹ کرتی ہے۔ یعنی temperature, top_p، اور penalties جیسے پیرامیٹرز کو کام کی نوعیت، صارف کی ترجیحات، یا سابقہ کارکردگی کی بنیاد پر متحرک طور پر ایڈجسٹ کرنا۔

آئیے مختلف پروگرامنگ زبانوں میں متحرک سیمپلنگ کو نافذ کرنے کا طریقہ دیکھتے ہیں۔

# [Python](#tab/python)

```python
# پائتھون کی مثال: درخواست کے سیاق و سباق کی بنیاد پر متحرک سیمپلنگ
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # مختلف ٹاسک کی اقسام کے لیے سیمپلنگ پری سیٹز متعین کریں
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # بنیادی پری سیٹ منتخب کریں
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # اگر دی گئی ہو تو صارف کی ترجیحات کی بنیاد پر ایڈجسٹ کریں
        if user_preferences:
            if "creativity_level" in user_preferences:
                # تخلیقی ترجیح (1-10) کی بنیاد پر درجہ حرارت کو اسکیل کریں
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # مطلوبہ جوابی تنوع کی بنیاد پر top_p کو ایڈجسٹ کریں
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # حسب ضرورت سیمپلنگ پیرا میٹرز کے ساتھ درخواست بنائیں اور بھیجیں
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # شفافیت کے لیے سیمپلنگ میٹا ڈیٹا کے ساتھ جواب واپس کریں
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

پچھلے کوڈ میں ہم نے:

- `DynamicSamplingService` کلاس بنائی جو متحرک سیمپلنگ کو منظم کرتی ہے۔
- مختلف کام کی اقسام (تخلیقی، حقائق پر مبنی، کوڈ، تجزیاتی) کے لیے سیمپلنگ پری سیٹ متعین کیے۔
- کام کی قسم کی بنیاد پر ایک بنیادی سیمپلنگ پری سیٹ منتخب کیا۔
- صارف کی ترجیحات جیسے تخلیقی صلاحیت اور تنوع کی بنیاد پر سیمپلنگ پیرامیٹرز کو ایڈجسٹ کیا۔
- متحرک طور پر کنفیگر کیے گئے سیمپلنگ پیرامیٹرز کے ساتھ درخواست بھیجی۔
- پیدا کردہ متن کو اس کے ساتھ واپس کیا جو سیمپلنگ پیرامیٹرز اور کام کی قسم کے ساتھ شفافیت کے لیے۔
- `temperature` آؤٹ پٹ کی بے ترتیبی کو کنٹرول کرنے کے لیے استعمال کیا، جہاں زیادہ قیمت زیادہ تخلیقی ردعمل لاتی ہے۔
- `top_p` استعمال کیا تاکہ ٹوکن سے انتخاب کو ان تک محدود کیا جا سکے جو اعلی مجموعی امکان ماس میں حصہ لیتے ہیں، اس طرح جنریٹ کردہ متن کے معیار کو بہتر بنانا۔
- `frequency_penalty` کا استعمال تکرار کو کم کرنے اور آؤٹ پٹ میں تنوع کو فروغ دینے کے لیے کیا۔
- `user_preferences` استعمال کی تاکہ صارف کی تخلیقی صلاحیت اور تنوع کی سطح کی بنیاد پر سیمپلنگ پیرامیٹرز کا تخصیص کیا جا سکے۔
- `task_type` استعمال کیا تاکہ درخواست کے لیے مناسب سیمپلنگ حکمت عملی منتخب کی جا سکے، کام کی نوعیت کی بنیاد پر زیادہ موزوں ردعمل فراہم کرنے کو یقینی بنایا جائے۔
- `send_request` میتھڈ کا استعمال پروپmt کے ساتھ کنفیگر شدہ سیمپلنگ پیرامیٹرز کے ساتھ درخواست بھیجنے کے لیے کیا، تاکہ ماڈل مخصوص ضروریات کے مطابق متن تیار کرے۔
- `generated_text` استعمال کیا تاکہ ماڈل کے ردعمل کو حاصل کیا جا سکے، جو پھر سیمپلنگ پیرامیٹرز اور کام کی قسم کے ساتھ مزید تجزیہ یا پیشکش کے لیے واپس کیا جاتا ہے۔
- `min` اور `max` فنکشنز استعمال کیے گئے تاکہ صارف کی ترجیحات کو درست حدود میں روکیں، بصورت دیگر غیر معتبر سیمپلنگ کنفیگریشن سے بچا جا سکے۔

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// جاوا اسکرپٹ کی مثال: صارف کے سیاق و سباق کی بنیاد پر ڈائنامک سیمپلنگ کی ترتیب
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // بنیادی سیمپلنگ پروفائلز کی تعریف کریں
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // تاریخی کارکردگی کو ٹریک کریں
    this.performanceHistory = [];
  }
  
  // پرامپٹ سے ٹاسک کی قسم کا پتہ لگائیں
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // سادہ ہیورسٹک دریافت - ایم ایل کلاسیفیکیشن کے ساتھ بہتر بنایا جا سکتا ہے
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
    
    // اگر کوئی واضح قسم معلوم نہ ہو تو بات چیت کو ڈیفالٹ کریں
    return 'conversational';
  }
  
  // سیاق و سباق اور صارف کی ترجیحات کی بنیاد پر سیمپلنگ کے پیرامیٹرز کا حساب لگائیں
  getSamplingParameters(prompt, context = {}) {
    // ٹاسک کی قسم کا پتہ لگائیں
    const taskType = this.detectTaskType(prompt, context);
    
    // بنیادی پروفائل حاصل کریں
    let params = {...this.samplingProfiles[taskType]};
    
    // صارف کی ترجیحات کی بنیاد پر ایڈجسٹ کریں
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 سے مناسب درجہ حرارت کی حد پر پیمانہ بنائیں
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // زیادہ درستگی کا مطلب ہے کم topP (زیادہ مرکوز انتخاب)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // زیادہ استحکام کا مطلب ہے کم سزائیں
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // کارکردگی کی تاریخ سے سیکھی گئی ایڈجسٹمنٹس لاگو کریں
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // سادہ موافق منطق - مزید پیچیدہ الگورتھمز سے بہتر کیا جا سکتا ہے
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // صرف حالیہ تاریخ کو مدنظر رکھیں
    
    if (relevantHistory.length > 0) {
      // اوسط کارکردگی کے اسکور کا حساب لگائیں
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // اگر کارکردگی حد سے کم ہو تو پیرامیٹرز میں تبدیلی کریں
      if (avgScore < 0.7) {
        // محفوظ اقدار کی طرف معمولی ایڈجسٹمنٹ
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // مستقبل کی ایڈجسٹمنٹ کے لیے کارکردگی کا ریکارڈ رکھیں
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // جواب کے معیار کی 0-1 درجہ بندی
    });
    
    // تاریخ کا سائز محدود کریں
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // بہتر شدہ سیمپلنگ پیرامیٹرز حاصل کریں
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // بہتر شدہ پیرامیٹرز کے ساتھ درخواست بھیجیں
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // اگر صارف رائے فراہم کرے تو اسے مستقبل کی بہتری کے لیے ریکارڈ کریں
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

// مثال کا استعمال
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // تخلیقی ٹاسک صارف کی تخصیص شدہ ترجیحات کے ساتھ
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // زیادہ تخلیقی (1-10)
          consistency: 3  // کم استحکام (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // کوڈ جنریشن ٹاسک
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // کم تخلیقی
          precision: 8,   // زیادہ درستگی
          consistency: 9  // زیادہ استحکام
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

پچھلے کوڈ میں ہم نے:

- `AdaptiveSamplingManager` کلاس بنائی جو کام کی نوعیت اور صارف کی ترجیحات کی بنیاد پر متحرک سیمپلنگ منظم کرتی ہے۔
- مختلف کام کی اقسام (تخلیقی، حقائق پر مبنی، کوڈ، گفتگواں) کے لیے سیمپلنگ پروفائلز متعین کیے۔
- سادہ قواعد کے ذریعے پرومپٹ سے کام کی نوعیت معلوم کرنے کا طریقہ عمل نافذ کیا۔
- کام کی قسم اور صارف کی ترجیحات کی بنیاد پر سیمپلنگ پیرامیٹرز کا حساب لگایا۔
- تاریخی کارکردگی کی بنیاد پر سیکھے ہوئے ایڈجسٹمنٹس کو لاگو کیا تاکہ سیمپلنگ پیرامیٹرز کی بہتر تشکیل کی جا سکے۔
- مستقبل کی ایڈجسٹمنٹ کے لیے کارکردگی کو ریکارڈ کیا، جس سے نظام ماضی کے تعاملات سے سیکھ سکے۔
- متحرک طور پر کنفیگر کیے گئے سیمپلنگ پیرامیٹرز کے ساتھ درخواستیں بھیجیں اور پیدا ہونے والا متن واپس کیا، جس میں لاگو پیرامیٹرز اور معلوم شدہ کام کی قسم بھی شامل تھی۔
- استعمال کیا:
    - `userPreferences` تاکہ صارف کی تخلیقی صلاحیت، درستگی، اور مستقل مزاجی کی سطح کی بنیاد پر سیمپلنگ پیرامیٹرز کو تبدیل کیا جا سکے۔
    - `detectTaskType` تاکہ پرومپٹ کی بنیاد پر کام کی نوعیت معلوم کی جا سکے، جو زیادہ موزوں ردعمل فراہم کرنے کی اجازت دیتا ہے۔
    - `recordPerformance` تاکہ پیدا کردہ ردعمل کی کارکردگی کو ریکارڈ کیا جا سکے، نظام کو وقت کے ساتھ بہتر بنانے کی اجازت دیتا ہے۔
    - `applyLearnedAdjustments` تاکہ تاریخی کارکردگی کی بنیاد پر سیمپلنگ پیرامیٹرز میں ترمیم کی جا سکے، جو ماڈل کی اعلی معیار کی ردعمل پیدا کرنے کی صلاحیت کو بڑھاتا ہے۔
    - `generateResponse` تاکہ پورے عمل کو ایک جگہ بند کیا جا سکے جو متحرک سیمپلنگ کے ساتھ ردعمل پیدا کرتا ہے، مختلف پرومپٹس اور سیاق و سباق کے ساتھ آسانی سے کال کیا جا سکے۔
    - `allowedTools` تاکہ جنریٹ کے دوران ماڈل کو استعمال کیے جانے والے ٹولز کی وضاحت کی جا سکے، زیادہ سیاق و سباق کے مطابق ردعمل کی اجازت دیتا ہے۔
    - `feedbackScore` تاکہ صارفین سے پیدا کردہ ردعمل کے معیار پر فیڈبیک لینے کی اجازت دے، جو وقت کے ساتھ ماڈل کی کارکردگی کو مزید بہتر بنانے کے لیے استعمال کیا جا سکتا ہے۔
    - `performanceHistory` تاکہ پچھلے تعاملات کا ریکارڈ رکھا جا سکے، نظام کو ماضی کی کامیابیوں اور ناکامیوں سے سیکھنے کے قابل بناتا ہے۔
    - `getSamplingParameters` تاکہ درخواست کے سیاق و سباق کی بنیاد پر سیمپلنگ پیرامیٹرز کو متحرک طور پر ایڈجسٹ کیا جا سکے، ماڈل رویے کو زیادہ لچکدار اور ذمہ دار بناتا ہے۔
    - `detectTaskType` تاکہ پرومپٹ کی بنیاد پر کام کی قسم کی تقسیم کی جا سکے، جو مختلف قسم کی درخواستوں کے لیے مناسب سیمپلنگ حکمت عملیوں کو اپنانے کی اجازت دیتا ہے۔
    - `samplingProfiles` تاکہ مختلف کام کی اقسام کے لیے بنیادی سیمپلنگ کنفیگریشنز کو ڈیفائن کیا جا سکے، جو درخواست کی نوعیت کے مطابق تیزی سے ایڈجسٹمنٹ کی اجازت دیتا ہے۔

---

## اگلا کیا ہے

- [5.7 اسکیلنگ](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->