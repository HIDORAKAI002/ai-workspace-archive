# Changelog: Kurikulum MCP untuk Pemula

Dokumen ini berfungsi sebagai catatan semua perubahan penting yang dibuat pada kurikulum Model Context Protocol (MCP) untuk Pemula. Perubahan didokumentasikan dalam urutan kronologis terbalik (perubahan terbaru di awal).

## 16 Juni 2026

### Penyelarasan Spesifikasi MCP & Validasi Contoh

Memvalidasi kurikulum terhadap **Spesifikasi MCP 2025-11-25** saat ini dan SDK resmi terbaru, kemudian memperbaiki referensi spesifikasi yang masih usang dan mengonfirmasi bahwa contoh inti masih dapat dibangun dan dijalankan.

#### Koreksi Versi Spesifikasi (2025-06-18 / 2025-03-26 → 2025-11-25)

Memperbarui konten berbahasa Inggris di mana masih mengklaim revisi spesifikasi lama sebagai standar *saat ini/terbaru*, dan mengarahkan ulang tautan ke jalur spesifikasi kanonis `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Memperbarui banner "Current Standard", pengantar, heading prinsip keamanan inti, heading persyaratan wajib, bagian Microsoft Entra ID, tautan Referensi & Sumber Daya, dan pemberitahuan keamanan penutup (8 referensi) ke 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Memperbarui tautan spesifikasi Sumber Daya Tambahan dan banner "Current Standard" ke 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Mengganti tautan `2025-03-26` security-and-trust yang sudah usang dengan halaman praktik keamanan terkini 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Memperbarui tautan dokumen sampling resmi ke 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Memperbarui referensi "spesifikasi MCP saat ini" dalam bentuk sekarang dan tautan spesifikasi Sumber Daya Tambahan ke 2025-11-25 (catatan SSE-depresiasi historis dibiarkan agar akurat)

#### Validasi Contoh Terhadap SDK Saat Ini

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` menginstal `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` lolos tanpa kesalahan tipe — API `McpServer`/`StdioServerTransport` yang ada tetap valid
- **Python (03-GettingStarted/01-first-server/solution/python)**: Divalidasi di lingkungan `.venv` terisolasi dengan `mcp[cli]` (1.27.2); `py_compile` berhasil dan `FastMCP.list_tools()` dengan benar mengembalikan alat `add` dan `subtract`
- Mengonfirmasi semua rentang versi contoh `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) mengarah bersih ke versi `1.29.0` saat ini tanpa perubahan API yang merusak

#### Penyelarasan Pin Ketergantungan (menutup celah versi)

Memperbarui pin SDK usang sehingga setiap contoh mengikuti rilis MCP saat ini, sesuai konvensi repositori:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Memperbarui `@modelcontextprotocol/sdk` dari `^1.8.0` → `>=1.26.0` dan memperbarui deskripsi paket yang usang `"updated for MCP 2025-06-18"` menjadi `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** dan **lab4/code/github_mcp_server/pyproject.toml**: Memperbarui pin pasti `mcp==1.23.0` → `mcp>=1.26.0`; menghasilkan ulang kedua file `uv.lock` (`uv lock`) sehingga file lock mengarah ke `mcp 1.27.2` saat ini dan tetap sinkron dengan manifes

#### Analisis Kesenjangan Kurikulum — Cakupan Fitur Spesifikasi Terbaru

Memastikan kurikulum sudah mencakup semua primitif yang diperkenalkan/diperluas di MCP 2025-11-25, sehingga tidak ada kesenjangan konten:
- **Sampling**: Pelajaran 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (termasuk mode URL)**: Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Didokumentasikan dalam 00-Introduction, 01-CoreConcepts, dan 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimental, operasi jangka panjang)**: Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Annotasi Alat** (`readOnlyHint` / `destructiveHint`): Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features

### Penguatan Keamanan & Perbaikan Kerentanan Ketergantungan

Melakukan pemeriksaan keamanan menyeluruh pada setiap manifes ketergantungan dan kode sumber contoh, kemudian memperbaiki semua advisori npm yang dilaporkan serta satu temuan tingkat kode. Setelah perbaikan, `npm audit` melaporkan **0 kerentanan** di setiap direktori yang diaudit.

#### Kerentanan Ketergantungan npm (transitif) — Diperbaiki

Memeriksa semua 15 file `package-lock.json` yang dikomit. Kerentanan terbatas pada ketergantungan transitif yang dibawa oleh alat pengembang MCP Inspector, klien OpenAI, dan SDK MCP; semuanya kini terselesaikan tanpa merusak contoh:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** dan **lab3/code/weather_mcp/inspector**: Memperbarui `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), yang membersihkan advisori bundel `ajv`, `brace-expansion`, `diff`, `path-to-regexp` dan `ws`. Menambahkan entri npm `overrides` yang memaksa `shell-quote@1.8.4` yang telah dipatch untuk menghilangkan advisori kritis yang tersisa yang dibawa oleh `concurrently`; menghasilkan ulang kedua file lock (sekarang 0 kerentanan)
- **03-GettingStarted/samples/typescript**: `npm audit fix` memperbarui `qs` transitif (sedang) ke rilis yang dipatch
- **03-GettingStarted/samples/javascript**: `npm audit fix` memperbarui `hono` transitif (sedang) ke rilis yang dipatch
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` memperbarui `form-data` transitif (tinggi) ke rilis yang dipatch
- **03-GettingStarted/11-simple-auth/solution/typescript**: Menghasilkan `package-lock.json` yang hilang sehingga proyek dapat direproduksi dan diaudit (0 kerentanan)

#### Perbaikan Keamanan Tingkat Kode (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Menghapus `shell=True` dari alat `open_in_vscode`. Sebelumnya `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` memungkinkan karakter metash dengan shell dalam jalur folder ditafsirkan oleh `cmd.exe` (vektor injeksi perintah). Sekarang menjalankan `Code.exe` yang sudah ter-resolve langsung dengan folder sebagai argumen — tanpa shell — yang secara fungsional setara dan aman

#### Audit Ketergantungan Python

- Memeriksa setiap set persyaratan Python dengan `pip-audit`. `05-AdvancedTopics` dan `03-GettingStarted/samples/python` melaporkan **tidak ada kerentanan yang diketahui** (rentang `mcp` / `httpx` / `pydantic` / `python-dotenv` mereka mengarah ke rilis patch terbaru)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` menandai ketergantungan transitif **`werkzeug` 3.1.1** dengan tiga advisori DoS nama perangkat Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, dan `CVE-2026-27199` (semuanya diperbaiki di 3.1.6). Menambahkan pin keamanan eksplisit `werkzeug>=3.1.6` sehingga rilis patch diambil; memverifikasi batasan mengarah bersih dengan stack `chainlit` / `mcp` / `semantic-kernel`

### Perubahan Nama Produk

Memperbarui semua konten kurikulum untuk mencerminkan rebranding produk Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Memperbarui tautan komunitas Discord
- **AGENTS.md**: Memperbarui referensi server Discord
- **README.md**: Memperbarui referensi ekosistem teknologi
- **study_guide.md**: Memperbarui referensi studi kasus
- **05-AdvancedTopics/README.md**: Memperbarui judul dan deskripsi Modul 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Memperbarui header bagian dan deskripsi
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Pembaruan lengkap judul modul dan konten
- **05-AdvancedTopics/mcp-security-entra/README.md**: Memperbarui tautan referensi silang
- **07-LessonsfromEarlyAdoption/README.md**: Memperbarui referensi studi kasus
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Memperbarui header Bagian 9, lencana, dan kapabilitas
- **08-BestPractices/README.md**: Memperbarui tautan komunitas Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Memperbarui referensi channel Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Memperbarui referensi deployment model
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Memperbarui tabel Layanan AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Memperbarui referensi sumber daya

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension untuk VS Code
- **README.md**: Memperbarui referensi utama kurikulum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Memperbarui judul modul, ikhtisar, dan semua header modul
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Memperbarui judul, tujuan pembelajaran, instruksi pengaturan, dan sumber daya
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Memperbarui judul, tujuan pembelajaran, tabel host MCP, dan referensi silang
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Memperbarui judul, lencana, prasyarat, dan sumber daya
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Memperbarui referensi Agent Builder dan tautan feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Memperbarui prasyarat dan referensi ekstensi

---

## 11 April 2026

### Pelajaran Baru, Perbaikan Dokumentasi, dan Pembaruan Ketergantungan

#### Konten Kurikulum Baru Ditambahkan

**Modul 05 - Topik Lanjutan**
- **Pelajaran 5.17: Penalaran Multi-Agen Adversarial dengan MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Panduan lengkap baru yang membahas pola debat adversarial untuk sistem multi-agen
  - Diagram arsitektur Mermaid: dua agen → server MCP bersama → transkrip debat → juri → vonis
  - Server alat MCP bersama (`web_search` + `run_python`) diimplementasikan dalam Python dan TypeScript
  - Prompt sistem yang berlawanan (UNTUK / MELAWAN / Juri) dengan persyaratan penggunaan alat eksplisit
  - Orkestrator debat dalam Python, TypeScript, dan C# mengelola putaran dan mengarahkan argumen
  - Pengkabelan MCP `ClientSession` untuk orkestrator pada panggilan alat nyata
  - Tabel kasus penggunaan (deteksi halusinasi, pemodelan ancaman, tinjauan desain API, verifikasi fakta, pemilihan teknologi)
  - Pertimbangan keamanan: eksekusi ter-sandbox, validasi panggilan alat, pembatasan laju, pencatatan audit
  - Latihan terstruktur dengan tiga skenario praktis (tinjauan kode, keputusan arsitektur, moderasi konten)

#### Perbaikan Dokumentasi

**Modul 03 - Memulai**
- **05-stdio-server/README.md**: Memperbaiki contoh server stdio TypeScript yang tidak lengkap — menambahkan instansiasi transport yang hilang (`new StdioServerTransport()`) dan panggilan `server.connect(transport)` agar sesuai dengan contoh Python dan .NET di bagian sama
- **14-sampling/README.md**: Memperbaiki typo — mengoreksi `"Sampling is an davanced features"` menjadi `"Sampling is an advanced feature"`

#### Pembaruan Kurikulum

**Main README.md**
- Menambahkan entri 5.17 (Penalaran Multi-Agen Adversarial dengan MCP) ke tabel kurikulum dengan tautan langsung ke pelajaran baru

**05-AdvancedTopics/README.md**
- Menambahkan baris Pelajaran 5.17 ke tabel pelajaran

**study_guide.md**
- Menambahkan topik Penalaran Multi-Agen Adversarial ke peta pikiran dan deskripsi prosa Topik Lanjutan

#### Perbaikan Kode dan Keamanan

**Modul 05 - Agen Adversarial (`mcp-adversarial-agents`)**
- **Perbaikan keamanan — injeksi perintah**: Mengganti interpolasi shell `execSync` dengan `execFile` + `promisify` pada alat `run_python` TypeScript, menghilangkan permukaan injeksi perintah (kode yang dikendalikan LLM kini diteruskan sebagai elemen argv literal tanpa keterlibatan shell)
- **Pengkabelan loop alat MCP**: Memperbarui pengatur debat Python untuk menggunakan klien `AsyncAnthropic` (mengganti `Anthropic` sinkron yang memblokir), meneruskan `ClientSession` langsung yang aktif ke setiap giliran agen, mengambil definisi alat melalui `session.list_tools()` setiap giliran, dan mengirim blok `tool_use` melalui `session.call_tool()` dalam loop sampai model mengeluarkan respons teks final

#### Pembaruan Ketergantungan

- Meningkatkan `hono` ke 4.12.12 di berbagai paket (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Meningkatkan `@hono/node-server` dari 1.19.11 ke 1.19.13 di paket TypeScript
- Meningkatkan `cryptography` dari 46.0.5 ke 46.0.7 di paket Python (10-StreamliningAIWorkflows lab 3 dan 4)
- Meningkatkan `lodash` dari 4.17.23 ke 4.18.1 di 10-StreamliningAIWorkflows inspector

#### Terjemahan

- Menyelaraskan terjemahan untuk lebih dari 48 bahasa dengan perubahan sumber terbaru (pembaruan i18n)

---

## 5 Februari 2026

### Peningkatan Validasi dan Navigasi Seluruh Repositori

#### Penambahan Konten Kurikulum Baru

**Modul 03 - Memulai**
- **12-mcp-hosts/README.md**: Panduan lengkap baru untuk pengaturan host MCP
  - Contoh konfigurasi Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Template konfigurasi JSON untuk semua host utama
  - Tabel perbandingan jenis transport (stdio, SSE/HTTP, WebSocket)
  - Pemecahan masalah koneksi umum
  - Praktik keamanan terbaik untuk konfigurasi host

- **13-mcp-inspector/README.md**: Panduan debugging baru untuk MCP Inspector
  - Metode instalasi (npx, npm global, dari sumber)
  - Menghubungkan ke server melalui stdio dan HTTP/SSE
  - Alat pengujian, sumber daya, dan alur kerja prompt
  - Integrasi VS Code dengan MCP Inspector
  - Skenario debugging umum beserta solusi

**Modul 04 - Implementasi Praktis**
- **pagination/README.md**: Panduan implementasi pagination baru
  - Pola pagination berbasis cursor di Python, TypeScript, Java
  - Penanganan pagination sisi klien
  - Strategi desain cursor (opaque vs. terstruktur)
  - Rekomendasi optimasi performa

**Modul 05 - Topik Lanjutan**
- **mcp-protocol-features/README.md**: Penjelajahan fitur protokol baru
  - Implementasi notifikasi kemajuan
  - Pola pembatalan permintaan
  - Template sumber daya dengan pola URI
  - Manajemen siklus hidup server
  - Kontrol tingkat logging
  - Pola penanganan kesalahan dengan kode JSON-RPC

#### Perbaikan Navigasi (lebih dari 24 file diperbarui)

**README Modul Utama**  
 Sekarang menautkan ke pelajaran pertama DAN modul berikutnya

**Sub-file 02-Security**  
- Kelima dokumen keamanan tambahan sekarang memiliki navigasi "Apa Selanjutnya":

**File Studi Kasus 09**  
- Semua file studi kasus sekarang memiliki navigasi berurutan:

**Lab 10-StreamliningAI**  
Menambahkan bagian Apa Selanjutnya ke gambaran modul 10 dan modul 11

#### Perbaikan Kode dan Konten

**Pembaruan SDK dan Ketergantungan**  
Memperbaiki versi openai yang kosong menjadi `^4.95.0`  
Memperbarui SDK dari `^1.8.0` ke `>=1.26.0`  
Memperbarui pin versi mcp ke `>=1.26.0`

**Perbaikan Kode**  
Memperbaiki model tidak valid `gpt-4o-mini` menjadi `gpt-4.1-mini`

**Perbaikan Konten**  
Memperbaiki tautan rusak `READMEmd` → `README.md`, memperbaiki header kurikulum `Module 1-3` → `Module 0-3`, memperbaiki jalur case-sensitive  
Menghapus duplikat konten Studi Kasus 5 yang rusak

**Peningkatan Panduan Pemula**  
Menambahkan pengantar yang tepat, tujuan pembelajaran, dan prasyarat untuk pemula

#### Pembaruan Kurikulum

**README.md Utama**  
- Menambahkan entri 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) ke tabel kurikulum

**README Modul**  
Menambahkan pelajaran 12 dan 13 ke daftar pelajaran  
Menambahkan bagian Panduan Praktis dengan tautan pagination  
Menambahkan pelajaran 5.15 (Custom Transport) dan 5.16 (Protocol Features)

**study_guide.md**  
- Memperbarui mindmap dengan semua topik baru: Pengaturan MCP Hosts, MCP Inspector, Strategi Pagination, Penyajian Mendalam Fitur Protokol

## 28 Januari 2026

### Tinjauan Kepatuhan Spesifikasi MCP 2025-11-25

#### Peningkatan Konsep Inti (01-CoreConcepts/)
- **Primitive Klien Baru - Roots**: Menambahkan dokumentasi lengkap tentang primitive klien Roots, memungkinkan server memahami batas filesystem dan izin akses  
- **Anotasi Alat**: Menambahkan dokumentasi tentang anotasi perilaku alat (`readOnlyHint`, `destructiveHint`) untuk keputusan eksekusi alat yang lebih baik  
- **Pemanggilan Alat dalam Sampling**: Memperbarui dokumentasi Sampling untuk memasukkan parameter `tools` dan `toolChoice` untuk pemanggilan alat yang dikendalikan model saat permintaan sampling  
- **Pelepasan Mode URL**: Menambahkan dokumentasi pelepasan berbasis URL untuk interaksi web eksternal yang diprakarsai server  
- **Tugas (Eksperimental)**: Menambahkan bagian baru yang mendokumentasikan fitur eksperimental Tasks untuk pembungkus eksekusi tahan lama dan pengambilan hasil yang ditunda  
- **Dukungan Ikon**: Dicatat bahwa alat, sumber daya, template sumber daya, dan prompt kini dapat menyertakan ikon sebagai metadata tambahan

#### Pembaruan Dokumentasi  
- **README.md**: Menambahkan referensi versi Spesifikasi MCP 2025-11-25 dan penjelasan versioning berdasarkan tanggal  
- **study_guide.md**: Memperbarui peta kurikulum untuk memasukkan Tasks dan Anotasi Alat di bagian Konsep Inti; memperbarui timestamp dokumen

#### Verifikasi Kepatuhan Spesifikasi  
- **Versi Protokol**: Memverifikasi semua dokumentasi merujuk pada MCP Spesifikasi 2025-11-25 saat ini  
- **Kesesuaian Arsitektur**: Mengonfirmasi keakuratan dokumentasi arsitektur dua lapis (Lapisan Data + Lapisan Transport)  
- **Dokumentasi Primitive**: Memvalidasi primitive server (Sumber Daya, Prompt, Alat) dan primitive klien (Sampling, Pelepasan, Logging, Roots)  
- **Mekanisme Transport**: Memverifikasi akurasi dokumentasi transport STDIO dan Streamable HTTP  
- **Panduan Keamanan**: Mengonfirmasi keselarasan dengan dokumentasi Praktik Terbaik Keamanan MCP saat ini

#### Fitur Utama MCP 2025-11-25 yang Didokumentasikan  
- **Penemuan OpenID Connect**: Penemuan server otentikasi melalui OIDC  
- **Dokumen Metadata OAuth Client ID**: Mekanisme pendaftaran klien yang direkomendasikan  
- **JSON Schema 2020-12**: Dialek default untuk definisi skema MCP  
- **Sistem Tingkatan SDK**: Persyaratan formal untuk dukungan fitur dan pemeliharaan SDK  
- **Struktur Tata Kelola**: Formalisasi Kelompok Kerja dan Kelompok Minat dalam tata kelola MCP

### Pembaruan Dokumentasi Keamanan Besar (02-Security/)

#### Integrasi Workshop MCP Security Summit (Sherpa)  
- **Sumber Pelatihan Praktis Baru**: Menambahkan integrasi komprehensif dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) di seluruh dokumentasi keamanan  
- **Cakupan Rute Ekspedisi**: Mendokumentasikan kemajuan kamp-ke-kamp lengkap dari Base Camp ke Summit  
- **Keselarasan OWASP**: Semua panduan keamanan sekarang memetakan risiko MCP Azure OWASP Security Guide

#### Integrasi OWASP MCP Top 10  
- **Bagian Baru**: Menambahkan tabel Risiko Keamanan OWASP MCP Top 10 dengan mitigasi Azure ke README utama Keamanan  
- **Dokumentasi Berdasarkan Risiko**: Memperbarui mcp-security-controls-2025.md dengan referensi risiko OWASP MCP untuk setiap domain keamanan  
- **Arsitektur Referensi**: Menautkan ke arsitektur referensi dan pola implementasi OWASP MCP Azure Security Guide

#### Pembaruan File Keamanan  
- **README.md**: Menambahkan tinjauan Sherpa Workshop, tabel rute ekspedisi, ringkasan risiko OWASP MCP Top 10, dan bagian pelatihan praktis  
- **mcp-security-controls-2025.md**: Memperbarui header ke Februari 2026, menambahkan referensi risiko OWASP (MCP01-MCP08), memperbaiki inkonsistensi versi spesifikasi  
- **mcp-security-best-practices-2025.md**: Menambahkan bagian sumber daya Sherpa dan OWASP, memperbarui timestamp  
- **mcp-best-practices.md**: Menambahkan bagian pelatihan praktis dengan tautan Sherpa dan OWASP  
- **azure-content-safety-implementation.md**: Menambahkan referensi OWASP MCP06, penyelarasan Sherpa Camp 3, dan bagian sumber daya tambahan

#### Tautan Sumber Daya Baru Ditambahkan  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Halaman risiko OWASP MCP individu (MCP01-MCP10)

### Penyelarasan Spesifikasi MCP 2025-11-25 Seluruh Kurikulum

#### Modul 03 - Memulai  
- **Dokumentasi SDK**: Menambahkan Go SDK ke daftar SDK resmi; memperbarui semua referensi SDK agar sesuai dengan Spesifikasi MCP 2025-11-25  
- **Klarifikasi Transport**: Memperbarui deskripsi transport STDIO dan HTTP Streaming dengan referensi spesifikasi eksplisit

#### Modul 04 - Implementasi Praktis  
- **Pembaruan SDK**: Menambahkan Go SDK; memperbarui daftar SDK dengan referensi versi spesifikasi  
- **Spesifikasi Otorisasi**: Memperbarui tautan spesifikasi Otorisasi MCP ke versi 2025-11-25 saat ini

#### Modul 05 - Topik Lanjutan  
- **Fitur Baru**: Menambahkan catatan tentang fitur baru MCP Specification 2025-11-25 (Tasks, Anotasi Alat, Pelepasan Mode URL, Roots)  
- **Sumber Daya Keamanan**: Menambahkan tautan OWASP MCP Top 10 dan workshop Sherpa ke referensi tambahan

#### Modul 06 - Kontribusi Komunitas  
- **Daftar SDK**: Menambahkan SDK Swift dan Rust; memperbarui tautan spesifikasi ke 2025-11-25  
- **Referensi Spesifikasi**: Memperbarui tautan Spesifikasi MCP ke URL spesifikasi langsung

#### Modul 07 - Pelajaran dari Adopsi Awal  
- **Pembaruan Sumber Daya**: Menambahkan tautan Spesifikasi MCP 2025-11-25 dan OWASP MCP Top 10 ke sumber daya tambahan

#### Modul 08 - Praktik Terbaik  
- **Versi Spesifikasi**: Memperbarui referensi Spesifikasi MCP ke 2025-11-25  
- **Sumber Daya Keamanan**: Menambahkan OWASP MCP Top 10 dan workshop Sherpa ke referensi tambahan

#### Modul 10 - Memperlancar Alur Kerja AI  
- **Pembaruan Lencana**: Mengubah lencana versi MCP dari versi SDK (1.9.3) ke versi spesifikasi (2025-11-25)  
- **Tautan Sumber Daya**: Memperbarui tautan Spesifikasi MCP; menambahkan OWASP MCP Top 10

#### Modul 11 - Lab Praktik MCP Server  
- **Referensi Spesifikasi**: Memperbarui tautan Spesifikasi MCP ke versi 2025-11-25  
- **Sumber Daya Keamanan**: Menambahkan OWASP MCP Top 10 ke sumber daya resmi

## 18 Desember 2025

### Pembaruan Dokumentasi Keamanan - Spesifikasi MCP 2025-11-25

#### Praktik Terbaik Keamanan MCP (02-Security/mcp-best-practices.md) - Pembaruan Versi Spesifikasi  
- **Pembaruan Versi Protokol**: Memperbarui untuk merujuk Spesifikasi MCP 2025-11-25 terbaru (rilis 25 November 2025)  
  - Memperbarui semua referensi versi spesifikasi dari 2025-06-18 ke 2025-11-25  
  - Memperbarui referensi tanggal dokumen dari 18 Agustus 2025 ke 18 Desember 2025  
  - Memverifikasi semua URL spesifikasi mengarah ke dokumentasi terkini  
- **Validasi Konten**: Validasi komprehensif praktik keamanan terbaik terhadap standar terbaru  
  - **Solusi Keamanan Microsoft**: Memverifikasi istilah saat ini dan tautan untuk Prompt Shields (sebelumnya "deteksi risiko Jailbreak"), Azure Content Safety, Microsoft Entra ID, dan Azure Key Vault  
  - **Keamanan OAuth 2.1**: Memastikan keselarasan dengan praktik keamanan OAuth terbaru  
  - **Standar OWASP**: Memvalidasi referensi OWASP Top 10 untuk LLM tetap terkini  
  - **Layanan Azure**: Memverifikasi semua tautan dokumentasi Microsoft Azure dan praktik terbaik  
- **Kesesuaian Standar**: Semua standar keamanan yang direferensikan dikonfirmasi terkini  
  - Kerangka Manajemen Risiko AI NIST  
  - ISO 27001:2022  
  - Praktik Terbaik Keamanan OAuth 2.1  
  - Kerangka kerja keamanan dan kepatuhan Azure  
- **Sumber Daya Implementasi**: Memvalidasi semua tautan panduan implementasi dan sumber daya  
  - Pola otentikasi Azure API Management  
  - Panduan integrasi Microsoft Entra ID  
  - Manajemen rahasia Azure Key Vault  
  - Pipeline DevSecOps dan solusi pemantauan

### Penjaminan Mutu Dokumentasi  
- **Kepatuhan Spesifikasi**: Memastikan semua persyaratan keamanan MCP wajib (MUST/MUST NOT) selaras dengan spesifikasi terbaru  
- **Keterkinian Sumber Daya**: Memverifikasi semua tautan eksternal ke dokumentasi Microsoft, standar keamanan, dan panduan implementasi  
- **Cakupan Praktik Terbaik**: Memastikan cakupan komprehensif otentikasi, otorisasi, ancaman khusus AI, keamanan rantai pasokan, dan pola perusahaan

## 6 Oktober 2025

### Perluasan Bagian Memulai – Penggunaan Server Lanjutan & Autentikasi Sederhana

#### Penggunaan Server Lanjutan (03-GettingStarted/10-advanced)  
- **Bab Baru Ditambahkan**: Memperkenalkan panduan komprehensif penggunaan server MCP lanjutan, mencakup arsitektur server reguler dan level rendah.  
  - **Server Reguler vs. Level Rendah**: Perbandingan terperinci dan contoh kode di Python dan TypeScript untuk kedua pendekatan.  
  - **Desain Berbasis Handler**: Penjelasan pengelolaan alat/sumber daya/prompt berbasis handler untuk implementasi server yang skalabel dan fleksibel.  
  - **Pola Praktis**: Skenario dunia nyata di mana pola server level rendah bermanfaat untuk fitur dan arsitektur lanjutan.
#### Otentikasi Sederhana (03-GettingStarted/11-simple-auth)
- **Bab Baru Ditambahkan**: Panduan langkah demi langkah untuk mengimplementasikan otentikasi sederhana di server MCP.
  - **Konsep Auth**: Penjelasan jelas mengenai otentikasi vs. otorisasi, dan penanganan kredensial.
  - **Implementasi Auth Dasar**: Pola otentikasi berbasis middleware di Python (Starlette) dan TypeScript (Express), dengan contoh kode.
  - **Perkembangan ke Keamanan Lanjutan**: Panduan memulai dengan otentikasi sederhana dan berkembang ke OAuth 2.1 dan RBAC, dengan referensi ke modul keamanan lanjutan.

Penambahan ini menyediakan panduan praktis dan langsung untuk membangun implementasi server MCP yang lebih kuat, aman, dan fleksibel, menghubungkan konsep dasar dengan pola produksi lanjutan.

## 29 September 2025

### Laboratorium Integrasi Basis Data Server MCP - Jalur Pembelajaran Praktis Komprehensif

#### 11-MCPServerHandsOnLabs - Kurikulum Lengkap Baru Integrasi Basis Data
- **Jalur Pembelajaran 13 Lab Lengkap**: Ditambahkan kurikulum praktis komprehensif untuk membangun server MCP siap produksi dengan integrasi basis data PostgreSQL
  - **Implementasi Dunia Nyata**: Kasus penggunaan analitik Zava Retail yang menunjukkan pola kelas perusahaan
  - **Progresi Pembelajaran Terstruktur**:
    - **Lab 00-03: Fondasi** - Pengantar, Arsitektur Inti, Keamanan & Multi-Tenancy, Pengaturan Lingkungan
    - **Lab 04-06: Membangun Server MCP** - Desain & Skema Basis Data, Implementasi Server MCP, Pengembangan Alat  
    - **Lab 07-09: Fitur Lanjutan** - Integrasi Pencarian Semantik, Pengujian & Debugging, Integrasi VS Code
    - **Lab 10-12: Produksi & Praktik Terbaik** - Strategi Penyebaran, Pemantauan & Observabilitas, Praktik Terbaik & Optimasi
  - **Teknologi Perusahaan**: Kerangka FastMCP, PostgreSQL dengan pgvector, embedding Azure OpenAI, Azure Container Apps, Application Insights
  - **Fitur Lanjutan**: Row Level Security (RLS), pencarian semantik, akses data multi-tenant, embedding vektor, pemantauan waktu nyata

#### Standarisasi Terminologi - Konversi Modul ke Lab
- **Pembaruan Dokumentasi Komprehensif**: Sistematis memperbarui semua file README dalam 11-MCPServerHandsOnLabs untuk menggunakan terminologi "Lab" menggantikan "Modul"
  - **Header Bagian**: Memperbarui "What This Module Covers" menjadi "What This Lab Covers" di semua 13 lab
  - **Deskripsi Isi**: Mengubah "This module provides..." menjadi "This lab provides..." di seluruh dokumentasi
  - **Tujuan Pembelajaran**: Memperbarui "By the end of this module..." menjadi "By the end of this lab..."
  - **Tautan Navigasi**: Mengubah semua referensi "Module XX:" menjadi "Lab XX:" dalam rujukan dan navigasi silang
  - **Pelacakan Penyelesaian**: Memperbarui "After completing this module..." menjadi "After completing this lab..."
  - **Referensi Teknis Dipertahankan**: Mempertahankan referensi modul Python dalam file konfigurasi (misal, `"module": "mcp_server.main"`)

#### Penyempurnaan Panduan Studi (study_guide.md)
- **Peta Kurikulum Visual**: Menambahkan bagian baru "11. Database Integration Labs" dengan visualisasi struktur lab komprehensif
- **Struktur Repositori**: Memperbarui dari sepuluh menjadi sebelas bagian utama dengan deskripsi terperinci 11-MCPServerHandsOnLabs
- **Panduan Jalur Pembelajaran**: Meningkatkan instruksi navigasi untuk mencakup bagian 00-11
- **Cakupan Teknologi**: Ditambahkan detail integrasi FastMCP, PostgreSQL, layanan Azure
- **Hasil Pembelajaran**: Menekankan pengembangan server siap produksi, pola integrasi basis data, dan keamanan perusahaan

#### Penyempurnaan Struktur README Utama
- **Terminologi Berbasis Lab**: Memperbarui README.md utama di 11-MCPServerHandsOnLabs untuk konsisten menggunakan struktur "Lab"
- **Organisasi Jalur Pembelajaran**: Progresi jelas dari konsep dasar melalui implementasi lanjutan ke penyebaran produksi
- **Fokus Dunia Nyata**: Penekanan pada pembelajaran praktis langsung dengan pola dan teknologi kelas perusahaan

### Peningkatan Kualitas & Konsistensi Dokumentasi
- **Penekanan Pembelajaran Praktis**: Memperkuat pendekatan praktis berbasis lab di seluruh dokumentasi
- **Fokus Pola Perusahaan**: Menyoroti implementasi siap produksi dan pertimbangan keamanan perusahaan
- **Integrasi Teknologi**: Cakupan komprehensif layanan Azure modern dan pola integrasi AI
- **Progresi Pembelajaran**: Jalur jelas dan terstruktur dari konsep dasar ke penyebaran produksi

## 26 September 2025

### Penyempurnaan Studi Kasus - Integrasi GitHub MCP Registry

#### Studi Kasus (09-CaseStudy/) - Fokus Pengembangan Ekosistem
- **README.md**: Perluasan besar dengan studi kasus lengkap GitHub MCP Registry
  - **Studi Kasus GitHub MCP Registry**: Studi kasus komprehensif baru yang menyoroti peluncuran GitHub MCP Registry pada September 2025
    - **Analisis Masalah**: Pemeriksaan mendalam tantangan penemuan dan penyebaran server MCP terfragmentasi
    - **Arsitektur Solusi**: Pendekatan registry terpusat GitHub dengan instalasi sekali klik di VS Code
    - **Dampak Bisnis**: Peningkatan terukur dalam onboarding dan produktivitas pengembang
    - **Nilai Strategis**: Fokus pada penyebaran agen modular dan interoperabilitas antar alat
    - **Pengembangan Ekosistem**: Pemposisian sebagai platform dasar untuk integrasi agenik
  - **Struktur Studi Kasus yang Ditingkatkan**: Memperbarui ketujuh studi kasus dengan format konsisten dan deskripsi komprehensif
    - Agen Perjalanan AI Azure: Penekanan orkestrasi multi-agen
    - Integrasi Azure DevOps: Fokus otomasi alur kerja
    - Pengambilan Dokumen Real-Time: Implementasi klien konsol Python
    - Generator Rencana Studi Interaktif: Web app percakapan Chainlit
    - Dokumentasi Dalam Editor: Integrasi VS Code dan GitHub Copilot
    - Manajemen API Azure: Pola integrasi API perusahaan
    - GitHub MCP Registry: Pengembangan ekosistem dan platform komunitas
  - **Kesimpulan Komprehensif**: Bagian kesimpulan yang ditulis ulang menyoroti tujuh studi kasus yang mencakup berbagai dimensi implementasi MCP
    - Integrasi Perusahaan, Orkestrasi Multi-Agen, Produktivitas Pengembang
    - Pengembangan Ekosistem, Kategori Aplikasi Pendidikan
    - Wawasan diperluas ke pola arsitektur, strategi implementasi, dan praktik terbaik
    - Penekanan pada MCP sebagai protokol matang siap produksi

#### Pembaruan Panduan Studi (study_guide.md)
- **Peta Kurikulum Visual**: Memperbarui mindmap untuk memasukkan GitHub MCP Registry di bagian Studi Kasus
- **Deskripsi Studi Kasus**: Meningkatkan dari deskripsi umum ke rincian tujuh studi kasus komprehensif
- **Struktur Repositori**: Memperbarui bagian 10 untuk mencerminkan cakupan studi kasus lengkap dengan detail implementasi spesifik
- **Integrasi Changelog**: Menambahkan entri 26 September 2025 yang mendokumentasikan penambahan GitHub MCP Registry dan penyempurnaan studi kasus
- **Pembaruan Tanggal**: Memperbarui cap waktu footer untuk mencerminkan revisi terbaru (26 September 2025)

### Peningkatan Kualitas Dokumentasi
- **Peningkatan Konsistensi**: Standarisasi format dan struktur studi kasus di ketujuh contoh
- **Cakupan Komprehensif**: Studi kasus kini mencakup skenario perusahaan, produktivitas pengembang, dan pengembangan ekosistem
- **Posisi Strategis**: Fokus diperkuat pada MCP sebagai platform dasar untuk penyebaran sistem agenik
- **Integrasi Sumber Daya**: Memperbarui sumber daya tambahan untuk memasukkan tautan GitHub MCP Registry

## 15 September 2025

### Perluasan Topik Lanjutan - Transport Kustom & Rekayasa Konteks

#### Transport Kustom MCP (05-AdvancedTopics/mcp-transport/) - Panduan Implementasi Lanjutan Baru
- **README.md**: Panduan lengkap implementasi mekanisme transport MCP kustom
  - **Transport Azure Event Grid**: Implementasi transport event-driven serverless komprehensif
    - Contoh C#, TypeScript, dan Python dengan integrasi Azure Functions
    - Pola arsitektur berbasis event untuk solusi MCP skalabel
    - Penerima webhook dan penanganan pesan berbasis push
  - **Transport Azure Event Hubs**: Implementasi transport streaming throughput tinggi
    - Kemampuan streaming waktu nyata untuk skenario latensi rendah
    - Strategi partisi dan manajemen checkpoint
    - Pengelompokkan pesan dan optimasi performa
  - **Pola Integrasi Perusahaan**: Contoh arsitektur siap produksi
    - Pemrosesan MCP terdistribusi di banyak Azure Functions
    - Arsitektur transport hibrida menggabungkan beberapa tipe transport
    - Ketahanan pesan, keandalan, dan strategi penanganan kesalahan
  - **Keamanan & Pemantauan**: Integrasi Azure Key Vault dan pola observabilitas
    - Otentikasi identitas terkelola dan akses hak paling sedikit
    - Telemetri Application Insights dan pemantauan performa
    - Circuit breaker dan pola toleransi kesalahan
  - **Kerangka Pengujian**: Strategi pengujian komprehensif untuk transport kustom
    - Pengujian unit dengan test doubles dan framework mocking
    - Pengujian integrasi dengan Azure Test Containers
    - Pertimbangan pengujian performa dan beban

#### Rekayasa Konteks (05-AdvancedTopics/mcp-contextengineering/) - Disiplin AI yang Berkembang
- **README.md**: Eksplorasi komprehensif rekayasa konteks sebagai bidang yang berkembang
  - **Prinsip Inti**: Berbagi konteks lengkap, kesadaran pengambilan keputusan aksi, dan manajemen jendela konteks
  - **Kesesuaian Protokol MCP**: Bagaimana desain MCP mengatasi tantangan rekayasa konteks
    - Batasan jendela konteks dan strategi pemuatan progresif
    - Penentuan relevansi dan pengambilan konteks dinamis
    - Penanganan konteks multi-modal dan pertimbangan keamanan
  - **Pendekatan Implementasi**: Arsitektur single-threaded vs. multi-agen
    - Teknik pemotongan dan prioritisasi konteks
    - Pemuatan konteks progresif dan strategi kompresi
    - Pendekatan konteks berlapis dan optimasi pengambilan
  - **Kerangka Pengukuran**: Metrik baru untuk evaluasi efektivitas konteks
    - Efisiensi input, performa, kualitas, dan pengalaman pengguna
    - Pendekatan eksperimental untuk optimasi konteks
    - Analisis kegagalan dan metodologi perbaikan

#### Pembaruan Navigasi Kurikulum (README.md)
- **Struktur Modul Ditingkatkan**: Memperbarui tabel kurikulum untuk memasukkan topik lanjutan baru
  - Menambahkan Rekayasa Konteks (5.14) dan Transport Kustom (5.15)
  - Format dan tautan navigasi konsisten di semua modul
  - Deskripsi diperbarui mencerminkan cakupan konten terkini

### Peningkatan Struktur Direktori
- **Standarisasi Penamaan**: Mengganti nama "mcp transport" menjadi "mcp-transport" agar konsisten dengan folder topik lanjutan lain
- **Organisasi Konten**: Semua folder 05-AdvancedTopics kini mengikuti pola penamaan konsisten (mcp-[topik])

### Peningkatan Kualitas Dokumentasi
- **Kesesuaian Spesifikasi MCP**: Semua konten baru merujuk ke Spesifikasi MCP 2025-06-18 terkini
- **Contoh Multi-Bahasa**: Contoh kode komprehensif dalam C#, TypeScript, dan Python
- **Fokus Perusahaan**: Pola siap produksi dan integrasi cloud Azure menyeluruh
- **Dokumentasi Visual**: Diagram Mermaid untuk arsitektur dan visualisasi alur

## 18 Agustus 2025

### Pembaruan Komprehensif Dokumentasi - Standar MCP 2025-06-18

#### Praktik Terbaik Keamanan MCP (02-Security/) - Modernisasi Lengkap
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Penulisan ulang lengkap sesuai Spesifikasi MCP 2025-06-18
  - **Persyaratan Wajib**: Menambahkan persyaratan MUST/MUST NOT eksplisit dari spesifikasi resmi dengan indikator visual jelas
  - **12 Praktik Keamanan Inti**: Restrukturisasi dari daftar 15 item ke domain keamanan komprehensif
    - Keamanan Token & Otentikasi dengan integrasi penyedia identitas eksternal
    - Manajemen Sesi & Keamanan Transport dengan persyaratan kriptografi
    - Perlindungan Ancaman Khusus AI dengan integrasi Microsoft Prompt Shields
    - Kontrol Akses & Izin dengan prinsip hak paling sedikit
    - Keamanan Konten & Pemantauan dengan integrasi Azure Content Safety
    - Keamanan Rantai Pasokan dengan verifikasi komponen komprehensif
    - Keamanan OAuth & Pencegahan Confused Deputy dengan implementasi PKCE
    - Tanggap Insiden & Pemulihan dengan kemampuan otomatisasi
    - Kepatuhan & Tata Kelola dengan kesesuaian regulasi
    - Kontrol Keamanan Lanjutan dengan arsitektur zero trust
    - Integrasi Ekosistem Keamanan Microsoft dengan solusi lengkap
    - Evolusi Keamanan Berkelanjutan dengan praktik adaptif
  - **Solusi Keamanan Microsoft**: Panduan integrasi yang ditingkatkan untuk Prompt Shields, Azure Content Safety, Entra ID, dan GitHub Advanced Security
  - **Sumber Daya Implementasi**: Tautan sumber daya komprehensif dikategorikan menurut Dokumentasi MCP Resmi, Solusi Keamanan Microsoft, Standar Keamanan, dan Panduan Implementasi

#### Kontrol Keamanan Lanjutan (02-Security/) - Implementasi Perusahaan
- **MCP-SECURITY-CONTROLS-2025.md**: Perombakan lengkap dengan kerangka keamanan kelas perusahaan
  - **9 Domain Keamanan Komprehensif**: Dikembangkan dari kontrol dasar menjadi kerangka enterprise rinci
    - Otentikasi & Otorisasi Lanjutan dengan integrasi Microsoft Entra ID
    - Keamanan Token & Kontrol Anti-Passthrough dengan validasi komprehensif
    - Kontrol Keamanan Sesi dengan pencegahan pembajakan
    - Kontrol Keamanan Khusus AI dengan pencegahan injeksi prompt dan keracunan alat
    - Pencegahan Serangan Confused Deputy dengan keamanan proxy OAuth
    - Keamanan Eksekusi Alat dengan sandboxing dan isolasi
    - Kontrol Keamanan Rantai Pasokan dengan verifikasi dependensi
    - Kontrol Pemantauan & Deteksi dengan integrasi SIEM
    - Tanggap Insiden & Pemulihan dengan kemampuan otomatisasi
  - **Contoh Implementasi**: Menambahkan blok konfigurasi YAML rinci dan contoh kode
  - **Integrasi Solusi Microsoft**: Cakupan komprehensif layanan keamanan Azure, GitHub Advanced Security, dan manajemen identitas perusahaan

#### Topik Keamanan Lanjutan (05-AdvancedTopics/mcp-security/) - Implementasi Siap Produksi
- **README.md**: Penulisan ulang lengkap untuk implementasi keamanan perusahaan
  - **Kesesuaian Spesifikasi Terkini**: Diperbarui sesuai Spesifikasi MCP 2025-06-18 dengan persyaratan keamanan wajib
  - **Otentikasi Ditingkatkan**: Integrasi Microsoft Entra ID dengan contoh lengkap .NET dan Java Spring Security
  - **Integrasi Keamanan AI**: Implementasi Microsoft Prompt Shields dan Azure Content Safety dengan contoh detail Python
  - **Mitigasi Ancaman Lanjutan**: Contoh implementasi komprehensif untuk
    - Pencegahan Serangan Confused Deputy dengan PKCE dan validasi persetujuan pengguna
    - Pencegahan Token Passthrough dengan validasi audiens dan manajemen token aman
    - Pencegahan Pembajakan Sesi dengan pengikatan kriptografi dan analisis perilaku
  - **Integrasi Keamanan Perusahaan**: Pemantauan Azure Application Insights, pipeline deteksi ancaman, dan keamanan rantai pasokan
  - **Daftar Periksa Implementasi**: Kontrol keamanan wajib vs disarankan dengan manfaat ekosistem keamanan Microsoft

### Kualitas Dokumentasi & Kesesuaian Standar
- **Referensi Spesifikasi**: Memperbarui semua referensi ke Spesifikasi MCP saat ini 2025-06-18
- **Ekosistem Keamanan Microsoft**: Meningkatkan panduan integrasi di seluruh dokumentasi keamanan
- **Implementasi Praktis**: Menambahkan contoh kode terperinci dalam .NET, Java, dan Python dengan pola perusahaan
- **Organisasi Sumber Daya**: Kategorisasi komprehensif dokumentasi resmi, standar keamanan, dan panduan implementasi
- **Indikator Visual**: Penandaan yang jelas antara persyaratan wajib dan praktik yang direkomendasikan


#### Konsep Inti (01-CoreConcepts/) - Modernisasi Lengkap
- **Pembaruan Versi Protokol**: Memperbarui referensi ke Spesifikasi MCP saat ini 2025-06-18 dengan versi berbasis tanggal (format YYYY-MM-DD)
- **Penyempurnaan Arsitektur**: Meningkatkan deskripsi Hosts, Klien, dan Server untuk mencerminkan pola arsitektur MCP saat ini
  - Hosts sekarang secara jelas didefinisikan sebagai aplikasi AI yang mengoordinasikan banyak koneksi klien MCP
  - Klien dijelaskan sebagai konektor protokol yang mempertahankan hubungan satu-ke-satu dengan server
  - Server ditingkatkan dengan skenario penyebaran lokal vs. jarak jauh
- **Restrukturisasi Primitif**: Perombakan lengkap primitif server dan klien
  - Primitif Server: Sumber Daya (sumber data), Prompt (template), Alat (fungsi eksekusi) dengan penjelasan dan contoh terperinci
  - Primitif Klien: Pengambilan sampel (penyelesaian LLM), Elicitation (input pengguna), Logging (debugging/pemantauan)
  - Diperbarui dengan pola metode penemuan (`*/list`), pengambilan (`*/get`), dan eksekusi (`*/call`) saat ini
- **Arsitektur Protokol**: Memperkenalkan model arsitektur dua lapisan
  - Lapisan Data: Fondasi JSON-RPC 2.0 dengan manajemen siklus hidup dan primitif
  - Lapisan Transportasi: Mekanisme transportasi STDIO (lokal) dan HTTP Streamable dengan SSE (jarak jauh)
- **Kerangka Keamanan**: Prinsip keamanan komprehensif termasuk persetujuan eksplisit pengguna, perlindungan privasi data, keamanan eksekusi alat, dan keamanan lapisan transportasi
- **Pola Komunikasi**: Memperbarui pesan protokol untuk menunjukkan alur inisialisasi, penemuan, eksekusi, dan notifikasi
- **Contoh Kode**: Menyegarkan contoh multi-bahasa (.NET, Java, Python, JavaScript) untuk mencerminkan pola SDK MCP saat ini

#### Keamanan (02-Security/) - Perombakan Keamanan Komprehensif  
- **Penyesuaian Standar**: Penyesuaian penuh dengan persyaratan keamanan Spesifikasi MCP 2025-06-18
- **Evolusi Autentikasi**: Mencatat evolusi dari server OAuth kustom ke delegasi penyedia identitas eksternal (Microsoft Entra ID)
- **Analisis Ancaman AI Khusus**: Meningkatkan cakupan vektor serangan AI modern
  - Skenario serangan injeksi prompt terperinci dengan contoh dunia nyata
  - Mekanisme keracunan alat dan pola serangan "rug pull"
  - Keracunan jendela konteks dan serangan kebingungan model
- **Solusi Keamanan AI Microsoft**: Cakupan komprehensif ekosistem keamanan Microsoft
  - AI Prompt Shields dengan teknik deteksi lanjutan, pemfokusan, dan delimiter
  - Pola integrasi Azure Content Safety
  - GitHub Advanced Security untuk perlindungan rantai pasokan
- **Mitigasi Ancaman Lanjutan**: Kontrol keamanan terperinci untuk
  - Pembajakan sesi dengan skenario serangan spesifik MCP dan persyaratan ID sesi kriptografi
  - Masalah deputi bingung pada skenario proxy MCP dengan persyaratan persetujuan eksplisit
  - Kerentanan token passthrough dengan kontrol validasi wajib
- **Keamanan Rantai Pasokan**: Perluasan cakupan rantai pasokan AI termasuk model dasar, layanan embeddings, penyedia konteks, dan API pihak ketiga
- **Keamanan Fondasi**: Peningkatan integrasi dengan pola keamanan perusahaan termasuk arsitektur zero trust dan ekosistem keamanan Microsoft
- **Organisasi Sumber Daya**: Mengkategorikan tautan sumber daya komprehensif menurut tipe (Dokumentasi Resmi, Standar, Riset, Solusi Microsoft, Panduan Implementasi)

### Peningkatan Kualitas Dokumentasi
- **Tujuan Pembelajaran Terstruktur**: Meningkatkan tujuan pembelajaran dengan hasil yang spesifik dan dapat ditindaklanjuti 
- **Referensi Silang**: Menambahkan tautan antara topik keamanan dan konsep inti yang terkait
- **Informasi Terkini**: Memperbarui semua referensi tanggal dan tautan spesifikasi ke standar saat ini
- **Panduan Implementasi**: Menambahkan panduan implementasi yang spesifik dan dapat ditindaklanjuti di kedua bagian

## 16 Juli 2025

### README dan Peningkatan Navigasi
- Mendesain ulang navigasi kurikulum di README.md secara total
- Mengganti tag `<details>` dengan format tabel yang lebih mudah diakses
- Membuat opsi tata letak alternatif di folder baru "alternative_layouts"
- Menambahkan contoh navigasi berbasis kartu, gaya tab, dan gaya accordion
- Memperbarui bagian struktur repositori untuk menyertakan semua file terbaru
- Meningkatkan bagian "Cara Menggunakan Kurikulum Ini" dengan rekomendasi yang jelas
- Memperbarui tautan spesifikasi MCP agar mengarah ke URL yang benar
- Menambahkan bagian Context Engineering (5.14) ke struktur kurikulum

### Pembaruan Panduan Studi
- Merevisi total panduan studi untuk menyesuaikan dengan struktur repositori saat ini
- Menambahkan bagian baru untuk Klien MCP dan Alat, serta Server MCP Populer
- Memperbarui Peta Kurikulum Visual agar mencerminkan semua topik dengan akurat
- Meningkatkan deskripsi Topik Lanjutan untuk mencakup semua bidang spesialisasi
- Memperbarui bagian Studi Kasus dengan contoh aktual
- Menambahkan changelog komprehensif ini

### Kontribusi Komunitas (06-CommunityContributions/)
- Menambahkan informasi terperinci tentang server MCP untuk generasi gambar
- Menambahkan bagian komprehensif tentang penggunaan Claude di VSCode
- Menambahkan instruksi pengaturan dan penggunaan klien terminal Cline
- Memperbarui bagian klien MCP untuk mencakup semua opsi klien populer
- Meningkatkan contoh kontribusi dengan sampel kode yang lebih akurat

### Topik Lanjutan (05-AdvancedTopics/)
- Mengorganisasi semua folder topik spesialisasi dengan penamaan yang konsisten
- Menambahkan materi dan contoh context engineering
- Menambahkan dokumentasi integrasi agen Foundry
- Meningkatkan dokumentasi integrasi keamanan Entra ID

## 11 Juni 2025

### Pembuatan Awal
- Merilis versi pertama kurikulum MCP untuk Pemula
- Membuat struktur dasar untuk semua 10 bagian utama
- Menerapkan Peta Kurikulum Visual untuk navigasi
- Menambahkan proyek contoh awal dalam beberapa bahasa pemrograman

### Memulai (03-GettingStarted/)
- Membuat contoh implementasi server pertama
- Menambahkan panduan pengembangan klien
- Menyertakan instruksi integrasi klien LLM
- Menambahkan dokumentasi integrasi VS Code
- Menerapkan contoh server Server-Sent Events (SSE)

### Konsep Inti (01-CoreConcepts/)
- Menambahkan penjelasan terperinci tentang arsitektur client-server
- Membuat dokumentasi tentang komponen protokol utama
- Mendokumentasikan pola pesan dalam MCP

## 23 Mei 2025

### Struktur Repositori
- Menginisialisasi repositori dengan struktur folder dasar
- Membuat file README untuk setiap bagian utama
- Menyiapkan infrastruktur terjemahan
- Menambahkan aset gambar dan diagram

### Dokumentasi
- Membuat README.md awal dengan gambaran kurikulum
- Menambahkan CODE_OF_CONDUCT.md dan SECURITY.md
- Menyiapkan SUPPORT.md dengan panduan untuk mendapatkan bantuan
- Membuat struktur panduan studi awal

## 15 April 2025

### Perencanaan dan Kerangka Kerja
- Perencanaan awal untuk kurikulum MCP untuk Pemula
- Mendefinisikan tujuan pembelajaran dan audiens sasaran
- Menguraikan struktur kurikulum 10 bagian
- Mengembangkan kerangka konseptual untuk contoh dan studi kasus
- Membuat contoh prototipe awal untuk konsep kunci

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->