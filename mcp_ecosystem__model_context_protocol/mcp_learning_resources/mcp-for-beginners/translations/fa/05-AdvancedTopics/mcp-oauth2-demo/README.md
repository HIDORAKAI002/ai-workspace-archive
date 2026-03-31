# نمایش OAuth2 در MCP

## مقدمه

OAuth2 پروتکل استاندارد صنعتی برای مجوزدهی است که دسترسی امن به منابع را بدون به اشتراک‌گذاری اطلاعات ورود فراهم می‌کند. در پیاده‌سازی‌های MCP (پروتکل زمینه مدل)، OAuth2 روشی قوی برای احراز هویت و مجوزدهی به کلاینت‌ها (مانند عوامل هوش مصنوعی) برای دسترسی به سرورهای MCP و ابزارهای آنها ارائه می‌دهد.

این درس نشان می‌دهد چگونه احراز هویت OAuth2 را برای سرورهای MCP با استفاده از Spring Boot، یک الگوی رایج برای استقرارهای سازمانی و تولیدی، پیاده‌سازی کنیم.

## اهداف یادگیری

تا پایان این درس، شما خواهید توانست:  
- درک کنید چگونه OAuth2 با سرورهای MCP ادغام می‌شود  
- یک سرور مجوز Spring برای صدور توکن پیاده کنید  
- نقطه‌های پایانی MCP را با احراز هویت مبتنی بر JWT محافظت کنید  
- جریان مجوز کلاینت برای ارتباط ماشین با ماشین را پیکربندی کنید  

## پیش‌نیازها

- فهم پایه‌ای از جاوا و Spring Boot  
- آشنایی با مفاهیم MCP از ماژول‌های قبلی  
- نصب Maven یا Gradle  

---

## نمای کلی پروژه

این پروژه یک **برنامه حداقلی Spring Boot** است که به عنوان هر دو مورد عمل می‌کند:

* یک **سرور مجوز Spring** (صدور توکن‌های دسترسی JWT از طریق جریان `client_credentials`)، و  
* یک **سرور منبع** (محافظت از نقطه پایانی `/hello` خودش).

این شبیه‌سازی پیکربندی نشان داده شده در [پست وبلاگ Spring (۲ آوریل ۲۰۲۵)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) است.

---

## شروع سریع (محلی)

```bash
# ساخت و اجرا
./mvnw spring-boot:run

# دریافت توکن
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# فراخوانی نقطه پایانی محافظت شده
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## آزمایش پیکربندی OAuth2

می‌توانید پیکربندی امنیتی OAuth2 را با مراحل زیر آزمایش کنید:

### ۱. اطمینان از اجرای سرور و امن بودن آن

```bash
# این باید ۴۰۱ غیرمجاز را برگرداند و تأیید کند که امنیت OAuth2 فعال است
curl -v http://localhost:8081/
```

### ۲. دریافت توکن دسترسی با استفاده از اعتبارنامه کلاینت

```bash
# دریافت و استخراج پاسخ کامل توکن
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# یا استخراج فقط توکن (نیازمند jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

توجه: هدر احراز هویت پایه (`bWNwLWNsaWVudDpzZWNyZXQ=`) کدگذاری Base64 رشته `mcp-client:secret` است.

### ۳. دسترسی به نقطه پایانی محافظت‌شده با استفاده از توکن

```bash
# استفاده از توکن ذخیره شده
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# یا مستقیماً با مقدار توکن
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

پاسخ موفق با پیام "Hello from MCP OAuth2 Demo!" تایید می‌کند که پیکربندی OAuth2 به درستی کار می‌کند.

---

## ساخت کانتینر

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## استقرار در **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

نام کامل دامنه ورودی (FQDN) به عنوان **صادرکننده** شما (`https://<fqdn>`) عمل می‌کند.  
Azure به طور خودکار گواهی TLS معتبری برای `*.azurecontainerapps.io` ارائه می‌دهد.

---

## اتصال به **Azure API Management**

این سیاست ورودی را به API خود اضافه کنید:

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

APIM کلیدهای JWKS را واکشی کرده و هر درخواست را اعتبارسنجی می‌کند.

---

## گام بعدی

- [۵.۴ زمینه‌های ریشه](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه‌ی هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما تلاش می‌کنیم دقت را حفظ کنیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است حاوی خطاها یا نواقصی باشند. سند اصلی به زبان مادری آن باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، استفاده از ترجمه‌ی حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا تفسیر نادرستی که از استفاده از این ترجمه حاصل شود، مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->