# Mabadiliko ya Toleo

Mabadiliko yote muhimu kwa kozi ya **Maajenti wa AI kwa Komo** yameandikwa katika faili hii.

## [Imetolewa] — 2026-07-13

Toleo hili linaongeza masomo mawili mapya yanayokamilisha eneo la uenezi — kuongeza ajenti hadi Microsoft Foundry na kupunguza hadi kwa workstation moja — pamoja na bomba la mtihani wa moshi, urambazaji wa kozi uliosasishwa, ujuzi mpya wa mwanafunzi, na chapa iliyosasishwa.

### Imeongezwa

- **Somu la 16 — Kueneza Maajenti Yanayoweza Kupanuliwa kwa Microsoft Foundry.** Somo jipya [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) na daftari linaloweza kutekelezwa [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) linalojenga ajenti wa msaada kwa wateja wa uzalishaji (zana, RAG, kumbukumbu, uelekezaji wa mfano, kuhifadhi majibu, idhini ya binadamu, lango la tathmini, na ufuatiliaji wa OpenTelemetry), pamoja na michoro ya Mermaid ya maendeleo/uenezi/utumiaji, tathmini ya maarifa, kazi, na changamoto.
- **Somu la 17 — Kuunda Maajenti wa AI wa Kwenye Kifaa na Foundry Local na Qwen.** Somo jipya [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) na daftari [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) linalojenga msaidizi wa uhandisi wa kifaa kikamilifu (kuitwa kwa kazi ya Qwen kupitia Foundry Local, zana za faili zenye sandbox, RAG ya kienyeji na Chroma, MCP ya kienyeji hiari), pamoja na michoro ya kienyeji tu / RAG ya kienyeji / kuitwa kwa zana, tathmini ya maarifa, kazi, na changamoto.
- **Bomba la mtihani wa moshi.** Kazi mpya ya [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) pamoja na orodha za kila somo chini ya [tests/](./tests/README.md) kwa maajenti yanayoweza kuenezwa katika Masomo 01, 04, 05, na 16, pamoja na README ya faharasa inayotambulisha kila orodha kwa somo lake na jina la ajenti iliyohudumiwa. Somo la 16 lina sehemu ya "Kuthibitisha Ajenti Aliyetolewa kwa Mitihani ya Moshi"; Masomo 01/04/05 yanapata kiashiria cha mtihani wa moshi hiari.
- **Ujuzi wa mwanafunzi.** Ujuzi mpya wa Maajenti chini ya `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (kufunga mwongozo wa Masomo 16 na 17), na [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (jinsi ya kuthibitisha sampuli za daftari dhidi ya usanidi wa moja kwa moja wa Microsoft Foundry / Azure OpenAI).
- **Kimbiaji wa uhakiki wa daftari.** Kumbukumbu mpya [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) inayotekeleza kila daftari la Python bila kichwa kwa kutumia `nbconvert` na kuchapisha matokeo ya PASS/FAIL (pamoja na `results.json`). Inatambua kiotomatiki mizizi ya repo na Python, inajumuisha kutoingiza daftari zisizo za kozi (`.venv`, `site-packages`, `translations`, mali za kiolezo cha ujuzi) na daftari za `.NET` kwa msingi, na inaunga mkono `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, na `-Python`.
- **Urambazaji wa kozi.** Imeongeza viungo vya Somo lililopita/linalofuata kwa Masomo 11–15 (ambayo awali zilikosekana) ili kozi nzima iunganishwe 00 → 18 katika mwelekeo yote miwili.
- **Vichwa vidogo vipya.** Vichwa vidogo vya somo kwa Masomo 16 na 17, pamoja na picha ya kijamii ya maktaba iliyosafishwa [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (sasa ikitangaza masomo mawili mapya na URL ya `aka.ms/ai-agents-beginners`).
- **Vitegemezi** ([requirements.txt](../../requirements.txt)): imeongeza `foundry-local-sdk` na `chromadb` kwa Somo la 17.

### Imebadilika

- **Jedwali kuu la somo [README.md](./README.md):** Masomo 16 na 17 sasa yana viungo vya maudhui yao (zamani "Inakuja Hivi Karibuni"); picha ya maktaba imesasishwa kwa `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md):** iliongeza Masomo 16 na 17 kwenye mwongozo wa somo kwa somo na njia za kujifunza, pamoja na sehemu ya "Kuthibitisha Maajenti Waliotolewa kwa Mitihani ya Moshi".
- **[AGENTS.md](./AGENTS.md):** ilisasisha hesabu/maelezo ya somo (00–18), ilisababisha sehemu ya kuthibitisha mtihani wa moshi, na kuongeza mifano ya majina ya sampuli za Masomo 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md):** "Somo lililopita" sasa linaelekeza kwa Somo la 17 (ilikuwa Somo la 15), likifunga mnyororo.
- **Kurejelea mfano uliowekwa kwa kiwango kwenye mifano isiyoendelezwa.** Ili badilisha marejeleo yote ya `gpt-4o` / `gpt-4o-mini` kwenye kozi (nyaraka, `.env.example`, daftari za Python/.NET na sampuli) kwa `gpt-4.1-mini` — `gpt-4o` (matoleo yote) yataachishwa mwaka 2026. Mfano wa uelekezaji wa mfano wa Somo la 16 unaweka tofauti ndogo/kubwa kwa kutumia `gpt-4.1-mini` (ndogo) na `gpt-4.1` (kubwa). Daftari za Python sasa hunafuta mfano kutoka kwa vigezo vya mazingira (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) badala ya kuandika jina la mfano moja kwa moja.

### Vidokezo na vikwazo vinavyojulikana

- **Haitekelezwi dhidi ya Azure halisi.** Daftari mpya za masomo ni sampuli za kielimu; endesha na thibitisha dhidi ya usanidi wako mwenyewe wa Microsoft Foundry / Foundry Local. Kazi ya mtihani wa moshi inahitaji ueneze ajenti wa somo na usanidi siri za OIDC za Azure (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) na nafasi ya **Azure AI User** katika eneo la mradi wa Foundry.
- **Somo la 17 ni la kienyeji tu.** Halina sehemu ya Majibu ya Foundry, hivyo tendo la mtihani wa moshi halihusiki; kuthibitisha kwa kuendesha daftari kwenye workstation yako.

## [Imetolewa] — 2026-07-06

Toleo hili linahamisha kozi kwa **Azure OpenAI Responses API**, linaweka viwango vya jina la bidhaa kwa **Microsoft Foundry** na **Microsoft Agent Framework (MAF)**, linaachisha GitHub Models, linasasisha matoleo ya SDK, na linaongeza maudhui mapya juu ya mifano ya kienyeji na kuendesha mifumo mingine kwenye Foundry.

### Imeongezwa

- **Ujuzi wa uhamisho** — Imeweka Ujuzi wa Ajenti [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (kutoka [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) chini ya `.agents/skills/`, ikijumuisha marejeleo yake na script ya skana.
- **Foundry Local (endesha mifano kwenye kifaa)** — Sehemu mpya ya "Mtoa Mbadala: Foundry Local" katika [00-course-setup/README.md](./00-course-setup/README.md) inafafanua usakinishaji (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, na kuunganisha `FoundryLocalManager` na Microsoft Agent Framework kupitia `OpenAIChatClient`.
- **Kuendesha maajenti wa LangChain / LangGraph kwenye Microsoft Foundry** — Sehemu mpya katika [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) pamoja na sampuli inayoweza kutekelezwa [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) ikitumia `langchain-azure-ai[hosting]` na `ResponsesHostServer` (itifaki ya `/responses`), kulingana na [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Sehemu mpya ya "Mfano Halisi: Microsoft Project Opal" katika [15-browser-use/README.md](./15-browser-use/README.md) ikielezea Opal kama ajenti wa matumizi ya kompyuta wa biashara na kuoanisha na dhana za kozi (binadamu katika mzunguko, imani/usalama, upangaji, Ujuzi).
- **Sampuli ya pili ya Python ya Somo 02** — Imeongezwa [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (angaliza "Imebadilika" — imehamishwa kutoka daftari la Semantic Kernel la zamani) na kuunganishwa kwenye README ya somo.
- Sehemu ya **Mifano na Watoa Huduma** imeongezwa kwa [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Imebadilika

- **Chat Completions → Responses API (Python).** Sampuli ambazo ziliita mfano moja kwa moja zimehamishwa kutoka Chat Completions kwenda Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), zikitumia mteja wa `OpenAI` dhidi ya Azure OpenAI ya `/openai/v1/` (bila `api_version`). Sampuli zilizoathirika ni:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — mwendo wa kina wa kuitwa kwa kazi (mpangilio wa zana umepunguzwa hadi muundo wa Responses, matokeo ya zana yamerudishwa kama `function_call_output`, `max_output_tokens`, na kadhalika).
- **GitHub Models → Azure OpenAI.** GitHub Models imekoma (itaacha kutumia **Julai 2026**) na haijiungi na Responses API. Njia zote za msimbo wa GitHub Models zilibadilishwa kwenda Azure OpenAI / Microsoft Foundry katika sampuli za Python na .NET:
  - Python: daftari za mtiririko wa kazi wa Somo 08 (`01`–`03`), Somo 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + nyaraka za ziada `.md`, na daftari za mtiririko wa Somo 08 wa dotNET/`.md` (`01`–`03`) sasa zinatumia `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` kwa kutumia `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Daftari la zamani `02-semantic-kernel.ipynb` limeandikwa upya kutumia Microsoft Agent Framework na Azure OpenAI (Responses API) na kuitwa jina jipya `02-python-agent-framework-azure-openai.ipynb`.
- **Kuweka viwango kwa `FoundryChatClient` + `as_agent`.** README na msimbo wa daftari ulioonyesha `AzureAIProjectAgentProvider` umesanifishwa kwa mfano wa kawaida unaotumiwa na Somo 01 na sampuli za mfumo wao: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` na `provider.as_agent(...)`. Imesasishwa kwenye README na daftari za Masomo 02–14 (mfano, kumbukumbu ya Somo 13, daftari zote za Somo 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Kuitwa kwa bidhaa.** Yamebadilishwa katika maudhui yote ya Kiingereza:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Bado haijabadilika: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", na majina ya vigezo vya mazingira.)
- **Vitegemezi** ([requirements.txt](../../requirements.txt)):
  - Imeweka toleo thabiti la `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Imeweka toleo thabiti la `openai>=1.108.1` (chini ya kiwango kwa Responses API).
  - Imetoa `azure-ai-inference` (iliyotumika tu na sampuli za GitHub Models zilizoihamishwa).
- **Usanidi wa mazingira** ([.env.example](../../.env.example)): ilitoa vigezo vya GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); iliongeza `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, na `AZURE_OPENAI_API_KEY` hiari; ilibadilisha majina kwenda Microsoft Foundry.
- **Nyaraka** — Imesasisha [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), na [STUDY_GUIDE.md](./STUDY_GUIDE.md) kwa mabadiliko haya (usanidi wa mazingira, kipande cha uthibitisho, mwongozo wa mtoa huduma, na majina).

### Imetolewa

- Hatua za kuanzisha GitHub Models na vigezo vya mazingira kutoka kwa nyaraka za usanidi (zimebadilishwa na Azure OpenAI / Microsoft Foundry).

### Usalama / Faragha (kusafisha usambazaji wa umma)

- Imetoa matokeo ya utekelezaji wa daftari za Jupyter ambayo yalionyesha **nambari halali ya usajili wa Azure**, majina ya vikundi vya rasilimali / rasilimali, na ID ya muunganisho wa Bing, pamoja na **njia za faili za mbunifu wa ndani na majina ya watumiaji**, katika:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Hakikisha hakuna funguo za API, tokeni, vitambulisho vya usajili, au njia za kibinafsi zilizobaki katika maudhui ya Kiingereza yaliyofuatiliwa (marejeleo ya `GITHUB_TOKEN` iliyobaki ni tokeni ya GitHub Actions katika taratibu na PAT ya seva ya GitHub MCP katika usanidi wa Somo la 11 — zote ni halali na hazihusiani na Vifaa vya GitHub).

### Maelezo na mipaka inayojulikana

- **Haijatekelezwa/kukusanywa.** Hizi ni sampuli za kielimu zilizosasishwa kwa usahihi wa API/majina; hazikuwahi endeshwa dhidi ya rasilimali hai za Azure, na sampuli za .NET hazikukusanywa katika mazingira haya. Thibitisha dhidi ya usanidi wako wa Microsoft Foundry / Azure OpenAI.
- **Usambazaji wa mfano lazima uunge mkono API za Majibu.** Tumia usambazaji kama `gpt-4.1-mini`, `gpt-4.1`, au mfano wa `gpt-5.x`. Mifano ya zamani inaunga mkono huduma kuu za Majibu lakini si kila kipengele.
- **Toleo la agent-framework.** Sampuli zinaangazia MAF mpya kabisa (`>=1.10.0`). Mwito wa kuunda agent ni `client.as_agent(...)`; API zilithibitishwa dhidi ya hati zilizochapishwa za mfumo na ujenzi uliosakinishwa. Ikiwa unatumia toleo tofauti, thibitisha upatikanaji wa njia (`as_agent` dhidi ya `create_agent`).
- **Daftari la mtiririko wa Somo 08 notebook 04** linaweka kwa makusudi `AzureAIAgentClient` (kutoka `agent-framework-azure-ai`) kwa sababu linatumia zana za Huduma ya Agent ya Microsoft Foundry inayohudumiwa (msaada wa Bing, kitafsiri cha msimbo); tayari linategemea Majibu.
- **Usambazaji wa kawaida wa .NET.** Sampuli mbili za mtiririko wa Somo 08 dotNET awali zilikuwa zimeandikwa moja kwa moja kwa mfano maalum; sasa zinatumia chaguo-msingi `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Ikiwa sampuli inategemea ingizo la multimodal/maono, weka `AZURE_OPENAI_DEPLOYMENT` kwa mfano unaofaa.
- **Foundry Local** hutoa sehemu ya **Chat Completions** inayolingana na OpenAI na imelengwa kwa maendeleo ya ndani; tumia Azure OpenAI / Microsoft Foundry kwa seti kamili ya vipengele vya API za Majibu.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->