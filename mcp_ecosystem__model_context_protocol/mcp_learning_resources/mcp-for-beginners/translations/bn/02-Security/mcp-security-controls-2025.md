# MCP সিকিউরিটি কন্ট্রোলস - ফেব্রুয়ারি ২০২৬ আপডেট

> **বর্তমান স্ট্যান্ডার্ড**: এই ডকুমেন্টটি [MCP স্পেসিফিকেশন ২০২৫-১১-২৫](https://spec.modelcontextprotocol.io/specification/2025-11-25/) এর সিকিউরিটি প্রয়োজনীয়তা এবং অফিসিয়াল [MCP সিকিউরিটি বেস্ট প্র্যাকটিসেস](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) প্রতিফলিত করে।

মডেল কনটেক্সট প্রোটোকল (MCP) উল্লেখযোগ্যভাবে উন্নত হয়েছে যা উন্নত সিকিউরিটি নিয়ন্ত্রণ নিয়ে এসেছে যা ঐতিহ্যবাহী সফটওয়্যার সিকিউরিটি এবং AI-নির্দিষ্ট হুমকি উভয়কেই মোকাবেলা করে। এই ডকুমেন্টটি নিরাপদ MCP বাস্তবায়নের জন্য বিস্তৃত সিকিউরিটি নিয়ন্ত্রণ প্রদান করে যা OWASP MCP Top 10 ফ্রেমওয়ার্কের সাথে সামঞ্জস্যপূর্ণ।

## 🏔️ হাতে-কলমে সিকিউরিটি প্রশিক্ষণ

প্রায়োগিক, হাতে-কলমে সিকিউরিটি বাস্তবায়ন অভিজ্ঞতার জন্য, আমরা সুপারিশ করি **[MCP সিকিউরিটি সামিট ওয়ার্কশপ (শেরপা)](https://azure-samples.github.io/sherpa/)** - একটি বিস্তৃত নির্দেশিত অভিযান যা Azure-তে MCP সার্ভার সুরক্ষিত করতে "ভুল প্রবণ → এক্সপ্লয়েট → ঠিক → যাচাই" পদ্ধতি ব্যবহার করে।

এই ডকুমেন্টের সমস্ত সিকিউরিটি নিয়ন্ত্রণ **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** এর সাথে মিল রয়েছে, যা OWASP MCP Top 10 ঝুঁকির জন্য রেফারেন্স আর্কিটেকচার এবং Azure-নির্দিষ্ট বাস্তবায়ন নির্দেশিকা প্রদান করে।

## **আবাস্যক সিকিউরিটি প্রয়োজনীয়তা**

### **MCP স্পেসিফিকেশন থেকে গুরুত্বপূর্ণ নিষেধাজ্ঞাগুলি:**

> **নিষিদ্ধ**: MCP সার্ভার **কেউই** টোকেন গ্রহণ করতে পারবে না যা স্পষ্টভাবে MCP সার্ভারের জন্য ইস্যু করা হয়নি  
>
> **নিষিদ্ধ**: MCP সার্ভার **কখনো** সেশন ব্যবহার করে প্রমাণীকরণ করতে পারবে না  
>
> **প্রয়োজনীয়**: MCP সার্ভার অনুমোদন বাস্তবায়ন করলে **সকল** আগত অনুরোধ যাচাই করতে হবে  
>
> **আবাস্যক**: MCP প্রক্সি সার্ভার যারা স্থির ক্লায়েন্ট আইডি ব্যবহার করে তারা প্রতিটি গতিশীলভাবে নিবন্ধিত ক্লায়েন্টের জন্য ব্যবহারকারীর সম্মতি নিতে হবে

---

## 1. **প্রমাণীকরণ এবং অনুমোদন নিয়ন্ত্রণ**

### **বহিরাগত পরিচয় প্রদানকারী সংহতি**

**বর্তমান MCP স্ট্যান্ডার্ড (২০২৫-১১-২৫)** MCP সার্ভারকে বহিরাগত পরিচয় প্রদানকারীদের কাছে প্রমাণীকরণ ডেলিগেট করার অনুমতি দেয়, যা একটি উল্লেখযোগ্য সিকিউরিটি উন্নয়ন:

**OWASP MCP ঝুঁকি মোকাবেলা**: [MCP07 - অপর্যাপ্ত প্রমাণীকরণ ও অনুমোদন](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**সিকিউরিটি সুবিধাসমূহ:**
1. **কাস্টম প্রমাণীকরণ ঝুঁকি দূরীকরণ**: কাস্টম প্রমাণীকরণ বাস্তবায়নের ঝুঁকি কমায়  
2. **এন্টারপ্রাইজ-গ্রেড সিকিউরিটি**: Microsoft Entra ID-এর মতো প্রতিষ্ঠিত পরিচয় প্রদানকারীদের সুরক্ষামূলক বৈশিষ্ট্য ব্যবহার করে  
3. **মধ্যস্থ পরিচয় ব্যবস্থাপনা**: ইউজার লাইফসাইকেল ম্যানেজমেন্ট, অ্যাক্সেস নিয়ন্ত্রণ এবং কমপ্লায়েন্স অডিটিং সহজ করে  
4. **মাল্টি-ফ্যাক্টর প্রমাণীকরণ**: এন্টারপ্রাইজ পরিচয় প্রদানকারীদের MFA ক্ষমতা গ্রহণ করে  
5. **শর্তসাপেক্ষ অ্যাক্সেস নীতি**: ঝুঁকি-ভিত্তিক অ্যাক্সেস নিয়ন্ত্রণ এবং অভিযোজিত প্রমাণীকরণের সুবিধা পায়

**বাস্তবায়ন প্রয়োজনীয়তা:**
- **টোকেন শ্রোতা যাচাই**: নিশ্চিত করুন সব টোকেন স্পষ্টভাবে MCP সার্ভারের জন্য ইস্যু করা হয়েছে  
- **ইস্যুকারীর যাচাই**: টোকেন ইস্যুকারী প্রত্যাশিত পরিচয় প্রদানকারীর সঙ্গে মেলে কিনা যাচাই করুন  
- **সিগনেচার যাচাই**: টোকেনের অখণ্ডতার ক্রিপ্টোগ্রাফিক যাচাই  
- **মেয়াদ উত্তীর্ণ প্রয়োগ**: টোকেনের সময়সীমা কঠোরভাবে প্রয়োগ করুন  
- **স্কোপ যাচাই**: নিশ্চিত করুন টোকেনে অনুরোধকৃত অপারেশনের জন্য উপযুক্ত অনুমতিসমূহ রয়েছে

### **অনুমোদন লজিক সিকিউরিটি**

**গুরুত্বপূর্ণ নিয়ন্ত্রণ:**
- **ব্যাপক অনুমোদন অডিট**: সমস্ত অনুমোদন সিদ্ধান্তের পয়েন্টের নিয়মিত সিকিউরিটি পর্যালোচনা  
- **ফেইল-সেফ ডিফল্ট**: যখন অনুমোদন লজিক সিদ্ধান্ত নিতে পারে না তখন অ্যাক্সেস অস্বীকার করা  
- **অনুমতির সীমানা**: বিভিন্ন বিশেষাধিকার স্তর ও সম্পদ অ্যাক্সেসের মধ্যে স্পষ্ট পৃথকতা  
- **অডিট লগিং**: সিকিউরিটি পর্যবেক্ষণের জন্য অনুমোদন সিদ্ধান্তের সম্পূর্ণ লগিং  
- **নিয়মিত অ্যাক্সেস পর্যালোচনা**: ইউজার অনুমতি ও বিশেষাধিকার নিয়মিত যাচাই

## 2. **টোকেন সিকিউরিটি ও অ্যান্টি-পাসথ্রু নিয়ন্ত্রণ**

**OWASP MCP ঝুঁকি মোকাবেলা**: [MCP01 - টোকেন ভুল ব্যবস্থাপনা ও গোপন তথ্য ফাঁস](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **টোকেন পাসথ্রু প্রতিরোধ**

**টোকেন পাসথ্রু স্পষ্টভাবে নিষিদ্ধ** MCP অনুমোদন স্পেসিফিকেশনে কারণ গুরুত্বপূর্ণ সিকিউরিটি ঝুঁকির জন্য:

**মোকাবেলা করা সিকিউরিটি ঝুঁকি:**
- **নিয়ন্ত্রণ এড়ানো**: রেট লিমিটিং, অনুরোধ যাচাই এবং ট্রাফিক মনিটরিংয়ের মতো অপরিহার্য সিকিউরিটি নিয়ন্ত্রণ এড়ানো হয়  
- **জবাবদিহিতা বিঘ্ন**: ক্লায়েন্ট সনাক্ত করাকে অসম্ভব করে, অডিট ট্রেইল এবং ঘটনা তদন্ত নষ্ট করে  
- **প্রক্সি-ভিত্তিক তথ্যচুরি**: অবৈধ তথ্য অ্যাক্সেসের জন্য সার্ভারকে প্রক্সি হিসেবে ব্যবহার করার সুযোগ দেয়  
- **ট্রাস্ট সীমা লঙ্ঘন**: টোকেন উৎস সম্পর্কে নিম্নস্তরের সেবার বিশ্বাস ক্ষুণ্ন হয়  
- **পাশাপাশি ঝড়া**: একাধিক সেবায় ক্ষতিগ্রস্ত টোকেন ব্যবহার করে বৃহত্তর আক্রমণ বিস্তার সক্ষম করে

**বাস্তবায়ন নিয়ন্ত্রণ:**  
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
  
### **নিরাপদ টোকেন ব্যবস্থাপনা প্যাটার্নস**

**সেরা প্র্যাকটিস:**
- **সংক্ষিপ্ত মেয়াদী টোকেন**: ঘন ঘন টোকেন রোটেশনের মাধ্যমে প্রকাশের সময় সীমিত করুন  
- **প্রযোজ্য সময়ে ইস্যু**: নির্দিষ্ট অপারেশন জন্য প্রয়োজন হওয়ার সময় টোকেন ইস্যু করুন  
- **নিরাপদ সঞ্চয়**: হার্ডওয়্যার সিকিউরিটি মডিউল (HSM) বা নিরাপদ কী ভল্ট ব্যবহার করুন  
- **টোকেন বাউন্ডিং**: সম্ভব হলে টোকেন নির্দিষ্ট ক্লায়েন্ট, সেশন বা অপারেশনের সাথে বেঁধে দিন  
- **মনিটরিং ও সতর্কীকরণ**: টোকেনের অপব্যবহার বা অবৈধ অ্যাক্সেস প্যাটার্নের বাস্তব সময় সনাক্তকরণ

## 3. **সেশন সিকিউরিটি নিয়ন্ত্রণ**

### **সেশন হাইজ্যাকিং প্রতিরোধ**

**আক্রমণ পয়েন্টসমূহ:**
- **সেশন হাইজ্যাক প্রম্পট ইনজেকশন**: শেয়ার করা সেশন রাজ্যে ক্ষতিকর ইভেন্ট ইনজেকশন  
- **সেশন নকলকরণ**: চুরি করা সেশন আইডি দিয়ে অবৈধ প্রমাণীকরণ বাইকাস  
- **রিসুমেবল স্ট্রিম আক্রমণ**: সার্ভার-সেন্ট ইভেন্ট রিসাম্পশনের মাধ্যমে ক্ষতিকর কনটেন্ট ইনজেকশন

**আবাস্যক সেশন নিয়ন্ত্রণ:**  
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
  
**পরিবহন সুরক্ষা:**
- **HTTPS প্রয়োগ**: সকল সেশন যোগাযোগ TLS 1.3-এর মাধ্যমে  
- **নিরাপদ কুকি অ্যাট্রিবিউটস**: HttpOnly, Secure, SameSite=Strict  
- **সার্টিফিকেট পিনিং**: MITM আক্রমণ প্রতিরোধে গুরুত্বপূর্ণ সংযোগের জন্য

### **স্টেটফুল বনাম Stateless বিবেচনা**

**স্টেটফুল বাস্তবায়নের জন্য:**
- শেয়ারকৃত সেশন রাজ্যের জন্য ইনজেকশন আক্রমণের অতিরিক্ত সুরক্ষা দরকার  
- কিউ-ভিত্তিক সেশন ব্যবস্থাপনায় অখণ্ডতা যাচাই প্রয়োজন  
- একাধিক সার্ভার ইনস্ট্যান্সের জন্য সুরক্ষিত সেশন রাজ্য সিঙ্ক্রনাইজেশন প্রয়োজন

**Stateless বাস্তবায়নের জন্য:**
- JWT বা অনুরূপ টোকেন-ভিত্তিক সেশন ব্যবস্থাপনা  
- সেশন রাজ্যের ক্রিপ্টোগ্রাফিক ভেরিফিকেশন  
- আক্রমণ পৃষ্ঠ কম কিন্তু শক্তিশালী টোকেন যাচাই প্রয়োজন

## 4. **AI-নির্দিষ্ট সিকিউরিটি নিয়ন্ত্রণ**

**OWASP MCP ঝুঁকি মোকাবেলা**:
- [MCP06 - ইন্টেন্ট ফ্লো সাবভার্শন](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - টুল পয়জনিং](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - কমান্ড ইনজেকশন ও এক্সিকিউশন](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **প্রম্পট ইনজেকশন প্রতিরক্ষা**

**Microsoft Prompt Shields সংহতি:**  
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
  
**বাস্তবায়ন নিয়ন্ত্রণ:**
- **ইনপুট স্যানিটাইজেশন**: সকল ইউজার ইনপুটের ব্যাপক যাচাই ও ফিল্টারিং  
- **কন্টেন্ট সীমা নির্ধারণ**: সিস্টেম ইনস্ট্রাকশন এবং ব্যবহারকারীর কন্টেন্টের মধ্যে স্পষ্ট পৃথকতা  
- **ইনস্ট্রাকশন শ্রেণিবিন্যাস**: বিরোধী ইনস্ট্রাকশনের জন্য যথাযথ অগ্রাধিকার নিয়ম  
- **আউটপুট মনিটরিং**: সম্ভাব্য ক্ষতিকর বা পরিবর্তিত আউটপুট সনাক্তকরণ

### **টুল পয়জনিং প্রতিরোধ**

**টুল সিকিউরিটি ফ্রেমওয়ার্ক:**  
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
  
**ডায়নামিক টুল ব্যবস্থাপনা:**
- **অনুমোদন ওয়ার্কফ্লো**: টুল পরিবর্তনের জন্য স্পষ্ট ব্যবহারকারী সম্মতি  
- **রোলব্যাক সক্ষমতা**: পূর্ববর্তী টুল সংস্করণগুলোতে ফিরে যাওয়ার ক্ষমতা  
- **পরিবর্তন অডিটিং**: টুল সংজ্ঞার পরিবর্তনের সম্পূর্ণ ইতিহাস  
- **ঝুঁকি মূল্যায়ন**: টুল সিকিউরিটি অবস্থার স্বয়ংক্রিয় মূল্যায়ন

## 5. **কনফিউজড ডেপুটি আক্রমণ প্রতিরোধ**

### **OAuth প্রক্সি সিকিউরিটি**

**আক্রমণ প্রতিরোধ নিয়ন্ত্রণ:**  
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
  
**বাস্তবায়ন প্রয়োজনীয়তা:**
- **ব্যবহারকারীর সম্মতি যাচাই**: গতিশীল ক্লায়েন্ট নিবন্ধনের জন্য কখনো সম্মতি স্ক্রীন এড়ানো যাবে না  
- **রিডাইরেক্ট URI যাচাই**: রিডাইরেক্ট গন্তব্যের কঠোর হোয়াইটলিস্ট-ভিত্তিক যাচাই  
- **অনুমোদন কোড সুরক্ষা**: সংক্ষিপ্ত-মেয়াদী কোডের একক ব্যবহার বাধ্যতামূলক  
- **ক্লায়েন্ট পরিচয় যাচাই**: ক্লায়েন্ট শংসাপত্র ও মেটাডেটার শক্তিশালী যাচাই

## 6. **টুল এক্সিকিউশন সিকিউরিটি**

### **স্যান্ডবক্সিং ও আইসোলেশন**

**কন্টেইনার-ভিত্তিক আইসোলেশন:**  
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
  
**প্রসেস আইসোলেশন:**
- **বিভক্ত প্রসেস কনটেক্সট**: প্রত্যেক টুল এক্সিকিউশন আলাদা প্রসেস স্পেসে  
- **ইন্টার-প্রসেস কমিউনিকেশন**: যাচাইকৃত নিরাপদ IPC পদ্ধতি  
- **প্রসেস মনিটরিং**: রানটাইম আচরণ বিশ্লেষণ ও অস্বাভাবিকতা শনাক্তকরণ  
- **সংস্থান বিধি**: CPU, মেমোরি, ও I/O অপারেশনের জন্য কঠোর সীমা প্রয়োগ

### **কম বিশেষাধিকার বাস্তবায়ন**

**অনুমতির ব্যবস্থাপনা:**  
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
  
## 7. **সরবরাহ চেইন সিকিউরিটি নিয়ন্ত্রণ**

**OWASP MCP ঝুঁকি মোকাবেলা**: [MCP04 - সফটওয়্যার সরবরাহ চেইন আক্রমণ ও নির্ভরতা ছিনতাই](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **নির্ভরতা যাচাই**

**ব্যাপক উপাদান সিকিউরিটি:**  
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
  
### **নিরবিচ্ছিন্ন মনিটরিং**

**সরবরাহ চেইন হুমকি সনাক্তকরণ:**
- **নির্ভরতার স্বাস্থ্য পর্যবেক্ষণ**: সিকিউরিটি সমস্যা সম্পর্কিত সমস্ত নির্ভরতার চলমান মূল্যায়ন  
- **হুমকি বুদ্ধিমত্তা সংহতি**: উদীয়মান সরবরাহ চেইনের হুমতির বাস্তব সময় আপডেট  
- **আচরণ বিশ্লেষণ**: বহিঃস্থ উপাদানে অস্বাভাবিক আচরণের সনাক্তকরণ  
- **স্বয়ংক্রিয় প্রতিক্রিয়া**: ক্ষতিগ্রস্ত উপাদান অবিলম্বে সীমাবদ্ধকরণ

## 8. **মনিটরিং ও সনাক্তকরণ নিয়ন্ত্রণ**

**OWASP MCP ঝুঁকি মোকাবেলা**: [MCP08 - অডিট এবং টেলিমেট্রি অভাব](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **সিকিউরিটি তথ্য ও ইভেন্ট ম্যানেজমেন্ট (SIEM)**

**ব্যাপক লগিং কৌশল:**  
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
  
### **বাস্তব-সময় হুমকি সনাক্তকরণ**

**আচরণ বিশ্লেষণ:**
- **ব্যবহারকারী আচরণ বিশ্লেষণ (UBA)**: অস্বাভাবিক ব্যবহারকারী অ্যাক্সেস প্যাটার্ন সনাক্তকরণ  
- **সত্তা আচরণ বিশ্লেষণ (EBA)**: MCP সার্ভার ও টুল আচরণের পর্যবেক্ষণ  
- **মেশিন লার্নিং অ্যানোমালি সনাক্তকরণ**: AI-চালিত সিকিউরিটি হুমমিক সনাক্তকরণ  
- **হুমকি বুদ্ধিমত্তা সংশ্লেষণ**: পরিচিত আক্রমণ প্যাটার্নের বিরুদ্ধে পর্যবেক্ষিত কার্যকলাপ মানানসই করা

## 9. **ঘটনা প্রতিক্রিয়া ও পুনরুদ্ধার**

### **স্বয়ংক্রিয় প্রতিক্রিয়া সক্ষমতা**

**তাত্ক্ষণিক প্রতিক্রিয়া পদক্ষেপ:**  
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
  
### **ফরেনসিক সক্ষমতা**

**তদন্ত সহায়তা:**
- **অডিট ট্রেইল সংরক্ষণ**: অপরিবর্তনীয় লগিং ক্রিপ্টোগ্রাফিক অখণ্ডতার সাথে  
- **প্রমাণ সংগ্রহ**: প্রাসঙ্গিক সিকিউরিটি আর্টিফ্যাক্ট স্বয়ংক্রিয় সংগ্রহ  
- **টাইমলাইন পুনর্গঠন**: সিকিউরিটি ঘটনার বিস্তারিত ক্রম  
- **প্রভাব মূল্যায়ন**: আপস ঘটার পরিসর ও তথ্য ফাঁসের মূল্যায়ন

## **মূল সিকিউরিটি স্থাপত্য নীতিসমূহ**

### **গভীর প্রতিরক্ষা**  
- **একাধিক সিকিউরিটি স্তর**: সিকিউরিটি স্থাপত্যে কোনো একক ব্যর্থতা বিন্দু নেই  
- **বহুমূলক নিয়ন্ত্রণ**: গুরুত্বপূর্ণ কার্যাবলী জন্য ওভারল্যাপিং নিরাপত্তা ব্যবস্থা  
- **ফেইল-সেফ প্রক্রিয়া**: সিস্টেম ত্রুটি বা আক্রমণ সনাক্ত হলে নিরাপদ ডিফল্ট

### **জিরো ট্রাস্ট বাস্তবায়ন**  
- **কখনো বিশ্বাস করবেন না, নিয়মিত যাচাই করুন**: সমস্ত সত্তা ও অনুরোধের অবিচ্ছিন্ন যাচাই  
- **কম বিশেষাধিকার নীতি**: সমস্ত উপাদানের জন্য সর্বনিম্ন এক্সেস অধিকার  
- **মাইক্রো-সেগমেন্টেশন**: বিস্তারিত নেটওয়ার্ক ও অ্যাক্সেস নিয়ন্ত্রণ

### **নিরবিচ্ছিন্ন সিকিউরিটি বিকাশ**  
- **হুমকি দৃশ্যপটের সাথে খাপ খাওয়ানো**: উদীয়মান হুমকির জন্য নিয়মিত আপডেট  
- **সিকিউরিটি নিয়ন্ত্রণ কার্যকারিতা**: নিয়মিত মূল্যায়ন এবং উন্নতি  
- **স্পেসিফিকেশন সম্মতি**: বিকাশমান MCP সিকিউরিটি স্ট্যান্ডার্ডের সাথে সমন্বয়

---

## **বাস্তবায়ন সম্পদ**

### **অফিসিয়াল MCP ডকুমেন্টেশন**
- [MCP স্পেসিফিকেশন (২০২৫-১১-২৫)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP সিকিউরিটি বেস্ট প্র্যাকটিসেস](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP অনুমোদন স্পেসিফিকেশন](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP সিকিউরিটি সম্পদ**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 সহ Azure বাস্তবায়ন
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - অফিসিয়াল OWASP MCP সিকিউরিটি ঝুঁকি  
- [MCP সিকিউরিটি সামিট ওয়ার্কশপ (শেরপা)](https://azure-samples.github.io/sherpa/) - Azure-তে MCP এর জন্য হাতে-কলমে সিকিউরিটি প্রশিক্ষণ

### **Microsoft সিকিউরিটি সলিউশন**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub অ্যাডভান্সড সিকিউরিটি](https://github.com/security/advanced-security)
- [Azure কী ভল্ট](https://learn.microsoft.com/azure/key-vault/)

### **সিকিউরিটি স্ট্যান্ডার্ড**
- [OAuth 2.0 সিকিউরিটি বেস্ট প্র্যাকটিস (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [বড় ল্যাঙ্গুয়েজ মডেলের জন্য OWASP টপ ১০](https://genai.owasp.org/)
- [NIST সাইবারসিকিউরিটি ফ্রেমওয়ার্ক](https://www.nist.gov/cyberframework)

---

> **গুরুত্বপূর্ণ**: এই সিকিউরিটি নিয়ন্ত্রণগুলি বর্তমান MCP স্পেসিফিকেশন (২০২৫-১১-২৫) প্রতিফলিত করে। সর্বদা সর্বশেষ [অফিসিয়াল ডকুমেন্টেশন](https://spec.modelcontextprotocol.io/) এর বিরুদ্ধে যাচাই করুন কারণ স্ট্যান্ডার্ড দ্রুত বিকাশমান।

## পরবর্তী করণীয়

- ফিরে যান: [সিকিউরিটি মডিউল ওভারভিউ](./README.md)
- চালিয়ে যান: [মডিউল ৩: শুরু করা](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->