# कोर्स सेटअप

## परिचय

हा धडा या कोर्समधील कोड नमुन्यांना कसे चालवायचे हे समजावून सांगेल.

## इतर शिक्षणार्थ्यांमध्ये सामील व्हा आणि मदत घ्या

तुमचा रिपॉ क्लोन करण्यापूर्वी, सेटअपसाठी काही मदत, कोर्ससंबंधी प्रश्न किंवा इतर शिक्षणार्थ्यांशी जोडण्यासाठी [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) मध्ये सामील व्हा.

## हा रिपॉ क्लोन किंवा फोर्क करा

सुरुवात करण्यासाठी, कृपया GitHub रिपॉजिटरी क्लोन किंवा फोर्क करा. यामुळे तुम्हाला कोर्स सामग्रीचा आपला स्वतःचा आवृत्ती मिळेल ज्यामुळे तुम्ही कोड चालवू, चाचणी करू आणि सुधारणा करू शकता!

हे <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">repo फोर्क करण्यासाठी</a> लिंकवर क्लिक करून केले जाऊ शकते.

आता तुमच्याकडे खालील लिंकवर या कोर्सची तुमची स्वतःची फोर्क केलेली आवृत्ती असावी:

![Forked Repo](../../../translated_images/mr/forked-repo.33f27ca1901baa6a.webp)

### शॅलो क्लोन (वर्कशॉप / कोडस्पेसेस साठी शिफारस केलेले)

> संपूर्ण रिपॉजिटरी पूर्ण इतिहास आणि सर्व फायली डाउनलोड केल्यास मोठी (~3 GB) असू शकते. तुम्ही केवळ वर्कशॉपला जात असाल किंवा काहीच धड्याच्या फोल्डर्सची गरज असेल तर शॅलो क्लोन (किंवा sparse clone) इतिहास कमी करून किंवा ब्लॉब्स वगळून डाउनलोडचा बराच भाग टाळते.

#### जलद शॅलो क्लोन — कमीतकमी इतिहास, सर्व फायली

खालील आज्ञांमध्ये `<your-username>` बदला तुमच्या फोर्क URL (किंवा अपस्ट्रीम URL जर तुम्हाला आवडला तर) ने.

फक्त नवीनतम कमिट इतिहास क्लोन करण्यासाठी (छोटा डाउनलोड):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

विशिष्ट शाखा क्लोन करण्यासाठी:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### अंशतः (sparse) क्लोन — कमीतकमी ब्लॉब्स + फक्त निवडलेल्या फोल्डर्स

हे partial clone आणि sparse-checkout वापरते (Git 2.25+ आवश्यक आणि modern Git सह partial clone समर्थनासाठी शिफारस केली जाते):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

रिपॉ फोल्डरमध्ये जा:

```bash|powershell
cd ai-agents-for-beginners
```

नंतर कोणत्या फोल्डर्स हव्यात ते ठरवा (खाली उदाहरण दहा फोल्डर्स दाखवते):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

क्लोन केल्यावर आणि फायली तपासल्यावर, तुम्हाला केवळ फायली हव्या असतील आणि जागा मोकळी करायची असेल (कोणताही git इतिहास नको असाल) तर रिपॉ मेटाडेटा काढून टाका (💀परत मिळणार नाही — सर्व Git कार्यक्षमता गमावाल: कमिट्स, पुल्स, पुशेस, किंवा इतिहास पाहता येणार नाही).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# पॉवरशेल
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces वापरून (स्थानिक मोठे डाउनलोड टाळण्यासाठी शिफारस)

- या रिपॉसाठी नवीन Codespace GitHub UI वरून तयार करा ([GitHub UI](https://github.com/codespaces)).

- नव्याने तयार Codespace च्या टर्मिनलमध्ये वरील शॅलो/स्पार्स क्लोन कमांडपैकी एक वापरून फक्त आवश्यक धड्यांचे फोल्डर्स Codespace कार्यक्षेत्रात आणा.
- ऐच्छिक: Codespaces मध्ये क्लोन केल्यानंतर .git काढून अतिरिक्त जागा रिक्त करा (वरील काढण्याच्या आज्ञा पहा).
- नोंद: जर तुम्हाला अतिरिक्त क्लोन न करता थेट Codespaces मध्ये repo उघडायचा असेल, तर लक्षात घ्या की Codespaces devcontainer वातावरण तयार करेल आणि कदाचित तुमच्या गरजेपेक्षा जास्त पुरवठा करेल. नवीन Codespace मध्ये शॅलो कॉपी क्लोन केल्यास डिस्कचा उपयोग अधिक नियंत्रित करता येतो.

#### टीप

- एखादी आवृत्ती सुधारित/कमिट करण्यासाठी नेहमी क्लोन URL तुमच्या फोर्कने बदला.
- नंतर अधिक इतिहास किंवा फायली हव्या असतील तर तुम्ही त्यांना fetch करू शकता किंवा sparse-checkout समायोजित करू शकता अधिक फोल्डर्स समाविष्ट करण्यासाठी.

## कोड चालवणे

हा कोर्स काही Jupyter नोटबुक्स ऑफर करतो ज्यांना तुम्ही चालवून AI एजंट्स तयार करण्याचा सराव मिळवू शकता.

कोड नमुने **Microsoft Agent Framework (MAF)** वापरतात, ज्यामध्ये `AzureAIProjectAgentProvider` वापरला जातो, जो **Azure AI Agent Service V2** (Responses API) शी **Microsoft Foundry** द्वारे जोडलेला आहे.

सर्व Python नोटबुक्स `*-python-agent-framework.ipynb` मध्ये चिन्हांकित आहेत.

## आवश्यकताः

- Python 3.12+
  - **टीप:** जर तुमच्याकडे Python3.12 स्थापित नसेल, तर ते स्थापित करा. नंतर `python3.12` वापरून तुमचा venv तयार करा जेणेकरुन `requirements.txt` मधील योग्य आवृत्त्या स्थापित होतील.

    >उदाहरण

    Python venv डिरेक्टरी तयार करा:

    ```bash|powershell
    python -m venv venv
    ```

    त्यानंतर venv environment सक्रिय करा:

    ```bash
    # झश/बॅश
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET वापरणाऱ्या नमुना कोडसाठी, [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) किंवा नंतरचे आवृत्ती स्थापित करा. नंतर तुमची .NET SDK आवृत्ती तपासा:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — प्रमाणीकरणासाठी आवश्यक. [aka.ms/installazurecli](https://aka.ms/installazurecli) येथेून इंस्टॉल करा.
- **Azure Subscription** — Microsoft Foundry आणि Azure AI Agent Service च्या ऍक्सेससाठी.
- **Microsoft Foundry Project** — तैनात केलेला मॉडेल असलेला प्रोजेक्ट (उदा.: `gpt-4o`). [Step 1](#टप्पा-1-microsoft-foundry-प्रोजेक्ट-तयार-करा) खाली पहा.

या रिपॉच्या मूळ फोल्डरमध्ये `requirements.txt` फाइल समाविष्ट आहे ज्यात कोड नमुने चालवण्यासाठी आवश्यक सर्व Python पॅकेजेस आहेत.

तुम्ही रिपॉच्या मूळ टर्मिनलमध्ये खालील आदेश वापरून त्यांना स्थापित करू शकता:

```bash|powershell
pip install -r requirements.txt
```

कोणत्याही संघर्ष किंवा अडचणी टाळण्यासाठी Python virtual environment तयार करण्याची शिफारस केली आहे.

## VSCode सेटअप करा

VSCode मध्ये योग्य Python आवृत्ती वापरत असल्याची खात्री करा.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry आणि Azure AI Agent Service सेटअप करा

### टप्पा 1: Microsoft Foundry प्रोजेक्ट तयार करा

नोटबुक्स चालवण्यासाठी Azure AI Foundry मध्ये **hub** आणि **project** आवश्यक आहे ज्यात तैनात मॉडेल असलेले.

1. [ai.azure.com](https://ai.azure.com) येथे जा आणि Azure खात्याने साइन इन करा.
2. एक **hub** तयार करा (किंवा विद्यमान वापरा). पहा: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. हबमध्ये एक **project** तयार करा.
4. मॉडेल तैनात करा (उदा. `gpt-4o`) – **Models + Endpoints** → **Deploy model** मध्ये जा.

### टप्पा 2: प्रोजेक्ट endpoint आणि मॉडेल तैनात नाव प्राप्त करा

Microsoft Foundry पोर्टल मधील तुमच्या प्रोजेक्टमधून:

- **Project Endpoint** — **Overview** पृष्ठावर जा आणि endpoint URL कॉपी करा.

![Project Connection String](../../../translated_images/mr/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — **Models + Endpoints** मध्ये जा, तुमचा तैनात मॉडेल निवडा आणि **Deployment name** (उदा. `gpt-4o`) लक्षात ठेवा.

### टप्पा 3: `az login` वापरून Azure मध्ये साइन इन करा

सर्व नोटबुक्स प्रमाणीकरणासाठी **`AzureCliCredential`** वापरतात — API कीज व्यवस्थापित करण्याची गरज नाही. यासाठी तुम्ही Azure CLI द्वारे साइन इन असणे आवश्यक आहे.

1. **Azure CLI इंस्टॉल करा** (जर आधीच नसेल तर): [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **साइन इन करा**:

    ```bash|powershell
    az login
    ```

    किंवा तुम्ही रिमोट/Codespace एखाद्या ब्राउझरशिवाय असाल तर:

    ```bash|powershell
    az login --use-device-code
    ```

3. **सदस्यता निवडा** (जर विचारले तर) — ज्या सदस्यतेमध्ये तुमचा Foundry प्रोजेक्ट आहे ते निवडा.

4. **साइन इन तपासा**:

    ```bash|powershell
    az account show
    ```

> **`az login` का?** नोटबुक्स `AzureCliCredential` वापरून प्रमाणीकरण करतात जे `azure-identity` पॅकेजचा भाग आहे. याचा अर्थ तुमच्या Azure CLI सत्रातून क्रेडेन्शियल्स मिळतात — .env फाईलमध्ये कुठलीही API की किंवा गुपिते नसतात. हे एक [सुरक्षिततेचा सर्वोत्तम सराव](https://learn.microsoft.com/azure/developer/ai/keyless-connections) आहे.

### टप्पा 4: तुमचा `.env` फाइल तयार करा

उदाहरण फाइल कॉपी करा:

```bash
# झश/बॅश
cp .env.example .env
```

```powershell
# पॉवरशेल
Copy-Item .env.example .env
```

`.env` उघडा आणि खालील दोन मूल्ये भरा:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| बदलणारा | कुठे सापडेल |
|----------|-------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry पोर्टल → तुमचा प्रोजेक्ट → **Overview** पृष्ठ |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry पोर्टल → **Models + Endpoints** → तुमच्या तैनात मॉडेलचे नाव |

यापुढे, बहुतेक धड्यांसाठी पुरेसे! नोटबुक्स स्वयंचलितपणे तुमच्या `az login` सत्राद्वारे प्रमाणीकरण करतील.

### टप्पा 5: Python Dependencies इंस्टॉल करा

```bash|powershell
pip install -r requirements.txt
```

पुर्वी तयार केलेल्या virtual environment मध्ये हे चालवण्याची शिफारस करतो.

## Lesson 5 (Agentic RAG)साठी अतिरिक्त सेटअप

Lesson 5 मध्ये **Azure AI Search** वापरून retrieval-augmented generation केला जातो. जर तुम्ही तो धडा चालवायचा असेल तर तुमच्या `.env` फाइलबमध्ये ही मूल्ये जोडा:

| बदलणारा | कुठे सापडेल |
|----------|-------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure पोर्टल → तुमचे **Azure AI Search** रिसोर्स → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure पोर्टल → तुमचे **Azure AI Search** रिसोर्स → **Settings** → **Keys** → प्राथमिक अ‍ॅडमिन की |

## Lesson 6 आणि 8 (GitHub Models)साठी अतिरिक्त सेटअप

Lesson 6 आणि 8 मधील काही नोटबुक्स Azure AI Foundry ऐवजी **GitHub Models** वापरतात. जर तुम्ही ते नमुने चालवू इच्छित असाल तर तुमच्या `.env` फायलबमध्ये खालील घाला:

| बदलणारा | कुठे सापडेल |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | `https://models.inference.ai.azure.com` (डेफॉल्ट मूल्य वापरा) |
| `GITHUB_MODEL_ID` | वापरणार्‍या मॉडेलचे नाव (उदा., `gpt-4o-mini`) |

## पर्यायी प्रदाता: MiniMax (OpenAI-सुसंगत)

[MiniMax](https://platform.minimaxi.com/) मोठ्या कंटेक्स्टचे मॉडेल (कमाल 204K टोकन्स) OpenAI सुसंगत API द्वारे उपलब्ध करतो. Microsoft Agent Framework चा `OpenAIChatClient` कोणत्याही OpenAI-सुसंगत endpoint सोबत काम करतो, त्यामुळे MiniMax चा वापर GitHub Models किंवा OpenAI ऐवजी पर्यायी म्हणून करता येतो.

तुमच्या `.env` फाइलमध्ये खालील जोडा:

| बदलणारा | कुठे सापडेल |
|----------|-------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1` (डेफॉल्ट मूल्य) वापरा |
| `MINIMAX_MODEL_ID` | वापरणार्‍या मॉडेलचे नाव (उदा., `MiniMax-M2.7`) |

**उपलब्ध मॉडेल्स**: `MiniMax-M2.7` (शिफारस केलेले), `MiniMax-M2.7-highspeed` (जास्त वेगाने प्रतिसाद)

जे कोड नमुने `OpenAIChatClient` वापरतात (उदा., Lesson 14 हॉटेल बुकिंग वर्कफ्लो), ते `MINIMAX_API_KEY` सेट असल्यास आपोआप MiniMax सेटिंग्ज शोधून वापरतील.

## Lesson 8 (Bing Grounding Workflow) साठी अतिरिक्त सेटअप

Lesson 8 च्या संधी वर्कफ्लो नोटबुकमध्ये **Bing grounding** Azure AI Foundry द्वारे वापरले आहे. जर तुम्ही तो नमुना चालवणार असाल तर हे बदलणारे तुमच्या `.env` फाइलबध्ये जोडा:

| बदलणारा | कुठे सापडेल |
|----------|-------------|
| `BING_CONNECTION_ID` | Azure AI Foundry पोर्टल → तुमचा प्रोजेक्ट → **Management** → **Connected resources** → तुमचा Bing कनेक्शन → कनेक्शन ID कॉपी करा |

## समस्या निराकरण

### macOS वर SSL प्रमाणपत्र पडताळणी त्रुटी

जर तुम्ही macOS वापरत असाल आणि अशा त्रुटीला सामोरे जात असाल:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

हे macOS वर Python शी संबंधित एक ज्ञात समस्या आहे जेथे सिस्टम SSL प्रमाणपत्रे आपोआप विश्वसनीय मानली जात नाहीत. खाली दिलेल्या सोडवणुन यांचा अनुक्रमे प्रयत्न करा:

**पर्याय 1: Python चा Install Certificates स्क्रिप्ट चालवा (शिफारस केलेले)**

```bash
# आपल्या स्थापित Python आवृत्तीने 3.XX बदला (उदा., 3.12 किंवा 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**पर्याय 2: तुमच्या नोटबुकमध्ये `connection_verify=False` वापरा (GitHub Models नोटबुक्ससाठीच)**

Lesson 6 नोटबुकमध्ये (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), एक टिप्पणीसहित workaround आधीच आहे. क्लायंट तयार करताना `connection_verify=False` अनकमेंट करा:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # प्रमाणपत्र त्रुटी आढळल्यास SSL पडताळणी अक्षम करा
)
```

> **⚠️ इशारा:** SSL पडताळणी अक्षम (`connection_verify=False`) करणे सुरक्षा कमी करते कारण प्रमाणपत्र पडताळणी टाळते. हे फक्त संभाव्यवेळा workaround म्हणून विकास वातावरणात वापरा, प्रॉडक्शन मध्ये कधीही वापरू नका.

**पर्याय 3: `truststore` इंस्टॉल करा आणि वापरा**

```bash
pip install truststore
```

नंतर तुमच्या नोटबुक किंवा स्क्रिप्टच्या सुरुवातीला खालील जोडा नेटवर्क कॉल करण्यापूर्वी:

```python
import truststore
truststore.inject_into_ssl()
```

## कुठेतरी अडकला आहात?

जर सेटअप करताना समस्या येत असतील तर आमच्या <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> मध्ये येऊ शकता किंवा <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">इश्यू तयार करू शकता</a>.

## पुढील धडा

आता तुम्ही या कोर्ससाठी कोड चालवायला तयार आहात. AI एजंट्सच्या जगाबद्दल अधिक शिका आणि आनंद करा!

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**कृपया ध्यान द्या**:  
हा दस्तावेज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) वापरून अनुवादित केला आहे. आम्ही अचूकतेसाठी प्रयत्नशील आहोत, परंतु कृपया लक्षात ठेवा की स्वयंचलित अनुवादांमध्ये चुका किंवा गैरसमज असू शकतात. मूळ दस्तावेज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती साठी व्यावसायिक मानवी अनुवाद शिफारसीय आहे. या अनुवादाचा वापर करून झालेल्या कोणत्याही गैरसमजांची किंवा चुकीच्या अर्थनिर्णयांची जबाबदारी आम्ही घेत नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->