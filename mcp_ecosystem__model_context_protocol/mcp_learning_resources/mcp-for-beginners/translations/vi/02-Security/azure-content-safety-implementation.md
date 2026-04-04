# Triển khai Azure Content Safety với MCP

> **Rủi ro OWASP MCP đã giải quyết**: [MCP06 - Chèn lệnh qua payload có ngữ cảnh](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Để tăng cường bảo mật MCP chống lại chèn lệnh, đầu độc công cụ và các lỗ hổng đặc thù AI khác, việc tích hợp Azure Content Safety được khuyến nghị rất nhiều. Hướng dẫn triển khai này phù hợp với [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) Trại 3: An ninh I/O.

## Tích hợp với MCP Server

Để tích hợp Azure Content Safety với máy chủ MCP của bạn, thêm bộ lọc an toàn nội dung như middleware trong luồng xử lý yêu cầu:

1. Khởi tạo bộ lọc trong quá trình khởi động máy chủ  
2. Xác thực tất cả các yêu cầu công cụ đến trước khi xử lý  
3. Kiểm tra tất cả phản hồi gửi ra trước khi trả về cho khách hàng  
4. Ghi nhật ký và cảnh báo khi có vi phạm an toàn  
5. Triển khai xử lý lỗi phù hợp khi kiểm tra an toàn nội dung thất bại  

Điều này cung cấp sự phòng thủ vững chắc chống lại:  
- Tấn công chèn lệnh prompt  
- Cố gắng đầu độc công cụ  
- Rò rỉ dữ liệu qua đầu vào độc hại  
- Tạo ra nội dung có hại  

## Các thực hành tốt nhất cho tích hợp Azure Content Safety

1. **Danh sách chặn tùy chỉnh**: Tạo danh sách chặn tùy chỉnh riêng biệt cho các mẫu chèn MCP  
2. **Điều chỉnh mức nghiêm trọng**: Chỉnh ngưỡng mức độ nghiêm trọng dựa trên trường hợp sử dụng và mức chịu rủi ro của bạn  
3. **Phủ sóng toàn diện**: Áp dụng kiểm tra an toàn nội dung cho tất cả đầu vào và đầu ra  
4. **Tối ưu hiệu suất**: Cân nhắc triển khai bộ nhớ đệm cho các lần kiểm tra an toàn nội dung lặp lại  
5. **Cơ chế dự phòng**: Định nghĩa hành vi dự phòng rõ ràng khi dịch vụ an toàn nội dung không khả dụng  
6. **Phản hồi người dùng**: Cung cấp phản hồi rõ ràng cho người dùng khi nội dung bị chặn do vấn đề an toàn  
7. **Cải tiến liên tục**: Thường xuyên cập nhật danh sách chặn và các mẫu dựa trên các mối đe dọa mới nổi  

## Tài nguyên bổ sung

### Hướng dẫn bảo mật OWASP MCP
- [Hướng dẫn bảo mật OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Bộ OWASP MCP Top 10 toàn diện với triển khai Azure  
- [MCP06 - Chèn lệnh prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Các mẫu giảm thiểu chi tiết cho chèn lệnh prompt  
- [Hội thảo MCP Security Summit](https://azure-samples.github.io/sherpa/) - Trại 3 thực hành: An ninh I/O bao gồm an toàn nội dung  

### Tài liệu Azure
- [Tổng quan Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Tài liệu Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Bắt đầu nhanh Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Tiếp theo

- Trở lại: [Tổng quan Module Bảo mật](./README.md)  
- Tiếp tục: [Module 3: Bắt đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc sự không chính xác. Tài liệu gốc bằng ngôn ngữ nguyên bản nên được coi là nguồn có thẩm quyền. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm đối với bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->