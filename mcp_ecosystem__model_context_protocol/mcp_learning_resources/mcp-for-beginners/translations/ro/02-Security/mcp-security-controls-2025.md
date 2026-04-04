# Controale de Securitate MCP - Actualizare Februarie 2026

> **Standard Curent**: Acest document reflectă cerințele de securitate din [Specificația MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) și [Cele mai bune practici oficiale de securitate MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Protocolul Model Context (MCP) a evoluat semnificativ cu controale de securitate îmbunătățite pentru a aborda atât securitatea software tradițională, cât și amenințările specifice AI. Acest document oferă controale de securitate cuprinzătoare pentru implementări securizate MCP aliniate cu cadrul OWASP MCP Top 10.

## 🏔️ Instruire Practică de Securitate

Pentru experiență practică hands-on în implementarea securității, recomandăm **[Atelierul MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - o expediție ghidată completă pentru securizarea serverelor MCP în Azure folosind metodologia "vulnerabil → exploatare → remediere → validare".

Toate controalele de securitate din acest document sunt aliniate cu **[Ghidul de securitate OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)**, care oferă arhitecturi de referință și îndrumări specifice implementării în Azure pentru riscurile OWASP MCP Top 10.

## **Cerințe Obligatorii de Securitate**

### **Prohibiții Critice din Specificația MCP:**

> **INTERZIS**: Serverele MCP **NU TREBUIE** să accepte niciun token care nu a fost emis explicit pentru serverul MCP  
>
> **PROHIBIT**: Serverele MCP **NU TREBUIE** să utilizeze sesiuni pentru autentificare  
>
> **NECESAR**: Serverele MCP care implementează autorizarea **TREBUIE** să verifice TOATE cererile primite  
>
> **OBLIGATORIU**: Serverele proxy MCP care folosesc ID-uri client statice **TREBUIE** să obțină consimțământul utilizatorului pentru fiecare client înregistrat dinamic

---

## 1. **Controale de Autentificare & Autorizare**

### **Integrarea unui Furnizor de Identitate Extern**

**Standardul MCP Curent (2025-11-25)** permite serverelor MCP să delege autentificarea către furnizori externi de identitate, reprezentând o îmbunătățire semnificativă de securitate:

**Riscuri OWASP MCP Abordate**: [MCP07 - Autentificare & Autorizare Insuficiente](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Beneficii de Securitate:**
1. **Eliminarea Riscurilor de Autentificare Personalizată**: Reduce suprafața de vulnerabilitate evitând implementările personalizate de autentificare  
2. **Securitate de Clasă Enterprise**: Utilizează furnizori de identitate consacrați precum Microsoft Entra ID cu caracteristici avansate de securitate  
3. **Management Centralizat al Identității**: Simplifică gestionarea ciclului de viață al utilizatorilor, controlul accesului și auditul conformității  
4. **Autentificare Multifactor (MFA)**: Moștenește capacitățile MFA de la furnizorii enterprise de identitate  
5. **Politici de Acces Condiționat**: Beneficiază de controlul accesului bazat pe risc și autentificare adaptivă  

**Cerințe de Implementare:**
- **Validarea Publicului Tokenului**: Verificarea că toate tokenurile sunt emise explicit pentru serverul MCP  
- **Verificarea Emitentului**: Validarea că emitentul tokenului corespunde furnizorului de identitate așteptat  
- **Verificarea Semnăturii**: Validare criptografică a integrității tokenului  
- **Aplicarea Expirării**: Respectarea strictă a limitelor de durată a tokenului  
- **Validarea Scopului**: Confirmarea că tokenurile conțin permisiunile potrivite pentru operațiile solicitate  

### **Securitatea Logicii de Autorizare**

**Controale Critice:**
- **Audituri Cuprinzătoare de Autorizare**: Revizuiri regulate de securitate ale tuturor punctelor de decizie pentru autorizare  
- **Valori Implicite Fail-Safe**: Refuzul accesului când logica de autorizare nu poate lua o decizie definitivă  
- **Limite clare de Permisiuni**: Separare clară între nivele diferite de privilegii și acces la resurse  
- **Jurnalizare pentru Audit**: Logare completă a tuturor deciziilor de autorizare pentru monitorizarea securității  
- **Revizuiri Periodice ale Accesului**: Validarea periodică a permisiunilor și atribuțiilor de privilegii  

## 2. **Securitatea Tokenurilor & Controale Anti-Passthrough**

**Riscuri OWASP MCP Abordate**: [MCP01 - Gestionare Greșită a Tokenurilor & Expunerea Secretelor](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevenirea Passthrough-ului Tokenului**

**Passthrough-ul tokenului este explicit interzis** în Specificația de Autorizare MCP din cauza riscurilor critice de securitate:

**Riscuri de Securitate Abordate:**
- **Ocolirea Controlului**: Ocolirea controalelor esențiale de securitate precum limitarea ratei, validarea cererilor și monitorizarea traficului  
- **Lipsa Responsabilității**: Face imposibilă identificarea clientului, corupând jurnalele de audit și investigațiile incidentelor  
- **Exfiltrare prin Proxy**: Permite actorilor malițioși să folosească serverele ca proxy pentru acces neautorizat la date  
- **Încălcarea Graniței de Încredere**: Rupe presupunerile de încredere ale serviciilor downstream legate de originea tokenurilor  
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

### **Modele de Gestionare Securizată a Tokenurilor**

**Cele mai bune practici:**
- **Tokenuri cu Durată Scurtă**: Minimizează fereastra de expunere prin rotație frecventă a tokenurilor  
- **Emitere Just-in-Time**: Emiterea tokenurilor doar când sunt necesare pentru operații specifice  
- **Stocare Securizată**: Utilizarea modulelor hardware de securitate (HSM) sau a seifurilor de chei securizate  
- **Legarea Tokenului**: Asocierea tokenurilor cu clienți, sesiuni sau operații specifice, unde este posibil  
- **Monitorizare & Alertare**: Detectarea în timp real a utilizării necorespunzătoare a tokenurilor sau a accesului neautorizat  

## 3. **Controale de Securitate a Sesiunii**

### **Prevenirea Deturnării Sesiunii**

**Vectori de Atac Abordați:**
- **Injectarea Prompt-ului de Deturnare a Sesiunii**: Evenimente malițioase injectate în starea de sesiune partajată  
- **Impersonarea Sesiunii**: Utilizarea neautorizată a ID-urilor de sesiune furate pentru a ocoli autentificarea  
- **Atacuri de Reluare a Fluxului**: Exploatarea reluării evenimentelor trimise de server pentru injectare malițioasă de conținut  

**Controale Obligatorii pentru Sesiune:**
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

**Securitate la Transport:**
- **Aplicarea HTTPS**: Toată comunicarea de sesiune prin TLS 1.3  
- **Atribute Secure pentru Cookie-uri**: HttpOnly, Secure, SameSite=Strict  
- **Pinning Certificat**: Pentru conexiuni critice pentru prevenirea atacurilor MITM  

### **Considerații Stateful vs Stateless**

**Pentru implementări Stateful:**
- Starea de sesiune partajată necesită protecție suplimentară împotriva atacurilor de injecție  
- Managementul sesiunii pe bază de coadă necesită verificarea integrității  
- Instanțe multiple de server necesită sincronizare securizată a stării sesiunii  

**Pentru implementări Stateless:**
- Managementul sesiunii pe bază de token JWT sau similar  
- Verificare criptografică a integrității stării sesiunii  
- Suprafață de atac redusă, dar necesită validarea robustă a tokenului  

## 4. **Controale de Securitate Specifice AI**

**Riscuri OWASP MCP Abordate**:
- [MCP06 - Injecție de Prompt prin Payload-uri Contextuale](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Otrăvirea Uneltelor](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Injecție și Execuție de Comenzi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Apărarea împotriva Injecției de Prompt**

**Integrarea Microsoft Prompt Shields:**
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
- **Sanitizarea Input-ului**: Validare și filtrare cuprinzătoare a tuturor datelor de intrare ale utilizatorului  
- **Definirea Limitelor de Conținut**: Separare clară între instrucțiunile sistemului și conținutul utilizatorului  
- **Ierarhie a Instrucțiunilor**: Reguli de precedență corecte pentru instrucțiuni conflictuale  
- **Monitorizarea Ieșirilor**: Detectarea ieșirilor potențial dăunătoare sau manipulate  

### **Prevenirea Otrăvirii Uneltelor**

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
- **Capabilități de Revocare**: Posibilitatea de a reveni la versiunile anterioare ale uneltei  
- **Auditarea Modificărilor**: Istoric complet al modificărilor definițiilor uneltelor  
- **Evaluarea Riscurilor**: Evaluare automată a posturii de securitate a uneltelor  

## 5. **Prevenirea Atacului Confused Deputy**

### **Securitatea Proxy OAuth**

**Controale de Prevenire a Atacului:**
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
- **Verificarea Consimțământului Utilizatorului**: Nu se sără peste ecranele de consimțământ pentru înregistrarea dinamică a clientului  
- **Validarea URI-ului de Redirecționare**: Validare strictă, bazată pe whitelist, a destinațiilor de redirecționare  
- **Protecția Codului de Autorizare**: Coduri cu durată scurtă și aplicare pentru utilizare unică  
- **Verificarea Identității Clientului**: Validare robustă a acreditărilor și metadatelor clientului  

## 6. **Securitatea Execuției Uneltelor**

### **Izolare și Sandboxing**

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
- **Contexturi Proces Separate**: Fiecare execuție a uneltei în spațiu de proces izolat  
- **Comunicare Inter-Proces (IPC)**: Mecanisme IPC securizate, cu validare  
- **Monitorizarea Procesului**: Analiza comportamentului la runtime și detectarea anomaliilor  
- **Aplicarea Resurselor**: Limite stricte la CPU, memorie și operațiuni I/O  

### **Implementarea Principiului Celor Mai Mici Privilegii**

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

## 7. **Controale de Securitate a Lanțului de Aprovizionare**

**Riscuri OWASP MCP Abordate**: [MCP04 - Atacuri pe Lanțul de Aprovizionare](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verificarea Dependențelor**

**Securitate Completă a Componentelor:**
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

**Detecția Amenințărilor Lanțului de Aprovizionare:**
- **Monitorizarea Sănătății Dependențelor**: Evaluare continuă a tuturor dependențelor pentru probleme de securitate  
- **Integrarea Informațiilor despre Amenințări**: Actualizări în timp real despre amenințări emergente din lanțul de aprovizionare  
- **Analiza Comportamentală**: Detectarea comportamentelor neobișnuite în componente externe  
- **Răspuns Automatizat**: Conținerea imediată a componentelor compromise  

## 8. **Controale de Monitorizare & Detecție**

**Riscuri OWASP MCP Abordate**: [MCP08 - Lipsa Auditului & Telemeteriei](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Managementul Informațiilor și Evenimentelor de Securitate (SIEM)**

**Strategie Completă de Logare:**
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

### **Detecție a Amenințărilor în Timp Real**

**Analize Comportamentale:**
- **Analiza Comportamentului Utilizatorului (UBA)**: Detectarea tiparelor neobișnuite de acces al utilizatorului  
- **Analiza Comportamentului Entității (EBA)**: Monitorizarea comportamentului serverelor MCP și al uneltelor  
- **Detecția Anomaliilor bazate pe Machine Learning**: Identificarea amenințărilor de securitate asistată de AI  
- **Corelația Inteligenței de Amenințări**: Compararea activităților observate cu tipare cunoscute de atac  

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
- **Păstrarea Urmelor de Audit**: Logare imuabilă cu integritate criptografică  
- **Colectarea Dovezilor**: Strângerea automată a artefactelor relevante de securitate  
- **Reconstruirea Cronologică**: Secvență detaliată a evenimentelor care au condus la incidente de securitate  
- **Evaluarea Impactului**: Determinarea amplorii compromisului și expunerii datelor  

## **Principii Cheie ale Arhitecturii de Securitate**

### **Apărare în Profunzime**
- **Straturi Multiple de Securitate**: Niciun punct unic de eșec în arhitectura de securitate  
- **Controale Redundante**: Măsuri de securitate suprapuse pentru funcții critice  
- **Mecanisme Fail-Safe**: Implicit sigur când sistemele întâlnesc erori sau atacuri  

### **Implementarea Zero Trust**
- **Niciodată încredere, Verifică întotdeauna**: Validarea continuă a tuturor entităților și cererilor  
- **Principiul celor mai mici privilegii**: Drepturi minime de acces pentru toate componentele  
- **Micro-segmentare**: Control granular al rețelei și accesului  

### **Evoluția Continuă a Securității**
- **Adaptarea la Peisajul Amenințărilor**: Actualizări regulate pentru a aborda amenințările emergente  
- **Eficiența Controlului de Securitate**: Evaluare și îmbunătățire continuă a controalelor  
- **Conformitatea cu Specificațiile**: Aliniere cu standardele MCP de securitate în evoluție  

---

## **Resurse pentru Implementare**

### **Documentație Oficială MCP**
- [Specificația MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Cele mai bune practici de securitate MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Specificația de autorizare MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **Resurse OWASP MCP pentru Securitate**
- [Ghidul de securitate OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 cu implementare Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscurile oficiale OWASP MCP  
- [Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Instruire practică de securitate pentru MCP pe Azure  

### **Soluții de securitate Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Standarde de Securitate**
- [Cele mai bune practici pentru OAuth 2.0 Security (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 pentru Modele Mari de Limbaj](https://genai.owasp.org/)  
- [Cadru NIST pentru Cibernetică](https://www.nist.gov/cyberframework)  

---

> **Important**: Aceste controale de securitate reflectă specificația curentă MCP (2025-11-25). Verificați întotdeauna conform celei mai recente [documentații oficiale](https://spec.modelcontextprotocol.io/) deoarece standardele continuă să evolueze rapid.

## Ce urmează

- Revenire la: [Prezentarea Modulului de Securitate](./README.md)
- Continuați la: [Modul 3: Începerea](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original, în limba sa nativă, trebuie considerat sursa autoritară. Pentru informații critice, se recomandă o traducere profesională realizată de un traducător uman. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care pot rezulta din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->