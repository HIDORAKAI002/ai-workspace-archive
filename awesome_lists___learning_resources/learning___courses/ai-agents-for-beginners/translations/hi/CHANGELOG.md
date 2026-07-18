# बदलावों का विवरण

इस फ़ाइल में **AI Agents for Beginners** कोर्स के सभी महत्वपूर्ण परिवर्तनों का दस्तावेजीकरण किया गया है।

## [रिलीज़] — 2026-07-13

इस रिलीज़ में दो नए पाठ जोड़े गए हैं जो तैनाती चाप को पूरा करते हैं — एजेंट्स को Microsoft Foundry तक स्केलिंग और एकल वर्कस्टेशन तक स्केलिंग — साथ ही एक स्मोक-टेस्ट पाइपलाइन, नवीन पाठ नेविगेशन, नए शिक्षार्थी कौशल, और अपडेटेड ब्रांडिंग।

### जोड़ा गया

- **पाठ 16 — Microsoft Foundry के साथ स्केलेबल एजेंट्स को तैनात करना।** नया पाठ [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) और चलाने योग्य नोटबुक [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) जो एक प्रोडक्शन ग्राहक-समर्थन एजेंट बनाता है (उपकरण, RAG, मेमोरी, मॉडल रूटिंग, प्रतिक्रिया कैशिंग, मानव अनुमोदन, एक मूल्यांकन गेट, और OpenTelemetry ट्रेसिंग), साथ ही विकास/तैनाती/रनटाइम Mermaid आरेख, ज्ञान जांच, असाइनमेंट, और चुनौती।
- **पाठ 17 — Foundry Local और Qwen के साथ स्थानीय AI एजेंट बनाना।** नया पाठ [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) और नोटबुक [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) जो एक पूरी तरह से ऑन-डिवाइस इंजीनियरिंग सहायक बनाता है (Qwen फंक्शन कॉलिंग foundry Local के द्वारा, सैंडबॉक्स्ड फाइल उपकरण, स्थानीय RAG with Chroma, वैकल्पिक स्थानीय MCP), साथ ही स्थानीय-केवल / स्थानीय-RAG / टूल-कॉलिंग आरेख, ज्ञान जांच, असाइनमेंट, और चुनौती।
- **स्मोक-टेस्ट पाइपलाइन।** नया [AI स्मोक टेस्ट](https://github.com/marketplace/actions/ai-smoke-test) वर्कफ़्लो [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) और प्रति-पाठ निर्देशिकाएँ [tests/](./tests/README.md) में Lessons 01, 04, 05, और 16 में तैनात एजेंटों के लिए, एक इंडेक्स README जहां प्रत्येक निर्देशिका को उसके पाठ और होस्टेड एजेंट नाम से मापा गया है। पाठ 16 में "स्मोक टेस्ट के साथ तैनात एजेंट का सत्यापन" अनुभाग जोड़ा गया; पाठ 01/04/05 में वैकल्पिक स्मोक-टेस्ट पॉइंटर जोड़ा गया।
- **शिक्षार्थी कौशल।** नए एजेंट कौशल `.agents/skills/` के तहत: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (पाठ 16 और 17 की मार्गदर्शन की पैकिंग), और [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (कैसे Microsoft Foundry / Azure OpenAI सेटअप के खिलाफ नोटबुक नमूनों को मान्य करें)।
- **नोटबुक वैधता रनर।** नया [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) जो प्रत्येक Python नोटबुक को बिना सिर वाले `nbconvert` के साथ चलाता है और एक PASS/FAIL मैट्रिक्स (साथ `results.json` भी) प्रिंट करता है। यह स्वतः रिपोज़िटरी रूट और Python का पता लगाता है, डिफ़ॉल्ट रूप से गैर-कोर्स नोटबुक (`.venv`, `site-packages`, `translations`, कौशल टेम्प्लेट एसेट्स) और `.NET` नोटबुक्स को बाहर करता है, और `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, और `-Python` को सपोर्ट करता है।
- **कोर्स नेविगेशन।** पाठ 11–15 में पेहले/अगले पाठ लिंक जोड़ा (जो पहले गायब थे) जिससे पूरा कोर्स 00 → 18 दोनों दिशाओं में जुड़ गया।
- **नए थंबनेल।** पाठ 16 और 17 के लिए पाठ थंबनेल, और रिपोज़िटरी सोशल इमेज को ताज़ा किया गया [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (जो अब दो नए पाठों और `aka.ms/ai-agents-beginners` URL को विज्ञापित करता है)।
- **निर्भरता** ([requirements.txt](../../requirements.txt)): पाठ 17 के लिए `foundry-local-sdk` और `chromadb` जोड़े गए।

### बदला गया

- **मुख्य [README.md](./README.md)** पाठ तालिका: पाठ 16 और 17 अब अपने कंटेंट से लिंक करते हैं (पहले "जल्द आ रहा है"); रिपोज़िटरी छवि को अपडेट कर `repo-thumbnailv3.png` किया गया।
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: पाठ 16 और 17 को पाठ-दर-पाठ मार्गदर्शिका और शिक्षण पथ में जोड़ा गया, और "स्मोक टेस्ट के साथ तैनात एजेंटों का सत्यापन" अनुभाग जोड़ा गया।
- **[AGENTS.md](./AGENTS.md)**: पाठ गणना/विवरण (00–18) अपडेट किया गया, स्मोक-टेस्टिंग सत्यापन अनुभाग जोड़ा गया, और पाठ 16/17 नमूना नामकरण उदाहरण जोड़े गए।
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "पिछला पाठ" अब पाठ 17 (पहले पाठ 15) की ओर इशारा करता है, जो श्रृंखला को बंद करता है।
- **गैर-अपशिष्ट मॉडलों पर मानकीकृत मॉडल संदर्भ।** पूरे कोर्स में सभी `gpt-4o` / `gpt-4o-mini` संदर्भ `gpt-4.1-mini` से बदल दिए गए — `gpt-4o` (सभी संस्करण) 2026 में सेवानिवृत्त हो रहा है। पाठ 16 का मॉडल-रूटिंग उदाहरण छोटा/बड़ा अंतर रखता है `gpt-4.1-mini` (छोटा) और `gpt-4.1` (बड़ा) का उपयोग करके। Python नोटबुक अब मॉडल का चयन पर्यावरण चर (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) से करती हैं बजाय कि कोड में मॉडल नाम हार्डकोड करने के।

### नोट्स और ज्ञात सीमाएं

- **लाइव Azure पर निष्पादित नहीं।** नए पाठों की नोटबुक शैक्षिक नमूने हैं; इन्हें अपने Microsoft Foundry / Foundry Local सेटअप के खिलाफ चलाएं और सत्यापित करें। स्मोक-टेस्ट वर्कफ़्लो के लिए आपको पाठ के एजेंट को तैनात करना होगा और Azure OIDC रहस्य (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) Foundry प्रोजेक्ट स्कोप में **Azure AI User** भूमिका के साथ कॉन्फ़िगर करना होगा।
- **पाठ 17 केवल स्थानीय है।** इसमें Foundry Responses एंडपॉइंट नहीं है, इसलिए स्मोक-टेस्ट क्रिया लागू नहीं होती; इसे अपने वर्कस्टेशन पर नोटबुक चलाकर सत्यापित करें।

## [रिलीज़] — 2026-07-06

इस रिलीज़ में कोर्स को **Azure OpenAI Responses API** में माइग्रेट किया गया, उत्पाद नामकरण को **Microsoft Foundry** और **Microsoft Agent Framework (MAF)** पर मानकीकृत किया गया, GitHub Models को सेवानिवृत्त किया गया, SDK संस्करण अपडेट किए गए, और स्थानीय मॉडल पर और Foundry पर अन्य फ्रेमवर्क होस्टिंग पर नया कंटेंट जोड़ा गया।

### जोड़ा गया

- **माइग्रेशन कौशल** — इंस्टॉल किया गया [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) एजेंट कौशल (from [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) `.agents/skills/` के तहत, इसके संदर्भ और स्कैनर स्क्रिप्ट सहित।
- **Foundry Local (डिवाइस पर मॉडल चलाएं)** — [00-course-setup/README.md](./00-course-setup/README.md) में नया "Alternative Provider: Foundry Local" सेक्शन जिसमें इंस्टालेशन (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, और Microsoft Agent Framework को `OpenAIChatClient` के माध्यम से FoundryLocalManager के साथ वायर करना शामिल है।
- **Microsoft Foundry पर LangChain / LangGraph एजेंट होस्टिंग** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) में नया सेक्शन और चलाने योग्य नमूना [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) जो `langchain-azure-ai[hosting]` और `ResponsesHostServer` (the `/responses` protocol) का उपयोग करता है, [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) पर आधारित।
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) में नया "रीयल-वर्ल्ड उदाहरण: Microsoft Project Opal" सेक्शन जो Opal को एंटरप्राइज़ कंप्यूटर-उपयोग एजेंट के रूप में फ्रेम करता है और इसे कोर्स अवधारणाओं (मानव-इन-द-लूप, विश्वास/सुरक्षा, योजना, कौशल) से जोड़ता है।
- **सेकंड Lesson 02 Python नमूना** — जोड़ा गया [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (देखें "बदला गया" — पूर्व Semantic Kernel नोटबुक से माइग्रेट) और इसे पाठ README में लिंक किया गया।
- **मॉडल और प्रोवाइडर्स** सेक्शन जोड़ा गया [STUDY_GUIDE.md](./STUDY_GUIDE.md) में।

### बदला गया

- **Chat Completions → Responses API (Python)।** मॉडल को सीधे कॉल करने वाले नमूने Chat Completions से Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`) में माइग्रेट किए गए, `OpenAI` क्लाइंट का उपयोग करते हुए स्थिर Azure OpenAI `/openai/v1/` एंडपॉइंट (कोई `api_version` नहीं)। प्रभावित नमूनों में शामिल हैं:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — पूरी फंक्शन-कॉलिंग वॉकथ्रू (टूल स्कीमा को Responses फॉर्मेट में फैला दिया, टूल रिजल्ट्स को `function_call_output`, `max_output_tokens`, आदि के रूप में लौटाया)।
- **GitHub Models → Azure OpenAI।** GitHub Models को अप्रचलित कर दिया गया है (सेवानिवृत्त हो रहा है **जुलाई 2026**) और यह Responses API का समर्थन नहीं करता। सभी GitHub Models कोड पाथ Azure OpenAI / Microsoft Foundry में परिवर्तित किए गए Python और .NET नमूनों में:
  - Python: पाठ 08 वर्कफ़्लो नोटबुक्स (`01`–`03`), पाठ 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`)।
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + सहायक `.md` डॉक्यूमेंट्स, और पाठ 08 .NET वर्कफ़्लो नोटबुक्स/`.md` (`01`–`03`) अब `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` के साथ `AzureCliCredential` का उपयोग करते हैं।
- **Semantic Kernel → Microsoft Agent Framework।** पूर्व `02-semantic-kernel.ipynb` को Microsoft Agent Framework with Azure OpenAI (Responses API) का उपयोग करने के लिए फिर से लिखा गया और इसका नाम बदलकर `02-python-agent-framework-azure-openai.ipynb` कर दिया गया।
- **`FoundryChatClient` + `as_agent` पर मानकीकृत।** README और नोटबुक कोड जो `AzureAIProjectAgentProvider` का संदर्भ देते थे, उन्हें पाठ 01 और फ्रेमवर्क के अपने नमूनों द्वारा उपयोग किए जाने वाले पैटर्न `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` के अनुसार और `provider.as_agent(...)` के साथ मानकीकृत किया गया। पाठ 02–14 के README और नोटबुक्स (जैसे पाठ 13 मेमोरी, सभी पाठ 14 नोटबुक्स, `11-agentic-protocols/code_samples/github-mcp/app.py`) में अपडेट किया गया।
- **उत्पाद नामकरण।** अंग्रेज़ी सामग्री में निम्नलिखित नाम बदले गए:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (जैसे के लिए अपरिवर्तित: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", और पर्यावरण-चर नाम।)
- **निर्भरता** ([requirements.txt](../../requirements.txt)):
  - `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0` पिन किया गया।
  - `openai>=1.108.1` पिन किया गया (Responses API के लिए न्यूनतम)।
  - `azure-ai-inference` हटा दिया गया (केवल माइग्रेट किए गए GitHub Models नमूनों द्वारा उपयोग किया जाता था)।
- **पर्यावरण विन्यास** ([.env.example](../../.env.example)): GitHub Models चर (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`) हटाए गए; `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, और वैकल्पिक `AZURE_OPENAI_API_KEY` जोड़े गए; Microsoft Foundry के लिए नामकरण अपडेट किया गया।
- **डॉक्स** — [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), और [STUDY_GUIDE.md](./STUDY_GUIDE.md) अप्डेट किए गए (सेटअप env vars, सत्यापन स्निपेट, प्रोवाइडर मार्गदर्शन, नामकरण)।

### हटाया गया

- GitHub Models ऑनबोर्डिंग चरण और सेटअप डॉक्स से पर्यावरण चर हटाए गए (Azure OpenAI / Microsoft Foundry द्वारा प्रतिस्थापित)।

### सुरक्षा / गोपनीयता (सार्वजनिक-साझाकरण क्लीनअप)

- Jupyter नोटबुक निष्पादन आउटपुट साफ़ किए गए जिसमें एक वास्तविक **Azure सदस्यता आईडी**, संसाधन-समूह/संसाधन नाम, और Bing कनेक्शन ID का लीक था, साथ ही डेवलपर **स्थानीय फ़ाइल पथ और उपयोगकर्ता नाम**:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- सत्यापित किया गया कि ट्रैक किए गए अंग्रेज़ी सामग्री में कोई API कुंजियाँ, टोकन, सदस्यता आईडी, या व्यक्तिगत पथ नहीं रह गए हैं (जो `GITHUB_TOKEN` संदर्भ बाकी हैं वे वर्कफ़्लोज़ में GitHub Actions टोकन और Lesson 11 सेटअप में GitHub MCP सर्वर PAT हैं — दोनों वैध और GitHub मॉडलों से संबंधित नहीं हैं)।

### नोट्स और ज्ञात सीमाएँ

- **चलाया/संकलित नहीं है।** ये शैक्षिक नमूने API/नामकरण की सटीकता के लिए अपडेट किए गए हैं; इन्हें लाइव Azure संसाधनों के खिलाफ नहीं चलाया गया था, और .NET नमूने इस वातावरण में संकलित नहीं किए गए। अपने Microsoft Foundry / Azure OpenAI तैनाती के खिलाफ सत्यापित करें।
- **मॉडल तैनाती को Responses API का समर्थन करना होगा।** `gpt-4.1-mini`, `gpt-4.1`, या `gpt-5.x` मॉडल जैसी तैनाती का उपयोग करें। पुराने मॉडल मूल Responses कार्यक्षमता का समर्थन करते हैं लेकिन हर विशेषता का नहीं।
- **एजेंट-फ्रेमवर्क संस्करण।** ये नमूने नवीनतम MAF (`>=1.10.0`) को लक्षित करते हैं। मानक एजेंट-निर्माण कॉल `client.as_agent(...)` है; APIs को फ्रेमवर्क के प्रकाशित दस्तावेज़ों और एक स्थापित बिल्ड के खिलाफ सत्यापित किया गया। यदि आप किसी अलग संस्करण को पिन करते हैं, तो मेथड उपलब्धता (`as_agent` बनाम `create_agent`) की पुष्टि करें।
- **Lesson 08 वर्कफ़्लो नोटबुक 04** जानबूझकर `AzureAIAgentClient` (जो `agent-framework-azure-ai` से है) को बनाए रखता है क्योंकि यह Microsoft Foundry Agent Service होस्ट किए गए टूल (Bing grounding, कोड इंटरप्रेटर) का उपयोग करता है; यह पहले से ही Responses-आधारित है।
- **.NET डिफ़ॉल्ट तैनाती।** दो Lesson 08 dotNET वर्कफ़्लो नमूने पहले एक विशिष्ट मॉडल को हार्ड-कोड करते थे; अब वे `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`) को डिफ़ॉल्ट रूप से उपयोग करते हैं। यदि कोई नमूना मल्टीमोडल/विजन इनपुट पर निर्भर है, तो `AZURE_OPENAI_DEPLOYMENT` को उपयुक्त मॉडल पर सेट करें।
- **Foundry Local** एक OpenAI-संगत **Chat Completions** अंतिम बिंदु प्रदान करता है और स्थानीय विकास के लिए अभिप्रेत है; पूर्ण Responses API फीचर सेट के लिए Azure OpenAI / Microsoft Foundry का उपयोग करें।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->