# Các chủ đề nâng cao trong MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/vi/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Nhấn vào hình ảnh trên để xem video của bài học này)_

Chương này trình bày một loạt các chủ đề nâng cao trong việc triển khai Model Context Protocol (MCP), bao gồm tích hợp đa phương tiện, khả năng mở rộng, các thực hành bảo mật tốt nhất và tích hợp doanh nghiệp. Những chủ đề này rất quan trọng để xây dựng các ứng dụng MCP mạnh mẽ và sẵn sàng cho sản xuất, có thể đáp ứng nhu cầu của các hệ thống AI hiện đại.

## Tổng quan

Bài học này khám phá các khái niệm nâng cao trong triển khai Model Context Protocol, tập trung vào tích hợp đa phương tiện, khả năng mở rộng, các thực hành bảo mật tốt nhất và tích hợp doanh nghiệp. Những chủ đề này thiết yếu để xây dựng các ứng dụng MCP đạt chuẩn sản xuất có thể xử lý các yêu cầu phức tạp trong môi trường doanh nghiệp.

## Mục tiêu học tập

Sau khi kết thúc bài học này, bạn sẽ có thể:

- Triển khai khả năng đa phương tiện trong các framework MCP
- Thiết kế kiến trúc MCP có khả năng mở rộng cho các kịch bản yêu cầu cao
- Áp dụng các thực hành bảo mật tốt nhất phù hợp với các nguyên tắc bảo mật của MCP
- Tích hợp MCP với các hệ thống và framework AI doanh nghiệp
- Tối ưu hiệu suất và độ tin cậy trong môi trường sản xuất

## Các bài học và dự án mẫu

| Link | Tiêu đề | Mô tả |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Tích hợp với Azure | Học cách tích hợp MCP Server của bạn trên Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Mẫu đa phương tiện MCP  | Mẫu cho âm thanh, hình ảnh và phản hồi đa phương tiện |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Ứng dụng Spring Boot tối giản cho việc OAuth2 với MCP, cả như Authorization và Resource Server. Trình bày phát hành token bảo mật, điểm cuối được bảo vệ, triển khai trên Azure Container Apps và tích hợp quản lý API. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Ngữ cảnh gốc  | Tìm hiểu thêm về ngữ cảnh gốc và cách triển khai chúng |
| [5.5 Routing](./mcp-routing/README.md) | Điều hướng | Tìm hiểu các loại điều hướng khác nhau |
| [5.6 Sampling](./mcp-sampling/README.md) | Lấy mẫu | Học cách làm việc với lấy mẫu |
| [5.7 Scaling](./mcp-scaling/README.md) | Mở rộng  | Tìm hiểu về mở rộng |
| [5.8 Security](./mcp-security/README.md) | Bảo mật  | Bảo vệ MCP Server của bạn |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Tìm kiếm Web MCP | Server và client Python MCP tích hợp với SerpAPI cho tìm kiếm web, tin tức, sản phẩm và hỏi đáp theo thời gian thực. Minh họa điều phối đa công cụ, tích hợp API bên ngoài và xử lý lỗi mạnh mẽ. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Streaming dữ liệu thời gian thực đã trở nên thiết yếu trong thế giới dữ liệu ngày nay, nơi các doanh nghiệp và ứng dụng cần truy cập thông tin ngay lập tức để đưa ra quyết định kịp thời.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Tìm kiếm Web | Tìm kiếm web thời gian thực cách MCP biến đổi tìm kiếm web thời gian thực bằng cách cung cấp phương pháp chuẩn hóa quản lý ngữ cảnh trên các mô hình AI, công cụ tìm kiếm và ứng dụng.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Xác thực Entra ID | Microsoft Entra ID cung cấp giải pháp quản lý nhận dạng và truy cập dựa trên đám mây mạnh mẽ, giúp đảm bảo chỉ người dùng và ứng dụng được ủy quyền mới có thể tương tác với server MCP của bạn.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Tích hợp Microsoft Foundry | Học cách tích hợp các server Model Context Protocol với các agent Microsoft Foundry, cho phép điều phối công cụ mạnh mẽ và khả năng AI doanh nghiệp với các kết nối nguồn dữ liệu bên ngoài chuẩn hóa.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Kỹ thuật ngữ cảnh | Cơ hội tương lai của các kỹ thuật kỹ thuật ngữ cảnh cho các server MCP, bao gồm tối ưu hóa ngữ cảnh, quản lý ngữ cảnh động và chiến lược kỹ thuật prompt hiệu quả trong các framework MCP.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Vận chuyển tùy chỉnh | Học cách triển khai cơ chế vận chuyển tùy chỉnh cho các kịch bản giao tiếp MCP chuyên biệt.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Tính năng giao thức | Thành thạo các tính năng giao thức nâng cao bao gồm thông báo tiến độ, hủy yêu cầu, mẫu tài nguyên và mẫu xử lý lỗi.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Các tác nhân đối đầu | Sử dụng hai tác nhân với quan điểm đối lập, chia sẻ cùng một bộ công cụ MCP, để phát hiện ảo giác, đề xuất các trường hợp đặc biệt và tạo ra kết quả hiệu chỉnh tốt hơn thông qua tranh luận có cấu trúc.|

> **Mới trong MCP Specification 2025-11-25**: Đặc tả hiện đã bao gồm hỗ trợ thử nghiệm cho **Tasks** (các hoạt động chạy dài có theo dõi tiến trình), **Chú thích công cụ** (metadata về hành vi công cụ để đảm bảo an toàn), **URL Mode Elicitation** (yêu cầu nội dung URL cụ thể từ client), và mở rộng **Roots** (cho quản lý ngữ cảnh không gian làm việc). Xem [MCP Specification changelog](https://spec.modelcontextprotocol.io/) để biết chi tiết đầy đủ.

## Tham khảo thêm

Để có thông tin cập nhật nhất về các chủ đề MCP nâng cao, tham khảo:
- [Tài liệu MCP](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Kho GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Rủi ro bảo mật và cách giảm thiểu
- [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo bảo mật thực hành

## Các điểm chính rút ra

- Triển khai MCP đa phương tiện mở rộng khả năng AI vượt ra ngoài xử lý văn bản
- Khả năng mở rộng cần thiết cho triển khai doanh nghiệp và có thể đạt được qua mở rộng ngang và dọc
- Các biện pháp bảo mật toàn diện bảo vệ dữ liệu và đảm bảo kiểm soát truy cập đúng đắn
- Tích hợp doanh nghiệp với các nền tảng như Azure OpenAI và Microsoft AI Foundry nâng cao khả năng MCP
- Triển khai MCP nâng cao hưởng lợi từ kiến trúc tối ưu và quản lý tài nguyên cẩn thận

## Bài tập

Thiết kế một triển khai MCP chuẩn doanh nghiệp cho một trường hợp sử dụng cụ thể:

1. Xác định yêu cầu đa phương tiện cho trường hợp sử dụng của bạn
2. Phác thảo các kiểm soát bảo mật cần thiết để bảo vệ dữ liệu nhạy cảm
3. Thiết kế kiến trúc có khả năng mở rộng để xử lý tải thay đổi
4. Lập kế hoạch các điểm tích hợp với hệ thống AI doanh nghiệp
5. Ghi lại các điểm nghẽn hiệu suất tiềm năng và chiến lược giảm thiểu

## Tài nguyên bổ sung

- [Tài liệu Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Tài liệu Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Tiếp theo

Khám phá các bài học trong mô-đun này bắt đầu với: [5.1 MCP Integration](./mcp-integration/README.md)

Khi hoàn thành mô-đun này, tiếp tục đến: [Module 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->