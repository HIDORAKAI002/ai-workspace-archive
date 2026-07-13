# HTTPS Streaming wit Model Context Protocol (MCP)

Dis chapter dey give beta guide to implemente secure, scalable, and real-time streaming wit Model Context Protocol (MCP) use HTTPS. E cover why streaming important, di transport methods wey dey, how to implement streamable HTTP for MCP, security best practices, how to migrate from SSE, plus practical guide for build your own streaming MCP apps.

> **Looking ahead:** dis lesson dey describe Streamable HTTP under **MCP Specification 2025-11-25**, where session go start during `initialize` and pinned wit `Mcp-Session-Id` header. Di `2026-07-28` release candidate go remove handshake and session ID completely, make every request self-contained and fit go any server instance without sticky sessions. See [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for details.

## Transport Mechanisms and Streaming in MCP

Dis part go look di different transport mechanisms wey MCP get and how dem dey help enable streaming for real-time communication between clients and servers.

### Wetin Transport Mechanism Mean?

Transport mechanism na how data dey waka between client and server. MCP support plenti transport types to fit different environment and needs:

- **stdio**: Standard input/output, beta for local and CLI tools. Easy but no too fit for web or cloud.
- **SSE (Server-Sent Events)**: Allow servers to push real-time updates to clients over HTTP. Good for web UI, but e no too scale well or flexible. As MCP Specification 2025-06-18 go, di standalone SSE transport don deprecated, dem don replace am wit "Streamable HTTP" transport.
- **Streamable HTTP**: Modern HTTP-based streaming transport, dey support notifications and better scalability. Na im dem recommend for most production and cloud scenarios.

### Comparison Table

Make you check di comparison table below to sabi di difference between these transport mechanisms:

| Transport         | Real-time Updates | Streaming | Scalability | Use Case                |
|-------------------|------------------|-----------|-------------|-------------------------|
| stdio             | No               | No        | Low         | Local CLI tools         |
| SSE               | Yes              | Yes       | Medium      | Web, real-time updates  |
| Streamable HTTP   | Yes              | Yes       | High        | Cloud, multi-client     |

> **Tip:** To choose the right transport go affect how e go perform, scalability, and how user go take experience am. **Streamable HTTP** na im dem recommend for modern, scalable, and cloud-ready apps.

Make you remember di transports stdio and SSE wey dem show you for di previous chapters and how Streamable HTTP na di transport wey dis chapter dey talk about.

## Streaming: Concepts and Motivation

To sabi di main ideas and reasons behind streaming dey important for to fit implement correct real-time communication systems.

**Streaming** na network programming technique wey allow data to dey sent and receive in small kawa kawa or as sequence of events instead of to wait make entire response ready. E beta for:

- Big files or datasets.
- Real-time updates (like chat, progress bars).
- Long-running computations wey you wan keep user dey informed.

Here be wetin you need sabi about streaming for high level:

- Data dey come small small, no come all-at-once.
- Client fit process data as e dey come.
- E reduce di feeling say e too slow and improve user experience.

### Why Use Streaming?

Reasons why streaming better be like dis:

- Users fit get feedback immediately, no be only at di end.
- E enable real-time apps and responsive UI.
- E better for network and compute resources usage.

### Simple Example: HTTP Streaming Server & Client

Here na simple example how streaming fit work:

#### Python

**Server (Python, dey use FastAPI and StreamingResponse):**

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

**Client (Python, dey use requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Dis example show server dey send series of messages to client as dem dey ready, no be waiting till all messages ready.

**How e dey work:**

- Server dey yield each message as e ready.
- Client dey receive and print each chunk as e reach.

**Wetin you need:**

- Server must send streaming response (for example `StreamingResponse` for FastAPI).
- Client must process response as stream (`stream=True` inside requests).
- Content-Type fit be `text/event-stream` or `application/octet-stream`.

#### Java

**Server (Java, dey use Spring Boot and Server-Sent Events):**

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

**Client (Java, dey use Spring WebFlux WebClient):**

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

**Java Implementation Notes:**

- E dey use Spring Boot reactive stack wit `Flux` for streaming
- `ServerSentEvent` dey provide structured event streaming wit event types
- `WebClient` wit `bodyToFlux()` dey enable reactive streaming consumption
- `delayElements()` dey simulate processing time between events
- Events fit get types (`info`, `result`) to help client handle better

### Comparison: Classic Streaming vs MCP Streaming

Difference between traditional streaming and how e be for MCP fit show like dis:

| Feature                | Classic HTTP Streaming         | MCP Streaming (Notifications)      |
|------------------------|-------------------------------|-------------------------------------|
| Main response          | Chunked                       | Single, at end                      |
| Progress updates       | Sent as data chunks           | Sent as notifications               |
| Client requirements    | Must process stream           | Must implement message handler      |
| Use case               | Big files, AI token streams   | Progress, logs, real-time feedback  |

### Key Differences Observed

Additionally, here be some key differences:

- **Communication Pattern:**
  - Classic HTTP streaming: E use simple chunked transfer encoding send data in chunks
  - MCP streaming: E get structured notification system with JSON-RPC protocol

- **Message Format:**
  - Classic HTTP: Plain text chunks with newlines
  - MCP: Structured LoggingMessageNotification objects wit metadata

- **Client Implementation:**
  - Classic HTTP: Simple client wey process streaming responses
  - MCP: Beta more sophisticated client with message handler to process different message types

- **Progress Updates:**
  - Classic HTTP: Progress na part of main response stream
  - MCP: Progress na separate notifications, main response na only at end

### Recommendations

Some tips for choose between classical streaming (as endpoint dey `/stream`) and streaming via MCP:

- **For simple streaming needs:** Classic HTTP streaming easy to implement and e good for basic streaming needs.

- **For complex, interactive apps:** MCP streaming get better structure wit rich metadata and separate notifications from final result.

- **For AI apps:** MCP notification system dey very useful for long-running AI tasks wey you want make users dey informed of progress.

## Streaming in MCP

Ok, so you don see some recommendations and comparison so far about classical streaming and streaming in MCP. Make we enter detail how you fit use streaming in MCP.

To sabi how streaming dey work inside MCP framework important to build responsive apps wey go give real-time feedback to users during long process.

For MCP, streaming no mean say main response go send in chunks, but na **notifications** go dey send to client while tool dey process request. These notifications fit be progress updates, logs, or other events.

### How e dey work

Main result still dey sent as one single response. But notifications fit send as separate messages during process and update client in real time. Client must fit handle and display these notifications.

## Wetin be Notification?

We talk "Notification", wetin dat mean for MCP?

Notification na message wey server send to client to tell im about progress, status, or other events during long task. Notifications dey improve transparency and user experience.

For example, client suppose send notification once handshake with server don complete.

Notification dey look like JSON message like dis:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifications dey belong to topic inside MCP wey dem call ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

To fit make logging work, server need enable am as feature or capability like dis:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Depending on which SDK you dey use, logging fit dey enabled by default, or you fit need to explicitly enable am for your server configuration.

Dem get different types of notifications:

| Level     | Description                    | Example Use Case                |
|-----------|-------------------------------|---------------------------------|
| debug     | Detailed debugging information | Function entry/exit points      |
| info      | General informational messages | Operation progress updates      |
| notice    | Normal but significant events  | Configuration changes           |
| warning   | Warning conditions             | Deprecated feature usage        |
| error     | Error conditions               | Operation failures              |
| critical  | Critical conditions            | System component failures       |
| alert     | Action must be taken immediately | Data corruption detected      |
| emergency | System is unusable             | Complete system failure         |

## Implementing Notifications in MCP

To implement notifications for MCP, you need to set both server and client side to handle real-time updates. Dis go make your app fit give immediate feedback to users as long process dey run.

### Server-side: Sending Notifications

Make we start with server side. For MCP, you go define tools wey fit send notifications while dem dey process requests. Server dey use context object (usually `ctx`) send messages to client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

For di example wey just pass, `process_files` tool dey send three notifications to client as e dey process each file. `ctx.info()` method dey use to send informational messages.

Also, to enable notifications, make sure your server dey use streaming transport (like `streamable-http`) and your client fit implement message handler to process notifications. See how to set server to use `streamable-http` transport:

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

For dis .NET example, `ProcessFiles` tool get `Tool` attribute and e dey send three notifications to client while e dey process each file. `ctx.Info()` method dey send informational messages.

To enable notifications for your .NET MCP server, make sure sey you dey use streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Client-side: Receiving Notifications

Client must implement message handler to process and show notifications as dem dey come.

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

For di code before, `message_handler` function dey check if message wey dey enter na notification. If e be notification, e go print am; if no be, e go process am as normal server message. Also, note how `ClientSession` dey initialize wit `message_handler` to handle notifications.

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

For dis .NET example, `MessageHandler` function dey check if incoming message na notification. If e be, e go print notification; if no be, e go process as regular server message. `ClientSession` initialized with message handler inside `ClientSessionOptions`.

To enable notifications, make sure sey your server dey use streaming transport (like `streamable-http`) and your client fit process notifications with message handler.

## Progress Notifications & Scenarios

Dis section go explain wetin progress notifications mean for MCP, why e important, and how to implement am wit Streamable HTTP. You go also see practical assignment to help your understanding.

Progress notifications na real-time messages wey server dey send to client during long process. E no wait finish all before e notify client; e dey keep client dey updated about current status. This one dey improve transparency, user experience, plus e make debugging easy.

**Example:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Why Use Progress Notifications?

Progress notifications important for plenti reasons:

- **Better user experience:** Users go see updates as work dey go on, no be only at end.
- **Real-time feedback:** Clients fit show progress bars or logs, make app sef dey feel responsive.
- **Easier debugging and monitoring:** Developers and users fit see where process dey slow or stuck.

### How to Implement Progress Notifications

Here na how to implement progress notifications inside MCP:

- **For server:** Use `ctx.info()` or `ctx.log()` send notifications as each item process finish. Dis one go send message before main result ready.
- **For client:** Implement message handler wey go listen and show notifications as dem reach. Dis handler go sabi difference between notifications and final result.

**Server Example:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Client Example:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Security Considerations

When you dey implement MCP servers wit HTTP-based transports, security na very big mata wey need careful attention to many attack ways and protections.

### Overview

Security critical when you dey expose MCP servers over HTTP. Streamable HTTP dey open new attack surfaces and need careful configuration.

### Key Points
- **Origin Header Validation**: Always validate di `Origin` header to prevent DNS rebinding attacks.
- **Localhost Binding**: For local development, bind servers to `localhost` to avoid exposing dem to di public internet.
- **Authentication**: Implement authentication (e.g., API keys, OAuth) for production deployments.
- **CORS**: Configure Cross-Origin Resource Sharing (CORS) policies to restrict access.
- **HTTPS**: Use HTTPS for production to encrypt traffic.

### Best Practices

- No ever trust incoming requests without validation.
- Log and monitor all access and errors.
- Regularly update dependencies to patch security vulnerabilities.

### Challenges

- Balancing security with ease of development
- Ensuring compatibility with various client environments

## Upgrading from SSE to Streamable HTTP

For applications wey dey use Server-Sent Events (SSE) currently, migrating to Streamable HTTP dey give better capabilities and better long-term sustainability for your MCP implementations.

### Why Upgrade?

Two main reasons dey why you suppose upgrade from SSE to Streamable HTTP:

- Streamable HTTP get better scalability, compatibility, and richer notification support pass SSE.
- Na di recommended transport for new MCP applications.

### Migration Steps

Here how you fit migrate from SSE to Streamable HTTP for your MCP applications:

- **Update server code** to use `transport="streamable-http"` for `mcp.run()`.
- **Update client code** to use `streamablehttp_client` instead of SSE client.
- **Implement a message handler** for the client to process notifications.
- **Test for compatibility** with existing tools and workflows.

### Maintaining Compatibility

E dey recommended to maintain compatibility with existing SSE clients during the migration process. Here be some strategies:

- You fit support both SSE and Streamable HTTP by running both transports on different endpoints.
- Gradually migrate clients to di new transport.

### Challenges

Make sure say you handle these challenges during migration:

- Ensuring say all clients dey updated
- Handling differences in notification delivery

## Security Considerations

Security suppose be top priority when you dey implement any server, specially wen you dey use HTTP-based transports like Streamable HTTP for MCP.

When you dey implement MCP servers with HTTP-based transports, security go become big concern wey need careful attention to multiple attack vectors and protection mechanisms.

### Overview

Security dey critical when you dey expose MCP servers over HTTP. Streamable HTTP dey bring new attack surfaces and e need careful configuration.

Here be some key security considerations:

- **Origin Header Validation**: Always validate di `Origin` header to prevent DNS rebinding attacks.
- **Localhost Binding**: For local development, bind servers to `localhost` to avoid exposing dem to di public internet.
- **Authentication**: Implement authentication (e.g., API keys, OAuth) for production deployments.
- **CORS**: Configure Cross-Origin Resource Sharing (CORS) policies to restrict access.
- **HTTPS**: Use HTTPS for production to encrypt traffic.

### Best Practices

Also, here be some best practices to follow when you dey implement security for your MCP streaming server:

- No ever trust incoming requests without validation.
- Log and monitor all access and errors.
- Regularly update dependencies to patch security vulnerabilities.

### Challenges

You go face some challenges when you dey implement security for MCP streaming servers:

- Balancing security with ease of development
- Ensuring compatibility with various client environments

### Assignment: Build Your Own Streaming MCP App

**Scenario:**
Build MCP server and client wey the server dey process list of items (e.g., files or documents) and dey send notification for each item wey e process. The client suppose show each notification as e land.

**Steps:**

1. Implement server tool wey dey process list and dey send notifications for each item.
2. Implement client with message handler to show notifications for real time.
3. Test your implementation by running both server and client, then watch the notifications.

[Solution](./solution/README.md)

## Further Reading & What Next?

To continue your journey with MCP streaming plus increase your knowledge, this section provide additional resources and suggested next steps to build more advanced applications.

### Further Reading

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### What Next?

- Try build more advanced MCP tools wey use streaming for real-time analytics, chat, or collaborative editing.
- Explore how to integrate MCP streaming with frontend frameworks (React, Vue, etc.) for live UI updates.
- Next: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->