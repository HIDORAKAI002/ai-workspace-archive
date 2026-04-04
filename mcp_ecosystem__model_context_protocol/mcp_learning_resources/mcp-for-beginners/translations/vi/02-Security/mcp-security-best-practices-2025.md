# MCP Security Best Practices - Cập nhật Tháng 2 năm 2026

> **Quan trọng**: Tài liệu này phản ánh các yêu cầu bảo mật mới nhất của [Đặc tả MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) và [Thực hành bảo mật MCP chính thức](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Luôn tham khảo đặc tả hiện hành để có hướng dẫn cập nhật nhất.

## 🏔️ Đào tạo Bảo mật Thực hành

Để có kinh nghiệm triển khai thực tế, chúng tôi khuyến nghị **[Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** — một chuyến thám hiểm toàn diện có hướng dẫn để bảo mật các máy chủ MCP trên Azure. Hội thảo bao phủ tất cả các rủi ro OWASP MCP Top 10 qua phương pháp “vulnerable → exploit → fix → validate”.

Mọi thực hành trong tài liệu này đều phù hợp với **[Hướng dẫn Bảo mật Azure MCP của OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** cho hướng dẫn triển khai đặc thù trên Azure.

## Các Thực hành Bảo mật Cơ bản cho Triển khai MCP

Model Context Protocol mang đến những thách thức bảo mật độc đáo vượt ra ngoài bảo mật phần mềm truyền thống. Các thực hành này xử lý các yêu cầu bảo mật cơ bản và các mối đe dọa đặc thù MCP bao gồm tiêm prompt, đầu độc công cụ, chiếm đoạt phiên làm việc, vấn đề đại diện nhầm, và các điểm yếu truyền token.

### **Yêu cầu Bảo mật BẮT BUỘC**

**Yêu cầu quan trọng từ Đặc tả MCP:**

### **Yêu cầu Bảo mật BẮT BUỘC**

**Yêu cầu quan trọng từ Đặc tả MCP:**

> **KHÔNG ĐƯỢC:** Các máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận bất kỳ token nào không được cấp rõ ràng cho máy chủ MCP
> 
> **PHẢI:** Các máy chủ MCP có triển khai ủy quyền **PHẢI** xác minh TẤT CẢ các yêu cầu đầu vào
>  
> **KHÔNG ĐƯỢC:** Các máy chủ MCP **KHÔNG ĐƯỢC** sử dụng phiên làm việc để xác thực
>
> **PHẢI:** Máy chủ proxy MCP sử dụng ID khách hàng tĩnh **PHẢI** có được sự đồng ý người dùng cho mỗi khách hàng đăng ký động

---

## 1. **Bảo mật Token & Xác thực**

**Điều khiển Xác thực & Ủy quyền:**
   - **Đánh giá Ủy quyền Nghiêm ngặt**: Thực hiện kiểm toán toàn diện logic ủy quyền của máy chủ MCP để đảm bảo chỉ người dùng và khách hàng dự kiến mới có thể truy cập tài nguyên
   - **Tích hợp Nhà cung cấp Định danh Bên ngoài**: Sử dụng nhà cung cấp định danh đã được thiết lập như Microsoft Entra ID thay vì triển khai xác thực tùy chỉnh
   - **Xác thực Đối tượng Token**: Luôn kiểm tra token được cấp rõ ràng cho máy chủ MCP của bạn - không bao giờ chấp nhận token thượng nguồn
   - **Quản lý Vòng đời Token phù hợp**: Triển khai xoay vòng token an toàn, chính sách hết hạn và ngăn chặn các cuộc tấn công phát lại token

**Lưu trữ Token Bảo vệ:**
   - Sử dụng Azure Key Vault hoặc kho lưu trữ bảo mật tương tự cho mọi bí mật
   - Thực hiện mã hóa token khi lưu trữ và truyền tải
   - Xoay vòng và giám sát thông tin xác thực định kỳ để phát hiện truy cập trái phép

## 2. **Quản lý Phiên & Bảo mật Vận chuyển**

**Thực hành Phiên Bảo mật:**
   - **ID Phiên An toàn Mã hóa**: Sử dụng ID phiên an toàn, không xác định tạo bởi bộ sinh số ngẫu nhiên bảo mật
   - **Liên kết Riêng theo Người dùng**: Liên kết ID phiên với danh tính người dùng bằng định dạng như `<user_id>:<session_id>` để ngăn chặn lạm dụng phiên chéo người dùng
   - **Quản lý Vòng đời Phiên**: Triển khai hết hạn, xoay vòng và vô hiệu hóa đúng cách để hạn chế các cửa sổ lỗ hổng
   - **Bắt buộc HTTPS/TLS**: Buộc dùng HTTPS cho tất cả giao tiếp để ngăn chặn bắt giữ ID phiên

**Bảo mật Lớp Vận chuyển:**
   - Cấu hình TLS 1.3 khi có thể kèm quản lý chứng chỉ phù hợp
   - Thực hiện pin chứng chỉ cho các kết nối quan trọng
   - Xoay vòng chứng chỉ định kỳ và kiểm tra hiệu lực

## 3. **Bảo vệ Mối đe dọa Đặc thù AI** 🤖

**Phòng thủ Tiêm Prompt:**
   - **Lá chắn Prompt Microsoft**: Triển khai Lá chắn Prompt AI để phát hiện và lọc lệnh độc hại nâng cao
   - **Thanh lọc Đầu vào**: Kiểm tra và làm sạch tất cả đầu vào để ngăn chặn tấn công tiêm và vấn đề đại diện nhầm
   - **Ranh giới Nội dung**: Sử dụng hệ thống phân cách và đánh dấu dữ liệu để phân biệt giữa lệnh tin cậy và nội dung bên ngoài

**Phòng chống Đầu độc Công cụ:**
   - **Xác thực Metadata Công cụ**: Thực hiện kiểm tra tính toàn vẹn định nghĩa công cụ và giám sát thay đổi bất thường
   - **Giám sát Công cụ Động**: Giám sát hành vi runtime và thiết lập cảnh báo các mẫu thực thi không mong muốn
   - **Quy trình Phê duyệt**: Yêu cầu xác nhận rõ ràng của người dùng cho mọi thay đổi và cập nhật năng lực công cụ

## 4. **Kiểm soát Truy cập & Quyền hạn**

**Nguyên tắc Quyền ít nhất:**
   - Cấp cho máy chủ MCP chỉ những quyền tối thiểu cần thiết cho chức năng dự kiến
   - Triển khai kiểm soát truy cập theo vai trò (RBAC) với quyền chi tiết
   - Định kỳ rà soát quyền và giám sát liên tục để phát hiện leo thang quyền

**Điều khiển Quyền thời gian chạy:**
   - Áp dụng giới hạn tài nguyên để ngăn chặn tấn công cạn kiệt nguồn lực
   - Sử dụng cô lập container cho môi trường thực thi công cụ  
   - Triển khai truy cập chỉ khi cần thiết cho các chức năng quản trị

## 5. **An toàn Nội dung & Giám sát**

**Triển khai An toàn Nội dung:**
   - **Tích hợp Azure Content Safety**: Sử dụng Azure Content Safety để phát hiện nội dung độc hại, cố gắng phá rào, và vi phạm chính sách
   - **Phân tích Hành vi**: Triển khai giám sát hành vi runtime để phát hiện bất thường trong thực thi máy chủ MCP và công cụ
   - **Ghi nhật ký Toàn diện**: Ghi lại tất cả nỗ lực xác thực, gọi công cụ và sự kiện bảo mật với lưu trữ an toàn, chống giả mạo

**Giám sát Liên tục:**
   - Cảnh báo theo thời gian thực cho các mẫu đáng ngờ và nỗ lực truy cập trái phép  
   - Tích hợp cùng hệ thống SIEM cho quản lý sự kiện bảo mật tập trung
   - Kiểm tra bảo mật và thử nghiệm xâm nhập định kỳ với các triển khai MCP

## 6. **Bảo mật Chuỗi cung ứng**

**Xác minh Thành phần:**
   - **Quét Phụ thuộc**: Sử dụng quét lỗ hổng tự động cho tất cả phụ thuộc phần mềm và thành phần AI
   - **Xác thực Nguồn gốc**: Kiểm tra nguồn gốc, cấp phép và tính toàn vẹn của mô hình, nguồn dữ liệu và dịch vụ bên ngoài
   - **Gói Ký số**: Sử dụng gói được ký số mã hóa và kiểm tra chữ ký trước khi triển khai

**Chu trình Phát triển An toàn:**
   - **GitHub Advanced Security**: Triển khai quét bí mật, phân tích phụ thuộc và phân tích tĩnh CodeQL
   - **Bảo mật CI/CD**: Tích hợp xác minh bảo mật trong toàn bộ chuỗi triển khai tự động
   - **Tính Toàn vẹn của Hiện vật**: Triển khai xác minh mã hóa cho các hiện vật và cấu hình khi triển khai

## 7. **Bảo mật OAuth & Phòng tránh Đại diện Nhầm**

**Triển khai OAuth 2.1:**
   - **Triển khai PKCE**: Sử dụng Proof Key for Code Exchange (PKCE) cho tất cả yêu cầu ủy quyền
   - **Đồng ý Rõ ràng**: Thu thập sự đồng ý người dùng cho mỗi khách hàng đăng ký động nhằm ngăn chặn tấn công đại diện nhầm
   - **Xác thực Redirect URI**: Triển khai xác thực nghiêm ngặt các URI chuyển hướng và định danh khách hàng

**Bảo mật Proxy:**
   - Ngăn chặn bypass ủy quyền qua khai thác ID khách hàng tĩnh
   - Triển khai quy trình đồng ý thích hợp cho truy cập API của bên thứ ba
   - Giám sát trộm mã ủy quyền và truy cập API trái phép

## 8. **Ứng phó Sự cố & Khôi phục**

**Khả năng Ứng phó Nhanh:**
   - **Ứng phó Tự động**: Triển khai hệ thống tự động cho xoay vòng thông tin xác thực và kiểm soát mối đe dọa
   - **Thủ tục Hoàn tác**: Khả năng nhanh chóng trả về cấu hình và thành phần tin cậy đã biết
   - **Khả năng Pháp y**: Hồ sơ kiểm toán chi tiết và ghi nhật ký cho điều tra sự cố

**Liên lạc & Phối hợp:**
   - Quy trình leo thang rõ ràng cho các sự cố bảo mật
   - Tích hợp với đội ứng phó sự cố của tổ chức
   - Mô phỏng sự cố và tập huấn thường xuyên

## 9. **Tuân thủ & Quản trị**

**Tuân thủ Quy định:**
   - Đảm bảo các triển khai MCP đáp ứng yêu cầu ngành cụ thể (GDPR, HIPAA, SOC 2)
   - Triển khai phân loại dữ liệu và kiểm soát quyền riêng tư cho xử lý dữ liệu AI
   - Lưu giữ tài liệu toàn diện phục vụ kiểm toán tuân thủ

**Quản lý Thay đổi:**
   - Quy trình đánh giá bảo mật chính thức cho mọi sửa đổi hệ thống MCP
   - Kiểm soát phiên bản và quy trình phê duyệt cho các thay đổi cấu hình
   - Đánh giá tuân thủ định kỳ và phân tích khoảng trống

## 10. **Điều khiển Bảo mật Nâng cao**

**Kiến trúc Zero Trust:**
   - **Không Bao Giờ Tin, Luôn Xác minh**: Xác minh liên tục người dùng, thiết bị và kết nối
   - **Phân đoạn Vi mô**: Kiểm soát mạng chi tiết cách ly các thành phần MCP riêng lẻ
   - **Truy cập Có điều kiện**: Kiểm soát truy cập dựa trên rủi ro, thích ứng theo bối cảnh và hành vi hiện tại

**Bảo vệ Ứng dụng Thời gian chạy:**
   - **Runtime Application Self-Protection (RASP)**: Triển khai kỹ thuật RASP để phát hiện mối đe dọa thời gian thực
   - **Giám sát Hiệu năng Ứng dụng**: Theo dõi bất thường hiệu năng có thể chỉ ra tấn công
   - **Chính sách Bảo mật Động**: Triển khai chính sách bảo mật tự điều chỉnh dựa trên cảnh quan đe dọa hiện tại

## 11. **Tích hợp Hệ sinh thái Bảo mật Microsoft**

**Bảo mật Microsoft Toàn diện:**
   - **Microsoft Defender cho Cloud**: Quản lý thế đứng bảo mật đám mây cho khối lượng công việc MCP
   - **Azure Sentinel**: SIEM và SOAR bản địa đám mây cho phát hiện mối đe dọa nâng cao
   - **Microsoft Purview**: Quản trị dữ liệu và tuân thủ cho quy trình AI và nguồn dữ liệu

**Quản lý Định danh & Truy cập:**
   - **Microsoft Entra ID**: Quản lý định danh doanh nghiệp với các chính sách truy cập có điều kiện
   - **Quản lý Định danh Đặc quyền (PIM)**: Truy cập đúng lúc và quy trình phê duyệt cho chức năng quản trị
   - **Bảo vệ Định danh**: Truy cập có điều kiện dựa trên rủi ro và phản ứng mối đe dọa tự động

## 12. **Tiến hóa Bảo mật Liên tục**

**Luôn Cập nhật:**
   - **Giám sát Đặc tả**: Rà soát định kỳ các cập nhật và thay đổi hướng dẫn bảo mật MCP
   - **Tình báo Mối đe dọa**: Tích hợp nguồn cấp dữ liệu mối đe dọa đặc thù AI và chỉ báo xâm phạm
   - **Tham gia Cộng đồng Bảo mật**: Tham gia tích cực trong cộng đồng bảo mật MCP và chương trình tiết lộ lỗ hổng

**Bảo mật Thích ứng:**
   - **Bảo mật Học máy**: Dùng phát hiện dị thường dựa trên ML để nhận dạng mẫu tấn công mới
   - **Phân tích Bảo mật Dự đoán**: Triển khai mô hình dự báo để nhận diện mối đe dọa chủ động
   - **Tự động hóa Bảo mật**: Cập nhật chính sách bảo mật tự động dựa trên tình báo mối đe dọa và thay đổi đặc tả

---

## **Tài nguyên Bảo mật Quan trọng**

### **Tài liệu Chính thức MCP**
- [Đặc tả MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Thực hành Bảo mật MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Đặc tả Ủy quyền MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Tài nguyên Bảo mật OWASP MCP**
- [Hướng dẫn Bảo mật Azure MCP của OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Tổng quan OWASP MCP Top 10 với triển khai Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rủi ro bảo mật chính thức OWASP MCP
- [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo bảo mật thực hành cho MCP trên Azure

### **Giải pháp Bảo mật Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Bảo mật Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Tiêu chuẩn Bảo mật**
- [Thực hành Bảo mật OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 cho Mô hình Ngôn ngữ Lớn](https://genai.owasp.org/)
- [Khung Quản lý Rủi ro AI của NIST](https://www.nist.gov/itl/ai-risk-management-framework)

### **Hướng dẫn Triển khai**
- [Cổng Xác thực MCP với Azure API Management](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID với các Máy chủ MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Thông báo Bảo mật**: Thực hành bảo mật MCP tiến triển nhanh chóng. Luôn kiểm tra theo [đặc tả MCP hiện hành](https://spec.modelcontextprotocol.io/) và [tài liệu bảo mật chính thức](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) trước khi triển khai.

## Tiếp theo là gì

- Đọc: [Kiểm soát Bảo mật MCP 2025](./mcp-security-controls-2025.md)
- Quay lại: [Tổng quan Module Bảo mật](./README.md)
- Tiếp tục tới: [Module 3: Bắt đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được xem là nguồn chính thức và đáng tin cậy. Đối với các thông tin quan trọng, khuyến nghị sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm đối với bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->