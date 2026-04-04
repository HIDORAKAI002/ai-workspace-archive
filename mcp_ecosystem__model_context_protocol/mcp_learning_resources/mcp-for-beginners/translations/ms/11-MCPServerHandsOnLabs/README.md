# 🚀 Pelayan MCP dengan PostgreSQL - Panduan Pembelajaran Lengkap

## 🧠 Gambaran Keseluruhan Laluan Pembelajaran Integrasi Pangkalan Data MCP

Panduan pembelajaran menyeluruh ini mengajar anda cara membina **pelayan Protokol Konteks Model (MCP)** yang boleh digunakan dalam pengeluaran dan berintegrasi dengan pangkalan data melalui pelaksanaan analitik runcit yang praktikal. Anda akan mempelajari corak tahap perusahaan termasuk **Keselamatan Tahap Baris (RLS)**, **pencarian semantik**, **integrasi Azure AI**, dan **akses data berbilang penyewa**.

Sama ada anda seorang pembangun backend, jurutera AI, atau arkitek data, panduan ini menyediakan pembelajaran berstruktur dengan contoh dunia sebenar dan latihan praktikal yang membimbing anda melalui pelayan MCP https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail berikut.

## 🔗 Sumber Rasmi MCP

- 📘 [Dokumentasi MCP](https://modelcontextprotocol.io/) – Tutorial terperinci dan panduan pengguna
- 📜 [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Seni bina protokol dan rujukan teknikal
- 🧑‍💻 [Repositori GitHub MCP](https://github.com/modelcontextprotocol) – SDK, alat, dan contoh kod sumber terbuka
- 🌐 [Komuniti MCP](https://github.com/orgs/modelcontextprotocol/discussions) – Sertai perbincangan dan sumbang kepada komuniti
- 🔒 [OWASP Top 10 MCP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Amalan terbaik keselamatan dan mitigasi risiko

## 🧭 Laluan Pembelajaran Integrasi Pangkalan Data MCP

### 📚 Struktur Pembelajaran Lengkap untuk https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Makmal | Topik | Penerangan | Pautan |
|--------|-------|------------|--------|
| **Lab 1-3: Asas** | | | |
| 00 | [Pengenalan kepada Integrasi Pangkalan Data MCP](./00-Introduction/README.md) | Gambaran keseluruhan MCP dengan integrasi pangkalan data dan kes penggunaan analitik runcit | [Mula Di Sini](./00-Introduction/README.md) |
| 01 | [Konsep Teras Seni Bina](./01-Architecture/README.md) | Memahami seni bina pelayan MCP, lapisan pangkalan data, dan corak keselamatan | [Pelajari](./01-Architecture/README.md) |
| 02 | [Keselamatan dan Berbilang Penyewa](./02-Security/README.md) | Keselamatan Tahap Baris, pengesahan, dan akses data berbilang penyewa | [Pelajari](./02-Security/README.md) |
| 03 | [Persediaan Persekitaran](./03-Setup/README.md) | Menyediakan persekitaran pembangunan, Docker, sumber Azure | [Pasang](./03-Setup/README.md) |
| **Lab 4-6: Membina Pelayan MCP** | | | |
| 04 | [Reka Bentuk Pangkalan Data dan Skema](./04-Database/README.md) | Penyediaan PostgreSQL, reka bentuk skema runcit, dan data sampel | [Bina](./04-Database/README.md) |
| 05 | [Pelaksanaan Pelayan MCP](./05-MCP-Server/README.md) | Membina pelayan FastMCP dengan integrasi pangkalan data | [Bina](./05-MCP-Server/README.md) |
| 06 | [Pembangunan Alat](./06-Tools/README.md) | Mewujudkan alat pertanyaan pangkalan data dan introspeksi skema | [Bina](./06-Tools/README.md) |
| **Lab 7-9: Ciri-ciri Lanjutan** | | | |
| 07 | [Integrasi Pencarian Semantik](./07-Semantic-Search/README.md) | Melaksanakan pembentukan vektor dengan Azure OpenAI dan pgvector | [Maju](./07-Semantic-Search/README.md) |
| 08 | [Ujian dan Penyahpepijatan](./08-Testing/README.md) | Strategi ujian, alat penyahpepijatan, dan pendekatan pengesahan | [Uji](./08-Testing/README.md) |
| 09 | [Integrasi VS Code](./09-VS-Code/README.md) | Menyediakan integrasi VS Code MCP dan penggunaan Chat AI | [Gabungkan](./09-VS-Code/README.md) |
| **Lab 10-12: Pengeluaran dan Amalan Terbaik** | | | |
| 10 | [Strategi Pengeluaran](./10-Deployment/README.md) | Pengeluaran Docker, Aplikasi Kontena Azure, dan pertimbangan penskalaan | [Lancar](./10-Deployment/README.md) |
| 11 | [Pemantauan dan Kebolehlihatan](./11-Monitoring/README.md) | Application Insights, pencatatan, pemantauan prestasi | [Pantau](./11-Monitoring/README.md) |
| 12 | [Amalan Terbaik dan Pengoptimuman](./12-Best-Practices/README.md) | Pengoptimuman prestasi, pengukuhan keselamatan, dan petua pengeluaran | [Optimumkan](./12-Best-Practices/README.md) |

### 💻 Apa yang Akan Anda Bina

Menjelang akhir laluan pembelajaran ini, anda akan membina **Pelayan MCP Analitik Runcit Zava** lengkap yang mempunyai:

- **Pangkalan data runcit berbilang jadual** dengan pesanan pelanggan, produk, dan inventori
- **Keselamatan Tahap Baris** untuk pengasingan data berdasarkan kedai
- **Pencarian produk semantik** menggunakan pembentukan Azure OpenAI
- **Integrasi Chat AI VS Code** untuk pertanyaan bahasa semula jadi
- **Pengeluaran sedia digunakan** dengan Docker dan Azure
- **Pemantauan menyeluruh** dengan Application Insights

## 🎯 Prasyarat untuk Pembelajaran

Untuk memanfaatkan sepenuhnya laluan pembelajaran ini, anda harus mempunyai:

- **Pengalaman Pengaturcaraan**: Kefahaman tentang Python (digalakkan) atau bahasa setara
- **Pengetahuan Pangkalan Data**: Pemahaman asas SQL dan pangkalan data hubungan
- **Konsep API**: Memahami REST API dan konsep HTTP
- **Alat Pembangunan**: Pengalaman menggunakan command line, Git, dan penyunting kod
- **Asas Awan**: (Pilihan) Pengetahuan asas Azure atau platform awan setara
- **Pengalaman Docker**: (Pilihan) Memahami konsep pengcontaineran

### Alat Diperlukan

- **Docker Desktop** - Untuk menjalankan PostgreSQL dan pelayan MCP
- **Azure CLI** - Untuk pelaksanaan sumber awan
- **VS Code** - Untuk pembangunan dan integrasi MCP
- **Git** - Untuk kawalan versi
- **Python 3.8+** - Untuk pembangunan pelayan MCP

## 📚 Panduan Belajar & Sumber

Laluan pembelajaran ini merangkumi sumber menyeluruh untuk membantu anda bergerak dengan berkesan:

### Panduan Belajar

Setiap makmal termasuk:
- **Objektif pembelajaran jelas** - Apa yang anda akan capai
- **Arahan langkah demi langkah** - Panduan pelaksanaan terperinci
- **Contoh kod** - Sampel berfungsi dengan penjelasan
- **Latihan** - Peluang amali
- **Panduan penyelesaian masalah** - Isu biasa dan penyelesaian
- **Sumber tambahan** - Bacaan dan penjelajahan lanjut

### Semakan Prasyarat

Sebelum memulakan setiap makmal, anda akan temui:
- **Pengetahuan diperlukan** - Apa yang anda perlu tahu terlebih dahulu
- **Pengesahan persediaan** - Cara mengesahkan persekitaran anda
- **Anggaran masa** - Tempoh dijangka selesai
- **Hasil pembelajaran** - Apa yang anda ketahui selepas selesai

### Laluan Pembelajaran Disyorkan

Pilih laluan berdasarkan tahap pengalaman anda:

#### 🟢 **Laluan Pemula** (Baru dengan MCP)
1. Pastikan anda telah menamatkan 0-10 [MCP untuk Pemula](https://aka.ms/mcp-for-beginners) terlebih dahulu
2. Lengkapkan makmal 00-03 untuk mengukuhkan asas anda
3. Ikuti makmal 04-06 untuk pembangunan amali
4. Cuba makmal 07-09 untuk penggunaan praktikal

#### 🟡 **Laluan Pertengahan** (Sedikit Pengalaman MCP)
1. Semak makmal 00-01 untuk konsep khusus pangkalan data
2. Fokus pada makmal 02-06 untuk pelaksanaan
3. Selami makmal 07-12 untuk ciri-ciri lanjutan

#### 🔴 **Laluan Lanjutan** (Berpengalaman dengan MCP)
1. Lihat ringkas makmal 00-03 untuk konteks
2. Fokus makmal 04-09 untuk integrasi pangkalan data
3. Tumpu makmal 10-12 untuk pengeluaran

## 🛠️ Cara Menggunakan Laluan Pembelajaran Ini Secara Berkesan

### Pembelajaran Berturutan (Disyorkan)

Ikuti makmal mengikut turutan untuk kefahaman menyeluruh:

1. **Baca gambaran keseluruhan** - Fahami apa yang anda akan pelajari
2. **Semak prasyarat** - Pastikan anda mempunyai pengetahuan diperlukan
3. **Ikuti panduan langkah demi langkah** - Laksanakan sambil belajar
4. **Selesaikan latihan** - Kukuhkan pemahaman anda
5. **Tinjau perkara utama** - Tetapkan hasil pembelajaran

### Pembelajaran Sasaran

Jika anda memerlukan kemahiran khusus:

- **Integrasi Pangkalan Data**: Fokus pada makmal 04-06
- **Pelaksanaan Keselamatan**: Fokus makmal 02, 08, 12
- **AI/Pencarian Semantik**: Selami makmal 07
- **Pengeluaran**: Pelajari makmal 10-12

### Latihan Praktikal

Setiap makmal termasuk:
- **Contoh kod berfungsi** - Salin, ubahsuai, dan eksperimen
- **Senario dunia sebenar** - Kes penggunaan analitik runcit praktikal
- **Kerumitan berperingkat** - Membina dari mudah ke lanjutan
- **Langkah pengesahan** - Sahkan pelaksanaan berfungsi

## 🌟 Komuniti dan Sokongan

### Dapatkan Bantuan

- **Azure AI Discord**: [Sertai untuk sokongan pakar](https://discord.com/invite/ByRwuEEgH4)
- **Repo GitHub dan Sampel Pelaksanaan**: [Sampel Pengeluaran dan Sumber](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **Komuniti MCP**: [Sertai perbincangan MCP yang lebih luas](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Sedia untuk Bermula?

Mulakan perjalanan anda dengan **[Lab 00: Pengenalan kepada Integrasi Pangkalan Data MCP](./00-Introduction/README.md)**

---

*Kuasi membina pelayan MCP sedia pengeluaran dengan integrasi pangkalan data melalui pengalaman pembelajaran praktikal dan menyeluruh ini.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil perhatian bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disarankan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->