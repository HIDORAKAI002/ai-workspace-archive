# Changelog: Kurikulum MCP untuk Pemula

Dokumen ini berfungsi sebagai rekod semua perubahan penting yang dibuat pada kurikulum Model Context Protocol (MCP) untuk Pemula. Perubahan didokumentasikan dalam urutan terbalik kronologi (perubahan terbaru terlebih dahulu).

## 2 Julai 2026

### Pelajaran Baru: Calon Siaran Spesifikasi MCP 2026-07-28

Ditambahkan liputan calon siaran spesifikasi MCP `2026-07-28` yang akan datang (diumumkan 21 Mei 2026; siaran akhir dijadualkan pada 28 Julai 2026), diringkaskan dari [catatan blog pengumuman rasmi](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Garis dasar kurikulum kekal **Spesifikasi MCP 2025-11-25** sehingga versi baru dihantar, jadi ini disajikan sebagai panduan masa depan dan bukan penulisan semula pelajaran sedia ada.

- **Baru**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — pelajaran penuh yang merangkumi teras protokol tanpa status (penghapusan `initialize` handshake dan `Mcp-Session-Id`), header penghalaan baru `Mcp-Method`/`Mcp-Name`, metadata caching `ttlMs`/`cacheScope`, W3C Trace Context dalam `_meta`, rangka Kerangka Luasan formal (Aplikasi MCP dan pelanjutan Tasks baru), enam SEP pengukuhan kebenaran, penghapusan Roots/Sampling/Logging, dan peralihan kepada JSON Schema 2020-12 penuh untuk skema alat.
- **Dikemaskini** dengan panggilan panduan ke hadapan yang merujuk pelajaran baru:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): nota versi protokol, bahagian Sampling/Roots/Logging/Tasks, dan "Apa yang seterusnya"
  - [02-Security/README.md](./02-Security/README.md): panggilan pengukuhan kebenaran
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): panggilan pemindahan tanpa status
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): panggilan penghapusan Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): panggilan penghapusan Logging dan pelanjutan Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): panggilan penghalaan tanpa status/sesi
  - [README.md](./README.md): nota "Melihat ke hadapan" dalam bahagian spesifikasi dan entri baru `1.1` dalam jadual modul kurikulum
  - [study_guide.md](./study_guide.md): peluru panduan ke hadapan di bawah gambaran Konsep Teras dan nota tambahan bertarikh
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): panggilan tentang peta pengangkutan `mcp-session-id` sebelum model permintaan tanpa status
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): panggilan gambaran modul tentang penghapusan Root Contexts/Sampling dan pelanjutan Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): panggilan pengukuhan kebenaran

## 24 Jun 2026

### Pelajaran Baru: Menggunakan MCP dalam aplikasi Copilot

- [Bahagian Peralatan](./12-tooling/README.md) Ditambahkan bahagian peralatan.
- [MCP dalam aplikasi Copilot](./12-tooling/01-copilot-app/README.md)

## 16 Jun 2026

### Penyerasian Spesifikasi MCP & Pengesahan Sampel

Memastikan kurikulum sejajar dengan **Spesifikasi MCP 2025-11-25** yang terkini dan SDK rasmi terbaru, kemudian membetulkan rujukan spesifikasi usang yang masih ada dan mengesahkan sampel teras masih boleh dibina dan dijalankan.

#### Pembetulan Versi Spesifikasi (2025-06-18 / 2025-03-26 → 2025-11-25)

Mengemas kini kandungan Bahasa Inggeris yang masih menyatakan semakan spesifikasi lama sebagai piawai *terkini/terakhir*, dan mengarahkan semula pautan kepada laluan spesifikasi `modelcontextprotocol.io` yang sah:
- **05-AdvancedTopics/mcp-security/README.md**: Dikemaskini sepanduk "Piawai Semasa", pengenalan, tajuk prinsip keselamatan teras, tajuk keperluan mandatori, bahagian Microsoft Entra ID, pautan Rujukan & Sumber, dan notis keselamatan penutup (8 rujukan) ke 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Dikemaskini pautan sumber tambahan spesifikasi dan sepanduk "Piawai Semasa" ke 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Menggantikan pautan keselamatan-dan-kepercayaan `2025-03-26` yang usang dengan halaman amalan terbaik keselamatan 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Dikemaskini pautan dokumentasi rasmi sampling ke 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Dikemaskini rujukan "spesifikasi MCP semasa" dalam masa kini dan pautan sumber tambahan spesifikasi ke 2025-11-25 (nota penghapusan SSE bersejarah dibiarkan utuh untuk ketepatan)

#### Pengesahan Sampel Melawan SDK Semasa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` menyelesaikan `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` lulus tanpa ralat jenis — API sedia ada `McpServer`/`StdioServerTransport` kekal sah
- **Python (03-GettingStarted/01-first-server/solution/python)**: Disahkan dalam `.venv` terpencil dengan `mcp[cli]` (1.27.2); `py_compile` lulus dan `FastMCP.list_tools()` mengembalikan alat `add` dan `subtract` dengan betul
- Mengesahkan semua julat versi `@modelcontextprotocol/sdk` sampel (`>=1.26.0` / `^1.26.0` / `^1.27.0`) menyelesaikan dengan bersih ke `1.29.0` semasa tanpa perubahan API yang merosakkan

#### Penyerasian Pin Pergantungan (menutup jurang versi)

Meningkatkan pin SDK yang lapuk supaya setiap sampel mengikut keluaran MCP semasa, sepadan dengan konvensyen repo secara keseluruhan:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Meningkatkan `@modelcontextprotocol/sdk` dari `^1.8.0` → `>=1.26.0` dan mengemas kini keterangan pakej usang `"updated for MCP 2025-06-18"` menjadi `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** dan **lab4/code/github_mcp_server/pyproject.toml**: Meningkatkan pin tepat `mcp==1.23.0` → `mcp>=1.26.0`; menjana semula kedua-dua fail `uv.lock` (`uv lock`) supaya fail kunci menyelesaikan ke `mcp 1.27.2` semasa dan kekal selari dengan manifes

#### Analisis Jurang Kurikulum — Liputan Ciri Spesifikasi Terkini

Disahkan kurikulum sudah merangkumi semua primitif yang diperkenalkan/diperluaskan dalam MCP 2025-11-25, jadi tiada jurang kandungan:
- **Sampling**: Pelajaran 03-GettingStarted/14-sampling ditambah 05-AdvancedTopics/mcp-sampling
- **Elicitation (termasuk mod URL)**: Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Didokumentasikan dalam 00-Introduction, 01-CoreConcepts, dan 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimen, operasi jangka panjang)**: Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Penjelasan Alat** (`readOnlyHint` / `destructiveHint`): Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features

### Pengukuhan Keselamatan & Pemulihan Kerentanan Pergantungan

Menjalankan pemeriksaan keselamatan penuh di setiap manifes pergantungan dan kod sumber sampel, kemudian memulihkan semua amaran npm yang dilaporkan dan satu penemuan tahap kod. Selepas pemulihan, `npm audit` melaporkan **0 kerentanan** di setiap direktori yang diaudit.

#### Kerentanan Pergantungan npm (transitif) — Diperbaiki

Diaudit semua 15 fail `package-lock.json` yang dikomit. Kerentanan terhad kepada pergantungan transitif yang dibawa oleh alat pembangunan Pemeriksa MCP, klien OpenAI, dan SDK MCP; semuanya kini diselesaikan tanpa merosakkan sampel:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** dan **lab3/code/weather_mcp/inspector**: Menaik taraf `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), yang membersihkan amaran bundled `ajv`, `brace-expansion`, `diff`, `path-to-regexp` dan `ws`. Ditambah entri npm `overrides` memaksa `shell-quote@1.8.4` yang ditampal untuk menghilangkan amaran kritikal terakhir yang dibawa oleh `concurrently`; menjana semula kedua-dua fail kunci (sekarang 0 kerentanan)
- **03-GettingStarted/samples/typescript**: `npm audit fix` mengemas kini `qs` transitif (sederhana) ke keluaran yang ditampal
- **03-GettingStarted/samples/javascript**: `npm audit fix` mengemas kini `hono` transitif (sederhana) ke keluaran yang ditampal
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` mengemas kini `form-data` transitif (tinggi) ke keluaran yang ditampal
- **03-GettingStarted/11-simple-auth/solution/typescript**: Menghasilkan `package-lock.json` yang hilang supaya projek boleh dihasilkan semula dan diaudit (0 kerentanan)

#### Pembetulan Keselamatan Tahap Kod (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Mengeluarkan `shell=True` daripada alat `open_in_vscode`. `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` sebelum ini membenarkan metakarakter shell dalam laluan folder ditafsir oleh `cmd.exe` (vektor suntikan arahan). Kini ia melancarkan `Code.exe` yang diselesaikan secara langsung dengan folder sebagai argumen — tiada shell — yang secara fungsi setara dan selamat

#### Audit Pergantungan Python

- Diaudit setiap set keperluan Python dengan `pip-audit`. `05-AdvancedTopics` dan `03-GettingStarted/samples/python` melaporkan **tiada kerentanan dikenali** (julatan `mcp` / `httpx` / `pydantic` / `python-dotenv` mereka menyelesaikan ke keluaran tampalan semasa)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` menandakan pergantungan transitif **`werkzeug` 3.1.1** dengan tiga amaran DoS nama peranti Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, dan `CVE-2026-27199` (semua diperbaiki dalam 3.1.6). Ditambah pin keselamatan eksplisit `werkzeug>=3.1.6` supaya keluaran tampalan diselesaikan; disahkan kekangan menyelesaikan dengan bersih dengan lapisan `chainlit` / `mcp` / `semantic-kernel`

### Penjenamaan Semula Nama Produk

Dikemas kini semua kandungan kurikulum untuk mencerminkan penjenamaan semula produk Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Dikemas kini pautan komuniti Discord
- **AGENTS.md**: Dikemas kini rujukan pelayan Discord
- **README.md**: Dikemas kini rujukan ekosistem teknologi
- **study_guide.md**: Dikemas kini rujukan kajian kes
- **05-AdvancedTopics/README.md**: Dikemas kini tajuk dan penerangan Modul 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Dikemas kini tajuk dan penerangan bahagian
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Dikemas kini tajuk modul penuh dan kandungan
- **05-AdvancedTopics/mcp-security-entra/README.md**: Dikemas kini pautan silang rujukan
- **07-LessonsfromEarlyAdoption/README.md**: Dikemas kini rujukan kajian kes
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Dikemas kini tajuk Seksyen 9, lencana, dan keupayaan
- **08-BestPractices/README.md**: Dikemas kini pautan komuniti Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Dikemas kini rujukan saluran Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Dikemas kini rujukan penyebaran model
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Dikemas kini jadual Perkhidmatan AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Dikemas kini rujukan sumber

#### AI Toolkit / AITK → Sambungan Microsoft Foundry Toolkit untuk VS Code

- **README.md**: Dikemas kini rujukan kurikulum utama
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Dikemas kini tajuk modul, gambaran keseluruhan, dan semua tajuk modul
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Dikemas kini tajuk, objektif pembelajaran, arahan persediaan, dan sumber
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Dikemas kini tajuk, objektif pembelajaran, jadual hos MCP, dan rujukan silang
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Dikemas kini tajuk, lencana, prasyarat, dan sumber
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Dikemas kini rujukan Pembina Ejen dan pautan maklum balas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Dikemas kini prasyarat dan rujukan sambungan

---

## 11 April, 2026

### Pelajaran Baru, Pembetulan Dokumentasi, dan Kemas Kini Kebergantungan

#### Kandungan Kurikulum Baru Ditambah

**Modul 05 - Topik Lanjutan**
- **Pelajaran 5.17: Penalaran Multi-Ejen Adversarial dengan MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Panduan komprehensif baru yang merangkumi corak perdebatan adversarial untuk sistem multi-ejen
  - Carta seni bina Mermaid: dua ejen → pelayan MCP berkongsi → transkrip perdebatan → hakim → keputusan
  - Pelayan alat MCP berkongsi (`web_search` + `run_python`) dilaksanakan dalam Python dan TypeScript
  - Arahan sistem bertentangan (UNTUK / MENENTANG / Hakim) dengan keperluan penggunaan alat secara eksplisit
  - Pengatur cara perdebatan dalam Python, TypeScript, dan C# mengawal pusingan dan penghalaan hujah
  - Penyambungan MCP `ClientSession` untuk pengatur cara kepada panggilan alat sebenar
  - Jadual kes penggunaan (pengesanan halusinasi, pemodelan ancaman, ulasan reka bentuk API, pengesahan fakta, pemilihan teknologi)
  - Pertimbangan keselamatan: pelaksanaan terkawal, pengesahan panggilan alat, pengehad kadar, pencatatan audit
  - Latihan berstruktur dengan tiga senario praktikal (ulasan kod, keputusan seni bina, pengurusan kandungan)

#### Pembetulan Dokumentasi

**Modul 03 - Mula Bermula**
- **05-stdio-server/README.md**: Membaiki contoh pelayan stdio TypeScript yang tidak lengkap — menambah inisiasi pengangkutan yang hilang (`new StdioServerTransport()`) dan panggilan `server.connect(transport)` untuk sepadan dengan contoh Python dan .NET dalam bahagian yang sama
- **14-sampling/README.md**: Membaiki kesilapan ejaan — membetulkan `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Kemas Kini Kurikulum

**README.md Utama**
- Ditambah entri 5.17 (Penalaran Multi-Ejen Adversarial dengan MCP) ke jadual kurikulum dengan pautan langsung ke pelajaran baru

**05-AdvancedTopics/README.md**
- Ditambah baris Pelajaran 5.17 ke jadual pelajaran

**study_guide.md**
- Ditambah topik Penalaran Multi-Ejen Adversarial ke peta minda dan deskripsi prosa Topik Lanjutan

#### Pembetulan Kod dan Keselamatan

**Modul 05 - Ejen Adversarial (`mcp-adversarial-agents`)**
- **Pembaikan keselamatan — suntikan arahan**: Menggantikan interpolasi shell `execSync` dengan `execFile` + `promisify` dalam alat TypeScript `run_python`, menghapuskan permukaan suntikan arahan (kod dikawal LLM kini dihantar sebagai elemen argv literal tanpa penglibatan shell)
- **Sambungan gelung alat MCP**: Dikemas kini pengatur cara perdebatan Python untuk menggunakan klien `AsyncAnthropic` (menggantikan `Anthropic` sinkronisasi blok), terus menghantar `ClientSession` hidup ke setiap giliran ejen, mengambil definisi alat melalui `session.list_tools()` setiap giliran, dan menghantar blok `tool_use` melalui `session.call_tool()` dalam gelung sehingga model mengeluarkan respons teks akhir

#### Kemas Kini Kebergantungan

- Menaikkan `hono` ke 4.12.12 merentasi pelbagai pakej (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Menaikkan `@hono/node-server` dari 1.19.11 ke 1.19.13 dalam pakej TypeScript
- Menaikkan `cryptography` dari 46.0.5 ke 46.0.7 dalam pakej Python (makmal 3 dan 4 10-StreamliningAIWorkflows)
- Menaikkan `lodash` dari 4.17.23 ke 4.18.1 dalam pemeriksa 10-StreamliningAIWorkflows

#### Terjemahan

- Menyedari terjemahan untuk 48+ bahasa dengan perubahan sumber terbaru (kemas kini i18n)

---

## 5 Februari, 2026

### Peningkatan Pengesahan dan Navigasi Seluruh Repositori

#### Kandungan Kurikulum Baru Ditambah

**Modul 03 - Mula Bermula**
- **12-mcp-hosts/README.md**: Panduan komprehensif baru untuk menyediakan hos MCP
  - Contoh konfigurasi Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Template konfigurasi JSON untuk semua hos utama
  - Jadual perbandingan jenis pengangkutan (stdio, SSE/HTTP, WebSocket)
  - Penyelesaian masalah sambungan biasa
  - Amalan terbaik keselamatan untuk konfigurasi hos

- **13-mcp-inspector/README.md**: Panduan penyahpepijatan baru untuk Pemeriksa MCP
  - Kaedah pemasangan (npx, npm global, dari sumber)
  - Menyambung ke pelayan melalui stdio dan HTTP/SSE
  - Alat ujian, sumber, dan aliran kerja arahan
  - Integrasi VS Code dengan Pemeriksa MCP
  - Senario penyahpepijatan biasa dengan penyelesaian

**Modul 04 - Pelaksanaan Praktikal**
- **pagination/README.md**: Panduan pelaksanaan penomboran baru
  - Corak penomboran berdasarkan kursor dalam Python, TypeScript, Java
  - Pengendalian penomboran sisi klien
  - Strategi reka bentuk kursor (tidak telus vs. berstruktur)
  - Cadangan pengoptimuman prestasi

**Modul 05 - Topik Lanjutan**
- **mcp-protocol-features/README.md**: Sorotan ciri protokol baru
  - Pelaksanaan notifikasi kemajuan
  - Corak pembatalan permintaan
  - Templat sumber dengan corak URI
  - Pengurusan kitar hayat pelayan
  - Kawalan tahap pencatatan
  - Corak pengendalian ralat dengan kod JSON-RPC

#### Pembetulan Navigasi (24+ fail dikemas kini)

**README Modul Utama**
 Kini pautan kepada pelajaran pertama DAN modul seterusnya

**02-Fail Sub-Keselamatan**
- Semua 5 dokumen keselamatan tambahan kini mempunyai navigasi "Apa Seterusnya":

**09-Fail Kajian Kes**
- Semua fail kajian kes kini mempunyai navigasi berurutan:

**Makmal 10-StreamliningAI**
Ditambah seksyen Apa Seterusnya ke gambaran keseluruhan Modul 10 dan Modul 11

#### Pembetulan Kod dan Kandungan

**Kemas Kini SDK dan Kebergantungan**
Membaiki versi openai kosong kepada `^4.95.0`
Kemas kini SDK dari `^1.8.0` ke `>=1.26.0`
Kemas kini pin versi mcp ke `>=1.26.0`

**Pembetulan Kod**
Membaiki model tidak sah `gpt-4o-mini` ke `gpt-4.1-mini`

**Pembetulan Kandungan**
Membaiki pautan rosak `READMEmd` → `README.md`, membetulkan tajuk kurikulum `Module 1-3` → `Module 0-3`, membetulkan laluan sensitif huruf
Mengalih keluar kandungan berganda Kajian Kes 5 yang rosak

**Peningkatan Panduan Pemula**
Menambah pengenalan yang betul, objektif pembelajaran, dan prasyarat untuk pemula

#### Kemas Kini Kurikulum

**README.md Utama**
- Ditambah entri 3.12 (Hos MCP), 3.13 (Pemeriksa MCP), 4.1 (Penomboran), 5.16 (Ciri Protokol) ke jadual kurikulum

**README Modul**
Ditambah pelajaran 12 dan 13 ke senarai pelajaran
Ditambah seksyen Panduan Praktikal dengan pautan penomboran
Ditambah pelajaran 5.15 (Pengangkutan Tersuai) dan 5.16 (Ciri Protokol)

**study_guide.md**
- Dikemas kini peta minda dengan semua topik baru: Persediaan Hos MCP, Pemeriksa MCP, Strategi Penomboran, Sorotan Ciri Protokol

## 28 Jan, 2026

### Semakan Pematuhan Spesifikasi MCP 2025-11-25

#### Peningkatan Konsep Teras (01-CoreConcepts/)
- **Primitif Pelanggan Baru - Roots**: Menambah dokumentasi komprehensif pada primitif Roots pelanggan, membolehkan pelayan memahami sempadan sistem fail dan kebenaran akses
- **Anotasi Alat**: Menambah dokumentasi pada anotasi tingkah laku alat (`readOnlyHint`, `destructiveHint`) untuk keputusan pelaksanaan alat yang lebih baik
- **Panggilan Alat dalam Sampling**: Dikemas kini dokumentasi Sampling untuk memasukkan parameter `tools` dan `toolChoice` untuk panggilan alat dikawal model semasa permintaan sampling
- **Elicitation Mod URL**: Menambah dokumentasi tentang elicitation berasaskan URL untuk interaksi web luaran yang dimulakan oleh pelayan
- **Tugas (Eksperimen)**: Menambah seksyen baru yang mendokumentasikan ciri Tugas eksperimen untuk pembungkus pelaksanaan tahan lama dan pengambilan hasil ditangguhkan
- **Sokongan Ikon**: Mencatat bahawa alat, sumber, templat sumber, dan arahan kini boleh termasuk ikon sebagai metadata tambahan

#### Kemas Kini Dokumentasi
- **README.md**: Menambah rujukan versi Spesifikasi MCP 2025-11-25 dan penjelasan penomboran versi berasaskan tarikh
- **study_guide.md**: Dikemas kini peta kurikulum untuk memasukkan Tugas dan Anotasi Alat dalam seksyen Konsep Teras; dikemas kini cap masa dokumen

#### Pengesahan Pematuhan Spesifikasi
- **Versi Protokol**: Mengesahkan semua dokumentasi merujuk Spesifikasi MCP 2025-11-25 terkini
- **Penyelarasan Seni Bina**: Mengesahkan ketepatan dokumentasi seni bina dua lapisan (Lapisan Data + Lapisan Pengangkutan)
- **Dokumentasi Primitif**: Mengesahkan primitif pelayan (Sumber, Arahan, Alat) dan primitif pelanggan (Sampling, Elicitation, Logging, Roots)
- **Mekanisme Pengangkutan**: Mengesahkan ketepatan dokumentasi pengangkutan STDIO dan HTTP Boleh-Alir
- **Panduan Keselamatan**: Mengesahkan penyelarasan dengan dokumen Amalan Terbaik Keselamatan MCP semasa

#### Ciri Utama MCP 2025-11-25 Didokumentasikan
- **Penemuan OpenID Connect**: Penemuan pelayan pengesahan melalui OIDC
- **Dokumen Metadata ID Klien OAuth**: Mencadangkan mekanisme pendaftaran klien
- **JSON Skema 2020-12**: Dialek lalai untuk definisi skema MCP
- **Sistem Tahap SDK**: Merumuskan keperluan untuk sokongan ciri dan penyelenggaraan SDK
- **Struktur Tadbir Urus**: Merumuskan Kumpulan Kerja dan Kumpulan Kepentingan dalam tadbir urus MCP

### Kemas Kini Utama Dokumentasi Keselamatan (02-Keselamatan/)

#### Integrasi Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)
- **Sumber Latihan Praktikal Baru**: Menambah integrasi menyeluruh dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) dalam semua dokumentasi keselamatan
- **Liputan Laluan Ekspedisi**: Mendokumentasikan progres lengkap dari Kem Asas ke Kemuncak
- **Penyelarasan OWASP**: Semua panduan keselamatan kini dipetakan kepada risiko Panduan Keselamatan MCP Azure OWASP

#### Integrasi Top 10 OWASP MCP
- **Seksyen Baru**: Menambah jadual Risiko Keselamatan Top 10 OWASP MCP dengan mitigasi Azure ke README Keselamatan utama
- **Dokumentasi Berasaskan Risiko**: Dikemas kini mcp-security-controls-2025.md dengan rujukan risiko OWASP MCP untuk setiap domain keselamatan
- **Seni Bina Rujukan**: Dipautkan ke seni bina rujukan dan corak pelaksanaan Panduan Keselamatan MCP Azure OWASP

#### Fail Keselamatan Dikemas Kini
- **README.md**: Menambah gambaran Bengkel Sherpa, jadual laluan ekspedisi, ringkasan risiko Top 10 OWASP MCP, dan seksyen latihan praktikal
- **mcp-security-controls-2025.md**: Dikemas kini header ke Februari 2026, menambah rujukan risiko OWASP (MCP01-MCP08), membetulkan ketidakkonsistenan versi spesifikasi
- **mcp-security-best-practices-2025.md**: Menambah seksyen sumber Sherpa dan OWASP, dikemas kini cap masa
- **mcp-best-practices.md**: Menambah seksyen latihan praktikal dengan pautan Sherpa dan OWASP
- **azure-content-safety-implementation.md**: Menambah rujukan OWASP MCP06, penyelarasan Kem Sherpa 3, dan seksyen sumber tambahan

#### Pautan Sumber Baru Ditambah
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [Panduan Keselamatan MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- [Top 10 OWASP MCP](https://owasp.org/www-project-mcp-top-10/)
- Halaman risiko OWASP MCP individu (MCP01-MCP10)

### Penyelaran MCP Spesifikasi 2025-11-25 Sepanjang Kurikulum

#### Modul 03 - Mula Bermula
- **Dokumentasi SDK**: Menambah Go SDK ke senarai SDK rasmi; mengemas kini semua rujukan SDK untuk selaras dengan MCP Spesifikasi 2025-11-25
- **Penjelasan Pengangkutan**: Dikemas kini deskripsi pengangkutan STDIO dan Streaming HTTP dengan rujukan spesifikasi eksplisit

#### Modul 04 - Pelaksanaan Praktikal
- **Kemas Kini SDK**: Menambah Go SDK; mengemas kini senarai SDK dengan rujukan versi spesifikasi
- **Spesifikasi Kebenaran**: Dikemas kini pautan spesifikasi Kebenaran MCP ke versi 2025-11-25 terkini

#### Modul 05 - Topik Lanjutan
- **Ciri Baru**: Menambah nota mengenai ciri baru MCP Spesifikasi 2025-11-25 (Tugas, Anotasi Alat, Elicitation Mod URL, Roots)
- **Sumber Keselamatan**: Menambah pautan Top 10 OWASP MCP dan bengkel Sherpa ke rujukan tambahan

#### Modul 06 - Sumbangan Komuniti
- **Senarai SDK**: Menambah Swift dan Rust SDK; mengemas kini pautan spesifikasi ke 2025-11-25
- **Rujukan Spesifikasi**: Dikemas kini pautan MCP Spesifikasi ke URL spesifikasi langsung

#### Modul 07 - Pengajaran dari Penggunaan Awal

- **Kemas Kini Sumber**: Ditambah pautan Spesifikasi MCP 2025-11-25 dan OWASP MCP Top 10 ke sumber tambahan

#### Modul 08 - Amalan Terbaik
- **Versi Spesifikasi**: Dikemas kini rujukan Spesifikasi MCP kepada 2025-11-25
- **Sumber Keselamatan**: Ditambah OWASP MCP Top 10 dan bengkel Sherpa ke rujukan tambahan

#### Modul 10 - Melicinkan Aliran Kerja AI
- **Kemas Kini Lencana**: Ditukar lencana versi MCP dari versi SDK (1.9.3) kepada versi spesifikasi (2025-11-25)
- **Pautan Sumber**: Dikemas kini pautan Spesifikasi MCP; ditambah OWASP MCP Top 10

#### Modul 11 - Bengkel Praktikal Server MCP
- **Rujukan Spesifikasi**: Dikemas kini pautan Spesifikasi MCP kepada versi 2025-11-25
- **Sumber Keselamatan**: Ditambah OWASP MCP Top 10 ke sumber rasmi

## 18 Disember 2025

### Kemas Kini Dokumentasi Keselamatan - Spesifikasi MCP 2025-11-25

#### Amalan Terbaik Keselamatan MCP (02-Security/mcp-best-practices.md) - Kemas Kini Versi Spesifikasi
- **Kemas Kini Versi Protokol**: Dikemas kini untuk merujuk Spesifikasi MCP terkini 2025-11-25 (dikeluarkan 25 November 2025)
  - Dikemas kini semua rujukan versi spesifikasi dari 2025-06-18 kepada 2025-11-25
  - Dikemas kini rujukan tarikh dokumen dari 18 Ogos 2025 kepada 18 Disember 2025
  - Disahkan semua URL spesifikasi merujuk dokumentasi terkini
- **Pengesahan Kandungan**: Pengesahan menyeluruh amalan keselamatan terbaik mengikut piawaian terkini
  - **Penyelesaian Keselamatan Microsoft**: Disahkan istilah dan pautan terkini untuk Prompt Shields (dulu dikenali sebagai "pengesanan risiko Jailbreak"), Keselamatan Kandungan Azure, Microsoft Entra ID, dan Azure Key Vault
  - **Keselamatan OAuth 2.1**: Disahkan kesepadanan dengan amalan keselamatan OAuth terkini
  - **Piawaian OWASP**: Disahkan rujukan OWASP Top 10 untuk LLMs kekal terkini
  - **Perkhidmatan Azure**: Disahkan semua pautan dokumentasi Microsoft Azure dan amalan terbaik
- **Kesepadanan Piawaian**: Semua piawaian keselamatan yang dirujuk disahkan kekal terkini
  - Rangka Kerja Pengurusan Risiko AI NIST
  - ISO 27001:2022
  - Amalan Terbaik Keselamatan OAuth 2.1
  - Rangka kerja keselamatan dan pematuhan Azure
- **Sumber Pelaksanaan**: Disahkan semua pautan dan sumber panduan pelaksanaan
  - Corak pengesahan Azure API Management
  - Panduan integrasi Microsoft Entra ID
  - Pengurusan rahsia Azure Key Vault
  - Paip dan penyelesaian DevSecOps untuk pemantauan

### Jaminan Kualiti Dokumentasi
- **Pematuhan Spesifikasi**: Memastikan semua keperluan keselamatan MCP mandatori (MESTI/MESTI TIDAK) selaras dengan spesifikasi terkini
- **Kesegaran Sumber**: Memastikan semua pautan luaran ke dokumentasi Microsoft, piawaian keselamatan, dan panduan pelaksanaan terkini
- **Liputan Amalan Terbaik**: Memastikan liputan menyeluruh tentang pengesahan, kebenaran, ancaman khusus AI, keselamatan rantaian bekalan, dan corak perusahaan

## 6 Oktober 2025

### Perluasan Bahagian Memulakan – Penggunaan Server Lanjutan & Pengesahan Ringkas

#### Penggunaan Server Lanjutan (03-GettingStarted/10-advanced)
- **Bab Baru Ditambah**: Memperkenalkan panduan menyeluruh untuk penggunaan server MCP lanjutan, merangkumi seni bina server biasa dan rendah tahap.
  - **Server Biasa vs Rendah Tahap**: Perbandingan terperinci dan contoh kod dalam Python dan TypeScript untuk kedua-dua pendekatan.
  - **Reka Bentuk Berasaskan Pengendali**: Penjelasan tentang pengurusan alat/sumber/prompt berasaskan pengendali untuk pelaksanaan server yang berskala dan fleksibel.
  - **Corak Praktikal**: Senario dunia sebenar di mana corak server rendah tahap berguna untuk ciri dan seni bina lanjutan.

#### Pengesahan Ringkas (03-GettingStarted/11-simple-auth)
- **Bab Baru Ditambah**: Panduan langkah demi langkah untuk melaksanakan pengesahan ringkas dalam server MCP.
  - **Konsep Pengesahan**: Penjelasan jelas tentang pengesahan vs kebenaran, dan pengendalian kelayakan.
  - **Pelaksanaan Pengesahan Asas**: Corak pengesahan berasaskan middleware dalam Python (Starlette) dan TypeScript (Express), dengan contoh kod.
  - **Perkembangan ke Keselamatan Lanjutan**: Panduan memulakan dengan pengesahan ringkas dan beralih ke OAuth 2.1 dan RBAC, dengan rujukan ke modul keselamatan lanjutan.

Tambahan ini menyediakan panduan praktikal, hands-on untuk membina pelaksanaan server MCP yang lebih kukuh, selamat, dan fleksibel, menghubungkan konsep asas dengan corak pengeluaran lanjutan.

## 29 September 2025

### Bengkel Integrasi Pangkalan Data Server MCP - Laluan Pembelajaran Hands-On Menyeluruh

#### 11-MCPServerHandsOnLabs - Kurikulum Lengkap Integrasi Pangkalan Data Baru
- **Laluan Pembelajaran 13-Bengkel Lengkap**: Ditambah kurikulum praktikal menyeluruh untuk membina server MCP siap pengeluaran dengan integrasi pangkalan data PostgreSQL
  - **Pelaksanaan Dunia Sebenar**: Kes penggunaan analitik Zava Retail yang mempamerkan corak kelas perusahaan
  - **Progresi Pembelajaran Berstruktur**:
    - **Bengkel 00-03: Asas** - Pengenalan, Seni Bina Teras, Keselamatan & Multi-Tenancy, Persediaan Persekitaran
    - **Bengkel 04-06: Membina Server MCP** - Reka Bentuk & Skema Pangkalan Data, Pelaksanaan Server MCP, Pembangunan Alat
    - **Bengkel 07-09: Ciri Lanjutan** - Integrasi Carian Semantik, Ujian & Pengesan Kecacatan, Integrasi VS Code
    - **Bengkel 10-12: Pengeluaran & Amalan Terbaik** - Strategi Pengeluaran, Pemantauan & Kebolehamatan, Amalan Terbaik & Pengoptimuman
  - **Teknologi Perusahaan**: Rangka kerja FastMCP, PostgreSQL dengan pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Ciri Lanjutan**: Keselamatan Tahap Baris (RLS), carian semantik, akses data berbilang penyewa, vector embeddings, pemantauan masa nyata

#### Standardisasi Terminologi - Penukaran Modul ke Bengkel
- **Kemas Kini Dokumentasi Menyeluruh**: Dikemas kini secara sistematik semua fail README dalam 11-MCPServerHandsOnLabs untuk menggunakan terminologi "Bengkel" menggantikan "Modul"
  - **Tajuk Seksyen**: Dikemas kini "Apa Yang Modul Ini Liputi" kepada "Apa Yang Bengkel Ini Liputi" di kesemua 13 bengkel
  - **Penerangan Kandungan**: Ditukar "Modul ini menyediakan..." kepada "Bengkel ini menyediakan..." di seluruh dokumentasi
  - **Objektif Pembelajaran**: Dikemas kini "Menjelang akhir modul ini..." kepada "Menjelang akhir bengkel ini..."
  - **Pautan Navigasi**: Ditukar semua rujukan "Modul XX:" kepada "Bengkel XX:" dalam rujukan silang dan navigasi
  - **Penjejakan Penyelesaian**: Dikemas kini "Selepas menyelesaikan modul ini..." kepada "Selepas menyelesaikan bengkel ini..."
  - **Rujukan Teknikal Dikekalkan**: Mengekalkan rujukan modul Python dalam fail konfigurasi (contoh: `"module": "mcp_server.main"`)

#### Penambahbaikan Panduan Belajar (study_guide.md)
- **Peta Kurikulum Visual**: Ditambah seksyen baru "11. Bengkel Integrasi Pangkalan Data" dengan visualisasi struktur bengkel menyeluruh
- **Struktur Repositori**: Dikemas kini daripada sepuluh kepada sebelas seksyen utama dengan penerangan terperinci 11-MCPServerHandsOnLabs
- **Panduan Laluan Pembelajaran**: Dipertingkatkan arahan navigasi untuk merangkumi seksyen 00-11
- **Liputan Teknologi**: Ditambah butiran integrasi FastMCP, PostgreSQL, perkhidmatan Azure
- **Hasil Pembelajaran**: Menekankan pembangunan server siap pengeluaran, corak integrasi pangkalan data, dan keselamatan perusahaan

#### Penambahbaikan Struktur README Utama
- **Terminologi Berasaskan Bengkel**: Dikemas kini README.md utama dalam 11-MCPServerHandsOnLabs untuk konsistensi penggunaan struktur "Bengkel"
- **Organisasi Laluan Pembelajaran**: Progresi jelas daripada konsep asas hingga pelaksanaan lanjutan ke penyebaran pengeluaran
- **Fokus Dunia Sebenar**: Penekanan pada pembelajaran praktikal dengan corak dan teknologi kelas perusahaan

### Penambahbaikan Kualiti & Konsistensi Dokumentasi
- **Penekanan Pembelajaran Hands-On**: Memperkuat pendekatan praktikal berasaskan bengkel di seluruh dokumentasi
- **Fokus Corak Perusahaan**: Menyorot pelaksanaan siap pengeluaran dan pertimbangan keselamatan perusahaan
- **Integrasi Teknologi**: Liputan menyeluruh perkhidmatan Azure moden dan corak integrasi AI
- **Progresi Pembelajaran**: Laluan terstruktur jelas daripada konsep asas ke penyebaran pengeluaran

## 26 September 2025

### Penambahbaikan Kajian Kes - Integrasi Daftar MCP GitHub

#### Kajian Kes (09-CaseStudy/) - Fokus Pembangunan Ekosistem
- **README.md**: Perluasan besar dengan kajian kes Daftar MCP GitHub yang menyeluruh
  - **Kajian Kes Daftar MCP GitHub**: Kajian kes menyeluruh baru mengkaji pelancaran Daftar MCP GitHub pada September 2025
    - **Analisis Masalah**: Pemeriksaan terperinci cabaran pengesanan dan penyebaran server MCP yang terpecah-belah
    - **Reka Bentuk Penyelesaian**: Pendekatan daftar berpusat GitHub dengan pemasangan VS Code satu klik
    - **Impak Perniagaan**: Peningkatan terukur dalam penerimaan dan produktiviti pembangun
    - **Nilai Strategik**: Fokus pada penyebaran agen modular dan interoperabiliti alat silang
    - **Pembangunan Ekosistem**: Posisikan sebagai platform asas untuk integrasi agenik
  - **Struktur Kajian Kes Dipertingkatkan**: Dikemas kini ketujuh-tujuh kajian kes dengan format konsisten dan penerangan menyeluruh
    - Ejen Pelancongan Azure AI: Penekanan orkestrasi multi-ejen
    - Integrasi Azure DevOps: Fokus automasi aliran kerja
    - Pengambilan Dokumentasi Masa Nyata: Pelaksanaan klien konsol Python
    - Penjana Pelan Belajar Interaktif: Apl web perbualan Chainlit
    - Dokumentasi Dalam Editor: Integrasi VS Code dan GitHub Copilot
    - Pengurusan API Azure: Corak integrasi API perusahaan
    - Daftar MCP GitHub: Pembangunan ekosistem dan platform komuniti
  - **Kesimpulan Menyeluruh**: Seksyen kesimpulan yang ditulis semula menampilkan tujuh kajian kes merangkumi pelbagai dimensi pelaksanaan MCP
    - Integrasi Perusahaan, Orkestrasi Multi-Ejen, Produktiviti Pembangun
    - Pembangunan Ekosistem, Kategori Aplikasi Pendidikan
    - Insight dipertingkatkan dalam corak seni bina, strategi pelaksanaan, dan amalan terbaik
    - Penekanan pada MCP sebagai protokol matang siap pengeluaran

#### Kemas Kini Panduan Belajar (study_guide.md)
- **Peta Kurikulum Visual**: Dikemas kini mindmap untuk memasukkan Daftar MCP GitHub dalam seksyen Kajian Kes
- **Penerangan Kajian Kes**: Dipertingkatkan daripada penerangan generik kepada pecahan terperinci tujuh kajian kes menyeluruh
- **Struktur Repositori**: Dikemas kini seksyen 10 untuk mencerminkan liputan kajian kes menyeluruh dengan butiran pelaksanaan khusus
- **Integrasi Log Perubahan**: Ditambah entri 26 September 2025 yang mendokumentasikan penambahan Daftar MCP GitHub dan penambahbaikan kajian kes
- **Kemas Kini Tarikh**: Dikemas kini cap waktu kaki halaman untuk mencerminkan semakan terkini (26 September 2025)

### Penambahbaikan Kualiti Dokumentasi
- **Penambahbaikan Konsistensi**: Pensuaian format dan struktur kajian kes di semua tujuh contoh
- **Liputan Menyeluruh**: Kajian kes kini merangkumi perusahaan, produktiviti pembangun, dan senario pembangunan ekosistem
- **Penempatan Strategik**: Fokus dipertingkatkan pada MCP sebagai platform asas untuk penyebaran sistem agenik
- **Integrasi Sumber**: Dikemas kini sumber tambahan untuk memasukkan pautan Daftar MCP GitHub

## 15 September 2025

### Perluasan Topik Lanjutan - Pengangkutan Custom & Kejuruteraan Konteks

#### Pengangkutan Custom MCP (05-AdvancedTopics/mcp-transport/) - Panduan Pelaksanaan Lanjutan Baru
- **README.md**: Panduan pelaksanaan lengkap untuk mekanisme pengangkutan MCP custom
  - **Pengangkutan Azure Event Grid**: Pelaksanaan pengangkutan tanpa server berasaskan acara menyeluruh
    - Contoh dalam C#, TypeScript, dan Python dengan integrasi Azure Functions
    - Corak seni bina berasaskan acara untuk solusi MCP berskala
    - Penerima webhook dan pengendalian mesej berasaskan push
  - **Pengangkutan Azure Event Hubs**: Pelaksanaan pengangkutan penstriman berkelajuan tinggi
    - Keupayaan penstriman masa nyata untuk senario latensi rendah
    - Strategi partitioning dan pengurusan checkpoint
    - Pengelompokkan mesej dan pengoptimuman prestasi
  - **Corak Integrasi Perusahaan**: Contoh seni bina siap pengeluaran
    - Pemprosesan MCP teragih merentasi beberapa Azure Functions
    - Seni bina pengangkutan hibrid menggabungkan pelbagai jenis pengangkutan
    - Ketahanan mesej, kebolehpercayaan, dan strategi pengendalian ralat
  - **Keselamatan & Pemantauan**: Integrasi Azure Key Vault dan corak kebolehamatan
    - Pengesahan identiti terurus dan akses keistimewaan minimum
    - Telemetri Application Insights dan pemantauan prestasi
    - Circuit breakers dan corak toleransi kesilapan
  - **Rangka Kerja Ujian**: Strategi ujian menyeluruh untuk pengangkutan custom
    - Ujian unit dengan test doubles dan rangka kerja mocking
    - Ujian integrasi dengan Azure Test Containers
    - Pertimbangan ujian prestasi dan beban

#### Kejuruteraan Konteks (05-AdvancedTopics/mcp-contextengineering/) - Disiplin AI Berkembang
- **README.md**: Eksplorasi menyeluruh kejuruteraan konteks sebagai bidang yang sedang berkembang
  - **Prinsip Teras**: Perkongsian konteks lengkap, kesedaran keputusan tindakan, dan pengurusan tetingkap konteks
  - **Penyesuaian Protokol MCP**: Bagaimana reka bentuk MCP menangani cabaran kejuruteraan konteks
    - Had tetingkap konteks dan strategi pemuatan progresif
    - Penentuan kepentingan dan pengambilan konteks dinamik
    - Pengendalian konteks multi-modal dan pertimbangan keselamatan
  - **Pendekatan Pelaksanaan**: Seni bina berbenang tunggal vs multi-ejen
    - Teknik pemecahan dan keutamaan konteks
    - Strategi pemuatan progresif dan pemampatan konteks
    - Pendekatan konteks berlapis dan pengoptimuman pengambilan
  - **Rangka Kerja Pengukuran**: Metri yang muncul bagi penilaian keberkesanan konteks
    - Kecekapan input, prestasi, kualiti, dan pertimbangan pengalaman pengguna
    - Pendekatan eksperimental untuk pengoptimuman konteks
    - Analisis kegagalan dan metodologi penambahbaikan

#### Kemas Kini Navigasi Kurikulum (README.md)
- **Struktur Modul Dipertingkatkan**: Dikemas kini jadual kurikulum untuk memasukkan topik lanjutan baru
  - Ditambah entri Kejuruteraan Konteks (5.14) dan Pengangkutan Custom (5.15)
  - Format konsisten dan pautan navigasi di semua modul
  - Dikemas kini penerangan untuk mencerminkan skop kandungan semasa

### Penambahbaikan Struktur Direktori
- **Standardisasi Penamaan**: Menamakan semula "mcp transport" kepada "mcp-transport" untuk konsistensi dengan folder topik lanjutan lain
- **Pengurusan Kandungan**: Semua folder 05-AdvancedTopics kini mengikuti corak penamaan konsisten (mcp-[topic])

### Penambahbaikan Kualiti Dokumentasi
- **Penyesuaian Spesifikasi MCP**: Semua kandungan baru merujuk Spesifikasi MCP terkini 2025-06-18
- **Contoh Pelbagai Bahasa**: Contoh kod menyeluruh dalam C#, TypeScript, dan Python

- **Fokus Perusahaan**: Corak sedia produksi dan integrasi awan Azure sepanjang
- **Dokumentasi Visual**: Diagram Mermaid untuk seni bina dan visualisasi aliran

## 18 Ogos 2025

### Kemas Kini Dokumentasi Menyeluruh - Piawaian MCP 2025-06-18

#### Amalan Terbaik Keselamatan MCP (02-Security/) - Pemodenan Lengkap
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Penulisan semula lengkap selaras dengan Spesifikasi MCP 2025-06-18
  - **Keperluan Wajib**: Ditambah keperluan HARUS/ TIDAK BOLEH eksplisit dari spesifikasi rasmi dengan penunjuk visual yang jelas
  - **12 Amalan Keselamatan Teras**: Disusun semula dari senarai 15 item kepada domain keselamatan menyeluruh
    - Keselamatan Token & Pengesahan dengan integrasi pembekal identiti luar
    - Pengurusan Sesi & Keselamatan Pengangkutan dengan keperluan kriptografi
    - Perlindungan Ancaman Khusus AI dengan integrasi Microsoft Prompt Shields
    - Kawalan Akses & Kebenaran dengan prinsip keistimewaan paling rendah
    - Keselamatan Kandungan & Pemantauan dengan integrasi Azure Content Safety
    - Keselamatan Rantaian Bekalan dengan pengesahan komponen menyeluruh
    - Keselamatan OAuth & Pencegahan Deputy Keliru dengan pelaksanaan PKCE
    - Respons Insiden & Pulih dengan keupayaan automatik
    - Pematuhan & Tadbir Urus dengan penyelarasan peraturan
    - Kawalan Keselamatan Lanjutan dengan seni bina kepercayaan sifar
    - Integrasi Ekosistem Keselamatan Microsoft dengan penyelesaian menyeluruh
    - Evolusi Keselamatan Berterusan dengan amalan adaptif
  - **Penyelesaian Keselamatan Microsoft**: Panduan integrasi dipertingkat untuk Prompt Shields, Azure Content Safety, Entra ID, dan GitHub Advanced Security
  - **Sumber Pelaksanaan**: Pautan sumber komprehensif dikategorikan mengikut Dokumentasi Rasmi MCP, Penyelesaian Keselamatan Microsoft, Standard Keselamatan, dan Panduan Pelaksanaan

#### Kawalan Keselamatan Lanjutan (02-Security/) - Pelaksanaan Perusahaan
- **MCP-SECURITY-CONTROLS-2025.md**: Pengubahsuaian lengkap dengan rangka kerja keselamatan tahap perusahaan
  - **9 Domain Keselamatan Menyeluruh**: Diperluas dari kawalan asas kepada rangka kerja perusahaan terperinci
    - Pengesahan & Kebenaran Lanjutan dengan integrasi Microsoft Entra ID
    - Keselamatan Token & Kawalan Anti-Passthrough dengan pengesahan menyeluruh
    - Kawalan Keselamatan Sesi dengan pencegahan pembajakan
    - Kawalan Keselamatan Khusus AI dengan pencegahan suntikan prompt dan keracunan alat
    - Pencegahan Serangan Deputy Keliru dengan keselamatan proksi OAuth
    - Keselamatan Pelaksanaan Alat dengan sandboxing dan pengasingan
    - Kawalan Keselamatan Rantaian Bekalan dengan pengesahan pergantungan
    - Kawalan Pemantauan & Pengecaman dengan integrasi SIEM
    - Respons Insiden & Pulih dengan keupayaan automatik
  - **Contoh Pelaksanaan**: Ditambah blok konfigurasi YAML terperinci dan contoh kod
  - **Integrasi Penyelesaian Microsoft**: Liputan menyeluruh perkhidmatan keselamatan Azure, GitHub Advanced Security, dan pengurusan identiti perusahaan

#### Keselamatan Topik Lanjutan (05-AdvancedTopics/mcp-security/) - Pelaksanaan Sedia Produksi
- **README.md**: Penulisan semula lengkap untuk pelaksanaan keselamatan perusahaan
  - **Penyelarasan Spesifikasi Semasa**: Dikemas kini ke Spesifikasi MCP 2025-06-18 dengan keperluan keselamatan wajib
  - **Pengesahan Dipertingkat**: Integrasi Microsoft Entra ID dengan contoh .NET dan Java Spring Security menyeluruh
  - **Integrasi Keselamatan AI**: Pelaksanaan Microsoft Prompt Shields dan Azure Content Safety dengan contoh Python terperinci
  - **Mitigasi Ancaman Lanjutan**: Contoh pelaksanaan menyeluruh untuk
    - Pencegahan Serangan Deputy Keliru dengan PKCE dan pengesahan persetujuan pengguna
    - Pencegahan Passthrough Token dengan pengesahan audiens dan pengurusan token selamat
    - Pencegahan Pembajakan Sesi dengan pengikatan kriptografi dan analisis tingkah laku
  - **Integrasi Keselamatan Perusahaan**: Pemantauan Azure Application Insights, saluran pengesanan ancaman, dan keselamatan rantaian bekalan
  - **Senarai Semak Pelaksanaan**: Kawalan keselamatan wajib vs. disyorkan dengan faedah ekosistem keselamatan Microsoft yang jelas

### Kualiti Dokumentasi & Penyelarasan Piawaian
- **Rujukan Spesifikasi**: Dikemas kini semua rujukan ke Spesifikasi MCP 2025-06-18 semasa
- **Ekosistem Keselamatan Microsoft**: Panduan integrasi diperkukuh dalam semua dokumentasi keselamatan
- **Pelaksanaan Praktikal**: Ditambah contoh kod terperinci dalam .NET, Java, dan Python dengan corak perusahaan
- **Pengurusan Sumber**: Pengkategorian komprehensif dokumentasi rasmi, standard keselamatan, dan panduan pelaksanaan
- **Penunjuk Visual**: Tanda jelas keperluan wajib vs. amalan disyorkan


#### Konsep Teras (01-CoreConcepts/) - Pemodenan Lengkap
- **Kemas Kini Versi Protokol**: Dikemas kini untuk merujuk Spesifikasi MCP semasa 2025-06-18 dengan penomboran berasaskan tarikh (format YYYY-MM-DD)
- **Penambahbaikan Seni Bina**: Perihalan dipertingkatkan bagi Hos, Pelanggan, dan Pelayan untuk mencerminkan corak seni bina MCP semasa
  - Hos kini jelas ditakrifkan sebagai aplikasi AI yang menyelaraskan banyak sambungan pelanggan MCP
  - Pelanggan diterangkan sebagai penyambung protokol yang mengekalkan hubungan satu-ke-satu dengan pelayan
  - Pelayan dipertingkatkan dengan senario pelaksanaan tempatan vs. jauh
- **Penyusunan Semula Primitif**: Pengubahsuaian lengkap primitif pelayan dan pelanggan
  - Primitif Pelayan: Sumber (punca data), Prompt (templat), Alat (fungsi boleh laksana) dengan penjelasan dan contoh terperinci
  - Primitif Pelanggan: Pengambilan Sampel (penyempurnaan LLM), Elicitation (input pengguna), Logging (debugging/pemantauan)
  - Dikemas kini dengan corak kaedah penemuan (`*/list`), pengambilan (`*/get`), dan pelaksanaan (`*/call`) semasa
- **Seni Bina Protokol**: Memperkenalkan model seni bina dua lapisan
  - Lapisan Data: Asas JSON-RPC 2.0 dengan pengurusan kitar hayat dan primitif
  - Lapisan Pengangkutan: STDIO (tempatan) dan HTTP Boleh Alirkan dengan SSE (pengangkutan jauh)
- **Rangka Kerja Keselamatan**: Prinsip keselamatan komprehensif termasuk persetujuan pengguna eksplisit, perlindungan privasi data, keselamatan pelaksanaan alat, dan keselamatan lapisan pengangkutan
- **Corak Komunikasi**: Kemas kini mesej protokol untuk menunjukkan aliran inisialisasi, penemuan, pelaksanaan, dan pemberitahuan
- **Contoh Kod**: Contoh pelbagai bahasa yang disegar semula (.NET, Java, Python, JavaScript) untuk mencerminkan corak SDK MCP semasa

#### Keselamatan (02-Security/) - Pengubahsuaian Keselamatan Menyeluruh  
- **Penyelarasan Piawaian**: Penyelarasan penuh dengan keperluan keselamatan Spesifikasi MCP 2025-06-18
- **Evolusi Pengesahan**: Dokumentasi evolusi dari pelayan OAuth tersuai kepada delegasi pembekal identiti luar (Microsoft Entra ID)
- **Analisis Ancaman Khusus AI**: Liputan dipertingkatkan tentang vektor serangan AI moden
  - Senario serangan suntikan prompt terperinci dengan contoh dunia sebenar
  - Mekanisme keracunan alat dan corak serangan "rug pull"
  - Keracunan tetingkap konteks dan serangan kekeliruan model
- **Penyelesaian Keselamatan AI Microsoft**: Liputan komprehensif ekosistem keselamatan Microsoft
  - AI Prompt Shields dengan pengesanan lanjutan, penyorotan, dan teknik delimiter
  - Corak integrasi Azure Content Safety
  - GitHub Advanced Security untuk perlindungan rantaian bekalan
- **Mitigasi Ancaman Lanjutan**: Kawalan keselamatan terperinci untuk
  - Pembajakan sesi dengan senario serangan khusus MCP dan keperluan ID sesi kriptografi
  - Masalah deputy keliru dalam senario proksi MCP dengan keperluan persetujuan eksplisit
  - Kerentanan passthrough token dengan kawalan pengesahan wajib
- **Keselamatan Rantaian Bekalan**: Liputan diperluas tentang rantaian bekalan AI termasuk model asas, perkhidmatan embeddings, pembekal konteks, dan API pihak ketiga
- **Keselamatan Asas**: Integrasi dipertingkat dengan corak keselamatan perusahaan termasuk seni bina kepercayaan sifar dan ekosistem keselamatan Microsoft
- **Pengurusan Sumber**: Pautan sumber komprehensif dikategorikan mengikut jenis (Dokumen Rasmi, Standard, Penyelidikan, Penyelesaian Microsoft, Panduan Pelaksanaan)

### Peningkatan Kualiti Dokumentasi
- **Objektif Pembelajaran Berstruktur**: Objektif pembelajaran dipertingkat dengan hasil spesifik dan boleh dilaksanakan
- **Rujukan Silang**: Ditambah pautan antara topik keselamatan dan konsep teras berkaitan
- **Maklumat Semasa**: Dikemas kini semua rujukan tarikh dan pautan spesifikasi ke piawaian semasa
- **Panduan Pelaksanaan**: Ditambah panduan pelaksanaan spesifik dan boleh dilaksanakan di sepanjang kedua-dua bahagian

## 16 Julai 2025

### Penambahbaikan README dan Navigasi
- Direka semula sepenuhnya navigasi kurikulum dalam README.md
- Menggantikan tag `<details>` dengan format berasaskan jadual yang lebih mudah diakses
- Mewujudkan pilihan susun atur alternatif dalam folder "alternative_layouts" baru
- Ditambah contoh navigasi gaya kad, tab, dan akordion
- Dikemas kini bahagian struktur repositori untuk memasukkan semua fail terkini
- Dipertingkatkan bahagian "Cara Menggunakan Kurikulum Ini" dengan cadangan jelas
- Dikemas kini pautan spesifikasi MCP untuk menunjuk ke URL yang betul
- Ditambah bahagian Kejuruteraan Konteks (5.14) ke struktur kurikulum

### Kemas Kini Panduan Belajar
- Direvisi sepenuhnya panduan belajar untuk selaras dengan struktur repositori semasa
- Ditambah bahagian baru untuk Pelanggan dan Alat MCP, dan Pelayan MCP Popular
- Dikemas kini Peta Kurikulum Visual untuk mencerminkan semua topik dengan tepat
- Dipertingkatkan perihalan Topik Lanjutan untuk merangkumi semua bidang khusus
- Dikemas kini bahagian Kajian Kes untuk mencerminkan contoh sebenar
- Ditambah log perubahan menyeluruh ini

### Sumbangan Komuniti (06-CommunityContributions/)
- Ditambah maklumat terperinci tentang pelayan MCP untuk penjanaan imej
- Ditambah bahagian komprehensif mengenai penggunaan Claude dalam VSCode
- Ditambah arahan penyediaan dan penggunaan klien terminal Cline
- Dikemas kini bahagian klien MCP untuk memasukkan semua pilihan klien popular
- Dipertingkatkan contoh sumbangan dengan sampel kod yang lebih tepat

### Topik Lanjutan (05-AdvancedTopics/)
- Mengatur semua folder topik khusus dengan penamaan konsisten
- Ditambah bahan dan contoh kejuruteraan konteks
- Ditambah dokumentasi integrasi ejen Foundry
- Dipertingkatkan dokumentasi integrasi keselamatan Entra ID

## 11 Jun 2025

### Penciptaan Awal
- Dilancarkan versi pertama kurikulum MCP untuk Pemula
- Dibina struktur asas untuk semua 10 bahagian utama
- Melaksanakan Peta Kurikulum Visual untuk navigasi
- Ditambah projek contoh awal dalam pelbagai bahasa pengaturcaraan

### Memulakan (03-GettingStarted/)
- Mencipta contoh pelaksanaan pelayan pertama
- Ditambah panduan pembangunan klien
- Termasuk arahan integrasi klien LLM
- Ditambah dokumentasi integrasi VS Code
- Melaksanakan contoh pelayan Server-Sent Events (SSE)

### Konsep Teras (01-CoreConcepts/)
- Ditambah penjelasan terperinci seni bina klien-pelayan
- Mencipta dokumentasi komponen utama protokol
- Mendokumentasikan corak pesanan dalam MCP

## 23 Mei 2025

### Struktur Repositori
- Memulakan repositori dengan struktur folder asas
- Mencipta fail README untuk setiap bahagian utama
- Menyediakan infrastruktur terjemahan
- Ditambah aset imej dan diagram

### Dokumentasi
- Mencipta README.md awal dengan gambaran keseluruhan kurikulum
- Ditambah CODE_OF_CONDUCT.md dan SECURITY.md
- Menyediakan SUPPORT.md dengan panduan mendapatkan bantuan
- Mencipta struktur panduan belajar awal

## 15 April 2025

### Perancangan dan Rangka Kerja
- Perancangan awal untuk kurikulum MCP untuk Pemula
- Mendefinisikan objektif pembelajaran dan audiens sasaran
- Membentangkan struktur 10 bahagian kurikulum
- Membangunkan rangka kerja konseptual untuk contoh dan kajian kes
- Mencipta prototaip awal contoh untuk konsep utama

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->