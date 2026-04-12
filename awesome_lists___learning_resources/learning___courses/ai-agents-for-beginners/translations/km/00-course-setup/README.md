# ការកំណត់វគ្គសិក្សា

## ការណែនាំ

មេរៀននេះនឹងគ្របដណ្តប់ពីរបៀបដំណើរការឧទាហរណ៍កូដនៃវគ្គសិក្សានេះ។

## ចូលរួមជាមួយអ្នករៀនផ្សេង និងទទួលបានជំនួយ

មុននឹងចាប់ផ្តើមក្លូន repo របស់អ្នក សូមចូលរួមក្នុង [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) ដើម្បីទទួលបានជំនួយក្នុងការកំណត់ ការ​សំណួរអំពីវគ្គសិក្សា ឬដើម្បីទាក់ទងជាមួយអ្នករៀនផ្សេងទៀត។

## ផ្ទុះ ឬ Fork repo​នេះ

ដើម្បីចាប់ផ្តើម សូមចម្លង (clone) ឬ fork GitHub Repository។ វានឹងបង្កើតក្លូនផ្ទាល់ខ្លួនរបស់អ្នកពីសម្ភារៈវគ្គសិក្សា ដូច្នេះអ្នកអាចរត់ សាកល្បង និងកែប្រែកូដបាន!

នេះអាចធ្វើបានដោយចុចលើតំណភ្ជាប់ <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fork the repo</a>

ឥឡូវនេះអ្នកគួរតែមានក្លូនផ្ទាល់ខ្លួននៃវគ្គសិក្សានេះនៅតំណភ្ជាប់ដូចខាងក្រោម៖

![រ៉េពូដែលបាន Fork](../../../translated_images/km/forked-repo.33f27ca1901baa6a.webp)

### ការក្លូនយ៉ាងស្រាល (អនុញ្ញាតសម្រាប់វគ្គសិក្សា / Codespaces)

  > ដែលមានប្រវត្តិពេញនិយមអាចធ្វើឱ្យរ៉េបូមានទំហំធំ (~3 GB) នាក់នៅពេលអ្នកទាញយកប្រវត្តិពេញនិងឯកសារទាំងអស់។ ប្រសិនបើអ្នកចូលរួមតែសិក្ខាសាលា ឬត្រូវការតែថតមេរៀនប៉ុន្មានថត បច្ចេកវិទ្យាក្លូនយ៉ាងស្រាល (ឬក៏ sparse clone) អាចជៀសវៀងពីការទាញយកភាគច្រើនដោយកាត់បន្ថយប្រវត្តិនិង/ឬរំលែង blobs។

#### ក្លូនយ៉ាងស្រាលរហ័ស — ប្រវត្តិនិបនិច្ឆ័យតិច តែក៏មានឯកសារទាំងអស់

ជំនួស `<your-username>` ក្នុងបញ្ជារខាងក្រោមជាមួយ URL ក្លូនរបស់អ្នក (ឬ URL upstream ប្រសិនបើអ្នកចូលចិត្ត)។

ដើម្បីក្លូនតែប្រវត្តិកម្រិតចុងក្រោយប៉ុណ្ណោះ (ទំហំទាញយកតិច):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

ដើម្បីក្លូនសាខាមួយជាក់លាក់:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### ក្លូនផ្នែកខ្លះ (sparse) — blobs តិច + មានតែថតដែលជ្រើសរើស

នេះប្រើក្លូនផ្នែក និង sparse-checkout (ទាមទារជាមួយ Git 2.25+ និងអនុញ្ញាតឱ្យប្រើ Git សម័យទំនើបដែលមាន partial clone support):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

ចូលទៅក្នុងថត repo:

```bash|powershell
cd ai-agents-for-beginners
```

បន្ទាប់មកបញ្ជាក់ថតដែលអ្នកចង់បាន (ឧទាហរណ៍ខាងក្រោមបង្ហាញពីពីរថត):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

បន្ទាប់ពីក្លូន និងផ្ទៀងផ្ទាត់ឯកសារ ប្រសិនបើអ្នកត្រូវការតែឯកសារនិងចង់ទទួលបានកន្លែងទំនេរ (គ្មានប្រវត្តិ git) សូមលុបទិន្នន័យបច្ចេកទេស repository (💀 មិនអាចបង្វិលវិញ — អ្នកនឹងបាត់បង់មុខងារ Git ទាំងអស់៖ គ្មាន commits, pulls, pushes, ឬការចូលទៅប្រវត្តិ)។

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### ប្រើ GitHub Codespaces (ផ្ដល់អនុសាសន៍ដើម្បីជៀសវាងការទាញយកធំនៅលើកុំព្យូទ័រមូលដ្ឋាន)

- បង្កើត Codespace ថ្មីសម្រាប់ repo នេះ តាមរយៈ [GitHub UI](https://github.com/codespaces).  

- នៅក្នុង terminal នៃ codespace ថ្មីមួយចាប់ផ្តើម រត់តែមួយក្នុងបញ្ជាក្លូនយ៉ាងស្រាល/ sparse ខាងលើ ដើម្បីយកតែថតមេរៀនដែលអ្នកត្រូវការ មកក្នុង workspace នៃ Codespace។
- ជាជម្រើស៖ បន្ទាប់ពីក្លូននៅក្នុង Codespaces សូមយក .git ដើម្បីសង្រោះទំហំបន្ថែម (មើលបញ្ជាលុបខាងលើ)។
- សម្គាល់៖ ប្រសិនបើអ្នកចូលចិត្តបើក repo ត្រង់ក្នុង Codespaces (ដោយគ្មានការក្លូនបន្ថែម) ត្រូវយល់ថា Codespaces នឹងកសាងបរិយាកាស devcontainer ហើយអាចProvision ធាតុច្រើនជាងដែលអ្នកត្រូវការ។ ការ clone ចម្លងស្រាលនៅក្នុង Codespace ថ្មីមួយផ្តល់ការគ្រប់គ្រងលើការប្រើប្រាស់សមត្ថភាពឌីសក៍។

#### គន្លឹះ

- តែងតែជំនួស URL ក្លូនជាមួយ fork របស់អ្នក ប្រសិនបើអ្នកចង់ផ្លាស់/commit។
- ប្រសិនបើអ្នកនឹងត្រូវការប្រវត្តិឬឯកសារច្រើនបន្ថែមក្នុងពេលក្រោយ អ្នកអាច fetch ពួកវា ឬកែចែក sparse-checkout ដើម្បីរួមបញ្ចូលថតបន្ថែម។

## រត់កូដ

វគ្គសិក្សានេះផ្តល់នូវស៊េរី Jupyter Notebooks ដែលអ្នកអាចរត់ដើម្បីទទួលបទពិសោធន៍ពីការសង់ AI Agents។

ឧទាហរណ៍កូដប្រើប្រាស់ **Microsoft Agent Framework (MAF)** ជាមួយ `AzureAIProjectAgentProvider` ដែលភ្ជាប់ទៅ **Azure AI Agent Service V2** (Responses API) តាមរយៈ **Microsoft Foundry**។

នូវកំណត់ត្រា Python ទាំងអស់មានស្លាក `*-python-agent-framework.ipynb`។

## តម្រូវការ

- Python 3.12+
  - **សំគាល់**: ប្រសិនបើអ្នកមិនទាន់មាន Python3.12 ត្រូវតែដំឡើងវា។ បន្ទាប់មកបង្កើត venv របស់អ្នកដោយប្រើ python3.12 ដើម្បីធ្វើឱ្យព្រមគ្នានូវកំណែត្រឹមត្រូវដែលត្រូវដំឡើងពី ឯកសារ requirements.txt។
  
    >ឧទាហរណ៍

    បង្កើតថត Python venv:

    ```bash|powershell
    python -m venv venv
    ```

    បន្ទាប់មកសកម្មភាពបរិយាកាស venv សម្រាប់:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: សម្រាប់កូដឧទាហរណ៍ប្រើ .NET សូមធ្វើតេស្តដើម្បីដំឡើង [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ឬក្រោយទៀត។ បន្ទាប់មក ពិនិត្យកំណែ .NET SDK ដែលបានដំឡើង:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — ត្រូវការសម្រាប់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (authentication). ដំឡើងពី [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure Subscription** — សម្រាប់ចូលដំណើរការទៅ Microsoft Foundry និង Azure AI Agent Service។
- **Microsoft Foundry Project** — គម្រោងមួយដែលមានម៉ូដែលត្រូវបានដាក់ (ឧ. `gpt-4o`). មើល [ជំហាន 1](#ជំហាន-1-បង្កើតគម្រោង-microsoft-foundry) ខាងក្រោម។

យើងបានរួមបញ្ចូលឯកសារ `requirements.txt` នៅឬធ្វើ root នៃ repository នេះ ដែលមានកញ្ចប់ Python ទាំងអស់ដែលត្រូវការដើម្បីរត់ឧទាហរណ៍កូដ។

អ្នកអាចដំឡើងពួកវា ដោយរត់បញ្ជាខាងក្រោមនៅ terminal នៅ root នៃ repository:

```bash|powershell
pip install -r requirements.txt
```

យើងផ្ដល់អនុសាសន៍ឱ្យបង្កើត Python virtual environment ដើម្បីជៀសវាងការផ្ទឹមផ្ទង់ និងបញ្ហាផ្សេងៗ។

## កំណត់ VSCode

ធ្វើឱ្យប្រាកដថាអ្នកកំពុងប្រើកំណែ Python ត្រឹមត្រូវនៅក្នុង VSCode។

![រូបភាព](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## កំណត់ Microsoft Foundry និង Azure AI Agent Service

### ជំហាន 1: បង្កើតគម្រោង Microsoft Foundry

អ្នកត្រូវការមាន Azure AI Foundry **hub** និង **project** ដែលមានម៉ូដែលបានដាក់ដើម្បីរត់ notebooks។

1. ចូលទៅ [ai.azure.com](https://ai.azure.com) និងចុះឈ្មោះជាមួយគណនី Azure របស់អ្នក។
2. បង្កើត **hub** (ឬប្រើ hub ដែលមានរួច)។ មើល៖ [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. នៅក្នុង hub សូមបង្កើត **project**។
4. ដាក់ម៉ូដែល (ឧ. `gpt-4o`) ពី **Models + Endpoints** → **Deploy model**។

### ជំហាន 2: ទាញយក Project Endpoint និង ឈ្មោះ Model Deployment របស់អ្នក

ពីគម្រោងរបស់អ្នកនៅក្នុង Microsoft Foundry portal:

- **Project Endpoint** — ចូលទៅផ្ទាំង **Overview** ហើយចម្លង URL endpoint។

![Project Connection String](../../../translated_images/km/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — ចូលទៅ **Models + Endpoints**, ជ្រើសម៉ូដែលដែលអ្នកបានដាក់ ហើយកត់សម្គាល់ **Deployment name** (ឧ. `gpt-4o`)។

### ជំហាន 3: ចូលទៅ Azure ដោយប្រើ `az login`

Notebooks ទាំងអស់ប្រើ **`AzureCliCredential`** សម្រាប់ authentication — គ្មាន API keys ត្រូវគ្រប់គ្រង។ នេះចាំបាច់ឱ្យអ្នកចូលដោយប្រើ Azure CLI។

1. **ដំឡើង Azure CLI** ប្រសិនបើអ្នកមិនទាន់មាន: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **ចូល** ដោយរត់:

    ```bash|powershell
    az login
    ```

    ឬប្រសិនបើអ្នកនៅក្នុងបរិយាកាស remote/Codespace ដែលមិនមាន browser:

    ```bash|powershell
    az login --use-device-code
    ```

3. **ជ្រើស subscription** ប្រសិនបើមានសំណើ — ជ្រើស subscription ដែលមានគម្រោង Foundry របស់អ្នក។

4. **ផ្ទៀងផ្ទាត់** ថាអ្នកបានចូល:

    ```bash|powershell
    az account show
    ```

> **ហេតុអ្វី `az login`?** Notebooks Authenticate ដោយប្រើ `AzureCliCredential` ពី package `azure-identity`។ នេះមានន័យថា session Azure CLI របស់អ្នកផ្តល់អត្តសញ្ញាណ — គ្មាន API keys ឬ secrets នៅក្នុងឯកសារ `.env` របស់អ្នក។ នេះគឺជាដំណើរការសន្តិសុខល្អបំផុត ([security best practice](https://learn.microsoft.com/azure/developer/ai/keyless-connections))។

### ជំហាន 4: បង្កើតឯកសារ `.env` របស់អ្នក

ចម្លងឯកសារឧទាហរណ៍:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# ពាវើសែល
Copy-Item .env.example .env
```

បើក `.env` ហើយបំពេញតម្លៃទាំងពីរនេះ៖

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| អថេរ | នៅឯណាអាចរកបាន |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portal → គម្រោងរបស់អ្នក → ទំព័រ **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portal → **Models + Endpoints** → ឈ្មោះម៉ូដែលដែលបានដាក់ |

នั่นហើយគឺសម្រាប់មេរៀនភាគច្រើន! Notebooks នឹង Authenticate ដោយស្វ័យប្រវត្តិតាមរយៈ session `az login` របស់អ្នក។

### ជំហាន 5: តំឡើងការ_DEPENDENCIES Python

```bash|powershell
pip install -r requirements.txt
```

យើងផ្ដល់អនុសាសន៍ឱ្យរត់នេះនៅក្នុង virtual environment ដែលអ្នកបានបង្កើតមុននេះ។

## ការកំណត់បន្ថែមសម្រាប់មេរៀន 5 (Agentic RAG)

មេរៀន 5 ប្រើ **Azure AI Search** សម្រាប់ retrieval-augmented generation។ ប្រសិនបើអ្នកមានគម្រោងរៀនមេរៀននោះ សូមបន្ថែមអថេរទាំងនេះទៅឯកសារ `.env` របស់អ្នក៖

| អថេរ | នៅឯណាអាចរកបាន |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portal → ដ្រេសOURCE **Azure AI Search** របស់អ្នក → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portal → ដ្រេសOURCE **Azure AI Search** របស់អ្នក → **Settings** → **Keys** → កូនសោកម្មវិធី admin មុខ |

## ការកំណត់បន្ថែមសម្រាប់មេរៀន 6 និង មេរៀន 8 (GitHub Models)

ខ្លះនៃ notebooks ក្នុងមេរៀន 6 និង 8 ប្រើ **GitHub Models** មិនប្រើ Azure AI Foundry។ ប្រសិនបើអ្នកចង់រត់ឧទាហរណ៍ទាំងនោះ សូមបន្ថែមអថេរទាំងនេះចូលក្នុង `.env` របស់អ្នក៖

| អថេរ | នៅឯណាអាចរកបាន |
|----------|-----------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | Use `https://models.inference.ai.azure.com` (default value) |
| `GITHUB_MODEL_ID` | ឈ្មោះម៉ូដែលដែលត្រូវប្រើ (ឧ. `gpt-4o-mini`) |

## ការកំណត់បន្ថែមសម្រាប់មេរៀន 8 (Bing Grounding Workflow)

Notebook workflow លក្ខខណ្ឌនៅមេរៀន 8 ប្រើ **Bing grounding** តាមរយៈ Azure AI Foundry។ ប្រសិនបើអ្នកចង់រត់ឧទាហរណ៍នោះ សូមបន្ថែមអថេរនេះទៅ `.env` របស់អ្នក៖

| អថេរ | នៅឯណាអាចរកបាន |
|----------|-----------------|
| `BING_CONNECTION_ID` | Azure AI Foundry portal → គម្រោងរបស់អ្នក → **Management** → **Connected resources** → ការតភ្ជាប់ Bing របស់អ្នក → ចម្លង connection ID |

## ដោះស្រាយបញ្ហា

### កំហុសការផ្ទៀងផ្ទាត់សញ្ញាប័ត្រ SSL លើ macOS

ប្រសិនបើអ្នកនៅលើ macOS ហើយប្រទះឃើញកំហុសដូចជា:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

នេះជាបញ្ហាបានដឹងនៅ Python លើ macOS ដែលសញ្ញាប័ត្រ SSL របស់ប្រព័ន្ធមិនត្រូវបានទទួលស្គាល់ដោយស្វ័យប្រវត្តិ។ សាកល្បងដំណោះស្រាយដូចខាងក្រោមក្នុងលំដាប់៖

**ជម្រើស 1: រត់ស្គ្រីប Install Certificates របស់ Python (អនុញ្ញាត)**

```bash
# ប្តូរ 3.XX ជាកំណែ Python ដែលបានដំឡើងរបស់អ្នក (ឧ. 3.12 ឬ 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**ជម្រើស 2: ប្រើ `connection_verify=False` នៅក្នុង notebook របស់អ្នក (សម្រាប់ notebooks GitHub Models តែប៉ុណ្ណោះ)**

នៅក្នុង Notebook មេរៀន 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), មានដំណោះស្រាយដែលបាន comment ដាក់រួច។ សូមលុប comment `connection_verify=False` ពេលបង្កើត client:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # បិទការត្រួតពិនិត្យ SSL ប្រសិនបើអ្នកជួបបញ្ហាវិញ្ញាបនប័ត្រ
)
```

> **⚠️ គ្រោងការពារ:** ការបិទការផ្ទៀងផ្ទាត់ SSL (`connection_verify=False`) បន្ថយសុវត្ថិភាពដោយរំលងការផ្ទៀងផ្ទាត់សញ្ញាប័ត្រ។ ប្រើវិធីនេះតែជាវិលជាមុនសម្រាប់បរិយាកាសអភិវឌ្ឍន៍ប៉ុណ្ណោះ មិនត្រូវប្រើនៅក្នុងផលិតកម្ម។

**ជម្រើស 3: ដំឡើង និងប្រើ `truststore`**

```bash
pip install truststore
```

បន្ទាប់មកបន្ថែមអ្វីៗខាងក្រោមនៅខាងលើនៃ notebook ឬ script មុនធ្វើការហៅបណ្តាញណាមួយ:

```python
import truststore
truststore.inject_into_ssl()
```

## ត្រូវឈប់នៅកន្លែងណាមួយ?

ប្រសិនបើអ្នកមានបញ្ហារត់ការកំណត់នេះ សូមចូលទៅក្នុង <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> ឬ <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">បង្កើត issue</a>។

## មេរៀនបន្ទាប់

ឥឡូវនេះអ្នកបានរួចរាល់ក្នុងការរៀនដំណើរការកូដសម្រាប់វគ្គសិក្សានេះ។ សំណាងល្អក្នុងការសិក្សាបន្ថែមអំពីពិភព AI Agents!

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**សេចក្ដីប្រកាសមិនទទួលខុសត្រូវ**:
ឯកសារនេះត្រូវបានបកប្រែដោយប្រើសេវាកម្មបកប្រែដោយ AI [Co-op Translator](https://github.com/Azure/co-op-translator). ក្នុងពេលយើងខិតខំសម្រាប់ភាពត្រឹមត្រូវ សូមយល់ដឹងថាការបកប្រែដោយស្វ័យប្រវត្តិអាចមានកំហុស ឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមក្នុងភាសាម្ចាស់ដើមគួរត្រូវបានចាត់ទុកជាប្រភពផ្លូវការនៃព័ត៌មាន។ សម្រាប់ព័ត៌មានសំខាន់ៗ យើងសូមណែនាំឱ្យប្រើការបកប្រែដោយអ្នកជំនាញមនុស្ស។ យើងមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកយល់ខុសណាមួយដែលកើតឡើងពីការប្រើប្រាស់ការបកប្រែនេះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->