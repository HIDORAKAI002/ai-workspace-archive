# पाठ्यक्रम सेटअप

## परिचय

यह पाठ कवर करेगा कि इस पाठ्यक्रम के कोड उदाहरण को कैसे चलाया जाए।

## अन्य शिक्षार्थियों में शामिल हों और सहायता प्राप्त करें

अपनी रिपॉजिटरी क्लोन करने से पहले, सेटअप में किसी भी सहायता के लिए, कोर्स के बारे में किसी भी प्रश्न के लिए, या अन्य शिक्षार्थियों से जुड़ने के लिए [AI Agents For Beginners Discord चैनल](https://aka.ms/ai-agents/discord) में शामिल हों।

## इस रिपॉजिटरी को क्लोन या फोर्क करें

शुरू करने के लिए, कृपया GitHub रिपॉजिटरी को क्लोन या फोर्क करें। इससे आपके पास कोर्स सामग्री का अपना खुद का संस्करण होगा ताकि आप कोड चला सकें, परीक्षण कर सकें, और संशोधित कर सकें!

यह <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">फोर्क रिपॉजिटरी</a> लिंक पर क्लिक करके किया जा सकता है

अब आपके पास इस कोर्स का अपना फोर्क्ड संस्करण निम्नलिखित लिंक में होना चाहिए:

![Forked Repo](../../../translated_images/hi/forked-repo.33f27ca1901baa6a.webp)

### शैलो क्लोन (कार्यशाला / Codespaces के लिए अनुशंसित)

  >पूरा रिपॉजिटरी बड़ा (~3 GB) हो सकता है जब आप पूरी इतिहास और सभी फ़ाइलें डाउनलोड करते हैं। यदि आप केवल कार्यशाला में भाग ले रहे हैं या केवल कुछ पाठ फोल्डर की जरूरत है, तो शैलो क्लोन (या sparse clone) अधिकांश डाउनलोड से बचाता है इतिहास को छोटा करके और/या blobs को छोड़कर।

#### त्वरित शैलो क्लोन — न्यूनतम इतिहास, सभी फ़ाइलें

नीचे दिए गए कमांड में `<your-username>` को अपनी फोर्क URL (या अगर आप चाहें तो अपस्ट्रीम URL) से बदलें।

केवल नवीनतम कमिट इतिहास क्लोन करने के लिए (छोटा डाउनलोड):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

किसी विशिष्ट शाखा को क्लोन करने के लिए:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### आंशिक (sparse) क्लोन — न्यूनतम blobs + केवल चयनित फ़ोल्डर

यह आंशिक क्लोन और sparse-checkout का उपयोग करता है (Git 2.25+ चाहिए और आंशिक क्लोन समर्थन वाला आधुनिक Git अनुशंसित है):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

रिपॉजिटरी फ़ोल्डर में जाएँ:

```bash|powershell
cd ai-agents-for-beginners
```

फिर उन फ़ोल्डरों को निर्दिष्ट करें जिन्हें आप चाहते हैं (नीचे उदाहरण में दो फ़ोल्डर हैं):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

क्लोनिंग और फ़ाइलों का सत्यापन करने के बाद, यदि आपको केवल फ़ाइलों की आवश्यकता है और स्पेस खाली करना चाहते हैं (कोई git इतिहास नहीं), कृपया रिपॉजिटरी मेटाडेटा हटा दें (💀अपरिवर्तनीय — आप सभी Git कार्यक्षमता खो देंगे: कोई कमिट, पुल, पुश या इतिहास एक्सेस नहीं)।

```bash
# zsh/bash
rm -rf .git
```

```powershell
# पावरशेल
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces का उपयोग करना (स्थानीय बड़े डाउनलोड से बचने के लिए अनुशंसित)

- इस रिपॉजिटरी के लिए [GitHub UI](https://github.com/codespaces) के माध्यम से नया Codespace बनाएं।  

- नए बनाए गए Codespace के टर्मिनल में, उपरोक्त शैलो/स्पार्स क्लोन कमांड में से किसी एक को चलाएँ ताकि आपको केवल आवश्यक पाठ फ़ोल्डर Codespace कार्यक्षेत्र में मिलें।
- वैकल्पिक: Codespaces के अंदर क्लोनिंग के बाद अतिरिक्त स्पेस रिक्लेम करने के लिए .git हटाएं (ऊपर हटाने के कमांड देखें)।
- नोट: यदि आप रिपॉजिटरी को सीधे Codespaces में खोलना पसंद करते हैं (अतिरिक्त क्लोन के बिना), तो ध्यान रखें Codespaces devcontainer वातावरण बनाएगा और संभवतः ज़रूरत से अधिक संसाधन देगा। ताजा Codespace में शैलो कॉपी क्लोन करना डिस्क उपयोग नियंत्रण में अधिक नियंत्रण देता है।

#### सुझाव

- यदि आप संपादित/कमिट करना चाहते हैं तो हमेशा क्लोन URL को अपनी फोर्क से बदलें।
- यदि बाद में अधिक इतिहास या फ़ाइलों की आवश्यकता हो, तो आप उन्हें फेच कर सकते हैं या sparse-checkout को समायोजित कर सकते हैं।

## कोड चलाना

इस कोर्स में Jupyter Notebooks की एक श्रृंखला शामिल है जिन्हें आप AI एजेंट बनाने का व्यावहारिक अनुभव पाने के लिए चला सकते हैं।

कोड उदाहरण **Microsoft Agent Framework (MAF)** का उपयोग करते हैं `FoundryChatClient` के साथ, जो **Microsoft Foundry Agent Service V2** (Responses API) के माध्यम से **Microsoft Foundry** से जुड़ता है।

सभी Python नोटबुक्स को `*-python-agent-framework.ipynb` के रूप में लेबल किया गया है।

## आवश्यकताएँ

- Python 3.12+
  - **ध्यान दें**: यदि आपके पास Python3.12 इंस्टॉल नहीं है, तो सुनिश्चित करें कि आप इसे स्थापित करें। फिर python3.12 का उपयोग करके अपना वर्चुअल वातावरण (venv) बनाएं ताकि requirements.txt फ़ाइल से सही संस्करण इंस्टॉल हो सकें।
  
    >उदाहरण

    Python venv निर्देशिका बनाएं:

    ```bash|powershell
    python -m venv venv
    ```

    फिर venv पर्यावरण सक्रिय करें:

    ```bash
    # ज़श/बैश
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET का उपयोग करने वाले नमूना कोड्स के लिए, सुनिश्चित करें कि आपने [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) या बाद का संस्करण स्थापित किया है। फिर, अपनी इंस्टॉल की गई .NET SDK संस्करण जांचें:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — प्रमाणीकरण के लिए आवश्यक। [aka.ms/installazurecli](https://aka.ms/installazurecli) से इंस्टॉल करें।
- **Azure सदस्यता** — Microsoft Foundry और Microsoft Foundry Agent Service तक पहुँच के लिए।
- **Microsoft Foundry प्रोजेक्ट** — एक प्रोजेक्ट जिसमें डिप्लॉय मॉडल होता है (जैसे `gpt-4.1-mini`)। देखें: [Step 1](#चरण-1-microsoft-foundry-प्रोजेक्ट-बनाएं).

हमने इस रिपॉजिटरी की रूट में `requirements.txt` फ़ाइल शामिल की है जिसमें कोड उदाहरण चलाने के लिए सभी आवश्यक Python पैकेज हैं।

आप इन्हें रिपॉजिटरी की रूट में अपने टर्मिनल में निम्नलिखित कमांड चलाकर इंस्टॉल कर सकते हैं:

```bash|powershell
pip install -r requirements.txt
```

हम अनुशंसा करते हैं कि आप संभावित टकराव और समस्याओं से बचने के लिए एक Python वर्चुअल वातावरण बनाएं।

## VSCode सेटअप करें

सुनिश्चित करें कि आप VSCode में सही Python संस्करण का उपयोग कर रहे हैं।

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry और Microsoft Foundry Agent Service सेटअप करें

### चरण 1: Microsoft Foundry प्रोजेक्ट बनाएं

आपको Microsoft Foundry **हब** और **प्रोजेक्ट** की आवश्यकता है जिसमें डिप्लॉय मॉडल हो ताकि नोटबुक्स चल सकें।

1. [ai.azure.com](https://ai.azure.com) पर जाएं और अपने Azure खाते से साइन इन करें।
2. एक **हब** बनाएं (या मौजूदा का उपयोग करें)। देखें: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)।
3. हब के अंदर एक **प्रोजेक्ट** बनाएं।
4. **Models + Endpoints** → **Deploy model** से एक मॉडल डिप्लॉय करें (जैसे `gpt-4.1-mini`)।

### चरण 2: अपने प्रोजेक्ट का एंडपॉइंट और मॉडल डिप्लॉयमेंट नाम प्राप्त करें

Microsoft Foundry पोर्टल में अपने प्रोजेक्ट से:

- **प्रोजेक्ट एंडपॉइंट** — **Overview** पेज पर जाएं और एंडपॉइंट URL कॉपी करें।

![Project Connection String](../../../translated_images/hi/project-endpoint.8cf04c9975bbfbf1.webp)

- **मॉडल डिप्लॉयमेंट नाम** — **Models + Endpoints** पर जाएं, अपने डिप्लॉय मॉडल का चयन करें, और **Deployment name** नोट करें (जैसे `gpt-4.1-mini`)।

### चरण 3: `az login` के साथ Azure में साइन इन करें

सभी नोटबुक्स प्रमाणीकरण के लिए **`AzureCliCredential`** का उपयोग करते हैं — कोई API कुंजी प्रबंधन नहीं। इसके लिए Azure CLI के माध्यम से साइन इन होना आवश्यक है।

1. यदि आपने Azure CLI इंस्टॉल नहीं किया है तो इंस्टॉल करें: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. साइन इन करने के लिए चलाएं:

    ```bash|powershell
    az login
    ```

    या यदि आप किसी रिमोट/Codespace वातावरण में हैं जहां ब्राउज़र नहीं है:

    ```bash|powershell
    az login --use-device-code
    ```

3. यदि पूछा जाए तो अपनी सदस्यता चुनें — जिसमें आपका Foundry प्रोजेक्ट है।

4. सत्यापित करें कि आप साइन इन हैं:

    ```bash|powershell
    az account show
    ```

> **क्यों `az login`?** नोटबुक्स `AzureCliCredential` का उपयोग करते हुए प्रमाणीकरण करते हैं जो `azure-identity` पैकेज से आता है। इसका मतलब है कि आपकी Azure CLI सत्र क्रेडेंशियल प्रदान करती है — कोई API कुंजी या गुप्त जानकारी `.env` फाइल में नहीं। यह एक [सुरक्षा सर्वोत्तम प्रथा](https://learn.microsoft.com/azure/developer/ai/keyless-connections) है।

### चरण 4: अपनी `.env` फाइल बनाएं

उदाहरण फ़ाइल कॉपी करें:

```bash
# ज़श/बैश
cp .env.example .env
```

```powershell
# पॉवरशेल
Copy-Item .env.example .env
```

`.env` खोलें और इन दो मानों को भरें:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| वेरिएबल | कहाँ से पाएँ |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry पोर्टल → आपका प्रोजेक्ट → **Overview** पेज |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry पोर्टल → **Models + Endpoints** → आपके डिप्लॉय मॉडल का नाम |

अधिकतर पाठों के लिए बस इतना ही! नोटबुक्स अपने आप आपके `az login` सत्र के माध्यम से प्रमाणीकरण करेंगे।

### चरण 5: Python Dependencies इंस्टॉल करें

```bash|powershell
pip install -r requirements.txt
```

हम अनुशंसा करते हैं कि आप इसे पहले बनाए गए वर्चुअल वातावरण के अंदर चलाएं।

## पाठ 5 (Agentic RAG) के लिए अतिरिक्त सेटअप

पाठ 5 **Azure AI Search** का उपयोग करता है retrieval-augmented generation के लिए। यदि आप वह पाठ चलाना चाहते हैं, तो ये वेरिएबल अपनी `.env` फाइल में जोड़ें:

| वेरिएबल | कहाँ से पाएँ |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure पोर्टल → आपका **Azure AI Search** संसाधन → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure पोर्टल → आपका **Azure AI Search** संसाधन → **Settings** → **Keys** → मुख्य एडमिन कुंजी |

## वे पाठ जिनमें Azure OpenAI को सीधे कॉल किया जाता है (पाठ 6 और 8) के लिए अतिरिक्त सेटअप

पाठ 6 और 8 के कुछ नोटबुक सीधे **Azure OpenAI** को कॉल करते हैं (**Responses API** का उपयोग करते हुए) बजाय Microsoft Foundry प्रोजेक्ट के जरिए। ये नमूने पहले GitHub Models का उपयोग करते थे जो अब समाप्त हो रहे हैं (जुलाई 2026 को रिटायर होंगे) और Responses API का समर्थन नहीं करते। यदि आप वे नमूने चलाने की योजना बनाते हैं, तो ये वेरिएबल अपनी `.env` फाइल में जोड़ें:

| वेरिएबल | कहाँ से पाएँ |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure पोर्टल → आपका **Azure OpenAI** संसाधन → **Keys and Endpoint** → एंडपॉइंट (जैसे `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | आपके डिप्लॉय किए मॉडल का नाम (जैसे `gpt-4.1-mini`) जो Responses API को सपोर्ट करता है |
| `AZURE_OPENAI_API_KEY` | वैकल्पिक — केवल तब यदि आप कुंजी-आधारित प्रमाणीकरण उपयोग करते हैं बजाय `az login` / Entra ID के |

> Responses API स्थिर `/openai/v1/` एंडपॉइंट का उपयोग करता है, इसलिए कोई `api-version` आवश्यक नहीं। keyless Entra ID प्रमाणीकरण का उपयोग करने के लिए `az login` से साइन इन करें।

## वैकल्पिक प्रदाता: MiniMax (OpenAI- कम्पैटिबल)

[MiniMax](https://platform.minimaxi.com/) बड़े संदर्भ मॉडल (204K टोकन तक) OpenAI अनुरूप API के माध्यम से प्रदान करता है। Microsoft Agent Framework का `OpenAIChatClient` किसी भी OpenAI अनुरूप एंडपॉइंट के साथ काम करता है, इसलिए आप Azure OpenAI या OpenAI के विकल्प के रूप में MiniMax का उपयोग कर सकते हैं।

ये वेरिएबल अपनी `.env` फाइल में जोड़ें:

| वेरिएबल | कहाँ से पाएँ |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | उपयोग करें `https://api.minimax.io/v1` (डिफ़ॉल्ट मान) |
| `MINIMAX_MODEL_ID` | उपयोग करने के लिए मॉडल नाम (जैसे `MiniMax-M3`) |

**उदाहरण मॉडल**: `MiniMax-M3` (अनुशंसित), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (तेजी से प्रतिक्रिया). मॉडल नाम और उपलब्धता समय-समय पर बदल सकती है, और किसी मॉडल तक पहुँच आपके खाते या क्षेत्र पर निर्भर हो सकती है — नवीनतम सूची के लिए [MiniMax Platform](https://platform.minimaxi.com/) देखें। यदि `MiniMax-M3` आपके खाते के लिए उपलब्ध नहीं है, तो `MINIMAX_MODEL_ID` को उस मॉडल पर सेट करें जो आपके पास है (जैसे `MiniMax-M2.7`)।

कोड उदाहरण जो `OpenAIChatClient` का उपयोग करते हैं (जैसे, Lesson 14 होटल बुकिंग वर्कफ़्लो) स्वचालित रूप से आपके MiniMax कॉन्फ़िगरेशन का पता लगाएंगे और उसका उपयोग करेंगे यदि `MINIMAX_API_KEY` सेट है।

## वैकल्पिक प्रदाता: Foundry Local (मॉडल डिवाइस पर चलाएँ)

[Foundry Local](https://foundrylocal.ai) एक हल्का रनटाइम है जो भाषा मॉडल को **पूरी तरह से आपके अपने मशीन पर** डाउनलोड, प्रबंधित, और OpenAI अनुरूप API के माध्यम से परोसता है — कोई क्लाउड, कोई Azure सदस्यता, और कोई API कुंजी नहीं। यह ऑफलाइन विकास, बिना क्लाउड लागत के प्रयोग, या डेटा डिवाइस पर रखने के लिए एक बढ़िया विकल्प है।

क्योंकि Microsoft Agent Framework का `OpenAIChatClient` किसी भी OpenAI अनुरूप एंडपॉइंट के साथ काम करता है, Foundry Local Azure OpenAI का एक स्थानीय विकल्प है।

**1. Foundry Local इंस्टॉल करें**

```bash
# विंडोज़
winget install Microsoft.FoundryLocal

# मैकओएस
brew install foundrylocal
```

**2. एक मॉडल डाउनलोड और चलाएं** (यह भी स्थानीय सेवा शुरू करता है):

```bash
foundry model list          # उपलब्ध मॉडलों को देखें
foundry model run phi-4-mini
```

**3. Python SDK इंस्टॉल करें** जिसका उपयोग स्थानीय एंडपॉइंट खोजने के लिए होता है:

```bash
pip install foundry-local-sdk
```

**4. Microsoft Agent Framework को अपने स्थानीय मॉडल की ओर इंगित करें:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# मॉडल को डाउनलोड करता है (अगर आवश्यक हो) और स्थानीय रूप से सेवा प्रदान करता है, फिर एंडपॉइंट/पोर्ट खोजता है।
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # उदाहरण के लिए http://localhost:<port>/v1
    api_key=manager.api_key,        # Foundry Local के लिए हमेशा "not-required"
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **नोट:** Foundry Local OpenAI अनुरूप **Chat Completions** एंडपॉइंट प्रदान करता है। इसे स्थानीय विकास और ऑफलाइन परिदृश्यों के लिए उपयोग करें। पूर्ण **Responses API** फीचर सेट (राज्यपूर्ण वार्तालाप, गहरा टूल ऑर्केस्ट्रेशन, और एजेंट-शैली विकास) के लिए, पाठों में दिखाए अनुसार **Azure OpenAI** या **Microsoft Foundry** प्रोजेक्ट का उपयोग करें। वर्तमान मॉडल सूची और प्लेटफ़ॉर्म समर्थन के लिए [Foundry Local दस्तावेज़](https://foundrylocal.ai) देखें।


## पाठ 8 के लिए अतिरिक्त सेटअप (Bing ग्राउंडिंग वर्कफ़्लो)

पाठ 8 में कंडीशनल वर्कफ़्लो नोटबुक माइक्रोसॉफ्ट फाउंड्री के माध्यम से **Bing ग्राउंडिंग** का उपयोग करती है। यदि आप उस नमूने को चलाने की योजना बना रहे हैं, तो अपने `.env` फ़ाइल में यह वेरिएबल जोड़ें:

| वेरिएबल | कहां से प्राप्त करें |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry पोर्टल → आपका प्रोजेक्ट → **Management** → **Connected resources** → आपका Bing कनेक्शन → कनेक्शन ID कॉपी करें |

## समस्या निवारण

### macOS पर SSL प्रमाणपत्र सत्यापन त्रुटियाँ

यदि आप macOS पर हैं और निम्न त्रुटि का सामना कर रहे हैं:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

यह macOS पर Python का एक ज्ञात मुद्दा है जहाँ सिस्टम SSL प्रमाणपत्र स्वतः भरोसेमंद नहीं होते। निम्नलिखित समाधानों को क्रम से आज़माएँ:

**विकल्प 1: Python के Install Certificates स्क्रिप्ट को चलाएं (अनुशंसित)**

```bash
# अपनी इंस्टॉल की गई पायथन संस्करण से 3.XX को बदलें (जैसे, 3.12 या 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**विकल्प 2: अपने नोटबुक में `connection_verify=False` का उपयोग करें (केवल GitHub Models नोटबुक के लिए)**

पाठ 6 के नोटबुक (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) में एक कमेंट आउट वर्कअराउंड पहले से शामिल है। क्लाइंट बनाते समय `connection_verify=False` को अनकमेंट करें:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # यदि आपको प्रमाणपत्र त्रुटियाँ मिलती हैं तो SSL सत्यापन अक्षम करें
)
```

> **⚠️ चेतावनी:** SSL सत्यापन को अक्षम करना (`connection_verify=False`) प्रमाणपत्र सत्यापन छोड़ने के कारण सुरक्षा कम करता है। इसे विकास वातावरण में अस्थायी समाधान के रूप में ही उपयोग करें, उत्पादन में कभी नहीं।

**विकल्प 3: `truststore` को इंस्टॉल करें और उपयोग करें**

```bash
pip install truststore
```

फिर किसी भी नेटवर्क कॉल से पहले अपने नोटबुक या स्क्रिप्ट के शीर्ष पर निम्न जोड़ें:

```python
import truststore
truststore.inject_into_ssl()
```

## कहीं अटक गए हैं?

यदि इस सेटअप को चलाने में कोई समस्या हो, तो हमारे <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> में शामिल हों या <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">एक समस्या बनाएं</a>।

## अगला पाठ

आप अब इस कोर्स के लिए कोड चलाने के लिए तैयार हैं। AI एजेंट्स की दुनिया के बारे में और जानने के लिए शुभकामनाएँ!

[AI एजेंट्स और एजेंट उपयोग मामलों का परिचय](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->