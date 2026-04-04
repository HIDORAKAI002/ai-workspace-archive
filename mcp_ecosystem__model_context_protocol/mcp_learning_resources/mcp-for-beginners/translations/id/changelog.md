# Changelog: Kurikulum MCP untuk Pemula

Dokumen ini berfungsi sebagai catatan semua perubahan penting yang dibuat pada kurikulum Model Context Protocol (MCP) untuk Pemula. Perubahan didokumentasikan dalam urutan kronologis terbalik (perubahan terbaru terlebih dahulu).

## 5 Februari 2026

### Peningkatan Validasi dan Navigasi Seluruh Repository

#### Konten Kurikulum Baru Ditambahkan

**Modul 03 - Memulai**
- **12-mcp-hosts/README.md**: Panduan komprehensif baru untuk pengaturan host MCP
  - Contoh konfigurasi Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Template konfigurasi JSON untuk semua host utama
  - Tabel perbandingan jenis transportasi (stdio, SSE/HTTP, WebSocket)
  - Pemecahan masalah koneksi umum
  - Praktik keamanan terbaik untuk konfigurasi host

- **13-mcp-inspector/README.md**: Panduan debug baru untuk MCP Inspector
  - Metode instalasi (npx, npm global, dari sumber)
  - Menghubungkan ke server melalui stdio dan HTTP/SSE
  - Alat pengujian, sumber daya, dan alur kerja prompt
  - Integrasi VS Code dengan MCP Inspector
  - Skenario debugging umum dengan solusi

**Modul 04 - Implementasi Praktis**
- **pagination/README.md**: Panduan implementasi pagination baru
  - Pola pagination berbasis kursor di Python, TypeScript, Java
  - Penanganan pagination sisi klien
  - Strategi desain kursor (opaque vs. terstruktur)
  - Rekomendasi optimasi kinerja

**Modul 05 - Topik Lanjutan**
- **mcp-protocol-features/README.md**: Detail fitur protokol baru
  - Implementasi notifikasi progres
  - Pola pembatalan permintaan
  - Template sumber daya dengan pola URI
  - Manajemen siklus hidup server
  - Pengendalian level logging
  - Pola penanganan error dengan kode JSON-RPC

#### Perbaikan Navigasi (24+ file diperbarui)

**README Modul Utama**
 Kini memiliki tautan ke pelajaran pertama DAN modul berikutnya

**Sub-file 02-Security**
- Kelima dokumen keamanan tambahan sekarang memiliki navigasi "Apa Selanjutnya":

**File Studi Kasus 09**
- Semua file studi kasus sekarang memiliki navigasi berurutan:

**Lab 10-StreamliningAI**
Ditambahkan bagian Apa Selanjutnya di overview Modul 10 dan Modul 11

#### Perbaikan Kode dan Konten

**Pembaruan SDK dan Dependensi**
Memperbaiki versi openai kosong menjadi `^4.95.0`
Memperbarui SDK dari `^1.8.0` ke `>=1.26.0`
Memperbarui pin versi mcp ke `>=1.26.0`

**Perbaikan Kode**
Memperbaiki model tidak valid `gpt-4o-mini` menjadi `gpt-4.1-mini`

**Perbaikan Konten**
Memperbaiki tautan rusak `READMEmd` → `README.md`, memperbaiki header kurikulum `Modul 1-3` → `Modul 0-3`, memperbaiki jalur yang sensitif terhadap huruf besar/kecil
Menghapus konten duplikat studi kasus 5 yang korup

**Peningkatan Panduan Pemula**
Menambahkan pengantar yang tepat, tujuan pembelajaran, dan pra-syarat untuk pemula

#### Pembaruan Kurikulum

**README.md Utama**
- Menambahkan entri 3.12 (Host MCP), 3.13 (Inspector MCP), 4.1 (Pagination), 5.16 (Fitur Protokol) ke tabel kurikulum

**README Modul**
Menambahkan pelajaran 12 dan 13 ke daftar pelajaran
Menambahkan bagian Panduan Praktis dengan tautan pagination
Menambahkan pelajaran 5.15 (Transportasi Kustom) dan 5.16 (Fitur Protokol)

**study_guide.md**
- Memperbarui mindmap dengan semua topik baru: Pengaturan Host MCP, MCP Inspector, Strategi Pagination, Pendalaman Fitur Protokol

## 28 Jan 2026

### Review Kepatuhan Spesifikasi MCP 2025-11-25

#### Peningkatan Konsep Inti (01-CoreConcepts/)
- **Primitive Klien Baru - Roots**: Menambahkan dokumentasi komprehensif tentang primitive klien Roots, memungkinkan server memahami batas filesystem dan izin akses
- **Anotasi Alat**: Menambahkan dokumentasi tentang anotasi perilaku alat (`readOnlyHint`, `destructiveHint`) untuk keputusan eksekusi alat yang lebih baik
- **Pemanggilan Alat di Sampling**: Memperbarui dokumentasi Sampling untuk menyertakan parameter `tools` dan `toolChoice` untuk pemanggilan alat yang dipandu model saat permintaan sampling
- **Elicitasi Mode URL**: Menambahkan dokumentasi tentang elicitation berbasis URL untuk interaksi web eksternal yang diinisiasi server
- **Tugas (Eksperimental)**: Menambahkan bagian baru mendokumentasikan fitur Tasks eksperimental untuk pembungkus eksekusi tahan lama dan pengambilan hasil tertunda
- **Dukungan Ikon**: Menyatakan bahwa alat, sumber daya, template sumber daya, dan prompt kini bisa menyertakan ikon sebagai metadata tambahan

#### Pembaruan Dokumentasi
- **README.md**: Menambahkan referensi versi MCP Specification 2025-11-25 dan penjelasan versioning berbasis tanggal
- **study_guide.md**: Memperbarui peta kurikulum untuk memasukkan Tasks dan Tool Annotations di bagian Konsep Inti; memperbarui stempel waktu dokumen

#### Verifikasi Kepatuhan Spesifikasi
- **Versi Protokol**: Memverifikasi semua dokumentasi mengacu pada MCP Specification 2025-11-25 saat ini
- **Kesesuaian Arsitektur**: Mengonfirmasi akurasi dokumentasi arsitektur dua lapis (Layer Data + Layer Transport)
- **Dokumentasi Primitif**: Memvalidasi primitive server (Resources, Prompts, Tools) dan primitive klien (Sampling, Elicitation, Logging, Roots)
- **Mekanisme Transport**: Memverifikasi akurasi dokumentasi transport STDIO dan Streamable HTTP
- **Panduan Keamanan**: Mengonfirmasi keselarasan dengan dokumentasi MCP Security Best Practices terkini

#### Fitur Utama MCP 2025-11-25 yang Didokumentasikan
- **OpenID Connect Discovery**: Penemuan server otentikasi melalui OIDC
- **Dokumen Metadata OAuth Client ID**: Mekanisme pendaftaran klien yang direkomendasikan
- **JSON Schema 2020-12**: Dialek default untuk definisi skema MCP
- **Sistem Tingkatan SDK**: Persyaratan formal untuk dukungan fitur dan pemeliharaan SDK
- **Struktur Tata Kelola**: Pembentukan formal Working Groups dan Interest Groups dalam tata kelola MCP

### Pembaruan Besar Dokumentasi Keamanan (02-Security/)

#### Integrasi MCP Security Summit Workshop (Sherpa)
- **Sumber Latihan Praktis Baru**: Menambahkan integrasi komprehensif dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ke seluruh dokumentasi keamanan
- **Liputan Rute Ekspedisi**: Mendokumentasikan perjalanan lengkap dari Base Camp ke Summit
- **Kesesuaian OWASP**: Semua panduan keamanan sekarang dipetakan ke risiko OWASP MCP Azure Security Guide

#### Integrasi OWASP MCP Top 10
- **Bagian Baru**: Menambahkan tabel Risiko Keamanan OWASP MCP Top 10 dengan mitigasi Azure ke README Keamanan utama
- **Dokumentasi Berbasis Risiko**: Memperbarui mcp-security-controls-2025.md dengan referensi risiko OWASP MCP untuk tiap domain keamanan
- **Arsitektur Referensi**: Menautkan ke arsitektur referensi OWASP MCP Azure Security Guide dan pola implementasi

#### File Keamanan yang Diperbarui
- **README.md**: Menambahkan overview Sherpa Workshop, tabel rute ekspedisi, ringkasan risiko OWASP MCP Top 10, dan bagian latihan praktik
- **mcp-security-controls-2025.md**: Memperbarui header ke Februari 2026, menambahkan referensi risiko OWASP (MCP01-MCP08), memperbaiki inkonsistensi versi spesifikasi
- **mcp-security-best-practices-2025.md**: Menambahkan bagian sumber daya Sherpa dan OWASP, memperbarui stempel waktu
- **mcp-best-practices.md**: Menambahkan bagian latihan langsung dengan tautan Sherpa dan OWASP
- **azure-content-safety-implementation.md**: Menambahkan referensi OWASP MCP06, keselarasan Sherpa Camp 3, dan bagian sumber daya tambahan

#### Tautan Sumber Daya Baru Ditambahkan
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Halaman risiko OWASP MCP individual (MCP01-MCP10)

### Penyelarasan MCP Specification 2025-11-25 Seluruh Kurikulum

#### Modul 03 - Memulai
- **Dokumentasi SDK**: Menambahkan Go SDK ke daftar SDK resmi; memperbarui semua referensi SDK agar sesuai dengan MCP Specification 2025-11-25
- **Klarifikasi Transportasi**: Memperbarui deskripsi transportasi STDIO dan HTTP Streaming dengan referensi spesifikasi eksplisit

#### Modul 04 - Implementasi Praktis
- **Pembaruan SDK**: Menambahkan Go SDK; memperbarui daftar SDK dengan referensi versi spesifikasi
- **Spesifikasi Otorisasi**: Memperbarui tautan MCP Authorization spesifikasi ke versi 2025-11-25 saat ini

#### Modul 05 - Topik Lanjutan
- **Fitur Baru**: Menambahkan catatan mengenai fitur MCP Specification 2025-11-25 baru (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Sumber Keamanan**: Menambahkan tautan OWASP MCP Top 10 dan workshop Sherpa ke referensi tambahan

#### Modul 06 - Kontribusi Komunitas
- **Daftar SDK**: Menambahkan Swift dan Rust SDK; memperbarui tautan spesifikasi ke 2025-11-25
- **Referensi Spesifikasi**: Memperbarui tautan MCP Specification ke URL spesifikasi langsung

#### Modul 07 - Pelajaran dari Adopsi Awal
- **Pembaruan Sumber Daya**: Menambahkan tautan MCP Specification 2025-11-25 dan OWASP MCP Top 10 ke sumber daya tambahan

#### Modul 08 - Praktik Terbaik
- **Versi Spesifikasi**: Memperbarui referensi MCP Specification ke 2025-11-25
- **Sumber Keamanan**: Menambahkan OWASP MCP Top 10 dan workshop Sherpa ke referensi tambahan

#### Modul 10 - Menyederhanakan Alur Kerja AI
- **Pembaruan Lencana**: Mengganti lencana versi MCP dari versi SDK (1.9.3) ke versi spesifikasi (2025-11-25)
- **Tautan Sumber Daya**: Memperbarui tautan MCP Specification; menambahkan OWASP MCP Top 10

#### Modul 11 - Lab Praktik MCP Server
- **Referensi Spesifikasi**: Memperbarui tautan MCP Specification ke versi 2025-11-25
- **Sumber Keamanan**: Menambahkan OWASP MCP Top 10 ke sumber daya resmi

## 18 Desember 2025

### Pembaruan Dokumentasi Keamanan - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Pembaruan Versi Spesifikasi
- **Pembaruan Versi Protokol**: Memperbarui untuk merujuk pada MCP Specification 2025-11-25 terbaru (rilis 25 November 2025)
  - Memperbarui semua referensi versi spesifikasi dari 2025-06-18 ke 2025-11-25
  - Memperbarui referensi tanggal dokumen dari 18 Agustus 2025 ke 18 Desember 2025
  - Memverifikasi semua URL spesifikasi mengarah ke dokumentasi saat ini
- **Validasi Konten**: Validasi komprehensif praktik terbaik keamanan terhadap standar terkini
  - **Solusi Keamanan Microsoft**: Memverifikasi terminologi dan tautan terkini untuk Prompt Shields (sebelumnya "deteksi risiko jailbreak"), Azure Content Safety, Microsoft Entra ID, dan Azure Key Vault
  - **Keamanan OAuth 2.1**: Konfirmasi kesesuaian dengan praktik terbaik keamanan OAuth terbaru
  - **Standar OWASP**: Validasi referensi OWASP Top 10 untuk LLM tetap terkini
  - **Layanan Azure**: Memverifikasi semua tautan dokumentasi Microsoft Azure dan praktik terbaik
- **Keselarasan Standar**: Semua standar keamanan yang direferensikan sudah terkini
  - Framework Manajemen Risiko AI NIST
  - ISO 27001:2022
  - Praktik Terbaik Keamanan OAuth 2.1
  - Kerangka kerja keamanan dan kepatuhan Azure
- **Sumber Daya Implementasi**: Memverifikasi semua tautan panduan implementasi dan sumber daya
  - Pola otentikasi Azure API Management
  - Panduan integrasi Microsoft Entra ID
  - Manajemen rahasia Azure Key Vault
  - Pipeline dan solusi monitoring DevSecOps

### Jaminan Kualitas Dokumentasi
- **Kepatuhan Spesifikasi**: Memastikan semua persyaratan keamanan MCP wajib (MUST/MUST NOT) sesuai dengan spesifikasi terbaru
- **Ketersediaan Sumber Daya**: Memverifikasi semua tautan eksternal ke dokumentasi Microsoft, standar keamanan, dan panduan implementasi
- **Cakupan Praktik Terbaik**: Memastikan cakupan menyeluruh untuk autentikasi, otorisasi, ancaman spesifik AI, keamanan rantai pasokan, dan pola enterprise

## 6 Oktober 2025

### Perluasan Bagian Memulai – Penggunaan Server Lanjutan & Otentikasi Sederhana

#### Penggunaan Server Lanjutan (03-GettingStarted/10-advanced)
- **Bab Baru Ditambahkan**: Memperkenalkan panduan lengkap penggunaan server MCP lanjutan, mencakup arsitektur server reguler dan low-level.
  - **Server Reguler vs Low-Level**: Perbandingan rinci dan contoh kode di Python dan TypeScript untuk kedua pendekatan.
  - **Desain Berbasis Handler**: Penjelasan manajemen alat/sumber daya/prompt berbasis handler untuk implementasi server yang skalabel dan fleksibel.
  - **Pola Praktis**: Skenario dunia nyata di mana pola server low-level berguna untuk fitur dan arsitektur lanjutan.

#### Otentikasi Sederhana (03-GettingStarted/11-simple-auth)
- **Bab Baru Ditambahkan**: Panduan langkah demi langkah implementasi otentikasi sederhana di server MCP.
  - **Konsep Otentikasi**: Penjelasan jelas tentang perbedaan otentikasi dan otorisasi, serta penanganan kredensial.
  - **Implementasi Otentikasi Dasar**: Pola otentikasi berbasis middleware di Python (Starlette) dan TypeScript (Express), dengan contoh kode.
  - **Progresi ke Keamanan Lanjutan**: Panduan memulai dengan otentikasi sederhana dan berkembang ke OAuth 2.1 dan RBAC, dengan referensi modul keamanan lanjutan.

Penambahan ini memberikan panduan praktis dan langsung untuk membangun implementasi server MCP yang lebih kuat, aman, dan fleksibel, menghubungkan konsep dasar dengan pola produksi lanjutan.

## 29 September 2025

### Lab Integrasi Database MCP Server - Jalur Pembelajaran Praktik Lengkap

#### 11-MCPServerHandsOnLabs - Kurikulum Lengkap Integrasi Database Baru
- **Lengkap Jalur Pembelajaran 13-Lab**: Menambahkan kurikulum praktis komprehensif untuk membangun server MCP siap produksi dengan integrasi basis data PostgreSQL  
  - **Implementasi Dunia Nyata**: Kasus penggunaan analitik Zava Retail yang menunjukkan pola tingkat perusahaan  
  - **Progres Pembelajaran Terstruktur**:  
    - **Lab 00-03: Dasar-dasar** - Pengantar, Arsitektur Inti, Keamanan & Multi-Tenancy, Pengaturan Lingkungan  
    - **Lab 04-06: Membangun Server MCP** - Desain & Skema Basis Data, Implementasi Server MCP, Pengembangan Alat  
    - **Lab 07-09: Fitur Lanjutan** - Integrasi Pencarian Semantik, Pengujian & Debugging, Integrasi VS Code  
    - **Lab 10-12: Produksi & Praktik Terbaik** - Strategi Deployment, Pemantauan & Observabilitas, Praktik Terbaik & Optimisasi  
  - **Teknologi Perusahaan**: Kerangka kerja FastMCP, PostgreSQL dengan pgvector, embedding Azure OpenAI, Azure Container Apps, Application Insights  
  - **Fitur Lanjutan**: Keamanan Tingkat Baris (RLS), pencarian semantik, akses data multi-tenant, embedding vektor, pemantauan waktu nyata  

#### Standardisasi Terminologi - Konversi Modul ke Lab  
- **Pembaruan Dokumentasi Komprehensif**: Secara sistematis memperbarui semua file README di 11-MCPServerHandsOnLabs untuk menggunakan terminologi "Lab" menggantikan "Modul"  
  - **Judul Bagian**: Memperbarui "What This Module Covers" menjadi "What This Lab Covers" di seluruh 13 lab  
  - **Deskripsi Konten**: Mengubah "This module provides..." menjadi "This lab provides..." di seluruh dokumentasi  
  - **Tujuan Pembelajaran**: Memperbarui "By the end of this module..." menjadi "By the end of this lab..."  
  - **Tautan Navigasi**: Mengubah semua referensi "Module XX:" menjadi "Lab XX:" pada lintas-referensi dan navigasi  
  - **Pelacakan Penyelesaian**: Memperbarui "After completing this module..." menjadi "After completing this lab..."  
  - **Referensi Teknis Terjaga**: Menjaga referensi modul Python dalam file konfigurasi (misal, `"module": "mcp_server.main"`)  

#### Peningkatan Panduan Studi (study_guide.md)  
- **Peta Kurikulum Visual**: Menambahkan bagian baru "11. Database Integration Labs" dengan visualisasi struktur lab komprehensif  
- **Struktur Repository**: Memperbarui dari sepuluh menjadi sebelas bagian utama dengan deskripsi rinci 11-MCPServerHandsOnLabs  
- **Panduan Jalur Pembelajaran**: Memperbaiki instruksi navigasi untuk mencakup bagian 00-11  
- **Cakupan Teknologi**: Menambahkan detail integrasi FastMCP, PostgreSQL, layanan Azure  
- **Hasil Pembelajaran**: Menekankan pengembangan server siap produksi, pola integrasi basis data, dan keamanan tingkat perusahaan  

#### Peningkatan Struktur README Utama  
- **Terminologi Berbasis Lab**: Memperbarui README.md utama di 11-MCPServerHandsOnLabs agar konsisten menggunakan struktur "Lab"  
- **Organisasi Jalur Pembelajaran**: Progres yang jelas dari konsep dasar ke implementasi lanjutan hingga deployment produksi  
- **Fokus Dunia Nyata**: Penekanan pada pembelajaran praktis langsung dengan pola dan teknologi tingkat perusahaan  

### Peningkatan Kualitas & Konsistensi Dokumentasi  
- **Penekanan Pembelajaran Praktis**: Memperkuat pendekatan berbasis lab di seluruh dokumentasi  
- **Fokus Pola Perusahaan**: Menyoroti implementasi siap produksi dan pertimbangan keamanan perusahaan  
- **Integrasi Teknologi**: Cakupan komprehensif layanan Azure modern dan pola integrasi AI  
- **Progres Pembelajaran**: Jalur jelas dan terstruktur dari konsep dasar hingga deployment produksi  

## 26 September 2025  

### Peningkatan Studi Kasus - Integrasi GitHub MCP Registry  

#### Studi Kasus (09-CaseStudy/) - Fokus Pengembangan Ekosistem  
- **README.md**: Perluasan besar dengan studi kasus GitHub MCP Registry yang komprehensif  
  - **Studi Kasus GitHub MCP Registry**: Studi kasus baru yang mendalam meninjau peluncuran MCP Registry GitHub pada September 2025  
    - **Analisis Masalah**: Pemeriksaan rinci tantangan fragmentasi penemuan dan deployment server MCP  
    - **Arsitektur Solusi**: Pendekatan registry terpusat GitHub dengan instalasi VS Code satu klik  
    - **Dampak Bisnis**: Peningkatan nyata dalam onboarding dan produktivitas pengembang  
    - **Nilai Strategis**: Fokus pada deployment agen modular dan interoperabilitas lintas alat  
    - **Pengembangan Ekosistem**: Posisi sebagai platform dasar untuk integrasi agenik  
  - **Struktur Studi Kasus yang Ditingkatkan**: Memperbarui ketujuh studi kasus dengan format konsisten dan deskripsi komprehensif  
    - Agen Perjalanan Azure AI: Penekanan orkestrasi multi-agen  
    - Integrasi Azure DevOps: Fokus otomatisasi alur kerja  
    - Pengambilan Dokumentasi Waktu Nyata: Implementasi klien konsol Python  
    - Generator Rencana Studi Interaktif: Aplikasi web percakapan Chainlit  
    - Dokumentasi Dalam Editor: Integrasi VS Code dan GitHub Copilot  
    - Manajemen API Azure: Pola integrasi API perusahaan  
    - GitHub MCP Registry: Pengembangan ekosistem dan platform komunitas  
  - **Kesimpulan Komprehensif**: Paragraf akhir ditulis ulang menyoroti tujuh studi kasus yang menjangkau banyak dimensi implementasi MCP  
    - Integrasi Perusahaan, Orkestrasi Multi-Agen, Produktivitas Pengembang  
    - Pengembangan Ekosistem, Klasifikasi Aplikasi Pendidikan  
    - Wawasan yang diperluas ke pola arsitektur, strategi implementasi, dan praktik terbaik  
    - Penekanan pada MCP sebagai protokol matang dan siap produksi  

#### Pembaruan Panduan Studi (study_guide.md)  
- **Peta Kurikulum Visual**: Memperbarui mindmap untuk memasukkan GitHub MCP Registry di bagian Studi Kasus  
- **Deskripsi Studi Kasus**: Ditingkatkan dari deskripsi umum ke uraian rinci tujuh studi kasus komprehensif  
- **Struktur Repository**: Memperbarui bagian 10 untuk mencerminkan cakupan studi kasus lengkap dengan detail implementasi spesifik  
- **Integrasi Changelog**: Menambahkan entri 26 September 2025 untuk dokumentasi penambahan GitHub MCP Registry dan peningkatan studi kasus  
- **Pembaruan Tanggal**: Memperbarui cap waktu footer untuk merefleksikan revisi terbaru (26 September 2025)  

### Peningkatan Kualitas Dokumentasi  
- **Peningkatan Konsistensi**: Standardisasi format dan struktur studi kasus di semua tujuh contoh  
- **Cakupan Komprehensif**: Studi kasus kini mencakup skenario perusahaan, produktivitas pengembang, dan pengembangan ekosistem  
- **Posisi Strategis**: Penekanan yang diperkuat pada MCP sebagai platform dasar untuk deployment sistem agenik  
- **Integrasi Sumber Daya**: Memperbarui sumber daya tambahan untuk menyertakan tautan GitHub MCP Registry  

## 15 September 2025  

### Perluasan Topik Lanjutan - Transport Kustom & Rekayasa Konteks  

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Panduan Implementasi Lanjutan Baru  
- **README.md**: Panduan implementasi lengkap untuk mekanisme transport MCP kustom  
  - **Transport Azure Event Grid**: Implementasi event-driven serverless canggih  
    - Contoh C#, TypeScript, dan Python dengan integrasi Azure Functions  
    - Pola arsitektur event-driven untuk solusi MCP yang skalabel  
    - Penerima webhook dan penanganan pesan berbasis push  
  - **Transport Azure Event Hubs**: Implementasi transport streaming throughput tinggi  
    - Kapabilitas streaming real-time untuk skenario latensi rendah  
    - Strategi partisi dan manajemen checkpoint  
    - Pengelompokan pesan dan optimisasi performa  
  - **Pola Integrasi Perusahaan**: Contoh arsitektur siap produksi  
    - Pemrosesan MCP terdistribusi di beberapa Azure Functions  
    - Arsitektur transport hybrid menggabungkan berbagai tipe transport  
    - Strategi daya tahan pesan, keandalan, dan penanganan kesalahan  
  - **Keamanan & Pemantauan**: Integrasi Azure Key Vault dan pola observabilitas  
    - Otentikasi managed identity dan akses hak minimum  
    - Telemetri Application Insights dan monitoring performa  
    - Circuit breaker dan pola toleransi kesalahan  
  - **Kerangka Pengujian**: Strategi pengujian komprehensif untuk transport kustom  
    - Pengujian unit dengan test doubles dan mocking framework  
    - Pengujian integrasi dengan Azure Test Containers  
    - Pertimbangan pengujian performa dan beban  

#### Rekayasa Konteks (05-AdvancedTopics/mcp-contextengineering/) - Disiplin AI yang Sedang Berkembang  
- **README.md**: Eksplorasi komprehensif tentang rekayasa konteks sebagai bidang emergen  
  - **Prinsip Inti**: Pembagian konteks lengkap, kesadaran pengambilan keputusan aksi, dan manajemen jendela konteks  
  - **Kesesuaian dengan Protokol MCP**: Bagaimana desain MCP mengatasi tantangan rekayasa konteks  
    - Batasan jendela konteks dan strategi pemuatan progresif  
    - Penentuan relevansi dan pengambilan konteks dinamis  
    - Penanganan konteks multi-modal dan pertimbangan keamanan  
  - **Pendekatan Implementasi**: Arsitektur single-thread vs multi-agen  
    - Teknik pemotongan konteks dan prioritisasi  
    - Pemuatan progresif konteks dan strategi kompresi  
    - Pendekatan konteks berlapis dan optimisasi pengambilan  
  - **Kerangka Pengukuran**: Metode metrik baru untuk evaluasi efektivitas konteks  
    - Efisiensi input, performa, kualitas, dan pengalaman pengguna  
    - Pendekatan eksperimen untuk optimisasi konteks  
    - Analisis kegagalan dan metodologi perbaikan  

#### Pembaruan Navigasi Kurikulum (README.md)  
- **Struktur Modul yang Ditingkatkan**: Memperbarui tabel kurikulum untuk menyertakan topik lanjutan baru  
  - Menambahkan entri Rekayasa Konteks (5.14) dan Transport Kustom (5.15)  
  - Format konsisten dan tautan navigasi di semua modul  
  - Deskripsi diperbarui untuk mencerminkan cakupan konten terkini  

### Peningkatan Struktur Direktori  
- **Standarisasi Penamaan**: Mengganti nama "mcp transport" menjadi "mcp-transport" untuk konsistensi dengan folder topik lanjutan lainnya  
- **Organisasi Konten**: Semua folder 05-AdvancedTopics kini mengikuti pola penamaan konsisten (mcp-[topik])  

### Peningkatan Kualitas Dokumentasi  
- **Kesesuaian Spesifikasi MCP**: Semua konten baru mengacu pada Spesifikasi MCP 2025-06-18 terbaru  
- **Contoh Multi-Bahasa**: Contoh kode lengkap dalam C#, TypeScript, dan Python  
- **Fokus Perusahaan**: Pola siap produksi dan integrasi cloud Azure secara menyeluruh  
- **Dokumentasi Visual**: Diagram Mermaid untuk visualisasi arsitektur dan alur  

## 18 Agustus 2025  

### Pembaruan Komprehensif Dokumentasi - Standar MCP 2025-06-18  

#### Praktik Terbaik Keamanan MCP (02-Security/) - Modernisasi Total  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Penulisan ulang lengkap selaras dengan Spesifikasi MCP 2025-06-18  
  - **Persyaratan Wajib**: Menambahkan persyaratan MUST/MUST NOT eksplisit dari spesifikasi resmi dengan indikator visual jelas  
  - **12 Praktik Keamanan Inti**: Direstrukturisasi dari daftar 15 item menjadi domain keamanan komprehensif  
    - Keamanan Token & Otentikasi dengan integrasi penyedia identitas eksternal  
    - Manajemen Sesi & Keamanan Transport dengan persyaratan kriptografi  
    - Perlindungan Ancaman Khusus AI dengan integrasi Microsoft Prompt Shields  
    - Kontrol Akses & Izin dengan prinsip hak minimum  
    - Keamanan Konten & Pemantauan dengan integrasi Azure Content Safety  
    - Keamanan Rantai Pasokan dengan verifikasi komponen menyeluruh  
    - Keamanan OAuth & Pencegahan Confused Deputy dengan implementasi PKCE  
    - Respons Insiden & Pemulihan dengan kapabilitas otomatis  
    - Kepatuhan & Tata Kelola dengan penyesuaian regulasi  
    - Kontrol Keamanan Lanjutan dengan arsitektur zero trust  
    - Integrasi Ekosistem Keamanan Microsoft dengan solusi komprehensif  
    - Evolusi Keamanan Berkelanjutan dengan praktik adaptif  
  - **Solusi Keamanan Microsoft**: Panduan integrasi yang ditingkatkan untuk Prompt Shields, Azure Content Safety, Entra ID, dan GitHub Advanced Security  
  - **Sumber Daya Implementasi**: Link sumber daya komprehensif dikategorikan berdasarkan Dokumentasi Resmi MCP, Solusi Keamanan Microsoft, Standar Keamanan, dan Panduan Implementasi  

#### Kontrol Keamanan Lanjutan (02-Security/) - Implementasi Skala Perusahaan  
- **MCP-SECURITY-CONTROLS-2025.md**: Pembaruan total dengan kerangka kerja keamanan tingkat perusahaan  
  - **9 Domain Keamanan Komprehensif**: Diperluas dari kontrol dasar menjadi framework perusahaan  
    - Otentikasi & Otorisasi Lanjutan dengan integrasi Microsoft Entra ID  
    - Keamanan Token & Kontrol Anti-Passthrough dengan validasi menyeluruh  
    - Kontrol Keamanan Sesi dengan pencegahan pembajakan  
    - Kontrol Keamanan Khusus AI dengan pencegahan injeksi perintah dan pemalsuan alat  
    - Pencegahan Serangan Confused Deputy dengan keamanan proxy OAuth  
    - Keamanan Eksekusi Alat dengan sandboxing dan isolasi  
    - Kontrol Keamanan Rantai Pasokan dengan verifikasi dependensi  
    - Kontrol Pemantauan & Deteksi dengan integrasi SIEM  
    - Respons Insiden & Pemulihan dengan kapabilitas otomatis  
  - **Contoh Implementasi**: Menambahkan blok konfigurasi YAML dan contoh kode terperinci  
  - **Integrasi Solusi Microsoft**: Cakupan lengkap layanan keamanan Azure, GitHub Advanced Security, dan manajemen identitas perusahaan  

#### Keamanan Topik Lanjutan (05-AdvancedTopics/mcp-security/) - Implementasi Siap Produksi  
- **README.md**: Penulisan ulang lengkap untuk implementasi keamanan tingkat perusahaan  
  - **Kesesuaian Spesifikasi Terkini**: Diperbarui ke Spesifikasi MCP 2025-06-18 dengan persyaratan keamanan wajib  
  - **Otentikasi Ditingkatkan**: Integrasi Microsoft Entra ID dengan contoh detail .NET dan Java Spring Security  
  - **Integrasi Keamanan AI**: Implementasi Microsoft Prompt Shields dan Azure Content Safety dengan contoh Python terperinci  
  - **Mitigasi Ancaman Lanjutan**: Contoh implementasi komprehensif untuk  
    - Pencegahan Serangan Confused Deputy dengan PKCE dan validasi persetujuan pengguna  
    - Pencegahan Passthrough Token dengan validasi audiens dan manajemen token aman  
    - Pencegahan Pembajakan Sesi dengan pengikatan kriptografi dan analisis perilaku  
  - **Integrasi Keamanan Perusahaan**: Pemantauan Azure Application Insights, pipeline deteksi ancaman, dan keamanan rantai pasokan  
  - **Daftar Periksa Implementasi**: Kontrol keamanan wajib vs. direkomendasikan dengan manfaat ekosistem keamanan Microsoft  

### Peningkatan Kualitas Dokumentasi & Kesesuaian Standar  
- **Referensi Spesifikasi**: Memperbarui semua referensi ke Spesifikasi MCP 2025-06-18 terkini  
- **Ekosistem Keamanan Microsoft**: Panduan integrasi yang ditingkatkan di seluruh dokumentasi keamanan  
- **Implementasi Praktis**: Menambahkan contoh kode terperinci dalam .NET, Java, dan Python dengan pola perusahaan  
- **Organisasi Sumber Daya**: Kategori komprehensif dokumentasi resmi, standar keamanan, dan panduan implementasi  
- **Indikator Visual**: Penanda jelas persyaratan wajib vs. praktik yang disarankan  

#### Konsep Inti (01-CoreConcepts/) - Modernisasi Total  
- **Pembaruan Versi Protokol**: Memperbarui referensi ke Spesifikasi MCP 2025-06-18 terbaru dengan versi berbasis tanggal (format YYYY-MM-DD)  
- **Penyempurnaan Arsitektur**: Menguatkan deskripsi Host, Client, dan Server sesuai pola arsitektur MCP terkini
  - Host sekarang dengan jelas didefinisikan sebagai aplikasi AI yang mengoordinasikan beberapa koneksi klien MCP
  - Klien dijelaskan sebagai konektor protokol yang mempertahankan hubungan satu-ke-satu dengan server
  - Server ditingkatkan dengan skenario penerapan lokal vs jarak jauh
- **Restrukturisasi Primitif**: Perombakan menyeluruh atas primitif server dan klien
  - Primitif Server: Resources (sumber data), Prompts (template), Tools (fungsi yang dapat dijalankan) dengan penjelasan dan contoh terperinci
  - Primitif Klien: Sampling (penyelesaian LLM), Elicitation (input pengguna), Logging (debugging/pemantauan)
  - Diperbarui dengan pola metode penemuan (`*/list`), pengambilan (`*/get`), dan eksekusi (`*/call`) terbaru
- **Arsitektur Protokol**: Memperkenalkan model arsitektur dua lapis
  - Lapisan Data: dasar JSON-RPC 2.0 dengan manajemen siklus hidup dan primitif
  - Lapisan Transportasi: mekanisme transportasi STDIO (lokal) dan Streamable HTTP dengan SSE (jarak jauh)
- **Kerangka Keamanan**: Prinsip keamanan komprehensif termasuk persetujuan pengguna eksplisit, perlindungan privasi data, keamanan eksekusi alat, dan keamanan lapisan transportasi
- **Pola Komunikasi**: Memperbarui pesan protokol untuk menunjukkan alur inisialisasi, penemuan, eksekusi, dan pemberitahuan
- **Contoh Kode**: Menyegarkan contoh multi-bahasa (.NET, Java, Python, JavaScript) untuk mencerminkan pola SDK MCP saat ini

#### Keamanan (02-Security/) - Perombakan Keamanan Menyeluruh  
- **Penyesuaian Standar**: Penyesuaian penuh dengan persyaratan keamanan MCP Specification 2025-06-18
- **Evolusi Autentikasi**: Mendokumentasikan evolusi dari server OAuth kustom ke delegasi penyedia identitas eksternal (Microsoft Entra ID)
- **Analisis Ancaman Khusus AI**: Peningkatan cakupan vektor serangan AI modern
  - Skenario serangan injeksi prompt dengan contoh dunia nyata yang terperinci
  - Mekanisme keracunan alat dan pola serangan "rug pull"
  - Keracunan jendela konteks dan serangan membingungkan model
- **Solusi Keamanan AI Microsoft**: Cakupan komprehensif ekosistem keamanan Microsoft
  - AI Prompt Shields dengan deteksi maju, sorotan, dan teknik delimiter
  - Pola integrasi Azure Content Safety
  - GitHub Advanced Security untuk perlindungan rantai pasokan
- **Mitigasi Ancaman Tingkat Lanjut**: Kontrol keamanan terperinci untuk
  - Pembajakan sesi dengan skenario serangan spesifik MCP dan persyaratan ID sesi kriptografis
  - Masalah confused deputy dalam skenario proxy MCP dengan persyaratan persetujuan eksplisit
  - Kerentanan token passthrough dengan kontrol validasi wajib
- **Keamanan Rantai Pasokan**: Perluasan cakupan rantai pasokan AI termasuk model dasar, layanan embeddings, penyedia konteks, dan API pihak ketiga
- **Keamanan Dasar**: Peningkatan integrasi dengan pola keamanan perusahaan termasuk arsitektur zero trust dan ekosistem keamanan Microsoft
- **Organisasi Sumber Daya**: Mengkategorikan tautan sumber daya komprehensif berdasarkan jenis (Dokumen Resmi, Standar, Riset, Solusi Microsoft, Panduan Implementasi)

### Peningkatan Kualitas Dokumentasi
- **Tujuan Pembelajaran Terstruktur**: Meningkatkan tujuan pembelajaran dengan hasil yang spesifik dan dapat diterapkan
- **Referensi Silang**: Menambahkan tautan antara topik keamanan dan konsep inti yang terkait
- **Informasi Terkini**: Memperbarui semua referensi tanggal dan tautan spesifikasi ke standar terkini
- **Panduan Implementasi**: Menambahkan pedoman implementasi yang spesifik dan dapat diterapkan di seluruh kedua bagian

## 16 Juli 2025

### Perbaikan README dan Navigasi
- Desain ulang total navigasi kurikulum dalam README.md
- Mengganti tag `<details>` dengan format tabel yang lebih mudah diakses
- Membuat opsi tata letak alternatif di folder baru "alternative_layouts"
- Menambahkan contoh navigasi berbasis kartu, bergaya tab, dan bergaya akordion
- Memperbarui bagian struktur repositori untuk mencakup semua file terbaru
- Meningkatkan bagian "Cara Menggunakan Kurikulum Ini" dengan rekomendasi yang jelas
- Memperbarui tautan spesifikasi MCP ke URL yang benar
- Menambahkan bagian Context Engineering (5.14) ke struktur kurikulum

### Pembaruan Panduan Studi
- Merevisi total panduan studi agar selaras dengan struktur repositori saat ini
- Menambahkan bagian baru untuk Klien dan Alat MCP, serta Server MCP Populer
- Memperbarui Peta Kurikulum Visual untuk mencerminkan semua topik secara akurat
- Meningkatkan deskripsi Topik Lanjutan untuk mencakup semua area khusus
- Memperbarui bagian Studi Kasus dengan contoh aktual
- Menambahkan changelog komprehensif ini

### Kontribusi Komunitas (06-CommunityContributions/)
- Menambahkan informasi terperinci tentang server MCP untuk pembuatan gambar
- Menambahkan bagian komprehensif tentang menggunakan Claude di VSCode
- Menambahkan instruksi pengaturan dan penggunaan klien terminal Cline
- Memperbarui bagian klien MCP untuk memasukkan semua opsi klien populer
- Meningkatkan contoh kontribusi dengan sampel kode yang lebih akurat

### Topik Lanjutan (05-AdvancedTopics/)
- Mengatur semua folder topik khusus dengan penamaan konsisten
- Menambahkan materi dan contoh rekayasa konteks
- Menambahkan dokumentasi integrasi agen Foundry
- Meningkatkan dokumentasi integrasi keamanan Entra ID

## 11 Juni 2025

### Pembuatan Awal
- Merilis versi pertama kurikulum MCP untuk Pemula
- Membuat struktur dasar untuk semua 10 bagian utama
- Mengimplementasikan Peta Kurikulum Visual untuk navigasi
- Menambahkan proyek contoh awal dalam beberapa bahasa pemrograman

### Memulai (03-GettingStarted/)
- Membuat contoh implementasi server pertama
- Menambahkan panduan pengembangan klien
- Menyertakan instruksi integrasi klien LLM
- Menambahkan dokumentasi integrasi VS Code
- Mengimplementasikan contoh server Server-Sent Events (SSE)

### Konsep Inti (01-CoreConcepts/)
- Menambahkan penjelasan detail arsitektur klien-server
- Membuat dokumentasi komponen utama protokol
- Mendokumentasikan pola pesan dalam MCP

## 23 Mei 2025

### Struktur Repositori
- Menginisialisasi repositori dengan struktur folder dasar
- Membuat file README untuk setiap bagian utama
- Menyiapkan infrastruktur terjemahan
- Menambahkan aset gambar dan diagram

### Dokumentasi
- Membuat README.md awal dengan gambaran kurikulum
- Menambahkan CODE_OF_CONDUCT.md dan SECURITY.md
- Menyiapkan SUPPORT.md dengan panduan mendapatkan bantuan
- Membuat struktur panduan studi awal

## 15 April 2025

### Perencanaan dan Kerangka Kerja
- Perencanaan awal untuk kurikulum MCP untuk Pemula
- Mendefinisikan tujuan pembelajaran dan audiens sasaran
- Menguraikan struktur 10 bagian kurikulum
- Mengembangkan kerangka konseptual untuk contoh dan studi kasus
- Membuat contoh prototipe awal untuk konsep utama

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh penerjemah manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau salah penafsiran yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->