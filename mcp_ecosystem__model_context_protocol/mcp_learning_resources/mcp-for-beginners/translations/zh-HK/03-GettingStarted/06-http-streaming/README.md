# 使用 Model Context Protocol (MCP) 的 HTTPS 流式傳輸

本章節提供如何使用 HTTPS 實現安全、可擴展且即時的 Model Context Protocol (MCP) 流式傳輸的完整指南。涵蓋了流式傳輸的動機、可用的傳輸機制、如何在 MCP 中實現可串流的 HTTP、最佳安全實踐、從 SSE（Server-Sent Events）遷移，以及構建自己的流式 MCP 應用程式的實用指導。

> **前瞻說明：** 本課程描述根據 **MCP 規範 2025-11-25** 的可串流 HTTP ，該版本在 `initialize` 階段建立會話，並以 `Mcp-Session-Id` 標頭綁定。2026-07-28 版測試候選版本則完全去除握手和會話 ID，使每個請求都自成一體且可路由至任意伺服器實例，無需黏著會話。詳細內容請參見[ MCP 變更概覽：2026-07-28 釋出候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## MCP 中的傳輸機制與流式傳輸

本節探討 MCP 中可用的不同傳輸機制，以及它們在實現客戶端與伺服器之間即時通訊流式能力上的角色。

### 什麼是傳輸機制？

傳輸機制定義了客戶端與伺服器之間如何交換資料。MCP 支援多種傳輸類型，以適應不同環境與需求：

- **stdio**：標準輸入/輸出，適合本地和 CLI 工具，簡單但不適合網頁或雲端環境。
- **SSE (Server-Sent Events)**：允許伺服器透過 HTTP 向客戶端推送即時更新，適合網頁 UI，但擴展性和靈活性有限。根據 MCP 規範 2025-06-18，獨立 SSE 傳輸已被棄用，改由「可串流 HTTP」傳輸替代。
- **可串流 HTTP**：基於現代 HTTP 的流式傳輸，支持通知與更佳擴展性，建議用於大多數生產和雲端場景。

### 比較表

請參考下表了解這些傳輸機制的差異：

| 傳輸方式        | 即時更新      | 流式傳輸   | 可擴展性   | 使用案例                  |
|-----------------|--------------|-----------|-----------|--------------------------|
| stdio           | 否           | 否        | 低        | 本地 CLI 工具             |
| SSE             | 是           | 是        | 中        | 網頁，即時更新            |
| 可串流 HTTP     | 是           | 是        | 高        | 雲端，多客戶端            |

> **提示：** 選擇合適的傳輸方式影響性能、擴展性和用戶體驗。**可串流 HTTP** 推薦用於現代、可擴展及雲端就緒的應用。

請留意之前章節示範的 stdio 和 SSE 傳輸方式，以及本章所涵蓋的可串流 HTTP 傳輸。

## 流式傳輸：概念與動機

理解流式傳輸的基本概念與動機，對於實作有效的即時通訊系統非常重要。

<strong>流式傳輸</strong> 是網路程式設計中的一種技術，允許資料以小批量或事件序列方式逐步送出與接收，而不是等待整個回應完成後才一次回傳。這在以下場合特別有用：

- 大型檔案或資料集。
- 即時更新（如聊天、進度條）。
- 長時間運算過程中希望持續回饋給使用者。

流式傳輸的核心要點如下：

- 資料逐步送達，而非一次到齊。
- 客戶端可即時處理到達的資料。
- 降低感知延遲，提升使用體驗。

### 為何使用流式傳輸？

使用流式傳輸的理由包括：

- 使用者能即時獲得回饋，而非只在結束才接收。
- 促進即時應用與靈敏介面。
- 更有效率地使用網路及計算資源。

### 簡單範例：HTTP 流式伺服器與客戶端

以下為流式傳輸的簡單示範實作：

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

範例示範伺服器如何在資料準備好時陸續發送訊息給客戶端，而非等待所有訊息齊備後一次送出。

**工作原理：**

- 伺服器在每個訊息準備好時就產出該資料。
- 客戶端接收並即時印出每個串流資料區塊。

**需求：**

- 伺服器必須使用串流回應（如 FastAPI 的 `StreamingResponse`）。
- 客戶端必須以串流方式處理回應（requests 中的 `stream=True`）。
- Content-Type 通常是 `text/event-stream` 或 `application/octet-stream`。

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

- 採用 Spring Boot 的反應式堆疊與 `Flux` 進行串流
- `ServerSentEvent` 提供具事件類型的結構化事件串流
- `WebClient` 搭配 `bodyToFlux()` 支援反應式串流消費
- `delayElements()` 模擬事件間的處理時間
- 事件可包含型別（`info`、`result`）以利客戶端處理

### 比較：經典流式傳輸與 MCP 流式傳輸

經典 HTTP 流式與 MCP 流式的差異可以如下圖所示：

| 特性                 | 經典 HTTP 流式            | MCP 流式（通知）               |
|----------------------|---------------------------|-------------------------------|
| 主要回應              | 分塊傳輸                  | 單一結束回應                  |
| 進度更新              | 以資料區塊形式傳送         | 以通知訊息傳送                |
| 客戶端需求            | 必須處理串流              | 必須實作訊息處理器             |
| 使用案例              | 大型檔案、AI 代幣串流     | 進度、日誌、即時回饋           |

### 觀察到的主要差異

以下為部分主要差異點：

- **通訊模式：**
  - 經典 HTTP 流式：使用簡單的 chunked 傳輸編碼分塊傳送資料
  - MCP 流式：採用 JSON-RPC 協議的結構化通知系統

- **訊息格式：**
  - 經典 HTTP：純文字區塊，搭配換行符號
  - MCP：包含元資料的 LoggingMessageNotification 物件

- **客戶端實作：**
  - 經典 HTTP：簡單客戶端，處理串流回應
  - MCP：更複雜的客戶端，需實作訊息處理器處理不同訊息類型

- **進度更新：**
  - 經典 HTTP：進度是主要回應串流的一部分
  - MCP：進度透過獨立通知訊息傳送，主要回應於結束時回傳

### 推薦建議

關於選擇經典串流（如上方以 `/stream` 實作的端點）與 MCP 流式的方法，我們有一些建議：

- **簡單的串流需求：** 經典 HTTP 流式較易實現，足以應付基礎的串流需求。

- **複雜且互動性高的應用：** MCP 流式提供結構化處理，擁有豐富元資料，且將通知與最終結果分離。

- **針對 AI 應用：** MCP 的通知系統特別適合長時間運算的 AI 任務，能持續向用戶匯報進度。

## MCP 中的流式傳輸

經過以上建議與比較，我們接著詳述如何在 MCP 框架中實際利用流式傳輸。

理解 MCP 中的流式機制，對於建構能在長時間運算中即時回饋使用者的互動應用至關重要。

在 MCP 中，流式傳輸不在於把主要回應分塊傳輸，而是透過傳送<strong>通知</strong>給客戶端，在工具處理請求時推送進度更新、日誌或其他事件。

### 運作方式

主要結果仍作為單一回應傳送，通知則可於處理過程中分批發送，以即時更新客戶端。客戶端必須能處理並顯示這些通知。

## 什麼是通知？

我們提到「通知」，這在 MCP 中是什麼意思？

通知是伺服器傳送給客戶端的訊息，用以告知進度、狀態或長時間操作中的其他事件。通知提升了透明度與使用者體驗。

例如，客戶端在與伺服器初始握手後應傳送一則通知。

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

通知屬於 MCP 中被稱為["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 主題的一部分。

> **棄用通知：** 2026-07-28 MCP 規範測試候選版本中，Logging 原始元件被標記為棄用，改用 stdio 傳輸時的 `stderr` 以及 OpenTelemetry 作更結構化的可觀察性。Logging 在 2025-11-25 版本及正式棄用後至少一年仍可使用。詳見[ MCP 變更概覽：2026-07-28 釋出候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

若要使日誌功能有效，伺服器需將其作為功能/能力啟用，語法如下：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 依您使用的 SDK，日誌可能預設啟用，也可能需在伺服器設定中明確開啟。

通知有不同種類型：

| 等級       | 描述                          | 範例使用情境                  |
|------------|------------------------------|------------------------------|
| debug      | 詳細除錯資訊                 | 函式進入/退出點              |
| info       | 一般資訊訊息                 | 操作進度更新                  |
| notice     | 正常但重要事件               | 設定變更                    |
| warning    | 警告狀況                     | 使用已棄用功能                |
| error      | 錯誤狀況                     | 操作失敗                    |
| critical   | 臨界狀態                     | 系統元件故障                |
| alert      | 必須立即採取行動的狀況       | 發現資料損壞                |
| emergency  | 系統無法使用                 | 系統完全故障                |

## 在 MCP 中實作通知

要在 MCP 中實作通知，伺服器端與客戶端雙方需配置好接收即時更新的處理機制。如此能讓應用程式於長時間操作期間即時提示使用者。

### 伺服器端：發送通知

伺服器端開始。MCP 中，您定義的工具可在向請求回應時發送通知。伺服器使用上下文物件（通常為 `ctx`）來發送訊息給客戶端。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

前例中，`process_files` 工具在掃描每個檔案時都會向客戶端發送三則通知。使用 `ctx.info()` 方法傳送資訊訊息。

此外，要啟用通知功能，確保伺服器使用串流傳輸（如 `streamable-http`），且客戶端實作訊息處理器。以下展示如何設定伺服器使用 `streamable-http` 傳輸：

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

此 .NET 範例中，`ProcessFiles` 工具標記為 `Tool`，在處理每個檔案時發送三則通知給客戶端。`ctx.Info()` 方法用於傳送資訊訊息。

若要在 .NET MCP 伺服器啟用通知，請確定利用串流傳輸：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 客戶端：接收通知

客戶端必須實作訊息處理器，即時處理並顯示接收的通知。

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

程式中，`message_handler` 函式判斷傳入訊息是否為通知，若是則印出通知，否則當作一般伺服器訊息處理。另留意如何將 `ClientSession` 初始化時指定 `message_handler` 以處理通知。

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

此 .NET 範例中，`MessageHandler` 函式判別傳入訊息是否為通知，若是印出通知，否則當作一般伺服器訊息處理。`ClientSession` 透過 `ClientSessionOptions` 初始化並傳入訊息處理器。

要啟用通知，請確保伺服器使用串流傳輸（如 `streamable-http`），且客戶端實作訊息處理器處理通知。

## 進度通知與應用場景

本節說明 MCP 中的進度通知概念、意義，及如何用可串流 HTTP 實作。並提供實務作業強化理解。

進度通知是伺服器在長時間作業期間向客戶端發送的即時訊息。不須等待整個流程結束，伺服器即時更新目前狀態。提升透明度、用戶體驗並方便除錯。

**範例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 為何使用進度通知？

進度通知重要原因如下：

- **改善使用者體驗：** 使用者能隨工作進展即時看到更新，而非僅於結束時。
- **即時回饋：** 客戶端可顯示進度條或日誌，讓應用更具互動性。
- **便於除錯與監控：** 開發與使用者能看見何處過程緩慢或卡住。

### 如何實作進度通知

實作 MCP 進度通知方式如下：

- **伺服器端：** 使用 `ctx.info()` 或 `ctx.log()` 發送通知，於處理每筆項目時即時更新，主結果尚未完成時就發出。
- **客戶端：** 實作訊息處理器，監聽並即時顯示通知。處理器需辨別通知與最終結果訊息。

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

**客戶端示例：**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## 安全考量

在使用基於 HTTP 的傳輸實作 MCP 伺服器時，安全性成為至關重要的考量，需要仔細關注多個攻擊向量和防護機制。

### 概述

在透過 HTTP 暴露 MCP 伺服器時，安全性至關重要。可串流的 HTTP 引入新的攻擊面，需要謹慎配置。

### 主要要點

- <strong>來源標頭驗證</strong>：務必驗證 `Origin` 標頭以防止 DNS 重新綁定攻擊。
- <strong>本地主機綁定</strong>：開發時將伺服器綁定到 `localhost`，避免暴露於公網。
- <strong>驗證機制</strong>：生產環境部署時實作驗證（例如 API 金鑰、OAuth）。
- **CORS**：配置跨來源資源分享（CORS）策略以限制存取。
- **HTTPS**：生產環境使用 HTTPS 以加密流量。

### 最佳實踐

- 不要信任未經驗證的傳入請求。
- 記錄並監控所有存取和錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰

- 在安全性與開發便利性之間取得平衡
- 確保與多種客戶端環境相容

## 從 SSE 升級至可串流 HTTP

對於當前使用 Server-Sent Events (SSE) 的應用程式，遷移至可串流 HTTP 可為您的 MCP 實作提供更強大的功能和更好的長期可維護性。

### 為什麼要升級？

升級從 SSE 到可串流 HTTP 有兩大主要理由：

- 可串流 HTTP 比 SSE 具有更好的擴展性、相容性及更豐富的通知支援。
- 它是新 MCP 應用程式推薦的傳輸方式。

### 遷移步驟

以下是您如何在 MCP 應用中從 SSE 遷移到可串流 HTTP：

- <strong>更新伺服器程式碼</strong>，在 `mcp.run()` 中使用 `transport="streamable-http"`。
- <strong>更新客戶端程式碼</strong>，改用 `streamablehttp_client` 替代 SSE 客戶端。
- <strong>實作消息處理器</strong>，於客戶端處理通知。
- <strong>測試相容性</strong>，確保配合現有工具和工作流程。

### 維持相容性

建議在遷移過程中維持與現有 SSE 客戶端的相容性。以下是一些策略：

- 透過在不同端點同時執行 SSE 與可串流 HTTP 傳輸，支援雙方。
- 逐步遷移客戶端到新傳輸方式。

### 挑戰

遷移時需克服以下挑戰：

- 確保所有客戶端均已更新
- 處理通知送達的差異

## 安全考量

實作任何伺服器時，安全性應為首要任務，尤其是使用 MCP 中像可串流 HTTP 這類基於 HTTP 的傳輸時。

在使用基於 HTTP 的傳輸實作 MCP 伺服器時，安全性成為至關重要的考量，需要仔細關注多個攻擊向量和防護機制。

### 概述

在透過 HTTP 暴露 MCP 伺服器時，安全性至關重要。可串流的 HTTP 引入新的攻擊面，需要謹慎配置。

以下是一些關鍵的安全考量：

- <strong>來源標頭驗證</strong>：務必驗證 `Origin` 標頭以防止 DNS 重新綁定攻擊。
- <strong>本地主機綁定</strong>：開發時將伺服器綁定到 `localhost`，避免暴露於公網。
- <strong>驗證機制</strong>：生產環境部署時實作驗證（例如 API 金鑰、OAuth）。
- **CORS**：配置跨來源資源分享（CORS）策略以限制存取。
- **HTTPS**：生產環境使用 HTTPS 以加密流量。

### 最佳實踐

此外，實作 MCP 串流伺服器安全時，建議遵循以下最佳實踐：

- 不要信任未經驗證的傳入請求。
- 記錄並監控所有存取和錯誤。
- 定期更新相依套件以修補安全漏洞。

### 挑戰

在實作 MCP 串流伺服器安全時會面臨以下挑戰：

- 在安全性與開發便利性之間取得平衡
- 確保與多種客戶端環境相容

### 任務：建立您自己的串流 MCP 應用程式

**情境：**
建立一個 MCP 伺服器與客戶端，伺服器處理一份項目清單（例如檔案或文件），並在處理每個項目後發送通知。客戶端應即時顯示每個抵達的通知。

**步驟：**

1. 實作一個伺服器工具，處理清單並對每項發送通知。
2. 實作一個具消息處理器的客戶端，以即時顯示通知。
3. 運行伺服器與客戶端測試實作，觀察通知出現。

[解決方案](./solution/README.md)

## 進階閱讀與後續步驟

為持續深入 MCP 串流的旅程並擴展知識，本段提供更多資源及建議的下一步，助您建置更進階的應用。

### 進階閱讀

- [Microsoft: HTTP 串流入門](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core 的 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: 串流請求](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 後續？ 

- 嘗試建置更進階的 MCP 工具，使用串流做即時分析、聊天或協同編輯。
- 探索將 MCP 串流整合到前端框架 (React、Vue 等)，實作動態 UI 更新。
- 下一步：[利用 VSCode 的 AI 工具包](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->