# Pendahuluan Integrasi Database MCP

## 🎯 Apa yang Dicakup Lab Ini

Lab pengantar ini memberikan gambaran komprehensif tentang membangun server Model Context Protocol (MCP) dengan integrasi database. Anda akan memahami kasus bisnis, arsitektur teknis, dan aplikasi dunia nyata melalui penggunaan analitik Zava Retail di https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Ikhtisar

**Model Context Protocol (MCP)** memungkinkan asisten AI mengakses dan berinteraksi secara aman dengan sumber data eksternal secara real-time. Ketika digabungkan dengan integrasi database, MCP membuka kemampuan kuat untuk aplikasi AI berbasis data.

Jalur pembelajaran ini mengajarkan Anda membangun server MCP siap produksi yang menghubungkan asisten AI ke data penjualan ritel melalui PostgreSQL, menerapkan pola perusahaan seperti Keamanan Level Baris, pencarian semantik, dan akses data multi-penyewa.

## Tujuan Pembelajaran

Setelah menyelesaikan lab ini, Anda akan mampu:

- **Mendefinisikan** Model Context Protocol dan manfaat inti untuk integrasi database  
- **Mengidentifikasi** komponen utama arsitektur server MCP dengan database  
- **Memahami** kasus penggunaan Zava Retail dan kebutuhan bisnisnya  
- **Mengenali** pola perusahaan untuk akses database yang aman dan skalabel  
- **Mendaftar** alat dan teknologi yang digunakan sepanjang jalur pembelajaran ini  

## 🧭 Tantangan: AI Bertemu Data Dunia Nyata

### Keterbatasan AI Tradisional

Asisten AI modern sangat kuat namun menghadapi batasan signifikan saat bekerja dengan data bisnis dunia nyata:

| **Tantangan** | **Deskripsi** | **Dampak Bisnis** |
|---------------|---------------|-------------------|
| **Pengetahuan Statis** | Model AI dilatih pada dataset tetap tidak bisa mengakses data bisnis saat ini | Wawasan usang, peluang terlewatkan |
| **Silos Data** | Informasi terkunci di database, API, dan sistem yang tidak dapat dijangkau AI | Analisis tidak lengkap, alur kerja terfragmentasi |
| **Kendala Keamanan** | Akses database langsung menimbulkan kekhawatiran keamanan dan kepatuhan | Penyebaran terbatas, persiapan data manual |
| **Query Kompleks** | Pengguna bisnis membutuhkan pengetahuan teknis untuk mengambil wawasan data | Adopsi berkurang, proses tidak efisien |

### Solusi MCP

Model Context Protocol mengatasi tantangan ini dengan menyediakan:

- **Akses Data Real-time**: Asisten AI mengquery database dan API langsung  
- **Integrasi Aman**: Akses terkendali dengan otentikasi dan izin  
- **Antarmuka Bahasa Alami**: Pengguna bisnis mengajukan pertanyaan dengan bahasa sehari-hari  
- **Protokol Standar**: Berfungsi di berbagai platform dan alat AI  

## 🏪 Kenalkan Zava Retail: Studi Kasus Pembelajaran Kita https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Sepanjang jalur pembelajaran ini, kita akan membangun server MCP untuk **Zava Retail**, rantai ritel DIY fiksi dengan banyak lokasi toko. Skenario realistis ini menunjukkan implementasi MCP kelas perusahaan.

### Konteks Bisnis

**Zava Retail** mengoperasikan:  
- **8 toko fisik** di seluruh negara bagian Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 toko online** untuk penjualan e-commerce  
- **Katalog produk beragam** termasuk alat, perangkat keras, perlengkapan taman, dan bahan bangunan  
- **Manajemen bertingkat** dengan manajer toko, manajer regional, dan eksekutif  

### Kebutuhan Bisnis

Manajer toko dan eksekutif memerlukan analitik bertenaga AI untuk:

1. **Menganalisis kinerja penjualan** di berbagai toko dan periode waktu  
2. **Melacak tingkat inventaris** dan mengidentifikasi kebutuhan restock  
3. **Memahami perilaku pelanggan** dan pola pembelian  
4. **Menemukan wawasan produk** lewat pencarian semantik  
5. **Menghasilkan laporan** dengan query bahasa alami  
6. **Mempertahankan keamanan data** dengan kontrol akses berbasis peran  

### Kebutuhan Teknis

Server MCP harus menyediakan:

- **Akses data multi-penyewa** dimana manajer toko hanya melihat data tokonya  
- **Query fleksibel** mendukung operasi SQL kompleks  
- **Pencarian semantik** untuk penemuan produk dan rekomendasi  
- **Data real-time** mencerminkan kondisi bisnis saat ini  
- **Otentikasi aman** dengan keamanan level baris  
- **Arsitektur skalabel** mendukung banyak pengguna bersamaan  

## 🏗️ Ikhtisar Arsitektur Server MCP

Server MCP kami mengimplementasikan arsitektur berlapis yang dioptimalkan untuk integrasi database:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```
  
### Komponen Utama

#### **1. Lapisan Server MCP**  
- **FastMCP Framework**: Implementasi server MCP Python modern  
- **Registrasi Alat**: Definisi alat deklaratif dengan keamanan tipe  
- **Konteks Permintaan**: Identitas pengguna dan manajemen sesi  
- **Penanganan Error**: Manajemen error dan logging yang tangguh  

#### **2. Lapisan Integrasi Database**  
- **Connection Pooling**: Manajemen koneksi asyncpg efisien  
- **Schema Provider**: Penemuan skema tabel dinamis  
- **Query Executor**: Eksekusi SQL aman dengan konteks RLS  
- **Manajemen Transaksi**: Kepatuhan ACID dan penanganan rollback  

#### **3. Lapisan Keamanan**  
- **Keamanan Level Baris**: PostgreSQL RLS untuk isolasi data multi-penyewa  
- **Identitas Pengguna**: Otentikasi dan otorisasi manajer toko  
- **Kontrol Akses**: Izin terperinci dan jejak audit  
- **Validasi Input**: Pencegahan SQL injection dan validasi query  

#### **4. Lapisan Peningkatan AI**  
- **Pencarian Semantik**: Embedding vektor untuk penemuan produk  
- **Integrasi Azure OpenAI**: Generasi embedding teks  
- **Algoritme Kemiripan**: Pencarian kemiripan kosinus pgvector  
- **Optimasi Pencarian**: Pengindeksan dan penyetelan kinerja  

## 🔧 Tumpukan Teknologi

### Teknologi Inti

| **Komponen** | **Teknologi** | **Tujuan** |
|--------------|---------------|------------|
| **Framework MCP** | FastMCP (Python) | Implementasi server MCP modern |
| **Database** | PostgreSQL 17 + pgvector | Data relasional dengan pencarian vektor |
| **Layanan AI** | Azure OpenAI | Embedding teks dan model bahasa |
| **Containerisasi** | Docker + Docker Compose | Lingkungan pengembangan |
| **Platform Cloud** | Microsoft Azure | Penyebaran produksi |
| **Integrasi IDE** | VS Code | Chat AI dan alur kerja pengembangan |

### Alat Pengembangan

| **Alat** | **Tujuan** |
|----------|------------|
| **asyncpg** | Driver PostgreSQL performa tinggi |
| **Pydantic** | Validasi dan serialisasi data |
| **Azure SDK** | Integrasi layanan cloud |
| **pytest** | Kerangka pengujian |
| **Docker** | Containerisasi dan penyebaran |

### Tumpukan Produksi

| **Layanan** | **Sumber Daya Azure** | **Tujuan** |
|-------------|---------------------|------------|
| **Database** | Azure Database for PostgreSQL | Layanan database terkelola |
| **Container** | Azure Container Apps | Hosting container tanpa server |
| **Layanan AI** | Microsoft Foundry | Model dan endpoint OpenAI |
| **Monitoring** | Application Insights | Observabilitas dan diagnostik |
| **Keamanan** | Azure Key Vault | Manajemen rahasia dan konfigurasi |

## 🎬 Skenario Penggunaan Dunia Nyata

Mari jelajahi bagaimana pengguna berbeda berinteraksi dengan server MCP kami:

### Skenario 1: Review Kinerja Manajer Toko

**Pengguna**: Sarah, Manajer Toko Seattle  
**Tujuan**: Menganalisis kinerja penjualan kuartal terakhir

**Query Bahasa Alami**:
> "Tunjukkan 10 produk teratas berdasarkan pendapatan untuk toko saya di kuartal 4 2024"

**Apa yang Terjadi**:
1. VS Code AI Chat mengirim query ke server MCP  
2. Server MCP mengidentifikasi konteks toko Sarah (Seattle)  
3. Kebijakan RLS menyaring data hanya untuk toko Seattle  
4. Query SQL dibuat dan dijalankan  
5. Hasil diformat dan dikembalikan ke AI Chat  
6. AI memberikan analisis dan wawasan  

### Skenario 2: Penemuan Produk dengan Pencarian Semantik

**Pengguna**: Mike, Manajer Inventori  
**Tujuan**: Menemukan produk mirip permintaan pelanggan

**Query Bahasa Alami**:
> "Produk apa yang kami jual yang mirip dengan 'konektor listrik tahan air untuk penggunaan luar ruangan'?"

**Apa yang Terjadi**:
1. Query diproses oleh alat pencarian semantik  
2. Azure OpenAI menghasilkan embedding vektor  
3. pgvector melakukan pencarian kemiripan  
4. Produk terkait diurutkan berdasarkan relevansi  
5. Hasil mencakup detail produk dan ketersediaan  
6. AI menyarankan alternatif dan peluang bundling  

### Skenario 3: Analitik Lintas Toko

**Pengguna**: Jennifer, Manajer Regional  
**Tujuan**: Membandingkan kinerja semua toko

**Query Bahasa Alami**:
> "Bandingkan penjualan berdasarkan kategori untuk semua toko dalam 6 bulan terakhir"

**Apa yang Terjadi**:
1. Konteks RLS diset untuk akses manajer regional  
2. Query multi-toko kompleks dibuat  
3. Data diagregasi dari berbagai lokasi toko  
4. Hasil mencakup tren dan perbandingan  
5. AI mengidentifikasi wawasan dan rekomendasi  

## 🔒 Keamanan dan Penyelaman Mendalam Multi-Tenancy

Implementasi kami memprioritaskan keamanan kelas perusahaan:

### Keamanan Level Baris (RLS)

PostgreSQL RLS memastikan isolasi data:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```
  
### Manajemen Identitas Pengguna

Setiap koneksi MCP mencakup:  
- **ID Manajer Toko**: Identifikasi unik untuk konteks RLS  
- **Penetapan Peran**: Izin dan tingkat akses  
- **Manajemen Sesi**: Token otentikasi aman  
- **Logging Audit**: Riwayat akses lengkap  

### Perlindungan Data

Banyak lapisan keamanan:  
- **Enkripsi Koneksi**: TLS untuk semua koneksi database  
- **Pencegahan SQL Injection**: Hanya query berparameter  
- **Validasi Input**: Validasi permintaan menyeluruh  
- **Penanganan Error**: Tidak ada data sensitif dalam pesan error  

## 🎯 Poin Penting

Setelah menyelesaikan pengantar ini, Anda harus memahami:

✅ **Nilai MCP**: Bagaimana MCP menjembatani asisten AI dan data dunia nyata  
✅ **Konteks Bisnis**: Kebutuhan dan tantangan Zava Retail  
✅ **Ikhtisar Arsitektur**: Komponen utama dan interaksinya  
✅ **Tumpukan Teknologi**: Alat dan framework yang digunakan  
✅ **Model Keamanan**: Akses data multi-penyewa dan perlindungan  
✅ **Pola Penggunaan**: Skenario query dan alur kerja dunia nyata  

## 🚀 Selanjutnya

Siap mendalami lebih jauh? Lanjutkan dengan:

**[Lab 01: Konsep Arsitektur Inti](../01-Architecture/README.md)**

Pelajari pola arsitektur server MCP, prinsip desain database, dan implementasi teknis rinci yang menggerakkan solusi analitik ritel kami.

## 📚 Sumber Daya Tambahan

### Dokumentasi MCP
- [Spesifikasi MCP](https://modelcontextprotocol.io/docs/) - Dokumentasi protokol resmi  
- [MCP untuk Pemula](https://aka.ms/mcp-for-beginners) - Panduan pembelajaran MCP lengkap  
- [Dokumentasi FastMCP](https://github.com/modelcontextprotocol/python-sdk) - Dokumentasi SDK Python  

### Integrasi Database
- [Dokumentasi PostgreSQL](https://www.postgresql.org/docs/) - Referensi lengkap PostgreSQL  
- [Panduan pgvector](https://github.com/pgvector/pgvector) - Dokumentasi ekstensi vektor  
- [Keamanan Level Baris](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Panduan RLS PostgreSQL  

### Layanan Azure
- [Dokumentasi Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integrasi layanan AI  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Layanan database terkelola  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Container tanpa server  

---

**Penafian**: Ini adalah latihan pembelajaran menggunakan data ritel fiksi. Selalu ikuti kebijakan tata kelola data dan keamanan organisasi Anda saat mengimplementasikan solusi serupa di lingkungan produksi.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->