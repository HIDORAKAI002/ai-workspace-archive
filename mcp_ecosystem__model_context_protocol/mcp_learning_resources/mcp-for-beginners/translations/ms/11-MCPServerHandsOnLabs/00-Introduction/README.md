# Pengenalan kepada Integrasi Pangkalan Data MCP

## 🎯 Apa Yang Diliputi Oleh Makmal Ini

Makmal pengenalan ini menyediakan gambaran menyeluruh tentang membina pelayan Model Context Protocol (MCP) dengan integrasi pangkalan data. Anda akan memahami kes perniagaan, seni bina teknikal, dan aplikasi dunia nyata melalui kes penggunaan analitik Zava Retail di https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Gambaran Keseluruhan

**Model Context Protocol (MCP)** membolehkan pembantu AI mengakses dan berinteraksi dengan sumber data luaran secara masa nyata dengan selamat. Apabila digabungkan dengan integrasi pangkalan data, MCP membuka keupayaan yang kuat untuk aplikasi AI berasaskan data.

Jalur pembelajaran ini mengajar anda membina pelayan MCP sedia pengeluaran yang menyambungkan pembantu AI kepada data jualan runcit melalui PostgreSQL, melaksanakan corak perusahaan seperti Keselamatan Peringkat Baris, carian semantik, dan akses data berbilang penyewa.

## Objektif Pembelajaran

Menjelang akhir makmal ini, anda akan dapat:

- **Mentakrifkan** Model Context Protocol dan manfaat terasnya untuk integrasi pangkalan data  
- **Mengenal pasti** komponen utama seni bina pelayan MCP dengan pangkalan data  
- **Memahami** kes penggunaan Zava Retail dan keperluan perniagaannya  
- **Mengenali** corak perusahaan untuk akses pangkalan data yang selamat dan boleh skala  
- **Menyenaraikan** alat dan teknologi yang digunakan sepanjang jalur pembelajaran ini  

## 🧭 Cabaran: AI Bertemu Data Dunia Sebenar

### Kekangan AI Tradisional

Pembantu AI moden sangat berkuasa tetapi menghadapi kekangan ketara apabila bekerja dengan data perniagaan dunia sebenar:

| **Cabaran** | **Perihalan** | **Impak Perniagaan** |
|-------------|---------------|---------------------|
| **Pengetahuan Statik** | Model AI yang dilatih pada set data tetap tidak boleh mengakses data perniagaan terkini | Wawasan lapuk, peluang terlepas |
| **Silo Data** | Maklumat terkunci dalam pangkalan data, API, dan sistem yang AI tidak boleh capaikan | Analisis tidak lengkap, aliran kerja terpecah-pecah |
| **Sekatan Keselamatan** | Akses pangkalan data langsung menimbulkan kebimbangan keselamatan dan pematuhan | Penyebaran terhad, penyediaan data manual |
| **Pertanyaan Kompleks** | Pengguna perniagaan perlu pengetahuan teknikal untuk mendapatkan wawasan data | Penggunaan berkurangan, proses tidak cekap |

### Penyelesaian MCP

Model Context Protocol menangani cabaran ini dengan menyediakan:

- **Akses Data Masa Nyata**: Pembantu AI membuat pertanyaan ke pangkalan data dan API secara langsung  
- **Integrasi Selamat**: Akses terkawal dengan pengesahan dan kebenaran  
- **Antara Muka Bahasa Semula Jadi**: Pengguna perniagaan bertanya soalan dalam bahasa Inggeris biasa  
- **Protokol Standard**: Berfungsi merentasi platform dan alat AI yang berbeza  

## 🏪 Kenali Zava Retail: Kajian Kes Pembelajaran Kami https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Sepanjang jalur pembelajaran ini, kita akan membina pelayan MCP untuk **Zava Retail**, sebuah rangkaian runcit DIY rekaan dengan beberapa lokasi kedai. Senario realistik ini menunjukkan pelaksanaan MCP tahap perusahaan.

### Konteks Perniagaan

**Zava Retail** mengendalikan:
- **8 kedai fizikal** di seluruh negeri Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 kedai dalam talian** untuk jualan e-dagang  
- **Katalog produk pelbagai** termasuk alat, perkakasan, bekalan taman, dan bahan binaan  
- **Pengurusan berbilang peringkat** dengan pengurus kedai, pengurus wilayah, dan eksekutif  

### Keperluan Perniagaan

Pengurus kedai dan eksekutif memerlukan analitik berkuasa AI untuk:

1. **Menganalisis prestasi jualan** merentasi kedai dan tempoh masa  
2. **Menjejaki tahap inventori** dan mengenal pasti keperluan pengisian semula  
3. **Memahami tingkah laku pelanggan** dan corak pembelian  
4. **Menemui wawasan produk** melalui carian semantik  
5. **Menjana laporan** dengan pertanyaan bahasa semula jadi  
6. **Mengekalkan keselamatan data** dengan kawalan akses berasaskan peranan  

### Keperluan Teknikal

Pelayan MCP mesti menyediakan:

- **Akses data berbilang penyewa** di mana pengurus kedai hanya melihat data kedainya sahaja  
- **Pertanyaan fleksibel** menyokong operasi SQL kompleks  
- **Cari semantik** untuk penemuan produk dan cadangan  
- **Data masa nyata** mencerminkan keadaan perniagaan semasa  
- **Pengesahan selamat** dengan keselamatan peringkat baris  
- **Seni bina boleh skala** menyokong pelbagai pengguna serentak  

## 🏗️ Gambaran Seni Bina Pelayan MCP

Pelayan MCP kami melaksanakan seni bina berlapis yang dioptimumkan untuk integrasi pangkalan data:

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

#### **1. Lapisan Pelayan MCP**
- **Rangka Kerja FastMCP**: Pelaksanaan pelayan MCP Python moden  
- **Pendaftaran Alat**: Definisi alat deklaratif dengan keselamatan jenis  
- **Konteks Permintaan**: Identiti pengguna dan pengurusan sesi  
- **Pengendalian Ralat**: Pengurusan ralat dan pencatatan yang kukuh  

#### **2. Lapisan Integrasi Pangkalan Data**
- **Kumpulan Sambungan**: Pengurusan sambungan asyncpg yang cekap  
- **Penyedia Skema**: Penemuan skema jadual dinamik  
- **Pelaksana Pertanyaan**: Pelaksanaan SQL selamat dengan konteks RLS  
- **Pengurusan Transaksi**: Pematuhan ACID dan pengendalian rollback  

#### **3. Lapisan Keselamatan**
- **Keselamatan Peringkat Baris**: PostgreSQL RLS untuk pengasingan data berbilang penyewa  
- **Identiti Pengguna**: Pengesahan dan kebenaran pengurus kedai  
- **Kawalan Akses**: Kebenaran terperinci dan jejak audit  
- **Pengesahan Input**: Pencegahan suntikan SQL dan pengesahan pertanyaan  

#### **4. Lapisan Peningkatan AI**
- **Cari Semantik**: Vektor embedding untuk penemuan produk  
- **Integrasi Azure OpenAI**: Penjanaan embedding teks  
- **Algoritma Kesamaan**: Carian kesamaan kosinus pgvector  
- **Pengoptimuman Carian**: Pengindeksan dan penyelarasan prestasi  

## 🔧 Teknologi Digunakan

### Teknologi Teras

| **Komponen** | **Teknologi** | **Tujuan** |
|--------------|---------------|------------|
| **Rangka Kerja MCP** | FastMCP (Python) | Pelaksanaan pelayan MCP moden |
| **Pangkalan Data** | PostgreSQL 17 + pgvector | Data berelasi dengan carian vektor |
| **Perkhidmatan AI** | Azure OpenAI | Embedding teks dan model bahasa |
| **Kontena** | Docker + Docker Compose | Persekitaran pembangunan |
| **Platform Awan** | Microsoft Azure | Penyebaran pengeluaran |
| **Integrasi IDE** | VS Code | Chat AI dan aliran kerja pembangunan |

### Alat Pembangunan

| **Alat** | **Tujuan** |
|----------|------------|
| **asyncpg** | Pemandu PostgreSQL berprestasi tinggi |
| **Pydantic** | Pengesahan dan penyerlahan data |
| **Azure SDK** | Integrasi perkhidmatan awan |
| **pytest** | Rangka kerja ujian |
| **Docker** | Kontena dan penyebaran |

### Stak Produksi

| **Perkhidmatan** | **Sumber Azure** | **Tujuan** |
|------------------|------------------|------------|
| **Pangkalan Data** | Azure Database for PostgreSQL | Perkhidmatan pangkalan data terurus |
| **Kontena** | Azure Container Apps | Hos kontena tanpa pelayan |
| **Perkhidmatan AI** | Microsoft Foundry | Model dan titik akhir OpenAI |
| **Pemantauan** | Application Insights | Kebolehlihatan dan diagnostik |
| **Keselamatan** | Azure Key Vault | Pengurusan rahsia dan konfigurasi |

## 🎬 Senario Penggunaan Dunia Sebenar

Mari kita teroka bagaimana pengguna berbeza berinteraksi dengan pelayan MCP kami:

### Senario 1: Semakan Prestasi Pengurus Kedai

**Pengguna**: Sarah, Pengurus Kedai Seattle  
**Matlamat**: Menganalisis prestasi jualan suku terakhir

**Pertanyaan Bahasa Semula Jadi**:  
> "Tunjukkan 10 produk teratas mengikut hasil bagi kedai saya di S4 2024"

**Apa Yang Berlaku**:  
1. Chat AI VS Code menghantar pertanyaan ke pelayan MCP  
2. Pelayan MCP mengenal pasti konteks kedai Sarah (Seattle)  
3. Polisi RLS menapis data hanya untuk kedai Seattle  
4. Pertanyaan SQL dijana dan dilaksanakan  
5. Keputusan diformatkan dan dihantar kembali ke Chat AI  
6. AI menyediakan analisis dan wawasan  

### Senario 2: Penemuan Produk dengan Carian Semantik

**Pengguna**: Mike, Pengurus Inventori  
**Matlamat**: Mencari produk serupa dengan permintaan pelanggan

**Pertanyaan Bahasa Semula Jadi**:  
> "Apakah produk yang kami jual yang serupa dengan 'penyambung elektrik kalis air untuk kegunaan luar'?"

**Apa Yang Berlaku**:  
1. Pertanyaan diproses oleh alat carian semantik  
2. Azure OpenAI menjana vektor embedding  
3. pgvector melakukan carian kesamaan  
4. Produk berkaitan diperingkatkan mengikut relevansi  
5. Keputusan termasuk butiran produk dan ketersediaan  
6. AI mencadangkan alternatif dan peluang penyusunan set  

### Senario 3: Analitik Merentasi Kedai

**Pengguna**: Jennifer, Pengurus Wilayah  
**Matlamat**: Membandingkan prestasi merentasi semua kedai

**Pertanyaan Bahasa Semula Jadi**:  
> "Bandingkan jualan mengikut kategori untuk semua kedai dalam 6 bulan terakhir"

**Apa Yang Berlaku**:  
1. Konteks RLS ditetapkan untuk akses pengurus wilayah  
2. Pertanyaan mudah untuk beberapa kedai dijana  
3. Data diagregat merentasi lokasi kedai  
4. Keputusan termasuk tren dan perbandingan  
5. AI mengenal pasti wawasan dan cadangan  

## 🔒 Keselamatan dan Penyelaman Multi-Penyewa

Pelaksanaan kami mengutamakan keselamatan tahap perusahaan:

### Keselamatan Peringkat Baris (RLS)

PostgreSQL RLS memastikan pengasingan data:

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


### Pengurusan Identiti Pengguna

Setiap sambungan MCP termasuk:  
- **ID Pengurus Kedai**: Pengenal unik untuk konteks RLS  
- **Penetapan Peranan**: Kebenaran dan tahap akses  
- **Pengurusan Sesi**: Token pengesahan yang selamat  
- **Pencatatan Audit**: Sejarah akses lengkap  

### Perlindungan Data

Beberapa lapisan keselamatan:  
- **Penyulitan Sambungan**: TLS untuk semua sambungan pangkalan data  
- **Pencegahan Suntikan SQL**: Hanya pertanyaan berparameter  
- **Pengesahan Input**: Pengesahan permintaan menyeluruh  
- **Pengendalian Ralat**: Tiada data sensitif dalam mesej ralat  

## 🎯 Pengajaran Utama

Selepas menyelesaikan pengenalan ini, anda harus memahami:

✅ **Nilai MCP**: Bagaimana MCP menghubungkan pembantu AI dan data dunia nyata  
✅ **Konteks Perniagaan**: Keperluan dan cabaran Zava Retail  
✅ **Gambaran Seni Bina**: Komponen utama dan interaksinya  
✅ **Teknologi Digunakan**: Alat dan rangka kerja sepanjang jalur pembelajaran  
✅ **Model Keselamatan**: Akses data berbilang penyewa dan perlindungan  
✅ **Corak Penggunaan**: Senario pertanyaan dan aliran kerja dunia sebenar  

## 🚀 Apa Seterusnya

Sedia untuk mendalami lagi? Teruskan dengan:

**[Lab 01: Konsep Seni Bina Teras](../01-Architecture/README.md)**

Pelajari tentang corak seni bina pelayan MCP, prinsip reka bentuk pangkalan data, dan pelaksanaan teknikal terperinci yang menggerakkan penyelesaian analitik runcit kami.

## 📚 Sumber Tambahan

### Dokumentasi MCP
- [Spesifikasi MCP](https://modelcontextprotocol.io/docs/) - Dokumentasi protokol rasmi  
- [MCP untuk Pemula](https://aka.ms/mcp-for-beginners) - Panduan pembelajaran MCP menyeluruh  
- [Dokumentasi FastMCP](https://github.com/modelcontextprotocol/python-sdk) - Dokumentasi SDK Python  

### Integrasi Pangkalan Data
- [Dokumentasi PostgreSQL](https://www.postgresql.org/docs/) - Rujukan lengkap PostgreSQL  
- [Panduan pgvector](https://github.com/pgvector/pgvector) - Dokumentasi sambungan vektor  
- [Keselamatan Peringkat Baris](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Panduan RLS PostgreSQL  

### Perkhidmatan Azure
- [Dokumentasi Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integrasi perkhidmatan AI  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Perkhidmatan pangkalan data terurus  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Kontena tanpa pelayan  

---

**Penafian**: Ini adalah latihan pembelajaran menggunakan data runcit rekaan. Sentiasa ikuti dasar tadbir urus data dan keselamatan organisasi anda apabila melaksanakan penyelesaian serupa dalam persekitaran pengeluaran.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->