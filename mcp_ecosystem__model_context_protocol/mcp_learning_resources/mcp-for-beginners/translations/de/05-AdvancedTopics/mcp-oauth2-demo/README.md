# MCP OAuth2 Demo

## Einführung

OAuth2 ist das branchenübliche Protokoll für Autorisierung, das den sicheren Zugriff auf Ressourcen ermöglicht, ohne Anmeldedaten weiterzugeben. In MCP (Model Context Protocol)-Implementierungen bietet OAuth2 eine robuste Möglichkeit, Clients (wie KI-Agenten) zu authentifizieren und zu autorisieren, um auf MCP-Server und deren Tools zuzugreifen.

Diese Lektion zeigt, wie man OAuth2-Authentifizierung für MCP-Server mit Spring Boot implementiert, ein gängiges Muster für Unternehmens- und Produktionsumgebungen.

## Lernziele

Am Ende dieser Lektion werden Sie:
- Verstehen, wie OAuth2 in MCP-Server integriert wird
- Einen Spring Authorization Server zur Token-Ausgabe implementieren
- MCP-Endpunkte mit JWT-basierter Authentifizierung schützen
- Den Client-Credentials-Flow für Maschinen-zu-Maschinen-Kommunikation konfigurieren

## Voraussetzungen

- Grundkenntnisse in Java und Spring Boot
- Vertrautheit mit MCP-Konzepten aus früheren Modulen
- Maven oder Gradle installiert

---

## Projektübersicht

Dieses Projekt ist eine **minimalistische Spring Boot-Anwendung**, die sowohl als:

* ein **Spring Authorization Server** (der JWT-Zugriffstokens über den `client_credentials`-Flow ausgibt), als auch  
* ein **Resource Server** (der seinen eigenen `/hello`-Endpunkt schützt),

fungiert.

Es spiegelt die im [Spring-Blogbeitrag (2. Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) gezeigte Konfiguration wider.

---

## Schnellstart (lokal)

```bash
# bauen & ausführen
./mvnw spring-boot:run

# ein Token erhalten
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# den geschützten Endpunkt aufrufen
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testen der OAuth2-Konfiguration

Sie können die OAuth2-Sicherheitskonfiguration mit folgenden Schritten testen:

### 1. Überprüfen, ob der Server läuft und gesichert ist

```bash
# Dies sollte 401 Unauthorized zurückgeben und bestätigen, dass die OAuth2-Sicherheit aktiv ist
curl -v http://localhost:8081/
```

### 2. Ein Zugriffstoken mit Client Credentials abrufen

```bash
# Holen und extrahieren Sie die vollständige Token-Antwort
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Oder extrahieren Sie nur das Token (erfordert jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Hinweis: Der Basic-Authentication-Header (`bWNwLWNsaWVudDpzZWNyZXQ=`) ist die Base64-Codierung von `mcp-client:secret`.

### 3. Auf den geschützten Endpunkt mit dem Token zugreifen

```bash
# Verwendung des gespeicherten Tokens
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Oder direkt mit dem Token-Wert
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Eine erfolgreiche Antwort mit "Hello from MCP OAuth2 Demo!" bestätigt, dass die OAuth2-Konfiguration korrekt funktioniert.

---

## Container-Erstellung

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Bereitstellung auf **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Der Ingress-FQDN wird zu Ihrem **Issuer** (`https://<fqdn>`).  
Azure stellt automatisch ein vertrauenswürdiges TLS-Zertifikat für `*.azurecontainerapps.io` bereit.

---

## Anbindung an **Azure API Management**

Fügen Sie diese eingehende Richtlinie zu Ihrer API hinzu:

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

APIM holt die JWKS ab und validiert jede Anfrage.

---

## Was kommt als Nächstes

- [5.4 Root-Kontexte](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mithilfe des KI-Übersetzungsdienstes [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir um Genauigkeit bemüht sind, kann es bei automatischen Übersetzungen zu Fehlern oder Ungenauigkeiten kommen. Das Originaldokument in seiner Herkunftssprache ist als maßgebliche Quelle anzusehen. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->