# MCP OAuth2 Demo

## Úvod

OAuth2 je priemyselný štandardný protokol pre autorizáciu, ktorý umožňuje bezpečný prístup k zdrojom bez zdieľania prihlasovacích údajov. V implementáciách MCP (Model Context Protocol) poskytuje OAuth2 robustný spôsob, ako autentifikovať a autorizovať klientov (napríklad AI agentov) na prístup k MCP serverom a ich nástrojom.

Tento návod demonštruje, ako implementovať OAuth2 autentifikáciu pre MCP servery pomocou Spring Boot, bežného vzoru pre podnikové a produkčné nasadenia.

## Ciele učenia

Na konci tohto lekcie budete:
- Rozumieť, ako sa OAuth2 integruje s MCP servermi
- Implementovať Spring Authorization Server pre vydávanie tokenov
- Chrániť MCP endpointy pomocou autentifikácie založenej na JWT
- Konfigurovať tok klientskych poverení pre komunikáciu stroj-stroj

## Predpoklady

- Základné znalosti Java a Spring Boot
- Znalosť konceptov MCP z predchádzajúcich modulov
- Nainštalovaný Maven alebo Gradle

---

## Prehľad projektu

Tento projekt je **minimálna aplikácia Spring Boot**, ktorá funguje ako:

* **Spring Authorization Server** (vydáva JWT prístupové tokeny pomocou toku `client_credentials`), a  
* **Resource Server** (chráni svoj vlastný endpoint `/hello`).

Zrkadlí nastavenie zobrazené v [blogovom príspevku Spring (2. apríl 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Rýchly štart (lokálne)

```bash
# zostaviť a spustiť
./mvnw spring-boot:run

# získať token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# zavolať chránený koncový bod
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testovanie konfigurácie OAuth2

Nasledujúcimi krokmi môžete otestovať bezpečnostnú konfiguráciu OAuth2:

### 1. Overte, že server beží a je zabezpečený

```bash
# Toto by malo vrátiť 401 Unauthorized, čo potvrdzuje, že je aktívna OAuth2 bezpečnosť
curl -v http://localhost:8081/
```

### 2. Získajte prístupový token pomocou klientskych poverení

```bash
# Získať a rozbaliť celú odpoveď tokenu
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Alebo extrahovať iba token (vyžaduje jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Poznámka: Záhlavie Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) je Base64 kódovanie `mcp-client:secret`.

### 3. Pristúpte k chránenému endpointu pomocou tokenu

```bash
# Použitie uloženého tokenu
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Alebo priamo s hodnotou tokenu
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Úspešná odpoveď s textom "Hello from MCP OAuth2 Demo!" potvrdzuje, že konfigurácia OAuth2 funguje správne.

---

## Vytvorenie kontajnera

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Nasadenie na **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingress FQDN sa stáva vaším **issuerom** (`https://<fqdn>`).  
Azure automaticky poskytuje dôveryhodný TLS certifikát pre `*.azurecontainerapps.io`.

---

## Integrácia so **Azure API Management**

Pridajte túto inbound politiku do svojho API:

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

APIM bude načítavať JWKS a overovať každý požiadavok.

---

## Čo bude ďalej

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa usilujeme o presnosť, prosím berte na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho rodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne výklady vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->