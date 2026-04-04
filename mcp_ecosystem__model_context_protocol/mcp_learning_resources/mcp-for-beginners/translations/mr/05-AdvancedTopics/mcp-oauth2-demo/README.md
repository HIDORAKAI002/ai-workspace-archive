# MCP OAuth2 डेमो

## परिचय

OAuth2 हा प्राधिकरणासाठी उद्योग-मानक प्रोटोकॉल आहे, जो क्रेडेंशियल शेअर न करता सुरक्षित प्रवेश सुलभ करतो. MCP (मॉडेल कॉन्टेक्स्ट प्रोटोकॉल) अंमलबजावणीत, OAuth2 क्लायंट्स (जसे की AI एजंट्स)ना MCP सर्व्हर्स आणि त्यांच्या साधनांमध्ये प्रवेश करण्यासाठी प्रमाणीकरण आणि गतप्राधिकरण करण्याचा एक मजबूत मार्ग पुरवतो.

हा धडा Spring Boot वापरून MCP सर्व्हर्ससाठी OAuth2 प्रमाणीकरण कसे अंमलात आणायचे हे दर्शवितो, जे एंटरप्राइझ आणि उत्पादन तैनातीसाठी एक सामान्य पद्धत आहे.

## शिक्षण उद्दिष्टे

या धड्याच्या शेवटी, तुम्ही:
- OAuth2 MCP सर्व्हर्स सोबत कसे समाकलित होते हे समजून घेणार
- टोकन जारी करण्यासाठी Spring Authorization Server कसे अंमलात आणायचे ते शिकणार
- JWT-आधारित प्रमाणीकरण वापरून MCP एंडपॉइंट्स कसे संरक्षित करायचे हे शिकणार
- मशीन-टू-मशीन संवादासाठी क्लायंट क्रेडेंशियल्स फ्लो कसे कॉन्फिगर करायचे ते शिकणार

## पूर्वअटी

- Java आणि Spring Boot चे मूलभूत ज्ञान
- आधीच्या मॉड्यूलमधील MCP संकल्पनांची ओळख
- Maven किंवा Gradle स्थापित असणे

---

## प्रोजेक्ट विहंगावलोकन

हा प्रोजेक्ट एक **किमान Spring Boot अनुप्रयोग** आहे जो दोन्हीप्रकारे कार्य करतो:

* एक **Spring Authorization Server** (जो `client_credentials` फ्लो वापरून JWT प्रवेश टोकन जारी करतो), आणि  
* एक **Resource Server** (जो स्वतःच्या `/hello` एंडपॉइंटचे सुरक्षा करतो).

हा सेटअप [Spring ब्लॉग पोस्ट (2 एप्रिल 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) मध्ये दाखविलेल्या सेटअपशी साम्य दर्शवतो.

---

## जलद प्रारंभ (स्थानिक)

```bash
# बांधा आणि चालवा
./mvnw spring-boot:run

# एक टोकन मिळवा
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# संरक्षित एंडपॉइंट कॉल करा
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 कॉन्फिगरेशनची चाचणी

खालील टप्प्यांद्वारे तुम्ही OAuth2 सुरक्षा कॉन्फिगरेशनची चाचणी करू शकता:

### 1. सर्व्हर चालू आहे आणि सुरक्षित आहे याची खात्री करा

```bash
# हे 401 Unauthorized परत करावे, ज्यामुळे OAuth2 सुरक्षा सक्रिय असल्याची पुष्टी होते
curl -v http://localhost:8081/
```

### 2. क्लायंट क्रेडेंशियल्स वापरून प्रवेश टोकन मिळवा

```bash
# पूर्ण टोकन प्रतिसाद मिळवा आणि विभाजित करा
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# किंवा फक्त टोकन काढा (jq आवश्यक आहे)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

टीप: Basic Authentication हेडर (`bWNwLWNsaWVudDpzZWNyZXQ=`) हा `mcp-client:secret` चा Base64 एन्कोडिंग आहे.

### 3. टोकन वापरून संरक्षित एंडपॉइंटवर प्रवेश करा

```bash
# जतन केलेला टोकन वापरत आहे
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# किंवा टोकन मूल्य थेट वापरून
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" हा यशस्वी प्रतिसाद येणे म्हणजे OAuth2 कॉन्फिगरेशन बरोबर काम करत आहे याची पुष्टी होते.

---

## कंटेनर बिल्ड

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps** मध्ये तैनात करा

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

इंग्रेस FQDN तुमचा **issuer** (`https://<fqdn>`) बनतो.  
Azure आपोआप `*.azurecontainerapps.io` साठी विश्वासार्ह TLS प्रमाणपत्र प्रदान करते.

---

## **Azure API Management** मध्ये जोडा

तुमच्या API मध्ये हा इनबाउंड धोरण जोडा:

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

APIM JWKS प्राप्त करेल आणि प्रत्येक विनंतीचे प्रमाणपत्र पडताळून पाहणार.

---

## पुढे काय

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून भाषांतरित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करत असलो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये चुका किंवा अचूकतेत त्रुटी असू शकतात. मूळ दस्तऐवज त्याच्या मूळ भाषेतले अधिकारिक स्रोत मानला पाहिजे. महत्त्वपूर्ण माहितीसाठी व्यावसायिक मानवी भाषांतर शिफारसीय आहे. या भाषांतराच्या वापरामुळे झालेल्या कोणत्याही गैरसमजुती किंवा चुकीच्या अर्थलागी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->