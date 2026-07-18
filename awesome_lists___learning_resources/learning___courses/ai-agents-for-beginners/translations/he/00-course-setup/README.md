# הגדרת הקורס

## הקדמה

בשיעור זה נלמד כיצד להריץ את דוגמאות הקוד של הקורס.

## הצטרפו ללומדים אחרים וקבלו עזרה

לפני שתתחילו לשכפל את הרפוזיטורי שלכם, הצטרפו ל-[ערוץ דיסקורד AI Agents For Beginners](https://aka.ms/ai-agents/discord) כדי לקבל עזרה בהגדרה, שאלות על הקורס או להתחבר ללומדים אחרים.

## שכפול או פיצול של הרפוזיטורי

כדי להתחיל, אנא שכפלו או פצעו את רפוזיטורי הגיטהאב. כך תקבלו גרסה משלכם של חומר הקורס כדי שתוכלו להריץ, לבדוק ולשנות את הקוד!

ניתן לעשות זאת על ידי לחיצה על הקישור ל- <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">פיצול הרפוזיטורי</a>

עכשיו אמורה להיות לכם גרסה מפוצלת משלכם של הקורס בקישור הבא:

![Forked Repo](../../../translated_images/he/forked-repo.33f27ca1901baa6a.webp)

### שכפול רדיד (מומלץ לסדנה / Codespaces)

  >הרפוזיטורי המלא יכול להיות גדול (~3 ג"ב) כאשר אתם מורידים את כל ההיסטוריה וכל הקבצים. אם אתם משתתפים רק בסדנה או צריכים רק כמה תיקיות שיעור, שכפול רדיד (או שכפול דליל) מונע את רוב ההורדה הזאת על ידי קיצור ההיסטוריה ו/או דילוג על בלובים.

#### שכפול רדיד מהיר — היסטוריה מינימלית, כל הקבצים

החליפו את `<your-username>` בפקודות למטה עם כתובת ה-URL של הפיצול שלכם (או עם כתובת האפסטרים אם אתם מעדיפים).

כדי לשכפל רק את ההיסטוריה של הקומיטים האחרונים (הורדה קטנה):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

כדי לשכפל סניף ספציפי:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### שכפול חלקי (דליל) — בלובים מינימליים + רק תיקיות נבחרות

זה משתמש בשכפול חלקי וביציאה דלילה (דורש Git 2.25+ ומומלץ להשתמש ב-Git מודרני עם תמיכה בשכפול חלקי):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

עברו לתיקיית הרפוזיטורי:

```bash|powershell
cd ai-agents-for-beginners
```

לאחר מכן ציינו אילו תיקיות אתם רוצים (בדוגמה למטה יש שתי תיקיות):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

לאחר השכפול ואימות הקבצים, אם אתם צריכים רק את הקבצים ורוצים לפנות מקום (בלי היסטוריית גיט), אנא מחקו את מטא-דאטת הרפוזיטורי (💀 בלתי הפיך — תאבדו את כל פונקציונליות הגיט: אין קומיטים, משיכות, דחיפות, או גישה להיסטוריה).

```bash
# זש/בש
rm -rf .git
```

```powershell
# פאוורשל
Remove-Item -Recurse -Force .git
```

#### שימוש ב-GitHub Codespaces (מומלץ להימנע מהורדות גדולות במחשב המקומי)

- צרו Codespace חדש לרפוזיטורי זה דרך [ממשק GitHub](https://github.com/codespaces).  

- בטרמינל של ה-Codespace החדש, הריצו אחת מהפקודות של השכפול הרדיד/הדליל שלמעלה כדי להביא רק את תיקיות השיעור שאתם צריכים לסביבת Codespace.
- אופציונלי: לאחר השכפול בתוך Codespaces, הסירו את .git כדי לפנות מקום נוסף (ראו פקודות הסרה למעלה).
- שימו לב: אם אתם מעדיפים לפתוח את הרפוזיטורי ישירות ב-Codespaces (בלי שכפול נוסף), שימו לב שה-Codespaces יבנה את סביבת המכולה ועלול לספק יותר ממה שאתם צריכים. שכפול רדיד בתוך Codespace חדש נותן לכם יותר שליטה על השימוש בדיסק.

#### טיפים

- תמיד החליפו את כתובת השכפול עם הפיצול שלכם אם אתם רוצים לערוך/לעשות קומיט.
- אם בעתיד תזדקקו ליותר היסטוריה או קבצים, תוכלו להביא אותם או להתאים את ההגדרות בדילול-היציאה לכלול תיקיות נוספות.

## הרצת הקוד

קורס זה מציע סדרת מחברות Jupyter שתוכלו להריץ כדי לקבל ניסיון מעשי בבניית סוכני AI.

דוגמאות הקוד משתמשות ב**Microsoft Agent Framework (MAF)** עם `FoundryChatClient`, שמתחבר ל**Microsoft Foundry Agent Service V2** (ממשק תגובות) דרך **Microsoft Foundry**.

כל מחברות הפייתון מתויגות כשם `*-python-agent-framework.ipynb`.

## דרישות

- פייתון 3.12+
  - **הערה**: אם אין לכם פייתון 3.12 מותקן, ודאו להתקין אותו. לאחר מכן צרו סביבה וירטואלית (venv) עם python3.12 כדי לוודא שהגרסאות הנכונות מותקנות מתוך קובץ requirements.txt.
  
    >דוגמה

    צרו תיקיית venv לפייתון:

    ```bash|powershell
    python -m venv venv
    ```

    ואז הפעילו את סביבת ה-venv עבור:

    ```bash
    # זש/באש
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: עבור דוגמאות הקוד שמשתמשות ב-.NET, ודאו להתקין את [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) או גרסה מאוחרת יותר. לאחר מכן בדקו את גרסת ה-SDK המותקנת:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — דרוש לאימות. התקינו מ-[aka.ms/installazurecli](https://aka.ms/installazurecli).
- **מנוי Azure** — לגישה ל-Microsoft Foundry ולשירות Microsoft Foundry Agent.
- **פרויקט Microsoft Foundry** — פרויקט עם דגם פרוס (למשל, `gpt-4.1-mini`). ראו [שלב 1](#שלב-1-יצירת-פרויקט-microsoft-foundry) למטה.

כלול בקובץ השורש של הרפוזיטורי קובץ `requirements.txt` שמכיל את כל חבילות הפייתון הדרושות להרצת דוגמאות הקוד.

ניתן להתקין אותן על ידי הרצת הפקודה הבאה בטרמינל, בתיקיית השורש של הרפוזיטורי:

```bash|powershell
pip install -r requirements.txt
```

מומלץ ליצור סביבת עבודה וירטואלית של פייתון כדי להימנע מתנגשות ובעיות.

## הגדרת VSCode

ודאו שאתם משתמשים בגרסה הנכונה של פייתון ב-VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## הגדרת Microsoft Foundry ושירות Microsoft Foundry Agent

### שלב 1: יצירת פרויקט Microsoft Foundry

אתם צריכים **hub** ו**project** ב-Microsoft Foundry עם דגם פרוס כדי להריץ את המחברות.

1. כנסו ל-[ai.azure.com](https://ai.azure.com) והיכנסו עם חשבון Azure שלכם.
2. צרו **hub** חדש (או השתמשו באחד קיים). ראו: [סקירת משאבי Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. בתוך ה-hub, צרו **פרויקט**.
4. פרסמו דגם (למשל, `gpt-4.1-mini`) מתוך **Models + Endpoints** → **Deploy model**.

### שלב 2: השיגו את כתובת ה-endpoint ושם הפריסה של הדגם

מתוך הפרויקט שלכם בפורטל Microsoft Foundry:

- **כתובת Endpoint של הפרויקט** — עברו לעמוד ה-**Overview** והעתיקו את כתובת ה-URL של ה-endpoint.

![Project Connection String](../../../translated_images/he/project-endpoint.8cf04c9975bbfbf1.webp)

- **שם פריסת הדגם** — עברו ל- **Models + Endpoints**, בחרו את הדגם שהפרסתם, ורשמו את **שם הפריסה** (למשל, `gpt-4.1-mini`).

### שלב 3: התחברו ל-Azure באמצעות `az login`

כל המחברות משתמשות ב-**`AzureCliCredential`** לאימות — אין צורך במפתחות API. זה דורש שתהיו מחוברים דרך ה-Azure CLI.

1. **התקינו את Azure CLI** אם עדיין לא עשיתם זאת: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **התחברו** על ידי הרצת:

    ```bash|powershell
    az login
    ```

    או אם אתם בסביבת ריחוק/Codespace בלי דפדפן:

    ```bash|powershell
    az login --use-device-code
    ```

3. **בחרו את המנוי שלכם** אם יתבקש — בחרו את המנוי הכולל את פרויקט Foundry שלכם.

4. **אמתו** שאתם מחוברים:

    ```bash|powershell
    az account show
    ```

> **למה `az login`?** המחברות מאמתות באמצעות `AzureCliCredential` מחבילת `azure-identity`. המשמעות היא שפעילות ה-Azure CLI שלכם מספקת את האישורים — אין צורך במפתחות API או סודות בקובץ `.env`. זו [פרקטיקה מיטבית לאבטחה](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### שלב 4: צרו את קובץ `.env` שלכם

העתיקו את קובץ הדוגמא:

```bash
# זש/באש
cp .env.example .env
```

```powershell
# פאוורשל
Copy-Item .env.example .env
```

פתחו את הקובץ `.env` ומלאו את שני הערכים הבאים:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| משתנה | היכן למצוא אותו |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | פורטל Foundry → הפרויקט שלכם → עמוד **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | פורטל Foundry → **Models + Endpoints** → שם הדגם שהפרסתם |

זהו עבור רוב השעורים! המחברות יאמתו אוטומטית דרך מושב ה-`az login` שלכם.

### שלב 5: התקנת תלות בפייתון

```bash|powershell
pip install -r requirements.txt
```

מומלץ להריץ זאת בתוך סביבת הווירטואלית שיצרתם קודם.

## הגדרה נוספת לשיעור 5 (Agentic RAG)

שיעור 5 משתמש ב**Azure AI Search** ליצירת תוכן מוגבר שליפה. אם אתם מתכננים להריץ את השיעור הזה, הוסיפו את המשתנים הבאים לקובץ `.env` שלכם:

| משתנה | היכן למצוא אותו |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | פורטל Azure → מקור **Azure AI Search** שלכם → **Overview** → כתובת URL |
| `AZURE_SEARCH_API_KEY` | פורטל Azure → מקור **Azure AI Search** שלכם → **Settings** → **Keys** → מפתח מנהל ראשי |

## הגדרה נוספת לשיעורים שקוראים ל-Azure OpenAI ישירות (שיעורים 6 ו-8)

בכמה מחברות בשיעורים 6 ו-8 קורים ל-**Azure OpenAI** ישירות (באמצעות **Responses API**) במקום דרך פרויקט Microsoft Foundry. דוגמאות אלה השתמשו קודם בדגמי GitHub, שזמנם עומד להסתיים (יולי 2026) ואין להם תמיכה ב-Responses API. אם אתם מתכננים להריץ את הדוגמאות האלה, הוסיפו את המשתנים הבאים ל-`.env` שלכם:

| משתנה | היכן למצוא אותו |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | פורטל Azure → מקור **Azure OpenAI** שלכם → **Keys and Endpoint** → Endpoint (למשל `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | שם הדגם שהפרסתם (למשל `gpt-4.1-mini`) שתומך ב-Responses API |
| `AZURE_OPENAI_API_KEY` | אופציונלי — רק אם אתם משתמשים באימות מבוסס מפתח במקום `az login` / Entra ID |

> ממשק Responses API משתמש ב-endpoint יציב `/openai/v1/`, לכן אין צורך בגרסת API. התחברו עם `az login` כדי להשתמש באימות Entra ID ללא מפתחות.

## ספק חלופי: MiniMax (תואם OpenAI)

[MiniMax](https://platform.minimaxi.com/) מספק דגמים עם הקשר גדול (עד 204K טוקנים) דרך API תואם OpenAI. מכיוון ש-Microsoft Agent Framework משתמש ב-`OpenAIChatClient` שיכול לעבוד עם כל endpoint תואם OpenAI, ניתן להשתמש ב-MiniMax כחלופה למערכת Azure OpenAI או OpenAI.

הוסיפו את המשתנים האלה לקובץ `.env` שלכם:

| משתנה | היכן למצוא אותו |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → מפתחות API |
| `MINIMAX_BASE_URL` | השתמשו בכתובת `https://api.minimax.io/v1` (ברירת מחדל) |
| `MINIMAX_MODEL_ID` | שם הדגם לשימוש (למשל, `MiniMax-M3`) |

**דגמים לדוגמה**: `MiniMax-M3` (מומלץ), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (תגובות מהירות יותר). שמות וזמינות הדגמים יכולים להשתנות עם הזמן, וגישה לדגם מסוים תלויה בחשבון או באזור שלכם — בדקו את [MiniMax Platform](https://platform.minimaxi.com/) לקבלת הרשימה הנוכחית. אם `MiniMax-M3` אינו זמין בחשבונכם, הגדירו את `MINIMAX_MODEL_ID` לדגם שיש לכם גישה אליו (למשל `MiniMax-M2.7`).

דוגמאות הקוד שמשתמשות ב-`OpenAIChatClient` (למשל, תהליך הזמנת מלון בשיעור 14) יזהו אוטומטית וישתמשו בקונפיגורציית MiniMax שלכם כאשר `MINIMAX_API_KEY` מוגדר.

## ספק חלופי: Foundry Local (הרצת דגמים במכשיר)

[Foundry Local](https://foundrylocal.ai) הוא רנטיים קל משקל שמוריד, מנהל ומגיש דגמי שפה **במחשב שלכם בלבד** דרך API תואם OpenAI — ללא ענן, ללא מנוי Azure וללא מפתחות API. זו אפשרות מצוינת לפיתוח לא מקוון, ניסוי בלי עלויות ענן, או שמירת נתונים במכשיר.

מאחר ש-Microsoft Agent Framework's `OpenAIChatClient` עובד עם כל endpoint תואם OpenAI, Foundry Local היא אלטרנטיבה מקומית ל-Azure OpenAI.

**1. התקנת Foundry Local**

```bash
# חלונות
winget install Microsoft.FoundryLocal

# מק או אס
brew install foundrylocal
```

**2. הורידו והריצו דגם** (זה גם מפעיל את השירות המקומי):

```bash
foundry model list          # ראה דגמים זמינים
foundry model run phi-4-mini
```

**3. התקינו את ערכת הפיתוח של פייתון** שמשמשת לגילוי ה-endpoint המקומי:

```bash
pip install foundry-local-sdk
```

**4. כוונו את Microsoft Agent Framework לדגם המקומי שלכם:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# מוריד (אם נדרש) ומפעיל את המודל מקומית, ואז מגלה את נקודת הקצה/הפורט.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # לדוגמה http://localhost:<port>/v1
    api_key=manager.api_key,        # תמיד "לא נדרש" עבור Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **הערה:** Foundry Local חושף endpoint OpenAI-Compatible של **Chat Completions**. השתמשו בו לפיתוח מקומי ותסריטי עבודה לא מקוונים. עבור סט התכונות המלא של **Responses API** (שיחות מצביות, תזמור כלים עמוק ושיטת פיתוח סוכנים), מומלץ להשתמש ב-**Azure OpenAI** או בפרויקט **Microsoft Foundry** כפי שמודגם בשיעורים. ראו את [תיעוד Foundry Local](https://foundrylocal.ai) למידע עדכני על קטלוג דגמים ותמיכת פלטפורמה.


## התקנה נוספת לשיעור 8 (Bing Grounding Workflow)

הפנקס עבודה המותנה בשיעור 8 משתמש ב-**Bing grounding** דרך Microsoft Foundry. אם אתה מתכנן להריץ את הדוגמה הזו, הוסף את המשתנה הזה לקובץ `.env` שלך:

| משתנה | איפה למצוא |
|----------|-----------------|
| `BING_CONNECTION_ID` | פורטל Microsoft Foundry → הפרויקט שלך → **Management** → **Connected resources** → חיבור ה-Bing שלך → העתק את מזהה החיבור |

## פתרון בעיות

### שגיאות אימות תעודת SSL במערכת macOS

אם אתה עובד על macOS ומתקל בשגיאה כמו:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

זו בעיה מוכרת עם Python במערכת macOS שבה תעודות SSL של המערכת אינן מהימנות אוטומטית. נסה את הפתרונות הבאים לפי הסדר:

**אפשרות 1: הרץ את סקריפט התקנת התעודות של Python (מומלץ)**

```bash
# החלף את 3.XX בגרסת הפייתון המותקנת שברשותך (למשל, 3.12 או 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**אפשרות 2: השתמש ב-`connection_verify=False` בפנקס ההערות שלך (רק עבור פנקסי מודלים של GitHub)**

בפנקס השיעור 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), פתרון אלטרנטיבי עם הערה כלול כבר. הסר את ההערה מ-`connection_verify=False` בעת יצירת הלקוח:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # השבת אימות SSL אם אתה נתקל בשגיאות בתעודה
)
```

> **⚠️ אזהרה:** השבתת אימות SSL (`connection_verify=False`) מפחיתה את האבטחה על ידי דחיית אימות התעודה. השתמש בזה רק כפתרון זמני בסביבות פיתוח, לעולם לא בפרודקשן.

**אפשרות 3: התקן והשתמש `truststore`**

```bash
pip install truststore
```

לאחר מכן הוסף את הפקודה הבאה בתחילת פנקס ההערות או הסקריפט שלך לפני ביצוע קריאות רשת:

```python
import truststore
truststore.inject_into_ssl()
```

## תקוע איפשהו?

אם יש לך בעיות בהרצת ההתקנה, הצטרף ל <a href="https://discord.gg/kzRShWzttr" target="_blank">קהילת Azure AI בדיסקורד</a> או <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">צור דיווח על בעיה</a>.

## השיעור הבא

כעת אתה מוכן להריץ את קוד הקורס. לימוד מהנה על עולם סוכני ה-AI!

[הקדמה לסוכני AI ומקרי שימוש בסוכנים](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->