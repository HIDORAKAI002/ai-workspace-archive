# Scenario 3: Tài liệu trong trình chỉnh sửa với máy chủ MCP trong VS Code

## Tổng quan

Trong kịch bản này, bạn sẽ học cách đưa Tài liệu Microsoft Learn trực tiếp vào môi trường Visual Studio Code của bạn bằng cách sử dụng máy chủ MCP. Thay vì liên tục chuyển đổi giữa các tab trình duyệt để tìm kiếm tài liệu, bạn có thể truy cập, tìm kiếm và tham khảo tài liệu chính thức ngay bên trong trình chỉnh sửa của mình. Phương pháp này giúp tối ưu hóa quy trình làm việc, giữ bạn tập trung và cho phép tích hợp liền mạch với các công cụ như GitHub Copilot.

- Tìm kiếm và đọc tài liệu trong VS Code mà không cần rời khỏi môi trường lập trình.
- Tham khảo tài liệu và chèn liên kết trực tiếp vào README hoặc các tập tin khóa học của bạn.
- Sử dụng GitHub Copilot và MCP cùng nhau để có quy trình làm việc tài liệu được hỗ trợ bởi AI mượt mà.

## Mục tiêu học tập

Kết thúc chương này, bạn sẽ hiểu cách thiết lập và sử dụng máy chủ MCP trong VS Code để cải thiện quy trình làm việc tài liệu và phát triển. Bạn sẽ có thể:

- Cấu hình không gian làm việc để sử dụng máy chủ MCP cho việc tra cứu tài liệu.
- Tìm kiếm và chèn tài liệu trực tiếp từ bên trong VS Code.
- Kết hợp sức mạnh của GitHub Copilot và MCP để có quy trình làm việc hiệu quả hơn, được tăng cường bởi AI.

Những kỹ năng này sẽ giúp bạn duy trì tập trung, nâng cao chất lượng tài liệu và tăng năng suất khi là một nhà phát triển hoặc người viết kỹ thuật.

## Giải pháp

Để đạt được truy cập tài liệu trong trình chỉnh sửa, bạn sẽ theo một loạt các bước tích hợp máy chủ MCP với VS Code và GitHub Copilot. Giải pháp này lý tưởng cho tác giả khóa học, người viết tài liệu, và các nhà phát triển muốn giữ sự tập trung trong trình chỉnh sửa khi làm việc với tài liệu và Copilot.

- Nhanh chóng thêm liên kết tham khảo vào README khi viết tài liệu cho khóa học hoặc dự án.
- Sử dụng Copilot để tạo mã và MCP để tìm và trích dẫn tài liệu liên quan ngay lập tức.
- Giữ tập trung trong trình chỉnh sửa và nâng cao năng suất.

### Hướng dẫn từng bước

Để bắt đầu, hãy làm theo các bước sau. Với mỗi bước, bạn có thể thêm ảnh chụp màn hình từ thư mục tài sản để minh họa trực quan cho quy trình.

1. **Thêm cấu hình MCP:**
   Trong thư mục gốc dự án của bạn, tạo một tập tin `.vscode/mcp.json` và thêm cấu hình sau:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Cấu hình này cho VS Code biết cách kết nối với [`máy chủ Microsoft Learn Docs MCP`](https://github.com/MicrosoftDocs/mcp).
   
   ![Bước 1: Thêm mcp.json vào thư mục .vscode](../../../../../../translated_images/vi/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Mở bảng trò chuyện GitHub Copilot:**
   Nếu bạn chưa cài đặt tiện ích mở rộng GitHub Copilot, hãy vào phần Extensions trong VS Code và cài đặt nó. Bạn có thể tải trực tiếp từ [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Sau đó, mở bảng trò chuyện Copilot từ thanh bên.

   ![Bước 2: Mở bảng Copilot Chat](../../../../../../translated_images/vi/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Bật chế độ agent và xác minh công cụ:**
   Trong bảng Copilot Chat, bật chế độ agent.

   ![Bước 3: Bật chế độ agent và xác minh công cụ](../../../../../../translated_images/vi/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Sau khi bật chế độ agent, xác minh rằng máy chủ MCP được liệt kê là một trong các công cụ có sẵn. Điều này đảm bảo agent Copilot có thể truy cập máy chủ tài liệu để lấy thông tin liên quan.
   
   ![Bước 3: Xác minh công cụ máy chủ MCP](../../../../../../translated_images/vi/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Bắt đầu một cuộc trò chuyện mới và nhập yêu cầu cho agent:**
   Mở một cuộc trò chuyện mới trong bảng Copilot Chat. Bạn có thể nhập các truy vấn tài liệu cho agent. Agent sẽ sử dụng máy chủ MCP để lấy và hiển thị tài liệu Microsoft Learn liên quan trực tiếp trong trình chỉnh sửa của bạn.

   - *"Tôi đang cố gắng viết một kế hoạch học tập cho chủ đề X. Tôi sẽ học trong 8 tuần, mỗi tuần hãy đề xuất nội dung tôi nên học."*

   ![Bước 4: Nhập yêu cầu cho agent trong chat](../../../../../../translated_images/vi/step4-prompt-chat.12187bb001605efc.webp)

5. **Truy vấn trực tiếp:**

   > Hãy xem một truy vấn trực tiếp từ phần [#get-help](https://discord.gg/D6cRhjHWSC) trong Discord Microsoft Foundry ([xem tin gốc](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Tôi đang tìm câu trả lời về cách triển khai một giải pháp đa agent với các agent AI được phát triển trên Azure AI Foundry. Tôi thấy không có phương pháp triển khai trực tiếp, chẳng hạn như các kênh Copilot Studio. Vậy đâu là các cách khác nhau để triển khai sao cho người dùng doanh nghiệp có thể tương tác và hoàn thành nhiệm vụ? Có rất nhiều bài viết/blog nói rằng chúng ta có thể dùng dịch vụ Azure Bot để làm việc này, có thể đóng vai trò cầu nối giữa MS teams và các Agent Azure AI Foundry, vậy liệu có hoạt động nếu tôi thiết lập một bot Azure kết nối với Orchestrator Agent trên Azure AI foundry qua Azure function để điều phối hay tôi cần tạo Azure function cho từng agent AI trong giải pháp đa agent để điều phối tại Bot framework? Mọi đề xuất khác đều rất hoan nghênh."*

   ![Bước 5: Truy vấn trực tiếp](../../../../../../translated_images/vi/step5-live-queries.49db3e4a50bea273.webp)

   Agent sẽ phản hồi với các liên kết và tóm tắt tài liệu liên quan, bạn sau đó có thể chèn trực tiếp vào các tập tin markdown hoặc dùng làm tài liệu tham khảo trong mã của bạn.
   
### Các truy vấn mẫu

Dưới đây là một số truy vấn bạn có thể thử. Các truy vấn này sẽ cho thấy cách máy chủ MCP và Copilot cùng làm việc để cung cấp tài liệu và tham khảo ngữ cảnh tức thì mà không cần rời VS Code:

- "Hướng dẫn cách sử dụng triggers trong Azure Functions."
- "Chèn liên kết tới tài liệu chính thức của Azure Key Vault."
- "Những thực tiễn tốt nhất để bảo mật tài nguyên Azure là gì?"
- "Tìm hướng dẫn bắt đầu nhanh cho dịch vụ Azure AI."

Các truy vấn này sẽ cho thấy cách máy chủ MCP và Copilot cùng phối hợp để cung cấp tài liệu và tham khảo theo ngữ cảnh ngay lập tức mà không cần rời VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->