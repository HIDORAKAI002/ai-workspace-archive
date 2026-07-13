# Changelog: Kurikulum MCP untuk Pemula

Dokumen ini berfungsi sebagai catatan semua perubahan signifikan yang dilakukan pada kurikulum Model Context Protocol (MCP) untuk Pemula. Perubahan didokumentasikan dalam urutan kronologis terbalik (perubahan terbaru di awal).

## 2 Juli 2026

### Pelajaran Baru: Kandidat Rilis Spesifikasi MCP 2026-07-28

Menambahkan cakupan kandidat rilis spesifikasi MCP `2026-07-28` yang akan datang (diumumkan 21 Mei 2026; rilis final dijadwalkan 28 Juli 2026), dirangkum dari [posting blog pengumuman resmi](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Baseline kurikulum tetap **Spesifikasi MCP 2025-11-25** sampai versi baru dirilis, jadi ini disajikan sebagai panduan ke depan dan bukan penulisan ulang pelajaran yang sudah ada.

- **Baru**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — pelajaran lengkap yang membahas inti protokol tanpa status (penghapusan handshake `initialize` dan `Mcp-Session-Id`), header routing baru `Mcp-Method`/`Mcp-Name`, metadata caching `ttlMs`/`cacheScope`, W3C Trace Context di `_meta`, kerangka Ekstensi formal (Aplikasi MCP dan ekstensi Tasks baru), enam SEP penguatan otorisasi, penghapusan Roots/Sampling/Logging, dan peralihan ke JSON Schema 2020-12 penuh untuk skema alat.
- **Diperbarui** dengan catatan ke depan yang menghubungkan ke pelajaran baru:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): catatan versi protokol, bagian Sampling/Roots/Logging/Tasks, dan "Apa Selanjutnya"
  - [02-Security/README.md](./02-Security/README.md): catatan penguatan otorisasi
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): catatan transport tanpa status
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): catatan penghapusan Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): catatan penghapusan Logging dan ekstensi Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): catatan transport tanpa status/routing sesi
  - [README.md](./README.md): catatan "Melihat ke depan" di bagian spesifikasi dan entri baru `1.1` dalam tabel modul kurikulum
  - [study_guide.md](./study_guide.md): butir ke depan di bawah tinjauan Konsep Inti dan catatan tambahan bertanggal
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): catatan pada peta transport `mcp-session-id` menjelang model permintaan tanpa status
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): catatan tinjauan modul tentang penghapusan Root Contexts/Sampling dan ekstensi Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): catatan penguatan otorisasi

## 24 Juni 2026

### Pelajaran Baru: Menggunakan MCP dalam aplikasi Copilot

- [Bagian Tooling](./12-tooling/README.md) Menambahkan bagian tooling.
- [MCP dalam aplikasi Copilot](./12-tooling/01-copilot-app/README.md)

## 16 Juni 2026

### Penyelarasan Spesifikasi MCP & Validasi Sampel

Memvalidasi kurikulum terhadap **Spesifikasi MCP 2025-11-25** saat ini dan SDK resmi terbaru, lalu memperbaiki referensi spesifikasi yang kadaluarsa dan memastikan contoh inti masih dapat dibangun dan dijalankan.

#### Koreksi Versi Spesifikasi (2025-06-18 / 2025-03-26 → 2025-11-25)

Memperbarui konten bahasa Inggris yang masih mengklaim revisi spesifikasi lama sebagai standar *saat ini/terbaru*, dan mengarahkan ulang tautan ke jalur spesifikasi kanonik `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Memperbarui banner "Standar Saat Ini", pengantar, judul prinsip keamanan inti, judul persyaratan wajib, bagian Microsoft Entra ID, tautan Referensi & Sumber Daya, dan nota keamanan penutup (8 referensi) ke 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Memperbarui tautan spesifikasi Sumber Daya Tambahan dan banner "Standar Saat Ini" ke 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Mengganti tautan `2025-03-26` lama tentang keamanan dan kepercayaan dengan halaman praktik terbaik keamanan 2025-11-25 saat ini
- **03-GettingStarted/14-sampling/README.md**: Memperbarui tautan dokumentasi sampling resmi ke 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Memperbarui referensi spesifikasi MCP saat ini dalam bentuk waktu sekarang dan tautan spesifikasi Sumber Daya Tambahan ke 2025-11-25 (catatan penghapusan SSE historis tetap dipertahankan untuk akurasi)

#### Validasi Sampel Terhadap SDK Saat Ini

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` menyelesaikan `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` lulus tanpa kesalahan tipe — API `McpServer`/`StdioServerTransport` yang ada tetap valid
- **Python (03-GettingStarted/01-first-server/solution/python)**: Divalidasi dalam `.venv` terisolasi dengan `mcp[cli]` (1.27.2); `py_compile` lulus dan `FastMCP.list_tools()` mengembalikan alat `add` dan `subtract` dengan benar
- Memastikan semua rentang versi contoh `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) resolve dengan bersih ke `1.29.0` saat ini tanpa perubahan API yang merusak

#### Penyelarasan Pin Dependensi (menutup celah versi)

Memperbarui pin SDK yang kadaluarsa sehingga setiap contoh mengikuti rilis MCP saat ini, sesuai konvensi repo secara keseluruhan:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Memperbarui `@modelcontextprotocol/sdk` dari `^1.8.0` → `>=1.26.0` dan memperbarui deskripsi paket yang kadaluarsa `"updated for MCP 2025-06-18"` menjadi `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** dan **lab4/code/github_mcp_server/pyproject.toml**: Memperbarui pin `mcp==1.23.0` → `mcp>=1.26.0`; menghasilkan ulang kedua berkas `uv.lock` (`uv lock`) sehingga file kunci resolve ke `mcp 1.27.2` saat ini dan tetap sinkron dengan manifes

#### Analisis Celah Kurikulum — Cakupan Fitur Spesifikasi Terbaru

Memastikan kurikulum sudah mencakup semua primitif yang diperkenalkan/diperluas di MCP 2025-11-25, sehingga tidak ada celah konten yang tersisa:
- **Sampling**: Pelajaran 03-GettingStarted/14-sampling ditambah 05-AdvancedTopics/mcp-sampling
- **Elicitation (termasuk mode URL)**: Didokumentasikan di 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Didokumentasikan di 00-Introduction, 01-CoreConcepts, dan 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimental, operasi jangka panjang)**: Didokumentasikan di 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Anotasi Alat** (`readOnlyHint` / `destructiveHint`): Didokumentasikan di 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features

### Penguatan Keamanan & Perbaikan Kerentanan Dependensi

Melakukan pemeriksaan keamanan penuh pada setiap manifes dependensi dan kode sumber contoh, lalu memperbaiki semua advisori npm yang dilaporkan dan satu temuan tingkat kode. Setelah perbaikan, `npm audit` melaporkan **0 kerentanan** di setiap direktori yang diaudit.

#### Kerentanan Dependensi npm (transitif) — Diperbaiki

Memeriksa semua 15 file `package-lock.json` yang dikomit. Kerentanan terbatas pada dependensi transitif yang dibawa oleh alat pengembang MCP Inspector, klien OpenAI, dan SDK MCP; semuanya sekarang terselesaikan tanpa merusak contoh:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** dan **lab3/code/weather_mcp/inspector**: Memperbarui `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), yang menghapus advisori `ajv`, `brace-expansion`, `diff`, `path-to-regexp` dan `ws` yang dibundel. Menambahkan entri `overrides` npm memaksa `shell-quote@1.8.4` yang sudah diperbaiki untuk menghilangkan advisori kritis tersisa yang dibawa oleh `concurrently`; menghasilkan ulang kedua file kunci (sekarang 0 kerentanan)
- **03-GettingStarted/samples/typescript**: `npm audit fix` memperbarui `qs` transitif (moderate) ke rilis terbaru yang diperbaiki
- **03-GettingStarted/samples/javascript**: `npm audit fix` memperbarui `hono` transitif (moderate) ke rilis terbaru yang diperbaiki
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` memperbarui `form-data` transitif (tinggi) ke rilis terbaru yang diperbaiki
- **03-GettingStarted/11-simple-auth/solution/typescript**: Membuat `package-lock.json` yang hilang sehingga proyek dapat direproduksi dan diaudit (0 kerentanan)

#### Perbaikan Keamanan Tingkat Kode (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Menghapus `shell=True` dari alat `open_in_vscode`. `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` sebelumnya memungkinkan metakarakter shell di jalur folder diinterpretasikan oleh `cmd.exe` (vektor injeksi perintah). Kini meluncurkan `Code.exe` yang sudah di-resolve langsung dengan folder sebagai argumen—tanpa shell—yang secara fungsional setara dan aman

#### Audit Dependensi Python

- Memeriksa setiap set persyaratan Python dengan `pip-audit`. `05-AdvancedTopics` dan `03-GettingStarted/samples/python` melaporkan **tidak ada kerentanan yang diketahui** (rentang `mcp` / `httpx` / `pydantic` / `python-dotenv` mereka resolve ke rilis terbaru yang sudah diperbaiki)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` menandai dependensi transitif **`werkzeug` 3.1.1** dengan tiga advisori DoS `safe_join` atas nama perangkat Windows — `CVE-2025-66221`, `CVE-2026-21860`, dan `CVE-2026-27199` (semuanya sudah diperbaiki di 3.1.6). Menambahkan pin keamanan eksplisit `werkzeug>=3.1.6` agar rilis yang sudah diperbaiki terresolve; memverifikasi batasan resolve dengan bersih pada tumpukan `chainlit` / `mcp` / `semantic-kernel`

### Penggantian Nama Produk

Memperbarui semua konten kurikulum untuk mencerminkan penggantian nama produk Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Memperbarui tautan komunitas Discord
- **AGENTS.md**: Memperbarui referensi server Discord
- **README.md**: Memperbarui referensi ekosistem teknologi
- **study_guide.md**: Memperbarui referensi studi kasus
- **05-AdvancedTopics/README.md**: Memperbarui judul dan deskripsi Modul 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Memperbarui header dan deskripsi bagian
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Pembaruan judul modul penuh dan konten
- **05-AdvancedTopics/mcp-security-entra/README.md**: Memperbarui tautan referensi silang
- **07-LessonsfromEarlyAdoption/README.md**: Memperbarui referensi studi kasus
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Memperbarui header Bagian 9, lencana, dan kemampuan
- **08-BestPractices/README.md**: Memperbarui tautan komunitas Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Memperbarui referensi saluran Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Memperbarui referensi deployment model
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Memperbarui tabel Layanan AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Memperbarui referensi sumber daya

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension untuk VS Code

- **README.md**: Referensi kurikulum utama diperbarui
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Judul modul, gambaran, dan semua header modul diperbarui
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Judul, tujuan pembelajaran, instruksi pengaturan, dan sumber daya diperbarui
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Judul, tujuan pembelajaran, tabel host MCP, dan referensi silang diperbarui
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Judul, lencana, prasyarat, dan sumber daya diperbarui
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Referensi Agent Builder dan tautan umpan balik diperbarui
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Prasyarat dan referensi ekstensi diperbarui

---

## 11 April 2026

### Pelajaran Baru, Perbaikan Dokumentasi, dan Pembaruan Ketergantungan

#### Konten Kurikulum Baru Ditambahkan

**Modul 05 - Topik Lanjutan**
- **Pelajaran 5.17: Penalaran Multi-Agen Adversarial dengan MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Panduan komprehensif baru mengenai pola debat adversarial untuk sistem multi-agen
  - Diagram arsitektur Mermaid: dua agen → server MCP bersama → transkrip debat → hakim → putusan
  - Server alat MCP bersama (`web_search` + `run_python`) diimplementasikan dalam Python dan TypeScript
  - Prompt sistem yang berlawanan (UNTUK / MELAWAN / Hakim) dengan persyaratan penggunaan alat yang eksplisit
  - Pengatur debat dalam Python, TypeScript, dan C# yang mengelola putaran dan mengarahkan argumen
  - Pengkabelan MCP `ClientSession` untuk pengatur agar panggilan alat nyata dapat dilakukan
  - Tabel kasus penggunaan (deteksi halusinasi, pemodelan ancaman, tinjauan desain API, verifikasi fakta, pemilihan teknologi)
  - Pertimbangan keamanan: eksekusi di sandbox, validasi panggilan alat, pembatasan laju, pencatatan audit
  - Latihan terstruktur dengan tiga skenario praktis (tinjauan kode, keputusan arsitektur, moderasi konten)

#### Perbaikan Dokumentasi

**Modul 03 - Memulai**
- **05-stdio-server/README.md**: Memperbaiki contoh server stdio TypeScript yang tidak lengkap — menambahkan instansiasi transport yang hilang (`new StdioServerTransport()`) dan panggilan `server.connect(transport)` agar sesuai dengan contoh Python dan .NET di bagian yang sama
- **14-sampling/README.md**: Memperbaiki typo — mengoreksi `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Pembaruan Kurikulum

**README.md Utama**
- Menambahkan entri 5.17 (Penalaran Multi-Agen Adversarial dengan MCP) ke tabel kurikulum dengan tautan langsung ke pelajaran baru

**05-AdvancedTopics/README.md**
- Menambahkan baris Pelajaran 5.17 ke tabel pelajaran

**study_guide.md**
- Menambahkan topik Penalaran Multi-Agen Adversarial ke peta pikiran dan deskripsi prosa Topik Lanjutan

#### Perbaikan Kode dan Keamanan

**Modul 05 - Agen Adversarial (`mcp-adversarial-agents`)**
- **Perbaikan keamanan — injeksi perintah**: Mengganti interpolasi shell `execSync` dengan `execFile` + `promisify` dalam alat TypeScript `run_python`, menghilangkan permukaan injeksi perintah (kode yang dikontrol LLM sekarang diteruskan sebagai elemen argv literal tanpa keterlibatan shell)
- **Pengkabelan siklus alat MCP**: Memperbarui pengatur debat Python untuk menggunakan klien `AsyncAnthropic` (menggantikan `Anthropic` sinkron yang memblokir), meneruskan `ClientSession` langsung ke setiap giliran agen, mengambil definisi alat melalui `session.list_tools()` setiap giliran, dan mengirim blok `tool_use` melalui `session.call_tool()` dalam siklus hingga model menghasilkan respons teks akhir

#### Pembaruan Ketergantungan

- Meningkatkan versi `hono` ke 4.12.12 di berbagai paket (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Meningkatkan `@hono/node-server` dari 1.19.11 ke 1.19.13 di paket TypeScript
- Meningkatkan `cryptography` dari 46.0.5 ke 46.0.7 di paket Python (lab 3 dan 4 10-StreamliningAIWorkflows)
- Meningkatkan `lodash` dari 4.17.23 ke 4.18.1 di pemeriksa 10-StreamliningAIWorkflows

#### Terjemahan

- Menyinkronkan terjemahan untuk lebih dari 48 bahasa dengan perubahan sumber terbaru (pembaruan i18n)

---

## 5 Februari 2026

### Peningkatan Validasi dan Navigasi Seluruh Repositori

#### Konten Kurikulum Baru Ditambahkan

**Modul 03 - Memulai**
- **12-mcp-hosts/README.md**: Panduan komprehensif baru untuk pengaturan host MCP
  - Contoh konfigurasi Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Template konfigurasi JSON untuk semua host utama
  - Tabel perbandingan jenis transportasi (stdio, SSE/HTTP, WebSocket)
  - Pemecahan masalah masalah koneksi umum
  - Praktik terbaik keamanan untuk konfigurasi host

- **13-mcp-inspector/README.md**: Panduan debugging baru untuk MCP Inspector
  - Metode instalasi (npx, npm global, dari sumber)
  - Menghubungkan ke server melalui stdio dan HTTP/SSE
  - Pengujian alat, sumber daya, dan alur kerja prompt
  - Integrasi VS Code dengan MCP Inspector
  - Skenario debugging umum dengan solusi

**Modul 04 - Implementasi Praktis**
- **pagination/README.md**: Panduan implementasi pagination baru
  - Pola pagination berbasis kursor dalam Python, TypeScript, Java
  - Penanganan pagination sisi klien
  - Strategi desain kursor (opas vs terstruktur)
  - Rekomendasi optimisasi performa

**Modul 05 - Topik Lanjutan**
- **mcp-protocol-features/README.md**: Deep dive fitur protokol baru
  - Implementasi notifikasi kemajuan
  - Pola pembatalan permintaan
  - Template sumber daya dengan pola URI
  - Manajemen siklus hidup server
  - Kontrol tingkat pencatatan
  - Pola penanganan kesalahan dengan kode JSON-RPC

#### Perbaikan Navigasi (lebih dari 24 file diperbarui)

**README Modul Utama**
 Kini menautkan ke pelajaran pertama DAN modul berikutnya

**Sub-file Keamanan 02**
- Semua 5 dokumen keamanan pelengkap kini memiliki navigasi "Apa Selanjutnya":

**File Studi Kasus 09**
- Semua file studi kasus kini memiliki navigasi berurutan:

**Lab 10-StreamliningAI**
Menambahkan bagian Apa Selanjutnya pada gambaran Modul 10 dan Modul 11

#### Perbaikan Kode dan Konten

**Pembaruan SDK dan Ketergantungan**
Memperbaiki versi openai kosong menjadi `^4.95.0`
Memperbarui SDK dari `^1.8.0` menjadi `>=1.26.0`
Memperbarui pin versi mcp menjadi `>=1.26.0`

**Perbaikan Kode**
Memperbaiki model tidak valid `gpt-4o-mini` menjadi `gpt-4.1-mini`

**Perbaikan Konten**
Memperbaiki tautan rusak `READMEmd` → `README.md`, memperbaiki header kurikulum `Module 1-3` → `Module 0-3`, memperbaiki path case-sensitive
Menghapus konten duplikat Studi Kasus 5 yang korup

**Peningkatan Panduan Pemula**
Menambahkan pengenalan yang tepat, tujuan pembelajaran, dan prasyarat untuk pemula

#### Pembaruan Kurikulum

**README.md Utama**
- Menambahkan entri 3.12 (Host MCP), 3.13 (Inspektur MCP), 4.1 (Pagination), 5.16 (Fitur Protokol) ke tabel kurikulum

**README Modul**
Menambahkan pelajaran 12 dan 13 ke daftar pelajaran
Menambahkan bagian Panduan Praktis dengan tautan pagination
Menambahkan pelajaran 5.15 (Transportasi Kustom) dan 5.16 (Fitur Protokol)

**study_guide.md**
- Memperbarui peta pikiran dengan semua topik baru: Pengaturan Host MCP, Inspektur MCP, Strategi Pagination, Deep Dive Fitur Protokol

## 28 Jan 2026

### Tinjauan Kepatuhan Spesifikasi MCP 2025-11-25

#### Penyempurnaan Konsep Inti (01-CoreConcepts/)
- **Primtif Klien Baru - Roots**: Menambahkan dokumentasi komprehensif tentang primitif klien Roots, memungkinkan server memahami batas sistem berkas dan izin akses
- **Anotasi Alat**: Menambahkan dokumentasi tentang anotasi perilaku alat (`readOnlyHint`, `destructiveHint`) untuk keputusan eksekusi alat lebih baik
- **Pemanggilan Alat dalam Sampling**: Memperbarui dokumentasi Sampling untuk menyertakan parameter `tools` dan `toolChoice` untuk pemanggilan alat yang dipandu model selama permintaan sampling
- **Elisitasi Mode URL**: Menambahkan dokumentasi tentang elisitasi berbasis URL untuk interaksi web eksternal yang diinisiasi server
- **Tugas (Eksperimental)**: Menambahkan bagian baru yang mendokumentasikan fitur Tugas eksperimental untuk pembungkus eksekusi tahan lama dan pengambilan hasil tertunda
- **Dukungan Ikon**: Mencatat bahwa alat, sumber daya, template sumber daya, dan prompt kini dapat menyertakan ikon sebagai metadata tambahan

#### Pembaruan Dokumentasi
- **README.md**: Menambahkan referensi versi Spesifikasi MCP 2025-11-25 dan penjelasan versioning berdasar tanggal
- **study_guide.md**: Memperbarui peta kurikulum untuk memasukkan Tugas dan Anotasi Alat di bagian Konsep Inti; memperbarui cap waktu dokumen

#### Verifikasi Kepatuhan Spesifikasi
- **Versi Protokol**: Memverifikasi semua dokumentasi mengacu pada Spesifikasi MCP 2025-11-25 terkini
- **Keselarasan Arsitektur**: Mengonfirmasi akurasi dokumentasi arsitektur dua lapis (Lapisan Data + Lapisan Transport)
- **Dokumentasi Primitif**: Memvalidasi primitif server (Sumber Daya, Prompt, Alat) dan primitif klien (Sampling, Elisitasi, Logging, Roots)
- **Mekanisme Transportasi**: Memverifikasi akurasi dokumentasi transportasi STDIO dan HTTP Streamable
- **Panduan Keamanan**: Mengonfirmasi keselarasan dengan dokumentasi Praktik Terbaik Keamanan MCP saat ini

#### Fitur Kunci MCP 2025-11-25 yang Didokumentasikan
- **Penemuan OpenID Connect**: Penemuan server auth melalui OIDC
- **Dokumen Metadata OAuth Client ID**: Mekanisme pendaftaran klien yang direkomendasikan
- **JSON Schema 2020-12**: Dialek default untuk definisi skema MCP
- **Sistem Tingkat SDK**: Persyaratan formal untuk dukungan fitur dan pemeliharaan SDK
- **Struktur Tata Kelola**: Formalisasi Kelompok Kerja dan Kelompok Minat dalam tata kelola MCP

### Pembaruan Besar Dokumentasi Keamanan (02-Security/)

#### Integrasi Workshop MCP Security Summit (Sherpa)
- **Sumber Pelatihan Praktis Baru**: Menambahkan integrasi komprehensif dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) di seluruh dokumentasi keamanan
- **Cakupan Rute Ekspedisi**: Mendokumentasikan seluruh progresi dari Base Camp ke Summit
- **Keselarasan OWASP**: Semua panduan keamanan kini memetakan risiko OWASP MCP Azure Security Guide

#### Integrasi OWASP MCP Top 10
- **Bagian Baru**: Menambahkan tabel Risiko Keamanan OWASP MCP Top 10 dengan mitigasi Azure pada README Keamanan utama
- **Dokumentasi Berbasis Risiko**: Memperbarui mcp-security-controls-2025.md dengan referensi risiko OWASP MCP untuk setiap domain keamanan
- **Arsitektur Referensi**: Menautkan ke arsitektur referensi OWASP MCP Azure Security Guide dan pola implementasi

#### File Keamanan yang Diperbarui
- **README.md**: Menambahkan ikhtisar Workshop Sherpa, tabel rute ekspedisi, ringkasan risiko OWASP MCP Top 10, dan bagian pelatihan praktis
- **mcp-security-controls-2025.md**: Memperbarui header ke Februari 2026, menambahkan referensi risiko OWASP (MCP01-MCP08), memperbaiki ketidakkonsistenan versi spesifikasi
- **mcp-security-best-practices-2025.md**: Menambahkan bagian sumber daya Sherpa dan OWASP, memperbarui timestamp
- **mcp-best-practices.md**: Menambahkan bagian pelatihan praktis dengan tautan Sherpa dan OWASP
- **azure-content-safety-implementation.md**: Menambahkan referensi OWASP MCP06, keselarasan Sherpa Camp 3, dan bagian sumber daya tambahan

#### Tautan Sumber Daya Baru Ditambahkan
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Halaman risiko OWASP MCP individual (MCP01-MCP10)

### Keselarasan Spesifikasi MCP 2025-11-25 Seluruh Kurikulum

#### Modul 03 - Memulai
- **Dokumentasi SDK**: Menambahkan Go SDK ke daftar SDK resmi; memperbarui semua referensi SDK agar sesuai dengan Spesifikasi MCP 2025-11-25
- **Penjelasan Transportasi**: Memperbarui deskripsi transportasi STDIO dan HTTP Streaming dengan referensi spesifikasi eksplisit

#### Modul 04 - Implementasi Praktis
- **Pembaruan SDK**: Menambahkan Go SDK; memperbarui daftar SDK dengan referensi versi spesifikasi
- **Spesifikasi Otorisasi**: Memperbarui tautan spesifikasi Otorisasi MCP ke versi 2025-11-25 saat ini

#### Modul 05 - Topik Lanjutan
- **Fitur Baru**: Menambahkan catatan tentang fitur baru Spesifikasi MCP 2025-11-25 (Tugas, Anotasi Alat, Elisitasi Mode URL, Roots)
- **Sumber Daya Keamanan**: Menambahkan tautan OWASP MCP Top 10 dan workshop Sherpa ke referensi tambahan

#### Modul 06 - Kontribusi Komunitas
- **Daftar SDK**: Menambahkan SDK Swift dan Rust; memperbarui tautan spesifikasi ke 2025-11-25
- **Referensi Spesifikasi**: Memperbarui tautan Spesifikasi MCP ke URL spesifikasi langsung

#### Modul 07 - Pelajaran dari Adopsi Awal

- **Pembaruan Sumber Daya**: Menambahkan tautan Spesifikasi MCP 2025-11-25 dan OWASP MCP Top 10 ke sumber daya tambahan  

#### Modul 08 - Praktik Terbaik  
- **Versi Spesifikasi**: Memperbarui referensi Spesifikasi MCP ke versi 2025-11-25  
- **Sumber Daya Keamanan**: Menambahkan OWASP MCP Top 10 dan lokakarya Sherpa ke referensi tambahan  

#### Modul 10 - Menyederhanakan Alur Kerja AI  
- **Pembaruan Lencana**: Mengganti lencana versi MCP dari versi SDK (1.9.3) ke versi spesifikasi (2025-11-25)  
- **Tautan Sumber Daya**: Memperbarui tautan Spesifikasi MCP; menambahkan OWASP MCP Top 10  

#### Modul 11 - Lab Praktik MCP Server  
- **Referensi Spesifikasi**: Memperbarui tautan Spesifikasi MCP ke versi 2025-11-25  
- **Sumber Daya Keamanan**: Menambahkan OWASP MCP Top 10 ke sumber daya resmi  

## 18 Desember 2025  

### Pembaruan Dokumentasi Keamanan - Spesifikasi MCP 2025-11-25  

#### Praktik Keamanan Terbaik MCP (02-Security/mcp-best-practices.md) - Pembaruan Versi Spesifikasi  
- **Pembaruan Versi Protokol**: Memperbarui referensi ke Spesifikasi MCP terbaru 2025-11-25 (dirilis 25 November 2025)  
  - Memperbarui semua referensi versi spesifikasi dari 2025-06-18 ke 2025-11-25  
  - Memperbarui referensi tanggal dokumen dari 18 Agustus 2025 ke 18 Desember 2025  
  - Memastikan semua URL spesifikasi mengarah ke dokumentasi terkini  
- **Validasi Konten**: Validasi menyeluruh atas praktik keamanan terbaik sesuai standar terbaru  
  - **Solusi Keamanan Microsoft**: Memastikan terminologi dan tautan terkini untuk Prompt Shields (sebelumnya "deteksi risiko jailbreak"), Azure Content Safety, Microsoft Entra ID, dan Azure Key Vault  
  - **Keamanan OAuth 2.1**: Memastikan keselarasan dengan praktik keamanan OAuth terbaru  
  - **Standar OWASP**: Memvalidasi referensi OWASP Top 10 untuk LLM tetap terkini  
  - **Layanan Azure**: Memastikan semua tautan dokumentasi Microsoft Azure dan praktik terbaik  
- **Keselarasan Standar**: Semua standar keamanan yang dirujuk dipastikan terkini  
  - Kerangka Manajemen Risiko AI NIST  
  - ISO 27001:2022  
  - Praktik Terbaik Keamanan OAuth 2.1  
  - Kerangka kerja keamanan dan kepatuhan Azure  
- **Sumber Daya Implementasi**: Memvalidasi semua tautan dan sumber daya panduan implementasi  
  - Pola autentikasi Azure API Management  
  - Panduan integrasi Microsoft Entra ID  
  - Manajemen rahasia Azure Key Vault  
  - Pipeline DevSecOps dan solusi pemantauan  

### Jaminan Kualitas Dokumentasi  
- **Kepatuhan Spesifikasi**: Memastikan semua persyaratan keamanan MCP wajib (MUST/MUST NOT) sesuai dengan spesifikasi terbaru  
- **Keterkinian Sumber Daya**: Memverifikasi semua tautan eksternal ke dokumentasi Microsoft, standar keamanan, dan panduan implementasi  
- **Cakupan Praktik Terbaik**: Memastikan cakupan menyeluruh tentang autentikasi, otorisasi, ancaman khusus AI, keamanan rantai pasokan, dan pola perusahaan  

## 6 Oktober 2025  

### Perluasan Bagian Memulai – Penggunaan Server Lanjutan & Autentikasi Sederhana  

#### Penggunaan Server Lanjutan (03-GettingStarted/10-advanced)  
- **Bab Baru Ditambahkan**: Memperkenalkan panduan komprehensif penggunaan server MCP tingkat lanjut, mencakup arsitektur server reguler dan tingkat rendah.  
  - **Server Reguler vs. Tingkat Rendah**: Perbandingan rinci dan contoh kode Python serta TypeScript untuk kedua pendekatan.  
  - **Desain Berbasis Handler**: Penjelasan pengelolaan alat/sumber daya/prompt berbasis handler untuk implementasi server yang skalabel dan fleksibel.  
  - **Pola Praktis**: Skenario dunia nyata di mana pola server tingkat rendah berguna untuk fitur dan arsitektur lanjutan.  

#### Autentikasi Sederhana (03-GettingStarted/11-simple-auth)  
- **Bab Baru Ditambahkan**: Panduan langkah demi langkah untuk mengimplementasikan autentikasi sederhana di server MCP.  
  - **Konsep Auth**: Penjelasan jelas tentang autentikasi vs. otorisasi, dan penanganan kredensial.  
  - **Implementasi Auth Dasar**: Pola autentikasi berbasis middleware di Python (Starlette) dan TypeScript (Express), dengan contoh kode.  
  - **Progresi ke Keamanan Lanjutan**: Panduan memulai dengan autentikasi sederhana dan melanjutkan ke OAuth 2.1 dan RBAC, dengan referensi modul keamanan lanjutan.  

Penambahan ini memberikan panduan praktis langsung untuk membangun implementasi server MCP yang lebih kokoh, aman, dan fleksibel, menjembatani konsep dasar dengan pola produksi lanjutan.  

## 29 September 2025  

### Lab Integrasi Database MCP Server - Jalur Pembelajaran Praktik Komprehensif  

#### 11-MCPServerHandsOnLabs - Kurikulum Integrasi Database Lengkap Baru  
- **Jalur Pembelajaran 13 Lab Lengkap**: Menambahkan kurikulum praktik komprehensif untuk membangun server MCP siap produksi dengan integrasi database PostgreSQL  
  - **Implementasi Dunia Nyata**: Kasus penggunaan analitik Zava Retail yang menunjukkan pola tingkat perusahaan  
  - **Progresi Pembelajaran Terstruktur**:  
    - **Lab 00-03: Dasar** - Pengenalan, Arsitektur Inti, Keamanan & Multi-Tenancy, Penyiapan Lingkungan  
    - **Lab 04-06: Membangun Server MCP** - Desain & Skema Database, Implementasi Server MCP, Pengembangan Alat  
    - **Lab 07-09: Fitur Lanjutan** - Integrasi Pencarian Semantik, Pengujian & Debugging, Integrasi VS Code  
    - **Lab 10-12: Produksi & Praktik Terbaik** - Strategi Deploy, Pemantauan & Observabilitas, Praktik Terbaik & Optimasi  
  - **Teknologi Perusahaan**: Kerangka kerja FastMCP, PostgreSQL dengan pgvector, embedding Azure OpenAI, Azure Container Apps, Application Insights  
  - **Fitur Lanjutan**: Keamanan Baris Tingkat (RLS), pencarian semantik, akses data multi-tenant, embedding vektor, pemantauan real-time  

#### Standarisasi Terminologi - Konversi Modul ke Lab  
- **Pembaruan Dokumentasi Komprehensif**: Memperbarui secara sistematis semua file README di 11-MCPServerHandsOnLabs untuk menggunakan terminologi "Lab" menggantikan "Modul"  
  - **Judul Bagian**: Memperbarui "Apa yang Dilakukan Modul Ini" menjadi "Apa yang Dilakukan Lab Ini" di semua 13 lab  
  - **Deskripsi Konten**: Mengubah "Modul ini menyediakan..." menjadi "Lab ini menyediakan..." di seluruh dokumentasi  
  - **Tujuan Pembelajaran**: Memperbarui "Pada akhir modul ini..." menjadi "Pada akhir lab ini..."  
  - **Tautan Navigasi**: Mengonversi semua referensi "Modul XX:" menjadi "Lab XX:" di silang rujukan dan navigasi  
  - **Pelacakan Penyelesaian**: Memperbarui "Setelah menyelesaikan modul ini..." menjadi "Setelah menyelesaikan lab ini..."  
  - **Referensi Teknis Terjaga**: Mempertahankan referensi modul Python dalam file konfigurasi (misalnya, `"module": "mcp_server.main"`)  

#### Peningkatan Panduan Studi (study_guide.md)  
- **Peta Kurikulum Visual**: Menambahkan bagian baru "11. Lab Integrasi Database" dengan visualisasi struktur lab komprehensif  
- **Struktur Repositori**: Memperbarui dari sepuluh menjadi sebelas bagian utama dengan deskripsi mendetail 11-MCPServerHandsOnLabs  
- **Panduan Jalur Pembelajaran**: Memperbaiki instruksi navigasi untuk mencakup bagian 00-11  
- **Cakupan Teknologi**: Menambahkan detail integrasi FastMCP, PostgreSQL, layanan Azure  
- **Hasil Pembelajaran**: Menekankan pengembangan server siap produksi, pola integrasi database, dan keamanan perusahaan  

#### Peningkatan Struktur README Utama  
- **Terminologi Berbasis Lab**: Memperbarui README.md utama di 11-MCPServerHandsOnLabs untuk konsisten menggunakan struktur "Lab"  
- **Organisasi Jalur Pembelajaran**: Progresi jelas dari konsep dasar hingga implementasi lanjutan sampai deployment produksi  
- **Fokus Dunia Nyata**: Penekanan pada pembelajaran praktis langsung dengan pola dan teknologi kelas enterprise  

### Peningkatan Kualitas & Konsistensi Dokumentasi  
- **Penekanan Pembelajaran Praktik**: Memperkuat pendekatan lab praktis di seluruh dokumentasi  
- **Fokus Pola Perusahaan**: Menyoroti implementasi siap produksi dan pertimbangan keamanan perusahaan  
- **Integrasi Teknologi**: Cakupan komprehensif layanan Azure modern dan pola integrasi AI  
- **Progresi Pembelajaran**: Jalur terstruktur dan jelas dari konsep dasar hingga penyebaran produksi  

## 26 September 2025  

### Peningkatan Studi Kasus - Integrasi GitHub MCP Registry  

#### Studi Kasus (09-CaseStudy/) - Fokus Pengembangan Ekosistem  
- **README.md**: Perluasan besar dengan studi kasus komprehensif GitHub MCP Registry  
  - **Studi Kasus GitHub MCP Registry**: Studi kasus baru mendalam menelaah peluncuran MCP Registry GitHub pada September 2025  
    - **Analisis Masalah**: Pemeriksaan rinci tantangan fragmentasi penemuan dan deploy server MCP  
    - **Arsitektur Solusi**: Pendekatan registry terpusat GitHub dengan instalasi VS Code satu klik  
    - **Dampak Bisnis**: Peningkatan terukur dalam onboarding dan produktivitas pengembang  
    - **Nilai Strategis**: Fokus pada deployment agen modular dan interoperabilitas lintas alat  
    - **Pengembangan Ekosistem**: Posisi sebagai platform dasar untuk integrasi agentik  
  - **Struktur Studi Kasus Ditingkatkan**: Memperbarui ketujuh studi kasus dengan format konsisten dan deskripsi mendalam  
    - Azure AI Travel Agents: Penekanan orkestrasi multi-agen  
    - Integrasi Azure DevOps: Fokus otomatisasi alur kerja  
    - Pengambilan Dokumentasi Real-Time: Implementasi klien konsol Python  
    - Generator Rencana Studi Interaktif: Aplikasi web percakapan Chainlit  
    - Dokumentasi Dalam Editor: Integrasi VS Code dan GitHub Copilot  
    - Azure API Management: Pola integrasi API perusahaan  
    - GitHub MCP Registry: Pengembangan ekosistem dan platform komunitas  
  - **Kesimpulan Komprehensif**: Bagian kesimpulan ditulis ulang menyorot ketujuh studi kasus lintas berbagai dimensi implementasi MCP  
    - Integrasi Perusahaan, Orkestrasi Multi-Agen, Produktivitas Pengembang  
    - Klasifikasi Pengembangan Ekosistem, Aplikasi Pendidikan  
    - Wawasan yang diperluas tentang pola arsitektur, strategi implementasi, dan praktik terbaik  
    - Penekanan MCP sebagai protokol matang dan siap produksi  

#### Pembaruan Panduan Studi (study_guide.md)  
- **Peta Kurikulum Visual**: Memperbarui mindmap untuk mencakup GitHub MCP Registry dalam bagian Studi Kasus  
- **Deskripsi Studi Kasus**: Ditingkatkan dari deskripsi umum ke rincian tujuh studi kasus komprehensif  
- **Struktur Repositori**: Memperbarui bagian 10 untuk mencerminkan cakupan studi kasus lengkap dengan detail implementasi spesifik  
- **Integrasi Changelog**: Menambahkan entri 26 September 2025 yang mendokumentasikan penambahan GitHub MCP Registry dan peningkatan studi kasus  
- **Pembaruan Tanggal**: Memperbarui cap waktu footer untuk mencerminkan revisi terbaru (26 September 2025)  

### Peningkatan Kualitas Dokumentasi  
- **Peningkatan Konsistensi**: Standarisasi format dan struktur studi kasus di ketujuh contoh  
- **Cakupan Komprehensif**: Studi kasus kini meliputi skenario perusahaan, produktivitas pengembang, dan pengembangan ekosistem  
- **Posisi Strategis**: Penekanan MCP sebagai platform dasar untuk deployment sistem agentik  
- **Integrasi Sumber Daya**: Memperbarui sumber daya tambahan untuk menyertakan tautan GitHub MCP Registry  

## 15 September 2025  

### Perluasan Topik Lanjutan - Transportasi Kustom & Rekayasa Konteks  

#### Transportasi Kustom MCP (05-AdvancedTopics/mcp-transport/) - Panduan Implementasi Lanjutan Baru  
- **README.md**: Panduan implementasi lengkap untuk mekanisme transportasi kustom MCP  
  - **Transportasi Azure Event Grid**: Implementasi transportasi event-driven serverless lengkap  
    - Contoh dengan C#, TypeScript, dan Python serta integrasi Azure Functions  
    - Pola arsitektur event-driven untuk solusi MCP yang skalabel  
    - Penerima webhook dan penanganan pesan push  
  - **Transportasi Azure Event Hubs**: Implementasi transportasi streaming throughput tinggi  
    - Kapabilitas streaming real-time untuk skenario latensi rendah  
    - Strategi partisi dan manajemen checkpoint  
    - Pengelompokan pesan dan optimasi performa  
  - **Pola Integrasi Perusahaan**: Contoh arsitektur siap produksi  
    - Pemrosesan MCP terdistribusi di beberapa Azure Functions  
    - Arsitektur transportasi hibrida menggabungkan berbagai jenis transportasi  
    - Strategi durabilitas pesan, keandalan, dan penanganan kesalahan  
  - **Keamanan & Pemantauan**: Integrasi Azure Key Vault dan pola observabilitas  
    - Otentikasi identitas terkelola dan akses hak minimum  
    - Telemetri Application Insights dan pemantauan performa  
    - Pemutus sirkuit dan pola toleransi kesalahan  
  - **Kerangka Pengujian**: Strategi pengujian lengkap untuk transportasi kustom  
    - Pengujian unit dengan test doubles dan mocking frameworks  
    - Pengujian integrasi dengan Azure Test Containers  
    - Pertimbangan pengujian performa dan beban  

#### Rekayasa Konteks (05-AdvancedTopics/mcp-contextengineering/) - Disiplin AI yang Berkembang  
- **README.md**: Eksplorasi komprehensif rekayasa konteks sebagai bidang yang sedang berkembang  
  - **Prinsip Inti**: Berbagi konteks lengkap, kesadaran keputusan aksi, dan manajemen jendela konteks  
  - **Keselarasan Protokol MCP**: Bagaimana desain MCP menangani tantangan rekayasa konteks  
    - Batasan jendela konteks dan strategi pemuatan progresif  
    - Penentuan relevansi dan pengambilan konteks dinamis  
    - Penanganan konteks multi-modal dan pertimbangan keamanan  
  - **Pendekatan Implementasi**: Arsitektur single-threaded vs. multi-agent  
    - Teknik pemecahan dan prioritisasi konteks  
    - Strategi pemuatan progresif dan kompresi konteks  
    - Pendekatan berlapis dan optimasi pengambilan konteks  
  - **Kerangka Pengukuran**: Metrik baru untuk evaluasi efektivitas konteks  
    - Efisiensi input, performa, kualitas, dan pertimbangan pengalaman pengguna  
    - Pendekatan eksperimental untuk optimasi konteks  
    - Analisis kegagalan dan metodologi perbaikan  

#### Pembaruan Navigasi Kurikulum (README.md)  
- **Struktur Modul Ditingkatkan**: Memperbarui tabel kurikulum untuk menyertakan topik lanjutan baru  
  - Menambahkan entri Rekayasa Konteks (5.14) dan Transportasi Kustom (5.15)  
  - Format konsisten dan tautan navigasi di semua modul  
  - Memperbarui deskripsi untuk mencerminkan cakupan konten saat ini  

### Peningkatan Struktur Direktori  
- **Standarisasi Penamaan**: Mengganti nama "mcp transport" menjadi "mcp-transport" agar konsisten dengan folder topik lanjutan lainnya  
- **Organisasi Konten**: Semua folder 05-AdvancedTopics kini mengikuti pola penamaan konsisten (mcp-[topik])  

### Peningkatan Kualitas Dokumentasi  
- **Keselarasan Spesifikasi MCP**: Semua konten baru merujuk pada Spesifikasi MCP terbaru 2025-06-18  
- **Contoh Multi-Bahasa**: Contoh kode komprehensif dalam C#, TypeScript, dan Python  

- **Fokus Perusahaan**: Pola siap produksi dan integrasi cloud Azure secara menyeluruh
- **Dokumentasi Visual**: Diagram Mermaid untuk visualisasi arsitektur dan alur

## 18 Agustus 2025

### Pembaruan Komprehensif Dokumentasi - Standar MCP 2025-06-18

#### Praktik Terbaik Keamanan MCP (02-Security/) - Modernisasi Lengkap
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Penulisan ulang lengkap sesuai Spesifikasi MCP 2025-06-18
  - **Persyaratan Wajib**: Ditambahkan persyaratan HARUS/TIDAK BOLEH eksplisit dari spesifikasi resmi dengan indikator visual jelas
  - **12 Praktik Keamanan Inti**: Diubah dari daftar 15 item menjadi domain keamanan komprehensif
    - Keamanan Token & Otentikasi dengan integrasi penyedia identitas eksternal
    - Manajemen Sesi & Keamanan Transportasi dengan persyaratan kriptografi
    - Perlindungan Ancaman Khusus AI dengan integrasi Microsoft Prompt Shields
    - Kontrol Akses & Izin dengan prinsip hak istimewa paling sedikit
    - Keamanan & Pemantauan Konten dengan integrasi Azure Content Safety
    - Keamanan Rantai Pasokan dengan verifikasi komponen yang komprehensif
    - Keamanan OAuth & Pencegahan Confused Deputy dengan implementasi PKCE
    - Respon Insiden & Pemulihan dengan kapabilitas otomatis
    - Kepatuhan & Tata Kelola dengan kesesuaian regulasi
    - Kontrol Keamanan Lanjutan dengan arsitektur zero trust
    - Integrasi Ekosistem Keamanan Microsoft dengan solusi komprehensif
    - Evolusi Keamanan Berkelanjutan dengan praktik adaptif
  - **Solusi Keamanan Microsoft**: Panduan integrasi ditingkatkan untuk Prompt Shields, Azure Content Safety, Entra ID, dan GitHub Advanced Security
  - **Sumber Daya Implementasi**: Link sumber daya lengkap diklasifikasikan berdasarkan Dokumentasi Resmi MCP, Solusi Keamanan Microsoft, Standar Keamanan, dan Panduan Implementasi

#### Kontrol Keamanan Lanjutan (02-Security/) - Implementasi Perusahaan
- **MCP-SECURITY-CONTROLS-2025.md**: Penyusunan ulang lengkap dengan kerangka keamanan tingkat perusahaan
  - **9 Domain Keamanan Komprehensif**: Diperluas dari kontrol dasar ke kerangka kerja perusahaan terperinci
    - Otentikasi & Otorisasi Lanjutan dengan integrasi Microsoft Entra ID
    - Keamanan Token & Kontrol Anti-Passthrough dengan validasi komprehensif
    - Kontrol Keamanan Sesi dengan pencegahan pembajakan
    - Kontrol Keamanan Khusus AI dengan pencegahan prompt injection dan tool poisoning
    - Pencegahan Serangan Confused Deputy dengan keamanan proxy OAuth
    - Keamanan Eksekusi Alat dengan sandboxing dan isolasi
    - Kontrol Keamanan Rantai Pasokan dengan verifikasi dependensi
    - Kontrol Pemantauan & Deteksi dengan integrasi SIEM
    - Respon Insiden & Pemulihan dengan kapabilitas otomatis
  - **Contoh Implementasi**: Ditambahkan blok konfigurasi YAML dan contoh kode terperinci
  - **Integrasi Solusi Microsoft**: Cakupan lengkap layanan keamanan Azure, GitHub Advanced Security, dan manajemen identitas perusahaan

#### Topik Lanjutan Keamanan (05-AdvancedTopics/mcp-security/) - Implementasi Siap Produksi
- **README.md**: Penulisan ulang lengkap untuk implementasi keamanan perusahaan
  - **Penyesuaian Spesifikasi Saat Ini**: Diperbarui sesuai Spesifikasi MCP 2025-06-18 dengan persyaratan keamanan wajib
  - **Otentikasi Ditingkatkan**: Integrasi Microsoft Entra ID dengan contoh komprehensif .NET dan Java Spring Security
  - **Integrasi Keamanan AI**: Implementasi Microsoft Prompt Shields dan Azure Content Safety dengan contoh Python detail
  - **Mitigasi Ancaman Lanjutan**: Contoh implementasi komprehensif untuk
    - Pencegahan Serangan Confused Deputy dengan PKCE dan validasi persetujuan pengguna
    - Pencegahan Token Passthrough dengan validasi audiens dan manajemen token aman
    - Pencegahan Pembajakan Sesi dengan pengikatan kriptografi dan analisis perilaku
  - **Integrasi Keamanan Perusahaan**: Pemantauan Azure Application Insights, pipeline deteksi ancaman, dan keamanan rantai pasokan
  - **Checklist Implementasi**: Kontrol keamanan wajib vs. yang direkomendasikan dengan manfaat ekosistem keamanan Microsoft

### Kualitas Dokumentasi & Penyelarasan Standar
- **Referensi Spesifikasi**: Memperbarui semua referensi ke Spesifikasi MCP saat ini 2025-06-18
- **Ekosistem Keamanan Microsoft**: Panduan integrasi dipertajam di seluruh dokumentasi keamanan
- **Implementasi Praktis**: Ditambahkan contoh kode terperinci dalam .NET, Java, dan Python dengan pola perusahaan
- **Organisasi Sumber Daya**: Klasifikasi lengkap dokumentasi resmi, standar keamanan, dan panduan implementasi
- **Indikator Visual**: Penandaan jelas persyaratan wajib vs. praktik yang direkomendasikan


#### Konsep Inti (01-CoreConcepts/) - Modernisasi Lengkap
- **Pembaruan Versi Protokol**: Diperbarui untuk merujuk Spesifikasi MCP saat ini 2025-06-18 dengan format penanggalan (YYYY-MM-DD)
- **Penyempurnaan Arsitektur**: Deskripsi diperkuat untuk Host, Client, dan Server sesuai pola arsitektur MCP saat ini
  - Host kini jelas didefinisikan sebagai aplikasi AI yang mengoordinasikan banyak koneksi client MCP
  - Client digambarkan sebagai penghubung protokol yang memelihara relasi satu-satu dengan server
  - Server disempurnakan dengan skenario penyebaran lokal vs. jarak jauh
- **Restrukturisasi Primitif**: Penyusunan ulang lengkap primitif server dan client
  - Primitif Server: Resources (sumber data), Prompts (template), Tools (fungsi eksekusi) dengan penjelasan dan contoh rinci
  - Primitif Client: Sampling (penyelesaian LLM), Elicitation (input pengguna), Logging (debugging/pemantauan)
  - Diperbarui dengan pola metode penemuan (`*/list`), pengambilan (`*/get`), dan eksekusi (`*/call`) saat ini
- **Arsitektur Protokol**: Memperkenalkan model arsitektur dua lapisan
  - Lapisan Data: dasar JSON-RPC 2.0 dengan manajemen siklus hidup dan primitif
  - Lapisan Transportasi: mekanisme transportasi STDIO (lokal) dan HTTP Streamable dengan SSE (jarak jauh)
- **Kerangka Keamanan**: Prinsip keamanan komprehensif termasuk persetujuan pengguna eksplisit, perlindungan privasi data, keamanan eksekusi alat, dan keamanan lapisan transportasi
- **Pola Komunikasi**: Memperbarui pesan protokol untuk menampilkan inisialisasi, penemuan, eksekusi, dan alur pemberitahuan
- **Contoh Kode**: Memperbarui contoh multi-bahasa (.NET, Java, Python, JavaScript) mengikuti pola SDK MCP saat ini

#### Keamanan (02-Security/) - Perombakan Keamanan Komprehensif  
- **Penyelarasan Standar**: Kesesuaian penuh dengan persyaratan keamanan Spesifikasi MCP 2025-06-18
- **Evolusi Otentikasi**: Dokumentasi evolusi dari server OAuth kustom ke delegasi penyedia identitas eksternal (Microsoft Entra ID)
- **Analisis Ancaman Khusus AI**: Cakupan diperluas vektor serangan AI modern
  - Skenario serangan prompt injection terperinci dengan contoh dunia nyata
  - Mekanisme tool poisoning dan pola serangan "rug pull"
  - Pembajakan jendela konteks dan serangan kebingungan model
- **Solusi Keamanan AI Microsoft**: Cakupan lengkap ekosistem keamanan Microsoft
  - AI Prompt Shields dengan deteksi lanjutan, spotlighting, dan teknik delimiter
  - Pola integrasi Azure Content Safety
  - GitHub Advanced Security untuk perlindungan rantai pasokan
- **Mitigasi Ancaman Lanjutan**: Kontrol keamanan terperinci untuk
  - Pembajakan sesi dengan skenario serangan spesifik MCP dan persyaratan ID sesi kriptografi
  - Masalah confused deputy dalam skenario proxy MCP dengan persyaratan persetujuan eksplisit
  - Kerentanan token passthrough dengan kontrol validasi wajib
- **Keamanan Rantai Pasokan**: Perluasan cakupan rantai pasokan AI termasuk model fondasi, layanan embedding, penyedia konteks, dan API pihak ketiga
- **Keamanan Fondasi**: Integrasi ditingkatkan dengan pola keamanan perusahaan termasuk arsitektur zero trust dan ekosistem keamanan Microsoft
- **Organisasi Sumber Daya**: Link sumber daya lengkap diklasifikasikan berdasarkan tipe (Dokumen Resmi, Standar, Riset, Solusi Microsoft, Panduan Implementasi)

### Peningkatan Kualitas Dokumentasi
- **Tujuan Pembelajaran Terstruktur**: Tujuan pembelajaran diperkuat dengan hasil spesifik dan dapat ditindaklanjuti
- **Referensi Silang**: Ditambahkan link antar topik keamanan dan konsep inti terkait
- **Informasi Terkini**: Semua referensi tanggal dan link spesifikasi diperbarui ke standar saat ini
- **Panduan Implementasi**: Ditambahkan panduan implementasi spesifik dan dapat dilaksanakan di kedua bagian

## 16 Juli 2025

### Peningkatan README dan Navigasi
- Mendesain ulang navigasi kurikulum secara lengkap di README.md
- Mengganti tag `<details>` dengan format tabel yang lebih mudah diakses
- Membuat opsi tata letak alternatif di folder baru "alternative_layouts"
- Menambahkan contoh navigasi berbasis kartu, tab, dan akordion
- Memperbarui bagian struktur repositori untuk menyertakan semua file terbaru
- Memperkuat bagian "Cara Menggunakan Kurikulum Ini" dengan rekomendasi jelas
- Memperbarui link spesifikasi MCP agar mengarah ke URL yang benar
- Menambahkan bagian Rekayasa Konteks (5.14) ke struktur kurikulum

### Pembaruan Panduan Studi
- Merevisi ulang panduan studi untuk sesuai dengan struktur repositori saat ini
- Menambahkan bagian baru untuk Client dan Tool MCP, serta Server MCP Populer
- Memperbarui Peta Kurikulum Visual untuk mencerminkan semua topik secara akurat
- Memperkuat deskripsi Topik Lanjutan untuk mencakup semua bidang spesialis
- Memperbarui bagian Studi Kasus untuk mencerminkan contoh nyata
- Menambahkan changelog komprehensif ini

### Kontribusi Komunitas (06-CommunityContributions/)
- Menambahkan informasi rinci tentang server MCP untuk generasi gambar
- Menambahkan bagian komprehensif tentang penggunaan Claude di VSCode
- Menambahkan instruksi pengaturan dan penggunaan klien terminal Cline
- Memperbarui bagian client MCP untuk menyertakan semua opsi klien populer
- Memperkuat contoh kontribusi dengan contoh kode yang lebih akurat

### Topik Lanjutan (05-AdvancedTopics/)
- Mengorganisir semua folder topik spesialis dengan penamaan konsisten
- Menambahkan materi dan contoh rekayasa konteks
- Menambahkan dokumentasi integrasi agen Foundry
- Memperkuat dokumentasi integrasi keamanan Entra ID

## 11 Juni 2025

### Pembuatan Awal
- Merilis versi pertama kurikulum MCP untuk Pemula
- Membuat struktur dasar untuk semua 10 bagian utama
- Mengimplementasikan Peta Kurikulum Visual untuk navigasi
- Menambahkan proyek contoh awal dalam berbagai bahasa pemrograman

### Memulai (03-GettingStarted/)
- Membuat contoh implementasi server pertama
- Menambahkan panduan pengembangan client
- Menyertakan petunjuk integrasi client LLM
- Menambahkan dokumentasi integrasi VS Code
- Mengimplementasikan contoh server Server-Sent Events (SSE)

### Konsep Inti (01-CoreConcepts/)
- Menambahkan penjelasan terperinci arsitektur client-server
- Membuat dokumentasi komponen protokol utama
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
- Menyiapkan SUPPORT.md dengan panduan mendapatkan bantuan
- Membuat struktur panduan belajar awal

## 15 April 2025

### Perencanaan dan Kerangka Kerja
- Perencanaan awal untuk kurikulum MCP untuk Pemula
- Menentukan tujuan pembelajaran dan audiens target
- Menguraikan struktur kurikulum 10 bagian
- Mengembangkan kerangka konseptual untuk contoh dan studi kasus
- Membuat contoh prototipe awal untuk konsep utama

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->