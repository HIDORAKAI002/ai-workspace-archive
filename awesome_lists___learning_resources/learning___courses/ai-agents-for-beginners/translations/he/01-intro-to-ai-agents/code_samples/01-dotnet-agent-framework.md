# 🌍 סוכן נסיעות מבוסס בינה מלאכותית עם Microsoft Agent Framework (.NET)

## 📋 סקירת התרחיש

דוגמה זו ממחישה כיצד לבנות סוכן תכנון נסיעות אינטליגנטי באמצעות Microsoft Agent Framework ל-.NET. הסוכן יכול לייצר באופן אוטומטי מסלולי טיול יומיים מותאמים אישית ליעדים אקראיים ברחבי העולם.

### יכולות מפתח:

- 🎲 **בחירת יעד אקראי**: משתמש בכלי מותאם לבחירת מוקדי חופשה
- 🗺️ **תכנון טיול אינטיליגנטי**: יוצר מסלולים מפורטים יום-יום
- 🔄 **זרימה בזמן אמת**: תומך בתגובות מיידיות וזרימות
- 🛠️ **אינטגרציה עם כלים מותאמים**: מדגים כיצד להרחיב את יכולות הסוכן

## 🔧 ארכיטקטורה טכנית

### טכנולוגיות מרכזיות

- **Microsoft Agent Framework**: מימוש עדכני ב-.NET לפיתוח סוכני AI
- **Azure OpenAI (Responses API)**: משתמש ב-API של תגובות Azure OpenAI להסקת מודל
- **Azure Identity**: כניסה מאובטחת דרך `AzureCliCredential` (`az login`)
- **ניהול מאובטח**: ניהול נקודת קצה מבוסס סביבה

### רכיבים מרכזיים

1. **AIAgent**: מנחה הזרימה הראשי שמנהל את שיחת השיח
2. **כלים מותאמים**: פונקציית `GetRandomDestination()` זמינה לסוכן
3. **לקוח תגובות**: ממשק שיחה מבוסס Azure OpenAI Responses
4. **תמיכה בזרימה**: יכולות יצירת תגובות בזמן אמת

### דפוס אינטגרציה

```mermaid
graph LR
    A[בקשת משתמש] --> B[סוכן בינה מלאכותית]
    B --> C[Azure OpenAI (ממשק API לתגובות)]
    B --> D[כלי GetRandomDestination]
    C --> E[מסלול טיול]
    D --> E
```

## 🚀 התחלת עבודה

### דרישות מוקדמות

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) או גרסה גבוהה יותר
- [מנוי Azure](https://azure.microsoft.com/free/) עם משאב Azure OpenAI ופריסת מודל
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — התחבר עם `az login`

### משתני סביבה נדרשים

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# לאחר מכן היכנס כדי ש-AzureCliCredential יוכל לקבל אסימון
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# לאחר מכן התחבר כדי ש-AzureCliCredential יוכל לקבל אסימון
az login
```

### קוד לדוגמה

להפעלת דוגמת הקוד,

```bash
# זש/באש
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

או באמצעות ה-CLI של dotnet:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

ראה [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) עבור הקוד המלא.

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

## 🎓 מסקנות מרכזיות

1. **ארכיטקטורת סוכן**: Microsoft Agent Framework מספק גישה נקייה ובטוחה מסוג לפיתוח סוכני AI ב-.NET
2. **אינטגרציית כלים**: פונקציות המצוינות עם תכונות `[Description]` נהפכות לזמינות ככלים לסוכן
3. **ניהול קונפיגורציה**: משתני סביבה וטיפול מאובטח באישורים בהתאם להנחיות הטובות ב-.NET
4. **API תגובות Azure OpenAI**: הסוכן משתמש ב-API תגובות Azure OpenAI דרך Azure.AI.OpenAI SDK

## 🔗 משאבים נוספים

- [תיעוד Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI ב-Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->