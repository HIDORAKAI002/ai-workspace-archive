# தொடக்கத்திற்கான AI முகவர்கள் - ஒரு பாடநெறி

![தொடக்கத்திற்கான AI முகவர்கள்](../../translated_images/ta/repo-thumbnailv2.06f4a48036fde647.webp)

## AI முகவர்கள் கட்டமைக்க துவங்க நீங்கள் தெரிந்துகொள்ள வேண்டிய அனைத்தையும் கற்பிக்கும் ஒரு பாடநெறி

[![GitHub உரிமம்](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub பங்களிப்பாளர்கள்](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub பிரச்சனைகள்](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub இழுக்கும் கோரிக்கைகள்](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![Pull கோரிக்கைகள் வரவேற்கப்படுகின்றன](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 பன்மொழி ஆதரவு

#### GitHub செயல்பாடு மூலம் ஆதரிக்கப்படுகிறது (தானாகவும் எப்போதும் சமீபத்தியது)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[அரபு](../ar/README.md) | [பெங்காலி](../bn/README.md) | [பல்கேரியன்](../bg/README.md) | [பர்மீஸ் (மியன்மார்)](../my/README.md) | [சைனீஸ் (எளிமையானது)](../zh-CN/README.md) | [சைனீஸ் (சம்பிரதாயம், ஹொங்கொங்)](../zh-HK/README.md) | [சைனீஸ் (சம்பிரதாயம், மக்காவ்)](../zh-MO/README.md) | [சைனீஸ் (சம்பிரதாயம், தைவான்)](../zh-TW/README.md) | [குரோஷியன்](../hr/README.md) | [செக்](../cs/README.md) | [டேனிஷ்](../da/README.md) | [டச்சு](../nl/README.md) | [எஸ்தோனியன்](../et/README.md) | [பின்னிஷ்](../fi/README.md) | [பிரென்சு](../fr/README.md) | [ஜெர்மன்](../de/README.md) | [கிரேக்கு](../el/README.md) | [ஹீப்ரூ](../he/README.md) | [இந்தி](../hi/README.md) | [ஹங்கேரியன்](../hu/README.md) | [இந்தோனேஷியன்](../id/README.md) | [இத்தாலி](../it/README.md) | [ஜாப்பனீஸ்](../ja/README.md) | [கன்னடம்](../kn/README.md) | [க்மர்](../km/README.md) | [கொரியன்](../ko/README.md) | [லித்துவேனியன்](../lt/README.md) | [மலாய்](../ms/README.md) | [மலையாளம்](../ml/README.md) | [மராத்தி](../mr/README.md) | [நேபாளி](../ne/README.md) | [நைஜீரியன் பிட்கின்](../pcm/README.md) | [நார்வேஜியன்](../no/README.md) | [பேர்சியன் (ஃபார்ஸி)](../fa/README.md) | [போலிஷ்](../pl/README.md) | [போர்ச்சுக்கீஸ் (பிரேசில்)](../pt-BR/README.md) | [போர்ச்சுக்கீஸ் (போர்ச்சுகல்)](../pt-PT/README.md) | [பஞ்சாபி (குருமுகி)](../pa/README.md) | [ரோமானியன்](../ro/README.md) | [ரஷியன்](../ru/README.md) | [செர்பியன் (சிரிலிக்)](../sr/README.md) | [ஸ்லோவாக்](../sk/README.md) | [ஸ்லோவேனியன்](../sl/README.md) | [ஸ்பானிஷ்](../es/README.md) | [ஸ்வாஹிலி](../sw/README.md) | [சுவீடிஷ்](../sv/README.md) | [டக்காலோக் (பிலிப்பைன்ஸ்)](../tl/README.md) | [தமிழ்](./README.md) | [தெலுங்கு](../te/README.md) | [தை](../th/README.md) | [துருக்கிஷ்](../tr/README.md) | [உக்ரைனியன்](../uk/README.md) | [உருது](../ur/README.md) | [வியেতনாமீஸ்](../vi/README.md)

> **இடையே உள்ள மாற்றங்களைப் பெரிசொல்ல விரும்புகிறீர்களா?**
>
> இந்த களஞ்சியம் 50+ மொழி மொழிமாற்றங்களைக் கொண்டது, இது புது பதிவிறக்க அளவைக் குறிப்பிடுகின்றது. மொழிமாற்றங்கள் இல்லாமல் கிளோன் செய்ய sparse checkout பயன்படுத்தவும்:
>
> **Bash / macOS / Linux:**
> ```bash
> git clone --filter=blob:none --sparse https://github.com/microsoft/ai-agents-for-beginners.git
> cd ai-agents-for-beginners
> git sparse-checkout set --no-cone '/*' '!translations' '!translated_images'
> ```
>
> **CMD (Windows):**
> ```cmd
> git clone --filter=blob:none --sparse https://github.com/microsoft/ai-agents-for-beginners.git
> cd ai-agents-for-beginners
> git sparse-checkout set --no-cone "/*" "!translations" "!translated_images"
> ```
>
> இது பாடநெறியை விரைவாக முடிக்க தேவையான அனைத்தையும் தரும்.
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**கூடுதல் மொழிமாற்ற மொழிகள் ஆதரிக்கப்பட விரும்பினால் [இங்கே](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md) பார்வையிடவும்**

[![GitHub பார்வையாளர்கள்](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub கிளோன்கள்](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub நட்சத்திரங்கள்](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 துவக்கம்

இந்தப் பாடநெறியில் AI முகவர்களை கட்டமைப்பதின் அடிப்படைகள் கற்பிக்கப்படுகின்றன. ஒவ்வொரு பாடமும் தனிப்பட்ட தலைப்பை உள்ளடக்கியுள்ளது, எனவே உங்களுக்குப் பிடித்த இடத்தில் துவங்கலாம்!

இந்தப் பாடநெறிக்கு பன்மொழி ஆதரவு உள்ளது. எங்கள் [கிடைக்கும் மொழிகள் இங்கே](#-multi-language-support) செல்லவும்.

இது உங்கள் முதல் முறையாக Generative AI மாதிரிகளுடன் கட்டமைப்பது என்றால், எங்கள் [தொடக்கத்திற்கான உருவாக்கும் AI](https://aka.ms/genai-beginners) பாடநெறியை பார்வையிடவும், இதில் GenAI மூலம் கட்டமைப்பதற்கான 21 பாடங்கள் உள்ளன.

இந்த களஞ்சியத்தை [நட்சத்திரம் (🌟) போட்டு](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) மற்றும் [கிளோன் செய்து](https://github.com/microsoft/ai-agents-for-beginners/fork) குறியீட்டை இயக்க மறக்காதீர்கள்.

### பிற கற்றலாளர்களை சந்திக்கவும், உங்கள் கேள்விகளுக்கு பதில் பெறவும்

AI முகவர்கள் கட்டமைப்பதில் சிக்கல் ஏற்பட்டால் அல்லது கேள்விகள் இருந்தால், எங்கள் நிதானமான Discord சேனலில் சேரவும் [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord).

### தேவையானவை

இந்த பாடத்திலுள்ள ஒவ்வொரு பாடத்திலும் குறியீட்டு உதாரணங்கள் உள்ளன, அவை code_samples என்ற கோப்புறையில் இருக்கின்றன. உங்கள் பாணி பிரதியை உருவாக்க [இந்த களஞ்சியத்தை கிளோன் செய்யவும்](https://github.com/microsoft/ai-agents-for-beginners/fork).

இந்த பயிற்சிகளின் குறியீட்டு உதாரணங்கள் Microsoft Agent Framework உடன் Azure AI Foundry Agent Service V2 ஐ பயன்படுத்துகின்றன:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - Azure கணக்கு தேவை

இந்த பாடநெறியில் Microsoft நிறுவனத்தின் கீழ்காணும் AI முகவர் கட்டமைப்புகள் மற்றும் சேவைகள் பயன்படுத்தப்படுகின்றன:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)

இந்த பாடத்தின் குறியீட்டை இயக்குவது குறித்த கூடுதல் தகவலுக்கு [பாடநெறி அமைப்பு](./00-course-setup/README.md) பகுதியில் செல்லவும்.

## 🙏 உதவ விரும்புகிறீர்களா?

உங்களிடம் பரிந்துரைகள், எழுத்துப்பிழைகள் அல்லது குறியீடு பிழைகள் இருந்தால்? [ஒரு பிரச்சனையை எழுப்பவும்](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) அல்லது [ஒரு புல் கோரிக்கை உருவாக்கவும்](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst).

## 📂 ஒவ்வொரு பாடத்திலும் உள்ளவை

- README இல் உள்ள எழுத்துப்பாடம் மற்றும் ஒரு குறும்படம்
- Microsoft Agent Framework உடன் Azure AI Foundry பயன்படுத்திய Python குறியீட்டு உதாரணங்கள்
- உங்கள் கற்றலை தொடர்வதற்கான கூடுதல் வளங்களுக்கான இணைப்புகள்

## 🗃️ பாடங்கள்

| **பாடம்**                                  | **எழுத்து & குறியீடு**                             | **காணொளி**                                                  | **கூடுதல் கற்றல்**                                                                 |
|--------------------------------------------|----------------------------------------------------|--------------------------------------------------------------|----------------------------------------------------------------------------------|
| AI முகவர்களும் முகவர் பயன்பாடுகளும் அறிமுகம் | [இணைப்பு](./01-intro-to-ai-agents/README.md)        | [வீடியோ](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI முகவர் கட்டமைப்புகளை ஆராய்தல்            | [இணைப்பு](./02-explore-agentic-frameworks/README.md) | [வீடியோ](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI முகவர் வடிவமைப்பு வடிவங்கள் புரிதல்         | [இணைப்பு](./03-agentic-design-patterns/README.md)    | [வீடியோ](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| கருவி பயன்பாட்டு வடிவமைப்பு வடிவம்            | [இணைப்பு](./04-tool-use/README.md)                  | [வீடியோ](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| முகவர் RAG                                   | [இணைப்பு](./05-agentic-rag/README.md)               | [வீடியோ](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| நம்பகமான AI முகவர்களை கட்டமைத்தல்         | [இணைப்பு](./06-building-trustworthy-agents/README.md) | [வீடியோ](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK ) | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| திட்டமிடல் வடிவமைப்பு வடிவம்                  | [இணைப்பு](./07-planning-design/README.md)           | [வீடியோ](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| பன்முகவர் வடிவமைப்பு வடிவம்                    | [இணைப்பு](./08-multi-agent/README.md)               | [வீடியோ](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| மெட்டாக்காக்னிஷன் வடிவமைப்பு வடிவம்             | [இணைப்பு](./09-metacognition/README.md)             | [வீடியோ](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| உற்பத்தியில் AI முகவர்கள்                      | [இணைப்பு](./10-ai-agents-production/README.md)        | [வீடியோ](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| முகவரியியல் நெறிமுறைகள் பயன்படுத்துதல் (MCP, A2A மற்றும் NLWeb) | [இணைப்பு](./11-agentic-protocols/README.md)           | [வீடியோ](https://youtu.be/X-Dh9R3Opn8)                                 | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI முகவர்களுக்கான சூழல் பொறியியல்            | [இணைப்பு](./12-context-engineering/README.md)         | [வீடியோ](https://youtu.be/F5zqRV7gEag)                                 | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| முகவரியியல் நினைவக மேலாண்மை                      | [இணைப்பு](./13-agent-memory/README.md)     |      [வீடியோ](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| Microsoft முகவர் கட்டமைப்பை ஆராய்தல்                         | [இணைப்பு](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| கணினி பயன்பாட்டு முகவர்களை உருவாக்குதல் (CUA)           | [இணைப்பு](./15-browser-use/README.md)     |                                                            | [இணைப்பு](https://docs.browser-use.com/examples/templates/playwright-integration)         |
| பரிமாணக்கூடிய முகவர்களைமான ஒரு அறிக்கை                   | விரைவில் வருகிறது                            |                                                            |                                                                                        |
| உள்ளூர் AI முகவர்களை உருவாக்குதல்                     | விரைவில் வருகிறது                               |                                                            |                                                                                        |
| AI முகவர்களை பாதுகாப்பது                           | விரைவில் வருகிறது                               |                                                            |                                                                                        |

## 🎒 பிற பாடநெறிகள்

எங்கள் குழு மேலும் பிற பாடநெறிகளை உருவாக்குகிறது! பாருங்கள்:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### லாங்செயின்
[![ஆரம்பக்காரர்களுக்கான LangChain4j](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![ஆரம்பக்காரர்களுக்கான LangChain.js](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![ஆரம்பக்காரர்களுக்கான LangChain](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### அஸ்யூர் / எட்ஜ் / MCP / முகவர்கள்
[![ஆரம்பக்காரர்களுக்கான AZD](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![ஆரம்பக்காரர்களுக்கான எட்ஜ் AI](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![ஆரம்பக்காரர்களுக்கான MCP](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![ஆரம்பக்காரர்களுக்கான AI முகவர்கள்](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### உற்பத்தி AI தொடர்
[![ஆரம்பக்காரர்களுக்கான உற்பத்தி AI](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![உற்பத்தி AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![உற்பத்தி AI (ஜாவா)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![உற்பத்தி AI (ஜாவாஸ்கிரிப்ட்)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### மையக் கற்றல்
[![ஆரம்பக்காரர்களுக்கான மெஷின் கற்றல்](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![ஆரம்பக்காரர்களுக்கான தரவுத்தொடரியல் அறிவியல்](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![ஆரம்பக்காரர்களுக்கான AI](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![ஆரம்பக்காரர்களுக்கான சைபர் பாதுகாப்பு](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![ஆரம்பக்காரர்களுக்கான இணைய மேம்பாடு](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![ஆரம்பக்காரர்களுக்கான IoT](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![ஆரம்பக்காரர்களுக்கான XR மேம்பாடு](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### கோபைலட் தொடர்
[![AI இணைக்கப்பட்ட நிரலாக்கத்திற்கான கோபைலட்](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![C#/.NET க்கான கோபைலட்](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![கோபைலட் அனுபவம்](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 சமூக நன்றி

Agentic RAG ஐ விளக்கும் முக்கிய குறியீடு மாதிரிகளுக்கு [ஷிவம் கோயல்](https://www.linkedin.com/in/shivam2003/) அவர்களுக்கு நன்றி.

## பங்கேற்பது

இந்த திட்டத்தில் பங்களிப்பு மற்றும் பரிந்துரைகள் வரவேற்கப்படுகின்றன. பெரும்பாலான பங்களிப்புகள்,
நீங்கள் பங்களிப்பை பயன்படுத்தும் உரிமையை உங்களிடம் இருப்பது மற்றும் வழங்குவதாகக் கூறும்
Contributor License Agreement (CLA) உடன் ஒப்புக்கொள்ள தேவையும் உள்ளது. விரிவுக்கு, பார்க்கவும் <https://cla.opensource.microsoft.com>.

நீங்கள் ஒரு pull கோரிக்கை சமர்ப்பிக்கும் போது, CLA பாட்டான் தானாகவே நீங்கள் CLA வழங்க வேண்டுமா என்று தீர்மானித்து PR-ஐ (உதாரணமாக, நிலை சோதனை, கருத்து) தகைப்படுத்தும்.
பாடத்தை பின்பற்றுங்கள். நமது CLA ஐ பயன்படுத்தும் அனைத்து களஞ்சயங்களிலும் இதை ஒருமுறை மட்டும் செய்ய வேண்டியிருக்கும்.

இந்த திட்டம் [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) ஐ ஏற்றுக்கொண்டுள்ளது.
மேலும் தகவலுக்கு [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) ஐப் பார்க்கவும் அல்லது
[opencode@microsoft.com](mailto:opencode@microsoft.com) என்கும் தொடர்புகொள்ளவும்.

## வர்த்தக மதிப்பெண்கள்

இந்தத் திட்டத்தில் திட்டங்கள், தயாரிப்புகள் அல்லது சேவைகளுக்கான வர்த்தக முத்திரைகள் அல்லது லோகோக்கள் இருக்கலாம். Microsoft
வர்த்தக முத்திரைகள் அல்லது லோகோக்களுக்கான உரிமையான பயன்பாடு
[Microsoft நிறுவனத்தின் வர்த்தகமுத்திரை மற்றும் பிராண்ட் வழிகாட்டுதல்கள்](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) க்குக் கட்டுப்படுகிறது.
இந்தத் திட்டத்தின் திருத்தப்பட்ட பதிப்புகளில் Microsoft வர்த்தக முத்திரைகள் அல்லது லோகோக்கள் பயன்படுத்தப்படும்போது குழப்பம் அல்லது Microsoft ஆதரவின் தவறான கருத்தை ஏற்படுத்தக்கூடாது.
மூன்றாம் தரப்பு வர்த்தக முத்திரைகள் அல்லது லோகோக்கள் பயன்படுத்தப்படும் போது அந்த மூன்றாம் தரப்பு கொள்கைகளை பின்பற்ற வேண்டும்.

## உதவி பெறுதல்

AI பயன்பாடுகளை உருவாக்கும்போது நீங்கள் சிக்கலில் இருப்பின் அல்லது ஏதேனும் கேள்விகள் இருந்தால், சேர்ந்துகொள்ளவும்:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

உत்பத்தி கருத்துக்கள் அல்லது பிழைகள் இருந்தால் பார்வையிடவும்:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**வெளியீட்டு அறிக்கை**:  
இந்த ஆவணம் [Co-op Translator](https://github.com/Azure/co-op-translator) என்ற செயற்கை நுண்ணறிவு மொழிபெயர்ப்பு சேவையை பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சித்தாலும், தன்னியக்கிய மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருப்பதற்கான வாய்ப்பு உண்டு என்பதை தயவுசெய்து கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் இயல்புவான மொழியில் அதிகாரப்பூர்வ ஆதாரமாகத் கருதப்படவேண்டும். முக்கியமான தகவல்களுக்கு தொழில்முறை மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பின் பயன்படுத்துவதன் மூலம் ஏற்பட்ட தவறுகள் அல்லது தவறான விளக்கங்களுக்கு நாங்கள் பொறுப்பானவர்களல்ல.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->