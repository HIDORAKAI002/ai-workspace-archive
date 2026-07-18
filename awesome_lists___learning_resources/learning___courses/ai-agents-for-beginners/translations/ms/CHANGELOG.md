# Log Perubahan

Semua perubahan penting untuk kursus **Ejen AI untuk Pemula** didokumenkan dalam fail ini.

## [Dikeluarkan] — 2026-07-13

Pengeluaran ini menambah dua pelajaran baru yang melengkapkan lengkung penerapan — memperkembangkan ejen kepada Microsoft Foundry dan mengecilkan ke satu workstation — serta satu pipeline ujian asap, navigasi kursus yang diperbaharui, kemahiran pelajar baru, dan penjenamaan yang dikemas kini.

### Ditambah

- **Pelajaran 16 — Menerapkan Ejen Skala dengan Microsoft Foundry.** Pelajaran baru [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) dan buku nota yang boleh dijalankan [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) membina ejen sokongan pelanggan pengeluaran (alat, RAG, ingatan, laluan model, penyimpanan respons, kelulusan manusia, pintu penilaian, dan penjejakan OpenTelemetry), dengan rajah Mermaid pembangunan/penerapan/pengoperasian, pemeriksaan pengetahuan, tugasan, dan cabaran.
- **Pelajaran 17 — Mencipta Ejen AI Tempatan dengan Foundry Local dan Qwen.** Pelajaran baru [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) dan buku nota [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) membina pembantu kejuruteraan sepenuhnya di peranti (panggilan fungsi Qwen melalui Foundry Local, alat fail kawasan selamat, RAG tempatan dengan Chroma, MCP tempatan pilihan), dengan rajah hanya-temporari/RAG tempatan/panggilan-alat, pemeriksaan pengetahuan, tugasan, dan cabaran.
- **Pipeline ujian asap.** Alur kerja baru [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) serta katalog per-pelajaran di bawah [tests/](./tests/README.md) untuk ejen yang boleh diterapkan dalam Pelajaran 01, 04, 05, dan 16, dengan README indeks yang memetakan setiap katalog kepada pelajarannya dan nama ejen dihoskan. Pelajaran 16 menambah bahagian "Memvalidasi Ejen yang Diterapkan dengan Ujian Asap"; Pelajaran 01/04/05 menambah penunjuk ujian asap pilihan.
- **Kemahiran pelajar.** Kemahiran Ejen baru di bawah `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (mengandungi panduan Pelajaran 16 dan 17), dan [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (cara memvalidasi sampel buku nota terhadap tetapan Microsoft Foundry / Azure OpenAI secara langsung).
- **Runner pengesahan buku nota.** Baru [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) yang menjalankan setiap buku nota Python tanpa kepala menggunakan `nbconvert` dan memaparkan matriks LULUS/GAGAL (serta `results.json`). Ia mengesan akar repo dan Python secara automatik, mengecualikan buku nota bukan kursus (`.venv`, `site-packages`, `translations`, aset templat kemahiran) dan buku nota `.NET` secara lalai, dan menyokong `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, dan `-Python`.
- **Navigasi kursus.** Menambah pautan Pelajaran Sebelumnya/Seterusnya ke Pelajaran 11–15 (sebelumnya tiada) supaya keseluruhan kursus bersambung dari 00 → 18 dalam kedua-dua arah.
- **Gambar kecil baru.** Gambar kecil pelajaran untuk Pelajaran 16 dan 17, serta imej sosial repo yang diperbaharui [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (kini mengiklankan dua pelajaran baru dan URL `aka.ms/ai-agents-beginners`).
- **Kebergantungan** ([requirements.txt](../../requirements.txt)): menambah `foundry-local-sdk` dan `chromadb` untuk Pelajaran 17.

### Diubah

- **Jadual pelajaran utama [README.md](./README.md)**: Pelajaran 16 dan 17 kini dipaut ke kandungan mereka (sebelumnya "Akan Datang"); imej repositori dinaikkan ke `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: menambah Pelajaran 16 dan 17 ke panduan setiap pelajaran dan laluan pembelajaran, serta bahagian "Memvalidasi Ejen yang Diterapkan dengan Ujian Asap".
- **[AGENTS.md](./AGENTS.md)**: mengemas kini bilangan/ penerangan pelajaran (00–18), menambah bahagian pengesahan ujian asap, dan menambah contoh penamaan sampel Pelajaran 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Pelajaran Sebelumnya" kini menunjuk ke Pelajaran 17 (sebelumnya Pelajaran 15), menutup rangkaian.
- **Rujukan model distandardkan dalam model tidak usang.** Menggantikan semua rujukan `gpt-4o` / `gpt-4o-mini` di seluruh kursus (dokumentasi, `.env.example`, buku nota dan sampel Python/.NET) dengan `gpt-4.1-mini` — `gpt-4o` (semua versi) akan ditamatkan pada 2026. Contoh laluan model dalam Pelajaran 16 mengekalkan kontras kecil/besar menggunakan `gpt-4.1-mini` (kecil) dan `gpt-4.1` (besar). Buku nota Python kini memilih model daripada pembolehubah persekitaran (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) dan bukannya mengekod nama model secara keras.

### Nota dan had diketahui

- **Tidak dijalankan terhadap Azure langsung.** Buku nota pelajaran baru adalah contoh pendidikan; jalankan dan sahkan dengan tetapan Microsoft Foundry / Foundry Local anda sendiri. Alur kerja ujian asap memerlukan anda menerapkan ejen pelajaran tersebut dan menyusun rahsia OIDC Azure (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) dengan peranan **Pengguna AI Azure** pada skop projek Foundry.
- **Pelajaran 17 adalah tempatan sahaja.** Ia tidak mempunyai titik akhir Foundry Responses, jadi tindakan ujian asap tidak terpakai; sahkan dengan menjalankan buku nota pada workstation anda.

## [Dikeluarkan] — 2026-07-06

Pengeluaran ini memindahkan kursus ke **Azure OpenAI Responses API**, menyelaraskan penamaan produk pada **Microsoft Foundry** dan **Microsoft Agent Framework (MAF)**, menamatkan GitHub Models, mengemas kini versi SDK, dan menambah kandungan baru mengenai model tempatan dan pengehosan rangka kerja lain di Foundry.

### Ditambah

- **Kemahiran migrasi** — Memasang Kemahiran Ejen [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (dari [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) di bawah `.agents/skills/`, termasuk rujukan dan skrip imbasannya.
- **Foundry Local (menjalankan model di peranti)** — Bahagian baru "Pembekal Alternatif: Foundry Local" dalam [00-course-setup/README.md](./00-course-setup/README.md) merangkumi pemasangan (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, dan penyambungan `FoundryLocalManager` ke Microsoft Agent Framework melalui `OpenAIChatClient`.
- **Mengehoskan ejen LangChain / LangGraph di Microsoft Foundry** — Bahagian baru dalam [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) serta sampel boleh dijalankan [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) menggunakan `langchain-azure-ai[hosting]` dan `ResponsesHostServer` (protokol `/responses`), berdasarkan [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Projek Microsoft Opal** — Bahagian baru "Contoh Dunia Sebenar: Projek Microsoft Opal" dalam [15-browser-use/README.md](./15-browser-use/README.md) yang menggambarkan Opal sebagai ejen penggunaan komputer perusahaan dan memetakannya kepada konsep kursus (manusia dalam gelung, kepercayaan/ keselamatan, perancangan, Kemahiran).
- **Contoh Python Kedua untuk Pelajaran 02** — Menambah [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (lihat "Diubah" — dipindahkan dari buku nota Semantic Kernel sebelumnya) dan pautannya dalam README pelajaran.
- Menambah bahagian Models dan Providers dalam [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Diubah

- **Chat Completions → Responses API (Python).** Contoh yang memanggil model secara langsung telah dipindahkan dari Chat Completions ke Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), menggunakan klien `OpenAI` terhadap titik akhir Azure OpenAI yang stabil `/openai/v1/` (tanpa `api_version`). Contoh terjejas termasuk:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — panduan penuh fungsi-panggilan (skema alat diratakan ke format Responses, keputusan alat dipulangkan sebagai `function_call_output`, `max_output_tokens`, dan lain-lain).
- **GitHub Models → Azure OpenAI.** GitHub Models sudah usang (akan ditamatkan **Julai 2026**) dan tidak menyokong Responses API. Semua laluan kod GitHub Models telah ditukar ke Azure OpenAI / Microsoft Foundry dalam contoh Python dan .NET:
  - Python: buku nota alur kerja Pelajaran 08 (`01`–`03`), Pelajaran 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + dokumen `.md` pendamping, dan buku nota alur kerja Pelajaran 08 dotNET/`.md` (`01`–`03`) kini menggunakan `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` dengan `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Fail `02-semantic-kernel.ipynb` yang lama ditulis semula untuk menggunakan Microsoft Agent Framework dengan Azure OpenAI (Responses API) dan dinamakan semula kepada `02-python-agent-framework-azure-openai.ipynb`.
- **Distandardkan pada `FoundryChatClient` + `as_agent`.** Kod README dan buku nota yang merujuk `AzureAIProjectAgentProvider` telah distandardkan kepada corak kanonik yang digunakan oleh Pelajaran 01 dan contoh rangka kerja sendiri: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` dengan `provider.as_agent(...)`. Dikemas kini merentasi README dan buku nota Pelajaran 02–14 (contohnya, ingatan Pelajaran 13, semua buku nota Pelajaran 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Penamaan produk.** Menamakan semula dalam kandungan Bahasa Inggeris:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Tidak berubah: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", dan nama pembolehubah persekitaran.)
- **Kebergantungan** ([requirements.txt](../../requirements.txt)):
  - Memastikan `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Memastikan `openai>=1.108.1` (minimum untuk Responses API).
  - Menghilangkan `azure-ai-inference` (hanya digunakan oleh contoh GitHub Models yang telah dipindahkan).
- **Konfigurasi persekitaran** ([.env.example](../../.env.example)): mengeluarkan pembolehubah GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); menambah `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, dan opsyenal `AZURE_OPENAI_API_KEY`; mengemas kini penamaan kepada Microsoft Foundry.
- **Dokumentasi** — Mengemas kini [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), dan [STUDY_GUIDE.md](./STUDY_GUIDE.md) untuk yang di atas (penetapan pembolehubah env, snippet pengesahan, panduan pembekal, penamaan).

### Dikeluarkan

- Langkah onboarding GitHub Models dan pembolehubah persekitaran dari dokumentasi pemasangan (digantikan oleh Azure OpenAI / Microsoft Foundry).

### Keselamatan / Privasi (pembersihan perkongsian awam)

- Mengosongkan output pelaksanaan dalam buku nota Jupyter yang mendedahkan **ID langganan Azure** sebenar, nama kumpulan sumber/ sumber, dan ID sambungan Bing, serta **laluan fail tempatan dan nama pengguna pembangun** dalam:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Disahkan tiada kunci API, token, ID langganan, atau laluan peribadi yang kekal dalam kandungan Inggeris yang dijejak (rujukan `GITHUB_TOKEN` yang kekal adalah token GitHub Actions dalam aliran kerja dan PAT pelayan GitHub MCP dalam tetapan Pelajaran 11 — kedua-duanya sah dan tidak berkaitan dengan Model GitHub).

### Nota dan batasan yang diketahui

- **Tidak dijalankan/disusun.** Ini adalah sampel pendidikan yang dikemas kini untuk ketepatan API/penamaan; ia tidak dijalankan terhadap sumber Azure langsung, dan sampel .NET tidak disusun dalam persekitaran ini. Sahkan dengan pelaksanaan Microsoft Foundry / Azure OpenAI anda sendiri.
- **Penggubalan model mesti menyokong API Respons.** Gunakan penggubalan seperti `gpt-4.1-mini`, `gpt-4.1`, atau model `gpt-5.x`. Model lama menyokong fungsi teras Respons tetapi tidak setiap ciri.
- **Versi rangka kerja agen.** Sampel mensasarkan MAF terkini (`>=1.10.0`). Panggilan penciptaan agen yang rasmi adalah `client.as_agent(...)`; API disahkan dengan dokumentasi rangka kerja yang diterbitkan dan binaan yang dipasang. Jika anda mengunci versi berbeza, sahkan ketersediaan kaedah (`as_agent` vs `create_agent`).
- **Notebook aliran kerja Pelajaran 08 04** secara sengaja mengekalkan `AzureAIAgentClient` (dari `agent-framework-azure-ai`) kerana ia menggunakan alat hos Perkhidmatan Agen Microsoft Foundry (penyandaran Bing, penterjemah kod); ia sudah berdasarkan Respons.
- **Penggubalan lalai .NET.** Dua sampel aliran kerja dotNET Pelajaran 08 sebelum ini telah menetapkan model tertentu secara tetap; kini mereka lalai ke `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Jika sampel bergantung pada input multimodal/visi, tetapkan `AZURE_OPENAI_DEPLOYMENT` kepada model yang sesuai.
- **Foundry Local** mendedahkan titik akhir **Chat Completions** yang serasi OpenAI dan bertujuan untuk pembangunan tempatan; gunakan Azure OpenAI / Microsoft Foundry untuk set ciri API Respons penuh.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->