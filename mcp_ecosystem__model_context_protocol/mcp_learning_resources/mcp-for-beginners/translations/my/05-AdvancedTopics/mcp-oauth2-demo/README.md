# MCP OAuth2 Demo

## နိဒါန်း

OAuth2 သည် စံချိန်စံညွှန်းအဆင့်ရှိ ခွင့်ပြုမှုပရိုတိုကောဖြစ်ပြီး လျှို့ဝှက်နံပါတ်မျှဝေခြင်းမပြုဘဲ သရုပ်ပြသက်သေပြုခြင်းဖြင့် သတင်းအချက်အလက်များသို့ လုံခြုံစိတ်ချစွာ ဝင်ရောက်ခွင့်ရယူနိုင်သည်။ MCP (Model Context Protocol) အကောင်အထည်ဖော်မှုများတွင် OAuth2 သည် MCP ဆာဗာများနှင့် ၎င်းတို့၏ ကိရိယာများသို့ ဝင်ရောက်ခွင့်ရှိသူများ (AI ကိုယ်စားလှယ်များကဲ့သို့သော) ကို ထောက်ခံသက်သေပြုခြင်းနှင့် ခွင့်ပြုခွင့်များပေးရန် အားကောင်းသောနည်းလမ်းတစ်ခု ရရှိစေသည်။

ဤသင်ခန်းစာတွင် MCP ဆာဗာများအတွက် Spring Boot ကို အသုံးပြု၍ OAuth2 ထောက်ခံသက်သေပြုခြင်းကို မည်သို့ တည်ဆောက်နိုင်ကြောင်း သရုပ်ပြသည်။

## သင်ယူရမည့် ရည်မှန်းချက်များ

ဤသင်ခန်းစာပြီးဆုံးချိန်တွင် သင်သည်
- OAuth2 ကို MCP ဆာဗာများနှင့် မည်သို့ပေါင်းစည်းအသုံးပြုသည်ကို နားလည်နိုင်မည်
- Token ပေးပို့ရေးအတွက် Spring Authorization Server တည်ဆောက်နိုင်မည်
- MCP အဆုံးလွှတ်များကို JWT အခြေပြုသက်သေပြုမှုဖြင့် ကာကွယ်နိုင်မည်
- ကိရိယာစက်မှစက်ဆက်သွယ်မှုအတွက် client credentials flow ကို ပြင်ဆင်နိုင်မည်

## မတိုင်မီ အသင့်ရှိပစ္စည်းများ

- Java နှင့် Spring Boot အခြေခံနားလည်မှု
- ယခင်သင်ခန်းစာများမှ MCP အယူအဆများ အသိပညာရှိမှု
- Maven သို့မဟုတ် Gradle ထည့်သွင်းထားခြင်း

---

## ပရောဂျက် အနှစ်ချုပ်

ဤပရောဂျက်သည် **နည်းပါးဆုံး Spring Boot Application** တစ်ခုဖြစ်သည်၊ ၎င်းမှာ

* **Spring Authorization Server** တစ်ခုအဖြစ် (client_credentials flow ဖြင့် JWT access token များထုတ်ပေးခြင်း), နှင့်  
* **Resource Server** တစ်ခုအဖြစ် (၎င်း၏ `/hello` endpoint ကို ကာကွယ်ပေးခြင်း) တို့ကို တပြိုင်နက် ဆောင်ရွက်သည်။

ဤပုံစံသည် [Spring ဘလော့ဂ် (2 Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) တွင် ဖော်ပြထားသည့် ဖော်ပြချက်နှင့် တူညီသည်။

---

## ရှုမော၍ စတင်ခြင်း (ဒေသတွင်း)

```bash
# တည်ဆောက်၍ အ 실행လုပ်သည်
./mvnw spring-boot:run

# တိုကင်ရယူပါ
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# ကာကွယ်ထားသော အဆုံးမှတ်သို့ ခေါ်ဆိုသည်
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 ဖွဲ့စည်းပုံ စစ်ဆေးခြင်း

အောက်ပါခြေလှမ်းများဖြင့် OAuth2 လုံခြုံရေးဖွဲ့စည်းပုံကို စစ်ဆေးနိုင်သည်-

### ၁။ ဆာဗာ အလုပ်လုပ်မှုနှင့် လုံခြုံမှု ရှိကြောင်း စစ်ဆေးပါ

```bash
# ၎င်းသည် OAuth2 လုံခြုံမှု အသက်ဝင်နေကြောင်း အတည်ပြုကာ 401 Unauthorized ကို ပြန်လည်ပေးပို့ရမည်။
curl -v http://localhost:8081/
```

### ၂။ client credentials အသုံးပြု၍ access token ရယူပါ

```bash
# အပြည့်အစုံသော token တုံ့ပြန်ချက်ကို ရယူပြီး ထုတ်ယူပါ
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# ဒါမှမဟုတ် token သာထုတ်ယူရန် (jq လိုအပ်သည်)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

မှတ်ချက်- Basic Authentication header (`bWNwLWNsaWVudDpzZWNyZXQ=`) သည် `mcp-client:secret` ၏ Base64 ကုဒ်ဖြစ်သည်။

### ၃။ token ဖြင့် ကာကွယ်ထားသော endpoint ကို ဝင်ရောက်ကြည့်ရှုပါ

```bash
# သိမ်းဆည်းထားသော token ကို အသုံးပြုခြင်း
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# သို့မဟုတ် token တန်ဖိုးနဲ့ တိုက်ရိုက် အသုံးပြုခြင်း
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" ဆိုသော အောင်မြင်သော တုံ့ပြန်မှုသည် OAuth2 ဖွဲ့စည်းပုံ များမှန်ကန်စွာ လုပ်ဆောင်နေကြောင်း အတည်ပြုသည်။

---

## ကွန်တွေးနာဆောက်ခြင်း

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps** သို့ တင်သွင်းခြင်း

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingress FQDN သည် သင့် **issuer** (`https://<fqdn>`) ဖြစ်လာသည်။  
Azure သည် `*.azurecontainerapps.io` အတွက် ယုံကြည်စိတ်ချရသော TLS စံချက်ကို အလိုအလျောက်ပေးသည်။

---

## **Azure API Management** နှင့် ဆက်စပ်ရန်

သင့် API တွင် inbound policy အောက်ပါအတိုင်း ထည့်ပါ-

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

APIM သည် JWKS ကို ရယူပြီး တောင်းဆိုမှုတိုင်းကို အတည်ပြုမည်။

---

## နောက်တွင် ဘာများရှိသနည်း

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**အာမခံချက်မရှိခြင်း**  
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှုဖြစ်သော [Co-op Translator](https://github.com/Azure/co-op-translator) ကိုအသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ တိကျမှုအတွက် ကြိုးစားသည်ဖြစ်ပေမယ့် အလိုအလျောက်ဘာသာပြန်ချက်များတွင် မှားယွင်းချက်များ သို့မဟုတ် ကြားဖြတ်မှုများ ရှိနိုင်ကြောင်း သတိပြုပါ။ မူရင်းစာတမ်းကို တိုင်းငံစကားဖြင့်သာ တရားဝင်အရင်းအမြစ်အဖြစ် ယူဆသင့်ပါသည်။ အရေးကြီးသော သတင်းအချက်အလက်များအတွက် အလုပ်အကိုင်ကျွမ်းကျင်သော လူသားဘာသာပြန်ကို လိုအပ်ပါသည်။ ဤဘာသာပြန်မှုကို အသုံးပြုကြိုက်မှားနားလွဲမှုများအတွက် ကျွန်ုပ်တို့သည် တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->