# Giới thiệu về Tích hợp Cơ sở dữ liệu MCP

## 🎯 Nội dung Bài thực hành này

Bài thực hành giới thiệu này cung cấp cái nhìn tổng quan toàn diện về cách xây dựng các máy chủ Model Context Protocol (MCP) với tích hợp cơ sở dữ liệu. Bạn sẽ hiểu về trường hợp kinh doanh, kiến trúc kỹ thuật và các ứng dụng thực tế thông qua trường hợp sử dụng phân tích bán lẻ Zava tại https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Tổng quan

**Model Context Protocol (MCP)** cho phép trợ lý AI truy cập và tương tác một cách bảo mật với các nguồn dữ liệu bên ngoài theo thời gian thực. Khi kết hợp với tích hợp cơ sở dữ liệu, MCP mở ra khả năng mạnh mẽ cho các ứng dụng AI dựa trên dữ liệu.

Lộ trình học này hướng dẫn bạn xây dựng các máy chủ MCP sẵn sàng cho sản xuất kết nối trợ lý AI tới dữ liệu bán hàng bán lẻ qua PostgreSQL, triển khai các mẫu doanh nghiệp như Bảo mật Cấp độ Hàng (Row Level Security), tìm kiếm ngữ nghĩa, và truy cập dữ liệu đa người thuê.

## Mục tiêu học tập

Sau khi hoàn thành bài thực hành này, bạn sẽ có thể:

- **Định nghĩa** Model Context Protocol và lợi ích cốt lõi của nó đối với tích hợp cơ sở dữ liệu  
- **Xác định** các thành phần chính trong kiến trúc máy chủ MCP với cơ sở dữ liệu  
- **Hiểu** trường hợp sử dụng Zava Retail và các yêu cầu kinh doanh  
- **Nhận biết** các mẫu doanh nghiệp cho truy cập cơ sở dữ liệu bảo mật, có thể mở rộng  
- **Liệt kê** các công cụ và công nghệ sử dụng trong toàn bộ lộ trình học

## 🧭 Thách thức: AI Gặp Dữ liệu Thực tế

### Hạn chế của AI truyền thống

Các trợ lý AI hiện đại rất mạnh nhưng gặp phải những hạn chế đáng kể khi làm việc với dữ liệu kinh doanh thực tế:

| **Thách thức** | **Mô tả** | **Ảnh hưởng đến Kinh doanh** |
|---------------|-----------|------------------------------|
| **Kiến thức Cố định** | Mô hình AI đào tạo trên bộ dữ liệu cố định không thể truy cập dữ liệu kinh doanh hiện hành | Thông tin lỗi thời, lỡ mất cơ hội |
| **Dữ liệu Tách biệt** | Thông tin bị khóa trong cơ sở dữ liệu, API và hệ thống mà AI không thể tiếp cận | Phân tích không đầy đủ, quy trình làm việc phân mảnh |
| **Hạn chế Bảo mật** | Truy cập cơ sở dữ liệu trực tiếp gây lo ngại về bảo mật và tuân thủ | Triển khai hạn chế, chuẩn bị dữ liệu thủ công |
| **Truy vấn Phức tạp** | Người dùng kinh doanh cần kiến thức kỹ thuật để trích xuất dữ liệu | Giảm áp dụng, quy trình không hiệu quả |

### Giải pháp MCP

Model Context Protocol giải quyết các thách thức này bằng cách cung cấp:

- **Truy cập Dữ liệu Thời gian Thực**: Trợ lý AI truy vấn cơ sở dữ liệu và API trực tiếp  
- **Tích hợp Bảo mật**: Truy cập được kiểm soát với xác thực và quyền hạn  
- **Giao diện Ngôn ngữ Tự nhiên**: Người dùng kinh doanh đặt câu hỏi bằng tiếng Anh đơn giản  
- **Giao thức Chuẩn hóa**: Hoạt động trên các nền tảng và công cụ AI khác nhau

## 🏪 Gặp gỡ Zava Retail: Nghiên cứu Tình huống Học tập của chúng ta https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Trong toàn bộ lộ trình học này, chúng ta sẽ xây dựng một máy chủ MCP cho **Zava Retail**, một chuỗi bán lẻ DIY giả định với nhiều cửa hàng. Kịch bản thực tế này minh họa cho việc triển khai MCP cấp doanh nghiệp.

### Bối cảnh Kinh doanh

**Zava Retail** điều hành:  
- **8 cửa hàng vật lý** khắp tiểu bang Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 cửa hàng trực tuyến** cho bán hàng thương mại điện tử  
- **Danh mục sản phẩm đa dạng** bao gồm dụng cụ, phần cứng, vật tư làm vườn, và vật liệu xây dựng  
- **Quản lý đa cấp** với quản lý cửa hàng, quản lý khu vực, và ban điều hành  

### Yêu cầu Kinh doanh

Quản lý cửa hàng và ban điều hành cần phân tích dựa trên AI để:

1. **Phân tích hiệu suất bán hàng** giữa các cửa hàng và các khoảng thời gian  
2. **Theo dõi mức tồn kho** và xác định nhu cầu nhập lại  
3. **Hiểu hành vi khách hàng** và mô hình mua hàng  
4. **Khám phá thông tin sản phẩm** qua tìm kiếm ngữ nghĩa  
5. **Tạo báo cáo** với các truy vấn ngôn ngữ tự nhiên  
6. **Duy trì bảo mật dữ liệu** với kiểm soát truy cập dựa trên vai trò  

### Yêu cầu Kỹ thuật

Máy chủ MCP phải cung cấp:

- **Truy cập dữ liệu đa người thuê** nơi quản lý cửa hàng chỉ xem dữ liệu của cửa hàng mình  
- **Truy vấn linh hoạt** hỗ trợ các thao tác SQL phức tạp  
- **Tìm kiếm ngữ nghĩa** để khám phá sản phẩm và đề xuất  
- **Dữ liệu thời gian thực** phản ánh trạng thái kinh doanh hiện tại  
- **Xác thực bảo mật** với bảo mật cấp độ hàng  
- **Kiến trúc mở rộng** hỗ trợ nhiều người dùng đồng thời  

## 🏗️ Tổng quan Kiến trúc Máy chủ MCP

Máy chủ MCP của chúng ta triển khai kiến trúc tầng, tối ưu cho tích hợp cơ sở dữ liệu:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Các Thành phần Chính

#### **1. Tầng Máy chủ MCP**
- **FastMCP Framework**: Triển khai máy chủ MCP hiện đại bằng Python  
- **Đăng ký Công cụ**: Định nghĩa công cụ khai báo với an toàn kiểu dữ liệu  
- **Ngữ cảnh Yêu cầu**: Quản lý định danh người dùng và phiên làm việc  
- **Xử lý Lỗi**: Quản lý lỗi và ghi nhật ký mạnh mẽ  

#### **2. Tầng Tích hợp Cơ sở dữ liệu**
- **Quản lý Kết nối**: Quản lý kết nối asyncpg hiệu quả  
- **Cung cấp Schema**: Khám phá lược đồ bảng động  
- **Thực thi Truy vấn**: Thực thi SQL bảo mật với ngữ cảnh RLS  
- **Quản lý Giao dịch**: Tuân thủ ACID và xử lý quay lại  

#### **3. Tầng Bảo mật**
- **Bảo mật Cấp độ Hàng**: PostgreSQL RLS để tách biệt dữ liệu đa người thuê  
- **Xác thực Người dùng**: Xác nhận và ủy quyền quản lý cửa hàng  
- **Kiểm soát Truy cập**: Quyền hạn chi tiết và ghi nhận hoạt động  
- **Kiểm tra Đầu vào**: Ngăn chặn tấn công SQL injection và xác thực truy vấn  

#### **4. Tầng Tăng cường AI**
- **Tìm kiếm Ngữ nghĩa**: Nhúng vectơ để khám phá sản phẩm  
- **Tích hợp Azure OpenAI**: Tạo nhúng văn bản  
- **Thuật toán So sánh**: Tìm kiếm tương đồng cosine bằng pgvector  
- **Tối ưu Tìm kiếm**: Lập chỉ mục và tinh chỉnh hiệu năng  

## 🔧 Ngăn xếp Công nghệ

### Công nghệ Cốt lõi

| **Thành phần** | **Công nghệ** | **Mục đích** |
|---------------|--------------|--------------|
| **Framework MCP** | FastMCP (Python) | Triển khai máy chủ MCP hiện đại |
| **Cơ sở dữ liệu** | PostgreSQL 17 + pgvector | Dữ liệu quan hệ với tìm kiếm vector |
| **Dịch vụ AI** | Azure OpenAI | Nhúng văn bản và mô hình ngôn ngữ |
| **Đóng gói** | Docker + Docker Compose | Môi trường phát triển |
| **Nền tảng Đám mây** | Microsoft Azure | Triển khai sản xuất |
| **Tích hợp IDE** | VS Code | Chat AI và quy trình phát triển |

### Công cụ Phát triển

| **Công cụ** | **Mục đích** |
|-------------|--------------|
| **asyncpg** | Trình điều khiển PostgreSQL hiệu năng cao |
| **Pydantic** | Xác thực và tuần tự hóa dữ liệu |
| **Azure SDK** | Tích hợp dịch vụ đám mây |
| **pytest** | Framework kiểm thử |
| **Docker** | Đóng gói và triển khai |

### Ngăn xếp Sản xuất

| **Dịch vụ** | **Tài nguyên Azure** | **Mục đích** |
|-------------|---------------------|--------------|
| **Cơ sở dữ liệu** | Azure Database for PostgreSQL | Dịch vụ cơ sở dữ liệu quản lý |
| **Container** | Azure Container Apps | Máy chủ container không máy chủ |
| **Dịch vụ AI** | Microsoft Foundry | Mô hình và endpoint OpenAI |
| **Giám sát** | Application Insights | Quan sát và chuẩn đoán |
| **Bảo mật** | Azure Key Vault | Quản lý bí mật và cấu hình |

## 🎬 Các Tình huống Sử dụng Thực tế

Hãy khám phá cách người dùng khác nhau tương tác với máy chủ MCP của chúng ta:

### Tình huống 1: Đánh giá hiệu suất Quản lý Cửa hàng

**Người dùng**: Sarah, Quản lý cửa hàng Seattle  
**Mục tiêu**: Phân tích hiệu suất bán hàng quý trước

**Truy vấn Ngôn ngữ Tự nhiên**:
> "Hiển thị 10 sản phẩm hàng đầu theo doanh thu cho cửa hàng của tôi trong Q4 2024"

**Điều xảy ra**:
1. VS Code AI Chat gửi truy vấn tới máy chủ MCP  
2. MCP xác định ngữ cảnh cửa hàng của Sarah (Seattle)  
3. Chính sách RLS lọc dữ liệu chỉ cho cửa hàng Seattle  
4. Truy vấn SQL được tạo và thực thi  
5. Kết quả được định dạng và trả về AI Chat  
6. AI cung cấp phân tích và thông tin chuyên sâu  

### Tình huống 2: Khám phá Sản phẩm qua Tìm kiếm Ngữ nghĩa

**Người dùng**: Mike, Quản lý tồn kho  
**Mục tiêu**: Tìm sản phẩm tương tự yêu cầu của khách hàng

**Truy vấn Ngôn ngữ Tự nhiên**:
> "Chúng tôi bán những sản phẩm nào tương tự 'đầu nối điện chống nước dùng ngoài trời'?"

**Điều xảy ra**:
1. Truy vấn được xử lý bởi công cụ tìm kiếm ngữ nghĩa  
2. Azure OpenAI tạo vectơ nhúng  
3. pgvector thực hiện tìm kiếm tương đồng  
4. Sản phẩm liên quan được xếp hạng theo mức độ liên quan  
5. Kết quả bao gồm chi tiết sản phẩm và tình trạng hàng  
6. AI đề xuất các lựa chọn thay thế và cơ hội đóng gói  

### Tình huống 3: Phân tích Đa cửa hàng

**Người dùng**: Jennifer, Quản lý Khu vực  
**Mục tiêu**: So sánh hiệu suất giữa tất cả các cửa hàng

**Truy vấn Ngôn ngữ Tự nhiên**:
> "So sánh doanh thu theo danh mục cho tất cả cửa hàng trong 6 tháng qua"

**Điều xảy ra**:
1. Ngữ cảnh RLS được thiết lập cho quyền truy cập của quản lý khu vực  
2. Truy vấn đa cửa hàng phức tạp được tạo  
3. Dữ liệu được tổng hợp theo vị trí cửa hàng  
4. Kết quả bao gồm xu hướng và so sánh  
5. AI xác định thông tin chi tiết và khuyến nghị  

## 🔒 Đào sâu Bảo mật và Đa Người Thuê

Việc triển khai của chúng ta ưu tiên bảo mật cấp doanh nghiệp:

### Bảo mật Cấp độ Hàng (RLS)

PostgreSQL RLS đảm bảo tách biệt dữ liệu:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Quản lý Định danh Người dùng

Mỗi kết nối MCP bao gồm:  
- **ID Quản lý Cửa hàng**: Định danh duy nhất cho ngữ cảnh RLS  
- **Phân công Vai trò**: Quyền hạn và cấp độ truy cập  
- **Quản lý Phiên làm việc**: Mã thông báo xác thực bảo mật  
- **Ghi nhật ký Kiểm toán**: Lịch sử truy cập đầy đủ  

### Bảo vệ Dữ liệu

Nhiều lớp bảo mật:  
- **Mã hóa Kết nối**: TLS cho tất cả kết nối cơ sở dữ liệu  
- **Ngăn chặn SQL Injection**: Chỉ sử dụng truy vấn tham số hóa  
- **Xác thực Đầu vào**: Kiểm tra truy vấn toàn diện  
- **Xử lý Lỗi**: Không tiết lộ dữ liệu nhạy cảm trong thông báo lỗi  

## 🎯 Những điểm quan trọng cần nhớ

Sau khi hoàn thành phần giới thiệu này, bạn nên hiểu:

✅ **Giá trị MCP**: Cách MCP kết nối trợ lý AI với dữ liệu thực tế  
✅ **Bối cảnh Kinh doanh**: Yêu cầu và thách thức của Zava Retail  
✅ **Tổng quan Kiến trúc**: Các thành phần chính và cách chúng tương tác  
✅ **Ngăn xếp Công nghệ**: Công cụ và framework sử dụng  
✅ **Mô hình Bảo mật**: Truy cập dữ liệu đa người thuê và bảo vệ  
✅ **Mẫu Sử dụng**: Các tình huống truy vấn thực tế và quy trình làm việc  

## 🚀 Tiếp theo là gì

Sẵn sàng đi sâu hơn? Tiếp tục với:

**[Lab 01: Các khái niệm Kiến trúc Cốt lõi](../01-Architecture/README.md)**

Tìm hiểu về mẫu kiến trúc máy chủ MCP, nguyên tắc thiết kế cơ sở dữ liệu, và triển khai kỹ thuật chi tiết hỗ trợ giải pháp phân tích bán lẻ của chúng ta.

## 📚 Tài nguyên Bổ sung

### Tài liệu MCP
- [MCP Specification](https://modelcontextprotocol.io/docs/) - Tài liệu chính thức của giao thức  
- [MCP for Beginners](https://aka.ms/mcp-for-beginners) - Hướng dẫn học MCP toàn diện  
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk) - Tài liệu SDK Python  

### Tích hợp Cơ sở dữ liệu
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Tài liệu tham khảo PostgreSQL toàn diện  
- [pgvector Guide](https://github.com/pgvector/pgvector) - Tài liệu mở rộng vector  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Hướng dẫn PostgreSQL RLS  

### Dịch vụ Azure
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/cognitive-services/openai/) - Tích hợp dịch vụ AI  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Dịch vụ cơ sở dữ liệu được quản lý  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Container không máy chủ  

---

**Tuyên bố từ chối**: Đây là bài tập học tập sử dụng dữ liệu bán lẻ giả định. Luôn tuân thủ chính sách quản trị dữ liệu và bảo mật của tổ chức bạn khi triển khai các giải pháp tương tự trong môi trường sản xuất.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->