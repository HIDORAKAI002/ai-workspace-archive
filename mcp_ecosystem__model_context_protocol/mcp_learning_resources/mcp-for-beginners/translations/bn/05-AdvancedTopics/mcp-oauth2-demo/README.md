# MCP OAuth2 ডেমো

## পরিচিতি

OAuth2 হল অনুমোদনের জন্য ইন্ডাস্ট্রি-স্ট্যান্ডার্ড প্রোটোকল, যা ক্রেডেনশিয়াল শেয়ার না করেও নিরাপদ অ্যাক্সেস সক্ষম করে। MCP (মডেল কনটেক্সট প্রোটোকল) বাস্তবায়নে, OAuth2 ক্লায়েন্টদের (যেমন AI এজেন্ট) MCP সার্ভার এবং তাদের টুলস অ্যাক্সেস করার জন্য প্রমাণীকরণ এবং অনুমোদনের একটি দৃঢ় উপায় প্রদান করে।

এই পাঠে দেখানো হয়েছে কিভাবে Spring Boot ব্যবহার করে MCP সার্ভারের জন্য OAuth2 প্রমাণীকরণ বাস্তবায়ন করতে হয়, যা এন্টারপ্রাইজ ও প্রোডাকশন ডিপ্লয়মেন্টের জন্য একটি সাধারণ প্যাটার্ন।

## শেখার উদ্দেশ্যসমূহ

এই পাঠের শেষ পর্যন্ত, আপনি:
- বুঝতে পারবেন কিভাবে OAuth2 MCP সার্ভারের সঙ্গে ইন্টিগ্রেট করে
- টোকেন ইস্যু করার জন্য Spring Authorization Server বাস্তবায়ন করবেন
- JWT ভিত্তিক প্রমাণীকরণ দিয়ে MCP এন্ডপয়েন্ট সুরক্ষিত করবেন
- মেশিন-টু-মেশিন যোগাযোগের জন্য ক্লায়েন্ট ক্রেডেনশিয়াল ফ্লো কনফিগার করবেন

## পূর্বশর্তসমূহ

- Java এবং Spring Boot এর মৌলিক জ্ঞান
- পূর্ববর্তী মডিউল থেকে MCP ধারণাগুলোর পরিচিতি
- Maven বা Gradle ইনস্টল করা

---

## প্রকল্পের ওভারভিউ

এই প্রকল্পটি একটি **মিনিমাল Spring Boot অ্যাপ্লিকেশন** যা দুটি হিসাবে কাজ করে:

* একটি **Spring Authorization Server** (যা `client_credentials` ফ্লো ব্যবহার করে JWT অ্যাক্সেস টোকেন ইস্যু করে), এবং  
* একটি **Resource Server** (যা তার নিজস্ব `/hello` এন্ডপয়েন্ট রক্ষা করে)।

এটি [Spring ব্লগ পোস্ট (2 Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2)-এ দেখানো সেটআপের অনুকরণ করে।

---

## দ্রুত শুরু (লোকাল)

```bash
# তৈরি ও চালানো
./mvnw spring-boot:run

# একটি টোকেন সংগ্রহ করুন
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# সুরক্ষিত এন্ডপয়েন্ট কল করুন
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 কনফিগারেশন পরীক্ষা

আপনি নিম্নলিখিত ধাপগুলো দিয়ে OAuth2 সিকিউরিটি কনফিগারেশন পরীক্ষা করতে পারেন:

### 1. সার্ভারটি চলছে এবং সুরক্ষিত আছে কি না যাচাই করুন

```bash
# এটি 401 Unauthorized ফেরত দেওয়া উচিত, নিশ্চিত করে যে OAuth2 সিকিউরিটি সক্রিয় রয়েছে
curl -v http://localhost:8081/
```

### 2. ক্লায়েন্ট ক্রেডেনশিয়াল ব্যবহার করে একটি অ্যাক্সেস টোকেন পান

```bash
# সম্পূর্ণ টোকেন প্রতিক্রিয়া পান এবং বের করুন
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# অথবা শুধুমাত্র টোকেন বের করতে (jq প্রয়োজন)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

দ্রষ্টব্য: Basic Authentication হেডার (`bWNwLWNsaWVudDpzZWNyZXQ=`) হল `mcp-client:secret` এর Base64 এনকোডিং।

### 3. টোকেন ব্যবহার করে সুরক্ষিত এন্ডপয়েন্টে অ্যাক্সেস করুন

```bash
# সংরক্ষিত টোকেন ব্যবহার করা হচ্ছে
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# অথবা সরাসরি টোকেন মান দিয়ে
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" সহ একটি সফল উত্তর নিশ্চিত করে যে OAuth2 কনফিগারেশন সঠিকভাবে কাজ করছে।

---

## কন্টেইনার বিল্ড

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps**-এ ডিপ্লয় করুন

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

ইনগ্রেস FQDN আপনার **issuer** (`https://<fqdn>`) হয়ে যায়।  
Azure `*.azurecontainerapps.io` এর জন্য স্বয়ংক্রিয়ভাবে একটি বিশ্বস্ত TLS সার্টিফিকেট প্রদান করে।

---

## **Azure API Management** এর সাথে সংযুক্ত করুন

আপনার API-তে এই inbound policy যোগ করুন:

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

APIM JWKS পড়বে এবং প্রতিটি অনুরোধ যাচাই করবে।

---

## পরবর্তী কী

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:  
এই নথিটি AI অনুবাদ সেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। আমরা যথাসাধ্য সঠিকতার চেষ্টা করি, তবে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা ভুলত্রুটির সম্ভাবনা রয়েছে। মূল নথিটি তার স্থানীয় ভাষায়ই সর্বাধিক বিশ্বাসযোগ্য উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদের পরামর্শ দেওয়া হয়। এই অনুবাদ ব্যবহারের ফলে সৃষ্ট কোনো ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়ী নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->