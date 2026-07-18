# 🔍 مائیکروسافٹ ایجنٹ فریم ورک کی تلاش - بنیادی ایجنٹ (.NET)

## 📋 سیکھنے کے مقاصد

یہ مثال مائیکروسافٹ ایجنٹ فریم ورک کے بنیادی تصورات کو .NET میں ایک بنیادی ایجنٹ کی تنفیذ کے ذریعے دریافت کرتی ہے۔ آپ ایجنٹیک پیٹرنز سیکھیں گے اور سمجھیں گے کہ ذہین ایجنٹس C# اور .NET ماحولیاتی نظام کا استعمال کرتے ہوئے کس طرح کام کرتے ہیں۔

### آپ کیا دریافت کریں گے

- 🏗️ **ایجنٹ آرکیٹیکچر**: .NET میں AI ایجنٹس کی بنیادی ساخت کو سمجھنا
- 🛠️ **ٹول انضمام**: ایجنٹس کس طرح بیرونی فنکشنز کا استعمال کرتے ہوئے صلاحیتوں کو بڑھاتے ہیں  
- 💬 **بات چیت کا بہاؤ**: ملٹی ٹرن گفت و شنید اور تھریڈ مینجمنٹ کے ساتھ سیاق و سباق کا انتظام
- 🔧 **کنفیگریشن پیٹرنز**: .NET میں ایجنٹ کی ترتیب اور انتظام کے بہترین طریقے

## 🎯 کلیدی تصورات

### ایجنٹیک فریم ورک کے اصول

- **خودمختاری**: ایجنٹس .NET AI تجریدات کا استعمال کرتے ہوئے آزادانہ فیصلے کیسے کرتے ہیں
- **ردعمل**: ماحولیاتی تبدیلیوں اور صارف کے ان پٹ پر ردعمل دینا
- **پیش قدمی**: اہداف اور سیاق و سباق کی بنیاد پر پہل کرنا
- **سماجی صلاحیت**: گفت و شنید کے دھاگوں کے ذریعے قدرتی زبان میں بات چیت کرنا

### تکنیکی اجزاء

- **AIAgent**: مرکزی ایجنٹ آرکیسٹریشن اور گفت و شنید کا انتظام (.NET)
- **ٹول فنکشنز**: C# میتھڈز اور اطراف کے ساتھ ایجنٹ صلاحیتوں کو بڑھانا
- **Azure OpenAI انضمام**: Azure OpenAI Responses API کے ذریعے زبان کے ماڈلز کا فائدہ اٹھانا
- **محفوظ کنفیگریشن**: ماحولیاتی بنیاد پر اینڈ پوائنٹ مینجمنٹ

## 🔧 تکنیکی اسٹیک

### مرکزی ٹیکنالوجیز

- Microsoft Agent Framework (.NET)
- Azure OpenAI (Responses API) انضمام
- Azure.AI.OpenAI کلائنٹ پیٹرنز
- DotNetEnv کے ساتھ ماحولیاتی بنیاد پر کنفیگریشن

### ایجنٹ کی صلاحیتیں

- قدرتی زبان کی تفہیم اور تخلیق
- C# اطراف کے ساتھ فنکشن کالنگ اور ٹول کا استعمال
- گفتگو کے اجلاسوں کے ساتھ سیاق و سباق سے آگاہ جوابات
- انحصار انجیکشن پیٹرنز کے ساتھ قابل توسیع آرکیٹیکچر

## 📚 فریم ورک موازنہ

یہ مثال مائیکروسافٹ ایجنٹ فریم ورک کے نقطہ نظر کو دیگر ایجنٹیک فریم ورکس سے موازنہ کرتی ہے:

| فیچر | مائیکروسافٹ ایجنٹ فریم ورک | دیگر فریم ورکس |
|---------|-------------------------|------------------|
| **انضمام** | مقامی مائیکروسافٹ ماحولیاتی نظام | مختلف مطابقت |
| **سادگی** | صاف، آسان API | اکثر پیچیدہ سیٹ اپ |
| **توسیع پذیری** | آسان ٹول انضمام | فریم ورک پر منحصر |
| **انٹرپرائز ریڈی** | پیداوار کے لئے بنایا گیا | فریم ورک کے لحاظ سے مختلف |

## 🚀 شروع کرنا

### پیشگی ضروریات

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) یا اس سے جدید
- ایک [Azure سبسکرپشن](https://azure.microsoft.com/free/) جس میں Azure OpenAI وسیلہ اور ماڈل تعیناتی ہو
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` کے ساتھ سائن ان کریں

### ضروری ماحولیاتی متغیرات

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
# پھر سائن ان کریں تاکہ AzureCliCredential ایک ٹوکن حاصل کر سکے
az login
```

### نمونہ کوڈ

کوڈ مثال چلانے کے لیے،

```bash
# زی شیل/باش
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

یا dotnet CLI استعمال کرتے ہوئے:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

مکمل کوڈ کے لیے [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) دیکھیں۔

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.*
#:package Microsoft.Agents.AI.OpenAI@1.*-*
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

// Define Agent Identity and Comprehensive Instructions
// Agent name for identification and logging purposes
var AGENT_NAME = "TravelAgent";

// Detailed instructions that define the agent's personality, capabilities, and behavior
// This system prompt shapes how the agent responds and interacts with users
var AGENT_INSTRUCTIONS = """
You are a helpful AI Agent that can help plan vacations for customers.

Important: When users specify a destination, always plan for that location. Only suggest random destinations when the user hasn't specified a preference.

When the conversation begins, introduce yourself with this message:
"Hello! I'm your TravelAgent assistant. I can help plan vacations and suggest interesting destinations for you. Here are some things you can ask me:
1. Plan a day trip to a specific location
2. Suggest a random vacation destination
3. Find destinations with specific features (beaches, mountains, historical sites, etc.)
4. Plan an alternative trip if you don't like my first suggestion

What kind of trip would you like me to help you plan today?"

Always prioritize user preferences. If they mention a specific destination like "Bali" or "Paris," focus your planning on that location rather than suggesting alternatives.
""";

// Create AI Agent with Advanced Travel Planning Capabilities
// Get the Responses client for the deployment and create the AI agent
// Configure agent with name, detailed instructions, and available tools
// This demonstrates the .NET agent creation pattern with full configuration
AIAgent agent = azureClient
    .GetChatClient(deployment)
    .AsAIAgent(
        name: AGENT_NAME,
        instructions: AGENT_INSTRUCTIONS,
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Create New Session for Context Management.
// Initialize a new conversation session to maintain context across multiple interactions
// Sessions enable the agent to remember previous exchanges and maintain conversational state
// This is essential for multi-turn conversations and contextual understanding
AgentSession session = await agent.CreateSessionAsync();

// Execute Agent: First Travel Planning Request
// Run the agent with an initial request that will likely trigger the random destination tool
// The agent will analyze the request, use the GetRandomDestination tool, and create an itinerary
// Using the session parameter maintains conversation context for subsequent interactions
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip", session))
{
    await Task.Delay(10);
    Console.Write(update);
}

Console.WriteLine();

// Execute Agent: Follow-up Request with Context Awareness
// Demonstrate contextual conversation by referencing the previous response
// The agent remembers the previous destination suggestion and will provide an alternative
// This showcases the power of conversation sessions and contextual understanding in .NET agents
await foreach (var update in agent.RunStreamingAsync("I don't like that destination. Plan me another vacation.", session))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 اہم نکات

1. **ایجنٹ آرکیٹیکچر**: مائیکروسافٹ ایجنٹ فریم ورک .NET میں AI ایجنٹس بنانے کے لیے ایک صاف، ٹائپ سیف طریقہ فراہم کرتا ہے
2. **ٹول انضمام**: `[Description]` اطراف کے ساتھ سجاے گئے فنکشنز ایجنٹ کے لئے دستیاب ٹولز بن جاتے ہیں
3. **گفت و شنید کا سیاق و سباق**: سیشن مینجمنٹ سے مکمل سیاق و سباق کے ساتھ ملٹی ٹرن گفتگو ممکن ہوتی ہے
4. **کنفیگریشن مینجمنٹ**: ماحولیاتی متغیرات اور محفوظ اسناد کی ہینڈلنگ .NET کے بہترین طریقوں کی پیروی کرتی ہے
5. **Azure OpenAI Responses API**: ایجنٹ Azure.AI.OpenAI SDK کے ذریعے Azure OpenAI Responses API کا استعمال کرتا ہے

## 🔗 اضافی وسائل

- [Microsoft Agent Framework دستاویزات](https://learn.microsoft.com/agent-framework)
- [Microsoft Foundry میں Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET سنگل فائل ایپس](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->