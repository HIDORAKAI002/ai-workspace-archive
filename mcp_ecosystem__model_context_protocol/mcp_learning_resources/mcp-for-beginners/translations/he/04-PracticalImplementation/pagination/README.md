# חלוקה לעמודים וקבוצות תוצאות גדולות ב-MCP

כאשר שרת MCP שלך מטפל במאגרי נתונים גדולים - בין אם זו רשימת אלפי קבצים, רשומות בבסיס נתונים או תוצאות חיפוש - אתה זקוק לחלוקה לעמודים כדי לנהל זיכרון ביעילות ולספק חוויית משתמש רספונסיבית. מדריך זה מסביר כיצד ליישם ולהשתמש בחלוקה לעמודים ב-MCP.

## מדוע חלוקה לעמודים חשובה

ללא חלוקה לעמודים, תגובות גדולות עלולות לגרום ל:

- **התמוטטות זיכרון** - טעינת מיליוני רשומות בבת אחת
- **זמני תגובה איטיים** - המשתמשים מחכים בזמן שכל הנתונים נטענים
- **שגיאות חציית זמן (timeout)** - הבקשות עוברות את מגבלת הזמן
- **ביצועי AI ירודים** - מודלים לומדים גדולים (LLMs) מתקשים בהקשר מסיבי

MCP משתמש ב**חלוקה לעמודים מבוססת מצביע (cursor)** לדפדוף אמין ועקבי דרך קבוצות התוצאות.

---

## כיצד עובדת החלוקה לעמודים ב-MCP

### מושג המצביע (Cursor)

**מצביע** הוא מחרוזת לא שקופה המסמנת את המיקום שלך בקבוצת תוצאות. דמיין אותו כסימניה בספר ארוך.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: כלים/רשימה (בלי סמן)
    Server-->>Client: כלים [1-10], סמןהבא: "abc123"
    
    Client->>Server: כלים/רשימה (סמן: "abc123")
    Server-->>Client: כלים [11-20], סמןהבא: "def456"
    
    Client->>Server: כלים/רשימה (סמן: "def456")
    Server-->>Client: כלים [21-25], סמןהבא: ריק (סיום)
```
### חלוקה לעמודים בשיטות MCP

השיטות הבאות של MCP תומכות בחלוקה לעמודים:

| שיטה | מחזירה | תומכת במצביע |
|--------|---------|----------------|
| `tools/list` | הגדרות כלים | ✅ |
| `resources/list` | הגדרות משאבים | ✅ |
| `prompts/list` | הגדרות פקודות | ✅ |
| `resources/templates/list` | תבניות משאבים | ✅ |

---

## יישום בשרת

### פייתון (FastMCP)

```python
from mcp.server import Server
from mcp.types import Tool, ListToolsResult
import math

app = Server("paginated-server")

# מאגר נתונים גדול מדומה
ALL_TOOLS = [
    Tool(name=f"tool_{i}", description=f"Tool number {i}", inputSchema={})
    for i in range(100)
]

PAGE_SIZE = 10

@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    """List tools with pagination support."""
    
    # פענח את הסמן כדי לקבל את אינדקס ההתחלה
    start_index = 0
    if cursor:
        try:
            start_index = int(cursor)
        except ValueError:
            start_index = 0
    
    # קבל דף של תוצאות
    end_index = min(start_index + PAGE_SIZE, len(ALL_TOOLS))
    page_tools = ALL_TOOLS[start_index:end_index]
    
    # חישוב הסמן הבא
    next_cursor = None
    if end_index < len(ALL_TOOLS):
        next_cursor = str(end_index)
    
    return ListToolsResult(
        tools=page_tools,
        nextCursor=next_cursor
    )
```

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsResultSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({
  name: "paginated-server",
  version: "1.0.0"
});

// מערך נתונים גדול מדומה
const ALL_TOOLS = Array.from({ length: 100 }, (_, i) => ({
  name: `tool_${i}`,
  description: `Tool number ${i}`,
  inputSchema: { type: "object", properties: {} }
}));

const PAGE_SIZE = 10;

server.setRequestHandler(ListToolsResultSchema, async (request) => {
  // פענח סמן עכבר
  let startIndex = 0;
  if (request.params?.cursor) {
    startIndex = parseInt(request.params.cursor, 10) || 0;
  }
  
  // קבל עמוד תוצאות
  const endIndex = Math.min(startIndex + PAGE_SIZE, ALL_TOOLS.length);
  const pageTools = ALL_TOOLS.slice(startIndex, endIndex);
  
  // חשב סמן עכבר הבא
  const nextCursor = endIndex < ALL_TOOLS.length ? String(endIndex) : undefined;
  
  return {
    tools: pageTools,
    nextCursor
  };
});
```

### Java (Spring MCP)

```java
@Service
public class PaginatedToolService {
    
    private static final int PAGE_SIZE = 10;
    private final List<Tool> allTools;
    
    public PaginatedToolService() {
        // לאתחל קבוצת נתונים גדולה
        this.allTools = IntStream.range(0, 100)
            .mapToObj(i -> new Tool("tool_" + i, "Tool number " + i, Map.of()))
            .collect(Collectors.toList());
    }
    
    @McpMethod("tools/list")
    public ListToolsResult listTools(@Param("cursor") String cursor) {
        // לפענח את הסמן
        int startIndex = 0;
        if (cursor != null && !cursor.isEmpty()) {
            try {
                startIndex = Integer.parseInt(cursor);
            } catch (NumberFormatException e) {
                startIndex = 0;
            }
        }
        
        // לקבל דף תוצאות
        int endIndex = Math.min(startIndex + PAGE_SIZE, allTools.size());
        List<Tool> pageTools = allTools.subList(startIndex, endIndex);
        
        // לחשב את הסמן הבא
        String nextCursor = endIndex < allTools.size() ? String.valueOf(endIndex) : null;
        
        return new ListToolsResult(pageTools, nextCursor);
    }
}
```

---

## יישום בלקוח

### לקוח פייתון

```python
from mcp import ClientSession

async def get_all_tools(session: ClientSession) -> list:
    """Fetch all tools using pagination."""
    all_tools = []
    cursor = None
    
    while True:
        result = await session.list_tools(cursor=cursor)
        all_tools.extend(result.tools)
        
        if result.nextCursor is None:
            break
        cursor = result.nextCursor
    
    return all_tools

# שימוש
async with client_session as session:
    tools = await get_all_tools(session)
    print(f"Found {len(tools)} tools")
```

### לקוח TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function getAllTools(client: Client): Promise<Tool[]> {
  const allTools: Tool[] = [];
  let cursor: string | undefined = undefined;
  
  do {
    const result = await client.listTools({ cursor });
    allTools.push(...result.tools);
    cursor = result.nextCursor;
  } while (cursor);
  
  return allTools;
}

// שימוש
const tools = await getAllTools(client);
console.log(`Found ${tools.length} tools`);
```

### תבנית טעינה עצלנית

עבור קבוצות נתונים גדולות מאוד, טען עמודים לפי דרישה:

```python
class PaginatedToolIterator:
    """Lazily iterate through paginated tools."""
    
    def __init__(self, session: ClientSession):
        self.session = session
        self.cursor = None
        self.buffer = []
        self.exhausted = False
    
    async def __anext__(self):
        # להחזיר מהזיכרון אם זמין
        if self.buffer:
            return self.buffer.pop(0)
        
        # לבדוק אם סיימנו לעבור על כל העמודים
        if self.exhausted:
            raise StopAsyncIteration
        
        # לשלוף את העמוד הבא
        result = await self.session.list_tools(cursor=self.cursor)
        self.buffer = list(result.tools)
        self.cursor = result.nextCursor
        
        if self.cursor is None:
            self.exhausted = True
        
        if not self.buffer:
            raise StopAsyncIteration
        
        return self.buffer.pop(0)
    
    def __aiter__(self):
        return self

# שימוש - חסכוני בזיכרון עבור מערכי נתונים גדולים
async for tool in PaginatedToolIterator(session):
    process_tool(tool)
```

---

## חלוקה לעמודים עבור משאבים

לעיתים קרובות, משאבים זקוקים לחלוקה לעמודים עבור תיקיות או מאגרי נתונים גדולים:

```python
from mcp.server import Server
from mcp.types import Resource, ListResourcesResult
import os

app = Server("file-server")

@app.list_resources()
async def list_resources(cursor: str | None = None) -> ListResourcesResult:
    """List files in directory with pagination."""
    
    directory = "/data/files"
    all_files = sorted(os.listdir(directory))
    
    # פענח סמן (מיקום קובץ)
    start_index = int(cursor) if cursor else 0
    page_size = 20
    end_index = min(start_index + page_size, len(all_files))
    
    # צור רשימת משאבים עבור דף זה
    resources = []
    for filename in all_files[start_index:end_index]:
        filepath = os.path.join(directory, filename)
        resources.append(Resource(
            uri=f"file://{filepath}",
            name=filename,
            mimeType="application/octet-stream"
        ))
    
    # חשב סמן הבא
    next_cursor = str(end_index) if end_index < len(all_files) else None
    
    return ListResourcesResult(
        resources=resources,
        nextCursor=next_cursor
    )
```

---

## אסטרטגיות עיצוב מצביעים

### אסטרטגיה 1: מבוססת אינדקס (פשוטה)

```python
# הסמן הוא רק האינדקס
cursor = "50"  # התחל מהפריט 50
```

**יתרונות:** פשוט, ללא מצב
**חסרונות:** התוצאות יכולות להשתנות אם מוסיפים/מסירים פריטים

### אסטרטגיה 2: מבוססת מזהה (יציבה)

```python
# סמן הוא המזהה האחרון שנצפה
cursor = "item_abc123"  # להתחיל אחרי פריט זה
```

**יתרונות:** יציבה גם אם הפריטים משתנים
**חסרונות:** דורשת מזהים מסודרים

### אסטרטגיה 3: מצב מקודד (מסובכת)

```python
import base64
import json

def encode_cursor(state: dict) -> str:
    return base64.b64encode(json.dumps(state).encode()).decode()

def decode_cursor(cursor: str) -> dict:
    return json.loads(base64.b64decode(cursor).decode())

# הסמן מכיל שדות מצב מרובים
cursor = encode_cursor({
    "offset": 50,
    "filter": "active",
    "sort": "name"
})
```

**יתרונות:** יכולה לקודד מצב מורכב
**חסרונות:** מורכבת יותר, מחרוזות מצביע גדולות יותר

---

## שיטות עבודה מומלצות

### 1. בחר גדלי עמודים מתאימים

```python
# קחו בחשבון את גודל הנתונים
PAGE_SIZE_SMALL_ITEMS = 100   # מטא דאטה פשוטה
PAGE_SIZE_MEDIUM_ITEMS = 20   # עצמים עשירים יותר
PAGE_SIZE_LARGE_ITEMS = 5     # תוכן מורכב
```

### 2. טיפל במצביעים לא תקינים בצורה אלגנטית

```python
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    try:
        start_index = int(cursor) if cursor else 0
        if start_index < 0 or start_index >= len(ALL_TOOLS):
            start_index = 0  # אתחול להתחלה
    except (ValueError, TypeError):
        start_index = 0  # סמן לא חוקי, התחל מחדש
    # ...
```

### 3. כלול ספירה כוללת (אופציונלי)

```python
return ListToolsResult(
    tools=page_tools,
    nextCursor=next_cursor,
    # חלק מהמימושים כוללים סך כולל עבור התקדמות הממשק
    _meta={"total": len(ALL_TOOLS)}
)
```

### 4. בדוק מקרים שולייים

```python
async def test_pagination():
    # סט תוצאות ריק
    result = await session.list_tools()
    assert result.tools == []
    assert result.nextCursor is None
    
    # עמוד יחיד
    result = await session.list_tools()
    assert len(result.tools) <= PAGE_SIZE
    
    # מצביע לא חוקי
    result = await session.list_tools(cursor="invalid")
    assert result.tools  # צריך להחזיר את העמוד הראשון
```

---

## טעויות נפוצות

### ❌ החזרת כל התוצאות ואז חלוקה לעמודים בצד הלקוח

```python
# רע: טוען הכל לזיכרון
@app.list_tools()
async def list_tools() -> ListToolsResult:
    all_tools = load_all_tools()  # מיליון כלים!
    return ListToolsResult(tools=all_tools)
```

### ✅ חלוקה לעמודים במקור הנתונים

```python
# טוב: טוען רק את מה שצריך
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    offset = int(cursor) if cursor else 0
    tools = await db.query_tools(offset=offset, limit=PAGE_SIZE)
    return ListToolsResult(tools=tools, nextCursor=...)
```

---

## מה הלאה

- [מודול 5.14 - הנדסת הקשר](../../05-AdvancedTopics/mcp-contextengineering/README.md)
- [מודול 8 - שיטות עבודה מומלצות](../../08-BestPractices/README.md)
- [3.8 - בדיקת שרת MCP שלך](../../03-GettingStarted/08-testing/README.md)

---

## משאבים נוספים

- [מפרט MCP - חלוקה לעמודים](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [הסבר על חלוקה לעמודים מבוססת מצביע](https://slack.engineering/evolving-api-pagination-at-slack/)
- [בדיקות חלוקה לעמודים ב-SDK לפייתון](https://github.com/modelcontextprotocol/python-sdk/blob/main/tests/client/test_list_methods_cursor.py)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**אזהרה**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדייק, אנא היו מודעים כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להתייחס למסמך המקורי בשפתו המקורית כמקור הסמכותי. למידע קריטי מומלץ לפנות לתרגום מקצועי אנושי. איננו אחראים לכל אי-הבנות או פרשנויות שגויות הנובעות משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->