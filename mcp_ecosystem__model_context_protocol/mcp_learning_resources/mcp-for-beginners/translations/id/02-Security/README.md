# Keamanan MCP: Perlindungan Komprehensif untuk Sistem AI

[![Praktik Terbaik Keamanan MCP](../../../translated_images/id/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik gambar di atas untuk menonton video pelajaran ini)_

Keamanan adalah dasar dari desain sistem AI, itulah mengapa kami memprioritaskannya sebagai bagian kedua. Ini sejalan dengan prinsip **Secure by Design** Microsoft dari [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) membawa kemampuan baru yang kuat untuk aplikasi yang digerakkan AI sekaligus menghadirkan tantangan keamanan unik yang melampaui risiko perangkat lunak tradisional. Sistem MCP menghadapi kekhawatiran keamanan yang sudah ada (pengkodean aman, prinsip least privilege, keamanan rantai pasokan) serta ancaman spesifik AI baru termasuk injeksi prompt, keracunan alat, pembajakan sesi, serangan confused deputy, kerentanan token passthrough, dan modifikasi kapabilitas dinamis.

Pelajaran ini membahas risiko keamanan paling kritis dalam implementasi MCP—mencakup autentikasi, otorisasi, izin berlebihan, injeksi prompt tidak langsung, keamanan sesi, masalah confused deputy, manajemen token, dan kerentanan rantai pasokan. Anda akan belajar kontrol yang dapat diterapkan dan praktik terbaik untuk mengurangi risiko ini sambil memanfaatkan solusi Microsoft seperti Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk memperkuat penyebaran MCP Anda.

## Tujuan Pembelajaran

Pada akhir pelajaran ini, Anda akan dapat:

- **Mengidentifikasi Ancaman Spesifik MCP**: Mengenali risiko keamanan unik pada sistem MCP termasuk injeksi prompt, keracunan alat, izin berlebihan, pembajakan sesi, masalah confused deputy, kerentanan token passthrough, dan risiko rantai pasokan
- **Menerapkan Kontrol Keamanan**: Melaksanakan mitigasi efektif termasuk autentikasi yang kokoh, akses least privilege, manajemen token yang aman, kontrol keamanan sesi, dan verifikasi rantai pasokan
- **Memanfaatkan Solusi Keamanan Microsoft**: Memahami dan mengimplementasikan Microsoft Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk perlindungan beban kerja MCP
- **Memvalidasi Keamanan Alat**: Mengenali pentingnya validasi metadata alat, pemantauan perubahan dinamis, dan perlindungan terhadap serangan injeksi prompt tidak langsung
- **Mengintegrasikan Praktik Terbaik**: Mengombinasikan dasar keamanan yang sudah ada (pengkodean aman, hardening server, zero trust) dengan kontrol spesifik MCP untuk perlindungan menyeluruh

# Arsitektur & Kontrol Keamanan MCP

Implementasi MCP modern memerlukan pendekatan keamanan berlapis yang menangani keamanan perangkat lunak tradisional dan ancaman spesifik AI. Spesifikasi MCP yang berkembang pesat terus mematangkan kontrol keamanannya, memungkinkan integrasi lebih baik dengan arsitektur keamanan perusahaan dan praktik terbaik yang sudah mapan.

Riset dari [Microsoft Digital Defense Report](https://aka.ms/mddr) menunjukkan bahwa **98% pelanggaran yang dilaporkan dapat dicegah dengan higiene keamanan yang kuat**. Strategi perlindungan paling efektif menggabungkan praktik keamanan dasar dengan kontrol khusus MCP—langkah keamanan dasar yang terbukti tetap paling berdampak dalam mengurangi risiko keamanan secara keseluruhan.

## Lanskap Keamanan Saat Ini

> **Catatan:** Informasi ini mencerminkan standar keamanan MCP per **5 Februari 2026**, sesuai dengan **Spesifikasi MCP 2025-11-25**. Protokol MCP terus berkembang dengan cepat, dan implementasi mendatang mungkin memperkenalkan pola autentikasi baru dan kontrol yang ditingkatkan. Selalu lihat [Spesifikasi MCP](https://spec.modelcontextprotocol.io/), [repositori MCP GitHub](https://github.com/modelcontextprotocol), dan [dokumentasi praktik terbaik keamanan](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) untuk panduan terbaru.

## 🏔️ Workshop MCP Security Summit (Sherpa)

Untuk **pelatihan keamanan praktis**, kami sangat merekomendasikan **MCP Security Summit Workshop** (Sherpa) - ekspedisi panduan komprehensif untuk mengamankan server MCP di Microsoft Azure.

### Gambaran Workshop

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) menyediakan pelatihan keamanan praktis dan dapat diterapkan melalui metodologi "rentan → eksploit → perbaiki → validasi" yang terbukti. Anda akan:

- **Belajar dengan Memecahkan Kerentanan**: Mengalami langsung kerentanan dengan mengeksploitasi server yang sengaja tidak aman
- **Menggunakan Keamanan Azure-Native**: Memanfaatkan Azure Entra ID, Key Vault, API Management, dan AI Content Safety
- **Mengikuti Pendekatan Defense-in-Depth**: Melalui kamp-kamp membangun lapisan keamanan komprehensif
- **Menerapkan Standar OWASP**: Setiap teknik terkait dengan [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Mendapatkan Kode Produksi**: Mendapatkan implementasi yang berfungsi dan teruji

### Jalur Ekspedisi

| Kamp | Fokus | Risiko OWASP yang Dicakup |
|------|-------|---------------------------|
| **Base Camp** | Dasar MCP & kerentanan autentikasi | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, tata kelola | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: I/O Security** | Injeksi prompt, perlindungan PII, keamanan konten | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: Monitoring** | Log Analytics, dashboard, deteksi ancaman | MCP04, MCP08 |
| **The Summit** | Uji integrasi Red Team / Blue Team | Semua |

**Mulai Sekarang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## 10 Risiko Keamanan Teratas MCP menurut OWASP

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) merinci sepuluh risiko keamanan paling kritis untuk implementasi MCP:

| Risiko | Deskripsi | Mitigasi Azure |
|--------|-----------|----------------|
| **MCP01** | Kesalahan Manajemen Token & Paparan Rahasia | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalasi Privilege melalui Perluasan Scope | RBAC, Conditional Access |
| **MCP03** | Keracunan Alat | Validasi alat, verifikasi integritas |
| **MCP04** | Serangan Rantai Pasokan Perangkat Lunak & Manipulasi Dependensi | GitHub Advanced Security, pemindaian dependensi |
| **MCP05** | Injeksi & Eksekusi Perintah | Validasi input, sandboxing |
| **MCP06** | Subversi Alur Niat | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autentikasi & Otorisasi Tidak Memadai | Azure Entra ID, OAuth 2.1 dengan PKCE |
| **MCP08** | Kekurangan Audit dan Telemetri | Azure Monitor, Application Insights |
| **MCP09** | Server MCP Bayangan | Tata kelola API Center, isolasi jaringan |
| **MCP10** | Injeksi Konteks & Over-Sharing | Klasifikasi data, paparan minimal |

### Evolusi Autentikasi MCP

Spesifikasi MCP sangat berkembang dalam pendekatan autentikasi dan otorisasi:

- **Pendekatan Awal**: Spesifikasi awal mengharuskan pengembang membuat server autentikasi khusus, dengan server MCP bertindak sebagai OAuth 2.0 Authorization Server yang mengelola autentikasi pengguna secara langsung
- **Standar Saat Ini (2025-11-25)**: Spesifikasi diperbarui memungkinkan server MCP mendelegasikan autentikasi ke penyedia identitas eksternal (seperti Microsoft Entra ID), meningkatkan postur keamanan dan mengurangi kompleksitas implementasi
- **Transport Layer Security**: Dukungan yang ditingkatkan untuk mekanisme transportasi aman dengan pola autentikasi yang tepat untuk koneksi lokal (STDIO) dan jarak jauh (Streamable HTTP)

## Keamanan Autentikasi & Otorisasi

### Tantangan Keamanan Saat Ini

Implementasi MCP modern menghadapi beberapa tantangan autentikasi dan otorisasi:

### Risiko & Vektor Ancaman

- **Logika Otorisasi Salah Konfigurasi**: Implementasi otorisasi yang keliru pada server MCP dapat mengekspos data sensitif dan penerapan kontrol akses yang salah
- **Kompromi Token OAuth**: Pencurian token pada server MCP lokal memberi penyerang kemampuan berpura-pura sebagai server dan mengakses layanan hilir
- **Kerentanan Token Passthrough**: Penanganan token yang tidak tepat menciptakan celah kontrol keamanan dan kesenjangan akuntabilitas
- **Izin Berlebihan**: Server MCP dengan izin berlebih melanggar prinsip least privilege dan memperluas permukaan serangan

#### Token Passthrough: Anti-Pattern Kritis

**Token passthrough secara eksplisit dilarang** dalam spesifikasi otorisasi MCP saat ini karena implikasi keamanannya yang serius:

##### Pengelakan Kontrol Keamanan
- Server MCP dan API hilir menerapkan kontrol keamanan penting (pembatasan laju, validasi permintaan, pemantauan lalu lintas) yang bergantung pada validasi token yang tepat
- Penggunaan token langsung dari klien ke API melewati perlindungan ini, melemahkan arsitektur keamanan

##### Tantangan Akuntabilitas & Audit  
- Server MCP tidak dapat membedakan klien yang menggunakan token yang dikeluarkan dari hulu, memutus jejak audit
- Log server sumber daya hilir menunjukkan asal permintaan yang menyesatkan daripada perantara server MCP sebenarnya
- Investigasi insiden dan audit kepatuhan menjadi jauh lebih sulit

##### Risiko Eksfiltrasi Data
- Klaim token yang tidak divalidasi memungkinkan aktor jahat dengan token curian menggunakan server MCP sebagai proxy untuk eksfiltrasi data
- Pelanggaran batas kepercayaan memungkinkan pola akses tidak sah yang melewati kontrol keamanan yang dimaksudkan

##### Vektor Serangan Multi-Layanan
- Token yang dikompromikan dan diterima oleh banyak layanan memungkinkan perpindahan lateral antar sistem terhubung
- Asumsi kepercayaan antar layanan dapat dilanggar ketika asal token tidak dapat diverifikasi

### Kontrol Keamanan & Mitigasi

**Persyaratan Keamanan Kritikal:**

> **WAJIB**: Server MCP **TIDAK BOLEH** menerima token yang tidak secara eksplisit diterbitkan untuk server MCP tersebut

#### Kontrol Autentikasi & Otorisasi

- **Tinjauan Otorisasi Ketat**: Lakukan audit menyeluruh pada logika otorisasi server MCP untuk memastikan hanya pengguna dan klien yang dimaksud yang dapat mengakses sumber daya sensitif
  - **Panduan Implementasi**: [Azure API Management sebagai Gerbang Autentikasi untuk Server MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrasi Identitas**: [Menggunakan Microsoft Entra ID untuk Autentikasi Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Manajemen Token yang Aman**: Terapkan [praktik terbaik Microsoft dalam validasi token dan siklus hidup token](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validasi klaim audience token agar sesuai dengan identitas server MCP
  - Terapkan kebijakan rotasi dan kadaluwarsa token yang tepat
  - Cegah serangan token replay dan penggunaan tanpa izin

- **Penyimpanan Token yang Dilindungi**: Simpan token dengan enkripsi baik saat diam maupun dalam perjalanan
  - **Praktik Terbaik**: [Panduan Penyimpanan dan Enkripsi Token yang Aman](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementasi Kontrol Akses

- **Prinsip Least Privilege**: Berikan server MCP hanya izin minimum yang diperlukan untuk fungsionalitas yang dimaksud
  - Tinjau dan perbarui izin secara berkala untuk mencegah perluasan hak istimewa
  - **Dokumentasi Microsoft**: [Akses Least-Privileged yang Aman](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrol Akses Berbasis Peran (RBAC)**: Terapkan penetapan peran secara rinci
  - Batasi cakupan peran ke sumber daya dan tindakan spesifik
  - Hindari izin luas atau tidak perlu yang memperluas permukaan serangan

- **Pemantauan Perizinan Berkelanjutan**: Terapkan audit dan pemantauan akses secara terus-menerus
  - Pantau pola penggunaan izin untuk anomali
  - Segera tangani hak akses berlebihan atau yang tidak digunakan

## Ancaman Keamanan Spesifik AI

### Serangan Injeksi Prompt & Manipulasi Alat

Implementasi MCP modern menghadapi vektor serangan canggih spesifik AI yang tidak dapat sepenuhnya diatasi dengan langkah keamanan tradisional:

#### **Injeksi Prompt Tidak Langsung (Cross-Domain Prompt Injection)**

**Injeksi Prompt Tidak Langsung** merupakan salah satu kerentanan paling kritis pada sistem AI yang diaktifkan MCP. Penyerang menyisipkan instruksi berbahaya dalam konten eksternal—dokumen, halaman web, email, atau sumber data—yang kemudian diproses sistem AI sebagai perintah sah.

**Skenario Serangan:**
- **Injeksi Berbasis Dokumen**: Instruksi berbahaya tersembunyi dalam dokumen yang diproses memicu tindakan AI yang tidak diinginkan
- **Eksploitasi Konten Web**: Halaman web yang dikompromikan berisi prompt tertanam yang memanipulasi perilaku AI saat di-scrape
- **Serangan Berbasis Email**: Prompt berbahaya dalam email menyebabkan asisten AI membocorkan informasi atau melakukan tindakan tanpa izin
- **Kontaminasi Sumber Data**: Basis data atau API yang dikompromikan menyajikan konten tercemar ke sistem AI

**Dampak Dunia Nyata**: Serangan ini dapat menyebabkan eksfiltrasi data, pelanggaran privasi, pembuatan konten berbahaya, dan manipulasi interaksi pengguna. Untuk analisis mendalam, lihat [Prompt Injection di MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram Serangan Injeksi Prompt](../../../translated_images/id/prompt-injection.ed9fbfde297ca877.webp)

#### **Serangan Keracunan Alat**

**Keracunan Alat** menargetkan metadata yang mendefinisikan alat MCP, mengeksploitasi cara LLM menafsirkan deskripsi dan parameter alat untuk membuat keputusan eksekusi.

**Mekanisme Serangan:**
- **Manipulasi Metadata**: Penyerang menyisipkan instruksi jahat ke dalam deskripsi alat, definisi parameter, atau contoh penggunaan
- **Instruksi Tak Terlihat**: Prompt tersembunyi dalam metadata alat yang diproses model AI namun tidak terlihat oleh pengguna manusia
- **Modifikasi Alat Dinamis ("Rug Pulls")**: Alat yang disetujui pengguna kemudian diubah untuk melakukan tindakan berbahaya tanpa sepengetahuan pengguna
- **Injeksi Parameter**: Konten berbahaya disisipkan dalam skema parameter alat yang memengaruhi perilaku model

**Risiko Server Tuan Rumah**: Server MCP jarak jauh memiliki risiko tinggi karena definisi alat dapat diperbarui setelah persetujuan awal pengguna, menciptakan skenario alat yang sebelumnya aman menjadi berbahaya. Untuk analisis komprehensif, lihat [Serangan Keracunan Alat (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram Serangan Injeksi Alat](../../../translated_images/id/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vektor Serangan AI Tambahan**

- **Injeksi Prompt Lintas Domain (XPIA)**: Serangan canggih yang memanfaatkan konten dari beberapa domain untuk melewati kontrol keamanan  

- **Modifikasi Kapabilitas Dinamis**: Perubahan real-time pada kapabilitas alat yang melewati penilaian keamanan awal  
- **Kontaminasi Jendela Konteks**: Serangan yang memanipulasi jendela konteks besar untuk menyembunyikan instruksi berbahaya  
- **Serangan Kebingungan Model**: Mengeksploitasi keterbatasan model untuk menciptakan perilaku yang tidak terduga atau tidak aman  


### Dampak Risiko Keamanan AI

**Konsekuensi Berdampak Tinggi:**  
- **Eksfiltrasi Data**: Akses dan pencurian data sensitif perusahaan atau pribadi tanpa izin  
- **Pelanggaran Privasi**: Paparan informasi yang dapat diidentifikasi secara pribadi (PII) dan data bisnis rahasia  
- **Manipulasi Sistem**: Modifikasi yang tidak disengaja pada sistem dan alur kerja kritis  
- **Pencurian Kredensial**: Kompromi token autentikasi dan kredensial layanan  
- **Pergerakan Lateral**: Penggunaan sistem AI yang dikompromikan sebagai titik pusat untuk serangan jaringan yang lebih luas  

### Solusi Keamanan AI Microsoft

#### **Perisai Prompt AI: Perlindungan Lanjutan Terhadap Serangan Injeksi**

Microsoft **AI Prompt Shields** menyediakan pertahanan menyeluruh terhadap serangan injeksi prompt baik langsung maupun tidak langsung melalui lapisan keamanan ganda:

##### **Mekanisme Perlindungan Inti:**

1. **Deteksi & Penyaringan Lanjutan**  
   - Algoritma pembelajaran mesin dan teknik NLP mendeteksi instruksi berbahaya dalam konten eksternal  
   - Analisis real-time dokumen, halaman web, email, dan sumber data untuk ancaman tersembunyi  
   - Pemahaman kontekstual pola prompt yang sah vs berbahaya  

2. **Teknik Spotlighting**  
   - Membedakan antara instruksi sistem tepercaya dan input eksternal yang berpotensi dikompromikan  
   - Metode transformasi teks yang meningkatkan relevansi model sekaligus mengisolasi konten berbahaya  
   - Membantu sistem AI mempertahankan hierarki instruksi yang tepat dan mengabaikan perintah injeksi  

3. **Sistem Pembatas & Penandaan Data**  
   - Definisi batas eksplisit antara pesan sistem tepercaya dan teks input eksternal  
   - Penanda khusus yang menyoroti batas antara sumber data tepercaya dan tidak tepercaya  
   - Pemisahan jelas mencegah kebingungan instruksi dan eksekusi perintah tanpa izin  

4. **Intelijen Ancaman Berkelanjutan**  
   - Microsoft secara kontinu memantau pola serangan yang berkembang dan memperbarui pertahanan  
   - Pemburuan ancaman proaktif untuk teknik injeksi dan vektor serangan baru  
   - Pembaruan model keamanan rutin untuk mempertahankan efektivitas terhadap ancaman yang berkembang  

5. **Integrasi Azure Content Safety**  
   - Bagian dari rangkaian komprehensif Azure AI Content Safety  
   - Deteksi tambahan untuk upaya jailbreak, konten berbahaya, dan pelanggaran kebijakan keamanan  
   - Kontrol keamanan terpadu di seluruh komponen aplikasi AI  

**Sumber Implementasi**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/id/prompt-shield.ff5b95be76e9c78c.webp)


## Ancaman Keamanan MCP Lanjutan

### Kerentanan Pengambilalihan Sesi

**Pengambilalihan sesi** merupakan vektor serangan kritis dalam implementasi MCP stateful di mana pihak tidak berwenang memperoleh dan menyalahgunakan pengenal sesi yang sah untuk menyamar sebagai klien dan melakukan aksi tanpa izin.

#### **Skenario Serangan & Risiko**

- **Injeksi Prompt Pengambilalihan Sesi**: Penyerang dengan ID sesi yang dicuri menyuntikkan peristiwa berbahaya ke server berbagi status sesi, berpotensi memicu aksi merusak atau mengakses data sensitif  
- **Peniruan Langsung**: ID sesi yang dicuri memungkinkan panggilan server MCP langsung yang melewati autentikasi, memperlakukan penyerang sebagai pengguna sah  
- **Aliran Resume yang Dikompromikan**: Penyerang dapat mengakhiri permintaan lebih awal, menyebabkan klien sah melanjutkan dengan konten yang mungkin berbahaya  

#### **Kontrol Keamanan untuk Manajemen Sesi**

**Persyaratan Kritis:**  
- **Verifikasi Otorisasi**: Server MCP yang mengimplementasikan otorisasi **HARUS** memverifikasi SEMUA permintaan masuk dan **TIDAK BOLEH** bergantung pada sesi untuk autentikasi  
- **Pembuatan Sesi Aman**: Gunakan ID sesi kriptografis yang aman dan nondeterministik yang dihasilkan oleh generator angka acak yang aman  
- **Pengikatan Spesifik Pengguna**: Ikat ID sesi ke informasi spesifik pengguna menggunakan format seperti `<user_id>:<session_id>` untuk mencegah penyalahgunaan sesi antar pengguna  
- **Manajemen Siklus Hidup Sesi**: Terapkan kadaluarsa, rotasi, dan invalidasi yang tepat untuk membatasi jendela kerentanan  
- **Keamanan Transportasi**: HTTPS wajib digunakan untuk semua komunikasi guna mencegah penyadapan ID sesi  

### Masalah Deputi Bingung

**Masalah deputi bingung** terjadi ketika server MCP bertindak sebagai proxy autentikasi antara klien dan layanan pihak ketiga, membuka peluang bypass otorisasi melalui eksploitasi ID klien statis.

#### **Mekanisme Serangan & Risiko**

- **Bypass Persetujuan Berbasis Cookie**: Autentikasi pengguna sebelumnya menciptakan cookie persetujuan yang dieksploitasi penyerang melalui permintaan otorisasi berbahaya dengan URI pengalihan yang dibuat khusus  
- **Pencurian Kode Otorisasi**: Cookie persetujuan yang ada dapat menyebabkan server otorisasi melewati layar persetujuan, mengalihkan kode ke endpoint yang dikontrol penyerang  
- **Akses API Tanpa Izin**: Kode otorisasi yang dicuri memungkinkan pertukaran token dan penyamaran pengguna tanpa persetujuan eksplisit  

#### **Strategi Mitigasi**

**Kontrol Wajib:**  
- **Persyaratan Persetujuan Eksplisit**: Server proxy MCP yang menggunakan ID klien statis **HARUS** memperoleh persetujuan pengguna untuk setiap klien yang terdaftar secara dinamis  
- **Implementasi Keamanan OAuth 2.1**: Ikuti praktik terbaik keamanan OAuth saat ini termasuk PKCE (Proof Key for Code Exchange) untuk semua permintaan otorisasi  
- **Validasi Klien Ketat**: Terapkan validasi ketat pada URI pengalihan dan pengenal klien untuk mencegah eksploitasi  

### Kerentanan Token Passthrough  

**Token passthrough** merupakan anti-pola eksplisit di mana server MCP menerima token klien tanpa validasi yang tepat dan meneruskannya ke API hilir, melanggar spesifikasi otorisasi MCP.

#### **Implikasi Keamanan**

- **Penghindaran Kontrol**: Penggunaan token langsung dari klien ke API melewati kontrol pembatasan laju, validasi, dan pemantauan yang kritis  
- **Kerusakan Jejak Audit**: Token yang diterbitkan di hulu membuat identifikasi klien tidak mungkin, merusak kemampuan investigasi insiden  
- **Eksfiltrasi Data Berbasis Proxy**: Token yang tidak tervalidasi memungkinkan aktor jahat menggunakan server sebagai proxy untuk akses data tanpa izin  
- **Pelanggaran Batas Kepercayaan**: Asumsi kepercayaan layanan hilir dapat dilanggar ketika asal token tidak dapat diverifikasi  
- **Perluasan Serangan Multi-layanan**: Token yang dikompromikan diterima di berbagai layanan memungkinkan pergerakan lateral  

#### **Kontrol Keamanan yang Diperlukan**

**Persyaratan Tidak Bisa Ditawar:**  
- **Validasi Token**: Server MCP **TIDAK BOLEH** menerima token yang tidak diterbitkan secara eksplisit untuk server MCP  
- **Verifikasi Audiens**: Selalu verifikasi klaim audiens token sesuai dengan identitas server MCP  
- **Siklus Hidup Token yang Tepat**: Terapkan token akses berumur pendek dengan praktik rotasi yang aman  


## Keamanan Rantai Pasokan untuk Sistem AI

Keamanan rantai pasokan telah berkembang melampaui ketergantungan perangkat lunak tradisional untuk mencakup seluruh ekosistem AI. Implementasi MCP modern harus secara ketat memverifikasi dan memantau semua komponen terkait AI, karena setiap komponen membawa potensi kerentanan yang dapat mengompromikan integritas sistem.

### Komponen Rantai Pasokan AI yang Diperluas

**Ketergantungan Perangkat Lunak Tradisional:**  
- Perpustakaan dan kerangka kerja open-source  
- Gambar kontainer dan sistem basis  
- Alat pengembangan dan pipeline build  
- Komponen dan layanan infrastruktur  

**Elemen Rantai Pasokan Spesifik AI:**  
- **Model Fondasi**: Model pra-latih dari berbagai penyedia yang memerlukan verifikasi asal-usul  
- **Layanan Embedding**: Layanan vektorisasi dan pencarian semantik eksternal  
- **Penyedia Konteks**: Sumber data, basis pengetahuan, dan repositori dokumen  
- **API Pihak Ketiga**: Layanan AI eksternal, pipeline ML, dan endpoint pemrosesan data  
- **Artefak Model**: Bobot, konfigurasi, dan varian model yang sudah disetel  
- **Sumber Data Pelatihan**: Dataset yang digunakan untuk pelatihan dan penyetelan model  

### Strategi Keamanan Rantai Pasokan Menyeluruh

#### **Verifikasi Komponen & Kepercayaan**  
- **Validasi Asal-usul**: Verifikasi asal, lisensi, dan integritas semua komponen AI sebelum integrasi  
- **Penilaian Keamanan**: Lakukan pemindaian kerentanan dan tinjauan keamanan untuk model, sumber data, dan layanan AI  
- **Analisis Reputasi**: Evaluasi rekam jejak keamanan dan praktik penyedia layanan AI  
- **Verifikasi Kepatuhan**: Pastikan semua komponen memenuhi persyaratan keamanan dan regulasi organisasi  

#### **Pipeline Deployment Aman**  
- **Otomatisasi Keamanan CI/CD**: Integrasikan pemindaian keamanan di seluruh pipeline deployment otomatis  
- **Integritas Artefak**: Terapkan verifikasi kriptografis untuk semua artefak yang dideploy (kode, model, konfigurasi)  
- **Deployment Bertahap**: Gunakan strategi deployment progresif dengan validasi keamanan di setiap tahap  
- **Repositori Artefak Terpercaya**: Deploy hanya dari registri dan repositori artefak yang terverifikasi dan aman  

#### **Pemantauan & Respons Berkelanjutan**  
- **Pemindaian Ketergantungan**: Pemantauan kerentanan berkelanjutan untuk semua ketergantungan perangkat lunak dan komponen AI  
- **Pemantauan Model**: Penilaian kontinu perilaku model, drift performa, dan anomali keamanan  
- **Pelacakan Kesehatan Layanan**: Pantau layanan AI eksternal untuk ketersediaan, insiden keamanan, dan perubahan kebijakan  
- **Integrasi Intelijen Ancaman**: Masukkan feed ancaman khusus risiko keamanan AI dan ML  

#### **Kontrol Akses & Hak Istimewa Minimal**  
- **Izin Level Komponen**: Batasi akses ke model, data, dan layanan berdasarkan kebutuhan bisnis  
- **Manajemen Akun Layanan**: Terapkan akun layanan khusus dengan izin minimal yang diperlukan  
- **Segmentasi Jaringan**: Isolasi komponen AI dan batasi akses jaringan antar layanan  
- **Kontrol API Gateway**: Gunakan gateway API terpusat untuk mengontrol dan memantau akses ke layanan AI eksternal  

#### **Respons & Pemulihan Insiden**  
- **Prosedur Respons Cepat**: Proses yang ditetapkan untuk patch atau mengganti komponen AI yang dikompromikan  
- **Rotasi Kredensial**: Sistem otomatis untuk merotasi rahasia, kunci API, dan kredensial layanan  
- **Kemampuan Rollback**: Kemampuan untuk dengan cepat memulihkan versi komponen AI yang sudah terverifikasi  
- **Pemulihan Pelanggaran Rantai Pasokan**: Prosedur khusus untuk merespons kompromi layanan AI hulu  

### Alat & Integrasi Keamanan Microsoft

**GitHub Advanced Security** menyediakan perlindungan rantai pasokan menyeluruh termasuk:  
- **Pemindaian Rahasia**: Deteksi otomatis kredensial, kunci API, dan token dalam repositori  
- **Pemindaian Ketergantungan**: Penilaian kerentanan untuk ketergantungan dan pustaka open-source  
- **Analisis CodeQL**: Analisis kode statis untuk kerentanan keamanan dan masalah pengkodean  
- **Wawasan Rantai Pasokan**: Visibilitas kesehatan ketergantungan dan status keamanan  

**Integrasi Azure DevOps & Azure Repos:**  
- Integrasi pemindaian keamanan mulus di seluruh platform pengembangan Microsoft  
- Pemeriksaan keamanan otomatis di Azure Pipelines untuk beban kerja AI  
- Penegakan kebijakan untuk deployment komponen AI yang aman  

**Praktik Internal Microsoft:**  
Microsoft mengimplementasikan praktik keamanan rantai pasokan yang luas di seluruh produk. Pelajari pendekatan yang terbukti di [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Praktik Terbaik Keamanan Fondasi

Implementasi MCP mewarisi dan membangun di atas postur keamanan organisasi Anda yang sudah ada. Memperkuat praktik keamanan dasar secara signifikan meningkatkan keamanan keseluruhan sistem AI dan deployment MCP.

### Fundamental Keamanan Inti

#### **Praktik Pengembangan Aman**  
- **Kepatuhan OWASP**: Lindungi dari kerentanan aplikasi web [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Perlindungan Spesifik AI**: Terapkan kontrol untuk [OWASP Top 10 untuk LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Manajemen Rahasia Aman**: Gunakan vault khusus untuk token, kunci API, dan data konfigurasi sensitif  
- **Enkripsi End-to-End**: Terapkan komunikasi aman di seluruh komponen aplikasi dan aliran data  
- **Validasi Input**: Validasi ketat semua input pengguna, parameter API, dan sumber data  

#### **Penguatan Infrastruktur**  
- **Autentikasi Multi-Faktor**: MFA wajib untuk semua akun administratif dan layanan  
- **Manajemen Patch**: Patching otomatis dan tepat waktu untuk sistem operasi, kerangka kerja, dan ketergantungan  
- **Integrasi Penyedia Identitas**: Manajemen identitas terpusat melalui penyedia identitas perusahaan (Microsoft Entra ID, Active Directory)  
- **Segmentasi Jaringan**: Isolasi logis komponen MCP untuk membatasi potensi pergerakan lateral  
- **Prinsip Hak Istimewa Minimal**: Izin minimal yang diperlukan untuk semua komponen dan akun sistem  

#### **Pemantauan & Deteksi Keamanan**  
- **Logging Lengkap**: Logging detail aktivitas aplikasi AI, termasuk interaksi klien-server MCP  
- **Integrasi SIEM**: Manajemen informasi dan peristiwa keamanan terpusat untuk deteksi anomali  
- **Analitik Perilaku**: Pemantauan bertenaga AI untuk mendeteksi pola tidak biasa pada sistem dan perilaku pengguna  
- **Intelijen Ancaman**: Integrasi feed ancaman eksternal dan indikator kompromi (IOC)  
- **Respons Insiden**: Prosedur terdefinisi untuk deteksi, respons, dan pemulihan insiden keamanan  

#### **Arsitektur Zero Trust**  
- **Jangan Pernah Percaya, Selalu Verifikasi**: Verifikasi berkelanjutan pengguna, perangkat, dan koneksi jaringan  
- **Mikro-Segmentasi**: Kontrol jaringan granular yang mengisolasi beban kerja dan layanan individual  
- **Keamanan Berbasis Identitas**: Kebijakan keamanan berdasarkan identitas terverifikasi, bukan lokasi jaringan  
- **Penilaian Risiko Berkelanjutan**: Evaluasi postur keamanan dinamis berdasarkan konteks dan perilaku saat ini  
- **Akses Kondisional**: Kontrol akses yang beradaptasi berdasarkan faktor risiko, lokasi, dan kepercayaan perangkat  

### Pola Integrasi Perusahaan

#### **Integrasi Ekosistem Keamanan Microsoft**  
- **Microsoft Defender for Cloud**: Manajemen postur keamanan cloud yang komprehensif  
- **Azure Sentinel**: SIEM natif cloud dan kemampuan SOAR untuk perlindungan beban kerja AI  
- **Microsoft Entra ID**: Manajemen identitas dan akses perusahaan dengan kebijakan akses kondisional  
- **Azure Key Vault**: Manajemen rahasia terpusat dengan dukungan modul keamanan perangkat keras (HSM)  
- **Microsoft Purview**: Tata kelola data dan kepatuhan untuk sumber data dan alur kerja AI  

#### **Kepatuhan & Tata Kelola**  
- **Penyesuaian Regulasi**: Pastikan implementasi MCP memenuhi persyaratan kepatuhan industri spesifik (GDPR, HIPAA, SOC 2)  
- **Klasifikasi Data**: Kategori dan penanganan data sensitif yang diproses oleh sistem AI  
- **Jejak Audit**: Logging komprehensif untuk kepatuhan regulasi dan investigasi forensik  
- **Kontrol Privasi**: Implementasi prinsip privasi sejak desain dalam arsitektur sistem AI  
- **Manajemen Perubahan**: Proses formal untuk tinjauan keamanan modifikasi sistem AI  

Praktik dasar ini menciptakan baseline keamanan yang kokoh yang meningkatkan efektivitas kontrol keamanan spesifik MCP dan memberikan perlindungan menyeluruh untuk aplikasi yang digerakkan oleh AI.

## Poin Penting Keamanan
- **Pendekatan Keamanan Berlapis**: Menggabungkan praktik keamanan dasar (pemrograman aman, hak istimewa paling rendah, verifikasi rantai pasokan, pemantauan berkelanjutan) dengan kontrol khusus AI untuk perlindungan menyeluruh

- **Lanskap Ancaman Khusus AI**: Sistem MCP menghadapi risiko unik termasuk injeksi prompt, peracunan alat, pembajakan sesi, masalah deputi bingung, kerentanan token passthrough, dan izin berlebihan yang memerlukan mitigasi khusus

- **Keunggulan Autentikasi & Otorisasi**: Terapkan autentikasi kuat menggunakan penyedia identitas eksternal (Microsoft Entra ID), terapkan validasi token yang tepat, dan jangan pernah menerima token yang tidak secara eksplisit diterbitkan untuk server MCP Anda

- **Pencegahan Serangan AI**: Terapkan Microsoft Prompt Shields dan Azure Content Safety untuk melindungi dari serangan injeksi prompt tidak langsung dan peracunan alat, sambil memvalidasi metadata alat dan memantau perubahan dinamis

- **Keamanan Sesi & Transportasi**: Gunakan ID sesi yang aman secara kriptografis dan non-deterministik yang terikat dengan identitas pengguna, terapkan manajemen siklus hidup sesi yang tepat, dan jangan pernah gunakan sesi untuk autentikasi

- **Praktik Terbaik Keamanan OAuth**: Cegah serangan deputi bingung melalui persetujuan pengguna eksplisit untuk klien terdaftar secara dinamis, implementasi OAuth 2.1 yang benar dengan PKCE, dan validasi URI pengalihan yang ketat

- **Prinsip Keamanan Token**: Hindari pola anti token passthrough, validasi klaim audiens token, terapkan token dengan masa berlaku pendek dan rotasi yang aman, serta pertahankan batasan kepercayaan yang jelas

- **Keamanan Rantai Pasokan Komprehensif**: Perlakukan semua komponen ekosistem AI (model, embedding, penyedia konteks, API eksternal) dengan ketelitian keamanan yang sama seperti ketergantungan perangkat lunak tradisional

- **Evolusi Berkelanjutan**: Tetap up-to-date dengan spesifikasi MCP yang berkembang cepat, berkontribusi pada standar komunitas keamanan, dan pertahankan sikap keamanan adaptif saat protokol matang

- **Integrasi Keamanan Microsoft**: Manfaatkan ekosistem keamanan Microsoft yang komprehensif (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) untuk perlindungan peningkatan penerapan MCP

## Sumber Daya Komprehensif

### **Dokumentasi Keamanan MCP Resmi**
- [Spesifikasi MCP (Saat Ini: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Praktik Terbaik Keamanan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Otorisasi MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositori GitHub MCP](https://github.com/modelcontextprotocol)

### **Sumber Daya Keamanan OWASP MCP**
- [Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 MCP OWASP lengkap dengan panduan implementasi Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keamanan MCP resmi dari OWASP
- [Lokakarya MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Pelatihan keamanan langsung untuk MCP di Azure

### **Standar Keamanan & Praktik Terbaik**
- [Praktik Terbaik Keamanan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Top 10 Keamanan Aplikasi Web OWASP](https://owasp.org/www-project-top-ten/)
- [Top 10 OWASP untuk Model Bahasa Besar](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Laporan Pertahanan Digital Microsoft](https://aka.ms/mddr)

### **Penelitian & Analisis Keamanan AI**
- [Injeksi Prompt di MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Serangan Peracunan Alat (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing Penelitian Keamanan MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Solusi Keamanan Microsoft**
- [Dokumentasi Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Layanan Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Keamanan Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Praktik Terbaik Manajemen Token Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Panduan Implementasi & Tutorial**
- [Azure API Management sebagai Gerbang Autentikasi MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autentikasi Microsoft Entra ID dengan Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Penyimpanan dan Enkripsi Token yang Aman (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Keamanan Rantai Pasokan**
- [Keamanan Azure DevOps](https://azure.microsoft.com/products/devops)
- [Keamanan Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Perjalanan Keamanan Rantai Pasokan Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dokumentasi Keamanan Tambahan**

Untuk panduan keamanan menyeluruh, rujuk dokumen khusus berikut di bagian ini:

- **[Praktik Terbaik Keamanan MCP 2025](./mcp-security-best-practices-2025.md)** - Praktik terbaik keamanan lengkap untuk implementasi MCP
- **[Implementasi Azure Content Safety](./azure-content-safety-implementation.md)** - Contoh implementasi praktis untuk integrasi Azure Content Safety  
- **[Kontrol Keamanan MCP 2025](./mcp-security-controls-2025.md)** - Kontrol dan teknik keamanan terbaru untuk penerapan MCP
- **[Referensi Praktik Terbaik MCP](./mcp-best-practices.md)** - Panduan referensi cepat untuk praktik keamanan penting MCP
- **[BlueHat 2026: Mengamankan masa depan AI: Mengamankan MCP dengan pola pertahanan berlapis](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Pola pertahanan berlapis dari Microsoft Security Response Center (MSRC)

### **Pelatihan Keamanan Praktis**

- **[Lokakarya MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Lokakarya praktis komprehensif untuk mengamankan server MCP di Azure dengan camp progresif dari Base Camp hingga Summit
- **[Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Arsitektur referensi dan panduan implementasi untuk semua risiko OWASP MCP Top 10

---

## Selanjutnya

Selanjutnya: [Bab 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->