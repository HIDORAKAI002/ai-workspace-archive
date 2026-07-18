# কোর্স সেটআপ

## পরিচিতি

এই পাঠে এই কোর্সের কোড নমুনাগুলো কীভাবে চালাবেন তা আলোচনা করা হবে।

## অন্যান্য শিক্ষার্থীদের সাথে যুক্ত হোন এবং সহায়তা নিন

আপনার রিপো ক্লোন করা শুরু করার আগে, সেটআপে সহায়তা বা কোর্স সম্পর্কে কোনো প্রশ্নের জন্য অথবা অন্যান্য শিক্ষার্থীদের সাথে যোগাযোগ করার জন্য [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) এ যোগ দিন।

## এই রিপো ক্লোন বা ফর্ক করুন

শুরু করতে, দয়া করে গিটহাব রিপোজিটরি ক্লোন বা ফর্ক করুন। এটি আপনার নিজের এই কোর্সের মেটারিয়ালের সংস্করণ তৈরি করবে যাতে আপনি কোড চালাতে, পরীক্ষা করতে এবং পরিবর্তন করতে পারেন!

এটি করতে পারেন <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">রিপো ফর্ক করতে</a> লিঙ্কে ক্লিক করে

এখন আপনার নিজের এই কোর্সের ফর্ককৃত সংস্করণ নিচের লিঙ্কে থাকা উচিত:

![Forked Repo](../../../translated_images/bn/forked-repo.33f27ca1901baa6a.webp)

### শ্যালো ক্লোন (ওয়ার্কশপ / Codespaces এর জন্য সুপারিশকৃত)

>পুরো রিপোজিটরি ডাউনলোড করলে তা বড় হতে পারে (~3 GB), যা সম্পূর্ণ ইতিহাস এবং সব ফাইল নিয়ে। যদি আপনি শুধুমাত্র ওয়ার্কশপে অংশ নিচ্ছেন বা কিছু মাত্র কিছু লেসনের ফোল্ডার দরকার হয়, তাহলে শ্যালো ক্লোন (বা sparse ক্লোন) ডাউনলোড কমিয়ে দেয় ইতিহাস সংক্ষিপ্ত করে এবং/বা ব্লব স্কিপ করে।

#### দ্রুত শ্যালো ক্লোন — কম ইতিহাস, সব ফাইল

নিচের কমান্ডগুলিতে `<your-username>` আপনার ফর্ক URL (বা যদি চান আপস্ট্রিম URL) দিয়ে প্রতিস্থাপন করুন।

শুধু সর্বশেষ কমিট ইতিহাস ক্লোন করতে (ছোট ডাউনলোড):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

নির্দিষ্ট একটি শাখা ক্লোন করতে:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### আংশিক (sparse) ক্লোন — কম ব্লব + শুধুমাত্র নির্বাচিত ফোল্ডার

এটি আংশিক ক্লোন এবং sparse-checkout ব্যবহার করে (Git 2.25+ প্রয়োজন এবং partial clone সমর্থিত আধুনিক Git সুপারিশকৃত):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

রিপো ফোল্ডারে যান:

```bash|powershell
cd ai-agents-for-beginners
```

তারপর আপনি যে ফোল্ডারগুলো চান তা নির্দিষ্ট করুন (নিম্নের উদাহরণে দুইটি ফোল্ডার দেখানো হয়েছে):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

ক্লোন করার পর এবং ফাইলগুলো যাচাই করার পরে, যদি আপনি শুধু ফাইল রাখতে চান এবং স্থান মুক্ত করতে চান (কোনো git ইতিহাস ছাড়া), তাহলে দয়া করে রিপোজিটরি মেটাডেটা ডিলিট করুন (💀অনিবার্য — আপনি সব Git ফাংশনালিটি হারাবেন: কোনো কমিট, পুল, পুশ বা ইতিহাস অ্যাক্সেস হবে না)।

```bash
# জেডশ/বাস্হ
rm -rf .git
```

```powershell
# পাওয়ারশেল
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces ব্যবহার করা (লোকাল বড় ডাউনলোড এড়ানোর জন্য সুপারিশকৃত)

- এই রিপোর জন্য [GitHub UI](https://github.com/codespaces) থেকে একটি নতুন Codespace তৈরি করুন।

- নতুন তৈরি করা Codespace এর টার্মিনালে, উপরের শ্যালো/স্পারস ক্লোন কমান্ড থেকে একটি রান করুন যাতে শুধু দরকারি লেসন ফোল্ডারগুলো Codespace ওয়ার্কস্পেসে আসে।
- opsional: Codespaces-এ ক্লোন করার পরে অতিরিক্ত স্থান মুক্ত করতে .git মুছে ফেলুন (উপরের অপসারণ কমান্ড দেখুন)।
- নোট: আপনি যদি রিপো সরাসরি Codespaces-এ খুলতে চান (অতিরিক্ত ক্লোন ছাড়া), অবগত থাকুন Codespaces ডেভকন্টেইনার পরিবেশ তৈরি করবে এবং হয়তো আপনাকে যতটা দরকার তার চেয়ে বেশি ভাসান দেবে। তাজা Codespace-এ শ্যালো ক্লোন করা হলে ডিস্ক ব্যবহারে বেশি নিয়ন্ত্রণ পাবেন।

#### টিপস

- আপনি যদি সম্পাদনা/কমিট করতে চান তাহলে সর্বদা ক্লোন URL-টি আপনার ফর্ক দিয়ে প্রতিস্থাপন করুন।
- যদি পরে বেশি ইতিহাস বা ফাইল দরকার হয়, আপনি(fetch) করতে পারবেন বা sparse-checkout সামঞ্জস্য করতে পারবেন অতিরিক্ত ফোল্ডার অন্তর্ভুক্ত করতে।

## কোড চালানো

এই কোর্সটি একটি সিরিজ Jupyter Notebook প্রদান করে যা আপনি চালিয়ে AI এজেন্ট তৈরি করার হাতে কলম অনুশীলন পেতে পারেন।

কোড নমুনাগুলো **Microsoft Agent Framework (MAF)** ব্যবহার করে `FoundryChatClient` এর সাথে, যা **Microsoft Foundry Agent Service V2** (Responses API) এর মাধ্যমে **Microsoft Foundry**-র সাথে সংযুক্ত।

সব পাইথন নোটবুক `*-python-agent-framework.ipynb` নামে পরিচিত।

## প্রয়োজনীয়তা

- পাইথন 3.12+
  - **নোট**: যদি আপনার কাছে Python3.12 ইনস্টল না থাকে, অবশ্যই এটি ইনস্টল করুন। তারপর requirements.txt ফাইল থেকে সঠিক সংস্করণগুলি ইনস্টল নিশ্চিত করতে python3.12 দিয়ে আপনার venv তৈরি করুন।
  
    >উদাহরণ

    পাইথন venv ডিরেক্টরি তৈরি করুন:

    ```bash|powershell
    python -m venv venv
    ```

    তারপর venv পরিবেশ সক্রিয় করুন:

    ```bash
    # জেডএএস/ব্যাশ
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET ব্যবহার করে নমুনা কোডের জন্য নিশ্চিত করুন যে আপনি [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) বা পরবর্তী সংস্করণ ইনস্টল করেছেন। তারপর আপনার ইনস্টল করা .NET SDK সংস্করণটি চেক করুন:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — অথেনটিকেশনের জন্য প্রয়োজনীয়। [aka.ms/installazurecli](https://aka.ms/installazurecli) থেকে ইনস্টল করুন।
- **Azure Subscription** — Microsoft Foundry এবং Microsoft Foundry Agent Service এ অ্যাক্সেসের জন্য।
- **Microsoft Foundry Project** — একটি প্রকল্প যা মডেল ডিপ্লয় করেছে (যেমন, `gpt-4.1-mini`)। দেখুন [Step 1](#ধাপ-1-একটি-microsoft-foundry-প্রকল্প-তৈরি-করুন) নীচে।

আমরা এই রিপোজিটরির মূল ফোল্ডারে একটি `requirements.txt` ফাইল যোগ করেছি যা কোড নমুনা চালাতে প্রয়োজনীয় সব পাইথন প্যাকেজ রাখে।

আপনি টার্মিনালে নিম্নলিখিত কমান্ড রান করে এটি ইনস্টল করতে পারেন:

```bash|powershell
pip install -r requirements.txt
```

আমরা সুপারিশ করি পাইথন ভার্চুয়াল এনভায়রনমেন্ট তৈরি করুন যাতে কোনো সংঘাত এবং সমস্যা না হয়।

## VSCode সেটআপ

নিশ্চিত করুন যে আপনি VSCode-এ সঠিক পাইথন সংস্করণ ব্যবহার করছেন।

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry এবং Microsoft Foundry Agent Service সেটআপ করুন

### ধাপ 1: একটি Microsoft Foundry প্রকল্প তৈরি করুন

আপনাকে একটি Microsoft Foundry **হাব** এবং একটি **প্রকল্প** তৈরি করতে হবে যা একটি ডিপ্লয় করা মডেল ধারণ করে যাতে নোটবুকগুলো চালানো যায়।

1. [ai.azure.com](https://ai.azure.com) যান এবং আপনার Azure একাউন্ট দিয়ে সাইন ইন করুন।
2. একটি **হাব** তৈরি করুন (বা একটি বিদ্যমান হাব ব্যবহার করুন)। দেখুন: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)।
3. হাবের মধ্যে একটি **প্রকল্প** তৈরি করুন।
4. **Models + Endpoints** → **Deploy model** থেকে একটি মডেল (যেমন, `gpt-4.1-mini`) ডিপ্লয় করুন।

### ধাপ 2: আপনার প্রকল্পের এন্ডপয়েন্ট এবং মডেল ডিপ্লয়মেন্ট নাম পাওয়া

Microsoft Foundry পোর্টালে আপনার প্রকল্প থেকে:

- **প্রকল্প এন্ডপয়েন্ট** — **Overview** পেজে যান এবং এন্ডপয়েন্ট URL কপি করুন।

![Project Connection String](../../../translated_images/bn/project-endpoint.8cf04c9975bbfbf1.webp)

- **মডেল ডিপ্লয়মেন্ট নাম** — **Models + Endpoints** ট্যাবে যান, আপনার ডিপ্লয় করা মডেল সিলেক্ট করুন, তারপর **Deployment name** (যেমন, `gpt-4.1-mini`) নোট করুন।

### ধাপ 3: `az login` দিয়ে Azure এ সাইন ইন করুন

সব নোটবুক **`AzureCliCredential`** ব্যবহার করে অথেনটিকেশনের জন্য — কোনো API কী ব্যবস্থাপনা নেই। এর জন্য Azure CLI মাধ্যমে সাইন ইন থাকা আবশ্যক।

1. **Azure CLI ইনস্টল করুন** যদি এখনও না করে থাকেন: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **সাইন ইন করুন** রান করে:

    ```bash|powershell
    az login
    ```

    অথবা যদি আপনি কোনো রিমোট/কোডস্পেস পরিবেশে ব্রাউজার ছাড়া থাকেন:

    ```bash|powershell
    az login --use-device-code
    ```

3. **আপনার সাবস্ক্রিপশন সিলেক্ট করুন** যদি প্রম্পট দেয় — আপনার Foundry প্রকল্প যেটাতে রয়েছে সেটি নির্বাচন করুন।

4. **যাচাই করুন** আপনি সাইন ইন আছেন কিনা:

    ```bash|powershell
    az account show
    ```

> **কেন `az login`?** নোটবুকগুলো `azure-identity` প্যাকেজ থেকে `AzureCliCredential` ব্যবহার করে অথেনটিকেশন করে। এর মানে আপনার Azure CLI সেশনই ক্রেডেনশিয়াল প্রদান করে — আপনার `.env` ফাইলে কোনো API কী বা সিক্রেট থাকে না। এটি একটি [সিকিউরিটি সেরা অনুশীলন](https://learn.microsoft.com/azure/developer/ai/keyless-connections)।

### ধাপ 4: আপনার `.env` ফাইল তৈরি করুন

উদাহরণ ফাইল কপি করুন:

```bash
# জেডএসএইচ/ব্যাশ
cp .env.example .env
```

```powershell
# পাওয়ারশেল
Copy-Item .env.example .env
```

`.env` খুলে নিচের দুইটি মান পূরণ করুন:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| ভেরিয়েবল | কোথায় পাবেন |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry পোর্টাল → আপনার প্রকল্প → **Overview** পেজ |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry পোর্টাল → **Models + Endpoints** → আপনার ডিপ্লয়কৃত মডেলের নাম |

বেশিরভাগ লেসনের জন্য এটাই যথেষ্ট! নোটবুকগুলো স্বয়ংক্রিয়ভাবে আপনার `az login` সেশন থেকে অথেনটিকেট করবে।

### ধাপ 5: পাইথন ডিপেন্ডেন্সি ইনস্টল করুন

```bash|powershell
pip install -r requirements.txt
```

আমরা সুপারিশ করি এটি আগে তৈরি করা ভার্চুয়াল এনভায়রনমেন্টের ভিতরে রান করুন।

## লেসন ৫ (Agentic RAG) জন্য অতিরিক্ত সেটআপ

লেসন ৫ এ **Azure AI Search** ব্যবহৃত হয় retrieval-augmented generation এর জন্য। আপনি যদি ঐ লেসন চালাতে চান, `.env` ফাইলে নিচের ভেরিয়েবলগুলো যোগ করুন:

| ভেরিয়েবল | কোথায় পাবেন |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure পোর্টাল → আপনার **Azure AI Search** রিসোর্স → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure পোর্টাল → আপনার **Azure AI Search** রিসোর্স → **Settings** → **Keys** → প্রধান অ্যাডমিন কী |

## লেসন ৬ এবং ৮ যেগুলো Azure OpenAI সরাসরি কল করে তাদের জন্য অতিরিক্ত সেটআপ

কিছু নোটবুক লেসন ৬ এবং ৮ এ সরাসরি **Azure OpenAI** (Responses API) ব্যবহার করে, Microsoft Foundry প্রকল্প অতিক্রম করে। পূর্বে এই নমুনাগুলো GitHub Models ব্যবহার করতো, যা বাতিল হয়ে যাচ্ছে (জুলাই ২০২৬-এ) এবং Responses API সমর্থন করে না। আপনি যদি ঐ নমুনা চালাতে চান, `.env` ফাইলে নিচের ভেরিয়েবল যোগ করুন:

| ভেরিয়েবল | কোথায় পাবেন |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure পোর্টাল → আপনার **Azure OpenAI** রিসোর্স → **Keys and Endpoint** → Endpoint (যেমন: `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | আপনার ডিপ্লয়কৃত মডেলের নাম (যেমন: `gpt-4.1-mini`) যা Responses API সমর্থন করে |
| `AZURE_OPENAI_API_KEY` | ঐচ্ছিক — শুধুমাত্র যদি আপনি key-based auth ব্যবহার করেন `az login` / Entra ID ছাড়া |

> Responses API স্থিতিশীল `/openai/v1/` এন্ডপয়েন্ট ব্যবহার করে, তাই কোনো `api-version` প্রয়োজন নেই। keyless Entra ID authentication এর জন্য `az login` এ সাইন ইন করুন।

## বিকল্প প্রদানকারীর নাম: MiniMax (OpenAI-সামঞ্জস্যপূর্ণ)

[MiniMax](https://platform.minimaxi.com/) বড় প্রসঙ্গ মডেল ( সর্বোচ্চ ২০৪কে টোকেন পর্যন্ত) OpenAI-সামঞ্জস্যপূর্ণ API এর মাধ্যমে সরবরাহ করে। Microsoft Agent Framework এর `OpenAIChatClient` যেকোনো OpenAI-সামঞ্জস্যপূর্ণ এন্ডপয়েন্টের সাথে কাজ করে, এজন্য Azure OpenAI বা OpenAI এর পরিবর্তে আপনি MiniMax ব্যবহার করতে পারেন।

এই ভেরিয়েবলগুলো আপনার `.env` ফাইলে যোগ করুন:

| ভেরিয়েবল | কোথায় পাবেন |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | ব্যবহার করুন `https://api.minimax.io/v1` (ডিফল্ট মান) |
| `MINIMAX_MODEL_ID` | ব্যবহৃত মডেলের নাম (যেমন, `MiniMax-M3`) |

**উদাহরণ মডেল**: `MiniMax-M3` (সুপারিশকৃত), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (দ্রুত প্রতিক্রিয়া)। মডেলের নাম এবং ব্যবহারযোগ্যতা সময়ে সময়ে পরিবর্তিত হতে পারে, এবং আপনার অ্যাকাউন্ট বা অঞ্চলের উপর নির্ভর করে প্রবেশাধিকার সীমাবদ্ধ হতে পারে — বর্তমান তালিকা দেখতে [MiniMax Platform](https://platform.minimaxi.com/) চেক করুন। যদি `MiniMax-M3` আপনার অ্যাকাউন্টে না থাকে, তবে `MINIMAX_MODEL_ID` এমন কোনো মডেল দিন যার আপনি অ্যাক্সেস রাখেন (যেমন `MiniMax-M2.7`)।

যেসব কোড নমুনা `OpenAIChatClient` ব্যবহার করে (যেমন লেসন ১৪ হোটেল বুকিং ওয়ার্কফ্লো), সেগুলো `MINIMAX_API_KEY` সেট থাকলে স্বয়ংক্রিয়ভাবে আপনার MiniMax কনফিগারেশন সনাক্ত ও ব্যবহার করবে।

## বিকল্প প্রদানকারী: Foundry Local (ডিভাইসে মডেল চালান)

[Foundry Local](https://foundrylocal.ai) একটি হালকা রানটাইম যা OpenAI-সামঞ্জস্যপূর্ণ API এর মাধ্যমে ভাষার মডেলগুলো **সম্পূর্ণ আপনার কম্পিউটারে** ডাউনলোড, পরিচালনা এবং সার্ভ করে — কোনো ক্লাউড, কোনো Azure সাবস্ক্রিপশন, এবং কোনো API কীর প্রয়োজন নেই। এটি অফলাইন ডেভেলপমেন্ট, ক্লাউড খরচ ছাড়া পরীক্ষা-নিরীক্ষা, বা ডিভাইসেই ডেটা রাখা জন্য দুর্দান্ত।

Microsoft Agent Framework এর `OpenAIChatClient` যেহেতু যেকোনো OpenAI-সামঞ্জস্যপূর্ণ এন্ডপয়েন্টের সাথে কাজ করে, Foundry Local Azure OpenAI এর স্থানীয় বিকল্প।

**১. Foundry Local ইনস্টল করুন**

```bash
# উইন্ডোজ
winget install Microsoft.FoundryLocal

# ম্যাকওএস
brew install foundrylocal
```

**২. একটি মডেল ডাউনলোড ও রান করুন** (এটি স্থানীয় সার্ভিস রান করতেও শুরু করে):

```bash
foundry model list          # উপলব্ধ মডেলগুলি দেখুন
foundry model run phi-4-mini
```

**৩. পাইথন SDK ইনস্টল করুন** যা স্থানীয় এন্ডপয়েন্ট আবিষ্কার করতে ব্যবহৃত হয়:

```bash
pip install foundry-local-sdk
```

**৪. Microsoft Agent Framework-কে আপনার স্থানীয় মডেলের দিকে নির্দেশ করুন:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# মডেলটি স্থানীয়ভাবে ডাউনলোড (প্রয়োজনে) এবং পরিবেশন করে, তারপর এন্ডপয়েন্ট/পোর্ট আবিষ্কার করে।
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # উদাহরণ স্বরূপ http://localhost:<port>/v1
    api_key=manager.api_key,        # Foundry Local এর জন্য সর্বদা "not-required"
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **নোট:** Foundry Local একটি OpenAI-সামঞ্জস্যপূর্ণ **Chat Completions** এন্ডপয়েন্ট সরবরাহ করে। এটি স্থানীয় ডেভেলপমেন্ট এবং অফলাইন ব্যবহারের জন্য। পূর্ণ **Responses API** বৈশিষ্ট্যসমূহের জন্য (স্টেটফুল কথোপকথন, গভীর টুল অর্কেস্ট্রেশন ও এজেন্ট-স্টাইল ডেভেলপমেন্ট), Azure OpenAI বা **Microsoft Foundry** প্রকল্প লক্ষ্য করুন যেমন লেসনে দেখানো হয়েছে। বর্তমান মডেল ক্যাটালগ এবং প্ল্যাটফর্ম সমর্থনের জন্য [Foundry Local ডকুমেন্টেশন](https://foundrylocal.ai) দেখুন।


## পাঠ ৮ এর জন্য অতিরিক্ত সেটআপ (বিং গ্রাউন্ডিং ওয়ার্কফ্লো)

পাঠ ৮-এর শর্তযুক্ত ওয়ার্কফ্লো নোটবুকটি Microsoft Foundry এর মাধ্যমে **বিং গ্রাউন্ডিং** ব্যবহার করে। আপনি যদি সেই নমুনাটি চালানোর পরিকল্পনা করেন, তবে আপনার `.env` ফাইলে এই ভেরিয়েবলটি যোগ করুন:

| ভেরিয়েবল | কোথায় পাওয়া যাবে |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry পোর্টাল → আপনার প্রকল্প → **Management** → **Connected resources** → আপনার Bing সংযোগ → সংযোগ আইডি কপি করুন |

## সমস্যার সমাধান

### macOS এ SSL সার্টিফিকেট যাচাইকরণ ত্রুটি

আপনি যদি macOS এ থাকেন এবং নিম্নরূপ একটি ত্রুটি পান:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

এটি macOS এ পাইথনের একটি পরিচিত সমস্যা যেখানে সিস্টেম SSL সার্টিফিকেটগুলি স্বয়ংক্রিয়ভাবে বিশ্বাসযোগ্য হয় না। নিম্নলিখিত সমাধানগুলি ক্রম অনুযায়ী চেষ্টা করুন:

**বিকল্প ১: পাইথনের Install Certificates স্ক্রিপ্ট চালান (সুপারিশকৃত)**

```bash
# আপনার ইনস্টলকৃত পাইথন সংস্করণ দিয়ে 3.XX প্রতিস্থাপন করুন (যেমন, 3.12 অথবা 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**বিকল্প ২: আপনার নোটবুকে `connection_verify=False` ব্যবহার করুন (শুধুমাত্র GitHub Models নোটবুকগুলির জন্য)**

পাঠ ৬ এর নোটবুকে (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) একটি মন্তব্য আকারে ওয়ার্কঅ্যারাউন্ড ইতিমধ্যেই অন্তর্ভুক্ত আছে। ক্লায়েন্ট তৈরি করার সময় `connection_verify=False` আনকমেন্ট করুন:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # যদি আপনি সার্টিফিকেট ত্রুটি মুখোমুখি হন তবে SSL যাচাইকরণ অক্ষম করুন
)
```

> **⚠️ সতর্কতা:** SSL যাচাইকরণ নিষ্ক্রিয়করণ (`connection_verify=False`) সার্টিফিকেট যাচাইকরণ এড়িয়ে নিরাপত্তা কমায়। এটি শুধুমাত্র উন্নয়ন পরিবেশে অস্থায়ী করণীয় হিসেবে ব্যবহার করুন, কখনো উৎপাদন পরিবেশে নয়।

**বিকল্প ৩: `truststore` ইন্সটল ও ব্যবহার করুন**

```bash
pip install truststore
```

তারপর নেটওয়ার্ক কল করার আগে আপনার নোটবুক বা স্ক্রিপ্টের শীর্ষে নিম্নলিখিত যুক্ত করুন:

```python
import truststore
truststore.inject_into_ssl()
```

## কোথাও আটকে গেছেন?

যদি এই সেটআপ চালাতে কোনো সমস্যায় পড়েন, তাহলে আমাদের <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> এ যোগ দিন অথবা <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">একটি ইস্যু তৈরি করুন</a>।

## পরবর্তী পাঠ

আপনি এখন এই কোর্সের কোড চালানোর জন্য প্রস্তুত। এআই এজেন্টের জগত সম্পর্কে আরো শেখার জন্য শুভকামনা!

[এআই এজেন্ট এবং এজেন্ট ব্যবহারের পরিচিতি](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->