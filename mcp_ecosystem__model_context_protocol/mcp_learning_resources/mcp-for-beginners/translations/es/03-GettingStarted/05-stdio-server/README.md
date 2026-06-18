# Servidor MCP con transporte stdio

> **⚠️ Actualización importante**: A partir de la Especificación MCP 2025-06-18, el transporte SSE independiente (Server-Sent Events) ha sido **descontinuado** y reemplazado por el transporte "Streamable HTTP". La especificación MCP actual define dos mecanismos principales de transporte:
> 1. **stdio** - Entrada/salida estándar (recomendado para servidores locales)
> 2. **Streamable HTTP** - Para servidores remotos que pueden usar SSE internamente
>
> Esta lección ha sido actualizada para centrarse en el **transporte stdio**, que es el enfoque recomendado para la mayoría de las implementaciones de servidores MCP.

El transporte stdio permite a los servidores MCP comunicarse con los clientes a través de los flujos estándar de entrada y salida. Este es el mecanismo de transporte más común y recomendado en la especificación MCP actual, proporcionando una forma simple y eficiente de construir servidores MCP que pueden integrarse fácilmente con diversas aplicaciones cliente.

## Resumen

Esta lección cubre cómo construir y consumir servidores MCP usando el transporte stdio.

## Objetivos de aprendizaje

Al final de esta lección, podrás:

- Construir un servidor MCP usando el transporte stdio.
- Depurar un servidor MCP usando el Inspector.
- Consumir un servidor MCP usando Visual Studio Code.
- Entender los mecanismos actuales de transporte MCP y por qué se recomienda stdio.


## Transporte stdio - Cómo funciona

El transporte stdio es uno de los dos tipos de transporte soportados en la especificación MCP actual (2025-11-25). Así es como funciona:

- **Comunicación simple**: El servidor lee mensajes JSON-RPC de la entrada estándar (`stdin`) y envía mensajes a la salida estándar (`stdout`).
- **Basado en procesos**: El cliente lanza el servidor MCP como un subproceso.
- **Formato de mensaje**: Los mensajes son solicitudes, notificaciones o respuestas JSON-RPC individuales, delimitados por saltos de línea.
- **Registro**: El servidor PUEDE escribir cadenas UTF-8 en la salida de error estándar (`stderr`) para propósitos de registro.

### Requisitos clave:
- Los mensajes DEBEN estar delimitados por saltos de línea y NO DEBEN contener saltos de línea embebidos
- El servidor NO DEBE escribir nada en `stdout` que no sea un mensaje MCP válido
- El cliente NO DEBE escribir nada en `stdin` del servidor que no sea un mensaje MCP válido

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

En el código anterior:

- Importamos la clase `Server` y `StdioServerTransport` desde el SDK MCP
- Creamos una instancia de servidor con una configuración básica y capacidades
- Creamos una instancia de `StdioServerTransport` y conectamos el servidor a ella, habilitando la comunicación vía stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Crear instancia del servidor
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

En el código anterior:

- Creamos una instancia del servidor usando el SDK MCP
- Definimos herramientas usando decoradores
- Usamos el administrador de contexto stdio_server para manejar el transporte

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

La diferencia clave con SSE es que los servidores stdio:

- No requieren configuración de servidor web ni endpoints HTTP
- Son lanzados como subprocesos por el cliente
- Se comunican a través de los flujos stdin/stdout
- Son más simples de implementar y depurar

## Ejercicio: Creando un servidor stdio

Para crear nuestro servidor, debemos tener en cuenta dos cosas:

- Necesitamos usar un servidor web para exponer endpoints para conexión y mensajes.
## Laboratorio: Creando un servidor MCP stdio simple

En este laboratorio, crearemos un servidor MCP simple usando el transporte stdio recomendado. Este servidor expondrá herramientas que los clientes podrán llamar usando el Protocolo de Contexto de Modelo estándar.

### Requisitos previos

- Python 3.8 o superior
- SDK MCP para Python: `pip install mcp`
- Conocimientos básicos de programación asíncrona

Comencemos creando nuestro primer servidor MCP stdio:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Configurar el registro
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear el servidor
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Usar transporte stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Diferencias clave con el enfoque SSE descontinuado

**Transporte stdio (Estándar actual):**
- Modelo simple de subproceso: el cliente lanza el servidor como proceso hijo
- Comunicación vía stdin/stdout usando mensajes JSON-RPC
- No requiere configuración de servidor HTTP
- Mejor rendimiento y seguridad
- Depuración y desarrollo más fáciles

**Transporte SSE (Descontinuado desde MCP 2025-06-18):**
- Requería servidor HTTP con endpoints SSE
- Configuración más compleja con infraestructura web
- Consideraciones adicionales de seguridad para endpoints HTTP
- Ahora reemplazado por Streamable HTTP para escenarios web

### Creando un servidor con transporte stdio

Para crear nuestro servidor stdio, necesitamos:

1. **Importar las librerías necesarias** - Necesitamos los componentes del servidor MCP y el transporte stdio
2. **Crear una instancia de servidor** - Definir el servidor con sus capacidades
3. **Definir herramientas** - Añadir la funcionalidad que queremos exponer
4. **Configurar el transporte** - Configurar la comunicación stdio
5. **Ejecutar el servidor** - Iniciar el servidor y manejar mensajes

Construyamos esto paso a paso:

### Paso 1: Crear un servidor stdio básico

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Configurar el registro
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear el servidor
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Paso 2: Agregar más herramientas

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Paso 3: Ejecutando el servidor

Guarda el código como `server.py` y ejecútalo desde la línea de comandos:

```bash
python server.py
```

El servidor iniciará y esperará la entrada desde stdin. Se comunica usando mensajes JSON-RPC sobre el transporte stdio.

### Paso 4: Pruebas con el Inspector

Puedes probar tu servidor usando el Inspector MCP:

1. Instala el Inspector: `npx @modelcontextprotocol/inspector`
2. Ejecuta el Inspector y conéctalo a tu servidor
3. Prueba las herramientas que has creado

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Depurando tu servidor stdio

### Usando el Inspector MCP

El Inspector MCP es una herramienta valiosa para depurar y probar servidores MCP. Así es como usarlo con tu servidor stdio:

1. **Instala el Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Ejecuta el Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Prueba tu servidor**: El Inspector ofrece una interfaz web donde puedes:
   - Ver las capacidades del servidor
   - Probar herramientas con diferentes parámetros
   - Monitorear mensajes JSON-RPC
   - Depurar problemas de conexión

### Usando VS Code

También puedes depurar tu servidor MCP directamente en VS Code:

1. Crea una configuración de lanzamiento en `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Coloca puntos de interrupción en el código del servidor
3. Ejecuta el depurador y prueba con el Inspector

### Consejos comunes para depuración

- Usa `stderr` para logging - nunca escribas en `stdout` ya que está reservado para mensajes MCP
- Asegúrate de que todos los mensajes JSON-RPC estén delimitados por saltos de línea
- Prueba primero con herramientas simples antes de añadir funcionalidades complejas
- Usa el Inspector para verificar formatos de mensajes

## Consumir tu servidor stdio en VS Code

Una vez que hayas construido tu servidor MCP stdio, puedes integrarlo con VS Code para usarlo con Claude u otros clientes compatibles con MCP.

### Configuración

1. **Crea un archivo de configuración MCP** en `%APPDATA%\Claude\claude_desktop_config.json` (Windows) o `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Reinicia Claude**: Cierra y abre Claude para cargar la nueva configuración del servidor.

3. **Prueba la conexión**: Inicia una conversación con Claude y prueba usar las herramientas de tu servidor:
   - "¿Puedes saludarme usando la herramienta de saludo?"
   - "Calcula la suma de 15 y 27"
   - "¿Cuál es la info del servidor?"

### Ejemplo de servidor stdio en TypeScript

Aquí tienes un ejemplo completo en TypeScript como referencia:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Agregar herramientas
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### Ejemplo de servidor stdio en .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Resumen

En esta lección actualizada, aprendiste cómo:

- Construir servidores MCP usando el actual **transporte stdio** (enfoque recomendado)
- Entender por qué el transporte SSE fue descontinuado en favor de stdio y Streamable HTTP
- Crear herramientas que pueden ser llamadas por clientes MCP
- Depurar tu servidor usando el Inspector MCP
- Integrar tu servidor stdio con VS Code y Claude

El transporte stdio ofrece una forma más simple, segura y eficiente de construir servidores MCP en comparación con el enfoque SSE descontinuado. Es el transporte recomendado para la mayoría de las implementaciones de servidores MCP según la especificación 2025-06-18.


### .NET

1. Primero creemos algunas herramientas, para esto crearemos un archivo *Tools.cs* con el siguiente contenido:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Ejercicio: Probando tu servidor stdio

Ahora que has construido tu servidor stdio, probémoslo para asegurarnos de que funciona correctamente.

### Requisitos previos

1. Asegúrate de tener instalado el Inspector MCP:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Tu código del servidor debe estar guardado (ejemplo, como `server.py`)

### Pruebas con el Inspector

1. **Inicia el Inspector con tu servidor**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Abre la interfaz web**: El Inspector abrirá una ventana del navegador mostrando las capacidades de tu servidor.

3. **Prueba las herramientas**: 
   - Prueba la herramienta `get_greeting` con diferentes nombres
   - Prueba la herramienta `calculate_sum` con varios números
   - Llama a la herramienta `get_server_info` para ver los metadatos del servidor

4. **Monitorea la comunicación**: El Inspector muestra los mensajes JSON-RPC que se intercambian entre cliente y servidor.

### Qué deberías ver

Cuando tu servidor inicie correctamente, deberías ver:
- Capacidades del servidor listadas en el Inspector
- Herramientas disponibles para pruebas
- Intercambios exitosos de mensajes JSON-RPC
- Respuestas de herramientas mostradas en la interfaz

### Problemas comunes y soluciones

**El servidor no inicia:**
- Verifica que todas las dependencias estén instaladas: `pip install mcp`
- Verifica la sintaxis de Python y la indentación
- Busca mensajes de error en la consola

**Las herramientas no aparecen:**
- Asegúrate de que los decoradores `@server.tool()` estén presentes
- Verifica que las funciones de las herramientas estén definidas antes de `main()`
- Verifica que el servidor esté configurado correctamente

**Problemas de conexión:**
- Asegúrate que el servidor esté usando correctamente el transporte stdio
- Verifica que no haya otros procesos interfiriendo
- Revisa la sintaxis del comando del Inspector

## Tarea

Intenta ampliar tu servidor con más capacidades. Consulta [esta página](https://api.chucknorris.io/) para, por ejemplo, añadir una herramienta que llame a una API. Tú decides cómo debe ser el servidor. ¡Diviértete! :)
## Solución

[Solución](./solution/README.md) Aquí tienes una posible solución con código funcional.

## Puntos clave

Los puntos clave de este capítulo son los siguientes:

- El transporte stdio es el mecanismo recomendado para servidores MCP locales.
- El transporte stdio permite comunicación fluida entre servidores MCP y clientes usando flujos estándar de entrada y salida.
- Puedes usar tanto Inspector como Visual Studio Code para consumir servidores stdio directamente, facilitando la depuración y la integración.

## Ejemplos

- [Calculadora Java](../samples/java/calculator/README.md)
- [Calculadora .Net](../../../../03-GettingStarted/samples/csharp)
- [Calculadora JavaScript](../samples/javascript/README.md)
- [Calculadora TypeScript](../samples/typescript/README.md)
- [Calculadora Python](../../../../03-GettingStarted/samples/python) 

## Recursos adicionales

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Qué sigue

## Próximos pasos

Ahora que sabes cómo construir servidores MCP con el transporte stdio, puedes explorar temas más avanzados:

- **Siguiente**: [Streaming HTTP con MCP (Streamable HTTP)](../06-http-streaming/README.md) - Aprende sobre el otro mecanismo de transporte soportado para servidores remotos
- **Avanzado**: [Mejores prácticas de seguridad MCP](../../02-Security/README.md) - Implementa seguridad en tus servidores MCP
- **Producción**: [Estrategias de despliegue](../09-deployment/README.md) - Despliega tus servidores para uso en producción

## Recursos adicionales

- [Especificación MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Especificación oficial
- [Documentación SDK MCP](https://github.com/modelcontextprotocol/sdk) - Referencias del SDK para todos los lenguajes
- [Ejemplos de la comunidad](../../06-CommunityContributions/README.md) - Más ejemplos de servidores de la comunidad

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->