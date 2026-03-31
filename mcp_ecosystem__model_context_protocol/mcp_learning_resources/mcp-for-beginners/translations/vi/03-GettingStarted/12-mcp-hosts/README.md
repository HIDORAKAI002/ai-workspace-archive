# Cài Đặt Các Ứng Dụng Chủ MCP Phổ Biến

Hướng dẫn này bao gồm cách cấu hình và sử dụng các máy chủ MCP với các ứng dụng chủ AI phổ biến. Mỗi ứng dụng chủ có cách cấu hình riêng, nhưng một khi thiết lập xong, tất cả đều giao tiếp với máy chủ MCP sử dụng giao thức chuẩn hóa.

## MCP Host là gì?

**MCP Host** là một ứng dụng AI có thể kết nối với các máy chủ MCP để mở rộng khả năng. Hãy nghĩ nó như "giao diện người dùng" mà người dùng tương tác, trong khi các máy chủ MCP cung cấp công cụ và dữ liệu "phần phía sau".

```mermaid
flowchart LR
    User[👤 Người dùng] --> Host[🖥️ Máy chủ MCP]
    Host --> S1[MCP Server A]
    Host --> S2[MCP Server B]
    Host --> S3[MCP Server C]
    
    subgraph "Máy chủ phổ biến"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Yêu Cầu Đầu Vào

- Một máy chủ MCP để kết nối (xem [Module 3.1 - Máy Chủ Đầu Tiên](../01-first-server/README.md))
- Ứng dụng chủ đã được cài đặt trên hệ thống của bạn
- Hiểu biết cơ bản về tệp cấu hình JSON

---

## 1. Claude Desktop

**Claude Desktop** là ứng dụng chính thức dành cho máy tính để bàn của Anthropic hỗ trợ MCP một cách nguyên bản.

### Cài Đặt

1. Tải Claude Desktop từ [claude.ai/download](https://claude.ai/download)
2. Cài đặt và đăng nhập bằng tài khoản Anthropic của bạn

### Cấu Hình

Claude Desktop sử dụng tệp cấu hình JSON để định nghĩa các máy chủ MCP.

**Vị trí tệp cấu hình:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Ví dụ cấu hình:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Tùy Chọn Cấu Hình

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| `command` | Tệp thực thi để chạy | `"python"`, `"node"`, `"npx"` |
| `args` | Tham số dòng lệnh | `["-m", "my_server"]` |
| `env` | Biến môi trường | `{"API_KEY": "xxx"}` |
| `cwd` | Thư mục làm việc | `"/path/to/server"` |

### Kiểm Tra Thiết Lập

1. Lưu tệp cấu hình
2. Khởi động lại hoàn toàn Claude Desktop (thoát rồi mở lại)
3. Mở một cuộc trò chuyện mới
4. Tìm biểu tượng 🔌 báo hiệu máy chủ đã kết nối
5. Thử hỏi Claude sử dụng một trong các công cụ của bạn

### Khắc Phục Sự Cố Claude Desktop

**Máy chủ không hiển thị:**
- Kiểm tra cú pháp tệp cấu hình bằng trình xác thực JSON
- Đảm bảo đường dẫn lệnh chính xác
- Xem nhật ký Claude Desktop: Trợ giúp → Hiển thị Nhật ký

**Máy chủ bị lỗi khi khởi động:**
- Thử chạy máy chủ thủ công trong terminal trước
- Kiểm tra biến môi trường đã được thiết lập chính xác
- Đảm bảo mọi phụ thuộc đã được cài đặt đầy đủ

---

## 2. VS Code với GitHub Copilot

VS Code hỗ trợ MCP thông qua các tiện ích mở rộng GitHub Copilot Chat.

### Yêu Cầu Đầu Vào

1. VS Code phiên bản 1.99+ đã cài đặt
2. Tiện ích GitHub Copilot đã cài đặt
3. Tiện ích GitHub Copilot Chat đã cài đặt

### Cấu Hình

VS Code sử dụng `.vscode/mcp.json` trong workspace hoặc cài đặt người dùng.

**Cấu hình workspace** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Cài đặt người dùng** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### Sử Dụng MCP trong VS Code

1. Mở bảng Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Gõ `@` để xem các công cụ MCP có sẵn
3. Dùng ngôn ngữ tự nhiên để gọi công cụ: "Calculate 25 * 48 using the calculator"

### Khắc Phục Sự Cố VS Code

**Máy chủ MCP không tải:**
- Kiểm tra bảng Output → "MCP" để xem nhật ký lỗi
- Tải lại cửa sổ: Ctrl+Shift+P → "Developer: Reload Window"
- Xác nhận máy chủ có thể chạy độc lập

---

## 3. Cursor

**Cursor** là trình soạn thảo mã ưu tiên AI với hỗ trợ MCP tích hợp sẵn.

### Cài Đặt

1. Tải Cursor từ [cursor.sh](https://cursor.sh)
2. Cài đặt và đăng nhập

### Cấu Hình

Cursor sử dụng định dạng cấu hình tương tự Claude Desktop.

**Vị trí tệp cấu hình:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Ví dụ cấu hình:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Sử Dụng MCP trong Cursor

1. Mở chat AI của Cursor (Ctrl+L / Cmd+L)
2. Các công cụ MCP tự động xuất hiện trong gợi ý
3. Yêu cầu AI thực hiện tác vụ sử dụng máy chủ đã kết nối

---

## 4. Cline (Dựa trên Terminal)

**Cline** là ứng dụng khách MCP sử dụng dòng lệnh, phù hợp với quy trình làm việc trên terminal.

### Cài Đặt

```bash
npm install -g @anthropic/cline
```

### Cấu Hình

Cline sử dụng biến môi trường và tham số dòng lệnh.

**Sử dụng biến môi trường:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Sử dụng tham số dòng lệnh:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Tệp cấu hình** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Sử Dụng Cline

```bash
# Bắt đầu một phiên tương tác
cline

# Truy vấn đơn với MCP
cline "Calculate the square root of 144 using the calculator"

# Liệt kê các công cụ có sẵn
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** là một trình soạn thảo mã được hỗ trợ bởi AI khác với khả năng hỗ trợ MCP.

### Cài Đặt

1. Tải Windsurf từ [codeium.com/windsurf](https://codeium.com/windsurf)
2. Cài đặt và tạo tài khoản

### Cấu Hình

Cấu hình Windsurf được quản lý thông qua giao diện cài đặt:

1. Mở Cài đặt (Ctrl+, / Cmd+,)
2. Tìm kiếm "MCP"
3. Nhấn "Chỉnh sửa trong settings.json"

**Ví dụ cấu hình:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## So Sánh Các Loại Giao Thức

Các ứng dụng chủ hỗ trợ các cơ chế truyền tải khác nhau:

| Ứng dụng chủ      | stdio | SSE/HTTP | WebSocket |
|-------------------|--------|----------|-----------|
| Claude Desktop    | ✅     | ❌       | ❌        |
| VS Code           | ✅     | ✅       | ❌        |
| Cursor            | ✅     | ✅       | ❌        |
| Cline             | ✅     | ✅       | ❌        |
| Windsurf          | ✅     | ✅       | ❌        |

**stdio** (đầu vào/đầu ra chuẩn): Tốt cho các máy chủ cục bộ do ứng dụng chủ khởi động  
**SSE/HTTP**: Tốt cho máy chủ từ xa hoặc máy chủ chia sẻ giữa nhiều khách hàng

---

## Khắc Phục Sự Cố Thường Gặp

### Máy chủ không khởi động được

1. **Thử máy chủ thủ công trước:**
   ```bash
   # Dành cho Python
   python -m your_server_module
   
   # Dành cho Node.js
   node /path/to/server/index.js
   ```

2. **Kiểm tra đường dẫn lệnh:**
   - Sử dụng đường dẫn tuyệt đối khi có thể
   - Đảm bảo tệp thực thi có trong PATH của bạn

3. **Xác minh phụ thuộc:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Máy chủ kết nối được nhưng công cụ không hoạt động

1. **Kiểm tra nhật ký máy chủ** - Hầu hết ứng dụng chủ đều có tùy chọn ghi nhật ký  
2. **Xác minh đăng ký công cụ** - Dùng MCP Inspector để kiểm tra  
3. **Kiểm tra quyền truy cập** - Một số công cụ cần quyền truy cập tệp/mạng  

### Biến môi trường không được truyền

- Một số ứng dụng chủ lọc biến môi trường  
- Sử dụng trường `env` trong cấu hình rõ ràng  
- Tránh lưu trữ dữ liệu nhạy cảm trong tệp cấu hình (sử dụng quản lý bí mật)  

---

## Thực Hành Bảo Mật Tốt Nhất

1. **Không bao giờ cam kết khóa API** vào tệp cấu hình  
2. **Sử dụng biến môi trường** cho dữ liệu nhạy cảm  
3. **Giới hạn quyền máy chủ** chỉ ở mức cần thiết  
4. **Kiểm tra mã máy chủ** trước khi cấp quyền truy cập hệ thống  
5. **Sử dụng danh sách cho phép** cho quyền truy cập hệ thống tệp và mạng  

---

## Tiếp Theo Là Gì

- [3.13 - Gỡ Lỗi với MCP Inspector](../13-mcp-inspector/README.md)  
- [3.1 - Tạo máy chủ MCP đầu tiên của bạn](../01-first-server/README.md)  
- [Module 5 - Chủ Đề Nâng Cao](../../05-AdvancedTopics/README.md)  

---

## Tài Nguyên Bổ Sung

- [Tài liệu MCP của Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [Tiện ích MCP cho VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [Đặc Tả MCP - Các Giao Thức Truyền Tải](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [Danh mục Máy Chủ MCP Chính Thức](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ gốc của nó được coi là nguồn tham khảo chính xác nhất. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu nhầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->