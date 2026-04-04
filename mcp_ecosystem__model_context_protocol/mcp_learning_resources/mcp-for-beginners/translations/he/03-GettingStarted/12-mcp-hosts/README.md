# הגדרת לקוחות מארחים פופולריים של MCP

מדריך זה מתאר כיצד להגדיר ולהשתמש בשרתים של MCP עם יישומי אירוח פופולריים של בינה מלאכותית. לכל מארח יש גישה משלו לתצורה, אך לאחר ההגדרה, כולם מתקשרים עם שרתי MCP באמצעות הפרוטוקול המתקן.

## מהו מארח MCP?

**מארח MCP** הוא יישום בינה מלאכותית שיכול להתחבר לשרתי MCP כדי להרחיב את היכולות שלו. תחשוב עליו כ"חזית" שמשתמשים מתקשרים איתה, בעוד ששרתי MCP מספקים את כלי ה"גב" ואת הנתונים.

```mermaid
flowchart LR
    User[👤 משתמש] --> Host[🖥️ מארח MCP]
    Host --> S1[שרת MCP א]
    Host --> S2[שרת MCP ב]
    Host --> S3[שרת MCP ג]
    
    subgraph "מארחים פופולריים"
        H1[קלוד דסקטופ]
        H2[VS קוד]
        H3[קושר]
        H4[קליין]
        H5[ווינדסורף]
    end
```
## דרישות מוקדמות

- שרת MCP להתחבר אליו (ראה [מודול 3.1 - השרת הראשון](../01-first-server/README.md))
- יישום המארח מותקן במערכת שלך
- היכרות בסיסית עם קבצי תצורת JSON

---

## 1. Claude Desktop

**Claude Desktop** הוא היישום הרשמי של Anthropic למחשב שולחני התומך באופן טבעי ב-MCP.

### התקנה

1. הורד את Claude Desktop מ-[claude.ai/download](https://claude.ai/download)
2. התקן והתחבר עם חשבון Anthropic שלך

### תצורה

Claude Desktop משתמש בקובץ תצורה בפורמט JSON להגדרת שרתי MCP.

**מיקום קובץ התצורה:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**דוגמת תצורה:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### אפשרויות תצורה

| שדה   | תיאור           | דוגמה                   |
|-------|-----------------|-------------------------|
| `command` | הקובץ להוצאה לפועל  | `"python"`, `"node"`, `"npx"` |
| `args`    | ארגומנטים בשורת הפקודה | `["-m", "my_server"]`           |
| `env`     | משתני סביבה         | `{"API_KEY": "xxx"}`           |
| `cwd`     | תיקיית עבודה         | `"/path/to/server"`            |

### בדיקת ההגדרה שלך

1. שמור את קובץ התצורה
2. אתחל מחדש את Claude Desktop לחלוטין (צא ופתח מחדש)
3. פתח שיחה חדשה
4. חפש את סמל 🔌 הסמן על שרתים מחוברים
5. נסה לבקש מ-Claude להשתמש באחד הכלים שלך

### פתרון בעיות Claude Desktop

**שרת לא מופיע:**
- בדוק את תחביר קובץ התצורה באמצעות מאמת JSON
- ודא שהנתיב לפקודה נכון
- בדוק יומני Claude Desktop: עזרה → הצג יומנים

**קריסת שרת בעת הפעלה:**
- בדוק את השרת ידנית בטרמינל תחילה
- ודא שמשתני הסביבה מוגדרים כראוי
- ודא שכל התלויות מותקנות

---

## 2. VS Code עם GitHub Copilot

VS Code תומך ב-MCP באמצעות הרחבות שיחה של GitHub Copilot.

### דרישות מוקדמות

1. VS Code גרסה 1.99+ מותקן
2. הרחבת GitHub Copilot מותקנת
3. הרחבת GitHub Copilot Chat מותקנת

### תצורה

VS Code משתמש בקובץ `.vscode/mcp.json` בהגדרות סביבת העבודה או המשתמש.

**תצורת סביבת עבודה** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**הגדרות משתמש** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### שימוש ב-MCP ב-VS Code

1. פתח את חלונית ה-Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. הקלד `@` כדי לראות את כלי ה-MCP הזמינים
3. השתמש בשפה טבעית להפעיל כלים: "חשב 25 * 48 באמצעות המחשבון"

### פתרון בעיות VS Code

**שרתי MCP לא נטענים:**
- בדוק את חלונית ה-Output → "MCP" ליומני שגיאות
- טען מחדש את החלון: Ctrl+Shift+P → "מפתח: טען חלון מחדש"
- ודא שהשרת פועל באופן עצמאי ראשית

---

## 3. Cursor

**Cursor** הוא עורך קוד מתמקד בינה מלאכותית עם תמיכה מובנית ב-MCP.

### התקנה

1. הורד את Cursor מ-[cursor.sh](https://cursor.sh)
2. התקן והתחבר

### תצורה

Cursor משתמש בפורמט תצורה דומה ל-Claude Desktop.

**מיקום קובץ התצורה:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**דוגמת תצורה:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### שימוש ב-MCP ב-Cursor

1. פתח את שיחת הבינה המלאכותית של Cursor (Ctrl+L / Cmd+L)
2. כלי MCP מופיעים אוטומטית בהצעות
3. בקש מהבינה לבצע משימות באמצעות השרתים המחוברים

---

## 4. Cline (מבוסס טרמינל)

**Cline** הוא לקוח MCP מבוסס שורת פקודה, אידיאלי לזרימות עבודה מבוססות טרמינל.

### התקנה

```bash
npm install -g @anthropic/cline
```

### תצורה

Cline משתמש במשתני סביבה ובארגומנטים בשורת הפקודה.

**שימוש במשתני סביבה:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**שימוש בארגומנטים בשורת הפקודה:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**קובץ תצורה** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### שימוש ב-Cline

```bash
# התחל סשן אינטראקטיבי
cline

# שאילתה יחידה עם MCP
cline "Calculate the square root of 144 using the calculator"

# רשום כלים זמינים
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** הוא עורך קוד נוסף מונע בינה מלאכותית עם תמיכה ב-MCP.

### התקנה

1. הורד את Windsurf מ-[codeium.com/windsurf](https://codeium.com/windsurf)
2. התקן ופתח חשבון

### תצורה

תצורת Windsurf מנוהלת דרך ממשק ההגדרות:

1. פתח הגדרות (Ctrl+, / Cmd+,)
2. חפש "MCP"
3. לחץ על "ערוך ב-settings.json"

**דוגמת תצורה:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## השוואת סוגי תחבורה

מארחים שונים תומכים במנגנוני תחבורה שונים:

| מארח            | stdio | SSE/HTTP | WebSocket |
|-----------------|-------|----------|-----------|
| Claude Desktop   | ✅    | ❌       | ❌        |
| VS Code         | ✅    | ✅       | ❌        |
| Cursor          | ✅    | ✅       | ❌        |
| Cline           | ✅    | ✅       | ❌        |
| Windsurf        | ✅    | ✅       | ❌        |

**stdio** (קלט/פלט סטנדרטי): המתאים ביותר לשרתים מקומיים שמתחילים על ידי המארח  
**SSE/HTTP**: המתאים ביותר לשרתים מרוחקים או שרתים שמשותפים בין מספר לקוחות

---

## פתרון תקלות נפוצות

### השרת לא מתחיל

1. **בדוק את השרת ידנית תחילה:**
   ```bash
   # עבור פייתון
   python -m your_server_module
   
   # עבור Node.js
   node /path/to/server/index.js
   ```

2. **בדוק את נתיב הפקודה:**
   - השתמש בנתיבים מוחלטים כשאפשר
   - ודא שהקובץ להוצאה לפועל נמצא ב-PATH שלך

3. **אמת תלותיות:**
   ```bash
   # פייתון
   pip list | grep mcp
   
   # נוד.ג'ס
   npm list @modelcontextprotocol/sdk
   ```

### השרת מתחבר אך הכלים לא עובדים

1. **בדוק את יומני השרת** - רוב המארחים כוללים אפשרויות רישום
2. **אמת רישום כלים** - השתמש ב-MCP Inspector לבדיקה
3. **בדוק הרשאות** - כלים מסוימים דורשים גישה לקבצים/רשת

### משתני סביבה לא מועברים

- חלק מהמארחים ממחקים משתני סביבה
- השתמש במפורש בשדה `env` בתצורה
- הימנע מלשמור מידע רגיש בקבצי תצורה (השתמש בניהול סודות)

---

## שיטות עבודה מומלצות לאבטחה

1. **אל תכלול מפתחות API** בקבצי תצורה
2. **השתמש במשתני סביבה** למידע רגיש
3. **הגב את הרשאות השרת** רק למה שדרוש
4. **בדוק את קוד השרת** לפני מתן גישה למערכת שלך
5. **השתמש ברשימות מורשות** לגישה למערכת הקבצים והרשת

---

## מה הלאה

- [3.13 - איתור תקלות עם MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - צור את שרת MCP הראשון שלך](../01-first-server/README.md)
- [מודול 5 - נושאים מתקדמים](../../05-AdvancedTopics/README.md)

---

## משאבים נוספים

- [תיעוד MCP של Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [הרחבת MCP ל-VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [מפרט MCP - תחבורה](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [מאגר שרתי MCP הרשמי](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**הצהרת אחריות**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון כי תרגומים אוטומטיים עלולים להכיל שגיאות או חוסר דיוקים. יש להתייחס למסמך המקורי בשפת המקור כמקור הסמכותי. למידע קריטי מומלץ להיעזר בתרגום מקצועי על ידי מתרגם אנושי. איננו נושאים באחריות לכל אי-הבנה או פרשנות שגויה הנובעת משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->