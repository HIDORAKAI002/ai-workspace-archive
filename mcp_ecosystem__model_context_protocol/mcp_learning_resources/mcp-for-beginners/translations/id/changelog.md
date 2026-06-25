# Changelog: Kurikulum MCP untuk Pemula

Dokumen ini berfungsi sebagai catatan semua perubahan signifikan yang dibuat pada kurikulum Model Context Protocol (MCP) untuk Pemula. Perubahan didokumentasikan dalam urutan kronologis terbalik (perubahan terbaru pertama).

## 24 Juni 2026

### Pelajaran Baru: Menggunakan MCP di aplikasi Copilot

- [Bagian tooling](./12-tooling/README.md) Menambahkan bagian tooling.
- [MCP di aplikasi Copilot](./12-tooling/01-copilot-app/README.md)

## 16 Juni 2026

### Penyesuaian Spesifikasi MCP & Validasi Contoh

Memvalidasi kurikulum terhadap **Spesifikasi MCP 2025-11-25** saat ini dan SDK resmi terbaru, kemudian memperbaiki referensi spesifikasi lama yang masih ada dan mengonfirmasi sampel inti masih dapat dibangun dan dijalankan.

#### Koreksi Versi Spesifikasi (2025-06-18 / 2025-03-26 → 2025-11-25)

Memperbarui konten Bahasa Inggris di mana masih menyatakan revisi spesifikasi lama sebagai standar *terkini/terbaru*, dan mengarahkan ulang tautan ke jalur spesifikasi kanonis `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Memperbarui banner "Current Standard", pengantar, judul prinsip keamanan inti, judul persyaratan wajib, bagian Microsoft Entra ID, tautan Referensi & Sumber daya, dan pemberitahuan keamanan penutup (8 referensi) menjadi 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Memperbarui tautan spesifikasi Sumber Daya Tambahan dan banner "Current Standard" ke 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Mengganti tautan keamanan dan kepercayaan `2025-03-26` yang usang dengan halaman praktik terbaik keamanan 2025-11-25 saat ini
- **03-GettingStarted/14-sampling/README.md**: Memperbarui tautan dokumen sampling resmi ke 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Memperbarui referensi "spesifikasi MCP saat ini" dalam bentuk waktu sekarang dan tautan spesifikasi Sumber Daya Tambahan ke 2025-11-25 (catatan historis penghapusan SSE tetap tidak diubah untuk akurasi)

#### Validasi Sampel Terhadap SDK Saat Ini

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` menyelesaikan `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` berjalan tanpa error tipe — API `McpServer`/`StdioServerTransport` yang ada tetap valid
- **Python (03-GettingStarted/01-first-server/solution/python)**: Divalidasi dalam `.venv` terisolasi dengan `mcp[cli]` (1.27.2); `py_compile` berhasil dan `FastMCP.list_tools()` mengembalikan alat `add` dan `subtract` dengan benar
- Memastikan semua rentang versi `@modelcontextprotocol/sdk` contoh (`>=1.26.0` / `^1.26.0` / `^1.27.0`) menyelesaikan dengan bersih ke versi saat ini `1.29.0` tanpa perubahan API yang merusak

#### Penyesuaian Pin Ketergantungan (menutup celah versi)

Menaikkan pin SDK yang ketinggalan agar setiap contoh melacak rilis MCP saat ini, sesuai konvensi repositori secara keseluruhan:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Menaikkan `@modelcontextprotocol/sdk` dari `^1.8.0` → `>=1.26.0` dan memperbarui deskripsi paket "updated for MCP 2025-06-18" yang sudah usang menjadi "aligned with MCP Specification 2025-11-25"
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** dan **lab4/code/github_mcp_server/pyproject.toml**: Menaikkan pin tepat `mcp==1.23.0` → `mcp>=1.26.0`; menghasilkan ulang kedua berkas kunci `uv.lock` (`uv lock`) sehingga berkas kunci mengarah ke `mcp 1.27.2` saat ini dan tetap sinkron dengan manifes

#### Analisis Celah Kurikulum — Cakupan Fitur Spesifikasi Terbaru

Memastikan kurikulum sudah mencakup semua primitif yang diperkenalkan/diperluas di MCP 2025-11-25, sehingga tidak ada celah konten yang tersisa:
- **Sampling**: Pelajaran 03-GettingStarted/14-sampling ditambah 05-AdvancedTopics/mcp-sampling
- **Elicitation (termasuk mode URL)**: Didokumentasikan di 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Didokumentasikan di 00-Introduction, 01-CoreConcepts, dan 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimental, operasi jangka panjang)**: Didokumentasikan di 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Anotasi Alat** (`readOnlyHint` / `destructiveHint`): Didokumentasikan di 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features

### Penguatan Keamanan & Perbaikan Kerentanan Ketergantungan

Melakukan pemeriksaan keamanan penuh di setiap manifes ketergantungan dan kode sumber contoh, lalu memperbaiki semua advisori npm yang dilaporkan dan satu temuan tingkat kode. Setelah perbaikan, `npm audit` melaporkan **0 kerentanan** di setiap direktori yang diaudit.

#### Kerentanan Ketergantungan npm (transitif) — Diperbaiki

Memeriksa semua 15 berkas `package-lock.json` yang dikomit. Kerentanan terbatas pada ketergantungan transitif yang dibawa oleh alat pengembang MCP Inspector, klien OpenAI, dan SDK MCP; semuanya kini terselesaikan tanpa merusak contoh:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** dan **lab3/code/weather_mcp/inspector**: Menaikkan `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), yang menghapus advisori terbungkus `ajv`, `brace-expansion`, `diff`, `path-to-regexp` dan `ws`. Menambahkan entri `overrides` npm yang memaksa `shell-quote@1.8.4` yang dipatch untuk menghilangkan advisori kritis tersisa yang dibawa oleh `concurrently`; menghasilkan ulang kedua berkas kunci (sekarang 0 kerentanan)
- **03-GettingStarted/samples/typescript**: `npm audit fix` memperbarui `qs` transitif (sedang) ke rilis patch
- **03-GettingStarted/samples/javascript**: `npm audit fix` memperbarui `hono` transitif (sedang) ke rilis patch
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` memperbarui `form-data` transitif (tinggi) ke rilis patch
- **03-GettingStarted/11-simple-auth/solution/typescript**: Menghasilkan `package-lock.json` yang hilang sehingga proyek dapat direproduksi dan diaudit (0 kerentanan)

#### Perbaikan Keamanan Tingkat Kode (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Menghapus `shell=True` dari alat `open_in_vscode`. `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` sebelumnya mengizinkan karakter metakarakter shell dalam jalur folder untuk diinterpretasikan oleh `cmd.exe` (vektor injeksi perintah). Kini meluncurkan `Code.exe` yang sudah diresolusi secara langsung dengan folder sebagai argumen — tanpa shell — yang fungsional setara dan aman

#### Audit Ketergantungan Python

- Memeriksa setiap set kebutuhan Python dengan `pip-audit`. `05-AdvancedTopics` dan `03-GettingStarted/samples/python` melaporkan **tidak ada kerentanan yang diketahui** (rentang `mcp` / `httpx` / `pydantic` / `python-dotenv` mereka menyelesaikan ke rilis patch saat ini)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` menandai ketergantungan transitif **`werkzeug` 3.1.1** dengan tiga advisori DoS perangkat bernama Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, dan `CVE-2026-27199` (semuanya diperbaiki di 3.1.6). Menambahkan pin keamanan eksplisit `werkzeug>=3.1.6` sehingga rilis patch teratasi; memverifikasi bahwa batasan tersebut terselesaikan dengan bersih bersama tumpukan `chainlit` / `mcp` / `semantic-kernel`

### Rebranding Nama Produk

Memperbarui semua konten kurikulum untuk mencerminkan rebranding produk Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Memperbarui tautan komunitas Discord
- **AGENTS.md**: Memperbarui referensi server Discord
- **README.md**: Memperbarui referensi ekosistem teknologi
- **study_guide.md**: Memperbarui referensi studi kasus
- **05-AdvancedTopics/README.md**: Memperbarui judul dan deskripsi Modul 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Memperbarui header bagian dan deskripsi
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Memperbarui judul dan isi modul secara lengkap
- **05-AdvancedTopics/mcp-security-entra/README.md**: Memperbarui tautan silang referensi
- **07-LessonsfromEarlyAdoption/README.md**: Memperbarui referensi studi kasus
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Memperbarui header Bagian 9, lencana, dan kemampuan
- **08-BestPractices/README.md**: Memperbarui tautan komunitas Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Memperbarui referensi saluran Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Memperbarui referensi penyebaran model
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Memperbarui tabel Layanan AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Memperbarui referensi sumber daya

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension untuk VS Code
- **README.md**: Memperbarui referensi utama kurikulum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Memperbarui judul modul, gambaran umum, dan semua header modul
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Memperbarui judul, tujuan pembelajaran, instruksi pengaturan, dan sumber daya
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Memperbarui judul, tujuan pembelajaran, tabel host MCP, dan rujukan silang
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Memperbarui judul, lencana, prasyarat, dan sumber daya
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Memperbarui referensi Agent Builder dan tautan umpan balik
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Memperbarui prasyarat dan referensi ekstensi

---

## 11 April 2026

### Pelajaran Baru, Perbaikan Dokumentasi, dan Pembaruan Ketergantungan

#### Konten Kurikulum Baru Ditambahkan

**Modul 05 - Topik Lanjutan**
- **Pelajaran 5.17: Penalaran Multi-Agen Adversarial dengan MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Panduan komprehensif baru yang membahas pola debat adversarial untuk sistem multi-agen
  - Diagram arsitektur Mermaid: dua agen → server MCP bersama → transkrip debat → hakim → putusan
  - Server alat MCP berbagi (`web_search` + `run_python`) diimplementasikan dalam Python dan TypeScript
  - Prompt sistem yang berlawanan (FOR / AGAINST / Judge) dengan persyaratan pemakaian alat yang eksplisit
  - Orkestrator debat dalam Python, TypeScript, dan C# yang mengelola ronde dan pengaturan argumen
  - Wiring MCP `ClientSession` untuk orkestrator ke pemanggilan alat nyata
  - Tabel kasus penggunaan (deteksi halusinasi, pemodelan ancaman, tinjauan desain API, verifikasi fakta, pemilihan teknologi)
  - Pertimbangan keamanan: eksekusi sandbox, validasi pemanggilan alat, pembatasan laju, pencatatan audit
  - Latihan terstruktur dengan tiga skenario praktis (tinjauan kode, keputusan arsitektur, moderasi konten)

#### Perbaikan Dokumentasi

**Modul 03 - Memulai**
- **05-stdio-server/README.md**: Memperbaiki contoh server stdio TypeScript yang tidak lengkap — menambahkan instansiasi transport yang hilang (`new StdioServerTransport()`) dan panggilan `server.connect(transport)` agar sesuai dengan contoh Python dan .NET di bagian yang sama
- **14-sampling/README.md**: Memperbaiki typo — memperbaiki `"Sampling is an davanced features"` menjadi `"Sampling is an advanced feature"`

#### Pembaruan Kurikulum

**Main README.md**
- Menambahkan entri 5.17 (Penalaran Multi-Agen Adversarial dengan MCP) ke tabel kurikulum dengan tautan langsung ke pelajaran baru

**05-AdvancedTopics/README.md**
- Menambahkan baris Pelajaran 5.17 ke tabel pelajaran

**study_guide.md**
- Menambahkan topik Penalaran Multi-Agen Adversarial ke peta pikiran dan deskripsi prosa Topik Lanjutan

#### Perbaikan Kode dan Keamanan

**Modul 05 - Agen Adversarial (`mcp-adversarial-agents`)**
- **Perbaikan Keamanan — injeksi perintah**: Mengganti interpolasi shell `execSync` dengan `execFile` + `promisify` dalam alat TypeScript `run_python`, menghilangkan permukaan injeksi perintah (kode yang dikendalikan LLM sekarang diteruskan sebagai elemen argv literal tanpa keterlibatan shell)
- **Pengkabelan loop alat MCP**: Memperbarui pengatur orkestra debat Python untuk menggunakan klien `AsyncAnthropic` (mengganti `Anthropic` sinkron yang memblokir), meneruskan `ClientSession` langsung yang aktif ke setiap giliran agen, mengambil definisi alat melalui `session.list_tools()` setiap giliran, dan mengirim blok `tool_use` melalui `session.call_tool()` dalam loop sampai model mengeluarkan respons teks akhir

#### Pembaruan Dependensi

- Meningkatkan `hono` ke 4.12.12 di berbagai paket (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Meningkatkan `@hono/node-server` dari 1.19.11 ke 1.19.13 di paket TypeScript
- Meningkatkan `cryptography` dari 46.0.5 ke 46.0.7 di paket Python (10-StreamliningAIWorkflows lab 3 dan 4)
- Meningkatkan `lodash` dari 4.17.23 ke 4.18.1 di 10-StreamliningAIWorkflows inspector

#### Terjemahan

- Menyinkronkan terjemahan untuk 48+ bahasa dengan perubahan sumber terbaru (pembaruan i18n)

---

## 5 Februari 2026

### Perbaikan Validasi dan Navigasi Seluruh Repositori

#### Konten Kurikulum Baru Ditambahkan

**Modul 03 - Memulai**
- **12-mcp-hosts/README.md**: Panduan komprehensif baru untuk pengaturan host MCP
  - Contoh konfigurasi Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Template konfigurasi JSON untuk semua host utama
  - Tabel perbandingan jenis transportasi (stdio, SSE/HTTP, WebSocket)
  - Pemecahan masalah koneksi umum
  - Praktik terbaik keamanan untuk konfigurasi host

- **13-mcp-inspector/README.md**: Panduan debug baru untuk MCP Inspector
  - Metode instalasi (npx, npm global, dari sumber)
  - Menghubungkan ke server melalui stdio dan HTTP/SSE
  - Pengujian alat, sumber daya, dan alur kerja prompt
  - Integrasi VS Code dengan MCP Inspector
  - Skenario debugging umum dengan solusi

**Modul 04 - Implementasi Praktis**
- **pagination/README.md**: Panduan baru implementasi paginasi
  - Pola paginasi berbasis cursor di Python, TypeScript, Java
  - Penanganan paginasi sisi klien
  - Strategi desain cursor (opak vs terstruktur)
  - Rekomendasi optimasi performa

**Modul 05 - Topik Lanjutan**
- **mcp-protocol-features/README.md**: Pembahasan mendalam fitur protokol baru
  - Implementasi notifikasi progres
  - Pola pembatalan permintaan
  - Template sumber daya dengan pola URI
  - Manajemen siklus hidup server
  - Kontrol level pencatatan
  - Pola penanganan kesalahan dengan kode JSON-RPC

#### Perbaikan Navigasi (24+ file diperbarui)

**README Modul Utama**  
 Sekarang menautkan ke pelajaran pertama DAN modul berikutnya

**Sub-file 02-Security**  
- Kelima dokumen tambahan keamanan sekarang memiliki navigasi "Apa Selanjutnya":

**File 09-CaseStudy**  
- Semua file studi kasus sekarang memiliki navigasi berurutan:

**Lab 10-StreamliningAI**  
Menambahkan bagian Apa Selanjutnya ke ringkasan Modul 10 dan Modul 11

#### Perbaikan Kode dan Konten

**Pembaruan SDK dan Dependensi**  
Memperbaiki versi openai kosong menjadi `^4.95.0`  
Memperbarui SDK dari `^1.8.0` ke `>=1.26.0`  
Memperbarui pin versi mcp ke `>=1.26.0`

**Perbaikan Kode**  
Memperbaiki model tidak valid `gpt-4o-mini` menjadi `gpt-4.1-mini`

**Perbaikan Konten**  
Memperbaiki tautan rusak `READMEmd` → `README.md`, memperbaiki header kurikulum `Module 1-3` → `Module 0-3`, memperbaiki path case-sensitive  
Menghapus konten duplikat rusak Studi Kasus 5

**Peningkatan Panduan Pemula**  
Menambahkan pengenalan yang tepat, tujuan pembelajaran, dan prasyarat untuk pemula

#### Pembaruan Kurikulum

**README.md Utama**  
- Menambahkan entri 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginasi), 5.16 (Fitur Protokol) ke tabel kurikulum

**README Modul**  
Menambahkan pelajaran 12 dan 13 ke daftar pelajaran  
Menambahkan bagian Panduan Praktis dengan tautan paginasi  
Menambahkan pelajaran 5.15 (Transportasi Kustom) dan 5.16 (Fitur Protokol)

**study_guide.md**  
- Memperbarui mindmap dengan semua topik baru: Pengaturan Host MCP, MCP Inspector, Strategi Paginasi, Pendalaman Fitur Protokol

## 28 Jan 2026

### Tinjauan Kepatuhan Spesifikasi MCP 2025-11-25

#### Peningkatan Konsep Inti (01-CoreConcepts/)
- **Primitif Klien Baru - Roots**: Menambahkan dokumentasi komprehensif tentang primitif klien Roots, memungkinkan server memahami batas filesystem dan izin akses  
- **Anotasi Alat**: Menambahkan dokumentasi tentang anotasi perilaku alat (`readOnlyHint`, `destructiveHint`) untuk keputusan pelaksanaan alat yang lebih baik  
- **Pemanggilan Alat dalam Sampling**: Memperbarui dokumentasi Sampling untuk memasukkan parameter `tools` dan `toolChoice` untuk panggilan alat yang dikendalikan model selama permintaan sampling  
- **Elicitation Mode URL**: Menambahkan dokumentasi elicitation berbasis URL untuk interaksi web eksternal yang diprakarsai server  
- **Tugas (Eksperimental)**: Menambahkan bagian baru yang mendokumentasikan fitur eksperimental Tugas untuk wrapper eksekusi tahan lama dan pengambilan hasil tertunda  
- **Dukungan Ikon**: Menyatakan bahwa alat, sumber daya, template sumber daya, dan prompt sekarang bisa menyertakan ikon sebagai metadata tambahan

#### Pembaruan Dokumentasi  
- **README.md**: Menambahkan referensi versi Spesifikasi MCP 2025-11-25 dan penjelasan versifikasi berbasis tanggal  
- **study_guide.md**: Memperbarui peta kurikulum untuk memasukkan Tugas dan Anotasi Alat di bagian Konsep Inti; memperbarui cap waktu dokumen

#### Verifikasi Kepatuhan Spesifikasi  
- **Versi Protokol**: Memastikan semua dokumentasi merujuk Spesifikasi MCP 2025-11-25 terkini  
- **Keselarasan Arsitektur**: Memastikan keakuratan dokumentasi arsitektur dua lapis (Lapisan Data + Lapisan Transport)  
- **Dokumentasi Primitif**: Memvalidasi primitif server (Sumber Daya, Prompt, Alat) dan primitif klien (Sampling, Elicitation, Logging, Roots)  
- **Mekanisme Transport**: Memverifikasi keakuratan dokumentasi transport STDIO dan HTTP yang dapat dialirkan  
- **Panduan Keamanan**: Memastikan keselarasan dengan dokumentasi Praktik Terbaik Keamanan MCP saat ini

#### Fitur Utama MCP 2025-11-25 yang Didokumentasikan  
- **OpenID Connect Discovery**: Penemuan server auth melalui OIDC  
- **Dokumen Metadata OAuth Client ID**: Mekanisme pendaftaran klien yang direkomendasikan  
- **JSON Schema 2020-12**: Dialek standar untuk definisi skema MCP  
- **Sistem Tingkatan SDK**: Persyaratan formal untuk dukungan fitur dan pemeliharaan SDK  
- **Struktur Tata Kelola**: Formalisasi Kelompok Kerja dan Kelompok Kepentingan dalam tata kelola MCP

### Pembaruan Besar Dokumentasi Keamanan (02-Security/)

#### Integrasi Workshop MCP Security Summit (Sherpa)  
- **Sumber Daya Pelatihan Praktis Baru**: Menambahkan integrasi komprehensif dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) di seluruh dokumentasi keamanan  
- **Liputan Rute Ekspedisi**: Mendokumentasikan kemajuan lengkap kamp demi kamp dari Base Camp ke Summit  
- **Keselarasan OWASP**: Semua panduan keamanan sekarang memetakan ke risiko OWASP MCP Azure Security Guide

#### Integrasi OWASP MCP Top 10  
- **Bagian Baru**: Menambahkan tabel Risiko Keamanan OWASP MCP Top 10 dengan mitigasi Azure di README Keamanan utama  
- **Dokumentasi Berbasis Risiko**: Memperbarui mcp-security-controls-2025.md dengan referensi risiko OWASP MCP untuk setiap domain keamanan  
- **Arsitektur Referensi**: Menautkan ke arsitektur referensi dan pola implementasi OWASP MCP Azure Security Guide

#### File Keamanan yang Diperbarui  
- **README.md**: Menambahkan gambaran Workshop Sherpa, tabel rute ekspedisi, ringkasan risiko OWASP MCP Top 10, dan bagian pelatihan praktis  
- **mcp-security-controls-2025.md**: Memperbarui header ke Februari 2026, menambahkan referensi risiko OWASP MCP (MCP01-MCP08), memperbaiki inkonsistensi versi spesifikasi  
- **mcp-security-best-practices-2025.md**: Menambahkan bagian sumber daya Sherpa dan OWASP, memperbarui cap waktu  
- **mcp-best-practices.md**: Menambahkan bagian pelatihan praktis dengan tautan Sherpa dan OWASP  
- **azure-content-safety-implementation.md**: Menambahkan referensi OWASP MCP06, keselarasan Sherpa Camp 3, dan bagian sumber daya tambahan

#### Tautan Sumber Daya Baru Ditambahkan  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Halaman risiko OWASP MCP individu (MCP01-MCP10)

### Keselarasan Spesifikasi MCP 2025-11-25 di Seluruh Kurikulum

#### Modul 03 - Memulai  
- **Dokumentasi SDK**: Menambahkan Go SDK ke daftar SDK resmi; memperbarui semua referensi SDK agar sesuai dengan Spesifikasi MCP 2025-11-25  
- **Klarifikasi Transportasi**: Memperbarui deskripsi transport STDIO dan HTTP Streaming dengan referensi spesifikasi eksplisit

#### Modul 04 - Implementasi Praktis  
- **Pembaruan SDK**: Menambahkan Go SDK; memperbarui daftar SDK dengan referensi versi spesifikasi  
- **Spesifikasi Otorisasi**: Memperbarui tautan spesifikasi Otorisasi MCP ke versi terbaru 2025-11-25

#### Modul 05 - Topik Lanjutan  
- **Fitur Baru**: Menambahkan catatan tentang fitur MCP Spesifikasi 2025-11-25 baru (Tugas, Anotasi Alat, Mode Elicitation URL, Roots)  
- **Sumber Keamanan**: Menambahkan tautan OWASP MCP Top 10 dan workshop Sherpa ke referensi tambahan

#### Modul 06 - Kontribusi Komunitas  
- **Daftar SDK**: Menambahkan Swift dan Rust SDK; memperbarui tautan spesifikasi ke 2025-11-25  
- **Referensi Spesifikasi**: Memperbarui tautan Spesifikasi MCP ke URL spesifikasi langsung

#### Modul 07 - Pelajaran dari Adopsi Awal  
- **Pembaruan Sumber Daya**: Menambahkan tautan Spesifikasi MCP 2025-11-25 dan OWASP MCP Top 10 ke sumber daya tambahan

#### Modul 08 - Praktik Terbaik  
- **Versi Spesifikasi**: Memperbarui referensi Spesifikasi MCP ke 2025-11-25  
- **Sumber Keamanan**: Menambahkan OWASP MCP Top 10 dan workshop Sherpa ke referensi tambahan

#### Modul 10 - Menyederhanakan Alur Kerja AI  
- **Pembaruan Lencana**: Mengubah lencana versi MCP dari versi SDK (1.9.3) menjadi versi spesifikasi (2025-11-25)  
- **Tautan Sumber Daya**: Memperbarui tautan Spesifikasi MCP; menambahkan OWASP MCP Top 10

#### Modul 11 - Lab Praktis MCP Server  
- **Referensi Spesifikasi**: Memperbarui tautan Spesifikasi MCP ke versi 2025-11-25  
- **Sumber Keamanan**: Menambahkan OWASP MCP Top 10 ke sumber daya resmi

## 18 Desember 2025

### Pembaruan Dokumentasi Keamanan - Spesifikasi MCP 2025-11-25

#### Praktik Terbaik Keamanan MCP (02-Security/mcp-best-practices.md) - Pembaruan Versi Spesifikasi  
- **Pembaruan Versi Protokol**: Memperbarui untuk merujuk Spesifikasi MCP 2025-11-25 terbaru (dirilis 25 November 2025)  
  - Memperbarui semua referensi versi spesifikasi dari 2025-06-18 ke 2025-11-25  
  - Memperbarui referensi tanggal dokumen dari 18 Agustus 2025 ke 18 Desember 2025  
  - Memverifikasi semua URL spesifikasi menunjuk ke dokumentasi terbaru  
- **Validasi Konten**: Validasi komprehensif praktik terbaik keamanan terhadap standar terbaru  
  - **Solusi Keamanan Microsoft**: Memverifikasi terminologi dan tautan terkini untuk Prompt Shields (sebelumnya "deteksi risiko jailbreak"), Azure Content Safety, Microsoft Entra ID, dan Azure Key Vault  
  - **Keamanan OAuth 2.1**: Memastikan keselarasan dengan praktik terbaik keamanan OAuth terbaru  
  - **Standar OWASP**: Memvalidasi referensi OWASP Top 10 untuk LLM tetap terkini  
  - **Layanan Azure**: Memverifikasi semua tautan dokumentasi Microsoft Azure dan praktik terbaiknya  
- **Keselarasan Standar**: Semua standar keamanan yang direferensikan dikonfirmasi terkini  
  - Kerangka Kerja Manajemen Risiko AI NIST  
  - ISO 27001:2022  
  - Praktik Terbaik Keamanan OAuth 2.1  
  - Kerangka kerja keamanan dan kepatuhan Azure  
- **Sumber Daya Implementasi**: Memverifikasi semua tautan panduan implementasi dan sumber daya  
  - Pola autentikasi manajemen API Azure  
  - Panduan integrasi Microsoft Entra ID  
  - Manajemen rahasia Azure Key Vault  
  - Pipeline DevSecOps dan solusi pemantauan

### Jaminan Kualitas Dokumentasi  
- **Kepatuhan Spesifikasi**: Memastikan semua persyaratan keamanan MCP wajib (HARUS/TIDAK HARUS) sesuai dengan spesifikasi terbaru  
- **Keterkinian Sumber Daya**: Memverifikasi semua tautan eksternal ke dokumentasi Microsoft, standar keamanan, dan panduan implementasi  
- **Cakupan Praktik Terbaik**: Memastikan cakupan menyeluruh autentikasi, otorisasi, ancaman khusus AI, keamanan rantai pasokan, dan pola perusahaan

## 6 Oktober 2025

### Perluasan Bagian Memulai – Penggunaan Server Lanjutan & Autentikasi Sederhana

#### Penggunaan Server Lanjutan (03-GettingStarted/10-advanced)  
- **Bab Baru Ditambahkan**: Memperkenalkan panduan komprehensif untuk penggunaan server MCP lanjutan, meliputi arsitektur server reguler dan tingkat rendah.
  - **Server Reguler vs. Tingkat Rendah**: Perbandingan rinci dan contoh kode dalam Python dan TypeScript untuk kedua pendekatan.
  - **Desain Berbasis Handler**: Penjelasan tentang pengelolaan alat/sumber daya/prompt berbasis handler untuk implementasi server yang skalabel dan fleksibel.
  - **Polanya Praktis**: Skenario dunia nyata di mana pola server tingkat rendah bermanfaat untuk fitur dan arsitektur tingkat lanjut.

#### Otentikasi Sederhana (03-GettingStarted/11-simple-auth)
- **Bab Baru Ditambahkan**: Panduan langkah demi langkah untuk mengimplementasikan otentikasi sederhana di server MCP.
  - **Konsep Auth**: Penjelasan jelas tentang otentikasi vs. otorisasi, dan penanganan kredensial.
  - **Implementasi Auth Dasar**: Pola otentikasi berbasis middleware dalam Python (Starlette) dan TypeScript (Express), dengan contoh kode.
  - **Progresi ke Keamanan Lanjutan**: Panduan memulai dengan auth sederhana dan melanjutkan ke OAuth 2.1 dan RBAC, dengan referensi ke modul keamanan lanjutan.

Penambahan ini memberikan panduan praktis langsung untuk membangun implementasi server MCP yang lebih kuat, aman, dan fleksibel, menjembatani konsep dasar dengan pola produksi tingkat lanjut.

## 29 September 2025

### Lab Integrasi Database Server MCP - Jalur Pembelajaran Praktik Komprehensif

#### 11-MCPServerHandsOnLabs - Kurikulum Integrasi Database Lengkap Baru
- **Jalur Pembelajaran 13-Lab Lengkap**: Menambahkan kurikulum praktik lengkap untuk membangun server MCP siap produksi dengan integrasi basis data PostgreSQL
  - **Implementasi Dunia Nyata**: Kasus penggunaan analitik Zava Retail yang menunjukkan pola kelas enterprise
  - **Progresi Pembelajaran Terstruktur**:
    - **Lab 00-03: Dasar-dasar** - Pengantar, Arsitektur Inti, Keamanan & Multi-Tenancy, Penyiapan Lingkungan
    - **Lab 04-06: Membangun Server MCP** - Desain Basis Data & Skema, Implementasi Server MCP, Pengembangan Alat  
    - **Lab 07-09: Fitur Lanjutan** - Integrasi Pencarian Semantik, Pengujian & Debugging, Integrasi VS Code
    - **Lab 10-12: Produksi & Praktik Terbaik** - Strategi Deploy, Monitoring & Observasi, Praktik Terbaik & Optimasi
  - **Teknologi Enterprise**: Framework FastMCP, PostgreSQL dengan pgvector, embedding Azure OpenAI, Azure Container Apps, Application Insights
  - **Fitur Lanjutan**: Row Level Security (RLS), pencarian semantik, akses data multi-tenant, embedding vektor, monitoring real-time

#### Standarisasi Terminologi - Konversi Modul ke Lab
- **Pembaruan Dokumentasi Komprehensif**: Memperbarui semua file README di 11-MCPServerHandsOnLabs secara sistematis untuk menggunakan terminologi "Lab" menggantikan "Modul"
  - **Judul Bagian**: Memperbarui "Apa yang Dicakup Modul Ini" menjadi "Apa yang Dicakup Lab Ini" di semua 13 lab
  - **Deskripsi Konten**: Mengubah "Modul ini menyediakan..." menjadi "Lab ini menyediakan..." di seluruh dokumentasi
  - **Tujuan Pembelajaran**: Memperbarui "Pada akhir modul ini..." menjadi "Pada akhir lab ini..."
  - **Tautan Navigasi**: Mengonversi semua referensi "Modul XX:" menjadi "Lab XX:" dalam lintas-referensi dan navigasi
  - **Pelacakan Penyelesaian**: Memperbarui "Setelah menyelesaikan modul ini..." menjadi "Setelah menyelesaikan lab ini..."
  - **Referensi Teknis Tersimpan**: Menjaga referensi modul Python dalam file konfigurasi (misalnya, `"module": "mcp_server.main"`)

#### Peningkatan Panduan Studi (study_guide.md)
- **Peta Kurikulum Visual**: Menambahkan bagian baru "11. Database Integration Labs" dengan visualisasi struktur lab yang komprehensif
- **Struktur Repository**: Memperbarui dari sepuluh menjadi sebelas bagian utama dengan deskripsi rinci 11-MCPServerHandsOnLabs
- **Panduan Jalur Pembelajaran**: Meningkatkan instruksi navigasi untuk mencakup bagian 00-11
- **Cakupan Teknologi**: Menambahkan detail integrasi FastMCP, PostgreSQL, dan layanan Azure
- **Hasil Pembelajaran**: Menekankan pengembangan server siap produksi, pola integrasi database, dan keamanan enterprise

#### Peningkatan Struktur README Utama
- **Terminologi Berbasis Lab**: Memperbarui README.md utama di 11-MCPServerHandsOnLabs agar konsisten menggunakan struktur "Lab"
- **Organisasi Jalur Pembelajaran**: Progresi jelas dari konsep dasar hingga implementasi lanjutan sampai deployment produksi
- **Fokus Dunia Nyata**: Penekanan pada pembelajaran praktis langsung dengan pola dan teknologi kelas enterprise

### Peningkatan Kualitas & Konsistensi Dokumentasi
- **Penekanan Pembelajaran Praktik**: Memperkuat pendekatan berbasis lab dan praktik di seluruh dokumentasi
- **Fokus Pola Enterprise**: Menyoroti implementasi siap produksi dan pertimbangan keamanan enterprise
- **Integrasi Teknologi**: Cakupan komprehensif layanan Azure modern dan pola integrasi AI
- **Progresi Pembelajaran**: Jalur terstruktur jelas dari konsep dasar ke deployment produksi

## 26 September 2025

### Peningkatan Studi Kasus - Integrasi GitHub MCP Registry

#### Studi Kasus (09-CaseStudy/) - Fokus Pengembangan Ekosistem
- **README.md**: Perluasan besar dengan studi kasus GitHub MCP Registry yang komprehensif
  - **Studi Kasus GitHub MCP Registry**: Studi kasus lengkap baru yang mengkaji peluncuran GitHub MCP Registry pada September 2025
    - **Analisis Masalah**: Pemeriksaan rinci tantangan penemuan dan deployment fragmentasi server MCP
    - **Arsitektur Solusi**: Pendekatan registry terpusat GitHub dengan instalasi VS Code satu-klik
    - **Dampak Bisnis**: Peningkatan terukur dalam onboarding dan produktivitas pengembang
    - **Nilai Strategis**: Fokus pada deployment agen modular dan interoperabilitas antar-alat
    - **Pengembangan Ekosistem**: Posisi sebagai platform dasar untuk integrasi agenik
  - **Struktur Studi Kasus Ditingkatkan**: Memperbarui ketujuh studi kasus dengan format konsisten dan deskripsi komprehensif
    - Agen Perjalanan Azure AI: Penekanan orkestrasi multi-agen
    - Integrasi Azure DevOps: Fokus otomasi alur kerja
    - Pengambilan Dokumentasi Real-Time: Implementasi klien konsol Python
    - Generator Rencana Studi Interaktif: Web app percakapan Chainlit
    - Dokumentasi Dalam Editor: Integrasi VS Code dan GitHub Copilot
    - Manajemen API Azure: Pola integrasi API enterprise
    - GitHub MCP Registry: Pengembangan ekosistem dan platform komunitas
  - **Kesimpulan Komprehensif**: Bagian kesimpulan yang ditulis ulang menyoroti tujuh studi kasus mencakup berbagai dimensi implementasi MCP
    - Integrasi Enterprise, Orkestrasi Multi-Agen, Produktivitas Pengembang
    - Pengembangan Ekosistem, Kategori Aplikasi Edukasi
    - Wawasan lebih dalam tentang pola arsitektur, strategi implementasi, dan praktik terbaik
    - Penekanan MCP sebagai protokol matang siap produksi

#### Pembaruan Panduan Studi (study_guide.md)
- **Peta Kurikulum Visual**: Memperbarui mindmap untuk memasukkan GitHub MCP Registry di bagian Studi Kasus
- **Deskripsi Studi Kasus**: Ditingkatkan dari deskripsi umum ke rincian tujuh studi kasus komprehensif
- **Struktur Repository**: Memperbarui bagian 10 untuk mencerminkan cakupan studi kasus lengkap dengan detail implementasi spesifik
- **Integrasi Changelog**: Menambahkan entri 26 September 2025 yang mendokumentasikan penambahan GitHub MCP Registry dan peningkatan studi kasus
- **Pembaruan Tanggal**: Memperbarui cap waktu footer untuk mencerminkan revisi terbaru (26 September 2025)

### Peningkatan Kualitas Dokumentasi
- **Peningkatan Konsistensi**: Standarisasi format dan struktur studi kasus di semua tujuh contoh
- **Cakupan Komprehensif**: Studi kasus mencakup skenario enterprise, produktivitas pengembang, dan pengembangan ekosistem
- **Posisi Strategis**: Memperkuat fokus MCP sebagai platform dasar untuk deployment sistem agentik
- **Integrasi Sumber Daya**: Memperbarui sumber daya tambahan untuk menyertakan tautan GitHub MCP Registry

## 15 September 2025

### Perluasan Topik Lanjutan - Transport Kustom & Rekayasa Konteks

#### Transport Kustom MCP (05-AdvancedTopics/mcp-transport/) - Panduan Implementasi Lanjutan Baru
- **README.md**: Panduan implementasi lengkap untuk mekanisme transport MCP kustom
  - **Transport Azure Event Grid**: Implementasi transport event-driven serverless komprehensif
    - Contoh C#, TypeScript, dan Python dengan integrasi Azure Functions
    - Pola arsitektur event-driven untuk solusi MCP skalabel
    - Penerima webhook dan penanganan pesan berbasis push
  - **Transport Azure Event Hubs**: Implementasi transport streaming throughput tinggi
    - Kapabilitas streaming real-time untuk skenario latensi rendah
    - Strategi partisi dan manajemen checkpoint
    - Pengelompokan pesan dan optimasi performa
  - **Pola Integrasi Enterprise**: Contoh arsitektural siap produksi
    - Pemrosesan MCP terdistribusi di banyak Azure Functions
    - Arsitektur transport hybrid menggabungkan beberapa tipe transport
    - Ketahanan pesan, keandalan, dan strategi penanganan kesalahan
  - **Keamanan & Monitoring**: Integrasi Azure Key Vault dan pola observabilitas
    - Otentikasi identitas terkelola dan akses prinsip least privilege
    - Telemetri Application Insights dan monitoring performa
    - Pemutus sirkuit dan pola toleransi kesalahan
  - **Framework Pengujian**: Strategi pengujian komprehensif untuk transport kustom
    - Pengujian unit dengan test doubles dan mocking framework
    - Pengujian integrasi dengan Azure Test Containers
    - Pertimbangan pengujian performa dan beban

#### Rekayasa Konteks (05-AdvancedTopics/mcp-contextengineering/) - Disiplin AI yang Berkembang
- **README.md**: Eksplorasi komprehensif rekayasa konteks sebagai bidang yang berkembang
  - **Prinsip Inti**: Berbagi konteks lengkap, kesadaran pengambilan keputusan aksi, dan manajemen jendela konteks
  - **Penyesuaian Protokol MCP**: Bagaimana desain MCP mengatasi tantangan rekayasa konteks
    - Batasan jendela konteks dan strategi pemuatan progresif
    - Penentuan relevansi dan pengambilan konteks dinamis
    - Penanganan konteks multi-modal dan pertimbangan keamanan
  - **Pendekatan Implementasi**: Arsitektur single-threaded vs. multi-agent
    - Teknik pemecahan konteks dan prioritisasi
    - Pemuatan konteks progresif dan strategi kompresi
    - Pendekatan berlapis konteks dan optimasi pengambilan
  - **Framework Pengukuran**: Metrik yang berkembang untuk evaluasi efektivitas konteks
    - Efisiensi input, performa, kualitas, dan pertimbangan pengalaman pengguna
    - Pendekatan eksperimental untuk optimasi konteks
    - Analisis kegagalan dan metodologi perbaikan

#### Pembaruan Navigasi Kurikulum (README.md)
- **Struktur Modul Ditingkatkan**: Memperbarui tabel kurikulum untuk memasukkan topik lanjutan baru
  - Menambahkan entri Rekayasa Konteks (5.14) dan Transport Kustom (5.15)
  - Format konsisten dan tautan navigasi di semua modul
  - Deskripsi diperbarui untuk mencerminkan cakupan konten saat ini

### Peningkatan Struktur Direktori
- **Standarisasi Penamaan**: Mengganti "mcp transport" menjadi "mcp-transport" untuk konsistensi dengan folder topik lanjutan lain
- **Organisasi Konten**: Semua folder 05-AdvancedTopics sekarang mengikuti pola penamaan konsisten (mcp-[topik])

### Peningkatan Kualitas Dokumentasi
- **Penyesuaian Spesifikasi MCP**: Semua konten baru merujuk pada Spesifikasi MCP 2025-06-18 saat ini
- **Contoh Multi-Bahasa**: Contoh kode lengkap dalam C#, TypeScript, dan Python
- **Fokus Enterprise**: Pola siap produksi dan integrasi cloud Azure sepanjang dokumentasi
- **Dokumentasi Visual**: Diagram Mermaid untuk visualisasi arsitektur dan alur

## 18 Agustus 2025

### Pembaruan Komprehensif Dokumentasi - Standar MCP 2025-06-18

#### Praktik Terbaik Keamanan MCP (02-Security/) - Modernisasi Lengkap
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Penulisan ulang lengkap selaras dengan Spesifikasi MCP 2025-06-18
  - **Persyaratan Wajib**: Menambahkan persyaratan HARUS/TIDAK HARUS eksplisit dari spesifikasi resmi dengan indikator visual jelas
  - **12 Praktik Keamanan Inti**: Restrukturisasi dari daftar 15 item menjadi domain keamanan komprehensif
    - Keamanan Token & Otentikasi dengan integrasi penyedia identitas eksternal
    - Manajemen Sesi & Keamanan Transport dengan persyaratan kriptografi
    - Perlindungan Ancaman Khusus AI dengan integrasi Microsoft Prompt Shields
    - Kontrol Akses & Izin dengan prinsip least privilege
    - Keamanan Konten & Monitoring dengan integrasi Azure Content Safety
    - Keamanan Rantai Pasokan dengan verifikasi komponen komprehensif
    - Keamanan OAuth & Pencegahan Confused Deputy dengan implementasi PKCE
    - Tanggap Insiden & Pemulihan dengan kapabilitas otomatisasi
    - Kepatuhan & Tata Kelola dengan kesesuaian regulasi
    - Kontrol Keamanan Lanjutan dengan arsitektur zero trust
    - Integrasi Ekosistem Keamanan Microsoft dengan solusi komprehensif
    - Evolusi Keamanan Berkelanjutan dengan praktik adaptif
  - **Solusi Keamanan Microsoft**: Panduan integrasi yang diperkuat untuk Prompt Shields, Azure Content Safety, Entra ID, dan GitHub Advanced Security
  - **Sumber Daya Implementasi**: Kategori tautan sumber daya komprehensif berdasarkan Dokumentasi Resmi MCP, Solusi Keamanan Microsoft, Standar Keamanan, dan Panduan Implementasi

#### Kontrol Keamanan Lanjutan (02-Security/) - Implementasi Enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Penulisan ulang total dengan kerangka kerja keamanan tingkat enterprise
  - **9 Domain Keamanan Komprehensif**: Perluasan dari kontrol dasar menjadi kerangka kerja enterprise terperinci
    - Otentikasi & Otorisasi Lanjutan dengan integrasi Microsoft Entra ID
    - Keamanan Token & Kontrol Anti-Passthrough dengan validasi komprehensif
    - Kontrol Keamanan Sesi dengan pencegahan pembajakan
    - Kontrol Keamanan Khusus AI dengan pencegahan prompt injection dan keracunan alat
    - Pencegahan Serangan Confused Deputy dengan keamanan proxy OAuth
    - Keamanan Eksekusi Alat dengan sandboxing dan isolasi
    - Kontrol Keamanan Rantai Pasokan dengan verifikasi ketergantungan
    - Kontrol Monitoring & Deteksi dengan integrasi SIEM
    - Tanggap Insiden & Pemulihan dengan kapabilitas otomatisasi
  - **Contoh Implementasi**: Menambahkan blok konfigurasi YAML dan contoh kode terperinci
  - **Integrasi Solusi Microsoft**: Cakupan menyeluruh layanan keamanan Azure, GitHub Advanced Security, dan manajemen identitas enterprise

#### Topik Keamanan Lanjutan (05-AdvancedTopics/mcp-security/) - Implementasi Siap Produksi
- **README.md**: Penulisan ulang lengkap untuk implementasi keamanan enterprise
  - **Penyesuaian Spesifikasi Saat Ini**: Diperbarui ke Spesifikasi MCP 2025-06-18 dengan persyaratan keamanan wajib
  - **Otentikasi Ditingkatkan**: Integrasi Microsoft Entra ID dengan contoh lengkap .NET dan Java Spring Security
  - **Integrasi Keamanan AI**: Implementasi Microsoft Prompt Shields dan Azure Content Safety dengan contoh Python terperinci
  - **Mitigasi Ancaman Lanjutan**: Contoh implementasi komprehensif untuk
    - Pencegahan Serangan Confused Deputy dengan PKCE dan validasi persetujuan pengguna
    - Pencegahan Passthrough Token dengan validasi audience dan manajemen token aman
- Pencegahan Pembajakan Sesi dengan pengikatan kriptografi dan analisis perilaku  
- **Integrasi Keamanan Perusahaan**: Pemantauan Azure Application Insights, pipeline deteksi ancaman, dan keamanan rantai pasokan  
- **Checklist Implementasi**: Pengendalian keamanan wajib vs. yang direkomendasikan dengan manfaat ekosistem keamanan Microsoft  

### Kualitas Dokumentasi & Penyelarasan Standar  
- **Referensi Spesifikasi**: Memperbarui semua referensi ke Spesifikasi MCP terkini 2025-06-18  
- **Ekosistem Keamanan Microsoft**: Panduan integrasi yang ditingkatkan di seluruh dokumentasi keamanan  
- **Implementasi Praktis**: Menambahkan contoh kode terperinci dalam .NET, Java, dan Python dengan pola perusahaan  
- **Organisasi Sumber Daya**: Klasifikasi menyeluruh dokumentasi resmi, standar keamanan, dan panduan implementasi  
- **Indikator Visual**: Penandaan jelas persyaratan wajib vs. praktik yang direkomendasikan  

#### Konsep Inti (01-CoreConcepts/) - Modernisasi Lengkap  
- **Pembaruan Versi Protokol**: Diperbarui untuk merujuk ke Spesifikasi MCP terkini 2025-06-18 dengan versi berbasis tanggal (format YYYY-MM-DD)  
- **Penyempurnaan Arsitektur**: Deskripsi yang ditingkatkan tentang Hosts, Clients, dan Servers untuk mencerminkan pola arsitektur MCP saat ini  
  - Hosts kini secara jelas didefinisikan sebagai aplikasi AI yang mengoordinasikan banyak koneksi klien MCP  
  - Clients dijelaskan sebagai penghubung protokol yang mempertahankan hubungan satu lawan satu dengan server  
  - Servers diperbaiki dengan skenario penyebaran lokal vs. jarak jauh  
- **Restrukturisasi Primitif**: Perombakan lengkap primitif server dan klien  
  - Primitif Server: Resources (sumber data), Prompts (template), Tools (fungsi yang dapat dijalankan) dengan penjelasan dan contoh terperinci  
  - Primitif Klien: Sampling (penyelesaian LLM), Elicitation (input pengguna), Logging (debugging/pemantauan)  
  - Diperbarui dengan pola metode penemuan (`*/list`), pengambilan (`*/get`), dan eksekusi (`*/call`) saat ini  
- **Arsitektur Protokol**: Memperkenalkan model arsitektur dua lapisan  
  - Lapisan Data: fondasi JSON-RPC 2.0 dengan manajemen siklus hidup dan primitif  
  - Lapisan Transportasi: STDIO (lokal) dan HTTP Streamable dengan SSE (jarak jauh) sebagai mekanisme transport  
- **Kerangka Kerja Keamanan**: Prinsip keamanan komprehensif termasuk persetujuan pengguna eksplisit, perlindungan privasi data, keamanan eksekusi alat, dan keamanan lapisan transportasi  
- **Pola Komunikasi**: Memperbarui pesan protokol untuk menunjukkan alur inisialisasi, penemuan, eksekusi, dan notifikasi  
- **Contoh Kode**: Menyegarkan contoh multi-bahasa (.NET, Java, Python, JavaScript) untuk mencerminkan pola SDK MCP saat ini  

#### Keamanan (02-Security/) - Perombakan Keamanan Komprehensif  
- **Penyelarasan Standar**: Penyelarasan penuh dengan persyaratan keamanan Spesifikasi MCP 2025-06-18  
- **Evolusi Otentikasi**: Terdokumentasi evolusi dari server OAuth kustom ke delegasi penyedia identitas eksternal (Microsoft Entra ID)  
- **Analisis Ancaman Khusus AI**: Penyempurnaan liputan vektor serangan AI modern  
  - Skenario serangan injeksi prompt terperinci dengan contoh dunia nyata  
  - Mekanisme keracunan alat dan pola serangan "rug pull"  
  - Keracunan jendela konteks dan serangan kebingungan model  
- **Solusi Keamanan AI Microsoft**: Liputan komprehensif ekosistem keamanan Microsoft  
  - AI Prompt Shields dengan deteksi canggih, spotlighting, dan teknik delimiter  
  - Pola integrasi Azure Content Safety  
  - GitHub Advanced Security untuk perlindungan rantai pasokan  
- **Mitigasi Ancaman Tingkat Lanjut**: Kontrol keamanan terperinci untuk  
  - Pembajakan sesi dengan skenario serangan khusus MCP dan persyaratan ID sesi kriptografi  
  - Masalah "confused deputy" dalam skenario proxy MCP dengan persyaratan persetujuan eksplisit  
  - Kerentanan token passthrough dengan kontrol validasi wajib  
- **Keamanan Rantai Pasokan**: Liputan rantai pasokan AI diperluas termasuk model fondasi, layanan embeddings, penyedia konteks, dan API pihak ketiga  
- **Keamanan Fondasi**: Integrasi ditingkatkan dengan pola keamanan perusahaan termasuk arsitektur zero trust dan ekosistem keamanan Microsoft  
- **Organisasi Sumber Daya**: Mengkategorikan tautan sumber daya komprehensif berdasarkan jenis (Dokumentasi Resmi, Standar, Riset, Solusi Microsoft, Panduan Implementasi)  

### Peningkatan Kualitas Dokumentasi  
- **Tujuan Pembelajaran Terstruktur**: Tujuan pembelajaran yang ditingkatkan dengan hasil yang spesifik dan dapat ditindaklanjuti  
- **Rujukan Silang**: Menambahkan tautan antar topik keamanan dan konsep inti terkait  
- **Informasi Terkini**: Memperbarui semua referensi tanggal dan tautan spesifikasi ke standar saat ini  
- **Panduan Implementasi**: Menambahkan panduan implementasi spesifik dan dapat ditindaklanjuti di kedua bagian  

## 16 Juli 2025  

### Peningkatan README dan Navigasi  
- Merancang ulang total navigasi kurikulum di README.md  
- Mengganti tag `<details>` dengan format berbasis tabel yang lebih mudah diakses  
- Membuat pilihan tata letak alternatif dalam folder baru "alternative_layouts"  
- Menambahkan contoh navigasi berbasis kartu, gaya tab, dan gaya akordion  
- Memperbarui bagian struktur repository untuk menyertakan semua file terbaru  
- Memperkuat bagian "Cara Menggunakan Kurikulum Ini" dengan rekomendasi yang jelas  
- Memperbarui tautan spesifikasi MCP agar mengarah ke URL yang benar  
- Menambahkan bagian Rekayasa Konteks (5.14) ke struktur kurikulum  

### Pembaruan Panduan Studi  
- Merevisi total panduan studi agar sesuai dengan struktur repository saat ini  
- Menambahkan bagian baru untuk MCP Clients dan Tools, serta MCP Servers Populer  
- Memperbarui Peta Kurikulum Visual untuk mencerminkan semua topik secara akurat  
- Memperkuat deskripsi Topik Lanjutan untuk mencakup semua area khusus  
- Memperbarui bagian Studi Kasus untuk mencerminkan contoh nyata  
- Menambahkan changelog komprehensif ini  

### Kontribusi Komunitas (06-CommunityContributions/)  
- Menambahkan informasi terperinci tentang server MCP untuk generasi gambar  
- Menambahkan bagian komprehensif tentang penggunaan Claude dalam VSCode  
- Menambahkan instruksi pengaturan dan penggunaan klien terminal Cline  
- Memperbarui bagian klien MCP untuk menyertakan semua opsi klien populer  
- Memperkuat contoh kontribusi dengan sampel kode yang lebih akurat  

### Topik Lanjutan (05-AdvancedTopics/)  
- Mengorganisir semua folder topik khusus dengan penamaan konsisten  
- Menambahkan materi dan contoh rekayasa konteks  
- Menambahkan dokumentasi integrasi agen Foundry  
- Memperkuat dokumentasi integrasi keamanan Entra ID  

## 11 Juni 2025  

### Pembuatan Awal  
- Merilis versi pertama kurikulum MCP untuk Pemula  
- Membuat struktur dasar untuk 10 bagian utama  
- Mengimplementasikan Peta Kurikulum Visual untuk navigasi  
- Menambahkan proyek contoh awal dalam berbagai bahasa pemrograman  

### Memulai (03-GettingStarted/)  
- Membuat contoh implementasi server pertama  
- Menambahkan panduan pengembangan klien  
- Menyertakan instruksi integrasi klien LLM  
- Menambahkan dokumentasi integrasi VS Code  
- Mengimplementasikan contoh server Server-Sent Events (SSE)  

### Konsep Inti (01-CoreConcepts/)  
- Menambahkan penjelasan terperinci arsitektur klien-server  
- Membuat dokumentasi komponen utama protokol  
- Mendokumentasikan pola pengiriman pesan dalam MCP  

## 23 Mei 2025  

### Struktur Repository  
- Menginisialisasi repository dengan struktur folder dasar  
- Membuat file README untuk setiap bagian utama  
- Menyiapkan infrastruktur terjemahan  
- Menambahkan aset gambar dan diagram  

### Dokumentasi  
- Membuat README.md awal dengan gambaran kurikulum  
- Menambahkan CODE_OF_CONDUCT.md dan SECURITY.md  
- Menyiapkan SUPPORT.md dengan panduan untuk mendapatkan bantuan  
- Membuat struktur awal panduan studi  

## 15 April 2025  

### Perencanaan dan Kerangka Kerja  
- Perencanaan awal untuk kurikulum MCP untuk Pemula  
- Mendefinisikan tujuan pembelajaran dan audiens target  
- Menguraikan struktur 10 bagian kurikulum  
- Mengembangkan kerangka konseptual untuk contoh dan studi kasus  
- Membuat prototipe contoh awal untuk konsep kunci

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->