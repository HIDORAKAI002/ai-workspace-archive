# Tinh giản quy trình làm việc AI: Xây dựng máy chủ MCP với Bộ công cụ Microsoft Foundry

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/vi/logo.ec93918ec338dadd.webp)

## 🎯 Tổng quan

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/vi/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Nhấp vào hình ảnh trên để xem video bài học này)_

Chào mừng đến với **Workshop Giao thức Ngữ cảnh Mô hình (MCP)**! Workshop thực hành toàn diện này kết hợp hai công nghệ tiên tiến để cách mạng hóa phát triển ứng dụng AI:

- **🔗 Giao thức Ngữ cảnh Mô hình (MCP)**: Chuẩn mở cho tích hợp công cụ AI liền mạch
- **🛠️ Tiện ích Bộ công cụ Microsoft Foundry cho VS Code**: Tiện ích phát triển AI mạnh mẽ của Microsoft

### 🎓 Bạn sẽ học được gì

Kết thúc workshop này, bạn sẽ thành thạo nghệ thuật xây dựng các ứng dụng thông minh kết nối mô hình AI với công cụ và dịch vụ thực tế. Từ kiểm thử tự động đến tích hợp API tùy chỉnh, bạn sẽ có kỹ năng thực tiễn để giải quyết các thách thức kinh doanh phức tạp.

## 🏗️ Ngăn xếp công nghệ

### 🔌 Giao thức Ngữ cảnh Mô hình (MCP)

MCP là **"USB-C cho AI"** - một chuẩn phổ quát kết nối mô hình AI với công cụ và nguồn dữ liệu bên ngoài.

**✨ Tính năng chính:**

- 🔄 **Tích hợp tiêu chuẩn hóa**: Giao diện phổ quát cho kết nối công cụ AI
- 🏛️ **Kiến trúc linh hoạt**: Máy chủ cục bộ & từ xa qua stdio/SSE transport
- 🧰 **Hệ sinh thái phong phú**: Công cụ, lời nhắc, và tài nguyên trong một giao thức
- 🔒 **Sẵn sàng doanh nghiệp**: Bảo mật và độ tin cậy tích hợp

**🎯 Tại sao MCP quan trọng:**
Giống như USB-C đã loại bỏ sự rối loạn của dây cáp, MCP loại bỏ sự phức tạp trong tích hợp AI. Một giao thức, vô tận khả năng.

### 🤖 Tiện ích Bộ công cụ Microsoft Foundry cho VS Code

Tiện ích phát triển AI chủ lực của Microsoft biến VS Code thành cỗ máy AI mạnh mẽ.

**🚀 Khả năng cốt lõi:**

- 📦 **Danh mục mô hình**: Truy cập mô hình từ Azure AI, GitHub, Hugging Face, Ollama
- ⚡ **Suy luận cục bộ**: Thực thi CPU/GPU/NPU tối ưu ONNX
- 🏗️ **Trình xây dựng tác nhân**: Phát triển tác nhân AI trực quan với tích hợp MCP
- 🎭 **Đa phương thức**: Hỗ trợ văn bản, thị giác, và đầu ra cấu trúc

**💡 Lợi ích phát triển:**

- Triển khai mô hình không cần cấu hình
- Kỹ thuật tạo lời nhắc trực quan
- Sân chơi kiểm thử thời gian thực
- Tích hợp máy chủ MCP mượt mà

## 📚 Hành trình học tập

### [🚀 Module 1: Cơ bản về Bộ công cụ Microsoft Foundry](./lab1/README.md)

**Thời lượng**: 15 phút

- 🛠️ Cài đặt và cấu hình Bộ công cụ Microsoft Foundry cho VS Code
- 🗂️ Khám phá Danh mục mô hình (hơn 100 mô hình từ GitHub, ONNX, OpenAI, Anthropic, Google)
- 🎮 Làm chủ Sân chơi Tương tác để kiểm thử mô hình thời gian thực
- 🤖 Xây dựng tác nhân AI đầu tiên với Trình xây dựng tác nhân
- 📊 Đánh giá hiệu năng mô hình với các chỉ số tích hợp (F1, mức liên quan, sự tương đồng, độ mạch lạc)
- ⚡ Học xử lý theo lô và khả năng hỗ trợ đa phương thức

**🎯 Kết quả học tập**: Tạo tác nhân AI có chức năng với hiểu biết toàn diện về khả năng của Bộ công cụ Microsoft Foundry

### [🌐 Module 2: MCP với Bộ công cụ Microsoft Foundry cơ bản](./lab2/README.md)

**Thời lượng**: 20 phút

- 🧠 Làm chủ kiến trúc và khái niệm Giao thức Ngữ cảnh Mô hình (MCP)
- 🌐 Khám phá hệ sinh thái máy chủ MCP của Microsoft
- 🤖 Xây dựng tác nhân tự động hóa trình duyệt dùng máy chủ MCP Playwright
- 🔧 Tích hợp máy chủ MCP với Trình xây dựng tác nhân của Microsoft Foundry Toolkit
- 📊 Cấu hình và kiểm thử công cụ MCP trong tác nhân của bạn
- 🚀 Xuất và triển khai tác nhân sử dụng MCP vào sản xuất

**🎯 Kết quả học tập**: Triển khai tác nhân AI được tăng cường bởi công cụ bên ngoài thông qua MCP

### [🔧 Module 3: Phát triển MCP nâng cao với Bộ công cụ Microsoft Foundry](./lab3/README.md)

**Thời lượng**: 20 phút

- 💻 Tạo máy chủ MCP tùy chỉnh sử dụng Bộ công cụ Microsoft Foundry
- 🐍 Cấu hình và sử dụng SDK MCP Python mới nhất (v1.9.3)
- 🔍 Thiết lập và dùng MCP Inspector để gỡ lỗi
- 🛠️ Xây dựng Máy chủ MCP Thời tiết với quy trình gỡ lỗi chuyên nghiệp
- 🧪 Gỡ lỗi máy chủ MCP trong cả môi trường Agent Builder và Inspector

**🎯 Kết quả học tập**: Phát triển và gỡ lỗi máy chủ MCP tùy chỉnh với bộ công cụ hiện đại

### [🐙 Module 4: Phát triển MCP thực tiễn - Máy chủ GitHub Clone tùy chỉnh](./lab4/README.md)

**Thời lượng**: 30 phút

- 🏗️ Xây dựng máy chủ MCP GitHub Clone thực tế cho quy trình phát triển
- 🔄 Triển khai nhân bản kho thông minh với xác thực và xử lý lỗi
- 📁 Tạo quản lý thư mục thông minh và tích hợp VS Code
- 🤖 Sử dụng GitHub Copilot ở chế độ tác nhân với công cụ MCP tùy chỉnh
- 🛡️ Áp dụng độ tin cậy sẵn sàng sản xuất và tương thích đa nền tảng

**🎯 Kết quả học tập**: Triển khai máy chủ MCP sẵn sàng sản xuất, tinh giản quy trình làm việc phát triển thực tế

## 💡 Ứng dụng thực tế & Tác động

### 🏢 Tình huống sử dụng doanh nghiệp

#### 🔄 Tự động hóa DevOps

Chuyển đổi quy trình phát triển với tự động hóa thông minh:

- **Quản lý kho thông minh**: Đánh giá mã và quyết định hợp nhất bằng AI
- **CI/CD thông minh**: Tối ưu hóa pipeline tự động dựa trên thay đổi mã
- **Phân loại sự cố**: Tự động phân loại và phân công lỗi

#### 🧪 Cách mạng Đảm bảo Chất lượng

Nâng tầm kiểm thử với tự động hóa và AI:

- **Tạo kịch bản kiểm thử thông minh**: Tạo bộ kiểm thử toàn diện tự động
- **Kiểm thử hồi quy hình ảnh**: Phát hiện thay đổi giao diện bằng AI
- **Giám sát hiệu năng**: Phát hiện và xử lý sự cố chủ động

#### 📊 Trí thông minh quy trình dữ liệu

Xây dựng quy trình xử lý dữ liệu thông minh hơn:

- **Quy trình ETL thích ứng**: Tự tối ưu biến đổi dữ liệu
- **Phát hiện bất thường**: Giám sát chất lượng dữ liệu thời gian thực
- **Định tuyến thông minh**: Quản lý luồng dữ liệu hiệu quả

#### 🎧 Nâng cao trải nghiệm khách hàng

Tạo tương tác khách hàng xuất sắc:

- **Hỗ trợ thông minh theo ngữ cảnh**: Tác nhân AI truy cập lịch sử khách hàng
- **Giải quyết chủ động sự cố**: Dự đoán và hỗ trợ khách hàng hiệu quả
- **Tích hợp đa kênh**: Trải nghiệm AI thống nhất trên nhiều nền tảng

## 🛠️ Yêu cầu & Cài đặt

### 💻 Yêu cầu hệ thống

| Thành phần            | Yêu cầu              | Ghi chú                      |
|----------------------|----------------------|-----------------------------|
| **Hệ điều hành**       | Windows 10+, macOS 10.15+, Linux | Bất kỳ hệ điều hành hiện đại nào |
| **Visual Studio Code** | Phiên bản ổn định mới nhất | Yêu cầu cho Bộ công cụ Microsoft Foundry |
| **Node.js**            | v18.0+ và npm        | Cho phát triển máy chủ MCP  |
| **Python**             | 3.10+                | Tùy chọn cho máy chủ MCP Python |
| **Bộ nhớ**             | Tối thiểu 8GB RAM    | Khuyên dùng 16GB cho mô hình cục bộ |

### 🔧 Môi trường phát triển

#### Tiện ích VS Code đề xuất

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - Tùy chọn nhưng hữu ích

#### Công cụ tùy chọn

- **uv**: Trình quản lý gói Python hiện đại
- **MCP Inspector**: Công cụ gỡ lỗi trực quan cho máy chủ MCP
- **Playwright**: Cho ví dụ tự động hóa web

## 🎖️ Kết quả học tập & Lộ trình chứng chỉ

### 🏆 Danh sách thành thạo kỹ năng

Hoàn thành workshop này, bạn sẽ làm chủ:

#### 🎯 Năng lực cốt lõi

- [ ] **Thành thạo giao thức MCP**: Hiểu sâu kiến trúc và mô hình triển khai
- [ ] **Thành thạo Bộ công cụ Microsoft Foundry**: Sử dụng thành thạo Microsoft Foundry Toolkit cho phát triển nhanh
- [ ] **Phát triển máy chủ tùy chỉnh**: Xây dựng, triển khai, và duy trì máy chủ MCP sản xuất
- [ ] **Tích hợp công cụ xuất sắc**: Kết nối AI với quy trình phát triển hiện có liền mạch
- [ ] **Ứng dụng giải quyết vấn đề**: Áp dụng kỹ năng vào các thách thức kinh doanh thực tế

#### 🔧 Kỹ năng kỹ thuật

- [ ] Thiết lập và cấu hình Microsoft Foundry Toolkit trong VS Code
- [ ] Thiết kế và triển khai máy chủ MCP tùy chỉnh
- [ ] Tích hợp mô hình GitHub với kiến trúc MCP
- [ ] Xây dựng quy trình kiểm thử tự động với Playwright
- [ ] Triển khai tác nhân AI vào sản xuất
- [ ] Gỡ lỗi và tối ưu hiệu năng máy chủ MCP

#### 🚀 Khả năng nâng cao

- [ ] Kiến trúc tích hợp AI quy mô doanh nghiệp
- [ ] Thực hiện các thực hành bảo mật tốt nhất cho ứng dụng AI
- [ ] Thiết kế kiến trúc máy chủ MCP có khả năng mở rộng
- [ ] Tạo chuỗi công cụ tùy chỉnh cho lĩnh vực cụ thể
- [ ] Hướng dẫn người khác phát triển AI bản địa

## 📖 Tài nguyên bổ sung

- [Thông số kỹ thuật MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Kho mã Bộ công cụ Microsoft Foundry trên GitHub](https://github.com/microsoft/vscode-ai-toolkit)
- [Bộ sưu tập Máy chủ MCP Mẫu](https://github.com/modelcontextprotocol/servers)
- [Hướng dẫn Thực hành tốt nhất](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Thực hành bảo mật tốt nhất

---

**🚀 Sẵn sàng cách mạng hóa quy trình phát triển AI của bạn?**

Cùng xây dựng tương lai của ứng dụng thông minh với MCP và Bộ công cụ Microsoft Foundry!

## Tiếp theo

Tiếp tục đến: [Module 11: MCP Server Thực hành](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->