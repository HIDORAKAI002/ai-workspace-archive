```mermaid
sequenceDiagram
    actor User
    participant WebApp as Ứng dụng Web<br/>(ContentSafetyController)
    participant SafetyService as Dịch vụ An toàn Nội dung
    participant AzureAPI as API An toàn Nội dung Azure
    participant LangChain as LangChain4j
    participant McpClient as Khách hàng MCP
    participant McpServer as Máy chủ Tính toán MCP<br/>(Cổng 8080)
    participant CalcService as Dịch vụ Máy tính

    %% Tương tác Người dùng
    User->>WebApp: Nhập lời nhắc tính toán
    WebApp->>WebApp: Tạo PromptRequest

    %% Kiểm tra An toàn Nội dung
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Kiểm tra nội dung có an toàn không<br/>(độ nghiêm trọng < 2 cho tất cả các thể loại)

    %% Luồng Xử lý - Nội dung an toàn
    alt Nội dung an toàn
        SafetyService->>LangChain: Chuyển lời nhắc cho Bot.chat()
        LangChain->>McpClient: Xử lý lời nhắc
        McpClient->>McpServer: Gọi công cụ máy tính thích hợp qua SSE
        McpServer->>CalcService: Thực thi phép tính<br/>(cộng, trừ, nhân, v.v.)
        CalcService-->>McpServer: Kết quả tính toán
        McpServer-->>McpClient: Kết quả thực thi công cụ
        McpClient-->>LangChain: Kết quả công cụ
        LangChain-->>SafetyService: Phản hồi Bot
        SafetyService-->>WebApp: Trả lại bản đồ kết quả<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Hiển thị kết quả tính toán và thông tin an toàn
    else Nội dung không an toàn
        SafetyService-->>WebApp: Trả lại bản đồ kết quả<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Hiển thị cảnh báo an toàn<br/>(không tính toán)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->