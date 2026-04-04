# MCP OAuth2 Demo

## Introductie

OAuth2 is het industrienormprotocol voor autorisatie, waarmee veilige toegang tot bronnen mogelijk is zonder inloggegevens te delen. In MCP (Model Context Protocol) implementaties biedt OAuth2 een robuuste manier om cliënten (zoals AI-agenten) te authenticeren en te autoriseren voor toegang tot MCP-servers en hun tools.

Deze les toont hoe je OAuth2-authenticatie implementeert voor MCP-servers met behulp van Spring Boot, een veelvoorkomend patroon voor zakelijke en productieomgevingen.

## Leerdoelen

Aan het einde van deze les zul je:  
- Begrijpen hoe OAuth2 integreert met MCP-servers  
- Een Spring Authorization Server implementeren voor het uitgeven van tokens  
- MCP-eindpunten beveiligen met JWT-gebaseerde authenticatie  
- De client credentials flow configureren voor machine-tot-machine communicatie  

## Vereisten

- Basiskennis van Java en Spring Boot  
- Vertrouwdheid met MCP-concepten uit eerdere modules  
- Maven of Gradle geïnstalleerd  

---

## Projectoverzicht

Dit project is een **minimale Spring Boot applicatie** die zowel fungeert als:  

* een **Spring Authorization Server** (die JWT-access tokens uitgeeft via de `client_credentials` flow), en  
* een **Resource Server** (die eigen `/hello` eindpunt beschermt).  

Het weerspiegelt de opzet zoals getoond in de [Spring blogpost (2 apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Snelle start (lokaal)

```bash
# bouwen & uitvoeren
./mvnw spring-boot:run

# verkrijg een token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# roep de beveiligde endpoint aan
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 Configuratie testen

Je kunt de OAuth2 beveiligingsconfiguratie testen met de volgende stappen:

### 1. Controleer of de server draait en beveiligd is

```bash
# Dit zou 401 Unauthorized moeten retourneren, wat bevestigt dat OAuth2-beveiliging actief is
curl -v http://localhost:8081/
```

### 2. Verkrijg een access token via client credentials

```bash
# Verkrijg en extraheer de volledige tokenresponse
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Of om alleen het token te extraheren (vereist jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Opmerking: de Basic Authentication header (`bWNwLWNsaWVudDpzZWNyZXQ=`) is de Base64-codering van `mcp-client:secret`.

### 3. Toegang tot het beveiligde eindpunt met het token

```bash
# Gebruikmakend van het opgeslagen token
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Of direct met de tokenwaarde
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Een succesvolle respons met "Hello from MCP OAuth2 Demo!" bevestigt dat de OAuth2-configuratie correct werkt.

---

## Container build

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Deployen naar **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

De ingress FQDN wordt je **issuer** (`https://<fqdn>`).  
Azure levert automatisch een vertrouwd TLS-certificaat voor `*.azurecontainerapps.io`.

---

## Koppelen aan **Azure API Management**

Voeg deze inbound policy toe aan je API:

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

APIM zal de JWKS ophalen en elke aanvraag valideren.

---

## Wat volgt hierna

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onjuistheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor cruciale informatie wordt een professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->