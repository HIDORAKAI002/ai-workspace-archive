# יומן שינויים

כל השינויים הבולטים בקורס **סוכני AI למתחילים** מתועדים בקובץ זה.

## [שוחרר] — 2026-07-13

שחרור זה מוסיף שני שיעורים חדשים שמסיימים את קשת הפריסה — הגדלת סוכנים ל-Microsoft Foundry והקטנה למחשב עבודה יחיד — בנוסף לצינור בדיקת עשן, ניווט מחודש בקורס, מיומנויות לומדים חדשות, ומיתוג מעודכן.

### נוסף

- **שיעור 16 — פריסת סוכנים ניתנים להרחבה עם Microsoft Foundry.** שיעור חדש [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) ומחברת ניתנת להרצה [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) הבונה סוכן תמיכת לקוחות פרודקשן (כלים, RAG, זיכרון, ניתוב מודל, מטמון תגובות, אישור אנושי, שער הערכה, ומעקב OpenTelemetry), עם דיאגרמות Mermaid לפיתוח/פריסה/ריצה, בדיקת ידע, משימה ואתגר.
- **שיעור 17 — יצירת סוכני AI מקומיים עם Foundry Local ו-Qwen.** שיעור חדש [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) ומחברת [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) הבונה עוזר הנדסי הפועל כולו במכשיר (קריאה לפונקציות Qwen דרך Foundry Local, כלים לקבצים מבודדים, RAG מקומי עם Chroma, MCP מקומי אופציונלי), עם דיאגרמות בלעדיות למקומי / RAG מקומי / קריאת כלים, בדיקת ידע, משימה ואתגר.
- **צינור בדיקות עשן.** זרימת עבודה חדשה [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) עם קטלוגים לכל שיעור תחת [tests/](./tests/README.md) לסוכנים הניתנים לפריסה בשיעורים 01, 04, 05, ו-16, עם README אינדקס שמקשר כל קטלוג לשיעור ולשם הסוכן המאוחסן. שיעור 16 מוסיף סעיף "אימות סוכן שהופעל עם בדיקות עשן"; שיעורים 01/04/05 מוסיפים מצביע לבדיקה לעשן בצורה אופציונלית.
- **מיומנויות לומדים.** מיומנויות סוכן חדשות תחת `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (שמארזות את הדרכת השיעורים 16 ו-17), ו-[testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (כיצד לאמת את דוגמאות המחברות מול התקנת Microsoft Foundry / Azure OpenAI חיה).
- **רצי בדיקת תוקף למחברות.** [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) חדשה שמריצה כל מחברת Python ללא ממשק גרפי עם `nbconvert` ומדפיסה מטריצת PASS/FAIL (בנוסף ל-`results.json`). היא מזהה אוטומטית את שורש הריפו ו-Python, מחריגה מחברות שאינן משל הקורס (`.venv`, `site-packages`, `translations`, נכסי תבנית מיומנות) ומחברות `.NET` כברירת מחדל, ותומכת ב-`-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, ו-`-Python`.
- **ניווט בקורס.** נוספו קישורי שיעור קודם/הבא לשיעורים 11–15 (שהיו חסרים קודם) כך שכל הקורס מחובר 00 → 18 בשתי הכיוונים.
- **תמונות ממוזערות חדשות.** תמונות ממוזערות לשיעורים 16 ו-17, בנוסף לתמונה חברתית מעודכנת של הריפוזיטורי [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (כעת מפרסמת את שני השיעורים החדשים וכתובת ה-URL `aka.ms/ai-agents-beginners`).
- **תלויות** ([requirements.txt](../../requirements.txt)): נוספו `foundry-local-sdk` ו-`chromadb` לשיעור 17.

### שונה

- **טבלת השיעורים הראשית [README.md](./README.md)**: שיעורים 16 ו-17 מקשרים כעת לתוכן שלהם (היו מסומנים "בקרוב"); תמונת הריפוזיטורי עודכנה ל-`repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: הוספת שיעורים 16 ו-17 למדריך שיעור אחר שיעור ולמסלולי הלמידה, וסעיף "אימות סוכנים שהופעלו עם בדיקות עשן".
- **[AGENTS.md](./AGENTS.md)**: עדכון מספר ותיאור השיעורים (00–18), הוספת סעיף לאימות בדיקות עשן, ודוגמאות שמות לדוגמאות שיעורים 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "השיעור הקודם" מצביע כעת לשיעור 17 (היה שיעור 15), סוגר את השרשרת.
- **תקנון הפניות למודלים שאינם מיושנים.** הוחלפו כל ההפניות ל-`gpt-4o` / `gpt-4o-mini` לאורך כל הקורס (תיעוד, `.env.example`, מחברות ודוגמאות Python/.NET) ב-`gpt-4.1-mini` — `gpt-4o` (כל הגרסאות) יוצא משימוש ב-2026. דוגמת ניתוב המודל של שיעור 16 שומרת על ניגוד קטן/גדול בעזרת `gpt-4.1-mini` (קטן) ו-`gpt-4.1` (גדול). מחברות Python בוחרות כעת את המודל ממשתני הסביבה (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) במקום לקבוע שם מודל קשיח.

### הערות ומגבלות ידועות

- **לא הורץ מול Azure חי.** מחברות השיעורים החדשים הן דוגמאות לימודיות; הריץ ואמת אותן מול התקנת Microsoft Foundry / Foundry Local שלך. זרימת העבודה לבדיקות העשן דורשת לפרוס את סוכן השיעור ולהגדיר סודות Azure OIDC (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) עם תפקיד **משתמש Azure AI** בתחום הפרויקט Foundry.
- **שיעור 17 מיועד למחשב מקומי בלבד.** אין לו נקודת קצה Foundry Responses, לכן פעולה של בדיקת עשן אינה רלוונטית; אמת אותו על-ידי הרצת המחברת במחשב שלך.

## [שוחרר] — 2026-07-06

שחרור זה ממשיך את הקורס ל-**Azure OpenAI Responses API**, מתקן את השמות המסחריים ל-**Microsoft Foundry** ו-**Microsoft Agent Framework (MAF)**, מפסיק את GitHub Models, מעדכן גרסאות SDK, ומוסיף תוכן חדש על מודלים מקומיים ואירוח מסגרות נוספות ב-Foundry.

### נוסף

- **מיומנות מיגרציה** — הותקן Agent Skill [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (מ-[Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) תחת `.agents/skills/`, כולל הפניותיו וסקריפט הסריקה שלו.
- **Foundry Local (הרצת מודלים במכשיר)** — סעיף חדש "ספק אלטרנטיבי: Foundry Local" ב-[00-course-setup/README.md](./00-course-setup/README.md) הכולל התקנה (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, וחיבור `FoundryLocalManager` ל-Microsoft Agent Framework דרך `OpenAIChatClient`.
- **אירוח סוכני LangChain / LangGraph ב-Microsoft Foundry** — סעיף חדש ב-[14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) בנוסף לדוגמה ניתנת להרצה [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) שמשתמש ב-`langchain-azure-ai[hosting]` ו-`ResponsesHostServer` (הפרוטוקול `/responses`), בהתבסס על [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — סעיף חדש "דוגמה מהעולם האמיתי: Microsoft Project Opal" ב-[15-browser-use/README.md](./15-browser-use/README.md) שמציג את Opal כסוכן לניהול מחשב ארגוני וממפה אותו למושאי הקורס (אדם בלולאה, אמון/אבטחה, תכנון, מיומנויות).
- **דוגמת Python שנייה לשיעור 02** — נוספה [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (ראה "שונה" — הועברה מהמחברת הקודמת Semantic Kernel) וקישרה אותה ב-README של השיעור.
- נוספה סעיף "מודלים וספקים" ל-[STUDY_GUIDE.md](./STUDY_GUIDE.md).

### שונה

- **Chat Completions → Responses API (Python).** דוגמאות שקראו למודל ישירות עברו מ-Chat Completions ל-Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), תוך שימוש בלקוח `OpenAI` מול נקודת הקצה היציבה של Azure OpenAI `/openai/v1/` (בלי api_version). דוגמאות מושפעות כוללות:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — מדריך מושא פונקציות מלא (סכמת כלי שטוחה לפורמט Responses, תוצאות הכלי מוחזרות כ-`function_call_output`, `max_output_tokens`, וכו').
- **GitHub Models → Azure OpenAI.** GitHub Models אינו בשימוש עוד (יוצא משימוש ב**יולי 2026**) ואינו תומך ב-Responses API. כל מסלולי הקוד של GitHub Models הומרו ל-Azure OpenAI / Microsoft Foundry ב-Python ו-.NET:
  - Python: מחברות זרימה של שיעור 08 (`01`–`03`), שיעור 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + מסמכי `.md` נלווים, ומחברות זרימת העבודה של DotNET לשיעור 08/`.md` (`01`–`03`) משתמשות כעת ב-`AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` עם `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** המחברת הקודמת `02-semantic-kernel.ipynb` נכתבה מחדש לשימוש ב-Microsoft Agent Framework עם Azure OpenAI (Responses API) ושמה שונה ל-`02-python-agent-framework-azure-openai.ipynb`.
- **אחידות ב-`FoundryChatClient` + `as_agent`.** README וקוד מחברות שהפנו ל-`AzureAIProjectAgentProvider` תאמו לדפוס הקנוני כפי בשיעור 01 ודוגמאות המסגרת: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` עם `provider.as_agent(...)`. עודכן ב-READMEs ומחברות לשיעורים 02–14 (למשל, זיכרון שיעור 13, כל מחברות שיעור 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **שמות מוצר.** שונו בכל התוכן באנגלית:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (ללא שינוי: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", ושמות משתני סביבה.)
- **תלויות** ([requirements.txt](../../requirements.txt)):
  - נעוצות `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - נעוצות `openai>=1.108.1` (מינימום עבור Responses API).
  - הוסר `azure-ai-inference` (ששימש רק בדוגמאות ה-GitHub Models שהועברו).
- **הגדרות סביבה** ([.env.example](../../.env.example)): הוסרו משתני GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); נוספו `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, ואופציונלי `AZURE_OPENAI_API_KEY`; עודכנו שמות ל-Microsoft Foundry.
- **תיעוד** — עודכנו [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), ו-[STUDY_GUIDE.md](./STUDY_GUIDE.md) עבור הנ"ל (הגדרת משתני סביבה, קטע אימות, הנחיות ספק, שמות).

### הוסר

- שלבי העלאה ומשתני סביבה של GitHub Models מתיעוד ההתקנה (הוחלפו ב-Azure OpenAI / Microsoft Foundry).

### אבטחה / פרטיות (ניקוי שיתוף ציבורי)

- נוקו פלטי הרצת מחברות Jupyter ששיחררו **מזהה מנוי Azure** אמיתי, שמות קבוצות משאבים/משאבים, וזיהוי חיבור בינג, בנוסף ל**נתיבי קבצים מקומיים ושמות משתמשים** של מפתחים, ב:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- אושר כי אין מפתחות API, טוקנים, מזהי מנוי או מסלולים אישיים בתוכן המתועד באנגלית (ההפניות ל-`GITHUB_TOKEN` שנותרו הן טוקן של GitHub Actions ב-workflows ו-PAT של שרת GitHub MCP בהגדרת השיעור 11 — שניהם לגיטימיים ואינם קשורים למודלים של GitHub).

### הערות ומגבלות Known

- **לא הורצו/לא קובצו.** אלו דוגמאות חינוכיות שהועדכנו לנכונות API/שמות; הן לא הורצו מול משאבי Azure חיים, ודוגמאות .NET לא קובצו בסביבה זו. וודאו מול פריסת Microsoft Foundry / Azure OpenAI שלכם.
- **פריסת מודל חייבת לתמוך ב-Responses API.** השתמשו בפריסה כמו `gpt-4.1-mini`, `gpt-4.1`, או מודל `gpt-5.x`. מודלים ישנים תומכים בתפקוד Responses הליבה אך לא בכל הפיצ'רים.
- **גרסת Agent-framework.** הדוגמאות מכוונות לגרסת MAF העדכנית ביותר (`>=1.10.0`). הקריאה הקנוני ליצירת סוכן היא `client.as_agent(...)`; ה-API אומתו מול התיעוד שפורסם ומול בנייה מותקנת. אם אתם משתמשים בגרסה שונה, וודאו זמינות שיטות (`as_agent` מול `create_agent`).
- **دفتر העבודה של שיעור 08, תהליך עבודה 04** שומר בכוונה על `AzureAIAgentClient` (מ-Agent-framework-azure-ai) כיוון שהוא משתמש בכלי שירות סוכני Microsoft Foundry מאוחסנים (עיגון Bing, מפרש קוד); הוא מתבסס כבר על Responses.
- **פריסת ברירת מחדל ל-.NET.** שתי דוגמאות תזרימי עבודה ב-dotNET משיעור 08 קודדו בעבר עם מודל ספציפי; כעת כברירת מחדל הן משתמשות ב-`AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). אם דוגמה תלויה בקלט מולטימודלי/חזותי, הגדירו `AZURE_OPENAI_DEPLOYMENT` למודל מתאים.
- **Foundry Local** חושפת נקודת קצה OpenAI תואמת **Chat Completions** ומיועדת לפיתוח מקומי; השתמשו ב-Azure OpenAI / Microsoft Foundry כדי לקבל את כל סט פיצ'רי Responses API.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->