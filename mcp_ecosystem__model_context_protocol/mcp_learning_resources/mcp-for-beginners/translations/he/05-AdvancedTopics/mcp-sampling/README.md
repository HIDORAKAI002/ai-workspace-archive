> [מיושן: מועמד שחרור 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# דגימה בפרוטוקול הקשר דגם

> **הודעת מיושנות:** מועמד שחרור מפרט MCP `2026-07-28` מסמן את הדגימה כמיושנת לטובת אינטגרציה ישירה עם ממשקי API של ספקי LLM. הדגימה ממשיכה לעבוד ב-`2025-11-25` ולפחות שנה לאחר כל מיושנות פורמלית, כך שכל התוכן בשיעור זה נשאר בתוקף – אך עיצובים חדשים לשרתים צריכים לבחון את דפוס ההחלפה. ראה [מה משתנה ב-MCP: מועמד שחרור 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

דגימה היא תכונה חזקה ב-MCP שמאפשרת לשרתים לבקש השלמות LLM דרך הלקוח, ומאפשרת התנהגויות סוכניות מתוחכמות תוך שמירה על אבטחה ופרטיות. הקונפיגורציה הנכונה של הדגימה יכולה לשפר באופן דרמטי את איכות התגובה והביצועים. MCP מספק דרך מאורגנת לשלוט כיצד דגמים מייצרים טקסט עם פרמטרים ספציפיים שמשפיעים על אקראיות, יצירתיות וקוהרנטיות.

## מבוא

בשיעור זה נחקור כיצד להגדיר פרמטרי דגימה בבקשות MCP ולהבין את מנגנוני הפרוטוקול שמתחת לדגימה.

## מטרות הלמידה

בסוף שיעור זה תוכל ל:

- להבין את פרמטרי הדגימה המרכזיים הזמינים ב-MCP.
- להגדיר פרמטרי דגימה למקרים שונים של שימוש.
- ליישם דגימה דטרמיניסטית לקבלת תוצאות חוזרות.
- להתאים דינמית פרמטרי דגימה בהתבסס על הקשר והעדפות המשתמש.
- להחיל אסטרטגיות דגימה לשיפור ביצועי הדגם בתרחישים שונים.
- להבין כיצד הדגימה פועלת בזרם הלקוח-שרת של MCP.

## כיצד פועלת דגימה ב-MCP

זרם הדגימה ב-MCP עוקב אחרי הצעדים הבאים:

1. השרת שולח בקשת `sampling/createMessage` ללקוח
2. הלקוח בודק את הבקשה ויכול לשנות אותה
3. הלקוח מבצע דגימה מ-LLM
4. הלקוח בודק את ההשלמה
5. הלקוח מחזיר את התוצאה לשרת

עיצוב זה עם אדם בתהליך מבטיח שהמשתמשים שומרים על שליטה במה שה-LLM רואה ומייצר.

## סקירת פרמטרי דגימה

MCP מגדיר את פרמטרי הדגימה הבאים שניתן להגדיר בבקשות ללקוח:

| פרמטר | תיאור | טווח טיפוסי |
|-----------|-------------|---------------|
| `temperature` | שולט באקראיות בבחירת טוקנים | 0.0 - 1.0 |
| `maxTokens` | מספר מקסימלי של טוקנים ליצירה | ערך שלם |
| `stopSequences` | רצפים מותאמים שעוצרים יצירה כאשר נתקלים בהם | מערך מחרוזות |
| `metadata` | פרמטרים נוספים ספציפיים לספק | אובייקט JSON |

ספקי LLM רבים תומכים בפרמטרים נוספים דרך שדה `metadata`, שעשוי לכלול:

| פרמטר הרחבה נפוץ | תיאור | טווח טיפוסי |
|-----------|-------------|---------------|
| `top_p` | דגימת גרעין - מגביל טוקנים למסה מצטברת עליונה | 0.0 - 1.0 |
| `top_k` | מגביל בחירת טוקנים לאפשרויות K העליונות | 1 - 100 |
| `presence_penalty` | מעניש טוקנים לפי נוכחותם בטקסט עד כה | -2.0 - 2.0 |
| `frequency_penalty` | מעניש טוקנים לפי שכיחותם בטקסט עד כה | -2.0 - 2.0 |
| `seed` | זרע אקראי ספציפי לתוצאות חוזרות | ערך שלם |

## פורמט דוגמת בקשה

להלן דוגמה לבקשת דגימה מלקוח ב-MCP:

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

## פורמט תגובה

הלקוח מחזיר תוצאת השלמה:

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

## בקרות אדם בתהליך

דגימת MCP מעוצבת עם השגחה אנושית:

- **עבור פרומפטים**:
  - על הלקוחות להציג למשתמשים את הפרומפט המוצע
  - על המשתמשים להיות מסוגלים לשנות או לדחות פרומפטים
  - פרומפטים של המערכת יכולים להיות מסוננים או מותאמים
  - הכללת הקשר נשלטת על ידי הלקוח

- **עבור השלמות**:
  - על הלקוחות להציג למשתמשים את ההשלמה
  - על המשתמשים להיות מסוגלים לשנות או לדחות השלמות
  - הלקוחות יכולים לסנן או לשנות השלמות
  - המשתמשים שואלים איזה דגם ישמש

עם עקרונות אלו נבחן כיצד ליישם דגימה בשפות תכנות שונות, תוך התמקדות בפרמטרים הנתמכים בדרך כלל על ידי ספקי LLM.

## שיקולי אבטחה

בעת יישום דגימה ב-MCP, יש לשקול את שיטות האבטחה הטובות הבאות:

- **לבדוק את כל תוכן ההודעה** לפני שליחתו ללקוח
- **לטהר מידע רגיש** מפרומפטים והשלמות
- ** ליישם מגבלות קצב** למניעת שימוש לרעה
- **לנטר שימוש בדגימה** לדפוסים חריגים
- **להצפין נתונים במעבר** באמצעות פרוטוקולים מאובטחים
- **לטפל בפרטיות נתוני משתמש** בהתאם לרגולציות הרלוונטיות
- **לבדוק בקשות דגימה** לצורך תאימות ואבטחה
- **לשלוט בעלויות** עם מגבלות מתאימות
- **ליישם תזמון פסק זמן** לבקשות דגימה
- **לטפל בשגיאות דגם בחן** באמצעות פתרונות חלופיים מתאימים

פרמטרי דגימה מאפשרים כוונון מדויק של התנהגות דגמי שפה להשגת האיזון הרצוי בין תוצאות דטרמיניסטיות ליצירתיות.

בואו נבחן כיצד להגדיר פרמטרים אלה בשפות תכנות שונות.

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

בקוד הקודם עשינו:

- יצרנו לקוח MCP עם URL של שרת ספציפי.
- הגדרנו בקשה עם פרמטרי דגימה כמו `temperature`, `top_p` ו-`top_k`.
- שלחנו את הבקשה והדפסנו את הטקסט שנוצר.
- השתמשנו ב:
    - `allowedTools` כדי לציין אילו כלים המודל יכול להשתמש בהם במהלך היצירה. במקרה זה אפשרנו את הכלים `ideaGenerator` ו-`marketAnalyzer` לסייע ביצירת רעיונות אפליקציות יצירתיות.
    - `frequencyPenalty` ו-`presencePenalty` לשליטה בחזרתיות ובמגוון הפלט.
    - `temperature` לשליטה באקראיות הפלט, כאשר ערכים גבוהים מובילים לתגובות יצירתיות יותר.
    - `top_p` להגבלת בחירת הטוקנים לאלה התורמים למסה המצטברת העליונה, מה שמשפר את איכות הטקסט שנוצר.
    - `top_k` להגבלה את המודל לטוקנים ה-K הסבירים ביותר, מה שיכול לסייע ביצירת תגובות קוהרנטיות יותר.
    - `frequencyPenalty` ו-`presencePenalty` להפחתת חזרתיות ולעידוד גיוון בטקסט שנוצר.

# [JavaScript](#tab/javascript)

```javascript
// דוגמה ב-JavaScript: תצורת מדגם בטמפרטורה ובטופ-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // אתחול לקוח MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // הגדרת בקשה עם פרמטרים שונים לדגימה
  const creativeSampling = {
    temperature: 0.9,    // טמפרטורה גבוהה יותר = יותר אקראיות/יצירתיות
    topP: 0.92,          // התחשבות בטוקנים עם מסת סבירות של 92% העליונות
    frequencyPenalty: 0.6, // הפחתת חזרת שרשרת טוקנים
    presencePenalty: 0.4   // הענשת טוקנים שכבר הופיעו בטקסט עד כה
  };
  
  const factualSampling = {
    temperature: 0.2,    // טמפרטורה נמוכה יותר = יותר חיזוי ודאי/עובדתי
    topP: 0.85,          // בחירת טוקנים מעט ממוקדת יותר
    frequencyPenalty: 0.2, // עונש חזרה מינימלי
    presencePenalty: 0.1   // עונש נוכחות מינימלי
  };
  
  try {
    // שליחת שתי בקשות עם תצורות דגימה שונות
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

בקוד הקודם עשינו:

- יזמנו לקוח MCP עם URL של שרת ומפתח API.
- הגדרנו שתי קבוצות של פרמטרי דגימה: אחת למשימות יצירתיות ואחת למשימות עובדתיות.
- שלחנו בקשות עם ההגדרות הללו, ואפשרנו למודל להשתמש בכלים ספציפיים לכל משימה.
- הדפסנו את התגובות שנוצרו כדי להדגים את ההשפעות של פרמטרי דגימה שונים.
- השתמשנו ב-`allowedTools` כדי לציין אילו כלים המודל יכול להשתמש בהם במהלך היצירה. במקרה זה אפשרנו את הכלים `ideaGenerator` ו-`environmentalImpactTool` למשימות יצירתיות, ואת `factChecker` ו-`dataAnalysisTool` למשימות עובדתיות.
- השתמשנו ב-`temperature` לשליטה באקראיות הפלט, כאשר ערכים גבוהים מובילים לתגובות יצירתיות יותר.
- השתמשנו ב-`top_p` להגבלת בחירת הטוקנים לאלה התורמים למסה המצטברת העליונה, מה שמשפר את איכות הטקסט שנוצר.
- השתמשנו ב-`frequencyPenalty` ו-`presencePenalty` להפחתת חזרתיות ולעידוד גיוון בפלט.
- השתמשנו ב-`top_k` להגבלה את המודל לטוקנים ה-K הסבירים ביותר, מה שיכול לסייע ביצירת תגובות קוהרנטיות יותר.

---

## דגימה דטרמיניסטית

עבור אפליקציות שדורשות תוצאות עקביות, דגימה דטרמיניסטית מבטיחה תוצאות חוזרות. היא עושה זאת על ידי שימוש בזרע אקראי קבוע והגדרת הטמפרטורה לאפס.

נבחן למטה יישום דוגמה להדגמת דגימה דטרמיניסטית בשפות תכנות שונות.

# [Java](#tab/java)

```java
// דוגמת Java: תגובות דטרמיניסטיות עם זרע קבוע
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // שימוש בזרע קבוע לתוצאות דטרמיניסטיות
        
        // בקשה ראשונה עם זרע קבוע
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // טמפרטורה אפס למקסימום דטרמיניזם
            .build();
            
        // בקשה שנייה עם אותו זרע
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // ביצוע שתי הבקשות
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // התגובות צריכות להיות זהות בגלל אותו זרע וטמפרטורה=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

בקוד הקודם עשינו:

- יצרנו לקוח MCP עם URL של שרת מוגדר.
- הגדרנו שתי בקשות עם אותו פרומפט, זרע קבוע, וטמפרטורה אפס.
- שלחנו את שתי הבקשות והדפסנו את הטקסט שנוצר.
- הדגמנו שהתשובות זהות בשל המהות הדטרמיניסטית של קונפיגורציית הדגימה (אותו זרע וטמפרטורה).
- השתמשנו ב-`setSeed` כדי לציין זרע אקראי קבוע, להבטיח שהמודל יפיק תמיד את אותו פלט עבור אותו קלט.
- הגדרנו את `temperature` לאפס כדי להבטיח דטרמיניזם מקסימלי, כלומר המודל תמיד ייבחר את הטוקן הסביר ביותר הבא ללא אקראיות.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// דוגמת JavaScript: תגובות דטרמיניסטיות עם שליטת זרע
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // בקשה ראשונה עם זרע קבוע
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // טמפרטורה אפסית למקסימום דטרמיניזם
    });
    
    // בקשה שנייה עם אותו זרע וטמפרטורה
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // בקשה שלישית עם זרע שונה אך אותה טמפרטורה
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

בקוד הקודם עשינו:

- יזמנו לקוח MCP עם URL של שרת.
- הגדרנו שתי בקשות עם אותו פרומפט, זרע קבוע, וטמפרטורה אפס.
- שלחנו את שתי הבקשות והדפסנו את הטקסט שנוצר.
- הדגמנו שהתשובות זהות בשל המהות הדטרמיניסטית של קונפיגורציית הדגימה (אותו זרע וטמפרטורה).
- השתמשנו ב-`seed` כדי לציין זרע אקראי קבוע, להבטיח שהמודל יפיק תמיד את אותו פלט עבור אותו קלט.
- הגדרנו את `temperature` לאפס כדי להבטיח דטרמיניזם מקסימלי, כלומר המודל תמיד ייבחר את הטוקן הסביר ביותר הבא ללא אקראיות.
- השתמשנו בזרע שונה עבור הבקשה השלישית להראות ששינוי הזרע מביא לתוצאות שונות, אפילו עם אותו פרומפט וטמפרטורה.

---

## קונפיגורציית דגימה דינמית

דגימה חכמה מתאימה פרמטרים בהתבסס על ההקשר וצרכי כל בקשה. זאת אומרת, התאמה דינמית של פרמטרים כמו temperature, top_p ו-penalties בהתבסס על סוג המשימה, העדפות המשתמש או ביצועים היסטוריים.

נבחן כיצד ליישם דגימה דינמית בשפות תכנות שונות.

# [Python](#tab/python)

```python
# דוגמת פייתון: דגימה דינמית מבוססת על הקשר הבקשה
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # הגדר תצורות דגימה מראש עבור סוגי משימות שונים
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # בחר תצורת בסיס
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # התאם בהתאם להעדפות המשתמש אם סופקו
        if user_preferences:
            if "creativity_level" in user_preferences:
                # קנה מידה לטמפרטורה בהתבסס על העדפת יצירתיות (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # התאם את top_p בהתבסס על גיוון התגובה הרצוי
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # צור ושלח בקשה עם פרמטרי דגימה מותאמים אישית
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # החזר תגובה עם מטה-נתוני דגימה לשקיפות
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

בקוד הקודם עשינו:

- יצרנו מחלקת `DynamicSamplingService` שמנהלת דגימה אדפטיבית.
- הגדרנו תצורות דגימה מראש לסוגי משימות שונים (יצירתיות, עובדתיות, קוד, אנליטית).
- בחרנו תצורת דגימה בסיסית בהתבסס על סוג המשימה.
- התאמת פרמטרי הדגימה בהתבסס על העדפות המשתמש, כמו רמת יצירתיות ומגוון.
- שלחנו את הבקשה עם פרמטרי הדגימה המוגדרים דינמית.
- החזרנו את הטקסט שנוצר יחד עם פרמטרי הדגימה וסוג המשימה לשקיפות.
- השתמשנו ב-`temperature` לשליטה באקראיות הפלט, כאשר ערכים גבוהים מובילים לתגובות יצירתיות יותר.
- השתמשנו ב-`top_p` להגבלת בחירת הטוקנים לאלה התורמים למסה המצטברת העליונה, מה שמשפר את איכות הטקסט שנוצר.
- השתמשנו ב-`frequency_penalty` להפחתת חזרתיות ולעידוד גיוון בפלט.
- השתמשנו ב-`user_preferences` לאפשר התאמה אישית של פרמטרי הדגימה בהתבסס על רמות יצירתיות ומגוון שהוגדרו על ידי המשתמש.
- השתמשנו ב-`task_type` כדי להחליט על אסטרטגיית הדגימה המתאימה לבקשה, לאפשר תגובות ממוקדות יותר בהתאם לאופי המשימה.
- השתמשנו בשיטה `send_request` לשליחת הפרומפט עם פרמטרי הדגימה המוגדרים, להבטיח שהמודל יפיק טקסט בהתאם לדרישות.
- השתמשנו ב-`generated_text` כדי לקבל את תגובת המודל, שמוחזרת יחד עם פרמטרי הדגימה וסוג המשימה לניתוח או תצוגה.
- השתמשנו בפונקציות `min` ו-`max` כדי לוודא שהעדפות המשתמש מוגבלות בתוך טווחים תקינים, למנוע קונפיגורציות דגימה לא חוקיות.

# [JavaScript דינמי](#tab/javascript-dynamic)

```javascript
// דוגמת JavaScript: תצורת דגימה דינמית מבוססת הקשר משתמש
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // הגדרת פרופילי דגימה בסיסיים
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // מעקב ביצועים היסטוריים
    this.performanceHistory = [];
  }
  
  // זיהוי סוג המשימה מתוך ההנחיה
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // זיהוי משוער פשוט - ניתן לשפר באמצעות סיווג ML
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
    
    // ברירת מחדל לשיח conversational אם לא מזוהה סוג ברור
    return 'conversational';
  }
  
  // חישוב פרמטרי דגימה בהתבסס על ההקשר והעדפות המשתמש
  getSamplingParameters(prompt, context = {}) {
    // זיהוי סוג המשימה
    const taskType = this.detectTaskType(prompt, context);
    
    // קבלת פרופיל בסיסי
    let params = {...this.samplingProfiles[taskType]};
    
    // התאמה על פי העדפות המשתמש
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // המרה מסולם 1-10 לטווח טמפרטורה מתאים
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // דיוק גבוה יותר משמעותו topP נמוך יותר (בחירה ממוקדת יותר)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // עקביות גבוהה יותר משמעותה עונשים נמוכים יותר
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // יישום התאמות שנלמדו מההיסטוריה של הביצועים
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // לוגיקה אדפטיבית פשוטה - ניתן לשפר עם אלגוריתמים מתקדמים יותר
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // התחשבות רק בהיסטוריה האחרונה
    
    if (relevantHistory.length > 0) {
      // חישוב ציוני ביצוע ממוצעים
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // אם הביצועים נמוכים מהסף, להתאים את הפרמטרים
      if (avgScore < 0.7) {
        // התאמה קלה לערכים בטוחים יותר
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // רישום ביצועים להתאמות עתידיות
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // דירוג 0-1 של איכות התגובה
    });
    
    // הגבלת גודל ההיסטוריה
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // קבלת פרמטרי דגימה מותאמים אופטימלית
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // שליחת בקשה עם הפרמטרים המותאמים
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // אם המשתמש מספק משוב, לרשום זאת לאופטימיזציה עתידית
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

// דוגמת שימוש
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // משימה יצירתית עם העדפות משתמש מותאמות אישית
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // יצירתיות גבוהה (1-10)
          consistency: 3  // עקביות נמוכה (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // משימת יצירת קוד
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // יצירתיות נמוכה
          precision: 8,   // דיוק גבוה
          consistency: 9  // עקביות גבוהה
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

בקוד הקודם עשינו:

- יצרנו מחלקת `AdaptiveSamplingManager` שמנהלת דגימה דינמית בהתבסס על סוג משימה והעדפות המשתמש.
- הגדרנו פרופילי דגימה לסוגי משימה שונים (יצירתיות, עובדתיות, קוד, שיחתי).
- יישמנו שיטה לזיהוי סוג המשימה מתוך הפרומפט באמצעות הסקות פשוטות.
- חישבנו פרמטרי דגימה בהתבסס על סוג המשימה שזוהה והעדפות המשתמש.
- יישמנו התאמות שנלמדו בהתבסס על ביצועים היסטוריים לאופטימיזציה של פרמטרי הדגימה.
- רשמנו ביצועים להסתגלויות עתידיות, מה שמאפשר למערכת ללמוד מאינטראקציות קודמות.
- שלחנו בקשות עם פרמטרי דגימה מוגדרים דינמית והחזירו את הטקסט שנוצר יחד עם הפרמטרים שהוחלו וסוג המשימה שזוהה.
- השתמשנו ב:
    - `userPreferences` כדי לאפשר התאמה אישית של פרמטרי הדגימה בהתבסס על רמות יצירתיות, דיוק ועקביות שהוגדרו על ידי המשתמש.
    - `detectTaskType` כדי להחליט על אופי המשימה בהתבסס על הפרומפט, לאפשר תגובות ממוקדות יותר.
    - `recordPerformance` לרישום ביצועי תגובות שנוצרו, מה שמאפשר למערכת להסתגל ולשפר עם הזמן.
    - `applyLearnedAdjustments` לשינוי פרמטרי הדגימה בהתבסס על ביצועים היסטוריים, משפר את יכולת המודל לייצר תגובות איכותיות.
    - `generateResponse` לארוז את כל תהליך יצירת התגובה עם דגימה אדפטיבית, מאפשר קריאה נוחה עם פרומפטים והקשרים שונים.
    - `allowedTools` לציון אילו כלים המודל יכול להשתמש בהם במהלך היצירה, מאפשר תגובות מודעות להקשר יותר.
    - `feedbackScore` לאפשר למשתמשים לספק משוב על איכות התגובה, שניתן להשתמש בו כדי לחדד עוד יותר את ביצועי המודל לאורך זמן.
    - `performanceHistory` לשמירת היסטוריית אינטראקציות, מה שמאפשר למערכת ללמוד מהצלחות וכישלונות קודמים.
    - `getSamplingParameters` להתאמת פרמטרי הדגימה דינמית בהתבסס על הקשר הבקשה, לאפשר התנהגות מודל גמישה ותגובה.
    - `detectTaskType` לסיווג המשימה על בסיס הפרומפט, מה שמאפשר למערכת להחיל אסטרטגיות דגימה מתאימות לסוגי בקשות שונים.
    - `samplingProfiles` להגדרת תצורות דגימה בסיסיות לסוגי משימות שונים, לאפשר התאמות מהירות בהתבסס על אופי הבקשה.

---

## מה הלאה

- [5.7 סקיילינג](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->