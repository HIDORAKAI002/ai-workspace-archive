# Amalan Terbaik Keselamatan MCP - Kemaskini Februari 2026

> **Penting**: Dokumen ini mencerminkan keperluan keselamatan terkini [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) dan [Amalan Terbaik Keselamatan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) rasmi. Sentiasa rujuk spesifikasi semasa untuk panduan terkini.

## 🏔️ Latihan Keselamatan Praktikal

Untuk pengalaman pelaksanaan praktikal, kami mengesyorkan **[Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - ekspedisi berpandu yang komprehensif untuk mengamankan pelayan MCP di Azure. Bengkel ini merangkumi semua risiko OWASP MCP Top 10 melalui metodologi "rentan → eksploit → baiki → sahkan".

Semua amalan dalam dokumen ini seiring dengan **[Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** untuk panduan pelaksanaan khusus Azure.

## Amalan Keselamatan Penting untuk Pelaksanaan MCP

Model Context Protocol memperkenalkan cabaran keselamatan unik yang melangkaui keselamatan perisian tradisional. Amalan ini menangani keperluan keselamatan asas dan ancaman khusus MCP termasuk suntikan arahan, pencemaran alat, rampasan sesi, masalah pertukaran identiti, dan kelemahan token passthrough.

### **Keperluan Keselamatan WAJIB**

**Keperluan Kritikal dari Spesifikasi MCP:**

### **Keperluan Keselamatan WAJIB**

**Keperluan Kritikal dari Spesifikasi MCP:**

> **TIDAK BOLEH**: Pelayan MCP **TIDAK BOLEH** menerima mana-mana token yang tidak dikeluarkan secara eksplisit untuk pelayan MCP
> 
> **PERLU**: Pelayan MCP yang melaksanakan kebenaran **PERLU** mengesahkan SEMUA permintaan masuk
>  
> **TIDAK BOLEH**: Pelayan MCP **TIDAK BOLEH** menggunakan sesi untuk pengesahan
>
> **PERLU**: Pelayan proksi MCP yang menggunakan ID klien statik **PERLU** mendapatkan persetujuan pengguna bagi setiap klien yang didaftarkan secara dinamik

---

## 1. **Keselamatan Token & Pengesahan**

**Kawalan Pengesahan & Kebenaran:**
   - **Semakan Kebenaran Teliti**: Jalankan audit menyeluruh pada logik kebenaran pelayan MCP untuk memastikan hanya pengguna dan klien yang bertujuan sahaja dapat mengakses sumber
   - **Integrasi Penyedia Identiti Luaran**: Gunakan penyedia identiti yang telah mantap seperti Microsoft Entra ID dan bukan melaksanakan pengesahan tersuai
   - **Pengesahan Audiens Token**: Sentiasa sahkan bahawa token dikeluarkan secara eksplisit untuk pelayan MCP anda - jangan terima token huluan
   - **Kitar Hayat Token Yang Betul**: Laksanakan putaran token yang selamat, polisi tamat tempoh, dan cegah serangan ulang token

**Penyimpanan Token Terlindung:**
   - Gunakan Azure Key Vault atau kedai kelayakan selamat yang serupa untuk semua rahsia
   - Laksanakan penyulitan untuk token semasa simpanan dan penghantaran
   - Rotasi kelayakan berkala dan pemantauan untuk akses tanpa kebenaran

## 2. **Pengurusan Sesi & Keselamatan Penghantaran**

**Amalan Sesi Selamat:**
   - **ID Sesi yang Kriptografi Selamat**: Gunakan ID sesi selamat tanpa ketentuan yang dijana dengan penjana nombor rawak yang selamat
   - **Pengikatan Khusus Pengguna**: Ikat ID sesi kepada identiti pengguna menggunakan format seperti `<user_id>:<session_id>` untuk mengelakkan penyalahgunaan sesi silang pengguna
   - **Pengurusan Kitar Hayat Sesi**: Laksanakan tamat tempoh, putaran, dan pembatalan yang betul untuk mengehadkan tempoh kerentanan
   - **Penguatkuasaan HTTPS/TLS**: HTTPS wajib untuk semua komunikasi bagi menghalang penyadapan ID sesi

**Keselamatan Lapisan Pengangkutan:**
   - Konfigurasikan TLS 1.3 di mana boleh dengan pengurusan sijil yang betul
   - Laksanakan pinning sijil untuk sambungan kritikal
   - Rotasi sijil secara berkala dan pengesahan kesahihan

## 3. **Perlindungan Ancaman Khusus AI** 🤖

**Pertahanan Suntikan Arahan:**
   - **Microsoft Prompt Shields**: Gunakan AI Prompt Shields untuk pengesanan dan penapisan lanjutan terhadap arahan berniat jahat
   - **Sanitasi Input**: Sahkan dan bersihkan semua input untuk mencegah serangan suntikan dan masalah pertukaran identiti
   - **Sempadan Kandungan**: Gunakan sistem delimiter dan penandaan data untuk membezakan antara arahan yang dipercayai dan kandungan luaran

**Pencegahan Pencemaran Alat:**
   - **Pengesahan Metadata Alat**: Laksanakan pemeriksaan integriti untuk definisi alat dan pantau perubahan yang tidak dijangka
   - **Pemantauan Alat Dinamik**: Pantau tingkah laku runtime dan sediakan amaran untuk corak pelaksanaan yang tidak dijangka
   - **Aliran Kerja Kelulusan**: Memerlukan kelulusan pengguna secara jelas untuk pengubahsuaian alat dan perubahan keupayaan

## 4. **Kawalan Akses & Kebenaran**

**Prinsip Privilege Paling Rendah:**
   - Berikan pelayan MCP hanya kebenaran minimum yang diperlukan untuk fungsi bertujuan
   - Laksanakan kawalan akses berasaskan peranan (RBAC) dengan kebenaran terperinci
   - Semakan kebenaran secara berkala dan pemantauan berterusan untuk peningkatan keistimewaan

**Kawalan Kebenaran Runtime:**
   - Terapkan had sumber untuk mengelakkan serangan kehabisan sumber
   - Gunakan pengasingan kontena untuk persekitaran pelaksanaan alat  
   - Laksanakan akses just-in-time untuk fungsi pentadbiran

## 5. **Keselamatan Kandungan & Pemantauan**

**Pelaksanaan Keselamatan Kandungan:**
   - **Integrasi Azure Content Safety**: Gunakan Azure Content Safety untuk mengesan kandungan berbahaya, cubaan jailbreak, dan pelanggaran polisi
   - **Analisis Tingkah Laku**: Laksanakan pemantauan tingkah laku runtime untuk mengesan anomali dalam pelayan MCP dan pelaksanaan alat
   - **Log Lengkap**: Catat semua percubaan pengesahan, panggilan alat, dan acara keselamatan dengan penyimpanan yang selamat dan tahan gangguan

**Pemantauan Berterusan:**
   - Amaran masa nyata untuk corak mencurigakan dan cubaan akses tanpa kebenaran  
   - Integrasi dengan sistem SIEM untuk pengurusan acara keselamatan berpusat
   - Audit keselamatan berkala dan ujian penembusan pelaksanaan MCP

## 6. **Keselamatan Rantaian Bekalan**

**Pengesahan Komponen:**
   - **Imbasan Kebergantungan**: Gunakan pengimbasan kelemahan automatik untuk semua kebergantungan perisian dan komponen AI
   - **Pengesahan Asal Usul**: Sahkan asal, pelesenan, dan integriti model, sumber data, dan perkhidmatan luaran
   - **Pakej Ditandatangani**: Gunakan pakej bertandatangan kriptografi dan sahkan tandatangan sebelum dikerahkan

**Saluran Pembangunan Selamat:**
   - **Keselamatan Lanjutan GitHub**: Laksanakan pengimbasan rahsia, analisis kebergantungan, dan analisis statik CodeQL
   - **Keselamatan CI/CD**: Integrasi pengesahan keselamatan sepanjang saluran penghantaran automatik
   - **Integriti Artifak**: Laksanakan pengesahan kriptografi untuk artifak dan konfigurasi yang dikerahkan

## 7. **Keselamatan OAuth & Pencegahan Pertukaran Identiti**

**Pelaksanaan OAuth 2.1:**
   - **Pelaksanaan PKCE**: Gunakan Bukti Kunci untuk Pertukaran Kod (PKCE) untuk semua permintaan kebenaran
   - **Persetujuan Jelas**: Dapatkan persetujuan pengguna untuk setiap klien yang didaftarkan secara dinamik bagi mencegah serangan pertukaran identiti
   - **Pengesahan URI Redirect**: Laksanakan pengesahan ketat bagi URI redirect dan penentu klien

**Keselamatan Proksi:**
   - Cegah pencerobohan kebenaran melalui eksploitasi ID klien statik
   - Laksanakan aliran kerja persetujuan yang betul untuk akses API pihak ketiga
   - Pantau pencurian kod kebenaran dan akses API tanpa kebenaran

## 8. **Respons Insiden & Pemulihan**

**Keupayaan Respons Cepat:**
   - **Respons Automatik**: Laksanakan sistem automatik untuk putaran kelayakan dan pengawalan ancaman
   - **Prosedur Rollback**: Keupayaan untuk segera kembali kepada konfigurasi dan komponen yang diketahui selamat
   - **Keupayaan Forensik**: Jejak audit terperinci dan log untuk penyiasatan insiden

**Komunikasi & Penyelarasan:**
   - Prosedur eskalasi yang jelas untuk insiden keselamatan
   - Integrasi dengan pasukan respons insiden organisasi
   - Simulasi insiden keselamatan dan latihan meja secara berkala

## 9. **Pematuhan & Tadbir Urus**

**Pematuhan Peraturan:**
   - Pastikan pelaksanaan MCP memenuhi keperluan industri khusus (GDPR, HIPAA, SOC 2)
   - Laksanakan klasifikasi data dan kawalan privasi untuk pemprosesan data AI
   - Kekalkan dokumentasi lengkap untuk audit pematuhan

**Pengurusan Perubahan:**
   - Proses semakan keselamatan rasmi untuk semua pengubahsuaian sistem MCP
   - Kawalan versi dan aliran kerja kelulusan untuk perubahan konfigurasi
   - Penilaian pematuhan berkala dan analisis jurang

## 10. **Kawalan Keselamatan Lanjutan**

**Seni Bina Zero Trust:**
   - **Jangan Pernah Percaya, Sentiasa Sahkan**: Pengesahan berterusan pengguna, peranti, dan sambungan
   - **Mikro-segmentasi**: Kawalan rangkaian terperinci yang mengasingkan komponen MCP individu
   - **Akses Bersyarat**: Kawalan akses berasaskan risiko yang menyesuaikan kepada konteks dan tingkah laku semasa

**Perlindungan Aplikasi Runtime:**
   - **Perlindungan Kendiri Aplikasi Runtime (RASP)**: Terapkan teknik RASP untuk pengesanan ancaman masa nyata
   - **Pemantauan Prestasi Aplikasi**: Pantau anomali prestasi yang mungkin menunjukkan serangan
   - **Polisi Keselamatan Dinamik**: Laksanakan polisi keselamatan yang menyesuaikan berdasarkan landskap ancaman semasa

## 11. **Integrasi Ekosistem Keselamatan Microsoft**

**Keselamatan Microsoft Menyeluruh:**
   - **Microsoft Defender untuk Cloud**: Pengurusan postur keselamatan awan untuk beban kerja MCP
   - **Azure Sentinel**: Keupayaan SIEM dan SOAR asli awan untuk pengesanan ancaman lanjutan
   - **Microsoft Purview**: Tadbir urus data dan pematuhan untuk aliran kerja AI dan sumber data

**Pengurusan Identiti & Akses:**
   - **Microsoft Entra ID**: Pengurusan identiti perusahaan dengan polisi akses bersyarat
   - **Pengurusan Identiti Privileged (PIM)**: Akses just-in-time dan aliran kerja kelulusan untuk fungsi pentadbiran
   - **Perlindungan Identiti**: Akses bersyarat berasaskan risiko dan respons ancaman automatik

## 12. **Evolusi Keselamatan Berterusan**

**Sentiasa Terkini:**
   - **Pemantauan Spesifikasi**: Semakan berkala terhadap kemas kini spesifikasi MCP dan perubahan panduan keselamatan
   - **Perisikan Ancaman**: Integrasi suapan ancaman khusus AI dan penunjuk kompromi
   - **Penglibatan Komuniti Keselamatan**: Penyertaan aktif dalam komuniti keselamatan MCP dan program pendedahan kelemahan

**Keselamatan Adaptif:**
   - **Keselamatan Pembelajaran Mesin**: Gunakan pengesanan anomali berasaskan ML untuk mengenal pasti corak serangan baru
   - **Analitik Keselamatan Ramalan**: Laksanakan model ramalan untuk pengenalpastian ancaman proaktif
   - **Automasi Keselamatan**: Kemas kini polisi keselamatan automatik berdasarkan perisikan ancaman dan perubahan spesifikasi

---

## **Sumber Keselamatan Kritikal**

### **Dokumentasi Rasmi MCP**
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Amalan Terbaik Keselamatan MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spesifikasi Kebenaran MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Sumber Keselamatan OWASP MCP**
- [Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 komprehensif dengan pelaksanaan Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risiko keselamatan rasmi OWASP MCP
- [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Latihan keselamatan praktikal untuk MCP di Azure

### **Penyelesaian Keselamatan Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Keselamatan Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Keselamatan Lanjutan GitHub](https://github.com/security/advanced-security)

### **Standard Keselamatan**
- [Amalan Terbaik Keselamatan OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 untuk Model Bahasa Besar](https://genai.owasp.org/)
- [Rangka Kerja Pengurusan Risiko AI NIST](https://www.nist.gov/itl/ai-risk-management-framework)

### **Panduan Pelaksanaan**
- [Gerbang Pengesahan MCP Azure API Management](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID dengan Pelayan MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Notis Keselamatan**: Amalan keselamatan MCP berkembang dengan pesat. Sentiasa sahkan dengan [spesifikasi MCP](https://spec.modelcontextprotocol.io/) semasa dan [dokumentasi keselamatan rasmi](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) sebelum pelaksanaan.

## Apa Seterusnya

- Baca: [Kawalan Keselamatan MCP 2025](./mcp-security-controls-2025.md)
- Kembali ke: [Gambaran Keseluruhan Modul Keselamatan](./README.md)
- Teruskan ke: [Modul 3: Bermula](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau tafsiran yang salah yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->