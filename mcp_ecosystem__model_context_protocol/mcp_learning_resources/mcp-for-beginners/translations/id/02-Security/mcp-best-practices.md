# MCP Praktik Keamanan Terbaik 2025

Panduan komprehensif ini menguraikan praktik keamanan terbaik yang penting untuk menerapkan sistem Model Context Protocol (MCP) berdasarkan **Spesifikasi MCP 2025-11-25** terbaru dan standar industri saat ini. Praktik ini menangani baik masalah keamanan tradisional maupun ancaman khusus AI yang unik untuk penerapan MCP.

## Persyaratan Keamanan Kritis

### Kontrol Keamanan Wajib (Persyaratan HARUS)

1. **Validasi Token**: Server MCP **TIDAK BOLEH** menerima token yang tidak secara eksplisit diterbitkan untuk server MCP itu sendiri  
2. **Verifikasi Otorisasi**: Server MCP yang menerapkan otorisasi **HARUS** memverifikasi SEMUA permintaan masuk dan **TIDAK BOLEH** menggunakan sesi untuk otentikasi  
3. **Persetujuan Pengguna**: Server proxy MCP yang menggunakan ID klien statis **HARUS** memperoleh persetujuan eksplisit pengguna untuk setiap klien yang terdaftar secara dinamis  
4. **ID Sesi Aman**: Server MCP **HARUS** menggunakan ID sesi yang aman secara kriptografi dan non-deterministik yang dihasilkan dengan generator angka acak yang aman

## Praktik Keamanan Inti

### 1. Validasi & Sanitasi Masukan
- **Validasi Masukan Menyeluruh**: Validasi dan sanitasi semua masukan untuk mencegah serangan injeksi, masalah confused deputy, dan kerentanan injeksi prompt  
- **Penegakan Skema Parameter**: Terapkan validasi skema JSON yang ketat untuk semua parameter alat dan masukan API  
- **Penyaringan Konten**: Gunakan Microsoft Prompt Shields dan Azure Content Safety untuk menyaring konten berbahaya dalam prompt dan respons  
- **Sanitasi Keluaran**: Validasi dan sanitasi semua keluaran model sebelum disajikan kepada pengguna atau sistem hilir

### 2. Keunggulan Otentikasi & Otorisasi  
- **Penyedia Identitas Eksternal**: Delegasikan otentikasi ke penyedia identitas yang mapan (Microsoft Entra ID, penyedia OAuth 2.1) daripada mengimplementasikan otentikasi khusus  
- **Izin Bergranular Halus**: Terapkan izin bergranular halus berbasis alat sesuai prinsip least privilege  
- **Manajemen Siklus Hidup Token**: Gunakan token akses berumur pendek dengan rotasi aman dan validasi audiens yang tepat  
- **Otentikasi Multi-Faktor**: Mewajibkan MFA untuk semua akses administratif dan operasi sensitif

### 3. Protokol Komunikasi Aman
- **Transport Layer Security**: Gunakan HTTPS/TLS 1.3 untuk semua komunikasi MCP dengan validasi sertifikat yang tepat  
- **Enkripsi End-to-End**: Terapkan lapisan enkripsi tambahan untuk data yang sangat sensitif saat transit dan penyimpanan  
- **Manajemen Sertifikat**: Pertahankan manajemen siklus hidup sertifikat dengan proses pembaruan otomatis  
- **Penegakan Versi Protokol**: Gunakan versi protokol MCP saat ini (2025-11-25) dengan negosiasi versi yang tepat.

### 4. Pembatasan Laju & Perlindungan Sumber Daya Tingkat Lanjut
- **Pembatasan Laju Multi-lapis**: Terapkan pembatasan laju pada tingkat pengguna, sesi, alat, dan sumber daya untuk mencegah penyalahgunaan  
- **Pembatasan Laju Adaptif**: Gunakan pembatasan laju berbasis pembelajaran mesin yang menyesuaikan pola penggunaan dan indikator ancaman  
- **Manajemen Kuota Sumber Daya**: Tetapkan batas yang sesuai untuk sumber daya komputasi, penggunaan memori, dan waktu eksekusi  
- **Perlindungan DDoS**: Gunakan sistem perlindungan DDoS dan analisis trafik yang komprehensif

### 5. Logging & Monitoring Komprehensif
- **Logging Audit Terstruktur**: Terapkan log yang rinci dan dapat dicari untuk semua operasi MCP, eksekusi alat, dan peristiwa keamanan  
- **Monitoring Keamanan Waktu Nyata**: Gunakan sistem SIEM dengan deteksi anomali berbasis AI untuk beban kerja MCP  
- **Logging yang Mematuhi Privasi**: Catat peristiwa keamanan sambil menghormati persyaratan dan regulasi privasi data  
- **Integrasi Respon Insiden**: Hubungkan sistem logging ke alur kerja respons insiden otomatis

### 6. Praktik Penyimpanan Aman yang Ditingkatkan
- **Modul Keamanan Perangkat Keras**: Gunakan penyimpanan kunci yang didukung HSM (Azure Key Vault, AWS CloudHSM) untuk operasi kriptografi penting  
- **Manajemen Kunci Enkripsi**: Terapkan rotasi kunci yang tepat, segregasi, dan kontrol akses untuk kunci enkripsi  
- **Manajemen Rahasia**: Simpan semua kunci API, token, dan kredensial dalam sistem manajemen rahasia khusus  
- **Klasifikasi Data**: Klasifikasikan data berdasarkan tingkat sensitivitas dan terapkan langkah perlindungan yang sesuai

### 7. Manajemen Token Lanjutan
- **Pencegahan Token Passthrough**: Larang secara eksplisit pola token passthrough yang melewati kontrol keamanan  
- **Validasi Audiens**: Selalu verifikasi klaim audiens token sesuai identitas server MCP yang dimaksud  
- **Otorisasi Berbasis Klaim**: Terapkan otorisasi bergranular berdasarkan klaim token dan atribut pengguna  
- **Pengikatan Token**: Ikat token ke sesi, pengguna, atau perangkat tertentu bila sesuai

### 8. Manajemen Sesi Aman
- **ID Sesi Kriptografis**: Buat ID sesi menggunakan generator angka acak yang aman secara kriptografi (bukan urutan yang dapat diprediksi)  
- **Pengikatan Spesifik Pengguna**: Ikat ID sesi ke informasi spesifik pengguna menggunakan format aman seperti `<user_id>:<session_id>`  
- **Kontrol Siklus Hidup Sesi**: Terapkan mekanisme kedaluwarsa, rotasi, dan invalidasi sesi yang tepat  
- **Header Keamanan Sesi**: Gunakan header keamanan HTTP yang sesuai untuk perlindungan sesi

### 9. Kontrol Keamanan Khusus AI
- **Pertahanan Injeksi Prompt**: Gunakan Microsoft Prompt Shields dengan teknik spotlighting, delimiter, dan datamarking  
- **Pencegahan Peracunan Alat**: Validasi metadata alat, pantau perubahan dinamis, dan verifikasi integritas alat  
- **Validasi Keluaran Model**: Periksa keluaran model untuk potensi kebocoran data, konten berbahaya, atau pelanggaran kebijakan keamanan  
- **Perlindungan Jendela Konteks**: Terapkan kontrol untuk mencegah peracunan dan manipulasi jendela konteks

### 10. Keamanan Eksekusi Alat
- **Sandboxing Eksekusi**: Jalankan eksekusi alat dalam lingkungan terisolasi dan terkontainerisasi dengan batas sumber daya  
- **Pem-isolasian Hak Istimewa**: Eksekusi alat dengan hak istimewa minimum yang diperlukan dan akun layanan terpisah  
- **Isolasi Jaringan**: Terapkan segmentasi jaringan untuk lingkungan eksekusi alat  
- **Monitoring Eksekusi**: Pantau eksekusi alat untuk perilaku anomali, penggunaan sumber daya, dan pelanggaran keamanan

### 11. Validasi Keamanan Berkelanjutan
- **Pengujian Keamanan Otomatis**: Integrasikan pengujian keamanan ke pipeline CI/CD dengan alat seperti GitHub Advanced Security  
- **Manajemen Kerentanan**: Pindai secara rutin semua dependensi, termasuk model AI dan layanan eksternal  
- **Pengujian Penetrasi**: Lakukan penilaian keamanan reguler yang menargetkan implementasi MCP  
- **Tinjauan Kode Keamanan**: Terapkan tinjauan keamanan wajib untuk semua perubahan kode terkait MCP

### 12. Keamanan Rantai Pasokan untuk AI
- **Verifikasi Komponen**: Verifikasi asal-usul, integritas, dan keamanan semua komponen AI (model, embeddings, API)  
- **Manajemen Dependensi**: Pertahankan inventaris terkini semua dependensi perangkat lunak dan AI dengan pelacakan kerentanan  
- **Repositori Terpercaya**: Gunakan sumber yang terverifikasi dan terpercaya untuk semua model AI, perpustakaan, dan alat  
- **Monitoring Rantai Pasokan**: Pantau terus untuk kompromi pada penyedia layanan AI dan repositori model

## Pola Keamanan Lanjutan

### Arsitektur Zero Trust untuk MCP
- **Jangan Pernah Percaya, Selalu Verifikasi**: Terapkan verifikasi berkelanjutan untuk semua peserta MCP  
- **Mikro-segmentasi**: Isolasi komponen MCP dengan kontrol jaringan dan identitas yang granular  
- **Akses Kondisional**: Terapkan kontrol akses berbasis risiko yang menyesuaikan dengan konteks dan perilaku  
- **Penilaian Risiko Berkelanjutan**: Evaluasi postur keamanan secara dinamis berdasarkan indikator ancaman saat ini

### Implementasi AI yang Melindungi Privasi
- **Minimisasi Data**: Hanya ekspos data yang minimum diperlukan untuk setiap operasi MCP  
- **Privasi Diferensial**: Terapkan teknik pelindung privasi untuk pengolahan data sensitif  
- **Enkripsi Homomorfik**: Gunakan teknik enkripsi canggih untuk komputasi aman pada data terenkripsi  
- **Federated Learning**: Terapkan pendekatan pembelajaran terdistribusi yang menjaga lokalitas dan privasi data

### Respon Insiden untuk Sistem AI
- **Prosedur Insiden Khusus AI**: Kembangkan prosedur respons insiden yang disesuaikan dengan ancaman AI dan MCP  
- **Respon Otomatis**: Terapkan penahanan dan perbaikan otomatis untuk insiden keamanan AI umum  
- **Kemampuan Forensik**: Pertahankan kesiapan forensik untuk kompromi sistem AI dan pelanggaran data  
- **Prosedur Pemulihan**: Tetapkan prosedur untuk pemulihan dari peracunan model AI, serangan injeksi prompt, dan kompromi layanan

## Sumber Daya & Standar Implementasi

### 🏔️ Pelatihan Keamanan Praktis
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop praktis komprehensif untuk mengamankan server MCP di Azure  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Arsitektur referensi dan panduan implementasi OWASP MCP Top 10

### Dokumentasi Resmi MCP
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Spesifikasi protokol MCP saat ini  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Panduan keamanan resmi  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Pola otentikasi dan otorisasi  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Persyaratan keamanan lapis transport

### Solusi Keamanan Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Perlindungan injeksi prompt tingkat lanjut  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Penyaringan konten AI komprehensif  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Manajemen identitas dan akses perusahaan  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Manajemen rahasia dan kredensial yang aman  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Pemindaian keamanan rantai pasokan dan kode

### Standar & Kerangka Kerja Keamanan
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Panduan keamanan OAuth terkini  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Risiko keamanan aplikasi web  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Risiko keamanan khusus AI  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Manajemen risiko AI komprehensif  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Sistem manajemen keamanan informasi

### Panduan & Tutorial Implementasi
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Pola otentikasi perusahaan  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integrasi penyedia identitas  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Praktik terbaik manajemen token  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Pola enkripsi lanjutan

### Sumber Daya Keamanan Lanjutan
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Praktik pengembangan aman  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - Pengujian keamanan khusus AI  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodologi pemodelan ancaman AI  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Teknik AI yang melindungi privasi

### Kepatuhan & Tata Kelola
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Kepatuhan privasi dalam sistem AI  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Implementasi AI yang bertanggung jawab  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Kontrol keamanan penyedia layanan AI  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Persyaratan kepatuhan AI di bidang kesehatan

### DevSecOps & Otomasi
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Pipeline pengembangan AI yang aman  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Validasi keamanan berkelanjutan  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Penyebaran infrastruktur yang aman  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Keamanan kontainer beban kerja AI

### Monitoring & Respon Insiden  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Solusi monitoring komprehensif  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Prosedur insiden khusus AI  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Manajemen informasi dan kejadian keamanan  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Sumber intelijen ancaman AI

## 🔄 Peningkatan Berkelanjutan

### Tetap Terkini dengan Standar yang Berkembang
- **Pembaruan Spesifikasi MCP**: Pantau perubahan spesifikasi MCP resmi dan advis keamanan  
- **Intelijen Ancaman**: Berlangganan feed ancaman keamanan AI dan database kerentanan  
- **Keterlibatan Komunitas**: Berpartisipasi dalam diskusi komunitas keamanan MCP dan kelompok kerja
- **Penilaian Rutin**: Melakukan penilaian postur keamanan triwulanan dan memperbarui praktik sesuai kebutuhan

### Berkontribusi pada Keamanan MCP
- **Riset Keamanan**: Berkontribusi pada riset keamanan MCP dan program pengungkapan kerentanan
- **Berbagi Praktik Terbaik**: Berbagi implementasi keamanan dan pelajaran yang dipelajari dengan komunitas
- **Pengembangan Standar**: Berpartisipasi dalam pengembangan spesifikasi MCP dan pembuatan standar keamanan
- **Pengembangan Alat**: Mengembangkan dan membagikan alat serta pustaka keamanan untuk ekosistem MCP

---

*Dokumen ini mencerminkan praktik terbaik keamanan MCP per 18 Desember 2025, berdasarkan Spesifikasi MCP 2025-11-25. Praktik keamanan harus secara rutin ditinjau dan diperbarui seiring perkembangan protokol dan lanskap ancaman.*

## Selanjutnya

- Baca: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Kembali ke: [Security Module Overview](./README.md)
- Lanjut ke: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berusaha untuk memberikan terjemahan yang akurat, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidaktepatan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh penerjemah manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang salah yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->