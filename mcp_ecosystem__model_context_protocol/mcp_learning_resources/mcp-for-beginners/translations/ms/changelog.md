# Changelog: Kurikulum MCP untuk Pemula

Dokumen ini berfungsi sebagai rekod semua perubahan penting yang dibuat pada kurikulum Model Context Protocol (MCP) untuk Pemula. Perubahan didokumentasikan dalam urutan kronologi terbalik (perubahan terbaru dahulu).

## 16 Jun, 2026

### Penyerasian Spesifikasi MCP & Pengesahan Contoh

Mengesahkan kurikulum mengikut **Spesifikasi MCP 2025-11-25** terkini dan SDK rasmi terbaru, kemudian membetulkan rujukan spesifikasi yang ketinggalan dan mengesahkan contoh teras masih boleh dibina dan dijalankan.

#### Pembetulan Versi Spesifikasi (2025-06-18 / 2025-03-26 → 2025-11-25)

Mengemaskini kandungan Bahasa Inggeris yang masih mendakwa revisi spesifikasi lama adalah standard *semasa/terkini*, dan mengarahkan pautan semula ke laluan spesifikasi kanonik `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Mengemaskini sepanduk "Standard Semasa", pengenalan, tajuk prinsip keselamatan teras, tajuk keperluan mandatori, seksyen Microsoft Entra ID, pautan Rujukan & Sumber, dan notis keselamatan penutup (8 rujukan) kepada 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Mengemaskini pautan spesifikasi Sumber Tambahan dan sepanduk "Standard Semasa" kepada 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Menggantikan pautan `2025-03-26` tamat tempoh security-and-trust dengan halaman amalan terbaik keselamatan terkini 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Mengemaskini pautan dokumen sampel rasmi kepada 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Mengemaskini rujukan "spesifikasi MCP semasa" dalam masa kini dan pautan spesifikasi Sumber Tambahan kepada 2025-11-25 (nota SSE-keputusan sejarah dibiarkan utuh untuk ketepatan)

#### Pengesahan Contoh Mengikut SDK Semasa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` menyelesaikan `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` lulus tanpa ralat jenis — API `McpServer`/`StdioServerTransport` sedia ada masih sah
- **Python (03-GettingStarted/01-first-server/solution/python)**: Diuji dalam `.venv` terasing dengan `mcp[cli]` (1.27.2); `py_compile` lulus dan `FastMCP.list_tools()` mengembalikan alat `add` dan `subtract` dengan betul
- Mengesahkan semua julat versi sampel `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) menyelesaikan dengan bersih kepada `1.29.0` semasa tanpa perubahan API yang membatalkan

#### Penyerasian Pin Kebergantungan (menutup jurang versi)

Menaik taraf pin SDK yang ketinggalan supaya setiap sampel menjejaki keluaran MCP semasa, seiring dengan konvensyen repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Menaik taraf `@modelcontextprotocol/sdk` dari `^1.8.0` → `>=1.26.0` dan mengemaskini deskripsi pakej `"updated for MCP 2025-06-18"` yang usang kepada `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** dan **lab4/code/github_mcp_server/pyproject.toml**: Menaik taraf pin tepat `mcp==1.23.0` → `mcp>=1.26.0`; menjana semula kedua-dua fail `uv.lock` (`uv lock`) supaya fail kunci menyelesaikan kepada `mcp 1.27.2` semasa dan kekal selaras dengan manifes

#### Analisis Jurang Kurikulum — Liputan Ciri Spesifikasi Terbaru

Mengesahkan kurikulum sudah merangkumi semua primitif yang diperkenalkan/dikembangkan dalam MCP 2025-11-25, jadi tiada jurang kandungan kekal:
- **Sampling**: Pelajaran 03-GettingStarted/14-sampling serta 05-AdvancedTopics/mcp-sampling
- **Elicitation (termasuk mod URL)**: Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Didokumentasikan dalam 00-Introduction, 01-CoreConcepts, dan 05-AdvancedTopics/mcp-root-contexts
- **Tugas (eksperimen, operasi jangka panjang)**: Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Anotasi Alat** (`readOnlyHint` / `destructiveHint`): Didokumentasikan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features

### Pengukuhan Keselamatan & Pembetulan Kerentanan Kebergantungan

Menjalankan pemeriksaan keselamatan penuh di seluruh manifes kebergantungan dan kod sumber sampel, kemudian membaiki semua amaran npm yang dilaporkan dan satu penemuan peringkat kod. Selepas pembaikan, `npm audit` melaporkan **0 kerentanan** di setiap direktori yang diaudit.

#### Kerentanan Kebergantungan npm (transitif) — Dibaiki

Mengaudit semua 15 fail `package-lock.json` yang dikomit. Kerentanan terhad kepada kebergantungan transitif yang dibawa masuk oleh alat pembangunan MCP Inspector, pelanggan OpenAI, dan MCP SDK; semuanya kini diselesaikan tanpa mematahkan sampel:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** dan **lab3/code/weather_mcp/inspector**: Menaik taraf `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), yang menghapuskan amaran `ajv`, `brace-expansion`, `diff`, `path-to-regexp` dan `ws` yang dibundel. Menambah entri `overrides` npm memaksa `shell-quote@1.8.4` yang ditampal untuk menghapuskan amaran kritikal tertunggak yang dibawa oleh `concurrently`; menjana semula kedua-dua fail kunci (sekarang 0 kerentanan)
- **03-GettingStarted/samples/typescript**: `npm audit fix` mengemas kini `qs` transitif (sederhana) kepada keluaran tampal
- **03-GettingStarted/samples/javascript**: `npm audit fix` mengemas kini `hono` transitif (sederhana) kepada keluaran tampal
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` mengemas kini `form-data` transitif (tinggi) kepada keluaran tampal
- **03-GettingStarted/11-simple-auth/solution/typescript**: Menjana `package-lock.json` yang hilang supaya projek boleh dihasilkan semula dan diaudit (0 kerentanan)

#### Pembetulan Keselamatan Peringkat Kod (OWASP A03: Injeksi)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Mengalih keluar `shell=True` dari alat `open_in_vscode`. Sebelum ini `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` membolehkan metakarakter shell dalam laluan folder diinterpretasi oleh `cmd.exe` (vektor suntikan arahan). Kini ia melancarkan `Code.exe` yang diselesaikan terus dengan folder sebagai argumen — tiada shell — yang setara secara fungsional dan selamat

#### Audit Kebergantungan Python

- Mengaudit setiap set keperluan Python dengan `pip-audit`. `05-AdvancedTopics` dan `03-GettingStarted/samples/python` melaporkan **tiada kerentanan diketahui** (julaat `mcp` / `httpx` / `pydantic` / `python-dotenv` mereka menyelesaikan kepada keluaran tampal semasa)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` menandakan kebergantungan transitif **`werkzeug` 3.1.1** dengan tiga amaran DoS nama peranti Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, dan `CVE-2026-27199` (semuanya dibetulkan dalam 3.1.6). Menambah pin keselamatan eksplisit `werkzeug>=3.1.6` supaya keluaran tampal diselesaikan; mengesahkan kekangan menyelesaikan dengan bersih bersama timbunan `chainlit` / `mcp` / `semantic-kernel`

### Penjenamaan Semula Nama Produk

Mengemaskini semua kandungan kurikulum untuk mencerminkan penjenamaan semula produk Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Mengemaskini pautan komuniti Discord
- **AGENTS.md**: Mengemaskini rujukan pelayan Discord
- **README.md**: Mengemaskini rujukan ekosistem teknologi
- **study_guide.md**: Mengemaskini rujukan kajian kes
- **05-AdvancedTopics/README.md**: Mengemaskini tajuk dan deskripsi Modul 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Mengemaskini tajuk seksyen dan deskripsi
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kemas kini penuh tajuk modul dan isi kandungan
- **05-AdvancedTopics/mcp-security-entra/README.md**: Mengemaskini pautan rujukan silang
- **07-LessonsfromEarlyAdoption/README.md**: Mengemaskini rujukan kajian kes
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Mengemaskini tajuk Seksyen 9, lencana, dan kebolehan
- **08-BestPractices/README.md**: Mengemaskini pautan komuniti Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Mengemaskini rujukan saluran Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Mengemaskini rujukan penyebaran model
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Mengemaskini jadual Perkhidmatan AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Mengemaskini rujukan sumber

#### AI Toolkit / AITK → Sambungan Toolkit Microsoft Foundry untuk VS Code
- **README.md**: Mengemaskini rujukan utama kurikulum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Mengemaskini tajuk modul, gambaran keseluruhan, dan semua tajuk modul
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Mengemaskini tajuk, objektif pembelajaran, arahan persediaan, dan sumber
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Mengemaskini tajuk, objektif pembelajaran, jadual hos MCP, dan rujukan silang
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Mengemaskini tajuk, lencana, prasyarat, dan sumber
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Mengemaskini rujukan Pembina Ejen dan pautan maklum balas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Mengemaskini prasyarat dan rujukan sambungan

---

## 11 April, 2026

### Pelajaran Baru, Pembetulan Dokumentasi, dan Kemas Kini Kebergantungan

#### Kandungan Kurikulum Baru Ditambah

**Modul 05 - Topik Lanjutan**
- **Pelajaran 5.17: Penalaran Multi-Ejen Berlawanan dengan MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Panduan komprehensif baru yang merangkumi corak debat berlawanan untuk sistem multi-ejen
  - Diagram seni bina mermaid: dua ejen → pelayan MCP kongsi → transkrip debat → hakim → keputusan
  - Pelayan alat MCP kongsi (`web_search` + `run_python`) dilaksanakan dalam Python dan TypeScript
  - Prompt sistem bertentangan (UNTUK / MENENTANG / Hakim) dengan keperluan penggunaan alat yang jelas
  - Pengarah debat dalam Python, TypeScript, dan C# mengurus pusingan dan laluan hujah
  - Pendawaian MCP `ClientSession` untuk pengarah ke panggilan alat sebenar
  - Jadual kes penggunaan (pengesanan halusinasi, pemodelan ancaman, tinjauan reka bentuk API, pengesahan fakta, pemilihan teknologi)
  - Pertimbangan keselamatan: pelaksanaan berasingan sandbox, pengesahan panggilan alat, had kadar, rekod audit
  - Latihan berstruktur dengan tiga senario praktikal (semakan kod, keputusan seni bina, pengawalan kandungan)

#### Pembetulan Dokumentasi

**Modul 03 - Bermula**
- **05-stdio-server/README.md**: Memperbaiki contoh pelayan stdio TypeScript yang tidak lengkap — menambah instansiasi pengangkutan yang hilang (`new StdioServerTransport()`) dan panggilan `server.connect(transport)` untuk menyamai contoh Python dan .NET dalam seksyen sama
- **14-sampling/README.md**: Memperbaiki kesilapan taip — membetulkan `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Kemas Kini Kurikulum

**README.md Utama**
- Menambah entri 5.17 (Penalaran Multi-Ejen Berlawanan dengan MCP) ke jadual kurikulum dengan pautan terus ke pelajaran baru

**05-AdvancedTopics/README.md**
- Menambah baris Pelajaran 5.17 ke jadual pelajaran

**study_guide.md**
- Menambah topik Penalaran Multi-Ejen Berlawanan ke peta minda dan penerangan prosa Topik Lanjutan

#### Pembetulan Kod dan Keselamatan

**Modul 05 - Ejen Berlawanan (`mcp-adversarial-agents`)**
- **Pembetulan keselamatan — suntikan arahan**: Menggantikan interpolasi shell `execSync` dengan `execFile` + `promisify` dalam alat TypeScript `run_python`, menghapus permukaan suntikan arahan (kod yang dikawal LLM kini dihantar sebagai elemen argv literal tanpa penglibatan shell)
- **Wayar gelung alat MCP**: Dikemas kini pengatur debat Python untuk menggunakan klien `AsyncAnthropic` (menggantikan `Anthropic` sinkron yang menghalang), mempass sesi `ClientSession` langsung ke setiap giliran ejen, mengambil definisi alat melalui `session.list_tools()` setiap giliran, dan mengedarkan blok `tool_use` melalui `session.call_tool()` dalam gelung sehingga model mengeluarkan respons teks akhir.

#### Kemas Kini Kebergantungan

- Meningkatkan `hono` ke 4.12.12 merentasi pelbagai pakej (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Meningkatkan `@hono/node-server` dari 1.19.11 kepada 1.19.13 dalam pakej TypeScript
- Meningkatkan `cryptography` dari 46.0.5 kepada 46.0.7 dalam pakej Python (makmal 10-StreamliningAIWorkflows 3 dan 4)
- Meningkatkan `lodash` dari 4.17.23 kepada 4.18.1 dalam pemeriksa 10-StreamliningAIWorkflows

#### Terjemahan

- Diselaraskan terjemahan untuk 48+ bahasa dengan perubahan sumber terkini (kemaskini i18n)

---

## 5 Februari 2026

### Peningkatan Pengesahan dan Navigasi Merentasi Repositori

#### Kandungan Kurikulum Baru Ditambah

**Modul 03 - Bermula**
- **12-mcp-hosts/README.md**: Panduan komprehensif baharu untuk menyediakan hos MCP
  - Contoh konfigurasi Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Templat konfigurasi JSON untuk semua hos utama
  - Jadual perbandingan jenis pengangkutan (stdio, SSE/HTTP, WebSocket)
  - Penyelesaian masalah sambungan biasa
  - Amalan keselamatan terbaik untuk konfigurasi hos

- **13-mcp-inspector/README.md**: Panduan penguraian pepijat baharu untuk MCP Inspector
  - Kaedah pemasangan (npx, npm global, dari sumber)
  - Menyambung ke pelayan melalui stdio dan HTTP/SSE
  - Alat ujian, sumber, dan aliran kerja arahan
  - Integrasi VS Code dengan MCP Inspector
  - Senario penguraian pepijat biasa beserta penyelesaian

**Modul 04 - Pelaksanaan Praktikal**
- **pagination/README.md**: Panduan pelaksanaan penomboran halaman baharu
  - Corak penomboran halaman berasaskan kursor dalam Python, TypeScript, Java
  - Pengendalian penomboran halaman sisi klien
  - Strategi reka bentuk kursor (tidak telus vs berstruktur)
  - Cadangan pengoptimuman prestasi

**Modul 05 - Topik Lanjutan**
- **mcp-protocol-features/README.md**: Penjelasan mendalam ciri protokol baharu
  - Pelaksanaan pemberitahuan kemajuan
  - Corak pembatalan permintaan
  - Templat sumber dengan corak URI
  - Pengurusan kitar hayat pelayan
  - Kawalan tahap log
  - Corak pengendalian ralat dengan kod JSON-RPC

#### Pembaikan Navigasi (24+ fail dikemas kini)

**README Modul Utama**
 Kini pautan kepada pelajaran pertama DAN modul seterusnya

**Sub-fail 02-Security**
- Semua 5 dokumen keselamatan tambahan kini mempunyai navigasi "Apa Seterusnya":

**Fail 09-CaseStudy**
- Semua fail kajian kes kini mempunyai navigasi berurutan:

**Makmal 10-StreamliningAI**
Ditambah seksyen Apa Seterusnya pada gambaran keseluruhan Modul 10 dan Modul 11

#### Pembaikan Kod dan Kandungan

**Kemas Kini SDK dan Kebergantungan**
Memperbaiki versi openai kosong kepada `^4.95.0`
Mengemas kini SDK dari `^1.8.0` ke `>=1.26.0`
Mengemas kini pin versi mcp ke `>=1.26.0`

**Pembaikan Kod**
Memperbaiki model tidak sah `gpt-4o-mini` kepada `gpt-4.1-mini`

**Pembaikan Kandungan**
Memperbaiki pautan rosak `READMEmd` → `README.md`, membetulkan tajuk kurikulum `Module 1-3` → `Module 0-3`, membetulkan laluan sensitif huruf besar kecil
Mengeluarkan kandungan pendua Kajian Kes 5 yang rosak

**Penambahbaikan Panduan Pemula**
Menambah pengenalan yang betul, objektif pembelajaran, dan prasyarat untuk pemula

#### Kemas Kini Kurikulum

**README.md Utama**
- Menambah entri 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Ciri Protokol) ke jadual kurikulum

**README Modul**
Menambah pelajaran 12 dan 13 ke senarai pelajaran
Menambah seksyen Panduan Praktikal dengan pautan penomboran halaman
Menambah pelajaran 5.15 (Pengangkutan Tersuai) dan 5.16 (Ciri Protokol)

**study_guide.md**
- Mengemas kini peta minda dengan semua topik baharu: Penetapan Hos MCP, MCP Inspector, Strategi Penomboran Halaman, Penjelajahan Ciri Protokol

## 28 Januari 2026

### Semakan Pematuhan Spesifikasi MCP 2025-11-25

#### Peningkatan Konsep Teras (01-CoreConcepts/)
- **Primitif Klien Baharu - Roots**: Menambah dokumentasi komprehensif mengenai primitif Roots klien, membolehkan pelayan memahami sempadan sistem fail dan kebenaran akses
- **Anotasi Alat**: Menambah dokumentasi tentang anotasi tingkah laku alat (`readOnlyHint`, `destructiveHint`) untuk keputusan pelaksanaan alat lebih baik
- **Panggilan Alat dalam Sampling**: Mengemas kini dokumentasi Sampling untuk menyertakan parameter `tools` dan `toolChoice` bagi panggilan alat dikawal model semasa permintaan sampling
- **Elicitation Mod URL**: Menambah dokumentasi mengenai elicitation berasaskan URL untuk interaksi web luaran yang diinisiasi pelayan
- **Tugas (Eksperimen)**: Menambah bahagian baru memaparkan ciri Tugas eksperimen untuk pembungkus pelaksanaan berdaya tahan dan pengambilan keputusan tertangguh
- **Sokongan Ikon**: Menyatakan bahawa alat, sumber, templat sumber, dan arahan boleh mempunyai ikon sebagai metadata tambahan

#### Kemas Kini Dokumentasi
- **README.md**: Menambah rujukan versi Spesifikasi MCP 2025-11-25 dan penerangan penomboran versi berdasarkan tarikh
- **study_guide.md**: Mengemas kini peta kurikulum untuk memasukkan Tugas dan Anotasi Alat dalam bahagian Konsep Teras; mengemas kini cap masa dokumen

#### Pengesahan Pematuhan Spesifikasi
- **Versi Protokol**: Mengesahkan semua dokumentasi merujuk Spesifikasi MCP 2025-11-25 terkini
- **Penjajaran Seni Bina**: Mengesahkan ketepatan dokumentasi seni bina dua lapisan (Lapisan Data + Lapisan Pengangkutan)
- **Dokumentasi Primitif**: Mengesahkan primitif pelayan (Sumber, Arahan, Alat) dan primitif klien (Sampling, Elicitation, Logging, Roots)
- **Mekanisme Pengangkutan**: Mengesahkan ketepatan dokumentasi pengangkutan STDIO dan HTTP boleh penstriman
- **Panduan Keselamatan**: Mengesahkan penjajaran dengan Amalan Terbaik Keselamatan MCP terkini

#### Ciri Utama MCP 2025-11-25 Didokumentasi
- **Penemuan OpenID Connect**: Penemuan pelayan pengesahan melalui OIDC
- **Dokumen Metadata ID Klien OAuth**: Mekanisme pendaftaran klien yang disyorkan
- **JSON Schema 2020-12**: Dialek lalai untuk definisi skema MCP
- **Sistem Peringkat SDK**: Keperluan formal untuk sokongan dan penyelenggaraan ciri SDK
- **Struktur Tadbir Urus**: Pembentukan Kumpulan Kerja dan Kumpulan Kepentingan dalam tadbir urus MCP

### Kemas Kini Dokumentasi Keselamatan Besar (02-Security/)

#### Integrasi Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)
- **Sumber Latihan Praktikal Baharu**: Menambah integrasi komprehensif dengan [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) dalam semua dokumentasi keselamatan
- **Liputan Laluan Ekspedisi**: Mendokumentasikan kemajuan lengkap dari Kem Asas ke Kemuncak
- **Penjajaran OWASP**: Semua panduan keselamatan kini memetakan risiko Panduan Keselamatan Azure MCP OWASP

#### Integrasi OWASP MCP Top 10
- **Seksian Baharu**: Menambah jadual 10 Risiko Keselamatan Teratas OWASP MCP dengan mitigasi Azure dalam README Keselamatan utama
- **Dokumentasi Berasaskan Risiko**: Mengemas kini mcp-security-controls-2025.md dengan rujukan risiko OWASP MCP untuk setiap domain keselamatan
- **Seni Bina Rujukan**: Pautan ke seni bina rujukan dan corak pelaksanaan Panduan Keselamatan Azure OWASP MCP

#### Fail Keselamatan Dikemas Kini
- **README.md**: Menambah gambaran keseluruhan Bengkel Sherpa, jadual laluan ekspedisi, ringkasan risiko OWASP MCP Top 10, dan seksyen latihan praktikal
- **mcp-security-controls-2025.md**: Mengemas kini tajuk ke Februari 2026, menambah rujukan risiko OWASP (MCP01-MCP08), membetulkan ketidakselarasan versi spesifikasi
- **mcp-security-best-practices-2025.md**: Menambah seksyen sumber Sherpa dan OWASP, mengemas kini cap masa
- **mcp-best-practices.md**: Menambah seksyen latihan praktikal dengan pautan Sherpa dan OWASP
- **azure-content-safety-implementation.md**: Menambah rujukan OWASP MCP06, penjajaran Kem Sherpa 3, dan seksyen sumber tambahan

#### Pautan Sumber Baharu Ditambah
- [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/)
- [Panduan Keselamatan Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Halaman risiko OWASP MCP individu (MCP01-MCP10)

### Penjajaran Spesifikasi MCP 2025-11-25 Merentasi Kurikulum

#### Modul 03 - Bermula
- **Dokumentasi SDK**: Menambah Go SDK ke senarai SDK rasmi; mengemas kini semua rujukan SDK agar selaras dengan Spesifikasi MCP 2025-11-25
- **Penjelasan Pengangkutan**: Mengemas kini penerangan pengangkutan STDIO dan Streaming HTTP dengan rujukan spesifikasi yang jelas

#### Modul 04 - Pelaksanaan Praktikal
- **Kemas Kini SDK**: Menambah Go SDK; mengemas kini senarai SDK dengan rujukan versi spesifikasi
- **Spesifikasi Kebenaran**: Mengemas kini pautan spesifikasi Kebenaran MCP ke versi terkini 2025-11-25

#### Modul 05 - Topik Lanjutan
- **Ciri Baharu**: Menambah nota mengenai ciri baharu Spesifikasi MCP 2025-11-25 (Tugas, Anotasi Alat, Elicitation Mod URL, Roots)
- **Sumber Keselamatan**: Menambah pautan OWASP MCP Top 10 dan bengkel Sherpa ke rujukan tambahan

#### Modul 06 - Sumbangan Komuniti
- **Senarai SDK**: Menambah Swift dan Rust SDK; mengemas kini pautan spesifikasi ke 2025-11-25
- **Rujukan Spesifikasi**: Mengemas kini pautan Spesifikasi MCP ke URL spesifikasi langsung

#### Modul 07 - Pelajaran Dari Penggunaan Awal
- **Kemas Kini Sumber**: Menambah pautan Spesifikasi MCP 2025-11-25 dan OWASP MCP Top 10 ke sumber tambahan

#### Modul 08 - Amalan Terbaik
- **Versi Spesifikasi**: Mengemas kini rujukan Spesifikasi MCP ke 2025-11-25
- **Sumber Keselamatan**: Menambah OWASP MCP Top 10 dan bengkel Sherpa ke rujukan tambahan

#### Modul 10 - Memperkemas Aliran Kerja AI
- **Kemas Kini Lencana**: Menukar lencana versi MCP daripada versi SDK (1.9.3) kepada versi spesifikasi (2025-11-25)
- **Pautan Sumber**: Mengemas kini pautan Spesifikasi MCP; menambah OWASP MCP Top 10

#### Modul 11 - Makmal Hands-On Pelayan MCP
- **Rujukan Spesifikasi**: Mengemas kini pautan Spesifikasi MCP ke versi 2025-11-25
- **Sumber Keselamatan**: Menambah OWASP MCP Top 10 ke sumber rasmi

## 18 Disember 2025

### Kemas Kini Dokumentasi Keselamatan - Spesifikasi MCP 2025-11-25

#### Amalan Terbaik Keselamatan MCP (02-Security/mcp-best-practices.md) - Kemas Kini Versi Spesifikasi
- **Kemas Kini Versi Protokol**: Dikemas kini untuk merujuk Spesifikasi MCP 2025-11-25 terkini (dikeluarkan 25 November 2025)
  - Dikemaskini semua rujukan versi spesifikasi dari 2025-06-18 ke 2025-11-25
  - Dikemaskini rujukan tarikh dokumen dari 18 Ogos 2025 ke 18 Disember 2025
  - Disahkan semua URL spesifikasi merujuk dokumentasi terkini
- **Pengesahan Kandungan**: Pengesahan komprehensif amalan terbaik keselamatan mengikut piawaian terkini
  - **Penyelesaian Keselamatan Microsoft**: Disahkan istilah dan pautan terkini untuk Prompt Shields (sebelum ini "pengesanan risiko jailbreak"), Azure Content Safety, Microsoft Entra ID, dan Azure Key Vault
  - **Keselamatan OAuth 2.1**: Disahkan penjajaran dengan amalan terbaik keselamatan OAuth terkini
  - **Piawaian OWASP**: Disahkan rujukan OWASP Top 10 untuk LLM masih terkini
  - **Perkhidmatan Azure**: Disahkan semua pautan dokumentasi Microsoft Azure dan amalan terbaik
- **Penjajaran Piawaian**: Semua piawaian keselamatan yang dirujuk disahkan terkini
  - Rangka Kerja Pengurusan Risiko AI NIST
  - ISO 27001:2022
  - Amalan Terbaik Keselamatan OAuth 2.1
  - Rangka kerja keselamatan dan pematuhan Azure
- **Sumber Pelaksanaan**: Disahkan semua pautan panduan pelaksanaan dan sumber
  - Corak pengesahan Azure API Management
  - Panduan integrasi Microsoft Entra ID
  - Pengurusan rahsia Azure Key Vault
  - Penyelesaian pemantauan dan pipeline DevSecOps

### Jaminan Kualiti Dokumentasi
- **Pematuhan Spesifikasi**: Memastikan semua keperluan keselamatan MCP mandatori (MESTI/TIDAK BOLEH) selaras dengan spesifikasi terkini
- **Kesegaran Sumber**: Mengesahkan semua pautan luaran kepada dokumentasi Microsoft, piawaian keselamatan, dan panduan pelaksanaan
- **Liputan Amalan Terbaik**: Disahkan liputan menyeluruh terhadap pengesahan, kebenaran, ancaman khusus AI, keselamatan rantai bekalan, dan corak perusahaan

## 6 Oktober 2025

### Pengembangan Seksyen Bermula – Penggunaan Pelayan Lanjutan & Pengesahan Mudah

#### Penggunaan Pelayan Lanjutan (03-GettingStarted/10-advanced)
- **Bab Baharu Ditambah**: Memperkenalkan panduan komprehensif bagi penggunaan pelayan MCP lanjutan, merangkumi seni bina pelayan biasa dan tahap rendah.
  - **Pelayan Biasa vs Tahap Rendah**: Perbandingan terperinci dan contoh kod dalam Python dan TypeScript untuk kedua-dua pendekatan.
  - **Reka Bentuk Berasaskan Pengendali**: Penjelasan pengurusan alat/sumber/arahan berasaskan pengendali untuk pelaksanaan pelayan yang boleh diskalakan dan fleksibel.
  - **Corak Praktikal**: Senario dunia nyata di mana corak pelayan tahap rendah bermanfaat untuk ciri dan seni bina lanjutan.
#### Pengesahan Mudah (03-GettingStarted/11-simple-auth)
- **Bab Baru Ditambah**: Panduan langkah demi langkah untuk melaksanakan pengesahan mudah dalam pelayan MCP.
  - **Konsep Auth**: Penjelasan jelas mengenai pengesahan berbanding kebenaran, dan pengurusan kelayakan.
  - **Pelaksanaan Auth Asas**: Corak pengesahan berasaskan middleware dalam Python (Starlette) dan TypeScript (Express), dengan contoh kod.
  - **Kemajuan ke Keselamatan Lanjutan**: Panduan memulakan dengan auth mudah dan beralih ke OAuth 2.1 dan RBAC, dengan rujukan kepada modul keselamatan lanjutan.

Penambahan ini menyediakan panduan praktikal dan langsung untuk membina pelayan MCP yang lebih kukuh, selamat, dan fleksibel, menghubungkan konsep asas dengan corak pengeluaran lanjutan.

## 29 September 2025

### Makmal Integrasi Pangkalan Data Pelayan MCP - Laluan Pembelajaran Praktikal Komprehensif

#### 11-MCPServerHandsOnLabs - Kurikulum Lengkap Integrasi Pangkalan Data Baru
- **Laluan Pembelajaran 13 Makmal Lengkap**: Ditambah kurikulum praktikal komprehensif untuk membina pelayan MCP siap pengeluaran dengan integrasi pangkalan data PostgreSQL
  - **Pelaksanaan Dunia Sebenar**: Kes penggunaan analitik Zava Retail menunjukkan corak gred perusahaan
  - **Kemajuan Pembelajaran Berstruktur**:
    - **Makmal 00-03: Asas** - Pengenalan, Seni Bina Teras, Keselamatan & Multi-Penyewa, Persediaan Persekitaran
    - **Makmal 04-06: Membina Pelayan MCP** - Reka Bentuk & Skema Pangkalan Data, Pelaksanaan Pelayan MCP, Pembangunan Alat  
    - **Makmal 07-09: Ciri Lanjutan** - Integrasi Carian Semantik, Ujian & Pengesan Ralat, Integrasi VS Code
    - **Makmal 10-12: Pengeluaran & Amalan Terbaik** - Strategi Pelaksanaan, Pemantauan & Kebolehlihatan, Amalan Terbaik & Pengoptimuman
  - **Teknologi Perusahaan**: Rangka kerja FastMCP, PostgreSQL dengan pgvector, penyematan Azure OpenAI, Azure Container Apps, Application Insights
  - **Ciri Lanjutan**: Keselamatan Tahap Baris (RLS), carian semantik, akses data berbilang penyewa, penyematan vektor, pemantauan masa nyata

#### Penyeragaman Terminologi - Penukaran Modul ke Makmal
- **Kemas Kini Dokumentasi Komprehensif**: Sistematik mengemas kini semua fail README dalam 11-MCPServerHandsOnLabs untuk menggunakan terminologi "Makmal" menggantikan "Modul"
  - **Tajuk Bahagian**: Mengubah "Apa Yang Modul Ini Liputi" kepada "Apa Yang Makmal Ini Liputi" di kesemua 13 makmal
  - **Penerangan Kandungan**: Menukar "Modul ini menyediakan..." kepada "Makmal ini menyediakan..." di seluruh dokumentasi
  - **Objektif Pembelajaran**: Mengubah "Menjelang akhir modul ini..." kepada "Menjelang akhir makmal ini..."
  - **Pautan Navigasi**: Menukar semua rujukan "Modul XX:" kepada "Makmal XX:" dalam silang rujukan dan navigasi
  - **Penjejakan Penyelesaian**: Mengubah "Selepas menyelesaikan modul ini..." kepada "Selepas menyelesaikan makmal ini..."
  - **Rujukan Teknikal Dikekalkan**: Mengekalkan rujukan modul Python dalam fail konfigurasi (contoh: `"module": "mcp_server.main"`)

#### Penambahbaikan Panduan Pembelajaran (study_guide.md)
- **Peta Kurikulum Visual**: Menambah bahagian baru "11. Makmal Integrasi Pangkalan Data" dengan visualisasi struktur makmal komprehensif
- **Struktur Repositori**: Dikemaskini daripada sepuluh menjadi sebelas bahagian utama dengan penerangan terperinci 11-MCPServerHandsOnLabs
- **Panduan Laluan Pembelajaran**: Dipertingkatkan arahan navigasi untuk meliputi bahagian 00-11
- **Liputan Teknologi**: Ditambah perincian integrasi FastMCP, PostgreSQL, perkhidmatan Azure
- **Hasil Pembelajaran**: Menekankan pembangunan pelayan siap pengeluaran, corak integrasi pangkalan data, dan keselamatan perusahaan

#### Penambahbaikan Struktur README Utama
- **Terminologi Berasaskan Makmal**: Mengemas kini README.md utama dalam 11-MCPServerHandsOnLabs untuk menggunakan struktur "Makmal" secara konsisten
- **Organisasi Laluan Pembelajaran**: Kemajuan jelas dari konsep asas hingga pelaksanaan lanjutan dan pelaksanaan pengeluaran
- **Fokus Dunia Sebenar**: Penekanan pada pembelajaran praktikal dengan corak dan teknologi bertaraf perusahaan

### Penambahbaikan Kualiti & Konsistensi Dokumentasi
- **Penekanan Pembelajaran Praktikal**: Mengukuhkan pendekatan berasaskan makmal di seluruh dokumentasi
- **Fokus Corak Perusahaan**: Menonjolkan pelaksanaan siap pengeluaran dan pertimbangan keselamatan perusahaan
- **Integrasi Teknologi**: Liputan komprehensif perkhidmatan Azure moden dan corak integrasi AI
- **Kemajuan Pembelajaran**: Laluan jelas dan berstruktur dari konsep asas ke pelaksanaan pengeluaran

## 26 September 2025

### Penambahbaikan Kajian Kes - Integrasi Daftar MCP GitHub

#### Kajian Kes (09-CaseStudy/) - Fokus Pembangunan Ekosistem
- **README.md**: Pengembangan besar dengan kajian kes lengkap Daftar MCP GitHub
  - **Kajian Kes Daftar MCP GitHub**: Kajian kes komprehensif baru meneliti pelancaran Daftar MCP GitHub pada September 2025
    - **Analisis Masalah**: Pemeriksaan terperinci cabaran penemuan dan pelaksanaan pelayan MCP yang terpecah-pecah
    - **Seni Bina Penyelesaian**: Pendekatan daftar berpusat GitHub dengan pemasangan VS Code satu klik
    - **Impak Perniagaan**: Peningkatan boleh diukur dalam onboarding pembangun dan produktiviti
    - **Nilai Strategik**: Fokus pada pelaksanaan ejen modular dan interoperabiliti merentas alat
    - **Pembangunan Ekosistem**: Memposisikan sebagai platform asas untuk integrasi agen
  - **Struktur Kajian Kes Dipertingkatkan**: Dikemas kini semua tujuh kajian kes dengan format konsisten dan penerangan komprehensif
    - Ejen Perjalanan Azure AI: Penekanan orkestrasi multi-ejen
    - Integrasi Azure DevOps: Fokus automasi aliran kerja
    - Pengambilan Dokumentasi Masa Nyata: Pelaksanaan klien konsol Python
    - Penjana Pelan Kajian Interaktif: Aplikasi perbualan web Chainlit
    - Dokumentasi Dalam Penyunting: Integrasi VS Code dan GitHub Copilot
    - Pengurusan API Azure: Corak integrasi API perusahaan
    - Daftar MCP GitHub: Pembangunan ekosistem dan platform komuniti
  - **Kesimpulan Komprehensif**: Bahagian kesimpulan ditulis semula menyorot tujuh kajian kes merangkumi pelbagai dimensi pelaksanaan MCP
    - Integrasi Perusahaan, Orkestrasi Multi-Ejen, Produktiviti Pembangun
    - Pembangunan Ekosistem, Kategori Aplikasi Pendidikan
    - Wawasan diperluas terhadap corak seni bina, strategi pelaksanaan dan amalan terbaik
    - Penekanan MCP sebagai protokol matang siap pengeluaran

#### Kemas Kini Panduan Pembelajaran (study_guide.md)
- **Peta Kurikulum Visual**: Dikemaskini mindmap untuk memasukkan Daftar MCP GitHub dalam bahagian Kajian Kes
- **Penerangan Kajian Kes**: Dipertingkatkan dari penerangan umum kepada pecahan terperinci tujuh kajian kes komprehensif
- **Struktur Repositori**: Dikemas kini bahagian 10 untuk mencerminkan liputan kajian kes komprehensif dengan butiran pelaksanaan khusus
- **Integrasi Changelog**: Ditambah entri 26 September 2025 mem dokumentasikan penambahan Daftar MCP GitHub dan peningkatan kajian kes
- **Kemas Kini Tarikh**: Tarikh kakitangan dikemaskini untuk mencerminkan semakan terkini (26 September 2025)

### Penambahbaikan Kualiti Dokumentasi
- **Penambahbaikan Konsistensi**: Memperkemaskan format dan struktur kajian kes di tujuh contoh
- **Liputan Komprehensif**: Kajian kes kini merangkumi perusahaan, produktiviti pembangun, dan senario pembangunan ekosistem
- **Penentuan Strategik**: Fokus dipertingkatkan pada MCP sebagai platform asas untuk pelaksanaan sistem agen
- **Integrasi Sumber**: Dikemas kini sumber tambahan untuk memasukkan pautan Daftar MCP GitHub

## 15 September 2025

### Pengembangan Topik Lanjutan - Pengangkutan Khusus & Kejuruteraan Konteks

#### Pengangkutan Khusus MCP (05-AdvancedTopics/mcp-transport/) - Panduan Pelaksanaan Lanjutan Baru
- **README.md**: Panduan pelaksanaan lengkap untuk mekanisme pengangkutan MCP khusus
  - **Pengangkutan Azure Event Grid**: Pelaksanaan pengangkutan tanpa pelayan berasaskan peristiwa menyeluruh
    - Contoh C#, TypeScript, dan Python dengan integrasi Azure Functions
    - Corak seni bina berasaskan peristiwa untuk penyelesaian MCP boleh skala
    - Penerima webhook dan pengendalian mesej berasaskan tolak
  - **Pengangkutan Azure Event Hubs**: Pelaksanaan pengangkutan penstriman berkelajuan tinggi
    - Keupayaan penstriman masa nyata untuk senario kelewatan rendah
    - Strategi pembahagian dan pengurusan checkpoint
    - Penyatuan mesej dan pengoptimuman prestasi
  - **Corak Integrasi Perusahaan**: Contoh seni bina siap pengeluaran
    - Pemprosesan MCP diagihkan merentas pelbagai Azure Functions
    - Seni bina pengangkutan hibrid menggabungkan pelbagai jenis pengangkutan
    - Ketahanan mesej, kebolehpercayaan, dan strategi pengendalian ralat
  - **Keselamatan & Pemantauan**: Integrasi Azure Key Vault dan corak kebolehlihatan
    - Pengesahan identiti terurus dan akses keistimewaan paling minimum
    - Telemetri Application Insights dan pemantauan prestasi
    - Pemutus litar dan corak ketahanan ralat
  - **Rangka Kerja Ujian**: Strategi ujian komprehensif untuk pengangkutan khusus
    - Ujian unit dengan pengganti ujian dan rangka kerja pengacuan
    - Ujian integrasi dengan Azure Test Containers
    - Pertimbangan ujian prestasi dan beban

#### Kejuruteraan Konteks (05-AdvancedTopics/mcp-contextengineering/) - Disiplin AI Baru
- **README.md**: Eksplorasi komprehensif kejuruteraan konteks sebagai bidang yang muncul
  - **Prinsip Teras**: Perkongsian konteks lengkap, kesedaran pengambilan keputusan tindakan, dan pengurusan tetingkap konteks
  - **Penjajaran Protokol MCP**: Bagaimana reka bentuk MCP menangani cabaran kejuruteraan konteks
    - Had tetingkap konteks dan strategi pemuatan progresif
    - Penentuan relevansi dan pengambilan konteks dinamik
    - Pengendalian konteks berbilang mod dan pertimbangan keselamatan
  - **Pendekatan Pelaksanaan**: Seni bina satu benang vs multi-ejen
    - Teknik potong konteks dan pengutamaan
    - Pemuatan konteks progresif dan strategi pemampatan
    - Pendekatan konteks berlapis dan pengoptimuman pengambilan
  - **Rangka Kerja Pengukuran**: Metrik baru untuk penilaian keberkesanan konteks
    - Kecekapan input, prestasi, kualiti, dan pertimbangan pengalaman pengguna
    - Pendekatan eksperimen untuk pengoptimuman konteks
    - Analisis kegagalan dan metodologi penambahbaikan

#### Kemas Kini Navigasi Kurikulum (README.md)
- **Struktur Modul Dipertingkatkan**: Dikemaskini jadual kurikulum untuk memasukkan topik lanjutan baru
  - Ditambah Enjinari Konteks (5.14) dan Pengangkutan Khusus (5.15)
  - Format konsisten dan pautan navigasi merentasi semua modul
  - Penerangan dikemas kini untuk mencerminkan skop kandungan semasa

### Penambahbaikan Struktur Direktori
- **Penyeragaman Penamaan**: Menamakan semula "mcp transport" kepada "mcp-transport" untuk konsistensi dengan folder topik lanjutan lain
- **Pengorganisasian Kandungan**: Semua folder 05-AdvancedTopics kini mengikuti corak penamaan konsisten (mcp-[topik])

### Penambahbaikan Kualiti Dokumentasi
- **Penjajaran Spesifikasi MCP**: Semua kandungan baru merujuk Spesifikasi MCP 2025-06-18 terkini
- **Contoh Pelbagai Bahasa**: Contoh kod komprehensif dalam C#, TypeScript, dan Python
- **Fokus Perusahaan**: Corak siap pengeluaran dan integrasi awan Azure sepanjang dokumentasi
- **Dokumentasi Visual**: Diagram Mermaid untuk seni bina dan visualisasi aliran

## 18 Ogos 2025

### Kemas Kini Komprehensif Dokumentasi - Standard MCP 2025-06-18

#### Amalan Terbaik Keselamatan MCP (02-Security/) - Pemodenan Lengkap
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Penulisan semula lengkap sejajar dengan Spesifikasi MCP 2025-06-18
  - **Keperluan Wajib**: Ditambah keperluan MUST/MUST NOT eksplisit dari spesifikasi rasmi dengan indikator visual jelas
  - **12 Amalan Keselamatan Teras**: Direstruktur semula dari senarai 15 item ke domain keselamatan komprehensif
    - Keselamatan Token & Pengesahan dengan integrasi penyedia identiti luaran
    - Pengurusan Sesi & Keselamatan Pengangkutan dengan keperluan kriptografi
    - Perlindungan Ancaman AI Khusus dengan integrasi Microsoft Prompt Shields
    - Kawalan Akses & Kebenaran dengan prinsip keistimewaan paling minimum
    - Keselamatan Kandungan & Pemantauan dengan integrasi Azure Content Safety
    - Keselamatan Rantaian Bekalan dengan verifikasi komponen komprehensif
    - Keselamatan OAuth & Pencegahan Confused Deputy dengan pelaksanaan PKCE
    - Tindak Balas Insiden & Pemulihan dengan keupayaan automatik
    - Pematuhi & Tadbir Urus dengan penjajaran peraturan
    - Kawalan Keselamatan Lanjutan dengan seni bina kepercayaan sifar
    - Integrasi Ekosistem Keselamatan Microsoft dengan penyelesaian komprehensif
    - Evolusi Keselamatan Berterusan dengan amalan adaptif
  - **Penyelesaian Keselamatan Microsoft**: Panduan integrasi dipertingkatkan untuk Prompt Shields, Azure Content Safety, Entra ID, dan GitHub Advanced Security
  - **Sumber Pelaksanaan**: Pautan sumber komprehensif dikelaskan mengikut Dokumentasi MCP Rasmi, Penyelesaian Keselamatan Microsoft, Standard Keselamatan, dan Panduan Pelaksanaan

#### Kawalan Keselamatan Lanjutan (02-Security/) - Pelaksanaan Perusahaan
- **MCP-SECURITY-CONTROLS-2025.md**: Pengubahsuaian lengkap dengan rangka kerja keselamatan gred perusahaan
  - **9 Domain Keselamatan Komprehensif**: Dikembangkan daripada kawalan asas kepada rangka kerja perusahaan terperinci
    - Pengesahan & Kebenaran Lanjutan dengan integrasi Microsoft Entra ID
    - Keselamatan Token & Kawalan Anti-Passthrough dengan pengesahan menyeluruh
    - Kawalan Keselamatan Sesi dengan pencegahan pengambilalihan
    - Kawalan Keselamatan AI Khusus dengan pencegahan suntikan prompt dan pencemaran alat
    - Pencegahan Serangan Confused Deputy dengan keselamatan proksi OAuth
    - Keselamatan Pelaksanaan Alat dengan sandboxing dan pengasingan
    - Kawalan Keselamatan Rantaian Bekalan dengan verifikasi kebergantungan
    - Kawalan Pemantauan & Pengecaman dengan integrasi SIEM
    - Tindak Balas Insiden & Pemulihan dengan keupayaan automatik
  - **Contoh Pelaksanaan**: Ditambah blok konfigurasi YAML terperinci dan contoh kod
  - **Integrasi Penyelesaian Microsoft**: Liputan komprehensif perkhidmatan keselamatan Azure, GitHub Advanced Security, dan pengurusan identiti perusahaan

#### Topik Lanjutan Keselamatan (05-AdvancedTopics/mcp-security/) - Pelaksanaan Siap Pengeluaran
- **README.md**: Penulisan semula lengkap untuk pelaksanaan keselamatan perusahaan
  - **Penjajaran Spesifikasi Semasa**: Dikemas kini kepada Spesifikasi MCP 2025-06-18 dengan keperluan keselamatan wajib
  - **Pengesahan Dipertingkatkan**: Integrasi Microsoft Entra ID dengan contoh .NET dan Java Spring Security komprehensif
  - **Integrasi Keselamatan AI**: Pelaksanaan Microsoft Prompt Shields dan Azure Content Safety dengan contoh Python terperinci
  - **Mitigasi Ancaman Lanjutan**: Contoh pelaksanaan komprehensif untuk
    - Pencegahan Serangan Confused Deputy dengan PKCE dan pengesahan persetujuan pengguna
    - Pencegahan Passthrough Token dengan pengesahan audiens dan pengurusan token selamat
    - Pencegahan Pengambilalihan Sesi dengan pengikatan kriptografi dan analisis perlakuan
  - **Integrasi Keselamatan Perusahaan**: Pemantauan Azure Application Insights, saluran pengesanan ancaman, dan keselamatan rantaian bekalan
  - **Senarai Semak Pelaksanaan**: Kawalan keselamatan wajib vs disyorkan dengan manfaat ekosistem keselamatan Microsoft

### Kualiti Dokumentasi & Penjajaran Standard
- **Rujukan Spesifikasi**: Dikemas kini semua rujukan kepada Spesifikasi MCP Semasa 2025-06-18  
- **Ekosistem Keselamatan Microsoft**: Panduan integrasi dipertingkatkan di seluruh dokumentasi keselamatan  
- **Pelaksanaan Praktikal**: Ditambah contoh kod terperinci dalam .NET, Java, dan Python dengan corak perusahaan  
- **Pengorganisasian Sumber**: Pengkategorian komprehensif dokumentasi rasmi, piawaian keselamatan, dan panduan pelaksanaan  
- **Penunjuk Visual**: Penandaan jelas keperluan mandatori berbanding amalan yang disyorkan  


#### Konsep Teras (01-CoreConcepts/) - Pemodenan Lengkap  
- **Kemas Kini Versi Protokol**: Dikemas kini untuk merujuk Spesifikasi MCP Semasa 2025-06-18 dengan versi berasaskan tarikh (format YYYY-MM-DD)  
- **Penambahbaikan Seni Bina**: Deskripsi dipertingkatkan mengenai Hos, Klien, dan Pelayan untuk mencerminkan corak seni bina MCP semasa  
  - Hos kini jelas didefinisikan sebagai aplikasi AI yang menyelaras pelbagai sambungan klien MCP  
  - Klien diterangkan sebagai penyambung protokol yang mengekalkan hubungan satu-satu pelayan  
  - Pelayan dipertingkatkan dengan senario penyebaran tempatan vs jauh  
- **Pengstrukturan Semula Primitif**: Pengubahsuaian menyeluruh primitif pelayan dan klien  
  - Primitif Pelayan: Sumber (punca data), Arahan (templat), Alat (fungsi boleh dijalankan) dengan penerangan dan contoh terperinci  
  - Primitif Klien: Persampelan (penyiapan LLM), Elicitation (input pengguna), Pencatatan (debug/pemantauan)  
  - Dikemas kini dengan corak kaedah penemuan (`*/list`), pengambilan (`*/get`), dan pelaksanaan (`*/call`) semasa  
- **Seni Bina Protokol**: Memperkenalkan model seni bina dua lapisan  
  - Lapisan Data: Asas JSON-RPC 2.0 dengan pengurusan kitaran hayat dan primitif  
  - Lapisan Pengangkutan: STDIO (tempatan) dan HTTP Boleh Alir dengan SSE (jauh) mekanisme pengangkutan  
- **Rangka Kerja Keselamatan**: Prinsip keselamatan komprehensif termasuk persetujuan pengguna secara eksplisit, perlindungan privasi data, keselamatan pelaksanaan alat, dan keselamatan lapisan pengangkutan  
- **Corak Komunikasi**: Mesej protokol dikemas kini untuk menunjukkan aliran inisialisasi, penemuan, pelaksanaan, dan pemberitahuan  
- **Contoh Kod**: Contoh pelbagai bahasa yang disegar semula (.NET, Java, Python, JavaScript) untuk mencerminkan corak SDK MCP semasa  

#### Keselamatan (02-Security/) - Pengubahsuaian Keselamatan Komprehensif  
- **Penjajaran Piawaian**: Penjajaran penuh dengan keperluan keselamatan Spesifikasi MCP 2025-06-18  
- **Evolusi Pengesahan**: Dokumentasi evolusi dari pelayan OAuth tersuai kepada delegasi penyedia identiti luaran (Microsoft Entra ID)  
- **Analisis Ancaman AI Khusus**: Liputan dipertingkatkan terhadap vektor serangan AI moden  
  - Senario serangan suntikan arahan dengan contoh dunia sebenar  
  - Mekanisme pencemaran alat dan corak serangan "tarikan permaidani"  
  - Pencemaran tetingkap konteks dan serangan kekeliruan model  
- **Penyelesaian Keselamatan AI Microsoft**: Liputan komprehensif ekosistem keselamatan Microsoft  
  - Perisai Arahan AI dengan teknik pengesanan maju, spotlighting, dan pembatas  
  - Corak integrasi Azure Content Safety  
  - GitHub Advanced Security untuk perlindungan rantaian bekalan  
- **Mitigasi Ancaman Lanjutan**: Kawalan keselamatan terperinci untuk  
  - Pembajakan sesi dengan senario serangan khusus MCP dan keperluan ID sesi kriptografi  
  - Masalah timbalan keliru dalam senario proksi MCP dengan keperluan persetujuan eksplisit  
  - Kelemahan penyaluran token dengan kawalan pengesahan mandatori  
- **Keselamatan Rantaian Bekalan**: Liputan rantaian bekalan AI yang diperluaskan termasuk model asas, perkhidmatan embeddings, penyedia konteks, dan API pihak ketiga  
- **Keselamatan Asas**: Integrasi dipertingkat dengan corak keselamatan perusahaan termasuk seni bina kepercayaan sifar dan ekosistem keselamatan Microsoft  
- **Pengorganisasian Sumber**: Pautan sumber komprehensif dikategorikan mengikut jenis (Dokumen Rasmi, Piawaian, Penyelidikan, Penyelesaian Microsoft, Panduan Pelaksanaan)  

### Penambahbaikan Kualiti Dokumentasi  
- **Objektif Pembelajaran Berstruktur**: Objektif pembelajaran dipertingkatkan dengan hasil khusus dan boleh dilaksanakan  
- **Rujukan Merentas**: Ditambah pautan antara topik keselamatan dan konsep teras yang berkaitan  
- **Maklumat Semasa**: Dikemas kini semua rujukan tarikh dan pautan spesifikasi kepada piawaian semasa  
- **Panduan Pelaksanaan**: Ditambah garis panduan pelaksanaan khusus dan boleh dilaksanakan di kedua-dua bahagian  

## 16 Julai 2025  

### README dan Penambahbaikan Navigasi  
- Direka semula sepenuhnya navigasi kurikulum dalam README.md  
- Menggantikan tag `<details>` dengan format berasaskan jadual yang lebih mudah diakses  
- Mewujudkan pilihan susun atur alternatif dalam folder baru "alternative_layouts"  
- Ditambah contoh navigasi gaya kad, tab, dan akordion  
- Dikemas kini bahagian struktur repositori untuk memasukkan semua fail terkini  
- Meningkatkan bahagian "Cara Menggunakan Kurikulum Ini" dengan cadangan yang jelas  
- Dikemas kini pautan spesifikasi MCP untuk menunjuk ke URL yang betul  
- Ditambah bahagian Kejuruteraan Konteks (5.14) dalam struktur kurikulum  

### Kemas Kini Panduan Kajian  
- Panduan kajian disemak sepenuhnya untuk selaras dengan struktur repositori semasa  
- Ditambah bahagian baru untuk Klien dan Alat MCP, serta Pelayan MCP Popular  
- Dikemas kini Peta Kurikulum Visual untuk mencerminkan semua topik dengan tepat  
- Meningkatkan penerangan Topik Lanjutan untuk meliputi semua bidang khusus  
- Dikemas kini bahagian Kajian Kes untuk mencerminkan contoh sebenar  
- Ditambah log perubahan komprehensif ini  

### Sumbangan Komuniti (06-CommunityContributions/)  
- Ditambah maklumat terperinci tentang pelayan MCP untuk penjanaan imej  
- Ditambah bahagian komprehensif mengenai penggunaan Claude dalam VSCode  
- Ditambah arahan pemasangan dan penggunaan klien terminal Cline  
- Dikemas kini bahagian klien MCP untuk memasukkan semua pilihan klien popular  
- Meningkatkan contoh sumbangan dengan sampel kod lebih tepat  

### Topik Lanjutan (05-AdvancedTopics/)  
- Mengatur semua folder topik khusus dengan penamaan konsisten  
- Ditambah bahan dan contoh kejuruteraan konteks  
- Ditambah dokumentasi integrasi agen Foundry  
- Meningkatkan dokumentasi integrasi keselamatan Entra ID  

## 11 Jun 2025  

### Penciptaan Awal  
- Menerbitkan versi pertama kurikulum MCP untuk Pemula  
- Mewujudkan struktur asas untuk semua 10 bahagian utama  
- Melaksanakan Peta Kurikulum Visual untuk navigasi  
- Menambah projek sampel awal dalam pelbagai bahasa pengaturcaraan  

### Memulakan (03-GettingStarted/)  
- Mewujudkan contoh pelaksanaan pelayan pertama  
- Menambah panduan pembangunan klien  
- Menyertakan arahan integrasi klien LLM  
- Menambah dokumentasi integrasi VS Code  
- Melaksanakan contoh pelayan Server-Sent Events (SSE)  

### Konsep Teras (01-CoreConcepts/)  
- Menambah penerangan terperinci mengenai seni bina klien-pelayan  
- Mewujudkan dokumentasi mengenai komponen protokol utama  
- Mendokumentasikan corak penghantaran mesej dalam MCP  

## 23 Mei 2025  

### Struktur Repositori  
- Memulakan repositori dengan struktur folder asas  
- Mewujudkan fail README untuk setiap bahagian utama  
- Menyediakan infrastruktur penterjemahan  
- Menambah aset imej dan rajah  

### Dokumentasi  
- Membuat README.md awal dengan gambaran keseluruhan kurikulum  
- Menambah CODE_OF_CONDUCT.md dan SECURITY.md  
- Menyediakan SUPPORT.md dengan panduan mendapatkan bantuan  
- Mewujudkan struktur panduan kajian awal  

## 15 April 2025  

### Perancangan dan Rangka Kerja  
- Perancangan awal untuk kurikulum MCP untuk Pemula  
- Mendefinisikan objektif pembelajaran dan khalayak sasaran  
- Menggariskan struktur 10 bahagian kurikulum  
- Membangunkan rangka kerja konseptual untuk contoh dan kajian kes  
- Mewujudkan prototaip contoh awal untuk konsep utama  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->