# Setup ng Kurso

## Panimula

Tatalakayin sa araling ito kung paano patakbuhin ang mga code sample ng kursong ito.

## Sumali sa Ibang mga Nag-aaral at Humingi ng Tulong

Bago ka magsimulang mag-clone ng iyong repo, sumali sa [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) upang humingi ng anumang tulong sa setup, mga tanong tungkol sa kurso, o upang makipag-ugnayan sa ibang mga nag-aaral.

## I-clone o I-fork ang Repo na ito

Upang magsimula, pakiclon o i-fork ang GitHub Repository. Ito ay gagawa ng sarili mong bersyon ng materyal ng kurso upang mapatakbo, matest, at mai-ayos ang code!

Magagawa ito sa pamamagitan ng pag-click ng link para <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">i-fork ang repo</a>.

Dapat ay mayroon ka nang sarili mong naka-fork na bersyon ng kursong ito sa sumusunod na link:

![Forked Repo](../../../translated_images/tl/forked-repo.33f27ca1901baa6a.webp)

### Shallow Clone (inirerekomenda para sa workshop / Codespaces)

  >Ang buong repositoryo ay maaaring malaki (~3 GB) kapag dinownload mo ang buong history at lahat ng files. Kung ang dadaluhan mo lang ay workshop o kailangan mo lang ng ilang mga lesson folder, ang shallow clone (o sparse clone) ay iniiwasan ang karamihan ng download sa pamamagitan ng pagputol ng history at/o pag-skip ng blobs.

#### Mabilis na shallow clone — minimal na history, lahat ng file

Palitan ang `<your-username>` sa mga sumusunod na commands gamit ang iyong fork URL (o ang upstream URL kung mas gusto mo).

Para i-clone lamang ang pinakabagong commit history (maliit na download):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Para mag-clone ng specific na branch:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Partial (sparse) clone — minimal na blobs + mga piniling folder lamang

Ginagamit nito ang partial clone at sparse-checkout (kailangan ang Git 2.25+ at inirerekomenda ang modernong Git na may partial clone support):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Pumasok sa folder ng repo:

```bash|powershell
cd ai-agents-for-beginners
```

Pagkatapos ay tukuyin kung alin sa mga folder ang gusto mo (ang halimbawa sa ibaba ay nagpapakita ng dalawang folder):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Pagkatapos ng pag-clone at pag-verify ng mga file, kung kailangan mo lang ang mga file at gusto mong magbakante ng espasyo (walang git history), pakitatanggal ang metadata ng repositoryo (💀hindi na mababawi — mawawala lahat ng Git functionality: walang commits, pulls, pushes, o access sa history).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Paggamit ng GitHub Codespaces (inirerekomenda upang maiwasan ang malalaking lokal na download)

- Gumawa ng bagong Codespace para sa repo na ito sa pamamagitan ng [GitHub UI](https://github.com/codespaces).  

- Sa terminal ng bagong ginawa na codespace, patakbuhin ang isa sa mga shallow/sparse clone commands sa itaas para dalhin lamang ang mga lesson folder na kailangan mo papunta sa Codespace workspace.
- Opsyonal: pagkatapos ng pag-clone sa loob ng Codespaces, tanggalin ang .git para makabawi ng dagdag na espasyo (tingnan ang mga removal command sa itaas).
- Tandaan: Kung gusto mong buksan ang repo nang direkta sa Codespaces (na walang karagdagang clone), tandaan na bubuuin ng Codespaces ang devcontainer environment at maaaring mag-provision pa rin ng higit pa sa kailangan mo. Ang pag-clone ng shallow copy sa loob ng bagong Codespace ay nagbibigay sa iyo ng higit na kontrol sa paggamit ng disk.

#### Mga Tip

- Palaging palitan ang clone URL ng iyong fork kung gusto mong mag-edit/commit.
- Kung kailangan mo ng higit pang history o files sa ibang pagkakataon, maaari mo itong i-fetch o ayusin ang sparse-checkout upang isama pa ang ibang mga folder.

## Pagpapatakbo ng Code

Nag-aalok ang kursong ito ng serye ng mga Jupyter Notebooks na maaari mong patakbuhin upang magkaroon ng hands-on na karanasan sa paggawa ng AI Agents.

Ginagamit ng mga code sample ang **Microsoft Agent Framework (MAF)** kasama ang `AzureAIProjectAgentProvider`, na kumokonekta sa **Azure AI Agent Service V2** (Responses API) sa pamamagitan ng **Microsoft Foundry**.

Lahat ng mga Python notebook ay may label na `*-python-agent-framework.ipynb`.

## Mga Kinakailangan

- Python 3.12+
  - **TANDAAN**: Kung wala pa kayong naka-install na Python3.12, siguraduhing i-install ito. Pagkatapos ay gumawa ng iyong venv gamit ang python3.12 upang masigurong ang tamang mga bersyon ang mai-install mula sa requirements.txt na file.
  
    >Halimbawa

    Gumawa ng Python venv directory:

    ```bash|powershell
    python -m venv venv
    ```

    Pagkatapos ay i-activate ang venv environment para sa:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Para sa mga sample code na gumagamit ng .NET, siguraduhing naka-install ang [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) o mas bago. Pagkatapos, tingnan ang bersyon ng naka-install na .NET SDK:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Kinakailangan para sa authentication. I-install mula sa [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure Subscription** — Para sa access sa Microsoft Foundry at Azure AI Agent Service.
- **Microsoft Foundry Project** — Isang proyekto na may deployed na modelo (halimbawa, `gpt-4o`). Tingnan ang [Hakbang 1](#hakbang-1-gumawa-ng-microsoft-foundry-project) sa ibaba.

Kasama dito ang `requirements.txt` file sa root ng repositoryong ito na naglalaman ng lahat ng kailangang Python packages upang patakbuhin ang mga code sample.

Maaari mo itong i-install sa pamamagitan ng pagpapatakbo ng sumusunod na command sa iyong terminal sa root ng repositoryo:

```bash|powershell
pip install -r requirements.txt
```

Inirerekomenda naming gumawa ng Python virtual environment upang maiwasan ang anumang conflict at problema.

## Setup ng VSCode

Siguraduhing ginagamit mo ang tamang bersyon ng Python sa VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## I-Set Up ang Microsoft Foundry at Azure AI Agent Service

### Hakbang 1: Gumawa ng Microsoft Foundry Project

Kailangan mo ng Azure AI Foundry **hub** at **project** na may naka-deploy na modelo upang patakbuhin ang mga notebook.

1. Pumunta sa [ai.azure.com](https://ai.azure.com) at mag-sign in gamit ang iyong Azure account.
2. Gumawa ng **hub** (o gumamit ng existing). Tingnan: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Sa loob ng hub, gumawa ng **project**.
4. I-deploy ang isang modelo (halimbawa, `gpt-4o`) mula sa **Models + Endpoints** → **Deploy model**.

### Hakbang 2: Kunin ang Iyong Project Endpoint at Model Deployment Name

Mula sa iyong proyekto sa Microsoft Foundry portal:

- **Project Endpoint** — Pumunta sa **Overview** na pahina at kopyahin ang endpoint URL.

![Project Connection String](../../../translated_images/tl/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — Pumunta sa **Models + Endpoints**, piliin ang iyong naka-deploy na modelo, at tandaan ang **Deployment name** (halimbawa, `gpt-4o`).

### Hakbang 3: Mag-sign in sa Azure gamit ang `az login`

Lahat ng mga notebook ay gumagamit ng **`AzureCliCredential`** para sa authentication — walang kailangang pamahalaing API keys. Nangangailangan ito na ikaw ay naka-sign in sa pamamagitan ng Azure CLI.

1. **I-install ang Azure CLI** kung wala pa: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Mag-sign in** sa pamamagitan ng pagpapatakbo ng:

    ```bash|powershell
    az login
    ```

    O kung ikaw ay nasa remote/Codespace environment na walang browser:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Piliin ang iyong subscription** kung ito ay hinihingi — piliin ang may Foundry project mo.

4. **Siguraduhing naka-sign in**:

    ```bash|powershell
    az account show
    ```

> **Bakit `az login`?** Ang mga notebook ay nag-aauthenticate gamit ang `AzureCliCredential` mula sa `azure-identity` package. Ibig sabihin nito ay ang Azure CLI session mo ang nagbibigay ng credentials — walang API keys o secrets sa iyong `.env` file. Ito ay isang [pinakamahusay na kasanayan sa seguridad](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Hakbang 4: Gumawa ng Iyong `.env` File

Kopyahin ang example file:

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
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| Variable | Saan ito matatagpuan |
|----------|---------------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portal → iyong proyekto → **Overview** page |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portal → **Models + Endpoints** → pangalan ng iyong naka-deploy na modelo |

Iyon lang para sa karamihan ng mga leksyon! Awtomatikong mag-aauthenticate ang mga notebook sa pamamagitan ng iyong `az login` session.

### Hakbang 5: I-install ang Python Dependencies

```bash|powershell
pip install -r requirements.txt
```

Inirerekomenda naming patakbuhin ito sa loob ng virtual environment na ginawa mo kanina.

## Karagdagang Setup para sa Lesson 5 (Agentic RAG)

Gumagamit ang Lesson 5 ng **Azure AI Search** para sa retrieval-augmented generation. Kung balak mong patakbuhin ang leksyon na iyon, idagdag ang mga variable na ito sa iyong `.env` file:

| Variable | Saan ito matatagpuan |
|----------|---------------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portal → iyong **Azure AI Search** resource → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portal → iyong **Azure AI Search** resource → **Settings** → **Keys** → primary admin key |

## Karagdagang Setup para sa Lesson 6 at Lesson 8 (GitHub Models)

Ilang notebook sa mga leksyon 6 at 8 ay gumagamit ng **GitHub Models** sa halip na Azure AI Foundry. Kung balak mong patakbuhin ang mga sample na iyon, idagdag ang mga variable na ito sa iyong `.env` file:

| Variable | Saan ito matatagpuan |
|----------|---------------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | Gamitin ang `https://models.inference.ai.azure.com` (default value) |
| `GITHUB_MODEL_ID` | Pangalan ng modelo na gagamitin (hal. `gpt-4o-mini`) |

## Alternative Provider: MiniMax (Compatible sa OpenAI)

Ang [MiniMax](https://platform.minimaxi.com/) ay nagbibigay ng large-context models (hanggang 204K tokens) sa pamamagitan ng OpenAI-compatible API. Dahil ang Microsoft Agent Framework na `OpenAIChatClient` ay gumagana sa anumang OpenAI-compatible endpoint, maaari mong gamitin ang MiniMax bilang alternatibo sa GitHub Models o OpenAI.

Idagdag ang mga variable na ito sa iyong `.env` file:

| Variable | Saan ito matatagpuan |
|----------|---------------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Gamitin ang `https://api.minimax.io/v1` (default value) |
| `MINIMAX_MODEL_ID` | Pangalan ng modelo na gagamitin (hal., `MiniMax-M2.7`) |

**Available na mga modelo**: `MiniMax-M2.7` (inirerekomenda), `MiniMax-M2.7-highspeed` (mas mabilis ang tugon)

Awtomatikong madedetekta at gagamitin ng mga code sample na gumagamit ng `OpenAIChatClient` (hal., Lesson 14 hotel booking workflow) ang iyong MiniMax configuration kapag nakaset ang `MINIMAX_API_KEY`.

## Karagdagang Setup para sa Lesson 8 (Bing Grounding Workflow)

Ang conditional workflow notebook sa lesson 8 ay gumagamit ng **Bing grounding** sa pamamagitan ng Azure AI Foundry. Kung balak mong patakbuhin ang sample na iyon, idagdag ang variable na ito sa iyong `.env` file:

| Variable | Saan ito matatagpuan |
|----------|---------------------|
| `BING_CONNECTION_ID` | Azure AI Foundry portal → iyong proyekto → **Management** → **Connected resources** → iyong Bing connection → kopyahin ang connection ID |

## Pag-aayos ng Problema

### Mga Error sa SSL Certificate Verification sa macOS

Kung ikaw ay nasa macOS at nakatagpo ng error tulad ng:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Ito ay isang kilalang isyu sa Python sa macOS kung saan hindi awtomatikong pinapaniwalaan ang system SSL certificates. Subukan ang mga sumusunod na solusyon ayon sa pagkakasunod:

**Opsyon 1: Patakbuhin ang Install Certificates script ng Python (inirerekomenda)**

```bash
# Palitan ang 3.XX ng iyong naka-install na bersyon ng Python (halimbawa, 3.12 o 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Opsyon 2: Gamitin ang `connection_verify=False` sa iyong notebook (para lang sa mga GitHub Models notebooks)**

Sa Lesson 6 notebook (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), may nakacomment na workaround na kasama na. I-uncomment ang `connection_verify=False` kapag ginagawa ang client:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # I-disable ang SSL verification kung nakakakita ka ng mga error sa sertipiko
)
```

> **⚠️ Babala:** Ang pag-disable ng SSL verification (`connection_verify=False`) ay nagpapababa ng seguridad dahil nilalaktawan ang pagsuri ng mga sertipiko. Gamitin ito bilang panandaliang solusyon lamang sa mga development na kapaligiran, hindi sa production.

**Opsyon 3: I-install at gamitin ang `truststore`**

```bash
pip install truststore
```

Pagkatapos ay idagdag ito sa simula ng iyong notebook o script bago gumawa ng anumang network calls:

```python
import truststore
truststore.inject_into_ssl()
```

## Nahirapan Ka ba?

Kung may problema ka sa pagpapatakbo ng setup, pumunta sa aming <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> o <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">gumawa ng isyu</a>.

## Susunod na Aralin

Handa ka na ngayong patakbuhin ang code para sa kursong ito. Maligayang pag-aaral tungkol sa mundo ng AI Agents!

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pahayag ng Pagsasawalang-sala**:  
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga error o kamalian. Ang orihinal na dokumento sa kanyang likas na wika ang dapat ituring na pinagmulan ng katotohanan. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na lumitaw mula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->