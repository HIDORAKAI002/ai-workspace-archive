# Changelog: MCP for Beginners Curriculum

Tài liệu này là bản ghi lại tất cả các thay đổi quan trọng đã thực hiện đối với chương trình giảng dạy Model Context Protocol (MCP) cho người mới bắt đầu. Các thay đổi được ghi lại theo thứ tự thời gian đảo ngược (thay đổi mới nhất trước).

## Ngày 2 tháng 7, 2026

### Bài học mới: Bản phát hành ứng cử viên đặc tả MCP 2026-07-28

Đã thêm nội dung về bản phát hành ứng cử viên đặc tả MCP `2026-07-28` sắp tới (đã được công bố ngày 21 tháng 5 năm 2026; bản phát hành chính thức dự kiến ngày 28 tháng 7 năm 2026), tóm tắt từ [bài đăng blog thông báo chính thức](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Cơ sở của chương trình giảng dạy vẫn giữ nguyên là **Đặc tả MCP 2025-11-25** cho đến khi phiên bản mới được phát hành, nên đây được trình bày như hướng dẫn cho tương lai chứ không phải viết lại các bài học hiện có.

- **Mới**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — một bài học đầy đủ bao gồm lõi giao thức không trạng thái (loại bỏ handshake `initialize` và `Mcp-Session-Id`), các header định tuyến mới `Mcp-Method`/`Mcp-Name`, metadata cache `ttlMs`/`cacheScope`, W3C Trace Context trong `_meta`, khuôn khổ Extensions chính thức (MCP Apps và mở rộng Tasks mới), sáu SEP tăng cường phân quyền, việc ngừng sử dụng Roots/Sampling/Logging, và chuyển sang sử dụng hoàn toàn JSON Schema 2020-12 cho các schema công cụ.
- **Cập nhật** với các chú thích hướng tới tương lai liên kết tới bài học mới:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): ghi chú phiên bản giao thức, các phần Sampling/Roots/Logging/Tasks, và "Điều gì sẽ tiếp theo"
  - [02-Security/README.md](./02-Security/README.md): chú thích tăng cường phân quyền
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): chú thích giao thức không trạng thái
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): chú thích việc ngừng sử dụng Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): chú thích việc ngừng sử dụng Logging và mở rộng Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): chú thích giao thức không trạng thái/định tuyến phiên
  - [README.md](./README.md): ghi chú "Nhìn về phía trước" trong phần đặc tả và mục mới `1.1` trong bảng module của chương trình giảng dạy
  - [study_guide.md](./study_guide.md): đầu dòng hướng tới tương lai dưới phần tổng quan Core Concepts và ghi chú phụ ngày tháng
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): chú thích về map giao thức `mcp-session-id` trước mô hình request không trạng thái
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): chú thích tổng quan module về việc ngừng sử dụng Root Contexts/Sampling và mở rộng Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): chú thích tăng cường phân quyền

## Ngày 24 tháng 6, 2026

### Bài học mới: Sử dụng MCP trong ứng dụng Copilot

- [Phần Công cụ](./12-tooling/README.md) Thêm phần công cụ.
- [MCP trong ứng dụng Copilot](./12-tooling/01-copilot-app/README.md)

## Ngày 16 tháng 6, 2026

### Căn chỉnh Đặc tả MCP & Xác thực Mẫu

Đã kiểm tra chương trình giảng dạy với **Đặc tả MCP 2025-11-25** hiện hành và các SDK chính thức mới nhất, sau đó sửa các tham chiếu đặc tả lỗi thời còn lại và xác nhận các mẫu cốt lõi vẫn xây dựng và chạy được.

#### Sửa các Phiên bản Đặc tả (2025-06-18 / 2025-03-26 → 2025-11-25)

Cập nhật nội dung tiếng Anh nơi vẫn cho rằng phiên bản đặc tả cũ hơn là tiêu chuẩn *hiện tại/mới nhất*, đồng thời chuyển các đường dẫn tới các đường dẫn đặc tả chính thức `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Cập nhật banner "Chuẩn Hiện Tại", phần giới thiệu, tiêu đề nguyên tắc bảo mật cốt lõi, tiêu đề yêu cầu bắt buộc, phần Microsoft Entra ID, liên kết Tài liệu Tham khảo & Tài nguyên, và thông báo bảo mật cuối cùng (8 tham chiếu) thành 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Cập nhật liên kết Tài nguyên bổ sung và banner "Chuẩn Hiện Tại" thành 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Thay thế liên kết bảo mật-và-niềm-tin lỗi thời `2025-03-26` bằng trang thực hành bảo mật tốt nhất 2025-11-25 hiện tại
- **03-GettingStarted/14-sampling/README.md**: Cập nhật liên kết tài liệu Sampling chính thức thành 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Cập nhật tham chiếu "đặc tả MCP hiện tại" ở thời hiện tại và liên kết đặc tả Tài nguyên Bổ sung thành 2025-11-25 (giữ nguyên ghi chú SSE-deprecation lịch sử để chính xác)

#### Xác thực Mẫu với SDK Hiện tại

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` cài được `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` không báo lỗi kiểu — API `McpServer`/`StdioServerTransport` hiện hữu còn hợp lệ
- **Python (03-GettingStarted/01-first-server/solution/python)**: Xác thực trong `.venv` riêng với `mcp[cli]` (1.27.2); `py_compile` thành công và `FastMCP.list_tools()` trả về chính xác các công cụ `add` và `subtract`
- Xác nhận tất cả phạm vi phiên bản mẫu của `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) đều được phân giải rõ ràng lên phiên bản hiện tại `1.29.0` mà không thay đổi API phá vỡ

#### Căn chỉnh Khóa phiếu Phụ thuộc (đóng khoảng cách phiên bản)

Tăng phiên bản SDK lỗi thời để mọi mẫu theo kịp phát hành MCP hiện tại, khớp quy ước toàn repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Tăng `@modelcontextprotocol/sdk` từ `^1.8.0` → `>=1.26.0` và cập nhật mô tả package lỗi thời `"updated for MCP 2025-06-18"` thành `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** và **lab4/code/github_mcp_server/pyproject.toml**: Tăng chính xác `mcp==1.23.0` → `mcp>=1.26.0`; tái tạo cả hai file lock `uv.lock` (`uv lock`) để các file khóa giải quyết lên `mcp 1.27.2` hiện tại và đồng bộ với manifest

#### Phân tích Khoảng trống Chương trình — Bao phủ Tính năng Đặc tả Mới nhất

Xác nhận chương trình giảng dạy đã bao phủ tất cả các kiểu nguyên thủy được giới thiệu/mở rộng trong MCP 2025-11-25, không còn khoảng trống nội dung:
- **Sampling**: Bài học 03-GettingStarted/14-sampling cộng với 05-AdvancedTopics/mcp-sampling
- **Elicitation (bao gồm chế độ URL)**: Được tài liệu hóa trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Được tài liệu hóa trong 00-Introduction, 01-CoreConcepts, và 05-AdvancedTopics/mcp-root-contexts
- **Tasks (thử nghiệm, các hoạt động chạy lâu dài)**: Được tài liệu hóa trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features
- **Chú thích Công cụ** (`readOnlyHint` / `destructiveHint`): Được tài liệu hóa trong 01-CoreConcepts và 05-AdvancedTopics/mcp-protocol-features

### Tăng cường Bảo mật & Sửa lỗ hổng Phụ thuộc

Thực hiện quét bảo mật toàn diện tất cả manifest phụ thuộc và mã nguồn mẫu, sau đó xử lý tất cả cảnh báo npm đã báo và một phát hiện cấp mã. Sau khi khắc phục, `npm audit` báo cáo **0 lỗ hổng** trên mọi thư mục được kiểm tra.

#### Lỗ hổng Phụ thuộc npm (chuyển tiếp) — Đã sửa

Kiểm tra 15 file `package-lock.json` được commit. Lỗ hổng hạn chế trong các phụ thuộc chuyển tiếp do công cụ phát triển MCP Inspector, client OpenAI, và MCP SDK kéo về; tất cả đều đã được giải quyết mà không phá hỏng mẫu:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** và **lab3/code/weather_mcp/inspector**: Tăng `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), sửa các cảnh báo của `ajv`, `brace-expansion`, `diff`, `path-to-regexp` và `ws`. Thêm mục `overrides` npm ép dùng `shell-quote@1.8.4` đã được vá để loại bỏ cảnh báo nghiêm trọng còn lại do `concurrently` mang; tái tạo cả hai file khóa (hiện không có lỗi)
- **03-GettingStarted/samples/typescript**: `npm audit fix` cập nhật `qs` chuyển tiếp (mức trung bình) sang bản vá
- **03-GettingStarted/samples/javascript**: `npm audit fix` cập nhật `hono` chuyển tiếp (mức trung bình) sang bản vá
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` cập nhật `form-data` chuyển tiếp (mức cao) sang bản vá
- **03-GettingStarted/11-simple-auth/solution/typescript**: Tạo file `package-lock.json` thiếu để dự án có thể tái tạo và kiểm tra (0 lỗ hổng)

#### Sửa Bảo mật Cấp Mã (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Loại bỏ `shell=True` khỏi công cụ `open_in_vscode`. Trước đó `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` cho phép các ký tự đặc biệt shell trong đường dẫn thư mục được `cmd.exe` giải thích (vector tấn công tiêm lệnh). Hiện nó chạy trực tiếp `Code.exe` đã được phân giải với thư mục làm tham số — không chạy shell — về chức năng tương đương và an toàn

#### Kiểm tra Phụ thuộc Python

- Kiểm tra tất cả yêu cầu Python với `pip-audit`. `05-AdvancedTopics` và `03-GettingStarted/samples/python` không báo lỗi bảo mật đã biết (các phạm vi `mcp` / `httpx` / `pydantic` / `python-dotenv` được phân giải sang bản vá hiện tại)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` đánh dấu phụ thuộc chuyển tiếp **`werkzeug` 3.1.1** với ba cảnh báo DoS tên thiết bị Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, và `CVE-2026-27199` (tất cả đã được sửa trong 3.1.6). Thêm khóa bảo mật rõ ràng `werkzeug>=3.1.6` để phân giải bản vá; xác nhận ràng buộc phân giải sạch với stack `chainlit` / `mcp` / `semantic-kernel`

### Đổi Tên Sản Phẩm

Cập nhật toàn bộ nội dung chương trình giảng dạy để phản ánh đổi tên sản phẩm của Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Cập nhật liên kết cộng đồng Discord
- **AGENTS.md**: Cập nhật tham chiếu máy chủ Discord
- **README.md**: Cập nhật tham chiếu hệ sinh thái công nghệ
- **study_guide.md**: Cập nhật tham chiếu nghiên cứu trường hợp
- **05-AdvancedTopics/README.md**: Cập nhật tiêu đề và mô tả Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Cập nhật tiêu đề phần và mô tả
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Cập nhật toàn bộ tiêu đề và nội dung module
- **05-AdvancedTopics/mcp-security-entra/README.md**: Cập nhật liên kết tham chiếu chéo
- **07-LessonsfromEarlyAdoption/README.md**: Cập nhật tham chiếu nghiên cứu trường hợp
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Cập nhật tiêu đề Phần 9, huy hiệu và năng lực
- **08-BestPractices/README.md**: Cập nhật liên kết cộng đồng Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Cập nhật kênh Discord tham chiếu
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Cập nhật tham chiếu triển khai mô hình
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Cập nhật bảng Dịch vụ AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Cập nhật tham chiếu tài nguyên

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Cập nhật tham chiếu chương trình chính
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Cập nhật tiêu đề mô-đun, tổng quan và tất cả các tiêu đề mô-đun
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Cập nhật tiêu đề, mục tiêu học tập, hướng dẫn thiết lập và tài nguyên
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Cập nhật tiêu đề, mục tiêu học tập, bảng máy chủ MCP và tham chiếu chéo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Cập nhật tiêu đề, huy hiệu, điều kiện tiên quyết và tài nguyên
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Cập nhật tham chiếu Agent Builder và liên kết phản hồi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Cập nhật điều kiện tiên quyết và tham chiếu phần mở rộng

---

## Ngày 11 tháng 4, 2026

### Bài học mới, Sửa lỗi tài liệu và Cập nhật phụ thuộc

#### Thêm nội dung chương trình mới

**Mô-đun 05 - Chủ đề Nâng cao**
- **Bài học 5.17: Lý luận Đối kháng Đa Tác nhân với MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Hướng dẫn toàn diện mới bao gồm mẫu tranh luận đối kháng cho hệ thống đa tác nhân
  - Sơ đồ kiến trúc Mermaid: hai tác nhân → máy chủ MCP chia sẻ → bản ghi tranh luận → giám khảo → phán quyết
  - Máy chủ công cụ MCP chia sẻ (`web_search` + `run_python`) được triển khai bằng Python và TypeScript
  - Lời nhắc hệ thống đối kháng (CHO / PHẢN ĐỐI / Giám khảo) với yêu cầu sử dụng công cụ rõ ràng
  - Bộ điều phối tranh luận bằng Python, TypeScript, và C# quản lý các vòng và định tuyến luận điểm
  - Kết nối MCP `ClientSession` cho bộ điều phối đến các cuộc gọi công cụ thực tế
  - Bảng trường hợp sử dụng (phát hiện ảo giác, mô hình hóa mối đe dọa, đánh giá thiết kế API, xác minh thực tế, lựa chọn công nghệ)
  - Các cân nhắc bảo mật: thực thi trong sandbox, xác thực cuộc gọi công cụ, giới hạn tần suất, ghi nhật ký kiểm toán
  - Bài tập có cấu trúc với ba kịch bản thực tế (đánh giá mã, quyết định kiến trúc, kiểm duyệt nội dung)

#### Sửa lỗi tài liệu

**Mô-đun 03 - Bắt đầu**
- **05-stdio-server/README.md**: Sửa ví dụ máy chủ stdio TypeScript chưa hoàn chỉnh — thêm khởi tạo transport bị thiếu (`new StdioServerTransport()`) và gọi `server.connect(transport)` để phù hợp với ví dụ Python và .NET trong cùng phần
- **14-sampling/README.md**: Sửa lỗi chép nhầm — sửa `"Sampling is an davanced features"` thành `"Sampling is an advanced feature"`

#### Cập nhật chương trình

**README.md chính**
- Thêm mục 5.17 (Lý luận Đối kháng Đa Tác nhân với MCP) vào bảng chương trình với liên kết trực tiếp đến bài học mới

**05-AdvancedTopics/README.md**
- Thêm dòng bài học 5.17 vào bảng bài học

**study_guide.md**
- Thêm chủ đề Lý luận Đối kháng Đa Tác nhân vào sơ đồ tư duy và mô tả văn bản về Chủ đề Nâng cao

#### Sửa lỗi mã và bảo mật

**Mô-đun 05 - Tác nhân Đối kháng (`mcp-adversarial-agents`)**
- **Sửa lỗi bảo mật — chèn lệnh sai**: Thay thế `execSync` shell interpolation bằng `execFile` + `promisify` trong công cụ TypeScript `run_python`, loại bỏ bề mặt chèn lệnh (mã do LLM điều khiển giờ được truyền như phần tử argv nguyên văn, không qua shell)
- **Kết nối vòng lặp công cụ MCP**: Cập nhật bộ điều phối tranh luận Python sử dụng client `AsyncAnthropic` (thay vì đồng bộ `Anthropic` chặn), truyền trực tiếp `ClientSession` sống mỗi lượt của tác nhân, lấy định nghĩa công cụ qua `session.list_tools()` mỗi lượt, và gửi khối `tool_use` qua `session.call_tool()` trong vòng lặp cho đến khi mô hình phát ra phản hồi văn bản cuối cùng

#### Cập nhật phụ thuộc

- Nâng cấp `hono` lên 4.12.12 ở nhiều gói (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Nâng cấp `@hono/node-server` từ 1.19.11 lên 1.19.13 trong các gói TypeScript
- Nâng cấp `cryptography` từ 46.0.5 lên 46.0.7 trong các gói Python (10-StreamliningAIWorkflows labs 3 và 4)
- Nâng cấp `lodash` từ 4.17.23 lên 4.18.1 trong trình kiểm tra 10-StreamliningAIWorkflows

#### Phiên dịch

- Đồng bộ bản dịch cho hơn 48 ngôn ngữ với các thay đổi mới nhất của mã nguồn (cập nhật i18n)

---

## Ngày 5 tháng 2, 2026

### Cải tiến xác thực toàn kho và điều hướng

#### Thêm nội dung chương trình mới

**Mô-đun 03 - Bắt đầu**
- **12-mcp-hosts/README.md**: Hướng dẫn toàn diện mới cho việc thiết lập các máy chủ MCP
  - Ví dụ cấu hình Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Mẫu cấu hình JSON cho tất cả các máy chủ chính
  - Bảng so sánh các loại transport (stdio, SSE/HTTP, WebSocket)
  - Khắc phục sự cố kết nối thường gặp
  - Thực hành bảo mật tốt nhất cho cấu hình máy chủ

- **13-mcp-inspector/README.md**: Hướng dẫn gỡ lỗi mới cho MCP Inspector
  - Phương pháp cài đặt (npx, npm toàn cục, từ nguồn)
  - Kết nối đến máy chủ qua stdio và HTTP/SSE
  - Công cụ, tài nguyên và workflow prompts thử nghiệm
  - Tích hợp MCP Inspector với VS Code
  - Các tình huống gỡ lỗi phổ biến cùng giải pháp

**Mô-đun 04 - Triển khai Thực tế**
- **pagination/README.md**: Hướng dẫn triển khai phân trang mới
  - Các mẫu phân trang dựa trên con trỏ trong Python, TypeScript, Java
  - Xử lý phân trang phía khách hàng
  - Chiến lược thiết kế con trỏ (mờ đối với có cấu trúc)
  - Khuyến nghị tối ưu hiệu suất

**Mô-đun 05 - Chủ đề Nâng cao**
- **mcp-protocol-features/README.md**: Khám phá sâu các tính năng giao thức mới
  - Triển khai thông báo tiến trình
  - Mẫu hủy yêu cầu
  - Mẫu tài nguyên với mẫu URI
  - Quản lý vòng đời máy chủ
  - Kiểm soát mức độ ghi nhật ký
  - Các mẫu xử lý lỗi với mã JSON-RPC

#### Sửa lỗi điều hướng (cập nhật hơn 24 tập tin)

**README mô-đun chính**
 Hiện liên kết tới bài học đầu tiên VÀ mô-đun tiếp theo

**Các tệp phụ 02-Security**
- Tất cả 5 tài liệu bảo mật bổ sung đều có phần điều hướng "Tiếp theo là gì":

**Các tệp nghiên cứu tình huống 09-CaseStudy**
- Tất cả các tệp nghiên cứu tình huống giờ đều có điều hướng tuần tự:

**Phòng thí nghiệm 10-StreamliningAI**
Thêm phần "Tiếp theo là gì" vào tổng quan Mô-đun 10 và Mô-đun 11

#### Sửa lỗi mã và nội dung

**Cập nhật SDK và phụ thuộc**
Sửa phiên bản openai trống thành `^4.95.0`
Cập nhật SDK từ `^1.8.0` lên `>=1.26.0`
Cập nhật các khoá phiên bản mcp thành `>=1.26.0`

**Sửa lỗi mã**
Sửa model không hợp lệ `gpt-4o-mini` thành `gpt-4.1-mini`

**Sửa lỗi nội dung**
Sửa liên kết sai `READMEmd` → `README.md`, sửa tiêu đề chương trình `Module 1-3` → `Module 0-3`, sửa đường dẫn phân biệt chữ hoa thường
Xoá nội dung trùng lặp tham khảo nghiên cứu tình huống 5 bị hỏng

**Cải thiện hướng dẫn cho người mới bắt đầu**
Thêm phần giới thiệu, mục tiêu học tập và điều kiện tiên quyết phù hợp cho người mới

#### Cập nhật chương trình

**README.md chính**
- Thêm mục 3.12 (Máy chủ MCP), 3.13 (MCP Inspector), 4.1 (Phân trang), 5.16 (Tính năng Giao thức) vào bảng chương trình

**README các mô-đun**
Thêm bài học 12 và 13 vào danh sách bài học
Thêm mục Hướng dẫn Thực hành với liên kết phân trang
Thêm bài học 5.15 (Transport Tùy chỉnh) và 5.16 (Tính năng Giao thức)

**study_guide.md**
- Cập nhật sơ đồ tư duy với tất cả chủ đề mới: Thiết lập Máy chủ MCP, MCP Inspector, Chiến lược Phân trang, Khám phá Tính năng Giao thức

## Ngày 28 tháng 1, 2026

### Đánh giá tuân thủ đặc tả MCP 2025-11-25

#### Cải tiến Khái niệm Cốt lõi (01-CoreConcepts/)
- **Primitive Khách hàng mới - Roots**: Thêm tài liệu toàn diện về primitive Roots cho khách hàng, cho phép máy chủ hiểu ranh giới hệ thống tập tin và quyền truy cập
- **Ghi chú hành vi công cụ**: Thêm tài liệu về ghi chú hành vi công cụ (`readOnlyHint`, `destructiveHint`) để ra quyết định thực thi công cụ chính xác hơn
- **Gọi công cụ trong Sampling**: Cập nhật tài liệu Sampling để bao gồm tham số `tools` và `toolChoice` cho việc gọi công cụ theo mô hình trong yêu cầu sampling
- **Kích hoạt chế độ URL**: Thêm tài liệu về kích hoạt URL để máy chủ khởi xướng tương tác web ngoài
- **Tasks (Thử nghiệm)**: Thêm phần mô tả tính năng Tasks thử nghiệm cho bao đóng thực thi bền bỉ và truy xuất kết quả trì hoãn
- **Hỗ trợ biểu tượng**: Ghi nhận rằng công cụ, tài nguyên, mẫu tài nguyên, và lời nhắc giờ có thể bao gồm biểu tượng như metadata bổ sung

#### Cập nhật tài liệu
- **README.md**: Thêm tham chiếu phiên bản Đặc tả MCP 2025-11-25 và giải thích đánh số phiên bản theo ngày
- **study_guide.md**: Cập nhật bản đồ chương trình để bao gồm Tasks và Ghi chú Công cụ trong phần Khái niệm Cốt lõi; cập nhật tem tài liệu

#### Kiểm tra tuân thủ đặc tả
- **Phiên bản giao thức**: Xác nhận tất cả tài liệu tham chiếu Đặc tả MCP 2025-11-25 hiện tại
- **Kiến trúc phù hợp**: Xác nhận tài liệu kiến trúc hai lớp (Lớp Dữ liệu + Lớp Transport) chính xác
- **Tài liệu primitives**: Xác thực các primitives máy chủ (Resources, Prompts, Tools) và primitives khách hàng (Sampling, Elicitation, Logging, Roots)
- **Cơ chế truyền tải**: Xác nhận tính chính xác của tài liệu về STDIO và HTTP có thể stream
- **Hướng dẫn bảo mật**: Xác nhận phù hợp với tài liệu Thực hành Bảo mật MCP hiện hành

#### Tính năng chính MCP 2025-11-25 được tài liệu
- **Phát hiện OpenID Connect**: Khám phá máy chủ xác thực thông qua OIDC
- **Tài liệu Metadata Client ID OAuth**: Cơ chế đăng ký khách hàng được khuyến nghị
- **JSON Schema 2020-12**: Biệt ngữ mặc định cho định nghĩa schema MCP
- **Hệ thống phân tầng SDK**: Yêu cầu chính thức cho hỗ trợ và duy trì tính năng SDK
- **Cấu trúc quản trị**: Hình thành chính thức các Nhóm Công tác và Nhóm Quan tâm trong quản trị MCP

### Cập nhật lớn tài liệu Bảo mật (02-Security/)

#### Tích hợp MCP Security Summit Workshop (Sherpa)
- **Tài nguyên đào tạo thực hành mới**: Thêm tích hợp toàn diện với [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) trong toàn bộ tài liệu bảo mật
- **Lộ trình Hành trình Đoàn leo núi**: Tài liệu hoàn chỉnh tiến trình từ Trại gốc đến Đỉnh núi
- **Phù hợp OWASP**: Tất cả hướng dẫn bảo mật nay ánh xạ với các rủi ro OWASP MCP Azure Security Guide

#### Tích hợp OWASP MCP Top 10
- **Mục mới**: Thêm bảng Rủi ro Bảo mật OWASP MCP Top 10 với biện pháp Azure vào README Bảo mật chính
- **Tài liệu theo rủi ro**: Cập nhật mcp-security-controls-2025.md với tham chiếu rủi ro OWASP MCP cho từng lĩnh vực an ninh
- **Kiến trúc tham khảo**: Liên kết đến kiến trúc tham khảo và mẫu triển khai OWASP MCP Azure Security Guide

#### Cập nhật các tệp bảo mật
- **README.md**: Thêm tổng quan Sherpa Workshop, bảng lộ trình, tóm tắt rủi ro OWASP MCP Top 10, phần đào tạo thực hành
- **mcp-security-controls-2025.md**: Cập nhật tiêu đề tháng 2 năm 2026, thêm tham chiếu rủi ro OWASP (MCP01-MCP08), sửa lỗi phiên bản đặc tả không nhất quán
- **mcp-security-best-practices-2025.md**: Thêm phần tài nguyên Sherpa và OWASP, cập nhật tem tài liệu
- **mcp-best-practices.md**: Thêm phần đào tạo thực hành với các liên kết Sherpa và OWASP
- **azure-content-safety-implementation.md**: Thêm tham chiếu OWASP MCP06, phù hợp Camp 3 Sherpa, và phần tài nguyên bổ sung

#### Thêm liên kết tài nguyên mới
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Trang rủi ro OWASP MCP riêng lẻ (MCP01-MCP10)

### Đồng bộ Đặc tả MCP 2025-11-25 Toàn Chương Trình

#### Mô-đun 03 - Bắt đầu
- **Tài liệu SDK**: Thêm Go SDK vào danh sách SDK chính thức; cập nhật tất cả tham chiếu SDK phù hợp Đặc tả MCP 2025-11-25
- **Làm rõ Transport**: Cập nhật mô tả transport STDIO và HTTP Streaming với tham chiếu đặc tả rõ ràng

#### Mô-đun 04 - Triển khai Thực tế
- **Cập nhật SDK**: Thêm Go SDK; cập nhật danh sách SDK kèm tham chiếu phiên bản đặc tả
- **Đặc tả ủy quyền**: Cập nhật liên kết đặc tả MCP Authorization đến phiên bản hiện tại 2025-11-25

#### Mô-đun 05 - Chủ đề Nâng cao
- **Tính năng mới**: Thêm ghi chú về các tính năng mới của Đặc tả MCP 2025-11-25 (Tasks, Ghi chú Công cụ, Kích hoạt URL, Roots)
- **Tài nguyên bảo mật**: Thêm liên kết OWASP MCP Top 10 và hội thảo Sherpa vào tài liệu tham khảo bổ sung

#### Mô-đun 06 - Đóng góp Cộng đồng
- **Danh sách SDK**: Thêm Swift và Rust SDK; cập nhật liên kết đặc tả đến MCP 2025-11-25
- **Tham chiếu đặc tả**: Cập nhật liên kết đặc tả MCP đến URL đặc tả chính thức

#### Mô-đun 07 - Bài học từ Việc Áp dụng Sớm
- **Cập nhật tài nguyên**: Thêm liên kết MCP Specification 2025-11-25 và OWASP MCP Top 10 vào tài nguyên bổ sung

#### Module 08 - Thực tiễn tốt nhất
- **Phiên bản đặc tả**: Cập nhật tham chiếu MCP Specification thành 2025-11-25
- **Tài nguyên bảo mật**: Thêm OWASP MCP Top 10 và hội thảo Sherpa vào các tài liệu tham khảo bổ sung

#### Module 10 - Tinh giản quy trình làm việc AI
- **Cập nhật biểu tượng**: Thay đổi huy hiệu phiên bản MCP từ phiên bản SDK (1.9.3) thành phiên bản đặc tả (2025-11-25)
- **Liên kết tài nguyên**: Cập nhật liên kết MCP Specification; thêm OWASP MCP Top 10

#### Module 11 - Labs Thực hành MCP Server
- **Tham chiếu đặc tả**: Cập nhật liên kết MCP Specification sang phiên bản 2025-11-25
- **Tài nguyên bảo mật**: Thêm OWASP MCP Top 10 vào tài nguyên chính thức

## 18 tháng 12, 2025

### Cập nhật tài liệu bảo mật - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Cập nhật phiên bản đặc tả
- **Cập nhật phiên bản giao thức**: Cập nhật tham chiếu đến MCP Specification 2025-11-25 mới nhất (phát hành ngày 25 tháng 11 năm 2025)
  - Cập nhật tất cả các tham chiếu phiên bản đặc tả từ 2025-06-18 sang 2025-11-25
  - Cập nhật tham chiếu ngày tài liệu từ ngày 18 tháng 8 năm 2025 sang 18 tháng 12 năm 2025
  - Xác minh tất cả các URL đặc tả trỏ đến tài liệu hiện tại
- **Xác thực nội dung**: Xác thực toàn diện các thực tiễn bảo mật tốt nhất so với các tiêu chuẩn mới nhất
  - **Giải pháp bảo mật Microsoft**: Xác minh thuật ngữ và liên kết hiện tại cho Prompt Shields (trước đây là "phát hiện rủi ro phá rào"), Azure Content Safety, Microsoft Entra ID và Azure Key Vault
  - **Bảo mật OAuth 2.1**: Xác nhận phù hợp với các thực tiễn bảo mật OAuth mới nhất
  - **Tiêu chuẩn OWASP**: Xác thực các tham chiếu OWASP Top 10 cho LLMs vẫn còn mới
  - **Dịch vụ Azure**: Xác minh tất cả các liên kết tài liệu Microsoft Azure và các thực tiễn tốt nhất
- **Đồng bộ tiêu chuẩn**: Tất cả các tiêu chuẩn bảo mật được tham chiếu đều được cập nhật
  - Khuôn khổ quản lý rủi ro AI của NIST
  - ISO 27001:2022
  - Thực tiễn bảo mật OAuth 2.1
  - Các khuôn khổ bảo mật và tuân thủ Azure
- **Tài nguyên triển khai**: Xác minh tất cả các liên kết hướng dẫn triển khai và tài nguyên
  - Mẫu xác thực Azure API Management
  - Hướng dẫn tích hợp Microsoft Entra ID
  - Quản lý bí mật Azure Key Vault
  - DevSecOps pipelines và giải pháp giám sát

### Đảm bảo chất lượng tài liệu
- **Tuân thủ đặc tả**: Đảm bảo tất cả các yêu cầu bảo mật MCP bắt buộc (MUST/MUST NOT) phù hợp với đặc tả mới nhất
- **Cập nhật tài nguyên**: Xác minh tất cả các liên kết bên ngoài đến tài liệu Microsoft, tiêu chuẩn bảo mật và hướng dẫn triển khai
- **Tổng quan thực tiễn tốt nhất**: Xác nhận bao phủ toàn diện xác thực, phân quyền, mối đe dọa AI cụ thể, bảo mật chuỗi cung ứng và các mẫu doanh nghiệp

## 6 tháng 10, 2025

### Mở rộng phần Bắt đầu – Sử dụng máy chủ nâng cao & Xác thực đơn giản

#### Sử dụng máy chủ nâng cao (03-GettingStarted/10-advanced)
- **Thêm chương mới**: Giới thiệu hướng dẫn toàn diện về sử dụng máy chủ MCP nâng cao, bao gồm cả kiến trúc máy chủ thông thường và cấp thấp.
  - **Máy chủ thông thường vs. cấp thấp**: So sánh chi tiết và ví dụ mã Python và TypeScript cho cả hai cách tiếp cận.
  - **Thiết kế dựa trên handler**: Giải thích quản lý công cụ/tài nguyên/lời nhắc dựa trên handler để triển khai máy chủ linh hoạt, mở rộng.
  - **Mẫu thực tiễn**: Tình huống thực tế mà các mẫu máy chủ cấp thấp có lợi cho các tính năng và kiến trúc nâng cao.

#### Xác thực đơn giản (03-GettingStarted/11-simple-auth)
- **Thêm chương mới**: Hướng dẫn từng bước triển khai xác thực đơn giản trong các máy chủ MCP.
  - **Khái niệm xác thực**: Giải thích rõ ràng về xác thực và phân quyền, cũng như quản lý thông tin chứng thực.
  - **Triển khai Xác thực cơ bản**: Mẫu xác thực dựa trên middleware trong Python (Starlette) và TypeScript (Express), kèm ví dụ mã.
  - **Tiến tới bảo mật nâng cao**: Hướng dẫn bắt đầu với xác thực đơn giản và tiến tới OAuth 2.1 và RBAC, kèm tham chiếu đến các module bảo mật nâng cao.

Các bổ sung này cung cấp hướng dẫn thực hành, hữu ích cho việc xây dựng các triển khai máy chủ MCP chắc chắn, an toàn và linh hoạt, nối liền khái niệm cơ bản với các mẫu sản xuất nâng cao.

## 29 tháng 9, 2025

### Labs Tích hợp Cơ sở dữ liệu MCP Server – Lộ trình học tập thực hành toàn diện

#### 11-MCPServerHandsOnLabs - Khóa học tích hợp cơ sở dữ liệu hoàn chỉnh mới
- **Lộ trình học 13 lab hoàn chỉnh**: Thêm khóa học thực hành toàn diện xây dựng máy chủ MCP sẵn sàng sản xuất với tích hợp cơ sở dữ liệu PostgreSQL
  - **Triển khai thực tế**: Trường hợp sử dụng phân tích bán lẻ Zava thể hiện các mẫu cấp doanh nghiệp
  - **Tiến trình học tập có cấu trúc**:
    - **Labs 00-03: Nền tảng** - Giới thiệu, Kiến trúc cốt lõi, Bảo mật & đa người thuê, Thiết lập môi trường
    - **Labs 04-06: Xây dựng MCP Server** - Thiết kế & lược đồ cơ sở dữ liệu, Triển khai MCP Server, Phát triển công cụ  
    - **Labs 07-09: Tính năng nâng cao** - Tích hợp tìm kiếm ngữ nghĩa, Kiểm thử & gỡ lỗi, Tích hợp VS Code
    - **Labs 10-12: Sản xuất & Thực tiễn tốt nhất** - Chiến lược triển khai, Giám sát & quan sát, Thực tiễn tốt nhất & tối ưu
  - **Công nghệ doanh nghiệp**: Khung FastMCP, PostgreSQL với pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Tính năng nâng cao**: Row Level Security (RLS), tìm kiếm ngữ nghĩa, truy cập dữ liệu đa người thuê, vector embeddings, giám sát thời gian thực

#### Chuẩn hóa thuật ngữ - Chuyển đổi Module thành Lab
- **Cập nhật tài liệu toàn diện**: Cập nhật có hệ thống tất cả file README trong 11-MCPServerHandsOnLabs để sử dụng thuật ngữ "Lab" thay cho "Module"
  - **Tiêu đề phần**: Cập nhật "What This Module Covers" thành "What This Lab Covers" trong 13 labs
  - **Mô tả nội dung**: Thay "This module provides..." bằng "This lab provides..." xuyên suốt tài liệu
  - **Mục tiêu học tập**: Cập nhật "By the end of this module..." thành "By the end of this lab..."
  - **Liên kết điều hướng**: Chuyển tất cả tham chiếu "Module XX:" thành "Lab XX:" trong các liên kết và điều hướng
  - **Theo dõi hoàn thành**: Cập nhật "After completing this module..." thành "After completing this lab..."
  - **Giữ nguyên tham chiếu kỹ thuật**: Giữ nguyên tham chiếu module Python trong file cấu hình (ví dụ, `"module": "mcp_server.main"`)

#### Cải tiến Hướng dẫn Học tập (study_guide.md)
- **Bản đồ chương trình học trực quan**: Thêm mục "11. Database Integration Labs" với cấu trúc lab đầy đủ
- **Cấu trúc kho lưu trữ**: Cập nhật từ mười thành mười một phần chính với mô tả chi tiết 11-MCPServerHandsOnLabs
- **Hướng dẫn lộ trình học**: Tăng cường hướng dẫn điều hướng cho các phần 00-11
- **Phủ sóng công nghệ**: Thêm FastMCP, PostgreSQL, chi tiết tích hợp dịch vụ Azure
- **Kết quả học tập**: Nhấn mạnh phát triển máy chủ sẵn sàng sản xuất, mẫu tích hợp cơ sở dữ liệu, và bảo mật doanh nghiệp

#### Cải thiện cấu trúc README chính
- **Thuật ngữ dựa trên Lab**: Cập nhật README.md chính trong 11-MCPServerHandsOnLabs để nhất quán sử dụng cấu trúc "Lab"
- **Tổ chức lộ trình học**: Tiến trình rõ ràng từ khái niệm nền tảng tới triển khai nâng cao và vận hành sản xuất
- **Tập trung thực tế**: Nhấn mạnh học tập thực hành với các mẫu và công nghệ cấp doanh nghiệp

### Cải tiến chất lượng & nhất quán tài liệu
- **Tập trung học tập thực hành**: Củng cố cách tiếp cận dựa trên lab xuyên suốt tài liệu
- **Tập trung mẫu doanh nghiệp**: Nhấn mạnh các triển khai sẵn sàng sản xuất và cân nhắc bảo mật doanh nghiệp
- **Tích hợp công nghệ**: Phủ sóng toàn diện các dịch vụ Azure hiện đại và mẫu tích hợp AI
- **Tiến trình học**: Lộ trình rõ ràng, có cấu trúc từ cơ bản đến sản xuất

## 26 tháng 9, 2025

### Cải tiến Nghiên cứu Tình huống - Tích hợp GitHub MCP Registry

#### Nghiên cứu Tình huống (09-CaseStudy/) - Tập trung Phát triển Hệ sinh thái
- **README.md**: Mở rộng lớn với nghiên cứu tình huống toàn diện về GitHub MCP Registry
  - **Nghiên cứu Tình huống GitHub MCP Registry**: Nghiên cứu mới toàn diện xem xét việc ra mắt GitHub MCP Registry tháng 9 năm 2025
    - **Phân tích vấn đề**: Đánh giá chi tiết các thách thức trong khám phá và triển khai máy chủ MCP phân mảnh
    - **Kiến trúc giải pháp**: Cách tiếp cận registry tập trung của GitHub với cài đặt một cú nhấp chuột trên VS Code
    - **Tác động kinh doanh**: Cải thiện đo lường được trong onboarding và năng suất lập trình viên
    - **Giá trị chiến lược**: Tập trung vào triển khai agent mô-đun và khả năng tương tác đa công cụ
    - **Phát triển hệ sinh thái**: Định vị như nền tảng nền tảng cho tích hợp hệ thống agent
  - **Cải tiến cấu trúc nghiên cứu tình huống**: Cập nhật tất cả bảy nghiên cứu tình huống với định dạng nhất quán và mô tả toàn diện
    - Đại lý AI du lịch Azure: Nhấn mạnh điều phối đa đại lý
    - Tích hợp Azure DevOps: Tập trung tự động hóa quy trình
    - Truy xuất tài liệu thời gian thực: Triển khai client Python console
    - Trình tạo kế hoạch học tập tương tác: Ứng dụng web hội thoại Chainlit
    - Tài liệu trong trình soạn thảo: Tích hợp VS Code và GitHub Copilot
    - Quản lý API Azure: Mẫu tích hợp API doanh nghiệp
    - GitHub MCP Registry: Phát triển hệ sinh thái và nền tảng cộng đồng
  - **Kết luận toàn diện**: Viết lại phần kết luận nhấn mạnh bảy nghiên cứu tình huống trải dài nhiều chiều triển khai MCP
    - Tích hợp doanh nghiệp, điều phối đa đại lý, năng suất lập trình viên
    - Phát triển hệ sinh thái, ứng dụng giáo dục phân loại
    - Nhấn mạnh sâu sắc về mẫu kiến trúc, chiến lược triển khai, và thực tiễn tốt nhất
    - Tập trung MCP là giao thức trưởng thành, sẵn sàng sản xuất

#### Cập nhật Hướng dẫn Học tập (study_guide.md)
- **Bản đồ chương trình học trực quan**: Cập nhật mindmap bao gồm GitHub MCP Registry trong phần Nghiên cứu Tình huống
- **Mô tả Nghiên cứu Tình huống**: Nâng cấp từ mô tả tổng quát sang phân tích chi tiết 7 nghiên cứu tình huống toàn diện
- **Cấu trúc kho lưu trữ**: Cập nhật phần 10 phản ánh bao quát nghiên cứu tình huống với chi tiết triển khai cụ thể
- **Tích hợp ghi changelog**: Thêm mục ngày 26 tháng 9 năm 2025 ghi nhận bổ sung GitHub MCP Registry và cải tiến nghiên cứu tình huống
- **Cập nhật ngày tháng**: Cập nhật dấu thời gian footer phản ánh chỉnh sửa mới nhất (26 tháng 9, 2025)

### Cải tiến chất lượng tài liệu
- **Nâng cao nhất quán**: Chuẩn hóa định dạng và cấu trúc nghiên cứu tình huống cho tất cả 7 ví dụ
- **Phủ sóng toàn diện**: Nghiên cứu tình huống hiện bao gồm doanh nghiệp, năng suất phát triển, và phát triển hệ sinh thái
- **Định vị chiến lược**: Nâng cao tập trung MCP như nền tảng nền tảng cho triển khai hệ thống agent
- **Tích hợp tài nguyên**: Cập nhật tài nguyên bổ sung gồm liên kết GitHub MCP Registry

## 15 tháng 9, 2025

### Mở rộng Chủ đề nâng cao - Giao thức tùy chỉnh & Kỹ thuật ngữ cảnh

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Hướng dẫn triển khai nâng cao mới
- **README.md**: Hướng dẫn triển khai đầy đủ các cơ chế giao thức tùy chỉnh MCP
  - **Giao thức Azure Event Grid**: Triển khai giao thức sự kiện không máy chủ toàn diện
    - Ví dụ C#, TypeScript và Python tích hợp Azure Functions
    - Mẫu kiến trúc dựa trên sự kiện cho giải pháp MCP mở rộng
    - Bộ nhận webhook và xử lý tin nhắn đẩy
  - **Giao thức Azure Event Hubs**: Triển khai giao thức streaming với thông lượng cao
    - Khả năng streaming thời gian thực cho các kịch bản độ trễ thấp
    - Chiến lược phân vùng và quản lý điểm kiểm tra
    - Gom nhóm tin nhắn và tối ưu hiệu suất
  - **Mẫu tích hợp doanh nghiệp**: Ví dụ kiến trúc sẵn sàng sản xuất
    - Xử lý MCP phân tán qua nhiều Azure Functions
    - Kiến trúc giao thức hybrid kết hợp nhiều kiểu giao thức
    - Chiến lược độ bền, tin cậy và xử lý lỗi tin nhắn
  - **Bảo mật & Giám sát**: Tích hợp Azure Key Vault và mẫu quan sát
    - Xác thực với managed identity và quyền truy cập tối thiểu
    - Telemetry Application Insights và giám sát hiệu suất
    - Bộ ngắt mạch và mẫu chịu lỗi
  - **Khung kiểm thử**: Chiến lược kiểm thử toàn diện cho giao thức tùy chỉnh
    - Kiểm thử đơn vị với test doubles và mocking frameworks
    - Kiểm thử tích hợp với Azure Test Containers
    - Cân nhắc kiểm thử hiệu năng và tải

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Lĩnh vực AI mới nổi
- **README.md**: Khám phá toàn diện kỹ thuật ngữ cảnh như một lĩnh vực mới nổi
  - **Nguyên tắc cốt lõi**: Chia sẻ ngữ cảnh đầy đủ, nhận thức ra quyết định hành động, quản lý cửa sổ ngữ cảnh
  - **Đồng bộ giao thức MCP**: Cách thiết kế MCP giải quyết thách thức kỹ thuật ngữ cảnh
    - Hạn chế cửa sổ ngữ cảnh và chiến lược tải dần
    - Xác định tính liên quan và truy xuất ngữ cảnh động
    - Xử lý ngữ cảnh đa phương thức và cân nhắc bảo mật
  - **Phương pháp triển khai**: Kiến trúc một luồng so với đa đại lý
    - Kỹ thuật chia nhỏ và ưu tiên ngữ cảnh
    - Chiến lược tải dần và nén ngữ cảnh
    - Cách tiếp cận lớp ngữ cảnh và tối ưu truy xuất
  - **Khung đo lường**: Các chỉ số mới nổi để đánh giá hiệu quả ngữ cảnh
    - Hiệu quả đầu vào, hiệu suất, chất lượng và trải nghiệm người dùng
    - Phương pháp thử nghiệm tối ưu hóa ngữ cảnh
    - Phân tích lỗi và phương pháp cải tiến

#### Cập nhật Điều hướng Chương trình học (README.md)
- **Cấu trúc module nâng cao**: Cập nhật bảng chương trình học để bao gồm các chủ đề nâng cao mới
  - Thêm mục Context Engineering (5.14) và Custom Transport (5.15)
  - Định dạng và liên kết điều hướng nhất quán trên toàn bộ các module
  - Cập nhật mô tả phản ánh phạm vi nội dung hiện tại

### Cải tiến cấu trúc thư mục
- **Chuẩn hóa tên**: Đổi tên "mcp transport" thành "mcp-transport" để đồng bộ với các thư mục chủ đề nâng cao khác
- **Tổ chức nội dung**: Tất cả thư mục 05-AdvancedTopics giờ theo mẫu đặt tên nhất quán (mcp-[topic])

### Cải thiện chất lượng tài liệu
- **Đồng bộ đặc tả MCP**: Tất cả nội dung mới tham chiếu MCP Specification 2025-06-18 hiện hành
- **Ví dụ đa ngôn ngữ**: Ví dụ mã đầy đủ C#, TypeScript, và Python
- **Tập trung Doanh nghiệp**: Các mẫu sẵn sàng cho sản xuất và tích hợp đám mây Azure xuyên suốt
- **Tài liệu Trực quan**: Sơ đồ Mermaid cho hình dung kiến trúc và luồng

## 18 tháng 8, 2025

### Cập nhật Toàn diện Tài liệu - Tiêu chuẩn MCP 2025-06-18

#### Thực hành Bảo mật MCP (02-Security/) - Hiện đại hóa Toàn bộ
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Viết lại hoàn toàn phù hợp với Đặc tả MCP 2025-06-18
  - **Yêu cầu Bắt buộc**: Thêm các yêu cầu MUST/MUST NOT rõ ràng từ đặc tả chính thức với chỉ báo trực quan rõ ràng
  - **12 Thực hành An ninh Cốt lõi**: Cấu trúc lại từ danh sách 15 mục thành các lĩnh vực bảo mật toàn diện
    - Bảo mật Token & Xác thực với tích hợp nhà cung cấp danh tính bên ngoài
    - Quản lý Phiên & Bảo mật Truyền tải với các yêu cầu mã hóa
    - Bảo vệ Mối đe dọa Đặc thù AI với tích hợp Microsoft Prompt Shields
    - Kiểm soát Truy cập & Quyền với nguyên tắc quyền tối thiểu
    - An toàn Nội dung & Giám sát với tích hợp Azure Content Safety
    - Bảo mật Chuỗi cung ứng với xác minh thành phần toàn diện
    - Bảo mật OAuth & Phòng chống Confused Deputy với triển khai PKCE
    - Ứng phó Sự cố & Phục hồi với năng lực tự động hóa
    - Tuân thủ & Quản trị với sự phù hợp quy định
    - Kiểm soát An ninh Nâng cao với kiến trúc zero trust
    - Tích hợp Hệ sinh thái Bảo mật Microsoft với các giải pháp toàn diện
    - Tiến hóa An ninh Liên tục với các thực hành thích ứng
  - **Giải pháp Bảo mật Microsoft**: Hướng dẫn tích hợp nâng cao cho Prompt Shields, Azure Content Safety, Entra ID và GitHub Advanced Security
  - **Tài nguyên Triển khai**: Phân loại các liên kết tài nguyên toàn diện theo Tài liệu MCP Chính thức, Giải pháp Bảo mật Microsoft, Tiêu chuẩn Bảo mật và Hướng dẫn Triển khai

#### Kiểm soát An ninh Nâng cao (02-Security/) - Triển khai Doanh nghiệp
- **MCP-SECURITY-CONTROLS-2025.md**: Cải tiến hoàn toàn với khung bảo mật cấp doanh nghiệp
  - **9 Lĩnh vực An ninh Toàn diện**: Mở rộng từ các kiểm soát cơ bản sang khung doanh nghiệp chi tiết
    - Xác thực & Ủy quyền Nâng cao với tích hợp Microsoft Entra ID
    - Bảo mật Token & Kiểm soát chống Passthrough với xác thực toàn diện
    - Kiểm soát An ninh Phiên với phòng ngừa chiếm quyền
    - Kiểm soát An ninh Đặc thù AI với phòng chống prompt injection và tool poisoning
    - Phòng ngừa Tấn công Confused Deputy với bảo mật proxy OAuth
    - Bảo mật Thực thi Công cụ với sandboxing và cô lập
    - Kiểm soát An ninh Chuỗi cung ứng với xác minh phụ thuộc
    - Kiểm soát Giám sát & Phát hiện với tích hợp SIEM
    - Ứng phó Sự cố & Phục hồi với năng lực tự động hóa
  - **Ví dụ Triển khai**: Thêm các khối cấu hình YAML chi tiết và ví dụ mã
  - **Tích hợp Giải pháp Microsoft**: Bao phủ toàn diện các dịch vụ bảo mật Azure, GitHub Advanced Security và quản lý danh tính doanh nghiệp

#### Bảo mật Chủ đề Nâng cao (05-AdvancedTopics/mcp-security/) - Triển khai Sẵn sàng Sản xuất
- **README.md**: Viết lại hoàn toàn cho triển khai bảo mật doanh nghiệp
  - **Phù hợp với Đặc tả Hiện tại**: Cập nhật theo Đặc tả MCP 2025-06-18 với yêu cầu bảo mật bắt buộc
  - **Xác thực Nâng cao**: Tích hợp Microsoft Entra ID với ví dụ toàn diện về .NET và Java Spring Security
  - **Tích hợp An ninh AI**: Triển khai Microsoft Prompt Shields và Azure Content Safety với ví dụ chi tiết bằng Python
  - **Giảm thiểu Mối đe dọa Nâng cao**: Ví dụ triển khai toàn diện cho
    - Phòng ngừa Tấn công Confused Deputy với PKCE và xác thực đồng thuận người dùng
    - Phòng ngừa Token Passthrough với xác thực audience và quản lý token an toàn
    - Phòng ngừa Chiếm quyền Phiên với ràng buộc mã hóa và phân tích hành vi
  - **Tích hợp Bảo mật Doanh nghiệp**: Giám sát Azure Application Insights, các pipeline phát hiện mối đe dọa và bảo mật chuỗi cung ứng
  - **Danh mục Triển khai**: Kiểm soát bảo mật bắt buộc so với khuyến nghị cùng lợi ích hệ sinh thái bảo mật Microsoft

### Chất lượng Tài liệu & Phù hợp Tiêu chuẩn
- **Tham chiếu Đặc tả**: Cập nhật tất cả tham chiếu tới Đặc tả MCP 2025-06-18 hiện tại
- **Hệ sinh thái Bảo mật Microsoft**: Hướng dẫn tích hợp nâng cao trong toàn bộ tài liệu bảo mật
- **Triển khai Thực tế**: Thêm ví dụ mã chi tiết trong .NET, Java và Python với các mẫu doanh nghiệp
- **Tổ chức Tài nguyên**: Phân loại toàn diện tài liệu chính thức, tiêu chuẩn bảo mật và hướng dẫn triển khai
- **Chỉ báo Trực quan**: Đánh dấu rõ ràng các yêu cầu bắt buộc so với thực hành khuyến nghị


#### Khái niệm Cốt lõi (01-CoreConcepts/) - Hiện đại hóa Toàn diện
- **Cập nhật Phiên bản Giao thức**: Cập nhật tham chiếu Đặc tả MCP 2025-06-18 hiện tại với định dạng phiên bản dựa trên ngày (YYYY-MM-DD)
- **Tinh chỉnh Kiến trúc**: Mô tả rõ hơn về Hosts, Clients và Servers phản ánh mẫu kiến trúc MCP hiện tại
  - Hosts hiện được định nghĩa rõ ràng là ứng dụng AI phối hợp nhiều kết nối MCP client
  - Clients mô tả là các kết nối giao thức duy trì quan hệ một-một với server
  - Servers được mở rộng với các kịch bản triển khai cục bộ và từ xa
- **Tái cấu trúc Primitives**: Cải tiến toàn bộ primitives của server và client
  - Server Primitives: Resources (nguồn dữ liệu), Prompts (mẫu), Tools (hàm thực thi) với giải thích và ví dụ chi tiết
  - Client Primitives: Sampling (hoàn thành LLM), Elicitation (đầu vào người dùng), Logging (gỡ lỗi/giám sát)
  - Cập nhật theo mẫu phương thức khám phá (`*/list`), truy xuất (`*/get`) và thực thi (`*/call`) hiện tại
- **Kiến trúc Giao thức**: Giới thiệu mô hình kiến trúc hai lớp
  - Lớp Dữ liệu: Nền tảng JSON-RPC 2.0 với quản lý vòng đời và primitives
  - Lớp Truyền tải: STDIO (cục bộ) và Streamable HTTP với SSE (truyền từ xa)
- **Khung Bảo mật**: Nguyên tắc bảo mật toàn diện bao gồm sự đồng thuận rõ ràng của người dùng, bảo vệ quyền riêng tư dữ liệu, an toàn thực thi công cụ và bảo mật lớp truyền tải
- **Mẫu Giao tiếp**: Cập nhật các thông điệp giao thức thể hiện khởi tạo, khám phá, thực thi và thông báo liên tục
- **Ví dụ Mã**: Làm mới ví dụ đa ngôn ngữ (.NET, Java, Python, JavaScript) phản ánh mẫu SDK MCP hiện tại

#### Bảo mật (02-Security/) - Cải tiến Toàn diện An ninh  
- **Phù hợp Tiêu chuẩn**: Hoàn toàn phù hợp với yêu cầu bảo mật Đặc tả MCP 2025-06-18
- **Tiến hóa Xác thực**: Ghi nhận tiến hóa từ máy chủ OAuth tùy chỉnh sang ủy quyền nhà cung cấp danh tính bên ngoài (Microsoft Entra ID)
- **Phân tích Mối đe dọa Đặc thù AI**: Tăng cường bao phủ vector tấn công AI hiện đại
  - Kịch bản tấn công prompt injection chi tiết với ví dụ thực tế
  - Cơ chế tool poisoning và mẫu tấn công "rug pull"
  - Poisoning cửa sổ ngữ cảnh và tấn công làm rối mô hình
- **Giải pháp Bảo mật AI Microsoft**: Bao phủ toàn diện hệ sinh thái bảo mật Microsoft
  - AI Prompt Shields với kỹ thuật phát hiện, làm nổi bật và giới hạn nâng cao
  - Mẫu tích hợp Azure Content Safety
  - GitHub Advanced Security cho bảo vệ chuỗi cung ứng
- **Giảm thiểu Mối đe dọa Nâng cao**: Kiểm soát bảo mật chi tiết cho
  - Chiếm quyền phiên với kịch bản tấn công MCP cụ thể và yêu cầu mã hóa session ID
  - Vấn đề Confused Deputy trong kịch bản proxy MCP với yêu cầu đồng thuận rõ ràng
  - Lỗ hổng token passthrough với kiểm soát xác thực bắt buộc
- **Bảo mật Chuỗi Cung ứng**: Mở rộng bao phủ chuỗi cung ứng AI bao gồm mô hình nền tảng, dịch vụ embeddings, nhà cung cấp ngữ cảnh và API bên thứ ba
- **Bảo mật Nền tảng**: Tăng cường tích hợp với mẫu bảo mật doanh nghiệp bao gồm kiến trúc zero trust và hệ sinh thái bảo mật Microsoft
- **Tổ chức Tài nguyên**: Phân loại toàn diện các liên kết tài nguyên theo loại (Tài liệu Chính thức, Tiêu chuẩn, Nghiên cứu, Giải pháp Microsoft, Hướng dẫn Triển khai)

### Cải thiện Chất lượng Tài liệu
- **Mục tiêu Học tập Cấu trúc**: Nâng cao mục tiêu học tập với kết quả cụ thể, có thể hành động
- **Tham chiếu Chéo**: Thêm liên kết giữa các chủ đề bảo mật và khái niệm cốt lõi liên quan
- **Thông tin Hiện tại**: Cập nhật tất cả tham chiếu ngày tháng và liên kết đặc tả tới tiêu chuẩn hiện hành
- **Hướng dẫn Triển khai**: Thêm hướng dẫn triển khai cụ thể, có thể hành động trong cả hai phần

## 16 tháng 7, 2025

### Cải tiến README và Điều hướng
- Thiết kế lại hoàn toàn điều hướng chương trình học trong README.md
- Thay thế thẻ `<details>` bằng định dạng bảng dễ truy cập hơn
- Tạo các tùy chọn bố cục thay thế trong thư mục "alternative_layouts"
- Thêm ví dụ điều hướng dạng thẻ, tab và accordion
- Cập nhật phần cấu trúc kho lưu trữ để bao gồm tất cả các tệp mới nhất
- Nâng cao phần "Cách Sử dụng Chương trình Học" với khuyến nghị rõ ràng
- Cập nhật liên kết đặc tả MCP tới URL chính xác
- Thêm phần Kỹ thuật Ngữ cảnh (5.14) vào cấu trúc chương trình học

### Cập nhật Hướng dẫn Học tập
- Sửa đổi hoàn toàn hướng dẫn học tập phù hợp với cấu trúc kho lưu trữ hiện tại
- Thêm các phần mới cho MCP Clients và Tools, và các Server MCP phổ biến
- Cập nhật Bản đồ Chương trình Học Trực quan để phản ánh chính xác tất cả chủ đề
- Nâng cao mô tả về Chủ đề Nâng cao để bao phủ tất cả lĩnh vực chuyên môn
- Cập nhật phần Nghiên cứu Tình huống để phản ánh các ví dụ thực tế
- Thêm nhật ký thay đổi toàn diện này

### Đóng góp Cộng đồng (06-CommunityContributions/)
- Thêm thông tin chi tiết về các server MCP cho tạo ảnh
- Thêm phần toàn diện về sử dụng Claude trong VSCode
- Thêm hướng dẫn thiết lập và sử dụng client terminal Cline
- Cập nhật phần client MCP để bao gồm tất cả các lựa chọn client phổ biến
- Nâng cao ví dụ đóng góp với các mẫu mã chính xác hơn

### Chủ đề Nâng cao (05-AdvancedTopics/)
- Tổ chức tất cả thư mục chủ đề chuyên môn với cách đặt tên thống nhất
- Thêm tài liệu và ví dụ kỹ thuật ngữ cảnh
- Thêm tài liệu tích hợp agent Foundry
- Nâng cao tài liệu tích hợp bảo mật Entra ID

## 11 tháng 6, 2025

### Tạo ban đầu
- Phát hành phiên bản đầu tiên của chương trình MCP dành cho Người mới bắt đầu
- Tạo cấu trúc cơ bản cho tất cả 10 phần chính
- Thực hiện Bản đồ Chương trình Học Trực quan cho điều hướng
- Thêm các dự án mẫu ban đầu bằng nhiều ngôn ngữ lập trình

### Bắt đầu (03-GettingStarted/)
- Tạo ví dụ triển khai server đầu tiên
- Thêm hướng dẫn phát triển client
- Bao gồm hướng dẫn tích hợp client LLM
- Thêm tài liệu tích hợp VS Code
- Triển khai ví dụ server sử dụng Server-Sent Events (SSE)

### Khái niệm Cốt lõi (01-CoreConcepts/)
- Thêm giải thích chi tiết về kiến trúc client-server
- Tạo tài liệu về các thành phần chính của giao thức
- Ghi lại các mẫu thông điệp trong MCP

## 23 tháng 5, 2025

### Cấu trúc Kho lưu trữ
- Khởi tạo kho với cấu trúc thư mục cơ bản
- Tạo các tệp README cho mỗi phần chính
- Thiết lập hạ tầng dịch thuật
- Thêm tài sản hình ảnh và sơ đồ

### Tài liệu
- Tạo README.md ban đầu với tổng quan chương trình học
- Thêm CODE_OF_CONDUCT.md và SECURITY.md
- Thiết lập SUPPORT.md với hướng dẫn nhận trợ giúp
- Tạo cấu trúc hướng dẫn học tập sơ khởi

## 15 tháng 4, 2025

### Lập kế hoạch và Khung
- Lập kế hoạch ban đầu cho chương trình MCP dành cho Người mới bắt đầu
- Xác định mục tiêu học tập và đối tượng mục tiêu
- Phác thảo cấu trúc 10 phần của chương trình học
- Phát triển khung khái niệm cho ví dụ và nghiên cứu tình huống
- Tạo các ví dụ nguyên mẫu ban đầu cho các khái niệm chính

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->