# कोर्स सेटअप

## परिचय

यस पाठले कसरी यस कोर्सका कोड नमुनाहरू चलाउने भन्ने कुरा समेट्नेछ।

## अन्य सिक्नेहरूमा सामेल हुनुहोस् र सहयोग प्राप्त गर्नुहोस्

तपाइँले आफ्नो रिपो क्लोन गर्न सुरु गर्नु अघि, सेटअप को कुनै पनि सहयोगका लागि, कोर्स सम्बन्धी कुनै पनि प्रश्नहरूका लागि, वा अन्य सिक्नेहरू संग जडान हुन [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) मा सामेल हुनुहोस्।

## यस रिपोलाई क्लोन वा फोर्क गर्नुहोस्

सुरु गर्न, कृपया GitHub रिपोजिटरीलाई क्लोन वा फोर्क गर्नुहोस्। यसले तपाईँलाई कोर्स सामग्रीको आफ्नो संस्करण बनाउन मद्दत गर्नेछ जसले तपाइँलाई कोड चलाउन, परीक्षण गर्न, र परिमार्जन गर्न सक्षम बनाउँछ!

यसलाई गर्न <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fork the repo</a> लिंकमा क्लिक गर्न सकिन्छ

अब तपाइँसँग यो कोर्सको आफ्नो फोर्क गरिएको संस्करण निम्न लिंकमा हुनु पर्छ:

![Forked Repo](../../../translated_images/ne/forked-repo.33f27ca1901baa6a.webp)

### शैलो क्लोन (कार्यशाला / Codespaces का लागि सिफारिस गरिएको)

  >जब तपाइँ सम्पूर्ण इतिहास र सबै फाइलहरू डाउनलोड गर्नुहुन्छ, पूरै रिपोजिटरी ठूलो (~3 GB) हुन सक्छ। यदि तपाइँ केवल कार्यशालामा सहभागी हुनुभएको छ वा केवल केही पाठ फोल्डरहरू चाहिन्छ भने, शैलो क्लोन (वा sparse clone) ले इतिहासलाई छोट्याएर र/वा ब्लोबहरू छोडेर अधिकांश डाउनलोडबाट बचाउँछ।

#### छिटो शैलो क्लोन — न्यूनतम इतिहास, सबै फाइलहरू

तलका आदेशहरूमा `<your-username>` लाई आफ्नो फोर्क URL (वा यदि चाहानुभएको हो भने अपस्ट्रीम URL) ले प्रतिस्थापन गर्नुहोस्।

केवल पछिल्लो कमिट इतिहास क्लोन गर्न (सानो डाउनलोड):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

विशेष शाखा क्लोन गर्न:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### आंशिक (sparse) क्लोन — न्यूनतम ब्लोबहरू + चयनित मात्र फोल्डरहरूले

यसले आंशिक क्लोन र sparse-checkout प्रयोग गर्छ (Git 2.25+ र partial clone समर्थन सहितको आधुनिक Git सिफारिस गरिएको):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

रिपो फोल्डरमा जानुहोस्:

```bash|powershell
cd ai-agents-for-beginners
```

त्यसपछि कुन फोल्डरहरू चाहिन्छ भनेर निर्दिष्ट गर्नुहोस् (तलको उदाहरणले दुई फोल्डर देखाउँछ):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

क्लोन र फाइलहरू प्रमाणित गरेपछि, यदि तपाइँलाई केवल फाइलहरू चाहिन्छ र स्थान खाली गर्न चाहनुहुन्छ (गिट इतिहास बिना), कृपया रिपोजिटरी मेटाडाटा मेटाउनुहोस् (💀अप्रतिवर्ती — तपाइँ सबै Git कार्यक्षमता गुमाउनुहुनेछ: कुनै कमिट, पुल, पुश, वा इतिहास पहुँच छैन)।

```bash
# zsh/bash
rm -rf .git
```

```powershell
# पावरशेल
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces प्रयोग गरिँदा (स्थानीय ठूलो डाउनलोडहरूबाट बच्न सिफारिस गरिएको)

- यस रिपोको लागि [GitHub UI](https://github.com/codespaces) मार्फत नयाँ Codespace सिर्जना गर्नुहोस्।

- नयाँ सिर्जना गरिएको codespace को टर्मिनलमा, माथिका कुनै पनि सन्तुलित शैलो/स्पार्स क्लोन आदेशहरू चलाएर केवल आवश्यक पाठ फोल्डरहरू Codespace कार्यक्षेत्रमा ल्याउन सक्नुहुन्छ।
- वैकल्पिक: Codespaces भित्र क्लोन गरेपछि, अधिक ठाउँ खाली गर्न .git मेट्न सक्नुहुन्छ (माथिका मेट्ने आदेशहरू हेर्नुहोस्)।
- नोट: यदि तपाइँ रिपोलाई सिधै Codespaces मा खोल्न चाहानुहुन्छ भने (अतिरिक्त क्लोन बिना), Codespaces ले devcontainer वातावरण निर्माण गर्नेछ र तपाईंलाई आवश्यक भन्दा बढी संसाधन प्रदान गर्न सक्छ। नयाँ Codespace भित्र शैलो क्लोनले डिस्क प्रयोगमा बढी नियन्त्रण दिन्छ।

#### सुझावहरू

- सम्पादन/कमिट गर्न चाहानुहुन्छ भने क्लोन URL सधैं फोर्क URL सँग प्रतिस्थापन गर्नुहोस्।
- पछि यदि थप इतिहास वा फाइलहरू चाहिन्छ भने, तिनीहरू प्राप्त गर्न वा sparse-checkout समायोजन गरेर थप फोल्डरहरू समावेश गर्न सक्नुहुन्छ।

## कोड चल्ने तरिका

यस कोर्सले AI एजेन्टहरू निर्माण गर्ने व्यावहारिक अनुभवका लागि जुपिटर नोटबुकहरूको श्रृंखला प्रस्ताव गर्दछ ।

कोड नमुनाहरूले **Microsoft Agent Framework (MAF)** प्रयोग गर्छन् `FoundryChatClient` सँग, जुन **Microsoft Foundry Agent Service V2** (Responses API) मा **Microsoft Foundry** मार्फत जडित हुन्छ।

सबै Python नोटबुकहरू `*-python-agent-framework.ipynb` नामले लेबल गरिएका छन्।

## आवश्यकताहरू

- Python 3.12+
  - **नोट**: यदि तपाइँसँग Python3.12 इन्स्टल छैन भने, कृपया इन्स्टल गर्नुहोस्। त्यसपछि python3.12 प्रयोग गरेर आफ्नो venv बनाउनुहोस् ताकि requirements.txt फाइलबाट सहि संस्करणहरू इन्स्टल होस्।
  
    >उदाहरण

    Python venv निर्देशिका बनाउनुहोस्:

    ```bash|powershell
    python -m venv venv
    ```

    त्यसपछि venv वातावरण एक्टिभेट गर्नुहोस्:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET प्रयोग गरियो भने, सुनिश्चित गर्नुहोस् कि [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) वा पछि भर्सन इन्स्टल छ। त्यसपछि तपाइँको इन्स्टल गरिएको .NET SDK संस्करण जाँच गर्नुहोस्:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — प्रमाणीकरणको लागि आवश्यक। [aka.ms/installazurecli](https://aka.ms/installazurecli) बाट इन्स्टल गर्नुहोस्।
- **Azure Subscription** — Microsoft Foundry र Microsoft Foundry Agent Service पहुँचका लागि।
- **Microsoft Foundry Project** — तैनाथ गरिएको मोडेल सहितको प्रोजेक्ट (जस्तै, `gpt-4.1-mini`)। हेर्नुहोस् [चरण 1](#चरण-1-microsoft-foundry-प्रोजेक्ट-सिर्जना-गर्नुहोस्) तल।

हामीले यस रिपोजिटरीको रुटमा `requirements.txt` फाइल समावेश गरेका छौँ जुन कोड नमुनाहरू चलाउन आवश्यक सबै Python प्याकेजहरू समावेश गर्दछ।

तपाइँले यसलाई रिपोजिटरीको रुटमा टर्मिनलमा निम्न आदेश चलाएर इन्स्टल गर्न सक्नुहुन्छ:

```bash|powershell
pip install -r requirements.txt
```

हामी सिफारिस गर्छौं कि कुनै पनि द्विविधा र समस्या टार्न Python भर्चुअल वातावरण सिर्जना गर्नुहोस्।

## VSCode सेटअप गर्नुहोस्

सुनिश्चित गर्नुहोस् कि तपाइँ VSCode मा सहि Python संस्करण प्रयोग गर्दै हुनुहुन्छ।

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry र Microsoft Foundry Agent Service सेटअप गर्नुहोस्

### चरण 1: Microsoft Foundry प्रोजेक्ट सिर्जना गर्नुहोस्

नोटबुकहरू चलाउन तपाइँलाई Microsoft Foundry **hub** र तैनाथ गरिएको मोडेल सहितको **project** आवश्यक छ।

1. [ai.azure.com](https://ai.azure.com) मा जानुहोस् र आफ्नो Azure खाताबाट साइन इन गर्नुहोस्।
2. एक **hub** सिर्जना गर्नुहोस् (वा पहिले देखि भएको प्रयोग गर्नुहोस्)। हेर्नुहोस्: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)।
3. हब भित्र एक **project** सिर्जना गर्नुहोस्।
4. **Models + Endpoints** → **Deploy model** बाट मोडेल तैनाथ गर्नुहोस् (जस्तै, `gpt-4.1-mini`)।

### चरण 2: आफ्नो प्रोजेक्टको Endpoint र Model Deployment नाम प्राप्त गर्नुहोस्

Microsoft Foundry पोर्टलमा आफ्नो प्रोजेक्टबाट:

- **Project Endpoint** — **Overview** पृष्ठमा जानुहोस् र endpoint URL कपी गर्नुहोस्।

![Project Connection String](../../../translated_images/ne/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — **Models + Endpoints** मा जानुहोस्, आफ्नो तैनाथ गरिएको मोडेल छनौट गर्नुहोस्, र **Deployment name** नोट गर्नुहोस् (जस्तै, `gpt-4.1-mini`)।

### चरण 3: Azure मा `az login` मार्फत साइन इन गर्नुहोस्

सबै नोटबुकहरूले प्रमाणीकरणका लागि **`AzureCliCredential`** प्रयोग गर्छन् — कुनै API कुञ्जीहरू व्यवस्थापन गर्न हुँदैन। यसले तपाइँले Azure CLI मार्फत साइन इन गर्न आवश्यक पर्छ।

1. **Azure CLI इन्स्टल गर्नुहोस्** यदि पहिले गरेको छैन भने: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **साइन इन** गर्न यो चलाउनुहोस्:

    ```bash|powershell
    az login
    ```

    वा यदि तपाइँ ब्राउजर बिना रिमोट/Codespace वातावरणमा हुनुहुन्छ भने:

    ```bash|powershell
    az login --use-device-code
    ```

3. **आवश्यक भएमा आफ्नो सदस्यता चयन गर्नुहोस्** — आफ्नो Foundry प्रोजेक्ट भएको सदस्यता छनौट गर्नुहोस्।

4. **सत्यापन गर्नुहोस्** तपाईँ साइन इन हुनुहुन्छ:

    ```bash|powershell
    az account show
    ```

> **किन `az login`?** नोटबुकहरूले `azure-identity` प्याकेजबाट `AzureCliCredential` प्रयोग गर्छन्। यसको मतलब तपाइँको Azure CLI सत्रले प्रमाणीकरण प्रदान गर्छ — तपाइँको `.env` फाइलमा कुनै API कुञ्जी वा गोप्य जानकारी हुँदैन। यो [सुरक्षा राम्रो अभ्यास](https://learn.microsoft.com/azure/developer/ai/keyless-connections) हो।

### चरण 4: आफ्नो `.env` फाइल सिर्जना गर्नुहोस्

उदाहरण फाइल कपी गर्नुहोस्:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# पावरशेल
Copy-Item .env.example .env
```

`.env` खोल्नुहोस् र यी दुई मानहरू भर्नुहोस्:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| चर | कहाँ फेला पार्ने |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry पोर्टल → तपाइँको प्रोजेक्ट → **Overview** पृष्ठ |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry पोर्टल → **Models + Endpoints** → तपाइँको तैनाथ गरिएको मोडेलको नाम |

त्यति नै अधिकांश पाठहरूको लागि! नोटबुकहरूले अपनेआप तपाइँको `az login` सत्रमार्फत प्रमाणीकरण गर्नेछ।

### चरण 5: Python Dependencies इन्स्टल गर्नुहोस्

```bash|powershell
pip install -r requirements.txt
```

हामी सिफारिस गर्छौं कि तपाइँले यसलाई पहिले सिर्जना गरेको भर्चुअल वातावरण भित्र चलाउनुहोस्।

## पाठ 5 को लागि थप सेटअप (Agentic RAG)

पाठ 5 ले **Azure AI Search** प्रयोग गर्छ retrieval-augmented generation का लागि। यदि तपाइँ यो पाठ चलाउन योजना बनाउनु भएको छ भने, यी चरहरू आफ्नो `.env` फाइलमा थप्नुहोस्:

| चर | कहाँ फेला पार्ने |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure पोर्टल → तपाइँको **Azure AI Search** स्रोत → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure पोर्टल → तपाइँको **Azure AI Search** स्रोत → **Settings** → **Keys** → प्राथमिक प्रशासक कुञ्जी |

## पाठहरू जसले Azure OpenAI सिधा कल गर्छ (पाठ 6 र 8)

पाठ 6 र 8 का केही नोटबुकहरू Microsoft Foundry प्रोजेक्ट मार्फत नजाई सिधै **Azure OpenAI** (Responses API प्रयोग गरेर) लाई कल गर्छन्। यी नमुनाहरू पहिले GitHub Models प्रयोग गर्थे, जुन अब अवसाद भईरहेको छ (जुलाई 2026 मा अवसान हुँदैछ) र Responses API समर्थन गर्दैन। यदि तपाइँ ती नमुनाहरू चलाउन योजना बनाउनु भएको छ भने, यी चरहरू आफ्नो `.env` फाइलमा थप्नुहोस्:

| चर | कहाँ फेला पार्ने |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure पोर्टल → तपाइँको **Azure OpenAI** स्रोत → **Keys and Endpoint** → Endpoint (जस्तै `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | तपाइँको तैनाथ गरिएको मोडेलको नाम (जस्तै `gpt-4.1-mini`) जुन Responses API समर्थन गर्छ |
| `AZURE_OPENAI_API_KEY` | वैकल्पिक — केवल यदि तपाइँ `az login` / Entra ID को सट्टा कुञ्जी आधारित प्रमाणीकरण प्रयोग गर्नुहुन्छ भने |

> Responses API स्थिर `/openai/v1/` endpoint प्रयोग गर्छ, त्यसैले कुनै `api-version` आवश्यक छैन। कुञ्जी रहित Entra ID प्रमाणीकरण प्रयोग गर्न `az login` मार्फत साइन इन गर्नुहोस्।

## वैकल्पिक प्रदायक: MiniMax (OpenAI अनुकूल)

[MiniMax](https://platform.minimaxi.com/) ले ठूलो सन्दर्भ मोडेलहरू (अधिकतम 204K टोकन्स) OpenAI अनुकूल API मार्फत प्रदान गर्दछ। Microsoft Agent Framework को `OpenAIChatClient` कुनै पनि OpenAI अनुकूल endpoint मा काम गर्छ, त्यसैले तपाइँ MiniMax लाई Azure OpenAI वा OpenAI को सट्टामा सजिलै प्रयोग गर्न सक्नुहुन्छ।

यी चरहरू आफ्नो `.env` फाइलमा थप्नुहोस्:

| चर | कहाँ फेला पार्ने |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API कुञ्जीहरू |
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1` (पूर्वनिर्धारित मान) प्रयोग गर्नुहोस् |
| `MINIMAX_MODEL_ID` | प्रयोग गर्न मोडेल नाम (जस्तै, `MiniMax-M3`) |

**उदाहरण मोडेलहरू**: `MiniMax-M3` (सिफारिस गरिएको), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (छिटो प्रतिक्रिया दिने)। मोडेल नाम र उपलब्धता समयसँग परिवर्तन हुन सक्छ, र तपाइँको खाता वा क्षेत्र अनुसार विभिन्न हुन सक्छ — हालको सूचीका लागि [MiniMax Platform](https://platform.minimaxi.com/) हेर्नुहोस्। यदि `MiniMax-M3` तपाइँको खातामा उपलब्ध छैन भने, तपाइँले पहुँच भएको कुनै मोडेल चयन गर्नुहोस् (जस्तै `MiniMax-M2.7`)।

`OpenAIChatClient` प्रयोग गर्ने कोड नमुनाहरू (जस्तै, पाठ 14 होटल बुकिंग कार्यप्रवाह) स्वचालित रूपमा तपाइँको MiniMax कन्फिगर देखेर `MINIMAX_API_KEY` सेट हुँदा त्यसलाई प्रयोग गर्नेछन्।

## वैकल्पिक प्रदायक: Foundry Local (डिभाइसमा मोडेलहरु चलाउनुहोस्)

[Foundry Local](https://foundrylocal.ai) एक हलुका रनटाइम हो जुन भाषिक मोडेलहरू **पूर्ण रूपमा आफ्नो मेसिनमा डाउनलोड, व्यवस्थापन, र सेवा गर्छ** OpenAI-अनुकूल API मार्फत — कुनै क्लाउड, Azure सदस्यता, वा API कुञ्जीहरू बिना। यो अफलाइन विकास, क्लाउड खर्च बिना प्रयोग, वा डाटा डिभाइसमै राख्नको लागि उत्कृष्ट विकल्प हो।

किनभने Microsoft Agent Framework को `OpenAIChatClient` कुनै पनि OpenAI-अनुकूल endpoint सँग काम गर्छ, Foundry Local Azure OpenAI को लागि स्थानीय विकल्प हो।

**1. Foundry Local इन्स्टल गर्नुहोस्**

```bash
# विन्डोज
winget install Microsoft.FoundryLocal

# म्याकओएस
brew install foundrylocal
```

**2. मोडेल डाउनलोड र चलाउनुहोस्** (यसले स्थानीय सेवा पनि सुरु गर्छ):

```bash
foundry model list          # उपलब्ध मोडेलहरू हेर्नुहोस्
foundry model run phi-4-mini
```

**3. Python SDK इन्स्टल गर्नुहोस्** जुन स्थानीय endpoint पत्ता लगाउन प्रयोग हुन्छ:

```bash
pip install foundry-local-sdk
```

**4. Microsoft Agent Framework लाई तपाइँको स्थानीय मोडेल तर्फ निर्देशित गर्नुहोस्:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# मोडेललाई आवश्यक परे डाउनलोड गरी स्थानीय रूपमा सेवा गर्छ, त्यसपछि अन्त बिन्दु/पोर्ट पत्ता लगाउँछ।
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # जस्तै http://localhost:<port>/v1
    api_key=manager.api_key,        # Foundry Local का लागि सधैं "आवश्यक छैन" ।
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **नोट:** Foundry Local ले OpenAI-अनुकूल **Chat Completions** endpoint खुला गर्दछ। यो स्थानीय विकास र अफलाइन केसहरूका लागि प्रयोग गर्नुहोस्। पूर्ण **Responses API** सुविधाका लागि (स्टेटफुल कुराकानीहरू, गहिरो उपकरण आयोजन, एजेन्ट-शैली विकास), Azure OpenAI वा Microsoft Foundry प्रोजेक्टलाई निशाना बनाउनुहोस् जस्तो कि पाठहरूमा देखाइएको छ। हालको मोडेल सूची र प्लेटफर्म समर्थनका लागि [Foundry Local documentation](https://foundrylocal.ai) हेर्नुहोस्।


## पाठ ८ (बिंग ग्राउन्डिङ् वर्कफ्लो) का लागि थप सेटअप

पाठ ८ मा रहेको सर्तसापेक्ष वर्कफ्लो नोटबुकले माइक्रोसफ्ट फाउन्ड्रीमार्फत **बिंग ग्राउन्डिङ्** प्रयोग गर्दछ। यदि तपाईं त्यो नमुना चलाउने योजना बनाउनु भएको छ भने, आफ्नो `.env` फाइलमा यो चर थप्नुहोस्:

| चर | कहाँ पाउने |
|----------|-----------------|
| `BING_CONNECTION_ID` | माइक्रोसफ्ट फाउन्ड्री पोर्टल → तपाईंको परियोजना → **Management** → **Connected resources** → तपाईंको बिंग कनेक्सन → कनेक्सन आईडी कपी गर्नुहोस् |

## समस्या समाधान

### macOS मा SSL प्रमाणपत्र प्रमाणीकरण त्रुटिहरू

यदि तपाईं macOS मा हुनुहुन्छ र यस्तो त्रुटि आउँछ भने:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

यो macOS मा पाइथनसँग सम्बन्धित ज्ञात समस्या हो जहाँ प्रणालीको SSL प्रमाणपत्रहरू स्वतः विश्वासयोग्य हुँदैनन्। तलका समाधानहरू क्रमशः प्रयास गर्नुहोस्:

**विकल्प १: पाइथनको Install Certificates स्क्रिप्ट चलाउनुहोस् (सिफारिस गरिन्छ)**

```bash
# 3.XX लाई तपाईंले स्थापना गरेको Python संस्करण (जस्तै, 3.12 वा 3.13) सँग बदल्नुहोस्:
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**विकल्प २: तपाईंको नोटबुकमा `connection_verify=False` प्रयोग गर्नुहोस् (मात्र GitHub Models नोटबुकहरूमा)**

पाठ ६ को नोटबुक (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) मा, एक कमेन्ट गरिएको समाधानले पहिले नै यो समावेश गरेको छ। क्लाइन्ट बनाउँदा `connection_verify=False` अनकमेन्ट गर्नुहोस्:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # प्रमाणपत्र त्रुटिहरू आएमा एसएसएल प्रमाणीकरण अक्षम गर्नुहोस्
)
```

> **⚠️ चेतावनी:** SSL प्रमाणीकरण अक्षम गर्दा (`connection_verify=False`) प्रमाणपत्र जाँच नगरेर सुरक्षा कम हुन्छ। विकास वातावरणमा अस्थायी समाधानको रूपमा मात्र प्रयोग गर्नुहोस्, उत्पादनमा कहिल्यै होइन।

**विकल्प ३: `truststore` इन्स्टल गरी प्रयोग गर्नुहोस्**

```bash
pip install truststore
```

त्यसपछि तपाईंको नोटबुक वा स्क्रिप्टको सुरुमा कुनै पनि नेटवर्क कल गर्नु अघि यो थप्नुहोस्:

```python
import truststore
truststore.inject_into_ssl()
```

## कतै अट्किनुभयो?

यदि तपाईंलाई यो सेटअप चलाउन कुनै समस्या छ भने, हाम्रो <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> मा सहभागी हुनुहोस् वा <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">issue सिर्जना गर्नुहोस्</a>।

## अर्को पाठ

अब तपाईं यो कोर्सको कोड चलाउन तयार हुनुहुन्छ। एआई एजेन्टहरूको संसारबारे थप जान्न सफल हुनुहोस्!

[एआई एजेन्टहरूको परिचय र एजेन्ट प्रयोग केसहरू](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->