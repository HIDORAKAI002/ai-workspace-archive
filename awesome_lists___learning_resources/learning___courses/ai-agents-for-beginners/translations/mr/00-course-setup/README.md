# कोर्स सेटअप

## परिचय

हा धडा या कोर्सच्या कोड नमुन्यांना कसा चालवायचा हे कव्हर करेल.

## इतर शिकणाऱ्यांशी जोडा आणि मदत मिळवा

आपल्या रेपोची क्लोनिंग सुरू करण्यापूर्वी, [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) मध्ये सामील व्हा जेणेकरून सेटअपसाठी कोणतीही मदत, कोर्सविषयी कोणतेही प्रश्न किंवा इतर शिकणाऱ्यांशी संपर्क साधता येईल.

## क्लोन करा किंवा या रेपोचा फोर्क करा

सुरुवात करण्यासाठी, कृपया GitHub रिपॉझिटरी क्लोन किंवा फोर्क करा. हे तुम्हाला या कोर्सच्या साहित्याची स्वतःची कॉपी प्रदान करेल ज्यामुळे तुम्ही कोड चालवू, तपासू आणि बदलू शकता!

हे <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">रेपो फोर्क करण्यासाठी</a> दिलेल्या लिंकवर क्लिक करून करता येऊ शकते.

आता तुमच्याकडे या कोर्सचे स्वतःचे फोर्क केलेले आवृत्ती खालील लिंकवर असायला हवे:

![Forked Repo](../../../translated_images/mr/forked-repo.33f27ca1901baa6a.webp)

### शॅलो क्लोन (वर्कशॉप / Codespaces साठी शिफारस केलेले)

  > पूर्ण रिपॉझिटरी पूर्ण इतिहास आणि सर्व फायलींचा डाउनलोड करताना मोठी (सुमारे 3 GB) असू शकते. जर तुम्ही फक्त वर्कशॉपमध्ये सहभागी होत असाल किंवा काहीच धड्यांचे फोल्डर्स हवे असतील तर, एक शॅलो क्लोन (किंवा एक sparse क्लोन) इतिहास कमी करून आणि/किंवा blobs वगळून बहुतांश डाउनलोड टाळते.

#### जलद शॅलो क्लोन — किमान इतिहास, सर्व फायली

खालील कमांड्समध्ये `<your-username>` तुमच्या फोर्क URL ने (किंवा उपस्ट्रीम URL वापरत असाल तर तो) बदला.

फक्त नवीनतम कमिट इतिहास क्लोन करण्यासाठी (लहान डाउनलोड):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

विशिष्ट शाखा क्लोन करण्यासाठी:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### आंशिक (sparse) क्लोन — किमान blobs + निवडलेले फोल्डर्सच

हे आंशिक क्लोन आणि sparse-checkout वापरते (Git 2.25+ आवश्यक असून आंशिक क्लोन समर्थन असलेला आधुनिक Git शिफारसीय आहे):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

रेपो फोल्डरमध्ये जा:

```bash|powershell
cd ai-agents-for-beginners
```

नंतर तुम्हाला हवे असलेले फोल्डर्स नमूद करा (खालील उदाहरण दोन फोल्डर्स दर्शवितो):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

क्लोनिंगनंतर आणि फायली तपासल्यानंतर, जर तुम्हाला फक्त फायली ह्या हव्या असतील आणि जागा मोकळी करायची असेल (कोणताही Git इतिहास नको असेल), तर कृपया रेपॉझिटरी मेटाडेटा हटवा (💀परत येणारे नाही — सर्व Git कार्यक्षमता कमिट्स, पुल्स, पुशेस किंवा इतिहासाचा प्रवेश गमावाल).

```bash
# झश/बॅश
rm -rf .git
```

```powershell
# पॉवरशेल
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces वापरणे (स्थानिक मोठा डाउनलोड टाळण्यासाठी शिफारस केलेले)

- या रेपो साठी नवीन Codespace [GitHub UI](https://github.com/codespaces) च्या माध्यमातून तयार करा.  

- नव्या तयार केलेल्या codespace च्या टर्मिनलमध्ये, वरील shallow/sparse क्लोन कमांडपैकी एक चालवा जेणेकरून फक्त आवश्यक धड्यांचे फोल्डर्स Codespace कार्यक्षेत्रात आणता येतील.
- पर्यायी: Codespaces मध्ये क्लोनिंगनंतर, .git हटवा अधिक जागा मोकळी करण्यासाठी (वरील हटवण्याच्या कमांड्स पहा).
- नोंद: जर तुम्हाला रेपो थेट Codespaces मध्ये उघडायचा असेल (अतिरिक्त क्लोन शिवाय), तर लक्षात ठेवा Codespaces devcontainer वातावरण तयार करेल आणि कदाचित तुम्हाला हवे असल्यापेक्षा अधिक साधने पुरवेल. नवीन Codespace मध्ये शॅलो प्रत क्लोन केल्यास डिस्क वापरावर अधिक नियंत्रण मिळते.

#### टिपा

- जर तुम्हाला एडिट किंवा कमिट करायचा असेल तर नेहमी क्लोन URL तुमच्या फोर्कने बदला.
- नंतर जर तुलनेने अधिक इतिहास किंवा फायली पाहिजेत तर तुम्ही fetch करू शकता किंवा sparse-checkout मध्ये अतिरिक्त फोल्डर्स समाविष्ट करू शकता.

## कोड चालविणे

हा कोर्स तुम्हाला AI एजंट्स तयार करण्याचा व्यावहारिक अनुभव मिळवण्यासाठी एक मालिकेचे Jupyter नोटबुक्स प्रदान करतो ज्यांना तुम्ही चालवू शकता.

कोड नमुने **Microsoft Agent Framework (MAF)** वापरतात ज्यामध्ये `FoundryChatClient` आहे, जो **Microsoft Foundry Agent Service V2** (Responses API) शी **Microsoft Foundry** द्वारे जोडतो.

सर्व Python नोटबुक्सवर `*-python-agent-framework.ipynb` असे लेबल असते.

## आवश्यकताः

- Python 3.12+
  - **नोट:** तुमच्याकडे Python 3.12 इंस्टॉल नसेल, तर हे इंस्टॉल करा. नंतर तुमचे venv python3.12 वापरून तयार करा जेणेकरून requirements.txt फायलीतील योग्य आवृत्त्या इंस्टॉल होतील.
  
    >उदाहरण

    Python venv डायरेक्टरी तयार करा:

    ```bash|powershell
    python -m venv venv
    ```

    नंतर venv पर्यावरण सक्रिय करा:

    ```bash
    # झश/बॅश
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET वापरलेल्या नमुना कोडसाठी, [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) किंवा नंतरचा आवृत्ती इंस्टॉल करा. नंतर तुमच्या इंस्टॉल केलेल्या .NET SDK आवृत्ती तपासा:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — प्रमाणीकरणासाठी आवश्यक. [aka.ms/installazurecli](https://aka.ms/installazurecli) येथून इंस्टॉल करा.
- **Azure Subscription** — Microsoft Foundry आणि Microsoft Foundry Agent Service ऍक्सेससाठी.
- **Microsoft Foundry Project** — एक प्रोजेक्ट ज्यामध्ये डिप्लॉय केलेला मॉडेल आहे (उदा., `gpt-4.1-mini`). बघा: [Step 1](#चरण-1-microsoft-foundry-प्रोजेक्ट-तयार-करा) खाली.

आम्ही या रिपॉझिटरीच्या मूळ फोल्डरमध्ये `requirements.txt` फायली समाविष्ट केली आहे ज्यात कोड नमुन्यांना चालवण्यासाठी आवश्यक सर्व Python पॅकेजेस आहेत.

तुम्ही त्या फायली तुमच्या टर्मिनलमध्ये खालील कमांड चालवून इंस्टॉल करू शकता:

```bash|powershell
pip install -r requirements.txt
```

आम्ही कोणत्याही संघर्षांपासून आणि समस्यांपासून टाळण्यासाठी Python वर्चुअल एन्व्हायर्नमेंट तयार करण्याची शिफारस करतो.

## VSCode सेटअप करा

तुम्ही VSCode मध्ये योग्य Python आवृत्ती वापरत आहात हे खात्री करा.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry आणि Microsoft Foundry Agent Service सेटअप करा

### चरण 1: Microsoft Foundry प्रोजेक्ट तयार करा

तुम्हाला नोटबुक्स चालवण्यासाठी Microsoft Foundry **हब** आणि **प्रोजेक्ट** आवश्यक आहे ज्यात डिप्लॉय केलेला मॉडेल आहे.

1. [ai.azure.com](https://ai.azure.com) येथे जा आणि तुमच्या Azure खात्याने साइन इन करा.
2. एक **हब** तयार करा (किंवा आधीचा वापरा). बघा: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. हबमध्ये एक **प्रोजेक्ट** तयार करा.
4. **Models + Endpoints** → **Deploy model** या विभागातून मॉडेल डिप्लॉय करा (उदा. `gpt-4.1-mini`).

### चरण 2: तुमच्या प्रोजेक्टचा Endpoint आणि मॉडेल डिप्लॉयमेंट नाव मिळवा

Microsoft Foundry पोर्टलमधून तुमच्या प्रोजेक्टमध्ये:

- **Project Endpoint** — **Overview** पृष्ठावर जा आणि endpoint URL कॉपी करा.

![Project Connection String](../../../translated_images/mr/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — **Models + Endpoints** मध्ये जा, तुमचा डिप्लॉय मॉडेल निवडा, आणि **Deployment name** लिहा (उदा., `gpt-4.1-mini`).

### चरण 3: `az login` वापरून Azure मध्ये साइन इन करा

सर्व नोटबुक्स प्रमाणीकरणासाठी **`AzureCliCredential`** वापरतात — API कीज व्यवस्थापित करण्याची गरज नाही. यासाठी तुम्हाला Azure CLI मध्ये साइन इन करणे आवश्यक आहे.

1. **Azure CLI इंस्टॉल करा** जर तुम्ही अद्याप केले नसेल तर: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **साइन इन** करा:

    ```bash|powershell
    az login
    ```

    किंवा जर तुम्ही रिमोट/Codespace वातावरणात ब्राऊझरशिवाय आहात:

    ```bash|powershell
    az login --use-device-code
    ```

3. **तुमची सबस्क्रिप्शन निवडा** जर काही विचारले तर — ज्यामध्ये Foundry प्रोजेक्ट आहे ती निवडा.

4. **तुम्ही साइन इन केले आहात का याची तपासणी करा:**

    ```bash|powershell
    az account show
    ```

> **का `az login`?** नोटबुक्स `azure-identity` पॅकेजमधील `AzureCliCredential` वापरून प्रमाणीकरण करतात. यात तुमच्या Azure CLI सत्रामुळे क्रेडेन्शियल्स पुरवले जातात — `.env` फाईलमध्ये कोणत्याही API कीज किंवा सीक्रेट्सची गरज नाही. हे एक [सुरक्षेचा उत्तम उपाय](https://learn.microsoft.com/azure/developer/ai/keyless-connections) आहे.

### चरण 4: तुमची `.env` फाइल तयार करा

उदाहरण फाइल कॉपी करा:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# पॉवरशेल
Copy-Item .env.example .env
```

`.env` उघडा आणि खालील दोन मूल्ये भरा:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| व्हेरिएबल | कुठे शोधायचे |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry पोर्टल → तुमचा प्रोजेक्ट → **Overview** पृष्ठ |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry पोर्टल → **Models + Endpoints** → तुमचा डिप्लॉय केलेला मॉडेलचे नाव |

बहुतांश धड्यांसाठी एवढेच! नोटबुक्स आपोआप तुमच्या `az login` सत्राद्वारे प्रमाणीकरण करतील.

### चरण 5: Python अवलंबित्वे इंस्टॉल करा

```bash|powershell
pip install -r requirements.txt
```

आम्ही शिफारस करतो की ही कमांड तुम्ही आधी तयार केलेल्या वर्चुअल एन्व्हायर्नमेंटमध्ये चालवा.

## धडा 5 (Agentic RAG) साठी अतिरिक्त सेटअप

धडा 5 मध्ये **Azure AI Search** वापरले जाते retrieval-augmented generation साठी. जर तुम्ही तो धडा चालविण्याचा विचार करत असाल, तर या व्हेरिएबल `.env` फाइलमध्ये जोडा:

| व्हेरिएबल | कुठे शोधायचे |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure पोर्टल → तुमचा **Azure AI Search** रिसोर्स → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure पोर्टल → तुमचा **Azure AI Search** रिसोर्स → **Settings** → **Keys** → प्राथमिक अॅडमिन की |

## थेट Azure OpenAI कॉल करणारे धडे (धडे 6 आणि 8) साठी अतिरिक्त सेटअप

काही नोटबुक्स धडे 6 आणि 8 मध्ये थेट **Azure OpenAI** कॉल करतात (Responses API वापरून) ज्याऐवजी Microsoft Foundry प्रोजेक्ट वापरण्याऐवजी. हे नमुने GitHub Models वापरत होते, जे आता जुने झाले आहे (जुलै 2026 मध्ये बंद होणार) आणि Responses API ला सपोर्ट करत नाही. जर तुम्ही हे नमुने वापरण्याचा विचार करत असाल तर या व्हेरिएबल `.env` मध्ये जोडा:

| व्हेरिएबल | कुठे शोधायचे |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure पोर्टल → तुमचा **Azure OpenAI** रिसोर्स → **Keys and Endpoint** → Endpoint (उदा. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | तुमच्या डिप्लॉय केलेल्या मॉडेलचे नाव (उदा., `gpt-4.1-mini`) जे Responses API सपोर्ट करते |
| `AZURE_OPENAI_API_KEY` | पर्यायी — के-आधारित प्रमाणीकरण वापरत असल्यास, जर तुम्ही `az login` / Entra ID ऐवजी वापरत असाल तर |

> Responses API स्थिर `/openai/v1/` endpoint वापरते, त्यामुळे `api-version` आवश्यक नाही. कीलेस Entra ID प्रमाणीकरणासाठी `az login` सह साइन इन करा.

## पर्यायी सेवा पुरवठादार: MiniMax (OpenAI-सुसंगत)

[MiniMax](https://platform.minimaxi.com/) मोठ्या-कॉन्टेक्स्ट मॉडेल्स (पर्यंत 204K टोकन्स) OpenAI-सुसंगत API द्वारे पुरवतो. Microsoft Agent Framework चा `OpenAIChatClient` कोणत्याही OpenAI-सुसंगत endpoint सोबत काम करतो, त्यामुळे MiniMax वापरून तुम्ही Azure OpenAI किंवा OpenAI ऐवजी त्याचा पर्याय म्हणून वापरू शकता.

या व्हेरिएबल `.env` फाइलमध्ये जोडा:

| व्हेरिएबल | कुठे शोधायचे |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | वापरा `https://api.minimax.io/v1` (डिफॉल्ट मूल्य) |
| `MINIMAX_MODEL_ID` | वापरायचे मॉडेल नाव (उदा., `MiniMax-M3`) |

**उदाहरण मॉडेल्स**: `MiniMax-M3` (शिफारस केलेले), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (लवकर प्रतिसाद). मॉडेल नावे आणि उपलब्धता वेळेनुसार बदलू शकते, आणि तुमच्या खात्यावर किंवा प्रदेशावर अवलंबून असते — सध्याची यादी पाहण्यासाठी [MiniMax Platform](https://platform.minimaxi.com/) पहा. जर तुमच्या खात्याला `MiniMax-M3` उपलब्ध नसेल, तर `MINIMAX_MODEL_ID` मध्ये तुमच्या उपलब्ध मॉडेलचे नाव वापरा (उदा. `MiniMax-M2.7`).

`OpenAIChatClient` वापरता येणार्‍या कोड नमुन्यांना (उदा., धडा 14 हॉटेल बुकिंग कार्यप्रवाह) तुमची MiniMax कॉन्फिगरेशन `MINIMAX_API_KEY` सेट केल्यावर आपोआप ओळखेल आणि वापरेल.

## पर्यायी सेवा पुरवठादार: Foundry Local (मॉडेल्स ऑन-डिव्हाइस चालवा)

[Foundry Local](https://foundrylocal.ai) एक हलक्या प्रकारचा रनटाइम आहे जो भाषा मॉडेल्स पूर्णपणे तुमच्या स्वतःच्या संगणकावर डाउनलोड, व्यवस्थापित आणि सर्व्ह करतो OpenAI-सुसंगत API द्वारे — कोणतेही क्लाउड, Azure सदस्यता, आणि API कीज नाहीत. ऑफलाइन विकासासाठी, क्लाउड खर्चांशिवाय प्रयोग करण्यासाठी, किंवा डेटा डिव्हाइसवर ठेवण्यासाठी हा एक उत्तम पर्याय आहे.

Microsoft Agent Framework चा `OpenAIChatClient` कोणत्याही OpenAI-सुसंगत endpoint सोबत काम करतो, म्हणून Foundry Local ही Azure OpenAI चा स्थानिक पर्याय आहे.

**1. Foundry Local इंस्टॉल करा**

```bash
# विंडोज
winget install Microsoft.FoundryLocal

# मॅकओएस
brew install foundrylocal
```

**2. एक मॉडेल डाउनलोड करा आणि चालवा** (हे स्थानिक सेवा देखील सुरू करते):

```bash
foundry model list          # उपलब्ध मॉडेल पहा
foundry model run phi-4-mini
```

**3. Python SDK इंस्टॉल करा** जे स्थानिक endpoint शोधण्यास वापरले जाते:

```bash
pip install foundry-local-sdk
```

**4. Microsoft Agent Framework ला तुमच्या स्थानिक मॉडेलकडे निर्देशित करा:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# मॉडेल स्थानिकरित्या डाउनलोड करते (जर आवश्यक असेल तर) आणि सर्व्ह करते, नंतर एंडपॉइंट/पोर्ट शोधतो.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # उदा. http://localhost:<port>/v1
    api_key=manager.api_key,        # फाउंड्री लोकलसाठी नेहमीच "आवश्यक नाही"
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **टीप:** Foundry Local एक OpenAI-सुसंगत **Chat Completions** endpoint उपलब्ध करते. स्थानिक विकास आणि ऑफलाइन परिस्थितींमध्ये त्याचा वापर करा. पूर्ण **Responses API** वैशिष्ट्यांसाठी (स्थितीय संवाद, सखोल टूल ऑर्केस्ट्रेशन, एजंट-शैली विकास) Azure OpenAI किंवा Microsoft Foundry प्रोजेक्ट वापरा ज्याप्रमाणे धड्यांमध्ये दाखवले आहे. सध्याचा मॉडेल सूची आणि प्लॅटफॉर्म सपोर्टसाठी [Foundry Local दस्तऐवज](https://foundrylocal.ai) पहा.


## धडा ८ साठी अतिरिक्त सेटअप (बिंग ग्राउंडिंग वर्कफ्लो)

धडा ८ मधील अटांवर आधारित वर्कफ्लो नोटबुक Microsoft Foundry द्वारे **बिंग ग्राउंडिंग** वापरते. जर तुम्ही तो नमुना चालवण्याचा विचार करत असाल, तर तुमच्या `.env` फाईलमध्ये हा व्हेरिएबल जोडा:

| व्हेरिएबल | कुठे सापडेल |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry पोर्टल → तुमचा प्रोजेक्ट → **Management** → **Connected resources** → तुमचा Bing कनेक्शन → कनेक्शन आयडी कॉपी करा |

## समस्यांचे निराकरण

### macOS वर SSL प्रमाणपत्र सत्यापन त्रुटी

जर तुम्ही macOS वापरत असाल आणि अशा त्रुटीचा सामना करत असाल:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

हे macOS वर Python सह ज्ञात समस्या आहे जिथे सिस्टम SSL प्रमाणपत्रे आपोआप विश्वासार्ह समजली जात नाहीत. खालील उपाय क्रमाने वापरून पाहा:

**पर्याय १: Python ची Install Certificates स्क्रिप्ट चालवा (शिफारस केलेले)**

```bash
# 3.XX हे आपल्या स्थापित केलेल्या Python आवृत्तीने बदला (उदा., 3.12 किंवा 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**पर्याय २: तुमच्या नोटबुकमध्ये `connection_verify=False` वापरा (फक्त GitHub Models नोटबुकसाठी)**

धडा ६ च्या नोटबुकमध्ये (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) एक कॉमेंट केलेली तोडगा आधीच समाविष्ट आहे. क्लायंट तयार करताना `connection_verify=False` अनकॉमेंट करा:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # प्रमाणपत्राच्या त्रुटी आल्यास SSL पडताळणी अक्षम करा
)
```

> **⚠️ इशारा:** SSL सत्यापन अक्षम केल्याने (`connection_verify=False`) सुरक्षा कमी होते कारण प्रमाणपत्र सत्यापन वगळले जाते. विकास वातावरणासाठी तात्पुरता उपाय म्हणून याचा वापर करा, उत्पादनात कधीही नाही.

**पर्याय ३: `truststore` इन्स्टॉल करा आणि वापरा**

```bash
pip install truststore
```

मग तुमच्या नोटबुक किंवा स्क्रिप्टमध्ये कोणतीही नेटवर्क कॉल करण्यापूर्वी पुढील कोड टाका:

```python
import truststore
truststore.inject_into_ssl()
```

## कुठेतरी अडकला आहात?

जर तुम्हाला हा सेटअप चालवताना काही अडचणी आल्या तर आमच्या <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> मध्ये सामील व्हा किंवा <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">एक समस्या तयार करा</a>.

## पुढील धडा

तुम्ही आता या अभ्यासक्रमासाठी कोड चालवण्यासाठी तयार आहात. AI एजंट्सच्या जगाबद्दल अधिक शिकण्यात आनंद घ्या!

[AI एजंट्स आणि एजंट वापर प्रकरणांची ओळख](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->