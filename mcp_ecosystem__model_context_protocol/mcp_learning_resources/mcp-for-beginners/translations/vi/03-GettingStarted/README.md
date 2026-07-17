## Bắt đầu  

[![Xây dựng Máy chủ MCP đầu tiên của bạn](../../../translated_images/vi/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Nhấp vào hình ảnh trên để xem video của bài học này)_

Phần này bao gồm một số bài học:

- **1 Máy chủ đầu tiên của bạn**, trong bài học đầu tiên này, bạn sẽ học cách tạo máy chủ đầu tiên và kiểm tra nó bằng công cụ inspector, một cách hữu ích để thử nghiệm và gỡ lỗi máy chủ của bạn, [đến bài học](01-first-server/README.md)

- **2 Client**, trong bài học này, bạn sẽ học cách viết một client có thể kết nối với máy chủ của bạn, [đến bài học](02-client/README.md)

- **3 Client với LLM**, một cách viết client tốt hơn là thêm một LLM vào để nó có thể "đàm phán" với máy chủ của bạn về việc cần làm gì, [đến bài học](03-llm-client/README.md)

- **4 Tiêu thụ chế độ GitHub Copilot Agent của máy chủ trong Visual Studio Code**. Ở đây, chúng ta xem cách chạy Máy chủ MCP của mình ngay trong Visual Studio Code, [đến bài học](04-vscode/README.md)

- **5 Máy chủ Giao thức stdio** stdio transport là tiêu chuẩn được khuyến nghị cho giao tiếp máy chủ-client MCP cục bộ, cung cấp giao tiếp con tiến trình an toàn với cách ly tiến trình tích hợp sẵn [đến bài học](05-stdio-server/README.md)

- **6 HTTP Streaming với MCP (Streamable HTTP)**. Tìm hiểu về giao thức truyền HTTP streaming hiện đại (phương pháp được khuyến nghị cho máy chủ MCP từ xa theo [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), thông báo tiến trình, và cách triển khai máy chủ và client MCP có khả năng mở rộng, thời gian thực bằng Streamable HTTP. [đến bài học](06-http-streaming/README.md)

- **7 Sử dụng Bộ công cụ AI cho VSCode** để tiêu thụ và thử nghiệm các MCP Client và Server của bạn [đến bài học](07-aitk/README.md)

- **8 Kiểm thử**. Ở đây chúng ta sẽ tập trung vào cách kiểm thử máy chủ và client theo nhiều cách khác nhau, [đến bài học](08-testing/README.md)

- **9 Triển khai**. Chương này sẽ xem xét các cách khác nhau để triển khai các giải pháp MCP của bạn, [đến bài học](09-deployment/README.md)

- **10 Sử dụng máy chủ nâng cao**. Chương này bao gồm các cách sử dụng máy chủ nâng cao, [đến bài học](./10-advanced/README.md)

- **11 Xác thực**. Chương này hướng dẫn cách thêm xác thực đơn giản, từ Basic Auth đến sử dụng JWT và RBAC. Bạn được khuyến khích bắt đầu từ đây rồi xem Các Chủ đề Nâng cao trong Chương 5 và thực hiện bảo mật bổ sung theo khuyến nghị trong Chương 2, [đến bài học](./11-simple-auth/README.md)

- **12 Máy chủ MCP**. Cấu hình và sử dụng các client máy chủ MCP phổ biến bao gồm Claude Desktop, Cursor, Cline và Windsurf. Tìm hiểu các loại giao thức truyền và xử lý sự cố, [đến bài học](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. Gỡ lỗi và kiểm thử các máy chủ MCP của bạn một cách tương tác sử dụng công cụ MCP Inspector. Học cách xử lý sự cố các công cụ, tài nguyên, và thông điệp giao thức, [đến bài học](./13-mcp-inspector/README.md)

- **14 Sampling**. Tạo Máy chủ MCP hợp tác với client MCP trong các nhiệm vụ liên quan đến LLM (không còn được dùng trong bản phát hành ứng viên `2026-07-28`; vẫn hợp lệ cho `2025-11-25`). [đến bài học](./14-sampling/README.md)

- **15 MCP Apps**. Xây dựng Máy chủ MCP đồng thời trả lời với các hướng dẫn UI, [đến bài học](./15-mcp-apps/README.md)

Giao thức Ngữ cảnh Mô hình (MCP) là một giao thức mở chuẩn hóa cách các ứng dụng cung cấp ngữ cảnh cho các LLM. Hãy nghĩ MCP giống như một cổng USB-C cho các ứng dụng AI - nó cung cấp cách chuẩn hóa để kết nối các mô hình AI với các nguồn dữ liệu và công cụ khác nhau.

## Mục tiêu học tập

Vào cuối bài học này, bạn sẽ có thể:

- Thiết lập môi trường phát triển cho MCP bằng C#, Java, Python, TypeScript và JavaScript
- Xây dựng và triển khai máy chủ MCP cơ bản với các tính năng tùy chỉnh (tài nguyên, prompt, và công cụ)
- Tạo các ứng dụng host kết nối tới máy chủ MCP
- Thử nghiệm và gỡ lỗi triển khai MCP
- Hiểu các thách thức thiết lập phổ biến và các giải pháp của chúng
- Kết nối các triển khai MCP của bạn với các dịch vụ LLM phổ biến

## Thiết lập môi trường MCP của bạn

Trước khi bắt đầu làm việc với MCP, điều quan trọng là chuẩn bị môi trường phát triển và hiểu quy trình cơ bản. Phần này sẽ hướng dẫn bạn qua các bước thiết lập ban đầu để đảm bảo khởi đầu suôn sẻ với MCP.

### Điều kiện tiên quyết

Trước khi bắt đầu phát triển MCP, hãy đảm bảo rằng bạn có:

- **Môi trường phát triển**: Cho ngôn ngữ bạn chọn (C#, Java, Python, TypeScript hoặc JavaScript)
- **IDE/Trình soạn thảo**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm, hoặc bất kỳ trình soạn thảo mã hiện đại nào
- **Trình quản lý gói**: NuGet, Maven/Gradle, pip, hoặc npm/yarn
- **Khóa API**: Cho bất kỳ dịch vụ AI nào bạn dự định dùng trong ứng dụng host của mình


### SDK chính thức

Trong các chương tiếp theo bạn sẽ thấy các giải pháp được xây dựng bằng Python, TypeScript, Java và .NET. Dưới đây là tất cả các SDK được hỗ trợ chính thức.

MCP cung cấp các SDK chính thức cho nhiều ngôn ngữ (phù hợp với [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [SDK C#](https://github.com/modelcontextprotocol/csharp-sdk) - Bảo trì phối hợp với Microsoft
- [SDK Java](https://github.com/modelcontextprotocol/java-sdk) - Bảo trì phối hợp với Spring AI
- [SDK TypeScript](https://github.com/modelcontextprotocol/typescript-sdk) - Triển khai chính thức bằng TypeScript
- [SDK Python](https://github.com/modelcontextprotocol/python-sdk) - Triển khai chính thức bằng Python (FastMCP)
- [SDK Kotlin](https://github.com/modelcontextprotocol/kotlin-sdk) - Triển khai chính thức bằng Kotlin
- [SDK Swift](https://github.com/modelcontextprotocol/swift-sdk) - Bảo trì phối hợp với Loopwork AI
- [SDK Rust](https://github.com/modelcontextprotocol/rust-sdk) - Triển khai chính thức bằng Rust
- [SDK Go](https://github.com/modelcontextprotocol/go-sdk) - Triển khai chính thức bằng Go

## Những điểm chính cần ghi nhớ

- Việc thiết lập môi trường phát triển MCP rất đơn giản với các SDK theo từng ngôn ngữ
- Xây dựng máy chủ MCP bao gồm tạo và đăng ký các công cụ với lược đồ rõ ràng
- MCP client kết nối đến máy chủ và mô hình để tận dụng các khả năng mở rộng
- Thử nghiệm và gỡ lỗi là yếu tố thiết yếu để triển khai MCP đáng tin cậy
- Các tùy chọn triển khai từ phát triển cục bộ đến giải pháp dựa trên đám mây

## Thực hành

Chúng tôi có một bộ bài mẫu bổ trợ cho các bài tập bạn sẽ thấy trong tất cả các chương của phần này. Ngoài ra mỗi chương còn có bài tập và nhiệm vụ riêng.

- [Máy tính Java](./samples/java/calculator/README.md)
- [Máy tính .Net](../../../03-GettingStarted/samples/csharp)
- [Máy tính JavaScript](./samples/javascript/README.md)
- [Máy tính TypeScript](./samples/typescript/README.md)
- [Máy tính Python](../../../03-GettingStarted/samples/python)

## Tài nguyên bổ sung

- [Xây dựng tác nhân sử dụng Model Context Protocol trên Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [MCP từ xa với Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [Tác nhân MCP OpenAI .NET](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Tiếp theo là gì

Bắt đầu với bài học đầu tiên: [Tạo Máy chủ MCP đầu tiên của bạn](01-first-server/README.md)

Sau khi hoàn thành module này, tiếp tục với: [Module 4: Triển khai thực tế](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->