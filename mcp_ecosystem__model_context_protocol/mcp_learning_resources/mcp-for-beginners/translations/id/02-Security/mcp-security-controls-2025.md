# Kontrol Keamanan MCP - Pembaruan Februari 2026

> **Standar Saat Ini**: Dokumen ini mencerminkan persyaratan keamanan [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) dan [Praktik Terbaik Keamanan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) resmi.

Model Context Protocol (MCP) telah berkembang secara signifikan dengan kontrol keamanan yang ditingkatkan untuk mengatasi ancaman keamanan perangkat lunak tradisional dan khusus AI. Dokumen ini menyediakan kontrol keamanan komprehensif untuk implementasi MCP yang aman sesuai kerangka OWASP MCP Top 10.

## 🏔️ Pelatihan Keamanan Praktis

Untuk pengalaman implementasi keamanan secara langsung, kami merekomendasikan **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - ekspedisi terpandu yang komprehensif untuk mengamankan server MCP di Azure menggunakan metodologi "rentan → eksploitasi → perbaikan → validasi".

Semua kontrol keamanan dalam dokumen ini sesuai dengan **[Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)**, yang menyediakan arsitektur referensi dan panduan implementasi khusus Azure untuk risiko OWASP MCP Top 10.

## **Persyaratan Keamanan WAJIB**

### **Larangan Kritis dari Spesifikasi MCP:**

> **TERLARANG**: Server MCP **TIDAK BOLEH** menerima token apa pun yang tidak dikeluarkan secara eksplisit untuk server MCP  
>  
> **DILARANG**: Server MCP **TIDAK BOLEH** menggunakan sesi untuk otentikasi  
>  
> **WAJIB**: Server MCP yang menerapkan otorisasi **HARUS** memverifikasi SEMUA permintaan masuk  
>  
> **WAJIB**: Server proxy MCP yang menggunakan ID klien statis **HARUS** mendapatkan persetujuan pengguna untuk setiap klien yang didaftarkan secara dinamis  

---

## 1. **Kontrol Otentikasi & Otorisasi**

### **Integrasi Penyedia Identitas Eksternal**

**Standar MCP Saat Ini (2025-11-25)** memungkinkan server MCP mendelegasikan otentikasi ke penyedia identitas eksternal, yang merupakan peningkatan keamanan signifikan:

**Risiko OWASP MCP yang Diatasi**: [MCP07 - Otentikasi & Otorisasi Tidak Memadai](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Manfaat Keamanan:**
1. **Menghilangkan Risiko Otentikasi Kustom**: Mengurangi permukaan kerentanan dengan menghindari implementasi otentikasi kustom
2. **Keamanan Tingkat Perusahaan**: Memanfaatkan penyedia identitas yang sudah mapan seperti Microsoft Entra ID dengan fitur keamanan canggih
3. **Manajemen Identitas Terpusat**: Mempermudah manajemen siklus hidup pengguna, kontrol akses, dan audit kepatuhan
4. **Autentikasi Multi-Faktor**: Mewarisi kemampuan MFA dari penyedia identitas perusahaan
5. **Kebijakan Akses Kondisional**: Mendapat manfaat dari kontrol akses berbasis risiko dan autentikasi adaptif

**Persyaratan Implementasi:**
- **Validasi Audiens Token**: Verifikasi semua token dikeluarkan secara eksplisit untuk server MCP
- **Verifikasi Issuer**: Validasi penerbit token sesuai penyedia identitas yang diharapkan
- **Verifikasi Tanda Tangan**: Validasi kriptografi integritas token
- **Penegakan Kedaluwarsa**: Penegakan ketat batas waktu berlaku token
- **Validasi Scope**: Pastikan token memiliki izin yang sesuai untuk operasi yang diminta

### **Keamanan Logika Otorisasi**

**Kontrol Kritis:**
- **Audit Otorisasi Menyeluruh**: Tinjauan keamanan rutin terhadap semua titik keputusan otorisasi
- **Default Fail-Safe**: Tolak akses ketika logika otorisasi tidak dapat membuat keputusan pasti
- **Batasan Izin**: Pemisahan jelas antar tingkat hak istimewa dan akses sumber daya
- **Pencatatan Audit**: Logging lengkap dari semua keputusan otorisasi untuk pemantauan keamanan
- **Tinjauan Akses Berkala**: Validasi berkala terhadap izin pengguna dan penetapan hak istimewa

## 2. **Keamanan Token & Kontrol Anti-Passthrough**

**Risiko OWASP MCP yang Diatasi**: [MCP01 - Salah Kelola Token & Paparan Rahasia](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Pencegahan Token Passthrough**

**Token passthrough secara eksplisit dilarang** dalam Spesifikasi Otorisasi MCP karena risiko keamanan kritis:

**Risiko Keamanan yang Diatasi:**
- **Pengelakan Kontrol**: Membypass kontrol keamanan penting seperti pembatasan kecepatan, validasi permintaan, dan pemantauan lalu lintas
- **Patahkan Akuntabilitas**: Membuat identifikasi klien tidak mungkin, merusak jejak audit dan investigasi insiden
- **Eksfiltrasi Berbasis Proxy**: Memungkinkan aktor jahat menggunakan server sebagai proxy untuk akses data tak sah
- **Pelanggaran Batas Kepercayaan**: Mematahkan asumsi kepercayaan layanan hilir tentang asal token
- **Gerakan Lateral**: Token yang dikompromikan di banyak layanan memungkinkan perluasan serangan

**Kontrol Implementasi:**
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

### **Pola Manajemen Token yang Aman**

**Praktik Terbaik:**
- **Token Berumur Singkat**: Meminimalkan jendela paparan dengan perputaran token yang sering
- **Penerbitan Just-in-Time**: Menerbitkan token hanya saat dibutuhkan untuk operasi spesifik
- **Penyimpanan Aman**: Gunakan modul keamanan perangkat keras (HSM) atau brankas kunci yang aman
- **Pengikatan Token**: Kaitkan token ke klien, sesi, atau operasi tertentu jika memungkinkan
- **Pemantauan & Peringatan**: Deteksi waktu nyata penyalahgunaan token atau pola akses tidak sah

## 3. **Kontrol Keamanan Sesi**

### **Pencegahan Pembajakan Sesi**

**Vektor Serangan yang Diatasi:**
- **Sesi Hijack Prompt Injection**: Peristiwa berbahaya disuntikkan ke status sesi bersama
- **Impersonasi Sesi**: Penggunaan ID sesi curian tanpa izin untuk melewati otentikasi
- **Serangan Lanjutan Stream yang Bisa Dilanjutkan**: Eksploitasi kelanjutan event yang dikirim server untuk injeksi konten berbahaya

**Kontrol Sesi Wajib:**
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

**Keamanan Transportasi:**
- **Penegakan HTTPS**: Semua komunikasi sesi melalui TLS 1.3
- **Atribut Cookie Aman**: HttpOnly, Secure, SameSite=Strict
- **Certificate Pinning**: Untuk koneksi kritis guna mencegah serangan MITM

### **Pertimbangan Stateful vs Stateless**

**Untuk Implementasi Stateful:**
- Status sesi bersama membutuhkan perlindungan ekstra terhadap serangan injeksi
- Manajemen sesi berbasis antrean memerlukan verifikasi integritas
- Banyak instance server memerlukan sinkronisasi status sesi yang aman

**Untuk Implementasi Stateless:**
- Manajemen sesi berbasis token JWT atau serupa
- Verifikasi kriptografi integritas status sesi
- Permukaan serangan lebih kecil tapi memerlukan validasi token yang kuat

## 4. **Kontrol Keamanan Khusus AI**

**Risiko OWASP MCP yang Diatasi**:  
- [MCP06 - Prompt Injection melalui Payload Kontekstual](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Tool Poisoning](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Command Injection & Execution](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Pertahanan Prompt Injection**

**Integrasi Microsoft Prompt Shields:**  
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
  
**Kontrol Implementasi:**
- **Sanitasi Input**: Validasi dan penyaringan komprehensif semua input pengguna
- **Definisi Batas Konten**: Pemisahan jelas antara instruksi sistem dan konten pengguna
- **Hierarki Instruksi**: Aturan prioritas yang tepat untuk instruksi yang bertentangan
- **Pemantauan Output**: Deteksi output yang berpotensi berbahaya atau dimanipulasi

### **Pencegahan Tool Poisoning**

**Kerangka Keamanan Alat:**  
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
  
**Manajemen Alat Dinamis:**
- **Workflow Persetujuan**: Persetujuan eksplisit pengguna untuk modifikasi alat
- **Kemampuan Rollback**: Kemampuan untuk kembali ke versi alat sebelumnya
- **Audit Perubahan**: Riwayat lengkap perubahan definisi alat
- **Penilaian Risiko**: Evaluasi otomatis postur keamanan alat

## 5. **Pencegahan Serangan Confused Deputy**

### **Keamanan Proxy OAuth**

**Kontrol Pencegahan Serangan:**
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
  
**Persyaratan Implementasi:**
- **Verifikasi Persetujuan Pengguna**: Jangan pernah melewati layar persetujuan untuk registrasi klien dinamis
- **Validasi Redirect URI**: Validasi ketat berbasis daftar putih tujuan pengalihan
- **Perlindungan Kode Otorisasi**: Kode berumur pendek dengan penegakan penggunaan tunggal
- **Verifikasi Identitas Klien**: Validasi kuat kredensial dan metadata klien

## 6. **Keamanan Eksekusi Alat**

### **Sandboxing & Isolasi**

**Isolasi Berbasis Kontainer:**  
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
  
**Isolasi Proses:**
- **Konteks Proses Terpisah**: Setiap eksekusi alat dalam ruang proses terisolasi
- **Komunikasi Antar-Proses**: Mekanisme IPC aman dengan validasi
- **Pemantauan Proses**: Analisis perilaku runtime dan deteksi anomali
- **Penegakan Resource**: Batas keras pada CPU, memori, dan operasi I/O

### **Implementasi Hak Istimewa Paling Rendah**

**Manajemen Izin:**  
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
  
## 7. **Kontrol Keamanan Rantai Pasokan**

**Risiko OWASP MCP yang Diatasi**: [MCP04 - Serangan Rantai Pasokan](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verifikasi Ketergantungan**

**Keamanan Komponen Komprehensif:**  
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
  
### **Pemantauan Berkelanjutan**

**Deteksi Ancaman Rantai Pasokan:**
- **Pemantauan Kesehatan Ketergantungan**: Penilaian berkelanjutan semua ketergantungan terhadap masalah keamanan
- **Integrasi Intelijen Ancaman**: Pembaruan waktu nyata tentang ancaman rantai pasokan yang muncul
- **Analisis Perilaku**: Deteksi perilaku tidak biasa pada komponen eksternal
- **Respon Otomatis**: Penahanan segera komponen yang dikompromikan

## 8. **Kontrol Pemantauan & Deteksi**

**Risiko OWASP MCP yang Diatasi**: [MCP08 - Kurangnya Audit & Telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Manajemen Informasi & Kejadian Keamanan (SIEM)**

**Strategi Logging Komprehensif:**  
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
  
### **Deteksi Ancaman Waktu Nyata**

**Analitik Perilaku:**
- **User Behavior Analytics (UBA)**: Deteksi pola akses pengguna yang tidak biasa
- **Entity Behavior Analytics (EBA)**: Pemantauan perilaku server MCP dan alat
- **Deteksi Anomali dengan Pembelajaran Mesin**: Identifikasi ancaman keamanan berbasis AI
- **Korelasi Intelijen Ancaman**: Pencocokan aktivitas yang diamati dengan pola serangan yang diketahui

## 9. **Respons & Pemulihan Insiden**

### **Kemampuan Respon Otomatis**

**Tindakan Respon Langsung:**  
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
  
### **Kemampuan Forensik**

**Dukungan Investigasi:**
- **Pelestarian Jejak Audit**: Logging tidak dapat diubah dengan integritas kriptografi
- **Pengumpulan Bukti**: Pengumpulan otomatis artefak keamanan terkait
- **Rekonstruksi Garis Waktu**: Urutan detail peristiwa yang menyebabkan insiden keamanan
- **Penilaian Dampak**: Evaluasi cakupan kompromi dan paparan data

## **Prinsip Arsitektur Keamanan Utama**

### **Pertahanan Berlapis**
- **Banyak Lapisan Keamanan**: Tidak ada titik kegagalan tunggal dalam arsitektur keamanan
- **Kontrol Redundan**: Langkah keamanan tumpang tindih untuk fungsi kritis
- **Mekanisme Fail-Safe**: Default aman saat sistem menghadapi kesalahan atau serangan

### **Implementasi Zero Trust**
- **Jangan Pernah Percaya, Selalu Verifikasi**: Validasi berkelanjutan semua entitas dan permintaan
- **Prinsip Hak Istimewa Paling Rendah**: Hak akses minimal untuk semua komponen
- **Mikro-Segmentasi**: Kontrol jaringan dan akses granular

### **Evolusi Keamanan Berkelanjutan**
- **Adaptasi Lanskap Ancaman**: Pembaruan rutin untuk mengatasi ancaman yang muncul
- **Efektivitas Kontrol Keamanan**: Evaluasi dan perbaikan berkelanjutan atas kontrol
- **Kepatuhan Spesifikasi**: Penyelarasan dengan standar keamanan MCP yang terus berkembang

---

## **Sumber Daya Implementasi**

### **Dokumentasi MCP Resmi**
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Praktik Terbaik Keamanan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Otorisasi MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Sumber Daya Keamanan OWASP MCP**
- [Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 komprehensif dengan implementasi Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keamanan resmi OWASP MCP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Pelatihan keamanan langsung untuk MCP di Azure

### **Solusi Keamanan Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Standar Keamanan**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 untuk Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Penting**: Kontrol keamanan ini mencerminkan spesifikasi MCP saat ini (2025-11-25). Selalu verifikasi dengan [dokumentasi resmi](https://spec.modelcontextprotocol.io/) terbaru karena standar terus berkembang cepat.

## Apa Selanjutnya

- Kembali ke: [Ikhtisar Modul Keamanan](./README.md)
- Lanjut ke: [Modul 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk memberikan terjemahan yang akurat, harap ketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi yang penting, disarankan menggunakan jasa penerjemah manusia profesional. Kami tidak bertanggung jawab atas kesalahpahaman atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->