# Chủ đề nâng cao trong MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/vi/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Nhấp vào hình trên để xem video bài học này)_

Chương này bao gồm một loạt các chủ đề nâng cao trong việc triển khai Giao thức Ngữ cảnh Mô hình (Model Context Protocol - MCP), bao gồm tích hợp đa phương thức, khả năng mở rộng, các thực hành bảo mật tốt nhất và tích hợp doanh nghiệp. Những chủ đề này rất quan trọng để xây dựng các ứng dụng MCP vững chắc, sẵn sàng sản xuất và có thể đáp ứng yêu cầu của các hệ thống AI hiện đại.

## Tổng quan

Bài học này khám phá các khái niệm nâng cao trong việc triển khai Giao thức Ngữ cảnh Mô hình, tập trung vào tích hợp đa phương thức, khả năng mở rộng, các thực hành bảo mật tốt nhất và tích hợp doanh nghiệp. Những chủ đề này thiết yếu để xây dựng các ứng dụng MCP đạt chuẩn sản xuất có thể xử lý các yêu cầu phức tạp trong môi trường doanh nghiệp.

> **Nhìn về phía trước:** một số chủ đề dưới đây bị ảnh hưởng bởi ứng viên phát hành đặc tả MCP ngày `2026-07-28` — Root Contexts (5.4) và Sampling (5.6) xây dựng dựa trên các nguyên thủy mà ứng viên phát hành đánh dấu là không còn dùng nữa, và tính năng thử nghiệm Tasks được đề cập trong Protocol Features (5.16) sẽ được chuyển sang tiện ích mở rộng Tasks riêng biệt. Tham khảo [Có gì thay đổi trong MCP: Ứng viên phát hành ngày 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) để biết chi tiết.

## Mục tiêu học tập

Sau bài học này, bạn sẽ có thể:

- Triển khai các khả năng đa phương thức trong khung MCP
- Thiết kế kiến trúc MCP có khả năng mở rộng cao cho các kịch bản nhu cầu lớn
- Áp dụng các thực hành bảo mật tốt nhất phù hợp với nguyên tắc bảo mật của MCP
- Tích hợp MCP với các hệ thống và khung AI doanh nghiệp
- Tối ưu hóa hiệu suất và độ tin cậy trong môi trường sản xuất

## Các bài học và dự án mẫu

| Liên kết | Tiêu đề | Mô tả |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Tích hợp với Azure | Tìm hiểu cách tích hợp MCP Server của bạn trên Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Mẫu MCP đa phương thức | Mẫu cho âm thanh, hình ảnh và phản hồi đa phương thức |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Ứng dụng Spring Boot tối giản cho thấy OAuth2 với MCP, vừa là Authorization vừa là Resource Server. Minh họa phát hành token bảo mật, các điểm cuối được bảo vệ, triển khai Azure Container Apps, và tích hợp API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Ngữ cảnh gốc | Tìm hiểu thêm về ngữ cảnh gốc và cách triển khai chúng |
| [5.5 Routing](./mcp-routing/README.md) | Điều hướng | Tìm hiểu các loại điều hướng khác nhau |
| [5.6 Sampling](./mcp-sampling/README.md) | Lấy mẫu | Tìm hiểu cách làm việc với lấy mẫu |
| [5.7 Scaling](./mcp-scaling/README.md) | Mở rộng | Tìm hiểu về mở rộng |
| [5.8 Security](./mcp-security/README.md) | Bảo mật | Bảo vệ MCP Server của bạn |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Tìm kiếm Web MCP | MCP server và client Python tích hợp với SerpAPI cho tìm kiếm web, tin tức, sản phẩm và hỏi đáp theo thời gian thực. Minh họa phối hợp đa công cụ, tích hợp API bên ngoài, và xử lý lỗi mạnh mẽ. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Truyền phát | Truyền dữ liệu thời gian thực đã trở nên thiết yếu trong thế giới dữ liệu ngày nay, khi các doanh nghiệp và ứng dụng cần truy cập thông tin ngay lập tức để đưa ra quyết định kịp thời. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Tìm kiếm Web | Tìm kiếm web thời gian thực: MCP thay đổi cách tìm kiếm web thời gian thực bằng cách cung cấp phương pháp chuẩn hóa quản lý ngữ cảnh giữa các mô hình AI, công cụ tìm kiếm và ứng dụng. | 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Xác thực Entra ID | Microsoft Entra ID cung cấp giải pháp quản lý danh tính và truy cập dựa trên đám mây mạnh mẽ, giúp đảm bảo chỉ người dùng và ứng dụng được ủy quyền mới có thể tương tác với MCP server của bạn. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Tích hợp Microsoft Foundry | Tìm hiểu cách tích hợp MCP server với các agent Microsoft Foundry, cho phép phối hợp công cụ mạnh mẽ và khả năng AI doanh nghiệp với kết nối nguồn dữ liệu bên ngoài tiêu chuẩn. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Kỹ thuật Ngữ cảnh | Cơ hội tương lai của kỹ thuật ngữ cảnh cho MCP server, bao gồm tối ưu hóa ngữ cảnh, quản lý ngữ cảnh động, và các chiến lược kỹ thuật prompt hiệu quả trong khung MCP. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Giao thức Tùy chỉnh | Tìm hiểu cách triển khai cơ chế giao thức tùy chỉnh cho các kịch bản giao tiếp MCP chuyên biệt. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Tính năng Giao thức | Thành thạo các tính năng giao thức nâng cao bao gồm thông báo tiến trình, hủy yêu cầu, mẫu tài nguyên, và các mẫu xử lý lỗi. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Tác nhân Đối kháng | Sử dụng hai tác nhân với quan điểm đối lập, chia sẻ một bộ công cụ MCP, để phát hiện ảo giác, bộc lộ các trường hợp biên, và tạo ra kết quả được hiệu chỉnh tốt hơn thông qua tranh luận có cấu trúc. |

> **Mới trong Đặc tả MCP 2025-11-25**: Đặc tả hiện bao gồm hỗ trợ thử nghiệm cho **Tasks** (các hoạt động chạy dài với theo dõi tiến trình), **Chú thích Công cụ** (metadata về hành vi công cụ nhằm đảm bảo an toàn), **URL Mode Elicitation** (yêu cầu nội dung URL cụ thể từ phía client), và cải tiến **Roots** (quản lý ngữ cảnh không gian làm việc). Xem [nhật ký thay đổi đặc tả MCP](https://spec.modelcontextprotocol.io/) để biết đầy đủ chi tiết.

## Tài liệu tham khảo bổ sung

Để có thông tin cập nhật nhất về các chủ đề nâng cao MCP, tham khảo:
- [Tài liệu MCP](https://modelcontextprotocol.io/)
- [Đặc tả MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Kho mã nguồn GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Các rủi ro bảo mật và biện pháp giảm thiểu
- [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo thực hành về bảo mật

## Những điểm chính rút ra

- Triển khai MCP đa phương thức mở rộng khả năng AI vượt ngoài xử lý văn bản
- Khả năng mở rộng rất quan trọng cho triển khai doanh nghiệp và có thể thực hiện qua mở rộng ngang và dọc
- Các biện pháp bảo mật toàn diện bảo vệ dữ liệu và đảm bảo kiểm soát truy cập đúng mức
- Tích hợp doanh nghiệp với các nền tảng như Azure OpenAI và Microsoft AI Foundry nâng cao khả năng MCP
- Triển khai MCP nâng cao được hưởng lợi từ kiến trúc tối ưu và quản lý tài nguyên cẩn thận

## Bài tập

Thiết kế một triển khai MCP cấp doanh nghiệp cho một trường hợp sử dụng cụ thể:

1. Xác định các yêu cầu đa phương thức cho trường hợp sử dụng của bạn
2. Phác thảo các kiểm soát bảo mật cần thiết để bảo vệ dữ liệu nhạy cảm
3. Thiết kế kiến trúc có khả năng mở rộng có thể xử lý tải trọng thay đổi
4. Lập kế hoạch các điểm tích hợp với các hệ thống AI doanh nghiệp
5. Tài liệu hóa các nút thắt hiệu suất tiềm tàng và các chiến lược giảm thiểu

## Tài nguyên bổ sung

- [Tài liệu Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Tài liệu Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Tiếp theo

Khám phá các bài học trong module này bắt đầu với: [5.1 Tích hợp MCP](./mcp-integration/README.md)

Khi bạn đã hoàn thành module này, tiếp tục với: [Module 6: Đóng góp Cộng đồng](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->