# Bảo mật MCP nâng cao với Azure Content Safety

> **Rủi ro MCP do OWASP đề cập**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety cung cấp nhiều công cụ mạnh mẽ có thể tăng cường bảo mật cho các triển khai MCP của bạn. Để có trải nghiệm triển khai thực tế, xem [Hội thảo An ninh MCP (Sherpa)](https://azure-samples.github.io/sherpa/) Trại 3: An ninh I/O.

## Prompt Shields

AI Prompt Shields của Microsoft cung cấp sự bảo vệ vững chắc chống lại các cuộc tấn công tiêm lệnh trực tiếp và gián tiếp thông qua:

1. **Phát hiện nâng cao**: Sử dụng học máy để xác định các hướng dẫn độc hại được nhúng trong nội dung.
2. **Spotlighting**: Chuyển đổi văn bản nhập vào để giúp các hệ thống AI phân biệt giữa các hướng dẫn hợp lệ và các đầu vào bên ngoài.
3. **Bộ phân cách và Đánh dấu dữ liệu**: Đánh dấu ranh giới giữa dữ liệu tin cậy và không tin cậy.
4. **Tích hợp Content Safety**: Hoạt động với Azure AI Content Safety để phát hiện các cố gắng jailbreak và nội dung tổn hại.
5. **Cập nhật liên tục**: Microsoft thường xuyên cập nhật các cơ chế bảo vệ trước các mối đe dọa mới nổi.

## Triển khai Azure Content Safety với MCP

Phương pháp này cung cấp bảo vệ đa lớp:
- Quét đầu vào trước khi xử lý
- Xác thực đầu ra trước khi trả về
- Sử dụng danh sách chặn cho các mẫu độc hại đã biết
- Tận dụng các mô hình content safety của Azure luôn được cập nhật

## Tài nguyên Azure Content Safety

Để tìm hiểu thêm về triển khai Azure Content Safety với các máy chủ MCP của bạn, hãy tham khảo các tài nguyên chính thức này:

1. [Tài liệu Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Tài liệu chính thức cho Azure Content Safety.
2. [Tài liệu Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Tìm hiểu cách ngăn chặn các cuộc tấn công tiêm lệnh (prompt injection).
3. [Tài liệu tham khảo API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Tham khảo API chi tiết để triển khai Content Safety.
4. [Bắt đầu nhanh: Azure Content Safety với C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Hướng dẫn triển khai nhanh sử dụng C#.
5. [Thư viện khách Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Thư viện khách cho nhiều ngôn ngữ lập trình.
6. [Phát hiện cố gắng jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Hướng dẫn cụ thể để phát hiện và ngăn chặn các cố gắng jailbreak.
7. [Thực hành tốt nhất cho Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Thực hành tốt nhất để triển khai content safety hiệu quả.

Để triển khai chi tiết hơn, xem hướng dẫn [Triển khai Azure Content Safety](./azure-content-safety-implementation.md) của chúng tôi.

## Tiếp theo

- Đọc: [Triển khai Azure Content Safety](./azure-content-safety-implementation.md)
- Quay lại: [Tổng quan Module Bảo mật](./README.md)
- Tiếp tục: [Module 3: Bắt đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->