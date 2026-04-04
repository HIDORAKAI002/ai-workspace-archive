# MCP Security Best Practices 2025

Questa guida completa illustra le principali best practice di sicurezza per l'implementazione di sistemi Model Context Protocol (MCP) basati sull'ultima **Specificazione MCP 2025-11-25** e sugli standard di settore attuali. Queste pratiche affrontano sia le preoccupazioni tradizionali di sicurezza sia le minacce specifiche dell’IA uniche per le implementazioni MCP.

## Requisiti Critici di Sicurezza

### Controlli di Sicurezza Obbligatori (Requisiti MUST)

1. **Validazione del Token**: I server MCP **NON DEVONO** accettare token che non siano stati esplicitamente emessi per il server MCP stesso
2. **Verifica dell’Autorizzazione**: I server MCP che implementano l’autorizzazione **DEVONO** verificare TUTTE le richieste in ingresso e **NON DEVONO** usare sessioni per l’autenticazione  
3. **Consenso dell’Utente**: I server proxy MCP che utilizzano ID client statici **DEVONO** ottenere il consenso esplicito dell’utente per ciascun client registrato dinamicamente
4. **ID Sessione Sicuri**: I server MCP **DEVONO** utilizzare ID sessione crittograficamente sicuri, non deterministici, generati con generatori di numeri casuali sicuri

## Pratiche Core di Sicurezza

### 1. Validazione e Sanitizzazione degli Input
- **Validazione Completa degli Input**: Validare e sanificare tutti gli input per prevenire attacchi di injection, problemi “confused deputy” e vulnerabilità di prompt injection
- **Applicazione dello Schema dei Parametri**: Implementare una rigorosa validazione dello schema JSON per tutti i parametri degli strumenti e gli input API
- **Filtraggio del Contenuto**: Utilizzare Microsoft Prompt Shields e Azure Content Safety per filtrare contenuti dannosi in prompt e risposte
- **Sanitizzazione dell’Output**: Validare e sanificare tutte le uscite del modello prima di presentarle agli utenti o ai sistemi a valle

### 2. Eccellenza in Autenticazione e Autorizzazione  
- **Provider di Identità Esterni**: Delegare l'autenticazione a provider di identità consolidati (Microsoft Entra ID, provider OAuth 2.1) piuttosto che implementare un’autenticazione personalizzata
- **Permessi Granulari**: Implementare permessi specifici e granulati per ogni strumento seguendo il principio del privilegio minimo
- **Gestione del Ciclo di Vita del Token**: Utilizzare token di accesso a breve durata con rotazione sicura e valida convalida del pubblico destinatario
- **Autenticazione Multi-Fattore**: Richiedere MFA per tutti gli accessi amministrativi e operazioni sensibili

### 3. Protocolli di Comunicazione Sicuri
- **Transport Layer Security**: Usare HTTPS/TLS 1.3 per tutte le comunicazioni MCP con corretta validazione del certificato
- **Crittografia End-to-End**: Implementare livelli aggiuntivi di crittografia per dati altamente sensibili in transito e a riposo
- **Gestione dei Certificati**: Mantenere una corretta gestione del ciclo di vita dei certificati con processi automatizzati di rinnovo
- **Applicazione della Versione del Protocollo**: Usare la versione attuale del protocollo MCP (2025-11-25) con una negoziazione di versione appropriata.

### 4. Limitazione Avanzata della Velocità e Protezione delle Risorse
- **Limitazioni Multi-Livello**: Implementare limitazioni della velocità a livello utente, sessione, strumento e risorsa per prevenire abusi
- **Limitazione Adattiva della Velocità**: Usare limitazioni basate su machine learning che si adattano ai modelli di utilizzo e agli indicatori di minaccia
- **Gestione delle Quote di Risorse**: Impostare limiti appropriati per risorse computazionali, uso della memoria e tempo di esecuzione
- **Protezione DDoS**: Implementare sistemi completi di protezione DDoS e analisi del traffico

### 5. Logging e Monitoraggio Completi
- **Logging di Audit Strutturato**: Implementare log dettagliati e ricercabili per tutte le operazioni MCP, esecuzioni strumenti ed eventi di sicurezza
- **Monitoraggio di Sicurezza in Tempo Reale**: Implementare sistemi SIEM con rilevamento anomalie AI potenziato per i carichi di lavoro MCP
- **Logging Conforme alla Privacy**: Registrare eventi di sicurezza rispettando i requisiti normativi e di privacy dei dati
- **Integrazione con Risposta agli Incidenti**: Collegare i sistemi di logging a workflow automatizzati di risposta agli incidenti

### 6. Pratiche Avanzate di Archiviazione Sicura
- **Moduli di Sicurezza Hardware**: Usare archiviazione di chiavi supportata da HSM (Azure Key Vault, AWS CloudHSM) per operazioni crittografiche critiche
- **Gestione delle Chiavi di Crittografia**: Implementare rotazione, separazione e controlli di accesso adeguati per le chiavi di crittografia
- **Gestione dei Segreti**: Conservare tutte le chiavi API, token e credenziali in sistemi dedicati di gestione dei segreti
- **Classificazione dei Dati**: Classificare i dati in base ai livelli di sensibilità e applicare misure di protezione appropriate

### 7. Gestione Avanzata dei Token
- **Prevenzione del Passaggio Diretto del Token**: Vietare esplicitamente pattern di passthrough dei token che bypassano i controlli di sicurezza
- **Validazione del Pubblico Destinatario**: Verificare sempre che le audience dei token corrispondano all’identità prevista del server MCP
- **Autorizzazione Basata sulle Claims**: Implementare autorizzazioni granulari basate su claims del token e attributi utente
- **Binding dei Token**: Associare i token a specifiche sessioni, utenti o dispositivi dove appropriato

### 8. Gestione Sicura delle Sessioni
- **ID Sessione Crittografici**: Generare ID sessione usando generatori di numeri casuali crittograficamente sicuri (non sequenze prevedibili)
- **Binding Specifico dell’Utente**: Legare gli ID sessione a informazioni specifiche dell’utente usando formati sicuri come `<user_id>:<session_id>`
- **Controlli sul Ciclo di Vita delle Sessioni**: Implementare meccanismi appropriati per scadenza, rotazione e invalidazione delle sessioni
- **Header di Sicurezza per Sessione**: Usare header HTTP di sicurezza appropriati per la protezione delle sessioni

### 9. Controlli di Sicurezza Specifici per l’IA
- **Difesa da Prompt Injection**: Deployare Microsoft Prompt Shields con tecniche di spotlighting, delimitatori e datamarking
- **Prevenzione dell’Avvelenamento degli Strumenti**: Validare i metadata degli strumenti, monitorare cambiamenti dinamici e verificare l’integrità degli strumenti
- **Validazione dell’Output del Modello**: Scansionare gli output del modello per potenziali fughe di dati, contenuti dannosi o violazioni di policy di sicurezza
- **Protezione del Context Window**: Implementare controlli per prevenire avvelenamento e manipolazioni della finestra di contesto

### 10. Sicurezza nell’Esecuzione degli Strumenti
- **Sandboxing dell’Esecuzione**: Eseguire gli strumenti in ambienti containerizzati, isolati e con limiti di risorse
- **Separazione dei Privilegi**: Eseguire gli strumenti con privilegi minimi necessari e account di servizio separati
- **Isolamento di Rete**: Implementare segmentazione di rete per gli ambienti di esecuzione degli strumenti
- **Monitoraggio dell’Esecuzione**: Monitorare l’esecuzione degli strumenti per comportamenti anomali, uso delle risorse e violazioni di sicurezza

### 11. Validazione Continua della Sicurezza
- **Test di Sicurezza Automatizzati**: Integrare test di sicurezza nelle pipeline CI/CD con strumenti come GitHub Advanced Security
- **Gestione delle Vulnerabilità**: Scansionare regolarmente tutte le dipendenze, inclusi modelli AI e servizi esterni
- **Penetration Testing**: Condurre valutazioni di sicurezza regolari specifiche per implementazioni MCP
- **Revisioni di Codice di Sicurezza**: Implementare revisioni di sicurezza obbligatorie per tutte le modifiche di codice relative a MCP

### 12. Sicurezza della Supply Chain per IA
- **Verifica dei Componenti**: Verificare provenienza, integrità e sicurezza di tutti i componenti IA (modelli, embeddings, API)
- **Gestione delle Dipendenze**: Mantenere inventari aggiornati di tutte le dipendenze software e IA con monitoraggio delle vulnerabilità
- **Repository Affidabili**: Utilizzare fonti verificate e attendibili per modelli IA, librerie e strumenti
- **Monitoraggio della Supply Chain**: Monitorare continuamente compromissioni presso fornitori di servizi IA e repository di modelli

## Pattern Avanzati di Sicurezza

### Architettura Zero Trust per MCP
- **Mai Fidarsi, Sempre Verificare**: Implementare verifica continua per tutti i partecipanti MCP
- **Micro-segmentazione**: Isolare i componenti MCP con controlli granulati di rete e identità
- **Accesso Condizionale**: Implementare controlli di accesso basati sul rischio che si adattano a contesto e comportamento
- **Valutazione del Rischio Continua**: Valutare dinamicamente la postura di sicurezza basandosi sugli indicatori di minaccia correnti

### Implementazione di IA Privacy-Preserving
- **Minimizzazione dei Dati**: Esporre solo i dati strettamente necessari per ciascuna operazione MCP
- **Privacy Differenziale**: Implementare tecniche di privacy preserving per l’elaborazione di dati sensibili
- **Crittografia Omomorfica**: Usare tecniche avanzate di crittografia per calcoli sicuri su dati crittografati
- **Apprendimento Federato**: Implementare approcci di apprendimento distribuito che preservano la località e la privacy dei dati

### Risposta agli Incidenti per Sistemi IA
- **Procedure di Incidenti Specifiche per IA**: Sviluppare procedure di risposta agli incidenti su misura per minacce IA e MCP
- **Risposta Automatica**: Implementare contenimento e rimedio automatizzati per incidenti di sicurezza comuni nell’IA  
- **Capacità Forensi**: Mantenere preparazione forense per compromissioni di sistemi IA e violazioni di dati
- **Procedure di Recupero**: Stabilire procedure per il recupero da avvelenamento di modelli IA, attacchi di prompt injection e compromissioni di servizi

## Risorse e Standard per l’Implementazione

### 🏔️ Formazione Pratica sulla Sicurezza
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop pratico completo per la protezione dei server MCP in Azure
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Architettura di riferimento e linee guida per l’implementazione del OWASP MCP Top 10

### Documentazione Ufficiale MCP
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Specifica attuale del protocollo MCP
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Linee guida ufficiali di sicurezza
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Pattern di autenticazione e autorizzazione
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Requisiti di sicurezza del livello di trasporto

### Soluzioni di Sicurezza Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Protezione avanzata da prompt injection
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Filtraggio completo dei contenuti AI
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Gestione identità e accesso aziendale
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Gestione sicura di segreti e credenziali
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Scansione della sicurezza della supply chain e del codice

### Standard e Framework di Sicurezza
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Linee guida attuali di sicurezza OAuth
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Rischi di sicurezza delle applicazioni web
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Rischi di sicurezza specifici per IA
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Gestione completa del rischio IA
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Sistemi di gestione della sicurezza delle informazioni

### Guide e Tutorial per l’Implementazione
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Pattern di autenticazione enterprise
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integrazione provider identità
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Best practice per la gestione dei token
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Pattern avanzati di crittografia

### Risorse Avanzate di Sicurezza
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Pratiche di sviluppo sicuro
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - Test di sicurezza specifici per IA
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodologia di modellazione delle minacce IA
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Tecniche di privacy-preserving per IA

### Conformità e Governance
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Conformità privacy nei sistemi IA
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Implementazione responsabile dell’IA
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Controlli di sicurezza per fornitori di servizi IA
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Requisiti di conformità per IA in ambito sanitario

### DevSecOps e Automazione
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Pipeline di sviluppo AI sicure
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Validazione continua della sicurezza
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Deploy sicuro dell’infrastruttura
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Sicurezza della containerizzazione per workload IA

### Monitoraggio e Risposta agli Incidenti  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Soluzioni di monitoraggio complete
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Procedure specifiche per incidenti IA
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Gestione informazioni e eventi di sicurezza
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Fonti di intelligence sulle minacce IA

## 🔄 Miglioramento Continuo

### Rimanere Aggiornati con Standard in Evoluzione
- **Aggiornamenti Specificazione MCP**: Monitorare le modifiche ufficiali alla specificazione MCP e gli avvisi di sicurezza
- **Threat Intelligence**: Iscriversi a feed di minacce di sicurezza IA e database di vulnerabilità  
- **Coinvolgimento della Comunità**: Partecipare alle discussioni e ai gruppi di lavoro della comunità di sicurezza MCP  
- **Valutazione Regolare**: Condurre valutazioni trimestrali della postura di sicurezza e aggiornare le pratiche di conseguenza

### Contribuire alla Sicurezza MCP
- **Ricerca sulla Sicurezza**: Contribuire alla ricerca sulla sicurezza MCP e ai programmi di divulgazione delle vulnerabilità  
- **Condivisione delle Migliori Pratiche**: Condividere le implementazioni di sicurezza e le lezioni apprese con la comunità  
- **Sviluppo degli Standard**: Partecipare allo sviluppo delle specifiche MCP e alla creazione di standard di sicurezza  
- **Sviluppo di Strumenti**: Sviluppare e condividere strumenti e librerie di sicurezza per l'ecosistema MCP

---

*Questo documento riflette le migliori pratiche di sicurezza MCP al 18 dicembre 2025, basate sulla Specifica MCP 2025-11-25. Le pratiche di sicurezza dovrebbero essere regolarmente riviste e aggiornate man mano che il protocollo e il panorama delle minacce evolvono.*

## Cosa Viene Dopo

- Leggi: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Torna a: [Security Module Overview](./README.md)  
- Continua a: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Esclusione di responsabilità**:
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per l’accuratezza, si prega di considerare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali fraintendimenti o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->