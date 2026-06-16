# Triển khai Azure Content Safety với MCP

> **Rủi ro OWASP MCP được giải quyết**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Để tăng cường bảo mật MCP chống lại tấn công tiêm nhắc lệnh, đầu độc công cụ và các lỗ hổng đặc thù AI khác, việc tích hợp Azure Content Safety được khuyến nghị mạnh mẽ. Hướng dẫn triển khai này phù hợp với [Hội nghị Thượng đỉnh Bảo mật MCP (Sherpa)](https://azure-samples.github.io/sherpa/) Trại 3: Bảo mật I/O.

## Tích hợp với MCP Server

Để tích hợp Azure Content Safety với máy chủ MCP của bạn, thêm bộ lọc content safety như middleware trong pipeline xử lý yêu cầu:

1. Khởi tạo bộ lọc khi khởi động máy chủ  
2. Xác thực tất cả các yêu cầu công cụ đến trước khi xử lý  
3. Kiểm tra tất cả các phản hồi trước khi trả về cho khách hàng  
4. Ghi lại và cảnh báo các vi phạm an toàn  
5. Thực thi xử lý lỗi phù hợp cho các kiểm tra content safety không thành công  

Điều này cung cấp phòng thủ vững chắc chống lại:  
- Tấn công tiêm nhắc lệnh  
- Nỗ lực đầu độc công cụ  
- Rò rỉ dữ liệu qua đầu vào độc hại  
- Tạo ra nội dung có hại  

## Thực hành tốt nhất để tích hợp Azure Content Safety

1. **Danh sách chặn tùy chỉnh**: Tạo danh sách chặn tùy chỉnh cụ thể cho các mẫu tiêm MCP  
2. **Điều chỉnh mức độ nghiêm trọng**: Điều chỉnh ngưỡng mức độ nghiêm trọng dựa trên trường hợp sử dụng và mức độ chấp nhận rủi ro của bạn  
3. **Phủ sóng toàn diện**: Áp dụng các kiểm tra content safety cho tất cả đầu vào và đầu ra  
4. **Tối ưu hiệu năng**: Cân nhắc triển khai bộ nhớ đệm cho các kiểm tra content safety lặp lại  
5. **Cơ chế dự phòng**: Định nghĩa rõ hành vi dự phòng khi dịch vụ content safety không khả dụng  
6. **Phản hồi người dùng**: Cung cấp phản hồi rõ ràng cho người dùng khi nội dung bị chặn do lo ngại về an toàn  
7. **Cải tiến liên tục**: Thường xuyên cập nhật danh sách chặn và mẫu dựa trên các mối đe dọa mới nổi  

## Tài nguyên bổ sung

### Hướng dẫn bảo mật OWASP MCP
- [Hướng dẫn bảo mật OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Bộ OWASP MCP Top 10 toàn diện với triển khai Azure  
- [MCP06 - Tiêm nhắc lệnh](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Mẫu giảm thiểu tiêm nhắc lệnh chi tiết  
- [Hội nghị Bảo mật MCP](https://azure-samples.github.io/sherpa/) - Trại thực hành Trại 3: Bảo mật I/O bao gồm content safety  

### Tài liệu của Azure
- [Tổng quan Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Tài liệu Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Bắt đầu nhanh Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Tiếp theo

- Quay lại: [Tổng quan mô-đun bảo mật](./README.md)  
- Tiếp tục tới: [Mô-đun 3: Bắt đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->