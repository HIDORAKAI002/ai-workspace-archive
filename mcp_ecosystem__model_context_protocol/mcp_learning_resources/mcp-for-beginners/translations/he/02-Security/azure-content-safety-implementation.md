# יישום אבטחת תוכן של Azure עם MCP

> **סיכון MCP של OWASP שטופל**: [MCP06 - הונאת זרימת כוונות](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

כדי לחזק את אבטחת MCP מפני הזרקת הודעות, הרעלת כלים ופגיעויות ספציפיות לבינה מלאכותית אחרות, מומלץ מאוד לשלב את Azure Content Safety. מדריך יישום זה תואם את [סדנת הפסגה לאבטחת MCP (Sherpa)](https://azure-samples.github.io/sherpa/) מחנה 3: אבטחת קלט/פלט.

## אינטגרציה עם שרת MCP

כדי לשלב את Azure Content Safety עם שרת MCP שלך, הוסף את מסנן אבטחת התוכן כתוכנת ביניים (middleware) בצנרת עיבוד הבקשות שלך:

1. אתחל את המסנן בזמן אתחול השרת  
2. אמת את כל בקשות הכלים הנכנסות לפני העיבוד  
3. בדוק את כל התגובות היוצאות לפני החזרתן ללקוחות  
4. תעד ופעל על הפרות בטיחות  
5. יישם טיפול שגיאות מתאים עבור בדיקות אבטחת תוכן שנכשלו

זה מספק הגנה חזקה מפני:  
- התקפות הזרקת הודעות  
- נסיונות הרעלת כלים  
- דליפת נתונים דרך קלטים זדוניים  
- יצירת תוכן מזיק

## שיטות מומלצות לשילוב Azure Content Safety

1. **רשימות חסימה מותאמות**: צור רשימות חסימה מותאמות במיוחד לדפוסי הזרקת MCP  
2. **כוונון חומרה**: התאמת ספי החומרה בהתאם לשימוש הספציפי שלך וסובלנות הסיכון  
3. **כיסוי מקיף**: החל בדיקות אבטחת תוכן על כל הקלטים והפלטים  
4. **אופטימיזציית ביצועים**: שקול יישום מטמון עבור בדיקות אבטחת תוכן חוזרות  
5. **מנגנוני גיבוי**: הגדר התנהגויות גיבוי ברורות כששירותי אבטחת תוכן אינם זמינים  
6. **משוב למשתמש**: ספק משוב ברור למשתמשים כאשר תוכן נחסם עקב חששות אבטחה  
7. **שיפור מתמשך**: עדכן באופן סדיר את רשימות החסימה והדפוסים בהתבסס על איומים מתפתחים

## משאבים נוספים

### הנחיות אבטחת MCP מ-OWASP
- [מדריך אבטחת MCP של OWASP ב-Azure](https://microsoft.github.io/mcp-azure-security-guide/) - עשרת הסיכונים המובילים של OWASP MCP עם יישום ב-Azure  
- [MCP06 - הזרקת הודעות](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - דפוסי הפחתת הזרקת הודעות מפורטים  
- [סדנת פסגת אבטחת MCP](https://azure-samples.github.io/sherpa/) - מחנה 3 מעשי: אבטחת קלט/פלט כולל אבטחת תוכן

### תיעוד Azure
- [סקירה של Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [תיעוד Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [התחלה מהירה ל-Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## מה הלאה

- חזרה ל: [סקירת מודול אבטחה](./README.md)  
- המשך ל: [מודול 3: התחלה](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->