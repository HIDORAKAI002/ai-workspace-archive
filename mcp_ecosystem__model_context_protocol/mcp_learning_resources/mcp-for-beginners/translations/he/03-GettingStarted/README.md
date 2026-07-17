## התחלה  

[![בניית שרת MCP ראשון שלך](../../../translated_images/he/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(לחץ על התמונה למעלה כדי לצפות בסרטון של השיעור הזה)_

קטע זה מורכב ממספר שיעורים:

- **1 שרת ראשון שלך**, בשיעור הראשון הזה תלמד כיצד ליצור את השרת הראשון שלך ולבחון אותו עם כלי הבודק, דרך חשובה לבדוק ולתקן את השרת, [לשיעור](01-first-server/README.md)

- **2 לקוח**, בשיעור זה תלמד כיצד לכתוב לקוח שיכול להתחבר לשרת שלך, [לשיעור](02-client/README.md)

- **3 לקוח עם LLM**, דרך טובה אף יותר לכתוב לקוח היא על ידי הוספת LLM כך שיוכל "לנהל משא ומתן" עם השרת מה לעשות, [לשיעור](03-llm-client/README.md)

- **4 שימוש במצב סוכן של GitHub Copilot בתוך Visual Studio Code**. כאן נבחן כיצד להפעיל את שרת MCP מתוך Visual Studio Code, [לשיעור](04-vscode/README.md)

- **5 שרת תחבורת stdio** תחבורת stdio היא התקן המומלץ לתקשורת מקומית בין שרת MCP ללקוח, המספק תקשורת מאובטחת מבוססת תת-תהליך עם בודדת תהליך מובנית [לשיעור](05-stdio-server/README.md)

- **6 סטרימינג HTTP עם MCP (HTTP סטרימבילי)**. למד על תחבורת סטרימינג HTTP מודרנית (הגישה המומלצת לשרתי MCP מרוחקים לפי [מפרט MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), התראות התקדמות, ואיך ליישם שרתי ולקוחות MCP בקנה מידה בזמן אמת באמצעות HTTP סטרימבילי. [לשיעור](06-http-streaming/README.md)

- **7 שימוש בערכת כלים AI ל-VSCode** כדי לצרוך ולבדוק את לקוחות ושרתות ה-MCP שלך [לשיעור](07-aitk/README.md)

- **8 בדיקות**. כאן נתמקד במיוחד איך לבדוק את השרת והלקוח בדרכים שונות, [לשיעור](08-testing/README.md)

- **9 פריסה**. פרק זה יתמקד בדרכים שונות לפריסת פתרונות MCP שלך, [לשיעור](09-deployment/README.md)

- **10 שימוש מתקדם בשרת**. פרק זה מכסה שימוש מתקדם בשרת, [לשיעור](./10-advanced/README.md)

- **11 אימות**. פרק זה מכסה איך להוסיף אימות פשוט, מאימות בסיסי ועד שימוש ב-JWT ו-RBAC. מומלץ להתחיל כאן ואז לעיין בנושאים מתקדמים בפרק 5 ולבצע חיזוקי אבטחה נוספים לפי ההמלצות בפרק 2, [לשיעור](./11-simple-auth/README.md)

- **12 מארחי MCP**. הגדר והשתמש בלקוחות מארחים פופולריים של MCP כולל Claude Desktop, Cursor, Cline ו-Windsurf. למד סוגי תחבורה ופתרון בעיות, [לשיעור](./12-mcp-hosts/README.md)

- **13 בודק MCP**. נהל איתור שגיאות ובדוק את שרתי MCP שלך באופן אינטראקטיבי באמצעות כלי הבודק של MCP. למד לפתור בעיות בכלים, משאבים, והודעות פרוטוקול, [לשיעור](./13-mcp-inspector/README.md)

- **14 דגימה**. צור שרתי MCP שעובדים עם לקוחות MCP במשימות קשורות ל-LLM (מבוטל בגרסת המועמד לשחרור `2026-07-28`; עדיין תקף עבור `2025-11-25`). [לשיעור](./14-sampling/README.md)

- **15 אפליקציות MCP**. בנה שרתי MCP שמגיבים גם עם הוראות ממשק משתמש, [לשיעור](./15-mcp-apps/README.md)

פרוטוקול הקשר מודל (MCP) הוא פרוטוקול פתוח שמסטנדרט איך יישומים מספקים הקשר ל-LLM. חשב את MCP כמו יציאת USB-C ליישומי AI - הוא מספק דרך סטנדרטית לחבר מודלי AI למקורות נתונים וכלים שונים.

## מטרות הלמידה

בסוף שיעור זה תוכל:

- להגדיר סביבות פיתוח ל-MCP ב-C#, Java, Python, TypeScript, ו-JavaScript
- לבנות ולפרוס שרתי MCP בסיסיים עם תכונות מותאמות (משאבים, פרומטות, וכלים)
- ליצור יישומים מארחים שמתחברים לשרתי MCP
- לבדוק ולתקן מימושי MCP
- להבין אתגרים נפוצים בהגדרה ופתרונותיהם
- לחבר את מימושי MCP שלך לשירותי LLM פופולריים

## הגדרת סביבת MCP שלך

לפני שתתחיל לעבוד עם MCP, חשוב להכין את סביבת הפיתוח שלך ולהבין את זרימת העבודה הבסיסית. קטע זה ינחה אותך בשלבי ההגדרה הראשוניים כדי לוודא התחלה חלקה עם MCP.

### דרישות מוקדמות

לפני שתצלול לפיתוח MCP, ודא שיש לך:

- **סביבת פיתוח**: לשפה שבחרת (C#, Java, Python, TypeScript, או JavaScript)
- **IDE/עורך**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm, או כל עורך קוד מודרני
- **מנהל חבילות**: NuGet, Maven/Gradle, pip, או npm/yarn
- **מפתחות API**: לשירותי AI שברצונך להשתמש בהם ביישומי המארח שלך


### ערכות פיתוח רשמיות (SDKs)

בפרקים הבאים תראה פתרונות שנבנו באמצעות Python, TypeScript, Java ו-.NET. הנה כל ערכות הפיתוח הרשמיות הנתמכות.

MCP מספק ערכות פיתוח רשמיות למספר שפות (בהתאם ל-[מפרט MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - מתוחזק בשיתוף עם מיקרוסופט
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - מתוחזק בשיתוף עם Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - יישום רשמי ב-TypeScript
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - יישום רשמי ב-Python (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - יישום רשמי ב-Kotlin
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - מתוחזק בשיתוף עם Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - יישום רשמי ב-Rust
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - יישום רשמי ב-Go

## נקודות עיקריות

- הגדרת סביבת פיתוח MCP פשוטה עם ערכות פיתוח ספציפיות לשפה
- בניית שרתי MCP כוללת יצירה ורישום כלים עם סכמות ברורות
- לקוחות MCP מתחברים לשרתי ומודלים כדי להפעיל יכולות מורחבות
- בדיקות ותיקונים הם חיוניים למימושים אמינים של MCP
- אפשרויות פריסה משתנות מפיתוח מקומי ועד פתרונות מבוססי ענן

## תרגול

יש לנו סט דוגמאות שמשלים את התרגילים שתראה בכל הפרקים בקטע זה. בנוסף לכל פרק יש תרגילים ומשימות משלו

- [מחשבון ב-Java](./samples/java/calculator/README.md)
- [מחשבון ב-.Net](../../../03-GettingStarted/samples/csharp)
- [מחשבון ב-JavaScript](./samples/javascript/README.md)
- [מחשבון ב-TypeScript](./samples/typescript/README.md)
- [מחשבון ב-Python](../../../03-GettingStarted/samples/python)

## משאבים נוספים

- [בניית סוכנים באמצעות פרוטוקול הקשר מודל ב-Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [MCP מרוחק עם Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [סוכן MCP OpenAI ב-.NET](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## מה הלאה

התחל עם השיעור הראשון: [יצירת שרת MCP ראשון](01-first-server/README.md)

לאחר שסיימת מודול זה, המשך ל: [מודול 4: יישום מעשי](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->