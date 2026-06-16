# Kontrol Keamanan MCP - Pembaruan Februari 2026

> **Standar Saat Ini**: Dokumen ini mencerminkan [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) persyaratan keamanan dan [Praktik Terbaik Keamanan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) resmi.

Model Context Protocol (MCP) telah berkembang pesat dengan kontrol keamanan yang lebih baik yang menangani baik keamanan perangkat lunak tradisional maupun ancaman khusus AI. Dokumen ini menyediakan kontrol keamanan komprehensif untuk implementasi MCP yang aman sesuai dengan kerangka kerja OWASP MCP Top 10.

## 🏔️ Pelatihan Keamanan Praktis

Untuk pengalaman implementasi keamanan secara praktis, kami merekomendasikan **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - sebuah ekspedisi terpandu komprehensif untuk mengamankan server MCP di Azure menggunakan metodologi "rentan → eksploitasi → perbaikan → validasi".

Semua kontrol keamanan dalam dokumen ini selaras dengan **[Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)**, yang menyediakan arsitektur referensi dan panduan implementasi spesifik Azure untuk risiko OWASP MCP Top 10.

## **Persyaratan Keamanan WAJIB**

### **Larangan Kritis dari Spesifikasi MCP:**

> **TERLARANG**: Server MCP **TIDAK BOLEH** menerima token apapun yang tidak secara eksplisit diterbitkan untuk server MCP  
>
> **DILARANG**: Server MCP **TIDAK BOLEH** menggunakan sesi untuk autentikasi  
>
> **WAJIB**: Server MCP yang mengimplementasikan otorisasi **HARUS** memverifikasi SEMUA permintaan masuk  
>
> **WAJIB**: Server proxy MCP yang menggunakan ID klien statis **HARUS** memperoleh persetujuan pengguna untuk setiap klien yang terdaftar secara dinamis

---

## 1. **Kontrol Autentikasi & Otorisasi**

### **Integrasi Penyedia Identitas Eksternal**

**Standar MCP Saat Ini (2025-11-25)** memungkinkan server MCP mendelegasikan autentikasi ke penyedia identitas eksternal, yang merupakan peningkatan keamanan yang signifikan:

**Risiko OWASP MCP Ditangani**: [MCP07 - Autentikasi & Otorisasi Tidak Memadai](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Manfaat Keamanan:**
1. **Menghilangkan Risiko Autentikasi Kustom**: Mengurangi permukaan kerentanan dengan menghindari implementasi autentikasi kustom
2. **Keamanan Tingkat Perusahaan**: Memanfaatkan penyedia identitas mapan seperti Microsoft Entra ID dengan fitur keamanan canggih
3. **Manajemen Identitas Terpusat**: Memudahkan manajemen siklus hidup pengguna, kontrol akses, dan audit kepatuhan
4. **Multi-Factor Authentication**: Mewarisi kemampuan MFA dari penyedia identitas perusahaan
5. **Kebijakan Akses Bersyarat**: Mendapat manfaat dari kontrol akses berbasis risiko dan autentikasi adaptif

**Persyaratan Implementasi:**
- **Validasi Audiens Token**: Verifikasi semua token secara eksplisit diterbitkan untuk server MCP
- **Verifikasi Penerbit**: Validasi penerbit token sesuai penyedia identitas yang diharapkan
- **Verifikasi Tanda Tangan**: Validasi kriptografi integritas token
- **Penegakan Masa Berlaku**: Penegakan ketat batas waktu masa berlaku token
- **Validasi Lingkup**: Pastikan token mengandung izin yang sesuai untuk operasi yang diminta

### **Keamanan Logika Otorisasi**

**Kontrol Kritis:**
- **Audit Otorisasi Komprehensif**: Tinjauan keamanan berkala pada semua titik pengambilan keputusan otorisasi
- **Default Fail-Safe**: Tolak akses ketika logika otorisasi tidak dapat membuat keputusan pasti
- **Batasan Izin**: Pemisahan jelas antara tingkat hak istimewa dan akses sumber daya yang berbeda
- **Logging Audit**: Pencatatan lengkap semua keputusan otorisasi untuk pemantauan keamanan
- **Tinjauan Akses Berkala**: Validasi berkala atas izin pengguna dan penugasan hak istimewa

## 2. **Keamanan Token & Kontrol Anti-Passthrough**

**Risiko OWASP MCP Ditangani**: [MCP01 - Mismanajemen Token & Eksposur Rahasia](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Pencegahan Token Passthrough**

**Token passthrough secara eksplisit dilarang** dalam Spesifikasi Otorisasi MCP karena risiko keamanan kritis:

**Risiko Keamanan yang Ditangani:**
- **Penghindaran Kontrol**: Melewati kontrol keamanan penting seperti pembatasan laju, validasi permintaan, dan pemantauan lalu lintas
- **Kegagalan Akuntabilitas**: Membuat identifikasi klien tidak mungkin, merusak jejak audit dan investigasi insiden
- **Eksfiltrasi Berbasis Proxy**: Memungkinkan pelaku jahat menggunakan server sebagai proxy untuk akses data yang tidak sah
- **Pelanggaran Batas Kepercayaan**: Merusak asumsi kepercayaan layanan hilir mengenai asal token
- **Gerakan Lateral**: Token yang dikompromikan di beberapa layanan memungkinkan perluasan serangan yang lebih luas

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

### **Pola Manajemen Token Aman**

**Praktik Terbaik:**
- **Token Masa Hidup Pendek**: Minimalkan jendela paparan dengan rotasi token yang sering
- **Penerbitan Tepat Waktu**: Terbitkan token hanya saat diperlukan untuk operasi spesifik
- **Penyimpanan Aman**: Gunakan modul keamanan perangkat keras (HSM) atau brankas kunci yang aman
- **Pengikatan Token**: Ikat token ke klien, sesi, atau operasi tertentu bila memungkinkan
- **Pemantauan & Peringatan**: Deteksi waktu nyata penyalahgunaan token atau pola akses tidak sah

## 3. **Kontrol Keamanan Sesi**

### **Pencegahan Pembajakan Sesi**

**Vektor Serangan yang Ditangani:**
- **Injeksi Prompt Pembajakan Sesi**: Peristiwa jahat disuntikkan ke status sesi bersama
- **Peniruan Sesi**: Penggunaan tidak sah ID sesi curian untuk melewati autentikasi
- **Serangan Aliran Dapat Dilanjutkan**: Eksploitasi kelanjutan event server-sent untuk injeksi konten jahat

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
- **Penegakan HTTPS**: Semua komunikasi sesi menggunakan TLS 1.3
- **Atribut Cookie Aman**: HttpOnly, Secure, SameSite=Strict
- **Pemasangan Sertifikat**: Untuk koneksi kritis guna mencegah serangan MITM

### **Pertimbangan Stateful vs Stateless**

**Untuk Implementasi Stateful:**
- Status sesi bersama memerlukan perlindungan tambahan terhadap serangan injeksi
- Manajemen sesi berbasis antrean perlu verifikasi integritas
- Beberapa instance server memerlukan sinkronisasi status sesi yang aman

**Untuk Implementasi Stateless:**
- Manajemen sesi berbasis token JWT atau sejenisnya
- Verifikasi kriptografi integritas status sesi
- Permukaan serangan berkurang namun memerlukan validasi token yang kuat

## 4. **Kontrol Keamanan Khusus AI**

**Risiko OWASP MCP Ditangani**:
- [MCP06 - Subversi Aliran Intent](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Keracunan Alat](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Injeksi & Eksekusi Perintah](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Pertahanan Injeksi Prompt**

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
- **Pemantauan Output**: Deteksi keluaran yang berpotensi berbahaya atau termanipulasi

### **Pencegahan Keracunan Alat**

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
- **Alur Persetujuan**: Persetujuan pengguna eksplisit untuk modifikasi alat
- **Kemampuan Rollback**: Kemampuan mengembalikan versi alat sebelumnya
- **Audit Perubahan**: Riwayat lengkap modifikasi definisi alat
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
- **Verifikasi Persetujuan Pengguna**: Jangan pernah melewati layar persetujuan untuk pendaftaran klien dinamis
- **Validasi URI Redirect**: Validasi ketat whitelist tujuan pengalihan
- **Perlindungan Kode Otorisasi**: Kode berumur pendek dengan penegakan pemakaian tunggal
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
- **Komunikasi Antar Proses**: Mekanisme IPC aman dengan validasi
- **Pemantauan Proses**: Analisis perilaku waktu jalan dan deteksi anomali
- **Penegakan Sumber Daya**: Batas keras pada CPU, memori, dan operasi I/O

### **Implementasi Hak Istimewa Minimum**

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

**Risiko OWASP MCP Ditangani**: [MCP04 - Serangan Rantai Pasokan Perangkat Lunak & Perubahan Ketergantungan](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

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
- **Pemantauan Kesehatan Ketergantungan**: Penilaian berkelanjutan semua ketergantungan atas isu keamanan
- **Integrasi Intelijen Ancaman**: Pembaruan waktu nyata tentang ancaman rantai pasokan yang muncul
- **Analisis Perilaku**: Deteksi perilaku tidak biasa pada komponen eksternal
- **Respons Otomatis**: Kontainmen segera komponen yang dikompromikan

## 8. **Kontrol Pemantauan & Deteksi**

**Risiko OWASP MCP Ditangani**: [MCP08 - Kurangnya Audit dan Telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Manajemen Informasi dan Peristiwa Keamanan (SIEM)**

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
- **Deteksi Anomali Berbasis Pembelajaran Mesin**: Identifikasi ancaman keamanan berbasis AI
- **Korelasi Intelijen Ancaman**: Pencocokan aktivitas teramati dengan pola serangan dikenal

## 9. **Tanggap Insiden & Pemulihan**

### **Kemampuan Respons Otomatis**

**Tindakan Respons Segera:**
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
- **Pelestarian Jejak Audit**: Logging tak dapat diubah dengan integritas kriptografi
- **Pengumpulan Bukti**: Pengumpulan otomatis artefak keamanan relevan
- **Rekonstruksi Garis Waktu**: Urutan detail peristiwa yang mengarah ke insiden keamanan
- **Penilaian Dampak**: Evaluasi cakupan kompromi dan eksposur data

## **Prinsip Arsitektur Keamanan Utama**

### **Defense in Depth**
- **Lapisan Keamanan Berlapis**: Tidak ada titik kegagalan tunggal dalam arsitektur keamanan
- **Kontrol Redundan**: Langkah keamanan tumpang tindih untuk fungsi kritis
- **Mekanisme Fail-Safe**: Default aman saat sistem menghadapi kesalahan atau serangan

### **Implementasi Zero Trust**
- **Jangan Pernah Percaya, Selalu Verifikasi**: Validasi terus-menerus semua entitas dan permintaan
- **Prinsip Hak Istimewa Minimum**: Hak akses minimal untuk semua komponen
- **Mikro-Segmentasi**: Kontrol jaringan dan akses yang terperinci

### **Evolusi Keamanan Berkelanjutan**
- **Adaptasi Lanskap Ancaman**: Pembaruan reguler untuk mengatasi ancaman yang muncul
- **Efektivitas Kontrol Keamanan**: Evaluasi dan peningkatan berkelanjutan kontrol
- **Kepatuhan Spesifikasi**: Selaras dengan standar keamanan MCP yang terus berkembang

---

## **Sumber Daya Implementasi**

### **Dokumentasi Resmi MCP**
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Praktik Terbaik Keamanan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Otorisasi MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Sumber Daya Keamanan OWASP MCP**
- [Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 komprehensif dengan implementasi Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keamanan MCP resmi OWASP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Pelatihan keamanan praktis untuk MCP di Azure

### **Solusi Keamanan Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Standar Keamanan**
- [Praktik Terbaik Keamanan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 untuk Large Language Models](https://genai.owasp.org/)
- [Kerangka Kerja Keamanan Siber NIST](https://www.nist.gov/cyberframework)

---

> **Penting**: Kontrol keamanan ini mencerminkan spesifikasi MCP terkini (2025-11-25). Selalu verifikasi dengan [dokumentasi resmi](https://spec.modelcontextprotocol.io/) terbaru karena standar terus berkembang dengan cepat.

## Selanjutnya

- Kembali ke: [Ikhtisar Modul Keamanan](./README.md)
- Lanjutkan ke: [Modul 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->