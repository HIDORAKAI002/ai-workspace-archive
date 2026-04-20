# शुरुआत के लिए AI एजेंट - एक कोर्स

![AI Agents for Beginners](../../translated_images/hi/repo-thumbnailv2.06f4a48036fde647.webp)

## एक कोर्स जो आपको AI एजेंट बनाने की शुरुआत करने के लिए आवश्यक सभी जानकारी सिखाता है

[![GitHub license](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub contributors](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub issues](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 बहुभाषी समर्थन

#### GitHub Action के माध्यम से समर्थित (स्वचालित और हमेशा अद्यतित)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabic](../ar/README.md) | [Bengali](../bn/README.md) | [Bulgarian](../bg/README.md) | [Burmese (Myanmar)](../my/README.md) | [Chinese (Simplified)](../zh-CN/README.md) | [Chinese (Traditional, Hong Kong)](../zh-HK/README.md) | [Chinese (Traditional, Macau)](../zh-MO/README.md) | [Chinese (Traditional, Taiwan)](../zh-TW/README.md) | [Croatian](../hr/README.md) | [Czech](../cs/README.md) | [Danish](../da/README.md) | [Dutch](../nl/README.md) | [Estonian](../et/README.md) | [Finnish](../fi/README.md) | [French](../fr/README.md) | [German](../de/README.md) | [Greek](../el/README.md) | [Hebrew](../he/README.md) | [Hindi](./README.md) | [Hungarian](../hu/README.md) | [Indonesian](../id/README.md) | [Italian](../it/README.md) | [Japanese](../ja/README.md) | [Kannada](../kn/README.md) | [Khmer](../km/README.md) | [Korean](../ko/README.md) | [Lithuanian](../lt/README.md) | [Malay](../ms/README.md) | [Malayalam](../ml/README.md) | [Marathi](../mr/README.md) | [Nepali](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [Norwegian](../no/README.md) | [Persian (Farsi)](../fa/README.md) | [Polish](../pl/README.md) | [Portuguese (Brazil)](../pt-BR/README.md) | [Portuguese (Portugal)](../pt-PT/README.md) | [Punjabi (Gurmukhi)](../pa/README.md) | [Romanian](../ro/README.md) | [Russian](../ru/README.md) | [Serbian (Cyrillic)](../sr/README.md) | [Slovak](../sk/README.md) | [Slovenian](../sl/README.md) | [Spanish](../es/README.md) | [Swahili](../sw/README.md) | [Swedish](../sv/README.md) | [Tagalog (Filipino)](../tl/README.md) | [Tamil](../ta/README.md) | [Telugu](../te/README.md) | [Thai](../th/README.md) | [Turkish](../tr/README.md) | [Ukrainian](../uk/README.md) | [Urdu](../ur/README.md) | [Vietnamese](../vi/README.md)

> **स्थानीय रूप से क्लोन करना पसंद है?**
>
> इस रिपॉजिटरी में 50+ भाषा अनुवाद शामिल हैं जो डाउनलोड आकार को काफी बढ़ाते हैं। बिना अनुवाद के क्लोन करने के लिए स्पार्स चेकआउट का उपयोग करें:
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
> यह आपको तेज़ डाउनलोड के साथ कोर्स पूरा करने के लिए सब कुछ देता है।
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**यदि आप अतिरिक्त अनुवाद भाषाओं का समर्थन चाहते हैं तो वे [यहाँ](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md) सूचीबद्ध हैं**

[![GitHub watchers](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub forks](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub stars](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 शुरुआत कैसे करें

इस कोर्स में AI एजेंट बनाने के मूल सिद्धांतों को कवर करने वाले पाठ शामिल हैं। प्रत्येक पाठ अपनी विषय वस्तु को कवर करता है, इसलिए आप कहीं से भी शुरुआत कर सकते हैं!

इस कोर्स के लिए बहुभाषी समर्थन है। हमारे [उपलब्ध भाषाओं यहाँ](#-multi-language-support) देखें।

यदि आप पहली बार जनरेटिव AI मॉडल के साथ निर्माण कर रहे हैं, तो हमारा [Generative AI For Beginners](https://aka.ms/genai-beginners) कोर्स देखें, जिसमें GenAI के साथ निर्माण के लिए 21 पाठ शामिल हैं।

कोड चलाने के लिए इस रिपॉजिटरी को [स्टार (🌟)](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) और [फोर्क करें](https://github.com/microsoft/ai-agents-for-beginners/fork)।

### अन्य शिक्षार्थियों से मिलें, अपने प्रश्न पूछें

यदि आप अटक जाते हैं या AI एजेंट बनाने के संबंध में कोई प्रश्न हैं, तो हमारे समर्पित डिस्कोर्ड चैनल [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) में शामिल हों।

### आपको क्या चाहिए

इस कोर्स का प्रत्येक पाठ कोड उदाहरण शामिल करता है, जो code_samples फ़ोल्डर में पाए जा सकते हैं। आप अपनी कॉपी बनाने के लिए [इस रिपॉजिटरी को फोर्क](https://github.com/microsoft/ai-agents-for-beginners/fork) सकते हैं।

इन अभ्यास कोड उदाहरणों में Microsoft Agent Framework का उपयोग Azure AI Foundry Agent Service V2 के साथ किया गया है:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - Azure खाता आवश्यक

यह कोर्स Microsoft के निम्नलिखित AI एजेंट फ्रेमवर्क और सेवाओं का उपयोग करता है:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)

इस कोर्स के लिए कोड चलाने की अधिक जानकारी के लिए [Course Setup](./00-course-setup/README.md) देखें।

## 🙏 मदद करना चाहते हैं?

क्या आपके पास सुझाव हैं या आपने कोई वर्तनी या कोड त्रुटि पाई है? [एक इशू उठाएं](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) या [पुल रिक्वेस्ट बनाएं](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)

## 📂 प्रत्येक पाठ में शामिल हैं

- README में लिखित पाठ और एक छोटा वीडियो
- Microsoft Agent Framework के साथ Azure AI Foundry का उपयोग करने वाले पायथन कोड नमूने
- आपकी सीख जारी रखने के लिए अतिरिक्त संसाधनों के लिंक

## 🗃️ पाठ

| **पाठ**                                   | **पाठ & कोड**                                    | **वीडियो**                                                  | **अतिरिक्त सीखने के संसाधन**                                                                     |
|----------------------------------------------|----------------------------------------------------|------------------------------------------------------------|----------------------------------------------------------------------------------------|
| AI एजेंट्स और एजेंट उपयोग मामलों का परिचय       | [लिंक](./01-intro-to-ai-agents/README.md)          | [वीडियो](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)  | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI एजेंटिक फ्रेमवर्क्स का अन्वेषण              | [लिंक](./02-explore-agentic-frameworks/README.md)  | [वीडियो](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)  | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI एजेंटिक डिजाइन पैटर्न की समझ                 | [लिंक](./03-agentic-design-patterns/README.md)     | [वीडियो](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)  | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| टूल उपयोग डिजाइन पैटर्न                      | [लिंक](./04-tool-use/README.md)                    | [वीडियो](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)  | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजेंटिक RAG                                  | [लिंक](./05-agentic-rag/README.md)                 | [वीडियो](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)  | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| भरोसेमंद AI एजेंट बनाना               | [लिंक](./06-building-trustworthy-agents/README.md) | [वीडियो](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK ) | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| योजना डिजाइन पैटर्न                      | [लिंक](./07-planning-design/README.md)             | [वीडियो](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)  | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| मल्टी-एजेंट डिजाइन पैटर्न                   | [लिंक](./08-multi-agent/README.md)                 | [वीडियो](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)  | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| मेटाकॉग्निशन डिजाइन पैटर्न                 | [लिंक](./09-metacognition/README.md)               | [वीडियो](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [लिंक](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| उत्पादन में AI एजेंट                       | [Link](./10-ai-agents-production/README.md)        | [Video](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजेंटिक प्रोटोकॉल्स का उपयोग (MCP, A2A और NLWeb) | [Link](./11-agentic-protocols/README.md)           | [Video](https://youtu.be/X-Dh9R3Opn8)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI एजेंट्स के लिए संदर्भ इंजीनियरिंग          | [Link](./12-context-engineering/README.md)         | [Video](https://youtu.be/F5zqRV7gEag)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| एजेंटिक मेमोरी का प्रबंधन                     | [Link](./13-agent-memory/README.md)     |      [Video](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| माइक्रोसॉफ्ट एजेंट फ्रेमवर्क का अन्वेषण            | [Link](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| कंप्यूटर उपयोग एजेंट्स (CUA) का निर्माण          | [Link](./15-browser-use/README.md)     |                                                            | [Link](https://docs.browser-use.com/examples/templates/playwright-integration)         |
| स्केलेबल एजेंट्स को तैनात करना                 | शीघ्र उपलब्ध होगा                            |                                                            |                                                                                        |
| स्थानीय AI एजेंट्स बनाना                      | शीघ्र उपलब्ध होगा                               |                                                            |                                                                                        |
| AI एजेंट्स को सुरक्षित रखना                    | शीघ्र उपलब्ध होगा                               |                                                            |                                                                                        |

## 🎒 अन्य पाठ्यक्रम

हमारी टीम अन्य पाठ्यक्रम भी तैयार करती है! बताएं:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### LangChain
[![शुरुआती के लिए LangChain4j](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![शुरुआती के लिए LangChain.js](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![शुरुआती के लिए LangChain](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### Azure / Edge / MCP / Agents
[![शुरुआती के लिए AZD](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![शुरुआती के लिए Edge AI](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![शुरुआती के लिए MCP](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![शुरुआती के लिए AI एजेंट्स](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### जेनेरेटिव AI श्रृंखला
[![शुरुआती के लिए जेनेरेटिव AI](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![जेनेरेटिव AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![जेनेरेटिव AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![जेनेरेटिव AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### कोर लर्निंग
[![शुरुआती के लिए ML](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![शुरुआती के लिए डेटा साइंस](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![शुरुआती के लिए AI](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![शुरुआती के लिए साइबर सुरक्षा](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![शुरुआती के लिए वेब डेवलपमेंट](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![शुरुआती के लिए IoT](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![शुरुआती के लिए XR डेवलपमेंट](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### कॉपिलट श्रृंखला
[![AI पेयर्ड प्रोग्रामिंग के लिए कॉपिलट](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![C#/.NET के लिए कॉपिलट](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![कॉपिलट एडवेंचर](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 समुदाय का धन्यवाद

Agentic RAG प्रदर्शित करने वाले महत्वपूर्ण कोड नमूनों में योगदान देने के लिए [शिवम गोयल](https://www.linkedin.com/in/shivam2003/) का धन्यवाद। 

## योगदान करें

यह परियोजना योगदान और सुझावों का स्वागत करती है। अधिकांश योगदानों के लिए आपको एक
Contributor License Agreement (CLA) से सहमति देना आवश्यक है, जिसमें आप घोषणा करते हैं कि आपके पास
अधिकार हैं, और वास्तव में आप हमें अपने योगदान का उपयोग करने का अधिकार देते हैं। विवरण के लिए, देखें <https://cla.opensource.microsoft.com>।

जब आप पुल रिक्वेस्ट सबमिट करते हैं, तो एक CLA बॉट स्वचालित रूप से निर्धारित करेगा कि क्या आपको
CLA प्रदान करना आवश्यक है और PR को उपयुक्त रूप से सजाएगा (जैसे, स्थिति जांच, टिप्पणी)। बस बॉट द्वारा दिए गए निर्देशों का पालन करें।
आपको यह केवल हमारे CLA का उपयोग करने वाले सभी रिपोज में एक बार करना होगा।

इस परियोजना ने [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) को अपनाया है।
अधिक जानकारी के लिए देखें [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) या 
[opencode@microsoft.com](mailto:opencode@microsoft.com) से कोई अतिरिक्त प्रश्न या टिप्पणी करें।

## ट्रेडमार्क्स

इस परियोजना में प्रोजेक्ट्स, उत्पादों या सेवाओं के लिए ट्रेडमार्क्स या लोगो हो सकते हैं। Microsoft
ट्रेडमार्क या लोगो का अधिकृत उपयोग 
[Microsoft के ट्रेडमार्क और ब्रांड दिशानिर्देशों](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) का पालन करना आवश्यक है।
Microsoft ट्रेडमार्क या लोगो का इस परियोजना के संशोधित संस्करणों में उपयोग भ्रमित करने वाला नहीं होना चाहिए या Microsoft प्रायोजन का संकेत नहीं देना चाहिए।
किसी भी तृतीय-पक्ष ट्रेडमार्क या लोगो का उपयोग उन तृतीय-पक्षों की नीतियों के अधीन है।

## सहायता प्राप्त करना

यदि आप अटक जाते हैं या AI ऐप्स बनाने के बारे में कोई प्रश्न हैं, तो जुड़ें:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

यदि आपके पास उत्पाद प्रतिक्रिया या निर्माण के दौरान त्रुटियाँ हैं, तो देखें:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। हम सटीकता के लिए प्रयासरत हैं, कृपया ध्यान दें कि स्वचालित अनुवाद में त्रुटियाँ या गलतियाँ हो सकती हैं। मूल दस्तावेज़ अपनी स्थानीय भाषा में अधिकृत स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानवीय अनुवाद की सलाह दी जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम जिम्मेदार नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->