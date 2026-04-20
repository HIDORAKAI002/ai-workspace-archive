# सुरुवातीसाठी AI एजंट्स - एक अभ्यासक्रम

![सुरुवातीसाठी AI एजंट्स](../../translated_images/mr/repo-thumbnailv2.06f4a48036fde647.webp)

## AI एजंट्स तयार करण्यासाठी सुरू करण्यासाठी तुम्हाला जे काही माहित असणे आवश्यक आहे ते सर्व शिकवणारा अभ्यासक्रम

[![GitHub परवाना](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub योगदानकर्ता](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub समस्या](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub पुल-रिक्वेस्ट्स](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![PRs स्वागत आहे](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 बहुभाषिक समर्थन

#### GitHub Action च्या माध्यमातून समर्थीत (स्वयंचलित आणि सदैव अद्ययावत)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[अरबी](../ar/README.md) | [बंगाली](../bn/README.md) | [बल्गेरियन](../bg/README.md) | [बर्मी (म्यानमार)](../my/README.md) | [चिनी (सोपे)](../zh-CN/README.md) | [चिनी (परंपरागत, हॉंगकॉंग)](../zh-HK/README.md) | [चिनी (परंपरागत, मकाऊ)](../zh-MO/README.md) | [चिनी (परंपरागत, तैवान)](../zh-TW/README.md) | [क्रोएशियन](../hr/README.md) | [चेक](../cs/README.md) | [डॅनिश](../da/README.md) | [डच](../nl/README.md) | [एस्टोनियन](../et/README.md) | [फिन्निश](../fi/README.md) | [फ्रेंच](../fr/README.md) | [जर्मन](../de/README.md) | [ग्रीक](../el/README.md) | [हिब्रू](../he/README.md) | [हिंदी](../hi/README.md) | [हंगेरियन](../hu/README.md) | [इंडोनेशियन](../id/README.md) | [इटालियन](../it/README.md) | [जपानी](../ja/README.md) | [कन्नड](../kn/README.md) | [खमेर](../km/README.md) | [कोरियन](../ko/README.md) | [लिथुआनियन](../lt/README.md) | [मलय](../ms/README.md) | [मल्याळम](../ml/README.md) | [मराठी](./README.md) | [नेपाली](../ne/README.md) | [नायजेरियन पिजिन](../pcm/README.md) | [नॉर्वेजियन](../no/README.md) | [फारसी (पर्शियन)](../fa/README.md) | [पोलिश](../pl/README.md) | [पॉर्चुगिझ (ब्राझील)](../pt-BR/README.md) | [पॉर्चुगिझ (पोर्तुगाल)](../pt-PT/README.md) | [पंजाबी (गुरुमुखी)](../pa/README.md) | [रोमॅनियन](../ro/README.md) | [रशियन](../ru/README.md) | [सर्बियन (सिरिलिक)](../sr/README.md) | [स्लोव्हाक](../sk/README.md) | [स्लोव्हेनियन](../sl/README.md) | [स्पॅनिश](../es/README.md) | [स्वाहिली](../sw/README.md) | [स्वीडिश](../sv/README.md) | [टॅगलॉग (फिलिपिनो)](../tl/README.md) | [तमिळ](../ta/README.md) | [तेलुगू](../te/README.md) | [थाई](../th/README.md) | [टर्किश](../tr/README.md) | [युक्रेनियन](../uk/README.md) | [उर्दू](../ur/README.md) | [व्हिएतनामी](../vi/README.md)

> **स्थानिक पद्धतीने क्लोन करायचे आहे का?**
>
> या रेपॉझिटरीमध्ये ५०+ भाषा अनुवादांचा समावेश आहे ज्यामुळे डाउनलोड साईज लक्षणीय वाढते. अनुवादांशिवाय क्लोन करण्यासाठी, sparse checkout वापरा:
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
> यामुळे कोर्स पूर्ण करण्यासाठी तुम्हाला सर्व काही खूप जलद डाउनलोड होईल.
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**आपल्याला आणखी भाषांमध्ये अनुवादासाठी समर्थन हवे असल्यास ते [येथे](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md) दिलेले आहे**

[![GitHub पर्यवेक्षक](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub फोर्क्स](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub स्टार्स](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 सुरुवात कशी करावी

हा कोर्स AI एजंट्स तयार करण्याच्या मूलभूत गोष्टींचा आढावा घेतो. प्रत्येक धडा त्याचा स्वतःचा विषय समजावतो त्यामुळे कुठूनही सुरुवात करा!

या कोर्ससाठी बहुभाषिक समर्थन आहे. आमच्या [उपलब्ध भाषांकडे येथे जा](#-multi-language-support). 

जर आपण प्रथमच Generative AI मॉडेल्ससह काम करत असाल, तर आमचा [Generative AI For Beginners](https://aka.ms/genai-beginners) अभ्यासक्रम पहा, ज्यामध्ये GenAI सह तयार करण्यासाठी २१ धडे आहेत.

हे रेपॉ [⭐ (star)](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) करायला विसरू नका आणि [या रेपॉचे फोर्क करा](https://github.com/microsoft/ai-agents-for-beginners/fork) आणि कोड चालवा.

### इतर शिकणाऱ्यांना भेटा, तुमचे प्रश्न विचारा

जर तुम्हाला अडचण येत असेल किंवा AI एजंट्स तयार करण्याबाबत काही प्रश्न असतील, तर आमच्या समर्पित Discord चॅनेलमध्ये [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) मध्ये सामील व्हा.

### काय लागेल

या कोर्समधील प्रत्येक धड्यात कोडच्या उदाहरणांचा समावेश आहे, जे code_samples फोल्डरमध्ये सापडतील. तुम्ही [हा रेपॉ फोर्क](https://github.com/microsoft/ai-agents-for-beginners/fork) करून तुमची स्वतःची कॉपी तयार करू शकता.

या व्यायामांतील कोड उदाहरणे Microsoft Agent Framework सह Azure AI Foundry Agent Service V2 वापरतात:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - Azure अकाउंट आवश्यक

हा कोर्स Microsoft कडून खालील AI एजंट फ्रेमवर्क आणि सेवा वापरतो:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)

या कोर्ससाठी कोड चालवण्याबाबत अधिक माहितीसाठी, [Course Setup](./00-course-setup/README.md) येथे भेट द्या.

## 🙏 मदत करायची आहे?

तुमच्याकडे सुचना आहेत किंवा स्पेलिंग किंवा कोडमध्ये चुका सापडल्या आहेत का? [इश्यू उघडा](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) किंवा [पुल रिक्वेस्ट तयार करा](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)



## 📂 प्रत्येक धड्यामध्ये समाविष्ट आहे

- README मध्ये लेखी धडा आणि एक लहान व्हिडिओ
- Microsoft Agent Framework सह Azure AI Foundry वापरून Python कोड उदाहरणे
- तुमचे शिक्षण सुरू ठेवण्यासाठी अतिरिक्त संसाधनांची दुवे


## 🗃️ धडे

| **धडा**                                    | **मजकूर & कोड**                                   | **व्हिडिओ**                                                  | **अतिरिक्त शिक्षण**                                                                 |
|--------------------------------------------|---------------------------------------------------|-------------------------------------------------------------|-------------------------------------------------------------------------------------|
| AI एजंट्स आणि एजंट वापर प्रकरणांची ओळख    | [दुवा](./01-intro-to-ai-agents/README.md)          | [व्हिडिओ](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)  | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| AI एजंटिक फ्रेमवर्क्सची शोधाशोध           | [दुवा](./02-explore-agentic-frameworks/README.md)  | [व्हिडिओ](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)  | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| AI एजंटिक डिझाइन पॅटर्न समजून घेणे        | [दुवा](./03-agentic-design-patterns/README.md)     | [व्हिडिओ](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)  | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| टूल वापर डिझाइन पॅटर्न                    | [दुवा](./04-tool-use/README.md)                    | [व्हिडिओ](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)  | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| एजंटिक RAG                                 | [दुवा](./05-agentic-rag/README.md)                 | [व्हिडिओ](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)  | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| विश्वासार्ह AI एजंट्स तयार करणे            | [दुवा](./06-building-trustworthy-agents/README.md) | [व्हिडिओ](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK ) | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| नियोजन डिझाइन पॅटर्न                      | [दुवा](./07-planning-design/README.md)             | [व्हिडिओ](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)  | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| मल्टी-एजंट डिझाइन पॅटर्न                  | [दुवा](./08-multi-agent/README.md)                 | [व्हिडिओ](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)  | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| मेटाकॉग्निशन डिझाइन पॅटर्न                 | [दुवा](./09-metacognition/README.md)               | [व्हिडिओ](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [दुवा](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)|
| उत्पादनातील AI एजंट्स                      | [Link](./10-ai-agents-production/README.md)        | [Video](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजेन्तिक प्रोटोकॉलचा वापर (MCP, A2A आणि NLWeb) | [Link](./11-agentic-protocols/README.md)           | [Video](https://youtu.be/X-Dh9R3Opn8)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI एजंटसाठी संदर्भ अभियांत्रिकी            | [Link](./12-context-engineering/README.md)         | [Video](https://youtu.be/F5zqRV7gEag)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजेन्टिक मेमरीचे व्यवस्थापन                      | [Link](./13-agent-memory/README.md)     |      [Video](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| मायक्रोसॉफ्ट एजंट फ्रेमवर्कचा शोध                         | [Link](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| संगणक वापर एजंटस तयार करणे (CUA)           | [Link](./15-browser-use/README.md)     |                                                            | [Link](https://docs.browser-use.com/examples/templates/playwright-integration)         |
| स्केलेबल एजंट्सची तैनाती                    | लवकरच येत आहे                            |                                                            |                                                                                        |
| स्थानिक AI एजंटस तयार करणे                     | लवकरच येत आहे                               |                                                            |                                                                                        |
| AI एजंटसची सुरक्षा                           | लवकरच येत आहे                               |                                                            |                                                                                        |

## 🎒 इतर अभ्यासक्रम

आमच्या टीमने इतर अभ्यासक्रम तयार केले आहेत! पाहा:

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
 
### कोर शिक्षण
[![ML for Beginners](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![Data Science for Beginners](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI for Beginners](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![Cybersecurity for Beginners](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![Web Dev for Beginners](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT for Beginners](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![XR Development for Beginners](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### कॉपायलट मालिका
[![Copilot for AI Paired Programming](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![Copilot for C#/.NET](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![Copilot Adventure](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 समुदायाचे आभार

Agentic RAG दर्शविणाऱ्या महत्त्वाच्या कोड नमुन्यांसाठी [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) यांचे आभार.

## योगदान

हा प्रकल्प योगदान आणि सूचना स्वीकारतो. बहुतेक योगदानासाठी तुम्हाला Contributor License Agreement (CLA) मान्य करणे आवश्यक आहे, ज्यामध्ये तुम्ही तुम्हाला तुमचे योगदान वापरण्याचा अधिकार आहे असे सांगता. तपशीलांसाठी भेट द्या <https://cla.opensource.microsoft.com>.

जेव्हा तुम्ही पुल रिक्वेस्ट सबमिट करता, तेव्हा CLA बॉट आपोआप ठरवेल की तुम्हाला CLA पुरवावी लागेल का आणि PR योग्यप्रकारे चिन्हांकित करेल (उदा., स्थिती तपासणी, टिप्पणी). बॉटद्वारे दिलेल्या सूचनांचे पालन करा. आमचा CLA वापरणाऱ्या सर्व रेपोसाठी तुम्हाला हे फक्त एकदाच करावे लागेल.

या प्रकल्पाने [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) स्वीकारला आहे.
अधिक माहिती साठी पाहा [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) किंवा
किंवा [opencode@microsoft.com](mailto:opencode@microsoft.com) वर संपर्क साधा.

## ट्रेडमार्क

हा प्रकल्प प्रकल्प, उत्पादने किंवा सेवांसाठी ट्रेडमार्क किंवा चिन्हे असू शकतो. Microsoft
ट्रेडमार्क किंवा चिन्हांचा अधिकृत वापर
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) यांच्याशी सुसंगत असणे आवश्यक आहे.
या प्रकल्पाच्या बदललेल्या आवृत्त्यांमध्ये Microsoft ट्रेडमार्क किंवा चिन्हांचा वापर गोंधळ किंवा Microsoft प्रायोजकत्व सूचित करू नये.
तृतीय-पक्ष ट्रेडमार्क किंवा चिन्हांचा वापर त्या तृतीय-पक्षांच्या धोरणांनुसार असेल.

## मदत मिळवा

जर तुम्ही अडकलात किंवा AI अॅप्स तयार करताना प्रश्न असतील, तर सामील व्हा:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

उत्पादन फीडबॅक किंवा त्रुटींसाठी भेट द्या:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) वापरून अनुवादित केला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित अनुवादांमध्ये चुका किंवा अचूकतेत त्रुटी असू शकतात. मूळ दस्तऐवज त्याच्या स्थानिक भाषेमध्ये प्रमाणभूत स्रोत मानला जावा. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी अनुवाद शिफारसीय आहे. या अनुवादाच्या वापरामुळे होणाऱ्या कोणत्याही गैरसमजुती किंवा चुकांसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->