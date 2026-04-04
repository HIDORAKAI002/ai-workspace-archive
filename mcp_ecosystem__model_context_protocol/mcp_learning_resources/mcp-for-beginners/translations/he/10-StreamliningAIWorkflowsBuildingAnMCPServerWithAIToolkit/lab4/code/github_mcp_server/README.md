# שרת MCP עבור מזג האוויר

זהו דוגמת שרת MCP בפייתון שמממש כלים למזג אוויר עם תגובות מדומות. ניתן להשתמש בו כמבנה התחלה עבור שרת MCP משלכם. הוא כולל את התכונות הבאות:

- **כלי מזג אוויר**: כלי שמספק מידע מזג אוויר מדומה על בסיס מיקום נתון.
- **כלי שכפול Git**: כלי ששוכפל מאגר גיט לתיקייה מוגדרת.
- **כלי פתיחה ב-VS Code**: כלי שפתוח תיקייה ב-VS Code או VS Code Insiders.
- **חיבור ל-Agent Builder**: תכונה שמאפשרת לך לחבר את שרת ה-MCP ל-Agent Builder לצורכי בדיקה וניפוי שגיאות.
- **ניפוי שגיאות ב-[MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: תכונה שמאפשרת לך לנפות שגיאות בשרת MCP באמצעות ה-MCP Inspector.

## כיצד להתחיל עם תבנית שרת MCP למזג האוויר

> **דרישות מוקדמות**
>
> להפעלת שרת MCP במכונת הפיתוח המקומית שלך, תזדקק ל:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (דרוש עבור כלי git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) או [VS Code Insiders](https://code.visualstudio.com/insiders/) (דרוש עבור כלי open_in_vscode)
> - (*אופציונלי - אם אתה מעדיף uv*) [uv](https://github.com/astral-sh/uv)
> - [הרחבת ניפוי שגיאות לפייתון](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## הכנת הסביבה

ישנן שתי גישות להגדרת הסביבה לפרויקט זה. באפשרותך לבחור באחת מהן על פי העדפתך.

> הערה: טען מחדש את VSCode או את הטרמינל כדי לוודא שהפייתון מהסביבה הווירטואלית בשימוש לאחר יצירת הסביבה הווירטואלית.

| גישה      | צעדים                                                                       |
| --------- | --------------------------------------------------------------------------- |
| שימוש ב-`uv`   | 1. צור סביבה וירטואלית: `uv venv`<br>2. הפעל את פקודת VSCode "***Python: Select Interpreter***" ובחר את הפייתון מהסביבה הווירטואלית שנוצרה<br>3. התקן את התלויות (כולל תלות בפיתוח): `uv pip install -r pyproject.toml --extra dev` |
| שימוש ב-`pip` | 1. צור סביבה וירטואלית: `python -m venv .venv`<br>2. הפעל את פקודת VSCode "***Python: Select Interpreter***" ובחר את הפייתון מהסביבה הווירטואלית שנוצרה<br>3. התקן את התלויות (כולל תלות בפיתוח): `pip install -e .[dev]` | 

לאחר הגדרת הסביבה, תוכל להפעיל את השרת במכונת הפיתוח המקומית שלך דרך Agent Builder כלקוח MCP כדי להתחיל:
1. פתח את פאנל הניפוי ב-VS Code. בחר ב-`Debug in Agent Builder` או לחץ על `F5` כדי להתחיל בניפוי השגיאות של שרת ה-MCP.
2. השתמש ב-Agent Builder של AI Toolkit כדי לבדוק את השרת עם [פרומפט זה](../../../../../../../../../../../open_prompt_builder). השרת יתחבר אוטומטית ל-Agent Builder.
3. לחץ על `Run` כדי לבדוק את השרת עם הפרומפט.

**מזל טוב**! הפעלת בהצלחה את שרת MCP למזג האוויר במכונת הפיתוח המקומית שלך דרך Agent Builder כלקוח MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## מה כלול בתבנית

| תיקייה / קובץ | תוכן                                         |
| ------------- | -------------------------------------------- |
| `.vscode`     | קבצים של VSCode לניפוי שגיאות                 |
| `.aitk`       | הגדרות עבור AI Toolkit                        |
| `src`         | קוד המקור של שרת ה-MCP למזג האוויר             |

## כיצד לנפות שגיאות בשרת MCP למזג האוויר

> הערות:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) הוא כלי מפתח חזותי המיועד לבדיקה וניפוי שגיאות של שרתי MCP.
> - כל מצבי הניפוי תומכים בנקודות עצירה, כך שתוכל להוסיף נקודות עצירה בקוד המימוש של הכלים.

## כלים זמינים

### כלי מזג אוויר
הכלי `get_weather` מספק מידע מזג אוויר מדומה למיקום שצוין.

| פרמטר     | סוג   | תיאור                               |
| --------- | ----- | ---------------------------------- |
| `location` | מחרוזת | המיקום לקבלת מזג האוויר (למשל שם עיר, מדינה, או קואורדינטות) |

### כלי שכפול Git
הכלי `git_clone_repo` משכפל מאגר גיט לתיקייה שצוינה.

| פרמטר         | סוג   | תיאור                              |
| ------------- | ----- | --------------------------------- |
| `repo_url`     | מחרוזת | כתובת URL של מאגר הגיט לשכפול       |
| `target_folder` | מחרוזת | הנתיב לתיקייה שבה יש לשכפל את המאגר |

הכלי מחזיר אובייקט JSON עם:
- `success`: בוליאני המציין אם הפעולה הצליחה
- `target_folder` או `error`: הנתיב של המאגר ששוכפל או הודעת שגיאה

### כלי פתיחה ב-VS Code
הכלי `open_in_vscode` פותח תיקייה ביישום VS Code או VS Code Insiders.

| פרמטר         | סוג      | תיאור                              |
| ------------- | -------- | --------------------------------- |
| `folder_path` | מחרוזת    | הנתיב לתיקייה שברצונך לפתוח         |
| `use_insiders` | בוליאני (אופציונלי) | האם להשתמש ב-VS Code Insiders במקום VS Code הרגיל |

הכלי מחזיר אובייקט JSON עם:
- `success`: בוליאני המציין אם הפעולה הצליחה
- `message` או `error`: הודעת אישור או הודעת שגיאה

| מצב ניפוי    | תיאור                                                 | צעדים לניפוי שגיאות                                                                                                                    |
| ------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Agent Builder | ניפוי שגיאות בשרת MCP ב-Agent Builder דרך AI Toolkit. | 1. פתח את פאנל הניפוי ב-VS Code. בחר ב-`Debug in Agent Builder` ולחץ `F5` כדי להתחיל בניפוי שגיאות שרת ה-MCP.<br>2. השתמש ב-Agent Builder של AI Toolkit כדי לבדוק את השרת עם [פרומפט זה](../../../../../../../../../../../open_prompt_builder). השרת יתחבר אוטומטית ל-Agent Builder.<br>3. לחץ על `Run` כדי לבדוק את השרת עם הפרומפט. |
| MCP Inspector | ניפוי שגיאות בשרת MCP באמצעות MCP Inspector.           | 1. התקן את [Node.js](https://nodejs.org/)<br>2. הגדר את Inspector: `cd inspector` && `npm install`<br>3. פתח את פאנל הניפוי ב-VS Code. בחר ב-`Debug SSE in Inspector (Edge)` או `Debug SSE in Inspector (Chrome)`. לחץ על F5 להתחלת הניפוי.<br>4. כאשר MCP Inspector יופעל בדפדפן, לחץ על כפתור `Connect` כדי להתחבר לשרת MCP זה.<br>5. אז תוכל `List Tools`, לבחור כלי, להזין פרמטרים, ולהריץ את הכלי לניפוי שגיאות בקוד השרת שלך.<br> |

## פורטים ברירת מחדל והתאמות אישיות

| מצב ניפוי    | פורטים                       | הגדרות                       | התאמות אישיות                                                               | הערה  |
| ------------ | ---------------------------- | ---------------------------- | ---------------------------------------------------------------------------- | ----- |
| Agent Builder | 3001                         | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | ערוך את [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) לשינוי הפורטים הנ"ל. | אין  |
| MCP Inspector | 3001 (שרת); 5173 ו-3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | ערוך את [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) לשינוי הפורטים הנ"ל.| אין  |

## משוב

אם יש לך כל משוב או הצעות לתבנית זו, אנא פתח נושא ב-[מאגר GitHub של AI Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). אף שאנו שואפים לדיוק, יש לקחת בחשבון כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. המסמך המקורי בשפת המקור שלו נחשב למקור הסמכותי. למידע קריטי מומלץ להיעזר בתרגום מקצועי אנושי. אנו לא נושאים באחריות להבדלים בהבנה או לפרשנויות שגויות הנובעים משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->