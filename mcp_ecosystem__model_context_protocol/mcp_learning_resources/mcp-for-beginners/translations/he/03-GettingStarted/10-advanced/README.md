# שימוש מתקדם בשרת

קיימים שני סוגים שונים של שרתים המוצגים ב-MCP SDK, השרת הרגיל והשרת ברמת נמוכה. בדרך כלל, תשתמש בשרת הרגיל כדי להוסיף לו תכונות. עם זאת, במקרה מסוים תרצה להסתמך על השרת ברמת נמוכה כמו למשל:

- ארכיטקטורה טובה יותר. אפשר ליצור ארכיטקטורה נקייה גם עם השרת הרגיל וגם עם שרת ברמת נמוכה, אך ניתן לטעון שזה קל יותר עם שרת ברמת נמוכה.
- זמינות תכונות. תכונות מתקדמות מסוימות ניתן להשתמש בהן רק עם שרת ברמת נמוכה. תראה זאת בפרקים הבאים כאשר נוסיף דגימה (מיושנת בגרסת המועמד שחרור `2026-07-28`) והארה.

## שרת רגיל לעומת שרת ברמת נמוכה

כך נראה יצירת שרת MCP עם השרת הרגיל

**Python**

```python
mcp = FastMCP("Demo")

# הוסף כלי חיבור
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```

**TypeScript**

```typescript
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// הוסף כלי חיבור
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);
```

הנקודה היא שאתה מוסיף במפורש כל כלי, משאב או הנחיה שברצונך שהשרת יכיל. אין בזה שום בעיה.

### גישת השרת ברמת נמוכה

עם זאת, כאשר אתה משתמש בגישת השרת ברמת נמוכה עליך לחשוב על זה אחרת. במקום להרשם לכל כלי בנפרד, אתה יוצר שני מטפלים לכל סוג תכונה (כלים, משאבים או הנחיות). לדוגמה, לכלים יש רק שתי פונקציות כך:

- רישום כל הכלים. פונקציה אחת אחראית על כל הניסיונות לרשום כלים.
- טיפול בקריאה לכלים. כאן גם, יש פונקציה אחת בלבד שמטפלת בקריאות לכלי.

זה נשמע כמו פחות עבודה אולי נכון? אז במקום להירשם לכלי, אני רק צריך לוודא שהכלי מופיע ברישום הכלים ושהוא נקרא כשיש בקשה נכנסת לקרוא לכלי.

בוא נראה איך הקוד נראה עכשיו:

**Python**

```python
@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available tools."""
    return [
        types.Tool(
            name="add",
            description="Add two numbers",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number", "description": "number to add"}, 
                    "b": {"type": "number", "description": "number to add"}
                },
                "required": ["query"],
            },
        )
    ]
```

**TypeScript**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // החזר את רשימת הכלים הרשומים
  return {
    tools: [{
        name: "add",
        description: "Add two numbers",
        inputSchema: {
            "type": "object",
            "properties": {
                "a": {"type": "number", "description": "number to add"},
                "b": {"type": "number", "description": "number to add"}
            },
            "required": ["query"],
        }
    }]
  };
});
```

כאן יש לנו פונקציה שמחזירה רשימת תכונות. כל פריט ברשימת הכלים עכשיו מכיל שדות כמו `name`, `description` ו-`inputSchema` כדי להתאים לסוג ההחזרה. זה מאפשר לנו למקם את הכלים והגדרת התכונות שלנו במקום אחר. ניתן כעת ליצור את כל הכלים בתיקיית כלים ויכולים לקרות אותו הדבר עם כל התכונות כך שהפרויקט שלך יכול להיות מאורגן כך:

```text
app
--| tools
----| add
----| substract
--| resources
----| products
----| schemas
--| prompts
----| product-description
```

זה נהדר, ניתן ליצור ארכיטקטורה נקייה למדי.

מה לגבי קריאת כלים, האם זו אותה הרעיון, מטפל יחיד לקרוא לכלי, לא משנה איזה כלי? כן, בדיוק, הנה הקוד לכך:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools הוא מילון עם שמות כלים כמפתחות
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

**TypeScript**

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if(!tool) {
        return {
            error: {
                code: "tool_not_found",
                message: `Tool ${name} not found.`
            }
       };
    }
    
    // ארגומנטים: request.params.arguments
    // TODO לקרוא לכלי,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

כפי שנראה מהקוד למעלה, עלינו לפרש את הכלי שצריך לקרוא, ואת הפרמטרים איתם, ואז להמשיך לקרוא לכלי.

## שיפור הגישה עם אימות

עד כה ראית איך כל ההרשמות להוספת כלים, משאבים והנחיות יכולות להיות מוחלפות בשני המטפלים הללו לכל סוג תכונה. מה עוד צריך לעשות? טוב, כדאי להוסיף איזשהו סוג של אימות כדי לוודא שהכלי נקרא עם הפרמטרים הנכונים. לכל סביבת ריצה יש פתרון משלה לכך, לדוגמה פייטון משתמש ב-Pydantic ו-TypeScript משתמש ב-Zod. הרעיון הוא שנעשה את הדברים הבאים:

- להעביר את הלוגיקה ליצירת תכונה (כלי, משאב או הנחיה) לתיקייתה הייעודית.
- להוסיף דרך לאמת בקשה נכנסת המבקשת למשל לקרוא לכלי.

### יצירת תכונה

כדי ליצור תכונה, נצטרך ליצור קובץ עבור התכונה הזו ולוודא שיש בו את השדות החובה הנדרשים מהתכונה. אילו שדות קיימים משתנים מעט בין כלים, משאבים והנחיות.

**Python**

```python
# schema.py
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float

# add.py

from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # אמת את הקלט באמצעות מודל Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: להוסיף Pydantic, כדי שנוכל ליצור AddInputModel ולאמת ארגומנטים

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

כאן ניתן לראות איך אנו עושים את הדברים הבאים:

- יוצרים סכימה באמצעות Pydantic בשם `AddInputModel` עם שדות `a` ו-`b` בקובץ *schema.py*.
- מנסים לפרש את הבקשה הנכנסת להיות מסוג `AddInputModel`, אם יש חוסר התאמה בפרמטרים זה יגרום לקריסה:

   ```python
   # add.py
    try:
        # אמת קלט באמצעות מודל Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

אתה יכול לבחור אם להכניס את לוגיקת הפרשנות הזו בתוך הקריאה לכלי עצמה או בפונקציית המטפל.

**TypeScript**

```typescript
// server.ts
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if (!tool) {
       return {
        error: {
            code: "tool_not_found",
            message: `Tool ${name} not found.`
        }
       };
    }
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);

       // @ts-ignore
       const result = await tool.callback(input);

       return {
          content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
      };
    } catch (error) {
       return {
          error: {
             code: "invalid_arguments",
             message: `Invalid arguments for tool ${name}: ${error instanceof Error ? error.message : String(error)}`
          }
    };
   }

});

// schema.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// add.ts
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

- במטפל המנהל את כל קריאות הכלים, אנו מנסים כעת לפרש את הבקשה הנכנסת לסכימה שהוגדרה לכלי:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    אם זה מצליח אז ממשיכים לקרוא לכלי בפועל:

    ```typescript
    const result = await tool.callback(input);
    ```

כפי שניתן לראות, הגישה הזו יוצרת ארכיטקטורה נהדרת כי לכל דבר יש את מקומו, קובץ *server.ts* הוא קובץ קטן מאוד שמחבר רק את המטפלים לבקשות וכל תכונה נמצאת בתיקייתה המתאימה דהיינו tools/, resources/ או /prompts.

מצוין, בוא ננסה לבנות את זה בהמשך.

## תרגיל: יצירת שרת ברמת נמוכה

בתרגיל זה נעשה את הדברים הבאים:

1. ניצור שרת ברמת נמוכה המנהל רישום כלי וכלי קריאה.
1. נממש ארכיטקטורה עליה תוכל להמשיך לבנות.
1. נוסיף אימות כדי להבטיח שהקריאות לכלים שלך מאומתות כראוי.

### -1- יצירת ארכיטקטורה

הדבר הראשון שעלינו לטפל בו הוא ארכיטקטורה המאפשרת לנו להרחיב ככל שנוסיף תכונות, כך היא נראית:

**Python**

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```

**TypeScript**

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```

עכשיו הגדרנו ארכיטקטורה שמבטיחה שנוכל להוסיף כלים חדשים בקלות בתיקיית כלים. אתה מוזמן להוסיף כך תיקיות משנה גם למשאבים ולהנחיות.

### -2- יצירת כלי

בוא נראה איך נראית יצירת כלי כעת. ראשית, הוא צריך להיווצר בתיקיית המשנה *tool* כך:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # אמת קלט באמצעות מודל Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: הוסף Pydantic, כדי שנוכל ליצור AddInputModel ולאמת ארגומנטים

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

מה שאנו רואים כאן זה איך אנו מגדירים שם, תיאור, סכימת קלט באמצעות Pydantic ומטפל שיקרא ברגע שהכלי נקרא. לבסוף, אנו חושפים את `tool_add` שהוא מילון המכיל את כל המאפיינים האלה.

יש גם את *schema.py* שמשמש להגדיר את סכימת הקלט שמשתמש הכלי שלנו:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

אנו גם צריכים למלא את *__init__.py* כדי להבטיח שהתיקייה כלים תטופל כמודול. בנוסף, נחשוף את המודולים שבתוכה כך:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

נוכל להמשיך להוסיף לקובץ זה ככל שנוסיף כלים חדשים.

**TypeScript**

```typescript
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

כאן אנו יוצרים מילון הכולל מאפיינים:

- name, זהו שמו של הכלי.
- rawSchema, זוהי סכימת Zod, תשמש לאימות בקשות נכנסות לקריאת כלי זה.
- inputSchema, סכימה זו תשמש ע"י המטפל.
- callback, משמש להפעיל את הכלי.

יש גם את `Tool` שמשמש להמיר מילון זה לסוג שהמטפל של שרת MCP יכול לקבל והוא נראה כך:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

ויש את *schema.ts* שבו אנו מאחסנים את סכימות הקלט לכל כלי, וזה נראה כך עם סכימה אחת כרגע, אך תוך הוספת כלים נוכל להוסיף כניסות נוספות:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

מצוין, נמשיך כעת לטפל ברישום הכלים שלנו.

### -3- טיפול ברישום כלים

לאחר מכן, לטפל ברישום הכלים שלנו, נצטרך להגדיר מטפל לבקשות עבור זה. כך נוסיף זאת לקובץ השרת שלנו:

**Python**

```python
# הקוד הושמט לטובת קיצור
from tools import tools

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    tool_list = []
    print(tools)

    for tool in tools.values():
        tool_list.append(
            types.Tool(
                name=tool["name"],
                description=tool["description"],
                inputSchema=pydantic_to_json(tool["input_schema"]),
            )
        )
    return tool_list
```

כאן, אנו מוסיפים את הקישוט `@server.list_tools` ואת הפונקציה המבצעת `handle_list_tools`. בפונקציה זו, אנו צריכים לייצר רשימת כלים. שים לב שכל כלי צריך לכלול שם, תיאור ו-inputSchema.

**TypeScript**

כדי להגדיר את המטפל לבקשות לרישום הכלים, יש לקרוא ל-`setRequestHandler` על השרת עם סכימה מתאימה למה שאנו מנסים לעשות, במקרה זה `ListToolsRequestSchema`.

```typescript
// אינדקס.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// שרת.ts
// הקוד הושמט בקיצור
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // החזר את רשימת הכלים הרשומים
  return {
    tools: tools
  };
});
```

מצוין, עכשיו פתרנו את חלק רישום הכלים, בוא נראה כיצד נוכל לקרוא לכלים לאחר מכן.

### -4- טיפול בקריאת כלי

כדי לקרוא לכלי, נצטרך להגדיר מטפל בקשה נוסף, הפעם המתמקד בטיפול בבקשה שמציינת איזו תכונה לקרא ועם אילו פרמטרים.

**Python**

נשתמש בקישוט `@server.call_tool` ונממש אותו עם פונקציה בשם `handle_call_tool`. בפונקציה זו, עלינו לפרש את שם הכלי, את הפרמטרים שלו ולוודא שהפרמטרים תקינים לכלי המדובר. נוכל לאמת את הפרמטרים בפונקציה זו או בהמשך בתוך הכלי עצמו.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools הוא מילון עם שמות הכלים כמפתחות
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # להפעיל את הכלי
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

הנה מה שקורה:

- שם הכלי שלנו כבר נוכח כפרמטר קלט `name` אשר נכון עבור הפרמטרים שלנו בדמות המילון `arguments`.

- הכלי נקרא באמצעות `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. האימות של הפרמטרים מתבצע בתוך המאפיין `handler` שמצביע על פונקציה, אם האימות נכשל הוא יזרוק חריגה.

כך, עכשיו יש לנו הבנה מלאה לגבי רישום וכלי קריאה באמצעות שרת ברמת נמוכה.

ראה את [הדוגמה המלאה](./code/README.md) כאן

## משימה

הרחב את הקוד שניתן לך עם מספר כלים, משאבים והנחיות והרהר כיצד אתה מבחין שאתה רק צריך להוסיף קבצים בתיקיית הכלים ושום מקום אחר.

*אין פתרון*

## סיכום

בפרק זה ראינו כיצד פועלת גישת השרת ברמת נמוכה ואיך היא יכולה לעזור לנו ליצור ארכיטקטורה יפה שנוכל להמשיך לבנות עליה. גם דנו באימות והראינו כיצד לעבוד עם ספריות אימות ליצירת סכימות לאימות קלט.

## מה הלאה

- הבא: [אימות פשוט](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->