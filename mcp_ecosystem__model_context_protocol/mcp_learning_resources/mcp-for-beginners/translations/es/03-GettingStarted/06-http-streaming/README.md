# Transmisión HTTPS con el Protocolo de Contexto de Modelo (MCP)

Este capítulo ofrece una guía completa para implementar una transmisión segura, escalable y en tiempo real con el Protocolo de Contexto de Modelo (MCP) usando HTTPS. Cubre la motivación para la transmisión, los mecanismos de transporte disponibles, cómo implementar HTTP transmisible en MCP, las mejores prácticas de seguridad, la migración desde SSE y orientación práctica para construir tus propias aplicaciones de transmisión MCP.

> **Mirando hacia adelante:** esta lección describe HTTP transmisible bajo la **Especificación MCP 2025-11-25**, donde se establece una sesión durante `initialize` y se fija con un encabezado `Mcp-Session-Id`. El candidato a lanzamiento `2026-07-28` elimina íntegramente el apretón de manos y el ID de sesión, haciendo que cada solicitud sea autosuficiente y enrutable a cualquier instancia de servidor sin sesiones adhesivas. Consulta [Qué cambia en MCP: El candidato a lanzamiento 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para más detalles.

## Mecanismos de Transporte y Transmisión en MCP

Esta sección explora los diferentes mecanismos de transporte disponibles en MCP y su papel en habilitar capacidades de transmisión para la comunicación en tiempo real entre clientes y servidores.

### ¿Qué es un Mecanismo de Transporte?

Un mecanismo de transporte define cómo se intercambian datos entre el cliente y el servidor. MCP soporta múltiples tipos de transporte para adaptarse a diferentes entornos y requerimientos:

- **stdio**: Entrada/salida estándar, adecuado para herramientas locales y basadas en CLI. Simple pero no adecuado para web o nube.
- **SSE (Server-Sent Events)**: Permite a los servidores enviar actualizaciones en tiempo real a los clientes sobre HTTP. Bueno para interfaces web, pero limitado en escalabilidad y flexibilidad. Según la Especificación MCP 2025-06-18, el transporte SSE (Server-Sent Events) independiente ha sido desaprobado y reemplazado por el transporte "HTTP transmisible".
- **HTTP transmisible**: Transporte moderno basado en HTTP para transmisión, soporta notificaciones y mejor escalabilidad. Recomendado para la mayoría de escenarios productivos y en la nube.

### Tabla Comparativa

Echa un vistazo a la tabla comparativa a continuación para entender las diferencias entre estos mecanismos de transporte:

| Transporte        | Actualizaciones en Tiempo Real | Transmisión | Escalabilidad | Caso de Uso               |
|-------------------|-------------------------------|-------------|---------------|---------------------------|
| stdio             | No                            | No          | Baja          | Herramientas CLI locales  |
| SSE               | Sí                            | Sí          | Media         | Web, actualizaciones en tiempo real |
| HTTP transmisible | Sí                            | Sí          | Alta          | Nube, múltiples clientes  |

> **Consejo:** Elegir el transporte correcto impacta en el rendimiento, escalabilidad y experiencia del usuario. **HTTP transmisible** es recomendado para aplicaciones modernas, escalables y listas para la nube.

Observa los transportes stdio y SSE que se te mostraron en capítulos anteriores y cómo HTTP transmisible es el transporte cubierto en este capítulo.

## Transmisión: Conceptos y Motivación

Entender los conceptos fundamentales y la motivación detrás de la transmisión es esencial para implementar sistemas de comunicación en tiempo real efectivos.

**La transmisión** es una técnica en programación de redes que permite enviar y recibir datos en pequeños fragmentos manejables o como una secuencia de eventos, en lugar de esperar a que toda una respuesta esté lista. Esto es especialmente útil para:

- Archivos o conjuntos de datos grandes.
- Actualizaciones en tiempo real (por ejemplo, chat, barras de progreso).
- Cálculos de larga duración donde deseas mantener informado al usuario.

Esto es lo que necesitas saber sobre la transmisión a alto nivel:

- Los datos se entregan progresivamente, no todos a la vez.
- El cliente puede procesar datos conforme llegan.
- Reduce la latencia percibida y mejora la experiencia del usuario.

### ¿Por qué usar transmisión?

Las razones para usar transmisión son las siguientes:

- Los usuarios reciben retroalimentación inmediata, no solo al final.
- Habilita aplicaciones en tiempo real e interfaces reactivas.
- Uso más eficiente de recursos de red y computación.

### Ejemplo Simple: Servidor y Cliente de Transmisión HTTP

Aquí tienes un ejemplo simple de cómo se puede implementar la transmisión:

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

Este ejemplo demuestra un servidor que envía una serie de mensajes al cliente a medida que están disponibles, en lugar de esperar a que todos los mensajes estén listos.

**Cómo funciona:**

- El servidor envía cada mensaje a medida que está listo.
- El cliente recibe y muestra cada fragmento a medida que llega.

**Requisitos:**

- El servidor debe usar una respuesta de transmisión (por ejemplo, `StreamingResponse` en FastAPI).
- El cliente debe procesar la respuesta como flujo (`stream=True` en requests).
- El Content-Type suele ser `text/event-stream` o `application/octet-stream`.

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

**Notas de Implementación en Java:**

- Usa la pila reactiva de Spring Boot con `Flux` para transmisión
- `ServerSentEvent` provee streaming de eventos estructurado con tipos de evento
- `WebClient` con `bodyToFlux()` permite consumo reactivo en streaming
- `delayElements()` simula tiempo de procesamiento entre eventos
- Los eventos pueden tener tipos (`info`, `result`) para mejor manejo en cliente

### Comparación: Transmisión Clásica vs Transmisión MCP

Las diferencias entre cómo funciona la transmisión en un modo "clásico" versus cómo funciona en MCP pueden representarse así:

| Característica          | Transmisión HTTP Clásica        | Transmisión MCP (Notificaciones)    |
|------------------------|---------------------------------|------------------------------------|
| Respuesta principal    | Por fragmentos                  | Única, al final                     |
| Actualizaciones de progreso | Enviadas como fragmentos de datos | Enviadas como notificaciones       |
| Requerimientos del cliente | Debe procesar el flujo          | Debe implementar un manejador de mensajes |
| Caso de uso            | Archivos grandes, flujo de tokens AI | Progreso, logs, retroalimentación en tiempo real |

### Diferencias Clave Observadas

Además, aquí hay algunas diferencias clave:

- **Patrón de Comunicación:**
  - Transmisión HTTP clásica: Usa codificación por transferencia en fragmentos simple para enviar datos en pedazos
  - Transmisión MCP: Usa un sistema estructurado de notificaciones con protocolo JSON-RPC

- **Formato del Mensaje:**
  - HTTP clásico: Fragmentos de texto plano con saltos de línea
  - MCP: Objetos estructurados LoggingMessageNotification con metadatos

- **Implementación Cliente:**
  - HTTP clásico: Cliente simple que procesa respuestas en streaming
  - MCP: Cliente más sofisticado con manejador de mensajes para procesar tipos diferentes de mensajes

- **Actualizaciones de Progreso:**
  - HTTP clásico: El progreso es parte del flujo principal de la respuesta
  - MCP: El progreso se envía mediante mensajes de notificación separados mientras la respuesta principal llega al final

### Recomendaciones

Hay algunas recomendaciones para elegir entre implementar transmisión clásica (como el endpoint mostrado arriba usando `/stream`) o elegir transmisión mediante MCP.

- **Para necesidades simples de transmisión:** La transmisión HTTP clásica es más sencilla de implementar y suficiente para necesidades básicas.

- **Para aplicaciones complejas e interactivas:** La transmisión MCP proporciona un enfoque más estructurado con metadatos más ricos y separación entre notificaciones y resultados finales.

- **Para aplicaciones de IA:** El sistema de notificaciones de MCP es especialmente útil para tareas de IA de larga duración donde quieres mantener a los usuarios informados del progreso.

## Transmisión en MCP

Bien, hasta aquí has visto recomendaciones y comparaciones sobre la diferencia entre la transmisión clásica y la transmisión en MCP. Vamos a detallar exactamente cómo puedes aprovechar la transmisión en MCP.

Entender cómo funciona la transmisión dentro del marco MCP es esencial para construir aplicaciones reactivas que provean retroalimentación en tiempo real a los usuarios durante operaciones de larga duración.

En MCP, la transmisión no trata de enviar la respuesta principal en fragmentos, sino de enviar **notificaciones** al cliente mientras una herramienta está procesando una petición. Estas notificaciones pueden incluir actualizaciones de progreso, registros u otros eventos.

### Cómo Funciona

El resultado principal aún se envía como una única respuesta. Sin embargo, las notificaciones pueden ser enviadas como mensajes separados durante el procesamiento para actualizar al cliente en tiempo real. El cliente debe ser capaz de manejar y mostrar estas notificaciones.

## ¿Qué es una Notificación?

Dijimos "Notificación", ¿qué significa eso en el contexto de MCP?

Una notificación es un mensaje enviado desde el servidor al cliente para informar sobre el progreso, estado u otros eventos durante una operación de larga duración. Las notificaciones mejoran la transparencia y la experiencia del usuario.

Por ejemplo, se supone que un cliente debe enviar una notificación una vez que el apretón de manos inicial con el servidor se haya realizado.

Una notificación se ve así como un mensaje JSON:

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

Para que el registro funcione, el servidor necesita habilitarlo como característica/capacidad de esta forma:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Dependiendo del SDK utilizado, el registro puede estar habilitado por defecto, o puede ser necesario habilitarlo explícitamente en la configuración del servidor.

Existen diferentes tipos de notificaciones:

| Nivel     | Descripción                   | Caso de Uso Ejemplo          |
|-----------|------------------------------|-----------------------------|
| debug     | Información detallada de depuración | Puntos de entrada/salida de funciones |
| info      | Mensajes informativos generales | Actualizaciones de progreso de operaciones |
| notice    | Eventos normales pero significativos | Cambios de configuración       |
| warning   | Condiciones de advertencia    | Uso de característica obsoleta |
| error     | Condiciones de error          | Fallos en la operación       |
| critical  | Condiciones críticas          | Fallos de componentes del sistema |
| alert     | Acción debe tomarse inmediatamente | Corrupción de datos detectada |
| emergency | Sistema inutilizable          | Fallo completo del sistema   |

## Implementación de Notificaciones en MCP

Para implementar notificaciones en MCP, necesitas configurar tanto el lado del servidor como el del cliente para manejar actualizaciones en tiempo real. Esto permite que tu aplicación proporcione retroalimentación inmediata a los usuarios durante operaciones de larga duración.

### Lado Servidor: Envío de Notificaciones

Comencemos con el lado del servidor. En MCP, defines herramientas que pueden enviar notificaciones mientras procesan peticiones. El servidor usa el objeto de contexto (usualmente `ctx`) para enviar mensajes al cliente.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

En el ejemplo anterior, la herramienta `process_files` envía tres notificaciones al cliente mientras procesa cada archivo. El método `ctx.info()` se utiliza para enviar mensajes informativos.

Además, para habilitar las notificaciones, asegúrate que tu servidor use un transporte de transmisión (como `streamable-http`) y que tu cliente implemente un manejador de mensajes para procesar notificaciones. Así es como puedes configurar el servidor para usar el transporte `streamable-http`:

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

Para habilitar notificaciones en tu servidor MCP .NET, asegúrate de usar un transporte de transmisión:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lado Cliente: Recepción de Notificaciones

El cliente debe implementar un manejador de mensajes para procesar y mostrar las notificaciones a medida que llegan.

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

En el código anterior, la función `message_handler` verifica si el mensaje entrante es una notificación. Si lo es, imprime la notificación; de lo contrario, lo procesa como un mensaje normal del servidor. También observa cómo `ClientSession` se inicializa con el `message_handler` para manejar notificaciones entrantes.

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

En este ejemplo .NET, la función `MessageHandler` verifica si el mensaje entrante es una notificación. Si lo es, imprime la notificación; de lo contrario, lo procesa como un mensaje normal del servidor. `ClientSession` se inicializa con el manejador de mensajes vía `ClientSessionOptions`.

Para habilitar notificaciones, asegúrate que tu servidor use un transporte de transmisión (como `streamable-http`) y que tu cliente implemente un manejador de mensajes para procesarlas.

## Notificaciones de Progreso y Escenarios

Esta sección explica el concepto de notificaciones de progreso en MCP, por qué son importantes y cómo implementarlas usando HTTP transmisible. También encontrarás una tarea práctica para reforzar tu comprensión.

Las notificaciones de progreso son mensajes en tiempo real enviados del servidor al cliente durante operaciones de larga duración. En lugar de esperar a que todo el proceso termine, el servidor mantiene al cliente actualizado sobre el estado actual. Esto mejora la transparencia, la experiencia del usuario y facilita la depuración.

**Ejemplo:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### ¿Por qué usar notificaciones de progreso?

Las notificaciones de progreso son esenciales por varias razones:

- **Mejor experiencia del usuario:** Los usuarios ven actualizaciones conforme avanza el trabajo, no solo al final.
- **Retroalimentación en tiempo real:** Los clientes pueden mostrar barras de progreso o registros, haciendo que la aplicación parezca más receptiva.
- **Depuración y monitoreo más fáciles:** Desarrolladores y usuarios pueden ver dónde un proceso podría estar lento o atascado.

### Cómo implementar notificaciones de progreso

Aquí tienes cómo puedes implementar notificaciones de progreso en MCP:

- **En el servidor:** Usa `ctx.info()` o `ctx.log()` para enviar notificaciones a medida que cada elemento se procesa. Esto envía un mensaje al cliente antes de que el resultado principal esté listo.
- **En el cliente:** Implementa un manejador de mensajes que escuche y muestre las notificaciones conforme llegan. Este manejador distingue entre notificaciones y el resultado final.

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

## Consideraciones de Seguridad

Al implementar servidores MCP con transportes basados en HTTP, la seguridad se convierte en una preocupación primordial que requiere una atención cuidadosa a múltiples vectores de ataque y mecanismos de protección.

### Visión General

La seguridad es crítica al exponer servidores MCP sobre HTTP. HTTP transmisible introduce nuevas superficies de ataque y requiere una configuración cuidadosa.

### Puntos Clave


- **Validación del encabezado Origin**: Siempre valida el encabezado `Origin` para prevenir ataques de rebinding DNS.
- **Vinculación a localhost**: Para el desarrollo local, vincula los servidores a `localhost` para evitar exponerlos a internet pública.
- **Autenticación**: Implementa autenticación (por ejemplo, claves API, OAuth) para despliegues en producción.
- **CORS**: Configura políticas de intercambio de recursos de origen cruzado (CORS) para restringir el acceso.
- **HTTPS**: Usa HTTPS en producción para cifrar el tráfico.

### Mejores Prácticas

- Nunca confíes en solicitudes entrantes sin validación.
- Registra y monitorea todo acceso y errores.
- Actualiza regularmente las dependencias para parchear vulnerabilidades de seguridad.

### Desafíos

- Equilibrar la seguridad con la facilidad de desarrollo
- Asegurar compatibilidad con diversos entornos de cliente

## Actualización de SSE a Streamable HTTP

Para aplicaciones que actualmente usan Server-Sent Events (SSE), migrar a Streamable HTTP ofrece capacidades mejoradas y una sostenibilidad a largo plazo mejor para tus implementaciones MCP.

### ¿Por qué actualizar?

Hay dos razones convincentes para actualizar de SSE a Streamable HTTP:

- Streamable HTTP ofrece mejor escalabilidad, compatibilidad y soporte para notificaciones más completas que SSE.
- Es el transporte recomendado para nuevas aplicaciones MCP.

### Pasos para la migración

Así es como puedes migrar de SSE a Streamable HTTP en tus aplicaciones MCP:

- **Actualiza el código del servidor** para usar `transport="streamable-http"` en `mcp.run()`.
- **Actualiza el código del cliente** para usar `streamablehttp_client` en lugar del cliente SSE.
- **Implementa un manejador de mensajes** en el cliente para procesar notificaciones.
- **Prueba la compatibilidad** con herramientas y flujos de trabajo existentes.

### Manteniendo la compatibilidad

Se recomienda mantener la compatibilidad con clientes SSE existentes durante el proceso de migración. Aquí algunas estrategias:

- Puedes soportar tanto SSE como Streamable HTTP ejecutando ambos transportes en diferentes endpoints.
- Migra gradualmente los clientes al nuevo transporte.

### Desafíos

Asegúrate de atender los siguientes desafíos durante la migración:

- Asegurar que todos los clientes estén actualizados
- Manejar diferencias en la entrega de notificaciones

## Consideraciones de Seguridad

La seguridad debe ser una prioridad al implementar cualquier servidor, especialmente cuando se usan transportes basados en HTTP como Streamable HTTP en MCP.

Al implementar servidores MCP con transportes basados en HTTP, la seguridad se vuelve una preocupación primordial que requiere atención cuidadosa a múltiples vectores de ataque y mecanismos de protección.

### Visión general

La seguridad es crítica al exponer servidores MCP sobre HTTP. Streamable HTTP introduce nuevas superficies de ataque y requiere configuración cuidadosa.

Aquí algunas consideraciones clave de seguridad:

- **Validación del encabezado Origin**: Siempre valida el encabezado `Origin` para prevenir ataques de rebinding DNS.
- **Vinculación a localhost**: Para el desarrollo local, vincula los servidores a `localhost` para evitar exponerlos a internet pública.
- **Autenticación**: Implementa autenticación (por ejemplo, claves API, OAuth) para despliegues en producción.
- **CORS**: Configura políticas de intercambio de recursos de origen cruzado (CORS) para restringir el acceso.
- **HTTPS**: Usa HTTPS en producción para cifrar el tráfico.

### Mejores Prácticas

Adicionalmente, aquí algunas mejores prácticas para seguir al implementar seguridad en tu servidor de streaming MCP:

- Nunca confíes en solicitudes entrantes sin validación.
- Registra y monitorea todo acceso y errores.
- Actualiza regularmente las dependencias para parchear vulnerabilidades de seguridad.

### Desafíos

Enfrentarás algunos desafíos al implementar seguridad en servidores de streaming MCP:

- Equilibrar la seguridad con la facilidad de desarrollo
- Asegurar compatibilidad con diversos entornos de cliente

### Ejercicio: Construye tu propia aplicación MCP streaming

**Escenario:**
Construye un servidor y cliente MCP donde el servidor procese una lista de ítems (por ejemplo, archivos o documentos) y envíe una notificación por cada ítem procesado. El cliente debe mostrar cada notificación a medida que llega.

**Pasos:**

1. Implementa una herramienta servidor que procese una lista y envíe notificaciones por cada ítem.
2. Implementa un cliente con un manejador de mensajes para mostrar las notificaciones en tiempo real.
3. Prueba tu implementación ejecutando servidor y cliente, y observa las notificaciones.

[Solución](./solution/README.md)

## Lecturas adicionales y ¿qué sigue?

Para continuar tu camino con MCP streaming y expandir tu conocimiento, esta sección ofrece recursos adicionales y pasos sugeridos para construir aplicaciones más avanzadas.

### Lecturas adicionales

- [Microsoft: Introducción al Streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS en ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Solicitudes en Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### ¿Qué sigue?

- Intenta construir herramientas MCP más avanzadas que usen streaming para análisis en tiempo real, chat o edición colaborativa.
- Explora integrar MCP streaming con frameworks frontend (React, Vue, etc.) para actualizaciones de UI en vivo.
- Siguiente: [Uso del kit de herramientas AI para VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->