# AGENTS.md

## Gambaran Projek

**MCP untuk Pemula** adalah kurikulum pendidikan sumber terbuka untuk mempelajari Model Context Protocol (MCP) - satu rangka kerja piawai untuk interaksi antara model AI dan aplikasi klien. Repositori ini menyediakan bahan pembelajaran yang komprehensif dengan contoh kod praktikal merentasi pelbagai bahasa pengaturcaraan.

### Teknologi Utama

- **Bahasa Pengaturcaraan**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Rangka Kerja & SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Pangkalan Data**: PostgreSQL dengan sambungan pgvector
- **Platform Awan**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Alatan Pembangunan**: npm, Maven, pip, Cargo
- **Dokumentasi**: Markdown dengan terjemahan automatik berbilang bahasa (48+ bahasa)

### Seni Bina

- **11 Modul Teras (00-11)**: Laluan pembelajaran berturutan dari asas hingga topik lanjutan
- **Makmal Praktikal**: Latihan praktikal dengan kod penyelesaian lengkap dalam pelbagai bahasa
- **Projek Contoh**: Pelaksanaan pelayan dan klien MCP berfungsi
- **Sistem Terjemahan**: Aliran kerja GitHub Actions automatik untuk sokongan berbilang bahasa
- **Aset Imej**: Direktori imej terpusat dengan versi terjemahan

## Arahan Persediaan

Ini adalah repositori yang tertumpu kepada dokumentasi. Kebanyakan persediaan berlaku dalam projek contoh dan makmal individu.

### Persediaan Repositori

```bash
# Klon repositori
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Bekerja dengan Projek Contoh

Projek contoh terletak di:
- `03-GettingStarted/samples/` - Contoh khusus bahasa
- `03-GettingStarted/01-first-server/solution/` - Pelaksanaan pelayan pertama
- `03-GettingStarted/02-client/solution/` - Pelaksanaan klien
- `11-MCPServerHandsOnLabs/` - Makmal integrasi pangkalan data yang komprehensif

Setiap projek contoh mengandungi arahan persediaan sendiri:

#### Projek TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Projek Python
```bash
cd <project-directory>
pip install -r requirements.txt
# atau
pip install -e .
python main.py
```

#### Projek Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Aliran Kerja Pembangunan

### Struktur Dokumentasi

- **Modul 00-11**: Kandungan kurikulum teras secara berturutan
- **translations/**: Versi khusus bahasa (dihasilkan automatik, jangan sunting terus)
- **translated_images/**: Versi imej yang dilokalkan (dihasilkan automatik)
- **images/**: Imej dan rajah sumber

### Membuat Perubahan Dokumentasi

1. Sunting hanya fail markdown bahasa Inggeris dalam direktori modul utama (00-11)
2. Kemas kini imej dalam direktori `images/` jika perlu
3. Co-op-translator GitHub Action akan menjana terjemahan secara automatik
4. Terjemahan dijana semula semasa push ke cawangan utama

### Bekerja dengan Terjemahan

- **Terjemahan Automatik**: Aliran kerja GitHub Actions mengendalikan semua terjemahan
- **Jangan sunting** fail dalam direktori `translations/` secara manual
- Metadata terjemahan disematkan dalam setiap fail terjemahan
- Bahasa yang disokong: 48+ bahasa termasuk Arab, Cina, Perancis, Jerman, Hindi, Jepun, Korea, Portugis, Rusia, Sepanyol, dan banyak lagi

## Arahan Pengujian

### Validasi Dokumentasi

Oleh kerana ini adalah repositori dokumentasi utama, pengujian menumpukan pada:

1. **Validasi Pautan**: Pastikan semua pautan dalaman berfungsi
```bash
# Semak pautan markdown yang patah
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validasi Contoh Kod**: Uji bahawa contoh kod boleh dipilih/run
```bash
# Navigasi ke sampel tertentu dan jalankan ujianannya
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linting Markdown**: Semak konsistensi format
```bash
# Gunakan markdownlint jika perlu
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Pengujian Projek Contoh

Setiap contoh khusus bahasa mempunyai pendekatan ujian sendiri:

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

## Garis Panduan Gaya Kod

### Gaya Dokumentasi

- Gunakan bahasa jelas dan mesra untuk pemula
- Sertakan contoh kod dalam pelbagai bahasa di mana sesuai
- Ikuti amalan terbaik markdown:
  - Gunakan pengepala gaya ATX (`#` sintaks)
  - Gunakan blok kod berpagar dengan pengenal bahasa
  - Sertakan teks alt penerangan untuk imej
  - Kekalkan panjang baris munasabah (tiada had keras, tapi berhemah)

### Gaya Contoh Kod

#### TypeScript/JavaScript
- Gunakan modul ES (`import`/`export`)
- Ikuti konvensyen mod ketat TypeScript
- Sertakan anotasi jenis
- Sasarkan ES2022

#### Python
- Ikuti garis panduan gaya PEP 8
- Gunakan petunjuk jenis di mana sesuai
- Sertakan docstring untuk fungsi dan kelas
- Gunakan ciri Python moden (3.8+)

#### Java
- Ikuti konvensyen Spring Boot
- Gunakan ciri Java 21
- Ikuti struktur projek Maven standard
- Sertakan komen Javadoc

### Pengurusan Fail

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

## Pembinaan dan Penghantaran

### Penghantaran Dokumentasi

Repositori menggunakan GitHub Pages atau seumpamanya untuk hosting dokumentasi (jika berkenaan). Perubahan ke cawangan utama mencetuskan:

1. Aliran kerja terjemahan (`.github/workflows/co-op-translator.yml`)
2. Terjemahan automatik semua fail markdown Inggeris
3. Pelokalan imej jika perlu

### Tiada Proses Pembinaan Diperlukan

Repositori ini terutamanya mengandungi dokumentasi markdown. Tiada langkah kompilasi atau binaan diperlukan untuk kandungan kurikulum teras.

### Penghantaran Projek Contoh

Projek contoh individu mungkin mempunyai arahan penghantaran:
- Lihat `03-GettingStarted/09-deployment/` untuk panduan penghantaran pelayan MCP
- Contoh penghantaran Azure Container Apps di `11-MCPServerHandsOnLabs/`

## Garis Panduan Penyumbangan

### Proses Pull Request

1. **Fork dan Klon**: Fork repositori dan klon fork secara tempatan
2. **Cipta Cawangan**: Gunakan nama cawangan yang deskriptif (contoh: `fix/typo-module-3`, `add/python-example`)
3. **Buat Perubahan**: Sunting fail markdown Inggeris sahaja (bukan terjemahan)
4. **Uji Tempatan**: Sahkan markdown dipaparkan dengan betul
5. **Hantar PR**: Gunakan tajuk dan keterangan PR yang jelas
6. **CLA**: Tandatangani Perjanjian Lesen Penyumbang Microsoft bila diminta

### Format Tajuk PR

Gunakan tajuk yang jelas dan deskriptif:
- `[Module XX] Penerangan ringkas` untuk perubahan khusus modul
- `[Samples] Penerangan` untuk perubahan contoh kod
- `[Docs] Penerangan` untuk kemas kini dokumentasi am

### Apa yang Perlu Disumbangkan

- Pembetulan pepijat dalam dokumentasi atau contoh kod
- Contoh kod baru dalam bahasa tambahan
- Penjelasan dan penambahbaikan kepada kandungan sedia ada
- Kajian kes atau contoh praktikal baru
- Laporan isu untuk kandungan yang tidak jelas atau salah

### Apa yang TIDAK Perlu Dilakukan

- Jangan sunting fail dalam direktori `translations/` secara langsung
- Jangan sunting direktori `translated_images/`
- Jangan tambah fail binari besar tanpa perbincangan
- Jangan ubah fail aliran kerja terjemahan tanpa koordinasi

## Nota Tambahan

### Penyelenggaraan Repositori

- **Changelog**: Semua perubahan penting didokumenkan dalam `changelog.md`
- **Panduan Kajian**: Gunakan `study_guide.md` untuk gambaran navigasi kurikulum
- **Templat Isu**: Gunakan templat isu GitHub untuk laporan pepijat dan permintaan ciri
- **Kod Kelakuan**: Semua penyumbang mesti mengikuti Microsoft Open Source Code of Conduct

### Laluan Pembelajaran

Ikuti modul secara berturutan (00-11) untuk pembelajaran optimal:
1. **00-02**: Asas (Pengenalan, Konsep Teras, Keselamatan)
2. **03**: Bermula dengan pelaksanaan praktikal
3. **04-05**: Pelaksanaan praktikal dan topik lanjutan
4. **06-10**: Komuniti, amalan terbaik, dan aplikasi dunia nyata
5. **11**: Makmal integrasi pangkalan data komprehensif (13 makmal berturutan)

### Sumber Sokongan

- **Dokumentasi**: https://modelcontextprotocol.io/
- **Spesifikasi**: https://spec.modelcontextprotocol.io/
- **Komuniti**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Pelayan Microsoft Foundry Discord
- **Kursus Berkaitan**: Lihat README.md untuk laluan pembelajaran Microsoft lain

### Penyelesaian Masalah Lazim

**Q: PR saya gagal pemeriksaan terjemahan**  
A: Pastikan anda hanya menyunting fail markdown Inggeris dalam direktori modul utama, bukan versi terjemahan.

**Q: Bagaimana saya tambah bahasa baru?**  
A: Sokongan bahasa dikendalikan melalui aliran kerja co-op-translator. Buka isu untuk perbincangan menambah bahasa baru.

**Q: Contoh kod tidak berfungsi**  
A: Pastikan anda mengikuti arahan persediaan dalam README contoh tertentu. Semak bahawa anda mempunyai versi pergantungan yang betul dipasang.

**Q: Imej tidak dipaparkan**  
A: Sahkan laluan imej adalah relatif dan gunakan garis miring hadapan. Imej harus berada dalam direktori `images/` atau `translated_images/` untuk versi dilokalkan.

### Pertimbangan Persembahan

- Aliran kerja terjemahan mungkin mengambil masa beberapa minit untuk selesai
- Imej besar harus dioptimumkan sebelum commit
- Kekalkan fail markdown individu fokus dan saiz munasabah
- Gunakan pautan relatif untuk kebolehpindahan lebih baik

### Tadbir Urus Projek

Projek ini mengikuti amalan sumber terbuka Microsoft:  
- Lesen MIT untuk kod dan dokumentasi  
- Microsoft Open Source Code of Conduct  
- CLA diperlukan untuk sumbangan  
- Isu keselamatan: Ikuti garis panduan SECURITY.md  
- Sokongan: Lihat SUPPORT.md untuk sumber bantuan

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->