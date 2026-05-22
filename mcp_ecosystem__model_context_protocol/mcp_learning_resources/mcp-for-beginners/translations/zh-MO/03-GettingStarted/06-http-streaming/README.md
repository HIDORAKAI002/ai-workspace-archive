# 使用模型上下文協議 (MCP) 的 HTTPS 串流

本章詳盡指導如何透過 HTTPS 實作安全、可擴展且即時的串流，採用模型上下文協議 (MCP)。涵蓋串流的動機、可用的傳輸機制、如何在 MCP 中實作可串流的 HTTP、安全最佳實踐、從 SSE 遷移的方式，以及構建自家串流 MCP 應用的實務指導。

## MCP 的傳輸機制與串流

本節探討 MCP 中可使用的不同傳輸機制，以及它們在促成客戶端與伺服器間即時通訊的串流能力中所扮演的角色。

### 什麼是傳輸機制？

傳輸機制定義了客戶端和伺服器間如何交換資料。MCP 支援多種傳輸類型以適應不同環境與需求：

- **stdio**：標準輸入/輸出，適用本地及命令列工具。簡單但不適合網路或雲端環境。
- **SSE (Server-Sent Events)**：允許伺服器通過 HTTP 向客戶端推送即時更新。適合 Web 介面，但在擴展性和彈性上有限。從 MCP 規範 2025-06-18 起，獨立的 SSE 傳輸已被棄用，改由「可串流 HTTP」傳輸取代。
- **可串流 HTTP（Streamable HTTP）**：現代基於 HTTP 的串流傳輸，支援通知和更佳的擴展性。推薦用於多數生產和雲端場景。

### 比較表

請參閱下表，了解這些傳輸機制的差異：

| 傳輸方式          | 即時更新       | 串流       | 擴展性        | 使用情境               |
|-------------------|----------------|------------|--------------|------------------------|
| stdio             | 否             | 否         | 低           | 本地命令列工具         |
| SSE               | 是             | 是         | 中           | Web，即時更新          |
| 可串流 HTTP       | 是             | 是         | 高           | 雲端、多用戶端         |

> **提示：** 適當的傳輸方式會影響效能、擴展性及使用者體驗。**可串流 HTTP** 為現代、可擴展且雲端適用的應用推薦使用。

請注意前章介紹過的 stdio 與 SSE 傳輸，以及本章涵蓋的可串流 HTTP 傳輸。

## 串流的概念與動機

了解串流的基本觀念與動機，對實作有效的即時通訊系統至關重要。

<strong>串流</strong> 是網路程式設計中一種技術，使資料能以小而易管控的區塊或事件序列被傳送和接收，而非等待整個回應準備完成才傳送。此方式特別適用於：

- 大型檔案或資料集。
- 即時更新（如聊天、進度條）。
- 長時間運算並想持續通知使用者。

關於串流，您需要了解：

- 資料逐步傳送，而非一次完成。
- 客戶端可邊接收邊處理資料。
- 降低感知延遲並提升使用者體驗。

### 為什麼使用串流？

使用串流的原因包括：

- 使用者能即時得到回饋，而不是僅在結束時。
- 支援即時應用與互動式 UI。
- 更有效利用網路及運算資源。

### 簡單示範：HTTP 串流伺服器與客戶端

以下是串流實作的簡單範例：

#### Python

**伺服器 (Python，使用 FastAPI 與 StreamingResponse)：**

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

這個例子示範伺服器隨著訊息可用即逐條發送，而非等待所有訊息準備完畢。

**運作原理：**

- 伺服器即時 yield 每則訊息。
- 客戶端接收並立即列印到達的每一部分。

**需求：**

- 伺服器必須使用串流回應（例如 FastAPI 的 `StreamingResponse`）。
- 客戶端需以串流模式處理回應（requests 的 `stream=True`）。
- Content-Type 通常為 `text/event-stream` 或 `application/octet-stream`。

#### Java

**伺服器 (Java，使用 Spring Boot 與 Server-Sent Events)：**

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

- 使用 Spring Boot 的反應式棧與 `Flux` 實作串流
- `ServerSentEvent` 支援帶事件類型的結構化事件串流
- `WebClient` 結合 `bodyToFlux()` 用於反應式串流處理
- `delayElements()` 模擬事件間的處理時間
- 事件帶有類型（如 `info`、`result`）以便客戶端更好處理

### 比較：傳統串流 vs MCP 串流

傳統串流與 MCP 串流工作方式的差異如下表所示：

| 功能                  | 傳統 HTTP 串流              | MCP 串流（通知）           |
|-----------------------|----------------------------|----------------------------|
| 主要回應              | 分塊傳輸                   | 單一，於結尾傳送           |
| 進度更新              | 作為資料塊傳送             | 作為通知傳送               |
| 客戶端需求            | 必須處理串流               | 必須實作訊息處理器         |
| 使用情境              | 大型檔案、AI 令牌串流       | 進度、日誌、即時回饋       |

### 主要差異

此外，還有下列重要差異：

- **通訊模式：**
  - 傳統 HTTP 串流: 透過簡單的分塊傳輸編碼送出資料塊
  - MCP 串流: 採用帶有 JSON-RPC 協議的結構化通知系統

- **訊息格式：**
  - 傳統 HTTP：以純文字區塊、包含換行
  - MCP：結構化的 LoggingMessageNotification 物件，帶有元資料

- **客戶端實作：**
  - 傳統 HTTP：簡單的串流回應處理客戶端
  - MCP：更複雜的訊息處理器，能分辨與處理各種訊息類型

- **進度更新：**
  - 傳統 HTTP：進度是主回應串流的一部分
  - MCP：進度透過獨立通知訊息傳送，主回應於結尾一併送達

### 建議

關於採用傳統串流（如前面所示使用 `/stream` 的端點）或 MCP 串流，我們有以下建議：

- **簡單串流需求：** 傳統 HTTP 串流易於實作且足以應付基礎需求。
- **複雜互動應用：** MCP 串流具更結構化方法，並帶有豐富元資料，分離通知與最終結果。
- **AI 應用：** MCP 的通知系統特別適用於需持續通知進度的長時間 AI 任務。

## MCP 中的串流

至此，您已看到有關傳統串流與 MCP 串流的建議與比較。接下來將詳細說明如何在 MCP 中應用串流。

理解 MCP 框架內串流的運作方式，有助於建構在長時間作業期間，能即時向使用者提供反饋的互動應用。

在 MCP 中，串流不再是以分塊方式傳送主回應，而是透過在工具處理請求時向客戶端發送<strong>通知</strong>。這些通知可包含進度更新、日誌或其他事件。

### 運作方式

主要結果仍以單一回應傳送。不過，在處理過程中可額外送出通知訊息，及時更新客戶端。客戶端必須可處理這些通知並予以顯示。

## 什麼是通知？

剛才提及「通知」，MCP 中的通知究竟是什麼？

通知是伺服器發送給客戶端的訊息，用以通報長時間執行操作的進度、狀態或其他事件。通知提升透明度及使用者體驗。

例如，客戶端在與伺服器完成初始握手後，應發送通知。

通知以 JSON 訊息呈現如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知隸屬於 MCP 中稱為「[Logging](https://modelcontextprotocol.io/specification/draft/server/utilities/logging)」的主題。

若要啟用日誌功能，伺服器需將其列為功能／能力，如下所示：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 視所使用 SDK 而定，日誌功能可能預設啟用，或需在伺服器設定中明確啟用。

通知類別多樣：

| 等級       | 描述                           | 範例用例                     |
|-----------|--------------------------------|------------------------------|
| debug     | 詳細除錯資訊                   | 函式進出點                   |
| info      | 一般資訊訊息                   | 操作進度更新                 |
| notice    | 正常但重要事件                 | 配置變更                     |
| warning   | 警告條件                       | 逾期功能使用                 |
| error     | 錯誤狀態                       | 操作失敗                     |
| critical  | 重大狀況                       | 系統元件故障                 |
| alert     | 必須立即採取行動               | 偵測資料破損                 |
| emergency | 系統無法使用                   | 完整系統故障                 |

## MCP 中實作通知

要在 MCP 中實作通知，需在伺服器端與客戶端同時配置處理即時更新的機制。讓您的應用能在長時間作業期間即時回饋給使用者。

### 伺服器端：發送通知

從伺服器端開始。在 MCP 中您可定義工具，在處理請求時發送通知。伺服器使用上下文物件（通常稱 `ctx`）向客戶端發訊息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

上述範例中，`process_files` 工具於處理每個檔案時會發送三則通知給客戶端。`ctx.info()` 方法用於發送資訊訊息。

另外，啟用通知需確保伺服器採用串流傳輸（如 `streamable-http`），並且客戶端實作訊息處理器來處理通知。以下是如何設定伺服器使用 `streamable-http` 傳輸：

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

此 .NET 範例中，`ProcessFiles` 工具使用 `Tool` 屬性標記，處理過程中發送三則通知。`ctx.Info()` 用於發送資訊訊息。

要在 .NET MCP 伺服器啟用通知，請使用串流傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客戶端：接收通知

客戶端必須實作訊息處理器來即時處理與顯示通知。

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

上述程式碼中，`message_handler` 函式會檢查傳入訊息是否為通知。若是，則列印通知；否則當作一般伺服器訊息處理。並且示範如何將 `ClientSession` 以 `message_handler` 初始化，以處理接收的通知。

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

此 .NET 範例中，`MessageHandler` 函式檢查是否為通知訊息，若是就印出，否則當作一般訊息處理。`ClientSession` 透過 `ClientSessionOptions` 設定訊息處理器。

要啟用通知，確保您的伺服器使用串流傳輸（如 `streamable-http`），並實作訊息處理器處理通知。

## 進度通知與應用場景

本節介紹 MCP 中的進度通知概念、重要性，及如何利用可串流 HTTP 實作。並附實作練習協助鞏固。

進度通知是伺服器在長時間作業期間即時向客戶端發送的訊息。不必等整個流程結束，伺服器會持續更新目前狀態，提升透明度、使用體驗，並便於除錯。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 為何使用進度通知？

進度通知的重要性包括：

- **提升使用者體驗：** 讓使用者在工作進行時即可看到更新，而非等完成才知結果。
- **即時回饋：** 客戶端能顯示進度條或日誌，讓應用更有反應感。
- **方便除錯與監控：** 開發人員與使用者可察覺處理進度慢或停滯的環節。

### 如何實作進度通知

您可在 MCP 中這樣實作進度通知：

- **伺服器端：** 利用 `ctx.info()` 或 `ctx.log()` 於每處理一項目時發送通知。如此在主結果準備好前，傳送通知給客戶端。
- **客戶端：** 實作訊息處理器來監聽並即時顯示通知。此處理器須能區分通知與最終結果。

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

當實作基於 HTTP 傳輸的 MCP 伺服器時，安全性成為必須嚴肅對待的重點，需仔細防範多種攻擊面向並採取保障措施。

### 概覽

在透過 HTTP 開放 MCP 伺服器時，安全性至關重要。可串流 HTTP 引入新的攻擊面，需謹慎配置。

### 要點

- **Origin 頭部驗證**：務必驗證 `Origin` 頭部以防 DNS 反綁定攻擊。
- <strong>綁定於本地主機</strong>：開發階段請綁定至 `localhost`，避免暴露到公開網路。
- <strong>認證機制</strong>：生產環境中實施認證（如 API 金鑰、OAuth）。
- **CORS 配置**：設定跨來源資源共享 (CORS) 政策以限制存取。
- **HTTPS**：生產環境使用 HTTPS 以加密通訊。

### 最佳實踐

- 絕不信任未經驗證的請求。
- 記錄並監控所有存取與錯誤。
- 定期更新依賴套件以修補安全漏洞。

### 挑戰
- 在安全與開發便利之間取得平衡
- 確保與各種用戶端環境的相容性

## 從 SSE 升級到 Streamable HTTP

對於目前使用 Server-Sent Events (SSE) 的應用程式，遷移到 Streamable HTTP 可以提供增強的功能與更長遠的 MCP 實作可持續性。

### 為什麼要升級？

有兩個主要原因促使您從 SSE 升級到 Streamable HTTP：

- Streamable HTTP 比 SSE 提供更佳的擴展性、相容性與更豐富的通知支援。
- 它是新 MCP 應用程式推薦使用的傳輸方式。

### 遷移步驟

以下是您如何在 MCP 應用程式中從 SSE 遷移到 Streamable HTTP：

- <strong>更新伺服器程式碼</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新用戶端程式碼</strong>，使用 `streamablehttp_client` 取代 SSE 用戶端。
- <strong>在用戶端實作訊息處理器</strong> 以處理通知。
- <strong>測試與現有工具及工作流程的相容性</strong>。

### 維持相容性

建議在遷移過程中維持與現有 SSE 用戶端的相容性。以下是一些策略：

- 您可以透過在不同端點同時運行 SSE 和 Streamable HTTP 兩種傳輸方式來支援雙方。
- 逐步將用戶端遷移到新傳輸方式。

### 挑戰

請確保在遷移期間處理下列挑戰：

- 確保所有用戶端均已更新
- 處理通知傳送的差異

## 安全考量

在實作任何伺服器時，安全性應是最高優先，尤其是使用像 MCP 中 Streamable HTTP 這類基於 HTTP 的傳輸。

當實作基於 HTTP 傳輸的 MCP 伺服器時，安全性成為一項需謹慎注意多種攻擊向量與防護機制的重要議題。

### 概論

當透過 HTTP 揭露 MCP 伺服器時，安全性至關重要。Streamable HTTP 引入新的攻擊面，需細心配置。

以下是一些主要的安全考量：

- **Origin 標頭驗證**：務必驗證 `Origin` 標頭以防範 DNS 綁定攻擊。
- <strong>本地主機綁定</strong>：開發階段將伺服器綁定於 `localhost`，避免暴露至公共網路。
- <strong>驗證機制</strong>：在正式環境部署中實作驗證（例如 API 金鑰、OAuth）。
- **CORS**：設定跨來源資源共用（CORS）政策以限制存取。
- **HTTPS**：正式環境中使用 HTTPS 以加密流量。

### 最佳實務

此外，以下是實作 MCP 串流伺服器安全性時的最佳實務：

- 不可無條件信任所有進入的請求，必須驗證。
- 紀錄並監控所有存取與錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰

在實作 MCP 串流伺服器安全性時，您將面臨以下挑戰：

- 在安全性與開發便利性間取得平衡
- 確保與各種用戶端環境的相容性

### 作業：構建您自己的串流 MCP 應用程式

**情境：**  
構建一套 MCP 伺服器與用戶端，其中伺服器處理一組項目（如檔案或文件列表），並於處理每個項目後發送通知。用戶端則應即時顯示每則通知。

**步驟：**

1. 實作一個伺服器工具，處理列表並對每項目發送通知。
2. 實作一個用戶端並加入訊息處理器，實時顯示通知。
3. 透過同時運行伺服器與用戶端測試您的實作並觀察通知顯示。

[解答](./solution/README.md)

## 延伸閱讀與後續發展

為持續您的 MCP 串流旅程並擴展知識，本節提供額外資源與建立更進階應用的建議後續步驟。

### 延伸閱讀

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 後續建議

- 嘗試構建更多使用串流技術的進階 MCP 工具，如即時分析、聊天或協同編輯。
- 探索在前端框架（React、Vue 等）中整合 MCP 串流以實現即時 UI 更新。
- 下一步： [利用 VSCode 的 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->