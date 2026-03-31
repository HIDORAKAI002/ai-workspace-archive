# MCP OAuth2 Demo

## Uvod

OAuth2 je industrijski standardni protokol za autorizaciju, koji omogućuje siguran pristup resursima bez dijeljenja vjerodajnica. U MCP (Model Context Protocol) implementacijama, OAuth2 pruža snažan način za autentifikaciju i autorizaciju klijenata (kao što su AI agenti) za pristup MCP poslužiteljima i njihovim alatima.

Ova lekcija pokazuje kako implementirati OAuth2 autentifikaciju za MCP poslužitelje koristeći Spring Boot, uobičajeni obrazac za poduzeća i proizvodne implementacije.

## Ciljevi učenja

Do kraja ove lekcije ćete:
- Razumjeti kako se OAuth2 integrira s MCP poslužiteljima
- Implementirati Spring Authorization Server za izdavanje tokena
- Zaštititi MCP krajnje točke autentifikacijom zasnovanom na JWT-u
- Konfigurirati tok klijentskih vjerodajnica za komunikaciju između strojeva

## Preduvjeti

- Osnovno razumijevanje Jave i Spring Boota
- Poznavanje MCP koncepata iz ranijih modula
- Instalirani Maven ili Gradle

---

## Pregled projekta

Ovaj projekt je **minimalna Spring Boot aplikacija** koja djeluje kao:

* **Spring Authorization Server** (izdaje JWT pristupne tokene putem `client_credentials` toka), i  
* **Resource Server** (zaštitnik svoje vlastite `/hello` krajnje točke).

Oponaša postavke prikazane u [Spring blog postu (2. travnja 2025.)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Brzi početak (lokalno)

```bash
# izgradi i pokreni
./mvnw spring-boot:run

# pribavi token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# pozovi zaštićeni endpoint
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testiranje OAuth2 konfiguracije

OAuth2 sigurnosnu konfiguraciju možete testirati sljedećim koracima:

### 1. Provjerite je li poslužitelj pokrenut i zaštićen

```bash
# Ovo bi trebalo vratiti 401 Unauthorized, potvrđujući da je OAuth2 sigurnost aktivna
curl -v http://localhost:8081/
```

### 2. Nabavite pristupni token koristeći klijentske vjerodajnice

```bash
# Dohvati i izdvoji puni odgovor tokena
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Ili izdvoji samo token (zahtijeva jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Napomena: Basic Authentication zaglavlje (`bWNwLWNsaWVudDpzZWNyZXQ=`) je Base64 kodiranje za `mcp-client:secret`.

### 3. Pristupite zaštićenoj krajnjoj točki koristeći token

```bash
# Korištenje spremljenog tokena
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Ili izravno s vrijednošću tokena
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Uspješan odgovor s "Hello from MCP OAuth2 Demo!" potvrđuje da OAuth2 konfiguracija radi ispravno.

---

## Izgradnja spremnika

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Implementacija na **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ulazni FQDN postaje vaš **issuer** (`https://<fqdn>`).  
Azure automatski osigurava pouzdan TLS certifikat za `*.azurecontainerapps.io`.

---

## Povezivanje s **Azure API Management**

Dodajte ovu inbound politiku svojem API-ju:

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

APIM će dohvatiti JWKS i provjeravati svaki zahtjev.

---

## Što slijedi

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o odricanju odgovornosti**:
Ovaj dokument je preveden korištenjem AI prevoditeljske usluge [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakva nesporazuma ili pogrešna tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->