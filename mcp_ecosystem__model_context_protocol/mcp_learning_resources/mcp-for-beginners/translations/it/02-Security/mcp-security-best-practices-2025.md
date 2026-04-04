# Pratiche di Sicurezza MCP - Aggiornamento Febbraio 2026

> **Importante**: Questo documento riflette i più recenti requisiti di sicurezza della [Specificazione MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) e le [Pratiche di Sicurezza MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) ufficiali. Fare sempre riferimento alla specifica corrente per le indicazioni più aggiornate.

## 🏔️ Formazione Pratica sulla Sicurezza

Per un'esperienza pratica di implementazione, consigliamo il **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - una spedizione guidata completa per la messa in sicurezza di server MCP in Azure. Il workshop copre tutti i rischi OWASP MCP Top 10 attraverso una metodologia "vulnerabile → sfrutta → correggi → valida".

Tutte le pratiche in questo documento sono allineate con la **[Guida alla Sicurezza MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** per indicazioni specifiche di implementazione su Azure.

## Pratiche Essenziali di Sicurezza per Implementazioni MCP

Il Model Context Protocol presenta sfide di sicurezza uniche che vanno oltre la sicurezza software tradizionale. Queste pratiche affrontano sia requisiti di sicurezza fondamentali sia minacce specifiche MCP come injection di prompt, avvelenamento di strumenti, dirottamento di sessione, problemi di confused deputy e vulnerabilità di token passthrough.

### **Requisiti di Sicurezza OBBLIGATORI**

**Requisiti Critici dalla Specifica MCP:**

### **Requisiti di Sicurezza OBBLIGATORI**

**Requisiti Critici dalla Specifica MCP:**

> **NON DEVE**: i server MCP **NON DEVONO** accettare alcun token che non sia stato esplicitamente emesso per il server MCP
> 
> **DEVE**: i server MCP che implementano l'autorizzazione **DEVONO** verificare TUTTE le richieste in ingresso
>  
> **NON DEVE**: i server MCP **NON DEVONO** usare sessioni per l'autenticazione
>
> **DEVE**: i server proxy MCP che utilizzano ID client statici **DEVONO** ottenere il consenso dell'utente per ogni client registrato dinamicamente

---

## 1. **Sicurezza del Token & Autenticazione**

**Controlli di Autenticazione & Autorizzazione:**
   - **Revisioni Rigide dell'Autorizzazione**: Condurre audit completi della logica di autorizzazione del server MCP per garantire che solo utenti e client autorizzati possano accedere alle risorse
   - **Integrazione con Provider di Identità Esterni**: Usare provider di identità affermati come Microsoft Entra ID invece di implementare autenticazione personalizzata
   - **Validazione del Pubblico del Token**: Verificare sempre che i token siano stati esplicitamente emessi per il proprio server MCP - non accettare mai token upstream
   - **Ciclo di Vita Corretto del Token**: Implementare rotazione sicura dei token, politiche di scadenza e prevenire attacchi di replay dei token

**Conservazione Protetta dei Token:**
   - Usare Azure Key Vault o archivi credenziali sicuri simili per tutti i segreti
   - Implementare la crittografia per i token sia a riposo che in transito
   - Rotazione regolare delle credenziali e monitoraggio per accessi non autorizzati

## 2. **Gestione Sessioni & Sicurezza del Trasporto**

**Pratiche Sicure di Sessione:**
   - **ID Sessione Sicuri dal Punto di Vista Crittografico**: Usare ID sessione sicuri e non deterministici generati con generatori di numeri casuali sicuri
   - **Binding Specifico per Utente**: Associare ID sessione alle identità utente usando formati come `<user_id>:<session_id>` per prevenire abusi di sessione trasversali
   - **Gestione del Ciclo di Vita della Sessione**: Implementare corretta scadenza, rotazione e invalidazione per limitare le finestre di vulnerabilità
   - **Applicazione di HTTPS/TLS**: HTTPS obbligatorio per tutte le comunicazioni per prevenire intercettazioni dell'ID sessione

**Sicurezza del Livello di Trasporto:**
   - Configurare TLS 1.3 dove possibile con gestione corretta dei certificati
   - Implementare pinning dei certificati per connessioni critiche
   - Rotazione regolare dei certificati e verifica della validità

## 3. **Protezione da Minacce Specifiche AI** 🤖

**Difesa dall'Injection di Prompt:**
   - **Microsoft Prompt Shields**: Distribuire AI Prompt Shields per il rilevamento avanzato e filtraggio di istruzioni dannose
   - **Sanificazione dell'Input**: Validare e sanificare tutti gli input per prevenire attacchi di injection e problemi di confused deputy
   - **Confini di Contenuto**: Usare sistemi di delimitazione e marcatura dati per distinguere tra istruzioni fidate e contenuto esterno

**Prevenzione dell'Avvelenamento degli Strumenti:**
   - **Validazione dei Metadati degli Strumenti**: Implementare controlli di integrità per le definizioni degli strumenti e monitorare modifiche inattese
   - **Monitoraggio Dinamico degli Strumenti**: Monitorare il comportamento a runtime e impostare allarmi per esecuzioni sospette
   - **Workflow di Approvazione**: Richiedere approvazioni esplicite degli utenti per modifiche e cambiamenti di capacità degli strumenti

## 4. **Controllo degli Accessi & Permessi**

**Principio del Privilegio Minimo:**
   - Concedere ai server MCP solo i permessi minimi necessari alla funzionalità prevista
   - Implementare controllo accessi basato su ruoli (RBAC) con permessi granulare
   - Revisioni regolari dei permessi e monitoraggio continuo per escalation di privilegi

**Controlli sui Permessi a Runtime:**
   - Applicare limiti di risorse per prevenire attacchi di esaurimento risorse
   - Usare isolamento dei container per gli ambienti di esecuzione degli strumenti  
   - Implementare accesso just-in-time per funzioni amministrative

## 5. **Sicurezza del Contenuto & Monitoraggio**

**Implementazione della Sicurezza del Contenuto:**
   - **Integrazione Azure Content Safety**: Usare Azure Content Safety per rilevare contenuti dannosi, tentativi di jailbreak e violazioni di policy
   - **Analisi Comportamentale**: Implementare monitoraggio comportamentale a runtime per rilevare anomalie nell'esecuzione di server MCP e degli strumenti
   - **Logging Completo**: Registrare tutti i tentativi di autenticazione, invocazioni degli strumenti ed eventi di sicurezza con archiviazione sicura e anti-manomissione

**Monitoraggio Continuo:**
   - Allarmi in tempo reale per pattern sospetti e tentativi di accesso non autorizzati  
   - Integrazione con sistemi SIEM per gestione centralizzata degli eventi di sicurezza
   - Audit di sicurezza regolari e penetration testing delle implementazioni MCP

## 6. **Sicurezza della Supply Chain**

**Verifica dei Componenti:**
   - **Scansione delle Dipendenze**: Usare scansione automatizzata delle vulnerabilità per tutte le dipendenze software e componenti AI
   - **Validazione della Provenienza**: Verificare origine, licenze e integrità di modelli, fonti dati e servizi esterni
   - **Pacchetti Firmati**: Usare pacchetti firmati crittograficamente e verificare firme prima della distribuzione

**Pipeline di Sviluppo Sicura:**
   - **GitHub Advanced Security**: Implementare scansione segreti, analisi delle dipendenze e CodeQL per analisi statica
   - **Sicurezza CI/CD**: Integrare la validazione di sicurezza lungo tutto il processo di deployment automatizzato
   - **Integrità degli Artefatti**: Implementare verifica crittografica per artefatti e configurazioni distribuite

## 7. **Sicurezza OAuth & Prevenzione Confused Deputy**

**Implementazione OAuth 2.1:**
   - **Implementazione PKCE**: Usare Proof Key for Code Exchange (PKCE) per tutte le richieste di autorizzazione
   - **Consenso Esplicito**: Ottenere il consenso dell'utente per ogni client registrato dinamicamente per prevenire attacchi confused deputy
   - **Validazione Redirect URI**: Implementare validazione rigorosa di redirect URI e identificatori client

**Sicurezza del Proxy:**
   - Prevenire bypass di autorizzazione tramite sfruttamento di ID client statici
   - Implementare workflow di consenso adeguati per accesso API di terze parti
   - Monitorare furto di codici di autorizzazione e accessi API non autorizzati

## 8. **Risposta agli Incidenti & Recupero**

**Capacità di Risposta Rapida:**
   - **Risposta Automatica**: Implementare sistemi automatici per rotazione credenziali e contenimento delle minacce
   - **Procedure di Rollback**: Capacità di tornare rapidamente a configurazioni e componenti noti e sicuri
   - **Capacità Forensi**: Dettagliati audit trail e logging per indagini sugli incidenti

**Comunicazione & Coordinamento:**
   - Procedure chiare di escalation per incidenti di sicurezza
   - Integrazione con team di risposta agli incidenti organizzativi
   - Simulazioni regolari di incidenti di sicurezza ed esercitazioni tabletop

## 9. **Conformità & Governance**

**Conformità Regolamentare:**
   - Assicurare che le implementazioni MCP rispettino requisiti specifici di settore (GDPR, HIPAA, SOC 2)
   - Implementare classificazione dati e controlli di privacy per il trattamento dati AI
   - Mantenere documentazione completa per audit di conformità

**Gestione del Cambiamento:**
   - Processi formali di revisione della sicurezza per tutte le modifiche ai sistemi MCP
   - Controllo versioni e workflow di approvazione per modifiche di configurazione
   - Valutazioni regolari della conformità e analisi dei gap

## 10. **Controlli di Sicurezza Avanzati**

**Architettura Zero Trust:**
   - **Mai Fidarsi, Sempre Verificare**: Verifica continua di utenti, dispositivi e connessioni
   - **Micro-segmentazione**: Controlli di rete granulari che isolano componenti MCP individuali
   - **Accesso Condizionale**: Controlli di accesso basati su rischio che si adattano al contesto e comportamento corrente

**Protezione dell'Applicazione a Runtime:**
   - **Runtime Application Self-Protection (RASP)**: Distribuire tecniche RASP per il rilevamento real-time delle minacce
   - **Monitoraggio delle Prestazioni dell’Applicazione**: Monitorare anomalie di prestazioni che possono indicare attacchi
   - **Politiche di Sicurezza Dinamiche**: Implementare politiche di sicurezza che si adattano basandosi sul panorama minacce corrente

## 11. **Integrazione nell'Ecosistema di Sicurezza Microsoft**

**Sicurezza Microsoft Completa:**
   - **Microsoft Defender for Cloud**: Gestione della postura di sicurezza cloud per i carichi di lavoro MCP
   - **Azure Sentinel**: SIEM e SOAR nativi cloud per rilevamento avanzato minacce
   - **Microsoft Purview**: Governance dati e conformità per workflow AI e fonti dati

**Identità & Gestione Accessi:**
   - **Microsoft Entra ID**: Gestione dell'identità enterprise con policy di accesso condizionale
   - **Privileged Identity Management (PIM)**: Accesso just-in-time e workflow di approvazione per funzioni amministrative
   - **Protezione dell'Identità**: Accesso condizionale basato su rischio e risposta automatizzata alle minacce

## 12. **Evoluzione Continua della Sicurezza**

**Rimanere Aggiornati:**
   - **Monitoraggio della Specifica**: Revisione regolare degli aggiornamenti alla specifica MCP e alle indicazioni di sicurezza
   - **Intelligence sulle Minacce**: Integrazione di feed di minacce specifici AI e indicatori di compromesso
   - **Impegno nella Comunità di Sicurezza**: Partecipazione attiva alla comunità di sicurezza MCP e programmi di divulgazione vulnerabilità

**Sicurezza Adattiva:**
   - **Sicurezza con Machine Learning**: Usare rilevamento anomalie basato su ML per identificare nuovi modelli di attacco
   - **Analitica Predittiva di Sicurezza**: Implementare modelli predittivi per identificazione proattiva delle minacce
   - **Automazione della Sicurezza**: Aggiornamenti automatici delle policy di sicurezza basati su intelligence minacce e cambiamenti specifica

---

## **Risorse Critiche di Sicurezza**

### **Documentazione Ufficiale MCP**
- [Specificazione MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Pratiche di Sicurezza MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specificazione Autorizzazione MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Risorse di Sicurezza OWASP MCP**
- [Guida Sicurezza MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 completo con implementazione Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rischi di sicurezza MCP ufficiali OWASP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica sulla sicurezza MCP su Azure

### **Soluzioni di Sicurezza Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Standard di Sicurezza**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Guide di Implementazione**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID con Server MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Avviso di Sicurezza**: Le pratiche di sicurezza MCP si evolvono rapidamente. Verificare sempre rispetto alla [specifica MCP corrente](https://spec.modelcontextprotocol.io/) e alla [documentazione di sicurezza ufficiale](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) prima dell'implementazione.

## Cosa Fare Dopo

- Leggi: [Controlli di Sicurezza MCP 2025](./mcp-security-controls-2025.md)
- Torna a: [Panoramica del Modulo Sicurezza](./README.md)
- Continua con: [Modulo 3: Iniziare](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avvertenza**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per l’accuratezza, si prega di notare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua madre deve essere considerato la fonte autorevole. Per informazioni critiche si raccomanda una traduzione professionale eseguita da un umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->