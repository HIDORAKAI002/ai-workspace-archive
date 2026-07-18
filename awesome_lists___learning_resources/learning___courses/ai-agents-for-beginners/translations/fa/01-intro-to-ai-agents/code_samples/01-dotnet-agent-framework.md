# 🌍 عامل سفر هوش مصنوعی با چارچوب عامل مایکروسافت (.NET)

## 📋 نمای کلی سناریو

این مثال نشان می‌دهد چگونه می‌توان یک عامل برنامه‌ریزی سفر هوشمند با استفاده از چارچوب عامل مایکروسافت برای .NET ساخت. این عامل می‌تواند به‌طور خودکار برنامه‌های سفر روزانه شخصی‌سازی‌شده برای مقاصد تصادفی در سراسر جهان ایجاد کند.

### قابلیت‌های کلیدی:

- 🎲 **انتخاب تصادفی مقصد**: استفاده از ابزار سفارشی برای انتخاب مکان‌های تعطیلات
- 🗺️ **برنامه‌ریزی سفر هوشمند**: ایجاد برنامه‌های روزانه تفصیلی
- 🔄 **پخش زنده در زمان واقعی**: پشتیبانی از پاسخ‌های فوری و پخش زنده
- 🛠️ **ادغام ابزار سفارشی**: نشان دادن نحوه گسترش قابلیت‌های عامل

## 🔧 معماری فنی

### فناوری‌های اصلی

- **چارچوب عامل مایکروسافت**: آخرین پیاده‌سازی .NET برای توسعه عامل‌های هوش مصنوعی
- **Azure OpenAI (API پاسخ‌ها)**: استفاده از API پاسخ‌های Azure OpenAI برای استنتاج مدل
- **Azure Identity**: ورود امن با استفاده از `AzureCliCredential` (`az login`)
- **پیکربندی امن**: مدیریت نقطه پایانی مبتنی بر محیط

### اجزای کلیدی

1. **AIAgent**: هماهنگ‌کننده اصلی عامل که جریان مکالمه را مدیریت می‌کند
2. **ابزارهای سفارشی**: تابع `GetRandomDestination()` در دسترس عامل قرار دارد
3. **کلاینت پاسخ‌ها**: واسط مکالمه مبتنی بر پاسخ‌های Azure OpenAI
4. **پشتیبانی پخش زنده**: قابلیت تولید پاسخ در زمان واقعی

### الگوی یکپارچه‌سازی

```mermaid
graph LR
    A[درخواست کاربر] --> B[عامل هوش مصنوعی]
    B --> C[آزور OpenAI (رابط برنامه‌نویسی پاسخ‌ها)]
    B --> D[ابزار مقصد تصادفی]
    C --> E[برنامه سفر]
    D --> E
```

## 🚀 شروع کار

### پیش‌نیازها

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) یا بالاتر
- یک [اشتراک Azure](https://azure.microsoft.com/free/) با منبع Azure OpenAI و استقرار مدل
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — ورود با `az login`

### متغیرهای محیطی مورد نیاز

```bash
# زدش/باش
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# سپس وارد شوید تا AzureCliCredential بتواند توکن دریافت کند
az login
```

```powershell
# پاورشل
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# سپس وارد شوید تا AzureCliCredential بتواند توکن دریافت کند
az login
```

### نمونه کد

برای اجرای نمونه کد،

```bash
# زد شل/بش
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

یا با استفاده از dotnet CLI:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

کد کامل را در [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) ببینید.

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

## 🎓 نکات کلیدی

1. **معماری عامل**: چارچوب عامل مایکروسافت رویکردی تمیز و ایمن از نظر نوع برای ساخت عامل‌های هوش مصنوعی در .NET فراهم می‌کند
2. **ادغام ابزارها**: توابعی که با صفت `[Description]` تزئین شده‌اند به عنوان ابزارهای در دسترس برای عامل تبدیل می‌شوند
3. **مدیریت پیکربندی**: متغیرهای محیطی و مدیریت اعتبارنامه امن طبق بهترین شیوه‌های .NET انجام می‌شود
4. **API پاسخ‌های Azure OpenAI**: عامل از API پاسخ‌های Azure OpenAI از طریق SDK Azure.AI.OpenAI استفاده می‌کند

## 🔗 منابع اضافی

- [مستندات چارچوب عامل مایکروسافت](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI در Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [اپلیکیشن‌های تک‌فایل .NET](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->