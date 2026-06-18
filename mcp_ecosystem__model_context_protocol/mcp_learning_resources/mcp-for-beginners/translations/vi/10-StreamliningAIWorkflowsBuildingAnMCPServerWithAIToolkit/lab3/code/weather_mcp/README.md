# Weather MCP Server

Đây là một ví dụ về MCP Server bằng Python thực hiện các công cụ thời tiết với phản hồi giả lập. Nó có thể được sử dụng làm khuôn mẫu cho MCP Server của bạn. Nó bao gồm các tính năng sau:

- **Weather Tool**: Một công cụ cung cấp thông tin thời tiết giả lập dựa trên vị trí được cho.
- **Kết nối với Agent Builder**: Tính năng cho phép bạn kết nối MCP server với Agent Builder để kiểm thử và gỡ lỗi.
- **Gỡ lỗi trong [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Tính năng cho phép bạn gỡ lỗi MCP Server bằng MCP Inspector.

## Bắt đầu với mẫu Weather MCP Server

> **Yêu cầu trước**
>
> Để chạy MCP Server trên máy phát triển cục bộ của bạn, bạn cần:
>
> - [Python](https://www.python.org/)
> - (*Tùy chọn - nếu bạn thích uv*) [uv](https://github.com/astral-sh/uv)
> - [Phần mở rộng Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Chuẩn bị môi trường

Có hai cách để thiết lập môi trường cho dự án này. Bạn có thể chọn một trong hai dựa trên sở thích của bạn.

> Lưu ý: Tải lại VSCode hoặc terminal để đảm bảo python trong môi trường ảo được sử dụng sau khi tạo môi trường ảo.

| Cách làm | Các bước |
| -------- | -------- |
| Sử dụng `uv` | 1. Tạo môi trường ảo: `uv venv` <br>2. Chạy lệnh VSCode "***Python: Select Interpreter***" và chọn python từ môi trường ảo đã tạo <br>3. Cài đặt các phụ thuộc (bao gồm phụ thuộc phát triển): `uv pip install -r pyproject.toml --extra dev` |
| Sử dụng `pip` | 1. Tạo môi trường ảo: `python -m venv .venv` <br>2. Chạy lệnh VSCode "***Python: Select Interpreter***" và chọn python từ môi trường ảo đã tạo<br>3. Cài đặt các phụ thuộc (bao gồm phụ thuộc phát triển): `pip install -e .[dev]` |

Sau khi thiết lập môi trường, bạn có thể chạy server trên máy phát triển cục bộ thông qua Agent Builder làm MCP Client để bắt đầu:
1. Mở bảng Debug của VS Code. Chọn `Debug in Agent Builder` hoặc nhấn `F5` để bắt đầu gỡ lỗi MCP server.
2. Sử dụng Microsoft Foundry Toolkit Agent Builder để kiểm thử server với [prompt này](../../../../../../../../../../../open_prompt_builder). Server sẽ được tự động kết nối với Agent Builder.
3. Nhấn `Run` để kiểm thử server với prompt.

**Chúc mừng**! Bạn đã thành công chạy Weather MCP Server trên máy phát triển cục bộ của mình qua Agent Builder làm MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Những gì có trong mẫu

| Thư mục / Tập tin | Nội dung                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Các tập tin VSCode cho việc gỡ lỗi                   |
| `.aitk`      | Cấu hình cho Microsoft Foundry Toolkit                |
| `src`        | Mã nguồn cho weather mcp server   |

## Cách gỡ lỗi Weather MCP Server

> Ghi chú:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) là công cụ trực quan dành cho nhà phát triển để kiểm thử và gỡ lỗi các MCP server.
> - Tất cả các chế độ gỡ lỗi đều hỗ trợ điểm ngắt, vì vậy bạn có thể thêm điểm ngắt vào mã triển khai công cụ.

| Chế độ gỡ lỗi | Mô tả | Các bước để gỡ lỗi |
| ---------- | ----------- | --------------- |
| Agent Builder | Gỡ lỗi MCP server trong Agent Builder thông qua Microsoft Foundry Toolkit. | 1. Mở bảng Debug của VS Code. Chọn `Debug in Agent Builder` và nhấn `F5` để bắt đầu gỡ lỗi MCP server.<br>2. Sử dụng Microsoft Foundry Toolkit Agent Builder để kiểm thử server với [prompt này](../../../../../../../../../../../open_prompt_builder). Server sẽ tự động kết nối với Agent Builder.<br>3. Nhấn `Run` để kiểm thử server với prompt. |
| MCP Inspector | Gỡ lỗi MCP server bằng MCP Inspector. | 1. Cài đặt [Node.js](https://nodejs.org/)<br> 2. Thiết lập Inspector: `cd inspector` && `npm install` <br> 3. Mở bảng Debug của VS Code. Chọn `Debug SSE in Inspector (Edge)` hoặc `Debug SSE in Inspector (Chrome)`. Nhấn F5 để bắt đầu gỡ lỗi.<br> 4. Khi MCP Inspector khởi chạy trong trình duyệt, nhấn nút `Connect` để kết nối MCP server này.<br> 5. Sau đó bạn có thể `List Tools`, chọn một công cụ, nhập tham số, và `Run Tool` để gỡ lỗi mã server của bạn.<br> |

## Các cổng mặc định và tuỳ chỉnh

| Chế độ gỡ lỗi | Các cổng | Định nghĩa | Tùy chỉnh | Ghi chú |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Chỉnh sửa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) để thay đổi các cổng trên. | Không áp dụng |
| MCP Inspector | 3001 (Server); 5173 và 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Chỉnh sửa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) để thay đổi các cổng trên.| Không áp dụng |

## Phản hồi

Nếu bạn có bất kỳ phản hồi hoặc đề xuất nào cho mẫu này, vui lòng mở một issue trên [kho Microsoft Foundry Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->