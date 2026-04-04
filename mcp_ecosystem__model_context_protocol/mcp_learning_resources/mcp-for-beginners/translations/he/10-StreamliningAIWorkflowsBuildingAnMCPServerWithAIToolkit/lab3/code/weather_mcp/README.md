# שרת MCP למזג אוויר

זהו דגם של שרת MCP בפייתון שמממש כלים למזג אוויר עם תגובות מדומות. ניתן להשתמש בו כמעגן עבור שרת MCP משלך. הוא כולל את התכונות הבאות:

- **כלי מזג אוויר**: כלי שמספק מידע מדומה על מזג האוויר בהתבסס על מיקום נתון.
- **חיבור ל-Agent Builder**: תכונה המאפשרת לך לחבר את שרת ה-MCP ל-Agent Builder לצורך בדיקות וניפוי שגיאות.
- **ניפוי שגיאות ב-[MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: תכונה המאפשרת ניפוי שגיאות של שרת ה-MCP באמצעות MCP Inspector.

## התחלת עבודה עם תבנית שרת MCP למזג אוויר

> **דרישות מוקדמות**
>
> כדי להפעיל את שרת ה-MCP במחשב הפיתוח המקומי שלך, תזדקק ל:
>
> - [פייתון](https://www.python.org/)
> - (*אופציונלי - אם אתה מעדיף uv*) [uv](https://github.com/astral-sh/uv)
> - [הרחבת ניפוי שגיאות פייתון](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## הכנת הסביבה

ישנם שני גישות להקמת הסביבה לפרויקט זה. באפשרותך לבחור את אחת מהן לפי העדפתך.

> הערה: טען מחדש את VSCode או את הטרמינל כדי לוודא שזוהי הסביבה הווירטואלית של פייתון שמשמשת לאחר יצירת הסביבה הווירטואלית.

| גישה | שלבים |
| -------- | ----- |
| שימוש ב-`uv` | 1. צור סביבה וירטואלית: `uv venv` <br>2. הפעל את פקודת VSCode "***Python: Select Interpreter***" ובחר את הפייתון מהסביבה הווירטואלית שנוצרה <br>3. התקן תלותיות (כולל תלותיות פיתוח): `uv pip install -r pyproject.toml --extra dev` |
| שימוש ב-`pip` | 1. צור סביבה וירטואלית: `python -m venv .venv` <br>2. הפעל את פקודת VSCode "***Python: Select Interpreter***" ובחר את הפייתון מהסביבה הווירטואלית שנוצרה<br>3. התקן תלותיות (כולל תלותיות פיתוח): `pip install -e .[dev]` |

לאחר ההקמה של הסביבה, ניתן להפעיל את השרת במחשב הפיתוח המקומי באמצעות Agent Builder כלקוח MCP כדי להתחיל:
1. פתח את חלונית הניפוי בשגיאות של VS Code. בחר `Debug in Agent Builder` או לחץ על `F5` כדי להתחיל לנפות שגיאות בשרת MCP.
2. השתמש ב-Agent Builder של AI Toolkit כדי לבדוק את השרת עם [הבקשה הזו](../../../../../../../../../../../open_prompt_builder). השרת יתחבר אוטומטית ל-Agent Builder.
3. לחץ על `Run` כדי לבדוק את השרת עם הבקשה.

**ברכות!** הפעלת בהצלחה את שרת MCP למזג אוויר במחשב הפיתוח המקומי שלך דרך Agent Builder כלקוח MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## מה כלול בתבנית

| תיקיה / קובץ | תכולה |
| ------------ | -------------------------------------------- |
| `.vscode`    | קבצי VSCode לניפוי שגיאות                    |
| `.aitk`      | הגדרות עבור AI Toolkit                       |
| `src`        | קוד המקור לשרת MCP למזג אוויר                 |

## כיצד לנפות שגיאות בשרת MCP למזג אוויר

> הערות:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) הוא כלי מפתח ויזואלי לבדיקות וניפוי שגיאות של שרתי MCP.
> - כל מצבי הניפוי תומכים בנקודות עצירה, כך שניתן להוסיף נקודות עצירה בקוד מימוש הכלי.

| מצב ניפוי שגיאות | תיאור | שלבים לניפוי שגיאות |
| ---------- | ----------- | --------------- |
| Agent Builder | ניפוי שגיאות של שרת ה-MCP דרך Agent Builder באמצעות AI Toolkit. | 1. פתח את חלונית הניפוי בשגיאות של VS Code. בחר `Debug in Agent Builder` ולחץ `F5` כדי להתחיל בניפוי. <br>2. השתמש ב-Agent Builder של AI Toolkit כדי לבדוק את השרת עם [הבקשה הזו](../../../../../../../../../../../open_prompt_builder). השרת יתחבר אוטומטית ל-Agent Builder.<br>3. לחץ על `Run` כדי לבדוק את השרת עם הבקשה. |
| MCP Inspector | ניפוי שגיאות של שרת ה-MCP באמצעות MCP Inspector. | 1. התקן את [Node.js](https://nodejs.org/)<br> 2. הגדר את Inspector: `cd inspector` && `npm install` <br> 3. פתח את חלונית הניפוי ב-VS Code. בחר `Debug SSE in Inspector (Edge)` או `Debug SSE in Inspector (Chrome)`. לחץ F5 כדי להתחיל בניפוי.<br> 4. כאשר MCP Inspector מופעל בדפדפן, לחץ על כפתור `Connect` כדי להתחבר לשרת MCP זה.<br> 5. אז תוכל `List Tools`, לבחור כלי, להזין פרמטרים, ולבצע `Run Tool` כדי לנפות שגיאות בקוד השרת שלך.<br> |

## פורטים ברירת מחדל והתאמות אישיות

| מצב ניפוי שגיאות | פורטים | הגדרות | התאמות | הערה |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ערוך את [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) לשינוי הפורטים הנ"ל. | ללא |
| MCP Inspector | 3001 (שרת); 5173 ו-3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ערוך את [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) לשינוי הפורטים הנ"ל.| ללא |

## משוב

אם יש לך משוב או הצעות לתבנית זו, אנא פתח נושא ב-[מאגר הגיטהאב של AI Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות התרגום בעזרת בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). על אף שאנו שואפים לדייק, יש להבין כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי דיוקים. המסמך המקורי בשפת המקור שלו יש להיחשב כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי אדם. אין אנו אחראים לכל אי הבנה או פרשנות שגויה הנובעות משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->