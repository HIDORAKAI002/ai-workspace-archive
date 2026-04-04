# MCP OAuth2 डेमो

## परिचय

OAuth2 प्राधिकरण के लिए उद्योग-मानक प्रोटोकॉल है, जो क्रेडेंशियल साझा किए बिना सुरक्षित संसाधनों तक पहुँच सक्षम करता है। MCP (मॉडल संदर्भ प्रोटोकॉल) कार्यान्वयन में, OAuth2 क्लाइंट्स (जैसे AI एजेंट) को MCP सर्वरों और उनके टूल्स तक पहुंचने के लिए प्रमाणीकरण और प्राधिकरण का मजबूत तरीका प्रदान करता है।

यह पाठ दिखाता है कि Spring Boot का उपयोग करके MCP सर्वरों के लिए OAuth2 प्रमाणीकरण कैसे लागू किया जाए, जो उद्यम और उत्पादन तैनाती के लिए एक सामान्य पैटर्न है।

## सीखने के उद्देश्य

इस पाठ के अंत तक, आप:
- समझ पाएंगे कि OAuth2 MCP सर्वरों के साथ कैसे एकीकृत होता है
- टोकन जारी करने के लिए Spring Authorization Server लागू करेंगे
- JWT-आधारित प्रमाणीकरण के साथ MCP एंडपॉइंट्स की रक्षा करेंगे
- मशीन-से-मशीन संचार के लिए क्लाइंट क्रेडेंशियल फ्लो को कॉन्फ़िगर करेंगे

## आवश्यकताएँ

- Java और Spring Boot की बुनियादी समझ
- पिछले मॉड्यूल से MCP अवधारणाओं से परिचित
- Maven या Gradle स्थापित

---

## परियोजना अवलोकन

यह परियोजना एक **न्यूनतम Spring Boot आवेदन** है जो दोनों के रूप में कार्य करता है:

* एक **Spring Authorization Server** (जो `client_credentials` फ्लो के माध्यम से JWT एक्सेस टोकन जारी करता है), और  
* एक **Resource Server** (जो अपने `/hello` एंडपॉइंट की सुरक्षा करता है)।

यह सेटअप [Spring ब्लॉग पोस्ट (2 अप्रैल 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) में दिखाए गए विन्यास का प्रतिबिंब है।

---

## त्वरित शुरुआत (स्थानीय)

```bash
# बनाएँ और चलाएँ
./mvnw spring-boot:run

# एक टोकन प्राप्त करें
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# सुरक्षित एंडपॉइंट को कॉल करें
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 कॉन्फ़िगरेशन का परीक्षण

आप निम्नलिखित चरणों के साथ OAuth2 सुरक्षा कॉन्फ़िगरेशन का परीक्षण कर सकते हैं:

### 1. पुष्टि करें कि सर्वर चल रहा है और सुरक्षित है

```bash
# यह 401 अनधिकृत लौटाना चाहिए, यह पुष्टि करते हुए कि OAuth2 सुरक्षा सक्रिय है
curl -v http://localhost:8081/
```

### 2. क्लाइंट क्रेडेंशियल के साथ एक्सेस टोकन प्राप्त करें

```bash
# पूर्ण टोकन प्रतिक्रिया प्राप्त करें और निकालें
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# या केवल टोकन निकालने के लिए (jq आवश्यक है)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

नोट: Basic Authentication हेडर (`bWNwLWNsaWVudDpzZWNyZXQ=`) `mcp-client:secret` का Base64 एन्कोडिंग है।

### 3. टोकन का उपयोग करके सुरक्षित एंडपॉइंट तक पहुँचें

```bash
# सहेजे गए टोकन का उपयोग करना
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# या सीधे टोकन मान के साथ
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" के साथ सफल प्रतिक्रिया यह पुष्टि करती है कि OAuth2 कॉन्फ़िगरेशन सही ढंग से काम कर रहा है।

---

## कंटेनर बिल्ड

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps** पर तैनात करें

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

इंग्रेस FQDN आपका **issuer** बन जाता है (`https://<fqdn>`)।  
Azure स्वचालित रूप से `*.azurecontainerapps.io` के लिए एक विश्वसनीय TLS प्रमाणपत्र प्रदान करता है।

---

## **Azure API Management** में वायर करें

अपने API में निम्न inbound नीति जोड़ें:

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

APIM JWKS प्राप्त करेगा और हर अनुरोध का सत्यापन करेगा।

---

## आगे क्या है

- [5.4 रूट संदर्भ](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यह दस्तावेज़ एआई अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके अनुवादित किया गया है। जबकि हम सटीकता के लिए प्रयासरत हैं, कृपया ध्यान रखें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में प्राधिकृत स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम जिम्मेदार नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->