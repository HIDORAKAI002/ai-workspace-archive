# परिवर्तनहरू

**AI Agents for Beginners** कोर्सका सबै महत्वपूर्ण परिवर्तनहरू यस फाइलमा दस्तावेज गरिएको छ।

## [रिलिज गरिएको] — 2026-07-13

यस रिलिजले दुई नयाँ पाठहरू थप्दछ जुन परिनियोजन चक्र पूरा गर्दछ—एजेन्टहरूलाई Microsoft Foundry मा स्केल गर्न र एकल कार्यस्थलमा डाउन गर्न—साथै एउटा स्मोक-टेस्ट पाईपलाइन, नयाँ सिकाइ कौशलहरू, ताज़ा गरिएको कोर्स नेभिगेसन, र अपडेट गरिएको ब्रान्डिंग पनि।

### थपियो

- **पाठ १६ — Microsoft Foundry सँग स्केलेबल एजेन्टहरू परिनियोजन।** नयाँ पाठ [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) र रन गर्न मिल्ने नोटबुक [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) जसले उत्पादन ग्राहक-समर्थन एजेन्ट निर्माण गर्छ (टूल्स, RAG, मेमोरी, मोडल राउटिङ, प्रतिक्रिया क्यासिङ, मानव अनुमोदन, मूल्याङ्कन गेट, र OpenTelemetry ट्रेसिङ), विकास/परिनियोजन/रनटाइम Mermaid डायग्रामहरू, ज्ञान परीक्षण, एक असाइनमेंट, र चुनौती सहित।
- **पाठ १७ — Foundry Local र Qwen संग स्थानीय AI एजेन्टहरू सिर्जना।** नयाँ पाठ [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) र नोटबुक [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) जसले पूर्णरूपले उपकरणमा आधारित इन्जिनियरिङ सहायक बनाउँछ (Foundry Local मार्फत Qwen फंक्शन कलिङ, स्यान्डबक्स फाइल टूल्स, स्थानीय RAG संग Chroma, वैकल्पिक स्थानीय MCP), स्थानीय मात्र / स्थानीय-RAG / टूल-कलिङ डायग्रामहरू, ज्ञान परीक्षण, असाइनमेंट, र चुनौती सहित।
- **स्मोक-टेस्ट पाईपलाइन।** नयाँ [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) वर्कफ्लो [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) र पाठ ०१, ०४, ०५ र १६ मा परिनियोजन योग्यता एजेन्टहरूको लागि [tests/](./tests/README.md) अन्तर्गत प्रति-पाठ सूचीकरणहरू, जसमा हरेक सूचीकरणलाई यसका पाठ र होस्ट गरिएको एजेन्ट नामसँग म्याप गर्ने निर्देशिका README हुन्छ। पाठ १६ ले "स्मोक टेस्टहरूसँग परिनियोजित एजेन्ट प्रमाणीकरण" खण्ड प्राप्त गर्छ; पाठ ०१/०४/०५ ले वैकल्पिक स्मोक-टेस्ट सूचक प्राप्त गर्छ।
- **सिक्ने कौशलहरू।** नयाँ एजेन्ट स्किलहरू `.agents/skills/` भित्र: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (पाठ १६ र १७ को मार्गदर्शन समेटिएको), र [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (माइक्रोसफ्ट फाउण्ड्री/एजुर ओपनएआई सेटअपसँग नोटबुक नमूनाहरू कसरी प्रमाणीकरण गर्ने)।
- **नोटबुक मान्यकरण रनर।** नयाँ [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) जसले हरेक Python नोटबुकलाई हेडलेस रूपमा `nbconvert` मार्फत चलाउँछ र PASS/FAIL म्याट्रिक्स प्रिन्ट गर्छ (साथै `results.json`)। यसले स्वतः रिपोजिटरी मूल र पाइथन पत्ता लगाउँछ, कोर्स बाहेकका नोटबुकहरू (जस्तै `.venv`, `site-packages`, `translations`, स्किल टेम्प्लेट सम्पत्ति) र `.NET` नोटबुकहरू डिफल्टले बाहिर राख्छ, र `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, र `-Python` समर्थन गर्दछ।
- **कोर्स नेभिगेसन।** पाठ ११–१५ मा अघिल्ला/अर्को पाठ लिंकहरू थपियो (पहिले थिएन) जसले पुरै कोर्स ०० → १८ लाई दुवै दिशामा श्रृंखला बनाउँछ।
- **नयाँ थम्बनेलहरू।** पाठ १६ र १७ का लागि थम्बनेलहरू, साथै ताज़ा गरिएको रिपोजिटरी सामाजिक छवि [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (अब दुई नयाँ पाठहरू र `aka.ms/ai-agents-beginners` URL विज्ञापन गर्दै)।
- **आश्रितता** ([requirements.txt](../../requirements.txt)): पाठ १७ को लागि `foundry-local-sdk` र `chromadb` थपियो।

### परिवर्तनहरू

- **मुख्य [README.md](./README.md)** पाठ तालिका: पाठ १६ र १७ अब आफ्नो सामग्रीसँग लिंक गर्छन् (पहिले "शिघ्र आउँदैछ"); रिपोजिटरी छवि `repo-thumbnailv3.png` मा अद्यावधिक।
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: पाठ १६ र १७ सिकाइ मार्गदर्शक र सिकाइ मार्गहरूमा थपियो, र "स्मोक टेस्टहरूसँग परिनियोजित एजेन्टहरूको प्रमाणीकरण" खण्ड थपियो।
- **[AGENTS.md](./AGENTS.md)**: पाठ संख्या/वर्णन (००–१८) अपडेट गरियो, स्मोक-टेस्ट प्रमाणीकरण खण्ड थपियो, र पाठ १६/१७ को नमूना नामकरण उदाहरणहरू थपियो।
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "अघिल्लो पाठ" अब पाठ १७ तर्फ संकेत गर्छ (पहिले पाठ १५ थियो), श्रृंखलालाई बन्द गर्दै।
- **अप्रचलित नभएको मोडेलहरूमा मानकीकृत मोडेल सन्दर्भहरू।** पुरा कोर्समा `gpt-4o` / `gpt-4o-mini` लाई `gpt-4.1-mini` ले प्रतिस्थापन गरियो (दस्तावेजहरू, `.env.example`, Python/.NET नोटबुकहरू र नमूनाहरूमा) — `gpt-4o` (सबै संस्करणहरू) २०२६ मा बन्द हुँदैछ। पाठ १६ को मोडल राउटिङ उदाहरणले सानो/ठुलो फरक राखेको छ `gpt-4.1-mini` (सानो) र `gpt-4.1` (ठुलो) को साथ। Python नोटबुकहरूले अब हार्ड-कोडेड मोडेल नामको सट्टा वातावरण भेरिएबलबाट मोडेल चयन गर्छन् (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`)।

### नोटहरू र थाहा भएका सीमाहरू

- **प्रत्यक्ष Azure विरुद्ध चलाइएको छैन।** नयाँ पाठका नोटबुकहरू शैक्षिक नमूनाहरू हुन्; ती तपाईंको माइक्रोसफ्ट फाउण्ड्री / फाउण्ड्री लोकल सेटअप विरुद्ध चलाएर प्रमाणीकरण गर्नुहोस्। स्मोक-टेस्ट वर्कफ्लोले पाठको एजेन्ट परिनियोजन गर्न र Azure OIDC सिक्रेटहरू (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) Foundry प्रोजेक्ट दायरा भित्र **Azure AI User** भूमिकामा सेटअप गर्न आवश्यक छ।
- **पाठ १७ स्थानीय मात्र हो।** यसको Foundry Responses अन्तबिन्दु छैन, त्यसैले स्मोक-टेस्ट एक्सन लागू हुँदैन; यसलाई तपाईंको कार्यस्थलमा नोटबुक चलाएर प्रमाणीकरण गर्नुहोस्।

## [रिलिज गरिएको] — 2026-07-06

यस रिलिजले कोर्सलाई **Azure OpenAI Responses API** मा माइग्रेट गर्दछ, उत्पादन नामकरणलाई **Microsoft Foundry** र **Microsoft Agent Framework (MAF)** मा मानकीकृत गर्दछ, GitHub मोडेलहरू बन्द गर्दछ, SDK संस्करणहरू अपडेट गर्दछ, र स्थानीय मोडेलहरू र Foundry मा अन्य फ्रेमवर्कहरू होस्ट गर्ने सम्बन्धमा नयाँ सामग्री थप्दछ।

### थपियो

- **माइग्रेशन स्किल** — `.agents/skills/` भित्र [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) एजेन्ट स्किल स्थापना गरियो (Azure-Samples/azure-openai-to-responses बाट) जसमा सन्दर्भहरू र स्क्यानर स्क्रिप्ट समावेश छन्।
- **Foundry Local (डिभाइसमा मोडेलहरू चलाउनुहोस्)** — [00-course-setup/README.md](./00-course-setup/README.md) मा नयाँ "वैकल्पिक प्रदायक: Foundry Local" खण्ड जुन स्थापना (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, र Microsoft Agent Framework लाई `OpenAIChatClient` मार्फत `FoundryLocalManager` संग जडान गर्ने कुरा समेट्छ।
- **Microsoft Foundry मा LangChain / LangGraph एजेन्टहरू होस्टिङ** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) मा नयाँ खण्ड र चलाउन मिल्ने नमूना [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) जसले `langchain-azure-ai[hosting]` र `ResponsesHostServer` (`/responses` प्रोटोकल) प्रयोग गर्छ, र [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) मा आधारित छ।
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) मा नयाँ "रियल-वर्ल्ड उदाहरण: Microsoft Project Opal" खण्डले Opal लाई एंटरप्राइज कम्प्युटर-प्रयोग एजेन्टको रूपमा फ्रेम गर्दछ र यसलाई कोर्स अवधारणाहरू (मानव-इन-द-लूप, विश्वास/सुरक्षा, योजना, स्किलहरू) सँग म्याप गर्दछ।
- **दोस्रो पाठ ०२ Python नमूना** — थपियो [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) ("परिवर्तनहरू" हेर्नुहोस् — पूर्व सेम्यान्टिक कर्नेल नोटबुकबाट माइग्रेट गरिएको), र यसलाई पाठ README मा लिंक गरियो।
- **मोडेल र प्रदायकहरू** खण्ड [STUDY_GUIDE.md](./STUDY_GUIDE.md) मा थपियो।

### परिवर्तनहरू

- **च्याट कम्प्लीशन्स → Responses API (Python)।** मोडेललाई सिधा कल गर्ने नमूनाहरूलाई च्याट कम्प्लीशन्सबाट Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`) मा माइग्रेट गरियो, स्थिर Azure OpenAI `/openai/v1/` अन्तबिन्दु (कुनै `api_version` नभएको) माथि `OpenAI` क्लाइंट प्रयोग गर्दै। प्रभावित नमूनाहरूमा समावेश छन्:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — पूर्ण फंक्शन-कलिङ वाकथ्रु (टूल स्किमा Responses ढाँचामा परिवर्तन, टूल परिणामहरू `function_call_output`, `max_output_tokens` आदि रूपमा फर्काइयो)।
- **GitHub Models → Azure OpenAI।** GitHub Models बन्द हुँदैछ (रिटायर २०२६ जुलाईमा) र Responses API समर्थन गर्दैन। सबै GitHub Models कोड मार्गहरू Azure OpenAI / Microsoft Foundry मा पाइथन र .NET नमूनाहरूमा परिवर्तन गरियो:
  - पाइथन: पाठ ०८ वर्कफ्लो नोटबुकहरू (`01`–`03`), पाठ १४ (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`)।
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + साथ `.md` दस्तावेजहरू र पाठ ०८ डटनेट वर्कफ्लो नोटबुक/`.md` (`01`–`03`) अब `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` र `AzureCliCredential` प्रयोग गर्छन्।
- **सेम्यान्टिक कर्नेल → Microsoft Agent Framework।** पूर्व `02-semantic-kernel.ipynb` Microsoft Agent Framework र Azure OpenAI (Responses API) प्रयोग गरी पुन:लेखन गरियो र `02-python-agent-framework-azure-openai.ipynb` मा नाम परिवर्तन गरियो।
- **`FoundryChatClient` + `as_agent` मा मानकीकरण।** README र नोटबुक कोडले जुन `AzureAIProjectAgentProvider` लाइ उल्लेख गर्थ्यो, पाठ ०१ र फ्रेमवर्कका आफ्नै नमूनाले प्रयोग गरेको क्यानोनिकल ढाँचामा मानकीकृत गरियो: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` सँग `provider.as_agent(...)`। यो पाठ ०२–१४ READMEs र नोटबुकहरूमा अपडेट गरियो (जस्तै, पाठ १३ मेमोरी, सबै पाठ १४ नोटबुक, `11-agentic-protocols/code_samples/github-mcp/app.py`)।
- **उत्पादन नामकरण।** अंग्रेजी सामग्रीभर नाम परिवर्तन गरियो:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (परिवर्तन भएन: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", र वातावरण-भेरिएबल नामहरू।)
- **आश्रितता** ([requirements.txt](../../requirements.txt)):
  - `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0` पिन गरिएको।
  - `openai>=1.108.1` (Responses API का लागि न्यूनतम) पिन गरिएको।
  - `azure-ai-inference` हटाइएको (माइग्रेट गरिएको GitHub Models नमूनाहरूमा मात्र प्रयोग भएको थियो)।
- **पर्यावरण कन्फिगरेसन** ([.env.example](../../.env.example)): GitHub Models को भेरिएबलहरू (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`) हटाइयो; `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, र वैकल्पिक `AZURE_OPENAI_API_KEY` थपियो; Microsoft Foundry नामकरणमा अद्यावधिक गरियो।
- **डक्स** — माथिका लागि [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), र [STUDY_GUIDE.md](./STUDY_GUIDE.md) अपडेट गरियो (सेटअप env भेरिएबल, प्रमाणीकरण स्निपेट, प्रदायक मार्गदर्शन, नामकरण)।

### हटाइयो

- GitHub Models अनबोर्डिङ कदमहरू र वातावरण भेरिएबलहरू सेटअप डक्सबाट हटाइयो (Azure OpenAI / Microsoft Foundry द्वारा प्रतिस्थापित)।

### सुरक्षा / गोपनीयता (सार्वजनिक साझेदारी सफा गर्ने)

- Jupyter नोटबुक कार्यान्वयन आउटपुट जुन वास्तविक **Azure सदस्यता ID**, स्रोत-समूह / स्रोत नामहरू, र Bing कनेक्सन ID लीक गरेका थिए, साथै विकासकर्ता **स्थानीय फाइल पथहरू र प्रयोगकर्ता नामहरू** निम्नमा सफा गरियो:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- ट्र्याक गरिएको अंग्रेजी सामग्रीमा कुनै API कुञ्जीहरू, टोकनहरू, सदस्यता ID हरू, वा व्यक्तिगत पथहरू बाँकी छैनन् भनेर पुष्टि गरिएको छ (अवशिष्ट `GITHUB_TOKEN` सन्दर्भहरू वर्कफ्लोहरूमा GitHub Actions टोकन र लेसन ११ सेटअपमा GitHub MCP सर्भर PAT हुन् — दुवै वैध र GitHub मोडेलहरूसँग असम्बन्धित)।

### नोटहरू र ज्ञात सीमाहरु

- **चलाइएको/कम्पाइल गरिएको छैन।** यी शैक्षिक नमूनाहरू API/नामकरणको शुद्धताका लागि अपडेट गरिएका छन्; यीलाई लाइभ Azure स्रोतहरू विरुद्ध चलाइएको छैन, र .NET नमूनाहरू यस वातावरणमा कम्पाइल गरिएको छैन। आफ्नो Microsoft Foundry / Azure OpenAI डिप्लोयमेन्टसँग प्रमाणित गर्नुहोस्।
- **मोडेल डिप्लोयमेन्टले Responses API समर्थन गर्नुपर्छ।** `gpt-4.1-mini`, `gpt-4.1`, वा `gpt-5.x` जस्ता डिप्लोयमेन्ट प्रयोग गर्नुहोस्। पुराना मोडेलहरूले Responses को मुख्य कार्यक्षमता समर्थन गर्छन् तर सबै सुविधाहरू होइन।
- **Agent-framework संस्करण।** नमूनाहरूले नवीनतम MAF (`>=1.10.0`) लाई लक्षित गर्छन्। आधिकारिक एजेन्ट-निर्माण कल `client.as_agent(...)` हो; एपीआईहरू फ्रेमवर्कको प्रकाशित डकुमेन्टहरू र इन्स्टल गरिएको बिल्डसँग प्रमाणित गरियो। फरक संस्करण प्रयोग गर्दा, विधि उपलब्धता जाँच गर्नुहोस् (`as_agent` बनाम `create_agent`)।
- **Lesson 08 workflow नोटबुक 04** ले जानबुझेर `AzureAIAgentClient` (जुन `agent-framework-azure-ai` बाट हो) राखेको छ किनकि यसले Microsoft Foundry Agent Service होस्ट गरिएको उपकरणहरू (Bing ग्राउन्डिङ, कोड इन्टरप्रेटर) प्रयोग गर्छ; यो पहिल्यै Responses-आधारित छ।
- **.NET डिफल्ट डिप्लोयमेन्ट।** दुई Lesson 08 dotNET workflow नमूनाहरू पहिले विशिष्ट मोडेल कडि रूपमा राखेका थिए; अब तिनीहरू `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`) मा डिफल्ट छन्। यदि नमूना मल्टिमोडल/दृश्य इनपुटमा निर्भर छ भने, `AZURE_OPENAI_DEPLOYMENT` लाई उपयुक्त मोडेलमा सेट गर्नुहोस्।
- **Foundry Local** ले OpenAI-संगत **Chat Completions** अन्त बिन्दु उपलब्ध गराउँछ र स्थानीय विकासको उद्देश्यका लागि हो; पूर्ण Responses API सुविधाहरूको लागि Azure OpenAI / Microsoft Foundry प्रयोग गर्नुहोस्।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->