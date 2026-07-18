# Pagsasaayos ng Kurso

## Panimula

Tatalakayin sa araling ito kung paano patakbuhin ang mga halimbawa ng code ng kursong ito.

## Sumali sa Ibang mga Nag-aaral at Humingi ng Tulong

Bago ka magsimulang kopyahin ang iyong repo, sumali sa [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) upang humingi ng tulong sa pagsasaayos, anumang mga tanong tungkol sa kurso, o para makipag-ugnayan sa ibang mga nag-aaral.

## I-klone o I-fork ang Repo na ito

Upang magsimula, pakikopyahin o i-fork ang GitHub Repository. Gagawa ito ng sarili mong bersyon ng materyal ng kurso upang maaari mong patakbuhin, subukan, at ayusin ang code!

Maaari itong gawin sa pamamagitan ng pag-click sa link para sa <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">pag-fork ng repo</a>

Dapat ay mayroon ka nang sarili mong forked na bersyon ng kursong ito sa sumusunod na link:

![Forked Repo](../../../translated_images/tl/forked-repo.33f27ca1901baa6a.webp)

### Shallow Clone (inirerekomenda para sa workshop / Codespaces)

  >Ang buong repositoryo ay maaaring maging malaki (~3 GB) kapag dina-download mo ang buong kasaysayan at lahat ng mga file. Kung dadalo ka lang sa workshop o kailangan mo lang ng ilang mga folder ng aralin, ang shallow clone (o sparse clone) ay iniiwasan ang karamihan sa pag-download na iyon sa pamamagitan ng pagputol sa kasaysayan at/o pag-skip ng mga blobs.

#### Mabilis na shallow clone — minimal na kasaysayan, lahat ng mga file

Palitan ang `<your-username>` sa mga utos sa ibaba ng iyong fork URL (o ang upstream URL kung mas gusto mo).

Upang kopyahin lamang ang pinakabagong kasaysayan ng commit (maliit na download):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Upang kopyahin ang isang partikular na sangay:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Partial (sparse) clone — minimal na blobs + tanging mga napiling folder lamang

Gumagamit ito ng partial clone at sparse-checkout (nangangailangan ng Git 2.25+ at inirerekomenda na modernong Git na may suporta sa partial clone):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Pumasok sa folder ng repo:

```bash|powershell
cd ai-agents-for-beginners
```

Pagkatapos tukuyin ang mga folder na gusto mo (ipinapakita ng halimbawa sa ibaba ang dalawang folder):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Pagkatapos ng pag-clone at pagkumpirma sa mga file, kung kailangan mo lang ang mga file at nais mong magpalaya ng espasyo (walang kasaysayan ng git), pakibatain ang metadata ng repositoryo (💀hindi mababawi — mawawala sa iyo ang lahat ng functionality ng Git: walang commits, pulls, pushes, o access sa kasaysayan).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Paggamit ng GitHub Codespaces (inirerekomenda upang maiwasan ang malalaking lokal na pag-download)

- Gumawa ng bagong Codespace para sa repo na ito sa pamamagitan ng [GitHub UI](https://github.com/codespaces).  

- Sa terminal ng bagong likhang codespace, patakbuhin ang isa sa mga shallow/sparse clone na utos sa itaas upang dalhin lamang ang mga folder ng aralin na kailangan mo sa Codespace workspace.
- Opsyonal: pagkatapos mag-clone sa loob ng Codespaces, alisin ang .git upang makabawi ng dagdag na espasyo (tingnan ang mga utos sa pagtatanggal sa itaas).
- Tandaan: Kung mas gusto mong buksan ang repo nang direkta sa Codespaces (nang walang dagdag na clone), tandaan na ang Codespaces ay bubuo ng devcontainer environment at maaaring maglaan pa rin ng higit sa kailangan mo. Ang pag-clone ng shallow copy sa loob ng bagong Codespace ay nagbibigay sa iyo ng higit na kontrol sa paggamit ng disk.

#### Mga Tip

- Palaging palitan ang clone URL ng iyong fork kung nais mong mag-edit/mag-commit.
- Kung kailangan mo ng mas maraming kasaysayan o mga file sa hinaharap, maaari mo silang i-fetch o i-adjust ang sparse-checkout upang isama ang mga karagdagang folder.

## Pagpapatakbo ng Code

Nag-aalok ang kursong ito ng serye ng mga Jupyter Notebooks na maaari mong patakbuhin upang magkaroon ng hands-on na karanasan sa paggawa ng AI Agents.

Ginagamit ng mga halimbawa ng code ang **Microsoft Agent Framework (MAF)** kasama ang `FoundryChatClient`, na kumokonekta sa **Microsoft Foundry Agent Service V2** (ang Responses API) sa pamamagitan ng **Microsoft Foundry**.

Lahat ng Python notebooks ay may label na `*-python-agent-framework.ipynb`.

## Mga Kinakailangan

- Python 3.12+
  - **TANDAAN**: Kung wala ka pang naka-install na Python3.12, tiyaking i-install ito. Pagkatapos, gumawa ng iyong venv gamit ang python3.12 upang matiyak na ang tamang mga bersyon ay mai-install mula sa requirements.txt file.
  
    >Halimbawa

    Gumawa ng Python venv directory:

    ```bash|powershell
    python -m venv venv
    ```

    Pagkatapos i-activate ang venv environment para sa:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Para sa mga sample codes gamit ang .NET, tiyaking naka-install ang [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) o mas bago. Tapos, suriin ang iyong naka-install na .NET SDK version:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Kinakailangan para sa authentication. I-install mula sa [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure Subscription** — Para sa akses sa Microsoft Foundry at Microsoft Foundry Agent Service.
- **Microsoft Foundry Project** — Isang proyekto na may naka-deploy na modelo (hal. `gpt-4.1-mini`). Tingnan ang [Step 1](#hakbang-1-gumawa-ng-microsoft-foundry-project) sa ibaba.

Naka-include kami ng isang `requirements.txt` file sa root ng repositoryong ito na naglalaman ng lahat ng kinakailangang Python packages para patakbuhin ang mga halimbawa ng code.

Maaari mo itong i-install sa pagpapatakbo ng sumusunod na utos sa terminal sa root ng repositoryo:

```bash|powershell
pip install -r requirements.txt
```

Inirerekomenda naming gumawa ng Python virtual environment upang maiwasan ang anumang salungatan at mga isyu.

## Pagsasaayos ng VSCode

Tiyaking ginagamit mo ang tamang bersyon ng Python sa VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Pagsasaayos ng Microsoft Foundry at Microsoft Foundry Agent Service

### Hakbang 1: Gumawa ng Microsoft Foundry Project

Kailangan mo ng Microsoft Foundry **hub** at **project** na may naka-deploy na modelo upang patakbuhin ang mga notebooks.

1. Pumunta sa [ai.azure.com](https://ai.azure.com) at mag-sign in gamit ang iyong Azure account.
2. Gumawa ng **hub** (o gamitin ang umiiral na). Tingnan: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Sa loob ng hub, gumawa ng **project**.
4. I-deploy ang isang modelo (hal., `gpt-4.1-mini`) mula sa **Models + Endpoints** → **Deploy model**.

### Hakbang 2: Kuhanin ang Iyong Project Endpoint at Model Deployment Name

Mula sa iyong proyekto sa Microsoft Foundry portal:

- **Project Endpoint** — Pumunta sa **Overview** page at kopyahin ang endpoint URL.

![Project Connection String](../../../translated_images/tl/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — Pumunta sa **Models + Endpoints**, piliin ang naka-deploy mong modelo, at tandaan ang **Deployment name** (hal., `gpt-4.1-mini`).

### Hakbang 3: Mag-sign in sa Azure gamit ang `az login`

Lahat ng notebooks ay gumagamit ng **`AzureCliCredential`** para sa authentication — walang kailangang pangasiwaan na API keys. Nangangailangan ito na naka-sign in ka sa pamamagitan ng Azure CLI.

1. **I-install ang Azure CLI** kung hindi mo pa ito nagagawa: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Mag-sign in** sa pagpapatakbo ng:

    ```bash|powershell
    az login
    ```

    O kung nasa remote/Codespace environment ka na walang browser:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Piliin ang iyong subscription** kung hihingin — piliin ang naglalaman ng iyong Foundry project.

4. **Kumpirmahin** na naka-sign in ka:

    ```bash|powershell
    az account show
    ```

> **Bakit `az login`?** Ang mga notebooks ay nagpapatunay gamit ang `AzureCliCredential` mula sa `azure-identity` package. Nangangahulugan ito na ang session mo sa Azure CLI ang nagbibigay ng mga kredensyal — walang API keys o lihim sa iyong `.env` file. Isa itong [pinakamahusay na kasanayan sa seguridad](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Hakbang 4: Gumawa ng Iyong `.env` File

Kopyahin ang halimbawa ng file:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Buksan ang `.env` at punan ang dalawang halagang ito:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Variable | Saan ito mahahanap |
|----------|--------------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portal → iyong proyekto → **Overview** page |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portal → **Models + Endpoints** → pangalan ng iyong deployed model |

Iyon na para sa karamihan ng mga aralin! Ang mga notebooks ay awtomatikong magpapatunay sa pamamagitan ng iyong `az login` session.

### Hakbang 5: I-install ang mga Python Dependencies

```bash|powershell
pip install -r requirements.txt
```

Inirerekomenda naming patakbuhin ito sa loob ng virtual environment na ginawa mo dati.

## Karagdagang Pagsasaayos para sa Lesson 5 (Agentic RAG)

Ginagamit ng Lesson 5 ang **Azure AI Search** para sa retrieval-augmented generation. Kung balak mong patakbuhin ang araling iyon, idagdag ang mga variable na ito sa iyong `.env` file:

| Variable | Saan ito mahahanap |
|----------|--------------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portal → iyong **Azure AI Search** resource → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portal → iyong **Azure AI Search** resource → **Settings** → **Keys** → pangunahing admin key |

## Karagdagang Pagsasaayos para sa mga Aralin na Direktang Tumatawag sa Azure OpenAI (Mga Aralin 6 at 8)

Ang ilang notebooks sa mga aralin 6 at 8 ay direktang tumatawag sa **Azure OpenAI** (gamit ang **Responses API**) sa halip na dumaan sa isang Microsoft Foundry project. Ginamit ng mga sample na ito dati ang GitHub Models, na deprecated na (magwawakas sa Hulyo 2026) at hindi sumusuporta sa Responses API. Kung balak mong patakbuhin ang mga sample na iyon, idagdag ang mga variable na ito sa iyong `.env` file:

| Variable | Saan ito mahahanap |
|----------|--------------------|
| `AZURE_OPENAI_ENDPOINT` | Azure portal → iyong **Azure OpenAI** resource → **Keys and Endpoint** → Endpoint (hal. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Pangalan ng iyong naka-deploy na modelo (hal. `gpt-4.1-mini`) na sumusuporta sa Responses API |
| `AZURE_OPENAI_API_KEY` | Opsyonal — kung gumagamit ka ng key-based na authentication sa halip ng `az login` / Entra ID |

> Ginagamit ng Responses API ang matatag na `/openai/v1/` endpoint, kaya hindi na kailangan ang `api-version`. Mag-sign in gamit ang `az login` upang gamitin ang keyless Entra ID authentication.

## Alternatibong Provider: MiniMax (OpenAI-Compatible)

Nagbibigay ang [MiniMax](https://platform.minimaxi.com/) ng malalaking context na mga modelo (hanggang 204K tokens) sa pamamagitan ng OpenAI-compatible na API. Dahil ang `OpenAIChatClient` ng Microsoft Agent Framework ay gumagana sa anumang OpenAI-compatible na endpoint, maaari mong gamitin ang MiniMax bilang alternatibong kapalit ng Azure OpenAI o OpenAI.

Idagdag ang mga variable na ito sa iyong `.env` file:

| Variable | Saan ito mahahanap |
|----------|--------------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Gamitin ang `https://api.minimax.io/v1` (default na halaga) |
| `MINIMAX_MODEL_ID` | Pangalan ng modelong gagamitin (hal., `MiniMax-M3`) |

**Mga halimbawa ng modelo**: `MiniMax-M3` (inirerekomenda), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (mas mabilis ang mga tugon). Ang mga pangalan ng modelo at pagkakaroon ay maaaring magbago sa paglipas ng panahon, at ang akses sa isang partikular na modelo ay maaaring depende sa iyong account o rehiyon — tingnan ang [MiniMax Platform](https://platform.minimaxi.com/) para sa kasalukuyang listahan. Kung hindi available ang `MiniMax-M3` sa iyong account, itakda ang `MINIMAX_MODEL_ID` sa isang modelong may akses ka (hal., `MiniMax-M2.7`).

Ang mga halimbawa ng code na gumagamit ng `OpenAIChatClient` (hal., workflow ng pagpapareserba ng hotel sa Lesson 14) ay awtomatikong madedetect at gagamitin ang iyong MiniMax configuration kapag naka-set ang `MINIMAX_API_KEY`.

## Alternatibong Provider: Foundry Local (Patakbuhin ang mga Modelo sa Iyong Device)

Ang [Foundry Local](https://foundrylocal.ai) ay isang magaan na runtime na nagda-download, namamahala, at nagseserbisyo ng mga language models **sa iyong sariling makina** sa pamamagitan ng OpenAI-compatible na API — walang cloud, walang Azure subscription, at walang API keys. Ito ay magandang opsyon para sa offline development, eksperimento nang walang gastos sa cloud, o pagpapanatili ng data sa device.

Dahil gumagana ang `OpenAIChatClient` ng Microsoft Agent Framework sa anumang OpenAI-compatible na endpoint, ang Foundry Local ay isang madaling ilapat na lokal na alternatibo sa Azure OpenAI.

**1. I-install ang Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. I-download at patakbuhin ang isang modelo** (nagsisimula din ito ng lokal na serbisyo):

```bash
foundry model list          # tingnan ang mga available na modelo
foundry model run phi-4-mini
```

**3. I-install ang Python SDK** na ginagamit upang ma-diskubre ang lokal na endpoint:

```bash
pip install foundry-local-sdk
```

**4. Ituro ang Microsoft Agent Framework sa iyong lokal na modelo:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Ina-download (kung kailangan) at pinaglilingkuran ang modelo nang lokal, pagkatapos hinahanap ang endpoint/port.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # hal. http://localhost:<port>/v1
    api_key=manager.api_key,        # palaging "not-required" para sa Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Tandaan:** Nagbibigay ang Foundry Local ng OpenAI-compatible na **Chat Completions** endpoint. Gamitin ito para sa lokal na development at offline na mga senaryo. Para sa buong **Responses API** na set ng mga tampok (stateful conversations, malalim na orchestration ng tools, at agent-style development), targetin ang **Azure OpenAI** o isang **Microsoft Foundry** project gaya ng ipinakita sa mga aralin. Tingnan ang [Foundry Local documentation](https://foundrylocal.ai) para sa kasalukuyang katalogo ng modelo at suporta sa platform.


## Karagdagang Pag-setup para sa Aralin 8 (Bing Grounding Workflow)

Ang conditional workflow notebook sa aralin 8 ay gumagamit ng **Bing grounding** sa pamamagitan ng Microsoft Foundry. Kung plano mong patakbuhin ang sample na iyon, idagdag ang variable na ito sa iyong `.env` file:

| Variable | Saan ito mahahanap |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry portal → iyong proyekto → **Management** → **Connected resources** → ang iyong Bing connection → kopyahin ang connection ID |

## Pag-aayos ng Problema

### Mga Error sa SSL Certificate Verification sa macOS

Kung ikaw ay nasa macOS at nakatagpo ng error tulad ng:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Ito ay isang kilalang isyu sa Python sa macOS kung saan hindi awtomatikong pinagkakatiwalaan ang mga system SSL certificate. Subukan ang mga sumusunod na solusyon sa pagkakasunod:

**Opsyon 1: Patakbuhin ang Install Certificates script ng Python (inirerekomenda)**

```bash
# Palitan ang 3.XX ng iyong naka-install na bersyon ng Python (halimbawa, 3.12 o 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Opsyon 2: Gamitin ang `connection_verify=False` sa iyong notebook (para lamang sa GitHub Models notebooks)**

Sa Lesson 6 notebook (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), may kasama nang naka-komento na workaround. I-unjunk ang `connection_verify=False` kapag nilikha ang client:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # I-disable ang SSL verification kung makaranas ka ng mga error sa sertipiko
)
```

> **⚠️ Babala:** Ang pag-disable ng SSL verification (`connection_verify=False`) ay nagpapababa ng seguridad sa pamamagitan ng pag-iwas sa pagpapatunay ng certificate. Gamitin ito bilang pansamantalang solusyon lamang sa mga development na kapaligiran, huwag sa produksyon.

**Opsyon 3: I-install at gamitin ang `truststore`**

```bash
pip install truststore
```

Pagkatapos idagdag ang sumusunod sa itaas ng iyong notebook o script bago gumawa ng anumang tawag sa network:

```python
import truststore
truststore.inject_into_ssl()
```

## Naharang Ka Ba sa Isang Puwesto?

Kung mayroon kang anumang problema sa pagpapatakbo ng setup na ito, sumali sa aming <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> o <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">gumawa ng isyu</a>.

## Susunod na Aralin

Handang-handa ka na ngayong patakbuhin ang code para sa kursong ito. Masayang pag-aaral tungkol sa mundo ng AI Agents!

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->