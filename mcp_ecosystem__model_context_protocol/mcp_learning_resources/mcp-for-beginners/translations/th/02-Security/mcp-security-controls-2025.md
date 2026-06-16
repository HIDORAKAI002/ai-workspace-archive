# MCP Security Controls - การอัปเดตกุมภาพันธ์ 2026

> **มาตรฐานปัจจุบัน**: เอกสารนี้สะท้อนความต้องการด้านความปลอดภัยของ [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) และ [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) อย่างเป็นทางการ

โปรโตคอลบริบทโมเดล (MCP) ได้พัฒนาอย่างมากด้วยการควบคุมความปลอดภัยที่ได้รับการปรับปรุงซึ่งครอบคลุมทั้งความปลอดภัยของซอฟต์แวร์แบบดั้งเดิมและภัยคุกคามเฉพาะ AI เอกสารนี้นำเสนอมาตรการควบคุมความปลอดภัยที่ครบถ้วนสำหรับการใช้งาน MCP อย่างปลอดภัยตามกรอบ OWASP MCP Top 10

## 🏔️ การฝึกอบรมความปลอดภัยเชิงปฏิบัติ

สำหรับประสบการณ์การนำไปใช้ความปลอดภัยเชิงปฏิบัติ เราแนะนำ **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - การเดินทางแนะนำอย่างละเอียดเพื่อความปลอดภัยของเซิร์ฟเวอร์ MCP ใน Azure โดยใช้วิธีการ "ช่องโหว่ → เจาะระบบ → แก้ไข → ตรวจสอบ"

มาตรการควบคุมความปลอดภัยทั้งหมดในเอกสารนี้สอดคล้องกับ **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** ซึ่งให้สถาปัตยกรรมอ้างอิงและแนวทางการใช้งานใน Azure สำหรับความเสี่ยง OWASP MCP Top 10

## **ความต้องการด้านความปลอดภัยที่บังคับใช้**

### **ข้อห้ามสำคัญจาก MCP Specification:**

> **ห้าม**: เซิร์ฟเวอร์ MCP **ห้ามรับ** โทเค็นใด ๆ ที่ไม่ได้ออกให้สำหรับเซิร์ฟเวอร์ MCP โดยชัดแจ้ง  
>
> **ห้ามใช้**: เซิร์ฟเวอร์ MCP **ห้ามใช้** เซสชันสำหรับการตรวจสอบตัวตน  
>
> **จำเป็น**: เซิร์ฟเวอร์ MCP ที่ใช้งานระบบอนุญาต **ต้อง** ตรวจสอบคำขอเข้าทั้งหมด  
>
> **บังคับใช้**: เซิร์ฟเวอร์พร็อกซี MCP ที่ใช้รหัสไคลเอนต์แบบคงที่ **ต้อง** ได้รับความยินยอมจากผู้ใช้สำหรับไคลเอนต์ที่ลงทะเบียนแบบไดนามิกแต่ละราย

---

## 1. **การตรวจสอบตัวตน & การควบคุมสิทธิ์**

### **การรวมผู้ให้บริการตัวตนภายนอก**

**มาตรฐาน MCP ปัจจุบัน (2025-11-25)** อนุญาตให้เซิร์ฟเวอร์ MCP มอบหมายการตรวจสอบตัวตนไปยังผู้ให้บริการตัวตนภายนอก ซึ่งเป็นการปรับปรุงความปลอดภัยครั้งสำคัญ:

**ความเสี่ยง OWASP MCP ที่ถูกจัดการ**: [MCP07 - การตรวจสอบตัวตนและการควบคุมสิทธิ์ไม่เพียงพอ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**ประโยชน์ด้านความปลอดภัย:**
1. **ตัดความเสี่ยงจากการตรวจสอบตัวตนแบบกำหนดเอง**: ลดพื้นผิวช่องโหว่โดยหลีกเลี่ยงการดำเนินการตรวจสอบตัวตนอันเกิดจากการเขียนเอง
2. **ความปลอดภัยระดับองค์กร**: ใช้งานผู้ให้บริการตัวตนที่ได้รับการยอมรับเช่น Microsoft Entra ID ที่มาพร้อมฟีเจอร์ความปลอดภัยขั้นสูง
3. **การจัดการตัวตนแบบรวมศูนย์**: ง่ายขึ้นสำหรับการจัดการวัฏจักรชีวิตผู้ใช้ การควบคุมการเข้าถึง และการตรวจสอบความสอดคล้อง
4. **การพิสูจน์ตัวตนหลายปัจจัย (MFA)**: สืบทอดความสามารถ MFA จากผู้ให้บริการตัวตนองค์กร
5. **นโยบายการเข้าถึงมีเงื่อนไข**: ได้รับประโยชน์จากการควบคุมการเข้าถึงตามความเสี่ยงและการตรวจสอบการพิสูจน์ตัวตนแบบปรับเปลี่ยนได้

**ข้อกำหนดในการใช้งาน:**
- **การตรวจสอบผู้รับโทเค็น**: ตรวจสอบว่าโทเค็นทั้งหมดออกให้กับเซิร์ฟเวอร์ MCP โดยชัดแจ้ง
- **การตรวจสอบผู้ให้สิทธิ์ออกโทเค็น**: ยืนยันว่าผู้ให้สิทธิ์ออกโทเค็นตรงกับผู้ให้บริการตัวตนที่คาดหวัง
- **การตรวจสอบลายเซ็นต์**: ตรวจสอบความถูกต้องของโทเค็นด้วยคริปโตกราฟี
- **การบังคับใช้อายุโทเค็น**: ปฏิบัติตามระยะเวลาการใช้งานโทเค็นอย่างเข้มงวด
- **การตรวจสอบขอบเขต**: ตรวจสอบว่าโทเค็นมีสิทธิ์ที่เหมาะสมสำหรับการดำเนินการที่ร้องขอ

### **ความปลอดภัยของตรรกะการอนุญาต**

**การควบคุมที่สำคัญ:**
- **การตรวจสอบการอนุญาตอย่างครบถ้วน**: ตรวจสอบความปลอดภัยเป็นประจำในทุกจุดตัดสินใจอนุญาต
- **ค่าเริ่มต้นปลอดภัย**: ปฏิเสธการเข้าถึงเมื่อไม่สามารถตัดสินใจอนุญาตได้แน่ชัด
- **ขอบเขตสิทธิ์**: แยกสิทธิ์อย่างชัดเจนระหว่างระดับสิทธิ์และการเข้าถึงทรัพยากร
- **บันทึกการตรวจสอบ**: บันทึกการตัดสินใจอนุญาตทั้งหมดสำหรับการตรวจสอบความปลอดภัย
- **ตรวจสอบการเข้าถึงเป็นประจำ**: ตรวจสอบสิทธิ์และการมอบหมายสิทธิ์ของผู้ใช้อย่างสม่ำเสมอ

## 2. **ความปลอดภัยโทเค็น & การควบคุมป้องกันการส่งผ่าน**

**ความเสี่ยง OWASP MCP ที่ถูกจัดการ**: [MCP01 - การจัดการโทเค็นผิดพลาด & การเปิดเผยความลับ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **การป้องกันการส่งผ่านโทเค็น**

**การส่งผ่านโทเค็นถูกห้ามอย่างชัดเจน** ในข้อกำหนด MCP Authorization เนื่องจากความเสี่ยงด้านความปลอดภัยที่สำคัญ:

**ความเสี่ยงด้านความปลอดภัยที่จัดการ:**
- **เลี่ยงการควบคุม**: ข้ามการควบคุมความปลอดภัยสำคัญเช่นจำกัดอัตรา ตรวจสอบคำขอ และการตรวจสอบทราฟฟิก
- **การทำลายความรับผิดชอบ**: ทำให้ระบุไคลเอนต์ไม่ได้ ส่งผลให้เส้นทางตรวจสอบและการสืบสวนเหตุการณ์เสียหาย
- **การส่งข้อมูลผ่านพร็อกซีโดยมิชอบ**: เปิดโอกาสให้ผู้ประสงค์ร้ายใช้เซิร์ฟเวอร์เป็นพร็อกซีเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต
- **การละเมิดขอบเขตความน่าเชื่อถือ**: แตกความเชื่อใจของบริการปลายทางเกี่ยวกับแหล่งที่มาของโทเค็น
- **การเคลื่อนที่ในแนวข้าง**: โทเค็นที่ถูกเจาะข้ามหลายบริการช่วยขยายการโจมตีได้กว้างขึ้น

**การควบคุมการใช้งาน:**
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

### **รูปแบบการจัดการโทเค็นอย่างปลอดภัย**

**แนวปฏิบัติที่ดีที่สุด:**
- **โทเค็นอายุสั้น**: ลดเวลาที่โทเค็นเสี่ยงต่อการถูกโจมตีโดยหมุนเวียนโทเค็นบ่อย
- **ออกโทเค็นตามเวลาจำเป็น**: ออกโทเค็นเมื่อจำเป็นสำหรับการดำเนินการเฉพาะเท่านั้น
- **ที่เก็บที่ปลอดภัย**: ใช้ฮาร์ดแวร์โมดูลความปลอดภัย (HSM) หรือกุญแจที่เก็บอย่างปลอดภัย
- **การผูกโทเค็น**: ผูกโทเค็นกับไคลเอนต์ เซสชัน หรือการดำเนินการเฉพาะเมื่อเป็นไปได้
- **การตรวจสอบและแจ้งเตือน**: ตรวจจับการใช้งานโทเค็นที่ผิดปกติหรือการเข้าถึงโดยไม่ได้รับอนุญาตเรียลไทม์

## 3. **การควบคุมความปลอดภัยของเซสชัน**

### **การป้องกันการแฮ็กเซสชัน**

**ช่องทางโจมตีที่จัดการ:**
- **การฉีดคำสั่งแฮ็กเซสชัน**: เหตุการณ์ที่เป็นอันตรายถูกฉีดเข้าไปในสถานะเซสชันที่ใช้ร่วมกัน
- **การปลอมตัวเซสชัน**: ใช้ ID เซสชันที่ถูกขโมยเพื่อเลี่ยงการตรวจสอบตัวตนโดยไม่ได้รับอนุญาต
- **การโจมตีสตรีมไฟล์ที่สามารถทำซ้ำได้**: การเอาเปรียบการส่งเหตุการณ์ของเซิร์ฟเวอร์เพื่อฉีดเนื้อหาอันตราย

**การควบคุมเซสชันที่บังคับใช้:**
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

**ความปลอดภัยของการส่งข้อมูล:**
- **บังคับใช้ HTTPS**: การสื่อสารเซสชันทั้งหมดผ่าน TLS 1.3
- **คุณสมบัติคุกกี้ที่ปลอดภัย**: HttpOnly, Secure, SameSite=Strict
- **การตรึงใบรับรอง**: สำหรับการเชื่อมต่อสำคัญเพื่อป้องกันการโจมตี MITM

### **พิจารณา Stateful กับ Stateless**

**สำหรับการใช้งานแบบ Stateful:**
- สถานะเซสชันที่ใช้ร่วมกันต้องมีการป้องกันเพิ่มเติมจากการฉีดคำสั่ง
- การจัดการเซสชันแบบคิวต้องตรวจสอบความถูกต้องของข้อมูล
- เซิร์ฟเวอร์หลายอินสแตนซ์ต้องซิงโครไนซ์สถานะเซสชันด้วยความปลอดภัย

**สำหรับการใช้งานแบบ Stateless:**
- การจัดการเซสชันโดยโทเค็นเช่น JWT
- การตรวจสอบความถูกต้องของสถานะเซสชันด้วยคริปโตกราฟี
- ลดพื้นผิวช่องโหว่แต่ต้องการการตรวจสอบโทเค็นที่เข้มงวด

## 4. **การควบคุมความปลอดภัยเฉพาะ AI**

**ความเสี่ยง OWASP MCP ที่จัดการ**:  
- [MCP06 - การล้มเหลวของการไหลของเจตนา](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - การวางยาพิษเครื่องมือ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - การฉีดคำสั่งและการรันคำสั่ง](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **การป้องกันการฉีดคำสั่ง**

**การผสานรวม Microsoft Prompt Shields:**
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

**การควบคุมการใช้งาน:**
- **การทำความสะอาดข้อมูลนำเข้า**: ตรวจสอบและกรองข้อมูลผู้ใช้ทั้งหมดอย่างครอบคลุม
- **การกำหนดขอบเขตเนื้อหา**: แยกอย่างชัดเจนระหว่างคำสั่งระบบและเนื้อหาของผู้ใช้
- **ลำดับคำสั่ง**: กฎความสำคัญที่เหมาะสมสำหรับคำสั่งที่ขัดแย้งกัน
- **การตรวจสอบผลลัพธ์**: ตรวจจับผลลัพธ์ที่เป็นอันตรายหรือถูกเปลี่ยนแปลง

### **การป้องกันการวางยาพิษเครื่องมือ**

**กรอบความปลอดภัยเครื่องมือ:**
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

**การจัดการเครื่องมือแบบไดนามิก:**
- **เวิร์กโฟลว์อนุมัติ**: ความยินยอมของผู้ใช้อย่างชัดเจนสำหรับการเปลี่ยนแปลงเครื่องมือ
- **ความสามารถในการย้อนกลับ**: ความสามารถในการกลับไปยังเวอร์ชันเครื่องมือก่อนหน้า
- **การตรวจสอบการเปลี่ยนแปลง**: ประวัติการเปลี่ยนแปลงคำนิยามเครื่องมือแบบครบถ้วน
- **การประเมินความเสี่ยง**: การประเมินอัตโนมัติของสถานะความปลอดภัยเครื่องมือ

## 5. **การป้องกันการโจมตี Confused Deputy**

### **ความปลอดภัยพร็อกซี OAuth**

**การควบคุมการป้องกันการโจมตี:**
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

**ข้อกำหนดในการใช้งาน:**
- **การตรวจสอบความยินยอมของผู้ใช้**: ไม่ข้ามหน้าจอความยินยอมสำหรับการลงทะเบียนไคลเอนต์แบบไดนามิก
- **การตรวจสอบ URI การเปลี่ยนเส้นทาง**: ตรวจสอบ whitelist อย่างเข้มงวดของจุดหมายปลายทางการเปลี่ยนเส้นทาง
- **ป้องกันรหัสอนุญาต**: รหัสอายุสั้นที่บังคับใช้การใช้เพียงครั้งเดียว
- **การตรวจสอบตัวตนไคลเอนต์**: การตรวจสอบข้อมูลประจำตัวและเมตาดาต้าไคลเอนต์อย่างเข้มงวด

## 6. **ความปลอดภัยการรันเครื่องมือ**

### **การแยกและแซนด์บ็อกซ์**

**การแยกด้วยคอนเทนเนอร์:**
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

**การแยกกระบวนการ:**
- **บริบทกระบวนการแยกเฉพาะ**: การรันแต่ละเครื่องมือภายใต้บริบทกระบวนการแยก
- **การสื่อสารระหว่างกระบวนการ**: กลไก IPC ที่ปลอดภัยพร้อมการตรวจสอบความถูกต้อง
- **การติดตามกระบวนการ**: การวิเคราะห์พฤติกรรมขณะรันและการตรวจจับความผิดปกติ
- **การบังคับใช้ทรัพยากร**: จำกัดทรัพยากร CPU, หน่วยความจำ และ I/O อย่างเข้มงวด

### **การใช้งานสิทธิ์น้อยที่สุด**

**การจัดการสิทธิ์:**
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

## 7. **การควบคุมความปลอดภัยโซ่อุปทาน**

**ความเสี่ยง OWASP MCP ที่ถูกจัดการ**: [MCP04 - การโจมตีโซ่อุปทานซอฟต์แวร์ & การดัดแปลง dependency](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **การตรวจสอบความถูกต้องของ dependency**

**ความปลอดภัยองค์ประกอบครบถ้วน:**
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

### **การตรวจสอบอย่างต่อเนื่อง**

**การตรวจจับภัยคุกคามโซ่อุปทาน:**
- **ตรวจสอบสุขภาพ dependency**: การประเมินความปลอดภัย dependency ทั้งหมดอย่างต่อเนื่อง
- **ผสานรวมข่าวกรองภัยคุกคาม**: อัปเดตแบบเรียลไทม์เกี่ยวกับภัยคุกคามโซ่อุปทานที่เกิดขึ้นใหม่
- **วิเคราะห์พฤติกรรม**: ตรวจจับพฤติกรรมที่ผิดปกติในองค์ประกอบภายนอก
- **การตอบสนองอัตโนมัติ**: กักกันองค์ประกอบที่ถูกเจาะทันที

## 8. **การตรวจสอบและการตรวจจับ**

**ความเสี่ยง OWASP MCP ที่ถูกจัดการ**: [MCP08 - ขาดการตรวจสอบและการเก็บข้อมูล Telemetry](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **ระบบบริหารจัดการข้อมูลความปลอดภัยและเหตุการณ์ (SIEM)**

**ยุทธศาสตร์การบันทึกอย่างครบถ้วน:**
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

### **การตรวจจับภัยคุกคามแบบเรียลไทม์**

**การวิเคราะห์พฤติกรรม:**
- **การวิเคราะห์พฤติกรรมผู้ใช้ (UBA)**: ตรวจจับรูปแบบการเข้าถึงผู้ใช้ที่ผิดปกติ
- **การวิเคราะห์พฤติกรรมเอนทิตี้ (EBA)**: ติดตามพฤติกรรมเซิร์ฟเวอร์ MCP และเครื่องมือ
- **การตรวจจับความผิดปกติด้วยแมชชีนเลิร์นนิง**: การตรวจจับภัยคุกคามด้วย AI
- **การจับคู่ข่าวกรองภัยคุกคาม**: เปรียบเทียบกิจกรรมที่สังเกตกับรูปแบบการโจมตีที่รู้จัก

## 9. **การตอบสนองเหตุการณ์ & การฟื้นฟู**

### **ความสามารถในการตอบสนองอัตโนมัติ**

**การตอบสนองทันที:**
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

### **ความสามารถการตรวจพิสูจน์**

**การสนับสนุนการสืบสวน:**
- **การเก็บรักษาบันทึกตรวจสอบ**: การบันทึกที่ไม่สามารถแก้ไขได้พร้อมความสมบูรณ์ด้วยคริปโตกราฟี
- **การเก็บรวบรวมหลักฐาน**: การเก็บข้อมูลความปลอดภัยที่เกี่ยวข้องโดยอัตโนมัติ
- **การสร้างไทม์ไลน์เหตุการณ์**: ลำดับเหตุการณ์โดยละเอียดที่นำไปสู่เหตุการณ์ความปลอดภัย
- **การประเมินผลกระทบ**: การประเมินขอบเขตการถูกเจาะและการเปิดเผยข้อมูล

## **หลักการสำคัญของสถาปัตยกรรมความปลอดภัย**

### **การป้องกันเชิงลึก**
- **ชั้นความปลอดภัยหลายชั้น**: ไม่มีจุดล้มเหลวเดียวในสถาปัตยกรรมความปลอดภัย
- **ควบคุมซ้ำซ้อน**: มาตรการความปลอดภัยซ้อนทับในฟังก์ชันที่สำคัญ
- **กลไกค่าเริ่มต้นปลอดภัย**: ค่าเริ่มต้นที่ปลอดภัยเมื่อระบบพบข้อผิดพลาดหรือการโจมตี

### **การดำเนินการแบบ Zero Trust**
- **ไม่เคยไว้ใจ ตรวจสอบตลอดเวลา**: การตรวจสอบความถูกต้องของทุกเอนทิตี้และคำขออย่างต่อเนื่อง
- **หลักการสิทธิน้อยที่สุด**: สิทธิ์เข้าถึงขั้นต่ำสำหรับองค์ประกอบทั้งหมด
- **ไมโครเซกเมนเตชัน**: การควบคุมเครือข่ายและการเข้าถึงแบบละเอียด

### **วิวัฒนาการความปลอดภัยอย่างต่อเนื่อง**
- **ปรับตัวกับภูมิทัศน์ภัยคุกคาม**: อัปเดตอย่างสม่ำเสมอเพื่อตอบสนองภัยคุกคามใหม่
- **ประสิทธิผลของการควบคุมความปลอดภัย**: การประเมินและปรับปรุงอย่างต่อเนื่อง
- **ความสอดคล้องกับข้อกำหนด**: สอดคล้องกับมาตรฐานความปลอดภัย MCP ที่พัฒนาอย่างต่อเนื่อง

---

## **ทรัพยากรสำหรับการใช้งาน**

### **เอกสารทางการของ MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **ทรัพยากรความปลอดภัย OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 แบบครบถ้วนพร้อมการใช้งานบน Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - ความเสี่ยงความปลอดภัย OWASP MCP อย่างเป็นทางการ
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - การฝึกอบรมความปลอดภัยเชิงปฏิบัติสำหรับ MCP บน Azure

### **โซลูชันความปลอดภัยของ Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **มาตรฐานความปลอดภัย**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **สำคัญ**: มาตรการควบคุมความปลอดภัยเหล่านี้สะท้อนข้อกำหนด MCP ปัจจุบัน (2025-11-25) โปรดตรวจสอบกับ [เอกสารทางการล่าสุด](https://spec.modelcontextprotocol.io/) เนื่องจากมาตรฐานมีการเปลี่ยนแปลงอย่างรวดเร็ว

## ขั้นตอนถัดไป

- กลับไปที่: [ภาพรวมโมดูลความปลอดภัย](./README.md)
- ต่อไปที่: [โมดูล 3: เริ่มต้นใช้งาน](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->