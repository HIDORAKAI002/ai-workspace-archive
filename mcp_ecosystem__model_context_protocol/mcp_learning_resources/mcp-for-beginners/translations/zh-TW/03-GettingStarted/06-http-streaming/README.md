# 使用 Model Context Protocol (MCP) 的 HTTPS 流式傳輸

本章節提供了一份關於使用 HTTPS 和 Model Context Protocol (MCP) 實作安全、可擴展且即時流式傳輸的全面指南。內容涵蓋了流式傳輸的動機，可用的傳輸機制，如何在 MCP 中實現可流式的 HTTP，安全最佳實踐，從 SSE 過渡，以及構建您自己的流式 MCP 應用程式的實務指導。

> <strong>展望未來：</strong>本課程說明的是基於 **MCP 規範 2025-11-25** 的 Streamable HTTP，其中會在 `initialize` 階段建立會話，並透過 `Mcp-Session-Id` 標頭進行綁定。2026-07-28 的發布候選版本則完全移除握手和會話 ID，使每個請求都是自包含且可路由至任何伺服器實例，無需黏性會話。詳情請參見 [MCP 更新內容：2026-07-28 發布候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## MCP 中的傳輸機制與流式傳輸

本節探討 MCP 中可用的不同傳輸機制及其在實現客戶端與伺服器間即時通訊流式能力上的角色。

### 什麼是傳輸機制？

傳輸機制定義了客戶端和伺服器之間資料交換的方式。MCP 支援多種傳輸類型以適應不同的環境和需求：

- **stdio**：標準輸入/輸出，適用於本地與命令列工具。簡單但不適用於網頁或雲端。
- **SSE (Server-Sent Events)**：允許伺服器透過 HTTP 向客戶端推送即時更新。適合網頁使用介面，但在擴展性與彈性上有限。自 MCP 規範 2025-06-18 起，獨立的 SSE 傳輸已被棄用，改以「Streamable HTTP」傳輸取代。
- **Streamable HTTP**：現代基於 HTTP 的流式傳輸，支援通知功能並具備更佳擴展性。推薦用於大多數生產環境及雲端場景。

### 比較表

下面的比較表有助於理解這些傳輸機制之間的差異：

| 傳輸方式       | 即時更新          | 流式傳輸    | 擴展性      | 使用情境                |
|--------------|------------------|-----------|-----------|-------------------------|
| stdio        | 否               | 否        | 低         | 本地命令列工具          |
| SSE          | 是               | 是        | 中         | 網頁、即時更新          |
| Streamable HTTP | 是             | 是        | 高         | 雲端、多客戶端          |

> **提示：** 選擇適當的傳輸方式會影響效能、擴展性和使用者體驗。**Streamable HTTP** 建議用於現代、可擴展且雲端就緒的應用。

請注意你在前面章節見過的 stdio 和 SSE 傳輸，以及本章所涵蓋的 Streamable HTTP 傳輸。

## 流式傳輸：概念與動機

了解流式傳輸的基本概念和動機，對於實作有效的即時通訊系統至關重要。

<strong>流式傳輸</strong>是一種網路程式設計技術，允許資料分小塊或作為事件序列發送和接收，而不是必須等待整個回應準備好。這對以下情況尤為有用：

- 大型檔案或資料集。
- 即時更新（例如聊天、進度條）。
- 長時間運算，希望持續通知使用者狀態。

以下是對流式傳輸的高階認識：

- 資料是逐步傳送，而非一次性全部傳送。
- 客戶端可即時處理接收到的資料。
- 降低感知延遲，提升使用者體驗。

### 為何使用流式傳輸？

使用流式傳輸的理由如下：

- 使用者能立即獲得反饋，而不僅是結束時才知結果。
- 支援即時應用與回應快速的使用者介面。
- 更有效利用網路及運算資源。

### 簡單範例：HTTP 流式傳輸伺服器與客戶端

以下為如何實作流式傳輸的簡單範例：

#### Python

**伺服器 (Python，使用 FastAPI 和 StreamingResponse)：**

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

**客戶端 (Python，使用 requests)：**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

此例示範伺服器隨著訊息可用即時發送給客戶端，而非等待所有訊息準備好。

**運作原理：**

- 伺服器在每則訊息準備好時產生（yield）它。
- 客戶端接收並即時印出每個區塊。

**需求：**

- 伺服器必須使用流式回應（例如 FastAPI 的 `StreamingResponse`）。
- 客戶端必須以串流方式處理回應（requests 的 `stream=True`）。
- Content-Type 通常為 `text/event-stream` 或 `application/octet-stream`。

#### Java

**伺服器 (Java，使用 Spring Boot 和 Server-Sent Events)：**

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

**客戶端 (Java，使用 Spring WebFlux WebClient)：**

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

**Java 實作說明：**

- 使用 Spring Boot 的響應式堆疊與 `Flux` 進行流式傳輸
- `ServerSentEvent` 提供結構化事件流並有事件類型
- `WebClient` 搭配 `bodyToFlux()` 支援響應式流式消費
- `delayElements()` 模擬事件間處理時間
- 事件可帶類型（如 `info`、`result`），方便客戶端處理

### 比較：經典流式傳輸 vs MCP 流式傳輸

下面描述了「經典」流式傳輸與 MCP 流式傳輸在運作方式上的差異：

| 特性                | 經典 HTTP 流式傳輸              | MCP 流式傳輸（通知）             |
|---------------------|--------------------------------|---------------------------------|
| 主要回應            | 分塊 (chunked)                 | 單一且位於結尾                   |
| 進度更新            | 以資料區塊發送                 | 以通知訊息發送                   |
| 客戶端需求          | 必須處理串流                   | 必須實作訊息處理器               |
| 使用情境            | 大型檔案、AI 令牌串流         | 進度、日誌、即時回饋             |

### 觀察到的主要差異

此外，還有一些關鍵差異：

- **通訊模式：**
  - 經典 HTTP 流式傳輸：使用簡單的分塊傳輸編碼傳送資料區塊
  - MCP 流式傳輸：使用結構化通知系統及 JSON-RPC 協議

- **訊息格式：**
  - 經典 HTTP：純文字區塊並以換行分隔
  - MCP：結構化的 LoggingMessageNotification 物件，含元資料

- **客戶端實作：**
  - 經典 HTTP：簡單客戶端處理串流回應
  - MCP：較複雜的客戶端，實作訊息處理器以分辨不同訊息類型

- **進度更新：**
  - 經典 HTTP：進度是主回應串流的一部分
  - MCP：進度經由獨立通知訊息發送，主回應於最後送出

### 推薦建議

以下是關於採用經典流式（如我們先前示範的 `/stream` 端點）與 MCP 流式傳輸的建議：

- **單純流式需求：** 經典 HTTP 流式傳輸更簡單，適合基本流式應用。

- **複雜且互動性高的應用：** MCP 流式傳輸帶來結構化且富含元資料的方式，且將通知與最終結果分離。

- **AI 應用：** MCP 的通知機制特別適合需要持續回報進度的長時間 AI 任務。

## MCP 中的流式傳輸

好的，現在你已經看到一些關於經典流式和 MCP 流式的建議與比較，接下來詳細說明如何在 MCP 中運用流式傳輸。

了解 MCP 框架中流式傳輸的運作對於構建能即時回饋使用者、長時間運行的響應式應用至關重要。

在 MCP 中，流式傳輸不僅是將主要回應分塊發送，而是透過傳送<strong>通知</strong>給客戶端，在工具處理請求時即時更新進度。這些通知可包含進度報告、日誌或其他事件。

### 運作機制

主回應仍以單一訊息送出，但在處理過程中會以獨立訊息發送通知，使客戶端能即時接收更新。客戶端必須能處理並展示這些通知。

## 什麼是通知（Notification）？

我們提到了「通知」，在 MCP 的上下文中，它是什麼意思？

通知是伺服器發送給客戶端的訊息，用以告知進度、狀態或其他長時間作業中的事件。通知提升透明度並改善使用者體驗。

舉例來說，當客戶端與伺服器完成初始握手時，會發送一則通知。

通知訊息如下所示（JSON 格式）：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知屬於 MCP 中稱為 ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 的主題範疇。

> **棄用公告：** `2026-07-28` MCP 規範發布候選版本宣布 Logging 原語將被棄用，取而代之為 stdio 傳輸使用的 `stderr` 及結構化觀察性的 OpenTelemetry。在正式棄用至少一年內，Logging 功能仍於 `2025-11-25` 版本繼續有效。詳情請見 [MCP 更新內容：2026-07-28 發布候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

若要啟用 Logging，伺服器須將其設為功能/能力，如下：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 根據所使用的 SDK，Logging 可能預設為啟用，或需在伺服器配置中明確啟用。

不同種類的通知如下：

| 級別     | 描述                          | 範例使用情境                 |
|----------|-------------------------------|-----------------------------|
| debug    | 詳細除錯資訊                   | 函式進入/退出                |
| info     | 一般資訊性訊息                 | 作業進度更新                |
| notice   | 普通但重要事件                 | 配置變更                    |
| warning  | 警告狀況                     | 使用已棄用功能               |
| error    | 錯誤狀況                     | 作業失敗                    |
| critical | 關鍵狀況                     | 系統元件故障               |
| alert    | 必須立即採取行動               | 偵測到資料損壞             |
| emergency| 系統無法使用                 | 完整系統失效               |

## 在 MCP 中實作通知

若要在 MCP 中實作通知，須設置伺服器端及客戶端以處理即時更新，這讓應用能在長時間作業中即時回饋使用者。

### 伺服器端：發送通知

伺服器端可定義工具，在處理請求時發送通知。伺服器利用上下文物件（通常為 `ctx`）向客戶端發送訊息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在前述範例中，`process_files` 工具在處理每個檔案時會發送三則通知給客戶端。使用 `ctx.info()` 方法發送資訊訊息。

此外，為啟用通知功能，伺服器須使用流式傳輸（如 `streamable-http`），客戶端須實作訊息處理器以處理通知。以下示範如何配置伺服器使用 `streamable-http` 傳輸：

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

此 .NET 範例中，`ProcessFiles` 工具標註了 `Tool` 屬性，並在處理每個檔案時向客戶端發送三則通知。使用 `ctx.Info()` 方法發送資訊訊息。

啟用通知功能的 .NET MCP 伺服器，需確保使用流式傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客戶端：接收通知

客戶端必須實作訊息處理器，以接收並展示進來的通知。

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

在上述程式中，`message_handler` 函式判斷是否為通知訊息，是則列印通知，否則視為一般伺服器訊息處理。且 `ClientSession` 初始化時帶入 `message_handler` 以處理接收通知。

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

此 .NET 範例中，`MessageHandler` 函式判斷消息是否為通知，若是則印出通知，否則視為一般伺服器訊息處理。`ClientSession` 透過 `ClientSessionOptions` 帶入訊息處理器以完成初始化。

啟用通知時，請確保伺服器使用流式傳輸（如 `streamable-http`），且客戶端實作訊息處理器。

## 進度通知與應用場景

本節說明 MCP 中進度通知的概念、重要性，以及如何使用 Streamable HTTP 實作。並提供實務作業，幫助鞏固觀念。

進度通知是伺服器在長時間操作中向客戶端即時傳送的訊息。伺服器不必等完整程序完成，便持續向客戶端更新當前狀態。此舉提升透明度、使用者體驗並便於除錯。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 為什麼要使用進度通知？

進度通知的重要原因包括：

- **提升使用者體驗：** 使用者能隨著工作進展即時看到更新，而非只有完成時。
- **即時反饋：** 用戶端能顯示進度條或日誌，讓應用感覺更靈敏。
- **便於除錯與監控：** 開發人員及使用者能了解流程在哪裡可能緩慢或卡住。

### 如何實作進度通知

以下為在 MCP 中實作進度通知的做法：

- **伺服器端：** 在處理每項目時，使用 `ctx.info()` 或 `ctx.log()` 送出通知。這會在主結果完成前先傳訊息到客戶端。
- **客戶端：** 實作訊息處理器，監聽並展示即時到達的通知。訊息處理器能區分通知與最終結果。

**伺服器範例：**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**客戶端範例：**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## 安全考量

在使用基於 HTTP 的傳輸實作 MCP 伺服器時，安全性成為極為重要的考量，需要仔細注意多種攻擊向量及防護機制。

### 概述

對於透過 HTTP 露出 MCP 伺服器，安全性至關重要。串流式 HTTP 帶來新的攻擊面，需要謹慎配置。

### 主要重點

- **Origin 頭驗證**：務必驗證 `Origin` 頭以防止 DNS 重綁定攻擊。
- <strong>本機綁定</strong>：在本機開發時，將伺服器綁定於 `localhost`，避免向公共網際網路暴露。
- <strong>認證</strong>：於生產環境實施認證（例如 API 金鑰、OAuth）。
- **CORS**：配置跨來源資源共享（CORS）政策以限制訪問。
- **HTTPS**：在生產環境使用 HTTPS 加密流量。

### 最佳實踐

- 不要信任未經驗證的傳入請求。
- 記錄並監控所有訪問及錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰

- 在安全性與開發便利性之間取得平衡
- 確保與各種客戶端環境的相容性

## 從 SSE 升級到串流式 HTTP

對於當前使用 Server-Sent Events (SSE) 的應用程式，遷移至串流式 HTTP 能為 MCP 實作提供更強大功能及更佳的長期可維護性。

### 為什麼要升級？

有兩個強而有力的理由從 SSE 遷移到串流式 HTTP：

- 串流式 HTTP 相較 SSE 提供更佳的可擴展性、相容性以及更豐富的通知支援。
- 它是建議的新 MCP 應用程式傳輸方式。

### 遷移步驟

以下是您在 MCP 應用中從 SSE 遷移至串流式 HTTP 的方法：

- <strong>更新伺服器程式碼</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客戶端程式碼</strong>，改用 `streamablehttp_client` 取代 SSE 客戶端。
- <strong>實作訊息處理器</strong>，於客戶端處理通知。
- <strong>測試相容性</strong>，確認與現有工具與工作流程相容。

### 維持相容性

建議在遷移過程中維持對現有 SSE 客戶端的相容性。以下是一些策略：

- 您可以透過在不同端點運行 SSE 與串流式 HTTP 來同時支援兩種傳輸。
- 逐步遷移客戶端至新傳輸方式。

### 挑戰

請在遷移過程中注意以下挑戰：

- 確保所有客戶端皆已更新
- 處理通知傳遞的差異

## 安全考量

實作任何伺服器時，安全性應為首要任務，特別是在 MCP 中使用基於 HTTP 的傳輸，如串流式 HTTP。

在使用基於 HTTP 的傳輸實作 MCP 伺服器時，安全性成為極為重要的考量，需要仔細注意多種攻擊向量及防護機制。

### 概述

對於透過 HTTP 露出 MCP 伺服器，安全性至關重要。串流式 HTTP 帶來新的攻擊面，需要謹慎配置。

以下是一些主要的安全考量：

- **Origin 頭驗證**：務必驗證 `Origin` 頭以防止 DNS 重綁定攻擊。
- <strong>本機綁定</strong>：在本機開發時，將伺服器綁定於 `localhost`，避免向公共網際網路暴露。
- <strong>認證</strong>：於生產環境實施認證（例如 API 金鑰、OAuth）。
- **CORS**：配置跨來源資源共享（CORS）政策以限制訪問。
- **HTTPS**：在生產環境使用 HTTPS 加密流量。

### 最佳實踐

此外，以下是實作 MCP 串流伺服器時應遵從的最佳安全實踐：

- 不要信任未經驗證的傳入請求。
- 記錄並監控所有訪問及錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰

在 MCP 串流伺服器實作安全性時，您將面臨一些挑戰：

- 在安全性與開發便利性之間取得平衡
- 確保與各種客戶端環境的相容性

### 作業：建立您自己的串流 MCP 應用

**情境：**
建立一個 MCP 伺服器與客戶端，伺服器會處理一組項目（例如檔案或文件），並為每處理的項目發送通知。客戶端應即時顯示每則通知。

**步驟：**

1. 實作一個伺服器工具，處理列表並為每個項目發送通知。
2. 實作一個含訊息處理器的客戶端，實時顯示通知。
3. 執行並測試伺服器與客戶端，觀察通知。

[解答](./solution/README.md)

## 進階閱讀與後續步驟

為了繼續您在 MCP 串流的旅程並擴展知識，本節提供更多資源及建議的後續發展方向，用於構建更先進的應用程式。

### 進階閱讀

- [Microsoft：HTTP 串流簡介](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft：伺服器傳送事件 (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft：ASP.NET Core 中的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests：串流請求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 後續步驟

- 嘗試建立更進階的 MCP 工具，使用串流來實現即時分析、聊天或協同編輯。
- 探索將 MCP 串流與前端框架（React、Vue 等）整合，以實現即時 UI 更新。
- 下一步：[在 VSCode 中使用 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->