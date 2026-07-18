# Catatan Perubahan

Semua perubahan penting untuk kursus **AI Agents for Beginners** didokumentasikan dalam file ini.

## [Rilis] — 2026-07-13

Rilis ini menambahkan dua pelajaran baru yang melengkapi rangkaian penerapan — menskalakan agen ke Microsoft Foundry dan menurunkannya ke satu workstation saja — serta pipeline smoke-test, navigasi kursus yang diperbarui, keterampilan pembelajar baru, dan branding yang diperbarui.

### Ditambahkan

- **Pelajaran 16 — Menerapkan Agen yang Dapat Diskalakan dengan Microsoft Foundry.** Pelajaran baru [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) dan notebook yang dapat dijalankan [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) membangun agen dukungan pelanggan produksi (tools, RAG, memori, routing model, caching respons, persetujuan manusia, gerbang evaluasi, dan pelacakan OpenTelemetry), dengan diagram Mermaid pengembangan/penerapan/runtime, cek pengetahuan, tugas, dan tantangan.
- **Pelajaran 17 — Membuat Agen AI Lokal dengan Foundry Local dan Qwen.** Pelajaran baru [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) dan notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) membangun asisten rekayasa yang sepenuhnya di perangkat (pemanggilan fungsi Qwen melalui Foundry Local, alat file sandboxed, RAG lokal dengan Chroma, MCP lokal opsional), dengan diagram lokal saja / lokal-RAG / pemanggilan alat, cek pengetahuan, tugas, dan tantangan.
- **Pipeline smoke-test.** Workflow [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) baru [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) plus katalog per pelajaran di [tests/](./tests/README.md) untuk agen yang dapat diterapkan dalam Pelajaran 01, 04, 05, dan 16, dengan README indeks yang memetakan setiap katalog ke pelajaran dan nama agen yang dihosting. Pelajaran 16 memiliki bagian "Memvalidasi Agen yang Diterapkan dengan Smoke Tests"; Pelajaran 01/04/05 mendapat petunjuk smoke-test opsional.
- **Keterampilan pembelajar.** Keterampilan Agen baru di `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (mengemas panduan Pelajaran 16 dan 17), dan [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (cara memvalidasi contoh notebook terhadap setup Microsoft Foundry / Azure OpenAI yang hidup).
- **Notebook validation runner.** [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) baru yang menjalankan setiap notebook Python secara headless dengan `nbconvert` dan mencetak matriks PASS/FAIL (plus `results.json`). Ia mendeteksi root repo dan Python secara otomatis, mengecualikan notebook non-kursus ( `.venv`, `site-packages`, `translations`, aset template skill) dan notebook `.NET` secara default, serta mendukung argumen `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, dan `-Python`.
- **Navigasi kursus.** Tambahan tautan pelajaran Sebelumnya/Berikutnya untuk Pelajaran 11–15 (sebelumnya tidak ada) agar seluruh kursus terhubung dari 00 → 18 di kedua arah.
- **Thumbnail baru.** Thumbnail pelajaran untuk Pelajaran 16 dan 17, plus gambar sosial repositori yang diperbarui [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (sekarang mempromosikan dua pelajaran baru dan URL `aka.ms/ai-agents-beginners`).
- **Dependensi** ([requirements.txt](../../requirements.txt)): menambahkan `foundry-local-sdk` dan `chromadb` untuk Pelajaran 17.

### Diubah

- **Tabel pelajaran utama di [README.md](./README.md)**: Pelajaran 16 dan 17 sekarang ditautkan ke kontennya (sebelumnya "Segera Hadir"); gambar repositori diperbarui menjadi `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: menambahkan Pelajaran 16 dan 17 ke panduan per-pelajaran dan jalur pembelajaran, serta bagian "Memvalidasi Agen yang Diterapkan dengan Smoke Tests".
- **[AGENTS.md](./AGENTS.md)**: memperbarui jumlah/penjelasan pelajaran (00–18), menambahkan bagian validasi smoke-test, dan menambahkan contoh penamaan sampel Pelajaran 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Pelajaran Sebelumnya" sekarang mengarah ke Pelajaran 17 (sebelumnya Pelajaran 15), menutup rantai.
- **Standarisasi referensi model pada model yang tidak usang.** Mengganti semua referensi `gpt-4o` / `gpt-4o-mini` di seluruh kursus (dokumentasi, `.env.example`, notebook Python/.NET dan contoh) dengan `gpt-4.1-mini` — `gpt-4o` (semua versi) akan dihentikan pada 2026. Contoh routing model di Pelajaran 16 mempertahankan kontras kecil/besar menggunakan `gpt-4.1-mini` (kecil) dan `gpt-4.1` (besar). Notebook Python sekarang memilih model dari variabel lingkungan (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) alih-alih menuliskan nama model secara langsung.

### Catatan dan keterbatasan yang diketahui

- **Tidak dijalankan terhadap Azure live.** Notebook pada pelajaran baru adalah contoh edukasi; jalankan dan validasi menggunakan setup Microsoft Foundry / Foundry Local Anda sendiri. Workflow smoke-test mengharuskan Anda menerapkan agen pelajaran dan mengonfigurasi rahasia OIDC Azure (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) dengan peran **Azure AI User** pada cakupan proyek Foundry.
- **Pelajaran 17 hanya lokal.** Tidak memiliki endpoint Foundry Responses, jadi aksi smoke-test tidak berlaku; validasi dengan menjalankan notebook di workstation Anda.

## [Rilis] — 2026-07-06

Rilis ini memigrasikan kursus ke **Azure OpenAI Responses API**, menstandarisasi penamaan produk pada **Microsoft Foundry** dan **Microsoft Agent Framework (MAF)**, menghentikan GitHub Models, memperbarui versi SDK, dan menambahi konten baru tentang model lokal dan hosting kerangka kerja lain di Foundry.

### Ditambahkan

- **Keterampilan migrasi** — Terpasang Agent Skill [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (dari [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) di `.agents/skills/`, beserta referensi dan skrip scanner-nya.
- **Foundry Local (menjalankan model di perangkat)** — Bagian baru "Alternative Provider: Foundry Local" di [00-course-setup/README.md](./00-course-setup/README.md) mencakup instalasi (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, dan menghubungkan `FoundryLocalManager` ke Microsoft Agent Framework lewat `OpenAIChatClient`.
- **Hosting agen LangChain / LangGraph di Microsoft Foundry** — Bagian baru di [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) plus contoh yang dapat dijalankan [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) menggunakan `langchain-azure-ai[hosting]` dan `ResponsesHostServer` (protokol `/responses`), berdasarkan [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Bagian baru "Contoh Nyata: Microsoft Project Opal" di [15-browser-use/README.md](./15-browser-use/README.md) yang menggambarkan Opal sebagai agen penggunaan komputer perusahaan dan memetakan ke konsep kursus (human-in-the-loop, kepercayaan/ keamanan, perencanaan, Keterampilan).
- **Contoh Python Pelajaran 02 kedua** — Ditambahkan [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (lihat "Diubah" — dimigrasi dari notebook Semantic Kernel sebelumnya) dan menautkannya di README pelajaran.
- Bagian **Models and Providers** ditambahkan ke [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Diubah

- **Chat Completions → Responses API (Python).** Contoh yang memanggil model langsung dimigrasi dari Chat Completions ke Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), menggunakan klien `OpenAI` dengan endpoint stabil Azure OpenAI `/openai/v1/` (tanpa `api_version`). Contoh terpengaruh antara lain:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — walkthrough lengkap pemanggilan fungsi (skema alat di-flatten ke format Responses, hasil alat dikembalikan sebagai `function_call_output`, `max_output_tokens`, dll.).
- **GitHub Models → Azure OpenAI.** GitHub Models dihentikan (akan dihentikan **Juli 2026**) dan tidak mendukung Responses API. Semua jalur kode GitHub Models dikonversi ke Azure OpenAI / Microsoft Foundry di contoh Python dan .NET:
  - Python: notebook workflow Pelajaran 08 (`01`–`03`), Pelajaran 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + dokumen `.md` pendamping, dan notebook/workflow `.md` Pelajaran 08 dotNET (`01`–`03`) sekarang menggunakan `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` dengan `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Notebook lama `02-semantic-kernel.ipynb` ditulis ulang menggunakan Microsoft Agent Framework dengan Azure OpenAI (Responses API) dan diganti nama menjadi `02-python-agent-framework-azure-openai.ipynb`.
- **Standarisasi ke `FoundryChatClient` + `as_agent`.** README dan kode notebook yang merujuk `AzureAIProjectAgentProvider` distandarisasi dengan pola kanonik yang digunakan oleh Pelajaran 01 dan contoh framework-nya sendiri: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` dengan `provider.as_agent(...)`. Diperbarui di README dan notebook Pelajaran 02–14 (misalnya memori Pelajaran 13, semua notebook Pelajaran 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Penamaan produk.** Diganti di seluruh konten bahasa Inggris:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Tidak berubah: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", dan nama variabel lingkungan.)
- **Dependensi** ([requirements.txt](../../requirements.txt)):
  - Mengunci versi `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Mengunci versi `openai>=1.108.1` (minimal untuk Responses API).
  - Menghapus `azure-ai-inference` (hanya digunakan oleh contoh GitHub Models yang dimigrasi).
- **Konfigurasi lingkungan** ([.env.example](../../.env.example)): menghapus variabel GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); menambahkan `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, dan opsional `AZURE_OPENAI_API_KEY`; memperbarui penamaan ke Microsoft Foundry.
- **Dokumentasi** — Memperbarui [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), dan [STUDY_GUIDE.md](./STUDY_GUIDE.md) sesuai perubahan tersebut (pengaturan env vars, snippet verifikasi, panduan penyedia, penamaan).

### Dihapus

- Langkah onboarding dan variabel lingkungan GitHub Models dari dokumentasi pengaturan (digantikan oleh Azure OpenAI / Microsoft Foundry).

### Keamanan / Privasi (pembersihan publikasi)

- Menghapus output eksekusi Jupyter notebook yang membocorkan **ID langganan Azure** asli, nama grup sumber daya / sumber daya, dan ID koneksi Bing, serta **jalur file lokal dan nama pengguna pengembang**, di:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Telah diverifikasi tidak ada kunci API, token, ID langganan, atau jalur pribadi yang tersisa dalam konten bahasa Inggris yang dilacak (referensi `GITHUB_TOKEN` yang tersisa adalah token GitHub Actions dalam workflow dan PAT server GitHub MCP di pengaturan Pelajaran 11 — keduanya sah dan tidak terkait dengan GitHub Models).

### Catatan dan keterbatasan yang diketahui

- **Tidak dijalankan/dikompilasi.** Ini adalah contoh edukasi yang diperbarui untuk keakuratan API/nama; mereka tidak dijalankan pada sumber daya Azure langsung, dan contoh .NET tidak dikompilasi di lingkungan ini. Validasi terhadap implementasi Microsoft Foundry / Azure OpenAI Anda sendiri.
- **Deploy model harus mendukung Responses API.** Gunakan deployment seperti `gpt-4.1-mini`, `gpt-4.1`, atau model `gpt-5.x`. Model lama mendukung fungsi inti Responses tetapi tidak semua fitur.
- **Versi agent-framework.** Contoh menargetkan MAF terbaru (`>=1.10.0`). Panggilan agent-creation kanonik adalah `client.as_agent(...)`; API telah divalidasi terhadap dokumentasi framework yang diterbitkan dan build yang terinstal. Jika Anda menggunakan versi lain, pastikan ketersediaan metode (`as_agent` vs `create_agent`).
- **Notebook workflow Pelajaran 08 nomor 04** sengaja mempertahankan `AzureAIAgentClient` (dari `agent-framework-azure-ai`) karena menggunakan alat host Microsoft Foundry Agent Service (grounding Bing, interpreter kode); ini sudah berbasis Responses.
- **Deploy default .NET.** Dua contoh workflow dotNET Pelajaran 08 sebelumnya mengunci model tertentu; sekarang default ke `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Jika contoh memerlukan input multimodal/visi, tetapkan `AZURE_OPENAI_DEPLOYMENT` ke model yang sesuai.
- **Foundry Local** mengekspose endpoint **Chat Completions** kompatibel OpenAI dan ditujukan untuk pengembangan lokal; gunakan Azure OpenAI / Microsoft Foundry untuk fitur lengkap Responses API.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->