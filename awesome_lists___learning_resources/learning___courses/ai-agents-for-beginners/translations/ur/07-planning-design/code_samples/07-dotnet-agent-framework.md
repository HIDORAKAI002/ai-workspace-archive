# 🎯 ایزور اوپن اے آئی (Responses API) کے ساتھ منصوبہ بندی اور ڈیزائن پیٹرنز (.NET)

## 📋 سیکھنے کے مقاصد

یہ نوٹ بک مائیکروسافٹ ایجنٹ فریم ورک کے ذریعے .NET میں Azure OpenAI (Responses API) استعمال کرتے ہوئے ذہین ایجنٹس بنانے کے لیے انٹرپرائز گریڈ منصوبہ بندی اور ڈیزائن پیٹرنز دکھاتی ہے۔ آپ ایسے ایجنٹس بنانے سیکھیں گے جو پیچیدہ مسائل کو توڑ سکیں، کثیر النوع حل کی منصوبہ بندی کر سکیں، اور .NET کی کاروباری خصوصیات کے ساتھ پیچیدہ ورک فلو انجام دے سکیں۔

## ⚙️ ضروریات اور ترتیب

**ترقیاتی ماحول:**
- .NET 9.0 SDK یا اس سے اعلیٰ
- Visual Studio 2022 یا VS Code میں C# ایکسٹینشن کے ساتھ
- Azure سبسکرپشن جس کے پاس Azure OpenAI ریسورس اور ماڈل ڈپلائمنٹ ہو
- Azure CLI — `az login` کے ذریعے سائن ان کریں

**ضروری انحصار:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**ماحول کی ترتیب (.env فائل):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## کوڈ چلانا

یہ سبق .NET سنگل فائل ایپ کی عمل درآمد شامل کرتا ہے۔ اسے چلانے کے لیے:

```bash
# فائل کو قابل اجرا بنائیں (لینکس/میك او ایس)
chmod +x 07-dotnet-agent-framework.cs

# ایپلیکیشن چلائیں
./07-dotnet-agent-framework.cs
```

یا dotnet run کمانڈ استعمال کریں:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## کوڈ کی عمل درآمد

مکمل عمل درآمد `07-dotnet-agent-framework.cs` میں دستیاب ہے، جو درج ذیل دکھاتا ہے:

- DotNetEnv کے ساتھ ماحول کی ترتیب لوڈ کرنا
- Azure OpenAI کلائنٹ کو ترتیب دینا اور `GetChatClient().AsAIAgent()` کے ذریعے AI ایجنٹ بنانا
- ساختہ ڈیٹا ماڈلز (Plan اور TravelPlan) کی تعریف JSON سیریلائزیشن کے ساتھ
- JSON اسکیمہ کے ذریعے ساختہ آؤٹ پٹ کے ساتھ AI ایجنٹ بنانا
- قسم محفوظ جوابات کے ساتھ منصوبہ بندی کی درخواستیں انجام دینا

## اہم تصورات

### قسم محفوظ ماڈلز کے ساتھ ساختہ منصوبہ بندی

ایجنٹ منصوبہ بندی کے آؤٹ پٹ کی ساخت C# کلاسز کے ذریعے بیان کرتا ہے:

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

### ساختہ آؤٹ پٹس کے لیے JSON اسکیمہ

ایجنٹ کو ایسی جوابات واپس کرنے کے لیے ترتیب دیا گیا ہے جو TravelPlan اسکیمہ سے میل کھاتے ہیں:

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

### منصوبہ بندی کے ایجنٹ کی ہدایات

ایجنٹ ایک رابطہ کار کے طور پر کام کرتا ہے، خصوصی ذیلی ایجنٹس کو کام تفویض کرتا ہے:

- FlightBooking: پروازیں بک کرنے اور پرواز کی معلومات فراہم کرنے کے لیے
- HotelBooking: ہوٹلز بک کرنے اور ہوٹل کی معلومات فراہم کرنے کے لیے
- CarRental: گاڑیاں کرائے پر دینے اور کرایہ پر گاڑی کی معلومات فراہم کرنے کے لیے
- ActivitiesBooking: سرگرمیاں بک کرنے اور سرگرمی کی معلومات فراہم کرنے کے لیے
- DestinationInfo: مقامات کے بارے میں معلومات فراہم کرنے کے لیے
- DefaultAgent: عمومی درخواستوں کو سنبھالنے کے لیے

## متوقع نتیجہ

جب آپ ایجنٹ کو ایک سفر کی منصوبہ بندی کی درخواست کے ساتھ چلائیں گے، تو یہ درخواست کا تجزیہ کرے گا اور خاص ایجنٹس کو موزوں کام تفویض کے ساتھ ایک ساختہ منصوبہ تیار کرے گا، جو JSON کی شکل میں TravelPlan اسکیمہ کے مطابق ہوگا۔

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->