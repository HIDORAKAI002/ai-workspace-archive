# MCP OAuth2 Demo

## Úvod

OAuth2 je průmyslový standard pro autorizaci, který umožňuje bezpečný přístup k prostředkům bez sdílení přihlašovacích údajů. V implementacích MCP (Model Context Protocol) poskytuje OAuth2 spolehlivý způsob, jak autentizovat a autorizovat klienty (například AI agenty) pro přístup k MCP serverům a jejich nástrojům.

Tato lekce ukazuje, jak implementovat OAuth2 autentizaci pro MCP servery pomocí Spring Boot, což je běžný vzor pro podniková a produkční nasazení.

## Cíle učení

Na konci této lekce budete:
- Rozumět integraci OAuth2 s MCP servery
- Implementovat Spring Authorization Server pro vydávání tokenů
- Zabezpečit MCP endpointy pomocí autentizace založené na JWT
- Nakonfigurovat tok klientských přihlašovacích údajů pro komunikaci stroj-stroji

## Předpoklady

- Základní znalost jazyka Java a Spring Boot
- Seznámení s koncepty MCP z předchozích modulů
- Nainstalovaný Maven nebo Gradle

---

## Přehled projektu

Tento projekt je **minimální aplikace Spring Boot**, která slouží jako:

* **Spring Authorization Server** (vydává JWT přístupové tokeny přes `client_credentials` tok), a  
* **Resource Server** (chrání vlastní endpoint `/hello`).

Zrcadlí nastavení ukázané v [Spring blog postu (2. dubna 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Rychlý start (lokálně)

```bash
# sestavit a spustit
./mvnw spring-boot:run

# získat token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# zavolat chráněný endpoint
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testování konfigurace OAuth2

Konfiguraci OAuth2 bezpečnosti můžete otestovat následujícími kroky:

### 1. Ověřte, že server běží a je zabezpečený

```bash
# Toto by mělo vrátit 401 Unauthorized, což potvrzuje, že OAuth2 zabezpečení je aktivní
curl -v http://localhost:8081/
```

### 2. Získejte přístupový token pomocí klientských přihlašovacích údajů

```bash
# Získejte a rozbalte plnou odpověď tokenu
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Nebo extrahovat pouze token (vyžaduje jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Poznámka: Hlavička Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) je Base64 kódování řetězce `mcp-client:secret`.

### 3. Přistupte k chráněnému endpointu pomocí tokenu

```bash
# Použití uloženého tokenu
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Nebo přímo s hodnotou tokenu
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Úspěšná odpověď s textem "Hello from MCP OAuth2 Demo!" potvrzuje, že konfigurace OAuth2 funguje správně.

---

## Sestavení kontejneru

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Nasazení do **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

FQDN pro přístup (ingress) se stává vaším **issuerem** (`https://<fqdn>`).  
Azure automaticky poskytuje důvěryhodný TLS certifikát pro `*.azurecontainerapps.io`.

---

## Propojení s **Azure API Management**

Přidejte tuto příchozí politiku do vašeho API:

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

APIM načte JWKS a ověří každý požadavek.

---

## Co dál

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, berte prosím na vědomí, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro zásadní informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakákoliv nedorozumění nebo mylné interpretace vzniklé používáním tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->