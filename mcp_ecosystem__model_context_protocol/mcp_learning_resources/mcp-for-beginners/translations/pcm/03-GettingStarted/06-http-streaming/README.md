# HTTPS Streaming wit Model Context Protocol (MCP)

Dis chapter dey provide beta guide on how to implement secure, scalable, and real-time streaming wit di Model Context Protocol (MCP) using HTTPS. E cover why streaming dey important, di transport mechanisms wey dey, how to fit run streamable HTTP for MCP, beta security practices, how to migrate from SSE, and practical guide to build your own streaming MCP applications.

## Transport Mechanisms and Streaming for MCP

Dis section go look di different transport mechanisms wey dey MCP and how dem dey enable streaming for real-time communication between client and server dem.

### Wetin be Transport Mechanism?

Transport mechanism na how data dey waka between client and server. MCP support plenty different transport types so e fit work for different environments and needs:

- **stdio**: Standard input/output, good for local and CLI-based tools. E simple but no good for web or cloud.
- **SSE (Server-Sent Events)**: Make server fit push real-time updates to client over HTTP. Good for web UI, but no too scalable or flexible. As MCP Specification 2025-06-18 talk, standalone SSE don phase out and "Streamable HTTP" don replace am.
- **Streamable HTTP**: Na modern HTTP-based streaming transport, wey support notifications and better scalability. Dem recommend am for production and cloud-based things.

### Comparison Table

Check dis table below so you go sabi di difference between these transport mechanisms:

| Transport         | Real-time Updates | Streaming | Scalability | Use Case                |
|-------------------|------------------|-----------|-------------|-------------------------|
| stdio             | No               | No        | Low         | Local CLI tools         |
| SSE               | Yes              | Yes       | Medium      | Web, real-time updates  |
| Streamable HTTP   | Yes              | Yes       | High        | Cloud, multi-client     |

> **Tip:** Di transport wey you choose go affect performance, scalability, and user experience. **Streamable HTTP** na wetin dem recommend for modern, scalable, and cloud-ready apps.

Make you note di transports stdio and SSE wey you don see for previous chapters, and how streamable HTTP na di transport wey dis chapter cover.

## Streaming: Concepts and Motivation

To understand di basic concept and motivation behind streaming dey important to fit build correct real-time communication system.

**Streaming** na technique for network programming wey let data kon send and receive in small, manageable pieces or as sequence of events, no be to wait make all di response complete before you fit receive am. Dis one good for:

- Big big files or data sets.
- Real-time updates (like chat, progress bars).
- Long time computations wey you wan dey keep user informed.

Make you understand this about streaming for high level:

- Data dey come little little, no be all at once.
- Client fit process data as e dey land.
- E reduce delay perception and improve user experience.

### Why use streaming?

Reasons for streaming be dis:

- Users go dey get feedback sharp sharp, no be only at end
- E enable real-time apps and quick UI response
- E make better use of network and compute resources

### Simple Example: HTTP Streaming Server & Client

Here na simple example of how to implement streaming:

#### Python

**Server (Python, using FastAPI and StreamingResponse):**

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

**Client (Python, using requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Dis example show server dey send plenty messages come the client as dem ready, no be to wait make all messages complete.

**How e dey work:**

- Server dey yield each message as e ready.
- Client dey receive and print each piece as e come.

**Requirements:**

- Server must use streaming response (e.g. `StreamingResponse` for FastAPI).
- Client must process response as stream (`stream=True` inside requests).
- Content-Type dey usually `text/event-stream` or `application/octet-stream`.

#### Java

**Server (Java, using Spring Boot and Server-Sent Events):**

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

**Client (Java, using Spring WebFlux WebClient):**

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

- Dem use Spring Boot reactive stack with `Flux` for streaming
- `ServerSentEvent` dey give structured event streaming with event types
- `WebClient` with `bodyToFlux()` allow reactive streaming consumption
- `delayElements()` dey simulate processing time between events
- Events fit get types (`info`, `result`) so client fit handle am better

### Comparison: Classic Streaming vs MCP Streaming

This be difference for how classic streaming dey run versus how streaming dey for MCP:

| Feature                | Classic HTTP Streaming         | MCP Streaming (Notifications)      |
|------------------------|-------------------------------|-------------------------------------|
| Main response          | Chunked                       | Single, for end                      |
| Progress updates       | Sent as data chunks           | Sent as notifications               |
| Client requirements    | Must process stream           | Must implement message handler      |
| Use case               | Large files, AI token streams | Progress, logs, real-time feedback  |

### Key Differences Observed

Also, here be some key differences wey we see:

- **Communication Pattern:**
  - Classic HTTP streaming: Dem use simple chunked transfer encoding to send data in chunks
  - MCP streaming: Dem use structured notification system wit JSON-RPC protocol

- **Message Format:**
  - Classic HTTP: Plain text chunks wit newlines
  - MCP: Structured LoggingMessageNotification objects wit metadata

- **Client Implementation:**
  - Classic HTTP: Simple client wey dey process streaming response
  - MCP: Better client wey get message handler to process different types of messages

- **Progress Updates:**
  - Classic HTTP: Progress be part of main response stream
  - MCP: Progress fit come as separate notification messages while main response still dey come at end

### Recommendations

We get some things we recommend when e come to choose between classical streaming (as endpoint we show you above using `/stream`) and streaming via MCP.

- **For simple streaming needs:** Classic HTTP streaming easier to implement and enough for basic streaming needs.

- **For complex, interactive apps:** MCP streaming dey give more structured approach wit richer metadata and separation between notifications and final results.

- **For AI apps:** MCP notification system dey specially useful for long AI tasks wey you wan dey keep user informed for progress.

## Streaming in MCP

Okay, since you don see some recommendations and comparisons on classical streaming and MCP streaming, make we dive deep on how you fit use streaming for MCP.

Make you understand how streaming dey work inside MCP framework na key to build responsive apps wey fit dey give real-time feedback during long time work.

For MCP, streaming no mean say dem go send main response in chunks, but na to send **notifications** to client while tool dey process request. These notifications fit be progress updates, logs, or other events.

### How e dey work

Main result still dey send as single response. But notifications fit dey sent as separate messages as processing dey go on and update client in real time. Client must fit handle and show these notifications.

## Wetin be Notification?

We talk "Notification", wetin dat mean for MCP context?

Notification na message wey server go send to client to tell wetin progress be, status or other events as long time work dey go on. Notifications dey improve transparency and user experience.

For example, client suppose send notification when e complete initial handshake wit server.

Notification fit look like dis as JSON message:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifications belong to topic for MCP dem call ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

To make logging work, server must enable am as feature/capability like dis:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Depending on wetin SDK you dey use, logging fit dey enabled by default, or you fit need activate am yourself for your server config.

Different types of notifications dey:

| Level     | Description                    | Example Use Case                |
|-----------|-------------------------------|---------------------------------|
| debug     | Detailed debugging info        | Function enter/exit points      |
| info      | General informational messages | Operation progress updates      |
| notice    | Normal but important events    | Configuration changes           |
| warning   | Warning conditions             | Deprecated feature usage        |
| error     | Error conditions               | Operation failures              |
| critical  | Critical conditions            | System component failures       |
| alert     | Action must happen quick-quick | Data corruption detected        |
| emergency | System no fit work             | Complete system failure         |

## How to Implement Notifications for MCP

To implement notifications for MCP, you go need setup both server and client side to handle real-time updates. Dis one go let your app provide immediate feedback to users during long time work.

### Server side: Sending Notifications

Make we start wit server side. For MCP, you go define tools wey fit send notifications while dem dey process requests. Server go use context object (normally `ctx`) to send messages to client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

For dis example wey pass, `process_files` tool dey send three notifications to client as e dey process each file. `ctx.info()` method dey used to send informational messages.

Plus, to enable notifications, make sure your server dey use streaming transport (like `streamable-http`) and your client get message handler to process notifications. This na how to setup your server to use `streamable-http` transport:

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

For dis .NET example, `ProcessFiles` tool get `Tool` attribute and e dey send three notifications as e dey process each file. `ctx.Info()` method dey used to send informational messages.

To enable notifications for your .NET MCP server, make sure say you dey use streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Client side: Receiving Notifications

Client side must get message handler to process and show notifications as e dey come.

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

For dis code wey pass, `message_handler` function dey check if incoming message na notification. If na, e go print am; if no be, e go process as normal server message. You go also notice how `ClientSession` initialize wit `message_handler` to handle notifications.

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

For dis .NET example, `MessageHandler` function dey check if incoming message na notification. If na, e print am; if no, e process am as normal server message. `ClientSession` initialize wit message handler via `ClientSessionOptions`.

To enable notifications, make sure your server dey use streaming transport (like `streamable-http`) and client implement message handler for notifications.

## Progress Notifications & Scenarios

Dis section go explain wetin progress notifications mean for MCP, why dem important, and how to implement dem using Streamable HTTP. You go also find practical task to brush up your understanding.

Progress notifications na real-time messages wey server dey send to client during long time work. Instead make client wait till everything finish, server go keep update client on wetin e dey do. Dis one go improve transparency, user experience, and e go make debugging easier.

**Example:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Why Use Progress Notifications?

Progress notifications important for many reasons:

- **Better user experience:** Users dey see updates as work dey go, no be only at end.
- **Real-time feedback:** Clients fit show progress bars or logs, make app feel responsive.
- **Easier debugging and monitoring:** Developers and users fit see where process fit dey slow or jam.

### How to Implement Progress Notifications

Dis na how to implement progress notifications for MCP:

- **For server:** Use `ctx.info()` or `ctx.log()` to send notifications as each item dey processed. E go send message to client before main result ready.
- **For client:** Implement message handler wey listen and show notifications as dem come. Dis handler fit separate notifications from final result.

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

When you go implement MCP servers wit HTTP-based transports, security na one serious mata wey need care to block many ways wey dem fit attack and protect your system.

### Overview

Security important anytime you dey expose MCP servers over HTTP. Streamable HTTP get new areas wey attacker fit try, so you need set am well well.

### Key Points

- **Origin Header Validation**: Always validate `Origin` header to stop DNS rebinding attacks.
- **Localhost Binding**: For local development, bind your servers to `localhost` so e no go open to public internet.
- **Authentication**: Implement authentication (like API keys, OAuth) for production.
- **CORS**: Setup Cross-Origin Resource Sharing policies to limit access.
- **HTTPS**: Use HTTPS for production to encrypt traffic.

### Best Practices

- No ever trust incoming requests without checking.
- Log and monitor all access and errors.
- Keep your dependencies updated to fix security issues.

### Challenges
- Balans security wit beta development ease
- Make sure e dey work well wit different client environment dem

## Upgrading from SSE to Streamable HTTP

For app dem wey dey use Server-Sent Events (SSE) now, to switch go Streamable HTTP go give better power and beta long-term sustainability for your MCP implementations.

### Why Upgrade?

Two big reasons dey why you for upgrade from SSE go Streamable HTTP:

- Streamable HTTP get better scalability, compatibility, and e get beta notification support pass SSE.
- E be di recommended transport for new MCP apps.

### Migration Steps

Na so you fit migrate from SSE go Streamable HTTP for your MCP apps:

- **Update server code** make e use `transport="streamable-http"` for `mcp.run()`.
- **Update client code** make e use `streamablehttp_client` no be SSE client again.
- **Implement a message handler** for client to handle notifications.
- **Test for compatibility** with di tools and workflows wey you don dey use.

### Maintaining Compatibility

E good make you maintain compatibility with di current SSE clients as you dey migrate. Here be some tori:

- You fit support both SSE and Streamable HTTP by to run di two transport for different endpoints.
- Steady waka migrate clients go di new transport.

### Challenges

Make sure say you solve dis challenges as you dey migrate:

- Make sure say all clients dey updated
- Handle differences for how notification dem dey deliver

## Security Considerations

Security na top priority wen you dey build any server, especially wen you dey use HTTP-based transport like Streamable HTTP for MCP.

If you dey build MCP servers weh dem use HTTP transport, security na big mata wey need plenty care for different kind attack wheels and protective mechanisms.

### Overview

Security na big deal wen MCP servers dey open for HTTP. Streamable HTTP bring new attack surface, so you gats make proper configuration.

Here be some key security mater dem:

- **Origin Header Validation**: Always check `Origin` header well to stop DNS rebinding attacks.
- **Localhost Binding**: For local development, make server bind to `localhost` so e no go open for public internet.
- **Authentication**: Put authentication (like API keys, OAuth) for production deployment.
- **CORS**: Arrange Cross-Origin Resource Sharing (CORS) policies to limit who fit access.
- **HTTPS**: Use HTTPS for production make traffic dey encrypted.

### Best Practices

Also, here be some best practice to follow when you dey implement security for your MCP streaming server:

- No ever trust incoming requests without validation.
- Log and dey watch all access and errors.
- Make sure say you dey update dependencies well-well to patch security holes.

### Challenges

You go face some wahala when you dey do security for MCP streaming servers:

- Balans security with development ease
- Make sure say e go work for different client environments

### Assignment: Build Your Own Streaming MCP App

**Scenario:**
Build one MCP server and client where server go process list of items (like files or documents) and send notification for each item as e process am. Client suppose show each notification as e reach.

**Steps:**

1. Build one server tool wey go process list and send notification for each item.
2. Build client with message handler to show notifications for real time.
3. Test your app by running server and client together, then watch di notifications.

[Solution](./solution/README.md)

## Further Reading & What Next?

To continue your MCP streaming journey and make your knowledge grow, dis section get more resources and suggestion for next steps to build more advanced apps.

### Further Reading

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### What Next?

- Try build more advanced MCP tools wey use streaming for real-time analytics, chat, or collaborative editing.
- Try put MCP streaming join frontend frameworks (React, Vue, etc.) to make live UI update.
- Next: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->