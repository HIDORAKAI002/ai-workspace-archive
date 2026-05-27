# HTTPS Streaming con el Protocolo de Contexto del Modelo (MCP)

Este capítulo ofrece una guía completa para implementar streaming seguro, escalable y en tiempo real con el Protocolo de Contexto del Modelo (MCP) usando HTTPS. Cubre la motivación para el streaming, los mecanismos de transporte disponibles, cómo implementar HTTP transmisible en MCP, mejores prácticas de seguridad, migración desde SSE y orientación práctica para construir tus propias aplicaciones de streaming MCP.

## Mecanismos de transporte y streaming en MCP

Esta sección explora los diferentes mecanismos de transporte disponibles en MCP y su papel para habilitar capacidades de streaming para la comunicación en tiempo real entre clientes y servidores.

### ¿Qué es un mecanismo de transporte?

Un mecanismo de transporte define cómo se intercambian los datos entre el cliente y el servidor. MCP soporta múltiples tipos de transporte para adaptarse a diferentes entornos y requisitos:

- **stdio**: Entrada/salida estándar, adecuado para herramientas locales y basadas en CLI. Simple, pero no apto para web o nube.
- **SSE (Server-Sent Events)**: Permite a los servidores enviar actualizaciones en tiempo real a los clientes a través de HTTP. Bueno para interfaces web, pero limitado en escalabilidad y flexibilidad. A partir de la Especificación MCP 2025-06-18, el transporte SSE independiente ha sido descontinuado y reemplazado por el transporte "HTTP transmisible".
- **HTTP transmisible**: Transporte de streaming basado en HTTP moderno, soporta notificaciones y mejor escalabilidad. Recomendado para la mayoría de escenarios de producción y nube.

### Tabla comparativa

Observa la tabla comparativa a continuación para entender las diferencias entre estos mecanismos de transporte:

| Transporte        | Actualizaciones en tiempo real | Streaming | Escalabilidad | Caso de uso              |
|-------------------|-------------------------------|-----------|---------------|-------------------------|
| stdio             | No                            | No        | Bajo          | Herramientas locales CLI |
| SSE               | Sí                            | Sí        | Medio         | Web, actualizaciones en tiempo real |
| HTTP transmisible | Sí                            | Sí        | Alto          | Nube, multi-cliente      |

> **Consejo:** Elegir el transporte correcto impacta en el rendimiento, escalabilidad y experiencia de usuario. Se recomienda **HTTP transmisible** para aplicaciones modernas, escalables y preparadas para la nube.

Nota los transportes stdio y SSE que se mostraron en capítulos anteriores y cómo HTTP transmisible es el transporte que se cubre en este capítulo.

## Streaming: Conceptos y Motivación

Comprender los conceptos fundamentales y motivaciones detrás del streaming es esencial para implementar sistemas de comunicación en tiempo real efectivos.

**Streaming** es una técnica en programación de redes que permite enviar y recibir datos en fragmentos pequeños y manejables o como una secuencia de eventos, en lugar de esperar a que toda la respuesta esté lista. Esto es especialmente útil para:

- Archivos grandes o grandes conjuntos de datos.
- Actualizaciones en tiempo real (p. ej., chat, barras de progreso).
- Cálculos de larga duración donde se quiere mantener informado al usuario.

Esto es lo que necesitas saber sobre streaming a alto nivel:

- Los datos se entregan progresivamente, no todos a la vez.
- El cliente puede procesar datos a medida que llegan.
- Reduce la latencia percibida y mejora la experiencia de usuario.

### ¿Por qué usar streaming?

Las razones para usar streaming son las siguientes:

- Los usuarios reciben retroalimentación inmediatamente, no solo al final.
- Habilita aplicaciones en tiempo real e interfaces receptivas.
- Uso más eficiente de recursos de red y cómputo.

### Ejemplo simple: servidor y cliente HTTP streaming

Aquí hay un ejemplo simple de cómo se puede implementar streaming:

#### Python

**Servidor (Python, usando FastAPI y StreamingResponse):**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**Cliente (Python, usando requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Este ejemplo demuestra un servidor que envía una serie de mensajes al cliente a medida que están disponibles, en vez de esperar a que todos los mensajes estén listos.

**Cómo funciona:**

- El servidor produce (yield) cada mensaje cuando está listo.
- El cliente recibe e imprime cada fragmento a medida que llega.

**Requisitos:**

- El servidor debe usar una respuesta en streaming (por ejemplo, `StreamingResponse` en FastAPI).
- El cliente debe procesar la respuesta como un stream (`stream=True` en requests).
- Content-Type suele ser `text/event-stream` o `application/octet-stream`.

#### Java

**Servidor (Java, usando Spring Boot y Server-Sent Events):**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```

**Cliente (Java, usando Spring WebFlux WebClient):**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```

**Notas de implementación en Java:**

- Usa la pila reactiva de Spring Boot con `Flux` para streaming.
- `ServerSentEvent` provee streaming de eventos estructurados con tipos de eventos.
- `WebClient` con `bodyToFlux()` habilita consumo reactivo de streaming.
- `delayElements()` simula tiempo de procesamiento entre eventos.
- Eventos pueden tener tipos (`info`, `result`) para mejor manejo en el cliente.

### Comparación: Streaming clásico vs Streaming MCP

Las diferencias entre cómo funciona el streaming "clásico" versus cómo funciona en MCP pueden representarse así:

| Característica          | Streaming HTTP Clásico           | Streaming MCP (Notificaciones)    |
|------------------------|---------------------------------|----------------------------------|
| Respuesta principal    | Fragmentada (chunked)            | Única, al final                  |
| Actualizaciones de progreso | Enviadas como fragmentos de datos | Enviadas como notificaciones     |
| Requisitos del cliente  | Debe procesar el stream          | Debe implementar un manejador de mensajes |
| Caso de uso             | Archivos grandes, flujos de tokens AI | Progreso, logs, retroalimentación en tiempo real |

### Diferencias clave observadas

Además, aquí algunas diferencias clave:

- **Patrón de comunicación:**
  - Streaming HTTP clásico: Usa codificación chunked simple para enviar datos en fragmentos.
  - Streaming MCP: Usa un sistema estructurado de notificaciones con protocolo JSON-RPC.

- **Formato del mensaje:**
  - HTTP clásico: fragmentos de texto plano con saltos de línea.
  - MCP: objetos estructurados LoggingMessageNotification con metadatos.

- **Implementación cliente:**
  - HTTP clásico: Cliente simple que procesa respuestas en streaming.
  - MCP: Cliente más sofisticado con manejador de mensajes para procesar diferentes tipos de mensajes.

- **Actualizaciones de progreso:**
  - HTTP clásico: El progreso es parte del stream principal de respuesta.
  - MCP: El progreso se envía vía mensajes de notificación separados mientras la respuesta principal llega al final.

### Recomendaciones

Algunas recomendaciones sobre elegir entre implementar streaming clásico (como el endpoint mostrado arriba usando `/stream`) versus streaming vía MCP:

- **Para necesidades simples de streaming:** El streaming HTTP clásico es más simple de implementar y suficiente para necesidades básicas.

- **Para aplicaciones complejas e interactivas:** El streaming MCP provee un enfoque más estructurado con metadatos enriquecidos y separación entre notificaciones y resultados finales.

- **Para aplicaciones de IA:** El sistema de notificaciones de MCP es particularmente útil para tareas de IA de larga duración donde quieres mantener informados a los usuarios sobre el progreso.

## Streaming en MCP

Bien, ya viste recomendaciones y comparaciones sobre la diferencia entre streaming clásico y streaming en MCP. Ahora entraremos en detalle sobre cómo puedes aprovechar el streaming en MCP.

Entender cómo funciona el streaming dentro del marco MCP es esencial para construir aplicaciones responsivas que proporcionen retroalimentación en tiempo real a usuarios durante operaciones de larga duración.

En MCP, el streaming no se trata de enviar la respuesta principal en fragmentos, sino de enviar **notificaciones** al cliente mientras una herramienta procesa una solicitud. Estas notificaciones pueden incluir actualizaciones de progreso, logs u otros eventos.

### Cómo funciona

El resultado principal se envía aún como una única respuesta. Sin embargo, las notificaciones pueden enviarse como mensajes separados durante el procesamiento y de esta manera actualizar al cliente en tiempo real. El cliente debe poder manejar y mostrar estas notificaciones.

## ¿Qué es una notificación?

Mencionamos "Notificación", ¿qué significa eso en el contexto de MCP?

Una notificación es un mensaje enviado del servidor al cliente para informar sobre progreso, estado u otros eventos durante una operación de larga duración. Las notificaciones mejoran la transparencia y la experiencia del usuario.

Por ejemplo, un cliente debería enviar una notificación una vez que se ha hecho el handshake inicial con el servidor.

Una notificación se ve así en un mensaje JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Las notificaciones pertenecen a un tema en MCP referido como ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Para que el logging funcione, el servidor necesita habilitarlo como característica/capacidad así:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Dependiendo del SDK usado, el logging podría estar habilitado por defecto o podría ser necesario habilitarlo explícitamente en la configuración del servidor.

Existen diferentes tipos de notificaciones:

| Nivel      | Descripción                   | Caso de uso ejemplo           |
|------------|-------------------------------|------------------------------|
| debug      | Información detallada de depuración | Puntos de entrada/salida de funciones |
| info       | Mensajes informativos generales | Actualizaciones de progreso  |
| notice     | Eventos normales pero significativos | Cambios en configuración    |
| warning    | Condiciones de advertencia    | Uso de característica obsoleta |
| error      | Condiciones de error          | Fallos en operaciones        |
| critical   | Condiciones críticas          | Fallos de componentes del sistema |
| alert      | Acción inmediata requerida    | Detección de corrupción de datos |
| emergency  | Sistema inutilizable          | Fallo total del sistema      |

## Implementando notificaciones en MCP

Para implementar notificaciones en MCP, necesitas configurar tanto el servidor como el cliente para manejar actualizaciones en tiempo real. Esto permite que tu aplicación brinde retroalimentación inmediata a los usuarios durante operaciones de larga duración.

### Lado servidor: Enviar notificaciones

Comencemos por el lado servidor. En MCP, defines herramientas que pueden enviar notificaciones mientras procesan solicitudes. El servidor usa el objeto de contexto (usualmente `ctx`) para enviar mensajes al cliente.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

En el ejemplo anterior, la herramienta `process_files` envía tres notificaciones al cliente mientras procesa cada archivo. El método `ctx.info()` se usa para enviar mensajes informativos.

Además, para habilitar las notificaciones, asegúrate que tu servidor use un transporte en streaming (como `streamable-http`) y que tu cliente implemente un manejador de mensajes para procesar notificaciones. Aquí está cómo puedes configurar el servidor para usar el transporte `streamable-http`:

```python
mcp.run(transport="streamable-http")
```

#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```

En este ejemplo .NET, la herramienta `ProcessFiles` está decorada con el atributo `Tool` y envía tres notificaciones al cliente mientras procesa cada archivo. El método `ctx.Info()` se usa para enviar mensajes informativos.

Para habilitar notificaciones en tu servidor MCP .NET, asegúrate de usar un transporte en streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lado cliente: Recibir notificaciones

El cliente debe implementar un manejador de mensajes para procesar y mostrar notificaciones conforme llegan.

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```

En el código anterior, la función `message_handler` verifica si el mensaje entrante es una notificación. Si lo es, imprime la notificación; de lo contrario, la procesa como un mensaje normal del servidor. También nota cómo `ClientSession` se inicializa con `message_handler` para manejar las notificaciones entrantes.

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```

En este ejemplo .NET, la función `MessageHandler` verifica si el mensaje entrante es una notificación. Si lo es, la imprime; de lo contrario, la procesa como un mensaje del servidor normal. `ClientSession` se inicializa con el manejador de mensajes vía `ClientSessionOptions`.

Para habilitar las notificaciones, asegúrate que tu servidor use un transporte en streaming (como `streamable-http`) y que tu cliente implemente un manejador de mensajes para procesar notificaciones.

## Notificaciones de progreso y escenarios

Esta sección explica el concepto de notificaciones de progreso en MCP, por qué son importantes y cómo implementarlas usando HTTP transmisible. También encontrarás un ejercicio práctico para reforzar tu comprensión.

Las notificaciones de progreso son mensajes en tiempo real enviados desde el servidor al cliente durante operaciones de larga duración. En vez de esperar a que todo el proceso termine, el servidor mantiene al cliente actualizado sobre el estado actual. Esto mejora la transparencia, la experiencia de usuario y facilita la depuración.

**Ejemplo:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### ¿Por qué usar notificaciones de progreso?

Las notificaciones de progreso son esenciales por varias razones:

- **Mejor experiencia de usuario:** Los usuarios ven actualizaciones conforme avanza el trabajo, no solo al final.
- **Retroalimentación en tiempo real:** Los clientes pueden mostrar barras de progreso o logs, haciendo que la app se sienta responsiva.
- **Depuración y monitoreo más sencillo:** Desarrolladores y usuarios pueden ver dónde podría estar lento o atascado un proceso.

### Cómo implementar notificaciones de progreso

Así puedes implementar notificaciones de progreso en MCP:

- **En el servidor:** Usa `ctx.info()` o `ctx.log()` para enviar notificaciones a medida que se procesa cada ítem. Esto envía un mensaje al cliente antes de que el resultado final esté listo.
- **En el cliente:** Implementa un manejador de mensajes que escuche y muestre notificaciones conforme lleguen. Este manejador distingue entre notificaciones y el resultado final.

**Ejemplo servidor:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Ejemplo cliente:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Consideraciones de seguridad

Al implementar servidores MCP con transportes basados en HTTP, la seguridad se convierte en una preocupación primordial que requiere atención cuidadosa a múltiples vectores de ataque y mecanismos de protección.

### Resumen

La seguridad es crítica al exponer servidores MCP sobre HTTP. HTTP transmisible introduce nuevas superficies de ataque y requiere configuración cuidadosa.

### Puntos clave

- **Validación del encabezado Origin:** Siempre valida el encabezado `Origin` para prevenir ataques de rebindings DNS.
- **Vinculación a localhost:** Para desarrollo local, vincula los servidores a `localhost` para evitar exponerlos a internet público.
- **Autenticación:** Implementa autenticación (p. ej., claves API, OAuth) para despliegues en producción.
- **CORS:** Configura políticas de Cross-Origin Resource Sharing (CORS) para restringir el acceso.
- **HTTPS:** Usa HTTPS en producción para cifrar el tráfico.

### Mejores prácticas

- Nunca confíes en solicitudes entrantes sin validación.
- Registra y monitorea todo acceso y errores.
- Actualiza regularmente dependencias para parchear vulnerabilidades de seguridad.

### Desafíos
- Equilibrar la seguridad con la facilidad de desarrollo  
- Garantizar compatibilidad con diversos entornos cliente  

## Actualización de SSE a Streamable HTTP

Para aplicaciones que actualmente usan Server-Sent Events (SSE), migrar a Streamable HTTP ofrece capacidades mejoradas y una mejor sostenibilidad a largo plazo para tus implementaciones MCP.

### ¿Por qué actualizar?

Hay dos razones convincentes para actualizar de SSE a Streamable HTTP:

- Streamable HTTP ofrece mejor escalabilidad, compatibilidad y un soporte de notificaciones más completo que SSE.  
- Es el transporte recomendado para nuevas aplicaciones MCP.  

### Pasos para la migración

Aquí te mostramos cómo puedes migrar de SSE a Streamable HTTP en tus aplicaciones MCP:

- **Actualiza el código del servidor** para usar `transport="streamable-http"` en `mcp.run()`.  
- **Actualiza el código del cliente** para usar `streamablehttp_client` en lugar del cliente SSE.  
- **Implementa un manejador de mensajes** en el cliente para procesar las notificaciones.  
- **Prueba la compatibilidad** con las herramientas y flujos de trabajo existentes.  

### Mantener la compatibilidad

Se recomienda mantener la compatibilidad con los clientes SSE existentes durante el proceso de migración. Aquí algunas estrategias:

- Puedes soportar tanto SSE como Streamable HTTP ejecutando ambos transportes en diferentes endpoints.  
- Migra gradualmente los clientes al nuevo transporte.  

### Desafíos

Asegúrate de abordar los siguientes desafíos durante la migración:

- Asegurar que todos los clientes estén actualizados  
- Manejar las diferencias en la entrega de notificaciones  

## Consideraciones de Seguridad

La seguridad debe ser una prioridad máxima al implementar cualquier servidor, especialmente cuando se usan transportes basados en HTTP como Streamable HTTP en MCP.

Al implementar servidores MCP con transportes basados en HTTP, la seguridad se vuelve una preocupación primordial que requiere atención cuidadosa a múltiples vectores de ataque y mecanismos de protección.

### Resumen

La seguridad es crítica al exponer servidores MCP sobre HTTP. Streamable HTTP introduce nuevas superficies de ataque y requiere configuración cuidadosa.

Aquí algunas consideraciones clave de seguridad:

- **Validación del encabezado Origin**: Siempre valida el encabezado `Origin` para prevenir ataques de rebinding DNS.  
- **Vinculación a localhost**: Para desarrollo local, vincula los servidores a `localhost` para evitar exponerlos a internet público.  
- **Autenticación**: Implementa autenticación (p. ej., claves API, OAuth) para despliegues en producción.  
- **CORS**: Configura políticas de Cross-Origin Resource Sharing (CORS) para restringir el acceso.  
- **HTTPS**: Usa HTTPS en producción para cifrar el tráfico.  

### Mejores prácticas

Además, estas son algunas mejores prácticas a seguir al implementar seguridad en tu servidor de streaming MCP:

- Nunca confíes en solicitudes entrantes sin validación.  
- Registra y monitorea todos los accesos y errores.  
- Actualiza regularmente las dependencias para parchear vulnerabilidades de seguridad.  

### Desafíos

Enfrentarás algunos desafíos al implementar seguridad en servidores de streaming MCP:

- Equilibrar la seguridad con la facilidad de desarrollo  
- Garantizar compatibilidad con diversos entornos cliente  

### Asignación: Construye tu propia app MCP de streaming

**Escenario:**  
Construye un servidor y cliente MCP donde el servidor procese una lista de ítems (por ejemplo, archivos o documentos) y envíe una notificación por cada ítem procesado. El cliente debe mostrar cada notificación conforme llega.

**Pasos:**

1. Implementa una herramienta servidor que procese una lista y envíe notificaciones por ítem.  
2. Implementa un cliente con un manejador de mensajes para mostrar notificaciones en tiempo real.  
3. Prueba tu implementación ejecutando tanto el servidor como el cliente, y observa las notificaciones.  

[Solution](./solution/README.md)

## Lecturas adicionales y ¿qué sigue?

Para continuar tu recorrido con el streaming MCP y expandir tu conocimiento, esta sección ofrece recursos adicionales y pasos sugeridos para construir aplicaciones más avanzadas.

### Lecturas adicionales

- [Microsoft: Introducción al streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)  
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Microsoft: CORS en ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Python requests: Solicitudes con streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)  

### ¿Qué sigue?

- Intenta construir herramientas MCP más avanzadas que usen streaming para análisis en tiempo real, chat o edición colaborativa.  
- Explora integrar el streaming MCP con frameworks frontend (React, Vue, etc.) para actualizaciones de UI en vivo.  
- Siguiente: [Utilizar AI Toolkit para VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->