# Changelog: MCP cho Người Mới Bắt Đầu

Tài liệu này đóng vai trò là hồ sơ ghi lại tất cả các thay đổi quan trọng được thực hiện đối với chương trình giảng dạy Model Context Protocol (MCP) cho Người Mới Bắt Đầu. Các thay đổi được ghi lại theo thứ tự thời gian ngược (thay đổi mới nhất ở đầu).

## Ngày 24 tháng 6, 2026

### Bài học mới: Sử dụng MCP trong ứng dụng Copilot

- [Mục Công cụ](./12-tooling/README.md) Đã thêm mục công cụ.
- [MCP trong ứng dụng Copilot](./12-tooling/01-copilot-app/README.md)

## Ngày 16 tháng 6, 2026

### Căn chỉnh Đặc tả MCP & Xác nhận Mẫu

Đã xác thực chương trình giảng dạy so với **Đặc tả MCP 2025-11-25** hiện hành và các SDK chính thức mới nhất, sau đó chỉnh sửa các tham chiếu đặc tả lỗi thời còn lại và xác nhận các mẫu lõi vẫn xây dựng và chạy được.

#### Sửa lỗi Phiên bản Đặc tả (2025-06-18 / 2025-03-26 → 2025-11-25)

Cập nhật nội dung tiếng Anh nơi vẫn còn ghi phiên bản đặc tả cũ là tiêu chuẩn *hiện tại/mới nhất*, đồng thời chuyển hướng các liên kết sang đường dẫn đặc tả chuẩn của `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Cập nhật bảng hiển thị "Tiêu chuẩn Hiện tại", phần giới thiệu, tiêu đề nguyên tắc bảo mật cốt lõi, tiêu đề các yêu cầu bắt buộc, mục Microsoft Entra ID, liên kết Tham chiếu & Tài nguyên, và thông báo bảo mật cuối cùng (8 tham chiếu) sang 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Cập nhật liên kết tài nguyên bổ sung của đặc tả và bảng "Tiêu chuẩn Hiện tại" sang 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Thay thế liên kết lỗi thời `2025-03-26` về bảo mật và tin cậy bằng trang thực hành bảo mật tốt nhất 2025-11-25 hiện tại
- **03-GettingStarted/14-sampling/README.md**: Cập nhật liên kết tài liệu sampling chính thức sang 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Cập nhật tham chiếu thời hiện tại "đặc tả MCP hiện hành" và liên kết tài nguyên bổ sung sang 2025-11-25 (ghi chú lịch sử về SSE-deprecation giữ nguyên để đảm bảo chính xác)

#### Xác nhận Mẫu với SDK Hiện tại

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` giải quyết `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` không có lỗi kiểu — API `McpServer`/`StdioServerTransport` hiện có vẫn hợp lệ
- **Python (03-GettingStarted/01-first-server/solution/python)**: Xác thực trong môi trường `.venv` cô lập với `mcp[cli]` (1.27.2); `py_compile` thành công và `FastMCP.list_tools()` trả về chính xác công cụ `add` và `subtract`
- Xác nhận tất cả các phạm vi phiên bản mẫu của `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) đều được giải quyết sạch sang phiên bản `1.29.0` hiện hành mà không có thay đổi API phá vỡ

#### Căn chỉnh Khóa Phụ thuộc (đóng khoảng cách phiên bản)

Đã nâng cấp các khóa SDK lỗi thời để mọi mẫu đều theo dõi phiên bản MCP hiện tại, phù hợp với quy ước toàn repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Nâng cấp `@modelcontextprotocol/sdk` từ `^1.8.0` → `>=1.26.0` và cập nhật mô tả package cũ `"updated for MCP 2025-06-18"` thành `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** và **lab4/code/github_mcp_server/pyproject.toml**: Nâng cấp chính xác pin `mcp==1.23.0` → `mcp>=1.26.0`; tái tạo cả hai file `uv.lock` (`uv lock`) để lockfile giải quyết sang phiên bản `mcp 1.27.2` hiện tại và giữ đồng bộ với các manifest

#### Phân tích Khoảng trống Chương trình — Bao phủ Tính năng Đặc tả Mới nhất

Xác nhận chương trình giảng dạy đã bao phủ tất cả các nguyên thủy được giới thiệu/mở rộng trong MCP 2025-11-25, do đó không còn khoảng trống nội dung:
- **Sampling**: Bài học 03-GettingStarted/14-sampling cộng thêm 05-AdvancedTopics/mcp-sampling
- **Elicitation (bao gồm chế độ URL)**: Được tài liệu trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Được tài liệu trong 00-Introduction, 01-CoreConcepts, và 05-AdvancedTopics/mcp-root-contexts
- **Tasks (thử nghiệm, các thao tác dài hạn)**: Được tài liệu trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features
- **Chú thích Công cụ** (`readOnlyHint` / `destructiveHint`): Được tài liệu trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features

### Tăng cường An ninh & Khắc phục Lỗ hổng Phụ thuộc

Đã thực hiện kiểm tra bảo mật toàn bộ mọi tệp manifest phụ thuộc và mã nguồn mẫu, sau đó khắc phục mọi cảnh báo npm và một phát hiện cấp độ mã. Sau khi khắc phục, `npm audit` báo cáo **0 lỗ hổng** ở mọi thư mục được kiểm tra.

#### Lỗ hổng Phụ thuộc npm (truyền dẫn) — Đã sửa

Đã kiểm tra tất cả 15 tệp `package-lock.json` cam kết. Lỗ hổng chỉ giới hạn ở phụ thuộc truyền dẫn do công cụ phát triển MCP Inspector, client OpenAI, và MCP SDK kéo vào; tất cả giờ đã được giải quyết mà không làm phá vỡ các mẫu:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** và **lab3/code/weather_mcp/inspector**: Nâng cấp `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), đã khắc phục các cảnh báo liên quan đến `ajv`, `brace-expansion`, `diff`, `path-to-regexp` và `ws` đi kèm. Thêm mục `overrides` npm ép phiên bản vá `shell-quote@1.8.4` nhằm loại bỏ cảnh báo nghiêm trọng còn lại do `concurrently`; tái tạo cả hai lockfile (giờ không còn lỗ hổng)
- **03-GettingStarted/samples/typescript**: `npm audit fix` nâng cấp phụ thuộc truyền dẫn `qs` (mức độ vừa phải) lên bản vá
- **03-GettingStarted/samples/javascript**: `npm audit fix` nâng cấp phụ thuộc truyền dẫn `hono` (mức độ vừa phải) lên bản vá
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` nâng cấp phụ thuộc truyền dẫn `form-data` (mức độ cao) lên bản vá
- **03-GettingStarted/11-simple-auth/solution/typescript**: Tạo tệp `package-lock.json` thiếu để dự án có thể tái tạo và kiểm tra (0 lỗ hổng)

#### Sửa lỗi Bảo mật Cấp độ Mã (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Đã loại bỏ `shell=True` khỏi công cụ `open_in_vscode`. Trước đó, `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` cho phép ký tự đặc biệt shell trong đường dẫn thư mục được chạy bởi `cmd.exe` (đường dẫn injection). Bây giờ, nó khởi chạy trực tiếp `Code.exe` đã xác định với thư mục làm đối số — không dùng shell — tương đương chức năng và an toàn

#### Kiểm tra Phụ thuộc Python

- Kiểm tra tất cả tập hợp phụ thuộc Python với `pip-audit`. `05-AdvancedTopics` và `03-GettingStarted/samples/python` báo cáo **không có lỗ hổng đã biết** (các phạm vi `mcp` / `httpx` / `pydantic` / `python-dotenv` của họ đều giải quyết sang các bản vá mới nhất)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` cảnh báo phụ thuộc truyền dẫn **`werkzeug` 3.1.1** với ba cảnh báo `safe_join` liên quan đến tên thiết bị Windows DoS — `CVE-2025-66221`, `CVE-2026-21860`, và `CVE-2026-27199` (tất cả đã được sửa trong 3.1.6). Đã thêm ghim bảo mật rõ ràng `werkzeug>=3.1.6` để giải quyết bản vá; xác nhận hạn chế giải quyết đúng trong stack `chainlit` / `mcp` / `semantic-kernel`

### Đổi tên Thương hiệu Sản phẩm

Cập nhật toàn bộ nội dung chương trình để phản ánh việc đổi tên thương hiệu sản phẩm của Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Cập nhật liên kết cộng đồng Discord
- **AGENTS.md**: Cập nhật tham chiếu server Discord
- **README.md**: Cập nhật các tham chiếu hệ sinh thái công nghệ
- **study_guide.md**: Cập nhật các tham chiếu nghiên cứu tình huống
- **05-AdvancedTopics/README.md**: Cập nhật tiêu đề và mô tả Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Cập nhật tiêu đề phần và mô tả
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Cập nhật toàn bộ tiêu đề và nội dung module
- **05-AdvancedTopics/mcp-security-entra/README.md**: Cập nhật liên kết tham chiếu chéo
- **07-LessonsfromEarlyAdoption/README.md**: Cập nhật tham chiếu tình huống
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Cập nhật tiêu đề Phần 9, các huy hiệu, và khả năng
- **08-BestPractices/README.md**: Cập nhật liên kết cộng đồng Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Cập nhật tham chiếu kênh Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Cập nhật tham chiếu triển khai mô hình
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Cập nhật bảng Dịch vụ AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Cập nhật các tham chiếu tài nguyên

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension cho VS Code
- **README.md**: Cập nhật các tham chiếu chính của chương trình
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Cập nhật tiêu đề module, tổng quan và tất cả tiêu đề phần của module
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Cập nhật tiêu đề, mục tiêu học tập, hướng dẫn thiết lập và tài nguyên
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Cập nhật tiêu đề, mục tiêu học tập, bảng máy chủ MCP và liên kết chéo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Cập nhật tiêu đề, huy hiệu, điều kiện tiên quyết và tài nguyên
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Cập nhật tham chiếu Agent Builder và liên kết phản hồi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Cập nhật điều kiện tiên quyết và tham chiếu phần mở rộng

---

## Ngày 11 tháng 4, 2026

### Bài học mới, Sửa lỗi Tài liệu và Cập nhật Phụ thuộc

#### Nội dung Chương Trình Giảng Dạy Mới Thêm

**Module 05 - Chủ đề Nâng cao**
- **Bài học 5.17: Lý luận Đối kháng Đa tác nhân với MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Hướng dẫn toàn diện mới về mô hình tranh luận đối kháng cho hệ đa tác nhân
  - Sơ đồ kiến trúc Mermaid: hai tác nhân → máy chủ MCP chia sẻ → bản ghi tranh luận → trọng tài → phán quyết
  - Máy chủ công cụ MCP chia sẻ (`web_search` + `run_python`) được triển khai bằng Python và TypeScript
  - Các lời nhắc hệ thống đối lập (THÍCH / PHẢN ĐỐI / Trọng tài) với yêu cầu sử dụng công cụ rõ ràng
  - Điều phối viên tranh luận bằng Python, TypeScript và C# quản lý các vòng và điều hướng lập luận
  - Cấu hình `ClientSession` MCP cho điều phối viên gọi công cụ thực tế
  - Bảng trường hợp sử dụng (phát hiện ảo giác, mô hình hóa mối đe dọa, đánh giá thiết kế API, xác minh thực tế, lựa chọn công nghệ)
  - Các cân nhắc bảo mật: thực thi trong sandbox, xác thực gọi công cụ, giới hạn tần suất, ghi nhật ký kiểm toán
  - Bài tập có cấu trúc với ba kịch bản thực tế (đánh giá mã, quyết định kiến trúc, kiểm duyệt nội dung)

#### Sửa lỗi Tài liệu

**Module 03 - Bắt đầu**
- **05-stdio-server/README.md**: Sửa lỗi ví dụ TypeScript stdio server chưa hoàn chỉnh — thêm phần khởi tạo giao vận thiếu (`new StdioServerTransport()`) và gọi `server.connect(transport)` để khớp ví dụ Python và .NET trong cùng phần
- **14-sampling/README.md**: Sửa lỗi chính tả — sửa `"Sampling is an davanced features"` thành `"Sampling is an advanced feature"`

#### Cập nhật Chương trình Giảng dạy

**README.md chính**
- Thêm mục 5.17 (Lý luận Đối kháng Đa tác nhân với MCP) vào bảng chương trình với liên kết trực tiếp đến bài học mới

**05-AdvancedTopics/README.md**
- Thêm dòng Bài học 5.17 vào bảng bài học

**study_guide.md**
- Thêm chủ đề Lý luận Đối kháng Đa tác nhân vào sơ đồ tư duy và mô tả văn bản của Chủ đề Nâng cao

#### Sửa lỗi Mã và Bảo mật

**Module 05 - Tác nhân Đối kháng (`mcp-adversarial-agents`)**
- **Sửa lỗi bảo mật — chèn lệnh**: Thay thế nội suy shell `execSync` bằng `execFile` + `promisify` trong công cụ TypeScript `run_python`, loại bỏ lỗ hổng chèn lệnh (mã do LLM kiểm soát giờ được truyền dưới dạng phần tử argv dạng ký tự thô không qua shell)
- **Điều phối vòng lặp công cụ MCP**: Cập nhật bộ điều phối tranh luận Python sử dụng client `AsyncAnthropic` (thay thế `Anthropic` đồng bộ chặn), truyền trực tiếp `ClientSession` sống cho từng lượt tác nhân, lấy định nghĩa công cụ qua `session.list_tools()` ở mỗi lượt, và gửi các block `tool_use` qua `session.call_tool()` trong một vòng lặp cho đến khi mô hình phát ra phản hồi văn bản cuối cùng

#### Cập nhật phụ thuộc

- Nâng cấp `hono` lên 4.12.12 trên nhiều gói (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Nâng cấp `@hono/node-server` từ 1.19.11 lên 1.19.13 trong các gói TypeScript
- Nâng cấp `cryptography` từ 46.0.5 lên 46.0.7 trong các gói Python (10-StreamliningAIWorkflows lab 3 và 4)
- Nâng cấp `lodash` từ 4.17.23 lên 4.18.1 trong inspector 10-StreamliningAIWorkflows

#### Dịch thuật

- Đồng bộ bản dịch cho hơn 48 ngôn ngữ với các thay đổi nguồn mới nhất (cập nhật i18n)

---

## Ngày 5 tháng 2, 2026

### Cải tiến xác thực và điều hướng trên toàn kho mã

#### Thêm nội dung chương trình học mới

**Module 03 - Bắt đầu**
- **12-mcp-hosts/README.md**: Hướng dẫn toàn diện mới cho việc thiết lập các máy chủ MCP
  - Ví dụ cấu hình Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Mẫu cấu hình JSON cho tất cả các máy chủ chính
  - Bảng so sánh các loại giao thức truyền (stdio, SSE/HTTP, WebSocket)
  - Xử lý sự cố các vấn đề kết nối phổ biến
  - Thực tiễn an ninh tốt nhất cho cấu hình máy chủ

- **13-mcp-inspector/README.md**: Hướng dẫn gỡ lỗi mới cho MCP Inspector
  - Các phương pháp cài đặt (npx, npm global, từ nguồn)
  - Kết nối tới server qua stdio và HTTP/SSE
  - Các công cụ kiểm thử, tài nguyên, quy trình yêu cầu
  - Tích hợp VS Code với MCP Inspector
  - Các kịch bản gỡ lỗi phổ biến kèm giải pháp

**Module 04 - Triển khai thực tế**
- **pagination/README.md**: Hướng dẫn triển khai phân trang mới
  - Mẫu phân trang dựa trên con trỏ (cursor) bằng Python, TypeScript, Java
  - Xử lý phân trang phía client
  - Chiến lược thiết kế con trỏ (mờ đục vs có cấu trúc)
  - Khuyến nghị tối ưu hiệu suất

**Module 05 - Chủ đề nâng cao**
- **mcp-protocol-features/README.md**: Phân tích sâu các tính năng giao thức mới
  - Triển khai thông báo tiến độ
  - Mẫu hủy yêu cầu
  - Mẫu tài nguyên với mẫu URI
  - Quản lý vòng đời server
  - Điều khiển mức độ ghi nhật ký
  - Mẫu xử lý lỗi với mã JSON-RPC

#### Sửa lỗi điều hướng (cập nhật hơn 24 file)

**README các module chính**  
 Bây giờ liên kết đến cả bài học đầu tiên VÀ module tiếp theo

**Các file trong 02-Security**  
 Tất cả 5 tài liệu bổ sung an ninh giờ có điều hướng "Tiếp theo là gì"

**Các file 09-CaseStudy**  
 Tất cả các file nghiên cứu tình huống giờ có điều hướng tuần tự

**Labs 10-StreamliningAI**  
 Thêm phần "Tiếp theo là gì" vào tổng quan Module 10 và Module 11

#### Sửa lỗi mã và nội dung

**Cập nhật SDK và phụ thuộc**  
 Sửa phiên bản openai trống thành `^4.95.0`  
 Cập nhật SDK từ `^1.8.0` lên `>=1.26.0`  
 Cập nhật mcp pin phiên bản lên `>=1.26.0`

**Sửa lỗi mã**  
 Sửa model không hợp lệ `gpt-4o-mini` thành `gpt-4.1-mini`

**Sửa lỗi nội dung**  
 Sửa liên kết hỏng `READMEmd` → `README.md`, sửa tiêu đề chương trình học `Module 1-3` → `Module 0-3`, sửa đường dẫn phân biệt chữ hoa chữ thường  
 Xóa nội dung trùng lặp bị hỏng của Case Study 5

**Cải thiện hướng dẫn cho người mới bắt đầu**  
 Thêm phần giới thiệu đúng đắn, mục tiêu học tập, và yêu cầu trước cho người mới bắt đầu

#### Cập nhật chương trình học

**README.md chính**  
- Thêm các mục 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Phân trang), 5.16 (Tính năng giao thức) vào bảng chương trình học

**README các module**  
 Thêm bài học 12 và 13 vào danh sách bài học  
 Thêm phần Hướng dẫn thực hành với liên kết phân trang  
 Thêm bài học 5.15 (Giao thức tùy chỉnh) và 5.16 (Tính năng giao thức)

**study_guide.md**  
- Cập nhật sơ đồ tư duy với tất cả chủ đề mới: Thiết lập MCP Hosts, MCP Inspector, Chiến lược phân trang, Phân tích tính năng giao thức

## Ngày 28 tháng 1, 2026

### Đánh giá tuân thủ MCP Specification 2025-11-25

#### Nâng cấp khái niệm cốt lõi (01-CoreConcepts/)
- **Primitive Client Mới - Roots**: Thêm tài liệu toàn diện về primitive client Roots, cho phép server hiểu ranh giới hệ thống tập tin và quyền truy cập
- **Chú thích Tool**: Thêm tài liệu về chú thích hành vi công cụ (`readOnlyHint`, `destructiveHint`) để quyết định thực thi công cụ tốt hơn
- **Gọi công cụ trong Sampling**: Cập nhật tài liệu Sampling bổ sung tham số `tools` và `toolChoice` để mô hình lựa chọn công cụ khi lấy mẫu yêu cầu
- **URL Mode Elicitation**: Bổ sung tài liệu về khai thác tương tác web bên ngoài do server khởi xướng dựa trên URL
- **Tasks (Thử nghiệm)**: Thêm phần mới mô tả tính năng Tasks thử nghiệm cho bọc thực thi bền vững và truy xuất kết quả hoãn lại
- **Hỗ trợ Icon**: Ghi chú giờ công cụ, tài nguyên, mẫu tài nguyên và prompt có thể chứa icon làm metadata bổ sung

#### Cập nhật tài liệu
- **README.md**: Thêm tham chiếu phiên bản MCP Specification 2025-11-25 và giải thích phiên bản theo ngày
- **study_guide.md**: Cập nhật bản đồ chương trình học gồm Tasks và chú thích công cụ ở phần Core Concepts; cập nhật dấu thời gian tài liệu

#### Xác minh tuân thủ specification
- **Phiên bản giao thức**: Xác nhận tất cả tài liệu tham chiếu đúng MCP Specification 2025-11-25 hiện tại
- **Đồng bộ kiến trúc**: Xác nhận chính xác tài liệu kiến trúc tầng đôi (Data Layer + Transport Layer)
- **Tài liệu các primitives**: Xác minh primitives server (Resources, Prompts, Tools) và primitives client (Sampling, Elicitation, Logging, Roots)
- **Cơ chế truyền**: Xác minh chính xác tài liệu truyền STDIO và HTTP có thể stream
- **Hướng dẫn bảo mật**: Xác nhận phù hợp với tài liệu thực hành tốt nhất bảo mật MCP mới nhất

#### Các tính năng chính MCP 2025-11-25 được tài liệu hóa
- **OpenID Connect Discovery**: Khám phá máy chủ xác thực qua OIDC
- **Tài liệu metadata OAuth Client ID**: Cơ chế đăng ký client được khuyến nghị
- **JSON Schema 2020-12**: Ngôn ngữ chuẩn mặc định cho khai báo schema MCP
- **Hệ thống phân cấp SDK**: Yêu cầu chính thức về hỗ trợ và duy trì tính năng SDK
- **Cơ cấu quản trị**: Xác lập chính thức các nhóm công tác và nhóm quan tâm trong quản trị MCP

### Cập nhật lớn tài liệu bảo mật (02-Security/)

#### Tích hợp Hội thảo MCP Security Summit (Sherpa)
- **Tài nguyên đào tạo thực hành mới**: Thêm tích hợp toàn diện với [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) trong toàn bộ tài liệu bảo mật
- **Lộ trình hành trình thám hiểm**: Tài liệu đầy đủ tiến trình từ Base Camp đến Summit
- **Đồng bộ với OWASP**: Tất cả hướng dẫn bảo mật giờ liên kết với hướng dẫn OWASP MCP Azure Security Guide

#### Tích hợp OWASP MCP Top 10
- **Mục mới**: Thêm bảng rủi ro bảo mật OWASP MCP Top 10 với biện pháp Azure vào README bảo mật chính
- **Tài liệu theo rủi ro**: Cập nhật mcp-security-controls-2025.md với tham chiếu rủi ro OWASP MCP cho từng miền bảo mật
- **Kiến trúc tham khảo**: Liên kết đến kiến trúc tham khảo và mẫu triển khai của OWASP MCP Azure Security Guide

#### Cập nhật các file bảo mật
- **README.md**: Thêm tổng quan Hội thảo Sherpa, bảng lộ trình hành trình, tóm tắt rủi ro OWASP MCP Top 10 và phần đào tạo thực hành
- **mcp-security-controls-2025.md**: Cập nhật tiêu đề tháng 2 năm 2026, thêm tham chiếu rủi ro OWASP MCP (MCP01-MCP08), sửa lỗi không nhất quán phiên bản spec
- **mcp-security-best-practices-2025.md**: Thêm phần tài nguyên Sherpa và OWASP, cập nhật dấu thời gian
- **mcp-best-practices.md**: Thêm phần đào tạo thực hành với liên kết Sherpa và OWASP
- **azure-content-safety-implementation.md**: Thêm tham chiếu OWASP MCP06, đồng bộ với Sherpa Camp 3 và phần tài nguyên bổ sung

#### Thêm liên kết tài nguyên mới
- [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Các trang rủi ro OWASP MCP riêng lẻ (MCP01-MCP10)

### Đồng bộ MCP Specification 2025-11-25 trên toàn chương trình học

#### Module 03 - Bắt đầu
- **Tài liệu SDK**: Thêm Go SDK vào danh sách SDK chính thức; cập nhật tất cả tham chiếu SDK phù hợp với MCP Specification 2025-11-25
- **Làm rõ giao thức truyền**: Cập nhật mô tả giao thức STDIO và HTTP Streaming với tham chiếu spec rõ ràng

#### Module 04 - Triển khai thực tế
- **Cập nhật SDK**: Thêm Go SDK; cập nhật danh sách SDK với tham chiếu phiên bản spec
- **Spec xác thực**: Cập nhật liên kết MCP Authorization spec lên phiên bản 2025-11-25 hiện tại

#### Module 05 - Chủ đề nâng cao
- **Tính năng mới**: Thêm chú ý về các tính năng mới MCP Specification 2025-11-25 (Tasks, Chú thích công cụ, URL Mode Elicitation, Roots)
- **Tài nguyên an ninh**: Thêm liên kết OWASP MCP Top 10 và hội thảo Sherpa vào tài liệu tham khảo bổ sung

#### Module 06 - Đóng góp cộng đồng
- **Danh sách SDK**: Thêm Swift và Rust SDK; cập nhật liên kết spec MCP Specification 2025-11-25
- **Tham chiếu spec**: Cập nhật liên kết MCP Specification đến URL spec chính thức

#### Module 07 - Bài học từ áp dụng sớm
- **Cập nhật tài nguyên**: Thêm liên kết MCP Specification 2025-11-25 và OWASP MCP Top 10 vào tài nguyên bổ sung

#### Module 08 - Thực hành tốt nhất
- **Phiên bản spec**: Cập nhật tham chiếu MCP Specification thành 2025-11-25
- **Tài nguyên bảo mật**: Thêm OWASP MCP Top 10 và hội thảo Sherpa vào tài nguyên bổ sung

#### Module 10 - Tinh giản quy trình AI
- **Cập nhật huy hiệu**: Đổi huy hiệu phiên bản MCP từ phiên bản SDK (1.9.3) sang phiên bản spec (2025-11-25)
- **Liên kết tài nguyên**: Cập nhật liên kết MCP Specification; thêm OWASP MCP Top 10

#### Module 11 - Labs MCP Server thực hành
- **Tham chiếu spec**: Cập nhật liên kết MCP Specification lên phiên bản 2025-11-25
- **Tài nguyên bảo mật**: Thêm OWASP MCP Top 10 vào tài nguyên chính thức

## Ngày 18 tháng 12, 2025

### Cập nhật tài liệu bảo mật - MCP Specification 2025-11-25

#### Thực hành tốt nhất bảo mật MCP (02-Security/mcp-best-practices.md) - Cập nhật phiên bản spec
- **Cập nhật phiên bản giao thức**: Tham chiếu phiên bản MCP Specification 2025-11-25 mới nhất (phát hành ngày 25 tháng 11 năm 2025)
  - Cập nhật tất cả tham chiếu phiên bản spec từ 2025-06-18 thành 2025-11-25
  - Cập nhật ngày tháng tài liệu từ 18 tháng 8 năm 2025 thành 18 tháng 12 năm 2025
  - Xác nhận tất cả URL spec trỏ đến tài liệu hiện tại
- **Kiểm tra nội dung**: Kiểm tra toàn diện thực hành bảo mật tốt nhất theo tiêu chuẩn mới nhất
  - **Giải pháp bảo mật Microsoft**: Xác nhận thuật ngữ và liên kết hiện tại cho Prompt Shields (trước đây “phát hiện rủi ro jailbreak”), Azure Content Safety, Microsoft Entra ID, và Azure Key Vault
  - **Bảo mật OAuth 2.1**: Đảm bảo phù hợp với thực hành bảo mật OAuth mới nhất
  - **Tiêu chuẩn OWASP**: Xác minh tham chiếu OWASP Top 10 cho LLM vẫn còn hiệu lực
  - **Dịch vụ Azure**: Xác nhận tất cả liên kết tài liệu Microsoft Azure và thực hành tốt nhất
- **Đồng bộ tiêu chuẩn**: Tất cả tiêu chuẩn bảo mật tham chiếu đều là phiên bản hiện hành
  - Khung quản lý rủi ro AI NIST
  - ISO 27001:2022
  - Thực hành bảo mật OAuth 2.1
  - Các khung bảo mật và tuân thủ Azure
- **Tài nguyên triển khai**: Xác nhận tất cả liên kết hướng dẫn và tài nguyên triển khai
  - Mẫu xác thực Azure API Management
  - Hướng dẫn tích hợp Microsoft Entra ID
  - Quản lý bí mật Azure Key Vault
  - Giải pháp pipeline DevSecOps và giám sát

### Đảm bảo chất lượng tài liệu
- **Tuân thủ spec**: Đảm bảo tất cả yêu cầu bảo mật MCP bắt buộc (MUST/MUST NOT) phù hợp với spec mới nhất
- **Tính cập nhật của tài nguyên**: Xác nhận tất cả liên kết bên ngoài tới tài liệu Microsoft, tiêu chuẩn bảo mật, và hướng dẫn triển khai
- **Phủ sóng thực hành tốt nhất**: Đảm bảo bao phủ toàn diện xác thực, phân quyền, các mối đe dọa AI cụ thể, bảo mật chuỗi cung ứng và mẫu doanh nghiệp

## Ngày 6 tháng 10, 2025

### Mở rộng phần Bắt đầu – Sử dụng Server nâng cao và Xác thực đơn giản

#### Sử dụng Server nâng cao (03-GettingStarted/10-advanced)  
- **Thêm chương mới**: Giới thiệu hướng dẫn toàn diện về sử dụng server MCP nâng cao, bao gồm cả kiến trúc server thông thường và kiến trúc server cấp thấp.
  - **Máy chủ Thông thường vs. Máy chủ Cấp thấp**: So sánh chi tiết và ví dụ mã trong Python và TypeScript cho cả hai phương pháp.
  - **Thiết kế Dựa trên Bộ xử lý (Handler)**: Giải thích quản lý công cụ/tài nguyên/lời nhắc dựa trên bộ xử lý cho các triển khai máy chủ có khả năng mở rộng và linh hoạt.
  - **Mẫu Thực tiễn**: Các kịch bản thực tế mà mẫu máy chủ cấp thấp có lợi cho các tính năng nâng cao và kiến trúc.

#### Xác thực Đơn giản (03-GettingStarted/11-simple-auth)
- **Chương Mới Thêm**: Hướng dẫn từng bước để triển khai xác thực đơn giản trong các máy chủ MCP.
  - **Khái niệm Xác thực**: Giải thích rõ ràng về xác thực so với ủy quyền, và xử lý chứng thực.
  - **Triển khai Xác thực Cơ bản**: Mẫu xác thực dựa trên middleware trong Python (Starlette) và TypeScript (Express), với các mẫu mã.
  - **Tiến tới Bảo mật Nâng cao**: Hướng dẫn bắt đầu với xác thực đơn giản và tiến tới OAuth 2.1 và RBAC, với tham chiếu tới các mô-đun bảo mật nâng cao.

Những bổ sung này cung cấp hướng dẫn thực tiễn, thực hành để xây dựng các triển khai máy chủ MCP mạnh mẽ, an toàn và linh hoạt hơn, kết nối các khái niệm nền tảng với mẫu sản xuất nâng cao.

## 29 tháng 9, 2025

### Phòng Thí nghiệm Tích hợp Cơ sở Dữ liệu Máy chủ MCP - Lộ trình Học tập Thực hành Toàn diện

#### 11-MCPServerHandsOnLabs - Chương trình Học Tích hợp Cơ sở Dữ liệu Hoàn chỉnh Mới
- **Lộ trình Học 13 Phòng Thí nghiệm Hoàn chỉnh**: Thêm chương trình học thực hành toàn diện để xây dựng các máy chủ MCP sẵn sàng sản xuất với tích hợp cơ sở dữ liệu PostgreSQL
  - **Triển khai Thực tế**: Trường hợp sử dụng phân tích bán lẻ Zava minh họa các mẫu chuẩn cấp doanh nghiệp
  - **Tiến trình Học Tập Có Cấu trúc**:
    - **Phòng thí nghiệm 00-03: Nền tảng** - Giới thiệu, Kiến trúc Cốt lõi, Bảo mật & Đa người thuê, Thiết lập Môi trường
    - **Phòng thí nghiệm 04-06: Xây dựng Máy chủ MCP** - Thiết kế & Lược đồ Cơ sở dữ liệu, Triển khai Máy chủ MCP, Phát triển Công cụ  
    - **Phòng thí nghiệm 07-09: Tính năng Nâng cao** - Tích hợp Tìm kiếm Ngữ nghĩa, Kiểm thử & Gỡ lỗi, Tích hợp VS Code
    - **Phòng thí nghiệm 10-12: Sản xuất & Thực hành Tốt nhất** - Chiến lược Triển khai, Giám sát & Quan sát, Thực hành Tốt nhất & Tối ưu hóa
  - **Công nghệ Doanh nghiệp**: Khung FastMCP, PostgreSQL với pgvector, nhúng Azure OpenAI, Azure Container Apps, Application Insights
  - **Tính năng Nâng cao**: Bảo mật Cấp độ Hàng (RLS), tìm kiếm ngữ nghĩa, truy cập dữ liệu đa người thuê, nhúng vector, giám sát thời gian thực

#### Chuẩn hóa Thuật ngữ - Chuyển đổi Mô-đun sang Phòng thí nghiệm
- **Cập nhật Tài liệu Toàn diện**: Hệ thống cập nhật tất cả file README trong 11-MCPServerHandsOnLabs để dùng thuật ngữ "Phòng thí nghiệm" thay vì "Mô-đun"
  - **Tiêu đề Phần**: Cập nhật "What This Module Covers" thành "What This Lab Covers" ở toàn bộ 13 phòng thí nghiệm
  - **Mô tả Nội dung**: Thay đổi "This module provides..." thành "This lab provides..." trong toàn bộ tài liệu
  - **Mục tiêu Học tập**: Cập nhật "By the end of this module..." thành "By the end of this lab..." 
  - **Liên kết Điều hướng**: Chuyển đổi tất cả tham chiếu "Module XX:" thành "Lab XX:" trong các tham chiếu chéo và điều hướng
  - **Theo dõi Hoàn thành**: Cập nhật "After completing this module..." thành "After completing this lab..."
  - **Bảo tồn Tham chiếu Kỹ thuật**: Giữ nguyên tham chiếu mô-đun Python trong các file cấu hình (ví dụ: `"module": "mcp_server.main"`)

#### Nâng cao Hướng dẫn Học tập (study_guide.md)
- **Bản đồ Chương trình Trực quan**: Thêm phần mới "11. Database Integration Labs" với biểu đồ cấu trúc phòng thí nghiệm toàn diện
- **Cấu trúc Kho lưu trữ**: Cập nhật từ mười lên mười một phần chính với mô tả chi tiết 11-MCPServerHandsOnLabs
- **Hướng dẫn Lộ trình Học tập**: Cải thiện chỉ dẫn điều hướng bao phủ phần 00-11
- **Phạm vi Công nghệ**: Thêm chi tiết tích hợp FastMCP, PostgreSQL, dịch vụ Azure
- **Kết quả Học tập**: Nhấn mạnh phát triển máy chủ sẵn sàng sản xuất, mẫu tích hợp cơ sở dữ liệu, và bảo mật doanh nghiệp

#### Nâng cao Cấu trúc README Chính
- **Thuật ngữ Dựa trên Phòng thí nghiệm**: Cập nhật README.md chính trong 11-MCPServerHandsOnLabs để nhất quán dùng cấu trúc "Phòng thí nghiệm"
- **Tổ chức Lộ trình Học tập**: Tiến triển rõ ràng từ khái niệm nền tảng qua triển khai nâng cao đến triển khai sản xuất
- **Tập trung Thực tế**: Nhấn mạnh học tập thực hành với các mẫu và công nghệ cấp doanh nghiệp

### Cải thiện Chất lượng & Độ nhất quán Tài liệu
- **Nhấn mạnh Học tập Thực hành**: Củng cố phương pháp học tập dựa trên phòng thí nghiệm xuyên suốt tài liệu
- **Tập trung Mẫu Doanh nghiệp**: Nâng cao các triển khai sẵn sàng sản xuất và cân nhắc bảo mật doanh nghiệp
- **Tích hợp Công nghệ**: Phủ sóng toàn diện các dịch vụ Azure hiện đại và mẫu tích hợp AI
- **Tiến trình Học tập**: Lộ trình rõ ràng, có cấu trúc từ khái niệm cơ bản đến triển khai sản xuất

## 26 tháng 9, 2025

### Nâng cao Case Studies - Tích hợp Đăng ký MCP GitHub

#### Case Studies (09-CaseStudy/) - Tập trung Phát triển Hệ sinh thái
- **README.md**: Mở rộng lớn với case study Đăng ký MCP GitHub toàn diện
  - **Case Study Đăng ký MCP GitHub**: Case study toàn diện mới xem xét ra mắt Đăng ký MCP của GitHub vào tháng 9 năm 2025
    - **Phân tích Vấn đề**: Xem xét chi tiết các thách thức khám phá và triển khai máy chủ MCP phân mảnh
    - **Kiến trúc Giải pháp**: Cách tiếp cận đăng ký tập trung của GitHub với cài đặt VS Code một cú nhấp chuột
    - **Tác động Kinh doanh**: Cải thiện đo lường được về onboarding và năng suất lập trình viên
    - **Giá trị Chiến lược**: Tập trung vào triển khai agent mô-đun và khả năng tương tác giữa các công cụ
    - **Phát triển Hệ sinh thái**: Định vị là nền tảng cơ sở cho tích hợp agentic
  - **Cấu trúc Case Study Cải tiến**: Cập nhật tất cả bảy case study với định dạng thống nhất và mô tả toàn diện
    - Đại lý AI du lịch Azure: Nhấn mạnh điều phối đa agent
    - Tích hợp Azure DevOps: Tập trung tự động hóa quy trình làm việc
    - Truy xuất Tài liệu Thời gian Thực: Triển khai client console Python
    - Bộ tạo Kế hoạch Học tập Tương tác: Ứng dụng web đối thoại Chainlit
    - Tài liệu trong Trình soạn thảo: Tích hợp VS Code và GitHub Copilot
    - Quản lý API Azure: Mẫu tích hợp API cấp doanh nghiệp
    - Đăng ký MCP GitHub: Phát triển hệ sinh thái và nền tảng cộng đồng
  - **Kết luận Toàn diện**: Viết lại phần kết luận nhấn mạnh bảy case study trải rộng các khía cạnh triển khai MCP
    - Tích hợp Doanh nghiệp, Điều phối Đa Agent, Năng suất Lập trình viên
    - Phát triển Hệ sinh thái, Ứng dụng Giáo dục phân loại
    - Cái nhìn sâu rộng hơn về mẫu kiến trúc, chiến lược triển khai, và thực hành tốt nhất
    - Nhấn mạnh MCP như giao thức trưởng thành, sẵn sàng sản xuất

#### Cập nhật Hướng dẫn Học tập (study_guide.md)
- **Bản đồ Chương trình Trực quan**: Cập nhật sơ đồ tư duy bao gồm Đăng ký MCP GitHub trong phần Case Studies
- **Mô tả Case Studies**: Nâng cao từ mô tả tổng quát thành phân tích chi tiết bảy case study toàn diện
- **Cấu trúc Kho lưu trữ**: Cập nhật phần 10 để phản ánh phạm vi case study toàn diện với chi tiết triển khai cụ thể
- **Tích hợp Changelog**: Thêm mục ngày 26 tháng 9 năm 2025 ghi lại bổ sung Đăng ký MCP GitHub và nâng cao case study
- **Cập nhật Ngày**: Cập nhật dấu thời gian chân trang phản ánh phiên bản mới nhất (26 tháng 9, 2025)

### Cải thiện Chất lượng Tài liệu
- **Cải thiện Độ nhất quán**: Chuẩn hóa định dạng và cấu trúc case study trên tất cả bảy ví dụ
- **Phủ sóng Toàn diện**: Case study hiện bao phủ doanh nghiệp, năng suất lập trình viên và phát triển hệ sinh thái
- **Định vị Chiến lược**: Tăng cường tập trung MCP như nền tảng cơ sở cho triển khai hệ thống agentic
- **Tích hợp Tài nguyên**: Cập nhật tài nguyên bổ sung bao gồm liên kết Đăng ký MCP GitHub

## 15 tháng 9, 2025

### Mở rộng Chủ đề Nâng cao - Giao thức Tùy chỉnh & Kỹ thuật Ngữ cảnh

#### Giao thức MCP Tùy chỉnh (05-AdvancedTopics/mcp-transport/) - Hướng dẫn Triển khai Nâng cao Mới
- **README.md**: Hướng dẫn triển khai hoàn chỉnh cho các cơ chế giao thức MCP tùy chỉnh
  - **Giao thức Azure Event Grid**: Triển khai giao thức không máy chủ dựa trên sự kiện toàn diện
    - Ví dụ C#, TypeScript, và Python với tích hợp Azure Functions
    - Mẫu kiến trúc sự kiện cho giải pháp MCP có khả năng mở rộng
    - Bộ nhận webhook và xử lý thông điệp theo phương thức đẩy
  - **Giao thức Azure Event Hubs**: Triển khai giao thức streaming qua lại hiệu suất cao
    - Khả năng streaming thời gian thực cho các kịch bản độ trễ thấp
    - Chiến lược phân vùng và quản lý checkpoint
    - Gom bunched message và tối ưu hóa hiệu năng
  - **Mẫu Tích hợp Doanh nghiệp**: Ví dụ kiến trúc sẵn sàng sản xuất
    - Xử lý MCP phân tán trên nhiều Azure Functions
    - Kiến trúc giao thức lai kết hợp nhiều loại giao thức
    - Độ bền, độ tin cậy và chiến lược xử lý lỗi thông điệp
  - **Bảo mật & Giám sát**: Tích hợp Azure Key Vault và mẫu quan sát
    - Xác thực danh tính quản lý và quyền truy cập theo nguyên tắc tối thiểu
    - Telemetry Application Insights và giám sát hiệu năng
    - Bộ ngắt mạch và mẫu chịu lỗi
  - **Khung Kiểm thử**: Chiến lược kiểm thử toàn diện cho giao thức tùy chỉnh
    - Kiểm thử đơn vị với các test double và khung mô phỏng
    - Kiểm thử tích hợp với Azure Test Containers
    - Xem xét kiểm thử hiệu năng và tải

#### Kỹ thuật Ngữ cảnh (05-AdvancedTopics/mcp-contextengineering/) - Lĩnh vực AI Mới nổi
- **README.md**: Khám phá toàn diện kỹ thuật ngữ cảnh như một lĩnh vực mới nổi
  - **Nguyên tắc Cốt lõi**: Chia sẻ ngữ cảnh đầy đủ, nhận thức quyết định hành động, và quản lý cửa sổ ngữ cảnh
  - **Phù hợp với Giao thức MCP**: MCP giải quyết các thách thức kỹ thuật ngữ cảnh như thế nào
    - Giới hạn cửa sổ ngữ cảnh và chiến lược tải ngữ cảnh dần dần
    - Xác định tính liên quan và truy xuất ngữ cảnh linh hoạt
    - Xử lý ngữ cảnh đa phương thức và cân nhắc bảo mật
  - **Phương pháp Triển khai**: Kiến trúc đơn luồng so với đa agent
    - Kỹ thuật phân đoạn và ưu tiên ngữ cảnh
    - Tải ngữ cảnh dần dần và chiến lược nén
    - Phương pháp ngữ cảnh phân lớp và tối ưu truy xuất
  - **Khung Đo lường**: Các chỉ số mới nổi để đánh giá hiệu quả ngữ cảnh
    - Hiệu quả đầu vào, hiệu suất, chất lượng, và trải nghiệm người dùng
    - Các phương pháp thử nghiệm tối ưu ngữ cảnh
    - Phân tích lỗi và phương pháp cải thiện

#### Cập nhật Điều hướng Chương trình (README.md)
- **Cấu trúc Mô-đun Nâng cao**: Cập nhật bảng chương trình để thêm chủ đề nâng cao mới
  - Thêm mục Kỹ thuật Ngữ cảnh (5.14) và Giao thức Tùy chỉnh (5.15)
  - Định dạng và liên kết điều hướng nhất quán trên tất cả các mô-đun
  - Cập nhật mô tả phản ánh phạm vi nội dung hiện tại

### Cải thiện Cấu trúc Thư mục
- **Chuẩn hóa Đặt tên**: Đổi tên "mcp transport" thành "mcp-transport" để nhất quán với các thư mục chủ đề nâng cao khác
- **Tổ chức Nội dung**: Tất cả thư mục 05-AdvancedTopics giờ theo mẫu đặt tên nhất quán (mcp-[topic])

### Cải tiến Chất lượng Tài liệu
- **Phù hợp với Đặc tả MCP**: Tất cả nội dung mới tham chiếu đặc tả MCP 2025-06-18 hiện hành
- **Ví dụ Đa Ngôn ngữ**: Ví dụ mã toàn diện bằng C#, TypeScript, và Python
- **Tập trung Doanh nghiệp**: Mẫu sẵn sàng sản xuất và tích hợp đám mây Azure
- **Tài liệu Trực quan**: Sơ đồ mermaid minh họa kiến trúc và luồng hoạt động

## 18 tháng 8, 2025

### Cập nhật Toàn diện Tài liệu - Tiêu chuẩn MCP 2025-06-18

#### Thực hành Bảo mật MCP Tốt nhất (02-Security/) - Hiện đại hóa Toàn diện
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Viết lại hoàn chỉnh phù hợp với Đặc tả MCP 2025-06-18
  - **Yêu cầu Bắt buộc**: Thêm rõ ràng các yêu cầu PHẢI/PHẢI KHÔNG từ đặc tả chính thức với chỉ báo trực quan rõ ràng
  - **12 Thực hành Bảo mật Cốt lõi**: Tái cấu trúc từ danh sách 15 mục thành các miền bảo mật toàn diện
    - Bảo mật Token & Xác thực với tích hợp nhà cung cấp danh tính bên ngoài
    - Quản lý Phiên & Bảo mật Giao thức với yêu cầu mật mã
    - Bảo vệ Đe dọa AI đặc thù với tích hợp Microsoft Prompt Shields
    - Kiểm soát Truy cập & Quyền với nguyên tắc quyền tối thiểu
    - An toàn Nội dung & Giám sát với tích hợp Azure Content Safety
    - Bảo mật Chuỗi Cung ứng với xác minh thành phần toàn diện
    - Bảo mật OAuth & Ngăn ngừa Confused Deputy với triển khai PKCE
    - Ứng phó & Khôi phục Sự cố với khả năng tự động hóa
    - Tuân thủ & Quản trị với sự phù hợp quy định
    - Điều khiển Bảo mật Nâng cao với kiến trúc zero trust
    - Tích hợp Hệ sinh thái Bảo mật Microsoft với giải pháp toàn diện
    - Tiến hóa Bảo mật Liên tục với thực hành thích ứng
  - **Giải pháp Bảo mật Microsoft**: Cải thiện hướng dẫn tích hợp Prompt Shields, Azure Content Safety, Entra ID, và GitHub Advanced Security
  - **Tài nguyên Triển khai**: Phân loại các liên kết tài nguyên toàn diện theo Tài liệu MCP Chính thức, Giải pháp Bảo mật Microsoft, Tiêu chuẩn Bảo mật, và Hướng dẫn Triển khai

#### Điều khiển Bảo mật Nâng cao (02-Security/) - Triển khai Doanh nghiệp
- **MCP-SECURITY-CONTROLS-2025.md**: Viết lại toàn bộ với khung bảo mật cấp doanh nghiệp
  - **9 Miền Bảo mật Toàn diện**: Mở rộng từ các điều khiển cơ bản thành khung doanh nghiệp chi tiết
    - Xác thực & Ủy quyền Nâng cao với tích hợp Microsoft Entra ID
    - Bảo mật Token & Điều khiển Chống Passthrough với xác thực toàn diện
    - Điều khiển Bảo mật Phiên với ngăn chặn chiếm quyền
    - Điều khiển Bảo mật Đặc thù AI với phòng chống tiêm nhiễm prompt và đầu độc tool
    - Ngăn ngừa Tấn công Confused Deputy với bảo mật proxy OAuth
    - Bảo mật Thực thi Công cụ với sandbox và cô lập
    - Điều khiển Bảo mật Chuỗi Cung ứng với xác minh phụ thuộc
    - Điều khiển Giám sát & Phát hiện với tích hợp SIEM
    - Ứng phó & Khôi phục Sự cố với khả năng tự động hóa
  - **Ví dụ Triển khai**: Thêm các khối cấu hình YAML chi tiết và ví dụ mã
  - **Tích hợp Giải pháp Microsoft**: Bao phủ toàn diện dịch vụ bảo mật Azure, GitHub Advanced Security, và quản lý danh tính doanh nghiệp

#### Chủ đề Bảo mật Nâng cao (05-AdvancedTopics/mcp-security/) - Triển khai Sẵn sàng Sản xuất
- **README.md**: Viết lại hoàn chỉnh cho triển khai bảo mật doanh nghiệp
  - **Phù hợp Đặc tả Hiện hành**: Cập nhật theo Đặc tả MCP 2025-06-18 với yêu cầu bảo mật bắt buộc
  - **Xác thực Nâng cao**: Tích hợp Microsoft Entra ID với ví dụ đầy đủ .NET và Java Spring Security
  - **Tích hợp Bảo mật AI**: Triển khai Microsoft Prompt Shields và Azure Content Safety với ví dụ Python chi tiết
  - **Giảm thiểu Đe dọa Nâng cao**: Ví dụ triển khai toàn diện cho
    - Ngăn ngừa Tấn công Confused Deputy với PKCE và xác thực sự đồng thuận người dùng
    - Ngăn chặn Token Passthrough với xác thực khán giả và quản lý token an toàn
    - Ngăn chặn chiếm đoạt phiên với liên kết mật mã và phân tích hành vi
  - **Tích hợp Bảo mật Doanh nghiệp**: Giám sát Azure Application Insights, các chuỗi phát hiện mối đe dọa và bảo mật chuỗi cung ứng
  - **Danh sách kiểm tra triển khai**: Phân biệt rõ các kiểm soát bảo mật bắt buộc và khuyến nghị cùng với lợi ích từ hệ sinh thái bảo mật Microsoft

### Chất lượng Tài liệu & Sự phù hợp với Tiêu chuẩn
- **Tham chiếu Đặc tả**: Cập nhật tất cả tham chiếu đến Đặc tả MCP hiện hành 2025-06-18
- **Hệ sinh thái Bảo mật Microsoft**: Hướng dẫn tích hợp được cải thiện xuyên suốt toàn bộ tài liệu bảo mật
- **Triển khai Thực tiễn**: Thêm các ví dụ mã chi tiết bằng .NET, Java và Python với các mẫu doanh nghiệp
- **Tổ chức Tài nguyên**: Phân loại toàn diện tài liệu chính thức, tiêu chuẩn bảo mật và hướng dẫn triển khai
- **Chỉ báo Trực quan**: Đánh dấu rõ ràng các yêu cầu bắt buộc so với các thực hành được khuyến nghị


#### Các Khái niệm Cốt lõi (01-CoreConcepts/) - Cải tiến Toàn diện
- **Cập nhật Phiên bản Giao thức**: Cập nhật để tham chiếu Đặc tả MCP hiện hành 2025-06-18 với đánh phiên bản theo ngày (định dạng NĂM-THÁNG-NGÀY)
- **Tinh chỉnh Kiến trúc**: Mô tả chi tiết hơn về Hosts, Clients và Servers để phản ánh các mẫu kiến trúc MCP hiện tại
  - Hosts hiện được định nghĩa rõ là các ứng dụng AI phối hợp nhiều kết nối client MCP
  - Clients được mô tả là các kết nối giao thức duy trì mối quan hệ một-một với server
  - Servers được mở rộng với các kịch bản triển khai cục bộ và từ xa
- **Cơ cấu lại Primitive**: Cải tổ hoàn toàn các primitive của server và client
  - Primitive Server: Tài nguyên (nguồn dữ liệu), Lời nhắc (mẫu), Công cụ (hàm thực thi) với giải thích và ví dụ chi tiết
  - Primitive Client: Lấy mẫu (hoàn thành LLM), Gợi ý (đầu vào người dùng), Ghi nhật ký (gỡ lỗi/giám sát)
  - Cập nhật theo các mẫu phương thức khám phá (`*/list`), truy xuất (`*/get`), và thực thi (`*/call`) hiện hành
- **Kiến trúc Giao thức**: Giới thiệu mô hình kiến trúc hai lớp
  - Lớp Dữ liệu: Nền tảng JSON-RPC 2.0 với quản lý vòng đời và primitives
  - Lớp Vận chuyển: STDIO (cục bộ) và HTTP luồng có SSE (chuyển vận từ xa)
- **Khung Bảo mật**: Nguyên tắc bảo mật toàn diện bao gồm sự đồng ý rõ ràng của người dùng, bảo vệ quyền riêng tư dữ liệu, an toàn thực thi công cụ và bảo mật lớp vận chuyển
- **Mẫu Giao tiếp**: Cập nhật các thông điệp giao thức thể hiện luồng khởi tạo, khám phá, thực thi và thông báo
- **Ví dụ Mã**: Làm mới ví dụ đa ngôn ngữ (.NET, Java, Python, JavaScript) để phản ánh các mẫu SDK MCP hiện tại

#### Bảo mật (02-Security/) - Cải tổ Bảo mật Toàn diện  
- **Phù hợp Tiêu chuẩn**: Hoàn toàn phù hợp với yêu cầu bảo mật của Đặc tả MCP 2025-06-18
- **Tiến hóa Xác thực**: Ghi nhận tiến hóa từ máy chủ OAuth tùy chỉnh sang ủy quyền nhà cung cấp danh tính bên ngoài (Microsoft Entra ID)
- **Phân tích Mối đe dọa AI Cụ thể**: Mở rộng bao phủ các vectơ tấn công AI hiện đại
  - Kịch bản tấn công chèn lời nhắc với ví dụ thực tế chi tiết
  - Cơ chế đầu độc công cụ và các mẫu tấn công "kéo thảm"
  - Đầu độc cửa sổ ngữ cảnh và tấn công gây nhầm lẫn mô hình
- **Giải pháp Bảo mật AI của Microsoft**: Bao phủ toàn diện hệ sinh thái bảo mật Microsoft
  - AI Prompt Shields với phát hiện nâng cao, chiếu sáng và kỹ thuật phân tách
  - Mẫu tích hợp Azure Content Safety
  - Bảo mật nâng cao GitHub cho bảo vệ chuỗi cung ứng
- **Biện pháp Phòng chống Mối đe dọa Tiên tiến**: Kiểm soát bảo mật chi tiết cho
  - Chiếm đoạt phiên với kịch bản tấn công MCP cụ thể và yêu cầu ID phiên mật mã
  - Vấn đề confused deputy trong kịch bản proxy MCP với yêu cầu đồng ý rõ ràng
  - Lỗ hổng truyền token với kiểm soát xác thực bắt buộc
- **Bảo mật Chuỗi Cung ứng**: Mở rộng bao phủ chuỗi cung ứng AI bao gồm mô hình nền tảng, dịch vụ embedding, nhà cung cấp ngữ cảnh và API bên thứ ba
- **Bảo mật Nền tảng**: Tăng cường tích hợp với mẫu bảo mật doanh nghiệp bao gồm kiến trúc zero trust và hệ sinh thái bảo mật Microsoft
- **Tổ chức Tài nguyên**: Phân loại các liên kết tài nguyên toàn diện theo loại (Tài liệu Chính thức, Tiêu chuẩn, Nghiên cứu, Giải pháp Microsoft, Hướng dẫn Triển khai)

### Cải tiến Chất lượng Tài liệu
- **Mục tiêu Học tập Cấu trúc**: Cải tiến mục tiêu học tập với kết quả cụ thể và có thể thực hiện
- **Tham chiếu Chéo**: Thêm liên kết giữa các chủ đề liên quan về bảo mật và khái niệm cốt lõi
- **Thông tin Hiện hành**: Cập nhật tất cả tham chiếu ngày tháng và liên kết đặc tả theo tiêu chuẩn hiện hành
- **Hướng dẫn Triển khai**: Thêm hướng dẫn triển khai cụ thể và khả thi xuyên suốt cả hai phần

## 16 tháng 7, 2025

### Cải tiến README và Điều hướng
- Thiết kế lại hoàn toàn điều hướng chương trình học trong README.md
- Thay thế thẻ `<details>` bằng định dạng bảng dễ tiếp cận hơn
- Tạo các tùy chọn bố cục thay thế trong thư mục mới "alternative_layouts"
- Thêm ví dụ điều hướng dạng thẻ, tab, và accordion
- Cập nhật phần cấu trúc kho lưu trữ để bao gồm tất cả các tệp mới nhất
- Cải thiện phần "Cách sử dụng chương trình học" với các khuyến nghị rõ ràng
- Cập nhật liên kết đặc tả MCP trỏ đến URL chính xác
- Thêm phần Kỹ thuật Ngữ cảnh (5.14) vào cấu trúc chương trình học

### Cập nhật Hướng dẫn Học tập
- Chỉnh sửa hoàn toàn hướng dẫn học để phù hợp với cấu trúc kho hiện tại
- Thêm các phần mới về MCP Clients và Tools, và các MCP Servers phổ biến
- Cập nhật Bản đồ Chương trình Trực quan để phản ánh chính xác tất cả chủ đề
- Mở rộng mô tả các Chủ đề Nâng cao để bao phủ tất cả lĩnh vực chuyên biệt
- Cập nhật phần Nghiên cứu Trường hợp để phản ánh các ví dụ thực tế
- Thêm bản ghi thay đổi toàn diện này

### Đóng góp Cộng đồng (06-CommunityContributions/)
- Thêm thông tin chi tiết về các MCP servers cho tạo hình ảnh
- Thêm phần tổng hợp về sử dụng Claude trong VSCode
- Thêm hướng dẫn thiết lập và sử dụng client terminal Cline
- Cập nhật phần client MCP để bao gồm tất cả các tùy chọn client phổ biến
- Cải thiện các ví dụ đóng góp với mẫu mã chính xác hơn

### Chủ đề Nâng cao (05-AdvancedTopics/)
- Tổ chức các thư mục chủ đề chuyên môn với tên nhất quán
- Thêm tài liệu và ví dụ kỹ thuật ngữ cảnh
- Thêm tài liệu tích hợp agent Foundry
- Tăng cường tài liệu tích hợp bảo mật Entra ID

## 11 tháng 6, 2025

### Tạo ban đầu
- Phát hành phiên bản đầu tiên của chương trình MCP cho Người mới bắt đầu
- Tạo cấu trúc cơ bản cho tất cả 10 phần chính
- Triển khai Bản đồ Chương trình Trực quan cho điều hướng
- Thêm các dự án mẫu ban đầu với nhiều ngôn ngữ lập trình

### Bắt đầu (03-GettingStarted/)
- Tạo các ví dụ hiện thực server đầu tiên
- Thêm hướng dẫn phát triển client
- Bao gồm hướng dẫn tích hợp client LLM
- Thêm tài liệu tích hợp VS Code
- Triển khai ví dụ server Server-Sent Events (SSE)

### Khái niệm Cốt lõi (01-CoreConcepts/)
- Thêm giải thích chi tiết kiến trúc client-server
- Tạo tài liệu về các thành phần chính của giao thức
- Ghi nhận các mẫu giao tiếp trong MCP

## 23 tháng 5, 2025

### Cấu trúc Kho lưu trữ
- Khởi tạo kho với cấu trúc thư mục cơ bản
- Tạo các tệp README cho mỗi phần chính
- Thiết lập hạ tầng dịch thuật
- Thêm tài sản hình ảnh và sơ đồ

### Tài liệu
- Tạo README.md khởi đầu với tổng quan chương trình học
- Thêm CODE_OF_CONDUCT.md và SECURITY.md
- Thiết lập SUPPORT.md với hướng dẫn trợ giúp
- Tạo cấu trúc hướng dẫn học ban đầu

## 15 tháng 4, 2025

### Lập kế hoạch và Khung
- Lập kế hoạch ban đầu cho chương trình MCP cho Người mới bắt đầu
- Xác định mục tiêu học tập và đối tượng hướng tới
- Phác thảo cấu trúc 10 phần của chương trình
- Phát triển khung khái niệm cho ví dụ và nghiên cứu tình huống
- Tạo các ví dụ nguyên mẫu ban đầu cho các khái niệm chính

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->