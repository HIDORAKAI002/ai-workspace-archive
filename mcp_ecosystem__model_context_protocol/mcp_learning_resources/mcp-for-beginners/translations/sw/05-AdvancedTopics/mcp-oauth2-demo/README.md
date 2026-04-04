# MCP OAuth2 Demo

## Utangulizi

OAuth2 ni itifaki ya viwango vya sekta kwa uidhinishaji, ikiruhusu upatikanaji salama wa rasilimali bila kushiriki nywila. Katika utekelezaji wa MCP (Model Context Protocol), OAuth2 hutoa njia thabiti ya kuthibitisha na kuidhinisha wateja (kama maajenti wa AI) kupata seva za MCP na zana zao.

Somo hili linaonyesha jinsi ya kutekeleza uthibitishaji wa OAuth2 kwa seva za MCP kwa kutumia Spring Boot, mtindo wa kawaida kwa usambazaji wa biashara na uzalishaji.

## Malengo ya Kujifunza

Mwisho wa somo hili, utakuwa umeweza:
- Kuelewa jinsi OAuth2 inavyounganishwa na seva za MCP
- Kutekeleza Spring Authorization Server kwa utoaji wa tokeni
- Kulinda vituo vya MCP kwa uthibitishaji unaotegemea JWT
- Kusanidi mtiririko wa leseni za mteja kwa mawasiliano ya mashine kwa mashine

## Masharti ya Awali

- Uelewa wa msingi wa Java na Spring Boot
- Uzoefu na dhana za MCP kutoka moduli za awali
- Kuwa na Maven au Gradle imewekwa

---

## Muhtasari wa Mradi

Mradi huu ni **programu ndogo ya Spring Boot** inayofanya kazi kama:

* **Spring Authorization Server** (inayotolea tokeni za JWT kupitia mtiririko wa `client_credentials`), na  
* **Resource Server** (inalinda kituo chake cha `/hello`).

Inalinganisha usanidi uliowasilishwa kwenye [chapisho la blogi la Spring (2 Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Anza Haraka (ndani ya eneo)

```bash
# jenga na kuendesha
./mvnw spring-boot:run

# pata tokeni
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# piga simu kwa endpoint inayolindwa
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Kupima Usanidi wa OAuth2

Unaweza kupima usanidi wa usalama wa OAuth2 kwa hatua zifuatazo:

### 1. Thibitisha kuwa seva inafanya kazi na ni salama

```bash
# Hii inapaswa kurudisha 401 Hauruhusiwi, ikithibitisha usalama wa OAuth2 unaendeshwa
curl -v http://localhost:8081/
```

### 2. Pata tokeni ya upatikanaji kwa kutumia leseni za mteja

```bash
# Pata na toa jibu kamili la tokeni
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Au kutoa tokeni tu (inahitaji jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Kumbuka: Kichwa cha Uthibitishaji wa Msingi (`bWNwLWNsaWVudDpzZWNyZXQ=`) ni msimbo wa Base64 wa `mcp-client:secret`.

### 3. Pata kituo kilicholindwa kwa kutumia tokeni

```bash
# Kutumia tokeni iliyohifadhiwa
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Au moja kwa moja na thamani ya tokeni
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Jibu lenye mafanikio na "Hello from MCP OAuth2 Demo!" linathibitisha kuwa usanidi wa OAuth2 unafanya kazi ipasavyo.

---

## Ujenzi wa Kontena

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Sambaza kwa **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

FQDN ya kuingia inakuwa **mtoaji wako** (`https://<fqdn>`).  
Azure hutoa aliyethibitishwa cheti cha TLS moja kwa moja kwa `*.azurecontainerapps.io`.

---

## Unganisha kwenye **Azure API Management**

Ongeza sera hii ya kuingiza kwenye API yako:

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

APIM itapakua JWKS na kuthibitisha kila ombi.

---

## Kile kinachofuata

- [5.4 Mashamba msingi (Root contexts)](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kumbusha**:
Nyaraka hii imefasiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Wakati tunajitahidi kwa usahihi, tafadhali fahamu kuwa tafsiri zilizofanywa kwa mashine zinaweza kuwa na makosa au upotoshaji. Nyaraka ya asili kwa lugha yake ya asili inapaswa kuchukuliwa kama chanzo halali. Kwa taarifa muhimu, tafsiri ya kibinadamu ya kitaalamu inapendekezwa. Hatubeba jukumu lolote kwa kutoelewana au tafsiri potofu zinazotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->