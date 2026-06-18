# Muestreo - delegar funciones al Cliente

A veces, necesitas que el Cliente MCP y el Servidor MCP colaboren para lograr un objetivo común. Podrías tener un caso en el que el Servidor requiera la ayuda de un LLM que está en el cliente. Para esta situación, el muestreo es lo que deberías usar.

Exploremos algunos casos de uso y cómo construir una solución que involucre muestreo.

## Resumen

En esta lección, nos enfocamos en explicar cuándo y dónde usar el Muestreo y cómo configurarlo.

## Objetivos de Aprendizaje

En este capítulo, vamos a:

- Explicar qué es el Muestreo y cuándo usarlo.
- Mostrar cómo configurar el Muestreo en MCP.
- Proporcionar ejemplos del Muestreo en acción.

## ¿Qué es el Muestreo y por qué usarlo?

El muestreo es una característica avanzada que funciona de la siguiente manera:

```mermaid
sequenceDiagram
    participant User
    participant MCP Client
    participant LLM
    participant MCP Server

    User->>MCP Client: Redactar publicación de blog
    MCP Client->>MCP Server: Llamada a herramienta (borrador de publicación)
    MCP Server->>MCP Client: Solicitud de muestreo (crear resumen)
    MCP Client->>LLM: Generar resumen de publicación
    LLM->>MCP Client: Resultado del resumen
    MCP Client->>MCP Server: Respuesta de muestreo (resumen)
    MCP Server->>MCP Client: Publicación completa (borrador + resumen)
    MCP Client->>User: Publicación lista
```

### Solicitud de Muestreo

Ok, ahora que tenemos una visión general de un escenario creíble, hablemos sobre la solicitud de muestreo que el servidor envía de vuelta al cliente. Así es como podría lucir dicha solicitud en formato JSON-RPC:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "Create a blog post summary of the following blog post: <BLOG POST>"
        }
      }
    ],
    "modelPreferences": {
      "hints": [
        {
          "name": "claude-3-sonnet"
        }
      ],
      "intelligencePriority": 0.8,
      "speedPriority": 0.5
    },
    "systemPrompt": "You are a helpful assistant.",
    "maxTokens": 100
  }
}
```

Hay algunas cosas aquí que valen la pena destacar:

- El prompt, bajo content -> text, es nuestro prompt que es una instrucción para que el LLM resuma el contenido del blog.

- **modelPreferences**. Esta sección es simplemente eso, una preferencia, una recomendación de qué configuración usar con el LLM. El usuario puede elegir si seguir estas recomendaciones o cambiarlas. En este caso hay recomendaciones sobre el modelo a usar y prioridad de velocidad e inteligencia.
- **systemPrompt**, este es tu prompt normal del sistema que le da personalidad a tu LLM y contiene instrucciones de orientación.
- **maxTokens**, esta es otra propiedad que se usa para indicar cuántos tokens se recomiendan usar para esta tarea.

### Respuesta de Muestreo

Esta respuesta es lo que el Cliente MCP termina enviando de vuelta al Servidor MCP y es el resultado del cliente llamando al LLM, esperando esa respuesta y luego construyendo este mensaje. Así es como podría lucir en JSON-RPC:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "role": "assistant",
    "content": {
      "type": "text",
      "text": "Here's your abstract <ABSTRACT>"
    },
    "model": "gpt-5",
    "stopReason": "endTurn"
  }
}
```

Nota cómo la respuesta es un resumen del blog justo como pedimos. También nota cómo el `model` usado no es el que pedimos sino "gpt-5" en lugar de "claude-3-sonnet". Esto es para ilustrar que el usuario puede cambiar de opinión sobre qué usar y que tu solicitud de muestreo es una recomendación.

Ok, ahora que entendemos el flujo principal y una tarea útil para usarlo "creación + resumen de blog", veamos qué tenemos que hacer para hacerlo funcionar.

### Tipos de mensajes

Los mensajes de muestreo no están limitados solo a texto sino que también puedes enviar imágenes y audio. Así es cómo se ve diferente el JSON-RPC:

**Texto**

```json
{
  "type": "text",
  "text": "The message content"
}
```

**Contenido de imagen**

```json
{
  "type": "image",
  "data": "base64-encoded-image-data",
  "mimeType": "image/jpeg"
}
```

**Contenido de audio**

```json
{
  "type": "audio",
  "data": "base64-encoded-audio-data",
  "mimeType": "audio/wav"
}
```

> NOTE: para más información detallada sobre Muestreo, revisa la [documentación oficial](https://modelcontextprotocol.io/specification/2025-11-25/client/sampling)

## Cómo Configurar Muestreo en el Cliente

> Nota: si solo estás construyendo un servidor, no necesitas hacer mucho aquí.

En un cliente, necesitas especificar la siguiente característica de esta manera:

```json
{
  "capabilities": {
    "sampling": {}
  }
}
```

Esto será detectado cuando tu cliente elegido se inicialice con el servidor.

## Ejemplo de Muestreo en Acción - Crear un Blog

Vamos a codificar un servidor de muestreo juntos, necesitaremos hacer lo siguiente:

1. Crear una herramienta en el Servidor.
1. Dicha herramienta debe crear una solicitud de muestreo.
1. La herramienta debe esperar a que se responda la solicitud de muestreo del cliente.
1. Luego se debe producir el resultado de la herramienta.

Veamos el código paso a paso:

### -1- Crear la herramienta

**python**

```python
@mcp.tool()
async def create_blog(title: str, content: str, ctx: Context[ServerSession, None]) -> str:
    """Create a blog post and generate a summary"""

```

### -2- Crear una solicitud de muestreo

Extiende tu herramienta con el siguiente código:

**python**

```python
post = BlogPost(
        id=len(posts) + 1,
        title=title,
        content=content,
        abstract=""
    )

prompt = f"Create an abstract of the following blog post: title: {title} and draft: {content} "

result = await ctx.session.create_message(
        messages=[
            SamplingMessage(
                role="user",
                content=TextContent(type="text", text=prompt),
            )
        ],
        max_tokens=100,
)

```

### -3- Esperar la respuesta y devolverla

**python**

```python
post.abstract = result.content.text

posts.append(post)

# devuelve el producto completo
return json.dumps({
    "id": post.title,
    "abstract": post.abstract
})
```

### -4- Código completo

**python**

```python
from starlette.applications import Starlette
from starlette.routing import Mount, Host

from mcp.server.fastmcp import Context, FastMCP

from mcp.server.session import ServerSession
from mcp.types import SamplingMessage, TextContent

import json


from uuid import uuid4
from typing import List
from pydantic import BaseModel


mcp = FastMCP("Blog post generator")

# app = FastAPI()

posts = []

class BlogPost(BaseModel):
    id: int
    title: str
    content: str
    abstract: str

posts: List[BlogPost] = []

@mcp.tool()
async def create_blog(title: str, content: str, ctx: Context[ServerSession, None]) -> str:
    """Create a blog post and generate a summary"""

    post = BlogPost(
        id=len(posts) + 1,
        title=title,
        content=content,
        abstract=""
    )

    prompt = f"Create an abstract of the following blog post: title: {title} and draft: {content} "

    result = await ctx.session.create_message(
        messages=[
            SamplingMessage(
                role="user",
                content=TextContent(type="text", text=prompt),
            )
        ],
        max_tokens=100,
    )

    post.abstract = result.content.text

    posts.append(post)

    # devolver la publicación completa del blog
    return json.dumps({
        "id": post.title,
        "abstract": post.abstract
    })

if __name__ == "__main__":
    print("Starting server...")
    # mcp.run()
    mcp.run(transport="streamable-http")

# ejecuta la aplicación con: python server.py
```

### -5- Probarlo en Visual Studio Code

Para probar esto en Visual Studio Code, haz lo siguiente:

1. Inicia el servidor en la terminal
1. Agrégalo a *mcp.json* (y asegúrate que esté iniciado) algo así:

   ```json
   "servers": {
      "blog-server": {
        "type": "http",
        "url": "http://localhost:8000/mcp"
      }
   }
   ```

1. Escribe un prompt:

   ```text
   create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
   ```

1. Permite que suceda el muestreo. La primera vez que lo pruebes verás un diálogo adicional que debes aceptar, luego verás el diálogo normal que te pide ejecutar una herramienta.

1. Inspecciona los resultados. Verás los resultados tanto bien renderizados en GitHub Copilot Chat como también puedes inspeccionar la respuesta JSON cruda.

**Bonus**. Las herramientas de Visual Studio Code tienen gran soporte para muestreo. Puedes configurar el acceso de Muestreo en tu servidor instalado navegando así:

1. Navega a la sección de extensiones.
1. Selecciona el ícono de engranaje para tu servidor instalado en la sección "MCP SERVERS - INSTALLED".
1 Selecciona "Configure Model Access", aquí puedes seleccionar qué modelos GitHub Copilot puede usar al realizar muestreo. También puedes ver todas las solicitudes de muestreo recientes al seleccionar "Show Sampling requests".

## Tarea

En esta tarea, construirás un muestreo ligeramente diferente, concretamente una integración de muestreo que soporte generar una descripción de producto. Aquí está tu escenario:

**Escenario**: El trabajador de back office de un e-commerce necesita ayuda, le toma demasiado tiempo generar descripciones de producto. Por lo tanto, vas a construir una solución donde puedas llamar una herramienta "create_product" con "title" y "keywords" como argumentos y debe producir un producto completo incluyendo un campo "description" que debe ser poblado por un LLM del cliente.

TIP: usa lo que aprendiste anteriormente para construir este servidor y su herramienta usando una solicitud de muestreo.

## Solución

[Solution](./solution/README.md)

## Puntos Clave

El muestreo es una característica poderosa que permite al servidor delegar tareas al cliente cuando necesita la ayuda de un LLM.

## Qué sigue

- [Capítulo 4 - Implementación práctica](../../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->