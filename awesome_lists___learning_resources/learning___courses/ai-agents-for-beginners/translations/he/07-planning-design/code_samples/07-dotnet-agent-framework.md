# 🎯 תכנון ודיזайн פטרנים עם Azure OpenAI (Responses API) (.NET)

## 📋 מטרות הלמידה

פנקס זה ממחיש דיזיין ופטרני תכנון ברמת ארגונית לבניית סוכנים אינטליגנטיים באמצעות Microsoft Agent Framework ב-.NET עם Azure OpenAI (Responses API). תלמדו ליצור סוכנים שמסוגלים לפרק בעיות מורכבות, לתכנן פתרונות רב-שלביים, לבצע זרימות עבודה מתוחכמות עם תכונות ארגוניות של .NET.

## ⚙️ דרישות מוקדמות והתקנה

**סביבת פיתוח:**
- .NET 9.0 SDK או גרסה גבוהה יותר
- Visual Studio 2022 או VS Code עם תוסף C#
- מנוי Azure עם משאבי Azure OpenAI ופריסה של מודל
- Azure CLI — התחבר עם `az login`

**תלויות נדרשות:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**קונפיגורציית סביבה (קובץ .env):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## הרצת הקוד

שיעור זה כולל מימוש אפליקציית .NET Single File. להריץ אותה:

```bash
# להפוך את הקובץ להרצה (לינוקס/מק)
chmod +x 07-dotnet-agent-framework.cs

# להריץ את היישום
./07-dotnet-agent-framework.cs
```

או השתמש בפקודת dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## מימוש הקוד

המימוש השלם זמין בקובץ `07-dotnet-agent-framework.cs`, שמדגים:

- טעינת קונפיגורציית סביבה עם DotNetEnv
- קונפיגורציה של לקוח Azure OpenAI ויצירת סוכן AI עם `GetChatClient().AsAIAgent()`
- הגדרת מודלים מובנים (Plan ו-TravelPlan) עם סריאליזציה לJSON
- יצירת סוכן AI עם פלט מובנה באמצעות סכמת JSON
- ביצוע בקשות תכנון עם תגובות בטוחות טיפוס

## מושגים מרכזיים

### תכנון מובנה עם מודלים בטוחים טיפוס

הסוכן משתמש במחלקות C# כדי להגדיר את מבנה פלט התכנון:

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

### סכמת JSON לפלט מובנה

הסוכן מוגדר להחזיר תגובות התואמות לסכמת TravelPlan:

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

### הוראות סוכן תכנון

הסוכן פועל כמקשר, המפנה משימות לתתי-סוכנים מומחים:

- FlightBooking: להזמנת טיסות ומתן מידע על טיסות
- HotelBooking: להזמנת מלונות ומתן מידע על מלונות
- CarRental: להזמנת רכבים ומתן מידע על השכרת רכבים
- ActivitiesBooking: להזמנת פעילויות ומתן מידע על פעילויות
- DestinationInfo: מספק מידע על יעדים
- DefaultAgent: לטיפול בבקשות כלליות

## פלט צפוי

כשמריצים את הסוכן עם בקשת תכנון טיול, הוא ינתח את הבקשה וייצר תוכנית מובנית עם הקצאת משימות מתאימות לסוכנים מומחים, מפורמטת כ-JSON התואם לסכמת TravelPlan.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->