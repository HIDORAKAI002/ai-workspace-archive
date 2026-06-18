# 🐙 Mô-đun 4: Phát Triển MCP Thực Tiễn - Máy Chủ GitHub Clone Tùy Chỉnh

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Khởi Động Nhanh:** Xây dựng máy chủ MCP sẵn sàng sản xuất tự động hóa việc sao chép kho GitHub và tích hợp VS Code chỉ trong 30 phút!

## 🎯 Mục Tiêu Học Tập

Cuối khóa lab này, bạn sẽ có thể:

- ✅ Tạo máy chủ MCP tùy chỉnh cho quy trình phát triển thực tế
- ✅ Triển khai chức năng sao chép kho GitHub qua MCP
- ✅ Tích hợp máy chủ MCP tùy chỉnh với VS Code và Agent Builder
- ✅ Sử dụng Chế Độ Agent của GitHub Copilot với công cụ MCP tùy chỉnh
- ✅ Kiểm tra và triển khai máy chủ MCP tùy chỉnh trong môi trường sản xuất

## 📋 Yêu Cầu Tiền Đề

- Hoàn thành các Lab 1-3 (kiến thức cơ bản và phát triển MCP nâng cao)
- Đăng ký GitHub Copilot ([đăng ký miễn phí có sẵn](https://github.com/github-copilot/signup))
- VS Code với Microsoft Foundry Toolkit và các extension GitHub Copilot
- Cài đặt và cấu hình Git CLI

## 🏗️ Tổng Quan Dự Án

### **Thách Thức Phát Triển Thực Tế**
Là các nhà phát triển, chúng ta thường xuyên dùng GitHub để sao chép kho và mở chúng trong VS Code hoặc VS Code Insiders. Quá trình thủ công này bao gồm:
1. Mở terminal/cmd
2. Điều hướng tới thư mục mong muốn
3. Chạy lệnh `git clone`
4. Mở VS Code trong thư mục đã sao chép

**Giải pháp MCP của chúng tôi đơn giản hóa thành một lệnh thông minh duy nhất!**

### **Bạn Sẽ Xây Dựng**
Một **GitHub Clone MCP Server** (`git_mcp_server`) cung cấp:

| Tính Năng | Mô Tả | Lợi Ích |
|---------|-------------|---------|
| 🔄 **Sao Chép Kho Thông Minh** | Sao chép kho GitHub với xác thực | Tự động kiểm tra lỗi |
| 📁 **Quản Lý Thư Mục Thông Minh** | Kiểm tra và tạo thư mục an toàn | Ngăn chặn ghi đè dữ liệu |
| 🚀 **Tích Hợp VS Code Đa Nền Tảng** | Mở dự án trong VS Code/Insiders | Chuyển đổi quy trình liền mạch |
| 🛡️ **Xử Lý Lỗi Mạnh Mẽ** | Xử lý sự cố mạng, quyền truy cập, và đường dẫn | Độ tin cậy sẵn sàng sản xuất |

---

## 📖 Triển Khai Từng Bước

### Bước 1: Tạo Agent GitHub trong Agent Builder

1. **Khởi chạy Agent Builder** qua extension Microsoft Foundry Toolkit
2. **Tạo agent mới** với cấu hình sau:
   ```
   Agent Name: GitHubAgent
   ```

3. **Khởi tạo máy chủ MCP tùy chỉnh:**
   - Điều hướng tới **Tools** → **Add Tool** → **MCP Server**
   - Chọn **"Create A new MCP Server"**
   - Chọn **mẫu Python** để linh hoạt cao nhất
   - **Tên máy chủ:** `git_mcp_server`

### Bước 2: Cấu Hình Chế Độ Agent GitHub Copilot

1. **Mở GitHub Copilot** trong VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Chọn Agent Model** trong giao diện Copilot
3. **Chọn mô hình Claude 3.7** để tăng cường khả năng suy luận
4. **Bật tích hợp MCP** để truy cập công cụ

> **💡 Mẹo Chuyên Nghiệp:** Claude 3.7 cung cấp khả năng hiểu biết vượt trội về quy trình phát triển và mẫu xử lý lỗi.

### Bước 3: Triển Khai Chức Năng Cốt Lõi MCP Server

**Sử dụng prompt chi tiết sau với Chế Độ Agent GitHub Copilot:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Bước 4: Kiểm Tra Máy Chủ MCP

#### 4a. Kiểm tra trong Agent Builder

1. **Khởi chạy cấu hình gỡ lỗi** cho Agent Builder
2. **Cấu hình agent của bạn với prompt hệ thống này:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Kiểm tra với các kịch bản người dùng thực tế:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/vi/DebugAgent.81d152370c503241.webp)

**Kết quả mong đợi:**
- ✅ Sao chép thành công với xác nhận đường dẫn
- ✅ Tự động mở VS Code
- ✅ Thông báo lỗi rõ ràng khi có tình huống không hợp lệ
- ✅ Xử lý đúng các trường hợp đặc biệt

#### 4b. Kiểm tra trong MCP Inspector


![MCP Inspector Testing](../../../../translated_images/vi/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Chúc mừng!** Bạn đã tạo thành công một máy chủ MCP thực tế, sẵn sàng sản xuất, giải quyết các thách thức quy trình phát triển thực tế. Máy chủ sao chép GitHub tùy chỉnh của bạn thể hiện sức mạnh của MCP trong tự động hóa và nâng cao năng suất của nhà phát triển.

### 🏆 Thành Tựu Đạt Được:
- ✅ **Nhà Phát Triển MCP** - Tạo máy chủ MCP tùy chỉnh
- ✅ **Tự Động Hóa Quy Trình** - Tinh giản các quy trình phát triển  
- ✅ **Chuyên Gia Tích Hợp** - Kết nối nhiều công cụ phát triển
- ✅ **Sẵn Sàng Sản Xuất** - Xây dựng giải pháp triển khai

---

## 🎓 Hoàn Thành Workshop: Hành Trình Với Model Context Protocol

**Kính gửi Người Tham Gia Workshop,**

Chúc mừng bạn đã hoàn thành toàn bộ bốn mô-đun của workshop Model Context Protocol! Bạn đã tiến xa từ việc hiểu các khái niệm cơ bản của Microsoft Foundry Toolkit đến xây dựng máy chủ MCP sẵn sàng sản xuất giải quyết các thách thức phát triển thực tế.

### 🚀 Tóm Tắt Lộ Trình Học Tập:

**[Mô-đun 1](../lab1/README.md)**: Bạn bắt đầu bằng cách khám phá các kiến thức cơ bản Microsoft Foundry Toolkit, kiểm tra mô hình và tạo agent AI đầu tiên.

**[Mô-đun 2](../lab2/README.md)**: Bạn học kiến trúc MCP, tích hợp Playwright MCP và xây dựng agent tự động trình duyệt đầu tiên.

**[Mô-đun 3](../lab3/README.md)**: Bạn tiến tới phát triển máy chủ MCP tùy chỉnh với máy chủ Weather MCP và thành thạo các công cụ gỡ lỗi.

**[Mô-đun 4](../lab4/README.md)**: Bạn áp dụng mọi thứ để tạo công cụ tự động quy trình sao chép kho GitHub thực tế.

### 🌟 Bạn Đã Thành Thục:

- ✅ **Hệ Sinh Thái Microsoft Foundry Toolkit**: Mô hình, agent và mẫu tích hợp
- ✅ **Kiến Trúc MCP**: Thiết kế client-server, giao thức truyền tải và bảo mật
- ✅ **Công Cụ Phát Triển**: Từ Playground đến Inspector đến triển khai sản xuất
- ✅ **Phát Triển Tùy Chỉnh**: Xây dựng, kiểm tra và triển khai máy chủ MCP riêng
- ✅ **Ứng Dụng Thực Tiễn**: Giải quyết thách thức quy trình phát triển thực tế bằng AI

### 🔮 Bước Tiếp Theo Của Bạn:

1. **Xây Dựng Máy Chủ MCP Của Riêng Bạn**: Áp dụng kỹ năng để tự động hóa quy trình độc đáo của bạn
2. **Tham Gia Cộng Đồng MCP**: Chia sẻ sản phẩm và học hỏi từ người khác
3. **Khám Phá Tích Hợp Nâng Cao**: Kết nối máy chủ MCP với hệ thống doanh nghiệp
4. **Đóng Góp Cho Mã Nguồn Mở**: Cải thiện công cụ và tài liệu MCP

Hãy nhớ rằng, workshop này chỉ là khởi đầu. Hệ sinh thái Model Context Protocol đang phát triển nhanh chóng và bạn đã sẵn sàng dẫn đầu các công cụ phát triển AI hỗ trợ.

**Xin cảm ơn bạn đã tham gia và nhiệt huyết học tập!**

Chúng tôi hy vọng workshop đã khơi dậy ý tưởng giúp bạn thay đổi cách xây dựng và tương tác với công cụ AI trên hành trình phát triển.

**Chúc bạn viết mã vui vẻ!**

---

## Tiếp Theo Là Gì

Chúc mừng bạn đã hoàn thành toàn bộ các lab trong Mô-đun 10!

- Quay lại: [Tổng Quan Mô-đun 10](../README.md)
- Tiếp tục đến: [Mô-đun 11: Lab Thực Hành Máy Chủ MCP](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->