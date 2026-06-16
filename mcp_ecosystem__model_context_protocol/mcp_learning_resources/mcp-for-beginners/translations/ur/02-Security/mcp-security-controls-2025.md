# MCP سیکیورٹی کنٹرولز - فروری 2026 اپ ڈیٹ

> **موجودہ معیاری**: یہ دستاویز [MCP وضاحت 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) کی حفاظتی ضروریات اور سرکاری [MCP سیکیورٹی بہترین طریقہ کار](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) کی عکاسی کرتی ہے۔

ماڈل کانٹیکسٹ پروٹوکول (MCP) نے روایتی سافٹ ویئر سیکیورٹی اور AI مخصوص خطرات دونوں کو حل کرنے والے بہتر سیکیورٹی کنٹرولز کے ساتھ نمایاں ترقی کی ہے۔ یہ دستاویز MCP کی محفوظ نفاذ کے لیے جامع سیکیورٹی کنٹرولز فراہم کرتی ہے جو OWASP MCP ٹاپ 10 فریم ورک کے مطابق ہیں۔

## 🏔️ عملی سیکیورٹی تربیت

عملی سیکیورٹی نفاذ کے تجربے کے لیے، ہم سفارش کرتے ہیں کہ **[MCP سیکیورٹی سمٹ ورکشاپ (شرپا)](https://azure-samples.github.io/sherpa/)** میں شرکت کی جائے — ایک جامع رہنمائی کے ساتھ MCP سرورز کو Azure میں "کمزور → استحصال → اصلاح → توثیق" طریقہ کار کے ذریعے محفوظ بنانے کے لیے۔

اس دستاویز کے تمام سیکیورٹی کنٹرولز **[OWASP MCP Azure سیکیورٹی گائیڈ](https://microsoft.github.io/mcp-azure-security-guide/)** کے ساتھ ہم آہنگ ہیں، جو OWASP MCP ٹاپ 10 خطرات کے لیے حوالہ جاتی معماری اور Azure مخصوص نفاذ کی رہنمائی فراہم کرتی ہے۔

## **لازمی سیکیورٹی ضروریات**

### **MCP وضاحت سے اہم ممانعتیں:**

> **ممنوع**: MCP سرورز **کبھی نہیں** کسی ایسے ٹوکنز کو قبول کریں گے جو واضح طور پر MCP سرور کے لیے جاری نہیں کیے گئے ہیں  
>
> **منع شدہ**: MCP سرورز **سیشنز کو** تصدیق کے لیے استعمال نہیں کریں گے  
>
> **ضروری**: MCP سرورز جو اجازت کاری کو نافذ کرتے ہیں **تمام داخل ہونے والی درخواستوں کی تصدیق کریں گے**  
>
> **لازمی**: MCP پراکسی سرورز جو جامد کلائنٹ آئی ڈیز استعمال کرتے ہیں **ہر متحرک رجسٹر شدہ کلائنٹ کے لیے صارف کی رضامندی حاصل کریں گے**

---

## 1. **تصدیق اور اجازت کاری کنٹرولز**

### **بیرونی شناخت فراہم کنندہ انضمام**

**موجودہ MCP معیاری (2025-11-25)** MCP سرورز کو اجازت دیتا ہے کہ وہ تصدیق کی ذمہ داری بیرونی شناخت فراہم کنندگان کو سونپیں، جو سیکیورٹی میں ایک اہم بہتری ہے:

**OWASP MCP خطرہ حل شدہ**: [MCP07 - ناکافی تصدیق اور اجازت کاری](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**سیکیورٹی فوائد:**
1. **کسٹم تصدیق کے خطرات ختم کرنا**: کسٹم تصدیق کے نفاذ سے پیدا ہونے والی کمزوریوں کو کم کرنا  
2. **ادارہ جاتی معیار کی حفاظت**: مائیکروسافٹ انٹرا ID جیسے معروف شناخت فراہم کنندگان کے ذریعے اعلی حفاظتی خصوصیات  
3. **مرکوز شناختی انتظام**: صارف کی زندگی کے دورانیے کا انتظام، رسائی کنٹرول، اور تعمیل کی جانچ میں آسانی  
4. **کثیرالعوامل تصدیق**: ادارہ جاتی شناخت فراہم کنندگان سے MFA کی صلاحیتیں حاصل کرنا  
5. **مشروط رسائی پالیسیاں**: خطرے کی بنیاد پر رسائی کنٹرولز اور موافقت پذیر تصدیق کا فائدہ اٹھانا

**نفاذ کی ضروریات:**
- **ٹوکن آڈینس کی تصدیق**: تمام ٹوکنز کی جانچ کریں کہ وہ واضح طور پر MCP سرور کے لیے جاری کیے گئے ہوں  
- **جاری کنندہ کی تصدیق**: ٹوکن جاری کرنے والے کی تصدیق کریں کہ وہ متوقع شناخت فراہم کنندہ سے ہو  
- **دستخط کی تصدیق**: ٹوکن کی سالمیت کی کرپٹوگرافک تصدیق  
- **میعاد ختم ہونے کا نفاذ**: ٹوکن کی مدت کی سخت پابندی  
- **دائرہ کار کی تصدیق**: یقینی بنائیں کہ ٹوکن میں مطلوبہ کاروائیوں کے لیے مناسب اجازتیں شامل ہوں

### **اجازت کاری لاجک سیکیورٹی**

**اہم کنٹرولز:**
- **جامع اجازت کاری آڈٹ**: اجازت کاری کے تمام فیصلوں کا باقاعدہ حفاظتی جائزہ  
- **فیل سیف ڈیفالٹس**: جب اجازت کاری لاجک واضح فیصلہ نہ دے سکے تو رسائی مسترد کریں  
- **اجازت کی حدود**: مختلف مراعاتی سطحوں اور وسائل کی رسائی کے درمیان واضح تفریق  
- **آڈٹ لاگنگ**: تمام اجازت کاری کے فیصلوں کا مکمل ریکارڈ برائے سیکیورٹی نگرانی  
- **باقاعدہ رسائی جائزے**: صارف کی اجازتوں اور مراعات کی منظوری کی وقتاً فوقتاً تصدیق

## 2. **ٹوکن سیکیورٹی اور اینٹی پاس تھرو کنٹرولز**

**OWASP MCP خطرہ حل شدہ**: [MCP01 - ٹوکن کی غلط انتظام کاری اور راز کا انکشاف](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **ٹوکن پاس تھرو کی روک تھام**

**ٹوکن پاس تھرو MCP اجازت کاری وضاحت میں واضح طور پر منع ہے** کیونکہ اس سے اہم سیکیورٹی خطرات جنم لیتے ہیں:

**حفاظتی خطرات:**
- **کنٹرول کی مڑنے سے بچاؤ**: ریٹ لمٹنگ، درخواست کی تصدیق، اور ٹریفک کی نگرانی جیسے ضروری سیکیورٹی کنٹرولز کو بائی پاس کرنا  
- **جوابدہی کی خرابی**: کلائنٹ کی شناخت ناممکن بنا دیتا ہے، آڈٹ ٹریل اور واقعہ کی تحقیقات کو نقصان پہنچانا  
- **پراکسی کی بنیاد پر ڈیٹا نکالنا**: بدنیت عناصر کو غیر مجاز ڈیٹا تک رسائی کے لیے سرورز کو پراکسی کی طرح استعمال کرنے کی اجازت دینا  
- **اعتماد کی حدوں کی خلاف ورزی**: نیچے والے سروسز کے لیے ٹوکن کے ماخذ کے بارے میں اعتماد بھنگ کرنا  
- **افقی حرکت**: متعدد سروسز میں متاثرہ ٹوکن کے ذریعے حملے کی حد کو بڑھانا

**نفاذ کنٹرولز:**
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

### **محفوظ ٹوکن مینجمنٹ کے طریقے**

**بہترین طریقہ کار:**
- **مختصر مدت کے ٹوکن**: بار بار ٹوکن کی تبدیلی سے ایکسپوژر ونڈو کو کم کریں  
- **ضرورت کے وقت اجرا**: خاص آپریشنز کے لیے صرف جب ضرورت ہو تب ٹوکن جاری کریں  
- **محفوظ ذخیرہ**: ہارڈویئر سیکیورٹی ماڈیولز (HSMs) یا محفوظ کی والٹس کا استعمال  
- **ٹوکن بائنڈنگ**: ممکن ہو تو ٹوکن کو مخصوص کلائنٹس، سیشنز، یا آپریشنز کے ساتھ باندھیں  
- **نگرانی اور الرٹنگ**: ٹوکن کے غلط استعمال یا غیر مجاز رسائی کے نمونوں کا حقیقی وقت میں پتہ لگانا

## 3. **سیشن سیکیورٹی کنٹرولز**

### **سیشن ہائی جیکنگ کی روک تھام**

**حملے کے راستے حل شدہ:**
- **سیشن ہائی جیک پرامپٹ انجیکشن**: مشترکہ سیشن اسٹیٹ میں بدنیت کے ایونٹس شامل کرنا  
- **سیشن کی ذمہ داری چوری**: چرائے گئے سیشن آئی ڈیز کا غیر مجاز استعمال کر کے تصدیق کو بائی پاس کرنا  
- **ریزیوم ایبل اسٹریم حملے**: سرور سینٹ ایونٹ ریزیومپشن کا استحصال کرکے بدنیتی پر مبنی مواد کی انجیکشن

**لازمی سیشن کنٹرولز:**
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

**ٹرانسپورٹ سیکیورٹی:**
- **HTTPS کا نفاذ**: تمام سیشن کا مواصلات TLS 1.3 کے ذریعے  
- **محفوظ کوکی خصوصیات**: HttpOnly, Secure, SameSite=Strict  
- **سرٹیفکیٹ پننگ**: MITM حملوں سے بچاؤ کے لیے اہم کنکشنز کے لیے  

### **ریاست دار بمقابلہ بے ریاست غور و فکر**

**ریاست دار نفاذ کے لیے:**
- مشترکہ سیشن اسٹیٹ کو انجیکشن حملوں سے اضافی تحفظ کی ضرورت  
- قطار پر مبنی سیشن انتظامیہ کی سالمیت کی تصدیق ضروری  
- متعدد سرور انسٹینسز کو محفوظ سیشن اسٹیٹ ہم آہنگی کی ضرورت

**بے ریاست نفاذ کے لیے:**
- JWT یا مشابہ ٹوکن پر مبنی سیشن انتظامیہ  
- سیشن اسٹیٹ کی سالمیت کی کرپٹوگرافک تصدیق  
- کم حملہ کی سطح مگر مضبوط ٹوکن کی جانچ ضروری

## 4. **AI مخصوص سیکیورٹی کنٹرولز**

**OWASP MCP خطرات حل شدہ**:
- [MCP06 - پرامپٹ فلو سبورژن](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - ٹول زہر آلودگی](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - کمانڈ انجیکشن اور اجرا](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **پرامپٹ انجیکشن دفاع**

**مائیکروسافٹ پرامپٹ شیلڈز کا انضمام:**
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

**نفاذ کنٹرولز:**
- **ان پٹ کی صفائی**: تمام صارف ان پٹ کی جامع جانچ اور فلٹرنگ  
- **مواد کی حد بندی کی تعریف**: نظام کی ہدایات اور صارف کے مواد کے درمیان واضح تفریق  
- **ہدایات کی ترتیب**: متصادم ہدایات کے لیے مناسب ترجیحی قوانین  
- **آؤٹ پٹ کی نگرانی**: ممکنہ نقصان دہ یا خراب شدہ آؤٹ پٹ کی شناخت

### **ٹول زہر آلودگی کی روک تھام**

**ٹول سیکیورٹی فریم ورک:**
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

**متحرک ٹول مینجمنٹ:**
- **منظوری کے ورک فلو**: ٹول میں تبدیلیوں کے لیے واضح صارف کی رضامندی  
- **واپس پلٹنے کی صلاحیت**: پچھلی ٹول ورژنز پر واپس جانے کی صلاحیت  
- **تبدیلی کی جانچ پڑتال**: ٹول کی تعریف میں تبدیلیوں کی مکمل تاریخ  
- **خطرہ کا جائزہ**: ٹول کی سیکیورٹی کی حالت کا خودکار تجزیہ

## 5. **کنفیوذ ڈیپٹی حملے کی روک تھام**

### **OAuth پراکسی سیکیورٹی**

**حملے کی روک تھام کنٹرولز:**
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

**نفاذ کی ضروریات:**
- **صارف کی رضامندی کی تصدیق**: متحرک کلائنٹ رجسٹریشن کے لیے رضامندی کے صفحات کبھی بھی نہ چھوڑیں  
- **ری ڈائریکٹ URI کی تصدیق**: ری ڈائریکٹ منزلوں کی سخت وائٹ لسٹ کی بنیاد پر تصدیق  
- **اجازت کوڈ کی حفاظت**: مختصر مدت کے کوڈز جن پر صرف ایک بار استعمال کی پابندی ہو  
- **کلائنٹ شناخت کی تصدیق**: کلائنٹ کی اسناد اور میٹا ڈیٹا کی مضبوط تصدیق

## 6. **ٹول اجرا سیکیورٹی**

### **سینڈ باکسنگ اور الگ تھلگ کرنا**

**کنٹینر پر مبنی الگ تھلگ کرنا:**
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

**عمل کے الگ تھلگ پن:**
- **مختلف عمل کے سیاق و سباق**: ہر ٹول کے اجرا کو الگ تھلگ عمل کے اسپیس میں رکھنا  
- **عمل کے مابین مواصلات**: جانچ پڑتال کے ساتھ محفوظ IPC میکانزم  
- **عمل کی نگرانی**: رن ٹائم رویے کا تجزیہ اور غیر معمولی واقعات کی شناخت  
- **وسائل کا نفاذ**: CPU، میموری، اور I/O آپریشنز پر سخت حدیں

### **کم از کم مراعات کا نفاذ**

**اجازت کا انتظام:**
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

## 7. **سپلائی چین سیکیورٹی کنٹرولز**

**OWASP MCP خطرہ حل شدہ**: [MCP04 - سافٹ ویئر سپلائی چین حملے اور انحصار میں چھیڑ چھاڑ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **انحصار کی تصدیق**

**جامع اجزاء کی سیکیورٹی:**
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

### **باقاعدہ نگرانی**

**سپلائی چین خطرے کی شناخت:**
- **انحصار کی صحت کی نگرانی**: تمام انحصار کی حفاظتی مسائل کے لیے مسلسل جانچ  
- **خطرہ استخباراتی انضمام**: ابھرتے ہوئے سپلائی چین خطرات کی حقیقی وقت اپ ڈیٹس  
- **رویے کا تجزیہ**: خارجی اجزاء میں غیر معمولی رویے کی شناخت  
- **خودکار ردعمل**: متاثرہ اجزاء کو فوری طور پر قابو پانا

## 8. **نگرانی اور شناخت کنٹرولز**

**OWASP MCP خطرہ حل شدہ**: [MCP08 - آڈٹ اور ٹیلیمیٹری کی کمی](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **سیکیورٹی معلومات اور ایونٹ مینجمنٹ (SIEM)**

**جامع لاگنگ حکمت عملی:**
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

### **حقیقی وقت خطرے کی شناخت**

**رویے کا تجزیہ:**
- **صارف رویہ کا تجزیہ (UBA)**: غیر معمولی صارف رسائی کے نمونوں کی شناخت  
- **اینیٹی رویہ کا تجزیہ (EBA)**: MCP سرور اور ٹول کے رویے کی نگرانی  
- **مشین لرننگ سے انومالی کی شناخت**: AI کی مدد سے سیکیورٹی خطرات کی شناخت  
- **خطرہ استخباراتی ہم آہنگی**: معلوم حملہ آور پیٹرنز کے خلاف مشاہدہ شدہ سرگرمیوں کی مطابقت

## 9. **واقعہ کا جواب اور بحالی**

### **خودکار ردعمل کی صلاحیتیں**

**فوری ردعمل کے اقدامات:**
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

### **فورینزک صلاحیتیں**

**تحقیقات کی معاونت:**
- **آڈٹ ٹریل کی حفاظت**: ناقابل تبدیلی لاگنگ کے ساتھ کرپٹوگرافک سالمیت  
- **ثبوت جمع کرنا**: متعلقہ سیکیورٹی شواہد کا خودکار جمع کرنا  
- **ٹائم لائن کی تعمیر نو**: سیکیورٹی واقعات کی تفصیلی ترتیب  
- **اثرات کا اندازہ**: سمجھوتے کے دائرہ اور ڈیٹا کے انکشاف کا جائزہ

## **اہم سیکیورٹی آرکیٹیکچر اصول**

### **گہرائی میں دفاع**
- **متعدد حفاظتی تہیں**: سیکیورٹی آرکیٹیکچر میں اکیلا نقطہ ناکامی نہیں  
- **متعدد کنٹرولز**: کلیدی افعال کے لیے متداخل حفاظتی اقدامات  
- **فیل سیف میکانزم**: جب نظام نقص یا حملے کا سامنا کرے تو محفوظ ڈیفالٹس

### **زیرو ٹرسٹ نفاذ**
- **کبھی بھروسہ نہ کریں، ہمیشہ تصدیق کریں**: تمام اکائیوں اور درخواستوں کی مسلسل تصدیق  
- **کم از کم مراعات کا اصول**: تمام اجزاء کے لیے محدود رسائی حقوق  
- **مائیکرو سیگمنٹیشن**: باریک نیٹ ورک اور رسائی کنٹرولز

### **مسلسل سیکیورٹی ارتقا**
- **خطرے کے منظر نامے کے مطابق تبدیلی**: ابھرتے ہوئے خطرات کے جواب میں باقاعدہ اپ ڈیٹس  
- **سیکیورٹی کنٹرول کی تاثیر**: کنٹرولز کی جاری جانچ اور بہتری  
- **وضاحت کی تعمیل**: ترقی پذیر MCP سیکیورٹی معیارات کے مطابق ہونا

---

## **نفاذ کے وسائل**

### **سرکاری MCP دستاویزات**
- [MCP وضاحت (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP سیکیورٹی بہترین طریقے](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP اجازت کاری وضاحت](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP سیکیورٹی وسائل**
- [OWASP MCP Azure سیکیورٹی گائیڈ](https://microsoft.github.io/mcp-azure-security-guide/) - مکمل OWASP MCP ٹاپ 10 کے ساتھ Azure نفاذ  
- [OWASP MCP ٹاپ 10](https://owasp.org/www-project-mcp-top-10/) - سرکاری OWASP MCP حفاظتی خطرات  
- [MCP سیکیورٹی سمٹ ورکشاپ (شرپا)](https://azure-samples.github.io/sherpa/) - Azure پر MCP کے لیے عملی سیکیورٹی تربیت

### **مائیکروسافٹ سیکیورٹی حل**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **سیکیورٹی معیارات**
- [OAuth 2.0 سیکیورٹی بہترین طریقے (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP ٹاپ 10 برائے بڑے زبان ماڈلز](https://genai.owasp.org/)
- [NIST سائبرسیکیورٹی فریم ورک](https://www.nist.gov/cyberframework)

---

> **اہم**: یہ سیکیورٹی کنٹرولز موجودہ MCP وضاحت (2025-11-25) کی عکاسی کرتے ہیں۔ نئے معیارات کی تیزی سے ارتقا کی وجہ سے ہمیشہ تازہ ترین [سرکاری دستاویزات](https://spec.modelcontextprotocol.io/) کے خلاف تصدیق کریں۔

## اگلا قدم

- واپس جائیں: [سیکیورٹی ماڈیول کا جائزہ](./README.md)  
- آگے بڑھیں: [ماڈیول 3: شروع کرتے ہوئے](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->