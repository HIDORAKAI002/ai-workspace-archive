# HTTPS 使用模型上下文協議（MCP）進行串流

本章提供了使用 HTTPS 與模型上下文協議（MCP）實現安全、可擴展且即時串流的完整指南。涵蓋了串流的動機、可用的傳輸機制、如何在 MCP 中實現可串流的 HTTP、安全最佳實踐、從 SSE 遷移的指引，以及構建您自己的串流 MCP 應用程序的實用指導。

## MCP 的傳輸機制和串流

本節探討 MCP 中可用的不同傳輸機制，以及它們如何支援客戶端與伺服器之間的即時通訊串流功能。

### 什麼是傳輸機制？

傳輸機制定義了客戶端與伺服器之間數據交換的方式。MCP 支援多種傳輸類型，以適應不同環境和需求：

- **stdio**：標準輸入/輸出，適合本地及 CLI 工具。簡單但不適用於網頁或雲端。
- **SSE（伺服器推送事件）**：允許伺服器通過 HTTP 向客戶端推送即時更新。適合網頁 UI，但在擴展性和靈活性方面有限。根據 MCP 2025-06-18 版規範，獨立的 SSE 傳輸已被棄用，改由「可串流 HTTP」傳輸替代。
- **可串流 HTTP**：基於現代 HTTP 的串流傳輸，支援通知和更佳擴展性。建議用於大多數生產和雲端場景。

### 比較表

請參考以下比較表了解這些傳輸機制之間的差異：

| 傳輸                | 即時更新         | 串流       | 擴展性       | 使用案例                 |
|---------------------|------------------|------------|--------------|--------------------------|
| stdio               | 否               | 否         | 低           | 本地 CLI 工具            |
| SSE                 | 是               | 是         | 中           | 網頁，即時更新           |
| 可串流 HTTP         | 是               | 是         | 高           | 雲端，多用戶             |

> **提示：** 選擇合適的傳輸會影響效能、擴展性和用戶體驗。**可串流 HTTP** 建議用於現代、可擴展且雲端準備好的應用程序。

請注意您在前幾章中看到的 stdio 和 SSE 傳輸，以及本章涵蓋的可串流 HTTP。

## 串流：概念與動機

理解串流的基本概念和動機，對於實現有效的即時通訊系統至關重要。

<strong>串流</strong> 是網絡編程中的一種技術，允許數據以小且可管理的區塊或事件序列形式發送和接收，而非等待整個響應準備完成。這對以下情況特別有用：

- 大檔案或數據集。
- 即時更新（如聊天、進度條）。
- 長時間運算時需持續告知使用者狀態。

關於串流，您需要知道：

- 數據是逐步傳送，而非一次完成。
- 客戶端能在接收數據時即時處理。
- 減少感知延遲並提升用戶體驗。

### 為何使用串流？

使用串流的原因包括：

- 使用者能立即得到反饋，而不僅是完成時。
- 支援即時應用程式和回應式用戶介面。
- 更有效利用網絡和計算資源。

### 簡單範例：HTTP 串流伺服器與客戶端

以下是串流實作的簡單示範：

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
  
此範例展示伺服器隨著消息可用，陸續發送給客戶端，而非等待所有消息準備完成後一次傳送。

**運作原理：**

- 伺服器在每條消息準備好時即流出。
- 客戶端接收並在消息抵達時輸出。

**要求：**

- 伺服器需使用串流回應（如 FastAPI 的 `StreamingResponse`）。
- 客戶端需將傳回內容視為串流處理（requests 的 `stream=True`）。
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

- 使用 Spring Boot 的反應式堆棧與 `Flux` 進行串流。
- `ServerSentEvent` 提供帶事件類型的結構性事件串流。
- `WebClient` 以及 `bodyToFlux()` 使能反應式串流消費。
- `delayElements()` 模擬事件間的處理延遲。
- 事件可含類型（如 `info`、`result`）以便更佳的客戶端處理。

### 比較：經典串流 vs MCP 串流

經典串流與 MCP 串流的差異可描述如下：

| 特性                    | 經典 HTTP 串流             | MCP 串流（通知）                 |
|-------------------------|----------------------------|---------------------------------|
| 主要回應                | 分塊傳送                   | 單一回應結尾                    |
| 進度更新                | 當作數據塊傳送             | 作為通知傳送                    |
| 客戶端需求              | 必須處理串流               | 必須實作訊息處理器              |
| 使用案例                | 大型檔案、AI 代幣串流      | 進度、日誌、即時回饋            |

### 主要差異點

另外，這裡列出一些顯著差異：

- **通訊模式：**
  - 經典 HTTP 串流：使用簡單的分塊傳輸編碼分段傳送數據。
  - MCP 串流：使用結構化的通知系統，透過 JSON-RPC 協議。

- **訊息格式：**
  - 經典 HTTP：純文字分塊，且包含換行。
  - MCP：結構化的 LoggingMessageNotification 物件，帶有元資料。

- **客戶端實作：**
  - 經典 HTTP：簡單客戶端處理串流回應。
  - MCP：較複雜客戶端，實作訊息處理器以處理不同訊息類型。

- **進度更新：**
  - 經典 HTTP：進度為主回應串流的一部分。
  - MCP：進度以分開通知訊息傳送，主回應則於末端送達。

### 建議

針對經典串流（如上一節展示的 `/stream` 端點）與 MCP 串流的選擇，我們有以下建議：

- **針對簡單串流需求：** 經典 HTTP 串流較易實作且足夠用於基礎串流場景。
- **針對複雜互動式應用：** MCP 串流提供結構化且豐富元資料的方式，並區分通知與最終結果。
- **針對 AI 應用：** MCP 的通知系統特別適用於長時間運算的 AI 任務，以持續回報用戶進度。

## MCP 中的串流

好了，您已接觸到關於經典串流與 MCP 串流的比較和建議。現在讓我們深入了解如何在 MCP 中實作串流。

了解 MCP 框架中串流的運作原理，對構建在長時間執行操作中為使用者提供即時反饋的響應式應用程序至關重要。

在 MCP 中，串流並非將主回應拆分塊傳送，而是於工具處理請求中，向客戶端發送<strong>通知</strong>。這些通知包含進度更新、日誌或其它事件。

### 它如何運作

主回應仍然一次傳送。但通知可於處理期間作為獨立訊息發送，實時更新客戶端。客戶端須能處理並顯示這些通知。

## 什麼是通知？

我們提到「通知」，MCP 中這是什麼意思？

通知是伺服器向客戶端發送的訊息，用來告知長時間執行作業中的進度、狀態或其它事件。通知提升透明度與用戶體驗。

例如，客戶端在與伺服器完成初始握手後，應發出一條通知。

通知的 JSON 消息格式如下：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```
  
通知屬於 MCP 中稱為 ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 的主題。

若要啟用日誌功能，伺服器需作如下設定以激活功能/能力：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```
  
> [!NOTE]  
> 根據所用 SDK 不同，日誌功能可能預設啟用，或需在伺服器設定中明確開啟。

有多種通知類型：

| 等級      | 說明                         | 範例用例                       |
|-----------|------------------------------|------------------------------|
| debug     | 詳細除錯資訊                 | 函式進入/退出點               |
| info      | 一般訊息                     | 作業進度更新                 |
| notice    | 正常但重要事件               | 設定變更                     |
| warning   | 警告狀況                    | 使用已廢棄功能               |
| error     | 錯誤狀況                    | 作業失敗                     |
| critical  | 致命狀況                    | 系統元件故障                 |
| alert     | 必須立即採取行動            | 偵測到資料損毀               |
| emergency | 系統不可用                  | 完全系統故障                 |

## 在 MCP 中實作通知

要在 MCP 中實作通知，您需設置伺服器和客戶端雙方，以處理即時更新。此機制讓應用在長時間運作中，能為使用者提供即時回饋。

### 伺服器端：發送通知

從伺服器端開始。在 MCP 中，您定義的工具能於處理請求時發送通知。伺服器使用上下文物件（通常叫 `ctx`）向客戶端傳送訊息。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```
  
前例中，`process_files` 工具在處理每個檔案時，發出三條通知給客戶端。`ctx.info()` 方法用於發送一般資訊訊息。

此外，為啟用通知，確保您的伺服器使用串流傳輸（例如 `streamable-http`），而您的客戶端實作了訊息處理器來處理通知。以下示範如何設定伺服器使用 `streamable-http` 傳輸：

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
  
此 .NET 範例中，`ProcessFiles` 工具使用 `Tool` 屬性標註，並在處理每個檔案時向客戶端發送三次通知。`ctx.Info()` 方法用於發送資訊訊息。

要在您的 .NET MCP 伺服器啟用通知，請確保使用串流傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```
  
### 客戶端：接收通知

客戶端必須實作訊息處理器來接收並顯示到達的通知。

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
  
上述程式碼中，`message_handler` 函式判斷傳入消息是否為通知。如果是，則印出通知；否則，當作一般伺服器訊息處理。且 `ClientSession` 在初始化時傳入此處理器以處理進來的通知。

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
  
此 .NET 範例中，`MessageHandler` 函式會檢查消息是否為通知。若是，則印出通知；否則作為正常訊息處理。`ClientSession` 透過 `ClientSessionOptions` 傳入訊息處理器。

為啟用通知，確保您的伺服器使用串流傳輸（如 `streamable-http`）且客戶端實作訊息處理器來處理通知。

## 進度通知與場景

本節說明 MCP 的進度通知概念、其重要性，以及如何使用可串流 HTTP 實作。並附有實作練習以加強理解。

進度通知是伺服器於長時間運行過程中，即時向客戶端發送的消息。伺服器不必等整個程序完成，而是持續更新目前狀態。這提升了透明度、用戶體驗，並使除錯更容易。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```
  
### 為何使用進度通知？

進度通知的重要理由包括：

- **提升用戶體驗：** 使用者可看到工作進度，而非僅完成後才更新。
- **即時反饋：** 客戶端能顯示進度條或日誌，使應用感覺更靈敏。
- **方便除錯和監控：** 開發者和使用者能看到過程中可能緩慢或卡住的位置。

### 如何實作進度通知

以下是 MCP 中實作進度通知的方式：

- **伺服器端：** 在每項目處理時，使用 `ctx.info()` 或 `ctx.log()` 發送通知。這會在主結果就緒前先傳送訊息給客戶端。
- **客戶端：** 實作接收通知的訊息處理器，在通知到達時顯示。此處理器能區分通知與最終結果。

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

當使用基於 HTTP 的傳輸方式實作 MCP 伺服器時，安全性成為至關重要的議題，需要對多種攻擊向量及防護機制加以細心關注。

### 概述

在透過 HTTP 暴露 MCP 伺服器時，安全非常重要。可串流 HTTP 帶來新的攻擊面，因此需審慎配置。

### 重要要點

- **Origin 標頭驗證**：務必驗證 `Origin` 標頭，以防止 DNS 重綁定攻擊。
- <strong>本地主機綁定</strong>：開發期間將伺服器綁定至 `localhost`，避免意外暴露於公開網路。
- <strong>身份驗證</strong>：生產環境部署時實作身份驗證（例如 API 金鑰、OAuth）。
- **CORS**：設定跨來源資源共享（CORS）策略以限制存取。
- **HTTPS**：生產環境使用 HTTPS 以加密流量。

### 最佳實踐

- 勿信任未經驗證的請求。
- 紀錄並監控所有存取及錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰
- 平衡安全性與開發便利性
- 確保與各種客戶端環境的相容性

## 從 SSE 升級到 Streamable HTTP

對於目前使用 Server-Sent Events (SSE) 的應用程式，遷移到 Streamable HTTP 可為您的 MCP 實作提供增強的能力和更好的長期可維護性。

### 為什麼要升級？

升級從 SSE 到 Streamable HTTP 有兩個主要原因：

- Streamable HTTP 提供比 SSE 更好的擴展性、相容性和更豐富的通知支持。
- 它是新 MCP 應用程式推薦的傳輸方式。

### 遷移步驟

以下是您可以在 MCP 應用程式中從 SSE 遷移到 Streamable HTTP 的方法：

- <strong>更新伺服器程式碼</strong> ，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客戶端程式碼</strong> ，使用 `streamablehttp_client` 替換 SSE 客戶端。
- <strong>在客戶端實作消息處理器</strong> 以處理通知。
- <strong>測試與現有工具及工作流程的相容性</strong>。

### 維持相容性

建議在遷移過程中維持與現有 SSE 客戶端的相容性。以下是一些策略：

- 您可以同時支援 SSE 與 Streamable HTTP，分別在不同端點運行兩種傳輸方式。
- 逐步將客戶端遷移至新傳輸。

### 挑戰

遷移期間需解決以下挑戰：

- 確保所有客戶端都已更新
- 處理通知傳遞上的差異

## 安全性考量

實作任何伺服器時，安全性應為首要考量，尤其是在 MCP 中使用基於 HTTP 的傳輸（如 Streamable HTTP）。

在以 HTTP 為基礎的傳輸上實作 MCP 伺服器，安全性成為極為重要的議題，需要仔細注意多種攻擊面向及防護機制。

### 概覽

在透過 HTTP 曝露 MCP 伺服器時，安全性相當關鍵。Streamable HTTP 引入新的攻擊面，需要妥善配置。

以下是一些主要的安全性考量：

- **Origin 標頭驗證**：始終驗證 `Origin` 標頭以防止 DNS 領域重綁定攻擊。
- <strong>本地主機綁定</strong>：開發階段建議綁定伺服器至 `localhost`，避免公開至公網。
- <strong>驗證機制</strong>：在生產部署時實作驗證（例如 API 金鑰、OAuth）。
- **跨來源資源共享 (CORS)**：設定 CORS 政策以限制存取。
- **HTTPS**：生產環境使用 HTTPS 以加密流量。

### 最佳實踐

此外，實作 MCP 流式伺服器時，以下是推薦的安全最佳實踐：

- 不要輕信未經驗證的請求。
- 紀錄並監控所有存取及錯誤事件。
- 定期更新相依套件，以修補安全漏洞。

### 挑戰

在實作 MCP 流式伺服器安全性時會面臨以下挑戰：

- 平衡安全性與開發便利性
- 確保與各種客戶端環境的相容性

### 作業：自行建置流式 MCP 應用程式

**情境：**  
建置一個 MCP 伺服器與客戶端，伺服器處理一串項目（例如檔案或文件）並針對每個已處理的項目發送通知。客戶端應在收到通知時立即顯示。

**步驟：**

1. 實作一個伺服器工具，處理清單並針對每個項目發送通知。
2. 實作具有消息處理器的客戶端，實時顯示通知。
3. 透過同時運行伺服器與客戶端測試您的實作，觀察通知。

[Solution](./solution/README.md)

## 深入閱讀與下一步？

為了繼續您的 MCP 流式學習之路並擴展知識，本節提供額外資源與建議的下一步，用以建構更進階的應用程式。

### 深入閱讀

- [Microsoft: HTTP 流式傳輸介紹](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core 的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests：流式請求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 下一步？

- 嘗試建置使用流式傳輸進行即時分析、聊天或協同編輯的更進階 MCP 工具。
- 探索將 MCP 流式傳輸與前端框架（React、Vue 等）整合以實現即時 UI 更新。
- 下一步：[在 VSCode 利用 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->