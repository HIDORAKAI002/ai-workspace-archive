# מקרה מבחן: חשיפת REST API בניהול API כשרת MCP

ניהול API של Azure הוא שירות המספק שער על גבי נקודות הקצה של ה-API שלכם. האופן שבו הוא פועל הוא שניהול API של Azure פועל כפרוקסי מול ה-APIs שלכם ויכול להחליט מה לעשות עם הבקשות הנכנסות.

באמצעותו, אתם מוסיפים מגוון תכונות כגון:

- **אבטחה**, ניתן להשתמש בכל דבר ממפתחות API, JWT זהות מנוהלת.
- **הגבלת קצב**, תכונה נהדרת היא היכולת להחליט כמה קריאות עוברות לכל יחידת זמן מסוימת. זה עוזר להבטיח שכל המשתמשים יהנו מחוויה טובה וגם שהשירות שלכם לא ייטען יתר על המידה בבקשות.
- **קנה מידה ואיזון עומסים**. ניתן להגדיר מספר נקודות קצה לאיזון העומס ואתם יכולים להחליט איך לעשות "איזון עומס".
- **תכונות AI כמו מטמון סמנטי**, הגבלת וטיפול בתוקן ומעקב אחר תוקן ועוד. אלו תכונות מצוינות שמשפרות את התגובה וגם עוזרות לכם לעקוב אחרי ההוצאות על תוקן. [לקריאה נוספת כאן](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities). 

## למה MCP + ניהול API של Azure?

פרוטוקול הקשר של מודלים (Model Context Protocol) הופך במהירות לסטנדרט עבור אפליקציות AI סוכניות ואיך לחשוף כלים ונתונים באופן קבוע. ניהול API של Azure הוא הבחירה הטבעית כאשר צריך "לנהל" APIs. שרתי MCP משתלבים לרוב עם APIs אחרים כדי לפתור בקשות לכלי מסוים, לדוגמה. לכן השילוב בין ניהול API של Azure ל-MCP הגיוני מאוד.

## סקירה כללית

במקרה שימוש ספציפי זה נלמד לחשוף נקודות קצה של API כשרת MCP. באמצעות כך, נוכל להפוך את נקודות הקצה הללו לחלק מאפליקציה סוכנית תוך ניצול תכונות ניהול API של Azure.

## תכונות מרכזיות

- אתם בוחרים את שיטות הנקודה הקצה שברצונכם לחשוף ככלים.
- התכונות הנוספות שתקבלו תלויות במה שתגדירו במדור המדיניות עבור ה-API שלכם. כאן נראה איך להוסיף הגבלת קצב.

## שלב מקדים: ייבוא API

אם כבר יש לכם API בניהול API של Azure, מצוין, אפשר לדלג על שלב זה. אם לא, עברו לקישור הזה, [ייבוא API לניהול API של Azure](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## חשיפת API כשרת MCP

כדי לחשוף את נקודות הקצה של ה-API, נעקוב אחרי השלבים הבאים:

1. נווטו ל-Azure Portal ולכתובת הבאה <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
נווטו למופע ניהול ה-API שלכם.

1. בתפריט שמאלי, בחרו APIs > MCP Servers > + יצירת שרת MCP חדש.

1. ב-API, בחרו REST API לחשיפה כשרת MCP.

1. בחרו פעולה או יותר של API לחשוף ככלים. ניתן לבחור את כל הפעולות או פעולות ספציפיות בלבד.

    ![בחר שיטות לחשיפה](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. בחרו **צור**.

1. נווטו לאפשרות התפריט **APIs** ו-**MCP Servers**, אמורים לראות את המצב הבא:

    ![ראה את שרת MCP בחלון הראשי](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    שרת MCP נוצר והפעולות של ה-API מוצגות ככלים. שרת MCP מופיע בחלונית שרתי MCP. עמודת ה-URL מציגה את נקודת הקצה של שרת MCP שניתן לקרוא לה לצורך בדיקות או בתוך אפליקציית לקוח.

## אופציונלי: קביעת מדיניות

ניהול API של Azure מתבסס על מושג המדיניות, שבו מגדירים חוקים שונים לנקודות הקצה שלכם כמו הגבלת קצב או מטמון סמנטי. מדיניות אלו מוגדרות בקוד XML.

כך ניתן להגדיר מדיניות להגבלת קצב בשרת MCP שלכם:

1. בפורטל, תחת APIs, בחרו **MCP Servers**.

1. בחרו את שרת MCP שיצרתם.

1. בתפריט שמאל, תחת MCP, בחרו **מדיניות**.

1. בעורך המדיניות, הוסיפו או ערכו את המדיניות שבה תרצו להשתמש בכלי השרת MCP. המדיניות מוגדרת בפורמט XML. לדוגמה, ניתן להוסיף מדיניות להגבלת קריאות לכלי שרת MCP (בדוגמה זו, 5 קריאות למספר 30 שניות לכל כתובת IP של לקוח). הנה קוד ב-XML שיגרום להגבלת קצב:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    להלן תמונה של עורך המדיניות:

    ![עורך מדיניות](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## נסו את זה

בואו נוודא ששרת MCP שלנו פועל כמצופה.

לצורך זאת נשתמש ב-Visual Studio Code ו-GitHub Copilot במצב סוכנות. נוסיף את שרת MCP ל-*mcp.json* וכך Visual Studio Code ישמש כלקוח עם יכולות סוכניות והמשתמשים הסופיים יוכלו להקליד פקודה ולקיים אינטראקציה עם השרת.

כך מוסיפים את שרת MCP ב-Visual Studio Code:

1. השתמשו בפקודה MCP: **הוסף שרת מתפריט הפקודות**.

1. כאשר תתבקשו, בחרו את סוג השרת: **HTTP (HTTP או Server Sent Events)**.

1. הזינו את כתובת ה-URL של שרת MCP בניהול API. לדוגמה: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (לנקודת קצה SSE) או **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (לנקודת קצה MCP), שימו לב להבדל בין האמצעי `/sse` או `/mcp`.

1. הזינו מזהה שרת לבחירתכם. זוהי ערך לא קריטי אך יעזור לכם לזכור מהו מופע השרת הזה.

1. בחרו אם לשמור את ההגדרות בהגדרות סביבת העבודה או בהגדרות המשתמש.

  - **הגדרות סביבת עבודה** - קונפיגורציית השרת נשמרת בקובץ .vscode/mcp.json הזמין רק בסביבת העבודה הנוכחית.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    או אם תבחרו בהזרמת HTTP כאמצעי, זה יהיה מעט שונה:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **הגדרות משתמש** - קונפיגורציית השרת תתווסף לקובץ *settings.json* העולמי שלכם וזמין בכל סביבת עבודה. הקונפיגורציה נראית כך:

    ![הגדרת משתמש](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. עליכם להוסיף גם קונפיגורציה, כותרת כדי לוודא שהתהליך מאומת כראוי מול ניהול API של Azure. הוא משתמש בכותרת בשם **Ocp-Apim-Subscription-Key**.

    - כך ניתן להוסיף אותה להגדרות:

    ![הוספת כותרת לאימות](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), זה יגרום להצגת הנחיה לבקשת מפתח API אותה תוכלו למצוא ב-Azure Portal עבור מופע ניהול API של Azure שלכם.

   - כדי להוסיף זאת ל-*mcp.json* במקום, תוכלו להוסיף כך:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### שימוש במצב סוכנות

כעת הכול מוגדר, בין אם בהגדרות או בקובץ *.vscode/mcp.json*. בואו ננסה.

יופיע כפתור כלים כמו הבא, בו יוצגו הכלים החשופים מהשרת שלכם:

![כלים מהשרת](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. לחצו על אייקון הכלים ותראו רשימה של כלים כך:

    ![כלים](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. הזינו פקודה בצ'אט כדי להפעיל את הכלי. לדוגמה, אם בחרתם כלי לקבלת מידע על הזמנה, תוכלו לשאול את הסוכן על ההזמנה. הנה דוגמה לפקודה:

    ```text
    get information from order 2
    ```

    כעת יוצג לכם אייקון כלים שיבקש מכם להמשיך ולהפעיל את הכלי. בחרו להמשיך להריץ את הכלי, כעת תראו פלט כך:

    ![תוצאה מהפקודה](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **מה שתראו תלוי בכלים שהגדרתם, אבל הרעיון הוא לקבל תגובה טקסטואלית כפי שמוצג לעיל**


## מקורות

כך תוכלו ללמוד עוד:

- [מדריך על ניהול API של Azure ו-MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [דוגמה בפייתון: אבטחת שרתי MCP מרחוק באמצעות ניהול API של Azure (ניסיוני)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [מעבדת הרשאות לקוח MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [השתמשו בתוסף ניהול API של Azure עבור VS Code לייבוא וניהול APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [רישום וגילוי שרתי MCP מרוחקים במרכז Azure API](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [שער AI](https://github.com/Azure-Samples/AI-Gateway) מאגר מצוין שמציג יכולות AI רבות עם ניהול API של Azure
- [סדנאות שער AI](https://azure-samples.github.io/AI-Gateway/) מכיל סדנאות בשימוש בפורטל Azure, דרך מצוינת להתחיל להעריך יכולות AI.

## מה הלאה

- חזרה אל: [סקירת מקרים](./README.md)
- הבא: [סוכני נסיעות AI של Azure](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). אמנם אנו שואפים לדיוק, יש לקחת בחשבון כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי דיוקים. המסמך המקורי בשפת המקור שלו נחשב למקור הסמכותי. למידע קריטי מומלץ לבצע תרגום מקצועי על ידי אדם. אנו לא נושאים באחריות לכל אי הבנה או פרשנות שגויה הנובעות משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->