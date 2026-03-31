# Controlli di Sicurezza MCP - Aggiornamento Febbraio 2026

> **Standard Attuale**: Questo documento riflette i requisiti di sicurezza della [Specificazione MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) e le ufficiali [Best Practices di Sicurezza MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Il Model Context Protocol (MCP) è maturato significativamente con controlli di sicurezza migliorati che affrontano sia la sicurezza software tradizionale che le minacce specifiche dell'IA. Questo documento fornisce controlli di sicurezza completi per implementazioni sicure di MCP allineate al framework OWASP MCP Top 10.

## 🏔️ Formazione Pratica sulla Sicurezza

Per un'esperienza pratica e diretta nell'implementazione della sicurezza, consigliamo il **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - una spedizione guidata completa per mettere in sicurezza i server MCP in Azure utilizzando una metodologia "vulnerabile → sfruttamento → correzione → convalida".

Tutti i controlli di sicurezza in questo documento sono allineati alla **[Guida alla Sicurezza Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, che fornisce architetture di riferimento e indicazioni specifiche per l’implementazione in Azure dei rischi OWASP MCP Top 10.

## **Requisiti di Sicurezza OBBLIGATORI**

### **Divieti Critici dalla Specifica MCP:**

> **VIETATO**: i server MCP **NON DEVONO** accettare token che non siano stati esplicitamente emessi per il server MCP
>
> **PROIBITO**: i server MCP **NON DEVONO** usare sessioni per autenticazione  
>
> **RICHIESTO**: i server MCP che implementano autorizzazione **DEVONO** verificare TUTTE le richieste in ingresso
>
> **OBBLIGATORIO**: i server proxy MCP che usano client ID statici **DEVONO** ottenere il consenso dell’utente per ogni client registrato dinamicamente

---

## 1. **Controlli di Autenticazione & Autorizzazione**

### **Integrazione con Provider di Identità Esterni**

**Standard MCP Attuale (2025-11-25)** permette ai server MCP di delegare l'autenticazione a provider di identità esterni, rappresentando un significativo miglioramento di sicurezza:

**Rischio OWASP MCP Indirizzato**: [MCP07 - Autenticazione & Autorizzazione Insufficienti](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Benefici di Sicurezza:**
1. **Elimina i Rischi di Autenticazione Personalizzata**: Riduce la superficie di vulnerabilità evitando implementazioni di autenticazione personalizzate
2. **Sicurezza di Livello Aziendale**: Sfrutta provider di identità affermati come Microsoft Entra ID con funzionalità di sicurezza avanzate
3. **Gestione Centralizzata dell'Identità**: Semplifica la gestione del ciclo di vita degli utenti, il controllo accessi e le verifiche di conformità
4. **Autenticazione Multi-Fattore**: Eredita le capacità MFA dai provider di identità aziendali
5. **Policy di Accesso Condizionale**: Beneficia di controlli di accesso basati sul rischio e autenticazione adattiva

**Requisiti di Implementazione:**
- **Validazione del Pubblico del Token**: Verificare che tutti i token siano esplicitamente emessi per il server MCP
- **Verifica dell’Emittente**: Validare che l’emittente del token corrisponda al provider di identità previsto
- **Verifica della Firma**: Validazione crittografica dell’integrità del token
- **Applicazione della Scadenza**: Rigorosa applicazione dei limiti di durata del token
- **Validazione dell’Ambito**: Assicurarsi che i token contengano i permessi appropriati per le operazioni richieste

### **Sicurezza della Logica di Autorizzazione**

**Controlli Critici:**
- **Revisioni Complete dell’Autorizzazione**: Revisioni di sicurezza regolari di tutti i punti decisionali dell’autorizzazione
- **Default Sicuri**: Negare accesso quando la logica di autorizzazione non può prendere una decisione definitiva
- **Confini di Permesso**: Separazione chiara tra diversi livelli di privilegio e accesso alle risorse
- **Audit Logging**: Registrazione completa di tutte le decisioni di autorizzazione per monitoraggio di sicurezza
- **Revisioni Regolari degli Accessi**: Validazione periodica dei permessi utenti e assegnazioni di privilegi

## 2. **Sicurezza dei Token & Controlli Anti-Passthrough**

**Rischio OWASP MCP Indirizzato**: [MCP01 - Gestione Errata dei Token & Esposizione Segreti](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevenzione del Passthrough dei Token**

**Il passthrough dei token è esplicitamente proibito** nella Specifica di Autorizzazione MCP a causa di rischi critici per la sicurezza:

**Rischi di Sicurezza Indirizzati:**
- **Circumvenzione dei Controlli**: Bypass di controlli di sicurezza essenziali come limitazione velocità, validazione richieste e monitoraggio traffico
- **Rottura della Tracciabilità**: Rende impossibile identificare i client, corrompendo audit trail e indagini sugli incidenti
- **Esfiltrazione tramite Proxy**: Consente ad attori malevoli di usare server come proxy per accessi dati non autorizzati
- **Violazioni dei Confini di Fiducia**: Infrange le assunzioni di fiducia dei servizi a valle riguardo l’origine dei token
- **Movimenti Laterali**: Token compromessi su più servizi permettono un’espansione più ampia degli attacchi

**Controlli di Implementazione:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **Pattern per la Gestione Sicura dei Token**

**Best Practices:**
- **Token a Breve Durata**: Minimizzare la finestra di esposizione con rotazione frequente dei token
- **Emissione Just-in-Time**: Emettere token solo quando necessari per operazioni specifiche
- **Archiviazione Sicura**: Usare moduli hardware di sicurezza (HSM) o vault di chiavi sicuri
- **Binding del Token**: Legare i token a specifici client, sessioni o operazioni dove possibile
- **Monitoraggio & Allerta**: Rilevamento in tempo reale di uso improprio dei token o accessi non autorizzati

## 3. **Controlli di Sicurezza delle Sessioni**

### **Prevenzione di Session Hijacking (Dirottamento della Sessione)**

**Vettori di Attacco Indirizzati:**
- **Iniezione di Prompt di Dirottamento Sessione**: Eventi malevoli iniettati nello stato condiviso della sessione
- **Impersonificazione di Sessione**: Uso non autorizzato di ID sessione rubati per bypassare l’autenticazione
- **Attacchi su Stream Riprendibili**: Sfruttamento della ripresa di eventi inviati dal server per iniezione di contenuti malevoli

**Controlli Obbligatori per la Sessione:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**Sicurezza del Trasporto:**
- **Forzatura HTTPS**: Tutte le comunicazioni di sessione su TLS 1.3
- **Attributi Sicuri per Cookie**: HttpOnly, Secure, SameSite=Strict
- **Pinning del Certificato**: Per connessioni critiche per prevenire attacchi MITM

### **Considerazioni Stateful vs Stateless**

**Per Implementazioni Stateful:**
- Lo stato di sessione condiviso necessita protezioni aggiuntive contro attacchi di iniezione
- La gestione della sessione basata su code necessita verifica di integrità
- I server multipli richiedono sincronizzazione sicura dello stato sessione

**Per Implementazioni Stateless:**
- Gestione della sessione tramite JWT o token simili
- Verifica crittografica dell’integrità dello stato sessione
- Superficie di attacco ridotta ma richiede convalida robusta del token

## 4. **Controlli di Sicurezza Specifici per l’IA**

**Rischi OWASP MCP Indirizzati**:
- [MCP06 - Prompt Injection tramite Payload Contestuali](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Avvelenamento degli Strumenti](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Iniezione & Esecuzione di Comandi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Difesa contro Prompt Injection**

**Integrazione Microsoft Prompt Shields:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**Controlli di Implementazione:**
- **Sanificazione Input**: Validazione e filtraggio completi di tutti gli input utente
- **Definizione dei Confini di Contenuto**: Separazione chiara tra istruzioni di sistema e contenuto utente
- **Gerarchia delle Istruzioni**: Regole di precedenza appropriate per istruzioni in conflitto
- **Monitoraggio dell’Output**: Rilevamento di output potenzialmente dannosi o manipolati

### **Prevenzione dell’Avvelenamento degli Strumenti**

**Framework di Sicurezza per Strumenti:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**Gestione Dinamica degli Strumenti:**
- **Workflow di Approvazione**: Consenso esplicito dell’utente per modifiche agli strumenti
- **Capacità di Rollback**: Possibilità di tornare a versioni precedenti degli strumenti
- **Audit delle Modifiche**: Storia completa delle modifiche alle definizioni degli strumenti
- **Valutazione del Rischio**: Valutazione automatizzata della postura di sicurezza dello strumento

## 5. **Prevenzione di Attacchi Confused Deputy**

### **Sicurezza del Proxy OAuth**

**Controlli di Prevenzione degli Attacchi:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**Requisiti di Implementazione:**
- **Verifica del Consenso Utente**: Mai saltare le schermate di consenso per la registrazione dinamica dei client
- **Validazione Redirect URI**: Validazione rigorosa basata su whitelist delle destinazioni di reindirizzamento
- **Protezione del Codice di Autorizzazione**: Codici a breve durata con enforcement ad uso singolo
- **Verifica Identità Client**: Validazione robusta delle credenziali e metadati client

## 6. **Sicurezza nell’Esecuzione degli Strumenti**

### **Sandboxing & Isolamento**

**Isolamento Basato su Container:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**Isolamento dei Processi:**
- **Contesti di Processo Separati**: Ogni esecuzione strumento in spazio processo isolato
- **Comunicazione Inter-Processo**: Meccanismi IPC sicuri con validazione
- **Monitoraggio dei Processi**: Analisi runtime del comportamento e rilevamento anomalie
- **Enforcement delle Risorse**: Limiti rigorosi su CPU, memoria e operazioni I/O

### **Implementazione del Principio del Minimo Privilegio**

**Gestione dei Permessi:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **Controlli di Sicurezza per la Supply Chain**

**Rischio OWASP MCP Indirizzato**: [MCP04 - Attacchi alla Supply Chain](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verifica delle Dipendenze**

**Sicurezza Completa dei Componenti:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **Monitoraggio Continuo**

**Rilevamento delle Minacce alla Supply Chain:**
- **Monitoraggio Sanitá Dipendenze**: Valutazione continua di tutte le dipendenze per problemi di sicurezza
- **Integrazione Informazioni sulle Minacce**: Aggiornamenti in tempo reale sulle minacce emergenti alla supply chain
- **Analisi Comportamentale**: Rilevamento di comportamenti anomali in componenti esterni
- **Risposta Automatica**: Contenimento immediato di componenti compromessi

## 8. **Controlli per Monitoraggio & Rilevamento**

**Rischio OWASP MCP Indirizzato**: [MCP08 - Mancanza di Audit & Telemetria](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Security Information and Event Management (SIEM)**

**Strategia Completa di Logging:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **Rilevamento delle Minacce in Tempo Reale**

**Analisi Comportamentale:**
- **User Behavior Analytics (UBA)**: Rilevamento di pattern di accesso utente insoliti
- **Entity Behavior Analytics (EBA)**: Monitoraggio del comportamento di server MCP e strumenti
- **Rilevamento Anomalie con Machine Learning**: Identificazione AI-powered delle minacce di sicurezza
- **Correlazione delle Informazioni sulle Minacce**: Confronto delle attività osservate con pattern di attacco noti

## 9. **Risposta agli Incidenti & Recupero**

### **Capacità di Risposta Automatica**

**Azioni di Risposta Immediate:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **Capacità Forensi**

**Supporto alle Indagini:**
- **Conservazione Audit Trail**: Logging immutabile con integrità crittografica
- **Raccolta delle Evidenze**: Raccolta automatizzata di artefatti di sicurezza rilevanti
- **Ricostruzione della Timeline**: Sequenza dettagliata degli eventi che hanno portato agli incidenti di sicurezza
- **Valutazione dell’Impatto**: Valutazione dell’ambito della compromissione e dell’esposizione dei dati

## **Principi Chiave dell’Architettura di Sicurezza**

### **Difesa in Profondità**
- **Molteplici Livelli di Sicurezza**: Nessun singolo punto di falla nell'architettura di sicurezza
- **Controlli Ridondanti**: Misure di sicurezza sovrapposte per funzioni critiche
- **Meccanismi Fail-Safe**: Default sicuri quando sistemi incontrano errori o attacchi

### **Implementazione Zero Trust**
- **Mai Fidarsi, Sempre Verificare**: Validazione continua di tutte le entità e richieste
- **Principio del Minimo Privilegio**: Accesso minimo per tutti i componenti
- **Micro-Segmentazione**: Controlli granulari di rete e accesso

### **Evoluzione Continua della Sicurezza**
- **Adattamento al Panorama delle Minacce**: Aggiornamenti regolari per affrontare minacce emergenti
- **Efficacia dei Controlli di Sicurezza**: Valutazione e miglioramento continuo dei controlli
- **Conformità alle Specifiche**: Allineamento agli standard MCP di sicurezza in evoluzione

---

## **Risorse per l’Implementazione**

### **Documentazione Ufficiale MCP**
- [Specificazione MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Best Practices di Sicurezza MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specificazione di Autorizzazione MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Risorse di Sicurezza OWASP MCP**
- [Guida alla Sicurezza Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 completo con implementazione Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Rischi ufficiali OWASP MCP per la sicurezza
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica sulla sicurezza per MCP in Azure

### **Soluzioni di Sicurezza Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Standard di Sicurezza**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 per Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Importante**: Questi controlli di sicurezza riflettono la specifica MCP corrente (2025-11-25). Verificare sempre con la [documentazione ufficiale](https://spec.modelcontextprotocol.io/) aggiornata perché gli standard evolvono rapidamente.

## Cosa c’è Dopo

- Tornare a: [Panoramica Modulo Sicurezza](./README.md)
- Continua a: [Modulo 3: Iniziare](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avvertenza**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire l’accuratezza, si prega di considerare che le traduzioni automatiche possono contenere errori o inesattezze. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un traduttore umano. Non ci assumiamo responsabilità per eventuali incomprensioni o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->