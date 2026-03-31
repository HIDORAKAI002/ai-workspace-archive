# Báo cáo thay đổi: Giáo trình MCP cho Người mới bắt đầu

Tài liệu này là hồ sơ của tất cả các thay đổi quan trọng đã thực hiện đối với giáo trình Model Context Protocol (MCP) cho Người mới bắt đầu. Các thay đổi được ghi lại theo thứ tự thời gian ngược (thay đổi mới nhất trước).

## Ngày 5 tháng 2 năm 2026

### Cải tiến Toàn bộ Kho Lưu trữ về Xác thực và Điều hướng

#### Nội dung Giáo trình Mới được Thêm vào

**Module 03 - Bắt đầu**
- **12-mcp-hosts/README.md**: Hướng dẫn toàn diện mới để thiết lập các máy chủ MCP
  - Ví dụ cấu hình Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Mẫu cấu hình JSON cho tất cả các máy chủ chính
  - Bảng so sánh các loại vận chuyển (stdio, SSE/HTTP, WebSocket)
  - Khắc phục sự cố kết nối phổ biến
  - Thực tiễn bảo mật tốt nhất cho cấu hình máy chủ

- **13-mcp-inspector/README.md**: Hướng dẫn gỡ lỗi mới cho MCP Inspector
  - Phương pháp cài đặt (npx, npm toàn cục, từ mã nguồn)
  - Kết nối với máy chủ qua stdio và HTTP/SSE
  - Công cụ kiểm tra, tài nguyên và luồng công việc prompts
  - Tích hợp VS Code với MCP Inspector
  - Kịch bản gỡ lỗi phổ biến cùng các giải pháp

**Module 04 - Triển khai Thực tế**
- **pagination/README.md**: Hướng dẫn triển khai phân trang mới
  - Mẫu phân trang dựa trên con trỏ trong Python, TypeScript, Java
  - Xử lý phân trang phía khách hàng
  - Chiến lược thiết kế con trỏ (đục vs. có cấu trúc)
  - Khuyến nghị tối ưu hiệu suất

**Module 05 - Chủ đề Nâng cao**
- **mcp-protocol-features/README.md**: Phân tích sâu các tính năng giao thức mới
  - Triển khai thông báo tiến độ
  - Mẫu hủy yêu cầu
  - Mẫu tài nguyên với mẫu URI
  - Quản lý vòng đời máy chủ
  - Kiểm soát cấp độ ghi nhận log
  - Mẫu xử lý lỗi với mã JSON-RPC

#### Sửa lỗi Điều hướng (cập nhật hơn 24 tệp)

**README các Module Chính**
 Bây giờ liên kết đến bài học đầu tiên VÀ module tiếp theo

**Các tệp phụ 02-Security**
- Tất cả 5 tài liệu bảo mật bổ sung giờ đây có điều hướng "Tiếp theo là gì":

**Các tệp Nghiên cứu Trường hợp 09**
- Tất cả tệp nghiên cứu trường hợp giờ có điều hướng theo thứ tự liên tục:

**Phòng thí nghiệm Tối ưu hóa AI 10**
Thêm phần Tiếp theo là gì vào tổng quan Module 10 và Module 11

#### Sửa lỗi Mã và Nội dung

**Cập nhật SDK và Phụ thuộc**
Sửa phiên bản openai trống thành `^4.95.0`
Cập nhật SDK từ `^1.8.0` lên `>=1.26.0`
Cập nhật các phiên bản mcp thành `>=1.26.0`

**Sửa mã**
Sửa model không hợp lệ `gpt-4o-mini` thành `gpt-4.1-mini`

**Sửa nội dung**
Sửa liên kết hỏng `READMEmd` → `README.md`, sửa tiêu đề giáo trình `Module 1-3` → `Module 0-3`, sửa đường dẫn nhạy chữ hoa/thường
Loại bỏ nội dung trùng lặp bị hỏng của Case Study 5

**Cải tiến Hướng dẫn Người mới bắt đầu**
Thêm phần giới thiệu phù hợp, mục tiêu học tập và điều kiện tiên quyết cho người mới bắt đầu

#### Cập nhật Giáo trình

**README.md Chính**
- Thêm mục 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Phân trang), 5.16 (Tính năng Giao thức) vào bảng giáo trình

**README các Module**
Thêm bài học 12 và 13 vào danh sách bài học
Thêm phần Hướng dẫn Thực hành với liên kết phân trang
Thêm bài học 5.15 (Custom Transport) và 5.16 (Tính năng Giao thức)

**study_guide.md**
- Cập nhật sơ đồ tư duy với tất cả đề tài mới: Thiết lập MCP Hosts, MCP Inspector, Chiến lược Phân trang, Phân tích sâu Tính năng Giao thức

## Ngày 28 tháng 1 năm 2026

### Đánh giá Tuân thủ Đặc tả MCP 2025-11-25

#### Nâng cao Các Khái niệm Cốt lõi (01-CoreConcepts/)
- **Primitive Client mới - Roots**: Thêm tài liệu chi tiết về primitive client Roots, cho phép máy chủ hiểu giới hạn hệ thống tập tin và quyền truy cập
- **Chú thích Công cụ**: Thêm tài liệu về chú thích hành vi công cụ (`readOnlyHint`, `destructiveHint`) để quyết định thực thi công cụ tốt hơn
- **Gọi Công cụ trong Sampling**: Cập nhật tài liệu Sampling để bao gồm các tham số `tools` và `toolChoice` cho việc gọi công cụ do mô hình điều khiển trong yêu cầu sampling
- **Phương thức Elicitation URL**: Thêm tài liệu về elicitation dựa trên URL cho tương tác web bên ngoài do máy chủ khởi tạo
- **Tasks (Thử nghiệm)**: Thêm phần mô tả tính năng thử nghiệm Tasks cho bao đóng thực thi bền vững và truy xuất kết quả deferred
- **Hỗ trợ Biểu tượng**: Ghi nhận công cụ, tài nguyên, mẫu tài nguyên và các prompts giờ có thể bao gồm biểu tượng như siêu dữ liệu bổ sung

#### Cập nhật Tài liệu
- **README.md**: Thêm tham chiếu phiên bản MCP Specification 2025-11-25 và giải thích phiên bản theo ngày
- **study_guide.md**: Cập nhật bản đồ giáo trình để bao gồm Tasks và Chú thích Công cụ trong mục Khái niệm Cốt lõi; cập nhật dấu thời gian tài liệu

#### Xác minh Tuân thủ Đặc tả
- **Phiên bản Giao thức**: Xác nhận tất cả tài liệu tham chiếu đến MCP Specification 2025-11-25 hiện hành
- **Kiến trúc Thống nhất**: Xác nhận chính xác tài liệu kiến trúc hai lớp (Lớp Dữ liệu + Lớp Vận chuyển)
- **Tài liệu Primitives**: Kiểm tra máy chủ primitives (Tài nguyên, Prompts, Công cụ) và client primitives (Sampling, Elicitation, Logging, Roots)
- **Cơ chế Vận chuyển**: Kiểm tra chính xác tài liệu vận chuyển STDIO và HTTP có thể truyền phát
- **Hướng dẫn Bảo mật**: Xác nhận phù hợp với các Thực tiễn Bảo mật MCP Azure hiện tại

#### Tính năng MCP 2025-11-25 Chính được Tài liệu hóa
- **Phát hiện OpenID Connect**: Phát hiện máy chủ xác thực qua OIDC
- **Tài liệu Metadata OAuth Client ID**: Cơ chế đăng ký client được đề xuất
- **JSON Schema 2020-12**: Ngôn ngữ mặc định cho định nghĩa schema MCP
- **Hệ thống Phân cấp SDK**: Yêu cầu chính thức về hỗ trợ và bảo trì tính năng SDK
- **Cơ cấu Quản trị**: Thể chế hóa các Nhóm Công tác và Nhóm Quan tâm trong quản trị MCP

### Cập nhật Lớn Tài liệu Bảo mật (02-Security/)

#### Tích hợp Hội thảo MCP Security Summit Workshop (Sherpa)
- **Tài nguyên Đào tạo Thực hành Mới**: Thêm tích hợp toàn diện với [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) trong tất cả tài liệu bảo mật
- **Phạm vi Lộ trình Thám hiểm**: Tài liệu hóa đầy đủ tiến trình từ Base Camp đến Summit
- **Phù hợp OWASP**: Tất cả hướng dẫn bảo mật hiện liên kết với các rủi ro trong hướng dẫn bảo mật MCP Azure của OWASP

#### Tích hợp OWASP MCP Top 10
- **Phần Mới**: Thêm bảng Rủi ro Bảo mật OWASP MCP Top 10 với các biện pháp Azure vào README bảo mật chính
- **Tài liệu dựa trên Rủi ro**: Cập nhật mcp-security-controls-2025.md với tham chiếu rủi ro OWASP MCP cho từng lĩnh vực bảo mật
- **Kiến trúc Tham khảo**: Liên kết đến kiến trúc tham khảo OWASP MCP Azure Security Guide và các mẫu triển khai

#### Cập nhật Tệp Bảo mật
- **README.md**: Thêm tổng quan Hội thảo Sherpa, bảng lộ trình thám hiểm, tóm tắt rủi ro OWASP MCP Top 10 và phần đào tạo thực hành
- **mcp-security-controls-2025.md**: Cập nhật tiêu đề tháng 2 năm 2026, bổ sung tham chiếu rủi ro OWASP (MCP01-MCP08), sửa lỗi phiên bản
- **mcp-security-best-practices-2025.md**: Thêm phần tài nguyên Sherpa và OWASP, cập nhật dấu thời gian
- **mcp-best-practices.md**: Thêm phần đào tạo thực hành với liên kết Sherpa và OWASP
- **azure-content-safety-implementation.md**: Thêm tham chiếu OWASP MCP06, phù hợp với Camp 3 Sherpa, và phần tài nguyên bổ sung

#### Thêm Liên kết Tài nguyên Mới
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Các trang rủi ro OWASP MCP riêng lẻ (MCP01-MCP10)

### Căn chỉnh Toàn bộ Giáo trình với MCP Specification 2025-11-25

#### Module 03 - Bắt đầu
- **Tài liệu SDK**: Thêm Go SDK vào danh sách SDK chính thức; cập nhật tất cả tham chiếu SDK phù hợp MCP Specification 2025-11-25
- **Làm rõ Vận chuyển**: Cập nhật mô tả vận chuyển STDIO và HTTP Streaming với tham chiếu chính xác đến đặc tả

#### Module 04 - Triển khai Thực tế
- **Cập nhật SDK**: Thêm Go SDK; cập nhật danh sách SDK kèm tham chiếu phiên bản đặc tả
- **Đặc tả Ủy quyền**: Cập nhật liên kết đặc tả MCP Authorization sang phiên bản 2025-11-25 hiện hành

#### Module 05 - Chủ đề Nâng cao
- **Tính năng Mới**: Thêm chú thích về các tính năng MCP Specification 2025-11-25 mới (Tasks, Chú thích Công cụ, Elicitation URL, Roots)
- **Tài nguyên Bảo mật**: Thêm liên kết OWASP MCP Top 10 và hội thảo Sherpa vào tài nguyên tham khảo

#### Module 06 - Đóng góp Cộng đồng
- **Danh sách SDK**: Thêm Swift và Rust SDK; cập nhật liên kết đặc tả đến 2025-11-25
- **Tham chiếu Đặc tả**: Cập nhật liên kết MCP Specification trực tiếp đến URL đặc tả

#### Module 07 - Bài học từ Triển khai Sớm
- **Cập nhật Tài nguyên**: Thêm liên kết MCP Specification 2025-11-25 và OWASP MCP Top 10 vào tài nguyên bổ sung

#### Module 08 - Thực hành Tốt nhất
- **Phiên bản Đặc tả**: Cập nhật tham chiếu MCP Specification lên 2025-11-25
- **Tài nguyên Bảo mật**: Thêm OWASP MCP Top 10 và hội thảo Sherpa vào tài nguyên bổ sung

#### Module 10 - Tối ưu hóa Quy trình Công việc AI
- **Cập nhật Huy hiệu**: Thay đổi huy hiệu phiên bản MCP từ phiên bản SDK (1.9.3) sang phiên bản đặc tả (2025-11-25)
- **Liên kết Tài nguyên**: Cập nhật liên kết MCP Specification; thêm OWASP MCP Top 10

#### Module 11 - Phòng thí nghiệm Thực hành MCP Server
- **Tham chiếu Đặc tả**: Cập nhật liên kết MCP Specification đến phiên bản 2025-11-25
- **Tài nguyên Bảo mật**: Thêm OWASP MCP Top 10 vào tài nguyên chính thức

## Ngày 18 tháng 12 năm 2025

### Cập nhật Tài liệu Bảo mật - MCP Specification 2025-11-25

#### Thực tiễn Bảo mật MCP (02-Security/mcp-best-practices.md) - Cập nhật Phiên bản Đặc tả
- **Cập nhật Phiên bản Giao thức**: Cập nhật tham chiếu tới MCP Specification 2025-11-25 mới nhất (phát hành ngày 25 tháng 11 năm 2025)
  - Cập nhật tất cả các tham chiếu phiên bản đặc tả từ 2025-06-18 sang 2025-11-25
  - Cập nhật ngày tháng tài liệu từ ngày 18 tháng 8 năm 2025 sang 18 tháng 12 năm 2025
  - Kiểm tra tất cả URL đặc tả trỏ đến tài liệu hiện hành
- **Xác thực Nội dung**: Đánh giá toàn diện các thực tiễn bảo mật so với tiêu chuẩn mới nhất
  - **Giải pháp Bảo mật Microsoft**: Xác nhận thuật ngữ và liên kết hiện hành cho Prompt Shields (trước đây là "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID và Azure Key Vault
  - **Bảo mật OAuth 2.1**: Xác nhận phù hợp với các thực tiễn bảo mật OAuth mới nhất
  - **Tiêu chuẩn OWASP**: Xác nhận tham chiếu OWASP Top 10 cho LLM vẫn còn hợp lệ
  - **Dịch vụ Azure**: Kiểm tra các liên kết tài liệu và thực tiễn tốt nhất của Microsoft Azure
- **Phù hợp Tiêu chuẩn**: Tất cả tiêu chuẩn bảo mật tham chiếu đều cập nhật
  - Khung quản lý rủi ro AI NIST
  - ISO 27001:2022
  - Thực tiễn bảo mật OAuth 2.1
  - Khung bảo mật và tuân thủ Azure
- **Tài nguyên Triển khai**: Xác nhận các hướng dẫn và tài nguyên triển khai
  - Mẫu xác thực Azure API Management
  - Hướng dẫn tích hợp Microsoft Entra ID
  - Quản lý bí mật Azure Key Vault
  - Giải pháp pipeline DevSecOps và giám sát

### Đảm bảo Chất lượng Tài liệu
- **Tuân thủ Đặc tả**: Đảm bảo tất cả yêu cầu bảo mật MCP bắt buộc (MUST/MUST NOT) phù hợp với đặc tả mới nhất
- **Cập nhật Tài nguyên**: Kiểm tra tất cả liên kết ngoài tới tài liệu Microsoft, tiêu chuẩn bảo mật và hướng dẫn triển khai
- **Phủ sóng Thực tiễn Tốt nhất**: Xác nhận phạm vi toàn diện cho xác thực, ủy quyền, mối đe dọa AI, bảo mật chuỗi cung ứng và mẫu doanh nghiệp

## Ngày 6 tháng 10 năm 2025

### Mở rộng Phần Bắt đầu – Sử dụng Máy chủ Nâng cao & Xác thực Đơn giản

#### Sử dụng Máy chủ Nâng cao (03-GettingStarted/10-advanced)
- **Thêm Chương Mới**: Giới thiệu hướng dẫn toàn diện về sử dụng máy chủ MCP nâng cao, bao gồm kiến trúc máy chủ thường và cấp thấp.
  - **So sánh Máy chủ Thường và Cấp thấp**: Chi tiết so sánh và ví dụ mã trong Python và TypeScript cho cả hai cách tiếp cận.
  - **Thiết kế dựa trên Handler**: Giải thích quản lý công cụ/tài nguyên/prompt dựa trên handler cho triển khai máy chủ linh hoạt, có thể mở rộng.
  - **Mẫu Thực tế**: Kịch bản thực tế nơi các mẫu máy chủ cấp thấp có lợi cho tính năng và kiến trúc nâng cao.

#### Xác thực Đơn giản (03-GettingStarted/11-simple-auth)
- **Thêm Chương Mới**: Hướng dẫn từng bước triển khai xác thực đơn giản trong máy chủ MCP.
  - **Khái niệm Auth**: Giải thích rõ ràng về xác thực và ủy quyền, cũng như xử lý thông tin đăng nhập.
  - **Triển khai Auth Cơ bản**: Mẫu xác thực dựa trên middleware trong Python (Starlette) và TypeScript (Express), kèm ví dụ mã.
  - **Tiến tới Bảo mật Nâng cao**: Hướng dẫn bắt đầu với xác thực đơn giản và nâng cao dần lên OAuth 2.1 và RBAC, kèm tham khảo các module bảo mật nâng cao.

Các bổ sung này cung cấp hướng dẫn thực hành, giúp xây dựng các triển khai máy chủ MCP mạnh mẽ, an toàn và linh hoạt hơn, kết nối các khái niệm nền tảng với các mẫu sản xuất nâng cao.

## Ngày 29 tháng 9 năm 2025

### Phòng thí nghiệm Tích hợp Cơ sở Dữ liệu MCP Server - Lộ trình Học tập Thực hành Toàn diện

#### 11-MCPServerHandsOnLabs - Giáo trình Tích hợp Cơ sở Dữ liệu Hoàn chỉnh Mới  

- **Hoàn thiện Lộ trình Học tập 13-Lab**: Thêm chương trình thực hành toàn diện để xây dựng các máy chủ MCP sẵn sàng sản xuất tích hợp cơ sở dữ liệu PostgreSQL  
  - **Triển khai Thực tế**: Trường hợp phân tích Zava Retail thể hiện các mẫu doanh nghiệp cấp độ  
  - **Tiến trình Học tập Có cấu trúc**:  
    - **Labs 00-03: Nền tảng** - Giới thiệu, Kiến trúc cốt lõi, Bảo mật & Đa thuê, Thiết lập môi trường  
    - **Labs 04-06: Xây dựng Máy chủ MCP** - Thiết kế Cơ sở dữ liệu & Lược đồ, Triển khai Máy chủ MCP, Phát triển Công cụ  
    - **Labs 07-09: Tính năng Nâng cao** - Tích hợp Tìm kiếm Ngữ nghĩa, Kiểm thử & Gỡ lỗi, Tích hợp VS Code  
    - **Labs 10-12: Sản xuất & Thực hành Tốt nhất** - Chiến lược Triển khai, Giám sát & Quan sát, Thực hành Tốt nhất & Tối ưu hóa  
  - **Công nghệ Doanh nghiệp**: Framework FastMCP, PostgreSQL với pgvector, Embeddings Azure OpenAI, Azure Container Apps, Application Insights  
  - **Tính năng Nâng cao**: Bảo mật cấp hàng (RLS), tìm kiếm ngữ nghĩa, truy cập dữ liệu đa thuê, embeddings vector, giám sát thời gian thực  

#### Chuẩn hóa Thuật ngữ - Chuyển đổi Module sang Lab  
- **Cập nhật Tài liệu Toàn diện**: Hệ thống cập nhật tất cả file README trong 11-MCPServerHandsOnLabs để sử dụng thuật ngữ "Lab" thay vì "Module"  
  - **Tiêu đề Mục**: Cập nhật "What This Module Covers" thành "What This Lab Covers" trên toàn bộ 13 lab  
  - **Mô tả Nội dung**: Thay đổi "This module provides..." thành "This lab provides..." khắp tài liệu  
  - **Mục tiêu Học tập**: Cập nhật "By the end of this module..." thành "By the end of this lab..."  
  - **Liên kết Điều hướng**: Chuyển tất cả tham chiếu "Module XX:" thành "Lab XX:" trong liên kết chéo và điều hướng  
  - **Theo dõi Hoàn thành**: Cập nhật "After completing this module..." thành "After completing this lab..."  
  - **Giữ Nguyên Tham chiếu Kỹ thuật**: Bảo toàn tham chiếu module Python trong file cấu hình (ví dụ `"module": "mcp_server.main"`)

#### Cải tiến Hướng dẫn Học tập (study_guide.md)  
- **Bản đồ Chương trình Học Trực quan**: Thêm phần mới "11. Database Integration Labs" với hình ảnh cấu trúc lab đầy đủ  
- **Cấu trúc Kho Lưu trữ**: Cập nhật từ mười thành mười một phần chính với mô tả chi tiết 11-MCPServerHandsOnLabs  
- **Hướng dẫn Lộ trình Học tập**: Nâng cao hướng dẫn điều hướng để bao quát các phần 00-11  
- **Phạm vi Công nghệ**: Thêm chi tiết tích hợp FastMCP, PostgreSQL, dịch vụ Azure  
- **Kết quả Học tập**: Nhấn mạnh phát triển máy chủ sẵn sàng sản xuất, mẫu tích hợp cơ sở dữ liệu và bảo mật doanh nghiệp  

#### Cải tiến Cấu trúc README Chính  
- **Thuật ngữ Dựa trên Lab**: Cập nhật README.md chính trong 11-MCPServerHandsOnLabs để sử dụng nhất quán cấu trúc "Lab"  
- **Tổ chức Lộ trình Học tập**: Tiến trình rõ ràng từ khái niệm nền tảng qua triển khai nâng cao đến triển khai ra sản xuất  
- **Tập trung Thực tế**: Nhấn mạnh học tập thực hành với các mẫu doanh nghiệp cấp độ và công nghệ  

### Cải tiến Chất lượng & Tính nhất quán Tài liệu  
- **Nhấn mạnh Học tập Thực hành**: Thúc đẩy phương pháp dựa trên lab trong toàn bộ tài liệu  
- **Tập trung Mẫu Doanh nghiệp**: Làm nổi bật triển khai sẵn sàng sản xuất và các cân nhắc bảo mật doanh nghiệp  
- **Tích hợp Công nghệ**: Bao phủ toàn diện dịch vụ Azure hiện đại và mẫu tích hợp AI  
- **Tiến trình Học tập**: Lộ trình rõ ràng, có cấu trúc từ khái niệm cơ bản đến sản xuất  

## Ngày 26 tháng 9 năm 2025  

### Cải tiến Case Studies - Tích hợp GitHub MCP Registry  

#### Case Studies (09-CaseStudy/) - Tập trung Phát triển Hệ sinh thái  
- **README.md**: Mở rộng lớn với case study toàn diện về GitHub MCP Registry  
  - **GitHub MCP Registry Case Study**: Case study toàn diện về ra mắt MCP Registry của GitHub vào tháng 9 năm 2025  
    - **Phân tích Vấn đề**: Xem xét chi tiết các thách thức trong phát hiện và triển khai MCP server phân mảnh  
    - **Kiến trúc Giải pháp**: Cách tiếp cận registry tập trung của GitHub với cài đặt VS Code một cú nhấp chuột  
    - **Tác động Kinh doanh**: Cải thiện rõ ràng trong onboarding và năng suất phát triển  
    - **Giá trị Chiến lược**: Tập trung triển khai agent module và khả năng tương tác đa công cụ  
    - **Phát triển Hệ sinh thái**: Vị trí như nền tảng cơ sở cho tích hợp agentic  
  - **Cấu trúc Case Study Mở rộng**: Cập nhật bảy case study với định dạng và mô tả đồng nhất  
    - Azure AI Travel Agents: Nhấn mạnh điều phối đa agent  
    - Tích hợp Azure DevOps: Tập trung tự động quy trình làm việc  
    - Truy xuất Tài liệu Thời gian Thực: Triển khai client Python console  
    - Bộ tạo Kế hoạch Học tương tác: Ứng dụng web đối thoại Chainlit  
    - Tài liệu trong Trình soạn thảo: Tích hợp VS Code và GitHub Copilot  
    - Quản lý API Azure: Mẫu tích hợp API doanh nghiệp  
    - GitHub MCP Registry: Phát triển hệ sinh thái và nền tảng cộng đồng  
  - **Kết luận Toàn diện**: Viết lại phần kết luận nhấn mạnh bảy case study bao quát nhiều khía cạnh triển khai MCP  
    - Tích hợp Doanh nghiệp, Điều phối đa agent, Năng suất nhà phát triển  
    - Phát triển Hệ sinh thái, Phân loại Ứng dụng Giáo dục  
    - Hiểu biết sâu hơn về mẫu kiến trúc, chiến lược triển khai và thực hành tốt nhất  
    - Nhấn mạnh MCP như giao thức trưởng thành, sẵn sàng sản xuất  

#### Cập nhật Hướng dẫn Học tập (study_guide.md)  
- **Bản đồ Chương trình Trực quan**: Cập nhật sơ đồ tư duy bao gồm GitHub MCP Registry trong phần Case Studies  
- **Mô tả Case Studies**: Nâng cấp từ mô tả chung sang phân tích chi tiết bảy case study toàn diện  
- **Cấu trúc Kho Lưu trữ**: Cập nhật phần 10 phản ánh phạm vi case study toàn diện với chi tiết triển khai cụ thể  
- **Tích hợp Changelog**: Thêm mục ngày 26 tháng 9 năm 2025 ghi nhận bổ sung GitHub MCP Registry và cải tiến case study  
- **Cập nhật Ngày tháng**: Cập nhật dấu thời gian footer phản ánh phiên bản mới nhất (26 tháng 9 năm 2025)  

### Cải tiến Chất lượng Tài liệu  
- **Nâng cao Tính nhất quán**: Chuẩn hóa định dạng và cấu trúc case study trên toàn bộ bảy ví dụ  
- **Bao phủ Toàn diện**: Case study hiện bao gồm doanh nghiệp, năng suất phát triển và kịch bản phát triển hệ sinh thái  
- **Định vị Chiến lược**: Tăng cường tập trung MCP là nền tảng triển khai hệ thống agentic  
- **Tích hợp Tài nguyên**: Cập nhật tài nguyên bổ sung bao gồm liên kết GitHub MCP Registry  

## Ngày 15 tháng 9 năm 2025  

### Mở rộng Chủ đề Nâng cao - Giao thức Tùy chỉnh & Kỹ thuật Ngữ cảnh  

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Hướng dẫn Triển khai Nâng cao Mới  
- **README.md**: Hướng dẫn triển khai hoàn chỉnh các cơ chế giao thức MCP tùy chỉnh  
  - **Azure Event Grid Transport**: Triển khai giao thức sự kiện serverless toàn diện  
    - Ví dụ C#, TypeScript, và Python tích hợp Azure Functions  
    - Mẫu kiến trúc sự kiện hướng tới khả năng mở rộng MCP  
    - Trình nhận webhook và xử lý thông báo dựa trên push  
  - **Azure Event Hubs Transport**: Triển khai giao thức streaming băng thông cao  
    - Khả năng streaming thời gian thực cho kịch bản độ trễ thấp  
    - Chiến lược phân vùng và quản lý điểm kiểm tra  
    - Gộp thông báo và tối ưu hiệu năng  
  - **Mẫu Tích hợp Doanh nghiệp**: Ví dụ kiến trúc sẵn sàng sản xuất  
    - Xử lý MCP phân tán trên nhiều Azure Functions  
    - Kiến trúc giao thức lai kết hợp nhiều loại giao thức  
    - Độ bền, độ tin cậy và chiến lược xử lý lỗi thông điệp  
  - **Bảo mật & Giám sát**: Tích hợp Azure Key Vault và mẫu quan sát  
    - Xác thực managed identity và quyền truy cập tối thiểu  
    - Telemetry Application Insights & giám sát hiệu năng  
    - Bộ ngắt mạch và mẫu chịu lỗi  
  - **Khung Kiểm thử**: Chiến lược kiểm thử toàn diện giao thức tùy chỉnh  
    - Kiểm thử đơn vị với các test double và mocking framework  
    - Kiểm thử tích hợp với Azure Test Containers  
    - Cân nhắc kiểm thử hiệu năng và tải  

#### Kỹ thuật Ngữ cảnh (05-AdvancedTopics/mcp-contextengineering/) - Lĩnh vực AI Mới Nổi  
- **README.md**: Khám phá toàn diện kỹ thuật ngữ cảnh như một lĩnh vực mới nổi  
  - **Nguyên tắc Cốt lõi**: Chia sẻ ngữ cảnh hoàn chỉnh, nhận thức quyết định hành động, quản lý cửa sổ ngữ cảnh  
  - **Căn chỉnh với Giao thức MCP**: Cách thiết kế MCP giải quyết thách thức kỹ thuật ngữ cảnh  
    - Hạn chế cửa sổ ngữ cảnh và chiến lược nạp ngữ cảnh tiến trình  
    - Xác định liên quan và truy xuất ngữ cảnh động  
    - Xử lý ngữ cảnh đa phương thức và cân nhắc bảo mật  
  - **Phương pháp Triển khai**: Kiến trúc đơn luồng vs đa agent  
    - Kỹ thuật phân đoạn và ưu tiên ngữ cảnh  
    - Nạp ngữ cảnh tiến trình và chiến lược nén  
    - Phương pháp ngữ cảnh đa tầng và tối ưu truy xuất  
  - **Khung Đánh giá**: Các chỉ số đang nổi lên để đo hiệu quả ngữ cảnh  
    - Hiệu suất đầu vào, hiệu năng, chất lượng và trải nghiệm người dùng  
    - Phương pháp thử nghiệm tối ưu hóa ngữ cảnh  
    - Phân tích thất bại và phương pháp cải tiến  

#### Cập nhật Điều hướng Chương trình (README.md)  
- **Cấu trúc Module Mở rộng**: Cập nhật bản đồ chương trình để bao gồm chủ đề nâng cao mới  
  - Thêm mục Kỹ thuật Ngữ cảnh (5.14) và Giao thức Tùy chỉnh (5.15)  
  - Định dạng và liên kết điều hướng đồng nhất trên toàn bộ module  
  - Cập nhật mô tả phản ánh phạm vi nội dung mới nhất  

### Cải tiến Cấu trúc Thư mục  
- **Chuẩn hóa Tên gọi**: Đổi tên "mcp transport" thành "mcp-transport" để nhất quán với thư mục chủ đề nâng cao khác  
- **Tổ chức Nội dung**: Tất cả thư mục 05-AdvancedTopics giờ theo mẫu đặt tên đồng bộ (mcp-[topic])  

### Cải tiến Chất lượng Tài liệu  
- **Căn chỉnh với Đặc tả MCP**: Tất cả nội dung mới tham chiếu MCP Specification 2025-06-18 hiện hành  
- **Ví dụ Đa ngôn ngữ**: Cung cấp ví dụ mã đầy đủ C#, TypeScript và Python  
- **Tập trung Doanh nghiệp**: Mẫu sẵn sàng sản xuất và tích hợp đám mây Azure xuyên suốt  
- **Tài liệu Trực quan**: Sơ đồ Mermaid minh họa kiến trúc và luồng công việc  

## Ngày 18 tháng 8 năm 2025  

### Cập nhật Toàn diện Tài liệu - Tiêu chuẩn MCP 2025-06-18  

#### Thực hành Bảo mật MCP (02-Security/) - Hiện đại hóa Toàn bộ  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Viết lại hoàn chỉnh phù hợp MCP Specification 2025-06-18  
  - **Yêu cầu Bắt buộc**: Thêm các yêu cầu MUST/MUST NOT rõ ràng theo đặc tả chính thức với chỉ báo trực quan  
  - **12 Thực hành Bảo mật Cốt lõi**: Tái cấu trúc từ danh sách 15 mục sang các miền bảo mật toàn diện  
    - Bảo mật Token & Xác thực tích hợp nhà cung cấp danh tính bên ngoài  
    - Quản lý Phiên & Bảo mật Giao thức với yêu cầu mã hóa  
    - Bảo vệ Mối đe dọa AI đặc thù với tích hợp Microsoft Prompt Shields  
    - Kiểm soát Truy cập & Quyền hạn theo nguyên tắc cấp quyền tối thiểu  
    - An toàn Nội dung & Giám sát tích hợp Azure Content Safety  
    - Bảo mật Chuỗi cung ứng với xác minh thành phần toàn diện  
    - Bảo mật OAuth & Phòng ngừa Confused Deputy với triển khai PKCE  
    - Phản ứng Sự cố & Khôi phục với khả năng tự động  
    - Tuân thủ & Quản trị theo quy định  
    - Kiểm soát Bảo mật Nâng cao với kiến trúc zero trust  
    - Tích hợp Hệ sinh thái Bảo mật Microsoft với giải pháp toàn diện  
    - Tiến hóa Bảo mật Liên tục với thực hành thích nghi  
  - **Giải pháp Bảo mật Microsoft**: Hướng dẫn tích hợp nâng cao Prompt Shields, Azure Content Safety, Entra ID và GitHub Advanced Security  
  - **Tài nguyên Triển khai**: Phân loại các liên kết tài nguyên toàn diện theo Tài liệu MCP Chính thức, Giải pháp Bảo mật Microsoft, Tiêu chuẩn Bảo mật và Hướng dẫn Triển khai  

#### Kiểm soát Bảo mật Nâng cao (02-Security/) - Triển khai Doanh nghiệp  
- **MCP-SECURITY-CONTROLS-2025.md**: Tổng thể chỉnh sửa khung bảo mật doanh nghiệp cấp độ cao  
  - **9 Miền Bảo mật Toàn diện**: Mở rộng từ các kiểm soát cơ bản tới khung doanh nghiệp chi tiết  
    - Xác thực & Ủy quyền Nâng cao với tích hợp Microsoft Entra ID  
    - Bảo mật Token & Kiểm soát Chống Passthrough với xác thực toàn diện  
    - Kiểm soát Bảo mật Phiên với phòng chống tấn công chiếm quyền  
    - Kiểm soát An ninh Đặc thù AI với phòng chống chèn prompt và đầu độc công cụ  
    - Phòng chống Confused Deputy với bảo mật proxy OAuth  
    - Bảo mật Thực thi Công cụ với sandbox và cách ly  
    - Kiểm soát Bảo mật Chuỗi Cung ứng với xác minh phụ thuộc  
    - Kiểm soát Giám sát & Phát hiện tích hợp SIEM  
    - Phản ứng Sự cố & Khôi phục với khả năng tự động  
  - **Ví dụ Triển khai**: Thêm các đoạn cấu hình YAML chi tiết và ví dụ mã  
  - **Tích hợp Giải pháp Microsoft**: Bao phủ toàn diện dịch vụ bảo mật Azure, GitHub Advanced Security và quản lý danh tính doanh nghiệp  

#### Chủ đề Bảo mật Nâng cao (05-AdvancedTopics/mcp-security/) - Triển khai Sẵn sàng Sản xuất  
- **README.md**: Viết lại hoàn chỉnh cho triển khai bảo mật doanh nghiệp  
  - **Căn chỉnh Đặc tả Hiện hành**: Cập nhật theo MCP Specification 2025-06-18 với yêu cầu bảo mật bắt buộc  
  - **Xác thực Nâng cao**: Tích hợp Microsoft Entra ID với ví dụ .NET và Java Spring Security chi tiết  
  - **Tích hợp Bảo mật AI**: Triển khai Microsoft Prompt Shields và Azure Content Safety với ví dụ Python cụ thể  
  - **Giảm thiểu Mối đe dọa Nâng cao**: Ví dụ triển khai toàn diện cho  
    - Phòng chống Confused Deputy với PKCE và xác thực đồng ý người dùng  
    - Phòng chống Passthrough Token với xác thực audience và quản lý token an toàn  
    - Phòng chống Chiếm quyền Phiên với ràng buộc mật mã và phân tích hành vi  
  - **Tích hợp Bảo mật Doanh nghiệp**: Giám sát Azure Application Insights, pipeline phát hiện mối đe dọa và bảo mật chuỗi cung ứng  
  - **Danh sách Kiểm tra Triển khai**: Kiểm soát bảo mật bắt buộc so với khuyến nghị rõ ràng kèm lợi ích hệ sinh thái Microsoft  

### Chất lượng & Căn chỉnh Tiêu chuẩn Tài liệu  
- **Tham chiếu Đặc tả**: Cập nhật toàn bộ tham chiếu phù hợp MCP Specification 2025-06-18  
- **Hệ sinh thái Bảo mật Microsoft**: Hướng dẫn tích hợp tăng cường xuyên suốt tài liệu bảo mật  
- **Triển khai Thực tế**: Thêm ví dụ mã chi tiết .NET, Java, Python với mẫu doanh nghiệp  
- **Tổ chức Tài nguyên**: Phân loại tài liệu chính thức, tiêu chuẩn bảo mật và hướng dẫn triển khai toàn diện  
- **Chỉ báo Trực quan**: Đánh dấu rõ ràng yêu cầu bắt buộc và khuyến nghị thực hành  

#### Khái niệm Cốt lõi (01-CoreConcepts/) - Hiện đại hóa Toàn diện  
- **Cập nhật Phiên bản Giao thức**: Tham chiếu MCP Specification 2025-06-18 với định dạng theo ngày (YYYY-MM-DD)  
- **Tinh chỉnh Kiến trúc**: Mô tả cải tiến về Host, Client và Server phản ánh mẫu kiến trúc MCP hiện tại
  - Máy chủ bây giờ được định nghĩa rõ ràng như các ứng dụng AI phối hợp nhiều kết nối khách hàng MCP
  - Khách hàng được mô tả như các bộ kết nối giao thức duy trì quan hệ một-một với máy chủ
  - Máy chủ được cải tiến với các kịch bản triển khai tại chỗ và từ xa
- **Tái cấu trúc nguyên thủy**: Cải tổ hoàn toàn các nguyên thủy máy chủ và khách hàng
  - Nguyên thủy máy chủ: Tài nguyên (nguồn dữ liệu), Lời nhắc (mẫu), Công cụ (hàm thực thi) với giải thích và ví dụ chi tiết
  - Nguyên thủy khách hàng: Lấy mẫu (hoàn thành LLM), Gợi ý (đầu vào người dùng), Ghi nhật ký (gỡ lỗi/giám sát)
  - Cập nhật với các mẫu phương thức khám phá (`*/list`), truy xuất (`*/get`), và thực thi (`*/call`) hiện tại
- **Kiến trúc giao thức**: Giới thiệu mô hình kiến trúc hai lớp
  - Lớp dữ liệu: nền tảng JSON-RPC 2.0 với quản lý vòng đời và nguyên thủy
  - Lớp truyền tải: cơ chế truyền STDIO (tại chỗ) và HTTP có thể stream với SSE (từ xa)
- **Khung an ninh**: Nguyên tắc an ninh toàn diện bao gồm sự đồng thuận rõ ràng của người dùng, bảo vệ quyền riêng tư dữ liệu, an toàn khi thực thi công cụ, và bảo mật lớp truyền tải
- **Mẫu mô hình giao tiếp**: Cập nhật thông điệp giao thức để thể hiện luồng khởi tạo, khám phá, thực thi và thông báo
- **Ví dụ mã**: Làm mới các ví dụ đa ngôn ngữ (.NET, Java, Python, JavaScript) để phản ánh mẫu SDK MCP hiện tại

#### An ninh (02-Security/) - Cải tổ an ninh toàn diện  
- **Căn chỉnh tiêu chuẩn**: Hoàn toàn tương thích với yêu cầu an ninh MCP Specification 2025-06-18
- **Tiến hóa xác thực**: Tài liệu hóa tiến trình từ máy chủ OAuth tùy chỉnh đến ủy quyền nhà cung cấp danh tính bên ngoài (Microsoft Entra ID)
- **Phân tích mối đe dọa AI đặc thù**: Mở rộng bao phủ các vector tấn công AI hiện đại
  - Chi tiết kịch bản tấn công chèn lời nhắc với ví dụ thực tế
  - Cơ chế đầu độc công cụ và mẫu tấn công "kéo thảm"
  - Đầu độc cửa sổ ngữ cảnh và tấn công gây nhầm lẫn mô hình
- **Giải pháp bảo mật AI Microsoft**: Bao phủ toàn diện hệ sinh thái bảo mật Microsoft
  - AI Prompt Shields với kỹ thuật phát hiện nâng cao, làm nổi bật và phân cách
  - Mẫu tích hợp Azure Content Safety
  - GitHub Advanced Security cho bảo vệ chuỗi cung ứng
- **Giảm thiểu mối đe dọa nâng cao**: Kiểm soát an ninh chi tiết cho
  - Chiếm đoạt phiên với kịch bản tấn công MCP cụ thể và yêu cầu mã phiên mật mã
  - Vấn đề đại lý bị nhầm lẫn trong kịch bản proxy MCP với yêu cầu đồng thuận rõ ràng
  - Lỗ hổng truyền token với kiểm soát xác thực bắt buộc
- **An ninh chuỗi cung ứng**: Mở rộng bao phủ chuỗi cung ứng AI bao gồm mô hình nền tảng, dịch vụ nhúng, nhà cung cấp ngữ cảnh, và API bên thứ ba
- **Bảo mật nền tảng**: Tăng cường tích hợp với mẫu bảo mật doanh nghiệp bao gồm kiến trúc không tin cậy và hệ sinh thái bảo mật Microsoft
- **Tổ chức tài nguyên**: Phân loại liên kết tài nguyên toàn diện theo loại (Tài liệu chính thức, Tiêu chuẩn, Nghiên cứu, Giải pháp Microsoft, Hướng dẫn triển khai)

### Cải tiến chất lượng tài liệu
- **Mục tiêu học tập cấu trúc**: Nâng cấp mục tiêu học tập với kết quả cụ thể và có thể hành động
- **Tham chiếu chéo**: Thêm liên kết giữa các chủ đề an ninh và khái niệm cốt lõi liên quan
- **Thông tin hiện tại**: Cập nhật tất cả tham chiếu ngày tháng và liên kết tiêu chuẩn thành chuẩn mới nhất
- **Hướng dẫn triển khai**: Thêm hướng dẫn triển khai cụ thể, khả thi xuyên suốt cả hai phần

## 16 tháng 7, 2025

### README và Cải tiến Điều hướng
- Thiết kế lại hoàn toàn điều hướng chương trình học trong README.md
- Thay thế thẻ `<details>` bằng định dạng bảng dễ tiếp cận hơn
- Tạo các tùy chọn bố cục thay thế trong thư mục "alternative_layouts"
- Thêm ví dụ điều hướng dạng thẻ, dạng tab, và dạng accordian
- Cập nhật mục cấu trúc kho lưu trữ bao gồm tất cả các tệp mới nhất
- Nâng cấp phần "Cách sử dụng chương trình học" với khuyến nghị rõ ràng
- Cập nhật liên kết đặc tả MCP trỏ đến URL chính xác
- Thêm phần Kỹ thuật Ngữ cảnh (5.14) vào cấu trúc chương trình học

### Cập nhật Hướng dẫn Học tập
- Chỉnh sửa hoàn toàn hướng dẫn học tập để phù hợp với cấu trúc kho lưu trữ hiện tại
- Thêm các phần mới cho MCP Clients và Tools, cũng như MCP Servers phổ biến
- Cập nhật Bản đồ Chương trình Học trực quan phản ánh chính xác tất cả các chủ đề
- Nâng cao mô tả các Chủ đề Nâng cao để bao phủ mọi lĩnh vực chuyên sâu
- Cập nhật phần Nghiên cứu Trường hợp phản ánh ví dụ thực tế
- Thêm bản ghi thay đổi toàn diện này

### Đóng góp Cộng đồng (06-CommunityContributions/)
- Thêm thông tin chi tiết về MCP servers cho tạo ảnh
- Thêm phần toàn diện về sử dụng Claude trong VSCode
- Thêm hướng dẫn thiết lập và sử dụng khách hàng terminal Cline
- Cập nhật phần MCP client bao gồm mọi tùy chọn khách hàng phổ biến
- Nâng cao ví dụ đóng góp với mẫu mã chính xác hơn

### Chủ đề Nâng cao (05-AdvancedTopics/)
- Tổ chức tất cả thư mục chủ đề chuyên sâu với tên gọi nhất quán
- Thêm tài liệu và ví dụ kỹ thuật ngữ cảnh
- Thêm tài liệu tích hợp đại lý Foundry
- Nâng cao tài liệu tích hợp an ninh Entra ID

## 11 tháng 6, 2025

### Tạo Ban Đầu
- Phát hành phiên bản đầu tiên của chương trình MCP cho Người mới bắt đầu
- Tạo cấu trúc cơ bản cho 10 phần chính
- Triển khai Bản đồ Chương trình Học trực quan để điều hướng
- Thêm dự án mẫu ban đầu bằng nhiều ngôn ngữ lập trình

### Bắt đầu (03-GettingStarted/)
- Tạo ví dụ triển khai máy chủ đầu tiên
- Thêm hướng dẫn phát triển khách hàng
- Bao gồm chỉ dẫn tích hợp khách hàng LLM
- Thêm tài liệu tích hợp VS Code
- Triển khai ví dụ máy chủ Server-Sent Events (SSE)

### Khái niệm Cốt lõi (01-CoreConcepts/)
- Thêm giải thích chi tiết về kiến trúc khách-máy chủ
- Tạo tài liệu về các thành phần chính của giao thức
- Tài liệu hóa mẫu thông điệp trong MCP

## 23 tháng 5, 2025

### Cấu trúc Kho Lưu trữ
- Khởi tạo kho lưu trữ với cấu trúc thư mục cơ bản
- Tạo file README cho từng phần chính
- Thiết lập hạ tầng dịch thuật
- Thêm tài sản hình ảnh và sơ đồ

### Tài liệu
- Tạo README.md ban đầu với tổng quan chương trình học
- Thêm CODE_OF_CONDUCT.md và SECURITY.md
- Thiết lập SUPPORT.md với hướng dẫn nhận trợ giúp
- Tạo cấu trúc hướng dẫn học tập sơ bộ

## 15 tháng 4, 2025

### Lập kế hoạch và Khung làm việc
- Lập kế hoạch ban đầu cho chương trình MCP cho Người mới bắt đầu
- Xác định mục tiêu học tập và đối tượng mục tiêu
- Phác thảo cấu trúc 10 phần của chương trình học
- Phát triển khung khái niệm cho ví dụ và nghiên cứu trường hợp
- Tạo ví dụ nguyên mẫu ban đầu cho các khái niệm chính

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ bản địa nên được xem là nguồn thông tin chính xác và đáng tin cậy. Đối với các thông tin quan trọng, chúng tôi khuyến nghị sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm đối với bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->