# איתור תקלות עם MCP Inspector

ה-**MCP Inspector** הוא כלי איתור תקלות חיוני שמאפשר לך לבדוק ולפתור בעיות בשרתי MCP שלך בצורה אינטראקטיבית, ללא צורך באפליקציית מארח AI מלאה. אפשר לחשוב עליו כ"מפורטן עבור MCP" - הוא מספק ממשק ויזואלי לשליחת בקשות, צפייה בתגובות ולהבנת התנהגות השרת שלך.

## למה להשתמש ב-MCP Inspector?

כשאתה בונה שרתי MCP, לעיתים קרובות תתקל באתגרים הבאים:

- **"השרת שלי בכלל רץ?"** - ה-Inspector מציג את סטטוס החיבור
- **"האם הכלים שלי רשומים נכון?"** - ה-Inspector מציג את כל הכלים הזמינים
- **"מה הפורמט של התגובה?"** - ה-Inspector מציג תגובות JSON מלאות
- **"למה הכלי הזה לא עובד?"** - ה-Inspector מציג הודעות שגיאה מפורטות

## דרישות מוקדמות

- Node.js בגירסה 18 ומעלה מותקן
- npm (כלול עם Node.js)
- שרת MCP לבדיקה (ראה [מודול 3.1 - השרת הראשון](../01-first-server/README.md))

## התקנה

### אפשרות 1: הרצה עם npx (מומלץ לבדיקות מהירות)

```bash
npx @modelcontextprotocol/inspector
```

### אפשרות 2: התקנה גלובלית

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### אפשרות 3: הוספה לפרויקט שלך

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

הוסף ל-`package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## התחברות לשרת שלך

### שרתי stdio (תהליך מקומי)

לשרתי שמתקשרים דרך קלט/פלט סטנדרטי:

```bash
# שרת פייתון
npx @modelcontextprotocol/inspector python -m your_server_module

# שרת Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# עם משתני סביבה
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### שרתי SSE/HTTP (רשת)

לשרתי שרתים הפועלים כשירותי HTTP:

1. הפעל את השרת תחילה:
   ```bash
   python server.py  # השרת רץ על http://localhost:8080
   ```

2. הפעל את ה-Inspector והתחבר:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## סקירת ממשק ה-Inspector

כשה-Inspector מופעל, תראה ממשק ווב (בדרך כלל בכתובת `http://localhost:5173`):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## בדיקת כלים

### הצגת הכלים הזמינים

1. לחץ על לשונית **כלים**
2. ה-Inspector מבצע קריאה אוטומטית ל-`tools/list`
3. תראה את כל הכלים הרשומים עם:
   - שם הכלי
   - תיאור
   - סכמת הקלט (פרמטרים)

### הפעלת כלי

1. בחר כלי מהרשימה
2. מלא את הפרמטרים הנדרשים בטופס
3. לחץ על **הפעל כלי**
4. צפה בתגובה בפאנל התוצאות

**דוגמה: בדיקת כלי מחשבון**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### איתור שגיאות בכלי

כאשר כלי נכשל, ה-Inspector מציג:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

קודי שגיאה נפוצים:
| קוד | משמעות |
|------|---------|
| -32700 | שגיאת ניתוח (JSON לא תקין) |
| -32600 | בקשה לא חוקית |
| -32601 | שיטה לא נמצאה |
| -32602 | פרמטרים לא חוקיים |
| -32603 | שגיאה פנימית |

---

## בדיקת משאבים

### הצגת משאבים

1. לחץ על לשונית **משאבים**
2. ה-Inspector קורא ל-`resources/list`
3. תראה:
   - כתובות URI של משאבים
   - שמות ותיאורים
   - סוגי MIME

### קריאת משאב

1. בחר משאב
2. לחץ על **קרא משאב**
3. צפה בתוכן שהתקבל

**פלט לדוגמה:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## בדיקת הנחיות (Prompts)

### הצגת ההנחיות

1. לחץ על לשונית **הנחיות**
2. ה-Inspector קורא ל-`prompts/list`
3. צפה בתבניות ההנחיות הזמינות

### קבלת הנחיה

1. בחר הנחיה
2. מלא כל ארגומנט נדרש
3. לחץ על **קבל הנחיה**
4. ראה את הודעות ההנחיה המוצגות

---

## ניתוח יומן ההודעות

יומן ההודעות מציג את כל הודעות פרוטוקול MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### מה לבדוק

- **זוגות בקשה/תגובה**: על כל `→` להיות מלווה ב-`←` מתאים
- **הודעות שגיאה**: חפש `"error"` בתגובות
- **תזמון**: רווחים גדולים עלולים להעיד על בעיות ביצועים
- **גרסת פרוטוקול**: וודא שהשרת והלקוח מסכימים על הגרסה

---

## אינטגרציה עם VS Code

ניתן להפעיל את ה-Inspector ישירות מתוך VS Code:

### שימוש ב-launch.json

הוסף ל-`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### שימוש ב-Tasks

הוסף ל-`.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## תרחישי איתור תקלות נפוצים

### תרחיש 1: השרת לא מתחבר

**תסמינים:** ה-Inspector מציג "Disconnected" או נתקע על "Connecting..."

**רשימת בדיקה:**
1. ✅ האם הפקודה להרצת השרת נכונה?
2. ✅ האם כל התלויות מותקנות?
3. ✅ האם הנתיב לשרת הוא מוחלט או יחסי לתיקייה הנוכחית?
4. ✅ האם משתני הסביבה הנדרשים מוגדרים?

**צעדי איתור תקלות:**
```bash
# בדוק את השרת ידנית תחילה
python -c "import your_server_module; print('OK')"

# בדוק שגיאות ייבוא
python -m your_server_module 2>&1 | head -20

# אמת ש-MCP SDK מותקן
pip show mcp
```

### תרחיש 2: כלים אינם מופיעים

**תסמינים:** לשונית הכלים מציגה רשימה ריקה

**סיבות אפשריות:**
1. הכלים לא נרשמו בזמן אתחול השרת
2. השרת קרס לאחר ההפעלה
3. מטפל `tools/list` מחזיר מערך ריק

**צעדי איתור תקלות:**
1. בדוק ביומן ההודעות תגובת `tools/list`
2. הוסף לוגים לקוד רישום הכלים שלך
3. ודא שקישוטי `@mcp.tool()` קיימים (פייתון)

### תרחיש 3: הכלי מחזיר שגיאה

**תסמינים:** קריאת הכלי מחזירה תגובת שגיאה

**גישה לאיתור:**
1. קרא בעיון את הודעת השגיאה
2. בדוק שסוגי הפרמטרים תואמים לסכמה
3. הוסף try/catch עם הודעות שגיאה מפורטות
4. בדוק את יומני השרת לעקבות קריאה (stack trace)

**דוגמה לשיפור טיפול בשגיאה:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # לוגיקת הכלי כאן
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### תרחיש 4: תוכן המשאב ריק

**תסמינים:** המשאב מוחזר אך התוכן ריק או null

**רשימת בדיקה:**
1. ✅ נתיב הקובץ או ה-URI נכון
2. ✅ לשרת יש הרשאה לקרוא את המשאב
3. ✅ תוכן המשאב מוחזר כראוי

---

## תכונות מתקדמות של Inspector

### כותרות מותאמות אישית (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### לוגים מפורטים

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### הקלטת סשנים

ה-Inspector יכול לייצא יומני הודעות לניתוח מאוחר יותר:
1. לחץ על **ייצוא יומן** בפאנל ההודעות
2. שמור את קובץ ה-JSON
3. שתף עם חברי הצוות לאיתור תקלות

---

## שיטות עבודה מומלצות

1. **בדוק מוקדם ולעיתים קרובות** - השתמש ב-Inspector במהלך הפיתוח, לא רק כשהדברים מתקלקלים
2. **התחל פשוט** - בדוק חיבור בסיסי לפני קריאות לכלים מורכבים
3. **בדוק את הסכמה** - רוב השגיאות נובעות מאי התאמת סוגי פרמטרים
4. **קרא הודעות שגיאה** - שגיאות MCP בדרך כלל מתוארות היטב
5. **השאר את ה-Inspector פתוח** - עוזר לתפוס בעיות תוך כדי הפיתוח

---

## מה הלאה

סיימת את מודול 3: התחלה! המשך ללמידה:

- [מודול 4: יישום מעשי](../../04-PracticalImplementation/README.md)

---

## משאבים נוספים

- [מאגר GitHub של MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [מפרט MCP - הודעות פרוטוקול](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [מפרט JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:  
מסמך זה תורגם באמצעות שירות התרגום האוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. המסמך המקורי בשפתו המקורית ייחשב למקור הרשמי והמהימן. למידע קריטי מומלץ לבצע תרגום מקצועי על ידי אדם. איננו נושאים באחריות לכל אי הבנה או פרשנות שגויה הנובעת משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->