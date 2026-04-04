# MCP OAuth2 Demo

## Въведение

OAuth2 е индустриалният стандартен протокол за оторизация, който позволява сигурен достъп до ресурси без споделяне на идентификационни данни. В реализациите на MCP (Model Context Protocol) OAuth2 предоставя надежден начин за удостоверяване и упълномощаване на клиенти (като AI агенти) за достъп до MCP сървъри и техните инструменти.

Този урок демонстрира как да се имплементира OAuth2 удостоверяване за MCP сървъри с помощта на Spring Boot, често използван модел за корпоративни и продукционни внедрявания.

## Учебни цели

Към края на този урок ще можете:
- Да разбирате как OAuth2 се интегрира с MCP сървъри
- Да имплементирате Spring Authorization Server за издаване на токени
- Да защитите MCP крайни точки с удостоверяване въз основа на JWT
- Да конфигурирате клиентски удостоверителен поток за комуникация машина към машина

## Предварителни изисквания

- Основни познания по Java и Spring Boot
- Познаване на концепциите на MCP от предишни модули
- Инсталиран Maven или Gradle

---

## Преглед на проекта

Този проект е **минимално Spring Boot приложение**, което изпълнява ролята на:

* **Spring Authorization Server** (който издава JWT токени за достъп чрез `client_credentials` потока), и  
* **Resource Server** (който защитава собствената си крайна точка `/hello`).

Той отразява конфигурацията, показана в [Spring блог поста (2 април 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Бърз старт (локално)

```bash
# компилиране и изпълнение
./mvnw spring-boot:run

# получаване на маркер
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# извикване на защитения крайна точка
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Тестване на OAuth2 конфигурацията

Можете да тествате OAuth2 конфигурацията за сигурност със следните стъпки:

### 1. Проверете дали сървърът работи и е защитен

```bash
# Това трябва да върне 401 Unauthorized, потвърждавайки, че OAuth2 сигурността е активна
curl -v http://localhost:8081/
```

### 2. Вземете токен за достъп с помощта на клиентски удостоверения

```bash
# Вземете и извлечете пълния отговор с токена
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Или за извличане само на токена (изисква jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Забележка: Заглавката за Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) е Base64 кодиране на `mcp-client:secret`.

### 3. Достъпете защитената крайна точка с токена

```bash
# Използване на запазения токен
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Или директно с стойността на токена
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Успешен отговор с "Hello from MCP OAuth2 Demo!" потвърждава, че OAuth2 конфигурацията работи правилно.

---

## Създаване на контейнер

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Деплой в **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Входящият FQDN става вашият **issuer** (`https://<fqdn>`).  
Azure автоматично предоставя доверен TLS сертификат за `*.azurecontainerapps.io`.

---

## Свързване с **Azure API Management**

Добавете тази входяща политика към вашето API:

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

APIM ще изтегли JWKS и ще валидира всяка заявка.

---

## Какво следва

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:  
Този документ е преведен с помощта на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля, имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия език се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за никакви недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->