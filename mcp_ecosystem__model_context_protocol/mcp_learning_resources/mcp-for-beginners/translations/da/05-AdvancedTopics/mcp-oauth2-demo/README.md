# MCP OAuth2 Demo

## Introduktion

OAuth2 er industristandardprotokollen for autorisation, der muliggør sikker adgang til ressourcer uden at dele legitimationsoplysninger. I MCP (Model Context Protocol) implementeringer giver OAuth2 en robust måde at autentificere og autorisere klienter (såsom AI-agenter) til at få adgang til MCP-servere og deres værktøjer.

Denne lektion demonstrerer, hvordan man implementerer OAuth2-autentificering for MCP-servere ved hjælp af Spring Boot, et almindeligt mønster til enterprise- og produktionsudrulninger.

## Læringsmål

I slutningen af denne lektion vil du:
- Forstå, hvordan OAuth2 integreres med MCP-servere
- Implementere en Spring Authorization Server til udstedelse af tokens
- Beskytte MCP-endpoints med JWT-baseret autentificering
- Konfigurere client credentials flow til maskine-til-maskine kommunikation

## Forudsætninger

- Grundlæggende forståelse af Java og Spring Boot
- Fortrolighed med MCP-koncepter fra tidligere moduler
- Maven eller Gradle installeret

---

## Projektoversigt

Dette projekt er en **minimal Spring Boot-applikation**, der fungerer både som:

* en **Spring Authorization Server** (udsteder JWT adgangstokens via `client_credentials` flow), og  
* en **Resource Server** (beskytter sit eget `/hello` endpoint).

Den spejler opsætningen vist i [Spring blogindlægget (2. apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Hurtig start (lokalt)

```bash
# byg og kør
./mvnw spring-boot:run

# få en token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# kald det beskyttede endpoint
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Test af OAuth2-konfigurationen

Du kan teste OAuth2-sikkerhedskonfigurationen med følgende trin:

### 1. Bekræft at serveren kører og er sikret

```bash
# Dette skulle returnere 401 Unauthorized, hvilket bekræfter, at OAuth2-sikkerhed er aktiv
curl -v http://localhost:8081/
```

### 2. Hent et adgangstoken ved hjælp af client credentials

```bash
# Hent og udpak det komplette token-svar
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Eller for kun at udpakke token (kræver jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Bemærk: Basic Authentication headeren (`bWNwLWNsaWVudDpzZWNyZXQ=`) er Base64-kodningen af `mcp-client:secret`.

### 3. Få adgang til det beskyttede endpoint ved brug af tokenet

```bash
# Brug af den gemte token
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Eller direkte med tokenværdien
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Et succesfuldt svar med "Hello from MCP OAuth2 Demo!" bekræfter, at OAuth2-konfigurationen fungerer korrekt.

---

## Container build

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Udrul til **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingress FQDN bliver din **issuer** (`https://<fqdn>`).  
Azure leverer automatisk et betroet TLS-certifikat for `*.azurecontainerapps.io`.

---

## Integrer med **Azure API Management**

Tilføj denne inbound policy til din API:

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

APIM henter JWKS og validerer hver anmodning.

---

## Hvad er næste skridt

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiske oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets modersmål skal betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for eventuelle misforståelser eller fejltolkninger, der måtte opstå som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->