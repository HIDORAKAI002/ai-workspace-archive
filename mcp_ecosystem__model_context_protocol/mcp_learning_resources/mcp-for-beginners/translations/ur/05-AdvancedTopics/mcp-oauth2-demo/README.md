# MCP OAuth2 ڈیمو

## تعارف

OAuth2 اجازت کے لیے صنعت کا معیاری پروٹوکول ہے، جو اسناد شیئر کیے بغیر وسائل تک محفوظ رسائی ممکن بناتا ہے۔ MCP (ماڈل کانٹیکسٹ پروٹوکول) کے نفاذ میں، OAuth2 کلائنٹس (جیسا کہ AI ایجنٹس) کو MCP سرورز اور ان کے ٹولز تک رسائی کے لیے تصدیق اور اجازت دینے کا ایک مضبوط طریقہ فراہم کرتا ہے۔

یہ سبق Spring Boot استعمال کرتے ہوئے MCP سرورز کے لیے OAuth2 تصدیق لاگو کرنے کا مظاہرہ کرتا ہے، جو انٹرپرائز اور پروڈکشن ڈیپلائمنٹ کے لیے ایک عام نمونہ ہے۔

## تعلیمی مقاصد

اس سبق کے اختتام تک، آپ:
- سمجھ جائیں گے کہ OAuth2 کس طرح MCP سرورز کے ساتھ ضم ہوتا ہے
- ٹوکن اجرا کے لیے Spring Authorization Server کو لاگو کریں گے
- JWT پر مبنی تصدیق کے ساتھ MCP اینڈ پوائنٹس کی حفاظت کریں گے
- مشین سے مشین رابطے کے لیے کلائنٹ اسناد کے فلو کو ترتیب دیں گے

## ضروریات

- جاوا اور Spring Boot کی بنیادی سمجھ
- پہلے کے ماڈیولز سے MCP تصورات سے واقفیت
- Maven یا Gradle نصب ہونا

---

## پروجیکٹ کا جائزہ

یہ پروجیکٹ ایک **کم از کم Spring Boot درخواست** ہے جو دونوں کام کرتی ہے:

* ایک **Spring Authorization Server** (جو `client_credentials` فلو کے ذریعے JWT رسائی ٹوکن جاری کرتا ہے)، اور  
* ایک **Resource Server** (جو اپنے `/hello` اینڈ پوائنٹ کی حفاظت کرتا ہے)۔

یہ سیٹ اپ [Spring بلاگ پوسٹ (2 اپریل 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) میں دکھائے گئے سیٹ اپ کی عکاسی کرتا ہے۔

---

## فوری آغاز (مقامی)

```bash
# تعمیر کریں اور چلائیں
./mvnw spring-boot:run

# ایک ٹوکن حاصل کریں
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# محفوظ شدہ اینڈپوائنٹ کو کال کریں
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 ترتیب کی جانچ

آپ درج ذیل مراحل کے ذریعے OAuth2 سیکیورٹی ترتیب کی جانچ کر سکتے ہیں:

### 1. تصدیق کریں کہ سرور چل رہا ہے اور محفوظ ہے

```bash
# یہ 401 غیر مجاز واپسی کرنی چاہئے، اس بات کی تصدیق کرتے ہوئے کہ OAuth2 سیکیورٹی فعال ہے
curl -v http://localhost:8081/
```

### 2. کلائنٹ اسناد کا استعمال کرتے ہوئے رسائی کا ٹوکن حاصل کریں

```bash
# مکمل ٹوکن کا جواب حاصل کریں اور نکالیں
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# یا صرف ٹوکن نکالنے کے لیے (jq کی ضرورت ہے)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

نوٹ: Basic Authentication ہیڈر (`bWNwLWNsaWVudDpzZWNyZXQ=`) `mcp-client:secret` کا Base64 انکوڈنگ ہے۔

### 3. ٹوکن کا استعمال کرتے ہوئے محفوظ اینڈ پوائنٹ تک رسائی حاصل کریں

```bash
# محفوظ شدہ ٹوکن استعمال کر رہے ہیں
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# یا براہ راست ٹوکن ویلیو کے ساتھ
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" کے ساتھ کامیاب جواب تصدیق کرتا ہے کہ OAuth2 ترتیب درست طریقے سے کام کر رہی ہے۔

---

## کنٹینر کی تعمیر

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps** پر تعینات کریں

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

انگریس FQDN آپ کا **issuer** بن جاتا ہے (`https://<fqdn>`)۔  
Azure خود بخود `*.azurecontainerapps.io` کے لیے ایک معتبر TLS سرٹیفکیٹ فراہم کرتا ہے۔

---

## **Azure API Management** کے ساتھ انضمام

اپنے API میں یہ inbound پالیسی شامل کریں:

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

APIM JWKS حاصل کرے گا اور ہر درخواست کی توثیق کرے گا۔

---

## آگے کیا ہے

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**دستخطی بیان**:
یہ دستاویز AI ترجمہ خدمات [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ اگرچہ ہم درستگی کی کوشش کرتے ہیں، لیکن براہ کرم آگاہ رہیں کہ خودکار تراجم میں غلطیاں یا بے ضابطگیاں ہو سکتی ہیں۔ اصل دستاویز اپنی مادری زبان میں ہی مستند ماخذ سمجھی جانی چاہیے۔ اہم معلومات کے لیے پیشہ ور انسانی ترجمہ تجویز کیا جاتا ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم پر نہیں ہوگی۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->