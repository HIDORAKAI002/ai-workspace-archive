# 🚀 Máy chủ MCP với PostgreSQL - Hướng dẫn học tập hoàn chỉnh

## 🧠 Tổng quan về Lộ trình học Tích hợp Cơ sở dữ liệu MCP

Hướng dẫn học tập toàn diện này dạy bạn cách xây dựng các **máy chủ Model Context Protocol (MCP)** sẵn sàng cho sản xuất tích hợp với cơ sở dữ liệu thông qua một triển khai phân tích bán lẻ thực tế. Bạn sẽ học được các mẫu chuẩn doanh nghiệp bao gồm **Bảo mật cấp dòng (RLS)**, **tìm kiếm ngữ nghĩa**, **tích hợp AI Azure**, và **truy cập dữ liệu đa khách hàng**.

Dù bạn là nhà phát triển backend, kỹ sư AI, hay kiến trúc sư dữ liệu, hướng dẫn này cung cấp lộ trình học có cấu trúc với các ví dụ thực tế và bài tập thực hành giúp bạn làm quen với máy chủ MCP theo https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Tài nguyên chính thức của MCP

- 📘 [Tài liệu MCP](https://modelcontextprotocol.io/) – Hướng dẫn chi tiết và tài liệu người dùng
- 📜 [Đặc tả MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Kiến trúc giao thức và tham chiếu kỹ thuật
- 🧑‍💻 [Kho lưu trữ MCP trên GitHub](https://github.com/modelcontextprotocol) – SDK mã nguồn mở, công cụ và mẫu mã
- 🌐 [Cộng đồng MCP](https://github.com/orgs/modelcontextprotocol/discussions) – Tham gia thảo luận và đóng góp cho cộng đồng
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Thực hành bảo mật tốt nhất và giảm thiểu rủi ro


## 🧭 Lộ trình học Tích hợp Cơ sở dữ liệu MCP

### 📚 Cấu trúc học tập hoàn chỉnh cho https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Lab | Chủ đề | Mô tả | Liên kết |
|--------|-------|-------------|------|
| **Lab 1-3: Nền tảng** | | | |
| 00 | [Giới thiệu về Tích hợp Cơ sở dữ liệu MCP](./00-Introduction/README.md) | Tổng quan về MCP với tích hợp cơ sở dữ liệu và trường hợp sử dụng phân tích bán lẻ | [Bắt đầu tại đây](./00-Introduction/README.md) |
| 01 | [Khái niệm Kiến trúc Cốt lõi](./01-Architecture/README.md) | Hiểu kiến trúc máy chủ MCP, các lớp cơ sở dữ liệu và mẫu bảo mật | [Học](./01-Architecture/README.md) |
| 02 | [Bảo mật và Đa khách hàng](./02-Security/README.md) | Bảo mật cấp dòng, xác thực, và truy cập dữ liệu đa khách hàng | [Học](./02-Security/README.md) |
| 03 | [Cài đặt Môi trường](./03-Setup/README.md) | Thiết lập môi trường phát triển, Docker, tài nguyên Azure | [Cài đặt](./03-Setup/README.md) |
| **Lab 4-6: Xây dựng Máy chủ MCP** | | | |
| 04 | [Thiết kế Cơ sở dữ liệu và Định nghĩa lược đồ](./04-Database/README.md) | Cài đặt PostgreSQL, thiết kế lược đồ bán lẻ và dữ liệu mẫu | [Xây dựng](./04-Database/README.md) |
| 05 | [Triển khai Máy chủ MCP](./05-MCP-Server/README.md) | Xây dựng máy chủ FastMCP tích hợp cơ sở dữ liệu | [Xây dựng](./05-MCP-Server/README.md) |
| 06 | [Phát triển Công cụ](./06-Tools/README.md) | Tạo công cụ truy vấn cơ sở dữ liệu và introspection lược đồ | [Xây dựng](./06-Tools/README.md) |
| **Lab 7-9: Tính năng Nâng cao** | | | |
| 07 | [Tích hợp Tìm kiếm Ngữ nghĩa](./07-Semantic-Search/README.md) | Triển khai vec-tơ nhúng với Azure OpenAI và pgvector | [Nâng cao](./07-Semantic-Search/README.md) |
| 08 | [Kiểm thử và Gỡ lỗi](./08-Testing/README.md) | Chiến lược kiểm thử, công cụ gỡ lỗi, và phương pháp xác nhận | [Kiểm thử](./08-Testing/README.md) |
| 09 | [Tích hợp VS Code](./09-VS-Code/README.md) | Cấu hình tích hợp MCP trên VS Code và sử dụng AI Chat | [Tích hợp](./09-VS-Code/README.md) |
| **Lab 10-12: Triển khai và Thực hành tốt nhất** | | | |
| 10 | [Chiến lược Triển khai](./10-Deployment/README.md) | Triển khai Docker, Azure Container Apps, và các cân nhắc mở rộng | [Triển khai](./10-Deployment/README.md) |
| 11 | [Giám sát và Khả năng quan sát](./11-Monitoring/README.md) | Application Insights, ghi log, giám sát hiệu năng | [Giám sát](./11-Monitoring/README.md) |
| 12 | [Thực hành Tốt nhất và Tối ưu hóa](./12-Best-Practices/README.md) | Tối ưu hiệu suất, củng cố bảo mật, và mẹo sản xuất | [Tối ưu](./12-Best-Practices/README.md) |

### 💻 Bạn sẽ xây dựng gì

Kết thúc lộ trình này, bạn sẽ xây dựng được một **Máy chủ Phân tích Bán lẻ MCP Zava hoàn chỉnh** bao gồm:

- **Cơ sở dữ liệu bán lẻ nhiều bảng** với đơn hàng khách hàng, sản phẩm, và tồn kho
- **Bảo mật cấp dòng** cho cách ly dữ liệu theo cửa hàng
- **Tìm kiếm sản phẩm ngữ nghĩa** sử dụng vec-tơ nhúng Azure OpenAI
- **Tích hợp Chat AI trên VS Code** cho truy vấn ngôn ngữ tự nhiên
- **Triển khai sẵn sàng cho sản xuất** với Docker và Azure
- **Giám sát toàn diện** với Application Insights

## 🎯 Yêu cầu trước khi học

Để tận dụng tối đa lộ trình học này, bạn nên có:

- **Kinh nghiệm lập trình**: Hiểu biết về Python (ưu tiên) hoặc ngôn ngữ tương tự
- **Kiến thức Cơ sở dữ liệu**: Hiểu biết cơ bản về SQL và cơ sở dữ liệu quan hệ
- **Khái niệm API**: Hiểu REST APIs và các khái niệm HTTP
- **Công cụ phát triển**: Kinh nghiệm với dòng lệnh, Git, và trình chỉnh sửa mã
- **Kiến thức Cloud cơ bản**: (Tùy chọn) Sơ lược về Azure hoặc nền tảng đám mây tương tự
- **Hiểu biết Docker**: (Tùy chọn) Hiểu biết về container hóa

### Công cụ cần thiết

- **Docker Desktop** - Chạy PostgreSQL và máy chủ MCP
- **Azure CLI** - Triển khai tài nguyên đám mây
- **VS Code** - Phát triển và tích hợp MCP
- **Git** - Quản lý phiên bản
- **Python 3.8+** - Phát triển máy chủ MCP

## 📚 Hướng dẫn học tập & Tài nguyên

Lộ trình này bao gồm các tài nguyên toàn diện giúp bạn điều hướng hiệu quả:

### Hướng dẫn học

Mỗi lab bao gồm:
- **Mục tiêu học tập rõ ràng** - Những gì bạn sẽ đạt được
- **Hướng dẫn từng bước** - Hướng dẫn chi tiết triển khai
- **Ví dụ mã** - Mẫu làm việc kèm giải thích
- **Bài tập** - Cơ hội thực hành
- **Hướng dẫn khắc phục sự cố** - Vấn đề thường gặp và giải pháp
- **Tài nguyên bổ sung** - Đọc thêm và mở rộng

### Kiểm tra Yêu cầu trước

Trước khi bắt đầu mỗi lab, bạn sẽ thấy:
- **Kiến thức cần thiết** - Những gì bạn nên biết trước
- **Xác nhận cài đặt** - Cách kiểm tra môi trường của bạn
- **Ước lượng thời gian** - Thời gian hoàn thành dự kiến
- **Kết quả học tập** - Bạn sẽ biết gì sau khi hoàn thành

### Lộ trình học được khuyến nghị

Chọn lộ trình dựa trên trình độ của bạn:

#### 🟢 **Lộ trình Người mới** (Mới làm quen MCP)
1. Hoàn thành 0-10 của [MCP cho Người mới](https://aka.ms/mcp-for-beginners) trước
2. Hoàn thành lab 00-03 để củng cố nền tảng
3. Theo dõi lab 04-06 để thực hành xây dựng
4. Thử lab 07-09 để sử dụng thực tế

#### 🟡 **Lộ trình Trung cấp** (Có kinh nghiệm MCP)
1. Ôn lại lab 00-01 cho các khái niệm cơ sở dữ liệu đặc thù
2. Tập trung vào lab 02-06 để triển khai
3. Đi sâu lab 07-12 cho các tính năng nâng cao

#### 🔴 **Lộ trình Nâng cao** (Có kinh nghiệm MCP)
1. Lướt qua lab 00-03 để nắm bối cảnh
2. Tập trung lab 04-09 cho tích hợp cơ sở dữ liệu
3. Tập trung lab 10-12 cho triển khai sản xuất

## 🛠️ Cách sử dụng Lộ trình học này hiệu quả

### Học theo thứ tự (Khuyến nghị)

Thực hiện các lab theo thứ tự để hiểu toàn diện:

1. **Đọc tổng quan** - Hiểu những gì bạn sẽ học
2. **Kiểm tra yêu cầu** - Đảm bảo bạn có kiến thức cần thiết
3. **Theo hướng dẫn từng bước** - Triển khai đồng thời học
4. **Hoàn thành bài tập** - Củng cố kiến thức
5. **Xem lại các điểm chính** - Củng cố kết quả học tập

### Học mục tiêu

Nếu bạn cần kỹ năng cụ thể:

- **Tích hợp cơ sở dữ liệu**: Tập trung lab 04-06
- **Triển khai bảo mật**: Tập trung lab 02, 08, 12
- **AI/Tìm kiếm ngữ nghĩa**: Đi sâu lab 07
- **Triển khai sản xuất**: Học lab 10-12

### Thực hành trực tiếp

Mỗi lab bao gồm:
- **Ví dụ mã chạy được** - Sao chép, chỉnh sửa, thử nghiệm
- **Tình huống thực tế** - Trường hợp phân tích bán lẻ thực tiễn
- **Độ phức tạp tăng dần** - Xây dựng từ đơn giản đến nâng cao
- **Bước xác nhận** - Kiểm tra triển khai hoạt động đúng

## 🌟 Cộng đồng và Hỗ trợ

### Nhận trợ giúp

- **Azure AI Discord**: [Tham gia để được hỗ trợ chuyên gia](https://discord.com/invite/ByRwuEEgH4)
- **Kho GitHub và Mẫu triển khai**: [Mẫu Triển khai và Tài nguyên](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **Cộng đồng MCP**: [Tham gia thảo luận MCP rộng hơn](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Sẵn sàng bắt đầu?

Bắt đầu hành trình của bạn với **[Lab 00: Giới thiệu về Tích hợp Cơ sở dữ liệu MCP](./00-Introduction/README.md)**

---

*Làm chủ việc xây dựng máy chủ MCP sẵn sàng sản xuất tích hợp cơ sở dữ liệu qua trải nghiệm học tập thực hành và toàn diện này.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ nguyên bản của nó nên được xem là nguồn chính thức và uy tín nhất. Đối với các thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu nhầm hay giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->