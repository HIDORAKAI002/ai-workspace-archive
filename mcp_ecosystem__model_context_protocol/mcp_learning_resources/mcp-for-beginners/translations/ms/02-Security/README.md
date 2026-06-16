# MCP Security: Perlindungan Komprehensif untuk Sistem AI

[![Amalan Terbaik MCP Security](../../../translated_images/ms/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik imej di atas untuk menonton video pelajaran ini)_

Keselamatan adalah asas dalam reka bentuk sistem AI, itulah sebabnya kami mengutamakan ia sebagai bahagian kedua kami. Ini sejajar dengan prinsip **Secure by Design** Microsoft dari [Inisiatif Masa Depan Selamat](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokol Konteks Model (MCP) membawa keupayaan baru yang kuat kepada aplikasi yang dipacu AI sambil memperkenalkan cabaran keselamatan unik yang melebihi risiko perisian tradisional. Sistem MCP menghadapi kedua-dua kebimbangan keselamatan yang telah wujud (pengekodan selamat, hak keistimewaan minimum, keselamatan rantaian bekalan) dan ancaman khusus AI baru termasuk suntikan prompt, penggunaan alat beracun, pembajakan sesi, serangan wakil yang keliru, kelemahan token passthrough, dan pengubahsuaian keupayaan dinamik.

Pelajaran ini meneroka risiko keselamatan paling kritikal dalam pelaksanaan MCP — meliputi pengesahan, kebenaran, kebenaran berlebihan, suntikan prompt tidak langsung, keselamatan sesi, masalah wakil yang keliru, pengurusan token, dan kelemahan rantaian bekalan. Anda akan mempelajari kawalan yang boleh dilaksanakan dan amalan terbaik untuk mengurangkan risiko ini sambil memanfaatkan penyelesaian Microsoft seperti Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk mengukuhkan penyebaran MCP anda.

## Objektif Pembelajaran

Menjelang akhir pelajaran ini, anda akan dapat:

- **Kenal Pasti Ancaman Khusus MCP**: Mengenali risiko keselamatan unik dalam sistem MCP termasuk suntikan prompt, penggunaan alat beracun, kebenaran berlebihan, pembajakan sesi, masalah wakil yang keliru, kelemahan token passthrough, dan risiko rantaian bekalan
- **Guna Kawalan Keselamatan**: Melaksanakan mitigasi efektif termasuk pengesahan kukuh, akses hak keistimewaan minimum, pengurusan token yang selamat, kawalan keselamatan sesi, dan pengesahan rantaian bekalan
- **Manfaatkan Penyelesaian Keselamatan Microsoft**: Memahami dan menggunakan Microsoft Prompt Shields, Azure Content Safety, dan GitHub Advanced Security untuk perlindungan beban kerja MCP
- **Sahkan Keselamatan Alat**: Mengenali kepentingan pengesahan metadata alat, pemantauan perubahan dinamik, dan mempertahankan terhadap serangan suntikan prompt tidak langsung
- **Gabungkan Amalan Terbaik**: Menggabungkan asas keselamatan yang telah sedia ada (pengekodan selamat, pengukuhan pelayan, zero trust) dengan kawalan khusus MCP untuk perlindungan menyeluruh

# Seni Bina & Kawalan Keselamatan MCP

Pelaksanaan MCP moden memerlukan pendekatan keselamatan berlapis yang menangani keselamatan perisian tradisional dan ancaman khusus AI. Spesifikasi MCP yang berkembang pesat terus mematangkan kawalan keselamatannya, membolehkan integrasi lebih baik dengan seni bina keselamatan perusahaan dan amalan terbaik yang telah sedia ada.

Penyelidikan dari [Laporan Pertahanan Digital Microsoft](https://aka.ms/mddr) menunjukkan bahawa **98% pelanggaran dilaporkan boleh dielakkan dengan kebersihan keselamatan yang kukuh**. Strategi perlindungan paling berkesan menggabungkan amalan keselamatan asas dengan kawalan khusus MCP—langkah keselamatan asas yang terbukti kekal paling berimpak dalam mengurangkan risiko keselamatan keseluruhan.

## Lanskap Keselamatan Semasa

> **Nota:** Maklumat ini mencerminkan piawaian keselamatan MCP sehingga **5 Februari 2026**, selaras dengan **Spesifikasi MCP 2025-11-25**. Protokol MCP terus berkembang dengan cepat, dan pelaksanaan masa depan mungkin memperkenalkan corak pengesahan baru dan kawalan dipertingkatkan. Sentiasa rujuk [Spesifikasi MCP](https://spec.modelcontextprotocol.io/), [repositori GitHub MCP](https://github.com/modelcontextprotocol), dan [dokumentasi amalan terbaik keselamatan](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) terkini untuk panduan terbaru.

## 🏔️ Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)

Untuk **latihan keselamatan praktikal**, kami sangat menggalakkan **Bengkel Sidang Kemuncak Keselamatan MCP** (Sherpa) – ekspedisi berpandu komprehensif untuk mengamankan pelayan MCP dalam Microsoft Azure.

### Gambaran Bengkel

[Bengkel Sidang Kemuncak Keselamatan MCP](https://azure-samples.github.io/sherpa/) menyediakan latihan keselamatan praktikal dan boleh dilaksanakan melalui metodologi "terdedah → eksploitasi → baiki → sahkan" yang terbukti. Anda akan:

- **Belajar dengan Memecahkan Sesuatu**: Mengalami kerentanan secara langsung dengan mengeksploitasi pelayan yang sengaja tidak selamat
- **Gunakan Keselamatan Azure Asli**: Memanfaatkan Azure Entra ID, Key Vault, Pengurusan API, dan AI Content Safety
- **Ikuti Pertahanan Berlapis**: Melalui kem membina lapisan keselamatan menyeluruh
- **Gunakan Piawaian OWASP**: Setiap teknik dipadankan dengan [Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Dapatkan Kod Pengeluaran**: Berjalan keluar dengan pelaksanaan yang berfungsi dan diuji

### Laluan Ekspedisi

| Kem | Fokus | Risiko OWASP Dilindungi |
|------|-------|---------------------|
| **Kem Asas** | Asas MCP & kerentanan pengesahan | MCP01, MCP07 |
| **Kem 1: Identiti** | OAuth 2.1, Identiti Terurus Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Kem 2: Pintu Gerbang** | Pengurusan API, Titik Akhir Peribadi, tadbir urus | MCP02, MCP06, MCP07, MCP09 |
| **Kem 3: Keselamatan I/O** | Suntikan prompt, perlindungan PII, keselamatan kandungan | MCP03, MCP05, MCP06, MCP10 |
| **Kem 4: Pemantauan** | Log Analytics, papan pemuka, pengesanan ancaman | MCP04, MCP08 |
| **Sidang Kemuncak** | Ujian integrasi Red Team / Blue Team | Semua |

**Mula Sekarang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Risiko Keselamatan Teratas MCP OWASP

[Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) menjelaskan sepuluh risiko keselamatan yang paling kritikal untuk pelaksanaan MCP:

| Risiko | Penerangan | Mitigasi Azure |
|------|-------------|------------------|
| **MCP01** | Pengurusan Token & Pendedahan Rahsia | Azure Key Vault, Identiti Terurus |
| **MCP02** | Peningkatan Keistimewaan melalui Penambahan Skop | RBAC, Akses Bersyarat |
| **MCP03** | Keracunan Alat | Pengesahan alat, pengesahan integriti |
| **MCP04** | Serangan Rantaian Bekalan Perisian & Penipuan Kebergantungan | GitHub Advanced Security, imbasan kebergantungan |
| **MCP05** | Suntikan & Pelaksanaan Arahan | Pengesahan input, sandboxing |
| **MCP06** | Pengalihan Aliran Niat | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Kekurangan Pengesahan & Kebenaran | Azure Entra ID, OAuth 2.1 dengan PKCE |
| **MCP08** | Kekurangan Audit dan Telemetri | Azure Monitor, Application Insights |
| **MCP09** | Pelayan MCP Bayangan | Tadbir urus Pusat API, pengasingan rangkaian |
| **MCP10** | Suntikan Konteks & Pendedahan Berlebihan | Pengelasan data, pendedahan minimum |

### Evolusi Pengesahan MCP

Spesifikasi MCP telah berkembang dengan ketara dalam pendekatannya terhadap pengesahan dan kebenaran:

- **Pendekatan Asal**: Spesifikasi awal menghendaki pembangun melaksanakan pelayan pengesahan tersuai, dengan pelayan MCP bertindak sebagai Pelayan Kebenaran OAuth 2.0 mengurus pengesahan pengguna secara langsung
- **Standard Semasa (2025-11-25)**: Spesifikasi dikemas kini membenarkan pelayan MCP mendelegasikan pengesahan kepada pembekal identiti luaran (seperti Microsoft Entra ID), memperbaiki postur keselamatan dan mengurangkan kerumitan pelaksanaan
- **Keselamatan Lapisan Pengangkutan**: Sokongan dipertingkatkan untuk mekanisme pengangkutan selamat dengan corak pengesahan yang betul untuk sambungan tempatan (STDIO) dan jauh (Streamable HTTP)

## Keselamatan Pengesahan & Kebenaran

### Cabaran Keselamatan Semasa

Pelaksanaan MCP moden menghadapi beberapa cabaran pengesahan dan kebenaran:

### Risiko & Vektor Ancaman

- **Logik Kebenaran Salah Konfigurasi**: Pelaksanaan kebenaran yang salah dalam pelayan MCP boleh mendedahkan data sensitif dan mengenakan kawalan akses secara tidak betul
- **Kompromi Token OAuth**: Pencurian token pelayan MCP tempatan membolehkan penyerang menyamar sebagai pelayan dan mengakses perkhidmatan hiliran
- **Kelemahan Token Passthrough**: Pengendalian token yang tidak betul mewujudkan bypass kawalan keselamatan dan jurang akauntabiliti
- **Kebenaran Berlebihan**: Pelayan MCP yang diberi hak berlebihan melanggar prinsip keistimewaan minimum dan memperluaskan permukaan serangan

#### Token Passthrough: Satu Anti-Polakan Kritikal

**Token passthrough adalah secara nyata DILARANG** dalam spesifikasi kebenaran MCP semasa kerana impak keselamatan yang serius:

##### Pengaburan Kawalan Keselamatan
- Pelayan MCP dan API hiliran melaksanakan kawalan keselamatan kritikal (had kadar, pengesahan permintaan, pemantauan trafik) yang bergantung pada pengesahan token yang betul
- Penggunaan token terus daripada klien ke API memintas perlindungan penting ini, melemahkan seni bina keselamatan

##### Cabaran Akauntabiliti & Audit  
- Pelayan MCP tidak dapat membezakan antara klien menggunakan token yang dikeluarkan oleh huluan, merosakkan jejak audit
- Log pelayan sumber hiliran menunjukkan asal permintaan yang mengelirukan dan bukan perantara pelayan MCP sebenar
- Siasatan insiden dan audit pematuhan menjadi jauh lebih sukar

##### Risiko Eksfiltrasi Data
- Klaim token yang tidak disahkan membolehkan penyerang berniat jahat dengan token curi menggunakan pelayan MCP sebagai proksi untuk eksfiltrasi data
- Pelanggaran sempadan kepercayaan membenarkan corak akses tanpa kebenaran yang memintas kawalan keselamatan yang dinyatakan

##### Vektor Serangan Pelbagai Perkhidmatan
- Token yang telah dikompromi dan diterima oleh pelbagai perkhidmatan membolehkan pergerakan melintang di antara sistem yang bersambung
- Asumsi kepercayaan antara perkhidmatan mungkin dilanggar apabila asal token tidak dapat disahkan

### Kawalan & Mitigasi Keselamatan

**Keperluan Keselamatan Kritikal:**

> **WAJIB**: Pelayan MCP **TIDAK BOLEH** menerima sebarang token yang tidak dikeluarkan secara eksplisit untuk pelayan MCP

#### Kawalan Pengesahan & Kebenaran

- **Ulasan Kebenaran Rapi**: Lakukan audit menyeluruh ke atas logik kebenaran pelayan MCP untuk memastikan hanya pengguna dan klien yang dimaksudkan boleh mengakses sumber sensitif
  - **Panduan Pelaksanaan**: [Pengurusan API Azure sebagai Pintu Gerbang Pengesahan untuk Pelayan MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrasi Identiti**: [Menggunakan Microsoft Entra ID untuk Pengesahan Pelayan MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Pengurusan Token Selamat**: Melaksanakan [amalan terbaik pengesahan token dan kitaran hayat Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Sahkan klaim audiens token yang sepadan dengan identiti pelayan MCP
  - Laksanakan dasar putaran token dan tamat tempoh yang betul
  - Cegah serangan ulangan token dan penggunaan tanpa kebenaran

- **Penyimpanan Token Terlindung**: Simpan token dengan selamat menggunakan penyulitan semasa simpanan dan transit
  - **Amalan Terbaik**: [Garis Panduan Penyimpanan Token Selamat dan Penyulitan](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Pelaksanaan Kawalan Akses

- **Prinsip Keistimewaan Minimum**: Beri pelayan MCP hanya kebenaran minimum yang diperlukan untuk fungsi yang dimaksudkan
  - Semakan dan kemas kini kebenaran berkala untuk mengelakkan peningkatan keistimewaan
  - **Dokumentasi Microsoft**: [Akses Keistimewaan Minimum Selamat](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kawalan Akses Berdasarkan Peranan (RBAC)**: Melaksanakan tugasan peranan terperinci
  - Tentukan skop peranan dengan ketat kepada sumber dan tindakan tertentu
  - Elakkan kebenaran meluas atau tidak perlu yang memperluaskan permukaan serangan

- **Pemantauan Kebenaran Berterusan**: Laksanakan pengauditan dan pemantauan akses berterusan
  - Pantau corak penggunaan kebenaran bagi anomali
  - Selesaikan segera keistimewaan berlebihan atau tidak digunakan

## Ancaman Keselamatan Khusus AI

### Serangan Suntikan Prompt & Manipulasi Alat

Pelaksanaan MCP moden menghadapi vektor serangan khusus AI yang canggih yang tidak dapat ditangani sepenuhnya oleh langkah keselamatan tradisional:

#### **Suntikan Prompt Tidak Langsung (Suntikan Prompt Merentas Domain)**

**Suntikan Prompt Tidak Langsung** mewakili salah satu kelemahan paling kritikal dalam sistem AI yang disokong MCP. Penyerang menyisipkan arahan berniat jahat dalam kandungan luar—dokumen, halaman web, e-mel, atau sumber data—yang kemudian diproses sistem AI sebagai arahan sah.

**Senario Serangan:**
- **Suntikan Berasaskan Dokumen**: Arahan jahat tersembunyi dalam dokumen yang diproses yang mencetuskan tindakan AI yang tidak diingini
- **Eksploitasi Kandungan Web**: Halaman web yang dikompromi mengandungi prompt terbenam yang memanipulasi kelakuan AI apabila discrape
- **Serangan Berasaskan E-mel**: Prompt berniat jahat dalam e-mel menyebabkan pembantu AI bocorkan maklumat atau melakukan tindakan tanpa kebenaran
- **Pencemaran Sumber Data**: Pangkalan data atau API yang dikompromi menyajikan kandungan tercemar kepada sistem AI

**Kesan Dunia Sebenar**: Serangan ini boleh menyebabkan eksfiltrasi data, pelanggaran privasi, penghasilan kandungan berbahaya, dan manipulasi interaksi pengguna. Untuk analisis terperinci, lihat [Suntikan Prompt dalam MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram Serangan Suntikan Prompt](../../../translated_images/ms/prompt-injection.ed9fbfde297ca877.webp)

#### **Serangan Keracunan Alat**

**Keracunan Alat** menyasarkan metadata yang mentakrifkan alat MCP, mengeksploitasi bagaimana LLM mentafsirkan penerangan dan parameter alat untuk membuat keputusan pelaksanaan.

**Mekanisme Serangan:**
- **Manipulasi Metadata**: Penyerang menyisipkan arahan berniat jahat ke dalam penerangan alat, definisi parameter, atau contoh penggunaan
- **Arahan Tidak Kelihatan**: Prompt tersembunyi dalam metadata alat yang diproses oleh model AI tetapi tidak kelihatan kepada pengguna manusia
- **Pengubahsuaian Alat Dinamik ("Rug Pulls")**: Alat yang telah diluluskan pengguna diubah suai kemudian untuk melaksanakan tindakan berniat jahat tanpa pengetahuan pengguna
- **Suntikan Parameter**: Kandungan berniat jahat disisipkan dalam skema parameter alat yang mempengaruhi tingkah laku model

**Risiko Pelayan Hosted**: Pelayan MCP jauh membawa risiko lebih tinggi kerana definisi alat boleh dikemas kini selepas kelulusan awal pengguna, mewujudkan senario di mana alat yang dahulunya selamat menjadi berniat jahat. Untuk analisis menyeluruh, lihat [Serangan Keracunan Alat (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram Serangan Suntikan Alat](../../../translated_images/ms/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vektor Serangan AI Tambahan**

- **Suntikan Prompt Merentas Domain (XPIA)**: Serangan canggih yang memanfaatkan kandungan dari pelbagai domain untuk memintas kawalan keselamatan
- **Pengubahsuaian Keupayaan Dinamik**: Perubahan masa nyata keupayaan alat yang mengatasi penilaian keselamatan awal  
- **Pencemaran Tetingkap Konteks**: Serangan yang memanipulasi tetingkap konteks besar untuk menyembunyikan arahan berniat jahat  
- **Serangan Kekeliruan Model**: Mengeksploitasi kekangan model untuk mencipta tingkah laku tidak dapat diramal atau tidak selamat  


### Kesan Risiko Keselamatan AI

**Kesan Berimpak Tinggi:**  
- **Eksfiltrasi Data**: Akses tanpa kebenaran dan pencurian data peribadi atau perusahaan yang sensitif  
- **Pelanggaran Privasi**: Pendedahan maklumat peribadi yang boleh dikenal pasti (PII) dan data perniagaan sulit  
- **Manipulasi Sistem**: Pengubahsuaian tidak disengajakan ke sistem dan aliran kerja kritikal  
- **Kecurian Kelayakan**: Kompromi token pengesahan dan kelayakan perkhidmatan  
- **Pergerakan Mendatar**: Penggunaan sistem AI yang terkompromi sebagai titik tumpuan untuk serangan rangkaian lebih luas  


### Penyelesaian Keselamatan AI Microsoft

#### **AI Prompt Shields: Perlindungan Lanjutan Terhadap Serangan Suntikan**

Microsoft **AI Prompt Shields** menyediakan pertahanan menyeluruh terhadap serangan suntikan arahan secara langsung dan tidak langsung melalui pelbagai lapisan keselamatan:

##### **Mekanisme Perlindungan Teras:**

1. **Pengesanan & Penapisan Lanjutan**  
   - Algoritma pembelajaran mesin dan teknik NLP mengesan arahan berniat jahat dalam kandungan luaran  
   - Analisis masa nyata dokumen, laman web, emel, dan sumber data untuk ancaman yang disembunyi  
   - Kefahaman kontekstual tentang corak arahan sah berbanding berniat jahat  

2. **Teknik Penyorotan**  
   - Membezakan antara arahan sistem yang dipercayai dan input luaran yang berpotensi terkompromi  
   - Kaedah transformasi teks yang meningkatkan relevansi model sambil mengasingkan kandungan berniat jahat  
   - Membantu sistem AI mengekalkan hierarki arahan yang betul dan mengabaikan perintah yang disuntik  

3. **Sistem Pemisah & Penandaan Data**  
   - Definisi sempadan eksplisit antara mesej sistem yang dipercayai dan teks input luaran  
   - Penanda khas menyorot sempadan antara sumber data yang dipercayai dan tidak dipercayai  
   - Pemisahan jelas mengelakkan kekeliruan arahan dan pelaksanaan perintah tanpa kebenaran  

4. **Perisikan Ancaman Berterusan**  
   - Microsoft memantau secara berterusan corak serangan yang muncul dan mengemas kini pertahanan  
   - Perburuan ancaman proaktif untuk teknik suntikan dan vektor serangan baru  
   - Kemas kini model keselamatan secara berkala untuk mengekalkan keberkesanan terhadap ancaman yang berubah  

5. **Integrasi Azure Content Safety**  
   - Sebahagian daripada suite keselamatan kandungan Azure AI yang komprehensif  
   - Pengesanan tambahan untuk cubaan jailbreak, kandungan berbahaya dan pelanggaran dasar keselamatan  
   - Kawalan keselamatan bersepadu merentas komponen aplikasi AI  

**Sumber Pelaksanaan**: [Dokumentasi Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ms/prompt-shield.ff5b95be76e9c78c.webp)


## Ancaman Keselamatan MCP Lanjutan

### Kerentanan Perampasan Sesi

**Perampasan sesi** mewakili vektor serangan kritikal dalam pelaksanaan MCP berstatus dimana pihak tanpa kebenaran memperoleh dan menyalahgunakan pengecam sesi sah untuk menyamar sebagai klien dan melakukan tindakan tanpa kebenaran.

#### **Senario Serangan & Risiko**

- **Suntikan Prompt Perampasan Sesi**: Penyerang dengan ID sesi yang dicuri menyuntik acara berniat jahat ke pelayan berkongsi keadaan sesi, berpotensi mencetuskan tindakan berbahaya atau mengakses data sensitif  
- **Penyamaran Langsung**: ID sesi curi membolehkan panggilan pelayan MCP terus yang memintas pengesahan, memperlakukan penyerang sebagai pengguna sah  
- **Arus Boleh Sambung Semula Terkompromi**: Penyerang boleh menghentikan permintaan lebih awal, menyebabkan klien sah menyambung dengan kandungan berpotensi berniat jahat  

#### **Kawalan Keselamatan untuk Pengurusan Sesi**

**Keperluan Kritikal:**  
- **Verifikasi Kebenaran**: Pelayan MCP yang melaksanakan pengesahan **MESTI** mengesahkan SEMUA permintaan masuk dan **TIDAK BOLEH** bergantung pada sesi untuk pengesahan  
- **Penjanaan Sesi Selamat**: Gunakan ID sesi yang selamat secara kriptografi, bukan deterministik, yang dihasilkan menggunakan penjana nombor rawak selamat  
- **Pengikatan Spesifik Pengguna**: Ikat ID sesi kepada maklumat pengguna spesifik menggunakan format seperti `<user_id>:<session_id>` untuk mengelakkan penyalahgunaan sesi silang pengguna  
- **Pengurusan Kitaran Hayat Sesi**: Laksanakan tamat tempoh, putaran dan pembatalan yang betul untuk mengehadkan tetingkap kerentanan  
- **Keselamatan Pengangkutan**: HTTPS wajib untuk semua komunikasi bagi mengelakkan penyadapan ID sesi  

### Masalah Deputi Keliru

Masalah **deputi keliru** berlaku apabila pelayan MCP bertindak sebagai proksi pengesahan antara klien dan perkhidmatan pihak ketiga, mewujudkan peluang untuk memintas kebenaran melalui eksploitasi ID klien statik.

#### **Mekanisme Serangan & Risiko**

- **Pintas Persetujuan Berasaskan Kukis**: Pengesahan pengguna terdahulu mencipta kuki persetujuan yang dieksploitasi penyerang melalui permintaan kebenaran berniat jahat dengan URI redirect direka  
- **Kecurian Kod Kebenaran**: Kuki persetujuan sedia ada boleh menyebabkan pelayan kebenaran melangkau skrin persetujuan, mengarahkan kod ke endpoint dikawal penyerang  
- **Akses API Tanpa Kebenaran**: Kod kebenaran yang dicuri membolehkan pertukaran token dan penyamaran pengguna tanpa kelulusan jelas  

#### **Strategi Mitigasi**

**Kawalan Wajib:**  
- **Keperluan Persetujuan Eksplisit**: Pelayan proksi MCP yang menggunakan ID klien statik **MESTI** mendapatkan persetujuan pengguna untuk setiap klien berdaftar dinamik  
- **Pelaksanaan Keselamatan OAuth 2.1**: Ikuti amalan keselamatan terbaik OAuth semasa termasuk PKCE (Proof Key for Code Exchange) untuk semua permintaan kebenaran  
- **Pengesahan Klien Ketat**: Laksanakan pengesahan ketat terhadap URI redirect dan pengecam klien untuk mengelakkan eksploitasi  

### Kerentanan Penyaluran Token  

**Penyaluran token** ialah anti-pola eksplisit di mana pelayan MCP menerima token klien tanpa pengesahan yang betul dan meneruskannya ke API hiliran, melanggar spesifikasi kebenaran MCP.

#### **Implikasi Keselamatan**

- **Pintas Kawalan**: Penggunaan langsung token klien ke API memintas kawalan mengehadkan kadar, pengesahan dan pemantauan kritikal  
- **Kemerosotan Jejak Audit**: Token yang dikeluarkan dari hulu membuat pengecaman klien menjadi mustahil, mematahkan kemampuan penyiasatan insiden  
- **Eksfiltrasi Data Berasaskan Proksi**: Token tidak disahkan membolehkan pelaku berniat jahat menggunakan pelayan sebagai proksi untuk akses data tanpa kebenaran  
- **Pelanggaran Sempadan Kepercayaan**: Andaian kepercayaan perkhidmatan hiliran mungkin dilanggar apabila asal token tidak dapat disahkan  
- **Perluasan Serangan Pelbagai Perkhidmatan**: Token yang terkompromi diterima merentas perkhidmatan pelbagai membolehkan pergerakan mendatar  

#### **Kawalan Keselamatan Diperlukan**

**Keperluan Tidak Boleh Runding:**  
- **Pengesahan Token**: Pelayan MCP **TIDAK BOLEH** menerima token yang tidak dikeluarkan secara eksplisit untuk pelayan MCP  
- **Verifikasi Audiens**: Sentiasa sahkan tuntutan audiens token adalah sama dengan identiti pelayan MCP  
- **Kitaran Hayat Token Yang Betul**: Laksanakan token akses jangka pendek dengan amalan putaran selamat  


## Keselamatan Rantaian Bekalan untuk Sistem AI

Keselamatan rantaian bekalan telah berkembang melebihi kebergantungan perisian tradisional untuk merangkumi keseluruhan ekosistem AI. Pelaksanaan MCP moden mesti memeriksa dan memantau semua komponen berkaitan AI dengan ketat kerana setiap satu memperkenalkan kerentanan berpotensi yang boleh merosakkan integriti sistem.

### Komponen Rantaian Bekalan AI yang Diperluaskan

**Kebergantungan Perisian Tradisional:**  
- Perpustakaan dan rangka kerja sumber terbuka  
- Imej kontena dan sistem asas  
- Alat pembangunan dan saluran binaan  
- Komponen dan perkhidmatan infrastruktur  

**Elemen Rantaian Bekalan Khusus AI:**  
- **Model Asas**: Model pra-latih dari pelbagai pembekal memerlukan pengesahan asal usul  
- **Perkhidmatan Embedding**: Perkhidmatan vektorisasi dan carian semantik luaran  
- **Penyedia Konteks**: Sumber data, pangkalan ilmu dan repositori dokumen  
- **API Pihak Ketiga**: Perkhidmatan AI luaran, saluran ML dan titik pangkalan pemprosesan data  
- **Artefak Model**: Berat, konfigurasi dan varian model yang ditala halus  
- **Sumber Data Latihan**: Set data yang digunakan untuk latihan dan penalaan model  

### Strategi Keselamatan Rantaian Bekalan Menyeluruh

#### **Pengesahan & Kepercayaan Komponen**  
- **Pengesahan Asal**: Sahkan asal, lesen dan integriti semua komponen AI sebelum integrasi  
- **Penilaian Keselamatan**: Jalankan imbasan kerentanan dan ulasan keselamatan bagi model, sumber data dan perkhidmatan AI  
- **Analisis Reputasi**: Nilai rekod keselamatan dan amalan pembekal perkhidmatan AI  
- **Pengesahan Pematuhan**: Pastikan semua komponen memenuhi keperluan keselamatan dan pengawalseliaan organisasi  

#### **Saluran Penghantaran Selamat**  
- **Keselamatan CI/CD Automatik**: Integrasi imbasan keselamatan sepanjang saluran penghantaran automatik  
- **Integriti Artefak**: Laksanakan pengesahan kriptografi untuk semua artefak yang dihantar (kod, model, konfigurasi)  
- **Penghantaran Berperingkat**: Gunakan strategi penghantaran progresif dengan pengesahan keselamatan di setiap peringkat  
- **Repositori Artefak Dipercayai**: Hantar hanya dari registri dan repositori artefak yang disahkan dan selamat  

#### **Pemantauan & Respons Berterusan**  
- **Imbasan Kebergantungan**: Pemantauan kerentanan berterusan untuk semua kebergantungan perisian dan komponen AI  
- **Pemantauan Model**: Penilaian berterusan tingkah laku model, pergeseran prestasi dan anomali keselamatan  
- **Penjejakan Kesihatan Perkhidmatan**: Pantau perkhidmatan AI luaran untuk ketersediaan, kejadian keselamatan dan perubahan dasar  
- **Integrasi Perisikan Ancaman**: Gunakan suapan ancaman khusus risiko keselamatan AI dan ML  

#### **Kawalan Akses & Hak Istimewa Minimum**  
- **Kebenaran Tahap Komponen**: Hadkan akses kepada model, data dan perkhidmatan berdasarkan keperluan perniagaan  
- **Pengurusan Akaun Perkhidmatan**: Laksanakan akaun perkhidmatan khusus dengan kebenaran minimum yang diperlukan  
- **Segmentasi Rangkaian**: Asingkan komponen AI dan hadkan akses rangkaian antara perkhidmatan  
- **Kawalan Gerbang API**: Gunakan gerbang API berpusat untuk kawal dan pantau akses ke perkhidmatan AI luaran  

#### **Respons Insiden & Pemulihan**  
- **Prosedur Respons Pantas**: Proses ditetapkan untuk tampalan atau penggantian komponen AI yang terkompromi  
- **Putaran Kelayakan**: Sistem automatik untuk putaran rahsia, kunci API dan kelayakan perkhidmatan  
- **Keupayaan Rollback**: Kebolehan untuk segera kembali ke versi komponen AI yang diketahui baik  
- **Pemulihan Pelanggaran Rantaian Bekalan**: Prosedur khusus untuk tindak balas kompromi perkhidmatan AI hulu  

### Alat & Integrasi Keselamatan Microsoft

**GitHub Advanced Security** menyediakan perlindungan rantaian bekalan menyeluruh termasuk:  
- **Imbasan Rahsia**: Pengesanan automatik kelayakan, kunci API dan token dalam repositori  
- **Imbasan Kebergantungan**: Penilaian kerentanan untuk kebergantungan dan perpustakaan sumber terbuka  
- **Analisis CodeQL**: Analisis kod statik untuk kerentanan keselamatan dan isu pengkodan  
- **Wawasan Rantaian Bekalan**: Penglihatan ke atas kesihatan kebergantungan dan status keselamatan  

**Integrasi Azure DevOps & Azure Repos:**  
- Integrasi imbasan keselamatan lancar merentas platform pembangunan Microsoft  
- Pemeriksaan keselamatan automatik dalam Azure Pipelines untuk beban kerja AI  
- Penguatkuasaan dasar untuk penghantaran komponen AI selamat  

**Amalan Dalaman Microsoft:**  
Microsoft melaksanakan amalan keselamatan rantaian bekalan yang luas merentas semua produk. Ketahui pendekatan terbukti dalam [Perjalanan Menuju Keselamatan Rantaian Bekalan Perisian di Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Amalan Terbaik Keselamatan Asas

Pelaksanaan MCP mewarisi dan membina asas keselamatan sedia ada organisasi anda. Memperkuat amalan keselamatan asas secara signifikan meningkatkan keselamatan keseluruhan sistem AI dan pelaksanaan MCP.

### Asas Keselamatan Teras

#### **Amalan Pembangunan Selamat**  
- **Pematuhan OWASP**: Perlindungan terhadap kerentanan aplikasi web [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Perlindungan Khusus AI**: Laksanakan kawalan untuk [OWASP Top 10 untuk LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Pengurusan Rahsia Selamat**: Gunakan peti besi khusus untuk token, kunci API dan data konfigurasi sensitif  
- **Penyulitan Hujung-ke-Hujung**: Laksanakan komunikasi selamat merentas semua komponen aplikasi dan aliran data  
- **Pengesahan Input**: Validasi ketat semua input pengguna, parameter API dan sumber data  

#### **Pengukuhan Infrastruktur**  
- **Pengesahan Faktor Berganda**: MFA wajib untuk semua akaun pentadbir dan perkhidmatan  
- **Pengurusan Tampalan**: Tampalan automatik dan tepat pada masanya untuk sistem pengendalian, rangka kerja dan kebergantungan  
- **Integrasi Penyedia Identiti**: Pengurusan identiti berpusat melalui penyedia identiti perusahaan (Microsoft Entra ID, Active Directory)  
- **Segmentasi Rangkaian**: Pengasingan logik komponen MCP untuk mengurangkan potensi pergerakan mendatar  
- **Prinsip Hak Istimewa Minimum**: Kebenaran minimum yang diperlukan untuk semua komponen dan akaun sistem  

#### **Pemantauan & Pengesanan Keselamatan**  
- **Logging Menyeluruh**: Logging terperinci aktiviti aplikasi AI termasuk interaksi klien-pelayan MCP  
- **Integrasi SIEM**: Pengurusan maklumat dan peristiwa keselamatan berpusat untuk pengesanan anomali  
- **Analitik Tingkah Laku**: Pemantauan berkuasa AI untuk mengesan corak luar biasa dalam tingkah laku sistem dan pengguna  
- **Perisikan Ancaman**: Integrasi suapan ancaman luaran dan indikator kompromi (IOCs)  
- **Respons Insiden**: Prosedur jelas untuk pengesanan, respons dan pemulihan insiden keselamatan  

#### **Seni Bina Zero Trust**  
- **Jangan Percaya, Sentiasa Sahkan**: Pengesahan berterusan pengguna, peranti dan sambungan rangkaian  
- **Mikro-Segmentasi**: Kawalan rangkaian granular yang mengasingkan beban kerja dan perkhidmatan individu  
- **Keselamatan Berasaskan Identiti**: Polisi keselamatan berdasarkan identiti yang disahkan, bukan lokasi rangkaian  
- **Penilaian Risiko Berterusan**: Penilaian kedudukan keselamatan dinamik berdasarkan konteks dan tingkah laku semasa  
- **Akses Bersyarat**: Kawalan akses yang menyesuaikan berdasarkan faktor risiko, lokasi dan kepercayaan peranti  

### Corak Integrasi Perusahaan

#### **Integrasi Ekosistem Keselamatan Microsoft**  
- **Microsoft Defender for Cloud**: Pengurusan kedudukan keselamatan awan menyeluruh  
- **Azure Sentinel**: SIEM dan SOAR asli awan untuk perlindungan beban kerja AI  
- **Microsoft Entra ID**: Pengurusan identiti dan akses perusahaan dengan polisi akses bersyarat  
- **Azure Key Vault**: Pengurusan rahsia berpusat dengan sokongan modul keselamatan perkakasan (HSM)  
- **Microsoft Purview**: Tadbir urus data dan pematuhan untuk sumber data dan aliran kerja AI  

#### **Pematuhan & Tadbir Urus**  
- **Penyesuaian Peraturan**: Pastikan pelaksanaan MCP memenuhi keperluan pematuhan khusus industri (GDPR, HIPAA, SOC 2)  
- **Pengelasan Data**: Kategorisasi dan pengendalian yang betul terhadap data sensitif yang diproses oleh sistem AI  
- **Jejak Audit**: Logging menyeluruh untuk pematuhan pengawalseliaan dan penyiasatan forensik  
- **Kawalan Privasi**: Pelaksanaan prinsip privasi secara reka bentuk dalam seni bina sistem AI  
- **Pengurusan Perubahan**: Proses formal untuk ulasan keselamatan terhadap pengubahsuaian sistem AI  

Amalan asas ini mewujudkan asas keselamatan yang kukuh yang meningkatkan keberkesanan kawalan keselamatan khusus MCP dan menyediakan perlindungan menyeluruh untuk aplikasi berasaskan AI.

## Ringkasan Utama Keselamatan
- **Pendekatan Keselamatan Berlapis**: Menggabungkan amalan keselamatan asas (pengekodan selamat, keistimewaan paling rendah, pengesahan rantaian bekalan, pemantauan berterusan) dengan kawalan khusus AI untuk perlindungan menyeluruh

- **Lanskap Ancaman Khusus AI**: Sistem MCP menghadapi risiko unik termasuk suntikan arahan, keracunan alat, pengambilalihan sesi, masalah pembantu keliru, kelemahan laluan token, dan kebenaran berlebihan yang memerlukan langkah mitigasi khusus

- **Kecemerlangan Pengesahan & Kebenaran**: Melaksanakan pengesahan kukuh menggunakan penyedia identiti luaran (Microsoft Entra ID), menguatkuasakan pengesahan token yang betul, dan tidak pernah menerima token yang tidak dikeluarkan secara nyata untuk pelayan MCP anda

- **Pencegahan Serangan AI**: Melaksanakan Microsoft Prompt Shields dan Azure Content Safety untuk mempertahankan daripada serangan suntikan arahan tidak langsung dan keracunan alat, sambil mengesahkan metadata alat dan memantau perubahan dinamik

- **Keselamatan Sesi & Pengangkutan**: Menggunakan ID sesi yang selamat secara kriptografi dan bukan deterministik yang dikaitkan dengan identiti pengguna, melaksanakan pengurusan kitar hidup sesi yang betul, dan tidak menggunakan sesi untuk pengesahan

- **Amalan Terbaik Keselamatan OAuth**: Mencegah serangan pembantu keliru melalui persetujuan pengguna secara eksplisit untuk klien berdaftar dinamik, pelaksanaan OAuth 2.1 yang betul dengan PKCE, dan pengesahan URI pengalihan yang ketat

- **Prinsip Keselamatan Token**: Elakkan pola anti-laluan token, sahkan tuntutan audiens token, laksanakan token berjangka pendek dengan putaran selamat, dan kekalkan sempadan kepercayaan yang jelas

- **Keselamatan Rantaian Bekalan Menyeluruh**: Melayan semua komponen ekosistem AI (model, embedding, penyedia konteks, API luaran) dengan ketelitian keselamatan yang sama seperti kebergantungan perisian tradisional

- **Evolusi Berterusan**: Kekal terkini dengan spesifikasi MCP yang berkembang pesat, menyumbang kepada standard komuniti keselamatan, dan mengekalkan postur keselamatan adaptif apabila protokol matang

- **Integrasi Keselamatan Microsoft**: Manfaatkan ekosistem keselamatan komprehensif Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) untuk perlindungan terperinci pelaksanaan MCP

## Sumber Menyeluruh

### **Dokumentasi Keselamatan Rasmi MCP**
- [Spesifikasi MCP (Semasa: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Amalan Terbaik Keselamatan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Kebenaran MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositori GitHub MCP](https://github.com/modelcontextprotocol)

### **Sumber Keselamatan OWASP MCP**
- [Panduan Keselamatan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP komprehensif dengan panduan pelaksanaan Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keselamatan rasmi OWASP MCP
- [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Latihan keselamatan praktikal untuk MCP di Azure

### **Standard & Amalan Terbaik Keselamatan**
- [Amalan Terbaik Keselamatan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Keselamatan Aplikasi Web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 untuk Model Bahasa Besar](https://genai.owasp.org/download/43299/?tmstv=1731900559)
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
- [Keselamatan Lanjutan GitHub](https://github.com/security/advanced-security)

### **Panduan Pelaksanaan & Tutorial**
- [Pengurusan API Azure sebagai Pintu Masuk Pengesahan MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Pengesahan Microsoft Entra ID dengan Pelayan MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Penyimpanan Token Selamat dan Penyulitan (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Keselamatan Rantaian Bekalan**
- [Keselamatan Azure DevOps](https://azure.microsoft.com/products/devops)
- [Keselamatan Repos Azure](https://azure.microsoft.com/products/devops/repos/)
- [Perjalanan Keselamatan Rantaian Bekalan Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dokumentasi Keselamatan Tambahan**

Untuk panduan keselamatan menyeluruh, rujuk dokumen khusus berikut dalam bahagian ini:

- **[Amalan Terbaik Keselamatan MCP 2025](./mcp-security-best-practices-2025.md)** - Amalan terbaik keselamatan lengkap untuk pelaksanaan MCP  
- **[Pelaksanaan Azure Content Safety](./azure-content-safety-implementation.md)** - Contoh pelaksanaan praktikal untuk integrasi Azure Content Safety  
- **[Kawalan Keselamatan MCP 2025](./mcp-security-controls-2025.md)** - Kawalan dan teknik keselamatan terkini untuk pelaksanaan MCP  
- **[Rujukan Pantas Amalan Terbaik MCP](./mcp-best-practices.md)** - Panduan rujukan pantas untuk amalan keselamatan MCP penting  
- **[BlueHat 2026: Mengamankan masa depan AI: Mengamankan MCP dengan corak pertahanan berlapis](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Corak pertahanan berlapis dari Microsoft Security Response Center (MSRC)

### **Latihan Keselamatan Praktikal**

- **[Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - Bengkel praktikal menyeluruh untuk mengamankan pelayan MCP di Azure dengan kem kemajuan dari Base Camp ke Summit  
- **[Panduan Keselamatan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Seni bina rujukan dan panduan pelaksanaan untuk semua risiko OWASP MCP Top 10

---

## Apa Seterusnya

Seterusnya: [Bab 3: Bermula](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->