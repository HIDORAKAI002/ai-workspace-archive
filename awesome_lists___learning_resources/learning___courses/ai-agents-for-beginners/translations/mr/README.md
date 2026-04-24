# AI एजंट्ससाठी सुरुवात करणाऱ्यांसाठी - एक कोर्स

![AI Agents for Beginners](../../translated_images/mr/repo-thumbnailv2.06f4a48036fde647.webp)

## AI एजंट्स तयार करण्यासाठी तुम्हाला आवश्यक असलेली सर्वकाही शिकवणारा एक कोर्स

[![GitHub license](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub contributors](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub issues](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 बहुभाषिक समर्थन

#### GitHub Action द्वारे समर्थित (स्वयंचलित आणि नेहमी अद्ययावत)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabic](../ar/README.md) | [Bengali](../bn/README.md) | [Bulgarian](../bg/README.md) | [Burmese (Myanmar)](../my/README.md) | [Chinese (Simplified)](../zh-CN/README.md) | [Chinese (Traditional, Hong Kong)](../zh-HK/README.md) | [Chinese (Traditional, Macau)](../zh-MO/README.md) | [Chinese (Traditional, Taiwan)](../zh-TW/README.md) | [Croatian](../hr/README.md) | [Czech](../cs/README.md) | [Danish](../da/README.md) | [Dutch](../nl/README.md) | [Estonian](../et/README.md) | [Finnish](../fi/README.md) | [French](../fr/README.md) | [German](../de/README.md) | [Greek](../el/README.md) | [Hebrew](../he/README.md) | [Hindi](../hi/README.md) | [Hungarian](../hu/README.md) | [Indonesian](../id/README.md) | [Italian](../it/README.md) | [Japanese](../ja/README.md) | [Kannada](../kn/README.md) | [Khmer](../km/README.md) | [Korean](../ko/README.md) | [Lithuanian](../lt/README.md) | [Malay](../ms/README.md) | [Malayalam](../ml/README.md) | [Marathi](./README.md) | [Nepali](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [Norwegian](../no/README.md) | [Persian (Farsi)](../fa/README.md) | [Polish](../pl/README.md) | [Portuguese (Brazil)](../pt-BR/README.md) | [Portuguese (Portugal)](../pt-PT/README.md) | [Punjabi (Gurmukhi)](../pa/README.md) | [Romanian](../ro/README.md) | [Russian](../ru/README.md) | [Serbian (Cyrillic)](../sr/README.md) | [Slovak](../sk/README.md) | [Slovenian](../sl/README.md) | [Spanish](../es/README.md) | [Swahili](../sw/README.md) | [Swedish](../sv/README.md) | [Tagalog (Filipino)](../tl/README.md) | [Tamil](../ta/README.md) | [Telugu](../te/README.md) | [Thai](../th/README.md) | [Turkish](../tr/README.md) | [Ukrainian](../uk/README.md) | [Urdu](../ur/README.md) | [Vietnamese](../vi/README.md)

> **स्थानिकरित्या क्लोन करण्याला प्राधान्य देता?**
>
> या रेपॉजिटरीमध्ये ५०+ भाषांमध्ये अनुवाद समाविष्ट आहेत ज्यामुळे डाउनलोड आकार मोठा होतो. अनुवादांशिवाय क्लोन करण्यासाठी sparse checkout वापरा:
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
> यामुळे तुम्हाला कोर्स पूर्ण करण्यासाठी आवश्यक सर्वकाही अधिक जलद डाउनलोड करता येईल.
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**अधिक भाषांमध्ये अनुवादासाठी समर्थित भाषा येथे दिल्या आहेत [here](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md)**

[![GitHub watchers](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub forks](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub stars](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 सुरुवात करणे

हा कोर्स AI एजंट्स तयार करण्याच्या मूलभूत संकल्पनांवर आधारित धडे देतो. प्रत्येक धडा आपला स्वतःचा विषय मांडतो, त्यामुळे तुमच्या आवडीनुसार कुठूनही सुरुवात करा!

या कोर्ससाठी बहुभाषिक समर्थन उपलब्ध आहे. आमच्या [उपलब्ध भाषां येथे](#-multi-language-support) पहा.

जर तुम्ही जनरेटिव्ह AI मॉडेलसह प्रथमच काम करत असाल, तर आमचा [Generative AI For Beginners](https://aka.ms/genai-beginners) कोर्स पाहा, ज्यामध्ये GenAI वापरून तयार करण्याचे २१ धडे आहेत.

कोड चालवण्यासाठी आणि या रेपॉजिटरीत काम करत असताना [या रेपॉजिटरीला (🌟) स्टार देणे भुलू नका](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) आणि [फोर्क करणे](https://github.com/microsoft/ai-agents-for-beginners/fork).

### इतर शिकणाऱ्यांशी भेटा, तुमच्या प्रश्नांची उत्तरे मिळवा

जर तुम्हाला अडचण येत असेल किंवा AI एजंट्स तयार करण्या संदर्भात काही प्रश्न असतील, तर [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) मध्ये आमच्या समर्पित Discord चॅनेलमध्ये सहभागी व्हा.

### तुम्हाला काय लागेल 

या कोर्समधील प्रत्येक धड्यात कोड उदाहरणे समाविष्ट आहेत, जी code_samples फोल्डरमध्ये आहेत. तुम्ही [या रेपॉजिटरीला फोर्क](https://github.com/microsoft/ai-agents-for-beginners/fork) करून तुमची स्वतःची कॉपी तयार करू शकता.

या व्यायामांतील कोड उदाहरणे Microsoft Agent Framework सह Azure AI Foundry Agent Service V2 वापरतात:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - Azure Account आवश्यक

हा कोर्स खालील Microsoft चे AI एजंट फ्रेमवर्क आणि सेवांचा वापर करतो:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)

काही कोड नमुन्यांनी OpenAI-संगत पर्यायांना समर्थन दिले आहे जसे की [MiniMax](https://platform.minimaxi.com/), जे मोठ्या संदर्भाच्या मॉडेल्स (२०४के टोकन्सपर्यंत) ऑफर करतात. संरचनाबद्दल तपशीलांसाठी [Course Setup](./00-course-setup/README.md) पहा.

या कोर्ससाठी कोड चालवायचा असल्यास अधिक माहितीसाठी, [Course Setup](./00-course-setup/README.md) येथे पहा.

## 🙏 मदत हवी आहे?

तुमच्याकडे सूचना आहेत किंवा स्पेलिंग किंवा कोड मध्ये चुका सापडल्या आहेत का? [एक इश्यू उघडा](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) किंवा [पुल रिक्वेस्ट तयार करा](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)

## 📂 प्रत्येक धड्यात समाविष्ट आहे

- README मध्ये लेखी धडा आणि एक लहान व्हिडिओ
- Microsoft Agent Framework सह Azure AI Foundry वापरून Python कोड नमुने
- पुढील शिक्षणासाठी अतिरिक्त संसाधनांचे दुवे

## 🗃️ धडे

| **धडा**                                     | **मजकूर आणि कोड**                                 | **व्हिडिओ**                                                | **अतिरिक्त शिक्षण**                                                                       |
|---------------------------------------------|---------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------|
| AI एजंट्सची ओळख आणि एजंट वापर प्रकरणे       | [Link](./01-intro-to-ai-agents/README.md)          | [Video](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| AI एजंटिक फ्रेमवर्क्सचा अभ्यास                | [Link](./02-explore-agentic-frameworks/README.md)  | [Video](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| AI एजंटिक डिझाईन पॅटर्न समजून घेणे           | [Link](./03-agentic-design-patterns/README.md)     | [Video](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| टूल वापर डिझाईन पॅटर्न                      | [Link](./04-tool-use/README.md)                    | [Video](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| एजंटिक RAG                                  | [Link](./05-agentic-rag/README.md)                 | [Video](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| विश्वासार्ह AI एजंट्स तयार करणे               | [Link](./06-building-trustworthy-agents/README.md) | [Video](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK ) | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| नियोजन डिझाईन पॅटर्न                        | [Link](./07-planning-design/README.md)             | [Video](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| मल्टी-एजंट डिझाईन पॅटर्न                    | [Link](./08-multi-agent/README.md)                 | [Video](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)   |
| मेटकॉग्निशन डिझाइन पॅटर्न                 | [Link](./09-metacognition/README.md)               | [Video](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| उत्पादनात AI एजंट्स                      | [Link](./10-ai-agents-production/README.md)        | [Video](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजेंटिक प्रोटोकॉल वापरणे (MCP, A2A आणि NLWeb) | [Link](./11-agentic-protocols/README.md)           | [Video](https://youtu.be/X-Dh9R3Opn8)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI एजंट्ससाठी संदर्भ अभियांत्रिकी            | [Link](./12-context-engineering/README.md)         | [Video](https://youtu.be/F5zqRV7gEag)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजेंटिक मेमरी व्यवस्थापन                      | [Link](./13-agent-memory/README.md)     |      [Video](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| मायक्रोसॉफ्ट एजंट फ्रेमवर्क एक्सप्लोर करणे                         | [Link](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| संगणक वापर एजंट्स (CUA) तयार करणे           | [Link](./15-browser-use/README.md)     |                                                            | [Link](https://docs.browser-use.com/examples/templates/playwright-integration)         |
| स्केलेबल एजंट्स तैनात करणे                    | येत आहे                            |                                                            |                                                                                        |
| स्थानिक AI एजंट्स तयार करणे                     | येत आहे                               |                                                            |                                                                                        |
| AI एजंट्स सुरक्षित करणे                           | येत आहे                               |                                                            |                                                                                        |

## 🎒 अन्य कोर्सेस

आमच्या टीमने इतर कोर्सेस तयार केले आहेत! पाहा:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### LangChain
[![LangChain4j for Beginners](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js for Beginners](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain for Beginners](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### Azure / Edge / MCP / एजंट्स
[![AZD for Beginners](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI for Beginners](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP for Beginners](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI Agents for Beginners](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### जनरेटिव AI मालिका
[![Generative AI for Beginners](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Generative AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![Generative AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![Generative AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### कोअर शिक्षण
[![ML for Beginners](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![Data Science for Beginners](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI for Beginners](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![Cybersecurity for Beginners](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![Web Dev for Beginners](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT for Beginners](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![XR Development for Beginners](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### कॉपायलट सिरीज
[![Copilot for AI Paired Programming](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![Copilot for C#/.NET](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![Copilot Adventure](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 समुदायाचे आभार

Agentic RAG दर्शविणारे महत्त्वाचे कोड नमुने देण्यासाठी [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) यांचे आभार.

## योगदान

हा प्रकल्प योगदान आणि सूचना यांचे स्वागत करतो. बहुतेक योगदानासाठी आपल्याला Contributor License Agreement (CLA) सहमत व्हावे लागते ज्याद्वारे आपण आपले योगदान वापरण्याचा हक्क आम्हाला दिला आहे याची खात्री देता. तपशीलांसाठी, भेट द्या <https://cla.opensource.microsoft.com>.

जेव्हा आपण पुल विनंती सादर करता, तेव्हा CLA बॉट आपल्याला CLA प्रदान आवश्यक आहे का ते स्वयंचलितपणे ठरवेल आणि PR योग्यरित्या सजवेल (उदा., स्तिथी तपासणी, टिप्पणी). फक्त बॉटकडून दिलेल्या सूचना पालन करा. आपल्याला आमच्या CLA वापरणारे सर्व रिपॉसाठी हे एकदाच करावे लागेल.

हा प्रकल्प [मायक्रोसॉफ्ट खुल्या स्रोत आचारसंहिता](https://opensource.microsoft.com/codeofconduct/) स्वीकारतो.
अधिक माहितीसाठी [आचारसंहिता FAQ](https://opensource.microsoft.com/codeofconduct/faq/) पहा किंवा  
[opencode@microsoft.com](mailto:opencode@microsoft.com) वर काही अतिरिक्त प्रश्न किंवा टिप्पण्या असल्यास संपर्क करा.

## ट्रेडमार्क

हा प्रकल्प प्रकल्प, उत्पादन किंवा सेवांसाठी ट्रेडमार्क किंवा लोगो असू शकतो. अधिकृतपणे मायक्रोसॉफ्ट ट्रेडमार्क किंवा लोगो वापरण्यासाठी  
[मायक्रोसॉफ्ट ट्रेडमार्क व ब्रँड मार्गदर्शक तत्त्वे](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) चे पालन करणे आवश्यक आहे.  
या प्रकल्पातील बदलेले आवृत्त्यांमध्ये Microsoft ट्रेडमार्क किंवा लोगो वापरल्यास गोंधळ किंवा मायक्रोसॉफ्ट प्रायोजकत्वाची सूचनाही होऊ नये.  
तृतीय-पक्ष ट्रेडमार्क किंवा लोगो वापर हा त्या तृतीय-पक्षांच्या धोरणांनुसार असतो.

## मदत मिळवा


जर आपण अडकलात किंवा AI अॅप्लिकेशन्स तयार करताना प्रश्न असतील, तर सामील व्हा:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

जर आपल्याला उत्पादनाबाबत अभिप्राय किंवा त्रुटी असतील तर भेट द्या:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) वापरून अनुवादित केला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया जाणून घ्या की स्वयंचलित भाषांतरांमध्ये चुका किंवा अचूकतेतील त्रुटी असू शकतात. मूळ दस्तऐवज त्याच्या मातृभाषेत शासकीय स्रोत म्हणून विचारात घेतला पाहिजे. महत्त्वाच्या माहितीसाठी व्यावसायिक मानवी भाषांतर शिफारस केली जाते. या भाषांतराचा वापर केल्यामुळे उद्भवलेल्या कोणत्याही गैरसमजुती किंवा चुकीच्या समजुतींबद्दल आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->