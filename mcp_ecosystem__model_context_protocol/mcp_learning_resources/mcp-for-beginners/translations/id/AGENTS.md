# AGENTS.md

## Gambaran Proyek

**MCP untuk Pemula** adalah kurikulum pendidikan sumber terbuka untuk mempelajari Model Context Protocol (MCP) - sebuah kerangka standar untuk interaksi antara model AI dan aplikasi klien. Repositori ini menyediakan materi pembelajaran komprehensif dengan contoh kode praktik dalam berbagai bahasa pemrograman.

### Teknologi Kunci

- **Bahasa Pemrograman**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Framework & SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Database**: PostgreSQL dengan ekstensi pgvector
- **Platform Cloud**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Alat Build**: npm, Maven, pip, Cargo
- **Dokumentasi**: Markdown dengan terjemahan otomatis multi-bahasa (48+ bahasa)

### Arsitektur

- **11 Modul Inti (00-11)**: Jalur pembelajaran berurutan dari dasar hingga topik lanjutan
- **Lab Praktik**: Latihan praktis dengan kode solusi lengkap dalam berbagai bahasa
- **Proyek Contoh**: Implementasi server dan klien MCP yang berfungsi
- **Sistem Terjemahan**: Workflow GitHub Actions otomatis untuk dukungan multi-bahasa
- **Aset Gambar**: Direktori gambar terpusat dengan versi terjemahan

## Perintah Setup

Ini adalah repositori yang berfokus pada dokumentasi. Sebagian besar setup terjadi dalam proyek contoh dan lab individual.

### Setup Repositori

```bash
# Gandakan repositori
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Bekerja dengan Proyek Contoh

Proyek contoh terletak di:
- `03-GettingStarted/samples/` - Contoh spesifik bahasa
- `03-GettingStarted/01-first-server/solution/` - Implementasi server pertama
- `03-GettingStarted/02-client/solution/` - Implementasi klien
- `11-MCPServerHandsOnLabs/` - Lab integrasi database komprehensif

Setiap proyek contoh memiliki instruksi setup sendiri:

#### Proyek TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Proyek Python
```bash
cd <project-directory>
pip install -r requirements.txt
# atau
pip install -e .
python main.py
```

#### Proyek Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Alur Kerja Pengembangan

### Struktur Dokumentasi

- **Modul 00-11**: Konten kurikulum inti berurutan
- **translations/**: Versi bahasa spesifik (otomatis dibuat, jangan diedit langsung)
- **translated_images/**: Versi gambar yang sudah dilokalkan (otomatis dibuat)
- **images/**: Gambar dan diagram sumber

### Membuat Perubahan Dokumentasi

1. Edit hanya file markdown Inggris di direktori modul utama (00-11)
2. Perbarui gambar di direktori `images/` jika diperlukan
3. GitHub Action co-op-translator akan membuat terjemahan secara otomatis
4. Terjemahan dihasilkan ulang saat push ke cabang main

### Bekerja dengan Terjemahan

- **Terjemahan Otomatis**: Workflow GitHub Actions menangani semua terjemahan
- **Jangan edit manual** file di direktori `translations/`
- Metadata terjemahan disematkan dalam setiap file terjemahan
- Bahasa didukung: 48+ bahasa termasuk Arab, Cina, Perancis, Jerman, Hindi, Jepang, Korea, Portugis, Rusia, Spanyol, dan banyak lagi

## Instruksi Pengujian

### Validasi Dokumentasi

Karena ini terutama repositori dokumentasi, pengujian fokus pada:

1. **Validasi Tautan**: Pastikan semua tautan internal berfungsi
```bash
# Periksa tautan markdown yang rusak
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validasi Contoh Kode**: Uji agar contoh kode dapat dikompilasi/dijalankan
```bash
# Navigasikan ke sampel tertentu dan jalankan pengujiannya
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linting Markdown**: Periksa konsistensi format
```bash
# Gunakan markdownlint jika diperlukan
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Pengujian Proyek Contoh

Setiap sampel khusus bahasa memiliki pendekatan pengujian tersendiri:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Pedoman Gaya Kode

### Gaya Dokumentasi

- Gunakan bahasa yang jelas dan ramah pemula
- Sertakan contoh kode dalam berbagai bahasa bila memungkinkan
- Ikuti praktik terbaik markdown:
  - Gunakan header gaya ATX (`#` syntax)
  - Gunakan blok kode berpagar dengan pengenal bahasa
  - Tambahkan teks alt deskriptif untuk gambar
  - Jaga panjang baris wajar (tidak ada batas keras, tapi masuk akal)

### Gaya Contoh Kode

#### TypeScript/JavaScript
- Gunakan modul ES (`import`/`export`)
- Ikuti konvensi mode ketat TypeScript
- Sertakan anotasi tipe
- Target ES2022

#### Python
- Ikuti panduan gaya PEP 8
- Gunakan petunjuk tipe bila sesuai
- Sertakan docstring untuk fungsi dan kelas
- Gunakan fitur Python modern (3.8+)

#### Java
- Ikuti konvensi Spring Boot
- Gunakan fitur Java 21
- Ikuti struktur proyek Maven standar
- Sertakan komentar Javadoc

### Organisasi Berkas

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Build dan Deployment

### Deployment Dokumentasi

Repositori menggunakan GitHub Pages atau sejenis untuk hosting dokumentasi (jika berlaku). Perubahan ke cabang utama akan memicu:

1. Workflow terjemahan (`.github/workflows/co-op-translator.yml`)
2. Terjemahan otomatis semua file markdown berbahasa Inggris
3. Lokalisasi gambar jika diperlukan

### Tidak Ada Proses Build yang Diperlukan

Repositori ini terutama berisi dokumentasi markdown. Tidak diperlukan langkah kompilasi atau build untuk konten kurikulum inti.

### Deployment Proyek Contoh

Proyek contoh individual mungkin memiliki instruksi deployment:
- Lihat `03-GettingStarted/09-deployment/` untuk panduan deployment server MCP
- Contoh deployment Azure Container Apps di `11-MCPServerHandsOnLabs/`

## Pedoman Kontribusi

### Proses Pull Request

1. **Fork dan Clone**: Fork repositori dan clone fork Anda secara lokal
2. **Buat Cabang**: Gunakan nama cabang deskriptif (misal, `fix/typo-module-3`, `add/python-example`)
3. **Buat Perubahan**: Edit hanya file markdown bahasa Inggris (tidak terjemahan)
4. **Uji Secara Lokal**: Pastikan markdown terlihat benar
5. **Kirim PR**: Gunakan judul dan deskripsi PR yang jelas
6. **CLA**: Tanda tangani Microsoft Contributor License Agreement saat diminta

### Format Judul PR

Gunakan judul yang jelas dan deskriptif:
- `[Module XX] Deskripsi singkat` untuk perubahan modul spesifik
- `[Samples] Deskripsi` untuk perubahan contoh kode
- `[Docs] Deskripsi` untuk pembaruan dokumentasi umum

### Apa yang Harus Dikontribusikan

- Perbaikan bug pada dokumentasi atau contoh kode
- Contoh kode baru dalam bahasa tambahan
- Klarifikasi dan perbaikan konten yang ada
- Studi kasus baru atau contoh praktis
- Laporan masalah untuk konten yang tidak jelas atau salah

### Apa yang Tidak Boleh Dilakukan

- Jangan langsung edit file di direktori `translations/`
- Jangan edit direktori `translated_images/`
- Jangan tambahkan berkas biner besar tanpa diskusi
- Jangan ubah file workflow terjemahan tanpa koordinasi

## Catatan Tambahan

### Pemeliharaan Repositori

- **Changelog**: Semua perubahan signifikan didokumentasikan di `changelog.md`
- **Panduan Studi**: Gunakan `study_guide.md` untuk gambaran navigasi kurikulum
- **Template Isu**: Gunakan template isu GitHub untuk laporan bug dan permintaan fitur
- **Kode Etik**: Semua kontributor harus mengikuti Microsoft Open Source Code of Conduct

### Jalur Pembelajaran

Ikuti modul secara berurutan (00-11) untuk pembelajaran optimal:
1. **00-02**: Dasar (Pengantar, Konsep Inti, Keamanan)
2. **03**: Memulai dengan implementasi langsung
3. **04-05**: Implementasi praktis dan topik lanjutan
4. **06-10**: Komunitas, praktik terbaik, dan aplikasi dunia nyata
5. **11**: Lab integrasi database komprehensif (13 lab berurutan)

### Sumber Dukungan

- **Dokumentasi**: https://modelcontextprotocol.io/
- **Spesifikasi**: https://spec.modelcontextprotocol.io/
- **Komunitas**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Server Discord Microsoft Foundry
- **Kursus Terkait**: Lihat README.md untuk jalur pembelajaran Microsoft lainnya

### Pemecahan Masalah Umum

**Q: PR saya gagal pemeriksaan terjemahan**  
A: Pastikan Anda hanya mengedit file markdown bahasa Inggris di direktori modul utama, bukan versi terjemahan.

**Q: Bagaimana cara menambahkan bahasa baru?**  
A: Dukungan bahasa diatur melalui workflow co-op-translator. Buka isu untuk membahas penambahan bahasa baru.

**Q: Contoh kode tidak berfungsi**  
A: Pastikan Anda mengikuti instruksi setup pada README sampel terkait. Periksa versi dependensi sudah benar.

**Q: Gambar tidak muncul**  
A: Pastikan path gambar relatif dan gunakan garis miring maju. Gambar harus berada di direktori `images/` atau `translated_images/` untuk versi lokal.

### Pertimbangan Performa

- Workflow terjemahan bisa memakan waktu beberapa menit
- Gambar besar sebaiknya dioptimalkan sebelum commit
- Simpan file markdown individual tetap fokus dan berukuran wajar
- Gunakan tautan relatif untuk portabilitas lebih baik

### Tata Kelola Proyek

Proyek ini mengikuti praktik sumber terbuka Microsoft:  
- Lisensi MIT untuk kode dan dokumentasi  
- Microsoft Open Source Code of Conduct  
- CLA diwajibkan untuk kontribusi  
- Masalah keamanan: Ikuti pedoman SECURITY.md  
- Dukungan: Lihat SUPPORT.md untuk sumber bantuan

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->