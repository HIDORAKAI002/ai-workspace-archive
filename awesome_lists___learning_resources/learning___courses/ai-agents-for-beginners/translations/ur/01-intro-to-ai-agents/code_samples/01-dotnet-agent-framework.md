# 🌍 مائیکروسافٹ ایجنٹ فریم ورک (.NET) کے ساتھ AI سفری ایجنٹ

## 📋 منظرنامہ کا جائزہ

یہ مثال دکھاتی ہے کہ .NET کے لیے مائیکروسافٹ ایجنٹ فریم ورک استعمال کرتے ہوئے ایک ذہین سفری منصوبہ بندی کرنے والا ایجنٹ کیسے بنایا جائے۔ یہ ایجنٹ دنیا بھر کے تصادفی مقامات کے لیے خودکار طور پر ذاتی نوعیت کی روزانہ سفر کی منصوبہ بندی تیار کر سکتا ہے۔

### کلیدی صلاحیتیں:

- 🎲 **تصادفی منزل کا انتخاب**: تعطیلات کے مقامات منتخب کرنے کے لیے ایک حسب ضرورت ٹول استعمال کرتا ہے
- 🗺️ **ذہین سفر کی منصوبہ بندی**: روزانہ کی تفصیلی منصوبہ بندی بناتا ہے
- 🔄 **ریئل ٹائم اسٹریمنگ**: فوری اور اسٹریمنگ ردعمل دونوں کی حمایت کرتا ہے
- 🛠️ **حسب ضرورت ٹول انٹیگریشن**: ایجنٹ کی صلاحیتوں کو بڑھانے کا طریقہ دکھاتا ہے

## 🔧 تکنیکی فن تعمیر

### بنیادی ٹیکنالوجیز

- **مائیکروسافٹ ایجنٹ فریم ورک**: AI ایجنٹ کی ترقی کے لیے جدید ترین .NET نفاذ
- **Azure OpenAI (Responses API)**: ماڈل انفرنس کے لیے Azure OpenAI Responses API استعمال کرتا ہے
- **Azure Identity**: `AzureCliCredential` (`az login`) کے ذریعے محفوظ سائن ان
- **محفوظ ترتیب**: ماحول پر مبنی اینڈ پوائنٹ مینجمنٹ

### کلیدی اجزاء

1. **AIAgent**: مرکزی ایجنٹ جو گفتگو کے بہاؤ کو سنبھالتا ہے
2. **حسب ضرورت ٹولز**: ایجنٹ کے لیے دستیاب `GetRandomDestination()` فنکشن
3. **Responses Client**: Azure OpenAI Responses پر مبنی گفتگو کا انٹرفیس
4. **اسٹریمنگ سپورٹ**: ریئل ٹائم ردعمل پیدا کرنے کی صلاحیتیں

### انٹیگریشن پیٹرن

```mermaid
graph LR
    A[صارف کی درخواست] --> B[AI ایجنٹ]
    B --> C[Azure OpenAI (جوابات API)]
    B --> D[GetRandomDestination ٹول]
    C --> E[سفر کا روٹ]
    D --> E
```

## 🚀 آغاز کریں

### پری ریکویزٹس

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) یا اس سے زیادہ ورژن
- ایک [Azure سبسکرپشن](https://azure.microsoft.com/free/) جس میں Azure OpenAI وسائل اور ماڈل تعیناتی ہو
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` کے ساتھ سائن ان کریں

### مطلوبہ ماحول کے متغیرات

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# پھر سائن ان کریں تاکہ AzureCliCredential ٹوکن حاصل کر سکے
az login
```

```powershell
# پاور شیل
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# پھر سائن ان کریں تاکہ AzureCliCredential ٹوکن حاصل کر سکے
az login
```

### نمونہ کوڈ

کوڈ مثال چلانے کے لیے،

```bash
# زی شيل/باش
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

یا dotnet CLI استعمال کرتے ہوئے:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

مکمل کوڈ کے لیے [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) دیکھیں۔

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.4.1
#:package Microsoft.Agents.AI.OpenAI@1.1.0
#:package Azure.AI.OpenAI@2.1.0
#:package Azure.Identity@1.13.1

using System.ComponentModel;

using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

using Azure.AI.OpenAI;
using Azure.Identity;

// Tool Function: Random Destination Generator
// This static method will be available to the agent as a callable tool
// The [Description] attribute helps the AI understand when to use this function
// This demonstrates how to create custom tools for AI agents
[Description("Provides a random vacation destination.")]
static string GetRandomDestination()
{
    // List of popular vacation destinations around the world
    // The agent will randomly select from these options
    var destinations = new List<string>
    {
        "Paris, France",
        "Tokyo, Japan",
        "New York City, USA",
        "Sydney, Australia",
        "Rome, Italy",
        "Barcelona, Spain",
        "Cape Town, South Africa",
        "Rio de Janeiro, Brazil",
        "Bangkok, Thailand",
        "Vancouver, Canada"
    };

    // Generate random index and return selected destination
    // Uses System.Random for simple random selection
    var random = new Random();
    int index = random.Next(destinations.Count);
    return destinations[index];
}

// Azure OpenAI with the Responses API (stable v1 endpoint). Sign in with `az login`.
var azureEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deployment = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT") ?? "gpt-4.1-mini";

var azureClient = new AzureOpenAIClient(new Uri(azureEndpoint), new AzureCliCredential());

// Create AI Agent with Travel Planning Capabilities
// Get the Responses client for the specified deployment and create the AI agent
// Configure agent with travel planning instructions and random destination tool
// The agent can now plan trips using the GetRandomDestination function
AIAgent agent = azureClient
    .GetChatClient(deployment)
    .AsAIAgent(
        instructions: "You are a helpful AI Agent that can help plan vacations for customers at random destinations",
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Execute Agent: Plan a Day Trip
// Run the agent with streaming enabled for real-time response display
// Shows the agent's thinking and response as it generates the content
// Provides better user experience with immediate feedback
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip"))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 اہم نکات

1. **ایجنٹ فن تعمیر**: مائیکروسافٹ ایجنٹ فریم ورک .NET میں AI ایجنٹس بنانے کے لیے ایک صاف، ٹائپ-سیف طریقہ فراہم کرتا ہے
2. **ٹول انٹیگریشن**: `[Description]` صفات والے فنکشنز ایجنٹ کے لیے دستیاب ٹولز بن جاتے ہیں
3. **کنفیگریشن مینجمنٹ**: ماحول کی متغیرات اور محفوظ اسناد کی ہینڈلنگ .NET کی بہترین مشقوں کی پیروی کرتی ہے
4. **Azure OpenAI Responses API**: ایجنٹ Azure.AI.OpenAI SDK کے ذریعے Azure OpenAI Responses API استعمال کرتا ہے

## 🔗 اضافی وسائل

- [مائیکروسافٹ ایجنٹ فریم ورک کی دستاویزات](https://learn.microsoft.com/agent-framework)
- [Microsoft Foundry میں Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET سنگل فائل ایپس](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->