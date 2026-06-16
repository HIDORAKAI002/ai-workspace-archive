# ضوابط أمان MCP - تحديث فبراير 2026

> **المعيار الحالي**: يعكس هذا المستند متطلبات الأمان وفقًا لـ [مواصفات MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) وأفضل ممارسات الأمان الرسمية لـ [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

لقد تطور بروتوكول سياق النموذج (MCP) بشكل كبير مع ضوابط أمان محسنة تتناول كلًا من أمان البرمجيات التقليدي والتهديدات الخاصة بالذكاء الاصطناعي. يوفر هذا المستند ضوابط أمان شاملة لتنفيذات MCP الآمنة المتوافقة مع إطار عمل OWASP MCP Top 10.

## 🏔️ تدريب أمني عملي

للحصول على تجربة تطبيقية عملية في تنفيذ الأمان، نوصي بـ **[ورشة عمل قمة أمان MCP (شيربا)](https://azure-samples.github.io/sherpa/)** — رحلة إرشادية شاملة لتأمين خوادم MCP في Azure باستخدام منهجية "ثغرة → استغلال → تصحيح → تحقق".

جميع ضوابط الأمان في هذا المستند تتماشى مع **[دليل أمان MCP Azure من OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**، الذي يوفر معماريات مرجعية وإرشادات تنفيذ محددة لـ Azure لمخاطر OWASP MCP Top 10.

## **متطلبات الأمان الإلزامية**

### **الحظر الحرج من مواصفات MCP:**

> **ممنوع**: خوادم MCP **يجب ألا** تقبل أي رموز لم يتم إصدارها صراحةً لخادم MCP  
>
> **محرّم**: خوادم MCP **يجب ألا** تستخدم الجلسات للمصادقة  
>
> **مطلوب**: يجب على خوادم MCP التي تنفذ التفويض **التحقق من جميع** الطلبات الواردة  
>
> **إلزامي**: يجب على خوادم البروكسي في MCP التي تستخدم معرفات عميل ثابتة **الحصول على موافقة المستخدم** لكل عميل يتم تسجيله ديناميكيًا

---

## 1. **ضوابط المصادقة والتفويض**

### **تكامل موفري الهوية الخارجية**

يسمح **المعيار الحالي لـ MCP (2025-11-25)** لخوادم MCP بتفويض المصادقة إلى مزودي الهوية الخارجية، مما يمثل تحسنًا أمنيًا كبيرًا:

**مخاطرة OWASP MCP المعالجة**: [MCP07 - المصادقة والتفويض غير الكافيين](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**الفوائد الأمنية:**
1. **القضاء على مخاطر المصادقة المخصصة**: يقلل السطح المعرض للهجوم بتجنب تنفيذات المصادقة المخصصة  
2. **أمان بمستوى المؤسسات**: يستفيد من مزودي الهوية المعتمدين مثل Microsoft Entra ID بميزات أمان متقدمة  
3. **إدارة هوية مركزية**: يبسط إدارة دورة حياة المستخدم والتحكم في الوصول وتدقيق الامتثال  
4. **المصادقة متعددة العوامل**: يرث قدرات MFA من مزودي الهوية المؤسساتيين  
5. **سياسات الوصول المشروط**: يستفيد من ضوابط الوصول المعتمدة على المخاطر والمصادقة التكيفية  

**متطلبات التنفيذ:**
- **التحقق من جمهور الرمز**: التحقق من أن جميع الرموز صدرت صراحةً لخادم MCP  
- **التحقق من المصدر**: التحقق من أن مصدر الرمز يطابق مزود الهوية المتوقع  
- **التحقق من التوقيع**: التحقق التشفيري من سلامة الرمز  
- **تطبيق انتهاء الصلاحية**: تنفيذ صارم لحدود عمر الرمز  
- **التحقق من النطاق**: التأكد من أن الرموز تحتوي على أذونات مناسبة للعمليات المطلوبة  

### **أمان منطق التفويض**

**الضوابط الحرجة:**
- **مراجعات تفويض شاملة**: مراجعات أمان دورية لجميع نقاط اتخاذ قرارات التفويض  
- **افتراضيات فشل آمنة**: رفض الوصول عندما لا يمكن لمنطق التفويض إصدار قرار قطعي  
- **حدود الأذونات**: فصل واضح بين مستويات الامتياز المختلفة والوصول إلى الموارد  
- **تسجيل المراجعة**: تسجيل كامل لجميع قرارات التفويض لمراقبة الأمان  
- **مراجعات وصول دورية**: التحقق الدوري من أذونات المستخدم وتعيينات الامتياز  

## 2. **أمان الرموز وضوابط مكافحة التمرير عبر**

**مخاطرة OWASP MCP المعالجة**: [MCP01 - سوء إدارة الرموز وكشف الأسرار](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **منع تمرير الرموز**

**تمرير الرموز محظور صراحةً** في مواصفات تفويض MCP بسبب مخاطر أمنية حاسمة:

**المخاطر الأمنية المعالجة:**
- **التخطي المتحكم فيه**: يتجاوز ضوابط الأمان الأساسية مثل تحديد المعدل، التحقق من الطلب، ورصد الحركة  
- **انهيار المحاسبة**: يجعل تحديد هوية العميل مستحيلاً، مما يفسد سجلات التدقيق والتحقيقات  
- **التهريب عبر البروكسي**: يمكن الجهات الخبيثة من استخدام الخوادم كبروكسي للوصول غير المصرح به للبيانات  
- **انتهاكات حدود الثقة**: يكسر افتراضات الثقة في الخدمات التابعة حول أصول الرموز  
- **الانتقال الجانبي**: تمكّن الرموز المخترقة عبر خدمات متعددة من توسيع هجمات أوسع  

**ضوابط التنفيذ:**
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

### **أنماط إدارة الرموز الآمنة**

**أفضل الممارسات:**
- **رموز قصيرة العمر**: تقليل نافذة التعرض من خلال تدوير الرموز المتكرر  
- **الإصدار عند الحاجة**: إصدار الرموز فقط عند الحاجة لعمليات محددة  
- **تخزين آمن**: استخدام وحدات الأمان المادية (HSM) أو خزائن المفاتيح الآمنة  
- **ربط الرموز**: ربط الرموز بعملاء محددين أو جلسات أو عمليات حيثما أمكن  
- **المراقبة والتنبيه**: الكشف في الوقت الحقيقي عن سوء استخدام الرموز أو أنماط الوصول غير المصرح بها  

## 3. **ضوابط أمان الجلسة**

### **منع اختطاف الجلسة**

**مسارات الهجوم المعالجة:**
- **حقن مطالبات اختطاف الجلسة**: حقن أحداث خبيثة في حالة الجلسة المشتركة  
- **انتحال الجلسة**: استخدام غير مصرح به لمعَرّفات الجلسة المسروقة لتجاوز المصادقة  
- **هجمات استئناف التدفق**: استغلال استئناف أحداث الخادم لإدخال محتوى خبيث  

**ضوابط الجلسة الإلزامية:**
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

**أمان النقل:**
- **تطبيق HTTPS**: جميع اتصالات الجلسة عبر TLS 1.3  
- **سمات ملفات تعريف الارتباط الآمنة**: HttpOnly، Secure، SameSite=Strict  
- **تثبيت الشهادات**: للاتصالات الحرجة لمنع هجمات MITM  

### **اعتبارات الحالة مقابل اللاحالة**

**للتنفيذات ذات الحالة:**
- حالة الجلسة المشتركة تتطلب حماية إضافية ضد هجمات الحقن  
- إدارة الجلسة القائمة على الطابور تحتاج إلى تحقق من السلامة  
- العديد من مثيلات الخادم تتطلب مزامنة آمنة لحالة الجلسة  

**للتنفيذات اللاحالة:**
- إدارة الجلسة المستندة إلى رموز JWT أو مماثلة  
- التحقق التشفيري من سلامة حالة الجلسة  
- تقليل سطح الهجوم لكنه يتطلب تحققاً قوياً من صلاحية الرموز  

## 4. **ضوابط أمان خاصة بالذكاء الاصطناعي**

**مخاطر OWASP MCP المعالجة**:
- [MCP06 - التلاعب بتدفق المطالبات](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - تسميم الأدوات](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - حقن وتنفيذ الأوامر](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **الدفاع ضد حقن المطالبات**

**تكامل دروع مطالبات Microsoft:**
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

**ضوابط التنفيذ:**
- **تنقية المدخلات**: التحقق الشامل وتصفية جميع مدخلات المستخدمين  
- **تعريف حدود المحتوى**: فصل واضح بين تعليمات النظام ومحتوى المستخدم  
- **تسلسل التعليمات**: قواعد أسبقية مناسبة للتعليمات المتضاربة  
- **مراقبة المخرجات**: الكشف عن المخرجات التي قد تكون ضارة أو معدلة  

### **منع تسميم الأدوات**

**إطار أمان الأدوات:**
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

**إدارة الأدوات الديناميكية:**
- **سير عمل الموافقات**: موافقة صريحة من المستخدم لتعديلات الأدوات  
- **قدرات التراجع**: إمكانية العودة إلى نسخ الأدوات السابقة  
- **تدقيق التغييرات**: تاريخ كامل لتعديلات تعريف الأدوات  
- **تقييم المخاطر**: تقييم تلقائي لوضع الأمان للأدوات  

## 5. **منع هجوم الوكيل المربك (Confused Deputy)**

### **أمان بروكسي OAuth**

**ضوابط منع الهجوم:**
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

**متطلبات التنفيذ:**
- **التحقق من موافقة المستخدم**: عدم تخطي شاشات الموافقة لتسجيل العملاء الديناميكي  
- **التحقق من URI إعادة التوجيه**: تحقق صارم قائم على القائمة البيضاء لوجهات إعادة التوجيه  
- **حماية رمز التفويض**: رموز قصيرة العمر مع فرض الاستخدام مرة واحدة  
- **التحقق من هوية العميل**: تحقق قوي من بيانات اعتماد العميل وبيانات التعريف  

## 6. **أمان تنفيذ الأدوات**

### **العزل والتقسيم الآمن**

**العزل القائم على الحاويات:**
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

**عزل العمليات:**
- **سياقات عمليات منفصلة**: تشغيل كل أداة في مساحة عملية معزولة  
- **التواصل بين العمليات**: آليات IPC آمنة مع التحقق  
- **مراقبة العملية**: تحليل سلوك وقت التشغيل واكتشاف الشذوذ  
- **تطبيق الموارد**: حدود صارمة على CPU والذاكرة وعمليات الإدخال والإخراج  

### **تنفيذ أقل الامتيازات**

**إدارة الأذونات:**
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

## 7. **ضوابط أمان سلسلة التوريد**

**مخاطرة OWASP MCP المعالجة**: [MCP04 - هجمات سلسلة التوريد البرمجية والتلاعب بالاعتماديات](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **التحقق من الاعتماديات**

**أمان المكونات الشامل:**
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

### **المراقبة المستمرة**

**كشف تهديدات سلسلة التوريد:**
- **مراقبة صحة الاعتمادات**: تقييم مستمر لجميع الاعتماديات بحثًا عن مشاكل أمان  
- **دمج استخبارات التهديدات**: تحديثات في الوقت الحقيقي عن تهديدات سلسلة التوريد الناشئة  
- **التحليل السلوكي**: كشف السلوك غير الطبيعي في المكونات الخارجية  
- **الاستجابة التلقائية**: احتواء فوري للمكونات المخترقة  

## 8. **ضوابط المراقبة والكشف**

**مخاطرة OWASP MCP المعالجة**: [MCP08 - نقص المراجعة وقياس الأداء](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **إدارة معلومات وأحداث الأمان (SIEM)**

**استراتيجية التسجيل الشاملة:**
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

### **الكشف الفوري عن التهديدات**

**التحليلات السلوكية:**
- **تحليلات سلوك المستخدم (UBA)**: كشف أنماط وصول المستخدم غير المعتادة  
- **تحليل سلوك الكيانات (EBA)**: مراقبة سلوك خادم MCP والأدوات  
- **كشف الشذوذ باستخدام التعلم الآلي**: تحديد التهديدات الأمنية مدعومًا بالذكاء الصناعي  
- **ترابط استخبارات التهديدات**: مطابقة الأنشطة المرصودة مع أنماط الهجمات المعروفة  

## 9. **الاستجابة للحوادث والتعافي**

### **قدرات الاستجابة التلقائية**

**إجراءات الاستجابة الفورية:**
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

### **قدرات التحقيق الجنائي**

**دعم التحقيق:**
- **الحفاظ على سجل التدقيق**: تسجيل غير قابل للتعديل مع سلامة تشفيرية  
- **جمع الأدلة**: جمع تلقائي للأدلة الأمنية ذات الصلة  
- **إعادة بناء الجدول الزمني**: تسلسل مفصل للأحداث التي أدت إلى الحوادث الأمنية  
- **تقييم الأثر**: تقييم نطاق الاختراق وكشف البيانات  

## **مبادئ هندسة الأمان الرئيسية**

### **الدفاع المتعمق**
- **طبقات أمان متعددة**: لا توجد نقطة فشل واحدة في هندسة الأمان  
- **ضوابط زائدة**: تدابير أمان متداخلة للوظائف الحرجة  
- **آليات فشل آمنة**: إعدادات افتراضية آمنة عند مواجهة الأخطاء أو الهجمات  

### **تنفيذ الثقة الصفرية**
- **لا تثق أبدًا، تحقق دائمًا**: التحقق المستمر من جميع الكيانات والطلبات  
- **مبدأ أقل الامتيازات**: حقوق وصول محدودة لجميع المكونات  
- **التقسيم الدقيق**: ضوابط شبكة ووصول دقيقة  

### **تطور أمني مستمر**
- **التكيف مع مشهد التهديدات**: تحديثات دورية لمواجهة التهديدات الناشئة  
- **فعالية ضوابط الأمان**: تقييم وتحسين مستمر للضوابط  
- **الامتثال للمواصفات**: التوافق مع معايير أمان MCP المتطورة  

---

## **موارد التنفيذ**

### **وثائق MCP الرسمية**
- [مواصفات MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [أفضل ممارسات أمان MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [مواصفات التفويض MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **مصادر أمان OWASP MCP**
- [دليل أمان MCP Azure من OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 مع تطبيق Azure شامل  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - المخاطر الأمنية الرسمية لـ OWASP MCP  
- [ورشة عمل قمة أمان MCP (شيربا)](https://azure-samples.github.io/sherpa/) - تدريب أمني عملي لـ MCP على Azure  

### **حلول أمان Microsoft**
- [دروع مطالبات Microsoft](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [أمان محتوى Azure](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [خزينة مفاتيح Azure](https://learn.microsoft.com/azure/key-vault/)

### **معايير الأمان**
- [أفضل ممارسات أمان OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 للنماذج اللغوية الكبيرة](https://genai.owasp.org/)
- [إطار عمل الأمن السيبراني NIST](https://www.nist.gov/cyberframework)

---

> **مهم**: تعكس هذه الضوابط الأمنية المواصفة الحالية لـ MCP (2025-11-25). تحقق دائمًا من الوثائق الرسمية الأحدث على [https://spec.modelcontextprotocol.io/](https://spec.modelcontextprotocol.io/) لأن المعايير تتطور بسرعة مستمرة.

## التالي

- العودة إلى: [نظرة عامة على وحدة الأمان](./README.md)  
- المتابعة إلى: [الوحدة 3: البدء](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->