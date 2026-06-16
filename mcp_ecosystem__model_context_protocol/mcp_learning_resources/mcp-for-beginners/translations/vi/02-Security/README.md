# MCP Security: Bảo vệ Toàn diện cho Hệ thống AI

[![MCP Security Best Practices](../../../translated_images/vi/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Nhấn vào hình ảnh trên để xem video bài học này)_

Bảo mật là yếu tố cơ bản trong thiết kế hệ thống AI, đó là lý do tại sao chúng tôi ưu tiên nó như phần thứ hai của chúng tôi. Điều này phù hợp với nguyên tắc **Secure by Design** của Microsoft từ [Sáng kiến Tương lai An toàn](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Giao thức Ngữ cảnh Mô hình (MCP) mang lại khả năng mạnh mẽ mới cho các ứng dụng được điều khiển bởi AI đồng thời giới thiệu các thách thức bảo mật độc đáo vượt ra ngoài các rủi ro phần mềm truyền thống. Hệ thống MCP đối mặt với cả các mối lo ngại bảo mật đã được thiết lập (mã hóa an toàn, quyền truy cập tối thiểu, bảo mật chuỗi cung ứng) và các mối đe dọa riêng biệt liên quan đến AI bao gồm chèn prompt, đầu độc công cụ, chiếm quyền phiên, tấn công confused deputy, lỗ hổng truyền token, và thay đổi khả năng động.

Bài học này khám phá những rủi ro bảo mật quan trọng nhất trong các triển khai MCP — bao gồm xác thực, ủy quyền, quyền hạn quá mức, chèn prompt gián tiếp, bảo mật phiên, vấn đề confused deputy, quản lý token và lỗ hổng chuỗi cung ứng. Bạn sẽ học được các biện pháp kiểm soát có thể áp dụng và các thực hành tốt nhất để giảm thiểu các rủi ro này trong khi sử dụng các giải pháp của Microsoft như Prompt Shields, Azure Content Safety và GitHub Advanced Security để tăng cường triển khai MCP của bạn.

## Mục tiêu Học tập

Đến cuối bài học này, bạn sẽ có thể:

- **Nhận diện Các Mối Đe dọa Riêng biệt MCP**: Nhận biết các rủi ro bảo mật độc đáo trong hệ thống MCP bao gồm chèn prompt, đầu độc công cụ, quyền hạn quá mức, chiếm quyền phiên, vấn đề confused deputy, lỗ hổng truyền token và rủi ro chuỗi cung ứng
- **Áp dụng Các Biện pháp Kiểm soát Bảo mật**: Triển khai các biện pháp giảm thiểu hiệu quả bao gồm xác thực mạnh mẽ, truy cập theo nguyên tắc tối thiểu, quản lý token an toàn, kiểm soát bảo mật phiên và xác minh chuỗi cung ứng
- **Sử dụng Giải pháp Bảo mật của Microsoft**: Hiểu và triển khai Microsoft Prompt Shields, Azure Content Safety và GitHub Advanced Security để bảo vệ tải công việc MCP
- **Xác thực An toàn Công cụ**: Nhận biết tầm quan trọng của việc xác thực siêu dữ liệu công cụ, theo dõi các thay đổi động và bảo vệ chống lại các cuộc tấn công chèn prompt gián tiếp
- **Tích hợp Các Thực hành Tốt nhất**: Kết hợp các nền tảng bảo mật đã được thiết lập (mã hóa an toàn, cứng hóa máy chủ, zero trust) với các kiểm soát riêng của MCP để bảo vệ toàn diện

# Kiến trúc & Kiểm soát Bảo mật MCP

Các triển khai MCP hiện đại đòi hỏi các phương pháp tiếp cận bảo mật nhiều lớp giải quyết cả bảo mật phần mềm truyền thống và các mối đe dọa riêng biệt của AI. Các đặc tả MCP đang phát triển nhanh chóng tiếp tục hoàn thiện các kiểm soát bảo mật, cho phép tích hợp tốt hơn với kiến trúc bảo mật doanh nghiệp và các thực hành tốt đã được thiết lập.

Nghiên cứu từ [Báo cáo Phòng thủ Kỹ thuật số Microsoft](https://aka.ms/mddr) cho thấy **98% các vụ vi phạm được báo cáo sẽ được ngăn ngừa bởi thói quen bảo mật mạnh mẽ**. Chiến lược bảo vệ hiệu quả nhất kết hợp các thực hành bảo mật nền tảng với các kiểm soát riêng của MCP — các biện pháp bảo mật cơ bản đã được chứng minh vẫn là tác động lớn nhất trong việc giảm nguy cơ bảo mật tổng thể.

## Bối cảnh Bảo mật Hiện tại

> **Lưu ý:** Thông tin này phản ánh các tiêu chuẩn bảo mật MCP tính đến **ngày 5 tháng 2 năm 2026**, phù hợp với **Đặc tả MCP 2025-11-25**. Giao thức MCP tiếp tục phát triển nhanh chóng, và các triển khai trong tương lai có thể giới thiệu các mẫu xác thực mới và kiểm soát nâng cao. Luôn tham khảo [Đặc tả MCP](https://spec.modelcontextprotocol.io/), [kho GitHub MCP](https://github.com/modelcontextprotocol) và [tài liệu thực hành bảo mật tốt nhất](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) hiện hành để được hướng dẫn mới nhất.

## 🏔️ Hội nghị Thượng đỉnh Bảo mật MCP (Sherpa)

Để có **đào tạo bảo mật thực hành**, chúng tôi rất khuyến khích **Hội nghị Thượng đỉnh Bảo mật MCP** (Sherpa) - một chuyến thám hiểm có hướng dẫn toàn diện để bảo mật các máy chủ MCP trên Microsoft Azure.

### Tổng quan Hội nghị

[Hội nghị Thượng đỉnh Bảo mật MCP](https://azure-samples.github.io/sherpa/) cung cấp đào tạo bảo mật thực tế, có thể áp dụng thông qua phương pháp "lỗ hổng → khai thác → sửa lỗi → xác nhận" đã được chứng minh. Bạn sẽ:

- **Học bằng cách Phá vỡ**: Trải nghiệm trực tiếp các lỗ hổng bằng cách khai thác các máy chủ cố ý không an toàn
- **Sử dụng Bảo mật Tự nhiên Azure**: Tận dụng Azure Entra ID, Key Vault, API Management và AI Content Safety
- **Tuân theo Phòng thủ Nhiều lớp**: Tiến qua các trại xây dựng các lớp bảo mật toàn diện
- **Áp dụng Tiêu chuẩn OWASP**: Mỗi kỹ thuật khớp với [Hướng dẫn Bảo mật MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Có Mã Sản xuất**: Nhận được các triển khai đang hoạt động và đã được kiểm thử

### Lộ trình Thám hiểm

| Trại | Trọng tâm | Rủi ro OWASP Được Bao phủ |
|------|-----------|---------------------------|
| **Trại Cơ sở** | Các nền tảng MCP & lỗ hổng xác thực | MCP01, MCP07 |
| **Trại 1: Danh tính** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Trại 2: Cổng** | API Management, Private Endpoints, quản trị | MCP02, MCP06, MCP07, MCP09 |
| **Trại 3: Bảo mật I/O** | Chèn prompt, bảo vệ PII, an toàn nội dung | MCP03, MCP05, MCP06, MCP10 |
| **Trại 4: Giám sát** | Log Analytics, bảng điều khiển, phát hiện mối đe dọa | MCP04, MCP08 |
| **Đỉnh Núi** | Test tích hợp Red Team / Blue Team | Tất cả |

**Bắt đầu**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## 10 Rủi ro Bảo mật MCP Hàng đầu OWASP

[Hướng dẫn Bảo mật MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) trình bày mười rủi ro bảo mật quan trọng nhất cho các triển khai MCP:

| Rủi ro | Mô tả | Biện pháp Azure |
|--------|-------|-----------------|
| **MCP01** | Quản lý Token kém & Lộ Thông tin Bí mật | Azure Key Vault, Managed Identity |
| **MCP02** | Leo thang Quyền qua Scope Creep | RBAC, Conditional Access |
| **MCP03** | Đầu độc Công cụ | Xác thực công cụ, kiểm tra tính toàn vẹn |
| **MCP04** | Tấn công Chuỗi cung ứng Phần mềm & Tampering Phụ thuộc | GitHub Advanced Security, quét phụ thuộc |
| **MCP05** | Chèn và Thực thi Lệnh | Xác thực đầu vào, sandboxing |
| **MCP06** | Thao túng Luồng Ý định | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Thiếu Xác thực và Ủy quyền | Azure Entra ID, OAuth 2.1 với PKCE |
| **MCP08** | Thiếu Audit và Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Máy chủ MCP Bóng tối | Quản trị Trung tâm API, cô lập mạng |
| **MCP10** | Chèn Ngữ cảnh & Chia sẻ Quá mức | Phân loại dữ liệu, giảm thiểu phơi bày |

### Sự Phát triển của Xác thực MCP

Đặc tả MCP đã tiến bộ đáng kể trong cách tiếp cận xác thực và ủy quyền:

- **Phương pháp Gốc**: Các đặc tả đầu yêu cầu nhà phát triển triển khai máy chủ xác thực tùy chỉnh, với các máy chủ MCP đóng vai trò máy chủ ủy quyền OAuth 2.0 quản lý xác thực người dùng trực tiếp
- **Tiêu chuẩn Hiện tại (2025-11-25)**: Đặc tả cập nhật cho phép máy chủ MCP ủy quyền xác thực cho nhà cung cấp danh tính bên ngoài (như Microsoft Entra ID), cải thiện tư thế bảo mật và giảm độ phức tạp triển khai
- **Bảo mật Lớp Vận chuyển**: Hỗ trợ nâng cao cho các cơ chế vận chuyển an toàn với các mẫu xác thực thích hợp cho cả kết nối cục bộ (STDIO) và từ xa (Streamable HTTP)

## Bảo mật Xác thực & Ủy quyền

### Các Thách thức Bảo mật Hiện nay

Các triển khai MCP hiện đại phải đối mặt với nhiều thách thức về xác thực và ủy quyền:

### Rủi ro & Các Vecto Tấn công

- **Logic Ủy quyền Cấu hình Sai**: Triển khai ủy quyền lỗi trong máy chủ MCP có thể làm lộ dữ liệu nhạy cảm và áp dụng sai kiểm soát truy cập
- **Xâm phạm Token OAuth**: Trộm token máy chủ MCP cục bộ cho phép kẻ tấn công mạo danh máy chủ và truy cập dịch vụ hạ nguồn
- **Lỗ hổng Truyền Token**: Xử lý token không đúng tạo ra các lỗ hổng vượt qua kiểm soát bảo mật và lỗ hổng trách nhiệm
- **Quyền Hạn Quá Mức**: Máy chủ MCP có quyền hạn quá mức vi phạm nguyên tắc quyền tối thiểu và mở rộng bề mặt tấn công

#### Truyền Token: Một Mô hình Chống lại Quan trọng

**Truyền token bị nghiêm cấm rõ ràng** trong đặc tả ủy quyền MCP hiện tại do các hậu quả bảo mật nghiêm trọng:

##### Vượt qua Kiểm soát Bảo mật  
- Máy chủ MCP và API hạ nguồn thực hiện các kiểm soát bảo mật quan trọng (giới hạn tốc độ, kiểm tra yêu cầu, giám sát lưu lượng) phụ thuộc vào xác thực token đúng cách  
- Việc sử dụng trực tiếp token của client với API bỏ qua các bảo vệ thiết yếu này, làm suy yếu kiến trúc bảo mật  

##### Thách thức Về Trách nhiệm & Audit  
- Máy chủ MCP không thể phân biệt các client dùng token do hệ thống cấp, gây gián đoạn đường dẫn audit  
- Nhật ký máy chủ tài nguyên hạ nguồn hiển thị nguồn yêu cầu gây hiểu lầm thay vì trung gian máy chủ MCP thực tế  
- Điều tra sự cố và kiểm toán tuân thủ trở nên khó khăn hơn nhiều  

##### Rủi ro Lấy cắp Dữ liệu  
- Các tuyên bố token không được kiểm chứng tạo điều kiện cho kẻ tấn công sử dụng token đánh cắp để khai thác MCP làm proxy lấy cắp dữ liệu  
- Vi phạm ranh giới tin cậy cho phép các mẫu truy cập trái phép vượt qua các kiểm soát bảo mật dự định  

##### Các Vecto Tấn công Đa Dịch vụ  
- Token bị xâm phạm được chấp nhận bởi nhiều dịch vụ cho phép di chuyển ngang qua hệ thống kết nối  
- Các giả định tin tưởng giữa các dịch vụ có thể bị vi phạm khi không thể xác minh nguồn token  

### Các Kiểm soát Bảo mật & Biện pháp Giảm thiểu

**Yêu cầu Bảo mật Quan trọng:**

> **BẮT BUỘC**: Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận bất kỳ token nào không được cấp rõ ràng cho máy chủ MCP đó

#### Kiểm soát Xác thực & Ủy quyền

- **Đánh giá Ủy quyền Nghiêm ngặt**: Thực hiện kiểm toán toàn diện logic ủy quyền máy chủ MCP để đảm bảo chỉ người dùng và client được phép truy cập tài nguyên nhạy cảm  
  - **Hướng dẫn Triển khai**: [Azure API Management làm Cổng xác thực cho Máy chủ MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Tích hợp Danh tính**: [Sử dụng Microsoft Entra ID cho Xác thực Máy chủ MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Quản lý Token An toàn**: Áp dụng [thực hành tốt nhất của Microsoft về xác thực token và vòng đời](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Xác thực thông tin audience token khớp với danh tính máy chủ MCP  
  - Triển khai chính sách xoay vòng và hết hạn token thích hợp  
  - Ngăn chặn tấn công phát lại token và sử dụng trái phép

- **Lưu trữ Token Bảo vệ**: Lưu trữ token an toàn với mã hóa cả khi lưu trữ và truyền  
  - **Thực hành tốt nhất**: [Hướng dẫn Lưu trữ Token và Mã hóa](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Triển khai Kiểm soát Truy cập

- **Nguyên tắc Quyền Tối thiểu**: Cấp cho máy chủ MCP chỉ những quyền tối thiểu cần thiết cho chức năng dự định  
  - Thường xuyên rà soát và cập nhật quyền để ngăn ngừa quyền leo thang  
  - **Tài liệu Microsoft**: [Truy cập Bảo mật Theo Quyền Tối thiểu](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kiểm soát Truy cập Dựa trên Vai trò (RBAC)**: Triển khai phân quyền chi tiết  
  - Khoanh vùng vai trò chặt chẽ tới tài nguyên và hành động cụ thể  
  - Tránh cấp quyền rộng hoặc không cần thiết làm mở rộng bề mặt tấn công

- **Giám sát Quyền Truy cập Liên tục**: Triển khai kiểm toán và giám sát truy cập liên tục  
  - Theo dõi mẫu sử dụng quyền để phát hiện bất thường  
  - Kịp thời xử lý quyền hạn quá mức hoặc không sử dụng

## Các Mối đe dọa Bảo mật Riêng biệt AI

### Tấn công Chèn Prompt & Thao túng Công cụ

Các triển khai MCP hiện đại đối mặt với các vecto tấn công AI tinh vi mà các biện pháp bảo mật truyền thống không thể giải quyết hoàn toàn:

#### **Chèn Prompt Gián tiếp (Chèn Prompt Liên miền Chéo)**

**Chèn Prompt Gián tiếp** là một trong những lỗ hổng nghiêm trọng nhất trong hệ thống AI được kích hoạt MCP. Kẻ tấn công nhúng các chỉ dẫn độc hại trong nội dung bên ngoài — tài liệu, trang web, email hoặc nguồn dữ liệu — mà hệ thống AI sau đó xử lý như các lệnh hợp lệ.

**Tình huống Tấn công:**  
- **Chèn trong Tài liệu**: Các chỉ dẫn độc hại ẩn trong tài liệu được xử lý gây ra các hành động AI không mong muốn  
- **Khai thác Nội dung Web**: Trang web bị tấn công chứa các prompt nhúng thao túng hành vi AI khi được thu thập dữ liệu  
- **Tấn công qua Email**: Prompt độc hại trong email khiến trợ lý AI rò rỉ thông tin hoặc thực hiện hành động trái phép  
- **Ô nhiễm Nguồn Dữ liệu**: Cơ sở dữ liệu hoặc API bị xâm phạm phát tán nội dung bị đầu độc cho hệ thống AI

**Tác động Thực tế**: Các cuộc tấn công này có thể dẫn đến rò rỉ dữ liệu, xâm phạm quyền riêng tư, tạo ra nội dung gây hại và thao túng tương tác người dùng. Phân tích chi tiết xem [Chèn Prompt trong MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/vi/prompt-injection.ed9fbfde297ca877.webp)

#### **Tấn công Đầu độc Công cụ**

**Đầu độc Công cụ** nhắm vào siêu dữ liệu định nghĩa các công cụ MCP, khai thác cách LLMs hiểu mô tả và tham số công cụ để đưa ra quyết định thực thi.

**Cơ chế Tấn công:**  
- **Thao túng Siêu dữ liệu**: Kẻ tấn công chèn chỉ dẫn độc hại vào mô tả công cụ, định nghĩa tham số hoặc ví dụ sử dụng  
- **Chỉ dẫn vô hình**: Prompt ẩn trong siêu dữ liệu công cụ được các mô hình AI xử lý nhưng không hiển thị cho người dùng  
- **Thay đổi Công cụ Động ("Rug Pulls")**: Công cụ được người dùng phê duyệt sau đó bị chỉnh sửa để thực hiện hành động độc hại mà người dùng không biết  
- **Chèn Tham số**: Nội dung độc hại nhúng trong lược đồ tham số công cụ làm ảnh hưởng đến hành vi mô hình

**Rủi ro Máy chủ Lưu trữ**: Máy chủ MCP từ xa có nguy cơ cao vì định nghĩa công cụ có thể được cập nhật sau khi người dùng phê duyệt ban đầu, tạo ra tình huống các công cụ từng an toàn trở nên độc hại. Phân tích toàn diện xem [Tấn công Đầu độc Công cụ (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/vi/tool-injection.3b0b4a6b24de6bef.webp)

#### **Các Vecto Tấn công AI Bổ sung**

- **Chèn Prompt Liên miền Chéo (XPIA)**: Các cuộc tấn công tinh vi tận dụng nội dung từ nhiều miền để vượt qua các kiểm soát bảo mật
- **Thay đổi Động Năng lực**: Thay đổi theo thời gian thực đối với năng lực công cụ tránh khỏi các đánh giá bảo mật ban đầu
- **Đầu độc Cửa sổ Ngữ cảnh**: Các cuộc tấn công thao túng các cửa sổ ngữ cảnh lớn để che giấu các chỉ dẫn độc hại
- **Tấn công Nhầm lẫn Mô hình**: Khai thác các giới hạn của mô hình để tạo ra hành vi không thể đoán trước hoặc không an toàn


### Tác động Rủi ro An ninh AI

**Hệ quả Tác động Cao:**
- **Rò rỉ Dữ liệu**: Truy cập và trộm cắp trái phép dữ liệu doanh nghiệp hoặc cá nhân nhạy cảm
- **Xâm phạm Quyền riêng tư**: Tiết lộ thông tin nhận dạng cá nhân (PII) và dữ liệu kinh doanh bí mật  
- **Thao túng Hệ thống**: Thay đổi không chủ ý đối với các hệ thống và quy trình làm việc quan trọng
- **Đánh cắp Thông tin Đăng nhập**: Xâm phạm các token xác thực và thông tin đăng nhập dịch vụ
- **Di chuyển Bên trong**: Sử dụng hệ thống AI bị xâm phạm làm điểm trung gian cho các cuộc tấn công mạng rộng lớn hơn

### Giải pháp An ninh AI của Microsoft

#### **AI Prompt Shields: Bảo vệ Nâng cao Chống lại Tấn công Chèn Prompt**

Microsoft **AI Prompt Shields** cung cấp bảo vệ toàn diện chống lại cả tấn công chèn prompt trực tiếp và gián tiếp thông qua nhiều lớp bảo mật:

##### **Cơ chế Bảo vệ Cốt lõi:**

1. **Phát hiện & Lọc Nâng cao**
   - Thuật toán học máy và kỹ thuật xử lý ngôn ngữ tự nhiên phát hiện chỉ dẫn độc hại trong nội dung bên ngoài
   - Phân tích tài liệu, trang web, email và nguồn dữ liệu theo thời gian thực để phát hiện mối đe dọa nhúng
   - Hiểu ngữ cảnh về mẫu prompt hợp pháp và độc hại

2. **Kỹ Thuật Chiếu Sáng**  
   - Phân biệt giữa chỉ dẫn hệ thống được tin cậy và đầu vào bên ngoài có thể bị xâm phạm
   - Các phương pháp biến đổi văn bản tăng cường liên quan mô hình trong khi cô lập nội dung độc hại
   - Giúp hệ thống AI duy trì bậc thang chỉ dẫn đúng và bỏ qua lệnh chèn

3. **Hệ thống Định giới & Đánh dấu Dữ liệu**
   - Định nghĩa rõ ràng ranh giới giữa tin nhắn hệ thống được tin cậy và văn bản đầu vào bên ngoài
   - Các dấu hiệu đặc biệt làm nổi bật ranh giới giữa nguồn dữ liệu tin cậy và không tin cậy
   - Phân tách rõ ràng ngăn chặn nhầm lẫn chỉ dẫn và thực thi lệnh trái phép

4. **Tình báo Mối đe dọa Liên tục**
   - Microsoft theo dõi liên tục các mẫu tấn công mới nổi và cập nhật phòng thủ
   - Săn mối đe dọa chủ động cho kỹ thuật chèn và vectơ tấn công mới
   - Cập nhật mô hình bảo mật định kỳ để duy trì hiệu quả chống các mối đe dọa tiến hóa

5. **Tích hợp Azure Content Safety**
   - Là một phần của bộ Azure AI Content Safety toàn diện
   - Phát hiện bổ sung các cố gắng jailbreak, nội dung có hại, và vi phạm chính sách bảo mật
   - Điều khiển bảo mật thống nhất trên các thành phần ứng dụng AI

**Tài nguyên Triển khai**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/vi/prompt-shield.ff5b95be76e9c78c.webp)


## Các Mối đe dọa An ninh MCP Nâng cao

### Lỗ hổng Chiếm quyền Phiên làm việc

**Chiếm quyền phiên làm việc** là một vectơ tấn công quan trọng trong các triển khai MCP trạng thái, nơi các bên không được phép có được và lạm dụng các định danh phiên hợp pháp để giả mạo khách hàng và thực hiện các hành động trái phép.

#### **Kịch bản Tấn công & Rủi ro**

- **Chèn prompt chiếm quyền phiên**: Kẻ tấn công với ID phiên bị đánh cắp chèn các sự kiện độc hại vào các máy chủ chia sẻ trạng thái phiên, có thể kích hoạt hành động gây hại hoặc truy cập dữ liệu nhạy cảm
- **Giả mạo Trực tiếp**: ID phiên bị đánh cắp cho phép gọi trực tiếp máy chủ MCP bỏ qua xác thực, coi kẻ tấn công là người dùng hợp pháp
- **Luồng có thể Tạm dừng bị Xâm phạm**: Kẻ tấn công có thể kết thúc yêu cầu sớm, khiến khách hàng hợp pháp tiếp tục với nội dung tiềm năng độc hại

#### **Kiểm soát Bảo mật Quản lý Phiên làm việc**

**Yêu cầu Quan trọng:**
- **Xác thực Ủy quyền**: Máy chủ MCP thực thi ủy quyền **PHẢI** xác minh TẤT CẢ yêu cầu vào và **KHÔNG ĐƯỢC** dựa vào phiên cho xác thực
- **Sinh Phiên Bảo mật**: Sử dụng ID phiên không định trước, bảo mật mã hóa tạo bằng trình tạo số ngẫu nhiên an toàn
- **Ràng buộc theo Người dùng**: Ràng buộc ID phiên với thông tin người dùng cụ thể theo định dạng như `<user_id>:<session_id>` để ngăn lạm dụng phiên chéo người dùng
- **Quản lý Chu kỳ Phiên**: Triển khai hết hạn, xoay vòng và vô hiệu hóa đúng cách để giới hạn cửa sổ dễ bị tổn thương
- **Bảo mật Vận chuyển**: Yêu cầu HTTPS cho tất cả truyền thông để ngăn chặn chặn bắt ID phiên

### Vấn đề Đại diện Nhầm lẫn

Vấn đề **đại diện nhầm lẫn** xảy ra khi các máy chủ MCP đóng vai trò như proxy xác thực giữa khách hàng với dịch vụ bên thứ ba, tạo cơ hội vượt ủy quyền qua khai thác ID khách hàng tĩnh.

#### **Cơ chế Tấn công & Rủi ro**

- **Vượt qua đồng thuận dựa trên Cookie**: Xác thực người dùng trước đó tạo cookie đồng thuận mà kẻ tấn công lợi dụng trong các yêu cầu ủy quyền độc hại với URI chuyển hướng thủ công
- **Đánh cắp Mã Ủy quyền**: Cookie đồng thuận sẵn có có thể khiến máy chủ ủy quyền bỏ qua màn hình đồng thuận, chuyển mã về endpoint do kẻ tấn công kiểm soát  
- **Truy cập API trái phép**: Mã ủy quyền bị đánh cắp cho phép trao đổi token và giả mạo người dùng mà không cần phê duyệt rõ ràng

#### **Chiến lược Giảm thiểu**

**Kiểm soát Bắt buộc:**
- **Yêu cầu Đồng thuận Rõ ràng**: Máy chủ proxy MCP sử dụng ID khách hàng tĩnh **PHẢI** lấy được sự đồng thuận của người dùng cho từng khách hàng được đăng ký động
- **Triển khai Bảo mật OAuth 2.1**: Tuân thủ các thực tiễn bảo mật OAuth hiện tại bao gồm PKCE (Proof Key for Code Exchange) cho mọi yêu cầu ủy quyền
- **Xác thực Khách hàng Nghiêm ngặt**: Thực hiện xác thực chặt chẽ URI chuyển hướng và định danh khách hàng để ngăn khai thác

### Lỗ hổng Chuyển tiếp Token  

**Chuyển tiếp token** là một mẫu phản đối rõ ràng khi máy chủ MCP chấp nhận token của khách hàng mà không kiểm tra hợp lệ và chuyển tiếp chúng tới API hạ nguồn, vi phạm các quy định ủy quyền MCP.

#### **Hệ quả Bảo mật**

- **Vượt Kiểm soát**: Sử dụng token trực tiếp từ khách hàng tới API bỏ qua hạn chế tốc độ, xác thực và kiểm soát giám sát quan trọng
- **Hỏng Đường Dẫn Kiểm tra**: Token cấp trên khiến việc xác định khách hàng không thể, phá vỡ khả năng điều tra sự cố
- **Rò rỉ Dữ liệu Qua Proxy**: Token không chuyển đổi cho phép kẻ độc hại dùng máy chủ làm proxy truy cập dữ liệu trái phép
- **Vi phạm Vùng tin cậy**: Niềm tin của dịch vụ hạ nguồn có thể bị phá vỡ khi nguồn token không được xác minh
- **Mở Rộng Tấn công Đa dịch vụ**: Token bị xâm nhập được chấp nhận trên nhiều dịch vụ tạo điều kiện di chuyển bên trong

#### **Kiểm soát Bảo mật Cần thiết**

**Yêu cầu Không Thể Thương Lượng:**
- **Xác thực Token**: Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận token không được cấp rõ ràng cho máy chủ MCP
- **Xác minh Đối tượng Token**: Luôn kiểm tra đối tượng token khớp với danh tính máy chủ MCP
- **Vòng đời Token Hợp lý**: Thực hiện token truy cập thời hạn ngắn kèm thực hành xoay vòng bảo mật


## An ninh Chuỗi Cung Ứng cho Hệ thống AI

An ninh chuỗi cung ứng đã phát triển vượt ra ngoài các phụ thuộc phần mềm truyền thống để bao phủ toàn bộ hệ sinh thái AI. Các triển khai MCP hiện đại phải nghiêm ngặt xác minh và giám sát tất cả thành phần liên quan đến AI, vì mỗi thành phần đều có thể chứa các lỗ hổng tiềm năng làm suy yếu tính toàn vẹn hệ thống.

### Các Thành phần Chuỗi Cung Ứng AI Mở rộng

**Phụ thuộc Phần mềm Truyền thống:**
- Thư viện mã nguồn mở và framework
- Hình ảnh container và hệ điều hành nền  
- Công cụ phát triển và pipeline xây dựng
- Thành phần hạ tầng và dịch vụ

**Thành phần Chuỗi Cung Ứng Riêng cho AI:**
- **Mô hình Nền tảng**: Mô hình huấn luyện sẵn từ nhiều nhà cung cấp đòi hỏi xác minh nguồn gốc
- **Dịch vụ Nhúng**: Dịch vụ vectơ hóa và tìm kiếm ngữ nghĩa bên ngoài
- **Nhà cung cấp Ngữ cảnh**: Nguồn dữ liệu, cơ sở tri thức và kho tài liệu  
- **API Bên thứ ba**: Dịch vụ AI bên ngoài, pipeline ML và endpoint xử lý dữ liệu
- **Vật thể Mô hình**: Trọng số, cấu hình và biến thể mô hình đã tinh chỉnh
- **Nguồn Dữ liệu Huấn luyện**: Bộ dữ liệu dùng cho huấn luyện và tinh chỉnh mô hình

### Chiến lược Toàn diện An ninh Chuỗi Cung Ứng

#### **Xác minh Thành phần & Niềm tin**
- **Định danh Nguồn gốc**: Xác minh xuất xứ, giấy phép và tính toàn vẹn của mọi thành phần AI trước khi tích hợp
- **Đánh giá Bảo mật**: Thực hiện quét lỗ hổng và đánh giá bảo mật cho mô hình, nguồn dữ liệu và dịch vụ AI
- **Phân tích Uy tín**: Đánh giá hồ sơ bảo mật và thực tiễn của nhà cung cấp dịch vụ AI
- **Xác minh Tuân thủ**: Đảm bảo mọi thành phần đáp ứng yêu cầu bảo mật và quy định tổ chức

#### **Pipeline Triển khai An toàn**  
- **CI/CD Tự động Hóa Bảo mật**: Tích hợp quét bảo mật xuyên suốt pipeline triển khai tự động
- **Toàn vẹn Vật thể**: Triển khai xác minh mã hóa cho tất cả vật thể triển khai (mã, mô hình, cấu hình)
- **Triển khai Giai đoạn**: Sử dụng chiến lược triển khai tiến triển với xác minh bảo mật tại mỗi giai đoạn
- **Kho Vật thể Tin cậy**: Chỉ triển khai từ các kho và registry vật thể đã xác minh và an toàn

#### **Giám sát Liên tục & Phản hồi**
- **Quét Phụ thuộc**: Giám sát lỗ hổng liên tục cho tất cả phụ thuộc phần mềm và thành phần AI
- **Giám sát Mô hình**: Đánh giá liên tục hành vi mô hình, trôi hiệu năng và dị thường bảo mật
- **Theo dõi Sức khỏe Dịch vụ**: Giám sát dịch vụ AI bên ngoài về độ sẵn sàng, sự cố bảo mật và thay đổi chính sách
- **Tích hợp Tình báo Mối đe dọa**: Kết hợp nguồn tin tình báo đặc thù cho rủi ro bảo mật AI và ML

#### **Kiểm soát Truy cập & Quyền Ít nhất**
- **Quyền Thành phần**: Giới hạn truy cập mô hình, dữ liệu và dịch vụ dựa trên yêu cầu công việc
- **Quản lý Tài khoản Dịch vụ**: Thực hiện tài khoản dịch vụ riêng biệt với quyền hạn tối thiểu cần thiết
- **Phân đoạn Mạng**: Cô lập các thành phần AI và giới hạn truy cập mạng giữa các dịch vụ
- **Kiểm soát Cổng API**: Dùng cổng API trung tâm để kiểm soát và giám sát truy cập dịch vụ AI bên ngoài

#### **Phản ứng Sự cố & Phục hồi**
- **Quy trình Phản hồi Nhanh**: Quy trình đã thiết lập để vá hoặc thay thế thành phần AI bị xâm phạm
- **Xoay vòng Thông tin Đăng nhập**: Hệ thống tự động xoay vòng bí mật, khóa API và thông tin đăng nhập dịch vụ
- **Khả năng Quay lại**: Khả năng nhanh chóng phục hồi về phiên bản AI trước đó được xác nhận an toàn
- **Phục hồi Vi phạm Chuỗi Cung Ứng**: Quy trình cụ thể khi phản ứng với xâm phạm dịch vụ AI thượng nguồn

### Công cụ & Tích hợp Bảo mật Microsoft

**GitHub Advanced Security** cung cấp bảo vệ chuỗi cung ứng toàn diện bao gồm:
- **Quét Bí mật**: Tự động phát hiện thông tin đăng nhập, khóa API và token trong kho mã
- **Quét Phụ thuộc**: Đánh giá lỗ hổng cho phụ thuộc mã nguồn mở và thư viện
- **Phân tích CodeQL**: Phân tích mã tĩnh tìm lỗ hổng bảo mật và vấn đề mã hóa
- **Thông tin Chuỗi Cung Ứng**: Khả năng nhìn nhận sức khỏe và trạng thái bảo mật phụ thuộc

**Tích hợp Azure DevOps & Azure Repos:**
- Tích hợp quét bảo mật liền mạch trên nền tảng phát triển Microsoft
- Kiểm tra bảo mật tự động trong Azure Pipelines cho khối lượng công việc AI
- Thi hành chính sách triển khai thành phần AI an toàn

**Thực tiễn Nội bộ Microsoft:**
Microsoft áp dụng quy trình bảo mật chuỗi cung ứng rộng rãi trên tất cả sản phẩm. Tìm hiểu các phương pháp đã được chứng minh tại [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Thực hành Tốt nhất về An ninh Nền tảng

Các triển khai MCP kế thừa và xây dựng dựa trên tư thế bảo mật hiện có của tổ chức bạn. Củng cố các thực hành bảo mật nền tảng sẽ nâng cao đáng kể tổng thể an ninh cho hệ thống AI và triển khai MCP.

### Các Nguyên tắc Bảo mật Cốt lõi

#### **Thực hành Phát triển An toàn**
- **Tuân thủ OWASP**: Bảo vệ chống lại các lỗ hổng ứng dụng web [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Bảo vệ Đặc thù cho AI**: Triển khai kiểm soát cho [OWASP Top 10 cho LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Quản lý Bí mật An toàn**: Dùng các kho bí mật riêng biệt cho token, khóa API và cấu hình nhạy cảm
- **Mã hóa Toàn diện**: Thực hiện giao tiếp an toàn giữa tất cả thành phần ứng dụng và luồng dữ liệu
- **Xác thực Đầu vào**: Rà soát chặt chẽ mọi đầu vào người dùng, tham số API và nguồn dữ liệu

#### **Tăng cường Hạ tầng**
- **Xác thực Đa Yếu tố**: Yêu cầu MFA cho tất cả tài khoản quản trị và dịch vụ
- **Quản lý Bản vá**: Tự động và kịp thời vá lỗi hệ điều hành, framework và phụ thuộc  
- **Tích hợp Nhà cung cấp Danh tính**: Quản lý danh tính tập trung bằng nhà cung cấp danh tính doanh nghiệp (Microsoft Entra ID, Active Directory)
- **Phân đoạn Mạng**: Cô lập logic các thành phần MCP để hạn chế khả năng di chuyển bên trong
- **Nguyên tắc Quyền Ít nhất**: Cấp quyền tối thiểu cần thiết cho mọi thành phần hệ thống và tài khoản

#### **Giám sát & Phát hiện Bảo mật**
- **Ghi nhật ký Toàn diện**: Ghi lại chi tiết hoạt động ứng dụng AI, bao gồm tương tác client-server MCP
- **Tích hợp SIEM**: Quản lý thông tin và sự kiện bảo mật tập trung để phát hiện bất thường
- **Phân tích Hành vi**: Giám sát dựa trên AI phát hiện mẫu hành vi dị thường của hệ thống và người dùng
- **Tình báo Mối đe dọa**: Kết hợp nguồn tin bên ngoài và chỉ số xâm nhập (IOC)
- **Phản ứng Sự cố**: Quy trình rõ ràng phát hiện, xử lý và khắc phục sự cố bảo mật

#### **Kiến trúc Zero Trust**
- **Không bao giờ tin, luôn xác minh**: Liên tục xác minh người dùng, thiết bị và kết nối mạng
- **Vi phân mạng vi mô**: Kiểm soát mạng chi tiết tách biệt khối lượng công việc và dịch vụ riêng biệt
- **An ninh dựa trên Danh tính**: Chính sách bảo mật dựa trên danh tính đã xác minh thay vì vị trí mạng
- **Đánh giá Rủi ro Liên tục**: Đánh giá tư thế bảo mật động dựa vào ngữ cảnh và hành vi hiện tại
- **Truy cập Có điều kiện**: Kiểm soát truy cập điều chỉnh theo yếu tố rủi ro, vị trí và độ tin cậy thiết bị

### Mô hình Tích hợp Doanh nghiệp

#### **Tích hợp Hệ sinh thái Bảo mật Microsoft**
- **Microsoft Defender for Cloud**: Quản lý tư thế bảo mật đám mây toàn diện
- **Azure Sentinel**: SIEM gốc đám mây và khả năng SOAR bảo vệ khối lượng công việc AI
- **Microsoft Entra ID**: Quản lý danh tính và truy cập doanh nghiệp với chính sách truy cập có điều kiện
- **Azure Key Vault**: Quản lý bí mật tập trung với hỗ trợ mô-đun bảo mật phần cứng (HSM)
- **Microsoft Purview**: Quản trị dữ liệu và tuân thủ cho nguồn dữ liệu AI và quy trình làm việc

#### **Tuân thủ & Quản trị**
- **Phù hợp Quy định**: Đảm bảo triển khai MCP đáp ứng các yêu cầu tuân thủ ngành (GDPR, HIPAA, SOC 2)
- **Phân loại Dữ liệu**: Phân loại và xử lý phù hợp dữ liệu nhạy cảm do AI xử lý
- **Đường Dẫn Kiểm toán**: Ghi nhật ký toàn diện hỗ trợ tuân thủ quy định và điều tra pháp y
- **Kiểm soát Quyền riêng tư**: Triển khai nguyên tắc bảo mật theo thiết kế trong kiến trúc hệ thống AI
- **Quản lý Thay đổi**: Quy trình chính thức cho đánh giá bảo mật các sửa đổi hệ thống AI

Những thực hành nền tảng này tạo ra một nền tảng bảo mật vững chắc giúp tăng hiệu quả của các kiểm soát bảo mật đặc thù MCP và cung cấp sự bảo vệ toàn diện cho các ứng dụng AI.

## Những Điểm Chính về An ninh
- **Cách tiếp cận Bảo mật nhiều lớp**: Kết hợp các thực hành bảo mật nền tảng (lập trình an toàn, đặc quyền tối thiểu, xác minh chuỗi cung ứng, giám sát liên tục) với các kiểm soát đặc thù AI để bảo vệ toàn diện

- **Cảnh quan Mối đe dọa Đặc thù AI**: Hệ thống MCP đối mặt với các rủi ro đặc biệt bao gồm tấn công chèn prompt, đầu độc công cụ, chiếm quyền phiên làm việc, sự cố nhầm lẫn đại diện, lỗ hổng chuyển tiếp token và quyền hạn quá mức đòi hỏi các biện pháp giảm thiểu chuyên biệt

- **Xuất sắc trong Xác thực & Phân quyền**: Triển khai xác thực mạnh mẽ sử dụng nhà cung cấp danh tính bên ngoài (Microsoft Entra ID), thực thi xác thực token đúng cách, và không bao giờ chấp nhận các token không được phát hành rõ ràng cho máy chủ MCP của bạn

- **Phòng chống Tấn công AI**: Triển khai Microsoft Prompt Shields và Azure Content Safety để phòng thủ trước các tấn công chèn prompt gián tiếp và đầu độc công cụ, đồng thời xác thực metadata công cụ và giám sát các thay đổi động

- **Bảo mật Phiên làm việc & Giao thức**: Sử dụng ID phiên làm việc phi xác định, an toàn mật mã được liên kết với danh tính người dùng, triển khai quản lý vòng đời phiên làm việc đúng cách, và không bao giờ dùng phiên làm việc để xác thực

- **Thực hành Tốt nhất Bảo mật OAuth**: Ngăn chặn tấn công đại diện nhầm lẫn bằng sự đồng thuận rõ ràng của người dùng đối với các client đăng ký động, triển khai OAuth 2.1 đúng chuẩn với PKCE, và xác thực URI chuyển hướng nghiêm ngặt  

- **Nguyên tắc Bảo mật Token**: Tránh các mẫu chống chuyển tiếp token, xác thực câu claim đối tượng token, triển khai token thời gian sống ngắn với xoay vòng bảo mật, và duy trì ranh giới tin cậy rõ ràng

- **Bảo mật Chuỗi Cung ứng Toàn diện**: Đối xử với tất cả các thành phần hệ sinh thái AI (mô hình, embeddings, nhà cung cấp ngữ cảnh, API bên ngoài) với độ nghiêm ngặt bảo mật như các phụ thuộc phần mềm truyền thống

- **Tiến hóa Liên tục**: Luôn cập nhật với các đặc tả MCP phát triển nhanh, đóng góp cho các tiêu chuẩn cộng đồng bảo mật, và duy trì tư thế bảo mật thích ứng khi giao thức phát triển

- **Tích hợp Bảo mật Microsoft**: Tận dụng hệ sinh thái bảo mật toàn diện của Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) để nâng cao bảo vệ triển khai MCP

## Tài nguyên Toàn diện

### **Tài liệu Bảo mật MCP Chính thức**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **Tài nguyên Bảo mật OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Hướng dẫn triển khai Azure cho OWASP MCP Top 10 toàn diện
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Các rủi ro bảo mật MCP chính thức của OWASP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo thực hành bảo mật cho MCP trên Azure

### **Tiêu chuẩn & Thực hành Tốt nhất Bảo mật**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Nghiên cứu & Phân tích Bảo mật AI**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Giải pháp Bảo mật Microsoft**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Hướng dẫn & Bài học Triển khai**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **Bảo mật DevOps & Chuỗi Cung ứng**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Tài liệu Bảo mật Bổ sung**

Để được hướng dẫn bảo mật toàn diện, tham khảo các tài liệu chuyên biệt trong phần này:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Các thực hành bảo mật hoàn chỉnh cho triển khai MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Ví dụ triển khai thực tế cho tích hợp Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Các kiểm soát và kỹ thuật bảo mật mới nhất cho triển khai MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Hướng dẫn nhanh các thực hành bảo mật MCP thiết yếu
- **[BlueHat 2026: Securing the future of AI: Securing MCP with defense in depth patterns](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Mô hình phòng thủ nhiều lớp từ Trung tâm Phản ứng Bảo mật Microsoft (MSRC)

### **Đào tạo Bảo mật Thực hành**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop thực hành toàn diện để bảo mật máy chủ MCP trên Azure với các cấp độ từ Base Camp đến Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Kiến trúc tham chiếu và hướng dẫn triển khai cho tất cả rủi ro OWASP MCP Top 10

---

## Tiếp theo

Tiếp theo: [Chapter 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->