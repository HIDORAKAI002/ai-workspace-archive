# HTTPS Streaming wit Model Context Protocol (MCP)

Dis chapter dey give one comprehensive guide to how person fit do secure, scalable, real-time streaming wit Model Context Protocol (MCP) with HTTPS. E dey talk about why streaming beta, di different transport ways wey dey, how to implement streamable HTTP for MCP, security best practices, how to move from SSE, plus practical steps to build your own streaming MCP applications. 

> **Lookin ahead:** dis lesson talk about Streamable HTTP under **MCP Specification 2025-11-25**, wey say session go start inside `initialize` and e go carry `Mcp-Session-Id` header. Di `2026-07-28` release candidate go commot handshake and session ID finish, make every request self-contained and fit run for any server instance without sticky sessions. Check [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for details.

## Transport Ways and Streaming for MCP

Dis section go look di different transport ways wey dey MCP and how dem dey help streaming for real-time communication between clients and servers.

### Wetin be Transport Mechanism?

Transport mechanism na how data dey waka between client and server. MCP get plenty transport types wey fit different situations and requirements:

- **stdio**: Standard input/output, e good for local and CLI-based tools. E simple but e no good for web or cloud.
- **SSE (Server-Sent Events)**: Make server fit push real-time updates to client over HTTP. E beta for web UIs, but e no too scale well and no too flexible. As per MCP Specification 2025-06-18, standalone SSE (Server-Sent Events) transport don deprecated and dem don replace am with "Streamable HTTP" transport.
- **Streamable HTTP**: Modern HTTP-based streaming transport, e dey support notifications and better scalability. Na im we go recommend for most production and cloud cases.

### Comparison Table

Look di comparison table below make you sabi wetin dey different for these transport ways:

| Transport         | Real-time Updates | Streaming | Scalability | Use Case                |
|-------------------|------------------|-----------|-------------|-------------------------|
| stdio             | No               | No        | Low         | Local CLI tools         |
| SSE               | Yes              | Yes       | Medium      | Web, real-time updates  |
| Streamable HTTP   | Yes              | Yes       | High        | Cloud, multi-client     |

> **Tip:** How you choose di transport fit affect performance, scalability, plus user experience. **Streamable HTTP** na di one wey we recommend for modern, scalable, and cloud-ready applications.

Make you remember di transports stdio and SSE wey we show you before and how streamable HTTP na di transport wey dis chapter dey cover.

## Streaming: Concepts and Why E Important

To sabi di basic ideas and why streaming dey important na key if you wan implement good real-time communication systems.

**Streaming** na technique for network programming wey make data fit dey send and receive small small parts or as series of events, no be to wait make whole response ready. E especially beta for:

- Big files or big datasets.
- Real-time updates (like chat, progress bars).
- Long computations wey you want dey tell user wetin happening.

Dis na wetin you need know about streaming on top:

- Data dey show small small as e ready, no be all at once.
- Client fit process data as e dey come.
- E reduce waiting time wey person dey feel and make user experiens better.

### Why You Go Use Streaming?

Di reasons to use streaming be:

- Users go get feedback sharp sharp, no be only at di end
- E fit make real-time apps and responsive UIs work well
- E better to use network and compute resources

### Simple Example: HTTP Streaming Server & Client

Dis na simple example how person fit do streaming:

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

Dis example dey show how server dey send messages to client as dem ready instead of waiting all messages ready before sending.

**How e dey work:**

- Server dey send each message as e ready.
- Client dey receive and print each chunk as e land.

**Requirements:**

- Server must use streaming response (like `StreamingResponse` for FastAPI).
- Client must fit process di response as stream (`stream=True` for requests).
- Content-Type usually `text/event-stream` or `application/octet-stream`.

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

- Uses Spring Boot reactive stack with `Flux` for streaming
- `ServerSentEvent` dey provide structured event streaming with event types
- `WebClient` with `bodyToFlux()` enable reactive streaming consumption
- `delayElements()` dey simulate processing time between events
- Events fit get types (`info`, `result`) to help client handle am well

### Comparison: Classic Streaming vs MCP Streaming

Wetin dey different for how streaming dey work the "classical" way against how e dey work for MCP fit dey shown like dis:

| Feature                | Classic HTTP Streaming         | MCP Streaming (Notifications)      |
|------------------------|-------------------------------|-------------------------------------|
| Main response          | Chunked                       | Single, na di end                      |
| Progress updates       | Sent as data chunks           | Sent as notifications               |
| Client requirements    | Must process stream           | Must implement message handler      |
| Use case               | Large files, AI token streams | Progress, logs, real-time feedback  |

### Key Differences Wey We See

Plus, here be some key differences:

- **Communication Pattern:**
  - Classic HTTP streaming: Uses simple chunked transfer encoding to send data in chunks
  - MCP streaming: Uses structured notification system with JSON-RPC protocol

- **Message Format:**
  - Classic HTTP: Plain text chunks wit newlines
  - MCP: Structured LoggingMessageNotification objects wit metadata

- **Client Implementation:**
  - Classic HTTP: Simple client wey processes streaming responses
  - MCP: Sophisticated client wit message handler to process different types messages

- **Progress Updates:**
  - Classic HTTP: Progress dey part of main response stream
  - MCP: Progress dey sent as separate notification messages, main response go come at di end

### Recommendations

Some tins we recommend as you wan choose between classical streaming (di endpoint we show you before with `/stream`) or streaming with MCP.

- **For simple streaming needs:** Classic HTTP streaming dey simple and enough for basic streaming.

- **For complex, interactive apps:** MCP streaming get more structured way with richer metadata and make notification and final result separate.

- **For AI apps:** MCP notification system beta for long AI tasks where you wan keep users updated.

## Streaming for MCP

Ok, you don see recommendations and comparisons about classical streaming vs MCP streaming. Now make we talk true how you fit use streaming for MCP.

To sabi how streaming take work inside MCP framework important so app fit show real-time feedback to user during long operations.

For MCP, streaming no mean say main response go send small small chunks, but na to send **notifications** to client while tool dey process request. These notifications fit get progress updates, logs, or other events.

### How e dey work

Main result still dey send as single response. But notifications fit send as separate messages while processing and update client in real time. Client must fit handle and show these notifications.

## Wetin be Notification?

We talk "Notification", wetin e mean for MCP matter?

Notification na message wey server send client to inform about progress, status, or other events during long operation. Notifications dey make thing clear and better for user experience.

Example be say client suppose send notification once handshake with server don happen.

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

Notifications dey belong to topic for MCP wey dem call ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Deprecation notice:** di `2026-07-28` MCP specification release candidate mark Logging primitive as deprecated, dem recommend `stderr` for stdio transports and OpenTelemetry for structured observability. Logging go still work for `2025-11-25` and for at least one year after formal deprecation. Check [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

To make logging work, server need enable am as feature/capability like dis:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Depending on di SDK wey you dey use, logging fit dey enabled by default, or you fit need explicitly enable am for your server configuration.

Di different types of notifications be:

| Level     | Description                    | Example Use Case                |
|-----------|-------------------------------|---------------------------------|
| debug     | Detailed debugging info         | Function entry/exit points      |
| info      | General informational messages | Operation progress updates      |
| notice    | Normal but significant events  | Configuration changes           |
| warning   | Warning conditions             | Deprecated feature usage        |
| error     | Error conditions               | Operation failures              |
| critical  | Critical conditions            | System component failures       |
| alert     | Action must be taken immediately | Data corruption detected      |
| emergency | System no fit work             | Complete system failure         |

## How To Implement Notifications for MCP

To implement notifications for MCP, you need set both server and client sides to handle real-time updates. This go make your app dey give immediate feedback to users during long tasks.

### Server side: Sending Notifications

Make we start from server side. For MCP, you define tools wey fit send notifications while dem dey process requests. Server dey use context object (usually `ctx`) to send messages to client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

For di example before, `process_files` tool dey send three notifications to client as e dey process each file. `ctx.info()` method dey used to send informational messages.

Plus, to enable notifications, make sure your server dey use streaming transport (like `streamable-http`) and your client get message handler to process notifications. Dis na how to set your server for `streamable-http`:

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

For dis .NET example, `ProcessFiles` tool don carry `Tool` attribute and e dey send three notifications to client as e dey process each file. `ctx.Info()` method dey used to send informations.

To enable notifications for your .NET MCP server, make sure say you dey use streaming transport:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Client side: Receiving Notifications

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

From code before, `message_handler` function dey check if message wey enter na notification. If na, e go print am; if no, e go process as normal server message. Also see how `ClientSession` start wit `message_handler` to handle incoming notifications.

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

For dis .NET example, `MessageHandler` function dey check if incoming message na notification. If na, e print; if no, e process like normal server message. `ClientSession` dey start with message handler through `ClientSessionOptions`.

To enable notifications, make sure your server dey use streaming transport (like `streamable-http`) and your client get message handler to process notifications.

## Progress Notifications & Scenarios

Dis section go explain wetin be progress notifications for MCP, why e important, and how to implement am using Streamable HTTP. You go still find practical task to help you understand better.

Progress notifications na real-time messages wey server send client during long operations. Instead of waiting make whole work finish, server dey keep client updated about current status. Dis dey make thing clear, improve user experience and e make debugging easier.

**Example:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Why You Go Use Progress Notifications?

Progress notifications important for some reasons:

- **Better user experience:** Users go dey see update as work dey go, no be only at end.
- **Real-time feedback:** Clients fit show progress bars or logs, e make app dey quick respond.
- **Easier debugging and monitoring:** Developers and users fit see where work fit slow down or jam.

### How to Implement Progress Notifications

Dis na how you fit implement progress notifications for MCP:

- **For server:** Use `ctx.info()` or `ctx.log()` to send notifications as each item dey process. This one go send message to client before main result ready.
- **For client:** Implement message handler wey go dey listen and display notifications as dem dey come. Dis handler go sabi difference between notifications and final result.

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

Wen you dey implement MCP servers wen use HTTP-based transports, security na top mata wey need make you pay beta attention to plenti attack way dem fit use and how to protect.

### Overview

Security na important tin wen you dey expose MCP servers for inside HTTP. Streamable HTTP bring new beta attack ways and e need well well configuration.

### Key Points

- **Origin Header Validation**: Always check the `Origin` header to comot any DNS rebinding attacks.
- **Localhost Binding**: For local development, make server dem dey bind to `localhost` so dat e no go open for public internet.
- **Authentication**: Put for ground authentication like API keys, OAuth for your production setup dem.
- **CORS**: Setup Cross-Origin Resource Sharing (CORS) policies make e restrict who fit access.
- **HTTPS**: Use HTTPS for production to yarn your traffic well.

### Best Practices

- No ever trust request wey just enter without you check am.
- Log and monitor all access and any error wey show.
- Always update your dependencies make you fit patch any security weakness.

### Challenges

- How to balance security and beta development convenience
- How to make am compatible with different client environment dem

## Upgrading from SSE to Streamable HTTP

For apps wey dey use Server-Sent Events (SSE) now, if you comot go Streamable HTTP, e go give you better power and e go last well for your MCP versions.

### Why Upgrade?

Two big reasons dey why you for upgrade from SSE to Streamable HTTP:

- Streamable HTTP get better scalability, e dey compatible more, and e get rich notification support pass SSE.
- Na im be the recommended transport for new MCP apps.

### Migration Steps

Na so you fit take migrate from SSE go Streamable HTTP for your MCP apps dem:

- **Update your server code** make e use `transport="streamable-http"` inside `mcp.run()`.
- **Update your client code** make e use `streamablehttp_client` no be SSE client again.
- **Implement message handler** for the client for process notifications.
- **Test to see compatibility** with tools and workflow wey you dey use already.

### Maintaining Compatibility

E good make you still make your app fit run SSE client dem and also Streamable HTTP client dem while you dey do migration. Na dis way:

- You fit support SSE and Streamable HTTP together by running the two transports for different endpoints.
- Slowly migrate your clients go the new transport.

### Challenges

You need address these challenges wen you dey migrate:

- Make sure all clients don update
- Handle the difference between how notifications go come through

## Security Considerations

Security suppose always be your main priority wen you dey implement any server, mostly when you dey use HTTP-based transports like Streamable HTTP inside MCP. 

Wen you dey implement MCP servers wen use HTTP-based transports, security na paramount concern wey need careful eye on plenti attack vectors and how to protect well.

### Overview

Security dey critical wen you expose MCP servers for HTTP. Streamable HTTP bring new beta attack surfaces and e need well well setup.

Na some key security things be these:

- **Origin Header Validation**: Always check the `Origin` header well to stop DNS rebinding attacks.
- **Localhost Binding**: For inside local development, bind your servers to `localhost` so dat dem no go dey open for everybody online.
- **Authentication**: Implement authentication like API keys, OAuth for your production environment.
- **CORS**: Setup Cross-Origin Resource Sharing (CORS) policy make e restrict the access.
- **HTTPS**: Use HTTPS for production to encrypt wetin pass for traffic.

### Best Practices

Plus, here be some best practices to dey follow wen you dey do security setup for your MCP streaming server:

- No ever trust any request wey come without you check am first.
- Make you dey log and dey monitor all access and error dem.
- Make you dey update your dependencies well well to patch any security holes.

### Challenges

You go face some wahala wen you dey put security for MCP streaming servers:

- How to balance security with ease of development
- How to make am compatible with different client environments

### Assignment: Build Your Own Streaming MCP App

**Scenario:**
Build one MCP server and client wey server go dey process list of tins (like files or documents) and e go dey send notification each time e finish one item. The client go show each notification once e don land.

**Steps:**

1. Make one server tool wey go process list and send notifications for each item.
2. Make client with message handler to show notifications for real time.
3. Test your work by running both server and client, and dey watch the notifications.

[Solution](./solution/README.md)

## Further Reading & What Next?

To carry go your journey with MCP streaming and learn more, dis section get more resources and suggestions on wetin to do next to build advanced level apps.

### Further Reading

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### What Next?

- Try build more advanced MCP tools wey go use streaming for real-time analytics, chat, or make people fit collaborate to edit things.
- Try combine MCP streaming with frontend framework dem (React, Vue, etc.) to get live UI updates.
- Next: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->