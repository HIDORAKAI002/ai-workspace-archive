# Ændringslog

Alle bemærkelsesværdige ændringer til **AI Agents for Beginners**-kurset er dokumenteret i denne fil.

## [Udgivet] — 2026-07-13

Denne udgivelse tilføjer to nye lektioner, der fuldender deploymentsforløbet — opskalering af agenter til Microsoft Foundry og nedskalering til en enkelt arbejdsstation — plus en smoke-test pipeline, opdateret kursusnavigation, nye læringsfærdigheder og opdateret branding.

### Tilføjet

- **Lektion 16 — Deploying Scalable Agents with Microsoft Foundry.** Ny lektion [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) og kørbar notebook [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) der bygger en produktionsklar kundesupport agent (værktøjer, RAG, hukommelse, modelrouting, responscaching, menneskelig godkendelse, en evalueringsport og OpenTelemetry tracing), med udviklings-/deployments-/runtime Mermaid-diagrammer, en videnscheck, en opgave og en udfordring.
- **Lektion 17 — Creating Local AI Agents with Foundry Local and Qwen.** Ny lektion [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) og notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) der bygger en fuldt on-device ingeniør-assistent (Qwen funktionsopkald via Foundry Local, sandboxede filværktøjer, lokal RAG med Chroma, valgfri lokal MCP), med local-only / lokal-RAG / tool-calling diagrammer, en videnscheck, en opgave og en udfordring.
- **Smoke-test pipeline.** Ny [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) workflow [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) samt pr. lektion kataloger under [tests/](./tests/README.md) for de deploybare agenter i Lektion 01, 04, 05 og 16, med en index README der kobler hvert katalog til dets lektion og hostet-agent navn. Lektion 16 får en sektion "Validating a Deployed Agent with Smoke Tests"; Lektion 01/04/05 får en valgfri smoke-test pointer.
- **Lærerkompetencer.** Nye Agent Skills under `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (pakker Lektion 16 og 17 vejledningen), og [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (hvordan man validerer notebook eksempler mod en live Microsoft Foundry / Azure OpenAI opsætning).
- **Notebook validations runner.** Ny [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) der eksekverer alle Python-notebooks headless med `nbconvert` og printer en PASS/FAIL matrix (plus `results.json`). Den opdager automatisk repo-roden og Python, ekskluderer ikke-kursus notebooks (`.venv`, `site-packages`, `translations`, skill template assets) og `.NET` notebooks som default, og understøtter `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` og `-Python`.
- **Kursusnavigation.** Tilføjede Previous/Next lektion links til Lektion 11–15 (tidligere manglende), så hele kurset kæder 00 → 18 i begge retninger.
- **Nye thumbnails.** Lektion thumbnails til Lektion 16 og 17, plus et opfrisket repository socialt billede [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (nu med reklame for de to nye lektioner og `aka.ms/ai-agents-beginners` URL'en).
- **Afhængigheder** ([requirements.txt](../../requirements.txt)): tilføjet `foundry-local-sdk` og `chromadb` til Lektion 17.

### Ændret

- **Hoved [README.md](./README.md)** lektionsoversigt: Lektion 16 og 17 linker nu til deres indhold (tidligere "Kommer snart"); repository billedet opdateret til `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: tilføjet Lektion 16 og 17 til lektion-for-lektion vejledning og læringsstier, og en sektion "Validating Deployed Agents with Smoke Tests".
- **[AGENTS.md](./AGENTS.md)**: opdateret lektionstælling/beskrivelse (00–18), tilføjet en sektion om smoke-test validering, og tilføjet eksempler på navngivning for Lektion 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Forrige lektion" peger nu på Lektion 17 (var Lektion 15), og lukker kæden.
- **Standardisering af modelreferencer på ikke-udgåede modeller.** Udskiftede alle `gpt-4o` / `gpt-4o-mini` referencer i hele kurset (docs, `.env.example`, Python/.NET notebooks og eksempler) med `gpt-4.1-mini` — `gpt-4o` (alle versioner) trækkes tilbage i 2026. Lektion 16’s model-routing eksempel holder en lille/stor kontrast med `gpt-4.1-mini` (lille) og `gpt-4.1` (stor). Python notebooks vælger nu modellen fra miljøvariabler (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) i stedet for hardcoded modelnavn.

### Noter og kendte begrænsninger

- **Kører ikke mod live Azure.** De nye lektions notebooks er uddannelseseksempler; kør og valider dem mod din egen Microsoft Foundry / Foundry Local opsætning. Smoke-test workflow kræver, at du deployer lektionens agent og konfigurerer Azure OIDC secrets (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) med **Azure AI User**-rollen på Foundry projekt-niveau.
- **Lektion 17 er kun lokal.** Den har ikke Foundry Responses endpoint, så smoke-test handlingen gælder ikke; valider den ved at køre notebooken på din arbejdsstation.

## [Udgivet] — 2026-07-06

Denne udgivelse migrerer kurset til **Azure OpenAI Responses API**, standardiserer produktnavne på **Microsoft Foundry** og **Microsoft Agent Framework (MAF)**, udfaser GitHub Models, opdaterer SDK versioner, og tilføjer nyt indhold om lokale modeller og hosting af andre frameworks på Foundry.

### Tilføjet

- **Migreringsskill** — Installerede [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Agent Skill (fra [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) under `.agents/skills/`, inklusive referencer og scanner script.
- **Foundry Local (kør modeller on-device)** — Ny sektion "Alternative Provider: Foundry Local" i [00-course-setup/README.md](./00-course-setup/README.md) der dækker install (`winget` / `brew`), `foundry model run`, `foundry-local-sdk` og sammenkobling af `FoundryLocalManager` til Microsoft Agent Framework via `OpenAIChatClient`.
- **Hosting LangChain / LangGraph agenter på Microsoft Foundry** — Ny sektion i [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) plus kørbar prøve [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) med `langchain-azure-ai[hosting]` og `ResponsesHostServer` (protokollen `/responses`), baseret på [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Ny sektion "Real-World Example: Microsoft Project Opal" i [15-browser-use/README.md](./15-browser-use/README.md), der rammestiller Opal som en enterprise computer-brugs-agent og kobler den til kursusbegreber (human-in-the-loop, tillid/sikkerhed, planlægning, Skills).
- **Andet Python eksempel til Lektion 02** — Tilføjet [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (se "Ændret" — migreret fra den tidligere Semantic Kernel notebook) og linket i lektions README.
- **Models and Providers** sektion tilføjet til [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Ændret

- **Chat Completions → Responses API (Python).** Eksempler, der kaldte modellen direkte, er migreret fra Chat Completions til Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), brugende `OpenAI` klienten mod stabile Azure OpenAI `/openai/v1/` endpoint (uden `api_version`). Berørte eksempler inkluderer:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — komplet gennemgang af funktionkald (værktøjsskema omdannet til Responses format, værktøjsresultater returneret som `function_call_output`, `max_output_tokens`, etc.).
- **GitHub Models → Azure OpenAI.** GitHub Models er udfaset (trækkes tilbage **juli 2026**) og understøtter ikke Responses API. Alle GitHub Models kodeveje blev konverteret til Azure OpenAI / Microsoft Foundry på tværs af Python og .NET eksempler:
  - Python: Lektion 08 workflow notebooks (`01`–`03`), Lektion 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + ledsagende `.md` docs, og Lektion 08 dotNET workflow notebooks/`.md` (`01`–`03`) bruger nu `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` med `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Den tidligere `02-semantic-kernel.ipynb` blev omskrevet til at bruge Microsoft Agent Framework med Azure OpenAI (Responses API) og omdøbt til `02-python-agent-framework-azure-openai.ipynb`.
- **Standardiseret på `FoundryChatClient` + `as_agent`.** README og notebook kode, der refererede til `AzureAIProjectAgentProvider`, blev standardiseret til det kanoniske mønster brugt i Lektion 01 og frameworkets egne eksempler: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` med `provider.as_agent(...)`. Opdateret i Lektion 02–14 READMEs og notebooks (fx Lektion 13 hukommelse, alle Lektion 14 notebooks, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Produktnavngivning.** Omdøbt gennem hele det engelske indhold:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Uændret: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" og miljøvariabelnavne.)
- **Afhængigheder** ([requirements.txt](../../requirements.txt)):
  - Pinned `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Pinned `openai>=1.108.1` (minimum for Responses API).
  - Fjernet `azure-ai-inference` (blev kun brugt af migrerede GitHub Models eksempler).
- **Miljøkonfiguration** ([.env.example](../../.env.example)): fjernet GitHub Models variabler (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); tilføjet `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` og valgfrie `AZURE_OPENAI_API_KEY`; opdateret navngivning til Microsoft Foundry.
- **Dokumentation** — Opdateret [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md) og [STUDY_GUIDE.md](./STUDY_GUIDE.md) for ovenstående (opsætning af miljøvariabler, verifikationssnippet, provider vejledning, navngivning).

### Fjernet

- GitHub Models onboarding trin og miljøvariabler fra setup-dokumentationen (erstattet af Azure OpenAI / Microsoft Foundry).

### Sikkerhed / Privatliv (public-sharing oprydning)

- Rensede Jupyter notebook eksekveringsoutput, som lækkede en rigtig **Azure abonnement ID**, resource-group / ressourcenavne og Bing connection ID, samt udvikleres **lokale filstier og brugernavne** i:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Bekræftet, at der ikke er nogen API-nøgler, tokens, abonnement-ID'er eller personlige stier i det sporede engelske indhold (de `GITHUB_TOKEN` referencer, der er tilbage, er GitHub Actions-token i workflows og GitHub MCP server PAT i Lektion 11 opsætningen – begge legitime og ikke relateret til GitHub Models).

### Noter og kendte begrænsninger

- **Ikke udført/kompileret.** Dette er uddannelseseksempler opdateret for API-/navnekorrekte; de blev ikke kørt mod live Azure-ressourcer, og .NET eksemplerne blev ikke kompileret i dette miljø. Valider mod din egen Microsoft Foundry / Azure OpenAI-implementering.
- **Model-udrulning skal understøtte Responses API.** Brug en udrulning såsom `gpt-4.1-mini`, `gpt-4.1` eller en `gpt-5.x` model. Ældre modeller understøtter kernefunktioner i Responses, men ikke alle funktioner.
- **Agent-framework version.** Eksemplerne er målrettet den nyeste MAF (`>=1.10.0`). Det kanoniske agent-oprettelsesopkald er `client.as_agent(...)`; API'er blev valideret mod frameworkets offentliggjorte dokumentation og en installeret build. Hvis du fastlåser en anden version, bekræft metode tilgængelighed (`as_agent` vs `create_agent`).
- **Lektion 08 workflow notebook 04** beholder med vilje `AzureAIAgentClient` (fra `agent-framework-azure-ai`), fordi den bruger Microsoft Foundry Agent Service-hostede værktøjer (Bing grounding, kodefortolker); det er allerede Responses-baseret.
- **.NET standardudrulning.** To Lektion 08 dotNET workflow-eksempler havde tidligere en hardcoded specifik model; de bruger nu som standard `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Hvis et eksempel er afhængigt af multimodal/vision input, sæt `AZURE_OPENAI_DEPLOYMENT` til en passende model.
- **Foundry Local** eksponerer en OpenAI-kompatibel **Chat Completions** endpoint og er beregnet til lokal udvikling; brug Azure OpenAI / Microsoft Foundry for det fulde Responses API funktionssæt.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->