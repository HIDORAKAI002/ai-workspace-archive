# Wijzigingslogboek

Alle belangrijke wijzigingen aan de **AI Agents for Beginners** cursus zijn in dit bestand gedocumenteerd.

## [Uitgebracht] — 2026-07-13

Deze release voegt twee nieuwe lessen toe die de inzet-boog voltooien — het opschalen van agents naar Microsoft Foundry en terugschalen naar een enkele werkplek — plus een rooktest-pijplijn, vernieuwde cursusnavigatie, nieuwe vaardigheden voor cursisten en bijgewerkte branding.

### Toegevoegd

- **Les 16 — Schaalbare Agents Deployen met Microsoft Foundry.** Nieuwe les [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) en uitvoerbare notebook [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) die een productie-klantenondersteuningsagent bouwt (tools, RAG, geheugen, modelroutering, responscaching, menselijke goedkeuring, een evaluatiepoort, en OpenTelemetry tracing), met ontwikkel-/deploy-/runtime-Mermaid-diagrammen, een kennischeck, een opdracht en een uitdaging.
- **Les 17 — Lokale AI Agents maken met Foundry Local en Qwen.** Nieuwe les [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) en notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) die een volledig op het apparaat werkende engineersassistent bouwt (Qwen function calling via Foundry Local, sandboxed bestands-tools, lokale RAG met Chroma, optionele lokale MCP), met diagrammen voor alleen lokaal / lokale RAG / tool-aanroepen, een kennischeck, een opdracht en een uitdaging.
- **Rooktest-pijplijn.** Nieuwe [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) workflow [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) plus per-les catalogi onder [tests/](./tests/README.md) voor de inzetbare agents in Lessen 01, 04, 05 en 16, met een index-README die elke catalogus koppelt aan de les en de gehoste agent-naam. Les 16 krijgt een sectie "Validating a Deployed Agent with Smoke Tests"; Lessen 01/04/05 krijgen een optionele rooktest-verwijzing.
- **Vaardigheden voor cursisten.** Nieuwe Agentvaardigheden onder `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (verpakkend de richtlijnen van Les 16 en 17), en [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (hoe de notebook-samples te valideren tegen een live Microsoft Foundry / Azure OpenAI setup).
- **Notebook validatierunner.** Nieuwe [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) die elke Python-notebook headless uitvoert met `nbconvert` en een PASS/FAIL-matrix afdrukt (plus `results.json`). Detecteert automatisch de repo-root en Python, sluit standaard niet-cursus notebooks uit (`.venv`, `site-packages`, `translations`, skill template assets) en `.NET` notebooks, en ondersteunt `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, en `-Python`.
- **Cursusnavigatie.** Toegevoegd Vorige/Volgende les links aan Lessen 11–15 (voorheen missend), zodat de hele cursus keten 00 → 18 in beide richtingen volgt.
- **Nieuwe miniaturen (thumbnails).** Les miniaturen voor Lessen 16 en 17, plus een vernieuwde repository sociale afbeelding [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (nu met promotie van de twee nieuwe lessen en de URL `aka.ms/ai-agents-beginners`).
- **Afhankelijkheden** ([requirements.txt](../../requirements.txt)): toegevoegd `foundry-local-sdk` en `chromadb` voor Les 17.

### Gewijzigd

- **Hoofd-[README.md](./README.md)** lestabel: Lessen 16 en 17 linken nu naar hun inhoud (voorheen "Coming Soon"); repository-afbeelding geüpdatet naar `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: Lessen 16 en 17 toegevoegd aan de gids per les en leerpaden, en een sectie "Validating Deployed Agents with Smoke Tests".
- **[AGENTS.md](./AGENTS.md)**: bijgewerkte lesaantallen/omschrijving (00–18), toegevoegd rooktest-validator-sectie en voorbeelden van naamgeving voor Les 16/17 samples.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Vorige Les" verwijst nu naar Les 17 (was Les 15), die de keten afsluit.
- **Gestandaardiseerde modelverwijzingen voor niet-verouderde modellen.** Alle `gpt-4o` / `gpt-4o-mini` verwijzingen in de cursus (docs, `.env.example`, Python/.NET notebooks en samples) vervangen door `gpt-4.1-mini` — `gpt-4o` (alle versies) wordt in 2026 uitgefaseerd. Het model-routeringsvoorbeeld van Les 16 gebruikt een contrast tussen klein/groot met `gpt-4.1-mini` (klein) en `gpt-4.1` (groot). Python-notebooks selecteren nu het model uit omgevingsvariabelen (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) in plaats van een hardcoded modelnaam.

### Opmerkingen en bekende beperkingen

- **Niet uitgevoerd tegen live Azure.** De nieuwe lessen-notebooks zijn educatieve voorbeelden; voer ze uit en valideer ze tegen je eigen Microsoft Foundry / Foundry Local setup. De rooktest-workflow vereist dat je de les-agent inzet en Azure OIDC secrets configureert (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) met de **Azure AI User** rol op Foundry projectniveau.
- **Les 17 is alleen lokaal.** Het heeft geen Foundry Responses endpoint, daarom is de rooktest-actie niet van toepassing; valideer het door de notebook op je werkplek te draaien.

## [Uitgebracht] — 2026-07-06

Deze release migreert de cursus naar de **Azure OpenAI Responses API**, standaardiseert productnamen op **Microsoft Foundry** en het **Microsoft Agent Framework (MAF)**, doet afscheid van GitHub Models, werkt SDK-versies bij en voegt nieuwe inhoud toe over lokale modellen en het hosten van andere frameworks op Foundry.

### Toegevoegd

- **Migratievaardigheid** — Geïnstalleerde [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Agent Skill (van [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) onder `.agents/skills/`, inclusief referenties en scannerscript.
- **Foundry Local (modellen op apparaat draaien)** — Nieuwe sectie "Alternative Provider: Foundry Local" in [00-course-setup/README.md](./00-course-setup/README.md) over installatie (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, en het aansluiten van `FoundryLocalManager` aan het Microsoft Agent Framework via `OpenAIChatClient`.
- **LangChain / LangGraph agents hosten op Microsoft Foundry** — Nieuwe sectie in [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) plus een uitvoerbaar voorbeeld [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) die `langchain-azure-ai[hosting]` en `ResponsesHostServer` gebruikt (het `/responses` protocol), gebaseerd op [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Nieuwe sectie "Real-World Example: Microsoft Project Opal" in [15-browser-use/README.md](./15-browser-use/README.md) die Opal positioneert als een enterprise computer-use agent en koppelt aan cursusconcepten (human-in-the-loop, vertrouwen/beveiliging, planning, Vaardigheden).
- **Tweede Les 02 Python-voorbeeld** — Toegevoegd [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (zie "Gewijzigd" — gemigreerd van het voormalige Semantic Kernel notebook) en gelinkt in de les-README.
- **Sectie Modellen en Providers toegevoegd aan [STUDY_GUIDE.md](./STUDY_GUIDE.md).**

### Gewijzigd

- **Chat Completions → Responses API (Python).** Voorbeelden die direct het model aanriepen zijn gemigreerd van Chat Completions naar de Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), met de `OpenAI` client tegen de stabiele Azure OpenAI `/openai/v1/` endpoint (geen `api_version`). Getroffen voorbeelden:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — volledige stijlgids voor function-calling (toolschema afgevlakt naar het Responses-formaat, toolresultaten geretourneerd als `function_call_output`, `max_output_tokens` enzovoorts).
- **GitHub Models → Azure OpenAI.** GitHub Models is verouderd (eindigt **juli 2026**) en ondersteunt de Responses API niet. Alle GitHub Models codepaden zijn geconverteerd naar Azure OpenAI / Microsoft Foundry in Python en .NET voorbeelden:
  - Python: Workflow notebooks van Les 08 (`01`–`03`), Les 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` plus begeleidende `.md` docs, en de Les 08 dotNET workflow notebooks/`.md` (`01`–`03`) gebruiken nu `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` met `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Het voormalige `02-semantic-kernel.ipynb` is herschreven om het Microsoft Agent Framework met Azure OpenAI (Responses API) te gebruiken en hernoemd naar `02-python-agent-framework-azure-openai.ipynb`.
- **Gestandaardiseerd op `FoundryChatClient` + `as_agent`.** README en notebook-code die verwezen naar `AzureAIProjectAgentProvider` zijn gestandaardiseerd naar het canonieke patroon gebruikt in Les 01 en de framework-eigen voorbeelden: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` met `provider.as_agent(...)`. Bijgewerkt in de READMEs en notebooks van Les 02–14 (bijvoorbeeld Les 13 geheugen, alle Les 14 notebooks, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Productnaamgeving.** Doorgevoerd in Engelstalige inhoud:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Onveranderd: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" en omgevingsvariabelenamen.)
- **Afhankelijkheden** ([requirements.txt](../../requirements.txt)):
  - Vastgezet `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Vastgezet `openai>=1.108.1` (minimaal voor de Responses API).
  - Verwijderd `azure-ai-inference` (werd alleen gebruikt door de gemigreerde GitHub Models voorbeelden).
- **Omgevingsconfiguratie** ([.env.example](../../.env.example)): verwijderd GitHub Models variabelen (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); toegevoegd `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` en optioneel `AZURE_OPENAI_API_KEY`; naamgeving bijgewerkt naar Microsoft Foundry.
- **Documentatie** — Bijgewerkt [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md) en [STUDY_GUIDE.md](./STUDY_GUIDE.md) conform bovenstaande (env variabelen setup, verificatiesnippet, provider-richtlijnen, naamgeving).

### Verwijderd

- GitHub Models onboardingsstappen en omgevingsvariabelen uit de setup-documentatie (vervangen door Azure OpenAI / Microsoft Foundry).

### Beveiliging / Privacy (schoonmaak openbare delen)

- Wissen van Jupyter notebook uitvoerresultaten die een echte **Azure abonnement-ID**, resourcegroep-/resource-namen, en Bing-verbinding-ID lekte, plus ontwikkelaars **lokale bestands-paden en gebruikersnamen**, in:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Gecontroleerd dat er geen API-sleutels, tokens, abonnement-ID's of persoonlijke paden meer aanwezig zijn in de getrackte Engelse inhoud (de `GITHUB_TOKEN` verwijzingen die nog over zijn, zijn de GitHub Actions-token in workflows en de GitHub MCP-server PAT in les 11 setup — beide legitiem en niet gerelateerd aan GitHub Models).

### Notities en bekende beperkingen

- **Niet uitgevoerd/gecompileerd.** Dit zijn educatieve voorbeelden die zijn bijgewerkt voor API-/naamgevingscorrectheid; ze zijn niet uitgevoerd tegen live Azure-resources en de .NET-voorbeelden zijn niet gecompileerd in deze omgeving. Valideer tegen je eigen Microsoft Foundry / Azure OpenAI-implementatie.
- **Model-implementatie moet de Responses API ondersteunen.** Gebruik een implementatie zoals `gpt-4.1-mini`, `gpt-4.1`, of een `gpt-5.x` model. Oudere modellen ondersteunen kernfunctionaliteit van Responses, maar niet elke functie.
- **Agent-framework versie.** De voorbeelden zijn gericht op de laatste MAF (`>=1.10.0`). De canonieke agent-creatie oproep is `client.as_agent(...)`; API's zijn gevalideerd tegen de gepubliceerde documentatie van het framework en een geïnstalleerde build. Als je een andere versie vastzet, bevestig methoden beschikbaarheid (`as_agent` vs `create_agent`).
- **Les 08 workflow-notebook 04** behoudt bewust `AzureAIAgentClient` (van `agent-framework-azure-ai`) omdat het gebruik maakt van Microsoft Foundry Agent Service gehoste tools (Bing grounding, code interpreter); het is al op Responses gebaseerd.
- **.NET standaard implementatie.** Twee Les 08 dotNET workflow voorbeelden hadden eerder een specifieke model hard-coded; ze standaardiseren nu op `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Als een voorbeeld multimodaal/visuele input gebruikt, stel `AZURE_OPENAI_DEPLOYMENT` in op een geschikt model.
- **Foundry Local** biedt een OpenAI-compatibele **Chat Completions** endpoint en is bedoeld voor lokale ontwikkeling; gebruik Azure OpenAI / Microsoft Foundry voor de volledige Responses API functionaliteit.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->