# הדגמת OAuth2 ב-MCP

## מבוא

OAuth2 הוא הפרוטוקול הסטנדרטי בתעשייה לאישור, המאפשר גישה מאובטחת למשאבים מבלי לשתף פרטי הרשאה. ביישומי MCP (Model Context Protocol), OAuth2 מספק דרך חזקה לאימות ואישור לקוחות (כמו סוכני AI) לגשת לשרתי MCP ולכלים שלהם.

שיעור זה מדגים כיצד ליישם אימות OAuth2 עבור שרתי MCP באמצעות Spring Boot, דפוס נפוץ להטמעות ארגוניות והטמעות במערכות ייצור.

## מטרות הלמידה

בסיום שיעור זה, תוכל:
- להבין כיצד OAuth2 מתממשק עם שרתי MCP
- ליישם שרת הרשאה ב-Spring להנפקת אסימוני גישה
- להגן על נקודות קצה של MCP באמצעות אימות מבוסס JWT
- להגדיר זרימת client credentials לתקשורת מכונה-למכונה

## דרישות מוקדמות

- הבנה בסיסית ב-Java ו-Spring Boot
- היכרות עם מושגי MCP מכוללים קודמים
- התקנת Maven או Gradle

---

## סקירת הפרויקט

פרויקט זה הוא **יישום מינימלי ב-Spring Boot** הפועל גם כ:

* **שרת הרשאות Spring** (מנפיק אסימוני גישה JWT דרך זרימת `client_credentials`), וכן  
* **שרת משאבים** (מגן על נקודת הקצה `/hello` שלו).

הוא משקף את ההגדרה המוצגת ב-[פוסט בבלוג Spring (2 באפריל 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## התחלה מהירה (מקומית)

```bash
# לבנות ולהריץ
./mvnw spring-boot:run

# לקבל טוקן
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# לקרוא לנקודת הקצה המוגנת
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## בדיקת תצורת OAuth2

ניתן לבדוק את תצורת האבטחה של OAuth2 עם השלבים הבאים:

### 1. וודא שהשרת פועל ומאובטח

```bash
# זה אמור להחזיר 401 ללא הרשאה, מאשר שהאבטחה של OAuth2 פעילה
curl -v http://localhost:8081/
```

### 2. קבל אסימון גישה באמצעות client credentials

```bash
# לקבל ולחלץ את תגובת הטוקן המלאה
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# או לחלץ רק את הטוקן (דורש jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

הערה: כותרת האימות הבסיסי (`bWNwLWNsaWVudDpzZWNyZXQ=`) היא קידוד Base64 של `mcp-client:secret`.

### 3. גש לנקודת הקצה המוגנת באמצעות האסימון

```bash
# שימוש בטוקן השמור
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# או ישירות עם ערך הטוקן
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

תגובה מוצלחת עם "Hello from MCP OAuth2 Demo!" מאשרת שהתצורה של OAuth2 פועלת כראוי.

---

## בניית מכולה

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## פריסה ל-**Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

שם ה-FQDN לכניסה יהפוך ל**מנפיק** שלך (`https://<fqdn>`).  
Azure מספקת אישור TLS מהימן באופן אוטומטי עבור `*.azurecontainerapps.io`.

---

## אינטגרציה עם **Azure API Management**

הוסף מדיניות נכנסת זו ל-API שלך:

```xml
<inbound>
  <validate-jwt header-name="Authorization">
    <openid-config url="https://<fqdn>/.well-known/openid-configuration"/>
    <audiences>
      <audience>mcp-client</audience>
    </audiences>
  </validate-jwt>
  <base/>
</inbound>
```

APIM ימשוך את JWKS ויוודא כל בקשה.

---

## מה הלאה

- [5.4 הקשרים שורשיים](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדייק, יש לקחת בחשבון כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי דיוקים. המסמך המקורי בשפת המקור שלו צריך להיחשב כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי אנושי. אנו לא אחראים לכל אי הבנה או פרשנות שגויה הנובעת משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->