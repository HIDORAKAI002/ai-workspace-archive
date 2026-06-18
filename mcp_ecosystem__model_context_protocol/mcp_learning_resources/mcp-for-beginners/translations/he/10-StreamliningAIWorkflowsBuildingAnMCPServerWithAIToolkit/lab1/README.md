# 🚀 מודול 1: יסודות Microsoft Foundry Toolkit

[![משך זמן](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![קושי](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![דרישות מוקדמות](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 מטרות לימוד

בסיום מודול זה, תוכל:
- ✅ להתקין ולהגדיר את הרחבת Microsoft Foundry Toolkit עבור VS Code
- ✅ לנווט בקטלוג המודלים ולהבין מקורות מודלים שונים
- ✅ להשתמש ב-Playground לבדיקות וניסויים עם מודלים
- ✅ ליצור סוכני AI מותאמים אישית באמצעות Agent Builder
- ✅ להשוות ביצועי מודלים בין ספקים שונים
- ✅ ליישם שיטות עבודה מומלצות להנדסת פרומפטים

## 🧠 מבוא ל-Microsoft Foundry Toolkit

ה-**Microsoft Foundry Toolkit Extension עבור VS Code** היא ההרחבה הדגלית של מיקרוסופט שמשנה את VS Code לסביבת פיתוח AI מקיפה. היא מקשרת בין מחקר AI לפיתוח יישומים מעשי, ומנגישה את הגנרטיב AI למפתחים מכל רמות המיומנות.

### 🌟 יכולות מרכזיות

| תכונה | תיאור | שימוש |
|---------|-------------|----------|
| **🗂️ קטלוג מודלים** | גישה ל-100+ מודלים מ-GitHub, ONNX, OpenAI, Anthropic, Google | גילוי ובחירת מודלים |
| **🔌 תמיכה ב-BYOM** | אינטגרציה של מודלים משלך (מקומיים/מרוחקים) | פריסת מודל מותאם אישית |
| **🎮 Playground אינטראקטיבי** | בדיקות מודל בזמן אמת עם ממשק שיחה | פרוטוטיפ מהיר ובדיקות |
| **📎 תמיכה מולטי-מודלית** | טיפול בטקסט, תמונות וקבצים מצורפים | יישומי AI מתקדמים |
| **⚡ עיבוד באצוות** | הרצת פרומפטים במקביל | זרימות עבודה יעילות לבדיקות |
| **📊 הערכת מודלים** | מדדים מובנים (F1, רלוונטיות, דמיון, קוהרנטיות) | הערכת ביצועים |

### 🎯 למה Microsoft Foundry Toolkit חשוב

- **🚀 פיתוח מואץ**: מהרעיונות לפרוטוטייפ בתוך דקות
- **🔄 זרימה אחידה**: ממשק אחד למספר ספקי AI
- **🧪 ניסויים קלים**: השוואת מודלים ללא הגדרות מורכבות
- **📈 מוכן לפרודקשן**: מעבר חלק מפרוטוטייפ לפריסה

## 🛠️ דרישות מוקדמות והגדרה

### 📦 התקנת הרחבת Microsoft Foundry Toolkit

**שלב 1: גש לשוק ההרחבות**
1. פתח את Visual Studio Code
2. עבור לתצוגת ההרחבות (`Ctrl+Shift+X` או `Cmd+Shift+X`)
3. חפש "Microsoft Foundry Toolkit"

**שלב 2: בחר את הגרסה המתאימה**
- **🟢 גרסה יציבה**: מומלץ לשימוש פרודקשן
- **🔶 גרסת ניסיון מוקדמת**: גישה מוקדמת לתכונות חדשות

**שלב 3: התקן והפעל**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/he/aitkext.d28945a03eed003c.webp)

### ✅ רשימת בדיקה לאימות
- [ ] סמל Microsoft Foundry Toolkit מופיע בסרגל הצד של VS Code
- [ ] ההרחבה מופעלת ופעילה
- [ ] אין שגיאות בהתקנה בפאנל הפלט

## 🧪 תרגיל מעשי 1: חקר מודלים מ-GitHub

**🎯 מטרה**: שלוט בקטלוג המודלים ובדוק את מודל ה-AI הראשון שלך

### 📊 שלב 1: ניווט בקטלוג המודלים

קטלוג המודלים הוא השער שלך לאקוסיסטם של AI. הוא מאגד מודלים מכמה ספקים, מה שמקל על גילוי והשוואת אפשרויות.

**🔍 מדריך ניווט:**

לחץ על **MODELS - Catalog** בסרגל הצד של Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/he/aimodel.263ed2be013d8fb0.webp)

**💡 טיפ מקצועי**: חפש מודלים עם יכולות ספציפיות התואמות את המקרה שלך (למשל, יצירת קוד, כתיבה יצירתית, ניתוח).

**⚠️ הערה**: מודלים המתארחים ב-GitHub (כלומר GitHub Models) חינמיים לשימוש אך כפופים למגבלות בקצב הפניות וטוקנים. לגישה למודלים שלא ב-GitHub (מודלים חיצוניים המתארחים דרך Azure AI או נקודות קצה אחרות), תצטרך לספק את מפתח ה-API או האימות המתאים.

### 🚀 שלב 2: הוסף והגדר את המודל הראשון שלך

**אסטרטגיית בחירת מודלים:**
- **GPT-4.1**: הטוב ביותר להיסק וניתוח מורכב
- **Phi-4-mini**: קל משקל, תגובות מהירות למשימות פשוטות

**🔧 תהליך הגדרה:**
1. בחר **OpenAI GPT-4.1** מהקטלוג
2. לחץ **Add to My Models** - מועד את המודל לשימוש שלך
3. בחר **Try in Playground** להשקת סביבת הניסוי
4. המתן לאתחול המודל (הגדרה ראשונה עשויה לקחת זמן)

![Playground Setup](../../../../translated_images/he/playground.dd6f5141344878ca.webp)

**⚙️ הבנת פרמטרי המודל:**
- **טמפרטורה**: שולטת ביצירתיות (0 = דטרמיניסטי, 1 = יצירתי)
- **Max Tokens**: אורך תגובה מקסימלי
- **Top-p**: דגימת ליבה לגיוון בתגובות

### 🎯 שלב 3: שלוט בממשק ה-Playground

ה-Playground הוא מעבדה לניסויי AI שלך. כך תוכל למקסם את הפוטנציאל שלו:

**🎨 שיטות עבודה מומלצות להנדסת פרומפטים:**
1. **היו ספציפיים**: הוראות ברורות ומפורטות מניבות תוצאות טובות יותר
2. **ספק הקשר**: כלול מידע רקע רלוונטי
3. **השתמש בדוגמאות**: הצג למודל מה שאתה רוצה באמצעות דוגמאות
4. **חזור על הפעולה**: שפר את הפרומפטים בהתבסס על התוצאות הראשוניות

**🧪 סצנריוני ניסוי:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/he/result.1dfcf211fb359cf6.webp)

### 🏆 תרגיל אתגר: השוואת ביצועי מודלים

**🎯 מטרה**: השווה בין מודלים שונים באמצעות פרומפטים זהים כדי להבין את חוזקותיהם

**📋 הוראות:**
1. הוסף את **Phi-4-mini** לסביבת העבודה שלך
2. השתמש באותו פרומפט עבור GPT-4.1 ו-Phi-4-mini

![set](../../../../translated_images/he/set.88132df189ecde2c.webp)

3. השווה איכות תגובות, מהירות ודיוק
4. תעד את ממצאיך בחלק התוצאות

![Model Comparison](../../../../translated_images/he/compare.97746cd0f9074955.webp)

**💡 תובנות עיקריות לזיהוי:**
- מתי להשתמש ב-LLM לעומת SLM
- ישימות מול ביצועים
- יכולות ייחודיות של מודלים שונים

## 🤖 תרגיל מעשי 2: בניית סוכנים מותאמים אישית עם Agent Builder

**🎯 מטרה**: צור סוכני AI מיוחדים המותאמים למשימות וזרימות עבודה ספציפיות

### 🏗️ שלב 1: הבנת Agent Builder

Agent Builder הוא המקום שבו Microsoft Foundry Toolkit באמת זורח. הוא מאפשר לך ליצור עוזרי AI ייעודיים שממשיכים כוח של מודלי שפה גדולים עם הוראות מותאמות, פרמטרים ספציפיים וידע מיוחד.

**🧠 רכיבי ארכיטקטורת סוכן:**
- **מודל ליבה**: ה-LLM הבסיסי (GPT-4, Groks, Phi וכו')
- **פרומפט מערכת**: מגדיר אישיות והתנהגות הסוכן
- **פרמטרים**: הגדרות מותאמות לביצועים מיטביים
- **אינטגרציית כלים**: קישור ל-API חיצוניים ושירותי MCP
- **זיכרון**: הקשר שיחה ושמירת מושבים

![Agent Builder Interface](../../../../translated_images/he/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ שלב 2: התעמקות בהגדרות סוכן

**🎨 יצירת פרומפטי מערכת יעילים:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*כמובן, תוכל גם להשתמש ב-Generate System Prompt כדי לקבל עזרה מבוססת AI ביצירת אופטימיזציה של הפרומפטים*

**🔧 אופטימיזציה של פרמטרים:**
| פרמטר | טווח מומלץ | שימוש |
|-----------|------------------|----------|
| **טמפרטורה** | 0.1-0.3 | תגובות טכניות/עובדתיות |
| **טמפרטורה** | 0.7-0.9 | משימות יצירתיות/סיעור מוחות |
| **מקסימום טוקנים** | 500-1000 | תגובות תמציתיות |
| **מקסימום טוקנים** | 2000-4000 | הסברים מפורטים |

### 🐍 שלב 3: תרגיל מעשי - סוכן תכנות בפייתון

**🎯 משימה**: צור עוזר תכנות בפייתון מיוחד

**📋 שלבי הקונפיגורציה:**

1. **בחירת מודל**: בחר **Claude 3.5 Sonnet** (מצוין לקוד)

2. **עיצוב פרומפט מערכת**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **הגדרת פרמטרים**:
   - טמפרטורה: 0.2 (לקוד אמין ועקבי)
   - מרבי טוקנים: 2000 (הסברים מפורטים)
   - Top-p: 0.9 (יצירתיות מאוזנת)

![Python Agent Configuration](../../../../translated_images/he/pythonagent.5e51b406401c165f.webp)

### 🧪 שלב 4: בדיקת סוכן הפייתון שלך

**סצנריוני בדיקה:**
1. **פונקציה בסיסית**: "צור פונקציה למציאת מספרים ראשוניים"
2. **אלגוריתם מורכב**: "מימוש עץ חיפוש בינרי עם פעולות הוספה, מחיקה וחיפוש"
3. **בעיה מהעולם האמיתי**: "בניית ווב סקרייפר שמטפל במגבלות קצב ובנסיונות חוזרים"
4. **איתור בעיות**: "תקן את הקוד הזה [הדבק קוד מלא בbugs]"

**🏆 קריטריונים להצלחה:**
- ✅ הקוד רץ ללא שגיאות
- ✅ כולל תיעוד נכון
- ✅ מיישם שיטות עבודה מומלצות בפייתון
- ✅ מספק הסברים ברורים
- ✅ מציע שיפורים

## 🎓 סיכום מודול 1 והשלבים הבאים

### 📊 בדיקת ידע

בדוק את הבנתך:
- [ ] האם אתה יכול להסביר את ההבדלים בין מודלים בקטלוג?
- [ ] האם יצרת ובדקת בהצלחה סוכן מותאם אישית?
- [ ] האם אתה מבין כיצד לאופטם פרמטרים למקרים שונים?
- [ ] האם תוכל לעצב פרומפטי מערכת יעילים?

### 📚 משאבים נוספים

- **תיעוד Microsoft Foundry Toolkit**: [מסמכי מיקרוסופט הרשמיים](https://github.com/microsoft/vscode-ai-toolkit)
- **מדריך להנדסת פרומפטים**: [שיטות עבודה מומלצות](https://platform.openai.com/docs/guides/prompt-engineering)
- **מודלים ב-Microsoft Foundry Toolkit**: [מודלים בפיתוח](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 מזל טוב!** שלטת ביסודות Microsoft Foundry Toolkit ומוכן לבנות יישומי AI מתקדמים יותר!

### 🔜 המשך למודול הבא

מוכן ליכולות מתקדמות יותר? המשך אל **[מודול 2: MCP עם יסודות Microsoft Foundry Toolkit](../lab2/README.md)** שם תלמד כיצד:
- לחבר את הסוכנים שלך לכלים חיצוניים באמצעות Model Context Protocol (MCP)
- לבנות סוכני אוטומציה לדפדפן עם Playwright
- לשלב שרתי MCP עם סוכני Microsoft Foundry Toolkit שלך
- לחזק את הסוכנים שלך עם נתונים ויכולות חיצוניים

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->