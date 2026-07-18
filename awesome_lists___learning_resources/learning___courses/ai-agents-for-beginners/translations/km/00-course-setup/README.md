# ការរៀបចំមុខវិជ្ជា

## ការណែនាំ

មេរៀននេះនឹងគ្របដណ្តប់ពីរបៀបរត់គំរូកូដនៃមុខវិជ្ជានេះ។

## ចូលរួមជាមួយអ្នករៀនផ្សេងទៀត និងទទួលបានជំនួយ

មុននឹងចាប់ផ្តើមចម្លងស្ដុករបស់អ្នក សូមចូលរួមក្នុង [បន្ទប់ Discord សម្រាប់អ្នកចាប់ផ្តើម AI Agents](https://aka.ms/ai-agents/discord) ដើម្បីទទួលបានជំនួយណាមួយទាក់ទងនឹងការតម្លើង មើលសំណួរអំពីមុខវិជ្ជា ឬភ្ជាប់ទំនាក់ទំនងជាមួយអ្នករៀនផ្សេងទៀត។

## ចម្លង ឬ Fork ស្ដុកនេះ

ដើម្បីចាប់ផ្តើម សូមចម្លង ឬ fork ធនាគារព័ត៌មាន GitHub។ វានឹងបង្កើតជាផ្នែកផ្ទាល់ខ្លួនរបស់អ្នកនៃសម្ភារៈមុខវិជ្ជាដែលអាចរត់ បន្ទាន់សម័យ និងកែប្រែកូដបាន!

អ្នកអាចធ្វើបានដោយចុចតំណភ្ជាប់ <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fork the repo</a>

ឥឡូវនេះអ្នកគួរតែមានنسخة forked ផ្ទាល់ខ្លួននៃមុខវិជ្ជានេះនៅតំណភ្ជាប់ដូចខាងក្រោម៖

![Forked Repo](../../../translated_images/km/forked-repo.33f27ca1901baa6a.webp)

### ចម្លង shallow (ណែនាំសម្រាប់សិក្ខាសាលា / Codespaces)

> ធនាគារពេញលេញអាចធំធេង (~3 GB) ពេលអ្នកទាញយកប្រវត្តិពេញ និងឯកសារទាំងអស់។ បើអ្នកគ្រាន់តែចូលរួមសិក្ខាសាលា ឬត្រូវការខ្ទង់មួយចំនួន បទបញ្ជាចម្លង shallow (ឬ ចម្លង sparse) ជៀសវាងការទាញយកភាគច្រើនដោយកាត់ប្រវត្តិនិង/ឬកាត់ប្លុក។

#### ចម្លង shallow លឿន—ប្រវត្តិតិចតួច មួយទាំងអស់

ប្តូរ `<your-username>` នៅក្នុងពាក្យបញ្ជាលើកក្រោមជាមួយ URL fork របស់អ្នក (ឬ URL upstream ប្រសិនបើអ្នកចូលចិត្ត)។

ដើម្បីចម្លងតែប្រវត្តិ commit ចុងក្រោយប៉ុណ្ណោះ (ទាញតិច):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

ដើម្បីចម្លងសាខាផ្ទាល់ខ្លួន:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### ចម្លងផ្នែក (sparse) — ប្លុកតិច និងខ្ទង់បានជ្រើសរើសប៉ុណ្ណោះ

វាប្រើចម្លងផ្នែក និង sparse-checkout (តម្រូវ Git 2.25+ ហើយណែនាំប្រើ Git ថ្មីដែលគាំទ្រ​ចម្លងផ្នែក)៖

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

ចូលទៅថត repo៖

```bash|powershell
cd ai-agents-for-beginners
```

បន្ទាប់មកបញ្ជាក់ថតដែលអ្នកចង់បាន (ឧទាហរណ៍ខាងក្រោមបង្ហាញពីពីរថត)៖

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

បន្ទាប់ពីចម្លងនិងផ្ទៀងផ្ទាត់ឯកសារ ប្រសិនបើអ្នកត្រូវការតែឯកសារ និងចង់សំអាតកន្លែង (គ្មានប្រវត្តិ git) សូមលុបមេតាឌាតា repository (💀មិនអាចប្ដូរបាន — អ្នកនឹងបាត់បង់មុខងារ Git ទាំងអស់៖ គ្មានការបញ្ជូល commit, pull, push ឬការចូលប្រវត្តិ)។

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### ប្រើ GitHub Codespaces (ណែនាំដើម្បីជៀសវាងការទាញយកធនាគារធំមួយក្នុងកាំបិត)

- បង្កើត Codespace ថ្មីសម្រាប់ repo នេះតាមរយៈ [GitHub UI](https://github.com/codespaces)។  

- នៅក្នុង terminal នៃ codespace ដែលបានបង្កើតថ្មី ប្រតិបត្តិមួយក្នុងបញ្ជារ shallow/sparse ដើម្បីយកខ្ទង់មេរៀនដែលអ្នកត្រូវការចូលក្នុង workspace Codespace។
- ជម្រើស៖ បន្ទាប់ពីចម្លងក្នុង Codespaces, លុប .git ដើម្បីសង្វាប់កន្លែងបន្ថែម (មើលបញ្ជាលុបខាងលើ)។
- កំណត់ចំណាំ៖ ប្រសិនបើអ្នកចូលចិត្តបើក repo ដោយផ្ទាល់ក្នុង Codespaces (គ្មានចម្លងបន្ថែម), គួរតែដឹងថា Codespaces នឹងបង្កើតបរិស្ថាន devcontainer ហើយប្រហែលជានឹងនាំមកនូវទិន្នន័យលើសគ្រប់តំរូវការ។ ចម្លង shallow ក្នុង Codespace ថ្មីផ្តល់នូវការគ្រប់គ្រងលើការប្រើប្រាស់ hard disk ជាង។

#### លក្ខណៈផ្តល់មូលដ្ឋាន

- ធ្វើការ ជំនួស URL ចម្លងជាមួយ fork របស់អ្នកកាលណាអ្នកចង់កែប្រែ/commit។
- ប្រសិនបើអ្នកត្រូវការបន្ថែមប្រវត្តិ ឬឯកសារក្រោយៗ អ្នកអាចទាញយកឬកែ sparse-checkout ដើម្បីបញ្ចូលភាគងាយៗបន្ថែម។

## រត់កូដ

មុខវិជ្ជានេះផ្តល់ជូននូវស៊េរី Jupyter Notebooks ដែលអ្នកអាចរត់បានដើម្បីទទួលបទពិសោធន៍ដោយដៃក្នុងការបង្កើត AI Agents។

គំរូកូដប្រើប្រាស់ **Microsoft Agent Framework (MAF)** ជាមួយ `FoundryChatClient` ដែលភ្ជាប់ទៅ **Microsoft Foundry Agent Service V2** (Responses API) តាមរយៈ **Microsoft Foundry**។

ឯកសារ Python notebook ទាំងអស់មានស្លាក `*-python-agent-framework.ipynb`។

## តំរូវការ

- Python 3.12+
  - **ចំណាំ**៖ ប្រសិនបើអ្នកមិនមាន Python3.12 តំឡើង សូមធានានៅតែតំឡើងវា។ បន្ទាប់ពីនោះបង្កើត venv របស់អ្នកដោយប្រើ python3.12 ដើម្បីធានាថាប្រើប្រាស់បញ្ជាពី files requirements.txt ដែលត្រឹមត្រូវ។
  
    > ឧទាហរណ៍

    បង្កើតថត Python venv ៖

    ```bash|powershell
    python -m venv venv
    ```

    បន្ទាប់មកដំណើរការ environment venv សម្រាប់ៈ

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: សម្រាប់គំរូកូដដែលប្រើ .NET សូមធានាថាអ្នកបានតំឡើង [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ឬចុងក្រោយណាមួយ។ បន្ទាប់មក ពិនិត្យមើលកំណែ .NET SDK ដែលបានតំឡើង៖

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — តំរូវសម្រាប់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ។ តំឡើងពី [aka.ms/installazurecli](https://aka.ms/installazurecli)។
- **Azure Subscription** — សម្រាប់ចូលប្រើ Microsoft Foundry និង Microsoft Foundry Agent Service។
- **Microsoft Foundry Project** — គម្រោងដែលមានម៉ូដែលបានដាក់បង្ហាញ (ឧ. `gpt-4.1-mini`)។ មើល [ជំហាន 1](#ជំហាន-1៖-បង្កើតគម្រោង-microsoft-foundry) ខាងក្រោម។

យើងបានបញ្ចូលឯកសារ `requirements.txt` នៅក្នុងផ្ទៃកំណត់ឡើងដែលមានបណ្ណាល័យ Python ទាំងអស់ដែលត្រូវការសម្រាប់រត់គំរូកូដ។

អ្នកអាចតំឡើងវាដោយរត់ពាក្យបញ្ជាខាងក្រោមនៅ terminal របស់អ្នកនៅផ្ទៃកំណត់ repo៖

```bash|powershell
pip install -r requirements.txt
```

យើងណែនាំឱ្យបង្កើតបរិស្ថាន Python virtual ដើម្បីជៀសវាងកង្វះគ្នានិងបញ្ហាទាំងឡាយ។

## តំឡើង VSCode

ប្រាកដថាអ្នកកំពុងប្រើកំណែ Python ត្រឹមត្រូវក្នុង VSCode។

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## តំឡើង Microsoft Foundry និង Microsoft Foundry Agent Service

### ជំហាន 1៖ បង្កើតគម្រោង Microsoft Foundry

អ្នកត្រូវការជា hub និង គម្រោង នៅ Microsoft Foundry ដែលមានម៉ូដែលបានដាក់បង្ហាញ ដើម្បីរត់ notebooks។

1. ចូលទៅ [ai.azure.com](https://ai.azure.com) ហើយចុះឈ្មោះជាមួយគណនី Azure របស់អ្នក។
2. បង្កើត **hub** ថ្មី (ឬប្រើអ្វីដែលមានរួច)។ មើល៖ [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)។
3. នៅក្នុង hub បង្កើត **គម្រោង**។
4. ដាក់បង្ហាញម៉ូដែល (ឧ. `gpt-4.1-mini`) ពី **Models + Endpoints** → **Deploy model**។

### ជំហាន 2៖ ទទួលយក Endpoint គម្រោង និង ឈ្មោះការដាក់បង្ហាញម៉ូដែល

ពីគម្រោងរបស់អ្នកនៅក្នុងព័រតាល់ Microsoft Foundry៖

- **Project Endpoint** — ចូលទៅទំព័រ **Overview** ហើយចម្លង URL endpoint។

![Project Connection String](../../../translated_images/km/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — ចូលទៅ **Models + Endpoints**, ជ្រើសម៉ូដែលដែលបានដាក់បង្ហាញ ហើយចំណាំ **Deployment name** (ឧ., `gpt-4.1-mini`)។

### ជំហាន 3៖ ចុះឈ្មោះទៅ Azure ជាមួយ `az login`

Notebooks ទាំងអស់ប្រើ **`AzureCliCredential`** សម្រាប់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ — គ្មានកូនសោ API ត្រូវគ្រប់គ្រង។ វាតម្រូវឱ្យអ្នកចុះឈ្មោះតាមរយៈ Azure CLI។

1. **តំឡើង Azure CLI** ប្រសិនបើអ្នកមិនទាន់មាន៖ [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **ចុះឈ្មោះចូល** ដោយរត់៖

    ```bash|powershell
    az login
    ```

    ឬ ប្រសិនបើអ្នកនៅក្នុងបរិយាកាសឆ្ងាយ/Codespace ដែលគ្មានកម្មវិធីរុករក៖

    ```bash|powershell
    az login --use-device-code
    ```

3. **ជ្រើសរើស subscription របស់អ្នក** ប្រសិនបើមានការជូនដំណឹង — ជ្រើសរើសដែលមានគម្រោង Foundry របស់អ្នក។

4. **ផ្ទៀងផ្ទាត់** ថាអ្នកបានចុះឈ្មោះចូល៖

    ```bash|powershell
    az account show
    ```

> **ហេតុអ្វីបានជា `az login`?** Notebooks ផ្ទៀងផ្ទាត់ដោយប្រើ `AzureCliCredential` ពីកញ្ចប់ `azure-identity`។ ន័យថា session Azure CLI របស់អ្នកផ្តល់មុខគុណសម្គាល់ — គ្មានកូនសោ API ឬសម្ងាត់ក្នុងឯកសារ `.env` របស់អ្នកទេ។ នេះគឺជាបច្ចេកទេស​សុវត្ថិភាពល្អបំផុត។ (https://learn.microsoft.com/azure/developer/ai/keyless-connections)

### ជំហាន 4៖ បង្កើតឯកសារ `.env` របស់អ្នក

ចម្លងឯកសារឧទាហរណ៍៖

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

បើក `.env` ហើយបញ្ចូលតម្លៃទាំងពីរនេះ៖

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| ជម្រើស | ស្ថានที่បង្ហាញ |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | ព័រតាល់ Foundry → គម្រោងរបស់អ្នក → ទំព័រ **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | ព័រតាល់ Foundry → **Models + Endpoints** → ឈ្មោះម៉ូដែលដែលបានដាក់បង្ហាញ |

នេះគឺគ្រប់គ្រាន់សម្រាប់ភាគច្រើននៃមេរៀន! Notebooks នឹងផ្ទៀងផ្ទាត់អត្តសញ្ញាណដោយស្វ័យប្រវត្តិតាម session `az login` របស់អ្នក។

### ជំហាន 5៖ តំឡើងឧបករណ៍ Python

```bash|powershell
pip install -r requirements.txt
```

យើងណែនាំឱ្យរត់នេះនៅក្នុងបរិស្ថាន virtual ដែលអ្នកបានបង្កើតមុននេះ។

## បន្ថែមការតំឡើងសម្រាប់ មេរៀនទី 5 (Agentic RAG)

មេរៀន 5 ប្រើ **Azure AI Search** សម្រាប់ការបង្កើតតាមបែបមានការយកមតិ។ ប្រសិនបើអ្នកមានផែនការរត់មេរៀននោះ សូមបន្ថែមអថេរទាំងនេះទៅឯកសារ `.env` របស់អ្នក៖

| អថេរ | ស្ថានที่បង្ហាញ |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | ព័រតាល់ Azure → ធនធាន **Azure AI Search** របស់អ្នក → ទំព័រ **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | ព័រតាល់ Azure → ធនធាន **Azure AI Search** របស់អ្នក → **Settings** → **Keys** → កូនសោគណនីរដ្ឋបាលដើម |

## បន្ថែមការតំឡើងសម្រាប់មេរៀនដែលហៅទៅ Azure OpenAI ដោយផ្ទាល់ (មេរៀនទី 6 និងទី 8)

សៀវភៅកំណត់ខ្លះនៅក្នុងមេរៀន 6 និង 8 ហៅទៅ **Azure OpenAI** ដោយផ្ទាល់ (ប្រើ **Responses API**) បម្រើប្រាស់ប្រព័ន្ធ Microsoft Foundry មិនផ្សព្វផ្សាយរួច។ ឧទាហរណ៍នេះបានប្រើម៉ូឌែល GitHub ដែលបានចេញពីប្រើប្រាស់ (នឹងបញ្ឈប់ប្រើឡើងនៅ ខែកក្កដា 2026) និងមិនគាំទ្រ Responses API។ ប្រសិនបើអ្នកចង់រត់សំរឹទ្ធទាំងនេះ សូមបន្ថែមអថេរទាំងនេះទៅឯកសារ `.env` របស់អ្នក៖

| អថេរ | ស្ថានที่បង្ហាញ |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | ព័រតាល់ Azure → ធនធាន **Azure OpenAI** របស់អ្នក → **Keys and Endpoint** → Endpoint (ឧ. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | ឈ្មោះម៉ូដែលដែលបានដាក់បង្ហាញ (ឧ. `gpt-4.1-mini`) ដែលគាំទ្រតាម Responses API |
| `AZURE_OPENAI_API_KEY` | ជាជម្រើស — បើអ្នកប្រើការផ្ទៀងផ្ទាត់ដោយកូនសោ API ជំនួស `az login` / Entra ID |

> Responses API ប្រើ stable endpoint `/openai/v1/` ដូច្នេះមិនចាំបាច់មាន `api-version`។ ចុះឈ្មោះដោយ `az login` ដើម្បីប្រើការផ្ទៀងផ្ទាត់កូនសោមិនចាំបាច់។

## អ្នកផ្គត់ផ្គង់ជំនួស៖ MiniMax (គាំទ្រ OpenAI)

[MiniMax](https://platform.minimaxi.com/) ផ្តល់ម៉ូដែល context ធំទូលាយ (រហូតដល់ 204K tokens) តាមរយៈ API គាំទ្រជាមួយ OpenAI។ ព្រោះ Microsoft Agent Framework របស់ `OpenAIChatClient` ធ្វើការ​ជាមួយ endpoint គាំទ្រ OpenAI ដូច្នេះ អ្នកអាចប្រើ MiniMax ឆ្លើយតបទៅ Azure OpenAI ឬ OpenAI បាន។

បន្ថែមអថេរទាំងនេះទៅឯកសារ `.env` របស់អ្នក៖

| អថេរ | ស្ថានที่បង្ហាញ |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → កូនសោ API |
| `MINIMAX_BASE_URL` | ប្រើ `https://api.minimax.io/v1` (តម្លៃមូលដ្ឋាន) |
| `MINIMAX_MODEL_ID` | ឈ្មោះម៉ូដែល (ឧ. `MiniMax-M3`) |

**ឧទាហរណ៍ម៉ូដែល**៖ `MiniMax-M3` (ណែនាំ), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (ឆ្លើយតបទាន់លឿនជាង)។ ឈ្មោះម៉ូដែលនិងទិដ្ឋភាពអាចផ្លាស់ប្តូរតាមពេលវេលា និងការចូលប្រើអាស្រ័យលើគណនី ឬតំបន់ — សូមពិនិត្យ [MiniMax Platform](https://platform.minimaxi.com/) សម្រាប់បញ្ជីបច្ចុប្បន្ន។ ប្រសិនបើ `MiniMax-M3` មិនអាចប្រើបាន សូមកំណត់ `MINIMAX_MODEL_ID` ទៅម៉ូដែលដែលអ្នកអាចប្រើបាន (ឧ. `MiniMax-M2.7`)។

គំរូកូដដែលប្រើ `OpenAIChatClient` (ឧ. មេរៀន 14 ចុះកក់សណ្ឋាគារ) នឹងស្វ័យប្រវត្តិនៃរកឃើញ និងប្រើការកំណត់ MiniMax របស់អ្នកនៅពេលមានការកំណត់ `MINIMAX_API_KEY`។

## អ្នកផ្គត់ផ្គង់ជំនួស៖ Foundry Local (រត់ម៉ូដែលលើឧបករណ៍ផ្ទាល់ខ្លួន)

[Foundry Local](https://foundrylocal.ai) គឺជាកម្មវិធីរត់ត្រៀមស្រេចដែលទាញយក គ្រប់គ្រង និងផ្តល់ម៉ូដែលភាសា **ដោយផ្ទាល់លើឧបករណ៍របស់អ្នក** តាមរយៈ API គាំទ្រជាមួយ OpenAI — គ្មានពពក គ្មានសាប់ស្គ្រីប Azure និងគ្មានកូនសោ API។ វាជាជម្រើសល្អសម្រាប់ការអភិវឌ្ឍនៅក្រៅបណ្តាញ សាកល្បងដោយគ្មានការចំណាយពពក ឬរក្សាទិន្នន័យនៅលើឧបករណ៍។

ព្រោះ Microsoft Agent Framework របស់ `OpenAIChatClient` ធ្វើការ​ជាមួយ endpoint គាំទ្រជាមួយ OpenAI ដូច្នេះ Foundry Local គឺជាជំនួសក្នុងផ្ទះសម្រាប់ Azure OpenAI។

**1. តំឡើង Foundry Local**

```bash
# វីនដូ
winget install Microsoft.FoundryLocal

# ម៉ាកអូអែស
brew install foundrylocal
```

**2. ទាញយក និងរត់ម៉ូដែល** (នេះក៏ចាប់ផ្តើមសេវាកម្មក្នុងផ្ទះផងដែរ)៖

```bash
foundry model list          # មើលម៉ូដែលដែលមានស្រាប់
foundry model run phi-4-mini
```

**3. តំឡើង Python SDK** ដែលប្រើសម្រាប់រក endpoint ក្នុងផ្ទះ៖

```bash
pip install foundry-local-sdk
```

**4. បញ្ជាក់ Microsoft Agent Framework ទៅម៉ូដែលក្នុងផ្ទះរបស់អ្នក៖**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# ទាញយក (បើត្រូវការ) និងបម្រើម៉ូឌែលនៅលើកុំព្យូទ័រផ្ទាល់ខ្លួន រួចរកឃើញចំណុចចេញ/កំព់។
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # ឧ. http://localhost:<port>/v1
    api_key=manager.api_key,        # តែងតែ "មិនទាមទារ" សម្រាប់ Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **កំណត់ចំណាំ**៖ Foundry Local ផ្តល់ endpoint ពី OpenAI-compatible **Chat Completions**។ ប្រើវាសម្រាប់អភិវឌ្ឍក្នុងផ្ទះ និងស្ថានភាពក្រៅបណ្តាញ។ សម្រាប់ការប្រើប្រាស់ពេញលេញនៃ **Responses API** (សន្ទនាមានស្ថានភាព, ការត្រួតពិនិត្យឧបករណ៍ជ្រៅ និងអភិវឌ្ឍន៍ម៉ូដែលប្រភេទ agent), វិលត្រឡប់ទៅ **Azure OpenAI** ឬគម្រោង **Microsoft Foundry** ដូចដែលបង្ហាញក្នុងមេរៀន។ មើលឯកសាររបស់ [Foundry Local](https://foundrylocal.ai) សម្រាប់បញ្ជីម៉ូដែលបច្ចុប្បន្ន និងការគាំទ្រ។


## ការតំឡើងបន្ថែមសម្រាប់មេរៀនទី ៨ (ដំណើរការជំរុញ Bing)

តារាងសង្កេតការណ៍លម្អិតនៅមេរៀនទី ៨ ប្រើ **ការជំរុញ Bing** តាមរយៈ Microsoft Foundry។ ប្រសិនបើអ្នកចង់រត់គំរូនេះ សូមបន្ថែមអថេរនេះទៅក្នុងឯកសារ `.env` របស់អ្នក៖

| អថេរ | កន្លែងដែលសូមស្វែងរកវា |
|----------|-----------------|
| `BING_CONNECTION_ID` | គេហទំព័រ Microsoft Foundry → គម្រោងរបស់អ្នក → **Management** → **Connected resources** → ការតភ្ជាប់ Bing របស់អ្នក → ចម្លងលេខសម្គាល់ការតភ្ជាប់ |

## ដោះស្រាយបញ្ហា

### កំហុសបញ្ជាក់ទទួលសញ្ញាសុវត្ថិភាព SSL លើ macOS

ប្រសិនបើអ្នកប្រើ macOS ហើយប្រទះឃើញកំហុសដូចជា៖

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

នេះគឺជាបញ្ហាដែលគេបានដឹងហើយជាមួយ Python លើ macOS ដែលវិញ្ញាបនបត្រ SSL របស់ប្រព័ន្ធមិនត្រូវបានទុកចិត្តដោយស្វ័យប្រវត្តិ។ សូមព្យាយាមដោះស្រាយខាងក្រោមតាមតម្រៀប៖

**ជម្រើសទី ១៖ រត់ស្គ្រីប Install Certificates របស់ Python (ផ្អែកលើ)**

```bash
# ចាប់ប្តូរ 3.XX ជាមួយកំណែ Python ដែលអ្នកបានតំឡើង (ឧ. 3.12 ឬ 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**ជម្រើសទី ២៖ ប្រើ `connection_verify=False` នៅក្នុងសៀវភៅកត់ត្រារបស់អ្នក (សម្រាប់សៀវភៅកត់ត្រា GitHub Models ដោយឡែក)**

ក្នុងសៀវភៅកត់ត្រា Lesson 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), មានវិធានការដោះស្រាយដោយបានមិនបើកមុខមួយរួច។ សូមដោះបិទ `connection_verify=False` ពេលបង្កើត client៖

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # បិទការបញ្ជាក់ SSL ប្រសិនបើអ្នកជួបបញ្ហាសញ្ញាប័ត្រ
)
```

> **⚠️ ការព្រមាន៖** ការបិទការត្រួតពិនិត្យ SSL (`connection_verify=False`) ការពារបានកាត់បន្ថយដោយមិនធ្វើការត្រួតពិនិត្យវិញ្ញាបនបត្រ។ សូមប្រើវា តែនៅក្នុងបរិយាកាសអភិវឌ្ឍន៍ផ្ទាល់ តែមិនត្រូវប្រើនៅក្នុងការផលិតដំណើរការ។

**ជម្រើសទី ៣៖ តំឡើង និងប្រើ `truststore`**

```bash
pip install truststore
```

បន្ទាប់មកបន្ថែមខាងក្រោមនៅចំពោះមុខសៀវភៅកត់ត្រារបស់អ្នក ឬ script មុនធ្វើអានទិន្នន័យបណ្តាញណាមួយ៖

```python
import truststore
truststore.inject_into_ssl()
```

## ស្ទាក់នៅកន្លែងណាមួយ?

ប្រសិនបើអ្នកមានបញ្ហាណាមួយក្នុងការរត់ការតំឡើងនេះ សូមចូលរួមនៅក្នុង <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> រឺ <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">បង្កើតបញ្ហា</a>។

## មេរៀនបន្ទាប់

ឥឡូវនេះអ្នករួចរាល់ក្នុងការរត់កូដសម្រាប់វគ្គនេះ។ សូមរៀនយ៉ាងរីករាយអំពីពិភពលោករបស់ AI Agents! 

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->