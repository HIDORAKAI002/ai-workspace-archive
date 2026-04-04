# Case Study: Azure AI Travel Agents – Triển khai Tham khảo

## Tổng quan

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) là một giải pháp tham khảo toàn diện do Microsoft phát triển, minh họa cách xây dựng một ứng dụng lập kế hoạch du lịch đa tác nhân, được hỗ trợ bởi AI sử dụng Model Context Protocol (MCP), Azure OpenAI và Azure AI Search. Dự án này trình bày các thực hành tốt nhất trong việc điều phối nhiều tác nhân AI, tích hợp dữ liệu doanh nghiệp, và cung cấp một nền tảng an toàn, có thể mở rộng cho các kịch bản thực tế.

## Các tính năng chính
- **Điều phối đa tác nhân:** Sử dụng MCP để phối hợp các tác nhân chuyên biệt (ví dụ: tác nhân chuyến bay, khách sạn và hành trình) hợp tác để thực hiện các tác vụ lập kế hoạch du lịch phức tạp.
- **Tích hợp dữ liệu doanh nghiệp:** Kết nối với Azure AI Search và các nguồn dữ liệu doanh nghiệp khác để cung cấp thông tin cập nhật và liên quan cho các đề xuất du lịch.
- **Kiến trúc an toàn, có thể mở rộng:** Tận dụng các dịch vụ Azure cho xác thực, ủy quyền và triển khai có thể mở rộng, theo các thực hành bảo mật doanh nghiệp tốt nhất.
- **Công cụ mở rộng:** Triển khai các công cụ MCP và mẫu yêu cầu có thể tái sử dụng, cho phép thích ứng nhanh với các lĩnh vực hoặc yêu cầu kinh doanh mới.
- **Trải nghiệm người dùng:** Cung cấp giao diện hội thoại cho người dùng tương tác với các tác nhân du lịch, được hỗ trợ bởi Azure OpenAI và MCP.

## Kiến trúc
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Mô tả Sơ đồ Kiến trúc

Giải pháp Azure AI Travel Agents được thiết kế theo mô-đun, có thể mở rộng và tích hợp an toàn nhiều tác nhân AI cùng nguồn dữ liệu doanh nghiệp. Các thành phần chính và luồng dữ liệu như sau:

- **Giao diện Người dùng:** Người dùng tương tác với hệ thống thông qua giao diện hội thoại (như chat web hoặc bot Teams), gửi các truy vấn và nhận đề xuất du lịch.
- **Máy chủ MCP:** Đóng vai trò điều phối trung tâm, nhận đầu vào từ người dùng, quản lý ngữ cảnh và phối hợp các hành động của các tác nhân chuyên biệt (ví dụ FlightAgent, HotelAgent, ItineraryAgent) qua Model Context Protocol.
- **Các tác nhân AI:** Mỗi tác nhân chịu trách nhiệm một lĩnh vực cụ thể (chuyến bay, khách sạn, hành trình) và được triển khai như một công cụ MCP. Các tác nhân sử dụng mẫu yêu cầu và logic để xử lý yêu cầu và tạo phản hồi.
- **Dịch vụ Azure OpenAI:** Cung cấp khả năng hiểu và tạo ngôn ngữ tự nhiên nâng cao, cho phép các tác nhân giải thích ý định người dùng và tạo phản hồi hội thoại.
- **Azure AI Search & Dữ liệu Doanh nghiệp:** Các tác nhân truy vấn Azure AI Search và các nguồn dữ liệu doanh nghiệp khác để lấy thông tin cập nhật về chuyến bay, khách sạn và các lựa chọn du lịch.
- **Xác thực & Bảo mật:** Tích hợp với Microsoft Entra ID để xác thực an toàn và áp dụng kiểm soát truy cập theo nguyên tắc quyền ít nhất cho tất cả tài nguyên.
- **Triển khai:** Thiết kế để triển khai trên Azure Container Apps, đảm bảo khả năng mở rộng, giám sát và hiệu quả vận hành.

Kiến trúc này cho phép điều phối linh hoạt nhiều tác nhân AI, tích hợp an toàn với dữ liệu doanh nghiệp, và tạo ra một nền tảng ổn định, có thể mở rộng để xây dựng các giải pháp AI chuyên ngành.

## Giải thích từng bước sơ đồ kiến trúc
Hãy tưởng tượng bạn đang lên kế hoạch cho một chuyến đi lớn và có một đội ngũ trợ lý chuyên gia giúp bạn từng chi tiết. Hệ thống Azure AI Travel Agents hoạt động tương tự, sử dụng các phần khác nhau (như thành viên trong nhóm) mỗi phần đảm nhiệm một nhiệm vụ đặc biệt. Dưới đây là cách chúng hoạt động cùng nhau:

### Giao diện Người dùng (UI):
Hãy coi đây là quầy lễ tân của đại lý du lịch của bạn. Đây là nơi bạn (người dùng) đặt câu hỏi hoặc đưa yêu cầu, như “Tìm chuyến bay đến Paris cho tôi.” Đây có thể là cửa sổ chat trên trang web hoặc ứng dụng nhắn tin.

### Máy chủ MCP (Người điều phối):
Máy chủ MCP giống như quản lý lắng nghe yêu cầu của bạn ở quầy lễ tân và quyết định chuyên gia nào sẽ xử lý từng phần. Nó theo dõi cuộc hội thoại của bạn và đảm bảo mọi thứ diễn ra trơn tru.

### Các tác nhân AI (Trợ lý chuyên môn):
Mỗi tác nhân là chuyên gia trong một lĩnh vực cụ thể—một người hiểu rõ về chuyến bay, người khác về khách sạn, và người nữa về lập kế hoạch hành trình. Khi bạn yêu cầu chuyến đi, Máy chủ MCP gửi yêu cầu của bạn tới các tác nhân phù hợp. Các tác nhân này sử dụng kiến thức và công cụ của mình để tìm các lựa chọn tốt nhất cho bạn.

### Dịch vụ Azure OpenAI (Chuyên gia ngôn ngữ):
Điều này giống như có một chuyên gia ngôn ngữ hiểu chính xác bạn đang hỏi gì, dù bạn diễn đạt thế nào. Nó giúp các tác nhân hiểu yêu cầu của bạn và phản hồi bằng ngôn ngữ tự nhiên, hội thoại.

### Azure AI Search & Dữ liệu Doanh nghiệp (Thư viện thông tin):
Hãy tưởng tượng một thư viện khổng lồ, luôn cập nhật với mọi thông tin du lịch mới nhất—lịch trình chuyến bay, tình trạng khách sạn, và nhiều hơn nữa. Các tác nhân tìm kiếm thư viện này để cung cấp câu trả lời chính xác nhất cho bạn.

### Xác thực & Bảo mật (Nhân viên bảo vệ):
Giống như nhân viên bảo vệ kiểm tra ai được phép vào khu vực nhất định, phần này đảm bảo chỉ những người và tác nhân được ủy quyền mới truy cập được thông tin nhạy cảm. Nó giúp dữ liệu của bạn an toàn và riêng tư.

### Triển khai trên Azure Container Apps (Tòa nhà):
Tất cả các trợ lý và công cụ này cùng làm việc bên trong một tòa nhà bảo mật, có thể mở rộng (đám mây). Điều này nghĩa là hệ thống có thể xử lý nhiều người dùng cùng lúc và luôn sẵn sàng khi bạn cần.

## Cách mọi thứ hoạt động cùng nhau:

Bạn bắt đầu bằng cách đặt câu hỏi tại quầy lễ tân (UI).
Người quản lý (MCP Server) xác định chuyên gia (tác nhân) nào sẽ giúp bạn.
Chuyên gia sử dụng chuyên gia ngôn ngữ (OpenAI) để hiểu yêu cầu và thư viện (AI Search) để tìm câu trả lời tốt nhất.
Nhân viên bảo vệ (Xác thực) đảm bảo mọi thứ an toàn.
Tất cả diễn ra bên trong tòa nhà đáng tin cậy, có thể mở rộng (Azure Container Apps), để trải nghiệm của bạn mượt mà và an toàn.
Sự phối hợp này cho phép hệ thống nhanh chóng và an toàn hỗ trợ bạn lên kế hoạch chuyến đi, giống như một đội đại lý du lịch chuyên nghiệp cùng làm việc trong một văn phòng hiện đại!

## Triển khai Kỹ thuật
- **Máy chủ MCP:** Chứa logic điều phối cốt lõi, cung cấp công cụ tác nhân, và quản lý ngữ cảnh cho các quy trình lập kế hoạch du lịch đa bước.
- **Các tác nhân:** Mỗi tác nhân (ví dụ FlightAgent, HotelAgent) được triển khai như một công cụ MCP với mẫu yêu cầu và logic riêng.
- **Tích hợp Azure:** Sử dụng Azure OpenAI để hiểu ngôn ngữ tự nhiên và Azure AI Search để truy xuất dữ liệu.
- **Bảo mật:** Tích hợp với Microsoft Entra ID để xác thực và áp dụng kiểm soát truy cập theo nguyên tắc quyền ít nhất cho tất cả tài nguyên.
- **Triển khai:** Hỗ trợ triển khai trên Azure Container Apps để mở rộng và hiệu quả vận hành.

## Kết quả và Tác động
- Minh họa cách MCP có thể được sử dụng để điều phối nhiều tác nhân AI trong kịch bản thực tế, sản xuất.
- Tăng tốc phát triển giải pháp bằng cách cung cấp các mẫu tái sử dụng cho điều phối tác nhân, tích hợp dữ liệu và triển khai an toàn.
- Làm tài liệu hướng dẫn cho việc xây dựng các ứng dụng AI chuyên ngành sử dụng MCP và dịch vụ Azure.

## Tài liệu tham khảo
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Tiếp theo

- Quay lại: [Case Studies Overview](./README.md)
- Tiếp theo: [Updating ADO Items from YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, vui lòng lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ bản địa nên được xem là nguồn thông tin chính xác và đáng tin cậy. Đối với những thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->