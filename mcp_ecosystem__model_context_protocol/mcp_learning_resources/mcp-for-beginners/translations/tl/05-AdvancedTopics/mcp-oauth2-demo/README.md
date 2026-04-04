# MCP OAuth2 Demo

## Panimula

Ang OAuth2 ay ang industry-standard na protocol para sa awtorisasyon, na nagpapahintulot ng seguradong access sa mga resources nang hindi kailangang ibahagi ang mga kredensyal. Sa mga implementasyon ng MCP (Model Context Protocol), nagbibigay ang OAuth2 ng matibay na paraan upang i-authenticate at awtorisahin ang mga kliyente (tulad ng mga AI agent) na makapasok sa mga MCP server at kanilang mga kasangkapan.

Ipinapakita sa leksyon na ito kung paano magpatupad ng OAuth2 authentication para sa mga MCP server gamit ang Spring Boot, isang karaniwang pattern para sa mga enterprise at production deployment.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng leksyon na ito, malalaman mo kung paano:
- Integrate ang OAuth2 sa mga MCP server
- Magpatupad ng Spring Authorization Server para sa pag-isyu ng token
- Protektahan ang mga endpoint ng MCP gamit ang JWT-based authentication
- I-configure ang client credentials flow para sa communication ng machine-to-machine

## Mga Kinakailangan

- Pangunahing kaalaman sa Java at Spring Boot
- Pamilyaridad sa mga konsepto ng MCP mula sa mga naunang module
- Naka-install na Maven o Gradle

---

## Pangkalahatang-ideya ng Proyekto

Ang proyektong ito ay isang **minimal na Spring Boot application** na gumaganap bilang:

* isang **Spring Authorization Server** (na nag-i-isyu ng JWT access tokens gamit ang `client_credentials` flow), at  
* isang **Resource Server** (na pinoprotektahan ang sarili nitong `/hello` endpoint).

Ito ay sumusunod sa setup na ipinakita sa [blog post ng Spring (2 Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Mabilisang pagsisimula (local)

```bash
# buuin at patakbuhin
./mvnw spring-boot:run

# kumuha ng token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# tawagan ang protektadong endpoint
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Pagsubok sa OAuth2 Configuration

Maaari mong subukan ang OAuth2 security configuration gamit ang mga sumusunod na hakbang:

### 1. Suriin kung ang server ay tumatakbo at ligtas

```bash
# Dapat itong magbalik ng 401 Hindi Awtorisado, na kinukumpirma na aktibo ang seguridad ng OAuth2
curl -v http://localhost:8081/
```

### 2. Kumuha ng access token gamit ang client credentials

```bash
# Kunin at kunin ang buong tugon ng token
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# O upang kunin lamang ang token (nangangailangan ng jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Tandaan: Ang Basic Authentication header (`bWNwLWNsaWVudDpzZWNyZXQ=`) ay ang Base64 encoding ng `mcp-client:secret`.

### 3. I-access ang protektadong endpoint gamit ang token

```bash
# Gamit ang na-save na token
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# O direkta gamit ang halaga ng token
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Ang matagumpay na tugon na may "Hello from MCP OAuth2 Demo!" ay nagpapatunay na tama ang pag-set up ng OAuth2 configuration.

---

## Paggawa ng container

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## I-deploy sa **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ang ingress FQDN ay magiging iyong **issuer** (`https://<fqdn>`).  
Nagbibigay ang Azure ng pinagkakatiwalaang TLS certificate nang awtomatiko para sa `*.azurecontainerapps.io`.

---

## Ikabit sa **Azure API Management**

Idagdag ang inbound policy na ito sa iyong API:

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

Kukuha ang APIM ng JWKS at ivavalidate ang bawat request.

---

## Ano ang susunod

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pahayag ng Hindi Pananagutan**:  
Ang dokumentong ito ay isinalin gamit ang AI na serbisyo sa pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat nagsusumikap kami para sa kawastuhan, mangyaring tandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o di-tumpak na bahagi. Ang orihinal na dokumento sa kanyang orihinal na wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot para sa anumang hindi pagkakaunawaan o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->