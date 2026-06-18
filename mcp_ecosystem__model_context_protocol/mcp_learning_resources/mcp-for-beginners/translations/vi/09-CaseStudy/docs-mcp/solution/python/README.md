# Trình Tạo Kế Hoạch Học với Chainlit & Microsoft Learn Docs MCP

## Yêu Cầu

- Python 3.8 trở lên
- pip (trình quản lý gói Python)
- Kết nối Internet để truy cập máy chủ Microsoft Learn Docs MCP

## Cài Đặt

1. Clone kho lưu trữ này hoặc tải các tệp dự án.
2. Cài đặt các phụ thuộc cần thiết:

   ```bash
   pip install -r requirements.txt
   ```

## Cách Sử Dụng

### Kịch Bản 1: Truy Vấn Đơn Giản tới Docs MCP
Một client dòng lệnh kết nối đến máy chủ Docs MCP, gửi truy vấn và in kết quả.

1. Chạy script:
   ```bash
   python scenario1.py
   ```
2. Nhập câu hỏi về tài liệu tại dấu nhắc lệnh.

### Kịch Bản 2: Trình Tạo Kế Hoạch Học (Ứng Dụng Web Chainlit)
Giao diện trên web (dùng Chainlit) cho phép người dùng tạo kế hoạch học tập cá nhân theo tuần cho bất kỳ chủ đề kỹ thuật nào.

1. Khởi động ứng dụng Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Mở URL địa phương hiển thị trên terminal (ví dụ: http://localhost:8000) trong trình duyệt.
3. Trong cửa sổ chat, nhập chủ đề học và số tuần bạn muốn học (ví dụ: "Chứng chỉ AI-900, 8 tuần").
4. Ứng dụng sẽ phản hồi với kế hoạch học từng tuần, bao gồm các liên kết đến tài liệu Microsoft Learn phù hợp.

**Biến Môi Trường Cần Thiết:**

Để sử dụng Kịch Bản 2 (ứng dụng web Chainlit với Azure OpenAI), bạn phải thiết lập các biến môi trường sau trong tệp `.env` trong thư mục `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Điền các giá trị này với thông tin tài nguyên Azure OpenAI của bạn trước khi chạy ứng dụng.

> [!TIP]
> Bạn có thể dễ dàng triển khai mẫu của riêng mình bằng cách sử dụng [Microsoft Foundry](https://ai.azure.com/).

### Kịch Bản 3: Tài Liệu Trong Trình Soạn Thảo với MCP Server trong VS Code

Thay vì chuyển tab trình duyệt để tìm kiếm tài liệu, bạn có thể mang Microsoft Learn Docs trực tiếp vào VS Code của mình thông qua máy chủ MCP. Điều này cho phép bạn:
- Tìm kiếm và đọc tài liệu ngay trong VS Code mà không rời khỏi môi trường lập trình.
- Tham khảo tài liệu và chèn liên kết trực tiếp vào README hoặc các tệp khóa học.
- Sử dụng GitHub Copilot và MCP cùng nhau cho quy trình làm việc có AI hỗ trợ liền mạch.

**Ví Dụ Trường Hợp Sử Dụng:**
- Nhanh chóng thêm liên kết tham khảo vào README khi viết tài liệu khóa học hoặc dự án.
- Dùng Copilot để tạo mã và MCP để tìm và trích dẫn tài liệu liên quan ngay lập tức.
- Giữ tập trung trong trình soạn thảo và tăng năng suất làm việc.

> [!IMPORTANT]
> Đảm bảo bạn có tệp cấu hình hợp lệ [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) trong workspace (vị trí là `.vscode/mcp.json`).

## Tại Sao Chọn Chainlit cho Kịch Bản 2?

Chainlit là một framework mã nguồn mở hiện đại để xây dựng ứng dụng web hội thoại. Nó giúp dễ dàng tạo giao diện chat kết nối với các dịch vụ backend như máy chủ Microsoft Learn Docs MCP. Dự án này sử dụng Chainlit để cung cấp một cách đơn giản, tương tác để tạo kế hoạch học cá nhân theo thời gian thực. Nhờ Chainlit, bạn có thể nhanh chóng xây dựng và triển khai công cụ chat nâng cao năng suất và việc học tập.

## Ứng Dụng Hoạt Động Như Thế Nào

Ứng dụng cho phép người dùng tạo kế hoạch học tập cá nhân bằng cách chỉ cần nhập chủ đề và thời gian học. Ứng dụng sẽ phân tích dữ liệu nhập, truy vấn máy chủ Microsoft Learn Docs MCP để tìm nội dung phù hợp, và tổ chức kết quả thành kế hoạch tuần tự theo từng tuần. Mỗi tuần sẽ được hiển thị trong cửa sổ chat, giúp bạn theo dõi và tiến độ dễ dàng. Việc tích hợp đảm bảo bạn luôn nhận được tài nguyên học tập mới nhất và phù hợp nhất.

## Ví Dụ Truy Vấn

Thử các truy vấn này trong cửa sổ chat để xem cách ứng dụng phản hồi:

- `Chứng chỉ AI-900, 8 tuần`
- `Học Azure Functions, 4 tuần`
- `Azure DevOps, 6 tuần`
- `Kỹ thuật dữ liệu trên Azure, 10 tuần`
- `Kiến thức cơ bản bảo mật Microsoft, 5 tuần`
- `Power Platform, 7 tuần`
- `Dịch vụ AI Azure, 12 tuần`
- `Kiến trúc điện toán đám mây, 9 tuần`

Các ví dụ này thể hiện tính linh hoạt của ứng dụng cho các mục tiêu học tập và khung thời gian khác nhau.

## Tham Khảo

- [Tài liệu Chainlit](https://docs.chainlit.io/)
- [Tài liệu MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->