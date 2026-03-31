# MCP OAuth2 Demo

## Introduktion

OAuth2 är industristandardprotokollet för auktorisation, vilket möjliggör säker åtkomst till resurser utan att dela inloggningsuppgifter. I MCP (Model Context Protocol)-implementationer ger OAuth2 ett robust sätt att autentisera och auktorisera klienter (såsom AI-agenter) att få åtkomst till MCP-servrar och deras verktyg.

Denna lektion visar hur man implementerar OAuth2-autentisering för MCP-servrar med Spring Boot, ett vanligt mönster för företags- och produktionsdistributioner.

## Lärandemål

I slutet av denna lektion kommer du att:
- Förstå hur OAuth2 integreras med MCP-servrar
- Implementera en Spring Authorization Server för tokenutfärdande
- Skydda MCP-endpoints med JWT-baserad autentisering
- Konfigurera client credentials-flödet för maskin-till-maskin-kommunikation

## Förkunskaper

- Grundläggande förståelse för Java och Spring Boot
- Bekantskap med MCP-koncept från tidigare moduler
- Maven eller Gradle installerat

---

## Projektöversikt

Detta projekt är en **minimal Spring Boot-applikation** som fungerar både som:

* en **Spring Authorization Server** (som utfärdar JWT-access tokens via `client_credentials`-flödet), och  
* en **Resource Server** (som skyddar sin egen `/hello`-endpoint).

Det speglar upplägget som visas i [Spring blogginlägget (2 apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Snabbstart (lokalt)

```bash
# bygg och kör
./mvnw spring-boot:run

# hämta en token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# anropa den skyddade slutpunkten
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testa OAuth2-konfigurationen

Du kan testa OAuth2-säkerhetskonfigurationen med följande steg:

### 1. Verifiera att servern körs och är säkrad

```bash
# Detta bör returnera 401 Unauthorized, vilket bekräftar att OAuth2-säkerhet är aktiv
curl -v http://localhost:8081/
```

### 2. Hämta en access token med client credentials

```bash
# Hämta och extrahera hela token-svaret
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Eller för att extrahera bara token (kräver jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Observera: Basic Authentication-headern (`bWNwLWNsaWVudDpzZWNyZXQ=`) är Base64-kodningen av `mcp-client:secret`.

### 3. Få åtkomst till den skyddade endpointen med token

```bash
# Använder den sparade token
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Eller direkt med tokenvärdet
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Ett lyckat svar med "Hello from MCP OAuth2 Demo!" bekräftar att OAuth2-konfigurationen fungerar korrekt.

---

## Bygg container

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Distribuera till **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingressens FQDN blir din **issuer** (`https://<fqdn>`).  
Azure tillhandahåller automatiskt ett betrott TLS-certifikat för `*.azurecontainerapps.io`.

---

## Anslut till **Azure API Management**

Lägg till denna inbound policy till din API:

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

APIM kommer att hämta JWKS och validera varje förfrågan.

---

## Vad är nästa steg

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var god observera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->