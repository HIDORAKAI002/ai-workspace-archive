> [موقوف: مرشح الإصدار 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# المعاينة في بروتوكول سياق النماذج

> **إشعار التوقف عن الاستخدام:** مرشح إصدار مواصفة MCP بتاريخ `2026-07-28` يعلن أن المعاينة أصبحت موقوفة لصالح التكامل المباشر مع واجهات برمجة التطبيقات لمزودي LLM. لا تزال المعاينة تعمل في الإصدار `2025-11-25` ولمدة سنة على الأقل بعد إيقافها الرسمي، لذا كل ما في هذا الدرس لا يزال صالحاً - لكن يجب على تصميمات الخوادم الجديدة تقييم النمط البديل. راجع [ما الجديد في MCP: مرشح إصدار 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

المعاينة ميزة قوية في MCP تسمح للخوادم بطلب إكمالات LLM عبر العميل، مما يمكّن سلوكيات وكيليّة متقدمة مع الحفاظ على الأمان والخصوصية. الإعداد الصحيح للمعاينة يمكن أن يحسّن بشكل كبير جودة الاستجابة والأداء. يوفر MCP طريقة موحدة للتحكم في كيفية توليد النماذج للنص بواسطة معلمات محددة تؤثر في العشوائية، والإبداع، والتماسك.

## مقدمة

في هذا الدرس، سنستكشف كيفية تكوين معلمات المعاينة في طلبات MCP وفهم آليات البروتوكول الأساسية للمعاينة.

## أهداف التعلم

بحلول نهاية هذا الدرس، ستكون قادراً على:

- فهم معلمات المعاينة الرئيسية المتاحة في MCP.
- تكوين معلمات المعاينة لحالات استخدام مختلفة.
- تنفيذ معاينة حتمية لتحقيق نتائج قابلة للإعادة.
- تعديل معلمات المعاينة ديناميكياً بناءً على السياق وتفضيلات المستخدم.
- تطبيق استراتيجيات المعاينة لتعزيز أداء النموذج في سيناريوهات متنوعة.
- فهم كيفية عمل المعاينة في تدفق العميل-الخادم في MCP.

## كيفية عمل المعاينة في MCP

يتبع تدفق المعاينة في MCP هذه الخطوات:

1. يرسل الخادم طلب `sampling/createMessage` إلى العميل
2. يراجع العميل الطلب ويستطيع تعديله
3. يقوم العميل بأخذ عينات من LLM
4. يراجع العميل الإكمال
5. يعيد العميل النتيجة إلى الخادم

يضمن هذا التصميم بمشاركة الإنسان في الحلقة أن المستخدمين يحافظون على السيطرة على ما يراه ويولده LLM.

## نظرة عامة على معلمات المعاينة

يحدد MCP المعلمات التالية الخاصة بالمعاينة التي يمكن تكوينها في طلبات العميل:

| المعلمة | الوصف | النطاق النموذجي |
|-----------|-------------|---------------|
| `temperature` | يتحكم في العشوائية في اختيار الرموز | 0.0 - 1.0 |
| `maxTokens` | الحد الأقصى لعدد الرموز التي سيتم توليدها | قيمة صحيحة |
| `stopSequences` | تسلسلات مخصصة توقف التوليد عند مواجهتها | مصفوفة من السلاسل |
| `metadata` | معلمات إضافية خاصة بالمزود | كائن JSON |

يدعم العديد من مزودي LLM معلمات إضافية عبر حقل `metadata`، والتي قد تشمل:

| معلمة التوسيع الشائعة | الوصف | النطاق النموذجي |
|-----------|-------------|---------------|
| `top_p` | معاينة محور النواة - يحد الرموز ضمن أعلى احتمال تجميعي | 0.0 - 1.0 |
| `top_k` | يحد اختيار الرموز ضمن أفضل K خيارات | 1 - 100 |
| `presence_penalty` | يعاقب الرموز بناءً على وجودها في النص حتى الآن | -2.0 - 2.0 |
| `frequency_penalty` | يعاقب الرموز بناءً على تواترها في النص حتى الآن | -2.0 - 2.0 |
| `seed` | بذرة عشوائية محددة لتحقيق نتائج قابلة للإعادة | قيمة صحيحة |

## نموذج تنسيق الطلب

هذا مثال لطلب معاينة من عميل في MCP:

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

## نموذج تنسيق الاستجابة

يعيد العميل نتيجة الإكمال:

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

## ضوابط وجود الإنسان في الحلقة

تم تصميم معاينة MCP مع إشراف إنساني في الاعتبار:

- **بالنسبة للمطالبات**:
  - يجب على العملاء عرض المطالبة المقترحة للمستخدمين
  - يجب أن يكون المستخدمون قادرين على تعديل أو رفض المطالبات
  - يمكن تصفية أو تعديل مطالبات النظام
  - يسيطر العميل على تضمين السياق

- **بالنسبة للإكمالات**:
  - يجب على العملاء عرض الإكمال للمستخدمين
  - يجب أن يكون المستخدمون قادرين على تعديل أو رفض الإكمالات
  - يمكن للعملاء تصفية أو تعديل الإكمالات
  - المستخدمون يختارون النموذج المستخدم

مع هذه المبادئ في الاعتبار، لنلقي نظرة على كيفية تنفيذ المعاينة بلغات برمجة مختلفة، مع التركيز على المعلمات التي تدعمها معظم مزودي LLM.

## اعتبارات الأمان

عند تنفيذ المعاينة في MCP، ضع في اعتبارك أفضل ممارسات الأمان التالية:

- **تحقق من صحة محتوى الرسالة بالكامل** قبل إرسالها إلى العميل
- **نظف المعلومات الحساسة** من المطالبات والإكمالات
- **نفذ حدود المعدل** لمنع سوء الاستخدام
- **راقب استخدام المعاينة** لرصد الأنماط غير العادية
- **شفر البيانات أثناء النقل** باستخدام بروتوكولات آمنة
- **تعامل مع خصوصية بيانات المستخدم** وفقاً للأنظمة ذات الصلة
- **راجع طلبات المعاينة** لضمان الامتثال والأمان
- **تحكم بالتكاليف المكشوفة** بواسطة الحدود المناسبة
- **نفذ مهلات** لطلبات المعاينة
- **تعامل مع أخطاء النموذج برفق** بآليات بديلة مناسبة

تتيح معلمات المعاينة ضبط سلوك نماذج اللغة بدقة لتحقيق التوازن المطلوب بين المخرجات الحتمية والإبداعية.

لننظر كيف يمكن تكوين هذه المعلمات بلغات برمجة مختلفة.

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

في الكود أعلاه لقد:

- أنشأنا عميل MCP بعنوان خادم محدد.
- كونفجنا طلباً بمعلمات المعاينة مثل `temperature`، `top_p`، و `top_k`.
- أرسلنا الطلب وطباعنا النص المولد.
- استخدمنا:
    - `allowedTools` لتحديد الأدوات التي يمكن للنموذج استخدامها أثناء التوليد. في هذه الحالة، سمحنا بأدوات `ideaGenerator` و `marketAnalyzer` للمساعدة في توليد أفكار تطبيقات إبداعية.
    - `frequencyPenalty` و `presencePenalty` للسيطرة على التكرار والتنوع في الناتج.
    - `temperature` للتحكم في عشوائية الناتج، حيث القيم الأعلى تؤدي إلى استجابات أكثر إبداعاً.
    - `top_p` للحد من اختيار الرموز إلى تلك التي تسهم في أعلى كتلة احتمال تراكمي، مما يعزز جودة النص المولد.
    - `top_k` لتقييد النموذج بأكثر K رموز احتمالاً، مما يساعد في توليد استجابات أكثر تماسكاً.
    - `frequencyPenalty` و `presencePenalty` لتقليل التكرار وتشجيع التنوع في النص المولد.

# [JavaScript](#tab/javascript)

```javascript
// مثال جافاسكريبت: تكوين درجة الحرارة وأخذ العينات من الأعلى-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // تهيئة عميل MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // تكوين الطلب باستخدام معلمات أخذ عينات مختلفة
  const creativeSampling = {
    temperature: 0.9,    // درجة حرارة أعلى = مزيد من العشوائية/الإبداع
    topP: 0.92,          // اعتبر الرموز مع كتلة احتمالية 92% الأعلى
    frequencyPenalty: 0.6, // تقليل تكرار تسلسلات الرموز
    presencePenalty: 0.4   // معاقبة الرموز التي ظهرت في النص حتى الآن
  };
  
  const factualSampling = {
    temperature: 0.2,    // درجة حرارة أقل = أكثر حتمية/واقعية
    topP: 0.85,          // اختيار رموز أكثر تركيزًا قليلاً
    frequencyPenalty: 0.2, // عقوبة تكرار بسيطة
    presencePenalty: 0.1   // عقوبة تواجد بسيطة
  };
  
  try {
    // إرسال طلبين بإعدادات أخذ عينات مختلفة
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

في الكود أعلاه لقد:

- بادرنا عميل MCP بعنوان الخادم ومفتاح API.
- كونفجنا مجموعتين من معلمات المعاينة: واحدة للمهام الإبداعية وأخرى للمهام الواقعية.
- أرسلنا طلبات بهذه الإعدادات، مما سمح للنموذج باستخدام أدوات محددة لكل مهمة.
- طبعنا الاستجابات المولدة لعرض تأثيرات معلمات المعاينة المختلفة.
- استخدمنا `allowedTools` لتحديد الأدوات التي يمكن للنموذج استخدامها أثناء التوليد. في هذه الحالة، سمحنا لأدوات `ideaGenerator` و `environmentalImpactTool` للمهام الإبداعية، و `factChecker` و `dataAnalysisTool` للمهام الواقعية.
- استخدمنا `temperature` للتحكم في عشوائية الناتج، حيث القيم الأعلى تؤدي إلى استجابات أكثر إبداعاً.
- استخدمنا `top_p` للحد من اختيار الرموز إلى تلك التي تسهم في أعلى كتلة احتمال تراكمي، مما يعزز جودة النص المولد.
- استخدمنا `frequencyPenalty` و `presencePenalty` لتقليل التكرار وتشجيع التنوع في الناتج.
- استخدمنا `top_k` لتقييد النموذج بأكثر K رموز احتمالاً، مما يساعد في توليد استجابات أكثر تماسكاً.

---

## المعاينة الحتمية

للتطبيقات التي تتطلب مخرجات متسقة، تضمن المعاينة الحتمية نتائج قابلة للإعادة. يتم ذلك باستخدام بذرة عشوائية ثابتة وضبط درجة الحرارة إلى الصفر.

لننظر إلى مثال تنفيذ أدناه لعرض المعاينة الحتمية بلغات برمجة مختلفة.

# [Java](#tab/java)

```java
// مثال جافا: استجابات حتمية باستخدام بذرة ثابتة
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // استخدام بذرة ثابتة للحصول على نتائج حتمية
        
        // الطلب الأول باستخدام بذرة ثابتة
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // درجة حرارة صفر لأقصى حتمية
            .build();
            
        // الطلب الثاني باستخدام نفس البذرة
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // تنفيذ كلا الطلبين
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // يجب أن تكون الاستجابات متطابقة بسبب نفس البذرة ودرجة الحرارة = 0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

في الكود أعلاه لقد:

- أنشأنا عميل MCP بعنوان خادم محدد.
- كونفجنا طلبين بنفس المطالبة، مع بذرة ثابتة ودرجة حرارة صفر.
- أرسلنا كلا الطلبين وطباعنا النص المولد.
- برهنا أن الاستجابات متطابقة بفضل الطبيعة الحتمية لتكوين المعاينة (نفس البذرة ودرجة الحرارة).
- استخدمنا `setSeed` لتحديد بذرة عشوائية ثابتة، مما يضمن أن النموذج يولد نفس المخرج لنفس الإدخال كل مرة.
- ضبطنا `temperature` للصفر لضمان أقصى درجات الحتمية، مما يعني أن النموذج سيختار دائماً الرمز التالي الأكثر احتمالاً بدون عشوائية.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// مثال جافا سكريبت: ردود محددة مع التحكم بالبذرة
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // الطلب الأول بذرة ثابتة
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // درجة حرارة صفر لأقصى تحديد
    });
    
    // الطلب الثاني بنفس البذرة والحرارة
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // الطلب الثالث ببذرة مختلفة لكن نفس الحرارة
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

في الكود أعلاه لقد:

- بادرنا عميل MCP بعنوان خادم.
- كونفجنا طلبين بنفس المطالبة، مع بذرة ثابتة ودرجة حرارة صفر.
- أرسلنا كلا الطلبين وطباعنا النص المولد.
- برهنا أن الاستجابات متطابقة بفضل الطبيعة الحتمية لتكوين المعاينة (نفس البذرة ودرجة الحرارة).
- استخدمنا `seed` لتحديد بذرة عشوائية ثابتة، مما يضمن أن النموذج يولد نفس المخرج لنفس الإدخال كل مرة.
- ضبطنا `temperature` للصفر لضمان أقصى درجات الحتمية، مما يعني أن النموذج سيختار دائماً الرمز التالي الأكثر احتمالاً بدون عشوائية.
- استخدمنا بذرة مختلفة للطلب الثالث لنظهر أن تغيير البذرة يؤدي إلى مخرجات مختلفة، حتى مع نفس المطالبة ودرجة الحرارة.

---

## تكوين المعاينة الديناميكي

تتكيف المعاينة الذكية مع المعلمات بناءً على السياق ومتطلبات كل طلب. هذا يعني تعديل المعلمات مثل درجة الحرارة، و `top_p`، والعقوبات بشكل ديناميكي بناءً على نوع المهمة، وتفضيلات المستخدم، أو الأداء التاريخي.

لننظر كيف يمكن تنفيذ المعاينة الديناميكية في لغات برمجة مختلفة.

# [Python](#tab/python)

```python
# مثال بايثون: أخذ عينات ديناميكي بناءً على سياق الطلب
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # تحديد إعدادات أخذ العينات لأنواع المهام المختلفة
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # اختيار الإعداد الأساسي
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # التعديل بناءً على تفضيلات المستخدم إذا تم توفيرها
        if user_preferences:
            if "creativity_level" in user_preferences:
                # ضبط حرارة النطاق بناءً على تفضيل الإبداع (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # تعديل Top_p بناءً على تنوع الرد المطلوب
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # إنشاء وإرسال طلب مع معلمات أخذ العينات المخصصة
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # إرجاع الرد مع بيانات وصفية لأخذ العينات من أجل الشفافية
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

في الكود أعلاه لقد:

- أنشأنا فئة `DynamicSamplingService` تدير المعاينة التكيفية.
- عرفنا إعدادات معاينة مسبقة لأنواع مهام مختلفة (إبداعية، واقعية، برمجية، تحليلية).
- اخترنا إعداد معاينة أساسي بناءً على نوع المهمة.
- عدلنا معلمات المعاينة بناءً على تفضيلات المستخدم، مثل مستوى الإبداع والتنوع.
- أرسلنا الطلب مع معلمات المعاينة المكونة ديناميكياً.
- أعدنا النص المولد مع معلمات المعاينة المعتمدة ونوع المهمة للشفافية.
- استخدمنا `temperature` للتحكم في عشوائية الناتج، حيث القيم الأعلى تؤدي إلى استجابات أكثر إبداعاً.
- استخدمنا `top_p` للحد من اختيار الرموز إلى تلك التي تسهم في أعلى كتلة احتمال تراكمي، مما يعزز جودة النص المولد.
- استخدمنا `frequency_penalty` لتقليل التكرار وتشجيع التنوع في الناتج.
- استخدمنا `user_preferences` للسماح بتخصيص معلمات المعاينة بناءً على مستويات الإبداع والتنوع المعرفة من قبل المستخدم.
- استخدمنا `task_type` لتحديد استراتيجية المعاينة المناسبة للطلب، مما يسمح باستجابات أكثر تفصيلاً حسب طبيعة المهمة.
- استخدمنا طريقة `send_request` لإرسال المطالبة مع معلمات المعاينة المكونة، لضمان أن النموذج يولد نصاً وفقاً للمتطلبات المحددة.
- استخدمنا `generated_text` لاسترداد استجابة النموذج، والتي تُعاد مع معلمات المعاينة ونوع المهمة لمزيد من التحليل أو العرض.
- استخدمنا دالتي `min` و `max` لضمان أن تفضيلات المستخدم تقع ضمن النطاقات الصالحة، لمنع تكوين معاينة غير صالح.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// مثال جافا سكريبت: تكوين أخذ عينات ديناميكي بناءً على سياق المستخدم
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // تعريف ملفات تعريف أخذ العينات الأساسية
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // تتبع الأداء التاريخي
    this.performanceHistory = [];
  }
  
  // الكشف عن نوع المهمة من الموجه
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // كشف استدلالي بسيط - يمكن تحسينه باستخدام تصنيف التعلم الآلي
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
    
    // الاعتماد على المحادثة افتراضياً إذا لم يتم الكشف عن نوع واضح
    return 'conversational';
  }
  
  // حساب معلمات أخذ العينات بناءً على السياق وتفضيلات المستخدم
  getSamplingParameters(prompt, context = {}) {
    // كشف نوع المهمة
    const taskType = this.detectTaskType(prompt, context);
    
    // الحصول على الملف الأساسي
    let params = {...this.samplingProfiles[taskType]};
    
    // التعديل بناءً على تفضيلات المستخدم
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // تحويل المقياس من 1-10 إلى نطاق درجة الحرارة المناسب
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // الدقة الأعلى تعني قيمة topP أقل (اختيار أكثر تركيزاً)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // التناسق الأعلى يعني عقوبات أقل
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // تطبيق التعديلات المتعلمة من تاريخ الأداء
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // منطق تكيفي بسيط - يمكن تحسينه بخوارزميات أكثر تطوراً
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // النظر فقط في التاريخ الحديث
    
    if (relevantHistory.length > 0) {
      // حساب متوسط درجات الأداء
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // إذا كان الأداء أقل من الحد، قم بتعديل المعلمات
      if (avgScore < 0.7) {
        // تعديل طفيف نحو القيم الأكثر أماناً
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // تسجيل الأداء للتعديلات المستقبلية
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // تقييم جودة الاستجابة من 0 إلى 1
    });
    
    // تحديد حجم التاريخ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // الحصول على معلمات أخذ العينات المحسنة
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // إرسال الطلب بالمعلمات المحسنة
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // إذا قدم المستخدم ملاحظات، قم بتسجيلها للتحسين المستقبلي
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

// مثال على الاستخدام
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // مهمة إبداعية مع تفضيلات مستخدم مخصصة
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // إبداع عالي (من 1 إلى 10)
          consistency: 3  // تناسق منخفض (من 1 إلى 10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // مهمة توليد كود
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // إبداع منخفض
          precision: 8,   // دقة عالية
          consistency: 9  // تناسق عالي
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

في الكود أعلاه لقد:

- أنشأنا فئة `AdaptiveSamplingManager` تدير المعاينة الديناميكية بناءً على نوع المهمة وتفضيلات المستخدم.
- عرفنا ملفات تعريف المعاينة لأنواع مهام مختلفة (إبداعية، واقعية، برمجية، محادثة).
- نفذنا طريقة لاكتشاف نوع المهمة من المطالبة باستخدام قواعد بسيطة.
- حسبنا معلمات المعاينة بناءً على نوع المهمة المكتشفة وتفضيلات المستخدم.
- طبقنا تعديلات متعلمة بناءً على الأداء التاريخي لتحسين معلمات المعاينة.
- سجلنا الأداء للتعديلات المستقبلية، مما يسمح للنظام بالتعلم من التفاعلات السابقة.
- أرسلنا طلبات مع معلمات معاينة مكونة ديناميكياً وأعدنا النص المولد مع المعلمات المطبقة ونوع المهمة المكتشفة.
- استخدمنا:
    - `userPreferences` للسماح بتخصيص معلمات المعاينة وفق مستويات الإبداع والدقة والاتساق المعرفة من قبل المستخدم.
    - `detectTaskType` لتحديد طبيعة المهمة بناءً على المطالبة، مما يسمح باستجابات أكثر تفصيلاً.
    - `recordPerformance` لتسجيل أداء الاستجابات المولدة، مما يمكّن النظام من التكيف والتحسن بمرور الوقت.
    - `applyLearnedAdjustments` لتعديل معلمات المعاينة بناءً على الأداء التاريخي، مما يعزز قدرة النموذج على توليد استجابات عالية الجودة.
    - `generateResponse` لتغليف كل عملية توليد الاستجابة مع المعاينة التكيفية، مما يسهل الاستدعاء مع مطاليب وسياقات مختلفة.
    - `allowedTools` لتحديد الأدوات التي يمكن للنموذج استخدامها أثناء التوليد، مما يتيح استجابات أكثر وعياً بالسياق.
    - `feedbackScore` للسماح للمستخدمين بتقديم ملاحظات عن جودة الاستجابة المولدة، والتي يمكن استخدامها لتحسين أداء النموذج مع مرور الوقت.
    - `performanceHistory` للاحتفاظ بسجل التفاعلات السابقة، مما يمكن النظام من التعلم من النجاحات والإخفاقات الماضية.
    - `getSamplingParameters` لضبط معلمات المعاينة ديناميكياً بناءً على سياق الطلب، مما يسمح بسلوك نموذج أكثر مرونة واستجابة.
    - `detectTaskType` لتصنيف المهمة بناءً على المطالبة، مما يمكن النظام من تطبيق استراتيجيات معاينة مناسبة لأنواع الطلبات المختلفة.
    - `samplingProfiles` لتعريف تكوينات المعاينة الأساسية لأنواع مهام مختلفة، مما يتيح تعديلات سريعة بناءً على طبيعة الطلب.

---

## ما هو التالي

- [5.7 التوسيع](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->