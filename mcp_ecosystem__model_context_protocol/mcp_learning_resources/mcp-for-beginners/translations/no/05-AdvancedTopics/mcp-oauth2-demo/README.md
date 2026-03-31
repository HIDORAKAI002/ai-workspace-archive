# MCP OAuth2 Demo

## Introduksjon

OAuth2 er den industristandard protokollen for autorisasjon, som muliggjør sikker tilgang til ressurser uten å dele legitimasjon. I MCP (Model Context Protocol) implementasjoner gir OAuth2 en robust måte å autentisere og autorisere klienter (slik som AI-agenter) til å få tilgang til MCP-servere og deres verktøy.

Denne leksjonen demonstrerer hvordan man implementerer OAuth2-autentisering for MCP-servere ved bruk av Spring Boot, et vanlig mønster for bedrifts- og produksjonsdistribusjoner.

## Læringsmål

Etter denne leksjonen skal du:
- Forstå hvordan OAuth2 integreres med MCP-servere
- Implementere en Spring Authorization Server for tokenutstedelse
- Beskytte MCP-endepunkter med JWT-basert autentisering
- Konfigurere klient-legitimasjonsflyt for maskin-til-maskin-kommunikasjon

## Forutsetninger

- Grunnleggende forståelse av Java og Spring Boot
- Kjennskap til MCP-konsepter fra tidligere moduler
- Maven eller Gradle installert

---

## Prosjektoversikt

Dette prosjektet er en **minimal Spring Boot-applikasjon** som fungerer både som:

* en **Spring Authorization Server** (utsteder JWT-tilgangstokener via `client_credentials`-flyten), og  
* en **Resource Server** (beskytter sitt eget `/hello`-endepunkt).

Den speiler oppsettet vist i [Spring blogginnlegg (2. april 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Rask start (lokalt)

```bash
# bygg og kjør
./mvnw spring-boot:run

# skaff en token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# kall den beskyttede endepunktet
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testing av OAuth2-konfigurasjonen

Du kan teste OAuth2-sikkerhetskonfigurasjonen med følgende trinn:

### 1. Bekreft at serveren kjører og er sikret

```bash
# Dette skal returnere 401 Unauthorized, som bekrefter at OAuth2-sikkerhet er aktiv
curl -v http://localhost:8081/
```

### 2. Hent et tilgangstoken ved bruk av klient-legitimasjon

```bash
# Hent og pakk ut hele token-responsen
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Eller for å bare pakke ut tokenet (krever jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Merk: Basic Authentication-headeren (`bWNwLWNsaWVudDpzZWNyZXQ=`) er Base64-kodingen av `mcp-client:secret`.

### 3. Få tilgang til det beskyttede endepunktet ved å bruke tokenet

```bash
# Bruker den lagrede token
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Eller direkte med tokenverdien
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Et vellykket svar med "Hello from MCP OAuth2 Demo!" bekrefter at OAuth2-konfigurasjonen fungerer korrekt.

---

## Container build

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Distribuer til **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingress FQDN blir din **issuer** (`https://<fqdn>`).  
Azure leverer automatisk et betrodd TLS-sertifikat for `*.azurecontainerapps.io`.

---

## Koble til **Azure API Management**

Legg til denne innkommende policyen til API-en din:

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

APIM vil hente JWKS og validere hver forespørsel.

---

## Hva blir det neste

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiserte oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket bør betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->