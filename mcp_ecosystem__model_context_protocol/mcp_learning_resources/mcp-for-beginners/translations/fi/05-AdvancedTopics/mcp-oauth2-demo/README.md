# MCP OAuth2 Demo

## Johdanto

OAuth2 on alan standardiprotokolla valtuutukseen, joka mahdollistaa turvallisen pääsyn resursseihin ilman tunnistetietojen jakamista. MCP (Model Context Protocol) -toteutuksissa OAuth2 tarjoaa vankan tavan todentaa ja valtuuttaa asiakkaat (kuten tekoälyagentit) pääsemään MCP-palvelimille ja niiden työkaluihin.

Tämä opetus näyttää, kuinka toteuttaa OAuth2-todennus MCP-palvelimille käyttäen Spring Bootia, joka on yleinen malli yritys- ja tuotantoympäristöissä.

## Oppimistavoitteet

Tämän oppitunnin lopussa osaat:
- Ymmärtää, miten OAuth2 integroituu MCP-palvelimiin
- Toteuttaa Spring Authorization Serverin tokenien myöntämistä varten
- Suojata MCP-päätepisteet JWT-pohjaisella todennuksella
- Määrittää client credentials -vuon koneiden väliseen viestintään

## Esivaatimukset

- Perustietämys Javasta ja Spring Bootista
- Tutustuminen MCP-käsitteisiin aiemmista moduuleista
- Maven tai Gradle asennettuna

---

## Projektin yleiskuvaus

Tämä projekti on **minimaalinen Spring Boot -sovellus**, joka toimii sekä:

* **Spring Authorization Serverina** (joka myöntää JWT-pääsytokeneita `client_credentials`-vuon kautta), että  
* **Resource Serverina** (joka suojaa oman `/hello`-päätepisteensä).

Se peilaa asetusta, joka on esitetty [Spring-blogikirjoituksessa (2.4.2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Nopeasti käyntiin (paikallisesti)

```bash
# käännä ja suorita
./mvnw spring-boot:run

# hanki tunnus
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# kutsu suojattua päätepistettä
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2-konfiguraation testaus

Voit testata OAuth2-tietoturvakonfiguraatiota seuraavin vaiheisin:

### 1. Varmista palvelimen käynnissäolo ja suojaus

```bash
# Tämän pitäisi palauttaa 401 Unauthorized, vahvistaen että OAuth2-suojaus on aktiivinen
curl -v http://localhost:8081/
```

### 2. Hanki pääsytoken client credentials -menetelmällä

```bash
# Hae ja pura täydellinen tunnistusmerkin vastaus
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Tai pura pelkkä tunnistusmerkki (vaatii jq:n)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Huomautus: Basic-todennusotsikko (`bWNwLWNsaWVudDpzZWNyZXQ=`) on Base64-koodaus merkkijonosta `mcp-client:secret`.

### 3. Käytä suojattua päätepistettä tokenilla

```bash
# Tallennetun tunnisteen käyttäminen
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Tai suoraan tunnistearvolla
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Onnistunut vastaus "Hello from MCP OAuth2 Demo!" vahvistaa, että OAuth2-konfiguraatio toimii oikein.

---

## Kontin rakentaminen

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Julkaisu **Azure Container Apps** -ympäristöön

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Sisäänpääsyn FQDN toimii sinun **issuerinä** (`https://<fqdn>`).  
Azure tarjoaa automaattisesti luotettavan TLS-varmenteen `*.azurecontainerapps.io`-domainille.

---

## Yhdistäminen **Azure API Management**iin

Lisää tämä inbound-politiikka API:llesi:

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

APIM hakee JWKS:n ja validoi jokaisen pyynnön.

---

## Mitä seuraavaksi

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta ota huomioon, että automaattikäännöksissä voi esiintyä virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäisellä kielellä tulisi pitää auktoritatiivisena lähteenä. Tärkeissä tiedoissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinkäsityksistä tai virhetulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->