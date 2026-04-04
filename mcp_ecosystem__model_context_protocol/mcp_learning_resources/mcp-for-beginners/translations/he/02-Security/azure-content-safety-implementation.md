# יישום Azure Content Safety עם MCP

> **OWASP MCP סיכון מטופל**: [MCP06 - הזרקת פקודה באמצעות מטענים הקשריים](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

כדי לחזק את האבטחה של MCP מול הזרקת פקודות, הרעלת כלים ופגיעויות ייחודיות ל-AI, מומלץ בחום לשלב את Azure Content Safety. מדריך יישום זה מתאים ל[סדנת פסגת האבטחה MCP (שרפה)](https://azure-samples.github.io/sherpa/) מחנה 3: אבטחת קלט/פלט.

## שילוב עם שרת MCP

כדי לשלב את Azure Content Safety עם שרת MCP שלך, הוסף את מסנן הבטיחות של התוכן כמדי-וור במערך עיבוד הבקשות שלך:

1. יזום את המסנן בעת הפעלת השרת  
2. אמת את כל בקשות הכלים הנכנסות לפני העיבוד  
3. בדוק את כל התגובות היוצאות לפני החזרתן ללקוחות  
4. רשם והתריע על הפרות בטיחות  
5. יישם טיפול שגיאות מתאים לבדיקות בטיחות תוכן שנכשלו  

זה מספק הגנה חזקה כנגד:  
- התקפות הזרקת פקודה  
- ניסיונות הרעלת כלים  
- דליפת נתונים באמצעות קלטים זדוניים  
- יצירת תוכן מזיק  

## שיטות עבודה מומלצות לשילוב Azure Content Safety

1. **רשימות חסימה מותאמות**: צור רשימות חסימה מותאמות במיוחד לדפוסי הזרקה של MCP  
2. **כוונון חומרה**: התאם את ספי החומרה לפי מקרה השימוש והסבילות לסיכון שלך  
3. **כיסוי כולל**: החל בדיקות בטיחות תוכן על כל הקלטים והפלטים  
4. **אופטימיזציית ביצועים**: שקול ליישם מטמון לבדיקות בטיחות תוכן שחוזרות על עצמן  
5. **מנגנוני גיבוי**: הגדר התנהגויות גיבוי ברורות כאשר שירותי בטיחות תוכן אינם זמינים  
6. **משוב למשתמש**: ספק משוב ברור למשתמשים כאשר תוכן נחסם בגלל חששות בטיחות  
7. **שיפור מתמיד**: עדכן בקביעות רשימות חסימה ודפוסים בהתאם לאיומים מתפתחים  

## משאבים נוספים

### הנחיות אבטחת MCP של OWASP
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - עשר האיומים המובילים של OWASP MCP עם יישום Azure נרחב  
- [MCP06 - הזרקת פקודה](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - דפוסי הפחתת הזרקת פקודה מפורטים  
- [סדנת פסגת האבטחה MCP](https://azure-samples.github.io/sherpa/) - מחנה 3: אבטחת קלט/פלט - התכנסות מעשית על בטיחות תוכן  

### תיעוד Azure
- [סקירה כללית של Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [תיעוד מגני פקודות](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [התחלה מהירה של Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## מה הלאה

- חזור אל: [סקירת מודול האבטחה](./README.md)  
- המשך אל: [מודול 3: התחלה](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדייק בתרגום, יש לקחת בחשבון כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להתייחס למסמך המקורי בשפת המקור כמקור הסמכותי. עבור מידע קריטי מומלץ להשתמש בתרגום מקצועי שנעשה על ידי אדם. אנו לא אחראים על אי-הבנות או פרשנויות שגויות הנובעות משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->