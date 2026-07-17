# 使用 Model Context Protocol (MCP) 進行 HTTPS 串流

本章提供了使用 HTTPS 和 Model Context Protocol (MCP) 實現安全、可擴展及實時串流的完整指南。涵蓋了串流的動機、可用的傳輸機制、如何在 MCP 中實作可串流的 HTTP、安全最佳實踐、從 SSE 遷移的步驟，以及構建您自己的串流 MCP 應用的實用指導。

> **前瞻說明：** 本課程所述的 Streamable HTTP 依據 **MCP 規範 2025-11-25**，會在 `initialize` 階段建立會話並以 `Mcp-Session-Id` 標頭做會話綁定。2026-07-28 的發行候選版本則完全移除握手及會話 ID，使每個請求皆自成一體，可路由到任何伺服器實例，無需 sticky sessions。詳見[什麼是 MCP 變更：2026-07-28 發行候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## MCP 的傳輸機制與串流

本節探討 MCP 中可用的不同傳輸機制，以及它們在實現客戶端與伺服器之間實時通訊串流功能中的角色。

### 什麼是傳輸機制？

傳輸機制定義了客戶端和伺服器之間如何交換數據。MCP 支援多種傳輸類型，以適應不同環境和需求：

- **stdio**：標準輸入/輸出，適用於本地和命令列介面工具。簡單但不適用於網絡或雲端環境。
- **SSE (Server-Sent Events)**：允許伺服器透過 HTTP 向客戶端推送實時更新。適合網頁介面，但在擴展性及彈性上有限。根據 MCP 規範 2025-06-18，獨立的 SSE 傳輸已被棄用，取而代之的是“可串流 HTTP”傳輸。
- **可串流 HTTP**：現代基於 HTTP 的串流傳輸，支援通知與更佳的擴展性。推薦用於多數生產及雲端場景。

### 比較表

請參考下表了解這些傳輸機制間的差異：

| 傳輸             | 實時更新       | 串流        | 擴展性       | 使用場景                |
|-----------------|--------------|------------|------------|-----------------------|
| stdio           | 否            | 否          | 低           | 本地命令列工具         |
| SSE             | 是            | 是          | 中           | 網頁、實時更新         |
| 可串流 HTTP        | 是            | 是          | 高           | 雲端、多用戶           |

> **提示：** 選擇正確的傳輸將影響性能、擴展性與使用者體驗。**可串流 HTTP** 是現代化、可擴展且適合雲端應用的推薦方案。

請注意，之前章節中介紹的 stdio 和 SSE 傳輸，而本章則主要講解可串流 HTTP 傳輸。

## 串流：概念與動機

理解串流背後的基本概念與動機，對於實現有效的實時通訊系統至關重要。

<strong>串流</strong> 是網絡程式設計的一種技術，讓資料在還未準備完成整體回應之前，能逐小塊發送接收或作為事件序列傳輸。這對以下情境特別有用：

- 大型檔案或資料集。
- 實時更新（例如聊天、進度條）。
- 長時間運算過程中即時通知使用者狀態。

以下是有關串流的高級要點：

- 資料是逐步送達的，而非一次傳送完成。
- 客戶端可在資料到達時即時處理。
- 降低感知延遲，提升使用體驗。

### 為什麼使用串流？

使用串流的原因如下：

- 使用者能即時得到回饋，而非等到結束才看到結果。
- 支援實時應用與響應式使用者介面。
- 更有效率地利用網路與計算資源。

### 簡單示例：HTTP 串流伺服器與客戶端

這裡示範一個如何實作串流的簡單範例：

#### Python

**伺服器（Python，使用 FastAPI 與 StreamingResponse）：**

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

**客戶端（Python，使用 requests）：**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

此示例展示伺服器如何在消息可用時依序發送給客戶端，而非等待所有消息準備完畢。

**運作原理：**

- 伺服器於準備好每條消息時產生（yield）訊息。
- 客戶端在資料到達時即時接收並列印。

**需求：**

- 伺服器需使用串流回應（例如 FastAPI 的 `StreamingResponse`）。
- 客戶端須以流方式處理回應（requests 中 `stream=True`）。
- Content-Type 通常為 `text/event-stream` 或 `application/octet-stream`。

#### Java

**伺服器（Java，使用 Spring Boot 和 Server-Sent Events）：**

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

**客戶端（Java，使用 Spring WebFlux WebClient）：**

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

- 使用 Spring Boot 反應式框架的 `Flux` 實現串流。
- `ServerSentEvent` 提供具事件類型的結構化串流。
- 透過 `WebClient` 的 `bodyToFlux()` 實現反應式串流消費。
- `delayElements()` 模擬事件間的處理時間。
- 事件可帶類型（`info`、`result`）以利客戶端分辨。

### 比較：傳統串流與 MCP 串流

傳統串流與 MCP 串流的差異可如下示意：

| 特性                  | 傳統 HTTP 串流                | MCP 串流（通知）             |
|-----------------------|----------------------------|----------------------------|
| 主要回應               | 分塊傳輸                     | 單次回應於最後傳送           |
| 進度更新               | 以資料塊形式傳送             | 透過通知訊息傳送             |
| 客戶端需求             | 必須處理串流資料             | 必須實作消息處理器           |
| 使用案例               | 大型檔案、AI 代幣串流         | 進度、日誌、實時反饋         |

### 主要差異觀察

此外，主要差異還包括：

- **通訊模式：**
  - 傳統 HTTP 串流：用簡單的分塊轉送編碼(chunked transfer encoding)傳送資料。
  - MCP 串流：用基於 JSON-RPC 協議的結構化通知系統。

- **消息格式：**
  - 傳統 HTTP：純文字分塊，帶換行符號。
  - MCP：結構化的 LoggingMessageNotification 物件，含元資料。

- **客戶端實作：**
  - 傳統 HTTP：簡單客戶端處理串流回應。
  - MCP：較為進階的客戶端，實作消息處理器以處理不同類型消息。

- **進度更新：**
  - 傳統 HTTP：進度是主要回應串流的一部分。
  - MCP：進度以獨立通知訊息發送，主要回應在結尾送出。

### 建議

選擇實作傳統串流（如先前我們示範的 `/stream` 端點）或選擇 MCP 串流時，以下建議可供參考：

- **簡單串流需求時：** 傳統 HTTP 串流較易實現，足夠滿足基本串流需求。

- **複雜互動應用：** MCP 串流提供更結構化的方法，具更豐富的元資料，且將通知與最終結果分離。

- **AI 應用場景：** MCP 的通知系統特別適合需要長時間運算並持續向用戶回報進度的 AI 任務。

## MCP 中的串流

好的，到目前為止你已看到關於傳統串流與 MCP 串流的比較與建議。現在深入了解如何在 MCP 中具體利用串流功能。

理解 MCP 框架中的串流運作，對於構建長時間操作期間能即時回饋給用戶的響應式應用至關重要。

在 MCP 中，串流並非將主要回應分塊傳送，而是向客戶端發送<strong>通知</strong>，告知工具正在處理請求的進度、日誌或其他事件。

### 運作方式

主要結果仍以單一回應傳送。然而，可在處理過程中以獨立訊息發送通知，實時更新客戶端。客戶端必須能處理並顯示這些通知。

## 什麼是通知（Notification）？

我們提到「通知」，在 MCP 中這是什麼意思？

通知是從伺服器端傳送給客戶端的訊息，用以告知進度、狀態或長時間運作中的其他事件。通知提昇透明度和用戶體驗。

例如，客戶端在完成與伺服器的初始握手後應該發送一條通知。

通知 JSON 訊息範例如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知屬於 MCP 中一個稱為 ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 的專題。

> **棄用通知：** 2026-07-28 MCP 規範發行候選版本將標記 Logging 原語為棄用，轉向 stdio 傳輸使用 `stderr` 與結構化觀測的 OpenTelemetry。Logging 在 `2025-11-25` 版本及正規棄用後至少一年將繼續運作。詳見[什麼是 MCP 變更：2026-07-28 發行候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

要讓日誌運作，伺服器需啟用此功能/能力，如下：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 根據所用 SDK，日誌功能可能預設啟用，或需要在伺服器配置明確啟用。

通知類型多樣：

| 等級       | 描述                         | 使用範例                        |
|------------|------------------------------|-------------------------------|
| debug      | 詳細的除錯資訊                | 函數進入/退出點                 |
| info       | 一般資訊性訊息                | 操作進度更新                   |
| notice     | 正常但重要事件                | 配置變更                       |
| warning    | 警告條件                     | 棄用功能使用                   |
| error      | 錯誤條件                     | 操作失敗                       |
| critical   | 關鍵條件                     | 系統元件故障                  |
| alert      | 必須立刻採取行動             | 檢測到資料損壞                |
| emergency  | 系統不可用                   | 完整系統故障                  |

## MCP 中實作通知

要在 MCP 中實作通知，您需要設置伺服器和客戶端兩端以處理實時更新，使您的應用在長時間運作期間能向使用者提供即時回饋。

### 伺服器端：發送通知

從伺服器端開始。在 MCP 中，您定義能在處理請求時發送通知的工具。伺服器使用上下文物件（通常為 `ctx`）向客戶端傳送訊息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在上述範例中，`process_files` 工具在處理每個檔案時發送了三條通知。`ctx.info()` 方法用於發送資訊訊息。

此外，要啟用通知，請確保伺服器使用串流傳輸（如 `streamable-http`），且客戶端實作消息處理器處理通知。伺服器設定使用 `streamable-http` 傳輸的示例如下：

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

在這個 .NET 範例中，`ProcessFiles` 工具以 `Tool` 屬性標記，並在處理檔案時向客戶端發送三條通知。`ctx.Info()` 用於發送資訊訊息。

要在您的 .NET MCP 伺服器啟用通知，確保使用串流傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客戶端：接收通知

客戶端必須實作消息處理器，以處理並顯示接收的通知。

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

以上程式中，`message_handler` 函式檢查傳入訊息是否為通知。是則列印通知，否則當作普通伺服器訊息處理。注意 `ClientSession` 初始化時帶入了 `message_handler` 用於處理通知。

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

在此 .NET 範例中，`MessageHandler` 函式用以判定訊息是否通知，若是則打印通知，否則如常處理伺服器訊息。`ClientSession` 透過 `ClientSessionOptions` 以消息處理器初始化。

為啟用通知，確保伺服器使用串流傳輸（如 `streamable-http`），且客戶端實作消息處理器以處理通知。

## 進度通知及情境

本節說明 MCP 中進度通知的概念、重要性及如何使用可串流 HTTP 實作，並附帶實作作業以鞏固理解。

進度通知是在長時間操作期間，伺服器即時向客戶端發送的訊息。伺服器不需等整個流程完成，便持續更新當前狀態，增進透明度與用戶體驗，並方便除錯。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 為何使用進度通知？

進度通知的重要性在於：

- **改善使用者體驗：** 使用者可在工作進行中即見更新，而非僅在結束時收到結果。
- **實時反饋：** 客戶端可顯示進度條或日誌，增強應用回應感。
- **更易除錯和監控：** 開發者與用戶能看出流程卡住或延遲處。

### 如何實作進度通知

下述說明如何在 MCP 實現進度通知：

- **伺服器端：** 透過 `ctx.info()` 或 `ctx.log()` 發送通知以報告每個項目處理進度，在主要結果準備好前即傳送訊息給客戶端。
- **客戶端：** 實作消息處理器，監聽並顯示來的通知，此處理器區分通知與最終結果。

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

在使用基於 HTTP 的傳輸方式實作 MCP 伺服器時，安全性成為首要考量，需要細心注意多種攻擊向量及防護機制。

### 概述

在透過 HTTP 暴露 MCP 伺服器時，安全性至關重要。Streaming HTTP 引入了新的攻擊面，需要仔細設定。

### 重要重點

- **Origin 標頭驗證**：務必驗證 `Origin` 標頭以防止 DNS 重綁定攻擊。
- <strong>本機綁定</strong>：開發階段請將伺服器綁定於 `localhost`，避免將伺服器暴露於公共網絡。
- <strong>驗證機制</strong>：於正式部署時實作驗證（例如 API 金鑰、OAuth）。
- **CORS**：設定跨來源資源共享（CORS）政策以限制存取。
- **HTTPS**：正式環境使用 HTTPS 以加密流量。

### 最佳實踐

- 絕不信任未經驗證的請求。
- 紀錄並監控所有存取及錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰

- 在安全性與易開發性之間取得平衡
- 確保與各種客戶端環境的相容性

## 從 SSE 升級到 Streaming HTTP

對當前使用 Server-Sent Events（SSE）的應用程式而言，升級到 Streaming HTTP 可為 MCP 實作帶來更強大能力及較佳的長期維護性。

### 升級理由

升級從 SSE 到 Streaming HTTP 有兩個有力理由：

- Streaming HTTP 提供比 SSE 更佳的擴展性、相容性及更豐富的通知支援。
- 它是新 MCP 應用程式推薦的傳輸方式。

### 遷移步驟

以下是在 MCP 應用中從 SSE 遷移到 Streaming HTTP 的步驟：

- <strong>更新伺服器程式碼</strong>，在 `mcp.run()` 裡使用 `transport="streamable-http"`。
- <strong>更新客戶端程式碼</strong>，使用 `streamablehttp_client` 替代 SSE 客戶端。
- <strong>在客戶端實作訊息處理器</strong> 以處理通知。
- <strong>測試相容性</strong>，確保與現有工具與工作流程兼容。

### 維持相容性

建議在遷移過程中維持與現有 SSE 客戶端的相容性。以下是一些策略：

- 可透過在不同端點運行 SSE 與 Streaming HTTP 兩種傳輸方式同時支援。
- 逐步將客戶端遷移至新傳輸方式。

### 挑戰

請確保在遷移時處理以下挑戰：

- 確保所有客戶端均已更新
- 處理通知傳遞的差異

## 安全考量

在實作任何伺服器時安全性應為首要，特別是採用基於 HTTP 傳輸方式如 Streaming HTTP 實作 MCP 時。

在使用基於 HTTP 的傳輸方式實作 MCP 伺服器時，安全性成為首要考量，需要細心注意多種攻擊向量及防護機制。

### 概述

在透過 HTTP 暴露 MCP 伺服器時，安全性至關重要。Streaming HTTP 引入了新的攻擊面，需要仔細設定。

以下為一些重要的安全考量：

- **Origin 標頭驗證**：務必驗證 `Origin` 標頭以防止 DNS 重綁定攻擊。
- <strong>本機綁定</strong>：開發階段請將伺服器綁定於 `localhost`，避免將伺服器暴露於公共網絡。
- <strong>驗證機制</strong>：於正式部署時實作驗證（例如 API 金鑰、OAuth）。
- **CORS**：設定跨來源資源共享（CORS）政策以限制存取。
- **HTTPS**：正式環境使用 HTTPS 以加密流量。

### 最佳實踐

此外，在實作 MCP 串流伺服器安全性時，應遵循以下最佳實踐：

- 絕不信任未經驗證的請求。
- 紀錄並監控所有存取及錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰

在 MCP 串流伺服器實作安全性時，您會面臨以下挑戰：

- 在安全性與易開發性之間取得平衡
- 確保與各種客戶端環境的相容性

### 作業：打造你自己的串流 MCP 應用程式

**情境：**
建構一個 MCP 伺服器和客戶端，伺服器處理一串項目清單（例如檔案或文件），並對每處理的項目發送通知。客戶端應即時顯示到達的每則通知。

**步驟：**

1. 實作一個伺服器工具，處理清單並針對每一項發送通知。
2. 實作一個客戶端，含訊息處理器以即時顯示通知。
3. 透過同時執行伺服器和客戶端測試您的實作，並觀察通知。

[解決方案](./solution/README.md)

## 延伸閱讀與後續

若想持續探索 MCP 串流並擴展您的知識，這部分提供額外資源與建議後續步驟，幫助您打造更進階的應用程式。

### 延伸閱讀

- [Microsoft：HTTP 串流入門](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft：Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft：ASP.NET Core 中的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: 串流請求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 後續建議

- 嘗試打造更進階的 MCP 工具，利用串流實現實時分析、聊天或協同編輯功能。
- 探索將 MCP 串流與前端框架（React、Vue 等）整合，以實現即時 UI 更新。
- 接下來： [在 VSCode 中使用 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->