# Kiểm Soát Bảo Mật MCP - Cập Nhật Tháng 2 Năm 2026

> **Tiêu Chuẩn Hiện Tại**: Tài liệu này phản ánh các yêu cầu bảo mật của [Đặc Tả MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) và [Thực Hành Tốt Nhất Bảo Mật MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) chính thức.

Model Context Protocol (MCP) đã phát triển đáng kể với các biện pháp kiểm soát bảo mật nâng cao nhằm giải quyết cả các vấn đề bảo mật phần mềm truyền thống và các mối đe dọa đặc thù AI. Tài liệu này cung cấp các kiểm soát bảo mật toàn diện cho triển khai MCP an toàn theo khung OWASP MCP Top 10.

## 🏔️ Đào Tạo Thực Hành Bảo Mật

Để có trải nghiệm thực hành triển khai bảo mật, chúng tôi khuyến nghị **[Hội Thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - một chuyến thám hiểm có hướng dẫn đầy đủ để bảo vệ các máy chủ MCP trên Azure theo phương pháp “lỗ hổng → khai thác → vá → kiểm tra”.

Tất cả các kiểm soát bảo mật trong tài liệu này phù hợp với **[Hướng Dẫn Bảo Mật MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, cung cấp kiến trúc tham khảo và hướng dẫn triển khai đặc thù Azure cho các rủi ro OWASP MCP Top 10.

## **Yêu Cầu Bảo Mật BẮT BUỘC**

### **Các Điều Cấm Quan Trọng từ Đặc Tả MCP:**

> **CẤM**: Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận bất kỳ token nào không được cấp rõ ràng cho máy chủ MCP
>
> **CẤM**: Máy chủ MCP **KHÔNG ĐƯỢC** sử dụng phiên đăng nhập cho xác thực  
>
> **BẮT BUỘC**: Máy chủ MCP triển khai ủy quyền **PHẢI** xác minh TẤT CẢ các yêu cầu đến
>
> **BẮT BUỘC**: Máy chủ proxy MCP sử dụng ID client tĩnh **PHẢI** có được sự đồng ý của người dùng cho từng client đăng ký động

---

## 1. **Kiểm Soát Xác Thực & Ủy Quyền**

### **Tích Hợp Nhà Cung Cấp Danh Tính Bên Ngoài**

**Tiêu chuẩn MCP Hiện tại (2025-11-25)** cho phép máy chủ MCP ủy quyền xác thực cho các nhà cung cấp danh tính bên ngoài, tạo nên sự cải thiện bảo mật đáng kể:

**Rủi ro OWASP MCP Được Giải Quyết**: [MCP07 - Xác Thực & Ủy Quyền Không Đầy Đủ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Lợi Ích Bảo Mật:**
1. **Loại Bỏ Rủi Ro Xác Thực Tùy Chỉnh**: Giảm bề mặt dễ tổn thương bằng cách tránh triển khai xác thực tự chế
2. **Bảo Mật Cấp Doanh Nghiệp**: Tận dụng các nhà cung cấp danh tính đã được thiết lập như Microsoft Entra ID với các tính năng bảo mật tiên tiến
3. **Quản Lý Danh Tính Tập Trung**: Đơn giản hóa quản lý vòng đời người dùng, kiểm soát truy cập và kiểm toán tuân thủ
4. **Xác Thực Đa Yếu Tố**: Kế thừa khả năng MFA từ nhà cung cấp danh tính doanh nghiệp
5. **Chính Sách Truy Cập Có Điều Kiện**: Lợi ích từ kiểm soát truy cập dựa trên rủi ro và xác thực thích ứng

**Yêu Cầu Triển Khai:**
- **Xác Thực Đối Tượng Token**: Xác minh tất cả token được cấp rõ ràng cho máy chủ MCP
- **Xác Thực Nhà Phát Hành**: Xác minh nhà phát hành token khớp với nhà cung cấp danh tính mong đợi
- **Xác Thực Chữ Ký**: Xác minh mật mã tính toàn vẹn token
- **Tuân Thủ Hạn Định Token**: Thực thi nghiêm ngặt giới hạn thời gian sử dụng token
- **Xác Thực Phạm Vi**: Đảm bảo token có các quyền phù hợp với các thao tác yêu cầu

### **Bảo Mật Logic Ủy Quyền**

**Kiểm Soát Quan Trọng:**
- **Kiểm Toán Ủy Quyền Toàn Diện**: Đánh giá bảo mật định kỳ tất cả các điểm quyết định ủy quyền
- **Mặc Định An Toàn**: Từ chối truy cập khi logic ủy quyền không thể đưa ra quyết định rõ ràng
- **Giới Hạn Quyền Hạn**: Phân tách rõ ràng các cấp độ đặc quyền và truy cập tài nguyên
- **Ghi Nhật Ký Kiểm Toán**: Ghi lại đầy đủ mọi quyết định ủy quyền để giám sát bảo mật
- **Đánh Giá Truy Cập Định Kỳ**: Xác nhận định kỳ quyền hạn người dùng và phân bổ đặc quyền

## 2. **Bảo Mật Token & Kiểm Soát Chống Chuyển Tiếp**

**Rủi ro OWASP MCP Được Giải Quyết**: [MCP01 - Quản Lý Token Kém & Lộ Bí Mật](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Phòng Ngừa Chuyển Tiếp Token**

**Chuyển tiếp token bị nghiêm cấm** trong Đặc Tả Ủy Quyền MCP do các rủi ro bảo mật nghiêm trọng:

**Rủi Ro Bảo Mật Được Giải Quyết:**
- **Vượt Qua Kiểm Soát**: Bỏ qua các kiểm soát bảo mật cần thiết như giới hạn tần suất, xác minh yêu cầu, và giám sát lưu lượng
- **Phá Vỡ Trách Nhiệm**: Không thể nhận diện client, làm hỏng hồ sơ kiểm toán và điều tra sự cố
- **Truy Cập Dữ Liệu Qua Proxy**: Cho phép kẻ xấu dùng máy chủ làm proxy truy cập dữ liệu trái phép
- **Vi Phạm Ranh Giới Tin Cậy**: Phá vỡ giả định tin cậy của dịch vụ hạ nguồn đối với nguồn token
- **Di Chuyển Bên Trong Mạng**: Token bị xâm nhập được sử dụng trên nhiều dịch vụ cho phép mở rộng tấn công

**Kiểm Soát Triển Khai:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **Mô Hình Quản Lý Token An Toàn**

**Thực Hành Tốt Nhất:**
- **Token Sống Ngắn**: Giảm thời gian rủi ro với việc xoay vòng token thường xuyên
- **Cấp Token Đúng Lúc**: Cấp token chỉ khi cần cho các thao tác cụ thể
- **Lưu Trữ An Toàn**: Sử dụng module bảo mật phần cứng (HSM) hoặc khoá bảo mật an toàn
- **Ràng Buộc Token**: Ràng buộc token với client, phiên hoặc thao tác cụ thể khi có thể
- **Giám Sát & Cảnh Báo**: Phát hiện thời gian thực các hành vi sử dụng token sai hoặc truy cập trái phép

## 3. **Kiểm Soát Bảo Mật Phiên**

### **Phòng Ngừa Chiếm Đoạt Phiên**

**Hướng Tấn Công Được Giải Quyết:**
- **Chèn Prompt Chiếm Đoạt Phiên**: Sự kiện độc hại được chèn vào trạng thái phiên chia sẻ
- **Giả Mạo Phiên**: Sử dụng trái phép ID phiên bị đánh cắp để vượt qua xác thực
- **Tấn Công Tạm Dừng Stream**: Khai thác tiếp tục sự kiện gửi từ server để chèn nội dung độc hại

**Kiểm Soát Phiên Bắt Buộc:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**Bảo Mật Truyền Tải:**
- **Bắt Buộc HTTPS**: Tất cả truyền thông phiên qua TLS 1.3
- **Thuộc Tính Cookie An Toàn**: HttpOnly, Secure, SameSite=Strict
- **Gán Chứng Chỉ**: Cho các kết nối quan trọng để ngăn tấn công MITM

### **Xem Xét Stateful vs Stateless**

**Với Triển Khai Stateful:**
- Trạng thái phiên chia sẻ cần thêm biện pháp bảo vệ chống chèn
- Quản lý phiên dựa trên hàng đợi đòi hỏi xác minh tính toàn vẹn
- Nhiều máy chủ yêu cầu đồng bộ trạng thái phiên an toàn

**Với Triển Khai Stateless:**
- Quản lý phiên dựa trên JWT hoặc token tương tự
- Xác minh mật mã tính toàn vẹn trạng thái phiên
- Giảm bề mặt tấn công nhưng yêu cầu kiểm tra token nghiêm ngặt

## 4. **Kiểm Soát Bảo Mật Đặc Thù AI**

**Rủi ro OWASP MCP Được Giải Quyết**:
- [MCP06 - Thao Túng Luồng Ý Định](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Độc Hại Công Cụ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Chèn Lệnh & Thực Thi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Phòng Thủ Chèn Prompt**

**Tích Hợp Microsoft Prompt Shields:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**Kiểm Soát Triển Khai:**
- **Làm Sạch Đầu Vào**: Kiểm tra và lọc kỹ lưỡng tất cả dữ liệu đầu vào người dùng
- **Định Nghĩa Ranh Giới Nội Dung**: Tách biệt rõ ràng giữa hướng dẫn hệ thống và nội dung người dùng
- **Thứ Tự Hướng Dẫn**: Quy tắc ưu tiên thích hợp cho các hướng dẫn mâu thuẫn
- **Giám Sát Đầu Ra**: Phát hiện các đầu ra khả nghi hoặc bị thao túng

### **Phòng Ngừa Độc Hại Công Cụ**

**Khung Bảo Mật Công Cụ:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**Quản Lý Công Cụ Động:**
- **Quy Trình Phê Duyệt**: Đồng ý rõ ràng của người dùng cho các thay đổi công cụ
- **Khả Năng Quay Lại**: Có thể phục hồi về phiên bản công cụ trước đó
- **Kiểm Toán Thay Đổi**: Lưu trữ lịch sử đầy đủ các sửa đổi định nghĩa công cụ
- **Đánh Giá Rủi Ro**: Đánh giá tự động trạng thái bảo mật công cụ

## 5. **Phòng Ngừa Tấn Công Confused Deputy**

### **Bảo Mật OAuth Proxy**

**Kiểm Soát Ngăn Ngừa Tấn Công:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**Yêu Cầu Triển Khai:**
- **Xác Minh Sự Đồng Ý Người Dùng**: Không bao giờ bỏ qua màn hình đồng ý khi đăng ký client động
- **Xác Thực Redirect URI**: Kiểm tra nghiêm ngặt dựa trên danh sách trắng các đích chuyển hướng
- **Bảo Vệ Mã Ủy Quyền**: Mã có tuổi thọ ngắn và chỉ dùng một lần
- **Xác Thực Danh Tính Client**: Kiểm tra chéo các chứng chỉ và metadata của client

## 6. **Bảo Mật Thực Thi Công Cụ**

### **Cách Ly & Bao Vây**

**Cách Ly Dựa Trên Container:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**Cách Ly Quy Trình:**
- **Ngữ Cảnh Quy Trình Riêng Biệt**: Mỗi lần thực thi công cụ trong không gian quy trình cách ly
- **Giao Tiếp Liên Quy Trình**: Cơ chế IPC an toàn với xác thực
- **Giám Sát Quy Trình**: Phân tích hành vi thời gian chạy và phát hiện bất thường
- **Thực Thi Tài Nguyên**: Giới hạn cứng về CPU, bộ nhớ và I/O

### **Triển Khai Nguyên Tắc Quyền Tối Thiểu**

**Quản Lý Quyền Hạn:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **Kiểm Soát Bảo Mật Chuỗi Cung Ứng**

**Rủi ro OWASP MCP Được Giải Quyết**: [MCP04 - Tấn Công Chuỗi Cung Ứng Phần Mềm & Giả Mạo Phụ Thuộc](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Xác Thực Phụ Thuộc**

**Bảo Mật Thành Phần Toàn Diện:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **Giám Sát Liên Tục**

**Phát Hiện Mối Đe Dọa Chuỗi Cung Ứng:**
- **Giám Sát Tình Trạng Phụ Thuộc**: Đánh giá liên tục mọi phụ thuộc về các vấn đề bảo mật
- **Tích Hợp Tình Báo Mối Đe Dọa**: Cập nhật thời gian thực về các mối đe dọa chuỗi cung ứng mới nổi
- **Phân Tích Hành Vi**: Phát hiện hành vi bất thường trong thành phần bên ngoài
- **Phản Ứng Tự Động**: Ngăn chặn ngay lập tức các thành phần bị xâm phạm

## 8. **Kiểm Soát Giám Sát & Phát Hiện**

**Rủi ro OWASP MCP Được Giải Quyết**: [MCP08 - Thiếu Giám Sát & Telemetry](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Quản Lý Thông Tin & Sự Kiện Bảo Mật (SIEM)**

**Chiến Lược Ghi Nhật Ký Toàn Diện:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **Phát Hiện Mối Đe Dọa Thời Gian Thực**

**Phân Tích Hành Vi:**
- **Phân Tích Hành Vi Người Dùng (UBA)**: Phát hiện mô hình truy cập người dùng bất thường
- **Phân Tích Hành Vi Thực Thể (EBA)**: Giám sát hành vi máy chủ MCP và công cụ
- **Phát Hiện Bất Thường Bằng Máy Học**: Dùng AI nhận diện mối đe dọa bảo mật
- **Tương Quan Tình Báo Mối Đe Dọa**: Đối chiếu hoạt động quan sát với mẫu tấn công đã biết

## 9. **Phản Ứng & Phục Hồi Sự Cố**

### **Khả Năng Phản Ứng Tự Động**

**Hành Động Phản Ứng Ngay Lập Tức:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **Khả Năng Điều Tra Pháp Y**

**Hỗ Trợ Điều Tra:**
- **Bảo Tồn Hồ Sơ Kiểm Toán**: Nhật ký bất biến với tính toàn vẹn mật mã
- **Thu Thập Bằng Chứng**: Tự động thu thập các hiện vật bảo mật liên quan
- **Phục Hồi Dòng Thời Gian**: Trình tự sự kiện chi tiết dẫn đến sự cố bảo mật
- **Đánh Giá Tác Động**: Đánh giá phạm vi bị xâm phạm và lộ dữ liệu

## **Nguyên Tắc Kiến Trúc Bảo Mật Chính**

### **Phòng Thủ Tầng Nấc**
- **Nhiều Lớp Bảo Mật**: Không có điểm lỗi đơn lẻ trong kiến trúc bảo mật
- **Kiểm Soát Dự Phòng**: Biện pháp bảo mật chồng chéo cho các chức năng quan trọng
- **Cơ Chế An Toàn Khi Lỗi**: Mặc định bảo mật khi hệ thống gặp lỗi hoặc bị tấn công

### **Triển Khai Zero Trust**
- **Không Bao Giờ Tin, Luôn Xác Minh**: Xác nhận liên tục mọi thực thể và yêu cầu
- **Nguyên Tắc Quyền Tối Thiểu**: Quyền truy cập tối thiểu cho tất cả thành phần
- **Phân Vùng Mạng Chi Tiết**: Kiểm soát mạng và truy cập mức độ hạt nhân

### **Sự Tiến Hóa Bảo Mật Liên Tục**
- **Thích Nghi Cảnh Quan Mối Đe Dọa**: Cập nhật thường xuyên để xử lý các mối đe dọa mới
- **Hiệu Quả Kiểm Soát Bảo Mật**: Đánh giá và cải tiến các kiểm soát liên tục
- **Tuân Thủ Đặc Tả**: Đồng bộ với tiêu chuẩn bảo mật MCP đang phát triển

---

## **Tài Nguyên Triển Khai**

### **Tài Liệu MCP Chính Thức**
- [Đặc Tả MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Thực Hành Tốt Nhất Bảo Mật MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Đặc Tả Ủy Quyền MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Tài Nguyên Bảo Mật MCP OWASP**
- [Hướng Dẫn Bảo Mật MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 và triển khai trên Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rủi ro bảo mật MCP chính thức OWASP
- [Hội Thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo bảo mật thực hành MCP trên Azure

### **Giải Pháp Bảo Mật Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Tiêu Chuẩn Bảo Mật**
- [Thực Hành Tốt Nhất Bảo Mật OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 cho Mô Hình Ngôn Ngữ Lớn](https://genai.owasp.org/)
- [Khung An Ninh Mạng NIST](https://www.nist.gov/cyberframework)

---

> **Quan Trọng**: Các kiểm soát bảo mật này phản ánh đặc tả MCP hiện tại (2025-11-25). Luôn kiểm tra đối chiếu với [tài liệu chính thức](https://spec.modelcontextprotocol.io/) mới nhất vì tiêu chuẩn tiếp tục phát triển nhanh chóng.

## Tiếp Theo

- Quay lại: [Tổng Quan Mô-đun Bảo Mật](./README.md)
- Tiếp tục: [Mô-đun 3: Bắt Đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->