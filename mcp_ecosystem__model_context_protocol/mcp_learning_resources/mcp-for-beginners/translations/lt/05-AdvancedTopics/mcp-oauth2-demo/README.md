# MCP OAuth2 demonstracija

## Įvadas

OAuth2 yra pramonės standartas autorizacijai, leidžiantis saugiai prieiti prie išteklių nesidalinant prisijungimo duomenimis. MCP (Modelio konteksto protokolo) įgyvendinimuose OAuth2 suteikia patikimą būdą autentifikuoti ir autorizuoti klientus (pvz., DI agentus) pasiekti MCP serverius ir jų įrankius.

Ši pamoka demonstruoja, kaip įdiegti OAuth2 autentifikaciją MCP serveriams naudojant Spring Boot, įprastą modelį verslo ir produkcinėms aplinkoms.

## Mokymosi tikslai

Pamokos pabaigoje jūs:
- Suprasite, kaip OAuth2 integruojamas su MCP serveriais
- Įdiegsite Spring autorizacijos serverį žetonų išdavimui
- Apsaugosite MCP galinius taškus naudojant JWT autentifikaciją
- Sukonfigūruosite kliento kredencialų srautą mašinų tarpusavio komunikacijai

## Išankstinės sąlygos

- Pagrindinės Java ir Spring Boot žinios
- Susipažinimas su MCP koncepcijomis iš ankstesnių modulių
- Įdiegtas Maven arba Gradle

---

## Projekto apžvalga

Šis projektas yra **minimalus Spring Boot aplikacija**, kuri veikia tiek kaip:

* **Spring autorizacijos serveris** (išduoda JWT prieigos žetonus per `client_credentials` srautą), ir  
* **Išteklių serveris** (apsaugo savo `/hello` galinį tašką).

Tai atspindi nustatymą parodytą [Spring tinklaraščio įraše (2025-04-02)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Greitas paleidimas (vietinis)

```bash
# sukurti ir paleisti
./mvnw spring-boot:run

# gauti žetoną
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# iškviesti apsaugotą pabaigos tašką
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 konfigūracijos testavimas

Galite patikrinti OAuth2 saugos konfigūraciją atlikdami šiuos veiksmus:

### 1. Patikrinkite, ar serveris veikia ir yra apsaugotas

```bash
# Tai turėtų grąžinti 401 Unauthorized, patvirtinant, kad OAuth2 saugumas yra aktyvus
curl -v http://localhost:8081/
```

### 2. Gaukite prieigos žetoną naudodami kliento kredencialus

```bash
# Gaukite ir išskleiskite visą žetono atsakymą
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Arba išskleisti tik žetoną (reikalauja jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Pastaba: Basic Authentication antraštė (`bWNwLWNsaWVudDpzZWNyZXQ=`) yra Base64 kodavimas `mcp-client:secret`.

### 3. Prieikite prie apsaugoto galinio taško naudodami žetoną

```bash
# Naudojant išsaugotą žetoną
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Arba tiesiogiai su žetono reikšme
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Sėkmingas atsakymas su „Hello from MCP OAuth2 Demo!“ patvirtina, kad OAuth2 konfigūracija veikia teisingai.

---

## Konteinerio kūrimas

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Diegimas į **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Įėjimo FQDN tampa jūsų **išdavėju** (`https://<fqdn>`).  
Azure automatiškai suteikia patikimą TLS sertifikatą `*.azurecontainerapps.io`.

---

## Integracija su **Azure API valdymu**

Pridėkite šią įeinančios politikos taisyklę prie savo API:

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

APIM atsisiųs JWKS ir patikrins kiekvieną užklausą.

---

## Kas toliau

- [5.4 Šakninių kontekstų apžvalga](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:  
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatizuoti vertimai gali turėti klaidų arba netikslumų. Pirminis dokumentas gimtąja kalba turėtų būti laikomas pagrindiniu šaltiniu. Svarbiai informacijai rekomenduojama pasitelkti profesionalų žmogišką vertimą. Mes neatsakome už bet kokius nesusipratimus ar neteisingą interpretaciją, kilusią dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->