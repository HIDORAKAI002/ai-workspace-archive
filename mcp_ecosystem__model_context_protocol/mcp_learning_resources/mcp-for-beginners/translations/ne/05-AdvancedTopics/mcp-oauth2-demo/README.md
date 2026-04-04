# MCP OAuth2 डेमो

## परिचय

OAuth2 उद्योग-मानक प्रोटोकल हो प्राधिकरणका लागि, जसले प्रमाणपत्रहरू साझा नगरी संसाधनहरूमा सुरक्षित पहुँच सक्षम गर्दछ। MCP (Model Context Protocol) कार्यान्वयनहरूमा, OAuth2 ले MCP सर्भरहरू र तिनका उपकरणहरू पहुँच गर्न क्लाइन्टहरू (जस्तै AI एजेन्टहरू) लाई प्रमाणीकरण र अनुमति दिने एक कठोर तरिका प्रदान गर्दछ।

यस पाठले Spring Boot प्रयोग गरेर MCP सर्भरहरूको लागि OAuth2 प्रमाणीकरण कसरी कार्यान्वयन गर्ने देखाउँछ, जुन उद्यम र उत्पादन परिनियोजनहरूको लागि सामान्य ढाँचा हो।

## सिकाइ लक्ष्यहरू

यस पाठको अन्त्य सम्म, तपाईंले:
- OAuth2 कसरी MCP सर्भरहरूसँग एकीकृत हुन्छ बुझ्ने
- टोकन जारी गर्नका लागि Spring Authorization Server कार्यान्वयन गर्ने
- JWT-आधारित प्रमाणीकरणद्वारा MCP अन्तबिन्दुहरूलाई सुरक्षित गर्ने
- मेसिन-देखि-मेसिन सञ्चारका लागि क्लाइन्ट क्रेडेन्सियल फ्लो कन्फिगर गर्ने

## पूर्वशर्तहरू

- Java र Spring Boot को आधारभूत बुझाइ
- पहिलेका मोडुलहरूबाट MCP अवधारणाहरूको परिचय
- Maven वा Gradle इन्स्टल गरिएको

---

## परियोजना अवलोकन

यो परियोजना एक **कम्तिमा Spring Boot अनुप्रयोग** हो जसले दुबै काम गर्दछ:

* एक **Spring Authorization Server** (client_credentials फ्लो मार्फत JWT पहुँच टोकनहरू जारी गर्दै), र  
* एक **Resource Server** (आफ्नो `/hello` अन्तबिन्दु सुरक्षित गर्दै)।

यो [Spring ब्लग पोस्ट (2 अप्रिल 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) मा देखाइएको सेटअपको प्रतिबिम्ब हो।

---

## छिटो सुरु (स्थानीय)

```bash
# निर्माण र चलाउनुहोस्
./mvnw spring-boot:run

# टोकन प्राप्त गर्नुहोस्
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# सुरक्षित अन्तबिन्दु कल गर्नुहोस्
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 कन्फिगरेसन परीक्षण

तपाईं निम्न चरणहरूसँग OAuth2 सुरक्षा कन्फिगरेसन परीक्षण गर्न सक्नुहुन्छ:

### 1. सर्भर चलिरहेको छ र सुरक्षित छ भनी जाँच गर्नुहोस्

```bash
# यसले 401 Unauthorized फिर्ता गर्नुपर्छ, जसले पुष्टि गर्छ कि OAuth2 सुरक्षा सक्रिय छ
curl -v http://localhost:8081/
```

### 2. क्लाइन्ट क्रेडेन्सियल प्रयोग गरी पहुँच टोकन प्राप्त गर्नुहोस्

```bash
# पूर्ण टोकन प्रतिक्रिया प्राप्त गर्नुहोस् र निकाल्नुहोस्
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# वा केवल टोकन निकाल्न (jq आवश्यक छ)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

टिप्पणी: Basic Authentication हेडर (`bWNwLWNsaWVudDpzZWNyZXQ=`) `mcp-client:secret` को Base64 कूटलेखन हो।

### 3. टोकन प्रयोग गरी सुरक्षित अन्तबिन्दु पहुँच गर्नुहोस्

```bash
# सुरक्षित गरिएको टोकन प्रयोग गर्दै
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# वा सीधै टोकन मानसँगै
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" सहित सफल प्रतिक्रिया प्राप्त भएमा OAuth2 कन्फिगरेसन सही रूपमा काम गरिरहेको पुष्टि हुन्छ।

---

## कन्टेनर बनाउने

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps** मा तैनाथ गर्नुहोस्

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingress FQDN तपाईँको **issuer** हुन्छ (`https://<fqdn>`)।  
Azure ले `*.azurecontainerapps.io` को लागि स्वचालित रूपमा विश्वसनीय TLS प्रमाणपत्र प्रदान गर्दछ।

---

## **Azure API Management** सँग जडान गर्नुहोस्

तपाईंको API मा यो inbound नीति थप्नुहोस्:

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

APIM ले JWKS प्राप्त गरी प्रत्येक अनुरोध मान्यकरण गर्नेछ।

---

## अर्को के हो

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो कागजात AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) को प्रयोग गरी अनुवाद गरिएको हो। हामी शुद्धताको प्रयास गर्छौं भने पनि कृपया बुझ्नुस् कि स्वचालित अनुवादमा त्रुटि वा अशुद्धता हुनसक्छ। मूल कागजात यसका स्वदेशी भाषामा आधिकारिक स्रोतको रूपमा मानिनुपर्छ। महत्वपूर्ण जानकारीको लागि, व्यावसायिक मानवीय अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलतफहमि वा गलत व्याख्याको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->