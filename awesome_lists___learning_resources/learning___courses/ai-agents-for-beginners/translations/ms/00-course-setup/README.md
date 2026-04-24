# Penyediaan Kursus

## Pengenalan

Pelajaran ini akan merangkumi cara menjalankan contoh kod kursus ini.

## Sertai Pelajar Lain dan Dapatkan Bantuan

Sebelum anda mula menyalin repo anda, sertai [saluran Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord) untuk mendapatkan bantuan mengenai penyediaan, sebarang pertanyaan tentang kursus, atau untuk berhubung dengan pelajar lain.

## Salin atau Fork Repo ini

Untuk bermula, sila salin atau fork Repositori GitHub. Ini akan membuat versi anda sendiri bagi bahan kursus supaya anda boleh menjalankan, menguji, dan mengubah kod!

Ini boleh dilakukan dengan mengklik pautan ke <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fork repo</a>

Anda kini harus mempunyai versi forked kursus ini di pautan berikut:

![Forked Repo](../../../translated_images/ms/forked-repo.33f27ca1901baa6a.webp)

### Salin Ringkas (disyorkan untuk bengkel / Codespaces)

  >Repositori penuh boleh menjadi besar (~3 GB) apabila anda memuat turun sejarah penuh dan semua fail. Jika anda hanya menghadiri bengkel atau hanya memerlukan beberapa folder pelajaran, salin ringkas (atau salin jarang) mengelakkan kebanyakan muat turun tersebut dengan memotong sejarah dan/atau melangkau blob.

#### Salin ringkas cepat — sejarah minimum, semua fail

Gantikan `<your-username>` dalam arahan di bawah dengan URL fork anda (atau URL hulu jika anda lebih suka).

Untuk menyalin hanya sejarah komit terkini (muat turun kecil):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Untuk menyalin cawangan tertentu:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Salin separa (jarang) — blob minimum + hanya folder terpilih

Ini menggunakan salin separa dan sparse-checkout (memerlukan Git 2.25+ dan disyorkan Git moden dengan sokongan salin separa):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Masuk ke dalam folder repo:

```bash|powershell
cd ai-agents-for-beginners
```

Kemudian nyatakan folder mana yang anda mahu (contoh di bawah menunjukkan dua folder):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Selepas menyalin dan mengesahkan fail, jika anda hanya memerlukan fail dan mahu menjimatkan ruang (tiada sejarah git), sila padam metadata repositori (💀tidak boleh dipulihkan — anda akan kehilangan semua fungsi Git: tiada komit, tarik, tolak, atau capaian sejarah).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Menggunakan GitHub Codespaces (disyorkan untuk mengelakkan muat turun besar tempatan)

- Buat Codespace baru untuk repo ini melalui [UI GitHub](https://github.com/codespaces).  

- Dalam terminal codespace yang baru diwujudkan, jalankan salah satu arahan salin ringkas/jarang di atas untuk membawa hanya folder pelajaran yang anda perlukan ke ruang kerja Codespace.
- Pilihan: selepas menyalin di dalam Codespaces, keluarkan .git untuk mendapatkan ruang tambahan (lihat arahan penghapusan di atas).
- Nota: Jika anda lebih suka membuka repo terus di Codespaces (tanpa salin tambahan), sedar bahawa Codespaces akan membina persekitaran devcontainer dan mungkin masih menyediakan lebih banyak dari yang anda perlukan. Menyalin salinan ringkas dalam Codespace baru memberi kawalan lebih terhadap penggunaan cakera.

#### Petua

- Sentiasa gantikan URL salin dengan fork anda jika anda mahu mengedit/komit.
- Jika kemudian anda memerlukan lebih sejarah atau fail, anda boleh mengambilnya atau laraskan sparse-checkout untuk memasukkan folder tambahan.

## Menjalankan Kod

Kursus ini menawarkan siri Jupyter Notebooks yang anda boleh jalankan untuk mendapatkan pengalaman praktikal membina Ejen AI.

Contoh kod menggunakan **Microsoft Agent Framework (MAF)** dengan `AzureAIProjectAgentProvider`, yang berhubung ke **Azure AI Agent Service V2** (API Respons) melalui **Microsoft Foundry**.

Semua notebook Python diberi label `*-python-agent-framework.ipynb`.

## Keperluan

- Python 3.12+
  - **CATATAN**: Jika anda belum memasang Python3.12, pastikan anda memasangnya. Kemudian buat venv anda menggunakan python3.12 untuk memastikan versi yang betul dipasang dari fail requirements.txt.
  
    >Contoh

    Buat direktori Python venv:

    ```bash|powershell
    python -m venv venv
    ```

    Kemudian aktifkan persekitaran venv untuk:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Untuk kod contoh yang menggunakan .NET, pastikan anda memasang [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) atau lebih baru. Kemudian, periksa versi .NET SDK yang dipasang:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Diperlukan untuk pengesahan. Pasang dari [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Langganan Azure** — Untuk akses ke Microsoft Foundry dan Azure AI Agent Service.
- **Projek Microsoft Foundry** — Projek dengan model yang telah dideploy (contoh: `gpt-4o`). Lihat [Langkah 1](#langkah-1-buat-projek-microsoft-foundry) di bawah.

Kami telah sertakan fail `requirements.txt` di akar repositori ini yang mengandungi semua pakej Python yang diperlukan untuk menjalankan contoh kod.

Anda boleh memasangnya dengan menjalankan arahan berikut di terminal anda pada akar repositori:

```bash|powershell
pip install -r requirements.txt
```

Kami mengesyorkan membuat persekitaran maya Python untuk mengelakkan sebarang konflik dan masalah.

## Sediakan VSCode

Pastikan anda menggunakan versi Python yang betul dalam VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Sediakan Microsoft Foundry dan Azure AI Agent Service

### Langkah 1: Buat Projek Microsoft Foundry

Anda memerlukan **hub** dan **projek** Azure AI Foundry dengan model yang telah dideploy untuk menjalankan notebook.

1. Pergi ke [ai.azure.com](https://ai.azure.com) dan log masuk dengan akaun Azure anda.
2. Buat **hub** (atau gunakan yang sedia ada). Lihat: [Ikhtisar sumber Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Dalam hub, buat **projek**.
4. Deploy model (contoh: `gpt-4o`) dari **Models + Endpoints** → **Deploy model**.

### Langkah 2: Dapatkan Endpoint Projek dan Nama Deploy Model Anda

Dari projek anda di portal Microsoft Foundry:

- **Project Endpoint** — Pergi ke halaman **Overview** dan salin URL endpoint.

![Project Connection String](../../../translated_images/ms/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — Pergi ke **Models + Endpoints**, pilih model yang telah dideploy, dan catat **Deployment name** (contoh: `gpt-4o`).

### Langkah 3: Log masuk ke Azure dengan `az login`

Semua notebook menggunakan **`AzureCliCredential`** untuk pengesahan — tiada kunci API untuk diurus. Ini memerlukan anda log masuk melalui Azure CLI.

1. **Pasang Azure CLI** jika belum: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Log masuk** dengan menjalankan:

    ```bash|powershell
    az login
    ```

    Atau jika anda dalam persekitaran jauh/Codespace tanpa pelayar:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Pilih langganan anda** jika diminta — pilih yang mengandungi projek Foundry anda.

4. **Sahkan** anda telah log masuk:

    ```bash|powershell
    az account show
    ```

> **Kenapa `az login`?** Notebook mengesahkan menggunakan `AzureCliCredential` dari pakej `azure-identity`. Ini bermakna sesi Azure CLI anda menyediakan kelayakan — tiada kunci API atau rahsia dalam fail `.env` anda. Ini adalah [amalan terbaik keselamatan](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Langkah 4: Buat Fail `.env` Anda

Salin fail contoh:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Buka `.env` dan isi dua nilai ini:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| Pembolehubah | Lokasi untuk mencarinya |
|--------------|-------------------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Portal Foundry → projek anda → halaman **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Portal Foundry → **Models + Endpoints** → nama model yang dideploy |

Itu sahaja untuk kebanyakan pelajaran! Notebook akan mengesahkan automatik melalui sesi `az login` anda.

### Langkah 5: Pasang Kebergantungan Python

```bash|powershell
pip install -r requirements.txt
```

Kami mengesyorkan menjalankan ini dalam persekitaran maya yang anda buat tadi.

## Penyediaan Tambahan untuk Pelajaran 5 (Agentic RAG)

Pelajaran 5 menggunakan **Azure AI Search** untuk penjanaan yang dipertingkatkan dengan pengambilan maklumat. Jika anda merancang untuk menjalankan pelajaran itu, tambah pembolehubah ini ke fail `.env` anda:

| Pembolehubah | Lokasi untuk mencarinya |
|--------------|-------------------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Portal Azure → sumber **Azure AI Search** anda → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Portal Azure → sumber **Azure AI Search** anda → **Settings** → **Keys** → kunci pentadbir utama |

## Penyediaan Tambahan untuk Pelajaran 6 dan Pelajaran 8 (Model GitHub)

Beberapa notebook dalam pelajaran 6 dan 8 menggunakan **Model GitHub** dan bukan Azure AI Foundry. Jika anda merancang untuk menjalankan contoh itu, tambah pembolehubah ini ke fail `.env` anda:

| Pembolehubah | Lokasi untuk mencarinya |
|--------------|-------------------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | Gunakan `https://models.inference.ai.azure.com` (nilai lalai) |
| `GITHUB_MODEL_ID` | Nama model untuk digunakan (contoh: `gpt-4o-mini`) |

## Penyedia Alternatif: MiniMax (Serasi OpenAI)

[MiniMax](https://platform.minimaxi.com/) menyediakan model konteks besar (hingga 204K token) melalui API serasi OpenAI. Oleh kerana `OpenAIChatClient` Microsoft Agent Framework berfungsi dengan mana-mana endpoint serasi OpenAI, anda boleh menggunakan MiniMax sebagai alternatif terus kepada Model GitHub atau OpenAI.

Tambah pembolehubah ini ke fail `.env` anda:

| Pembolehubah | Lokasi untuk mencarinya |
|--------------|-------------------------|
| `MINIMAX_API_KEY` | [Platform MiniMax](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Gunakan `https://api.minimax.io/v1` (nilai lalai) |
| `MINIMAX_MODEL_ID` | Nama model untuk digunakan (contoh: `MiniMax-M2.7`) |

**Model yang tersedia**: `MiniMax-M2.7` (disyorkan), `MiniMax-M2.7-highspeed` (tindak balas lebih cepat)

Contoh kod yang menggunakan `OpenAIChatClient` (contohnya, pelajaran 14 aliran kerja tempahan hotel) akan mengesan dan menggunakan konfigurasi MiniMax anda secara automatik apabila `MINIMAX_API_KEY` disetkan.

## Penyediaan Tambahan untuk Pelajaran 8 (Aliran Kerja Bing Grounding)

Notebook aliran kerja bersyarat dalam pelajaran 8 menggunakan **Bing grounding** melalui Azure AI Foundry. Jika anda merancang untuk menjalankan contoh itu, tambah pembolehubah ini ke fail `.env` anda:

| Pembolehubah | Lokasi untuk mencarinya |
|--------------|-------------------------|
| `BING_CONNECTION_ID` | Portal Azure AI Foundry → projek anda → **Management** → **Connected resources** → sambungan Bing anda → salin ID sambungan |

## Penyelesaian Masalah

### Ralat Pengesahan Sijil SSL pada macOS

Jika anda menggunakan macOS dan mengalami ralat seperti:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Ini adalah isu diketahui dengan Python pada macOS di mana sijil SSL sistem tidak dipercayai secara automatik. Cuba penyelesaian berikut mengikut susunan:

**Pilihan 1: Jalankan skrip Pasang Sijil Python (disyorkan)**

```bash
# Gantikan 3.XX dengan versi Python yang anda pasang (contoh, 3.12 atau 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Pilihan 2: Gunakan `connection_verify=False` dalam notebook anda (hanya untuk notebook Model GitHub)**

Dalam notebook Pelajaran 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), pembaikan dinyahaktifkan sudah disertakan. Nyahkomen `connection_verify=False` semasa membuat client:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Lumpuhkan pengesahan SSL jika anda menghadapi ralat sijil
)
```

> **⚠️ Amaran:** Melumpuhkan pengesahan SSL (`connection_verify=False`) mengurangkan keselamatan dengan melangkau pengesahan sijil. Gunakan ini hanya sebagai penyelesaian sementara dalam persekitaran pembangunan, jangan guna dalam produksi.

**Pilihan 3: Pasang dan gunakan `truststore`**

```bash
pip install truststore
```

Kemudian tambah yang berikut di atas notebook atau skrip anda sebelum membuat sebarang panggilan rangkaian:

```python
import truststore
truststore.inject_into_ssl()
```

## Tersekat Di Mana-Mana?

Jika anda menghadapi sebarang masalah menjalankan penyediaan ini, sertai kami di <a href="https://discord.gg/kzRShWzttr" target="_blank">Discord Komuniti Azure AI</a> atau <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">buat isu</a>.

## Pelajaran Seterusnya

Anda kini bersedia untuk menjalankan kod bagi kursus ini. Selamat belajar lebih lanjut tentang dunia Ejen AI!

[Pengenalan kepada Ejen AI dan Kes Penggunaan Ejen](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil perhatian bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan manusia profesional adalah disyorkan. Kami tidak bertanggungjawab ke atas sebarang salah faham atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->