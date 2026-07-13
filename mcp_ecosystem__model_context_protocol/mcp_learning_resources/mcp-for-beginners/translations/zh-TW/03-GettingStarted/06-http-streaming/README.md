# 使用模型上下文協議 (MCP) 的 HTTPS 串流

本章提供了使用 HTTPS 與模型上下文協議 (MCP) 實現安全、可擴展且實時串流的完整指南。內容涵蓋串流的動機、可用的傳輸機制、如何在 MCP 中實現可串流的 HTTP、安全最佳實踐、從 SSE 遷移，以及構建自己的串流 MCP 應用的實用指導。

> **展望未來：** 本課程描述了基於 **MCP 規範 2025-11-25** 的可串流 HTTP，其中會在 `initialize` 階段建立會話，並使用 `Mcp-Session-Id` 標頭固定會話。`2026-07-28` 釋出候選版本將完全移除握手與會話 ID，讓每個請求自包含且可路由至任何伺服器實例，免去黏性會話。詳情請參考 [MCP 的變更內容：2026-07-28 釋出候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## MCP 的傳輸機制與串流

本節探討 MCP 中可用的不同傳輸機制及其在實現客戶端與伺服器間實時通訊串流能力的角色。

### 什麼是傳輸機制？

傳輸機制定義了客戶端與伺服器之間資料交換的方式。MCP 支援多種傳輸類型，以適應不同環境和需求：

- **stdio**：標準輸入/輸出，適用於本地及基於命令列介面的工具。簡單但不適合網頁或雲端環境。
- **SSE（伺服器推送事件）**：允許伺服器透過 HTTP 向客戶端推送即時更新。適合網頁 UI，但在可擴展性和彈性方面有限。根據 MCP 規範 2025-06-18，獨立 SSE 傳輸已被棄用，並由「可串流 HTTP」傳輸取代。
- **可串流 HTTP**：基於現代 HTTP 的串流傳輸，支援通知和更佳的可擴展性。推薦用於大多數生產及雲端場景。

### 比較表

請參考以下比較表，了解這些傳輸機制的差異：

| 傳輸方式          | 即時更新          | 串流      | 可擴展性   | 使用案例               |
|-------------------|------------------|-----------|-------------|------------------------|
| stdio             | 否               | 否        | 低         | 本地 CLI 工具          |
| SSE               | 是               | 是        | 中         | 網頁，即時更新          |
| 可串流 HTTP       | 是               | 是        | 高         | 雲端，多客戶端支持      |

> **提示：** 選擇適合的傳輸方式會影響效能、可擴展性和用戶體驗。**可串流 HTTP** 推薦用於現代、可擴展且適合雲端的應用。

請注意前面章節中介紹的 stdio 和 SSE 傳輸，以及本章所述的可串流 HTTP 傳輸。

## 串流：概念與動機

理解串流的基本概念與動機，對於實作有效的即時通訊系統至關重要。

<strong>串流</strong> 是網絡編程中的一種技術，允許資料以小批次或事件序列形式發送與接收，而非等待整個回應完成。這對以下情況尤其有用：

- 大檔案或大型數據集。
- 即時更新（如聊天、進度條）。
- 長時間運算時可持續向用戶提供資訊。

以下是串流的一些高階認知：

- 資料逐步傳送，而非一次送完。
- 客戶端可邊接收邊處理資料。
- 降低感知延遲，提升用戶體驗。

### 為什麼使用串流？

使用串流的理由如下：

- 用戶能立即獲得回饋，而非等到結束才收到。
- 支援即時應用與快速回應的 UI。
- 更有效率地使用網路與運算資源。

### 簡單範例：HTTP 串流伺服器與客戶端

這裡提供一個簡單範例示範如何實作串流：

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

此範例示範伺服器如何隨著訊息產生即發送給客戶端，而非等所有訊息準備好後一次發送。

**運作原理：**

- 伺服器於檔案準備好時依序產出訊息。
- 客戶端接收並即時顯示每個串流區塊。

**需求條件：**

- 伺服器必須使用串流回應（例如 FastAPI 的 `StreamingResponse`）。
- 客戶端需將請求設定為串流處理 (`stream=True` in requests)。
- Content-Type 通常為 `text/event-stream` 或 `application/octet-stream`。

#### Java

**伺服器（Java，使用 Spring Boot 與 Server-Sent Events）：**

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

- 使用 Spring Boot 的反應式架構，借助 `Flux` 實現串流。
- `ServerSentEvent` 支援具事件類型的結構化事件串流。
- `WebClient` 搭配 `bodyToFlux()` 實現反應式串流消費。
- `delayElements()` 模擬事件間的處理時間。
- 事件可帶有類型（如 `info`、`result`）以方便客戶端處理。

### 比較：經典串流 vs MCP 串流

MCP 串流與「經典」串流的運作差異如下表所示：

| 特性                   | 經典 HTTP 串流              | MCP 串流（通知）               |
|-----------------------|-----------------------------|-------------------------------|
| 主要回應              | 分塊（Chunked）              | 單一回應，在最後送出            |
| 進度更新              | 以資料區塊形式送出           | 以通知訊息形式送出             |
| 客戶端要求            | 必須處理串流                  | 必須實作訊息處理器             |
| 使用案例              | 大檔案、AI 令牌串流           | 進度、日誌、即時反饋           |

### 觀察到的主要差異

另外，還有一些關鍵區別：

- **通訊模式：**
  - 經典 HTTP 串流：使用簡單的分塊傳輸編碼傳送資料。
  - MCP 串流：使用結構化通知系統和 JSON-RPC 協議。

- **訊息格式：**
  - 經典 HTTP：純文字分塊，帶換行符號。
  - MCP：結構化 LoggingMessageNotification 物件，含元資料。

- **客戶端實作：**
  - 經典 HTTP：簡單地處理串流回應。
  - MCP：需更複雜的訊息處理器，處理不同訊息類型。

- **進度更新：**
  - 經典 HTTP：進度是主要回應串流的一部分。
  - MCP：進度透過獨立通知訊息發送，主回應於最後送出。

### 建議事項

對於選擇實作經典串流（如前文使用 `/stream` 的端點）或使用 MCP 串流，有以下建議：

- **簡單串流需求：** 經典 HTTP 串流較易實作，足以應付基本串流需求。

- **複雜互動應用：** MCP 串流提供更結構化的方式，具豐富元資料，並分離通知與最終結果。

- **人工智慧應用：** MCP 的通知系統特別適合長時間 AI 任務，可持續向用戶反饋進度。

## MCP 中的串流

好的，您已看到經典串流和 MCP 串流的比較與建議。接下來詳述如何在 MCP 中運用串流。

理解 MCP 框架中串流的運作，對於建立長時間操作中能即時反映用戶端狀態的響應式應用至關重要。

在 MCP 中，串流並非將主要回應分塊送出，而是透過在工具處理請求時發送 <strong>通知</strong> 給客戶端。這些通知可包含進度更新、日誌或其他事件。

### 運作方式

主要結果仍作為單一回應送出，但在處理過程中可發送獨立的通知訊息，實時更新客戶端。客戶端需能處理並顯示這些通知。

## 什麼是通知？

我們提到「通知」，在 MCP 中是什麼意思？

通知是伺服器向客戶端發送的訊息，用於告知長時間操作過程中的進度、狀態或其他事件。通知提升了透明度和用戶體驗。

例如，當客戶端與伺服器完成初次握手時，應發出一則通知。

通知的 JSON 格式範例如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知屬於 MCP 中稱為「[Logging](https://modelcontextprotocol.io/specification/draft/server/utilities/logging)」的主題。

若要使日誌功能生效，伺服器需啟用此特性，如下所示：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 根據所用 SDK，不同情況下日誌功能預設可能已啟用，或需明確在伺服器設定中開啟。

通知有不同類型：

| 等級       | 描述                         | 使用範例                   |
|-----------|------------------------------|----------------------------|
| debug     | 詳細除錯資訊                  | 函式進入/退出點           |
| info      | 一般資訊訊息                  | 操作進度更新               |
| notice    | 正常但重要事件                | 設定變更                   |
| warning   | 警告狀況                    | 棄用功能使用               |
| error     | 錯誤狀況                    | 操作失敗                   |
| critical  | 嚴重狀況                    | 系統元件故障               |
| alert     | 必須立即採取行動             | 檢測到資料損壞            |
| emergency | 系統無法使用                | 完整系統失效               |

## 在 MCP 中實現通知

要在 MCP 中實現通知，需設定伺服器端及客戶端以處理即時更新，使您的應用在長時間操作中能即時向用戶反饋。

### 伺服器端：發送通知

從伺服器端開始。在 MCP 中，您定義的工具可於處理請求時發送通知。伺服器使用上下文物件（通常為 `ctx`）將消息發送給客戶端。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在前述範例中，`process_files` 工具在處理每個檔案時會向客戶端發送三則通知。使用 `ctx.info()` 方法發送資訊訊息。

此外，為啟用通知，確保您伺服器使用類似 `streamable-http` 的串流傳輸，並且客戶端實作訊息處理器以處理通知。以下是設置伺服器使用 `streamable-http` 傳輸的方法：

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

在此 .NET 範例中，`ProcessFiles` 工具使用 `Tool` 特性裝飾，並在處理每個檔案時發送三則通知。使用 `ctx.Info()` 方法發送資訊訊息。

想在 .NET MCP 伺服器啟用通知，請務必使用串流傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客戶端：接收通知

客戶端必須實作訊息處理器，處理並顯示接收到的通知。

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

在前述程式碼中，`message_handler` 函式會檢測接收的訊息是否為通知。若是通知，則列印通知；否則當作一般伺服器訊息處理。同時也展示如何用 `message_handler` 初始化 `ClientSession`，以處理接收通知。

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

在此 .NET 範例中，`MessageHandler` 函式會判定訊息是否為通知。若是通知，則列印通知；否則作為一般伺服器訊息處理。`ClientSession` 透過 `ClientSessionOptions` 以訊息處理器初始化。

為啟用通知，請確保伺服器使用串流傳輸（如 `streamable-http`），並且客戶端實作訊息處理器來處理通知。

## 進度通知與應用場景

本節說明 MCP 中的進度通知概念、其重要性以及如何利用可串流 HTTP 實作。您亦將發現一個實作任務，以增強理解。

進度通知是在長時間操作過程中，從伺服器向客戶端即時發送的訊息。伺服器不需等流程結束，而是持續更新當前狀態。此舉增進透明度、用戶體驗，並促使除錯更簡易。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 為何使用進度通知？

進度通知的關鍵理由如下：

- **更佳的用戶體驗：** 用戶可於作業進行時就看到更新，而非僅在結束時。
- **即時反饋：** 客戶端得以顯示進度條或日誌，提升應用響應感。
- **更易除錯與監控：** 開發者與用戶能看到流程可能變慢或停滯的位置。

### 如何實作進度通知

以下是 MCP 中實作進度通知的方法：

- **伺服器端：** 使用 `ctx.info()` 或 `ctx.log()` 發送通知，於處理每項目時即時通知客戶端。在主要結果準備好前發送這些訊息。
- **客戶端：** 實作訊息處理器以監聽並顯示收到的通知，並區分通知與最終結果。

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

## 安全性考量

在使用基於 HTTP 的傳輸實作 MCP 伺服器時，安全性是一項極為重要的考量，需密切注意多種攻擊向量與防護機制。

### 概述

MCP 伺服器公開於 HTTP 時，安全性至關重要。可串流 HTTP 帶來新的攻擊面，需要仔細配置。

### 關鍵點


- <strong>來源標頭驗證</strong>：始終驗證 `Origin` 標頭以防止 DNS 重綁定攻擊。
- <strong>本地主機綁定</strong>：在本地開發時，將伺服器綁定到 `localhost`，以避免對公共網際網路公開。
- <strong>身份驗證</strong>：生產環境中實施身份驗證（例如，API 密鑰、OAuth）。
- **CORS**：配置跨來源資源共享（CORS）策略以限制存取。
- **HTTPS**：在生產環境中使用 HTTPS 來加密流量。

### 最佳實務

- 永遠不要在未驗證的情況下信任傳入的請求。
- 記錄並監控所有存取與錯誤。
- 定期更新相依性以修補安全漏洞。

### 挑戰

- 在安全與開發便利性之間取得平衡。
- 確保與各種用戶端環境的相容性。

## 從 SSE 升級到 Streamable HTTP

對於目前使用伺服器事件推送 (SSE) 的應用程式，遷移到 Streamable HTTP 可提供增強的功能及更好的長期可維護性，適用於您的 MCP 實作。

### 為什麼要升級？

升級從 SSE 到 Streamable HTTP 有兩個重要理由：

- Streamable HTTP 提供比 SSE 更好的擴充性、相容性，以及更豐富的通知支援。
- 它是新 MCP 應用建議使用的傳輸方式。

### 遷移步驟

以下是在 MCP 應用中如何從 SSE 遷移到 Streamable HTTP：

- <strong>更新伺服器程式碼</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新用戶端程式碼</strong>，使用 `streamablehttp_client` 取代 SSE 用戶端。
- <strong>實作訊息處理器</strong>，以處理通知。
- <strong>測試相容性</strong>，確保與現有工具和工作流程相符。

### 維持相容性

建議在遷移過程中保持與現有 SSE 用戶端的相容性。以下是一些策略：

- 您可同時支援 SSE 和 Streamable HTTP，分別在不同端點上運行。
- 逐步將用戶端遷移到新傳輸方式。

### 挑戰

遷移時需注意以下挑戰：

- 確保所有用戶端皆已更新。
- 處理通知傳遞差異。

## 安全考量

在實作任何伺服器時，尤其是使用以 HTTP 為基礎的傳輸如 MCP 的 Streamable HTTP，安全性應是首要重點。

當使用 HTTP 傳輸實作 MCP 伺服器時，安全性成為一項極為重要的議題，需要謹慎注意多種攻擊向量及防護機制。

### 概覽

MCP 伺服器在 HTTP 上暴露時，安全性至關重要。Streamable HTTP 引入全新攻擊面，需要謹慎配置。

以下是一些關鍵的安全考量：

- <strong>來源標頭驗證</strong>：始終驗證 `Origin` 標頭以防止 DNS 重綁定攻擊。
- <strong>本地主機綁定</strong>：在本地開發時，將伺服器綁定到 `localhost`，以避免對公共網際網路公開。
- <strong>身份驗證</strong>：生產環境中實施身份驗證（例如，API 密鑰、OAuth）。
- **CORS**：配置跨來源資源共享（CORS）策略以限制存取。
- **HTTPS**：在生產環境中使用 HTTPS 來加密流量。

### 最佳實務

此外，實作 MCP 串流伺服器時，建議遵循以下安全最佳實務：

- 永遠不要在未驗證的情況下信任傳入的請求。
- 記錄並監控所有存取與錯誤。
- 定期更新相依性以修補安全漏洞。

### 挑戰

實作 MCP 串流伺服器安全性時，您會遇到一些挑戰：

- 在安全與開發便利性之間取得平衡。
- 確保與各種用戶端環境的相容性。

### 作業：建立您自己的串流 MCP 應用程式

**情境：**
建立一個 MCP 伺服器與用戶端，伺服器處理一個項目列表（例如檔案或文件），並在處理每個項目時發送通知。用戶端須即時顯示收到的每個通知。

**步驟：**

1. 實作一個伺服器工具，處理列表並對每個項目發送通知。
2. 實作一個用戶端，具備訊息處理器以即時顯示通知。
3. 執行伺服器與用戶端測試，觀察通知。

[解答](./solution/README.md)

## 延伸閱讀與後續步驟

若要繼續深化 MCP 串流的學習並擴展知識，本節提供額外資源及建議的後續步驟，用以建置更進階的應用程式。

### 延伸閱讀

- [Microsoft：HTTP 串流介紹](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft：伺服器推送事件 (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft：ASP.NET Core 的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests：串流請求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 下一步？

- 嘗試建置使用串流進行即時分析、聊天或協作編輯的更進階 MCP 工具。
- 探索將 MCP 串流整合到前端框架（React、Vue 等），以實現即時 UI 更新。
- 下一章節：[VSCode 的 AI 工具包運用](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->