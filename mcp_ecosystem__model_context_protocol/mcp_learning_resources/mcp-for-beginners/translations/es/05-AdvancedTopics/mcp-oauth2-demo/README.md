# Demonstación de MCP OAuth2

## Introducción

OAuth2 es el protocolo estándar de la industria para la autorización, que permite un acceso seguro a recursos sin compartir credenciales. En las implementaciones de MCP (Model Context Protocol), OAuth2 proporciona una forma robusta de autenticar y autorizar clientes (como agentes de IA) para acceder a servidores MCP y sus herramientas.

Esta lección demuestra cómo implementar la autenticación OAuth2 para servidores MCP usando Spring Boot, un patrón común para despliegues empresariales y de producción.

## Objetivos de Aprendizaje

Al final de esta lección, usted:
- Entenderá cómo OAuth2 se integra con servidores MCP
- Implementará un Servidor de Autorización Spring para la emisión de tokens
- Protegerá endpoints MCP con autenticación basada en JWT
- Configurará el flujo de credenciales de cliente para comunicación máquina a máquina

## Requisitos Previos

- Conocimientos básicos de Java y Spring Boot
- Familiaridad con conceptos de MCP de módulos anteriores
- Maven o Gradle instalados

---

## Vista General del Proyecto

Este proyecto es una **aplicación mínima Spring Boot** que actúa como:

* un **Servidor de Autorización Spring** (emitir tokens de acceso JWT vía el flujo `client_credentials`), y  
* un **Servidor de Recursos** (protegiendo su propio endpoint `/hello`).

Refleja la configuración mostrada en la [entrada del blog de Spring (2 Abr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Inicio Rápido (local)

```bash
# compilar y ejecutar
./mvnw spring-boot:run

# obtener un token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# llamar al endpoint protegido
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Prueba de la Configuración OAuth2

Puede probar la configuración de seguridad OAuth2 con los siguientes pasos:

### 1. Verifique que el servidor está activo y seguro

```bash
# Esto debería devolver 401 No autorizado, confirmando que la seguridad OAuth2 está activa
curl -v http://localhost:8081/
```

### 2. Obtenga un token de acceso usando credenciales de cliente

```bash
# Obtener y extraer la respuesta completa del token
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# O para extraer solo el token (requiere jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Nota: El encabezado de Autenticación Básica (`bWNwLWNsaWVudDpzZWNyZXQ=`) es la codificación Base64 de `mcp-client:secret`.

### 3. Acceda al endpoint protegido usando el token

```bash
# Usando el token guardado
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# O directamente con el valor del token
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Una respuesta exitosa con "¡Hola desde MCP OAuth2 Demo!" confirma que la configuración OAuth2 funciona correctamente.

---

## Construcción del Contenedor

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Despliegue en **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

El FQDN de ingreso se convierte en su **emisor** (`https://<fqdn>`).  
Azure provee automáticamente un certificado TLS confiable para `*.azurecontainerapps.io`.

---

## Integración con **Azure API Management**

Agregue esta política de entrada a su API:

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

APIM obtendrá el JWKS y validará cada solicitud.

---

## Qué sigue

- [5.4 Contextos raíz](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso legal**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda la traducción profesional realizada por humanos. No nos hacemos responsables por cualquier malentendido o interpretación errónea derivada del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->