# Thực hành Bảo mật MCP Tốt nhất 2025

Hướng dẫn toàn diện này trình bày các thực hành bảo mật thiết yếu để triển khai hệ thống Model Context Protocol (MCP) dựa trên **Đặc tả MCP 2025-11-25** mới nhất và các tiêu chuẩn ngành hiện hành. Những thực hành này xử lý cả các vấn đề bảo mật truyền thống và các mối đe dọa cụ thể của AI đặc thù cho triển khai MCP.

## Các Yêu cầu Bảo mật Quan trọng

### Kiểm soát Bảo mật Bắt buộc (Yêu cầu MUST)

1. **Xác thực Token**: Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận bất kỳ token nào không được cấp rõ ràng cho chính máy chủ MCP đó  
2. **Xác minh Ủy quyền**: Máy chủ MCP triển khai ủy quyền **PHẢI** xác minh TẤT CẢ các yêu cầu đầu vào và **KHÔNG ĐƯỢC** sử dụng phiên làm phương thức xác thực  
3. **Sự đồng ý của Người dùng**: Máy chủ proxy MCP sử dụng client ID tĩnh **PHẢI** có được sự đồng ý rõ ràng của người dùng cho từng client đăng ký động  
4. **ID Phiên Bảo mật**: Máy chủ MCP **PHẢI** sử dụng ID phiên không xác định, được tạo ngẫu nhiên với thuật toán mật mã bảo mật

## Thực hành Bảo mật Cốt lõi

### 1. Xác thực & Làm sạch Đầu vào
- **Xác thực Đầu vào Toàn diện**: Xác thực và làm sạch tất cả các đầu vào để tránh các cuộc tấn công tiêm nhiễm, lỗi confused deputy, và lỗ hổng tiêm nhiễm prompt  
- **Áp dụng Lược đồ Tham số**: Thực hiện xác thực nghiêm ngặt theo lược đồ JSON cho tất cả tham số công cụ và đầu vào API  
- **Lọc Nội dung**: Sử dụng Microsoft Prompt Shields và Azure Content Safety để lọc nội dung độc hại trong prompt và phản hồi  
- **Làm sạch Đầu ra**: Xác thực và làm sạch tất cả đầu ra mô hình trước khi trình bày cho người dùng hoặc hệ thống hạ nguồn

### 2. Đặc tính Xuất sắc về Xác thực & Ủy quyền
- **Nhà cung cấp Danh tính Bên ngoài**: Ủy nhiệm xác thực cho các nhà cung cấp danh tính đã được thiết lập (Microsoft Entra ID, các nhà cung cấp OAuth 2.1) thay vì triển khai xác thực tùy chỉnh  
- **Quyền Hạn Tinh Vi**: Triển khai quyền hạn chi tiết theo công cụ tuân theo nguyên tắc tối thiểu đặc quyền  
- **Quản lý Vòng đời Token**: Sử dụng token truy cập thời gian ngắn với việc xoay an toàn và xác thực đối tượng phù hợp  
- **Xác thực Đa yếu tố**: Yêu cầu MFA cho tất cả truy cập quản trị và các hoạt động nhạy cảm

### 3. Giao thức Giao tiếp Bảo mật
- **Bảo mật Lớp Vận chuyển**: Sử dụng HTTPS/TLS 1.3 cho tất cả các giao tiếp MCP với xác thực chứng chỉ đúng cách  
- **Mã hóa Đầu-cuối**: Triển khai các lớp mã hóa bổ sung cho dữ liệu nhạy cảm cao đang truyền và lưu trữ  
- **Quản lý Chứng chỉ**: Duy trì quản lý vòng đời chứng chỉ chính xác với các quy trình gia hạn tự động  
- **Tuân thủ Phiên bản Giao thức**: Sử dụng phiên bản giao thức MCP hiện tại (2025-11-25) với cơ chế đàm phán phiên bản thích hợp

### 4. Giới hạn Tốc độ & Bảo vệ Tài nguyên Nâng cao
- **Giới hạn Tốc độ Đa lớp**: Triển khai giới hạn tốc độ ở mức người dùng, phiên, công cụ và tài nguyên để ngăn ngừa lạm dụng  
- **Giới hạn Tốc độ Thích ứng**: Sử dụng giới hạn tốc độ dựa trên học máy thích ứng theo mô hình sử dụng và chỉ báo mối đe dọa  
- **Quản lý Hạn ngạch Tài nguyên**: Đặt giới hạn phù hợp cho tài nguyên tính toán, bộ nhớ sử dụng và thời gian thực thi  
- **Bảo vệ DDoS**: Triển khai các hệ thống bảo vệ DDoS và phân tích lưu lượng toàn diện

### 5. Ghi nhật ký & Giám sát Toàn diện
- **Ghi nhật ký Kiểm toán Có cấu trúc**: Triển khai ghi nhật ký chi tiết, có thể tìm kiếm cho tất cả hoạt động MCP, thực thi công cụ, và sự kiện bảo mật  
- **Giám sát Bảo mật Thời gian Thực**: Triển khai hệ thống SIEM với phát hiện bất thường sử dụng AI cho khối lượng công việc MCP  
- **Ghi nhật ký Tuân thủ Quyền riêng tư**: Ghi lại các sự kiện bảo mật đồng thời tuân thủ các yêu cầu và quy định bảo vệ dữ liệu  
- **Tích hợp Phản ứng Sự cố**: Kết nối hệ thống ghi nhật ký với quy trình phản ứng sự cố tự động

### 6. Thực hành Lưu trữ Bảo mật Nâng cao
- **Mô-đun Bảo mật Phần cứng**: Sử dụng lưu trữ khóa hỗ trợ HSM (Azure Key Vault, AWS CloudHSM) cho các hoạt động mật mã quan trọng  
- **Quản lý Khóa Mã hóa**: Thực hiện xoay khóa, phân tách và kiểm soát truy cập khóa mã hóa đúng cách  
- **Quản lý Bí mật**: Lưu trữ tất cả khóa API, token và chứng thực trong hệ thống quản lý bí mật riêng biệt  
- **Phân loại Dữ liệu**: Phân loại dữ liệu theo mức độ nhạy cảm và áp dụng các biện pháp bảo vệ phù hợp

### 7. Quản lý Token Nâng cao
- **Ngăn chặn Chuyển tiếp Token**: Cấm rõ ràng các mẫu chuyển tiếp token vượt qua kiểm soát bảo mật  
- **Xác thực Đối tượng**: Luôn xác minh câu claim đối tượng token phù hợp với danh tính máy chủ MCP dự kiến  
- **Ủy quyền Dựa trên Claims**: Triển khai ủy quyền chi tiết dựa trên claims token và thuộc tính người dùng  
- **Ràng buộc Token**: Ràng buộc token với phiên, người dùng hoặc thiết bị cụ thể khi phù hợp

### 8. Quản lý Phiên Bảo mật
- **ID Phiên Mật mã**: Tạo ID phiên sử dụng trình tạo số ngẫu nhiên mật mã an toàn (không phải chuỗi dự đoán)  
- **Ràng buộc Đặc thù Người dùng**: Ràng buộc ID phiên với thông tin người dùng theo định dạng bảo mật như `<user_id>:<session_id>`  
- **Kiểm soát Vòng đời Phiên**: Triển khai cơ chế hết hạn, xoay và vô hiệu hóa phiên đúng cách  
- **Headers Bảo mật Phiên**: Sử dụng headers HTTP bảo mật thích hợp để bảo vệ phiên

### 9. Kiểm soát Bảo mật Đặc thù AI
- **Phòng chống Tiêm nhiễm Prompt**: Triển khai Microsoft Prompt Shields với kỹ thuật spotlight, delimiters và datamarking  
- **Ngăn ngừa Độc hại Công cụ**: Xác thực metadata công cụ, giám sát sự thay đổi động, và xác minh tính toàn vẹn công cụ  
- **Xác thực Đầu ra Mô hình**: Quét đầu ra mô hình để phát hiện rò rỉ dữ liệu, nội dung có hại hoặc vi phạm chính sách bảo mật  
- **Bảo vệ Cửa sổ Ngữ cảnh**: Triển khai kiểm soát để ngăn chặn tấn công làm độc hoặc thao túng cửa sổ ngữ cảnh

### 10. Bảo mật Thực thi Công cụ
- **Chạy trong Môi trường Sandboxing**: Thực thi công cụ trong môi trường container hóa, cô lập với giới hạn tài nguyên  
- **Tách biệt Quyền hạn**: Thực thi công cụ với quyền hạn tối thiểu cần thiết và tài khoản dịch vụ riêng biệt  
- **Cách ly Mạng**: Thực hiện phân đoạn mạng cho môi trường thực thi công cụ  
- **Giám sát Thực thi**: Giám sát hành vi bất thường, sử dụng tài nguyên và vi phạm bảo mật khi thực thi công cụ

### 11. Xác thực Bảo mật Liên tục
- **Kiểm tra Bảo mật Tự động**: Tích hợp kiểm tra bảo mật vào CI/CD pipeline với công cụ như GitHub Advanced Security  
- **Quản lý Lỗ hổng**: Quét định kỳ tất cả thư viện, bao gồm mô hình AI và dịch vụ bên ngoài  
- **Kiểm thử Xâm nhập**: Thực hiện đánh giá bảo mật thường xuyên tập trung vào triển khai MCP  
- **Đánh giá Mã Bảo mật**: Thực hiện đánh giá bảo mật bắt buộc cho tất cả thay đổi mã liên quan MCP

### 12. Bảo mật Chuỗi Cung ứng cho AI
- **Xác minh Thành phần**: Xác minh nguồn gốc, tính toàn vẹn, và bảo mật của tất cả thành phần AI (mô hình, embeddings, API)  
- **Quản lý Phụ thuộc**: Duy trì danh mục cập nhật tất cả phần mềm và phụ thuộc AI cùng theo dõi lỗ hổng  
- **Kho Tin cậy**: Sử dụng nguồn đã xác minh, tin cậy cho tất cả mô hình AI, thư viện, và công cụ  
- **Giám sát Chuỗi Cung ứng**: Liên tục giám sát các nhà cung cấp dịch vụ AI và kho mô hình để phát hiện xâm phạm

## Các Mẫu Bảo mật Nâng cao

### Kiến trúc Zero Trust cho MCP
- **Không bao giờ tin, Luôn xác minh**: Triển khai xác minh liên tục cho tất cả thành phần MCP  
- **Phân đoạn vi mô**: Cô lập các thành phần MCP với kiểm soát mạng và danh tính chi tiết  
- **Truy cập Có điều kiện**: Triển khai kiểm soát truy cập dựa trên rủi ro, thích ứng theo ngữ cảnh và hành vi  
- **Đánh giá Rủi ro Liên tục**: Đánh giá động vị thế bảo mật dựa trên chỉ báo đe dọa hiện tại

### Triển khai AI Bảo vệ Quyền riêng tư
- **Giảm thiểu Dữ liệu**: Chỉ công khai dữ liệu tối thiểu cần thiết cho từng hoạt động MCP  
- **Bảo vệ Riêng tư Dị biệt (Differential Privacy)**: Triển khai kỹ thuật bảo vệ riêng tư cho xử lý dữ liệu nhạy cảm  
- **Mã hóa Homomorphic**: Sử dụng kỹ thuật mã hóa nâng cao cho tính toán an toàn trên dữ liệu được mã hóa  
- **Học Liên kết (Federated Learning)**: Triển khai các phương pháp học phân tán bảo vệ vị trí dữ liệu và riêng tư

### Phản ứng Sự cố cho Hệ thống AI
- **Quy trình Sự cố Đặc thù AI**: Phát triển quy trình phản ứng sự cố phù hợp với mối đe dọa đặc thù AI và MCP  
- **Phản ứng Tự động**: Triển khai tự động giới hạn và khắc phục các sự cố bảo mật AI phổ biến  
- **Năng lực Giám định**: Duy trì sẵn sàng pháp y cho các sự cố xâm phạm hệ thống AI và rò rỉ dữ liệu  
- **Quy trình Khôi phục**: Thiết lập quy trình khôi phục từ đầu độc mô hình AI, tấn công tiêm nhiễm prompt, và xâm phạm dịch vụ

## Tài nguyên & Tiêu chuẩn Triển khai

### 🏔️ Đào tạo Bảo mật Thực hành
- **[Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Hội thảo thực hành toàn diện về bảo mật máy chủ MCP trong Azure  
- **[Hướng dẫn Bảo mật MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Kiến trúc tham khảo và hướng dẫn triển khai TOP 10 OWASP MCP

### Tài liệu MCP Chính thức
- [Đặc tả MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Đặc tả giao thức MCP hiện tại  
- [Thực hành Bảo mật MCP Tốt nhất](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Hướng dẫn bảo mật chính thức  
- [Đặc tả Ủy quyền MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Mô hình xác thực và ủy quyền  
- [Bảo mật Giao thức MCP](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Yêu cầu bảo mật lớp vận chuyển

### Giải pháp Bảo mật Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Bảo vệ tiêm nhiễm prompt nâng cao  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Lọc nội dung AI toàn diện  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Quản lý danh tính và truy cập doanh nghiệp  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Quản lý bí mật và chứng thực an toàn  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Quét bảo mật chuỗi cung ứng và mã nguồn

### Tiêu chuẩn & Khung bảo mật
- [Thực hành Bảo mật OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Hướng dẫn bảo mật OAuth hiện tại  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Rủi ro bảo mật ứng dụng web  
- [OWASP Top 10 cho LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Rủi ro bảo mật đặc thù AI  
- [Khung Quản lý Rủi ro AI NIST](https://www.nist.gov/itl/ai-risk-management-framework) - Quản lý rủi ro AI toàn diện  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Hệ thống quản lý bảo mật thông tin

### Hướng dẫn & Học liệu Triển khai
- [Azure API Management làm MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Mẫu xác thực doanh nghiệp  
- [Microsoft Entra ID với máy chủ MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Tích hợp nhà cung cấp danh tính  
- [Triển khai Lưu trữ Token An toàn](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Thực hành quản lý token tốt nhất  
- [Mã hóa Đầu-cuối cho AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Các mẫu mã hóa nâng cao

### Tài nguyên Bảo mật Nâng cao
- [Chu trình Phát triển Bảo mật Microsoft](https://www.microsoft.com/sdl) - Thực hành phát triển bảo mật  
- [Hướng dẫn Đội Đỏ AI](https://learn.microsoft.com/security/ai-red-team/) - Kiểm tra bảo mật đặc thù AI  
- [Mô hình Đe dọa cho Hệ thống AI](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Phương pháp mô hình đe dọa AI  
- [Kỹ thuật Bảo vệ Quyền riêng tư cho AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Kỹ thuật bảo vệ riêng tư AI

### Tuân thủ & Quản trị
- [Tuân thủ GDPR cho AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Tuân thủ quyền riêng tư trong hệ thống AI  
- [Khung Quản trị AI](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Triển khai AI có trách nhiệm  
- [SOC 2 cho Dịch vụ AI](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Kiểm soát bảo mật cho nhà cung cấp dịch vụ AI  
- [Tuân thủ HIPAA cho AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Yêu cầu tuân thủ AI trong y tế

### DevSecOps & Tự động hóa
- [Pipeline DevSecOps cho AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Pipeline phát triển AI an toàn  
- [Kiểm tra Bảo mật Tự động](https://learn.microsoft.com/security/engineering/devsecops) - Xác thực bảo mật liên tục  
- [Bảo mật Hạ tầng dưới dạng Mã](https://learn.microsoft.com/security/engineering/infrastructure-security) - Triển khai hạ tầng an toàn  
- [Bảo mật Container cho AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Bảo mật container tải AI

### Giám sát & Phản ứng Sự cố  
- [Azure Monitor cho Khối lượng công việc AI](https://learn.microsoft.com/azure/azure-monitor/overview) - Giải pháp giám sát toàn diện  
- [Phản ứng Sự cố Bảo mật AI](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Quy trình sự cố đặc thù AI  
- [SIEM cho Hệ thống AI](https://learn.microsoft.com/azure/sentinel/overview) - Quản lý thông tin và sự kiện bảo mật  
- [Tình báo Mối đe dọa AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Nguồn tình báo mối đe dọa AI

## 🔄 Cải tiến Liên tục

### Luôn Cập nhật với Tiêu chuẩn Biến đổi
- **Cập nhật Đặc tả MCP**: Theo dõi các thay đổi đặc tả MCP chính thức và khuyến cáo bảo mật  
- **Tình báo Mối đe dọa**: Đăng ký nhận các nguồn cấp thông tin về mối đe dọa bảo mật AI và cơ sở dữ liệu lỗ hổng  

- **Tham gia Cộng đồng**: Tham gia thảo luận cộng đồng bảo mật MCP và các nhóm công tác  
- **Đánh giá Định kỳ**: Tiến hành đánh giá tư thế bảo mật hàng quý và cập nhật các thực hành tương ứng  

### Đóng góp cho Bảo mật MCP  
- **Nghiên cứu Bảo mật**: Đóng góp vào nghiên cứu bảo mật MCP và các chương trình tiết lộ lỗ hổng  
- **Chia sẻ Thực tiễn Tốt nhất**: Chia sẻ các giải pháp bảo mật và bài học kinh nghiệm với cộng đồng  
- **Phát triển Tiêu chuẩn**: Tham gia vào phát triển đặc tả MCP và tạo lập tiêu chuẩn bảo mật  
- **Phát triển Công cụ**: Phát triển và chia sẻ các công cụ và thư viện bảo mật cho hệ sinh thái MCP  

---

*Tài liệu này phản ánh các thực hành bảo mật tốt nhất của MCP tính đến ngày 18 tháng 12 năm 2025, dựa trên Đặc tả MCP 2025-11-25. Các thực hành bảo mật nên được xem xét và cập nhật thường xuyên khi giao thức và bối cảnh mối đe dọa phát triển.*  

## Tiếp theo là gì  

- Đọc: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Quay lại: [Security Module Overview](./README.md)  
- Tiếp tục với: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ bản địa của nó nên được xem là nguồn tham khảo chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu nhầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->