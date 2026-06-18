# 🚀 Module 1: Kiến Thức Cơ Bản về Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Mục Tiêu Học Tập

Vào cuối module này, bạn sẽ có thể:
- ✅ Cài đặt và cấu hình Microsoft Foundry Toolkit Extension cho VS Code
- ✅ Duyệt Catalog Mô Hình và hiểu các nguồn mô hình khác nhau
- ✅ Sử dụng Playground để thử nghiệm và kiểm tra mô hình
- ✅ Tạo các tác nhân AI tùy chỉnh bằng Agent Builder
- ✅ So sánh hiệu suất mô hình giữa các nhà cung cấp khác nhau
- ✅ Áp dụng các thực hành tốt nhất cho kỹ thuật tạo prompt

## 🧠 Giới Thiệu về Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit Extension cho VS Code** là tiện ích mở rộng chủ lực của Microsoft biến VS Code thành môi trường phát triển AI toàn diện. Nó nối cầu khoảng cách giữa nghiên cứu AI và phát triển ứng dụng thực tiễn, giúp AI sinh tạo trở nên dễ dàng tiếp cận với các nhà phát triển ở mọi trình độ.

### 🌟 Các Tính Năng Chính

| Tính Năng | Mô Tả | Trường Hợp Sử Dụng |
|---------|-------------|----------|
| **🗂️ Model Catalog** | Truy cập 100+ mô hình từ GitHub, ONNX, OpenAI, Anthropic, Google | Khám phá và lựa chọn mô hình |
| **🔌 BYOM Support** | Tích hợp mô hình riêng của bạn (cục bộ/ từ xa) | Triển khai mô hình tùy chỉnh |
| **🎮 Interactive Playground** | Thử nghiệm mô hình thời gian thực với giao diện chat | Phát triển nhanh và thử nghiệm |
| **📎 Multi-Modal Support** | Xử lý văn bản, hình ảnh và tệp đính kèm | Ứng dụng AI phức tạp |
| **⚡ Batch Processing** | Chạy nhiều lệnh cùng lúc | Quy trình thử nghiệm hiệu quả |
| **📊 Model Evaluation** | Các chỉ số tích hợp (F1, liên quan, tương đồng, mạch lạc) | Đánh giá hiệu suất |

### 🎯 Tại Sao Microsoft Foundry Toolkit Quan Trọng

- **🚀 Phát Triển Tăng Tốc**: Từ ý tưởng đến nguyên mẫu trong vài phút
- **🔄 Quy Trình Làm Việc Thống Nhất**: Một giao diện cho nhiều nhà cung cấp AI
- **🧪 Thí Nghiệm Dễ Dàng**: So sánh mô hình không cần cài đặt phức tạp
- **📈 Sẵn Sàng Sản Xuất**: Chuyển đổi liền mạch từ nguyên mẫu sang triển khai

## 🛠️ Yêu Cầu & Thiết Lập

### 📦 Cài Đặt Microsoft Foundry Toolkit Extension

**Bước 1: Truy cập Marketplace Extensions**
1. Mở Visual Studio Code
2. Điều hướng tới phần Extension (`Ctrl+Shift+X` hoặc `Cmd+Shift+X`)
3. Tìm kiếm "Microsoft Foundry Toolkit"

**Bước 2: Chọn Phiên Bản của Bạn**
- **🟢 Phiên bản Phát Hành**: Được khuyến nghị cho sử dụng sản xuất
- **🔶 Phiên bản Tiền Phát Hành**: Truy cập sớm các tính năng tiên tiến

**Bước 3: Cài Đặt và Kích Hoạt**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/vi/aitkext.d28945a03eed003c.webp)

### ✅ Danh Sách Kiểm Tra Xác Nhận
- [ ] Biểu tượng Microsoft Foundry Toolkit xuất hiện ở thanh bên của VS Code
- [ ] Tiện ích được bật và kích hoạt
- [ ] Không có lỗi cài đặt trong bảng đầu ra

## 🧪 Bài Tập Thực Hành 1: Khám Phá Mô Hình GitHub

**🎯 Mục Tiêu**: Thông thạo Catalog Mô Hình và thử mô hình AI đầu tiên của bạn

### 📊 Bước 1: Duyệt Catalog Mô Hình

Catalog Mô Hình là cổng vào hệ sinh thái AI của bạn. Nó tổng hợp các mô hình từ nhiều nhà cung cấp khác nhau, giúp bạn dễ dàng khám phá và so sánh các lựa chọn.

**🔍 Hướng Dẫn Duyệt:**

Nhấn vào **MODELS - Catalog** trong thanh bên Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/vi/aimodel.263ed2be013d8fb0.webp)

**💡 Mẹo Hữu Ích**: Tìm các mô hình có khả năng cụ thể phù hợp với trường hợp sử dụng của bạn (ví dụ: tạo mã, viết sáng tạo, phân tích).

**⚠️ Lưu Ý**: Mô hình lưu trữ trên GitHub (tức là GitHub Models) được sử dụng miễn phí nhưng bị giới hạn số lượng yêu cầu và token. Nếu bạn muốn truy cập các mô hình không phải trên GitHub (ví dụ, mô hình bên ngoài được lưu trữ qua Azure AI hoặc các điểm cuối khác), bạn cần cung cấp khóa API hoặc xác thực phù hợp.

### 🚀 Bước 2: Thêm và Cấu Hình Mô Hình Đầu Tiên

**Chiến Lược Lựa Chọn Mô Hình:**
- **GPT-4.1**: Tốt nhất cho tư duy phức tạp và phân tích
- **Phi-4-mini**: Nhẹ, phản hồi nhanh cho các tác vụ đơn giản

**Quy Trình Cấu Hình:**
1. Chọn **OpenAI GPT-4.1** từ catalog
2. Nhấn **Add to My Models** - đăng ký mô hình để sử dụng
3. Chọn **Try in Playground** để mở môi trường thử nghiệm
4. Chờ mô hình khởi tạo (lần đầu có thể mất chút thời gian)

![Playground Setup](../../../../translated_images/vi/playground.dd6f5141344878ca.webp)

**⚙️ Hiểu Tham Số Mô Hình:**
- **Temperature**: Kiểm soát độ sáng tạo (0 = nhất quán, 1 = sáng tạo)
- **Max Tokens**: Độ dài câu trả lời tối đa
- **Top-p**: Nucleus sampling để đa dạng câu trả lời

### 🎯 Bước 3: Làm Chủ Giao Diện Playground

Playground là phòng thí nghiệm thử nghiệm AI của bạn. Đây là cách tối đa hóa tiềm năng của nó:

**🎨 Thực Hành Tạo Prompt Hiệu Quả:**
1. **Cụ Thể**: Hướng dẫn rõ ràng, chi tiết cho kết quả tốt hơn
2. **Cung Cấp Ngữ Cảnh**: Bao gồm thông tin nền liên quan
3. **Dùng Ví Dụ**: Cho mô hình thấy yêu cầu cụ thể qua ví dụ
4. **Lặp Lại**: Tinh chỉnh prompt dựa trên kết quả ban đầu

**🧪 Các Kịch Bản Thử Nghiệm:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/vi/result.1dfcf211fb359cf6.webp)

### 🏆 Thử Thách: So Sánh Hiệu Suất Mô Hình

**🎯 Mục Tiêu**: So sánh các mô hình khác nhau dùng prompt giống nhau để hiểu điểm mạnh

**📋 Hướng Dẫn:**
1. Thêm **Phi-4-mini** vào không gian làm việc của bạn
2. Dùng cùng một prompt cho cả GPT-4.1 và Phi-4-mini

![set](../../../../translated_images/vi/set.88132df189ecde2c.webp)

3. So sánh chất lượng câu trả lời, tốc độ và độ chính xác
4. Ghi lại kết quả trong phần kết quả

![Model Comparison](../../../../translated_images/vi/compare.97746cd0f9074955.webp)

**💡 Những Kiến Thức Quan Trọng Cần Khám Phá:**
- Khi nào nên dùng LLM so với SLM
- So sánh chi phí và hiệu năng
- Khả năng chuyên biệt của các mô hình khác nhau

## 🤖 Bài Tập Thực Hành 2: Xây Dựng Đại Lý Tùy Chỉnh với Agent Builder

**🎯 Mục Tiêu**: Tạo các đại lý AI chuyên biệt phù hợp với tác vụ và quy trình làm việc cụ thể

### 🏗️ Bước 1: Hiểu Về Agent Builder

Agent Builder là nơi Microsoft Foundry Toolkit thể hiện sức mạnh thực sự. Nó cho phép bạn tạo các trợ lý AI được xây dựng cho mục đích riêng, kết hợp sức mạnh của các mô hình ngôn ngữ lớn với các hướng dẫn tùy chỉnh, tham số cụ thể và kiến thức chuyên môn.

**🧠 Các Thành Phần Kiến Trúc Đại Lý:**
- **Core Model**: Mô hình nền tảng LLM (GPT-4, Groks, Phi, v.v.)
- **System Prompt**: Định hình cá tính và hành vi đại lý
- **Parameters**: Cấu hình tinh chỉnh để tối ưu hiệu suất
- **Tools Integration**: Kết nối API bên ngoài và dịch vụ MCP
- **Memory**: Ngữ cảnh hội thoại và duy trì phiên làm việc

![Agent Builder Interface](../../../../translated_images/vi/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Bước 2: Tìm Hiểu Sâu về Cấu Hình Đại Lý

**🎨 Tạo Prompt Hệ Thống Hiệu Quả:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Dĩ nhiên, bạn cũng có thể sử dụng Generate System Prompt để AI hỗ trợ bạn tạo và tối ưu prompt*

**🔧 Tối Ưu Tham Số:**
| Tham Số | Phạm Vi Khuyến Nghị | Trường Hợp Sử Dụng |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Phản hồi kỹ thuật/chính xác |
| **Temperature** | 0.7-0.9 | Tác vụ sáng tạo/ý tưởng |
| **Max Tokens** | 500-1000 | Câu trả lời ngắn gọn |
| **Max Tokens** | 2000-4000 | Giải thích chi tiết |

### 🐍 Bước 3: Bài Tập Thực Tế - Đại Lý Lập Trình Python

**🎯 Nhiệm Vụ**: Tạo trợ lý chuyên biệt cho lập trình Python

**📋 Các Bước Cấu Hình:**

1. **Chọn Mô Hình**: Chọn **Claude 3.5 Sonnet** (xuất sắc cho mã code)

2. **Thiết Kế Prompt Hệ Thống**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Cấu Hình Tham Số**:
   - Temperature: 0.2 (cho mã ổn định, đáng tin cậy)
   - Max Tokens: 2000 (giải thích chi tiết)
   - Top-p: 0.9 (cân bằng sáng tạo)

![Python Agent Configuration](../../../../translated_images/vi/pythonagent.5e51b406401c165f.webp)

### 🧪 Bước 4: Thử Nghiệm Đại Lý Python Của Bạn

**Kịch Bản Thử Nghiệm:**
1. **Chức Năng Cơ Bản**: "Tạo hàm tìm số nguyên tố"
2. **Thuật Toán Phức Tạp**: "Triển khai cây tìm kiếm nhị phân với các phương thức chèn, xóa và tìm kiếm"
3. **Vấn Đề Thực Tế**: "Xây dựng trình thu thập dữ liệu web xử lý giới hạn tốc độ và thử lại"
4. **Gỡ Lỗi**: "Sửa đoạn code này [dán đoạn code lỗi]"

**🏆 Tiêu Chuẩn Thành Công:**
- ✅ Mã chạy không lỗi
- ✅ Bao gồm tài liệu thích hợp
- ✅ Tuân theo các thực hành tốt nhất về Python
- ✅ Cung cấp giải thích rõ ràng
- ✅ Đề xuất cải tiến

## 🎓 Tổng Kết Module 1 & Các Bước Tiếp Theo

### 📊 Kiểm Tra Kiến Thức

Kiểm tra hiểu biết của bạn:
- [ ] Bạn có thể giải thích sự khác biệt giữa các mô hình trong catalog không?
- [ ] Bạn đã tạo và thử nghiệm đại lý tùy chỉnh thành công chưa?
- [ ] Bạn hiểu cách tối ưu tham số cho các trường hợp sử dụng khác nhau chưa?
- [ ] Bạn có thể thiết kế prompt hệ thống hiệu quả không?

### 📚 Tài Nguyên Bổ Sung

- **Tài liệu Microsoft Foundry Toolkit**: [Microsoft Docs chính thức](https://github.com/microsoft/vscode-ai-toolkit)
- **Hướng dẫn Prompt Engineering**: [Thực hành tốt nhất](https://platform.openai.com/docs/guides/prompt-engineering)
- **Mô hình trong Microsoft Foundry Toolkit**: [Mô hình đang phát triển](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Chúc Mừng!** Bạn đã nắm vững kiến thức cơ bản của Microsoft Foundry Toolkit và sẵn sàng xây dựng các ứng dụng AI nâng cao hơn!

### 🔜 Tiếp Tục Module Kế Tiếp

Sẵn sàng khám phá các tính năng nâng cao hơn? Tiếp tục với **[Module 2: MCP với Kiến Thức Cơ Bản Microsoft Foundry Toolkit](../lab2/README.md)** để học cách:
- Kết nối đại lý với công cụ bên ngoài sử dụng Model Context Protocol (MCP)
- Xây dựng đại lý tự động hóa trình duyệt với Playwright
- Tích hợp máy chủ MCP với đại lý Microsoft Foundry Toolkit của bạn
- Tăng cường đại lý với dữ liệu và chức năng bên ngoài

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->