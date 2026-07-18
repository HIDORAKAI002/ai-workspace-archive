# Endringslogg

Alle viktige endringer i **AI-agenter for nybegynnere**-kurset er dokumentert i denne filen.

## [Utgitt] — 2026-07-13

Denne utgivelsen legger til to nye leksjoner som fullfører distribusjonsbuen — skalering av agenter opp til Microsoft Foundry og ned til en enkelt arbeidsstasjon — pluss en røyktest-pipeline, oppdatert kursnavigasjon, nye ferdigheter for lærende og oppdatert profilering.

### Lagt til

- **Leksjon 16 — Distribuere skalerbare agenter med Microsoft Foundry.** Ny leksjon [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) og kjørbar notatbok [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) som bygger en produksjons-kundesupportagent (verktøy, RAG, minne, modellruting, respons-caching, menneskelig godkjenning, en evalueringsport, og OpenTelemetry-sporing), med utviklings-/distribusjons-/kjørediagrammer i Mermaid, en kunnskapstest, en oppgave, og en utfordring.
- **Leksjon 17 — Lage lokale AI-agenter med Foundry Local og Qwen.** Ny leksjon [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) og notatbok [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) som bygger en fullstendig lokal ingeniørassistent (Qwen-funksjonskall via Foundry Local, sandkassefilverktøy, lokal RAG med Chroma, valgfri lokal MCP), med diagrammer for kun lokal / lokal-RAG / verktøykall, en kunnskapstest, en oppgave, og en utfordring.
- **Røyktest-pipeline.** Ny [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) arbeidsflyt [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) pluss kataloger per leksjon under [tests/](./tests/README.md) for distribuerbare agenter i Leksjoner 01, 04, 05, og 16, med et indeks-README som kobler hver katalog til sin leksjon og vertsagentnavn. Leksjon 16 får en seksjon "Validere en distribuert agent med røyktester"; Leksjoner 01/04/05 får et valg om røyktest-peker.
- **Lærlingferdigheter.** Nye agentferdigheter under `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (pakker inn Leksjon 16 og 17s veiledning), og [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (hvordan validere notatbokeksemplene mot et levende Microsoft Foundry / Azure OpenAI-oppsett).
- **Notatbok-valideringskjører.** Ny [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) som kjører hver Python-notatbok hodestløst med `nbconvert` og skriver ut en GODKJENT/FEILET-matrise (pluss `results.json`). Den oppdager automatisk repo-roten og Python, ekskluderer ikke-kursnotatbøker (`.venv`, `site-packages`, `translations`, malressurser for ferdigheter) og `.NET`-notatbøker som standard, og støtter `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, og `-Python`.
- **Kursnavigasjon.** La til lenker til forrige/neste leksjon for Leksjon 11–15 (tidligere manglende) slik at hele kurset lenkes sammen 00 → 18 i begge retninger.
- **Nye miniatyrbilder.** Leksjonsminiatyrbilder for Leksjon 16 og 17, pluss et oppfrisket sosialt repobilde [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (nå med annonsering av de to nye leksjonene og URL-en `aka.ms/ai-agents-beginners`).
- **Avhengigheter** ([requirements.txt](../../requirements.txt)): lagt til `foundry-local-sdk` og `chromadb` for Leksjon 17.

### Endret

- **Hoved-[README.md](./README.md)** leksjonstabell: Leksjon 16 og 17 lenker nå til innholdet sitt (tidligere "Kommer snart"); repobildet oppdatert til `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: lagt til Leksjon 16 og 17 i steg-for-steg-veiledningen og læringsløp, og en seksjon "Validere distribuerte agenter med røyktester".
- **[AGENTS.md](./AGENTS.md)**: oppdatert antall/beskrivelse for leksjoner (00–18), lagt til en seksjon for røyktestvalidering, og lagt til eksempler på navngivning for Leksjon 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Forrige leksjon" peker nå til Leksjon 17 (var Leksjon 15), som fullfører lenkekjeden.
- **Standardisert modellreferanser på ikke-utgåtte modeller.** Erstatter alle `gpt-4o` / `gpt-4o-mini`-referanser i hele kurset (dokumentasjon, `.env.example`, Python/.NET-notatbøker og eksempler) med `gpt-4.1-mini` — `gpt-4o` (alle versjoner) fases ut i 2026. Leksjon 16 sitt eksempel på modellruting beholder et lite/stort kontrast ved å bruke `gpt-4.1-mini` (lite) og `gpt-4.1` (stort). Python-notatbøker henter nå modellnavn fra miljøvariabler (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) i stedet for hardkodet modellnavn.

### Notater og kjente begrensninger

- **Ikke kjørt mot live Azure.** De nye leksjonenes notatbøker er utdannings-eksempler; kjør og valider dem mot ditt eget Microsoft Foundry / Foundry Local-oppsett. Røyktest-arbeidsflyten krever at du distribuerer leksjonens agent og konfigurerer Azure OIDC-hemmeligheter (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) med rollen **Azure AI User** på Foundry-prosjektomfang.
- **Leksjon 17 er kun lokal.** Den har ikke Foundry Responses-endepunkt, så røyktest-handlingen gjelder ikke; valider den ved å kjøre notatboken på din arbeidsstasjon.

## [Utgitt] — 2026-07-06

Denne utgivelsen migrerer kurset til **Azure OpenAI Responses API**, standardiserer produktnavn på **Microsoft Foundry** og **Microsoft Agent Framework (MAF)**, avvikler GitHub Models, oppdaterer SDK-versjoner, og legger til nytt innhold om lokale modeller og hosting av andre rammeverk på Foundry.

### Lagt til

- **Migreringsferdighet** — Installert [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Agentferdighet (fra [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) under `.agents/skills/`, inkludert referanser og skanningsskript.
- **Foundry Local (kjør modeller på enhet)** — Ny "Alternativ leverandør: Foundry Local" seksjon i [00-course-setup/README.md](./00-course-setup/README.md) som dekker installasjon (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, og kobling av `FoundryLocalManager` til Microsoft Agent Framework via `OpenAIChatClient`.
- **Hoste LangChain / LangGraph-agenter på Microsoft Foundry** — Ny seksjon i [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) pluss kjørbart eksempel [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) som bruker `langchain-azure-ai[hosting]` og `ResponsesHostServer` (protokollen `/responses`), basert på [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Ny "Virkelighetseksempel: Microsoft Project Opal" seksjon i [15-browser-use/README.md](./15-browser-use/README.md) som rammer inn Opal som en bedriftsdatabrukeragent og knytter den til kursets konsepter (menneske-i-slynge, tillit/sikkerhet, planlegging, ferdigheter).
- **Andre Leksjon 02 Python-eksempel** — Lagt til [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (se "Endret" — migrert fra den tidligere Semantic Kernel-notatboken) og lenket det i leksjons-README.
- **Modeller og leverandører** seksjon lagt til i [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Endret

- **Chat Completions → Responses API (Python).** Eksempler som kalte modellen direkte ble migrert fra Chat Completions til Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), med `OpenAI`-klienten mot den stabile Azure OpenAI `/openai/v1/`-endepunktet (ingen `api_version`). Påvirkede eksempler inkluderer:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — full gjennomgang av funksjonskall (verktøyskjemade flattenet til Responses-formatet, verktøyresultater returnert som `function_call_output`, `max_output_tokens`, osv.).
- **GitHub Models → Azure OpenAI.** GitHub Models er avviklet (tas ut **juli 2026**) og støtter ikke Responses API. Alle GitHub Models-kodeveier ble konvertert til Azure OpenAI / Microsoft Foundry på tvers av Python- og .NET-eksempler:
  - Python: Leksjon 08 arbeidsflytnotatbøker (`01`–`03`), Leksjon 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + tilhørende `.md`-dokumenter, og Leksjon 08 dotNET arbeidsflytnotatbøker/`.md` (`01`–`03`) bruker nå `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` med `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Den tidligere `02-semantic-kernel.ipynb` ble omskrevet til å bruke Microsoft Agent Framework med Azure OpenAI (Responses API) og omdøpt til `02-python-agent-framework-azure-openai.ipynb`.
- **Standardisert på `FoundryChatClient` + `as_agent`.** README og notatbokkode som refererte til `AzureAIProjectAgentProvider` ble standardisert til det kanoniske mønsteret brukt av Leksjon 01 og rammeverkets egne eksempler: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` med `provider.as_agent(...)`. Oppdatert i Leksjon 02–14 READMEs og notatbøker (f.eks. minnet i Leksjon 13, alle Leksjon 14-notatbøker, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Produktnavn.** Omdøpt gjennom hele engelsk innhold:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Uendret: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", og miljøvariabelnavn.)
- **Avhengigheter** ([requirements.txt](../../requirements.txt)):
  - Pinned `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Pinned `openai>=1.108.1` (minimum for Responses API).
  - Fjernet `azure-ai-inference` (var kun brukt av migrerte GitHub Models-eksempler).
- **Miljøkonfigurasjon** ([.env.example](../../.env.example)): fjernet GitHub Models variabler (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); lagt til `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, og valgfri `AZURE_OPENAI_API_KEY`; oppdatert navn til Microsoft Foundry.
- **Dokumentasjon** — Oppdatert [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), og [STUDY_GUIDE.md](./STUDY_GUIDE.md) for det ovenstående (miljøvariabler, verifiseringssnutt, leverandørveiledning, navngivning).

### Fjernet

- GitHub Models onboarding-trinn og miljøvariabler fra oppsettdokumentasjonen (erstattet av Azure OpenAI / Microsoft Foundry).

### Sikkerhet / Personvern (offentlig delingsopprydding)

- Fjernet utførselsutdata fra Jupyter-notatbøker som lekket en ekte **Azure-abonnements-ID**, ressursgruppe-/ressursnavn, og Bing-tilkoblings-ID, pluss utviklerens **lokale filstier og brukernavn**, i:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Verifisert at ingen API-nøkler, tokens, abonnement-IDer eller personlige stier finnes i det sporede engelske innholdet (referansene til `GITHUB_TOKEN` som finnes er GitHub Actions-tokenet i arbeidsflyter og GitHub MCP-serverens PAT i oppsett av Lekse 11 — begge legitime og ikke relatert til GitHub Models).

### Notater og kjente begrensninger

- **Ikke utført/kompilert.** Dette er undervisningseksempler oppdatert for korrekt API/navngivning; de ble ikke kjørt mot levende Azure-ressurser, og .NET-eksemplene ble ikke kompilert i dette miljøet. Validér mot din egen Microsoft Foundry / Azure OpenAI-distribusjon.
- **Modell-distribusjon må støtte Responses API.** Bruk en distribusjon som `gpt-4.1-mini`, `gpt-4.1` eller en `gpt-5.x` modell. Eldre modeller støtter kjernefunksjonaliteten i Responses, men ikke alle funksjoner.
- **Agent-rammeverksversjon.** Eksemplene målretter den nyeste MAF (`>=1.10.0`). Den kanoniske agentopprettingskallet er `client.as_agent(...)`; API-er ble validert mot rammeverkets publiserte dokumentasjon og en installert build. Hvis du fester en annen versjon, bekreft metode-tilgjengelighet (`as_agent` vs `create_agent`).
- **Leksjon 08 arbeidsflytnotatbok 04** beholder bevisst `AzureAIAgentClient` (fra `agent-framework-azure-ai`) fordi den bruker Microsoft Foundry Agent Service hostede verktøy (Bing grounding, kodeinterpreter); den er allerede basert på Responses.
- **Standard .NET-distribusjon.** To dotNET-eksempler fra Leksjon 08 brukte tidligere en hardkodet spesifikk modell; de bruker nå som standard `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Hvis et eksempel er avhengig av multimodal/visjon-inndata, sett `AZURE_OPENAI_DEPLOYMENT` til en egnet modell.
- **Foundry Local** eksponerer et OpenAI-kompatibelt **Chat Completions** endepunkt og er ment for lokal utvikling; bruk Azure OpenAI / Microsoft Foundry for full Responses API-funksjonalitet.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->