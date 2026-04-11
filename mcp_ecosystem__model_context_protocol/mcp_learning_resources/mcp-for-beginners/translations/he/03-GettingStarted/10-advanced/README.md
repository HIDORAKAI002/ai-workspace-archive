# שימוש מתקדם בשרת

ישנם שני סוגים שונים של שרתים המוצגים ב-MCP SDK, השרת הרגיל שלך והשרת ברמת נמוכה. בדרך כלל, תשתמש בשרת הרגיל כדי להוסיף לו תכונות. עם זאת, במקרים מסוימים תרצה להסתמך על השרת ברמת נמוכה כמו:

- ארכיטקטורה טובה יותר. ניתן ליצור ארכיטקטורה נקייה גם עם השרת הרגיל וגם עם השרת ברמת נמוכה, אך ניתן לטעון שזה מעט קל יותר עם שרת ברמת נמוכה.
- זמינות תכונות. יש תכונות מתקדמות שיכולות לשמש רק עם שרת ברמת נמוכה. תראה זאת בפרקים הבאים כשנוסיף דגימה והיקש.

## שרת רגיל מול שרת ברמת נמוכה

ככה ייראה יצירת שרת MCP עם השרת הרגיל

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

// הוסף כלי תוספת
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

הנקודה היא שאתה מוסיף במפורש כל כלי, משאב או דרישה שברצונך שהשרת יכיל. אין בכך כל טעות.

### גישת שרת ברמת נמוכה

 אולם, כאשר אתה משתמש בגישת השרת ברמת נמוכה, צריך לחשוב על זה אחרת. במקום לרשום כל כלי, אתה יוצר שני מטפלים לפי סוג תכונה (כלים, משאבים או דרישות). כך לדוגמה לכלים יש שתי פונקציות בלבד, כמו כך:

- רישום כל הכלים. פונקציה אחת תהיה אחראית על כל הניסיונות לרשום כלים.
- טיפול בקריאה לכל הכלים. כאן גם, יש רק פונקציה אחת המטפלת בקריאות לכלי.

נשמע שזה עשוי להיות פחות עבודה, נכון? אז במקום לרשום כלי, אני פשוט צריך לוודא שהכלי רשום כשאני מציג את כל הכלים ושהוא נקרא כאשר יש בקשה נכנסת לקרוא לכלי.

בואו נסתכל איך הקוד נראה עכשיו:

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
        name="add",
        description="Add two numbers",
        inputSchema={
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

כאן יש לנו פונקציה שמחזירה רשימה של תכונות. כל ערך ברשימת הכלים מכיל כעת שדות כמו `name`, `description` ו-`inputSchema` על מנת לעמוד בסוג ההחזרה. זה מאפשר לנו להגדיר את הכלים שלנו ואת הגדרת התכונה במקום אחר. עכשיו נוכל ליצור את כל הכלים שלנו בתיקיית tools וכך גם את כל התכונות, כך שהפרויקט שלך יכול להיות מאורגן כך:

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

זה מצוין, הארכיטקטורה שלנו יכולה להיראות די נקייה.

ומה לגבי קריאת כלים, האם זו אותה הרעיון, מטפל אחד לקרוא לכלי, לא משנה איזה כלי? כן, בדיוק, הנה הקוד לכך:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools הוא מילון כאשר שמות הכלים הם המפתחות
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

כפי שניתן לראות מהקוד למעלה, אנו צריכים לנתח איזה כלי לקרוא, ובאילו ארגומנטים, ואז להמשיך לקרוא לכלי.

## שיפור הגישה עם אימות

עד כה, ראית איך כל ההרשמות שלך להוספת כלים, משאבים ודרישות יכולות להיות מוחלפות בשני המטפלים האלה לפי סוג תכונה. מה עוד צריך לעשות? ובכן, עלינו להוסיף סוג של אימות כדי להבטיח שהכלי ייקרא עם הארגומנטים הנכונים. לכל סביבת ריצה יש פתרון משלה, לדוגמה פייתון משתמש ב-Pydantic וטייפסקריפט משתמש ב-Zod. הרעיון הוא לעשות את הדברים הבאים:

- להעביר את הלוגיקה ליצירת תכונה (כלי, משאב או דרישה) לתיקיה ייעודית שלה.
- להוסיף דרך לאמת בקשה נכנסת המבקשת למשל לקרוא לכלי.

### יצירת תכונה

כדי ליצור תכונה, נצטרך ליצור קובץ עבור אותה תכונה ולוודא שיש לה את השדות החייבים הנדרשים לתכונה זו. אילו שדות משתנים קצת בין כלים, משאבים ודרישות.

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
        # אמת קלט באמצעות מודל Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # לעשות: להוסיף Pydantic, כדי שנוכל ליצור AddInputModel ולאמת פרמטרים

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

כאן ניתן לראות כיצד אנו עושים את הדברים הבאים:

- יוצרים סכימה באמצעות Pydantic בשם `AddInputModel` עם שדות `a` ו-`b` בקובץ *schema.py*.
- מנסים לנתח את הבקשה הנכנסת להיות מסוג `AddInputModel`, אם יש אי התאמה בפרמטרים זה יגרום לקריסה:

   ```python
   # add.py
    try:
        # אמת קלט באמצעות מודל Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

אתה יכול לבחור האם למקם את לוגיקת הניתוח הזו בקריאת הכלי עצמה או בפונקציית המטפל.

**TypeScript**

```typescript
// שרת.ts
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

       // @ts-התעלם
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

// סכימה.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// הוסף.ts
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

- במטפל שמתעסק עם כל הקריאות לכל הכלים, אנו מנסים כעת לפענח את הבקשה הנכנסת אל סכמת הכלי שהוגדרה:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    אם זה מצליח, אז ממשיכים לקרוא לכלי בפועל:

    ```typescript
    const result = await tool.callback(input);
    ```

כפי שניתן לראות, גישה זו יוצרת ארכיטקטורה נהדרת כי לכל דבר יש את המקום שלו, הקובץ *server.ts* הוא קובץ קטן בלבד שמקשר בין מטפלי הבקשות וכל תכונה נמצאת בתיקיה שלה - כלומר tools/, resources/ או /prompts.

מצוין, בוא ננסה לבנות את זה כעת.

## תרגיל: יצירת שרת ברמת נמוכה

בתרגיל זה, נעשה את הדברים הבאים:

1. ליצור שרת ברמת נמוכה שמטפל ברישום כלים וקריאת כלים.
1. ליישם ארכיטקטורה שניתן לבנות עליה.
1. להוסיף אימות כדי להבטיח שהקריאות לכלי יאומתו כראוי.

### -1- יצירת ארכיטקטורה

הדבר הראשון שעלינו לטפל בו הוא ארכיטקטורה שתעזור לנו להתרחב ככל שנוסיף תכונות נוספות, כך היא נראית:

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

כעת הקמנו ארכיטקטורה שמאפשרת להוסיף בקלות כלים חדשים בתיקיית tools. אפשר להוסיף באופן דומה תת-תיקיות למשאבים ודרישות.

### -2- יצירת כלי

בואו נראה איך נראה יצירת כלי. קודם כל, הוא צריך להיווצר בתת-תיקיית *tool* כך:

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

מה שרואים כאן הוא איך מגדירים שם, תיאור, וסכימת קלט באמצעות Pydantic, וכן מטפל שייקרא ברגע שהכלי ייקרא. לבסוף, אנו חושפים `tool_add` שהוא מילון שמחזיק את כל המאפיינים הללו.

יש גם את *schema.py* שמשמש להגדרת סכימת הקלט של הכלי:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

אנחנו גם צריכים למלא את *__init__.py* כדי לוודא שתיקיית הכלים מתנהגת כמודול. בנוסף, עלינו לחשוף את המודולים שבתוכה כך:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

נוכל להמשיך ולהוסיף לקובץ זה ככל שנוסיף כלים.

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

כאן אנו יוצרים מילון שמורכב מ:

- name, זה שם הכלי.
- rawSchema, זו סכמת Zod, תשמש לאימות בקשות נכנסות לקרוא לכלי זה.
- inputSchema, סכימה זו תשמש על ידי המטפל.
- callback, משמש לקריאת הכלי.

קיים גם את `Tool` שממיר את המילון הזה לסוג שיכול לקבל מטפל שרת ה-mcp והוא נראה כך:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

ופתוח גם *schema.ts* שבו אנו מאחסנים את סכימות הקלט לכל כלי, נראה כך עם סכימה אחת כרגע, וככל שנוסיף כלים נוסיף עוד רשומות:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

מצוין, נמשיך לטפל ברישום הכלים עכשיו.

### -3- טיפול ברישום כלים

כדי לטפל ברישום הכלים, נצטרך להגדיר מטפל בקשות לכך. הנה מה שעלינו להוסיף לקובץ השרת:

**Python**

```python
# הקוד הושמט לקיצור
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

כאן, אנו מוסיפים את הדקורטור `@server.list_tools` ואת פונקציית היישום `handle_list_tools`. בפונקציה האחרונה, עלינו לייצר רשימת כלים. שים לב שכל כלי צריך להכיל שם, תיאור ו-inputSchema.

**TypeScript**

כדי להגדיר את מטפל הבקשות לרישום כלים, נזמין `setRequestHandler` על השרת עם סכימה התואמת את מה שאנו מנסים לעשות, במקרה זה `ListToolsRequestSchema`.

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

מצוין, כעת פתרנו את חלק רישום הכלים, בוא נבדוק איך ניתן לקרוא לכלים.

### -4- טיפול בקריאת כלי

כדי לקרוא לכלי, עלינו להגדיר מטפל בקשות נוסף, הפעם המתמקד בטיפול בבקשה שמציינת איזו תכונה לקרוא ובאילו ארגומנטים.

**Python**

נשתמש בדקורטור `@server.call_tool` וניישם אותו עם פונקציה כמו `handle_call_tool`. בתוך פונקציה זו, עלינו לנתח את שם הכלי, את הארגומנט שלו ולהבטיח שהארגומנטים תקינים לכלי הרלוונטי. נוכל לאמת את הארגומנטים בפונקציה זו או להמשך לאימות בכלי בפועל.

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
        # להפעיל את הכלי
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

הנה מה שקורה:

- שם הכלי שלנו כבר קיים כפרמטר הקלט `name` שמהווה אמת עבור הארגומנטים שלנו בצורת מילון `arguments`.

- הכלי נקרא עם `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. האימות של הארגומנטים מתבצע במאפיין `handler` שמצביע לפונקציה, אם זה נכשל זה יגרום לחריגה.

עכשיו יש לנו הבנה מלאה של רישום וקריאת כלים באמצעות שרת ברמת נמוכה.

ראה את [הדוגמה המלאה](./code/README.md) כאן

## מטלה

הרחב את הקוד שקיבלת עם מספר כלים, משאבים ודרישות והשקף כיצד אתה מבחין שאתה צריך להוסיף קבצים רק בתיקיית tools ולא במקום אחר.

*אין פתרון מוגש*

## סיכום

בפרק זה ראינו כיצד עובדת גישת השרת ברמת נמוכה וכיצד זה יכול לעזור לנו ליצור ארכיטקטורה טובה שאפשר להמשיך לבנות עליה. גם דנו באימות והוצגו לך כיצד לעבוד עם ספריות אימות ליצירת סכימות לאימות הקלט.

## מה הלאה

- הבא: [אימות פשוט](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). בעוד שאנו שואפים לדיוק, יש להיות מודעים לכך שתירגומים אוטומטיים עלולים להכיל שגיאות או אי דיוקים. המסמך המקורי בשפה המקורית נחשב למקור הסמכותי. למידע קריטי מומלץ תרגום מקצועי שיבוצע על ידי בני אדם. אנו לא אחראים לכל אי הבנה או פרשנות שגויה הנובעת משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->