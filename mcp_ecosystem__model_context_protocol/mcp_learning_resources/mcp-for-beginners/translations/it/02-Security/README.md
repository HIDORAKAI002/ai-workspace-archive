# Sicurezza MCP: Protezione Completa per Sistemi di AI

[![MCP Security Best Practices](../../../translated_images/it/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Clicca sull'immagine sopra per vedere il video di questa lezione)_

La sicurezza è fondamentale nella progettazione di sistemi di AI, motivo per cui la consideriamo come la nostra seconda sezione. Questo è in linea con il principio **Secure by Design** di Microsoft, tratto dalla [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Il Model Context Protocol (MCP) offre potenti nuove capacità alle applicazioni guidate dall’AI, introducendo al contempo sfide di sicurezza uniche che vanno oltre i rischi tradizionali del software. I sistemi MCP affrontano sia preoccupazioni di sicurezza consolidate (codifica sicura, principio del minimo privilegio, sicurezza della supply chain) sia nuove minacce specifiche dell’AI, tra cui injection di prompt, avvelenamento degli strumenti, hijacking di sessione, attacchi confused deputy, vulnerabilità nel passaggio di token e modifiche dinamiche delle capacità.

Questa lezione esplora i rischi di sicurezza più critici nelle implementazioni MCP—coprendo autenticazione, autorizzazione, permessi eccessivi, injection indiretta di prompt, sicurezza della sessione, problemi confused deputy, gestione dei token e vulnerabilità nella supply chain. Imparerai controlli pratici e best practice per mitigare questi rischi sfruttando soluzioni Microsoft come Prompt Shields, Azure Content Safety e GitHub Advanced Security per rafforzare il tuo deployment MCP.

## Obiettivi di Apprendimento

Al termine di questa lezione sarai in grado di:

- **Identificare Minacce Specifiche MCP**: Riconoscere rischi unici di sicurezza nei sistemi MCP, inclusi injection di prompt, avvelenamento degli strumenti, permessi eccessivi, hijacking di sessione, problemi confused deputy, vulnerabilità nel passaggio di token e rischi nella supply chain
- **Applicare Controlli di Sicurezza**: Implementare mitigazioni efficaci tra cui una solida autenticazione, accesso con minimo privilegio, gestione sicura dei token, controlli di sicurezza della sessione e verifica della supply chain
- **Sfruttare Soluzioni Microsoft di Sicurezza**: Comprendere e distribuire Microsoft Prompt Shields, Azure Content Safety e GitHub Advanced Security per la protezione dei carichi di lavoro MCP
- **Validare la Sicurezza degli Strumenti**: Riconoscere l’importanza della validazione dei metadata degli strumenti, del monitoraggio dei cambiamenti dinamici e della difesa contro attacchi indiretti di prompt injection
- **Integrare Best Practice**: Combinare fondamenta di sicurezza consolidate (codifica sicura, rafforzamento dei server, zero trust) con controlli specifici MCP per una protezione completa

# Architettura e Controlli di Sicurezza MCP

Le implementazioni moderne di MCP richiedono approcci di sicurezza stratificati che affrontino sia la sicurezza tradizionale del software sia le minacce specifiche per l’AI. La specifica MCP in rapida evoluzione continua a maturare i suoi controlli di sicurezza, permettendo una migliore integrazione con le architetture di sicurezza aziendali e le best practice consolidate.

La ricerca dal [Microsoft Digital Defense Report](https://aka.ms/mddr) dimostra che **il 98% delle violazioni segnalate sarebbe prevenuto da una rigorosa igiene della sicurezza**. La strategia di protezione più efficace combina pratiche di sicurezza fondamentali con controlli specifici MCP—misure di sicurezza di base comprovate rimangono quelle con il maggior impatto nel ridurre il rischio complessivo di sicurezza.

## Scenario Attuale della Sicurezza

> **Nota:** Queste informazioni riflettono gli standard di sicurezza MCP aggiornati al **5 febbraio 2026**, in linea con la **Specificazione MCP 2025-11-25**. Il protocollo MCP continua a evolversi rapidamente e le implementazioni future potrebbero introdurre nuovi schemi di autenticazione e controlli migliorati. Consulta sempre la [Specificazione MCP](https://spec.modelcontextprotocol.io/), il [repository GitHub MCP](https://github.com/modelcontextprotocol) e la [documentazione delle best practice di sicurezza](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) per indicazioni aggiornate.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Per una **formazione pratica sulla sicurezza**, raccomandiamo vivamente il **MCP Security Summit Workshop** (Sherpa) - un’escursione guidata completa per mettere in sicurezza i server MCP in Microsoft Azure.

### Panoramica del Workshop

Il [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) offre formazione sulla sicurezza pratica e applicabile tramite una metodologia collaudata "vulnerabile → sfrutta → correggi → convalida". Potrai:

- **Imparare Rompendo**: Sperimenti vulnerabilità sfruttando server intenzionalmente insicuri
- **Usare la Sicurezza Nativa di Azure**: Sfruttare Azure Entra ID, Key Vault, API Management e AI Content Safety
- **Seguire la Difesa in Profondità**: Progredire attraverso i campi costruendo livelli completi di sicurezza
- **Applicare gli Standard OWASP**: Ogni tecnica mappa alla [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Ottenere Codice di Produzione**: Portare a casa implementazioni funzionanti e testate

### Il Percorso dell’Escursione

| Campo | Focus | Rischi OWASP Coperti |
|-------|-------|----------------------|
| **Campo Base** | Fondamenti MCP & vulnerabilità di autenticazione | MCP01, MCP07 |
| **Campo 1: Identità** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Campo 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP07, MCP09 |
| **Campo 3: Sicurezza I/O** | Prompt injection, protezione PII, content safety | MCP03, MCP05, MCP06 |
| **Campo 4: Monitoraggio** | Log Analytics, dashboard, rilevamento minacce | MCP08 |
| **La Vetta** | Test di integrazione Red Team / Blue Team | Tutti |

**Inizia qui**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Rischi di Sicurezza

La [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) dettaglia i dieci rischi di sicurezza più critici per le implementazioni MCP:

| Rischio | Descrizione | Mitigazione Azure |
|---------|-------------|-------------------|
| **MCP01** | Gestione errata dei token & esposizione di segreti | Azure Key Vault, Managed Identity |
| **MCP02** | Escalation di privilegi tramite ampliamento dello scope | RBAC, Conditional Access |
| **MCP03** | Avvelenamento degli strumenti | Validazione strumenti, verifica integrità |
| **MCP04** | Attacchi alla supply chain | GitHub Advanced Security, scansione dipendenze |
| **MCP05** | Injection ed esecuzione di comandi | Validazione input, sandboxing |
| **MCP06** | Prompt injection tramite payload contestuali | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticazione e autorizzazione insufficienti | Azure Entra ID, OAuth 2.1 con PKCE |
| **MCP08** | Mancanza di auditing e telemetria | Azure Monitor, Application Insights |
| **MCP09** | Server MCP fantasma | Governance API Center, isolamento rete |
| **MCP10** | Injection di contesto e sovra-condivisione | Classificazione dati, esposizione minima |

### Evoluzione dell’Autenticazione MCP

La specifica MCP è evoluta significativamente nell’approccio ad autenticazione e autorizzazione:

- **Approccio Originale**: Le prime specifiche richiedevano agli sviluppatori di implementare server di autenticazione personalizzati, con server MCP che agivano come OAuth 2.0 Authorization Server gestendo direttamente l’autenticazione degli utenti
- **Standard Attuale (2025-11-25)**: La specifica aggiornata consente ai server MCP di delegare l’autenticazione a fornitori di identità esterni (come Microsoft Entra ID), migliorando la postura di sicurezza e riducendo la complessità implementativa
- **Transport Layer Security**: Supporto avanzato per meccanismi di trasporto sicuri con pattern di autenticazione appropriati sia per connessioni locali (STDIO) sia remote (Streamable HTTP)

## Sicurezza di Autenticazione e Autorizzazione

### Sfide Attuali di Sicurezza

Le implementazioni MCP moderne affrontano diverse sfide riguardanti autenticazione e autorizzazione:

### Rischi e Vettori di Minaccia

- **Logica di Autorizzazione Mal Configurata**: Implementazioni di autorizzazione errate nei server MCP possono esporre dati sensibili e applicare in modo scorretto i controlli di accesso
- **Compromissione Token OAuth**: Il furto del token del server MCP locale permette agli attaccanti di impersonare il server e accedere ai servizi downstream
- **Vulnerabilità da Passaggio Token**: Una gestione impropria dei token crea bypass dei controlli di sicurezza e lacune di tracciabilità
- **Permessi Eccessivi**: Server MCP con privilegi troppo ampi violano il principio del minimo privilegio ed espandono la superficie di attacco

#### Passaggio Token: Un Anti-pattern Critico

**Il passaggio diretto di token è esplicitamente proibito** dalla specifica di autorizzazione attuale MCP a causa delle gravi implicazioni di sicurezza:

##### Elusione dei Controlli di Sicurezza
- Server MCP e API downstream implementano controlli critici di sicurezza (rate limiting, validazione richieste, monitoraggio traffico) che dipendono da una corretta validazione dei token
- L’uso diretto del token dal client all’API bypassa queste protezioni essenziali, indebolendo l’architettura di sicurezza

##### Sfide di Responsabilità e Audit  
- I server MCP non possono distinguere tra client che usano token emessi a monte, interrompendo i tracciamenti di audit
- I log di server risorsa downstream mostrano origini di richieste fuorvianti invece che gli effettivi intermediari MCP
- Le indagini sugli incidenti e gli audit di conformità diventano molto più difficili

##### Rischi di Esfiltrazione Dati
- Le dichiarazioni di token non validate permettono a attori malevoli con token rubati di usare i server MCP come proxy per esfiltrare dati
- Violazioni di confine di fiducia consentono pattern di accesso non autorizzati che scavalcano i controlli di sicurezza previsti

##### Vettori di Attacco Multi-Servizio
- Token compromessi accettati da più servizi abilitano movimenti laterali tra sistemi connessi
- Le assunzioni di fiducia tra servizi possono essere violate quando l’origine del token non è verificabile

### Controlli di Sicurezza e Mitigazioni

**Requisiti Critici di Sicurezza:**

> **OBBLIGATORIO**: I server MCP **NON DEVONO** accettare token che non siano esplicitamente emessi per il server MCP

#### Controlli di Autenticazione e Autorizzazione

- **Revisione Rigida dell’Autorizzazione**: Conduci audit completi sulla logica di autorizzazione dei server MCP per garantire che solo utenti e client autorizzati possano accedere a risorse sensibili
  - **Guida all’implementazione**: [Azure API Management come Gateway di Autenticazione per Server MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrazione Identità**: [Uso di Microsoft Entra ID per Autenticazione Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestione Sicura dei Token**: Implementa le [best practice Microsoft per validazione e ciclo di vita dei token](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valida gli audience claims del token per corrispondere all’identità del server MCP
  - Applica correttamente politiche di rotazione ed scadenza token
  - Previeni replay attack e usi non autorizzati

- **Conservazione Protetta dei Token**: Proteggi i token con crittografia a riposo e in transito
  - **Best practice**: [Linee guida per la Conservazione Sicura e Crittografia dei Token](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementazione del Controllo Accessi

- **Principio del Minimo Privilegio**: Concedi ai server MCP solo i permessi minimi richiesti per le funzionalità previste
  - Revisioni periodiche dei permessi per prevenire escalation
  - **Documentazione Microsoft**: [Accesso Minimo Sicuro](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controllo Accessi Basato su Ruoli (RBAC)**: Implementa assegnazioni di ruolo granulari
  - Associa ruoli strettamente a risorse e azioni specifiche
  - Evita permessi ampi o inutili che ampliano la superficie di attacco

- **Monitoraggio Continuo dei Permessi**: Implementa auditing e monitoraggio continuo degli accessi
  - Analizza pattern di utilizzo per rilevare anomalie
  - Rapidità nella rimessione in sicurezza di permessi eccessivi o non usati

## Minacce Specifiche di Sicurezza AI

### Attacchi di Prompt Injection e Manipolazione di Strumenti

Le implementazioni MCP moderne affrontano vettori di attacco specifici per AI sofisticati che le misure di sicurezza tradizionali non possono coprire pienamente:

#### **Prompt Injection Indiretta (Prompt Injection Cross-Domain)**

La **Prompt Injection Indiretta** rappresenta una delle vulnerabilità più critiche nei sistemi AI abilitati MCP. Gli attaccanti inseriscono istruzioni malevole all’interno di contenuti esterni—documenti, pagine web, email o fonti dati—che i sistemi AI processano successivamente come comandi legittimi.

**Scenari di Attacco:**
- **Injection basata su Documenti**: Istruzioni malevole nascoste in documenti elaborati che attivano azioni AI non volute
- **Sfruttamento di Contenuti Web**: Pagine web compromesse contenenti prompt incorporati per manipolare il comportamento AI quando raschiate
- **Attacchi via Email**: Prompt malevoli nelle email che inducono assistenti AI a divulgare informazioni o eseguire azioni non autorizzate
- **Contaminazione di Fonti Dati**: Basi dati o API compromessi che servono contenuti alterati ai sistemi AI

**Impatto Reale**: Questi attacchi possono causare esfiltrazione di dati, violazioni della privacy, generazione di contenuti dannosi e manipolazione delle interazioni utente. Per un’analisi dettagliata, vedi [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/it/prompt-injection.ed9fbfde297ca877.webp)

#### **Attacchi di Avvelenamento degli Strumenti**

L’**Avvelenamento degli Strumenti** mira ai metadata che definiscono gli strumenti MCP, sfruttando il modo in cui i LLM interpretano le descrizioni degli strumenti e i parametri per prendere decisioni di esecuzione.

**Meccanismi di Attacco:**
- **Manipolazione dei Metadata**: Attaccanti iniettano istruzioni malevole in descrizioni degli strumenti, definizioni dei parametri o esempi d’uso
- **Istruzioni Invisibili**: Prompt nascosti nei metadata degli strumenti che vengono processati dai modelli AI ma sono invisibili agli utenti umani
- **Modifica Dinamica dello Strumento ("Rug Pulls")**: Strumenti approvati dagli utenti vengono successivamente modificati per eseguire azioni malevole senza che l’utente se ne accorga
- **Injection dei Parametri**: Contenuto malevolo inserito negli schemi dei parametri degli strumenti che influenza il comportamento del modello

**Rischi da Server Ospitati**: I server MCP remoti presentano rischi elevati poiché le definizioni degli strumenti possono essere aggiornate dopo l’approvazione iniziale dell’utente, creando scenari in cui strumenti precedentemente sicuri diventano malevoli. Per un’analisi completa, vedi [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/it/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ulteriori Vettori di Attacco AI**

- **Prompt Injection Cross-Domain (XPIA)**: Attacchi sofisticati che sfruttano contenuti provenienti da più domini per bypassare i controlli di sicurezza
- **Modifica Dinamica delle Capacità**: Cambiamenti in tempo reale alle capacità degli strumenti che sfuggono alle valutazioni di sicurezza iniziali  
- **Avvelenamento della Finestra di Contesto**: Attacchi che manipolano grandi finestre di contesto per nascondere istruzioni dannose  
- **Attacchi di Confusione del Modello**: Sfruttamento delle limitazioni del modello per creare comportamenti imprevedibili o non sicuri  

### Impatto dei Rischi di Sicurezza AI

**Conseguenze ad Alto Impatto:**  
- **Esfiltrazione di Dati**: Accesso non autorizzato e furto di dati sensibili aziendali o personali  
- **Violazioni della Privacy**: Esposizione di informazioni personali identificabili (PII) e dati aziendali riservati  
- **Manipolazione del Sistema**: Modifiche non intenzionali a sistemi critici e flussi di lavoro  
- **Furto di Credenziali**: Compromissione di token di autenticazione e credenziali di servizio  
- **Movimento Laterale**: Uso di sistemi AI compromessi come pivot per attacchi di rete più ampi  

### Soluzioni di Sicurezza AI Microsoft

#### **AI Prompt Shields: Protezione Avanzata Contro Attacchi di Injection**

Microsoft **AI Prompt Shields** fornisce una difesa completa contro attacchi diretti e indiretti di injection nei prompt attraverso molteplici livelli di sicurezza:

##### **Meccanismi di Protezione Principali:**

1. **Rilevamento e Filtraggio Avanzati**  
   - Algoritmi di machine learning e tecniche NLP individuano istruzioni dannose in contenuti esterni  
   - Analisi in tempo reale di documenti, pagine web, email e fonti dati per minacce incorporate  
   - Comprensione contestuale di pattern di prompt legittimi vs. malevoli  

2. **Tecniche di Spotlighting**  
   - Distingue tra istruzioni di sistema fidate e input esterni potenzialmente compromessi  
   - Metodi di trasformazione del testo che migliorano la rilevanza del modello isolando contenuti dannosi  
   - Aiuta i sistemi AI a mantenere una gerarchia corretta delle istruzioni e ignorare comandi iniettati  

3. **Sistemi di Delimitazione e Marcatura Dati**  
   - Definizione esplicita di confini tra messaggi di sistema fidati e testo di input esterno  
   - Marker speciali evidenziano i confini tra fonti dati fidate e non fidate  
   - Separazione chiara previene confusione delle istruzioni ed esecuzione di comandi non autorizzati  

4. **Intelligence Minaccia Continua**  
   - Microsoft monitora continuamente nuovi pattern di attacco e aggiorna le difese  
   - Ricerca proattiva delle minacce per nuove tecniche di injection e vettori d’attacco  
   - Aggiornamenti regolari del modello di sicurezza per mantenere efficacia contro minacce evolutive  

5. **Integrazione Azure Content Safety**  
   - Parte della suite completa Azure AI Content Safety  
   - Rilevamento aggiuntivo di tentativi di jailbreak, contenuti dannosi e violazioni di policy di sicurezza  
   - Controlli di sicurezza unificati su componenti dell’applicazione AI  

**Risorse di Implementazione**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/it/prompt-shield.ff5b95be76e9c78c.webp)  


## Minacce Avanzate di Sicurezza MCP

### Vulnerabilità di Hijacking di Sessione

**L’hijacking di sessione** rappresenta un vettore d’attacco critico nelle implementazioni MCP stateful, dove parti non autorizzate ottengono e abusano di identificatori di sessione legittimi per impersonare clienti ed eseguire azioni non autorizzate.

#### **Scenari di Attacco e Rischi**

- **Injection di Prompt tramite Hijacking di Sessione**: Attaccanti con ID di sessione rubati iniettano eventi malevoli in server che condividono stato di sessione, potenzialmente attivando azioni dannose o accedendo a dati sensibili  
- **Impersonificazione Diretta**: ID di sessione rubati consentono chiamate dirette al server MCP che bypassano l’autenticazione, trattando l’attaccante come utente legittimo  
- **Stream Resumable Compromessi**: Attaccanti possono terminare prematuramente richieste, causando il riavvio di client legittimi con contenuti potenzialmente malevoli  

#### **Controlli di Sicurezza per la Gestione delle Sessioni**

**Requisiti Critici:**  
- **Verifica dell’Autorizzazione**: I server MCP che implementano autorizzazione **DEVONO** verificare TUTTE le richieste in ingresso e **NON DEVONO** affidarsi alle sessioni per l’autenticazione  
- **Generazione Sicura della Sessione**: Utilizzo di ID di sessione crittograficamente sicuri, non deterministici, generati con generatori di numeri casuali sicuri  
- **Binding Specifico per Utente**: Collegamento degli ID di sessione a informazioni specifiche dell’utente con formati come `<user_id>:<session_id>` per prevenire l’abuso di sessioni tra utenti  
- **Gestione del Ciclo di Vita della Sessione**: Implementare scadenze, rotazioni e invalidazioni corrette per limitare le finestre di vulnerabilità  
- **Sicurezza del Trasporto**: HTTPS obbligatorio per tutta la comunicazione per prevenire intercettazioni degli ID di sessione  

### Problema del Confused Deputy

Il **problema del confused deputy** si verifica quando i server MCP agiscono da proxy di autenticazione tra client e servizi di terze parti, creando opportunità per bypass di autorizzazione attraverso lo sfruttamento di client ID statici.

#### **Meccaniche di Attacco e Rischi**

- **Bypass del Consenso Basato su Cookie**: Autenticazioni utente precedenti creano cookie di consenso che gli attaccanti sfruttano con richieste di autorizzazione malevole contenenti URI di reindirizzamento elaborati  
- **Furto di Codici di Autorizzazione**: Cookie di consenso esistenti possono far sì che i server di autorizzazione saltino schermate di consenso, reindirizzando i codici a endpoint controllati dall’attaccante  
- **Accesso API Non Autorizzato**: Codici di autorizzazione rubati consentono lo scambio di token e l’impersonificazione dell’utente senza approvazione esplicita  

#### **Strategie di Mitigazione**

**Controlli Obbligatori:**  
- **Requisiti di Consenso Esplicito**: I proxy MCP che utilizzano client ID statici **DEVONO** ottenere il consenso dell’utente per ogni client registrato dinamicamente  
- **Implementazione Sicurezza OAuth 2.1**: Seguire le best practice di sicurezza OAuth attuali inclusa PKCE (Proof Key for Code Exchange) per tutte le richieste di autorizzazione  
- **Validazione Rigorosa del Client**: Implementare rigorose validazioni degli URI di reindirizzamento e degli identificatori client per prevenire exploitation  

### Vulnerabilità Token Passthrough  

Il **token passthrough** rappresenta un anti-pattern esplicito dove server MCP accettano token client senza adeguata validazione e li inoltrano ad API downstream, violando le specifiche di autorizzazione MCP.

#### **Implicazioni di Sicurezza**

- **Circumventione dei Controlli**: Uso diretto di token client-to-API che bypassa limiti critici di rate limiting, validazione e monitoraggio  
- **Corruzione del Tracciamento**: Token emessi a monte rendono impossibile identificare il client, compromettendo le capacità di indagine sugli incidenti  
- **Esfiltrazione Dati via Proxy**: Token non validati permettono a attori malevoli di usare i server come proxy per accesso dati non autorizzato  
- **Violazioni del Confine di Fiducia**: Le assunzioni di fiducia dei servizi downstream possono essere violate se non si verifica l’origine dei token  
- **Espansione Multi-servizio dell’Attacco**: Token compromessi accettati su più servizi consentono movimenti laterali  

#### **Controlli di Sicurezza Richiesti**

**Requisiti Non Negoziaibili:**  
- **Validazione Token**: I server MCP **NON DEVONO** accettare token non esplicitamente emessi per il server MCP  
- **Verifica del Pubblico**: Validare sempre che il claim audience del token corrisponda all’identità del server MCP  
- **Gestione Corretta del Ciclo di Vita del Token**: Implementare token di accesso a breve durata con pratiche sicure di rotazione  

## Sicurezza della Supply Chain per Sistemi AI

La sicurezza della supply chain è evoluta oltre le tradizionali dipendenze software per comprendere l’intero ecosistema AI. Le implementazioni MCP moderne devono verificare e monitorare rigorosamente tutti i componenti AI, poiché ciascuno introduce potenziali vulnerabilità che potrebbero compromettere l’integrità del sistema.

### Componenti Espansi della Supply Chain AI

**Dipendenze Software Tradizionali:**  
- Librerie open-source e framework  
- Immagini container e sistemi base  
- Strumenti di sviluppo e pipeline di build  
- Componenti e servizi infrastrutturali  

**Elementi Specifici della Supply Chain AI:**  
- **Modelli Foundation**: Modelli pre-addestrati da vari fornitori che richiedono verifica della provenienza  
- **Servizi di Embedding**: Servizi esterni di vettorizzazione e ricerca semantica  
- **Provider di Contesto**: Fonti dati, knowledge base e repository documentali  
- **API di Terze Parti**: Servizi AI esterni, pipeline ML e endpoint di elaborazione dati  
- **Artefatti di Modello**: Pesi, configurazioni e varianti di modelli fine-tuned  
- **Fonti di Dati di Training**: Dataset utilizzati per l’addestramento e il fine-tuning del modello  

### Strategia Completa di Sicurezza della Supply Chain

#### **Verifica e Fiducia nei Componenti**  
- **Validazione della Provenienza**: Verificare origine, licenze e integrità di tutti i componenti AI prima dell’integrazione  
- **Valutazione della Sicurezza**: Eseguire scansioni di vulnerabilità e revisioni di sicurezza su modelli, fonti dati e servizi AI  
- **Analisi della Reputazione**: Valutare il track record di sicurezza e le pratiche dei fornitori di servizi AI  
- **Verifica della Conformità**: Assicurare che tutti i componenti soddisfino requisiti organizzativi di sicurezza e normativi  

#### **Pipeline di Deployment Sicure**  
- **Sicurezza CI/CD Automatica**: Integrare scansioni di sicurezza in pipeline di deployment automatizzate  
- **Integrità degli Artefatti**: Implementare verifiche crittografiche su tutti gli artefatti distribuiti (codice, modelli, configurazioni)  
- **Deployment a Stadi**: Usare strategie progressive di deployment con validazione di sicurezza in ogni fase  
- **Repository di Artefatti Fidati**: Deploy solo da registri e repository artefatti verificati e sicuri  

#### **Monitoraggio e Risposta Continua**  
- **Scansione Dipendenze**: Monitoraggio continuo delle vulnerabilità per tutte le dipendenze software e componenti AI  
- **Monitoraggio Modelli**: Valutazione continua del comportamento del modello, deriva delle prestazioni e anomalie di sicurezza  
- **Monitoraggio Salute Servizi**: Controllo dei servizi AI esterni per disponibilità, incidenti di sicurezza e cambiamenti di policy  
- **Integrazione Threat Intelligence**: Integrazione di feed di minacce specifici per sicurezza AI e ML  

#### **Controllo Accessi e Privilegio Minimo**  
- **Permessi a Livello di Componente**: Restringere accesso a modelli, dati e servizi basato su necessità di business  
- **Gestione Account di Servizio**: Implementare account servizio dedicati con permessi minimi richiesti  
- **Segmentazione di Rete**: Isolare componenti AI e limitare accesso di rete tra servizi  
- **Controlli API Gateway**: Usare gateway API centralizzati per controllare e monitorare accesso a servizi AI esterni  

#### **Risposta a Incidenti e Recovery**  
- **Procedure di Risposta Rapida**: Processi stabiliti per patchare o sostituire componenti AI compromessi  
- **Rotazione Credenziali**: Sistemi automatizzati per la rotazione di segreti, chiavi API e credenziali di servizio  
- **Capacità di Rollback**: Possibilità di tornare rapidamente a versioni note e stabili dei componenti AI  
- **Recupero da Breach della Supply Chain**: Procedure specifiche per rispondere a compromissioni di servizi AI upstream  

### Strumenti e Integrazione di Sicurezza Microsoft

**GitHub Advanced Security** offre protezione completa della supply chain includendo:  
- **Secret Scanning**: Rilevamento automatico di credenziali, chiavi API e token nei repository  
- **Dependency Scanning**: Valutazione di vulnerabilità per dipendenze open-source e librerie  
- **CodeQL Analysis**: Analisi statica del codice per vulnerabilità di sicurezza e problemi di coding  
- **Supply Chain Insights**: Visibilità sulla salute e stato di sicurezza delle dipendenze  

**Integrazione Azure DevOps & Azure Repos:**  
- Integrazione seamless di scansione sicurezza su piattaforme di sviluppo Microsoft  
- Controlli automatici di sicurezza in Azure Pipelines per workload AI  
- Applicazione di policy per deployment sicuro di componenti AI  

**Pratiche Interne Microsoft:**  
Microsoft applica ampie pratiche di sicurezza della supply chain in tutti i prodotti. Scopri approcci comprovati in [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Best Practice di Sicurezza Fondamentale

Le implementazioni MCP ereditano e costruiscono sulla postura di sicurezza esistente della vostra organizzazione. Rafforzare le pratiche di sicurezza fondamentali migliora significativamente la sicurezza complessiva dei sistemi AI e dei deployment MCP.

### Fondamentali di Sicurezza Core

#### **Pratiche di Sviluppo Sicuro**  
- **Conformità OWASP**: Protezione contro le vulnerabilità web delle [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Protezione Specifica AI**: Implementazione di controlli per le [OWASP Top 10 per LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Gestione Sicura dei Segreti**: Uso di vault dedicati per token, chiavi API e dati di configurazione sensibili  
- **Crittografia End-to-End**: Comunicazioni sicure tra tutti i componenti applicativi e pipeline dati  
- **Validazione degli Input**: Validazione rigorosa di tutti gli input utente, parametri API e fonti dati  

#### **Indurimento dell’Infrastruttura**  
- **Autenticazione Multi-Fattore**: MFA obbligatorio per tutti account amministrativi e di servizio  
- **Gestione Patch**: Patch automatiche e tempestive per sistemi operativi, framework e dipendenze  
- **Integrazione Identity Provider**: Gestione centralizzata delle identità tramite provider aziendali (Microsoft Entra ID, Active Directory)  
- **Segmentazione di Rete**: Isolamento logico dei componenti MCP per limitare potenziali movimenti laterali  
- **Principio del Privilegio Minimo**: Permessi minimi necessari per tutti componenti e account di sistema  

#### **Monitoraggio e Rilevamento di Sicurezza**  
- **Logging Completo**: Registrazione dettagliata delle attività applicative AI, inclusi interazioni client-server MCP  
- **Integrazione SIEM**: Gestione centralizzata di informazioni e eventi di sicurezza per rilevamento anomalie  
- **Analisi Comportamentale**: Monitoraggio AI-powered per rilevare pattern insoliti in sistema e comportamento utenti  
- **Threat Intelligence**: Integrazione di feed di minacce esterni e indicatori di compromissione (IOC)  
- **Risposta a Incidenti**: Procedure ben definite per rilevamento, risposta e recupero da incidenti di sicurezza  

#### **Architettura Zero Trust**  
- **Mai Fidarsi, Sempre Verificare**: Verifica continua di utenti, dispositivi e connessioni di rete  
- **Micro-Segmentazione**: Controlli granulari di rete che isolano workload e servizi individuali  
- **Sicurezza Centrata sull’Identità**: Policy di sicurezza basate su identità verificate anziché posizione di rete  
- **Valutazione Continua del Rischio**: Valutazione dinamica della postura di sicurezza basata su contesto e comportamento attuale  
- **Accesso Condizionato**: Controlli di accesso adattivi basati su fattori di rischio, localizzazione e affidabilità del dispositivo  

### Pattern di Integrazione Aziendale

#### **Integrazione con Ecosistema di Sicurezza Microsoft**  
- **Microsoft Defender for Cloud**: Gestione completa della postura di sicurezza cloud  
- **Azure Sentinel**: SIEM e SOAR nativi cloud per protezione dei workload AI  
- **Microsoft Entra ID**: Gestione enterprise di identità e accessi con policy di accesso condizionato  
- **Azure Key Vault**: Gestione centralizzata dei segreti con supporto hardware security module (HSM)  
- **Microsoft Purview**: Governance e compliance dei dati per fonti dati e flussi di lavoro AI  

#### **Compliance e Governance**  
- **Allineamento Normativo**: Garantire che le implementazioni MCP soddisfino requisiti di compliance settoriali (GDPR, HIPAA, SOC 2)  
- **Classificazione dei Dati**: Categorizzazione e gestione adeguata dei dati sensibili elaborati dai sistemi AI  
- **Tracce di Audit**: Logging completo per compliance normativa e indagini forensi  
- **Controlli Privacy**: Implementazione di principi privacy-by-design nell’architettura del sistema AI  
- **Gestione del Cambiamento**: Processi formali per revisioni di sicurezza delle modifiche al sistema AI  

Queste pratiche fondamentali creano una solida base di sicurezza che migliora l’efficacia dei controlli di sicurezza specifici MCP e fornisce una protezione completa per applicazioni guidate da AI.
## Principali Indicazioni sulla Sicurezza

- **Approccio alla Sicurezza Stratificata**: Combina pratiche di sicurezza fondamentali (codifica sicura, minimo privilegio, verifica della supply chain, monitoraggio continuo) con controlli specifici per l'IA per una protezione completa

- **Scenario delle Minacce Specifiche per l'IA**: I sistemi MCP affrontano rischi unici tra cui injection di prompt, avvelenamento degli strumenti, hijacking delle sessioni, problemi di confused deputy, vulnerabilità di token passthrough e permessi eccessivi che richiedono mitigazioni specializzate

- **Eccellenza nell'Autenticazione e Autorizzazione**: Implementa una robusta autenticazione utilizzando provider di identità esterni (Microsoft Entra ID), applica una corretta validazione dei token, e non accettare mai token non esplicitamente emessi per il tuo server MCP

- **Prevenzione degli Attacchi IA**: Implementa Microsoft Prompt Shields e Azure Content Safety per difendere contro injection indirette di prompt e attacchi di avvelenamento degli strumenti, mentre verifichi i metadati degli strumenti e monitori cambiamenti dinamici

- **Sicurezza delle Sessioni e del Trasporto**: Usa ID di sessione crittograficamente sicuri e non deterministici legati alle identità degli utenti, implementa una corretta gestione del ciclo di vita delle sessioni, e non usare mai le sessioni per l'autenticazione

- **Best Practice di Sicurezza OAuth**: Previeni attacchi confused deputy attraverso esplicito consenso dell'utente per client registrati dinamicamente, corretta implementazione di OAuth 2.1 con PKCE, e rigorosa validazione degli URI di redirect  

- **Principi di Sicurezza dei Token**: Evita anti-pattern di token passthrough, valida le claim audience dei token, implementa token a breve durata con rotazione sicura, e mantieni confini di fiducia chiari

- **Sicurezza Completa della Supply Chain**: Tratta tutti i componenti dell'ecosistema IA (modelli, embeddings, provider di contesto, API esterne) con lo stesso rigore di sicurezza delle dipendenze software tradizionali

- **Evoluzione Continua**: Rimani aggiornato con le rapide evoluzioni delle specifiche MCP, contribuisci agli standard della comunità di sicurezza, e mantieni posture di sicurezza adattative man mano che il protocollo matura

- **Integrazione della Sicurezza Microsoft**: Sfrutta l'ecosistema di sicurezza completo di Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) per una protezione avanzata delle distribuzioni MCP

## Risorse Complete

### **Documentazione Ufficiale sulla Sicurezza MCP**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **Risorse di Sicurezza OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Completo OWASP MCP Top 10 con indicazioni di implementazione su Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rischi di sicurezza ufficiali OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica sulla sicurezza per MCP su Azure

### **Standard di Sicurezza e Best Practice**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Ricerca e Analisi sulla Sicurezza AI**
- [Injection di Prompt in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Attacchi di Avvelenamento degli Strumenti (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing sulla Ricerca di Sicurezza MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluzioni di Sicurezza Microsoft**
- [Documentazione Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Servizio Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Sicurezza Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Best Practice per la Gestione dei Token su Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guide di Implementazione e Tutorial**
- [Azure API Management come Gateway di Autenticazione MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autenticazione Microsoft Entra ID con Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Archiviazione Sicura dei Token e Crittografia (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps e Sicurezza della Supply Chain**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Viaggio Microsoft nella Sicurezza della Supply Chain](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentazione Aggiuntiva sulla Sicurezza**

Per indicazioni complete sulla sicurezza, consulta questi documenti specializzati in questa sezione:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Best practice complete di sicurezza per implementazioni MCP
- **[Implementazione Azure Content Safety](./azure-content-safety-implementation.md)** - Esempi pratici di implementazione per integrazione Azure Content Safety  
- **[Controlli di Sicurezza MCP 2025](./mcp-security-controls-2025.md)** - Controlli e tecniche di sicurezza più recenti per distribuzioni MCP
- **[Guida Rapida alle Best Practices MCP](./mcp-best-practices.md)** - Guida rapida per pratiche essenziali di sicurezza MCP

### **Formazione Pratica sulla Sicurezza**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop pratico completo per la messa in sicurezza di server MCP su Azure con camp progressivi da Base Camp a Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Architettura di riferimento e linee guida di implementazione per tutti i rischi OWASP MCP Top 10

---

## Il Prossimo Passo

Successivo: [Capitolo 3: Iniziare](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Pur facendo del nostro meglio per garantire la precisione, si prega di considerare che le traduzioni automatiche possono contenere errori o inesattezze. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si consiglia una traduzione professionale effettuata da un umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->