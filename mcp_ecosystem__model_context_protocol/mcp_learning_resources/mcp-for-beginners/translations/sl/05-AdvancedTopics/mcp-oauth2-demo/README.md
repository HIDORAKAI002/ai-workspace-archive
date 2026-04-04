# MCP OAuth2 Demo

## Uvod

OAuth2 je industrijski standardni protokol za avtorizacijo, ki omogoča varen dostop do virov brez deljenja poverilnic. V izvedbah MCP (Model Context Protocol) OAuth2 zagotavlja močan način za preverjanje pristnosti in avtorizacijo odjemalcev (kot so AI agenti) za dostop do MCP strežnikov in njihovih orodij.

Ta lekcija prikazuje, kako implementirati OAuth2 preverjanje pristnosti za MCP strežnike z uporabo Spring Boot, kar je pogost vzorec za podjetniške in produkcijske implementacije.

## Cilji učenja

Na koncu te lekcije boste:
- Razumeli, kako se OAuth2 integrira z MCP strežniki
- Implementirali Spring avtorizacijski strežnik za izdajo žetonov
- Zaščitili MCP končne točke z JWT osnovano preverjanje pristnosti
- Konfigurirali pretok poverilnic odjemalca za komunikacijo stroj-stroj

## Pogoji

- Osnovno razumevanje Jave in Spring Boot
- Poznavanje MCP konceptov iz prejšnjih modulov
- Namestitev Mavena ali Gradla

---

## Pregled projekta

Ta projekt je **minimalna Spring Boot aplikacija**, ki deluje kot:

* **Spring avtorizacijski strežnik** (izdaja JWT dostopne žetone preko `client_credentials` pretoka), in  
* **Strežnik virov** (varuje svojo `/hello` končno točko).

Sledi postavitvi prikazani v [Spring blog objavi (2. april 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Hiter začetek (lokalno)

```bash
# sestavi in zaženi
./mvnw spring-boot:run

# pridobi žeton
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# pokliči zaščiteno končno točko
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testiranje OAuth2 konfiguracije

OAuth2 varnostno konfiguracijo lahko preizkusite z naslednjimi koraki:

### 1. Preverite, da strežnik deluje in je zaščiten

```bash
# To bi moralo vrniti 401 Unauthorized, kar potrjuje, da je varnost OAuth2 aktivna
curl -v http://localhost:8081/
```

### 2. Pridobite dostopni žeton z uporabo poverilnic odjemalca

```bash
# Pridobite in izvlecite celoten odziv žetona
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Ali pa izvlecite samo žeton (zahteva jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Opomba: Glava Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) je Base64 kodiranje `mcp-client:secret`.

### 3. Dostopajte do zaščitene končne točke z žetonom

```bash
# Uporaba shranjenega žetona
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Ali neposredno z vrednostjo žetona
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Uspešen odziv z "Hello from MCP OAuth2 Demo!" potrjuje, da OAuth2 konfiguracija deluje pravilno.

---

## Gradnja kontejnerja

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Namestitev v **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Vhodni FQDN postane vaš **izdajatelj** (`https://<fqdn>`).  
Azure samodejno nudi zaupanja vredno TLS potrdilo za `*.azurecontainerapps.io`.

---

## Integracija z **Azure API Management**

Dodajte to vhodno pravilo svojemu API-ju:

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

APIM bo prenesel JWKS in preveril vsak zahtevek.

---

## Kaj sledi

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo storitve za avtomatski prevod AI [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, prosimo, upoštevajte, da lahko avtomatski prevodi vsebujejo napake ali netočnosti. Izvirni dokument v izvirnem jeziku velja za avtoritativni vir. Za pomembne informacije priporočamo strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->