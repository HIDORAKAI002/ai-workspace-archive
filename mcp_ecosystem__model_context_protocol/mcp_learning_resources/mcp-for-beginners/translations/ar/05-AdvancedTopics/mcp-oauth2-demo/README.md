# MCP OAuth2 Demo

## مقدمة

OAuth2 هو بروتوكول معيار الصناعة للتفويض، مما يتيح وصولاً آمناً إلى الموارد دون مشاركة بيانات الاعتماد. في تطبيقات MCP (بروتوكول سياق النموذج)، يوفر OAuth2 طريقة قوية لمصادقة وتفويض العملاء (مثل وكلاء الذكاء الاصطناعي) للوصول إلى خوادم MCP وأدواتها.

توضح هذه الدرس كيفية تطبيق مصادقة OAuth2 لخوادم MCP باستخدام Spring Boot، وهو نمط شائع لنشر المؤسسات والإنتاج.

## أهداف التعلم

بنهاية هذا الدرس، ستتمكن من:
- فهم كيفية تكامل OAuth2 مع خوادم MCP
- تنفيذ خادم تفويض Spring لإصدار الرموز
- حماية نقاط نهاية MCP باستخدام المصادقة المستندة إلى JWT
- تكوين تدفق بيانات اعتماد العميل للتواصل بين الأجهزة

## المتطلبات السابقة

- فهم أساسي لجافا وSpring Boot
- الإلمام بمفاهيم MCP من الوحدات السابقة
- تثبيت Maven أو Gradle

---

## نظرة عامة على المشروع

هذا المشروع هو **تطبيق Spring Boot مصغر** يعمل كالتالي:

* كـ **خادم تفويض Spring** (يصدر رموز وصول JWT عبر تدفق `client_credentials`)، و  
* كـ **خادم موارد** (يحمي نقطة النهاية `/hello` الخاصة به).

يكرر الإعداد الموضح في [مشاركة مدونة Spring (2 أبريل 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## بداية سريعة (محلي)

```bash
# بناء وتشغيل
./mvnw spring-boot:run

# الحصول على رمز
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# استدعاء نقطة النهاية المحمية
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## اختبار إعداد OAuth2

يمكنك اختبار إعداد أمان OAuth2 بالخطوات التالية:

### 1. تحقق من تشغيل الخادم وتأمينه

```bash
# يجب أن يرجع هذا 401 غير مخول، مؤكدًا تفعيل أمان OAuth2
curl -v http://localhost:8081/
```

### 2. احصل على رمز وصول باستخدام بيانات اعتماد العميل

```bash
# احصل على واستخرج الاستجابة الكاملة للرمز
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# أو لاستخراج الرمز فقط (يتطلب jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

ملاحظة: رأس المصادقة الأساسية (`bWNwLWNsaWVudDpzZWNyZXQ=`) هو الترميز Base64 لـ `mcp-client:secret`.

### 3. الوصول إلى نقطة النهاية المحمية باستخدام الرمز

```bash
# استخدام الرمز المحفوظ
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# أو مباشرة بقيمة الرمز
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

يؤكد الرد الناجح بعبارة "Hello from MCP OAuth2 Demo!" أن إعداد OAuth2 يعمل بشكل صحيح.

---

## بناء الحاوية

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## النشر على **تطبيقات الحاوية في Azure**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

تصبح FQDN الإدخالي هو **المُصدر** (`https://<fqdn>`).  
تقدم Azure شهادة TLS موثوقة تلقائياً لـ `*.azurecontainerapps.io`.

---

## الربط مع **Azure API Management**

أضف سياسة الإدخال هذه إلى واجهة برمجة التطبيقات الخاصة بك:

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

سيقوم APIM بجلب JWKS والتحقق من كل طلب.

---

## ما التالي

- [5.4 السياقات الجذرية](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**إخلاء المسؤولية**:  
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى لتحقيق الدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار النسخة الأصلية للمستند بلغتها الأصلية المصدر الموثوق والمعتمد. بالنسبة للمعلومات الحساسة أو الحرجة، يوصى بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير خاطئ قد ينجم عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->