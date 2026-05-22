# HTTPS Streaming với Giao thức Ngữ cảnh Mô hình (MCP)

Chương này cung cấp hướng dẫn toàn diện để triển khai streaming an toàn, có thể mở rộng và thời gian thực với Giao thức Ngữ cảnh Mô hình (MCP) sử dụng HTTPS. Nó bao gồm động lực cho streaming, các cơ chế truyền tải có sẵn, cách triển khai HTTP có thể stream trong MCP, các thực hành bảo mật tốt nhất, di chuyển từ SSE và hướng dẫn thực tế để xây dựng ứng dụng MCP streaming của riêng bạn.

## Cơ chế Truyền tải và Streaming trong MCP

Phần này tìm hiểu các cơ chế truyền tải khác nhau có trong MCP và vai trò của chúng trong việc cho phép khả năng streaming để giao tiếp thời gian thực giữa client và server.

### Cơ chế Truyền tải là gì?

Cơ chế truyền tải xác định cách dữ liệu được trao đổi giữa client và server. MCP hỗ trợ nhiều loại truyền tải để phù hợp với các môi trường và yêu cầu khác nhau:

- **stdio**: Đầu vào/đầu ra tiêu chuẩn, phù hợp cho công cụ cục bộ và dựa trên CLI. Đơn giản nhưng không phù hợp cho web hoặc đám mây.
- **SSE (Server-Sent Events)**: Cho phép server đẩy cập nhật thời gian thực đến client qua HTTP. Tốt cho giao diện web, nhưng giới hạn về khả năng mở rộng và linh hoạt. Từ MCP Specification 2025-06-18, truyền tải SSE độc lập đã bị ngưng và thay thế bằng truyền tải "Streamable HTTP".
- **Streamable HTTP**: Truyền tải streaming hiện đại dựa trên HTTP, hỗ trợ thông báo và khả năng mở rộng tốt hơn. Khuyến nghị cho hầu hết các tình huống sản xuất và đám mây.

### Bảng So sánh

Hãy xem bảng so sánh dưới đây để hiểu sự khác biệt giữa các cơ chế truyền tải này:

| Transport         | Cập nhật thời gian thực | Streaming | Khả năng mở rộng | Trường hợp sử dụng      |
|-------------------|------------------------|-----------|------------------|------------------------|
| stdio             | Không                  | Không     | Thấp             | Công cụ CLI cục bộ      |
| SSE               | Có                     | Có        | Trung bình       | Web, cập nhật thời gian thực |
| Streamable HTTP   | Có                     | Có        | Cao              | Đám mây, đa client     |

> **Mẹo:** Việc chọn cơ chế truyền tải phù hợp ảnh hưởng đến hiệu năng, khả năng mở rộng và trải nghiệm người dùng. **Streamable HTTP** được khuyến nghị cho các ứng dụng hiện đại, có khả năng mở rộng và sẵn sàng cho đám mây.

Lưu ý các cơ chế truyền tải stdio và SSE mà bạn đã thấy trong các chương trước và cách Streamable HTTP là cơ chế được đề cập trong chương này.

## Streaming: Khái niệm và Động lực

Hiểu các khái niệm cơ bản và động lực đằng sau streaming là điều cần thiết để triển khai hệ thống giao tiếp thời gian thực hiệu quả.

**Streaming** là kỹ thuật lập trình mạng cho phép dữ liệu được gửi và nhận từng phần nhỏ, dễ quản lý hoặc như một chuỗi sự kiện, thay vì chờ đợi toàn bộ phản hồi sẵn sàng. Điều này đặc biệt hữu ích cho:

- Các tệp lớn hoặc bộ dữ liệu lớn.
- Cập nhật thời gian thực (ví dụ: chat, thanh tiến trình).
- Các phép tính lâu dài mà bạn muốn giữ cho người dùng được thông báo.

Dưới đây là những gì bạn cần biết về streaming ở mức độ cao:

- Dữ liệu được gửi dần dần, không phải tất cả cùng lúc.
- Client có thể xử lý dữ liệu khi nó đến.
- Giảm độ trễ cảm nhận và cải thiện trải nghiệm người dùng.

### Tại sao sử dụng streaming?

Các lý do để sử dụng streaming bao gồm:

- Người dùng nhận phản hồi ngay lập tức, không chỉ khi kết thúc.
- Cho phép các ứng dụng thời gian thực và giao diện người dùng phản hồi nhanh.
- Sử dụng tài nguyên mạng và tính toán hiệu quả hơn.

### Ví dụ Đơn giản: Server & Client Streaming HTTP

Dưới đây là ví dụ đơn giản về cách triển khai streaming:

#### Python

**Server (Python, sử dụng FastAPI và StreamingResponse):**

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

**Client (Python, sử dụng requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Ví dụ này thể hiện server gửi một chuỗi tin nhắn đến client khi chúng sẵn sàng, thay vì chờ tất cả tin nhắn sẵn sàng.

**Cách hoạt động:**

- Server trả về từng tin nhắn khi nó đã sẵn sàng.
- Client nhận và in từng đoạn khi chúng đến.

**Yêu cầu:**

- Server phải sử dụng phản hồi streaming (ví dụ `StreamingResponse` trong FastAPI).
- Client phải xử lý phản hồi như một stream (`stream=True` trong requests).
- Content-Type thường là `text/event-stream` hoặc `application/octet-stream`.

#### Java

**Server (Java, sử dụng Spring Boot và Server-Sent Events):**

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

**Client (Java, sử dụng Spring WebFlux WebClient):**

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

- Sử dụng stack reactive của Spring Boot với `Flux` cho streaming
- `ServerSentEvent` cung cấp streaming sự kiện có cấu trúc với các loại sự kiện
- `WebClient` với `bodyToFlux()` cho phép tiêu thụ streaming phản ứng
- `delayElements()` mô phỏng thời gian xử lý giữa các sự kiện
- Sự kiện có thể có loại (`info`, `result`) để client xử lý tốt hơn

### So sánh: Streaming Cổ Điển vs Streaming MCP

Sự khác biệt giữa cách streaming hoạt động theo kiểu "cổ điển" so với MCP có thể được mô tả như sau:

| Tính năng                | Streaming HTTP Cổ điển       | Streaming MCP (Thông báo)          |
|-------------------------|------------------------------|-----------------------------------|
| Phản hồi chính          | Thành các chunk       | Đơn lẻ, ở cuối                      |
| Cập nhật tiến trình     | Gửi dưới dạng các khối dữ liệu| Gửi dưới dạng thông báo            |
| Yêu cầu client          | Phải xử lý stream             | Phải triển khai bộ xử lý tin nhắn  |
| Trường hợp sử dụng      | Tệp lớn, luồng token AI       | Tiến trình, nhật ký, phản hồi thời gian thực |

### Các Khác biệt Chính Quan sát được

Ngoài ra, dưới đây là một số khác biệt chủ yếu:

- **Mô hình giao tiếp:**
  - Streaming HTTP cổ điển: Sử dụng mã hóa truyền chunk đơn giản để gửi dữ liệu từng phần
  - Streaming MCP: Sử dụng hệ thống thông báo có cấu trúc với giao thức JSON-RPC

- **Định dạng tin nhắn:**
  - HTTP cổ điển: Các chunk văn bản thuần túy với các dòng mới
  - MCP: Các đối tượng LoggingMessageNotification có cấu trúc với siêu dữ liệu

- **Triển khai client:**
  - HTTP cổ điển: Client đơn giản xử lý phản hồi streaming
  - MCP: Client phức tạp hơn với bộ xử lý tin nhắn để xử lý các loại tin nhắn khác nhau

- **Cập nhật tiến trình:**
  - HTTP cổ điển: Tiến trình là một phần của luồng phản hồi chính
  - MCP: Tiến trình được gửi qua các thông báo riêng biệt trong khi phản hồi chính đến ở cuối

### Khuyến nghị

Có một số điều chúng tôi khuyến nghị khi lựa chọn giữa streaming cổ điển (như điểm cuối `/stream` bạn đã thấy ở trên) và streaming qua MCP.

- **Cho nhu cầu streaming đơn giản:** Streaming HTTP cổ điển dễ triển khai hơn và đủ cho các nhu cầu streaming cơ bản.

- **Cho các ứng dụng phức tạp, tương tác:** Streaming MCP cung cấp cách tiếp cận có cấu trúc hơn với siêu dữ liệu phong phú và tách biệt giữa thông báo và kết quả cuối.

- **Cho ứng dụng AI:** Hệ thống thông báo của MCP đặc biệt hữu ích cho các tác vụ AI chạy lâu mà bạn muốn giữ người dùng được cập nhật tiến trình.

## Streaming trong MCP

Ok, vậy bạn đã thấy một số khuyến nghị và so sánh về sự khác biệt giữa streaming cổ điển và streaming trong MCP. Bây giờ hãy đi sâu vào chi tiết chính xác cách bạn có thể tận dụng streaming trong MCP.

Hiểu được cách streaming hoạt động trong khung MCP là điều cần thiết để xây dựng ứng dụng phản hồi nhanh cung cấp phản hồi thời gian thực cho người dùng trong các thao tác chạy lâu.

Trong MCP, streaming không phải là gửi phản hồi chính theo các khối, mà là gửi **thông báo** đến client trong khi công cụ đang xử lý yêu cầu. Các thông báo này có thể bao gồm cập nhật tiến trình, nhật ký hoặc các sự kiện khác.

### Cách hoạt động

Kết quả chính vẫn được gửi dưới dạng một phản hồi đơn. Tuy nhiên, thông báo có thể được gửi như các tin nhắn riêng biệt trong quá trình xử lý và do đó cập nhật cho client theo thời gian thực. Client phải có khả năng xử lý và hiển thị các thông báo này.

## Thông báo là gì?

Chúng ta nói "Thông báo", nghĩa là gì trong ngữ cảnh MCP?

Thông báo là tin nhắn được gửi từ server đến client để thông báo về tiến trình, trạng thái hoặc các sự kiện khác trong quá trình thực hiện thao tác dài. Thông báo cải thiện tính minh bạch và trải nghiệm người dùng.

Ví dụ, client cần gửi một thông báo khi handshake ban đầu với server đã hoàn thành.

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

Thông báo thuộc một chủ đề trong MCP được gọi là ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Để logging hoạt động, server cần kích hoạt tính năng/năng lực như sau:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Tùy theo SDK bạn dùng, logging có thể được bật mặc định, hoặc bạn cần bật rõ trong cấu hình server của bạn.

Có các kiểu thông báo khác nhau:

| Cấp độ    | Mô tả                         | Ví dụ Trường hợp sử dụng       |
|-----------|-------------------------------|-------------------------------|
| debug     | Thông tin debug chi tiết       | Điểm vào/ra hàm               |
| info      | Tin nhắn thông tin chung       | Cập nhật tiến trình thao tác  |
| notice    | Sự kiện bình thường nhưng quan trọng | Thay đổi cấu hình           |
| warning   | Điều kiện cảnh báo             | Sử dụng tính năng đã bị ngưng |
| error     | Điều kiện lỗi                 | Thất bại thao tác             |
| critical  | Điều kiện nghiêm trọng         | Lỗi thành phần hệ thống       |
| alert     | Phải hành động ngay lập tức     | Phát hiện dữ liệu bị hỏng     |
| emergency | Hệ thống không thể sử dụng     | Hỏng hoàn toàn hệ thống       |

## Triển khai Thông báo trong MCP

Để triển khai thông báo trong MCP, bạn cần thiết lập cả phía server và client để xử lý cập nhật thời gian thực. Điều này cho phép ứng dụng của bạn cung cấp phản hồi tức thì cho người dùng trong các thao tác chạy lâu.

### Phía Server: Gửi Thông báo

Hãy bắt đầu với phía server. Trong MCP, bạn định nghĩa các công cụ có thể gửi thông báo trong quá trình xử lý yêu cầu. Server sử dụng đối tượng context (thường là `ctx`) để gửi tin nhắn đến client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Trong ví dụ trên, công cụ `process_files` gửi ba thông báo tới client khi nó xử lý từng tệp. Phương thức `ctx.info()` được sử dụng để gửi tin nhắn thông tin.

Ngoài ra, để bật thông báo, đảm bảo server của bạn sử dụng truyền tải streaming (như `streamable-http`) và client có bộ xử lý tin nhắn để xử lý thông báo. Dưới đây là cách thiết lập server sử dụng truyền tải `streamable-http`:

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

Trong ví dụ .NET này, công cụ `ProcessFiles` được đánh dấu bằng thuộc tính `Tool` và gửi ba thông báo tới client khi xử lý từng tệp. Phương thức `ctx.Info()` được dùng để gửi tin nhắn thông tin.

Để bật thông báo trong server MCP của bạn, hãy đảm bảo đang sử dụng truyền tải streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Phía Client: Nhận Thông báo

Client phải triển khai bộ xử lý tin nhắn để xử lý và hiển thị thông báo khi chúng đến.

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

Trong đoạn mã trên, hàm `message_handler` kiểm tra xem tin nhắn đến có phải là thông báo không. Nếu đúng thì in ra thông báo; nếu không thì xử lý như tin nhắn server bình thường. Lưu ý cách `ClientSession` được khởi tạo với `message_handler` để xử lý các thông báo đến.

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

Trong ví dụ .NET này, hàm `MessageHandler` kiểm tra nếu tin nhắn đến là thông báo, in ra đó; nếu không xử lý như tin nhắn server thông thường. `ClientSession` được khởi tạo với bộ xử lý tin nhắn thông qua `ClientSessionOptions`.

Để bật thông báo, đảm bảo server sử dụng truyền tải streaming (như `streamable-http`) và client triển khai bộ xử lý tin nhắn để xử lý thông báo.

## Thông báo Tiến trình & Các Kịch bản

Phần này giải thích khái niệm thông báo tiến trình trong MCP, lý do quan trọng của chúng và cách triển khai bằng Streamable HTTP. Bạn cũng sẽ thấy một bài tập thực hành để củng cố hiểu biết.

Thông báo tiến trình là các tin nhắn thời gian thực được gửi từ server đến client trong thao tác chạy lâu. Thay vì chờ toàn bộ quá trình hoàn tất, server liên tục cập nhật trạng thái hiện tại cho client. Điều này cải thiện tính minh bạch, trải nghiệm người dùng và tạo điều kiện dễ dàng hơn cho việc gỡ lỗi.

**Ví dụ:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Tại sao sử dụng Thông báo Tiến trình?

Thông báo tiến trình quan trọng vì một số lý do:

- **Trải nghiệm người dùng tốt hơn:** Người dùng thấy cập nhật khi công việc đang tiến triển, không chỉ khi kết thúc.
- **Phản hồi thời gian thực:** Client có thể hiển thị thanh tiến trình hoặc nhật ký, làm cho ứng dụng cảm giác phản hồi nhanh.
- **Dễ dàng gỡ lỗi và giám sát:** Nhà phát triển và người dùng có thể thấy quá trình có thể chậm hoặc bị kẹt ở đâu.

### Cách triển khai Thông báo Tiến trình

Dưới đây là cách triển khai thông báo tiến trình trong MCP:

- **Phía server:** Dùng `ctx.info()` hoặc `ctx.log()` gửi thông báo khi xử lý từng mục. Điều này gửi tin nhắn cho client trước khi kết quả chính sẵn sàng.
- **Phía client:** Triển khai bộ xử lý tin nhắn lắng nghe và hiển thị thông báo khi chúng đến. Bộ xử lý này phân biệt giữa thông báo và kết quả cuối cùng.

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

## Các Vấn đề Bảo mật

Khi triển khai các server MCP với truyền tải dựa trên HTTP, bảo mật trở thành mối quan tâm hàng đầu cần chú ý cẩn thận đến nhiều vector tấn công và cơ chế bảo vệ.

### Tổng quan

Bảo mật là yếu tố quan trọng khi công khai các server MCP qua HTTP. Streamable HTTP mở ra các bề mặt tấn công mới và yêu cầu cấu hình cẩn thận.

### Các điểm chính

- **Xác thực header Origin**: Luôn xác thực header `Origin` để ngăn chặn tấn công DNS rebind.
- **Ràng buộc localhost**: Trong phát triển cục bộ, hãy ràng buộc server với `localhost` để không bị lộ ra internet công cộng.
- **Xác thực**: Triển khai xác thực (ví dụ: khóa API, OAuth) cho môi trường sản xuất.
- **CORS**: Cấu hình chính sách Chia sẻ Tài nguyên Nguồn gốc chéo (CORS) để giới hạn truy cập.
- **HTTPS**: Sử dụng HTTPS trong môi trường sản xuất để mã hóa lưu lượng.

### Thực hành tốt nhất

- Không bao giờ tin tưởng các yêu cầu đến mà không xác thực.
- Ghi lại và giám sát tất cả truy cập và lỗi.
- Thường xuyên cập nhật các phụ thuộc để vá các lỗ hổng bảo mật.

### Thách thức
- Cân bằng giữa bảo mật và dễ dàng phát triển
- Đảm bảo tương thích với các môi trường khách hàng khác nhau

## Nâng cấp từ SSE lên Streamable HTTP

Đối với các ứng dụng hiện đang sử dụng Server-Sent Events (SSE), việc di chuyển sang Streamable HTTP mang lại các khả năng nâng cao và sự bền vững lâu dài tốt hơn cho các triển khai MCP của bạn.

### Tại sao nên nâng cấp?

Có hai lý do thuyết phục để nâng cấp từ SSE lên Streamable HTTP:

- Streamable HTTP cung cấp khả năng mở rộng, tương thích và hỗ trợ thông báo phong phú hơn so với SSE.
- Đây là phương tiện truyền tải được khuyến nghị cho các ứng dụng MCP mới.

### Các bước di chuyển

Dưới đây là cách bạn có thể di chuyển từ SSE sang Streamable HTTP trong các ứng dụng MCP của mình:

- **Cập nhật mã máy chủ** để sử dụng `transport="streamable-http"` trong `mcp.run()`.
- **Cập nhật mã khách hàng** để sử dụng `streamablehttp_client` thay vì khách hàng SSE.
- **Triển khai trình xử lý tin nhắn** trong khách hàng để xử lý các thông báo.
- **Kiểm tra tính tương thích** với các công cụ và quy trình làm việc hiện có.

### Duy trì tương thích

Khuyến nghị duy trì tương thích với các khách hàng SSE hiện có trong quá trình di chuyển. Dưới đây là một số chiến lược:

- Bạn có thể hỗ trợ cả SSE và Streamable HTTP bằng cách chạy cả hai phương tiện truyền tải trên các điểm cuối khác nhau.
- Di chuyển dần các khách hàng sang phương tiện truyền tải mới.

### Thách thức

Hãy đảm bảo bạn giải quyết các thách thức sau trong quá trình di chuyển:

- Đảm bảo tất cả các khách hàng được cập nhật
- Xử lý sự khác biệt trong việc truyền đạt thông báo

## Các xét đến về bảo mật

Bảo mật nên là ưu tiên hàng đầu khi triển khai bất kỳ máy chủ nào, đặc biệt là khi sử dụng các phương tiện truyền tải dựa trên HTTP như Streamable HTTP trong MCP.

Khi triển khai các máy chủ MCP với các phương tiện truyền tải HTTP, bảo mật trở thành một mối quan tâm trọng yếu đòi hỏi sự chú ý cẩn thận đến nhiều hướng tấn công và các cơ chế bảo vệ.

### Tổng quan

Bảo mật là yếu tố quan trọng khi công khai các máy chủ MCP qua HTTP. Streamable HTTP giới thiệu các bề mặt tấn công mới và đòi hỏi cấu hình cẩn thận.

Dưới đây là một số điểm trọng yếu về bảo mật:

- **Xác thực Header Origin**: Luôn xác thực header `Origin` để ngăn chặn các cuộc tấn công DNS rebinding.
- **Ràng buộc localhost**: Đối với phát triển cục bộ, ràng buộc máy chủ vào `localhost` để tránh phơi bày cho internet công cộng.
- **Xác thực**: Triển khai xác thực (ví dụ, khóa API, OAuth) cho các triển khai sản xuất.
- **CORS**: Cấu hình chính sách Chia sẻ Tài nguyên Nguồn gốc Chéo (CORS) để hạn chế truy cập.
- **HTTPS**: Sử dụng HTTPS trong môi trường sản xuất để mã hóa lưu lượng.

### Thực hành tốt nhất

Ngoài ra, dưới đây là một số thực hành tốt nhất để theo dõi khi triển khai bảo mật trong máy chủ streaming MCP của bạn:

- Không bao giờ tin tưởng các yêu cầu đến mà không xác thực.
- Ghi log và giám sát tất cả truy cập và lỗi.
- Cập nhật thường xuyên các thư viện phụ thuộc để vá các lỗ hổng bảo mật.

### Thách thức

Bạn sẽ gặp một vài thách thức khi triển khai bảo mật trong các máy chủ streaming MCP:

- Cân bằng giữa bảo mật và dễ dàng phát triển
- Đảm bảo tương thích với các môi trường khách hàng khác nhau

### Bài tập: Xây dựng ứng dụng MCP Streaming của riêng bạn

**Kịch bản:**
Xây dựng một máy chủ MCP và khách hàng nơi máy chủ xử lý một danh sách các mục (ví dụ, tập tin hoặc tài liệu) và gửi một thông báo cho mỗi mục được xử lý. Khách hàng sẽ hiển thị mỗi thông báo ngay khi nó đến.

**Các bước:**

1. Triển khai một công cụ máy chủ xử lý danh sách và gửi thông báo cho mỗi mục.
2. Triển khai một khách hàng với trình xử lý tin nhắn để hiển thị thông báo theo thời gian thực.
3. Kiểm tra triển khai của bạn bằng cách chạy cả máy chủ và khách hàng, và quan sát các thông báo.

[Solution](./solution/README.md)

## Đọc thêm & Chuyện gì tiếp theo?

Để tiếp tục hành trình với streaming MCP và mở rộng kiến thức của bạn, phần này cung cấp các tài nguyên bổ sung và các bước gợi ý tiếp theo để xây dựng các ứng dụng nâng cao hơn.

### Đọc thêm

- [Microsoft: Giới thiệu về HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS trong ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Chuyện gì tiếp theo?

- Thử xây dựng các công cụ MCP nâng cao hơn sử dụng streaming cho phân tích thời gian thực, chat, hoặc chỉnh sửa cộng tác.
- Khám phá tích hợp streaming MCP với các framework frontend (React, Vue, v.v.) để cập nhật giao diện người dùng trực tiếp.
- Tiếp theo: [Sử dụng AI Toolkit cho VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->