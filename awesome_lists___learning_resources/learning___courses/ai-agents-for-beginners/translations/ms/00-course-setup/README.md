# Persediaan Kursus

## Pengenalan

Pelajaran ini akan merangkumi cara menjalankan contoh kod kursus ini.

## Sertai Pelajar Lain dan Dapatkan Bantuan

Sebelum anda mula menyalin repo anda, sertailah [saluran Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord) untuk mendapatkan sebarang bantuan dengan persediaan, sebarang soalan mengenai kursus, atau untuk berhubung dengan pelajar lain.

## Salin atau Fork Repo ini

Untuk memulakan, sila salin atau fork Repositori GitHub. Ini akan menjadikan versi anda sendiri bagi bahan kursus supaya anda boleh menjalankan, menguji, dan menyesuaikan kod!

Ini boleh dilakukan dengan mengklik pautan untuk <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fork repo</a>

Anda kini sepatutnya mempunyai versi repo fork anda sendiri untuk kursus ini di pautan berikut:

![Forked Repo](../../../translated_images/ms/forked-repo.33f27ca1901baa6a.webp)

### Clone Cetek (disyorkan untuk bengkel / Codespaces)

  >Repositori penuh boleh menjadi besar (~3 GB) apabila anda memuat turun sejarah penuh dan semua fail. Jika anda hanya menghadiri bengkel atau hanya perlu beberapa folder pelajaran, clone cetek (atau clone sparse) mengelakkan kebanyakan muat turun itu dengan memendekkan sejarah dan/atau melangkau blob.

#### Clone cetek pantas — sejarah minimum, semua fail

Gantikan `<your-username>` dalam arahan di bawah dengan URL fork anda (atau URL upstream jika anda lebih suka).

Untuk clone hanya sejarah komit terkini (muat turun kecil):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Untuk clone cawangan tertentu:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Clone separa (sparse) — blob minimum + hanya folder terpilih

Ini menggunakan clone separa dan sparse-checkout (memerlukan Git 2.25+ dan disyorkan Git moden dengan sokongan clone separa):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Masuk ke dalam folder repo:

```bash|powershell
cd ai-agents-for-beginners
```

Kemudian nyatakan folder yang anda mahukan (contoh di bawah menunjukkan dua folder):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Setelah clone dan mengesahkan fail, jika anda hanya perlukan fail dan mahu bebas ruang (tiada sejarah git), sila hapus metadata repositori (💀tidak boleh dipulihkan — anda akan kehilangan semua fungsi Git: tiada komit, tarik, tolak, atau akses sejarah).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Menggunakan GitHub Codespaces (disyorkan untuk mengelakkan muat turun besar tempatan)

- Cipta Codespace baru untuk repo ini melalui [GitHub UI](https://github.com/codespaces).  

- Dalam terminal codespace yang baru dibuat, jalankan salah satu arahan clone cetek/sparse di atas untuk membawa hanya folder pelajaran yang anda perlukan ke dalam ruang kerja Codespace.
- Pilihan: selepas clone di dalam Codespaces, keluarkan .git untuk mendapatkan kembali ruang tambahan (lihat arahan penghapusan di atas).
- Nota: Jika anda lebih suka buka repo secara langsung dalam Codespaces (tanpa clone tambahan), sedar bahawa Codespaces akan membina persekitaran devcontainer dan mungkin masih memasang lebih daripada yang anda perlukan. Clone salinan cetek dalam Codespace baru memberi anda lebih kawalan ke atas penggunaan cakera.

#### Petua

- Sentiasa gantikan URL clone dengan fork anda jika anda ingin edit/komit.
- Jika anda kemudian perlukan lebih sejarah atau fail, anda boleh fetch atau laraskan sparse-checkout untuk termasuk folder tambahan.

## Menjalankan Kod

Kursus ini menawarkan satu siri Jupyter Notebooks yang anda boleh jalankan untuk mendapatkan pengalaman praktikal membina Ejen AI.

Contoh kod menggunakan **Microsoft Agent Framework (MAF)** dengan `FoundryChatClient`, yang berhubung dengan **Microsoft Foundry Agent Service V2** (API Responses) melalui **Microsoft Foundry**.

Semua notebook Python bertanda `*-python-agent-framework.ipynb`.

## Keperluan

- Python 3.12+
  - **NOTA**: Jika anda belum memasang Python3.12, pastikan anda memasangnya. Kemudian cipta venv anda menggunakan python3.12 untuk memastikan versi yang betul dipasang dari fail requirements.txt.
  
    >Contoh

    Cipta direktori Python venv:

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

- .NET 10+: Untuk contoh kod menggunakan .NET, pastikan anda memasang [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) atau lebih baru. Kemudian, semak versi SDK .NET yang dipasang:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Diperlukan untuk pengesahan. Pasang dari [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Langganan Azure** — Untuk akses ke Microsoft Foundry dan Microsoft Foundry Agent Service.
- **Projek Microsoft Foundry** — Projek dengan model yang dikerahkan (contoh: `gpt-4.1-mini`). Lihat [Langkah 1](#langkah-1-cipta-projek-microsoft-foundry) di bawah.

Kami telah sertakan fail `requirements.txt` di akar repositori ini yang mengandungi semua pakej Python yang diperlukan untuk menjalankan contoh kod.

Anda boleh memasangnya dengan menjalankan arahan berikut di terminal anda pada akar repositori:

```bash|powershell
pip install -r requirements.txt
```

Kami mengesyorkan mencipta persekitaran virtual Python untuk mengelakkan sebarang konflik dan masalah.

## Persediaan VSCode

Pastikan anda menggunakan versi Python yang betul dalam VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Sediakan Microsoft Foundry dan Microsoft Foundry Agent Service

### Langkah 1: Cipta Projek Microsoft Foundry

Anda memerlukan **hub** dan **projek** Microsoft Foundry dengan model yang dikerahkan untuk menjalankan notebook.

1. Pergi ke [ai.azure.com](https://ai.azure.com) dan log masuk dengan akaun Azure anda.
2. Cipta **hub** (atau gunakan yang sedia ada). Lihat: [Gambaran sumber Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Dalam hub, cipta **projek**.
4. Kerahkan model (contoh: `gpt-4.1-mini`) dari **Models + Endpoints** → **Deploy model**.

### Langkah 2: Dapatkan Endpoint Projek dan Nama Kerahan Model Anda

Dari projek anda dalam portal Microsoft Foundry:

- **Endpoint Projek** — Pergi ke halaman **Overview** dan salin URL endpoint.

![Project Connection String](../../../translated_images/ms/project-endpoint.8cf04c9975bbfbf1.webp)

- **Nama Kerahan Model** — Pergi ke **Models + Endpoints**, pilih model yang dikerahkan, dan catat **Deployment name** (contoh, `gpt-4.1-mini`).

### Langkah 3: Log masuk ke Azure dengan `az login`

Semua notebook menggunakan **`AzureCliCredential`** untuk pengesahan — tiada kunci API untuk diurus. Ini memerlukan anda log masuk melalui Azure CLI.

1. **Pasang Azure CLI** jika belum ada: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Log masuk** dengan menjalankan:

    ```bash|powershell
    az login
    ```

    Atau jika anda dalam persekitaran jarak jauh/Codespace tanpa pelayar:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Pilih langganan anda** jika diminta — pilih yang mengandungi projek Foundry anda.

4. **Sahkan** anda sudah log masuk:

    ```bash|powershell
    az account show
    ```

> **Kenapa `az login`?** Notebook mengesahkan menggunakan `AzureCliCredential` daripada pakej `azure-identity`. Ini bermakna sesi Azure CLI anda menyediakan kelayakan — tiada kunci API atau rahsia dalam fail `.env` anda. Ini adalah [amalan keselamatan terbaik](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Langkah 4: Cipta Fail `.env` Anda

Salin fail contoh:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# KuasaShell
Copy-Item .env.example .env
```

Buka `.env` dan isikan dua nilai ini:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Pembolehubah | Di mana untuk cari |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Portal Foundry → projek anda → halaman **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Portal Foundry → **Models + Endpoints** → nama model yang dikerahkan |

Itu sahaja untuk kebanyakan pelajaran! Notebook akan mengesahkan secara automatik melalui sesi `az login` anda.

### Langkah 5: Pasang Kebergantungan Python

```bash|powershell
pip install -r requirements.txt
```

Kami mengesyorkan menjalankan ini dalam persekitaran virtual yang anda cipta tadi.

## Persediaan Tambahan untuk Pelajaran 5 (Agentic RAG)

Pelajaran 5 menggunakan **Azure AI Search** untuk penjanaan yang dipertingkatkan dengan pengambilan. Jika anda merancang menjalankan pelajaran itu, tambah pembolehubah ini ke dalam fail `.env` anda:

| Pembolehubah | Di mana untuk cari |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Portal Azure → sumber **Azure AI Search** anda → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Portal Azure → sumber **Azure AI Search** anda → **Settings** → **Keys** → kunci pentadbir utama |

## Persediaan Tambahan untuk Pelajaran yang Panggil Azure OpenAI Secara Langsung (Pelajaran 6 dan 8)

Sesetengah notebook dalam pelajaran 6 dan 8 memanggil **Azure OpenAI** secara langsung (menggunakan **Responses API**) dan bukannya melalui projek Microsoft Foundry. Contoh ini sebelum ini menggunakan GitHub Models, yang sudah usang (akan ditamatkan pada Julai 2026) dan tidak menyokong Responses API. Jika anda merancang menjalankan contoh itu, tambah pembolehubah ini ke dalam fail `.env` anda:

| Pembolehubah | Di mana untuk cari |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Portal Azure → sumber **Azure OpenAI** anda → **Keys and Endpoint** → Endpoint (contoh `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Nama model yang dikerahkan (contoh `gpt-4.1-mini`) yang menyokong Responses API |
| `AZURE_OPENAI_API_KEY` | Pilihan — hanya jika anda gunakan pengesahan berasaskan kunci dan bukannya `az login` / Entra ID |

> Responses API menggunakan endpoint stabil `/openai/v1/`, jadi tiada `api-version` diperlukan. Log masuk dengan `az login` untuk menggunakan pengesahan Entra ID tanpa kunci.

## Penyedia Alternatif: MiniMax (Serasi OpenAI)

[MiniMax](https://platform.minimaxi.com/) menyediakan model konteks besar (sehingga 204K token) melalui API serasi OpenAI. Oleh kerana Microsoft Agent Framework `OpenAIChatClient` berfungsi dengan mana-mana endpoint serasi OpenAI, anda boleh menggunakan MiniMax sebagai alternatif terus-guna kepada Azure OpenAI atau OpenAI.

Tambah pembolehubah ini ke dalam fail `.env` anda:

| Pembolehubah | Di mana untuk cari |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Gunakan `https://api.minimax.io/v1` (nilai lalai) |
| `MINIMAX_MODEL_ID` | Nama model untuk digunakan (contoh, `MiniMax-M3`) |

**Model contoh**: `MiniMax-M3` (disyorkan), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (respon lebih pantas). Nama model dan ketersediaan mungkin berubah dari masa ke masa, dan akses ke model yang diberikan mungkin bergantung pada akaun atau kawasan anda — periksa [MiniMax Platform](https://platform.minimaxi.com/) untuk senarai terkini. Jika `MiniMax-M3` tidak tersedia pada akaun anda, tetapkan `MINIMAX_MODEL_ID` kepada model yang anda ada akses (contoh `MiniMax-M2.7`).

Contoh kod yang menggunakan `OpenAIChatClient` (contohnya, aliran kerja tempahan hotel Pelajaran 14) akan mengesan dan menggunakan konfigurasi MiniMax anda secara automatik apabila `MINIMAX_API_KEY` diset.

## Penyedia Alternatif: Foundry Local (Jalankan Model Di Peranti)

[Foundry Local](https://foundrylocal.ai) adalah runtime ringan yang memuat turun, mengurus, dan menyajikan model bahasa **sepenuhnya di mesin anda sendiri** melalui API serasi OpenAI — tiada awan, tiada langganan Azure, dan tiada kunci API. Ia pilihan hebat untuk pembangunan luar talian, bereksperimen tanpa kos awan, atau mengekalkan data di peranti.

Oleh kerana Microsoft Agent Framework `OpenAIChatClient` berfungsi dengan mana-mana endpoint serasi OpenAI, Foundry Local adalah alternatif tempatan gantian kepada Azure OpenAI.

**1. Pasang Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Muat turun dan jalankan model** (ini juga memulakan perkhidmatan tempatan):

```bash
foundry model list          # lihat model yang tersedia
foundry model run phi-4-mini
```

**3. Pasang SDK Python** yang digunakan untuk mengenal pasti endpoint tempatan:

```bash
pip install foundry-local-sdk
```

**4. Arahkan Microsoft Agent Framework ke model tempatan anda:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Memuat turun (jika perlu) dan menghidangkan model secara tempatan, kemudian mengesan titik akhir/port.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # contohnya http://localhost:<port>/v1
    api_key=manager.api_key,        # sentiasa "tidak-diperlukan" untuk Foundry Tempatan
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Nota:** Foundry Local mendedahkan endpoint **Chat Completions** serasi OpenAI. Gunakannya untuk pembangunan tempatan dan senario luar talian. Untuk set ciri penuh **Responses API** (perbualan berstatus, orkestrasi alat mendalam, dan pembangunan gaya agen), sasarkan **Azure OpenAI** atau projek **Microsoft Foundry** seperti yang ditunjukkan dalam pelajaran. Lihat [dokumentasi Foundry Local](https://foundrylocal.ai) untuk katalog model semasa dan sokongan platform.


## Persediaan Tambahan untuk Pelajaran 8 (Aliran Kerja Bing Grounding)

Nota aliran kerja bersyarat dalam pelajaran 8 menggunakan **Bing grounding** melalui Microsoft Foundry. Jika anda merancang untuk menjalankan contoh itu, tambah pembolehubah ini ke fail `.env` anda:

| Pembolehubah | Di mana untuk mendapatkannya |
|-------------|----------------------------|
| `BING_CONNECTION_ID` | Portal Microsoft Foundry → projek anda → **Management** → **Connected resources** → sambungan Bing anda → salin ID sambungan |

## Menyelesaikan Masalah

### Ralat Pengesahan Sijil SSL di macOS

Jika anda menggunakan macOS dan menghadapi ralat seperti:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Ini adalah isu yang diketahui dengan Python di macOS di mana sijil SSL sistem tidak dipercayai secara automatik. Cuba penyelesaian berikut mengikut turutan:

**Pilihan 1: Jalankan skrip Pasang Sijil Python (disyorkan)**

```bash
# Gantikan 3.XX dengan versi Python yang telah anda pasang (contohnya, 3.12 atau 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Pilihan 2: Gunakan `connection_verify=False` dalam nota anda (untuk nota GitHub Models sahaja)**

Dalam nota Pelajaran 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), penyelesaian sementara yang dikomen sudah termasuk. Nyahkomen `connection_verify=False` apabila mencipta klien:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Nyahaktifkan pengesahan SSL jika anda menghadapi ralat sijil
)
```

> **⚠️ Amaran:** Melumpuhkan pengesahan SSL (`connection_verify=False`) mengurangkan keselamatan dengan melangkau pengesahan sijil. Gunakan ini hanya sebagai penyelesaian sementara dalam persekitaran pembangunan, jangan sekali-kali di produksi.

**Pilihan 3: Pasang dan gunakan `truststore`**

```bash
pip install truststore
```

Kemudian tambahkan yang berikut di bahagian atas nota atau skrip anda sebelum membuat sebarang panggilan rangkaian:

```python
import truststore
truststore.inject_into_ssl()
```

## Tersekat Di Mana-Mana?

Jika anda menghadapi sebarang isu menjalankan persediaan ini, sertai <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> kami atau <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">cipta isu</a>.

## Pelajaran Seterusnya

Anda kini bersedia untuk menjalankan kod untuk kursus ini. Selamat belajar lebih lanjut tentang dunia Ejen AI! 

[Pengenalan kepada Ejen AI dan Kes Penggunaan Ejen](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->