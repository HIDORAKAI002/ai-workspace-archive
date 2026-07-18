# Transmisión HTTPS con el Protocolo de Contexto de Modelo (MCP)

Este capítulo proporciona una guía completa para implementar transmisión segura, escalable y en tiempo real con el Protocolo de Contexto de Modelo (MCP) utilizando HTTPS. Cubre la motivación para la transmisión, los mecanismos de transporte disponibles, cómo implementar HTTP transmisible en MCP, las mejores prácticas de seguridad, la migración desde SSE y orientación práctica para construir tus propias aplicaciones MCP con transmisión.

> **Mirando hacia adelante:** esta lección describe HTTP transmisible bajo la **Especificación MCP 2025-11-25**, donde una sesión se establece durante `initialize` y se fija con un encabezado `Mcp-Session-Id`. La versión candidata `2026-07-28` elimina por completo el saludo inicial y el ID de sesión, haciendo que cada solicitud sea autónoma y direccionable a cualquier instancia del servidor sin sesiones pegajosas. Consulta [Qué Cambia en MCP: La Versión Candidata 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para más detalles.

## Mecanismos de Transporte y Transmisión en MCP

Esta sección explora los diferentes mecanismos de transporte disponibles en MCP y su papel en habilitar capacidades de transmisión para comunicación en tiempo real entre clientes y servidores.

### ¿Qué es un Mecanismo de Transporte?

Un mecanismo de transporte define cómo se intercambian datos entre el cliente y el servidor. MCP soporta múltiples tipos de transporte para adaptarse a diferentes entornos y requerimientos:

- **stdio**: Entrada/salida estándar, adecuado para herramientas locales y basadas en CLI. Simple pero no adecuado para web o nube.
- **SSE (Server-Sent Events)**: Permite a los servidores enviar actualizaciones en tiempo real a los clientes a través de HTTP. Bueno para interfaces web, pero limitado en escalabilidad y flexibilidad. Según la Especificación MCP 2025-06-18, el transporte SSE independiente ha sido desaprobado y reemplazado por transporte "HTTP Transmisible".
- **HTTP Transmisible**: Transporte de transmisión moderno basado en HTTP, soportando notificaciones y mejor escalabilidad. Recomendado para la mayoría de escenarios de producción y en la nube.

### Tabla Comparativa

Echa un vistazo a la tabla comparativa a continuación para entender las diferencias entre estos mecanismos de transporte:

| Transporte         | Actualizaciones en Tiempo Real | Transmisión | Escalabilidad | Caso de Uso              |
|-------------------|-------------------------------|-------------|---------------|--------------------------|
| stdio             | No                            | No          | Baja          | Herramientas CLI locales |
| SSE               | Sí                            | Sí          | Media         | Web, actualizaciones en tiempo real |
| HTTP Transmisible | Sí                            | Sí          | Alta          | Nube, multi-cliente      |

> **Consejo:** Elegir el transporte correcto impacta en el rendimiento, escalabilidad, y experiencia de usuario. Se recomienda **HTTP Transmisible** para aplicaciones modernas, escalables y listas para la nube.

Nota los transportes stdio y SSE que se mostraron en capítulos anteriores y cómo HTTP transmisible es el transporte cubierto en este capítulo.

## Transmisión: Conceptos y Motivación

Entender los conceptos fundamentales y motivaciones detrás de la transmisión es esencial para implementar sistemas de comunicación en tiempo real efectivos.

**Transmisión** es una técnica en programación de redes que permite enviar y recibir datos en pequeños bloques manejables o como una secuencia de eventos, en lugar de esperar a que una respuesta completa esté lista. Esto es especialmente útil para:

- Archivos o conjuntos de datos grandes.
- Actualizaciones en tiempo real (por ejemplo, chat, barras de progreso).
- Cómputos de larga duración donde deseas mantener al usuario informado.

Aquí está lo que necesitas saber sobre la transmisión a un nivel alto:

- Los datos se entregan progresivamente, no todos a la vez.
- El cliente puede procesar los datos conforme llegan.
- Reduce la latencia percibida y mejora la experiencia del usuario.

### ¿Por qué usar transmisión?

Las razones para usar transmisión son las siguientes:

- Los usuarios reciben retroalimentación inmediatamente, no solo al final.
- Permite aplicaciones en tiempo real e interfaces de usuario reactivas.
- Uso más eficiente de los recursos de red y cómputo.

### Ejemplo Simple: Servidor y Cliente HTTP de Transmisión

Aquí tienes un ejemplo simple de cómo se puede implementar transmisión:

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

Este ejemplo demuestra un servidor enviando una serie de mensajes al cliente a medida que están disponibles, en lugar de esperar a que todos los mensajes estén listos.

**Cómo funciona:**

- El servidor produce cada mensaje a medida que está listo.
- El cliente recibe e imprime cada bloque conforme llega.

**Requisitos:**

- El servidor debe usar una respuesta de transmisión (e.g., `StreamingResponse` en FastAPI).
- El cliente debe procesar la respuesta como un stream (`stream=True` en requests).
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

- Usa el stack reactivo de Spring Boot con `Flux` para transmisión
- `ServerSentEvent` provee transmisión estructurada de eventos con tipos de evento
- `WebClient` con `bodyToFlux()` habilita consumo reactivo de transmisión
- `delayElements()` simula tiempo de procesamiento entre eventos
- Los eventos pueden tener tipos (`info`, `result`) para mejor manejo del cliente

### Comparación: Transmisión Clásica vs Transmisión MCP

Las diferencias entre cómo funciona la transmisión de manera "clásica" frente a cómo funciona en MCP se pueden representar así:

| Característica           | Transmisión HTTP Clásica        | Transmisión MCP (Notificaciones) |
|-------------------------|--------------------------------|----------------------------------|
| Respuesta principal     | Fragmentada                    | Única, al final                  |
| Actualizaciones de progreso | Enviadas como fragmentos de datos | Enviadas como notificaciones     |
| Requisitos del cliente  | Debe procesar el stream        | Debe implementar un manejador de mensajes |
| Caso de uso             | Archivos grandes, transmisiones de tokens AI | Progreso, logs, retroalimentación en tiempo real |

### Diferencias Clave Observadas

Además, aquí hay algunas diferencias clave:

- **Patrón de Comunicación:**
  - Transmisión HTTP clásica: Usa codificación chunked para enviar datos en fragmentos
  - Transmisión MCP: Usa un sistema estructurado de notificaciones con protocolo JSON-RPC

- **Formato de Mensaje:**
  - HTTP clásica: Fragmentos de texto plano con saltos de línea
  - MCP: Objetos LoggingMessageNotification estructurados con metadatos

- **Implementación del Cliente:**
  - HTTP clásica: Cliente simple que procesa respuestas en streaming
  - MCP: Cliente más sofisticado con manejador de mensajes para procesar diferentes tipos de mensajes

- **Actualizaciones de Progreso:**
  - HTTP clásica: El progreso es parte del stream principal de respuesta
  - MCP: El progreso se envía mediante mensajes de notificación separados mientras la respuesta principal llega al final

### Recomendaciones

Hay algunas cosas que recomendamos al escoger entre implementar transmisión clásica (como un endpoint que mostramos arriba usando `/stream`) versus elegir transmisión vía MCP.

- **Para necesidades simples de transmisión:** La transmisión HTTP clásica es más simple de implementar y suficiente para necesidades básicas.

- **Para aplicaciones complejas e interactivas:** La transmisión MCP ofrece un enfoque más estructurado con metadatos enriquecidos y separación entre notificaciones y resultados finales.

- **Para aplicaciones de IA:** El sistema de notificaciones de MCP es particularmente útil para tareas AI de larga duración donde quieres mantener a los usuarios informados del progreso.

## Transmisión en MCP

Bien, ya viste algunas recomendaciones y comparaciones hasta ahora sobre la diferencia entre la transmisión clásica y la transmisión en MCP. Vamos a detallar exactamente cómo puedes aprovechar la transmisión en MCP.

Entender cómo funciona la transmisión dentro del marco MCP es esencial para construir aplicaciones responsivas que provean retroalimentación en tiempo real a los usuarios durante operaciones de larga duración.

En MCP, la transmisión no se trata de enviar la respuesta principal en fragmentos, sino de enviar **notificaciones** al cliente mientras una herramienta procesa una solicitud. Estas notificaciones pueden incluir actualizaciones de progreso, logs u otros eventos.

### Cómo funciona

El resultado principal aún se envía como una sola respuesta. Sin embargo, las notificaciones pueden enviarse como mensajes separados durante el procesamiento y así actualizar al cliente en tiempo real. El cliente debe ser capaz de manejar y mostrar estas notificaciones.

## ¿Qué es una Notificación?

Dijimos "Notificación", ¿qué significa eso en el contexto de MCP?

Una notificación es un mensaje enviado desde el servidor al cliente para informar sobre el progreso, estado u otros eventos durante una operación de larga duración. Las notificaciones mejoran la transparencia y la experiencia de usuario.

Por ejemplo, se supone que un cliente envía una notificación una vez que se realiza el saludo inicial con el servidor.

Una notificación se ve así como mensaje JSON:

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

> **Aviso de deprecación:** la versión candidata 2026-07-28 de la especificación MCP marca el primitivo Logging como desaprobado a favor de `stderr` para transportes stdio y OpenTelemetry para observabilidad estructurada. Logging sigue funcionando en `2025-11-25` y al menos un año después de cualquier deprecación formal. Consulta [Qué Cambia en MCP: La Versión Candidata 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Para hacer que el logging funcione, el servidor necesita habilitarlo como feature/capacidad así:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Dependiendo del SDK usado, el logging podría estar habilitado por defecto, o podrías necesitar habilitarlo explícitamente en la configuración del servidor.

Hay diferentes tipos de notificaciones:

| Nivel     | Descripción                  | Caso de Uso Ejemplo          |
|-----------|------------------------------|------------------------------|
| debug     | Información detallada de depuración | Puntos de entrada/salida de funciones |
| info      | Mensajes informativos generales | Actualizaciones de progreso de operaciones |
| notice    | Eventos normales pero significativos | Cambios de configuración       |
| warning   | Condiciones de advertencia    | Uso de características desaprobadas |
| error     | Condiciones de error          | Fallos de operación            |
| critical  | Condiciones críticas          | Fallos de componentes del sistema |
| alert     | Acción debe tomarse inmediatamente | Corrupción de datos detectada  |
| emergency | Sistema inutilizable          | Falla completa del sistema    |

## Implementando Notificaciones en MCP

Para implementar notificaciones en MCP, necesitas configurar ambos lados, servidor y cliente, para manejar actualizaciones en tiempo real. Esto permite que tu aplicación provea retroalimentación inmediata a los usuarios durante operaciones de larga duración.

### Lado Servidor: Enviar Notificaciones

Comencemos con el lado servidor. En MCP defines herramientas que pueden enviar notificaciones mientras se procesan solicitudes. El servidor usa el objeto contexto (generalmente `ctx`) para enviar mensajes al cliente.

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

Además, para habilitar notificaciones, asegura que tu servidor use un transporte de transmisión (como `streamable-http`) y que tu cliente implemente un manejador de mensajes para procesarlas. Aquí está cómo puedes configurar el servidor para usar el transporte `streamable-http`:

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

En este ejemplo de .NET, la herramienta `ProcessFiles` está decorada con el atributo `Tool` y envía tres notificaciones al cliente mientras procesa cada archivo. El método `ctx.Info()` se usa para enviar mensajes informativos.

Para habilitar notificaciones en tu servidor MCP .NET, asegura que uses un transporte de transmisión:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lado Cliente: Recibir Notificaciones

El cliente debe implementar un manejador de mensajes para procesar y mostrar las notificaciones conforme llegan.

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

En el código anterior, la función `message_handler` verifica si el mensaje entrante es una notificación. Si lo es, imprime la notificación; de lo contrario, la procesa como mensaje regular del servidor. También observa cómo se inicializa `ClientSession` con `message_handler` para manejar notificaciones entrantes.

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

En este ejemplo .NET, la función `MessageHandler` verifica si el mensaje entrante es una notificación. Si lo es, imprime la notificación; de lo contrario, la procesa como mensaje regular del servidor. `ClientSession` se inicializa con el manejador de mensajes mediante las `ClientSessionOptions`.

Para habilitar notificaciones, asegúrate de que tu servidor utilice un transporte de transmisión (como `streamable-http`) y que tu cliente implemente un manejador de mensajes para procesarlas.

## Notificaciones de Progreso y Escenarios

Esta sección explica el concepto de notificaciones de progreso en MCP, por qué son importantes y cómo implementarlas usando HTTP Transmisible. También encontrarás una asignación práctica para reforzar tu comprensión.

Las notificaciones de progreso son mensajes en tiempo real enviados desde el servidor al cliente durante operaciones de larga duración. En lugar de esperar a que termine todo el proceso, el servidor mantiene al cliente actualizado sobre el estado actual. Esto mejora la transparencia, experiencia de usuario y facilita la depuración.

**Ejemplo:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### ¿Por qué Usar Notificaciones de Progreso?

Las notificaciones de progreso son esenciales por varias razones:

- **Mejor experiencia de usuario:** Los usuarios ven actualizaciones conforme avanza el trabajo, no solo al final.
- **Retroalimentación en tiempo real:** Los clientes pueden mostrar barras de progreso o logs, haciendo que la app se sienta más responsiva.
- **Depuración y monitoreo más fácil:** Desarrolladores y usuarios pueden ver dónde un proceso podría estar lento o detenido.

### Cómo Implementar Notificaciones de Progreso

Aquí te mostramos cómo implementar notificaciones de progreso en MCP:

- **En el servidor:** Usa `ctx.info()` o `ctx.log()` para enviar notificaciones conforme se procesa cada ítem. Esto envía un mensaje al cliente antes de que el resultado principal esté listo.
- **En el cliente:** Implementa un manejador de mensajes que escuche y muestre las notificaciones conforme llegan. Este manejador diferencia entre notificaciones y el resultado final.

**Ejemplo de Servidor:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Ejemplo de cliente:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Consideraciones de seguridad

Al implementar servidores MCP con transportes basados en HTTP, la seguridad se convierte en una preocupación primordial que requiere prestar atención cuidadosa a múltiples vectores de ataque y mecanismos de protección.

### Resumen

La seguridad es crítica al exponer servidores MCP a través de HTTP. HTTP transmitible introduce nuevas superficies de ataque y requiere una configuración cuidadosa.

### Puntos clave

- **Validación del encabezado Origin**: Siempre valida el encabezado `Origin` para evitar ataques de rebinding DNS.
- **Vinculación a localhost**: Para desarrollo local, vincula los servidores a `localhost` para evitar exponerlos a Internet pública.
- **Autenticación**: Implementa autenticación (por ejemplo, claves API, OAuth) para despliegues en producción.
- **CORS**: Configura políticas de Cross-Origin Resource Sharing (CORS) para restringir el acceso.
- **HTTPS**: Usa HTTPS en producción para cifrar el tráfico.

### Mejores prácticas

- Nunca confíes en solicitudes entrantes sin validación.
- Registra y monitorea todos los accesos y errores.
- Actualiza regularmente las dependencias para corregir vulnerabilidades de seguridad.

### Desafíos

- Equilibrar la seguridad con la facilidad de desarrollo
- Asegurar la compatibilidad con varios entornos de cliente

## Actualización de SSE a HTTP transmitible

Para aplicaciones que actualmente usan Server-Sent Events (SSE), migrar a HTTP transmitible ofrece capacidades mejoradas y una mejor sostenibilidad a largo plazo para sus implementaciones MCP.

### ¿Por qué actualizar?

Hay dos razones convincentes para actualizar de SSE a HTTP transmitible:

- HTTP transmitible ofrece mejor escalabilidad, compatibilidad y soporte de notificaciones más completo que SSE.
- Es el transporte recomendado para nuevas aplicaciones MCP.

### Pasos de migración

Aquí se explica cómo puede migrar de SSE a HTTP transmitible en sus aplicaciones MCP:

- **Actualice el código del servidor** para usar `transport="streamable-http"` en `mcp.run()`.
- **Actualice el código del cliente** para usar `streamablehttp_client` en lugar del cliente SSE.
- **Implemente un manejador de mensajes** en el cliente para procesar notificaciones.
- **Pruebe la compatibilidad** con herramientas y flujos de trabajo existentes.

### Mantener la compatibilidad

Se recomienda mantener la compatibilidad con los clientes SSE existentes durante el proceso de migración. Aquí hay algunas estrategias:

- Puede soportar tanto SSE como HTTP transmitible ejecutando ambos transportes en puntos finales diferentes.
- Migre gradualmente a los clientes al nuevo transporte.

### Desafíos

Asegúrese de abordar los siguientes desafíos durante la migración:

- Asegurar que todos los clientes estén actualizados
- Manejar las diferencias en la entrega de notificaciones

## Consideraciones de seguridad

La seguridad debe ser una prioridad cuando se implementa cualquier servidor, especialmente cuando se utilizan transportes basados en HTTP como HTTP transmitible en MCP.

Al implementar servidores MCP con transportes basados en HTTP, la seguridad se convierte en una preocupación primordial que requiere prestar atención cuidadosa a múltiples vectores de ataque y mecanismos de protección.

### Resumen

La seguridad es crítica al exponer servidores MCP a través de HTTP. HTTP transmitible introduce nuevas superficies de ataque y requiere una configuración cuidadosa.

Aquí hay algunas consideraciones clave de seguridad:

- **Validación del encabezado Origin**: Siempre valida el encabezado `Origin` para evitar ataques de rebinding DNS.
- **Vinculación a localhost**: Para desarrollo local, vincula los servidores a `localhost` para evitar exponerlos a Internet pública.
- **Autenticación**: Implementa autenticación (por ejemplo, claves API, OAuth) para despliegues en producción.
- **CORS**: Configura políticas de Cross-Origin Resource Sharing (CORS) para restringir el acceso.
- **HTTPS**: Usa HTTPS en producción para cifrar el tráfico.

### Mejores prácticas

Además, aquí hay algunas mejores prácticas a seguir al implementar la seguridad en su servidor de streaming MCP:

- Nunca confíes en solicitudes entrantes sin validación.
- Registra y monitorea todos los accesos y errores.
- Actualiza regularmente las dependencias para corregir vulnerabilidades de seguridad.

### Desafíos

Enfrentará algunos desafíos al implementar la seguridad en servidores de streaming MCP:

- Equilibrar la seguridad con la facilidad de desarrollo
- Asegurar la compatibilidad con varios entornos de cliente

### Ejercicio: Construye tu propia aplicación MCP de streaming

**Escenario:**
Construye un servidor y un cliente MCP donde el servidor procese una lista de elementos (por ejemplo, archivos o documentos) y envíe una notificación por cada elemento procesado. El cliente debe mostrar cada notificación en cuanto llegue.

**Pasos:**

1. Implementa una herramienta de servidor que procese una lista y envíe notificaciones por cada elemento.
2. Implementa un cliente con un manejador de mensajes para mostrar las notificaciones en tiempo real.
3. Prueba tu implementación ejecutando tanto el servidor como el cliente, y observa las notificaciones.

[Solución](./solution/README.md)

## Lecturas adicionales y qué sigue

Para continuar tu recorrido con el streaming MCP y ampliar tu conocimiento, esta sección proporciona recursos adicionales y pasos sugeridos para construir aplicaciones más avanzadas.

### Lecturas adicionales

- [Microsoft: Introducción al streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS en ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Solicitudes de streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Qué sigue

- Intenta construir herramientas MCP más avanzadas que usen streaming para análisis en tiempo real, chat o edición colaborativa.
- Explora la integración del streaming MCP con frameworks frontend (React, Vue, etc.) para actualizaciones en vivo de la interfaz de usuario.
- Próximo: [Utilizando AI Toolkit para VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->