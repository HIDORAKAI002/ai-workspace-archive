# Gỡ lỗi với MCP Inspector

**MCP Inspector** là một công cụ gỡ lỗi thiết yếu cho phép bạn kiểm tra và khắc phục sự cố các máy chủ MCP một cách tương tác mà không cần một ứng dụng máy chủ AI đầy đủ. Hãy nghĩ về nó như "Postman cho MCP" - nó cung cấp một giao diện trực quan để gửi yêu cầu, xem phản hồi và hiểu cách máy chủ của bạn hoạt động.

## Tại sao sử dụng MCP Inspector?

Khi xây dựng các máy chủ MCP, bạn thường gặp những thách thức sau:

- **"Máy chủ của tôi có đang chạy không?"** - Inspector hiển thị trạng thái kết nối
- **"Các công cụ của tôi đã được đăng ký đúng chưa?"** - Inspector liệt kê tất cả các công cụ có sẵn
- **"Định dạng phản hồi là gì?"** - Inspector hiển thị toàn bộ phản hồi JSON
- **"Tại sao công cụ này không hoạt động?"** - Inspector hiển thị thông báo lỗi chi tiết

## Yêu cầu trước

- Node.js 18+ đã được cài đặt
- npm (đã có sẵn cùng với Node.js)
- Một máy chủ MCP để thử nghiệm (xem [Module 3.1 - Máy Chủ Đầu Tiên](../01-first-server/README.md))

## Cài đặt

### Tùy chọn 1: Chạy với npx (Khuyến nghị để thử nghiệm nhanh)

```bash
npx @modelcontextprotocol/inspector
```

### Tùy chọn 2: Cài đặt Toàn cục

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Tùy chọn 3: Thêm vào dự án của bạn

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Thêm vào `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Kết nối với Máy Chủ của Bạn

### Máy chủ stdio (Quy trình cục bộ)

Đối với các máy chủ giao tiếp qua đầu vào/đầu ra tiêu chuẩn:

```bash
# Máy chủ Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Máy chủ Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Với biến môi trường
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### Máy chủ SSE/HTTP (Mạng)

Đối với các máy chủ chạy dưới dạng dịch vụ HTTP:

1. Khởi động máy chủ trước:
   ```bash
   python server.py  # Máy chủ chạy trên http://localhost:8080
   ```

2. Khởi chạy Inspector và kết nối:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Tổng quan giao diện Inspector

Khi Inspector được khởi chạy, bạn sẽ thấy một giao diện web (thông thường tại `http://localhost:5173`):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Thử nghiệm các Công cụ

### Liệt kê các Công cụ có sẵn

1. Nhấp vào tab **Tools**
2. Inspector tự động gọi `tools/list`
3. Bạn sẽ thấy tất cả các công cụ đã đăng ký cùng với:
   - Tên công cụ
   - Mô tả
   - Định dạng đầu vào (tham số)

### Gọi một Công cụ

1. Chọn một công cụ từ danh sách
2. Điền các tham số cần thiết vào biểu mẫu
3. Nhấn **Run Tool**
4. Xem phản hồi trong bảng kết quả

**Ví dụ: Thử nghiệm công cụ máy tính**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### Gỡ lỗi Lỗi Công cụ

Khi một công cụ thất bại, Inspector hiển thị:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Các mã lỗi phổ biến:
| Mã | Ý nghĩa |
|------|---------|
| -32700 | Lỗi phân tích (JSON không hợp lệ) |
| -32600 | Yêu cầu không hợp lệ |
| -32601 | Phương thức không tìm thấy |
| -32602 | Tham số không hợp lệ |
| -32603 | Lỗi nội bộ |

---

## Thử nghiệm Tài nguyên

### Liệt kê Tài nguyên

1. Nhấp vào tab **Resources**
2. Inspector gọi `resources/list`
3. Bạn sẽ thấy:
   - URI tài nguyên
   - Tên và mô tả
   - Loại MIME

### Đọc một Tài nguyên

1. Chọn một tài nguyên
2. Nhấn **Read Resource**
3. Xem nội dung trả về

**Ví dụ kết quả:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## Thử nghiệm Các Prompt

### Liệt kê Các Prompt

1. Nhấp vào tab **Prompts**
2. Inspector gọi `prompts/list`
3. Xem các mẫu prompt có sẵn

### Lấy một Prompt

1. Chọn một prompt
2. Điền các đối số cần thiết
3. Nhấn **Get Prompt**
4. Xem các thông điệp prompt được dựng sẵn

---

## Phân tích Nhật ký Tin nhắn

Nhật ký tin nhắn hiển thị tất cả các tin nhắn giao thức MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Những điều cần chú ý

- **Các cặp Yêu cầu/Phản hồi**: Mỗi `→` nên có một `←` tương ứng
- **Thông báo lỗi**: Tìm `"error"` trong các phản hồi
- **Thời gian**: Khoảng trống lớn có thể chỉ ra vấn đề về hiệu năng
- **Phiên bản giao thức**: Đảm bảo máy chủ và client đồng ý về phiên bản

---

## Tích hợp VS Code

Bạn có thể chạy Inspector trực tiếp từ VS Code:

### Sử dụng launch.json

Thêm vào `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Sử dụng Tasks

Thêm vào `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## Các Tình Huống Gỡ Lỗi Thường Gặp

### Tình huống 1: Máy chủ không kết nối được

**Triệu chứng:** Inspector hiển thị "Disconnected" hoặc kẹt ở "Connecting..."

**Danh sách kiểm tra:**
1. ✅ Lệnh máy chủ có đúng không?
2. ✅ Tất cả các phụ thuộc đã được cài đặt chưa?
3. ✅ Đường dẫn máy chủ là tuyệt đối hay tương đối so với thư mục hiện tại?
4. ✅ Các biến môi trường cần thiết đã được thiết lập chưa?

**Các bước gỡ lỗi:**
```bash
# Kiểm tra máy chủ thủ công trước
python -c "import your_server_module; print('OK')"

# Kiểm tra lỗi nhập khẩu
python -m your_server_module 2>&1 | head -20

# Xác minh MCP SDK đã được cài đặt
pip show mcp
```

### Tình huống 2: Công cụ không hiển thị

**Triệu chứng:** Tab Tools hiển thị danh sách trống

**Nguyên nhân có thể:**
1. Công cụ không được đăng ký trong quá trình khởi tạo máy chủ
2. Máy chủ gặp sự cố sau khi khởi động
3. Handler `tools/list` trả về mảng rỗng

**Các bước gỡ lỗi:**
1. Kiểm tra nhật ký tin nhắn cho phản hồi `tools/list`
2. Thêm logging vào mã đăng ký công cụ của bạn
3. Xác minh các decorator `@mcp.tool()` có mặt (Python)

### Tình huống 3: Công cụ trả về lỗi

**Triệu chứng:** Lệnh gọi công cụ trả về phản hồi lỗi

**Cách gỡ lỗi:**
1. Đọc kỹ thông báo lỗi
2. Kiểm tra kiểu tham số có khớp với schema không
3. Thêm try/catch với thông báo lỗi chi tiết
4. Kiểm tra nhật ký máy chủ để xem các stack trace

**Ví dụ cải tiến xử lý lỗi:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Logic công cụ ở đây
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Tình huống 4: Nội dung tài nguyên trống

**Triệu chứng:** Tài nguyên trả về nhưng nội dung trống hoặc null

**Danh sách kiểm tra:**
1. ✅ Đường dẫn tệp hoặc URI đúng
2. ✅ Máy chủ có quyền đọc tài nguyên không
3. ✅ Nội dung tài nguyên được trả về chính xác

---

## Tính năng Nâng cao của Inspector

### Header tùy chỉnh (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Ghi nhật ký chi tiết

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Ghi lại phiên làm việc

Inspector có thể xuất nhật ký tin nhắn để phân tích sau:
1. Nhấn **Export Log** trong bảng tin nhắn
2. Lưu tập tin JSON
3. Chia sẻ với đồng đội để gỡ lỗi

---

## Thực hành Tốt nhất

1. **Thử nghiệm sớm và thường xuyên** - Sử dụng Inspector trong quá trình phát triển, không chỉ khi gặp sự cố
2. **Bắt đầu đơn giản** - Kiểm tra kết nối cơ bản trước khi gọi các công cụ phức tạp
3. **Kiểm tra schema** - Nhiều lỗi đến từ việc không khớp kiểu tham số
4. **Đọc thông báo lỗi** - Lỗi MCP thường có mô tả rõ ràng
5. **Giữ Inspector mở** - Giúp phát hiện sự cố khi bạn phát triển

---

## Tiếp theo là gì

Bạn đã hoàn thành Module 3: Bắt đầu! Tiếp tục học:

- [Module 4: Triển khai Thực tế](../../04-PracticalImplementation/README.md)

---

## Tài nguyên bổ sung

- [Kho GitHub MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Đặc tả MCP - Tin nhắn Giao thức](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Đặc tả JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc của nó nên được coi là nguồn chính xác và đáng tin cậy. Đối với các thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm đối với bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->