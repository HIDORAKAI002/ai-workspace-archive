# 🚀 10 Máy chủ Microsoft MCP Đang Thay Đổi Năng Suất Của Nhà Phát Triển

## 🎯 Những Gì Bạn Sẽ Học Trong Hướng Dẫn Này

Hướng dẫn thực tế này giới thiệu mười máy chủ Microsoft MCP đang tích cực thay đổi cách các nhà phát triển làm việc với các trợ lý AI. Thay vì chỉ giải thích máy chủ MCP *có thể* làm gì, chúng tôi sẽ cho bạn thấy các máy chủ đã và đang tạo ra sự khác biệt thực sự trong quy trình phát triển hàng ngày tại Microsoft và xa hơn nữa.

Mỗi máy chủ trong hướng dẫn này được chọn dựa trên việc sử dụng thực tế và phản hồi từ các nhà phát triển. Bạn sẽ khám phá không chỉ máy chủ đó làm gì, mà còn tại sao nó quan trọng và làm thế nào để tận dụng tối đa nó trong các dự án của riêng bạn. Cho dù bạn hoàn toàn mới với MCP hay muốn mở rộng thiết lập hiện có, những máy chủ này đại diện cho một số công cụ thiết thực và có ảnh hưởng nhất trong hệ sinh thái Microsoft.

> **💡 Mẹo Bắt Đầu Nhanh**
> 
> Mới với MCP? Đừng lo! Hướng dẫn này được thiết kế thân thiện với người mới bắt đầu. Chúng tôi sẽ giải thích các khái niệm khi bạn đọc, và bạn luôn có thể tham khảo lại các mô-đun [Giới thiệu về MCP](../00-Introduction/README.md) và [Khái niệm Cơ bản](../01-CoreConcepts/README.md) để hiểu rõ hơn.

## Tổng quan

Hướng dẫn toàn diện này khám phá mười máy chủ Microsoft MCP đang cách mạng hóa cách các nhà phát triển tương tác với trợ lý AI và các công cụ bên ngoài. Từ quản lý tài nguyên Azure đến xử lý tài liệu, những máy chủ này thể hiện sức mạnh của Giao thức Ngữ cảnh Mẫu mô hình trong việc tạo ra quy trình phát triển liên tục và hiệu quả.

## Mục tiêu Học tập

Cuối hướng dẫn này, bạn sẽ:
- Hiểu cách các máy chủ MCP nâng cao năng suất của nhà phát triển
- Tìm hiểu về các triển khai máy chủ MCP có ảnh hưởng nhất của Microsoft
- Khám phá các trường hợp sử dụng thực tế cho từng máy chủ
- Biết cách cài đặt và cấu hình những máy chủ này trong VS Code và Visual Studio
- Khám phá hệ sinh thái MCP rộng lớn hơn và các hướng phát triển trong tương lai

## 🔧 Hiểu các Máy chủ MCP: Hướng dẫn cho Người Mới Bắt Đầu

### Máy chủ MCP Là Gì?

Là người mới với Giao thức Ngữ cảnh Mẫu (MCP), bạn có thể thắc mắc: "Máy chủ MCP chính xác là gì, và tại sao tôi nên quan tâm?" Hãy bắt đầu với một phép so sánh đơn giản.

Hãy tưởng tượng các máy chủ MCP như những trợ lý chuyên biệt giúp trợ lý AI lập trình của bạn (như GitHub Copilot) kết nối với các công cụ và dịch vụ bên ngoài. Giống như bạn sử dụng các ứng dụng khác nhau trên điện thoại cho các công việc khác nhau—một cho thời tiết, một cho dẫn đường, một cho ngân hàng—máy chủ MCP cho trợ lý AI của bạn khả năng tương tác với các công cụ và dịch vụ phát triển khác nhau.

### Vấn đề mà Máy chủ MCP Giải quyết

Trước khi có máy chủ MCP, nếu bạn muốn:
- Kiểm tra tài nguyên Azure của bạn
- Tạo một issue trên GitHub
- Truy vấn cơ sở dữ liệu
- Tìm kiếm qua tài liệu

Bạn sẽ phải dừng việc viết mã, mở trình duyệt, truy cập trang web thích hợp và thực hiện thủ công các công việc này. Việc liên tục chuyển đổi ngữ cảnh này phá vỡ dòng chảy của bạn và làm giảm năng suất.

### Cách Máy chủ MCP Thay đổi Trải nghiệm Phát triển của Bạn

Với các máy chủ MCP, bạn có thể ở lại môi trường phát triển của mình (VS Code, Visual Studio, v.v.) và đơn giản yêu cầu trợ lý AI xử lý các tác vụ này. Ví dụ:

**Thay vì quy trình truyền thống này:**
1. Dừng coding
2. Mở trình duyệt
3. Truy cập cổng Azure
4. Tra cứu chi tiết tài khoản lưu trữ
5. Quay lại VS Code
6. Tiếp tục coding

**Bạn có thể làm điều này:**
1. Hỏi AI: "Tình trạng các tài khoản lưu trữ Azure của tôi như thế nào?"
2. Tiếp tục coding với thông tin nhận được

### Lợi ích Chính cho Người Mới Bắt Đầu

#### 1. 🔄 **Ở Lại Trong Trạng Thái Làm Việc**
- Không còn chuyển đổi giữa nhiều ứng dụng
- Giữ sự tập trung vào mã bạn đang viết
- Giảm gánh nặng tinh thần khi quản lý nhiều công cụ

#### 2. 🤖 **Dùng Ngôn Ngữ Tự Nhiên Thay vì Lệnh Phức Tạp**
- Thay vì ghi nhớ cú pháp SQL, mô tả dữ liệu bạn cần
- Thay vì nhớ các lệnh Azure CLI, giải thích mục tiêu của bạn
- Để AI xử lý phần kỹ thuật trong khi bạn tập trung vào logic

#### 3. 🔗 **Kết Nối Nhiều Công Cụ Với Nhau**
- Tạo các quy trình làm việc mạnh mẽ bằng cách kết hợp các dịch vụ khác nhau
- Ví dụ: "Lấy tất cả các issue GitHub mới nhất và tạo các mục công việc tương ứng trong Azure DevOps"
- Xây dựng tự động hóa mà không cần viết script phức tạp

#### 4. 🌐 **Truy Cập Hệ Sinh Thái Ngày Càng Mở Rộng**
- Hưởng lợi từ các máy chủ do Microsoft, GitHub và các công ty khác xây dựng
- Kết hợp các công cụ từ nhiều nhà cung cấp một cách liền mạch
- Tham gia hệ sinh thái chuẩn hóa hoạt động trên các trợ lý AI khác nhau

#### 5. 🛠️ **Học Qua Thực Hành**
- Bắt đầu với các máy chủ đã xây dựng sẵn để hiểu các khái niệm
- Dần dần xây dựng máy chủ riêng khi bạn quen hơn
- Sử dụng SDK và tài liệu có sẵn để hướng dẫn việc học của bạn

### Ví dụ Thực Tế cho Người Mới Bắt Đầu

Giả sử bạn mới bắt đầu phát triển web và đang làm dự án đầu tiên. Đây là cách các máy chủ MCP có thể giúp bạn:

**Phương pháp truyền thống:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**Với các máy chủ MCP:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### Lợi Thế Chuẩn Doanh Nghiệp

MCP đang trở thành tiêu chuẩn ngành, có nghĩa là:
- **Tính nhất quán**: Trải nghiệm tương tự trên nhiều công cụ và công ty khác nhau
- **Tính tương tác**: Các máy chủ từ các nhà cung cấp khác nhau có thể làm việc cùng nhau
- **Tương lai bền vững**: Kỹ năng và thiết lập có thể chuyển giao giữa các trợ lý AI khác nhau
- **Cộng đồng**: Hệ sinh thái lớn với kiến thức và tài nguyên chia sẻ

### Bắt Đầu: Những Gì Bạn Sẽ Học

Trong hướng dẫn này, chúng ta sẽ khám phá 10 máy chủ Microsoft MCP đặc biệt hữu ích cho nhà phát triển ở mọi cấp độ. Mỗi máy chủ được thiết kế để:
- Giải quyết các thách thức phát triển phổ biến
- Giảm thiểu các tác vụ lặp đi lặp lại
- Cải thiện chất lượng mã
- Tăng cường cơ hội học tập

> **💡 Mẹo Học Tập**
> 
> Nếu bạn hoàn toàn mới với MCP, hãy bắt đầu với các mô-đun [Giới thiệu về MCP](../00-Introduction/README.md) và [Khái niệm Cơ bản](../01-CoreConcepts/README.md) trước. Sau đó quay lại đây để xem các khái niệm này được áp dụng với các công cụ thực tế của Microsoft như thế nào.
>
> Để hiểu thêm về tầm quan trọng của MCP, hãy xem bài viết của Maria Naggaga: [Kết nối Một Lần, Tích hợp Mọi Nơi với MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## Bắt Đầu với MCP trong VS Code và Visual Studio 🚀

Việc thiết lập những máy chủ MCP này khá đơn giản nếu bạn đang sử dụng Visual Studio Code hoặc Visual Studio 2022 cùng với GitHub Copilot.

### Thiết lập VS Code

Quy trình cơ bản cho VS Code là:

1. **Bật Chế độ Agent**: Trong VS Code, chuyển sang chế độ Agent trong cửa sổ Copilot Chat
2. **Cấu hình Máy chủ MCP**: Thêm các cấu hình máy chủ vào tệp settings.json của VS Code
3. **Khởi động Máy chủ**: Nhấn nút "Start" cho từng máy chủ bạn muốn sử dụng
4. **Chọn Công cụ**: Chọn các máy chủ MCP sẽ kích hoạt trong phiên làm việc hiện tại

Để biết hướng dẫn chi tiết, xem [tài liệu MCP cho VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Mẹo Chuyên Nghiệp: Quản lý Máy chủ MCP như Chuyên gia!**
> 
> Giao diện Extensions trong VS Code hiện có [giao diện mới tiện lợi để quản lý các Máy chủ MCP đã cài đặt](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Bạn có thể dễ dàng khởi động, dừng và quản lý mọi máy chủ MCP cài đặt qua một giao diện rõ ràng, đơn giản. Hãy thử ngay!

### Thiết lập Visual Studio 2022

Đối với Visual Studio 2022 (phiên bản 17.14 trở lên):

1. **Bật Chế độ Agent**: Nhấp vào menu "Ask" trong cửa sổ GitHub Copilot Chat và chọn "Agent"
2. **Tạo Tệp Cấu Hình**: Tạo một tệp `.mcp.json` trong thư mục giải pháp (vị trí khuyến nghị: `<SOLUTIONDIR>\.mcp.json`)
3. **Cấu hình Máy chủ**: Thêm cấu hình máy chủ MCP theo định dạng MCP chuẩn
4. **Phê duyệt Công cụ**: Khi được yêu cầu, phê duyệt các công cụ bạn muốn sử dụng với quyền hạn phù hợp

Xem hướng dẫn chi tiết cho Visual Studio tại [tài liệu MCP cho Visual Studio](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Mỗi máy chủ MCP có yêu cầu cấu hình riêng (chuỗi kết nối, xác thực, v.v.), nhưng mẫu cấu hình khá nhất quán giữa hai IDE.

## Bài Học Từ Các Máy chủ Microsoft MCP 🛠️

### 1. 📚 Máy chủ Microsoft Learn Docs MCP

[![Cài đặt trong VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Cài đặt trong VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Nó làm gì**: Máy chủ Microsoft Learn Docs MCP là dịch vụ được lưu trữ trên đám mây cung cấp cho trợ lý AI quyền truy cập thời gian thực vào tài liệu chính thức của Microsoft qua Giao thức Ngữ cảnh Mẫu. Nó kết nối với `https://learn.microsoft.com/api/mcp` và cho phép tìm kiếm ngữ nghĩa trên Microsoft Learn, tài liệu Azure, tài liệu Microsoft 365 và các nguồn chính thức khác của Microsoft.

**Tại sao nó hữu ích**: Dù có vẻ chỉ là "tài liệu", máy chủ này thực sự rất quan trọng đối với mọi nhà phát triển sử dụng công nghệ Microsoft. Một trong những phàn nàn lớn nhất từ các nhà phát triển .NET về trợ lý AI lập trình là chúng không cập nhật các phiên bản .NET và C# mới nhất. Máy chủ Microsoft Learn Docs MCP giải quyết điều này bằng cách cung cấp truy cập thời gian thực đến tài liệu, tham chiếu API, và các thực hành tốt nhất mới nhất. Cho dù bạn làm việc với các SDK Azure mới nhất, khám phá các tính năng mới của C# 13, hay áp dụng các mẫu thiết kế .NET Aspire tiên tiến, máy chủ này đảm bảo trợ lý AI của bạn có quyền truy cập đến thông tin chính thống, cập nhật để tạo ra mã chính xác và hiện đại.

**Ứng dụng thực tế**: "Các lệnh az cli để tạo ứng dụng container Azure theo tài liệu chính thức của Microsoft Learn là gì?" hoặc "Làm sao để cấu hình Entity Framework với dependency injection trong ASP.NET Core?" Hoặc "Đánh giá mã này để chắc chắn nó phù hợp với các khuyến nghị về hiệu năng trong Tài liệu Microsoft Learn." Máy chủ cung cấp phạm vi bao phủ toàn diện trên Microsoft Learn, tài liệu Azure, và tài liệu Microsoft 365 sử dụng tìm kiếm ngữ nghĩa tiên tiến để tìm thông tin phù hợp nhất theo ngữ cảnh. Nó trả về tới 10 đoạn nội dung chất lượng cao kèm tiêu đề bài viết và URL, luôn truy cập tài liệu Microsoft mới nhất khi chúng được xuất bản.

**Ví dụ nổi bật**: Máy chủ cung cấp công cụ `microsoft_docs_search` thực hiện tìm kiếm ngữ nghĩa trên tài liệu kỹ thuật chính thức của Microsoft. Một khi được cấu hình, bạn có thể hỏi các câu như "Làm sao để triển khai xác thực JWT trong ASP.NET Core?" và nhận được câu trả lời chi tiết, chính thức kèm theo liên kết nguồn. Chất lượng tìm kiếm xuất sắc vì nó hiểu ngữ cảnh – hỏi về "containers" trong bối cảnh Azure sẽ trả về tài liệu Azure Container Instances, trong khi cùng thuật ngữ trong ngữ cảnh .NET sẽ trả về thông tin bộ sưu tập của C# phù hợp.

Điều này đặc biệt hữu ích với thư viện hoặc trường hợp sử dụng mới thay đổi nhanh hoặc vừa được cập nhật. Ví dụ, trong một số dự án lập trình gần đây tôi muốn tận dụng các tính năng trong các bản phát hành mới nhất của .NET Aspire và Microsoft.Extensions.AI. Bằng cách thêm máy chủ Microsoft Learn Docs MCP, tôi không chỉ sử dụng tài liệu API mà còn tận dụng các bài hướng dẫn và chỉ dẫn vừa mới được xuất bản.

> **💡 Mẹo Chuyên Nghiệp**
> 
> Ngay cả các mô hình thân thiện với công cụ cũng cần được khuyến khích sử dụng các công cụ MCP! Hãy cân nhắc thêm một câu lệnh hệ thống hoặc [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) như: "Bạn có quyền truy cập `microsoft.docs.mcp` – sử dụng công cụ này để tìm kiếm tài liệu chính thức mới nhất của Microsoft khi xử lý các câu hỏi về công nghệ Microsoft như C#, Azure, ASP.NET Core hoặc Entity Framework."
>
> Để xem ví dụ tuyệt vời về điều này trong thực tế, hãy xem chế độ chat [C# .NET Janitor](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) trong kho Awesome GitHub Copilot. Chế độ này đặc biệt sử dụng máy chủ Microsoft Learn Docs MCP để giúp làm sạch và hiện đại hóa mã C# sử dụng các mẫu thiết kế và thực hành tốt nhất mới nhất.
### 2. ☁️ Máy chủ Azure MCP
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Nó làm gì**: Azure MCP Server là một bộ công cụ toàn diện gồm hơn 15 trình kết nối dịch vụ Azure chuyên biệt mang toàn bộ hệ sinh thái Azure vào quy trình làm việc AI của bạn. Đây không chỉ là một máy chủ đơn lẻ – mà là một tập hợp mạnh mẽ bao gồm quản lý tài nguyên, kết nối cơ sở dữ liệu (PostgreSQL, SQL Server), phân tích nhật ký Azure Monitor với KQL, tích hợp Cosmos DB và nhiều thứ khác nữa.

**Tại sao nó hữu ích**: Ngoài việc quản lý các tài nguyên Azure, máy chủ này cải thiện đáng kể chất lượng mã khi làm việc với SDK Azure. Khi sử dụng Azure MCP ở chế độ Agent, nó không chỉ giúp bạn viết mã – mà còn giúp bạn viết mã Azure *tốt hơn* theo đúng mẫu xác thực hiện tại, các thực hành xử lý lỗi tốt nhất và tận dụng các tính năng SDK mới nhất. Thay vì nhận mã chung chung có thể hoạt động, bạn nhận được mã tuân theo các mẫu khuyến nghị của Azure cho các tải công việc sản xuất.

**Các mô-đun chính bao gồm**:
- **🗄️ Trình Kết Nối Cơ Sở Dữ Liệu**: Truy cập ngôn ngữ tự nhiên trực tiếp đến Azure Database for PostgreSQL và SQL Server
- **📊 Azure Monitor**: Phân tích nhật ký và thông tin vận hành được cung cấp bởi KQL
- **🌐 Quản Lý Tài Nguyên**: Quản lý vòng đời toàn diện tài nguyên Azure
- **🔐 Xác Thực**: Các mẫu DefaultAzureCredential và managed identity
- **📦 Dịch Vụ Lưu Trữ**: Các thao tác với Blob Storage, Queue Storage và Table Storage
- **🚀 Dịch Vụ Container**: Quản lý Azure Container Apps, Container Instances và AKS
- **Và còn nhiều trình kết nối chuyên biệt khác**

**Sử dụng thực tế**: "Liệt kê các tài khoản lưu trữ Azure của tôi", "Truy vấn không gian làm việc Log Analytics của tôi để tìm lỗi trong giờ vừa qua", hoặc "Giúp tôi xây dựng ứng dụng Azure sử dụng Node.js với xác thực đúng cách"

**Kịch bản demo đầy đủ**: Đây là một hướng dẫn hoàn chỉnh cho thấy sức mạnh của việc kết hợp Azure MCP với phần mở rộng GitHub Copilot cho Azure trong VS Code. Khi bạn đã cài đặt cả hai và gõ:

> "Tạo một script Python tải lên một tệp đến Azure Blob Storage sử dụng xác thực DefaultAzureCredential. Script nên kết nối với tài khoản lưu trữ Azure của tôi tên là 'mycompanystorage', tải lên container 'documents', tạo một tệp thử nghiệm với dấu thời gian hiện tại để tải lên, xử lý lỗi một cách tinh tế và hiển thị thông báo rõ ràng, tuân theo các thực hành tốt nhất về xác thực và xử lý lỗi của Azure, bao gồm các chú thích giải thích cách xác thực DefaultAzureCredential hoạt động, và làm cho script có cấu trúc tốt với hàm và tài liệu phù hợp."

Azure MCP Server sẽ tạo ra một script Python hoàn chỉnh, sẵn sàng sản xuất mà:
- Sử dụng SDK Azure Blob Storage mới nhất với các mẫu bất đồng bộ chuẩn
- Triển khai DefaultAzureCredential với giải thích chi tiết về chuỗi dự phòng
- Bao gồm xử lý lỗi mạnh mẽ với các loại ngoại lệ Azure cụ thể
- Tuân theo các thực hành tốt nhất của Azure SDK cho quản lý tài nguyên và kết nối
- Cung cấp đăng nhập chi tiết và đầu ra console rõ ràng
- Tạo một script có cấu trúc tốt với hàm, tài liệu và gợi ý kiểu

Điều làm nên sự đặc biệt là nếu không có Azure MCP, bạn có thể nhận được mã blob storage chung chung có thể hoạt động nhưng không tuân theo các mẫu hiện tại của Azure. Với Azure MCP, bạn nhận được mã sử dụng các phương pháp xác thực mới nhất, xử lý các tình huống lỗi đặc thù của Azure và tuân theo các thực hành Microsoft khuyến nghị cho ứng dụng sản xuất.

**Ví dụ nổi bật**: Tôi từng gặp khó khăn khi phải nhớ các lệnh cụ thể của `az` và `azd` cho việc sử dụng linh hoạt. Luôn là quy trình hai bước với tôi: tra cứu cú pháp rồi chạy lệnh. Tôi thường phải vào portal và click để làm việc vì không muốn thừa nhận mình không nhớ cú pháp CLI. Có thể mô tả bằng ngôn ngữ tự nhiên những gì mình muốn là điều tuyệt vời, và còn tuyệt hơn khi có thể làm điều đó trong IDE của mình!

Có một danh sách tuyệt vời các trường hợp sử dụng trong [kho Azure MCP](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server) để bạn bắt đầu. Để có hướng dẫn cấu hình toàn diện và các tùy chọn cấu hình nâng cao, hãy xem [tài liệu chính thức Azure MCP](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Nó làm gì**: Máy chủ GitHub MCP chính thức cung cấp tích hợp liền mạch với toàn bộ hệ sinh thái GitHub, cung cấp cả truy cập từ xa được lưu trữ và tùy chọn triển khai Docker cục bộ. Đây không chỉ là các thao tác kho cơ bản – mà là một bộ công cụ toàn diện bao gồm quản lý GitHub Actions, quy trình pull request, theo dõi issue, quét bảo mật, thông báo và khả năng tự động hóa nâng cao.

**Tại sao nó hữu ích**: Máy chủ này chuyển đổi cách bạn tương tác với GitHub bằng cách đưa toàn bộ trải nghiệm nền tảng trực tiếp vào môi trường phát triển của bạn. Thay vì phải liên tục chuyển đổi giữa VS Code và GitHub.com để quản lý dự án, xem xét mã và giám sát CI/CD, bạn có thể xử lý mọi thứ qua các lệnh ngôn ngữ tự nhiên mà vẫn tập trung vào mã của mình.

> **ℹ️ Lưu ý: Các loại 'Agent' khác nhau**
> 
> Đừng nhầm lẫn GitHub MCP Server này với GitHub Coding Agent (agent AI bạn có thể gán issue để thực hiện tác vụ mã hóa tự động). GitHub MCP Server làm việc trong chế độ Agent của VS Code để cung cấp tích hợp API GitHub, trong khi GitHub Coding Agent là một tính năng riêng biệt tạo pull requests khi được gán cho các issue trên GitHub.

**Các khả năng chính bao gồm**:
- **⚙️ GitHub Actions**: Quản lý pipeline CI/CD hoàn chỉnh, giám sát workflow và xử lý artifact
- **🔀 Pull Requests**: Tạo, xem xét, hợp nhất và quản lý PR với theo dõi trạng thái toàn diện
- **🐛 Issues**: Quản lý vòng đời issue đầy đủ, bình luận, gán nhãn và phân công
- **🔒 Bảo mật**: Cảnh báo quét mã, phát hiện bí mật, và tích hợp Dependabot
- **🔔 Thông báo**: Quản lý thông báo thông minh và điều khiển đăng ký kho
- **📁 Quản lý Kho**: Thao tác tệp, quản lý nhánh và quản trị kho
- **👥 Hợp tác**: Tìm kiếm người dùng và tổ chức, quản lý nhóm và kiểm soát truy cập

**Sử dụng thực tế**: "Tạo pull request từ nhánh tính năng của tôi", "Hiển thị tất cả các lần chạy CI thất bại trong tuần này", "Liệt kê các cảnh báo bảo mật mở cho các kho của tôi", hoặc "Tìm tất cả các issue được phân công cho tôi trong tất cả các tổ chức của tôi"

**Kịch bản demo đầy đủ**: Đây là một luồng công việc mạnh mẽ thể hiện khả năng của GitHub MCP Server:

> "Tôi cần chuẩn bị cho buổi đánh giá sprint. Hiển thị tất cả pull request tôi đã tạo tuần này, kiểm tra trạng thái pipeline CI/CD của chúng ta, tạo bản tóm tắt các cảnh báo bảo mật cần xử lý, và giúp tôi soạn ghi chú phát hành dựa trên các PR đã được merge có nhãn 'feature'."

GitHub MCP Server sẽ:
- Truy vấn các pull request gần đây với thông tin trạng thái chi tiết
- Phân tích các lần chạy workflow và làm nổi bật các lỗi hoặc vấn đề hiệu suất
- Tổng hợp kết quả quét bảo mật và ưu tiên cảnh báo nghiêm trọng
- Tạo ghi chú phát hành toàn diện bằng cách trích xuất thông tin từ các PR đã được merge
- Cung cấp các bước tiếp theo có thể hành động cho lập kế hoạch sprint và chuẩn bị phát hành

**Ví dụ nổi bật**: Tôi rất thích sử dụng nó cho quy trình xem xét mã. Thay vì nhảy qua lại giữa VS Code, thông báo GitHub và trang pull request, tôi có thể nói "Hiển thị tất cả PR đang chờ tôi xem xét" rồi "Thêm bình luận vào PR #123 hỏi về xử lý lỗi trong phương thức xác thực." Máy chủ sẽ xử lý các cuộc gọi API GitHub, duy trì ngữ cảnh về cuộc thảo luận, và thậm chí giúp tôi soạn các nhận xét xem xét mang tính xây dựng hơn.

**Tùy chọn xác thực**: Máy chủ hỗ trợ cả OAuth (liền mạch trong VS Code) và Personal Access Tokens, với bộ công cụ có thể cấu hình để chỉ bật các tính năng GitHub bạn cần. Bạn có thể chạy nó như một dịch vụ lưu trữ từ xa để cấu hình nhanh hoặc cục bộ qua Docker để kiểm soát hoàn toàn.

> **💡 Mẹo chuyên gia**
> 
> Chỉ bật các bộ công cụ bạn cần bằng cách cấu hình tham số `--toolsets` trong cài đặt máy chủ MCP để giảm kích thước ngữ cảnh và cải thiện lựa chọn công cụ AI. Ví dụ, thêm `"--toolsets", "repos,issues,pull_requests,actions"` vào các arg cấu hình MCP cho các workflow phát triển chính, hoặc dùng `"--toolsets", "notifications, security"` nếu bạn chủ yếu muốn khả năng giám sát GitHub.
### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Nó làm gì**: Kết nối với dịch vụ Azure DevOps để quản lý dự án toàn diện, theo dõi công việc, quản lý pipeline xây dựng và các thao tác kho.

**Tại sao nó hữu ích**: Với các nhóm sử dụng Azure DevOps làm nền tảng DevOps chính, máy chủ MCP này giúp loại bỏ việc phải chuyển đổi liên tục giữa môi trường phát triển và giao diện web Azure DevOps. Bạn có thể quản lý công việc, kiểm tra trạng thái build, truy vấn kho và xử lý các tác vụ quản lý dự án trực tiếp từ trợ lý AI của mình.

**Sử dụng thực tế**: "Hiển thị tất cả các công việc đang hoạt động trong sprint hiện tại của dự án WebApp", "Tạo báo cáo lỗi cho vấn đề đăng nhập tôi vừa phát hiện", hoặc "Kiểm tra trạng thái pipeline xây dựng và hiển thị các lần thất bại gần đây"

**Ví dụ nổi bật**: Bạn có thể dễ dàng kiểm tra trạng thái sprint hiện tại của nhóm bằng truy vấn đơn giản như "Hiển thị tất cả công việc đang hoạt động trong sprint hiện tại của dự án WebApp" hoặc "Tạo báo cáo lỗi cho vấn đề đăng nhập tôi vừa phát hiện" mà không cần rời khỏi môi trường phát triển.

### 5. 📝 MarkItDown MCP Server
[![Cài đặt trong VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Cài đặt trong VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Nó làm gì**: MarkItDown là một máy chủ chuyển đổi tài liệu toàn diện, chuyển đổi nhiều định dạng tệp khác nhau thành Markdown chất lượng cao, tối ưu cho việc tiêu thụ LLM và các quy trình phân tích văn bản.

**Tại sao nó hữu ích**: Thiết yếu cho các quy trình làm việc tài liệu hiện đại! MarkItDown xử lý một phạm vi ấn tượng các định dạng tệp đồng thời giữ nguyên cấu trúc tài liệu quan trọng như tiêu đề, danh sách, bảng và liên kết. Khác với các công cụ trích xuất văn bản đơn giản, nó tập trung duy trì ý nghĩa ngữ nghĩa và định dạng giá trị cho cả xử lý AI và khả năng đọc của con người.

**Định dạng tệp được hỗ trợ**:
- **Tài liệu Office**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **Tệp phương tiện**: Hình ảnh (có siêu dữ liệu EXIF và OCR), Âm thanh (có siêu dữ liệu EXIF và chuyển đổi giọng nói thành văn bản)
- **Nội dung web**: HTML, nguồn cấp RSS, URL YouTube, trang Wikipedia
- **Định dạng dữ liệu**: CSV, JSON, XML, tệp ZIP (xử lý nội dung đệ quy)
- **Định dạng xuất bản**: EPub, sổ tay Jupyter (.ipynb)
- **Email**: Tin nhắn Outlook (.msg)
- **Nâng cao**: Tích hợp Azure Document Intelligence để xử lý PDF nâng cao

**Khả năng nâng cao**: MarkItDown hỗ trợ mô tả hình ảnh do LLM cung cấp (khi có khách hàng OpenAI), Azure Document Intelligence để xử lý PDF nâng cao, chuyển đổi âm thanh thành văn bản cho nội dung giọng nói, và hệ thống plugin để mở rộng sang các định dạng tệp bổ sung.

**Ứng dụng thực tế**: "Chuyển đổi bài thuyết trình PowerPoint này sang Markdown cho trang tài liệu của chúng ta", "Trích xuất văn bản từ PDF này với cấu trúc tiêu đề chính xác", hoặc "Biến bảng tính Excel này thành định dạng bảng dễ đọc"

**Ví dụ nổi bật**: Trích từ [tài liệu MarkItDown](https://github.com/microsoft/markitdown#why-markdown):

> Markdown rất gần với văn bản thuần túy, với đánh dấu hoặc định dạng tối thiểu, nhưng vẫn cung cấp cách biểu diễn cấu trúc tài liệu quan trọng. Các LLM phổ biến, chẳng hạn như GPT-4o của OpenAI, bản thân chúng "nói" Markdown, và thường nhập Markdown vào phản hồi của chúng mà không cần gợi ý. Điều này cho thấy chúng đã được huấn luyện trên lượng lớn văn bản định dạng Markdown và hiểu nó rất tốt. Một lợi ích phụ nữa là các quy ước Markdown cũng rất tiết kiệm token.

MarkItDown thực sự giỏi giữ nguyên cấu trúc tài liệu, điều quan trọng cho các quy trình AI. Ví dụ, khi chuyển đổi bài thuyết trình PowerPoint, nó giữ tổ chức các trang chiếu với các tiêu đề chính xác, trích xuất bảng dưới dạng bảng Markdown, thêm văn bản thay thế cho hình ảnh, thậm chí xử lý ghi chú người trình bày. Biểu đồ được chuyển thành bảng dữ liệu dễ đọc, và Markdown kết quả giữ được luồng logic của bản trình bày gốc. Điều này làm cho nó hoàn hảo để đưa nội dung trình bày vào hệ thống AI hoặc tạo tài liệu từ các trang chiếu hiện có.
### 6. 🗃️ SQL Server MCP Server

[![Cài đặt trong VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Cài đặt trong VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Nó làm gì**: Cung cấp truy cập đối thoại đến cơ sở dữ liệu SQL Server (tại chỗ, Azure SQL hoặc Fabric)

**Tại sao nó hữu ích**: Tương tự như máy chủ PostgreSQL nhưng dành cho hệ sinh thái Microsoft SQL. Kết nối với chuỗi kết nối đơn giản và bắt đầu truy vấn bằng ngôn ngữ tự nhiên – không cần phải chuyển đổi ngữ cảnh nữa!

**Ứng dụng thực tế**: "Tìm tất cả đơn đặt hàng chưa được hoàn thành trong 30 ngày qua" được dịch sang các truy vấn SQL phù hợp và trả về kết quả đã định dạng

**Ví dụ nổi bật**: Khi bạn thiết lập kết nối cơ sở dữ liệu, bạn có thể bắt đầu trò chuyện với dữ liệu ngay lập tức. Bài đăng trên blog minh họa điều này với câu hỏi đơn giản: "Bạn đang kết nối vào cơ sở dữ liệu nào?" Máy chủ MCP trả lời bằng cách gọi công cụ cơ sở dữ liệu phù hợp, kết nối tới phiên bản SQL Server của bạn, và trả về thông tin chi tiết về kết nối cơ sở dữ liệu hiện tại – tất cả mà không cần viết một dòng SQL nào. Máy chủ hỗ trợ các thao tác cơ sở dữ liệu toàn diện từ quản lý lược đồ tới thao tác dữ liệu, tất cả thông qua các lệnh ngôn ngữ tự nhiên. Để xem hướng dẫn thiết lập đầy đủ và ví dụ cấu hình với VS Code và Claude Desktop, xem: [Giới thiệu MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).


### 7. 🎭 Playwright MCP Server

[![Cài đặt trong VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Cài đặt trong VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Nó làm gì**: Cho phép các tác nhân AI tương tác với các trang web để kiểm thử và tự động hóa

> **ℹ️ Hỗ trợ GitHub Copilot**
> 
> Playwright MCP Server là nguồn năng lượng cho Tác nhân Lập trình của GitHub Copilot, cung cấp khả năng duyệt web! [Tìm hiểu thêm về tính năng này](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Tại sao nó hữu ích**: Hoàn hảo cho kiểm thử tự động dựa trên mô tả bằng ngôn ngữ tự nhiên. AI có thể điều hướng trang web, điền biểu mẫu, và trích xuất dữ liệu qua các ảnh chụp truy cập có cấu trúc – đây là một công cụ cực kỳ mạnh mẽ!

**Ứng dụng thực tế**: "Kiểm thử quy trình đăng nhập và xác nhận bảng điều khiển tải đúng" hoặc "Tạo một bài kiểm thử tìm kiếm sản phẩm và xác thực trang kết quả" – tất cả mà không cần source code ứng dụng

**Ví dụ nổi bật**: Đồng nghiệp tôi, Debbie O'Brien, gần đây đã làm rất tốt với Playwright MCP Server! Ví dụ, cô ấy đã chứng minh cách tạo các bài kiểm thử Playwright hoàn chỉnh mà không cần quyền truy cập mã nguồn ứng dụng. Trong kịch bản của cô, cô yêu cầu Copilot tạo kiểm thử cho ứng dụng tìm kiếm phim: điều hướng đến trang, tìm "Garfield," và xác nhận phim xuất hiện trong kết quả. MCP đã khởi tạo phiên trình duyệt, khám phá cấu trúc trang qua ảnh chụp DOM, xác định bộ chọn phù hợp, và tạo bài kiểm thử TypeScript chạy thành công ngay lần đầu.

Điều làm nên sức mạnh là kết nối giữa hướng dẫn ngôn ngữ tự nhiên và mã kiểm thử có thể thực thi. Cách truyền thống đòi hỏi viết kiểm thử thủ công hoặc quyền truy cập mã để có bối cảnh. Nhưng với Playwright MCP, bạn có thể kiểm thử các trang web ngoài, ứng dụng client, hoặc làm kiểm thử hộp đen khi không có quyền truy cập mã.


### 8. 💻 Dev Box MCP Server

[![Cài đặt trong VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Cài đặt trong VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Nó làm gì**: Quản lý các môi trường Microsoft Dev Box qua ngôn ngữ tự nhiên

**Tại sao nó hữu ích**: Đơn giản hóa việc quản lý môi trường phát triển đến mức tối đa! Tạo, cấu hình và quản lý môi trường phát triển mà không cần nhớ các lệnh cụ thể.

**Ứng dụng thực tế**: "Thiết lập một Dev Box mới với SDK .NET mới nhất và cấu hình cho dự án của chúng ta", "Kiểm tra trạng thái tất cả môi trường phát triển của tôi", hoặc "Tạo môi trường demo chuẩn hóa cho các buổi thuyết trình nhóm"

**Ví dụ nổi bật**: Tôi là một fan lớn của việc dùng Dev Box cho phát triển cá nhân. Khoảnh khắc khai sáng của tôi là khi James Montemagno giải thích Dev Box tuyệt vời thế nào cho các buổi demo hội thảo, vì nó có kết nối ethernet siêu nhanh bất kể tôi đang dùng wifi hội thảo, khách sạn hay điểm phát sóng điện thoại khi đó. Thậm chí gần đây tôi đã tập luyện demo hội thảo trong khi laptop kết nối hotspot điện thoại trên xe buýt từ Bruges đến Antwerp! Bước tiếp theo của tôi là tìm hiểu thêm về quản lý nhóm nhiều môi trường phát triển và môi trường demo chuẩn hóa. Một trường hợp sử dụng lớn khác tôi nghe từ khách hàng và đồng nghiệp là dùng Dev Box cho môi trường phát triển tiền cấu hình. Trong cả hai trường hợp, dùng MCP để cấu hình và quản lý Dev Box cho phép tương tác bằng ngôn ngữ tự nhiên, đồng thời vẫn giữ trong môi trường phát triển của bạn.

### 9. 🤖 Microsoft Foundry MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Điều nó làm**: Microsoft Foundry MCP Server cung cấp cho các nhà phát triển quyền truy cập toàn diện vào hệ sinh thái AI của Azure, bao gồm danh mục mô hình, quản lý triển khai, đánh chỉ mục kiến thức với Azure AI Search và các công cụ đánh giá. Máy chủ thử nghiệm này là cầu nối giữa phát triển AI và cơ sở hạ tầng AI mạnh mẽ của Azure, giúp việc xây dựng, triển khai và đánh giá các ứng dụng AI trở nên dễ dàng hơn.

**Tại sao nó hữu ích**: Máy chủ này thay đổi cách bạn làm việc với các dịch vụ AI của Azure bằng cách đưa các khả năng AI cấp doanh nghiệp trực tiếp vào quy trình phát triển của bạn. Thay vì phải chuyển đổi giữa cổng Azure, tài liệu và IDE, bạn có thể khám phá mô hình, triển khai dịch vụ, quản lý cơ sở kiến thức và đánh giá hiệu suất AI thông qua các lệnh ngôn ngữ tự nhiên. Nó đặc biệt mạnh mẽ cho các nhà phát triển xây dựng ứng dụng RAG (Retrieval-Augmented Generation), quản lý triển khai đa mô hình hoặc triển khai pipeline đánh giá AI toàn diện.

**Các khả năng chính dành cho nhà phát triển**:
- **🔍 Khám Phá & Triển Khai Mô Hình**: Khám phá danh mục mô hình của Microsoft Foundry, xem thông tin chi tiết kèm mẫu mã, và triển khai mô hình tới các dịch vụ Azure AI
- **📚 Quản Lý Kiến Thức**: Tạo và quản lý các chỉ mục Azure AI Search, thêm tài liệu, cấu hình indexer, và xây dựng hệ thống RAG phức tạp
- **⚡ Tích Hợp AI Agent**: Kết nối với các Azure AI Agent, truy vấn các agent hiện có, và đánh giá hiệu suất agent trong các tình huống sản xuất
- **📊 Khung Đánh Giá**: Thực hiện các đánh giá văn bản và agent toàn diện, tạo báo cáo markdown, và triển khai kiểm soát chất lượng cho ứng dụng AI
- **🚀 Công Cụ Prototyping**: Nhận hướng dẫn thiết lập cho prototyping dựa trên GitHub và truy cập Microsoft Foundry Labs để nghiên cứu các mô hình tiên tiến

**Sử dụng thực tế cho nhà phát triển**: "Triển khai mô hình Phi-4 đến Azure AI Services cho ứng dụng của tôi", "Tạo một chỉ mục tìm kiếm mới cho hệ thống RAG tài liệu của tôi", "Đánh giá các phản hồi của agent so với các chỉ số chất lượng", hoặc "Tìm mô hình suy luận tốt nhất cho các nhiệm vụ phân tích phức tạp của tôi"

**Kịch bản demo đầy đủ**: Đây là quy trình làm việc phát triển AI mạnh mẽ:

> "Tôi đang xây dựng một agent hỗ trợ khách hàng. Giúp tôi tìm một mô hình suy luận tốt trong danh mục, triển khai nó lên Azure AI Services, tạo một cơ sở kiến thức từ tài liệu của chúng tôi, thiết lập khung đánh giá để kiểm tra chất lượng phản hồi, và sau đó giúp tôi prototype tích hợp với token GitHub để thử nghiệm."

Microsoft Foundry MCP Server sẽ:
- Truy vấn danh mục mô hình để đề xuất các mô hình suy luận tối ưu dựa trên yêu cầu của bạn
- Cung cấp lệnh triển khai và thông tin hạn mức cho vùng Azure bạn ưu tiên
- Thiết lập các chỉ mục Azure AI Search với schema phù hợp cho tài liệu của bạn
- Cấu hình pipeline đánh giá với các chỉ số chất lượng và kiểm tra an toàn
- Tạo mã prototyping với xác thực GitHub để thử nghiệm ngay lập tức
- Cung cấp hướng dẫn thiết lập toàn diện phù hợp với stack công nghệ cụ thể của bạn

**Ví dụ nổi bật**: Là một nhà phát triển, tôi đã khá vất vả để theo kịp các mô hình LLM khác nhau hiện có. Tôi biết một vài mô hình chính, nhưng luôn cảm thấy mất mát khả năng tăng năng suất và hiệu quả. Token và hạn mức cũng gây áp lực và khó quản lý – tôi không bao giờ chắc mình chọn mô hình đúng cho nhiệm vụ hay đang tiêu hao ngân sách một cách lãng phí. Tôi vừa nghe về MCP Server này từ James Montemagno khi hỏi đồng đội về các đề xuất MCP Server cho bài viết này, và tôi rất hào hứng sử dụng nó! Khả năng khám phá mô hình trông đặc biệt ấn tượng với người như tôi muốn khám phá ngoài những mô hình phổ biến và tìm các mô hình được tối ưu cho các nhiệm vụ cụ thể. Khung đánh giá sẽ giúp tôi xác nhận tôi thực sự có được kết quả tốt hơn, chứ không chỉ thử nghiệm cho có.

> **ℹ️ Tình trạng Thử nghiệm**
> 
> Máy chủ MCP này đang ở trạng thái thử nghiệm và đang được phát triển tích cực. Tính năng và API có thể thay đổi. Phù hợp để khám phá khả năng AI của Azure và xây dựng prototype, nhưng hãy kiểm tra tính ổn định cho sử dụng sản xuất.
### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Điều nó làm**: Cung cấp cho các nhà phát triển các công cụ thiết yếu để xây dựng các agent AI và ứng dụng tích hợp với Microsoft 365 và Microsoft 365 Copilot, bao gồm xác thực schema, truy xuất mã mẫu và hỗ trợ khắc phục sự cố.

**Tại sao nó hữu ích**: Xây dựng cho Microsoft 365 và Copilot liên quan đến các schema manifest phức tạp và các mẫu phát triển đặc thù. Máy chủ MCP này mang các tài nguyên phát triển thiết yếu trực tiếp vào môi trường mã hóa của bạn, giúp bạn xác thực schema, tìm mã mẫu và khắc phục các vấn đề phổ biến mà không phải liên tục tham khảo tài liệu.

**Sử dụng thực tế**: "Xác thực manifest declarative của agent và sửa lỗi schema", "Cho tôi xem mã mẫu để triển khai plugin Microsoft Graph API", hoặc "Giúp tôi khắc phục sự cố xác thực ứng dụng Teams"

**Ví dụ nổi bật**: Tôi đã liên hệ với bạn tôi John Miller sau khi trò chuyện với anh ấy tại Build về M365 Agents, và anh ấy đã giới thiệu MCP này. Đây có thể là công cụ tuyệt vời cho các nhà phát triển mới làm quen với M365 Agents vì nó cung cấp mẫu, mã ví dụ và scaffolding để bắt đầu mà không bị ngập trong tài liệu. Tính năng xác thực schema trông đặc biệt hữu ích để tránh lỗi cấu trúc manifest gây tốn nhiều giờ gỡ lỗi.

> **💡 Mẹo Chuyên nghiệp**
> 
> Sử dụng máy chủ này cùng với Microsoft Learn Docs MCP Server để có hỗ trợ phát triển M365 toàn diện – một bên cung cấp tài liệu chính thức trong khi bên còn lại cung cấp công cụ phát triển thực tế và hỗ trợ khắc phục sự cố.


## Tiếp theo là gì? 🔮

## 📋 Kết luận

Model Context Protocol (MCP) đang thay đổi cách các nhà phát triển tương tác với trợ lý AI và các công cụ bên ngoài. 10 máy chủ Microsoft MCP này minh họa sức mạnh của tích hợp AI theo chuẩn hóa, cho phép quy trình làm việc mượt mà giúp các nhà phát triển duy trì trạng thái tập trung đồng thời truy cập các khả năng bên ngoài mạnh mẽ.

Từ việc tích hợp toàn diện hệ sinh thái Azure đến các công cụ chuyên biệt như Playwright cho tự động hóa trình duyệt và MarkItDown để xử lý tài liệu, các máy chủ này thể hiện cách MCP có thể nâng cao năng suất trong nhiều kịch bản phát triển đa dạng. Giao thức chuẩn hóa đảm bảo các công cụ này hoạt động phối hợp mượt mà, tạo ra trải nghiệm phát triển liền mạch.

Khi hệ sinh thái MCP tiếp tục phát triển, việc giữ liên lạc với cộng đồng, khám phá máy chủ mới và xây dựng giải pháp tùy chỉnh sẽ là chìa khóa để tối đa hóa năng suất phát triển của bạn. Tính chất chuẩn mở của MCP cho phép bạn kết hợp công cụ từ nhiều nhà cung cấp khác nhau để tạo ra quy trình làm việc hoàn hảo cho nhu cầu cụ thể của mình.

## 🔗 Tài nguyên bổ sung

- [Kho Microsoft MCP chính thức](https://github.com/microsoft/mcp)
- [Cộng đồng & Tài liệu MCP](https://modelcontextprotocol.io/introduction)
- [Tài liệu MCP cho VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Tài liệu MCP cho Visual Studio](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Tài liệu MCP trên Azure](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – Sự kiện MCP](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot Customizations](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days Live 29th/30th July hoặc xem theo yêu cầu](https://aka.ms/mcpdevdays)

## 🎯 Bài tập

1. **Cài đặt và Cấu hình**: Thiết lập một trong các máy chủ MCP trong môi trường VS Code của bạn và thử chức năng cơ bản.
2. **Tích hợp Quy trình làm việc**: Thiết kế một quy trình phát triển kết hợp ít nhất ba máy chủ MCP khác nhau.
3. **Lập Kế hoạch Máy Chủ Tùy Chỉnh**: Xác định một nhiệm vụ trong thói quen phát triển hàng ngày có thể được cải thiện với một máy chủ MCP tùy chỉnh và tạo bản đặc tả cho nó.
4. **Phân tích Hiệu suất**: So sánh hiệu quả của việc sử dụng các máy chủ MCP so với cách tiếp cận truyền thống cho các nhiệm vụ phổ biến trong phát triển.
5. **Đánh giá An ninh**: Đánh giá các tác động an ninh khi sử dụng máy chủ MCP trong môi trường phát triển và đề xuất các thực hành tốt nhất.


Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->