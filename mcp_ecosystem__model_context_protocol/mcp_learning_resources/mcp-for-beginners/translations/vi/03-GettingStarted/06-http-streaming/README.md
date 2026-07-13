# HTTPS Streaming với Model Context Protocol (MCP)

Chương này cung cấp hướng dẫn toàn diện về cách triển khai streaming an toàn, có thể mở rộng và theo thời gian thực với Model Context Protocol (MCP) sử dụng HTTPS. Nó bao gồm động lực cho streaming, các cơ chế truyền tải có sẵn, cách triển khai HTTP có thể streaming trong MCP, các thực tiễn bảo mật tốt nhất, di chuyển từ SSE và hướng dẫn thực hành để xây dựng các ứng dụng streaming MCP của riêng bạn.

> **Nhìn trước:** bài học này mô tả Streamable HTTP theo **Đặc tả MCP 2025-11-25**, trong đó một phiên làm việc được thiết lập trong quá trình `initialize` và gắn với header `Mcp-Session-Id`. Phiên bản thử nghiệm `2026-07-28` loại bỏ hoàn toàn handshake và ID phiên, khiến mọi yêu cầu đều tự chứa và có thể định tuyến tới bất kỳ phiên bản máy chủ nào mà không cần phiên dính. Xem [Có gì thay đổi trong MCP: Phiên bản thử nghiệm 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) để biết chi tiết.

## Cơ chế Truyền tải và Streaming trong MCP

Phần này khám phá các cơ chế truyền tải khác nhau có trong MCP và vai trò của chúng trong việc cung cấp khả năng streaming cho giao tiếp theo thời gian thực giữa client và server.

### Cơ chế Truyền tải là gì?

Cơ chế truyền tải định nghĩa cách dữ liệu được trao đổi giữa client và server. MCP hỗ trợ nhiều loại truyền tải để phù hợp với các môi trường và yêu cầu khác nhau:

- **stdio**: đầu vào/ra chuẩn, phù hợp cho các công cụ cục bộ và dựa trên CLI. Đơn giản nhưng không phù hợp với web hoặc cloud.
- **SSE (Server-Sent Events)**: cho phép server đẩy các cập nhật thời gian thực tới client qua HTTP. Tốt cho giao diện web, nhưng hạn chế về khả năng mở rộng và linh hoạt. Theo Đặc tả MCP 2025-06-18, truyền tải SSE độc lập đã bị loại bỏ và thay thế bằng truyền tải "Streamable HTTP".
- **Streamable HTTP**: truyền tải streaming dựa trên HTTP hiện đại, hỗ trợ thông báo và mở rộng tốt hơn. Được khuyến nghị cho hầu hết các kịch bản sản xuất và đám mây.

### Bảng So sánh

Xem bảng so sánh dưới đây để hiểu sự khác biệt giữa các cơ chế truyền tải này:

| Truyền tải       | Cập nhật thời gian thực | Streaming | Khả năng mở rộng | Trường hợp sử dụng         |
|------------------|------------------------|-----------|------------------|---------------------------|
| stdio            | Không                  | Không     | Thấp             | Công cụ CLI cục bộ        |
| SSE              | Có                     | Có        | Trung bình       | Web, cập nhật thời gian thực |
| Streamable HTTP  | Có                     | Có        | Cao              | Cloud, đa client          |

> **Mẹo:** Lựa chọn cơ chế truyền tải phù hợp ảnh hưởng đến hiệu suất, khả năng mở rộng và trải nghiệm người dùng. **Streamable HTTP** được khuyến nghị cho các ứng dụng hiện đại, có thể mở rộng và sẵn sàng cho cloud.

Lưu ý các truyền tải stdio và SSE mà bạn đã được giới thiệu trong các chương trước và cách Streamable HTTP là cơ chế truyền tải được đề cập trong chương này.

## Streaming: Khái niệm và Động lực

Hiểu các khái niệm cơ bản và động lực đằng sau streaming rất cần thiết để triển khai các hệ thống giao tiếp theo thời gian thực hiệu quả.

**Streaming** là kỹ thuật trong lập trình mạng cho phép gửi và nhận dữ liệu thành các phần nhỏ, có thể xử lý được hoặc như một chuỗi các sự kiện, thay vì chờ đợi một phản hồi hoàn chỉnh. Điều này đặc biệt hữu ích cho:

- Các tập tin hoặc bộ dữ liệu lớn.
- Cập nhật thời gian thực (ví dụ: chat, thanh tiến trình).
- Các tính toán chạy dài mà bạn muốn giữ người dùng được thông báo.

Đây là những điều bạn cần biết về streaming ở mức độ tổng quát:

- Dữ liệu được truyền dần dần, không phải tất cả cùng lúc.
- Client có thể xử lý dữ liệu khi nó đến.
- Giảm độ trễ cảm nhận và cải thiện trải nghiệm người dùng.

### Tại sao dùng streaming?

Những lý do sử dụng streaming như sau:

- Người dùng nhận phản hồi ngay lập tức, không chỉ cuối cùng
- Hỗ trợ ứng dụng thời gian thực và giao diện người dùng phản hồi tốt
- Sử dụng hiệu quả hơn tài nguyên mạng và tính toán

### Ví dụ đơn giản: Server & Client HTTP Streaming

Dưới đây là ví dụ đơn giản về cách triển khai streaming:

#### Python

**Server (Python, dùng FastAPI và StreamingResponse):**

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

**Client (Python, dùng requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ví dụ này minh họa một server gửi một chuỗi các thông điệp tới client khi chúng sẵn sàng, thay vì chờ tất cả các thông điệp hoàn chỉnh.

**Cách hoạt động:**

- Server khai báo từng thông điệp khi nó sẵn sàng.
- Client nhận và in từng phần khi nó đến.

**Yêu cầu:**

- Server phải sử dụng phản hồi streaming (ví dụ `StreamingResponse` trong FastAPI).
- Client phải xử lý phản hồi dưới dạng stream (`stream=True` trong requests).
- Content-Type thường là `text/event-stream` hoặc `application/octet-stream`.

#### Java

**Server (Java, dùng Spring Boot và Server-Sent Events):**

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

**Client (Java, dùng Spring WebFlux WebClient):**

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

**Ghi chú triển khai Java:**

- Dùng reactive stack của Spring Boot với `Flux` cho streaming
- `ServerSentEvent` cung cấp streaming sự kiện có cấu trúc với các loại sự kiện
- `WebClient` với `bodyToFlux()` cho phép tiêu thụ streaming reactive
- `delayElements()` mô phỏng thời gian xử lý giữa các sự kiện
- Các sự kiện có thể có loại (`info`, `result`) để client xử lý tốt hơn

### So sánh: Streaming Cổ điển vs Streaming MCP

Sự khác biệt giữa cách streaming làm việc theo cách "cổ điển" so với cách hoạt động trong MCP có thể được mô tả như sau:

| Tính năng            | Streaming HTTP Cổ điển         | Streaming MCP (Thông báo)           |
|----------------------|-------------------------------|-----------------------------------|
| Phản hồi chính       | Chia nhỏ                      | Đơn lẻ, ở cuối                    |
| Cập nhật tiến trình  | Gửi dưới dạng các phần dữ liệu | Gửi như các thông báo             |
| Yêu cầu client       | Phải xử lý stream             | Phải triển khai bộ xử lý tin nhắn |
| Trường hợp sử dụng   | File lớn, dòng token AI       | Tiến trình, nhật ký, phản hồi thời gian thực |

### Các điểm khác biệt chính

Thêm vào đó, đây là một số khác biệt chính:

- **Mô hình giao tiếp:**
  - Streaming HTTP cổ điển: Dùng mã hóa truyền chunk đơn giản để gửi dữ liệu từng phần
  - Streaming MCP: Dùng hệ thống thông báo có cấu trúc với giao thức JSON-RPC

- **Định dạng tin nhắn:**
  - HTTP cổ điển: Các đoạn văn bản thô với dòng mới
  - MCP: Các đối tượng LoggingMessageNotification có cấu trúc với metadata

- **Triển khai client:**
  - HTTP cổ điển: Client đơn giản xử lý phản hồi streaming
  - MCP: Client tinh vi hơn có bộ xử lý tin nhắn để xử lý các loại tin khác nhau

- **Cập nhật tiến trình:**
  - HTTP cổ điển: Tiến trình là một phần của luồng phản hồi chính
  - MCP: Tiến trình được gửi qua các tin nhắn thông báo riêng biệt trong khi phản hồi chính đến cuối cùng

### Khuyến nghị

Có một số điều chúng tôi khuyên khi lựa chọn giữa triển khai streaming kiểu cổ điển (như endpoint `/stream` đã trình bày ở trên) và streaming qua MCP.

- **Cho nhu cầu streaming đơn giản:** Streaming HTTP cổ điển dễ triển khai và đủ cho các nhu cầu streaming cơ bản.

- **Cho ứng dụng phức tạp, tương tác:** Streaming MCP cung cấp cách tiếp cận có cấu trúc hơn với metadata phong phú hơn và tách biệt giữa thông báo và kết quả cuối cùng.

- **Cho ứng dụng AI:** Hệ thống thông báo của MCP rất hữu ích cho các tác vụ AI dài hạn mà bạn muốn thông báo tiến trình cho người dùng.

## Streaming trong MCP

Ok, bạn đã thấy một số khuyến nghị và so sánh về sự khác biệt giữa streaming cổ điển và streaming trong MCP. Hãy đi sâu vào chi tiết cách bạn có thể tận dụng streaming trong MCP.

Hiểu cách streaming hoạt động trong khuôn khổ MCP rất cần thiết để xây dựng các ứng dụng phản hồi mà cung cấp phản hồi theo thời gian thực cho người dùng trong các tác vụ thời gian chạy dài.

Trong MCP, streaming không phải là gửi phản hồi chính theo các phần, mà là gửi **thông báo** tới client trong khi công cụ đang xử lý yêu cầu. Các thông báo này có thể bao gồm cập nhật tiến trình, nhật ký hoặc các sự kiện khác.

### Cách hoạt động

Kết quả chính vẫn được gửi như một phản hồi đơn lẻ. Tuy nhiên, các thông báo có thể được gửi như các tin nhắn riêng biệt trong khi xử lý và do đó cập nhật client theo thời gian thực. Client phải có khả năng xử lý và hiển thị các thông báo này.

## Thông báo là gì?

Chúng ta đã nói "Thông báo", vậy nó nghĩa là gì trong ngữ cảnh MCP?

Thông báo là một tin nhắn được gửi từ server đến client để thông báo về tiến trình, trạng thái hoặc các sự kiện khác trong một hoạt động chạy dài. Thông báo cải thiện tính minh bạch và trải nghiệm người dùng.

Ví dụ, một client được mong đợi sẽ gửi một thông báo khi quá trình bắt tay ban đầu với server đã hoàn thành.

Một thông báo trông như sau dưới dạng tin nhắn JSON:

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

Để ghi nhật ký hoạt động, server cần bật tính năng này như một đặc tính/năng lực như sau:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Tùy thuộc vào SDK sử dụng, ghi nhật ký có thể được bật mặc định hoặc bạn có thể cần bật rõ ràng trong cấu hình server.

Có nhiều loại thông báo khác nhau:

| Mức độ     | Mô tả                         | Ví dụ Trường hợp Sử dụng         |
|------------|-------------------------------|---------------------------------|
| debug      | Thông tin gỡ lỗi chi tiết      | Điểm vào/ra hàm                  |
| info       | Thông tin tổng quát            | Cập nhật tiến trình hoạt động    |
| notice     | Sự kiện bình thường nhưng quan trọng | Thay đổi cấu hình             |
| warning    | Điều kiện cảnh báo             | Sử dụng tính năng đã lỗi thời    |
| error      | Lỗi xảy ra                    | Thất bại hoạt động               |
| critical   | Điều kiện nghiêm trọng         | Hỏng hóc thành phần hệ thống     |
| alert      | Phải hành động ngay lập tức    | Phát hiện dữ liệu bị hỏng        |
| emergency  | Hệ thống không thể sử dụng     | Hư hỏng hệ thống hoàn toàn       |

## Triển khai Thông báo trong MCP

Để triển khai thông báo trong MCP, bạn cần thiết lập cả phía server và client để xử lý cập nhật thời gian thực. Điều này cho phép ứng dụng cung cấp phản hồi ngay lập tức cho người dùng trong các tác vụ chạy dài.

### Phía server: Gửi Thông báo

Bắt đầu với phía server. Trong MCP, bạn định nghĩa các công cụ có thể gửi thông báo trong khi xử lý yêu cầu. Server sử dụng đối tượng context (thường gọi là `ctx`) để gửi tin nhắn tới client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Trong ví dụ trước, công cụ `process_files` gửi ba thông báo đến client khi xử lý mỗi tập tin. Phương thức `ctx.info()` được dùng để gửi các thông điệp thông tin.

Ngoài ra, để bật thông báo, đảm bảo server của bạn dùng truyền tải streaming (như `streamable-http`) và client triển khai bộ xử lý tin nhắn để xử lý thông báo. Đây là cách bạn có thể cấu hình server dùng truyền tải `streamable-http`:

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

Trong ví dụ .NET này, công cụ `ProcessFiles` được trang trí với thuộc tính `Tool` và gửi ba thông báo tới client khi xử lý mỗi tập tin. Phương thức `ctx.Info()` được dùng để gửi các tin nhắn thông tin.

Để bật thông báo trong server MCP .NET của bạn, đảm bảo sử dụng truyền tải streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Phía client: Nhận Thông báo

Client cần triển khai bộ xử lý tin nhắn để xử lý và hiển thị các thông báo khi chúng đến.

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

Trong mã trên, hàm `message_handler` kiểm tra xem tin nhắn đến có phải là thông báo hay không. Nếu đúng, nó in thông báo; nếu không, nó xử lý như tin nhắn server bình thường. Cũng lưu ý cách `ClientSession` được khởi tạo với `message_handler` để xử lý thông báo đến.

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

Trong ví dụ .NET này, hàm `MessageHandler` kiểm tra xem tin nhắn đến có phải là thông báo không. Nếu đúng, nó in thông báo; nếu không thì xử lý như tin nhắn server bình thường. `ClientSession` được khởi tạo với bộ xử lý tin nhắn qua `ClientSessionOptions`.

Để bật thông báo, hãy đảm bảo server của bạn sử dụng truyền tải streaming (như `streamable-http`) và client của bạn triển khai bộ xử lý tin nhắn để xử lý thông báo.

## Thông báo Tiến trình & Các kịch bản

Phần này giải thích khái niệm thông báo tiến trình trong MCP, lý do quan trọng của nó và cách triển khai sử dụng Streamable HTTP. Bạn cũng sẽ tìm thấy bài tập thực hành để củng cố hiểu biết.

Thông báo tiến trình là các tin nhắn thời gian thực gửi từ server tới client trong suốt quá trình chạy dài. Thay vì chờ đợi toàn bộ quá trình hoàn thành, server liên tục cập nhật trạng thái hiện tại cho client. Điều này cải thiện tính minh bạch, trải nghiệm người dùng và giúp dễ dàng gỡ lỗi hơn.

**Ví dụ:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Tại sao dùng Thông báo Tiến trình?

Thông báo tiến trình quan trọng vì nhiều lý do:

- **Trải nghiệm người dùng tốt hơn:** Người dùng thấy cập nhật ngay khi công việc tiến triển, không chỉ khi kết thúc.
- **Phản hồi theo thời gian thực:** Client có thể hiển thị thanh tiến trình hoặc nhật ký, khiến ứng dụng cảm giác phản hồi.
- **Dễ dàng gỡ lỗi và giám sát:** Nhà phát triển và người dùng có thể thấy quá trình bị chậm hoặc tắc chỗ nào.

### Cách Triển khai Thông báo Tiến trình

Dưới đây là cách bạn có thể triển khai thông báo tiến trình trong MCP:

- **Trên server:** Dùng `ctx.info()` hoặc `ctx.log()` để gửi các thông báo khi mỗi mục được xử lý. Điều này gửi tin nhắn cho client trước khi kết quả chính sẵn sàng.
- **Trên client:** Triển khai bộ xử lý tin nhắn lắng nghe và hiển thị các thông báo khi chúng đến. Bộ xử lý này phân biệt giữa thông báo và kết quả cuối cùng.

**Ví dụ Server:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Ví dụ Client:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Các lưu ý về Bảo mật

Khi triển khai các server MCP với truyền tải dựa trên HTTP, bảo mật trở thành mối quan tâm hàng đầu đòi hỏi chú ý cẩn thận tới nhiều hướng tấn công và cơ chế bảo vệ.

### Tổng quan

Bảo mật rất quan trọng khi cung cấp các server MCP qua HTTP. Streamable HTTP tạo thêm các bề mặt tấn công mới và cần cấu hình cẩn thận.

### Những điểm chính
- **Xác thực Header Origin**: Luôn xác thực header `Origin` để ngăn chặn các cuộc tấn công DNS rebinding.
- **Ràng buộc Localhost**: Đối với phát triển cục bộ, ràng buộc máy chủ với `localhost` để tránh việc chúng bị mở ra internet công cộng.
- **Xác thực**: Triển khai xác thực (ví dụ, khóa API, OAuth) cho các triển khai sản xuất.
- **CORS**: Cấu hình chính sách Chia sẻ Tài nguyên Nguồn gốc chéo (CORS) để hạn chế truy cập.
- **HTTPS**: Sử dụng HTTPS trong môi trường sản xuất để mã hóa lưu lượng.

### Thực hành tốt nhất

- Không bao giờ tin tưởng các yêu cầu đến mà không xác thực.
- Ghi lại và giám sát tất cả các truy cập và lỗi.
- Cập nhật các thư viện phụ thuộc thường xuyên để vá các lỗ hổng bảo mật.

### Thách thức

- Cân bằng giữa bảo mật và sự tiện lợi của việc phát triển
- Đảm bảo tính tương thích với các môi trường khách hàng khác nhau

## Nâng cấp từ SSE lên Streamable HTTP

Đối với các ứng dụng hiện đang sử dụng Server-Sent Events (SSE), việc chuyển sang Streamable HTTP mang lại khả năng nâng cao và sự bền vững lâu dài hơn cho các triển khai MCP của bạn.

### Tại sao nên nâng cấp?

Có hai lý do quan trọng để nâng cấp từ SSE sang Streamable HTTP:

- Streamable HTTP cung cấp khả năng mở rộng, tính tương thích, và hỗ trợ thông báo phong phú hơn SSE.
- Đây là phương thức truyền tải được khuyến nghị cho các ứng dụng MCP mới.

### Các bước di chuyển

Dưới đây là cách bạn có thể di chuyển từ SSE sang Streamable HTTP trong các ứng dụng MCP của mình:

- **Cập nhật mã máy chủ** để sử dụng `transport="streamable-http"` trong `mcp.run()`.
- **Cập nhật mã khách hàng** để sử dụng `streamablehttp_client` thay vì client SSE.
- **Triển khai một trình xử lý tin nhắn** trong client để xử lý các thông báo.
- **Kiểm tra tính tương thích** với các công cụ và quy trình hiện có.

### Duy trì tính tương thích

Nên duy trì tính tương thích với các client SSE hiện có trong quá trình di chuyển. Dưới đây là một số chiến lược:

- Bạn có thể hỗ trợ cả SSE và Streamable HTTP bằng cách chạy cả hai tại các điểm cuối khác nhau.
- Dần dần di chuyển các client sang phương thức truyền tải mới.

### Thách thức

Hãy đảm bảo bạn giải quyết các thách thức sau trong quá trình di chuyển:

- Đảm bảo tất cả các client được cập nhật
- Xử lý các khác biệt trong việc gửi thông báo

## Các lưu ý về bảo mật

Bảo mật nên là ưu tiên hàng đầu khi triển khai bất kỳ máy chủ nào, đặc biệt khi sử dụng các phương thức truyền tải dựa trên HTTP như Streamable HTTP trong MCP.

Khi triển khai các máy chủ MCP với các phương thức truyền tải dựa trên HTTP, bảo mật trở thành một mối quan tâm hàng đầu đòi hỏi sự chú ý cẩn thận đến nhiều vectơ tấn công và cơ chế bảo vệ.

### Tổng quan

Bảo mật rất quan trọng khi mở MCP server qua HTTP. Streamable HTTP tạo ra các bề mặt tấn công mới và yêu cầu cấu hình cẩn thận.

Dưới đây là một số lưu ý quan trọng về bảo mật:

- **Xác thực Header Origin**: Luôn xác thực header `Origin` để ngăn chặn các cuộc tấn công DNS rebinding.
- **Ràng buộc Localhost**: Đối với phát triển cục bộ, ràng buộc máy chủ với `localhost` để tránh việc chúng bị mở ra internet công cộng.
- **Xác thực**: Triển khai xác thực (ví dụ, khóa API, OAuth) cho các triển khai sản xuất.
- **CORS**: Cấu hình chính sách Chia sẻ Tài nguyên Nguồn gốc chéo (CORS) để hạn chế truy cập.
- **HTTPS**: Sử dụng HTTPS trong môi trường sản xuất để mã hóa lưu lượng.

### Thực hành tốt nhất

Ngoài ra, đây là một số thực hành tốt nhất bạn nên theo khi triển khai bảo mật trên máy chủ truyền phát MCP:

- Không bao giờ tin tưởng các yêu cầu đến mà không xác thực.
- Ghi lại và giám sát tất cả các truy cập và lỗi.
- Cập nhật các thư viện phụ thuộc thường xuyên để vá các lỗ hổng bảo mật.

### Thách thức

Bạn sẽ gặp một số thách thức khi triển khai bảo mật trên các máy chủ truyền phát MCP:

- Cân bằng giữa bảo mật và sự tiện lợi của việc phát triển
- Đảm bảo tính tương thích với nhiều môi trường khách hàng khác nhau

### Bài tập: Xây dựng ứng dụng MCP truyền phát của riêng bạn

**Kịch bản:**
Xây dựng một máy chủ MCP và client nơi máy chủ xử lý một danh sách các mục (ví dụ: tập tin hoặc tài liệu) và gửi một thông báo cho mỗi mục được xử lý. Client sẽ hiển thị từng thông báo ngay khi nó đến.

**Các bước:**

1. Triển khai một công cụ máy chủ xử lý danh sách và gửi thông báo cho từng mục.
2. Triển khai một client với trình xử lý tin nhắn để hiển thị thông báo theo thời gian thực.
3. Kiểm tra triển khai của bạn bằng cách chạy cả server và client, rồi quan sát các thông báo.

[Giải pháp](./solution/README.md)

## Đọc thêm & bước tiếp theo?

Để tiếp tục hành trình MCP streaming và mở rộng kiến thức, phần này cung cấp các tài nguyên bổ sung và đề xuất các bước tiếp theo để xây dựng các ứng dụng nâng cao hơn.

### Đọc thêm

- [Microsoft: Giới thiệu về HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS trong ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Bước tiếp theo?

- Thử xây dựng các công cụ MCP nâng cao hơn sử dụng streaming cho phân tích thời gian thực, chat, hoặc chỉnh sửa cộng tác.
- Khám phá tích hợp MCP streaming với các framework frontend (React, Vue, v.v.) để cập nhật giao diện người dùng trực tiếp.
- Tiếp theo: [Sử dụng Bộ công cụ AI cho VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->