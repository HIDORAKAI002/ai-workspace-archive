# Máy chủ MCP Thời tiết

Đây là một mẫu Máy chủ MCP viết bằng Python triển khai các công cụ thời tiết với các phản hồi giả lập. Nó có thể được sử dụng làm khuôn mẫu cho chính Máy chủ MCP của bạn. Nó bao gồm các tính năng sau:

- **Công cụ Thời tiết**: Một công cụ cung cấp thông tin thời tiết giả lập dựa trên vị trí được cung cấp.
- **Kết nối với Agent Builder**: Tính năng cho phép bạn kết nối máy chủ MCP với Agent Builder để thử nghiệm và gỡ lỗi.
- **Gỡ lỗi trong [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Tính năng cho phép bạn gỡ lỗi Máy chủ MCP sử dụng MCP Inspector.

## Bắt đầu với mẫu Máy chủ MCP Thời tiết

> **Yêu cầu cần có**
>
> Để chạy Máy chủ MCP trên máy phát triển cục bộ của bạn, bạn sẽ cần:
>
> - [Python](https://www.python.org/)
> - (*Tùy chọn - nếu bạn thích uv*) [uv](https://github.com/astral-sh/uv)
> - [Mở rộng Trình gỡ lỗi Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Chuẩn bị môi trường

Có hai cách để thiết lập môi trường cho dự án này. Bạn có thể chọn một trong hai tùy vào sở thích.

> Lưu ý: Tải lại VSCode hoặc terminal để đảm bảo python trong môi trường ảo được sử dụng sau khi tạo môi trường ảo.

| Cách tiếp cận | Các bước |
| -------- | ----- |
| Sử dụng `uv` | 1. Tạo môi trường ảo: `uv venv` <br>2. Chạy lệnh VSCode "***Python: Select Interpreter***" và chọn python từ môi trường ảo vừa tạo <br>3. Cài đặt các phụ thuộc (bao gồm phụ thuộc phát triển): `uv pip install -r pyproject.toml --extra dev` |
| Sử dụng `pip` | 1. Tạo môi trường ảo: `python -m venv .venv` <br>2. Chạy lệnh VSCode "***Python: Select Interpreter***" và chọn python từ môi trường ảo vừa tạo<br>3. Cài đặt các phụ thuộc (bao gồm phụ thuộc phát triển): `pip install -e .[dev]` | 

Sau khi thiết lập môi trường, bạn có thể chạy máy chủ trên máy phát triển cục bộ qua Agent Builder với vai trò MCP Client để bắt đầu:
1. Mở bảng Debug của VS Code. Chọn `Debug in Agent Builder` hoặc nhấn `F5` để bắt đầu gỡ lỗi máy chủ MCP.
2. Sử dụng AI Toolkit Agent Builder để thử nghiệm máy chủ với [đoạn nhắc này](../../../../../../../../../../../open_prompt_builder). Máy chủ sẽ tự động kết nối với Agent Builder.
3. Nhấn `Run` để thử nghiệm máy chủ với đoạn nhắc.

**Chúc mừng**! Bạn đã chạy thành công Máy chủ MCP Thời tiết trên máy phát triển cục bộ qua Agent Builder với vai trò MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Bao gồm trong mẫu này

| Thư mục / Tệp| Nội dung                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Các tệp VSCode cho gỡ lỗi                   |
| `.aitk`      | Các cấu hình cho AI Toolkit                |
| `src`        | Mã nguồn cho máy chủ mcp thời tiết          |

## Cách gỡ lỗi Máy chủ MCP Thời tiết

> Lưu ý:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) là công cụ phát triển trực quan để thử nghiệm và gỡ lỗi các máy chủ MCP.
> - Tất cả các chế độ gỡ lỗi đều hỗ trợ điểm ngắt, vì vậy bạn có thể thêm điểm ngắt vào mã triển khai công cụ.

| Chế độ gỡ lỗi | Mô tả | Các bước để gỡ lỗi |
| ---------- | ----------- | --------------- |
| Agent Builder | Gỡ lỗi máy chủ MCP trong Agent Builder qua AI Toolkit. | 1. Mở bảng Debug của VS Code. Chọn `Debug in Agent Builder` và nhấn `F5` để bắt đầu gỡ lỗi máy chủ MCP.<br>2. Sử dụng AI Toolkit Agent Builder để thử nghiệm máy chủ với [đoạn nhắc này](../../../../../../../../../../../open_prompt_builder). Máy chủ sẽ tự động kết nối với Agent Builder.<br>3. Nhấn `Run` để thử nghiệm máy chủ với đoạn nhắc. |
| MCP Inspector | Gỡ lỗi máy chủ MCP sử dụng MCP Inspector. | 1. Cài đặt [Node.js](https://nodejs.org/)<br> 2. Thiết lập Inspector: `cd inspector` && `npm install` <br> 3. Mở bảng Debug của VS Code. Chọn `Debug SSE in Inspector (Edge)` hoặc `Debug SSE in Inspector (Chrome)`. Nhấn F5 để bắt đầu gỡ lỗi.<br> 4. Khi MCP Inspector mở ra trong trình duyệt, nhấn nút `Connect` để kết nối máy chủ MCP này.<br> 5. Sau đó bạn có thể `List Tools`, chọn một công cụ, nhập tham số, và `Run Tool` để gỡ lỗi mã máy chủ của bạn.<br> |

## Cổng mặc định và tùy chỉnh

| Chế độ gỡ lỗi | Cổng | Định nghĩa | Tùy chỉnh | Ghi chú |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Sửa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) để thay đổi các cổng trên. | N/A |
| MCP Inspector | 3001 (Máy chủ); 5173 và 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Sửa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) để thay đổi các cổng trên.| N/A |

## Phản hồi

Nếu bạn có bất kỳ phản hồi hay đề xuất nào cho mẫu này, vui lòng mở một issue trên [kho AI Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, vui lòng lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ gốc của nó nên được coi là nguồn chính xác và đáng tin cậy nhất. Đối với các thông tin quan trọng, khuyến nghị sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm đối với bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->