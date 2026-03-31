# MCP OAuth2 Bemutató

## Bevezetés

Az OAuth2 az iparági szabványos protokoll az autorizációhoz, amely lehetővé teszi az erőforrások biztonságos elérését anélkül, hogy megosztanánk a hitelesítő adatokat. Az MCP (Model Context Protocol) megvalósításokban az OAuth2 robosztus módot kínál az ügyfelek (például AI ügynökök) hitelesítésére és engedélyezésére az MCP szerverek és azok eszközei eléréséhez.

Ez a lecke bemutatja, hogyan valósítható meg az OAuth2 hitelesítés MCP szerverekhez a Spring Boot használatával, amely általános mintázat vállalati és éles környezetek bevezetéséhez.

## Tanulási célok

A lecke végére Ön:
- Megérti, hogyan integrálódik az OAuth2 az MCP szerverekkel
- Megvalósít egy Spring Authorization Servert token kiadására
- JWT alapú hitelesítéssel védi az MCP végpontokat
- Beállítja az ügyfél hitelesítési folyamatot gép-gép közötti kommunikációra

## Előfeltételek

- Alapvető Java és Spring Boot ismeretek
- Az MCP fogalmak ismerete korábbi modulokból
- Maven vagy Gradle telepítve

---

## Projekt áttekintés

Ez a projekt egy **minimális Spring Boot alkalmazás**, amely egyszerre:

* egy **Spring Authorization Server** (JWT hozzáférési tokeneket bocsát ki a `client_credentials` folyamathoz), és  
* egy **Resource Server** (védi a saját `/hello` végpontját).

Megfelel a [Spring blogbejegyzésben (2025. április 2.)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) bemutatott beállításnak.

---

## Gyors indítás (helyi)

```bash
# fordítás és futtatás
./mvnw spring-boot:run

# token beszerzése
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# a védett végpont hívása
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Az OAuth2 konfiguráció tesztelése

Az OAuth2 biztonsági konfiguráció teszteléséhez a következő lépéseket végezheti el:

### 1. Ellenőrizze, hogy a szerver fut és védett-e

```bash
# Ennek 401 Unauthorized választ kell adnia, megerősítve, hogy az OAuth2 biztonság aktív
curl -v http://localhost:8081/
```

### 2. Szerezzen hozzáférési tokent ügyfél-hitelesítés segítségével

```bash
# A teljes token válasz lekérése és kicsomagolása
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Vagy csak a token kinyerése (jq szükséges)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Megjegyzés: A Basic Authentication fejléc (`bWNwLWNsaWVudDpzZWNyZXQ=`) a `mcp-client:secret` Base64 kódolása.

### 3. Használja a tokent a védett végpont eléréséhez

```bash
# A mentett token használata
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Vagy közvetlenül a token értékével
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

A "Hello from MCP OAuth2 Demo!" üzenettel történő sikeres válasz megerősíti, hogy az OAuth2 konfiguráció helyesen működik.

---

## Konténer építése

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Telepítés **Azure Container Apps**-re

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

A bejövő FQDN lesz az Ön **issuer-e** (`https://<fqdn>`).  
Az Azure automatikusan megbízható TLS tanúsítványt biztosít a `*.azurecontainerapps.io`-hoz.

---

## Összekapcsolás az **Azure API Management**-gel

Adja hozzá ezt a bejövő szabályt az API-hoz:

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

Az APIM letölti a JWKS-t, és érvényesíti minden kérést.

---

## Mi következik

- [5.4 Root context-ek](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősségkizárás**:  
Ezt a dokumentumot az AI fordítószolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével fordítottuk le. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén javasolt professzionális, emberi fordítást igénybe venni. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->