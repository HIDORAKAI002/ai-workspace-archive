# ការត្រួតពិនិត្យសុវត្ថិភាព MCP - ការអាប់ដេត ខែកុម្ភៈ ២០២៦

> **ស្តង់ដារបច្ចុប្បន្ន**៖ ឯកសារនេះបញ្ចាំងតម្រូវការសុវត្ថិភាព [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) និង [អនុវត្តការសុវត្ថិភាពល្អបំផុត MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) ផ្លូវការអំពីសុវត្ថិភាព។

Model Context Protocol (MCP) បានរីកចម្រើនយ៉ាងច្រើនជាមួយនឹងការត្រួតពិនិត្យសុវត្ថិភាពដែលបានពង្រឹង ដើម្បីដោះស្រាយទាំងប្រព័ន្ធសុវត្ថិភាពកម្មវិធីបុរាណ និងគ្រោះថ្នាក់ពិសេស AI។ ឯកសារនេះផ្តល់នូវការត្រួតពិនិត្យសុវត្ថិភាពទូលំទូលាយសម្រាប់ការអនុវត្ត MCP ដែលមានសុវត្ថិភាព តាមរយៈ​ក្រោម​សេចក្ដី​អនុលោមនៃស៊ុម OWASP MCP Top 10។

## 🏔️ ការបណ្តុះបណ្តាលសុវត្ថិភាពជាអនុវត្ត

សម្រាប់បទពិសោធន៍អនុវត្តន៍សុវត្ថិភាពជាក់ស្តែង យើងផ្តល់អនុសាសន៍ឲ្យចូលរួម **[វគ្គបណ្តុះបណ្តាលសុវត្ថិភាព MCP Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** — ជាការប្រកួតផ្តល់ជំនួយពេញលេញក្នុងការសុវត្ថិភាព MCP servers នៅ Azure ដោយប្រើវិធីសាស្ត្រដូចជា “មានចន្លោះបញ្ឆោត → គេច → ជួសជុល → ផ្ទៀងផ្ទាត់”។

ការត្រួតពិនិត្យសុវត្ថិភាពទាំងអស់នៅក្នុងឯកសារនេះស្របតាម **[មគ្គុទេសក៍សុវត្ថិភាព MCP Azure អ្នកសរសេរ OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** ដែលផ្តល់រចនាសម្ព័ន្ធយោង និងការណែនាំពិសេសសម្រាប់ការអនុវត្ត Azure ចំពោះហានិភ័យ OWASP MCP Top 10។

## **តម្រូវការសុវត្ថិភាពបង្ខំ**

### **ការធ្វើឲ្យជ្រាលជ្រៅនៃការហាមឃាត់ពី MCP Specification៖**

> **ហាមឃាត់**៖ MCP servers **មិនត្រូវ**ទទួលស្គាល់ token ដែលមិនត្រឹមត្រូវបានចេញសម្រាប់ MCP server
>
> **ហាមឃាត់**៖ MCP servers **មិនត្រូវ**ប្រើ session សម្រាប់ការផ្ទៀងផ្ទាត់
>
> **តម្រូវ**៖ MCP servers ធ្វើ authorization **ត្រូវ**ផ្ទៀងផ្ទាត់សំណើរ ចូលទាំងអស់
>
> **បង្ខំ**៖ MCP proxy servers ប្រើ client IDs ស្ថិតិ **ត្រូវ**ទទួលការយល់ព្រមពីអ្នកប្រើសម្រាប់ client ដែលបានចុះបញ្ជីដោយ δυναμικός

---

## 1. **ការត្រួតពិនិត្យភាពផ្ទៀងផ្ទាត់ និងការអនុញ្ញាត**

### **ការបញ្ចូលអ្នកផ្តល់អត្តសញ្ញាណខាងក្រៅ**

**ស្តង់ដារបច្ចុប្បន្ន MCP (2025-11-25)** អនុញ្ញាតឲ្យ MCP servers ផ្ទេរការផ្ទៀងផ្ទាត់ទៅអ្នកផ្តល់អត្តសញ្ញាណខាងក្រៅ ដែលជាការកែលម្អសុវត្ថិភាពយ៉ាងសំខាន់៖

**ហានិភ័យ OWASP MCP ដែលបានដោះស្រាយ**៖ [MCP07 - ការផ្ទៀងផ្ទាត់ និងការអនុញ្ញាតមិនគ្រប់គ្រាន់](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**អត្ថប្រយោជន៍សុវត្ថិភាព៖**
1. **បំបះហានិភ័យផ្ទៀងផ្ទាត់ប្តូរតាមច្នៃប្រឌិត**៖ បន្ថយអាសន្នភាពដោយការជៀសវាងការអនុវត្តផ្ទៀងផ្ទាត់ផ្ទាល់ខ្លួន
2. **សុវត្ថិភាពប្រកបដោយសេវាកម្មស៊ីរ៉ាស៊ីថ្នាក់អង្គការ**៖ ប្រើអ្នកផ្តល់អត្តសញ្ញាណដូចជា Microsoft Entra ID ដែលមានមុខងារសុវត្ថិភាពកម្រិតខ្ពស់
3. **ការគ្រប់គ្រងអត្តសញ្ញាណមជ្ឈមណ្ឌល**៖ បង្រួមបញ្ចូលជីវិតអ្នកប្រើ បានគ្រប់គ្រងការចូលប្រើ និងការត្រួតពិនិត្យឯកសារ
4. **ការផ្ទៀងផ្ទាត់ភាពច្រើនដង**៖ ទទួលបានសមត្ថភាព MFA ពីអ្នកផ្តល់អត្តសញ្ញាណអង្គការ
5. **គោលការណ៍ចូលប្រើដោយលក្ខខណ្ឌ**៖ ទទួលបានអត្ថប្រយោជន៍ពីវិន័យចូលប្រើផ្អែកលើហានិភ័យ និងការផ្ទៀងផ្ទាត់បត់បែន

**តម្រូវការអនុវត្ត៖**
- **ការផ្ទៀងផ្ទាត់ទស្សនារបស់ Token**៖ ផ្ទៀងផ្ទាត់ថា token ទាំងអស់ត្រូវបានចេញសម្រាប់ MCP server ដោយច្បាស់លាស់
- **ការផ្ទៀងផ្ទាត់អ្នកចេញ**៖ បញ្ជាក់ថាអ្នកចេញ token ត្រូវនឹងអ្នកផ្តល់អត្តសញ្ញាណដែលរំពឹង
- **ការផ្ទៀងផ្ទាត់ហត្ថលេខា**៖ ការផ្ទៀងផ្ទាត់បច្ចេកវិទ្យាអង្កេតសុវត្ថិភាពថា token មិនត្រូវបានផ្លាស់ប្តូរ
- **ការអនុវត្ត៊ីកំរិតផុតកំណត់**៖ អនុវត្តយ៉ាងម៉ត់ចត់លើអាយុកាល token
- **ការផ្ទៀងផ្ទាត់វិសាលភាព**៖ ប្រាកដថា token មានសិទ្ធិឲ្យសម្របសម្រួលនូវប្រតិបត្តិការដែលបានស្នើ

### **សុវត្ថិភាពលីហ្គិចអនុញ្ញាត**

**ការត្រួតពិនិត្យសំខាន់ៗ៖**
- **ការត្រួតពិនិត្យសុវត្ថិភាពច្បាស់លាស់នៃអនុញ្ញាតទាំងអស់**៖ ការពិនិត្យសុវត្ថិភាពជាប្រចាំឡើងវិញនៅចំណុចកំណត់សេចក្ដីសម្រេចអនុញ្ញាតទាំងអស់
- **លំនាំលាតត្រដាងបរាជ័យជាមូលដ្ឋាន**៖ បដិសេធកិច្ចសុំបើលីហ្គិចអនុញ្ញាតមិនអាចសម្រេចបានច្បាស់លាស់
- **ព្រំដែនសិទ្ធិ**៖ បំបែកច្បាស់លាស់រវាងកម្រិតអាទិភាព និងការចូលដំណើរការប្រារព្ធ
- **កំណត់ហេតុសកម្មភាព**៖ ការកំណត់ហេតុបំពេញនូវសេចក្ដីសម្រេចអនុញ្ញាតទាំងអស់សម្រាប់ត្រួតពិនិត្យសុវត្ថិភាព
- **ការត្រួតពិនិត្យការចូលប្រើជាប្រចាំ**៖ ការផ្ទៀងផ្ទាត់ជាប្រចាំលើសិទ្ធិអ្នកប្រើ និង ការចាត់តាំងអាទិភាព

## 2. **សុវត្ថិភាព Token និងការត្រួតពិនិត្យហាមឃាត់ការបញ្ជូនតាមរយៈ**

**ហានិភ័យ OWASP MCP ដែលបានដោះស្រាយ**៖ [MCP01 - ការគ្រប់គ្រង token មិនល្អ និងការពាក់ព័ន្ធនេះជាអាថ៌កំបាំង](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **ការហាមឃាត់ចម្លង Token តាមរយៈ**

**ការបញ្ជូនតtoken តាមរយៈត្រូវបានហាមឃាត់យ៉ាងច្បាស់** នៅក្នុងគម្រោងអនុញ្ញាត MCP ដោយសារហានិភ័យសុវត្ថិភាពសំខាន់ៗ៖

**ហានិភ័យសុវត្ថិភាពដែលបានដោះស្រាយ៖**
- **ការបំពានការគ្រប់គ្រង**៖ ជៀសវាងការគ្រប់គ្រងសុវត្ថិភាពដូចជា កំណត់អត្រា បរិច្ឆេទស្នើហើយ ការត្រួតពិនិត្យចរាចរណ៍
- **ការបាត់បង់ភាពទទួលខុសត្រូវ**៖ បង្កប់ការសម្គាល់អតិថិជន និងបំផ្លាញកំណត់ហេតុ audit និងការសืบสวนបញ្ហា
- **ការហែលបោកតាមរយៈ Proxy**៖ អនុញ្ញាតអ្នករត់ជំនួស ដើម្បីចូលដំណើរការទិន្នន័យដោយគ្មានការអនុញ្ញាត
- **ការបំពានដែនជំនួស**៖ បំបែកការជឿទុកចិត្តប្រព័ន្ធខាងក្រោមយ៉ាងសំខាន់សម្រាប់ token
- **ការផ្លាស់ទីជំនួស**៖ token ដែលរងគ្រោះកាត់ភាសារពីសេវាកម្មជាច្រើនធ្វើឲ្យការវាយប្រហារជាងទូលំទូលាយ

**ការគ្រប់គ្រងអនុវត្ត៖**
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

### **លំនាំការគ្រប់គ្រង Token សុវត្ថិភាព**

**អនុវត្តល្អបំផុត៖**
- **Token អាយុកាលខ្លី**៖ កាត់បន្ថយរយៈពេលលេចធ្លាយដោយបង្វិល token ជាញឹកញាប់
- **ចេញtoken ពេលត្រូវការ**៖ ចេញ token ម្តងតែមានតំរូវការសំរាប់ប្រតិបត្តិការ
- **ផ្ទុកសុវត្ថិភាព**៖ ប្រើឧបករណ៍សុវត្ថិភាពមើលច្បាស់ (HSM) ឬកូនដុំ key vault សុវត្ថិភាព
- **ភ្ជាប់ Token**៖ ភ្ជាប់ token ទៅកាន់ client, session ឬប្រតិបត្តិការ ផ្ទាល់ខ្លួនបំផុត
- **ការត្រួតពិនិត្យ និងការជូនដំណឹង**៖ រកឃើញភ្លាមៗការប្រើប្រាស់ token យ៉ាងមិនត្រូវឬចូលដំណើរការក្នុងបែបផែនអត់បានអនុញ្ញាតិ

## 3. **ការត្រួតពិនិត្យសុវត្ថិភាព Session**

### **ការការពារបន្លំ Session**

**វិធីវាយប្រហារដែលបានដោះស្រាយ៖**
- **ការចាក់បញ្ចូល Session Hijack Prompt**៖ ព្រឹត្តិការណ៍អាក្រក់ត្រូវចាក់ទុកក្នុងស្ថានភាព session ចែកធ្នែក
- **ការបន្លំ Session**៖ ប្រើ ID session លួចមក ដើម្បីជៀសវាងការផ្ទៀងផ្ទាត់
- **ការវាយប្រហារបន្តជំហាន Stream Resumable**៖ ប្រើការផ្ញើសារបន្តពីម៉ាស៊ីនមេ ឬការចាក់បញ្ចូលមាតិកាអាក្រក់

**ការត្រួតពិនិត្យ Session បញ្ញត្តិ៖**
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

**សុវត្ថិភាពដឹកជញ្ជូន:**
- **អនុវត្ត HTTPS**៖ ទំនាក់ទំនង session ទាំងអស់តាម TLS 1.3
- **លក្ខណៈសុវត្ថិភាពនៃ Cookie**៖ HttpOnly, Secure, SameSite=Strict
- **ការចងខ្សែអនុស្សរីយ៍ភ្ជាប់**៖ សម្រាប់ការភ្ជាប់សំខាន់ៗដើម្បីបញ្ចេញការវាយប្រហារមីតមី (MITM)

### **ពិចារណានៃ Stateful និង Stateless**

**សម្រាប់ការអនុវត្ត Stateful:**
- ស្ថានភាព session ចែករំលែកត្រូវការការការពារបន្ថែមពីការចាក់បញ្ចូល
- គ្រប់គ្រង session តាមរង្វៀងត្រូវមានការផ្ទៀងផ្ទាត់សុវត្ថិភាព
- មាស៊ីនមេជាច្រើនត្រូវការសមកាលកម្មស្ថានភាព session ដែលមានសុវត្ថិភាព

**សម្រាប់ការអនុវត្ត Stateless:**
- JWT ឬ token ផ្សេងទៀតគ្រប់គ្រង session
- ការផ្ទៀងផ្ទាត់បច្ចេកវិទ្យាអង្កេតសុវត្ថិភាពស្ថានភាព session
- កាត់បន្ថយផ្ទៃវាយប្រហារ ប៉ុន្តែត្រូវការ token validation ខ្លាំង

## 4. **ការត្រួតពិនិត្យសុវត្ថិភាពសម្រាប់ AI**

**ហានិភ័យ OWASP MCP ដែលបានដោះស្រាយ**៖
- [MCP06 - ការបម្លាស់ប្តូរចរន្តបំណង](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - ការលាបបំផ្លាញឧបករណ៍](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - ការចាក់បញ្ចូលបញ្ជា និងការអនុវត្ត](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **ការពារការចាក់បញ្ចូល Prompt**

**ការរួមបញ្ចូល Microsoft Prompt Shields:**
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

**ការគ្រប់គ្រងអនុវត្ត៖**
- **ការត្រួតពិនិត្យបញ្ចូល**៖ ការផ្ទៀងផ្ទាត់ និងត្រងបញ្ចូលអ្នកប្រើគ្រប់ក្នុងលម្អិត
- **កំណត់ដែនខ្លឹមសារ**៖ ការបំបែកច្បាស់រវាងសេចក្ដីណែនាំប្រព័ន្ធ និងមាតិកាអ្នកប្រើ
- **ហេតុផលនៃកាលវិភាគណែនាំ**៖ ច្បាស់លាស់លំដាប់អាទិភាពដល់សេចក្ដីណែនាំផ្ទុយគ្នា
- **ការត្រួតពិនិត្យលទ្ធផលចេញ**៖ រកឃើញលទ្ធផលដែលអាចមានការបំរែបំរួល ឬមានគ្រោះថ្នាក់

### **ការហាមឃាត់ការលាបបំផ្លាញ Tool**

**ស៊ុមសុវត្ថិភាពឧបករណ៍៖**
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

**ការគ្រប់គ្រងឧបករណ៍បែប δυναμικός:**
- **ដំណើរការអនុម័ត**៖ ឲ្យអ្នកប្រើយល់ព្រមច្បាស់លាស់សម្រាប់ការផ្លាស់ប្តូរឧបករណ៍
- **សមត្ថភាពត្រឡប់ក្រោយ**៖ អាចត្រឡប់ទៅកំណែជាមុននៃឧបករណ៍
- **ការត្រួតពិនិត្យផ្លាស់ប្តូរ**៖ កំណត់ប្រវត្តិពេញលេញរបស់ការផ្លាស់ប្តូរតំណាងឧបករណ៍
- **ការវាយតម្លៃហានិភ័យ**៖ ការវាយតម្លៃសុវត្ថិភាពឧបករណ៍ដោយស្វ័យប្រវត្តិ

## 5. **ការទប់ស្កាត់ការវាយប្រហារ Confused Deputy**

### **សុវត្ថិភាព OAuth Proxy**

**ការត្រួតពិនិត្យការការពារ:**
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

**តម្រូវការអនុវត្ត៖**
- **ការផ្ទៀងផ្ទាត់ការយល់ព្រមអ្នកប្រើ**៖ មិនអាចរំលងអេក្រង់ថ្កោលទេសម្រាប់ការចុះបញ្ជី client δυναμικός
- **ការផ្ទៀងផ្ទាត់ URI បញ្ជូនបន្ត**៖ ពិនិត្យ whitelist នៃគោលដៅបញ្ជូនយ៉ាងម៉ត់ចត់
- **ការពារកូដអនុញ្ញាត**៖ កូដមានអាយុកាលខ្លី និងអនុវត្តការប្រើតែមួយដង
- **ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ client**៖ ការផ្ទៀងផ្ទាត់គុណភាពរបស់ client និងមេតាដាតា

## 6. **សុវត្ថិភាពការប្រតិបត្តិ Tool**

### **Sandboxing និងការបំបែក**

**ការបំបែកផ្អែកលើ Container៖**
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

**ការបំបែកដំណើរការ:**
- **បរិបទដំណើរការផ្សេងៗ**៖ ប្រតិបត្តិការឧបករណ៍និមួយៗនៅក្នុងប្រព័ន្ធដំណើរការផ្សេងៗ
- **ការទំនាក់ទំនងអន្តរកម្មដំណើរការ**៖ មេកានីសម្រាប់ IPC មានសុវត្ថិភាព និងត្រួតពិនិត្យ
- **ការត្រួតពិនិត្យដំណើរការ**៖ វិភាគអាកប្បកិរិយារបស់ runtime និងរកឃើញប្រព្រឹត្តការណ៍ចម្លែក
- **ការគ្រប់គ្រងធនធាន**៖ កំណត់តម្លៃរឹងលើ CPU, សមត្ថភាពជីវិត និងប្រតិបត្តិការចូល/ចេញ I/O

### **ការអនុវត្តសិទ្ធិតិចបំផុត**

**គ្រប់គ្រងសិទិ្ធ៖**
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

## 7. **ការត្រួតពិនិត្យសុវត្ថិភាពខ្សែផ្គត់ផ្គង់**

**ហានិភ័យ OWASP MCP ដែលបានដោះស្រាយ**៖ [MCP04 - វាយប្រហារខ្សែផ្គត់ផ្គង់កម្មវិធី និងការតម្រង់ប្តូរជំនួស](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **ការផ្ទៀងផ្ទាត់ការពឹងផ្អែក**

**សុវត្ថិភាពធាតុផ្សំពេញលេញ៖**
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

### **ការត្រួតពិនិត្យជាប់ជាបន្ត**

**ការរកឃើញហានិភ័យខ្សែផ្គត់ផ្គង់៖**
- **ការត្រួតពិនិត្យសុខភាពការពឹងផ្អែក**៖ វាយតម្លៃជាបន្តលើគ្រប់ការពឹងផ្អែកសម្រាប់បញ្ហាសុវត្ថិភាព
- **ការរួមបញ្ចូលព័ត៌មានហានិភ័យ**៖ ផ្តល់ព័ត៌មានបច្ចុប្បន្នលើហានិភ័យខ្សែផ្គត់ផ្គង់កំពុងកើតឡើង
- **វិភាគអាកប្បកិរិយា**៖ រកឃើញអាកប្បកិរិយាពិសេសនៅក្នុងធាតុខាងក្រៅ
- **ការឆ្លើយតបស្វ័យប្រវត្តិ**៖ សំលាប់និងកំណត់កំណត់នូវធាតុដែលរងគ្រោះភ្លាមៗ

## 8. **ការត្រួតពិនិត្យ និងការរកឃើញ**

**ហានិភ័យ OWASP MCP ដែលបានដោះស្រាយ**៖ [MCP08 - ការខ្វះខាត Audit និង Telemetry](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **ការគ្រប់គ្រងព័ត៌មានសុវត្ថិភាព និងព្រឹត្តិការណ៍ (SIEM)**

**យុទ្ធសាស្ត្រកំណត់ហេតុទូលំទូលាយ៖**
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

### **ការរកឃើញហានិភ័យពេលវេលាពិតប្រាកដ**

**វិភាគអាកប្បកិរិយា៖**
- **UBA (User Behavior Analytics)**៖ រកឃើញលំនាំចូលរបស់អ្នកប្រើ ពុំធម្មតា
- **EBA (Entity Behavior Analytics)**៖ ត្រួតពិនិត្យលក្ខណៈរបស់ MCP server និងឧបករណ៍
- **ការរកឃើញវិវឌ្ឍយ៉ាងចម្លែកដោយម៉ាស៊ីនរៀន**៖ ការទទួលដឹងសហគ្រិនអំពីហានិភ័យសុវត្ថិភាព
- **ការតភ្ជាប់ព័ត៌មានហានិភ័យ**៖ ផ្គូផ្គងសកម្មភាពដែលបានសង្កេតជាមួយលំនាំវាយប្រហារដែលបានស្គាល់

## 9. **ការឆ្លើយតប និងការចងចាំករណីហួសហេតុ**

### **សមត្ថភាពការឆ្លើយតបស្វ័យប្រវត្តិ**

**សកម្មភាពឆ្លើយតបភ្លាមៗ៖**
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

### **សមត្ថភាពរបាយការណ៍បច្ចេកទេស**

**ការគាំទ្រស្រាវជ្រាវ៖**
- **ការរក្សាទុក Audit Trail**៖ កំណត់ហេតុថ្មងមិនអាចផ្លាស់ប្តូរជាមួយភាពទៀងទាត់គ្រឿងចក្រ
- **ការប្រមូលភស្តុតាង**៖ ប្រមូលឯកសារសុវត្ថិភាពដែលពាក់ព័ន្ធដោយស្វ័យប្រវត្តិ
- **ការតម្កល់ព្រឹត្តិការណ៍ក្នុងកាលវិភាគ**៖ លំដាប់ព្រឹត្តិការណ៍លម្អិតដែលនាំទៅករណីសុវត្ថិភាព
- **ការវាយតម្លៃផលប៉ះពាល់**៖ ការវាយតម្លៃចំនួនកម្រិតខូចខាត និងការចេញពីទិន្នន័យ

## **គោលការណ៍រចនាសម្ព័ន្ធសុវត្ថិភាពសំខាន់ៗ**

### **ការពារជាដើមលំដាប់**

- **ស្រទាប់សុវត្ថិភាពច្រើនជាន់**៖ មិនមានចំណុចបរាជ័យតែមួយក្នុងរចនាសម្ព័ន្ធសុវត្ថិភាព
- **ការគ្រប់គ្រងច្រើនដង**៖ វិធានការសុវត្ថិភាពដែលអាចបញ្ចូលគ្នាសម្រាប់មុខងារសំខាន់ៗ
- **មេកានីសមិនបរាជ័យ**៖ លំនាំសុវត្ថិភាពប្រើប្រាស់ជាកម្រិតដើមពេលប្រព័ន្ធប្រឈមមុខកំហុសឬការវាយប្រហារ

### **ការអនុវត្ត Zero Trust**

- **មិនយកចិត្តទុកដាក់ទេ ត្រូវផ្ទៀងផ្ទាត់ជានិរន្តរ**៖ ការផ្ទៀងផ្ទាត់តួអង្គ និងសំណើទាំងអស់ជាប់ជាប្រចាំ
- **គោលការណ៍សិទ្ធិតិចបំផុត**៖ សិទ្ធិចូលប្រើអប្បបរមាសម្រាប់គ្រប់ធាតុ
- **Micro-Segmentation**៖ ការត្រួតពិនិត្យបណ្តាញ និងការចូលប្រើកម្រិតប្រង្ដិត

### **ការវិវឌ្ឍសុវត្ថិភាពជាប់ជាប្រចាំ**

- **ការផ្លាស់ប្ដូរផ្នត់គំនិតហានិភ័យ**៖ បច្ចុប្បន្នភាពជាប្រចាំដើម្បីដោះស្រាយហានិភ័យកំពុងកើតឡើង
- **ប្រសិទ្ធភាពការត្រួតពិនិត្យសុវត្ថិភាព**៖ ការវាយតម្លៃ និងការកែលម្អក្រមសុវត្ថិភាពបន្ត
- **ការអនុលោមទៅតាមស្តង់ដារ**៖ ធៀបតាមស្តង់ដារសុវត្ថិភាព MCP ដែលកំពុងកែប្រែ

---

## **ធនធានអនុវត្ត**

### **ឯកសារផ្លូវការរបស់ MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **ធនធានសុវត្ថិភាព OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - ស៊ុមលម្អិត OWASP MCP Top 10 ជាមួយការអនុវត្ត Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - ហានិភ័យសុវត្ថិភាព OWASP MCP ផ្លូវការ
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - បណ្តុះបណ្តាលសុវត្ថិភាពអនុវត្ត MCP នៅ Azure

### **ដំណោះស្រាយសុវត្ថិភាព Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **ស្តង់ដារ សុវត្ថិភាព**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **សំខាន់**៖ ការត្រួតពិនិត្យសុវត្ថិភាពទាំងនេះបញ្ចាំងដល់គំរូ MCP បច្ចុប្បន្ន (2025-11-25)។ សូមប្រាកដថាតវ៉ាតាមឯកសារផ្លូវការថ្មីៗ [official documentation](https://spec.modelcontextprotocol.io/) ពីព្រោះស្តង់ដារបន្តប្រសើរឡើងយ៉ាងរហ័ស។

## តើអ្វីជាដំណាក់កាលបន្ទាប់

- ត្រឡប់ទៅ៖ [Security Module Overview](./README.md)
- បន្តទៅ៖ [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->