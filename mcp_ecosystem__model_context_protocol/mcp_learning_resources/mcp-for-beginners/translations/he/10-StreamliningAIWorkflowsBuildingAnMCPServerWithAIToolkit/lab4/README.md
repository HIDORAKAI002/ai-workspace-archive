# 🐙 מודול 4: פיתוח MCP מעשי - שרת שיבוט GitHub מותאם אישית

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ התחלה מהירה:** בנה שרת MCP מוכן לייצור שמבצע אוטומציה לשיבוט ריפוזיטוריות GitHub ואינטגרציה עם VS Code תוך 30 דקות בלבד!

## 🎯 יעדי הלמידה

בסוף המעבדה הזו תוכל:

- ✅ ליצור שרת MCP מותאם אישית עבור זרמי עבודה בפיתוח בעולם האמיתי  
- ✅ לממש פונקציונליות שיבוט ריפוזיטוריות GitHub באמצעות MCP  
- ✅ לשלב שרתי MCP מותאמים אישית עם VS Code ו-Agent Builder  
- ✅ להשתמש במצב Agent של GitHub Copilot עם כלי MCP מותאמים אישית  
- ✅ לבדוק ולפרוס שרתי MCP מותאמים בסביבות ייצור

## 📋 דרישות מוקדמות

- השלמת מעבדות 1-3 (יסודות MCP ופיתוח מתקדם)  
- מנוי GitHub Copilot ([רישום חינם זמין](https://github.com/github-copilot/signup))  
- VS Code עם Microsoft Foundry Toolkit והרחבות GitHub Copilot  
- התקנת Git CLI והגדרתו

## 🏗️ סקירת הפרויקט

### **אתגר פיתוח בעולם האמיתי**  
כמפתחים, אנו משתמשים לעתים קרובות ב-GitHub כדי לשכפל ריפוזיטוריות ולפתוח אותן ב-VS Code או VS Code Insiders. תהליך ידני זה כולל:  
1. פתיחת הטרמינל/שורת הפקודה  
2. ניווט לתיקייה הרצויה  
3. הרצת פקודת `git clone`  
4. פתיחת VS Code בתיקיית השיבוט

**פתרון MCP שלנו מפשט זאת לפקודה אינטליגנטית יחידה!**

### **מה תבנה**  
שרת **GitHub Clone MCP** (`git_mcp_server`) המספק:

| תכונה | תיאור | יתרון |
|---------|-------------|---------|
| 🔄 **שיבוט ריפוזיטוריות חכם** | שיבוט ריפוזיטוריות GitHub עם אימות | בדיקת שגיאות אוטומטית |
| 📁 **ניהול תיקיות אינטליגנטי** | בדיקה ויצירת תיקיות בבטחה | מונע כתיבה על תוכן קיים |
| 🚀 **אינטגרציה בין פלטפורמות ל-VS Code** | פתיחת פרויקטים ב-VS Code/Insiders | מעבר חלק בזרם העבודה |
| 🛡️ **טיפול חזק בשגיאות** | טיפול בבעיות רשת, הרשאות ונתיבים | אמינות מוכנה לייצור |

---

## 📖 יישום שלב אחר שלב

### שלב 1: יצירת סוכן GitHub ב-Agent Builder

1. **הפעל את Agent Builder** דרך הרחבת Microsoft Foundry Toolkit  
2. **צור סוכן חדש** עם התצורה הבאה:  
   ```
   Agent Name: GitHubAgent
   ```
  
3. **אתחל שרת MCP מותאם אישית:**  
   - עבור ל-**כלים** → **הוסף כלי** → **שרת MCP**  
   - בחר **"Create A new MCP Server"**  
   - בחר **תבנית Python** לגמישות מירבית  
   - **שם השרת:** `git_mcp_server`

### שלב 2: הגדרת מצב Agent של GitHub Copilot

1. **פתח את GitHub Copilot** ב-VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")  
2. **בחר מודל סוכן** בממשק Copilot  
3. **בחר במודל Claude 3.7** עבור יכולות הסקת מסקנות משופרות  
4. **אפשר אינטגרציית MCP** לגישה לכלים

> **💡 טיפ מקצועי:** Claude 3.7 מספק הבנה מעמיקה של זרמי עבודה בפיתוח ודפוסי טיפול בשגיאות.

### שלב 3: מימוש הפונקציונליות העיקרית של שרת MCP

**השתמש בפקודת הפרומפט המפורטת הבאה עם מצב Agent של GitHub Copilot:**  
```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```


### שלב 4: בדוק את שרת MCP שלך

#### 4a. בדיקה ב-Agent Builder

1. **הפעל את קונפיגורציית הדיבאג** עבור Agent Builder  
2. **הגדר את הסוכן שלך עם פרומפט המערכת הבא:**  
```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```
  
3. **בצע בדיקות עם תרחישי משתמש ריאליסטיים:**  
```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```
  
![Agent Builder Testing](../../../../translated_images/he/DebugAgent.81d152370c503241.webp)

**תוצאות צפויות:**  
- ✅ שיבוט מוצלח עם אישור נתיב  
- ✅ הפעלת VS Code אוטומטית  
- ✅ הודעות שגיאה ברורות בתרחישים לא חוקיים  
- ✅ טיפול נאות במקרים קיצוניים

#### 4b. בדיקה ב-MCP Inspector


![MCP Inspector Testing](../../../../translated_images/he/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 כל הכבוד!** יצרת בהצלחה שרת MCP מעשי ומוכן לייצור הפותר את אתגרי זרימת העבודה הפיתוחית בעולם האמיתי. שרת השיבוט המותאם שלך מראה את עוצמת ה-MCP לאוטומציה ולשיפור פרודוקטיביות המפתחים.

### 🏆 הישג שהושג:  
- ✅ **מפתח MCP** - יצירת שרת MCP מותאם אישית  
- ✅ **אוטומטור זרימות עבודה** - פישוט תהליכי פיתוח  
- ✅ **מומחה אינטגרציה** - חיבור מספר כלים לפיתוח  
- ✅ **מוכן לייצור** - פתרונות פרוסים

---

## 🎓 סיום הסדנה: המסע שלך עם פרוטוקול הקשר למודל

**משתתף יקר,**

ברכות על השלמת כל ארבעת המודולים בסדנת פרוטוקול הקשר למודל! עברת דרך ארוכה מהבנת יסודות Microsoft Foundry Toolkit ועד לבניית שרתי MCP מוכנים לייצור הפותרים אתגרי פיתוח אמיתיים.

### 🚀 סיכום מסלול הלמידה שלך:

**[מודול 1](../lab1/README.md)**: התחלת בחקר יסודות Microsoft Foundry Toolkit, בדיקות מודלים ויצירת סוכן AI ראשון.

**[מודול 2](../lab2/README.md)**: למדת ארכיטקטורת MCP, שילוב Playwright MCP ובנית סוכן אוטומציה לדפדפן ראשון.

**[מודול 3](../lab3/README.md)**: התקדמת לפיתוח שרתי MCP מותאמים עם שרת מזג האוויר וצבירת מומחיות בכלי דיבאג.

**[מודול 4](../lab4/README.md)**: יישמת הכל ליצירת כלי אוטומציה למערכי ריפוזיטוריות GitHub מעשיים.

### 🌟 מה שלטת בו:

- ✅ **אקוסיסטם Microsoft Foundry Toolkit**: מודלים, סוכנים ודפוסי אינטגרציה  
- ✅ **ארכיטקטורת MCP**: עיצוב לקוח-שרת, פרוטוקולי תקשורת ואבטחה  
- ✅ **כלי מפתחים**: מפלטפורמת Playground ל-Inspector ועד לפריסה  
- ✅ **פיתוח מותאם אישית**: בנייה, בדיקה ופריסה של שרתי MCP אישיים  
- ✅ **יישומים מעשיים**: פתרון אתגרי זרימות עבודה אמיתיים עם AI

### 🔮 הצעדים הבאים שלך:

1. **בנה את שרת MCP שלך**: יישם את הכישורים לאוטומציה של זרימות עבודה ייחודיות  
2. **הצטרף לקהילת MCP**: שתף יצירות ולמד מאחרים  
3. **חקור אינטגרציה מתקדמת**: קשר שרתי MCP למערכות ארגוניות  
4. **תורם בקוד פתוח**: סייע בשיפור כלי MCP והתיעוד

זכור, הסדנה היא רק ההתחלה. אקוסיסטם פרוטוקול הקשר למודל מתפתח במהירות, ואתה מצויד להיות בחזית כלי פיתוח מבוססי AI.

**תודה על ההשתתפות והמסירות ללמידה!**

אנו מקווים שסדנה זו עוררה בך רעיונות שישנו את אופן בניית הכלים והאינטראקציה שלך עם AI במסע הפיתוח.

**קידוד מהנה!**

---

## מה הלאה

ברכות על השלמת כל המעבדות במודול 10!

- חזור ל: [סקירת מודול 10](../README.md)  
- המשך ל: [מודול 11: מעבדות מעשיות לשרת MCP](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->