# Kiểm Soát Bảo Mật MCP - Cập Nhật Tháng Hai 2026

> **Tiêu Chuẩn Hiện Tại**: Tài liệu này phản ánh các yêu cầu bảo mật của [Đặc tả MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) và [Thực hành Bảo mật MCP Chính thức](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Giao thức Context Mô hình (MCP) đã phát triển đáng kể với các kiểm soát bảo mật nâng cao, giải quyết cả bảo mật phần mềm truyền thống và các mối đe dọa đặc thù AI. Tài liệu này cung cấp các kiểm soát bảo mật toàn diện cho các triển khai MCP an toàn, phù hợp với khuôn khổ OWASP MCP Top 10.

## 🏔️ Đào Tạo Thực Hành Bảo Mật

Để có kinh nghiệm triển khai bảo mật thực tiễn, chúng tôi khuyến nghị **[Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - một chuyến thám hiểm có hướng dẫn toàn diện để bảo mật máy chủ MCP trên Azure theo phương pháp "lỗ hổng → khai thác → sửa lỗi → xác thực".

Tất cả các kiểm soát bảo mật trong tài liệu này phù hợp với **[Hướng Dẫn Bảo Mật Azure MCP của OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, cung cấp kiến trúc tham khảo và hướng dẫn triển khai cụ thể cho Azure đối với các rủi ro trong OWASP MCP Top 10.

## **Yêu Cầu Bảo Mật BẮT BUỘC**

### **Các Cấm Kỵ Quan Trọng từ Đặc tả MCP:**

> **CẤM:** Máy chủ MCP **KHÔNG ĐƯỢC** chấp nhận bất kỳ token nào không được cấp rõ ràng cho máy chủ MCP  
>
> **CẤM:** Máy chủ MCP **KHÔNG ĐƯỢC** sử dụng phiên làm phương thức xác thực  
>
> **BẮT BUỘC:** Máy chủ MCP thực hiện ủy quyền **PHẢI** xác minh TẤT CẢ các yêu cầu đến  
>
> **BẮT BUỘC:** Máy chủ MCP proxy sử dụng ID client tĩnh **PHẢI** lấy sự đồng ý của người dùng cho từng client đăng ký động

---

## 1. **Kiểm Soát Xác Thực & Ủy Quyền**

### **Tích hợp Nhà Cung Cấp Danh Tính Bên Ngoài**

**Tiêu chuẩn MCP Hiện tại (2025-11-25)** cho phép máy chủ MCP ủy quyền xác thực cho nhà cung cấp danh tính bên ngoài, đại diện cho cải tiến bảo mật đáng kể:

**Rủi ro MCP của OWASP được giải quyết**: [MCP07 - Xác thực & Ủy quyền không đầy đủ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Lợi ích Bảo mật:**
1. **Loại bỏ Rủi ro Xác thực Tự triển khai**: Giảm bề mặt lỗ hổng bằng cách tránh các triển khai xác thực tùy chỉnh
2. **Bảo mật Cấp Doanh Nghiệp**: Tận dụng các nhà cung cấp danh tính đã thiết lập như Microsoft Entra ID với các tính năng bảo mật nâng cao
3. **Quản lý Danh tính Tập trung**: Đơn giản hóa quản lý vòng đời người dùng, kiểm soát truy cập và kiểm toán tuân thủ
4. **Xác thực đa yếu tố**: Kế thừa khả năng MFA từ nhà cung cấp danh tính doanh nghiệp
5. **Chính sách Truy cập Có Điều kiện**: Lợi ích từ kiểm soát truy cập dựa trên rủi ro và xác thực thích ứng

**Yêu cầu Triển khai:**
- **Xác thực Đối tượng Token**: Xác minh tất cả các token được cấp rõ ràng cho máy chủ MCP
- **Xác minh Nhà phát hành**: Xác thực nhà phát hành token phù hợp với nhà cung cấp danh tính mong đợi
- **Xác minh Chữ ký**: Xác thực mật mã tính toàn vẹn token
- **Áp dụng Hết hạn**: Thi hành nghiêm ngặt giới hạn thời gian sử dụng token
- **Xác thực Phạm vi**: Đảm bảo token chứa các quyền thích hợp cho các thao tác được yêu cầu

### **Bảo mật Logic Ủy quyền**

**Kiểm soát Quan trọng:**
- **Kiểm toán Ủy quyền Toàn diện**: Đánh giá bảo mật định kỳ tất cả các điểm quyết định ủy quyền
- **Mặc định An toàn**: Từ chối truy cập khi logic ủy quyền không thể đưa ra quyết định rõ ràng
- **Ranh giới Quyền hạn**: Phân tách rõ ràng các mức đặc quyền và quyền truy cập tài nguyên khác nhau
- **Ghi log Kiểm toán**: Ghi lại đầy đủ tất cả quyết định ủy quyền để theo dõi bảo mật
- **Rà soát Truy cập Định kỳ**: Xác thực định kỳ quyền và gán đặc quyền người dùng

## 2. **Kiểm Soát Bảo Mật Token & Chống Token Passthrough**

**Rủi ro MCP của OWASP được giải quyết**: [MCP01 - Quản lý Token sai & Lộ bí mật](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Ngăn chặn Token Passthrough**

**Token passthrough bị cấm tuyệt đối** trong Đặc tả Ủy quyền MCP do các rủi ro bảo mật nghiêm trọng:

**Rủi ro Bảo mật Được giải quyết:**
- **Vượt qua Kiểm soát**: Bỏ qua các kiểm soát thiết yếu như giới hạn tốc độ, xác thực yêu cầu, giám sát lưu lượng
- **Mất Trách nhiệm**: Làm không thể xác định client, làm hỏng các dấu vết kiểm toán và điều tra sự cố
- **Trục lợi Bằng Proxy**: Cho phép tác nhân độc hại dùng máy chủ làm proxy truy cập dữ liệu trái phép
- **Vi phạm Ranh giới Tin cậy**: Phá vỡ giả định tin cậy của dịch vụ hạ nguồn về nguồn gốc token
- **Di chuyển Ngang hàng**: Token bị đánh cắp có thể mở rộng tấn công qua nhiều dịch vụ

**Kiểm soát Triển khai:**
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

### **Mẫu Quản lý Token An toàn**

**Thực hành Tốt nhất:**
- **Token Ngắn hạn**: Giảm thời gian phơi nhiễm bằng cách xoay token thường xuyên
- **Cấp Phát Đúng Lúc**: Cấp token chỉ khi cần cho các thao tác cụ thể
- **Lưu trữ An toàn**: Sử dụng mô-đun bảo mật phần cứng (HSM) hoặc kho khóa bảo mật
- **Ràng buộc Token**: Ràng buộc token với client, phiên hoặc thao tác cụ thể khi có thể
- **Giám sát & Cảnh báo**: Phát hiện thời gian thực khi token bị sử dụng sai hoặc truy cập trái phép

## 3. **Kiểm Soát Bảo Mật Phiên**

### **Ngăn chặn Chiếm đoạt Phiên**

**Các Đường tấn công Được giải quyết:**
- **Chèn Prompt Chiếm đoạt Phiên**: Các sự kiện độc hại được chèn vào trạng thái phiên chia sẻ
- **Giả mạo Phiên**: Sử dụng trái phép ID phiên bị đánh cắp để bỏ qua xác thực
- **Tấn công Tiếp tục Stream**: Lợi dụng việc tiếp tục sự kiện gửi từ server để chèn nội dung độc hại

**Kiểm soát Phiên Bắt buộc:**
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

**Bảo mật Vận chuyển:**
- **Bắt buộc HTTPS**: Tất cả giao tiếp phiên phải qua TLS 1.3
- **Thuộc tính Cookie An toàn**: HttpOnly, Secure, SameSite=Strict
- **Khóa Chứng thực**: Đối với các kết nối quan trọng để phòng ngừa MITM

### **Cân nhắc Stateful so với Stateless**

**Đối với triển khai Stateful:**
- Trạng thái phiên chia sẻ cần biện pháp bảo vệ bổ sung chống chèn mã độc
- Quản lý phiên theo hàng đợi cần xác minh tính toàn vẹn
- Nhiều instance server cần đồng bộ trạng thái phiên an toàn

**Đối với triển khai Stateless:**
- Quản lý phiên dựa trên token JWT hoặc tương tự
- Xác minh mật mã tính toàn vẹn trạng thái phiên
- Giảm bề mặt tấn công nhưng đòi hỏi xác thực token mạnh mẽ

## 4. **Kiểm Soát Bảo Mật Đặc thù AI**

**Rủi ro MCP của OWASP được giải quyết**:
- [MCP06 - Chèn lệnh Prompt qua Payload ngữ cảnh](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Độc hại công cụ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Chèn & thực thi lệnh](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Phòng chống Chèn prompt**

**Tích hợp Microsoft Prompt Shields:**
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

**Kiểm soát Triển khai:**
- **Xử lý Đầu vào**: Xác thực và lọc kỹ lưỡng tất cả đầu vào người dùng
- **Định nghĩa Ranh giới Nội dung**: Phân tách rõ ràng giữa hướng dẫn hệ thống và nội dung người dùng
- **Cấp bậc Hướng dẫn**: Quy tắc ưu tiên hợp lý cho các hướng dẫn xung đột
- **Giám sát Đầu ra**: Phát hiện các kết quả có thể gây hại hoặc bị thao túng

### **Ngăn chặn Độc hại Công cụ**

**Khung An toàn Công cụ:**
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

**Quản lý Công cụ Động:**
- **Quy trình Phê duyệt**: Bắt buộc sự đồng ý rõ ràng của người dùng cho các thay đổi công cụ
- **Khả năng Quay lại**: Dùng lại phiên bản công cụ trước đó khi cần
- **Kiểm toán Thay đổi**: Lịch sử đầy đủ các sửa đổi định nghĩa công cụ
- **Đánh giá Rủi ro**: Tự động đánh giá tình trạng bảo mật công cụ

## 5. **Phòng chống Tấn công Confused Deputy**

### **Bảo mật Proxy OAuth**

**Kiểm soát Ngăn chặn Tấn công:**
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

**Yêu cầu Triển khai:**
- **Xác minh Sự đồng ý Người dùng**: Không được bỏ qua màn hình đồng ý cho đăng ký client động
- **Xác thực Redirect URI**: Kiểm tra whitelist nghiêm ngặt các đích chuyển hướng
- **Bảo vệ Mã Ủy quyền**: Mã ngắn hạn, chỉ dùng một lần
- **Xác minh Danh tính Client**: Xác thực chắc chắn thông tin và metadata của client

## 6. **Bảo mật Thực thi Công cụ**

### **Cách ly & Sandbox**

**Cách ly dựa trên Container:**
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

**Cách ly Quy trình:**
- **Ngữ cảnh Quy trình Riêng biệt**: Mỗi lần thực thi công cụ trong không gian quy trình riêng
- **Giao tiếp Liên Quy trình**: Cơ chế IPC an toàn có xác thực
- **Giám sát Quy trình**: Phân tích hành vi thời gian chạy và phát hiện bất thường
- **Áp dụng Tài nguyên**: Giới hạn cứng CPU, bộ nhớ và I/O

### **Triển khai Nguyên tắc Quyền tối thiểu**

**Quản lý Quyền:**
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

## 7. **Kiểm soát Bảo mật Chuỗi Cung ứng**

**Rủi ro MCP của OWASP được giải quyết**: [MCP04 - Tấn công Chuỗi Cung ứng](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Xác minh Phụ thuộc**

**An toàn Toàn diện Thành phần:**
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

### **Giám sát Liên tục**

**Phát hiện Mối đe dọa Chuỗi Cung ứng:**
- **Giám sát Sức khỏe Phụ thuộc**: Đánh giá liên tục các phụ thuộc về vấn đề bảo mật
- **Tích hợp Thông tin Mối đe dọa**: Cập nhật thời gian thực các mối đe dọa chuỗi cung ứng mới nổi
- **Phân tích Hành vi**: Phát hiện hành vi bất thường của các thành phần bên ngoài
- **Phản ứng Tự động**: Ngăn chặn ngay lập tức các thành phần bị xâm phạm

## 8. **Kiểm soát Giám sát & Phát hiện**

**Rủi ro MCP của OWASP được giải quyết**: [MCP08 - Thiếu Audit & Telemetry](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Quản lý Thông tin và Sự kiện Bảo mật (SIEM)**

**Chiến lược Ghi log Toàn diện:**
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

### **Phát hiện Mối đe dọa Thời gian Thực**

**Phân tích Hành vi:**
- **Phân tích Hành vi Người dùng (UBA)**: Phát hiện các mẫu truy cập người dùng bất thường
- **Phân tích Hành vi Thực thể (EBA)**: Giám sát hành vi máy chủ MCP và công cụ
- **Phát hiện Bất thường bằng Máy học**: AI nhận biết các mối đe dọa bảo mật
- **Tương quan Thông tin Mối đe dọa**: So khớp hành động quan sát với mô hình tấn công đã biết

## 9. **Ứng phó Sự cố & Phục hồi**

### **Khả năng Ứng phó Tự động**

**Các Hành động Phản hồi Ngay lập tức:**
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

### **Khả năng Pháp y**

**Hỗ trợ Điều tra:**
- **Bảo tồn Dấu vết Kiểm toán**: Ghi log bất biến với tính toàn vẹn mật mã
- **Thu thập Chứng cứ**: Tự động thu thập các hiện vật bảo mật liên quan
- **Xây dựng Dòng Thời gian**: Trình tự chi tiết các sự kiện dẫn đến sự cố bảo mật
- **Đánh giá Tác động**: Đánh giá phạm vi xâm phạm và lộ dữ liệu

## **Nguyên tắc Kiến trúc Bảo mật Chính**

### **Phòng thủ Nhiều tầng**
- **Nhiều Lớp Bảo mật**: Không có điểm thất bại đơn lẻ trong kiến trúc bảo mật
- **Kiểm soát Dự phòng**: Các biện pháp bảo mật chồng chéo đối với các chức năng quan trọng
- **Cơ chế An toàn Mặc định**: Thiết lập mặc định an toàn khi hệ thống gặp lỗi hoặc tấn công

### **Triển khai Zero Trust**
- **Không bao giờ tin tưởng, luôn xác minh**: Liên tục kiểm tra tất cả thực thể và yêu cầu
- **Nguyên tắc Quyền Tối thiểu**: Quyền truy cập tối thiểu cho tất cả thành phần
- **Phân đoạn vi mô (Micro-segmentation)**: Kiểm soát mạng và truy cập chi tiết

### **Phát triển Bảo mật Liên tục**
- **Thích nghi với Cảnh quan Mối đe dọa**: Cập nhật thường xuyên để đối phó mối đe dọa mới
- **Hiệu quả Kiểm soát Bảo mật**: Đánh giá và cải thiện liên tục các kiểm soát
- **Tuân thủ Đặc tả**: Phù hợp với tiêu chuẩn bảo mật MCP đang phát triển

---

## **Tài Nguyên Triển Khai**

### **Tài liệu MCP Chính thức**
- [Đặc tả MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Thực hành Bảo mật MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Đặc tả Ủy quyền MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Tài nguyên Bảo mật MCP OWASP**
- [Hướng dẫn Bảo mật Azure MCP của OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Toàn diện OWASP MCP Top 10 với triển khai Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rủi ro bảo mật MCP chính thức của OWASP
- [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo thực hành bảo mật MCP trên Azure

### **Giải pháp Bảo mật Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Tiêu chuẩn Bảo mật**
- [Thực hành Bảo mật OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 cho Mô hình Ngôn ngữ Lớn](https://genai.owasp.org/)
- [Khung An ninh mạng NIST](https://www.nist.gov/cyberframework)

---

> **Quan trọng**: Các kiểm soát bảo mật này phản ánh đặc tả MCP hiện tại (2025-11-25). Luôn xác minh đối chiếu với [tài liệu chính thức](https://spec.modelcontextprotocol.io/) mới nhất vì các tiêu chuẩn tiếp tục phát triển nhanh chóng.

## Tiếp theo là gì

- Quay lại: [Tổng quan Mô-đun Bảo mật](./README.md)
- Tiếp tục tới: [Module 3: Bắt đầu](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ bản địa nên được xem là nguồn tham khảo chính xác nhất. Đối với thông tin quan trọng, khuyến nghị sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hay giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->