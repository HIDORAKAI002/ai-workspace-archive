# MCP Security: Perlindungan Menyeluruh untuk Sistem AI

[![MCP Security Best Practices](../../../translated_images/ms/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik imej di atas untuk menonton video pelajaran ini)_

Keselamatan adalah asas dalam reka bentuk sistem AI, itulah sebabnya kami mengutamakannya sebagai bahagian kedua kami. Ini sejajar dengan prinsip **Secure by Design** Microsoft dari [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) membawa kemampuan baru yang hebat kepada aplikasi berasaskan AI sambil memperkenalkan cabaran keselamatan unik yang melebihi risiko perisian tradisional. Sistem MCP menghadapi kedua-dua kebimbangan keselamatan yang sudah ada (pengekodan selamat, hak istimewa paling rendah, keselamatan rantaian bekalan) dan ancaman khusus AI baru termasuk suntikan prompt, pencemaran alat, pembajakan sesi, serangan confused deputy, kelemahan token passthrough, dan pengubahsuaian keupayaan dinamik.

Pelajaran ini meneroka risiko keselamatan paling kritikal dalam pelaksanaan MCP—meliputi pengesahan, kebenaran, kebenaran berlebihan, suntikan prompt tidak langsung, keselamatan sesi, masalah confused deputy, pengurusan token, dan kelemahan rantaian bekalan. Anda akan mempelajari kawalan tindakan dan amalan terbaik untuk mengurangkan risiko ini sambil memanfaatkan penyelesaian Microsoft seperti Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk mengukuhkan pelaksanaan MCP anda.

## Objektif Pembelajaran

Menjelang akhir pelajaran ini, anda akan dapat:

- **Kenal Pasti Ancaman Khusus MCP**: Mengenal pasti risiko keselamatan unik dalam sistem MCP termasuk suntikan prompt, pencemaran alat, kebenaran berlebihan, pembajakan sesi, masalah confused deputy, kelemahan token passthrough, dan risiko rantaian bekalan  
- **Terapkan Kawalan Keselamatan**: Melaksanakan mitigasi berkesan termasuk pengesahan kukuh, akses paling rendah, pengurusan token selamat, kawalan keselamatan sesi, dan pengesahan rantaian bekalan  
- **Manfaatkan Penyelesaian Keselamatan Microsoft**: Fahami dan gunakan Microsoft Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk perlindungan beban kerja MCP  
- **Sahkan Keselamatan Alat**: Kenal pasti kepentingan pengesahan metadata alat, pemantauan perubahan dinamik, dan mempertahankan serangan suntikan prompt tidak langsung  
- **Gabungkan Amalan Terbaik**: Gabungkan asas keselamatan yang telah teruji (pengekodan selamat, pengerasan pelayan, zero trust) dengan kawalan khusus MCP untuk perlindungan menyeluruh  

# Seni Bina & Kawalan Keselamatan MCP

Pelaksanaan MCP moden memerlukan pendekatan keselamatan berlapis yang merangkumi keselamatan perisian tradisional dan ancaman khusus AI. Spesifikasi MCP yang berkembang pesat terus mematangkan kawalan keselamatannya, membolehkan integrasi lebih baik dengan seni bina keselamatan perusahaan dan amalan terbaik yang sudah wujud.

Penyelidikan dari [Microsoft Digital Defense Report](https://aka.ms/mddr) menunjukkan bahawa **98% pelanggaran yang dilaporkan dapat dicegah dengan amalan kebersihan keselamatan yang kukuh**. Strategi perlindungan paling berkesan menggabungkan amalan keselamatan asas dengan kawalan khusus MCP—langkah keselamatan asas terbukti kekal paling berimpak dalam mengurangkan risiko keselamatan keseluruhan.

## Lanskap Keselamatan Semasa

> **Nota:** Maklumat ini mencerminkan piawaian keselamatan MCP sehingga **5 Februari 2026**, selaras dengan **Spesifikasi MCP 2025-11-25**. Protokol MCP terus berkembang dengan cepat, dan pelaksanaan akan datang mungkin memperkenalkan corak pengesahan baru dan kawalan yang dipertingkatkan. Sentiasa rujuk [Spesifikasi MCP](https://spec.modelcontextprotocol.io/), [repositori GitHub MCP](https://github.com/modelcontextprotocol), dan [dokumentasi amalan keselamatan terbaik](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) terkini untuk panduan terbaru.

## 🏔️ Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)

Untuk **latihan keselamatan secara amali**, kami sangat mengesyorkan **Bengkel Sidang Kemuncak Keselamatan MCP** (Sherpa) - ekspedisi berpandu menyeluruh untuk mengamankan pelayan MCP dalam Microsoft Azure.

### Gambaran Bengkel

[Bengkel Sidang Kemuncak Keselamatan MCP](https://azure-samples.github.io/sherpa/) menyediakan latihan keselamatan praktikal dan tindakan melalui metodologi "terdedah → eksploit → baiki → sahkan" yang terbukti. Anda akan:

- **Belajar dengan Merosakkan**: Alami kerentanan secara langsung dengan mengeksploit pelayan yang sengaja tidak selamat  
- **Gunakan Keselamatan Azure Asal**: Manfaatkan Azure Entra ID, Key Vault, Pengurusan API, dan AI Content Safety  
- **Ikuti Pertahanan Berlapis**: Menjalani kem-kem membina lapisan keselamatan menyeluruh  
- **Terapkan Standard OWASP**: Setiap teknik memetakan kepada [Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)  
- **Dapatkan Kod Produksi**: Bawa pulang pelaksanaan yang berfungsi dan telah diuji  

### Laluan Ekspedisi

| Kem | Fokus | Risiko OWASP Dilindungi |
|------|-------|-------------------------|
| **Kem Asas** | Asas MCP & kerentanan pengesahan | MCP01, MCP07 |
| **Kem 1: Identiti** | OAuth 2.1, Identiti Urus Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Kem 2: Pintu Masuk** | Pengurusan API, Private Endpoints, tadbir urus | MCP02, MCP07, MCP09 |
| **Kem 3: Keselamatan I/O** | Suntikan prompt, perlindungan PII, keselamatan kandungan | MCP03, MCP05, MCP06 |
| **Kem 4: Pemantauan** | Log Analytics, papan pemuka, pengesanan ancaman | MCP08 |
| **Puncak** | Ujian integrasi Pasukan Merah / Pasukan Biru | Semua |

**Mulakan:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Senarai 10 Risiko Keselamatan Teratas OWASP MCP

[Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) memperincikan sepuluh risiko keselamatan yang paling kritikal untuk pelaksanaan MCP:

| Risiko | Penerangan | Mitigasi Azure |
|------|-------------|----------------|
| **MCP01** | Pengurusan Token & Pendedahan Rahsia | Azure Key Vault, Identiti Urus |
| **MCP02** | Peningkatan Hak Istimewa melalui Skop Creep | RBAC, Akses Bersyarat |
| **MCP03** | Pencemaran Alat | Pengesahan alat, pengesahan integriti |
| **MCP04** | Serangan Rantaian Bekalan | GitHub Advanced Security, imbasan kebergantungan |
| **MCP05** | Suntikan & Pelaksanaan Arahan | Pengesahan input, perlindungan sandbox |
| **MCP06** | Suntikan Prompt melalui Payload Kontekstual | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Pengesahan & Kebenaran Tidak Mencukupi | Azure Entra ID, OAuth 2.1 dengan PKCE |
| **MCP08** | Kekurangan Audit & Telemetri | Azure Monitor, Application Insights |
| **MCP09** | Pelayan MCP Bayangan | Tadbir urus Pusat API, pengasingan rangkaian |
| **MCP10** | Suntikan Konteks & Pendedahan Berlebihan | Pengkelasan data, pendedahan minimum |

### Evolusi Pengesahan MCP

Spesifikasi MCP telah berkembang dengan ketara dalam pendekatan pengesahan dan kebenaran:

- **Pendekatan Asal**: Spesifikasi awal memerlukan pembangun melaksanakan pelayan pengesahan tersuai, dengan pelayan MCP bertindak sebagai Pelayan Kebenaran OAuth 2.0 mengurus pengesahan pengguna secara langsung  
- **Standard Semasa (2025-11-25)**: Spesifikasi dikemas kini membolehkan pelayan MCP mendelegasikan pengesahan kepada penyedia identiti luar (seperti Microsoft Entra ID), memperbaiki postur keselamatan dan mengurangkan kerumitan pelaksanaan  
- **Keselamatan Lapisan Pengangkutan**: Sokongan dipertingkatkan untuk mekanisme pengangkutan selamat dengan corak pengesahan yang sesuai untuk sambungan tempatan (STDIO) dan jauh (Streamable HTTP)  

## Keselamatan Pengesahan & Kebenaran

### Cabaran Keselamatan Semasa

Pelaksanaan MCP moden menghadapi beberapa cabaran pengesahan dan kebenaran:

### Risiko & Vektor Ancaman

- **Logik Kebenaran Salah Konfigurasi**: Pelaksanaan kebenaran yang cacat pada pelayan MCP boleh mendedahkan data sensitif dan menggunakan kawalan akses secara salah  
- **Kompromi Token OAuth**: Kecurian token pelayan MCP tempatan membolehkan penyerang menyamar sebagai pelayan dan mengakses perkhidmatan hiliran  
- **Kelemahan Token Passthrough**: Pengendalian token yang tidak betul mencipta pengelakan kawalan keselamatan dan kekurangan akauntabiliti  
- **Kebenaran Berlebihan**: Pelayan MCP dengan hak istimewa lebih dari perlu melanggar prinsip hak istimewa paling rendah dan memperbesar permukaan serangan  

#### Token Passthrough: Anti-Pattern Kritikal

**Token passthrough secara jelas DIHARAMKAN** dalam spesifikasi kebenaran MCP semasa kerana implikasi keselamatan yang serius:

##### Pengelakan Kawalan Keselamatan  
- Pelayan MCP dan API hiliran melaksanakan kawalan keselamatan kritikal (had kadar, pengesahan permintaan, pemantauan trafik) yang bergantung pada pengesahan token yang betul  
- Penggunaan token terus dari klien ke API melepasi perlindungan penting ini, melemahkan seni bina keselamatan  

##### Cabaran Akauntabiliti & Audit  
- Pelayan MCP tidak dapat membezakan antara klien yang menggunakan token dikeluarkan oleh huluan, merosakkan jejak audit  
- Log pelayan sumber hiliran menunjukkan asal permintaan yang mengelirukan dan bukannya perantaraan pelayan MCP sebenar  
- Siasatan insiden dan audit pematuhan menjadi jauh lebih sukar  

##### Risiko Eksfiltrasi Data  
- Tuntutan token yang tidak disahkan membolehkan pelaku jahat dengan token curi menggunakan pelayan MCP sebagai proksi untuk eksfiltrasi data  
- Pelanggaran sempadan kepercayaan membenarkan corak akses tanpa kebenaran yang melewati kawalan keselamatan yang dimaksudkan  

##### Vektor Serangan Multi-Perkhidmatan  
- Token terkompromi yang diterima oleh pelbagai perkhidmatan membolehkan pergerakan lateral merentasi sistem bersambung  
- Asumsi kepercayaan antara perkhidmatan boleh dilanggar apabila asal token tidak dapat disahkan  

### Kawalan Keselamatan & Mitigasi

**Keperluan Keselamatan Kritikal:**

> **WAJIB**: Pelayan MCP **HENDAKLAH TIDAK** menerima sebarang token yang tidak secara eksplisit dikeluarkan untuk pelayan MCP tersebut

#### Kawalan Pengesahan & Kebenaran

- **Semakan Kebenaran Ketat**: Lakukan audit menyeluruh terhadap logik kebenaran pelayan MCP untuk memastikan hanya pengguna dan klien yang dimaksudkan dapat mengakses sumber sensitif  
  - **Panduan Pelaksanaan**: [Azure API Management sebagai Pintu Masuk Pengesahan untuk Pelayan MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Integrasi Identiti**: [Menggunakan Microsoft Entra ID untuk Pengesahan Pelayan MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Pengurusan Token Selamat**: Terapkan [amalan terbaik pengesahan token dan kitar hayat Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Sahkan tuntutan audiens token sepadan dengan identiti pelayan MCP  
  - Laksanakan polisi putaran dan tamat tempoh token yang betul  
  - Elakkan serangan ulangan token dan penggunaan tanpa kebenaran  

- **Penyimpanan Token Terlindung**: Simpan token dengan penyulitan semasa rehat dan dalam transit  
  - **Amalan Terbaik**: [Garis Panduan Penyimpanan dan Penyulitan Token Selamat](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Pelaksanaan Kawalan Akses

- **Prinsip Hak Istimewa Paling Rendah**: Beri pelayan MCP hanya kebenaran minimum yang diperlukan untuk fungsi yang dimaksudkan  
  - Kajian dan kemas kini kebenaran secara berkala untuk mengelakkan kepanjangan hak istimewa  
  - **Dokumentasi Microsoft**: [Akses Paling Rendah yang Selamat](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kawalan Akses Berdasarkan Peranan (RBAC)**: Laksanakan penugasan peranan yang terperinci  
  - Hadkan peranan secara ketat kepada sumber dan tindakan tertentu  
  - Elakkan kebenaran luas atau tidak perlu yang memperbesar permukaan serangan  

- **Pemantauan Kebenaran Berterusan**: Laksanakan audit dan pemantauan akses berterusan  
  - Pantau corak penggunaan kebenaran untuk anomali  
  - Segera baiki kebenaran berlebihan atau tidak digunakan  

## Ancaman Keselamatan Khusus AI

### Serangan Suntikan Prompt & Manipulasi Alat

Pelaksanaan MCP moden menghadapi vektor serangan khusus AI yang sofistikated yang tidak dapat ditangani sepenuhnya oleh langkah keselamatan tradisional:

#### **Suntikan Prompt Tidak Langsung (Suntikan Prompt Merentas Domain)**

**Suntikan Prompt Tidak Langsung** merupakan salah satu kelemahan paling kritikal dalam sistem AI yang berkemampuan MCP. Penyerang menyisipkan arahan berbahaya dalam kandungan luaran—dokumen, halaman web, e-mel, atau sumber data—yang kemudian diproses oleh sistem AI sebagai arahan sahih.

**Senario Serangan:**  
- **Suntikan Berasaskan Dokumen**: Arahan jahat tersembunyi dalam dokumen yang diproses yang mencetuskan tindakan AI yang tidak disengajakan  
- **Eksploitasi Kandungan Web**: Halaman web yang dikompromi mengandungi prompt terbenam yang memanipulasi tingkah laku AI bila di-scrape  
- **Serangan Berasaskan E-mel**: Prompt jahat dalam e-mel menyebabkan pembantu AI membocorkan maklumat atau melakukan tindakan tanpa kebenaran  
- **Pencemaran Sumber Data**: Pangkalan data atau API yang dikompromi menyampaikan kandungan tercemar kepada sistem AI  

**Impak Dunia Nyata**: Serangan ini boleh menyebabkan eksfiltrasi data, pelanggaran privasi, penghasilan kandungan berbahaya, dan manipulasi interaksi pengguna. Untuk analisis terperinci, rujuk [Prompt Injection dalam MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/ms/prompt-injection.ed9fbfde297ca877.webp)

#### **Serangan Pencemaran Alat**

**Pencemaran Alat** mensasarkan metadata yang mendefinisikan alat MCP, mengeksploitasi cara LLM mentafsir deskripsi dan parameter alat untuk membuat keputusan pelaksanaan.

**Mekanisme Serangan:**  
- **Manipulasi Metadata**: Penyerang menyisipkan arahan berbahaya dalam deskripsi alat, definisi parameter, atau contoh penggunaan  
- **Arahan Tidak Nampak**: Prompt tersembunyi dalam metadata alat yang diproses oleh model AI tetapi tidak kelihatan kepada pengguna manusia  
- **Pengubahsuaian Alat Dinamik ("Rug Pulls")**: Alat yang diterima oleh pengguna kemudiannya diubah untuk melakukan tindakan jahat tanpa kesedaran pengguna  
- **Suntikan Parameter**: Kandungan berbahaya yang terbenam dalam skema parameter alat mempengaruhi tingkah laku model  

**Risiko Pelayan Dihoskan**: Pelayan MCP jauh menghadirkan risiko tinggi kerana definisi alat boleh dikemas kini selepas kelulusan awal pengguna, mewujudkan senario di mana alat yang sebelum ini selamat menjadi jahat. Untuk analisis menyeluruh, rujuk [Serangan Pencemaran Alat (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/ms/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vektor Serangan AI Tambahan**

- **Suntikan Prompt Merentas Domain (XPIA)**: Serangan sofistikated yang memanfaatkan kandungan dari pelbagai domain untuk melepasi kawalan keselamatan  

- **Pengubahsuaian Keupayaan Dinamik**: Perubahan masa nyata pada keupayaan alat yang meloloskan penilaian keselamatan awal  
- **Pengacauan Tetingkap Konteks**: Serangan yang memanipulasi tetingkap konteks besar untuk menyembunyikan arahan berniat jahat  
- **Serangan Kekeliruan Model**: Mengeksploitasi had model untuk mencipta tingkah laku yang tidak dapat diduga atau tidak selamat  


### Impak Risiko Keselamatan AI

**Kesan Berimpak Tinggi:**  
- **Pengeluaran Data**: Akses tanpa kebenaran dan kecurian data sensitif perusahaan atau peribadi  
- **Pelanggaran Privasi**: Pendedahan maklumat yang boleh dikenal pasti secara peribadi (PII) dan data perniagaan sulit  
- **Manipulasi Sistem**: Pengubahsuaian tidak sengaja pada sistem kritikal dan aliran kerja  
- **Kecurian Kelayakan**: Kompromi token pengesahan dan kelayakan perkhidmatan  
- **Pergerakan Lateral**: Penggunaan sistem AI yang dikompromi sebagai titik pangsi untuk serangan rangkaian yang lebih luas  


### Penyelesaian Keselamatan AI Microsoft

#### **AI Prompt Shields: Perlindungan Lanjutan Terhadap Serangan Suntikan**

Microsoft **AI Prompt Shields** menyediakan pertahanan menyeluruh terhadap serangan suntikan prompt secara langsung dan tidak langsung melalui pelbagai lapisan keselamatan:

##### **Mekanisme Perlindungan Teras:**

1. **Pengesanan & Penapisan Lanjutan**  
   - Algoritma pembelajaran mesin dan teknik NLP mengesan arahan berniat jahat dalam kandungan luaran  
   - Analisis masa nyata dokumen, halaman web, e-mel, dan sumber data untuk ancaman tertanam  
   - Kefahaman kontekstual mengenai corak prompt yang sah berbanding berniat jahat  

2. **Teknik Penyorotan**  
   - Membezakan antara arahan sistem yang dipercayai dan input luaran yang berpotensi dikompromi  
   - Kaedah transformasi teks yang meningkatkan relevansi model sambil mengasingkan kandungan berniat jahat  
   - Membantu sistem AI mengekalkan hierarki arahan yang betul dan mengabaikan arahan suntikan  

3. **Sistem Pembatas & Pemarkahan Data**  
   - Definisi sempadan yang jelas antara mesej sistem yang dipercayai dan teks input luaran  
   - Penanda khas menyoroti sempadan antara sumber data yang dipercayai dan tidak dipercayai  
   - Pemisahan yang jelas menghalang kekeliruan arahan dan pelaksanaan arahan tanpa kebenaran  

4. **Kecerdasan Ancaman Berterusan**  
   - Microsoft memantau corak serangan yang muncul secara berterusan dan mengemas kini pertahanan  
   - Pemburuan ancaman proaktif untuk teknik suntikan baru dan vektor serangan  
   - Kemas kini model keselamatan secara berkala untuk mengekalkan keberkesanan terhadap ancaman yang berkembang  

5. **Integrasi Azure Content Safety**  
   - Sebahagian daripada suite Azure AI Content Safety yang komprehensif  
   - Pengesanan tambahan untuk cubaan jailbreak, kandungan berbahaya, dan pelanggaran dasar keselamatan  
   - Kawalan keselamatan bersepadu merentas komponen aplikasi AI  

**Sumber Pelaksanaan**: [Dokumentasi Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ms/prompt-shield.ff5b95be76e9c78c.webp)


## Ancaman Keselamatan MCP Lanjutan

### Kerentanan Pembajakan Sesi

**Pembajakan sesi** mewakili vektor serangan kritikal dalam pelaksanaan MCP berstatus di mana pihak tidak dibenarkan memperoleh dan menyalahgunakan pengecam sesi yang sah untuk menyamar sebagai klien dan melakukan tindakan tidak sah.

#### **Senario Serangan & Risiko**

- **Suntikan Prompt Pembajakan Sesi**: Penyerang dengan ID sesi yang dicuri menyuntik acara berniat jahat ke pelayan yang berkongsi status sesi, berpotensi mencetuskan tindakan berbahaya atau mengakses data sensitif  
- **Penyamaran Langsung**: ID sesi yang dicuri membolehkan panggilan pelayan MCP terus yang melepasi pengesahan, menganggap penyerang sebagai pengguna sah  
- **Aliran Boleh Sambung yang Dikompromi**: Penyerang boleh menamatkan permintaan lebih awal, menyebabkan klien sah meneruskan dengan kandungan yang berpotensi berniat jahat  

#### **Kawalan Keselamatan untuk Pengurusan Sesi**

**Keperluan Kritikal:**  
- **Verifikasi Autorisasi**: Pelayan MCP yang melaksanakan autorisasi **MESTI** mengesahkan SEMUA permintaan masuk dan **TIDAK MESTI** bergantung pada sesi untuk pengesahan  
- **Penjanaan Sesi Selamat**: Gunakan ID sesi tidak deterministik yang dijana dengan penjana nombor rawak kriptografi yang selamat  
- **Pengikatan Spesifik Pengguna**: Ikat ID sesi kepada maklumat pengguna menggunakan format seperti `<user_id>:<session_id>` untuk menghalang penyalahgunaan sesi silang pengguna  
- **Pengurusan Kitar Hayat Sesi**: Laksanakan luput, putaran, dan pengesahan semula yang betul untuk mengehadkan tetingkap kerentanan  
- **Keselamatan Pengangkutan**: HTTPS wajib untuk semua komunikasi bagi menghalang intip ID sesi  

### Masalah Deputi Keliru

**Masalah deputi keliru** berlaku apabila pelayan MCP berperanan sebagai proksi pengesahan antara klien dan perkhidmatan pihak ketiga, mewujudkan peluang untuk melepasi autorisasi melalui eksploitasi ID klien statik.

#### **Mekanisme Serangan & Risiko**

- **Lompatan Persetujuan Berasaskan Kuki**: Pengesahan pengguna sebelumnya mewujudkan kuki persetujuan yang dieksploitasi penyerang melalui permintaan autorisasi berniat jahat dengan URI redirect yang direka  
- **Kecurian Kod Autorizasi**: Kuki persetujuan yang ada mungkin menyebabkan pelayan autorisasi melangkau skrin persetujuan, mengalihkan kod ke titik akhir yang dikawal penyerang  
- **Akses API Tanpa Kebenaran**: Kod autorisasi yang dicuri membolehkan pertukaran token dan penyamaran pengguna tanpa kelulusan tersurat  

#### **Strategi Mitigasi**

**Kawalan Wajib:**  
- **Keperluan Persetujuan Tersurat**: Pelayan proksi MCP yang menggunakan ID klien statik **MESTI** mendapatkan persetujuan pengguna untuk setiap klien yang didaftarkan secara dinamik  
- **Pelaksanaan Keselamatan OAuth 2.1**: Ikuti amalan terbaik keselamatan OAuth terkini termasuk PKCE (Proof Key for Code Exchange) untuk semua permintaan autorisasi  
- **Pengesahan Klien Ketat**: Laksanakan pengesahan ketat terhadap URI redirect dan pengecam klien untuk menghalang eksploitasi  

### Kerentanan Token Passthrough  

**Token passthrough** mewakili anti-pola eksplisit di mana pelayan MCP menerima token klien tanpa pengesahan yang betul dan memajukannya ke API hiliran, melanggar spesifikasi autorisasi MCP.

#### **Implikasi Keselamatan**

- **Penyeludupan Kawalan**: Penggunaan token terus dari klien ke API melepasi kawalan penting seperti pengehad kadar, pengesahan, dan pemantauan  
- **Kerosakan Jejak Audit**: Token yang dikeluarkan di hulu menjadikan pengenalpastian klien mustahil, merosakkan kemampuan siasatan insiden  
- **Pengeluaran Data Berasaskan Proksi**: Token yang tidak disahkan membenarkan pelaku berniat jahat menggunakan pelayan sebagai proksi untuk akses data tanpa kebenaran  
- **Pelanggaran Sempadan Kepercayaan**: Anggapan kepercayaan perkhidmatan hiliran mungkin dilanggar apabila asal token tidak boleh disahkan  
- **Pengembangan Serangan Berbilang Perkhidmatan**: Token yang dikompromi diterima merentas pelbagai perkhidmatan membolehkan pergerakan lateral  

#### **Kawalan Keselamatan Diperlukan**

**Keperluan Tidak Boleh Dirunding:**  
- **Pengesahan Token**: Pelayan MCP **TIDAK MESTI** menerima token yang tidak dikeluarkan secara tersurat untuk pelayan MCP  
- **Verifikasi Penonton**: Sentiasa sahkan tuntutan penonton token sepadan dengan identiti pelayan MCP  
- **Kitar Hayat Token Betul**: Laksanakan token capaian jangka pendek dengan amalan putaran selamat  


## Keselamatan Rantaian Bekalan untuk Sistem AI

Keselamatan rantaian bekalan telah berkembang melebihi kebergantungan perisian tradisional untuk merangkumi keseluruhan ekosistem AI. Pelaksanaan MCP moden mesti mengesahkan dan memantau dengan ketat semua komponen berkaitan AI, kerana setiap satu memperkenalkan kerentanan potensi yang boleh mengkompromikan integriti sistem.

### Komponen Rantaian Bekalan AI yang Diperkembangkan

**Kebergantungan Perisian Tradisional:**  
- Perpustakaan dan rangka kerja sumber terbuka  
- Imej kontena dan sistem asas  
- Alat pembangunan dan saluran binaan  
- Komponen infrastruktur dan perkhidmatan  

**Elemen Rantaian Bekalan Khusus AI:**  
- **Model Asas**: Model terlatih awal dari pelbagai penyedia yang memerlukan pengesahan asal usul  
- **Perkhidmatan Penanaman**: Perkhidmatan vektorisasi dan carian semantik luaran  
- **Penyedia Konteks**: Sumber data, pangkalan pengetahuan, dan repositori dokumen  
- **API Pihak Ketiga**: Perkhidmatan AI luaran, saluran ML, dan titik akhir pemprosesan data  
- **Artifak Model**: Berat, konfigurasi, dan varian model yang diselaraskan  
- **Sumber Data Latihan**: Set data yang digunakan untuk latihan model dan penalaan halus  

### Strategi Keselamatan Rantaian Bekalan Menyeluruh

#### **Pengesahan & Kepercayaan Komponen**  
- **Pengesahan Asal Usul**: Sahkan asal usul, pelesenan, dan integriti semua komponen AI sebelum integrasi  
- **Penilaian Keselamatan**: Lakukan imbasan kerentanan dan semakan keselamatan untuk model, sumber data, dan perkhidmatan AI  
- **Analisis Reputasi**: Nilai rekod keselamatan dan amalan penyedia perkhidmatan AI  
- **Pengesahan Pematuhan**: Pastikan semua komponen memenuhi keperluan keselamatan dan peraturan organisasi  

#### **Saluran Pelaksanaan Selamat**  
- **Keselamatan CI/CD Automatik**: Integrasikan pengimbasan keselamatan sepanjang saluran pelaksanaan automatik  
- **Integriti Artifak**: Laksanakan pengesahan kriptografi untuk semua artifak yang diterapkan (kod, model, konfigurasi)  
- **Pelaksanaan Berperingkat**: Gunakan strategi pelaksanaan progresif dengan pengesahan keselamatan di setiap tahap  
- **Repositori Artifak Dipercayai**: Terapkan hanya dari registri dan repositori artifak yang disahkan dan selamat  

#### **Pemantauan & Respons Berterusan**  
- **Pengimbasan Kebergantungan**: Pemantauan kerentanan berterusan untuk semua kebergantungan perisian dan komponen AI  
- **Pemantauan Model**: Penilaian berterusan tingkah laku model, kecondongan prestasi, dan anomali keselamatan  
- **Penjejakan Kesihatan Perkhidmatan**: Pantau perkhidmatan AI luaran untuk ketersediaan, insiden keselamatan, dan perubahan dasar  
- **Integrasi Kecerdasan Ancaman**: Gabungkan suapan ancaman khas untuk risiko keselamatan AI dan ML  

#### **Kawalan Akses & Keistimewaan Minimum**  
- **Kebenaran Tahap Komponen**: Hadkan akses kepada model, data, dan perkhidmatan berdasarkan keperluan perniagaan  
- **Pengurusan Akaun Perkhidmatan**: Laksanakan akaun perkhidmatan khusus dengan kebenaran minimum yang diperlukan  
- **Segmen Rangkaian**: Pisahkan komponen AI dan hadkan akses rangkaian antara perkhidmatan  
- **Kawalan Gerbang API**: Gunakan gerbang API berpusat untuk mengawal dan memantau akses ke perkhidmatan AI luaran  

#### **Respons Insiden & Pemulihan**  
- **Prosedur Respons Pantas**: Proses yang ditetapkan untuk menampal atau menggantikan komponen AI yang dikompromi  
- **Putaran Kelayakan**: Sistem automatik untuk menggilir rahsia, kunci API, dan kelayakan perkhidmatan  
- **Keupayaan Putar Balik**: Keupayaan untuk cepat kembali ke versi sebelumnya yang diketahui baik bagi komponen AI  
- **Pemulihan Pelanggaran Rantaian Bekalan**: Prosedur khusus untuk bertindak balas terhadap kompromi perkhidmatan AI hulu  

### Alat Keselamatan & Integrasi Microsoft

**GitHub Advanced Security** menyediakan perlindungan rantaian bekalan menyeluruh termasuk:  
- **Pengimbasan Rahsia**: Pengesanan automatik kelayakan, kunci API, dan token dalam repositori  
- **Pengimbasan Kebergantungan**: Penilaian kerentanan untuk kebergantungan sumber terbuka dan perpustakaan  
- **Analisis CodeQL**: Analisis kod statik untuk kerentanan keselamatan dan isu pengkodan  
- **Wawasan Rantaian Bekalan**: Kebolehlaksanaan ke atas kesihatan dan status keselamatan kebergantungan  

**Integrasi Azure DevOps & Azure Repos:**  
- Integrasi pengimbasan keselamatan yang lancar merentas platform pembangunan Microsoft  
- Pemeriksaan keselamatan automatik dalam Azure Pipelines untuk beban kerja AI  
- Penguatkuasaan dasar untuk pelaksanaan komponen AI yang selamat  

**Amalan Dalaman Microsoft:**  
Microsoft melaksanakan amalan keselamatan rantaian bekalan meluas merentas semua produk. Ketahui pendekatan terbukti dalam [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Amalan Terbaik Keselamatan Asas

Pelaksanaan MCP mewarisi dan membina atas asas postur keselamatan organisasi anda yang sedia ada. Memperkukuh amalan asas keselamatan secara signifikan meningkatkan keselamatan keseluruhan sistem AI dan pelaksanaan MCP.

### Asas Keselamatan Teras

#### **Amalan Pembangunan Selamat**  
- **Pematuhan OWASP**: Lindungi daripada [OWASP Top 10](https://owasp.org/www-project-top-ten/) kerentanan aplikasi web  
- **Perlindungan Khusus AI**: Laksanakan kawalan untuk [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Pengurusan Rahsia Selamat**: Gunakan peti simpanan khas untuk token, kunci API, dan data konfigurasi sensitif  
- **Penyulitan Sepanjang Jalan**: Laksanakan komunikasi selamat merentas semua komponen aplikasi dan aliran data  
- **Pengesahan Input**: Pengesahan ketat semua input pengguna, parameter API, dan sumber data  

#### **Pemantapan Infrastruktur**  
- **Pengesahan Multifaktor**: MFA wajib untuk semua akaun pentadbir dan perkhidmatan  
- **Pengurusan Tampalan**: Tampalan automatik dan tepat pada masanya untuk sistem operasi, rangka kerja, dan kebergantungan  
- **Integrasi Penyedia Identiti**: Pengurusan identiti berpusat melalui penyedia identiti perusahaan (Microsoft Entra ID, Active Directory)  
- **Segmen Rangkaian**: Pengasingan logik komponen MCP untuk mengehadkan potensi pergerakan lateral  
- **Prinsip Keistimewaan Minimum**: Kebenaran minimum yang diperlukan untuk semua komponen sistem dan akaun  

#### **Pemantauan & Pengesanan Keselamatan**  
- **Pencatatan Menyeluruh**: Pencatatan terperinci aktiviti aplikasi AI, termasuk interaksi klien-pelayan MCP  
- **Integrasi SIEM**: Pengurusan maklumat dan peristiwa keselamatan berpusat untuk pengesanan anomali  
- **Analitik Tingkah Laku**: Pemantauan dikuasakan AI untuk mengesan corak luar biasa dalam tingkah laku sistem dan pengguna  
- **Kecerdasan Ancaman**: Integrasi suapan ancaman luaran dan penunjuk kompromi (IOC)  
- **Respons Insiden**: Prosedur terperinci untuk pengesanan, tindak balas, dan pemulihan insiden keselamatan  

#### **Seni Bina Zero Trust**  
- **Jangan Percaya, Sentiasa Sahkan**: Pengesahan berterusan pengguna, peranti, dan sambungan rangkaian  
- **Mikro-Segmentasi**: Kawalan rangkaian granular yang mengasingkan beban kerja dan perkhidmatan individu  
- **Keselamatan Berasaskan Identiti**: Dasar keselamatan berdasarkan identiti yang disahkan dan bukan lokasi rangkaian  
- **Penilaian Risiko Berterusan**: Penilaian postur keselamatan dinamik berdasarkan konteks dan tingkah laku semasa  
- **Akses Bersyarat**: Kawalan akses yang menyesuaikan berdasarkan faktor risiko, lokasi, dan kepercayaan peranti  

### Corak Integrasi Perusahaan

#### **Integrasi Ekosistem Keselamatan Microsoft**  
- **Microsoft Defender for Cloud**: Pengurusan postur keselamatan awan menyeluruh  
- **Azure Sentinel**: Kebolehan SIEM dan SOAR asli awan untuk perlindungan beban kerja AI  
- **Microsoft Entra ID**: Pengurusan identiti dan akses perusahaan dengan dasar akses bersyarat  
- **Azure Key Vault**: Pengurusan rahsia berpusat dengan sokongan modul keselamatan perkakasan (HSM)  
- **Microsoft Purview**: Tadbir urus data dan pematuhan untuk sumber data dan aliran kerja AI  

#### **Pematuhan & Tadbir Urus**  
- **Penyesuaian Peraturan**: Pastikan pelaksanaan MCP memenuhi keperluan pematuhan khusus industri (GDPR, HIPAA, SOC 2)  
- **Pengelasan Data**: Pengkategorian dan pengendalian yang betul terhadap data sensitif yang diproses oleh sistem AI  
- **Jejak Audit**: Pencatatan menyeluruh untuk pematuhan peraturan dan siasatan forensik  
- **Kawalan Privasi**: Pelaksanaan prinsip privasi-semak-dari-reka dalam seni bina sistem AI  
- **Pengurusan Perubahan**: Proses formal untuk semakan keselamatan terhadap pengubahsuaian sistem AI  

Amalan asas ini mewujudkan asas keselamatan yang kukuh yang meningkatkan keberkesanan kawalan keselamatan khusus MCP dan menyediakan perlindungan menyeluruh untuk aplikasi berasaskan AI.
## Pengajaran Utama Keselamatan

- **Pendekatan Keselamatan Berlapis**: Gabungkan amalan keselamatan asas (pengekodan selamat, keistimewaan paling rendah, pengesahan rantaian bekalan, pemantauan berterusan) dengan kawalan khusus AI untuk perlindungan menyeluruh

- **Landskap Ancaman Khusus AI**: Sistem MCP menghadapi risiko unik termasuk suntikan arahan, keracunan alat, rampasan sesi, masalah pegawai bingung, kelemahan laluan token, dan kebenaran berlebihan yang memerlukan mitigasi khusus

- **Kecemerlangan Pengesahan & Kebenaran**: Laksanakan pengesahan kukuh menggunakan penyedia identiti luaran (Microsoft Entra ID), kuatkuasakan pengesahan token yang betul, dan jangan sekali-kali menerima token yang tidak dikeluarkan secara eksplisit untuk pelayan MCP anda

- **Pencegahan Serangan AI**: Gunakan Microsoft Prompt Shields dan Azure Content Safety untuk mempertahankan daripada serangan suntikan arahan tidak langsung dan keracunan alat, sambil mengesahkan metadata alat dan memantau perubahan dinamik

- **Keselamatan Sesi & Pengangkutan**: Gunakan ID sesi yang selamat secara kriptografi, bukan deterministik yang diikat kepada identiti pengguna, laksanakan pengurusan kitar hayat sesi yang betul, dan jangan gunakan sesi untuk pengesahan

- **Amalan Terbaik Keselamatan OAuth**: Cegah serangan pegawai bingung melalui persetujuan pengguna yang jelas untuk klien yang didaftarkan secara dinamik, pelaksanaan OAuth 2.1 yang betul dengan PKCE, dan pengesahan URI redirect yang ketat  

- **Prinsip Keselamatan Token**: Elakkan anti-pola laluan token, sahkan tuntutan audiens token, laksanakan token jangka pendek dengan putaran selamat, dan kekalkan sempadan kepercayaan yang jelas

- **Keselamatan Rantaian Bekalan Menyeluruh**: Anggap semua komponen ekosistem AI (model, penenun, penyedia konteks, API luaran) dengan tahap keselamatan yang sama seperti kebergantungan perisian tradisional

- **Evolusi Berterusan**: Kekal terkini dengan spesifikasi MCP yang berkembang pesat, sumbang kepada piawaian komuniti keselamatan, dan kekalkan postur keselamatan yang adaptif semasa protokol matang

- **Integrasi Keselamatan Microsoft**: Manfaatkan ekosistem keselamatan Microsoft yang menyeluruh (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) untuk perlindungan pelaksanaan MCP yang dipertingkatkan

## Sumber Menyeluruh

### **Dokumentasi Keselamatan MCP Rasmi**
- [Spesifikasi MCP (Semasa: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Amalan Terbaik Keselamatan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Kebenaran MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositori GitHub MCP](https://github.com/modelcontextprotocol)

### **Sumber Keselamatan OWASP MCP**
- [Panduan Keselamatan Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/) - 10 Teratas OWASP MCP komprehensif dengan panduan pelaksanaan Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keselamatan MCP rasmi OWASP
- [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Latihan keselamatan praktikal untuk MCP di Azure

### **Piawaian Keselamatan & Amalan Terbaik**
- [Amalan Terbaik Keselamatan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [10 Teratas Keselamatan Aplikasi Web OWASP](https://owasp.org/www-project-top-ten/)
- [10 Teratas OWASP untuk Model Bahasa Besar](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Laporan Pertahanan Digital Microsoft](https://aka.ms/mddr)

### **Penyelidikan & Analisis Keselamatan AI**
- [Suntikan Arahan dalam MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Serangan Keracunan Alat (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Taklimat Penyelidikan Keselamatan MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Penyelesaian Keselamatan Microsoft**
- [Dokumentasi Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Perkhidmatan Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Keselamatan Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Amalan Terbaik Pengurusan Token Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Panduan Pelaksanaan & Tutorial**
- [Pengurusan API Azure sebagai Gerbang Pengesahan MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Pengesahan Microsoft Entra ID dengan Pelayan MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Penyimpanan dan Penyulitan Token Selamat (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Keselamatan Rantaian Bekalan**
- [Keselamatan Azure DevOps](https://azure.microsoft.com/products/devops)
- [Keselamatan Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Perjalanan Keselamatan Rantaian Bekalan Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dokumentasi Keselamatan Tambahan**

Untuk panduan keselamatan menyeluruh, rujuk dokumen khusus berikut dalam bahagian ini:

- **[Amalan Terbaik Keselamatan MCP 2025](./mcp-security-best-practices-2025.md)** - Amalan terbaik keselamatan lengkap untuk pelaksanaan MCP
- **[Pelaksanaan Azure Content Safety](./azure-content-safety-implementation.md)** - Contoh pelaksanaan praktikal untuk integrasi Azure Content Safety  
- **[Kawalan Keselamatan MCP 2025](./mcp-security-controls-2025.md)** - Kawalan dan teknik keselamatan terkini untuk pelaksanaan MCP
- **[Rujukan Pantas Amalan Terbaik MCP](./mcp-best-practices.md)** - Panduan rujukan pantas untuk amalan keselamatan MCP penting

### **Latihan Keselamatan Praktikal**

- **[Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - Bengkel praktikal menyeluruh untuk mengamankan pelayan MCP di Azure dengan kem progresif dari Kem Asas ke Sidang Kemuncak
- **[Panduan Keselamatan Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/)** - Seni bina rujukan dan panduan pelaksanaan untuk semua risiko OWASP MCP Top 10

---

## Apa Seterusnya

Seterusnya: [Bab 3: Mula Bermula](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber rujukan yang sah. Untuk maklumat penting, terjemahan profesional oleh manusia adalah digalakkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->