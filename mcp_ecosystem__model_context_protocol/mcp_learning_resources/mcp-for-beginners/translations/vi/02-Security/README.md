# MCP Security: Bảo Vệ Toàn Diện Cho Hệ Thống AI

[![MCP Security Best Practices](../../../translated_images/vi/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Nhấn vào hình bên trên để xem video của bài học này)_

Bảo mật là nền tảng thiết kế hệ thống AI, đó là lý do tại sao chúng tôi ưu tiên nó là phần thứ hai. Điều này phù hợp với nguyên tắc **Secure by Design** của Microsoft từ [Sáng kiến Tương lai An toàn](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Giao thức Ngữ cảnh Mô hình (MCP) mang đến những khả năng mới mạnh mẽ cho các ứng dụng điều khiển bởi AI đồng thời giới thiệu những thách thức bảo mật đặc thù vượt ra ngoài các rủi ro phần mềm truyền thống. Các hệ thống MCP phải đối mặt với cả những mối quan ngại bảo mật đã được xác lập (lập trình an toàn, nguyên tắc đặc quyền tối thiểu, bảo mật chuỗi cung ứng) và các mối đe dọa riêng biệt cho AI như tiêm chích prompt, đầu độc công cụ, chiếm đoạt phiên, tấn công confused deputy, lỗ hổng truyền token, và sửa đổi năng lực động.

Bài học này khám phá những rủi ro bảo mật quan trọng nhất trong các triển khai MCP — bao gồm xác thực, phân quyền, quyền hạn quá mức, tiêm prompt gián tiếp, bảo mật phiên, vấn đề confused deputy, quản lý token, và lỗ hổng chuỗi cung ứng. Bạn sẽ học được các biện pháp kiểm soát và thực hành tốt để giảm thiểu những rủi ro này đồng thời tận dụng các giải pháp của Microsoft như Prompt Shields, Azure Content Safety, và GitHub Advanced Security để củng cố triển khai MCP của bạn.

## Mục tiêu học tập

Vào cuối bài học này, bạn sẽ có thể:

- **Nhận diện Mối đe dọa Đặc thù MCP**: Nhận biết rủi ro bảo mật độc đáo trong hệ thống MCP bao gồm tiêm prompt, đầu độc công cụ, quyền hạn quá mức, chiếm đoạt phiên, vấn đề confused deputy, lỗ hổng truyền token, và rủi ro chuỗi cung ứng
- **Áp dụng Các Kiểm soát Bảo mật**: Triển khai các biện pháp giảm thiểu hiệu quả bao gồm xác thực mạnh mẽ, quyền truy cập theo nguyên tắc đặc quyền tối thiểu, quản lý token an toàn, kiểm soát bảo mật phiên, và xác minh chuỗi cung ứng
- **Tận dụng Giải pháp Bảo mật Microsoft**: Hiểu và triển khai Microsoft Prompt Shields, Azure Content Safety, và GitHub Advanced Security để bảo vệ khối lượng công việc MCP
- **Xác thực An toàn Công cụ**: Nhận biết tầm quan trọng của xác thực siêu dữ liệu công cụ, giám sát thay đổi động, và phòng chống các cuộc tấn công tiêm prompt gián tiếp
- **Tích hợp Thực hành Tốt nhất**: Kết hợp các nguyên tắc bảo mật nền tảng (lập trình an toàn, bảo mật máy chủ, zero trust) với kiểm soát đặc thù MCP để bảo vệ toàn diện

# Kiến trúc & Kiểm soát Bảo mật MCP

Các triển khai MCP hiện đại đòi hỏi các phương pháp bảo mật nhiều lớp giải quyết cả bảo mật phần mềm truyền thống và các mối đe dọa riêng cho AI. Đặc tả MCP đang phát triển nhanh chóng sẽ tiếp tục hoàn thiện các biện pháp kiểm soát bảo mật, giúp tích hợp tốt hơn với kiến trúc bảo mật doanh nghiệp và các phương pháp thực hành tốt đã được xác lập.

Nghiên cứu từ [Báo cáo Phòng thủ Kỹ thuật số Microsoft](https://aka.ms/mddr) cho thấy rằng **98% các vi phạm được báo cáo sẽ được ngăn chặn nhờ duy trì thói quen vệ sinh bảo mật mạnh mẽ**. Chiến lược bảo vệ hiệu quả nhất là kết hợp các thực hành bảo mật nền tảng với kiểm soát đặc thù MCP — các biện pháp bảo mật căn bản đã được chứng minh vẫn là có tác động lớn nhất trong việc giảm tổng thể rủi ro bảo mật.

## Bối cảnh Bảo mật Hiện tại

> **Lưu ý:** Thông tin này phản ánh các tiêu chuẩn bảo mật MCP tính đến **ngày 5 tháng 2 năm 2026**, phù hợp với **Đặc tả MCP 2025-11-25**. Giao thức MCP còn tiếp tục phát triển nhanh và các triển khai trong tương lai có thể giới thiệu các mẫu xác thực mới và kiểm soát nâng cao. Luôn tham khảo [Đặc tả MCP hiện tại](https://spec.modelcontextprotocol.io/), [kho lưu trữ MCP trên GitHub](https://github.com/modelcontextprotocol), và [tài liệu thực hành bảo mật tốt nhất](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) để có hướng dẫn mới nhất.

## 🏔️ Hội thảo MCP Security Summit (Sherpa)

Để được **đào tạo bảo mật thực hành**, chúng tôi rất khuyến khích tham gia **Hội thảo MCP Security Summit** (Sherpa) — một chuyến thám hiểm đầy đủ hướng dẫn về bảo mật các máy chủ MCP trên Microsoft Azure.

### Tổng quan Hội thảo

[Hội thảo MCP Security Summit](https://azure-samples.github.io/sherpa/) cung cấp đào tạo bảo mật thực tiễn, khả thi thông qua phương pháp luận "dễ vỡ → khai thác → sửa chữa → xác nhận" đã được chứng minh. Bạn sẽ:

- **Học qua trải nghiệm làm hỏng**: Trực tiếp trải nghiệm lỗ hổng bằng cách khai thác các máy chủ cố ý không an toàn
- **Sử dụng Bảo mật Azure tự nhiên**: Tận dụng Azure Entra ID, Key Vault, API Management, và AI Content Safety
- **Theo dõi Phòng thủ nhiều lớp**: Tiến triển qua các trại xây dựng lớp bảo mật toàn diện
- **Áp dụng Chuẩn OWASP**: Mỗi kỹ thuật tương ứng với [Hướng dẫn Bảo mật MCP Azure của OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Có Mã nguồn Thực tế**: Kết thúc với các triển khai hoạt động và đã thử nghiệm

### Lộ trình Chuyến thám hiểm

| Trại | Tiêu điểm | Các Rủi Ro OWASP Được Bao phủ |
|------|-----------|-------------------------------|
| **Trại Cơ Bản** | Các nguyên tắc MCP & lỗ hổng xác thực | MCP01, MCP07 |
| **Trại 1: Danh tính** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Trại 2: Gateway** | API Management, Private Endpoints, quản trị | MCP02, MCP07, MCP09 |
| **Trại 3: Bảo mật I/O** | Tiêm prompt, bảo vệ PII, content safety | MCP03, MCP05, MCP06 |
| **Trại 4: Giám sát** | Log Analytics, bảng điều khiển, phát hiện mối đe dọa | MCP08 |
| **Đỉnh Núi** | Kiểm tra tích hợp Đội Đỏ / Đội Xanh | Tất cả |

**Bắt đầu ngay**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Rủi Ro Bảo mật MCP theo OWASP

[Hướng dẫn Bảo mật MCP Azure của OWASP](https://microsoft.github.io/mcp-azure-security-guide/) nêu chi tiết mười rủi ro bảo mật nghiêm trọng nhất cho các triển khai MCP:

| Rủi ro | Mô tả | Biện pháp Azure |
|--------|-------|----------------|
| **MCP01** | Quản lý Token sai & Lộ bí mật | Azure Key Vault, Managed Identity |
| **MCP02** | Tăng đặc quyền qua phạm vi mở rộng | RBAC, Conditional Access |
| **MCP03** | Đầu độc Công cụ | Xác thực công cụ, kiểm tra tính toàn vẹn |
| **MCP04** | Tấn công Chuỗi Cung Ứng | GitHub Advanced Security, quét phụ thuộc |
| **MCP05** | Tiêm & Thực thi Lệnh | Xác thực đầu vào, sandbox |
| **MCP06** | Tiêm Prompt qua Nội dung Ngữ cảnh | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Xác thực & Phân quyền không đầy đủ | Azure Entra ID, OAuth 2.1 với PKCE |
| **MCP08** | Thiếu Kiểm toán & Thu thập Dữ liệu | Azure Monitor, Application Insights |
| **MCP09** | Máy chủ MCP Bóng tối | Quản trị API Center, cô lập mạng |
| **MCP10** | Tiêm Ngữ cảnh & Chia sẻ Quá mức | Phân loại dữ liệu, giới hạn phơi bày |

### Sự Phát triển của Xác thực MCP

Đặc tả MCP đã tiến hóa đáng kể về cách tiếp cận xác thực và phân quyền:

- **Phương pháp ban đầu:** Các đặc tả đầu tiên yêu cầu nhà phát triển xây dựng máy chủ xác thực tùy chỉnh, với máy chủ MCP hoạt động như OAuth 2.0 Authorization Server quản lý xác thực người dùng trực tiếp
- **Tiêu chuẩn hiện tại (2025-11-25):** Đặc tả cập nhật cho phép máy chủ MCP chuyển giao xác thực cho các nhà cung cấp danh tính bên ngoài (như Microsoft Entra ID), cải thiện tư thế bảo mật và giảm độ phức tạp triển khai
- **Bảo mật lớp vận chuyển:** Hỗ trợ nâng cao các cơ chế truyền tải an toàn với mẫu xác thực đúng đắn cho cả kết nối cục bộ (STDIO) và từ xa (Streamable HTTP)

## Bảo mật Xác thực & Phân quyền

### Thách thức Bảo mật Hiện tại

Các triển khai MCP hiện đại đối mặt với các thách thức xác thực và phân quyền sau:

### Rủi ro & Các vectơ tấn công

- **Logic phân quyền cấu hình sai:** Việc triển khai phân quyền lỗi trong máy chủ MCP có thể làm lộ dữ liệu nhạy cảm và áp dụng sai kiểm soát truy cập
- **Xâm phạm token OAuth:** Ăn cắp token máy chủ MCP cục bộ cho phép kẻ tấn công giả danh máy chủ và truy cập dịch vụ hạ nguồn
- **Lỗ hổng truyền token:** Xử lý token không đúng tạo điều kiện bỏ qua kiểm soát bảo mật và thiếu trách nhiệm
- **Quyền hạn quá mức:** Máy chủ MCP có đặc quyền quá lớn vi phạm nguyên tắc đặc quyền tối thiểu và mở rộng bề mặt tấn công

#### Truyền token: Một mô hình chống chỉ định nghiêm trọng

**Truyền token bị nghiêm cấm rõ ràng** trong đặc tả phân quyền MCP hiện tại do hậu quả nghiêm trọng về bảo mật:

##### Bỏ qua kiểm soát bảo mật  
- Các máy chủ MCP và API hạ nguồn thực thi các kiểm soát bảo mật quan trọng (giới hạn tốc độ, xác thực yêu cầu, giám sát lưu lượng) dựa vào xác thực token đúng cách  
- Việc sử dụng token trực tiếp từ client đến API bỏ qua các biện pháp bảo vệ thiết yếu, làm suy yếu kiến trúc bảo mật  

##### Thách thức về trách nhiệm & kiểm toán  
- Máy chủ MCP không thể phân biệt các client sử dụng token do bên trên cấp, phá vỡ chuỗi theo dõi kiểm toán  
- Nhật ký máy chủ tài nguyên hạ nguồn thể hiện sai lệch nguồn gốc yêu cầu thay vì trung gian máy chủ MCP thực tế  
- Điều tra sự cố và kiểm tra tuân thủ trở nên khó khăn hơn nhiều  

##### Rủi ro rò rỉ dữ liệu  
- Các tuyên bố token không được kiểm chứng cho phép kẻ ác sử dụng token bị đánh cắp làm proxy rò rỉ dữ liệu qua máy chủ MCP  
- Vi phạm ranh giới tín nhiệm cho phép truy cập trái phép và bỏ qua kiểm soát bảo mật  

##### Vectơ tấn công đa dịch vụ  
- Token bị xâm nhập được chấp nhận bởi nhiều dịch vụ cho phép di chuyển ngang trong hệ thống kết nối  
- Giả định tin tưởng giữa các dịch vụ có thể bị phá vỡ khi nguồn gốc token không được xác minh  

### Kiểm soát & Giảm thiểu Bảo mật

**Yêu cầu bảo mật quan trọng:**

> **BẮT BUỘC**: Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận bất kỳ token nào không được cấp rõ ràng cho máy chủ MCP đó

#### Kiểm soát Xác thực & Phân quyền

- **Đánh giá phân quyền nghiêm ngặt:** Thực hiện đánh giá toàn diện logic phân quyền máy chủ MCP để đảm bảo chỉ người dùng và client dự kiến mới truy cập tài nguyên nhạy cảm  
  - **Hướng dẫn triển khai:** [Azure API Management làm cổng xác thực cho máy chủ MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Tích hợp danh tính:** [Sử dụng Microsoft Entra ID cho xác thực máy chủ MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Quản lý token an toàn:** Áp dụng [thực hành tốt nhất của Microsoft về xác thực và vòng đời token](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Xác thực các tuyên bố audience token phù hợp với danh tính máy chủ MCP  
  - Thực hiện chính sách xoay vòng và hết hạn token đúng cách  
  - Ngăn chặn tấn công phát lại token và sử dụng trái phép  

- **Lưu trữ token được bảo vệ:** Bảo vệ lưu trữ token bằng mã hóa cả khi lưu trữ và truyền tải  
  - **Thực hành tốt nhất:** [Hướng dẫn lưu trữ và mã hóa token an toàn](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

#### Triển khai Kiểm soát Truy cập

- **Nguyên tắc đặc quyền tối thiểu:** Cấp cho máy chủ MCP chỉ các quyền tối thiểu cần thiết cho chức năng dự kiến  
  - Đánh giá và cập nhật quyền thường xuyên để tránh tình trạng quyền mở rộng  
  - **Tài liệu Microsoft:** [Truy cập an toàn theo đặc quyền tối thiểu](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kiểm soát truy cập theo vai trò (RBAC):** Áp dụng phân quyền vai trò chi tiết  
  - Giới hạn phạm vi vai trò tới tài nguyên và thao tác cụ thể  
  - Tránh quyền rộng hoặc không cần thiết làm tăng bề mặt tấn công  

- **Giám sát quyền liên tục:** Thực hiện kiểm toán truy cập và giám sát thường xuyên  
  - Theo dõi mẫu sử dụng quyền để phát hiện bất thường  
  - Nhanh chóng xử lý quyền quá mức hoặc không sử dụng  

## Mối đe dọa Bảo mật Riêng cho AI

### Tấn công Tiêm Prompt & Thao túng Công cụ

Các triển khai MCP hiện đại phải đối mặt với các vectơ tấn công phức tạp riêng biệt cho AI mà các biện pháp bảo mật truyền thống không thể xử lý toàn diện:

#### **Tiêm Prompt Gián tiếp (Tiêm Prompt Liên miền chéo)**

**Tiêm Prompt Gián tiếp** là một trong những lỗ hổng nghiêm trọng nhất trong các hệ thống AI được bật MCP. Kẻ tấn công nhúng các hướng dẫn độc hại bên trong nội dung bên ngoài — tài liệu, trang web, email, hoặc nguồn dữ liệu — mà hệ thống AI xử lý sau đó như các lệnh hợp lệ.

**Kịch bản tấn công:**  
- **Tiêm dựa trên tài liệu:** Hướng dẫn độc hại ẩn trong tài liệu được xử lý gây ra hành động AI không mong muốn  
- **Khai thác nội dung web:** Trang web bị xâm nhập chứa prompt nhúng thao túng hành vi AI khi được thu thập  
- **Tấn công qua email:** Prompt độc hại trong email khiến trợ lý AI rò rỉ thông tin hoặc thực hiện hành động trái phép  
- **Ô nhiễm nguồn dữ liệu:** Cơ sở dữ liệu hoặc API bị xâm nhập cung cấp nội dung bị giả mạo cho hệ thống AI  

**Tác động Thực tế:** Các cuộc tấn công này có thể gây rò rỉ dữ liệu, vi phạm quyền riêng tư, phát sinh nội dung độc hại, và thao túng tương tác người dùng. Để phân tích chi tiết, xem [Tiêm Prompt trong MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/vi/prompt-injection.ed9fbfde297ca877.webp)

#### **Tấn công Đầu độc Công cụ**

**Đầu độc Công cụ** tấn công vào siêu dữ liệu định nghĩa các công cụ MCP, khai thác cách LLM diễn giải mô tả và tham số công cụ để đưa ra quyết định thực thi.

**Cơ chế tấn công:**  
- **Thao túng siêu dữ liệu:** Kẻ tấn công tiêm các hướng dẫn độc hại vào mô tả công cụ, định nghĩa tham số, hoặc ví dụ sử dụng  
- **Hướng dẫn vô hình:** Prompt ẩn trong siêu dữ liệu công cụ được mô hình AI xử lý nhưng không hiển thị với người dùng  
- **Sửa đổi động công cụ ("Rug Pulls")**: Công cụ đã được người dùng phê duyệt sau đó bị thay đổi để thực hiện hành động độc hại mà không được người dùng biết  
- **Tiêm tham số:** Nội dung độc hại nhúng trong schema tham số công cụ ảnh hưởng đến hành vi mô hình  

**Rủi ro Máy chủ Lưu trữ:** Máy chủ MCP từ xa có rủi ro cao hơn do định nghĩa công cụ có thể được cập nhật sau khi người dùng phê duyệt ban đầu, tạo kịch bản công cụ trước an toàn trở thành độc hại. Để phân tích toàn diện, xem [Tấn công Đầu độc Công cụ (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/vi/tool-injection.3b0b4a6b24de6bef.webp)

#### **Các Vectơ Tấn công AI Bổ sung**

- **Tiêm Prompt Liên miền chéo (XPIA):** Các cuộc tấn công tinh vi sử dụng nội dung từ nhiều miền để vượt qua kiểm soát bảo mật
- **Sửa đổi năng lực động**: Thay đổi trong thời gian thực đối với năng lực công cụ mà thoát khỏi đánh giá an ninh ban đầu
- **Đầu độc cửa sổ ngữ cảnh**: Các cuộc tấn công thao túng cửa sổ ngữ cảnh lớn để che giấu các chỉ thị độc hại
- **Tấn công làm rối mô hình**: Khai thác giới hạn của mô hình để tạo ra các hành vi không thể đoán trước hoặc không an toàn


### Tác động Rủi ro An ninh AI

**Hậu quả Ảnh hưởng Cao:**
- **Rò rỉ dữ liệu**: Truy cập trái phép và đánh cắp dữ liệu nhạy cảm của doanh nghiệp hoặc cá nhân
- **Vi phạm quyền riêng tư**: Tiết lộ thông tin cá nhân nhận dạng được (PII) và dữ liệu kinh doanh bí mật  
- **Thao túng hệ thống**: Thay đổi không mong muốn đối với các hệ thống và quy trình làm việc quan trọng
- **Đánh cắp chứng thực**: Xâm phạm các mã thông báo xác thực và chứng thực dịch vụ
- **Di chuyển ngang**: Sử dụng các hệ thống AI bị xâm phạm làm điểm đòn bẩy cho các cuộc tấn công mạng rộng hơn

### Giải pháp An ninh AI của Microsoft

#### **Lá chắn Lệnh AI: Bảo vệ Nâng cao chống Tấn công Tiêm lệnh**

Microsoft **Lá chắn Lệnh AI** cung cấp phòng thủ toàn diện chống lại cả tấn công tiêm lệnh trực tiếp và gián tiếp thông qua nhiều lớp bảo mật:

##### **Cơ chế Bảo vệ Cốt lõi:**

1. **Phát hiện & Lọc nâng cao**
   - Thuật toán học máy và kỹ thuật NLP phát hiện các chỉ thị độc hại trong nội dung bên ngoài
   - Phân tích thời gian thực các tài liệu, trang web, email và nguồn dữ liệu để phát hiện mối đe dọa nhúng
   - Hiểu ngữ cảnh về mẫu lệnh hợp pháp so với độc hại

2. **Kỹ thuật phơi sáng**  
   - Phân biệt giữa chỉ thị hệ thống tin cậy và đầu vào bên ngoài có khả năng bị xâm phạm
   - Phương pháp chuyển đổi văn bản nâng cao liên quan của mô hình đồng thời cô lập nội dung độc hại
   - Giúp hệ thống AI duy trì đúng thứ bậc lệnh và bỏ qua các câu lệnh bị tiêm vào

3. **Hệ thống phân định & đánh dấu dữ liệu**
   - Định nghĩa ranh giới rõ ràng giữa thông điệp hệ thống đáng tin cậy và văn bản đầu vào bên ngoài
   - Các dấu hiệu đặc biệt làm nổi bật ranh giới giữa nguồn dữ liệu tin cậy và không tin cậy
   - Tách biệt rõ ràng ngăn ngừa nhầm lẫn chỉ thị và thực thi lệnh trái phép

4. **Tình báo Mối đe dọa Liên tục**
   - Microsoft liên tục theo dõi các mô hình tấn công mới nổi và cập nhật các biện pháp phòng thủ
   - Tìm kiếm mối đe dọa chủ động đối với các kỹ thuật tiêm lệnh và vector tấn công mới
   - Cập nhật thường xuyên mô hình bảo mật để duy trì hiệu quả trước các mối đe dọa thay đổi

5. **Tích hợp Azure Content Safety**
   - Một phần của bộ giải pháp toàn diện Azure AI Content Safety
   - Phát hiện bổ sung các cố gắng jailbreak, nội dung có hại và vi phạm chính sách bảo mật
   - Kiểm soát bảo mật hợp nhất trên các thành phần ứng dụng AI

**Tài nguyên Triển khai**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/vi/prompt-shield.ff5b95be76e9c78c.webp)


## Các Mối đe dọa An ninh MCP Nâng cao

### Lỗ hổng Chiếm đoạt Phiên làm việc

**Chiếm đoạt phiên làm việc** đại diện cho một vector tấn công quan trọng trong các triển khai MCP có trạng thái, nơi các bên không được phép chiếm đoạt và khai thác định danh phiên làm việc hợp pháp để giả mạo khách hàng và thực hiện các hành động trái phép.

#### **Kịch bản Tấn công & Rủi ro**

- **Tiêm lệnh chiếm đoạt phiên**: Kẻ tấn công với ID phiên bị đánh cắp tiêm sự kiện độc hại vào các máy chủ chia sẻ trạng thái phiên, có thể kích hoạt hành động gây hại hoặc truy cập dữ liệu nhạy cảm
- **Giả mạo trực tiếp**: ID phiên bị đánh cắp cho phép gọi trực tiếp máy chủ MCP mà không cần xác thực, xem kẻ tấn công như người dùng hợp pháp
- **Dòng dữ liệu có thể tiếp tục bị xâm phạm**: Kẻ tấn công có thể kết thúc yêu cầu sớm, khiến khách hợp pháp tiếp tục với nội dung có tiềm năng độc hại

#### **Kiểm soát An ninh Quản lý Phiên**

**Yêu cầu quan trọng:**
- **Xác minh quyền hạn**: Máy chủ MCP triển khai xác thực **PHẢI** kiểm tra TẤT CẢ các yêu cầu đến và **KHÔNG ĐƯỢC** dựa vào phiên làm việc để xác thực
- **Tạo Phiên an toàn**: Sử dụng ID phiên không xác định, an toàn mã hóa được tạo với bộ tạo số ngẫu nhiên an toàn
- **Ràng buộc theo người dùng**: Liên kết ID phiên với thông tin người dùng cụ thể sử dụng định dạng như `<user_id>:<session_id>` để ngăn chặn lạm dụng phiên chéo người dùng
- **Quản lý vòng đời Phiên**: Triển khai hết hạn hợp lệ, xoay vòng và hủy phiên đúng cách để giới hạn cửa sổ lỗ hổng
- **Bảo mật truyền tải**: Bắt buộc HTTPS cho mọi giao tiếp để ngăn chặn chặn bắt ID phiên

### Vấn đề Đại diện Bối rối

Vấn đề **đại diện bối rối** xảy ra khi các máy chủ MCP đóng vai trò như proxy xác thực giữa khách hàng và dịch vụ bên thứ ba, tạo cơ hội bỏ qua quyền hạn qua khai thác ID khách hàng tĩnh.

#### **Cơ chế Tấn công & Rủi ro**

- **Bỏ qua đồng thuận dựa trên Cookie**: Xác thực người dùng trước tạo cookie đồng thuận mà kẻ tấn công khai thác qua các yêu cầu ủy quyền độc hại với URI chuyển hướng được chế tạo
- **Đánh cắp mã ủy quyền**: Cookie đồng thuận hiện có có thể khiến máy chủ ủy quyền bỏ qua màn hình đồng thuận, chuyển mã về điểm cuối do kẻ tấn công kiểm soát  
- **Truy cập API trái phép**: Mã ủy quyền bị đánh cắp cho phép trao đổi token và giả mạo người dùng mà không có sự phê duyệt rõ ràng

#### **Chiến lược Giảm thiểu**

**Kiểm soát Bắt buộc:**
- **Yêu cầu đồng thuận rõ ràng**: Máy chủ proxy MCP sử dụng ID khách hàng tĩnh **PHẢI** lấy sự đồng thuận của người dùng cho từng khách hàng đăng ký động
- **Triển khai Bảo mật OAuth 2.1**: Tuân thủ các thực hành bảo mật OAuth mới nhất bao gồm PKCE cho tất cả yêu cầu ủy quyền
- **Xác thực nghiêm ngặt khách hàng**: Thực hiện xác thực chặt chẽ URI chuyển hướng và định danh khách hàng để ngăn chặn khai thác

### Lỗ hổng Chuyển tiếp Token  

**Chuyển tiếp token** là một mẫu chống rõ ràng, nơi các máy chủ MCP chấp nhận token của khách hàng mà không xác thực đúng và chuyển chúng đến API hạ nguồn, vi phạm các đặc tả ủy quyền MCP.

#### **Hệ quả An ninh**

- **Vượt qua kiểm soát**: Việc sử dụng token trực tiếp từ khách đến API bỏ qua các kiểm soát hạn chế tốc độ, xác thực và giám sát quan trọng
- **Hỏng hồ sơ kiểm toán**: Token cấp trên khiến việc xác định khách hàng trở nên không thể, làm gián đoạn khả năng điều tra sự cố
- **Rò rỉ dữ liệu qua proxy**: Token không được xác thực cho phép kẻ ác dùng máy chủ làm proxy truy cập dữ liệu trái phép
- **Vi phạm ranh giới tin cậy**: Dịch vụ hạ nguồn có thể bị vi phạm giả định tin tưởng khi không xác minh được nguồn token
- **Mở rộng tấn công đa dịch vụ**: Token bị xâm phạm được chấp nhận trên nhiều dịch vụ cho phép di chuyển ngang

#### **Kiểm soát An ninh Cần thiết**

**Yêu cầu không thể thương lượng:**
- **Xác thực token**: Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận token không được cấp rõ ràng cho máy chủ MCP
- **Xác minh đối tượng**: Luôn kiểm tra các thông tin đối tượng trong token phải trùng với danh tính máy chủ MCP
- **Vòng đời token đúng cách**: Triển khai token truy cập thời gian sống ngắn với thực hành xoay vòng an toàn


## An ninh Chuỗi Cung ứng cho Hệ thống AI

An ninh chuỗi cung ứng đã tiến xa hơn các phụ thuộc phần mềm truyền thống để bao gồm toàn bộ hệ sinh thái AI. Các triển khai MCP hiện đại phải xác minh và giám sát chặt chẽ mọi thành phần liên quan tới AI vì mỗi thành phần có thể mang lỗ hổng tiềm ẩn làm tổn hại đến toàn bộ hệ thống.

### Các Thành phần Chuỗi Cung ứng AI Mở rộng

**Phụ thuộc Phần mềm truyền thống:**
- Thư viện mã nguồn mở và khung công tác
- Ảnh container và hệ điều hành nền  
- Công cụ phát triển và quy trình xây dựng
- Thành phần hạ tầng và dịch vụ

**Thành phần Chuỗi cung ứng AI chuyên biệt:**
- **Mô hình nền tảng**: Mô hình được huấn luyện trước từ nhiều nhà cung cấp, cần xác minh nguồn gốc
- **Dịch vụ nhúng**: Dịch vụ vector hóa và tìm kiếm ngữ nghĩa bên ngoài
- **Nhà cung cấp ngữ cảnh**: Nguồn dữ liệu, cơ sở tri thức và kho tài liệu  
- **API bên thứ ba**: Dịch vụ AI bên ngoài, pipeline ML, và điểm cuối xử lý dữ liệu
- **Tài liệu mô hình**: Trọng số, cấu hình và các biến thể mô hình tinh chỉnh
- **Nguồn dữ liệu huấn luyện**: Bộ dữ liệu sử dụng để huấn luyện và tinh chỉnh mô hình

### Chiến lược An ninh Chuỗi Cung ứng Toàn diện

#### **Xác minh & Tin cậy Thành phần**
- **Kiểm tra nguồn gốc**: Xác minh xuất xứ, cấp phép và toàn vẹn tất cả thành phần AI trước khi tích hợp
- **Đánh giá An ninh**: Thực hiện quét lỗ hổng và đánh giá bảo mật cho mô hình, nguồn dữ liệu và dịch vụ AI
- **Phân tích Uy tín**: Đánh giá hồ sơ bảo mật và phương pháp của nhà cung cấp dịch vụ AI
- **Xác minh Tuân thủ**: Đảm bảo tất cả thành phần đáp ứng yêu cầu bảo mật và quy định của tổ chức

#### **Đường ống Triển khai An toàn**  
- **Tự động quét CI/CD**: Tích hợp quét bảo mật trong toàn bộ đường ống triển khai tự động
- **Toàn vẹn Tài liệu**: Thực hiện xác thực mã hóa đối với tất cả tài liệu triển khai (mã, mô hình, cấu hình)
- **Triển khai theo giai đoạn**: Sử dụng các chiến lược triển khai tiến dần với xác minh bảo mật mỗi giai đoạn
- **Kho lưu trữ Tài liệu Tin cậy**: Chỉ triển khai từ các kho tài liệu đã được xác minh, an toàn

#### **Giám sát và Phản hồi Liên tục**
- **Quét phụ thuộc**: Giám sát liên tục lỗ hổng cho tất cả phụ thuộc phần mềm và thành phần AI
- **Giám sát mô hình**: Đánh giá liên tục hành vi mô hình, trôi hiệu suất và bất thường bảo mật
- **Theo dõi sức khỏe dịch vụ**: Giám sát dịch vụ AI bên ngoài về khả năng sẵn sàng, sự cố bảo mật và thay đổi chính sách
- **Tích hợp Tình báo Mối đe dọa**: Kết hợp các nguồn thông tin mối đe dọa đặc thù cho an ninh AI và ML

#### **Kiểm soát Truy cập & Quyền ít nhất**
- **Quyền cấp ở mức thành phần**: Hạn chế truy cập mô hình, dữ liệu và dịch vụ trên cơ sở nhu cầu kinh doanh
- **Quản lý Tài khoản dịch vụ**: Triển khai tài khoản dịch vụ chuyên dụng với quyền tối thiểu cần thiết
- **Phân đoạn Mạng**: Cô lập các thành phần AI và giới hạn truy cập mạng giữa các dịch vụ
- **Kiểm soát Cổng API**: Sử dụng cổng API tập trung để kiểm soát và giám sát truy cập vào dịch vụ AI bên ngoài

#### **Phản ứng Sự cố & Phục hồi**
- **Quy trình phản ứng nhanh**: Các quy trình xác định để vá hoặc thay thế thành phần AI bị xâm phạm
- **Xoay vòng Chứng thực**: Hệ thống tự động xoay vòng bí mật, khóa API và chứng thực dịch vụ
- **Khả năng Khôi phục**: Có thể nhanh chóng quay lại phiên bản trước đã được xác nhận an toàn của thành phần AI
- **Phục hồi Vi phạm Chuỗi Cung ứng**: Quy trình cụ thể để đối phó với xâm phạm dịch vụ AI thượng nguồn

### Công cụ và Tích hợp An ninh Microsoft

**GitHub Advanced Security** cung cấp bảo vệ chuỗi cung ứng toàn diện bao gồm:
- **Quét Bí mật**: Phát hiện tự động các chứng thực, khóa API và token trong kho mã
- **Quét Phụ thuộc**: Đánh giá lỗ hổng cho phụ thuộc và thư viện mã nguồn mở
- **Phân tích CodeQL**: Phân tích mã tĩnh để tìm lỗi bảo mật và mã lỗi
- **Thông tin Chuỗi cung ứng**: Hiển thị sức khỏe và trạng thái bảo mật phụ thuộc

**Tích hợp Azure DevOps & Azure Repos:**
- Tích hợp quét bảo mật mượt mà trên các nền tảng phát triển Microsoft
- Kiểm tra bảo mật tự động trong Azure Pipelines cho khối lượng công việc AI
- Thực thi chính sách để triển khai thành phần AI an toàn

**Thực hành Nội bộ Microsoft:**
Microsoft thực hiện các thực hành an ninh chuỗi cung ứng rộng rãi trên mọi sản phẩm. Tìm hiểu các phương pháp đã được chứng minh trong [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Thực hành Tốt nhất về Bảo mật Nền tảng

Các triển khai MCP kế thừa và xây dựng trên nền tảng an ninh hiện có của tổ chức bạn. Việc củng cố các thực hành bảo mật cơ bản giúp nâng cao đáng kể an toàn tổng thể của các hệ thống AI và triển khai MCP.

### Các Nguyên tắc Bảo mật Cốt lõi

#### **Thực hành Phát triển An toàn**
- **Tuân thủ OWASP**: Bảo vệ chống các lỗ hổng ứng dụng web [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Bảo vệ chuyên biệt AI**: Thực hiện kiểm soát theo [OWASP Top 10 cho LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Quản lý Bí mật An toàn**: Sử dụng kho riêng cho token, khóa API và dữ liệu cấu hình nhạy cảm
- **Mã hóa đầu-cuối**: Triển khai giao tiếp an toàn cho mọi thành phần ứng dụng và luồng dữ liệu
- **Xác thực đầu vào**: Kiểm tra nghiêm ngặt tất cả đầu vào người dùng, tham số API, và nguồn dữ liệu

#### **Tăng cường Hạ tầng**
- **Xác thực đa yếu tố**: Bắt buộc MFA đối với tất cả tài khoản quản trị và dịch vụ
- **Quản lý vá lỗi**: Vá lỗi tự động, kịp thời cho hệ điều hành, khung công tác, và phụ thuộc  
- **Tích hợp nhà cung cấp danh tính**: Quản lý danh tính tập trung qua nhà cung cấp doanh nghiệp (Microsoft Entra ID, Active Directory)
- **Phân đoạn mạng**: Cách ly logic các thành phần MCP để hạn chế khả năng di chuyển ngang
- **Nguyên tắc Quyền ít nhất**: Quyền truy cập tối thiểu cần thiết cho mọi thành phần và tài khoản hệ thống

#### **Giám sát & Phát hiện An ninh**
- **Ghi nhật ký toàn diện**: Ghi nhật ký chi tiết hoạt động ứng dụng AI, bao gồm tương tác khách-máy chủ MCP
- **Tích hợp SIEM**: Quản lý thông tin và sự kiện bảo mật tập trung để phát hiện bất thường
- **Phân tích hành vi**: Giám sát sử dụng AI để phát hiện mẫu bất thường trong hành vi hệ thống và người dùng
- **Tình báo mối đe dọa**: Kết hợp nguồn cấp dữ liệu mối đe dọa bên ngoài và chỉ số xâm phạm (IOC)
- **Phản ứng sự cố**: Các quy trình xác định để phát hiện, phản hồi và khôi phục sự cố bảo mật

#### **Kiến trúc Zero Trust**
- **Không bao giờ tin tưởng, luôn luôn xác minh**: Xác minh liên tục người dùng, thiết bị và kết nối mạng
- **Vi phân đoạn mạng nhỏ**: Kiểm soát mạng chi tiết cách ly các tải trọng và dịch vụ riêng biệt
- **Bảo mật tập trung vào danh tính**: Chính sách bảo mật dựa trên danh tính đã được xác minh thay vì vị trí mạng
- **Đánh giá rủi ro liên tục**: Đánh giá tư thế bảo mật động dựa trên ngữ cảnh hiện tại và hành vi
- **Truy cập có điều kiện**: Kiểm soát truy cập thích ứng dựa trên yếu tố rủi ro, vị trí và độ tin cậy thiết bị

### Mẫu Tích hợp Doanh nghiệp

#### **Tích hợp Hệ sinh thái An ninh Microsoft**
- **Microsoft Defender cho Cloud**: Quản lý tư thế an ninh đám mây toàn diện
- **Azure Sentinel**: SIEM đám mây gốc và khả năng SOAR bảo vệ khối lượng công việc AI
- **Microsoft Entra ID**: Quản lý danh tính và truy cập doanh nghiệp với chính sách truy cập có điều kiện
- **Azure Key Vault**: Quản lý bí mật tập trung với mô-đun bảo mật phần cứng (HSM) hỗ trợ
- **Microsoft Purview**: Quản lý dữ liệu và tuân thủ cho nguồn dữ liệu và quy trình AI

#### **Tuân thủ & Quản trị**
- **Căn chỉnh quy định**: Đảm bảo triển khai MCP đáp ứng yêu cầu tuân thủ theo ngành (GDPR, HIPAA, SOC 2)
- **Phân loại dữ liệu**: Phân loại và xử lý thích hợp dữ liệu nhạy cảm được xử lý bởi hệ thống AI
- **Dấu vết kiểm toán**: Ghi nhật ký toàn diện phục vụ tuân thủ quy định và điều tra pháp y
- **Kiểm soát quyền riêng tư**: Triển khai nguyên tắc quyền riêng tư theo thiết kế trong kiến trúc hệ thống AI
- **Quản lý thay đổi**: Quy trình chính thức cho đánh giá bảo mật các thay đổi hệ thống AI

Các thực hành nền tảng này tạo ra một cơ sở bảo mật vững chắc, nâng cao hiệu quả các kiểm soát bảo mật đặc thù MCP và cung cấp sự bảo vệ toàn diện cho các ứng dụng điều khiển bởi AI.
## Những điểm rút ra chính về bảo mật

- **Phương pháp bảo mật theo lớp**: Kết hợp các thực hành bảo mật nền tảng (viết mã an toàn, quyền tối thiểu, xác minh chuỗi cung ứng, giám sát liên tục) với các kiểm soát dành riêng cho AI nhằm bảo vệ toàn diện

- **Bối cảnh đe dọa riêng cho AI**: Hệ thống MCP đối mặt với những rủi ro riêng biệt bao gồm tiêm nhúng prompt, đầu độc công cụ, chiếm quyền phiên làm việc, vấn đề đại diện nhầm lẫn, lỗ hổng truyền tiếp token và quyền quá mức cần các biện pháp giảm thiểu chuyên biệt

- **Xuất sắc trong xác thực & phân quyền**: Triển khai xác thực mạnh mẽ sử dụng nhà cung cấp định danh bên ngoài (Microsoft Entra ID), thực thi xác thực token đúng cách, và không bao giờ chấp nhận các token không được phát hành rõ ràng cho máy chủ MCP của bạn

- **Phòng chống tấn công AI**: Triển khai Microsoft Prompt Shields và Azure Content Safety để bảo vệ khỏi các tấn công tiêm prompt gián tiếp và đầu độc công cụ, đồng thời xác thực metadata của công cụ và giám sát các thay đổi động

- **Bảo mật phiên & truyền tải**: Sử dụng ID phiên ngẫu nhiên, an toàn mật mã và liên kết với định danh người dùng, thực hiện quản lý vòng đời phiên thích hợp, và không sử dụng phiên để xác thực

- **Thực hành tốt bảo mật OAuth**: Ngăn chặn tấn công đại diện nhầm thông qua sự đồng thuận rõ ràng của người dùng với các ứng dụng đăng ký động, triển khai đúng OAuth 2.1 với PKCE, và xác thực URI chuyển hướng nghiêm ngặt

- **Nguyên tắc bảo mật token**: Tránh các mẫu anti-pattern truyền tiếp token, xác thực các claim đối tượng token, triển khai token thời gian sống ngắn với xoay vòng an toàn, và duy trì ranh giới tin cậy rõ ràng

- **Bảo mật chuỗi cung ứng toàn diện**: Đối xử tất cả các thành phần hệ sinh thái AI (mô hình, nhúng, nhà cung cấp ngữ cảnh, API bên ngoài) với độ nghiêm ngặt bảo mật tương đương với các phụ thuộc phần mềm truyền thống

- **Tiến hóa liên tục**: Cập nhật liên tục với các đặc tả MCP phát triển nhanh, đóng góp vào các tiêu chuẩn cộng đồng bảo mật và duy trì trạng thái bảo mật thích nghi khi giao thức trưởng thành

- **Tích hợp bảo mật Microsoft**: Tận dụng hệ sinh thái bảo mật toàn diện của Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) để tăng cường bảo vệ triển khai MCP

## Tài nguyên toàn diện

### **Tài liệu bảo mật MCP chính thức**
- [Đặc tả MCP (Hiện tại: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Thực hành bảo mật MCP tốt nhất](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Đặc tả phân quyền MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Kho lưu trữ MCP trên GitHub](https://github.com/modelcontextprotocol)

### **Tài nguyên bảo mật MCP OWASP**
- [Hướng dẫn bảo mật MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Bộ OWASP MCP Top 10 toàn diện với hướng dẫn triển khai trên Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rủi ro bảo mật MCP chính thức của OWASP
- [Hội thảo An ninh MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo thực hành bảo mật MCP trên Azure

### **Tiêu chuẩn & Thực hành bảo mật tốt nhất**
- [Thực hành tốt bảo mật OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 bảo mật ứng dụng web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 cho mô hình ngôn ngữ lớn](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Báo cáo Phòng thủ Kỹ thuật số Microsoft](https://aka.ms/mddr)

### **Nghiên cứu & phân tích bảo mật AI**
- [Tiêm prompt trong MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tấn công đầu độc công cụ (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Báo cáo nghiên cứu bảo mật MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Giải pháp bảo mật Microsoft**
- [Tài liệu Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Dịch vụ Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Bảo mật Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Thực hành tốt quản lý token Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Hướng dẫn & bài tập thực hành**
- [Azure API Management làm cổng xác thực MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Xác thực Microsoft Entra ID với máy chủ MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Lưu trữ token an toàn và mã hóa (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & bảo mật chuỗi cung ứng**
- [Bảo mật Azure DevOps](https://azure.microsoft.com/products/devops)
- [Bảo mật Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Hành trình bảo mật chuỗi cung ứng Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Tài liệu bảo mật bổ sung**

Để có hướng dẫn bảo mật toàn diện, tham khảo các tài liệu chuyên biệt trong phần này:

- **[Thực hành bảo mật MCP tốt nhất 2025](./mcp-security-best-practices-2025.md)** - Thực hành bảo mật đầy đủ cho triển khai MCP
- **[Triển khai Azure Content Safety](./azure-content-safety-implementation.md)** - Ví dụ triển khai thực tế cho tích hợp Azure Content Safety  
- **[Kiểm soát bảo mật MCP 2025](./mcp-security-controls-2025.md)** - Các kiểm soát và kỹ thuật bảo mật mới nhất cho triển khai MCP
- **[Tổng quan thực hành tốt MCP](./mcp-best-practices.md)** - Hướng dẫn tham khảo nhanh các thực hành bảo mật MCP thiết yếu

### **Đào tạo bảo mật thực hành**

- **[Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Hội thảo thực hành bảo mật toàn diện cho máy chủ MCP trên Azure với các cấp độ tiến bộ từ Base Camp đến Summit
- **[Hướng dẫn bảo mật MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Kiến trúc tham khảo và hướng dẫn triển khai cho toàn bộ OWASP MCP Top 10

---

## Điều tiếp theo

Tiếp theo: [Chương 3: Làm quen bắt đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc sự không chính xác. Tài liệu gốc bằng ngôn ngữ gốc của nó nên được coi là nguồn tham khảo chính xác nhất. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm đối với bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->