# אבטחת MCP מתקדמת עם Azure Content Safety

> **OWASP MCP סיכון מטופל**: [MCP06 - הזרקת פרומפט דרך מטענים קונטקסטואליים](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety מספקת מספר כלים רבי עוצמה שיכולים לשפר את האבטחה של יישומי MCP שלך. לניסיון יישום מעשי, ראה [סדנת פסגת אבטחת MCP (Sherpa)](https://azure-samples.github.io/sherpa/) מחנה 3: אבטחת קלט/פלט.

## מגני פרומפט

מגני הפרומפט של מיקרוסופט לאינטליגנציה מלאכותית מספקים הגנה חזקה נגד התקפות הזרקת פרומפט ישירה ועקיפה באמצעות:

1. **זיהוי מתקדם**: משתמש בלמידת מכונה לזיהוי הוראות מזיקות המוטמעות בתוכן.
2. **הארת מוקד**: משנה טקסט קלט כדי לסייע למערכות ה-AI להבחין בין הוראות תקפות לבין קלטים חיצוניים.
3. **מגדירי תחום וסימון נתונים**: מסמן גבולות בין נתונים מהימנים ולא מהימנים.
4. **אינטגרציה עם Content Safety**: עובד עם Azure AI Content Safety לזהות ניסיונות לפרוץ למערכת ותוכן מזיק.
5. **עדכונים רציפים**: מיקרוסופט מעדכנת באופן קבוע את מנגנוני ההגנה מפני איומים חדשים.

## יישום Azure Content Safety עם MCP

גישה זו מספקת הגנה מרובת שכבות:
- סריקת קלטים לפני עיבוד
- אימות פלט לפני החזרה
- שימוש ברשימות חסימה לתבניות מזיקות מוכרות
- ניצול דגמי Content Safety של Azure המתעדכנים תמידית

## משאבי Azure Content Safety

כדי ללמוד עוד על יישום Azure Content Safety עם שרתי MCP שלך, עיין במשאבים הרשמיים הבאים:

1. [מסמכי Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - מסמכי ההסבר הרשמיים של Azure Content Safety.
2. [מסמכי מגני פרומפט](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - למד כיצד למנוע התקפות הזרקת פרומפט.
3. [API Reference ל-Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - הפנייה מפורטת ל-API ליישום Content Safety.
4. [התחלה מהירה: Azure Content Safety עם C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - מדריך יישום מהיר בשימוש ב-C#.
5. [ספריות לקוח ל-Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - ספריות לקוח לשפות תכנות שונות.
6. [זיהוי ניסיונות פריצה](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - הנחיות ספציפיות לזיהוי ומניעת ניסיונות פריצה.
7. [שיטות עבודה מומלצות ל-Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - שיטות עבודה מומלצות ליישום אפקטיבי של Content Safety.

ליישום מפורט יותר, ראה את [מדריך יישום Azure Content Safety](./azure-content-safety-implementation.md).

## מה הלאה

- קרא: [יישום Azure Content Safety](./azure-content-safety-implementation.md)
- חזור אל: [סקירת מודול האבטחה](./README.md)
- המשך אל: [מודול 3: התחלה](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). אנו שואפים לדיוק, אך יש לקחת בחשבון כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי דיוקים. יש להתייחס למסמך המקורי בשפתו המקורית כמקור הסמכותי. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אנושי. אנו לא נושאים באחריות לכל אי הבנה או פרשנות שגויה הנובעת מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->