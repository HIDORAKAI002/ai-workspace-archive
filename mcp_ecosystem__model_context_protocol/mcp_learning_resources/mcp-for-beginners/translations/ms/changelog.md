# Changelog: Kurikulum MCP untuk Pemula

Dokumen ini berfungsi sebagai rekod semua perubahan penting yang dibuat pada kurikulum Model Context Protocol (MCP) untuk Pemula. Perubahan didokumentasikan dalam susunan kronologi songsang (perubahan terbaru dahulu).

## 24 Jun, 2026

### Pelajaran Baru: Menggunakan MCP dalam aplikasi Copilot

- [Bahagian Alat](./12-tooling/README.md) Ditambah bahagian alat.
- [MCP dalam aplikasi Copilot](./12-tooling/01-copilot-app/README.md)

## 16 Jun, 2026

### Penyesuaian Spesifikasi MCP & Pengesahan Sampel

Mengesahkan kurikulum terhadap **Spesifikasi MCP 2025-11-25** semasa dan SDK rasmi terkini, kemudian membetulkan rujukan spesifikasi yang lapuk dan mengesahkan contoh teras masih boleh dibina dan dijalankan.

#### Pembetulan Versi Spesifikasi (2025-06-18 / 2025-03-26 → 2025-11-25)

Mengemas kini kandungan Bahasa Inggeris di mana ia masih mendakwa semakan spesifikasi lama adalah piawaian *terkini/terbaru*, dan mengarahkan semula pautan ke laluan spesifikasi `modelcontextprotocol.io` yang sah:
- **05-AdvancedTopics/mcp-security/README.md**: Dikemas kini sepanduk "Piawaian Semasa", pengenalan, tajuk prinsip keselamatan teras, tajuk keperluan wajib, bahagian Microsoft Entra ID, pautan Rujukan & Sumber, dan notis keselamatan penutup (8 rujukan) kepada 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Dikemas kini pautan Sumber Tambahan spesifikasi dan sepanduk "Piawaian Semasa" kepada 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Menggantikan pautan keselamatan-dan-kepercayaan `2025-03-26` yang lapuk dengan halaman amalan terbaik keselamatan 2025-11-25 semasa
- **03-GettingStarted/14-sampling/README.md**: Dikemas kini pautan dokumen pensampelan rasmi kepada 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Dikemas kini rujukan "spesifikasi MCP semasa" dalam masa kini dan pautan Sumber Tambahan spesifikasi kepada 2025-11-25 (nota peniadaan SSE sejarah dibiarkan untuk ketepatan)

#### Pengesahan Sampel Terhadap SDK Semasa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` menyelesaikan `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` lulus tanpa ralat jenis — API `McpServer`/`StdioServerTransport` sedia ada kekal sah
- **Python (03-GettingStarted/01-first-server/solution/python)**: Diuji dalam `.venv` yang terasing dengan `mcp[cli]` (1.27.2); `py_compile` lulus dan `FastMCP.list_tools()` mengembalikan alat `add` dan `subtract` dengan betul
- Disahkan semua julat versi `@modelcontextprotocol/sdk` dalam sampel (`>=1.26.0` / `^1.26.0` / `^1.27.0`) menyelesaikan dengan bersih ke `1.29.0` semasa tanpa perubahan API yang merosakkan

#### Penyesuaian Pin Bergantung (menutup jurang versi)

Meningkatkan pin SDK lapuk supaya setiap sampel menjejak keluaran MCP semasa, mengikut konvensyen repo secara keseluruhan:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Meningkatkan `@modelcontextprotocol/sdk` dari `^1.8.0` → `>=1.26.0` dan mengemas kini deskripsi pakej lama `"updated for MCP 2025-06-18"` kepada `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** dan **lab4/code/github_mcp_server/pyproject.toml**: Meningkatkan pin tepat `mcp==1.23.0` → `mcp>=1.26.0`; menjana semula kedua-dua fail `uv.lock` (`uv lock`) supaya fail kunci menyelesaikan kepada `mcp 1.27.2` semasa dan kekal segerak dengan manifes

#### Analisis Jurang Kurikulum — Liputan Ciri Spesifikasi Terkini

Disahkan kurikulum sudah merangkumi semua primitif yang diperkenalkan/dikembangkan dalam MCP 2025-11-25, jadi tiada jurang kandungan tinggal:
- **Pensampelan**: Pelajaran 03-GettingStarted/14-sampling dan 05-AdvancedTopics/mcp-sampling
- **Elicitation (termasuk mod URL)**: Didokumenkan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Didokumenkan dalam 00-Introduction, 01-CoreConcepts, dan 05-AdvancedTopics/mcp-root-contexts
- **Tugas (eksperimen, operasi jangka panjang)**: Didokumenkan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features
- **Anotasi Alat** (`readOnlyHint` / `destructiveHint`): Didokumenkan dalam 01-CoreConcepts dan 05-AdvancedTopics/mcp-protocol-features

### Pengukuhan Keselamatan & Pembetulan Kelemahan Pergantungan

Menjalankan pemeriksaan keselamatan penuh merentasi setiap manifes pergantungan dan kod sumber sampel, kemudian memperbaiki semua advisori npm yang dilaporkan dan satu penemuan tahap kod. Selepas pembetulan, `npm audit` melaporkan **0 kelemahan** dalam setiap direktori yang diaudit.

#### Kelemahan Pergantungan npm (transitive) — Diperbaiki

Mengaudit kesemua 15 fail `package-lock.json` yang diserahkan. Kelemahan terhad kepada pergantungan transitif yang dibawa oleh alat pembangunan MCP Inspector, klien OpenAI, dan MCP SDK; semua kini telah diselesaikan tanpa merosakkan sampel:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** dan **lab3/code/weather_mcp/inspector**: Meningkatkan `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), yang membersihkan advisori `ajv`, `brace-expansion`, `diff`, `path-to-regexp` dan `ws` yang disertakan. Menambah entri `overrides` npm memaksa `shell-quote@1.8.4` tampalan untuk menghapuskan advisori kritikal yang masih dibawa oleh `concurrently`; menjana semula kedua-dua fail kunci (sekarang 0 kelemahan)
- **03-GettingStarted/samples/typescript**: `npm audit fix` mengemas kini `qs` transitif (sederhana) kepada keluaran tampalan
- **03-GettingStarted/samples/javascript**: `npm audit fix` mengemas kini `hono` transitif (sederhana) kepada keluaran tampalan
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` mengemas kini `form-data` transitif (tinggi) kepada keluaran tampalan
- **03-GettingStarted/11-simple-auth/solution/typescript**: Menjana `package-lock.json` yang hilang supaya projek boleh dihasilkan semula dan diaudit (0 kelemahan)

#### Pembetulan Keselamatan Tahap Kod (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Mengalih keluar `shell=True` dari alat `open_in_vscode`. `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` sebelum ini membenarkan metakarakter shell dalam laluan folder ditafsir oleh `cmd.exe` (vektor suntikan arahan). Kini ia melancarkan `Code.exe` yang diselesaikan secara langsung dengan folder sebagai hujah — tanpa shell — yang adalah setara fungsi dan selamat

#### Audit Pergantungan Python

- Mengaudit setiap set keperluan Python dengan `pip-audit`. `05-AdvancedTopics` dan `03-GettingStarted/samples/python` melaporkan **tiada kelemahan diketahui** (julatan `mcp` / `httpx` / `pydantic` / `python-dotenv` mereka menyelesaikan ke keluaran tampalan semasa)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` menandakan pergantungan transitif **`werkzeug` 3.1.1** dengan tiga advisori DoS nama alat Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, dan `CVE-2026-27199` (semuanya dibetulkan dalam 3.1.6). Menambah pin keselamatan jelas `werkzeug>=3.1.6` supaya keluaran tampalan diselesaikan; mengesahkan kekangan menyelesaikan dengan bersih bersama tumpukan `chainlit` / `mcp` / `semantic-kernel`

### Penjenamaan Semula Nama Produk

Mengemas kini semua kandungan kurikulum untuk mencerminkan penjenamaan semula produk Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Dikemas kini pautan komuniti Discord
- **AGENTS.md**: Dikemas kini rujukan pelayan Discord
- **README.md**: Dikemas kini rujukan ekosistem teknologi
- **study_guide.md**: Dikemas kini rujukan kajian kes
- **05-AdvancedTopics/README.md**: Dikemas kini tajuk dan deskripsi Modul 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Dikemas kini tajuk bahagian dan deskripsi
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Dikemas kini penuh tajuk modul dan kandungan
- **05-AdvancedTopics/mcp-security-entra/README.md**: Dikemas kini pautan rujukan silang
- **07-LessonsfromEarlyAdoption/README.md**: Dikemas kini rujukan kajian kes
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Dikemas kini tajuk Seksyen 9, lencana, dan kemampuan
- **08-BestPractices/README.md**: Dikemas kini pautan komuniti Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Dikemas kini rujukan saluran Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Dikemas kini rujukan penyebaran model
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Dikemas kini jadual Perkhidmatan AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Dikemas kini rujukan sumber

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension untuk VS Code
- **README.md**: Dikemas kini rujukan utama kurikulum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Dikemas kini tajuk modul, gambaran keseluruhan, dan semua tajuk modul
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Dikemas kini tajuk, objektif pembelajaran, arahan persediaan, dan sumber
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Dikemas kini tajuk, objektif pembelajaran, jadual hos MCP, dan rujukan silang
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Dikemas kini tajuk, lencana, prasyarat, dan sumber
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Dikemas kini rujukan Pembina Ejen dan pautan maklum balas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Dikemas kini prasyarat dan rujukan sambungan

---

## 11 April, 2026

### Pelajaran Baru, Pembetulan Dokumentasi, dan Kemas Kini Pergantungan

#### Kandungan Kurikulum Baharu Ditambah

**Modul 05 - Topik Lanjutan**
- **Pelajaran 5.17: Penalaran Multi-Ejen Adversarial dengan MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Panduan menyeluruh baru yang merangkumi corak perdebatan adversarial untuk sistem multi-ejen
  - Diagram seni bina Mermaid: dua ejen → pelayan MCP bersama → transkrip perdebatan → hakim → keputusan
  - Pelayan alat MCP bersama (`web_search` + `run_python`) dilaksanakan dalam Python dan TypeScript
  - Prompt sistem bertentangan (UNTUK / MENENTANG / Hakim) dengan keperluan penggunaan alat secara eksplisit
  - Pengatur perdebatan dalam Python, TypeScript, dan C# mengurus pusingan dan menghala hujah
  - Penyambungan klien MCP `ClientSession` untuk pengatur kepada panggilan alat sebenar
  - Jadual kes penggunaan (pengesanan halusinasi, pemodelan ancaman, semakan reka bentuk API, pengesahan fakta, pemilihan teknologi)
  - Pertimbangan keselamatan: pelaksanaan dalam lingkungan selamat, pengesahan panggilan alat, had kadar, log audit
  - Latihan berstruktur dengan tiga senario praktikal (semakan kod, keputusan seni bina, moderasi kandungan)

#### Pembetulan Dokumentasi

**Modul 03 - Memulakan**
- **05-stdio-server/README.md**: Memperbaiki contoh pelayan stdio TypeScript yang tidak lengkap — menambah instansiasi pengangkutan yang hilang (`new StdioServerTransport()`) dan panggilan `server.connect(transport)` untuk memadankan contoh Python dan .NET dalam bahagian yang sama
- **14-sampling/README.md**: Memperbaiki kesalahan taip — membetulkan `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Kemas Kini Kurikulum

**README.md Utama**
- Menambah entri 5.17 (Penalaran Multi-Ejen Adversarial dengan MCP) ke jadual kurikulum dengan pautan terus ke pelajaran baru

**05-AdvancedTopics/README.md**
- Menambah baris Pelajaran 5.17 ke jadual pelajaran

**study_guide.md**
- Menambah topik Penalaran Multi-Ejen Adversarial ke peta minda dan deskripsi prosa Topik Lanjutan

#### Pembetulan Kod dan Keselamatan

**Modul 05 - Ejen Adversarial (`mcp-adversarial-agents`)**
- **Pembaikan keselamatan — suntikan arahan**: Gantikan interpolasi shell `execSync` dengan `execFile` + `promisify` dalam alat TypeScript `run_python`, menghapuskan permukaan suntikan arahan (kod dikawal LLM kini dihantar sebagai elemen argv literal tanpa penglibatan shell)
- **Wayar gelung alat MCP**: Kemas kini pengatur debat Python untuk menggunakan klien `AsyncAnthropic` (menggantikan `Anthropic` sinkron yang menghalang), menghantar `ClientSession` langsung yang aktif ke setiap giliran agen, mengambil definisi alat melalui `session.list_tools()` setiap giliran, dan mengedar blok `tool_use` melalui `session.call_tool()` dalam gelung sehingga model mengeluarkan respons teks akhir

#### Kemas Kini Pergantungan

- Tingkatkan `hono` ke 4.12.12 merentasi pelbagai pakej (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Tingkatkan `@hono/node-server` dari 1.19.11 ke 1.19.13 dalam pakej TypeScript
- Tingkatkan `cryptography` dari 46.0.5 ke 46.0.7 dalam pakej Python (makmal 3 dan 4 10-StreamliningAIWorkflows)
- Tingkatkan `lodash` dari 4.17.23 ke 4.18.1 dalam pemeriksa 10-StreamliningAIWorkflows

#### Terjemahan

- Selaraskan terjemahan untuk lebih 48 bahasa dengan perubahan sumber terkini (kemas kini i18n)

---

## 5 Februari 2026

### Penambahbaikan Pengesahan dan Navigasi Seluruh Repositori

#### Kandungan Kurikulum Baru Ditambah

**Modul 03 - Memulakan**
- **12-mcp-hosts/README.md**: Panduan komprehensif baru untuk menyiapkan hos MCP
  - Contoh konfigurasi Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Templat konfigurasi JSON untuk semua hos utama
  - Jadual perbandingan jenis pengangkutan (stdio, SSE/HTTP, WebSocket)
  - Penyelesaian masalah isu sambungan biasa
  - Amalan terbaik keselamatan untuk konfigurasi hos

- **13-mcp-inspector/README.md**: Panduan debug baru untuk MCP Inspector
  - Kaedah pemasangan (npx, npm global, dari sumber)
  - Menyambung ke pelayan melalui stdio dan HTTP/SSE
  - Alat ujian, sumber daya, dan aliran kerja prom
  - Integrasi VS Code dengan MCP Inspector
  - Senario debugging biasa dengan penyelesaian

**Modul 04 - Pelaksanaan Praktikal**
- **pagination/README.md**: Panduan pelaksanaan penomboran halaman baru
  - Corak penomboran halaman berdasarkan kursor dalam Python, TypeScript, Java
  - Pengendalian penomboran halaman sisi klien
  - Strategi reka bentuk kursor (tulisan kabur vs terstruktur)
  - Cadangan pengoptimuman prestasi

**Modul 05 - Topik Lanjutan**
- **mcp-protocol-features/README.md**: Perincian ciri protokol baru
  - Pelaksanaan pemberitahuan kemajuan
  - Corak pembatalan permintaan
  - Templat sumber dengan corak URI
  - Pengurusan kitar hayat pelayan
  - Kawalan tahap log
  - Corak pengendalian ralat dengan kod JSON-RPC

#### Pembetulan Navigasi (lebih 24 fail dikemas kini)

**README Modul Utama**  
 Sekarang pautan ke pelajaran pertama DAN modul seterusnya

**Fail Tambahan 02-Keselamatan**  
- Semua 5 dokumen keselamatan tambahan kini mempunyai navigasi "Apa Seterusnya":

**Fail 09-KajianKes**  
- Semua fail kajian kes kini mempunyai navigasi berurutan:

**Makmal 10-StreamliningAI**  
Tambah bahagian Apa Seterusnya kepada gambaran keseluruhan Modul 10 dan Modul 11

#### Pembetulan Kod dan Kandungan

**Kemas Kini SDK dan Pergantungan**  
Betulkan versi openai kosong kepada `^4.95.0`  
Kemas kini SDK dari `^1.8.0` ke `>=1.26.0`  
Kemas kini pin versi mcp ke `>=1.26.0`

**Pembetulan Kod**  
Betulkan model tidak sah `gpt-4o-mini` ke `gpt-4.1-mini`

**Pembetulan Kandungan**  
Betulkan pautan rosak `READMEmd` → `README.md`, betulkan pengepala kurikulum `Module 1-3` → `Module 0-3`, betulkan laluan peka huruf besar kecil  
Buang kandungan kajian kes 5 yang rosak dan berganda

**Penambahbaikan Panduan Pemula**  
Tambah pengenalan betul, objektif pembelajaran, dan pra-syarat untuk pemula

#### Kemas Kini Kurikulum

**README.md Utama**  
- Tambah entri 3.12 (Hos MCP), 3.13 (Pemeriksa MCP), 4.1 (Penomboran Halaman), 5.16 (Ciri Protokol) pada jadual kurikulum

**README Modul**  
Tambah pelajaran 12 dan 13 ke senarai pelajaran  
Tambah bahagian Panduan Praktikal dengan pautan penomboran halaman  
Tambah pelajaran 5.15 (Pengangkutan Tersuai) dan 5.16 (Ciri Protokol)

**study_guide.md**  
- Kemas kini mindmap dengan semua topik baru: Penyiapan Hos MCP, Pemeriksa MCP, Strategi Penomboran Halaman, Perincian Ciri Protokol

## 28 Jan 2026

### Semakan Pematuhan Spesifikasi MCP 2025-11-25

#### Penambahbaikan Konsep Teras (01-CoreConcepts/)  
- **Primitif Klien Baru - Roots**: Tambah dokumentasi komprehensif mengenai primitif klien Roots, membolehkan pelayan memahami sempadan sistem fail dan kebenaran capaian  
- **Anotasi Alat**: Tambah dokumentasi mengenai anotasi perilaku alat (`readOnlyHint`, `destructiveHint`) untuk keputusan pelaksanaan alat yang lebih baik  
- **Panggilan Alat dalam Sampling**: Kemas kini dokumentasi Sampling untuk memasukkan parameter `tools` dan `toolChoice` bagi pemanggilan alat dipacu model semasa permintaan pensampelan  
- **Pengilhaman Mod URL**: Tambah dokumentasi mengenai pengilhaman berasaskan URL untuk interaksi web luaran yang diinisiasi pelayan  
- **Tugas (Eksperimen)**: Tambah seksyen baru mendokumentasikan ciri eksperimen Tugas untuk pembalut pelaksanaan tahan lama dan pengambilan hasil tertangguh  
- **Sokongan Ikon**: Perhatikan alat, sumber, templat sumber, dan prom boleh kini termasuk ikon sebagai metadata tambahan

#### Kemas Kini Dokumentasi  
- **README.md**: Tambah rujukan versi Spesifikasi MCP 2025-11-25 dan penjelasan versi berdasarkan tarikh  
- **study_guide.md**: Kemas kini peta kurikulum untuk memasukkan Tugas dan Anotasi Alat dalam seksyen Konsep Teras; kemas kini cap masa dokumen

#### Pengesahan Pematuhan Spesifikasi  
- **Versi Protokol**: Sahkan semua dokumentasi merujuk kepada Spesifikasi MCP 2025-11-25 semasa  
- **Pelarasan Seni Bina**: Sahkan ketepatan dokumentasi seni bina dua lapisan (Data Layer + Transport Layer)  
- **Dokumentasi Primitif**: Sahkan primitif pelayan (Sumber, Prom, Alat) dan primitif klien (Sampling, Pengilhaman, Logging, Roots)  
- **Mekanisme Pengangkutan**: Sahkan ketepatan dokumentasi pengangkutan STDIO dan HTTP Streaming  
- **Panduan Keselamatan**: Sahkan pelarasan dengan dokumentasi Amalan Terbaik Keselamatan MCP semasa

#### Ciri Utama MCP 2025-11-25 yang Didokumentasikan  
- **Penemuan OpenID Connect**: Penemuan pelayan pengesahan melalui OIDC  
- **Dokumen Metadata ID Klien OAuth**: Mekanisme pendaftaran klien yang disyorkan  
- **JSON Schema 2020-12**: Dialek lalai untuk definisi skema MCP  
- **Sistem Tahap SDK**: Keperluan formal untuk sokongan dan penyelenggaraan ciri SDK  
- **Struktur Tadbir Urus**: Kumpulan Kerja dan Kumpulan Minat dipakejkan secara formal dalam tadbir urus MCP

### Kemas Kini Major Dokumentasi Keselamatan (02-Security/)

#### Integrasi Bengkel Kemuncak Keselamatan MCP (Sherpa)  
- **Sumber Latihan Praktikal Baru**: Tambah integrasi komprehensif dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) merentasi semua dokumentasi keselamatan  
- **Liputan Laluan Ekspedisi**: Dokumentasikan kemajuan dari Base Camp ke Summit secara penuh  
- **Pelarasan OWASP**: Semua panduan keselamatan kini memetakan risiko Panduan Keselamatan Azure MCP OWASP

#### Integrasi OWASP MCP Top 10  
- **Seksyen Baru**: Tambah jadual Risiko Keselamatan Teratas OWASP MCP dengan mitigasi Azure dalam README Keselamatan utama  
- **Dokumentasi Berasaskan Risiko**: Kemas kini mcp-security-controls-2025.md dengan rujukan risiko OWASP MCP untuk setiap domain keselamatan  
- **Seni Bina Rujukan**: Pautan ke seni bina rujukan Panduan Keselamatan Azure MCP OWASP dan corak pelaksanaan

#### Fail Keselamatan Dikemas Kini  
- **README.md**: Tambah gambaran bengkel Sherpa, jadual laluan ekspedisi, ringkasan risiko OWASP MCP Top 10, dan bahagian latihan praktikal  
- **mcp-security-controls-2025.md**: Kemas kini pengepala ke Februari 2026, tambah rujukan risiko OWASP (MCP01-MCP08), betulkan ketidakkonsistenan versi spesifikasi  
- **mcp-security-best-practices-2025.md**: Tambah bahagian sumber Sherpa dan OWASP, kemas kini cap masa  
- **mcp-best-practices.md**: Tambah bahagian latihan praktikal dengan pautan Sherpa dan OWASP  
- **azure-content-safety-implementation.md**: Tambah rujukan OWASP MCP06, pelarasan Kem Sherpa 3, dan bahagian sumber tambahan

#### Pautan Sumber Baru Ditambah  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Halaman risiko OWASP MCP individu (MCP01-MCP10)

### Pelarasan Kurikulum Seluruh MCP Spesifikasi 2025-11-25

#### Modul 03 - Memulakan  
- **Dokumentasi SDK**: Tambah SDK Go ke senarai SDK rasmi; kemas kini semua rujukan SDK selaras dengan Spesifikasi MCP 2025-11-25  
- **Jelas Pengangkutan**: Kemas kini deskripsi pengangkutan STDIO dan HTTP Streaming dengan rujukan spesifikasi eksplisit

#### Modul 04 - Pelaksanaan Praktikal  
- **Kemas Kini SDK**: Tambah SDK Go; kemas kini senarai SDK dengan rujukan versi spesifikasi  
- **Spesifikasi Pemberian Kuasa**: Kemas kini pautan spesifikasi Pemberian Kuasa MCP ke versi 2025-11-25 terkini

#### Modul 05 - Topik Lanjutan  
- **Ciri Baru**: Tambah nota mengenai ciri baru Spesifikasi MCP 2025-11-25 (Tugas, Anotasi Alat, Pengilhaman Mod URL, Roots)  
- **Sumber Keselamatan**: Tambah pautan OWASP MCP Top 10 dan bengkel Sherpa ke rujukan tambahan

#### Modul 06 - Sumbangan Komuniti  
- **Senarai SDK**: Tambah SDK Swift dan Rust; kemas kini pautan spesifikasi ke 2025-11-25  
- **Rujukan Spesifikasi**: Kemas kini pautan Spesifikasi MCP kepada URL spesifikasi langsung

#### Modul 07 - Pengajaran dari Penerimaan Awal  
- **Kemas Kini Sumber**: Tambah pautan Spesifikasi MCP 2025-11-25 dan OWASP MCP Top 10 ke sumber tambahan

#### Modul 08 - Amalan Terbaik  
- **Versi Spesifikasi**: Kemas kini rujukan Spesifikasi MCP ke 2025-11-25  
- **Sumber Keselamatan**: Tambah OWASP MCP Top 10 dan bengkel Sherpa ke rujukan tambahan

#### Modul 10 - Penambahbaikan Aliran Kerja AI  
- **Kemas Kini Lencana**: Tukar lencana versi MCP dari versi SDK (1.9.3) ke versi spesifikasi (2025-11-25)  
- **Pautan Sumber**: Kemas kini pautan Spesifikasi MCP; tambah OWASP MCP Top 10

#### Modul 11 - Makmal MCP Server Hands-On  
- **Rujukan Spesifikasi**: Kemas kini pautan Spesifikasi MCP ke versi 2025-11-25  
- **Sumber Keselamatan**: Tambah OWASP MCP Top 10 ke sumber rasmi

## 18 Disember 2025

### Kemas Kini Dokumentasi Keselamatan - Spesifikasi MCP 2025-11-25

#### Amalan Terbaik Keselamatan MCP (02-Security/mcp-best-practices.md) - Kemas Kini Versi Spesifikasi  
- **Kemas Kini Versi Protokol**: Kemas kini bagi merujuk Spesifikasi MCP 2025-11-25 terkini (dikeluarkan 25 November 2025)  
  - Kemas kini semua rujukan versi spesifikasi dari 2025-06-18 ke 2025-11-25  
  - Kemas kini tarikh dokumen dari 18 Ogos 2025 ke 18 Disember 2025  
  - Sahkan semua URL spesifikasi menunjuk kepada dokumentasi semasa  
- **Pengesahan Kandungan**: Validasi komprehensif amalan terbaik keselamatan mengikut piawaian terkini  
  - **Penyelesaian Keselamatan Microsoft**: Sahkan terminologi dan pautan terkini untuk Prompt Shields (sebelumnya "Pengesanan risiko Jailbreak"), Azure Content Safety, Microsoft Entra ID, dan Azure Key Vault  
  - **Keselamatan OAuth 2.1**: Sahkan pelarasan dengan amalan terbaik keselamatan OAuth terkini  
  - **Piawaian OWASP**: Validasi rujukan OWASP Top 10 untuk LLM kekal terkini  
  - **Perkhidmatan Azure**: Sahkan semua pautan dokumentasi Microsoft Azure dan amalan terbaik  
- **Pelarasan Piawaian**: Semua piawaian keselamatan yang dirujuk disahkan terkini  
  - Rangka Kerja Pengurusan Risiko AI NIST  
  - ISO 27001:2022  
  - Amalan Terbaik Keselamatan OAuth 2.1  
  - Rangka kerja keselamatan dan pematuhan Azure  
- **Sumber Pelaksanaan**: Validasi semua pautan dan sumber panduan pelaksanaan  
  - Corak pengesahan pengurusan API Azure  
  - Panduan integrasi Microsoft Entra ID  
  - Pengurusan rahsia Azure Key Vault  
  - Saluran dan penyelesaian pemantauan DevSecOps

### Jaminan Kualiti Dokumentasi  
- **Pematuhan Spesifikasi**: Pastikan semua keperluan keselamatan MCP wajib (MESTI/TIDAK BOLEH) selaras dengan spesifikasi terkini  
- **Kesegaran Sumber**: Sahkan semua pautan luaran ke dokumentasi Microsoft, piawaian keselamatan, dan panduan pelaksanaan  
- **Liputan Amalan Terbaik**: Sahkan liputan komprehensif bagi pengesahan, pemberian kuasa, ancaman khusus AI, keselamatan rantaian bekalan, dan corak perusahaan

## 6 Oktober 2025

### Pengembangan Bahagian Memulakan – Penggunaan Server Lanjutan & Pengesahan Mudah

#### Penggunaan Server Lanjutan (03-GettingStarted/10-advanced)  
- **Bab Baru Ditambah**: Memperkenalkan panduan komprehensif untuk penggunaan server MCP lanjutan, merangkumi seni bina server biasa dan pada tahap rendah.
  - **Server Biasa vs. Tahap Rendah**: Perbandingan terperinci dan contoh kod dalam Python dan TypeScript untuk kedua-dua pendekatan.
  - **Reka Bentuk Berasaskan Pengendali**: Penjelasan tentang pengurusan alat/sumber/prompt berasaskan pengendali untuk pelaksanaan server yang boleh diskalakan dan fleksibel.
  - **Corak Praktikal**: Senario dunia sebenar di mana corak server tahap rendah bermanfaat untuk ciri-ciri dan seni bina lanjutan.

#### Pengesahan Mudah (03-GettingStarted/11-simple-auth)
- **Bab Baru Ditambah**: Panduan langkah demi langkah untuk melaksanakan pengesahan mudah dalam server MCP.
  - **Konsep Pengesahan**: Penjelasan jelas tentang pengesahan vs. kebenaran, dan pengendalian kelayakan.
  - **Pelaksanaan Pengesahan Asas**: Corak pengesahan berasaskan middleware dalam Python (Starlette) dan TypeScript (Express), dengan contoh kod.
  - **Kemajuan ke Keselamatan Lanjutan**: Panduan untuk memulakan dengan pengesahan mudah dan berkembang ke OAuth 2.1 dan RBAC, dengan rujukan kepada modul keselamatan lanjutan.

Penambahan ini memberikan panduan praktikal dan langsung untuk membina pelaksanaan server MCP yang lebih kukuh, selamat, dan fleksibel, menghubungkan konsep asas dengan corak pengeluaran lanjutan.

## 29 September, 2025

### Makmal Integrasi Pangkalan Data Server MCP - Laluan Pembelajaran Lengkap Praktikal

#### 11-MCPServerHandsOnLabs - Kurikulum Lengkap Integrasi Pangkalan Data Baru
- **Laluan Pembelajaran 13-Makmal Lengkap**: Ditambah kurikulum praktikal komprehensif untuk membina server MCP sedia untuk pengeluaran dengan integrasi pangkalan data PostgreSQL
  - **Pelaksanaan Dunia Sebenar**: Kes penggunaan analitik Zava Retail yang menunjukkan corak gred perusahaan
  - **Progresi Pembelajaran Berstruktur**:
    - **Makmal 00-03: Asas** - Pengenalan, Seni Bina Teras, Keselamatan & Multi-Tenancy, Persediaan Persekitaran
    - **Makmal 04-06: Membina Server MCP** - Reka Bentuk & Skema Pangkalan Data, Pelaksanaan Server MCP, Pembangunan Alat  
    - **Makmal 07-09: Ciri Lanjutan** - Integrasi Carian Semantik, Pengujian & Pengesanan Ralat, Integrasi VS Code
    - **Makmal 10-12: Pengeluaran & Amalan Terbaik** - Strategi Penghantaran, Pemantauan & Kebolehamatan, Amalan Terbaik & Pengoptimuman
  - **Teknologi Perusahaan**: Rangka kerja FastMCP, PostgreSQL dengan pgvector, penanaman Azure OpenAI, Azure Container Apps, Application Insights
  - **Ciri Lanjutan**: Keselamatan Paras Baris (RLS), carian semantik, akses data berbilang penyewa, penanaman vektor, pemantauan masa nyata

#### Penyeragaman Terminologi - Penukaran Modul ke Makmal
- **Kemas Kini Dokumentasi Komprehensif**: Mengemas kini secara sistematik semua fail README dalam 11-MCPServerHandsOnLabs untuk menggunakan terminologi "Makmal" bukannya "Modul"
  - **Tajuk Seksyen**: Mengubah "Apa Yang Modul Ini Liputi" kepada "Apa Yang Makmal Ini Liputi" merentas semua 13 makmal
  - **Deskripsi Kandungan**: Menukar "Modul ini menyediakan..." kepada "Makmal ini menyediakan..." di seluruh dokumentasi
  - **Objektif Pembelajaran**: Mengemaskini "Menjelang akhir modul ini..." kepada "Menjelang akhir makmal ini..."
  - **Pautan Navigasi**: Menukarkan semua rujukan "Modul XX:" kepada "Makmal XX:" dalam rujukan silang dan navigasi
  - **Penjejakan Penyelesaian**: Memperbaharui "Selepas melengkapkan modul ini..." kepada "Selepas melengkapkan makmal ini..."
  - **Penjagaan Rujukan Teknikal**: Mengekalkan rujukan modul Python dalam fail konfigurasi (contoh: `"module": "mcp_server.main"`)

#### Penambahbaikan Panduan Kajian (study_guide.md)
- **Peta Kurikulum Visual**: Ditambah seksyen baru "11. Makmal Integrasi Pangkalan Data" dengan visualisasi struktur makmal komprehensif
- **Struktur Repositori**: Dikemaskini dari sepuluh ke sebelas seksyen utama dengan deskripsi terperinci 11-MCPServerHandsOnLabs
- **Panduan Laluan Pembelajaran**: Meningkatkan arahan navigasi untuk merangkumi seksyen 00-11
- **Liputan Teknologi**: Ditambah butiran integrasi FastMCP, PostgreSQL, perkhidmatan Azure
- **Hasil Pembelajaran**: Menekankan pembangunan server sedia produksi, corak integrasi pangkalan data, dan keselamatan perusahaan

#### Penambahbaikan Struktur README Utama
- **Terminologi Berasaskan Makmal**: Mengemaskini README.md utama dalam 11-MCPServerHandsOnLabs untuk konsisten menggunakan struktur "Makmal"
- **Pengaturan Laluan Pembelajaran**: Progresi jelas dari konsep asas hingga pelaksanaan lanjutan ke penghantaran produksi
- **Fokus Dunia Sebenar**: Penekanan kepada pembelajaran praktikal dan langsung dengan corak dan teknologi gred perusahaan

### Penambahbaikan Kualiti & Konsistensi Dokumentasi
- **Penekanan Pembelajaran Praktikal**: Memperkuat pendekatan berasaskan makmal di seluruh dokumentasi
- **Fokus Corak Perusahaan**: Menonjolkan pelaksanaan sedia produksi dan pertimbangan keselamatan perusahaan
- **Integrasi Teknologi**: Liputan komprehensif perkhidmatan Azure moden dan corak integrasi AI
- **Progresi Pembelajaran**: Laluan berstruktur jelas dari konsep asas ke penghantaran produksi

## 26 September, 2025

### Penambahbaikan Kajian Kes - Integrasi Daftar MCP GitHub

#### Kajian Kes (09-CaseStudy/) - Fokus Pembangunan Ekosistem
- **README.md**: Pengembangan besar dengan kajian kes lengkap Daftar MCP GitHub
  - **Kajian Kes Daftar MCP GitHub**: Kajian kes mendalam baru mengkaji pelancaran Daftar MCP GitHub pada September 2025
    - **Analisis Masalah**: Pemeriksaan terperinci cabaran penemuan dan penghantaran pelayan MCP yang terpecah-belah
    - **Seni Bina Penyelesaian**: Pendekatan daftar berpusat GitHub dengan satu klik pemasangan VS Code
    - **Impak Perniagaan**: Penambahbaikan ketara dalam penyertaaan dan produktiviti pembangun
    - **Nilai Strategik**: Fokus pada penghantaran agen modular dan interoperabiliti merentas alat
    - **Pembangunan Ekosistem**: Kedudukan sebagai platform asas untuk integrasi agentik
  - **Struktur Kajian Kes Dipertingkat**: Mengemas kini semua tujuh kajian kes dengan format konsisten dan deskripsi komprehensif
    - Ejen Perjalanan Azure AI: Penekanan pengurusan multi-ejen
    - Integrasi Azure DevOps: Fokus automasi aliran kerja
    - Pengambilan Dokumentasi Masa Nyata: Pelaksanaan klien konsol Python
    - Penjana Pelan Kajian Interaktif: Aplikasi web perbualan Chainlit
    - Dokumentasi Dalam Editor: Integrasi VS Code dan GitHub Copilot
    - Pengurusan API Azure: Corak integrasi API perusahaan
    - Daftar MCP GitHub: Pembangunan ekosistem dan platform komuniti
  - **Kesimpulan Komprehensif**: Bahagian penutup yang ditulis semula menyorot tujuh kajian kes meliputi pelbagai dimensi pelaksanaan MCP
    - Integrasi Perusahaan, Pengurusan Multi-Ejen, Produktiviti Pembangun
    - Pembangunan Ekosistem, Kategori Aplikasi Pendidikan
    - Wawasan diperluas mengenai corak seni bina, strategi pelaksanaan, dan amalan terbaik
    - Penekanan MCP sebagai protokol matang dan sedia produksi

#### Kemas Kini Panduan Kajian (study_guide.md)
- **Peta Kurikulum Visual**: Mengemas kini peta minda untuk memasukkan Daftar MCP GitHub dalam seksyen Kajian Kes
- **Deskripsi Kajian Kes**: Diperbaiki daripada deskripsi generik kepada pecahan terperinci tujuh kajian kes komprehensif
- **Struktur Repositori**: Mengemaskini seksyen 10 untuk mencerminkan liputan kajian kes komprehensif dengan butiran pelaksanaan khusus
- **Integrasi Log Perubahan**: Menambah kemas kini 26 September 2025 yang mendokumentasikan penambahan Daftar MCP GitHub dan penambahbaikan kajian kes
- **Kemas Kini Tarikh**: Memperbaharui cap waktu footer untuk mencerminkan semakan terkini (26 September 2025)

### Penambahbaikan Kualiti Dokumentasi
- **Penyeragaman Peningkatan**: Menstandardisasi pemformatan dan struktur kajian kes untuk ketujuh-tujuh contoh
- **Liputan Komprehensif**: Kajian kes kini merangkumi senario perusahaan, produktiviti pembangun, dan pembangunan ekosistem
- **Pendekatan Strategik**: Penekanan dipertingkatkan pada MCP sebagai platform asas untuk penghantaran sistem agentik
- **Integrasi Sumber**: Mengemas kini sumber tambahan untuk memasukkan pautan Daftar MCP GitHub

## 15 September, 2025

### Perluasan Topik Lanjutan - Pengangkutan Custom & Kejuruteraan Konteks

#### Pengangkutan Custom MCP (05-AdvancedTopics/mcp-transport/) - Panduan Pelaksanaan Lanjutan Baru
- **README.md**: Panduan pelaksanaan lengkap untuk mekanisme pengangkutan MCP custom
  - **Pengangkutan Azure Event Grid**: Pelaksanaan pengangkutan pemicu acara tanpa server
    - Contoh C#, TypeScript, dan Python dengan integrasi Azure Functions
    - Corak seni bina acara untuk penyelesaian MCP boleh diskalakan
    - Penerima webhook dan pengendalian mesej berasaskan push
  - **Pengangkutan Azure Event Hubs**: Pelaksanaan pengangkutan aliran berkapasiti tinggi
    - Keupayaan penstriman masa nyata untuk senario latensi rendah
    - Strategi pembahagian dan pengurusan checkpoint
    - Pengumpulan mesej dan pengoptimuman prestasi
  - **Corak Integrasi Perusahaan**: Contoh seni bina sedia produksi
    - Pemprosesan MCP teragih merentas pelbagai Azure Functions
    - Seni bina pengangkutan hibrid menggabungkan pelbagai jenis pengangkutan
    - Ketahanan mesej, kebolehpercayaan, dan strategi pengendalian ralat
  - **Keselamatan & Pemantauan**: Integrasi Azure Key Vault dan corak kebolehamatan
    - Pengesahan identiti terurus dan akses paling sedikit
    - Telemetri Application Insights dan pemantauan prestasi
    - Pemutus litar dan corak ketahanan terhadap kesilapan
  - **Rangka Kerja Pengujian**: Strategi pengujian komprehensif untuk pengangkutan khusus
    - Ujian unit dengan test doubles dan rangka kerja mocking
    - Ujian integrasi dengan Azure Test Containers
    - Pertimbangan ujian prestasi dan beban

#### Kejuruteraan Konteks (05-AdvancedTopics/mcp-contextengineering/) - Disiplin AI Baru
- **README.md**: Penjelajahan komprehensif kejuruteraan konteks sebagai bidang yang sedang berkembang
  - **Prinsip Teras**: Perkongsian konteks lengkap, kesedaran keputusan tindakan, dan pengurusan tetingkap konteks
  - **Penjajaran Protokol MCP**: Bagaimana reka bentuk MCP menangani cabaran kejuruteraan konteks
    - Had tetingkap konteks dan strategi pemuatan progresif
    - Penentuan relevansi dan pengambilan konteks dinamik
    - Pengendalian konteks pelbagai modaliti dan pertimbangan keselamatan
  - **Pendekatan Pelaksanaan**: Seni bina teras tunggal vs. multi-ejen
    - Teknik pengupasan dan keutamaan konteks
    - Pemuatan konteks progresif dan strategi pemampatan
    - Pendekatan berlapis untuk konteks dan pengoptimuman pengambilan
  - **Rangka Kerja Pengukuran**: Metrik yang muncul untuk penilaian keberkesanan konteks
    - Kecekapan input, prestasi, kualiti, dan pertimbangan pengalaman pengguna
    - Pendekatan eksperimen untuk pengoptimuman konteks
    - Analisis kegagalan dan metodologi penambahbaikan

#### Kemas Kini Navigasi Kurikulum (README.md)
- **Struktur Modul Dipertingkat**: Mengemaskini jadual kurikulum untuk memasukkan topik lanjutan baru
  - Menambah Kejuruteraan Konteks (5.14) dan Pengangkutan Custom (5.15)
  - Format konsisten dan pautan navigasi merentas semua modul
  - Deskripsi terkini mencerminkan skop kandungan semasa

### Penambahbaikan Struktur Direktori
- **Penyeragaman Penamaan**: Menukar nama "mcp transport" kepada "mcp-transport" untuk konsistensi dengan folder topik lanjutan lain
- **Pengurusan Kandungan**: Semua folder 05-AdvancedTopics kini mengikuti corak penamaan konsisten (mcp-[topic])

### Penambahbaikan Kualiti Dokumentasi
- **Penjajaran Spesifikasi MCP**: Semua kandungan baru merujuk Spesifikasi MCP 2025-06-18 terkini
- **Contoh Berbilang Bahasa**: Contoh kod komprehensif dalam C#, TypeScript, dan Python
- **Fokus Perusahaan**: Corak sedia pengeluaran dan integrasi awan Azure di seluruh
- **Dokumentasi Visual**: Diagram Mermaid untuk visualisasi seni bina dan aliran

## 18 Ogos, 2025

### Kemas Kini Komprehensif Dokumentasi - Standard MCP 2025-06-18

#### Amalan Terbaik Keselamatan MCP (02-Security/) - Pemodenan Lengkap
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Penulisan semula lengkap selaras dengan Spesifikasi MCP 2025-06-18
  - **Keperluan Wajib**: Ditambah keperluan JANGAN/SAYA MESTI jelas dari spesifikasi rasmi dengan penunjuk visual
  - **12 Amalan Keselamatan Teras**: Disusun semula daripada senarai 15 item kepada domain keselamatan komprehensif
    - Keselamatan Token & Pengesahan dengan integrasi penyedia identiti luar
    - Pengurusan Sesi & Keselamatan Pengangkutan dengan keperluan kriptografi
    - Perlindungan Ancaman Khas AI dengan integrasi Microsoft Prompt Shields
    - Kawalan Akses & Kebenaran dengan prinsip keistimewaan paling rendah
    - Keselamatan Kandungan & Pemantauan dengan integrasi Azure Content Safety
    - Keselamatan Rantaian Bekalan dengan pengesahan komponen menyeluruh
    - Keselamatan OAuth & Pencegahan Confused Deputy dengan pelaksanaan PKCE
    - Respons Insiden & Pemulihan dengan keupayaan automatik
    - Pematuhan & Tadbir Urus dengan penjajaran regulatori
    - Kawalan Keselamatan Lanjutan dengan seni bina zero trust
    - Integrasi Ekosistem Keselamatan Microsoft dengan penyelesaian komprehensif
    - Evolusi Keselamatan Berterusan dengan amalan adaptif
  - **Penyelesaian Keselamatan Microsoft**: Panduan integrasi dipertingkatkan untuk Prompt Shields, Azure Content Safety, Entra ID, dan GitHub Advanced Security
  - **Sumber Pelaksanaan**: Pautan sumber komprehensif dikategorikan mengikut Dokumentasi MCP Rasmi, Penyelesaian Keselamatan Microsoft, Standard Keselamatan, dan Panduan Pelaksanaan

#### Kawalan Keselamatan Lanjutan (02-Security/) - Pelaksanaan Perusahaan
- **MCP-SECURITY-CONTROLS-2025.md**: Penulisan semula lengkap dengan kerangka keselamatan gred perusahaan
  - **9 Domain Keselamatan Komprehensif**: Diperluas daripada kawalan asas kepada kerangka perusahaan terperinci
    - Pengesahan & Kebenaran Lanjutan dengan integrasi Microsoft Entra ID
    - Keselamatan Token & Kawalan Anti-Passthrough dengan pengesahan menyeluruh
    - Kawalan Keselamatan Sesi dengan pencegahan pengambilalihan
    - Kawalan Keselamatan Khusus AI dengan pencegahan suntikan prompt dan keracunan alat
    - Pencegahan Serangan Confused Deputy dengan keselamatan proksi OAuth
    - Keselamatan Pelaksanaan Alat dengan sandboxing dan pengasingan
    - Kawalan Keselamatan Rantaian Bekalan dengan verifikasi kebergantungan
    - Kawalan Pemantauan & Pengecaman dengan integrasi SIEM
    - Respons Insiden & Pemulihan dengan keupayaan automatik
  - **Contoh Pelaksanaan**: Ditambah blok konfigurasi YAML terperinci dan contoh kod
  - **Integrasi Penyelesaian Microsoft**: Liputan komprehensif perkhidmatan keselamatan Azure, GitHub Advanced Security, dan pengurusan identiti perusahaan

#### Topik Lanjutan Keselamatan (05-AdvancedTopics/mcp-security/) - Pelaksanaan Sedia Produksi
- **README.md**: Penulisan semula lengkap untuk pelaksanaan keselamatan perusahaan
  - **Penjajaran Spesifikasi Semasa**: Dikemas kini kepada Spesifikasi MCP 2025-06-18 dengan keperluan keselamatan wajib
  - **Pengesahan Dipertingkat**: Integrasi Microsoft Entra ID dengan contoh .NET dan Java Spring Security komprehensif
  - **Integrasi Keselamatan AI**: Pelaksanaan Microsoft Prompt Shields dan Azure Content Safety dengan contoh Python terperinci
  - **Mitigasi Ancaman Lanjutan**: Contoh pelaksanaan komprehensif untuk
    - Pencegahan Serangan Confused Deputy dengan PKCE dan pengesahan persetujuan pengguna
    - Pencegahan Passthrough Token dengan pengesahan audien dan pengurusan token selamat
    - Pencegahan Pengambilalihan Sesi dengan pengikatan kriptografi dan analisis tingkah laku
  - **Integrasi Keselamatan Perusahaan**: Pemantauan Azure Application Insights, saluran pengesanan ancaman, dan keselamatan rantaian bekalan
  - **Senarai Semak Pelaksanaan**: Kawalan keselamatan mandatori vs. disyorkan yang jelas dengan faedah ekosistem keselamatan Microsoft

### Kualiti Dokumentasi & Penyelarasan Standard
- **Rujukan Spesifikasi**: Dikemas kini semua rujukan kepada Spesifikasi MCP terkini 2025-06-18
- **Ekosistem Keselamatan Microsoft**: Panduan pengintegrasian dipertingkatkan di seluruh dokumentasi keselamatan
- **Pelaksanaan Praktikal**: Ditambah contoh kod terperinci dalam .NET, Java, dan Python dengan corak perusahaan
- **Pengorganisasian Sumber**: Pengkategorian komprehensif dokumentasi rasmi, piawaian keselamatan, dan panduan pelaksanaan
- **Penunjuk Visual**: Penandaan jelas keperluan mandatori vs. amalan disyorkan


#### Konsep Teras (01-CoreConcepts/) - Pemodenan Lengkap
- **Kemas Kini Versi Protokol**: Dikemas kini untuk merujuk Spesifikasi MCP terkini 2025-06-18 dengan versi berasaskan tarikh (format YYYY-MM-DD)
- **Penyempurnaan Seni Bina**: Penerangan dipertingkatkan mengenai Hos, Klien, dan Pelayan untuk mencerminkan corak seni bina MCP terkini
  - Hos kini jelas didefinisikan sebagai aplikasi AI yang menyelaraskan pelbagai sambungan klien MCP
  - Klien diterangkan sebagai penyambung protokol yang mengekalkan hubungan satu-ke-satu dengan pelayan
  - Pelayan dipertingkatkan dengan senario penyebaran tempatan vs. jauh
- **Penyusunan Semula Primitif**: Perombakan lengkap primitif pelayan dan klien
  - Primitif Pelayan: Sumber (punca data), Prompts (templat), Alat (fungsi yang boleh dilaksanakan) dengan penjelasan dan contoh terperinci
  - Primitif Klien: Persampelan (penyelesaian LLM), Elicitation (input pengguna), Logging (debug/monitor)
  - Dikemas kini dengan corak kaedah penemuan (`*/list`), pengambilan (`*/get`), dan pelaksanaan (`*/call`) terkini
- **Seni Bina Protokol**: Memperkenalkan model seni bina dua lapisan
  - Lapisan Data: Asas JSON-RPC 2.0 dengan pengurusan kitaran hidup dan primitif
  - Lapisan Pengangkutan: STDIO (tempatan) dan HTTP Boleh Alir dengan SSE (jauh) mekanisme pengangkutan
- **Rangka Kerja Keselamatan**: Prinsip keselamatan komprehensif termasuk persetujuan pengguna yang jelas, perlindungan privasi data, keselamatan pelaksanaan alat, dan keselamatan lapisan pengangkutan
- **Corak Komunikasi**: Mesej protokol dikemas kini untuk menunjukkan aliran inisialisasi, penemuan, pelaksanaan, dan pemberitahuan
- **Contoh Kod**: Contoh pelbagai bahasa ( .NET, Java, Python, JavaScript) disegarkan semula untuk mencerminkan corak SDK MCP terkini

#### Keselamatan (02-Security/) - Perombakan Keselamatan Menyeluruh  
- **Penyelarasan Standard**: Penyelarasan penuh dengan keperluan keselamatan Spesifikasi MCP 2025-06-18
- **Evolusi Pengesahan**: Didokumentasikan evolusi dari pelayan OAuth khusus ke delegasi penyedia identiti luaran (Microsoft Entra ID)
- **Analisis Ancaman Khusus AI**: Liputan dipertingkat untuk vektor serangan AI moden
  - Senario serangan suntikan arahan terperinci dengan contoh dunia sebenar
  - Mekanisme pencemaran alat dan corak serangan "tarik permaidani"
  - Pencemaran tetingkap konteks dan serangan kekeliruan model
- **Penyelesaian Keselamatan AI Microsoft**: Liputan komprehensif ekosistem keselamatan Microsoft
  - Perisai Prompt AI dengan teknik pengesanan, penyorotan, dan pemisah canggih
  - Corak integrasi Azure Content Safety
  - GitHub Advanced Security untuk perlindungan rantaian bekalan
- **Mitigasi Ancaman Lanjutan**: Kawalan keselamatan terperinci untuk
  - Pengambilalihan sesi dengan senario serangan khusus MCP dan keperluan ID sesi kriptografi
  - Masalah wakil keliru dalam senario proksi MCP dengan keperluan persetujuan eksplisit
  - Kelemahan laluan token dengan kawalan pengesahan mandatori
- **Keselamatan Rantaian Bekalan**: Liputan diperluas bagi rantaian bekalan AI termasuk model asas, perkhidmatan penanaman, penyedia konteks, dan API pihak ketiga
- **Keselamatan Asas**: Integrasi dipertingkat dengan corak keselamatan perusahaan termasuk seni bina kepercayaan sifar dan ekosistem keselamatan Microsoft
- **Pengorganisasian Sumber**: Pautan sumber komprehensif dikategorikan mengikut jenis (Dokumen Rasmi, Standard, Penyelidikan, Penyelesaian Microsoft, Panduan Pelaksanaan)

### Penambahbaikan Kualiti Dokumentasi
- **Objektif Pembelajaran Berstruktur**: Objektif pembelajaran dipertingkat dengan hasil khusus dan boleh dilaksanakan 
- **Rujukan Rentas**: Ditambah pautan antara topik keselamatan dan konsep teras yang berkaitan
- **Maklumat Terkini**: Dikemas kini semua rujukan tarikh dan pautan spesifikasi kepada standard terkini
- **Panduan Pelaksanaan**: Ditambah garis panduan pelaksanaan khusus dan boleh dilaksanakan di kedua-dua seksyen

## 16 Julai 2025

### Penambahbaikan README dan Navigasi
- Navigasi kurikulum dalam README.md direka semula sepenuhnya
- Gantikaan tag `<details>` dengan format berasaskan jadual yang lebih mudah diakses
- Membuat pilihan susun atur alternatif dalam folder baru "alternative_layouts"
- Ditambah contoh navigasi berasaskan kad, gaya tab, dan akordion
- Dikemas kini bahagian struktur repositori untuk memasukkan semua fail terkini
- Disempurnakan bahagian "Cara Menggunakan Kurikulum Ini" dengan cadangan jelas
- Dikemas kini pautan spesifikasi MCP ke URL yang betul
- Ditambah bahagian Kejuruteraan Konteks (5.14) ke struktur kurikulum

### Kemas Kini Panduan Kajian
- Panduan kajian disemak sepenuhnya untuk menyelaraskan dengan struktur repositori terkini
- Ditambah seksyen baharu untuk Klien dan Alat MCP, serta Pelayan MCP Popular
- Dikemas kini Peta Kurikulum Visual untuk mencerminkan semua topik dengan tepat
- Disempurnakan penerangan Topik Lanjutan untuk merangkumi semua bidang khusus
- Dikemas kini seksyen Kajian Kes untuk mencerminkan contoh sebenar
- Ditambah changelog komprehensif ini

### Sumbangan Komuniti (06-CommunityContributions/)
- Ditambah maklumat terperinci mengenai pelayan MCP untuk penjanaan imej
- Ditambah seksyen komprehensif tentang penggunaan Claude dalam VSCode
- Ditambah arahan penyediaan dan penggunaan klien terminal Cline
- Dikemas kini seksyen klien MCP untuk memasukkan semua pilihan klien popular
- Contoh sumbangan dipertingkat dengan sampel kod yang lebih tepat

### Topik Lanjutan (05-AdvancedTopics/)
- Semua folder topik khusus disusun dengan penamaan konsisten
- Ditambah bahan dan contoh kejuruteraan konteks
- Ditambah dokumentasi integrasi ejen Foundry
- Disempurnakan dokumentasi integrasi keselamatan Entra ID

## 11 Jun 2025

### Penciptaan Awal
- Versi pertama kurikulum MCP untuk Pemula dikeluarkan
- Struktur asas untuk semua 10 seksyen utama dibuat
- Peta Kurikulum Visual dilaksanakan untuk navigasi
- Ditambah projek contoh awal dalam pelbagai bahasa pengaturcaraan

### Bermula (03-GettingStarted/)
- Contoh pelaksanaan pelayan pertama dibuat
- Panduan pembangunan klien ditambah
- Arahan integrasi klien LLM disertakan
- Dokumentasi integrasi VS Code ditambah
- Contoh pelayan Server-Sent Events (SSE) dilaksanakan

### Konsep Teras (01-CoreConcepts/)
- Ditambah penerangan terperinci mengenai seni bina klien-pelayan
- Dokumentasi komponen utama protokol dibuat
- Corak pemesejan dalam MCP didokumentasikan

## 23 Mei 2025

### Struktur Repositori
- Repositori dimulakan dengan struktur folder asas
- Fail README dibuat untuk setiap seksyen utama
- Infrastruktur terjemahan disediakan
- Aset imej dan rajah ditambah

### Dokumentasi
- README.md awal dengan gambaran keseluruhan kurikulum dibuat
- Ditambah FAIL KOD_TATACARA.md dan KESELAMATAN.md
- SUPPORT.md disediakan dengan panduan mendapatkan bantuan
- Struktur panduan kajian awal dibuat

## 15 April 2025

### Perancangan dan Rangka Kerja
- Perancangan awal untuk kurikulum MCP untuk Pemula
- Objektif pembelajaran dan sasaran audien ditentukan
- Struktur 10-seksyen kurikulum digariskan
- Rangka kerja konseptual untuk contoh dan kajian kes dibangunkan
- Contoh prototaip awal dibuat untuk konsep utama

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->