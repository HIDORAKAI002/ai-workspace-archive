# MCP OAuth2 ਡੈਮੋ

## ਪਰਿਚయ

OAuth2 ਅਧਿਕਾਰਣ ਲਈ ਉਦਯੋਗ-ਮਿਆਰੀ ਪ੍ਰੋਟੋਕੋਲ ਹੈ, ਜੋ ਕਿ ਕ੍ਰਿਡੇਂਸ਼ਲ ਸਾਂਝੇ ਬਿਨਾਂ ਸਰੋਤਾਂ ਤੱਕ ਸੁਰੱਖਿਅਤ ਪਹੁੰਚ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ। MCP (ਮਾਡਲ ਸੰਦੇਸ਼ ਪਰੋਟੋਕੋਲ) ਅਮਲਾਂ ਵਿੱਚ, OAuth2 ਇੱਕ ਮਜ਼ਬੂਤ ਤਰੀਕਾ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਗ੍ਰਾਹਕਾਂ (ਜਿਵੇਂ AI ਏਜੰਟ) ਨੂੰ MCP ਸਰਵਰਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਟੂਲਾਂ ਤੱਕ ਪਹੁੰਚ ਦੇਣ ਲਈ ਪ੍ਰਮਾਣਿਕਤਾ ਅਤੇ ਅਧਿਕਾਰਣ ਕਰਨ ਲਈ।

ਇਹ ਪਾਠ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਕਿਵੇਂ MCP ਸਰਵਰਾਂ ਲਈ Spring Boot ਦੀ ਵਰਤੋਂ ਕਰਕੇ OAuth2 ਪ੍ਰਮਾਣਿਕਤਾ ਨੂੰ ਲਾਗੂ ਕਰਨਾ ਹੈ, ਜੋ ਕਿ ਉਦਯੋਗਿਕ ਅਰਜੀਆਂ ਅਤੇ ਉਤਪਾਦਨ ਤैनਾਤੀਆਂ ਲਈ ਇੱਕ ਆਮ ਰੁਪ ਰੇਖਾ ਹੈ।

## ਸਿੱਖਣ ਦੇ ਉਦੇਸ਼

ਇਸ ਪਾਠ ਦੇ ਅੰਤ ਤੱਕ, ਤੁਸੀਂ:
- ਸਿੱਖੋਗੇ ਕਿ OAuth2 MCP ਸਰਵਰਾਂ ਨਾਲ ਕਿਵੇਂ ਇੰਟਿਗਰੇਟ ਹੁੰਦਾ ਹੈ
- Spring Authorization Server ਨੂੰ ਟੋਕਨ ਜਾਰੀ ਕਰਨ ਲਈ ਲਾਗੂ ਕਰੋਗੇ
- JWT-ਆਧਾਰਿਤ ਪ੍ਰਮਾਣਿਕਤਾ ਨਾਲ MCP ਐਂਡਪੌਇੰਟਜ਼ ਦੀ ਸੁਰੱਖਿਆ ਕਰੋਗੇ
- ਮਸ਼ੀਨ-ਤੋਂ-ਮਸ਼ੀਨ ਸੰਚਾਰ ਲਈ ਕਲਾਇੰਟ ਕ੍ਰਿਡੇਂਸ਼ਲ ਫਲੋ ਨੂੰ ਸੰਰਚਿਤ ਕਰੋਗੇ

## ਪ੍ਰਾਰੰਭਿਕ ਜ਼ਰੂਰਤਾਂ

- ਜਾਵਾ ਅਤੇ ਸਪ੍ਰਿੰਗ ਬੂਟ ਦੀ ਮੂਲ ਸਮਝ
- ਪਹਿਲਾਂ ਦੇ ਮਾਡਿਊਲਾਂ ਤੋਂ MCP ਸੰਕਲਪਾਂ ਨਾਲ ਜਾਣੂ
- Maven ਜਾਂ Gradle ਇੰਸਟਾਲ ਕੀਤਾ ਹੋਇਆ

---

## ਪ੍ਰੋਜੈਕਟ ਦਾ ਵੇਰਵਾ

ਇਹ ਪ੍ਰੋਜੈਕਟ ਇੱਕ **ਘੱਟ ਤੋਂ ਘੱਟ ਸਪ੍ਰਿੰਗ ਬੂਟ ਐਪਲੀਕੇਸ਼ਨ** ਹੈ ਜੋ ਦੋਹਾਂ ਦੇ ਤੌਰ 'ਤੇ ਕੰਮ ਕਰਦਾ ਹੈ:

* ਇੱਕ **Spring Authorization Server** (ਜੋ `client_credentials` ਫਲੋ ਰਾਹੀਂ JWT ਐਕਸੈਸ ਟੋਕਨ ਜਾਰੀ ਕਰਦਾ ਹੈ), ਅਤੇ  
* ਇੱਕ **Resource Server** (ਜੋ ਆਪਣਾ `/hello` ਐਂਡਪੌਇੰਟ ਸੁਰੱਖਿਅਤ ਕਰਦਾ ਹੈ)।

ਇਹ [Spring ਬਲੌਗ ਪੋਸਟ (2 ਅਪ੍ਰੈਲ 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) ਵਿੱਚ ਦਰਸਾਈ ਗਈ ਵਿਆਵਸਥਾ ਦੀ ਨਕਲ ਕਰਦਾ ਹੈ।

---

## ਫੁੱਟੀ ਸਟਾਰਟ (ਲੋਕਲ)

```bash
# ਬਣਾਓ ਅਤੇ ਚਲਾਓ
./mvnw spring-boot:run

# ਇੱਕ ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰੋ
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# ਸੁਰੱਖਿਅਤ ਐਂਡਪੋਇੰਟ ਨੂੰ ਕਾਲ ਕਰੋ
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 ਸੰਰਚਨਾ ਦੀ ਜਾਂਚ ਕਰਨਾ

ਤੁਸੀਂ ਹੇਠ ਲਿਖੀਆਂ ਕਦਮਾਂ ਨਾਲ OAuth2 ਸੁਰੱਖਿਆ ਸੰਰਚਨਾ ਦੀ ਜਾਂਚ ਕਰ ਸਕਦੇ ਹੋ:

### 1. ਪੱਕਾ ਕਰੋ ਕਿ ਸਰਵਰ ਚਾਲੂ ਅਤੇ ਸੁਰੱਖਿਅਤ ਹੈ

```bash
# ਇਸ ਨੂੰ 401 ਅਣਅਧਿਕ੍ਰਿਤ ਵਾਪਸ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ, ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ ਕਿ OAuth2 ਸੁਰੱਖਿਆ ਸક્રਿਯ ਹੈ
curl -v http://localhost:8081/
```

### 2. ਕਲਾਇੰਟ ਕ੍ਰਿਡੇਂਸ਼ਲ ਨਾਲ ਐਕਸੈਸ ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰੋ

```bash
# ਪੂਰਾ ਟੋਕਨ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ ਅਤੇ ਕਢੋ
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# ਜਾਂ ਸਿਰਫ ਟੋਕਨ ਕਢਣ ਲਈ (jq ਦੀ ਲੋੜ ਹੈ)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

ਨੋਟ: ਬੇਸਿਕ ਔਥੈਂਟੀਕੇਸ਼ਨ ਹੈਡਰ (`bWNwLWNsaWVudDpzZWNyZXQ=`) `mcp-client:secret` ਦਾ Base64 ਕੋਡ ਹੈ।

### 3. ਟੋਕਨ ਨਾਲ ਸੁਰੱਖਿਅਤ ਐਂਡਪੌਇੰਟ ਤੱਕ ਪਹੁੰਚ ਕਰੋ

```bash
# ਸੇਵ ਕੀਤਾ ਟੋਕਨ ਵਰਤਣਾ
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# ਜਾਂ ਸਿੱਧਾ ਟੋਕਨ ਮੁੱਲ ਨਾਲ
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" ਨਾਲ ਸਫਲ ਜਵਾਬ ਇਸ ਗੱਲ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ ਕਿ OAuth2 ਸੰਰਚਨਾ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਕੰਮ ਕਰ ਰਹੀ ਹੈ।

---

## ਕੰਟੇਨਰ ਬਣਾਉਣਾ

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps** ‘ਤੇ ਤੈਨਾਤ ਕਰੋ

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

ਇੰਗ੍ਰੈੱਸ FQDN ਤੁਹਾਡਾ **issuer** ਬਣ ਜਾਂਦਾ ਹੈ (`https://<fqdn>`)।  
Azure `*.azurecontainerapps.io` ਲਈ ਭਰੋਸੇਮੰਦ TLS ਸਰਟੀਫਿਕੇਟ ਆਪਮੈਟਿਕ ਤੌਰ ਤੇ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

---

## **Azure API Management** ‘ਚ ਜੋੜੋ

ਆਪਣੇ API ਵਿੱਚ ਇਹ ਇਨਬਾਊਂਡ ਨੀਤੀ ਸ਼ਾਮਲ ਕਰੋ:

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

APIM JWKS ਲਏਗਾ ਅਤੇ ਹਰ ਬੇਨਤੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੇਗਾ।

---

## ਅਗਲਾ ਕੀ ਹੈ

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਕਤਿ**:  
ਇਹ ਦਸਤਾਵੇਜ਼ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰ ਕੇ ਅਨੁਵਾਦਿਤ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸ਼ੁੱਧਤਾ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਥਿਰਤਾਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਪ੍ਰਮਾਣਿਕ ਸਰੋਤ ਦੇ ਤੌਰ ਤੇ ਗਿਣਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਸੰਵੇਦਨਸ਼ੀਲ ਜਾਣਕਾਰੀ ਲਈ ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਿਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫ਼ਹਮੀਆਂ ਜਾਂ ਅਸਮਝਦਾਰੀਆਂ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->