# MCP Security: Protezione Completa per Sistemi AI

[![MCP Security Best Practices](../../../translated_images/it/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Clicca sull'immagine sopra per vedere il video di questa lezione)_

La sicurezza è fondamentale nella progettazione dei sistemi AI, per questo la prioritizziamo come nostra seconda sezione. Questo si allinea con il principio **Secure by Design** di Microsoft proveniente dal [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Il Model Context Protocol (MCP) porta potenti nuove capacità alle applicazioni guidate dall’AI introducendo al contempo sfide di sicurezza uniche che vanno oltre i rischi tradizionali del software. I sistemi MCP affrontano sia problemi di sicurezza consolidati (codifica sicura, principio del minimo privilegio, sicurezza della supply chain) sia nuove minacce specifiche dell’AI, inclusi prompt injection, avvelenamento degli strumenti, hijacking delle sessioni, attacchi confused deputy, vulnerabilità di token passthrough e modifiche dinamiche delle capacità.

Questa lezione esplora i rischi di sicurezza più critici nelle implementazioni MCP — coprendo autenticazione, autorizzazione, permessi eccessivi, prompt injection indiretta, sicurezza delle sessioni, problemi di confused deputy, gestione dei token e vulnerabilità della supply chain. Imparerai controlli pratici e best practice per mitigare questi rischi sfruttando soluzioni Microsoft come Prompt Shields, Azure Content Safety e GitHub Advanced Security per rafforzare il tuo deployment MCP.

## Obiettivi di Apprendimento

Al termine di questa lezione, sarai in grado di:

- **Identificare Minacce Specifiche MCP**: Riconoscere rischi di sicurezza unici nei sistemi MCP inclusi prompt injection, avvelenamento degli strumenti, permessi eccessivi, hijacking di sessioni, problemi confused deputy, vulnerabilità token passthrough e rischi della supply chain
- **Applicare Controlli di Sicurezza**: Implementare mitigazioni efficaci quali autenticazione robusta, accesso con minimo privilegio, gestione sicura dei token, controlli di sicurezza delle sessioni e verifica della supply chain
- **Sfruttare Soluzioni di Sicurezza Microsoft**: Comprendere e utilizzare Microsoft Prompt Shields, Azure Content Safety e GitHub Advanced Security per la protezione dei workload MCP
- **Validare la Sicurezza degli Strumenti**: Riconoscere l’importanza della validazione dei metadata degli strumenti, monitorare modifiche dinamiche e difendersi da attacchi di prompt injection indiretta
- **Integrare Best Practice**: Combinare i fondamenti di sicurezza consolidati (codifica sicura, hardening server, zero trust) con controlli specifici MCP per una protezione completa

# Architettura e Controlli di Sicurezza MCP

Le implementazioni MCP moderne richiedono approcci di sicurezza a più livelli che affrontino sia la sicurezza tradizionale del software sia le minacce specifiche dell’AI. La specifica MCP in rapida evoluzione continua a maturare i controlli di sicurezza, permettendo una migliore integrazione con architetture di sicurezza enterprise e best practice consolidate.

Le ricerche dal [Microsoft Digital Defense Report](https://aka.ms/mddr) dimostrano che **il 98% delle violazioni segnalate sarebbe prevenuto da una rigorosa igiene di sicurezza**. La strategia di protezione più efficace combina pratiche di sicurezza fondamentali con controlli specifici MCP — le misure di sicurezza di base provate rimangono le più impattanti per ridurre il rischio complessivo.

## Scenario Attuale della Sicurezza

> **Nota:** Queste informazioni riflettono gli standard di sicurezza MCP al **5 febbraio 2026**, in linea con la **Specificazione MCP 2025-11-25**. Il protocollo MCP continua a evolversi rapidamente e future implementazioni potrebbero introdurre nuovi pattern di autenticazione e controlli avanzati. Consulta sempre la più recente [Specificazione MCP](https://spec.modelcontextprotocol.io/), il [repository GitHub MCP](https://github.com/modelcontextprotocol) e la [documentazione best practice di sicurezza](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) per le indicazioni aggiornate.

> **Guardando avanti:** il candidato rilascio `2026-07-28` rafforza ulteriormente l’autorizzazione — i client devono validare il parametro `iss` nelle risposte di autorizzazione (RFC 9207), dichiarare un `application_type` OpenID Connect durante la Registrazione Dinamica dei Client e vincolare le credenziali registrate al server di autorizzazione che le ha emesse. Vedi [Cosa cambia in MCP: Il candidato rilascio 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) per l’elenco completo dei SEP di autorizzazione.

## 🏔️ Workshop MCP Security Summit (Sherpa)

Per **formazione pratica sulla sicurezza**, raccomandiamo caldamente il **Workshop MCP Security Summit** (Sherpa) — una spedizione guidata completa per mettere in sicurezza i server MCP in Microsoft Azure.

### Panoramica del Workshop

Il [Workshop MCP Security Summit](https://azure-samples.github.io/sherpa/) offre formazione di sicurezza pratica e applicabile attraverso una metodologia comprovata di tipo "vulnerabile → sfrutta → correggi → valida". Con questo corso:

- **Impara Rompendo le Cose**: Esperimenta vulnerabilità sfruttando server intenzionalmente insicuri
- **Usa la Sicurezza Nativa Azure**: Sfrutta Azure Entra ID, Key Vault, API Management e AI Content Safety
- **Segui la Difesa in Profondità**: Avanza attraverso campi che costruiscono livelli di sicurezza completi
- **Applica Standard OWASP**: Ogni tecnica mappa alla [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Ottieni Codice di Produzione**: Porta a casa implementazioni funzionanti e testate

### Itinerario della Spedizione

| Campo | Focus | Rischi OWASP Coperti |
|------|-------|---------------------|
| **Campo Base** | Fondamenti MCP e vulnerabilità di autenticazione | MCP01, MCP07 |
| **Campo 1: Identità** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Campo 2: Gateway** | API Management, Endpoint Privati, governance | MCP02, MCP06, MCP07, MCP09 |
| **Campo 3: Sicurezza I/O** | Prompt injection, protezione PII, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Campo 4: Monitoraggio** | Log Analytics, dashboard, rilevamento minacce | MCP04, MCP08 |
| **La Vettta** | Test di integrazione Red Team / Blue Team | Tutti |

**Inizia Ora**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Rischi di Sicurezza

La [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) dettaglia i dieci rischi di sicurezza più critici per le implementazioni MCP:

| Rischio | Descrizione | Mitigazione Azure |
|------|-------------|------------------|
| **MCP01** | Misgestione Token e Esposizione Segreti | Azure Key Vault, Managed Identity |
| **MCP02** | Escalation di Privilegi tramite Scope Creep | RBAC, Conditional Access |
| **MCP03** | Avvelenamento degli Strumenti | Validazione strumenti, verifica integrità |
| **MCP04** | Attacchi alla Supply Chain Software e Manomissione Dipendenze | GitHub Advanced Security, scansione dipendenze |
| **MCP05** | Command Injection ed Esecuzione | Validazione input, sandboxing |
| **MCP06** | Sovversione del Flusso di Intent | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticazione e Autorizzazione Insufficienti | Azure Entra ID, OAuth 2.1 con PKCE |
| **MCP08** | Mancanza di Audit e Telemetria | Azure Monitor, Application Insights |
| **MCP09** | Server MCP Ombra | Governance API Center, isolamento di rete |
| **MCP10** | Iniezione di Contesto e Sovra-Condivisione | Classificazione dati, esposizione minima |

### Evoluzione dell’Autenticazione MCP

La specifica MCP è evoluta significativamente nell’approccio a autenticazione e autorizzazione:

- **Approccio Originale**: Specifiche iniziali richiedevano agli sviluppatori di implementare server di autenticazione personalizzati, con i server MCP che agivano come OAuth 2.0 Authorization Server gestendo direttamente l’autenticazione degli utenti
- **Standard Attuale (2025-11-25)**: Specifica aggiornata permette ai server MCP di delegare l’autenticazione a provider di identità esterni (come Microsoft Entra ID), migliorando la postura di sicurezza e riducendo la complessità di implementazione
- **Transport Layer Security**: Supporto potenziato per meccanismi di trasporto sicuri con pattern di autenticazione appropriati sia per connessioni locali (STDIO) sia remote (Streamable HTTP)

## Sicurezza di Autenticazione e Autorizzazione

### Sfide Attuali di Sicurezza

Le implementazioni MCP moderne affrontano diverse sfide di autenticazione e autorizzazione:

### Rischi e Vettori di Minaccia

- **Logica di Autorizzazione Configurata Male**: Implementazioni difettose della logica di autorizzazione nei server MCP possono esporre dati sensibili e applicare controlli di accesso errati
- **Compromissione Token OAuth**: Furto locale di token sul server MCP permette attaccanti di impersonare i server e accedere a servizi downstream
- **Vulnerabilità Token Passthrough**: Gestione impropria dei token crea bypass dei controlli di sicurezza e lacune di responsabilità
- **Permessi Eccessivi**: Server MCP con privilegi eccessivi violano il principio di minimo privilegio ed espandono la superficie di attacco

#### Token Passthrough: Un Anti-Pattern Critico

**Il token passthrough è esplicitamente proibito** nella specifica MCP di autorizzazione attuale a causa delle pesanti implicazioni di sicurezza:

##### Elusione dei Controlli di Sicurezza
- Server MCP e API downstream implementano controlli critici (rate limiting, validazione richieste, monitoraggio traffico) che dipendono da una corretta validazione token
- L’uso diretto dal client verso API di token bypassa queste protezioni essenziali, minando l’architettura di sicurezza

##### Problemi di Responsabilità e Audit  
- Server MCP non distinguono i client che usano token emessi upstream, compromettendo i tracciamenti di audit
- I log dei server resource downstream mostrano origini richieste fuorvianti anziché intermediari MCP reali
- Le indagini sugli incidenti e gli audit di compliance diventano molto più difficili

##### Rischi di Esfiltrazione Dati
- Claim token non validati permettono ad attori malintenzionati con token rubati di usare server MCP come proxy per esfiltrazione dati
- Violenze del confine di fiducia permettono schemi di accesso non autorizzato che bypassano controlli di sicurezza previsti

##### Vettori di Attacco Multi-Servizio
- Token compromessi accettati da più servizi abilitano movimenti laterali tra sistemi connessi
- Assunzioni di fiducia tra servizi possono essere violate quando l’origine token non è verificabile

### Controlli di Sicurezza e Mitigazioni

**Requisiti di Sicurezza Critici:**

> **OBBLIGATORIO**: I server MCP **NON DEVONO** accettare token che non siano stati esplicitamente emessi per il server MCP

#### Controlli di Autenticazione e Autorizzazione

- **Revisione Rigorosa dell’Autorizzazione**: Eseguire audit completi della logica di autorizzazione del server MCP per assicurarsi che solo utenti e client previsti possano accedere a risorse sensibili
  - **Guida all’Implementazione**: [Azure API Management come Gateway di Autenticazione per Server MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrazione Identità**: [Uso di Microsoft Entra ID per Autenticazione Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestione Sicura dei Token**: Implementare le [best practice Microsoft per validazione e ciclo di vita dei token](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validare che i claim audience del token corrispondano all’identità del server MCP
  - Implementare politiche adeguate di rotazione e scadenza dei token
  - Prevenire attacchi di replay dei token e usi non autorizzati

- **Archiviazione Protetta dei Token**: Conservare i token cifrati sia a riposo che in transito
  - **Best Practice**: [Linee guida per Archiviazione e Cifratura Token Sicuri](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementazione del Controllo Accessi

- **Principio del Minimo Privilegio**: Concedere ai server MCP solo i permessi minimi necessari per la funzionalità prevista
  - Revisioni regolari dei permessi per prevenire escalation di privilegi
  - **Documentazione Microsoft**: [Accesso Sicuro Least-Privileged](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Assegnare ruoli a grana fine
  - Limitare ruoli a risorse e azioni specifiche
  - Evitare permessi ampi o non necessari che ampliano la superficie di attacco

- **Monitoraggio Continuo dei Permessi**: Eseguire auditing e monitoraggio costante degli accessi
  - Monitorare schemi di uso permessi per anomalie
  - Intervenire tempestivamente per privilegi eccessivi o non usati

## Minacce di Sicurezza Specifiche per AI

### Attacchi di Prompt Injection e Manipolazione Strumenti

Le implementazioni MCP moderne affrontano vettori d’attacco AI-specifici sofisticati che misure di sicurezza tradizionali non possono affrontare pienamente:

#### **Prompt Injection Indiretta (Prompt Injection Cross-Domain)**

La **Prompt Injection Indiretta** rappresenta una delle vulnerabilità più critiche nei sistemi AI abilitati MCP. Gli attaccanti inseriscono istruzioni dannose all’interno di contenuti esterni — documenti, pagine web, email o fonti dati — che i sistemi AI elaborano successivamente come comandi legittimi.

**Scenari di Attacco:**
- **Iniezione basata su Documenti**: Istruzioni dannose nascoste in documenti processati che attivano azioni AI indesiderate
- **Sfruttamento di Contenuti Web**: Pagine web compromesse contenenti prompt incorporati che manipolano il comportamento AI quando eseguite scraping
- **Attacchi via Email**: Prompt dannosi nelle email che fanno sì che assistenti AI perdano dati o compiano azioni non autorizzate
- **Contaminazione Fonti Dati**: Database o API compromessi che servono contenuto avvelenato ai sistemi AI

**Impatto Reale**: Questi attacchi possono causare esfiltrazione dati, violazioni della privacy, generazione di contenuti dannosi e manipolazione delle interazioni utente. Per analisi dettagliata, vedi [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagramma Attacco Prompt Injection](../../../translated_images/it/prompt-injection.ed9fbfde297ca877.webp)

#### **Attacchi di Avvelenamento Strumenti**

L’**Avvelenamento degli Strumenti** mira ai metadata che definiscono gli strumenti MCP, sfruttando il modo in cui i LLM interpretano descrizioni e parametri degli strumenti per prendere decisioni di esecuzione.

**Meccanismi d’Attacco:**
- **Manipolazione Metadata**: Gli attaccanti iniettano istruzioni dannose nelle descrizioni degli strumenti, definizioni dei parametri o esempi d’uso
- **Istruzioni Invisibili**: Prompt nascosti nei metadata degli strumenti elaborati dai modelli AI ma invisibili agli utenti umani
- **Modifica Dinamica degli Strumenti (“Rug Pulls”)**: Strumenti approvati dagli utenti vengono successivamente modificati per compiere azioni dannose senza che l’utente se ne accorga
- **Iniezione Parametri**: Contenuti malevoli incorporati negli schemi dei parametri dello strumento che influenzano il comportamento del modello
**Rischi dei Server Ospitati**: I server remoti MCP presentano rischi elevati poiché le definizioni degli strumenti possono essere aggiornate dopo l'approvazione iniziale da parte dell'utente, creando scenari in cui strumenti precedentemente sicuri diventano dannosi. Per un'analisi completa, consultare [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagramma Attacco di Iniezione di Strumenti](../../../translated_images/it/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ulteriori Vettori di Attacco AI**

- **Iniezione di Prompt Cross-Domain (XPIA)**: Attacchi sofisticati che sfruttano contenuti da più domini per bypassare i controlli di sicurezza
- **Modifica Dinamica delle Capacità**: Cambiamenti in tempo reale delle capacità degli strumenti che sfuggono alle valutazioni di sicurezza iniziali
- **Avvelenamento della Finestra di Contesto**: Attacchi che manipolano grandi finestre di contesto per nascondere istruzioni dannose
- **Attacchi di Confusione del Modello**: Sfruttamento delle limitazioni del modello per creare comportamenti imprevedibili o non sicuri


### Impatto dei Rischi di Sicurezza AI

**Conseguenze ad Alto Impatto:**
- **Esfiltrazione di Dati**: Accesso non autorizzato e furto di dati sensibili aziendali o personali
- **Violazioni della Privacy**: Esposizione di informazioni personali identificabili (PII) e dati aziendali riservati  
- **Manipolazione del Sistema**: Modifiche non intenzionali a sistemi e flussi di lavoro critici
- **Furto di Credenziali**: Compromissione di token di autenticazione e credenziali di servizio
- **Movimenti Laterali**: Uso di sistemi AI compromessi come punti pivot per attacchi di rete più ampi

### Soluzioni di Sicurezza AI Microsoft

#### **AI Prompt Shields: Protezione Avanzata Contro Attacchi di Iniezione**

Microsoft **AI Prompt Shields** fornisce una difesa completa contro attacchi di iniezione di prompt diretti e indiretti attraverso molteplici livelli di sicurezza:

##### **Meccanismi di Protezione Principali:**

1. **Rilevamento Avanzato & Filtraggio**
   - Algoritmi di machine learning e tecniche NLP rilevano istruzioni dannose nei contenuti esterni
   - Analisi in tempo reale di documenti, pagine web, email e fonti dati per minacce incorporate
   - Comprensione contestuale di pattern di prompt legittimi vs dannosi

2. **Tecniche di Spotlighting**  
   - Distingue tra istruzioni di sistema fidate e input esterni potenzialmente compromessi
   - Metodi di trasformazione del testo che migliorano la pertinenza del modello isolando contenuti malevoli
   - Aiuta i sistemi AI a mantenere una gerarchia corretta delle istruzioni e ignorare comandi iniettati

3. **Sistemi di Delimitazione e Marcatura dei Dati**
   - Definizione esplicita dei confini tra messaggi di sistema fidati e testo di input esterno
   - Marcatori speciali evidenziano i confini tra fonti dati fidate e non fidate
   - Separazione chiara previene confusioni tra istruzioni e l'esecuzione non autorizzata di comandi

4. **Intelligence sulle Minacce Continua**
   - Microsoft monitora costantemente i pattern emergenti di attacco e aggiorna le difese
   - Ricerca proattiva delle minacce per nuove tecniche di iniezione e vettori di attacco
   - Aggiornamenti regolari dei modelli di sicurezza per mantenere efficacia contro minacce in evoluzione

5. **Integrazione Azure Content Safety**
   - Parte della suite Azure AI Content Safety completa
   - Rilevamento aggiuntivo per tentativi di jailbreak, contenuti dannosi e violazioni delle politiche di sicurezza
   - Controlli di sicurezza unificati in tutti i componenti dell’applicazione AI

**Risorse di Implementazione**: [Documentazione Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/it/prompt-shield.ff5b95be76e9c78c.webp)


## Minacce Avanzate alla Sicurezza MCP

### Vulnerabilità di Hijacking della Sessione

L’**hijacking della sessione** rappresenta un vettore d’attacco critico nelle implementazioni MCP stateful dove parti non autorizzate ottengono e abusano di identificatori di sessione legittimi per impersonare clienti ed eseguire azioni non autorizzate.

#### **Scenari di Attacco & Rischi**

- **Iniezione di Prompt tramite Hijack di Sessione**: Gli attaccanti con ID di sessione rubati iniettano eventi malevoli in server che condividono lo stato di sessione, potenzialmente attivando azioni dannose o accedendo a dati riservati
- **Impersonificazione Diretta**: Gli ID di sessione rubati consentono chiamate dirette al server MCP che bypassano l’autenticazione, trattando gli attaccanti come utenti legittimi
- **Stream Resumable Compromessi**: Gli attaccanti possono terminare prematuramente richieste, causando ai clienti legittimi la ripresa con contenuti potenzialmente malevoli

#### **Controlli di Sicurezza per la Gestione delle Sessioni**

**Requisiti Critici:**
- **Verifica dell’Autorizzazione**: I server MCP che implementano autorizzazione **DEVONO** verificare TUTTE le richieste in ingresso e **NON DEVONO** basarsi sulle sessioni per l’autenticazione
- **Generazione Sicura di Sessione**: Usare ID di sessione non deterministici e crittograficamente sicuri generati con generatori di numeri casuali sicuri
- **Vincolo Specifico dell’Utente**: Vincolare gli ID di sessione a informazioni specifiche dell’utente usando formati come `<user_id>:<session_id>` per prevenire abusi cross-user
- **Gestione del Ciclo di Vita delle Sessioni**: Implementare corretta scadenza, rotazione e invalidazione per limitare finestre di vulnerabilità
- **Sicurezza del Trasporto**: HTTPS obbligatorio per tutte le comunicazioni per prevenire l’intercettazione degli ID di sessione

### Problema del Confused Deputy

Il **problema del confused deputy** si verifica quando i server MCP agiscono da proxy di autenticazione tra clienti e servizi di terze parti, creando opportunità per il bypass dell’autorizzazione attraverso lo sfruttamento di client ID statici.

#### **Meccanica e Rischi dell’Attacco**

- **Bypass del Consenso Basato su Cookie**: La precedente autenticazione utente crea cookie di consenso che gli attaccanti sfruttano tramite richieste di autorizzazione malevoli con URI di reindirizzamento costruiti
- **Furto di Codice di Autorizzazione**: Cookie di consenso esistenti possono far sì che i server di autorizzazione omettano schermate di consenso, reindirizzando i codici a endpoint controllati dagli attaccanti  
- **Accesso API Non Autorizzato**: I codici di autorizzazione rubati permettono lo scambio di token e l’impersonificazione utente senza approvazione esplicita

#### **Strategie di Mitigazione**

**Controlli Obbligatori:**
- **Requisiti di Consenso Esplicito**: I server proxy MCP che usano client ID statici **DEVONO** ottenere il consenso utente per ogni client registrato dinamicamente
- **Implementazione Sicurezza OAuth 2.1**: Seguire le migliori pratiche attuali di sicurezza OAuth incluso PKCE (Proof Key for Code Exchange) per tutte le richieste di autorizzazione
- **Validazione Rigida del Client**: Implementare validazione rigorosa degli URI di reindirizzamento e degli identificativi client per prevenire sfruttamenti

### Vulnerabilità di Token Passthrough  

Il **token passthrough** rappresenta un anti-pattern esplicito dove i server MCP accettano token dei client senza valida convalida e li inoltrano ad API downstream, violando le specifiche di autorizzazione MCP.

#### **Implicazioni di Sicurezza**

- **Circumvenzione del Controllo**: L’uso diretto di token client-to-API bypassa controlli critici di limitazione della frequenza, validazione e monitoraggio
- **Corruzione della Traccia di Audit**: I token emessi a monte rendono impossibile l’identificazione del client, compromettendo le capacità di indagine sugli incidenti
- **Esfiltrazione di Dati tramite Proxy**: Token non validati consentono agli attori malevoli di usare i server come proxy per accessi non autorizzati ai dati
- **Violazioni dei Confini di Fiducia**: Le assunzioni di fiducia dei servizi downstream possono essere violate quando non si può verificare l’origine del token
- **Espansione di Attacchi Multi-Servizio**: I token compromessi accettati su più servizi consentono movimenti laterali

#### **Controlli di Sicurezza Richiesti**

**Requisiti Non Negozibili:**
- **Validazione del Token**: I server MCP **NON DEVONO** accettare token non esplicitamente emessi per il server MCP
- **Verifica del Pubblico (Audience)**: Validare sempre che le claim audience del token corrispondano all’identità del server MCP
- **Corretto Ciclo di Vita del Token**: Implementare token di accesso a breve durata con pratiche sicure di rotazione


## Sicurezza della Supply Chain per Sistemi AI

La sicurezza della supply chain si è evoluta oltre le tradizionali dipendenze software per abbracciare l’intero ecosistema AI. Le implementazioni MCP moderne devono verificare e monitorare rigorosamente tutti i componenti correlati all’AI, poiché ciascuno introduce potenziali vulnerabilità che potrebbero compromettere l’integrità del sistema.

### Componenti Estesi della Supply Chain AI

**Dipendenze Software Tradizionali:**
- Librerie open-source e framework
- Immagini container e sistemi base  
- Strumenti di sviluppo e pipeline di build
- Componenti infrastrutturali e servizi

**Elementi Specifici della Supply Chain AI:**
- **Modelli Fondazionali**: Modelli pre-addestrati da vari fornitori che richiedono verifica della provenienza
- **Servizi di Embedding**: Servizi esterni di vettorizzazione e ricerca semantica
- **Provider di Contesto**: Fonti dati, basi di conoscenza e repository documentali  
- **API di Terze Parti**: Servizi AI esterni, pipeline ML e endpoint di elaborazione dati
- **Artifact di Modello**: Pesi, configurazioni e varianti di modelli affinati
- **Fonti di Dati per Addestramento**: Dataset utilizzati per addestramento e raffinamento del modello

### Strategia Completa per la Sicurezza della Supply Chain

#### **Verifica dei Componenti & Fiducia**
- **Validazione della Provenienza**: Verificare origine, licenza e integrità di tutti i componenti AI prima dell’integrazione
- **Valutazione di Sicurezza**: Eseguire scansioni di vulnerabilità e revisioni di sicurezza per modelli, fonti dati e servizi AI
- **Analisi della Reputazione**: Valutare il track record di sicurezza e le pratiche dei fornitori di servizi AI
- **Verifica di Conformità**: Assicurare che tutti i componenti rispettino requisiti organizzativi di sicurezza e normativi

#### **Pipeline di Deploy Sicure**  
- **Sicurezza CI/CD Automatizzata**: Integrare scanning di sicurezza in tutte le pipeline di deployment automatizzate
- **Integrità degli Artifact**: Implementare verifiche crittografiche per tutti gli artifact deployati (codice, modelli, configurazioni)
- **Deploy a Fasi**: Usare strategie di deploy progressive con validazione di sicurezza a ogni fase
- **Repository di Artifact Fidati**: Deploy solo da registry e repository di artifact verificati e sicuri

#### **Monitoraggio e Risposta Continua**
- **Scansione delle Dipendenze**: Monitoraggio costante delle vulnerabilità per tutte le dipendenze software e componenti AI
- **Monitoraggio del Modello**: Valutazione continua del comportamento del modello, deriva delle prestazioni e anomalie di sicurezza
- **Monitoraggio dello Stato dei Servizi**: Osservazione dei servizi AI esterni per disponibilità, incidenti di sicurezza e cambiamenti di policy
- **Integrazione dell’Intel sulla Minaccia**: Incorporazione di feed di minacce specifici per rischi di sicurezza AI e ML

#### **Controllo degli Accessi & Minimo Privilegio**
- **Permessi a Livello di Componente**: Limitazione degli accessi a modelli, dati e servizi in base a necessità di business
- **Gestione Account di Servizio**: Implementare account di servizio dedicati con permessi minimi necessari
- **Segmentazione di Rete**: Isolare componenti AI e limitare accessi tra servizi a livello di rete
- **Controlli API Gateway**: Usare gateway API centralizzati per controllare e monitorare l’accesso ai servizi AI esterni

#### **Risposta agli Incidenti & Recupero**
- **Procedure di Risposta Rapida**: Processi stabiliti per patch o sostituzione di componenti AI compromessi
- **Rotazione delle Credenziali**: Sistemi automatizzati per la rotazione di segreti, chiavi API e credenziali di servizio
- **Capacità di Rollback**: Possibilità di tornare rapidamente a versioni precedenti note come sicure dei componenti AI
- **Recupero da Violazioni della Supply Chain**: Procedure specifiche per rispondere a compromissioni di servizi AI a monte

### Strumenti di Sicurezza & Integrazione Microsoft

**GitHub Advanced Security** offre protezione completa della supply chain inclusi:
- **Secret Scanning**: Rilevamento automatizzato di credenziali, chiavi API e token nei repository
- **Dependency Scanning**: Valutazione delle vulnerabilità per dipendenze open-source e librerie
- **CodeQL Analysis**: Analisi statica del codice per vulnerabilità di sicurezza e problemi di programmazione
- **Supply Chain Insights**: Visibilità sulla salute e lo stato di sicurezza delle dipendenze

**Integrazione Azure DevOps & Azure Repos:**
- Integrazione seamless di scanning di sicurezza nelle piattaforme Microsoft di sviluppo
- Controlli di sicurezza automatici in Azure Pipelines per carichi di lavoro AI
- Applicazione di policy per il deploy sicuro di componenti AI

**Pratiche Interne Microsoft:**
Microsoft implementa pratiche estese per la sicurezza della supply chain in tutti i prodotti. Scopri gli approcci collaudati in [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Best Practice di Sicurezza Fondamentale

Le implementazioni MCP ereditano e si costruiscono sulla postura di sicurezza esistente della tua organizzazione. Rafforzare le pratiche di sicurezza fondamentali migliora significativamente la sicurezza complessiva dei sistemi AI e dei deployment MCP.

### Fondamenti di Sicurezza Core

#### **Pratiche di Sviluppo Sicuro**
- **Conformità OWASP**: Protezione contro le vulnerabilità delle applicazioni web [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Protezioni Specifiche per AI**: Implementare controlli per [OWASP Top 10 per LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Gestione Sicura dei Segreti**: Usare vault dedicati per token, chiavi API e dati di configurazione sensibili
- **Crittografia End-to-End**: Comunicazioni sicure in tutti i componenti applicativi e flussi dati
- **Validazione degli Input**: Rigorosa validazione di tutti gli input utente, parametri API e fonti dati

#### **Irrigidimento dell’Infrastruttura**
- **Autenticazione Multi-Fattore**: MFA obbligatorio per tutti gli account amministrativi e di servizio
- **Gestione delle Patch**: Patch automatizzate e tempestive per sistemi operativi, framework e dipendenze  
- **Integrazione Identity Provider**: Gestione dell’identità centralizzata tramite provider aziendali (Microsoft Entra ID, Active Directory)
- **Segmentazione di Rete**: Isolamento logico dei componenti MCP per limitare movimenti laterali
- **Principio del Minimo Privilegio**: Permessi minimi necessari per tutti i componenti e account di sistema

#### **Monitoraggio & Rilevamento di Sicurezza**
- **Logging Completo**: Log dettagliati delle attività applicative AI, inclusi le interazioni client-server MCP
- **Integrazione SIEM**: Gestione centralizzata di informazioni e eventi di sicurezza per la rilevazione di anomalie
- **Analisi Comportamentale**: Monitoraggio AI-powered per rilevare pattern insoliti nei comportamenti di sistema e utente
- **Intelligence sulle Minacce**: Integrazione di feed di minacce esterni e indicatori di compromissione (IOC)
- **Risposta agli Incidenti**: Procedure ben definite per il rilevamento, risposta e recupero da incidenti di sicurezza

#### **Architettura Zero Trust**
- **Mai Fidarsi, Sempre Verificare**: Verifica continua di utenti, dispositivi e connessioni di rete
- **Micro-Segmentazione**: Controlli granulari di rete che isolano singoli workload e servizi
- **Sicurezza Centrata sull’Identità**: Politiche di sicurezza basate su identità verificate anziché sulla posizione in rete
- **Valutazione del Rischio Continua**: Valutazione dinamica della postura di sicurezza basata sul contesto e comportamento corrente
- **Accesso Condizionale**: Controlli di accesso che si adattano in base a fattori di rischio, posizione e affidabilità del dispositivo

### Pattern di Integrazione Aziendale

#### **Integrazione nell’Ecosistema di Sicurezza Microsoft**
- **Microsoft Defender for Cloud**: Gestione completa della postura di sicurezza cloud
- **Azure Sentinel**: Capacità SIEM e SOAR native cloud per la protezione dei carichi AI
- **Microsoft Entra ID**: Gestione aziendale di identità e accessi con politiche di accesso condizionale
- **Azure Key Vault**: Gestione centralizzata dei segreti con supporto hardware security module (HSM)
- **Microsoft Purview**: Governance e conformità dei dati per fonti dati e flussi di lavoro AI

#### **Conformità & Governance**
- **Allineamento Regolamentare**: Assicurare che le implementazioni MCP rispettino i requisiti di conformità specifici del settore (GDPR, HIPAA, SOC 2)
- **Classificazione dei Dati**: Corretta categorizzazione e gestione dei dati sensibili elaborati dai sistemi AI
- **Tracce di Audit**: Registrazioni dettagliate per la conformità normativa e l'indagine forense
- **Controlli sulla Privacy**: Implementazione dei principi di privacy-by-design nell'architettura dei sistemi AI
- **Gestione del Cambiamento**: Processi formali per le revisioni di sicurezza delle modifiche ai sistemi AI

Queste pratiche fondamentali creano una base di sicurezza solida che migliora l'efficacia dei controlli di sicurezza specifici per MCP e fornisce una protezione completa per le applicazioni guidate dall'AI.

## Principali Consigli sulla Sicurezza

- **Approccio di Sicurezza a Strati**: Combinare pratiche di sicurezza fondamentali (programmazione sicura, minimo privilegio, verifica della supply chain, monitoraggio continuo) con controlli specifici per AI per una protezione completa

- **Scenario delle Minacce Specifico per AI**: I sistemi MCP affrontano rischi unici tra cui injection di prompt, avvelenamento di strumenti, session hijacking, problemi di confused deputy, vulnerabilità di token passthrough e permessi eccessivi che richiedono mitigazioni specializzate

- **Eccellenza in Autenticazione e Autorizzazione**: Implementare un'autenticazione robusta utilizzando provider di identità esterni (Microsoft Entra ID), applicare una corretta validazione dei token e non accettare mai token non esplicitamente emessi per il tuo server MCP

- **Prevenzione degli Attacchi AI**: Distribuire Microsoft Prompt Shields e Azure Content Safety per difendersi da injection indiretta di prompt e attacchi di avvelenamento degli strumenti, validando i metadati degli strumenti e monitorando cambiamenti dinamici

- **Sicurezza di Sessione e Trasporto**: Usare ID di sessione criptograficamente sicuri e non deterministici legati alle identità degli utenti, implementare una corretta gestione del ciclo di vita della sessione e non usare mai le sessioni per l'autenticazione

- **Best Practice di Sicurezza OAuth**: Prevenire attacchi confused deputy tramite consenso esplicito dell'utente per client registrati dinamicamente, corretta implementazione di OAuth 2.1 con PKCE e rigorosa validazione degli URI di redirect  

- **Principi di Sicurezza dei Token**: Evitare anti-pattern di token passthrough, validare le audience dei token, implementare token a breve durata con rotazione sicura, e mantenere confini chiari di fiducia

- **Sicurezza Completa della Supply Chain**: Trattare tutti i componenti dell’ecosistema AI (modelli, embeddings, provider di contesto, API esterne) con la stessa rigorosità di sicurezza delle dipendenze software tradizionali

- **Evoluzione Continua**: Tenersi aggiornati con le specifiche MCP in rapido sviluppo, contribuire agli standard della comunità di sicurezza, e mantenere posture di sicurezza adattive man mano che il protocollo matura

- **Integrazione con la Sicurezza Microsoft**: Sfruttare l’ecosistema di sicurezza completo di Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) per una protezione migliorata del deployment MCP

## Risorse Complete

### **Documentazione Ufficiale sulla Sicurezza MCP**
- [Specifiche MCP (Corrente: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specifiche Autorizzazione MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repository GitHub MCP](https://github.com/modelcontextprotocol)

### **Risorse OWASP per la Sicurezza MCP**
- [Guida alla Sicurezza Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Guida completa OWASP MCP Top 10 con implementazione su Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rischi ufficiali OWASP MCP per la sicurezza
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica sulla sicurezza MCP su Azure

### **Standard di Sicurezza & Best Practice**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 per Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Ricerca & Analisi sulla Sicurezza AI**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Attacchi di Avvelenamento degli Strumenti (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Rapporto di Ricerca sulla Sicurezza MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluzioni di Sicurezza Microsoft**
- [Documentazione Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Servizio Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Sicurezza Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Best Practice Gestione Token Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guide di Implementazione & Tutorial**
- [Azure API Management come Gateway di Autenticazione MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autenticazione Microsoft Entra ID con Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Memorizzazione Sicura dei Token e Crittografia (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Sicurezza della Supply Chain**
- [Sicurezza Azure DevOps](https://azure.microsoft.com/products/devops)
- [Sicurezza Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Percorso di Sicurezza della Supply Chain Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentazione di Sicurezza Aggiuntiva**

Per una guida completa sulla sicurezza, fare riferimento a questi documenti specializzati in questa sezione:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Best practice complete di sicurezza per le implementazioni MCP
- **[Implementazione Azure Content Safety](./azure-content-safety-implementation.md)** - Esempi pratici di integrazione di Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Controlli di sicurezza e tecniche più recenti per i deployment MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Guida rapida di riferimento per le pratiche essenziali di sicurezza MCP
- **[BlueHat 2026: Proteggere il futuro dell’AI: Sicurezza MCP con modelli di difesa in profondità](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Modelli di difesa in profondità dal Microsoft Security Response Center (MSRC)

### **Formazione Pratica sulla Sicurezza**

- **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop pratico completo per la messa in sicurezza dei server MCP su Azure con camp progressivi da Base Camp a Summit
- **[Guida Sicurezza Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Architettura di riferimento e linee guida di implementazione per tutti i rischi OWASP MCP Top 10

---

## Cosa Succede Dopo

Successivo: [Capitolo 3: Primo Avvio](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->