# MCP OAuth2 Demo

## Wprowadzenie

OAuth2 to standardowy protokół branżowy do autoryzacji, umożliwiający bezpieczny dostęp do zasobów bez udostępniania danych uwierzytelniających. W implementacjach MCP (Model Context Protocol), OAuth2 zapewnia solidny sposób uwierzytelniania i autoryzacji klientów (takich jak agenci AI) do uzyskiwania dostępu do serwerów MCP i ich narzędzi.

Ta lekcja demonstruje, jak zaimplementować uwierzytelnianie OAuth2 dla serwerów MCP przy użyciu Spring Boot, powszechnego wzorca dla wdrożeń korporacyjnych i produkcyjnych.

## Cele nauki

Pod koniec tej lekcji będziesz umiał:
- Zrozumieć, jak OAuth2 integruje się z serwerami MCP
- Zaimplementować Spring Authorization Server do wydawania tokenów
- Chronić punkty końcowe MCP za pomocą uwierzytelniania opartego na JWT
- Skonfigurować przepływ client credentials dla komunikacji maszyna-maszyna

## Wymagania wstępne

- Podstawowa znajomość Java i Spring Boot
- Znajomość koncepcji MCP z wcześniejszych modułów
- Zainstalowany Maven lub Gradle

---

## Przegląd projektu

Ten projekt to **minimalna aplikacja Spring Boot**, która pełni rolę zarówno:

* **Spring Authorization Server** (wydającego tokeny dostępu JWT za pomocą przepływu `client_credentials`), oraz  
* **Resource Server** (chroniącego własny punkt końcowy `/hello`).

Odwzorowuje ona konfigurację pokazaną w [poście na blogu Spring (2 kwietnia 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Szybki start (lokalnie)

```bash
# kompiluj i uruchom
./mvnw spring-boot:run

# uzyskaj token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# wywołaj chroniony punkt końcowy
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testowanie konfiguracji OAuth2

Możesz przetestować konfigurację zabezpieczeń OAuth2 wykonując następujące kroki:

### 1. Sprawdź, czy serwer działa i jest zabezpieczony

```bash
# To powinno zwrócić 401 Unauthorized, potwierdzając, że bezpieczeństwo OAuth2 jest aktywne
curl -v http://localhost:8081/
```

### 2. Uzyskaj token dostępu przy użyciu poświadczeń klienta

```bash
# Pobierz i wyodrębnij pełną odpowiedź tokena
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Lub aby wyodrębnić tylko token (wymaga jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Uwaga: Nagłówek Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) to kodowanie Base64 dla `mcp-client:secret`.

### 3. Uzyskaj dostęp do chronionego punktu końcowego za pomocą tokena

```bash
# Używanie zapisanego tokena
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Lub bezpośrednio z wartością tokena
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Pomyślna odpowiedź z "Hello from MCP OAuth2 Demo!" potwierdza, że konfiguracja OAuth2 działa prawidłowo.

---

## Budowanie kontenera

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Wdrożenie do **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

FQDN ingressu staje się Twoim **wydawcą** (`https://<fqdn>`).  
Azure automatycznie zapewnia zaufany certyfikat TLS dla `*.azurecontainerapps.io`.

---

## Podłączenie do **Azure API Management**

Dodaj tę politykę przychodzącą do swojego API:

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

APIM pobierze JWKS i zweryfikuje każde żądanie.

---

## Co dalej

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Dokument ten został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Chociaż dokładamy starań, aby tłumaczenie było jak najdokładniejsze, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w języku źródłowym należy uznać za dokument wiążący. W przypadku informacji o kluczowym znaczeniu zalecane jest skorzystanie z profesjonalnego, ludzkiego tłumaczenia. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z wykorzystania tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->