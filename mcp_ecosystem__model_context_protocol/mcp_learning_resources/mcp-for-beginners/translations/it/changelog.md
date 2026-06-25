# Changelog: Curriculum MCP per Principianti

Questo documento serve come registro di tutte le modifiche significative apportate al curriculum Model Context Protocol (MCP) per principianti. Le modifiche sono documentate in ordine cronologico inverso (prime le modifiche più recenti).

## 24 giugno 2026

### Nuova Lezione: Uso di MCP nell'app Copilot

- [Sezione Strumenti](./12-tooling/README.md) Aggiunta sezione strumenti.
- [MCP nell'app Copilot](./12-tooling/01-copilot-app/README.md)

## 16 giugno 2026

### Allineamento Specifica MCP & Validazione Esempi

Validato il curriculum rispetto alla **Specificazione MCP 2025-11-25** corrente e agli SDK ufficiali più recenti, quindi corretto i riferimenti obsoleti alle specifiche e confermato che i campioni principali si compilano e funzionano ancora.

#### Correzioni Versione Specifica (2025-06-18 / 2025-03-26 → 2025-11-25)

Aggiornati i contenuti in inglese dove affermavano ancora che una revisione precedente della specifica fosse lo standard *corrente/ultimo*, e ripuntati i link ai percorsi canonici della specifica `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Aggiornati il banner "Current Standard", l'introduzione, l'intestazione dei principi fondamentali di sicurezza, l'intestazione dei requisiti obbligatori, la sezione Microsoft Entra ID, i link a Riferimenti & Risorse, e la nota di chiusura sulla sicurezza (8 riferimenti) al 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aggiornato il link alle Risorse Aggiuntive della specifica e il banner "Current Standard" al 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Sostituito il link obsoleto `2025-03-26` sulla sicurezza e fiducia con la pagina aggiornata delle migliori pratiche di sicurezza 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Aggiornato il link ufficiale ai documenti sul campionamento al 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aggiornata la referenza attuale della "specifica MCP corrente" e il link alle Risorse Aggiuntive della specifica al 2025-11-25 (note storiche sulla deprecazione SSE lasciate intatte per accuratezza)

#### Validazione Campioni Rispetto agli SDK Correnti

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ha risolto `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passato senza errori di tipo — le API esistenti `McpServer`/`StdioServerTransport` rimangono valide
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validato in `.venv` isolato con `mcp[cli]` (1.27.2); `py_compile` passato e `FastMCP.list_tools()` ha restituito correttamente gli strumenti `add` e `subtract`
- Confermato che tutte le gamme delle versioni `@modelcontextprotocol/sdk` dei campioni (`>=1.26.0` / `^1.26.0` / `^1.27.0`) risolvono senza problemi alla versione corrente `1.29.0` senza cambiamenti di API incompatibili

#### Allineamento Pin di Dipendenza (chiusura gap versione)

Aggiornati i pin SDK obsoleti così che ogni campione segua la release MCP corrente, in linea con la convenzione del repository:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Aggiornato `@modelcontextprotocol/sdk` da `^1.8.0` → `>=1.26.0` e aggiornato la descrizione del pacchetto obsoleta `"aggiornato per MCP 2025-06-18"` a `"allineato con Specifica MCP 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: Aggiornato il pin esatto `mcp==1.23.0` → `mcp>=1.26.0`; rigenerati entrambi i file `uv.lock` (`uv lock`) così che i lockfile risolvano al MCP corrente `1.27.2` e restino sincronizzati con i manifesti

#### Analisi Gap del Curriculum — Copertura Funzionalità Ultima Specifica

Verificato che il curriculum copra già tutte le primitive introdotte/espanse nel MCP 2025-11-25, quindi non rimangono lacune di contenuto:
- **Campionamento**: Lezione 03-GettingStarted/14-sampling più 05-AdvancedTopics/mcp-sampling
- **Elicitazione (incluso modalità URL)**: Documentata in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Radici**: Documentato in 00-Introduction, 01-CoreConcepts, e 05-AdvancedTopics/mcp-root-contexts
- **Task (sperimentali, operazioni a lunga durata)**: Documentate in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Annotazioni Strumenti** (`readOnlyHint` / `destructiveHint`): Documentate in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Rafforzamento Sicurezza & Correzione Vulnerabilità Dipendenze

Eseguita una revisione completa della sicurezza di ogni manifesto di dipendenza e codice sorgente dei campioni, quindi risolto ogni avviso npm segnalato più una vulnerabilità nel codice. Dopo la correzione, `npm audit` segnala **0 vulnerabilità** in ogni directory analizzata.

#### Vulnerabilità Dipendenze npm (transitive) — Risolte

Analizzati tutti i 15 file `package-lock.json` inviati. Le vulnerabilità erano limitate a dipendenze transitive usate dallo strumento di sviluppo MCP Inspector, dal client OpenAI e dall’SDK MCP; tutte ora risolte senza rompere i campioni:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: Aggiornato `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), eliminando gli avvisi allegati `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws`. Aggiunta una voce npm `overrides` forzando la patch `shell-quote@1.8.4` per eliminare l’avviso critico rimanente trasportato da `concurrently`; rigenerati entrambi i lockfile (ora 0 vulnerabilità)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ha aggiornato la dipendenza transitoria `qs` (moderata) a una release patchata
- **03-GettingStarted/samples/javascript**: `npm audit fix` ha aggiornato la dipendenza transitoria `hono` (moderata) a una release patchata
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ha aggiornato la dipendenza transitoria `form-data` (alta) a una release patchata
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generato il file `package-lock.json` mancante per rendere il progetto riproducibile e analizzabile (0 vulnerabilità)

#### Correzione Sicurezza a Livello Codice (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Rimosso `shell=True` dallo strumento `open_in_vscode`. La precedente chiamata `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permetteva che metacaratteri shell in un percorso di cartella fossero interpretati da `cmd.exe` (vettore di injection comando). Ora avvia direttamente `Code.exe` risolto con la cartella come argomento — senza shell — che è funzionalmente equivalente e sicuro

#### Audit Dipendenze Python

- Analizzati tutti i set di requisiti Python con `pip-audit`. `05-AdvancedTopics` e `03-GettingStarted/samples/python` non hanno riportato **vulnerabilità note** (le loro gamme `mcp` / `httpx` / `pydantic` / `python-dotenv` risolvono in release correnti patchate)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` ha segnalato la dipendenza transitiva **`werkzeug` 3.1.1** con tre avvisi DoS relativi a `safe_join` per nomi dispositivi Windows — `CVE-2025-66221`, `CVE-2026-21860`, e `CVE-2026-27199` (tutti risolti in 3.1.6). Aggiunto un pin di sicurezza esplicito `werkzeug>=3.1.6` così che la release patchata sia risolta; verificata la risoluzione pulita del vincolo con lo stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding del Nome Prodotto

Aggiornati tutti i contenuti del curriculum per riflettere il rebranding dei prodotti Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aggiornato link alla community Discord
- **AGENTS.md**: Aggiornato riferimento al server Discord
- **README.md**: Aggiornati riferimenti all’ecosistema tecnologico
- **study_guide.md**: Aggiornati riferimenti ai case study
- **05-AdvancedTopics/README.md**: Aggiornato titolo e descrizione del Modulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Aggiornati header di sezione e descrizione
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Aggiornato titolo e contenuto completo del modulo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aggiornato link di cross-reference
- **07-LessonsfromEarlyAdoption/README.md**: Aggiornati riferimenti ai case study
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aggiornato header Sezione 9, badge e funzionalità
- **08-BestPractices/README.md**: Aggiornato link alla community Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aggiornato riferimento al canale Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aggiornato riferimento al deployment modello
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aggiornata tabella AI Services
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aggiornati riferimenti alle risorse

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension per VS Code
- **README.md**: Aggiornati i principali riferimenti del curriculum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aggiornati titolo del modulo, panoramica e tutti gli header modulo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aggiornati titolo, obiettivi di apprendimento, istruzioni di configurazione e risorse
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aggiornati titolo, obiettivi di apprendimento, tabella host MCP e riferimenti incrociati
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aggiornati titolo, badge, prerequisiti e risorse
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aggiornati riferimenti Agent Builder e link feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aggiornati prerequisiti e riferimenti all’estensione

---

## 11 aprile 2026

### Nuova Lezione, Correzione Documentazione e Aggiornamenti Dipendenze

#### Nuovi Contenuti del Curriculum Aggiunti

**Modulo 05 - Argomenti Avanzati**
- **Lezione 5.17: Ragionamento Multi-Agente Avversariale con MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nuova guida completa che tratta il pattern di dibattito avversariale per sistemi multi-agente
  - Diagramma architetturale Mermaid: due agenti → server MCP condiviso → trascrizione del dibattito → giudice → verdetto
  - Server strumenti MCP condiviso (`web_search` + `run_python`) implementato in Python e TypeScript
  - Prompt di sistema contrapposti (PER / CONTRO / Giudice) con requisiti espliciti per l’uso degli strumenti
  - Orchestratore del dibattito in Python, TypeScript e C# che gestisce i round e instrada gli argomenti
  - Wiring MCP `ClientSession` per orchestratore verso chiamate reali agli strumenti
  - Tabella casi d’uso (rilevamento allucinazioni, modellazione minacce, revisione progettazione API, verifica fattuale, selezione tecnologica)
  - Considerazioni di sicurezza: esecuzione in sandbox, validazione chiamate strumenti, limitazione di frequenza, audit logging
  - Esercizio strutturato con tre scenari pratici (code review, decisione architettura, moderazione contenuto)

#### Correzioni Documentazione

**Modulo 03 - Getting Started**
- **05-stdio-server/README.md**: Corretto esempio incompleto del server TypeScript stdio — aggiunta istanziazione mancante del transport (`new StdioServerTransport()`) e la chiamata `server.connect(transport)` per corrispondere agli esempi Python e .NET nella stessa sezione
- **14-sampling/README.md**: Corretto refuso — corretto `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Aggiornamenti Curriculum

**README.md principale**
- Aggiunta voce 5.17 (Ragionamento Multi-Agente Avversariale con MCP) alla tabella del curriculum con link diretto alla nuova lezione

**05-AdvancedTopics/README.md**
- Aggiunta riga Lezione 5.17 alla tabella lezioni

**study_guide.md**
- Aggiunto argomento Ragionamento Multi-Agente Avversariale alla mappa mentale e descrizione in prosa degli Argomenti Avanzati

#### Correzioni Codice e Sicurezza

**Modulo 05 - Agenti Avversari (`mcp-adversarial-agents`)**
- **Correzione di sicurezza — iniezione di comandi**: Sostituita l'interpolazione shell `execSync` con `execFile` + `promisify` nello strumento TypeScript `run_python`, eliminando la superficie di iniezione di comandi (il codice controllato dall'LLM ora viene passato come elemento argv letterale senza coinvolgimento della shell)
- **Configurazione del ciclo dello strumento MCP**: Aggiornato l'orchestratore Python per il dibattito usando il client `AsyncAnthropic` (sostituendo `Anthropic` sincrono bloccante), passando una `ClientSession` live direttamente a ogni turno dell'agente, recuperando le definizioni degli strumenti tramite `session.list_tools()` a ogni turno, e inviando blocchi `tool_use` tramite `session.call_tool()` in un ciclo fino a quando il modello non emette una risposta testuale finale

#### Aggiornamenti delle dipendenze

- Aggiornato `hono` a 4.12.12 in più pacchetti (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Aggiornato `@hono/node-server` da 1.19.11 a 1.19.13 nei pacchetti TypeScript
- Aggiornato `cryptography` da 46.0.5 a 46.0.7 nei pacchetti Python (10-StreamliningAIWorkflows laboratori 3 e 4)
- Aggiornato `lodash` da 4.17.23 a 4.18.1 in 10-StreamliningAIWorkflows inspector

#### Traduzioni

- Sincronizzate le traduzioni per 48+ lingue con le ultime modifiche alla sorgente (aggiornamento i18n)

---

## 5 febbraio 2026

### Miglioramenti per la validazione e la navigazione a livello di repository

#### Nuovo contenuto del curriculum aggiunto

**Modulo 03 - Getting Started**
- **12-mcp-hosts/README.md**: Nuova guida completa per la configurazione degli host MCP
  - Esempi di configurazione per Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Template JSON di configurazione per tutti i principali host
  - Tabella comparativa dei tipi di trasporto (stdio, SSE/HTTP, WebSocket)
  - Risoluzione dei problemi comuni di connessione
  - Best practice di sicurezza per la configurazione degli host

- **13-mcp-inspector/README.md**: Nuova guida al debugging per MCP Inspector
  - Metodi di installazione (npx, npm globale, da sorgente)
  - Connessione ai server tramite stdio e HTTP/SSE
  - Strumenti di testing, risorse e workflow dei prompt
  - Integrazione VS Code con MCP Inspector
  - Scenari comuni di debugging con soluzioni

**Modulo 04 - Practical Implementation**
- **pagination/README.md**: Nuova guida all'implementazione della paginazione
  - Pattern di paginazione basata su cursore in Python, TypeScript, Java
  - Gestione della paginazione lato client
  - Strategie di design del cursore (opaco vs strutturato)
  - Raccomandazioni per l’ottimizzazione delle prestazioni

**Modulo 05 - Advanced Topics**
- **mcp-protocol-features/README.md**: Nuova approfondimento sulle funzionalità del protocollo
  - Implementazione delle notifiche di progresso
  - Pattern per la cancellazione delle richieste
  - Template di risorse con pattern URI
  - Gestione del ciclo di vita del server
  - Controllo dei livelli di logging
  - Pattern di gestione errori con codici JSON-RPC

#### Correzioni di navigazione (oltre 24 file aggiornati)

**README principali dei moduli**
 Ora linkano sia alla prima lezione CHE al modulo successivo

**Sotto-file di 02-Security**
- Tutti i 5 documenti supplementari di sicurezza ora hanno navigazione "Cosa segue":

**File 09-CaseStudy**
- Tutti i file dei case study ora hanno navigazione sequenziale:

**Laboratori 10-StreamliningAI**
Aggiunta sezione Cosa segue alla panoramica del Modulo 10 e al Modulo 11

#### Correzioni di codice e contenuti

**Aggiornamenti SDK e dipendenze**
Corretto versione vuota di openai a `^4.95.0`
Aggiornato SDK da `^1.8.0` a `>=1.26.0`
Aggiornati i pin versione di mcp a `>=1.26.0`

**Correzioni codice**
Corretto modello non valido `gpt-4o-mini` in `gpt-4.1-mini`

**Correzioni contenuti**
Corretto link rotto `READMEmd` → `README.md`, corretto header curriculum `Module 1-3` → `Module 0-3`, corretta sensibilità al maiuscolo/minuscolo nel path
Rimossa duplicazione corrotta del contenuto del Case Study 5

**Miglioramenti per principianti**
Aggiunta introduzione corretta, obiettivi di apprendimento e prerequisiti per principianti

#### Aggiornamenti curriculum

**README.md principale**
- Aggiunte voci 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) alla tabella del curriculum

**README moduli**
Aggiunte lezioni 12 e 13 alla lista lezioni
Aggiunta sezione Guide pratiche con link alla paginazione
Aggiunte lezioni 5.15 (Custom Transport) e 5.16 (Protocol Features)

**study_guide.md**
- Aggiornata mappa mentale con tutti i nuovi argomenti: Configurazione MCP Hosts, MCP Inspector, Strategie di paginazione, Approfondimento sulle funzionalità del protocollo

## 28 gennaio 2026

### Verifica di conformità alla Specifica MCP 2025-11-25

#### Potenziamento dei concetti chiave (01-CoreConcepts/)
- **Nuovo primitivo client - Roots**: Aggiunta documentazione completa sul primitivo client Roots, che consente ai server di comprendere i confini del filesystem e i permessi di accesso
- **Annotazioni degli strumenti**: Aggiunta documentazione sulle annotazioni comportamentali degli strumenti (`readOnlyHint`, `destructiveHint`) per decisioni migliori sull’esecuzione
- **Chiamata degli strumenti nel sampling**: Aggiornata documentazione del Sampling per includere i parametri `tools` e `toolChoice` per l'invocazione guidata degli strumenti durante le richieste di campionamento
- **Elicitazione in modalità URL**: Aggiunta documentazione sull’elicitazione basata su URL per interazioni web esterne initiate dal server
- **Tasks (sperimentale)**: Aggiunta nuova sezione che documenta la funzionalità sperimentale Tasks per wrapper di esecuzione durevole e recupero differito dei risultati
- **Supporto icone**: Notato che strumenti, risorse, template di risorse e prompt possono ora includere icone come metadati aggiuntivi

#### Aggiornamenti documentazione
- **README.md**: Aggiunto riferimento alla versione MCP Specifica 2025-11-25 e spiegazione della versionatura basata sulla data
- **study_guide.md**: Aggiornata mappa del curriculum per includere Tasks e Annotazioni Strumenti nella sezione Concetti chiave; aggiornato timestamp documento

#### Verifica di conformità alla specifica
- **Versione del protocollo**: Verificato che tutta la documentazione fa riferimento alla Specifica MCP 2025-11-25 correntemente valida
- **Allineamento architetturale**: Confermata accuratezza della documentazione sull’architettura a due livelli (Data Layer + Transport Layer)
- **Documentazione dei primitivi**: Validata documentazione dei primitivi server (Risorse, Prompt, Strumenti) e quei client (Sampling, Elicitazione, Logging, Roots)
- **Meccanismi di trasporto**: Verificata accuratezza della documentazione dei trasporti STDIO e HTTP Streamable
- **Linee guida di sicurezza**: Confermato allineamento con le migliori pratiche di sicurezza MCP correnti

#### Funzionalità chiave MCP 2025-11-25 documentate
- **OpenID Connect Discovery**: Scoperta server di autenticazione tramite OIDC
- **Documenti metadati OAuth Client ID**: Meccanismo raccomandato per la registrazione client
- **JSON Schema 2020-12**: Dialetto predefinito per definizioni schema MCP
- **Sistema di classi SDK**: Requisiti formalizzati per supporto e manutenzione funzionalità SDK
- **Struttura di governance**: Formalizzato Working Groups e Interest Groups nella governance MCP

### Aggiornamento principale documentazione sicurezza (02-Security/)

#### Integrazione MCP Security Summit Workshop (Sherpa)
- **Nuova risorsa formazione pratica**: Aggiunta integrazione completa con [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) in tutta la documentazione di sicurezza
- **Copertura percorso spedizione**: Documentato il percorso completo campo-campo dalla Base Camp alla vetta
- **Allineamento OWASP**: Tutte le linee guida di sicurezza ora mappate ai rischi della OWASP MCP Azure Security Guide

#### Integrazione OWASP MCP Top 10
- **Nuova sezione**: Aggiunta tabella dei Top 10 rischi sicurezza OWASP MCP con mitigazioni Azure nel README principale della sicurezza
- **Documentazione orientata al rischio**: Aggiornato mcp-security-controls-2025.md con riferimenti ai rischi OWASP MCP per ogni dominio di sicurezza
- **Architettura di riferimento**: Collegata all’architettura di riferimento e pattern di implementazione della OWASP MCP Azure Security Guide

#### File sicurezza aggiornati
- **README.md**: Aggiunta panoramica Sherpa Workshop, tabella percorso spedizione, riepilogo rischi OWASP MCP Top 10 e sezione formazione pratica
- **mcp-security-controls-2025.md**: Aggiornato header a febbraio 2026, aggiunti riferimenti rischi OWASP (MCP01-MCP08), corretta incoerenza versione specifica
- **mcp-security-best-practices-2025.md**: Aggiunta sezione risorse Sherpa e OWASP, aggiornato timestamp
- **mcp-best-practices.md**: Aggiunta sezione formazione pratica con link Sherpa e OWASP
- **azure-content-safety-implementation.md**: Aggiunto riferimento OWASP MCP06, allineamento Sherpa Camp 3 e sezione risorse aggiuntive

#### Nuovi link risorse aggiunti
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Pagine individuali dei rischi OWASP MCP (MCP01-MCP10)

### Allineamento MCP Specifica 2025-11-25 a livello di curriculum

#### Modulo 03 - Getting Started
- **Documentazione SDK**: Aggiunto Go SDK alla lista ufficiale SDK; aggiornati tutti i riferimenti SDK per allineamento alla Specifica MCP 2025-11-25
- **Chiarimenti trasporto**: Aggiornate descrizioni dei trasporti STDIO e HTTP Streaming con riferimenti espliciti alla specifica

#### Modulo 04 - Practical Implementation
- **Aggiornamenti SDK**: Aggiunto Go SDK; aggiornata lista SDK con riferimento versione specifica
- **Specifica autorizzazioni**: Aggiornato link specifica MCP Autorizzazioni alla versione attuale 2025-11-25

#### Modulo 05 - Advanced Topics
- **Nuove funzionalità**: Aggiunta nota sulle nuove funzionalità MCP Specifica 2025-11-25 (Tasks, Annotazioni strumenti, Elicitazione modalità URL, Roots)
- **Risorse sicurezza**: Aggiunti link OWASP MCP Top 10 e Sherpa workshop alle referenze aggiuntive

#### Modulo 06 - Contributi Comunitari
- **Lista SDK**: Aggiunti Swift e Rust SDK; aggiornato link specifica a 2025-11-25
- **Riferimento specifica**: Aggiornato link Specifica MCP a URL diretto

#### Modulo 07 - Lezioni dall’adozione precoce
- **Aggiornamento risorse**: Aggiunti link Specifica MCP 2025-11-25 e OWASP MCP Top 10 nelle risorse aggiuntive

#### Modulo 08 - Best Practices
- **Versione specifica**: Aggiornato riferimento specifica MCP a 2025-11-25
- **Risorse sicurezza**: Aggiunti OWASP MCP Top 10 e Sherpa workshop alle referenze aggiuntive

#### Modulo 10 - Streamlining AI Workflows
- **Aggiornamento badge**: Cambiata badge versione MCP da versione SDK (1.9.3) a versione specifica (2025-11-25)
- **Link risorse**: Aggiornato link Specifica MCP; aggiunto OWASP MCP Top 10

#### Modulo 11 - Laboratori pratici MCP Server
- **Riferimento specifica**: Aggiornato link Specifica MCP alla versione 2025-11-25
- **Risorse sicurezza**: Aggiunto OWASP MCP Top 10 alle risorse ufficiali

## 18 dicembre 2025

### Aggiornamento documentazione sicurezza - MCP Specifica 2025-11-25

#### Best Practices di sicurezza MCP (02-Security/mcp-best-practices.md) - Aggiornamento versione specifica
- **Aggiornamento versione protocollo**: Aggiornato a riferimento all’ultima Specifica MCP 2025-11-25 (rilasciata 25 novembre 2025)
  - Aggiornati tutti i riferimenti di versione specifica da 2025-06-18 a 2025-11-25
  - Aggiornata la data documento da 18 agosto 2025 a 18 dicembre 2025
  - Verificato che tutti gli URL della specifica puntano alla documentazione corrente
- **Convalida contenuti**: Validazione completa delle best practice di sicurezza secondo gli standard più recenti
  - **Soluzioni Microsoft Security**: Verificata terminologia e link correnti per Prompt Shields (precedentemente "rilevamento rischio Jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Sicurezza OAuth 2.1**: Confermato allineamento con le più recenti best practice di sicurezza OAuth
  - **Standard OWASP**: Validati i riferimenti a OWASP Top 10 per LLM che rimangono aggiornati
  - **Servizi Azure**: Verificati tutti i link e best practice Microsoft Azure
- **Allineamento standard**: Tutti gli standard di sicurezza citati confermati correnti
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Best practice di sicurezza OAuth 2.1
  - Framework di sicurezza e conformità Azure
- **Risorse di implementazione**: Verificati tutti i link a guide di implementazione e risorse
  - Modelli di autenticazione Azure API Management
  - Guide di integrazione Microsoft Entra ID
  - Gestione dei segreti in Azure Key Vault
  - Pipeline DevSecOps e soluzioni di monitoraggio

### Assicurazione di qualità della documentazione
- **Conformità specifica**: Garantito che tutti i requisiti di sicurezza MCP obbligatori (MUST/MUST NOT) siano allineati all’ultima specifica
- **Aggiornamento risorse**: Verificati tutti i link esterni a documentazione Microsoft, standard di sicurezza e guide di implementazione
- **Copertura best practice**: Confermata copertura completa di autenticazione, autorizzazione, minacce specifiche AI, sicurezza della supply chain e pattern enterprise

## 6 ottobre 2025

### Espansione sezione Getting Started – Uso avanzato del server & autenticazione semplice

#### Uso avanzato del server (03-GettingStarted/10-advanced)
- **Nuovo capitolo aggiunto**: Introdotta guida completa all’uso avanzato del server MCP, coprendo sia architetture server regolari sia di basso livello.
  - **Server Regolare vs. a Basso Livello**: Confronto dettagliato ed esempi di codice in Python e TypeScript per entrambi gli approcci.
  - **Design Basato su Handler**: Spiegazione della gestione di tool/resource/prompt basata su handler per implementazioni server scalabili e flessibili.
  - **Pattern Pratici**: Scenari reali in cui i pattern di server a basso livello sono vantaggiosi per funzionalità avanzate e architettura.

#### Autenticazione Semplice (03-GettingStarted/11-simple-auth)
- **Nuovo Capitolo Aggiunto**: Guida passo passo per implementare un’autenticazione semplice nei server MCP.
  - **Concetti di Auth**: Spiegazione chiara di autenticazione vs. autorizzazione e gestione delle credenziali.
  - **Implementazione Base di Auth**: Pattern di autenticazione basati su middleware in Python (Starlette) e TypeScript (Express), con esempi di codice.
  - **Progressione verso la Sicurezza Avanzata**: Indicazioni per iniziare con l’autenticazione semplice e progredire verso OAuth 2.1 e RBAC, con riferimenti a moduli di sicurezza avanzata.

Questi aggiunte forniscono una guida pratica e operativa per costruire implementazioni server MCP più robuste, sicure e flessibili, collegando i concetti fondamentali con pattern avanzati di produzione.

## 29 Settembre 2025

### Laboratori di Integrazione Database per MCP Server - Percorso di Apprendimento Pratico Completo

#### 11-MCPServerHandsOnLabs - Nuovo Curriculum Completo di Integrazione Database
- **Percorso di Apprendimento Completo da 13 Laboratori**: Aggiunto curriculum pratico approfondito per costruire server MCP pronti per la produzione con integrazione database PostgreSQL
  - **Implementazione Reale**: Caso d’uso analitico di Zava Retail che dimostra pattern di livello enterprise
  - **Progressione di Apprendimento Strutturata**:
    - **Laboratori 00-03: Fondamenti** - Introduzione, Architettura Core, Sicurezza & Multi-Tenancy, Setup Ambiente
    - **Laboratori 04-06: Costruzione del Server MCP** - Design e Schema Database, Implementazione Server MCP, Sviluppo Tool  
    - **Laboratori 07-09: Funzionalità Avanzate** - Integrazione Ricerca Semantica, Testing & Debugging, Integrazione VS Code
    - **Laboratori 10-12: Produzione & Best Practices** - Strategie di Deployment, Monitoraggio & Osservabilità, Best Practices & Ottimizzazione
  - **Tecnologie Enterprise**: Framework FastMCP, PostgreSQL con pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Funzionalità Avanzate**: Row Level Security (RLS), ricerca semantica, accesso dati multi-tenant, vettori di embedding, monitoraggio in tempo reale

#### Standardizzazione della Terminologia - Conversione da Modulo a Laboratorio
- **Aggiornamento Completo della Documentazione**: Aggiornati sistematicamente tutti i file README in 11-MCPServerHandsOnLabs per usare la terminologia "Laboratorio" invece di "Modulo"
  - **Intestazioni di Sezione**: Aggiornato "What This Module Covers" in "What This Lab Covers" in tutti e 13 i laboratori
  - **Descrizione del Contenuto**: Cambiato "This module provides..." in "This lab provides..." in tutta la documentazione
  - **Obiettivi di Apprendimento**: Aggiornato "By the end of this module..." in "By the end of this lab..."
  - **Link di Navigazione**: Convertito tutti i riferimenti "Modulo XX:" in "Laboratorio XX:" nelle cross-referenze e nella navigazione
  - **Tracciamento del Completamento**: Aggiornato "After completing this module..." in "After completing this lab..."
  - **Riferimenti Tecnici Preservati**: Mantenuti i riferimenti ai moduli Python nei file di configurazione (es. `"module": "mcp_server.main"`)

#### Miglioramento della Guida allo Studio (study_guide.md)
- **Mappa Visiva del Curriculum**: Aggiunta nuova sezione "11. Database Integration Labs" con visualizzazione completa della struttura dei laboratori
- **Struttura del Repository**: Aggiornate le sezioni da dieci a undici con descrizione dettagliata di 11-MCPServerHandsOnLabs
- **Indicazioni sul Percorso di Apprendimento**: Migliorate le istruzioni di navigazione per coprire le sezioni da 00 a 11
- **Copertura Tecnologica**: Aggiunti dettagli su FastMCP, PostgreSQL e integrazione servizi Azure
- **Risultati di Apprendimento**: Enfatizzato sviluppo di server pronti per la produzione, pattern di integrazione database e sicurezza enterprise

#### Miglioramento della Struttura del README Principale
- **Terminologia Basata sui Laboratori**: Aggiornato README.md principale in 11-MCPServerHandsOnLabs per usare coerentemente la struttura "Laboratorio"
- **Organizzazione del Percorso di Apprendimento**: Progressione chiara dai concetti fondamentali all’implementazione avanzata fino al deployment in produzione
- **Focus sul Mondo Reale**: Enfasi sull’apprendimento pratico con pattern e tecnologie di livello enterprise

### Miglioramenti della Qualità e Coerenza della Documentazione
- **Enfasi sull’Apprendimento Pratico**: Rinforzato l’approccio pratico basato su laboratori in tutta la documentazione
- **Focus su Pattern Enterprise**: Evidenziate implementazioni pronte per la produzione e considerazioni di sicurezza enterprise
- **Integrazione Tecnologica**: Copertura completa dei servizi moderni Azure e pattern di integrazione AI
- **Progressione di Apprendimento**: Percorso chiaro e strutturato da concetti base al deployment di produzione

## 26 Settembre 2025

### Miglioramento dei Casi Studio - Integrazione GitHub MCP Registry

#### Casi Studio (09-CaseStudy/) - Focus sullo Sviluppo dell’Ecosistema
- **README.md**: Espansione significativa con caso studio completo sul GitHub MCP Registry
  - **Caso Studio GitHub MCP Registry**: Nuovo caso studio esaustivo sull’avvio del registro MCP GitHub Settembre 2025
    - **Analisi del Problema**: Esame dettagliato delle sfide di discovery e deployment frammentati di server MCP
    - **Architettura della Soluzione**: Approccio centralizzato di registry GitHub con installazione con un click su VS Code
    - **Impatto sul Business**: Miglioramenti misurabili in onboarding e produttività degli sviluppatori
    - **Valore Strategico**: Focus su deployment modulare di agenti e interoperabilità cross-tool
    - **Sviluppo Ecosistema**: Posizionamento come piattaforma fondazionale per integrazione agentica
  - **Struttura Migliorata dei Casi Studio**: Aggiornati tutti e sette i casi studio con formattazione coerente e descrizioni complete
    - Azure AI Travel Agents: Enfasi sull’orchestrazione multi-agente
    - Integrazione Azure DevOps: Focus su automazione dei workflow
    - Recupero Documentazione in Tempo Reale: Implementazione client console Python
    - Generatore Interattivo di Piani di Studio: Web app conversazionale Chainlit
    - Documentazione In-Editor: Integrazione VS Code e GitHub Copilot
    - Azure API Management: Pattern di integrazione API enterprise
    - GitHub MCP Registry: Sviluppo ecosistema e piattaforma comunitaria
  - **Conclusione Completa**: Sezione di conclusione riscritta evidenziando i sette casi studio su molteplici dimensioni di implementazione MCP
    - Integrazione Enterprise, Orchestrazione Multi-Agente, Produttività Sviluppatori
    - Sviluppo Ecosistema, Applicazioni Didattiche categorizzate
    - Approfondimenti su pattern architetturali, strategie di implementazione e best practice
    - Enfasi su MCP come protocollo maturo e pronto alla produzione

#### Aggiornamenti Guida allo Studio (study_guide.md)
- **Mappa Visiva del Curriculum**: Aggiornata la mappa mentale includendo GitHub MCP Registry nella sezione Casi Studio
- **Descrizione dei Casi Studio**: Migliorata da descrizioni generiche a dettagliata suddivisione dei sette casi studio completi
- **Struttura del Repository**: Aggiornata la sezione 10 per riflettere la copertura completa dei casi studio con dettagli specifici di implementazione
- **Integrazione Changelog**: Aggiunta voce del 26 settembre 2025 documentando l’aggiunta del GitHub MCP Registry e miglioramenti dei casi studio
- **Aggiornamenti di Data**: Aggiornata la data nel footer per riflettere la revisione più recente (26 settembre 2025)

### Miglioramenti della Qualità della Documentazione
- **Incremento della Coerenza**: Uniformato formato e struttura dei casi studio in tutti i sette esempi
- **Copertura Completa**: I casi studio ora coprono scenari enterprise, produttività sviluppatori e sviluppo ecosistema
- **Posizionamento Strategico**: Maggiore focus su MCP come piattaforma fondazionale per il deployment di sistemi agentici
- **Integrazione Risorse**: Aggiornate risorse aggiuntive per includere link al GitHub MCP Registry

## 15 Settembre 2025

### Espansione Tematiche Avanzate - Trasporti Personalizzati & Ingegneria del Contesto

#### Trasporti Personalizzati MCP (05-AdvancedTopics/mcp-transport/) - Guida Completa all’Implementazione Avanzata
- **README.md**: Guida completa all’implementazione di meccanismi di trasporto MCP personalizzati
  - **Trasporto Azure Event Grid**: Implementazione serverless basata su eventi
    - Esempi in C#, TypeScript e Python con integrazione Azure Functions
    - Pattern di architettura event-driven per soluzioni MCP scalabili
    - Receiver webhook e gestione messaggi push
  - **Trasporto Azure Event Hubs**: Implementazione di trasporto streaming ad alta capacità
    - Capacità di streaming in tempo reale per scenari a bassa latenza
    - Strategie di partizionamento e gestione checkpoint
    - Batch di messaggi e ottimizzazione delle prestazioni
  - **Pattern di Integrazione Enterprise**: Esempi architetturali pronti per produzione
    - Elaborazione MCP distribuita su più Azure Functions
    - Architetture ibride combinando diversi tipi di trasporto
    - Durabilità messaggi, affidabilità e gestione errori
  - **Sicurezza & Monitoraggio**: Integrazione Azure Key Vault e pattern di osservabilità
    - Autenticazione con identità gestite e accesso a privilegi minimi
    - Telemetria Application Insights e monitoraggio performance
    - Circuit breaker e pattern di tolleranza agli errori
  - **Framework di Testing**: Strategie complete di testing per trasporti personalizzati
    - Unit test con test doubles e mocking frameworks
    - Integration test con Azure Test Containers
    - Considerazioni su performance e load testing

#### Ingegneria del Contesto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina AI Emergente
- **README.md**: Esplorazione completa dell’ingegneria del contesto come campo emergente
  - **Principi Fondamentali**: Condivisione completa del contesto, consapevolezza decisionale di azioni, gestione della finestra di contesto
  - **Allineamento con il Protocollo MCP**: Come il design MCP affronta le sfide dell’ingegneria del contesto
    - Limitazioni della finestra di contesto e strategie di caricamento progressivo
    - Determinazione della rilevanza e recupero dinamico del contesto
    - Gestione multi-modale del contesto e considerazioni di sicurezza
  - **Approcci di Implementazione**: Architetture single-threaded vs. multi-agente
    - Suddivisione e priorizzazione dei chunk di contesto
    - Strategie di caricamento progressivo e compressione del contesto
    - Approcci stratificati e ottimizzazione del recupero del contesto
  - **Framework di Misurazione**: Metriche emergenti per valutare l’efficacia del contesto
    - Efficienza input, performance, qualità ed esperienza utente
    - Approcci sperimentali all’ottimizzazione del contesto
    - Analisi dei fallimenti e metodologie di miglioramento

#### Aggiornamenti Navigazione Curriculum (README.md)
- **Struttura Moduli Migliorata**: Aggiornata tabella del curriculum per includere nuove tematiche avanzate
  - Aggiunti Context Engineering (5.14) e Custom Transport (5.15)
  - Formattazione coerente e link di navigazione uniformi in tutti i moduli
  - Descrizioni aggiornate per riflettere l’attuale ambito dei contenuti

### Miglioramenti della Struttura delle Cartelle
- **Standardizzazione Nomi**: Rinominato "mcp transport" in "mcp-transport" per uniformità con altre cartelle tematiche avanzate
- **Organizzazione dei Contenuti**: Tutte le cartelle 05-AdvancedTopics seguono ora il pattern di nome coerente (mcp-[topic])

### Miglioramenti della Qualità della Documentazione
- **Allineamento con Specifica MCP**: Tutti i nuovi contenuti fanno riferimento alla MCP Specification 2025-06-18
- **Esempi Multilingua**: Esempi di codice completi in C#, TypeScript e Python
- **Focus Enterprise**: Pattern pronti per la produzione e integrazione cloud Azure in tutta la documentazione
- **Documentazione Visiva**: Diagrammi Mermaid per architettura e visualizzazione dei flussi

## 18 Agosto 2025

### Aggiornamento Completo della Documentazione - Standard MCP 2025-06-18

#### Best Practice di Sicurezza MCP (02-Security/) - Modernizzazione Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Riscrittura completa allineata con MCP Specification 2025-06-18
  - **Requisiti Obbligatori**: Aggiunti requisiti espliciti MUST/MUST NOT dalla specifica ufficiale con indicatori visivi chiari
  - **12 Pratiche di Sicurezza Core**: Ristrutturazione da lista di 15 elementi a domini completi di sicurezza
    - Sicurezza Token & Autenticazione con integrazione provider identità esterna
    - Gestione Sessioni & Sicurezza Trasporto con requisiti crittografici
    - Protezione Minacce Specifiche AI con integrazione Microsoft Prompt Shields
    - Controllo Accessi & Permessi con principio del minimo privilegio
    - Sicurezza e Monitoraggio Contenuti con integrazione Azure Content Safety
    - Sicurezza della Supply Chain con verifica completa componenti
    - Sicurezza OAuth & Prevenzione Confused Deputy con implementazione PKCE
    - Risposta agli Incidenti & Recupero con capacità automatizzate
    - Compliance & Governance con allineamento normativo
    - Controlli di Sicurezza Avanzati con architettura zero trust
    - Integrazione Ecosistema Microsoft Security con soluzioni complete
    - Evoluzione Continua della Sicurezza con pratiche adattive
  - **Soluzioni Microsoft di Sicurezza**: Indicazioni di integrazione migliorate per Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security
  - **Risorse di Implementazione**: Link completi categorizzati in Documentazione MCP Ufficiale, Soluzioni di Sicurezza Microsoft, Standard di Sicurezza e Guide di Implementazione

#### Controlli di Sicurezza Avanzati (02-Security/) - Implementazione Enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Revisione completa con framework di sicurezza enterprise
  - **9 Domini Completi di Sicurezza**: Espansione da controlli base a framework dettagliato enterprise
    - Autenticazione & Autorizzazione Avanzate con integrazione Microsoft Entra ID
    - Sicurezza Token & Controlli Anti-Passthrough con validazione approfondita
    - Controlli di Sicurezza Sessione con prevenzione hijacking
    - Controlli Sicurezza Specifici AI con prevenzione injection prompt e avvelenamento tool
    - Prevenzione Attacchi Confused Deputy con proxy OAuth sicuri
    - Sicurezza esecuzione tool con sandboxing e isolamento
    - Controlli Sicurezza Supply Chain con verifica dipendenze
    - Controlli Monitoraggio & Rilevamento con integrazione SIEM
    - Risposta agli Incidenti & Recupero con automazione
  - **Esempi di Implementazione**: Aggiunti blocchi di configurazione YAML dettagliati ed esempi di codice
  - **Integrazione Soluzioni Microsoft**: Copertura completa dei servizi di sicurezza Azure, GitHub Advanced Security e gestione identità enterprise

#### Tematiche Avanzate di Sicurezza (05-AdvancedTopics/mcp-security/) - Implementazione Pronta Produzione
- **README.md**: Riscrittura completa per implementazione sicurezza enterprise
  - **Allineamento Spec. Corrente**: Aggiornato secondo MCP Specification 2025-06-18 con requisiti obbligatori di sicurezza
  - **Autenticazione Migliorata**: Integrazione Microsoft Entra ID con esempi completi .NET e Java Spring Security
  - **Integrazione Sicurezza AI**: Implementazione Microsoft Prompt Shields e Azure Content Safety con esempi dettagliati Python
  - **Mitigazione Minacce Avanzate**: Esempi completi di implementazione per
    - Prevenzione Attacchi Confused Deputy con PKCE e validazione consenso utente
    - Prevenzione Token Passthrough con validazione audience e gestione sicura token
    - Prevenzione del dirottamento di sessione con vincolo crittografico e analisi comportamentale  
  - **Integrazione della sicurezza aziendale**: monitoraggio Azure Application Insights, pipeline di rilevamento minacce e sicurezza della supply chain  
  - **Checklist di implementazione**: controlli di sicurezza obbligatori vs. consigliati chiaramente distinti con i vantaggi dell’ecosistema di sicurezza Microsoft  

### Qualità della Documentazione e Allineamento agli Standard  
- **Riferimenti alle specifiche**: Aggiornati tutti i riferimenti alla specifica MCP 2025-06-18 corrente  
- **Ecosistema di sicurezza Microsoft**: Guida all’integrazione migliorata in tutta la documentazione di sicurezza  
- **Implementazione pratica**: Esempi di codice dettagliati aggiunti in .NET, Java e Python con pattern aziendali  
- **Organizzazione delle risorse**: Categorizzazione completa della documentazione ufficiale, degli standard di sicurezza e delle guide di implementazione  
- **Indicatori visivi**: Segnalazione chiara dei requisiti obbligatori rispetto alle pratiche consigliate  

#### Concetti Base (01-CoreConcepts/) - Modernizzazione Completa  
- **Aggiornamento versione protocollo**: Riferimento aggiornato alla specifica MCP 2025-06-18 con versionamento basato su data (formato AAAA-MM-GG)  
- **Raffinamento architettura**: Descrizioni migliorate di Host, Client e Server per riflettere gli attuali pattern architetturali MCP  
  - Host ora chiaramente definiti come applicazioni AI che coordinano molteplici connessioni client MCP  
  - Client descritti come connettori di protocollo che mantengono relazioni uno a uno con i server  
  - Server migliorati con scenari di distribuzione locale vs. remota  
- **Ristrutturazione primitive**: Revisione completa delle primitive di server e client  
  - Primitive server: Risorse (fonti dati), Prompt (template), Strumenti (funzioni eseguibili) con spiegazioni dettagliate ed esempi  
  - Primitive client: Campionamento (completamenti LLM), Estrazione (input utente), Log (debug/monitoraggio)  
  - Aggiornate con pattern attuali di metodi di scoperta (`*/list`), recupero (`*/get`) ed esecuzione (`*/call`)  
- **Architettura protocollo**: Introdotto modello architetturale a due livelli  
  - Livello dati: base JSON-RPC 2.0 con gestione del ciclo di vita e primitive  
  - Livello trasporto: meccanismi di trasporto STDIO (locale) e HTTP Streamable con SSE (remoto)  
- **Framework di sicurezza**: Principi di sicurezza completi includendo consenso esplicito dell’utente, protezione della privacy, sicurezza nell’esecuzione degli strumenti e sicurezza del livello di trasporto  
- **Pattern di comunicazione**: Messaggi di protocollo aggiornati per mostrare flussi di inizializzazione, scoperta, esecuzione e notifica  
- **Esempi di codice**: Esempi multilingue aggiornati (.NET, Java, Python, JavaScript) per riflettere i pattern attuali MCP SDK  

#### Sicurezza (02-Security/) - Revisione Completa della Sicurezza  
- **Allineamento agli standard**: Piena conformità ai requisiti di sicurezza della specifica MCP 2025-06-18  
- **Evoluzione dell’autenticazione**: Documentata l’evoluzione da server OAuth custom a delega tramite provider di identità esterni (Microsoft Entra ID)  
- **Analisi delle minacce specifiche AI**: Copertura ampliata dei vettori di attacco AI moderni  
  - Scenari dettagliati di attacchi di injection nei prompt con esempi reali  
  - Meccanismi di avvelenamento degli strumenti e pattern di attacco “rug pull”  
  - Veleni nella finestra di contesto e attacchi di confusione del modello  
- **Soluzioni di sicurezza AI Microsoft**: Copertura completa dell’ecosistema di sicurezza Microsoft  
  - AI Prompt Shields con tecniche avanzate di rilevamento, spotlighting e delimitazione  
  - Integrazione Azure Content Safety  
  - GitHub Advanced Security per la protezione della supply chain  
- **Mitigazione avanzata delle minacce**: Controlli di sicurezza dettagliati per  
  - Dirottamento di sessione con scenari specifici MCP e requisiti crittografici di ID sessione  
  - Problemi di confused deputy nei proxy MCP con requisiti di consenso esplicito  
  - Vulnerabilità di token passthrough con controlli di validazione obbligatori  
- **Sicurezza della supply chain**: Copertura ampliata della supply chain AI inclusi modelli foundation, servizi di embeddings, fornitori di contesto e API di terze parti  
- **Sicurezza foundation**: Integrazione avanzata con pattern di sicurezza aziendale inclusa architettura zero trust ed ecosistema Microsoft  
- **Organizzazione risorse**: Collegamenti alle risorse classificati per tipo (Documenti ufficiali, Standard, Ricerca, Soluzioni Microsoft, Guide di implementazione)  

### Miglioramenti della Qualità della Documentazione  
- **Obiettivi di apprendimento strutturati**: Obiettivi migliorati con risultati specifici e attuabili  
- **Riferimenti incrociati**: Inseriti link tra argomenti relativi a sicurezza e concetti base  
- **Informazioni aggiornate**: Aggiornate tutte le date di riferimento e i link alle specifiche standard correnti  
- **Guida all’implementazione**: Linee guida specifiche e attuabili aggiunte in entrambe le sezioni  

## 16 luglio 2025  

### Miglioramenti README e Navigazione  
- Navigazione del curriculum completamente ridisegnata in README.md  
- Sostituiti i tag `<details>` con un formato tabellare più accessibile  
- Create opzioni di layout alternative nella nuova cartella "alternative_layouts"  
- Aggiunti esempi di navigazione con schede, a fisarmonica e a card  
- Aggiornata la sezione struttura del repository includendo tutti i file più recenti  
- Potenziata la sezione "Come usare questo curriculum" con raccomandazioni chiare  
- Aggiornati i link alle specifiche MCP ai URL corretti  
- Aggiunta la sezione Context Engineering (5.14) alla struttura del curriculum  

### Aggiornamenti Guida di Studio  
- Guida di studio completamente rivista per allinearsi alla struttura attuale del repository  
- Aggiunte nuove sezioni per MCP Clients e Tools, e server MCP popolari  
- Aggiornata la mappa visiva del curriculum per riflettere accuratamente tutti gli argomenti  
- Descrizioni potenziate degli argomenti avanzati per coprire tutte le aree specializzate  
- Sezione Case Studies aggiornata con esempi reali  
- Inserito questo changelog completo  

### Contributi della Comunità (06-CommunityContributions/)  
- Aggiunte informazioni dettagliate sui server MCP per generazione immagini  
- Aggiunta sezione completa sull’uso di Claude in VSCode  
- Aggiunte istruzioni per configurazione e utilizzo client terminale Cline  
- Sezione MCP client aggiornata per includere tutte le opzioni client popolari  
- Esempi di contributo potenziati con campioni di codice più accurati  

### Argomenti Avanzati (05-AdvancedTopics/)  
- Organizzate tutte le cartelle di argomenti specializzati con nomenclatura coerente  
- Aggiunti materiali ed esempi di context engineering  
- Documentazione di integrazione agente Foundry aggiunta  
- Potenziata documentazione di integrazione di sicurezza Entra ID  

## 11 giugno 2025  

### Creazione Iniziale  
- Rilasciata prima versione del curriculum MCP per principianti  
- Creata struttura base per tutte le 10 sezioni principali  
- Implementata mappa visiva del curriculum per la navigazione  
- Inseriti progetti campione iniziali in più linguaggi di programmazione  

### Introduzione (03-GettingStarted/)  
- Creati i primi esempi di implementazione server  
- Aggiunte linee guida per lo sviluppo client  
- Includere istruzioni per integrazione client LLM  
- Documentazione per integrazione VS Code aggiunta  
- Esempi server con Server-Sent Events (SSE) implementati  

### Concetti Base (01-CoreConcepts/)  
- Aggiunta spiegazione dettagliata dell’architettura client-server  
- Documentazione sui componenti chiave del protocollo creata  
- Documentate le modalità di messaggistica in MCP  

## 23 maggio 2025  

### Struttura del Repository  
- Inizializzato repository con struttura cartelle base  
- Creati file README per ogni sezione principale  
- Configurata infrastruttura di traduzione  
- Aggiunti asset immagini e diagrammi  

### Documentazione  
- Creato README.md iniziale con panoramica del curriculum  
- Aggiunti CODE_OF_CONDUCT.md e SECURITY.md  
- Configurato SUPPORT.md con guida per ricevere aiuto  
- Struttura preliminare guida di studio creata  

## 15 aprile 2025  

### Pianificazione e Framework  
- Pianificazione iniziale del curriculum MCP per principianti  
- Definiti obiettivi di apprendimento e pubblico target  
- Delineata struttura a 10 sezioni del curriculum  
- Sviluppato framework concettuale per esempi e case study  
- Creati prototipi iniziali di esempi per concetti chiave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->