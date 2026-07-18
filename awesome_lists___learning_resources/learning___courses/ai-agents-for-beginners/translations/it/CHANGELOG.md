# Registro delle modifiche

Tutte le modifiche rilevanti al corso **AI Agents for Beginners** sono documentate in questo file.

## [Rilasciato] — 2026-07-13

Questa versione aggiunge due nuove lezioni che completano l’arco di implementazione — scalando gli agenti fino a Microsoft Foundry e riducendoli a una singola postazione di lavoro — più una pipeline di smoke-test, una navigazione del corso rinnovata, nuove competenze per gli studenti e un’aggiornata brand identity.

### Aggiunto

- **Lezione 16 — Distribuzione di agenti scalabili con Microsoft Foundry.** Nuova lezione [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) e notebook eseguibile [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) che costruisce un agente di supporto clienti produttivo (strumenti, RAG, memoria, instradamento modelli, caching risposte, approvazione umana, gate di valutazione e tracciamento OpenTelemetry), con diagrammi Mermaid per sviluppo/distribuzione/runtime, verifica delle conoscenze, compito e sfida.
- **Lezione 17 — Creazione di agenti AI locali con Foundry Local e Qwen.** Nuova lezione [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) e notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) che costruisce un assistente ingegneristico completamente sul dispositivo (chiamata funzione Qwen tramite Foundry Local, strumenti file sandboxati, RAG locale con Chroma, MCP locale opzionale), con diagrammi solo locale / RAG locale / chiamata strumenti, verifica delle conoscenze, compito e sfida.
- **Pipeline smoke-test.** Nuovo workflow [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) più cataloghi per le lezioni sotto [tests/](./tests/README.md) per gli agenti distribuibili nelle Lezioni 01, 04, 05 e 16, con README indice che mappa ogni catalogo alla sua lezione e nome agente ospitato. La Lezione 16 guadagna una sezione "Convalida di un agente distribuito con Smoke Tests"; Lezioni 01/04/05 ottengono un puntatore smoke-test opzionale.
- **Competenze per gli studenti.** Nuove Competenze Agente sotto `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (confezionamento delle guide Lezione 16 e 17), e [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (come convalidare i campioni notebook contro un’installazione live Microsoft Foundry / Azure OpenAI).
- **Esecutore di validazione notebook.** Nuovo [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) che esegue ogni notebook Python in modalità headless con `nbconvert` e stampa una matrice PASS/FAIL (più `results.json`). Rileva automaticamente la radice del repo e Python, esclude per default notebook non del corso (`.venv`, `site-packages`, `translations`, asset template skills) e notebook `.NET`, e supporta `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` e `-Python`.
- **Navigazione corso.** Aggiunti link Lezione Precedente/Successiva alle Lezioni 11–15 (prima mancanti) così che tutto il corso si concatenasse 00 → 18 in entrambe le direzioni.
- **Nuove miniature.** Miniature delle lezioni per Lezioni 16 e 17, più un’immagine sociale rinnovata del repository [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (ora pubblicizza le due nuove lezioni e l’URL `aka.ms/ai-agents-beginners`).
- **Dipendenze** ([requirements.txt](../../requirements.txt)): aggiunti `foundry-local-sdk` e `chromadb` per la Lezione 17.

### Modificato

- **Tabella lezioni principale [README.md](./README.md)**: Lezioni 16 e 17 ora linkano al loro contenuto (prima "Coming Soon"); immagine repository aggiornata in `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: aggiunte Lezioni 16 e 17 alla guida lezione per lezione e ai percorsi di apprendimento, più una sezione "Convalida degli agenti distribuiti con Smoke Tests".
- **[AGENTS.md](./AGENTS.md)**: aggiornato conteggio/descrizione lezioni (00–18), aggiunta sezione validazione smoke-test, più esempi di nomenclatura campioni Lezione 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Lezione precedente" ora punta alla Lezione 17 (prima Lezione 15), chiudendo la catena.
- **Riferimenti modello standardizzati su modelli non deprecati.** Sostituiti tutti i riferimenti `gpt-4o` / `gpt-4o-mini` in tutto il corso (documenti, `.env.example`, notebook e campioni Python/.NET) con `gpt-4.1-mini` — `gpt-4o` (tutte le versioni) sarà ritirato nel 2026. L’esempio di instradamento modello della Lezione 16 mantiene un contrasto piccolo/grande usando `gpt-4.1-mini` (piccolo) e `gpt-4.1` (grande). I notebook Python ora selezionano il modello dalle variabili d’ambiente (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) invece che codificare un nome modello statico.

### Note e limitazioni conosciute

- **Non eseguito contro Azure live.** I nuovi notebook delle lezioni sono esempi didattici; eseguili e convalidali con la tua configurazione Microsoft Foundry / Foundry Local. Il workflow smoke-test richiede di distribuire l’agente della lezione e configurare i segreti Azure OIDC (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) con ruolo **Azure AI User** a livello progetto Foundry.
- **Lezione 17 è solo locale.** Non ha endpoint Foundry Responses, quindi l’azione smoke-test non si applica; convalidala eseguendo il notebook sulla tua postazione di lavoro.

## [Rilasciato] — 2026-07-06

Questa versione migra il corso all’**Azure OpenAI Responses API**, standardizza i nomi prodotto su **Microsoft Foundry** e **Microsoft Agent Framework (MAF)**, dismette GitHub Models, aggiorna le versioni SDK e aggiunge nuovi contenuti su modelli locali e hosting di altri framework su Foundry.

### Aggiunto

- **Skill di migrazione** — Installato lo Skill Agente [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (da [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) sotto `.agents/skills/`, inclusi riferimenti e script scanner.
- **Foundry Local (esecuzione modelli sul dispositivo)** — Nuova sezione "Provider alternativo: Foundry Local" in [00-course-setup/README.md](./00-course-setup/README.md) che copre installazione (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, e collegamento di `FoundryLocalManager` al Microsoft Agent Framework tramite `OpenAIChatClient`.
- **Hosting agenti LangChain / LangGraph su Microsoft Foundry** — Nuova sezione in [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) più campione eseguibile [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) che usa `langchain-azure-ai[hosting]` e `ResponsesHostServer` (protocollo `/responses`), basato su [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Nuova sezione "Esempio reale: Microsoft Project Opal" in [15-browser-use/README.md](./15-browser-use/README.md) che inquadra Opal come agente per l’uso del computer in azienda e lo mappa ai concetti del corso (human-in-the-loop, fiducia/sicurezza, pianificazione, Skills).
- **Secondo campione Python Lezione 02** — Aggiunto [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (vedi "Modificato" — migrato dal precedente notebook Semantic Kernel) e linkato nel README della lezione.
- **Sezione Modelli e Provider** aggiunta a [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Modificato

- **Chat Completions → Responses API (Python).** I campioni che chiamavano direttamente il modello sono stati migrati da Chat Completions alla Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), usando il client `OpenAI` verso l’endpoint stabile Azure OpenAI `/openai/v1/` (senza `api_version`). Campioni interessati includono:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — la completa guida alla funzione di chiamata (schema strumenti adattato al formato Responses, risultati strumenti restituiti come `function_call_output`, `max_output_tokens`, ecc.).
- **GitHub Models → Azure OpenAI.** GitHub Models è deprecato (ritiro **luglio 2026**) e non supporta la Responses API. Tutte le rotte del codice GitHub Models sono state convertite ad Azure OpenAI / Microsoft Foundry in Python e .NET:
  - Python: notebook workflow Lezione 08 (`01`–`03`), Lezione 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + documenti `.md` di accompagnamento, e notebook workflow Lezione 08 dotNET / `.md` (`01`–`03`) ora usano `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` con `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Il precedente `02-semantic-kernel.ipynb` è stato riscritto per usare Microsoft Agent Framework con Azure OpenAI (Responses API) e rinominato in `02-python-agent-framework-azure-openai.ipynb`.
- **Standardizzato su `FoundryChatClient` + `as_agent`.** README e codice notebook che facevano riferimento a `AzureAIProjectAgentProvider` sono stati uniformati al pattern canonico usato dalla Lezione 01 e dai campioni del framework: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` con `provider.as_agent(...)`. Aggiornato in tutte le README e notebook delle Lezioni 02–14 (es. memoria Lezione 13, tutti i notebook Lezione 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Nomi prodotti.** Rinominati in tutto il contenuto inglese:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Invariati: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", e nomi di variabili d’ambiente.)
- **Dipendenze** ([requirements.txt](../../requirements.txt)):
  - Vincolati `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Vincolato `openai>=1.108.1` (minimo per Responses API).
  - Rimosso `azure-ai-inference` (usato solo nei campioni GitHub Models migrati).
- **Configurazione ambiente** ([.env.example](../../.env.example)): rimosse variabili GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); aggiunte `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, e opzionale `AZURE_OPENAI_API_KEY`; aggiornati nomi a Microsoft Foundry.
- **Documentazione** — Aggiornati [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md) e [STUDY_GUIDE.md](./STUDY_GUIDE.md) per quanto sopra (configurazione variabili ambiente, snippet di verifica, guida ai provider, nomenclatura).

### Rimosso

- Passaggi di onboarding GitHub Models e variabili ambiente dalla documentazione setup (sostituiti da Azure OpenAI / Microsoft Foundry).

### Sicurezza / Privacy (pulizia condivisione pubblica)

- Cancellate uscite di esecuzione notebook Jupyter che trapelavano un reale **ID sottoscrizione Azure**, nomi gruppi di risorse/risorse, e ID connessione Bing, più **percorsi file locali e nomi utenti** degli sviluppatori, in:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Verificato che non rimangano chiavi API, token, ID di sottoscrizione o percorsi personali nel contenuto inglese tracciato (i riferimenti `GITHUB_TOKEN` rimasti sono il token GitHub Actions nei workflow e il PAT del server GitHub MCP nella configurazione della Lezione 11 — entrambi legittimi e non correlati a GitHub Models).

### Note e limitazioni conosciute

- **Non eseguito/compilato.** Questi sono esempi didattici aggiornati per correttezza di API/nomenclatura; non sono stati eseguiti contro risorse Azure live, e gli esempi .NET non sono stati compilati in questo ambiente. Verifica con la tua deployment Microsoft Foundry / Azure OpenAI.
- **Il deployment del modello deve supportare l'API Responses.** Usa un deployment come `gpt-4.1-mini`, `gpt-4.1` o un modello `gpt-5.x`. I modelli più vecchi supportano la funzionalità core di Responses ma non tutte le caratteristiche.
- **Versione agent-framework.** Gli esempi sono destinati all'ultimo MAF (`>=1.10.0`). La chiamata canonica per la creazione di agent è `client.as_agent(...)`; le API sono state verificate rispetto alla documentazione pubblicata del framework e a una build installata. Se usi una versione differente, conferma la disponibilità del metodo (`as_agent` vs `create_agent`).
- **Il notebook del workflow della Lezione 08 numero 04** mantiene intenzionalmente `AzureAIAgentClient` (da `agent-framework-azure-ai`) perché utilizza strumenti ospitati del Microsoft Foundry Agent Service (Bing grounding, interprete di codice); è già basato su Responses.
- **Deployment .NET di default.** Due esempi di workflow dotNET della Lezione 08 precedentemente hardcoded su un modello specifico ora usano di default `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Se un esempio si basa su input multimodale/visivo, imposta `AZURE_OPENAI_DEPLOYMENT` su un modello adatto.
- **Foundry Local** espone un endpoint **Chat Completions** compatibile con OpenAI ed è pensato per sviluppo locale; usa Azure OpenAI / Microsoft Foundry per l'intero set di funzionalità dell'API Responses.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->