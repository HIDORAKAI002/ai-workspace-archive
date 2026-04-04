# Bảo mật MCP nâng cao với Azure Content Safety

> **Rủi ro MCP OWASP được giải quyết**: [MCP06 - Chèn lệnh qua tải trọng ngữ cảnh](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety cung cấp nhiều công cụ mạnh mẽ có thể tăng cường bảo mật cho các triển khai MCP của bạn. Để có trải nghiệm triển khai thực hành, xem [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Bảo mật I/O.

## Tấm khiên Prompt

Tấm khiên Prompt AI của Microsoft cung cấp khả năng bảo vệ mạnh mẽ chống lại các cuộc tấn công chèn lệnh trực tiếp và gián tiếp thông qua:

1. **Phát hiện nâng cao**: Sử dụng máy học để xác định các chỉ dẫn độc hại được nhúng trong nội dung.
2. **Chiếu sáng**: Biến đổi văn bản đầu vào giúp các hệ thống AI phân biệt giữa chỉ dẫn hợp lệ và đầu vào bên ngoài.
3. **Dấu phân cách và đánh dấu dữ liệu**: Đánh dấu ranh giới giữa dữ liệu tin cậy và dữ liệu không tin cậy.
4. **Tích hợp Content Safety**: Làm việc với Azure AI Content Safety để phát hiện các nỗ lực jailbreak và nội dung có hại.
5. **Cập nhật liên tục**: Microsoft thường xuyên cập nhật các cơ chế bảo vệ để chống lại các mối đe dọa mới nổi.

## Triển khai Azure Content Safety với MCP

Cách tiếp cận này cung cấp bảo vệ nhiều lớp:
- Quét đầu vào trước khi xử lý
- Xác thực đầu ra trước khi trả về
- Sử dụng danh sách chặn các mẫu đã biết gây hại
- Tận dụng các mô hình an toàn nội dung được Azure cập nhật liên tục

## Tài nguyên Azure Content Safety

Để tìm hiểu thêm về việc triển khai Azure Content Safety với máy chủ MCP của bạn, hãy tham khảo các tài nguyên chính thức sau:

1. [Tài liệu Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Tài liệu chính thức cho Azure Content Safety.
2. [Tài liệu Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Tìm hiểu cách ngăn chặn các cuộc tấn công chèn lệnh.
3. [Tham chiếu API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Tham chiếu API chi tiết để triển khai Content Safety.
4. [Bắt đầu nhanh: Azure Content Safety với C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Hướng dẫn triển khai nhanh sử dụng C#.
5. [Thư viện khách hàng Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Thư viện khách hàng cho nhiều ngôn ngữ lập trình.
6. [Phát hiện nỗ lực jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Hướng dẫn cụ thể về phát hiện và ngăn chặn nỗ lực jailbreak.
7. [Thực hành tốt nhất cho Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Các thực hành tốt nhất để triển khai bảo vệ nội dung hiệu quả.

Để triển khai chi tiết hơn, xem hướng dẫn [Triển khai Azure Content Safety](./azure-content-safety-implementation.md).

## Tiếp theo

- Đọc: [Triển khai Azure Content Safety](./azure-content-safety-implementation.md)
- Quay lại: [Tổng quan mô-đun Bảo mật](./README.md)
- Tiếp tục tới: [Mô-đun 3: Bắt đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được xem là nguồn thông tin chính thức. Đối với thông tin quan trọng, khuyến nghị nên sử dụng bản dịch do người dịch chuyên nghiệp thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hay giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->