# MCP OAuth2 Demo

## Увод

OAuth2 је индустријски стандард протокол за ауторизацију, који омогућава безбедан приступ ресурсима без дељења акредитива. У имплементацијама MCP (Model Context Protocol), OAuth2 пружа робустан начин за аутентификацију и ауторизацију клијената (као што су AI агенти) за приступ MCP серверима и њиховим алатима.

Ова лекција показује како се имплементира OAuth2 аутентификација за MCP сервере користећи Spring Boot, уобичајени образац за предузетничка и продукциона окружења.

## Циљеви учења

До краја ове лекције, моћи ћете:
- Разумети како се OAuth2 интегрише са MCP серверима
- Имплементирати Spring Authorization Server за издавање токена
- Заштитити MCP крајње тачке JWT базираном аутентификацијом
- Конфигурисати client credentials flow за комуникацију машина са машинама

## Предуслови

- Основно разумевање Јаве и Spring Boot-а
- Познавање MCP концепата из ранијих модула
- Инсталиран Maven или Gradle

---

## Преглед пројекта

Овај пројекат је **минимална Spring Boot апликација** која делује као:

* **Spring Authorization Server** (који издаје JWT приступне токене преко `client_credentials` флоуа), и  
* **Resource Server** (који штити свој `/hello` крајњу тачку).

Он огледа подешавање приказано у [Spring блог посту (2. април 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Брз почетак (локално)

```bash
# компајлирај и покрени
./mvnw spring-boot:run

# доби токен
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# позови заштићени крајњи точак
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Тестирање OAuth2 конфигурације

Можете тестирати безбедносну OAuth2 конфигурацију следећим корацима:

### 1. Проверите да сервер ради и да је заштићен

```bash
# Ово треба да врати 401 Unauthorized, што потврђује да је OAuth2 безбедност активна
curl -v http://localhost:8081/
```

### 2. Преузмите приступни токен коришћењем client credentials

```bash
# Преузмите и издвојите цео одговор са токеном
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Или да издвојите само токен (потребан је jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Напомена: Basic Authentication заглавље (`bWNwLWNsaWVudDpzZWNyZXQ=`) је Base64 кодирање од `mcp-client:secret`.

### 3. Приступите заштићеној крајњој тачки користећи токен

```bash
# Коришћење сачуваног токена
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Или директно са вредношћу токена
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Успешан одговор са "Hello from MCP OAuth2 Demo!" потврђује да OAuth2 конфигурација исправно ради.

---

## Израда контејнера

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Деплој на **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Улазни FQDN постаје ваш **issuer** (`https://<fqdn>`).  
Azure аутоматски обезбеђује поверењиву TLS сертификату за `*.azurecontainerapps.io`.

---

## Укључивање у **Azure API Management**

Додајте ову inbound политику у свој API:

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

APIM ће преузети JWKS и валидирати сваки захтев.

---

## Шта следи

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:  
Овај документ је преведен помоћу услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако се трудимо да обезбедимо прецизност, молимо да имате у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитетним извором. За критичне информације препоручује се професионални људски превод. Не сносимо одговорност за било каква неспоразума или погрешне тумачења проистекла из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->