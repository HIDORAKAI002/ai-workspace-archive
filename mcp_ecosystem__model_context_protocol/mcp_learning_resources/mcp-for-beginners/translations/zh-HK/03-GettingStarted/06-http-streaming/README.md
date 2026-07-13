# 使用模型上下文協議 (MCP) 的 HTTPS 串流

本章提供了一份全面的指南，介紹如何使用 HTTPS 與模型上下文協議 (MCP) 實現安全、可擴展及即時的串流。涵蓋串流的動機、可用的傳輸機制、如何在 MCP 中實現可串流的 HTTP、安全最佳實踐、從 SSE 的遷移，以及構建您自己的串流 MCP 應用的實務指引。

> **前瞻視角：** 本課程描述了根據 **MCP 規範 2025-11-25** 下的可串流 HTTP，其中會在 `initialize` 過程中建立一個會話，並以 `Mcp-Session-Id` 標頭固定會話。2026-07-28 版本候選移除了握手及會話 ID，使每個請求皆自包含，可路由到任意伺服器實例，無需使用黏性會話。詳情請見 [MCP 變更內容：2026-07-28 版本候選](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## MCP 中的傳輸機制與串流

本節探討 MCP 中可用的不同傳輸機制，以及它們在促成客戶端與伺服器之間即時通信串流功能中的角色。

### 什麼是傳輸機制？

傳輸機制定義了客戶端與伺服器間資料交換的方式。MCP 支援多種傳輸類型，以適應不同環境和需求：

- **stdio**：標準輸入/輸出，適合在本地和命令行工具中使用。簡單，但不適用於網絡或雲端。
- **SSE（服務器發送事件）**：允許伺服器透過 HTTP 向客戶端推送即時更新。適用於網頁 UI，但在可擴展性和彈性上有限。根據 MCP 規範 2025-06-18，獨立的 SSE 傳輸已被棄用，改由「可串流 HTTP」傳輸取代。
- **可串流 HTTP**：現代基於 HTTP 的串流傳輸，支援通知和更佳的可擴展性。建議用於大部分生產和雲端應用場景。

### 比較表

請參閱以下比較表，以了解這些傳輸機制的差異：

| 傳輸方式         | 即時更新       | 串流        | 可擴展性      | 使用情境                |
|-------------------|----------------|------------|--------------|-------------------------|
| stdio             | 否             | 否         | 低           | 本地命令行工具         |
| SSE               | 是             | 是         | 中           | 網頁，即時更新          |
| 可串流 HTTP       | 是             | 是         | 高           | 雲端，多客戶端          |

> **提示：** 選擇合適的傳輸方式會影響效能、可擴展性和用戶體驗。**可串流 HTTP** 是現代、可擴展且適合雲端應用的推薦選擇。

請注意前幾章介紹過的 stdio 與 SSE 傳輸方式，本章涵蓋的是可串流 HTTP 傳輸。

## 串流：概念與動機

理解串流背後的基本概念和動機，是實現有效即時通信系統的關鍵。

<strong>串流</strong> 是一種網絡程式設計技術，允許資料以小而可控的塊或事件序列方式發送和接收，而非等待整個響應完成後才傳送。這對於以下情況特別有用：

- 大型檔案或資料集。
- 即時更新（如聊天、進度條）。
- 長時間運算，想保持使用者獲得最新資訊。

這裡是您需要了解的串流重點：

- 資料逐步傳遞，而非一次全傳。
- 客戶端可在資料抵達時即時處理。
- 降低感知延遲，提升用戶體驗。

### 為什麼要使用串流？

使用串流的理由如下：

- 使用者能立即獲得反饋，而非僅在結束時。
- 支持即時應用與響應式 UI。
- 更有效使用網路和計算資源。

### 簡單範例：HTTP 串流伺服器與客戶端

以下為串流實作的簡單範例：

#### Python

**伺服器端（Python，使用 FastAPI 及 StreamingResponse）：**

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

此範例展示伺服器如何按訊息可用時即時傳送給客戶端，無需等待所有訊息準備完成。

**運作方式：**

- 伺服器按訊息準備狀態逐條輸出。
- 客戶端在資料到達時即時接收並印出。

**必要條件：**

- 伺服器必須支持串流響應（如 FastAPI 的 `StreamingResponse`）。
- 客戶端必須將響應視為串流處理（requests 中設置 `stream=True`）。
- Content-Type 通常為 `text/event-stream` 或 `application/octet-stream`。

#### Java

**伺服器端（Java，使用 Spring Boot 及服務器發送事件 SSE）：**

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

- 使用 Spring Boot 的反應式架構與 `Flux` 進行串流
- `ServerSentEvent` 提供結構化事件串流和事件類型
- `WebClient` with `bodyToFlux()` 支持反應式串流消費
- `delayElements()` 模擬事件間的處理延遲
- 事件可有類型（`info`, `result`），方便客戶端處理

### 比較：經典串流 vs MCP 串流

「經典」串流和 MCP 串流在運作方式上的差異如下示意：

| 特徵                  | 經典 HTTP 串流               | MCP 串流（通知）                |
|------------------------|------------------------------|--------------------------------|
| 主要回應              | 分塊傳輸                     | 單一回應，在結尾傳送             |
| 進度更新              | 以數據塊形式送出             | 以通知形式送出                  |
| 客戶端需求            | 必須處理串流                 | 必須實作訊息處理器               |
| 使用情境              | 大檔案、AI 令牌串流          | 進度、日誌、即時反饋            |

### 顯著差異點

此外，還有一些關鍵差異：

- **通訊模式：**
  - 經典 HTTP 串流：使用簡單的分塊傳輸編碼，分塊傳送資料
  - MCP 串流：使用結構化通知系統，基於 JSON-RPC 協議

- **訊息格式：**
  - 經典 HTTP：純文字分塊並以換行分隔
  - MCP：結構化 LoggingMessageNotification 物件，帶元資料

- **客戶端實作：**
  - 經典 HTTP：簡單客戶端，處理串流響應
  - MCP：更複雜的客戶端，需訊息處理器來處理不同類型訊息

- **進度更新：**
  - 經典 HTTP：進度是主回應流的一部分
  - MCP：進度透過獨立通知訊息發送，主回應在結尾送出

### 建議

選擇使用經典串流（如上面用 `/stream` 實作的端點）或 MCP 串流時，我們有一些建議：

- **針對簡單串流需求：** 經典 HTTP 串流較易實作，適合基本串流需求。

- **針對複雜、互動式應用：** MCP 串流提供更結構化的方案，有豐富的元資料並分離通知與最終結果。

- **針對 AI 應用：** MCP 的通知系統特別適用於長時間運行的 AI 任務，可持續向使用者通報進度。

## MCP 中的串流

好的，你已看到一些關於經典串流和 MCP 串流的推薦和比較。現在深入詳述如何在 MCP 中利用串流。

理解 MCP 框架內的串流運作，是打造在長時間運算時向用戶即時反饋的響應式應用之關鍵。

MCP 中的串流並不是將主回應採分塊形式傳送，而是在處理請求期間向客戶端傳送<strong>通知</strong>。這些通知可能包含進度更新、日誌或其他事件。

### 運作方式

主結果仍以單一回應送出，但在處理過程中可以透過獨立訊息傳送通知，從而即時更新客戶端。客戶端必須能處理並顯示這些通知。

## 什麼是通知？

我們提到「通知」，在 MCP 中指的是什麼？

通知是伺服器向客戶端發出的訊息，用於傳達長時間操作中的進度、狀態或其他事件。通知提升透明度與用戶體驗。

例如，當客戶端完成與伺服器的初始握手時，即應發送一則通知。

通知的 JSON 訊息範例如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知主題在 MCP 中稱為 ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging)。

要啟用日誌記錄，伺服器需以功能/能力形式啟用，如下：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 根據使用的 SDK，日誌記錄可能預設已啟用，或需要在伺服器配置中顯式開啟。

通知有不同類型：

| 等級      | 描述                             | 使用範例                     |
|-----------|---------------------------------|-----------------------------|
| debug     | 詳細除錯資訊                    | 函式入口/出口點             |
| info      | 一般資訊性訊息                 | 操作進度更新                 |
| notice    | 正常但顯著事件                 | 配置變更                    |
| warning   | 警告狀況                      | 使用已棄用功能               |
| error     | 錯誤狀況                      | 操作失敗                    |
| critical  | 關鍵狀況                      | 系統組件失效                |
| alert     | 必須立即採取行動              | 偵測到資料損壞              |
| emergency | 系統無法使用                  | 系統完全失效                |

## 在 MCP 中實作通知

要在 MCP 中實作通知，需同時設定伺服器端與客戶端以處理即時更新。這讓您的應用在長時間運行中能向使用者即時反饋。

### 伺服器端：發送通知

從伺服器端開始。在 MCP 中，您定義的工具可以在處理請求期間發送通知。伺服器使用上下文對象（通常是 `ctx`）向客戶端發送訊息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在上述範例中，`process_files` 工具在處理每個檔案時向客戶端發送三則通知。`ctx.info()` 方法用於傳送資訊性訊息。

此外，為啟用通知，確保您的伺服器使用串流傳輸（如 `streamable-http`），且客戶端實作訊息處理器以處理通知。以下示範如何使用 `streamable-http` 傳輸設定伺服器：

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

在此 .NET 範例中，`ProcessFiles` 工具以 `Tool` 屬性標記，在處理每個檔案時向客戶端發送三則通知。`ctx.Info()` 方法用於傳送資訊訊息。

要在 .NET MCP 伺服器啟用通知，請確保使用串流傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客戶端：接收通知

客戶端必須實作訊息處理器以處理並顯示抵達的通知。

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

在上述程式中，`message_handler` 函式檢查接收訊息是否為通知，若是則印出通知，否則作為一般伺服器訊息處理。同時注意 `ClientSession` 是以 `message_handler` 初始化以處理收到通知。

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

在這個 .NET 範例中，`MessageHandler` 函式判斷接收訊息是否為通知，若是則印出通知，否則作為一般伺服器訊息處理。`ClientSession` 透過 `ClientSessionOptions` 初始化並傳入訊息處理器。

為啟用通知，確保伺服器使用串流傳輸（如 `streamable-http`），且客戶端實作訊息處理器以處理通知。

## 進度通知與場景

本節說明 MCP 中進度通知的概念、重要性及其在可串流 HTTP 中的實作方式。您還將找到實務作業以鞏固理解。

進度通知是伺服器在長時間操作時向客戶端即時發送的訊息。不需等待整個過程結束，伺服器持續更新客戶端當前狀態。這增強透明度、用戶體驗並便於除錯。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 為什麼要使用進度通知？

進度通知重要原因如下：

- **更佳的使用者體驗：** 使用者在工作進行時即見到更新，而非僅在結束時。
- **即時反饋：** 客戶端可顯示進度條或日誌，讓應用感覺更具響應力。
- **方便除錯與監控：** 開發者和用戶可看到流程可能的瓶頸或卡頓位置。

### 如何實作進度通知

以下為實作 MCP 進度通知的方法：

- **伺服器端：** 使用 `ctx.info()` 或 `ctx.log()` 傳送通知，在每個項目處理時向客戶端發送訊息，主結果尚在準備中。
- **客戶端：** 實作訊息處理器，監聽並顯示抵達的通知。此處理器辨識通知與最終結果。

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

## 安全注意事項

在使用基於 HTTP 傳輸的 MCP 伺服器時，安全性是一項重要考量，需要慎重關注多種攻擊面和防護機制。

### 概觀

對外暴露的 MCP 伺服器安全性至關重要。可串流 HTTP 引入新的攻擊面，需要仔細配置防護。

### 重點摘要


- **Origin 標頭驗證**：始終驗證 `Origin` 標頭以防止 DNS 重新綁定攻擊。
- <strong>本地主機綁定</strong>：在本地開發時，將伺服器綁定到 `localhost`，以避免暴露於公共互聯網。
- <strong>身份驗證</strong>：在生產部署中實施身份驗證（例如，API 金鑰、OAuth）。
- **CORS**：配置跨來源資源共享 (CORS) 策略以限制存取。
- **HTTPS**：在生產環境中使用 HTTPS 來加密傳輸流量。

### 最佳實踐

- 不要在未驗證的情況下信任傳入的請求。
- 記錄並監控所有訪問和錯誤。
- 定期更新依賴項以修補安全漏洞。

### 挑戰

- 在安全性與開發便利性之間取得平衡
- 確保與各種客戶端環境的兼容性

## 從 SSE 升級到 Streamable HTTP

對於目前使用 Server-Sent Events (SSE) 的應用程式，遷移至 Streamable HTTP 可提供增強的功能及更長期的 MCP 實施可持續性。

### 為什麼要升級？

有兩個主要原因促使您從 SSE 升級到 Streamable HTTP：

- Streamable HTTP 比 SSE 提供更好的可擴展性、兼容性以及更豐富的通知支援。
- 它是新 MCP 應用的推薦傳輸方式。

### 遷移步驟

以下是您可以如何在 MCP 應用中從 SSE 遷移到 Streamable HTTP：

- <strong>更新伺服器代碼</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客戶端代碼</strong>，使用 `streamablehttp_client` 取代 SSE 用戶端。
- <strong>在客戶端實作訊息處理器</strong>，以處理通知。
- <strong>測試與現有工具和工作流程的相容性</strong>。

### 維持相容性

建議在遷移過程中維持與現有 SSE 用戶端的相容性。以下是一些策略：

- 您可以藉由在不同端點運行 SSE 和 Streamable HTTP 兩種傳輸方式同時支援兩者。
- 逐步將用戶端遷移到新傳輸方式。

### 挑戰

遷移時請確保解決以下挑戰：

- 確保所有用戶端都已更新
- 處理通知傳遞方式的差異

## 安全性考量

實作任何伺服器時，安全性應為首要任務，尤其是使用 HTTP 傳輸方式（如 MCP 中的 Streamable HTTP）時。

在用 HTTP 傳輸方式實作 MCP 伺服器時，安全性需求嚴格，需謹慎注意多重攻擊面與保護機制。

### 概述

在以 HTTP 形式開放 MCP 伺服器時，安全性至關重要。Streamable HTTP 會帶來新的攻擊面，須謹慎配置。

以下是一些主要的安全考量事項：

- **Origin 標頭驗證**：始終驗證 `Origin` 標頭以防止 DNS 重新綁定攻擊。
- <strong>本地主機綁定</strong>：在本地開發時，將伺服器綁定到 `localhost`，以避免暴露於公共互聯網。
- <strong>身份驗證</strong>：在生產部署中實施身份驗證（例如，API 金鑰、OAuth）。
- **CORS**：配置跨來源資源共享 (CORS) 策略以限制存取。
- **HTTPS**：在生產環境中使用 HTTPS 來加密傳輸流量。

### 最佳實踐

另外，以下是在 MCP 流式伺服器中實作安全性時的最佳實踐：

- 不要在未驗證的情況下信任傳入的請求。
- 記錄並監控所有訪問和錯誤。
- 定期更新依賴項以修補安全漏洞。

### 挑戰

在 MCP 流式伺服器中實作安全時，您會遇到一些挑戰：

- 在安全性與開發便利性之間取得平衡
- 確保與各種客戶端環境的兼容性

### 作業：建立您自己的流式 MCP 應用程式

**情景：**
建立一個 MCP 伺服器與客戶端，伺服器會處理一個項目清單（例如文件或檔案），並對每一個處理的項目發送通知。客戶端應即時顯示每個到達的通知。

**步驟：**

1. 實作一個伺服器工具，處理列表並針對每個項目發送通知。
2. 實作一個具有訊息處理器的客戶端，以即時顯示通知。
3. 運行伺服器與客戶端，測試您的實作並觀察通知。

[解決方案](./solution/README.md)

## 進一步閱讀與接下來？

若要繼續您的 MCP 流式旅程並擴展知識，這部分提供額外資源與建議的下一步演進方向來建立更先進的應用程式。

### 進一步閱讀

- [Microsoft：HTTP 流式傳輸簡介](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft：Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft：ASP.NET Core 中的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests：串流請求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 接下來？

- 嘗試建立更多使用串流的 MCP 進階工具，適用於即時分析、聊天或協作編輯。
- 探索將 MCP 串流整合到前端框架（React、Vue 等）中，以實現即時 UI 更新。
- 接下來：[在 VSCode 中利用 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->