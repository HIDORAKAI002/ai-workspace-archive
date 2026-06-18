# שרת MCP עם תעבורת stdio

> **⚠️ עדכון חשוב**: החל מ-MCP Specification 2025-06-18, תעבורת SSE (Server-Sent Events) עצמאית ה **הודחה** והוחלפה בתעבורת "Streamable HTTP". מפרט ה-MCP הנוכחי מגדיר שתי מנגנוני תעבורה עיקריים:
> 1. **stdio** - קלט/פלט סטנדרטי (מומלץ לשרתים מקומיים)
> 2. **Streamable HTTP** - לשרתים מרוחקים שעשויים להשתמש ב-SSE פנימית
>
> שיעור זה עודכן להתרכז בתעבורת **stdio**, שהיא הגישה המומלצת לרוב יישומי שרת MCP.

תעבורת stdio מאפשרת לשרתים ב-MCP לתקשר עם לקוחות דרך זרמי קלט ופלט סטנדרטיים. זו מנגנון התעבורה הנפוץ והמומלץ במפרט ה-MCP הנוכחי, המספק דרך פשוטה ויעילה לבניית שרתי MCP שניתן לשלבם בקלות עם יישומי לקוח שונים.

## סקירה כללית

בשיעור זה נעבור כיצד לבנות ולצרוך שרתי MCP באמצעות תעבורת stdio.

## מטרות הלימוד

בסיום שיעור זה תוכל:

- לבנות שרת MCP המשתמש בתעבורת stdio.
- לנפות שגיאות בשרת MCP באמצעות Inspector.
- לצרוך שרת MCP באמצעות Visual Studio Code.
- להבין את מנגנוני התעבורה הקיימים במפרט MCP ולמה stdio מומלץ.

## תעבורת stdio - איך זה עובד

תעבורת stdio היא אחת משתי סוגי התעבורה הנתמכים במפרט ה-MCP הנוכחי (2025-11-25). כך זה עובד:

- **תקשורת פשוטה**: השרת קורא הודעות JSON-RPC מזרם הקלט הסטנדרטי (`stdin`) ושולח הודעות לזרם הפלט הסטנדרטי (`stdout`).
- **מבוסס תהליך**: הלקוח מפעיל את שרת MCP כתהליך משני.
- **פורמט הודעה**: ההודעות הן בקשות, התראות או תגובות JSON-RPC נפרדות, מופרדות בשורות חדשות.
- **רישום**: השרת יכול לכתוב מחרוזות UTF-8 לזרם השגיאות הסטנדרטי (`stderr`) לצורך רישום.

### דרישות מפתח:
- ההודעות חייבות להיות מופרדות בשורות חדשות ואסור שיכילו שורות חדשות מוטמעות
- השרת אסור שיכתוב ל-`stdout` דבר שאינו הודעת MCP תקינה
- הלקוח אסור שיכתוב ל-`stdin` של השרת דבר שאינו הודעת MCP תקינה

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

בקוד שלעיל:

- אנו מייבאים את המחלקה `Server` ואת `StdioServerTransport` מ-SDK של MCP
- יוצרים מופע שרת עם הגדרות בסיסיות ויכולות
- יוצרים מופע `StdioServerTransport` ומחברים אליו את השרת, מאפשרים תקשורת דרך stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# צור מופע שרת
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

בקוד שלמעלה אנו:

- יוצרים מופע שרת באמצעות SDK של MCP
- מגדירים כלים בעזרת דקורטורים
- משתמשים במנהל ההקשר stdio_server לניהול התעבורה

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

ההבדל המרכזי מ-SSE הוא ששרתות stdio:

- אינם דורשים הגדרת שרת ווב או נקודות קצה HTTP
- מופעלים כתהליכים משניים על ידי הלקוח
- מתקשרים דרך זרמי stdin ו-stdout
- פשוטים יותר ליישום ולניפוי שגיאות

## תרגיל: יצירת שרת stdio

על מנת ליצור את השרת שלנו, עלינו לזכור שני דברים:

- עלינו להשתמש בשרת ווב כדי לחשוף נקודות קצה לחיבור והודעות.
## מעבדה: יצירת שרת MCP stdio פשוט

במעבדה זו נבנה שרת MCP פשוט באמצעות תעבורת stdio המומלצת. שרת זה יחשוף כלים שהלקוחות יוכלו לקרוא להם באמצעות פרוטוקול Model Context הסטנדרטי.

### דרישות מוקדמות

- Python 3.8 או חדש יותר
- MCP Python SDK: `pip install mcp`
- הבנה בסיסית של תכנות אסינכרוני

נתחיל ביצירת שרת stdio MCP ראשון שלנו:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# הגדר רישום
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# צור את השרת
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # השתמש בהעברת stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## הבדלים מרכזיים מהגישה הישנה של SSE שהודחה

**תעבורת stdio (תקן נוכחי):**
- מודל תהליך משני פשוט - הלקוח מפעיל את השרת כתהליך ילד
- תקשורת דרך stdin/stdout עם הודעות JSON-RPC
- אין צורך בהגדרת שרת HTTP
- ביצועים וביטחון טובים יותר
- ניפוי שגיאות ופיתוח נוחים יותר

**תעבורת SSE (הודחה מ- MCP 2025-06-18):**
- דרש שרת HTTP עם נקודות קצה SSE
- הגדרה מורכבת עם תשתית שרת ווב
- שיקולי אבטחה נוספים לנקודות קצה HTTP
- מוחלף כעת ב-Streamable HTTP לתרחישים מבוססי ווב

### יצירת שרת עם תעבורת stdio

כדי ליצור את שרת ה-stdio שלנו, עלינו:

1. **לייבא את הספריות הנדרשות** - צריך את רכיבי שרת MCP ותעבורת stdio
2. **ליצור מופע שרת** - להגדיר את השרת עם יכולותיו
3. **להגדיר כלים** - להוסיף את הפונקציונליות שברצוננו לחשוף
4. **להגדיר את התעבורה** - להגדיר את תקשורת ה-stdio
5. **להפעיל את השרת** - להתחיל את השרת ולטפל בהודעות

נתחיל לבנות שלב אחר שלב:

### שלב 1: יצירת שרת stdio בסיסי

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# הגדר רישום
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# צור את השרת
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### שלב 2: הוספת כלים נוספים

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### שלב 3: הרצת השרת

שמור את הקוד כ-`server.py` והרץ אותו משורת הפקודה:

```bash
python server.py
```

השרת יתחיל ויחכה לקלט מ-stdin. הוא מתקשר באמצעות הודעות JSON-RPC דרך תעבורת stdio.

### שלב 4: בדיקה עם Inspector

ניתן לבדוק את השרת באמצעות MCP Inspector:

1. התקן את Inspector: `npx @modelcontextprotocol/inspector`
2. הפעל את Inspector וכוון אותו אל השרת שלך
3. בדוק את הכלים שיצרת

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## ניפוי שגיאות לשרת stdio שלך

### שימוש ב-MCP Inspector

MCP Inspector הוא כלי שימושי לניפוי שגיאות ובדיקת שרתי MCP. כך תשתמש בו עם שרת stdio שלך:

1. **התקן את Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **הפעל את Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **בדוק את השרת שלך**: ה-Inspector מספק ממשק ווב שבו תוכל:
   - לצפות ביכולות השרת
   - לבדוק כלים עם פרמטרים שונים
   - לפקח על הודעות JSON-RPC
   - לנפות בעיות חיבור

### שימוש ב-VS Code

תוכל גם לנפות שגיאות לשרת MCP ישירות ב-VS Code:

1. צור קובץ הגדרות הפעלה ב-`.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. הגדר נקודות עצירה בקוד השרת שלך
3. הפעל את הניפוי ובדוק עם Inspector

### טיפים לניפוי שגיאות נפוצים

- השתמש ב-`stderr` לרישום - לעולם אל תכתוב ל-`stdout` שכן שמור להודעות MCP
- וודא שכל הודעות JSON-RPC מופרדות בשורות חדשות
- בדוק עם כלים פשוטים לפני הוספת פונקציונליות מורכבת
- השתמש ב-Inspector לוודא פורמטי הודעות

## צריכת שרת stdio ב-VS Code

לאחר שבנית את שרת stdio של MCP, תוכל לשלבו עם VS Code לשימוש עם Claude או לקוחות MCP אחרים.

### הגדרות

1. **צור קובץ הגדרות MCP** בכתובת `%APPDATA%\Claude\claude_desktop_config.json` (ווינדוס) או `~/Library/Application Support/Claude/claude_desktop_config.json` (מק):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **אתחל מחדש את Claude**: סגור ופתח מחדש את Claude לטעינת תצורת השרת החדשה.

3. **בדוק את החיבור**: התחל שיחה עם Claude ונסה להשתמש בכלי השרת שלך:
   - "האם תוכל לברך אותי באמצעות כלי הברכה?"
   - "חשב את סכום 15 ו-27"
   - "מהם פרטי השרת?"

### דוגמת שרת stdio ב-TypeScript

הנה דוגמה מלאה ב-TypeScript כהפניה:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// הוסף כלים
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### דוגמת שרת stdio ב-.NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## סיכום

בשיעור המעודכן למדת כיצד:

- לבנות שרתים ב-MCP באמצעות תעבורת **stdio** הנוכחית (הגישה המומלצת)
- להבין מדוע תעבורת SSE הודחה לטובת stdio ו-Streamable HTTP
- ליצור כלים שניתן לקרוא להם מלקוחות MCP
- לנפות שגיאות לשרת שלך באמצעות MCP Inspector
- לשלב את שרת stdio שלך עם VS Code ו-Claude

תעבורת stdio מספקת דרך פשוטה, מאובטחת וביצועית יותר לבניית שרתי MCP בהשוואה לגישת SSE שהודחה. זו התעבורה המומלצת לרוב היישומים של שרתי MCP לפי מפרט 2025-06-18.


### .NET

1. נתחיל ביצירת כלים, לשם כך ניצור קובץ *Tools.cs* עם התוכן הבא:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## תרגיל: בדיקת שרת stdio שלך

כעת לאחר שבנית את שרת ה-stdio שלך, נבחן אותו לוודא שהוא עובד כראוי.

### דרישות מוקדמות

1. ודא שהתקנת את MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. יש לשמור את קוד השרת (למשל כ-`server.py`)

### בדיקה עם Inspector

1. **הפעל את Inspector עם השרת שלך**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **פתח את ממשק האינטרנט**: ה-Inspector יפתח חלון דפדפן המציג את יכולות השרת.

3. **בדוק את הכלים**:
   - נסה את הכלי `get_greeting` עם שמות שונים
   - בדוק את הכלי `calculate_sum` עם מספרים שונים
   - קרא לכלי `get_server_info` כדי לראות מטא-נתוני השרת

4. **עקוב אחר התקשורת**: ה-Inspector מציג את הודעות JSON-RPC המתחלפות בין הלקוח לשרת.

### מה שתראה

כאשר השרת יפעל כראוי, תראה:
- רשימת יכולות השרת ב-Inspector
- כלים זמינים לבדיקה
- חילופי הודעות JSON-RPC מוצלחים
- תגובות הכלים מוצגות בממשק

### תקלות נפוצות ופתרונות

**השרת לא מתחיל:**
- בדוק שכל התלויות מותקנות: `pip install mcp`
- ודא תחביר וכתיבה נכונים בפייתון
- חפש הודעות שגיאה בקונסול

**כלים לא מופיעים:**
- ודא שקיימים דקורטורים `@server.tool()`
- בדוק שפעולות הכלים מוגדרות לפני `main()`
- בדוק שהשרת מוגדר נכון

**בעיות חיבור:**
- ודא שהשרת משתמש נכון בתעבורת stdio
- ודא שאין תהליכים אחרים החוסמים
- בדוק תחביר הפקודה של Inspector

## משימה

נסה להרחיב את השרת שלך עם יכולות נוספות. ראה את [הדף הזה](https://api.chucknorris.io/) כדי, למשל, להוסיף כלי שקורא ל-API. אתה מחליט כיצד ייראה השרת. בהצלחה :)

## פתרון

[פתרון](./solution/README.md) הנה פתרון אפשרי עם קוד שעובד.

## נקודות עיקריות

הנקודות המרכזיות בפרק זה הן:

- תעבורת stdio היא המנגנון המומלץ לשרתים מקומיים ב-MCP.
- תעבורת stdio מאפשרת תקשורת חלקה בין שרתי MCP ללקוחות באמצעות זרמי קלט ופלט סטנדרטיים.
- אפשר להשתמש גם ב-Inspector וגם ב-Visual Studio Code לצריכת שרתי stdio באופן ישיר, מה שהופך את הניפוי והשילוב לפשוטים.

## דוגמאות 

- [מחשבון Java](../samples/java/calculator/README.md)
- [מחשבון .Net](../../../../03-GettingStarted/samples/csharp)
- [מחשבון JavaScript](../samples/javascript/README.md)
- [מחשבון TypeScript](../samples/typescript/README.md)
- [מחשבון Python](../../../../03-GettingStarted/samples/python) 

## משאבים נוספים

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## מה הלאה

## שלבים הבאים

כעת שלמדת כיצד לבנות שרתי MCP עם תעבורת stdio, תוכל לחקור נושאים מתקדמים יותר:

- **הבא**: [HTTP Streaming עם MCP (Streamable HTTP)](../06-http-streaming/README.md) - למד על מנגנון התעבורה הנוסף לשרתים מרוחקים
- **מתקדם**: [שיטות אבטחה מקיפות ל-MCP](../../02-Security/README.md) - הטמעת אבטחה בשרתי MCP שלך
- **פרודקשן**: [אסטרטגיות פריסה](../09-deployment/README.md) - פרוס את השרתים לשימוש פרודקשן

## משאבים נוספים

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - מפרט רשמי
- [תיעוד MCP SDK](https://github.com/modelcontextprotocol/sdk) - הפניות SDK לכל השפות
- [דוגמאות מהקהילה](../../06-CommunityContributions/README.md) - דוגמאות שרתים נוספות מהקהילה

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->