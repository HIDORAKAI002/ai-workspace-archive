# שידור HTTPS עם פרוטוקול הקשר למודל (MCP)

פרק זה מספק מדריך מקיף ליישום שידור מאובטח, סקלאבילי וברגע אמת באמצעות פרוטוקול הקשר למודל (MCP) בעזרת HTTPS. הוא מכסה את המוטיבציה לשידור, מנגנוני הטרנספורט הזמינים, כיצד ליישם HTTP ניתנים לשידור ב-MCP, שיטות אבטחה מומלצות, מעבר מ-SSE, והנחיות מעשיות לבניית יישומי MCP לשידור משלכם.

> **מבט קדימה:** שיעור זה מתאר HTTP ניתנים לשידור תחת **מפרט MCP 2025-11-25**, שבו מושב מוקם במהלך `initialize` ומקושר עם כותרת `Mcp-Session-Id`. גרסת המועמד לשחרור מ-`2026-07-28` מסירה לחלוטין את הליך הברכת היד ואת מזהה המושב, מה שהופך כל בקשה לעצמאית וניתנת לכיוון לכל מופע שרת ללא מושבים "דביקים". ראה [מה משתנה ב-MCP: מועמד שחרור 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) לפרטים.

## מנגנוני טרנספורט ושידור ב-MCP

סעיף זה בוחן את מנגנוני הטרנספורט השונים הזמינים ב-MCP ואת תפקידם בהפעלת יכולות שידור לתקשורת בזמן אמת בין לקוחות לשרתים.

### מהו מנגנון טרנספורט?

מנגנון טרנספורט מגדיר כיצד נתונים מוחלפים בין הלקוח לשרת. MCP תומך בסוגי טרנספורט מרובים המתאימים לסביבות ודרישות שונות:

- **stdio**: קלט/פלט סטנדרטי, מתאים לכלים מקומיים ומבוססי CLI. פשוט אך לא מתאים לאינטרנט או ענן.
- **SSE (אירועים שנשלחים מהשרת)**: מאפשר לשרתים לדחוף עדכונים בזמן אמת ללקוחות דרך HTTP. טוב לממשקי אינטרנט, אך מוגבל בסקלאביליות וגמישות. מגרסת מפרט MCP 2025-06-18, טרנספורט SSE עצמאי (Server-Sent Events) הוצא משימוש והוחלף בטרנספורט "HTTP ניתנים לשידור".
- **HTTP ניתנים לשידור**: טרנספורט שידור מתקדם מבוסס HTTP, התומך בהתראות וסקלאביליות טובה יותר. מומלץ עבור רוב תרחישי הפקה וענן.

### טבלת השוואה

הסתכל בטבלת ההשוואה למטה להבנת ההבדלים בין מנגנוני הטרנספורטים האלה:

| טרנספורט         | עדכוני זמן אמת | שידור | סקלאביליות | מקרה שימוש           |
|-------------------|----------------|-------|-------------|---------------------|
| stdio             | לא             | לא    | נמוך        | כלים מקומיים ב-CLI  |
| SSE               | כן             | כן    | בינוני      | אינטרנט, עדכוני זמן אמת |
| HTTP ניתנים לשידור| כן             | כן    | גבוה        | ענן, לקוחות מרובים  |

> **טיפ:** בחירת הטרנספורט הנכון משפיעה על ביצועים, סקלאביליות וחוויית משתמש. **HTTP ניתנים לשידור** מומלץ ליישומים מודרניים, סקלאביליים ומוכנים לענן.

שים לב לטרנספורטים stdio ו-SSE שהוצגו בפרקים הקודמים וכיצד HTTP ניתנים לשידור הוא הטרנספורט המכוסה בפרק זה.

## שידור: מושגים ומוטיבציה

הבנת המושגים והמוטיבציות הבסיסיות מאחורי שידור חיונית ליישום מערכות תקשורת בזמן אמת יעילות.

**שידור** הוא טכניקה בתכנות רשת המאפשרת שליחת וקבלת נתונים בחלקים קטנים, מנוהלים או כסדרת אירועים, במקום להמתין לתגובה מלאה. זה שימושי במיוחד ל:

- קבצים או מערכי נתונים גדולים.
- עדכוני זמן אמת (לדוגמה, צ'אט, פסי התקדמות).
- חישובים ארוכי טווח שבהם רוצים לשמור על המשתמש מעודכן.

הנה מה שצריך לדעת על שידור ברמה גבוהה:

- הנתונים נמסרים בהדרגה, לא כולם בבת אחת.
- הלקוח יכול לעבד נתונים כשהם מגיעים.
- מקטין את זמן ההמתנה הנתפס ומשפר את חוויית המשתמש.

### למה להשתמש בשידור?

הסיבות לשימוש בשידור הן:

- משתמשים מקבלים משוב מיידי, לא רק בסוף
- מאפשר יישומים בזמן אמת וממשקי משתמש רגישים
- שימוש יעיל יותר במשאבי רשת ומחשוב

### דוגמה פשוטה: שרת ולקוח שידור HTTP

הנה דוגמה פשוטה כיצד אפשר ליישם שידור:

#### פייתון

**שרת (פייתון, באמצעות FastAPI ו-StreamingResponse):**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**לקוח (פייתון, באמצעות requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

דוגמה זו ממחישה שרת השולח סדרת הודעות ללקוח כשהן זמינות, במקום להמתין שהכל יהיה מוכן.

**איך זה עובד:**

- השרת מחזיר כל הודעה כאשר היא מוכנה.
- הלקוח מקבל ומדפיס כל מקטע כשהוא מגיע.

**דרישות:**

- השרת חייב להשתמש בתגובה ניתנת לשידור (למשל `StreamingResponse` ב-FastAPI).
- הלקוח חייב לעבד את התגובה כזרם (`stream=True` ב-requests).
- Content-Type בדרך כלל `text/event-stream` או `application/octet-stream`.

#### ג'אווה

**שרת (ג'אווה, באמצעות Spring Boot ו-Server-Sent Events):**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```

**לקוח (ג'אווה, באמצעות Spring WebFlux WebClient):**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```

**הערות יישום בג'אווה:**

- משתמש בערימת ריאקטיבית של Spring Boot עם `Flux` לשידור
- `ServerSentEvent` מספק שידור אירועים מובנה עם סוגי אירועים
- `WebClient` עם `bodyToFlux()` מאפשר צריכת שידור ריאקטיבית
- `delayElements()` מדמה זמן עיבוד בין אירועים
- לאירועים יכולים להיות סוגים (`info`, `result`) לטיפול טוב יותר בלקוח

### השוואה: שידור קלאסי לעומת שידור MCP

ההבדלים בין כיצד שידור עובד בצורה "קלאסית" לעומת ב-MCP מוצגים כך:

| תכונה                  | שידור HTTP קלאסי          | שידור MCP (התראות)             |
|------------------------|---------------------------|-------------------------------|
| תגובה ראשית            | מחולקת לחלקים             | יחידה, בסוף                   |
| עדכוני התקדמות         | נשלחים כחלקים             | נשלחים כהתראות               |
| דרישות מהלקוח          | צריך לעבד זרם             | צריך ליישם מטפל בהודעות        |
| מקרה שימוש             | קבצים גדולים, זרמי טוקנים לאינטליגנציה מלאכותית | התקדמות, לוגים, משוב בזמן אמת |

### הבדלים מרכזיים:

בנוסף, הנה כמה הבדלים מרכזיים:

- **תבנית תקשורת:**
  - שידור HTTP קלאסי: משתמש בקידוד העברת חלקים פשוט לשליחת נתונים
  - שידור MCP: משתמש במערכת התראות מובנית עם פרוטוקול JSON-RPC

- **פורמט ההודעה:**
  - HTTP קלאסי: חתיכות טקסט רגיל עם שורות חדשות
  - MCP: אובייקטי LoggingMessageNotification מובנים עם מטה-נתונים

- **יישום בלקוח:**
  - HTTP קלאסי: לקוח פשוט שמעבד תגובות שידור
  - MCP: לקוח מתוחכם יותר עם מטפל בהודעות לעיבוד סוגים שונים של הודעות

- **עדכוני התקדמות:**
  - HTTP קלאסי: ההתקדמות היא חלק מהזרם הראשי
  - MCP: ההתקדמות נשלחת כהודעות התראה נפרדות בעוד התגובה הראשית מגיעה בסוף

### המלצות

יש כמה דברים שמומלץ לשקול בבחירת יישום שידור קלאסי (כפי שהראינו לעיל עם `/stream`) לעומת שידור ב-MCP.

- **לצרכי שידור פשוטים:** שידור HTTP קלאסי פשוט יותר ליישום ומספיק לצרכי שידור בסיסיים.

- **ליישומים מורכבים ואינטראקטיביים:** שידור MCP מספק גישה מבנית עם מטה-נתונים עשירים והפרדה בין התראות לתוצאות סופיות.

- **ליישומי אינטיליגנציה מלאכותית:** מערכת ההתראות של MCP שימושית במיוחד למשימות אינטיליגנציה מלאכותית ארוכות טווח שבהן רוצים לשמור על המשתמש מעודכן בהתקדמות.

## שידור ב-MCP

בסדר, ראיתם המלצות והשוואות עד כה לגבי ההבדלים בין שידור קלאסי לשידור ב-MCP. נעבור כעת לפרטים איך ניתן לנצל שידור ב-MCP.

הבנת אופן השידור במסגרת MCP חיונית לבניית יישומים רגישים המספקים משוב בזמן אמת למשתמשים במהלך פעולות ארוכות.

ב-MCP, שידור הוא לא שליחת תגובה ראשית בחתיכות, אלא שליחת **התראות** ללקוח בזמן כלי מעבד בקשה. התראות אלו יכולות לכלול עדכוני התקדמות, לוגים או אירועים אחרים.

### איך זה עובד

התוצאה הראשית עדיין נשלחת בתגובה אחת. עם זאת, התראות נשלחות כהודעות נפרדות במהלך העיבוד וכך מעדכנות את הלקוח בזמן אמת. הלקוח חייב להיות מסוגל לטפל בהודעות אלו ולהציגן.

## מהי התראה?

אמרנו "התראה", מה משמעותה בהקשר MCP?

התראה היא הודעה שנשלחת מהשרת ללקוח כדי ליידע על התקדמות, סטטוס או אירועים אחרים במהלך פעולה ארוכת טווח. התראות משפרות את השקיפות וחוויית המשתמש.

לדוגמה, לקוח אמור לשלוח התראה ברגע שנעשה הליך ברכת יד ראשוני עם השרת.

התראה נראית כך כהודעת JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

התראות שייכות לנושא ב-MCP הנקרא ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

כדי להפעיל את הלוגינג, השרת צריך לאפשר זאת כתכונה/יכולת כך:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> בהתאם ל-SDK בו משתמשים, ייתכן שלוגינג מופעל כברירת מחדל, או שצריך להפעילו מפורשות בקונפיגורציית השרת.

ישנם סוגים שונים של התראות:

| רמה        | תיאור                         | דוגמת מקרה שימוש               |
|------------|-------------------------------|------------------------------|
| debug      | מידע מפורט לבאגים             | נקודות כניסה/יציאה מפונקציה |
| info       | הודעות מידע כלליות            | עדכוני התקדמות בתהליך        |
| notice     | אירועים רגילים אך חשובים     | שינויים בקונפיגורציה          |
| warning    | תנאים של אזהרה               | שימוש בתכונה מיושנת           |
| error      | תנאי שגיאה                   | כשלונות בתהליך               |
| critical   | תנאים קריטיים                | כשלונות ברכיבי מערכת           |
| alert      | פעולה מיידית נדרשת           | זיהוי שגיאת קורוזיה בנתונים  |
| emergency  | המערכת לא שימושית            | כשל מערכת מלא                 |

## יישום התראות ב-MCP

כדי ליישם התראות ב-MCP, יש להגדיר גם צד שרת וגם צד לקוח לטיפול בעדכונים בזמן אמת. זה מאפשר ליישום לספק משוב מיידי למשתמשים במהלך פעולות ארוכות.

### צד שרת: שליחת התראות

נתחיל עם צד השרת. ב-MCP, מגדירים כלים שיכולים לשלוח התראות במהלך עיבוד בקשות. השרת משתמש באובייקט הקשר (בדרך כלל `ctx`) לשליחת הודעות ללקוח.

#### פייתון

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

בדוגמה שלמעלה, כלי `process_files` שולח שלוש התראות ללקוח תוך כדי עיבוד כל קובץ. שיטת `ctx.info()` משמשת לשליחת הודעות מידע.

בנוסף, כדי לאפשר התראות, ודא שהשרת שלך משתמש בטרנספורט ניתנים לשידור (כגון `streamable-http`) והלקוח שלך מיישם מטפל בהודעות לעיבוד ההתראות. כך ניתן להקים את השרת להשתמש בטרנספורט `streamable-http`:

```python
mcp.run(transport="streamable-http")
```

#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```

בדוגמת .NET זו, כלי `ProcessFiles` מקושט בתכונת `Tool` ושולח שלוש התראות ללקוח תוך עיבוד כל קובץ. שיטת `ctx.Info()` משמשת לשליחת הודעות מידע.

כדי לאפשר התראות בשרת MCP ב-.NET, ודא שאתה משתמש בטרנספורט ניתנים לשידור:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### צד לקוח: קבלת התראות

הלקוח חייב לממש מטפל בהודעות לעיבוד והצגת התראות כשהן מגיעות.

#### פייתון

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```

בקוד שלמעלה, פונקציית `message_handler` בודקת אם ההודעה הנכנסת היא התראה. אם כן, היא מדפיסה את ההתראה; אחרת, מעבדת אותה כהודעת שרת רגילה. שים לב גם איך `ClientSession` מאותחלת עם `message_handler` לטיפול בהתראות הנכנסות.

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```

בדוגמת .NET זו, פונקציית `MessageHandler` בודקת אם ההודעה הנכנסת היא התראה. אם כן, מדפיסה את ההתראה; אחרת, מעבדת אותה כהודעת שרת רגילה. `ClientSession` מאותחלת עם מטפל ההודעות דרך `ClientSessionOptions`.

כדי לאפשר התראות, ודא שהשרת משתמש בטרנספורט ניתנים לשידור (כגון `streamable-http`) והלקוח מיישם מטפל בהודעות לעיבוד ההתראות.

## התראות התקדמות ותרחישים

סעיף זה מסביר את מושג התראות ההתקדמות ב-MCP, מדוע הן חשובות, וכיצד ליישמן באמצעות HTTP ניתנים לשידור. תמצא גם תרגיל מעשי לחיזוק ההבנה.

התראות התקדמות הן הודעות בזמן אמת שנשלחות מהשרת ללקוח במהלך פעולות ארוכות טווח. במקום להמתין שהכל יסתיים, השרת מעדכן את הלקוח על הסטטוס הנוכחי. זה משפר שקיפות, חוויית משתמש ומקל על איתור בעיות.

**דוגמה:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### למה להשתמש בהתראות התקדמות?

התראות התקדמות חיוניות ממספר סיבות:

- **שיפור חוויית משתמש:** משתמשים רואים עדכונים בזמן העבודה, לא רק בסוף.
- **משוב בזמן אמת:** לקוחות יכולים להציג פסי התקדמות או לוגים, מה שהופך את האפליקציה לרגישה יותר.
- **איתור באגים ומעקב קל יותר:** מפתחים ומשתמשים רואים איפה תהליך איטי או תקוע.

### איך ליישם התראות התקדמות

כך ניתן ליישם התראות התקדמות ב-MCP:

- **בשרת:** השתמש ב-`ctx.info()` או `ctx.log()` לשליחת התראות כאשר כל פריט מעובד. זאת שולחת הודעה ללקוח לפני שהתוצאה הראשית מוכנה.
- **בלקוח:** הממש מטפל בהודעות שמאזין ומתעדכן בהתראות כשהן מגיעות. המטפל מבחין בין התראות לתוצאה סופית.

**דוגמת שרת:**

#### פייתון

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**דוגמת לקוח:**

#### פייתון

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## שיקולי אבטחה

כשמיישמים שרתים של MCP עם טרנספורטים מבוססי HTTP, אבטחה הופכת לחשובה במיוחד ודורשת תשומת לב קפדנית לווקטורים שונים של התקפה ולמנגנוני הגנה.

### מבוא

אבטחה קריטית כאשר חושפים שרתי MCP דרך HTTP. HTTP ניתנים לשידור מציגים משטחי התקפה חדשים ודורשים קונפיגורציה זהירה.

### נקודות מפתח
- **אימות כותרת Origin**: תמיד אמת את כותרת ה- `Origin` כדי למנוע התקפות DNS rebinding.
- **קשירת localhost**: לפיתוח מקומי, קשר את השרתים ל- `localhost` כדי לא לחשוף אותם לאינטרנט הציבורי.
- **אימות**: יישם אימות (למשל, מפתחות API, OAuth) לפריסות ייצור.
- **CORS**: הגדר מדיניות של שיתוף משאבים בין-מקורית (CORS) כדי להגביל גישה.
- **HTTPS**: השתמש ב-HTTPS בסביבת הייצור כדי להצפין את התעבורה.

### שיטות עבודה מומלצות

- לעולם אל תסמוך על בקשות נכנסות ללא אימות.
- תרשום ונטר את כל הגישה והשגיאות.
- עדכן באופן קבוע את התלויות כדי לתקן פרצות אבטחה.

### אתגרים

- איזון בין אבטחה לנוחות הפיתוח
- הבטחת תאימות עם סביבות לקוח שונות

## שדרוג מ-SSE ל-Streamable HTTP

ליישומים המשתמשים כיום ב-Server-Sent Events (SSE), המעבר ל-Streamable HTTP מספק יכולות משופרות וקיימות לטווח הארוך ליישומי MCP שלך.

### למה לשדרג?

ישנן שתי סיבות מרכזיות לשדרג מ-SSE ל-Streamable HTTP:

- Streamable HTTP מציע מדרגיות טובה יותר, תאימות ותמיכה עשירה יותר בהתראות מאשר SSE.
- זהו התחבורה המומלצת ליישומי MCP חדשים.

### שלבי ההגירה

כך ניתן להגר מ-SSE ל-Streamable HTTP ביישומי MCP שלך:

- **עדכן את קוד השרת** לשימוש ב-`transport="streamable-http"` ב-`mcp.run()`.
- **עדכן את קוד הלקוח** לשימוש ב-`streamablehttp_client` במקום לקוח SSE.
- **יישם מטפל הודעות** בלקוח כדי לעבד התראות.
- **בדוק תאימות** עם כלים וזרמי עבודה קיימים.

### שמירת תאימות

מומלץ לשמור על תאימות עם לקוחות SSE קיימים במהלך תהליך ההגירה. הנה כמה אסטרטגיות:

- ניתן לתמוך גם ב-SSE וגם ב-Streamable HTTP על ידי הפעלת שני התחבורה בנקודות קצה שונות.
- העבר בהדרגה את הלקוחות לתחבורה החדשה.

### אתגרים

וודא שאתה מתמודד עם האתגרים הבאים במהלך ההגירה:

- הבטחת שכל הלקוחות מעודכנים
- טיפול בהבדלים במתן ההתראות

## שיקולי אבטחה

אבטחה צריכה להיות עדיפות עליונה כאשר מיישמים כל שרת, במיוחד בשימוש בתחבורה מבוססת HTTP כמו Streamable HTTP ב-MCP.

בעת יישום שרתי MCP עם תחבורה מבוססת HTTP, האבטחה הופכת לנושא מרכזי הדורש תשומת לב זהירה לווקטורי התקפה ולמנגנוני הגנה מרובים.

### סקירה כללית

אבטחה היא קריטית כאשר חושפים שרתי MCP דרך HTTP. Streamable HTTP מציג משטחים חדשים להתקפה ודורש הגדרות מדויקות.

הנה כמה שיקולי אבטחה מרכזיים:

- **אימות כותרת Origin**: תמיד אמת את כותרת ה- `Origin` כדי למנוע התקפות DNS rebinding.
- **קשירת localhost**: לפיתוח מקומי, קשר את השרתים ל- `localhost` כדי לא לחשוף אותם לאינטרנט הציבורי.
- **אימות**: יישם אימות (למשל, מפתחות API, OAuth) לפריסות ייצור.
- **CORS**: הגדר מדיניות של שיתוף משאבים בין-מקורית (CORS) כדי להגביל גישה.
- **HTTPS**: השתמש ב-HTTPS בסביבת הייצור כדי להצפין את התעבורה.

### שיטות עבודה מומלצות

בנוסף, הנה כמה שיטות עבודה מומלצות לעקוב כשמיישמים אבטחה בשרת הזרמת MCP שלך:

- לעולם אל תסמוך על בקשות נכנסות ללא אימות.
- תרשום ונטר את כל הגישה והשגיאות.
- עדכן באופן קבוע את התלויות כדי לתקן פרצות אבטחה.

### אתגרים

תתמודד עם אתגרים מסוימים בעת יישום אבטחה בשרתי הזרמת MCP:

- איזון בין אבטחה לנוחות הפיתוח
- הבטחת תאימות עם סביבות לקוח שונות

### משימה: בנה אפליקציית Streaming MCP משלך

**תרחיש:**
בנה שרת MCP ולקוח שבהם השרת מעבד רשימת פריטים (למשל, קבצים או מסמכים) ושולח התראה עבור כל פריט שמעובד. הלקוח יציג כל התראה כשהיא מגיעה.

**שלבים:**

1. יישם כלי שרת שמעבד רשימה ושולח התראות עבור כל פריט.
2. יישם לקוח עם מטפל הודעות להצגת ההתראות בזמן אמת.
3. בדוק את היישום שלך על ידי הרצת השרת והלקוח וצפה בהתראות.

[Solution](./solution/README.md)

## קריאה נוספת ומה הלאה?

כדי להמשיך במסע שלך עם הזרמת MCP ולהרחיב את הידע שלך, חלק זה מספק משאבים נוספים ושלבים מוצעים לבניית יישומים מתקדמים יותר.

### קריאה נוספת

- [Microsoft: מבוא להזרמת HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: אירועי שרת נשלחים (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS ב-ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: בקשות סטרימינג](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### מה הלאה?

- נסה לבנות כלים מתקדמים יותר ל-MCP שמשתמשים בזרימה לניתוחים בזמן אמת, צ׳אט או עריכה שיתופית.
- חקור אינטגרציה של זרימת MCP עם פריימוורקי פרונטאנד (React, Vue וכו׳) לעדכוני UI חיים.
- הבא: [שימוש ב-AI Toolkit ל-VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->