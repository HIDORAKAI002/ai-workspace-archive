# MCP OAuth2 ಡೆಮೊ

## ಪರಿಚಯ

OAuth2 ಅನುಮತಿಕ್ಕಾಗಿ ಉದ್ಯಮ-ಮಟ್ಟದ ಪ್ರೋಟೊಕಾಲ್ ಆಗಿದ್ದು, ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳದೆ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಪನ್ಮೂಲಗಳಿಗೆ ಪ್ರವೇಶವನ್ನು ಸಾದ್ಯಮಾಡುತ್ತದೆ. MCP (ಮಾದರಿ ಸಾಂದರ್ಭಿಕ ಪ್ರೋಟೊಕಾಲ್) ಅನುಷ್ಠಾನಗಳಲ್ಲಿ, OAuth2 ಕ್ಲೈಂಟ್‌ಗಳು (ಉದಾ: AI ಏಜೆಂಟ್‌ಗಳು) MCP ಸರ್ವರ್‌ಗಳು ಮತ್ತು ಅವುಗಳ ಟೂಲ್ಗಳಿಗೆ ಪ್ರವೇಶ ಪಡೆಯಲು ದೃಢೀಕರಣ ಮತ್ತು ಅನುಮತಿ ನೀಡುವಲ್ಲದೆ ಶಕ್ತಿಶಾಲಿ ವಿಧಾನವನ್ನು ಒದಗಿಸುತ್ತದೆ.

ಈ ಪಾಠವು Spring Boot ಬಳಸಿ MCP ಸರ್ವರ್‌ಗಳಿಗೆ OAuth2 ದೃಢೀಕರಣವನ್ನು ಹೇಗೆ ಅನುಷ್ಠಾನಗೊಳಿಸುವುದೆಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ, ಇದು ಉದ್ಯಮ ಮತ್ತು ಉತ್ಪಾದನಾ ನಿಯೋಜನೆಗಳಿಗಾಗಿ ಸಾಮಾನ್ಯ ಮಾದರಿಯಾಗಿದೆ.

## ಕಲಿಕೆಯ ಉದ್ದೇಶಗಳು

ಈ ಪಾಠದ ಅಂತ್ಯಕ್ಕೆ, ನೀವು:
- MCP ಸರ್ವರ್‌ಗಳೊಂದಿಗೆ OAuth2 ಹೇಗೆ ಏಕೀಕೃತವಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವಿರಿ
- ಟೋಕನ್ ಇಶ್ಯೂಗೆ Spring ಅನುಮತಿ ಸರ್ವರ್ ಅನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸುವಿರಿ
- JWT ಆಧಾರಿತ ದೃಢೀಕರಣದೊಂದಿಗೆ MCP ಎಂಡ್ಪಾಯಿಂಟ್‌ಗಳನ್ನು ರಕ್ಷಿಸುವಿರಿ
- ಯಂತ್ರದಿಂದ ಯಂತ್ರ ಸಂವಹನಕ್ಕೆ ಕ್ಲೈಂಟ್ ಪ್ರಮಾಣಪತ್ರ ಸಹಜರಹಿತ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸಂರಚಿಸುವಿರಿ

## ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು

- Java ಮತ್ತು Spring Boot ಗೆ ಮೂಲಭೂತ ತಿಳಿವು
- ಹಿಂದಿನ ಘಟಕಗಳಿಂದ MCP ಅನುಭಾವಗಳ ಪರಿಚಯ
- Maven ಅಥವಾ Gradle ಇನ್‌ಸ್ಟಾಲ್ ಆಗಿರಬಹುದು

---

## ಯೋಜನೆ ಅವಲೋಕನ

ಈ ಯೋಜನೆ ಒಂದು **ಸ್ವಲ್ಪವಾದ Spring Boot ಅಪ್ಲಿಕೇಶನ್** ಆಗಿದ್ದು, ಎರಡನ್ನು ಜೊತೆಗೆ:
* **Spring ಅನುಮತಿ ಸರ್ವರ್** ( `client_credentials` ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ JWT ಪ್ರವೇಶ ಟೋಕನ್‌ಗಳನ್ನು ಇಶೂ ಮಾಡುತ್ತದೆ), ಮತ್ತು  
* **ಸಂಪನ್ಮೂಲ ಸರ್ವರ್** (ತೆಗೆಯುವ ತನ್ನದೇ `/hello` ಎಂಡ್ಪಾಯಿಂಟ್ ಅನ್ನು ರಕ್ಷಿಸುತ್ತದೆ).

ಇದು [Spring ಬ್ಲಾಗ್ ಪೋಸ್ಟ್ (2 ಏಪ್ರಿಲ್ 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) ನಲ್ಲಿ ತೋರಿಸಲಾದ ಸ್ಥಾಪನೆಗೆ ಅನುಗುಣವಾಗಿರುತ್ತದೆ.

---

## ತ್ವರಿತ ಪ್ರಾರಂಭ (ಸ್ಥಳೀಯ)

```bash
# ರಚಿಸಿ ಮತ್ತು ಚಾಲನೆ ಮಾಡಿ
./mvnw spring-boot:run

# ಟೋಕನ್ ಪಡೆಯಿರಿ
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# ಸಂರಕ್ಷಿತ ಎಂಡ್‌ಪಾಯಿಂಟ್ ಕರೆಯಿರಿ
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 ಸಂರಚನೆಯನ್ನು ಪರೀಕ್ಷಿಸುವುದು

ಕೆಳಗಿನ ಹಂತಗಳ ಮೂಲಕ ನೀವು OAuth2 ಸುರಕ್ಷತಾ ಸಂರಚನೆಯನ್ನು ಪರೀಕ್ಷಿಸಬಹುದು:

### 1. ಸರ್ವರ್ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದ್ದು ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ

```bash
# ಇದು 401 ಅನಧಿಕೃತವನ್ನು ಮರಳಿಸಬೇಕು, OAuth2 ರಕ್ಷಣೆ ಸಕ್ರಿಯವಿದೆ ಎಂದು ಖಚಿತಪಡಿಸುವುದು
curl -v http://localhost:8081/
```

### 2. ಕ್ಲೈಂಟ್ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಉಪಯೋಗಿಸಿ ಪ್ರವೇಶ ಟೋಕನ್ ಪಡೆಯಿರಿ

```bash
# ಸಂಪೂರ್ಣ ಟೋಕನ್ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ತೆಗೆಯಿರಿ
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# ಅಥವಾ ಕೇವಲ ಟೋಕನ್ ಅನ್ನು ತೆಗೆಯಲು (jq ಅಗತ್ಯವಿದೆ)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

ಗಮನಿಸಿ: ಮೂಲಭೂತ ದೃಢೀಕರಣ ಶೀರ್ಷಿಕೆ (`bWNwLWNsaWVudDpzZWNyZXQ=`) `mcp-client:secret` ನ Base64 ಸಂಕೋಡನವಾಗಿದೆ.

### 3. ಟೋಕನ್ ಬಳಸಿ ರಕ್ಷಿತ ಎಂಡ್ಪಾಯಿಂಟ್‌ಗೆ ಪ್ರವೇಶಿಸಿ

```bash
# ಉಳಿಸಿದ ಟೋಕನ್ ಅನ್ನು ಬಳಸುವುದು
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# ಅಥವಾ ನೇರವಾಗಿ ಟೋಕನ್ ಮೌಲ್ಯದೊಂದಿಗೆ
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" ಎಂಬ ಯಶಸ್ವಿ ಪ್ರತಿಕ್ರಿಯೆಯು OAuth2 ಸಂರಚನೆ ಸರಿಯಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತಿದೆ ಎಂಬುದನ್ನು ದೃಢಪಡಿಸುತ್ತದೆ.

---

## ಕಾಂಟೈನರ್ ರಚನೆ

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps** ಗೆ ನಿಯೋಜಿಸಿ

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

ಪ್ರವೇಶದ FQDN ನು ನಿಮ್ಮ **issuer** ಆಗುತ್ತದೆ (`https://<fqdn>`).  
Azure ಸ್ವಯಂಚಾಲಿತವಾಗಿ `*.azurecontainerapps.io` ಗೆ ವಿಶ್ವಾಸಾರ್ಹ TLS ಪ್ರಮಾಣಪತ್ರ ಒದಗಿಸುತ್ತದೆ.

---

## **Azure API Management** ಗೆ ಸಂಪರ್ಕಿಸು

ನಿಮ್ಮ API ಗೆ ಈ ಇನ್‌ಬೌಂಡ್ ಧೋರಣೆಯನ್ನು ಸೇರಿಸಿ:

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

APIM JWKS ಅನ್ನು ಪಡೆದು ಪ್ರತಿ ವಿನಂತಿಗು ಮಾನ್ಯತೆ ನೀಡುತ್ತದೆ.

---

## ಮುಂದೇನಿದೆ

- [5.4 ರೂಟ್ ಸಾಂದರ್ಭಿಕತೆಗಳು](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಪರಿಹಾರ ಸೂಚನೆ**:  
ಈ ದಾಖಲೆಯನ್ನು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಯನ್ನು ಬಳಸಿಕೊಂಡು ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯಿಗಾಗಿ ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ತಪ್ಪು ಅಥವಾ ಅಸತ್ಯತೆಗಳು ಇರಬಹುದಾಗಿರುವುದನ್ನು ದಯವಿಟ್ಟು ಗಮನಿಸಿ. ಮೂಲ ಭಾಷೆಯ ದಾಖಲೆಗಳನ್ನು ಅಧಿಕೃತ ಮೂಲ ಎಂದು ಪರಿಗಣಿಸಬೇಕು. ಮುಖ್ಯ ಮಾಹಿತಿಗಾಗಿ ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದ ಬಳಕೆಯಿಂದ ಉಂಟಾದ ಯಾವುದೇ ದುರ್ಭಾವ ಅಥವಾ ತಪ್ಪು ಅರ್ಥಮಾಡಿಕೊಡುವಿಕೆಗೆ ನಾವು ಜವಾಬ್ದಾರಿಯಾಗಿರುವುದಿಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->