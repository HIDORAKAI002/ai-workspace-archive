# 使用模型上下文协议（MCP）的 HTTPS 流式传输

本章提供了使用 HTTPS 实现模型上下文协议（MCP）安全、可扩展和实时流式传输的全面指南。内容涵盖了流式传输的动机、可用的传输机制、如何在 MCP 中实现可流式的 HTTP、安全最佳实践、从 SSE 迁移以及构建自己的流式 MCP 应用程序的实用指导。

> **前瞻：** 本课描述了 **MCP 规范 2025-11-25** 下的可流式 HTTP，其中会话在 `initialize` 期间建立，并使用 `Mcp-Session-Id` 头固定。`2026-07-28` 的发布候选版本完全移除了握手和会话 ID，使每个请求都是独立的，可路由到任何服务器实例，无需粘性会话。详情请参见 [MCP 变化：2026-07-28 发布候选版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## MCP 中的传输机制和流式传输

本节探讨 MCP 中可用的不同传输机制及其在实现客户端和服务器之间实时通信流能力中的作用。

### 什么是传输机制？

传输机制定义了客户端和服务器之间数据交换的方式。MCP 支持多种传输类型，以适应不同环境和需求：

- **stdio**：标准输入/输出，适合本地和命令行工具。简单但不适合 Web 或云环境。
- **SSE（服务器发送事件）**：允许服务器通过 HTTP 向客户端推送实时更新，适合网页 UI，但扩展性和灵活性有限。根据 MCP 规范 2025-06-18，独立 SSE 传输已被弃用，改由“可流式 HTTP”传输替代。
- **可流式 HTTP**：现代基于 HTTP 的流式传输，支持通知和更好的扩展性。推荐用于大多数生产和云场景。

### 对比表

请查看下表，了解这些传输机制之间的差异：

| 传输方式         | 实时更新         | 流式传输      | 可扩展性      | 使用场景                 |
|-------------------|------------------|-----------|-------------|-------------------------|
| stdio             | 否               | 否        | 低          | 本地命令行工具           |
| SSE               | 是               | 是        | 中          | Web，实时更新           |
| 可流式 HTTP       | 是               | 是        | 高          | 云，多客户端            |

> **提示：** 选择合适的传输方式会影响性能、可扩展性和用户体验。**可流式 HTTP** 推荐用于现代、可扩展和云就绪的应用程序。

注意前面章节介绍的 stdio 和 SSE 传输方式，以及本章涵盖的可流式 HTTP 传输。

## 流式传输：概念与动机

理解流式传输的基本概念和动机，是实现高效实时通信系统的关键。

<strong>流式传输</strong> 是网络编程中的一种技术，允许数据以小块或事件序列的形式发送和接收，而无需等待整个响应准备完毕。它特别适用于：

- 大文件或数据集。
- 实时更新（例如聊天、进度条）。
- 长时间运行的计算，保持用户知晓。

以下是流式传输的核心要点：

- 数据逐步传输，而非一次性全部完成。
- 客户端可边接收边处理数据。
- 减少感知延迟，提升用户体验。

### 为什么要使用流式传输？

使用流式传输的理由如下：

- 用户能够即时获得反馈，而非只在操作结束后。
- 支持实时应用和响应式用户界面。
- 更高效地利用网络和计算资源。

### 简单示例：HTTP 流式服务器与客户端

下面是一个如何实现流式传输的简单示例：

#### Python

**服务器（Python，使用 FastAPI 和 StreamingResponse）：**

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

该示例展示了服务器如何在消息可用时逐条发送给客户端，而非等待所有消息准备完毕。

**工作原理：**

- 服务器在每条消息准备好时逐条发送。
- 客户端逐块接收并打印数据。

**要求：**

- 服务器必须使用流式响应（例如 FastAPI 中的 `StreamingResponse`）。
- 客户端必须以流式方式处理响应（requests 中使用 `stream=True`）。
- 通常内容类型为 `text/event-stream` 或 `application/octet-stream`。

#### Java

**服务器（Java，使用 Spring Boot 和服务器发送事件）：**

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

- 使用 Spring Boot 的响应式栈和 `Flux` 流式支持。
- `ServerSentEvent` 提供结构化事件流及事件类型。
- `WebClient` 通过 `bodyToFlux()` 实现响应式流消费。
- `delayElements()` 模拟事件间的处理时间。
- 事件可设置类型（如 `info`、`result`）以便客户端处理。

### 对比：经典流式传输与 MCP 流式传输

经典流式传输与 MCP 中流式传输的区别如下：

| 特性                   | 经典 HTTP 流式传输             | MCP 流式传输（通知机制）           |
|------------------------|-------------------------------|-----------------------------------|
| 主要响应               | 分块传输                      | 单次响应完结                      |
| 进度更新               | 作为数据块发送                | 通过通知消息发送                  |
| 客户端需求             | 需处理流式响应                | 需实现消息处理器                  |
| 使用场景               | 大文件、AI 令牌流              | 进度、日志、实时反馈              |

### 关键差异

此外，一些关键差异包括：

- **通信模式：**
  - 经典 HTTP 流使用简单的分块传输编码发送数据块
  - MCP 流使用结构化通知系统，基于 JSON-RPC 协议

- **消息格式：**
  - 经典 HTTP：纯文本块，带换行符
  - MCP：结构化的 LoggingMessageNotification 对象，带元数据

- **客户端实现：**
  - 经典 HTTP：简单客户端处理流式响应
  - MCP：更复杂的客户端，带专门的消息处理器处理各类消息

- **进度更新：**
  - 经典 HTTP：进度是响应流本身的一部分
  - MCP：进度通过单独的通知消息发送，主响应最终完成时返回

### 推荐建议

关于实现经典流式传输（如上面使用 `/stream` 的端点示例）与 MCP 流式传输的选择，我们有一些建议：

- **针对简单流式需求：** 经典 HTTP 流式更易实现，适合基础流式需求。

- **针对复杂交互应用：** MCP 流式提供更结构化的处理，包含丰富元数据，分离通知和最终结果。

- **针对 AI 应用：** MCP 的通知系统非常适合长时间运行的 AI 任务，及时向用户通报进度。

## MCP 中的流式传输

好的，到目前为止你已经看了推荐和对比，接下来我们详细介绍如何利用 MCP 实现流式传输。

理解 MCP 框架下流式传输的工作原理，对于构建在长时间运行操作中向用户提供实时反馈的响应式应用至关重要。

在 MCP 中，流式传输并非把主响应分块发送，而是处理请求期间向客户端发送<strong>通知</strong>。这些通知包含进度更新、日志或其他事件。

### 工作原理

主结果仍作为单次响应发送。但处理过程中会发送独立通知消息，实时更新客户端。客户端必须能处理并显示这些通知。

## 什么是通知？

我们提到“通知”，在 MCP 背景下这是什么意思？

通知是服务器向客户端发送的消息，用于报告长时间处理操作中的进度、状态或其他事件。通知提升透明度和用户体验。

例如，客户端需在与服务器完成初步握手后发送通知。

通知作为 JSON 消息示例如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知归属于 MCP 中称为["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging)的话题。

要使日志生效，服务器需要启用该功能/能力，如下所示：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 根据所用 SDK，日志可能默认启用，或需在服务器配置中明确启用。

通知有不同类型：

| 级别        | 描述                         | 示例用例                    |
|------------|------------------------------|----------------------------|
| debug      | 详细调试信息                 | 函数入口/出口              |
| info       | 一般信息消息                 | 操作进度更新              |
| notice     | 正常但重要的事件             | 配置更改                  |
| warning    | 警告状况                     | 过时特性使用              |
| error      | 错误状况                     | 操作失败                  |
| critical   | 严重状况                     | 系统组件故障              |
| alert      | 需立即采取行动               | 检测到数据损坏            |
| emergency  | 系统不可用                   | 完全系统故障              |

## 在 MCP 中实现通知

要在 MCP 中实现通知，需要在服务器端和客户端都设置实时更新处理。这使您的应用程序在长时间操作中能为用户提供即时反馈。

### 服务器端：发送通知

从服务器端开始。在 MCP 中，可以定义在处理请求期间发送通知的工具。服务器使用上下文对象（通常是 `ctx`）向客户端发送消息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在上一个示例中，`process_files` 工具在处理每个文件时向客户端发送了三条通知。使用了 `ctx.info()` 方法发送信息类消息。

此外，为启用通知，确保服务器使用流式传输（如 `streamable-http`），客户端实现消息处理器以处理通知。下面是服务器如何设置使用 `streamable-http` 传输：

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

在此 .NET 示例中，`ProcessFiles` 工具带有 `Tool` 属性修饰符，处理每个文件时向客户端发送三条通知。使用 `ctx.Info()` 方法发送信息消息。

要在您的 .NET MCP 服务器中启用通知，确保使用流式传输：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客户端：接收通知

客户端必须实现消息处理器，以处理并显示到达的通知。

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

在此前代码中，`message_handler` 函数检查传入消息是否为通知。若是，则打印通知；否则，按常规服务器消息处理。注意 `ClientSession` 初始化时传入了 `message_handler` 来处理通知。

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

在此 .NET 示例中，`MessageHandler` 函数检查传入消息是否为通知。若是，则打印通知；否则，按常规服务器消息处理。`ClientSession` 通过 `ClientSessionOptions` 传入消息处理器。

为启用通知，请确保服务器使用流式传输（如 `streamable-http`），客户端实现消息处理器以处理通知。

## 进度通知与应用场景

本节介绍 MCP 中的进度通知概念、重要性以及如何使用可流式 HTTP 实现。您还会有实用作业以加深理解。

进度通知是在长时间操作期间服务器向客户端发送的实时消息。服务器不必等操作完成，而是持续更新客户端当前状态。此举提升透明度、用户体验并简化调试。

**示例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 为什么使用进度通知？

使用进度通知的主要原因包括：

- **更好用户体验：** 用户能实时看到操作进展，而非仅最终结果。
- **实时反馈：** 客户端显示进度条或日志，使应用显得响应迅速。
- **简化调试与监控：** 开发者和用户能及时发现进程中的瓶颈或卡顿。

### 如何实现进度通知

MCP 中实现进度通知的方法：

- **服务器端：** 处理每个项目时调用 `ctx.info()` 或 `ctx.log()` 发送通知。通知在主结果准备好之前发送。
- **客户端：** 实现消息处理器监听并显示通知。该处理器区分通知与最终结果。

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

## 安全性考虑

使用基于 HTTP 传输的 MCP 服务器时，安全性是首要关切，需要对多种攻击向量和防护机制进行细致管理。

### 概述

MCP 服务器在 HTTP 环境中暴露时，安全至关重要。可流式 HTTP 带来新的攻击面，需谨慎配置。

### 关键要点


- <strong>来源头验证</strong>：始终验证 `Origin` 头以防止 DNS 重新绑定攻击。
- <strong>本地主机绑定</strong>：本地开发时，将服务器绑定到 `localhost`，避免向公共互联网暴露。
- <strong>身份验证</strong>：为生产部署实现身份验证（例如，API 密钥、OAuth）。
- **跨源资源共享 (CORS)**：配置跨源资源共享策略以限制访问。
- **HTTPS**：生产环境使用 HTTPS 加密流量。

### 最佳实践

- 切勿在未经验证的情况下信任传入请求。
- 记录并监控所有访问和错误。
- 定期更新依赖项以修补安全漏洞。

### 挑战

- 在安全性和开发便捷性之间取得平衡
- 确保与各种客户端环境的兼容性

## 从 SSE 升级到 Streamable HTTP

对于当前使用服务器发送事件（SSE）的应用程序，迁移到 Streamable HTTP 可为您的 MCP 实现提供增强的功能和更好的长期可持续性。

### 为什么要升级？

升级从 SSE 到 Streamable HTTP 有两个有力的理由：

- Streamable HTTP 提供比 SSE 更好的可扩展性、兼容性和更丰富的通知支持。
- 它是新 MCP 应用程序推荐的传输方式。

### 迁移步骤

以下是您可以在 MCP 应用程序中从 SSE 迁移到 Streamable HTTP 的方法：

- <strong>更新服务器代码</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客户端代码</strong>，使用 `streamablehttp_client` 替代 SSE 客户端。
- <strong>在客户端实现消息处理器</strong> 以处理通知。
- <strong>测试与现有工具和工作流的兼容性</strong>。

### 维护兼容性

建议在迁移过程中保持对现有 SSE 客户端的兼容性。以下是一些策略：

- 可以通过在不同端点运行两种传输同时支持 SSE 和 Streamable HTTP。
- 逐步将客户端迁移到新传输。

### 挑战

在迁移过程中，请确保应对以下挑战：

- 确保所有客户端都已更新
- 处理通知传递的差异

## 安全注意事项

实现任何服务器时安全都应是首要任务，尤其是在 MCP 中使用基于 HTTP 的传输如 Streamable HTTP 时。

在使用基于 HTTP 的传输实现 MCP 服务器时，安全成为重中之重，需要细致关注多种攻击向量和防护机制。

### 概述

当通过 HTTP 暴露 MCP 服务器时，安全至关重要。Streamable HTTP 引入了新的攻击面，需要细致配置。

以下是一些关键的安全考虑：

- <strong>来源头验证</strong>：始终验证 `Origin` 头以防止 DNS 重新绑定攻击。
- <strong>本地主机绑定</strong>：本地开发时，将服务器绑定到 `localhost`，避免向公共互联网暴露。
- <strong>身份验证</strong>：为生产部署实现身份验证（例如，API 密钥、OAuth）。
- **跨源资源共享 (CORS)**：配置跨源资源共享策略以限制访问。
- **HTTPS**：生产环境使用 HTTPS 加密流量。

### 最佳实践

此外，在您的 MCP 流服务器中实施安全时，以下是一些推荐的最佳实践：

- 切勿在未经验证的情况下信任传入请求。
- 记录并监控所有访问和错误。
- 定期更新依赖项以修补安全漏洞。

### 挑战

在 MCP 流服务器实施安全时，您将面临一些挑战：

- 在安全性和开发便捷性之间取得平衡
- 确保与各种客户端环境的兼容性

### 任务：构建您自己的流式 MCP 应用

**场景：**
构建一个 MCP 服务器和客户端，服务器处理一组项（例如文件或文档），并为每处理的项发送一条通知。客户端应在通知到达时显示。

**步骤：**

1. 实现一个服务器工具，处理列表并为每个项发送通知。
2. 实现带有消息处理器的客户端，实时显示通知。
3. 通过同时运行服务器和客户端测试您的实现，并观察通知。

[解决方案](./solution/README.md)

## 深入阅读与下一步

为了继续您的 MCP 流媒体之旅并扩展知识，本节提供了额外资源和构建更高级应用的建议下一步。

### 深入阅读

- [微软：HTTP 流简介](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [微软：服务器发送事件 (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [微软：ASP.NET Core 中的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests：流式请求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 下一步？

- 尝试构建使用流进行实时分析、聊天或协作编辑的更高级 MCP 工具。
- 探索将 MCP 流与前端框架（React、Vue 等）集成，实现实时 UI 更新。
- 接下来：[利用 VSCode 的 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->