# HTTPS 流式传输与模型上下文协议 (MCP)

本章提供了使用 HTTPS 通过模型上下文协议 (MCP) 实现安全、可扩展和实时流式传输的全面指南。涵盖流式传输的动机、可用的传输机制、如何在 MCP 中实现可流式的 HTTP、安全最佳实践、从 SSE 的迁移，以及构建您自己的流式 MCP 应用程序的实用指导。

## MCP 中的传输机制与流式传输

本节探讨 MCP 中可用的不同传输机制及其在实现客户端与服务器之间实时通信流式功能中的作用。

### 什么是传输机制？

传输机制定义了客户端与服务器间数据交换的方式。MCP 支持多种传输类型，以适应不同的环境和需求：

- **stdio**：标准输入/输出，适用于本地和命令行工具，简单但不适合Web或云环境。
- **SSE（服务器发送事件）**：允许服务器通过 HTTP 向客户端推送实时更新。适合 Web 界面，但在可扩展性和灵活性方面有限。根据 MCP 2025-06-18 规范，独立的 SSE 传输已被弃用，取而代之的是“可流式 HTTP”传输。
- **可流式 HTTP**：基于现代 HTTP 的流式传输，支持通知和更好的可扩展性。推荐用于大多数生产和云场景。

### 比较表

请查看下面的比较表，了解这些传输机制之间的差异：

| 传输机制          | 实时更新        | 流式传输     | 可扩展性     | 使用场景                |
|-------------------|----------------|-----------|------------|-------------------------|
| stdio             | 否             | 否         | 低          | 本地命令行工具         |
| SSE               | 是             | 是         | 中          | Web，实时更新          |
| 可流式 HTTP       | 是             | 是         | 高          | 云端，多客户端         |

> **提示：** 选择合适的传输机制会影响性能、可扩展性和用户体验。**可流式 HTTP** 推荐用于现代、可扩展且云就绪的应用程序。

请注意前几章中展示的 stdio 和 SSE 传输，以及本章涉及的可流式 HTTP 传输。

## 流式传输：概念与动机

理解流式传输的基本概念和动机对于实现有效的实时通信系统至关重要。

<strong>流式传输</strong> 是一种网络编程技术，允许数据以小块或事件序列的形式发送和接收，而不是等待整个响应准备好。对此特别有用的情况包括：

- 大文件或大型数据集。
- 实时更新（如聊天、进度条）。
- 长时间运行的计算，需实时通知用户。

以下是关于流式传输的高层理解：

- 数据是渐进式传送，而非一次性全部传输。
- 客户端可以边接收边处理数据。
- 减少感知延迟，提高用户体验。

### 为什么使用流式传输？

使用流式传输的理由如下：

- 用户立即获得反馈，而不仅仅是在结束时。
- 支持实时应用和响应式用户界面。
- 更高效地利用网络和计算资源。

### 简单示例：HTTP 流式服务器与客户端

这是一个简单的流式实现示例：

#### Python

**服务器端 (Python，使用 FastAPI 和 StreamingResponse)：**

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

**客户端 (Python，使用 requests)：**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

该示例演示了服务器在消息可用时逐条发送给客户端，而不是等所有消息准备好后一次性发送。

**工作原理：**

- 服务器在消息准备好时逐条生成。
- 客户端接收并打印每个数据块。

**需求：**

- 服务器必须使用流式响应（例如 FastAPI 的 `StreamingResponse`）。
- 客户端需以流模式处理响应（requests 中设置 `stream=True`）。
- 内容类型通常为 `text/event-stream` 或 `application/octet-stream`。

#### Java

**服务器端 (Java，使用 Spring Boot 和服务器发送事件)：**

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

**客户端 (Java，使用 Spring WebFlux 的 WebClient)：**

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

**Java 实现说明：**

- 使用 Spring Boot 的响应式架构和 `Flux` 进行流式传输。
- `ServerSentEvent` 提供带事件类型的结构化事件流。
- 使用 `WebClient` 和 `bodyToFlux()` 实现响应式流式消费。
- `delayElements()` 模拟事件间的处理时间。
- 事件可带有类型（如 `info`、`result`），方便客户端处理。

### 比较：经典流式传输与 MCP 流式传输

经典流式传输与 MCP 中流式传输的区别如下所示：

| 特性                   | 经典 HTTP 流式传输              | MCP 流式传输（通知）           |
|------------------------|------------------------------|-------------------------------|
| 主响应                 | 分块传输                      | 单次传输，响应结束时发送      |
| 进度更新               | 作为数据块发送                | 通过通知发送                  |
| 客户端要求             | 必须处理流式数据              | 必须实现消息处理器            |
| 使用场景               | 大文件，AI 令牌流             | 进度、日志、实时反馈          |

### 观察到的关键差异

另外，这些是一些关键区别：

- **通信模式：**
  - 经典 HTTP 流式：使用简单的分块传输编码发送数据块
  - MCP 流式：使用结构化通知系统和 JSON-RPC 协议

- **消息格式：**
  - 经典 HTTP：纯文本分块，含换行符
  - MCP：结构化的 LoggingMessageNotification 对象，带元数据

- **客户端实现：**
  - 经典 HTTP：简单客户端处理流式响应
  - MCP：更复杂的客户端，带有消息处理器以处理不同类型消息

- **进度更新：**
  - 经典 HTTP：进度作为主响应流的一部分
  - MCP：进度通过单独的通知消息发送，主响应在结束时传递

### 推荐

关于选择实现经典流式传输（如上文所示的 `/stream` 端点）与 MCP 流式传输，有以下建议：

- **简单流式需求：** 经典 HTTP 流式实现更简单，足够满足基础流式需求。
- **复杂交互应用：** MCP 流式提供结构化方式，有更丰富的元数据，并实现通知与最终结果的分离。
- **AI 应用：** MCP 的通知系统特别适合需要向用户持续汇报进展的长时间 AI 任务。

## MCP 中的流式传输

到目前为止，我们已经看到关于经典流式和 MCP 流式的推荐及对比。接下来详细介绍如何在 MCP 中利用流式传输。

理解 MCP 框架内流式传输的工作原理对于构建在长时间运行操作中向用户提供实时反馈的响应式应用至关重要。

在 MCP 中，流式传输不是将主响应拆分成多个数据块发送，而是在工具处理请求时向客户端发送<strong>通知</strong>。这些通知可能包含进度更新、日志或其他事件。

### 工作机制

主结果仍以单次响应发送。但在处理过程中，可发送通知消息，实时更新客户端。客户端必须能够处理并显示这些通知。

## 什么是通知？

我们提到“通知”，在 MCP 语境下这意味着什么？

通知是服务器发送给客户端的消息，用以传达长时间运行操作中的进度、状态或其他事件。通知提升了透明度和用户体验。

例如，客户端应在与服务器完成初始握手后发送通知。

通知的 JSON 格式示例如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知属于 MCP 中一个称为 ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 的主题。

要启用日志功能，服务器需要在能力/特性中启用，如下所示：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 根据使用的 SDK，日志功能可能默认启用，或需要在服务器配置中显式启用。

通知类型分类如下：

| 等级       | 描述                          | 示例用途                    |
|------------|-------------------------------|-----------------------------|
| debug      | 详细调试信息                  | 函数入口/出口               |
| info       | 一般信息性消息                | 操作进度更新               |
| notice     | 普通但重要事件                | 配置变更                   |
| warning    | 警告状况                    | 弃用功能使用               |
| error      | 错误状况                    | 操作失败                   |
| critical   | 严重状况                    | 系统组件故障               |
| alert      | 必须立即采取行动             | 发现数据损坏               |
| emergency  | 系统不可用                  | 完全系统故障               |

## MCP 中实现通知

要实现 MCP 中的通知，需设置服务器和客户端以支持实时更新。这使您的应用能够在长时间操作中即时反馈给用户。

### 服务器端：发送通知

从服务器端开始。在 MCP 中，您定义的工具在处理请求时可以发送通知。服务器使用上下文对象（通常是 `ctx`）向客户端发送消息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在上述示例中，`process_files` 工具在处理每个文件时向客户端发送三条通知。`ctx.info()` 方法用于发送信息性消息。

此外，为启用通知，请确保服务器使用流式传输（如 `streamable-http`），客户端实现消息处理器以处理通知。以下是服务器使用 `streamable-http` 传输的配置示例：

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

在此 .NET 示例中，`ProcessFiles` 工具用 `Tool` 属性装饰，在处理每个文件时向客户端发送三条通知。`ctx.Info()` 方法用于发送信息性消息。

为启用通知，请确保 .NET MCP 服务器使用流式传输：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客户端：接收通知

客户端必须实现消息处理器，实时处理并显示通知。

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

上述代码中，`message_handler` 函数检查传入消息是否为通知。如果是，则打印通知；否则，按普通服务器消息处理。注意 `ClientSession` 通过 `message_handler` 初始化，用于处理传入通知。

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

在该 .NET 示例中，`MessageHandler` 函数检查消息是否为通知。是则打印，非通知则作为普通服务器消息处理。`ClientSession` 通过 `ClientSessionOptions` 传入消息处理器初始化。

启用通知时，确保服务器使用流式传输（如 `streamable-http`），客户端实现消息处理器以处理通知。

## 进度通知与场景

本节解释 MCP 中进度通知的概念、重要性及如何使用可流式 HTTP 实现。您还会得到实用练习以巩固理解。

进度通知是服务器在长时间操作中向客户端发送的实时消息。服务器不会等整个过程结束，而是持续更新当前状态。这提升了透明度、用户体验，并使调试更容易。

**示例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 为什么使用进度通知？

使用进度通知的原因包括：

- **更佳用户体验：** 用户能看到进度更新，而非只有结尾信息。
- **实时反馈：** 客户端可显示进度条或日志，使应用更灵敏。
- **更方便调试与监控：** 开发者和用户能查看进程卡顿或延迟位置。

### 如何实现进度通知

实现进度通知的方法如下：

- **服务器端：** 使用 `ctx.info()` 或 `ctx.log()` 在处理每个项目时发送通知，主结果准备前发送消息。
- **客户端：** 实现监听并显示通知的消息处理器，区分通知和最终结果。

**服务器示例：**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**客户端示例：**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## 安全考虑

在实现基于 HTTP 的 MCP 服务器时，安全成为首要关注点，需要仔细防范多种攻击向量并采取保护措施。

### 总览

通过 HTTP 公开 MCP 服务器时，安全尤为重要。可流式 HTTP 增加了新的攻击面，需认真配置。

### 关键要点

- **Origin 头验证**：始终验证 `Origin` 头，防止 DNS 重绑定攻击。
- <strong>本地主机绑定</strong>：本地开发时，将服务器绑定到 `localhost`，避免暴露于公网。
- <strong>身份验证</strong>：生产环境应实施身份验证（如 API 密钥、OAuth）。
- **CORS**：配置跨域资源共享 (CORS) 策略，限制访问。
- **HTTPS**：使用 HTTPS 保护生产环境流量。

### 最佳实践

- 永远不要信任未经验证的请求。
- 记录并监控所有访问和错误。
- 定期更新依赖项，修补安全漏洞。

### 挑战
- 平衡安全性与开发便利性
- 确保与各种客户端环境的兼容性

## 从 SSE 升级到 Streamable HTTP

对于当前使用服务器发送事件（SSE）的应用，迁移到 Streamable HTTP 可为您的 MCP 实现提供增强功能和更好的长期可维护性。

### 为什么要升级？

升级从 SSE 到 Streamable HTTP 有两个重要原因：

- Streamable HTTP 相较 SSE 提供了更好的可扩展性、兼容性和更丰富的通知支持。
- 它是新 MCP 应用推荐的传输方式。

### 迁移步骤

以下是在 MCP 应用中从 SSE 迁移到 Streamable HTTP 的步骤：

- <strong>更新服务器代码</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客户端代码</strong>，使用 `streamablehttp_client` 替代 SSE 客户端。
- <strong>在客户端实现消息处理器</strong>，以处理通知。
- <strong>测试与现有工具和工作流的兼容性</strong>。

### 保持兼容性

建议在迁移过程中保持对现有 SSE 客户端的兼容性。以下是一些策略：

- 可以通过在不同端点运行两种传输方式，同时支持 SSE 和 Streamable HTTP。
- 逐步迁移客户端到新的传输方式。

### 挑战

迁移期间需要解决以下挑战：

- 确保所有客户端都已更新
- 处理通知交付差异

## 安全考虑

在实现任何服务器时，安全应是首要任务，尤其是在 MCP 中使用基于 HTTP 的传输如 Streamable HTTP 时。

在实现基于 HTTP 传输的 MCP 服务器时，安全成为了至关重要的问题，需要关注多种攻击向量和防护机制。

### 概述

通过 HTTP 公开 MCP 服务器时，安全至关重要。Streamable HTTP 引入了新的攻击面，需要谨慎配置。

以下是一些关键的安全注意事项：

- **Origin 头验证**：始终验证 `Origin` 头以防止 DNS 反绑定攻击。
- <strong>绑定本地主机</strong>：本地开发时，将服务器绑定到 `localhost`，避免暴露给公共互联网。
- <strong>身份验证</strong>：生产环境部署时实现身份验证（如 API 密钥、OAuth）。
- **CORS**：配置跨源资源共享（CORS）策略以限制访问。
- **HTTPS**：生产环境使用 HTTPS 加密通信。

### 最佳实践

此外，这里有一些在实现 MCP 流式服务器安全时应遵循的最佳实践：

- 不要信任未经验证的请求。
- 记录并监视所有访问和错误。
- 定期更新依赖项以修补安全漏洞。

### 挑战

在实现 MCP 流式服务器安全时，您会面临一些挑战：

- 平衡安全性和开发便利性
- 确保与各种客户端环境的兼容性

### 任务：构建您自己的流式 MCP 应用

**场景：**
构建一个 MCP 服务器和客户端，服务器处理一系列项目（例如文件或文档），并为每个处理的项目发送通知。客户端应实时显示每条通知。

**步骤：**

1. 实现一个服务器工具，处理列表并为每个项目发送通知。
2. 实现一个客户端，带有消息处理器以实时显示通知。
3. 运行服务器和客户端进行测试，观察通知。

[解决方案](./solution/README.md)

## 进一步阅读及下一步？

为继续您对 MCP 流式的学习并扩展知识，本节提供更多资源和构建更高级应用的建议。

### 进一步阅读

- [Microsoft：HTTP 流介绍](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft：服务器发送事件（SSE）](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft：ASP.NET Core 中的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests：流式请求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 下一步？

- 试着构建更高级的 MCP 工具，用于实时分析、聊天或协同编辑的流式处理。
- 探索将 MCP 流与前端框架（React、Vue 等）集成，实现实时 UI 更新。
- 下一步：[在 VSCode 中利用 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->