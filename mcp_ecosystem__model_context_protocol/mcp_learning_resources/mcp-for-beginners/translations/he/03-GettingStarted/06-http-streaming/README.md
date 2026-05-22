# הזרמת HTTPS עם פרוטוקול הקשר למודל (MCP)

פרק זה מספק מדריך מקיף ליישום הזרמת זמן אמת מאובטחת, מדרגתית ובזמן אמת עם פרוטוקול הקשר למודל (MCP) באמצעות HTTPS. הוא מכסה את המוטיבציה לזרימה, מנגנוני ההעברה הזמינים, איך ליישם HTTP מסוג זרימה ב-MCP, שיטות אבטחה מומלצות, מעבר מ-SSE והנחיות מעשיות לבניית יישומי MCP עם יכולות הזרמה משלך.

## מנגנוני העברה והזרמה ב-MCP

קטע זה בוחן את מנגנוני ההעברה השונים הזמינים ב-MCP ואת תפקידם באפשרות להזרמה לתקשורת בזמן אמת בין לקוחות לשרתים.

### מהו מנגנון העברה?

מנגנון העברה מגדיר כיצד מידע מוחלף בין הלקוח לשרת. MCP תומך במספר סוגי העברה כדי להתאים לסביבות ודרישות שונות:

- **stdio**: קלט/פלט סטנדרטי, מתאים לכלים מקומיים ומבוססי שורת פקודה. פשוט אך לא מתאים לאינטרנט או ענן.
- **SSE (Server-Sent Events)**: מאפשר לשרתים לדחוף עדכונים בזמן אמת ללקוחות דרך HTTP. טוב לממשקי רשת, אך מוגבל בקנה מידה וגמישות. מאז מפרט MCP מ-2025-06-18, מונע שימוש במנגנון SSE עצמאי והוחלף בהעברת "Streamable HTTP".
- **Streamable HTTP**: העברת הזרמה מודרנית מבוססת HTTP, התומכת בהתראות וסקלאביליות משופרת. מומלץ לתרחישי הפקה וענן רבים.

### טבלת השוואה

הסתכל בטבלת ההשוואה למטה להבנת ההבדלים בין מנגנוני ההעברה הללו:

| העברה             | עדכוני זמן אמת   | הזרמה     | סקלאביליות | תרחיש שימוש           |
|-------------------|-----------------|-----------|-------------|------------------------|
| stdio             | לא              | לא        | נמוכה      | כלים מקומיים CLI      |
| SSE               | כן              | כן        | בינונית    | אינטרנט, עדכוני זמן אמת|
| Streamable HTTP   | כן              | כן        | גבוהה      | ענן, לקוחות מרובים    |

> **טיפ:** בחירת מנגנון ההעברה הנכון משפיעה על ביצועים, מדרגיות וחווית משתמש. מומלץ להשתמש ב-**Streamable HTTP** ליישומים מודרניים, מדרגיים ומוכנים לענן.

שים לב למנגנוני ההעברה stdio ו-SSE שהוצגו בפרקים הקודמים ואיך Streamable HTTP הוא מנגנון ההעברה שמכוסה בפרק זה.

## הזרמה: מושגים ומוטיבציה

הבנת המושגים והסיבות הבסיסיות להזרמה חיונית ליישום מערכות תקשורת זמן אמת יעילות.

**הזרמה** היא טכניקה בתכנות רשת המאפשרת לשלוח ולקבל מידע בחתיכות קטנות וניהוליות או כרצף אירועים, במקום להמתין לתגובה מלאה. זה שימושי במיוחד ל:

- קבצים גדולים או אוספי נתונים.
- עדכוני זמן אמת (כגון צ'אט, סרגלי התקדמות).
- חישובים ארוכי טווח שבהם רוצים לשמור על המשתמש מעודכן.

הנה מה שחשוב לדעת על הזרמה ברמת העל:

- המידע נמסר בהדרגה, לא בבת אחת.
- הלקוח יכול לעבד מידע כשהוא מגיע.
- מפחית תוחלת זמן נתפסת ומשפר חווית משתמש.

### למה להשתמש בהזרמה?

הסיבות לשימוש בהזרמה הן:

- המשתמשים מקבלים משוב מיידי, לא רק בסוף התהליך
- מאפשר יישומים בזמן אמת וממשקי משתמש רגישים
- שימוש יעיל יותר ברשת ובמשאבי עיבוד

### דוגמה פשוטה: שרת ולקוח HTTP זרימה

הנה דוגמה פשוטה איך אפשר ליישם הזרמה:

#### Python

**שרת (פייתון, בשימוש FastAPI ו-StreamingResponse):**

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

**לקוח (פייתון, בשימוש requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

דוגמה זו ממחישה שרת השולח סדרת הודעות ללקוח כשהן מוכנות, במקום להמתין שכל ההודעות יהיו מוכנות במלואן.

**איך זה עובד:**

- השרת מפיק כל הודעה כשהיא מוכנה.
- הלקוח מקבל ומדפיס כל חתיכה כשהיא מגיעה.

**דרישות:**

- השרת צריך להשתמש בתגובה מסוג זרימה (למשל `StreamingResponse` ב-FastAPI).
- הלקוח צריך לעבד את התגובה כסטרים (`stream=True` בבקשות).
- תוכן-סוג בדרך כלל `text/event-stream` או `application/octet-stream`.

#### Java

**שרת (ג'אווה, בשימוש Spring Boot ו-Server-Sent Events):**

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

**לקוח (ג'אווה, בשימוש Spring WebFlux WebClient):**

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

**הערות למימוש בג'אווה:**

- משתמש בערימת Spring Boot תגובתית עם `Flux` להזרמה
- `ServerSentEvent` מספק זרימת אירועים מובנית עם סוגי אירועים
- `WebClient` עם `bodyToFlux()` מאפשר צריכת הורדה תגובתית
- `delayElements()` מדמה עיבוד בין אירועים
- לאירועים יכולים להיות סוגים (`info`, `result`) לטיפול טוב יותר בלקוח

### השוואה: הזרמה קלאסית מול הזרמת MCP

ההבדלים בין איך שהזרמה פועלת באופן "קלאסי" לבין איך שהיא פועלת ב-MCP מובאים כך:

| תכונה                  | הזרמת HTTP קלאסית            | הזרמת MCP (התראות)               |
|------------------------|------------------------------|----------------------------------|
| תגובה עיקרית           | מוטענת בחתיכות                | תגובה יחידה, בסיום             |
| עדכוני התקדמות          | נשלחים כחלקי מידע             | נשלחים כהודעות התראה           |
| דרישות לקוח            | חייב לעבד זרם               | חייב לממש מטפל בהודעות           |
| תרחיש שימוש           | קבצים גדולים, זרמי טוקנים AI | התקדמות, לוגים, משוב בזמן אמת |

### הבדלים עיקריים שנצפו

עוד כמה הבדלים עיקריים:

- **דפוס תקשורת:**
  - הזרמת HTTP קלאסית: משתמשת בקידוד העברה בחתיכות פשוט להפצת מידע
  - הזרמת MCP: משתמשת במערכת התראות מובנית עם פרוטוקול JSON-RPC

- **מבנה הודעה:**
  - HTTP קלאסי: חתיכות טקסט פשוט עם שורות חדשות
  - MCP: אובייקטים מובנים מסוג LoggingMessageNotification עם מטא-נתונים

- **מימוש צד לקוח:**
  - HTTP קלאסי: לקוח פשוט שמעבד תגובות הזרמה
  - MCP: לקוח מתקדם עם מטפל בהודעות לטיפול בסוגי הודעות שונים

- **עדכוני התקדמות:**
  - HTTP קלאסי: ההתקדמות חלק מזרם התגובה הראשי
  - MCP: התקדמות נשלחת כהודעות התראה נפרדות בזמן שהתשובה הראשית מגיעה בסוף

### המלצות

יש כמה דברים שמומלץ לשקול בבחירת מימוש הזרמה קלאסית (כמו בקצה שהראנו עם `/stream`) לעומת הזרמת MCP.

- **לצרכי הזרמה פשוטים:** הזרמת HTTP קלאסית פשוטה יותר ליישום ומספקת צורך בסיסי.

- **ליישומים מורכבים ואינטראקטיביים:** הזרמת MCP מספקת גישה מובנית עם מטא-נתונים עשירים והפרדה בין התראות לתוצאות סופיות.

- **ליישומי AI:** מערכת ההתראות של MCP שימושית במיוחד למשימות AI ארוכות שבהן רוצים לשמור על המשתמש מעודכן בהתקדמות.

## הזרמה ב-MCP

טוב, ראיתם כבר המלצות והשוואות להבדלים בין הזרמה קלאסית להזרמת MCP. עכשיו נצלול לפרטים איך בדיוק ניתן לנצל הזרמה ב-MCP.

הבנת אופן הפעולה של הזרמה במסגרת MCP חיונית לבניית יישומים רגישים המספקים משוב בזמן אמת למשתמשים במהלך פעולות ארוכות.

ב-MCP, הזרמה אינה על שליחת התגובה הראשית בחתיכות, אלא על שליחת **התראות** ללקוח בזמן שהכלי מעבד בקשה. התראות אלו יכולות לכלול עדכוני התקדמות, לוגים או אירועים אחרים.

### איך זה עובד

התוצאה העיקרית עדיין נשלחת כתשובה אחת. עם זאת, התראות יכולות להישלח כהודעות נפרדות במהלך העיבוד וכך לעדכן את הלקוח בזמן אמת. הלקוח חייב להיות מסוגל לטפל ולהציג את ההתראות.

## מהי התראה?

אמרנו "התראה", מה משמעותה בהקשר של MCP?

התראה היא הודעה שנשלחת מהשרת ללקוח כדי להודיע על התקדמות, סטטוס או אירועים אחרים במהלך פעולה ארוכת טווח. התראות משפרות שקיפות וחווית משתמש.

לדוגמה, לקוח אמור לשלוח התראה כאשר נעשה הידוק ראשוני לשרת.

התראה נראית כך בהודעת JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

התראות שייכות לנושא במ MCP המכונה ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

כדי להפעיל לוגינג, השרת צריך לאפשר זאת כתכונה/יכולת כך:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> בהתאם ל-SDK המשמש, ייתכן שהלוגינג מופעל כברירת מחדל, או שתצטרכו לאפשרו במפורש בהגדרות השרת שלכם.

ישנם סוגים שונים של התראות:

| רמה       | תיאור                         | דוגמת שימוש               |
|-----------|-------------------------------|----------------------------|
| debug     | מידע מפורט לניפוי שגיאות       | נקודות כניסה/יציאה פונקציות |
| info      | הודעות מידע כלליות              | עדכוני התקדמות בפעולה       |
| notice    | אירועים רגילים אך משמעותיים    | שינויים בקונפיגורציה         |
| warning   | תנאי אזהרה                    | שימוש בתכונה מיושנת          |
| error     | תנאי שגיאה                   | כשלים בפעולה               |
| critical  | תנאים קריטיים                | כשלים ברכיבי מערכת          |
| alert     | יש לנקוט פעולה מיידית          | זיהוי נזק לנתונים           |
| emergency | המערכת לא ניתנת לשימוש         | כשל מערכתי מלא             |

## יישום התראות ב-MCP

כדי ליישם התראות ב-MCP, יש להגדיר הן צד שרת והן צד לקוח לטיפול בעדכונים בזמן אמת. זה מאפשר ליישום שלך לספק משוב מיידי למשתמשים במהלך פעולות ארוכות טווח.

### צד שרת: שליחת התראות

נתחיל מצד השרת. ב-MCP, מגדירים כלי שיכול לשלוח התראות תוך כדי עיבוד בקשות. השרת משתמש באובייקט הקשר (בדרך כלל `ctx`) כדי לשלוח הודעות ללקוח.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

בדוגמה הקודמת, הכלי `process_files` שולח שלוש התראות ללקוח תוך כדי עיבוד כל קובץ. השיטה `ctx.info()` משמשת לשליחת הודעות מידע.

בנוסף, כדי לאפשר התראות, ודא שהשרת משתמש במנגנון העברה מסוג זרימה (כגון `streamable-http`) ושהלקוח מיישם מטפל בהודעות לעיבוד התראות. כך תוכל להגדיר את השרת להשתמש במנגנון ההעברה `streamable-http`:

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

בדוגמה זו ב-.NET, הכלי `ProcessFiles` מקושט בתכונת `Tool` ושולח שלוש התראות ללקוח תוך כדי עיבוד כל קובץ. השיטה `ctx.Info()` משמשת לשליחת הודעות מידע.

כדי לאפשר התראות בשרת MCP שלך ב-.NET, ודא שאתה משתמש במנגנון העברה מסוג זרימה:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### צד לקוח: קבלת התראות

הלקוח חייב לממש מטפל בהודעות לעיבוד ולהציג התראות כשהן מגיעות.

#### Python

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

בקוד המוצג קודם, הפונקציה `message_handler` בודקת אם ההודעה המגיעה היא התראה. אם כן, היא מדפיסה את ההתראה; אחרת היא מעבדת אותה כהודעת שרת רגילה. שים לב גם איך `ClientSession` מאותחלת עם `message_handler` לטיפול בהתראות נכנסות.

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

בדוגמה זו ב-.NET, הפונקציה `MessageHandler` בודקת אם ההודעה המגיעה היא התראה. אם כן, היא מדפיסה את ההתראה; אחרת היא מעבדת אותה כהודעת שרת רגילה. ה-`ClientSession` מאותחל עם מטפל ההודעות דרך `ClientSessionOptions`.

כדי לאפשר התראות, ודא שהשרת משתמש במנגנון העברה מסוג זרימה (כגון `streamable-http`) ושהלקוח מיישם מטפל בהודעות לעיבוד התראות.

## התראות התקדמות ותסריטים

קטע זה מסביר את מושג התראות ההתקדמות ב-MCP, למה הן חשובות וכיצד ליישמן באמצעות Streamable HTTP. כמו כן נמצא משימה מעשית לחיזוק הבנתך.

התראות התקדמות הן הודעות בזמן אמת שנשלחות מהשרת ללקוח במהלך פעולות ארוכות. במקום להמתין לתהליך כולו שיסתיים, השרת מעדכן את הלקוח על הסטטוס הנוכחי. זה משפר שקיפות, חווית משתמש ומקל על איתור תקלות.

**דוגמה:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### למה להשתמש בהתראות התקדמות?

התראות התקדמות חיוניות ממספר סיבות:

- **חווית משתמש טובה יותר:** המשתמשים רואים עדכונים תוך כדי העבודה, לא רק בסוף.
- **משוב בזמן אמת:** הלקוחות יכולים להציג סרגלי התקדמות או לוגים, מה שהופך את היישום לרגיש.
- **קלות בניפוי שגיאות ומעקב:** מפתחים ומשתמשים יכולים לראות איפה תהליך איטי או תקוע.

### איך ליישם התראות התקדמות

כך ניתן ליישם התראות התקדמות ב-MCP:

- **בשרת:** השתמש ב-`ctx.info()` או `ctx.log()` כדי לשלוח התראות עם עיבוד כל פריט. זה שולח הודעה ללקוח לפני שהתוצאה הראשית מוכנה.
- **בלקוח:** יישם מטפל בהודעות שמאזין ומציג התראות כשהן מגיעות. מטפל זה מבדיל בין התראות לתוצאה הסופית.

**דוגמת שרת:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**דוגמת לקוח:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## שיקולי אבטחה

בעת יישום שרתי MCP עם העברות מבוססות HTTP, האבטחה היא נושא עליון המחייב תשומת לב רבה לווקטורי תקיפה מגוונים ומנגנוני הגנה.

### סקירה כללית

אבטחה חיונית כאשר חושפים שרתי MCP דרך HTTP. Streamable HTTP מציג משטחי תקיפה חדשים ודורש תצורה קפדנית.

### נקודות עיקריות

- **וודאות באימות כותרת Origin**: תמיד אמת כותרת `Origin` כדי למנוע התקפות DNS rebinding.
- **התחברות ל-localhost**: לפיתוח מקומי, חסם שרתים לכתובת `localhost` כדי למנוע חשיפה לציבור.
- **אימות**: יישם אימות (כגון מפתחות API, OAuth) לפריסות הפקה.
- **CORS**: קבע מדיניות שיתוף בין מקורות (CORS) להגבלת גישה.
- **HTTPS**: השתמש ב-HTTPS בייצור להצפנת תעבורה.

### שיטות עבודה מומלצות

- אל תבטח בבקשות נכנסות ללא אימות.
- פקח ורשום כל גישה ושגיאה.
- עדכן באופן שוטף תלותיות כדי לתקן פגיעויות אבטחה.

### אתגרים
- איזון בין אבטחה לנוחות בפיתוח  
- הבטחת תאימות לסביבות לקוח שונות  

## שדרוג מ-SSE ל-Streamable HTTP

לעבור מ-Server-Sent Events (SSE) ל-Streamable HTTP עבור אפליקציות קיימות מעניק יכולות משופרות ועמידות טובה יותר לטווח הארוך ליישומי MCP שלך.

### למה לשדרג?

יש שתי סיבות משכנעות לשדרג מ-SSE ל-Streamable HTTP:

- Streamable HTTP מציע מדרגיות טובה יותר, תאימות רחבה יותר, ותמיכה מעשירה בהתראות בהשוואה ל-SSE.  
- זו הדרך המומלצת להעברת מידע עבור אפליקציות MCP חדשות.  

### שלבי ההסבה

כך תוכל להסב מ-SSE ל-Streamable HTTP באפליקציות MCP שלך:

- **עדכן את קוד השרת** לשימוש ב-`transport="streamable-http"` ב-`mcp.run()`.  
- **עדכן את קוד הלקוח** לשימוש ב-`streamablehttp_client` במקום לקוח SSE.  
- **מימשול מטפל הודעות** בלקוח לטיפול בהודעות ההתראה.  
- **בדוק תאימות** עם כלים וזרימות עבודה קיימות.  

### שמירת תאימות

מומלץ לשמור על תאימות עם לקוחות SSE קיימים במהלך תהליך ההסבה. הנה כמה אסטרטגיות:

- ניתן לתמוך גם ב-SSE וגם ב-Streamable HTTP על ידי הפעלת שני סוגי ההעברות בנקודות קצה שונות.  
- להסב לקוחות בהדרגה לסוג ההעברה החדש.  

### אתגרים

יש להתייחס לאתגרים הבאים במהלך ההסבה:

- הבטחת עדכון כל הלקוחות  
- טיפול בהבדלים בשיטת משלוח ההתראות  

## שיקולי אבטחה

אבטחה צריכה להיות בעדיפות עליונה בעת מימוש שרת, במיוחד בשימוש בהעברות מבוססות HTTP כמו Streamable HTTP ב-MCP.

בעת מימוש שרתי MCP עם העברות HTTP יש להתייחס בקפידה לנקודות התקפה שונות ולמנגנוני הגנה.

### סקירה כללית

אבטחה היא קריטית בעת הפעלת שרתי MCP דרך HTTP. Streamable HTTP מציג משטחים חדשים להתקפות ודורש קונפיגורציה זהירה.

הנה כמה שיקולים חשובים לאבטחה:

- **אימות כותרת Origin**: תמיד לאמת את כותרת `Origin` כדי למנוע התקפות DNS rebinding.  
- **קשירת localhost**: לפיתוח מקומי, לקשור את השרת ל-`localhost` כדי לא לחשוף אותו לאינטרנט הפתוח.  
- **אימות**: מימוש אימות (לדוגמה, מפתחות API, OAuth) לפרודקשן.  
- **CORS**: קונפיגורציית מדיניות שיתוף חוצה-מקור (CORS) להגבלת הגישה.  
- **HTTPS**: שימוש ב-HTTPS בפרודקשן להצפנת תעבורה.  

### המלצות לנוהג מיטבי

בנוסף, כדאי לפעול לפי ההמלצות הבאות בעת מימוש אבטחה בשרת הפצת MCP שלך:

- לא לבטוח בבקשות נכנסות ללא אימות.  
- לנהל רישום ומעקב אחרי כל הגישה והשגיאות.  
- לעדכן תלויות באופן קבוע ולתקן פרצות אבטחה.  

### אתגרים

בעת מימוש אבטחה בשרתי הפצת MCP תיתקל באתגרים כגון:

- איזון בין אבטחה לנוחות בפיתוח  
- הבטחת תאימות לסביבות לקוח שונות  

### מטלה: בנה אפליקציית MCP Streaming משלך

**תיאור התרחיש:**  
בנה שרת ולקוח MCP כאשר השרת מעבד רשימת פריטים (למשל, קבצים או מסמכים) ושולח התראה עבור כל פריט שמעובד. הלקוח ידרג כל התראה בשידור חי.

**שלבים:**  

1. מימש כלי שרת שמעבד רשימה ושולח התראות לכל פריט.  
2. מימש לקוח עם מטפל הודעות להצגת ההתראות בזמן אמת.  
3. בדוק את המימוש על ידי הפעלת השרת והלקוח וצפה בקליטת ההתראות.  

[פתרון](./solution/README.md)  

## קריאה נוספת ומה הלאה?

כדי להמשיך במסע שלך עם MCP streaming ולהרחיב את הידע, סעיף זה מציע משאבים נוספים והצעדים הבאים לבניית אפליקציות מתקדמות יותר.

### קריאה נוספת

- [Microsoft: מבוא ל-HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)  
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Microsoft: CORS ב-ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)  

### מה הלאה?

- נסה לבנות כלים מתקדמים יותר ב-MCP המשתמשים בשידור עבור ניתוחים בזמן אמת, צ’אט או עריכה שיתופית.  
- חקור אינטגרציה של MCP streaming עם מסגרות frontend (React, Vue וכו’) לעדכוני ממשק משתמש חיים.  
- הלאה: [שימוש בערכת כלי AI עבור VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->