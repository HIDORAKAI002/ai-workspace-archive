# MCP Security: Protezione Completa per i Sistemi AI

[![MCP Security Best Practices](../../../translated_images/it/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Clicca sull'immagine sopra per guardare il video di questa lezione)_

La sicurezza è fondamentale nella progettazione dei sistemi AI, motivo per cui la poniamo come nostra seconda sezione. Questo è allineato al principio di **Secure by Design** di Microsoft, proveniente dal [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Il Model Context Protocol (MCP) porta potenti nuove capacità alle applicazioni guidate dall’AI introducendo al contempo sfide di sicurezza uniche che vanno oltre i rischi tradizionali del software. I sistemi MCP affrontano sia problemi di sicurezza consolidati (codifica sicura, minimo privilegio, sicurezza della catena di fornitura) sia nuove minacce specifiche per l’AI tra cui iniezione di prompt, avvelenamento degli strumenti, hijacking di sessione, attacchi confused deputy, vulnerabilità di passaggio token e modifiche dinamiche delle capacità.

Questa lezione esplora i rischi di sicurezza più critici nelle implementazioni MCP—coprendo autenticazione, autorizzazione, permessi eccessivi, iniezione indiretta di prompt, sicurezza delle sessioni, problemi confused deputy, gestione dei token e vulnerabilità della catena di fornitura. Imparerai controlli azionabili e best practice per mitigare questi rischi sfruttando soluzioni Microsoft come Prompt Shields, Azure Content Safety e GitHub Advanced Security per rafforzare il tuo deployment MCP.

## Obiettivi di Apprendimento

Al termine di questa lezione sarai in grado di:

- **Identificare Minacce Specifiche MCP**: Riconoscere i rischi di sicurezza unici nei sistemi MCP, inclusi iniezione di prompt, avvelenamento degli strumenti, permessi eccessivi, hijacking di sessione, problemi confused deputy, vulnerabilità di passaggio token e rischi della catena di fornitura
- **Applicare Controlli di Sicurezza**: Implementare mitigazioni efficaci come autenticazione robusta, accesso a minimo privilegio, gestione sicura dei token, controlli di sicurezza delle sessioni e verifica della catena di fornitura
- **Sfruttare Soluzioni di Sicurezza Microsoft**: Comprendere e adottare Microsoft Prompt Shields, Azure Content Safety e GitHub Advanced Security per la protezione dei workload MCP
- **Validare la Sicurezza degli Strumenti**: Riconoscere l’importanza della validazione dei metadati degli strumenti, il monitoraggio di modifiche dinamiche e la difesa contro attacchi di iniezione indiretta di prompt
- **Integrare Best Practice**: Combinare fondamenta di sicurezza consolidate (codifica sicura, hardening del server, zero trust) con controlli specifici MCP per una protezione completa

# Architettura e Controlli di Sicurezza MCP

Le implementazioni moderne di MCP richiedono approcci di sicurezza stratificati che affrontino sia la sicurezza tradizionale del software sia le minacce specifiche AI. La specifica MCP in rapida evoluzione continua a maturare i suoi controlli di sicurezza, abilitando una migliore integrazione con architetture di sicurezza aziendali e best practice consolidate.

La ricerca dal [Microsoft Digital Defense Report](https://aka.ms/mddr) mostra che **il 98% delle violazioni segnalate sarebbe prevenuto da una solida igiene di sicurezza**. La strategia di protezione più efficace combina pratiche di sicurezza fondamentali con controlli specifici MCP—le misure di sicurezza di base più efficaci rimangono quelle con il maggior impatto nella riduzione complessiva del rischio.

## Scenario Attuale della Sicurezza

> **Nota:** Queste informazioni riflettono gli standard di sicurezza MCP al **5 febbraio 2026**, allineati alla **Specificazione MCP 2025-11-25**. Il protocollo MCP continua a evolversi rapidamente, e le future implementazioni potrebbero introdurre nuovi modelli di autenticazione e controlli migliorati. Consulta sempre la più recente [Specificazione MCP](https://spec.modelcontextprotocol.io/), il [repository GitHub MCP](https://github.com/modelcontextprotocol) e la [documentazione sulle best practice di sicurezza](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) per le indicazioni aggiornate.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Per una **formazione pratica sulla sicurezza**, raccomandiamo vivamente il **MCP Security Summit Workshop** (Sherpa) - una spedizione guidata completa per mettere in sicurezza i server MCP in Microsoft Azure.

### Panoramica del Workshop

Il [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) offre formazione pratica e azionabile attraverso una metodologia collaudata di "vulnerabile → sfrutta → correggi → valida". Durante il corso:

- **Impara Rompendo le Cose**: Sperimenta vulnerabilità sfruttando server intenzionalmente insicuri
- **Usa la Sicurezza Nativa di Azure**: Sfrutta Azure Entra ID, Key Vault, API Management e AI Content Safety
- **Segui la Difesa a Profondità**: Avanza attraverso i campi costruendo livelli di sicurezza completi
- **Applica Standard OWASP**: Ogni tecnica si mappa alla [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Ottieni Codice di Produzione**: Porta a casa implementazioni funzionanti e testate

### Itinerario della Spedizione

| Campo | Focus | Rischi OWASP Coperti |
|-------|-------|---------------------|
| **Base Camp** | Fondamenti MCP & vulnerabilità di autenticazione | MCP01, MCP07 |
| **Camp 1: Identità** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Endpoint Privati, governance | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: Sicurezza I/O** | Iniezione di prompt, protezione PII, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: Monitoraggio** | Log Analytics, dashboard, rilevazione minacce | MCP04, MCP08 |
| **Il Summit** | Test integrazione Red Team / Blue Team | Tutti |

**Inizia qui**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## I 10 Rischi di Sicurezza OWASP MCP Principali

La [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) illustra i dieci rischi di sicurezza più critici per le implementazioni MCP:

| Rischio | Descrizione | Mitigazione Azure |
|---------|-------------|-------------------|
| **MCP01** | Scarsa gestione dei token & esposizione di segreti | Azure Key Vault, Managed Identity |
| **MCP02** | Escalation di privilegi tramite aumento dello scope | RBAC, Accesso Condizionale |
| **MCP03** | Avvelenamento degli strumenti | Validazione degli strumenti, verifica integrità |
| **MCP04** | Attacchi alla catena di fornitura software & manomissione delle dipendenze | GitHub Advanced Security, scansione dipendenze |
| **MCP05** | Iniezione di comandi & esecuzione | Validazione input, sandboxing |
| **MCP06** | Sottversione del flusso di intenti | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticazione & autorizzazione insufficienti | Azure Entra ID, OAuth 2.1 con PKCE |
| **MCP08** | Mancanza di audit e telemetria | Azure Monitor, Application Insights |
| **MCP09** | Server MCP ombra | Governance API Center, isolamento di rete |
| **MCP10** | Iniezione di contesto & esposizione eccessiva | Classificazione dati, esposizione minima |

### Evoluzione dell’Autenticazione MCP

La specifica MCP ha significativamente evoluto il suo approccio ad autenticazione e autorizzazione:

- **Approccio Originale**: Le prime specifiche richiedevano agli sviluppatori di implementare server di autenticazione personalizzati, con i server MCP che agivano come OAuth 2.0 Authorization Server gestendo direttamente l’autenticazione degli utenti
- **Standard Attuale (2025-11-25)**: La specifica aggiornata consente ai server MCP di delegare l’autenticazione a provider esterni come Microsoft Entra ID, migliorando la postura di sicurezza e riducendo la complessità di implementazione
- **Layer di Trasporto Sicuro**: Supporto migliorato per meccanismi di trasporto sicuro con pattern di autenticazione adeguati sia per connessioni locali (STDIO) che remote (Streamable HTTP)

## Sicurezza di Autenticazione & Autorizzazione

### Sfide di Sicurezza Attuali

Le implementazioni MCP moderne affrontano diverse sfide in autenticazione e autorizzazione:

### Rischi e Vettori di Attacco

- **Logica di Autorizzazione Mal Configurata**: Implementazioni difettose di autorizzazione nei server MCP possono esporre dati sensibili e applicare in modo errato i controlli di accesso
- **Compromissione del Token OAuth**: Il furto dei token sul server MCP locale consente agli attaccanti di impersonare server e accedere a servizi downstream
- **Vulnerabilità di Passaggio Token**: Una gestione impropria dei token crea bypass dei controlli di sicurezza e lacune di responsabilità
- **Permessi Eccessivi**: Server MCP sovra-privilegiati violano il principio del minimo privilegio ed espandono la superficie di attacco

#### Passaggio Token: Un Anti-Pattern Critico

**Il passaggio token è esplicitamente proibito** nella specifica attuale di autorizzazione MCP a causa delle gravi implicazioni di sicurezza:

##### Circumvenzione dei Controlli di Sicurezza
- I server MCP e le API downstream implementano controlli critici (limitazioni di velocità, validazione richieste, monitoraggio traffico) che dipendono dalla corretta validazione dei token
- L’uso diretto di token client-to-API bypassa queste protezioni essenziali, minando l’architettura di sicurezza

##### Sfide di Responsabilità & Audit  
- I server MCP non possono distinguere tra client che usano token emessi da upstream, rompendo le tracce di audit
- I log del resource server downstream mostrano origini di richieste fuorvianti invece dei reali intermediari MCP
- Le indagini sugli incidenti e i controlli di conformità diventano significativamente più difficili

##### Rischi di Esfiltrazione Dati
- Le affermazioni di token non validate permettono a malintenzionati con token rubati di usare i server MCP come proxy per l’esfiltrazione dati
- Le violazioni del confine di fiducia consentono accessi non autorizzati superando i controlli di sicurezza previsti

##### Vettori di Attacco Multi-Servizio
- Token compromessi accettati da molteplici servizi abilitano movimenti laterali attraverso sistemi connessi
- Le ipotesi di fiducia tra servizi possono essere violate quando l’origine del token non è verificabile

### Controlli di Sicurezza & Mitigazioni

**Requisiti Critici di Sicurezza:**

> **OBBLIGATORIO**: I server MCP **NON DEVONO** accettare token non esplicitamente emessi per il server MCP stesso

#### Controlli di Autenticazione & Autorizzazione

- **Revisione Rigida dell’Autorizzazione**: Esegui audit completi della logica di autorizzazione dei server MCP per garantire che solo utenti e client previsti accedano a risorse sensibili
  - **Guida all’Implementazione**: [Azure API Management come Gateway di Autenticazione per server MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrazione Identità**: [Uso di Microsoft Entra ID per l’Autenticazione del Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestione Sicura dei Token**: Implementa le [best practice Microsoft per la validazione e il ciclo di vita dei token](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valida che l’audience del token corrisponda all’identità del server MCP
  - Applica politiche corrette di rotazione ed expiration del token
  - Previeni attacchi di replay e usi non autorizzati

- **Archivio Protetto dei Token**: Proteggi la memorizzazione del token con crittografia a riposo e in transito
  - **Best Practice**: [Linee guida per la conservazione e crittografia sicura dei token](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementazione del Controllo Accessi

- **Principio del Minimo Privilegio**: Concedi ai server MCP solo permessi minimi necessari per la funzionalità prevista
  - Revisioni regolari dei permessi per prevenire creeping di privilegi
  - **Documentazione Microsoft**: [Accesso sicuro a minimo privilegio](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controllo di Accesso Basato su Ruolo (RBAC)**: Implementa assegnazioni di ruolo granulare
  - Scope dei ruoli limitato a risorse e azioni specifiche
  - Evita permessi ampi o inutili che espandono la superficie di attacco

- **Monitoraggio Continuo dei Permessi**: Implementa audit e monitoraggio costante degli accessi
  - Osserva pattern di utilizzo dei permessi per anomalie
  - Rimedi rapidi per privilegi eccessivi o non utilizzati

## Minacce di Sicurezza Specifiche per AI

### Attacchi di Iniezione Prompt & Manipolazione Strumenti

Le implementazioni MCP moderne affrontano vettori di attacco sofisticati specifici AI che i tradizionali controlli di sicurezza non possono affrontare completamente:

#### **Iniezione Indiretta di Prompt (Iniezione di Prompt Cross-Domain)**

L’**Iniezione Indiretta di Prompt** rappresenta una delle vulnerabilità più critiche nei sistemi AI abilitati MCP. Gli attaccanti inseriscono istruzioni dannose all’interno di contenuti esterni—documenti, pagine web, email o fonti dati—che i sistemi AI processano successivamente come comandi legittimi.

**Scenari d’Attacco:**
- **Iniezione basata su Documenti**: Istruzioni dannose nascoste in documenti elaborati che innescano azioni AI indesiderate
- **Sfruttamento di Contenuto Web**: Pagine web compromesse contenenti prompt incorporati che manipolano il comportamento AI quando raschiati
- **Attacchi via Email**: Prompt maligni nelle email che inducono assistenti AI a divulgare informazioni o eseguire azioni non autorizzate
- **Contaminazione delle Fonti Dati**: Database o API compromessi che forniscono contenuti contaminati ai sistemi AI

**Impatto Reale**: Questi attacchi possono causare esfiltrazione dati, violazioni della privacy, generazione di contenuti dannosi e manipolazione delle interazioni utente. Per un’analisi dettagliata, vedi [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/it/prompt-injection.ed9fbfde297ca877.webp)

#### **Attacchi di Avvelenamento Strumento**

L’**Avvelenamento degli Strumenti** prende di mira i metadati che definiscono gli strumenti MCP, sfruttando il modo in cui i LLM interpretano descrizioni e parametri degli strumenti per prendere decisioni di esecuzione.

**Meccanismi di Attacco:**
- **Manipolazione dei Metadati**: Gli attaccanti iniettano istruzioni dannose nelle descrizioni degli strumenti, definizioni dei parametri o esempi di utilizzo
- **Istruzioni Invisibili**: Prompt nascosti nei metadati degli strumenti processati dai modelli AI ma invisibili agli utenti umani
- **Modifica Dinamica degli Strumenti ("Rug Pulls")**: Strumenti approvati dagli utenti successivamente modificati per azioni dannose senza consapevolezza dell’utente
- **Iniezione Parametri**: Contenuti maligni integrati negli schemi dei parametri degli strumenti che influenzano il comportamento del modello

**Rischi dei Server Ospitati**: I server MCP remoti presentano rischi elevati poiché le definizioni degli strumenti possono essere aggiornate dopo l’approvazione iniziale da parte dell’utente, creando scenari dove strumenti precedentemente sicuri diventano maligni. Per analisi completa, vedi [Attacchi di Avvelenamento Strumenti (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/it/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ulteriori Vettori di Attacco AI**

- **Iniezione di Prompt Cross-Domain (XPIA)**: Attacchi sofisticati che sfruttano contenuti da molteplici domini per bypassare i controlli di sicurezza
- **Modifica Dinamica delle Capacità**: Cambiamenti in tempo reale delle capacità degli strumenti che sfuggono alle valutazioni di sicurezza iniziali  
- **Avvelenamento della Finestra di Contesto**: Attacchi che manipolano grandi finestre di contesto per nascondere istruzioni dannose  
- **Attacchi di Confusione del Modello**: Sfruttamento dei limiti del modello per creare comportamenti imprevedibili o non sicuri  

### Impatto dei Rischi di Sicurezza AI

**Conseguenze ad Alto Impatto:**  
- **Esfiltrazione di Dati**: Accesso non autorizzato e furto di dati sensibili aziendali o personali  
- **Violazioni della Privacy**: Esposizione di informazioni personali identificabili (PII) e dati aziendali riservati  
- **Manipolazione del Sistema**: Modifiche non intenzionali a sistemi e flussi di lavoro critici  
- **Furto di Credenziali**: Compromissione di token di autenticazione e credenziali di servizio  
- **Movimenti Laterali**: Uso di sistemi AI compromessi come pivot per attacchi di rete più ampi  

### Soluzioni di Sicurezza AI Microsoft

#### **AI Prompt Shields: Protezione Avanzata Contro Attacchi di Injection**

Microsoft **AI Prompt Shields** fornisce una difesa completa contro attacchi di injection prompt diretti e indiretti tramite più livelli di sicurezza:

##### **Meccanismi di Protezione Principali:**

1. **Rilevamento Avanzato e Filtraggio**  
   - Algoritmi di machine learning e tecniche di NLP rilevano istruzioni dannose nei contenuti esterni  
   - Analisi in tempo reale di documenti, pagine web, email e fonti dati per minacce incorporate  
   - Comprensione contestuale dei pattern di prompt legittimi vs. dannosi  

2. **Tecniche di Spotlighting**  
   - Distingue tra istruzioni di sistema affidabili e input esterni potenzialmente compromessi  
   - Metodi di trasformazione del testo che migliorano la rilevanza del modello isolando contenuti dannosi  
   - Aiuta i sistemi AI a mantenere una gerarchia di istruzioni corretta e ignorare comandi iniettati  

3. **Sistemi di Delimitazione e Datamarking**  
   - Definizione esplicita dei confini tra messaggi di sistema affidabili e testo di input esterno  
   - Marker speciali evidenziano i confini tra fonti dati affidabili e non affidabili  
   - Separa chiaramente per prevenire confusione nelle istruzioni ed esecuzione non autorizzata di comandi  

4. **Intelligence Minacce Continua**  
   - Microsoft monitora costantemente nuovi pattern di attacco e aggiorna le difese  
   - Ricerca proattiva di nuove tecniche di injection e vettori di attacco  
   - Aggiornamenti regolari dei modelli di sicurezza per mantenere efficacia contro minacce evolutive  

5. **Integrazione con Azure Content Safety**  
   - Parte della suite Azure AI Content Safety completa  
   - Rilevamento aggiuntivo di tentativi di jailbreak, contenuti dannosi e violazioni di policy di sicurezza  
   - Controlli unificati di sicurezza tra i componenti dell’applicazione AI  

**Risorse per l’Implementazione**: [Documentazione Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/it/prompt-shield.ff5b95be76e9c78c.webp)


## Minacce Avanzate alla Sicurezza MCP

### Vulnerabilità di Session Hijacking

**Session hijacking** rappresenta un vettore d’attacco critico nelle implementazioni statful MCP dove parti non autorizzate ottengono e abusano di identificativi di sessione legittimi per impersonare client ed eseguire azioni non autorizzate.

#### **Scenari d’Attacco e Rischi**

- **Injection Prompt da Session Hijack**: Attaccanti con ID sessione rubati iniettano eventi dannosi in server che condividono stato di sessione, causando potenzialmente azioni dannose o accesso a dati sensibili  
- **Impersonificazione Diretta**: ID sessione rubati abilitano chiamate dirette al server MCP che bypassano l’autenticazione, trattando gli attaccanti come utenti legittimi  
- **Stream Resumable Compromessi**: Attaccanti possono terminare prematuramente richieste, facendo riprendere i client legittimi con contenuti potenzialmente dannosi  

#### **Controlli di Sicurezza per la Gestione della Sessione**

**Requisiti Critici:**  
- **Verifica dell’Autorizzazione**: I server MCP che implementano autorizzazione **DEVONO** verificare TUTTE le richieste in ingresso e **NON DEVONO** affidarsi a sessioni per l’autenticazione  
- **Generazione Sicura della Sessione**: Usare ID sessione non deterministici crittograficamente sicuri generati con generatori di numeri casuali sicuri  
- **Vincolo Specifico per Utente**: Vincolare gli ID sessione a informazioni specifiche dell’utente usando formati come `<user_id>:<session_id>` per prevenire abusi cross-user delle sessioni  
- **Gestione del Ciclo di Vita della Sessione**: Implementare scadenza, rotazione e invalidamento appropriati per limitare finestre di vulnerabilità  
- **Sicurezza di Trasporto**: HTTPS obbligatorio per tutte le comunicazioni per prevenire intercettazioni degli ID sessione  

### Problema del Delegato Confuso

Il **problema del delegato confuso** si verifica quando i server MCP agiscono da proxy di autenticazione tra client e servizi di terze parti, creando opportunità di bypass di autorizzazione tramite sfruttamento degli ID client statici.

#### **Meccaniche d’Attacco e Rischi**

- **Bypass del Consenso Basato su Cookie**: Autenticazioni utente precedenti creano cookie di consenso che gli attaccanti sfruttano con richieste di autorizzazione malevole contenenti URI di redirect manipolati  
- **Furto del Codice di Autorizzazione**: Cookie di consenso esistenti possono far saltare le schermate di consenso, reindirizzando codici verso endpoint controllati dall’attaccante  
- **Accesso API Non Autorizzato**: Codici di autorizzazione rubati permettono lo scambio di token e impersonificazioni senza il consenso esplicito  

#### **Strategie di Mitigazione**

**Controlli Obbligatori:**  
- **Richieste di Consenso Esplicite**: I server proxy MCP che usano ID client statici **DEVONO** ottenere il consenso dell’utente per ogni client registrato dinamicamente  
- **Implementazione Sicura OAuth 2.1**: Seguire le migliori pratiche di sicurezza OAuth correnti inclusa PKCE (Proof Key for Code Exchange) per tutte le richieste di autorizzazione  
- **Validazione Rigorosa del Client**: Implementare una validazione rigorosa degli URI di redirect e degli identificatori client per prevenire sfruttamenti  

### Vulnerabilità di Passaggio Token  

Il **passaggio token** rappresenta un anti-pattern esplicito dove i server MCP accettano token client senza una valida convalida e li inoltrano alle API a valle, violando le specifiche di autorizzazione MCP.

#### **Implicazioni di Sicurezza**

- **Circumvention dei Controlli**: L’uso diretto del token client verso le API bypassa controlli critici di rate limiting, validazione e monitoraggio  
- **Corruzione della Traccia di Audit**: I token emessi a monte rendono impossibile l’identificazione del client, compromettendo la capacità di indagine sugli incidenti  
- **Esfiltrazione Dati tramite Proxy**: Token non validati permettono ad attori maligni di usare i server come proxy per accessi dati non autorizzati  
- **Violazioni dei Confini di Fiducia**: I servizi a valle possono avere le assunzioni di fiducia violate quando non si può verificare l’origine dei token  
- **Espansione degli Attacchi Multi-Servizio**: Token compromessi accettati in più servizi abilitano movimenti laterali  

#### **Controlli di Sicurezza Richiesti**

**Requisiti Non Negozionabili:**  
- **Validazione dei Token**: I server MCP **NON DEVONO** accettare token non esplicitamente emessi per il server MCP  
- **Verifica del Destinatario**: Verificare sempre che il claim di audience del token corrisponda all’identità del server MCP  
- **Ciclo di Vita Corretto del Token**: Implementare token di accesso a breve durata con pratiche sicure di rotazione  


## Sicurezza della Supply Chain per i Sistemi AI

La sicurezza della supply chain si è evoluta oltre le dipendenze software tradizionali per abbracciare l’intero ecosistema AI. Le implementazioni moderne MCP devono verificare e monitorare rigorosamente tutti i componenti AI correlati, poiché ognuno introduce potenziali vulnerabilità che potrebbero compromettere l’integrità del sistema.

### Componenti Estesi della Supply Chain AI

**Dipendenze Software Tradizionali:**  
- Librerie open-source e framework  
- Immagini container e sistemi base  
- Strumenti di sviluppo e pipeline di build  
- Componenti e servizi infrastrutturali  

**Elementi Specifici della Supply Chain AI:**  
- **Modelli di Base**: Modelli pre-addestrati di diversi fornitori che richiedono verifica della provenienza  
- **Servizi di Embedding**: Servizi esterni di vettorializzazione e ricerca semantica  
- **Provider di Contesto**: Fonti dati, basi di conoscenza e repository di documenti  
- **API di Terze Parti**: Servizi AI esterni, pipeline ML e endpoint di elaborazione dati  
- **Artefatti del Modello**: Pesi, configurazioni e varianti di modelli ottimizzati  
- **Fonti di Dati di Addestramento**: Dataset usati per addestramento e messa a punto  

### Strategia Completa di Sicurezza della Supply Chain

#### **Verifica del Componente e Fiducia**  
- **Validazione della Provenienza**: Verificare origine, licenza e integrità di tutti i componenti AI prima dell’integrazione  
- **Valutazione di Sicurezza**: Condurre scansioni di vulnerabilità e revisioni di sicurezza per modelli, fonti dati e servizi AI  
- **Analisi della Reputazione**: Valutare il track record di sicurezza e le pratiche dei fornitori di servizi AI  
- **Verifica di Conformità**: Assicurarsi che tutti i componenti rispettino requisiti di sicurezza organizzativi e normativi  

#### **Pipeline di Distribuzione Sicura**  
- **Sicurezza CI/CD Automatizzata**: Integrare la scansione di sicurezza in pipeline di distribuzione automatizzate  
- **Integrità degli Artefatti**: Implementare verifica crittografica per tutti gli artefatti distribuiti (codice, modelli, configurazioni)  
- **Distribuzione a Stadi**: Usare strategie di distribuzione progressive con validazione di sicurezza a ogni fase  
- **Repository di Artefatti Fidati**: Distribuire solo da registry e repository artefatti verificati e sicuri  

#### **Monitoraggio e Risposta Continua**  
- **Scansione delle Dipendenze**: Monitoraggio continuo delle vulnerabilità per tutte le dipendenze software e componenti AI  
- **Monitoraggio del Modello**: Valutazione continua del comportamento del modello, deriva di performance e anomalie di sicurezza  
- **Tracciamento della Salute del Servizio**: Monitoraggio di disponibilità, incidenti di sicurezza e cambiamenti di policy dei servizi AI esterni  
- **Integrazione Threat Intelligence**: Incorporare feed di minacce specifici per i rischi di sicurezza AI e ML  

#### **Controllo degli Accessi e Principio del Privilegio Minimo**  
- **Permessi a Livello di Componente**: Limitare l’accesso a modelli, dati e servizi basandosi sulla necessità di business  
- **Gestione Account di Servizio**: Implementare account di servizio dedicati con permessi minimi richiesti  
- **Segmentazione della Rete**: Isolare componenti AI e limitare l’accesso di rete tra servizi  
- **Controlli API Gateway**: Usare gateway API centralizzati per controllare e monitorare l’accesso a servizi AI esterni  

#### **Risposta e Recupero dagli Incidenti**  
- **Procedure di Risposta Rapida**: Processi stabiliti per patchare o sostituire componenti AI compromessi  
- **Rotazione delle Credenziali**: Sistemi automatizzati per la rotazione di segreti, chiavi API e credenziali di servizio  
- **Capacità di Rollback**: Possibilità di tornare rapidamente a versioni precedenti conosciute come sicure dei componenti AI  
- **Recupero da Violazioni della Supply Chain**: Procedure specifiche per rispondere a compromissioni di servizi AI a monte  

### Strumenti e Integrazione Microsoft per la Sicurezza

**GitHub Advanced Security** fornisce protezione completa della supply chain includendo:  
- **Secret Scanning**: Rilevamento automatizzato di credenziali, chiavi API e token nei repository  
- **Dependency Scanning**: Valutazione delle vulnerabilità per dipendenze e librerie open-source  
- **CodeQL Analysis**: Analisi statica del codice per vulnerabilità di sicurezza e problemi di codifica  
- **Supply Chain Insights**: Visibilità sulla salubrità e stato di sicurezza delle dipendenze  

**Integrazione con Azure DevOps & Azure Repos:**  
- Integrazione fluida delle scansioni di sicurezza nelle piattaforme di sviluppo Microsoft  
- Controlli di sicurezza automatizzati in Azure Pipelines per carichi di lavoro AI  
- Applicazione delle policy per una distribuzione sicura dei componenti AI  

**Pratiche Interne Microsoft:**  
Microsoft implementa estensive pratiche di sicurezza della supply chain su tutti i prodotti. Scopri approcci comprovati in [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Best Practice di Sicurezza Fondamentale

Le implementazioni MCP ereditano e costruiscono sulla postura di sicurezza esistente della tua organizzazione. Rafforzare le pratiche di sicurezza fondamentali migliora significativamente la sicurezza complessiva dei sistemi AI e delle distribuzioni MCP.

### Fondamenti di Sicurezza Core

#### **Pratiche di Sviluppo Sicure**  
- **Conformità OWASP**: Protezione contro le vulnerabilità web delle [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Protezione Specifica AI**: Implementare controlli per le [OWASP Top 10 per LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Gestione Sicura dei Segreti**: Usare vault dedicati per token, chiavi API e dati di configurazione sensibili  
- **Crittografia End-to-End**: Implementare comunicazioni sicure tra tutti i componenti applicativi e flussi dati  
- **Validazione degli Input**: Validazione rigorosa di tutti gli input utente, parametri API e fonti dati  

#### **Indurimento dell’Infrastruttura**  
- **Autenticazione Multi-Fattore**: MFA obbligatoria per tutti gli account amministrativi e di servizio  
- **Gestione delle Patch**: Applicazione tempestiva e automatizzata di patch sui sistemi operativi, framework e dipendenze  
- **Integrazione Provider Identità**: Gestione centralizzata delle identità tramite provider enterprise (Microsoft Entra ID, Active Directory)  
- **Segmentazione di Rete**: Isolamento logico dei componenti MCP per limitare potenziali movimenti laterali  
- **Principio del Privilegio Minimo**: Permessi minimi necessari per tutti i componenti di sistema e account  

#### **Monitoraggio e Rilevamento di Sicurezza**  
- **Logging Completo**: Registrazione dettagliata delle attività dell’applicazione AI, comprese interazioni client-server MCP  
- **Integrazione SIEM**: Gestione centralizzata di sicurezza e eventi per il rilevamento di anomalie  
- **Analisi Comportamentale**: Monitoraggio AI-driven per individuare pattern anomali nei comportamenti di sistema e utenti  
- **Threat Intelligence**: Integrazione di feed di minacce esterni e indicatori di compromissione (IOC)  
- **Risposta agli Incidenti**: Procedure ben definite per il rilevamento, la risposta e il recupero dagli incidenti di sicurezza  

#### **Architettura Zero Trust**  
- **Mai Fidarsi, Sempre Verificare**: Verifica continua di utenti, dispositivi e connessioni di rete  
- **Micro-Segmentazione**: Controlli granulari di rete che isolano singoli workload e servizi  
- **Sicurezza Centrata sull’Identità**: Policy di sicurezza basate su identità verificate invece che su posizione di rete  
- **Valutazione del Rischio Continua**: Valutazione dinamica della postura di sicurezza basata su contesto e comportamento correnti  
- **Accesso Condizionale**: Controlli di accesso adattativi basati su fattori di rischio, localizzazione e fiducia nel dispositivo  

### Pattern di Integrazione Enterprise

#### **Integrazione nell’Ecosistema di Sicurezza Microsoft**  
- **Microsoft Defender for Cloud**: Gestione completa della postura di sicurezza cloud  
- **Azure Sentinel**: SIEM e SOAR nativi cloud per la protezione dei carichi di lavoro AI  
- **Microsoft Entra ID**: Gestione enterprise di identità e accessi con policy di accesso condizionale  
- **Azure Key Vault**: Gestione centralizzata dei segreti con supporto hardware HSM  
- **Microsoft Purview**: Governance e conformità dei dati per fonti dati e flussi di lavoro AI  

#### **Conformità e Governance**  
- **Allineamento Regolamentare**: Assicurare che le implementazioni MCP rispettino i requisiti normativi specifici del settore (GDPR, HIPAA, SOC 2)  
- **Classificazione dei Dati**: Corretta categorizzazione e gestione dei dati sensibili trattati dai sistemi AI  
- **Tracce di Audit**: Logging completo per conformità normativa e indagini forensi  
- **Controlli sulla Privacy**: Implementazione di principi privacy-by-design nell’architettura del sistema AI  
- **Gestione delle Modifiche**: Processi formali per revisioni di sicurezza sulle modifiche ai sistemi AI  

Queste pratiche fondamentali creano una solida baseline di sicurezza che migliora l’efficacia dei controlli specifici MCP e fornisce protezione completa per applicazioni AI-driven.

## Punti Chiave di Sicurezza da Ricordare  

- **Approccio di Sicurezza a Strati**: Combina pratiche di sicurezza fondamentali (codifica sicura, minimo privilegio, verifica della catena di fornitura, monitoraggio continuo) con controlli specifici per l'IA per una protezione completa

- **Scenario di Minacce Specifiche per l'IA**: I sistemi MCP affrontano rischi unici tra cui injection di prompt, avvelenamento degli strumenti, hijacking della sessione, problemi di confused deputy, vulnerabilità di token passthrough e permessi eccessivi che richiedono mitigazioni specializzate

- **Eccellenza in Autenticazione e Autorizzazione**: Implementa un'autenticazione robusta utilizzando provider di identità esterni (Microsoft Entra ID), applica la corretta validazione dei token e non accettare mai token non esplicitamente emessi per il tuo server MCP

- **Prevenzione degli Attacchi AI**: Distribuisci Microsoft Prompt Shields e Azure Content Safety per difendersi dagli attacchi indiretti di injection di prompt e avvelenamento degli strumenti, convalidando i metadati degli strumenti e monitorando eventuali cambiamenti dinamici

- **Sicurezza di Sessione e Trasporto**: Usa ID di sessione crittograficamente sicuri, non deterministici, vincolati all'identità dell'utente, implementa una corretta gestione del ciclo di vita della sessione e non usare mai le sessioni per l'autenticazione

- **Best Practice di Sicurezza OAuth**: Previeni attacchi confused deputy tramite consenso esplicito dell'utente per client registrati dinamicamente, implementazione corretta di OAuth 2.1 con PKCE e rigorosa validazione degli URI di redirect

- **Principi di Sicurezza del Token**: Evita anti-pattern di token passthrough, convalida le affermazioni di audience del token, implementa token a breve durata con rotazione sicura e mantieni confini di fiducia chiari

- **Sicurezza Completa della Catena di Fornitura**: Tratta tutti i componenti dell'ecosistema IA (modelli, embedding, provider di contesto, API esterne) con la stessa rigore di sicurezza delle dipendenze software tradizionali

- **Evoluzione Continua**: Rimani aggiornato con le specifiche MCP in rapida evoluzione, contribuisci agli standard della community di sicurezza e mantieni posture di sicurezza adattive man mano che il protocollo matura

- **Integrazione Sicurezza Microsoft**: Sfrutta l'ecosistema di sicurezza completo di Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) per migliorare la protezione del deployment MCP

## Risorse Complete

### **Documentazione Ufficiale sulla Sicurezza MCP**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **Risorse OWASP MCP sulle Sicurezza**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Completa guida OWASP MCP Top 10 con implementazione su Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rischi di sicurezza ufficiali OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica di sicurezza per MCP su Azure

### **Standard di Sicurezza e Best Practice**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 per Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Ricerca e Analisi sulla Sicurezza AI**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluzioni di Sicurezza Microsoft**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guide e Tutorial di Implementazione**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps e Sicurezza della Catena di Fornitura**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentazione Aggiuntiva sulla Sicurezza**

Per una guida completa sulla sicurezza, fare riferimento a questi documenti specializzati in questa sezione:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Best practice di sicurezza complete per implementazioni MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Esempi pratici di implementazione per integrazione Azure Content Safety
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Controlli e tecniche di sicurezza più recenti per deployment MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Guida di riferimento rapido per pratiche essenziali di sicurezza MCP
- **[BlueHat 2026: Securing the future of AI: Securing MCP with defense in depth patterns](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Pattern di difesa in profondità dal Microsoft Security Response Center (MSRC)

### **Formazione Pratica di Sicurezza**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop pratico completo per la sicurezza di server MCP su Azure con camp progressivi da Base Camp a Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Architettura di riferimento e guida all'implementazione per tutti i rischi OWASP MCP Top 10

---

## Cosa Succede Dopo

Successivo: [Capitolo 3: Introduzione](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->