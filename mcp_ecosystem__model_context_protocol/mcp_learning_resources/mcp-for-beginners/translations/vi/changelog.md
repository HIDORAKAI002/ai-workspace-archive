# Changelog: MCP cho Người Mới Bắt Đầu

Tài liệu này ghi lại tất cả các thay đổi quan trọng đã thực hiện đối với chương trình Model Context Protocol (MCP) cho Người Mới Bắt Đầu. Các thay đổi được ghi theo thứ tự thời gian ngược (thay đổi mới nhất trước).

## 16 tháng 6, 2026

### Căn chỉnh Đặc tả MCP & Xác thực Mẫu

Đã xác thực chương trình dựa trên **Đặc tả MCP 2025-11-25** hiện tại và các SDK chính thức mới nhất, sau đó đã sửa các tham chiếu đặc tả lỗi thời còn lại và xác nhận các mẫu lõi vẫn xây dựng và chạy được.

#### Sửa Đổi Phiên Bản Đặc Tả (2025-06-18 / 2025-03-26 → 2025-11-25)

Cập nhật nội dung tiếng Anh nơi vẫn còn đề cập phiên bản đặc tả cũ hơn là tiêu chuẩn *hiện tại/mới nhất*, và chuyển hướng các liên kết đến các đường dẫn đặc tả chính thức `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Cập nhật biểu ngữ "Tiêu Chuẩn Hiện Tại", phần giới thiệu, tiêu đề nguyên tắc bảo mật cốt lõi, tiêu đề yêu cầu bắt buộc, phần Microsoft Entra ID, các liên kết Tham khảo & Tài nguyên, và thông báo bảo mật cuối trang (8 tham chiếu) sang 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Cập nhật liên kết tài nguyên bổ sung đặc tả và biểu ngữ "Tiêu Chuẩn Hiện Tại" sang 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Thay thế liên kết lỗi thời `2025-03-26` về bảo mật và niềm tin bằng trang thực hành bảo mật mới nhất 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Cập nhật liên kết tài liệu lấy mẫu chính thức sang 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Cập nhật tham chiếu thì hiện tại "đặc tả MCP hiện hành" và liên kết tài nguyên bổ sung đặc tả sang 2025-11-25 (để lại ghi chú lịch sử về việc loại bỏ SSE để đảm bảo chính xác)

#### Xác Thực Mẫu So Với SDK Hiện Tại

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` đã cài được `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` chạy không lỗi kiểu — các API `McpServer`/`StdioServerTransport` hiện tại vẫn hợp lệ
- **Python (03-GettingStarted/01-first-server/solution/python)**: Xác thực trong môi trường cô lập `.venv` với `mcp[cli]` (1.27.2); `py_compile` chạy thành công và `FastMCP.list_tools()` trả về đúng các công cụ `add` và `subtract`
- Xác nhận tất cả các phạm vi phiên bản mẫu `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) đều được giải quyết sạch sang phiên bản hiện tại `1.29.0` mà không có thay đổi API phá vỡ

#### Căn Chỉnh Khóa Phụ Thuộc (đóng khoảng cách phiên bản)

Nâng các khóa SDK lỗi thời để mọi mẫu theo dõi bản phát hành MCP hiện tại, theo quy ước toàn repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Tăng `@modelcontextprotocol/sdk` từ `^1.8.0` → `>=1.26.0` và cập nhật mô tả gói lỗi thời `"updated for MCP 2025-06-18"` thành `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** và **lab4/code/github_mcp_server/pyproject.toml**: Tăng khóa chính xác `mcp==1.23.0` → `mcp>=1.26.0`; tái tạo hai file `uv.lock` (`uv lock`) để các file khóa giải quyết sang `mcp 1.27.2` hiện tại và đồng bộ với các manifest

#### Phân Tích Lỗ Hổng Chương Trình — Bao Phủ Tính Năng Đặc Tả Mới Nhất

Xác nhận chương trình đã bao phủ tất cả nguyên mẫu được giới thiệu/mở rộng trong MCP 2025-11-25, nên không còn thiếu sót nội dung:
- **Lấy mẫu**: Bài học 03-GettingStarted/14-sampling cùng với 05-AdvancedTopics/mcp-sampling
- **Thu thập thông tin (bao gồm chế độ URL)**: Được tài liệu hóa trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features
- **Gốc rễ (Roots)**: Được tài liệu hóa trong 00-Introduction, 01-CoreConcepts, và 05-AdvancedTopics/mcp-root-contexts
- **Tác vụ (thử nghiệm, vận hành lâu dài)**: Được tài liệu hóa trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features
- **Chú thích Công cụ** (`readOnlyHint` / `destructiveHint`): Được tài liệu hóa trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features

### Tăng Cường Bảo Mật & Khắc Phục Lỗ Hổng Phụ Thuộc

Đã thực hiện kiểm tra bảo mật toàn diện trên mọi manifest phụ thuộc và mã nguồn mẫu, sau đó khắc phục tất cả các cảnh báo npm được báo cáo và một phát hiện ở cấp độ mã. Sau khắc phục, `npm audit` báo cáo **0 lỗ hổng** trong mọi thư mục kiểm tra.

#### Lỗ Hổng Phụ Thuộc npm (gián tiếp) — Đã Sửa

Kiểm tra tất cả 15 file `package-lock.json` đã cam kết. Lỗ hổng giới hạn ở các phụ thuộc gián tiếp được sử dụng bởi công cụ phát triển MCP Inspector, client OpenAI, và MCP SDK; tất cả hiện đã được giải quyết mà không làm vỡ các mẫu:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** và **lab3/code/weather_mcp/inspector**: Tăng phiên bản `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`) đã xóa các cảnh báo `ajv`, `brace-expansion`, `diff`, `path-to-regexp` và `ws` đi kèm. Thêm mục ghi đè `npm overrides` ép phiên bản vá `shell-quote@1.8.4` để loại bỏ cảnh báo nghiêm trọng còn lại do `concurrently`; tái tạo cả hai file khóa (giờ là 0 lỗ hổng)
- **03-GettingStarted/samples/typescript**: `npm audit fix` cập nhật `qs` gián tiếp (mức trung bình) lên bản vá
- **03-GettingStarted/samples/javascript**: `npm audit fix` cập nhật `hono` gián tiếp (mức trung bình) lên bản vá
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` cập nhật `form-data` gián tiếp (mức cao) lên bản vá
- **03-GettingStarted/11-simple-auth/solution/typescript**: Tạo file `package-lock.json` thiếu để dự án có thể tái tạo và kiểm tra (0 lỗ hổng)

#### Sửa Lỗi Bảo Mật Cấp Mã (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Loại bỏ `shell=True` khỏi công cụ `open_in_vscode`. Trước đây `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` cho phép các ký tự đặc biệt shell trong đường dẫn thư mục được `cmd.exe` diễn giải (tấn công chèn lệnh). Giờ nó khởi chạy trực tiếp `Code.exe` đã được giải quyết kèm tham số thư mục — không dùng shell — về cơ bản an toàn và tương đương chức năng

#### Kiểm Tra Phụ Thuộc Python

- Kiểm tra mọi bộ yêu cầu Python với `pip-audit`. `05-AdvancedTopics` và `03-GettingStarted/samples/python` báo cáo **không có lỗ hổng biết đến** (các phạm vi `mcp` / `httpx` / `pydantic` / `python-dotenv` đều giải quyết sang các bản vá hiện tại)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` báo lỗ hổng trên phụ thuộc gián tiếp **`werkzeug` 3.1.1** với ba cảnh báo từ chối dịch vụ thiết bị Windows tên `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, và `CVE-2026-27199` (đã sửa trong 3.1.6). Thêm khóa bảo mật rõ ràng `werkzeug>=3.1.6` để sử dụng bản vá; xác nhận khóa này giải quyết tốt với stack `chainlit` / `mcp` / `semantic-kernel`

### Đổi Thương Hiệu Tên Sản Phẩm

Cập nhật tất cả nội dung chương trình để phản ánh việc đổi thương hiệu sản phẩm của Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Cập nhật liên kết cộng đồng Discord
- **AGENTS.md**: Cập nhật tham chiếu máy chủ Discord
- **README.md**: Cập nhật các tham chiếu hệ sinh thái công nghệ
- **study_guide.md**: Cập nhật các tham chiếu case study
- **05-AdvancedTopics/README.md**: Cập nhật tiêu đề và mô tả Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Cập nhật tiêu đề mục và phần mô tả
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Cập nhật toàn bộ tiêu đề và nội dung module
- **05-AdvancedTopics/mcp-security-entra/README.md**: Cập nhật liên kết tham chiếu chéo
- **07-LessonsfromEarlyAdoption/README.md**: Cập nhật các tham chiếu case study
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Cập nhật tiêu đề Mục 9, huy hiệu và năng lực
- **08-BestPractices/README.md**: Cập nhật liên kết cộng đồng Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Cập nhật tham chiếu kênh Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Cập nhật tham chiếu triển khai mô hình
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Cập nhật bảng dịch vụ AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Cập nhật tham chiếu tài nguyên

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension cho VS Code
- **README.md**: Cập nhật các tham chiếu chính của chương trình
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Cập nhật tiêu đề module, tổng quan, và tất cả tiêu đề phụ trong module
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Cập nhật tiêu đề, mục tiêu học tập, hướng dẫn thiết lập và tài nguyên
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Cập nhật tiêu đề, mục tiêu học tập, bảng máy chủ MCP, và liên kết tham chiếu chéo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Cập nhật tiêu đề, huy hiệu, yêu cầu trước, và tài nguyên
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Cập nhật tham chiếu Agent Builder và liên kết phản hồi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Cập nhật yêu cầu trước và tham chiếu extension

---

## 11 tháng 4, 2026

### Bài Học Mới, Sửa Tài Liệu và Cập Nhật Phụ Thuộc

#### Nội Dung Chương Trình Mới Được Thêm Vào

**Module 05 - Chủ đề Nâng cao**
- **Bài học 5.17: Lý luận đa tác nhân đối kháng với MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Hướng dẫn toàn diện mới về mô hình tranh luận đối kháng cho hệ thống đa tác nhân
  - Sơ đồ kiến trúc Mermaid: hai tác nhân → server MCP dùng chung → bản ghi tranh luận → giám khảo → phán quyết
  - Server công cụ MCP dùng chung (`web_search` + `run_python`) triển khai bằng Python và TypeScript
  - Các lệnh hệ thống đối lập (CHO / PHẢI CHỐNG / Giám khảo) với yêu cầu rõ ràng về sử dụng công cụ
  - Bộ điều phối tranh luận bằng Python, TypeScript, và C# quản lý các vòng tranh luận và điều hướng luận điểm
  - Kết nối MCP `ClientSession` cho bộ điều phối gọi công cụ thực
  - Bảng trường hợp sử dụng (phát hiện ảo giác, mô hình hóa mối đe dọa, đánh giá thiết kế API, xác thực thực tế, lựa chọn kỹ thuật)
  - Các cân nhắc bảo mật: thực thi trong sandbox, xác thực gọi công cụ, giới hạn tốc độ, ghi nhật ký kiểm tra
  - Bài tập cấu trúc với ba kịch bản thực tế (đánh giá code, quyết định kiến trúc, kiểm duyệt nội dung)

#### Sửa Tài Liệu

**Module 03 - Bắt đầu**
- **05-stdio-server/README.md**: Sửa ví dụ máy chủ stdio TypeScript không đầy đủ — thêm phần tạo transport thiếu (`new StdioServerTransport()`) và gọi `server.connect(transport)` để phù hợp với ví dụ Python và .NET cùng phần
- **14-sampling/README.md**: Sửa lỗi chính tả — sửa `"Sampling is an davanced features"` thành `"Sampling is an advanced feature"`

#### Cập Nhật Chương Trình

**README.md chính**
- Thêm mục 5.17 (Lý luận đa tác nhân đối kháng với MCP) vào bảng chương trình cùng liên kết trực tiếp đến bài học mới

**05-AdvancedTopics/README.md**
- Thêm dòng Bài học 5.17 vào bảng bài học

**study_guide.md**
- Thêm chủ đề Lý luận đa tác nhân đối kháng vào sơ đồ tư duy và mô tả bằng văn bản của Chủ đề Nâng cao

#### Sửa Mã và Bảo Mật

**Module 05 - Tác nhân đối kháng (`mcp-adversarial-agents`)**
- **Sửa bảo mật — chèn lệnh**: Thay thế thao tác nội suy shell `execSync` bằng `execFile` + `promisify` trong công cụ TypeScript `run_python`, loại bỏ bề mặt tấn công chèn lệnh (mã do LLM kiểm soát giờ được truyền dưới dạng phần tử argv tường minh, không liên quan shell)
- **Đi dây vòng lặp công cụ MCP**: Cập nhật bộ điều phối tranh luận Python để sử dụng khách `AsyncAnthropic` (thay thế `Anthropic` đồng bộ chặn), truyền trực tiếp một `ClientSession` đang hoạt động cho từng lượt đại lý, lấy định nghĩa công cụ qua `session.list_tools()` mỗi lượt và gửi các khối `tool_use` qua `session.call_tool()` trong một vòng lặp cho đến khi mô hình phát ra phản hồi văn bản cuối cùng

#### Cập nhật phụ thuộc

- Đẩy `hono` lên phiên bản 4.12.12 trên nhiều gói (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Đẩy `@hono/node-server` từ 1.19.11 lên 1.19.13 trong các gói TypeScript
- Đẩy `cryptography` từ 46.0.5 lên 46.0.7 trong các gói Python (10-StreamliningAIWorkflows labs 3 và 4)
- Đẩy `lodash` từ 4.17.23 lên 4.18.1 trong inspector 10-StreamliningAIWorkflows

#### Dịch thuật

- Đồng bộ dịch cho hơn 48 ngôn ngữ với các thay đổi nguồn mới nhất (cập nhật i18n)

---

## Ngày 5 tháng 2, 2026

### Cải thiện xác thực và điều hướng toàn bộ kho lưu trữ

#### Nội dung Khóa học Mới được Thêm

**Module 03 - Bắt đầu**
- **12-mcp-hosts/README.md**: Hướng dẫn toàn diện mới để thiết lập các máy chủ MCP
  - Ví dụ cấu hình Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Mẫu cấu hình JSON cho tất cả các máy chủ chính
  - Bảng so sánh các loại giao vận (stdio, SSE/HTTP, WebSocket)
  - Khắc phục sự cố các lỗi kết nối phổ biến
  - Thực hành bảo mật tốt nhất cho cấu hình máy chủ

- **13-mcp-inspector/README.md**: Hướng dẫn gỡ lỗi mới cho MCP Inspector
  - Các phương pháp cài đặt (npx, npm toàn cục, từ mã nguồn)
  - Kết nối với server qua stdio và HTTP/SSE
  - Công cụ kiểm tra, tài nguyên và quy trình làm việc prompts
  - Tích hợp VS Code với MCP Inspector
  - Các kịch bản gỡ lỗi phổ biến kèm giải pháp

**Module 04 - Triển khai Thực tế**
- **pagination/README.md**: Hướng dẫn triển khai phân trang mới
  - Mẫu phân trang dựa trên con trỏ trong Python, TypeScript, Java
  - Xử lý phân trang phía client
  - Chiến lược thiết kế con trỏ (mờ vs có cấu trúc)
  - Khuyến nghị tối ưu hiệu năng

**Module 05 - Chủ đề Nâng cao**
- **mcp-protocol-features/README.md**: Khám phá sâu các tính năng giao thức mới
  - Triển khai thông báo tiến trình
  - Mẫu hủy yêu cầu
  - Mẫu nguồn tài nguyên với kiểu mẫu URI
  - Quản lý vòng đời server
  - Điều khiển mức độ ghi nhật ký
  - Mẫu xử lý lỗi với mã JSON-RPC

#### Sửa lỗi Điều hướng (cập nhật hơn 24 tệp)

**Các README chủ đạo**
 Hiện tại liên kết đến bài học đầu tiên VÀ module tiếp theo

**02-Security Các tệp phụ**
- 5 tài liệu bảo mật bổ sung hiện có phần điều hướng “Đi tiếp theo”:

**09-CaseStudy Các tệp**
- Tất cả tệp nghiên cứu tình huống hiện có điều hướng tuần tự:

**10-StreamliningAI Labs**
Thêm phần “Đi tiếp theo” vào tổng quan Module 10 và Module 11

#### Sửa lỗi Mã và Nội dung

**Cập nhật SDK và Phụ thuộc**
Sửa phiên bản openai trống thành `^4.95.0`
Cập nhật SDK từ `^1.8.0` lên `>=1.26.0`
Cập nhật các phiên bản mcp lên `>=1.26.0`

**Sửa lỗi Mã**
Sửa mô hình không hợp lệ `gpt-4o-mini` thành `gpt-4.1-mini`

**Sửa lỗi Nội dung**
Sửa liên kết hỏng `READMEmd` → `README.md`, sửa tiêu đề khóa học `Module 1-3` → `Module 0-3`, sửa đường dẫn phân biệt chữ hoa chữ thường
Xóa nội dung trùng lặp lỗi của Nghiên cứu Tình huống 5

**Cải thiện Hướng dẫn cho Người mới bắt đầu**
Thêm phần giới thiệu thích hợp, mục tiêu học tập và điều kiện tiên quyết cho người mới

#### Cập nhật Khóa học

**README.md chính**
- Thêm mục 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Phân trang), 5.16 (Tính năng Giao thức) vào bảng khóa học

**README các Module**
Thêm các bài học 12 và 13 vào danh sách bài học
Thêm phần Hướng dẫn Thực tế với liên kết phân trang
Thêm bài 5.15 (Giao vận tùy chỉnh) và 5.16 (Tính năng Giao thức)

**study_guide.md**
- Cập nhật sơ đồ tư duy với tất cả chủ đề mới: Thiết lập MCP Hosts, MCP Inspector, Chiến lược Phân trang, Khám phá Tính năng Giao thức

## Ngày 28 tháng 1, 2026

### Đánh giá Tuân thủ Đặc tả MCP 2025-11-25

#### Cải tiến Khái niệm Cốt lõi (01-CoreConcepts/)
- **Khái niệm client mới - Roots**: Thêm tài liệu toàn diện về khái niệm client Roots, giúp server hiểu ranh giới hệ thống tập tin và quyền truy cập
- **Chú thích công cụ**: Thêm tài liệu về chú thích hành vi công cụ (`readOnlyHint`, `destructiveHint`) để quyết định thực thi công cụ tốt hơn
- **Gọi công cụ trong Sampling**: Cập nhật tài liệu Sampling để bao gồm tham số `tools` và `toolChoice` giúp mô hình gọi công cụ khi lấy mẫu
- **Tri thức mode URL**: Thêm tài liệu về tri thức dựa trên URL cho tương tác web bên ngoài do server khởi tạo
- **Tasks (Thử nghiệm)**: Thêm mục tài liệu tính năng Tasks thử nghiệm cho bao bọc thực thi lâu dài và truy xuất kết quả trì hoãn
- **Hỗ trợ biểu tượng**: Lưu ý công cụ, tài nguyên, mẫu tài nguyên và prompts có thể bao gồm biểu tượng dưới dạng metadata bổ sung

#### Cập nhật Tài liệu
- **README.md**: Thêm tham chiếu phiên bản Đặc tả MCP 2025-11-25 và giải thích đánh số phiên bản theo ngày
- **study_guide.md**: Cập nhật bản đồ khóa học để bao gồm Tasks và Chú thích Công cụ trong phần Khái niệm Cốt lõi; cập nhật dấu thời gian tài liệu

#### Xác minh Tuân thủ Đặc tả
- **Phiên bản giao thức**: Xác nhận tất cả tài liệu tham chiếu đúng Đặc tả MCP 2025-11-25 hiện tại
- **Đồng bộ kiến trúc**: Xác thực chính xác tài liệu kiến trúc hai tầng (Lớp Dữ liệu + Lớp Vận chuyển)
- **Tài liệu Khái niệm**: Xác nhận tài liệu về primitives server (Resources, Prompts, Tools) và primitives client (Sampling, Elicitation, Logging, Roots)
- **Cơ chế vận chuyển**: Xác thực tài liệu vận chuyển STDIO và HTTP Streaming
- **Hướng dẫn bảo mật**: Xác nhận phù hợp với tài liệu Thực hành Bảo mật MCP hiện hành

#### Các tính năng chính MCP 2025-11-25 được tài liệu hóa
- **Khám phá OpenID Connect**: Khám phá máy chủ xác thực qua OIDC
- **Tài liệu Metadata Client ID OAuth**: Cơ chế đăng ký client được khuyến nghị
- **JSON Schema 2020-12**: Ngôn ngữ chuẩn mặc định cho định nghĩa MCP schemas
- **Hệ thống phân tầng SDK**: Yêu cầu chính thức cho hỗ trợ và bảo trì tính năng SDK
- **Cấu trúc quản trị**: Cấu trúc nhóm làm việc và nhóm quan tâm chính thức trong quản trị MCP

### Cập nhật lớn Tài liệu Bảo mật (02-Security/)

#### Tích hợp Hội thảo MCP Security Summit (Sherpa)
- **Tài nguyên đào tạo thực hành mới**: Thêm tích hợp toàn diện với [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) trong toàn bộ tài liệu bảo mật
- **Phạm vi tuyến đường thám hiểm**: Tài liệu đầy đủ tiến trình từ trại Base Camp đến Summit
- **Đồng bộ OWASP**: Tất cả hướng dẫn bảo mật hiện liên kết với hướng dẫn OWASP MCP Azure

#### Tích hợp OWASP MCP Top 10
- **Phần mới**: Thêm bảng rủi ro bảo mật OWASP MCP Top 10 với giải pháp Azure trong README bảo mật chính
- **Tài liệu dựa trên rủi ro**: Cập nhật mcp-security-controls-2025.md với tham chiếu rủi ro OWASP MCP cho từng lĩnh vực bảo mật
- **Kiến trúc tham khảo**: Liên kết kiến trúc tham khảo OWASP MCP Azure Security Guide và mẫu triển khai

#### Các tệp bảo mật cập nhật
- **README.md**: Thêm tổng quan Sherpa Workshop, bảng tuyến đường thám hiểm, tóm tắt rủi ro OWASP MCP Top 10 và phần đào tạo thực hành
- **mcp-security-controls-2025.md**: Cập nhật tiêu đề tháng 2 năm 2026, thêm tham chiếu rủi ro OWASP (MCP01-MCP08), sửa lỗi không đồng bộ phiên bản đặc tả
- **mcp-security-best-practices-2025.md**: Thêm phần tài nguyên Sherpa và OWASP, cập nhật dấu thời gian
- **mcp-best-practices.md**: Thêm phần đào tạo thực hành với các liên kết Sherpa và OWASP
- **azure-content-safety-implementation.md**: Thêm tham chiếu OWASP MCP06, đồng bộ trại Sherpa 3, và phần tài nguyên bổ sung

#### Thêm liên kết tài nguyên mới
- [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)
- [Hướng dẫn Bảo mật MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Trang rủi ro OWASP MCP riêng biệt (MCP01-MCP10)

### Đồng bộ Đặc tả MCP 2025-11-25 toàn khóa học

#### Module 03 - Bắt đầu
- **Tài liệu SDK**: Thêm Go SDK vào danh sách SDK chính thức; cập nhật mọi tham chiếu SDK phù hợp với Đặc tả MCP 2025-11-25
- **Làm rõ Vận chuyển**: Cập nhật mô tả vận chuyển STDIO và HTTP Streaming với tham chiếu đặc tả rõ ràng

#### Module 04 - Triển khai Thực tế
- **Cập nhật SDK**: Thêm Go SDK; cập nhật danh sách SDK với tham chiếu phiên bản đặc tả
- **Đặc tả Quyền**: Cập nhật liên kết đặc tả MCP Authorization thành phiên bản 2025-11-25 hiện hành

#### Module 05 - Chủ đề Nâng cao
- **Tính năng Mới**: Thêm ghi chú về các tính năng Đặc tả MCP 2025-11-25 mới (Tasks, Chú thích Công cụ, Tri thức mode URL, Roots)
- **Tài nguyên Bảo mật**: Thêm liên kết OWASP MCP Top 10 và workshop Sherpa vào tài nguyên bổ sung

#### Module 06 - Đóng góp Cộng đồng
- **Danh sách SDK**: Thêm Swift và Rust SDK; cập nhật liên kết đặc tả MCP 2025-11-25
- **Tham chiếu Đặc tả**: Cập nhật liên kết tới URL đặc tả MCP chính thức

#### Module 07 - Bài học Từ Áp dụng Sớm
- **Cập nhật Tài nguyên**: Thêm liên kết Đặc tả MCP 2025-11-25 và OWASP MCP Top 10 vào tài nguyên bổ sung

#### Module 08 - Thực hành Tốt nhất
- **Phiên bản Đặc tả**: Cập nhật tham chiếu Đặc tả MCP 2025-11-25
- **Tài nguyên Bảo mật**: Thêm OWASP MCP Top 10 và hội thảo Sherpa vào tài nguyên bổ sung

#### Module 10 - Tinh gọn Quy trình AI
- **Cập nhật huy hiệu**: Thay đổi huy hiệu phiên bản MCP từ phiên bản SDK (1.9.3) sang phiên bản đặc tả (2025-11-25)
- **Liên kết Tài nguyên**: Cập nhật liên kết Đặc tả MCP; thêm OWASP MCP Top 10

#### Module 11 - Phòng thí nghiệm Thực hành MCP Server
- **Tham chiếu Đặc tả**: Cập nhật liên kết Đặc tả MCP thành phiên bản 2025-11-25
- **Tài nguyên Bảo mật**: Thêm OWASP MCP Top 10 vào tài nguyên chính thức

## Ngày 18 tháng 12, 2025

### Cập nhật Tài liệu Bảo mật - Đặc tả MCP 2025-11-25

#### Thực hành Bảo mật MCP (02-Security/mcp-best-practices.md) – Cập nhật Phiên bản Đặc tả
- **Cập nhật Phiên bản Giao thức**: Cập nhật tham chiếu đến Đặc tả MCP 2025-11-25 mới nhất (phát hành ngày 25 tháng 11 năm 2025)
  - Cập nhật tất cả tham chiếu phiên bản đặc tả từ 2025-06-18 sang 2025-11-25
  - Cập nhật ngày tháng trong tài liệu từ 18 tháng 8 năm 2025 sang 18 tháng 12 năm 2025
  - Xác nhận tất cả URL đặc tả trỏ tới tài liệu hiện tại
- **Xác nhận Nội dung**: Kiểm tra toàn diện thực hành bảo mật so với tiêu chuẩn mới nhất
  - **Giải pháp Bảo mật Microsoft**: Xác nhận thuật ngữ và liên kết hiện tại cho Prompt Shields (trước đây là "phát hiện rủi ro jailbreak"), Azure Content Safety, Microsoft Entra ID, và Azure Key Vault
  - **Bảo mật OAuth 2.1**: Xác nhận phù hợp với thực hành bảo mật OAuth mới nhất
  - **Tiêu chuẩn OWASP**: Xác nhận các tham chiếu OWASP Top 10 cho LLM vẫn còn hợp lệ
  - **Dịch vụ Azure**: Xác nhận các liên kết tài liệu Microsoft Azure và thực hành tốt nhất
- **Đồng bộ Tiêu chuẩn**: Tất cả tiêu chuẩn bảo mật được tham chiếu đều hợp lệ
  - Khung Quản lý Rủi ro AI NIST
  - ISO 27001:2022
  - Thực hành bảo mật OAuth 2.1 tốt nhất
  - Khung bảo mật và tuân thủ Azure
- **Tài nguyên Triển khai**: Kiểm nghiệm tất cả liên kết hướng dẫn triển khai và tài nguyên
  - Mẫu xác thực Azure API Management
  - Hướng dẫn tích hợp Microsoft Entra ID
  - Quản lý bí mật Azure Key Vault
  - Đường ống DevSecOps và giải pháp giám sát

### Đảm bảo Chất lượng Tài liệu
- **Tuân thủ Đặc tả**: Đảm bảo tất cả yêu cầu bảo mật MCP bắt buộc (PHẢI/PHẢI KHÔNG) phù hợp với đặc tả mới nhất
- **Cập nhật Tài nguyên**: Xác nhận tất cả liên kết bên ngoài đến tài liệu Microsoft, tiêu chuẩn bảo mật và hướng dẫn triển khai
- **Bao phủ Thực hành Tốt nhất**: Xác nhận bao phủ toàn diện xác thực, phân quyền, các mối đe dọa đặc thù AI, bảo mật chuỗi cung ứng và mẫu kiến trúc doanh nghiệp

## Ngày 6 tháng 10, 2025

### Mở rộng phần Bắt đầu – Sử dụng Server Nâng cao & Xác thực Đơn giản

#### Sử dụng Server Nâng cao (03-GettingStarted/10-advanced)
- **Thêm Chương Mới**: Giới thiệu hướng dẫn toàn diện về sử dụng server MCP nâng cao, bao gồm cả kiến trúc server thường và cấp thấp.
  - **Server thường so với cấp thấp**: So sánh chi tiết và ví dụ mã Python và TypeScript cho hai cách tiếp cận.
  - **Thiết kế dựa trên handler**: Giải thích quản lý công cụ/tài nguyên/prompts dựa trên handler cho triển khai server có khả năng mở rộng và linh hoạt.
  - **Mẫu thực tế**: Kịch bản thực tế nơi các mẫu server cấp thấp hữu ích cho tính năng và kiến trúc nâng cao.
#### Xác Thực Đơn Giản (03-GettingStarted/11-simple-auth)
- **Thêm Chương Mới**: Hướng dẫn từng bước triển khai xác thực đơn giản trên các máy chủ MCP.
  - **Khái Niệm Xác Thực**: Giải thích rõ ràng về xác thực và phân quyền, cũng như cách xử lý thông tin đăng nhập.
  - **Triển Khai Xác Thực Cơ Bản**: Mẫu xác thực dựa trên middleware trong Python (Starlette) và TypeScript (Express), kèm ví dụ mã nguồn.
  - **Tiến Trình Đến Bảo Mật Nâng Cao**: Hướng dẫn bắt đầu với xác thực đơn giản và phát triển lên OAuth 2.1 và RBAC, cùng tham khảo các mô-đun bảo mật nâng cao.

Các bổ sung này cung cấp hướng dẫn thực tế, giúp xây dựng các triển khai server MCP vững chắc, bảo mật và linh hoạt hơn, kết nối khái niệm nền tảng với các mẫu sản xuất nâng cao.

## 29 Tháng 9, 2025

### MCP Server Database Integration Labs - Lộ Trình Học Thực Hành Toàn Diện

#### 11-MCPServerHandsOnLabs - Chương Trình Đào Tạo Tích Hợp Cơ Sở Dữ Liệu Đầy Đủ Mới
- **Lộ Trình Học 13 Bài Làm**: Thêm chương trình thực hành toàn diện xây dựng server MCP sẵn sàng sản xuất tích hợp cơ sở dữ liệu PostgreSQL
  - **Triển Khai Thực Tế**: Trường hợp sử dụng phân tích bán lẻ Zava minh họa mẫu doanh nghiệp
  - **Tiến Trình Học Có Cấu Trúc**:
    - **Phòng Thí Nghiệm 00-03: Nền Tảng** - Giới thiệu, Kiến trúc lõi, Bảo mật & Multi-Tenancy, Thiết lập môi trường
    - **Phòng Thí Nghiệm 04-06: Xây Dựng Server MCP** - Thiết kế & Sơ đồ cơ sở dữ liệu, Triển khai server MCP, Phát triển công cụ
    - **Phòng Thí Nghiệm 07-09: Tính Năng Nâng Cao** - Tích hợp tìm kiếm ngữ nghĩa, Testing & Debugging, Tích hợp VS Code
    - **Phòng Thí Nghiệm 10-12: Sản Xuất & Thực Hành Tốt Nhất** - Chiến lược triển khai, Giám sát & Quan sát, Thực hành tốt nhất & Tối ưu hóa
  - **Công Nghệ Doanh Nghiệp**: Framework FastMCP, PostgreSQL với pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Tính Năng Nâng Cao**: Row Level Security (RLS), tìm kiếm ngữ nghĩa, truy cập dữ liệu đa khách thuê, vector embeddings, giám sát thời gian thực

#### Chuẩn Hóa Thuật Ngữ - Chuyển Đổi Từ Mô-đun Thành Phòng Thí Nghiệm
- **Cập Nhật Tài Liệu Toàn Diện**: Cập nhật hệ thống tất cả các file README trong 11-MCPServerHandsOnLabs sang dùng thuật ngữ "Phòng Thí Nghiệm" thay vì "Mô-đun"
  - **Tiêu Đề Mục**: Cập nhật "Mô-đun này bao gồm" thành "Phòng thí nghiệm này bao gồm" trong tất cả 13 phòng thí nghiệm
  - **Mô Tả Nội Dung**: Thay đổi "Mô-đun này cung cấp..." thành "Phòng thí nghiệm này cung cấp..." xuyên suốt tài liệu
  - **Mục Tiêu Học Tập**: Cập nhật "Cuối mô-đun này..." thành "Cuối phòng thí nghiệm này..."
  - **Liên Kết Điều Hướng**: Chuyển tất cả tham chiếu "Module XX:" thành "Lab XX:" trong các tham chiếu chéo và điều hướng
  - **Theo Dõi Hoàn Thành**: Cập nhật "Sau khi hoàn thành mô-đun này..." thành "Sau khi hoàn thành phòng thí nghiệm này..."
  - **Giữ Nguyên Tham Chiếu Kỹ Thuật**: Bảo toàn tham chiếu mô-đun Python trong các file cấu hình (ví dụ, `"module": "mcp_server.main"`)

#### Cải Tiến Hướng Dẫn Học Tập (study_guide.md)
- **Bản Đồ Chương Trình Học Trực Quan**: Thêm phần mới "11. Phòng Thí Nghiệm Tích Hợp Cơ Sở Dữ Liệu" với cấu trúc phòng thí nghiệm toàn diện
- **Cấu Trúc Kho Lưu Trữ**: Cập nhật từ mười lên mười một mục chính với mô tả chi tiết về 11-MCPServerHandsOnLabs
- **Hướng Dẫn Lộ Trình Học**: Cải tiến chỉ dẫn điều hướng cho các phần 00-11
- **Phạm Vi Công Nghệ**: Thêm chi tiết tích hợp FastMCP, PostgreSQL, dịch vụ Azure
- **Kết Quả Học Tập**: Nhấn mạnh phát triển server sẵn sàng sản xuất, mẫu tích hợp cơ sở dữ liệu, và bảo mật doanh nghiệp

#### Cải Tiến Cấu Trúc README Chính
- **Thuật Ngữ Dựa Trên Phòng Thí Nghiệm**: Cập nhật README.md chính trong 11-MCPServerHandsOnLabs sử dụng nhất quán cấu trúc "Phòng Thí Nghiệm"
- **Tổ Chức Lộ Trình Học**: Tiến trình rõ ràng từ khái niệm nền tảng, qua triển khai nâng cao đến triển khai sản xuất
- **Tập Trung Thực Tiễn**: Nhấn mạnh học tập thực hành với mẫu doanh nghiệp và công nghệ tiên tiến

### Cải Tiến Chất Lượng & Tính Nhất Quán Tài Liệu
- **Nhấn Mạnh Học Tập Thực Hành**: Củng cố phương pháp học tập dựa trên phòng thí nghiệm trong toàn bộ tài liệu
- **Tập Trung Mẫu Doanh Nghiệp**: Đặc biệt nhấn mạnh các triển khai sẵn sàng sản xuất và bảo mật doanh nghiệp
- **Tích Hợp Công Nghệ**: Bao phủ toàn diện các dịch vụ Azure hiện đại và mẫu tích hợp AI
- **Tiến Trình Học Có Cấu Trúc**: Lộ trình rõ ràng đi từ khái niệm cơ bản đến triển khai sản xuất

## 26 Tháng 9, 2025

### Cải Tiến Nghiên Cứu Tình Huống - Tích Hợp GitHub MCP Registry

#### Nghiên Cứu Tình Huống (09-CaseStudy/) - Tập Trung Phát Triển Hệ Sinh Thái
- **README.md**: Mở rộng lớn với nghiên cứu tình huống tổng thể về GitHub MCP Registry
  - **Nghiên Cứu GitHub MCP Registry**: Nghiên cứu chi tiết về việc ra mắt MCP Registry của GitHub vào tháng 9 năm 2025
    - **Phân Tích Vấn Đề**: Khám phá chi tiết các thử thách phân mảnh việc phát hiện và triển khai server MCP
    - **Kiến Trúc Giải Pháp**: Cách tiếp cận registry tập trung với cài đặt một cú nhấp chuột trên VS Code
    - **Tác Động Kinh Doanh**: Cải thiện rõ rệt năng suất và onboarding cho lập trình viên
    - **Giá Trị Chiến Lược**: Tập trung vào triển khai agent mô-đun và tương tác đa công cụ
    - **Phát Triển Hệ Sinh Thái**: Định vị là nền tảng cốt lõi cho tích hợp agentic
  - **Cấu Trúc Nghiên Cứu Tình Huống Nâng Cao**: Cập nhật bảy nghiên cứu tình huống với định dạng đồng nhất và mô tả toàn diện
    - Azure AI Travel Agents: Nhấn mạnh điều phối đa agent
    - Tích Hợp Azure DevOps: Tập trung tự động hóa workflow
    - Truy Xuất Tài Liệu Thời Gian Thực: Triển khai client console Python
    - Máy Phát Sinh Kế Hoạch Học Tập Tương Tác: Ứng dụng web hội thoại Chainlit
    - Tài Liệu Trong Trình Soạn Thảo: Tích hợp VS Code và GitHub Copilot
    - Quản Lý API Azure: Mẫu tích hợp API doanh nghiệp
    - GitHub MCP Registry: Phát triển hệ sinh thái và nền tảng cộng đồng
  - **Kết Luận Toàn Diện**: Viết lại mục kết luận, nhấn mạnh bảy nghiên cứu tình huống trải dài nhiều khía cạnh triển khai MCP
    - Tích hợp doanh nghiệp, Điều phối đa agent, Năng suất lập trình viên
    - Phát triển hệ sinh thái, Phân loại ứng dụng giáo dục
    - Cải thiện hiểu biết về mẫu kiến trúc, chiến lược triển khai, thực hành tốt nhất
    - Nhấn mạnh MCP là giao thức trưởng thành, sẵn sàng sản xuất

#### Cập Nhật Hướng Dẫn Học Tập (study_guide.md)
- **Bản Đồ Chương Trình Học Trực Quan**: Cập nhật bản đồ tư duy bao gồm GitHub MCP Registry trong phần Nghiên Cứu Tình Huống
- **Mô Tả Nghiên Cứu Tình Huống**: Cải tiến từ mô tả chung sang phân tích chi tiết bảy nghiên cứu tình huống toàn diện
- **Cấu Trúc Kho Lưu Trữ**: Cập nhật phần 10 phản ánh phạm vi nghiên cứu toàn diện với chi tiết triển khai cụ thể
- **Tích Hợp Changelog**: Thêm mục 26 tháng 9, 2025 ghi nhận bổ sung GitHub MCP Registry và nâng cấp nghiên cứu tình huống
- **Cập Nhật Ngày Tháng**: Cập nhật dấu thời gian ở chân trang phản ánh phiên bản mới nhất (26 tháng 9, 2025)

### Cải Tiến Chất Lượng Tài Liệu
- **Tăng Tính Nhất Quán**: Chuẩn hóa định dạng và cấu trúc nghiên cứu tình huống trong bảy ví dụ
- **Phủ Sóng Toàn Diện**: Các nghiên cứu tình huống bao gồm doanh nghiệp, năng suất lập trình viên, phát triển hệ sinh thái
- **Định Vị Chiến Lược**: Tăng cường tập trung MCP là nền tảng triển khai hệ thống agentic
- **Tích Hợp Tài Nguyên**: Cập nhật tài nguyên bổ sung bao gồm liên kết GitHub MCP Registry

## 15 Tháng 9, 2025

### Mở Rộng Chủ Đề Nâng Cao - Giao Thức Tùy Chỉnh & Kỹ Thuật Ngữ Cảnh

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Hướng Dẫn Triển Khai Nâng Cao Mới
- **README.md**: Hướng dẫn triển khai hoàn chỉnh các cơ chế truyền tải MCP tùy chỉnh
  - **Azure Event Grid Transport**: Triển khai truyền tải theo kiến trúc sự kiện serverless toàn diện
    - Ví dụ C#, TypeScript và Python tích hợp Azure Functions
    - Mẫu kiến trúc sự kiện cho giải pháp MCP có thể mở rộng
    - Bộ thu webhook và xử lý tin nhắn theo đẩy
  - **Azure Event Hubs Transport**: Triển khai truyền tải luồng có độ trễ thấp, tốc độ cao
    - Khả năng luồng dữ liệu thời gian thực cho kịch bản độ trễ thấp
    - Chiến lược phân vùng và quản lý điểm kiểm tra
    - Gom nhóm tin nhắn và tối ưu hiệu năng
  - **Mẫu Tích Hợp Doanh Nghiệp**: Ví dụ kiến trúc sẵn sàng sản xuất
    - Xử lý MCP phân tán trên nhiều Azure Functions
    - Kiến trúc truyền tải kết hợp đa loại
    - Chiến lược độ bền, độ tin cậy và xử lý lỗi tin nhắn
  - **Bảo Mật & Giám Sát**: Tích hợp Azure Key Vault và mẫu quan sát
    - Xác thực managed identity và quyền truy cập tối thiểu
    - Telemetry Application Insights và giám sát hiệu năng
    - Bộ ngắt mạch và mẫu chịu lỗi
  - **Khung Kiểm Thử**: Chiến lược kiểm thử toàn diện cho truyền tải tùy chỉnh
    - Kiểm thử đơn vị với test doubles và mocking
    - Kiểm thử tích hợp với Azure Test Containers
    - Xem xét kiểm thử hiệu năng và tải

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Lĩnh Vực AI Mới Nổi
- **README.md**: Khám phá toàn diện kỹ thuật ngữ cảnh như một lĩnh vực mới nổi
  - **Nguyên Tắc Cốt Lõi**: Chia sẻ ngữ cảnh đầy đủ, nhận biết quyết định hành động, và quản lý cửa sổ ngữ cảnh
  - **Phù Hợp MCP Protocol**: Cách thiết kế MCP xử lý thách thức kỹ thuật ngữ cảnh
    - Giới hạn cửa sổ ngữ cảnh và chiến lược tải ngữ cảnh tiến bộ
    - Xác định độ liên quan và truy xuất ngữ cảnh động
    - Xử lý ngữ cảnh đa phương thức và vấn đề bảo mật
  - **Phương Pháp Triển Khai**: Kiến trúc đơn luồng so với đa agent
    - Kỹ thuật chia nhỏ ngữ cảnh và ưu tiên
    - Tải ngữ cảnh dần dần và chiến lược nén
    - Cách tiếp cận ngữ cảnh phân lớp và tối ưu truy xuất
  - **Khung Đo Lường**: Các chỉ số mới nổi để đánh giá hiệu quả ngữ cảnh
    - Hiệu suất đầu vào, hiệu năng, chất lượng và trải nghiệm người dùng
    - Phương pháp thử nghiệm tối ưu hóa ngữ cảnh
    - Phân tích lỗi và phương pháp cải tiến

#### Cập Nhật Điều Hướng Chương Trình (README.md)
- **Cấu Trúc Mô-đun Nâng Cao**: Cập nhật bảng chương trình bao gồm các chủ đề nâng cao mới
  - Thêm entries Context Engineering (5.14) và Custom Transport (5.15)
  - Định dạng và liên kết điều hướng nhất quán trên tất cả mô-đun
  - Cập nhật mô tả phản ánh nội dung hiện tại

### Cải Tiến Cấu Trúc Thư Mục
- **Chuẩn Hóa Tên**: Đổi tên "mcp transport" thành "mcp-transport" nhất quán với các thư mục chủ đề nâng cao khác
- **Tổ Chức Nội Dung**: Tất cả thư mục 05-AdvancedTopics theo mẫu đặt tên nhất quán (mcp-[topic])

### Tăng Cường Chất Lượng Tài Liệu
- **Đồng Bộ MCP Specification**: Tất cả nội dung mới tham chiếu MCP Specification 2025-06-18 hiện hành
- **Ví Dụ Đa Ngôn Ngữ**: Ví dụ mã đầy đủ bằng C#, TypeScript, và Python
- **Tập Trung Doanh Nghiệp**: Mẫu sẵn sàng sản xuất và tích hợp Azure toàn diện
- **Tài Liệu Trực Quan**: Biểu đồ Mermaid minh họa kiến trúc và luồng

## 18 Tháng 8, 2025

### Cập Nhật Toàn Diện Tài Liệu - Chuẩn MCP 2025-06-18

#### Thực Hành Bảo Mật MCP (02-Security/) - Cập Nhật Toàn Diện Hiện Đại
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Viết lại hoàn toàn theo MCP Specification 2025-06-18
  - **Yêu Cầu Bắt Buộc**: Thêm yêu cầu MUST/MUST NOT rõ ràng từ đặc tả chính thức với chỉ báo trực quan
  - **12 Thực Hành Bảo Mật Cốt Lõi**: Cấu trúc lại từ danh sách 15 mục thành các miền bảo mật toàn diện
    - Bảo mật Token & Xác thực với tích hợp nhà cung cấp danh tính ngoài
    - Quản lý Phiên & Bảo mật Truyền tải với yêu cầu mật mã
    - Bảo vệ Đe dọa AI với tích hợp Microsoft Prompt Shields
    - Kiểm soát Truy cập & Quyền với nguyên tắc quyền tối thiểu
    - An toàn Nội dung & Giám sát với tích hợp Azure Content Safety
    - Bảo mật Chuỗi cung ứng với xác thực thành phần toàn diện
    - Bảo mật OAuth & Ngăn ngừa Confused Deputy với triển khai PKCE
    - Ứng phó Sự cố & Phục hồi với khả năng tự động hóa
    - Tuân thủ & Quản trị với phù hợp quy định
    - Kiểm soát Bảo mật Nâng cao với kiến trúc zero trust
    - Tích hợp Hệ sinh thái Bảo mật Microsoft với giải pháp toàn diện
    - Tiến hóa Bảo mật Liên tục với thực hành thích nghi
  - **Giải Pháp Bảo Mật Microsoft**: Hướng dẫn tích hợp Prompt Shields, Azure Content Safety, Entra ID, và GitHub Advanced Security
  - **Nguồn Tài Nguyên Triển Khai**: Phân loại liên kết tài nguyên toàn diện theo Tài liệu MCP chính thức, Giải pháp Microsoft, Tiêu chuẩn Bảo mật và Hướng dẫn Triển khai

#### Kiểm Soát Bảo Mật Nâng Cao (02-Security/) - Triển Khai Doanh Nghiệp
- **MCP-SECURITY-CONTROLS-2025.md**: Cải tổ toàn diện với khung bảo mật cấp doanh nghiệp
  - **9 Miền Bảo Mật Toàn Diện**: Mở rộng từ kiểm soát cơ bản thành khung doanh nghiệp chi tiết
    - Xác thực & Phân quyền Nâng cao với tích hợp Microsoft Entra ID
    - Bảo mật Token & Kiểm soát Anti-Passthrough với kiểm chứng toàn diện
    - Kiểm soát Bảo mật Phiên với ngăn chặn chiếm đoạt
    - Kiểm soát Bảo mật Đặc thù AI với phòng chống prompt injection và tool poisoning
    - Ngăn Ngừa Tấn Công Confused Deputy với bảo mật proxy OAuth
    - Bảo mật Thực thi Công Cụ với sandboxing và cô lập
    - Kiểm soát Bảo mật Chuỗi cung ứng với xác minh phụ thuộc
    - Kiểm soát Giám sát & Phát hiện với tích hợp SIEM
    - Ứng phó Sự cố & Phục hồi với khả năng tự động hóa
  - **Ví Dụ Triển Khai**: Thêm các khối cấu hình YAML chi tiết và ví dụ mã
  - **Tích Hợp Giải Pháp Microsoft**: Bao phủ toàn diện dịch vụ bảo mật Azure, GitHub Advanced Security, và quản lý danh tính doanh nghiệp

#### Chủ Đề Bảo Mật Nâng Cao (05-AdvancedTopics/mcp-security/) - Triển Khai Sẵn Sàng Sản Xuất
- **README.md**: Viết lại hoàn chỉnh cho triển khai bảo mật doanh nghiệp
  - **Đồng Bộ Chuẩn Hiện Hành**: Cập nhật theo MCP Specification 2025-06-18 với yêu cầu bảo mật bắt buộc
  - **Tăng Cường Xác Thực**: Tích hợp Microsoft Entra ID với ví dụ .NET và Java Spring Security toàn diện
  - **Tích Hợp Bảo Mật AI**: Triển khai Microsoft Prompt Shields và Azure Content Safety với ví dụ Python chi tiết
  - **Giảm Thiểu Mối Đe Dọa Nâng Cao**: Ví dụ triển khai toàn diện cho
    - Ngăn ngừa Tấn Công Confused Deputy với PKCE và xác thực đồng ý người dùng
    - Ngăn chặn Token Passthrough với xác thực audience và quản lý token an toàn
    - Ngăn chặn Chiếm đoạt Phiên với khóa mật mã và phân tích hành vi
  - **Tích Hợp Bảo Mật Doanh Nghiệp**: Giám sát Azure Application Insights, pipeline phát hiện mối đe dọa, và bảo mật chuỗi cung ứng
  - **Danh Sách Kiểm Tra Triển Khai**: Kiểm soát bảo mật bắt buộc và đề xuất rõ ràng, cùng lợi ích hệ sinh thái bảo mật Microsoft

### Cải Tiến Chất Lượng Tài Liệu & Đồng Bộ Chuẩn Mực
- **Tham khảo đặc tả**: Cập nhật tất cả tham chiếu đến Đặc tả MCP hiện tại 2025-06-18  
- **Hệ sinh thái Bảo mật Microsoft**: Cải thiện hướng dẫn tích hợp trong toàn bộ tài liệu bảo mật  
- **Triển khai Thực tiễn**: Thêm các ví dụ mã chi tiết bằng .NET, Java và Python với các mẫu doanh nghiệp  
- **Tổ chức Tài nguyên**: Phân loại toàn diện tài liệu chính thức, tiêu chuẩn bảo mật và hướng dẫn triển khai  
- **Chỉ báo Hình ảnh**: Đánh dấu rõ ràng các yêu cầu bắt buộc so với thực hành được khuyến nghị  

#### Khái niệm Cốt lõi (01-CoreConcepts/) - Cải tiến toàn diện  
- **Cập nhật Phiên bản Giao thức**: Cập nhật tham chiếu đến Đặc tả MCP hiện tại 2025-06-18 với phiên bản dựa trên ngày tháng (định dạng YYYY-MM-DD)  
- **Tinh chỉnh Kiến trúc**: Cải thiện mô tả Hosts, Clients và Servers để phản ánh các mẫu kiến trúc MCP hiện tại  
  - Hosts giờ đây được định nghĩa rõ ràng là các ứng dụng AI điều phối nhiều kết nối client MCP  
  - Clients được mô tả như các kết nối giao thức duy trì quan hệ một-một với server  
  - Servers được nâng cấp với các kịch bản triển khai tại chỗ và từ xa  
- **Tái cấu trúc Primitive**: Cải tổ hoàn toàn các primitive của server và client  
  - Server Primitives: Tài nguyên (nguồn dữ liệu), Lời nhắc (mẫu), Công cụ (hàm thực thi) với giải thích và ví dụ chi tiết  
  - Client Primitives: Lấy mẫu (hoàn thành LLM), Gợi ý (đầu vào người dùng), Ghi nhật ký (gỡ lỗi/giám sát)  
  - Cập nhật với các mẫu phương thức khám phá (`*/list`), truy xuất (`*/get`), và thực thi (`*/call`) hiện đại  
- **Kiến trúc Giao thức**: Giới thiệu mô hình kiến trúc hai lớp  
  - Lớp Dữ liệu: nền tảng JSON-RPC 2.0 với quản lý vòng đời và primitives  
  - Lớp Vận chuyển: STDIO (tại chỗ) và HTTP có thể truyền stream với SSE (từ xa)  
- **Khung Bảo mật**: Nguyên tắc bảo mật toàn diện bao gồm sự đồng ý rõ ràng của người dùng, bảo vệ quyền riêng tư dữ liệu, an toàn thực thi công cụ và bảo mật lớp vận chuyển  
- **Mẫu Giao tiếp**: Cập nhật tin nhắn giao thức hiển thị các luồng khởi tạo, khám phá, thực thi và thông báo  
- **Ví dụ Mã**: Làm mới các ví dụ đa ngôn ngữ (.NET, Java, Python, JavaScript) để phản ánh các mẫu SDK MCP hiện tại  

#### Bảo mật (02-Security/) - Cải tổ Bảo mật Toàn diện  
- **Căn chỉnh Tiêu chuẩn**: Căn chỉnh hoàn toàn với yêu cầu bảo mật Đặc tả MCP 2025-06-18  
- **Tiến hóa Xác thực**: Ghi lại tiến trình từ máy chủ OAuth tùy chỉnh sang ủy quyền nhà cung cấp định danh bên ngoài (Microsoft Entra ID)  
- **Phân tích Mối đe dọa AI Cụ thể**: Mở rộng đề cập đến các vectơ tấn công AI hiện đại  
  - Kịch bản tấn công tiêm thông điệp détaill với ví dụ thực tế  
  - Các cơ chế đầu độc công cụ và mẫu tấn công "rug pull"  
  - Đầu độc cửa sổ ngữ cảnh và tấn công gây nhầm lẫn mô hình  
- **Giải pháp Bảo mật AI Microsoft**: Phủ sóng toàn diện hệ sinh thái bảo mật Microsoft  
  - AI Prompt Shields với phát hiện nâng cao, làm nổi bật, và kỹ thuật phân tách  
  - Mẫu tích hợp Azure Content Safety  
  - GitHub Advanced Security cho bảo vệ chuỗi cung ứng  
- **Giảm thiểu Mối đe dọa Nâng cao**: Kiểm soát bảo mật chi tiết cho  
  - Chiếm quyền phiên với kịch bản tấn công MCP cụ thể và yêu cầu mã định danh phiên mã hóa  
  - Vấn đề deputy nhầm lẫn trong kịch bản proxy MCP với yêu cầu đồng ý rõ ràng  
  - Lỗ hổng chuyển token với kiểm soát xác thực bắt buộc  
- **Bảo mật Chuỗi Cung ứng**: Mở rộng đề cập chuỗi cung ứng AI bao gồm mô hình nền tảng, dịch vụ nhúng, nhà cung cấp ngữ cảnh và API bên thứ ba  
- **Bảo mật Nền tảng**: Tăng cường tích hợp với các mẫu bảo mật doanh nghiệp bao gồm kiến trúc zero trust và hệ sinh thái bảo mật Microsoft  
- **Tổ chức Tài nguyên**: Phân loại các liên kết tài nguyên toàn diện theo loại (Tài liệu Chính thức, Tiêu chuẩn, Nghiên cứu, Giải pháp Microsoft, Hướng dẫn Triển khai)  

### Cải tiến Chất lượng Tài liệu  
- **Mục tiêu Học tập Có cấu trúc**: Nâng cao mục tiêu học tập với kết quả cụ thể và khả thi  
- **Tham chiếu Chéo**: Thêm liên kết giữa các chủ đề bảo mật và khái niệm cốt lõi liên quan  
- **Thông tin Hiện hành**: Cập nhật tất cả tham chiếu ngày tháng và liên kết đặc tả theo tiêu chuẩn hiện hành  
- **Hướng dẫn Triển khai**: Thêm hướng dẫn triển khai cụ thể và khả thi xuyên suốt cả hai phần  

## 16 tháng 7, 2025  

### README và Cải tiến Định hướng  
- Thiết kế lại hoàn toàn điều hướng chương trình học trong README.md  
- Thay thế thẻ `<details>` bằng định dạng bảng dễ truy cập hơn  
- Tạo các tùy chọn bố cục thay thế trong thư mục "alternative_layouts" mới  
- Thêm các ví dụ điều hướng theo thẻ, kiểu thẻ tab và kiểu accordion dựa trên thẻ  
- Cập nhật phần cấu trúc kho lưu trữ để bao gồm tất cả tệp mới nhất  
- Cải thiện phần "Cách Sử dụng Chương trình Học" với các khuyến nghị rõ ràng  
- Cập nhật các liên kết đặc tả MCP trỏ đến URL chính xác  
- Thêm phần Kỹ thuật Ngữ cảnh (5.14) vào cấu trúc chương trình học  

### Cập nhật Hướng dẫn Học tập  
- Sửa đổi hoàn toàn hướng dẫn học tập để phù hợp với cấu trúc kho lưu trữ hiện tại  
- Thêm các phần mới cho MCP Clients và Công cụ, và Các Server MCP Phổ biến  
- Cập nhật Bản đồ Chương trình Học Trực quan để phản ánh chính xác tất cả chủ đề  
- Cải thiện mô tả các Chủ đề Nâng cao để bao phủ tất cả lĩnh vực chuyên biệt  
- Cập nhật phần Nghiên cứu Tình huống để phản ánh ví dụ thực tế  
- Thêm nhật ký thay đổi toàn diện này  

### Đóng góp Cộng đồng (06-CommunityContributions/)  
- Thêm thông tin chi tiết về các server MCP tạo hình ảnh  
- Thêm phần toàn diện về sử dụng Claude trong VSCode  
- Thêm hướng dẫn thiết lập và sử dụng client terminal Cline  
- Cập nhật phần client MCP để bao gồm tất cả lựa chọn client phổ biến  
- Cải thiện ví dụ đóng góp với các mẫu mã chính xác hơn  

### Chủ đề Nâng cao (05-AdvancedTopics/)  
- Sắp xếp tất cả thư mục chủ đề chuyên biệt với tên gọi nhất quán  
- Thêm tài liệu và ví dụ kỹ thuật ngữ cảnh  
- Thêm tài liệu tích hợp agent Foundry  
- Cải thiện tài liệu tích hợp bảo mật Entra ID  

## 11 tháng 6, 2025  

### Tạo Mới Ban đầu  
- Phát hành phiên bản đầu tiên của chương trình học MCP for Beginners  
- Tạo cấu trúc cơ bản cho tất cả 10 phần chính  
- Triển khai Bản đồ Chương trình Học Trực quan để định hướng  
- Thêm các dự án mẫu ban đầu bằng nhiều ngôn ngữ lập trình  

### Bắt đầu (03-GettingStarted/)  
- Tạo ví dụ triển khai server đầu tiên  
- Thêm hướng dẫn phát triển client  
- Bao gồm hướng dẫn tích hợp client LLM  
- Thêm tài liệu tích hợp VS Code  
- Triển khai ví dụ server dùng Server-Sent Events (SSE)  

### Khái niệm Cốt lõi (01-CoreConcepts/)  
- Thêm giải thích chi tiết kiến trúc client-server  
- Tạo tài liệu về các thành phần chính giao thức  
- Ghi nhận các mẫu tin nhắn trong MCP  

## 23 tháng 5, 2025  

### Cấu trúc Kho lưu trữ  
- Khởi tạo kho lưu trữ với cấu trúc thư mục cơ bản  
- Tạo tệp README cho từng phần chính  
- Thiết lập hạ tầng dịch thuật  
- Thêm tài nguyên hình ảnh và sơ đồ  

### Tài liệu  
- Tạo README.md ban đầu với tổng quan chương trình học  
- Thêm CODE_OF_CONDUCT.md và SECURITY.md  
- Thiết lập SUPPORT.md với hướng dẫn trợ giúp  
- Tạo cấu trúc hướng dẫn học tập sơ bộ  

## 15 tháng 4, 2025  

### Lập Kế hoạch và Khung  
- Lập kế hoạch ban đầu cho chương trình học MCP for Beginners  
- Xác định mục tiêu học tập và đối tượng mục tiêu  
- Phác thảo cấu trúc 10 phần của chương trình học  
- Phát triển khung khái niệm cho ví dụ và nghiên cứu tình huống  
- Tạo ví dụ nguyên mẫu ban đầu cho các khái niệm chính

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->