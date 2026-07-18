# Tala ng mga Pagbabago

Lahat ng mahahalagang pagbabago sa kurso na **AI Agents for Beginners** ay nakadokumento sa file na ito.

## [Naipalabas] — 2026-07-13

Idinagdag ng release na ito ang dalawang bagong leksyon na kumukumpleto sa deployment arc — pagpapalawak ng mga ahente papuntang Microsoft Foundry at pagbawas sa isang workstation lamang — pati na rin ang smoke-test pipeline, na-refresh na navigation ng kurso, bagong kasanayan para sa mga nag-aaral, at na-update na branding.

### Idinagdag

- **Leksiyon 16 — Pag-deploy ng Scalable Agents gamit ang Microsoft Foundry.** Bagong leksyon [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) at notebook na maaaring patakbuhin [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) na bumubuo ng production customer-support agent (mga tools, RAG, memorya, routing ng modelo, pag-cache ng sagot, pag-apruba ng tao, evaluation gate, at OpenTelemetry tracing), kasama ang mga diagram para sa development/deployment/runtime ng Mermaid, knowledge check, assignment, at challenge.
- **Leksiyon 17 — Paglikha ng Lokal na AI Agents gamit ang Foundry Local at Qwen.** Bagong leksyon [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) at notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) na bumubuo ng kumpletong on-device engineering assistant (Qwen function calling sa pamamagitan ng Foundry Local, sandboxed file tools, lokal na RAG gamit ang Chroma, opsyonal na lokal na MCP), kasama ang mga diagram ng lokal-lamang / lokal-RAG / pagtawag ng tool, knowledge check, assignment, at challenge.
- **Smoke-test pipeline.** Bagong [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) workflow [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) pati na rin ang mga katalogo kada leksyon sa ilalim ng [tests/](./tests/README.md) para sa mga deployable agents sa Leksiyon 01, 04, 05, at 16, na may index README na nagmamapa sa bawat katalogo sa kani-kanilang leksyon at pangalan ng hosted-agent. Nakakuha ang Leksiyon 16 ng seksyong "Validating a Deployed Agent with Smoke Tests"; ang Leksiyon 01/04/05 ay may opsyonal na pointer para sa smoke-test.
- **Kasanayan ng mga nag-aaral.** Bagong Kasanayan sa Agent sa ilalim ng `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (pagbebenta ng gabay sa Leksiyon 16 at 17), at [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (paano i-validate ang mga sample sa notebook laban sa live na Microsoft Foundry / Azure OpenAI setup).
- **Runner para sa pag-validate ng notebook.** Bagong [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) na nagpapatakbo ng bawat Python notebook nang headless gamit ang `nbconvert` at nagpapakita ng PASS/FAIL matrix (pati na rin ang `results.json`). Awtomatikong natutukoy ang root ng repo at Python, hindi isinasama ang non-course notebooks (`.venv`, `site-packages`, `translations`, skill template assets) at `.NET` notebooks bilang default, at sinusuportahan ang `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, at `-Python`.
- **Pag-navigate ng kurso.** Idinagdag ang mga link na Previous/Next lesson sa Leksiyon 11–15 (na dati ay nawawala) upang ang buong kurso ay magkakaugnay mula 00 → 18 sa parehong direksyon.
- **Bagong thumbnails.** Mga thumbnail ng leksyon para sa Leksiyon 16 at 17, pati na rin ang na-refresh na social image ng repository [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (na ngayon ay nag-aanunsyo ng dalawang bagong leksyon at ang URL na `aka.ms/ai-agents-beginners`).
- **Dependencies** ([requirements.txt](../../requirements.txt)): idinagdag ang `foundry-local-sdk` at `chromadb` para sa Leksiyon 17.

### Binago

- **Pangunahing [README.md](./README.md)** na talahanayan ng leksyon: Ngayon ang Leksiyon 16 at 17 ay may link na papunta sa kanilang mga nilalaman (dating "Coming Soon"); ang larawan ng repository ay pinalitan ng `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: idinagdag ang Leksiyon 16 at 17 sa gabay ng leksyon-sa-leksyon at mga learning path, at isang seksyong "Validating Deployed Agents with Smoke Tests".
- **[AGENTS.md](./AGENTS.md)**: na-update ang bilang at paglalarawan ng mga leksyon (00–18), nagdagdag ng seksyong smoke-testing validation, at nagdagdag ng mga halimbawa ng pagpe-pekta ng pangalan ng sample para sa Leksiyon 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: Tinuro na ngayon ng "Previous Lesson" ang Leksiyon 17 (dati ay Leksiyon 15), na nagsasarado ng chain.
- **Istandardisadong mga reperensya ng modelo sa mga non-deprecated na modelo.** Pinalitan lahat ng mga reperensya ng `gpt-4o` / `gpt-4o-mini` sa buong kurso (docs, `.env.example`, Python/.NET notebooks at mga sample) ng `gpt-4.1-mini` — ang `gpt-4o` (lahat ng mga bersyon) ay aalisin sa 2026. Sa halimbawa ng model-routing ng Leksiyon 16, nananatili ang kaibahan ng maliit/malaki gamit ang `gpt-4.1-mini` (maliit) at `gpt-4.1` (malaki). Ngayon ang mga Python notebook ay pumipili ng modelo mula sa mga environment variable (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) sa halip na hard-coded na pangalan ng modelo.

### Mga Tala at Kilalang Limitasyon

- **Hindi pinapatakbo laban sa live na Azure.** Ang mga bagong notebooks ng mga leksyon ay mga sample pang-edukasyon; patakbuhin at i-validate ang mga ito laban sa iyong sariling Microsoft Foundry / Foundry Local setup. Kinakailangan ng smoke-test workflow na ideploy mo ang ahente ng leksyon at i-configure ang Azure OIDC secrets (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) na may papel na **Azure AI User** sa antas ng proyektong Foundry.
- **Leksiyon 17 ay lokal-lamang.** Wala itong Foundry Responses endpoint, kaya hindi naaangkop ang smoke-test action; i-validate ito sa pamamagitan ng pagpapatakbo ng notebook sa iyong workstation.

## [Naipalabas] — 2026-07-06

Nililipat ng release na ito ang kurso sa **Azure OpenAI Responses API**, istandardisado ang pangalan ng produkto sa **Microsoft Foundry** at **Microsoft Agent Framework (MAF)**, tinanggal ang GitHub Models, in-update ang mga bersyon ng SDK, at nagdagdag ng bagong nilalaman tungkol sa mga lokal na modelo at pagho-host ng ibang mga framework sa Foundry.

### Idinagdag

- **Migration skill** — Nainstall ang [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Agent Skill (mula sa [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) sa `.agents/skills/`, kasama ang mga reperensya nito at scanner script.
- **Foundry Local (patakbuhin ang mga modelo on-device)** — Bagong seksyong "Alternative Provider: Foundry Local" sa [00-course-setup/README.md](./00-course-setup/README.md) na sumasaklaw sa pag-install (`winget` / `brew`), `foundry model run`, ang `foundry-local-sdk`, at ang pag-wire ng `FoundryLocalManager` sa Microsoft Agent Framework gamit ang `OpenAIChatClient`.
- **Pagho-host ng LangChain / LangGraph agents sa Microsoft Foundry** — Bagong seksyon sa [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) pati na isang runnable sample [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) gamit ang `langchain-azure-ai[hosting]` at `ResponsesHostServer` (ang `/responses` na protocol), batay sa [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Bagong seksyong "Real-World Example: Microsoft Project Opal" sa [15-browser-use/README.md](./15-browser-use/README.md) na naglalarawan ng Opal bilang enterprise computer-use agent at tinutugma ito sa mga konsepto ng kurso (human-in-the-loop, trust/security, planning, Kasanayan).
- **Pangalawang sample ng Leksiyon 02 Python** — Idinagdag ang [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (tingnan ang "Binago" — inilipat mula sa dating Semantic Kernel notebook) at nilink ito sa leksyon README.
- Idinagdag na seksyon na **Models and Providers** sa [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Binago

- **Chat Completions → Responses API (Python).** Ang mga sample na direktang tumatawag sa modelo ay inilipat mula sa Chat Completions patungo sa Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), gamit ang `OpenAI` client laban sa stable Azure OpenAI `/openai/v1/` endpoint (walang `api_version`). Kasama sa naapektuhang mga sample:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — ang kumpletong walkthrough ng function-calling (tool schema na naayos sa format ng Responses, mga resulta ng tool na ibinalik bilang `function_call_output`, `max_output_tokens`, atbp.).
- **GitHub Models → Azure OpenAI.** Ang GitHub Models ay deprecated (aalisin sa **Hulyo 2026**) at hindi sumusuporta sa Responses API. Ang lahat ng code path ng GitHub Models ay na-convert sa Azure OpenAI / Microsoft Foundry sa Python at .NET na mga sample:
  - Python: Leksiyon 08 workflow notebooks (`01`–`03`), Leksiyon 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + katuwang na `.md` na mga dokumento, at ang Leksiyon 08 dotNET workflow notebooks/`.md` (`01`–`03`) ngayon ay gumagamit ng `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` na may `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Ang dating `02-semantic-kernel.ipynb` ay nirewrite upang gamitin ang Microsoft Agent Framework kasama ang Azure OpenAI (Responses API) at pinalitan ang pangalan sa `02-python-agent-framework-azure-openai.ipynb`.
- **Istandardisa sa `FoundryChatClient` + `as_agent`.** Ang README at notebook code na tumutukoy sa `AzureAIProjectAgentProvider` ay istandardisado gamit ang canonical pattern na ginagamit ng Leksiyon 01 at mga sample ng framework: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` na may `provider.as_agent(...)`. Na-update ito sa mga README at notebook ng Leksiyon 02–14 (hal. memorya ng Leksiyon 13, lahat ng notebook sa Leksiyon 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Pangalan ng produkto.** Pinalitan sa buong nilalamang English:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Hindi binago: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", at mga pangalan ng environment-variable.)
- **Dependencies** ([requirements.txt](../../requirements.txt)):
  - Pinirmi ang `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Pinirmi ang `openai>=1.108.1` (minimum para sa Responses API).
  - Tinanggal ang `azure-ai-inference` (na dating ginagamit lang ng mga migrated GitHub Models sample).
- **Pag-configure ng environment** ([.env.example](../../.env.example)): tinanggal ang mga GitHub Models variables (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); dinagdag ang `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, at opsyonal na `AZURE_OPENAI_API_KEY`; ina-update ang pangalan para sa Microsoft Foundry.
- **Docs** — In-update ang [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), at [STUDY_GUIDE.md](./STUDY_GUIDE.md) para sa mga nabanggit (setup ng env vars, snippet ng verification, gabay sa provider, pangalan).

### Tinanggal

- Mga hakbang sa onboarding at environment variables ng GitHub Models mula sa setup docs (napalitan ng Azure OpenAI / Microsoft Foundry).

### Seguridad / Privacy (paglilinis sa public-sharing)

- Nilinis ang mga output ng pagtakbo ng Jupyter notebook na naglalaman ng totoong **Azure subscription ID**, resource-group / resource names, at Bing connection ID, pati na rin ang mga **lokal na file paths at usernames** ng developer, sa:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Napatunayan na walang natitirang API keys, tokens, subscription IDs, o personal na mga landas sa nasubaybayang nilalamang Ingles (ang mga sanggunian sa `GITHUB_TOKEN` na natira ay ang token ng GitHub Actions sa mga workflow at ang GitHub MCP server PAT sa pagsasaayos ng Lesson 11 — parehong lehitimo at hindi kaugnay sa GitHub Models).

### Mga Tala at kilalang mga limitasyon

- **Hindi naipatupad/naka-compile.** Ito ay mga sample na pang-edukasyon na na-update para sa tamang API/pangalan; hindi ito pinatakbo laban sa mga live na Azure resource, at ang mga sample na .NET ay hindi na-compile sa kapaligirang ito. Suriin laban sa iyong sariling Microsoft Foundry / Azure OpenAI deployment.
- **Dapat suportahan ng deployment ng modelo ang Responses API.** Gumamit ng deployment tulad ng `gpt-4.1-mini`, `gpt-4.1`, o isang `gpt-5.x` na modelo. Sinusuportahan ng mga lumang modelo ang pangunahing functionalities ng Responses ngunit hindi lahat ng feature.
- **Bersyon ng agent-framework.** Ang mga sample ay naka-target sa pinakabagong MAF (`>=1.10.0`). Ang pangkaraniwang tawag para sa paglikha ng agent ay `client.as_agent(...)`; ang mga API ay sinuri laban sa published na dokumentasyon ng framework at isang naka-install na build. Kung gagamit ng ibang bersyon, tiyaking available ang method (`as_agent` kumpara sa `create_agent`).
- **Lesson 08 workflow notebook 04** sinadyang pinananatili ang `AzureAIAgentClient` (mula sa `agent-framework-azure-ai`) dahil gumagamit ito ng mga tool na naka-host ng Microsoft Foundry Agent Service (Bing grounding, code interpreter); ito ay batay na sa Responses.
- **.NET default deployment.** Dalawang Lesson 08 dotNET workflow samples na dati ay hard-coded sa isang partikular na modelo; ngayon ay default sa `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Kung ang sample ay nakadepende sa multimodal/vision input, itakda ang `AZURE_OPENAI_DEPLOYMENT` sa angkop na modelo.
- **Foundry Local** ay nagpapakita ng OpenAI-compatible na **Chat Completions** endpoint at nilalayong gamitin para sa lokal na pag-develop; gamitin ang Azure OpenAI / Microsoft Foundry para sa kumpletong feature set ng Responses API.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->