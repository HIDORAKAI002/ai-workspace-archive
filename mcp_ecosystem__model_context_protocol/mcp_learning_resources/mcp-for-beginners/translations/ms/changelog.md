# Changelog: Kurikulum MCP untuk Pemula

Dokumen ini berfungsi sebagai rekod semua perubahan penting yang dibuat pada kurikulum Model Context Protocol (MCP) untuk Pemula. Perubahan didokumentasikan secara urutan terbalik kronologi (perubahan terbaru dahulu).

## 5 Februari 2026

### Peningkatan Pengesahan dan Navigasi Seluruh Repositori

#### Kandungan Kurikulum Baru Ditambah

**Modul 03 - Mula Bermula**  
- **12-mcp-hosts/README.md**: Panduan menyeluruh baru untuk menyediakan hos MCP  
  - Contoh konfigurasi Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - Templat konfigurasi JSON untuk semua hos utama  
  - Jadual perbandingan jenis pengangkutan (stdio, SSE/HTTP, WebSocket)  
  - Penyelesaian masalah sambungan lazim  
  - Amalan keselamatan terbaik untuk konfigurasi hos

- **13-mcp-inspector/README.md**: Panduan debugging baru untuk MCP Inspector  
  - Kaedah pemasangan (npx, npm global, daripada sumber)  
  - Menyambung ke pelayan melalui stdio dan HTTP/SSE  
  - Alat ujian, sumber, dan aliran kerja arahan  
  - Integrasi VS Code dengan MCP Inspector  
  - Senario debugging biasa dengan penyelesaian

**Modul 04 - Pelaksanaan Praktikal**  
- **pagination/README.md**: Panduan pelaksanaan penomboran baru  
  - Corak penomboran berasaskan kursor dalam Python, TypeScript, Java  
  - Pengendalian penomboran di sisi klien  
  - Strategi reka bentuk kursor (tidak telus vs. berstruktur)  
  - Cadangan pengoptimuman prestasi

**Modul 05 - Topik Lanjutan**  
- **mcp-protocol-features/README.md**: Penerokaan mendalam ciri protokol baru  
  - Pelaksanaan pemberitahuan kemajuan  
  - Corak pembatalan permintaan  
  - Templat sumber dengan corak URI  
  - Pengurusan kitaran hayat pelayan  
  - Kawalan tahap pencatatan  
  - Corak pengendalian ralat dengan kod JSON-RPC

#### Pembetulan Navigasi (24+ fail dikemas kini)

**READMEs Modul Utama**  
 Kini pautan kepada kedua-dua pelajaran pertama DAN modul seterusnya

**Sub-fail 02-Security**  
- Kelima-lima dokumen keselamatan tambahan kini mempunyai navigasi "Apa Seterusnya":

**Fail 09-CaseStudy**  
- Semua fail kajian kes kini mempunyai navigasi berurutan:

**Makmal 10-StreamliningAI**  
Tambah seksyen Apa Seterusnya pada gambaran keseluruhan Modul 10 dan Modul 11

#### Pembetulan Kod dan Kandungan

**Kemas Kini SDK dan Kebergantungan**  
Betulkan versi openai kosong kepada `^4.95.0`  
Kemas kini SDK dari `^1.8.0` kepada `>=1.26.0`  
Kemas kini pin versi mcp kepada `>=1.26.0`

**Pembetulan Kod**  
Betulkan model tidak sah `gpt-4o-mini` kepada `gpt-4.1-mini`

**Pembetulan Kandungan**  
Betulkan pautan rosak `READMEmd` → `README.md`, betulkan tajuk kurikulum `Module 1-3` → `Module 0-3`, betulkan laluan sensitif huruf  
Buang kandungan pendua Kajian Kes 5 yang rosak

**Penambahbaikan Panduan Pemula**  
Tambah pengenalan yang sesuai, objektif pembelajaran, dan prasyarat untuk pemula

#### Kemas Kini Kurikulum

**README.md Utama**  
- Tambah entri 3.12 (Hos MCP), 3.13 (Pemeriksa MCP), 4.1 (Penomboran), 5.16 (Ciri Protokol) ke jadual kurikulum

**README Modul**  
Tambah pelajaran 12 dan 13 ke senarai pelajaran  
Tambah seksyen Panduan Praktikal dengan pautan penomboran  
Tambah pelajaran 5.15 (Pengangkutan Tersuai) dan 5.16 (Ciri Protokol)

**study_guide.md**  
- Kemas kini peta minda dengan semua topik baru: Persediaan Hos MCP, Pemeriksa MCP, Strategi Penomboran, Penerokaan Mendalam Ciri Protokol

## 28 Jan 2026

### Semakan Patuh Spesifikasi MCP 2025-11-25

#### Penambahbaikan Konsep Teras (01-CoreConcepts/)  
- **Primitive Klien Baru - Roots**: Tambah dokumentasi menyeluruh tentang primitive klien Roots, membolehkan pelayan memahami sempadan sistem fail dan kebenaran akses  
- **Anotasi Alat**: Tambah dokumentasi tentang anotasi tingkah laku alat (`readOnlyHint`, `destructiveHint`) untuk keputusan pelaksanaan alat yang lebih baik  
- **Pemanggilan Alat dalam Sampling**: Kemas kini dokumentasi Sampling untuk memasukkan parameter `tools` dan `toolChoice` bagi pemanggilan alat yang dikawal model semasa permintaan sampling  
- **Mod Elicitation URL**: Tambah dokumentasi tentang elicitation berasaskan URL untuk interaksi web luaran yang dimulakan pelayan  
- **Tugas (Eksperimen)**: Tambah seksyen baru yang mendokumentasikan ciri Tugas eksperimen untuk pembalut pelaksanaan tahan lama dan pengambilan hasil tangguh  
- **Sokongan Ikon**: Nyatakan bahawa alat, sumber, templat sumber, dan arahan kini boleh termasuk ikon sebagai metadata tambahan

#### Kemas Kini Dokumentasi  
- **README.md**: Tambah rujukan versi MCP Specification 2025-11-25 dan penjelasan penversian berasaskan tarikh  
- **study_guide.md**: Kemas kini peta kurikulum untuk memasukkan Tugas dan Anotasi Alat dalam seksyen Konsep Teras; kemas kini cap masa dokumen

#### Pengesahan Pematuhan Spesifikasi  
- **Versi Protokol**: Sahkan semua dokumentasi merujuk kepada MCP Specification 2025-11-25 terkini  
- **Pelarasan Seni Bina**: Sahkan ketepatan dokumentasi seni bina dua lapis (Lapisan Data + Lapisan Pengangkutan)  
- **Dokumentasi Primitif**: Sahkan primitive pelayan (Sumber, Arahan, Alat) dan primitive klien (Sampling, Elicitation, Logging, Roots)  
- **Mekanisme Pengangkutan**: Sahkan ketepatan dokumentasi pengangkutan STDIO dan HTTP boleh alir  
- **Panduan Keselamatan**: Sahkan keselarasan dengan dokumentasi Amalan Terbaik Keselamatan MCP terkini

#### Ciri Utama MCP 2025-11-25 Didokumentasi  
- **Penemuan OpenID Connect**: Penemuan pelayan pengesahan melalui OIDC  
- **Dokumen Metadata OAuth Client ID**: Mekanisme pendaftaran klien yang disyorkan  
- **JSON Schema 2020-12**: Dialek lalai untuk definisi skema MCP  
- **Sistem Tahap SDK**: Keperluan formal bagi sokongan dan penyelenggaraan ciri SDK  
- **Struktur Tadbir Urus**: Kumpulan Kerja dan Kumpulan Kepentingan formal dalam tadbir urus MCP

### Kemas Kini Dokumentasi Keselamatan Utama (02-Security/)

#### Integrasi Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)  
- **Sumber Latihan Praktikal Baru**: Tambah integrasi menyeluruh dengan [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) di seluruh dokumentasi keselamatan  
- **Liputan Laluan Ekspedisi**: Dokumentasikan kemajuan lengkap dari Base Camp ke Summit  
- **Pelarasan OWASP**: Semua panduan keselamatan kini memetakan kepada risiko Panduan Keselamatan MCP Azure OWASP

#### Integrasi OWASP MCP Top 10  
- **Seksien Baru**: Tambah jadual Risiko Keselamatan OWASP MCP Top 10 dengan mitigasi Azure kepada README Keselamatan utama  
- **Dokumentasi Berasaskan Risiko**: Kemas kini mcp-security-controls-2025.md dengan rujukan risiko OWASP MCP bagi setiap domain keselamatan  
- **Seni Bina Rujukan**: Pautan kepada seni bina rujukan dan corak pelaksanaan Panduan Keselamatan MCP Azure OWASP

#### Kemas Kini Fail Keselamatan  
- **README.md**: Tambah gambaran keseluruhan Bengkel Sherpa, jadual laluan ekspedisi, ringkasan risiko OWASP MCP Top 10, dan seksyen latihan praktikal  
- **mcp-security-controls-2025.md**: Kemas kini kepala dengan Februari 2026, tambah rujukan risiko OWASP (MCP01-MCP08), perbaiki ketidakseragaman versi spesifikasi  
- **mcp-security-best-practices-2025.md**: Tambah seksyen sumber Sherpa dan OWASP, kemas kini cap masa  
- **mcp-best-practices.md**: Tambah seksyen latihan praktikal dengan pautan Sherpa dan OWASP  
- **azure-content-safety-implementation.md**: Tambah rujukan OWASP MCP06, pelarasan Camp 3 Sherpa, dan seksyen sumber tambahan

#### Pautan Sumber Baru Ditambah  
- [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Halaman risiko OWASP MCP individu (MCP01-MCP10)

### Penyelarasan Spesifikasi MCP 2025-11-25 Seluruh Kurikulum

#### Modul 03 - Mula Bermula  
- **Dokumentasi SDK**: Tambah Go SDK ke senarai SDK rasmi; kemas kini semua rujukan SDK selaras dengan MCP Specification 2025-11-25  
- **Penjelasan Pengangkutan**: Kemas kini deskripsi pengangkutan STDIO dan Streaming HTTP dengan rujukan spes eksplisit

#### Modul 04 - Pelaksanaan Praktikal  
- **Kemas Kini SDK**: Tambah Go SDK; kemas kini senarai SDK dengan rujukan versi spesifikasi  
- **Spesifikasi Kebenaran**: Kemas kini pautan spesifikasi Kebenaran MCP ke versi 2025-11-25 terkini

#### Modul 05 - Topik Lanjutan  
- **Ciri Baru**: Tambah nota mengenai ciri baru MCP Specification 2025-11-25 (Tugas, Anotasi Alat, Mod Elicitation URL, Roots)  
- **Sumber Keselamatan**: Tambah pautan OWASP MCP Top 10 dan bengkel Sherpa ke rujukan tambahan

#### Modul 06 - Sumbangan Komuniti  
- **Senarai SDK**: Tambah Swift dan Rust SDK; kemas kini pautan spesifikasi ke 2025-11-25  
- **Rujukan Spesifikasi**: Kemas kini pautan MCP Specification ke URL spesifikasi langsung

#### Modul 07 - Pengajaran dari Penggunaan Awal  
- **Kemas Kini Sumber**: Tambah pautan MCP Specification 2025-11-25 dan OWASP MCP Top 10 ke sumber tambahan

#### Modul 08 - Amalan Terbaik  
- **Versi Spesifikasi**: Kemas kini rujukan MCP Specification ke 2025-11-25  
- **Sumber Keselamatan**: Tambah OWASP MCP Top 10 dan bengkel Sherpa ke rujukan tambahan

#### Modul 10 - Penyederhanaan Aliran Kerja AI  
- **Kemas Kini Lencana**: Tukar lencana versi MCP dari versi SDK (1.9.3) kepada versi spesifikasi (2025-11-25)  
- **Pautan Sumber**: Kemas kini pautan MCP Specification; tambah OWASP MCP Top 10

#### Modul 11 - Makmal Praktikal Pelayan MCP  
- **Rujukan Spesifikasi**: Kemas kini pautan MCP Specification ke versi 2025-11-25  
- **Sumber Keselamatan**: Tambah OWASP MCP Top 10 ke sumber rasmi

## 18 Disember 2025

### Kemas Kini Dokumentasi Keselamatan - MCP Specification 2025-11-25

#### Amalan Terbaik Keselamatan MCP (02-Security/mcp-best-practices.md) - Kemas Kini Versi Spesifikasi  
- **Kemas Kini Versi Protokol**: Kemas kini untuk merujuk MCP Specification 2025-11-25 terkini (dikeluarkan 25 November 2025)  
  - Kemas kini semua rujukan versi spesifikasi daripada 2025-06-18 ke 2025-11-25  
  - Kemas kini rujukan tarikh dokumen daripada 18 Ogos 2025 ke 18 Disember 2025  
  - Sahkan semua URL spesifikasi menunjuk kepada dokumentasi terkini  
- **Pengesahan Kandungan**: Pemeriksaan menyeluruh amalan terbaik keselamatan mengikut piawaian terkini  
  - **Penyelesaian Keselamatan Microsoft**: Sahkan istilah dan pautan terkini untuk Penyekat Arahan (sebelumnya "pengesanan risiko Jailbreak"), Keselamatan Kandungan Azure, Microsoft Entra ID, dan Azure Key Vault  
  - **Keselamatan OAuth 2.1**: Sahkan keselarasan dengan amalan terbaik keselamatan OAuth terkini  
  - **Piawaian OWASP**: Sahkan rujukan OWASP Top 10 untuk LLM kekal terkini  
  - **Perkhidmatan Azure**: Sahkan semua pautan dokumentasi Microsoft Azure dan amalan terbaik  
- **Pelarasan Piawaian**: Semua piawaian keselamatan yang dirujuk disahkan terkini  
  - Rangka Kerja Pengurusan Risiko AI NIST  
  - ISO 27001:2022  
  - Amalan Terbaik Keselamatan OAuth 2.1  
  - Rangka kerja keselamatan dan pematuhan Azure  
- **Sumber Pelaksanaan**: Sahkan semua pautan panduan pelaksanaan dan sumber  
  - Corak pengesahan Azure API Management  
  - Panduan integrasi Microsoft Entra ID  
  - Pengurusan rahsia Azure Key Vault  
  - Saluran DevSecOps dan penyelesaian pemantauan

### Jaminan Kualiti Dokumentasi  
- **Pematuhan Spesifikasi**: Pastikan semua keperluan keselamatan MCP mandatori (MESTI/TIDAK MESTI) selaras dengan spesifikasi terkini  
- **Kemas Kini Sumber**: Sahkan semua pautan luaran ke dokumentasi Microsoft, piawaian keselamatan, dan panduan pelaksanaan  
- **Liputan Amalan Terbaik**: Sahkan liputan menyeluruh pengesahan, kebenaran, ancaman khusus AI, keselamatan rantaian bekalan, dan corak perusahaan

## 6 Oktober 2025

### Pengembangan Seksyen Mula Bermula – Penggunaan Pelayan Lanjutan & Pengesahan Ringkas

#### Penggunaan Pelayan Lanjutan (03-GettingStarted/10-advanced)  
- **Bab Baru Ditambah**: Memperkenalkan panduan menyeluruh mengenai penggunaan pelayan MCP lanjutan, merangkumi seni bina pelayan biasa dan tahap rendah.  
  - **Pelayan Biasa vs. Tahap Rendah**: Perbandingan terperinci dan contoh kod dalam Python dan TypeScript untuk kedua-dua pendekatan.  
  - **Reka Bentuk Berasaskan Pengendali**: Penjelasan tentang pengurusan alat/sumber/arahan berasaskan pengendali untuk pelaksanaan pelayan yang boleh skala dan fleksibel.  
  - **Corak Praktikal**: Senario dunia sebenar di mana corak pelayan tahap rendah bermanfaat untuk ciri dan seni bina lanjutan.

#### Pengesahan Ringkas (03-GettingStarted/11-simple-auth)  
- **Bab Baru Ditambah**: Panduan langkah demi langkah untuk melaksanakan pengesahan ringkas dalam pelayan MCP.  
  - **Konsep Pengesahan**: Penjelasan jelas tentang pengesahan vs. kebenaran, dan pengendalian kelayakan.  
  - **Pelaksanaan Basic Auth**: Corak pengesahan berasaskan middleware dalam Python (Starlette) dan TypeScript (Express), dengan contoh kod.  
  - **Peralihan ke Keselamatan Lanjutan**: Panduan untuk memulakan dengan pengesahan ringkas dan beralih ke OAuth 2.1 dan RBAC, dengan rujukan kepada modul keselamatan lanjutan.

Penambahan ini menyediakan panduan praktikal dan tangan-dalam untuk membina pelaksanaan pelayan MCP yang lebih kukuh, selamat, dan fleksibel, merapatkan konsep asas dengan corak produksi lanjutan.

## 29 September 2025

### Makmal Integrasi Pangkalan Data Pelayan MCP - Laluan Pembelajaran Praktikal Lengkap

#### 11-MCPServerHandsOnLabs - Kurikulum Integrasi Pangkalan Data Penuh Baru
- **Lengkap Laluan Pembelajaran 13-Lab**: Ditambah kurikulum praktikal menyeluruh untuk membina pelayan MCP yang sedia untuk produksi dengan integrasi pangkalan data PostgreSQL
  - **Pelaksanaan Dunia Sebenar**: Kes penggunaan analitik Zava Retail yang menunjukkan corak gred perusahaan
  - **Perkembangan Pembelajaran Berstruktur**:
    - **Lab 00-03: Asas** - Pengenalan, Senibina Teras, Keselamatan & Multi-Tenancy, Persediaan Persekitaran
    - **Lab 04-06: Membina Pelayan MCP** - Reka Bentuk & Skema Pangkalan Data, Pelaksanaan Pelayan MCP, Pembangunan Alat  
    - **Lab 07-09: Ciri Lanjutan** - Integrasi Carian Semantik, Ujian & Pengesan Ralat, Integrasi VS Code
    - **Lab 10-12: Produksi & Amalan Terbaik** - Strategi Penggunaan, Pemantauan & Kebolehlihatan, Amalan Terbaik & Pengoptimuman
  - **Teknologi Perusahaan**: Rangka kerja FastMCP, PostgreSQL dengan pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Ciri Lanjutan**: Keselamatan Tahap Baris (RLS), carian semantik, akses data pelbagai penyewa, vector embeddings, pemantauan masa nyata

#### Penselarasan Terminologi - Penukaran Modul ke Lab
- **Kemas Kini Dokumentasi Menyeluruh**: Kemaskini sistematik semua fail README dalam 11-MCPServerHandsOnLabs untuk menggunakan terminologi "Lab" menggantikan "Modul"
  - **Tajuk Seksyen**: Kemaskini "Apa Yang Modul Ini Liputi" kepada "Apa Yang Lab Ini Liputi" di semua 13 lab
  - **Penerangan Kandungan**: Tukar "Modul ini menyediakan..." kepada "Lab ini menyediakan..." di seluruh dokumentasi
  - **Objektif Pembelajaran**: Kemaskini "Menjelang akhir modul ini..." kepada "Menjelang akhir lab ini..."
  - **Pautan Navigasi**: Tukar semua rujukan "Modul XX:" kepada "Lab XX:" dalam rujukan silang dan navigasi
  - **Penjejakan Penyelesaian**: Kemaskini "Selepas menyiapkan modul ini..." kepada "Selepas menyiapkan lab ini..."
  - **Rujukan Teknikal Dikekalkan**: Mengekalkan rujukan modul Python dalam fail konfigurasi (contohnya, `"module": "mcp_server.main"`)

#### Penambahbaikan Panduan Pembelajaran (study_guide.md)
- **Peta Kurikulum Visual**: Tambah bahagian baru "11. Database Integration Labs" dengan visualisasi struktur lab menyeluruh
- **Struktur Repositori**: Dikemaskini daripada sepuluh kepada sebelas seksyen utama dengan penerangan terperinci 11-MCPServerHandsOnLabs
- **Panduan Laluan Pembelajaran**: Ditingkatkan arahan navigasi untuk merangkumi seksyen 00-11
- **Liputan Teknologi**: Tambah butiran integrasi FastMCP, PostgreSQL, perkhidmatan Azure
- **Hasil Pembelajaran**: Tekankan pembangunan pelayan sedia produksi, corak integrasi pangkalan data, dan keselamatan perusahaan

#### Penambahbaikan Struktur README Utama
- **Terminologi Berasaskan Lab**: Kemas kini README.md utama di 11-MCPServerHandsOnLabs untuk konsisten menggunakan struktur "Lab"
- **Organisasi Laluan Pembelajaran**: Progresi jelas dari konsep asas hingga pelaksanaan lanjutan ke pengeluaran
- **Fokus Dunia Sebenar**: Penekanan pada pembelajaran praktikal, berasaskan lab dengan corak dan teknologi gred perusahaan

### Penambahbaikan Kualiti & Konsistensi Dokumentasi
- **Penekanan Pembelajaran Praktikal**: Kukuhkan pendekatan berasaskan lab di seluruh dokumentasi
- **Fokus Corak Perusahaan**: Sorot pelaksanaan sedia produksi dan pertimbangan keselamatan perusahaan
- **Integrasi Teknologi**: Liputan menyeluruh perkhidmatan Azure moden dan corak integrasi AI
- **Perkembangan Pembelajaran**: Laluan yang jelas dan terstruktur dari konsep asas kepada pengeluaran

## 26 September 2025

### Penambahbaikan Kajian Kes - Integrasi Daftar MCP GitHub

#### Kajian Kes (09-CaseStudy/) - Fokus Pembangunan Ekosistem
- **README.md**: Pengembangan utama dengan kajian kes Daftar MCP GitHub yang komprehensif
  - **Kajian Kes Daftar MCP GitHub**: Kajian kes komprehensif baru yang mengkaji pelancaran Daftar MCP GitHub pada September 2025
    - **Analisis Masalah**: Kajian terperinci mengenai pengesanan pelayan MCP yang terpecah-pecah dan cabaran penggunaan
    - **Senibina Penyelesaian**: Pendekatan daftar berpusat GitHub dengan pemasangan VS Code satu klik
    - **Impak Perniagaan**: Peningkatan ketara dalam penerimaan pembangun dan produktiviti
    - **Nilai Strategik**: Fokus pada penggunaan agen modular dan interoperabiliti silang alat
    - **Pembangunan Ekosistem**: Penempatan sebagai platform asas untuk integrasi agen
  - **Struktur Kajian Kes Dipertingkatkan**: Kemas kini semua tujuh kajian kes dengan format konsisten dan penerangan menyeluruh
    - Ejen Pelancongan Azure AI: Penekanan orkestra multi-agen
    - Integrasi Azure DevOps: Fokus automasi aliran kerja
    - Pengambilan Dokumentasi Masa Nyata: Pelaksanaan klien konsol Python
    - Penjana Pelan Kajian Interaktif: Aplikasi web perbualan Chainlit
    - Dokumentasi Dalam Editor: Integrasi VS Code dan GitHub Copilot
    - Pengurusan API Azure: Corak integrasi API perusahaan
    - Daftar MCP GitHub: Pembangunan ekosistem dan platform komuniti
  - **Kesimpulan Komprehensif**: Bahagian kesimpulan ditulis semula menyerlahkan tujuh kajian kes merentasi pelbagai dimensi pelaksanaan MCP
    - Integrasi Perusahaan, Orkestra Multi-Agen, Produktiviti Pembangun
    - Pembangunan Ekosistem, Kategori Aplikasi Pendidikan
    - Pengetahuan dipertingkatkan dalam corak senibina, strategi pelaksanaan, dan amalan terbaik
    - Penekanan MCP sebagai protokol matang dan sedia produksi

#### Kemas Kini Panduan Pembelajaran (study_guide.md)
- **Peta Kurikulum Visual**: Dikemaskini mindmap untuk memasukkan Daftar MCP GitHub dalam bahagian Kajian Kes
- **Penerangan Kajian Kes**: Ditingkatkan daripada penerangan generik kepada pecahan terperinci tujuh kajian kes menyeluruh
- **Struktur Repositori**: Dikemaskini seksyen 10 untuk mencerminkan liputan kajian kes menyeluruh dengan butiran pelaksanaan spesifik
- **Integrasi Changelog**: Tambah entri 26 September 2025 yang mendokumentasikan penambahan Daftar MCP GitHub dan penambahbaikan kajian kes
- **Kemas Kini Tarikh**: Footer dikemaskini dengan cap waktu semakan terkini (26 September 2025)

### Penambahbaikan Kualiti Dokumentasi
- **Peningkatan Konsistensi**: Standardisasi format dan struktur kajian kes dalam semua tujuh contoh
- **Liputan Komprehensif**: Kajian kes kini merangkumi senario perusahaan, produktiviti pembangun, dan pembangunan ekosistem
- **Penempatan Strategik**: Fokus dipertingkat pada MCP sebagai platform asas untuk pelaksanaan sistem agen
- **Integrasi Sumber**: Dikemaskini sumber tambahan bagi menyertakan pautan Daftar MCP GitHub

## 15 September 2025

### Pengembangan Topik Lanjutan - Pengangkutan Tersuai & Kejuruteraan Konteks

#### Pengangkutan MCP Tersuai (05-AdvancedTopics/mcp-transport/) - Panduan Pelaksanaan Lanjutan Baru
- **README.md**: Panduan lengkap pelaksanaan mekanisme pengangkutan MCP tersuai
  - **Pengangkutan Azure Event Grid**: Pelaksanaan pengangkutan berasaskan peristiwa tanpa pelayan yang komprehensif
    - Contoh C#, TypeScript, dan Python dengan integrasi Azure Functions
    - Corak seni bina berasaskan peristiwa untuk penyelesaian MCP boleh skala
    - Penerima webhook dan pengendalian mesej berasaskan tolak
  - **Pengangkutan Azure Event Hubs**: Pelaksanaan pengangkutan penstriman berkelajuan tinggi
    - Keupayaan penstriman masa nyata untuk senario latensi rendah
    - Strategi partisi dan pengurusan checkpoint
    - Penggumpulan mesej dan pengoptimuman prestasi
  - **Corak Integrasi Perusahaan**: Contoh seni bina sedia produksi
    - Pemprosesan MCP diedarkan merentas pelbagai Azure Functions
    - Seni bina pengangkutan hibrid yang menggabungkan pelbagai jenis pengangkutan
    - Ketahanan mesej, kebolehpercayaan, dan strategi pengendalian ralat
  - **Keselamatan & Pemantauan**: Integrasi Azure Key Vault dan corak kebolehlihatan
    - Pengesahan identiti terurus dan akses keistimewaan minimum
    - Telemetri Application Insights dan pemantauan prestasi
    - Pemutus litar dan corak ketahanan kesilapan
  - **Rangka Kerja Ujian**: Strategi ujian menyeluruh untuk pengangkutan tersuai
    - Ujian unit dengan test doubles dan rangka kerja mocking
    - Ujian integrasi dengan Azure Test Containers
    - Pertimbangan ujian prestasi dan beban

#### Kejuruteraan Konteks (05-AdvancedTopics/mcp-contextengineering/) - Disiplin AI Baru
- **README.md**: Eksplorasi menyeluruh kejuruteraan konteks sebagai bidang baru
  - **Prinsip Teras**: Perkongsian konteks lengkap, kesedaran keputusan tindakan, dan pengurusan tetingkap konteks
  - **Penjajaran Protokol MCP**: Cara reka bentuk MCP menangani cabaran kejuruteraan konteks
    - Had tetingkap konteks dan strategi pemuatan progresif
    - Penentuan relevan dan pengambilan konteks dinamik
    - Pengendalian konteks pelbagai mod dan pertimbangan keselamatan
  - **Pendekatan Pelaksanaan**: Seni bina berutas tunggal vs. multi-agen
    - Teknik pemecahan dan keutamaan konteks
    - Pemuatan konteks progresif dan strategi pemampatan
    - Pendekatan bertingkat konteks dan pengoptimuman pengambilan
  - **Kerangka Pengukuran**: Metodologi baru untuk penilaian keberkesanan konteks
    - Kecekapan input, prestasi, kualiti, dan pertimbangan pengalaman pengguna
    - Pendekatan eksperimen untuk pengoptimuman konteks
    - Analisis kegagalan dan metodologi penambahbaikan

#### Kemas Kini Navigasi Kurikulum (README.md)
- **Struktur Modul Ditingkatkan**: Dikemaskini jadual kurikulum untuk memasukkan topik lanjutan baru
  - Tambah Kejuruteraan Konteks (5.14) dan Pengangkutan Tersuai (5.15)
  - Format konsisten dan pautan navigasi di seluruh modul
  - Kemaskini penerangan untuk mencerminkan skop kandungan semasa

### Penambahbaikan Struktur Direktori
- **Penselarasan Penamaan**: Namakan semula "mcp transport" kepada "mcp-transport" untuk konsisten dengan folder topik lanjutan lain
- **Organisasi Kandungan**: Semua folder 05-AdvancedTopics kini mengikuti corak penamaan konsisten (mcp-[topik])

### Penambahbaikan Kualiti Dokumentasi
- **Penjajaran Spesifikasi MCP**: Semua kandungan baru merujuk Spesifikasi MCP 2025-06-18 terkini
- **Contoh Berbilang Bahasa**: Contoh kod menyeluruh dalam C#, TypeScript, dan Python
- **Fokus Perusahaan**: Corak sedia produksi dan integrasi awan Azure sepanjang ayat
- **Dokumentasi Visual**: Rajah Mermaid untuk seni bina dan visualisasi aliran

## 18 Ogos 2025

### Kemas Kini Menyeluruh Dokumentasi - Standard MCP 2025-06-18

#### Amalan Terbaik Keselamatan MCP (02-Security/) - Pemonodan Menyeluruh
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Penulisan semula lengkap selaras dengan Spesifikasi MCP 2025-06-18
  - **Keperluan Wajib**: Tambah keperluan MUST/MUST NOT eksplisit dari spesifikasi rasmi dengan penunjuk visual jelas
  - **12 Amalan Keselamatan Teras**: Disusun semula daripada senarai 15 item kepada domain keselamatan menyeluruh
    - Keselamatan Token & Pengesahan dengan integrasi penyedia identiti luaran
    - Pengurusan Sesi & Keselamatan Pengangkutan dengan keperluan kriptografi
    - Perlindungan Ancaman AI Khusus dengan integrasi Microsoft Prompt Shields
    - Kawalan Akses & Kebenaran dengan prinsip keistimewaan minimum
    - Keselamatan Kandungan & Pemantauan dengan integrasi Azure Content Safety
    - Keselamatan Rantaian Bekalan dengan pengesahan komponen menyeluruh
    - Keselamatan OAuth & Pencegahan Confused Deputy dengan pelaksanaan PKCE
    - Respons Insiden & Pemulihan dengan keupayaan automatik
    - Pematuhan & Tadbir Urus dengan penjajaran peraturan
    - Kawalan Keselamatan Lanjutan dengan seni bina zero trust
    - Integrasi Ekosistem Keselamatan Microsoft dengan penyelesaian komprehensif
    - Evolusi Keselamatan Berterusan dengan amalan adaptif
  - **Penyelesaian Keselamatan Microsoft**: Panduan integrasi dipertingkat untuk Prompt Shields, Azure Content Safety, Entra ID, dan GitHub Advanced Security
  - **Sumber Pelaksanaan**: Pautan sumber komprehensif dikategorikan mengikut Dokumentasi MCP Rasmi, Penyelesaian Keselamatan Microsoft, Standard Keselamatan, dan Panduan Pelaksanaan

#### Kawalan Keselamatan Lanjutan (02-Security/) - Pelaksanaan Perusahaan
- **MCP-SECURITY-CONTROLS-2025.md**: Perombakan lengkap dengan rangka kerja keselamatan gred perusahaan
  - **9 Domain Keselamatan Menyeluruh**: Diperluas daripada kawalan asas kepada rangka kerja perusahaan terperinci
    - Pengesahan & Kebenaran Lanjutan dengan integrasi Microsoft Entra ID
    - Keselamatan Token & Kawalan Anti-Passthrough dengan pengesahan menyeluruh
    - Kawalan Keselamatan Sesi dengan pencegahan pembajakan
    - Kawalan Keselamatan Khusus AI dengan pencegahan suntikan prompt dan pencemaran alat
    - Pencegahan Serangan Confused Deputy dengan keselamatan proksi OAuth
    - Keselamatan Pelaksanaan Alat dengan sandboxing dan pengasingan
    - Kawalan Keselamatan Rantaian Bekalan dengan pengesahan pergantungan
    - Kawalan Pemantauan & Pengesanan dengan integrasi SIEM
    - Respons Insiden & Pemulihan dengan keupayaan automatik
  - **Contoh Pelaksanaan**: Tambah blok konfigurasi YAML terperinci dan contoh kod
  - **Integrasi Penyelesaian Microsoft**: Liputan komprehensif perkhidmatan keselamatan Azure, GitHub Advanced Security, dan pengurusan identiti perusahaan

#### Topik Lanjutan Keselamatan (05-AdvancedTopics/mcp-security/) - Pelaksanaan Sedia Produksi
- **README.md**: Penulisan semula lengkap untuk pelaksanaan keselamatan perusahaan
  - **Penjajaran Spesifikasi Semasa**: Dikemaskini ke Spesifikasi MCP 2025-06-18 dengan keperluan keselamatan wajib
  - **Pengesahan Dipertingkat**: Integrasi Microsoft Entra ID dengan contoh .NET dan Java Spring Security komprehensif
  - **Integrasi Keselamatan AI**: Pelaksanaan Microsoft Prompt Shields dan Azure Content Safety dengan contoh Python terperinci
  - **Mitigasi Ancaman Lanjutan**: Contoh pelaksanaan menyeluruh untuk
    - Pencegahan Serangan Confused Deputy dengan PKCE dan pengesahan persetujuan pengguna
    - Pencegahan Passthrough Token dengan pengesahan audiens dan pengurusan token selamat
    - Pencegahan Pembajakan Sesi dengan pengikatan kriptografi dan analisis tingkah laku
  - **Integrasi Keselamatan Perusahaan**: Pemantauan Azure Application Insights, saluran pengesanan ancaman, dan keselamatan rantaian bekalan
  - **Senarai Semak Pelaksanaan**: Kawalan keselamatan wajib vs. disyorkan dengan manfaat ekosistem keselamatan Microsoft

### Kualiti Dokumentasi & Penjajaran Standard
- **Rujukan Spesifikasi**: Kemas kini semua rujukan ke Spesifikasi MCP 2025-06-18 terkini
- **Ekosistem Keselamatan Microsoft**: Panduan integrasi dipertingkat di seluruh dokumentasi keselamatan
- **Pelaksanaan Praktikal**: Tambah contoh kod terperinci dalam .NET, Java, dan Python dengan corak perusahaan
- **Organisasi Sumber**: Kategori komprehensif dokumentasi rasmi, standard keselamatan, dan panduan pelaksanaan
- **Penunjuk Visual**: Penanda jelas keperluan wajib vs. amalan disyorkan


#### Konsep Teras (01-CoreConcepts/) - Pemonodan Menyeluruh
- **Kemas Kini Versi Protokol**: Dikemaskini merujuk Spesifikasi MCP 2025-06-18 terkini dengan penomboran berasaskan tarikh (format YYYY-MM-DD)
- **Penyempurnaan Seni Bina**: Penerangan dipertingkat mengenai Hos, Klien, dan Pelayan bagi mencerminkan corak seni bina MCP semasa
  - Hos kini jelas ditakrifkan sebagai aplikasi AI yang menyelaraskan pelbagai sambungan klien MCP  
  - Klien digambarkan sebagai penyambung protokol yang mengekalkan hubungan satu-ke-satu dengan pelayan  
  - Pelayan dipertingkatkan dengan senario pengedaran tempatan vs. jauh  
- **Penstrukturan Semula Primitif**: Penstrukturan semula sepenuhnya primitif pelayan dan klien  
  - Primitif Pelayan: Sumber (sumber data), Prompt (templat), Alat (fungsi boleh dilaksanakan) dengan penjelasan dan contoh terperinci  
  - Primitif Klien: Persampelan (penyelesaian LLM), Perolehan (input pengguna), Log (debug/monitoring)  
  - Dikemas kini dengan pola kaedah penemuan (`*/list`), pengambilan (`*/get`), dan pelaksanaan (`*/call`) terkini  
- **Seni Bina Protokol**: Memperkenalkan model seni bina dua lapisan  
  - Lapisan Data: Asas JSON-RPC 2.0 dengan pengurusan kitaran hayat dan primitif  
  - Lapisan Pengangkutan: STDIO (tempatan) dan HTTP Boleh Alir dengan SSE (jauh) mekanisme pengangkutan  
- **Rangka Kerja Keselamatan**: Prinsip keselamatan menyeluruh termasuk persetujuan pengguna secara eksplisit, perlindungan privasi data, keselamatan pelaksanaan alat, dan keselamatan lapisan pengangkutan  
- **Corak Komunikasi**: Mesej protokol dikemas kini untuk menunjukkan inisialisasi, penemuan, pelaksanaan, dan aliran pemberitahuan  
- **Contoh Kod**: Contoh pelbagai bahasa yang dikemas kini (.NET, Java, Python, JavaScript) untuk mencerminkan pola SDK MCP terkini  

#### Keselamatan (02-Security/) - Penstrukturan Semula Keselamatan Menyeluruh  
- **Penyesuaian Standard**: Penyesuaian penuh dengan keperluan keselamatan Spesifikasi MCP 2025-06-18  
- **Evolusi Pengesahan**: Dokumentasi evolusi daripada pelayan OAuth tersuai ke delegasi pembekal identiti luaran (Microsoft Entra ID)  
- **Analisis Ancaman Khusus AI**: Liputan dipertingkatkan bagi vektor serangan AI moden  
  - Senario serangan suntikan prompt terperinci dengan contoh dunia sebenar  
  - Mekanisme pencemaran alat dan corak serangan "tarik permaidani"  
  - Pencemaran tetingkap konteks dan serangan kekeliruan model  
- **Penyelesaian Keselamatan AI Microsoft**: Liputan menyeluruh ekosistem keselamatan Microsoft  
  - Perisai Prompt AI dengan teknik pengesanan, sorotan, dan pemisah yang canggih  
  - Pola integrasi Azure Content Safety  
  - Keselamatan Lanjutan GitHub untuk perlindungan rantaian bekalan  
- **Mitigasi Ancaman Lanjutan**: Kawalan keselamatan terperinci bagi  
  - Pembajakan sesi dengan senario serangan khusus MCP dan keperluan ID sesi kriptografi  
  - Masalah pengantara keliru dalam senario proksi MCP dengan keperluan persetujuan eksplisit  
  - Kelemahan passthrough token dengan kawalan pengesahan wajib  
- **Keselamatan Rantaian Bekalan**: Liputan diperluas rantaian bekalan AI termasuk model asas, perkhidmatan penanam, pembekal konteks, dan API pihak ketiga  
- **Keselamatan Asas**: Integrasi dipertingkatkan dengan pola keselamatan perusahaan termasuk seni bina kepercayaan sifar dan ekosistem keselamatan Microsoft  
- **Organisasi Sumber**: Pautan sumber menyeluruh dikategorikan mengikut jenis (Dokumen Rasmi, Standard, Penyelidikan, Penyelesaian Microsoft, Panduan Pelaksanaan)  

### Penambahbaikan Kualiti Dokumentasi  
- **Objektif Pembelajaran Berstruktur**: Objektif pembelajaran diperkukuh dengan hasil khusus dan boleh dilaksanakan  
- **Rujukan Silang**: Ditambah pautan antara topik keselamatan dan konsep teras yang berkaitan  
- **Maklumat Terkini**: Semua rujukan tarikh dan pautan spesifikasi dikemas kini mengikut standard terkini  
- **Panduan Pelaksanaan**: Panduan pelaksanaan khusus dan boleh dilaksanakan ditambah di kedua-dua bahagian  

## 16 Julai 2025  

### Penambahbaikan README dan Navigasi  
- Direka semula sepenuhnya navigasi kurikulum dalam README.md  
- Menggantikan tag `<details>` dengan format jadual yang lebih mudah diakses  
- Mewujudkan pilihan susun atur alternatif dalam folder baru "alternative_layouts"  
- Menambah contoh navigasi berasaskan kad, gaya tab, dan gaya akordion  
- Kemas kini bahagian struktur repositori untuk memasukkan semua fail terkini  
- Mempertingkatkan bahagian "Cara Menggunakan Kurikulum Ini" dengan cadangan yang jelas  
- Mengemas kini pautan spesifikasi MCP kepada URL yang betul  
- Menambah bahagian Kejuruteraan Konteks (5.14) kepada struktur kurikulum  

### Kemas Kini Panduan Kajian  
- Mengubah suai sepenuhnya panduan kajian untuk selari dengan struktur repositori terkini  
- Menambah bahagian baru untuk Klien dan Alat MCP, serta Pelayan MCP Popular  
- Mengemas kini Peta Kurikulum Visual untuk mencerminkan semua topik dengan tepat  
- Mempertingkatkan penerangan Topik Lanjutan untuk meliputi semua bidang khusus  
- Mengemas kini bahagian Kajian Kes untuk mencerminkan contoh sebenar  
- Menambah log perubahan menyeluruh ini  

### Sumbangan Komuniti (06-CommunityContributions/)  
- Menambah maklumat terperinci tentang pelayan MCP untuk penjanaan imej  
- Menambah bahagian komprehensif mengenai penggunaan Claude dalam VSCode  
- Menambah arahan penyediaan dan penggunaan klien terminal Cline  
- Mengemas kini bahagian klien MCP untuk memasukkan semua pilihan klien popular  
- Mempertingkatkan contoh sumbangan dengan sampel kod yang lebih tepat  

### Topik Lanjutan (05-AdvancedTopics/)  
- Mengatur semua folder topik khusus dengan penamaan konsisten  
- Menambah bahan kejuruteraan konteks dan contoh  
- Menambah dokumentasi integrasi agen Foundry  
- Mempertingkatkan dokumentasi integrasi keselamatan Entra ID  

## 11 Jun 2025  

### Penciptaan Awal  
- Menerbitkan versi pertama kurikulum MCP untuk Pemula  
- Mewujudkan struktur asas untuk semua 10 bahagian utama  
- Melaksanakan Peta Kurikulum Visual untuk navigasi  
- Menambah projek contoh awal dalam pelbagai bahasa pengaturcaraan  

### Mula Menggunakan (03-GettingStarted/)  
- Mencipta contoh pelaksanaan pelayan pertama  
- Menambah panduan pembangunan klien  
- Menyertakan arahan integrasi klien LLM  
- Menambah dokumentasi integrasi VS Code  
- Melaksanakan contoh Server-Sent Events (SSE) untuk pelayan  

### Konsep Teras (01-CoreConcepts/)  
- Menambah penjelasan terperinci seni bina klien-pelayan  
- Mencipta dokumentasi komponen protokol utama  
- Mendokumentasikan corak penghantaran mesej dalam MCP  

## 23 Mei 2025  

### Struktur Repositori  
- Memulakan repositori dengan struktur folder asas  
- Mencipta fail README untuk setiap bahagian utama  
- Menyediakan infrastruktur terjemahan  
- Menambah aset imej dan diagram  

### Dokumentasi  
- Mencipta README.md awal dengan gambaran keseluruhan kurikulum  
- Menambah CODE_OF_CONDUCT.md dan SECURITY.md  
- Menyediakan SUPPORT.md dengan panduan untuk mendapatkan bantuan  
- Mencipta struktur panduan kajian awal  

## 15 April 2025  

### Perancangan dan Rangka Kerja  
- Perancangan awal untuk kurikulum MCP untuk Pemula  
- Mendefinisikan objektif pembelajaran dan audiens sasaran  
- Merangka struktur 10 bahagian kurikulum  
- Membangunkan rangka kerja konsep untuk contoh dan kajian kes  
- Mencipta contoh prototaip awal untuk konsep utama  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil perhatian bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->