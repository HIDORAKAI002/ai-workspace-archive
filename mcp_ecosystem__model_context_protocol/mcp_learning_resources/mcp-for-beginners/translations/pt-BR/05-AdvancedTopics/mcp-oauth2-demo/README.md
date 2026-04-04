# MCP OAuth2 Demo

## Introdução

OAuth2 é o protocolo padrão da indústria para autorização, permitindo acesso seguro a recursos sem compartilhar credenciais. Em implementações MCP (Model Context Protocol), OAuth2 oferece uma maneira robusta de autenticar e autorizar clientes (como agentes de IA) para acessar servidores MCP e suas ferramentas.

Esta lição demonstra como implementar autenticação OAuth2 para servidores MCP usando Spring Boot, um padrão comum para implantações empresariais e de produção.

## Objetivos de Aprendizagem

Ao final desta lição, você irá:
- Entender como o OAuth2 se integra com servidores MCP
- Implementar um Servidor de Autorização Spring para emissão de tokens
- Proteger endpoints MCP com autenticação baseada em JWT
- Configurar o fluxo de client credentials para comunicação máquina-a-máquina

## Pré-requisitos

- Conhecimento básico de Java e Spring Boot
- Familiaridade com conceitos MCP dos módulos anteriores
- Maven ou Gradle instalado

---

## Visão Geral do Projeto

Este projeto é uma **aplicação Spring Boot mínima** que atua como:

* um **Servidor de Autorização Spring** (emitindo tokens de acesso JWT via o fluxo `client_credentials`), e  
* um **Servidor de Recursos** (protegendo seu próprio endpoint `/hello`).

Ele espelha a configuração mostrada no [post do blog Spring (2 de abril de 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

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

## Testando a Configuração OAuth2

Você pode testar a configuração de segurança OAuth2 com os seguintes passos:

### 1. Verifique se o servidor está em execução e seguro

```bash
# Isso deve retornar 401 Não autorizado, confirmando que a segurança OAuth2 está ativa
curl -v http://localhost:8081/
```

### 2. Obtenha um token de acesso usando client credentials

```bash
# Obter e extrair a resposta completa do token
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Ou para extrair apenas o token (requer jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Nota: O cabeçalho Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) é a codificação Base64 de `mcp-client:secret`.

### 3. Acesse o endpoint protegido usando o token

```bash
# Usando o token salvo
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Ou diretamente com o valor do token
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Uma resposta bem-sucedida com "Hello from MCP OAuth2 Demo!" confirma que a configuração OAuth2 está funcionando corretamente.

---

## Construção do container

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Implantar no **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

O FQDN do ingresso se torna seu **emissor** (`https://<fqdn>`).  
O Azure fornece automaticamente um certificado TLS confiável para `*.azurecontainerapps.io`.

---

## Integração com **Azure API Management**

Adicione esta política inbound à sua API:

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

O APIM buscará o JWKS e validará cada requisição.

---

## Próximos passos

- [5.4 Contextos raiz](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte oficial. Para informações críticas, recomenda-se a tradução profissional realizada por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações equivocadas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->