# Ändringslogg

Alla viktiga ändringar för kursen **AI Agents for Beginners** dokumenteras i denna fil.

## [Utgiven] — 2026-07-13

Denna version lägger till två nya lektioner som slutför utplaceringsbågen — att skala agenter upp till Microsoft Foundry och ner till en enskild arbetsstation — plus en snabbstestpipeline, uppdaterad kursnavigering, nya färdigheter för elever, och uppdaterad varumärkesprofil.

### Lagt till

- **Lektion 16 — Distribuera skalbara agenter med Microsoft Foundry.** Ny lektion [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) och körbar notebook [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) som bygger en produktionsredo kundsupportagent (verktyg, RAG, minne, modellroutning, cachelagring av svar, mänsklig godkännande, en utvärderingsport, och OpenTelemetry-tracering), med utvecklings-/distributions-/runtime-diagram i Mermaid, kunskapskontroll, uppgift och utmaning.
- **Lektion 17 — Skapa lokala AI-agenter med Foundry Local och Qwen.** Ny lektion [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) och notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) som bygger en helt enhetsbaserad ingenjörsassistent (Qwen funktionsanrop via Foundry Local, sandlåda-filsverktyg, lokal RAG med Chroma, valfri lokal MCP), med endast lokala / lokal RAG / verktygsanrops-diagram, kunskapskontroll, uppgift och utmaning.
- **Snabbstest pipeline.** Nytt arbetsflöde för [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) plus kataloger per lektion under [tests/](./tests/README.md) för de distribuerbara agenterna i Lektion 01, 04, 05 och 16, med en index README som kartlägger varje katalog till dess lektion och agentnamn som hostas. Lektion 16 får en sektion "Validating a Deployed Agent with Smoke Tests"; Lektionerna 01/04/05 får en valfri pekare till snabbstest.
- **Färdigheter för elever.** Nya Agent Skills under `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (paketerar Lektion 16 och 17 vägledning), och [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (hur man validerar notebook-exemplen mot en live Microsoft Foundry / Azure OpenAI setup).
- **Notebook-valideringsskript.** Nytt [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) som kör varje Python-notebook utan gränssnitt med `nbconvert` och skriver ut en PASS/FAIL-matris (plus `results.json`). Den detekterar automatiskt repo-roten och Python, exkluderar icke-kursnotebooks (`.venv`, `site-packages`, `translations`, färdighetsmallstillgångar) och `.NET`-notebooks som standard, och stöder `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` och `-Python`.
- **Kursnavigering.** Lade till länkar för Föregående/Nästa lektion till Lektionerna 11–15 (tidigare saknade) så hela kursen länkar i både riktningar från 00 → 18.
- **Nya miniatyrbilder.** Lektioners miniatyrbilder för Lektion 16 och 17, plus en uppfräschad social repositorybild [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (annonserar nu de två nya lektionerna och URL:en `aka.ms/ai-agents-beginners`).
- **Beroenden** ([requirements.txt](../../requirements.txt)): lade till `foundry-local-sdk` och `chromadb` för Lektion 17.

### Ändrat

- **Huvud-[README.md](./README.md)** lektionslista: Lektioner 16 och 17 länkar nu till sitt innehåll (tidigare "Kommer snart"); repositorybilden uppdaterad till `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: lade till Lektioner 16 och 17 till lektionsspecifik guide och lärvägar, samt en sektion "Validating Deployed Agents with Smoke Tests".
- **[AGENTS.md](./AGENTS.md)**: uppdaterade lektionsantal/beskrivning (00–18), lade till sektion för snabbstestvalidering och lade till exempel för namngivning av exempel i Lektion 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Previous Lesson" pekar nu till Lektion 17 (var Lektion 15), vilket sluter kedjan.
- **Standardiserade modellreferenser på icke-föråldrade modeller.** Ersatte alla `gpt-4o` / `gpt-4o-mini` referenser i hela kursen (dokument, `.env.example`, Python/.NET notebooks och exempel) med `gpt-4.1-mini` — `gpt-4o` (alla versioner) tas ur bruk 2026. Lektion 16:s exempel på modellroutning behåller en liten/stor kontrast med `gpt-4.1-mini` (liten) och `gpt-4.1` (stor). Python-notebooks väljer nu modell från miljövariabler (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) istället för hårdkodade modellnamn.

### Noteringar och kända begränsningar

- **Ej exekverade mot live Azure.** De nya lektionernas notebooks är pedagogiska exempel; kör och validera dem mot din egen Microsoft Foundry / Foundry Local-setup. Snabbstestets arbetsflöde kräver att du distribuerar lektionens agent och konfigurerar Azure OIDC-hemligheter (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) med rollen **Azure AI User** på Foundry projektomfång.
- **Lektion 17 är endast lokal.** Den har ingen Foundry Responses-endpoint, så snabbstestsåtgärden gäller inte; validera den genom att köra notebooken på din arbetsstation.

## [Utgiven] — 2026-07-06

Denna version migrerar kursen till **Azure OpenAI Responses API**, standardiserar produktnamn på **Microsoft Foundry** och **Microsoft Agent Framework (MAF)**, pensionerar GitHub Models, uppdaterar SDK-versioner, och lägger till nytt innehåll om lokala modeller och hosting av andra ramverk på Foundry.

### Lagt till

- **Migreringsfärdighet** — Installerad [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Agent Skill (från [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) under `.agents/skills/`, inklusive dess referenser och scannerskript.
- **Foundry Local (kör modeller på enheten)** — Ny sektion "Alternative Provider: Foundry Local" i [00-course-setup/README.md](./00-course-setup/README.md) som täcker installation (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, och kopplingen av `FoundryLocalManager` till Microsoft Agent Framework via `OpenAIChatClient`.
- **Hosta LangChain / LangGraph-agenter på Microsoft Foundry** — Ny sektion i [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) plus ett körbart exempel [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) som använder `langchain-azure-ai[hosting]` och `ResponsesHostServer` (protokollet `/responses`), baserat på [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Ny sektion "Real-World Example: Microsoft Project Opal" i [15-browser-use/README.md](./15-browser-use/README.md) som ramar in Opal som en företagets datoranvändaragent och kartlägger den till kurskoncept (människa-i-loopen, förtroende/säkerhet, planering, Skills).
- **Andra Python-exemplet för Lektion 02** — Lade till [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (se "Ändrat" — migrerad från den tidigare Semantic Kernel-notebooken) och länkade till den i lektions-README.
- **Sektion för modeller och leverantörer** tillagd i [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Ändrat

- **Chat Completions → Responses API (Python).** Exempel som kallade modellen direkt migrerades från Chat Completions till Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), med `OpenAI` klient mot den stabila Azure OpenAI `/openai/v1/` endpointen (ingen `api_version`). Påverkade exempel inkluderar:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — fullständig genomgång av funktionsanrop (verktygsschema omformaterat till Responses-format, verktygsresultat returnerade som `function_call_output`, `max_output_tokens` osv.).
- **GitHub Models → Azure OpenAI.** GitHub Models är föråldrade (tas ur bruk **juli 2026**) och stöder inte Responses API. Alla GitHub Models-kodvägar konverterades till Azure OpenAI / Microsoft Foundry i Python och .NET-exempel:
  - Python: Lektion 08 arbetsflödesnotebooks (`01`–`03`), Lektion 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + tillhörande `.md`-dokument, och Lektion 08 dotNET arbetsflödesnotebooks/`.md` (`01`–`03`) använder nu `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` med `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Den tidigare `02-semantic-kernel.ipynb` omskrevs för att använda Microsoft Agent Framework med Azure OpenAI (Responses API) och fick namnet `02-python-agent-framework-azure-openai.ipynb`.
- **Standardiserat på `FoundryChatClient` + `as_agent`.** README och notebook-kod som refererade `AzureAIProjectAgentProvider` standardiserades på det kanoniska mönstret som används i Lektion 01 och ramverkets egna exempel: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` med `provider.as_agent(...)`. Uppdaterat i Lektion 02–14 README-filer och notebooks (t.ex. Lektion 13 minne, alla Lektion 14 notebooks, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Produktnamn.** Omdöpt i hela den engelska texten:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Oförändrat: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", och miljövariabelnamn.)
- **Beroenden** ([requirements.txt](../../requirements.txt)):
  - Satt fast version `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Satt fast version `openai>=1.108.1` (minimum för Responses API).
  - Tog bort `azure-ai-inference` (användes bara av migrerade GitHub Models-exempel).
- **Miljökonfiguration** ([.env.example](../../.env.example)): tog bort GitHub Models-variabler (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); lade till `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` och valfri `AZURE_OPENAI_API_KEY`; uppdaterade namngivning till Microsoft Foundry.
- **Dokumentation** — Uppdaterade [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md) och [STUDY_GUIDE.md](./STUDY_GUIDE.md) för ovanstående (miljövariabler, verifieringssnutt, leverantörsvägledning, namngivning).

### Borttaget

- GitHub Models onboarding-steg och miljövariabler från installationsdokumentationen (ersatt av Azure OpenAI / Microsoft Foundry).

### Säkerhet / Integritet (allmän delningsrensning)

- Rensade Jupyter notebook-körningsutdata som läckte ett verkligt **Azure prenumerations-ID**, resursgrupps-/resursnamn, och Bing-anslutnings-ID, plus utvecklarens **lokala filsökvägar och användarnamn**, i:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Verifierade att inga API-nycklar, tokens, abonnemangs-ID eller personliga sökvägar finns kvar i det spårade engelska innehållet (referenserna till `GITHUB_TOKEN` som finns kvar är GitHub Actions-token i arbetsflöden och GitHub MCP-serverns PAT i Lektion 11 uppsättning — båda legitima och orelaterade till GitHub Models).

### Anteckningar och kända begränsningar

- **Ej körda/kompilerade.** Dessa är utbildningsexempel uppdaterade för API-/namnkorrekthet; de kördes inte mot live Azure-resurser och .NET-exemplen kompilerades inte i denna miljö. Validera mot din egen Microsoft Foundry / Azure OpenAI-distribution.
- **Modellsättning måste stödja Responses API.** Använd en distribution som `gpt-4.1-mini`, `gpt-4.1` eller en `gpt-5.x`-modell. Äldre modeller stöder grundläggande Responses-funktionalitet men inte varje funktion.
- **Agent-ramverksversion.** Exemplen riktar sig mot senaste MAF (`>=1.10.0`). Det kanoniska agent-uppstartssamtalet är `client.as_agent(...)`; API:erna validerades mot ramverkets publicerade dokumentation och en installerad build. Om du låser en annan version, bekräfta metodtillgänglighet (`as_agent` vs `create_agent`).
- **Lektion 08s arbetsflödesanteckningsbok 04** behåller medvetet `AzureAIAgentClient` (från `agent-framework-azure-ai`) eftersom den använder Microsoft Foundry Agent Service-hostade verktyg (Bing-grundning, kodtolk); den är redan Responses-baserad.
- **.NET standarddistribution.** Två dotNET arbetsflödesprov i Lektion 08 hade tidigare hårdkodade en specifik modell; de standardiseras nu till `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Om ett exempel kräver multimodalt/visionsinmatning, ställ in `AZURE_OPENAI_DEPLOYMENT` till en lämplig modell.
- **Foundry Local** exponerar en OpenAI-kompatibel **Chat Completions**-endpoint och är avsedd för lokal utveckling; använd Azure OpenAI / Microsoft Foundry för den kompletta funktionuppsättningen i Responses API.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->