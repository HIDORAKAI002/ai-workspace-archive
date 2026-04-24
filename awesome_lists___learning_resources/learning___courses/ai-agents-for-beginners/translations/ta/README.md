# துவக்கத்திற்கான AI முகவர்கள் - ஒரு படிப்பு

![துவக்கத்திற்கான AI முகவர்கள்](../../translated_images/ta/repo-thumbnailv2.06f4a48036fde647.webp)

## AI முகவர்கள் கட்டியெழுப்பத் தொடங்க தேவையான அனைத்தையும் கற்பிக்கும் ஒரு பாடநெறி

[![GitHub உரிமம்](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub பங்களிப்பாளர்கள்](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub பிரச்சினைகள்](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub புள்-ரிகுவஸ்ட்கள்](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![PRs வரவேற்கப்படுகின்றன](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 பன்மொழி ஆதரவு

#### GitHub செயல்பாடின் மூலம் ஆதரிக்கப்படுகிறது (தானாகவும் எப்போதும் புதுப்பிக்கப்பட்டது)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[அரபு](../ar/README.md) | [பெங்காலி](../bn/README.md) | [பல்கேரியன்](../bg/README.md) | [பர்மீஸ் (மியான்மர்)](../my/README.md) | [சீனம் (எளிமைப்படுத்தப்பட்ட)](../zh-CN/README.md) | [சீனம் (பாரம்பரிய, ஹாங்காங்)](../zh-HK/README.md) | [சீனம் (பாரம்பரிய, மேகாவ்)](../zh-MO/README.md) | [சீனம் (பாரம்பரிய, தைவான்)](../zh-TW/README.md) | [க்ரோஷியன்](../hr/README.md) | [செக்](../cs/README.md) | [டேனிஷ்](../da/README.md) | [டச்சு](../nl/README.md) | [எஸ்டோனியன்](../et/README.md) | [பின்னிஷ்](../fi/README.md) | [பிரெஞ்சு](../fr/README.md) | [ஜெர்மன்](../de/README.md) | [கிரேக்கம்](../el/README.md) | [ஹீப்ரு](../he/README.md) | [ஹிந்தி](../hi/README.md) | [ஹங்கேரியன்](../hu/README.md) | [இந்தோனேஷியன்](../id/README.md) | [இத்தாலியன்](../it/README.md) | [ஜப்பானியன்](../ja/README.md) | [கன்னட](../kn/README.md) | [க்மேர்](../km/README.md) | [கொரியன்](../ko/README.md) | [லிதுவேனியன்](../lt/README.md) | [மலாய்](../ms/README.md) | [மலையாளம்](../ml/README.md) | [மராத்தி](../mr/README.md) | [நேபாளி](../ne/README.md) | [நைஜீரியன் பிஜின்](../pcm/README.md) | [நோர்வேஜியன்](../no/README.md) | [பெர்ஸியன் (பார்ஸி)](../fa/README.md) | [போலிஷ்](../pl/README.md) | [போர்த்துக்கீசியன் (பிரேசில்)](../pt-BR/README.md) | [போர்த்துக்கீசியன் (போர்ச்சுகல்)](../pt-PT/README.md) | [பஞ்சாபி (குருமுகி)](../pa/README.md) | [ரோமானியன்](../ro/README.md) | [ரஷியன்](../ru/README.md) | [செர்பியன் (சிரிலிக்)](../sr/README.md) | [ஸ்லோவக்](../sk/README.md) | [ஸ்லோவேனியம்](../sl/README.md) | [ஸ்பானிஷ்](../es/README.md) | [ஸ்வაჹிலி](../sw/README.md) | [ஸ்வீடிஷ்](../sv/README.md) | [தகவொகால் (ஃபிலிபினோ)](../tl/README.md) | [தமிழ்](./README.md) | [தெலுங்கு](../te/README.md) | [தை](../th/README.md) | [துர்கிஷ்](../tr/README.md) | [உக்ரைனியன்](../uk/README.md) | [உருது](../ur/README.md) | [வியETSநாமீஸ்](../vi/README.md)

> **உள்ளூர் கிளோன் செய்ய விரும்புகிறீர்களா?**
>
> இந்த கோப்பகம் 50+ மொழிபெயர்ப்புகளை கொண்டுள்ளது, இது பதிவிறக்க அளவை மிகுந்தருகிறது. மொழிபெயர்ப்புகளின்றி கிளோன் செய்ய sparse checkout பயன்படுத்தவும்:
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
> இது பாடநெறியை நிறைவேற்ற தேவையான அனைத்தையும் மிகவும் விரைவான பதிவிறக்கத்துடன் தருகிறது.
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**மேலும் மொழிபெயர்ப்பு மொழிகள் ஆதரிக்கப்பட விரும்பினால் [இங்கே](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md) பட்டியலிடப்பட்டுள்ளன**

[![GitHub கண்காணிப்பவர்கள்](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub கிளோன்கள்](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub நட்சத்திரங்கள்](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 துவக்கம்

இந்த பாடநெறியில் AI முகவர்களை கட்டியெழுப்புவதற்கான அடிப்படைகளை உள்ளடக்கிய பாடங்கள் உள்ளன. ஒவ்வொரு பாடமும் தன் தலைப்பை உடையது, எனவே நீங்கள் விரும்பும் இடத்தில் துவங்குங்கள்!

இந்த பாடநெறிக்கான பன்மொழி ஆதரவு உள்ளது. எங்கள் [அங்கே இப்போது மொழிகள்](#-multi-language-support) செல்லவும்.

இது உங்கள் முதன்மையான ஜெனரேட்டிவ் AI மாதிரிகளுடன் கட்டியெழுப்புதல் என்றால், எங்கள் [துவக்கத்திற்கான ஜெனரேட்டிவ் AI](https://aka.ms/genai-beginners) பாடநெறியை பாருங்கள், இது GenAI உடன் கட்டியெழுப்ப 21 பாடங்களை கொண்டுள்ளது.

இந்த ரெப்போவை [நட்சத்திரம் (🌟) இட எண்ணம் மறக்க வேண்டாம்](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) மற்றும் [இதை பிள்ளைப் பெயரிடவும்](https://github.com/microsoft/ai-agents-for-beginners/fork) குறியீட்டை இயக்க.

### பிற கற்க்கக் கொண்டவர்களை சந்தியுங்கள், உங்கள் கேள்விகள் பதில்கள் பெறுங்கள்

AI முகவர்களை கட்டியெழுப்பும் போது சிக்கல் வந்தால் அல்லது கேள்விகள் இருந்தால், எங்கள் Microsoft Foundry Discord இல் உள்ள [ஒதுக்கிய Discord சேனலில்](https://aka.ms/ai-agents/discord) சேருங்கள்.

### என்ன தேவை

இந்த பாடத்தில் ஒவ்வொரு பாடத்திலும் குறியீடு எடுத்துக்காட்டுகள் உள்ளன, அவை code_samples கோப்பகத்தில் கிடைக்கும். நீங்கள் உங்கள் சொந்த நகலை உருவாக்க இந்த ரெப்போவை [பிள்ளைப் பெயரிடலாம்](https://github.com/microsoft/ai-agents-for-beginners/fork).  

இந்த பயிற்சிகளில் உள்ள குறியீடு எடுத்துக்காட்டுகள் Microsoft Agent Framework ஐ Azure AI Foundry Agent Service V2 உடன் பயன்படுத்துகின்றன:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - Azure கணக்கு தேவை

இந்த பாடநெறி Microsoft வழங்கும் பின்வரும் AI முகவர் கட்டமைப்புகள் மற்றும் சேவைகளைப் பயன்படுத்துகிறது:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)

சில குறியீடு எடுத்துக்காட்டுகள் OpenAI-ஐ ஆதரிக்கும் மாற்று வழங்குநர்களான [MiniMax](https://platform.minimaxi.com/) போன்றவற்றையும் ஆதரிக்கின்றன, இது பெரிய உரையாடல் மாதிரிகளை (மேற்கூறிய 204K டோக்கன்கள் வரை) வழங்குகிறது. கட்டமைப்பு விவரங்களுக்கு [பாடநெறி அமைப்பை](./00-course-setup/README.md) பாருங்கள்.

இந்த பாடத்தை இயக்கும் குறியீடுகளைப் பற்றி மேலதிக தகவலுக்கு [பாடநெறி அமைப்பு](./00-course-setup/README.md) செல்லவும்.

## 🙏 உதவ விரும்புகிறீர்களா?

உங்களுக்கு பரிந்துரைகள் உள்ளதா அல்லது எழுத்து தவறுகள் அல்லது குறியீடு பிழைகளை கண்டுபிடித்தீர்களா? [ஒரு பிரச்சனை எழுங்கள்](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) அல்லது [ஒரு புள் ரிகுவஸ்ட் உருவாக்குங்கள்](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)



## 📂 ஒவ்வொரு பாடத்திலும்

- README இல் எழுதப்பட்ட பாடமும் ஒரு சுருக்கமான வீடியோவும்
- Microsoft Agent Framework ஐ Azure AI Foundry உடன் பயன்படுத்தி Python குறியீடு எடுத்துக்காட்டுகள்
- உங்கள் கல்வியை தொடர்கக் கூடும் கூடுதல் வளங்களுக்கான இணைப்புகள்


## 🗃️ பாடங்கள்

| **பாடம்**                                    | **உரை மற்றும் குறியீடு**                              | **வீடியோ**                                                   | **கூடுதல் கற்றல்**                                                                     |
|----------------------------------------------|----------------------------------------------------|------------------------------------------------------------|----------------------------------------------------------------------------------------|
| AI முகவர்கள்மீது அறிமுகம் மற்றும் முகவர் பயன்பாடுகள் | [இணைப்பு](./01-intro-to-ai-agents/README.md)          | [வீடியோ](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI முகவர் கட்டமைப்புகளை ஆராய்தல்              | [இணைப்பு](./02-explore-agentic-frameworks/README.md)  | [வீடியோ](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI முகவர் வடிவமைப்பு பார்வைகள் புரிதல்          | [இணைப்பு](./03-agentic-design-patterns/README.md)     | [வீடியோ](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| கருவி பயன்பாட்டு வடிவமைப்பு                    | [இணைப்பு](./04-tool-use/README.md)                    | [வீடியோ](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| முகவர் RAG                                    | [இணைப்பு](./05-agentic-rag/README.md)                 | [வீடியோ](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| நம்பகமான AI முகவர்களை கட்டியெழுத்தல்          | [இணைப்பு](./06-building-trustworthy-agents/README.md) | [வீடியோ](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK ) | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| திட்டமிடல் வடிவமைப்பு                          | [இணைப்பு](./07-planning-design/README.md)             | [வீடியோ](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| பன்முகவர் வடிவமைப்பு                            | [இணைப்பு](./08-multi-agent/README.md)                 | [வீடியோ](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)  | [இணைப்பு](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| மெட்டாகாக்னிஷன் வடிவமைப்பு விதிமுறை                 | [Link](./09-metacognition/README.md)               | [Video](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| உற்பத்தியில் AI முகவர்கள்                      | [Link](./10-ai-agents-production/README.md)        | [Video](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| முகவர் நடைமுறைகளை பயன்படுத்துதல் (MCP, A2A மற்றும் NLWeb) | [Link](./11-agentic-protocols/README.md)           | [Video](https://youtu.be/X-Dh9R3Opn8)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI முகவர்களுக்கான சூழல் பொறியியல்            | [Link](./12-context-engineering/README.md)         | [Video](https://youtu.be/F5zqRV7gEag)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| முகவர் நினைவகத்தை நிர்வகித்தல்                      | [Link](./13-agent-memory/README.md)     |      [Video](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| Microsoft Agent Framework ஐ ஆராய்தல்                         | [Link](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| கணினி பயன்பாட்டு முகவர்களை உருவாக்குதல் (CUA)           | [Link](./15-browser-use/README.md)     |                                                            | [Link](https://docs.browser-use.com/examples/templates/playwright-integration)         |
| பரிமாணமுள்ள முகவர்களை நியமனம் செய்தல்                    | விரைவில் வருகிறது                            |                                                            |                                                                                        |
| உள்ளூர் AI முகவர்களை உருவாக்குதல்                     | விரைவில் வருகிறது                               |                                                            |                                                                                        |
| AI முகவர்களை பாதுகாப்பு                           | விரைவில் வருகிறது                               |                                                            |                                                                                        |

## 🎒 பிற பாடத்திட்டங்கள்

எங்கள் குழு பிற பாடத்திட்டங்களையும் உருவாக்குகிறது! பாருங்கள்:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### லாங்க்செயின்
[![LangChain4j for Beginners](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js for Beginners](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain for Beginners](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### அஸ்யூர் / எஜ் / MCP / முகவர்கள்
[![AZD for Beginners](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI for Beginners](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP for Beginners](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI Agents for Beginners](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### உருவாக்கும் AI தொடர்
[![Generative AI for Beginners](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Generative AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![Generative AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![Generative AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### மூலக் கற்றல்
[![ML for Beginners](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![Data Science for Beginners](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI for Beginners](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![Cybersecurity for Beginners](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![Web Dev for Beginners](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT for Beginners](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![XR Development for Beginners](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### கோபைலட் தொடர்
[![Copilot for AI Paired Programming](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![Copilot for C#/.NET](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![Copilot Adventure](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 சமூக நன்றி

Agentic RAG ஐ காட்சி படுத்தும் முக்கியக் குறியீட்டு உதாரணங்களை வழங்கிய [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) அவர்களுக்கு நன்றி.

## பங்களிப்பு

இந்த திட்டம் பங்களிப்ப்களையும் பரிந்துரைகளையும் வரவேற்கிறது. பெரும்பாலான பங்களிப்புகள், நீங்கள் ஒரு
Contributor License Agreement (CLA) உடன்பாட்டை ஏற்றுக்கொண்டு, உங்கள் பங்களிப்பை
நாங்கள் பயன்படுத்த உரிமையுள்ளதாகவும், உண்மையில் வழங்குகிறீர்கள் என்றும் அறிவிக்க வேண்டியதுண்டு. விரிவுகளுக்கு, <https://cla.opensource.microsoft.com> ஐ பார்க்கவும்.

நீங்கள் ஒரு pull கோரிக்கை சமர்ப்பிக்கும் போது, CLA bot தானாகவே நீங்கள் CLA வழங்க வேண்டுமா என்று நிர்ணயித்து PR-ஐ சரியான முறையில் அலங்கரிக்கும் (எ.கா., நிலை சரிபார்ப்பு, கருத்து). bot வழங்கும் அறிவுறுத்தல்களை நீங்கள் பின்பற்றவும். உங்கள் அனைத்து களஞ்சியங்களில் இந்த வேலை ஒன்றுதான் செய்ய வேண்டியிருக்கும்.

இந்த திட்டம் [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) ஐ ஏற்படுத்தியுள்ளது.
மேலும் தகவலுக்கு [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) பார்க்கவும் அல்லது
[opencode@microsoft.com](mailto:opencode@microsoft.com) க்கு மேலதிக கேள்விகள் அல்லது கருத்துகளுக்கு தொடர்புகொள்ளவும்.

## வர்த்தக அடையாளங்கள்

இந்த திட்டத்தில் திட்டங்கள், தயாரிப்புகள் அல்லது சேவைகளுக்கான வர்த்தக அடையாளங்கள் அல்லது லோகோக்கள் இருக்கலாம். Microsoft வர்த்தக அடையாளங்களை அல்லது லோகோக்களை பயன்படுத்துவதற்கான அங்கீகாரம்
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general)
அடிப்படையிலானது மற்றும் பின்பற்றப்படவேண்டும்.
இந்த திட்டத்தின் மாற்றிய மாற்றங்களில் Microsoft வர்த்தக அடையாளங்கள் அல்லது லோகோக்களை பயன்படுத்துவதை குழப்பம் ஏற்படுத்தக்கூடாது அல்லது Microsoft ஆதரவைக் குறிக்ககூடாது.
மூன்றாம் கட்சியின் வர்த்தக அடையாளங்கள் அல்லது லோகோக்கள் பயன்படுத்துவது அந்த மூன்றாம் கட்சியின் கொள்கைகளுக்கு உட்பட்டது.

## உதவி பெறுதல்

AI செயலிகள் உருவாக்குவதில் நீங்கள் சிக்கலடைந்தால் அல்லது கேள்விகள் இருந்தால், சேர்ந்துகொள்ளுங்கள்:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

உருவாக்கும் போது தயாரிப்பு கருத்துக்கள் அல்லது பிழைகள் இருந்தால் அணுகவும்:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**கட்டச்சாரீச்சு**:  
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) மூலம் மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்துக்கு முயற்சி செய்கின்ற போதிலும், தானியங்கி மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கக்கூடும் என்பதை நினைவில் கொள்ளவும். தாய்மொழியில் உள்ள அசல் ஆவணம் அதிகாரப்பூர்வ மூலமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்முறை மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பின் பயன்பாட்டின் மூலம் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கங்களுக்கும் நாங்கள் பொறுப்பேற்க மாட்டோம்.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->