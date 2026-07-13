# Keselamatan MCP: Perlindungan Komprehensif untuk Sistem AI

[![MCP Security Best Practices](../../../translated_images/ms/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik imej di atas untuk menonton video pelajaran ini)_

Keselamatan adalah asas dalam reka bentuk sistem AI, sebab itulah kami mengutamakan ia sebagai bahagian kedua kami. Ini selari dengan prinsip **Secure by Design** Microsoft dari [Inisiatif Masa Depan Selamat](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokol Konteks Model (MCP) membawa keupayaan baru yang kukuh kepada aplikasi yang dikuasakan AI sambil memperkenalkan cabaran keselamatan unik yang melampaui risiko perisian tradisional. Sistem MCP menghadapi kedua-dua kebimbangan keselamatan yang telah diketahui (pengkodan selamat, hak istimewa terendah, keselamatan rantaian bekalan) dan ancaman khusus AI termasuk suntikan arahan, racun alat, pembajakan sesi, serangan ejen yang keliru, kerentanan laluan token, dan pengubahsuaian keupayaan dinamik.

Pelajaran ini meneroka risiko keselamatan paling kritikal dalam pelaksanaan MCP—meliputi pengesahan, kebenaran, kebenaran berlebihan, suntikan arahan tidak langsung, keselamatan sesi, masalah ejen yang keliru, pengurusan token, dan kerentanan rantaian bekalan. Anda akan mempelajari kawalan yang boleh dilaksanakan dan amalan terbaik untuk mengurangkan risiko ini sambil menggunakan penyelesaian Microsoft seperti Perisai Arahan, Azure Content Safety, dan GitHub Advanced Security untuk menguatkan pelaksanaan MCP anda.

## Objektif Pembelajaran

Pada akhir pelajaran ini, anda akan dapat:

- **Mengenal Pasti Ancaman Spesifik MCP**: Mengenal pasti risiko keselamatan unik dalam sistem MCP termasuk suntikan arahan, racun alat, kebenaran berlebihan, pembajakan sesi, masalah ejen yang keliru, kerentanan laluan token, dan risiko rantaian bekalan
- **Melaksanakan Kawalan Keselamatan**: Melaksanakan mitigasi berkesan termasuk pengesahan kukuh, akses hak istimewa terendah, pengurusan token yang selamat, kawalan keselamatan sesi, dan pengesahan rantaian bekalan
- **Menggunakan Penyelesaian Keselamatan Microsoft**: Memahami dan mengguna pakai Microsoft Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk perlindungan beban kerja MCP
- **Mengesahkan Keselamatan Alat**: Mengenali kepentingan pengesahan metadata alat, pemantauan perubahan dinamik, dan mempertahankan daripada serangan suntikan arahan tidak langsung
- **Mengintegrasi Amalan Terbaik**: Menggabungkan asas keselamatan yang telah wujud (pengkodan selamat, pengukuhan pelayan, zero trust) dengan kawalan khusus MCP untuk perlindungan menyeluruh

# Seni Bina & Kawalan Keselamatan MCP

Pelaksanaan MCP moden memerlukan pendekatan keselamatan berlapis yang menangani kedua-dua keselamatan perisian tradisional dan ancaman khusus AI. Spesifikasi MCP yang berkembang dengan cepat terus mematangkan kawalan keselamatannya, membolehkan integrasi yang lebih baik dengan seni bina keselamatan perusahaan dan amalan terbaik yang telah diketahui.

Penyelidikan dari [Laporan Pertahanan Digital Microsoft](https://aka.ms/mddr) menunjukkan bahawa **98% pelanggaran yang dilaporkan dapat dicegah dengan amalan kebersihan keselamatan yang kukuh**. Strategi perlindungan yang paling berkesan menggabungkan amalan keselamatan asas dengan kawalan khusus MCP—langkah keselamatan asas yang terbukti kekal paling berimpak dalam mengurangkan risiko keselamatan keseluruhan.

## Lanskap Keselamatan Semasa

> **Nota:** Maklumat ini mencerminkan piawaian keselamatan MCP pada **5 Februari 2026**, sejajar dengan **Spesifikasi MCP 2025-11-25**. Protokol MCP terus berkembang dengan pantas, dan pelaksanaan masa depan mungkin memperkenalkan corak pengesahan baru dan kawalan yang dipertingkatkan. Sentiasa rujuk [Spesifikasi MCP](https://spec.modelcontextprotocol.io/), [repositori MCP GitHub](https://github.com/modelcontextprotocol), dan [dokumentasi amalan terbaik keselamatan](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) untuk panduan terkini.

> **Melihat ke hadapan:** calon keluaran `2026-07-28` mengukuhkan lagi kebenaran — pelanggan mesti mengesahkan parameter `iss` pada respon kebenaran (RFC 9207), mengisytiharkan `application_type` OpenID Connect semasa Pendaftaran Klien Dinamik, dan mengikat bukti kelayakan yang didaftarkan dengan pelayan kebenaran yang mengeluarkan. Lihat [Apa yang Berubah dalam MCP: Calon Keluaran 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) untuk senarai penuh SEP kebenaran.

## 🏔️ Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)

Untuk **latihan keselamatan secara praktikal**, kami sangat mengesyorkan **Bengkel Sidang Kemuncak Keselamatan MCP** (Sherpa) - ekspedisi berpandu komprehensif untuk mempersiapkan pelayan MCP dalam Microsoft Azure.

### Gambaran Bengkel

[Bengkel Sidang Kemuncak Keselamatan MCP](https://azure-samples.github.io/sherpa/) menyediakan latihan keselamatan praktikal dan boleh dijalankan melalui metodologi "mudah terdedah → eksploit → baiki → sahkan" yang terbukti. Anda akan:

- **Belajar dengan Memecahkan**: Mengalami kerentanan secara langsung dengan mengeksploitasi pelayan yang sengaja tidak selamat
- **Menggunakan Keselamatan Azure Asli**: Memanfaatkan Azure Entra ID, Key Vault, Pengurusan API, dan AI Content Safety
- **Mengikuti Pertahanan Berlapis**: Meneruskan ke kem-kem yang membina lapisan keselamatan menyeluruh
- **Menggunakan Standard OWASP**: Setiap teknik dipetakan ke [Panduan Keselamatan Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Dapatkan Kod Produksi**: Mendapatkan pelaksanaan yang berfungsi dan diuji

### Laluan Ekspedisi

| Kem | Fokus | Risiko OWASP yang Dilindungi |
|------|-------|---------------------|
| **Kem Asas** | Asas MCP & kerentanan pengesahan | MCP01, MCP07 |
| **Kem 1: Identiti** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kem 2: Gerbang** | Pengurusan API, Titik Akhir Peribadi, tadbir urus | MCP02, MCP06, MCP07, MCP09 |
| **Kem 3: Keselamatan I/O** | Suntikan arahan, perlindungan PII, keselamatan kandungan | MCP03, MCP05, MCP06, MCP10 |
| **Kem 4: Pemantauan** | Log Analytics, papan pemuka, pengesanan ancaman | MCP04, MCP08 |
| **Sidang Kemuncak** | Ujian integrasi Pasukan Merah / Pasukan Biru | Semua |

**Mula Sekarang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## 10 Risiko Keselamatan Teratas MCP OWASP

[Panduan Keselamatan Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) memperincikan sepuluh risiko keselamatan paling kritikal untuk pelaksanaan MCP:

| Risiko | Penerangan | Mitigasi Azure |
|------|-------------|------------------|
| **MCP01** | Pengurusan Token yang Salah & Pendedahan Rahsia | Azure Key Vault, Managed Identity |
| **MCP02** | Peningkatan Hak Istimewa melalui Skop Berkembang | RBAC, Conditional Access |
| **MCP03** | Racun Alat | Pengesahan alat, pengesahan integriti |
| **MCP04** | Serangan Rantaian Bekalan Perisian & Pengubahan Kebergantungan | GitHub Advanced Security, imbasan kebergantungan |
| **MCP05** | Suntikan & Pelaksanaan Arahan | Pengesahan input, sandboxing |
| **MCP06** | Subversi Aliran Niat | Azure AI Content Safety, Perisai Arahan |
| **MCP07** | Pengesahan & Kebenaran Tidak Mencukupi | Azure Entra ID, OAuth 2.1 dengan PKCE |
| **MCP08** | Kekurangan Audit dan Telemetri | Azure Monitor, Application Insights |
| **MCP09** | Pelayan MCP Bayangan | Tadbir urus Pusat API, pengasingan rangkaian |
| **MCP10** | Suntikan Konteks & Pendedahan Berlebihan | Pengklasan data, pendedahan minimum |

### Evolusi Pengesahan MCP

Spesifikasi MCP telah berkembang dengan ketara dalam pendekatannya kepada pengesahan dan kebenaran:

- **Pendekatan Asal**: Spesifikasi awal memerlukan pembangun melaksanakan pelayan pengesahan tersuai, dengan pelayan MCP bertindak sebagai Pelayan Kebenaran OAuth 2.0 mengurus pengesahan pengguna secara langsung
- **Standard Semasa (2025-11-25)**: Spesifikasi dikemas kini membolehkan pelayan MCP mendelegasikan pengesahan kepada penyedia identiti luaran (seperti Microsoft Entra ID), memperbaiki kedudukan keselamatan dan mengurangkan kerumitan pelaksanaan
- **Keselamatan Lapisan Pengangkutan**: Sokongan dipertingkatkan untuk mekanisme pengangkutan selamat dengan corak pengesahan yang sesuai untuk sambungan tempatan (STDIO) dan jauh (Streamable HTTP)

## Keselamatan Pengesahan & Kebenaran

### Cabaran Keselamatan Semasa

Pelaksanaan MCP moden menghadapi beberapa cabaran pengesahan dan kebenaran:

### Risiko & Vektor Ancaman

- **Logik Kebenaran Salah Konfigurasi**: Pelaksanaan kebenaran yang cacat dalam pelayan MCP boleh mendedahkan data sensitif dan salah mengaplikasikan kawalan akses
- **Kompromi Token OAuth**: Kecurian token pelayan MCP tempatan membolehkan penyerang menyamar sebagai pelayan dan mengakses perkhidmatan hiliran
- **Kerentanan Laluan Token**: Pengendalian token yang tidak betul mencipta pintasan kawalan keselamatan dan jurang akauntabiliti
- **Kebenaran Berlebihan**: Pelayan MCP yang berhak istimewa berlebihan melanggar prinsip hak istimewa terendah dan meluaskan permukaan serangan

#### Laluan Token: Satu Anti-Model Kritikal

**Laluan token adalah secara eksplisit dilarang** dalam spesifikasi kebenaran MCP semasa kerana implikasi keselamatan yang teruk:

##### Pengelakan Kawalan Keselamatan
- Pelayan MCP dan API hiliran melaksanakan kawalan keselamatan penting (had kadar, pengesahan permintaan, pemantauan trafik) yang bergantung pada pengesahan token yang betul
- Penggunaan token klien terus ke API melangkau perlindungan penting ini, melemahkan seni bina keselamatan

##### Cabaran Akauntabiliti & Audit  
- Pelayan MCP tidak dapat membezakan antara klien yang menggunakan token yang dikeluarkan oleh hulu, memutuskan jejak audit
- Log pelayan sumber hiliran menunjukkan asal permintaan yang mengelirukan bukannya perantara pelayan MCP sebenar
- Siasatan insiden dan audit pematuhan menjadi jauh lebih sukar

##### Risiko Eksfiltrasi Data
- Tuntutan token yang tidak disahkan membolehkan pelaku berniat jahat dengan token yang dicuri menggunakan pelayan MCP sebagai proksi untuk eksfiltrasi data
- Pelanggaran sempadan kepercayaan membenarkan corak akses tanpa kebenaran yang melangkaui kawalan keselamatan yang dimaksudkan

##### Vektor Serangan Pelbagai Perkhidmatan
- Token yang dikompromi diterima oleh pelbagai perkhidmatan membolehkan pergerakan sisi ke sistem yang bersambung
- Andaian kepercayaan antara perkhidmatan mungkin dilanggar apabila asal token tidak dapat disahkan

### Kawalan Keselamatan & Mitigasi

**Keperluan Keselamatan Kritikal:**

> **WAJIB**: Pelayan MCP **TIDAK BOLEH** menerima mana-mana token yang tidak secara eksplisit dikeluarkan untuk pelayan MCP tersebut

#### Kawalan Pengesahan & Kebenaran

- **Ulasan Kebenaran yang Ketat**: Laksanakan audit komprehensif pada logik kebenaran pelayan MCP untuk memastikan hanya pengguna dan klien yang dimaksudkan boleh mengakses sumber sensitif
  - **Panduan Pelaksanaan**: [Azure API Management sebagai Gerbang Pengesahan untuk Pelayan MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrasi Identiti**: [Menggunakan Microsoft Entra ID untuk Pengesahan Pelayan MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Pengurusan Token Selamat**: Melaksanakan [amalan terbaik pengesahan token dan kitar hayat Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Sahkan tuntutan audiens token yang sepadan dengan identiti pelayan MCP
  - Laksanakan putaran token dan polisi tamat tempoh yang betul
  - Cegah serangan ulang main token dan penggunaan tanpa kebenaran

- **Penyimpanan Token Dilindungi**: Menyimpan token secara selamat dengan penyulitan semasa rehat dan dalam transit
  - **Amalan Terbaik**: [Panduan Penyimpanan dan Penyulitan Token Selamat](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Pelaksanaan Kawalan Akses

- **Prinsip Hak Istimewa Terendah**: Memberi pelayan MCP hanya kebenaran minimum yang diperlukan untuk fungsi yang dimaksudkan
  - Semakan dan kemas kini kebenaran secara berkala untuk mengelakkan peningkatan hak istimewa
  - **Dokumentasi Microsoft**: [Akses Selamat Berhak Istimewa Terendah](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kawalan Akses Berasaskan Peranan (RBAC)**: Melaksanakan penugasan peranan yang terperinci
  - Hadkan peranan dengan ketat kepada sumber dan tindakan tertentu
  - Elakkan kebenaran luas atau tidak perlu yang meluaskan permukaan serangan

- **Pemantauan Kebenaran Berterusan**: Melaksanakan audit dan pemantauan akses secara berterusan
  - Pantau corak penggunaan kebenaran untuk anomali
  - Segera membaik pulih kebenaran berlebihan atau yang tidak digunakan

## Ancaman Keselamatan Khusus AI

### Serangan Suntikan Arahan & Manipulasi Alat

Pelaksanaan MCP moden menghadapi vektor serangan khusus AI yang canggih yang tidak dapat diatasi sepenuhnya oleh langkah keselamatan tradisional:

#### **Suntikan Arahan Tidak Langsung (Suntikan Arahan Rentas Domain)**

**Suntikan Arahan Tidak Langsung** merupakan salah satu kerentanan paling kritikal dalam sistem AI yang diaktifkan MCP. Penyerang menyematkan arahan berniat jahat dalam kandungan luaran—dokumen, halaman web, emel, atau sumber data—yang kemudian diproses oleh sistem AI sebagai arahan yang sah.

**Senario Serangan:**
- **Suntikan Berasaskan Dokumen**: Arahan berniat jahat tersembunyi dalam dokumen yang diproses yang mencetuskan tindakan AI yang tidak dimaksudkan
- **Eksploitasi Kandungan Web**: Halaman web yang dikompromi mengandungi arahan tersemat yang memanipulasi perilaku AI apabila dikutip
- **Serangan Berasaskan Emel**: Arahan berniat jahat dalam emel yang menyebabkan pembantu AI mendedahkan maklumat atau menjalankan tindakan tanpa kebenaran
- **Pencemaran Sumber Data**: Pangkalan data atau API yang dikompromi yang menyajikan kandungan tercemar kepada sistem AI

**Impak Dunia Sebenar**: Serangan ini boleh mengakibatkan eksfiltrasi data, pelanggaran privasi, penjanaan kandungan berbahaya, dan manipulasi interaksi pengguna. Untuk analisis terperinci, lihat [Suntikan Arahan dalam MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/ms/prompt-injection.ed9fbfde297ca877.webp)

#### **Serangan Racun Alat**

**Racun Alat** mensasarkan metadata yang menentukan alat MCP, mengeksploitasi bagaimana LLM mentafsirkan deskripsi alat dan parameter untuk membuat keputusan pelaksanaan.

**Mekanisme Serangan:**
- **Manipulasi Metadata**: Penyerang menyuntik arahan berniat jahat ke dalam deskripsi alat, definisi parameter, atau contoh penggunaan
- **Arahan Tak Terlihat**: Arahan tersirat dalam metadata alat yang diproses oleh model AI tetapi tidak kelihatan kepada pengguna manusia
- **Pengubahsuaian Alat Dinamik ("Tarik Permaidani")**: Alat yang diluluskan oleh pengguna diubah kemudian untuk melakukan tindakan berniat jahat tanpa pengetahuan pengguna
- **Suntikan Parameter**: Kandungan berniat jahat tertanam dalam skema parameter alat yang mempengaruhi perilaku model


**Risiko Pelayan Dihoskan**: Pelayan MCP jauh menghadirkan risiko yang tinggi kerana definisi peralatan boleh dikemaskini selepas kelulusan awal pengguna, mewujudkan senario di mana peralatan yang sebelumnya selamat menjadi berniat jahat. Untuk analisis menyeluruh, lihat [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/ms/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vektor Serangan AI Tambahan**

- **Suntikan Arahan Merentas-Domain (XPIA)**: Serangan canggih yang memanfaatkan kandungan dari pelbagai domain untuk melepasi kawalan keselamatan
- **Pengubahsuaian Kebolehan Dinamik**: Perubahan masa nyata pada kebolehan peralatan yang mengelak penilaian keselamatan awal
- **Keracunan Tetingkap Konteks**: Serangan yang memanipulasi tetingkap konteks besar untuk menyembunyikan arahan berniat jahat
- **Serangan Kekeliruan Model**: Mengeksploitasi keterbatasan model untuk mencipta tingkah laku tidak dapat dijangka atau tidak selamat


### Kesan Risiko Keselamatan AI

**Konsekuensi Berimpak Tinggi:**
- **Eksfiltrasi Data**: Akses tanpa kebenaran dan kecurian data sensitif perusahaan atau peribadi
- **Pelanggaran Privasi**: Pendedahan maklumat peribadi yang dapat dikenal pasti (PII) dan data perniagaan sulit  
- **Manipulasi Sistem**: Pengubahsuaian tidak sengaja pada sistem kritikal dan aliran kerja
- **Kecurian Kredensial**: Kompromi token pengesahan dan kredensial perkhidmatan
- **Pergerakan Lateral**: Penggunaan sistem AI yang dikompromi sebagai titik tumpu untuk serangan rangkaian yang lebih luas

### Penyelesaian Keselamatan AI Microsoft

#### **Lindungan Arahan AI: Perlindungan Lanjutan Terhadap Serangan Suntikan**

Microsoft **Lindungan Arahan AI** menyediakan pertahanan menyeluruh terhadap serangan suntikan arahan secara langsung dan tidak langsung melalui pelbagai lapisan keselamatan:

##### **Mekanisme Perlindungan Teras:**

1. **Pengesanan & Penapisan Lanjutan**
   - Algoritma pembelajaran mesin dan teknik NLP mengesan arahan berniat jahat dalam kandungan luaran
   - Analisis masa nyata dokumen, laman web, emel, dan sumber data untuk ancaman terbenam
   - Pemahaman kontekstual corak arahan yang sah berbanding berniat jahat

2. **Teknik Penumpuan Cahaya**  
   - Membezakan antara arahan sistem yang dipercayai dan input luaran yang berpotensi dikompromi
   - Kaedah transformasi teks yang meningkatkan relevansi model sambil mengasingkan kandungan berniat jahat
   - Membantu sistem AI mengekalkan hierarki arahan yang betul dan mengabaikan arahan yang disuntik

3. **Sistem Penanda Had & Penandaan Data**
   - Definisi sempadan jelas antara mesej sistem yang dipercayai dan teks input luaran
   - Penanda khas menyerlahkan sempadan antara sumber data yang dipercayai dan tidak dipercayai
   - Pemisahan jelas mengelakkan kekeliruan arahan dan pelaksanaan arahan tanpa kebenaran

4. **Intelijen Ancaman Berterusan**
   - Microsoft memantau corak serangan baru dan mengemaskini pertahanan secara berterusan
   - Pemburuan ancaman proaktif untuk teknik suntikan baru dan vektor serangan
   - Kemas kini model keselamatan secara berkala untuk mengekalkan keberkesanan terhadap ancaman yang berkembang

5. **Integrasi Keselamatan Kandungan Azure**
   - Sebahagian daripada suite keselamatan kandungan Azure AI yang komprehensif
   - Pengesanan tambahan untuk cubaan jailbreak, kandungan berbahaya, dan pelanggaran dasar keselamatan
   - Kawalan keselamatan bersepadu merentas komponen aplikasi AI

**Sumber Pelaksanaan**: [Dokumentasi Lindungan Arahan Microsoft](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ms/prompt-shield.ff5b95be76e9c78c.webp)


## Ancaman Sekuriti MCP Lanjutan

### Kelemahan Pengambilalihan Sesi

**Pengambilalihan sesi** merupakan vektor serangan kritikal dalam pelaksanaan MCP berkeadaan di mana pihak tidak sah memperoleh dan menyalahgunakan pengenal sesi sah untuk menyamar sebagai klien dan melakukan tindakan tanpa kebenaran.

#### **Senario Serangan & Risiko**

- **Suntikan Arahan Pengambilalihan Sesi**: Penyerang dengan ID sesi yang dicuri menyuntik kejadian berniat jahat ke pelayan yang berkongsi keadaan sesi, berpotensi mencetuskan tindakan berbahaya atau mengakses data sensitif
- **Penyamaran Langsung**: ID sesi yang dicuri membolehkan panggilan langsung ke pelayan MCP yang melepasi pengesahan, memperlakukan penyerang sebagai pengguna sah
- **Aliran Boleh Disambung Semula yang Dikompromi**: Penyerang boleh menamatkan permintaan lebih awal, menyebabkan klien sah menyambung semula dengan kandungan yang berpotensi berniat jahat

#### **Kawalan Keselamatan untuk Pengurusan Sesi**

**Keperluan Kritikal:**
- **Pengesahan Kebenaran**: Pelayan MCP yang melaksanakan kebenaran **MESTI** mengesahkan SEMUA permintaan yang masuk dan **TIDAK BOLEH** bergantung pada sesi untuk pengesahan
- **Penjanaan Sesi Selamat**: Gunakan ID sesi yang kriptografi selamat dan tidak deterministik yang dijana dengan penjana nombor rawak yang selamat
- **Pengikatan Khusus Pengguna**: Ikat ID sesi kepada maklumat khusus pengguna menggunakan format seperti `<user_id>:<session_id>` untuk mengelakkan penyalahgunaan sesi antara pengguna
- **Pengurusan Kitaran Hayat Sesi**: Melaksanakan tamat tempoh, putaran, dan pembatalan yang betul untuk mengehadkan tetingkap kerentanan
- **Keselamatan Penghantaran**: HTTPS wajib untuk semua komunikasi bagi mengelakkan penyadapan ID sesi

### Masalah Wakil Keliru

**Masalah wakil keliru** berlaku apabila pelayan MCP bertindak sebagai proksi pengesahan antara klien dan perkhidmatan pihak ketiga, mewujudkan peluang untuk melepasi kebenaran melalui eksploitasi ID klien statik.

#### **Mekanisme Serangan & Risiko**

- **Pelepasan Persetujuan Berasaskan Kuk)**: Pengesahan pengguna sebelumnya menghasilkan kuk persetujuan yang dieksploitasi penyerang melalui permintaan kebenaran berniat jahat dengan URI redirect yang disiapkan
- **Kecurian Kod Kebenaran**: Kuk persetujuan sedia ada mungkin menyebabkan pelayan kebenaran melangkau skrin persetujuan, memautkan kod ke titik akhir yang dikawal penyerang  
- **Akses API Tanpa Kebenaran**: Kod kebenaran yang dicuri membolehkan pertukaran token dan penyamaran pengguna tanpa kelulusan eksplisit

#### **Strategi Mitigasi**

**Kawalan Wajib:**
- **Keperluan Persetujuan Eksplisit**: Pelayan proksi MCP yang menggunakan ID klien statik **MESTI** mendapatkan persetujuan pengguna untuk setiap klien yang didaftarkan secara dinamik
- **Pelaksanaan Keselamatan OAuth 2.1**: Ikuti amalan keselamatan OAuth terkini termasuk PKCE (Proof Key for Code Exchange) untuk semua permintaan kebenaran
- **Pengesahan Klien Ketat**: Melaksanakan pengesahan ketat URI redirect dan pengenal klien untuk mencegah eksploitasi

### Kelemahan Pemindahan Token  

**Pemindahan token** merupakan corak anti jelas di mana pelayan MCP menerima token klien tanpa pengesahan yang betul dan meneruskannya ke API hiliran, melanggar spesifikasi kebenaran MCP.

#### **Implikasi Keselamatan**

- **Pelepasan Kawalan**: Penggunaan token terus antara klien dan API melepasi kawalan had kadar, pengesahan, dan pemantauan penting
- **Kerosakan Jejak Audit**: Token yang dikeluarkan di hulu menjadikan pengenalan klien tidak mungkin, memecahkan keupayaan penyiasatan insiden
- **Eksfiltrasi Data Berasaskan Proksi**: Token tidak disahkan membolehkan penyerang menggunakan pelayan sebagai proksi untuk akses data tanpa kebenaran
- **Pelanggaran Sempadan Kepercayaan**: Asumsi kepercayaan perkhidmatan hiliran mungkin dilanggar apabila asal token tidak dapat disahkan
- **Penyebaran Serangan Berbilang Perkhidmatan**: Token yang dikompromi diterima merentas pelbagai perkhidmatan membolehkan pergerakan lateral

#### **Kawalan Keselamatan Diperlukan**

**Keperluan Tidak Boleh Dirunding:**
- **Pengesahan Token**: Pelayan MCP **TIDAK BOLEH** menerima token yang tidak secara eksplisit dikeluarkan untuk pelayan MCP
- **Pengesahan Audiens**: Sentiasa sahkan tuntutan audiens token sepadan dengan identiti pelayan MCP
- **Kitaran Hayat Token yang Betul**: Melaksanakan token capaian jangka pendek dengan amalan putaran selamat


## Keselamatan Rantai Bekalan untuk Sistem AI

Keselamatan rantai bekalan telah berkembang melebihi kebergantungan perisian tradisional untuk merangkumi seluruh ekosistem AI. Pelaksanaan MCP moden mesti mengesahkan dan memantau semua komponen berkaitan AI dengan ketat, kerana setiap satu memperkenalkan potensi kerentanan yang boleh menjejaskan integriti sistem.

### Komponen Rantai Bekalan AI yang Diperluas

**Kebergantungan Perisian Tradisional:**
- Perpustakaan dan rangka kerja sumber terbuka
- Imej kontena dan sistem asas  
- Alat pembangunan dan saluran binaan
- Komponen dan perkhidmatan infrastruktur

**Elemen Rantai Bekalan Khusus AI:**
- **Model Asas**: Model pra-latih dari pelbagai penyedia yang memerlukan pengesahan asal-usul
- **Perkhidmatan Embedding**: Perkhidmatan vektorisasi luaran dan carian semantik
- **Penyedia Konteks**: Sumber data, pangkalan pengetahuan, dan repositori dokumen  
- **API Pihak Ketiga**: Perkhidmatan AI luaran, saluran ML, dan titik akhir pemprosesan data
- **Artefak Model**: Berat, konfigurasi, dan variasi model yang dipertingkatkan
- **Sumber Data Latihan**: Set data yang digunakan untuk latihan dan penyesuaian model

### Strategi Keselamatan Rantai Bekalan Komprehensif

#### **Pengesahan & Kepercayaan Komponen**
- **Pengesahan Asal-usul**: Sahkan asal, pelesenan, dan integriti semua komponen AI sebelum integrasi
- **Penilaian Keselamatan**: Laksanakan imbasan kerentanan dan ulasan keselamatan untuk model, sumber data, dan perkhidmatan AI
- **Analisis Reputasi**: Nilai rekod keselamatan dan amalan penyedia perkhidmatan AI
- **Pengesahan Pematuhan**: Pastikan semua komponen memenuhi keperluan keselamatan dan peraturan organisasi

#### **Saluran Pelaksanaan Selamat**  
- **Keselamatan CI/CD Automatik**: Integrasikan pengimbasan keselamatan sepanjang saluran pelaksanaan automatik
- **Integriti Artefak**: Laksanakan pengesahan kriptografi untuk semua artefak terpasang (kod, model, konfigurasi)
- **Pelaksanaan Berperingkat**: Gunakan strategi pelaksanaan progresif dengan pengesahan keselamatan di setiap peringkat
- **Repositori Artefak Dipercayai**: Melaksanakan hanya dari registri dan repositori artefak yang disahkan dan selamat

#### **Pemantauan & Respons Berterusan**
- **Imbasan Kebergantungan**: Pemantauan kerentanan berterusan untuk semua kebergantungan perisian dan komponen AI
- **Pemantauan Model**: Penilaian berterusan tingkah laku model, pergeseran prestasi, dan anomali keselamatan
- **Penjejakan Kesihatan Perkhidmatan**: Pantau perkhidmatan AI luaran untuk ketersediaan, insiden keselamatan, dan perubahan dasar
- **Integrasi Intelijen Ancaman**: Menggabungkan suapan ancaman khusus untuk risiko keselamatan AI dan ML

#### **Kawalan Akses & Privilege Paling Rendah**
- **Kebenaran Tahap Komponen**: Hadkan akses ke model, data, dan perkhidmatan berdasarkan keperluan perniagaan
- **Pengurusan Akaun Perkhidmatan**: Melaksanakan akaun perkhidmatan khusus dengan kebenaran minimum yang diperlukan
- **Segmentasi Rangkaian**: Pengasingan komponen AI dan mengehadkan akses rangkaian antara perkhidmatan
- **Kawalan Gerbang API**: Gunakan gerbang API berpusat untuk mengawal dan memantau akses ke perkhidmatan AI luaran

#### **Respons Insiden & Pemulihan**
- **Prosedur Respons Pantas**: Proses yang ditetapkan untuk menampal atau menggantikan komponen AI yang dikompromi
- **Putaran Kredensial**: Sistem automatik untuk memutar rahsia, kunci API, dan kredensial perkhidmatan
- **Kemampuan Rollback**: Keupayaan untuk cepat kembali ke versi komponen AI yang diketahui baik sebelum ini
- **Pemulihan Pelanggaran Rantaian Bekalan**: Prosedur khusus untuk respons kepada kompromi perkhidmatan AI hulu

### Alat & Integrasi Keselamatan Microsoft

**GitHub Advanced Security** menyediakan perlindungan rantai bekalan yang komprehensif termasuk:
- **Imbasan Rahsia**: Pengesanan automatik kredensial, kunci API, dan token dalam repositori
- **Imbasan Kebergantungan**: Penilaian kerentanan untuk kebergantungan dan perpustakaan sumber terbuka
- **Analisis CodeQL**: Analisis statik kod untuk kerentanan keselamatan dan isu pengekodan
- **Wawasan Rantai Bekalan**: Kejelasan mengenai kesihatan dan status keselamatan kebergantungan

**Integrasi Azure DevOps & Azure Repos:**
- Integrasi pengimbasan keselamatan lancar merentas platform pembangunan Microsoft
- Pemeriksaan keselamatan automatik dalam Azure Pipelines untuk beban kerja AI
- Penguatkuasaan dasar untuk pelaksanaan komponen AI yang selamat

**Amalan Dalaman Microsoft:**
Microsoft melaksanakan amalan keselamatan rantai bekalan yang meluas merentas semua produk. Ketahui pendekatan terbukti dalam [Perjalanan untuk Mengamankan Rantai Bekalan Perisian di Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Amalan Terbaik Keselamatan Asas

Pelaksanaan MCP mewarisi dan membina ke atas kedudukan keselamatan sedia ada organisasi anda. Memperkukuh amalan keselamatan asas meningkatkan dengan ketara keselamatan keseluruhan sistem AI dan pelaksanaan MCP.

### Asas-asas Keselamatan Teras

#### **Amalan Pembangunan Selamat**
- **Pematuhan OWASP**: Melindungi terhadap kerentanan aplikasi web [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Perlindungan Khusus AI**: Melaksanakan kawalan untuk [OWASP Top 10 untuk LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Pengurusan Rahsia Selamat**: Gunakan peti besi khusus untuk token, kunci API, dan data konfigurasi sensitif
- **Penyulitan Sepanjang Jalan**: Melaksanakan komunikasi selamat merentas semua komponen aplikasi dan aliran data
- **Pengesahan Input**: Pengesahan ketat semua input pengguna, parameter API, dan sumber data

#### **Pengukuhan Infrastruktur**
- **Pengesahan Pelbagai Faktor**: MFA wajib untuk semua akaun pentadbiran dan perkhidmatan
- **Pengurusan Tampalan**: Tampalan automatik dan tepat pada masanya untuk sistem operasi, rangka kerja, dan kebergantungan  
- **Integrasi Penyedia Identiti**: Pengurusan identiti berpusat melalui penyedia identiti perusahaan (Microsoft Entra ID, Active Directory)
- **Segmentasi Rangkaian**: Pengasingan logik komponen MCP untuk mengehadkan potensi pergerakan lateral
- **Prinsip Hak Istimewa Paling Rendah**: Kebenaran minimum yang diperlukan untuk semua komponen sistem dan akaun

#### **Pemantauan & Pengesanan Keselamatan**
- **Pencatatan Menyeluruh**: Pencatatan terperinci aktiviti aplikasi AI, termasuk interaksi klien-pelayan MCP
- **Integrasi SIEM**: Pengurusan maklumat keselamatan dan peristiwa berpusat untuk pengesanan anomali
- **Analitik Tingkah Laku**: Pemantauan berpandukan AI untuk mengesan corak luar biasa dalam tingkah laku sistem dan pengguna
- **Intelijen Ancaman**: Penggabungan suapan ancaman luaran dan indikator kompromi (IOC)
- **Respons Insiden**: Prosedur terperinci untuk pengesanan, tindak balas, dan pemulihan insiden keselamatan

#### **Senibina Zero Trust**
- **Jangan Percaya, Sentiasa Sahkan**: Pengesahan berterusan pengguna, peranti, dan sambungan rangkaian
- **Mikro-Segmentasi**: Kawalan rangkaian granular yang mengasingkan beban kerja dan perkhidmatan individu
- **Keselamatan Berpusatkan Identiti**: Dasar keselamatan berdasarkan identiti yang disahkan dan bukannya lokasi rangkaian
- **Penilaian Risiko Berterusan**: Penilaian kedudukan keselamatan dinamik berdasarkan konteks dan tingkah laku semasa
- **Akses Bersyarat**: Kawalan akses yang menyesuaikan berdasarkan faktor risiko, lokasi, dan kepercayaan peranti

### Corak Integrasi Perusahaan

#### **Integrasi Ekosistem Keselamatan Microsoft**
- **Microsoft Defender untuk Awan**: Pengurusan kedudukan keselamatan awan yang komprehensif
- **Azure Sentinel**: Keupayaan SIEM dan SOAR asli awan untuk perlindungan beban kerja AI
- **Microsoft Entra ID**: Pengurusan identiti dan akses perusahaan dengan dasar akses bersyarat
- **Azure Key Vault**: Pengurusan rahsia berpusat dengan sokongan modul keselamatan perkakasan (HSM)
- **Microsoft Purview**: Tadbir urus data dan pematuhan untuk sumber data AI dan aliran kerja

#### **Pematuhan & Tadbir Urus**
- **Pelarasan Peraturan**: Pastikan pelaksanaan MCP memenuhi keperluan pematuhan khusus industri (GDPR, HIPAA, SOC 2)

- **Pengelasan Data**: Pengkategorian dan pengendalian yang betul terhadap data sensitif yang diproses oleh sistem AI
- **Jejak Audit**: Perekodan menyeluruh untuk pematuhan kawal selia dan penyiasatan forensik
- **Kawalan Privasi**: Pelaksanaan prinsip privasi dalam reka bentuk sistem AI
- **Pengurusan Perubahan**: Proses rasmi untuk tinjauan keselamatan terhadap pengubahsuaian sistem AI

Amalan asas ini mencipta asas keselamatan yang mantap yang meningkatkan keberkesanan kawalan keselamatan khusus MCP dan menyediakan perlindungan menyeluruh untuk aplikasi yang dipacu oleh AI.

## Pengambilan Keselamatan Utama

- **Pendekatan Keselamatan Berlapis**: Gabungkan amalan keselamatan asas (pengkodan selamat, keistimewaan terendah, pengesahan rantaian bekalan, pemantauan berterusan) dengan kawalan khusus AI untuk perlindungan menyeluruh

- **Lanskap Ancaman Khusus AI**: Sistem MCP menghadapi risiko unik termasuk suntikan arahan, racun alat, pengambilalihan sesi, masalah ejen keliru, kerentanan penyaluran token, dan kebenaran berlebihan yang memerlukan mitigasi khusus

- **Keunggulan Pengesahan & Kebenaran**: Laksanakan pengesahan kukuh menggunakan pembekal identiti luaran (Microsoft Entra ID), paksa pengesahan token yang betul, dan jangan sekali-kali menerima token yang tidak secara eksplisit dikeluarkan untuk pelayan MCP anda

- **Pencegahan Serangan AI**: Gunakan Microsoft Prompt Shields dan Azure Content Safety untuk mempertahankan terhadap serangan suntikan arahan tidak langsung dan racun alat, sambil mengesahkan metadata alat dan memantau perubahan dinamik

- **Keselamatan Sesi & Pengangkutan**: Gunakan ID sesi yang selamat secara kriptografi, tidak deterministik yang terikat pada identiti pengguna, laksanakan pengurusan kitaran hidup sesi yang betul, dan jangan gunakan sesi untuk pengesahan

- **Amalan Terbaik Keselamatan OAuth**: Elakkan serangan ejen keliru melalui persetujuan pengguna eksplisit untuk klien yang didaftarkan secara dinamik, pelaksanaan OAuth 2.1 yang betul dengan PKCE, dan pengesahan URI pengalihan yang ketat  

- **Prinsip Keselamatan Token**: Elakkan corak anti penyaluran token, sahkan tuntutan audiens token, laksanakan token jangka pendek dengan putaran selamat, dan kekalkan sempadan kepercayaan yang jelas

- **Keselamatan Rantaian Bekalan Menyeluruh**: Perlakukan semua komponen ekosistem AI (model, penanaman, pembekal konteks, API luaran) dengan ketelitian keselamatan yang sama seperti kebergantungan perisian tradisional

- **Evolusi Berterusan**: Kekal terkini dengan spesifikasi MCP yang berkembang pesat, sumbang kepada piawaian komuniti keselamatan, dan pelihara sikap keselamatan adaptif seiring protokol berkembang

- **Integrasi Keselamatan Microsoft**: Manfaatkan ekosistem keselamatan menyeluruh Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) untuk perlindungan pelaksanaan MCP yang dipertingkatkan

## Sumber Menyeluruh

### **Dokumentasi Keselamatan MCP Rasmi**
- [Spesifikasi MCP (Semasa: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Amalan Terbaik Keselamatan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Kebenaran MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositori GitHub MCP](https://github.com/modelcontextprotocol)

### **Sumber Keselamatan OWASP MCP**
- [Panduan Keselamatan Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP komprehensif dengan panduan pelaksanaan Azure
- [Top 10 OWASP MCP](https://owasp.org/www-project-mcp-top-10/) - Risiko keselamatan MCP rasmi OWASP
- [Bengkel Puncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Latihan keselamatan praktikal untuk MCP di Azure

### **Piawaian Keselamatan & Amalan Terbaik**
- [Amalan Terbaik Keselamatan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Top 10 Keselamatan Aplikasi Web OWASP](https://owasp.org/www-project-top-ten/)
- [Top 10 OWASP untuk Model Bahasa Besar](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Laporan Pertahanan Digital Microsoft](https://aka.ms/mddr)

### **Penyelidikan & Analisis Keselamatan AI**
- [Suntikan Arahan dalam MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Serangan Racun Alat (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Taklimat Penyelidikan Keselamatan MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Penyelesaian Keselamatan Microsoft**
- [Dokumentasi Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Perkhidmatan Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Keselamatan Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Amalan Terbaik Pengurusan Token Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Panduan Pelaksanaan & Tutorial**
- [Pengurusan API Azure sebagai Pintu Pengesahan MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Pengesahan Microsoft Entra ID dengan Pelayan MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Penyimpanan dan Penyulitan Token Selamat (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **Keselamatan DevOps & Rantaian Bekalan**
- [Keselamatan Azure DevOps](https://azure.microsoft.com/products/devops)
- [Keselamatan Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Perjalanan Keselamatan Rantaian Bekalan Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dokumentasi Keselamatan Tambahan**

Untuk panduan keselamatan menyeluruh, rujuk dokumen khusus dalam bahagian ini:

- **[Amalan Terbaik Keselamatan MCP 2025](./mcp-security-best-practices-2025.md)** - Amalan keselamatan lengkap untuk pelaksanaan MCP
- **[Pelaksanaan Azure Content Safety](./azure-content-safety-implementation.md)** - Contoh pelaksanaan praktikal untuk integrasi Azure Content Safety  
- **[Kawalan Keselamatan MCP 2025](./mcp-security-controls-2025.md)** - Kawalan dan teknik keselamatan terkini untuk pelaksanaan MCP
- **[Rujukan Pantas Amalan Terbaik MCP](./mcp-best-practices.md)** - Panduan rujukan cepat untuk amalan keselamatan penting MCP
- **[BlueHat 2026: Menjamin masa depan AI: Mengamankan MCP dengan corak pertahanan bertingkat](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Corak pertahanan bertingkat dari Pusat Respons Keselamatan Microsoft (MSRC)

### **Latihan Keselamatan Secara Praktikal**

- **[Bengkel Puncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - Bengkel praktikal menyeluruh untuk mengamankan pelayan MCP di Azure dengan kem progresif dari Kem Asas ke Puncak
- **[Panduan Keselamatan Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/)** - Seni bina rujukan dan panduan pelaksanaan untuk semua risiko Top 10 OWASP MCP

---

## Apa Yang Seterusnya

Seterusnya: [Bab 3: Bermula](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->