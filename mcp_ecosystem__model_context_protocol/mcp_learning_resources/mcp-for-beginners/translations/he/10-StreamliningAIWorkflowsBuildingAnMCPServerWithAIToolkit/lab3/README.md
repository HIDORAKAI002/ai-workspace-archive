# 🔧 מודול 3: פיתוח מתקדם של MCP עם Microsoft Foundry Toolkit

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 יעדי למידה

לקראת סיום המעבדה, תוכל:

- ✅ ליצור שרתי MCP מותאמים אישית באמצעות Microsoft Foundry Toolkit
- ✅ להגדיר ולהשתמש ב-SDK Python העדכני ביותר של MCP (גרסה 1.9.3)
- ✅ להקים ולהשתמש ב-MCP Inspector לניפוי שגיאות
- ✅ לנפות שגיאות בשרתי MCP בסביבות Agent Builder ו-Inspector
- ✅ להבין זרימות עבודה מתקדמות לפיתוח שרתי MCP

## 📋 דרישות מוקדמות

- השלמת מעבדה 2 (יסודות MCP)
- VS Code עם תוסף Microsoft Foundry Toolkit מותקן
- סביבה של Python 3.10+
- Node.js ו-npm לצורך הגדרת Inspector

## 🏗️ מה תבנה

במעבדה זו תיצור **שרת MCP של מזג אוויר** שמדגים:
- יישום שרת MCP מותאם אישית
- אינטגרציה עם Agent Builder של Microsoft Foundry Toolkit
- זרימות עבודה מקצועיות לניפוי שגיאות
- דפוסי שימוש מודרניים ב-SDK MCP

---

## 🔧 סקירת רכיבים מרכזיים

### 🐍 MCP Python SDK
חבילת SDK של פרוטוקול הקשר מודל לפייתון שמספקת את הבסיס לבניית שרתי MCP מותאמים אישית. תשתמש בגרסה 1.9.3 עם יכולות מתקדמות לניפוי שגיאות.

### 🔍 MCP Inspector
כלי ניפוי שגיאות עוצמתי המספק:
- מעקב בזמן אמת אחרי השרת
- תצוגה של ביצועי הכלים
- בדיקת בקשות/תגובות רשת
- סביבת בדיקות אינטראקטיבית

---

## 📖 יישום שלב אחר שלב

### שלב 1: יצירת WeatherAgent ב-Agent Builder

1. **פשוט Agent Builder** ב-VS Code דרך תוסף Microsoft Foundry Toolkit
2. **צור סוכן חדש** עם ההגדרות הבאות:
   - שם הסוכן: `WeatherAgent`

![Agent Creation](../../../../translated_images/he/Agent.c9c33f6a412b4cde.webp)

### שלב 2: אתחול פרויקט שרת MCP

1. **גש אל Tools** → **Add Tool** ב-Agent Builder
2. **בחר "MCP Server"** מתוך האפשרויות הזמינות
3. **בחר "Create A new MCP Server"**
4. **בחר בתבנית `python-weather`**
5. **תן שם לשרת שלך:** `weather_mcp`

![Python Template Selection](../../../../translated_images/he/Pythontemplate.9d0a2913c6491500.webp)

### שלב 3: פתח ובחן את הפרויקט

1. **פתח את הפרויקט שנוצר** ב-VS Code
2. **עיין במבנה הפרויקט:**
   ```
   weather_mcp/
   ├── src/
   │   ├── __init__.py
   │   └── server.py
   ├── inspector/
   │   ├── package.json
   │   └── package-lock.json
   ├── .vscode/
   │   ├── launch.json
   │   └── tasks.json
   ├── pyproject.toml
   └── README.md
   ```

### שלב 4: שדרוג לגרסת ה-MCP SDK האחרונה

> **🔍 למה לשדרג?** ברצוננו להשתמש בגרסת ה-MCP SDK העדכנית ביותר (v1.9.3) ובשירות Inspector (0.14.0) לשיפור הפיצ'רים ויכולת ניפוי השגיאות.

#### 4a. עדכון תלותות פייתון

**ערוך את `pyproject.toml`:** עדכן [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. עדכון תצורת Inspector

**ערוך את `inspector/package.json`:** עדכן [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. עדכון תלותות Inspector

**ערוך את `inspector/package-lock.json`:** עדכן [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 הערה:** קובץ זה מכיל הגדרות תלות נרחבות. למטה מוצג המבנה העיקרי - התוכן המלא מבטיח פתרון תלות תקין.


> **⚡ קובץ נעילה מלא:** קובץ package-lock.json המלא מכיל כ-3000 שורות של הגדרות תלות. המוצג לעיל מציג את המבנה המפתח - יש להשתמש בקובץ שמסופק לפתרון תלות מלא.

### שלב 5: הגדרת ניפוי שגיאות ב-VS Code

*הערה: יש להעתיק את הקובץ הנתון בנתיב המצוין ולהחליפו בקובץ המקומי המתאים*

#### 5a. עדכון תצורת השקה

**ערוך `.vscode/launch.json`:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Local MCP",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen",
      "postDebugTask": "Terminate All Tasks"
    },
    {
      "name": "Launch Inspector (Edge)",
      "type": "msedge",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Inspector (Chrome)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": [
    {
      "name": "Debug in Agent Builder",
      "configurations": [
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Open Agent Builder",
    },
    {
      "name": "Debug in Inspector (Edge)",
      "configurations": [
        "Launch Inspector (Edge)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    },
    {
      "name": "Debug in Inspector (Chrome)",
      "configurations": [
        "Launch Inspector (Chrome)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    }
  ]
}
```

**ערוך `.vscode/tasks.json`:**

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Server",
      "type": "shell",
      "command": "python -m debugpy --listen 127.0.0.1:5678 src/__init__.py sse",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}",
        "env": {
          "PORT": "3001"
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Application startup complete|running"
        }
      }
    },
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npm run dev:inspector",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/inspector",
        "env": {
          "CLIENT_PORT": "6274",
          "SERVER_PORT": "6277",
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting MCP inspector",
          "endsPattern": "Proxy server listening on port"
        }
      },
      "dependsOn": [
        "Start MCP Server"
      ]
    },
    {
      "label": "Open Agent Builder",
      "type": "shell",
      "command": "echo ${input:openAgentBuilder}",
      "presentation": {
        "reveal": "never"
      },
      "dependsOn": [
        "Start MCP Server"
      ],
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "openAgentBuilder",
      "type": "command",
      "command": "ai-mlstudio.agentBuilder",
      "args": {
        "initialMCPs": [ "local-server-weather_mcp" ],
        "triggeredFrom": "vsc-tasks"
      }
    },
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```


---

## 🚀 הפעלה ובדיקת שרת ה-MCP שלך

### שלב 6: התקנת תלותות

לאחר ביצוע השינויים בתצורה, הרץ את הפקודות הבאות:

**התקן תלותות פייתון:**
```bash
uv sync
```

**התקן תלותות Inspector:**
```bash
cd inspector
npm install
```

### שלב 7: ניפוי שגיאות עם Agent Builder

1. **הקש F5** או השתמש בתצורת **"Debug in Agent Builder"**
2. **בחר בתצורת הקומפוזיט מהפאנל ניפוי השגיאות**
3. **המתן לעליית השרת ולפתיחת Agent Builder**
4. **בדוק את שרת מזג האוויר MCP שלך** עם שאילתות בשפה טבעית

הזן קלט כמו זה

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/he/Result.6ac570f7d2b1d538.webp)

### שלב 8: ניפוי שגיאות עם MCP Inspector

1. **השתמש בתצורת "Debug in Inspector"** (Edge או Chrome)
2. **פתח את ממשק Inspector** בכתובת `http://localhost:6274`
3. **חקור את סביבת הבדיקה האינטראקטיבית:**
   - צפה בכלים הזמינים
   - בדוק ביצוע כלים
   - נטר בקשות רשת
   - נפה שגיאות תגובות השרת

![MCP Inspector Interface](../../../../translated_images/he/Inspector.5672415cd02fe873.webp)

---

## 🎯 תוצרים עיקריים בלמידה

בסיום מעבדה זו, השגת:

- [x] **יצרת שרת MCP מותאם אישית** באמצעות תבניות Microsoft Foundry Toolkit
- [x] **שידרגת לגרסת ה-MCP SDK העדכנית ביותר** (v1.9.3) לשיפור פונקציונליות
- [x] **הגדרת זרימות עבודה מקצועיות לניפוי שגיאות** עבור Agent Builder ו-Inspector
- [x] **הקמת את MCP Inspector** לבדיקות אינטראקטיביות של השרת
- [x] **שליטת בהגדרות ניפוי שגיאות ב-VS Code** לפיתוח MCP

## 🔧 תכונות מתקדמות שחקרנו

| תכונה | תיאור | מקרה שימוש |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | יישום פרוטוקול עכשווי | פיתוח שרת מודרני |
| **MCP Inspector 0.14.0** | כלי לניפוי שגיאות אינטראקטיבי | בדיקות שרת בזמן אמת |
| **ניפוי שגיאות ב-VS Code** | סביבת פיתוח משולבת | זרימת עבודה מקצועית לניפוי שגיאות |
| **אינטגרציה עם Agent Builder** | חיבור ישיר ל-Microsoft Foundry Toolkit | בדיקות סוכן מקצה לקצה |

## 📚 משאבים נוספים

- [תיעוד MCP Python SDK](https://modelcontextprotocol.io/docs/sdk/python)
- [מדריך תוסף Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [תיעוד ניפוי שגיאות ב-VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [מפרט Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 הברכות!** השלמת בהצלחה את מעבדה 3 וכעת תוכל ליצור, לנפות שגיאות ולפרוס שרתי MCP מותאמים אישית עם זרימות עבודה מקצועיות לפיתוח.

### 🔜 המשך למודול הבא

מוכן ליישם את מיומנויות MCP שלך בזרימת עבודה בפיתוח בעולם האמיתי? המשך אל **[מודול 4: פיתוח MCP מעשי - שרת העתקה מותאם אישית ל-GitHub](../lab4/README.md)** שבו ת:
- תבנה שרת MCP מוכן לייצור שמבצע אוטומציה של פעולות בספריות GitHub
- תיישם פונקציונליות להעתקת ספריות GitHub דרך MCP
- תשלב שרתי MCP מותאמים אישית עם VS Code ו-GitHub Copilot Agent Mode
- תבדוק ותפרוס שרתי MCP מותאמים בסביבות ייצור
- תלמד אוטומציה מעשית של זרימות עבודה למפתחים

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->