# Amalan Terbaik Keselamatan MCP 2025

Panduan menyeluruh ini menggariskan amalan terbaik keselamatan penting untuk melaksanakan sistem Protokol Konteks Model (MCP) berdasarkan **Spesifikasi MCP 2025-11-25** terkini dan piawaian industri semasa. Amalan ini menangani kedua-dua kebimbangan keselamatan tradisional dan ancaman spesifik AI yang unik untuk penyebaran MCP.

## Keperluan Keselamatan Kritikal

### Kawalan Keselamatan Wajib (Keperluan HARUS)

1. **Pengesahan Token**: Pelayan MCP **TIDAK BOLEH** menerima mana-mana token yang tidak dikeluarkan secara eksplisit untuk pelayan MCP itu sendiri  
2. **Pengesahan Kebenaran**: Pelayan MCP yang melaksanakan kebenaran **HARUS** mengesahkan SEMUA permintaan masuk dan **TIDAK BOLEH** menggunakan sesi untuk pengesahan  
3. **Persetujuan Pengguna**: Pelayan proksi MCP yang menggunakan ID klien statik **HARUS** mendapatkan persetujuan pengguna secara eksplisit untuk setiap klien yang didaftarkan secara dinamik  
4. **ID Sesi Selamat**: Pelayan MCP **HARUS** menggunakan ID sesi yang selamat secara kriptografi dan tidak deterministik yang dijana menggunakan penjana nombor rawak yang selamat  

## Amalan Keselamatan Teras

### 1. Pengesahan & Penulenan Input
- **Pengesahan Input Menyeluruh**: Sahkan dan bersihkan semua input untuk mencegah serangan suntikan, masalah deputi keliru, dan kelemahan suntikan arahan  
- **Penguatkuasaan Skema Parameter**: Laksanakan pengesahan skema JSON yang ketat untuk semua parameter alat dan input API  
- **Penapisan Kandungan**: Gunakan Microsoft Prompt Shields dan Azure Content Safety untuk menapis kandungan berniat jahat dalam arahan dan maklum balas  
- **Penulenan Output**: Sahkan dan bersihkan semua output model sebelum dipersembahkan kepada pengguna atau sistem hiliran  

### 2. Kecemerlangan Pengesahan & Kebenaran  
- **Pembekal Identiti Luaran**: Serahkan pengesahan kepada pembekal identiti yang mapan (Microsoft Entra ID, pembekal OAuth 2.1) dan bukannya melaksanakan pengesahan khusus  
- **Kebenaran Halus**: Laksanakan kebenaran terperinci mengikut alat mengikuti prinsip keistimewaan paling minimum  
- **Pengurusan Kitaran Hayat Token**: Gunakan token capaian jangka pendek dengan putaran selamat dan pengesahan audiens yang betul  
- **Pengesahan Faktor Berganda**: Perlukan MFA untuk semua akses pentadbiran dan operasi sensitif  

### 3. Protokol Komunikasi Selamat
- **Keselamatan Lapisan Pengangkutan**: Gunakan HTTPS/TLS 1.3 untuk semua komunikasi MCP dengan pengesahan sijil yang betul  
- **Penyulitan Dari Hujung ke Hujung**: Laksanakan lapisan penyulitan tambahan untuk data yang sangat sensitif dalam perjalanan dan ketika disimpan  
- **Pengurusan Sijil**: Kekalkan pengurusan kitaran hayat sijil yang betul dengan proses pembaharuan automatik  
- **Penguatkuasaan Versi Protokol**: Gunakan versi protokol MCP terkini (2025-11-25) dengan rundingan versi yang betul.  

### 4. Penghadang Kadar & Perlindungan Sumber Tingkat Lanjut
- **Penghadang Kadar Berlapis**: Laksanakan penghadang kadar pada peringkat pengguna, sesi, alat, dan sumber untuk mencegah penyalahgunaan  
- **Penghadang Kadar Adaptif**: Gunakan penghadang kadar berasaskan pembelajaran mesin yang menyesuaikan dengan corak penggunaan dan penunjuk ancaman  
- **Pengurusan Kuota Sumber**: Tetapkan had yang sesuai untuk sumber pengiraan, penggunaan memori, dan masa pelaksanaan  
- **Perlindungan DDoS**: Gunakan perlindungan DDoS menyeluruh dan sistem analisis trafik  

### 5. Log & Pemantauan Menyeluruh
- **Log Audit Berstruktur**: Laksanakan log terperinci dan boleh dicari untuk semua operasi MCP, pelaksanaan alat, dan acara keselamatan  
- **Pemantauan Keselamatan Masa Nyata**: Gunakan sistem SIEM dengan pengesanan anomali bertenaga AI untuk beban kerja MCP  
- **Logging Mematuhi Privasi**: Logkan acara keselamatan sambil menghormati keperluan dan peraturan privasi data  
- **Integrasi Respons Insiden**: Sambungkan sistem log dengan aliran kerja respons insiden automatik  

### 6. Amalan Penyimpanan Selamat Ditingkatkan
- **Modul Keselamatan Perkakasan**: Gunakan penyimpanan kunci yang disokong HSM (Azure Key Vault, AWS CloudHSM) untuk operasi kriptografi penting  
- **Pengurusan Kunci Penyulitan**: Laksanakan putaran kunci, pengasingan, dan kawalan akses yang betul untuk kunci penyulitan  
- **Pengurusan Rahsia**: Simpan semua kunci API, token, dan kelayakan dalam sistem pengurusan rahsia khas  
- **Klasifikasi Data**: Klasifikasikan data berdasarkan tahap kepekaan dan gunakan langkah perlindungan yang sesuai  

### 7. Pengurusan Token Lanjutan
- **Pencegahan Penyaluran Token**: Larang secara jelas corak penyaluran token yang mengelakkan kawalan keselamatan  
- **Pengesahan Audiens**: Sentiasa sahkan tuntutan audiens token sepadan dengan identiti pelayan MCP yang dimaksudkan  
- **Kebenaran Berdasarkan Tuntutan**: Laksanakan kebenaran terperinci berdasarkan tuntutan token dan atribut pengguna  
- **Pengikatan Token**: Ikat token kepada sesi, pengguna, atau peranti tertentu apabila sesuai  

### 8. Pengurusan Sesi Selamat
- **ID Sesi Kriptografi**: Jana ID sesi menggunakan penjana nombor rawak yang selamat secara kriptografi (bukan urutan boleh diramal)  
- **Pengikatan Khusus Pengguna**: Ikat ID sesi kepada maklumat khusus pengguna menggunakan format selamat seperti `<user_id>:<session_id>`  
- **Kawalan Kitaran Hayat Sesi**: Laksanakan mekanisma tamat tempoh, putaran, dan pembatalan sesi yang betul  
- **Header Keselamatan Sesi**: Gunakan header keselamatan HTTP yang sesuai untuk perlindungan sesi  

### 9. Kawalan Keselamatan Spesifik AI
- **Pertahanan Suntikan Arahan**: Gunakan Microsoft Prompt Shields dengan teknik spotlighting, delimiter, dan datamarking  
- **Pencegahan Keracunan Alat**: Sahkan metadata alat, pantau perubahan dinamik, dan sahkan integriti alat  
- **Pengesahan Output Model**: Imbas output model untuk kebocoran data, kandungan berbahaya, atau pelanggaran dasar keselamatan  
- **Perlindungan Tingkap Konteks**: Laksanakan kawalan untuk mencegah keracunan dan serangan manipulasi tingkap konteks  

### 10. Keselamatan Pelaksanaan Alat
- **Pengasingan Pelaksanaan**: Jalankan pelaksanaan alat dalam persekitaran kontena terasing dengan had sumber  
- **Pemisahan Keistimewaan**: Laksanakan alat dengan keistimewaan minimum yang diperlukan dan akaun perkhidmatan berasingan  
- **Pengasingan Rangkaian**: Laksanakan segmentasi rangkaian untuk persekitaran pelaksanaan alat  
- **Pemantauan Pelaksanaan**: Pantau pelaksanaan alat untuk tingkah laku luar biasa, penggunaan sumber, dan pelanggaran keselamatan  

### 11. Pengesahan Keselamatan Berterusan
- **Ujian Keselamatan Automatik**: Integrasikan ujian keselamatan ke dalam saluran CI/CD dengan alat seperti GitHub Advanced Security  
- **Pengurusan Kerentanan**: Imbas secara berkala semua pergantungan, termasuk model AI dan perkhidmatan luaran  
- **Ujian Penembusan**: Jalankan penilaian keselamatan secara berkala yang khusus menumpukan pada pelaksanaan MCP  
- **Ulasan Kod Keselamatan**: Laksanakan kajian keselamatan mandatori untuk semua perubahan kod berkaitan MCP  

### 12. Keselamatan Rantaian Bekalan untuk AI
- **Pengesahan Komponen**: Sahkan asal usul, integriti, dan keselamatan semua komponen AI (model, embedding, API)  
- **Pengurusan Pergantungan**: Kekalkan inventori terkini semua perisian dan pergantungan AI dengan penjejakan kerentanan  
- **Repositori Dipercayai**: Gunakan sumber yang disahkan dan dipercayai untuk semua model AI, perpustakaan, dan alat  
- **Pemantauan Rantaian Bekalan**: Pantau secara berterusan untuk kompromi dalam pembekal perkhidmatan AI dan repositori model  

## Corak Keselamatan Tingkat Lanjut

### Seni Bina Zero Trust untuk MCP
- **Jangan Pernah Percaya, Sentiasa Sahkan**: Laksanakan pengesahan berterusan untuk semua peserta MCP  
- **Mikropisahsegmen**: Asingkan komponen MCP dengan kawalan rangkaian dan identiti yang terperinci  
- **Akses Bersyarat**: Laksanakan kawalan akses berasaskan risiko yang menyesuaikan dengan konteks dan tingkah laku  
- **Penilaian Risiko Berterusan**: Nilai secara dinamik postur keselamatan berdasarkan penunjuk ancaman semasa  

### Pelaksanaan AI Menjaga Privasi
- **Pemusatan Data**: Dedahkan hanya data minimum yang diperlukan untuk setiap operasi MCP  
- **Privasi Diferensial**: Laksanakan teknik pemeliharaan privasi untuk pemprosesan data sensitif  
- **Penyulitan Homomorfik**: Gunakan teknik penyulitan canggih untuk pengiraan selamat ke atas data yang disulitkan  
- **Pembelajaran Föderasi**: Laksanakan pendekatan pembelajaran teragih yang mengekalkan lokaliti dan privasi data  

### Respons Insiden untuk Sistem AI
- **Prosedur Insiden Spesifik AI**: Bangunkan prosedur respons insiden yang khusus untuk ancaman AI dan MCP  
- **Respons Automatik**: Laksanakan pengawalan dan pembetulan automatik untuk insiden keselamatan AI biasa  
- **Keupayaan Forensik**: Kekalkan kesiapsiagaan forensik untuk kompromi sistem AI dan kebocoran data  
- **Prosedur Pemulihan**: Tetapkan prosedur untuk pemulihan daripada keracunan model AI, serangan suntikan arahan, dan kompromi perkhidmatan  

## Sumber & Piawaian Pelaksanaan

### 🏔️ Latihan Keselamatan Praktikal
- **[Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - Bengkel praktikal menyeluruh untuk mengamankan pelayan MCP dalam Azure  
- **[Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Seni bina rujukan dan panduan pelaksanaan OWASP MCP Top 10  

### Dokumentasi Rasmi MCP
- [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Spesifikasi protokol MCP semasa  
- [Amalan Terbaik Keselamatan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Panduan keselamatan rasmi  
- [Spesifikasi Kebenaran MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Corak pengesahan dan kebenaran  
- [Keselamatan Pengangkutan MCP](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Keperluan keselamatan lapisan pengangkutan  

### Penyelesaian Keselamatan Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Perlindungan suntikan arahan maju  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Penapisan kandungan AI menyeluruh  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Pengurusan identiti dan akses perusahaan  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Pengurusan rahsia dan kelayakan yang selamat  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Imbasan keselamatan kod dan rantaian bekalan  

### Piawaian & Rangka Kerja Keselamatan
- [Amalan Terbaik Keselamatan OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Panduan keselamatan OAuth semasa  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Risiko keselamatan aplikasi web  
- [OWASP Top 10 untuk LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Risiko keselamatan khusus AI  
- [Rangka Kerja Pengurusan Risiko AI NIST](https://www.nist.gov/itl/ai-risk-management-framework) - Pengurusan risiko AI menyeluruh  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Sistem pengurusan keselamatan maklumat  

### Panduan & Tutorial Pelaksanaan
- [Pengurusan API Azure sebagai Gerbang Autentikasi MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Corak pengesahan perusahaan  
- [Microsoft Entra ID dengan Pelayan MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integrasi pembekal identiti  
- [Pelaksanaan Penyimpanan Token Selamat](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Amalan terbaik pengurusan token  
- [Penyulitan Dari Hujung ke Hujung untuk AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Corak penyulitan maju  

### Sumber Keselamatan Tingkat Lanjut
- [Kitaran Hayat Pembangunan Keselamatan Microsoft](https://www.microsoft.com/sdl) - Amalan pembangunan selamat  
- [Panduan Pasukan Merah AI](https://learn.microsoft.com/security/ai-red-team/) - Ujian keselamatan khusus AI  
- [Pemodelan Ancaman untuk Sistem AI](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodologi pemodelan ancaman AI  
- [Kejuruteraan Privasi untuk AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Teknik pemeliharaan privasi AI  

### Pemenuhan & Tadbir Urus
- [Pemenuhan GDPR untuk AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Pemenuhan privasi dalam sistem AI  
- [Rangka Kerja Tadbir Urus AI](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Pelaksanaan AI yang bertanggungjawab  
- [SOC 2 untuk Perkhidmatan AI](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Kawalan keselamatan untuk pembekal perkhidmatan AI  
- [Pemenuhan HIPAA untuk AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Keperluan pematuhan AI penjagaan kesihatan  

### DevSecOps & Automasi
- [Saluran DevSecOps untuk AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Saluran pembangunan AI selamat  
- [Ujian Keselamatan Automatik](https://learn.microsoft.com/security/engineering/devsecops) - Pengesahan keselamatan berterusan  
- [Keselamatan Infrastruktur sebagai Kod](https://learn.microsoft.com/security/engineering/infrastructure-security) - Pelaksanaan infrastruktur selamat  
- [Keselamatan Kontena untuk AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Keselamatan kontena beban kerja AI  

### Pemantauan & Respons Insiden  
- [Pemantauan Azure untuk Beban Kerja AI](https://learn.microsoft.com/azure/azure-monitor/overview) - Penyelesaian pemantauan menyeluruh  
- [Respons Insiden Keselamatan AI](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Prosedur insiden khusus AI  
- [SIEM untuk Sistem AI](https://learn.microsoft.com/azure/sentinel/overview) - Pengurusan maklumat dan acara keselamatan  
- [Perisikan Ancaman untuk AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Sumber perisikan ancaman AI  

## 🔄 Penambahbaikan Berterusan

### Sentiasa Kemaskini dengan Piawaian Berkembang
- **Kemas Kini Spesifikasi MCP**: Pantau perubahan spesifikasi MCP rasmi dan nasihat keselamatan  
- **Perisikan Ancaman**: Langgan suapan ancaman keselamatan AI dan pangkalan data kerentanan  
- **Penglibatan Komuniti**: Sertai perbincangan komuniti keselamatan MCP dan kumpulan kerja  
- **Penilaian Berkala**: Lakukan penilaian sikap keselamatan suku tahunan dan kemas kini amalan mengikut keperluan  

### Menyumbang kepada Keselamatan MCP  
- **Penyelidikan Keselamatan**: Menyumbang kepada penyelidikan keselamatan MCP dan program pendedahan kerentanan  
- **Perkongsian Amalan Terbaik**: Berkongsi pelaksanaan keselamatan dan pengajaran yang diperoleh dengan komuniti  
- **Pembangunan Standard**: Menyertai pembangunan spesifikasi MCP dan penciptaan standard keselamatan  
- **Pembangunan Alat**: Membangun dan berkongsi alat serta perpustakaan keselamatan untuk ekosistem MCP  

---

*Dokumen ini mencerminkan amalan terbaik keselamatan MCP sehingga 18 Disember 2025, berdasarkan Spesifikasi MCP 2025-11-25. Amalan keselamatan perlu disemak dan dikemas kini secara berkala selaras dengan perubahan protokol dan landskap ancaman.*  

## Apa Seterusnya  

- Baca: [Amalan Terbaik Keselamatan MCP 2025](./mcp-security-best-practices-2025.md)  
- Kembali ke: [Gambaran Keseluruhan Modul Keselamatan](./README.md)  
- Teruskan ke: [Modul 3: Mula Meneroka](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk mencapai ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh penterjemah manusia profesional adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->