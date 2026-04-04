# Weather MCP Server

Đây là một mẫu MCP Server bằng Python triển khai các công cụ thời tiết với các phản hồi giả lập. Nó có thể được sử dụng như một khung để bạn xây dựng MCP Server riêng của mình. Nó bao gồm các tính năng sau:

- **Weather Tool**: Công cụ cung cấp thông tin thời tiết giả lập dựa trên vị trí được cung cấp.
- **Git Clone Tool**: Công cụ sao chép một kho git vào thư mục được chỉ định.
- **VS Code Open Tool**: Công cụ mở một thư mục trong VS Code hoặc VS Code Insiders.
- **Connect to Agent Builder**: Tính năng cho phép bạn kết nối MCP server với Agent Builder để kiểm thử và gỡ lỗi.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Tính năng cho phép bạn gỡ lỗi MCP Server bằng MCP Inspector.

## Bắt đầu với mẫu Weather MCP Server

> **Yêu cầu trước**
>
> Để chạy MCP Server trên máy phát triển cục bộ của bạn, bạn cần:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Cần cho công cụ git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) hoặc [VS Code Insiders](https://code.visualstudio.com/insiders/) (Cần cho công cụ open_in_vscode)
> - (*Tùy chọn - nếu bạn thích uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Chuẩn bị môi trường

Có hai cách để thiết lập môi trường cho dự án này. Bạn có thể chọn một trong hai tùy theo sở thích của mình.

> Lưu ý: Khởi động lại VSCode hoặc terminal để đảm bảo python trong môi trường ảo được sử dụng sau khi tạo môi trường ảo.

| Cách tiếp cận | Các bước |
| -------- | --------- |
| Dùng `uv` | 1. Tạo môi trường ảo: `uv venv` <br>2. Chạy lệnh VSCode "***Python: Select Interpreter***" và chọn python từ môi trường ảo đã tạo <br>3. Cài đặt các phụ thuộc (bao gồm cả phụ thuộc phát triển): `uv pip install -r pyproject.toml --extra dev` |
| Dùng `pip` | 1. Tạo môi trường ảo: `python -m venv .venv` <br>2. Chạy lệnh VSCode "***Python: Select Interpreter***" và chọn python từ môi trường ảo đã tạo<br>3. Cài đặt các phụ thuộc (bao gồm cả phụ thuộc phát triển): `pip install -e .[dev]` |

Sau khi thiết lập môi trường, bạn có thể chạy server trên máy phát triển cục bộ qua Agent Builder như MCP Client để bắt đầu:
1. Mở bảng Debug trong VS Code. Chọn `Debug in Agent Builder` hoặc nhấn `F5` để bắt đầu gỡ lỗi MCP server.
2. Dùng AI Toolkit Agent Builder để thử nghiệm server với [nhắc này](../../../../../../../../../../../open_prompt_builder). Server sẽ tự động kết nối với Agent Builder.
3. Nhấn `Run` để thử server với nhắc lệnh.

**Chúc mừng**! Bạn đã chạy thành công Weather MCP Server trên máy phát triển cục bộ qua Agent Builder như MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Nội dung trong mẫu

| Thư mục / Tập tin | Nội dung                                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | Các tập tin VSCode hỗ trợ gỡ lỗi              |
| `.aitk`      | Cấu hình cho AI Toolkit                       |
| `src`        | Mã nguồn cho server weather mcp               |

## Làm thế nào để gỡ lỗi Weather MCP Server

> Lưu ý:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) là công cụ phát triển trực quan để kiểm thử và gỡ lỗi MCP server.
> - Tất cả chế độ gỡ lỗi đều hỗ trợ điểm dừng (breakpoints), bạn có thể thêm breakpoint vào mã hiện thực công cụ.

## Các Công Cụ có sẵn

### Weather Tool
Công cụ `get_weather` cung cấp thông tin thời tiết giả lập cho một vị trí xác định.

| Tham số | Kiểu | Mô tả |
| --------- | ---- | ----------- |
| `location` | chuỗi | Vị trí để lấy thông tin thời tiết (ví dụ tên thành phố, bang, hoặc tọa độ) |

### Git Clone Tool
Công cụ `git_clone_repo` sao chép một kho git vào thư mục được chỉ định.

| Tham số | Kiểu | Mô tả |
| --------- | ---- | ----------- |
| `repo_url` | chuỗi | URL của kho git cần sao chép |
| `target_folder` | chuỗi | Đường dẫn đến thư mục nơi kho sẽ được sao chép |

Công cụ trả về một đối tượng JSON gồm:
- `success`: Boolean chỉ ra liệu thao tác có thành công hay không
- `target_folder` hoặc `error`: Đường dẫn kho được sao chép hoặc thông báo lỗi

### VS Code Open Tool
Công cụ `open_in_vscode` mở một thư mục trong ứng dụng VS Code hoặc VS Code Insiders.

| Tham số | Kiểu | Mô tả |
| --------- | ---- | ----------- |
| `folder_path` | chuỗi | Đường dẫn thư mục cần mở |
| `use_insiders` | boolean (tùy chọn) | Có sử dụng VS Code Insiders thay vì VS Code thông thường hay không |

Công cụ trả về một đối tượng JSON gồm:
- `success`: Boolean chỉ ra thao tác có thành công hay không
- `message` hoặc `error`: Thông điệp xác nhận hoặc thông báo lỗi

| Chế độ gỡ lỗi | Mô tả | Các bước gỡ lỗi |
| ---------- | ----------- | --------------- |
| Agent Builder | Gỡ lỗi MCP server trong Agent Builder qua AI Toolkit. | 1. Mở bảng Debug VS Code. Chọn `Debug in Agent Builder` và nhấn `F5` để bắt đầu gỡ lỗi MCP server.<br>2. Dùng AI Toolkit Agent Builder để thử server với [nhắc này](../../../../../../../../../../../open_prompt_builder). Server sẽ tự động kết nối Agent Builder.<br>3. Nhấn `Run` để thử server với nhắc lệnh. |
| MCP Inspector | Gỡ lỗi MCP server sử dụng MCP Inspector. | 1. Cài đặt [Node.js](https://nodejs.org/)<br> 2. Thiết lập Inspector: `cd inspector` && `npm install` <br> 3. Mở bảng Debug VS Code. Chọn `Debug SSE in Inspector (Edge)` hoặc `Debug SSE in Inspector (Chrome)`. Nhấn F5 để bắt đầu gỡ lỗi.<br> 4. Khi MCP Inspector khởi chạy trên trình duyệt, nhấn nút `Connect` để kết nối MCP server này.<br> 5. Sau đó bạn có thể `List Tools`, chọn một công cụ, nhập tham số, và `Run Tool` để gỡ lỗi mã server.<br> |

## Các cổng mặc định và tuỳ chỉnh

| Chế độ gỡ lỗi | Cổng | Định nghĩa | Tùy chỉnh | Ghi chú |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Chỉnh sửa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) để thay đổi các cổng trên. | N/A |
| MCP Inspector | 3001 (Server); 5173 và 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Chỉnh sửa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) để thay đổi các cổng trên.| N/A |

## Phản hồi

Nếu bạn có bất kỳ phản hồi hoặc đề xuất nào cho mẫu này, vui lòng mở một issue trên [kho AI Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ ban đầu nên được coi là nguồn tham khảo chính thức. Đối với các thông tin quan trọng, nên sử dụng dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->