# 使用模型上下文协议 (MCP) 通过 HTTPS 流式传输

本章提供了使用 HTTPS 通过模型上下文协议 (MCP) 实现安全、可扩展和实时流式传输的全面指南。内容包括流式传输的动机、可用的传输机制、如何在 MCP 中实现可流式 HTTP、安全最佳实践、从 SSE 的迁移以及构建您自己的流式 MCP 应用的实用指导。

> **展望未来：** 本课描述了基于 **MCP Specification 2025-11-25** 的可流式 HTTP，其中会话在 `initialize` 期间建立，并通过 `Mcp-Session-Id` 头固定。`2026-07-28` 的候选版本彻底移除了握手和会话 ID，使每个请求都是自包含的，并且可以路由到任意服务器实例，无需粘滞会话。详情请参阅[2026-07-28 MCP 变更](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## MCP 中的传输机制与流式传输

本节探讨 MCP 中可用的不同传输机制及其在实现客户端和服务器之间实时通信流式能力中的作用。

### 什么是传输机制？

传输机制定义了客户端和服务器之间数据交换的方式。MCP 支持多种传输类型，以适应不同环境和需求：

- **stdio**：标准输入/输出，适合本地和基于 CLI 的工具。简单但不适合 Web 或云环境。
- **SSE (服务器发送事件)**：允许服务器通过 HTTP 向客户端推送实时更新。适合 Web UI，但在可扩展性和灵活性方面有限。根据 MCP Specification 2025-06-18，独立的 SSE 传输已被弃用，替换为“可流式 HTTP”传输。
- **可流式 HTTP**：基于现代 HTTP 的流式传输，支持通知和更好的可扩展性。推荐用于大多数生产和云场景。

### 对比表

查看下表以了解这些传输机制的区别：

| 传输机制       | 实时更新        | 流式传输     | 可扩展性       | 用例                  |
|----------------|-----------------|--------------|----------------|-----------------------|
| stdio          | 否              | 否           | 低             | 本地 CLI 工具           |
| SSE            | 是              | 是           | 中             | Web，实时更新          |
| 可流式 HTTP    | 是              | 是           | 高             | 云端，多客户端          |

> **提示：** 选择合适的传输会影响性能、可扩展性和用户体验。**可流式 HTTP** 推荐用于现代、可扩展及云就绪的应用。

请注意之前章节展示过的 stdio 和 SSE 传输机制，本章重点讲解的是可流式 HTTP 传输。

## 流式传输：概念与动机

理解流式传输的基本概念和动机，对于实现有效的实时通信系统至关重要。

<strong>流式传输</strong> 是网络编程中的一种技术，允许数据分小块或事件序列发送和接收，而不必等待整个响应准备好。此方法特别适用于：

- 大型文件或数据集。
- 实时更新（如聊天、进度条）。
- 长时间运行的计算过程，希望持续向用户反馈。

高层次理解流式传输需知：

- 数据是逐渐传送的，而非一次性全部到达。
- 客户端可以在数据到达时立即处理。
- 降低感知延迟，提升用户体验。

### 为什么使用流式传输？

使用流式传输的理由如下：

- 用户能即时获得反馈，而非仅在结束时收到结果。
- 支持实时应用和响应式界面。
- 更高效利用网络和计算资源。

### 简单示例：HTTP 流式传输服务器与客户端

以下是如何实现流式传输的简单示例：

#### Python

**服务器端（Python，使用 FastAPI 和 StreamingResponse）：**

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

**客户端（Python，使用 requests）：**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

该示例演示服务器端在消息可用时逐条发送给客户端，而非等待所有消息准备完毕。

**工作原理：**

- 服务器在每条消息准备好时使用 yield 发送。
- 客户端接收并打印每个到达的数据块。

**需求：**

- 服务器必须使用流响应（如 FastAPI 中的 `StreamingResponse`）。
- 客户端必须开启流处理（requests 中的 `stream=True`）。
- Content-Type 通常为 `text/event-stream` 或 `application/octet-stream`。

#### Java

**服务器端（Java，使用 Spring Boot 和 Server-Sent Events）：**

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

**客户端（Java，使用 Spring WebFlux WebClient）：**

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

- 使用 Spring Boot 的响应式栈和 `Flux` 实现流式传输
- `ServerSentEvent` 提供带事件类型的结构化事件流
- `WebClient` 搭配 `bodyToFlux()` 实现响应式流消费
- `delayElements()` 模拟事件间处理时间
- 事件可带类型（如 `info`、`result`）以辅助客户端处理

### 对比：经典流式传输与 MCP 流式传输

经典流式传输与 MCP 流式传输之间的差异如下图所示：

| 特性                   | 经典 HTTP 流式传输            | MCP 流式传输（通知）             |
|------------------------|------------------------------|---------------------------------|
| 主要响应               | 分块                         | 单次，最后发送                   |
| 进度更新               | 以数据块形式发送             | 以通知形式发送                   |
| 客户端要求             | 必须处理流式数据             | 必须实现消息处理器               |
| 用例                   | 大文件、AI 令牌流            | 进度、日志、实时反馈             |

### 观察到的关键差异

另外，一些关键差异如下：

- **通信模式：**
  - 经典 HTTP 流式传输：使用简单的分块传输编码发送数据块
  - MCP 流式传输：使用带 JSON-RPC 协议的结构化通知系统

- **消息格式：**
  - 经典 HTTP：纯文本数据块以换行分隔
  - MCP：带元数据的结构化 LoggingMessageNotification 对象

- **客户端实现：**
  - 经典 HTTP：简单客户端处理流式响应
  - MCP：更复杂的客户端，含消息处理器以处理不同类型消息

- **进度更新：**
  - 经典 HTTP：进度属于主响应流一部分
  - MCP：进度通过独立的通知消息发送，主响应在最后

### 建议

在选择实现经典流式传输（如上文 `/stream` 端点示例）还是 MCP 流式传输时，我们有以下建议：

- **简单流式需求：** 经典 HTTP 流式传输实现简单，足够基本需求。

- **复杂交互应用：** MCP 流式传输提供更结构化的方法，带有丰富元数据，通知与最终结果分离。

- **AI 应用：** MCP 的通知系统特别适合长时间运行的 AI 任务，实现持续的用户进度反馈。

## MCP 中的流式传输

到目前为止，你已经了解了经典流式传输与 MCP 流式传输的推荐和对比。接下来详细介绍如何利用 MCP 进行流式传输。

理解 MCP 框架中流式传输的工作原理，对于构建在长时间操作期间为用户提供实时反馈的响应式应用至关重要。

在 MCP 中，流式传输不是指分块发送主响应，而是指在处理请求时向客户端发送<strong>通知</strong>。这些通知可以包含进度更新、日志或其他事件。

### 工作原理

主结果仍作为单次响应发送。但处理期间可以发送独立通知消息，实时更新客户端。客户端必须能处理并显示这些通知。

## 什么是通知？

我们提到“通知”，在 MCP 环境中这是什么意思？

通知是服务器发送给客户端的消息，用于报告长时间操作中的进度、状态或其他事件。通知提升透明度与用户体验。

例如，客户端应在初始与服务器握手完成后，发送通知。

通知的 JSON 消息格式示例如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知属于 MCP 中称为["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 的主题。

> **弃用通知：** `2026-07-28` MCP 规范候选版本标记 Logging 原语为弃用，建议 stdio 传输使用 `stderr`，结构化可观察性使用 OpenTelemetry。2025-11-25 版本及弃用后至少一年内仍支持 Logging。详情请参阅[2026-07-28 MCP 变更](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

要启用日志记录，服务器需像下面这样配置为特性/能力：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 根据使用的 SDK 不同，日志可能默认启用，或需在服务器配置中显式启用。

通知有不同类型：

| 级别      | 描述                          | 示例用例                    |
|-----------|-------------------------------|-----------------------------|
| debug     | 详细调试信息                  | 函数入口/出口               |
| info      | 一般信息                     | 操作进度更新               |
| notice    | 正常但重要事件                | 配置变更                   |
| warning   | 警告条件                     | 过时功能使用               |
| error     | 错误条件                     | 操作失败                   |
| critical  | 严重条件                     | 系统组件故障               |
| alert     | 必须立即采取行动             | 发现数据损坏               |
| emergency | 系统不可用                   | 完全系统故障               |

## MCP 中实现通知

要在 MCP 中实现通知，您需要设置服务器端和客户端来处理实时更新。这使应用能在长时间操作期间向用户提供即时反馈。

### 服务器端：发送通知

先从服务器开始。在 MCP 中，您定义的工具可在处理请求时发送通知。服务器通过上下文对象（通常是 `ctx`）向客户端发送消息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在上述示例中，`process_files` 工具在处理每个文件时发送三条通知给客户端。`ctx.info()` 方法用来发送信息消息。

此外，确保服务器使用流式传输（如 `streamable-http`），客户端实现消息处理器来处理通知。以下是设置服务器使用 `streamable-http` 传输的示例：

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

在此 .NET 示例中，`ProcessFiles` 工具用 `Tool` 属性修饰，在处理每个文件时向客户端发送三条通知。`ctx.Info()` 方法用来发送信息消息。

要在您的 .NET MCP 服务器中启用通知，确保使用流式传输：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客户端：接收通知

客户端必须实现消息处理器，在通知到达时处理和显示它们。

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

在前述代码中，`message_handler` 函数检查消息是否为通知。如果是，则打印通知；否则作为普通服务器消息处理。注意 `ClientSession` 初始化时传入 `message_handler`，以处理通知消息。

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

在此 .NET 示例中，`MessageHandler` 函数检查消息是否为通知。若是，则打印；否则作为普通消息处理。`ClientSession` 通过 `ClientSessionOptions` 配置消息处理器。

确保服务器使用流式传输（如 `streamable-http`），客户端实现消息处理器以处理通知。

## 进度通知与场景

本节讲解 MCP 中进度通知的概念、重要性及如何用可流式 HTTP 实现。还包含实践作业以帮助加深理解。

进度通知是服务器在长时间操作期间向客户端发送的实时消息。服务器无需等待整个过程结束，即可持续更新客户端当前状态。此举提升透明度、用户体验并简化调试。

**示例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 为什么使用进度通知？

进度通知的重要原因包括：

- **更佳用户体验：** 用户随工作进展实时看到更新，而非仅在结束时。
- **实时反馈：** 客户端可显示进度条或日志，使应用感觉响应迅速。
- **易于调试与监控：** 开发者和用户能发现进程中的瓶颈或卡顿位置。

### 如何实现进度通知

以下是实现 MCP 中进度通知的方式：

- **服务器端：** 使用 `ctx.info()` 或 `ctx.log()` 在处理每个项目时发送通知。在主结果准备好之前通知客户端。
- **客户端：** 实现消息处理器监听、展示到达的通知。处理器能区分通知和最终结果。

**服务器端示例：**


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

## 安全注意事项

在使用基于 HTTP 传输的 MCP 服务器时，安全性成为首要问题，需要谨慎关注多种攻击向量和防护机制。

### 概述

在通过 HTTP 暴露 MCP 服务器时，安全至关重要。流式 HTTP 引入了新的攻击面，需要仔细配置。

### 关键点

- **Origin Header 验证**：始终验证 `Origin` 头以防止 DNS 重新绑定攻击。
- <strong>绑定到本地主机</strong>：在本地开发时，绑定服务器到 `localhost`，避免对公网暴露。
- <strong>身份认证</strong>：在生产部署中实现认证（例如 API 密钥、OAuth）。
- **CORS**：配置跨域资源共享（CORS）策略以限制访问。
- **HTTPS**：生产环境使用 HTTPS 加密流量。

### 最佳实践

- 绝不信任未验证的入站请求。
- 记录并监控所有访问和错误。
- 定期更新依赖以修补安全漏洞。

### 挑战

- 在安全性与开发便利性之间取得平衡
- 确保兼容各种客户端环境

## 从 SSE 升级到流式 HTTP

对于当前使用服务器发送事件（SSE）的应用，迁移到流式 HTTP 可提升功能并为 MCP 实现提供更好的长期可持续性。

### 升级原因

升级从 SSE 到流式 HTTP 有两个主要理由：

- 流式 HTTP 提供比 SSE 更好的可扩展性、兼容性和更丰富的通知支持。
- 它是新 MCP 应用的推荐传输方式。

### 迁移步骤

以下是将 MCP 应用从 SSE 迁移到流式 HTTP 的步骤：

- <strong>更新服务器代码</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客户端代码</strong>，使用 `streamablehttp_client` 替代 SSE 客户端。
- <strong>实现消息处理程序</strong>，在客户端处理通知。
- <strong>测试兼容性</strong>，确保与现有工具和工作流程兼容。

### 维护兼容性

建议在迁移过程中保持与现有 SSE 客户端的兼容性。以下是一些策略：

- 可通过在不同端点运行两种传输方式，同时支持 SSE 和流式 HTTP。
- 逐步迁移客户端到新传输方式。

### 挑战

迁移时需解决以下挑战：

- 确保所有客户端都已更新
- 处理通知传递差异

## 安全注意事项

在实现任何服务器时，安全应是首要任务，尤其是在 MCP 中使用基于 HTTP 的传输如流式 HTTP 时。 

在使用基于 HTTP 传输的 MCP 服务器时，安全性成为首要问题，需要谨慎关注多种攻击向量和防护机制。

### 概述

在通过 HTTP 暴露 MCP 服务器时，安全至关重要。流式 HTTP 引入了新的攻击面，需要仔细配置。

以下是一些关键的安全注意事项：

- **Origin Header 验证**：始终验证 `Origin` 头以防止 DNS 重新绑定攻击。
- <strong>绑定到本地主机</strong>：在本地开发时，绑定服务器到 `localhost`，避免对公网暴露。
- <strong>身份认证</strong>：在生产部署中实现认证（例如 API 密钥、OAuth）。
- **CORS**：配置跨域资源共享（CORS）策略以限制访问。
- **HTTPS**：生产环境使用 HTTPS 加密流量。

### 最佳实践

此外，在实现 MCP 流式服务器的安全时，以下最佳实践也应遵循：

- 绝不信任未验证的入站请求。
- 记录并监控所有访问和错误。
- 定期更新依赖以修补安全漏洞。

### 挑战

在实现 MCP 流式服务器安全时，您将面临一些挑战：

- 在安全性与开发便利性之间取得平衡
- 确保兼容各种客户端环境

### 作业：构建您自己的流式 MCP 应用

**场景：**
构建一个 MCP 服务器和客户端，服务器处理一个项目列表（例如文件或文档），并为每个处理项发送通知。客户端应实时显示每个通知。

**步骤：**

1. 实现一个服务器工具，处理列表并发送每个项目的通知。
2. 实现一个带有消息处理程序的客户端，实时显示通知。
3. 运行并测试您的服务器和客户端实现，观察通知效果。

[解决方案](./solution/README.md)

## 深入阅读及下一步计划

为继续您的 MCP 流式开发之旅并扩展您的知识，本节提供附加资源和建议的下一步，以构建更高级的应用。

### 深入阅读

- [Microsoft: HTTP 流式简介](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: 服务器发送事件 (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core 中的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: 流式请求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 下一步计划

- 尝试构建更高级的 MCP 工具，用于实时分析、聊天或协作编辑流。
- 探索将 MCP 流与前端框架（React、Vue 等）集成，以实现实时 UI 更新。
- 接下来：[利用 VSCode 的 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->