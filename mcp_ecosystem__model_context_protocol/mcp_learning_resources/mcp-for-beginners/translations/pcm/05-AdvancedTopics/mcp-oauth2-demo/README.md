# MCP OAuth2 Demo

## Introduction

OAuth2 na di industry-standard protocol for authorization, wey dey enable secure access to resources without sharing credentials. For MCP (Model Context Protocol) implementations, OAuth2 dey provide beta way to authenticate and authorize clients (like AI agents) to access MCP servers and their tools.

Dis lesson dey show how to implement OAuth2 authentication for MCP servers using Spring Boot, wey na common pattern for enterprise and production deployments.

## Learning Objectives

By di end of dis lesson, you go:
- Understand how OAuth2 take connect with MCP servers
- Implement Spring Authorization Server for token issuance
- Protect MCP endpoints with JWT-based authentication
- Configure client credentials flow for machine-to-machine communication

## Prerequisites

- Basic understanding of Java and Spring Boot
- Familiarity with MCP concepts from earlier modules
- Maven or Gradle installed

---

## Project Overview

Dis project na **minimal Spring Boot application** wey dey act as both:

* a **Spring Authorization Server** (wey dey issue JWT access tokens via di `client_credentials` flow), and  
* a **Resource Server** (wey dey protect im own `/hello` endpoint).

E dey mirror di setup wey show for di [Spring blog post (2 Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Quick start (local)

```bash
# build & run
./mvnw spring-boot:run

# knack beta token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# call di protected endpoint
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testing the OAuth2 Configuration

You fit test di OAuth2 security configuration with dis steps:

### 1. Verify say di server dey run and e secure

```bash
# Dis suppose return 401 Unauthorized, to show say OAuth2 security dey active
curl -v http://localhost:8081/
```

### 2. Get access token using client credentials

```bash
# Get and comot all di token response
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Or to comot only di token (you need jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Note: Di Basic Authentication header (`bWNwLWNsaWVudDpzZWNyZXQ=`) na di Base64 encoding of `mcp-client:secret`.

### 3. Access di protected endpoint with di token

```bash
# Di token wey we don save dey use
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Or you fit use di token value directly
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

If response come successful wit "Hello from MCP OAuth2 Demo!" e mean say di OAuth2 configuration dey work well.

---

## Container build

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Deploy to **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Di ingress FQDN go become your **issuer** (`https://<fqdn>`).  
Azure go automatically provide trusted TLS certificate for `*.azurecontainerapps.io`.

---

## Wire into **Azure API Management**

Add dis inbound policy to your API:

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

APIM go fetch di JWKS and validate every request.

---

## What's next

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we try make e correct, abeg remember say automated translation fit get some errors or wahala. Di original document wey dem write for im own language na di correct one. For important info, better make professional human translate am. We no go take responsibility if person misunderstand or misinterpret di translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->