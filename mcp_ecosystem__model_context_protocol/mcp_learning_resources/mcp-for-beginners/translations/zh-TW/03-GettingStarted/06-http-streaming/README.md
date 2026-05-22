# HTTPS Streaming 與模型上下文協議 (MCP)

本章提供了使用 HTTPS 與模型上下文協議 (MCP) 實作安全、可擴展且即時串流的完整指南。涵蓋串流的動機、可用的傳輸機制、如何在 MCP 中實作可串流的 HTTP、安全最佳實踐、從 SSE 轉移、以及構建自己的串流 MCP 應用的實務指南。

## MCP 中的傳輸機制與串流

本節探討 MCP 中可用的不同傳輸機制，以及它們在實現客戶端與伺服器之間即時通訊串流功能中的角色。

### 什麼是傳輸機制？

傳輸機制定義了客戶端與伺服器之間資料交換的方式。MCP 支援多種傳輸類型，以適應不同的環境和需求：

- **stdio**：標準輸入/輸出，適合本地和 CLI 工具。簡單但不適合 Web 或雲端環境。
- **SSE (伺服器傳送事件)**：允許伺服器透過 HTTP 即時推送更新到客戶端。適合網頁介面，但在擴展性和彈性上有限。根據 MCP 規範 2025-06-18，獨立 SSE 傳輸已被棄用，改用「可串流 HTTP」傳輸。
- **可串流 HTTP**：現代基於 HTTP 的串流傳輸，支援通知和更佳的擴展性。建議用於大部分生產和雲端場景。

### 比較表

請參考下表了解這些傳輸機制的差異：

| 傳輸方式         | 即時更新       | 串流       | 擴展性       | 適用場景                |
|------------------|----------------|------------|-------------|-------------------------|
| stdio            | 否             | 否         | 低          | 本地 CLI 工具           |
| SSE              | 是             | 是         | 中          | 網頁、即時更新          |
| 可串流 HTTP      | 是             | 是         | 高          | 雲端、多客戶端          |

> **提示：** 選擇適當的傳輸機制會影響效能、可擴展性與使用者體驗。**可串流 HTTP** 建議用於現代可擴展且適合雲端的應用。

請注意前幾章中展示的 stdio 和 SSE 傳輸，以及本章所介紹的可串流 HTTP 傳輸。

## 串流：概念與動機

理解串流背後的基本概念與動機，對於實作有效的即時通訊系統非常重要。

<strong>串流</strong> 是網路程式設計中的一種技術，允許資料以小而可管理的區塊或事件序列方式傳送與接收，而不是等候整個回應完成才傳送。這在以下情況尤其有用：

- 大型檔案或資料集。
- 即時更新（例如聊天、進度條）。
- 長時間運算期間想持續告知使用者狀態。

串流的高階特點包括：

- 資料逐步送達，而非一次送完。
- 客戶端可隨著資料到達即時處理。
- 降低感知延遲，提高使用者體驗。

### 為什麼要使用串流？

使用串流的原因如下：

- 使用者可立即獲得回饋，而非僅在結束時。
- 支援即時應用程式和反應式 UI。
- 更有效利用網路與計算資源。

### 簡單範例：HTTP 串流伺服器與客戶端

以下是串流如何實作的簡單示範：

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

此範例示範伺服器在訊息可用時，逐一傳送給客戶端，而非等待所有訊息準備就緒後傳送。

**運作方式：**

- 伺服器在訊息可用即逐條產出。
- 客戶端收到並即時列印每個區塊。

**要求：**

- 伺服器需使用串流回應（例如 FastAPI 的 `StreamingResponse`）。
- 客戶端需以串流模式處理回應 (`stream=True` 在 requests)。
- Content-Type 通常為 `text/event-stream` 或 `application/octet-stream`。

#### Java

**伺服器（Java，使用 Spring Boot 與伺服器傳送事件）：**

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

- 使用 Spring Boot 的反應式堆疊與 `Flux` 進行串流
- `ServerSentEvent` 提供事件類型的結構化串流
- `WebClient` 搭配 `bodyToFlux()` 支援反應式串流接收
- `delayElements()` 用來模擬事件間的處理時間
- 事件可有類型（`info`, `result`）以便客戶端更好處理

### 比較：經典串流 vs MCP 串流

經典串流與 MCP 串流的差異可見下表：

| 特性               | 經典 HTTP 串流                 | MCP 串流（通知）                 |
|--------------------|-------------------------------|---------------------------------|
| 主要回應           | 區塊式傳輸                    | 單一回應結尾                    |
| 進度更新           | 作為資料區塊發送              | 以通知訊息方式發送              |
| 客戶端需求         | 必須處理串流                  | 必須實作訊息處理器              |
| 使用案例           | 大型檔案、AI 令牌串流         | 進度、日誌、即時反饋            |

### 觀察到的主要差異

此外，還有以下關鍵差異：

- **通訊模式：**
  - 經典 HTTP 串流：使用簡單的 chunked 傳輸編碼分段傳送資料
  - MCP 串流：使用含 JSON-RPC 協議的結構化通知系統

- **訊息格式：**
  - 經典 HTTP：純文字 chunk，帶換行符號
  - MCP：結構化 LoggingMessageNotification 物件，含元資料

- **客戶端實作：**
  - 經典 HTTP：簡單串流回應處理
  - MCP：具備訊息處理器，能處理不同類型訊息

- **進度更新：**
  - 經典 HTTP：主回應串流即包含進度
  - MCP：以獨立通知訊息發送進度，主回應在最後送出

### 建議

在選擇實作經典串流（如先前展示的 `/stream` 端點）或使用 MCP 串流時，我們建議如下：

- **簡單串流需求：** 經典 HTTP 串流實作較簡單，足以應付基礎串流需求。

- **複雜互動應用：** MCP 串流提供結構化且更豐富的元資料，將通知與最終結果分離。

- **AI 應用：** MCP 通知系統特別適合長時間執行的 AI 任務，可隨時向使用者回報進度。

## MCP 中的串流

現在你已看到經典串流與 MCP 串流的建議與比較，接下來深入了解如何在 MCP 中利用串流功能。

理解 MCP 框架中的串流如何運作，對於構建長時間作業中能即時回饋使用者的反應式應用至關重要。

在 MCP 中，串流不是將主回應分成多個區塊，而是在處理請求期間向客戶端傳送<strong>通知</strong>。這些通知可包含進度更新、日誌或其他事件。

### 運作方式

主回應依然以單一回應送出。但是在處理過程中，可同時以獨立訊息傳送通知，實時更新客戶端。客戶端需能處理並顯示這些通知。

## 什麼是通知？

剛提到「通知」，在 MCP 背景中指什麼？

通知是伺服器向客戶端傳送的訊息，用以告知長時間處理作業中的進度、狀態或其他事件。通知能提升透明度與使用者體驗。

例如，客戶端於與伺服器完成初始握手後，應傳送一則通知。

通知是一則 JSON 訊息，如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知屬於 MCP 中名為 ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 的主題。

要啟用日誌功能，伺服器須以功能/能力方式設定，示例如下：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 根據所使用的 SDK，日誌功能可能會預設啟用，或需於伺服器配置中明確開啟。

通知種類有：

| 等級       | 說明                         | 範例使用場景                 |
|------------|------------------------------|------------------------------|
| debug      | 詳細除錯訊息                 | 函式進入/離開點              |
| info       | 一般資訊訊息                 | 操作進度更新                |
| notice     | 正常但重要事件               | 配置變更                    |
| warning    | 警告狀態                     | 棄用功能使用                |
| error      | 錯誤狀態                     | 操作失敗                    |
| critical   | 致命狀態                     | 系統元件故障                |
| alert      | 需立即採取行動               | 偵測資料損毀                |
| emergency  | 系統無法使用                 | 完整系統故障                |

## MCP 中的通知實作

要在 MCP 中實作通知，需要在伺服器端與客戶端都準備好處理即時更新。這讓應用可在長時間運作中即時回饋使用者。

### 伺服器端：傳送通知

先看伺服器端。MCP 中定義工具可在處理請求時傳送通知。伺服器使用上下文物件（通常是 `ctx`）向客戶端發送訊息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

在上述範例中，`process_files` 工具在處理每個檔案時向客戶端發送三則通知。`ctx.info()` 方法用於傳送資訊訊息。

另外，為了啟用通知，確保伺服器使用串流傳輸（例如 `streamable-http`），客戶端實作訊息處理器以處理通知。以下示範如何設定伺服器以使用 `streamable-http` 傳輸：

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

此 .NET 範例中，`ProcessFiles` 工具使用 `Tool` 屬性裝飾並在處理每個檔案時向客戶端發送三則通知。`ctx.Info()` 方法用於傳送資訊訊息。

在 .NET MCP 伺服器中啟用通知，請確認使用串流傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客戶端：接收通知

客戶端必須實作訊息處理器以處理並顯示即時通知。

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

上述程式碼中，`message_handler` 函式會檢查收到的訊息是否為通知。若是通知即印出，否則當作正常伺服器訊息處理。並且注意 `ClientSession` 使用 `message_handler` 處理傳入通知。

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

在此 .NET 範例中，`MessageHandler` 函式會判斷訊息是否通知。若是便印出，否則視為正常伺服器訊息處理。`ClientSession` 使用 `ClientSessionOptions` 設定訊息處理器。

要啟用通知，請確保伺服器使用串流傳輸（如 `streamable-http`）並且客戶端實作訊息處理器。

## 進度通知與應用情境

本節闡述 MCP 中進度通知的概念、重要性與如何使用可串流 HTTP 實作。並提供實務練習以強化理解。

進度通知是伺服器在長時間操作中向客戶端傳送的即時訊息。伺服器不需等整個程序完成，就會持續向客戶端回報目前狀態。提升透明度、使用者體驗，並方便除錯。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 為什麼要使用進度通知？

進度通知重要原因包括：

- **更佳使用者體驗：** 使用者能隨工作進展即時看到狀態，而非僅在結束後。
- **即時回饋：** 客戶端可顯示進度條或日誌，讓應用感覺更具回應性。
- **除錯與監控更簡易：** 開發者及使用者能看到過程中卡住或緩慢的位置。

### 如何實作進度通知

以下為 MCP 內實作進度通知的方法：

- **伺服器端：** 使用 `ctx.info()` 或 `ctx.log()` 在處理每個項目時傳送通知，在主要結果準備好之前傳送訊息給客戶端。
- **客戶端：** 實作訊息處理器，監聽並顯示傳入通知。此處理器區分通知與最終結果。

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

當實作 MCP 伺服器並使用 HTTP 傳輸時，安全性成為首要關注，需謹慎防範多種攻擊向量並採取保護措施。

### 概述

在 HTTP 之下開放 MCP 伺服器，安全不可忽視。可串流 HTTP 帶來新的攻擊面，需仔細配置。

### 重點

- **Origin 標頭驗證**：務必驗證 `Origin` 標頭，以防止 DNS 重綁定攻擊。
- <strong>本地端綁定</strong>：本地開發時，伺服器請綁定到 `localhost`，避免對外公開。
- <strong>身分驗證</strong>：生產環境部署需實作身分驗證（例如 API 金鑰、OAuth）。
- **CORS**：配置跨來源資源共享政策，限制存取來源。
- **HTTPS**：正式環境使用 HTTPS 加密傳輸。

### 最佳實務

- 永遠不要信任未經驗證的入站請求。
- 記錄並監控所有存取和錯誤。
- 定期更新相依套件，修補安全漏洞。

### 挑戰
- 在安全性與開發便利性之間取得平衡
- 確保與各種客戶端環境的相容性

## 從 SSE 升級到可串流的 HTTP

對於目前使用 Server-Sent Events (SSE) 的應用程式，遷移到可串流的 HTTP 為您的 MCP 實作提供更強大的功能和更好的長期可維護性。

### 為什麼要升級？

有兩個令人信服的理由促使您從 SSE 升級到可串流的 HTTP：

- 可串流的 HTTP 提供比 SSE 更佳的擴充性、相容性和更豐富的通知支援。
- 它是新 MCP 應用程式推薦使用的傳輸方式。

### 遷移步驟

以下是如何在 MCP 應用程式中從 SSE 遷移到可串流的 HTTP：

- <strong>更新伺服器程式碼</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客戶端程式碼</strong>，使用 `streamablehttp_client` 來取代 SSE 客戶端。
- <strong>在客戶端實作訊息處理器</strong> 來處理通知。
- <strong>測試相容性</strong>，確保與現有工具和工作流程配合順暢。

### 維持相容性

建議在遷移期間維持與現有 SSE 客戶端的相容性。以下是一些策略：

- 您可以同時支援 SSE 與可串流的 HTTP，讓兩者在不同端點運行。
- 逐步將客戶端遷移到新的傳輸方式。

### 挑戰

確保您在遷移過程中處理以下挑戰：

- 確保所有客戶端都已更新
- 處理通知傳遞差異

## 安全性考量

當實作任何伺服器時，安全性應是首要任務，尤其是使用基於 HTTP 的傳輸方式（如 MCP 中的可串流 HTTP）。

在用基於 HTTP 的傳輸實作 MCP 伺服器時，安全性成為極為重要的問題，需要謹慎注意多個攻擊向量及防護機制。

### 概述

當透過 HTTP 暴露 MCP 伺服器時，安全性非常重要。可串流 HTTP 引入了新的攻擊面，需謹慎設定。

以下是一些關鍵的安全性考量：

- **Origin 標頭驗證**：始終驗證 `Origin` 標頭，以防止 DNS 重新綁定攻擊。
- <strong>本地主機綁定</strong>：在本地開發時，將伺服器綁定於 `localhost`，避免暴露於公開網路。
- <strong>身分驗證</strong>：在生產環境部署時實作身分驗證（例如 API 金鑰、OAuth）。
- **CORS**：設定跨來源資源分享 (CORS) 政策以限制存取。
- **HTTPS**：在生產環境使用 HTTPS 來加密流量。

### 最佳實務

此外，在您的 MCP 串流伺服器中實作安全性時，建議遵循以下最佳實務：

- 不可無條件信任任何傳入請求，必須驗證。
- 記錄與監控所有存取和錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰

在為 MCP 串流伺服器實作安全性時，您會遇到以下挑戰：

- 在安全性與開發便利性之間取得平衡
- 確保與各種客戶端環境的相容性

### 練習題：打造您自己的串流 MCP 應用程式

**情境：**
打造一個 MCP 伺服器與客戶端，伺服器處理一個項目清單（例如檔案或文件），並為處理的每個項目傳送通知。客戶端須即時顯示每則到達的通知。

**步驟：**

1. 實作一個伺服器工具，處理清單並對每個項目傳送通知。
2. 實作一個具有訊息處理器的客戶端，以即時顯示通知。
3. 同時執行伺服器和客戶端測試您的實作，並觀察通知。

[解答](./solution/README.md)

## 進一步閱讀與接下來的方向

為了繼續您的 MCP 串流之旅並擴展知識，本節提供額外資源和建議的後續步驟，以協助您構建更進階的應用程式。

### 進一步閱讀

- [Microsoft: HTTP 串流介紹](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core 中的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: 串流請求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 接下來？

- 嘗試建置更進階的 MCP 工具，使用串流實現即時分析、聊天或協同編輯。
- 探索將 MCP 串流整合至前端框架（React、Vue 等），實現即時 UI 更新。
- 下一步：[利用 VSCode 的 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->