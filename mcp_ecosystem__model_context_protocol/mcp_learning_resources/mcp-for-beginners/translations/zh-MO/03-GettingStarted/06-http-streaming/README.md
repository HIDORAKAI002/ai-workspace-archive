# Model Context Protocol (MCP) 的 HTTPS 串流

本章提供使用 Model Context Protocol (MCP) 透過 HTTPS 實現安全、可擴展及即時串流的全面指南。內容涵蓋串流的動機、可用的傳輸機制、如何在 MCP 實現可串流 HTTP、安全最佳實踐、從 SSE 的遷移，以及構建您自己的串流 MCP 應用的實用指導。

> **前瞻提示：** 本課程描述基於 **MCP 規範 2025-11-25** 的可串流 HTTP，其中會在 `initialize` 階段建立會話並以 `Mcp-Session-Id` 標頭隨附。2026-07-28 發行候選版則完全移除了握手及會話 ID，讓每個請求自成一體且可以路由到任意伺服器實例，無需黏著會話。詳情請參閱[2026-07-28 版 MCP 變更說明](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## MCP 中的傳輸機制與串流

本節探討 MCP 中可用的各種傳輸機制，以及它們在促進客戶端與伺服器間即時串流通訊的角色。

### 什麼是傳輸機制？

傳輸機制定義了客戶端與伺服器間資料交換的方式。MCP 支援多種傳輸類型，以適應不同環境及需求：

- **stdio**：標準輸入/輸出，適用於本地及 CLI 工具。簡單但不適合網頁或雲端。
- **SSE（伺服器推送事件）**：允許伺服器透過 HTTP 向客戶端推送即時更新。適合網頁 UI，但可擴展性及彈性有限。根據 MCP 規範 2025-06-18，獨立的 SSE 傳輸已被淘汰，改為使用「可串流 HTTP」傳輸。
- **可串流 HTTP**：基於現代 HTTP 的串流傳輸，支援通知及更佳的可擴展性。推薦用於大多數生產及雲端場景。

### 比較表

請參考以下比較表以了解這些傳輸機制的不同：

| 傳輸               | 即時更新        | 串流     | 可擴展性  | 使用案例                |
|-------------------|----------------|----------|----------|-------------------------|
| stdio             | 否             | 否       | 低        | 本地 CLI 工具           |
| SSE               | 是             | 是       | 中        | 網頁，即時更新          |
| 可串流 HTTP       | 是             | 是       | 高        | 雲端，多客戶端          |

> **提示：** 選擇合適的傳輸會影響性能、可擴展性及使用體驗。**可串流 HTTP** 是現代、可擴展且雲端友好應用的推薦選擇。

請注意您在前面章節看到的 stdio 和 SSE 傳輸，以及本章涵蓋的可串流 HTTP 傳輸。

## 串流：概念與動機

理解串流的基本概念與動機對於實現有效的即時通訊系統至關重要。

<strong>串流</strong> 是網路程式設計中的一種技術，允許資料以小而可管理的塊或事件序列發送與接收，而不是等待整個回應準備完畢。這在以下情境中特別有用：

- 大型檔案或資料集。
- 即時更新（例如聊天、進度條）。
- 長時間運算，需隨時向使用者提供資訊。

這裡是串流的高層理解：

- 資料逐步傳送，而非一次送完。
- 客戶端可即時處理到達的資料。
- 降低感知延遲，提升使用體驗。

### 為什麼使用串流？

使用串流的原因如下：

- 使用者能立即獲得回饋，而非等到結束。
- 支援即時應用與響應式使用者介面。
- 更有效率地使用網路與計算資源。

### 簡單範例：HTTP 串流伺服器與客戶端

以下為串流實作的簡單範例：

#### Python

**伺服器 (Python，使用 FastAPI 及 StreamingResponse)：**

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

本範例展示伺服器隨著消息可用即時發送給客戶端，而非等待全部消息就緒。

**運作原理：**

- 伺服器在每條消息可用時即時產生（yield）。
- 客戶端收到並即時輸出每個資料塊。

**需求：**

- 伺服器必須使用串流回應（例如 FastAPI 的 `StreamingResponse`）。
- 客戶端需以串流方式處理回應（requests 中的 `stream=True`）。
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

- 使用 Spring Boot 反應式堆疊與 `Flux` 串流
- `ServerSentEvent` 提供事件型態結構化串流
- `WebClient` 搭配 `bodyToFlux()` 實現反應式串流消費
- 使用 `delayElements()` 模擬事件間處理時間
- 事件帶有類型（`info`、`result`），方便客戶端處理

### 比較：經典串流 vs MCP 串流

以下是經典串流與 MCP 串流運作差異的示意：

| 特徵                 | 經典 HTTP 串流               | MCP 串流（通知）               |
|---------------------|------------------------------|-------------------------------|
| 主要回應             | 分塊傳送                    | 單一，於結尾傳送              |
| 進度更新             | 以資料塊形式送出            | 以通知訊息送出                |
| 客戶端需求           | 必須處理串流                | 必須實作訊息處理器            |
| 使用場景             | 大型檔案、AI 代幣串流       | 進度、日誌、即時回饋          |

### 主要差異

另外，以下是一些關鍵差異：

- **通訊模式：**
  - 經典 HTTP 串流：使用簡單的分塊轉移編碼傳資料
  - MCP 串流：採用結構化通知系統及 JSON-RPC 協議

- **訊息格式：**
  - 經典 HTTP：純文字分塊帶換行符號
  - MCP：結構化 LoggingMessageNotification 物件與元資料

- **客戶端實作：**
  - 經典 HTTP：簡單客戶端處理串流回應
  - MCP：更複雜的客戶端實作訊息處理器，處理不同類型訊息

- **進度更新：**
  - 經典 HTTP：進度為主回應串流的一部分
  - MCP：進度用獨立通知訊息傳送，主回應於最後送出

### 建議

選擇經典串流（如前述使用 `/stream` 的端點）或 MCP 串流時，我們有以下建議：

- **簡單串流需求：** 經典 HTTP 串流較易實作，適用基本串流需求。

- **複雜互動應用：** MCP 串流具結構化方式，提供豐富元資料，並區分通知與最終結果。

- **AI 應用：** MCP 通知系統特別適用於長時間 AI 任務，持續向使用者回報進度。

## MCP 中的串流

好了，到目前為止您已看到一些推薦和對比，接下來深入探討如何在 MCP 內充分利用串流功能。

理解 MCP 框架中串流的運作對打造響應式應用至關重要，能在長時間操作中即時向使用者反饋進展。

在 MCP 中，串流並非是將主要回應分塊送出，而是在工具處理請求時向客戶端發送 <strong>通知</strong>。這些通知可能包含進度更新、日誌或其他事件。

### 運作方式

主要結果仍以單一回應送出，然而在處理期間可發出獨立通知訊息，實時更新客戶端。客戶端必須能處理並顯示這些通知。

## 什麼是通知？

我們提到「通知」，在 MCP 中代表什麼？

通知是從伺服器發送給客戶端的訊息，用以告知長時間操作的進度、狀態或其他事件。通知提升透明度與使用者體驗。

例如，客戶端應在與伺服器完成初步握手後發送通知。

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

通知屬於 MCP 中一個稱為["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 的主題。

要使日誌功能運作，伺服器需像下方這樣啟用該功能/能力：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 依使用的 SDK 不同，日誌可能預設啟用，或需在伺服器設定中明確啟用。

通知有不同類型：

| 等級       | 描述                        | 範例使用場景                  |
|-----------|-----------------------------|------------------------------|
| debug     | 詳細偵錯資訊                | 函式進入/離開點              |
| info      | 一般資訊訊息                | 操作進度更新                  |
| notice    | 正常但重要事件              | 設定變更                      |
| warning   | 警告條件                    | 過時功能使用                  |
| error     | 錯誤條件                    | 操作失敗                      |
| critical  | 致命條件                    | 系統元件故障                  |
| alert     | 需立即採取行動              | 偵測到資料損毀                |
| emergency | 系統不可用                  | 系統全面故障                  |

## 在 MCP 中實作通知

要在 MCP 中實作通知，需設定伺服器及客戶端雙方以處理即時更新。這讓您的應用可在長時操作期間即刻向使用者回饋。

### 伺服器端：發送通知

從伺服器端開始。在 MCP 中定義工具，可在處理請求時發送通知。伺服器藉由上下文物件（通常為 `ctx`）發送訊息給客戶端。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在上述範例中，`process_files` 工具在處理每個檔案時向客戶端發送三條通知。使用 `ctx.info()` 方法傳送資訊訊息。

此外，為啟用通知，請確保伺服器使用串流傳輸（例如 `streamable-http`），且客戶端實作訊息處理器以處理通知。以下為伺服器設定使用 `streamable-http` 傳輸方式：

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

在此 .NET 範例中，`ProcessFiles` 工具使用 `Tool` 屬性裝飾，且於處理每個檔案時向客戶端發出三條通知。`ctx.Info()` 方法用於傳送資訊訊息。

要在您的 .NET MCP 伺服器啟用通知，請確保使用串流傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客戶端：接收通知

客戶端必須實作訊息處理器，以處理並顯示到達的通知。

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

在上述程式碼中，`message_handler` 函式會檢查傳入訊息是否為通知。是則輸出通知，否則當作一般伺服器訊息處理。此外，`ClientSession` 在初始化時透過 `message_handler` 處理接收的通知。

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

在這個 .NET 範例中，`MessageHandler` 函式會檢查是否為通知。是則輸出通知，否則當作一般伺服器訊息處理。`ClientSession` 透過 `ClientSessionOptions` 初始化訊息處理器。

為啟用通知，請確保您的伺服器使用串流傳輸（如 `streamable-http`），且客戶端實作訊息處理器以處理通知。

## 進度通知與應用場景

本節說明 MCP 中進度通知的概念、重要性及如何使用可串流 HTTP 實作通知。還附上實務練習以加深理解。

進度通知是長時間操作中伺服器向客戶端發出的即時訊息。伺服器無需等整個流程結束，即能不斷回報當前狀態。這提升透明度、使用者體驗並利於除錯。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 為何使用進度通知？

進度通知重要原因：

- **更佳使用者體驗：** 使用者隨工作進度即時看到更新，而非僅結束時才見。
- **即時回饋：** 客戶端可顯示進度條或日誌，讓應用感覺更有反應。
- **便於除錯監控：** 開發者與使用者可掌握流程瓶頸或卡住點。

### 如何實作進度通知

進度通知實作方式如下：

- **伺服器端：** 使用 `ctx.info()` 或 `ctx.log()` 發送通知，於每項操作完成時通知客戶端，主結果尚未準備好時先推送訊息。
- **客戶端：** 實作訊息處理器即時接收並顯示通知，能區分通知與最終結果。

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

當使用基於 HTTP 的傳輸實作 MCP 伺服器時，安全性成為極為重要的議題，需要仔細防範多種攻擊面及保障機制。

### 概覽

在透過 HTTP 開放 MCP 伺服器時，安全性是核心關注點。可串流 HTTP 引入新的攻擊面，需謹慎設定配置。

### 重要事項


- **Origin 標頭驗證**：始終驗證 `Origin` 標頭以防止 DNS 重綁定攻擊。
- <strong>本地主機綁定</strong>：本地開發時，將服務器綁定到 `localhost`，以避免暴露於公共網絡。
- <strong>身份驗證</strong>：在生產部署中實現身份驗證（例如 API 密鑰、OAuth）。
- **跨來源資源共享（CORS）**：配置 CORS 策略以限制存取。
- **HTTPS**：生產環境中使用 HTTPS 以加密流量。

### 最佳實踐

- 永遠不要信任未驗證的請求。
- 記錄並監控所有存取和錯誤。
- 定期更新依賴項以修補安全漏洞。

### 挑戰

- 平衡安全性和開發的便利性
- 確保與各種客戶端環境的相容性

## 從 SSE 升級到 Streamable HTTP

對於目前使用 Server-Sent Events (SSE) 的應用程式，遷移到 Streamable HTTP 可提供增強的功能和更長遠的可持續性，以支援您的 MCP 實作。

### 為什麼要升級？

從 SSE 升級到 Streamable HTTP 有兩個令人信服的理由：

- Streamable HTTP 提供比 SSE 更佳的可擴展性、相容性及更豐富的通知支持。
- 它是新 MCP 應用程式推薦使用的傳輸方式。

### 遷移步驟

以下是如何在 MCP 應用程式中從 SSE 遷移到 Streamable HTTP：

- <strong>更新伺服器代碼</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客戶端代碼</strong>，使用 `streamablehttp_client` 取代 SSE 客戶端。
- <strong>在客戶端實作訊息處理器</strong>，處理通知。
- <strong>測試相容性</strong>，確認與現有工具和工作流程兼容。

### 維護相容性

建議在遷移期間維持與現有 SSE 客戶端的相容性。以下是一些策略：

- 您可以通過在不同端點上運行 SSE 和 Streamable HTTP 兩種傳輸來同時支持兩者。
- 逐步將客戶端遷移到新傳輸。

### 挑戰

確保在遷移期間應對以下挑戰：

- 確保所有客戶端都完成更新
- 處理通知傳遞上的差異

## 安全性注意事項

在實作任何伺服器時，安全性應該是首要考量，特別是使用如 Streamable HTTP 之類基於 HTTP 的傳輸協議於 MCP。

在使用基於 HTTP 的傳輸實作 MCP 伺服器時，安全性成為極為重要的議題，需要細心關注多種攻擊向量與防護機制。

### 概述

在通過 HTTP 暴露 MCP 伺服器時，安全性至關重要。Streamable HTTP 引入了新的攻擊面，需謹慎配置。

以下是一些主要的安全性考量：

- **Origin 標頭驗證**：始終驗證 `Origin` 標頭以防止 DNS 重綁定攻擊。
- <strong>本地主機綁定</strong>：本地開發時，將服務器綁定到 `localhost`，以避免暴露於公共網絡。
- <strong>身份驗證</strong>：在生產部署中實現身份驗證（例如 API 密鑰、OAuth）。
- **跨來源資源共享（CORS）**：配置 CORS 策略以限制存取。
- **HTTPS**：生產環境中使用 HTTPS 以加密流量。

### 最佳實踐

此外，以下是實施 MCP 串流伺服器安全性時應遵循的一些最佳實踐：

- 永遠不要信任未驗證的請求。
- 記錄並監控所有存取和錯誤。
- 定期更新依賴項以修補安全漏洞。

### 挑戰

在實施 MCP 串流伺服器安全時，您會面臨一些挑戰：

- 平衡安全性和開發的便利性
- 確保與各種客戶端環境的相容性

### 作業：建立您自己的串流 MCP 應用程式

**情境說明：**
建立一個 MCP 伺服器和客戶端，伺服器處理一個項目清單（例如檔案或文件），並為每個處理的項目發送通知。客戶端應即時顯示每則通知。

**步驟：**

1. 實作一個伺服器工具，用於處理清單並針對每個項目發送通知。
2. 實作一個客戶端，包含訊息處理器以即時顯示通知。
3. 透過同時運行伺服器和客戶端來測試您的實作，並觀察通知。

[方案](./solution/README.md)

## 更多閱讀與後續步驟

為了繼續您的 MCP 串流之旅並擴展知識，本節提供額外資源和建議的下一步，讓您可以建構更進階的應用程式。

### 更多閱讀

- [Microsoft：HTTP 串流簡介](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft：Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft：ASP.NET Core 中的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests：串流請求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 後續步驟

- 嘗試建構更多使用串流的進階 MCP 工具，例如實時分析、聊天或協同編輯。
- 探索將 MCP 串流整合到前端框架（React、Vue 等）中以實現即時 UI 更新。
- 下一步：[在 VSCode 中使用 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->