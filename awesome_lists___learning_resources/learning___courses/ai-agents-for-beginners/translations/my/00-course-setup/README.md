# Course Setup

## အကြောင်းအရာသိရှိခြင်း

ဒီသင်ခန်းစာမှာ သင်ခန်းစာရဲ့ ကုဒ်နမူနာများကို မည်သို့ ပြေးဆွဲရမည်ကို ဖော်ပြပါမည်။

## အခြားသင်ယူသူတွေနဲ့ ပူးပေါင်းပြီး ကူညီမှု ရယူပါ

သင့်ရဲ့ repo ကို clone လုပ်ရန် စတင်ခင်မှာ [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) ကို ဝင်ရောက်ပြီး setup ဆိုင်ရာကူညီမှုများ၊ သင်ခန်းစာဆိုင်ရာမေးခွန်းများအတွက် သို့မဟုတ် အခြားသင်ယူသူများနှင့် ချိတ်ဆက်ရန် ပါဝင်ပါ။

## ဒီ Repo ကို Clone သို့မဟုတ် Fork ပြုလုပ်ပါ

စတင်ရန်အတွက် GitHub Repository ကို clone သို့မဟုတ် fork လုပ်ပါ။ ဒါက သင့်ကိုယ်ပိုင် သင်ခန်းစာပစ္စည်း ဗားရှင်းကို ဖန်တီးပေးပြီး ကုဒ်များကို run၊ စမ်းသပ်ပြီး ပြင်ဆင်နိုင်ပါလိမ့်မယ်။

ဤသည်ကို <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">repo ကို fork လုပ်ရန်</a> ဖြင့် နှိပ်၍ ပြုလုပ်နိုင်သည်။

အခု သင်မှာ ဒီသင်ခန်းစာရဲ့ ကိုယ်ပိုင် fork လုပ်ထားသော ဗားရှင်းကို အောက်ပါလင့်ခ်တွင် ပိုင်ဆိုင်ထားသည်။

![Forked Repo](../../../translated_images/my/forked-repo.33f27ca1901baa6a.webp)

### Shallow Clone (Workshop / Codespaces များအတွက် အကြံပြုသည်)

> အပြည့်အစုံ repository သည် သမိုင်းကြောင်းနှင့် ဖိုင်အားလုံးကိုဒေါင်းလုပ်လုပ်ရာတွင် (ဟားiz ေလာင်) 3 GB ခန့် အရွယ်အစားကြီးနိုင်သည်။ သင်က Workshop တက်သည် သို့မဟုတ် သင်ခန်းစာအဖွဲ့အစည်းအနည်းငယ်သာ လိုအပ်လျှင် shallow clone (သို့) sparse clone သည် သမိုင်းကြောင်းအားဖြတ်၍ သို့မဟုတ် blobs တချို့ကို ကင်းလွတ်၍ ဒေါင်းလုပ်အများစုကို ကာကွယ်ပေးသည်။

#### အလျင်မြန်ဆုံး shallow clone — သမိုင်းကြောင်းအနည်းဆုံး၊ ဖိုင်အားလုံး

အောက်ပါ command များတွင် `<your-username>` ကို သင့် fork URL (သို့) upstream URL ဖြင့် ပြောင်းသုံးပါ။

နောက်ဆုံး commit သမိုင်းကြောင်းသာ clone ရန် (ဒေါင်းလုပ်ငယ်):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

branch တစ်ခုကိုသာ clone လုပ်ရန်:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### အပိုင်းအစ (sparse) clone — blobs အနည်းဆုံး + ရွေးချယ်ထားသော ဖိုင်ဖိုဒါများသာ

ဒါက partial clone နှင့် sparse-checkout ကို အသုံးပြုသည် (Git 2.25+ လိုအပ်ပြီး partial clone ကိုထောက်ပံ့သည့် နောက်ဆုံး Git အတွက် အကြံပြုသည်):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

repo ဖိုဒါထဲသို့ ဝင်ပါ:

```bash|powershell
cd ai-agents-for-beginners
```

ပြီးနောက်လိုအပ်သည့် ဖိုဒါများကို ဖော်ပြပါ (နမူနာအောက်တွင် ဖိုဒါနှစ်ခုကို ပြထားသည်):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

clone ပြီး ဖိုင်များကို အတည်ပြုပြီးနောက် သင် ဖိုင်များသာလိုအပ်ပြီး နေရာ မဖြည့်လိုပါက (git သမိုင်းကြောင်းမလိုလျှင်) repository ရဲ့ metadata ကိုဖျက်ပစ်ပါ (💀ပြန်လည်မရသေး — git လုပ်ဆောင်ချက်များအားလုံး မရရှိတော့ပါမည်: commit များ၊ pull များ၊ push များ သမိုင်းကြောင်းလမ်းကြောင်းများခြင်း မရှိတော့ပါ):

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces ကို အသုံးပြုခြင်း (local ဒေါင်းလုပ်ဆွဲမှုကြီးများ ရှောင်ရှားရန် အကြံပြုသည်)

- ဒီ repo အတွက် [GitHub UI](https://github.com/codespaces) ကနေ Codespace အသစ် ဖန်တီးပါ။

- Codespace အသစ်ထဲ ရှိ terminal ဖြင့် အထက်ပါ shallow/sparse clone command များထဲမှ တခုကို run လုပ်၍ သင်လိုအပ်သော သင်ခန်းစာဖိုဒါများကိုသာ Codespace workspace ထဲသို့ ဦးတည်ယူပါ။
- ရွေးချယ်မှု: Codespaces ထဲ clone ပြီးနောက် .git ဖိုင်ဖိုဒါ ကို ဖျက်ပစ်၍ နေရာပြန်လည်ရယူပါ (ဖျက်စရာ command များကို အထက်တွင်ဖော်ပြပြီး)။
- သတိပြုရန်: သင် repo ကို Codespaces ထဲတန်းနေတယ်ဆိုရင် (clone လုပ်ခြင်းမရှိဘဲ) Codespaces က devcontainer ပတ်ဝန်းကျင်ကို တည်ဆောက်ပေးမှာ ဖြစ်ပြီး သင့်လိုအပ်ချက်ထက်ပို၍ provision ပေးနိုင်သည်။ Fresh Codespace မှာ shallow copy clone လုပ်ခြင်းက disk အသုံးပြုမှုကို ပိုမိုထိန်းချုပ်နိုင်စေသည်။

#### အကြံပြုချက်များ

- သင်ပြင်ဆင်/commit ပြုလုပ်ချင်ပါက clone URL ကို သင့် fork URL ဖြင့် အမြဲသီးခြားထည့်ပါ။
- နောက်ပိုင်း သမိုင်းကြောင်း သို့မဟုတ် ဖိုင်များပိုမိုလိုလျှင် fetch ပြုလုပ်နိုင်ပြီး sparse-checkout ကိုရိုက်ချက်ပြီး ဖိုဒါအသစ်များ ထည့်နိုင်သည်။

## ကုဒ်ကို run ဆွဲခြင်း

ဒီသင်ခန်းစာမှာ Jupyter Notebooks များစီးရီးရှိပြီး AI Agents တည်ဆောက်ရာတွင် လက်တွေ့ လေ့ကျင့်နိုင်ပါသည်။

ကုဒ်နမူနာများသည် **Microsoft Agent Framework (MAF)** တွင် `AzureAIProjectAgentProvider` ကို အသုံးပြုကာ **Azure AI Agent Service V2** (Responses API) ကို **Microsoft Foundry** ဖြင့် ဆက်သွယ်ထားသည်။

Python notebooks တို့အားလုံးကို `*-python-agent-framework.ipynb` ဟုပြထားသည်။

## လိုအပ်ချက်များ

- Python 3.12+
  - **ဖော်ပြချက်**: Python3.12 မရှိရင် ထည့်သွင်းပါ။ ထို့နောက် သတ်မှတ်ထားသော version များကို requirements.txt ဖိုင်မှ ထည့်သွင်းရန် python3.12 ဖြင့် venv ဖန်တီးပါ။
  
    > နမူနာ

    Python venv directory ဖန်တီးရန်:

    ```bash|powershell
    python -m venv venv
    ```

    ထို့နောက် venv ပတ်ဝန်းကျင်ကို အောက်ပါအတိုင်းဖွင့်ပါ:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET ကို အသုံးပြုသော sample code များအတွက် [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) (သို့) မကြာခဏ ပိုမိုမြင့်မားသော version ထည့်သွင်းထားရန် သေချာပါစေ။ .NET SDK ရဲ့ version တစ်ခုကို စစ်ဆေးရန်:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — အတည်ပြုရန် လိုအပ်သည်။ [aka.ms/installazurecli](https://aka.ms/installazurecli) မှ ထည့်သွင်းပါ။
- **Azure Subscription** — Microsoft Foundry နှင့် Azure AI Agent Service ကို ဝင်ရောက် သုံးစွဲရန်လိုအပ်သည်။
- **Microsoft Foundry Project** — deployed လုပ်ထားသော မော်ဒယ်တစ်ခုပါရှိသော project (ဥပမာ `gpt-4o`)။ အောက်ပါ [Step 1](#အဆင့်-၁-microsoft-foundry-project-ဖန်တီးခြင်း) ကိုကြည့်ပါ။

ဒီ repo ရဲ့ မျက်နှာပြင်မှာရှိတဲ့ `requirements.txt` ဖိုင်ထဲတွင် ကုဒ်နမူနာများကို run ကုန်သော Python package များ ပါဝင်သည်။

သင်တို့ terminal တွင် အောက်ပါ command ဖြင့် ထည့်သွင်းနိုင်သည်။

```bash|powershell
pip install -r requirements.txt
```

Python virtual environment တစ်ခု ဖန်တီးထားရန် အကြံပြုသည်။ ဘာကြောင့်ဆိုတော့ မတူညီသော package တွေအကြား ချိန်ညှိမှု မကျေမနပ်မှုများမှ ကာကွယ်ရာတွင် ကူညီပေးမည်ဖြစ်သည်။

## VSCode ကို Setup ပြုလုပ်ပါ

VSCode တွင် သင်သုံးနေသော Python version မှန်ကန်သည်ကို သေချာစေရန်။

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry နှင့် Azure AI Agent Service ကို Setup ပြုလုပ်ခြင်း

### အဆင့် ၁: Microsoft Foundry Project ဖန်တီးခြင်း

notebooks များ run ဆွဲရန် Azure AI Foundry **hub** နှင့် **project** တို့အတွက် deployed မော်ဒယ်လိုအပ်သည်။

1. [ai.azure.com](https://ai.azure.com) သို့ ဝင်၍ Azure အကောင့်ဖြင့် သွင်းပါ။
2. **hub** တစ်ခု ဖန်တီးပါ (သို့) ရှိပြီးသား hub ကို အသုံးပြုပါ။ ကြည့်ရန်: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)။
3. hub အတွင်းမှာ **project** ဖန်တီးပါ။
4. **Models + Endpoints** → **Deploy model** ကနေ မော်ဒယ်တစ်ခု (ဥပမာ `gpt-4o`) ကို deploy ပြုလုပ်ပါ။

### အဆင့် ၂: Project Endpoint နှင့် Model Deployment Name ရယူခြင်း

Microsoft Foundry portal တွင် သင့် project မှ:

- **Project Endpoint** — **Overview** စာမျက်နှာသို့ သွား၍ endpoint URL ကို ကူးယူပါ။

![Project Connection String](../../../translated_images/my/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — **Models + Endpoints** ထဲသို့ သွား၍ deployed မော်ဒယ်ကို ရွေးချယ်ပြီး **Deployment name** ကို မှတ်သားပါ (ဥပမာ `gpt-4o`)။

### အဆင့် ၃: `az login` ဖြင့် Azure သို့ သွင်းပါ

notebooks အားလုံးတွင် **`AzureCliCredential`** ဖြင့် authentication ပြုလုပ်သည် — API key မလိုအပ်ပါ။ Azure CLI အသုံးပြု၍ သင် signed in ရမည်။

1. **Azure CLI ထည့်သွင်းပါ** (မရှိပါက): [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. အောက်ပါ command ဖြင့် **sign in** လုပ်ပါ:

    ```bash|powershell
    az login
    ```

    browser မပါသော remote/Codespace ပတ်ဝန်းကျင်တွင် အသုံးပြုမည်ဆိုပါက:

    ```bash|powershell
    az login --use-device-code
    ```

3. အကောင့်ရွေးရန် တောင်းဆိုပါက သင့် Foundry project ပါဝင်သော subscription ကို ရွေးချယ်ပါ။

4. သင် signed in ဖြစ်ကြောင်း အတည်ပြုပါ:

    ```bash|powershell
    az account show
    ```

> **ဘာကြောင့် `az login` လဲ?** notebooks များတွင် `azure-identity` package နဲ့ `AzureCliCredential` ဖြင့် အတည်ပြုမှု ပြုလုပ်သည်။ အဓိကတော့ Azure CLI session က အသုံးပြုသူအချက်အလက် ရရှိစေပြီး `.env` ဖိုင်အတွင်း API keys သို့မဟုတ် secrets မလိုအပ်ပါ။ ဤသည်မှာ [လုံခြုံရေးအကောင်းဆုံးလေ့လာမှု](https://learn.microsoft.com/azure/developer/ai/keyless-connections) ဖြစ်သည်။

### အဆင့် ၄: သင့် `.env` ဖိုင် ဖန်တီးပါ

နမူနာဖိုင်ကို ကူးယူပါ:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

`.env` ဖိုင်ကို ဖွင့်ပြီး အောက်ပါ တန်ဖိုးများထည့်ပြီး ဖြည့်စွက်ပါ:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| Variable | ရှာဖွေရမည့်နေရာ |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portal → သင့် project → **Overview** စာမျက်နှာ |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portal → **Models + Endpoints** → deployed မော်ဒယ်အမည် |

ဒါဆိုသင်သည် သင်ခန်းစာများအတွက် အများစုမှာ ပြီးပါပြီ။ notebooks များသည် သင့် `az login` session ဖြင့် အလိုအလျောက် အတည်ပြုလုပ်မည်။

### အဆင့် ၅: Python Dependencies များ ထည့်သွင်းပါ

```bash|powershell
pip install -r requirements.txt
```

ဤကို သင့် virtual environment အတွင်း run ဖို့ အကြံပြုပါ။

## သင်ခန်းစာ 5 (Agentic RAG) အတွက် အပို Setup

သင်ခန်းစာ 5 တွင် **Azure AI Search** ကို retrieval-augmented generation အတွက် အသုံးပြုသည်။ သင်သည် သင်ခန်းစာအဲဒီကို run ဆွဲမည်ဆိုပါက `.env` ဖိုင်တွင် အောက်ပါ variable များ ထည့်သွင်းပါ။

| Variable | ရှာရမည့်နေရာ |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portal → သင့် **Azure AI Search** resource → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portal → သင့် **Azure AI Search** resource → **Settings** → **Keys** → primary admin key |

## သင်ခန်းစာ 6 နှင့် 8 (GitHub Models) အတွက် အပို Setup

သင်ခန်းစာ 6 နှင့် 8 ရဲ့ notebooks အချို့မှာ **GitHub Models** ကို Azure AI Foundry ထက်အသုံးပြုသည်။ သင်သည် ဤနမူနာများကို run လုပ်မည်ဆိုပါက `.env` ဖိုင်တွင် အောက်ပါ variable များ ထည့်သွင်းပါ။

| Variable | ရှာဖွေရမည့်နေရာ |
|----------|-----------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | `https://models.inference.ai.azure.com` အသုံးပြုပါ (default တန်ဖိုး) |
| `GITHUB_MODEL_ID` | အသုံးပြုမည့် မော်ဒယ်အမည် (ဥပမာ `gpt-4o-mini`) |

## အခြား provider: MiniMax (OpenAI-Compatible)

[MiniMax](https://platform.minimaxi.com/) သည် OpenAI-compatible API ဖြင့် context size ကြီးသော မော်ဒယ်များ (204K tokens အထိ) ပေးသည်။ Microsoft Agent Framework ၏ `OpenAIChatClient` သည် OpenAI-compatible endpoint များကိုအဆင်ပြေသဖြင့် GitHub Models သို့မဟုတ် OpenAI အတွက် MiniMax ကိုလည်း အသုံးပြုနိုင်သည်။

`.env` ဖိုင်တွင် အောက်ပါ variable များထည့်ပါ။

| Variable | ရှာဖွေရမည့်နေရာ |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1` အသုံးပြုပါ (default တန်ဖိုး) |
| `MINIMAX_MODEL_ID` | အသုံးပြုမည့် မော်ဒယ်အမည် (ဥပမာ `MiniMax-M2.7`) |

**ရရှိနိုင်သော မော်ဒယ်များ**: `MiniMax-M2.7` (အကြံပြု), `MiniMax-M2.7-highspeed` (ထွက်ပြီးလျင်မြန်သည်)

`OpenAIChatClient` သုံးသည့် ကုဒ်နမူနာများ၊ ဥပမာ Lesson 14 hotel booking workflow တွင် `MINIMAX_API_KEY` သတ်မှတ်ထားပါက MiniMax configuration ကို အလိုအလျောက် တွေ့ရှိ၍ အသုံးပြုမည်ဖြစ်သည်။

## သင်ခန်းစာ 8 (Bing Grounding Workflow) အတွက် အပို Setup

သင်ခန်းစာ 8 တွင် conditional workflow notebook သည် Azure AI Foundry မှ Bing grounding ကို အသုံးပြုသည်။ သင်သည် ဤနမူနာကို run ခြင်းဆောင်ရွက်မည်ဆိုပါက `.env` ဖိုင်တွင် အောက်ပါ variable ကိုထည့်သွင်းပါ။

| Variable | ရှာဖွေရမည့်နေရာ |
|----------|-----------------|
| `BING_CONNECTION_ID` | Azure AI Foundry portal → သင့် project → **Management** → **Connected resources** → Bing connection ကို ရွေးပြီး connection ID ကို ကူးယူပါ |

## ပြဿနာဖြေရှင်းခြင်း

### macOS တွင် SSL Certificate Verification Error များ

macOS တွင် Python SSL certificate များကို အလိုအလျောက် ယုံကြည်ခြင်း မရှိသောပြဿနာ ဖြစ်ပေါ်နိုင်ပြီး အောက်ပါအတိုင်းဖြေရှင်းပါ:

**ရွေးချယ်စရာ ၁: Python Install Certificates script ကို run လုပ်ပါ (အကြံပြု)**

```bash
# သင့်ထည့်သွင်းထားသော Python ဗားရှင်းနံပါတ်ဖြင့် 3.XX ကိုအစားထိုးပါ (ဥပမာ၊ 3.12 သို့မဟုတ် 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**ရွေးချယ်စရာ ၂: စာနမူနာထားသော connection_verify=False ကို သုံးပါ (GitHub Models notebooks များအတွက်သာ)**

Lesson 6 notebook (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) တွင်မှတ်ချက်ထည့်ထားသော workaround ရှိပါသည်။ client ဖန်တီးရာတွင် `connection_verify=False` ကို uncomment ပြောင်းပါ။

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # သင်သည် အသိအမှတ်ပြုလက္ခဏာအမှားများကို တွေ့ရှိပါက SSL စစ်ဆေးမှုကို ပိတ်ထားပါ။
)
```

> **⚠️ သတိပေးချက်**: SSL ကြည့်ရှုမှု ပယ်ဖျက်ခြင်းသည် လုံခြုံရေး လျော့နည်းသောကြောင့် development ပတ်ဝန်းကျင်များတွင်သာ ယာယီ အသုံးပြုရန်ဖြစ်သည်။ တရားဝင် production ပတ်ဝန်းကျင်တွင် မသုံးပါနှင့်။

**ရွေးချယ်စရာ ၃: `truststore` ကို ထည့်သွင်း၍ အသုံးပြုပါ**

```bash
pip install truststore
```

ပြီးနောက် notebook သို့မဟုတ် script ထိပ်တွင် အောက်ပါအတိုင်း ထည့်ပါ၊ network call မပြုလုပ်မီ:

```python
import truststore
truststore.inject_into_ssl()
```

## ဘာမှ မရောက်နိုင်ဘူး?

ဒီ setup ကို run ခြင်းတွင် ပြဿနာရှိပါက <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> သို့ ဝင်ရောက်ဆွေးနွေးပါ၊ သို့မဟုတ် <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">issue တခုဖန်တီးပါ</a>။

## နောက်တစ်ခန်းစာ

သင်အားဖြင့် ဒီသင်ခန်းစာရဲ့ ကုဒ်များကို ပျော်ရွှင်စွာ run ဆွဲရန် ပြင်ဆင်ပြီးပါပြီ။ AI Agents ကမ္ဘာအကြောင်းကို ပိုမိုလေ့လာရာတွင် ပျော်ရွှင်ပါစေ!

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ကြေညာချက်**  
ဤစာရွက်စာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှုဖြစ်သော [Co-op Translator](https://github.com/Azure/co-op-translator) ဖြင့် ဘာသာပြန်ထားပါသည်။ မှန်ကန်မှုအတွက် ကြိုးပမ်းဆောင်ရွက်ထားသော်လည်း၊ အလိုအလျောက်ဘာသာပြန်မှုများတွင် အမှားများ သို့မဟုတ် မှန်ကန်မှုမရှိမှုများ ရှိနိုင်၍ ရှိနိုင်ကြောင်း သတိပြုပါ။ မူရင်းစာတမ်းကို ဒေသန္တာဘာသာဖြင့်သာ မှန်ကန်ပြီး ယုံကြည်စိတ်ချရသောရင်းမြစ်အဖြစ်စဉ်းစားသင့်ပါသည်။ အရေးကြီးသတင်းအချက်အလက်များအတွက် လူကြီးမင်းအနေဖြင့် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်ခြင်းကို အကြံပြုပါသည်။ ဤဘာသာပြန်ခြင်းကို အသုံးပြုမှုကြောင့် ဖြစ်ပေါ်လာနိုင်သည့် နားမလည်မှုများ သို့မဟုတ် မမှန်ကန်သောအဓိပ္ပါယ်ဖတ်ရှုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မယူပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->