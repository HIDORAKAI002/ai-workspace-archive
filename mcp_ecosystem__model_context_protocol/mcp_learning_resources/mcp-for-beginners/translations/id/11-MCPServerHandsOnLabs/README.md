# 🚀 Server MCP dengan PostgreSQL - Panduan Pembelajaran Lengkap

## 🧠 Ikhtisar Jalur Pembelajaran Integrasi Database MCP

Panduan pembelajaran komprehensif ini mengajarkan Anda cara membangun **Model Context Protocol (MCP) server** siap produksi yang terintegrasi dengan database melalui implementasi analitik ritel praktis. Anda akan mempelajari pola tingkat perusahaan termasuk **Row Level Security (RLS)**, **pencarian semantik**, **integrasi Azure AI**, dan **akses data multi-tenant**.

Baik Anda seorang pengembang backend, insinyur AI, atau arsitek data, panduan ini menyediakan pembelajaran terstruktur dengan contoh dunia nyata dan latihan praktik yang membimbing Anda melalui MCP server berikut https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Sumber Resmi MCP

- 📘 [Dokumentasi MCP](https://modelcontextprotocol.io/) – Tutorial dan panduan pengguna terperinci
- 📜 [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Arsitektur protokol dan referensi teknis
- 🧑‍💻 [Repositori GitHub MCP](https://github.com/modelcontextprotocol) – SDK sumber terbuka, alat, dan contoh kode
- 🌐 [Komunitas MCP](https://github.com/orgs/modelcontextprotocol/discussions) – Bergabung dalam diskusi dan berkontribusi ke komunitas
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Praktik keamanan terbaik dan mitigasi risiko

## 🧭 Jalur Pembelajaran Integrasi Database MCP

### 📚 Struktur Pembelajaran Lengkap untuk https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Lab | Topik | Deskripsi | Tautan |
|--------|-------|-------------|------|
| **Lab 1-3: Dasar-Dasar** | | | |
| 00 | [Pengantar Integrasi Database MCP](./00-Introduction/README.md) | Gambaran MCP dengan integrasi database dan kasus penggunaan analitik ritel | [Mulai Di Sini](./00-Introduction/README.md) |
| 01 | [Konsep Arsitektur Inti](./01-Architecture/README.md) | Memahami arsitektur server MCP, lapisan database, dan pola keamanan | [Pelajari](./01-Architecture/README.md) |
| 02 | [Keamanan dan Multi-Tenancy](./02-Security/README.md) | Row Level Security, autentikasi, dan akses data multi-tenant | [Pelajari](./02-Security/README.md) |
| 03 | [Pengaturan Lingkungan](./03-Setup/README.md) | Menyiapkan lingkungan pengembangan, Docker, sumber daya Azure | [Siapkan](./03-Setup/README.md) |
| **Lab 4-6: Membangun MCP Server** | | | |
| 04 | [Desain Database dan Skema](./04-Database/README.md) | Pengaturan PostgreSQL, desain skema ritel, dan data contoh | [Bangun](./04-Database/README.md) |
| 05 | [Implementasi MCP Server](./05-MCP-Server/README.md) | Membangun server FastMCP dengan integrasi database | [Bangun](./05-MCP-Server/README.md) |
| 06 | [Pengembangan Alat](./06-Tools/README.md) | Membuat alat kueri database dan introspeksi skema | [Bangun](./06-Tools/README.md) |
| **Lab 7-9: Fitur Lanjutan** | | | |
| 07 | [Integrasi Pencarian Semantik](./07-Semantic-Search/README.md) | Implementasi vektor embedding dengan Azure OpenAI dan pgvector | [Lanjutkan](./07-Semantic-Search/README.md) |
| 08 | [Pengujian dan Debugging](./08-Testing/README.md) | Strategi pengujian, alat debugging, dan pendekatan validasi | [Uji](./08-Testing/README.md) |
| 09 | [Integrasi VS Code](./09-VS-Code/README.md) | Konfigurasi integrasi MCP di VS Code dan penggunaan Chat AI | [Integrasikan](./09-VS-Code/README.md) |
| **Lab 10-12: Produksi dan Praktik Terbaik** | | | |
| 10 | [Strategi Deployment](./10-Deployment/README.md) | Deployment dengan Docker, Azure Container Apps, dan pertimbangan penskalaan | [Deploy](./10-Deployment/README.md) |
| 11 | [Monitoring dan Observabilitas](./11-Monitoring/README.md) | Application Insights, pencatatan, monitoring performa | [Monitor](./11-Monitoring/README.md) |
| 12 | [Praktik Terbaik dan Optimasi](./12-Best-Practices/README.md) | Optimasi performa, penguatan keamanan, dan tips produksi | [Optimalkan](./12-Best-Practices/README.md) |

### 💻 Apa yang Akan Anda Bangun

Pada akhir jalur pembelajaran ini, Anda akan membangun **Server MCP Zava Retail Analytics** lengkap dengan:

- **Database ritel multi-tabel** dengan pesanan pelanggan, produk, dan inventaris
- **Row Level Security** untuk isolasi data berbasis toko
- **Pencarian produk semantik** menggunakan embedding Azure OpenAI
- **Integrasi Chat AI VS Code** untuk kueri bahasa alami
- **Deployment siap produksi** dengan Docker dan Azure
- **Monitoring menyeluruh** dengan Application Insights

## 🎯 Prasyarat untuk Pembelajaran

Untuk mendapatkan hasil maksimal dari jalur pembelajaran ini, Anda harus memiliki:

- **Pengalaman Pemrograman**: Familiar dengan Python (lebih disukai) atau bahasa serupa
- **Pengetahuan Database**: Pemahaman dasar SQL dan basis data relasional
- **Konsep API**: Memahami REST API dan konsep HTTP
- **Alat Pengembangan**: Pengalaman dengan command line, Git, dan editor kode
- **Dasar Cloud**: (Opsional) Pengetahuan dasar Azure atau platform cloud serupa
- **Familiaritas Docker**: (Opsional) Memahami konsep containerisasi

### Alat yang Dibutuhkan

- **Docker Desktop** - Untuk menjalankan PostgreSQL dan server MCP
- **Azure CLI** - Untuk deployment sumber daya cloud
- **VS Code** - Untuk pengembangan dan integrasi MCP
- **Git** - Untuk kontrol versi
- **Python 3.8+** - Untuk pengembangan server MCP

## 📚 Panduan Studi & Sumber Daya

Jalur pembelajaran ini menyertakan sumber daya lengkap untuk membantu Anda menavigasi dengan efektif:

### Panduan Studi

Setiap lab mencakup:
- **Tujuan pembelajaran jelas** - Apa yang akan Anda capai
- **Instruksi langkah demi langkah** - Panduan implementasi terperinci
- **Contoh kode** - Sampel kerja dengan penjelasan
- **Latihan** - Kesempatan praktik langsung
- **Panduan pemecahan masalah** - Masalah umum dan solusi
- **Sumber daya tambahan** - Bacaan dan eksplorasi lebih lanjut

### Pemeriksaan Prasyarat

Sebelum memulai setiap lab, Anda akan menemukan:
- **Pengetahuan yang dibutuhkan** - Apa yang harus Anda ketahui sebelumnya
- **Validasi pengaturan** - Cara memverifikasi lingkungan Anda
- **Perkiraan waktu** - Perkiraan waktu penyelesaian
- **Hasil pembelajaran** - Apa yang akan Anda ketahui setelah selesai

### Jalur Pembelajaran yang Direkomendasikan

Pilih jalur berdasarkan tingkat pengalaman Anda:

#### 🟢 **Jalur Pemula** (Baru di MCP)
1. Pastikan telah menyelesaikan 0-10 dari [MCP untuk Pemula](https://aka.ms/mcp-for-beginners) terlebih dahulu
2. Selesaikan lab 00-03 untuk memperkuat dasar Anda
3. Ikuti lab 04-06 untuk latihan pembangunan langsung
4. Coba lab 07-09 untuk penggunaan praktis

#### 🟡 **Jalur Menengah** (Pengalaman MCP Sedang)
1. Tinjau lab 00-01 untuk konsep spesifik database
2. Fokus pada lab 02-06 untuk implementasi
3. Dalami lab 07-12 untuk fitur lanjutan

#### 🔴 **Jalur Lanjutan** (Berpengalaman MCP)
1. Cepat baca lab 00-03 untuk konteks
2. Fokus pada lab 04-09 untuk integrasi database
3. Konsentrasikan pada lab 10-12 untuk deployment produksi

## 🛠️ Cara Menggunakan Jalur Pembelajaran Ini Secara Efektif

### Pembelajaran Berurutan (Disarankan)

Kerjakan lab sesuai urutan untuk pemahaman menyeluruh:

1. **Baca ikhtisar** - Pahami apa yang akan Anda pelajari
2. **Periksa prasyarat** - Pastikan Anda memiliki pengetahuan diperlukan
3. **Ikuti panduan langkah-demi-langkah** - Implementasikan saat belajar
4. **Selesaikan latihan** - Perkuat pemahaman Anda
5. **Tinjau poin utama** - Perkuat hasil pembelajaran

### Pembelajaran Terarah

Jika Anda memerlukan keterampilan spesifik:

- **Integrasi Database**: Fokus pada lab 04-06
- **Implementasi Keamanan**: Fokus pada lab 02, 08, 12
- **AI/Pencarian Semantik**: Dalami lab 07
- **Deployment Produksi**: Pelajari lab 10-12

### Latihan Praktik

Setiap lab mencakup:
- **Contoh kode yang dapat dijalankan** - Salin, modifikasi, dan eksperimen
- **Skenario dunia nyata** - Kasus penggunaan analitik ritel praktis
- **Kompleksitas progresif** - Membangun dari sederhana ke lanjutan
- **Langkah validasi** - Verifikasi implementasi Anda berfungsi

## 🌟 Komunitas dan Dukungan

### Dapatkan Bantuan

- **Azure AI Discord**: [Gabung untuk dukungan ahli](https://discord.com/invite/ByRwuEEgH4)
- **Repo GitHub dan Contoh Implementasi**: [Contoh Deployment dan Sumber Daya](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **Komunitas MCP**: [Gabung diskusi MCP yang lebih luas](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Siap Memulai?

Mulailah perjalanan Anda dengan **[Lab 00: Pengantar Integrasi Database MCP](./00-Introduction/README.md)**

---

*Kuasa membangun server MCP siap produksi dengan integrasi database melalui pengalaman pembelajaran praktis dan komprehensif ini.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk memberikan terjemahan yang akurat, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidaktepatan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan jasa penerjemah profesional manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->