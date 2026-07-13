# Registro delle modifiche: Curriculum MCP per principianti

Questo documento serve come registro di tutte le modifiche significative apportate al curriculum Model Context Protocol (MCP) per principianti. Le modifiche sono documentate in ordine cronologico inverso (prime le più recenti).

## 2 luglio 2026

### Lezione nuova: Release Candidate della specifica MCP 2026-07-28

È stata aggiunta la copertura del prossimo candidato alla release della specifica MCP `2026-07-28` (annunciato il 21 maggio 2026; rilascio finale programmato per il 28 luglio 2026), riassunto dal [post ufficiale sul blog di annuncio](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). La baseline del curriculum rimane **Specificazione MCP 2025-11-25** fino alla distribuzione della nuova versione, quindi questo è presentato come guida prospettica piuttosto che come riscrittura delle lezioni esistenti.

- **Nuovo**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — lezione completa che copre il core del protocollo senza stato (rimozione della stretta di mano `initialize` e di `Mcp-Session-Id`), i nuovi header di routing `Mcp-Method`/`Mcp-Name`, i metadati di caching `ttlMs`/`cacheScope`, W3C Trace Context in `_meta`, il framework formale per le Estensioni (App MCP e la nuova estensione Tasks), sei SEP per il rafforzamento dell’autorizzazione, la deprecazione di Roots/Sampling/Logging e la transizione a JSON Schema 2020-12 completo per gli schemi degli strumenti.
- **Aggiornato** con richiamo prospettico verso la nuova lezione:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): nota sulla versione del protocollo, sezioni Sampling/Roots/Logging/Tasks e "Cosa c'è dopo"
  - [02-Security/README.md](./02-Security/README.md): richiamo per il rafforzamento dell’autorizzazione
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): richiamo sul trasporto senza stato
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): richiamo sulla deprecazione di Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): richiamo sulla deprecazione di Logging e sull’estensione Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): richiamo sul routing senza stato/sessione
  - [README.md](./README.md): nota "Guardando avanti" nella sezione della specifica e nuova voce `1.1` nella tabella dei moduli del curriculum
  - [study_guide.md](./study_guide.md): bullet prospettico nella panoramica Core Concepts e nota datata di addendum
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): richiamo sulla mappatura di trasporto `mcp-session-id` in vista del modello di richiesta senza stato
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): richiamo panoramica modulo su deprecazioni Root Contexts/Sampling e estensione Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): richiamo sul rafforzamento dell’autorizzazione

## 24 giugno 2026

### Lezione nuova: Usare MCP nell’app Copilot

- [Sezione Tooling](./12-tooling/README.md) aggiunta sezione tooling.
- [MCP nell’app Copilot](./12-tooling/01-copilot-app/README.md)

## 16 giugno 2026

### Allineamento alla specifica MCP e validazione esempi

Validato il curriculum rispetto alla **Specificazione MCP 2025-11-25** attuale e agli ultimi SDK ufficiali, quindi corrette le restanti referenze obsolete alla specifica e confermato che i campioni core costruiscono e funzionano ancora.

#### Correzioni versione specifica (2025-06-18 / 2025-03-26 → 2025-11-25)

Aggiornati i contenuti in inglese dove ancora si sosteneva che una revisione precedente della specifica fosse lo standard *corrente/più recente*, rimandando i link ai percorsi canonici `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: aggiornati banner "Standard attuale", introduzione, intestazione principi di sicurezza core, intestazione requisiti obbligatori, sezione Microsoft Entra ID, link Riferimenti & Risorse e avviso finale di sicurezza (8 riferimenti) alla versione 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: aggiornato link specifica Risorse Aggiuntive e banner "Standard attuale" a 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: sostituito il link security-and-trust `2025-03-26` obsoleto con la pagina attuale 2025-11-25 sulle best practice di sicurezza
- **03-GettingStarted/14-sampling/README.md**: aggiornato link documentazione ufficiale sampling a 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: aggiornati riferimento presente al "currente MCP specification" e link risorse aggiuntive alla 2025-11-25 (note storiche sulla deprecazione SSE lasciate inalterate per accuratezza)

#### Validazione esempi con SDK attuali

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ha risolto `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passato senza errori di tipo — API `McpServer`/`StdioServerTransport` esistenti ancora valide
- **Python (03-GettingStarted/01-first-server/solution/python)**: validato in ambiente isolato `.venv` con `mcp[cli]` (1.27.2); `py_compile` passato e `FastMCP.list_tools()` ha restituito correttamente strumenti `add` e `subtract`
- Confermato che tutte le versioni range `@modelcontextprotocol/sdk` dei campioni (`>=1.26.0` / `^1.26.0` / `^1.27.0`) risolvono correttamente alla versione attuale `1.29.0` senza cambiamenti API breaking

#### Allineamento pin dipendenze (chiusura gap versioni)

Aggiornati pin SDK obsoleti affinché ogni esempio segua l’ultima release MCP, conformemente alla convenzione repo-wide:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: aggiornato `@modelcontextprotocol/sdk` da `^1.8.0` a `>=1.26.0` e modificata descrizione pacchetto obsoleta `"updated for MCP 2025-06-18"` in `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: aggiornata dipendenza esatta `mcp==1.23.0` a `mcp>=1.26.0`; rigenerati entrambi `uv.lock` (`uv lock`) affinché i lockfiles risolvano al corrente `mcp 1.27.2` mantenendosi sincronizzati con i manifest

#### Analisi Gap Curriculum — Copertura nuove funzionalità specifica

Verificato che il curriculum copra già tutte le primitive introdotte/estese in MCP 2025-11-25, nessun gap di contenuto rimane:
- **Sampling**: Lezione 03-GettingStarted/14-sampling più 05-AdvancedTopics/mcp-sampling
- **Elicitation (incluso modalità URL)**: Documentata in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documentate in 00-Introduction, 01-CoreConcepts e 05-AdvancedTopics/mcp-root-contexts
- **Tasks (sperimentali, operazioni a lunga esecuzione)**: Documentate in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Annotazioni Strumenti** (`readOnlyHint` / `destructiveHint`): Documentate in 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Rafforzamento sicurezza & risoluzione vulnerabilità dipendenze

Eseguito un audit di sicurezza completo su ogni manifest di dipendenza e sul codice sorgente degli esempi, quindi risolte tutte le segnalazioni npm advisories e un problema di sicurezza a livello di codice. Dopo la correzione, `npm audit` riporta **0 vulnerabilità** in tutte le directory controllate.

#### Vulnerabilità dipendenze npm (transitive) — Risolte

Auditati tutti i 15 file `package-lock.json` committati. Le vulnerabilità erano limitate a dipendenze transitive importate dallo strumento dev MCP Inspector, dal client OpenAI e dallo SDK MCP; tutte ora risolte senza compromettere gli esempi:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: aggiornato `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), che ha risolto le segnalazioni dei pacchetti `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws` inclusi. Aggiunta voce npm `overrides` forzando la versione patched `shell-quote@1.8.4` per eliminare la restate segnalazione critica di `concurrently`; rigenerati entrambi i lockfiles (ora 0 vulnerabilità)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ha aggiornato la dipendenza transitiva `qs` (moderata) a una versione patched
- **03-GettingStarted/samples/javascript**: `npm audit fix` ha aggiornato la dipendenza transitiva `hono` (moderata) a una versione patched
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ha aggiornato la dipendenza transitiva `form-data` (alta) a una versione patched
- **03-GettingStarted/11-simple-auth/solution/typescript**: generato il missing `package-lock.json` per rendere il progetto riproducibile e auditabile (0 vulnerabilità)

#### Correzione sicurezza a livello codice (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: rimosso `shell=True` dallo strumento `open_in_vscode`. La precedente chiamata `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permetteva a metacaratteri shell in un percorso di folder di essere interpretati da `cmd.exe` (vettore di injection comandi). Ora avvia direttamente il `Code.exe` risolto con il folder come argomento — senza shell — equivalente e sicuro.

#### Audit dipendenze Python

- Auditati tutti i set di requisiti Python con `pip-audit`. Nessuna vulnerabilità conosciuta segnalata per `05-AdvancedTopics` e `03-GettingStarted/samples/python` (le loro versioni `mcp` / `httpx` / `pydantic` / `python-dotenv` risolvono a rilascio aggiornato e patched)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` ha segnalato la dipendenza transitoria **`werkzeug` 3.1.1** con tre advisory DoS da nome dispositivo Windows per `safe_join` — `CVE-2025-66221`, `CVE-2026-21860` e `CVE-2026-27199` (tutte risolte in 3.1.6). Aggiunto pin di sicurezza esplicito `werkzeug>=3.1.6` per risolvere la versione patched; verificato che il vincolo si risolve correttamente con la catena `chainlit` / `mcp` / `semantic-kernel`

### Rebranding del nome prodotto

Aggiornati tutti i contenuti del curriculum per riflettere il rebranding prodotto di Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: aggiornato link della community Discord
- **AGENTS.md**: aggiornato riferimento al server Discord
- **README.md**: aggiornati riferimenti all’ecosistema tecnologico
- **study_guide.md**: aggiornati riferimenti ai case study
- **05-AdvancedTopics/README.md**: aggiornato titolo e descrizione del modulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: aggiornate intestazione e descrizione sezione
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: aggiornati titolo e contenuto completo del modulo
- **05-AdvancedTopics/mcp-security-entra/README.md**: aggiornato link cross-reference
- **07-LessonsfromEarlyAdoption/README.md**: aggiornati riferimenti ai case study
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: aggiornato intestazione Sezione 9, badge e funzionalità
- **08-BestPractices/README.md**: aggiornato link della community Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: aggiornato riferimento al canale Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: aggiornato riferimento al deployment del modello
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: aggiornata tabella AI Services
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: aggiornati riferimenti a risorse

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Riferimenti principali al curriculum aggiornati
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Titolo del modulo, panoramica e intestazioni di tutti i moduli aggiornati
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Titolo, obiettivi di apprendimento, istruzioni per la configurazione e risorse aggiornati
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Titolo, obiettivi di apprendimento, tabella degli host MCP e riferimenti incrociati aggiornati
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Titolo, badge, prerequisiti e risorse aggiornati
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Riferimenti Agent Builder e link feedback aggiornati
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Prerequisiti e riferimenti alle estensioni aggiornati

---

## 11 aprile 2026

### Nuova lezione, correzioni documentazione e aggiornamenti dipendenze

#### Nuovo contenuto del curriculum aggiunto

**Modulo 05 - Argomenti Avanzati**
- **Lezione 5.17: Ragionamento Multi-Agente Avversariale con MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nuova guida completa sul pattern di dibattito avversariale per sistemi multi-agente
  - Diagramma architetturale Mermaid: due agenti → server MCP condiviso → trascrizione del dibattito → giudice → verdetto
  - Server di strumenti MCP condiviso (`web_search` + `run_python`) implementato in Python e TypeScript
  - Prompt di sistema contrapposti (PER / CONTRO / Giudice) con requisiti espliciti per l’uso degli strumenti
  - Orchestratore del dibattito in Python, TypeScript e C# che gestisce i turni e instrada gli argomenti
  - Cablaggio MCP `ClientSession` per l’orchestratore verso le chiamate reali agli strumenti
  - Tabella dei casi d’uso (rilevazione allucinazioni, modellazione minacce, revisione design API, verifica fattuale, selezione tecnica)
  - Considerazioni di sicurezza: esecuzione sandboxata, validazione delle chiamate agli strumenti, limitazioni di velocità, logging di audit
  - Esercizio strutturato con tre scenari pratici (code review, decisione architetturale, moderazione dei contenuti)

#### Correzioni della documentazione

**Modulo 03 - Iniziare**
- **05-stdio-server/README.md**: Corretto esempio incompleto di server stdio TypeScript — aggiunta dell’istanza mancante di trasporto (`new StdioServerTransport()`) e chiamata `server.connect(transport)` per allinearsi agli esempi Python e .NET nella stessa sezione
- **14-sampling/README.md**: Corretto refuso — da `"Sampling is an davanced features"` a `"Sampling is an advanced feature"`

#### Aggiornamenti al curriculum

**README.md principale**
- Aggiunta voce 5.17 (Ragionamento Multi-Agente Avversariale con MCP) alla tabella del curriculum con link diretto alla nuova lezione

**05-AdvancedTopics/README.md**
- Aggiunta riga Lezione 5.17 alla tabella delle lezioni

**study_guide.md**
- Aggiunto argomento Ragionamento Multi-Agente Avversariale alla mappa mentale e descrizione testuale degli Argomenti Avanzati

#### Correzioni di codice e sicurezza

**Modulo 05 - Agenti Avversariali (`mcp-adversarial-agents`)**
- **Correzione di sicurezza — injection di comandi**: Sostituito l’interpolazione shell `execSync` con `execFile` + `promisify` nello strumento TypeScript `run_python`, eliminando la superficie di injection (il codice controllato dal LLM viene ora passato come argomento literal argv senza passare per la shell)
- **Event loop dello strumento MCP**: Aggiornato orchestratore del dibattito Python per usare il client `AsyncAnthropic` (invece di `Anthropic` sincrono bloccante), passare una `ClientSession` live ad ogni turno agente, recuperare definizioni degli strumenti tramite `session.list_tools()` ogni turno e inviare blocchi `tool_use` via `session.call_tool()` in un loop finché il modello emette una risposta finale

#### Aggiornamenti dipendenze

- Aggiornato `hono` alla versione 4.12.12 in più pacchetti (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Aggiornato `@hono/node-server` da 1.19.11 a 1.19.13 nei pacchetti TypeScript
- Aggiornato `cryptography` da 46.0.5 a 46.0.7 nei pacchetti Python (laboratori 3 e 4 di 10-StreamliningAIWorkflows)
- Aggiornato `lodash` da 4.17.23 a 4.18.1 in 10-StreamliningAIWorkflows inspector

#### Traduzioni

- Sincronizzate traduzioni per oltre 48 lingue con le ultime modifiche alla sorgente (aggiornamento i18n)

---

## 5 febbraio 2026

### Validazione e miglioramenti di navigazione a livello repository

#### Nuovo contenuto del curriculum aggiunto

**Modulo 03 - Iniziare**
- **12-mcp-hosts/README.md**: Nuova guida completa per la configurazione degli host MCP
  - Esempi di configurazione Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelli JSON di configurazione per tutti i principali host
  - Tabella comparativa tipologie di trasporto (stdio, SSE/HTTP, WebSocket)
  - Risoluzione problemi comuni di connessione
  - Best practice di sicurezza per la configurazione degli host

- **13-mcp-inspector/README.md**: Nuova guida per il debugging con MCP Inspector
  - Metodi di installazione (npx, npm globale, dal sorgente)
  - Connessione ai server via stdio e HTTP/SSE
  - Strumenti di test, risorse e flussi di prompt
  - Integrazione VS Code con MCP Inspector
  - Scenari comuni di debugging con soluzioni

**Modulo 04 - Implementazione Pratica**
- **pagination/README.md**: Nuova guida all’implementazione della paginazione
  - Pattern di paginazione basati su cursore in Python, TypeScript, Java
  - Gestione paginazione lato client
  - Strategie di progettazione cursore (opaco vs strutturato)
  - Raccomandazioni per ottimizzazione delle prestazioni

**Modulo 05 - Argomenti Avanzati**
- **mcp-protocol-features/README.md**: Nuovo approfondimento sulle funzionalità del protocollo
  - Implementazione notifiche di progresso
  - Pattern di cancellazione richieste
  - Template di risorse con pattern URI
  - Gestione ciclo di vita server
  - Controllo livelli di logging
  - Pattern di gestione errori con codici JSON-RPC

#### Correzioni di navigazione (aggiornati 24+ file)

**README principali moduli**
 Ora collegano sia la prima lezione SIA il modulo successivo

**Sotto-file 02-Security**
- Tutti e 5 i documenti supplementari di sicurezza ora hanno sezione “Cosa viene dopo”:

**File 09-CaseStudy**
- Tutti i file di case study ora hanno navigazione sequenziale:

**Laboratori 10-StreamliningAI**
Aggiunta sezione Cosa viene dopo nella panoramica Modulo 10 e nel Modulo 11

#### Correzioni di codice e contenuti

**Aggiornamenti SDK e dipendenze**
Corretta versione vuota openai a `^4.95.0`
Aggiornato SDK da `^1.8.0` a `>=1.26.0`
Aggiornate versioni mcp a `>=1.26.0`

**Fix codice**
Corretto modello non valido `gpt-4o-mini` in `gpt-4.1-mini`

**Fix contenuti**
Corretto link rotto `READMEmd` → `README.md`, corretto header curriculum `Module 1-3` → `Module 0-3`, corretto percorso case-sensitive
Rimossi contenuti duplicati corrotti del Case Study 5

**Miglioramenti guida per principianti**
Aggiunta introduzione, obiettivi di apprendimento e prerequisiti adeguati per principianti

#### Aggiornamenti curriculum

**README.md principale**
- Aggiunte voci 3.12 (Host MCP), 3.13 (Inspector MCP), 4.1 (Paginazione), 5.16 (Funzionalità Protocollo) nella tabella curriculum

**README moduli**
Aggiunte lezioni 12 e 13 alla lista lezioni
Aggiunta sezione Guide pratiche con link a paginazione
Aggiunte lezioni 5.15 (Trasporto personalizzato) e 5.16 (Funzionalità Protocollo)

**study_guide.md**
- Aggiornata mappa mentale con tutti i nuovi argomenti: Configurazione Host MCP, MCP Inspector, Strategie di paginazione, Approfondimento funzionalità protocollo

## 28 gennaio 2026

### Revisione conformità specifiche MCP 2025-11-25

#### Potenziamento concetti chiave (01-CoreConcepts/)
- **Nuovo primitivo client - Roots**: Documentazione completa sul primitivo client Roots che consente ai server di comprendere i confini filesystem e i permessi di accesso
- **Annotazioni per strumenti**: Documentazione sulle annotazioni comportamentali degli strumenti (`readOnlyHint`, `destructiveHint`) per decisioni di esecuzione migliori
- **Chiamata strumenti nel Sampling**: Aggiornata documentazione Sampling per includere parametri `tools` e `toolChoice` per invocazione di strumenti guidata dal modello durante richieste di sampling
- **Elicitazione modalità URL**: Documentazione sull’elicitation basata su URL per interazioni web esterne avviate dal server
- **Tasks (Sperimentale)**: Nuova sezione documentazione sulla funzionalità sperimentale Tasks per wrapper di esecuzione durevole e recupero ritardato risultati
- **Supporto icone**: Segnalato che strumenti, risorse, template risorse e prompt possono ora includere icone come metadata addizionali

#### Aggiornamenti documentazione
- **README.md**: Aggiunta versione specifica MCP 2025-11-25 e spiegazione versionamento basato su data
- **study_guide.md**: Aggiornata mappa curriculum per includere Tasks e Annotazioni strumenti in sezione Concetti Chiave; aggiornato timestamp del documento

#### Verifica conformità specifica
- **Versione protocollo**: Verificato che tutta la documentazione faccia riferimento alla MCP Specification 2025-11-25
- **Allineamento architettura**: Confermata accuratezza della documentazione architettura a due livelli (Data Layer + Transport Layer)
- **Documentazione primitivi**: Validati primitivi server (Resources, Prompts, Tools) e primitivi client (Sampling, Elicitation, Logging, Roots)
- **Meccanismi di trasporto**: Verificata accuratezza documentazione trasporto STDIO e Streamable HTTP
- **Linee guida sicurezza**: Confermata allineamento con documentazione attuale Best Practices MCP Security

#### Principali funzionalità MCP 2025-11-25 documentate
- **OpenID Connect Discovery**: Discovery server di autenticazione tramite OIDC
- **Documenti metadati OAuth Client ID**: Meccanismo raccomandato per registrazione client
- **JSON Schema 2020-12**: Dialetto predefinito per definizioni schema MCP
- **Sistema tier SDK**: Formalizzati requisiti per supporto e manutenzione funzionalità SDK
- **Struttura governance**: Formalizzati Working Groups e Interest Groups nella governance MCP

### Aggiornamento maggiore documentazione sicurezza (02-Security/)

#### Integrazione MCP Security Summit Workshop (Sherpa)
- **Nuova risorsa formazione pratica**: Aggiunta integrazione completa con [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) in tutta la documentazione sicurezza
- **Copertura percorso spedizione**: Documentata progressione completa campo per campo dal Base Camp alla Summit
- **Allineamento OWASP**: Tutte le linee guida di sicurezza ora mappate ai rischi OWASP MCP Azure Security Guide

#### Integrazione OWASP MCP Top 10
- **Nuova sezione**: Aggiunta tabella OWASP MCP Top 10 rischi sicurezza con mitigazioni Azure nel README principale della sicurezza
- **Documentazione basata sui rischi**: Aggiornato mcp-security-controls-2025.md con riferimenti ai rischi OWASP MCP per ogni dominio di sicurezza
- **Architettura di riferimento**: Linkata architettura di riferimento e pattern di implementazione della OWASP MCP Azure Security Guide

#### File sicurezza aggiornati
- **README.md**: Aggiunta panoramica Sherpa Workshop, tabella percorso spedizione, riepilogo rischi OWASP MCP Top 10 e sezione formazione pratica
- **mcp-security-controls-2025.md**: Intestazione aggiornata a febbraio 2026, aggiunti riferimenti rischi OWASP (MCP01-MCP08), corretta incoerenza versione specifica
- **mcp-security-best-practices-2025.md**: Aggiunta sezione risorse Sherpa e OWASP, aggiornato timestamp
- **mcp-best-practices.md**: Sezione formazione pratica con link Sherpa e OWASP
- **azure-content-safety-implementation.md**: Aggiungi riferimento OWASP MCP06, allineamento Sherpa Camp 3 e sezione risorse addizionali

#### Nuovi link risorse aggiunti
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Pagine rischi individuali OWASP MCP (MCP01-MCP10)

### Allineamento specifica MCP 2025-11-25 in tutto il curriculum

#### Modulo 03 - Iniziare
- **Documentazione SDK**: Aggiunto Go SDK alla lista SDK ufficiali; aggiornati tutti riferimenti SDK per allineamento con MCP Specification 2025-11-25
- **Chiarimenti trasporto**: Aggiornate descrizioni trasporto STDIO e HTTP Streaming con riferimenti espliciti alla specifica

#### Modulo 04 - Implementazione Pratica
- **Aggiornamenti SDK**: Aggiunto Go SDK; aggiornata lista SDK con riferimento versione specifica
- **Spec autorizzazioni**: Aggiornato link specifica MCP Authorization alla versione 2025-11-25 attuale

#### Modulo 05 - Argomenti Avanzati
- **Nuove funzionalità**: Nota aggiunta sulle nuove funzionalità MCP Specification 2025-11-25 (Tasks, Annotazioni Strumenti, Elicitazione Modalità URL, Roots)
- **Risorse sicurezza**: Aggiunti link OWASP MCP Top 10 e workshop Sherpa alle referenze addizionali

#### Modulo 06 - Contributi dalla Comunità
- **Lista SDK**: Aggiunti Swift e Rust SDK; aggiornato link specifica a MCP 2025-11-25
- **Riferimento specifica**: Aggiornato link MCP Specification a URL specifica diretta

#### Modulo 07 - Lezioni dall’adozione precoce
- **Aggiornamenti Risorse**: Aggiunto link MCP Specification 2025-11-25 e OWASP MCP Top 10 alle risorse aggiuntive

#### Modulo 08 - Best Practices
- **Versione Specifica**: Aggiornato il riferimento MCP Specification a 2025-11-25
- **Risorse di Sicurezza**: Aggiunti OWASP MCP Top 10 e workshop Sherpa alle referenze aggiuntive

#### Modulo 10 - Ottimizzazione dei Flussi di Lavoro AI
- **Aggiornamento Badge**: Cambiato il badge versione MCP da versione SDK (1.9.3) a versione specifica (2025-11-25)
- **Link Risorse**: Aggiornato link MCP Specification; aggiunto OWASP MCP Top 10

#### Modulo 11 - Laboratori Pratici MCP Server
- **Riferimento Specifica**: Aggiornato link MCP Specification alla versione 2025-11-25
- **Risorse di Sicurezza**: Aggiunto OWASP MCP Top 10 alle risorse ufficiali

## 18 dicembre 2025

### Aggiornamento Documentazione Sicurezza - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Aggiornamento Versione Specifica
- **Aggiornamento Versione Protocollo**: Aggiornato per fare riferimento alla più recente MCP Specification 2025-11-25 (rilasciata il 25 novembre 2025)
  - Aggiornati tutti i riferimenti alla versione specifica da 2025-06-18 a 2025-11-25
  - Aggiornate le date del documento da 18 agosto 2025 a 18 dicembre 2025
  - Verificati tutti i link alle specifiche puntino alla documentazione corrente
- **Validazione Contenuti**: Validazione completa delle best practice di sicurezza rispetto agli standard più recenti
  - **Soluzioni di Sicurezza Microsoft**: Terminologia e link aggiornati per Prompt Shields (precedentemente "rilevamento rischio jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Sicurezza OAuth 2.1**: Confermata l’allineamento alle best practice di sicurezza più recenti di OAuth
  - **Standard OWASP**: Validati i riferimenti OWASP Top 10 per LLM come ancora aggiornati
  - **Servizi Azure**: Verificati tutti i link della documentazione Microsoft Azure e best practice
- **Allineamento Standard**: Confermati aggiornati tutti gli standard di sicurezza citati
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Best Practices di Sicurezza OAuth 2.1
  - Framework di sicurezza e conformità Azure
- **Risorse per Implementazione**: Verificati tutti i link e risorse delle guide di implementazione
  - Patterns di autenticazione Azure API Management
  - Guide di integrazione Microsoft Entra ID
  - Gestione segreti Azure Key Vault
  - Pipeline e soluzioni di monitoraggio DevSecOps

### Assicurazione Qualità Documentazione
- **Conformità Specifica**: Garantito che tutti i requisiti obbligatori di sicurezza MCP (DEVE/DEVE NON) siano allineati alla versione più recente della specifica
- **Aggiornamento Risorse**: Verificati tutti i link esterni a documentazione Microsoft, standard di sicurezza e guide di implementazione
- **Copertura Best Practice**: Confermato ampio trattamento di autenticazione, autorizzazione, minacce specifiche AI, sicurezza della supply chain e patterns enterprise

## 6 ottobre 2025

### Ampliamento Sezione Getting Started – Uso Avanzato Server & Autenticazione Semplice

#### Uso Avanzato Server (03-GettingStarted/10-advanced)
- **Nuovo Capitolo Aggiunto**: Guida completa sull’uso avanzato del server MCP, coprendo sia architettura server regolare che a basso livello.
  - **Server Regolare vs. Basso Livello**: Confronto dettagliato con esempi di codice Python e TypeScript per entrambe le modalità.
  - **Design Basato su Handler**: Spiegazione della gestione di tool/risorsa/prompt basata su handler per implementazioni server scalabili e flessibili.
  - **Patterns Pratici**: Scenari reali in cui i patterns server a basso livello risultano vantaggiosi per funzionalità e architetture avanzate.

#### Autenticazione Semplice (03-GettingStarted/11-simple-auth)
- **Nuovo Capitolo Aggiunto**: Guida passo-passo per implementare autenticazione semplice nei server MCP.
  - **Concetti di Auth**: Spiegazione chiara di autenticazione vs autorizzazione e gestione delle credenziali.
  - **Implementazione Basic Auth**: Patterns di autenticazione middleware in Python (Starlette) e TypeScript (Express), con esempi di codice.
  - **Progressione verso Sicurezza Avanzata**: Indicazioni per iniziare con autenticazione semplice e progredire verso OAuth 2.1 e RBAC, con riferimenti a moduli di sicurezza avanzata.

Questi ampliamenti forniscono indicazioni pratiche per creare implementazioni server MCP più robuste, sicure e flessibili, collegando concetti base a patterns avanzati per produzione.

## 29 settembre 2025

### Laboratori Integrazione Database MCP Server - Percorso Formativo Pratico Completo

#### 11-MCPServerHandsOnLabs - Nuovo Curriculum Completo Integrazione Database
- **Percorso di Apprendimento di 13 Laboratori Completo**: Aggiunto curriculum pratico per costruire server MCP pronti per produzione con integrazione database PostgreSQL
  - **Implementazione Reale**: Caso d’uso di analisi retail Zava dimostra patterns enterprise
  - **Progressione di Apprendimento Strutturata**:
    - **Laboratori 00-03: Fondamenta** – Introduzione, architettura core, sicurezza & multi-tenancy, setup ambiente
    - **Laboratori 04-06: Costruzione MCP Server** – Design & schema DB, implementazione server MCP, sviluppo tool  
    - **Laboratori 07-09: Funzionalità Avanzate** – Integrazione ricerca semantica, testing & debug, integrazione VS Code
    - **Laboratori 10-12: Produzione & Best Practice** – Strategie deployment, monitoraggio & osservabilità, best practice & ottimizzazione
  - **Tecnologie Enterprise**: Framework FastMCP, PostgreSQL con pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Funzionalità Avanzate**: Row Level Security (RLS), ricerca semantica, accesso dati multi-tenant, vettorial embeddings, monitoraggio in tempo reale

#### Standardizzazione Terminologia - Conversione Modulo a Laboratorio
- **Aggiornamento Completo Documentazione**: Aggiornati sistematicamente tutti i file README in 11-MCPServerHandsOnLabs per usare terminologia "Laboratorio" invece di "Modulo"
  - **Intestazioni Sezione**: Aggiornato “What This Module Covers” in “What This Lab Covers” in tutti i 13 laboratori
  - **Descrizione Contenuto**: Modificato “This module provides...” in “This lab provides...” in tutta la documentazione
  - **Obiettivi di Apprendimento**: Aggiornato “By the end of this module...” in “By the end of this lab...”
  - **Link di Navigazione**: Convertiti tutti i riferimenti "Module XX:" in "Lab XX:" nelle cross-referenze e navigazione
  - **Tracciamento Completamento**: Aggiornato “After completing this module...” in “After completing this lab...”
  - **Riferimenti Tecnici Preservati**: Mantenuti riferimenti ai moduli Python (es. `"module": "mcp_server.main"`)

#### Miglioramenti Studio Guide (study_guide.md)
- **Mappa Curriculo Visiva**: Aggiunta nuova sezione "11. Database Integration Labs" con visualizzazione struttura completa dei laboratori
- **Struttura Repository**: Passati da dieci a undici sezioni principali con descrizione dettagliata di 11-MCPServerHandsOnLabs
- **Indicazioni Percorso Apprendimento**: Migliorate istruzioni di navigazione per sezioni 00-11
- **Copertura Tecnologica**: Aggiunti dettagli FastMCP, PostgreSQL, integrazione servizi Azure
- **Risultati di Apprendimento**: Sottolineato sviluppo di server pronti produzione, patterns di integrazione DB e sicurezza enterprise

#### Miglioramento Struttura README Principale
- **Terminologia Basata su Laboratori**: Aggiornato README.md principale in 11-MCPServerHandsOnLabs per usare coerentemente struttura "Lab"
- **Organizzazione Percorso Apprendimento**: Chiara progressione da concetti base a implementazione avanzata fino a deployment in produzione
- **Focus Real-World**: Enfasi su apprendimento pratico con patterns e tecnologie enterprise

### Miglioramenti Qualità & Coerenza Documentazione
- **Focus Apprendimento Pratico**: Rinforzato approccio di apprendimento basato su laboratori
- **Focus Patterns Enterprise**: Evidenziate implementazioni pronte produzione e considerazioni sicurezza enterprise
- **Integrazione Tecnologica**: Copertura completa servizi Azure moderni e patterns di integrazione AI
- **Progressione Apprendimento**: Percorso chiaro e strutturato dal concetto base al deployment in produzione

## 26 settembre 2025

### Potenziamento Case Studies - Integrazione GitHub MCP Registry

#### Case Studies (09-CaseStudy/) - Focus Sviluppo Ecosistema
- **README.md**: Espansione significativa con case study esaustivo su GitHub MCP Registry
  - **GitHub MCP Registry Case Study**: Nuovo case study completo sull’avvio di GitHub MCP Registry a settembre 2025
    - **Analisi Problema**: Esame dettagliato delle sfide frammentazione discovery e deployment server MCP
    - **Architettura Soluzione**: Approccio registry centralizzato di GitHub con installazione VS Code a un clic
    - **Impatto Business**: Miglioramenti misurabili su onboarding e produttività sviluppatori
    - **Valore Strategico**: Focus su deploy modulare agenti e interoperabilità cross-tool
    - **Sviluppo Ecosistema**: Posizionamento come piattaforma fondazionale per integrazione agentica
  - **Struttura Case Studies Migliorata**: Aggiornati tutti e sette case studies con formattazione uniforme e descrizioni esaustive
    - Azure AI Travel Agents: enfasi orchestrazione multi-agente
    - Azure DevOps Integration: focus automazione workflow
    - Real-Time Documentation Retrieval: implementazione client console Python
    - Interactive Study Plan Generator: app conversazionale Chainlit web
    - In-Editor Documentation: integrazione VS Code e GitHub Copilot
    - Azure API Management: patterns integrazione API enterprise
    - GitHub MCP Registry: sviluppo ecosistema e piattaforma comunitaria
  - **Conclusione Completa**: Riscritta sezione conclusiva mettendo in evidenza i sette case studies coprendo molteplici dimensioni MCP
    - Integrazione enterprise, orchestrazione multi-agente, produttività sviluppatori
    - Sviluppo ecosistema, categorizzazione applicazioni educative
    - Approfondimenti su patterns architetturali, strategie implementative e best practice
    - Enfasi su MCP come protocollo maturo e pronto produzione

#### Aggiornamenti Study Guide (study_guide.md)
- **Mappa Curriculo Visiva**: Aggiornata mindmap per includere GitHub MCP Registry nella sezione Case Studies
- **Descrizione Case Studies**: Ampliate da descrizioni generiche a dettagliate analisi di sette casi completi
- **Struttura Repository**: Aggiornata sezione 10 per riflettere copertura completa case studies con dettagli implementativi
- **Integrazione Changelog**: Aggiunta voce 26 settembre 2025 documentante l’aggiunta GitHub MCP Registry e miglioramenti case studies
- **Aggiornamento Date**: Aggiornato timestamp footer a ultima revisione (26 settembre 2025)

### Miglioramenti Qualità Documentazione
- **Coerenza Migliorata**: Standardizzata formattazione e struttura case study per tutti e sette gli esempi
- **Copertura Completa**: Case study ora coprono scenari enterprise, produttività sviluppatori e sviluppo ecosistema
- **Posizionamento Strategico**: Enfasi su MCP come piattaforma fondazionale per deploy sistemi agentici
- **Integrazione Risorse**: Aggiornate risorse aggiuntive con link GitHub MCP Registry

## 15 settembre 2025

### Espansione Temi Avanzati - Trasporti Personalizzati & Context Engineering

#### Trasporti Custom MCP (05-AdvancedTopics/mcp-transport/) - Nuova Guida Implementativa Avanzata
- **README.md**: Guida completa all’implementazione di meccanismi di trasporto MCP personalizzati
  - **Trasporto Azure Event Grid**: Implementazione completa serverless basata su eventi
    - Esempi in C#, TypeScript e Python con integrazione Azure Functions
    - Patterns di architettura event-driven per soluzioni MCP scalabili
    - Ricevitori webhook e gestione messaggi push
  - **Trasporto Azure Event Hubs**: Implementazione trasporto streaming ad alta capacità
    - Capacità streaming real-time per scenari a bassa latenza
    - Strategie di partizionamento e gestione checkpoint
    - Batch di messaggi e ottimizzazione prestazioni
  - **Patterns Integrazione Enterprise**: Esempi architetturali pronti produzione
    - Elaborazione MCP distribuita tra molteplici Azure Functions
    - Architetture trasporto ibride con tipi multipli di trasporto
    - Durabilità messaggi, affidabilità e gestione errori
  - **Sicurezza & Monitoraggio**: Integrazione Azure Key Vault e patterns di osservabilità
    - Autenticazione identità gestita e principio di minimo privilegio
    - Telemetria Application Insights e monitoraggio prestazioni
    - Circuit breakers e patterns resilienza
  - **Framework Testing**: Strategie di test complete per trasporti custom
    - Test unitari con test double e mocking
    - Test integrativi con Azure Test Containers
    - Considerazioni per test performance e carico

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Disciplina AI Emergente
- **README.md**: Esplorazione approfondita del context engineering come campo emergente
  - **Principi Fondamentali**: Condivisione completa del contesto, consapevolezza decisione azioni, gestione finestra contesto
  - **Allineamento Protocollo MCP**: Come il design MCP affronta sfide del context engineering
    - Limitazioni finestre contesto e strategie caricamento progressivo
    - Determinazione rilevanza e recupero dinamico del contesto
    - Gestione multimodale del contesto e considerazioni di sicurezza
  - **Approcci Implementativi**: Architetture single-threaded vs multi-agente
    - Tecniche di suddivisione e prioritizzazione del contesto
    - Caricamento progressivo e compressione del contesto
    - Approcci a strati e ottimizzazione recupero
  - **Framework di Misurazione**: Metriche emergenti per valutazione efficacia contesto
    - Efficienza input, prestazioni, qualità e esperienza utente
    - Approcci sperimentali di ottimizzazione contesto
    - Analisi fallimenti e metodologie di miglioramento

#### Aggiornamenti Navigazione Curricolo (README.md)
- **Struttura Moduli Migliorata**: Aggiornata tabella curriculum per includere nuovi temi avanzati
  - Aggiunti voci Context Engineering (5.14) e Custom Transport (5.15)
  - Formattazione coerente e link di navigazione uniformi in tutti i moduli
  - Descrizioni aggiornate per riflettere ambito contenuto attuale

### Miglioramenti Struttura Directory
- **Standardizzazione Nomi**: Rinominata cartella "mcp transport" in "mcp-transport" per coerenza con altre cartelle temi avanzati
- **Organizzazione Contenuti**: Tutte le cartelle 05-AdvancedTopics ora seguono pattern di naming coerente (mcp-[topic])

### Miglioramenti Qualità Documentazione
- **Allineamento MCP Specification**: Tutti i nuovi contenuti fanno riferimento alla MCP Specification attuale 2025-06-18
- **Esempi Multilingua**: Esempi di codice completi in C#, TypeScript e Python
- **Focus Aziendale**: Pattern pronti per la produzione e integrazione cloud Azure in tutto il progetto
- **Documentazione Visiva**: Diagrammi Mermaid per l’architettura e la visualizzazione dei flussi

## 18 Agosto 2025

### Aggiornamento Completo della Documentazione - Standard MCP 2025-06-18

#### Best Practice di Sicurezza MCP (02-Security/) - Modernizzazione Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Riscrittura completa allineata alla Specifica MCP 2025-06-18
  - **Requisiti Obbligatori**: Aggiunti requisiti espliciti DEVE/DEVE NON dalla specifica ufficiale con indicatori visivi chiari
  - **12 Pratiche Core di Sicurezza**: Ristrutturate da lista di 15 elementi a domini di sicurezza completi
    - Sicurezza Token & Autenticazione con integrazione provider di identità esterno
    - Gestione Sessioni & Sicurezza Trasporto con requisiti crittografici
    - Protezione Minacce Specifiche AI con integrazione Microsoft Prompt Shields
    - Controllo Accessi & Permessi con principio del minimo privilegio
    - Sicurezza Contenuti & Monitoraggio con integrazione Azure Content Safety
    - Sicurezza Supply Chain con verifica completa dei componenti
    - Sicurezza OAuth & Prevenzione Confused Deputy con implementazione PKCE
    - Risposta agli Incidenti & Recupero con capacità automatizzate
    - Conformità & Governance con allineamento regolatorio
    - Controlli Avanzati di Sicurezza con architettura zero trust
    - Integrazione Ecosistema Microsoft Security con soluzioni complete
    - Evoluzione Continua della Sicurezza con pratiche adattive
  - **Soluzioni di Sicurezza Microsoft**: Guida migliorata all’integrazione per Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security
  - **Risorse per l’Implementazione**: Link a risorse categorizzate tra Documentazione Ufficiale MCP, Soluzioni Microsoft Security, Standard di Sicurezza e Guide di Implementazione

#### Controlli di Sicurezza Avanzati (02-Security/) - Implementazione Enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Revisione totale con framework di sicurezza a livello enterprise
  - **9 Domini di Sicurezza Completi**: Espansi da controlli base a framework enterprise dettagliato
    - Autenticazione & Autorizzazione Avanzate con integrazione Microsoft Entra ID
    - Sicurezza Token & Controlli Anti-Passthrough con validazione completa
    - Controlli di Sicurezza Sessione con prevenzione di hijacking
    - Controlli Specifici AI con prevenzione di prompt injection e tool poisoning
    - Prevenzione Attacchi Confused Deputy con sicurezza proxy OAuth
    - Sicurezza Esecuzione Strumenti con sandboxing e isolamento
    - Controlli Sicurezza Supply Chain con verifica dipendenze
    - Controlli Monitoraggio & Rilevamento con integrazione SIEM
    - Risposta agli Incidenti & Recupero con capacità automatizzate
  - **Esempi di Implementazione**: Aggiunti blocchi di configurazione YAML dettagliati ed esempi di codice
  - **Integrazione Soluzioni Microsoft**: Copertura completa servizi di sicurezza Azure, GitHub Advanced Security e gestione identità enterprise

#### Sicurezza Argomenti Avanzati (05-AdvancedTopics/mcp-security/) - Implementazione Pronta per Produzione
- **README.md**: Riscrittura completa per implementazione sicurezza enterprise
  - **Allineamento alla Specifica Corrente**: Aggiornato alla Specifica MCP 2025-06-18 con requisiti di sicurezza obbligatori
  - **Autenticazione Potenziata**: Integrazione Microsoft Entra ID con esempi completi in .NET e Java Spring Security
  - **Integrazione Sicurezza AI**: Implementazione Microsoft Prompt Shields e Azure Content Safety con esempi Python dettagliati
  - **Mitigazione Avanzata delle Minacce**: Esempi completi di implementazione per
    - Prevenzione Attacchi Confused Deputy con PKCE e validazione consenso utente
    - Prevenzione Token Passthrough con validazione audience e gestione sicura token
    - Prevenzione Hijacking Sessione con binding crittografico e analisi comportamentale
  - **Integrazione Sicurezza Enterprise**: Monitoraggio Azure Application Insights, pipeline di rilevamento minacce, e sicurezza supply chain
  - **Checklist Implementazione**: Chiara distinzione tra controlli di sicurezza obbligatori e raccomandati con vantaggi ecosistema Microsoft Security

### Qualità Documentazione & Allineamento Standard
- **Riferimenti Specifica**: Aggiornati tutti i riferimenti alla Specifica MCP 2025-06-18 corrente
- **Ecosistema Sicurezza Microsoft**: Guida all’integrazione migliorata in tutta la documentazione sicurezza
- **Implementazione Pratica**: Inseriti esempi dettagliati in .NET, Java e Python con pattern enterprise
- **Organizzazione Risorse**: Categorizzazione completa documentazione ufficiale, standard di sicurezza e guide implementative
- **Indicatori Visivi**: Chiare marcature dei requisiti obbligatori rispetto alle pratiche raccomandate

#### Concetti Core (01-CoreConcepts/) - Modernizzazione Completa
- **Aggiornamento Versione Protocollo**: Aggiornato per fare riferimento alla Specifica MCP 2025-06-18 con versionamento basato su data (formato AAAA-MM-GG)
- **Raffinamento Architettura**: Descrizioni migliorate di Host, Client e Server per riflettere i pattern architetturali MCP attuali
  - Host ora definiti chiaramente come applicazioni AI che coordinano multiple connessioni client MCP
  - Client descritti come connettori protocollo che mantengono relazioni uno-a-uno con server
  - Server migliorati con scenari di deployment locale vs remoto
- **Ristrutturazione Primitive**: Revisione totale delle primitive server e client
  - Primitive Server: Risorse (fonti dati), Prompt (template), Strumenti (funzioni eseguibili) con spiegazioni ed esempi dettagliati
  - Primitive Client: Campionamento (completamenti LLM), Elicitazione (input utente), Logging (debug/monitoraggio)
  - Aggiornato con pattern metodi discovery (`*/list`), retrieval (`*/get`) e execution (`*/call`)
- **Architettura Protocollo**: Introdotto modello architetturale a due livelli
  - Layer Dati: Fondamento JSON-RPC 2.0 con gestione lifecycle e primitive
  - Layer Trasporto: Meccanismi STDIO (locale) e Streamable HTTP con SSE (remoto)
- **Framework Sicurezza**: Principi di sicurezza completi inclusi consenso esplicito utente, protezione privacy dati, sicurezza esecuzione strumenti, e sicurezza layer trasporto
- **Pattern Comunicazione**: Aggiornati messaggi protocollo per mostrare flussi di inizializzazione, discovery, esecuzione e notifiche
- **Esempi di Codice**: Aggiornati esempi multi-lingua (.NET, Java, Python, JavaScript) per rispecchiare pattern SDK MCP attuali

#### Sicurezza (02-Security/) - Revisione Completa Sicurezza
- **Allineamento Standard**: Completo rispetto ai requisiti di sicurezza della Specifica MCP 2025-06-18
- **Evoluzione Autenticazione**: Documentata evoluzione da server OAuth personalizzati a delega provider identità esterni (Microsoft Entra ID)
- **Analisi Minacce Specifiche AI**: Copertura migliorata dei vettori di attacco AI moderni
  - Scenari dettagliati di attacchi prompt injection con esempi reali
  - Meccanismi di tool poisoning e pattern attacchi "rug pull"
  - Avvelenamento contesto e attacchi di confusione modello
- **Soluzioni Sicurezza AI Microsoft**: Copertura completa dell’ecosistema sicurezza Microsoft
  - AI Prompt Shields con tecniche avanzate di rilevamento, spotlighting e delimitazione
  - Pattern di integrazione Azure Content Safety
  - GitHub Advanced Security per protezione supply chain
- **Mitigazione Minacce Avanzate**: Controlli di sicurezza dettagliati per
  - Hijacking sessione con scenari MCP specifici e requisiti ID sessione crittografici
  - Problemi confused deputy in scenari proxy MCP con requisiti espliciti di consenso
  - Vulnerabilità token passthrough con controlli di validazione obbligatori
- **Sicurezza Supply Chain**: Copertura estesa supply chain AI inclusi foundation models, servizi embedding, provider contesto, e API di terze parti
- **Sicurezza Foundation**: Integrazione avanzata con pattern di sicurezza enterprise inclusa architettura zero trust ed ecosistema Microsoft Security
- **Organizzazione Risorse**: Link a risorse dettagliati categorizzate per tipologia (Documenti Ufficiali, Standard, Ricerca, Soluzioni Microsoft, Guide Implementazione)

### Miglioramenti Qualità Documentazione
- **Obiettivi di Apprendimento Strutturati**: Rafforzati con risultati specifici e azionabili
- **Riferimenti Incrociati**: Aggiunti link tra temi sicurezza e concetti core correlati
- **Informazioni Correnti**: Aggiornati tutti riferimenti data e link specifiche agli standard attuali
- **Guida Implementazione**: Indirizzi specifici, azionabili e migliorati in entrambe le sezioni

## 16 Luglio 2025

### Miglioramenti README e Navigazione
- Ridisegnata completamente la navigazione del curriculum in README.md
- Sostituiti tag `<details>` con formato tabellare più accessibile
- Create opzioni di layout alternative nella nuova cartella "alternative_layouts"
- Aggiunti esempi di navigazione a schede, stile card, e accordion
- Aggiornata sezione struttura repository per includere tutti i file più recenti
- Potenziata sezione "Come Usare Questo Curriculum" con raccomandazioni chiare
- Aggiornati link specifica MCP ai URL corretti
- Aggiunta sezione Context Engineering (5.14) nella struttura curriculum

### Aggiornamenti Guida di Studio
- Rivista completamente la guida di studio per allineamento alla struttura repository attuale
- Aggiunte nuove sezioni per MCP Clients e Tools e server MCP popolari
- Aggiornata mappa visiva del curriculum per riflettere accuratamente tutti i temi
- Potenziata descrizione degli Argomenti Avanzati per coprire tutte le aree specializzate
- Aggiornata sezione Case Studies con esempi reali
- Aggiunto questo changelog completo

### Contributi della Community (06-CommunityContributions/)
- Aggiunte informazioni dettagliate su server MCP per generazione immagini
- Aggiunta sezione completa su utilizzo di Claude in VSCode
- Inserite istruzioni per setup e utilizzo client terminale Cline
- Aggiornata sezione client MCP per includere tutte le opzioni client popolari
- Migliorati esempi di contributo con campioni di codice più precisi

### Argomenti Avanzati (05-AdvancedTopics/)
- Organizzate tutte le cartelle di argomenti specializzati con nomenclatura coerente
- Aggiunti materiali ed esempi di context engineering
- Aggiunta documentazione integrazione agente Foundry
- Potenziata documentazione integrazione sicurezza Entra ID

## 11 Giugno 2025

### Creazione Iniziale
- Rilasciata prima versione del curriculum MCP for Beginners
- Creata struttura base per tutte le 10 sezioni principali
- Implementata Mappa Visiva Curriculum per navigazione
- Aggiunti primi progetti esempio in diversi linguaggi di programmazione

### Getting Started (03-GettingStarted/)
- Creati primi esempi di implementazione server
- Aggiunte linee guida sviluppo client
- Includate istruzioni integrazione client LLM
- Aggiunta documentazione integrazione VS Code
- Implementati esempi server Server-Sent Events (SSE)

### Concetti Core (01-CoreConcepts/)
- Inserite spiegazioni dettagliate di architettura client-server
- Creata documentazione sui componenti chiave protocollo
- Documentati pattern di messaggistica in MCP

## 23 Maggio 2025

### Struttura Repository
- Inizializzato repository con struttura cartelle base
- Create README per ogni sezione principale
- Impostata infrastruttura traduzione
- Aggiunti asset immagini e diagrammi

### Documentazione
- Creato README.md iniziale con panoramica curriculum
- Aggiunti CODE_OF_CONDUCT.md e SECURITY.md
- Impostato SUPPORT.md con indicazioni per assistenza
- Creata struttura preliminare guida di studio

## 15 Aprile 2025

### Pianificazione e Framework
- Pianificazione iniziale del curriculum MCP for Beginners
- Definiti obiettivi di apprendimento e pubblico target
- Tracciata struttura a 10 sezioni del curriculum
- Sviluppato framework concettuale per esempi e casi di studio
- Creati prototipi iniziali per concetti chiave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->