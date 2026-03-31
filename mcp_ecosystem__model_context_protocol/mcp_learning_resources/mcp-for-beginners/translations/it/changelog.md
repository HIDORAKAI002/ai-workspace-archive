# Changelog: Curriculum MCP per Principianti

Questo documento funge da registro di tutte le modifiche significative apportate al curriculum Model Context Protocol (MCP) per Principianti. Le modifiche sono documentate in ordine cronologico inverso (prime le più recenti).

## 5 Febbraio 2026

### Miglioramenti alla Validazione e Navigazione a Livello di Repository

#### Nuovi Contenuti del Curriculum Aggiunti

**Modulo 03 - Introduzione**
- **12-mcp-hosts/README.md**: Nuova guida completa per la configurazione degli host MCP
  - Esempi di configurazione per Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelli di configurazione JSON per tutti gli host principali
  - Tabella comparativa dei tipi di trasporto (stdio, SSE/HTTP, WebSocket)
  - Risoluzione dei problemi comuni di connessione
  - Best practice di sicurezza per la configurazione degli host

- **13-mcp-inspector/README.md**: Nuova guida di debug per MCP Inspector
  - Metodi di installazione (npx, npm globale, da sorgente)
  - Connessione ai server tramite stdio e HTTP/SSE
  - Strumenti di testing, risorse e flussi di lavoro dei prompt
  - Integrazione con VS Code e MCP Inspector
  - Scenari comuni di debug con soluzioni

**Modulo 04 - Implementazione Pratica**
- **pagination/README.md**: Nuova guida per l'implementazione della paginazione
  - Pattern di paginazione basata su cursore in Python, TypeScript, Java
  - Gestione della paginazione lato client
  - Strategie di progettazione del cursore (opaco vs strutturato)
  - Raccomandazioni per l’ottimizzazione delle prestazioni

**Modulo 05 - Argomenti Avanzati**
- **mcp-protocol-features/README.md**: Nuovo approfondimento sulle funzionalità del protocollo
  - Implementazione delle notifiche di avanzamento
  - Pattern di cancellazione delle richieste
  - Template di risorse con pattern URI
  - Gestione del ciclo di vita del server
  - Controllo del livello di logging
  - Pattern di gestione degli errori con codici JSON-RPC

#### Correzioni di Navigazione (aggiornati 24+ file)

**README principali dei Moduli**
 Ora link sia alla prima lezione CHE al modulo successivo

**Sotto-file di Sicurezza 02-Security**
- Tutti i 5 documenti di sicurezza supplementari ora hanno la navigazione “Cosa viene dopo”:

**File 09-CaseStudy**
- Tutti i file dei case study ora hanno navigazione sequenziale:

**Laboratori 10-StreamliningAI**
Aggiunta sezione Cosa viene dopo alla panoramica del Modulo 10 e Modulo 11

#### Correzioni di Codice e Contenuto

**Aggiornamenti SDK e Dipendenze**
Corretto versione openai vuota a `^4.95.0`
Aggiornato SDK da `^1.8.0` a `>=1.26.0`
Aggiornati i vincoli di versione mcp a `>=1.26.0`

**Correzioni di Codice**
Corretto modello non valido `gpt-4o-mini` in `gpt-4.1-mini`

**Correzioni di Contenuto**
Corretto link rotto da `READMEmd` a `README.md`, corretto header curriculum da `Module 1-3` a `Module 0-3`, corretto percorso case-sensitive
Rimosso contenuto duplicato corrotto del Case Study 5

**Miglioramenti alla Guida per Principianti**
Aggiunta introduzione adeguata, obiettivi di apprendimento e prerequisiti per principianti

#### Aggiornamenti del Curriculum

**README principale**
- Aggiunte voci 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) nella tabella del curriculum

**README dei Moduli**
Aggiunte lezioni 12 e 13 alla lista delle lezioni
Aggiunta sezione Guide Pratiche con link alla paginazione
Aggiunte lezioni 5.15 (Custom Transport) e 5.16 (Protocol Features)

**study_guide.md**
- Aggiornata mappa mentale con tutti i nuovi argomenti: Configurazione MCP Hosts, MCP Inspector, Strategie di Paginazione, Approfondimento Funzionalità Protocollo

## 28 Gennaio 2026

### Revisione di Conformità alla Specifica MCP 2025-11-25

#### Miglioramenti ai Concetti Fondamentali (01-CoreConcepts/)
- **Nuovo Primitivo Client - Roots**: Aggiunta documentazione completa sul primitivo client Roots, che consente ai server di comprendere i confini del filesystem e i permessi di accesso
- **Annotazioni degli Strumenti**: Aggiunta documentazione sulle annotazioni comportamentali degli strumenti (`readOnlyHint`, `destructiveHint`) per decisioni migliorate sull’esecuzione degli strumenti
- **Chiamate Strumenti nel Sampling**: Aggiornata documentazione Sampling per includere parametri `tools` e `toolChoice` per l’invocazione di strumenti guidata da modello durante le richieste di campionamento
- **Modalità URL Elicitation**: Aggiunta documentazione sull’elicitation basata su URL per interazioni web esterne avviate dal server
- **Tasks (Sperimentale)**: Nuova sezione che documenta la funzionalità sperimentale Tasks per wrapper di esecuzione durevoli e recupero differito dei risultati
- **Supporto Icone**: Segnalato che strumenti, risorse, template di risorse e prompt possono ora includere icone come metadati aggiuntivi

#### Aggiornamenti alla Documentazione
- **README.md**: Aggiunto riferimento versione Specifica MCP 2025-11-25 e spiegazione del versioning basato su data
- **study_guide.md**: Aggiornata mappa del curriculum per includere Tasks e Annotazioni Strumenti nella sezione Concetti Fondamentali; aggiornato timestamp documento

#### Verifica di Conformità alla Specifica
- **Versione Protocollo**: Verificato che tutta la documentazione faccia riferimento alla Specifica MCP 2025-11-25 attuale
- **Allineamento Architettura**: Confermata accuratezza della documentazione dell’architettura a due livelli (Data Layer + Transport Layer)
- **Documentazione Primitivi**: Validati primitivi server (Resources, Prompts, Tools) e primitivi client (Sampling, Elicitation, Logging, Roots)
- **Meccanismi di Trasporto**: Verificata accuratezza documentazione trasporti STDIO e HTTP Streaming
- **Linee Guida di Sicurezza**: Confermato allineamento con la documentazione attuale delle Best Practice di Sicurezza MCP

#### Principali Funzionalità MCP 2025-11-25 Documentate
- **OpenID Connect Discovery**: Scoperta server di autenticazione tramite OIDC
- **Documenti Metadata Client OAuth ID**: Meccanismo consigliato per registrazione client
- **JSON Schema 2020-12**: Dialetto predefinito per definizioni schema MCP
- **Sistema di Tiering SDK**: Requisiti formalizzati per supporto e manutenzione funzionalità SDK
- **Struttura di Governance**: Formalizzazione di Working Groups e Interest Groups nella governance MCP

### Aggiornamento Importante Documentazione Sicurezza (02-Security/)

#### Integrazione MCP Security Summit Workshop (Sherpa)
- **Nuova Risorsa Formativa Pratica**: Aggiunta integrazione completa con il [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) in tutta la documentazione di sicurezza
- **Copertura del Percorso di Spedizione**: Documentata la progressione completa da Base Camp a Summit
- **Allineamento OWASP**: Tutte le linee guida di sicurezza mappate ora ai rischi OWASP MCP Azure Security Guide

#### Integrazione OWASP MCP Top 10
- **Nuova Sezione**: Aggiunta tabella dei Rischi di Sicurezza OWASP MCP Top 10 con mitigazioni Azure nel README principale di Sicurezza
- **Documentazione Basata su Rischio**: Aggiornato mcp-security-controls-2025.md con riferimenti ai rischi OWASP MCP per ogni dominio di sicurezza
- **Architettura di Riferimento**: Collegamento alla guida di riferimento OWASP MCP Azure Security Guide e pattern di implementazione

#### File di Sicurezza Aggiornati
- **README.md**: Aggiunta panoramica Sherpa Workshop, tabella percorso spedizione, sommario rischi OWASP MCP Top 10 e sezione formazione pratica
- **mcp-security-controls-2025.md**: Aggiornato header a febbraio 2026, aggiunti riferimenti rischi OWASP (MCP01-MCP08), corretta inconsistenza versione specifica
- **mcp-security-best-practices-2025.md**: Aggiunte sezione risorse Sherpa e OWASP, aggiornato timestamp
- **mcp-best-practices.md**: Aggiunta sezione formazione pratica con link Sherpa e OWASP
- **azure-content-safety-implementation.md**: Aggiunto riferimento OWASP MCP06, allineamento Sherpa Campo 3 e sezione risorse aggiuntive

#### Nuovi Link Risorse Aggiunti
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Pagine dei rischi individuali OWASP MCP (MCP01-MCP10)

### Allineamento Curriculum alla Specifica MCP 2025-11-25

#### Modulo 03 - Introduzione
- **Documentazione SDK**: Aggiunto Go SDK alla lista ufficiale SDK; aggiornati riferimenti SDK per allineamento con Specifica MCP 2025-11-25
- **Chiarimento Trasporto**: Aggiornate descrizioni trasporto STDIO e HTTP Streaming con riferimenti espliciti alla specifica

#### Modulo 04 - Implementazione Pratica
- **Aggiornamenti SDK**: Aggiunto Go SDK; lista SDK aggiornata con riferimento versione specifica
- **Spec Autorizzazione**: Aggiornato link alla specifica MCP Authorization alla versione corrente 2025-11-25

#### Modulo 05 - Argomenti Avanzati
- **Nuove Funzionalità**: Aggiunta nota sulle nuove funzionalità MCP Specifica 2025-11-25 (Tasks, Annotazioni Strumenti, Modalità URL Elicitation, Roots)
- **Risorse di Sicurezza**: Aggiunti link OWASP MCP Top 10 e Sherpa workshop tra i riferimenti aggiuntivi

#### Modulo 06 - Contributi della Comunità
- **Lista SDK**: Aggiunti SDK Swift e Rust; aggiornato link specifica a 2025-11-25
- **Riferimento Specifica**: Aggiornato link Specifica MCP all’URL diretto della specifica

#### Modulo 07 - Lezioni dall’Adozione Precoce
- **Aggiornamenti Risorse**: Aggiunto link MCP Specifica 2025-11-25 e OWASP MCP Top 10 tra le risorse aggiuntive

#### Modulo 08 - Best Practice
- **Versione Specifica**: Aggiornato riferimento Specifica MCP a 2025-11-25
- **Risorse di Sicurezza**: Aggiunti OWASP MCP Top 10 e Sherpa workshop tra i riferimenti aggiuntivi

#### Modulo 10 - Ottimizzazione dei Flussi AI
- **Aggiornamento Badge**: Cambiata versione badge MCP da versione SDK (1.9.3) a versione specifica (2025-11-25)
- **Link Risorse**: Aggiornato link Specifica MCP; aggiunto OWASP MCP Top 10

#### Modulo 11 - Laboratori Pratici MCP Server
- **Riferimento Specifica**: Aggiornato link Specifica MCP alla versione 2025-11-25
- **Risorse Sicurezza**: Aggiunto OWASP MCP Top 10 alle risorse ufficiali

## 18 Dicembre 2025

### Aggiornamento Documentazione Sicurezza - MCP Specifica 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Aggiornamento Versione Specifica
- **Aggiornamento Versione Protocollo**: Aggiornata per riferimento alla Specifica MCP 2025-11-25 più recente (rilasciata 25 Novembre 2025)
  - Aggiornate tutte le referenze di versione specifica da 2025-06-18 a 2025-11-25
  - Aggiornate date documenti da 18 Agosto 2025 a 18 Dicembre 2025
  - Verificati tutti gli URL delle specifiche puntino alla documentazione attuale
- **Validazione Contenuto**: Validazione completa delle best practice di sicurezza secondo gli standard più recenti
  - **Soluzioni di Sicurezza Microsoft**: Verificata terminologia corrente e link per Prompt Shields (precedentemente "rilevamento rischi jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Sicurezza OAuth 2.1**: Confermato allineamento con le ultime best practice di sicurezza OAuth
  - **Standard OWASP**: Validati riferimenti OWASP Top 10 per LLM rimangono attuali
  - **Servizi Azure**: Verificati link a tutta la documentazione Microsoft Azure e best practice
- **Allineamento agli Standard**: Confermata attualità di tutti gli standard di sicurezza citati
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Framework di sicurezza e conformità Azure
- **Risorse di Implementazione**: Verificati link e risorse di guide all’implementazione
  - Pattern di autenticazione Azure API Management
  - Guide integrazione Microsoft Entra ID
  - Gestione segreti con Azure Key Vault
  - Pipeline DevSecOps e soluzioni di monitoraggio

### Garanzia della Qualità della Documentazione
- **Conformità alla Specifica**: Verificata la conformità di tutti i requisiti di sicurezza MCP obbligatori (DEVE/DEVE NON)
- **Aggiornamento Risorse**: Verificati tutti i link esterni alla documentazione Microsoft, agli standard di sicurezza e alle guide di implementazione
- **Copertura delle Best Practice**: Confermata ampia copertura di autenticazione, autorizzazione, minacce specifiche AI, sicurezza della supply chain e pattern enterprise

## 6 Ottobre 2025

### Espansione Sezione Introduzione – Utilizzo Avanzato Server & Autenticazione Semplice

#### Utilizzo Avanzato Server (03-GettingStarted/10-advanced)
- **Nuovo Capitolo Aggiunto**: Introdotta guida completa all’utilizzo avanzato dei server MCP, coprendo architetture server sia regolari sia a basso livello.
  - **Server Regolare vs Low-Level**: Confronto dettagliato ed esempi di codice Python e TypeScript per entrambi gli approcci.
  - **Design Basato su Handler**: Spiegazione della gestione handler-based di strumenti/risorse/prompt per implementazioni server scalabili e flessibili.
  - **Pattern Pratici**: Scenari reali in cui i pattern low-level server offrono vantaggi per funzionalità avanzate e architettura.

#### Autenticazione Semplice (03-GettingStarted/11-simple-auth)
- **Nuovo Capitolo Aggiunto**: Guida passo-passo all’implementazione di autenticazione semplice in server MCP.
  - **Concetti di Autenticazione**: Spiegazione chiara di autenticazione vs autorizzazione e gestione delle credenziali.
  - **Implementazione Auth Base**: Pattern di autenticazione middleware in Python (Starlette) e TypeScript (Express), con esempi di codice.
  - **Transizione a Sicurezza Avanzata**: Indicazioni per partire da autenticazione semplice e progredire verso OAuth 2.1 e RBAC, con riferimenti ai moduli di sicurezza avanzata.

Queste aggiunte forniscono una guida pratica e hands-on per costruire implementazioni MCP di server più robuste, sicure e flessibili, collegando concetti fondamentali a pattern di produzione avanzati.

## 29 Settembre 2025

### Laboratori di Integrazione Database per MCP Server - Percorso Completo Hands-On

#### 11-MCPServerHandsOnLabs - Nuovo Curriculum Completo per Integrazione Database
- **Percorso di Apprendimento Completo 13-Lab**: Aggiunto curriculum pratico completo per la costruzione di server MCP pronti per la produzione con integrazione database PostgreSQL  
  - **Implementazione nel Mondo Reale**: Caso d’uso di analisi Retail Zava che dimostra pattern di livello aziendale  
  - **Progressione di Apprendimento Strutturata**:  
    - **Lab 00-03: Fondamenta** - Introduzione, Architettura Core, Sicurezza & Multi-Tenancy, Configurazione Ambiente  
    - **Lab 04-06: Costruzione del Server MCP** - Progettazione Database & Schema, Implementazione Server MCP, Sviluppo Strumenti  
    - **Lab 07-09: Funzionalità Avanzate** - Integrazione Ricerca Semantica, Testing & Debugging, Integrazione VS Code  
    - **Lab 10-12: Produzione & Best Practices** - Strategie di Deployment, Monitoraggio & Osservabilità, Best Practices & Ottimizzazione  
  - **Tecnologie Enterprise**: Framework FastMCP, PostgreSQL con pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights  
  - **Funzionalità Avanzate**: Row Level Security (RLS), ricerca semantica, accesso dati multi-tenant, vettori embeddings, monitoraggio in tempo reale  

#### Standardizzazione della Terminologia - Conversione da Modulo a Lab  
- **Aggiornamento Completo della Documentazione**: Aggiornati sistematicamente tutti i file README in 11-MCPServerHandsOnLabs per usare la terminologia "Lab" al posto di "Modulo"  
  - **Intestazioni di Sezione**: Aggiornato "What This Module Covers" in "What This Lab Covers" in tutti i 13 lab  
  - **Descrizione Contenuti**: Cambiato "This module provides..." in "This lab provides..." in tutta la documentazione  
  - **Obiettivi di Apprendimento**: Aggiornato "By the end of this module..." in "By the end of this lab..."  
  - **Link di Navigazione**: Convertiti tutti i riferimenti "Module XX:" in "Lab XX:" nelle cross-referenze e navigazione  
  - **Tracciamento Completamento**: Aggiornato "After completing this module..." in "After completing this lab..."  
  - **Mantenuti Riferimenti Tecnici**: Conservati riferimenti ai moduli Python nei file di configurazione (es. `"module": "mcp_server.main"`)  

#### Miglioramento Guida Studio (study_guide.md)  
- **Mappa Visuale del Curriculum**: Aggiunta nuova sezione "11. Database Integration Labs" con visualizzazione completa della struttura lab  
- **Struttura del Repository**: Aggiornata da dieci a undici sezioni principali con descrizione dettagliata di 11-MCPServerHandsOnLabs  
- **Indicazioni Percorso di Apprendimento**: Potenziate istruzioni di navigazione per coprire sezioni da 00 a 11  
- **Copertura Tecnologica**: Aggiunti dettagli su FastMCP, PostgreSQL, integrazioni servizi Azure  
- **Risultati di Apprendimento**: Enfatizzato sviluppo di server pronti per la produzione, pattern di integrazione database e sicurezza enterprise  

#### Miglioramento Struttura README Principale  
- **Terminologia Basata su Lab**: Aggiornato README.md principale in 11-MCPServerHandsOnLabs per usare consistentemente la struttura "Lab"  
- **Organizzazione Percorso di Apprendimento**: Progressione chiara dai concetti fondamentali all’implementazione avanzata fino al deployment in produzione  
- **Focus sul Mondo Reale**: Enfasi su apprendimento pratico con pattern e tecnologie di livello enterprise  

### Miglioramenti Qualità & Coerenza Documentazione  
- **Focus su Apprendimento Pratico**: Rafforzato approccio basato su lab in tutta la documentazione  
- **Focus su Pattern Enterprise**: Messa in evidenza di implementazioni pronte per la produzione e considerazioni di sicurezza enterprise  
- **Integrazione Tecnologica**: Copertura completa di servizi Azure moderni e pattern di integrazione AI  
- **Progressione di Apprendimento**: Percorso chiaro e strutturato da concetti base al deployment in produzione  

## 26 settembre 2025

### Potenziamento Case Studies - Integrazione GitHub MCP Registry

#### Case Studies (09-CaseStudy/) - Focus Sviluppo Ecosistema  
- **README.md**: Espansione significativa con case study completo su GitHub MCP Registry  
  - **Case Study GitHub MCP Registry**: Nuovo case study esaustivo sullanciamento di GitHub MCP Registry a settembre 2025  
    - **Analisi Problema**: Esame dettagliato delle sfide di discovery e deployment frammentati dei server MCP  
    - **Architettura Soluzione**: Approccio registry centralizzato GitHub con installazione VS Code con un clic  
    - **Impatto di Business**: Miglioramenti misurabili su onboarding sviluppatori e produttività  
    - **Valore Strategico**: Focus su deployment modulare agenti e interoperabilità cross-tool  
    - **Sviluppo Ecosistema**: Posizionamento come piattaforma fondativa per integrazione agentica  
  - **Struttura Case Study Potenziata**: Aggiornati tutti e sette case study con formato coerente e descrizioni esaustive  
    - Azure AI Travel Agents: enfasi su orchestrazione multi-agente  
    - Azure DevOps Integration: focus su automazione workflow  
    - Real-Time Documentation Retrieval: implementazione client console Python  
    - Interactive Study Plan Generator: web app conversazionale Chainlit  
    - In-Editor Documentation: integrazione VS Code e GitHub Copilot  
    - Azure API Management: pattern integrazione API enterprise  
    - GitHub MCP Registry: sviluppo ecosistema e piattaforma comunitaria  
  - **Conclusione Completa**: Sezione conclusiva riscritta evidenziando sette case study che coprono molteplici dimensioni di implementazione MCP  
    - Integrazione Enterprise, Orchestrazione Multi-Agente, Produttività Sviluppatori  
    - Sviluppo Ecosistema, Categorie Applicazioni Educative  
    - Approfondimenti su pattern architetturali, strategie di implementazione, best practice  
    - Enfasi su MCP come protocollo maturo e pronto per la produzione  

#### Aggiornamenti Guida Studio (study_guide.md)  
- **Mappa Visuale Curriculum**: Aggiornata per includere GitHub MCP Registry nella sezione Case Studies  
- **Descrizione Case Studies**: Potenziata da descrizioni generiche a dettagliata suddivisione di sette case study completi  
- **Struttura Repository**: Aggiornata sezione 10 per riflettere copertura estesa case study con dettagli specifici di implementazione  
- **Integrazione Changelog**: Aggiunta voce 26 settembre 2025 documentante aggiunta GitHub MCP Registry e miglioramenti case study  
- **Aggiornamento Data**: Aggiornato timestamp footer per riflettere ultima revisione (26 settembre 2025)  

### Miglioramenti Qualità Documentazione  
- **Miglioramento Coerenza**: Standardizzazione formato e struttura case study in tutti e sette gli esempi  
- **Copertura Esaustiva**: Case study ora coprono scenari enterprise, produttività sviluppatori e sviluppo ecosistema  
- **Posizionamento Strategico**: Maggiore focus su MCP come piattaforma fondativa per deployment sistemi agentici  
- **Integrazione Risorse**: Aggiornate risorse aggiuntive includendo link GitHub MCP Registry  

## 15 settembre 2025

### Espansione Tematiche Avanzate - Trasporti Custom & Context Engineering

#### Trasporti Custom MCP (05-AdvancedTopics/mcp-transport/) - Nuova Guida Implementazione Avanzata  
- **README.md**: Guida completa all’implementazione di meccanismi di trasporto MCP custom  
  - **Trasporto Azure Event Grid**: Implementazione completa serverless event-driven  
    - Esempi in C#, TypeScript e Python con integrazione Azure Functions  
    - Pattern architetturali event-driven per soluzioni MCP scalabili  
    - Receiver webhook e gestione messaggi push-based  
  - **Trasporto Azure Event Hubs**: Implementazione streaming ad alta velocità  
    - Capacità streaming in tempo reale per scenari a bassa latenza  
    - Strategie di partizionamento e gestione checkpoint  
    - Batch messaggi e ottimizzazione performance  
  - **Pattern di Integrazione Enterprise**: Esempi architetturali pronti per la produzione  
    - Elaborazione MCP distribuita su più Azure Functions  
    - Architetture ibride di trasporto combinando vari tipi  
    - Durabilità messaggi, affidabilità e gestione errori  
  - **Sicurezza & Monitoraggio**: Integrazione Azure Key Vault e pattern di osservabilità  
    - Autenticazione managed identity e accesso a privilegi ridotti  
    - Telemetria Application Insights e monitoraggio performance  
    - Circuit breaker e pattern di tolleranza ai guasti  
  - **Framework Testing**: Strategie complete per testing di trasporti custom  
    - Unit testing con test double e mocking framework  
    - Integration testing con Azure Test Containers  
    - Considerazioni su performance e load testing  

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Disciplina AI Emergente  
- **README.md**: Esplorazione completa del context engineering come campo emergente  
  - **Principi Fondamentali**: Condivisione completa del contesto, consapevolezza decisionale azioni, gestione finestra di contesto  
  - **Allineamento Protocollo MCP**: Come il design MCP affronta le sfide di context engineering  
    - Limitazioni della finestra di contesto e strategie di caricamento progressivo  
    - Determinazione rilevanza e recupero contesto dinamico  
    - Gestione contesto multi-modale e considerazioni di sicurezza  
  - **Approcci di Implementazione**: Architetture single-threaded vs multi-agente  
    - Tecniche di chunking e prioritizzazione del contesto  
    - Caricamento progressivo e strategie di compressione  
    - Approcci stratificati al contesto e ottimizzazione recupero  
  - **Framework di Misurazione**: Metriche emergenti per valutazione efficacia contesto  
    - Efficienza input, performance, qualità e esperienza utente  
    - Approcci sperimentali all’ottimizzazione del contesto  
    - Analisi fallimenti e metodologie di miglioramento  

#### Aggiornamenti Navigazione Curriculum (README.md)  
- **Struttura Moduli Potenziata**: Aggiornata tabella curriculum per includere nuove tematiche avanzate  
  - Aggiunti Context Engineering (5.14) e Custom Transport (5.15)  
  - Formattazione e link di navigazione coerenti in tutti i moduli  
  - Aggiornate descrizioni per riflettere portata attuale dei contenuti  

### Miglioramenti Struttura Directory  
- **Standardizzazione Nomi**: Rinominato "mcp transport" in "mcp-transport" per coerenza con altre cartelle tematiche avanzate  
- **Organizzazione Contenuti**: Tutte le cartelle 05-AdvancedTopics ora seguono pattern di nomenclatura coerente (mcp-[topic])  

### Miglioramenti Qualità Documentazione  
- **Allineamento Specifiche MCP**: Tutti i nuovi contenuti fanno riferimento alla MCP Specification 2025-06-18  
- **Esempi Multilingua**: Esempi completi di codice in C#, TypeScript e Python  
- **Focus Enterprise**: Pattern pronti per la produzione e integrazione cloud Azure ovunque  
- **Documentazione Visuale**: Diagrammi Mermaid per architettura e visualizzazione flusso  

## 18 agosto 2025

### Aggiornamento Completo Documentazione - Standard MCP 2025-06-18

#### Best Practices di Sicurezza MCP (02-Security/) - Modernizzazione Completa  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Riscrittura totale allineata a MCP Specification 2025-06-18  
  - **Requisiti Obbligatori**: Aggiunte clausole MUST/MUST NOT dalla specifica ufficiale con chiari indicatori visivi  
  - **12 Pratiche Core di Sicurezza**: Ristrutturate da lista 15-item a domini di sicurezza completi  
    - Sicurezza Token & Autenticazione con integrazione identity provider esterni  
    - Gestione Sessioni & Sicurezza Trasporto con requisiti crittografici  
    - Protezione Minacce AI Specifica con integrazione Microsoft Prompt Shields  
    - Controllo Accessi & Permessi con principio del minimo privilegio  
    - Sicurezza Contenuti & Monitoraggio con integrazione Azure Content Safety  
    - Sicurezza Supply Chain con verifica completa componenti  
    - Sicurezza OAuth & Prevenzione Attacco Confused Deputy con implementazione PKCE  
    - Risposta Incidenti & Recupero con capacità automatizzate  
    - Conformità & Governance con allineamento normativo  
    - Controlli di Sicurezza Avanzati con architettura zero trust  
    - Integrazione Ecosistema Sicurezza Microsoft con soluzioni complete  
    - Evoluzione Continua Sicurezza con pratiche adattative  
  - **Soluzioni Sicurezza Microsoft**: Guida integrata ampliata per Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security  
  - **Risorse Implementazione**: Link risorse categorizzati per Documentazione MCP Ufficiale, Soluzioni Sicurezza Microsoft, Standard Sicurezza e Guide Implementazione  

#### Controlli di Sicurezza Avanzati (02-Security/) - Implementazione Enterprise  
- **MCP-SECURITY-CONTROLS-2025.md**: Revisione totale con framework di sicurezza enterprise-grade  
  - **9 Domini di Sicurezza Completi**: Ampliate da controlli base a framework dettagliato enterprise  
    - Autenticazione & Autorizzazione Avanzata con integrazione Microsoft Entra ID  
    - Sicurezza Token & Controlli Anti-Passthrough con validazione completa  
    - Controlli Sicurezza Sessione con prevenzione hijacking  
    - Controlli Sicurezza AI Specifica con prevenzione prompt injection e tool poisoning  
    - Prevenzione Attacco Confused Deputy con sicurezza proxy OAuth  
    - Sicurezza Esecuzione Strumenti con sandboxing e isolamento  
    - Controlli Supply Chain Security con verifica dipendenze  
    - Controlli Monitoraggio & Rilevamento con integrazione SIEM  
    - Risposta Incidenti & Recupero con capacità automatizzate  
  - **Esempi Implementazione**: Aggiunti blocchi configurazione YAML dettagliati e esempi codice  
  - **Integrazione Soluzioni Microsoft**: Copertura completa servizi sicurezza Azure, GitHub Advanced Security e gestione identità enterprise  

#### Tematiche Avanzate Sicurezza (05-AdvancedTopics/mcp-security/) - Implementazione Pronta Produzione  
- **README.md**: Riscrittura completa per implementazione sicurezza enterprise  
  - **Allineamento Specifica Corrente**: Aggiornato a MCP Specification 2025-06-18 con requisiti di sicurezza obbligatori  
  - **Autenticazione Avanzata**: Integrazione Microsoft Entra ID con ampi esempi .NET e Java Spring Security  
  - **Integrazione Sicurezza AI**: Implementazione Microsoft Prompt Shields e Azure Content Safety con esempi Python dettagliati  
  - **Mitigazione Minacce Avanzate**: Esempi implementativi completi per  
    - Prevenzione attacco Confused Deputy con PKCE e validazione consenso utente  
    - Prevenzione token passthrough con validazione audience e gestione sicura token  
    - Prevenzione hijacking sessione con binding crittografico e analisi comportamentale  
  - **Integrazione Sicurezza Enterprise**: Monitoraggio Azure Application Insights, pipeline rilevamento minacce e sicurezza supply chain  
  - **Checklist Implementazione**: Chiarezza controlli sicurezza obbligatori vs consigliati con benefici ecosistema sicurezza Microsoft  

### Qualità Documentazione & Allineamento Standard  
- **Riferimenti Specifica**: Aggiornate tutte le referenze alla MCP Specification 2025-06-18  
- **Ecosistema Sicurezza Microsoft**: Guida integrazione potenziata in tutta la documentazione sicurezza  
- **Implementazione Pratica**: Aggiunti esempi codice dettagliati in .NET, Java e Python con pattern enterprise  
- **Organizzazione Risorse**: Categorizzazione completa di documentazione ufficiale, standard sicurezza e guide implementazione  
- **Indicatori Visivi**: Segnalazione chiara requisiti obbligatori vs pratiche consigliate  

#### Concetti Core (01-CoreConcepts/) - Modernizzazione Completa  
- **Aggiornamento Versione Protocollo**: Aggiornato per riferirsi a MCP Specification 2025-06-18 con versioning basato su data (formato YYYY-MM-DD)  
- **Raffinamento Architettura**: Descrizioni potenziate di Host, Client e Server per riflettere pattern architetturali MCP attuali
  - Host ora chiaramente definiti come applicazioni AI che coordinano più connessioni client MCP
  - Client descritti come connettori di protocollo che mantengono relazioni server uno a uno
  - Server migliorati con scenari di distribuzione locale vs. remota
- **Ristrutturazione Primitiva**: Revisione completa delle primitive server e client
  - Primitive Server: Risorse (fonti di dati), Prompt (modelli), Strumenti (funzioni eseguibili) con spiegazioni dettagliate ed esempi
  - Primitive Client: Campionamento (completamenti LLM), Elicitazione (input utente), Logging (debug/monitoraggio)
  - Aggiornate con i modelli attuali di metodi di scoperta (`*/list`), recupero (`*/get`), ed esecuzione (`*/call`)
- **Architettura del Protocollo**: Introdotto modello architetturale a due livelli
  - Livello Dati: Fondazione JSON-RPC 2.0 con gestione del ciclo di vita e primitive
  - Livello Trasporto: Meccanismi di trasporto STDIO (locale) e HTTP Streamable con SSE (remoto)
- **Framework di Sicurezza**: Principi di sicurezza completi, tra cui consenso esplicito dell'utente, protezione della privacy dei dati, sicurezza nell'esecuzione degli strumenti e sicurezza del livello di trasporto
- **Modelli di Comunicazione**: Aggiornati i messaggi del protocollo per mostrare flussi di inizializzazione, scoperta, esecuzione e notifica
- **Esempi di Codice**: Esempi multi-lingua aggiornati (.NET, Java, Python, JavaScript) per riflettere i modelli attuali dell’MCP SDK

#### Sicurezza (02-Security/) - Revisione Completa della Sicurezza  
- **Allineamento agli Standard**: Pieno allineamento con i requisiti di sicurezza della Specifica MCP 2025-06-18
- **Evoluzione dell’Autenticazione**: Documentata l’evoluzione da server OAuth personalizzati a delega di provider di identità esterni (Microsoft Entra ID)
- **Analisi delle Minacce Specifiche AI**: Copertura ampliata dei vettori di attacco AI moderni
  - Scenari dettagliati di attacchi di prompt injection con esempi reali
  - Meccanismi di avvelenamento degli strumenti e modelli di attacco "rug pull"
  - Avvelenamento della finestra di contesto e attacchi di confusione del modello
- **Soluzioni di Sicurezza Microsoft AI**: Copertura completa dell’ecosistema di sicurezza Microsoft
  - Scudi per Prompt AI con tecniche avanzate di rilevamento, spotlighting e delimitazione
  - Modelli di integrazione di Azure Content Safety
  - GitHub Advanced Security per protezione della supply chain
- **Mitigazione Avanzata delle Minacce**: Controlli di sicurezza dettagliati per
  - Hijacking di sessione con scenari di attacco specifici MCP e requisiti crittografici per ID sessione
  - Problemi di confuso delegato in scenari proxy MCP con requisiti di consenso esplicito
  - Vulnerabilità di passthrough di token con controlli di validazione obbligatori
- **Sicurezza della Supply Chain**: Copertura ampliata della supply chain AI inclusi modelli di base, servizi di embeddings, fornitori di contesto e API di terze parti
- **Sicurezza Fondamentale**: Integrazione migliorata con modelli di sicurezza enterprise inclusa architettura zero trust e ecosistema di sicurezza Microsoft
- **Organizzazione delle Risorse**: Link alle risorse categorizzati per tipo (Documentazione ufficiale, Standard, Ricerca, Soluzioni Microsoft, Guide all’implementazione)

### Miglioramenti nella Qualità della Documentazione
- **Obiettivi di Apprendimento Strutturati**: Obiettivi di apprendimento migliorati con risultati specifici e azionabili
- **Riferimenti Incrociati**: Inseriti link tra temi di sicurezza correlati e concetti core
- **Informazioni Aggiornate**: Tutte le date e link alle specifiche aggiornati agli standard correnti
- **Linee Guida di Implementazione**: Aggiunte indicazioni specifiche e pratiche per l’implementazione in entrambe le sezioni

## 16 Luglio 2025

### README e Miglioramenti nella Navigazione
- Navigation del curriculum riprogettata completamente in README.md
- Sostituiti i tag `<details>` con un formato tabellare più accessibile
- Creata cartella "alternative_layouts" con opzioni di layout alternative
- Aggiunti esempi di navigazione a schede, basata su card e a fisarmonica
- Aggiornata la sezione struttura del repository per includere tutti i file più recenti
- Migliorata la sezione "Come Usare Questo Curriculum" con raccomandazioni chiare
- Aggiornati i link alla specifica MCP per puntare agli URL corretti
- Aggiunta la sezione Engineering del Contesto (5.14) alla struttura del curriculum

### Aggiornamenti alla Guida di Studio
- Guida di studio completamente revisionata per allinearsi alla struttura attuale del repository
- Nuove sezioni per Client e Strumenti MCP, e per Server MCP popolari
- Aggiornata la Mappa Visiva del Curriculum per riflettere con precisione tutti i temi
- Migliorate le descrizioni degli Argomenti Avanzati per coprire tutte le aree specialistiche
- Aggiornata la sezione Casi di Studio con esempi concreti
- Aggiunto questo registro dettagliato delle modifiche

### Contributi della Comunità (06-CommunityContributions/)
- Aggiunte informazioni dettagliate sui server MCP per la generazione di immagini
- Sezione completa su come usare Claude in VSCode
- Istruzioni di configurazione e uso del client terminale Cline
- Aggiornata la sezione client MCP per includere tutte le opzioni client popolari
- Migliorati gli esempi di contributo con campioni di codice più accurati

### Argomenti Avanzati (05-AdvancedTopics/)
- Organizzate tutte le cartelle di argomenti specializzati con denominazioni coerenti
- Aggiunto materiale e esempi di context engineering
- Documentazione di integrazione dell’agente Foundry
- Migliorata documentazione di integrazione della sicurezza Entra ID

## 11 Giugno 2025

### Creazione Iniziale
- Rilasciata la prima versione del curriculum MCP per Principianti
- Creata struttura base per le 10 sezioni principali
- Implementata la Mappa Visiva del Curriculum per la navigazione
- Aggiunti progetti di esempio iniziali in più linguaggi di programmazione

### Getting Started (03-GettingStarted/)
- Esempi delle prime implementazioni server creati
- Aggiunte linee guida per sviluppo client
- Includete istruzioni per integrazione client LLM
- Documentazione per integrazione con VS Code
- Esempi di server con Server-Sent Events (SSE) implementati

### Concetti Base (01-CoreConcepts/)
- Aggiunta spiegazione dettagliata dell’architettura client-server
- Documentazione sui componenti chiave del protocollo
- Documentati i modelli di messaggistica in MCP

## 23 Maggio 2025

### Struttura del Repository
- Inizializzato repository con struttura base di cartelle
- Creati README per ogni sezione principale
- Configurata infrastruttura per traduzioni
- Aggiunte risorse grafiche e diagrammi

### Documentazione
- Creato README.md iniziale con panoramica del curriculum
- Aggiunti CODE_OF_CONDUCT.md e SECURITY.md
- Configurato SUPPORT.md con indicazioni per ricevere assistenza
- Creata struttura preliminare per guida di studio

## 15 Aprile 2025

### Pianificazione e Framework
- Pianificazione iniziale del curriculum MCP per Principianti
- Definiti obiettivi di apprendimento e pubblico target
- Tracciata la struttura in 10 sezioni del curriculum
- Sviluppato quadro concettuale per esempi e studi di caso
- Creati esempi prototipo iniziali per concetti chiave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire accuratezza, si prega di notare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un umano. Non siamo responsabili per eventuali fraintendimenti o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->