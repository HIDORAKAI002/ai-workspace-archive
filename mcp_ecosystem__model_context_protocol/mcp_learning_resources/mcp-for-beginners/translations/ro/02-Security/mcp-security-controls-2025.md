# Controale de Securitate MCP - Actualizare Februarie 2026

> **Standard Actual**: Acest document reflectă cerințele de securitate din [Specificația MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) și [Cele Mai Bune Practici Oficiale de Securitate MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Protocolul Model Context (MCP) a evoluat semnificativ, cu controale de securitate îmbunătățite care abordează atât securitatea software tradițională, cât și amenințările specifice AI. Acest document oferă controale de securitate cuprinzătoare pentru implementări securizate MCP, aliniate cu cadrul OWASP MCP Top 10.

## 🏔️ Instruire Practică în Securitate

Pentru experiență practică în implementarea securității, recomandăm **[Atelierul MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - o expediție ghidată cuprinzătoare pentru securizarea serverelor MCP în Azure folosind metodologia „vulnerabil → exploatat → remediat → validat”.

Toate controalele de securitate din acest document sunt aliniate cu **[Ghidul de Securitate OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)**, care oferă arhitecturi de referință și îndrumări specifice Azure pentru implementarea riscurilor OWASP MCP Top 10.

## **Cerințe Obligatorii de Securitate**

### **Interdicții Critice din Specificația MCP:**

> **INTERZIS**: Serverele MCP **NU TREBUIE** să accepte niciun token care nu a fost emis explicit pentru serverul MCP  
>
> **PROHIBIT**: Serverele MCP **NU TREBUIE** să utilizeze sesiuni pentru autentificare  
>
> **NECESAR**: Serverele MCP care implementează autorizarea **TREBUIE** să verifice TOATE cererile inbound  
>
> **MANDATORIU**: Serverele proxy MCP care folosesc ID-uri statice de client **TREBUIE** să obțină consimțământul utilizatorului pentru fiecare client înregistrat dinamic

---

## 1. **Controale de Autentificare și Autorizare**

### **Integrarea unui Furnizor de Identitate Extern**

**Standardul MCP Actual (2025-11-25)** permite serverelor MCP să delege autentificarea către furnizori de identitate externi, reprezentând o îmbunătățire semnificativă a securității:

**Risc OWASP MCP Abordat**: [MCP07 - Autentificare și Autorizare Insuficiente](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Beneficii de Securitate:**
1. **Elimină Riscurile Autentificării Personalizate**: Reduce suprafața vulnerabilităților evitând implementările personalizate de autentificare  
2. **Securitate de Nivel Enterprise**: Folosește furnizori de identitate consacrați precum Microsoft Entra ID cu funcții avansate de securitate  
3. **Management Centralizat al Identității**: Simplifică ciclul de viață al utilizatorului, controlul accesului și auditul de conformitate  
4. **Autentificare Multi-Factor**: Moștenește capabilitățile MFA de la furnizorii enterprise  
5. **Politici de Acces Condiționat**: Beneficiază de controale de acces bazate pe risc și autentificare adaptivă

**Cerințe de Implementare:**
- **Validarea Audienței Tokenului**: Verifică că toate tokenurile sunt emise explicit pentru serverul MCP  
- **Verificarea Emitentului**: Confirmă că emitentul tokenului este furnizorul de identitate așteptat  
- **Verificarea Semnăturii**: Validare criptografică a integrității tokenului  
- **Aplicarea Expirării**: Aplică strict limitele de durată ale tokenului  
- **Validarea Scopului**: Asigură că tokenurile conțin permisiunile adecvate pentru operațiile solicitate

### **Securitatea Logicii de Autorizare**

**Controale Critice:**
- **Audituri Cuprinzătoare de Autorizare**: Revizuiri regulate de securitate pentru toate punctele de decizie privind autorizarea  
- **Implicit Interdicție la Eșec**: Respingerea accesului atunci când logica de autorizare nu poate lua o decizie definitivă  
- **Limite de Permisiune**: Separare clară între diferite niveluri de privilegii și accesul la resurse  
- **Înregistrare de Audit**: Logare completă a tuturor deciziilor de autorizare pentru supraveghere de securitate  
- **Revizuiri Periodice ale Accesului**: Validarea periodică a permisiunilor și a alocărilor de privilegii ale utilizatorilor

## 2. **Securitatea Tokenului & Controale Anti-Passthrough**

**Risc OWASP MCP Abordat**: [MCP01 - Management Deficitar al Tokenurilor & Expunerea Secretelor](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevenirea Passthrough-ului Tokenului**

**Passthrough-ul tokenului este explicit interzis** în Specificația de Autorizare MCP din cauza riscurilor critice de securitate:

**Riscuri de Securitate Abordate:**
- **Ocolirea Controlului**: Evită controalele esențiale precum limitarea ratei, validarea cererilor și monitorizarea traficului  
- **Defect de Responsabilitate**: Face imposibilă identificarea clientului, corupând jurnalele de audit și investigarea incidentelor  
- **Exfiltrare prin Proxy**: Permite actorilor rău intenționați să folosească serverele ca proxy pentru acces neautorizat la date  
- **Încălcarea Limitelor de Încredere**: Rupe presupunerile serviciilor downstream privind originea tokenurilor  
- **Mișcare Laterală**: Tokenurile compromise pe mai multe servicii permit extinderea atacului

**Controale de Implementare:**
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

### **Modele Sigure de Management al Tokenului**

**Cele Mai Bune Practici:**
- **Tokenuri cu Durată Scurtă de Viață**: Minimizați fereastra de expunere prin rotație frecventă a tokenurilor  
- **Emitere Just-in-Time**: Emiteți tokenuri doar când sunt necesare pentru operații specifice  
- **Stocare Securizată**: Folosiți module hardware de securitate (HSM) sau seifuri securizate de chei  
- **Legarea Tokenului**: Asociați tokenurile cu clienți, sesiuni sau operații specifice, acolo unde este posibil  
- **Monitorizare & Alertare**: Detectarea în timp real a utilizărilor abuzive sau accesului neautorizat la tokenuri

## 3. **Controale de Securitate a Sesiunii**

### **Prevenirea Preluării Sesiunii**

**Vectori de Atac Abordați:**
- **Injectare Malicioasă în Starea Sesiunii**: Evenimente malițioase injectate în starea sesiunii partajate  
- **Impersonare de Sesiune**: Utilizarea neautorizată a ID-urilor de sesiune furate pentru a evita autentificarea  
- **Atacuri de Reluare a Fluxului**: Exploatarea reluării evenimentelor trimise de server pentru injectare de conținut malițios

**Controale Obligatorii pentru Sesiuni:**
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

**Securitate în Transmitere:**
- **Aplicarea HTTPS**: Toată comunicarea sesiunii peste TLS 1.3  
- **Atribute Cookie Sigure**: HttpOnly, Secure, SameSite=Strict  
- **Fixarea Certificatului**: Pentru conexiuni critice pentru prevenirea atacurilor MITM

### **Considerații Stateful vs Stateless**

**Pentru Implementări Stateful:**  
- Starea sesiunii partajate necesită protecție suplimentară împotriva atacurilor de injectare  
- Gestionarea sesiunii bazată pe coadă necesită verificarea integrității  
- Mai multe instanțe de server necesită sincronizare securizată a stării sesiunii

**Pentru Implementări Stateless:**  
- Gestionarea sesiunii bazată pe tokenuri JWT sau similare  
- Verificarea criptografică a integrității stării sesiunii  
- Suprafață de atac redusă, dar necesită validare robustă a tokenurilor

## 4. **Controale de Securitate Specifice AI**

**Riscuri OWASP MCP Abordate**:  
- [MCP06 - Subversiunea Fluxului de Instrucțiuni](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Otravirea Uneltelor](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Injectarea și Executarea Comenzilor](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Apărare împotriva Injectării în Instrucțiuni**

**Integrare Microsoft Prompt Shields:**  
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

**Controale de Implementare:**
- **Securizarea Inputului**: Validare și filtrare cuprinzătoare a tuturor intrărilor utilizatorului  
- **Definirea Limitelor de Conținut**: Separare clară între instrucțiunile sistemului și conținutul utilizatorului  
- **Ierarhie a Instrucțiunilor**: Regulile de prioritate pentru instrucțiuni conflictuale  
- **Monitorizarea Outputului**: Detectarea ieșirilor potențial dăunătoare sau manipulate

### **Prevenirea Otravirii Uneltelor**

**Cadru de Securitate pentru Unelte:**  
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

**Management Dinamic al Uneltelor:**  
- **Fluxuri de Aprobare**: Consimțământ explicit al utilizatorului pentru modificările uneltelor  
- **Capabilități de Restaurare**: Posibilitatea de a reveni la versiuni anterioare ale uneltelor  
- **Auditarea Modificărilor**: Istoric complet al modificărilor definițiilor uneltelor  
- **Evaluarea Riscurilor**: Evaluare automată a posturii de securitate a uneltei

## 5. **Prevenirea Atacurilor Confused Deputy**

### **Securitatea Proxy OAuth**

**Controale de Prevenire a Atacurilor:**  
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

**Cerințe de Implementare:**
- **Verificarea Consimțământului Utilizatorului**: Niciodată să nu ocoliți ecranele de consimțământ pentru înregistrarea dinamică a clienților  
- **Validarea URI-urilor de Redirect**: Validare strictă pe bază de listă albă a destinațiilor de redirect  
- **Protecția Codului de Autorizare**: Coduri cu valabilitate scurtă și utilizare unică  
- **Verificarea Identității Clientului**: Validare robustă a acreditărilor clientului și a metadatelor

## 6. **Securitatea Executării Uneltelor**

### **Izolare și Sandbox**

**Izolare Bazată pe Containere:**  
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

**Izolarea Proceselor:**  
- **Contexturi de Proces Separate**: Fiecare execuție a uneltei într-un spațiu de proces izolat  
- **Comunicare Inter-Proces**: Mecanisme IPC securizate cu validare  
- **Monitorizarea Procesului**: Analiza comportamentului la runtime și detectarea anomaliilor  
- **Aplicarea Resurselor**: Limite stricte pentru CPU, memorie și operații I/O

### **Implementarea Principiului Privilegiului Minim**

**Managementul Permisiunilor:**  
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

## 7. **Controale de Securitate pentru Lanțul de Aprovizionare**

**Risc OWASP MCP Abordat**: [MCP04 - Atacuri asupra Lanțului de Aprovizionare Software și Manipularea Dependențelor](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verificarea Dependențelor**

**Securitatea Completă a Componentelor:**  
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

### **Monitorizare Continuă**

**Detectarea Amenințărilor din Lanțul de Aprovizionare:**  
- **Monitorizarea Stării Dependențelor**: Evaluare continuă a tuturor dependențelor pentru probleme de securitate  
- **Integrarea Threat Intelligence**: Actualizări în timp real despre amenințările emergente din lanțul de aprovizionare  
- **Analiza Comportamentală**: Detectarea comportamentelor neobișnuite în componentele externe  
- **Răspuns Automat**: Conținerea imediată a componentelor compromise

## 8. **Controale de Monitorizare & Detecție**

**Risc OWASP MCP Abordat**: [MCP08 - Lipsa Auditului și Telemetriei](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Managementul Informațiilor de Securitate și Evenimente (SIEM)**

**Strategie Cuprinzătoare de Logare:**  
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

### **Detectarea Amenințărilor în Timp Real**

**Analize Comportamentale:**  
- **Analiza Comportamentului Utilizatorului (UBA)**: Detectarea tiparelor neobișnuite de acces ale utilizatorilor  
- **Analiza Comportamentului Entității (EBA)**: Monitorizarea comportamentului serverului MCP și al uneltelor  
- **Detecție Anomalie prin Învățare Automată**: Identificarea amenințărilor de securitate cu suport AI  
- **Corelarea Threat Intelligence**: Potrivirea activităților observate cu tiparele cunoscute de atac

## 9. **Răspuns la Incidente & Recuperare**

### **Capabilități de Răspuns Automat**

**Acțiuni Imediate de Răspuns:**  
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

### **Capabilități Forensice**

**Suport pentru Investigații:**  
- **Păstrarea Traseului de Audit**: Logare imuabilă cu integritate criptografică  
- **Colectarea Dovezilor**: Colectarea automată a artefactelor relevante de securitate  
- **Reconstrucția Cronologiei**: Secvență detaliată a evenimentelor care au condus la incidentele de securitate  
- **Evaluarea Impactului**: Evaluarea magnitudinii compromiterii și a expunerii datelor

## **Principii Cheie ale Arhitecturii de Securitate**

### **Apărare în Profunzime**  
- **Multiple Straturi de Securitate**: Fără punct unic de eșec în arhitectura de securitate  
- **Controale Redundante**: Măsuri de securitate suprapuse pentru funcții critice  
- **Mecanisme Fail-Safe**: Implicit securizat când sistemele întâmpină erori sau atacuri

### **Implementarea Zero Trust**  
- **Niciodată nu Aveți Încredere, Verificați Întotdeauna**: Validare continuă a tuturor entităților și cererilor  
- **Principiul Privilegiului Minim**: Acces minim necesar pentru toate componentele  
- **Micro-Segmentare**: Controale granulare de rețea și acces

### **Evoluție Continuă a Securității**  
- **Adaptarea la Peisajul Amenințărilor**: Actualizări regulate pentru a aborda amenințările emergente  
- **Eficacitatea Controlului de Securitate**: Evaluare și îmbunătățire continuă a controalelor  
- **Conformitatea cu Specificația**: Aliniere cu standardele MCP de securitate în evoluție

---

## **Resurse de Implementare**

### **Documentație Oficială MCP**  
- [Specificația MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Cele Mai Bune Practici de Securitate MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Specificația de Autorizare MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Resurse de Securitate OWASP MCP**  
- [Ghid de Securitate OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 cu implementare Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscurile oficiale OWASP MCP  
- [Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Instruire practică de securitate pentru MCP pe Azure

### **Soluții Microsoft de Securitate**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Standarde de Securitate**  
- [Cele Mai Bune Practici OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 pentru Modele de Limbaj Mare (LLM)](https://genai.owasp.org/)  
- [Cadru de Securitate Cibernetică NIST](https://www.nist.gov/cyberframework)

---

> **Important**: Aceste controale de securitate reflectă specificația MCP curentă (2025-11-25). Verificați întotdeauna în [documentația oficială](https://spec.modelcontextprotocol.io/) cea mai recentă versiune deoarece standardele evoluează rapid.

## Ce Urmează

- Revenire la: [Prezentare Generală Modul Securitate](./README.md)  
- Continuare la: [Modul 3: Începutul Lucrului](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->