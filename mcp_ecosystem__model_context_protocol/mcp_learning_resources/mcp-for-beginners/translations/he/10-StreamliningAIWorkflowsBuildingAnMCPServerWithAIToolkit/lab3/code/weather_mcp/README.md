# Weather MCP Server

זהו שרת MCP לדוגמה בפייתון שמממש כלים למזג האוויר עם תגובות מדומות. ניתן להשתמש בו כבסיס לשרת MCP משלך. הוא כולל את התכונות הבאות:

- **כלי מזג אוויר**: כלי שמספק מידע מדומה על מזג האוויר על בסיס המיקום הנתון.
- **חיבור ל-Agent Builder**: תכונה שמאפשרת לך לחבר את שרת ה-MCP ל-Agent Builder לצורך בדיקות וניפוי שגיאות.
- **ניפוי שגיאות ב-[MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: תכונה שמאפשרת לך לנפות תקלות בשרת ה-MCP באמצעות MCP Inspector.

## התחלה עם תבנית Weather MCP Server

> **דרישות מוקדמות**
>
> להרצת שרת ה-MCP במחשב הפיתוח המקומי שלך, תזדקק ל:
>
> - [Python](https://www.python.org/)
> - (*לא חובה - אם אתה מעדיף uv*) [uv](https://github.com/astral-sh/uv)
> - [הרחבת ניפוי שגיאות לפייתון](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## הכנת הסביבה

יש שתי גישות להגדרת הסביבה לפרויקט זה. תוכל לבחור את אחת מהן לפי העדפתך.

> שים לב: טען מחדש את VSCode או את המסוף כדי לוודא שמשתמשים בפייתון של הסביבה הווירטואלית לאחר יצירת הסביבה הווירטואלית.

| גישה | שלבים |
| -------- | ----- |
| שימוש ב-`uv` | 1. צור סביבה וירטואלית: `uv venv` <br>2. הרץ ב-VSCode את הפקודה "***Python: Select Interpreter***" ובחר את הפייתון מהסביבה הווירטואלית שנוצרה <br>3. התקן את התלויות (כולל תלויות פיתוח): `uv pip install -r pyproject.toml --extra dev` |
| שימוש ב-`pip` | 1. צור סביבה וירטואלית: `python -m venv .venv` <br>2. הרץ ב-VSCode את הפקודה "***Python: Select Interpreter***" ובחר את הפייתון מהסביבה הווירטואלית שנוצרה<br>3. התקן את התלויות (כולל תלויות פיתוח): `pip install -e .[dev]` |

לאחר שהגדרת את הסביבה, תוכל להריץ את השרת במחשב הפיתוח המקומי שלך דרך Agent Builder כלקוח MCP כדי להתחיל:
1. פתח את לוח הבקרה לניפוי שגיאות ב-VS Code. בחר `Debug in Agent Builder` או לחץ על `F5` כדי להתחיל בניפוי שגיאות של שרת ה-MCP.
2. השתמש ב-Agent Builder של Microsoft Foundry Toolkit כדי לבדוק את השרת עם [הבקשה הזו](../../../../../../../../../../../open_prompt_builder). השרת יתחבר אוטומטית ל-Agent Builder.
3. לחץ על `Run` כדי לבדוק את השרת עם ההוראה.

**כל הכבוד**! הצלחת להריץ בהצלחה את Weather MCP Server במחשב הפיתוח המקומי שלך דרך Agent Builder כלקוח MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## מה כלול בתבנית

| תיקיה / קובץ| תוכן                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | קבצי VSCode לניפוי שגיאות                   |
| `.aitk`      | הגדרות עבור Microsoft Foundry Toolkit                |
| `src`        | קוד המקור של שרת ה-MCP למזג האוויר   |

## איך לנפות שגיאות ב-Weather MCP Server

> הערות:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) הוא כלי ויזואלי למפתחים לבדיקות וניפוי שגיאות של שרתי MCP.
> - כל מצבי הניפוי תומכים בנקודות עצירה, כך שתוכל להוסיף נקודות עצירה בקוד מימוש הכלי.

| מצב ניפוי | תיאור | שלבים לניפוי שגיאות |
| ---------- | ----------- | --------------- |
| Agent Builder | ניפוי שגיאות של שרת ה-MCP ב-Agent Builder דרך Microsoft Foundry Toolkit. | 1. פתח את לוח הבקרה לניפוי שגיאות ב-VS Code. בחר `Debug in Agent Builder` ולחץ על `F5` כדי להתחיל בניפוי שגיאות של שרת ה-MCP.<br>2. השתמש ב-Agent Builder של Microsoft Foundry Toolkit כדי לבדוק את השרת עם [הבקשה הזו](../../../../../../../../../../../open_prompt_builder). השרת יתחבר אוטומטית ל-Agent Builder.<br>3. לחץ על `Run` כדי לבדוק את השרת עם ההוראה. |
| MCP Inspector | ניפוי שגיאות של שרת ה-MCP באמצעות MCP Inspector. | 1. התקן [Node.js](https://nodejs.org/)<br> 2. הגדר Inspector: `cd inspector` && `npm install` <br> 3. פתח את לוח הבקרה לניפוי שגיאות ב-VS Code. בחר `Debug SSE in Inspector (Edge)` או `Debug SSE in Inspector (Chrome)`. לחץ על F5 כדי להתחיל בניפוי שגיאות.<br> 4. כאשר MCP Inspector יופעל בדפדפן, לחץ על כפתור `Connect` כדי להתחבר לשרת MCP זה.<br> 5. לאחר מכן תוכל ל`List Tools`, לבחור כלי, להזין פרמטרים, ו`Run Tool` כדי לנפות את קוד השרת שלך.<br> |

## יציאות ברירת מחדל והתאמות אישיות

| מצב ניפוי | יציאות | הגדרות | התאמות אישיות | הערה |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ערוך את [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) כדי לשנות יציאות אלה. | אין |
| MCP Inspector | 3001 (שרת); 5173 ו-3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ערוך את [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) כדי לשנות יציאות אלה.| אין |

## משוב

אם יש לך משוב או הצעות לתבנית זו, אנא פתח נושא ב-[מאגר GitHub של Microsoft Foundry Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->