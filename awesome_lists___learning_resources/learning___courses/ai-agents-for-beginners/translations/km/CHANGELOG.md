# កំណត់ហេតុបម្លែង

ការផ្លាស់ប្តូរដ៏គួរឱ្យចាប់អារម្មណ៍ទាំងអស់សម្រាប់វគ្គ **ភ្នាក់ងារ AI សម្រាប់អ្នកចាប់ផ្តើម** ត្រូវបានកត់ត្រាទុកនៅក្នុងឯកសារនេះ។

## [បានចេញផ្សាយ] — ២០២៦-០៧-១៣

ការចេញផ្សាយនេះបន្ថែមមេរៀនថ្មីពីរដែលបញ្ចប់ផ្នែកការដាក់ពង្រីក — ការពង្រីកភ្នាក់ងារទៅកាន់ Microsoft Foundry និងចុះមកកាន់កុំព្យូទ័រតែមួយ — បូកបន្ថែមនឹងបាញ់ភក់ pipeline, ការរុករកវគ្គសិក្សាថ្មី, ជំនាញឆ្លាតវៃសម្រាប់អ្នករៀនថ្មី, និងយីហោអេហ្សុីដែលបានធ្វើបច្ចុប្បន្នភាព។

### បានបន្ថែម

- **មេរៀនទី 16 — ការដាក់បញ្ចូលភ្នាក់ងារដែលអាចពង្រីកបានជាមួយ Microsoft Foundry។** មេរៀនថ្មី [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) និងសៀវភៅចំណាំធ្វើបាន [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) សាងសង់ភ្នាក់ងារជួយអតិថិជនផលិតផល (ឧបករណ៍, RAG, ការចងចាំ, ផ្លូវដំណើរការម៉ូឌែល, ស្កេនការឆ្លើយតប, អនុម័តដោយមនុស្ស, ខ្ទង់ការវាយតំលៃ, និងការតាមដាន OpenTelemetry), ជាមួយគំនូសគំនរផ្នែកអភិវឌ្ឍន៍/ដាក់ជ្រើស/រត់runtime Mermaid, ការត្រួតពិនិត្យចំណេះដឹង, ការបោស្រាស, និងការប្រកួតប្រជែង។
- **មេរៀនទី 17 — បង្កើតភ្នាក់ងារ AI នៅក្នុងតំបន់ជាមួយ Foundry Local និង Qwen។** មេរៀនថ្មី [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) និងសៀវភៅចំណាំ [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) សាងសង់ជំនួយការបច្ចេកវិទ្យារបស់អ្នកនៅលើឧបករណ៍ (ការហៅមុខងារ Qwen តាមរយៈ Foundry Local, ឧបករណ៍ឯកសារដែលមានសុវត្ថិភាព, RAG នៅក្នុងតំបន់ជាមួយ Chroma, MCP ដែលមានជម្រើសនៅក្នុងតំបន់), ជាមួយគំនូសគំនរដែលមានតែក្នុងតំបន់ / RAG តំបន់ / ការហៅឧបករណ៍, ការត្រួតពិនិត្យចំណេះដឹង, ការបោស្រាស, និងការប្រកួតប្រជែង។
- **pipeline សាកល្បងបាញ់ភក់។** សកម្មភាព [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) ថ្មី [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) បូកបន្ថែមបញ្ជីជាក់លាក់គ្រប់មេរៀននៅក្រោម [tests/](./tests/README.md) សម្រាប់ភ្នាក់ងារដាក់បាននៅក្នុងមេរៀន ០១, ០៤, ០៥ និង ១៦, ជាមួយ README សញ្ញាស្ដារដែលបញ្ជាក់តំណភ្ជាប់មួយមួយទៅមេរៀននិងឈ្មោះភ្នាក់ងារផ្តល់សេវា។ មេរៀន ១៦ បានរៀបចំបែបបទ "ការផ្ទៀងផ្ទាត់ភ្នាក់ងារដាក់រួចជាមួយសាកល្បងបាញ់ភក់"; មេរៀន ០១/០៤/០៥ បានបន្ថែមការជ្រើសរើសបាញ់ភក់ជាជម្រើស។ 
- **ជំនាញអ្នករៀន។** ជំនាញភ្នាក់ងារថ្មីនៅក្នុង `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (បញ្ចូលការណែនាំមេរៀន ១៦ និង ១៧) និង [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (វិធីធ្វើការផ្ទៀងផ្ទាត់គំរូសៀវភៅចំណាំនៃវគ្គសិក្សាទៅនឹងការតំឡើង Microsoft Foundry / Azure OpenAI ដំណើរការដែលមានការជ្រៀតជ្រែក)។
- **កម្មវិធីអនុវត្តន៍ផ្ទៀងផ្ទាត់សៀវភៅចំណាំ។** ថ្មី [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) ដែលបញ្ចេញដំណើរការសៀវភៅចំណាំ Python ទាំងអស់ដោយអត់ប្រើប្រាស់ពិភពចម្ប៉ូ `nbconvert` ហើយបោះពុម្ពបញ្ចា PASS/FAIL (បូកបន្ថែម `results.json`)។ វាស្វ័យប្រវត្តិរកទីតាំង root របស់ repo និង Python មិនរាប់បញ្ចូលសៀវភៅចំណាំក្រៅវគ្គសិក្សា (`.venv`, `site-packages`, `translations`, ទ្រព្យសម្បត្តិគំរូជំនាញ) និងសៀវភៅចំណាំ `.NET` តាមលំនាំដើម ហើយគាំទ្រ `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, និង `-Python`។
- **ការរុករកវគ្គសិក្សា។** បន្ថែមតំណភ្ជាប់ទៅមេរៀនមុន/បន្ទាប់នៅក្នុងមេរៀន ១១–១៥ (ដែលមិនមានមុននេះ) ដូច្នេះវគ្គសិក្សាទាំងមូលច្រវាក់ចាប់ពី ០០ → ១៨ ទាំងពីរទិសដៅ។
- **រូបតំណាងថ្មី។** រូបតំណាងមេរៀនសម្រាប់មេរៀន ១៦ និង ១៧ និងរូបភាពសង្គម repo ដែលបានបញ្ចូលឡើងវិញ [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (ឥឡូវនេះផ្សព្វផ្សាយពីមេរៀនថ្មីពីរនិង URL `aka.ms/ai-agents-beginners`)។
- **ភាពពាក់ព័ន្ធ** ([requirements.txt](../../requirements.txt)): បន្ថែម `foundry-local-sdk` និង `chromadb` សម្រាប់មេរៀន ១៧។

###បានផ្លាស់ប្តូរ

- **តារាងមេរៀនក្នុង [README.md](./README.md)**: មេរៀន ១៦ និង ១៧ ឥឡូវបានតំណភ្ជាប់ទៅកាន់មាតិការបស់ពួកវា (មុននេះ "មកឆាប់ៗ"); រូបភាព repo ត្រូវបានប្ដូរទៅជា `repo-thumbnailv3.png`។
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: បន្ថែមមេរៀន ១៦ និង ១៧ ទៅនឹងមគ្គុទេសក៍មេរៀនមួយមួយ និងផ្លូវរៀន, និងផ្នែក "ការផ្ទៀងផ្ទាត់ភ្នាក់ងារដាក់រួចជាមួយសាកល្បងបាញ់ភក់"។
- **[AGENTS.md](./AGENTS.md)**: បច្ចុប្បន្នភាពចំនួនមេរៀន/ការពិពណ៌នា (០០–១៨), បន្ថែមផ្នែកផ្ទៀងផ្ទាត់សាកល្បងបាញ់ភក់, និងបន្ថែមឧទាហរណ៍ឈ្មោះគំរូមេរៀន ១៦/១៧។
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "មេរៀនមុន" ឥឡូវបញ្ជូនទៅមេរៀន ១៧ (មុននេះជាមេរៀន ១៥), បិទខ្សែភាពជាប់។
- **យោងម៉ូឌែលផ្ទៀងផ្ទាត់ជាមានស្តង់ដារលើម៉ូឌែលមិនបានលុបចោល។** ប្ដូរយោងធ្វើពី `gpt-4o` / `gpt-4o-mini` ទាំងអស់ជាម៉ូឌែល `gpt-4.1-mini` - `gpt-4o` (គ្រប់កំណែ) នឹងផ្អាកដំណើរការនៅឆ្នាំ ២០២៦។ ឧទាហរណ៍ផ្លូវដំណើរការម៉ូឌែលក្នុងមេរៀន ១៦ នៅតែរក្សាភាពខុសគ្នាទំហំតូច/ធំដោយប្រើ `gpt-4.1-mini` (តូច) និង `gpt-4.1` (ធំ)។ សៀវភៅចំណាំ Python ឥឡូវជ្រើសរើសម៉ូឌែលពីបរិស្ថានភាគីចេញ (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) ជំនួសឱ្យតែមុខម៉ូឌែលថេរ។

### កំណត់សម្គាល់ និងកំណត់កម្លាំងដែលស្គាល់

- **មិនបានដំណើរការចំពោះ Azure បច្ចុប្បន្ន។** សៀវភៅចំណាំរបស់មេរៀនថ្មីគឺជាគំរូសិក្សា; ត្រូវរត់ និងផ្ទៀងផ្ទាត់វាទៅនឹងការតំឡើង Microsoft Foundry / Foundry Local របស់អ្នកផ្ទាល់។ សកម្មភាពសាកល្បងបាញ់ភក់ត្រូវការឲ្យអ្នកដាក់រួចភ្នាក់ងារមេរៀននិងកំណត់រចនាសម្ព័ន្ធអាហារូបត្ថម្ភ Azure OIDC (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) ជាមួយតួនាទី **Azure AI User** នៅព្រំដែនគម្រោង Foundry។
- **មេរៀន ១៧ គឺត្រឹមតែតំបន់ក្នុងតែម្តង។** វាមិនមានចំណុចបញ្ចូន Foundry Responses ទេ ដូច្នេះសកម្មភាពសាកល្បងបាញ់ភក់មិនអនុវត្ត; ផ្ទៀងផ្ទាត់វាដោយការរត់សៀវភៅចំណាំនៅកុំព្យូទ័ររបស់អ្នក។

## [បានចេញផ្សាយ] — ២០២៦-០៧-០៦

ការចេញផ្សាយនេះបម្លែងវគ្គសិក្សាទៅកាន់ **Azure OpenAI Responses API**, ស្ដង់ដារការកំណត់ឈ្មោះផលិតផលនៅលើ **Microsoft Foundry** និង **Microsoft Agent Framework (MAF)**, ផ្អាក GitHub Models, បច្ចុប្បន្នភាពកំណែ SDK, ហើយបន្ថែមមាតិកាថ្មីអំពីម៉ូឌែលក្នុងតំបន់ និងការតម្កល់វេទិការផ្សេងទៀតនៅលើ Foundry។

### បានបន្ថែម

- **ជំនាញបម្លែង** — ដំឡើងជំនាញភ្នាក់ងារ [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (ពី [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) នៅក្នុង `.agents/skills/`, រួមមានយោង និងស្កេនស្គ្រីប។
- **Foundry Local (រត់ម៉ូឌែលខាងលើឧបករណ៍)** — ផ្នែក "អ្នកផ្គត់ផ្គង់ជំនួស: Foundry Local" ថ្មីនៅក្នុង [00-course-setup/README.md](./00-course-setup/README.md)ដែលបង្ហាញពីការដំឡើង (`winget` / `brew`), ការរត់ម៉ូឌែល foundry, `foundry-local-sdk`, និងការតភ្ជាប់ `FoundryLocalManager` ទៅ Microsoft Agent Framework តាម `OpenAIChatClient`។
- **ផ្ទុកភ្នាក់ងារ LangChain / LangGraph លើ Microsoft Foundry** — ផ្នែកថ្មីនៅក្នុង [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) និងគំរូ runnable [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) ប្រើ `langchain-azure-ai[hosting]` និង `ResponsesHostServer` (ពិធីសាស្រ្ត `/responses`), បើយោងទៅ [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)។
- **គម្រោង Microsoft Opal** — ផ្នែកថ្មី "ឧទាហរណ៍ពិភពពិត: គម្រោង Microsoft Opal" នៅក្នុង [15-browser-use/README.md](./15-browser-use/README.md) ដែលពិពណ៌នាខ្លឹមសារពាក់ព័ន្ធ Opal ជាភ្នាក់ងារប្រើប្រាស់កុំព្យូទ័រនៅសហគ្រាស និងភ្ជាប់វាទៅមេរៀន (មនុស្សនៅលើខ្សែ, ការជឿទុកចិត្ត/សុវត្ថិភាព, ការធ្វើផែនការ, ជំនាញ)។
- **គំរូ Python នៃមេរៀនទី ២ ដំណាក់កាលទីពីរ** — បន្ថែម [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (មើល "បានផ្លាស់ប្តូរ" — ត្រូវបានផ្លាស់ប្តូរពីសៀវភៅចំណាំ Semantic Kernel មានមុន) និងបានភ្ជាប់វានៅក្នុង README មេរៀន។
- **ផ្នែកម៉ូឌែល និងអ្នកផ្គត់ផ្គង់** ត្រូវបានបន្ថែមនៅក្នុង [STUDY_GUIDE.md](./STUDY_GUIDE.md)។

### បានផ្លាស់ប្តូរ

- **Chat Completions → Responses API (Python)**។ គំរូដែលហៅម៉ូឌែលប្រាប់ដោយផ្ទាល់ត្រូវបានបម្លែងពី Chat Completions ទៅ Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), ប្រើ `OpenAI` client ទៅ endpoint Azure OpenAI `/openai/v1/` ដែលមានស្ថិរភាព (គ្មាន `api_version`)។ គំរូដែលមានរួមមាន:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — វគ្គប្រៀបធៀបហៅមុខងារពេញលេញ (ផែនទី schema ឧបករណ៍បានស្មើតែមុខងារ Responses, លទ្ធផលឧបករណ៍មានជា `function_call_output`, `max_output_tokens`, ល។)។
- **GitHub Models → Azure OpenAI**។ GitHub Models ត្រូវបានផ្អាក (នឹងផ្អាកនៅ **ខែកក្កដា ២០២៦**) ហើយមិនគាំទ្រសម្រាប់ Responses APIទេ។ គ្រប់ផ្លូវកូដ GitHub Models ត្រូវបានបម្លែងទៅ Azure OpenAI / Microsoft Foundry នៅក្នុងគំរូ Python និង .NET:
  - Python: សៀវភៅចំណាំ ការងារវគ្គសិក្សាពីរទី ០៨ (`01`–`03`), មេរៀន ១៤ (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`)។
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` និងឯកសារ `.md` ជាប់គ្នា, លើសពីនេះសៀវភៅចំណាំ dotNET ផ្លូវវគ្គទី ០៨(`/01`–`03`) ប្រើ `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` ជាមួយ `AzureCliCredential`។
- **Semantic Kernel → Microsoft Agent Framework**។ សៀវភៅចំណាំ `02-semantic-kernel.ipynb` ដែលមានមុន ត្រូវបានសរសេរឡើងវិញដើម្បីប្រើ Microsoft Agent Framework ជាមួយ Azure OpenAI (Responses API) ហើយមានឈ្មោះកំណែជា `02-python-agent-framework-azure-openai.ipynb`។
- **ស្ដង់ដារលើ `FoundryChatClient` + `as_agent`។** README និងកូដសៀវភៅចំណាំដែលបានយោង `AzureAIProjectAgentProvider` ត្រូវបានស្ដង់ដារជាមួយគំរូទាំងមូលដែលប្រើក្នុងមេរៀន ០១ និងគំរូខ្លួន framework: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` ជាមួយ `provider.as_agent(...)`។ មានការអាប់ដេតនៅក្នុង README និងសៀវភៅចំណាំមេរៀន ០២–១៤ (ទំរង់ឧទាហរណ៍ជា memory មេរៀន ១៣, សៀវភៅចំណាំគ្រប់មេរៀន ១៤, `11-agentic-protocols/code_samples/github-mcp/app.py`)។
- **ឈ្មោះផលិតផល។** ប្ដូរឈ្មោះក្នុងមាតិកាអង់គ្លេសទាំងមូល៖
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (មិនបានផ្លាស់ប្តូរ: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", និងឈ្មោះអថេរបរិស្ថាន។)
- **ភាពពាក់ព័ន្ធ** ([requirements.txt](../../requirements.txt)):
  - កំណត់ចំនួន `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`។
  - កំណត់ចំនួន `openai>=1.108.1` (អប្បបរមាសម្រាប់ Responses API)។
  - ដក `azure-ai-inference` ចេញ (កាលពីមុនគ្រាន់តែប្រើដោយគំរូ GitHub Models ដែលបានផ្លាស់ប្តូរ)។
- **ការកំណត់បរិស្ថាន** ([.env.example](../../.env.example)): ដកអថេរបរិស្ថាន GitHub Models ចេញ (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); បន្ថែម `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, និងជម្រើស `AZURE_OPENAI_API_KEY`; បច្ចុប្បន្នភាពឈ្មោះទៅ Microsoft Foundry។
- **ឯកសារ** — បច្ចុប្បន្នភាព [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), និង [STUDY_GUIDE.md](./STUDY_GUIDE.md) សម្រាប់អ្វីខាងលើ (កំណត់អថេរបរិស្ថាន, ឧទាហរណ៍ផ្ទៀងផ្ទាត់, ណែនាំអ្នកផ្គត់ផ្គង់, និងឈ្មោះ)។

### ត្រូវបានដកចេញ

- ជំហានចូលរួម GitHub Models និងអថេរបរិស្ថានពីឯកសារពិពណ៌នាការតំឡើង (បានជំនួសដោយ Azure OpenAI / Microsoft Foundry)។

### សុវត្ថិភាព / ប្រជាជនភាព (សម្អាតការចែករំលែកសាធារណៈ)

- បានលុបចេញលទ្ធផលប្រតិបត្តិការសៀវភៅចំណាំ Jupyter ដែលបានបង្ហាញ **អត្តសញ្ញាណប្រព័ន្ធរាប់ចុះ Azure ពិត**, ឈ្មោះក្រុមប្រឹក្សា / ឈ្មោះធនធាន និងអត្តសញ្ញាណការតភ្ជាប់ Bing, លើសពីនេះផងដែរ **ផ្លូវឯកសារកុំព្យូទ័រដែលអភិវឌ្ឍន៍** និងអ្នកប្រើ, នៅក្នុង:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- បាន​ធ្វើ​អោយប្រាកដថា គន្លង API keys, tokens, subscription IDs ឬផ្លូវផ្ទាល់ខ្លួនមិនមាននៅក្នុងមាតិកាអង់គ្លេសដែលត្រូវបានតាមដានទៀតទេ (ការបញ្ជាក់ `GITHUB_TOKEN` ដែលនៅសល់ គឺជាតូកិន GitHub Actions នៅក្នុង workflows និង GitHub MCP server PAT ក្នុងការតំឡើងមេរៀនទី 11 — ទាំងពីរគឺត្រឹមត្រូវ និងមិនពាក់ព័ន្ធនឹង GitHub Models)។

### កំណត់សំគាល់ និងកំណត់ខ្សោយដែលបានស្គាល់

- **មិនបានអនុវត្ត/កំហិត។** សំណុំឧទាហរណ៍នេះគឺសម្រាប់សិក្សាបណ្តុះបណ្តាល ដែលបានធ្វើបច្ចុប្បន្នភាពសម្រាប់ភាពត្រឹមត្រូវ API/ការកំណត់ឈ្មោះ; សំណុំឧទាហរណ៍ទាំងនេះមិនបានរត់លើធនធាន Azure ពិតប្រាកដទេ ហើយសំណុំឧទាហរណ៍ .NET ក៏មិនបានកំហិតនៅក្នុងបរិបទនេះឡើយ។ សូមផ្ទៀងផ្ទាត់ផ្ទាល់ខ្លួនចំពោះ Microsoft Foundry / Azure OpenAI deployment របស់អ្នក។
- **ការចេញផ្សាយម៉ូដែលត្រូវតែគាំទ្រ Responses API។** ប្រើការចេញផ្សាយដូចជា `gpt-4.1-mini`, `gpt-4.1` ឬម៉ូដែល `gpt-5.x`។ ម៉ូដែលចាស់ៗគាំទ្រតែមុខងារ Responses សំខាន់ៗ ប៉ុន្តែមិនគាំទ្រពេញលេញគ្រប់មុខងារទេ។
- **កំណាត់ agent-framework។** សំណុំឧទាហរណ៍គោលដៅទៅលើ MAF ចុងក្រោយ (`>=1.10.0`)។ ការហៅចង្កោមបង្កើត agent ត្រូវបានប្រើ `client.as_agent(...)`; API ត្រូវបានផ្ទៀងផ្ទាត់ជាមួយឯកសារបោះពុម្ពបោះពុម្ពនិងការចំអិនដែលបានតំឡើង។ ប្រសិនបើអ្នកកំណត់កំណែផ្សេង សូមផ្ទៀងផ្ទាត់ភាពមាននៅក្នុងវិធីសាស្រ្ត (`as_agent` ឬ `create_agent`)។
- **Notebook workflow មេរៀន 08 លេខ 04** រក្សា `AzureAIAgentClient` (មកពី `agent-framework-azure-ai`) ដោយគ្រាន់តែការប្រើប្រាស់ឧបករណ៍ hosted Microsoft Foundry Agent Service (Bing grounding, code interpreter); វាមានគ្រឹះលើ Responses រួចហើយ។
- **ការចេញផ្សាយលំនាំដើម .NET។** សំណុំឧទាហរណ៍ dotNET workflow មេរៀន 08 ពីមុនបានកូដជាក់លាក់ទៅម៉ូដែលជាក់លាក់ មកពេលនេះវាប្រើលំនាំដើម `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`)។ បើសំណុំឧទាហរណ៍ពឹងផ្អែកលើ multimodal/vision input សូមកំណត់ `AZURE_OPENAI_DEPLOYMENT` ទៅម៉ូដែលសមស្រប។
- **Foundry Local** បង្ហាញចំណុចបញ្ចប់ OpenAI-compatible **Chat Completions** ហើយមានគោលបំណងសម្រាប់ការអភិវឌ្ឍក្នុងស្រុក; សូមប្រើ Azure OpenAI / Microsoft Foundry សម្រាប់មុខងារ Responses API ពេញលេញ។

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->