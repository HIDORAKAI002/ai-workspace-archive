# Các Chủ Đề Nâng Cao trong MCP

[![MCP Nâng Cao: Các Tác Nhân AI An Toàn, Có Khả Năng Mở Rộng và Đa Modal](../../../translated_images/vi/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Nhấn vào hình trên để xem video bài học này)_

Chương này bao gồm một chuỗi các chủ đề nâng cao trong việc triển khai Giao Thức Ngữ Cảnh Mẫu (MCP), bao gồm tích hợp đa modal, khả năng mở rộng, các thực hành tốt nhất về bảo mật và tích hợp doanh nghiệp. Những chủ đề này rất quan trọng để xây dựng các ứng dụng MCP mạnh mẽ và sẵn sàng đưa vào sản xuất, đáp ứng nhu cầu của các hệ thống AI hiện đại.

## Tổng Quan

Bài học này khám phá các khái niệm nâng cao trong việc triển khai Giao Thức Ngữ Cảnh Mẫu, tập trung vào tích hợp đa modal, khả năng mở rộng, các thực hành tốt nhất về bảo mật và tích hợp doanh nghiệp. Những chủ đề này thiết yếu để xây dựng các ứng dụng MCP chuẩn sản xuất có thể xử lý các yêu cầu phức tạp trong môi trường doanh nghiệp.

> **Nhìn về phía trước:** một số chủ đề dưới đây chịu ảnh hưởng từ phiên bản thử nghiệm đặc tả MCP `2026-07-28` — Ngữ Cảnh Gốc (5.4) và Lấy Mẫu (5.6) xây dựng trên các nguyên thủy mà phiên bản thử nghiệm đánh dấu là lỗi thời, và tính năng Thử Nghiệm Nhiệm Vụ trong Tính Năng Giao Thức (5.16) chuyển sang một tiện ích mở rộng Nhiệm Vụ riêng biệt. Xem [Những Thay Đổi Trong MCP: Phiên Bản Thử Nghiệm 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) để biết thêm chi tiết.

## Mục Tiêu Học Tập

Đến cuối bài học này, bạn sẽ có thể:

- Triển khai khả năng đa modal trong các khung MCP
- Thiết kế kiến trúc MCP có khả năng mở rộng cho các tình huống yêu cầu cao
- Áp dụng các thực hành bảo mật tốt nhất phù hợp với các nguyên tắc bảo mật của MCP
- Tích hợp MCP với các hệ thống và khung AI doanh nghiệp
- Tối ưu hóa hiệu suất và độ tin cậy trong môi trường sản xuất

## Bài học và Dự án mẫu

| Liên Kết | Tiêu Đề | Mô Tả |
|------|-------|-------------|
| [5.1 Tích hợp với Azure](./mcp-integration/README.md) | Tích hợp với Azure | Tìm hiểu cách tích hợp Máy chủ MCP của bạn trên Azure |
| [5.2 Mẫu đa modal](./mcp-multi-modality/README.md) | Mẫu đa modal MCP  | Mẫu cho âm thanh, hình ảnh và phản hồi đa modal |
| [5.3 Mẫu MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Ứng dụng Spring Boot tối giản hiện diện OAuth2 với MCP, vừa làm Máy chủ ủy quyền vừa làm Máy chủ tài nguyên. Minh họa việc phát hành token an toàn, các điểm cuối được bảo vệ, triển khai Azure Container Apps, và tích hợp Quản lý API. |
| [5.4 Ngữ Cảnh Gốc](./mcp-root-contexts/README.md) | Ngữ cảnh gốc  | Tìm hiểu thêm về ngữ cảnh gốc và cách triển khai chúng (bị lỗi thời trong phiên bản thử nghiệm `2026-07-28`; vẫn hợp lệ cho `2025-11-25`) |
| [5.5 Định tuyến](./mcp-routing/README.md) | Định tuyến | Tìm hiểu các loại định tuyến khác nhau |
| [5.6 Lấy mẫu](./mcp-sampling/README.md) | Lấy mẫu | Tìm hiểu cách làm việc với lấy mẫu (bị lỗi thời trong phiên bản thử nghiệm `2026-07-28`; vẫn hợp lệ cho `2025-11-25`) |
| [5.7 Khả năng mở rộng](./mcp-scaling/README.md) | Khả năng mở rộng  | Tìm hiểu về khả năng mở rộng |
| [5.8 Bảo mật](./mcp-security/README.md) | Bảo mật  | Bảo vệ Máy chủ MCP của bạn |
| [5.9 Mẫu Tìm kiếm Web](./web-search-mcp/README.md) | Tìm kiếm Web MCP | Máy chủ và khách MCP Python tích hợp với SerpAPI để tìm kiếm web, tin tức, sản phẩm và hỏi đáp theo thời gian thực. Minh họa phối hợp đa công cụ, tích hợp API ngoài, và xử lý lỗi mạnh mẽ. |
| [5.10 Phát trực tiếp theo thời gian thực](./mcp-realtimestreaming/README.md) | Phát trực tiếp  | Phát trực tiếp dữ liệu theo thời gian thực đã trở nên thiết yếu trong thế giới dữ liệu ngày nay, nơi các doanh nghiệp và ứng dụng cần truy cập thông tin ngay lập tức để đưa ra quyết định kịp thời.|
| [5.11 Tìm kiếm Web theo thời gian thực](./mcp-realtimesearch/README.md) | Tìm kiếm Web | Tìm kiếm web theo thời gian thực - MCP chuyển đổi tìm kiếm web theo thời gian thực bằng cách cung cấp một phương pháp chuẩn hóa quản lý ngữ cảnh trên các mô hình AI, máy tìm kiếm, và ứng dụng.| 
| [5.12 Xác thực Entra ID cho Máy chủ Model Context Protocol](./mcp-security-entra/README.md) | Xác thực Entra ID | Microsoft Entra ID cung cấp giải pháp quản lý danh tính và truy cập dựa trên đám mây mạnh mẽ, giúp đảm bảo chỉ những người dùng và ứng dụng được ủy quyền mới có thể tương tác với máy chủ MCP của bạn.|
| [5.13 Tích hợp tác nhân Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Tích hợp Microsoft Foundry | Tìm hiểu cách tích hợp máy chủ Giao Thức Ngữ Cảnh Mẫu với các tác nhân Microsoft Foundry, cho phép phối hợp công cụ mạnh mẽ và khả năng AI doanh nghiệp với các kết nối nguồn dữ liệu ngoài được chuẩn hóa.|
| [5.14 Kỹ thuật Ngữ Cảnh](./mcp-contextengineering/README.md) | Kỹ thuật Ngữ Cảnh | Cơ hội tương lai của các kỹ thuật kỹ thuật ngữ cảnh cho máy chủ MCP, bao gồm tối ưu ngữ cảnh, quản lý ngữ cảnh động, và chiến lược kỹ thuật lời nhắc hiệu quả trong khung MCP.|
| [5.15 Giao Thông Tuỳ Chỉnh MCP](./mcp-transport/README.md) | Giao Thông Tuỳ Chỉnh | Tìm hiểu cách triển khai các cơ chế giao thông tuỳ chỉnh cho các tình huống giao tiếp MCP chuyên biệt.|
| [5.16 Tìm Hiểu Sâu Về Tính Năng Giao Thức](./mcp-protocol-features/README.md) | Tính Năng Giao Thức | Thành thạo các tính năng giao thức nâng cao bao gồm thông báo tiến độ, hủy yêu cầu, mẫu tài nguyên và các mẫu xử lý lỗi.|
| [5.17 Lập Luận Đối Kháng Đa Tác Nhân](./mcp-adversarial-agents/README.md) | Tác Nhân Đối Kháng | Sử dụng hai tác nhân có vị trí đối nghịch, chia sẻ một bộ công cụ MCP duy nhất, để bắt các ảo giác, làm nổi bật các trường hợp biên, và tạo ra kết quả hiệu chỉnh tốt hơn thông qua tranh luận có cấu trúc.|

> **Mới trong Đặc Tả MCP 2025-11-25**: Đặc tả hiện bao gồm hỗ trợ thử nghiệm cho **Nhiệm Vụ** (các hoạt động chạy dài có theo dõi tiến độ), **Chú Thích Công Cụ** (siêu dữ liệu về hành vi công cụ cho an toàn), **Khơi Gợi Chế Độ URL** (yêu cầu nội dung URL cụ thể từ khách hàng), và cải tiến **Roots** (cho quản lý ngữ cảnh không gian làm việc). Xem [nhật ký thay đổi Đặc Tả MCP](https://spec.modelcontextprotocol.io/) để biết đầy đủ chi tiết.

## Tài Liệu Tham Khảo Bổ Sung

Để có thông tin cập nhật nhất về các chủ đề nâng cao MCP, tham khảo:
- [Tài liệu MCP](https://modelcontextprotocol.io/)
- [Đặc Tả MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Kho GitHub](https://github.com/modelcontextprotocol)
- [Danh Mục Top 10 MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Rủi ro bảo mật và các biện pháp phòng ngừa
- [Hội Thảo Bảo Mật MCP Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo bảo mật thực hành

## Những Điểm Chính Cần Nhớ

- Các triển khai MCP đa modal mở rộng khả năng AI vượt ra ngoài xử lý văn bản
- Khả năng mở rộng là thiết yếu cho triển khai doanh nghiệp và có thể được giải quyết qua mở rộng ngang và dọc
- Các biện pháp bảo mật toàn diện bảo vệ dữ liệu và đảm bảo kiểm soát truy cập đúng cách
- Tích hợp doanh nghiệp với các nền tảng như Azure OpenAI và Microsoft AI Foundry nâng cao khả năng MCP
- Các triển khai MCP nâng cao được hưởng lợi từ kiến trúc tối ưu và quản lý tài nguyên cẩn thận

## Bài Tập

Thiết kế một triển khai MCP chuẩn doanh nghiệp cho một trường hợp sử dụng cụ thể:

1. Xác định các yêu cầu đa modal cho trường hợp sử dụng của bạn
2. Phác thảo các kiểm soát bảo mật cần thiết để bảo vệ dữ liệu nhạy cảm
3. Thiết kế kiến trúc có khả năng mở rộng để xử lý tải thay đổi
4. Lên kế hoạch điểm tích hợp với các hệ thống AI doanh nghiệp
5. Tài liệu các điểm nghẽn hiệu suất tiềm năng và chiến lược khắc phục

## Tài Nguyên Bổ Sung

- [Tài liệu Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Tài liệu Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Tiếp Theo

Khám phá các bài học trong mô-đun này bắt đầu với: [5.1 Tích hợp MCP](./mcp-integration/README.md)

Sau khi hoàn thành mô-đun này, tiếp tục với: [Mô-đun 6: Đóng Góp Cộng Đồng](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->