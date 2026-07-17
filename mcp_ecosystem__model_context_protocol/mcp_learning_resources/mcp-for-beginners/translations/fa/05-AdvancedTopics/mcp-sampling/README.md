> [منسوخ شده: نامزد انتشار ۲۰۲۶-۰۷-۲۸](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# نمونه‌برداری در پروتکل مدل کانتکست

> **اطلاعیه منسوخ شدن:** نامزد انتشار مشخصات MCP با نسخه `۲۰۲۶-۰۷-۲۸` نمونه‌برداری را به نفع ادغام مستقیم با API‌های ارائه‌دهندگان LLM منسوخ اعلام می‌کند. نمونه‌برداری در نسخه `۲۰۲۵-۱۱-۲۵` و حداقل یک سال پس از هر اعلام رسمی منسوخ بودن کار می‌کند، بنابراین همه چیز در این درس معتبر است - اما طراحی‌های سرور جدید باید الگوی جایگزین را ارزیابی کنند. ببینید [چه چیزهایی در MCP تغییر می‌کند: نامزد انتشار ۲۰۲۶-۰۷-۲۸](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

نمونه‌برداری یک ویژگی قدرتمند MCP است که به سرورها اجازه می‌دهد تکمیل‌های LLM را از طریق کلاینت درخواست کنند، که امکان رفتارهای هوشمند و عاملی را در حالی که امنیت و حریم خصوصی حفظ می‌شود، فراهم می‌آورد. پیکربندی درست نمونه‌برداری می‌تواند به‌طور چشمگیری کیفیت و عملکرد پاسخ را بهبود بخشد. MCP راه استانداردی برای کنترل نحوه تولید متن توسط مدل‌ها با پارامترهای خاص که تصادفی بودن، خلاقیت و همبستگی را تحت تأثیر قرار می‌دهد، ارائه می‌دهد.

## معرفی

در این درس، نحوه پیکربندی پارامترهای نمونه‌برداری در درخواست‌های MCP و درک مکانیک‌های پایه پروتکل نمونه‌برداری را بررسی خواهیم کرد.

## اهداف آموزشی

تا پایان این درس، شما قادر خواهید بود:

- پارامترهای کلیدی نمونه‌برداری موجود در MCP را درک کنید.
- پارامترهای نمونه‌برداری را برای استفاده‌های مختلف پیکربندی کنید.
- نمونه‌برداری تعیین‌شده برای نتایج قابل تکرار اجرا کنید.
- پارامترهای نمونه‌برداری را بر اساس زمینه و ترجیحات کاربر به‌صورت پویا تنظیم کنید.
- استراتژی‌های نمونه‌برداری را برای بهبود عملکرد مدل در سناریوهای مختلف اعمال کنید.
- درک کنید که چگونه نمونه‌برداری در جریان کلاینت-سرور MCP عمل می‌کند.

## نحوه کار نمونه‌برداری در MCP

جریان نمونه‌برداری در MCP مراحل زیر را دنبال می‌کند:

1. سرور درخواست `sampling/createMessage` را به کلاینت می‌فرستد
2. کلاینت درخواست را بررسی و می‌تواند آن را تغییر دهد
3. کلاینت از یک LLM نمونه می‌گیرد
4. کلاینت تکمیل را بررسی می‌کند
5. کلاینت نتیجه را به سرور برمی‌گرداند

این طراحی با حضور انسان در حلقه اطمینان می‌دهد که کاربران کنترل آنچه LLM می‌بیند و تولید می‌کند را حفظ کنند.

## مروری بر پارامترهای نمونه‌برداری

MCP پارامترهای نمونه‌برداری زیر را تعریف می‌کند که در درخواست‌های کلاینت قابل پیکربندی هستند:

| پارامتر | توضیح | دامنه معمول |
|-----------|-------------|---------------|
| `temperature` | کنترل تصادفی بودن در انتخاب توکن | 0.0 - 1.0 |
| `maxTokens` | حداکثر تعداد توکن‌های تولیدی | مقدار صحیح |
| `stopSequences` | دنباله‌های سفارشی که هنگام برخورد توقف تولید را ایجاد می‌کنند | آرایه‌ای از رشته‌ها |
| `metadata` | پارامترهای اضافی خاص ارائه‌دهنده | شیء JSON |

بسیاری از ارائه‌دهندگان LLM پارامترهای اضافی را از طریق فیلد `metadata` پشتیبانی می‌کنند که ممکن است شامل موارد زیر باشد:

| پارامتر رایج توسعه | توضیح | دامنه معمول |
|-----------|-------------|---------------|
| `top_p` | نمونه‌برداری هسته‌ای - توکن‌ها را به احتمال تجمعی برتر محدود می‌کند | 0.0 - 1.0 |
| `top_k` | انتخاب توکن را به گزینه‌های برتر K محدود می‌کند | 1 - 100 |
| `presence_penalty` | توکن‌ها را بر اساس حضورشان در متن تا کنون تنبیه می‌کند | -2.0 - 2.0 |
| `frequency_penalty` | توکن‌ها را بر اساس فراوانی‌شان در متن تا کنون تنبیه می‌کند | -2.0 - 2.0 |
| `seed` | دانه تصادفی مشخص برای نتایج قابل تکرار | مقدار صحیح |

## قالب نمونه درخواست

در اینجا نمونه‌ای از درخواست نمونه‌برداری از یک کلاینت در MCP آمده است:

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

## قالب پاسخ

کلاینت نتیجه تکمیل را برمی‌گرداند:

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

## کنترل‌های حضور انسان در حلقه

نمونه‌برداری MCP با نظارت انسانی طراحی شده است:

- **برای پرامپت‌ها**:
  - کلاینت‌ها باید پرامپت پیشنهادی را به کاربران نشان دهند
  - کاربران باید بتوانند پرامپت‌ها را تغییر داده یا رد کنند
  - پرامپت‌های سیستمی می‌توانند فیلتر یا تغییر داده شوند
  - گنجاندن زمینه توسط کلاینت کنترل می‌شود

- **برای تکمیل‌ها**:
  - کلاینت‌ها باید تکمیل را به کاربران نشان دهند
  - کاربران باید بتوانند تکمیل‌ها را تغییر داده یا رد کنند
  - کلاینت‌ها می‌توانند تکمیل‌ها را فیلتر یا تغییر دهند
  - کاربران کنترل می‌کنند که کدام مدل استفاده شود

با در نظر گرفتن این اصول، بیایید ببینیم چگونه نمونه‌برداری را در زبان‌های برنامه‌نویسی مختلف پیاده‌سازی کنیم، با تمرکز بر پارامترهایی که اغلب توسط ارائه‌دهندگان LLM پشتیبانی می‌شود.

## ملاحظات امنیتی

هنگام پیاده‌سازی نمونه‌برداری در MCP، این بهترین شیوه‌های امنیتی را مد نظر قرار دهید:

- **اعتبارسنجی تمام محتوای پیام** قبل از ارسال آن به کلاینت
- **پاک‌سازی اطلاعات حساس** از پرامپت‌ها و تکمیل‌ها
- **اجرای محدودیت‌های نرخ** برای جلوگیری از سوءاستفاده
- **نظارت بر استفاده نمونه‌برداری** برای الگوهای غیرمعمول
- **رمزنگاری داده‌ها در مسیر انتقال** با استفاده از پروتکل‌های امن
- **رسیدگی به حریم خصوصی داده‌های کاربر** مطابق با مقررات مربوطه
- **ممیزی درخواست‌های نمونه‌برداری** برای انطباق و امنیت
- **کنترل هزینه‌ها** با محدودیت‌های مناسب
- **اجرای تایم‌اوت‌ها** برای درخواست‌های نمونه‌برداری
- **رسیدگی به خطاهای مدل به‌صورت مؤدبانه** با برنامه‌های جایگزین مناسب

پارامترهای نمونه‌برداری امکان تنظیم دقیق رفتار مدل‌های زبانی برای دستیابی به توازن مورد نظر بین خروجی‌های تعیین‌شده و خلاقانه را می‌دهند.

بیایید ببینیم چگونه این پارامترها را در زبان‌های برنامه‌نویسی مختلف پیکربندی کنیم.

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

در کد قبلی ما:

- یک کلاینت MCP با URL سرور مشخص ایجاد کردیم.
- یک درخواست با پارامترهای نمونه‌برداری مانند `temperature`، `top_p` و `top_k` پیکربندی کردیم.
- درخواست را ارسال کرده و متن تولید شده را چاپ کردیم.
- استفاده کردیم از:
    - `allowedTools` برای مشخص کردن اینکه مدل در هنگام تولید می‌تواند از کدام ابزارها استفاده کند. در این مورد، ابزارهای `ideaGenerator` و `marketAnalyzer` برای کمک به تولید ایده‌های خلاقانه برنامه مجاز شدند.
    - `frequencyPenalty` و `presencePenalty` برای کنترل تکرار و تنوع خروجی.
    - `temperature` برای کنترل تصادفی بودن خروجی، که مقادیر بالاتر به پاسخ‌های خلاقانه‌تر منجر می‌شود.
    - `top_p` برای محدود کردن انتخاب توکن‌ها به آن‌هایی که به احتمال تجمعی برتر کمک می‌کنند، بهبود کیفیت متن تولید شده.
    - `top_k` برای محدود کردن مدل به برترین K توکن محتمل که به تولید پاسخ‌های منسجم‌تر کمک می‌کند.
    - `frequencyPenalty` و `presencePenalty` برای کاهش تکرار و تشویق تنوع در متن تولید شده.

# [جاوااسکریپت](#tab/javascript)

```javascript
// نمونه جاوااسکریپت: پیکربندی دما و نمونه‌برداری Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // مقداردهی اولیه کلاینت MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // پیکربندی درخواست با پارامترهای نمونه‌برداری متفاوت
  const creativeSampling = {
    temperature: 0.9,    // دمای بالاتر = تصادفی‌تر/خلاقانه‌تر
    topP: 0.92,          // در نظر گرفتن توکن‌ها با جرم احتمال ۹۲٪ بالا
    frequencyPenalty: 0.6, // کاهش تکرار توالی‌های توکن
    presencePenalty: 0.4   // جریمه توکن‌هایی که تا کنون در متن ظاهر شده‌اند
  };
  
  const factualSampling = {
    temperature: 0.2,    // دمای پایین‌تر = قطعی‌تر/واقعی‌تر
    topP: 0.85,          // انتخاب توکن کمی متمرکزتر
    frequencyPenalty: 0.2, // حداقل جریمه تکرار
    presencePenalty: 0.1   // حداقل جریمه حضور
  };
  
  try {
    // ارسال دو درخواست با پیکربندی‌های نمونه‌برداری متفاوت
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

در کد قبلی ما:

- یک کلاینت MCP با URL سرور و کلید API مقداردهی اولیه کردیم.
- دو مجموعه پارامتر نمونه‌برداری پیکربندی کردیم: یکی برای وظایف خلاق و دیگری برای وظایف واقعی.
- درخواست‌ها را با این پیکربندی‌ها ارسال کردیم، اجازه دادیم مدل برای هر وظیفه از ابزارهای خاص استفاده کند.
- پاسخ‌های تولید شده را برای نشان دادن تأثیرات پارامترهای مختلف نمونه‌برداری چاپ کردیم.
- از `allowedTools` برای مشخص کردن اینکه مدل در هنگام تولید می‌تواند از کدام ابزارها استفاده کند استفاده کردیم. در این مورد، ابزارهای `ideaGenerator` و `environmentalImpactTool` برای وظایف خلاق و `factChecker` و `dataAnalysisTool` برای وظایف واقعی مجاز شدند.
- از `temperature` برای کنترل تصادفی بودن خروجی استفاده کردیم، که مقادیر بالاتر به پاسخ‌های خلاقانه‌تر منجر می‌شود.
- از `top_p` برای محدود کردن انتخاب توکن‌ها به آن‌ها که به احتمال تجمعی برتر کمک می‌کنند استفاده کردیم، بهبود کیفیت متن تولید شده.
- از `frequencyPenalty` و `presencePenalty` برای کاهش تکرار و تشویق تنوع در خروجی استفاده کردیم.
- از `top_k` برای محدود کردن مدل به برترین K توکن محتمل استفاده کردیم که به تولید پاسخ‌های منسجم‌تر کمک می‌کند.

---

## نمونه‌برداری تعیین‌شده

برای برنامه‌هایی که نیاز به خروجی‌های ثابت دارند، نمونه‌برداری تعیین‌شده نتایج قابل تکرار را تضمین می‌کند. چگونه این کار را انجام می‌دهد؟ با استفاده از یک دانه تصادفی ثابت و تنظیم دما روی صفر.

بیایید نمونه پیاده‌سازی زیر را برای نمایش نمونه‌برداری تعیین‌شده در زبان‌های مختلف برنامه‌نویسی ببینیم.

# [جاوا](#tab/java)

```java
// مثال جاوا: پاسخ‌های قطعی با بذر ثابت
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // استفاده از بذر ثابت برای نتایج قطعی
        
        // اولین درخواست با بذر ثابت
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // دمای صفر برای بیشترین قطعیت
            .build();
            
        // دومین درخواست با همان بذر
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // اجرای هر دو درخواست
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // پاسخ‌ها باید به دلیل بذر و دمای یکسان برابر باشند
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

در کد قبلی ما:

- یک کلاینت MCP با URL سرور مشخص ایجاد کردیم.
- دو درخواست با همان پرامپت، دانه ثابت، و دمای صفر پیکربندی کردیم.
- هر دو درخواست را ارسال کرده و متن تولید شده را چاپ کردیم.
- نشان دادیم که پاسخ‌ها به دلیل طبیعت تعیین‌شده پیکربندی نمونه‌برداری (دانه و دمای یکسان) یکسان هستند.
- از `setSeed` برای مشخص کردن دانه تصادفی ثابت استفاده کردیم، که تضمین می‌کند مدل برای هر ورودی یکسان همیشه خروجی یکسانی تولید کند.
- `temperature` را روی صفر تنظیم کردیم تا حداکثر تعیین‌پذیری را داشته باشیم، به این معنی که مدل همیشه محتمل‌ترین توکن بعدی را بدون تصادفی بودن انتخاب می‌کند.

# [جاوااسکریپت](#tab/javascript-deterministic)

```javascript
// مثال جاوااسکریپت: پاسخ‌های قطعی با کنترل بذر
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // اولین درخواست با بذر ثابت
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // دمای صفر برای بیشترین قطعی بودن
    });
    
    // دومین درخواست با همان بذر و دما
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // سومین درخواست با بذر متفاوت اما همان دما
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

در کد قبلی ما:

- یک کلاینت MCP با URL سرور مقداردهی اولیه کردیم.
- دو درخواست با همان پرامپت، دانه ثابت، و دمای صفر پیکربندی کردیم.
- هر دو درخواست را ارسال کرده و متن تولید شده را چاپ کردیم.
- نشان دادیم که پاسخ‌ها به دلیل طبیعت تعیین‌شده پیکربندی نمونه‌برداری (دانه و دمای یکسان) یکسان هستند.
- از `seed` برای مشخص کردن دانه تصادفی ثابت استفاده کردیم، که تضمین می‌کند مدل برای هر ورودی یکسان همیشه خروجی یکسان تولید کند.
- `temperature` را روی صفر تنظیم کردیم تا حداکثر تعیین‌پذیری را داشته باشیم، به این معنی که مدل همیشه محتمل‌ترین توکن بعدی را بدون تصادفی بودن انتخاب می‌کند.
- برای درخواست سوم از دانه متفاوتی استفاده کردیم تا نشان دهیم تغییر دانه باعث خروجی‌های متفاوت می‌شود، حتی با همان پرامپت و دما.

---

## پیکربندی نمونه‌برداری پویا

نمونه‌برداری هوشمند پارامترها را بر اساس زمینه و نیازهای هر درخواست تنظیم می‌کند. یعنی به‌صورت پویا پارامترهایی مانند دما، top_p و جریمه‌ها بر اساس نوع وظیفه، ترجیحات کاربر یا عملکرد گذشته تنظیم می‌شوند.

بیایید ببینیم چگونه نمونه‌برداری پویا را در زبان‌های برنامه‌نویسی مختلف پیاده‌سازی کنیم.

# [پایتون](#tab/python)

```python
# نمونه پایتون: نمونه‌برداری پویا بر اساس زمینه درخواست
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # تعیین تنظیمات نمونه‌برداری برای انواع مختلف وظایف
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # انتخاب تنظیمات پایه
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # تنظیم بر اساس ترجیحات کاربر در صورت ارائه
        if user_preferences:
            if "creativity_level" in user_preferences:
                # مقیاس‌بندی دما بر اساس ترجیح خلاقیت (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # تنظیم top_p بر اساس تنوع پاسخ مورد نظر
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # ایجاد و ارسال درخواست با پارامترهای نمونه‌برداری سفارشی
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # بازگرداندن پاسخ همراه با فراداده نمونه‌برداری برای شفافیت
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

در کد قبلی ما:

- یک کلاس `DynamicSamplingService` ایجاد کردیم که مدیریت نمونه‌برداری تطبیقی را بر عهده دارد.
- پیش‌تنظیم‌های نمونه‌برداری را برای انواع وظایف مختلف (خلاق، واقعی، کد، تحلیلی) تعریف کردیم.
- یک پیش‌تنظیم نمونه‌برداری پایه را بر اساس نوع وظیفه انتخاب کردیم.
- پارامترهای نمونه‌برداری را بر اساس ترجیحات کاربر مانند سطح خلاقیت و تنوع تنظیم کردیم.
- درخواست را با پارامترهای نمونه‌برداری به‌صورت پویا پیکربندی شده ارسال کردیم.
- متن تولید شده را همراه با پارامترهای اعمال شده و نوع وظیفه برای شفافیت برگرداندیم.
- از `temperature` برای کنترل تصادفی بودن خروجی استفاده کردیم که مقادیر بالاتر باعث پاسخ‌های خلاقانه‌تر می‌شود.
- از `top_p` برای محدود کردن انتخاب توکن‌ها به آن‌ها که احتمال تجمعی برتر دارند استفاده کردیم، که کیفیت متن تولید شده را بهتر می‌کند.
- از `frequency_penalty` برای کاهش تکرار و تشویق تنوع در خروجی استفاده کردیم.
- از `user_preferences` برای اجازه سفارشی‌سازی پارامترهای نمونه‌برداری بر اساس سطوح تعریف شده خلاقیت و تنوع توسط کاربر استفاده کردیم.
- از `task_type` برای تعیین استراتژی مناسب نمونه‌برداری برای درخواست استفاده کردیم، که اجازه پاسخ‌های مخصوص‌تر بر اساس ماهیت وظیفه را می‌دهد.
- از متد `send_request` برای ارسال پرامپت با پارامترهای نمونه‌برداری پیکربندی شده استفاده کردیم تا مدل متن را طبق الزامات مشخص شده تولید کند.
- از `generated_text` برای دریافت پاسخ مدل استفاده کردیم که همراه با پارامترهای نمونه‌برداری و نوع وظیفه برای تحلیل یا نمایش بیشتر برگردانده می‌شود.
- از توابع `min` و `max` استفاده کردیم تا مطمئن شویم ترجیحات کاربر در محدوده‌های معتبر قرار دارند و از تنظیمات نامعتبر نمونه‌برداری جلوگیری شود.

# [جاوااسکریپت پویا](#tab/javascript-dynamic)

```javascript
// نمونه جاوااسکریپت: پیکربندی نمونه‌گیری پویا بر اساس زمینه کاربر
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // تعیین نمایه‌های پایه نمونه‌گیری
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // پیگیری عملکرد تاریخی
    this.performanceHistory = [];
  }
  
  // تشخیص نوع کار از متن ورودی
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // تشخیص ساده مبتنی بر قوانین - می‌توان با طبقه‌بندی یادگیری ماشین بهبود داد
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
    
    // در صورت عدم تشخیص نوع واضح، به صورت پیش‌فرض مکالمه در نظر گرفته می‌شود
    return 'conversational';
  }
  
  // محاسبه پارامترهای نمونه‌گیری بر اساس زمینه و ترجیحات کاربر
  getSamplingParameters(prompt, context = {}) {
    // تشخیص نوع کار
    const taskType = this.detectTaskType(prompt, context);
    
    // دریافت نمایه پایه
    let params = {...this.samplingProfiles[taskType]};
    
    // تنظیم بر اساس ترجیحات کاربر
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // مقیاس‌بندی از 1 تا 10 به دامنه دمای مناسب
        params.temperature = 0.1 + (creativity * 0.09); // ۰.۱-۱.۰
      }
      
      if (precision !== undefined) {
        // دقت بالاتر به معنای topP پایین‌تر (انتخاب متمرکزتر) است
        params.topP = 1.0 - (precision * 0.05); // ۰.۵-۱.۰
      }
      
      if (consistency !== undefined) {
        // ثبات بالاتر به معنای تنبیهات کمتر است
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // ۰.۱-۰.۹
      }
    }
    
    // اعمال تنظیمات آموخته شده از تاریخچه عملکرد
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // منطق تطبیقی ساده - می‌توان با الگوریتم‌های پیشرفته‌تر بهبود داد
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // فقط تاریخچه اخیر را در نظر بگیرید
    
    if (relevantHistory.length > 0) {
      // محاسبه نمرات متوسط عملکرد
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // اگر عملکرد زیر آستانه باشد، پارامترها را تنظیم کنید
      if (avgScore < 0.7) {
        // تنظیم جزئی به سمت مقادیر ایمن‌تر
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // ثبت عملکرد برای تنظیمات آینده
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // امتیاز ۰-۱ کیفیت پاسخ
    });
    
    // محدود کردن اندازه تاریخچه
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // دریافت پارامترهای نمونه‌گیری بهینه شده
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ارسال درخواست با پارامترهای بهینه شده
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // اگر کاربر بازخورد ارائه داد، آن را برای بهینه‌سازی آینده ثبت کنید
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

// نمونه کاربرد
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // کار خلاقانه با ترجیحات سفارشی کاربر
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // خلاقیت بالا (۱-۱۰)
          consistency: 3  // ثبات کم (۱-۱۰)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // کار تولید کد
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // خلاقیت کم
          precision: 8,   // دقت بالا
          consistency: 9  // ثبات بالا
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

در کد قبلی ما:

- یک کلاس `AdaptiveSamplingManager` ایجاد کردیم که نمونه‌برداری پویا را بر اساس نوع وظیفه و ترجیحات کاربر مدیریت می‌کند.
- پروفایل‌های نمونه‌برداری را برای انواع وظایف مختلف (خلاق، واقعی، کد، مکالمه‌ای) تعریف کردیم.
- متدی برای تشخیص نوع وظیفه از روی پرامپت با استفاده از قواعد ساده پیاده‌سازی کردیم.
- پارامترهای نمونه‌برداری را بر اساس نوع وظیفه تشخیص داده شده و ترجیحات کاربر محاسبه کردیم.
- تنظیمات آموخته شده بر اساس عملکرد گذشته را برای بهینه‌سازی پارامترهای نمونه‌برداری اعمال کردیم.
- عملکرد برای تنظیمات آینده ثبت شد تا سیستم بتواند از تعاملات گذشته یاد بگیرد.
- درخواست‌ها با پارامترهای نمونه‌برداری به‌صورت پویا پیکربندی شده ارسال و متن تولید شده همراه با پارامترهای اعمال شده و نوع وظیفه تشخیص داده شده برگردانده شد.
- استفاده کردیم از:
    - `userPreferences` که اجازه می‌دهد پارامترهای نمونه‌برداری بر اساس سطوح تعریف شده خلاقیت، دقت و ثبات توسط کاربر سفارشی شوند.
    - `detectTaskType` برای تعیین ماهیت وظیفه بر اساس پرامپت که امکان پاسخ‌های مخصوص‌تر را می‌دهد.
    - `recordPerformance` برای ثبت عملکرد پاسخ‌های تولید شده که به سیستم اجازه می‌دهد تطبیق یافته و به مرور زمان بهبود یابد.
    - `applyLearnedAdjustments` برای اصلاح پارامترهای نمونه‌برداری بر اساس عملکرد تاریخی، که قابلیت مدل را در تولید پاسخ‌های با کیفیت بالا افزایش می‌دهد.
    - `generateResponse` برای پوشش کامل فرآیند تولید پاسخ با نمونه‌برداری تطبیقی که کدنویسی با پرامپت‌ها و زمینه‌های مختلف را آسان می‌کند.
    - `allowedTools` برای مشخص کردن ابزارهایی که مدل می‌تواند در هنگام تولید استفاده کند، که امکان پاسخ‌های آگاه به زمینه بیشتر را می‌دهد.
    - `feedbackScore` برای اجازه دادن به کاربران در ارائه بازخورد درباره کیفیت پاسخ تولید شده، که می‌تواند برای اصلاح بیشتر عملکرد مدل در طول زمان استفاده شود.
    - `performanceHistory` برای نگهداری سابقه تعاملات قبلی، که به سیستم اجازه می‌دهد از موفقیت‌ها و شکست‌های گذشته یاد بگیرد.
    - `getSamplingParameters` برای تنظیم پویا پارامترهای نمونه‌برداری بر اساس زمینه درخواست، که امکان رفتار مدل انعطاف‌پذیرتر و پاسخگوتر را فراهم می‌کند.
    - `detectTaskType` برای طبقه‌بندی وظیفه بر اساس پرامپت، که اجازه می‌دهد سیستم استراتژی‌های نمونه‌برداری مناسب برای انواع مختلف درخواست‌ها را اعمال کند.
    - `samplingProfiles` برای تعریف تنظیمات پایه نمونه‌برداری برای انواع وظایف مختلف، که اجازه تنظیم سریع بر اساس ماهیت درخواست را می‌دهد.

---

## مرحله بعدی

- [۵.۷ مقیاس‌بندی](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->