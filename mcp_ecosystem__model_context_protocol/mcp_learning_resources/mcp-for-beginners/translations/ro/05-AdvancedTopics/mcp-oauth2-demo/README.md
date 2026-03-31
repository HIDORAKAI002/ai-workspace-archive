# MCP OAuth2 Demo

## Introducere

OAuth2 este protocolul standard din industrie pentru autorizare, permițând accesul securizat la resurse fără a partaja acreditările. În implementările MCP (Model Context Protocol), OAuth2 oferă o modalitate robustă de a autentifica și autoriza clienții (cum ar fi agenții AI) să acceseze serverele MCP și uneltele acestora.

Această lecție demonstrează cum să implementezi autentificarea OAuth2 pentru serverele MCP folosind Spring Boot, un tipar comun pentru implementările enterprise și de producție.

## Obiective de învățare

La finalul acestei lecții, vei:
- Înțelege cum se integrează OAuth2 cu serverele MCP
- Implementa un Server de Autorizare Spring pentru emiterea de tokenuri
- Proteja endpoint-urile MCP cu autentificare bazată pe JWT
- Configura fluxul client_credentials pentru comunicare machine-to-machine

## Cerințe prealabile

- Cunoștințe de bază despre Java și Spring Boot
- Familiaritate cu conceptele MCP din modulele anterioare
- Maven sau Gradle instalat

---

## Prezentare generală a proiectului

Acest proiect este o **aplicație minimală Spring Boot** care acționează ca:

* un **Server de Autorizare Spring** (emitând tokenuri JWT de acces prin fluxul `client_credentials`), și  
* un **Server de Resurse** (protejând propriul endpoint `/hello`).

Reprezintă o oglindă a setărilor prezentate în [articolul de blog Spring (2 apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Start rapid (local)

```bash
# construiește și rulează
./mvnw spring-boot:run

# obține un token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# apelează endpoint-ul protejat
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testarea configurației OAuth2

Poți testa configurația de securitate OAuth2 urmând pașii:

### 1. Verifică dacă serverul rulează și este securizat

```bash
# Acesta ar trebui să returneze 401 Unauthorized, confirmând că securitatea OAuth2 este activă
curl -v http://localhost:8081/
```

### 2. Obține un token de acces folosind acreditările clientului

```bash
# Obțineți și extrageți răspunsul complet al tokenului
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Sau pentru a extrage doar tokenul (necesită jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Notă: Antetul Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) este codificarea Base64 a `mcp-client:secret`.

### 3. Accesează endpoint-ul protejat folosind tokenul

```bash
# Folosind tokenul salvat
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Sau direct cu valoarea tokenului
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Un răspuns cu succes și mesajul "Hello from MCP OAuth2 Demo!" confirmă că configurația OAuth2 funcționează corect.

---

## Construirea containerului

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Deploy pe **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

FQDN-ul ingress devine **issuer-ul** tău (`https://<fqdn>`).  
Azure oferă automat un certificat TLS de încredere pentru domeniul `*.azurecontainerapps.io`.

---

## Integrare cu **Azure API Management**

Adaugă această politică inbound în API-ul tău:

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

APIM va prelua JWKS-ul și va valida fiecare cerere.

---

## Ce urmează

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să aveți în vedere că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autoritară. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->