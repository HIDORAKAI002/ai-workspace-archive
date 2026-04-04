# Praktik Keamanan Terbaik MCP - Pembaruan Februari 2026

> **Penting**: Dokumen ini mencerminkan persyaratan keamanan terbaru dari [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) dan [Praktik Keamanan Terbaik MCP resmi](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Selalu merujuk pada spesifikasi saat ini untuk panduan paling mutakhir.

## 🏔️ Pelatihan Keamanan Praktis

Untuk pengalaman implementasi praktis, kami merekomendasikan **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - ekspedisi terpandu yang komprehensif untuk mengamankan server MCP di Azure. Workshop ini mencakup semua risiko OWASP MCP Top 10 melalui metodologi "rentan → eksploitasi → perbaikan → validasi".

Semua praktik dalam dokumen ini selaras dengan **[Panduan Keamanan Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** untuk panduan implementasi spesifik Azure.

## Praktik Keamanan Penting untuk Implementasi MCP

Model Context Protocol memperkenalkan tantangan keamanan unik yang melampaui keamanan perangkat lunak tradisional. Praktik ini menangani persyaratan keamanan dasar dan ancaman khusus MCP termasuk injeksi prompt, keracunan alat, pembajakan sesi, masalah deputi bingung, dan kerentanan pengalihan token.

### **Persyaratan Keamanan MANDATORI**

**Persyaratan Kritis dari Spesifikasi MCP:**

### **Persyaratan Keamanan MANDATORI**

**Persyaratan Kritis dari Spesifikasi MCP:**

> **TIDAK BOLEH**: Server MCP **TIDAK BOLEH** menerima token apa pun yang tidak secara eksplisit diterbitkan untuk server MCP  
>  
> **HARUS**: Server MCP yang mengimplementasikan otorisasi **HARUS** memverifikasi SEMUA permintaan masuk  
>  
> **TIDAK BOLEH**: Server MCP **TIDAK BOLEH** menggunakan sesi untuk otentikasi  
>  
> **HARUS**: Server proxy MCP yang menggunakan ID klien statis **HARUS** memperoleh persetujuan pengguna untuk setiap klien yang terdaftar secara dinamis

---

## 1. **Keamanan Token & Otentikasi**

**Kontrol Otentikasi & Otorisasi:**
   - **Tinjauan Otorisasi yang Ketat**: Lakukan audit menyeluruh atas logika otorisasi server MCP untuk memastikan hanya pengguna dan klien yang dimaksud yang dapat mengakses sumber daya  
   - **Integrasi Penyedia Identitas Eksternal**: Gunakan penyedia identitas yang sudah mapan seperti Microsoft Entra ID daripada mengimplementasikan otentikasi kustom  
   - **Validasi Audiens Token**: Selalu verifikasi bahwa token diterbitkan secara eksplisit untuk server MCP Anda - jangan pernah menerima token hilir  
   - **Siklus Hidup Token yang Tepat**: Terapkan rotasi token yang aman, kebijakan kedaluwarsa, dan cegah serangan pemutaran token  

**Penyimpanan Token yang Dilindungi:**
   - Gunakan Azure Key Vault atau penyimpanan kredensial aman serupa untuk semua rahasia  
   - Terapkan enkripsi untuk token saat disimpan dan dalam transit  
   - Rotasi kredensial secara berkala dan pemantauan akses tidak sah  

## 2. **Manajemen Sesi & Keamanan Transportasi**

**Praktik Sesi yang Aman:**
   - **ID Sesi Kriptografi yang Aman**: Gunakan ID sesi yang aman dan nondeterminis yang digenerasi dengan generator angka acak kriptografi  
   - **Pengikatan Khusus Pengguna**: Kaitkan ID sesi dengan identitas pengguna menggunakan format seperti `<user_id>:<session_id>` untuk mencegah penyalahgunaan sesi antar pengguna  
   - **Manajemen Siklus Hidup Sesi**: Terapkan kedaluwarsa, rotasi, dan invalidasi yang tepat untuk membatasi jendela kerentanan  
   - **Penerapan HTTPS/TLS**: HTTPS wajib untuk semua komunikasi guna mencegah penyadapan ID sesi  

**Keamanan Lapisan Transportasi:**
   - Konfigurasikan TLS 1.3 jika memungkinkan dengan manajemen sertifikat yang tepat  
   - Terapkan pinning sertifikat untuk koneksi kritis  
   - Rotasi sertifikat secara berkala dan verifikasi keabsahan  

## 3. **Perlindungan Ancaman Spesifik AI** 🤖

**Pertahanan Injeksi Prompt:**
   - **Perisai Prompt Microsoft**: Gunakan AI Prompt Shields untuk deteksi dan penyaringan lanjutan terhadap instruksi berbahaya  
   - **Sanitasi Input**: Validasi dan sanitasi semua input untuk mencegah serangan injeksi dan masalah deputi bingung  
   - **Batas Konten**: Gunakan sistem pembatas dan penandaan data untuk membedakan instruksi tepercaya dan konten eksternal  

**Pencegahan Keracunan Alat:**
   - **Validasi Metadata Alat**: Terapkan pemeriksaan integritas definisi alat dan pantau perubahan tidak terduga  
   - **Pemantauan Alat Dinamis**: Pantau perilaku runtime dan siapkan peringatan untuk pola eksekusi tidak biasa  
   - **Alur Persetujuan**: Perlu persetujuan eksplisit pengguna untuk modifikasi dan perubahan kemampuan alat  

## 4. **Kontrol Akses & Izin**

**Prinsip Hak Istimewa Minimum:**
   - Berikan server MCP hanya izin minimum yang dibutuhkan untuk fungsi yang dimaksud  
   - Terapkan kontrol akses berbasis peran (RBAC) dengan izin yang terperinci  
   - Tinjauan izin secara rutin dan pemantauan kontinu untuk eskalasi hak istimewa  

**Kontrol Izin Waktu Jalan:**
   - Terapkan batas sumber daya untuk mencegah serangan kelelahan sumber daya  
   - Gunakan isolasi kontainer untuk lingkungan eksekusi alat  
   - Terapkan akses tepat waktu (just-in-time) untuk fungsi administratif  

## 5. **Keamanan Konten & Pemantauan**

**Implementasi Keamanan Konten:**
   - **Integrasi Azure Content Safety**: Gunakan Azure Content Safety untuk mendeteksi konten berbahaya, upaya jailbreak, dan pelanggaran kebijakan  
   - **Analisis Perilaku**: Terapkan pemantauan perilaku runtime untuk mendeteksi anomali dalam eksekusi server MCP dan alat  
   - **Logging Komprehensif**: Catat semua upaya otentikasi, pemanggilan alat, dan kejadian keamanan dengan penyimpanan aman dan tahan rusak  

**Pemantauan Kontinu:**
   - Peringatan real-time untuk pola mencurigakan dan upaya akses tidak sah  
   - Integrasi dengan sistem SIEM untuk manajemen kejadian keamanan terpusat  
   - Audit keamanan rutin dan pengujian penetrasi implementasi MCP  

## 6. **Keamanan Rantai Pasokan**

**Verifikasi Komponen:**
   - **Pemindaian Ketergantungan**: Gunakan pemindaian kerentanan otomatis untuk semua dependensi perangkat lunak dan komponen AI  
   - **Validasi Asal-usul**: Verifikasi asal, lisensi, dan integritas model, sumber data, dan layanan eksternal  
   - **Paket Ber-signed**: Gunakan paket yang ditandatangani kriptografi dan verifikasi tanda tangan sebelum penyebaran  

**Pipeline Pengembangan Aman:**
   - **Keamanan Tingkat Lanjut GitHub**: Terapkan pemindaian rahasia, analisis ketergantungan, dan analisis statis CodeQL  
   - **Keamanan CI/CD**: Integrasikan validasi keamanan sepanjang pipeline penyebaran otomatis  
   - **Integritas Artefak**: Terapkan verifikasi kriptografi untuk artefak dan konfigurasi yang disebarkan  

## 7. **Keamanan OAuth & Pencegahan Deputi Bingung**

**Implementasi OAuth 2.1:**
   - **Implementasi PKCE**: Gunakan Proof Key for Code Exchange (PKCE) untuk semua permintaan otorisasi  
   - **Persetujuan Eksplisit**: Dapatkan persetujuan pengguna untuk setiap klien yang terdaftar secara dinamis untuk mencegah serangan deputi bingung  
   - **Validasi Redirect URI**: Terapkan validasi ketat pada URI pengalihan dan pengenal klien  

**Keamanan Proxy:**
   - Cegah bypass otorisasi melalui eksploitasi ID klien statis  
   - Terapkan alur persetujuan yang tepat untuk akses API pihak ketiga  
   - Pantau pencurian kode otorisasi dan akses API tidak sah  

## 8. **Respons Insiden & Pemulihan**

**Kemampuan Respons Cepat:**
   - **Respons Otomatis**: Terapkan sistem otomatis untuk rotasi kredensial dan penahanan ancaman  
   - **Prosedur Rollback**: Kemampuan untuk dengan cepat mengembalikan konfigurasi dan komponen yang sudah tervalidasi  
   - **Kemampuan Forensik**: Jejak audit dan pencatatan terperinci untuk investigasi insiden  

**Komunikasi & Koordinasi:**
   - Prosedur eskalasi yang jelas untuk insiden keamanan  
   - Integrasi dengan tim respons insiden organisasi  
   - Simulasi insiden keamanan dan latihan meja secara rutin  

## 9. **Kepatuhan & Tata Kelola**

**Kepatuhan Regulasi:**
   - Pastikan implementasi MCP memenuhi persyaratan industri spesifik (GDPR, HIPAA, SOC 2)  
   - Terapkan klasifikasi data dan kontrol privasi untuk pemrosesan data AI  
   - Pertahankan dokumentasi komprehensif untuk audit kepatuhan  

**Manajemen Perubahan:**
   - Proses tinjauan keamanan formal untuk semua modifikasi sistem MCP  
   - Kontrol versi dan alur persetujuan untuk perubahan konfigurasi  
   - Penilaian kepatuhan rutin dan analisis celah  

## 10. **Kontrol Keamanan Lanjutan**

**Arsitektur Zero Trust:**
   - **Jangan Pernah Percaya, Selalu Verifikasi**: Verifikasi berkelanjutan pengguna, perangkat, dan koneksi  
   - **Mikro-segmentasi**: Kontrol jaringan granular yang mengisolasi komponen MCP individual  
   - **Akses Kondisional**: Kontrol akses berbasis risiko yang menyesuaikan dengan konteks dan perilaku saat ini  

**Perlindungan Aplikasi Waktu Jalan:**
   - **Perlindungan Aplikasi Mandiri Waktu Jalan (RASP)**: Terapkan teknik RASP untuk deteksi ancaman real-time  
   - **Pemantauan Kinerja Aplikasi**: Pantau anomali kinerja yang dapat mengindikasikan serangan  
   - **Kebijakan Keamanan Dinamis**: Terapkan kebijakan keamanan yang beradaptasi berdasarkan lanskap ancaman saat ini  

## 11. **Integrasi Ekosistem Keamanan Microsoft**

**Keamanan Microsoft yang Komprehensif:**
   - **Microsoft Defender for Cloud**: Manajemen postur keamanan cloud untuk beban kerja MCP  
   - **Azure Sentinel**: Kemampuan SIEM dan SOAR native cloud untuk deteksi ancaman lanjutan  
   - **Microsoft Purview**: Tata kelola data dan kepatuhan untuk alur kerja AI dan sumber data  

**Manajemen Identitas & Akses:**
   - **Microsoft Entra ID**: Manajemen identitas enterprise dengan kebijakan akses kondisional  
   - **Privileged Identity Management (PIM)**: Akses tepat waktu dan alur persetujuan untuk fungsi administratif  
   - **Proteksi Identitas**: Akses kondisional berbasis risiko dan respons ancaman otomatis  

## 12. **Evolusi Keamanan Berkelanjutan**

**Tetap Mutakhir:**
   - **Pemantauan Spesifikasi**: Tinjauan rutin pembaruan spesifikasi MCP dan perubahan panduan keamanan  
   - **Intelijen Ancaman**: Integrasi umpan ancaman spesifik AI dan indikator kompromi  
   - **Keterlibatan Komunitas Keamanan**: Partisipasi aktif dalam komunitas keamanan MCP dan program pengungkapan kerentanan  

**Keamanan Adaptif:**
   - **Keamanan Pembelajaran Mesin**: Gunakan deteksi anomali berbasis ML untuk mengidentifikasi pola serangan baru  
   - **Analitik Keamanan Prediktif**: Terapkan model prediktif untuk identifikasi ancaman proaktif  
   - **Otomasi Keamanan**: Pembaruan kebijakan keamanan otomatis berdasarkan intelijen ancaman dan perubahan spesifikasi  

---

## **Sumber Daya Keamanan Kritis**

### **Dokumentasi Resmi MCP**
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Praktik Keamanan Terbaik MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Otorisasi MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Sumber Daya Keamanan OWASP MCP**
- [Panduan Keamanan Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 lengkap dengan implementasi Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keamanan MCP resmi OWASP  
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Pelatihan keamanan langsung untuk MCP di Azure  

### **Solusi Keamanan Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Keamanan Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Standar Keamanan**
- [Praktik Keamanan Terbaik OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 untuk Large Language Models](https://genai.owasp.org/)
- [Kerangka Manajemen Risiko AI NIST](https://www.nist.gov/itl/ai-risk-management-framework)

### **Panduan Implementasi**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID dengan Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Pemberitahuan Keamanan**: Praktik keamanan MCP berkembang dengan cepat. Selalu verifikasi dengan [spesifikasi MCP](https://spec.modelcontextprotocol.io/) terbaru dan [dokumentasi keamanan resmi](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) sebelum implementasi.

## Selanjutnya

- Baca: [Kontrol Keamanan MCP 2025](./mcp-security-controls-2025.md)  
- Kembali ke: [Ikhtisar Modul Keamanan](./README.md)  
- Lanjut ke: [Modul 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berusaha untuk memberikan terjemahan yang akurat, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas salah paham atau kesalahan interpretasi yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->