# Depuración con MCP Inspector

El **MCP Inspector** es una herramienta esencial de depuración que te permite probar y solucionar problemas interactuando con tus servidores MCP sin necesidad de una aplicación completa de host AI. Piénsalo como "Postman para MCP": proporciona una interfaz visual para enviar solicitudes, ver respuestas y entender cómo se comporta tu servidor.

## ¿Por qué Usar MCP Inspector?

Al construir servidores MCP, a menudo encontrarás estos desafíos:

- **"¿Mi servidor está en funcionamiento?"** - Inspector muestra el estado de la conexión
- **"¿Mis herramientas están registradas correctamente?"** - Inspector lista todas las herramientas disponibles
- **"¿Cuál es el formato de la respuesta?"** - Inspector muestra respuestas completas en JSON
- **"¿Por qué no funciona esta herramienta?"** - Inspector muestra mensajes de error detallados

## Requisitos Previos

- Node.js 18+ instalado
- npm (incluido con Node.js)
- Un servidor MCP para probar (ver [Módulo 3.1 - Primer Servidor](../01-first-server/README.md))

## Instalación

### Opción 1: Ejecutar con npx (Recomendado para Pruebas Rápidas)

```bash
npx @modelcontextprotocol/inspector
```

### Opción 2: Instalar Globalmente

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Opción 3: Agregar a Tu Proyecto

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Agregar a `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Conectando a Tu Servidor

### Servidores stdio (Proceso Local)

Para servidores que se comunican vía entrada/salida estándar:

```bash
# Servidor Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Servidor Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Con variables de entorno
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### Servidores SSE/HTTP (Red)

Para servidores que funcionan como servicios HTTP:

1. Inicia primero tu servidor:
   ```bash
   python server.py  # Servidor funcionando en http://localhost:8080
   ```

2. Lanza Inspector y conéctate:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Resumen de la Interfaz de Inspector

Cuando Inspector se inicia, verás una interfaz web (normalmente en `http://localhost:5173`):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Probando Herramientas

### Listar Herramientas Disponibles

1. Haz clic en la pestaña **Tools**
2. Inspector llama automáticamente a `tools/list`
3. Verás todas las herramientas registradas con:
   - Nombre de la herramienta
   - Descripción
   - Esquema de entrada (parámetros)

### Invocar una Herramienta

1. Selecciona una herramienta de la lista
2. Llena los parámetros requeridos en el formulario
3. Haz clic en **Run Tool**
4. Visualiza la respuesta en el panel de resultados

**Ejemplo: Probando una herramienta calculadora**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### Depuración de Errores de Herramientas

Cuando una herramienta falla, Inspector muestra:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Códigos de error comunes:
| Código | Significado |
|--------|-------------|
| -32700 | Error de análisis (JSON inválido) |
| -32600 | Solicitud inválida |
| -32601 | Método no encontrado |
| -32602 | Parámetros inválidos |
| -32603 | Error interno |

---

## Probando Recursos

### Listar Recursos

1. Haz clic en la pestaña **Resources**
2. Inspector llama a `resources/list`
3. Verás:
   - URIs de recursos
   - Nombres y descripciones
   - Tipos MIME

### Leer un Recurso

1. Selecciona un recurso
2. Haz clic en **Read Resource**
3. Visualiza el contenido devuelto

**Ejemplo de salida:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## Probando Prompts

### Listar Prompts

1. Haz clic en la pestaña **Prompts**
2. Inspector llama a `prompts/list`
3. Visualiza plantillas de prompts disponibles

### Obtener un Prompt

1. Selecciona un prompt
2. Llena los argumentos requeridos
3. Haz clic en **Get Prompt**
4. Ve los mensajes renderizados del prompt

---

## Análisis del Registro de Mensajes

El registro de mensajes muestra todos los mensajes del protocolo MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Qué Buscar

- **Pares Solicitud/Respuesta**: Cada `→` debe tener un correspondiente `←`
- **Mensajes de error**: Busca `"error"` en las respuestas
- **Tiempos**: Grandes intervalos pueden indicar problemas de rendimiento
- **Versión del protocolo**: Asegúrate que servidor y cliente estén en la misma versión

---

## Integración con VS Code

Puedes ejecutar Inspector directamente desde VS Code:

### Usando launch.json

Agregar a `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Usando Tasks

Agregar a `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## Escenarios Comunes de Depuración

### Escenario 1: El Servidor No Se Conecta

**Síntomas:** Inspector muestra "Disconnected" o se queda en "Connecting..."

**Checklist:**
1. ✅ ¿El comando del servidor es correcto?
2. ✅ ¿Todas las dependencias están instaladas?
3. ✅ ¿La ruta del servidor es absoluta o relativa al directorio actual?
4. ✅ ¿Se configuraron las variables de entorno necesarias?

**Pasos de depuración:**
```bash
# Probar el servidor manualmente primero
python -c "import your_server_module; print('OK')"

# Verificar errores de importación
python -m your_server_module 2>&1 | head -20

# Verificar que el SDK MCP esté instalado
pip show mcp
```

### Escenario 2: Las Herramientas No Aparecen

**Síntomas:** La pestaña Tools muestra lista vacía

**Posibles causas:**
1. Las herramientas no se registraron durante la inicialización del servidor
2. El servidor se cayó después de iniciar
3. El manejador `tools/list` devuelve un arreglo vacío

**Pasos de depuración:**
1. Revisa el registro de mensajes para la respuesta `tools/list`
2. Agrega registros en tu código de registro de herramientas
3. Verifica que los decoradores `@mcp.tool()` estén presentes (Python)

### Escenario 3: La Herramienta Retorna Error

**Síntomas:** La llamada a la herramienta retorna una respuesta de error

**Enfoque de depuración:**
1. Lee cuidadosamente el mensaje de error
2. Verifica que los tipos de parámetros coincidan con el esquema
3. Agrega bloques try/catch con mensajes de error detallados
4. Revisa los logs del servidor para rastros de pila

**Ejemplo de manejo de errores mejorado:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Lógica de la herramienta aquí
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Escenario 4: Contenido del Recurso Vacío

**Síntomas:** El recurso responde pero el contenido está vacío o es null

**Checklist:**
1. ✅ La ruta del archivo o URI es correcta
2. ✅ El servidor tiene permiso para leer el recurso
3. ✅ El contenido del recurso se está enviando correctamente

---

## Características Avanzadas de Inspector

### Encabezados Personalizados (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Registro Verboso

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Grabación de Sesiones

Inspector puede exportar registros de mensajes para análisis posterior:
1. Haz clic en **Export Log** en el panel de mensajes
2. Guarda el archivo JSON
3. Compártelo con miembros del equipo para depuración

---

## Mejores Prácticas

1. **Prueba temprano y frecuentemente** - Usa Inspector durante el desarrollo, no solo cuando algo falla
2. **Comienza simple** - Prueba conectividad básica antes de llamadas complejas a herramientas
3. **Verifica el esquema** - Muchos errores provienen de desaciertos en tipos de parámetros
4. **Lee los mensajes de error** - Los errores MCP suelen ser descriptivos
5. **Mantén abierto Inspector** - Ayuda a detectar problemas mientras desarrollas

---

## Qué Sigue

¡Has completado el Módulo 3: Introducción! Continúa tu aprendizaje:

- [Módulo 4: Implementación Práctica](../../04-PracticalImplementation/README.md)

---

## Recursos Adicionales

- [Repositorio MCP Inspector en GitHub](https://github.com/modelcontextprotocol/inspector)
- [Especificación MCP - Mensajes de Protocolo](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Especificación JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No nos responsabilizamos por malentendidos o interpretaciones erróneas derivadas del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->