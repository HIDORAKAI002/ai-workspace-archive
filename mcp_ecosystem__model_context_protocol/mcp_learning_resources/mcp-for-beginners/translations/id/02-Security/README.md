# Keamanan MCP: Perlindungan Komprehensif untuk Sistem AI

[![MCP Security Best Practices](../../../translated_images/id/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik gambar di atas untuk menonton video pelajaran ini)_

Keamanan adalah dasar dari desain sistem AI, itulah sebabnya kami memprioritaskannya sebagai bagian kedua. Ini sejalan dengan prinsip **Secure by Design** Microsoft dari [Inisiatif Masa Depan yang Aman](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) menghadirkan kemampuan baru yang kuat untuk aplikasi yang digerakkan AI sekaligus memperkenalkan tantangan keamanan unik yang melampaui risiko perangkat lunak tradisional. Sistem MCP menghadapi kekhawatiran keamanan yang sudah mapan (pengkodean aman, prinsip hak istimewa minimal, keamanan rantai pasokan) dan ancaman AI khusus seperti injeksi prompt, keracunan alat, pembajakan sesi, serangan deputi bingung, kerentanan token passthrough, dan modifikasi kapabilitas dinamis.

Pelajaran ini mengeksplorasi risiko keamanan paling kritis dalam implementasi MCP—meliputi otentikasi, otorisasi, izin berlebihan, injeksi prompt tidak langsung, keamanan sesi, masalah deputi bingung, manajemen token, dan kerentanan rantai pasokan. Anda akan belajar kontrol yang dapat diterapkan dan praktik terbaik untuk mengurangi risiko ini sambil memanfaatkan solusi Microsoft seperti Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk memperkuat penerapan MCP Anda.

## Tujuan Pembelajaran

Pada akhir pelajaran ini, Anda akan mampu:

- **Mengidentifikasi Ancaman Spesifik MCP**: Mengenali risiko keamanan unik dalam sistem MCP termasuk injeksi prompt, keracunan alat, izin berlebihan, pembajakan sesi, masalah deputi bingung, kerentanan token passthrough, dan risiko rantai pasokan
- **Menerapkan Kontrol Keamanan**: Mengimplementasikan mitigasi efektif termasuk otentikasi yang kuat, akses hak istimewa minimal, manajemen token yang aman, kontrol keamanan sesi, dan verifikasi rantai pasokan
- **Memanfaatkan Solusi Keamanan Microsoft**: Memahami dan menerapkan Microsoft Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk perlindungan beban kerja MCP
- **Memvalidasi Keamanan Alat**: Mengenali pentingnya validasi metadata alat, pemantauan perubahan dinamis, dan pertahanan terhadap serangan injeksi prompt tidak langsung
- **Mengintegrasikan Praktik Terbaik**: Menggabungkan dasar-dasar keamanan yang mapan (pengkodean aman, penguatan server, zero trust) dengan kontrol khusus MCP untuk perlindungan menyeluruh

# Arsitektur & Kontrol Keamanan MCP

Implementasi MCP modern membutuhkan pendekatan keamanan berlapis yang menangani baik keamanan perangkat lunak tradisional maupun ancaman AI khusus. Spesifikasi MCP yang terus berkembang dengan cepat terus mematangkan kontrol keamanannya, memungkinkan integrasi yang lebih baik dengan arsitektur keamanan perusahaan dan praktik terbaik yang sudah ada.

Penelitian dari [Laporan Pertahanan Digital Microsoft](https://aka.ms/mddr) menunjukkan bahwa **98% pelanggaran yang dilaporkan dapat dicegah dengan kebersihan keamanan yang kuat**. Strategi perlindungan paling efektif menggabungkan praktik keamanan dasar dengan kontrol spesifik MCP—ukuran keamanan dasar yang terbukti tetap paling berdampak dalam mengurangi risiko keamanan secara keseluruhan.

## Lanskap Keamanan Saat Ini

> **Catatan:** Informasi ini mencerminkan standar keamanan MCP per **5 Februari 2026**, selaras dengan **Spesifikasi MCP 2025-11-25**. Protokol MCP terus berkembang dengan cepat, dan implementasi mendatang mungkin memperkenalkan pola otentikasi baru dan kontrol yang ditingkatkan. Selalu rujuk ke [Spesifikasi MCP](https://spec.modelcontextprotocol.io/), [repositori MCP GitHub](https://github.com/modelcontextprotocol), dan [dokumentasi praktik terbaik keamanan](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) terkini untuk panduan terbaru.

> **Melihat ke depan:** kandidat rilis `2026-07-28` memperkuat otorisasi lebih jauh—klien harus memvalidasi parameter `iss` pada respons otorisasi (RFC 9207), menyatakan `application_type` OpenID Connect selama Registrasi Klien Dinamis, dan mengikat kredensial terdaftar ke server otorisasi penerbit. Lihat [Apa yang Berubah di MCP: Kandidat Rilis 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) untuk daftar lengkap SEP otorisasi.

## 🏔️ Lokakarya KTT Keamanan MCP (Sherpa)

Untuk **pelatihan keamanan praktis**, kami sangat merekomendasikan **Lokakarya KTT Keamanan MCP** (Sherpa) - ekspedisi terpandu komprehensif untuk mengamankan server MCP di Microsoft Azure.

### Gambaran Lokakarya

[Lokakarya KTT Keamanan MCP](https://azure-samples.github.io/sherpa/) menyediakan pelatihan keamanan praktis dan dapat diterapkan melalui metodologi terbukti "rentan → eksploitasi → perbaiki → validasi". Anda akan:

- **Belajar dengan Merusak**: Mengalami kerentanan secara langsung dengan mengeksploitasi server yang sengaja tidak aman
- **Menggunakan Keamanan Azure-Native**: Memanfaatkan Azure Entra ID, Key Vault, API Management, dan AI Content Safety
- **Mengikuti Prinsip Pertahanan Berlapis**: Melanjutkan melalui kamp-kamp membangun lapisan keamanan komprehensif
- **Menerapkan Standar OWASP**: Setiap teknik sesuai dengan [Panduan Keamanan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Mendapatkan Kode Produksi**: Meninggalkan dengan implementasi yang berfungsi dan telah diuji

### Rute Ekspedisi

| Kamp | Fokus | Risiko OWASP yang Dicakup |
|------|-------|---------------------|
| **Kamp Dasar** | Dasar-dasar MCP & kerentanan otentikasi | MCP01, MCP07 |
| **Kamp 1: Identitas** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kamp 2: Gateway** | API Management, Private Endpoints, tata kelola | MCP02, MCP06, MCP07, MCP09 |
| **Kamp 3: Keamanan I/O** | Injeksi prompt, perlindungan PII, keamanan konten | MCP03, MCP05, MCP06, MCP10 |
| **Kamp 4: Pemantauan** | Log Analytics, dasbor, deteksi ancaman | MCP04, MCP08 |
| **Puncak** | Uji integrasi Tim Merah / Tim Biru | Semua |

**Mulai Sekarang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## 10 Risiko Keamanan Teratas OWASP MCP

[Panduan Keamanan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) merinci sepuluh risiko keamanan paling kritis untuk implementasi MCP:

| Risiko | Deskripsi | Mitigasi Azure |
|------|-------------|------------------|
| **MCP01** | Manajemen Token yang Salah & Eksposur Rahasia | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalasi Hak Istimewa melalui Perluasan Cakupan | RBAC, Conditional Access |
| **MCP03** | Keracunan Alat | Validasi alat, verifikasi integritas |
| **MCP04** | Serangan Rantai Pasokan Perangkat Lunak & Manipulasi Ketergantungan | GitHub Advanced Security, pemindaian ketergantungan |
| **MCP05** | Injeksi & Eksekusi Perintah | Validasi input, sandboxing |
| **MCP06** | Subversi Alur Niat | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Otentikasi & Otorisasi yang Tidak Memadai | Azure Entra ID, OAuth 2.1 dengan PKCE |
| **MCP08** | Kekurangan Audit dan Telemetri | Azure Monitor, Application Insights |
| **MCP09** | Server MCP Bayangan | Tata kelola API Center, isolasi jaringan |
| **MCP10** | Injeksi Konteks & Berbagi Berlebihan | Klasifikasi data, eksposur minimal |

### Evolusi Otentikasi MCP

Spesifikasi MCP telah berkembang signifikan dalam pendekatannya terhadap otentikasi dan otorisasi:

- **Pendekatan Awal**: Spesifikasi awal mengharuskan pengembang mengimplementasikan server otentikasi kustom, dengan server MCP bertindak sebagai Server Otorisasi OAuth 2.0 yang mengelola otentikasi pengguna secara langsung
- **Standar Saat Ini (2025-11-25)**: Spesifikasi diperbarui memungkinkan server MCP mendelegasikan otentikasi ke penyedia identitas eksternal (seperti Microsoft Entra ID), meningkatkan postur keamanan dan mengurangi kompleksitas implementasi
- **Keamanan Lapisan Transportasi**: Dukungan yang ditingkatkan untuk mekanisme transportasi yang aman dengan pola otentikasi yang tepat baik untuk koneksi lokal (STDIO) maupun jarak jauh (Streamable HTTP)

## Keamanan Otentikasi & Otorisasi

### Tantangan Keamanan Saat Ini

Implementasi MCP modern menghadapi beberapa tantangan otentikasi dan otorisasi:

### Risiko & Vektor Ancaman

- **Logika Otorisasi yang Salah Konfigurasi**: Implementasi otorisasi yang cacat di server MCP dapat mengekspos data sensitif dan menerapkan kontrol akses yang salah
- **Kompromi Token OAuth**: Pencurian token server MCP lokal memungkinkan penyerang menyamar sebagai server dan mengakses layanan hilir
- **Kerentanan Token Passthrough**: Penanganan token yang tidak tepat menciptakan pelanggaran kontrol keamanan dan celah akuntabilitas
- **Izin Berlebihan**: Server MCP dengan hak istimewa berlebih melanggar prinsip hak istimewa minimal dan memperluas permukaan serangan

#### Token Passthrough: Pola Anti-Kritis

**Token passthrough secara eksplisit dilarang** dalam spesifikasi otorisasi MCP saat ini karena implikasi keamanan yang berat:

##### Penghindaran Kontrol Keamanan
- Server MCP dan API hilir menerapkan kontrol keamanan penting (pembatasan laju, validasi permintaan, pemantauan lalu lintas) yang bergantung pada validasi token yang tepat
- Penggunaan token langsung dari klien ke API melewati perlindungan esensial ini, merusak arsitektur keamanan

##### Tantangan Akuntabilitas & Audit
- Server MCP tidak dapat membedakan antara klien yang menggunakan token yang diterbitkan hulu, merusak jejak audit
- Log server sumber daya hilir menunjukkan asal permintaan yang menyesatkan daripada perantara server MCP yang sebenarnya
- Investigasi insiden dan audit kepatuhan menjadi jauh lebih sulit

##### Risiko Eksfiltrasi Data
- Klaim token yang tidak divalidasi memungkinkan aktor jahat dengan token curian menggunakan server MCP sebagai proxy untuk eksfiltrasi data
- Pelanggaran batas kepercayaan memungkinkan pola akses tidak sah yang melewati kontrol keamanan yang dimaksudkan

##### Vektor Serangan Multi-Layanan
- Token yang dikompromikan yang diterima oleh banyak layanan memungkinkan pergerakan lateral di seluruh sistem yang terhubung
- Asumsi kepercayaan antar layanan mungkin dilanggar saat asal token tidak dapat diverifikasi

### Kontrol Keamanan & Mitigasi

**Persyaratan Keamanan Kritis:**

> **WAJIB**: Server MCP **TIDAK BOLEH** menerima token yang tidak secara eksplisit diterbitkan untuk server MCP

#### Kontrol Otentikasi & Otorisasi

- **Tinjauan Otorisasi Ketat**: Lakukan audit komprehensif logika otorisasi server MCP untuk memastikan hanya pengguna dan klien yang dimaksudkan yang dapat mengakses sumber daya sensitif
  - **Panduan Implementasi**: [Azure API Management sebagai Gateway Otentikasi untuk Server MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrasi Identitas**: [Menggunakan Microsoft Entra ID untuk Otentikasi Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Manajemen Token yang Aman**: Terapkan [praktik terbaik validasi token dan siklus hidup Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validasi klaim audiens token sesuai dengan identitas server MCP
  - Terapkan kebijakan rotasi dan masa berlaku token yang tepat
  - Cegah serangan pemutaran ulang token dan penggunaan yang tidak sah

- **Penyimpanan Token Terproteksi**: Amankan penyimpanan token dengan enkripsi saat diam dan saat transmisi
  - **Praktik Terbaik**: [Pedoman Penyimpanan dan Enkripsi Token Aman](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementasi Kontrol Akses

- **Prinsip Hak Istimewa Minimal**: Berikan server MCP hanya izin minimum yang diperlukan untuk fungsi yang dimaksudkan
  - Tinjau dan perbarui izin secara rutin untuk mencegah perluasan hak istimewa
  - **Dokumentasi Microsoft**: [Akses Teraman Dengan Hak Istimewa Minimal](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrol Akses Berbasis Peran (RBAC)**: Terapkan penugasan peran yang rinci
  - Batasi peran secara ketat ke sumber daya dan tindakan spesifik
  - Hindari izin luas atau tidak perlu yang memperluas permukaan serangan

- **Pemantauan Izin Berkelanjutan**: Terapkan audit dan pemantauan akses berkelanjutan
  - Pantau pola penggunaan izin untuk anomali
  - Segera tangani hak istimewa berlebihan atau yang tidak digunakan

## Ancaman Keamanan Khusus AI

### Serangan Injeksi Prompt & Manipulasi Alat

Implementasi MCP modern menghadapi vektor serangan khusus AI yang canggih yang tidak sepenuhnya dapat diatasi dengan langkah keamanan tradisional:

#### **Injeksi Prompt Tidak Langsung (Injeksi Prompt Lintas Domain)**

**Injeksi Prompt Tidak Langsung** merupakan salah satu kerentanan paling kritis dalam sistem AI yang diaktifkan MCP. Penyerang menyisipkan instruksi berbahaya dalam konten eksternal—dokumen, halaman web, email, atau sumber data—yang kemudian diproses sistem AI sebagai perintah sah.

**Skenario Serangan:**
- **Injeksi Berbasis Dokumen**: Instruksi berbahaya tersembunyi dalam dokumen yang diproses yang memicu tindakan AI yang tidak diinginkan
- **Eksploitasi Konten Web**: Halaman web yang dikompromikan berisi prompt tertanam yang memanipulasi perilaku AI saat di-scrape
- **Serangan Berbasis Email**: Prompt berbahaya dalam email yang menyebabkan asisten AI membocorkan informasi atau melakukan tindakan tidak berwenang
- **Kontaminasi Sumber Data**: Basis data atau API yang dikompromikan menyajikan konten tercemar ke sistem AI

**Dampak Dunia Nyata**: Serangan ini dapat menyebabkan eksfiltrasi data, pelanggaran privasi, pembuatan konten berbahaya, dan manipulasi interaksi pengguna. Untuk analisis mendalam, lihat [Injeksi Prompt di MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram Serangan Injeksi Prompt](../../../translated_images/id/prompt-injection.ed9fbfde297ca877.webp)

#### **Serangan Keracunan Alat**

**Keracunan Alat** menargetkan metadata yang mendefinisikan alat MCP, mengeksploitasi bagaimana LLM mengartikan deskripsi alat dan parameter untuk membuat keputusan eksekusi.

**Mekanisme Serangan:**
- **Manipulasi Metadata**: Penyerang menyisipkan instruksi berbahaya dalam deskripsi alat, definisi parameter, atau contoh penggunaan
- **Instruksi Tak Terlihat**: Prompt tersembunyi dalam metadata alat yang diproses oleh model AI tetapi tidak terlihat oleh pengguna manusia
- **Modifikasi Alat Dinamis ("Rug Pulls")**: Alat yang disetujui pengguna kemudian dimodifikasi untuk melakukan tindakan berbahaya tanpa disadari pengguna
- **Injeksi Parameter**: Konten berbahaya tertanam dalam skema parameter alat yang memengaruhi perilaku model


**Risiko Server Tuan Rumah**: Server MCP jarak jauh menghadirkan risiko yang meningkat karena definisi alat dapat diperbarui setelah persetujuan awal pengguna, menciptakan skenario di mana alat yang sebelumnya aman menjadi berbahaya. Untuk analisis komprehensif, lihat [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/id/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vektor Serangan AI Tambahan**

- **Cross-Domain Prompt Injection (XPIA)**: Serangan canggih yang memanfaatkan konten dari berbagai domain untuk melewati kontrol keamanan
- **Perubahan Kapabilitas Dinamis**: Perubahan waktu nyata pada kapabilitas alat yang lolos dari penilaian keamanan awal
- **Peracunan Jendela Konteks**: Serangan yang memanipulasi jendela konteks besar untuk menyembunyikan instruksi berbahaya
- **Serangan Kebingungan Model**: Mengeksploitasi keterbatasan model untuk menciptakan perilaku yang tidak terduga atau tidak aman


### Dampak Risiko Keamanan AI

**Konsekuensi Dampak Tinggi:**
- **Eksfiltrasi Data**: Akses tidak sah dan pencurian data sensitif perusahaan atau pribadi
- **Pelanggaran Privasi**: Paparan informasi identitas pribadi (PII) dan data bisnis rahasia  
- **Manipulasi Sistem**: Modifikasi tidak disengaja pada sistem dan alur kerja kritis
- **Pencurian Kredensial**: Kompromi token autentikasi dan kredensial layanan
- **Pergerakan Lateral**: Penggunaan sistem AI yang dikompromikan sebagai titik pivot untuk serangan jaringan yang lebih luas

### Solusi Keamanan AI Microsoft

#### **AI Prompt Shields: Perlindungan Tingkat Lanjut Terhadap Serangan Injeksi**

Microsoft **AI Prompt Shields** menyediakan pertahanan komprehensif terhadap serangan injeksi prompt langsung maupun tidak langsung melalui beberapa lapisan keamanan:

##### **Mekanisme Perlindungan Inti:**

1. **Deteksi & Penyaringan Tingkat Lanjut**
   - Algoritma pembelajaran mesin dan teknik NLP mendeteksi instruksi berbahaya dalam konten eksternal
   - Analisis waktu nyata pada dokumen, halaman web, email, dan sumber data untuk ancaman tertanam
   - Pemahaman kontekstual pola prompt yang sah vs berbahaya

2. **Teknik Penyorotan**  
   - Membedakan antara instruksi sistem terpercaya dan input eksternal yang berpotensi dikompromikan
   - Metode transformasi teks yang meningkatkan relevansi model sambil mengisolasi konten berbahaya
   - Membantu sistem AI mempertahankan hierarki instruksi yang benar dan mengabaikan perintah yang disuntikkan

3. **Sistem Pembatas & Penandaan Data**
   - Definisi batas eksplisit antara pesan sistem terpercaya dan teks input eksternal
   - Marker khusus menyoroti batas antara sumber data tepercaya dan tidak tepercaya
   - Pemisahan yang jelas mencegah kebingungan instruksi dan eksekusi perintah tanpa izin

4. **Intelijen Ancaman Berkelanjutan**
   - Microsoft secara terus-menerus memantau pola serangan yang muncul dan memperbarui pertahanan
   - Perburuan ancaman proaktif untuk teknik injeksi dan vektor serangan baru
   - Pembaruan model keamanan secara rutin untuk mempertahankan efektivitas terhadap ancaman yang berkembang

5. **Integrasi Azure Content Safety**
   - Bagian dari paket lengkap Azure AI Content Safety
   - Deteksi tambahan untuk upaya jailbreak, konten berbahaya, dan pelanggaran kebijakan keamanan
   - Kontrol keamanan terpadu di seluruh komponen aplikasi AI

**Sumber Daya Implementasi**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/id/prompt-shield.ff5b95be76e9c78c.webp)


## Ancaman Keamanan MCP Lanjutan

### Kerentanan Pembajakan Sesi

**Pembajakan sesi** merupakan vektor serangan kritis dalam implementasi MCP yang stateful di mana pihak tidak berwenang memperoleh dan menyalahgunakan pengenal sesi yang sah untuk menyamar sebagai klien dan melakukan tindakan tanpa izin.

#### **Skenario Serangan & Risiko**

- **Injeksi Prompt Pembajakan Sesi**: Penyerang dengan ID sesi curian menyuntikkan kejadian berbahaya ke server yang berbagi status sesi, yang berpotensi memicu tindakan berbahaya atau mengakses data sensitif
- **Penyamaran Langsung**: ID sesi curian memungkinkan panggilan langsung ke server MCP yang melewati autentikasi, memperlakukan penyerang sebagai pengguna sah
- **Aliran yang Dapat Dilanjutkan Terkompromi**: Penyerang dapat menghentikan permintaan lebih awal, menyebabkan klien sah melanjutkan dengan konten yang berpotensi berbahaya

#### **Kontrol Keamanan untuk Manajemen Sesi**

**Persyaratan Kritis:**
- **Verifikasi Otorisasi**: Server MCP yang menerapkan otorisasi **HARUS** memverifikasi SEMUA permintaan masuk dan **TIDAK BOLEH** mengandalkan sesi untuk autentikasi
- **Pembuatan Sesi Aman**: Gunakan ID sesi yang aman secara kriptografis dan non-determinis, dihasilkan dengan generator angka acak yang aman
- **Pengikatan Spesifik Pengguna**: Ikat ID sesi dengan informasi spesifik pengguna menggunakan format seperti `<user_id>:<session_id>` untuk mencegah penyalahgunaan sesi antar pengguna
- **Manajemen Siklus Hidup Sesi**: Terapkan kedaluwarsa, rotasi, dan pembatalan yang tepat untuk membatasi jendela kerentanan
- **Keamanan Transportasi**: HTTPS wajib untuk semua komunikasi guna mencegah penyadapan ID sesi

### Masalah Deputi Bingung

**Masalah deputi bingung** terjadi ketika server MCP bertindak sebagai proxy autentikasi antara klien dan layanan pihak ketiga, menciptakan peluang untuk melewati otorisasi melalui eksploitasi ID klien statis.

#### **Mekanisme Serangan & Risiko**

- **Bypass Persetujuan Berbasis Cookie**: Autentikasi pengguna sebelumnya membuat cookie persetujuan yang dieksploitasi penyerang melalui permintaan otorisasi berbahaya dengan URI pengalihan yang dibuat khusus
- **Pencurian Kode Otorisasi**: Cookie persetujuan yang ada dapat menyebabkan server otorisasi melewati layar persetujuan, mengarahkan kode ke titik akhir yang dikuasai penyerang  
- **Akses API Tidak Sah**: Kode otorisasi curian memungkinkan pertukaran token dan penyamaran pengguna tanpa persetujuan eksplisit

#### **Strategi Mitigasi**

**Kontrol Wajib:**
- **Persyaratan Persetujuan Eksplisit**: Server proxy MCP dengan ID klien statis **HARUS** mendapatkan persetujuan pengguna untuk setiap klien yang didaftarkan secara dinamis
- **Implementasi Keamanan OAuth 2.1**: Ikuti praktik keamanan OAuth terbaru termasuk PKCE (Proof Key for Code Exchange) untuk semua permintaan otorisasi
- **Validasi Klien Ketat**: Terapkan validasi ketat terhadap URI pengalihan dan pengenal klien untuk mencegah eksploitasi

### Kerentanan Token Passthrough  

**Token passthrough** merupakan anti-pola eksplisit di mana server MCP menerima token klien tanpa validasi yang tepat dan meneruskannya ke API hilir, melanggar spesifikasi otorisasi MCP.

#### **Implikasi Keamanan**

- **Pelepasan Kontrol**: Penggunaan token langsung dari klien ke API melewati pembatasan laju, validasi, dan kontrol pemantauan yang penting
- **Kerusakan Jejak Audit**: Token yang diterbitkan di hulu membuat identifikasi klien tidak mungkin, merusak kemampuan investigasi insiden
- **Eksfiltrasi Data Berbasis Proxy**: Token tidak tervalidasi memungkinkan aktor jahat menggunakan server sebagai proxy untuk akses data yang tidak sah
- **Pelanggaran Batas Kepercayaan**: Asumsi kepercayaan layanan hilir mungkin dilanggar saat asal token tidak dapat diverifikasi
- **Perluasan Serangan Multi-layanan**: Token yang dikompromikan diterima oleh beberapa layanan memungkinkan pergerakan lateral

#### **Kontrol Keamanan yang Diperlukan**

**Persyaratan Tidak Bisa Ditawar:**
- **Validasi Token**: Server MCP **TIDAK BOLEH** menerima token yang tidak secara eksplisit diterbitkan untuk server MCP tersebut
- **Verifikasi Audiens**: Selalu validasi klaim audiens token sesuai identitas server MCP
- **Siklus Hidup Token yang Tepat**: Terapkan token akses dengan masa berlaku pendek dan praktik rotasi yang aman


## Keamanan Rantai Pasokan untuk Sistem AI

Keamanan rantai pasokan telah berkembang melampaui ketergantungan perangkat lunak tradisional untuk mencakup seluruh ekosistem AI. Implementasi MCP modern harus secara ketat memverifikasi dan memantau semua komponen terkait AI, karena masing-masing memperkenalkan potensi kerentanan yang dapat mengompromikan integritas sistem.

### Komponen Rantai Pasokan AI yang Diperluas

**Ketergantungan Perangkat Lunak Tradisional:**
- Perpustakaan dan kerangka kerja sumber terbuka
- Gambar kontainer dan sistem dasar  
- Alat pengembangan dan jalur pembangunan
- Komponen dan layanan infrastruktur

**Elemen Rantai Pasokan Khusus AI:**
- **Model Dasar**: Model pra-latih dari berbagai penyedia yang memerlukan verifikasi asal-usul
- **Layanan Embedding**: Layanan vektorisasi eksternal dan pencarian semantik
- **Penyedia Konteks**: Sumber data, basis pengetahuan, dan repositori dokumen  
- **API Pihak Ketiga**: Layanan AI eksternal, jalur ML, dan titik akhir pemrosesan data
- **Artefak Model**: Bobot, konfigurasi, dan varian model yang disesuaikan
- **Sumber Data Pelatihan**: Kumpulan data yang digunakan untuk pelatihan dan penyetelan model

### Strategi Keamanan Rantai Pasokan Komprehensif

#### **Verifikasi Komponen & Kepercayaan**
- **Validasi Asal-usul**: Verifikasi asal, lisensi, dan integritas semua komponen AI sebelum integrasi
- **Penilaian Keamanan**: Lakukan pemindaian kerentanan dan tinjauan keamanan untuk model, sumber data, dan layanan AI
- **Analisis Reputasi**: Evaluasi rekam jejak keamanan dan praktik penyedia layanan AI
- **Verifikasi Kepatuhan**: Pastikan semua komponen memenuhi persyaratan keamanan dan regulasi organisasi

#### **Jalur Penerapan yang Aman**  
- **Keamanan CI/CD Otomatis**: Integrasikan pemindaian keamanan sepanjang jalur penerapan otomatis
- **Integritas Artefak**: Terapkan verifikasi kriptografi untuk semua artefak yang diterapkan (kode, model, konfigurasi)
- **Penerapan Bertahap**: Gunakan strategi penerapan progresif dengan validasi keamanan di setiap tahap
- **Repositori Artefak Terpercaya**: Terapkan hanya dari registri dan repositori artefak yang terverifikasi dan aman

#### **Pemantauan & Tanggapan Berkelanjutan**
- **Pemindaian Ketergantungan**: Pemantauan kerentanan berkelanjutan untuk semua ketergantungan perangkat lunak dan komponen AI
- **Pemantauan Model**: Penilaian berkelanjutan perilaku model, pergeseran kinerja, dan anomali keamanan
- **Pelacakan Kesehatan Layanan**: Pantau layanan AI eksternal untuk ketersediaan, insiden keamanan, dan perubahan kebijakan
- **Integrasi Intelijen Ancaman**: Gabungkan umpan ancaman khusus risiko keamanan AI dan ML

#### **Kontrol Akses & Prinsip Hak Istimewa Minimum**
- **Izin Tingkat Komponen**: Batasi akses ke model, data, dan layanan berdasarkan kebutuhan bisnis
- **Manajemen Akun Layanan**: Terapkan akun layanan khusus dengan izin minimal yang diperlukan
- **Segmentasi Jaringan**: Isolasi komponen AI dan batasi akses jaringan antar layanan
- **Kontrol Gateway API**: Gunakan gateway API terpusat untuk mengontrol dan memantau akses ke layanan AI eksternal

#### **Tanggapan & Pemulihan Insiden**
- **Prosedur Tanggapan Cepat**: Proses yang sudah ada untuk memperbaiki atau mengganti komponen AI yang dikompromikan
- **Rotasi Kredensial**: Sistem otomatis untuk merotasi rahasia, kunci API, dan kredensial layanan
- **Kemampuan Rollback**: Kemampuan untuk dengan cepat kembali ke versi sebelumnya yang diketahui baik dari komponen AI
- **Pemulihan Pelanggaran Rantai Pasokan**: Prosedur khusus untuk menanggapi kompromi layanan AI hulu

### Alat & Integrasi Keamanan Microsoft

**GitHub Advanced Security** menyediakan perlindungan rantai pasokan komprehensif termasuk:
- **Pemindaian Rahasia**: Deteksi otomatis kredensial, kunci API, dan token dalam repositori
- **Pemindaian Ketergantungan**: Penilaian kerentanan untuk ketergantungan sumber terbuka dan perpustakaan
- **Analisis CodeQL**: Analisis kode statis untuk kerentanan keamanan dan masalah pengkodean
- **Wawasan Rantai Pasokan**: Visibilitas terhadap kesehatan ketergantungan dan status keamanan

**Integrasi Azure DevOps & Azure Repos:**
- Integrasi pemindaian keamanan mulus di seluruh platform pengembangan Microsoft
- Pemeriksaan keamanan otomatis di Azure Pipelines untuk beban kerja AI
- Penegakan kebijakan untuk penerapan komponen AI yang aman

**Praktik Internal Microsoft:**
Microsoft menerapkan praktik keamanan rantai pasokan yang luas di seluruh produk. Pelajari pendekatan terbukti di [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Praktik Terbaik Keamanan Dasar

Implementasi MCP mewarisi dan membangun di atas postur keamanan organisasi Anda yang sudah ada. Memperkuat praktik keamanan dasar secara signifikan meningkatkan keamanan keseluruhan dari sistem AI dan penerapan MCP.

### Fundamental Keamanan Inti

#### **Praktik Pengembangan Aman**
- **Kepatuhan OWASP**: Lindungi terhadap kerentanan aplikasi web [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Perlindungan Khusus AI**: Terapkan kontrol untuk [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Manajemen Rahasia yang Aman**: Gunakan vault khusus untuk token, kunci API, dan data konfigurasi sensitif
- **Enkripsi End-to-End**: Terapkan komunikasi aman di seluruh komponen aplikasi dan aliran data
- **Validasi Input**: Validasi ketat semua input pengguna, parameter API, dan sumber data

#### **Penguatan Infrastruktur**
- **Autentikasi Multi-Faktor**: MFA wajib untuk semua akun administratif dan layanan
- **Manajemen Patch**: Patching otomatis dan tepat waktu untuk sistem operasi, kerangka kerja, dan ketergantungan  
- **Integrasi Penyedia Identitas**: Manajemen identitas terpusat melalui penyedia identitas perusahaan (Microsoft Entra ID, Active Directory)
- **Segmentasi Jaringan**: Isolasi logis komponen MCP untuk membatasi potensi pergerakan lateral
- **Prinsip Hak Istimewa Minimum**: Izin minimal yang diperlukan untuk semua komponen dan akun sistem

#### **Pemantauan & Deteksi Keamanan**
- **Pencatatan Komprehensif**: Pencatatan rinci aktivitas aplikasi AI, termasuk interaksi klien-server MCP
- **Integrasi SIEM**: Manajemen informasi dan kejadian keamanan terpusat untuk deteksi anomali
- **Analitik Perilaku**: Pemantauan berbasis AI untuk mendeteksi pola tidak biasa dalam perilaku sistem dan pengguna
- **Intelijen Ancaman**: Integrasi umpan ancaman eksternal dan indikator kompromi (IOC)
- **Tanggapan Insiden**: Prosedur terdefinisi untuk deteksi, tanggapan, dan pemulihan insiden keamanan

#### **Arsitektur Zero Trust**
- **Jangan Pernah Percaya, Selalu Verifikasi**: Verifikasi berkelanjutan pengguna, perangkat, dan koneksi jaringan
- **Mikro-Segmentasi**: Kontrol jaringan granular yang mengisolasi beban kerja dan layanan individu
- **Keamanan Berbasis Identitas**: Kebijakan keamanan berdasarkan identitas yang diverifikasi daripada lokasi jaringan
- **Penilaian Risiko Berkelanjutan**: Evaluasi postur keamanan dinamis berdasarkan konteks dan perilaku saat ini
- **Akses Bersyarat**: Kontrol akses yang beradaptasi berdasarkan faktor risiko, lokasi, dan kepercayaan perangkat

### Pola Integrasi Perusahaan

#### **Integrasi Ekosistem Keamanan Microsoft**
- **Microsoft Defender for Cloud**: Manajemen postur keamanan cloud yang komprehensif
- **Azure Sentinel**: Kemampuan SIEM dan SOAR cloud-native untuk perlindungan beban kerja AI
- **Microsoft Entra ID**: Manajemen identitas dan akses perusahaan dengan kebijakan akses bersyarat
- **Azure Key Vault**: Manajemen rahasia terpusat dengan dukungan hardware security module (HSM)
- **Microsoft Purview**: Tata kelola data dan kepatuhan untuk sumber data dan alur kerja AI

#### **Kepatuhan & Tata Kelola**
- **Keselarasan Regulasi**: Pastikan implementasi MCP memenuhi persyaratan kepatuhan spesifik industri (GDPR, HIPAA, SOC 2)

- **Klasifikasi Data**: Kategorisasi dan penanganan yang tepat terhadap data sensitif yang diproses oleh sistem AI
- **Audit Trails**: Pencatatan komprehensif untuk kepatuhan regulasi dan investigasi forensik
- **Kontrol Privasi**: Penerapan prinsip privasi-dengan-desain dalam arsitektur sistem AI
- **Manajemen Perubahan**: Proses formal untuk tinjauan keamanan terhadap modifikasi sistem AI

Praktik-praktik dasar ini menciptakan dasar keamanan yang kuat yang meningkatkan efektivitas kontrol keamanan khusus MCP dan menyediakan perlindungan komprehensif untuk aplikasi yang digerakkan oleh AI.

## Poin-Poin Penting Keamanan

- **Pendekatan Keamanan Berlapis**: Gabungkan praktik keamanan dasar (pengkodean aman, hak istimewa paling rendah, verifikasi rantai pasokan, pemantauan kontinu) dengan kontrol khusus AI untuk perlindungan komprehensif

- **Lanskap Ancaman Khusus AI**: Sistem MCP menghadapi risiko unik termasuk injeksi prompt, keracunan alat, pembajakan sesi, masalah deputi bingung, kerentanan penerusan token, dan izin berlebihan yang memerlukan mitigasi khusus

- **Keunggulan Autentikasi & Otorisasi**: Terapkan autentikasi kuat menggunakan penyedia identitas eksternal (Microsoft Entra ID), terapkan validasi token yang tepat, dan jangan pernah menerima token yang tidak secara eksplisit diterbitkan untuk server MCP Anda

- **Pencegahan Serangan AI**: Terapkan Microsoft Prompt Shields dan Azure Content Safety untuk melindungi terhadap serangan injeksi prompt tidak langsung dan keracunan alat, sambil memvalidasi metadata alat dan memantau perubahan dinamis

- **Keamanan Sesi & Transportasi**: Gunakan ID sesi yang aman secara kriptografis dan non-deterministik yang terikat pada identitas pengguna, terapkan manajemen siklus hidup sesi yang tepat, dan jangan gunakan sesi untuk autentikasi

- **Praktik Terbaik Keamanan OAuth**: Cegah serangan deputi bingung melalui persetujuan eksplisit pengguna untuk klien yang terdaftar secara dinamis, penerapan OAuth 2.1 yang tepat dengan PKCE, dan validasi URI pengalihan yang ketat  

- **Prinsip Keamanan Token**: Hindari pola antipenerusan token, validasi klaim audiens token, terapkan token dengan masa hidup pendek dan rotasi yang aman, serta jaga batas kepercayaan yang jelas

- **Keamanan Rantai Pasokan Komprehensif**: Perlakukan semua komponen ekosistem AI (model, embedding, penyedia konteks, API eksternal) dengan ketelitian keamanan yang sama seperti ketergantungan perangkat lunak tradisional

- **Evolusi Berkelanjutan**: Tetap terkini dengan spesifikasi MCP yang berkembang pesat, kontribusi pada standar komunitas keamanan, dan pertahankan postur keamanan adaptif seiring kematangan protokol

- **Integrasi Keamanan Microsoft**: Manfaatkan ekosistem keamanan komprehensif Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) untuk perlindungan peningkatan dalam penyebaran MCP

## Sumber Daya Komprehensif

### **Dokumentasi Resmi Keamanan MCP**
- [Spesifikasi MCP (Saat Ini: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Praktik Terbaik Keamanan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Otorisasi MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositori GitHub MCP](https://github.com/modelcontextprotocol)

### **Sumber Daya Keamanan OWASP MCP**
- [Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Panduan komprehensif OWASP MCP Top 10 dengan implementasi Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keamanan resmi OWASP MCP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Pelatihan keamanan langsung untuk MCP di Azure

### **Standar & Praktik Terbaik Keamanan**
- [Praktik Terbaik Keamanan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Keamanan Aplikasi Web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 untuk Model Bahasa Besar](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Laporan Pertahanan Digital Microsoft](https://aka.ms/mddr)

### **Riset & Analisis Keamanan AI**
- [Injeksi Prompt dalam MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Serangan Keracunan Alat (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing Riset Keamanan MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Solusi Keamanan Microsoft**
- [Dokumentasi Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Layanan Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Keamanan Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Praktik Terbaik Manajemen Token Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Panduan Implementasi & Tutorial**
- [Manajemen API Azure sebagai Gerbang Autentikasi MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autentikasi Microsoft Entra ID dengan Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Penyimpanan & Enkripsi Token Aman (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Keamanan Rantai Pasokan**
- [Keamanan Azure DevOps](https://azure.microsoft.com/products/devops)
- [Keamanan Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Perjalanan Keamanan Rantai Pasokan Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dokumentasi Keamanan Tambahan**

Untuk panduan keamanan yang komprehensif, lihat dokumen khusus berikut di bagian ini:

- **[Praktik Terbaik Keamanan MCP 2025](./mcp-security-best-practices-2025.md)** - Praktik terbaik keamanan lengkap untuk implementasi MCP
- **[Implementasi Azure Content Safety](./azure-content-safety-implementation.md)** - Contoh implementasi praktis untuk integrasi Azure Content Safety  
- **[Kontrol Keamanan MCP 2025](./mcp-security-controls-2025.md)** - Kontrol keamanan dan teknik terbaru untuk penyebaran MCP
- **[Referensi Cepat Praktik Terbaik MCP](./mcp-best-practices.md)** - Panduan referensi cepat untuk praktik keamanan MCP esensial
- **[BlueHat 2026: Mengamankan masa depan AI: Mengamankan MCP dengan pola pertahanan berlapis](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Pola pertahanan berlapis dari Microsoft Security Response Center (MSRC)

### **Pelatihan Keamanan Praktis**

- **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop praktis komprehensif untuk mengamankan server MCP di Azure dengan kamp progresif dari Base Camp hingga Summit
- **[Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Arsitektur referensi dan panduan implementasi untuk semua risiko OWASP MCP Top 10

---

## Apa Selanjutnya

Berikutnya: [Bab 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->