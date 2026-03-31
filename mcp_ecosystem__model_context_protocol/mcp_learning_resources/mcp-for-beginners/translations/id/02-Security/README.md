# Keamanan MCP: Perlindungan Komprehensif untuk Sistem AI

[![MCP Security Best Practices](../../../translated_images/id/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik gambar di atas untuk menonton video pelajaran ini)_

Keamanan adalah dasar dalam desain sistem AI, itulah sebabnya kami memprioritaskannya sebagai bagian kedua. Ini sejalan dengan prinsip **Secure by Design** Microsoft dari [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) membawa kemampuan baru yang kuat ke aplikasi yang digerakkan oleh AI sekaligus memperkenalkan tantangan keamanan unik yang melampaui risiko perangkat lunak tradisional. Sistem MCP menghadapi baik kekhawatiran keamanan yang sudah mapan (pengkodean aman, hak akses paling rendah, keamanan rantai pasokan) dan ancaman spesifik AI baru termasuk injeksi prompt, keracunan alat, pembajakan sesi, serangan deputi bingung, kerentanan token passthrough, dan modifikasi kapabilitas dinamis.

Pelajaran ini menjelajahi risiko keamanan paling kritis dalam implementasi MCP—meliputi autentikasi, otorisasi, izin berlebih, injeksi prompt tidak langsung, keamanan sesi, masalah deputi bingung, pengelolaan token, dan kerentanan rantai pasokan. Anda akan belajar kontrol yang dapat ditindaklanjuti dan praktik terbaik untuk mengurangi risiko ini sambil memanfaatkan solusi Microsoft seperti Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk memperkuat penerapan MCP Anda.

## Tujuan Pembelajaran

Pada akhir pelajaran ini, Anda akan dapat:

- **Mengidentifikasi Ancaman Spesifik MCP**: Mengenali risiko keamanan unik dalam sistem MCP termasuk injeksi prompt, keracunan alat, izin berlebih, pembajakan sesi, masalah deputi bingung, kerentanan token passthrough, dan risiko rantai pasokan
- **Menerapkan Kontrol Keamanan**: Mengimplementasikan mitigasi efektif termasuk autentikasi yang kuat, akses hak istimewa paling rendah, pengelolaan token yang aman, kontrol keamanan sesi, dan verifikasi rantai pasokan
- **Memanfaatkan Solusi Keamanan Microsoft**: Memahami dan menerapkan Microsoft Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk perlindungan beban kerja MCP
- **Memvalidasi Keamanan Alat**: Mengenali pentingnya validasi metadata alat, pemantauan perubahan dinamis, dan pertahanan terhadap serangan injeksi prompt tidak langsung
- **Mengintegrasikan Praktik Terbaik**: Menggabungkan dasar keamanan yang sudah mapan (pengkodean aman, pengamanan server, zero trust) dengan kontrol spesifik MCP untuk perlindungan komprehensif

# Arsitektur & Kontrol Keamanan MCP

Implementasi MCP modern membutuhkan pendekatan keamanan berlapis yang menangani baik keamanan perangkat lunak tradisional maupun ancaman spesifik AI. Spesifikasi MCP yang berkembang pesat terus memperbaiki kontrol keamanannya, memungkinkan integrasi lebih baik dengan arsitektur keamanan perusahaan dan praktik terbaik yang sudah mapan.

Penelitian dari [Microsoft Digital Defense Report](https://aka.ms/mddr) menunjukkan bahwa **98% pelanggaran yang dilaporkan dapat dicegah dengan kebersihan keamanan yang kuat**. Strategi perlindungan paling efektif menggabungkan praktik keamanan dasar dengan kontrol spesifik MCP—ukuran keamanan dasar yang terbukti tetap paling berdampak dalam mengurangi risiko keamanan secara keseluruhan.

## Lanskap Keamanan Saat Ini

> **Catatan:** Informasi ini mencerminkan standar keamanan MCP per **5 Februari 2026**, sesuai dengan **Spesifikasi MCP 2025-11-25**. Protokol MCP terus berkembang pesat, dan implementasi ke depan mungkin memperkenalkan pola autentikasi baru dan kontrol yang ditingkatkan. Selalu rujuk [Spesifikasi MCP](https://spec.modelcontextprotocol.io/), [repositori GitHub MCP](https://github.com/modelcontextprotocol), dan [dokumentasi praktik terbaik keamanan](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) terkini untuk panduan terbaru.

## 🏔️ Lokakarya MCP Security Summit (Sherpa)

Untuk **pelatihan keamanan praktis**, kami sangat merekomendasikan **Lokakarya MCP Security Summit** (Sherpa) - ekspedisi terpandu komprehensif untuk mengamankan server MCP di Microsoft Azure.

### Gambaran Lokakarya

[Lokakarya MCP Security Summit](https://azure-samples.github.io/sherpa/) memberikan pelatihan keamanan praktis dan dapat ditindaklanjuti melalui metodologi terbukti "rentan → eksploitasi → perbaikan → validasi". Anda akan:

- **Belajar dengan Memecahkan Masalah**: Mengalami kerentanan secara langsung dengan mengeksploitasi server yang sengaja tidak aman
- **Menggunakan Keamanan Azure-Native**: Memanfaatkan Azure Entra ID, Key Vault, API Management, dan AI Content Safety
- **Mengikuti Pendekatan Defense-in-Depth**: Melalui tahapan membangun lapisan keamanan komprehensif
- **Menerapkan Standar OWASP**: Setiap teknik dipetakan ke [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Mendapatkan Kode Produksi**: Mendapatkan implementasi yang berfungsi dan sudah diuji

### Rute Ekspedisi

| Camp | Fokus | Risiko OWASP yang Dicakup |
|------|-------|---------------------------|
| **Base Camp** | Dasar MCP & kerentanan autentikasi | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Identitas Azure Managed, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, tata kelola | MCP02, MCP07, MCP09 |
| **Camp 3: I/O Security** | Injeksi prompt, perlindungan PII, keamanan konten | MCP03, MCP05, MCP06 |
| **Camp 4: Monitoring** | Log Analytics, dasbor, deteksi ancaman | MCP08 |
| **The Summit** | Uji integrasi Tim Merah / Tim Biru | Semua |

**Mulai Sekarang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Risiko Keamanan OWASP MCP

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) merinci sepuluh risiko keamanan paling kritis untuk implementasi MCP:

| Risiko | Deskripsi | Mitigasi Azure |
|--------|-----------|----------------|
| **MCP01** | Pengelolaan Token & Paparan Rahasia | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalasi Hak Istimewa melalui Scope Creep | RBAC, Conditional Access |
| **MCP03** | Keracunan Alat | Validasi alat, verifikasi integritas |
| **MCP04** | Serangan Rantai Pasokan | GitHub Advanced Security, pemindaian dependensi |
| **MCP05** | Injeksi & Eksekusi Perintah | Validasi input, sandboxing |
| **MCP06** | Injeksi Prompt melalui Payload Kontekstual | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autentikasi & Otorisasi Tidak Memadai | Azure Entra ID, OAuth 2.1 dengan PKCE |
| **MCP08** | Kurangnya Audit & Telemetri | Azure Monitor, Application Insights |
| **MCP09** | Server MCP Bayangan | Tata kelola API Center, isolasi jaringan |
| **MCP10** | Injeksi Konteks & Over-Sharing | Klasifikasi data, eksposur minimal |

### Evolusi Autentikasi MCP

Spesifikasi MCP telah berkembang signifikan dalam pendekatannya terhadap autentikasi dan otorisasi:

- **Pendekatan Awal**: Spesifikasi awal mengharuskan pengembang membuat server autentikasi khusus, dengan server MCP bertindak sebagai OAuth 2.0 Authorization Server yang mengelola autentikasi pengguna secara langsung
- **Standar Saat Ini (2025-11-25)**: Spesifikasi terbaru memperbolehkan server MCP mendelegasikan autentikasi ke penyedia identitas eksternal (seperti Microsoft Entra ID), meningkatkan postur keamanan dan mengurangi kompleksitas implementasi
- **Keamanan Lapisan Transportasi**: Dukungan yang ditingkatkan untuk mekanisme transportasi aman dengan pola autentikasi yang benar baik untuk koneksi lokal (STDIO) maupun jarak jauh (Streamable HTTP)

## Keamanan Autentikasi & Otorisasi

### Tantangan Keamanan Saat Ini

Implementasi MCP modern menghadapi beberapa tantangan autentikasi dan otorisasi:

### Risiko & Vektor Ancaman

- **Logika Otorisasi Salah Konfigurasi**: Implementasi otorisasi yang cacat pada server MCP dapat mengekspos data sensitif dan menerapkan kontrol akses yang salah
- **Kompromi Token OAuth**: Pencurian token server MCP lokal memungkinkan penyerang menyamar sebagai server dan mengakses layanan hilir
- **Kerentanan Token Passthrough**: Penanganan token yang tidak tepat menciptakan bypass kontrol keamanan dan celah akuntabilitas
- **Izin Berlebih**: Server MCP dengan hak istimewa berlebihan melanggar prinsip hak paling rendah dan memperluas permukaan serangan

#### Token Passthrough: Pola Anti-Kritis

**Token passthrough secara eksplisit dilarang** dalam spesifikasi otorisasi MCP saat ini karena implikasi keamanan yang serius:

##### Penghindaran Kontrol Keamanan
- Server MCP dan API hilir menerapkan kontrol keamanan kritis (pembatasan laju, validasi permintaan, pemantauan lalu lintas) yang bergantung pada validasi token yang tepat
- Penggunaan token langsung dari klien ke API melewati perlindungan penting ini, merusak arsitektur keamanan

##### Tantangan Akuntabilitas & Audit  
- Server MCP tidak dapat membedakan antara klien menggunakan token yang diterbitkan upstream, memutus rantai audit
- Log server sumber daya hilir menunjukkan asal permintaan yang menyesatkan bukan perantara server MCP yang sebenarnya
- Investigasi insiden dan audit kepatuhan menjadi jauh lebih sulit

##### Risiko Eksfiltrasi Data
- Klaim token yang tidak tervalidasi memungkinkan aktor jahat dengan token curian menggunakan server MCP sebagai proxy untuk eksfiltrasi data
- Pelanggaran batas kepercayaan memungkinkan pola akses tidak sah yang melewati kontrol keamanan yang dimaksudkan

##### Vektor Serangan Multi-Layanan
- Token yang dikompromikan dan diterima oleh banyak layanan memungkinkan pergerakan lateral antar sistem yang terhubung
- Asumsi kepercayaan antar layanan dapat dilanggar ketika asal token tidak dapat diverifikasi

### Kontrol & Mitigasi Keamanan

**Persyaratan Keamanan Kritis:**

> **WAJIB**: Server MCP **TIDAK BOLEH** menerima token apa pun yang tidak secara eksplisit diterbitkan untuk server MCP tersebut

#### Kontrol Autentikasi & Otorisasi

- **Tinjauan Otorisasi Ketat**: Lakukan audit menyeluruh atas logika otorisasi server MCP untuk memastikan hanya pengguna dan klien yang dimaksudkan dapat mengakses sumber daya sensitif
  - **Panduan Implementasi**: [Azure API Management sebagai Gateway Autentikasi untuk Server MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrasi Identitas**: [Menggunakan Microsoft Entra ID untuk Autentikasi Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Pengelolaan Token yang Aman**: Terapkan [praktik terbaik validasi dan siklus hidup token Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validasi klaim audiens token yang sesuai dengan identitas server MCP
  - Terapkan kebijakan rotasi dan kadaluwarsa token yang benar
  - Cegah serangan pengulangan token dan penggunaan tidak sah

- **Penyimpanan Token yang Dilindungi**: Amankan penyimpanan token dengan enkripsi baik saat istirahat maupun transit
  - **Praktik Terbaik**: [Pedoman Penyimpanan dan Enkripsi Token Aman](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementasi Kontrol Akses

- **Prinsip Hak Istimewa Paling Rendah**: Berikan server MCP hanya izin minimum yang diperlukan untuk fungsi yang dimaksudkan
  - Tinjauan dan pembaruan izin secara teratur untuk mencegah scope creep
  - **Dokumentasi Microsoft**: [Keamanan Akses Hak Istimewa Paling Rendah](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrol Akses Berbasis Peran (RBAC)**: Terapkan penugasan peran yang terperinci
  - Batasi cakupan peran dengan ketat pada sumber daya dan tindakan khusus
  - Hindari izin luas atau tidak perlu yang memperluas permukaan serangan

- **Pemantauan Izin Berkelanjutan**: Terapkan audit dan pemantauan akses secara konstan
  - Pantau pola penggunaan izin untuk anomali
  - Segera perbaiki hak berlebih atau tidak terpakai

## Ancaman Keamanan Spesifik AI

### Serangan Injeksi Prompt & Manipulasi Alat

Implementasi MCP modern menghadapi vektor serangan spesifik AI yang canggih yang tidak sepenuhnya dapat diatasi oleh langkah keamanan tradisional:

#### **Injeksi Prompt Tidak Langsung (Injeksi Prompt Lintas Domain)**

**Injeksi Prompt Tidak Langsung** merupakan salah satu kerentanan paling kritis dalam sistem AI yang diaktifkan MCP. Penyerang menyisipkan instruksi berbahaya dalam konten eksternal—dokumen, halaman web, email, atau sumber data—yang kemudian diproses sistem AI sebagai perintah sah.

**Skenario Serangan:**
- **Injeksi Berbasis Dokumen**: Instruksi berbahaya tersembunyi dalam dokumen yang diproses memicu tindakan AI yang tidak diinginkan
- **Eksploitasi Konten Web**: Halaman web yang disusupi dengan prompt tersemat yang memanipulasi perilaku AI saat di-scrape
- **Serangan Berbasis Email**: Prompt berbahaya dalam email yang menyebabkan asisten AI membocorkan informasi atau melakukan tindakan tanpa izin
- **Kontaminasi Sumber Data**: Basis data atau API yang disusupi menyediakan konten tercemar ke sistem AI

**Dampak Dunia Nyata**: Serangan ini dapat mengakibatkan eksfiltrasi data, pelanggaran privasi, pembuatan konten berbahaya, dan manipulasi interaksi pengguna. Untuk analisis mendalam, lihat [Prompt Injection di MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/id/prompt-injection.ed9fbfde297ca877.webp)

#### **Serangan Keracunan Alat**

**Keracunan Alat** menargetkan metadata yang mendefinisikan alat MCP, mengeksploitasi bagaimana LLM menginterpretasikan deskripsi alat dan parameter untuk membuat keputusan eksekusi.

**Mekanisme Serangan:**
- **Manipulasi Metadata**: Penyerang menyisipkan instruksi berbahaya ke dalam deskripsi alat, definisi parameter, atau contoh penggunaan
- **Instruksi Tak Terlihat**: Prompt tersembunyi di metadata alat yang diproses oleh model AI tapi tidak terlihat oleh pengguna manusia
- **Modifikasi Alat Dinamis ("Rug Pulls")**: Alat yang sudah disetujui pengguna diubah kemudian untuk melakukan tindakan berbahaya tanpa diketahui pengguna
- **Injeksi Parameter**: Konten berbahaya tertanam dalam skema parameter alat yang memengaruhi perilaku model

**Risiko Server Tuan Rumah**: Server MCP jarak jauh menghadirkan risiko tinggi karena definisi alat dapat diperbarui setelah persetujuan awal pengguna, menciptakan skenario di mana alat yang sebelumnya aman menjadi berbahaya. Untuk analisis komprehensif, lihat [Serangan Keracunan Alat (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/id/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vektor Serangan AI Tambahan**

- **Injeksi Prompt Lintas Domain (XPIA)**: Serangan canggih yang memanfaatkan konten dari berbagai domain untuk melewati kontrol keamanan
- **Modifikasi Kapabilitas Dinamis**: Perubahan real-time pada kapabilitas alat yang lolos dari penilaian keamanan awal  
- **Kontaminasi Jendela Konteks**: Serangan yang memanipulasi jendela konteks besar untuk menyembunyikan instruksi berbahaya  
- **Serangan Kebingungan Model**: Mengeksploitasi keterbatasan model untuk menciptakan perilaku yang tidak terduga atau tidak aman  


### Dampak Risiko Keamanan AI

**Konsekuensi Dampak Tinggi:**  
- **Eksfiltrasi Data**: Akses tidak sah dan pencurian data sensitif perusahaan atau pribadi  
- **Pelanggaran Privasi**: Paparan informasi identitas pribadi (PII) dan data bisnis rahasia  
- **Manipulasi Sistem**: Modifikasi yang tidak disengaja pada sistem dan alur kerja kritis  
- **Pencurian Kredensial**: Kompromi token autentikasi dan kredensial layanan  
- **Pergerakan Lateral**: Penggunaan sistem AI yang dikompromikan sebagai titik pivot untuk serangan jaringan yang lebih luas  

### Solusi Keamanan AI Microsoft

#### **Perisai Prompt AI: Perlindungan Lanjutan Terhadap Serangan Injeksi**

Microsoft **AI Prompt Shields** menyediakan pertahanan menyeluruh terhadap serangan injeksi prompt langsung dan tidak langsung melalui beberapa lapisan keamanan:

##### **Mekanisme Perlindungan Utama:**

1. **Deteksi & Penyaringan Tingkat Lanjut**  
   - Algoritma pembelajaran mesin dan teknik NLP mendeteksi instruksi berbahaya dalam konten eksternal  
   - Analisis real-time dokumen, halaman web, email, dan sumber data untuk ancaman yang tertanam  
   - Pemahaman kontekstual pola prompt yang sah versus berbahaya  

2. **Teknik Sorotan**  
   - Membedakan antara instruksi sistem yang terpercaya dan input eksternal yang berpotensi dikompromikan  
   - Metode transformasi teks yang meningkatkan relevansi model sambil mengisolasi konten berbahaya  
   - Membantu sistem AI mempertahankan hierarki instruksi yang benar dan mengabaikan perintah injeksi  

3. **Sistem Pembatas & Penandaan Data**  
   - Definisi batas eksplisit antara pesan sistem yang terpercaya dan teks input eksternal  
   - Penanda khusus menyoroti batas antara sumber data terpercaya dan tidak terpercaya  
   - Pemisahan jelas mencegah kebingungan instruksi dan eksekusi perintah tidak sah  

4. **Intelijen Ancaman Berkelanjutan**  
   - Microsoft terus memantau pola serangan yang muncul dan memperbarui pertahanan  
   - Pemburuan ancaman proaktif untuk teknik injeksi baru dan vektor serangan  
   - Pembaruan rutin model keamanan untuk menjaga efektivitas terhadap ancaman yang berkembang  

5. **Integrasi Azure Content Safety**  
   - Bagian dari rangkaian Azure AI Content Safety komprehensif  
   - Deteksi tambahan untuk upaya jailbreak, konten berbahaya, dan pelanggaran kebijakan keamanan  
   - Kontrol keamanan terpadu di seluruh komponen aplikasi AI  

**Sumber Implementasi**: [Dokumentasi Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Perlindungan Microsoft Prompt Shields](../../../translated_images/id/prompt-shield.ff5b95be76e9c78c.webp)


## Ancaman Keamanan MCP Lanjutan

### Kerentanan Pembajakan Sesi

**Pembajakan sesi** merupakan vektor serangan kritis pada implementasi MCP stateful di mana pihak tidak berwenang memperoleh dan menyalahgunakan pengenal sesi yang sah untuk menyamar sebagai klien dan melakukan aksi tidak sah.

#### **Skenario Serangan & Risiko**

- **Injeksi Prompt Pembajakan Sesi**: Penyerang dengan ID sesi curian menyisipkan event berbahaya ke server yang berbagi status sesi, berpotensi memicu aksi merugikan atau mengakses data sensitif  
- **Penyamaran Langsung**: ID sesi curian memungkinkan panggilan server MCP langsung yang melewati autentikasi, memperlakukan penyerang sebagai pengguna sah  
- **Aliran Resumable yang Dikompromikan**: Penyerang dapat menghentikan permintaan lebih awal, menyebabkan klien sah melanjutkan dengan konten yang berpotensi berbahaya  

#### **Kontrol Keamanan untuk Manajemen Sesi**

**Persyaratan Kritis:**  
- **Verifikasi Otorisasi**: Server MCP yang mengimplementasikan otorisasi **HARUS** memverifikasi SEMUA permintaan masuk dan **TIDAK BOLEH** mengandalkan sesi untuk autentikasi  
- **Pembuatan Sesi Aman**: Gunakan ID sesi kriptografis yang tidak deterministik dihasilkan dengan generator angka acak yang aman  
- **Pengikatan Spesifik Pengguna**: Kaitkan ID sesi dengan informasi spesifik pengguna menggunakan format seperti `<user_id>:<session_id>` untuk mencegah penyalahgunaan sesi lintas pengguna  
- **Manajemen Siklus Hidup Sesi**: Terapkan masa berlaku, rotasi, dan invalidasi yang tepat untuk membatasi jendela kerentanan  
- **Keamanan Transportasi**: HTTPS wajib digunakan untuk semua komunikasi guna mencegah penyadapan ID sesi  

### Masalah Deputi Bingung

**Masalah deputi bingung** terjadi ketika server MCP bertindak sebagai proxy autentikasi antara klien dan layanan pihak ketiga, menciptakan peluang untuk melewati otorisasi melalui eksploitasi ID klien statis.

#### **Mekanisme Serangan & Risiko**

- **Bypass Persetujuan Berbasis Cookie**: Autentikasi pengguna sebelumnya membuat cookie persetujuan yang dieksploitasi penyerang melalui permintaan otorisasi berbahaya dengan URI pengalihan yang dirancang  
- **Pencurian Kode Otorisasi**: Cookie persetujuan yang ada dapat menyebabkan server otorisasi melewati layar persetujuan, mengalihkan kode ke titik akhir yang dikendalikan penyerang  
- **Akses API Tidak Sah**: Kode otorisasi curian memungkinkan pertukaran token dan penyamaran pengguna tanpa persetujuan eksplisit  

#### **Strategi Mitigasi**

**Kontrol Wajib:**  
- **Persyaratan Persetujuan Eksplisit**: Server proxy MCP yang menggunakan ID klien statis **HARUS** memperoleh persetujuan pengguna untuk setiap klien yang didaftarkan secara dinamis  
- **Implementasi Keamanan OAuth 2.1**: Ikuti praktik keamanan OAuth terkini termasuk PKCE (Proof Key for Code Exchange) untuk semua permintaan otorisasi  
- **Validasi Klien Ketat**: Terapkan validasi ketat pada URI pengalihan dan pengenal klien untuk mencegah eksploitasi  

### Kerentanan Token Passthrough  

**Token passthrough** merupakan anti-pola eksplisit di mana server MCP menerima token klien tanpa validasi yang tepat dan meneruskannya ke API hilir, melanggar spesifikasi otorisasi MCP.

#### **Implikasi Keamanan**

- **Penghindaran Kontrol**: Penggunaan token langsung klien ke API melewati pembatasan kecepatan, validasi, dan kontrol pemantauan kritis  
- **Kerusakan Jejak Audit**: Token yang diterbitkan hulu membuat identifikasi klien tidak mungkin, merusak kemampuan investigasi insiden  
- **Eksfiltrasi Data Berbasis Proxy**: Token yang tidak tervalidasi memungkinkan aktor berbahaya menggunakan server sebagai proxy untuk akses data tidak sah  
- **Pelanggaran Batas Kepercayaan**: Asumsi kepercayaan layanan hilir dapat dilanggar ketika asal token tidak dapat diverifikasi  
- **Perluasan Serangan Multi-layanan**: Token yang dikompromikan diterima di beberapa layanan memungkinkan pergerakan lateral  

#### **Kontrol Keamanan yang Diperlukan**

**Persyaratan Tidak Bisa Ditawar:**  
- **Validasi Token**: Server MCP **TIDAK BOLEH** menerima token yang tidak secara eksplisit diterbitkan untuk server MCP  
- **Verifikasi Audiens**: Selalu validasi klaim audiens token cocok dengan identitas server MCP  
- **Siklus Hidup Token yang Tepat**: Terapkan token akses dengan masa berlaku pendek dan praktik rotasi yang aman  


## Keamanan Rantai Pasokan untuk Sistem AI

Keamanan rantai pasokan telah berkembang melampaui ketergantungan perangkat lunak tradisional untuk mencakup seluruh ekosistem AI. Implementasi MCP modern harus secara ketat memverifikasi dan memantau semua komponen terkait AI, karena masing-masing memperkenalkan potensi kerentanan yang dapat mengompromikan integritas sistem.

### Komponen Rantai Pasokan AI yang Diperluas

**Ketergantungan Perangkat Lunak Tradisional:**  
- Perpustakaan dan kerangka kerja open-source  
- Gambar kontainer dan sistem dasar  
- Alat pengembangan dan pipeline build  
- Komponen dan layanan infrastruktur  

**Elemen Rantai Pasokan Khusus AI:**  
- **Model Dasar**: Model pra-latih dari berbagai penyedia yang memerlukan verifikasi asal usul  
- **Layanan Embedding**: Layanan vektorisasi eksternal dan pencarian semantik  
- **Penyedia Konteks**: Sumber data, basis pengetahuan, dan repositori dokumen  
- **API Pihak Ketiga**: Layanan AI eksternal, pipeline ML, dan endpoint pemrosesan data  
- **Artefak Model**: Bobot, konfigurasi, dan varian model yang disesuaikan  
- **Sumber Data Pelatihan**: Dataset yang digunakan untuk pelatihan dan fine-tuning model  

### Strategi Keamanan Rantai Pasokan Komprehensif

#### **Verifikasi & Kepercayaan Komponen**  
- **Validasi Asal Usul**: Verifikasi asal, lisensi, dan integritas semua komponen AI sebelum integrasi  
- **Penilaian Keamanan**: Lakukan pemindaian kerentanan dan tinjauan keamanan untuk model, sumber data, dan layanan AI  
- **Analisis Reputasi**: Evaluasi rekam jejak keamanan dan praktik penyedia layanan AI  
- **Verifikasi Kepatuhan**: Pastikan semua komponen memenuhi persyaratan keamanan dan regulasi organisasi  

#### **Pipeline Penyebaran Aman**  
- **Keamanan CI/CD Otomatis**: Integrasikan pemindaian keamanan di seluruh pipeline penyebaran otomatis  
- **Integritas Artefak**: Terapkan verifikasi kriptografi untuk semua artefak yang disebarkan (kode, model, konfigurasi)  
- **Penyebaran Bertahap**: Gunakan strategi penyebaran progresif dengan validasi keamanan di setiap tahap  
- **Repositori Artefak Terpercaya**: Sebarkan hanya dari registri dan repositori artefak yang tervalidasi dan aman  

#### **Pemantauan & Respons Berkelanjutan**  
- **Pemindaian Ketergantungan**: Pemantauan kerentanan berkelanjutan untuk semua ketergantungan perangkat lunak dan komponen AI  
- **Pemantauan Model**: Penilaian kontinu perilaku model, drift performa, dan anomali keamanan  
- **Pelacakan Kesehatan Layanan**: Pantau layanan AI eksternal untuk ketersediaan, insiden keamanan, dan perubahan kebijakan  
- **Integrasi Intelijen Ancaman**: Gabungkan feed ancaman khusus untuk risiko keamanan AI dan ML  

#### **Kontrol Akses & Hak Istimewa Minimum**  
- **Izin Tingkat Komponen**: Batasi akses ke model, data, dan layanan berdasarkan kebutuhan bisnis  
- **Manajemen Akun Layanan**: Terapkan akun layanan khusus dengan izin minimal yang diperlukan  
- **Segmentasi Jaringan**: Isolasi komponen AI dan batasi akses jaringan antar layanan  
- **Kontrol Gateway API**: Gunakan gateway API terpusat untuk mengontrol dan memantau akses ke layanan AI eksternal  

#### **Respons Insiden & Pemulihan**  
- **Prosedur Respons Cepat**: Proses yang mapan untuk menambal atau mengganti komponen AI yang dikompromikan  
- **Rotasi Kredensial**: Sistem otomatis untuk rotasi rahasia, kunci API, dan kredensial layanan  
- **Kemampuan Rollback**: Kemampuan untuk cepat kembali ke versi komponen AI yang diketahui aman  
- **Pemulihan Pelanggaran Rantai Pasokan**: Prosedur khusus untuk merespons kompromi layanan AI hulu  

### Alat & Integrasi Keamanan Microsoft

**GitHub Advanced Security** menyediakan perlindungan rantai pasokan komprehensif termasuk:  
- **Pemindaian Rahasia**: Deteksi otomatis kredensial, kunci API, dan token di repositori  
- **Pemindaian Ketergantungan**: Penilaian kerentanan untuk ketergantungan open-source dan perpustakaan  
- **Analisis CodeQL**: Analisis kode statis untuk kerentanan keamanan dan masalah pengkodean  
- **Wawasan Rantai Pasokan**: Visibilitas ke status kesehatan dan keamanan ketergantungan  

**Integrasi Azure DevOps & Azure Repos:**  
- Integrasi pemindaian keamanan mulus di seluruh platform pengembangan Microsoft  
- Pemeriksaan keamanan otomatis di Azure Pipelines untuk beban kerja AI  
- Penegakan kebijakan untuk penyebaran komponen AI yang aman  

**Praktik Internal Microsoft:**  
Microsoft menerapkan praktik keamanan rantai pasokan yang luas di seluruh produk. Pelajari pendekatan terbukti di [Perjalanan untuk Mengamankan Rantai Pasokan Perangkat Lunak di Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Praktik Terbaik Keamanan Fondasi

Implementasi MCP mewarisi dan membangun di atas postur keamanan organisasi Anda yang sudah ada. Memperkuat praktik keamanan dasar secara signifikan meningkatkan keamanan keseluruhan sistem AI dan penyebaran MCP.

### Prinsip Keamanan Inti

#### **Praktik Pengembangan Aman**  
- **Kepatuhan OWASP**: Lindungi dari [OWASP Top 10](https://owasp.org/www-project-top-ten/) kerentanan aplikasi web  
- **Perlindungan Khusus AI**: Terapkan kontrol untuk [OWASP Top 10 untuk LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Manajemen Rahasia Aman**: Gunakan vault khusus untuk token, kunci API, dan data konfigurasi sensitif  
- **Enkripsi End-to-End**: Terapkan komunikasi aman di seluruh komponen aplikasi dan aliran data  
- **Validasi Input**: Validasi ketat untuk semua input pengguna, parameter API, dan sumber data  

#### **Penguatan Infrastruktur**  
- **Autentikasi Multi-Faktor**: MFA wajib untuk semua akun administratif dan layanan  
- **Manajemen Patch**: Patching otomatis dan tepat waktu untuk sistem operasi, kerangka kerja, dan ketergantungan  
- **Integrasi Penyedia Identitas**: Manajemen identitas terpusat melalui penyedia identitas enterprise (Microsoft Entra ID, Active Directory)  
- **Segmentasi Jaringan**: Isolasi logis komponen MCP untuk membatasi potensi pergerakan lateral  
- **Prinsip Hak Istimewa Minimum**: Izin minimal yang dibutuhkan untuk semua komponen sistem dan akun  

#### **Pemantauan & Deteksi Keamanan**  
- **Logging Komprehensif**: Pencatatan detail aktivitas aplikasi AI, termasuk interaksi klien-server MCP  
- **Integrasi SIEM**: Manajemen informasi dan kejadian keamanan terpusat untuk deteksi anomali  
- **Analitik Perilaku**: Pemantauan berbasis AI untuk mendeteksi pola tidak biasa dalam sistem dan perilaku pengguna  
- **Intelijen Ancaman**: Integrasi feed ancaman eksternal dan indikator kompromi (IOC)  
- **Respons Insiden**: Prosedur yang terdefinisi baik untuk deteksi, respons, dan pemulihan insiden keamanan  

#### **Arsitektur Zero Trust**  
- **Jangan Pernah Percaya, Selalu Verifikasi**: Verifikasi berkelanjutan pengguna, perangkat, dan koneksi jaringan  
- **Mikro-Segmentasi**: Kontrol jaringan granular yang mengisolasi beban kerja dan layanan individu  
- **Keamanan Berbasis Identitas**: Kebijakan keamanan berdasarkan identitas terverifikasi daripada lokasi jaringan  
- **Penilaian Risiko Berkelanjutan**: Evaluasi postur keamanan dinamis berdasarkan konteks dan perilaku saat ini  
- **Akses Kondisional**: Kontrol akses yang beradaptasi berdasarkan faktor risiko, lokasi, dan kepercayaan perangkat  

### Pola Integrasi Enterprise

#### **Integrasi Ekosistem Keamanan Microsoft**  
- **Microsoft Defender for Cloud**: Manajemen postur keamanan cloud menyeluruh  
- **Azure Sentinel**: SIEM dan SOAR berbasis cloud-native untuk perlindungan beban kerja AI  
- **Microsoft Entra ID**: Manajemen identitas dan akses enterprise dengan kebijakan akses kondisional  
- **Azure Key Vault**: Manajemen rahasia terpusat dengan dukungan modul keamanan perangkat keras (HSM)  
- **Microsoft Purview**: Tata kelola data dan kepatuhan untuk sumber data dan alur kerja AI  

#### **Kepatuhan & Tata Kelola**  
- **Keselarasan Regulasi**: Pastikan implementasi MCP memenuhi persyaratan kepatuhan khusus industri (GDPR, HIPAA, SOC 2)  
- **Klasifikasi Data**: Kategori dan penanganan yang tepat untuk data sensitif yang diproses oleh sistem AI  
- **Jejak Audit**: Logging komprehensif untuk kepatuhan regulasi dan investigasi forensik  
- **Kontrol Privasi**: Implementasi prinsip privasi-dengan-desain dalam arsitektur sistem AI  
- **Manajemen Perubahan**: Proses formal untuk tinjauan keamanan modifikasi sistem AI  

Praktik dasar ini menciptakan dasar keamanan yang kuat yang meningkatkan efektivitas kontrol keamanan khusus MCP dan memberikan perlindungan menyeluruh bagi aplikasi berbasis AI.
## Intisari Keamanan Utama

- **Pendekatan Keamanan Berlapis**: Gabungkan praktik keamanan dasar (pengkodean aman, hak akses minimum, verifikasi rantai pasokan, pemantauan terus-menerus) dengan kontrol khusus AI untuk perlindungan menyeluruh

- **Lanskap Ancaman Khusus AI**: Sistem MCP menghadapi risiko unik termasuk injeksi prompt, keracunan alat, pembajakan sesi, masalah confused deputy, kerentanan token passthrough, dan izin berlebihan yang memerlukan mitigasi khusus

- **Keunggulan Otentikasi & Otorisasi**: Terapkan otentikasi kuat menggunakan penyedia identitas eksternal (Microsoft Entra ID), terapkan validasi token yang tepat, dan jangan pernah menerima token yang tidak secara eksplisit diterbitkan untuk server MCP Anda

- **Pencegahan Serangan AI**: Gunakan Microsoft Prompt Shields dan Azure Content Safety untuk melindungi dari serangan injeksi prompt tidak langsung dan keracunan alat, sambil memvalidasi metadata alat dan memantau perubahan dinamis

- **Keamanan Sesi & Transportasi**: Gunakan ID sesi yang aman secara kriptografis dan non-deterministik yang terikat pada identitas pengguna, terapkan manajemen siklus hidup sesi yang tepat, dan jangan pernah menggunakan sesi untuk otentikasi

- **Praktik Terbaik Keamanan OAuth**: Cegah serangan confused deputy melalui persetujuan pengguna yang eksplisit untuk klien yang terdaftar secara dinamis, implementasi OAuth 2.1 yang benar dengan PKCE, dan validasi URI pengalihan yang ketat

- **Prinsip Keamanan Token**: Hindari pola anti token passthrough, validasi klaim audiens token, terapkan token berumur pendek dengan rotasi aman, dan pertahankan batas kepercayaan yang jelas

- **Keamanan Rantai Pasokan Komprehensif**: Perlakukan semua komponen ekosistem AI (model, embeddings, penyedia konteks, API eksternal) dengan tingkat keamanan yang sama seperti ketergantungan perangkat lunak tradisional

- **Evolusi Berkelanjutan**: Tetap terkini dengan spesifikasi MCP yang berkembang cepat, berkontribusi pada standar komunitas keamanan, dan pertahankan postur keamanan yang adaptif seiring protokol berkembang

- **Integrasi Keamanan Microsoft**: Manfaatkan ekosistem keamanan Microsoft yang komprehensif (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) untuk perlindungan penyebaran MCP yang ditingkatkan

## Sumber Daya Komprehensif

### **Dokumentasi Keamanan MCP Resmi**
- [Spesifikasi MCP (Saat Ini: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Praktik Terbaik Keamanan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Otorisasi MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositori GitHub MCP](https://github.com/modelcontextprotocol)

### **Sumber Daya Keamanan OWASP MCP**
- [Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP komprehensif dengan panduan implementasi Azure
- [Top 10 OWASP MCP](https://owasp.org/www-project-mcp-top-10/) - Risiko keamanan MCP resmi dari OWASP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Pelatihan keamanan langsung untuk MCP di Azure

### **Standar & Praktik Terbaik Keamanan**
- [Praktik Terbaik Keamanan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Top 10 Keamanan Aplikasi Web OWASP](https://owasp.org/www-project-top-ten/)
- [Top 10 OWASP untuk Model Bahasa Besar](https://genai.owasp.org/download/43299/?tmstv=1731900559)
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
- [Azure API Management sebagai Gerbang Otentikasi MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Otentikasi Microsoft Entra ID dengan Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Penyimpanan dan Enkripsi Token Aman (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Keamanan Rantai Pasokan**
- [Keamanan Azure DevOps](https://azure.microsoft.com/products/devops)
- [Keamanan Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Perjalanan Keamanan Rantai Pasokan Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dokumentasi Keamanan Tambahan**

Untuk panduan keamanan komprehensif, rujuk dokumen khusus berikut di bagian ini:

- **[Praktik Terbaik Keamanan MCP 2025](./mcp-security-best-practices-2025.md)** - Praktik terbaik keamanan lengkap untuk implementasi MCP
- **[Implementasi Azure Content Safety](./azure-content-safety-implementation.md)** - Contoh implementasi praktis untuk integrasi Azure Content Safety  
- **[Kontrol Keamanan MCP 2025](./mcp-security-controls-2025.md)** - Kontrol dan teknik keamanan terbaru untuk penyebaran MCP
- **[Referensi Cepat Praktik Terbaik MCP](./mcp-best-practices.md)** - Panduan referensi cepat untuk praktik keamanan MCP esensial

### **Pelatihan Keamanan Praktis**

- **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop praktis komprehensif untuk mengamankan server MCP di Azure dengan kamp progresif dari Base Camp ke Summit
- **[Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Arsitektur referensi dan panduan implementasi untuk semua risiko OWASP MCP Top 10

---

## Apa Selanjutnya

Selanjutnya: [Bab 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya mencapai akurasi, mohon diperhatikan bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber otoritatif. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang salah yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->