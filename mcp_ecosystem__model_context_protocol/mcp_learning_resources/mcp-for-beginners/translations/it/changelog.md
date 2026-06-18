# Changelog: Curriculum MCP per Principianti

Questo documento funge da registro di tutte le modifiche significative apportate al curriculum Model Context Protocol (MCP) per Principianti. Le modifiche sono documentate in ordine cronologico inverso (prima le più recenti).

## 16 giugno 2026

### Allineamento Specifica MCP & Validazione Campioni

Validato il curriculum rispetto all'attuale **Specificazione MCP 2025-11-25** e agli SDK ufficiali più recenti, quindi corrette le restanti referenze obsolete alla specifica e confermato che i campioni principali si compilano ed eseguono ancora.

#### Correzioni Versione Specifica (2025-06-18 / 2025-03-26 → 2025-11-25)

Aggiornato il contenuto in inglese dove ancora si sosteneva che una revisione della specifica più vecchia fosse lo standard *corrente/ultimo*, e ripuntati i link ai percorsi canonici della specifica su `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Aggiornato il banner "Standard Corrente", introduzione, intestazioni principi base della sicurezza, requisiti obbligatori, sezione Microsoft Entra ID, link a Riferimenti & Risorse, e avviso finale di sicurezza (8 riferimenti) a 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aggiornati il link alla specifica nelle Risorse Aggiuntive e il banner "Standard Corrente" a 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Sostituito il link obsoleto `2025-03-26` a security-and-trust con la pagina corrente 2025-11-25 delle best practice di sicurezza
- **03-GettingStarted/14-sampling/README.md**: Aggiornato il link ufficiale alla documentazione di sampling a 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aggiornati i riferimenti al tempo presente "specifica MCP corrente" e il link alla specifica nelle Risorse Aggiuntive a 2025-11-25 (note storiche sulla deprecazione SSE lasciate intatte per accuratezza)

#### Validazione Campioni rispetto ai SDK Correnti

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ha risolto `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passato senza errori di tipo — le API esistenti `McpServer`/`StdioServerTransport` rimangono valide
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validato in `.venv` isolato con `mcp[cli]` (1.27.2); `py_compile` passato e `FastMCP.list_tools()` ha restituito correttamente gli strumenti `add` e `subtract`
- Confermato che tutti gli intervalli versione del sample `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) risolvono correttamente all'attuale `1.29.0` senza cambiamenti di API incompatibili

#### Allineamento Pin Dipendenze (chiusura gap di versione)

Aggiornati i pin SDK obsoleti in modo che ogni sample segua la release MCP corrente, conformemente alla convenzione del repository:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Aggiornato `@modelcontextprotocol/sdk` da `^1.8.0` a `>=1.26.0` e modificata la descrizione pacchetto obsoleta `"updated for MCP 2025-06-18"` in `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: Aggiornato il pin esatto `mcp==1.23.0` a `mcp>=1.26.0`; rigenerati entrambi i file `uv.lock` (`uv lock`) in modo che i lockfile risolvano attualmente su `mcp 1.27.2` e siano sincronizzati con i manifest

#### Analisi Gap Curriculum — Copertura Funzionalità Ultima Spec

Verificato che il curriculum copre già tutte le primitive introdotte/espanse nella MCP 2025-11-25, quindi non rimangono gap di contenuto:
- **Sampling**: Lezione 03-GettingStarted/14-sampling più 05-AdvancedTopics/mcp-sampling
- **Elicitation (incluso modalità URL)**: Documentato in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documentato in 00-Introduction, 01-CoreConcepts, e 05-AdvancedTopics/mcp-root-contexts
- **Tasks (sperimentali, operazioni a lunga durata)**: Documentato in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Annotazioni Strumenti** (`readOnlyHint` / `destructiveHint`): Documentato in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Rafforzamento Sicurezza & Risoluzione Vulnerabilità Dipendenze

Eseguita una completa verifica di sicurezza su ogni manifest di dipendenze e codice sorgente dei campioni, quindi risolte tutte le segnalazioni di npm advisories e un problema a livello di codice. Dopo la correzione, `npm audit` riporta **0 vulnerabilità** in ogni directory auditata.

#### Vulnerabilità Dipendenze npm (transitive) — Risolte

Controllati tutti i 15 file `package-lock.json` committati. Le vulnerabilità riguardavano dipendenze transitive introdotte dallo strumento dev MCP Inspector, dal client OpenAI, e dall’SDK MCP; tutte ora risolte senza rompere i campioni:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: Aggiornato `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), eliminando le advisories `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws`. Aggiunta una entry `overrides` npm forzando la versione patchata `shell-quote@1.8.4` per eliminare l’advisory critica su `concurrently`; rigenerati entrambi i lockfile (ora 0 vulnerabilità)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ha aggiornato la dipendenza transitiva `qs` (moderata) ad una release patchata
- **03-GettingStarted/samples/javascript**: `npm audit fix` ha aggiornato la dipendenza transitiva `hono` (moderata) ad una release patchata
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ha aggiornato la dipendenza transitiva `form-data` (alta) ad una release patchata
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generato il file `package-lock.json` mancante in modo che il progetto sia riproducibile e audibile (0 vulnerabilità)

#### Correzione Sicurezza a Livello Codice (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Rimosso `shell=True` dallo strumento `open_in_vscode`. L’esecuzione precedente `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permetteva la interpretazione di metacaratteri shell in un percorso cartella tramite `cmd.exe` (vettore command-injection). Ora l’eseguibile `Code.exe` risolto viene lanciato direttamente con la cartella come argomento — senza shell — equivalente funzionalmente e sicuro

#### Verifica Dipendenze Python

- Audit completato per ogni set di requirements Python con `pip-audit`. `05-AdvancedTopics` e `03-GettingStarted/samples/python` non riportano **vulnerabilità note** (gli intervalli `mcp` / `httpx` / `pydantic` / `python-dotenv` risolvono in release patchate correnti)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` ha segnalato la dipendenza transitiva **`werkzeug` 3.1.1** con tre advisories DoS su `safe_join` relative a nomi dispositivi Windows — `CVE-2025-66221`, `CVE-2026-21860`, e `CVE-2026-27199` (tutte risolte in 3.1.6). Aggiunto pin di sicurezza esplicito `werkzeug>=3.1.6` per risolvere la release patchata; verificato che il vincolo risolva pulito con lo stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding Nome Prodotto

Aggiornati tutti i contenuti del curriculum per riflettere il rebranding dei prodotti Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aggiornato link comunità Discord
- **AGENTS.md**: Aggiornata referenza server Discord
- **README.md**: Aggiornate referenze all'ecosistema tecnologico
- **study_guide.md**: Aggiornate referenze ai case study
- **05-AdvancedTopics/README.md**: Aggiornato titolo e descrizione Modulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Aggiornata intestazione sezione e descrizione
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Aggiornati titolo e contenuti modulo completi
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aggiornato link di cross-riferimento
- **07-LessonsfromEarlyAdoption/README.md**: Aggiornate referenze ai case study
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aggiornata intestazione Sezione 9, badge e capacità
- **08-BestPractices/README.md**: Aggiornato link comunità Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aggiornata referenza canale Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aggiornata referenza al deployment modello
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aggiornata tabella servizi AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aggiornate referenze risorse

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension per VS Code
- **README.md**: Aggiornate referenze principali del curriculum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aggiornato titolo modulo, panoramica e tutte le intestazioni del modulo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aggiornati titolo, obiettivi di apprendimento, istruzioni setup e risorse
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aggiornati titolo, obiettivi di apprendimento, tabella host MCP e cross-riferimenti
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aggiornati titolo, badge, prerequisiti e risorse
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aggiornate referenze Agent Builder e link feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aggiornati prerequisiti e riferimenti estensioni

---

## 11 aprile 2026

### Nuova Lezione, Correzioni Documentazione e Aggiornamento Dipendenze

#### Nuovi Contenuti Curriculari Aggiunti

**Modulo 05 - Argomenti Avanzati**
- **Lezione 5.17: Ragionamento Multi-Agente Adversariale con MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nuova guida completa che copre il pattern di dibattito adversariale per sistemi multi-agente
  - Diagramma architetturale Mermaid: due agenti → server MCP condiviso → trascrizione dibattito → giudice → verdetto
  - Server strumenti MCP condiviso (`web_search` + `run_python`) implementato in Python e TypeScript
  - Prompt di sistema opposti (PER / CONTRO / Giudice) con requisiti espliciti di uso strumenti
  - Orchestratore del dibattito in Python, TypeScript, e C# che gestisce round e instradamento argomentazioni
  - Wiring MCP `ClientSession` per orchestratore verso chiamate reali degli strumenti
  - Tabella use-case (rilevamento allucinazioni, threat modeling, revisione design API, verifica fattuale, selezione tecnologia)
  - Considerazioni di sicurezza: esecuzione in sandbox, validazione chiamate strumenti, rate limiting, audit logging
  - Esercizio strutturato con tre scenari pratici (code review, decisione architetturale, moderazione contenuti)

#### Correzioni Documentazione

**Modulo 03 - Getting Started**
- **05-stdio-server/README.md**: Corretto esempio incompleto del server stdio TypeScript — aggiunta istanziazione trasporto mancante (`new StdioServerTransport()`) e chiamata `server.connect(transport)` per allinearlo agli esempi Python e .NET della stessa sezione
- **14-sampling/README.md**: Corretto refuso — da `"Sampling is an davanced features"` a `"Sampling is an advanced feature"`

#### Aggiornamenti Curriculum

**README.md principale**
- Aggiunta voce 5.17 (Ragionamento Multi-Agente Adversariale con MCP) nella tabella del curriculum con link diretto alla nuova lezione

**05-AdvancedTopics/README.md**
- Aggiunta riga Lezione 5.17 nella tabella delle lezioni

**study_guide.md**
- Aggiunto argomento Ragionamento Multi-Agente Adversariale nella mappa mentale e descrizione in prosa di Argomenti Avanzati

#### Correzioni Codice e Sicurezza

**Modulo 05 - Agenti Adversariali (`mcp-adversarial-agents`)**
- **Correzione sicurezza — injection di comandi**: Sostituito l’interpolazione shell `execSync` con `execFile` + `promisify` nello strumento TypeScript `run_python`, eliminando la superficie di injection di comandi (il codice controllato da LLM viene ora passato come elemento argv letterale senza coinvolgimento di shell)
- **Cablatura loop strumento MCP**: Aggiornato l'orchestratore del dibattito Python per utilizzare il client `AsyncAnthropic` (sostituendo il `Anthropic` sincrono e bloccante), passare una `ClientSession` live direttamente a ogni turno dell'agente, ottenere le definizioni degli strumenti tramite `session.list_tools()` ad ogni turno, e dispatchare blocchi `tool_use` tramite `session.call_tool()` in un loop fino a quando il modello emette una risposta testuale finale

#### Aggiornamenti delle dipendenze

- Aggiornato `hono` alla versione 4.12.12 in molti pacchetti (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Aggiornato `@hono/node-server` dalla versione 1.19.11 alla 1.19.13 nei pacchetti TypeScript
- Aggiornato `cryptography` dalla 46.0.5 alla 46.0.7 nei pacchetti Python (laboratori 3 e 4 di 10-StreamliningAIWorkflows)
- Aggiornato `lodash` da 4.17.23 a 4.18.1 in 10-StreamliningAIWorkflows inspector

#### Traduzioni

- Sincronizzate le traduzioni per più di 48 lingue con le ultime modifiche della sorgente (aggiornamento i18n)

---

## 5 Febbraio 2026

### Miglioramenti alla validazione e navigazione dell’intero repository

#### Nuovi contenuti del curriculum aggiunti

**Modulo 03 - Getting Started**
- **12-mcp-hosts/README.md**: Nuova guida completa per la configurazione degli host MCP
  - Esempi di configurazione per Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelli di configurazione JSON per tutti i principali host
  - Tabella comparativa dei tipi di trasporto (stdio, SSE/HTTP, WebSocket)
  - Risoluzione dei problemi comuni di connessione
  - Best practice di sicurezza per la configurazione degli host

- **13-mcp-inspector/README.md**: Nuova guida di debug per MCP Inspector
  - Metodi di installazione (npx, npm globale, da sorgente)
  - Connessione ai server tramite stdio e HTTP/SSE
  - Strumenti di test, risorse e workflow dei prompt
  - Integrazione con VS Code per MCP Inspector
  - Scenari comuni di debug con soluzioni

**Modulo 04 - Practical Implementation**
- **pagination/README.md**: Nuova guida all’implementazione della paginazione
  - Pattern di paginazione basata su cursore in Python, TypeScript, Java
  - Gestione della paginazione lato client
  - Strategie di design per cursori (opachi vs strutturati)
  - Raccomandazioni per l’ottimizzazione delle prestazioni

**Modulo 05 - Argomenti Avanzati**
- **mcp-protocol-features/README.md**: Approfondimento sulle nuove funzionalità del protocollo
  - Implementazione delle notifiche di progresso
  - Pattern di cancellazione delle richieste
  - Template di risorse con pattern URI
  - Gestione del lifecycle del server
  - Controllo dei livelli di logging
  - Pattern di gestione errori con codici JSON-RPC

#### Correzioni di navigazione (oltre 24 file aggiornati)

**Main Module README**
 Ora linka sia alla prima lezione che al modulo successivo

**Sottodocumenti 02-Security**
- Tutti i 5 documenti supplementari di sicurezza ora hanno la navigazione "Cosa fare dopo"

**File 09-CaseStudy**
- Tutti i file delle case study ora hanno navigazione sequenziale

**Laboratori 10-StreamliningAI**
Aggiunta la sezione "Cosa fare dopo" alla panoramica del Modulo 10 e del Modulo 11

#### Correzioni di codice e contenuti

**Aggiornamenti SDK e dipendenze**
Corretto la versione vuota di openai a `^4.95.0`
Aggiornato SDK da `^1.8.0` a `>=1.26.0`
Aggiornati i pin della versione mcp a `>=1.26.0`

**Correzioni di codice**
Corretto modello non valido `gpt-4o-mini` in `gpt-4.1-mini`

**Correzioni di contenuto**
Corretto link errato `READMEmd` → `README.md`, sistema intestazioni curriculum `Module 1-3` → `Module 0-3`, corretto percorso case-sensitive
Rimosso contenuto duplicato e corrotto della Case Study 5

**Miglioramenti per i principianti**
Aggiunta corretta introduzione, obiettivi di apprendimento e prerequisiti per principianti

#### Aggiornamenti del curriculum

**README principale**
- Aggiunti voci 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginazione), 5.16 (Funzionalità del protocollo) nella tabella del curriculum

**README dei Moduli**
Aggiunte lezioni 12 e 13 alla lista delle lezioni
Aggiunta sezione Guide pratiche con link alla paginazione
Aggiunte lezioni 5.15 (Transport personalizzato) e 5.16 (Funzionalità del protocollo)

**study_guide.md**
- Aggiornata mappa mentale con tutti i nuovi argomenti: Configurazione MCP Hosts, MCP Inspector, Strategie di Paginazione, Approfondimento Funzionalità Protocollo

## 28 Gennaio 2026

### Revisione di conformità alla specifica MCP 2025-11-25

#### Potenziamento dei concetti base (01-CoreConcepts/)
- **Nuovo primitivo client - Roots**: Aggiunta documentazione dettagliata sul primitivo Roots client, che permette ai server di comprendere i confini del filesystem e i permessi di accesso
- **Annotazioni degli strumenti**: Aggiunta documentazione sulle annotazioni comportamentali degli strumenti (`readOnlyHint`, `destructiveHint`) per decisioni più accurate sull’esecuzione degli strumenti
- **Chiamata tool in Sampling**: Aggiornata la documentazione di Sampling per includere parametri `tools` e `toolChoice` per l’invocazione di strumenti guidata dal modello durante le richieste di campionamento
- **Elicitazione modalità URL**: Aggiunta documentazione sull’elicitazione basata su URL per interazioni web esterne avviate dal server
- **Task (sperimentale)**: Nuova sezione che documenta la funzionalità sperimentale Tasks per wrapper di esecuzione durevoli e recupero dei risultati differiti
- **Supporto icone**: Segnalato che strumenti, risorse, template di risorse e prompt possono ora includere icone come metadati aggiuntivi

#### Aggiornamenti documentazione
- **README.md**: Aggiunta referenza alla versione MCP Specification 2025-11-25 e spiegazione della versioning basata su data
- **study_guide.md**: Aggiornata mappa del curriculum per includere Task e Annotazioni Tool nella sezione Concetti Base; aggiornato timestamp documento

#### Verifica conformità specifica
- **Versione protocollo**: Confermato che tutta la documentazione fa riferimento alla MCP Specification 2025-11-25 corrente
- **Allineamento architetturale**: Verificata accuratezza della documentazione dell’architettura a due livelli (Data Layer + Transport Layer)
- **Documentazione primitiva**: Validati primitivi server (Risorse, Prompt, Strumenti) e primitivi client (Sampling, Elicitation, Logging, Roots)
- **Meccanismi di trasporto**: Verificata accuratezza della documentazione del trasporto STDIO e Streamable HTTP
- **Indicazioni di sicurezza**: Confermata conformità con la documentazione delle Best Practice di Sicurezza MCP attuali

#### Funzionalità chiave MCP 2025-11-25 documentate
- **OpenID Connect Discovery**: Scoperta server di autenticazione tramite OIDC
- **Documenti metadati OAuth Client ID**: Meccanismo consigliato per la registrazione client
- **JSON Schema 2020-12**: Dialetto di default per definizioni di schema MCP
- **Sistema di Tiering SDK**: Specifiche formali per il supporto e la manutenzione delle funzionalità SDK
- **Struttura di governance**: Formalizzazione dei Gruppi di Lavoro e Gruppi di Interesse nella governance MCP

### Aggiornamento maggiore documentazione sicurezza (02-Security/)

#### Integrazione Workshop MCP Security Summit (Sherpa)
- **Nuova risorsa hands-on**: Aggiunta integrazione completa con il [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) in tutta la documentazione di sicurezza
- **Copertura percorso spedizione**: Documentata la progressione completa campo per campo dalla Base Camp alla Summit
- **Allineamento OWASP**: Tutte le indicazioni di sicurezza ora mappano sui rischi della OWASP MCP Azure Security Guide

#### Integrazione OWASP MCP Top 10
- **Nuova sezione**: Aggiunta tabella dei Top 10 rischi di sicurezza OWASP MCP con mitigazioni Azure nel README principale di Sicurezza
- **Documentazione basata sul rischio**: Aggiornato mcp-security-controls-2025.md con riferimenti ai rischi OWASP MCP per ciascun dominio di sicurezza
- **Architettura di riferimento**: Collegamenti alla guida di sicurezza Azure OWASP MCP e ai pattern di implementazione

#### File di sicurezza aggiornati
- **README.md**: Aggiunta panoramica Workshop Sherpa, tabella percorsi spedizione, sommario rischi OWASP MCP Top 10 e sezione hands-on
- **mcp-security-controls-2025.md**: Aggiornata intestazione a febbraio 2026, aggiunti riferimenti rischi OWASP (MCP01-MCP08), corretta incongruenza versione spec
- **mcp-security-best-practices-2025.md**: Aggiunta sezione risorse Sherpa e OWASP, aggiornato timestamp
- **mcp-best-practices.md**: Aggiunta sezione hands-on con link a Sherpa e OWASP
- **azure-content-safety-implementation.md**: Aggiunto riferimento OWASP MCP06, allineamento con Sherpa Camp 3 e sezione risorse aggiuntive

#### Nuovi link risorse aggiunti
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Pagine singole dei rischi OWASP MCP (MCP01-MCP10)

### Allineamento MCP Specification 2025-11-25 in tutto il curriculum

#### Modulo 03 - Getting Started
- **Documentazione SDK**: Aggiunto Go SDK alla lista ufficiale degli SDK; aggiornati tutti i riferimenti SDK per allineamento con MCP Specification 2025-11-25
- **Chiarimento trasporto**: Aggiornate descrizioni del trasporto STDIO e HTTP Streaming con riferimenti espliciti alla specifica

#### Modulo 04 - Practical Implementation
- **Aggiornamenti SDK**: Aggiunto Go SDK; aggiornata lista SDK con riferimento alla versione specifica
- **Spec autorizzazione**: Aggiornato link alla specifica MCP autorizzazione all’ultima versione 2025-11-25

#### Modulo 05 - Argomenti Avanzati
- **Nuove funzionalità**: Nota sulle nuove funzionalità MCP Specification 2025-11-25 (Task, Annotazioni Tool, Elicitazione modalità URL, Roots)
- **Risorse sicurezza**: Aggiunti link OWASP MCP Top 10 e workshop Sherpa nelle riferimenti aggiuntivi

#### Modulo 06 - Contributi Comunitari
- **Lista SDK**: Aggiunti Swift e Rust SDK; aggiornato link versione specifica MCP 2025-11-25
- **Riferimenti spec**: Aggiornato link alla specifica MCP alla URL diretta della specifica

#### Modulo 07 - Lezioni dall’Adozione Precoce
- **Aggiornamenti risorse**: Aggiunti link MCP Specification 2025-11-25 e OWASP MCP Top 10 tra le risorse aggiuntive

#### Modulo 08 - Best Practice
- **Versione spec**: Aggiornato riferimento MCP Specification a 2025-11-25
- **Risorse sicurezza**: Aggiunti OWASP MCP Top 10 e workshop Sherpa tra le risorse aggiuntive

#### Modulo 10 - Streamlining AI Workflows
- **Aggiornamento badge**: Cambiata visualizzazione versione MCP da versione SDK (1.9.3) a versione specifica (2025-11-25)
- **Link risorse**: Aggiornato link MCP Specification; aggiunto OWASP MCP Top 10

#### Modulo 11 - Laboratori pratici MCP Server
- **Riferimenti spec**: Aggiornato link MCP Specification a versione 2025-11-25
- **Risorse sicurezza**: Aggiunto OWASP MCP Top 10 tra le risorse ufficiali

## 18 Dicembre 2025

### Aggiornamento documentazione sicurezza - MCP Specification 2025-11-25

#### Best Practices Sicurezza MCP (02-Security/mcp-best-practices.md) - Aggiornamento versione specifica
- **Aggiornamento versione protocollo**: Aggiornato per fare riferimento all’ultima MCP Specification 2025-11-25 (rilasciata il 25 novembre 2025)
  - Aggiornati tutti i riferimenti alla versione specifica da 2025-06-18 a 2025-11-25
  - Aggiornate le date del documento da 18 agosto 2025 a 18 dicembre 2025
  - Verificati tutti gli URL di specifica che puntano alla documentazione corrente
- **Validazione contenuto**: Validazione completa delle best practice di sicurezza rispetto agli ultimi standard
  - **Soluzioni sicurezza Microsoft**: Verificata terminologia e link corrente per Prompt Shields (previamente “rilevamento jailbreak”), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Sicurezza OAuth 2.1**: Confermato l’allineamento con le ultime best practice di sicurezza OAuth
  - **Standard OWASP**: Validati i riferimenti OWASP Top 10 per LLM rimangono aggiornati
  - **Servizi Azure**: Verificati tutti i link e le best practice Microsoft Azure
- **Allineamento agli standard**: Confermato che tutti gli standard sicurezza referenziati sono correnti
  - Framework NIST per la gestione del rischio AI
  - ISO 27001:2022
  - OAuth 2.1 Best Practices di sicurezza
  - Framework Azure di sicurezza e compliance
- **Risorse di implementazione**: Verificati tutti i link e risorse delle guide all’implementazione
  - Pattern di autenticazione Azure API Management
  - Guide di integrazione Microsoft Entra ID
  - Gestione segreti Azure Key Vault
  - Soluzioni di pipeline DevSecOps e monitoring

### Garanzia qualità documentazione
- **Conformità specifica**: Assicurata la coerenza di tutti i requisiti MCP sicurezza obbligatori (OBBLIGATORIO/ NON OBBLIGATORIO) con l’ultima specifica
- **Aggiornamento risorse**: Verificati tutti i link esterni alla documentazione Microsoft, standard di sicurezza e guide di implementazione
- **Copertura best practice**: Confermata copertura completa di autenticazione, autorizzazione, minacce AI-specifiche, sicurezza supply chain e pattern enterprise

## 6 Ottobre 2025

### Espansione sezione Getting Started – Uso avanzato server & Autenticazione semplice

#### Uso avanzato server (03-GettingStarted/10-advanced)
- **Nuovo capitolo aggiunto**: Introdotta guida completa all’uso avanzato del server MCP, coprendo sia architetture server regolari sia a basso livello
  - **Server regolare vs basso livello**: Comparazione dettagliata ed esempi di codice in Python e TypeScript per entrambe le modalità
  - **Design basato su handler**: Spiegazione della gestione di strumenti/risorse/prompt basata su handler per implementazioni server scalabili e flessibili
  - **Pattern pratici**: Scenari reali dove i pattern server a basso livello risultano vantaggiosi per funzionalità e architettura avanzate.
#### Autenticazione Semplice (03-GettingStarted/11-simple-auth)
- **Nuovo Capitolo Aggiunto**: Guida passo-passo per implementare l'autenticazione semplice nei server MCP.
  - **Concetti di Autenticazione**: Spiegazione chiara di autenticazione vs autorizzazione e gestione delle credenziali.
  - **Implementazione di Autenticazione Base**: Pattern di autenticazione basati su middleware in Python (Starlette) e TypeScript (Express), con esempi di codice.
  - **Progressione verso la Sicurezza Avanzata**: Indicazioni su come iniziare con l'autenticazione semplice e avanzare a OAuth 2.1 e RBAC, con riferimenti a moduli di sicurezza avanzata.

Questi aggiunte forniscono guida pratica e operativa per costruire implementazioni di server MCP più robuste, sicure e flessibili, collegando concetti di base con pattern avanzati per la produzione.

## 29 Settembre 2025

### Laboratori di Integrazione Database per Server MCP - Percorso di Apprendimento Pratico Completo

#### 11-MCPServerHandsOnLabs - Nuovo Curriculum Completo di Integrazione Database
- **Percorso di Apprendimento Completo di 13 Laboratori**: Aggiunto curriculum pratico completo per costruire server MCP pronti per la produzione con integrazione database PostgreSQL
  - **Implementazione dal Mondo Reale**: Caso d'uso di analytics Zava Retail che dimostra pattern di livello enterprise
  - **Progressione di Apprendimento Strutturata**:
    - **Laboratori 00-03: Fondamenti** - Introduzione, Architettura Core, Sicurezza & Multi-Tenancy, Configurazione Ambiente
    - **Laboratori 04-06: Costruzione del Server MCP** - Progettazione Database & Schema, Implementazione Server MCP, Sviluppo Strumenti  
    - **Laboratori 07-09: Funzionalità Avanzate** - Integrazione Ricerca Semantica, Testing & Debugging, Integrazione con VS Code
    - **Laboratori 10-12: Produzione & Best Practice** - Strategie di Deploy, Monitoraggio & Osservabilità, Best Practice & Ottimizzazione
  - **Tecnologie Enterprise**: Framework FastMCP, PostgreSQL con pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Funzionalità Avanzate**: Row Level Security (RLS), ricerca semantica, accesso multi-tenant ai dati, vettori di embedding, monitoraggio in tempo reale

#### Standardizzazione della Terminologia - Conversione da Modulo a Laboratorio
- **Aggiornamento Completo della Documentazione**: Aggiornati sistematicamente tutti i file README in 11-MCPServerHandsOnLabs per utilizzare la terminologia "Laboratorio" invece di "Modulo"
  - **Intestazioni Sezioni**: Aggiornato "What This Module Covers" a "What This Lab Covers" in tutti i 13 laboratori
  - **Descrizione Contenuti**: Modificato "This module provides..." in "This lab provides..." in tutta la documentazione
  - **Obiettivi di Apprendimento**: Aggiornato "By the end of this module..." in "By the end of this lab..."
  - **Link di Navigazione**: Convertiti tutti i riferimenti "Module XX:" in "Lab XX:" nei riferimenti incrociati e navigazione
  - **Tracciamento Completamento**: Aggiornato "After completing this module..." in "After completing this lab..."
  - **Riferimenti Tecnici Preservati**: Mantenuti riferimenti a moduli Python nei file di configurazione (es. `"module": "mcp_server.main"`)

#### Potenziamento della Guida di Studio (study_guide.md)
- **Mappa Visiva del Curriculum**: Aggiunta nuova sezione "11. Database Integration Labs" con visualizzazione completa della struttura dei laboratori
- **Struttura del Repository**: Aggiornata da dieci a undici sezioni principali con descrizione dettagliata di 11-MCPServerHandsOnLabs
- **Indicazioni sul Percorso di Apprendimento**: Migliorate istruzioni di navigazione per coprire le sezioni 00-11
- **Copertura Tecnologica**: Aggiunte dettagli di FastMCP, PostgreSQL, integrazione servizi Azure
- **Risultati di Apprendimento**: Sottolineato sviluppo server pronti per la produzione, pattern di integrazione database e sicurezza enterprise

#### Potenziamento della Struttura del README Principale
- **Terminologia Basata su Laboratori**: Aggiornato README.md principale in 11-MCPServerHandsOnLabs per usare coerentemente la struttura "Laboratorio"
- **Organizzazione del Percorso di Apprendimento**: Progressione chiara da concetti fondamentali a implementazione avanzata fino al deploy in produzione
- **Focus sul Mondo Reale**: Enfasi su apprendimento pratico con pattern e tecnologie di livello enterprise

### Miglioramenti alla Qualità e Coerenza della Documentazione
- **Enfasi sull’Apprendimento Pratico**: Rinforzato approccio laboratori pratici in tutta la documentazione
- **Focus su Pattern Enterprise**: Evidenziate implementazioni pronte per la produzione e considerazioni di sicurezza enterprise
- **Integrazione Tecnologica**: Copertura esaustiva dei moderni servizi Azure e pattern di integrazione AI
- **Progressione Didattica**: Percorso chiaro e strutturato da concetti base fino al deploy in produzione

## 26 Settembre 2025

### Potenziamento Case Study - Integrazione GitHub MCP Registry

#### Case Study (09-CaseStudy/) - Focus su Sviluppo Ecosistema
- **README.md**: Espansione importante con case study completo sul GitHub MCP Registry
  - **Case Study GitHub MCP Registry**: Nuovo case study completo che analizza il lancio del GitHub MCP Registry a settembre 2025
    - **Analisi del Problema**: Esame dettagliato delle sfide di discovery e deploy frammentati dei server MCP
    - **Architettura della Soluzione**: Approccio centralizzato del registro con installazione one-click su VS Code
    - **Impatto Business**: Miglioramenti misurabili in onboarding e produttività sviluppatori
    - **Valore Strategico**: Focus sul deploy modulare degli agenti e interoperabilità cross-tool
    - **Sviluppo Ecosistema**: Posizionamento come piattaforma fondamentale per integrazione agentica
  - **Struttura Case Study Migliorata**: Aggiornati tutti e sette case study con formattazione coerente e descrizioni complete
    - Azure AI Travel Agents: Enfasi su orchestrazione multi-agente
    - Integrazione Azure DevOps: Focus su automazione workflow
    - Recupero Documentazione Real-Time: Implementazione client console Python
    - Generatore Interattivo di Piani di Studio: Web app conversazionale Chainlit
    - Documentazione In-Editor: Integrazione VS Code e GitHub Copilot
    - Gestione API Azure: Pattern di integrazione API enterprise
    - GitHub MCP Registry: Sviluppo ecosistema e piattaforma comunitaria
  - **Conclusione Completa**: Sezione conclusiva riscritta evidenziando sette case study che coprono molteplici dimensioni di implementazione MCP
    - Integrazione Enterprise, Orchestrazione Multi-Agente, Produttività Sviluppatori
    - Sviluppo Ecosistema, Applicazioni Educative categorizzate
    - Approfondimenti su pattern architetturali, strategie di implementazione e best practice
    - Enfasi su MCP come protocollo maturo e pronto per la produzione

#### Aggiornamenti Guida di Studio (study_guide.md)
- **Mappa Visiva del Curriculum**: Mindmap aggiornata per includere GitHub MCP Registry nella sezione Case Studies
- **Descrizione Case Study**: Migliorata da descrizioni generiche a suddivisione dettagliata di sette case study completi
- **Struttura Repository**: Aggiornata sezione 10 per riflettere la copertura completa dei case study con dettagli specifici di implementazione
- **Integrazione Changelog**: Aggiunta voce del 26 settembre 2025 che documenta l’aggiunta del GitHub MCP Registry e miglioramenti case study
- **Aggiornamenti Data**: Footer aggiornato per riflettere l’ultima revisione (26 settembre 2025)

### Miglioramenti alla Qualità della Documentazione
- **Coerenza Migliorata**: Formattazione e struttura case study standardizzate su tutti e sette esempi
- **Copertura Completa**: Case study ora coprono scenari enterprise, produttività sviluppatori e sviluppo ecosistema
- **Posizionamento Strategico**: Focus rafforzato su MCP come piattaforma fondamentale per il deploy di sistemi agentici
- **Integrazione Risorse**: Risorse aggiuntive aggiornate con link al GitHub MCP Registry

## 15 Settembre 2025

### Espansione Tematiche Avanzate - Trasporti Personalizzati & Ingegneria del Contesto

#### Trasporti Personalizzati MCP (05-AdvancedTopics/mcp-transport/) - Nuova Guida di Implementazione Avanzata
- **README.md**: Guida completa per implementazione di meccanismi di trasporto MCP personalizzati
  - **Trasporto Azure Event Grid**: Implementazione completa di trasporto serverless basato su eventi
    - Esempi in C#, TypeScript e Python con integrazione Azure Functions
    - Pattern architetturali event-driven per soluzioni scalabili MCP
    - Ricevitori webhook e gestione messaggi push-based
  - **Trasporto Azure Event Hubs**: Implementazione trasporto streaming ad alto throughput
    - Capacità streaming in tempo reale per scenari a bassa latenza
    - Strategie di partizionamento e gestione checkpoint
    - Batch di messaggi e ottimizzazione delle prestazioni
  - **Pattern di Integrazione Enterprise**: Esempi architetturali pronti per la produzione
    - Elaborazione MCP distribuita su più Azure Functions
    - Architetture ibride di trasporto che combinano più tipi di trasporto
    - Durabilità, affidabilità e strategie di gestione errori dei messaggi
  - **Sicurezza & Monitoraggio**: Integrazione Azure Key Vault e pattern di osservabilità
    - Autenticazione con identità gestita e accesso a minor privilegio
    - Telemetria con Application Insights e monitoraggio performance
    - Circuit breaker e pattern di tolleranza ai guasti
  - **Framework di Testing**: Strategie di test complete per trasporti personalizzati
    - Testing unitario con test double e mocking frameworks
    - Testing di integrazione con Azure Test Containers
    - Considerazioni su testing performance e carico

#### Ingegneria del Contesto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina emergente AI
- **README.md**: Esplorazione approfondita dell’ingegneria del contesto come campo emergente
  - **Principi Fondamentali**: Condivisione completa del contesto, consapevolezza delle decisioni d’azione e gestione delle finestre di contesto
  - **Allineamento al Protocollo MCP**: Come il design MCP affronta le sfide di ingegneria del contesto
    - Limitazioni della finestra di contesto e strategie di caricamento progressivo
    - Determinazione della rilevanza e recupero dinamico del contesto
    - Gestione multimodale del contesto e considerazioni di sicurezza
  - **Approcci di Implementazione**: Architetture single-threaded vs multi-agente
    - Tecniche di segmentazione e prioritizzazione del contesto
    - Caricamento progressivo e strategie di compressione del contesto
    - Approcci stratificati del contesto e ottimizzazione del recupero
  - **Framework di Misurazione**: Metriche emergenti per valutare l’efficacia del contesto
    - Efficienza input, performance, qualità e considerazioni UX
    - Approcci sperimentali per ottimizzazione del contesto
    - Analisi dei fallimenti e metodologie di miglioramento

#### Aggiornamenti Navigazione Curriculum (README.md)
- **Struttura Modulo Potenziata**: Tabella curriculum aggiornata per includere nuove tematiche avanzate
  - Aggiunti contesto ingegneria (5.14) e trasporto personalizzato (5.15)
  - Formattazione coerente e link di navigazione per tutti i moduli
  - Descrizioni aggiornate per riflettere il contenuto attuale

### Miglioramenti Struttura Directory
- **Standardizzazione Nomi**: Rinominata cartella "mcp transport" in "mcp-transport" per coerenza con altre cartelle tematiche avanzate
- **Organizzazione Contenuti**: Tutte le cartelle 05-AdvancedTopics ora usano pattern di naming coerente (mcp-[topic])

### Miglioramenti Qualità Documentazione
- **Allineamento Specifica MCP**: Tutti i nuovi contenuti fanno riferimento alla MCP Specification 2025-06-18
- **Esempi Multi-Lingua**: Esempi di codice completi in C#, TypeScript e Python
- **Focus Enterprise**: Pattern pronti per la produzione e integrazione cloud Azure ovunque
- **Documentazione Visiva**: Diagrammi Mermaid per architettura e flussi

## 18 Agosto 2025

### Aggiornamento Completo Documentazione - Standard MCP 2025-06-18

#### Best Practice Sicurezza MCP (02-Security/) - Modernizzazione Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Riscrittura completa allineata alla MCP Specification 2025-06-18
  - **Requisiti Obbligatori**: Aggiunti requisiti espliciti MUST/MUST NOT dalla specifica ufficiale con indicatori visivi chiari
  - **12 Pratiche Fondamentali di Sicurezza**: Ristrutturato da lista di 15 voci a domini di sicurezza completi
    - Sicurezza Token & Autenticazione con integrazione provider identità esterni
    - Gestione Sessioni & Sicurezza Trasporto con requisiti crittografici
    - Protezione Minacce AI specifica con integrazione Microsoft Prompt Shields
    - Controllo Accessi & Permessi con principio di minor privilegio
    - Sicurezza Contenuti & Monitoraggio con integrazione Azure Content Safety
    - Sicurezza Supply Chain con verifica completa componenti
    - Sicurezza OAuth & Prevenzione Confused Deputy con implementazione PKCE
    - Risposta Incidenti & Recupero con capacità automatizzate
    - Compliance & Governance con allineamento regolamentare
    - Controlli Sicurezza Avanzati con architettura zero trust
    - Integrazione Ecosistema Sicurezza Microsoft con soluzioni complete
    - Evoluzione Continua della Sicurezza con pratiche adattive
  - **Soluzioni Microsoft Sicurezza**: Guida migliorata per integrazione Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security
  - **Risorse Implementazione**: Link risorse categorizzati in Documentazione MCP Ufficiale, Soluzioni Sicurezza Microsoft, Standard di Sicurezza e Guide Implementazione

#### Controlli di Sicurezza Avanzati (02-Security/) - Implementazione Enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Ristrutturazione completa con framework di sicurezza enterprise
  - **9 Domini Completi di Sicurezza**: Espansi dai controlli base a framework dettagliato enterprise
    - Autenticazione Avanzata & Autorizzazione con integrazione Microsoft Entra ID
    - Sicurezza Token & Controlli Anti-Passthrough con validazione completa
    - Controlli Sicurezza Sessione con prevenzione hijacking
    - Controlli Sicurezza AI specifici con prevenzione injection e avvelenamento tool
    - Prevenzione Attacchi Confused Deputy con sicurezza proxy OAuth
    - Sicurezza Esecuzione Tool con sandboxing e isolamento
    - Controlli Sicurezza Supply Chain con verifica dipendenze
    - Controlli Monitoraggio & Rilevamento con integrazione SIEM
    - Risposta Incidenti & Recupero con capacità automatizzate
  - **Esempi Implementazione**: Blocchi di configurazione YAML dettagliati ed esempi codice
  - **Integrazione Soluzioni Microsoft**: Copertura completa servizi sicurezza Azure, GitHub Advanced Security e gestione identità enterprise

#### Tematiche Avanzate Sicurezza (05-AdvancedTopics/mcp-security/) - Implementazione Pronta Produzione
- **README.md**: Riscrittura completa per implementazione sicurezza enterprise
  - **Allineamento alla Specifica Corrente**: Aggiornato alla MCP Specification 2025-06-18 con requisiti obbligatori di sicurezza
  - **Autenticazione Potenziata**: Integrazione Microsoft Entra ID con esempi completi in .NET e Java Spring Security
  - **Integrazione Sicurezza AI**: Implementazione Microsoft Prompt Shields e Azure Content Safety con esempi dettagliati Python
  - **Mitigazione Avanzata Minacce**: Esempi completi per
    - Prevenzione Attacchi Confused Deputy con PKCE e validazione consenso utente
    - Prevenzione Passthrough Token con validazione audience e gestione sicura token
    - Prevenzione Hijacking Sessione con binding crittografico e analisi comportamentale
  - **Integrazione Sicurezza Enterprise**: Monitoraggio con Azure Application Insights, pipeline rilevamento minacce e sicurezza supply chain
  - **Checklist Implementazione**: Controlli di sicurezza obbligatori vs raccomandati chiari con benefici ecosistema sicurezza Microsoft

### Qualità Documentazione & Allineamento Standard
- **Riferimenti alla Specifica**: Aggiornati tutti i riferimenti alla Specifica MCP attuale 2025-06-18  
- **Ecosistema di Sicurezza Microsoft**: Indicazioni di integrazione migliorate in tutta la documentazione sulla sicurezza  
- **Implementazione Pratica**: Aggiunti esempi di codice dettagliati in .NET, Java e Python con pattern aziendali  
- **Organizzazione delle Risorse**: Categorizzazione completa della documentazione ufficiale, standard di sicurezza e guide di implementazione  
- **Indicatori Visivi**: Segnalazione chiara dei requisiti obbligatori rispetto alle pratiche raccomandate  


#### Concetti Fondamentali (01-CoreConcepts/) - Modernizzazione Completa  
- **Aggiornamento Versione Protocollo**: Aggiornato per fare riferimento alla Specifica MCP attuale 2025-06-18 con versionamento basato su data (formato YYYY-MM-DD)  
- **Raffinamento dell'Architettura**: Descrizioni migliorate di Host, Client e Server per rispecchiare i pattern architetturali MCP attuali  
  - Host ora chiaramente definiti come applicazioni AI che coordinano molteplici connessioni client MCP  
  - Client descritti come connettori di protocollo mantenendo relazioni uno-a-uno con il server  
  - Server potenziati con scenari di deployment locale vs. remoto  
- **Ristrutturazione delle Primitive**: Revisione completa delle primitive di server e client  
  - Primitive Server: Risorse (fonti dati), Prompt (modelli), Strumenti (funzioni eseguibili) con spiegazioni dettagliate ed esempi  
  - Primitive Client: Campionamento (completamenti LLM), Elicitazione (input utente), Logging (debugging/monitoraggio)  
  - Aggiornata con pattern attuali di metodi di scoperta (`*/list`), recupero (`*/get`), ed esecuzione (`*/call`)  
- **Architettura del Protocollo**: Introdotto modello ad architettura a due livelli  
  - Livello Dati: Fondazione JSON-RPC 2.0 con gestione del ciclo di vita e primitive  
  - Livello Trasporto: Meccanismi di trasporto STDIO (locale) e HTTP Streamable con SSE (remoto)  
- **Framework di Sicurezza**: Principi di sicurezza comprensivi inclusi consenso esplicito dell’utente, protezione della privacy dei dati, sicurezza nell’esecuzione degli strumenti e sicurezza del livello trasporto  
- **Pattern di Comunicazione**: Aggiornati i messaggi di protocollo per mostrare i flussi di inizializzazione, scoperta, esecuzione e notifica  
- **Esempi di Codice**: Esempi multilingua aggiornati (.NET, Java, Python, JavaScript) per riflettere i pattern attuali dell’SDK MCP  


#### Sicurezza (02-Security/) - Revisione Completa della Sicurezza  
- **Allineamento agli Standard**: Piena conformità con i requisiti di sicurezza della Specifica MCP 2025-06-18  
- **Evoluzione dell’Autenticazione**: Documentata evoluzione da server OAuth personalizzati a delega tramite provider di identità esterni (Microsoft Entra ID)  
- **Analisi delle Minacce Specifiche AI**: Copertura ampliata dei vettori di attacco AI moderni  
  - Scenari dettagliati di attacchi di injection di prompt con esempi reali  
  - Meccanismi di avvelenamento degli strumenti e pattern di attacco "rug pull"  
  - Avvelenamento della finestra del contesto e attacchi di confusione del modello  
- **Soluzioni di Sicurezza AI Microsoft**: Copertura esaustiva dell’ecosistema di sicurezza Microsoft  
  - Scudi per prompt AI con tecniche avanzate di rilevamento, evidenziazione e delimitazione  
  - Pattern di integrazione Azure Content Safety  
  - Sicurezza avanzata GitHub per la protezione della supply chain  
- **Mitigazione Avanzata delle Minacce**: Controlli di sicurezza dettagliati per  
  - Hijacking di sessione con scenari specifici MCP e requisiti crittografici per ID di sessione  
  - Problemi di confused deputy negli scenari proxy MCP con requisiti di consenso esplicito  
  - Vulnerabilità di token passthrough con controlli di validazione obbligatori  
- **Sicurezza della Supply Chain**: Copertura estesa della supply chain AI inclusi modelli foundation, servizi di embeddings, provider di contesto e API di terze parti  
- **Sicurezza Fondamentale**: Integrazione migliorata con pattern di sicurezza aziendale inclusa architettura zero trust ed ecosistema di sicurezza Microsoft  
- **Organizzazione delle Risorse**: Link a risorse categorizzate per tipo (Documenti Ufficiali, Standard, Ricerca, Soluzioni Microsoft, Guide di Implementazione)  


### Miglioramenti della Qualità della Documentazione  
- **Obiettivi di Apprendimento Strutturati**: Obiettivi di apprendimento migliorati con risultati specifici e azionabili  
- **Riferimenti Incrociati**: Aggiunti collegamenti tra argomenti di sicurezza e concetti fondamentali collegati  
- **Informazioni Aggiornate**: Aggiornate tutte le date di riferimento e i link alle specifiche secondo gli standard attuali  
- **Indicazioni per l’Implementazione**: Aggiunte linee guida specifiche e azionabili lungo entrambe le sezioni  


## 16 Luglio 2025  

### Miglioramenti README e Navigazione  
- Riprogettata completamente la navigazione del curriculum in README.md  
- Sostituiti i tag `<details>` con un formato a tabella più accessibile  
- Create opzioni di layout alternative nella nuova cartella "alternative_layouts"  
- Aggiunti esempi di navigazione basati su schede, a fisarmonica e a card  
- Aggiornata la sezione struttura del repository per includere tutti i file più recenti  
- Migliorata la sezione "Come Usare Questo Curriculum" con raccomandazioni chiare  
- Aggiornati i link alla specifica MCP per puntare agli URL corretti  
- Aggiunta la sezione Engineering del Contesto (5.14) alla struttura del curriculum  

### Aggiornamenti della Guida di Studio  
- Guida di studio completamente revisionata per allinearsi con la struttura attuale del repository  
- Aggiunte nuove sezioni per MCP Clients e Tools, e Server MCP Popolari  
- Aggiornata la Mappa Visiva del Curriculum per riflettere accuratamente tutti gli argomenti  
- Migliorate le descrizioni degli Argomenti Avanzati coprendo tutte le aree specializzate  
- Aggiornata la sezione Case Studies per riflettere esempi reali  
- Aggiunto questo changelog completo  

### Contributi della Comunità (06-CommunityContributions/)  
- Aggiunte informazioni dettagliate sui server MCP per la generazione di immagini  
- Aggiunta sezione completa sull’utilizzo di Claude in VSCode  
- Aggiunte istruzioni di configurazione e uso del client terminale Cline  
- Aggiornata la sezione client MCP per includere tutte le opzioni client popolari  
- Migliorati gli esempi di contributo con campioni di codice più accurati  

### Argomenti Avanzati (05-AdvancedTopics/)  
- Organizzate tutte le cartelle di argomenti specializzati con denominazioni coerenti  
- Aggiunti materiali e esempi di context engineering  
- Aggiunta documentazione di integrazione agente Foundry  
- Migliorata la documentazione di integrazione di sicurezza Entra ID  

## 11 Giugno 2025  

### Creazione Iniziale  
- Rilasciata la prima versione del curriculum MCP for Beginners  
- Creata struttura base per tutte le 10 sezioni principali  
- Implementata Mappa Visiva del Curriculum per la navigazione  
- Aggiunti progetti di esempio iniziali in più linguaggi di programmazione  

### Getting Started (03-GettingStarted/)  
- Creati i primi esempi di implementazione server  
- Aggiunte linee guida per lo sviluppo client  
- Incluse istruzioni per integrazione client LLM  
- Aggiunta documentazione per integrazione VS Code  
- Implementati esempi server con Server-Sent Events (SSE)  

### Concetti Fondamentali (01-CoreConcepts/)  
- Aggiunta spiegazione dettagliata dell’architettura client-server  
- Creata documentazione sui componenti chiave del protocollo  
- Documentati i pattern di messaggistica in MCP  

## 23 Maggio 2025  

### Struttura del Repository  
- Inizializzato il repository con struttura base di cartelle  
- Creati file README per ogni sezione principale  
- Impostata infrastruttura per la traduzione  
- Aggiunti asset immagine e diagrammi  

### Documentazione  
- Creato README.md iniziale con panoramica del curriculum  
- Aggiunti CODE_OF_CONDUCT.md e SECURITY.md  
- Impostato SUPPORT.md con indicazioni per ottenere aiuto  
- Creata struttura preliminare della guida di studio  

## 15 Aprile 2025  

### Pianificazione e Framework  
- Pianificazione iniziale per il curriculum MCP for Beginners  
- Definiti obiettivi di apprendimento e pubblico target  
- Delineata la struttura del curriculum in 10 sezioni  
- Sviluppato framework concettuale per esempi e case study  
- Creati esempi prototipo iniziali per i concetti chiave  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->