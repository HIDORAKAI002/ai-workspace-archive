# MCP Server với stdio Transport

> **⚠️ Cập nhật quan trọng**: Từ MCP Specification 2025-06-18, giao thức SSE độc lập (Server-Sent Events) đã bị **loại bỏ** và được thay thế bằng giao thức "Streamable HTTP". Phiên bản MCP hiện tại xác định hai cơ chế giao thức chính:
> 1. **stdio** - Nhập/xuất chuẩn (được khuyến nghị cho các server cục bộ)
> 2. **Streamable HTTP** - Dành cho các server từ xa có thể sử dụng SSE nội bộ
>
> Bài học này đã được cập nhật để tập trung vào **giao thức stdio**, đây là cách tiếp cận được khuyến nghị cho hầu hết các triển khai MCP server.

Giao thức stdio cho phép các MCP server giao tiếp với client thông qua luồng nhập và xuất chuẩn. Đây là cơ chế giao thức phổ biến và được khuyến nghị nhất trong đặc tả MCP hiện tại, cung cấp cách xây dựng MCP server đơn giản và hiệu quả, dễ dàng tích hợp với nhiều ứng dụng client khác nhau.

## Tổng quan

Bài học này trình bày cách xây dựng và sử dụng MCP Server bằng giao thức stdio.

## Mục tiêu học tập

Sau bài học này, bạn sẽ có thể:

- Xây dựng MCP Server sử dụng giao thức stdio.
- Gỡ lỗi MCP Server bằng Inspector.
- Sử dụng MCP Server qua Visual Studio Code.
- Hiểu các cơ chế giao thức MCP hiện tại và lý do vì sao đề nghị dùng giao thức stdio.

## Giao thức stdio - Cách hoạt động

Giao thức stdio là một trong hai loại giao thức được hỗ trợ trong đặc tả MCP hiện tại (2025-11-25). Cách thức hoạt động như sau:

- **Giao tiếp đơn giản**: Server đọc tin nhắn JSON-RPC từ đầu vào chuẩn (`stdin`) và gửi tin nhắn đến đầu ra chuẩn (`stdout`).
- **Dựa trên tiến trình**: Client khởi chạy MCP server như một tiến trình phụ.
- **Định dạng tin nhắn**: Tin nhắn là các yêu cầu, thông báo hoặc phản hồi JSON-RPC riêng biệt, phân cách bằng dấu xuống dòng.
- **Ghi nhật ký**: Server CÓ THỂ ghi chuỗi UTF-8 vào đầu ra lỗi chuẩn (`stderr`) cho mục đích ghi nhật ký.

### Yêu cầu chính:
- Tin nhắn PHẢI được phân cách bằng dòng mới và KHÔNG được chứa dòng mới nhúng bên trong
- Server KHÔNG ĐƯỢC ghi bất cứ thứ gì vào `stdout` mà không phải là tin nhắn MCP hợp lệ
- Client KHÔNG ĐƯỢC ghi bất cứ thứ gì vào `stdin` của server mà không phải là tin nhắn MCP hợp lệ

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

Trong đoạn code trên:

- Chúng ta import lớp `Server` và `StdioServerTransport` từ MCP SDK
- Tạo một instance server với cấu hình và khả năng cơ bản
- Tạo instance `StdioServerTransport` và kết nối server với nó, cho phép giao tiếp qua stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Tạo phiên bản máy chủ
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

Trong đoạn code trên:

- Tạo instance server sử dụng MCP SDK
- Định nghĩa công cụ với decorator
- Dùng trình quản lý ngữ cảnh stdio_server để xử lý giao thức

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

Điểm khác biệt chính so với SSE là các server stdio:

- Không cần thiết lập web server hoặc endpoint HTTP
- Được client khởi chạy như tiến trình phụ
- Giao tiếp qua luồng stdin/stdout
- Đơn giản hơn để triển khai và gỡ lỗi

## Bài tập: Tạo server stdio

Để tạo server của chúng ta, cần lưu ý hai điều:

- Cần sử dụng một web server để công khai các endpoint kết nối và tin nhắn.
## Thực hành: Tạo MCP stdio server đơn giản

Trong bài lab này, chúng ta sẽ tạo một MCP server đơn giản sử dụng giao thức stdio được khuyến nghị. Server này sẽ cung cấp các công cụ để client có thể gọi thông qua chuẩn Model Context Protocol.

### Yêu cầu chuẩn bị

- Python 3.8 trở lên
- MCP Python SDK: `pip install mcp`
- Hiểu biết cơ bản về lập trình async

Hãy bắt đầu tạo MCP stdio server đầu tiên:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Cấu hình ghi nhật ký
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Tạo máy chủ
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Sử dụng giao thức stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Điểm khác biệt chính so với phương pháp SSE đã bị loại bỏ

**Giao thức Stdio (Tiêu chuẩn hiện tại):**
- Mô hình subprocess đơn giản - client khởi chạy server như tiến trình con
- Giao tiếp qua stdin/stdout sử dụng tin nhắn JSON-RPC
- Không cần thiết lập máy chủ HTTP
- Hiệu năng và bảo mật tốt hơn
- Dễ dàng gỡ lỗi và phát triển

**Giao thức SSE (Bị loại bỏ từ MCP 2025-06-18):**
- Yêu cầu thiết lập máy chủ HTTP với endpoint SSE
- Cấu hình phức tạp hơn với hạ tầng web server
- Cần xem xét bảo mật nhiều hơn cho endpoint HTTP
- Hiện được thay thế bằng Streamable HTTP cho các kịch bản web

### Tạo server với giao thức stdio

Để tạo server stdio, chúng ta cần:

1. **Import thư viện cần thiết** - Bao gồm các thành phần server MCP và giao thức stdio
2. **Tạo server instance** - Định nghĩa server với các khả năng
3. **Định nghĩa công cụ** - Thêm chức năng muốn mở ra
4. **Cấu hình giao thức** - Thiết lập giao tiếp stdio
5. **Chạy server** - Khởi động server và xử lý tin nhắn

Hãy xây dựng theo từng bước:

### Bước 1: Tạo server stdio cơ bản

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Cấu hình ghi nhật ký
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Tạo máy chủ
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Bước 2: Thêm nhiều công cụ hơn

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Bước 3: Chạy server

Lưu mã nguồn dưới tên `server.py` và chạy từ dòng lệnh:

```bash
python server.py
```

Server sẽ khởi động và chờ đầu vào từ stdin. Nó giao tiếp bằng các tin nhắn JSON-RPC qua giao thức stdio.

### Bước 4: Kiểm thử với Inspector

Bạn có thể kiểm thử server bằng MCP Inspector:

1. Cài đặt Inspector: `npx @modelcontextprotocol/inspector`
2. Chạy Inspector và trỏ đến server của bạn
3. Kiểm thử các công cụ bạn đã tạo

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Gỡ lỗi server stdio của bạn

### Sử dụng MCP Inspector

MCP Inspector là công cụ giá trị để gỡ lỗi và kiểm thử MCP server. Cách sử dụng với server stdio như sau:

1. **Cài đặt Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Chạy Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Kiểm thử server**: Inspector cung cấp giao diện web để bạn có thể:
   - Xem khả năng server
   - Thử nghiệm các công cụ với tham số khác nhau
   - Giám sát tin nhắn JSON-RPC
   - Gỡ lỗi các vấn đề kết nối

### Sử dụng VS Code

Bạn cũng có thể gỡ lỗi MCP server trực tiếp trong VS Code:

1. Tạo cấu hình khởi chạy trong `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Đặt breakpoint trong mã nguồn server
3. Chạy debugger và thử nghiệm với Inspector

### Mẹo gỡ lỗi phổ biến

- Sử dụng `stderr` cho ghi nhật ký - tuyệt đối không ghi vào `stdout` vì đây là kênh dành riêng cho tin nhắn MCP
- Đảm bảo tất cả tin nhắn JSON-RPC đều phân cách bằng dòng mới
- Thử nghiệm với công cụ đơn giản trước khi thêm chức năng phức tạp
- Dùng Inspector để kiểm tra định dạng tin nhắn

## Sử dụng server stdio trong VS Code

Khi đã xây dựng MCP stdio server, bạn có thể tích hợp nó với VS Code để dùng cùng Claude hoặc client tương thích MCP khác.

### Cấu hình

1. **Tạo file cấu hình MCP** tại `%APPDATA%\Claude\claude_desktop_config.json` (Windows) hoặc `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Khởi động lại Claude**: Đóng và mở lại Claude để nạp cấu hình server mới.

3. **Kiểm thử kết nối**: Bắt đầu cuộc trò chuyện với Claude và thử gọi các công cụ của server bạn:
   - "Bạn có thể chào tôi bằng công cụ greeting không?"
   - "Tính tổng của 15 và 27"
   - "Thông tin server là gì?"

### Ví dụ server stdio bằng TypeScript

Dưới đây là ví dụ đầy đủ bằng TypeScript để tham khảo:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Thêm công cụ
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### Ví dụ server stdio bằng .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Tóm tắt

Trong bài học cập nhật này, bạn đã học:

- Xây dựng MCP server sử dụng **giao thức stdio** hiện tại (cách khuyến nghị)
- Hiểu vì sao giao thức SSE bị loại bỏ thay thế bằng stdio và Streamable HTTP
- Tạo công cụ có thể gọi từ client MCP
- Gỡ lỗi server qua MCP Inspector
- Tích hợp server stdio với VS Code và Claude

Giao thức stdio cung cấp cách xây dựng MCP server đơn giản hơn, an toàn hơn, và hiệu quả hơn so với phương pháp SSE đã bị loại bỏ. Đây là giao thức đề nghị cho hầu hết triển khai MCP server kể từ đặc tả 2025-06-18.

### .NET

1. Trước tiên hãy tạo một số công cụ, chúng ta sẽ tạo file *Tools.cs* với nội dung sau:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Bài tập: Kiểm thử server stdio

Sau khi bạn đã xây dựng server stdio, hãy kiểm thử nó để chắc chắn nó hoạt động chính xác.

### Yêu cầu chuẩn bị

1. Đảm bảo bạn đã cài MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Mã nguồn server đã được lưu (ví dụ `server.py`)

### Kiểm thử với Inspector

1. **Khởi động Inspector cùng server**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Mở giao diện web**: Inspector sẽ mở cửa sổ trình duyệt hiển thị khả năng server.

3. **Kiểm thử các công cụ**: 
   - Dùng công cụ `get_greeting` với các tên khác nhau
   - Thử công cụ `calculate_sum` với nhiều số khác nhau
   - Gọi công cụ `get_server_info` để xem metadata server

4. **Theo dõi giao tiếp**: Inspector hiển thị các tin nhắn JSON-RPC trao đổi giữa client và server.

### Những gì bạn sẽ thấy

Khi server khởi động thành công, bạn sẽ thấy:
- Khả năng của server được liệt kê trong Inspector
- Các công cụ sẵn dùng để thử nghiệm
- Trao đổi tin nhắn JSON-RPC thành công
- Trả lời công cụ hiển thị trong giao diện

### Các vấn đề thường gặp và giải pháp

**Server không khởi động:**
- Kiểm tra các phụ thuộc đã cài chưa: `pip install mcp`
- Kiểm tra cú pháp và thụt đầu dòng trong Python
- Tìm lỗi trên console

**Công cụ không hiện ra:**
- Đảm bảo decorator `@server.tool()` có mặt
- Kiểm tra các hàm công cụ đã định nghĩa trước `main()`
- Đảm bảo server cấu hình đúng

**Sự cố kết nối:**
- Đảm bảo server dùng giao thức stdio đúng cách
- Kiểm tra không có tiến trình khác gây xung đột
- Kiểm tra cú pháp lệnh Inspector

## Bài tập về nhà

Thử mở rộng server với nhiều tính năng hơn. Xem [trang này](https://api.chucknorris.io/) để ví dụ, thêm công cụ gọi API. Bạn quyết định server trông thế nào. Chúc bạn vui :)

## Giải pháp

[Giải pháp](./solution/README.md) Đây là một giải pháp có mã hoạt động.

## Những điểm chính cần nhớ

Những điểm chính trong chương này là:

- Giao thức stdio là cơ chế được khuyến nghị cho MCP server cục bộ.
- Giao thức stdio cho phép giao tiếp liền mạch giữa MCP server và client dùng luồng nhập và xuất chuẩn.
- Bạn có thể sử dụng cả Inspector và Visual Studio Code để sử dụng trực tiếp server stdio, giúp gỡ lỗi và tích hợp đơn giản.

## Ví dụ mẫu

- [Bộ tính Java](../samples/java/calculator/README.md)
- [Bộ tính .Net](../../../../03-GettingStarted/samples/csharp)
- [Bộ tính JavaScript](../samples/javascript/README.md)
- [Bộ tính TypeScript](../samples/typescript/README.md)
- [Bộ tính Python](../../../../03-GettingStarted/samples/python) 

## Tài nguyên bổ sung

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Tiếp theo

## Bước tiếp theo

Sau khi bạn đã học cách xây dựng MCP server với giao thức stdio, bạn có thể khám phá các chủ đề nâng cao hơn:

- **Tiếp theo**: [HTTP Streaming với MCP (Streamable HTTP)](../06-http-streaming/README.md) - Tìm hiểu cơ chế giao thức khác cho server từ xa
- **Nâng cao**: [Thực hành bảo mật MCP](../../02-Security/README.md) - Triển khai bảo mật cho MCP server
- **Sản xuất**: [Chiến lược triển khai](../09-deployment/README.md) - Triển khai server cho môi trường sản xuất

## Tài nguyên bổ sung

- [Đặc tả MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Đặc tả chính thức
- [Tài liệu SDK MCP](https://github.com/modelcontextprotocol/sdk) - Tham khảo SDK cho tất cả các ngôn ngữ
- [Ví dụ cộng đồng](../../06-CommunityContributions/README.md) - Nhiều ví dụ server từ cộng đồng hơn

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->