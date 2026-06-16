# בקרה על אבטחת MCP - עדכון פברואר 2026

> **תקן נוכחי**: מסמך זה משקף את דרישות האבטחה של [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) ואת [המנחים הטובים ביותר לאבטחת MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

פרוטוקול הקשר מודל (MCP) התפתח משמעותית עם בקרה מתקדמת לאבטחה המתייחסת גם לאבטחת תוכנה מסורתית וגם לאיומים ספציפיים לבינה מלאכותית. מסמך זה מספק בקרה מקיפה לאבטחה עבור יישומי MCP מאובטחים התואמים למסגרת OWASP MCP Top 10.

## 🏔️ אימון מעשי באבטחה

לניסיון מעשי ביישום אבטחה, אנו ממליצים על **[מושב סיכום אבטחת MCP (שארפה)](https://azure-samples.github.io/sherpa/)** - מסע מודרך מקיף לאבטחת שרתי MCP ב-Azure באמצעות שיטת "פגיעה → ניצול → תיקון → אימות".

כל בקרה על אבטחה במסמך זה תואמת את **[מדריך אבטחת Azure של OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/)**, המספק ארכיטקטורות ייחוס והנחיות יישום ספציפיות ל-Azure לסיכוני OWASP MCP Top 10.

## **דרישות אבטחה מחייבות**

### **איסורים קריטיים מפרוטוקול MCP:**

> **אסור**: שרתי MCP **אסור שיקבלו** כל טוקנים שלא הונפקו במפורש עבור שרת MCP  
>  
> **אסור**: שרתי MCP **אסור שישתמשו** במפגשים לאימות  
>  
> **נדרש**: שרתי MCP המיישמים הרשאה **חייבים** לאמת את כל הבקשות הנכנסות  
>  
> **מחוייב**: שרתי proxy של MCP המשתמשים ב-Client IDs סטטיים **חייבים** להשיג הסכמת משתמש עבור כל לקוח רשום דינמית

---

## 1. **בקרות אימות והרשאה**

### **אינטגרציה עם ספק זיהוי חיצוני**

**תקן MCP נוכחי (2025-11-25)** מאפשר לשרתי MCP להאציל אימות לספקי זהות חיצוניים, מה שמסמן שיפור אבטחה משמעותי:

**איומי OWASP MCP מטופלים**: [MCP07 - אימות והרשאה לא מספקים](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**יתרונות אבטחה:**
1. **מונע סיכוני אימות מותאם אישית**: מפחית את משטח הפגיעה על ידי הימנעות מיישומי אימות מותאמים
2. **אבטחת ארגון ברמת האימפרייז**: מנצל ספקי זהות מבוססים כמו Microsoft Entra ID עם תכונות אבטחה מתקדמות
3. **ניהול זהויות מרכזי**: מפשט ניהול מחזור חיי המשתמש, בקרת גישה וביקורת תאימות
4. **אימות רב-גורמי**: מורש מהספקים הארגוניים של MFA
5. **מדיניות גישה מותנית**: נהנה מבקרות גישה מבוססות סיכון ואימות אדפטיבי

**דרישות יישום:**
- **אימות קהל היעד של הטוקן**: יש לוודא שכל הטוקנים הונפקו במפורש עבור שרת MCP
- **אימות מוּנפק הטוקן**: לאמת שהמוּנפק תואם לספק הזהות הצפוי
- **אימות חתימה**: אימות קריפטוגרפי של שלמות הטוקן
- **אכיפת תוקף**: אכיפה מחמירה של מגבלות חיי הטוקן
- **אימות תחום**: לוודא שהטוקנים מכילים הרשאות מתאימות לפעולות המבוקשות

### **אבטחת לוגיקת הרשאה**

**בקרות קריטיות:**
- **ביקורות הרשאה מקיפות**: סקירות אבטחה תקופתיות של כל נקודות ההחלטה על הרשאה
- **ברירת מחדל בטוחה**: סירוב גישה כשהלוגיקה לא מסוגלת לקבל החלטה חד משמעית
- **גבולות הרשאה**: הפרדה ברורה בין רמות הרשאה שונות וגישה למשאבים
- **רישום ביקורת**: ניהול רישום מלא לכל החלטות ההרשאה לצורך ניטור אבטחה
- **סקירות גישה סדירות**: אימות תקופתי של הרשאות משתמש והקצאות הרשאה

## 2. **אבטחת טוקנים ובקרת מניעת מעבר דרך**

**איומי OWASP MCP מטופלים**: [MCP01 - ניהול טוקנים לקוי וחשיפת סודות](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **מניעת מעבר דרך טוקנים**

**מעבר דרך טוקנים אסור מפורשות** בפרוטוקול הרשאה של MCP בשל סיכוני אבטחה קריטיים:

**סיכוני אבטחה מטופלים:**
- **עקיפת בקרות**: עוקף בקרות אבטחה חיוניות כמו הגבלת קצב, אימות בקשות וניטור תעבורה
- **קריסת אחריות**: מנע זיהוי לקוח, דבר המפר את שרשרות ביקורת וחקירת תקלות
- **חשיפת מידע באמצעות Proxy**: מאפשר לפעילים זדוניים להשתמש בשרתים כפרוקסי לגישה לא מורשית לנתונים
- **הפרת גבולות אמון**: מפר את הנחות האמון של שירותים בבעלי טוקנים מקוריים
- **תנועה רוחבית**: טוקנים נפגעים העוברים בין שירותים מרחיבים את טווח הפגיעה

**בקרות יישום:**
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

### **תבניות ניהול טוקנים מאובטחים**

**מנחים לטיפול:**
- **טוקנים בעלי תוקף קצר**: מקטין את חלון החשיפה על ידי סיבוב טוקנים תכוף
- **הנפקה בזמן אמת**: הנפקת טוקנים רק בעת הצורך לפעולות ספציפיות
- **אחסון מאובטח**: שימוש במודולי אבטחה חומרתיים (HSM) או מחסני מפתחות מאובטחים
- **קשירת טוקנים**: קשירת הטוקנים ללקוחות מסוימים, מפגשים או פעולות ככל האפשר
- **ניטור והתראות**: זיהוי בזמן אמת של שימוש לרעה או דפוסי גישה בלתי מורשים

## 3. **בקרות אבטחת מפגשים**

### **מניעת חטיפת מפגשים**

**וקטורי התקפה מטופלים:**
- **הזרקת פקודות חטיפת מפגש**: אירועי זדון המוזרקים למצב מפגש משותף
- **זיוף מפגש**: שימוש לא מורשה במזהי מפגש גנובים לעקיפת אימות
- **התקפות חידוש זרם**: שימוש לרעה בהמשכת אירועים הנשלחים מהשרת להזרקת תוכן זדוני

**בקרות מפגש חובה:**
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

**אבטחת תעבורה:**
- **אכיפת HTTPS**: כל תקשורת המפגש על גבי TLS 1.3
- **מאפייני עוגיות מאובטחים**: HttpOnly, Secure, SameSite=Strict
- **נעל תעודות**: לחיבורים קריטיים למניעת התקפות MITM

### **שיקולים בין מפגש ממושך ללא מצב**

**לעיבודים ממושכים:**
- מצב מפגש משותף דורש הגנה נוספת מפני התקפות הזרקה
- ניהול מפגש מבוסס תורים דורש אימות שלמות
- מופעי שרת מרובים דורשים סינכרון מאובטח של מצב המפגש

**לעיבודים ללא מצב:**
- ניהול מפגש מבוסס JWT או טוקנים דומים
- אימות קריפטוגרפי של שלמות מצב המפגש
- משטח תקיפה מצומצם אך דורש אימות חזק של טוקנים

## 4. **בקרות אבטחה ייעודיות לבינה מלאכותית**

**איומי OWASP MCP מטופלים**:  
- [MCP06 - סטייה בזרימת פקודות](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - הרעלת כלי](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - הזרקת פקודות וביצוע](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **הגנה מפני הזרקת פקודות**

**אינטגרציה עם Microsoft Prompt Shields:**
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

**בקרות יישום:**
- **סינון וקיזוז קלטים**: אימות וסינון כולל של כל הקלטים מהמשתמש
- **הגדרה ברורה של גבולות תוכן**: הפרדה ברורה בין הוראות מערכת לתוכן משתמש
- **היררכיית הוראות**: כללי קדימות נכונים להוראות סותרות
- **ניטור פלט**: זיהוי פלטים פוטנציאלית מזיקים או משוחדים

### **מניעת הרעלת כלים**

**מסגרת אבטחה לכלים:**
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

**ניהול כלים דינמי:**
- **תהליכי אישור**: הסכמת משתמש מפורשת לשינויים בכלים
- **יכולות חזרתיות**: אפשרות לחזרה לגרסאות קודמות של הכלי
- **ביקורת שינויים**: רישום מלא של שינויים בהגדרות הכלי
- **הערכות סיכון**: הערכה אוטומטית של מצב האבטחה של הכלי

## 5. **מניעת התקפות בעל עותק מבולבל (Confused Deputy)**

### **אבטחת Proxy OAuth**

**בקרות למניעת התקפות:**
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

**דרישות יישום:**
- **אימות הסכמת משתמש**: לעולם אל תדלג על מסכי הסכמה ברישום לקוח דינמי
- **אימות URI הפניה**: אימות מחמיר ברשימת לבן ליעדי הפניה
- **הגנה על קוד הרשאה**: קודים עם תוקף קצר ושימוש יחיד
- **אימות זהות לקוח**: אימות חזק של נתוני הלקוח ומטא-נתונים

## 6. **אבטחת ביצוע כלים**

### **סנדבוקס ואיוורור**

**איוורור מבוסס קונטיינר:**
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

**איוורור תהליכים:**
- **הפרדה בין הקשרים של תהליכים**: כל ביצוע כלי במרחב תהליך מבודד
- **תקשורת בין תהליכים**: מנגנוני IPC מאובטחים עם אימות
- **ניטור תהליכים**: ניתוח התנהגות בזמן ריצה וזיהוי אנומליות
- **אכיפת משאבים**: הגבלות מחמירות על מעבד, זיכרון ופעולות קלט/פלט

### **יישום הרשאות מינימליות**

**ניהול הרשאות:**
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

## 7. **בקרות אבטחת שרשרת האספקה**

**איומי OWASP MCP מטופלים**: [MCP04 - התקפות בשרשרת האספקה ושינוי תלויות](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **אימות תלויות**

**אבטחה מקיפה של רכיבים:**
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

### **ניטור רציף**

**זיהוי איומי שרשרת אספקה:**
- **ניטור בריאות תלויות**: הערכה מתמשכת של כל התלויות לסיכוני אבטחה
- **אינטגרציה עם מודיעין איומים**: עדכונים בזמן אמת על איומים מתפתחים בשרשרת האספקה
- **ניתוח התנהגות**: זיהוי התנהגות חריגה ברכיבים חיצוניים
- **תגובה אוטומטית**: בידוד מיידי של רכיבים פגועים

## 8. **בקרות ניטור וזיהוי**

**איומי OWASP MCP מטופלים**: [MCP08 - חוסר ביקורת וטלמטריה](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **ניהול מידע ואירועים של אבטחה (SIEM)**

**אסטרטגיית רישום מקיפה:**
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

### **זיהוי איומים בזמן אמת**

**אנליטיקת התנהגות:**
- **ניתוח התנהגות משתמש (UBA)**: זיהוי דפוסי גישה חריגים של משתמשים
- **ניתוח התנהגות ישויות (EBA)**: ניטור התנהגות שרתי MCP וכלים
- **זיהוי אנומליות באמצעות למידה ממוחשבת**: זיהוי איומי אבטחה מונחה AI
- **קורלציה עם מודיעין איומים**: התאמת פעילויות נצפות לדפוסי התקפה מוכרים

## 9. **תגובה והתאוששות מתקריות**

### **יכולות תגובה אוטומטית**

**פעולות תגובה מיידיות:**
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

### **יכולות פורנזיות**

**תמיכה בחקירה:**
- **שימור שרשרת ביקורת**: רישום בלתי ניתן לשינוי עם שלמות קריפטוגרפית
- **איסוף ראיות**: איסוף אוטומטי של ארטיפקטים רלוונטיים לאבטחה
- **שחזור ציר זמן**: רצף מפורט של אירועים שהובילו לתקריות אבטחה
- **הערכת השפעה**: הערכת היקף הפגיעה וחשיפת הנתונים

## **עקרונות עיקריים בארכיטקטורת אבטחה**

### **הגנה בעומק**
- **שכבות אבטחה מרובות**: ללא נקודת כשל יחידה בארכיטקטורת האבטחה
- **בקרות כפולות**: אמצעי אבטחה חופפים לתפקידים קריטיים
- **מנגנוני כשל בטוח**: ברירות מחדל מאובטחות כאשר מתרחשים שגיאות או התקפות

### **יישום Zero Trust**
- **מעולם לא סומך, תמיד מאמת**: אימות מתמשך של כל הישויות והבקשות
- **עקרון ההרשאת מינימום**: זכויות גישה מינימליות לכל המרכיבים
- **מיקרו סגמנטציה**: בקרות רשת וגישה מפורטות

### **התפתחות אבטחה מתמשכת**
- **התאמה לנוף איומים**: עדכונים סדירים לטיפול באיומים מתפתחים
- **יעילות בקרות אבטחה**: הערכה ושיפור מתמשכים של הבקרות
- **התאמה לתקן**: התאמה לדרישות אבטחת MCP מתפתחות

---

## **משאבים ליישום**

### **תיעוד רשמי של MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [המנחים הטובים ביותר לאבטחת MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [פרוטוקול הרשאת MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **משאבי אבטחה של OWASP MCP**
- [מדריך אבטחת Azure של OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 כולל יישום Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - סיכוני אבטחה רשמיים של OWASP MCP
- [מושב סיכום אבטחת MCP (שארפה)](https://azure-samples.github.io/sherpa/) - אימון מעשי באבטחה עבור MCP ב-Azure

### **פתרונות אבטחה של מיקרוסופט**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **תקני אבטחה**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 לדגמי שפה גדולים](https://genai.owasp.org/)
- [מסגרת סייבר NIST](https://www.nist.gov/cyberframework)

---

> **חשוב**: בקרות אבטחה אלו משקפות את מפרט MCP הנוכחי (2025-11-25). ודאו תמיד מול התיעוד [הרשמי](https://spec.modelcontextprotocol.io/) העדכני ביותר מכיוון שהתקנים ממשיכים להתפתח במהירות.

## מה הלאה

- חזור אל: [סקירת מודול האבטחה](./README.md)
- המשך ל: [מודול 3: התחלה](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->