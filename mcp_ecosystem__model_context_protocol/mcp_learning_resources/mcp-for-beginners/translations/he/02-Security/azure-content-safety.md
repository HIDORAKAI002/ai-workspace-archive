# אבטחה מתקדמת של MCP באמצעות Azure Content Safety

> **OWASP MCP סיכון מטופל**: [MCP06 - כיפוף זרימת כוונה](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety מספקת מספר כלים רבי עוצמה שיכולים לשפר את האבטחה של יישומי MCP שלך. לניסיון יישומי מעשי, עיין ב[סדנת פסגת אבטחת MCP (שרפה)](https://azure-samples.github.io/sherpa/) מחנה 3: אבטחת קלט/פלט.

## מגני פקודה

מגני הפקודה של מיקרוסופט מספקים הגנה חזקה מפני התקפות הזרקת פקודה ישירות ועקיפות באמצעות:

1. **זיהוי מתקדם**: משתמש בלמידת מכונה לזיהוי הוראות זדוניות המוטמעות בתוכן.
2. **הארת הנקודות**: משנה את טקסט הקלט לעזרה למערכות בינה מלאכותית להבחין בין הוראות תקפות לקלטים חיצוניים.
3. **מפרידים וסימון נתונים**: מסמן גבולות בין נתונים מהימנים לנתונים לא מהימנים.
4. **שילוב עם Content Safety**: עובד עם Azure AI Content Safety לזיהוי ניסיונות פריצת גדרות ותוכן מזיק.
5. **עדכונים מתמידים**: מיקרוסופט מעדכנת באופן קבוע את מנגנוני ההגנה נגד איומים חדשים.

## יישום Azure Content Safety עם MCP

גישה זו מספקת הגנה רב-שכבתית:
- סריקת קלטים לפני עיבוד
- אימות פלטים לפני החזרה
- שימוש ברשימות חסימה לדפוסים מזיקים מוכרים
- שימוש במודלים של Content Safety של Azure המתעדכנים באופן שוטף

## משאבי Azure Content Safety

למידע נוסף על יישום Azure Content Safety עם שרתי MCP שלך, עיין במשאבים הרשמיים הבאים:

1. [תיעוד Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - תיעוד רשמי עבור Azure Content Safety.
2. [תיעוד מגני פקודה](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - למד כיצד למנוע התקפות זריקת פקודות.
3. [מדריך API ל-Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - הפניה מפורטת ל-API ליישום Content Safety.
4. [התחלה מהירה: Azure Content Safety עם C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - מדריך מהיר ליישום תוך שימוש ב-C#.
5. [ספריות לקוח ל-Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - ספריות לקוח לשפות תכנות שונות.
6. [זיהוי ניסיונות פריצת גדרות](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - הנחיות ספציפיות לזיהוי ומניעת ניסיונות פריצה.
7. [שיטות עבודה מומלצות ל-Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - שיטות עבודה מומלצות ליישום יעיל של Content Safety.

להמשך יישום מעמיק יותר, עיין במדריך היישום שלנו ל[Azure Content Safety Implementation](./azure-content-safety-implementation.md).

## מה הלאה

- קרא: [יישום Azure Content Safety](./azure-content-safety-implementation.md)
- חזור אל: [סקירת מודול האבטחה](./README.md)
- המשך אל: [מודול 3: התחלה](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->