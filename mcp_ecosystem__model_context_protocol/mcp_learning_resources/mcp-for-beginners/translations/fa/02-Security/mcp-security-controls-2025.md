# کنترل‌های امنیتی MCP - به‌روزرسانی فوریه ۲۰۲۶

> **استاندارد فعلی**: این سند بازتاب‌دهنده الزامات امنیتی [مشخصات MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) و بهترین شیوه‌های رسمی امنیتی [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) است.

پروتکل زمینه مدل (MCP) با کنترل‌های امنیتی تقویت شده که به تهدیدات نرم‌افزار سنتی و تهدیدات خاص هوش مصنوعی پرداخته‌اند، به بلوغ قابل توجهی رسیده است. این سند کنترل‌های امنیتی جامعی برای پیاده‌سازی‌های امن MCP ارائه می‌دهد که با چارچوب OWASP MCP Top 10 همسوست.

## 🏔️ آموزش عملی امنیت

برای کسب تجربه عملی در پیاده‌سازی امنیت، ما کارگاه **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** را توصیه می‌کنیم - یک مسیر راهنمای جامع برای ایمن‌سازی سرورهای MCP در Azure با متدولوژی "آسیب‌پذیر → سوءاستفاده → اصلاح → اعتبارسنجی".

تمام کنترل‌های امنیتی در این سند با **[راهنمای امنیتی OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** هماهنگ هستند، که معماری‌های مرجع و راهنمایی‌های ویژه پیاده‌سازی در Azure برای ریسک‌های OWASP MCP Top 10 را فراهم می‌کند.

## **الزامات امنیتی الزامی**

### **ممنوعیت‌های حیاتی از مشخصات MCP:**

> **ممنوع**: سرورهای MCP **نباید** هیچ توکنی را بپذیرند که به‌طور صریح برای سرور MCP صادر نشده باشد  
>  
> **ممنوع**: سرورهای MCP **نباید** برای احراز هویت از نشست‌ها استفاده کنند  
>  
> **الزامی**: سرورهای MCP که مجوزدهی را اجرا می‌کنند **باید** همه درخواست‌های ورودی را تأیید کنند  
>  
> **اجباری**: سرورهای پراکسی MCP که از شناسه‌های کلاینت ایستا استفاده می‌کنند **باید** برای هر کلاینت ثبت‌شده پویا رضایت کاربر را دریافت کنند

---

## ۱. **کنترل‌های احراز هویت و مجوزدهی**

### **ادغام ارائه‌دهنده هویت خارجی**

**استاندارد فعلی MCP (۲۰۲۵-۱۱-۲۵)** اجازه می‌دهد سرورهای MCP احراز هویت را به ارائه‌دهندگان هویت خارجی واگذار کنند که پیشرفت قابل توجهی در امنیت است:

**ریسک OWASP MCP مورد بررسی**: [MCP07 - احراز هویت و مجوزدهی ناکافی](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**مزایای امنیتی:**
1. **حذف ریسک‌های احراز هویت سفارشی**: کاهش سطح آسیب‌پذیری با اجتناب از پیاده‌سازی‌های سفارشی احراز هویت  
2. **امنیت سازمانی سطح بالا**: استفاده از ارائه‌دهندگان هویتی مانند Microsoft Entra ID با ویژگی‌های پیشرفته امنیتی  
3. **مدیریت متمرکز هویت**: ساده‌سازی چرخه عمر کاربر، کنترل دسترسی و حسابرسی انطباق  
4. **احراز هویت چندعاملی**: به ارث بردن قابلیت‌های MFA از ارائه‌دهندگان هویت سازمانی  
5. **سیاست‌های دسترسی مشروط**: بهره‌مندی از کنترل‌های دسترسی مبتنی بر ریسک و احراز هویت تطبیقی

**الزامات پیاده‌سازی:**
- **اعتبارسنجی مخاطب توکن**: اطمینان از اینکه تمام توکن‌ها به‌طور صریح برای سرور MCP صادر شده‌اند  
- **تأیید صادرکننده**: مطابقت صادرکننده توکن با ارائه‌دهنده هویت مورد انتظار  
- **تأیید امضا**: اعتبارسنجی رمزنگاری صحت توکن  
- **اجرای محدودیت انقضا**: اجرای دقیق محدوده عمر توکن  
- **اعتبارسنجی دامنه**: اطمینان از اینکه توکن دارای مجوزهای مناسب برای عملیات درخواست شده است

### **امنیت منطق مجوزدهی**

**کنترل‌های حیاتی:**
- **حسابرسی جامع مجوزدهی**: بررسی‌های منظم امنیتی تمامی نقاط تصمیم‌گیری مجوز  
- **پیش‌فرض‌های ایمن**: رد دسترسی زمانی که منطق مجوزدهی قادر به اتخاذ تصمیم قطعی نیست  
- **مرزهای دسترسی**: تفکیک واضح سطوح امتیاز و دسترسی به منابع  
- **ثبت کامل گزارش‌ها**: ضبط کامل تمامی تصمیمات مجوز برای پایش امنیتی  
- **بازبینی‌های دوره‌ای دسترسی**: اعتبارسنجی متناوب از مجوزها و تخصیص‌های امتیاز کاربران

## ۲. **امنیت توکن و کنترل‌های ضد ارسال مستقیم**

**ریسک OWASP MCP مورد بررسی**: [MCP01 - مدیریت نادرست توکن و افشای راز](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **جلوگیری از ارسال مستقیم توکن**

**ارسال مستقیم توکن به‌طور صریح در مشخصات مجوزدهی MCP ممنوع است** به دلیل ریسک‌های حیاتی امنیتی:

**ریسک‌های امنیتی مورد بررسی:**
- **دور زدن کنترل‌ها**: عبور از کنترل‌های ضروری امنیتی مانند محدودسازی نرخ، اعتبارسنجی درخواست و پایش ترافیک  
- **شکست مسئولیت‌پذیری**: غیرممکن شدن شناسایی کلاینت که منجر به فساد سوابق حسابرسی و تحقیقات حوادث می‌شود  
- **خروج غیرمجاز به‌واسطه پراکسی**: اجازه به مهاجمان برای استفاده از سرورها به عنوان پراکسی برای دسترسی غیرمجاز به داده‌ها  
- **نقض مرزهای اعتماد**: نقض فرضیات اعتماد خدمات پایین‌دستی درباره منشاء توکن‌ها  
- **حرکت جانبی**: توکن‌های به خطر افتاده در چندین خدمت امکان گسترش حمله را فراهم می‌کنند

**کنترل‌های پیاده‌سازی:**
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

### **الگوهای مدیریت امن توکن**

**بهترین شیوه‌ها:**
- **توکن‌های کوتاه‌مدت**: کاهش پنجره در معرض قرارگیری با چرخش مکرر توکن  
- **صدور به هنگام**: صدور توکن‌ها تنها در زمان نیاز برای عملیات مشخص  
- **ذخیره‌سازی ایمن**: استفاده از ماژول‌های امنیت سخت‌افزاری (HSM) یا گنجینه کلیدهای امن  
- **بایندینگ توکن**: اتصال توکن‌ها به کلاینت‌ها، نشست‌ها یا عملیات خاص تا حد ممکن  
- **نظارت و هشداردهی**: تشخیص بلادرنگ سوءاستفاده از توکن یا الگوهای دسترسی غیرمجاز

## ۳. **کنترل‌های امنیت نشست**

### **جلوگیری از ربودن نشست**

**بردارهای حمله مورد بررسی:**
- **تزریق درخواست ربودن نشست**: رویدادهای مخرب تزریق شده به حالت نشست مشترک  
- **تقلید نشست**: استفاده غیرمجاز از شناسه نشست دزدیده شده برای عبور از احراز هویت  
- **حملات ادامه‌پذیر جریان**: سوءاستفاده از ادامه رویداد ارسال شده سرور برای تزریق محتوای مخرب

**کنترل‌های اجباری نشست:**
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

**امنیت انتقال:**
- **اجرای HTTPS**: تمام ارتباطات نشست با TLS 1.3 انجام شود  
- **ویژگی‌های امن کوکی**: HttpOnly، Secure، SameSite=Strict  
- **پینینگ گواهی‌نامه**: برای اتصالات حساس جهت جلوگیری از حملات MITM

### **ملاحظات حالت‌دار و بدون حالت**

**برای پیاده‌سازی‌های حالت‌دار:**
- وضعیت نشست اشتراکی نیازمند حفاظت اضافی علیه حملات تزریقی است  
- مدیریت صف نشست به تأیید صحت نیاز دارد  
- چندین نمونه سرور نیازمند همگام‌سازی امن وضعیت نشست هستند

**برای پیاده‌سازی‌های بدون حالت:**
- مدیریت نشست مبتنی بر JWT یا توکن مشابه  
- اعتبارسنجی رمزنگاری سلامت وضعیت نشست  
- سطح حمله کاهش یافته اما نیازمند اعتبارسنجی قوی توکن

## ۴. **کنترل‌های امنیتی ویژه هوش مصنوعی**

**ریسک‌های OWASP MCP مورد بررسی**:
- [MCP06 - دستکاری جریان درخواست](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - مسمومیت ابزار](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - تزریق و اجرای فرمان](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **دفاع در برابر تزریق درخواست**

**ادغام Microsoft Prompt Shields:**
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

**کنترل‌های پیاده‌سازی:**
- **پاک‌سازی ورودی‌ها**: اعتبارسنجی جامع و فیلترگذاری تمام ورودی‌های کاربر  
- **تعریف مرز محتوا**: جداسازی واضح بین دستورات سیستم و محتوای کاربر  
- **سلسله مراتب دستورات**: قواعد تقدم مناسب برای دستورهای متناقض  
- **پایش خروجی**: کشف خروجی‌های بالقوه مضر یا دستکاری شده

### **جلوگیری از مسمومیت ابزار**

**چارچوب امنیت ابزار:**
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

**مدیریت پویا ابزار:**
- **گردش‌های کاری تأیید**: رضایت صریح کاربر برای تغییرات ابزار  
- **قابلیت بازگشت**: توانایی بازگرداندن به نسخه‌های قبلی ابزار  
- **حسابرسی تغییرات**: تاریخچه کامل اصلاحات تعریف ابزار  
- **ارزیابی ریسک**: ارزیابی خودکار وضعیت امنیتی ابزار

## ۵. **جلوگیری از حمله نماینده سردرگم**

### **امنیت پراکسی OAuth**

**کنترل‌های پیشگیری از حمله:**
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

**الزامات پیاده‌سازی:**
- **تأیید رضایت کاربر**: هرگز از صفحه‌های رضایت برای ثبت کلاینت پویا عبور نکنید  
- **اعتبارسنجی URI بازگشتی**: اعتبارسنجی دقیق مبتنی بر فهرست سفید مقصدهای بازگشتی  
- **حفاظت کد مجوز**: کدهای کوتاه‌مدت با اجرای تک‌بارمصرف  
- **تأیید هویت کلاینت**: اعتبارسنجی قوی مدارک و متادیتای کلاینت

## ۶. **امنیت اجرای ابزار**

### **ایزولاسیون و سندباکس**

**ایزولاسیون مبتنی بر کانتینر:**
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

**ایزولاسیون فرآیند:**
- **زمینه‌های فرایندی جداگانه**: اجرای هر ابزار در فضای فرایندی ایزوله  
- **ارتباط بین فرایندی**: مکانیزم‌های IPC امن با اعتبارسنجی  
- **نظارت بر فرآیند**: تحلیل رفتار زمان اجرا و کشف ناهنجاری  
- **اجرای محدودیت منابع**: محدودیت‌های سخت بر CPU، حافظه و عملیات ورودی/خروجی

### **اجرای کمترین امتیاز**

**مدیریت مجوز:**
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

## ۷. **کنترل‌های امنیت زنجیره تأمین**

**ریسک OWASP MCP مورد بررسی**: [MCP04 - حملات زنجیره تأمین نرم‌افزار و دستکاری وابستگی](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **اعتبارسنجی وابستگی‌ها**

**امنیت جامع مؤلفه‌ها:**
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

### **پایش مستمر**

**کشف تهدیدات زنجیره تأمین:**
- **مانیتورینگ سلامت وابستگی‌ها**: ارزیابی مستمر همه وابستگی‌ها برای مشکلات امنیتی  
- **ادغام هوش تهدید**: به‌روزرسانی‌های لحظه‌ای درباره تهدیدهای تازه ظهور یافته در زنجیره تأمین  
- **تحلیل رفتاری**: کشف رفتارهای نامعمول در مؤلفه‌های خارجی  
- **پاسخ خودکار**: مهار فوری مؤلفه‌های به خطر افتاده

## ۸. **کنترل‌های پایش و شناسایی**

**ریسک OWASP MCP مورد بررسی**: [MCP08 - فقدان حسابرسی و تلومتری](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **مدیریت اطلاعات و رویدادهای امنیتی (SIEM)**

**استراتژی جامع ثبت گزارش:**
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

### **شناسایی تهدیدات در زمان واقعی**

**تحلیل‌های رفتاری:**
- **تحلیل رفتار کاربر (UBA)**: کشف الگوهای دسترسی نامعمول کاربران  
- **تحلیل رفتار موجودیت (EBA)**: پایش رفتار سرور MCP و ابزارها  
- **کشف ناهنجاری با یادگیری ماشین**: شناسایی تهدیدات امنیتی با هوش مصنوعی  
- **همبستگی هوش تهدید**: تطبیق فعالیت‌های مشاهده شده با الگوهای حمله شناخته شده

## ۹. **پاسخ به حادثه و بازیابی**

### **قابلیت‌های پاسخ خودکار**

**اقدامات پاسخ فوری:**
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

### **قابلیت‌های بررسی جرم‌شناسی**

**پشتیبانی از تحقیقات:**
- **حفاظت از مسیر حسابرسی**: لاگ‌های غیرقابل تغییر با صحت رمزنگاری شده  
- **جمع‌آوری مدارک**: گردآوری خودکار آثار امنیتی مرتبط  
- **بازسازی توالی زمانی**: توالی دقیق رویدادهای منتهی به حوادث امنیتی  
- **ارزیابی تاثیر**: سنجش دامنه نفوذ و افشای داده‌ها

## **اصول کلیدی معماری امنیت**

### **دفاع در عمق**
- **چندین لایه امنیتی**: عدم وجود نقطه شکست واحد در معماری امنیتی  
- **کنترل‌های افزونه**: اجرای تدابیر امنیتی هم‌پوشان برای عملکرد حیاتی  
- **مکانیزم‌های fail-safe**: پیش‌فرض‌های امن هنگام بروز خطا یا حمله

### **اجرای اعتماد صفر**
- **هرگز اعتماد نکن، همیشه تأیید کن**: اعتبارسنجی مداوم همه موجودیت‌ها و درخواست‌ها  
- **اصل کمترین امتیاز**: حداقل حقوق دسترسی برای تمام مؤلفه‌ها  
- **ریز بخش‌بندی شبکه**: کنترل‌های دقیق شبکه و دسترسی

### **تکامل مستمر امنیت**
- **سازگاری با چشم‌انداز تهدید**: به‌روزرسانی‌های منظم برای مقابله با تهدیدهای جدید  
- **ارزیابی اثربخشی کنترل‌ها**: ارزیابی و بهبود مستمر کنترل‌ها  
- **انطباق با مشخصات**: هماهنگی با استانداردهای امنیتی قابل تکامل MCP

---

## **منابع پیاده‌سازی**

### **مستندات رسمی MCP**
- [مشخصات MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [بهترین شیوه‌های امنیتی MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [مشخصات مجوزدهی MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **منابع امنیتی OWASP MCP**
- [راهنمای امنیت OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - جامع‌ترین OWASP MCP Top 10 با پیاده‌سازی Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - ریسک‌های رسمی امنیتی OWASP MCP  
- [کارگاه MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - آموزش عملی امنیت برای MCP در Azure

### **راهکارهای امنیتی مایکروسافت**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **استانداردهای امنیتی**
- [بهترین شیوه‌های امنیتی OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 برای مدل‌های زبان بزرگ](https://genai.owasp.org/)  
- [چارچوب امنیت سایبری NIST](https://www.nist.gov/cyberframework)

---

> **مهم**: این کنترل‌های امنیتی بازتاب‌دهنده مشخصات جاری MCP (۲۰۲۵-۱۱-۲۵) هستند. همواره مستندات رسمی [جدیدترین](https://spec.modelcontextprotocol.io/) را بررسی کنید زیرا استانداردها به سرعت تغییر می‌کنند.

## مرحله بعد

- بازگشت به: [بررسی کلی ماژول امنیت](./README.md)  
- ادامه به: [ماژول ۳: شروع به کار](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->