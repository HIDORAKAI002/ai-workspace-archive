# 🚀 10 שרתי Microsoft MCP שמשנים את פרודוקטיביות המפתחים

## 🎯 מה תלמד במדריך זה

מדריך מעשי זה מציג עשרה שרתי Microsoft MCP שמשנים את אופן העבודה של מפתחים עם עזרי בינה מלאכותית. במקום להסביר רק מה שרתי MCP *יכולים* לעשות, נראה לך שרתים שכבר עושים שינוי אמיתי בשגרות הפיתוח היומיות ב-Microsoft ומעבר לה.

כל שרת במדריך זה נבחר בהתבסס על שימוש אמיתי ומשוב מפתחים. תגלה לא רק מה כל שרת עושה, אלא גם למה זה חשוב ואיך להפיק ממנו את המירב בפרויקטים שלך. בין אם אתה חדש לחלוטין ב-MCP או מחפש להרחיב את ההגדרות הקיימות שלך, שרתים אלה מייצגים כמה מהכלים הפרקטיים והמשפיעים ביותר במערכת האקולוגית של Microsoft.

> **💡 טיפ התחלה מהירה**
> 
> חדש ל-MCP? אין דאגה! מדריך זה מיועד להיות ידידותי למתחילים. נסביר מושגים תוך כדי, ואתה תמיד יכול לחזור אל [הקדמה ל-MCP](../00-Introduction/README.md) ו[מושגים בסיסיים](../01-CoreConcepts/README.md) לקבלת רקע מעמיק יותר.

## סקירה כללית

מדריך מקיף זה חוקר עשרה שרתי Microsoft MCP שמשנים את האופן שבו מפתחים מתקשרים עם עוזרי בינה מלאכותית וכלים חיצוניים. החל מניהול משאבי Azure ועד לעיבוד מסמכים, שרתים אלה מראים את עוצמת פרוטוקול הקשר המודל ביצירת תהליכי פיתוח חלקים ויעילים.

## מטרות למידה

בסיום מדריך זה, תוכל:
- להבין כיצד שרתי MCP משפרים את פרודוקטיביות המפתחים
- ללמוד על יישומים משפיעים של שרתי MCP מ-Microsoft
- לגלות מקרים מעשיים לכל שרת
- לדעת כיצד להגדיר ולכונן שרתים אלו ב-VS Code ו-Visual Studio
- לחקור את מערכת האקולוגית הרחבה של MCP וכיווני עתיד

## 🔧 הבנת שרתי MCP: מדריך למתחילים

### מה הם שרתי MCP?

כמתחיל בפרוטוקול הקשר המודל (MCP), ייתכן ותתהה: "מה בדיוק שרת MCP, ולמה כדאי לי להתעניין?" נתחיל בדימוי פשוט.

חשוב על שרתי MCP כסייעים מיוחדים שעוזרים לעוזר הקידוד שלך (כמו GitHub Copilot) להתחבר לכלים ושירותים חיצוניים. בדיוק כמו שאתה משתמש באפליקציות שונות בטלפון שלך למשימות שונות — אחת למזג אוויר, אחת לניווט, אחת לבנקאות — שרתי MCP נותנים לעוזר ה-AI שלך את היכולת לתקשר עם כלים ושירותי פיתוח שונים.

### הבעיה ששרתים אלה פותרים

לפני שרתי MCP, אם רצית:
- לבדוק את משאבי Azure שלך
- ליצור issue ב-GitHub
- לשאול את בסיס הנתונים שלך
- לחפש בתיעוד

היית צריך להפסיק לקודד, לפתוח דפדפן, לנווט לאתר המתאים, ולבצע את המשימות ידנית. המהלך התמידי של החלפת ההקשר שובר את זרימת העבודה שלך ומפחית את הפרודוקטיביות.

### כיצד שרתי MCP משפרים את חוויית הפיתוח שלך

עם שרתי MCP, תוכל להישאר בסביבת הפיתוח שלך (VS Code, Visual Studio וכו') ולבקש מהעוזר ה-AI לטפל במשימות אלו. לדוגמה:

**במקום תהליך מסורתי זה:**
1. להפסיק לקודד
2. לפתוח דפדפן
3. לנווט לפורטל Azure
4. לבדוק פרטי חשבון אחסון
5. לחזור ל-VS Code
6. להמשיך לקודד

**עכשיו אפשר לעשות כך:**
1. לשאול את ה-AI: "מה מצב חשבונות האחסון שלי ב-Azure?"
2. להמשיך לקודד עם המידע שסופק

### יתרונות מרכזיים למתחילים

#### 1. 🔄 **להישאר במצב זרימה**
- בלי להחליף בין אפליקציות שונות
- לשמור על המיקוד בקוד שאתה כותב
- להפחית עומס מנטלי של ניהול כלים שונים

#### 2. 🤖 **להשתמש בשפה טבעית במקום פקודות מורכבות**
- במקום לשנן תחביר SQL, לתאר איזה מידע אתה צריך
- במקום לזכור פקודות Azure CLI, להסביר מה אתה רוצה להשיג
- לתת ל-AI לטפל בפרטים הטכניים בזמן שאתה מתמקד בלוגיקה

#### 3. 🔗 **לחבר כלים רבים יחד**
- ליצור תהליכי עבודה חזקים בשילוב שירותים שונים
- דוגמה: "קבל את כל ה-issues האחרונים ב-GitHub ויצר corresponding Azure DevOps work items"
- לבנות אוטומציה מבלי לכתוב סקריפטים מורכבים

#### 4. 🌐 **גישה למערכת אקולוגית מתרחבת**
- ליהנות משרתים שנבנו על ידי Microsoft, GitHub וחברות אחרות
- לשלב כלים שונים של ספקים שונים בצורה חלקה
- להצטרף למערכת סטנדרטית שפועלת בכל עוזרי ה-AI השונים

#### 5. 🛠️ **ללמוד תוך עשייה**
- להתחיל עם שרתים מוכנים כדי להבין את המושגים
- להדרגה לבנות שרתים משלך נכנס לך יותר נוחות
- להשתמש ב-SDKים ומתעד כדי להנחות את הלמידה שלך

### דוגמה מעשית למתחילים

נאמר שאתה חדש בפיתוח ווב ועובד על הפרויקט הראשון שלך. כך שרתי MCP יכולים לעזור:

**גישה מסורתית:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**עם שרתי MCP:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### היתרון התקני לארגונים

MCP הופך לסטנדרט תעשייתי, מה שאומר:
- **עקביות**: חווייה דומה בכלים ובחברות שונות
- **אינטראופרביליות**: שרתים מספקים שונים עובדים יחד
- **עומדות לעתיד**: כישורים והגדרות עוברים בין עוזרי AI שונים
- **קהילה**: מערכת אקולוגית גדולה של ידע ומשאבים משותפים

### התחלה: מה תלמד

במדריך זה נחקור 10 שרטי Microsoft MCP שהם במיוחד שימושיים למפתחים בכל הרמות. כל שרת מיועד ל:
- לפתור אתגרים נפוצים בפיתוח
- להפחית משימות חוזרות
- לשפר איכות קוד
- להעצים אפשרויות למידה

> **💡 טיפ למידה**
> 
> אם אתה חדש לחלוטין ב-MCP, התחל עם [הקדמה ל-MCP](../00-Introduction/README.md) ו[מושגים בסיסיים](../01-CoreConcepts/README.md). לאחר מכן חזור לכאן לראות את המושגים הללו בפעולה עם כלים אמיתיים של Microsoft.
>
> לקבלת הקשר נוסף על החשיבות של MCP, עיין בפוסט של מריה נגגה: [Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## התחלה עם MCP ב-VS Code ו-Visual Studio 🚀

הגדרת שרתי MCP אלה פשוטה אם אתה משתמש ב-Visual Studio Code או ב-Visual Studio 2022 עם GitHub Copilot.

### הגדרת VS Code

כך התהליך הבסיסי ב-VS Code:

1. **הפעל מצב סוכן**: ב-VS Code, החלף למצב Agent בחלון שיחת Copilot
2. **הגדר שרתי MCP**: הוסף הגדרות שרת לקובץ settings.json של VS Code
3. **הפעל שרתים**: לחץ על כפתור "התחל" עבור כל שרת שברצונך להשתמש בו
4. **בחר כלים**: בחר אילו שרתי MCP להפעיל במפגש הנוכחי

להוראות מפורטות, ראה את [תיעוד MCP ל-VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 טיפ מקצוען: נהל שרתי MCP כמו מקצוען!**
> 
> ממשק ההרחבות של VS Code כולל עכשיו [ממשק ניהול חדש לניהול שרתי MCP](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! יש לך גישה מהירה להפעיל, להפסיק ולנהל כל שרת MCP מותקן דרך ממשק ברור ופשוט. נסה זאת!

### הגדרת Visual Studio 2022

ל-Visual Studio 2022 (גרסה 17.14 ומעלה):

1. **הפעל מצב סוכן**: לחץ על תפריט נפתח "Ask" בחלון שיחת GitHub Copilot ובחר "Agent"
2. **צור קובץ הגדרות**: צור קובץ `.mcp.json` בתיקיית הפתרון שלך (מיקום מומלץ: `<SOLUTIONDIR>\.mcp.json`)
3. **הגדר שרתים**: הוסף את הגדרות שרתי MCP בפורמט סטנדרטי
4. **אישור כלים**: כאשר תתבקש, אשר את הכלים שברצונך להשתמש בהם עם הרשאות היקף מתאימות

להוראות מפורטות, ראה את [תיעוד MCP ל-Visual Studio](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

כל שרת MCP מגיע עם דרישות הגדרה משלו (מחרוזות חיבור, אימות וכו'), אך דפוס ההגדרה עקבי בשתי סביבות הפיתוח.

## לקחים משרתי Microsoft MCP 🛠️

### 1. 📚 שרת Microsoft Learn Docs MCP

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**מה הוא עושה**: שרת Microsoft Learn Docs MCP הוא שירות מבוסס ענן שמספק לעוזרי AI גישה בזמן אמת לתיעוד הרשמי של Microsoft דרך פרוטוקול הקשר המודל. הוא מתחבר ל-`https://learn.microsoft.com/api/mcp` ומאפשר חיפוש סמנטי חכם ב-Microsoft Learn, תיעוד Azure, תיעוד Microsoft 365 ומקורות רשמיים אחרים של Microsoft.

**למה זה שימושי**: למרות שזה עשוי להיראות כ"סתם תיעוד", שרת זה חשוב במיוחד לכל מפתח שמשתמש בטכנולוגיות Microsoft. אחת התלונות הגדולות של מפתחי .NET על עוזרי קוד מבוססי AI היא שהם לא מעודכנים בגרסאות האחרונות של .NET ו-C#. שרת Microsoft Learn Docs MCP פותר זאת על ידי מתן גישה בזמן אמת לתיעוד הכי עדכני, הפניות API ופרקטיקות מיטביות. בין אם אתה עובד עם ה-SDKs החדשים של Azure, בוחן תכונות חדשות ב-C# 13, או מיישם דפוסי Aspire מתקדמים ב-.NET, שרת זה מוודא שלעוזר ה-AI שלך יש גישה למידע מוסמך ומעודכן כדי להפיק קוד מדויק ומודרני.

**שימוש מעשי**: "מהן הפקודות az cli ליצירת אפליקציית container ב-Azure לפי התיעוד הרשמי של Microsoft Learn?" או "איך להגדיר Entity Framework עם הזרקת תלות ב-ASP.NET Core?" או "סקר את הקוד הזה לוודא שהוא עומד בהמלצות הביצועים בתיעוד Microsoft Learn." השרת מספק כיסוי מקיף ב-Microsoft Learn, תיעוד Azure ותיעוד Microsoft 365 באמצעות חיפוש סמנטי מתקדם למציאת המידע ההקשרי הרלוונטי ביותר. הוא מחזיר עד 10 מקטעי תוכן איכותיים עם כותרות מאמרים וקישורים, תוך גישה מתמדת לתיעוד העדכני ביותר של Microsoft לאחר פרסומו.

**דוגמה מרכזית**: השרת מציג את הכלי `microsoft_docs_search` שמבצע חיפוש סמנטי בתיעוד הטכני הרשמי של Microsoft. אחרי ההגדרה, ניתן לשאול שאלות כמו "איך ליישם אימות JWT ב-ASP.NET Core?" ולקבל תשובות רשמיות ומפורטות עם קישורי מקור. איכות החיפוש מצוינת כי הוא מבין הקשר – שאילתה על "containers" בהקשר של Azure תחזיר תיעוד לגבי Azure Container Instances, ואילו בהקשר של .NET תחזיר מידע רלוונטי על קולקציות ב-C#.

זה שימושי במיוחד עבור ספריות ומקרי שימוש שמשתנים במהירות או עודכנו לאחרונה. לדוגמה, בפרויקטי קוד לאחרונים רציתי לנצל תכונות בגרסאות האחרונות של .NET Aspire ו-Microsoft.Extensions.AI. על ידי הכללת שרת Microsoft Learn Docs MCP, הצלחתי לנצל לא רק תיעוד API, אלא גם מדריכים והכוונה שפורסמו זה עתה.

> **💡 טיפ מקצוען**
> 
> אפילו מודלים שמוכנים לכלים צריכים עידוד לשימוש בכלי MCP! שקול להוסיף הנחיית מערכת או [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) כגון: "יש לך גישה ל-`microsoft.docs.mcp` – השתמש בכלי זה לחיפוש בתיעוד הרשמי המעודכן של Microsoft בעת טיפול בשאלות על טכנולוגיות Microsoft כמו C#, Azure, ASP.NET Core או Entity Framework."
>
> לדוגמה מעולה לכך, עיין במצב השיחה [C# .NET Janitor](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) ממאגר Awesome GitHub Copilot. מצב זה מנצל במיוחד את שרת Microsoft Learn Docs MCP כדי לסייע בניקוי ועדכון קוד C# בשימוש בדפוסים וטכניקות מודרניות.
### 2. ☁️ שרת Azure MCP
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**מה זה עושה**: שרת Azure MCP הוא חבילה מקיפה של למעלה מ-15 מחברי שירות Azure מתמחים המכניסים את כל האקוסיסטם של Azure לתוך זרימת העבודה של ה-AI שלך. זה לא רק שרת אחד – זוהי אוסף חזק הכולל ניהול משאבים, חיבוריות לבסיסי נתונים (PostgreSQL, SQL Server), ניתוח יומני Azure Monitor עם KQL, שילוב Cosmos DB, והרבה יותר.

**למה זה שימושי**: מעבר לניהול משאבי Azure, שרת זה משפר באופן דרמטי את איכות הקוד בעת עבודה עם SDKs של Azure. כאשר אתה משתמש ב-Azure MCP במצב Agent, הוא לא רק עוזר לך לכתוב קוד – הוא עוזר לך לכתוב *קוד Azure טוב יותר* העוקב אחר דפוסי אימות עדכניים, שיטות הטיפול בשגיאות הטובות ביותר, ומנציל את התכונות האחרונות של ה-SDK. במקום לקבל קוד כללי שעשוי לעבוד, אתה מקבל קוד שעקבי אחר דפוסי Azure המומלצים לעומסי עבודה בייצור.

**מודולים מרכזיים כוללים**:
- **🗄️ מחברי בסיסי נתונים**: גישה ישירה בשפה טבעית אל בסיסי הנתונים של Azure ל-PostgreSQL ו-SQL Server
- **📊 Azure Monitor**: ניתוח יומנים עם KQL ותובנות תפעוליות
- **🌐 ניהול משאבים**: ניהול מחזור חיים מלא של משאבי Azure
- **🔐 אימות**: דפוסי DefaultAzureCredential וזהויות מנוהלות
- **📦 שירותי אחסון**: אחסון Blob, אחסון Queue, ופעולות אחסון Table
- **🚀 שירותי מכולות**: Azure Container Apps, Container Instances, וניהול AKS
- **ועוד מחברים מתמחים רבים**

**שימושים מעשיים**: "רשום את חשבונות האחסון שלי ב-Azure", "השאל שדה עבודה של Log Analytics עבור שגיאות בשעה האחרונה", או "עזור לי לבנות אפליקציית Azure באמצעות Node.js עם אימות נכון"

**תרחיש הדגמה מלא**: הנה תהליך מלא שמראה את עוצמת השילוב של Azure MCP עם תוסף GitHub Copilot for Azure ב-VS Code. כאשר יש לך את שניהם מותקנים ומתבקשים:

> "צור סקריפט Python שמעלה קובץ ל-Azure Blob Storage באמצעות אימות DefaultAzureCredential. הסקריפט צריך להתחבר לחשבון האחסון Azure שלי בשם 'mycompanystorage', להעלות לאזור מלא בשם 'documents', ליצור קובץ בדיקה עם חותמת זמן נוכחית להעלאה, לטפל בשגיאות בצורה עדינה ולספק פלט אינפורמטיבי, לעקוב אחר שיטות האימות והטיפול בשגיאות המומלצות של Azure, לכלול הערות המבהירות כיצד פועל אימות DefaultAzureCredential, ולבנות את הסקריפט בצורה מסודרת עם פונקציות ותיעוד מתאימים."

שרת Azure MCP יוצר סקריפט Python שלם מוכן לייצור ש:
- משתמש ב-SDK האחרון של Azure Blob Storage עם דפוסי async נכונים
- מיישם DefaultAzureCredential עם הסבר מלא על שרשרת הנפילה
- כולל טיפול שגיאות חזק עם סוגי חריגות ספציפיות של Azure
- עוקב אחר שיטות עבודה מומלצות של SDK Azure לניהול משאבים ולחיבור
- מספק רישום מפורט ופלט אינפורמטיבי במסוף
- יוצר סקריפט מסודר עם פונקציות, תיעוד, ואיתותי סוג

מה שהופך את זה לייחודי הוא שבלי Azure MCP, ייתכן שתקבל קוד אחסון Blob כללי שעובד אך לא עוקב אחר דפוסי Azure הנוכחיים. עם Azure MCP, אתה מקבל קוד שמנצל את שיטות האימות האחרונות, מטפל בתרחישי שגיאות ספציפיות ל-Azure, ועוקב אחר שיטות מיקרוסופט המומלצות ליישומים בייצור.

**דוגמה מוצגת**: התקשיתי לזכור את הפקודות הספציפיות עבור כלי השורת הפקודה `az` ו-`azd` לשימוש נקודתי. תמיד מדובר בתהליך שני שלבים בשבילי: קודם לבדוק את התחביר, ואז להריץ את הפקודה. לעיתים אני פשוט נכנס לפורטל ולוחץ כדי להשלים את העבודה כי איני רוצה להודות שאיני זוכר את התחביר. היכולת פשוט לתאר את מה שאני רוצה היא מדהימה, ואפילו יותר טוב לעשות זאת מבלי לעזוב את סביבת הפיתוח שלי!

יש רשימה מעולה של מקרי שימוש ב[מאגר Azure MCP](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server) להתחלה מהירה. למדריכים מקיפים להתקנה ולהגדרות מתקדמות, עיין בתיעוד הרשמי של [Azure MCP](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 שרת GitHub MCP

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**מה זה עושה**: שרת GitHub MCP הרשמי מספק אינטגרציה חלקה עם כל האקוסיסטם של GitHub, כולל אפשרויות גישה מרוחקת מתארחת ופריסת Docker מקומית. זה לא רק פעולות בסיסיות עם מאגרים – מדובר בערכה מקיפה שכוללת ניהול GitHub Actions, תהליכי pull request, מעקב אחר סוגיות, סריקת אבטחה, התראות, ויכולות אוטומציה מתקדמות.

**למה זה שימושי**: שרת זה משנה את האופן שבו אתה מתקשר עם GitHub בכך שהוא מביא את חוויית הפלטפורמה המלאה ישירות לסביבת הפיתוח שלך. במקום לעבור כל הזמן בין VS Code ו-GitHub.com לניהול פרויקטים, סקירות קוד ומעקב CI/CD, אתה יכול לטפל בכל זאת באמצעות פקודות בשפה טבעית תוך שמירה על ריכוז בקוד שלך.

> **ℹ️ הערה: סוגים שונים של 'סוכנים'**
> 
> אל תבלבל בין שרת GitHub MCP זה לבין הסוכן הקוד של GitHub (הסוכן מבוסס ה-AI שניתן להקצות לו סוגיות למשימות קידוד אוטומטיות). שרת GitHub MCP פועל במצב Agent של VS Code לספק אינטגרציית API עם GitHub, בעוד שסוכן הקוד של GitHub הוא תכונה נפרדת שיוצרת pull requests כאשר הוא מוקצה לסוגיות GitHub.

**יכולות מרכזיות כוללות**:
- **⚙️ GitHub Actions**: ניהול מלא של צינור CI/CD, מעקב אחר תהליכים וניהול ארטיפקטים
- **🔀 Pull Requests**: יצירה, סקירה, מיזוג וניהול PRים עם מעקב מצב מקיף
- **🐛 סוגיות**: ניהול מחזור חיים מלא של סוגיות, תגובות, תיוג והקצאה
- **🔒 אבטחה**: התראות סריקת קוד, גילוי סודות, ואינטגרציה עם Dependabot
- **🔔 התראות**: ניהול חכם של התראות ושליטה במנויים למאגרים
- **📁 ניהול מאגרים**: פעולות קבצים, ניהול ענפים, וממשק ניהול מאגרים
- **👥 שיתוף פעולה**: חיפוש משתמשים וארגונים, ניהול צוותים, ושליטה בגישה

**שימושים מעשיים**: "צור pull request מענף התכונה שלי", "הראה לי את כל ריצות CI שנכשלו השבוע", "רשום לי את כל התראות האבטחה הפתוחות למאגרים שלי", או "מצא את כל הסוגיות שהוקצו לי בין הארגונים שלי"

**תרחיש הדגמה מלא**: הנה תהליך עבודה חזק המדגים את יכולות שרת GitHub MCP:

> "אני צריך להתכונן לסקירת הספרינט שלנו. הראה לי את כל ה-PRים שיצרתי השבוע, בדוק את מצב צינורות ה-CI/CD שלנו, צור סיכום של התראות אבטחה שצריך לטפל בהן, ועזור לי לנסח הערות שחרור על בסיס PRים מאוחדים עם התווית 'feature'."

שרת GitHub MCP יבצע:
- שאילתה של בקשות העיגון האחרונות עם מידע מצב מפורט
- ניתוח ריצות התהליכים והדגשת כשלונות או בעיות ביצועים
- איסוף תוצאות סריקת אבטחה ומתן עדיפות להתראות קריטיות
- יצירת הערות שחרור מקיפות מתוך המידע בבקשות מאוחדות
- מתן המלצות לפעולות להמשך תכנון ספרינט והכנות לשחרור

**דוגמה מוצגת**: אני אוהב להשתמש בזה עבור תהליכי סקירת קוד. במקום לקפוץ בין VS Code, התראות GitHub, ודפי pull request, אני יכול לומר "הראה לי את כל ה-PRים שמחכים לסקירה שלי" ואז "הוסף תגובה ל-PR מספר 123 לגבי הטיפול בשגיאות בשיטת האימות." השרת מנהל את קריאות ה-API של GitHub, שומר על הקשר של הדיון, ואפילו עוזר לי לנסח תגובות סקירה בונות יותר.

**אפשרויות אימות**: השרת תומך הן ב-OAuth (חלק ב-VS Code) והן בטוקני גישה אישית, עם כלים שניתן להגדיר להפעלת הפונקציונליות של GitHub הרצויה בלבד. אפשר להריץ אותו כשירות מתארח מרחוק להקמה מיידית או מקומית דרך Docker לשליטה מלאה.

> **💡 טיפים מקצועיים**
> 
> אפשר רק את מערכות הכלים הדרושות לך על ידי קונפיגורציה של הפרמטר `--toolsets` בהגדרות שרת ה-MCP שלך להפחתת גודל ההקשר ושיפור בחירת כלי ה-AI. לדוגמה, הוסף `"--toolsets", "repos,issues,pull_requests,actions"` להגדרות MCP עבור תהליכי פיתוח מרכזיים, או השתמש ב-`"--toolsets", "notifications, security"` אם ברצונך בעיקר לממש יכולות ניטור GitHub.
### 4. 🔄 שרת Azure DevOps MCP

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**מה זה עושה**: מחבר לשירותי Azure DevOps לניהול פרויקטים כולל, מעקב אחר פריטי עבודה, ניהול צינורות בנייה, ופעולות על מאגרים.

**למה זה שימושי**: עבור צוותים המשתמשים ב-Azure DevOps כפלטפורמת DevOps עיקרית, שרת MCP זה מבטל את הצורך לעבור בין סביבת הפיתוח לממשק האינטרנטי של Azure DevOps. ניתן לנהל פריטי עבודה, לבדוק סטטוסים של בנייה, לשאול מאגרים ולטפל במשימות ניהול פרויקט ישירות מהעוזר AI שלך.

**שימושים מעשיים**: "הראה לי את כל פריטי העבודה הפעילים בספרינט הנוכחי עבור פרויקט WebApp", "צור דוח באג עבור בעיית הכניסה שמצאתי כרגע", או "בדוק את מצב צינורות הבנייה שלנו והראה לי כישלונות אחרונים"

**דוגמה מוצגת**: ניתן בקלות לבדוק את מצב הספרינט הנוכחי של הצוות באמצעות שאילתה פשוטה כמו "הראה לי את כל פריטי העבודה הפעילים בספרינט הנוכחי עבור פרויקט WebApp" או "צור דוח באג עבור בעיית הכניסה שמצאתי כרגע" מבלי לעזוב את סביבת הפיתוח שלך.

### 5. 📝 שרת MarkItDown MCP
[![התקן ב-VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![התקן ב-VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**מה זה עושה**: MarkItDown הוא שרת המרת מסמכים מקיף הממיר פורמטים שונים של קבצים למארקדאון איכותי, מותאם לצריכת LLM ולזרמי עבודה של ניתוח טקסט.

**למה זה שימושי**: חיוני לזרמי עבודה מודרניים של תיעוד! MarkItDown מטפל בטווח מרשים של פורמטים תוך שמירת מבנה המסמך הקריטי כמו כותרות, רשימות, טבלאות וקישורים. בניגוד לכלי חילוץ טקסט פשוטים, הוא מתמקד בשמירה על משמעות סמנטית ועיצוב שחשובים הן לעיבוד AI והן לקריאות אנושית.

**פורמטים נתמכים**:
- **מסמכי משרד**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **קבצי מדיה**: תמונות (עם מטא-נתוני EXIF וזיהוי תווים OCR), אודיו (עם מטא-נתוני EXIF ותמלול דיבור)
- **תוכן רשת**: HTML, הזנות RSS, כתובות YouTube, דפי ויקיפדיה
- **פורמטי נתונים**: CSV, JSON, XML, קבצי ZIP (מעבד שוב ושוב את התוכן)
- **פורמטי פרסום**: EPub, מחברות Jupyter (.ipynb)
- **אימייל**: הודעות Outlook (.msg)
- **מתקדם**: אינטגרציה עם Azure Document Intelligence לעיבוד PDF משופר

**יכולות מתקדמות**: MarkItDown תומך בתיאורי תמונות מבוססי LLM (כשמסופק לקוח OpenAI), Azure Document Intelligence לעיבוד PDF משופר, תמלול דיבור לתוכן אודיו, ומערכת תוספים להרחבה לפורמטים נוספים.

**שימוש בעולם האמיתי**: "המר מצגת PowerPoint זו למארקדאון לאתר התיעוד שלנו", "חלץ טקסט מה-PDF הזה עם מבנה כותרות נכון", או "המר גיליון Excel זה לפורמט טבלה קריא".

**דוגמה מובלטת**: לצטט את [תיעוד MarkItDown](https://github.com/microsoft/markitdown#why-markdown):

> מארקדאון קרוב מאוד לטקסט רגיל, עם מינימום סימון או עיצוב, אך עדיין מספק דרך לייצוג מבנה מסמך חשוב. דגמי LLM פופולריים, כמו GPT-4o של OpenAI, מדברים במארקדאון באופן טבעי, ולעיתים משלבים מארקדאון במענה שלהם ללא הפעלה מפורשת. זה מצביע על כך שהם אומנו על כמות עצומה של טקסט במארקדאון, ומבינים אותו היטב. כתוצאה נוספת, קונבנציות מארקדאון גם יעילות מאוד מבחינת הטוקנים.

MarkItDown טוב מאוד בשמירה על מבנה המסמך, דבר שחשוב לזרמי עבודה של AI. לדוגמה, בהמרת מצגת PowerPoint, הוא שומר על ארגון השקופיות עם הכותרות הנכונות, מחלץ טבלאות כטבלאות מארקדאון, כולל טקסט ALT לתמונות, ואפילו מעבד את הערות הדובר. גרפים מומרות לטבלאות נתונים קריאות, והמארקדאון המתקבל שומר על הזרימה הלוגית של המצגת המקורית. זה מושלם להזנת תוכן מצגות למערכות AI או ליצירת תיעוד משקופיות קיימות.
### 6. 🗃️ שרת MCP SQL Server

[![התקן ב-VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![התקן ב-VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**מה זה עושה**: מספק גישה שיחתית לבסיסי נתונים של SQL Server (על-המקום, Azure SQL, או Fabric)

**למה זה שימושי**: בדומה לשרת PostgreSQL אך לאקוסיסטם של Microsoft SQL. התחבר עם מחרוזת חיבור פשוטה והתחל לשאול בשפה טבעית – בלי החלפת הקשר!

**שימוש בעולם האמיתי**: "מצא את כל ההזמנות שלא בוצעו ב-30 הימים האחרונים" מתורגם לשאילתות SQL מתאימות ומחזיר תוצאות מעוצבות.

**דוגמה מובלטת**: לאחר שהגדרת את חיבור בסיס הנתונים, תוכל להתחיל לנהל שיחות עם הנתונים שלך מיד. פוסט הבלוג מציג זאת עם שאלה פשוטה: "לאיזה בסיס נתונים אתה מחובר?" שרת MCP מגיב באמצעות קריאה לכלי בסיס נתונים מתאים, מתחבר למופע SQL Server שלך ומחזיר פרטים על החיבור הנוכחי – כל זאת ללא כתיבת שורת SQL אחת. השרת תומך בפעולות בסיס נתונים מקיפות, מניהול סכימות ועד מניפולציה של נתונים, הכל דרך פקודות בשפה טבעית. להנחיות התקנה והגדרה מלאות עם VS Code ו-Claude Desktop, ראה: [הצגת MSSQL MCP Server (בגרסת תצוגה מוקדמת)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).


### 7. 🎭 שרת MCP Playwright

[![התקן ב-VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![התקן ב-VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**מה זה עושה**: מאפשר לסוכני AI להתקשר עם דפי אינטרנט לצורך בדיקות ואוטומציה

> **ℹ️ מפעיל את GitHub Copilot**
> 
> שרת Playwright MCP מפעיל את סוכן הקידוד של GitHub Copilot, ומעניק לו יכולות גלישה באינטרנט! [למד עוד על תכונה זו](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**למה זה שימושי**: מושלם לבדיקות אוטומטיות שמונעות על ידי תיאורים בשפה טבעית. AI יכול לנווט באתרים, למלא טפסים ולחלץ נתונים באמצעות צילומי נגישות מבניים – זה כוח מדהים!

**שימוש בעולם האמיתי**: "בדוק את זרימת ההתחברות ואמת שדף הלוח נטען כהלכה" או "צור בדיקה שמחפשת מוצרים ומאמתת את דף התוצאות" – הכל ללא צורך בקוד המקור של האפליקציה

**דוגמה מובלטת**: עמיתתי דבי אובריין ביצעה עבודה מדהימה לאחרונה עם שרת Playwright MCP! לדוגמה, היא הציגה לאחרונה כיצד ניתן ליצור בדיקות Playwright שלמות ללא גישה לקוד המקור של האפליקציה. בתרחיש שלה, היא ביקשה מ-Copilot ליצור בדיקה לאפליקציית חיפוש סרטים: לנווט לאתר, לחפש "גרפילד", ולאמת שהסרט מופיע בתוצאות. MCP הריץ הפעלת דפדפן, חקר את מבנה הדף באמצעות צילומי DOM, מצא את הסלקטורים הנכונים וייצר בדיקת TypeScript עובדת במלואה שעברה בהפעלה הראשונה.

מה שהופך זאת לעוצמתי הוא שזה גשר בין הוראות בשפה טבעית לבין קוד בדיקה ביצועי. גישות מסורתיות דורשות כתיבת בדיקות ידנית או גישה לקוד להקשר. עם Playwright MCP, ניתן לבדוק אתרים חיצוניים, אפליקציות לקוח, או לעבוד בסימולציות בדיקה תיבת-שחורה שבה אין גישה לקוד.


### 8. 💻 שרת MCP Dev Box

[![התקן ב-VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![התקן ב-VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**מה זה עושה**: מנהל סביבות Microsoft Dev Box באמצעות שפה טבעית

**למה זה שימושי**: מפשט מאוד את ניהול סביבות הפיתוח! צור, הגדר ונהל סביבות פיתוח בלי לזכור פקודות ספציפיות.

**שימוש בעולם האמיתי**: "הקם Dev Box חדש עם SDK של .NET העדכני והגדר אותו לפרויקט שלנו", "בדוק את מצב כל סבבות הפיתוח שלי", או "צור סביבה דמו סטנדרטית עבור מצגות הצוות שלנו"

**דוגמה מובלטת**: אני מעריך גדול של שימוש ב-Dev Box לפיתוח אישי. רגע התובנה שלי כאן היה כשהג'יימס מונטמגנאו הסביר כמה טוב Dev Box למצגות בכנסים, כי יש לו חיבור אתרנט מהיר במיוחד בלי תלות באינטרנט של הכנס / המלון / המטוס שבו אני נמצא ברגע נתון. למעשה, לאחרונה עשיתי תרגול למצגת בכנס בזמן שהמחשב הנייד שלי היה מחובר לאינטרנט דרך נקודת החם של הטלפון שלי בעת נסיעה באוטובוס מבורז לאנטוורפן! הצעד הבא שלי כאן הוא לחקור יותר ניהול צוות של סביבות פיתוח מרובות וסביבות דמו סטנדרטיות. ומקרה שימוש גדול נוסף שאני שומע מלקוחות ועמיתים הוא שימוש ב-Dev Box לסביבות פיתוח מוכנות מראש. בשני המקרים, שימוש ב-MCP להגדרה וניהול של Dev Boxes מאפשר שימוש באינטראקציה בשפה טבעית, כל זאת תוך כדי שהייה בסביבת הפיתוח שלך.

### 9. 🤖 שרת MCP Microsoft Foundry
[![התקן ב-VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![התקן ב-VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**מה זה עושה**: שרת Microsoft Foundry MCP מספק למפתחים גישה מקיפה לאקוסיסטם ה-AI של Azure, כולל קטלוגי מודלים, ניהול פריסות, אינדוקס ידע עם Azure AI Search וכלי הערכה. שרת ניסיוני זה גשר על הפער בין פיתוח AI לבין התשתית החזקה של Azure AI, ומקל על בנייה, פריסה והערכת יישומי AI.

**למה זה שימושי**: שרת זה משנה את הדרך שבה אתם עובדים עם שירותי Azure AI על ידי הבאת יכולות AI ברמת ארגונית ישירות לתוך תהליך הפיתוח שלכם. במקום לעבור בין פורטל Azure, תיעוד ו-IDE שלכם, תוכלו לגלות מודלים, לפרוס שירותים, לנהל מאגרי ידע ולהעריך ביצועי AI באמצעות פקודות בשפה טבעית. הוא עוצמתי במיוחד עבור מפתחים הבונים יישומי RAG (הפקה מורחבת באחזור), מנהלים פריסות מרובות-מודלים או מיישמים תהליכי הערכה מקיפים ל-AI.

**יכולות מפתח למפתחים**:
- **🔍 גילוי והפצת מודלים**: חקור את קטלוג המודלים של Microsoft Foundry, קבל מידע מפורט עם דוגמאות קוד, ופרוס מודלים לשירותי Azure AI
- **📚 ניהול ידע**: צור ונהל אינדקסים ב-Azure AI Search, הוסף מסמכים, הגדר אינדקסרים ובנה מערכות RAG מתקדמות
- **⚡ אינטגרציה עם סוכני AI**: התחבר לסוכני Azure AI, שאיל שאלות לסוכנים קיימים והבן את ביצועי הסוכן בתרחישי הפקה
- **📊 מסגרת הערכה**: הרץ הערכות מקיפות לטקסט וסוכנים, צור דוחות markdown ויישם בקרת איכות ליישומי AI
- **🚀 כלי פרוטוטייפינג**: קבל הוראות התקנה לפרוטוטייפינג מבוסס GitHub וגישה ל-Microsoft Foundry Labs ללמידת מודלים מתקדמים

**שימוש מעשי במפתחים**: "פרוס מודל Phi-4 לשירותי Azure AI עבור היישום שלי", "צור אינדקס חיפוש חדש למערכת ה-RAG של המסמכים שלי", "הערך את תגובות הסוכן שלי מול מדדי איכות", או "מצא את מודל ההסקה הטוב ביותר למשימות ניתוח מורכבות"

**תסריט דמוי מלא**: הנה תהליך פיתוח AI עוצמתי:

> "אני בונה סוכן תמיכה ללקוחות. עזור לי למצוא מודל הסקה טוב בקטלוג, לפרוס אותו לשירותי Azure AI, ליצור מאגר ידע מהמסמכים שלנו, להגדיר מסגרת הערכה לבדיקת איכות התגובות, ואז לעזור לי לבנות פרוטוטייפ לאינטגרציה עם טוקן GitHub לצורך בדיקות."

שרת Microsoft Foundry MCP יבצע:
- שאילתא בקטלוג המודלים להמליץ על מודלי הסקה אופטימליים לפי דרישותיך
- יספק פקודות פריסה ומידע על הקצאות עבור האזור המועדף עליך ב-Azure
- יגדיר אינדקסים ב-Azure AI Search עם סכימה נכונה למסמכים שלך
- יגדיר צינורות הערכה עם מדדי איכות ובדיקות בטיחות
- יפיק קוד פרוטוטייפינג עם אימות GitHub לבדיקות מיידיות
- יספק מדריכי התקנה מקיפים המותאמים לערכת הטכנולוגיה שלך

**דוגמה בולטת**: כמפתח, התקשיתי לעקוב אחרי המודלים השונים של LLM הזמינים. אני מכיר מספר עיקריים, אבל הרגשתי שאני מפספס שיפורי פרודוקטיביות ויעילות. טוקנים והקצאות מתסכלים וקשים לניהול – אני אף פעם לא בטוח אם בחרתי במודל הנכון למשימה או בוער את התקציב שלי בצורה לא יעילה. שמעתי על השרת MCP הזה מג'יימס מונטמאגנו כשבדקתי המלצות עם עמיתים לפוסט הזה, ואני נרגש להשתמש בו! יכולות גילוי המודלים נראות מרשימות במיוחד עבור מישהו כמוני שרוצה לחקור מעבר למודלים המוכרים ולמצוא מודלים אופטימליים למשימות ספציפיות. מסגרת ההערכה תעזור לי לוודא שאני אכן מקבל תוצאות טובות יותר, ולא רק מנסה משהו חדש לשם הניסיון.

> **ℹ️ מצב ניסיוני**
> 
> שרת MCP זה הוא ניסיוני ומתפתח באופן פעיל. תכונות ו-APIs עשויים להשתנות. מתאים לחקירת יכולות Azure AI ולבניית פרוטוטייפים, אך יש לאמת דרישות יציבות לשימוש בייצור.

### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![התקן ב-VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![התקן ב-VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**מה זה עושה**: מספק למפתחים כלים חיוניים לבניית סוכני AI ויישומים המשתלבים עם Microsoft 365 ו-Microsoft 365 Copilot, כולל אימות סכימות, קבלת דוגמאות קוד וסיוע באיתור תקלות.

**למה זה שימושי**: בנייה עבור Microsoft 365 ו-Copilot כוללת סכימות מפורטות ודפוסי פיתוח ספציפיים. שרת MCP זה מביא משאבי פיתוח חיוניים ישירות לסביבת הקוד שלך, ועוזר לך לאמת סכימות, למצוא דוגמאות קוד ולפתור בעיות נפוצות ללא הפניה מתמדת לתיעוד.

**שימוש מעשי**: "אמת לי את סכימת הסוכן הדקלרטיבי ותיקן שגיאות סכימה", "הראה לי דוגמאות קוד ליישום תוסף Microsoft Graph API", או "עזור לי לפתור בעיות אימות באפליקציית Teams שלי"

**דוגמה בולטת**: פניתי לחברי ג'ון מילר לאחר שדיברתי איתו ב-Build על סוכני M365, והוא המליץ על ה-MCP הזה. זה יכול להיות מעולה למפתחים חדשים לסוכני M365 כי הוא מציע תבניות, דוגמאות קוד ומסגרת התחלתית בלי טביעה בתיעוד. יכולות אימות הסכימות נראות שימושיות במיוחד כדי להימנע משגיאות מבנה במניפסט הגורמות לשעות של איתור תקלות.

> **💡 טיפ מקצועי**
> 
> השתמש בשרת זה יחד עם שרת ה-MCP של מסמכי Microsoft Learn לתמיכה מקיפה בפיתוח M365 – אחד מספק את התיעוד הרשמי והשני מציע כלים מעשיים לפיתוח וסיוע באיתור תקלות.


## מה הלאה? 🔮

## 📋 סיכום

פרוטוקול Model Context (MCP) משנה את האופן שבו מפתחים מתקשרים עם עוזרי AI וכלים חיצוניים. 10 השרתים של Microsoft MCP הללו מדגימים את עוצמת האינטגרציה המובנית ל-AI, המאפשרת תהליכים חלקים שמותאמים למפתחים, שנותנים גישה נוחה ליכולות חיצוניות עוצמתיות.

מהאינטגרציה המקיפה עם אקוסיסטם Azure ועד לכלים מיוחדים כמו Playwright לאוטומציה בדפדפן ו-MarkItDown לעיבוד מסמכים, שרתים אלה מציגים כיצד MCP יכול לשפר את הפרודוקטיביות במגוון תרחישי פיתוח. הפרוטוקול התקני מבטיח שכלים אלה עובדים יחד בהרמוניה, ויוצרים חווית פיתוח קוהרנטית.

ככל שהאקוסיסטם של MCP ממשיך להתפתח, מעקב אחר הקהילה, בחינת שרתים חדשים ובניית פתרונות מותאמים יהיו המפתח למקסום הפרודוקטיביות שלך. האופי הפתוח של MCP מאפשר לך לשלב כלים מספקים שונים ליצירת זרימת עבודה אידיאלית לצרכים הספציפיים שלך.

## 🔗 משאבים נוספים

- [מאגר MCP רשמי של מיקרוסופט](https://github.com/microsoft/mcp)
- [קהילת MCP ותיעוד](https://modelcontextprotocol.io/introduction)
- [תיעוד MCP ב-VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [תיעוד MCP ב-Visual Studio](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [תיעוד MCP ל-Azure](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – אירועי MCP](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [התאמות GitHub Copilot מדהימות](https://github.com/awesome-copilot)
- [SDK MCP ל-C#](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [ימי פיתוח MCP בשידור חי 29-30 ביולי או צפייה לפי דרישה](https://aka.ms/mcpdevdays)

## 🎯 תרגילים

1. **התקנה והגדרה**: התקן אחד משרתי MCP בסביבת VS Code שלך ובדוק פונקציונליות בסיסית.
2. **אינטגרציית תהליך עבודה**: עצב תהליך פיתוח שמשלב לפחות שלושה שרתי MCP שונים.
3. **תכנון שרת מותאם**: זהה משימה בשגרה היומית שלך שיכולה להיעזר בשרת MCP מותאם ויצר מפרט עבורו.
4. **ניתוח ביצועים**: השווה את יעילות השימוש בשרתי MCP לעומת שיטות מסורתיות במשימות פיתוח נפוצות.
5. **הערכת אבטחה**: הערך את השלכות האבטחה של שימוש בשרתי MCP בסביבת הפיתוח שלך והצע פרקטיקות מיטביות.


הבא: [Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->