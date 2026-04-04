# Demonstração MCP OAuth2

## Introdução

OAuth2 é o protocolo padrão da indústria para autorização, permitindo acesso seguro a recursos sem partilhar credenciais. Nas implementações MCP (Model Context Protocol), o OAuth2 fornece uma forma robusta de autenticar e autorizar clientes (como agentes de IA) para aceder a servidores MCP e às suas ferramentas.

Esta lição demonstra como implementar a autenticação OAuth2 para servidores MCP usando Spring Boot, um padrão comum para implementações empresariais e de produção.

## Objetivos de Aprendizagem

No final desta lição, irá:
- Compreender como o OAuth2 integra-se com servidores MCP
- Implementar um Servidor de Autorização Spring para emissão de tokens
- Proteger endpoints MCP com autenticação baseada em JWT
- Configurar o fluxo de credenciais de cliente para comunicação máquina-a-máquina

## Pré-requisitos

- Conhecimentos básicos de Java e Spring Boot
- Familiaridade com conceitos MCP dos módulos anteriores
- Maven ou Gradle instalado

---

## Visão Geral do Projeto

Este projeto é uma **aplicação mínima Spring Boot** que atua como:

* um **Servidor de Autorização Spring** (emitindo tokens de acesso JWT via fluxo `client_credentials`), e  
* um **Servidor de Recursos** (protegendo o seu próprio endpoint `/hello`).

Corresponde à configuração apresentada no [post do blog Spring (2 Abr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Início rápido (local)

```bash
# construir e executar
./mvnw spring-boot:run

# obter um token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# chamar o endpoint protegido
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Testar a Configuração OAuth2

Pode testar a configuração de segurança OAuth2 com os seguintes passos:

### 1. Verifique se o servidor está a funcionar e seguro

```bash
# Isto deve retornar 401 Não Autorizado, confirmando que a segurança OAuth2 está ativa
curl -v http://localhost:8081/
```

### 2. Obtenha um token de acesso usando credenciais de cliente

```bash
# Obter e extrair a resposta completa do token
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Ou extrair apenas o token (requer jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Nota: O cabeçalho Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) é a codificação Base64 de `mcp-client:secret`.

### 3. Aceda ao endpoint protegido usando o token

```bash
# A utilizar o token guardado
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Ou diretamente com o valor do token
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Uma resposta bem-sucedida com "Hello from MCP OAuth2 Demo!" confirma que a configuração OAuth2 está correta.

---

## Construção do Container

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Implementar nas **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

O FQDN de ingresso torna-se o seu **emissor** (`https://<fqdn>`).  
A Azure fornece automaticamente um certificado TLS confiável para `*.azurecontainerapps.io`.

---

## Integrar com o **Azure API Management**

Adicione esta política de entrada à sua API:

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

O APIM irá obter o JWKS e validar cada pedido.

---

## O que vem a seguir

- [5.4 Contextos raiz](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos empenhemos na precisão, por favor tenha em conta que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->