# 🎨 الگوهای طراحی عامل با Azure OpenAI (Responses API) (.NET)

## 📋 اهداف یادگیری

این مثال الگوهای طراحی درجه سازمانی را برای ساخت عوامل هوشمند با استفاده از چارچوب Microsoft Agent در .NET با ادغام Azure OpenAI (Responses API) نشان می‌دهد. شما الگوهای حرفه‌ای و رویکردهای معماری را می‌آموزید که عوامل را آماده تولید، قابل نگهداری و مقیاس‌پذیر می‌کند.

### الگوهای طراحی سازمانی

- 🏭 **الگوی کارخانه**: ایجاد عامل استاندارد شده با تزریق وابستگی
- 🔧 **الگوی سازنده**: پیکربندی و راه‌اندازی پیوسته عامل
- 🧵 **الگوهای ایمن در برابر نخ‌ها**: مدیریت همزمان مکالمات
- 📋 **الگوی مخزن**: مدیریت سازمان‌یافته ابزارها و قابلیت‌ها

## 🎯 مزایای معماری خاص .NET

### ویژگی‌های سازمانی

- **تایپینگ قوی**: اعتبارسنجی زمان کامپایل و پشتیبانی IntelliSense
- **تزریق وابستگی**: ادغام ظرف DI داخلی
- **مدیریت پیکربندی**: الگوهای IConfiguration و Options
- **Async/Await**: پشتیبانی کامل از برنامه‌نویسی ناهمگام

### الگوهای آماده تولید

- **ادغام لاگ‌گیری**: پشتیبانی ILogger و لاگ‌گیری ساختاریافته
- **بررسی سلامت**: نظارت و عیب‌یابی داخلی
- **اعتبارسنجی پیکربندی**: تایپینگ قوی با حاشیه‌نویسی داده
- **مدیریت خطا**: مدیریت ساختاریافته استثناها

## 🔧 معماری فنی

### اجزای اصلی .NET

- **Microsoft.Extensions.AI**: انتزاع‌های یکپارچه خدمات هوش مصنوعی
- **Microsoft.Agents.AI**: چارچوب سازمانی ارکستراسیون عامل‌ها
- **Azure OpenAI (Responses API)**: الگوهای کلاینت API با عملکرد بالا
- **سیستم پیکربندی**: appsettings.json و ادغام محیط

### پیاده‌سازی الگوی طراحی

```mermaid
graph LR
    A[مجموعه خدمات] --> B[سازنده عامل]
    B --> C[پیکربندی]
    C --> D[ثبت ابزار]
    D --> E[عامل هوش مصنوعی]
```

## 🏗️ الگوهای سازمانی نشان داده شده

### 1. **الگوهای خلقتی**

- **کارخانه عامل**: ایجاد متمرکز عامل با پیکربندی یکنواخت
- **الگوی سازنده**: API پیوسته برای پیکربندی پیچیده عامل
- **الگوی تک‌نمونه**: مدیریت منابع و پیکربندی مشترک
- **تزریق وابستگی**: اتصال سست و قابلیت تست

### 2. **الگوهای رفتاری**

- **الگوی استراتژی**: استراتژی‌های اجرای ابزار قابل تعویض
- **الگوی فرمان**: عملیات عامل کپسوله شده با قابلیت بازگشت/انجام دوباره
- **الگوی ناظر**: مدیریت چرخه عمر عامل مبتنی بر رویداد
- **روش قالب**: جریان‌های کاری اجرای استاندارد عامل

### 3. **الگوهای ساختاری**

- **الگوی سازگار**: لایه ادغام Azure OpenAI (Responses API)
- **الگوی دکوراتور**: افزایش قابلیت‌های عامل
- **الگوی نما**: رابط‌های تعاملی ساده‌شده عامل
- **الگوی پراکسی**: بارگذاری تنبل و کشینگ برای عملکرد بهتر

## 📚 اصول طراحی .NET

### اصول SOLID

- **مسئولیت واحد**: هر جزء یک هدف واضح دارد
- **باز/بسته**: قابل گسترش بدون تغییر
- **جایگزینی لیسکوف**: پیاده‌سازی‌های ابزار مبتنی بر رابط
- **تفکیک رابط**: رابط‌های متمرکز و هم‌بسته
- **وارونگی وابستگی**: وابستگی به انتزاعات، نه به جزئیات

### معماری پاک

- **لایه دامنه**: انتزاعات اصلی عامل و ابزار
- **لایه برنامه**: ارکستراسیون عامل و جریان‌های کاری
- **لایه زیرساخت**: ادغام Azure OpenAI (Responses API) و خدمات خارجی
- **لایه ارائه**: تعامل کاربر و قالب‌بندی پاسخ‌ها

## 🔒 ملاحظات سازمانی

### امنیت

- **مدیریت اعتبارنامه**: مدیریت امن کلید API با IConfiguration
- **اعتبارسنجی ورودی**: تایپینگ قوی و اعتبارسنجی حاشیه‌نویسی داده
- **پاکسازی خروجی**: پردازش و فیلتر امن پاسخ‌ها
- **لاگ‌گیری حسابرسی**: ردیابی جامع عملیات

### عملکرد

- **الگوهای ناهمگام**: عملیات ورودی/خروجی غیرمسدودکننده
- **جمع‌آوری اتصال**: مدیریت موثر کلاینت HTTP
- **کشینگ**: کشینگ پاسخ‌ها برای بهبود عملکرد
- **مدیریت منابع**: الگوهای دفع و پاکسازی مناسب

### مقیاس‌پذیری

- **ایمنی نخ**: پشتیبانی اجرای همزمان عامل
- **جمع‌آوری منابع**: استفاده بهینه از منابع
- **مدیریت بار**: محدودیت نرخ و مدیریت فشار پس‌زنی
- **نظارت**: معیارهای عملکرد و بررسی سلامت

## 🚀 استقرار در تولید

- **مدیریت پیکربندی**: تنظیمات مخصوص محیط
- **استراتژی لاگ‌گیری**: لاگ‌گیری ساختاریافته با شناسه‌های همبستگی
- **مدیریت خطا**: مدیریت استثنای کلی با بازیابی مناسب
- **نظارت**: بینش برنامه و شمارنده‌های عملکرد
- **آزمایش**: تست واحد، تست یکپارچه، و الگوهای تست بار

آماده‌اید تا عوامل هوشمند درجه سازمانی با .NET بسازید؟ بیایید یک چیز مستحکم معماری کنیم! 🏢✨

## 🚀 شروع به کار

### پیش‌نیازها

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) یا بالاتر
- یک [اشتراک Azure](https://azure.microsoft.com/free/) با یک منبع Azure OpenAI و استقرار مدل
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — ورود با `az login`

### متغیرهای محیطی مورد نیاز

```bash
# زد-اس-اچ/بش
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# سپس وارد شوید تا AzureCliCredential بتواند یک توکن دریافت کند
az login
```

```powershell
# پاورشل
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# سپس وارد شوید تا AzureCliCredential بتواند توکن دریافت کند
az login
```

### کد نمونه

برای اجرای نمونه کد،

```bash
# زِش / بش
chmod +x ./03-dotnet-agent-framework.cs
./03-dotnet-agent-framework.cs
```

یا با استفاده از dotnet CLI:

```bash
dotnet run ./03-dotnet-agent-framework.cs
```

کد کامل را در [`03-dotnet-agent-framework.cs`](../../../../03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.cs) مشاهده کنید.

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

// Create New Conversation Session for Context Management
// Initialize a new conversation session to maintain context across multiple interactions
// Sessions enable the agent to remember previous exchanges and maintain conversational state
// This is essential for multi-turn conversations and contextual understanding
var session = await agent.CreateSessionAsync();

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

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->