# Демонстрация MCP OAuth2

## Введение

OAuth2 — это индустриальный стандарт протокола авторизации, обеспечивающий безопасный доступ к ресурсам без необходимости передачи учетных данных. В реализациях MCP (Model Context Protocol) OAuth2 предоставляет надежный способ аутентификации и авторизации клиентов (например, AI-агентов) для доступа к MCP-серверам и их инструментам.

В этом уроке показано, как реализовать аутентификацию OAuth2 для MCP-серверов с использованием Spring Boot — распространенного подхода для корпоративных и производственных развертываний.

## Цели обучения

К концу этого урока вы сможете:
- Понимать, как OAuth2 интегрируется с MCP-серверами
- Реализовать Spring Authorization Server для выдачи токенов
- Защитить MCP эндпоинты при помощи аутентификации на основе JWT
- Настроить поток client credentials для взаимодействия между машинами

## Требования

- Базовые знания Java и Spring Boot
- Знакомство с концепциями MCP из предыдущих модулей
- Установленные Maven или Gradle

---

## Обзор проекта

Этот проект представляет собой **минимальное Spring Boot приложение**, которое выполняет роль одновременно:

* **Сервера авторизации Spring** (выдающего JWT токены доступа через поток `client_credentials`), и  
* **Ресурсного сервера** (защищающего собственный эндпоинт `/hello`).

Он повторяет конфигурацию, показанную в [посте в блоге Spring (2 апреля 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Быстрый старт (локально)

```bash
# сборка и запуск
./mvnw spring-boot:run

# получить токен
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# вызвать защищенный эндпоинт
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Тестирование конфигурации OAuth2

Вы можете проверить настройку безопасности OAuth2, выполнив следующие шаги:

### 1. Убедитесь, что сервер запущен и защищён

```bash
# Это должно вернуть 401 Unauthorized, подтверждая, что безопасность OAuth2 активна
curl -v http://localhost:8081/
```

### 2. Получите токен доступа с помощью client credentials

```bash
# Получить и извлечь полный ответ с токеном
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Или извлечь только токен (требуется jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Примечание: заголовок Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) — это Base64-кодировка строки `mcp-client:secret`.

### 3. Получите доступ к защищённому эндпоинту с помощью токена

```bash
# Использование сохраненного токена
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Или напрямую со значением токена
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Успешный ответ с сообщением "Hello from MCP OAuth2 Demo!" подтверждает правильную работу конфигурации OAuth2.

---

## Сборка контейнера

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Развёртывание в **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Входное имя хоста (FQDN) становится вашим **издателем** (`https://<fqdn>`).  
Azure автоматически предоставляет доверенный TLS сертификат для `*.azurecontainerapps.io`.

---

## Интеграция с **Azure API Management**

Добавьте эту входящую политику в ваш API:

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

APIM будет загружать JWKS и проверять каждый запрос.

---

## Что дальше

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:  
Этот документ был переведен с помощью автоматического сервиса перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Хотя мы прилагаем усилия для обеспечения точности, имейте в виду, что автоматические переводы могут содержать ошибки или неточности. Оригинальный документ на исходном языке следует считать авторитетным источником. Для важной информации рекомендуется использовать профессиональный перевод, выполненный человеком. Мы не несем ответственности за любые недоразумения или неправильное толкование, возникшие в результате использования данного перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->