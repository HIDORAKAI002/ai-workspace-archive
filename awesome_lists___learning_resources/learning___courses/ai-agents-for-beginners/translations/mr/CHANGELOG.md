# चेंजलक

**AI Agents for Beginners** कोर्समधील सर्व लक्षणीय बदल या फाईलमध्ये दस्तऐवजीकरण केले आहेत.

## [रिलीज्ड] — 2026-07-13

या रिलीजमध्ये दोन नवीन धडे आहेत जे तैनातीचा आर्क पूर्ण करतात — एजंट्सना Microsoft Foundry पर्यंत स्केल करणे आणि एका सिंगल वर्कस्टेशनवर डिप्लॉय करणे — तसेच एक स्मोक-टेस्ट पाइपलाइन, रिफ्रेश केलेले कोर्स नेव्हिगेशन, नवीन शिकणाऱ्या कौशल्ये आणि अपडेट केलेले ब्रँडिंग.

### जोडलेले

- **धडा 16 — Microsoft Foundry सह स्केलेबल एजंट्सची तैनाती.** नवीन धडा [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) आणि चालवण्याजोगी नोटबुक [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) उत्पादन ग्राहक-समर्थन एजंट तयार करणे (टूल्स, RAG, मेमरी, मॉडेल राउटिंग, प्रतिसाद कॅशिंग, मानवी मंजुरी, एक मूल्यांकन गेट, आणि OpenTelemetry ट्रेसिंग), विकास/तैनाती/रनटाइम Mermaid आरेखांसह, ज्ञान तपासणी, असाइनमेंट आणि आव्हान.
- **धडा 17 — Foundry Local आणि Qwen सह लोकल AI एजंट तयार करणे.** नवीन धडा [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) आणि नोटबुक [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) पूर्णपणे उपकरणावर आधारित इंजिनिअरिंग सहाय्यक तयार करणे (Qwen फंक्शन कॉलिंग Foundry Local मार्गे, सॅंडबॉक्स्ड फाइल टूल्स, स्थानिक RAG Chroma सह, पर्यायी स्थानिक MCP), स्थानिक-फक्त / स्थानिक-RAG / टूल-कॉलिंग आरेखांसह, ज्ञान तपासणी, असाइनमेंट आणि आव्हान.
- **स्मोक-टेस्ट पाइपलाइन.** नवीन [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) वर्कफ्लो [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) आणि प्रत्येक धड्यासाठी कॅटलॉग अंतर्गत [tests/](./tests/README.md) धडे 01, 04, 05 आणि 16 मधील तैनात होणाऱ्या एजंटसाठी, प्रत्येक कॅटलॉगला त्याच्या धड्याशी आणि होस्टेड-एजंट नावाशी जोडणारा इंडेक्स README. धडा 16 मध्ये "Validating a Deployed Agent with Smoke Tests" विभाग आहे; धडे 01/04/05 मध्ये पर्यायी स्मोक-टेस्ट सूचक जोडलेला आहे.
- **शिकणाऱ्या कौशल्ये.** नवीन एजंट कौशल्ये `.agents/skills/` अंतर्गत: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (धडा 16 आणि 17 च्या मार्गदर्शनाचे पॅकेजिंग), आणि [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (मायक्रोसॉफ्ट फाउंड्री / Azure OpenAI सेटअप विरुद्ध नोटबुक नमुन्यांची कशी पडताळणी करावी).
- **नोटबुक व्हॅलिडेशन रनर.** नवीन [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) जे प्रत्येक Python नोटबुकला `nbconvert` सह हेडलेस चालवते आणि PASS/FAIL मॅट्रिक्स (आणि `results.json`) प्रिंट करते. हे स्वयंचलितपणे रेपो रूट आणि Python शोधते, कोर्स व्यतिरिक्त नोटबुकना (`.venv`, `site-packages`, `translations`, कौशल्य टेम्प्लेट साधने) आणि `.NET` नोटबुकना डीफॉल्टने वगळते, तसेच `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, आणि `-Python` पर्याय देते.
- **कोर्स नेव्हिगेशन.** धडे 11–15 मध्ये आधी नसलेले मागील/पुढील धडा दुवे जोडले; त्यामुळे संपूर्ण कोर्स 00 → 18 दोन्ही दिशांनी साखळीबद्ध झाला.
- **नवीन थंबनेल्स.** धडे 16 आणि 17 साठी थंबनेल्स, तसेच सुधारित रेपॉझिटरी सोशल इमेज [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (आता दोन नवीन धडे आणि `aka.ms/ai-agents-beginners` URL जाहिरातीसाठी).
- **आश्रितता** ([requirements.txt](../../requirements.txt)): धडा 17 साठी `foundry-local-sdk` आणि `chromadb` जोडले.

### बदललेले

- **मुख्य [README.md](./README.md)** धडा तक्ता: धडा 16 आणि 17 आता त्यांच्या सामग्रीशी लिंक करतात (पूर्वी "लवकर येत आहे" असे होते); रेपॉझिटरी इमेज `repo-thumbnailv3.png` केलेली.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: धडा 16 आणि 17 हा धड्यांनिहाय मार्गदर्शक आणि शिकण्याच्या मार्गांमध्ये समाविष्ट केला, आणि "Validating Deployed Agents with Smoke Tests" विभागही जोडला.
- **[AGENTS.md](./AGENTS.md)**: धड्यांची संख्या/वर्णन (00–18) अपडेट केले, स्मोक-टेस्टिंग व्हॅलिडेशन विभाग जोडला, आणि धडा 16/17 नमुन्याना नवीन नावांची उदाहरणे दिली.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "मागील धडा" आता धडा 17 कडे निर्देशतो (पूर्वी धडा 15 होता), साखळी पूर्ण करणं.
- **डिप्रिकेटेड नसलेल्या मॉडेल्सवर मानकीकृत संदर्भ.** कोर्समध्ये सर्व `gpt-4o` / `gpt-4o-mini` संदर्भ [[दस्तऐवज, `.env.example`, Python/.NET नोटबुक आणि नमुने]] `gpt-4.1-mini` ने बदलले — `gpt-4o` (सर्व आवृत्त्या) 2026 मध्ये बंद होत आहे. धडा 16 चा मॉडेल-राउटिंग उदाहरण `gpt-4.1-mini` (लहान) आणि `gpt-4.1` (मोठा) यांचा वापर करून लहान/मोठा विरोध ठेवतो. Python नोटबुक आता पर्यावरणातील व्हेरिएबल (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) मधून मॉडेलची निवड करतात, हार्डकोड केल्याशिवाय.

### नोट्स आणि ज्ञात मर्यादा

- **प्रत्यक्ष Azure विरुद्ध चालवलं नाही.** नवीन धड्यांचे नोटबुक शैक्षणिक नमुने आहेत; स्वतःच्या Microsoft Foundry / Foundry Local सेटअपने त्यांना चालवा आणि पडताळणी करा. स्मोक-टेस्ट वर्कफ्लू चालवण्यासाठी तुम्हाला धड्याचा एजंट डिप्लॉय करावा लागेल, आणि Azure OIDC सीक्रेट्स (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) Foundry प्रोजेक्ट स्कोपवर **Azure AI User** भूमिका असावे.
- **धडा 17 फक्त स्थानिक आहे.** त्याला Foundry Responses endpoint नाही, त्यामुळे स्मोक-टेस्ट क्रिया लागू नाही; नोटबुक तुमच्या वर्कस्टेशनवर चालवून त्याची पडताळणी करा.

## [रिलीज्ड] — 2026-07-06

ही रिलीज कोर्सला **Azure OpenAI Responses API** कडे स्थलांतरित करते, उत्पादनाचे नावांकन **Microsoft Foundry** आणि **Microsoft Agent Framework (MAF)** वर मानकीकृत करते, GitHub Models बंद करते, SDK आवृत्त्या अपडेट करते, आणि स्थानिक मॉडेल्स आणि Foundry वर अन्य फ्रेमवर्क होस्टिंगवर नवीन सामग्री जोडते.

### जोडलेले

- **मायग्रेशन कौशल्य** — `.agents/skills/` मध्ये [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) एजंट कौशल्य स्थापित केले (मूळ [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) ज्यामध्ये त्यांचे संदर्भ आणि स्कॅनर स्क्रिप्ट आहे.
- **Foundry Local (उपकरणावर मॉडेल्स चालवा)** — [00-course-setup/README.md](./00-course-setup/README.md) मध्ये नवीन "Alternative Provider: Foundry Local" विभाग स्थापित केला, जो इंस्टॉलबाबत (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, आणि `FoundryLocalManager` ला Microsoft Agent Framework मध्ये `OpenAIChatClient` वापरून कनेक्ट करण्याबद्दल सांगतो.
- **Microsoft Foundry वर LangChain / LangGraph एजंट्स होस्ट करणे** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) मध्ये नवीन विभाग आणि चालवायला नमुना [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py), जे `langchain-azure-ai[hosting]` आणि `ResponsesHostServer` ("/responses" प्रोटोकॉल) वापरतो, मूळ [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) वर आधारित.
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) मध्ये नवीन "Real-World Example: Microsoft Project Opal" विभाग, ज्यात Opal ला एंटरप्राइज संगणक वापर एजंट म्हणून फ्रेम केलं आणि कोर्स संकल्पना (मानवी-इन-द-लूप, विश्वास/सुरक्षा, नियोजन, कौशल्ये) शी जुळवले.
- **दुसरा धडा 02 Python नमुना** — [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) जोडले (बघा "बदललेले" — पूर्वीच्या Semantic Kernel नोटबुकमधून स्थलांतरित) आणि धडा README मध्ये लिंक केले.
- **मॉडेल्स आणि प्रोव्हायडर्स** विभाग [STUDY_GUIDE.md](./STUDY_GUIDE.md) मध्ये जोडले.

### बदललेले

- **Chat Completions → Responses API (Python).** थेट मॉडेल कॉल करणारे नमुने Chat Completions कडून Responses API कडे स्थलांतरित केले (`client.responses.create(input=..., store=False)`, `resp.output_text`), `OpenAI` क्लायंटचा वापर करून Azure OpenAI `/openai/v1/` स्थिर API वर (कोणताही `api_version` नाही). प्रभावित नमुने:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — पूर्ण फंक्शन-कॉलिंग वॉकथ्रू (टूल स्कीमा Responses फॉर्मॅटमध्ये समतल केले, टूल निकाल `function_call_output`, `max_output_tokens`, इत्यादी रूपात परत).
- **GitHub Models → Azure OpenAI.** GitHub Models डिप्रिकेटेड झाले आहे (जुलै 2026 मध्ये बंद होत आहे) आणि Responses API ना समर्थन करत नाही. सर्व GitHub Models कोड मार्ग Azure OpenAI / Microsoft Foundry मध्ये Python आणि .NET नमुन्यांमध्ये रूपांतरित केले:
  - Python: धडा 08 वर्कफ्लो नोटबुक्स (`01`–`03`), धडा 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + सहकारी `.md` दस्तऐवज, आणि धडा 08 dotNET वर्कफ्लो नोटबुक/`.md` (`01`–`03`) आता `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` आहे `AzureCliCredential` सह वापरले.
- **Semantic Kernel → Microsoft Agent Framework.** पूर्वीचा `02-semantic-kernel.ipynb` पुन्हा लिहिला गेला आहे Microsoft Agent Framework सोबत Azure OpenAI (Responses API) वापरून आणि त्याचे नाव बदलून `02-python-agent-framework-azure-openai.ipynb` झाले.
- **`FoundryChatClient` + `as_agent` वर प्रमाणित.** README आणि नोटबुक कोड जे `AzureAIProjectAgentProvider` संदर्भित करीत होते ते आता canonical पॅटर्नवर आहेत, जो धडा 01 आणि फ्रेमवर्कच्या स्वतःच्या नमुन्यांमध्ये वापरला जातो: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` सह `provider.as_agent(...)`. अपडेट केले धडा 02–14 च्या README आणि नोटबुक ओलांडून (उदा. धडा 13 मेमरी, सर्व धडा 14 नोटबुक, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **उत्पादन नावांकन.** इंग्रजी कंटेंटमध्ये पुनर्नावित:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (बदललेले नाहीत: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", आणि पर्यावरण व्हेरिएबल नावे.)
- **आश्रितता** ([requirements.txt](../../requirements.txt)):
  - `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0` ची स्थापना.
  - `openai>=1.108.1` पिन केले (Responses API साठी किमान).
  - `azure-ai-inference` काढून टाकले (फक्त स्थलांतरित GitHub Models नमुन्यांमध्ये वापरले गेले).
- **पर्यावरण संरचना** ([.env.example](../../.env.example)): GitHub Models व्हेरिएबल्स (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`) काढले; `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, आणि ऐच्छिक `AZURE_OPENAI_API_KEY` जोडले; आणि Microsoft Foundry नावे अपडेट केली.
- **डॉक्युमेंट्स** — [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), आणि [STUDY_GUIDE.md](./STUDY_GUIDE.md) वर वरील बदलांसाठी (सेटअप env vars, पडताळणी स्निपेट, प्रोव्हायडर मार्गदर्शन, नावांकन) अद्यतने केली.

### काढलेले

- GitHub Models ऑनबोर्डिंग स्टेप्स आणि पर्यावरण व्हेरिएबल्स सेटअप डॉक्युमेंट्समधून (Azure OpenAI / Microsoft Foundry ने बदलले).

### सुरक्षा / गोपनीयता (सार्वजनिक शेअरिंग साफसफाई)

- जुपिटर नोटबुक निष्पादन आउटपुट साफ केले जे वास्तविक **Azure सदस्यता आयडी**, संसाधन-गट / संसाधन नावे, आणि Bing कनेक्शन आयडी, तसेच डेव्हलपर **स्थानिक फाइल पाथ आणि वापरकर्तानावे** लीक करत होते, या फाइल्समध्ये:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- ट्रॅक केलेल्या इंग्रजी सामग्रीत कोणतेही API कीज, टोकन्स, सदस्यता आयडी किंवा वैयक्तिक मार्ग उरलेले नाहीत याची पुष्टी केली आहे (`GITHUB_TOKEN` संदर्भ जे उरले आहेत ते GitHub Actions टोकन आहेत वर्कफ्लोजमध्ये आणि Lesson 11 सेटअपमधील GitHub MCP सर्व्हर PAT आहेत — दोन्ही वैध असून GitHub मॉडेल्सशी संबंधित नाहीत).

### नोंदी आणि ज्ञात मर्यादा

- **अमलात आणलेले/संकलित केलेले नाही.** हे शैक्षणिक उदाहरणे API/नामनिर्देशांच्या अचूकतेसाठी अद्ययावत करण्यात आली आहेत; त्यांना थेट Azure संसाधनांवर चालवलेले नाही, आणि .NET उदाहरणे ह्या वातावरणात संकलित केली गेली नाहीत. आपल्या स्वतःच्या Microsoft Foundry / Azure OpenAI तैनातीवर पडताळणी करा.
- **मॉडेल तैनातीने Responses API समर्थन करणे आवश्यक आहे.** `gpt-4.1-mini`, `gpt-4.1`, किंवा `gpt-5.x` मॉडेलसारख्या तैनातीचा वापर करा. जुने मॉडेल्स मुख्य Responses कार्यक्षमता समर्थन करतात पण प्रत्येक वैशिष्ट्य नाही.
- **Agent-framework आवृत्ती.** उदाहरणे नवीनतम MAF (`>=1.10.0`) साठी लक्ष्यित आहेत. canonical agent-creation कॉल `client.as_agent(...)` आहे; API चे फ्रेमवर्कच्या प्रकाशित दस्तऐवजांशी आणि स्थापनेशी पडताळणी केली गेली आहे. जर तुम्ही भिन्न आवृत्ती वापरत असाल तर पद्धतीची उपलब्धता (`as_agent` विरुद्ध `create_agent`) निश्चित करा.
- **Lesson 08 वर्कफ्लो नोटबुक 04** जानबूजून `AzureAIAgentClient` (जो `agent-framework-azure-ai` मधून आहे) ठेवतो कारण ते Microsoft Foundry Agent Service होस्टेड टूल्स (Bing ग्राउंडिंग, कोड इंटरप्रेटर) वापरते; ते आधीच Responses-आधारित आहे.
- **.NET डीफॉल्ट तैनाती.** दोन Lesson 08 dotNET वर्कफ्लो उदाहरणे पूर्वी विशिष्ट मॉडेल हार्ड-कोड करत होती; आता ते `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`) वर डीफॉल्ट आहेत. जर एखाद्या उदाहरणाला मल्टीमॉडल/व्हिजन इनपुटची गरज असेल, तर `AZURE_OPENAI_DEPLOYMENT` योग्य मॉडेलवर सेट करा.
- **Foundry Local** एक OpenAI-सुसंगत **Chat Completions** एंडपॉइंट उघडतो आणि स्थानिक विकासासाठी आहे; पूर्ण Responses API वैशिष्ट्यांसाठी Azure OpenAI / Microsoft Foundry वापरा.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->