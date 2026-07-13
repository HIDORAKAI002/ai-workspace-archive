# MCP Security: Bảo vệ Toàn diện cho Hệ thống AI

[![MCP Security Best Practices](../../../translated_images/vi/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Nhấn vào hình trên để xem video bài học này)_

Bảo mật là nền tảng trong thiết kế hệ thống AI, đó là lý do chúng tôi ưu tiên nó như phần thứ hai. Điều này phù hợp với nguyên tắc **Bảo mật theo Thiết kế** của Microsoft từ [Sáng kiến Tương lai An toàn](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Mô hình Giao tiếp Ngữ cảnh (MCP) mang lại các khả năng mạnh mẽ mới cho các ứng dụng AI đồng thời giới thiệu những thách thức bảo mật độc đáo vượt ra ngoài các rủi ro phần mềm truyền thống. Hệ thống MCP phải đối mặt với cả những mối quan ngại bảo mật đã được thiết lập (lập trình an toàn, quyền tối thiểu, an ninh chuỗi cung ứng) và các mối đe dọa đặc thù cho AI như tiêm chèn yêu cầu, đầu độc công cụ, chiếm đoạt phiên, tấn công nhầm lẫn đại lý, lỗ hổng chuyển tiếp token và thay đổi năng lực động.

Bài học này khám phá những rủi ro bảo mật quan trọng nhất trong triển khai MCP—bao gồm xác thực, ủy quyền, quyền hạn quá mức, tiêm chèn yêu cầu gián tiếp, bảo mật phiên, vấn đề nhầm lẫn đại lý, quản lý token và các lỗ hổng chuỗi cung ứng. Bạn sẽ học các biện pháp kiểm soát và thực hành tốt để giảm thiểu rủi ro này đồng thời tận dụng các giải pháp Microsoft như Prompt Shields, Azure Content Safety, và GitHub Advanced Security để củng cố triển khai MCP của bạn.

## Mục tiêu học tập

Sau bài học này, bạn sẽ có khả năng:

- **Xác định Mối đe dọa Cụ thể MCP**: Nhận biết các rủi ro bảo mật độc đáo trong hệ thống MCP gồm tiêm chèn yêu cầu, đầu độc công cụ, quyền hạn quá mức, chiếm đoạt phiên, nhầm lẫn đại lý, lỗ hổng chuyển tiếp token và rủi ro chuỗi cung ứng
- **Áp dụng Biện pháp An ninh**: Thực thi các biện pháp giảm thiểu hiệu quả bao gồm xác thực chắc chắn, quyền truy cập tối thiểu, quản lý token an toàn, kiểm soát bảo mật phiên và xác minh chuỗi cung ứng
- **Tận dụng Giải pháp Bảo mật Microsoft**: Hiểu và triển khai Microsoft Prompt Shields, Azure Content Safety và GitHub Advanced Security để bảo vệ khối lượng công việc MCP
- **Xác thực An toàn Công cụ**: Nhận biết tầm quan trọng của việc xác minh siêu dữ liệu công cụ, theo dõi thay đổi động và phòng thủ trước các tấn công tiêm chèn yêu cầu gián tiếp
- **Tích hợp Thực hành Tốt nhất**: Kết hợp các nguyên tắc bảo mật nền tảng (lập trình an toàn, bảo mật máy chủ, zero trust) với các kiểm soát riêng cho MCP để bảo vệ toàn diện

# Kiến trúc & Kiểm soát An ninh MCP

Các triển khai MCP hiện đại yêu cầu các phương pháp bảo mật nhiều lớp giải quyết cả bảo mật phần mềm truyền thống và các mối đe dọa cụ thể AI. Đặc tả MCP đang phát triển nhanh chóng và liên tục hoàn thiện các biện pháp kiểm soát, cho phép tích hợp tốt hơn với kiến trúc bảo mật doanh nghiệp và các thực hành đã được thiết lập.

Nghiên cứu từ [Báo cáo Phòng thủ Kỹ thuật số Microsoft](https://aka.ms/mddr) cho thấy **98% vi phạm được báo cáo có thể phòng tránh bằng thói quen bảo mật chặt chẽ**. Chiến lược bảo vệ hiệu quả nhất kết hợp các thực hành bảo mật nền tảng với các kiểm soát riêng cho MCP—các biện pháp cơ bản đã được chứng minh vẫn giữ vai trò quan trọng nhất trong giảm thiểu rủi ro bảo mật tổng thể.

## Tình hình An ninh Hiện tại

> **Lưu ý:** Thông tin này phản ánh tiêu chuẩn bảo mật MCP tính đến **ngày 5 tháng 2 năm 2026**, phù hợp với **Đặc tả MCP 2025-11-25**. Giao thức MCP tiếp tục phát triển nhanh và các triển khai tương lai có thể giới thiệu các mẫu xác thực mới và kiểm soát nâng cao. Luôn tham khảo [Đặc tả MCP](https://spec.modelcontextprotocol.io/), [kho GitHub MCP](https://github.com/modelcontextprotocol) và [tài liệu thực hành bảo mật tốt nhất](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) để có hướng dẫn mới nhất.

> **Nhìn về phía trước:** phiên bản ứng viên phát hành `2026-07-28` tăng cường ủy quyền—khách hàng phải xác minh tham số `iss` trong phản hồi ủy quyền (RFC 9207), khai báo `application_type` OpenID Connect khi Đăng ký Khách hàng Động, và liên kết thông tin đăng ký với máy chủ ủy quyền phát hành. Xem [Những Thay đổi trong MCP: Phiên bản Ứng viên 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) để biết danh sách đầy đủ các SEP về ủy quyền.

## 🏔️ Hội nghị Bảo mật MCP (Sherpa)

Để **đào tạo thực hành bảo mật**, chúng tôi khuyến nghị mạnh mẽ **Hội nghị Bảo mật MCP (Sherpa)** – một chuyến thám hiểm hướng dẫn toàn diện về bảo vệ máy chủ MCP trong Microsoft Azure.

### Tổng quan Hội nghị

[Hội nghị Bảo mật MCP](https://azure-samples.github.io/sherpa/) cung cấp đào tạo bảo mật thực tiễn, có thể thực hiện qua phương pháp "dễ bị tấn công → khai thác → sửa lỗi → xác thực". Bạn sẽ:

- **Học qua việc Phá hoại**: Trải nghiệm các lỗ hổng bằng việc khai thác các máy chủ thiết kế kém an toàn
- **Sử dụng Bảo mật Azure Bản địa**: Tận dụng Azure Entra ID, Key Vault, API Management và AI Content Safety
- **Theo Phòng thủ sâu**: Tiến qua các trại để xây dựng nhiều lớp bảo mật toàn diện
- **Áp dụng Tiêu chuẩn OWASP**: Mọi kỹ thuật đều tương ứng hướng dẫn [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Có Mã nguồn Sản xuất**: Nhận được các triển khai làm việc, đã kiểm thử

### Lộ trình Chuyến Thám hiểm

| Trại | Tập trung | Rủi ro OWASP Đề cập |
|------|-----------|---------------------|
| **Trại Căn bản** | Nền tảng MCP & lỗ hổng xác thực | MCP01, MCP07 |
| **Trại 1: Danh tính** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Trại 2: Gateway** | API Management, Private Endpoints, quản trị | MCP02, MCP06, MCP07, MCP09 |
| **Trại 3: Bảo mật I/O** | Tiêm chèn yêu cầu, bảo vệ PII, an toàn nội dung | MCP03, MCP05, MCP06, MCP10 |
| **Trại 4: Giám sát** | Log Analytics, dashboard, phát hiện mối đe dọa | MCP04, MCP08 |
| **Đỉnh Núi** | Kiểm thử tích hợp Red Team / Blue Team | Tất cả |

**Bắt đầu ngay**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## 10 Rủi ro Bảo mật MCP Hàng đầu theo OWASP

[Hướng dẫn Bảo mật MCP Azure của OWASP](https://microsoft.github.io/mcp-azure-security-guide/) chi tiết mười rủi ro bảo mật quan trọng nhất cho các triển khai MCP:

| Rủi ro | Mô tả | Giải pháp Azure |
|--------|-------|-----------------|
| **MCP01** | Quản lý Token không đúng & Lộ bí mật | Azure Key Vault, Managed Identity |
| **MCP02** | Tăng quyền qua phạm vi mở rộng | RBAC, Conditional Access |
| **MCP03** | Đầu độc Công cụ | Xác minh công cụ, kiểm tra tính toàn vẹn |
| **MCP04** | Tấn công Chuỗi cung ứng Phần mềm & Thay đổi phụ thuộc | GitHub Advanced Security, quét phụ thuộc |
| **MCP05** | Tiêm lệnh & Thực thi mã | Kiểm tra dữ liệu đầu vào, sandbox |
| **MCP06** | Đảo ngược luồng ý định | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Xác thực & Ủy quyền không đủ | Azure Entra ID, OAuth 2.1 với PKCE |
| **MCP08** | Thiếu giám sát và ghi nhật ký | Azure Monitor, Application Insights |
| **MCP09** | Máy chủ MCP Bóng tối | Quản trị API Center, cách ly mạng |
| **MCP10** | Tiêm chèn ngữ cảnh & Tiết lộ quá mức | Phân loại dữ liệu, hạn chế để lộ |

### Sự Phát triển trong Xác thực MCP

Đặc tả MCP đã phát triển đáng kể trong phương pháp xác thực và ủy quyền:

- **Phương pháp ban đầu**: Các đặc tả đầu yêu cầu nhà phát triển xây dựng máy chủ xác thực tùy chỉnh, với máy chủ MCP hoạt động như Máy chủ Ủy quyền OAuth 2.0 quản lý xác thực người dùng trực tiếp
- **Tiêu chuẩn hiện tại (2025-11-25)**: Đặc tả cập nhật cho phép máy chủ MCP ủy quyền xác thực cho các nhà cung cấp danh tính bên ngoài (như Microsoft Entra ID), nâng cao tư thế bảo mật và giảm độ phức tạp triển khai
- **Bảo mật lớp vận chuyển**: Hỗ trợ nâng cao cho cơ chế truyền an toàn với các mẫu xác thực phù hợp cho kết nối cục bộ (STDIO) và kết nối từ xa (Streamable HTTP)

## An ninh Xác thực & Ủy quyền

### Thách thức An ninh Hiện tại

Các triển khai MCP hiện đại đối mặt với nhiều thách thức về xác thực và ủy quyền:

### Rủi ro & Các Vecto Tấn công

- **Lỗi cấu hình Logic Ủy quyền**: Triển khai ủy quyền lỗi trong máy chủ MCP có thể làm lộ dữ liệu nhạy cảm và áp dụng sai kiểm soát truy cập
- **Rò rỉ Token OAuth**: Đánh cắp token từ máy chủ MCP cục bộ cho phép kẻ tấn công giả mạo máy chủ và truy cập dịch vụ hạ nguồn
- **Lỗ hổng Token Chuyển tiếp**: Xử lý token không đúng tạo ra các lỗ hổng bỏ qua kiểm soát bảo mật và gây mất dấu trách nhiệm
- **Quyền Hạn Quá Mức**: Máy chủ MCP có quyền hạn vượt mức vi phạm nguyên tắc quyền tối thiểu và mở rộng bề mặt tấn công

#### Token Chuyển tiếp: Một Mẫu Thiết kế Phản tác dụng Nghiêm trọng

**Chuyển tiếp token bị cấm tuyệt đối** trong đặc tả ủy quyền MCP hiện tại do các tác động nghiêm trọng về bảo mật:

##### Vượt qua Kiểm soát Bảo mật
- Máy chủ MCP và API hạ nguồn áp dụng các kiểm soát bảo mật quan trọng (giới hạn tần suất, xác thực yêu cầu, giám sát lưu lượng) chịu sự phụ thuộc vào xác minh token đúng cách
- Việc sử dụng token trực tiếp từ client đến API bỏ qua các biện pháp bảo vệ thiết yếu này, làm suy yếu kiến trúc bảo mật

##### Khó khăn định trách nhiệm & Kiểm toán  
- Máy chủ MCP không thể phân biệt các client dùng token phát hành từ phía trên, phá vỡ dấu vết kiểm toán
- Nhật ký máy chủ tài nguyên hạ nguồn thể hiện nguồn gốc yêu cầu sai lệch thay vì trung gian máy chủ MCP thật sự
- Điều tra sự cố và kiểm toán tuân thủ trở nên rất khó khăn

##### Rủi ro Rút trộm Dữ liệu
- Các tuyên bố token không xác thực cho phép kẻ ác với token bị đánh cắp dựng máy chủ MCP như máy chủ trung gian để rút trộm dữ liệu
- Vi phạm ranh giới tin cậy cho phép các mô hình truy cập trái phép bỏ qua kiểm soát bảo mật dự kiến

##### Vecto Tấn công Đa dịch vụ
- Token bị xâm phạm được dịch vụ chấp nhận nhiều nơi cho phép di chuyển ngang qua các hệ thống kết nối
- Giả định tin cậy giữa các dịch vụ có thể bị phá vỡ khi không xác thực được nguồn gốc token

### Kiểm soát & Giảm thiểu An ninh

**Yêu cầu Bảo mật Quan trọng:**

> **BẮT BUỘC**: Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận bất kỳ token nào không được phát hành rõ ràng cho máy chủ MCP đó

#### Kiểm soát Xác thực & Ủy quyền

- **Kiểm tra Ủy quyền Nghiêm ngặt**: Tiến hành đánh giá toàn diện logic ủy quyền máy chủ MCP để đảm bảo chỉ người dùng và client được định sẵn mới có thể truy cập tài nguyên nhạy cảm
  - **Hướng dẫn triển khai**: [Azure API Management làm Cổng Xác thực cho máy chủ MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Tích hợp Danh tính**: [Sử dụng Microsoft Entra ID cho Xác thực máy chủ MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Quản lý Token An toàn**: Áp dụng [thực hành tốt nhất về xác minh và vòng đời token của Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Xác thực audience token phù hợp với danh tính máy chủ MCP
  - Áp dụng chính sách xoay vòng và hết hạn token hợp lý
  - Ngăn chặn tấn công phát lại token và sử dụng trái phép

- **Lưu trữ Token Bảo vệ**: Lưu trữ token an toàn mã hóa cả khi lưu trữ và truyền tải
  - **Thực hành tốt nhất**: [Hướng dẫn lưu trữ token an toàn và mã hóa](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Triển khai Kiểm soát Truy cập

- **Nguyên tắc Quyền Tối thiểu**: Cấp cho máy chủ MCP chỉ các quyền tối thiểu cần thiết cho chức năng dự kiến
  - Đánh giá và cập nhật quyền định kỳ để tránh tăng quyền
  - **Tài liệu Microsoft**: [Bảo mật Quyền Truy cập Tối thiểu](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kiểm soát Truy cập theo Vai trò (RBAC)**: Áp dụng phân quyền chi tiết theo vai trò
  - Giới hạn vai trò vào tài nguyên và hành động cụ thể
  - Tránh cấp quyền rộng hoặc không cần thiết làm tăng bề mặt tấn công

- **Giám sát Quyền liên tục**: Triển khai giám sát và kiểm tra truy cập liên tục
  - Theo dõi các mẫu sử dụng quyền để phát hiện dị thường
  - Khắc phục nhanh các quyền quá nhiều hoặc không sử dụng

## Mối đe dọa An ninh Đặc thù AI

### Tấn công Tiêm chèn Yêu cầu & Đầu độc Công cụ

Các triển khai MCP hiện đại đối mặt với các vectơ tấn công AI tinh vi mà các biện pháp bảo mật truyền thống không thể xử lý đầy đủ:

#### **Tiêm chèn Yêu cầu Gián tiếp (Tiêm chèn Yêu cầu Chéo miền)**

**Tiêm chèn Yêu cầu Gián tiếp** là một trong các lỗ hổng nghiêm trọng nhất trong các hệ thống AI bật MCP. Kẻ tấn công chèn các chỉ dẫn độc hại bên trong nội dung bên ngoài—tài liệu, trang web, email hoặc nguồn dữ liệu—mà hệ thống AI sau đó xử lý như chỉ thị hợp lệ.

**Kịch bản tấn công:**
- **Tiêm chèn dựa trên tài liệu**: Chỉ dẫn độc hại giấu trong tài liệu được xử lý kích hoạt hành động AI không mong muốn
- **Khai thác Nội dung Web**: Trang web bị xâm nhập chứa các prompt nhúng thao túng hành vi AI khi bị thu thập
- **Tấn công qua Email**: Prompt độc hại trong email khiến trợ lý AI tiết lộ thông tin hoặc thực thi hành động trái phép
- **Ô nhiễm Nguồn dữ liệu**: Cơ sở dữ liệu hoặc API bị xâm phạm phục vụ nội dung bị nhiễm sang hệ thống AI

**Ảnh hưởng Thực tế**: Những tấn công này có thể dẫn đến rút trộm dữ liệu, vi phạm quyền riêng tư, tạo nội dung có hại và thao túng tương tác người dùng. Phân tích chi tiết xem [Tiêm chèn Yêu cầu trong MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/vi/prompt-injection.ed9fbfde297ca877.webp)

#### **Tấn công Đầu độc Công cụ**

**Đầu độc Công cụ** nhắm vào siêu dữ liệu xác định công cụ MCP, khai thác cách các LLM hiểu mô tả và tham số công cụ để quyết định thực thi.

**Cơ chế tấn công:**
- **Thao túng Siêu dữ liệu**: Kẻ tấn công chèn chỉ dẫn độc hại vào mô tả công cụ, định nghĩa tham số hoặc ví dụ sử dụng
- **Chỉ dẫn ẩn**: Prompt ẩn trong siêu dữ liệu công cụ được AI xử lý nhưng người dùng không nhìn thấy
- **Thay đổi Công cụ Động ("Rug Pulls")**: Công cụ từng được người dùng phê duyệt sau đó bị sửa đổi để thực hiện hành động độc hại mà người dùng không biết
- **Tiêm chèn Tham số**: Nội dung độc hại nhúng trong cấu trúc tham số công cụ ảnh hưởng tới hành vi mô hình
**Rủi ro Máy chủ Hosted**: Máy chủ MCP từ xa có rủi ro cao hơn vì các định nghĩa công cụ có thể được cập nhật sau khi người dùng chấp thuận ban đầu, tạo ra các tình huống mà các công cụ trước đây an toàn có thể trở nên độc hại. Để phân tích toàn diện, xem [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/vi/tool-injection.3b0b4a6b24de6bef.webp)

#### **Các Vectơ Tấn công AI Bổ sung**

- **Chèn Lệnh Qua Miền Chéo (XPIA)**: Các cuộc tấn công tinh vi tận dụng nội dung từ nhiều miền để vượt qua các biện pháp kiểm soát an ninh
- **Thay Đổi Năng Lực Động**: Thay đổi năng lực công cụ theo thời gian thực thoát khỏi đánh giá an ninh ban đầu
- **Đầu Độc Cửa Sổ Ngữ Cảnh**: Các cuộc tấn công thao túng cửa sổ ngữ cảnh lớn để ẩn giấu các chỉ dẫn độc hại
- **Tấn công Gây Nhầm Lẫn Mô Hình**: Khai thác giới hạn của mô hình để tạo ra hành vi không thể đoán trước hoặc không an toàn


### Tác Động Rủi Ro An Ninh AI

**Hậu quả Tác động Cao:**
- **Rò rỉ dữ liệu**: Truy cập trái phép và đánh cắp dữ liệu nhạy cảm doanh nghiệp hoặc cá nhân
- **Vi phạm quyền riêng tư**: Lộ thông tin nhận dạng cá nhân (PII) và dữ liệu doanh nghiệp bí mật  
- **Thao tác hệ thống**: Thay đổi không mong muốn đối với các hệ thống và quy trình làm việc quan trọng
- **Đánh cắp thông tin xác thực**: Xâm phạm các token xác thực và thông tin đăng nhập dịch vụ
- **Di chuyển ngang**: Sử dụng các hệ thống AI bị xâm phạm làm bàn đạp cho các cuộc tấn công mạng rộng hơn

### Giải pháp An ninh AI của Microsoft

#### **AI Prompt Shields: Bảo vệ Nâng cao khỏi Tấn công Chèn Lệnh**

Microsoft **AI Prompt Shields** cung cấp phòng thủ toàn diện chống lại cả tấn công chèn lệnh trực tiếp và gián tiếp thông qua nhiều lớp bảo mật:

##### **Cơ chế Bảo vệ Cốt lõi:**

1. **Phát hiện & Lọc Nâng cao**
   - Thuật toán học máy và kỹ thuật NLP phát hiện chỉ dẫn độc hại trong nội dung bên ngoài
   - Phân tích thời gian thực các tài liệu, trang web, email và nguồn dữ liệu để phát hiện mối đe dọa nhúng
   - Hiểu biết ngữ cảnh về những mẫu lệnh hợp lệ so với độc hại

2. **Kỹ thuật Spotlighting**  
   - Phân biệt giữa lệnh hệ thống đáng tin cậy và đầu vào bên ngoài có thể bị xâm phạm
   - Phương pháp biến đổi văn bản nhằm tăng tính liên quan của mô hình trong khi cô lập nội dung độc hại
   - Giúp hệ thống AI duy trì cấp bậc chỉ dẫn đúng và bỏ qua các lệnh chèn vào

3. **Hệ thống Phân cách & Đánh dấu Dữ liệu**
   - Định nghĩa rõ ràng ranh giới giữa tin nhắn hệ thống đáng tin cậy và văn bản đầu vào bên ngoài
   - Các dấu hiệu đặc biệt đánh dấu ranh giới giữa các nguồn dữ liệu đáng tin cậy và không đáng tin cậy
   - Tách biệt rõ ràng ngăn ngừa nhầm lẫn lệnh và thực thi lệnh trái phép

4. **Tình báo Mối đe dọa Liên tục**
   - Microsoft liên tục giám sát các mẫu tấn công mới nổi và cập nhật biện pháp phòng thủ
   - Tìm kiếm mối đe dọa chủ động cho các kỹ thuật và vectơ tấn công chèn lệnh mới
   - Cập nhật mô hình bảo mật thường xuyên để duy trì hiệu quả trước các mối đe dọa đang phát triển

5. **Tích hợp Azure Content Safety**
   - Là một phần của bộ công cụ Azure AI Content Safety toàn diện
   - Phát hiện bổ sung các nỗ lực jailbreak, nội dung độc hại và vi phạm chính sách bảo mật
   - Kiểm soát bảo mật thống nhất trên toàn bộ các thành phần ứng dụng AI

**Tài nguyên Triển khai**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/vi/prompt-shield.ff5b95be76e9c78c.webp)


## Các Mối đe dọa An ninh MCP Nâng cao

### Lỗ hổng Chiếm đoạt Phiên làm việc

**Chiếm đoạt phiên làm việc** là một vectơ tấn công nghiêm trọng trong các triển khai MCP trạng thái, nơi các bên không có quyền truy cập và lạm dụng các định danh phiên hợp pháp để giả danh khách hàng và thực hiện các hành động trái phép.

#### **Kịch bản Tấn công & Rủi ro**

- **Chèn Lệnh Chiếm đoạt Phiên**: Kẻ tấn công sử dụng ID phiên bị đánh cắp chèn các sự kiện độc hại vào máy chủ chia sẻ trạng thái phiên, có thể kích hoạt hành động gây hại hoặc truy cập dữ liệu nhạy cảm
- **Giả danh Trực tiếp**: ID phiên bị đánh cắp cho phép gọi máy chủ MCP trực tiếp vượt qua xác thực, xử lý kẻ tấn công như người dùng hợp pháp
- **Luồng Dữ liệu Khôi phục Bị xâm phạm**: Kẻ tấn công có thể kết thúc yêu cầu sớm, khiến khách hàng hợp pháp tiếp tục với nội dung có thể độc hại

#### **Kiểm soát An ninh cho Quản lý Phiên**

**Yêu cầu Quan trọng:**
- **Xác minh Ủy quyền**: Máy chủ MCP triển khai xác thực **PHẢI** xác minh TẤT CẢ các yêu cầu đầu vào và **KHÔNG ĐƯỢC** dựa vào phiên làm việc để xác thực
- **Tạo Phiên An toàn**: Sử dụng ID phiên phi định hướng, an toàn mật mã, được sinh ngẫu nhiên an toàn
- **Ràng buộc Cụ thể Người dùng**: Liên kết ID phiên với thông tin người dùng cụ thể bằng định dạng như `<user_id>:<session_id>` để ngăn ngừa lạm dụng phiên chéo người dùng
- **Quản lý Vòng đời Phiên**: Triển khai hết hạn, xoay vòng và vô hiệu hóa đúng cách để hạn chế cửa sổ lỗ hổng
- **Bảo mật Giao tiếp**: Bắt buộc HTTPS cho mọi giao tiếp nhằm ngăn chặn chặn bắt ID phiên

### Vấn đề Đạo diễn Ngẩn ngơ

**Vấn đề đạo diễn ngẩn ngơ** xảy ra khi máy chủ MCP hoạt động như proxy xác thực giữa khách hàng và dịch vụ bên thứ ba, tạo cơ hội bỏ qua ủy quyền thông qua khai thác ID khách hàng tĩnh.

#### **Cơ chế Tấn công & Rủi ro**

- **Bypass Đồng ý dựa trên Cookie**: Xác thực người dùng trước đó tạo cookie đồng ý mà kẻ tấn công khai thác thông qua các yêu cầu ủy quyền độc hại với URI chuyển hướng thiết kế riêng
- **Đánh cắp Mã Ủy quyền**: Cookie đồng ý hiện có có thể khiến máy chủ ủy quyền bỏ qua màn hình đồng ý, chuyển mã về điểm cuối do kẻ tấn công kiểm soát  
- **Truy cập API Trái phép**: Mã ủy quyền bị đánh cắp cho phép trao đổi token và giả danh người dùng mà không cần sự chấp thuận rõ ràng

#### **Chiến lược Giảm thiểu**

**Kiểm soát Bắt buộc:**
- **Yêu cầu Đồng ý Rõ ràng**: Máy chủ proxy MCP sử dụng ID khách hàng tĩnh **PHẢI** lấy đồng ý người dùng cho từng khách hàng đăng ký động
- **Triển khai Bảo mật OAuth 2.1**: Tuân thủ các thực hành bảo mật OAuth hiện tại bao gồm PKCE (Proof Key for Code Exchange) cho mọi yêu cầu ủy quyền
- **Xác thực Nghiêm ngặt Khách hàng**: Thực hiện xác thực nghiêm ngặt URI chuyển hướng và định danh khách hàng để ngăn khai thác

### Lỗ hổng Truyền Token

**Truyền token** là một anti-pattern rõ ràng khi máy chủ MCP chấp nhận token của khách hàng mà không xác thực đúng đắn và chuyển tiếp chúng đến API hạ nguồn, vi phạm đặc tả ủy quyền MCP.

#### **Hệ quả An ninh**

- **Vượt qua Kiểm soát**: Sử dụng token trực tiếp từ khách hàng tới API bỏ qua các kiểm soát giới hạn tốc độ, xác thực và giám sát quan trọng
- **Hỏng Hồ sơ Kiểm toán**: Token cấp từ bên trên khiến việc nhận dạng khách hàng không thể thực hiện, phá vỡ khả năng điều tra sự cố
- **Rò rỉ Dữ liệu Qua Proxy**: Token không xác thực cho phép kẻ độc hại dùng server làm proxy truy cập dữ liệu trái phép
- **Vi phạm Ranh giới Tin cậy**: Niềm tin của dịch vụ hạ nguồn có thể bị vi phạm khi nguồn gốc token không thể xác minh
- **Mở rộng Tấn công Đa Dịch vụ**: Token bị xâm phạm được chấp nhận trên nhiều dịch vụ cho phép di chuyển ngang

#### **Kiểm soát An ninh Bắt buộc**

**Yêu cầu không thể thương lượng:**
- **Xác thực Token**: Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận token không được cấp rõ ràng cho máy chủ MCP
- **Xác minh Người nhận**: Luôn xác minh claim người nhận của token phù hợp với danh tính máy chủ MCP
- **Vòng đời Token Đúng**: Triển khai token truy cập thời gian sống ngắn với thực hành xoay vòng an toàn


## An ninh Chuỗi Cung Ứng cho Hệ thống AI

An ninh chuỗi cung ứng đã phát triển vượt ra ngoài các phụ thuộc phần mềm truyền thống để bao quát toàn bộ hệ sinh thái AI. Các triển khai MCP hiện đại phải kiểm tra chặt chẽ và giám sát tất cả các thành phần liên quan đến AI, vì mỗi thành phần có thể đưa vào các lỗ hổng tiềm ẩn làm tổn hại tính toàn vẹn hệ thống.

### Thành phần Chuỗi Cung Ứng AI Mở Rộng

**Phụ thuộc Phần mềm Truyền thống:**
- Thư viện và framework mã nguồn mở
- Hình ảnh container và hệ thống cơ sở  
- Công cụ phát triển và pipeline xây dựng
- Thành phần hạ tầng và dịch vụ

**Yếu tố Chuỗi cung ứng đặc trưng AI:**
- **Mô hình Nền Tảng**: Các mô hình đã huấn luyện trước từ các nhà cung cấp khác nhau cần xác thực nguồn gốc
- **Dịch vụ Nhúng**: Các dịch vụ vector hóa và tìm kiếm ngữ nghĩa bên ngoài
- **Nhà cung cấp Ngữ cảnh**: Nguồn dữ liệu, cơ sở tri thức và kho tài liệu  
- **API bên thứ ba**: Dịch vụ AI bên ngoài, pipeline ML và điểm xử lý dữ liệu
- **Tài sản Mô hình**: Trọng số, cấu hình và các biến thể mô hình tinh chỉnh
- **Nguồn Dữ liệu Huấn luyện**: Các bộ dữ liệu dùng cho huấn luyện và tinh chỉnh mô hình

### Chiến lược An ninh Chuỗi Cung Ứng Toàn diện

#### **Xác thực & Tin cậy Thành phần**
- **Xác thực Nguồn gốc**: Kiểm tra nguồn gốc, giấy phép và tính toàn vẹn của tất cả thành phần AI trước khi tích hợp
- **Đánh giá An ninh**: Thực hiện quét lỗ hổng và đánh giá bảo mật cho mô hình, nguồn dữ liệu và dịch vụ AI
- **Phân tích Uy tín**: Đánh giá hồ sơ bảo mật và thực hành của các nhà cung cấp dịch vụ AI
- **Kiểm tra Tuân thủ**: Đảm bảo tất cả thành phần tuân thủ yêu cầu bảo mật và quy định của tổ chức

#### **Pipeline Triển khai An toàn**  
- **Tích hợp CI/CD Tự động về An ninh**: Tích hợp quét bảo mật trong toàn bộ pipeline triển khai tự động
- **Toàn vẹn Tài sản**: Thực hiện xác minh mật mã cho tất cả tài sản triển khai (mã, mô hình, cấu hình)
- **Triển khai Giai đoạn**: Sử dụng chiến lược triển khai tiến bộ kèm xác nhận bảo mật tại từng giai đoạn
- **Kho Tài sản Tin cậy**: Triển khai chỉ từ các kho lưu trữ và registry đã được xác thực, an toàn

#### **Giám sát & Phản ứng Liên tục**
- **Quét Phụ thuộc**: Giám sát lỗ hổng liên tục cho tất cả phụ thuộc phần mềm và thành phần AI
- **Giám sát Mô hình**: Đánh giá liên tục hành vi mô hình, trôi hiệu năng và bất thường bảo mật
- **Theo dõi Sức khỏe Dịch vụ**: Giám sát dịch vụ AI bên ngoài về khả dụng, sự cố bảo mật và thay đổi chính sách
- **Tích hợp Tình báo Mối đe dọa**: Kết hợp nguồn tin mối đe dọa đặc thù cho rủi ro bảo mật AI và ML

#### **Kiểm soát Truy cập & Nguyên tắc Quyền tối thiểu**
- **Phân quyền Thành phần**: Giới hạn truy cập mô hình, dữ liệu và dịch vụ dựa trên nhu cầu kinh doanh
- **Quản lý Tài khoản Dịch vụ**: Triển khai tài khoản dịch vụ riêng biệt với quyền tối thiểu cần thiết
- **Phân đoạn Mạng**: Cô lập các thành phần AI và giới hạn truy cập mạng giữa dịch vụ
- **Kiểm soát Gateway API**: Sử dụng cổng API tập trung để kiểm soát và giám sát truy cập dịch vụ AI bên ngoài

#### **Ứng phó Sự cố & Phục hồi**
- **Quy trình Phản ứng Nhanh**: Thiết lập quy trình vá hoặc thay thế thành phần AI bị xâm phạm
- **Xoay Vòng Thông tin Xác thực**: Hệ thống tự động xoay vòng bí mật, khóa API và thông tin đăng nhập dịch vụ
- **Khả năng Quay lại**: Khả năng nhanh chóng phục hồi về phiên bản thành phần AI an toàn trước đó
- **Phục hồi Sự cố Chuỗi Cung Ứng**: Quy trình cụ thể để ứng phó với xâm phạm dịch vụ AI từ bên trên

### Công cụ & Tích hợp Bảo mật Microsoft

**GitHub Advanced Security** cung cấp bảo vệ chuỗi cung ứng toàn diện bao gồm:
- **Quét Bí mật**: Phát hiện tự động thông tin xác thực, khóa API và token trong kho mã
- **Quét Phụ thuộc**: Đánh giá lỗ hổng cho các phụ thuộc và thư viện mã nguồn mở
- **Phân tích CodeQL**: Phân tích mã tĩnh phát hiện lỗ hổng bảo mật và vấn đề mã hóa
- **Thông tin Chuỗi Cung Ứng**: Hiển thị trạng thái và sức khỏe phụ thuộc

**Tích hợp Azure DevOps & Azure Repos:**
- Tích hợp quét bảo mật liền mạch trên nền tảng phát triển Microsoft
- Kiểm tra bảo mật tự động trong Azure Pipelines cho tải công việc AI
- Thực thi chính sách bảo mật cho triển khai thành phần AI

**Thực hành nội bộ Microsoft:**
Microsoft triển khai thực hành bảo mật chuỗi cung ứng toàn diện trên tất cả sản phẩm. Tìm hiểu các phương pháp đã chứng minh tại [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Thực hành Bảo mật Cơ bản Nền tảng

Các triển khai MCP kế thừa và xây dựng dựa trên tư thế bảo mật hiện có của tổ chức bạn. Củng cố các thực hành bảo mật nền tảng giúp nâng cao đáng kể bảo mật tổng thể của hệ thống AI và triển khai MCP.

### Các Nguyên tắc Cốt lõi về An ninh

#### **Thực hành Phát triển An toàn**
- **Tuân thủ OWASP**: Bảo vệ chống lại các lỗ hổng ứng dụng web trong [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Bảo vệ Đặc thù AI**: Triển khai kiểm soát cho [OWASP Top 10 cho LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Quản lý Bí mật An toàn**: Sử dụng kho bí mật riêng cho token, khóa API và cấu hình nhạy cảm
- **Mã hóa Đầu-cuối**: Triển khai bảo mật truyền thông giữa các thành phần ứng dụng và luồng dữ liệu
- **Xác thực Đầu vào**: Xác thực nghiêm ngặt mọi đầu vào người dùng, tham số API và nguồn dữ liệu

#### **Gia cố Hạ tầng**
- **Xác thực Đa yếu tố**: Bắt buộc MFA cho tất cả tài khoản quản trị và dịch vụ
- **Quản lý vá lỗi**: Tự động và kịp thời vá lỗi cho hệ điều hành, framework và phụ thuộc  
- **Tích hợp Nhà cung cấp Danh tính**: Quản lý danh tính tập trung qua nhà cung cấp danh tính doanh nghiệp (Microsoft Entra ID, Active Directory)
- **Phân đoạn Mạng**: Cô lập hợp lý các thành phần MCP để giới hạn khả năng di chuyển ngang
- **Nguyên tắc Quyền tối thiểu**: Cấp quyền tối thiểu cần thiết cho tất cả thành phần và tài khoản hệ thống

#### **Giám sát & Phát hiện An ninh**
- **Ghi nhật ký Toàn diện**: Ghi các hoạt động ứng dụng AI chi tiết, bao gồm tương tác máy khách-máy chủ MCP
- **Tích hợp SIEM**: Quản lý thông tin và sự kiện bảo mật tập trung để phát hiện bất thường
- **Phân tích Hành vi**: Giám sát hỗ trợ AI để phát hiện mẫu hành vi bất thường hệ thống và người dùng
- **Tình báo Mối đe dọa**: Kết hợp dữ liệu tình báo mối đe dọa bên ngoài và chỉ số thỏa hiệp (IOC)
- **Ứng phó Sự cố**: Quy trình rõ ràng cho phát hiện, phản ứng và phục hồi sự cố bảo mật

#### **Kiến trúc Zero Trust**
- **Không bao giờ tin, luôn luôn xác minh**: Kiểm tra liên tục người dùng, thiết bị và kết nối mạng
- **Phân đoạn Vi mô**: Kiểm soát mạng chi tiết cô lập ứng dụng và dịch vụ riêng lẻ
- **Bảo mật Tập trung vào Danh tính**: Chính sách bảo mật dựa trên danh tính đã xác thực thay vì vị trí mạng
- **Đánh giá Rủi ro Liên tục**: Đánh giá tư thế bảo mật động dựa trên ngữ cảnh và hành vi hiện tại
- **Truy cập Có Điều kiện**: Kiểm soát truy cập thích ứng dựa trên yếu tố rủi ro, vị trí và độ tin cậy thiết bị

### Mẫu tích hợp Doanh nghiệp

#### **Tích hợp Hệ sinh thái An toàn Microsoft**
- **Microsoft Defender cho Cloud**: Quản lý tư thế bảo mật đám mây toàn diện
- **Azure Sentinel**: SIEM gốc đám mây và khả năng SOAR cho bảo vệ tải công việc AI
- **Microsoft Entra ID**: Quản lý danh tính và truy cập doanh nghiệp với chính sách truy cập có điều kiện
- **Azure Key Vault**: Quản lý bí mật tập trung với sự hỗ trợ mô-đun bảo mật phần cứng (HSM)
- **Microsoft Purview**: Quản trị dữ liệu và tuân thủ cho nguồn dữ liệu và quy trình AI

#### **Tuân thủ & Quản trị**
- **Phù hợp Quy định**: Đảm bảo triển khai MCP đáp ứng yêu cầu tuân thủ ngành nghề (GDPR, HIPAA, SOC 2)
- **Phân loại dữ liệu**: Phân loại và xử lý phù hợp dữ liệu nhạy cảm được xử lý bởi các hệ thống AI  
- **Đường dẫn kiểm toán**: Ghi lại chi tiết để tuân thủ quy định và điều tra pháp y  
- **Kiểm soát quyền riêng tư**: Triển khai nguyên tắc bảo mật theo thiết kế trong kiến trúc hệ thống AI  
- **Quản lý thay đổi**: Quy trình chính thức cho việc xem xét bảo mật các sửa đổi hệ thống AI  

Những thực hành nền tảng này tạo nên mức độ bảo mật vững chắc làm tăng hiệu quả của các kiểm soát bảo mật đặc thù MCP và cung cấp bảo vệ toàn diện cho các ứng dụng điều khiển bởi AI.

## Các điểm chính về bảo mật

- **Phương pháp bảo mật nhiều lớp**: Kết hợp các thực hành bảo mật nền tảng (lập trình an toàn, quyền truy cập tối thiểu, xác minh chuỗi cung ứng, giám sát liên tục) với các kiểm soát đặc thù AI để bảo vệ toàn diện  

- **Bối cảnh nguy cơ đặc thù AI**: Hệ thống MCP đối mặt với các rủi ro riêng biệt bao gồm chèn prompt, đầu độc công cụ, chiếm quyền phiên, vấn đề deputy bị nhầm lẫn, lỗ hổng chuyển tiếp token và quyền truy cập quá mức đòi hỏi các biện pháp giảm thiểu chuyên biệt  

- **Xuất sắc trong xác thực & ủy quyền**: Triển khai xác thực chắc chắn sử dụng nhà cung cấp định danh bên ngoài (Microsoft Entra ID), thực thi xác thực token đúng cách, và tuyệt đối không chấp nhận token không được cấp rõ ràng cho máy chủ MCP của bạn  

- **Phòng chống tấn công AI**: Triển khai Microsoft Prompt Shields và Azure Content Safety để phòng chống các cuộc tấn công chèn prompt gián tiếp và đầu độc công cụ, đồng thời xác thực siêu dữ liệu công cụ và giám sát các thay đổi động  

- **Bảo mật phiên và vận chuyển**: Sử dụng ID phiên không xác định, an toàn mã hóa và liên kết với định danh người dùng, thực hiện quản lý vòng đời phiên đúng cách, và không bao giờ dùng phiên để xác thực  

- **Thực hành bảo mật OAuth tốt nhất**: Ngăn chặn tấn công deputy bị nhầm lẫn qua việc lấy sự đồng ý rõ ràng của người dùng cho các client đăng ký động, thực thi OAuth 2.1 đúng chuẩn với PKCE, và kiểm tra kỹ URI chuyển hướng  

- **Nguyên tắc bảo mật token**: Tránh các mẫu chống mẫu chuyển tiếp token, xác thực claim audience của token, sử dụng token thời gian sống ngắn với xoay vòng bảo mật, và duy trì ranh giới tin cậy rõ ràng  

- **Bảo mật chuỗi cung ứng toàn diện**: Đối xử tất cả các thành phần hệ sinh thái AI (mô hình, embeddings, nhà cung cấp ngữ cảnh, API bên ngoài) với mức độ nghiêm ngặt về bảo mật giống như các phụ thuộc phần mềm truyền thống  

- **Tiến hóa liên tục**: Luôn cập nhật với các đặc tả MCP phát triển nhanh, đóng góp vào tiêu chuẩn cộng đồng bảo mật, và duy trì tư thế bảo mật thích ứng khi giao thức trưởng thành  

- **Tích hợp bảo mật Microsoft**: Tận dụng hệ sinh thái bảo mật toàn diện của Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) để tăng cường bảo vệ triển khai MCP  

## Tài nguyên toàn diện

### **Tài liệu bảo mật MCP chính thức**  
- [Đặc tả MCP (Hiện tại: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Thực hành bảo mật MCP tốt nhất](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Đặc tả ủy quyền MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  
- [Kho GitHub MCP](https://github.com/modelcontextprotocol)  

### **Tài nguyên bảo mật OWASP MCP**  
- [Hướng dẫn bảo mật OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Toàn diện OWASP MCP Top 10 với hướng dẫn triển khai Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Các rủi ro bảo mật MCP chính thức của OWASP  
- [Hội thảo bảo mật MCP Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo thực hành bảo mật MCP trên Azure  

### **Tiêu chuẩn & Thực hành bảo mật**  
- [Thực hành bảo mật OAuth 2.0 tốt nhất (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 bảo mật ứng dụng web](https://owasp.org/www-project-top-ten/)  
- [OWASP Top 10 cho Mô hình Ngôn ngữ Lớn](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- [Báo cáo An ninh số Microsoft](https://aka.ms/mddr)  

### **Nghiên cứu & Phân tích bảo mật AI**  
- [Chèn prompt trong MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)  
- [Tấn công đầu độc công cụ (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)  
- [Báo cáo nghiên cứu bảo mật MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)  

### **Giải pháp bảo mật Microsoft**  
- [Tài liệu Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Dịch vụ Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Bảo mật Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [Thực hành quản lý token Azure tốt nhất](https://learn.microsoft.com/entra/identity-platform/access-tokens)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  

### **Hướng dẫn triển khai & Tutorials**  
- [Azure API Management làm cổng xác thực MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Xác thực Microsoft Entra ID với máy chủ MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)  
- [Lưu trữ token an toàn và mã hóa (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

### **DevOps & Bảo mật chuỗi cung ứng**  
- [Bảo mật Azure DevOps](https://azure.microsoft.com/products/devops)  
- [Bảo mật Azure Repos](https://azure.microsoft.com/products/devops/repos/)  
- [Hành trình bảo mật chuỗi cung ứng Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)  

## **Tài liệu bảo mật bổ sung**

Để có hướng dẫn bảo mật đầy đủ, tham khảo các tài liệu chuyên biệt trong phần này:

- **[Thực hành bảo mật MCP 2025](./mcp-security-best-practices-2025.md)** - Thực hành bảo mật đầy đủ cho triển khai MCP  
- **[Triển khai Azure Content Safety](./azure-content-safety-implementation.md)** - Ví dụ triển khai thực tế tích hợp Azure Content Safety  
- **[Kiểm soát bảo mật MCP 2025](./mcp-security-controls-2025.md)** - Các kiểm soát và kỹ thuật bảo mật mới nhất cho triển khai MCP  
- **[Tham chiếu nhanh thực hành MCP](./mcp-best-practices.md)** - Hướng dẫn nhanh các thực hành bảo mật MCP thiết yếu  
- **[BlueHat 2026: Bảo vệ tương lai AI: Bảo vệ MCP với các mẫu phòng thủ sâu](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Mẫu phòng thủ sâu từ Trung tâm phản ứng bảo mật Microsoft (MSRC)  

### **Đào tạo bảo mật thực hành**

- **[Hội thảo bảo mật MCP Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Hội thảo thực hành toàn diện cho bảo mật máy chủ MCP trên Azure với các camp tiến dần từ Base Camp đến Summit  
- **[Hướng dẫn bảo mật OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Kiến trúc tham khảo và hướng dẫn triển khai cho toàn bộ OWASP MCP Top 10  

---

## Tiếp theo

Tiếp theo: [Chương 3: Bắt đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->