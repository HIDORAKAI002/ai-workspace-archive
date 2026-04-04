# MCP OAuth2 Demo

## Вступ

OAuth2 — це стандартний у галузі протокол авторизації, який забезпечує безпечний доступ до ресурсів без необхідності ділитися обліковими даними. У реалізаціях MCP (Model Context Protocol) OAuth2 надає надійний спосіб автентифікації та авторизації клієнтів (таких як AI агенти) для доступу до MCP серверів та їх інструментів.

Цей урок демонструє, як реалізувати автентифікацію OAuth2 для MCP серверів за допомогою Spring Boot, що є звичайною схемою для корпоративних та виробничих розгортань.

## Навчальні цілі

Після цього уроку ви зможете:
- Розуміти, як OAuth2 інтегрується з MCP серверами
- Реалізувати Spring Authorization Server для видачі токенів
- Захищати MCP кінцеві точки автентифікацією на основі JWT
- Налаштовувати потік client credentials для машино-машинної взаємодії

## Попередні умови

- Базове розуміння Java та Spring Boot
- Знайомство з концепціями MCP з попередніх модулів
- Встановлені Maven або Gradle

---

## Огляд проекту

Цей проект — **мінімальний додаток Spring Boot**, який працює як одночасно:

* **Spring Authorization Server** (видає JWT токени доступу через потік `client_credentials`), та  
* **Resource Server** (захищає власну кінцеву точку `/hello`).

Він відтворює налаштування, показані в [публікації блогу Spring (2 квітня 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Швидкий старт (локально)

```bash
# зібрати та запустити
./mvnw spring-boot:run

# отримати токен
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# виклик захищеного кінцевого пункту
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Тестування конфігурації OAuth2

Ви можете протестувати налаштування безпеки OAuth2 наступними кроками:

### 1. Переконайтеся, що сервер працює та захищений

```bash
# Це має повернути 401 Unauthorized, підтверджуючи, що безпека OAuth2 активована
curl -v http://localhost:8081/
```

### 2. Отримайте токен доступу, використовуючи client credentials

```bash
# Отримати та витягти повну відповідь токена
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Або витягти тільки токен (потребує jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Примітка: Заголовок Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) є Base64 кодуванням `mcp-client:secret`.

### 3. Отримайте доступ до захищеної кінцевої точки, використовуючи токен

```bash
# Використання збереженого токена
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Або безпосередньо зі значенням токена
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Успішна відповідь з повідомленням "Hello from MCP OAuth2 Demo!" підтверджує, що конфігурація OAuth2 працює правильно.

---

## Збірка контейнера

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Розгортання в **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ім'я повного домену входу (FQDN) стає вашим **видавцем** (`https://<fqdn>`).  
Azure автоматично надає довірений TLS сертифікат для `*.azurecontainerapps.io`.

---

## Інтеграція з **Azure API Management**

Додайте цю політику вхідних повідомлень до вашого API:

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

APIM завантажить JWKS і перевірятиме кожен запит.

---

## Що далі

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:  
Цей документ було перекладено за допомогою сервісу автоматичного перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми докладаємо зусиль для забезпечення точності, будь ласка, враховуйте, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується звертатися до професійного людського перекладу. Ми не несемо відповідальності за будь-які непорозуміння чи неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->