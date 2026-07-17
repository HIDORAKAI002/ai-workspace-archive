# Phát trực tiếp HTTPS với Giao thức Bối cảnh Mô hình (MCP)

Chương này cung cấp hướng dẫn toàn diện về cách triển khai phát trực tiếp an toàn, mở rộng và thời gian thực với Giao thức Bối cảnh Mô hình (MCP) sử dụng HTTPS. Nó bao gồm động lực cho phát trực tiếp, các cơ chế truyền tải có sẵn, cách triển khai HTTP có thể phát trực tiếp trong MCP, các thực hành bảo mật tốt nhất, di chuyển từ SSE, và hướng dẫn thực tiễn để xây dựng các ứng dụng MCP phát trực tiếp riêng của bạn.

> **Nhìn về phía trước:** bài học này mô tả HTTP có thể phát trực tiếp theo **Đặc tả MCP 2025-11-25**, trong đó một phiên được thiết lập trong quá trình `initialize` và được gán với tiêu đề `Mcp-Session-Id`. Phiên bản thử nghiệm phát hành ngày `2026-07-28` loại bỏ hoàn toàn việc bắt tay và ID phiên, làm cho mỗi yêu cầu tự chứa và có thể định tuyến đến bất kỳ phiên bản máy chủ nào mà không cần phiên dính. Xem [Có gì thay đổi trong MCP: Phiên bản thử nghiệm phát hành 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) để biết chi tiết.

## Cơ chế truyền tải và phát trực tiếp trong MCP

Phần này khám phá các cơ chế truyền tải khác nhau có sẵn trong MCP và vai trò của chúng trong việc cho phép tính năng phát trực tiếp nhằm truyền thông thời gian thực giữa khách hàng và máy chủ.

### Cơ chế truyền tải là gì?

Một cơ chế truyền tải định nghĩa cách dữ liệu được trao đổi giữa khách hàng và máy chủ. MCP hỗ trợ nhiều loại truyền tải để phù hợp với các môi trường và yêu cầu khác nhau:

- **stdio**: Đầu vào/đầu ra tiêu chuẩn, phù hợp với công cụ cục bộ và dựa trên CLI. Đơn giản nhưng không phù hợp cho web hoặc đám mây.
- **SSE (Server-Sent Events)**: Cho phép máy chủ gửi cập nhật thời gian thực đến khách hàng qua HTTP. Tốt cho giao diện web, nhưng giới hạn về khả năng mở rộng và linh hoạt. Theo Đặc tả MCP 2025-06-18, truyền tải SSE độc lập đã bị loại bỏ và thay thế bởi truyền tải "HTTP Có thể phát trực tiếp".
- **HTTP Có thể phát trực tiếp**: Truyền tải phát trực tiếp dựa trên HTTP hiện đại, hỗ trợ thông báo và khả năng mở rộng tốt hơn. Được khuyến nghị cho hầu hết các kịch bản sản xuất và đám mây.

### Bảng so sánh

Hãy xem bảng so sánh dưới đây để hiểu sự khác biệt giữa các cơ chế truyền tải này:

| Truyền tải       | Cập nhật thời gian thực | Phát trực tiếp | Khả năng mở rộng | Trường hợp sử dụng         |
|-------------------|------------------------|----------------|------------------|----------------------------|
| stdio             | Không                  | Không          | Thấp             | Công cụ CLI cục bộ          |
| SSE               | Có                     | Có             | Trung bình       | Web, cập nhật thời gian thực|
| HTTP Có thể phát trực tiếp | Có             | Có             | Cao              | Đám mây, nhiều khách hàng  |

> **Mẹo:** Lựa chọn cơ chế truyền tải phù hợp ảnh hưởng đến hiệu suất, khả năng mở rộng và trải nghiệm người dùng. **HTTP Có thể phát trực tiếp** được khuyến nghị cho các ứng dụng hiện đại, mở rộng và sẵn sàng cho đám mây.

Lưu ý các truyền tải stdio và SSE đã được giới thiệu trong các chương trước và HTTP có thể phát trực tiếp là truyền tải được đề cập trong chương này.

## Phát trực tiếp: Khái niệm và Động lực

Hiểu các khái niệm cơ bản và động lực đằng sau phát trực tiếp rất quan trọng để triển khai các hệ thống giao tiếp thời gian thực hiệu quả.

**Phát trực tiếp** là kỹ thuật trong lập trình mạng cho phép dữ liệu được gửi và nhận thành từng phần nhỏ, dễ quản lý hoặc như một chuỗi sự kiện, thay vì phải đợi toàn bộ phản hồi sẵn sàng. Điều này đặc biệt hữu ích cho:

- Các tập tin hoặc bộ dữ liệu lớn.
- Cập nhật thời gian thực (ví dụ: trò chuyện, thanh tiến triển).
- Tính toán kéo dài mà bạn muốn giữ cho người dùng được thông báo.

Dưới đây là những điều bạn cần biết về phát trực tiếp ở cấp độ cao:

- Dữ liệu được truyền dần, không phải một lần hết.
- Khách hàng có thể xử lý dữ liệu ngay khi nó đến.
- Giảm độ trễ cảm nhận và cải thiện trải nghiệm người dùng.

### Tại sao sử dụng phát trực tiếp?

Các lý do sử dụng phát trực tiếp bao gồm:

- Người dùng nhận được phản hồi ngay lập tức, không chỉ khi kết thúc
- Cho phép các ứng dụng thời gian thực và giao diện phản hồi
- Sử dụng tài nguyên mạng và tính toán hiệu quả hơn

### Ví dụ đơn giản: Máy chủ và Khách hàng phát trực tiếp HTTP

Đây là ví dụ đơn giản về cách phát trực tiếp có thể được triển khai:

#### Python

**Máy chủ (Python, sử dụng FastAPI và StreamingResponse):**

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

**Khách hàng (Python, sử dụng requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ví dụ này trình bày máy chủ gửi một chuỗi các tin nhắn tới khách hàng khi chúng sẵn sàng, thay vì đợi tất cả tin nhắn được chuẩn bị.

**Cách hoạt động:**

- Máy chủ phát từng tin nhắn khi nó sẵn sàng.
- Khách hàng nhận và in mỗi phần dữ liệu khi nó tới.

**Yêu cầu:**

- Máy chủ phải sử dụng phản hồi phát trực tiếp (ví dụ, `StreamingResponse` trong FastAPI).
- Khách hàng phải xử lý phản hồi dưới dạng luồng (`stream=True` trong requests).
- Content-Type thường là `text/event-stream` hoặc `application/octet-stream`.

#### Java

**Máy chủ (Java, sử dụng Spring Boot và Server-Sent Events):**

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

**Khách hàng (Java, sử dụng Spring WebFlux WebClient):**

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

**Ghi chú Triển khai Java:**

- Sử dụng reactive stack của Spring Boot với `Flux` cho phát trực tiếp
- `ServerSentEvent` cung cấp luồng sự kiện có cấu trúc với các loại sự kiện
- `WebClient` với `bodyToFlux()` cho phép tiêu thụ phát trực tiếp theo cách phản ứng
- `delayElements()` mô phỏng thời gian xử lý giữa các sự kiện
- Sự kiện có thể có loại (`info`, `result`) để khách hàng xử lý tốt hơn

### So sánh: Phát trực tiếp cổ điển vs Phát trực tiếp MCP

Sự khác biệt giữa cách phát trực tiếp làm việc theo cách "cổ điển" và cách nó hoạt động trong MCP có thể được mô tả như sau:

| Tính năng             | Phát trực tiếp HTTP cổ điển  | Phát trực tiếp MCP (Thông báo)  |
|-----------------------|------------------------------|---------------------------------|
| Phản hồi chính        | Theo từng phần               | Đơn lẻ, ở cuối                  |
| Cập nhật tiến trình    | Gửi dưới dạng các phần dữ liệu| Gửi dưới dạng thông báo          |
| Yêu cầu của khách hàng | Phải xử lý luồng             | Phải triển khai trình xử lý tin nhắn |
| Trường hợp sử dụng     | Tập tin lớn, luồng token AI  | Tiến triển, nhật ký, phản hồi thời gian thực |

### Những khác biệt chính được quan sát

Ngoài ra, dưới đây là một số khác biệt chính:

- **Mô hình Giao tiếp:**
  - Phát trực tiếp HTTP cổ điển: Sử dụng mã hóa truyền tải phân đoạn đơn giản để gửi dữ liệu theo từng phần
  - Phát trực tiếp MCP: Sử dụng hệ thống thông báo có cấu trúc với giao thức JSON-RPC

- **Định dạng Tin nhắn:**
  - HTTP cổ điển: Các phần văn bản thuần với các dấu xuống dòng
  - MCP: Các đối tượng LoggingMessageNotification có cấu trúc với siêu dữ liệu

- **Triển khai Khách hàng:**
  - HTTP cổ điển: Đơn giản, xử lý phản hồi phát trực tiếp
  - MCP: Phức tạp hơn, có trình xử lý tin nhắn để xử lý các loại tin nhắn khác nhau

- **Cập nhật Tiến trình:**
  - HTTP cổ điển: Tiến trình là một phần của luồng phản hồi chính
  - MCP: Tiến trình được gửi qua các tin nhắn thông báo riêng biệt trong khi phản hồi chính được gửi ở cuối

### Khuyến nghị

Có một số điều chúng tôi khuyên bạn khi chọn giữa việc triển khai phát trực tiếp cổ điển (như endpoint chúng tôi đã trình bày ở trên sử dụng `/stream`) so với phát trực tiếp qua MCP.

- **Cho nhu cầu phát trực tiếp đơn giản:** Phát trực tiếp HTTP cổ điển đơn giản hơn để triển khai và đủ cho các nhu cầu phát trực tiếp cơ bản.

- **Cho các ứng dụng phức tạp, tương tác:** Phát trực tiếp MCP cung cấp phương pháp có cấu trúc hơn với siêu dữ liệu phong phú hơn và phân tách giữa thông báo và kết quả cuối cùng.

- **Cho các ứng dụng AI:** Hệ thống thông báo của MCP đặc biệt hữu ích cho các tác vụ AI kéo dài mà bạn muốn giữ người dùng được thông báo về tiến trình.

## Phát trực tiếp trong MCP

Ok, bạn đã thấy một số khuyến nghị và so sánh đến nay về sự khác biệt giữa phát trực tiếp cổ điển và phát trực tiếp trong MCP. Hãy đi vào chi tiết chính xác cách bạn có thể tận dụng phát trực tiếp trong MCP.

Hiểu cách phát trực tiếp hoạt động trong khung MCP là rất quan trọng để xây dựng các ứng dụng phản hồi kịp thời cung cấp phản hồi trực tiếp cho người dùng trong các thao tác kéo dài.

Trong MCP, phát trực tiếp không phải là gửi phản hồi chính theo từng phần, mà là gửi **thông báo** đến khách hàng trong khi một công cụ đang xử lý yêu cầu. Những thông báo này có thể bao gồm cập nhật tiến trình, nhật ký hoặc các sự kiện khác.

### Cách thức hoạt động

Kết quả chính vẫn được gửi như một phản hồi đơn lẻ. Tuy nhiên, các thông báo có thể được gửi dưới dạng các tin nhắn riêng biệt trong quá trình xử lý và do đó cập nhật khách hàng theo thời gian thực. Khách hàng phải có khả năng xử lý và hiển thị các thông báo này.

## Thông báo là gì?

Chúng ta nói "Thông báo", điều đó nghĩa là gì trong ngữ cảnh MCP?

Thông báo là tin nhắn được gửi từ máy chủ đến khách hàng để thông báo về tiến độ, trạng thái hoặc các sự kiện khác trong quá trình thực hiện thao tác kéo dài. Thông báo cải thiện tính minh bạch và trải nghiệm người dùng.

Ví dụ, một khách hàng được giả định gửi thông báo ngay khi bắt tay ban đầu với máy chủ đã hoàn tất.

Một thông báo có dạng tin nhắn JSON như sau:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Thông báo thuộc về một chủ đề trong MCP gọi là ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Thông báo ngưng sử dụng:** Phiên bản thử nghiệm đặc tả MCP `2026-07-28` xác định thành phần Logging là lỗi thời, ưu tiên dùng `stderr` cho các truyền tải stdio và OpenTelemetry cho khả năng quan sát có cấu trúc. Logging vẫn tiếp tục hoạt động trong `2025-11-25` và ít nhất một năm sau bất kỳ thông báo ngưng sử dụng chính thức nào. Xem [Có gì thay đổi trong MCP: Phiên bản thử nghiệm phát hành 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Để logging hoạt động, máy chủ cần kích hoạt nó như một tính năng/khả năng như sau:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Tùy SDK sử dụng, logging có thể được bật mặc định hoặc bạn cần bật rõ trong cấu hình máy chủ.

Có các loại thông báo khác nhau:

| Mức độ     | Mô tả                         | Ví dụ ứng dụng                |
|-----------|-------------------------------|------------------------------|
| debug     | Thông tin gỡ rối chi tiết      | Điểm vào/ra hàm               |
| info      | Tin nhắn thông tin chung       | Cập nhật tiến trình thao tác  |
| notice    | Sự kiện bình thường nhưng quan trọng | Thay đổi cấu hình        |
| warning   | Điều kiện cảnh báo             | Sử dụng tính năng đã bị lỗi thời |
| error     | Điều kiện lỗi                  | Thao tác thất bại             |
| critical  | Điều kiện nghiêm trọng         | Lỗi thành phần hệ thống       |
| alert     | Cần hành động ngay lập tức     | Phát hiện hỏng dữ liệu        |
| emergency | Hệ thống không thể sử dụng     | Hỏng hệ thống hoàn toàn       |

## Triển khai Thông báo trong MCP

Để triển khai thông báo trong MCP, bạn cần thiết lập cả phía máy chủ và khách hàng để xử lý cập nhật thời gian thực. Điều này cho phép ứng dụng của bạn cung cấp phản hồi ngay lập tức cho người dùng trong thao tác kéo dài.

### Phía máy chủ: Gửi Thông báo

Hãy bắt đầu với phía máy chủ. Trong MCP, bạn định nghĩa các công cụ có thể gửi thông báo trong khi xử lý các yêu cầu. Máy chủ sử dụng đối tượng context (thường là `ctx`) để gửi tin nhắn đến khách hàng.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Trong ví dụ trên, công cụ `process_files` gửi ba thông báo đến khách hàng khi nó xử lý từng tập tin. Phương thức `ctx.info()` được dùng để gửi tin nhắn thông tin.

Thêm vào đó, để kích hoạt thông báo, đảm bảo máy chủ của bạn sử dụng truyền tải phát trực tiếp (như `streamable-http`) và khách hàng triển khai trình xử lý tin nhắn để xử lý các thông báo. Dưới đây là cách bạn có thể thiết lập máy chủ sử dụng truyền tải `streamable-http`:

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

Trong ví dụ .NET này, công cụ `ProcessFiles` được trang trí bằng thuộc tính `Tool` và gửi ba thông báo đến khách hàng khi nó xử lý mỗi tập tin. Phương thức `ctx.Info()` được dùng để gửi tin nhắn thông tin.

Để bật thông báo trong máy chủ MCP .NET của bạn, đảm bảo bạn đang sử dụng truyền tải phát trực tiếp:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Phía khách hàng: Nhận Thông báo

Khách hàng phải triển khai trình xử lý tin nhắn để xử lý và hiển thị các thông báo khi chúng đến.

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

Trong đoạn mã trên, hàm `message_handler` kiểm tra xem tin nhắn nhận được có phải là thông báo hay không. Nếu đúng, nó in thông báo; nếu không, nó xử lý như là tin nhắn máy chủ bình thường. Cũng lưu ý cách `ClientSession` được khởi tạo với `message_handler` để xử lý thông báo đến.

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

Trong ví dụ .NET này, hàm `MessageHandler` kiểm tra xem tin nhắn đến có phải là thông báo hay không. Nếu đúng, nó in ra thông báo; nếu không, nó xử lý như là tin nhắn máy chủ bình thường. `ClientSession` được khởi tạo với trình xử lý tin nhắn qua `ClientSessionOptions`.

Để bật thông báo, đảm bảo máy chủ của bạn sử dụng truyền tải phát trực tiếp (như `streamable-http`) và khách hàng của bạn triển khai trình xử lý tin nhắn để xử lý thông báo.

## Thông báo Tiến trình & Các Kịch bản

Phần này giải thích khái niệm về thông báo tiến trình trong MCP, lý do quan trọng của chúng, và cách triển khai chúng bằng HTTP Có thể phát trực tiếp. Bạn cũng sẽ tìm thấy một bài tập thực hành để củng cố hiểu biết.

Thông báo tiến trình là các tin nhắn thời gian thực được gửi từ máy chủ đến khách hàng trong khi thao tác kéo dài đang diễn ra. Thay vì đợi toàn bộ quá trình hoàn thành, máy chủ liên tục cập nhật cho khách hàng biết trạng thái hiện tại. Điều này nâng cao tính minh bạch, trải nghiệm người dùng, và giúp việc gỡ lỗi dễ dàng hơn.

**Ví dụ:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Tại sao sử dụng Thông báo Tiến trình?

Thông báo tiến trình quan trọng vì một số lý do:

- **Trải nghiệm người dùng tốt hơn:** Người dùng thấy cập nhật khi công việc tiến triển, không chỉ khi kết thúc.
- **Phản hồi thời gian thực:** Khách hàng có thể hiển thị thanh tiến trình hoặc nhật ký, làm ứng dụng cảm giác phản hồi nhanh.
- **Dễ dàng gỡ lỗi và giám sát:** Nhà phát triển và người dùng có thể thấy quá trình nào có thể chậm hoặc bị tắc.

### Cách triển khai Thông báo Tiến trình

Dưới đây là cách bạn có thể triển khai thông báo tiến trình trong MCP:

- **Phía máy chủ:** Sử dụng `ctx.info()` hoặc `ctx.log()` để gửi thông báo khi mỗi mục được xử lý. Điều này gửi tin nhắn cho khách hàng trước khi kết quả chính sẵn sàng.
- **Phía khách hàng:** Triển khai trình xử lý tin nhắn lắng nghe và hiển thị các thông báo khi chúng đến. Trình xử lý này phân biệt giữa thông báo và kết quả cuối cùng.

**Ví dụ phía máy chủ:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Ví dụ Khách hàng:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Các Cân nhắc về Bảo mật

Khi triển khai các máy chủ MCP với giao thức dựa trên HTTP, bảo mật trở thành mối quan tâm hàng đầu cần chú ý kỹ lưỡng đến nhiều vector tấn công và cơ chế bảo vệ.

### Tổng quan

Bảo mật là điều rất quan trọng khi mở máy chủ MCP qua HTTP. HTTP có thể truyền phát (streamable) giới thiệu các bề mặt tấn công mới và yêu cầu cấu hình cẩn thận.

### Các điểm chính

- **Xác thực header Origin**: Luôn xác thực header `Origin` để ngăn chặn các cuộc tấn công DNS rebinding.
- **Ràng buộc Localhost**: Đối với phát triển cục bộ, ràng buộc máy chủ với `localhost` để tránh phơi bày ra internet công cộng.
- **Xác thực**: Triển khai xác thực (ví dụ: khóa API, OAuth) cho các triển khai sản xuất.
- **CORS**: Cấu hình chính sách Chia sẻ Tài nguyên Nguồn gốc chéo (CORS) để giới hạn truy cập.
- **HTTPS**: Sử dụng HTTPS trong môi trường sản xuất để mã hóa lưu lượng.

### Thực hành tốt nhất

- Không bao giờ tin tưởng các yêu cầu đến mà không qua xác thực.
- Ghi nhật ký và giám sát tất cả các truy cập và lỗi.
- Thường xuyên cập nhật các phụ thuộc để vá các lỗ hổng bảo mật.

### Thách thức

- Cân bằng bảo mật với sự thuận tiện trong phát triển
- Đảm bảo tương thích với nhiều môi trường khách hàng khác nhau

## Nâng cấp từ SSE sang Streamable HTTP

Đối với các ứng dụng hiện đang sử dụng Server-Sent Events (SSE), di chuyển sang Streamable HTTP cung cấp khả năng nâng cao và sự bền vững lâu dài tốt hơn cho các triển khai MCP của bạn.

### Tại sao nên nâng cấp?

Có hai lý do thuyết phục để nâng cấp từ SSE sang Streamable HTTP:

- Streamable HTTP cung cấp khả năng mở rộng, tương thích và hỗ trợ thông báo phong phú hơn so với SSE.
- Đây là giao thức được khuyến nghị cho các ứng dụng MCP mới.

### Các bước di chuyển

Dưới đây là cách bạn có thể di chuyển từ SSE sang Streamable HTTP trong các ứng dụng MCP của bạn:

- **Cập nhật mã máy chủ** để sử dụng `transport="streamable-http"` trong `mcp.run()`.
- **Cập nhật mã khách hàng** để sử dụng `streamablehttp_client` thay vì client SSE.
- **Triển khai bộ xử lý tin nhắn** trong client để xử lý các thông báo.
- **Kiểm tra tính tương thích** với các công cụ và quy trình hiện có.

### Duy trì tương thích

Khuyến nghị duy trì tương thích với các client SSE hiện tại trong quá trình di chuyển. Dưới đây là một số chiến lược:

- Bạn có thể hỗ trợ cả SSE và Streamable HTTP bằng cách chạy cả hai giao thức trên các điểm cuối khác nhau.
- Di chuyển các client sang giao thức mới dần dần.

### Thách thức

Đảm bảo bạn giải quyết các thách thức sau trong quá trình di chuyển:

- Đảm bảo tất cả client đều được cập nhật
- Xử lý sự khác biệt trong giao nhận thông báo

## Các Cân nhắc về Bảo mật

Bảo mật nên là ưu tiên hàng đầu khi triển khai bất kỳ máy chủ nào, đặc biệt khi sử dụng giao thức dựa trên HTTP như Streamable HTTP trong MCP. 

Khi triển khai các máy chủ MCP với giao thức dựa trên HTTP, bảo mật trở thành mối quan tâm hàng đầu cần chú ý kỹ lưỡng đến nhiều vector tấn công và cơ chế bảo vệ.

### Tổng quan

Bảo mật là điều rất quan trọng khi mở máy chủ MCP qua HTTP. HTTP có thể truyền phát (streamable) giới thiệu các bề mặt tấn công mới và yêu cầu cấu hình cẩn thận.

Dưới đây là một số cân nhắc bảo mật chính:

- **Xác thực header Origin**: Luôn xác thực header `Origin` để ngăn chặn các cuộc tấn công DNS rebinding.
- **Ràng buộc Localhost**: Đối với phát triển cục bộ, ràng buộc máy chủ với `localhost` để tránh phơi bày ra internet công cộng.
- **Xác thực**: Triển khai xác thực (ví dụ: khóa API, OAuth) cho các triển khai sản xuất.
- **CORS**: Cấu hình chính sách Chia sẻ Tài nguyên Nguồn gốc chéo (CORS) để giới hạn truy cập.
- **HTTPS**: Sử dụng HTTPS trong môi trường sản xuất để mã hóa lưu lượng.

### Thực hành tốt nhất

Thêm vào đó, đây là một số thực hành tốt nhất khi triển khai bảo mật trong máy chủ streaming MCP của bạn:

- Không bao giờ tin tưởng các yêu cầu đến mà không qua xác thực.
- Ghi nhật ký và giám sát tất cả các truy cập và lỗi.
- Thường xuyên cập nhật các phụ thuộc để vá các lỗ hổng bảo mật.

### Thách thức

Bạn sẽ gặp một số thách thức khi triển khai bảo mật trong các máy chủ streaming MCP:

- Cân bằng bảo mật với sự thuận tiện trong phát triển
- Đảm bảo tương thích với nhiều môi trường khách hàng khác nhau

### Bài tập: Xây dựng Ứng dụng MCP Streaming của riêng bạn

**Tình huống:**
Xây dựng một máy chủ và client MCP, trong đó máy chủ xử lý một danh sách các mục (ví dụ: tệp hay tài liệu) và gửi thông báo cho mỗi mục được xử lý. Client sẽ hiển thị từng thông báo khi nó đến.

**Các bước:**

1. Triển khai một công cụ máy chủ xử lý một danh sách và gửi các thông báo cho từng mục.
2. Triển khai client với bộ xử lý tin nhắn để hiển thị thông báo thời gian thực.
3. Kiểm tra triển khai bằng cách chạy cả máy chủ và client, và quan sát các thông báo.

[Giải pháp](./solution/README.md)

## Đọc thêm & Tiếp theo là gì?

Để tiếp tục hành trình với streaming MCP và mở rộng kiến thức, phần này cung cấp các tài nguyên bổ sung và các bước đề xuất tiếp theo để xây dựng các ứng dụng nâng cao hơn.

### Đọc thêm

- [Microsoft: Giới thiệu về HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS trong ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Tiếp theo là gì?

- Thử xây dựng các công cụ MCP nâng cao hơn sử dụng streaming cho phân tích thời gian thực, chat hoặc chỉnh sửa cộng tác.
- Khám phá tích hợp MCP streaming với các framework frontend (React, Vue, v.v.) để cập nhật giao diện người dùng trực tiếp.
- Tiếp theo: [Sử dụng Bộ công cụ AI cho VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->