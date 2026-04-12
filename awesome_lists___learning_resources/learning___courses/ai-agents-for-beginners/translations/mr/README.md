# सुरुवातीसाठी एआय एजंट्स - एक कोर्स

![Generative AI For Beginners](../../translated_images/mr/repo-thumbnailv2.06f4a48036fde647.webp)

## एआय एजंट्स तयार करण्यासाठी आवश्यक असलेली सर्वकाही शिकवणारा एक कोर्स

[![GitHub license](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub contributors](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub issues](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 बहुभाषिक समर्थन

#### GitHub Action द्वारे समर्थित (स्वयंचलित आणि नेहमी अद्ययावत)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabic](../ar/README.md) | [Bengali](../bn/README.md) | [Bulgarian](../bg/README.md) | [Burmese (Myanmar)](../my/README.md) | [Chinese (Simplified)](../zh-CN/README.md) | [Chinese (Traditional, Hong Kong)](../zh-HK/README.md) | [Chinese (Traditional, Macau)](../zh-MO/README.md) | [Chinese (Traditional, Taiwan)](../zh-TW/README.md) | [Croatian](../hr/README.md) | [Czech](../cs/README.md) | [Danish](../da/README.md) | [Dutch](../nl/README.md) | [Estonian](../et/README.md) | [Finnish](../fi/README.md) | [French](../fr/README.md) | [German](../de/README.md) | [Greek](../el/README.md) | [Hebrew](../he/README.md) | [Hindi](../hi/README.md) | [Hungarian](../hu/README.md) | [Indonesian](../id/README.md) | [Italian](../it/README.md) | [Japanese](../ja/README.md) | [Kannada](../kn/README.md) | [Khmer](../km/README.md) | [Korean](../ko/README.md) | [Lithuanian](../lt/README.md) | [Malay](../ms/README.md) | [Malayalam](../ml/README.md) | [Marathi](./README.md) | [Nepali](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [Norwegian](../no/README.md) | [Persian (Farsi)](../fa/README.md) | [Polish](../pl/README.md) | [Portuguese (Brazil)](../pt-BR/README.md) | [Portuguese (Portugal)](../pt-PT/README.md) | [Punjabi (Gurmukhi)](../pa/README.md) | [Romanian](../ro/README.md) | [Russian](../ru/README.md) | [Serbian (Cyrillic)](../sr/README.md) | [Slovak](../sk/README.md) | [Slovenian](../sl/README.md) | [Spanish](../es/README.md) | [Swahili](../sw/README.md) | [Swedish](../sv/README.md) | [Tagalog (Filipino)](../tl/README.md) | [Tamil](../ta/README.md) | [Telugu](../te/README.md) | [Thai](../th/README.md) | [Turkish](../tr/README.md) | [Ukrainian](../uk/README.md) | [Urdu](../ur/README.md) | [Vietnamese](../vi/README.md)

> **स्थानिक क्लोन करणे प्राधान्य देता?**
>
> या रेपॉजिटरीमध्ये ५०+ भाषा अनुवादांचा समावेश आहे ज्यामुळे डाउनलोड आकार लक्षणीय वाढतो. अनुवादांशिवाय क्लोन करण्यासाठी sparse checkout वापरा:
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
> यामुळे आपल्याला कोर्स पूर्ण करण्यासाठी आवश्यक सर्वकाही खूप वेगाने डाउनलोड करता येईल.
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**आपल्याला अधिक भाषांमध्ये अनुवाद हवे असल्यास ते येथे [यादीबद्ध](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md) केलेले आहेत.**

[![GitHub watchers](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub forks](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub stars](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 सुरुवात करणे

हा कोर्स एआय एजंट्स तयार करण्याच्या मूलभूत गोष्टींचे धडे समाविष्ट करतो. प्रत्येक धडा स्वतःचा विषय समजावतो, त्यामुळे तुम्हाला जिथे हवे तिथे सुरुवात करा!

या कोर्ससाठी बहुभाषिक समर्थन उपलब्ध आहे. आमच्या [उपलब्ध भाषा येथे पहा](#-multi-language-support). 

जर तुम्ही प्रथमच जनरेटिव्ह एआय मॉडेल्ससह काम करत असाल, तर आमचा [Generative AI For Beginners](https://aka.ms/genai-beginners) कोर्स पाहा, ज्यामध्ये GenAI सह काम करण्यावरील २१ धडे आहेत.

हा रेपॉजिटरी [स्टार (🌟) करायला](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) आणि [फॉर्क करायला](https://github.com/microsoft/ai-agents-for-beginners/fork) विसरू नका, जेणेकरून तुम्ही कोड चालवू शकता.

### इतर शिक्षार्थ्यांना भेटा, तुमचे प्रश्न विचारा

जर तुम्हाला अडचण आली किंवा एआय एजंट तयार करण्याबाबत काही प्रश्न असतील, तर आमच्या समर्पित Discord चॅनेलमध्ये सहभागी व्हा, जे [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) मध्ये आहे.

### तुम्हाला काय आवश्यक आहे 

या कोर्समधील प्रत्येक धड्यात कोडच्या उदाहरणांचा समावेश आहे, जे code_samples फोल्डरमध्ये सापडतील. तुम्ही [हा रेपॉजिटरी फॉर्क](https://github.com/microsoft/ai-agents-for-beginners/fork) करून स्वतःची कॉपी तयार करू शकता.  

या व्यायामांमध्ये कोड उदाहरणांमध्ये Microsoft Agent Framework सह Azure AI Foundry Agent Service V2 वापरले आहे:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - Azure खाते आवश्यक

हा कोर्स Microsoft कडून खालील AI Agent फ्रेमवर्क्स आणि सेवा वापरतो:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)


या कोर्ससाठी कोड चालवण्याविषयी अधिक माहितीसाठी, [Course Setup](./00-course-setup/README.md) येथे जा.

## 🙏 मदत करू इच्छिता?

आपल्याकडे सूचने आहेत का किंवा स्पेलिंग किंवा कोड चुका आढळल्या आहेत का? [इश्यू नोंदवा](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) किंवा [पुल रिक्वेस्ट तयार करा](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)



## 📂 प्रत्येक धडा यामध्ये समाविष्ट आहे

- README मध्ये लिहिलेला धडा आणि एक लघु व्हिडिओ
- Microsoft Agent Framework सह Azure AI Foundry वापरून Python कोड उदाहरणे
- तुमचे शिक्षण पुढे सुरू ठेवण्यासाठी अतिरिक्त संसाधनांचे दुवे


## 🗃️ धडे

| **धडा**                                      | **मजकूर आणि कोड**                                    | **व्हिडिओ**                                                    | **अतिरिक्त शिक्षण**                                                                       |
|----------------------------------------------|------------------------------------------------------|--------------------------------------------------------------|------------------------------------------------------------------------------------------|
| AI एजंट्स आणि एजंट वापर प्रकरणांची ओळख       | [दुवा](./01-intro-to-ai-agents/README.md)              | [व्हिडिओ](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)    | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| AI एजंटिक फ्रेमवर्क्सचा अभ्यास               | [दुवा](./02-explore-agentic-frameworks/README.md)      | [व्हिडिओ](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)    | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| AI एजंटिक डिझाइन पॅटर्न समजून घ्या           | [दुवा](./03-agentic-design-patterns/README.md)         | [व्हिडिओ](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)    | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| टूल वापर डिझाइन पॅटर्न                       | [दुवा](./04-tool-use/README.md)                        | [व्हिडिओ](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)    | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| एजंटिक RAG                                  | [दुवा](./05-agentic-rag/README.md)                     | [व्हिडिओ](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)    | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| विश्वासार्ह AI एजंट्स तयार करणे               | [दुवा](./06-building-trustworthy-agents/README.md)     | [व्हिडिओ](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK )   | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| नियोजन डिझाइन पॅटर्न                         | [दुवा](./07-planning-design/README.md)                 | [व्हिडिओ](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)    | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| मल्टि-एजंट डिझाइन पॅटर्न                     | [दुवा](./08-multi-agent/README.md)                     | [व्हिडिओ](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)    | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| मेटाकॉग्निशन डिझाइन पॅटर्न                 | [Link](./09-metacognition/README.md)               | [Video](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI एजंट्स इन प्रॉडक्शन                      | [Link](./10-ai-agents-production/README.md)        | [Video](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजंटिक प्रोटोकॉल्सचा वापर (MCP, A2A आणि NLWeb) | [Link](./11-agentic-protocols/README.md)           | [Video](https://youtu.be/X-Dh9R3Opn8)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI एजंटसाठी संदर्भ अभियांत्रिकी            | [Link](./12-context-engineering/README.md)         | [Video](https://youtu.be/F5zqRV7gEag)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजंटिक मेमरी व्यवस्थापन                    | [Link](./13-agent-memory/README.md)     |      [Video](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| मायक्रोसॉफ्ट एजंट फ्रेमवर्कचा शोध          | [Link](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| कॉम्प्युटर युज एजंट्स (CUA) तयार करणे       | लवकर येत आहे                            |                                                            |                                                                                        |
| स्केलेबल एजंट्सची डिप्लॉयमेंट               | लवकर येत आहे                            |                                                            |                                                                                        |
| स्थानिक AI एजंट तयार करणे                   | लवकर येत आहे                               |                                                            |                                                                                        |
| AI एजंट्स सुरक्षित करणे                      | लवकर येत आहे                               |                                                            |                                                                                        |

## 🎒 इतर अभ्यासक्रम

आमची टीम इतर अभ्यासक्रम तयार करते! पहा:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### LangChain
[![LangChain4j फॉर बिगिनर्स](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js फॉर बिगिनर्स](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain फॉर बिगिनर्स](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### Azure / Edge / MCP / एजंट्स
[![AZD फॉर बिगिनर्स](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI फॉर बिगिनर्स](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP फॉर बिगिनर्स](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI एजंट्स फॉर बिगिनर्स](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### जनरेटिव AI सीरीज
[![जनरेटिव AI फॉर बिगिनर्स](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![जनरेटिव AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![जनरेटिव AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![जनरेटिव AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### कोर लर्निंग
[![ML फॉर बिगिनर्स](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![डेटा सायन्स फॉर बिगिनर्स](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI फॉर बिगिनर्स](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![सायबरसिक्युरिटी फॉर बिगिनर्स](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![वेब डेव्ह फॉर बिगिनर्स](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT फॉर बिगिनर्स](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![XR डेव्हलपमेंट फॉर बिगिनर्स](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### कोपायलट सीरीज
[![AI पेअर्ड प्रोग्रॅमिंगसाठी कोपायलट](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![C#/.NET साठी कोपायलट](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![कोपायलट अ‍ॅडव्हेंचर](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 समुदायाचे आभार

महत्त्वाचे कोड नमुने प्रदर्शित केल्याबद्दल [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) यांचे आभार, ज्यांनी एजंटिक RAG सादर केला.

## योगदान

हा प्रकल्प योगदान आणि सूचना स्वीकारतो. बहुतेक योगदानांसाठी आपल्याला Contributor License Agreement (CLA) सहमत व्हावे लागते जे घोषित करते की आपल्याकडे आपले योगदान वापरण्याचा अधिकार आहे आणि आपण ते खरोखर देत आहात. तपशीलांसाठी, भेट द्या <https://cla.opensource.microsoft.com>.

जेव्हा आपण पुल विनंती सादर करता, तेव्हा CLA बॉट आपल्याला CLA द्यायची गरज आहे का ते स्वयंचलितपणे ठरवेल आणि PR योग्यरित्या सजवेल (उदा., स्थिती तपासणी, टिप्पणी). फक्त बॉटने दिलेल्या सूचनांचे अनुसरण करा. हे आपल्याला आमच्या CLA वापरणाऱ्या सर्व रेपोसाठी केवळ एकदाच करावे लागेल.

या प्रकल्पाने [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) स्वीकारला आहे.
अधिक माहितीसाठी [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) पहा किंवा कोणत्याही अतिरिक्त प्रश्नांसाठी किंवा टिप्पण्यांसाठी [opencode@microsoft.com](mailto:opencode@microsoft.com) संपर्क करा.

## ट्रेडमार्क्स

हा प्रकल्प प्रकल्प, उत्पादने किंवा सेवा यांचे ट्रेडमार्क्स किंवा लोगो असू शकतो. मायक्रोसॉफ्ट ट्रेडमार्क्स किंवा लोगोचा अधिकृत वापर [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) च्या अधीन आहे आणि त्यांचे पालन करणे आवश्यक आहे.
या प्रकल्पाच्या सुधारित आवृत्त्यांमध्ये मायक्रोसॉफ्ट ट्रेडमार्क्स किंवा लोगोचा वापर संभ्रम निर्माण करू नये किंवा मायक्रोसॉफ्ट प्रायोजकत्व सूचित करू नये.
तृतीय-पक्ष ट्रेडमार्क्स किंवा लोगोच्या कोणत्याही वापरासाठी संबंधित तृतीय-पक्ष धोरणे लागू होतात.

## मदत घेणे


आपण अडकून पडल्यास किंवा AI अ‍ॅप्स तयार करताना काही प्रश्न असल्यास, सामील व्हा:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

उत्पादनाबाबत अभिप्राय किंवा अडचणी असल्यास, भेट द्या:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून भाषांतरित केला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात ठेवा की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा चुकीची माहिती असू शकते. मूळ दस्तऐवज त्याच्या स्थानिक भाषेत अधिकृत स्रोत मानले पाहिजे. महत्त्वाच्या माहितीसाठी, व्यावसायिक मानवी भाषांतर शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवलेल्या कोणत्याही गैरसमजुतींविषयी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->