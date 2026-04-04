# MCP OAuth2 Demo

## Introduzione

OAuth2 è il protocollo standard del settore per l'autorizzazione, che consente accessi sicuri alle risorse senza condividere le credenziali. Nelle implementazioni MCP (Model Context Protocol), OAuth2 fornisce un modo solido per autenticare e autorizzare i client (come gli agenti AI) ad accedere ai server MCP e ai loro strumenti.

Questa lezione dimostra come implementare l'autenticazione OAuth2 per i server MCP utilizzando Spring Boot, un modello comune per implementazioni aziendali e di produzione.

## Obiettivi di apprendimento

Al termine di questa lezione, saprai:
- Comprendere come OAuth2 si integra con i server MCP
- Implementare un Spring Authorization Server per il rilascio di token
- Proteggere gli endpoint MCP con autenticazione basata su JWT
- Configurare il flusso client credentials per la comunicazione macchina-macchina

## Prerequisiti

- Conoscenze di base di Java e Spring Boot
- Familiarità con i concetti MCP dai moduli precedenti
- Maven o Gradle installati

---

## Panoramica del progetto

Questo progetto è un'**applicazione Spring Boot minimale** che funge sia da:

* un **Spring Authorization Server** (rilasciando token di accesso JWT tramite il flusso `client_credentials`), e  
* un **Resource Server** (proteggendo il proprio endpoint `/hello`).

Rappresenta la configurazione mostrata nel [post del blog Spring (2 Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Avvio rapido (locale)

```bash
# compila e esegui
./mvnw spring-boot:run

# ottieni un token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# chiama il punto finale protetto
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Test della configurazione OAuth2

Puoi testare la configurazione di sicurezza OAuth2 con i seguenti passaggi:

### 1. Verifica che il server sia in esecuzione e protetto

```bash
# Questo dovrebbe restituire 401 Non autorizzato, confermando che la sicurezza OAuth2 è attiva
curl -v http://localhost:8081/
```

### 2. Ottieni un token di accesso usando client credentials

```bash
# Ottieni ed estrai la risposta completa del token
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Oppure per estrarre solo il token (richiede jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Nota: L'intestazione di autenticazione Basic (`bWNwLWNsaWVudDpzZWNyZXQ=`) è la codifica Base64 di `mcp-client:secret`.

### 3. Accedi all'endpoint protetto usando il token

```bash
# Usando il token salvato
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# O direttamente con il valore del token
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Una risposta con successo contenente "Hello from MCP OAuth2 Demo!" conferma che la configurazione OAuth2 funziona correttamente.

---

## Build del container

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Distribuzione su **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Il FQDN di ingresso diventa il tuo **issuer** (`https://<fqdn>`).  
Azure fornisce automaticamente un certificato TLS affidabile per `*.azurecontainerapps.io`.

---

## Integrazione con **Azure API Management**

Aggiungi questa policy inbound alla tua API:

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

APIM recupererà il JWKS e convaliderà ogni richiesta.

---

## Cosa fare dopo

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avvertenza**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per garantire accuratezza, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si consiglia di ricorrere a una traduzione professionale effettuata da un traduttore umano. Non ci riteniamo responsabili per eventuali incomprensioni o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->