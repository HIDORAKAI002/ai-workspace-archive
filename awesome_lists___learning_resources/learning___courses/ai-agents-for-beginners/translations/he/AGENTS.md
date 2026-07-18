# AGENTS.md

## סקירה כללית של הפרויקט

מאגר זה מכיל "סוכני בינה מלאכותית למתחילים" - קורס חינוכי מקיף המלמד את כל הדרוש לבניית סוכני בינה מלאכותית. הקורס כולל 18 שיעורים (מסומנים 00-18) המכסים יסודות, תבניות עיצוב, מסגרות, פריסת ייצור, סוכנים מקומיים / על מכשיר ואבטחת סוכני AI.

**טכנולוגיות מרכזיות:**
- Python 3.12+
- Jupyter Notebooks ללמידה אינטראקטיבית
- מסגרות AI: Microsoft Agent Framework (MAF)
- שירותי Azure AI: Microsoft Foundry, Microsoft Foundry Agent Service V2

**ארכיטקטורה:**
- מבנה מבוסס שיעורים (ספריות 00-15+)
- כל שיעור כולל: תיעוד README, דוגמאות קוד (מחברות Jupyter) ותמונות
- תמיכה בריבוי שפות באמצעות מערכת תרגום אוטומטית
- מחברת Python אחת לכל שיעור המשתמשת ב-Microsoft Agent Framework

## פקודות התקנה

### דרישות מוקדמות
- Python 3.12 ומעלה
- מנוי Azure (ל-Microsoft Foundry)
- Azure CLI מותקן ומאומת (`az login`)

### התקנה ראשונית

1. **שכפל או גזום את המאגר:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # או
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **צור והפעל סביבה וירטואלית של Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # ב-Windows: venv\Scripts\activate
   ```

3. **התקן את התלויות:**
   ```bash
   pip install -r requirements.txt
   ```

4. **הגדר משתני סביבה:**
   ```bash
   cp .env.example .env
   # ערוך את הקובץ .env עם מפתחות ה-API וכתובות הקצה שלך
   ```

### משתני סביבה נדרשים

עבור **Microsoft Foundry** (נדרש):
- `AZURE_AI_PROJECT_ENDPOINT` - נקודת הקצה של פרויקט Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - שם פריסת מודל (לדוגמה, gpt-4.1-mini)

עבור **Azure AI Search** (שיעור 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - נקודת קצה של Azure AI Search
- `AZURE_SEARCH_API_KEY` - מפתח API ל-Azure AI Search

אימות: הפעל `az login` לפני הפעלת המחברות (משתמש ב-`AzureCliCredential`).

## זרימת עבודה לפיתוח

### הפעלת מחברות Jupyter

כל שיעור מכיל מספר מחברות Jupyter עבור מסגרות שונות:

1. **הפעל את Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **נווט לספריית שיעור** (לדוגמה, `01-intro-to-ai-agents/code_samples/`)

3. **פתח והפעל מחברות:**
   - `*-python-agent-framework.ipynb` - שימוש ב-Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - שימוש ב-Microsoft Agent Framework (.NET)

### עבודה עם Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- דורש מנוי Azure
- משתמש ב`FoundryChatClient` עבור Agent Service V2 (סוכנים נראים בפורטל Foundry)
- מוכן לייצור עם אפשרויות תצפית מובנות
- תבנית קבצים: `*-python-agent-framework.ipynb`

## הוראות בדיקה

זהו מאגר חינוכי עם דוגמאות קוד במקום קוד ייצור עם בדיקות אוטומטיות. לאימות ההתקנה והשינויים שלך:

### בדיקות ידניות

1. **בדוק את סביבת Python:**
   ```bash
   python --version  # צריך להיות 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **בדוק הפעלת מחברת:**
   ```bash
   # המר יומן לסקריפט והרץ (יבדוק ייבוא בדיקות)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **אמת את משתני הסביבה:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### הפעלת מחברות בנפרד

פתח מחברות ב-Jupyter והפעל את התאים ברצף. כל מחברת היא עצמאית וכוללת:
- הצהרות ייבוא
- טעינת תצורה
- דוגמאות ליישום סוכנים
- פלטים צפויים בתאי markdown

### בדיקות ראשוניות לסוכנים בפריסה

עבור שיעורים שבהם סוכן פרוס כסוכן שמארח Microsoft Foundry (01, 04, 05, 16), המאגר כולל קטלוגי בדיקות ראשוניות תחת `tests/` שמופעלים על ידי זרימת העבודה `.github/workflows/smoke-test.yml` דרך פעולה [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). אלו שער קל אחרי הפריסה (האם הסוכן נגיש ועומד בציפיות הבסיסיות של הפקודה?), המשלים את צינור ההערכה בשיעורים 10 ו-16. ראה [tests/README.md](./tests/README.md) למיפוי קטלוג-לשיעור-לסוכן. שיעור 17 רץ מקומית עם Foundry Local ואין לו נקודת קצה משותפת, ולכן הוא מאומת על ידי הרצת המחברת שלו ישירות.

## סגנון קוד

### נוהגים בפייתון

- **גרסת Python**: 3.12+
- **סגנון קוד**: פעל לפי קונבנציות PEP 8 סטנדרטיות בפייתון
- **מחברות**: השתמש בתאי markdown ברורים להסברת רעיונות
- **ייבוא**: קבץ לפי ספריה סטנדרטית, צד שלישי, ייבוא מקומי

### נוהגים במחברות Jupyter

- כלול תאי markdown תיאוריים לפני תאי קוד
- הוסף דוגמאות פלט במחברות כהפניה
- השתמש בשמות משתנים ברורים התואמים מושגי השיעור
- שמור על סדר ביצוע המחברת ליניארי (תא 1 → 2 → 3...)

### ארגון קבצים

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## בנייה ופריסה

### בניית תיעוד

מאגר זה משתמש ב-Markdown לתיעוד:
- קבצי README.md בכל תיקיית שיעור
- README.md ראשי בשורש המאגר
- מערכת תרגום אוטומטית באמצעות GitHub Actions

### צינור CI/CD

נמצא ב`.github/workflows/`:

1. **co-op-translator.yml** - תרגום אוטומטי ל-50+ שפות
2. **welcome-issue.yml** - מקבל בברכה יוצרים של עניינים חדשים
3. **welcome-pr.yml** - מקבל בברכה תורמי בקשות משיכה

### פריסה

זהו מאגר חינוכי - ללא תהליך פריסה. משתמשים:
1. גוזרים או משכפלים את המאגר
2. מריצים מחברות מקומית או ב-GitHub Codespaces
3. לומדים על ידי שינוי וניסוי בדוגמאות

## כללי בקשות משיכה

### לפני שליחה

1. **בדוק את השינויים שלך:**
   - הפעל את כל המחברות המושפעות במלואן
   - אמת שכל התאים רצים ללא שגיאות
   - בדוק שהפלטים מתאימים

2. **עדכוני תיעוד:**
   - עדכן README.md אם מוסיפים מושגים חדשים
   - הוסף הערות במחברות לקוד מורכב
   - ודא שתאי markdown מסבירים את המטרה

3. **שינויים בקבצים:**
   - הימנע מלהתחייב לקבצי `.env` (השתמש ב-`.env.example`)
   - אל תתחייב לספריות `venv/` או `__pycache__/`
   - שמור פלטים במחברות שמדגימים מושגים
   - הסר קבצים זמניים וגיבויים של מחברות (`*-backup.ipynb`)

### פורמט כותרת PR

השתמש בכותרות תיאוריות:
- `[Lesson-XX] הוסף דוגמה חדשה עבור <concept>`
- `[Fix] תקן שגיאת כתיב ב-README של שיעור XX`
- `[Update] שפר דוגמת קוד בשיעור XX`
- `[Docs] עדכן הוראות התקנה`

### בדיקות נדרשות

- מחברות צריכות לפעול ללא שגיאות
- קבצי README צריכים להיות ברורים ומדויקים
- עקוב אחרי תבניות קוד קיימות במאגר
- שמור על עקביות עם שיעורים אחרים

## הערות נוספות

### תקלות נפוצות

1. **אי-התאמת גרסת Python:**
   - ודא שמשתמשים ב-Python 3.12+
   - יתכן שחבילות מסוימות לא יעבדו בגרסאות ישנות יותר
   - השתמש ב-`python3 -m venv` כדי לציין במפורש את גרסת Python

2. **משתני סביבה:**
   - תמיד צור `.env` מתוך `.env.example`
   - אל תתחייב לקובץ `.env` (הוא ב`.gitignore`)
   - התחבר עם `az login` לאימות ללא מפתח עם Entra ID

3. **קונפליקטים של חבילות:**
   - השתמש בסביבה וירטואלית חדשה
   - התקן מ-`requirements.txt` במקום חבילות בודדות
   - יתכן שחלק מהמחברות דורשות חבילות נוספות המוזכרות בתאי ה-markdown שלהן

4. **שירותי Azure:**
   - שירותי Azure AI דורשים מנוי פעיל
   - תכונות מסוימות ספציפיות לאזור גאוגרפי
   - ודא שפריסת מודל Azure OpenAI שלך תומכת ב-Responses API

### מסלול למידה

התקדמות מומלצת דרך השיעורים:
1. **00-course-setup** - התחלה להתקנת הסביבה
2. **01-intro-to-ai-agents** - הבנת יסודות סוכני AI
3. **02-explore-agentic-frameworks** - למידה על מסגרות שונות
4. **03-agentic-design-patterns** - תבניות עיצוב עיקריות
5. המשך בשיעורים המסומנים לפי סדר

### בחירת מסגרת

בחר מסגרת בהתאם למטרותיך:
- **כל השיעורים**: Microsoft Agent Framework (MAF) עם `FoundryChatClient`
- **הסוכנים נרשמים בצד השרת** ב-Microsoft Foundry Agent Service V2 ונראים בפורטל Foundry

### קבלת עזרה

- הצטרף ל-[Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- עיין בקבצי README של השיעורים להנחיות ספציפיות
- בדוק את [README.md](./README.md) הראשי לסקירת הקורס
- הסתכל ב-[Course Setup](./00-course-setup/README.md) להוראות התקנה מפורטות

### תרומה

זהו פרויקט חינוכי פתוח. תרומות מתקבלות בברכה:
- שפר דוגמאות קוד
- תקן טעויות או שגיאות דפוס
- הוסף הערות להבהרה
- הצע נושאים חדשים לשיעורים
- תרגום לשפות נוספות

ראה [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) לצרכים הנוכחיים.

## הקשר ספציפי לפרויקט

### תמיכה בריבוי שפות

מאגר זה משתמש במערכת תרגום אוטומטית:
- תמיכה ב-50+ שפות
- תרגומים בתיקיות `/translations/<lang-code>/`
- זרימת עבודה של GitHub Actions מטפלת בעדכוני תרגום
- קבצים מקוריים באנגלית בשורש המאגר

### מבנה השיעור

כל שיעור עוקב אחרי הדפוס עקבי:
1. תמונת ממוזערת וידאו עם קישור
2. תוכן כתוב של השיעור (README.md)
3. דוגמאות קוד בכמה מסגרות
4. מטרות למידה ודרישות מוקדמות
5. משאבי למידה נוספים מקושרים

### שמות דוגמאות קוד

פורמט: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - שיעור 1, MAF Python
- `14-sequential.ipynb` - שיעור 14, תבניות מתקדמות MAF
- `16-python-agent-framework.ipynb` - שיעור 16, סוכן תמיכה בלקוחות בייצור
- `17-local-agent-foundry-local.ipynb` - שיעור 17, סוכן מקומי עם Foundry Local + Qwen

### ספריות מיוחדות

- `translated_images/` - תמונות מתורגמות
- `images/` - תמונות מקוריות לתוכן באנגלית
- `.devcontainer/` - קונפיגורציית מיכל פיתוח ל-VS Code
- `.github/` - זרימות עבודה ותבניות של GitHub Actions

### תלויות

חבילות מפתח מקובץ `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - תמיכה בפרוטוקול Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - שירותי Azure AI
- `azure-identity` - אימות Azure (AzureCliCredential)
- `azure-search-documents` - אינטגרציה עם Azure AI Search
- `mcp[cli]` - תמיכה ב-Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->