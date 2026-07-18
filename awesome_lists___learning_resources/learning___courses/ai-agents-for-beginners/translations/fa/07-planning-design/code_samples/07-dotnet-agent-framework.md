# 🎯 برنامه‌ریزی و الگوهای طراحی با Azure OpenAI (API پاسخ‌ها) (.NET)

## 📋 اهداف یادگیری

این دفترچه الگوهای طراحی و برنامه‌ریزی سطح سازمانی را برای ساخت نماینده‌های هوشمند با استفاده از Microsoft Agent Framework در .NET با Azure OpenAI (API پاسخ‌ها) نشان می‌دهد. شما یاد می‌گیرید چگونه نمایندگانی بسازید که بتوانند مسائل پیچیده را تجزیه کنند، راهکارهای چندمرحله‌ای برنامه‌ریزی کنند و گردش‌کارهای پیچیده را با امکانات سازمانی .NET اجرا کنند.

## ⚙️ پیش‌نیازها و راه‌اندازی

**محیط توسعه:**
- SDK نسخه 9.0 یا بالاتر .NET
- Visual Studio 2022 یا VS Code با افزونه C#
- یک اشتراک Azure با منبع Azure OpenAI و پیاده‌سازی مدل
- ابزار خط فرمان Azure — وارد شوید با `az login`

**وابستگی‌های مورد نیاز:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**پیکربندی محیط (.env فایل):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## اجرای کد

این درس شامل پیاده‌سازی برنامه تک فایلی .NET است. برای اجرای آن:

```bash
# فایل را اجرایی کنید (لینوکس/مک‌اواس)
chmod +x 07-dotnet-agent-framework.cs

# برنامه را اجرا کنید
./07-dotnet-agent-framework.cs
```

یا از دستور dotnet run استفاده کنید:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## پیاده‌سازی کد

پیاده‌سازی کامل در `07-dotnet-agent-framework.cs` موجود است که نشان می‌دهد:

- بارگذاری پیکربندی محیط با DotNetEnv
- پیکربندی کلاینت Azure OpenAI و ایجاد نماینده هوش مصنوعی با `GetChatClient().AsAIAgent()`
- تعریف مدل‌های داده ساختاری (Plan و TravelPlan) با سریال‌سازی JSON
- ساخت نماینده هوش مصنوعی با خروجی ساختاریافته با استفاده از طرح JSON
- اجرای درخواست‌های برنامه‌ریزی با پاسخ‌های نوع ایمن

## مفاهیم کلیدی

### برنامه‌ریزی ساختاریافته با مدل‌های نوع ایمن

نماینده از کلاس‌های C# برای تعریف ساختار خروجی برنامه‌ریزی استفاده می‌کند:

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### طرح JSON برای خروجی‌های ساختاریافته

نماینده به گونه‌ای پیکربندی شده است که پاسخ‌هایی مطابق با طرح TravelPlan بازگرداند:

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### دستورالعمل‌های نماینده برنامه‌ریزی

نماینده به عنوان هماهنگ‌کننده عمل می‌کند و وظایف را به زیرنماینده‌های تخصصی واگذار می‌کند:

- FlightBooking: برای رزرو پروازها و ارائه اطلاعات پرواز
- HotelBooking: برای رزرو هتل‌ها و ارائه اطلاعات هتل
- CarRental: برای رزرو خودرو و ارائه اطلاعات کرایه خودرو
- ActivitiesBooking: برای رزرو فعالیت‌ها و ارائه اطلاعات فعالیت‌ها
- DestinationInfo: برای ارائه اطلاعات درباره مقاصد
- DefaultAgent: برای مدیریت درخواست‌های عمومی

## خروجی مورد انتظار

هنگامی که نماینده را با درخواست برنامه‌ریزی سفر اجرا می‌کنید، درخواست را تحلیل کرده و برنامه‌ای ساختاریافته با واگذاری مناسب وظایف به نماینده‌های تخصصی تولید می‌کند که به صورت JSON مطابق با طرح TravelPlan فرم‌دهی شده است.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->