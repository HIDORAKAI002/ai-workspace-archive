# Kawalan Keselamatan MCP - Kemas Kini Februari 2026

> **Standard Semasa**: Dokumen ini mencerminkan keperluan keselamatan [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) dan [Amalan Terbaik Keselamatan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) rasmi.

Model Context Protocol (MCP) telah matang dengan ketara dengan kawalan keselamatan yang dipertingkatkan yang menangani keselamatan perisian tradisional dan ancaman khusus AI. Dokumen ini menyediakan kawalan keselamatan yang komprehensif untuk pelaksanaan MCP yang selamat sejajar dengan rangka kerja OWASP MCP Top 10.

## 🏔️ Latihan Keselamatan Praktikal

Untuk pengalaman pelaksanaan keselamatan praktikal, kami mengesyorkan **[Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - ekspedisi berpandu komprehensif untuk mengamankan pelayan MCP di Azure menggunakan metodologi "terdedah → eksploit → baiki → sahkan".

Semua kawalan keselamatan dalam dokumen ini selaras dengan **[Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, yang menyediakan seni bina rujukan dan panduan pelaksanaan khusus Azure untuk risiko OWASP MCP Top 10.

## **Keperluan Keselamatan WAJIB**

### **Larangan Kritikal dari Spesifikasi MCP:**

> **DILARANG**: Pelayan MCP **TIDAK BOLEH** menerima sebarang token yang tidak secara eksplisit dikeluarkan untuk pelayan MCP  
>
> **DILARANG**: Pelayan MCP **TIDAK BOLEH** menggunakan sesi untuk pengesahan  
>
> **DIKEHENDAKI**: Pelayan MCP yang melaksanakan kebenaran **MESTI** mengesahkan SEMUA permintaan masuk  
>
> **WAJIB**: Pelayan proksi MCP yang menggunakan ID klien statik **MESTI** mendapatkan persetujuan pengguna untuk setiap klien yang didaftarkan secara dinamik

---

## 1. **Kawalan Pengesahan & Kebenaran**

### **Integrasi Penyedia Identiti Luaran**

**Standard MCP Semasa (2025-11-25)** membenarkan pelayan MCP mendelegasikan pengesahan kepada penyedia identiti luaran, yang merupakan peningkatan keselamatan yang ketara:

**Risiko OWASP MCP Ditangani**: [MCP07 - Pengesahan & Kebenaran Tidak Mencukupi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Manfaat Keselamatan:**
1. **Menghapuskan Risiko Pengesahan Tersuai**: Mengurangkan permukaan kerapuhan dengan mengelakkan pelaksanaan pengesahan tersuai
2. **Keselamatan Gred Perusahaan**: Memanfaatkan penyedia identiti yang mantap seperti Microsoft Entra ID dengan ciri keselamatan lanjutan
3. **Pengurusan Identiti Berpusat**: Mempermudah pengurusan kitaran hidup pengguna, kawalan akses, dan pengauditan pematuhan
4. **Pengesahan Pelbagai Faktor**: Memperoleh keupayaan MFA daripada penyedia identiti perusahaan
5. **Dasar Akses Bersyarat**: Manfaat daripada kawalan akses berasaskan risiko dan pengesahan adaptif

**Keperluan Pelaksanaan:**
- **Pengesahan Audiens Token**: Sahkan semua token secara eksplisit dikeluarkan untuk pelayan MCP
- **Pengesahan Penerbit**: Sahkan penerbit token adalah penyedia identiti yang dijangka
- **Pengesahan Tandatangan**: Pengesahan kriptografi integriti token
- **Penguatkuasaan Tamat Tempoh**: Penguatkuasaan ketat had hayat token
- **Pengesahan Skop**: Pastikan token mengandungi kebenaran yang sesuai untuk operasi yang diminta

### **Keselamatan Logik Kebenaran**

**Kawalan Kritikal:**
- **Pengauditan Kebenaran Menyeluruh**: Kajian keselamatan berkala ke atas semua titik keputusan kebenaran
- **Default Fail-Safe**: Tolak akses apabila logik kebenaran tidak dapat membuat keputusan muktamad
- **Sempadan Kebenaran**: Pemisahan jelas antara tahap keistimewaan dan akses sumber yang berbeza
- **Pelogaan Pengauditan**: Pelogaan lengkap semua keputusan kebenaran untuk pemantauan keselamatan
- **Kajian Akses Berkala**: Pengesahan berkala ke atas kebenaran pengguna dan penugasan keistimewaan

## 2. **Keselamatan Token & Kawalan Anti-Passthrough**

**Risiko OWASP MCP Ditangani**: [MCP01 - Pengurusan Token & Pendedahan Rahsia Tidak Betul](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Pencegahan Token Passthrough**

**Token passthrough secara eksplisit dilarang** dalam Spesifikasi Kebenaran MCP kerana risiko keselamatan kritikal:

**Risiko Keselamatan Ditangani:**
- **Pengelakan Kawalan**: Melangkaui kawalan keselamatan penting seperti had kadar, pengesahan permintaan, dan pemantauan trafik
- **Kegagalan Akauntabiliti**: Menjadikan pengenalan klien mustahil, merosakkan jejak audit dan siasatan insiden
- **Eksfiltrasi Berasaskan Proksi**: Membolehkan pelaku jahat menggunakan pelayan sebagai proksi untuk akses data tanpa kebenaran
- **Pelanggaran Sempadan Kepercayaan**: Memecahkan andaian kepercayaan perkhidmatan hiliran tentang asal token
- **Pergerakan Lateral**: Token yang dikompromi di pelbagai perkhidmatan membenarkan pengembangan serangan lebih luas

**Kawalan Pelaksanaan:**
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

### **Corak Pengurusan Token Selamat**

**Amalan Terbaik:**
- **Token Berumur Pendek**: Meminimumkan pendedahan dengan kitaran token kerap
- **Pengeluaran Just-in-Time**: Keluaran token hanya apabila perlu untuk operasi tertentu
- **Penyimpanan Selamat**: Gunakan modul keselamatan perkakasan (HSM) atau peti kunci selamat
- **Pengikatan Token**: Mengikat token kepada klien, sesi, atau operasi tertentu apabila boleh
- **Pemantauan & Amaran**: Pengesanan masa nyata penyalahgunaan token atau corak akses tanpa kebenaran

## 3. **Kawalan Keselamatan Sesi**

### **Pencegahan Pengambilalihan Sesi**

**Vector Serangan Ditangani:**
- **Suntikan Arahan Serangan Pengambilalihan Sesi**: Acara jahat disuntik ke dalam keadaan sesi yang dikongsi
- **Pemalsuan Sesi**: Penggunaan tanpa kebenaran ID sesi yang dicuri untuk mengelak pengesahan
- **Serangan Sambungan Semula Aliran**: Eksploitasi penyambungan semula acara dihantar pelayan untuk suntikan kandungan jahat

**Kawalan Sesi Wajib:**
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

**Keselamatan Pengangkutan:**
- **Penguatkuasaan HTTPS**: Semua komunikasi sesi melalui TLS 1.3
- **Atribut Kukis Selamat**: HttpOnly, Secure, SameSite=Strict
- **Penjajaran Sijil**: Untuk sambungan kritikal bagi mengelak serangan MITM

### **Pertimbangan Stateful vs Stateless**

**Untuk Pelaksanaan Stateful:**
- Keadaan sesi yang dikongsi memerlukan perlindungan tambahan terhadap serangan suntikan
- Pengurusan sesi berasaskan barisan memerlukan pengesahan integriti
- Beberapa contoh pelayan memerlukan penyelarasan keadaan sesi yang selamat

**Untuk Pelaksanaan Stateless:**
- Pengurusan sesi berasaskan token seperti JWT
- Pengesahan kriptografi integriti keadaan sesi
- Permukaan serangan dikurangkan tetapi memerlukan pengesahan token yang kukuh

## 4. **Kawalan Keselamatan Khusus AI**

**Risiko OWASP MCP Ditangani**:
- [MCP06 - Suntikan Arahan melalui Payload Kontekstual](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Racun Alat](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Suntikan & Pelaksanaan Perintah](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Pertahanan Suntikan Arahan**

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

**Kawalan Pelaksanaan:**
- **Penyaringan Input**: Pengesahan menyeluruh dan penapisan semua input pengguna
- **Definisi Sempadan Kandungan**: Pemisahan jelas antara arahan sistem dan kandungan pengguna
- **Hierarki Arahan**: Peraturan keutamaan yang betul untuk arahan yang bertentangan
- **Pemantauan Output**: Pengesanan keluaran yang berpotensi berbahaya atau dimanipulasi

### **Pencegahan Racun Alat**

**Rangka Kerja Keselamatan Alat:**
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

**Pengurusan Alat Dinamik:**
- **Aliran Kerja Kelulusan**: Persetujuan pengguna secara eksplisit untuk pengubahsuaian alat
- **Keupayaan Rollback**: Kebolehan kembali kepada versi alat sebelumnya
- **Pengauditan Perubahan**: Sejarah lengkap pengubahsuaian definisi alat
- **Penilaian Risiko**: Penilaian automatik terhadap kedudukan keselamatan alat

## 5. **Pencegahan Serangan Confused Deputy**

### **Keselamatan Proksi OAuth**

**Kawalan Pencegahan Serangan:**
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

**Keperluan Pelaksanaan:**
- **Pengesahan Persetujuan Pengguna**: Jangan sekali-kali melepasi skrin persetujuan untuk pendaftaran klien dinamik
- **Pengesahan URI Redirect**: Pengesahan whitelist ketat destinasi redirect
- **Perlindungan Kod Kebenaran**: Kod jangka pendek dengan penguatkuasaan guna satu kali
- **Pengesahan Identiti Klien**: Pengesahan kukuh kelayakan klien dan metadata

## 6. **Keselamatan Pelaksanaan Alat**

### **Sandboxing & Pengasingan**

**Pengasingan Berasaskan Kontena:**
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

**Pengasingan Proses:**
- **Konteks Proses Berasingan**: Setiap pelaksanaan alat dalam ruang proses yang diasingkan
- **Komunikasi Antara Proses**: Mekanisme IPC selamat dengan pengesahan
- **Pemantauan Proses**: Analisis tingkah laku semasa dan pengesanan anomali
- **Penguatkuasaan Sumber**: Had ketat pada CPU, memori, dan operasi I/O

### **Pelaksanaan Keistimewaan Minimum**

**Pengurusan Kebenaran:**
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

## 7. **Kawalan Keselamatan Rantaian Bekalan**

**Risiko OWASP MCP Ditangani**: [MCP04 - Serangan Rantaian Bekalan](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Pengesahan Kebergantungan**

**Keselamatan Komponen Menyeluruh:**
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

### **Pemantauan Berterusan**

**Pengesanan Ancaman Rantaian Bekalan:**
- **Pemantauan Kesihatan Kebergantungan**: Penilaian berterusan semua kebergantungan untuk isu keselamatan
- **Integrasi Perisikan Ancaman**: Kemas kini masa nyata tentang ancaman rantaian bekalan yang muncul
- **Analisis Tingkah Laku**: Pengesanan tingkah laku luar biasa dalam komponen luaran
- **Tindak Balas Automatik**: Pengandungan segera komponen yang dikompromi

## 8. **Kawalan Pemantauan & Pengesanan**

**Risiko OWASP MCP Ditangani**: [MCP08 - Kekurangan Audit & Telemetri](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Pengurusan Maklumat Keselamatan dan Peristiwa (SIEM)**

**Strategi Pelogaan Menyeluruh:**
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

### **Pengesanan Ancaman Masa Nyata**

**Analitik Tingkah Laku:**
- **Analitik Tingkah Laku Pengguna (UBA)**: Pengesanan corak akses pengguna yang luar biasa
- **Analitik Tingkah Laku Entiti (EBA)**: Pemantauan tingkah laku pelayan MCP dan alat
- **Pengesanan Anomali Berpandukan Pembelajaran Mesin**: Pengenalpastian ancaman keselamatan berkuasa AI
- **Pencocokan Perisikan Ancaman**: Menyesuaikan aktiviti yang diperhatikan dengan corak serangan diketahui

## 9. **Tindak Balas & Pemulihan Insiden**

### **Keupayaan Tindak Balas Automatik**

**Tindakan Tindak Balas Segera:**
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

### **Keupayaan Forensik**

**Sokongan Siasatan:**
- **Pemeliharaan Jejak Audit**: Pelogaan tidak boleh diubah suai dengan integriti kriptografi
- **Pengumpulan Bukti**: Pengumpulan automatik artifak keselamatan yang berkaitan
- **Pembinaan Semula Garis Masa**: Urutan terperinci peristiwa yang membawa kepada insiden keselamatan
- **Penilaian Impak**: Penilaian skop kompromi dan pendedahan data

## **Prinsip Seni Bina Keselamatan Utama**

### **Pertahanan Berlapis**
- **Pelbagai Lapisan Keselamatan**: Tiada titik kegagalan tunggal dalam seni bina keselamatan
- **Kawalan Berlebihan**: Langkah keselamatan bertindih untuk fungsi kritikal
- **Mekanisme Fail-Safe**: Lalai selamat apabila sistem menghadapi ralat atau serangan

### **Pelaksanaan Zero Trust**
- **Jangan Percaya, Sentiasa Sahkan**: Pengesahan berterusan semua entiti dan permintaan
- **Prinsip Keistimewaan Minimum**: Hak akses minimum untuk semua komponen
- **Segementasi Mikro**: Kawalan rangkaian dan akses yang terperinci

### **Evolusi Keselamatan Berterusan**
- **Penyesuaian Lanskap Ancaman**: Kemas kini berkala untuk menangani ancaman yang muncul
- **Keberkesanan Kawalan Keselamatan**: Penilaian dan penambahbaikan kawalan secara berterusan
- **Pematuhan Spesifikasi**: Penyelarasan dengan piawaian keselamatan MCP yang berkembang

---

## **Sumber Pelaksanaan**

### **Dokumentasi Rasmi MCP**
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Amalan Terbaik Keselamatan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Kebenaran MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Sumber Keselamatan OWASP MCP**
- [Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Keseluruhan OWASP MCP Top 10 dengan pelaksanaan Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keselamatan rasmi OWASP MCP
- [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Latihan keselamatan praktik untuk MCP di Azure

### **Penyelesaian Keselamatan Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Piawaian Keselamatan**
- [Amalan Terbaik Keselamatan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 untuk Model Bahasa Besar](https://genai.owasp.org/)
- [Rangka Kerja Keselamatan Siber NIST](https://www.nist.gov/cyberframework)

---

> **Penting**: Kawalan keselamatan ini mencerminkan spesifikasi MCP semasa (2025-11-25). Sentiasa sahkan dengan [dokumentasi rasmi](https://spec.modelcontextprotocol.io/) terkini kerana piawaian terus berkembang dengan pantas.

## Apa Seterusnya

- Kembali ke: [Gambaran Keseluruhan Modul Keselamatan](./README.md)
- Teruskan ke: [Module 3: Memulakan](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->