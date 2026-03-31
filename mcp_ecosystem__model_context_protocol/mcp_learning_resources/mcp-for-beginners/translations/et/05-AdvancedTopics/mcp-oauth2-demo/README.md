# MCP OAuth2 Demo

## Sissejuhatus

OAuth2 on tööstusharu standardprotokoll autoriseerimiseks, võimaldades turvalist ligipääsu ressurssidele ilma mandaate jagamata. MCP (Model Context Protocol) rakendustes pakub OAuth2 tugeva viisi klientide (näiteks tehisintellekti agentide) autentimiseks ja autoriseerimiseks MCP serverite ja nende tööriistade juurde pääsemiseks.

See õppetund demonstreerib, kuidas rakendada OAuth2 autentimist MCP serverite jaoks, kasutades Spring Booti, mis on tavaline muster ettevõtete ja tootmiskeskkondade juurutamiseks.

## Õpieesmärgid

Selle õppetunni lõpuks:
- Mõistate, kuidas OAuth2 integreerub MCP serveritega
- Rakendate Spring Authorization Serveri tokeni väljastamiseks
- Kaitsete MCP lõpp-punkte JWT-põhise autentimisega
- Konfigureerite kliendi mandaadivoogu masinatevaheliseks suhtluseks

## Eeltingimused

- Põhilised teadmised Java ja Spring Booti kohta
- Tutvumine MCP kontseptsioonidega eelmistest moodulitest
- Installitud Maven või Gradle

---

## Projekti ülevaade

See projekt on **minimaalne Spring Boot rakendus**, mis toimib nii:

* **Spring Authorization Serverina** (väljastades JWT ligipääsutokenid `client_credentials` voo kaudu), kui ka  
* **Ressurserverina** (kaitstes oma `/hello` lõpp-punkti).

See peegeldab seadistust, mis on näidatud [Spring blogipostituses (2. aprill 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Kiire algus (kohalik)

```bash
# ehita ja käivita
./mvnw spring-boot:run

# saada token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# kutsu kaitstud lõpp-punkti
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 konfiguratsiooni testimine

OAuth2 turbekonfiguratsiooni saate testida järgmistel sammudel:

### 1. Kontrollige, et server töötab ja on kaitstud

```bash
# See peaks tagastama 401 Unauthorized, kinnitades, et OAuth2 turvalisus on aktiivne
curl -v http://localhost:8081/
```

### 2. Hankige ligipääsutoken kliendi mandaadiga

```bash
# Hangi ja eralda täielik tokeni vastus
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Või eralda ainult token (nõuab jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Märkus: Basic Authentication päis (`bWNwLWNsaWVudDpzZWNyZXQ=`) on `mcp-client:secret` Base64 kodeering.

### 3. Pääsege kaitstud lõpp-punktile ligi tokeni abil

```bash
# Salvestatud tokeni kasutamine
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Või otse tokeni väärtusega
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Õnnestunud vastus tekstiga "Hello from MCP OAuth2 Demo!" kinnitab, et OAuth2 konfiguratsioon töötab korrektselt.

---

## Kasti ehitamine

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Paigaldamine **Azure Container Apps** keskkonda

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingressi täielik domeeninimi saab teie **väljastajaks** (`https://<fqdn>`).  
Azure pakub automaatselt usaldusväärset TLS-sertifikaati aadressile `*.azurecontainerapps.io`.

---

## Sidumine **Azure API Managementiga**

Lisage see sissetulev reegel oma API-le:

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

APIM hangib JWKS ja valideerib iga päringu.

---

## Mis järgmine

- [5.4 Juurekontekstide rühm](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud tehisintellekti tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi me püüame tagada täpsust, palun pidage meeles, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument oma emakeeles tuleks pidada autoriteetseks allikaks. Kriitilise tähtsusega teabe jaoks on soovitatav kasutada professionaalse inimese tõlget. Me ei vastuta selle tõlke kasutamisest tingitud arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->