# בקרות אבטחה של MCP - עדכון פברואר 2026

> **תקן נוכחי**: מסמך זה משקף את דרישות האבטחה של [מפרט MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) ואת [שיטות האבטחה הטובות ביותר של MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) הרשמיות.

פרוטוקול הקונטקסט של הדגם (MCP) התפתח משמעותית עם בקרות אבטחה משופרות המתייחסות גם לאבטחת תוכנה מסורתית וגם לאיומים ספציפיים לבינה מלאכותית. מסמך זה מספק בקרות אבטחה מקיפות ליישומים מאובטחים של MCP, בהתאמה למודל OWASP MCP Top 10.

## 🏔️ אימון אבטחה מעשי

לחוויית יישום אבטחה מעשית, אנו ממליצים על **[סדנת הפסגה של אבטחת MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - משלחת מודרכת מקיפה לאבטחת שרתי MCP ב-Azure באמצעות מתודולוגיה של "פגיע → ניצול → תיקון → אימות".

כל בקרות האבטחה במסמך זה מותאמות ל**[מדריך האבטחה של OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)**, המספק ארכיטקטורות ייחוס והנחיות יישום ייעודיות ל-Azure לסיכוני OWASP MCP Top 10.

## **דרישות אבטחה מחייבות**

### **איסורים קריטיים ממפרט MCP:**

> **אסור**: שרתי MCP **אסור שיקבלו** שום טוקנים שלא הונפקו במפורש לשרת MCP  
>
> **אסור**: שרתי MCP **אסור שישתמשו** במפגשים לאימות  
>
> **חובה**: שרתי MCP שמיישמים הרשאה **חובה** לאמת את כל הבקשות הנכנסות  
>
> **חובה**: שרתי פרוקסי של MCP המשתמשים במזהי לקוח סטטיים **חובה** לקבל הסכמה מהמשתמש עבור כל לקוח שנרשם באופן דינמי  

---

## 1. **בקרות אימות והרשאה**

### **שילוב ספק זהות חיצוני**

**תקן MCP נוכחי (2025-11-25)** מאפשר לשרתי MCP להאציל אימות לספקי זהות חיצוניים, מה שמייצג שיפור אבטחה משמעותי:

**סיכון OWASP MCP מטופל**: [MCP07 - אימות והרשאה בלתי מספקים](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**יתרונות אבטחה:**
1. **מסלק סיכוני אימות מותאם אישית**: מצמצם את שטח הפגיעות על ידי הימנעות מיישומי אימות מותאמים  
2. **אבטחה ברמת ארגון**: משתמש בספקי זהות מבוססים כמו Microsoft Entra ID עם תכונות אבטחה מתקדמות  
3. **ניהול זהות מרכזי**: מפשט ניהול מחזור חיי המשתמש, בקרת גישה ובדיקות התאמה  
4. **אימות רב-שלבי**: נהנה מיכולות MFA המגיעות מספקי זהות ארגוניים  
5. **מדיניות גישה מותנית**: נהנה מבקרות גישה מבוססות סיכון ואימות אדפטיבי  

**דרישות יישום:**
- **אימות קהל טוקן**: לאמת שכל הטוקנים הונפקו במפורש לשרת MCP  
- **אימות מנפיק**: לבדוק שהמנפיק של הטוקן תואם לספק הזהות הצפוי  
- **אימות חתימה**: אימות קריפטוגרפי של שלמות הטוקן  
- **אכיפת תוקף**: הקפדה מחמירה על הגבלת תוקף הטוקן  
- **אימות תחום**: לוודא שהטוקנים מכילים הרשאות מתאימות לפעולות המבוקשות  

### **אבטחת לוגיקת הרשאה**

**בקרות קריטיות:**
- **בדיקות אבטחה מקיפות של הרשאות**: סקירות אבטחה תקופתיות לכל נקודות קבלת ההחלטות בהרשאות  
- **ברירות מחדל בטוחות**: לדחות גישה כשהלוגיקה לא יכולה לקבל החלטה ברורה  
- **גבולות הרשאה**: הפרדה ברורה בין רמות זכויות שונות וגישה למשאבים  
- **רישום ביקורת**: תיעוד מלא של כל החלטות ההרשאה למעקב אבטחה  
- **סקירות גישה תקופתיות**: אימות מחזורי של הרשאות המשתמשים והקצאת זכויות  

## 2. **אבטחת טוקנים ובקרות נגד מעבר ישיר**

**סיכון OWASP MCP מטופל**: [MCP01 - ניהול שגוי של טוקנים וחשיפת סודות](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **מניעת מעבר ישיר של טוקנים**

**מעבר ישיר של טוקנים אסור במפורש** ב_SPEC Authorization של MCP בשל סיכוני אבטחה קריטיים:

**סיכוני אבטחה מטופלים:**
- **עקיפת בקרות**: עובר על בקרות אבטחה חיוניות כמו הגבלת קצב, אימות בקשות ומעקב תעבורה  
- **שבירת אחריות**: מונע זיהוי לקוח תקין ועלול לפגוע במסלולי ביקורת ובחקר תקריות  
- **הוצאת מידע דרך פרוקסי**: מאפשר לתוקפים להשתמש בשרתים כפרוקסיים לגישה לא מורשית  
- **הפרת גבולות אמון**: מפר את הנחות האמון של שירותים מקבלים לגבי מקור הטוקנים  
- **תנועה היקפית**: טוקנים שהשתלטו עליהם מאפשרים הרחבת התקפות בין שירותים  

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

### **תבניות ניהול טוקן מאובטח**

**שיטות מומלצות:**
- **טוקנים קצרים חיים**: לצמצם את חלון החשיפה עם סיבוב תדיר  
- **הנפקה בזמן אמת**: להנפיק טוקנים רק כשצריך עבור פעולות ספציפיות  
- **אחסון מאובטח**: שימוש במודולי אבטחה חומרתיים (HSM) או כספות מפתחות מאובטחות  
- **קישור טוקנים**: לקשור טוקנים ללקוחות, מפגשים או פעולות ספציפיות כשאפשרי  
- **ניטור והתרעה**: זיהוי בזמן אמת של שימוש לרעה או דפוסי גישה לא מורשים  

## 3. **בקרות אבטחת מפגש**

### **מניעת חטיפת מפגש**

**וקטורי התקפה מטופלים:**
- **הזרקת פקודות חטיפת מפגש**: אירועים זדוניים המוזרקים למצב המפגש המשותף  
- **זיוף מפגש**: שימוש לא מורשה במזהי מפגשים גנובים לעקיפת אימות  
- **התקפות זרם שניתן להמשיך בהן**: ניצול המשך אירועים שנשלחים מהשרת להזרקת תוכן זדוני  

**בקרות חובה למפגשים:**
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

**אבטחת תקשורת:**
- **אכיפת HTTPS**: כל תקשורת המפגש דרך TLS 1.3  
- **מאפייני קוקי מאובטחים**: HttpOnly, Secure, SameSite=Strict  
- **נעילת תעודה**: לחיבורים קריטיים למניעת התקפות MITM  

### **שיקולים למפגשים ממושכים לעומת חסרי מדינה**

**ליישומים ממושכי:**
- מצב מפגש משותף דורש הגנה נוספת מפני התקפות הזרקה  
- ניהול תורי מפגשים דורש אימות שלמות  
- מופעי שרת מרובים דורשים סינכרון מאובטח של מצב מפגש  

**ליישומים חסרי מדינה:**
- ניהול מפגש מבוסס JWT או טוקנים דומים  
- אימות קריפטוגרפי של שלמות מצב המפגש  
- שטח פגיעה מצומצם אך דורש אימות חזק של הטוקנים  

## 4. **בקרות אבטחה ספציפיות לבינה מלאכותית**

**סיכוני OWASP MCP מטופלים**:  
- [MCP06 - הזרקת פקודות באמצעות מטענים קונטקסטואליים](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - הרעלת כלים](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - הזרקת פקודות וביצוע](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **הגנה מפני הזרקת פקודות**

**אינטגרציה עם מגן הפקודות של מייקרוסופט:**  
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
- **ניקוי קלט**: ולידציה וסינון מקיפים של כל הקלטים מהמשתמש  
- **הגדרת גבולות תוכן**: הפרדה ברורה בין הוראות מערכת לתוכן משתמש  
- **סדרי עדיפות בהוראות**: כללי קדימות נכונים להוראות סותרות  
- **ניטור פלט**: זיהוי תוצאות עלולות להזיק או מנוהלות  

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

**ניהול דינמי של כלים:**
- **זרימות עבודה לאישור**: הסכמת משתמש מפורשת לשינויים בכלי  
- **יכולת הורדה חזרה**: אפשרות לחזור לגרסאות קודמות של הכלי  
- **ביקורת שינויים**: היסטוריה מלאה של שינויים בהגדרת הכלי  
- **הערכת סיכון**: הערכה אוטומטית של מצבי אבטחת הכלי  

## 5. **מניעת מתקפת סוכן מבולבל**

### **אבטחת פרוקסי OAuth**

**בקרות מניעה:**
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
- **ווידוא הסכמת משתמש**: לעולם לא לדלג על מסכי הסכמה ברישום לקוחות דינמי  
- **ולידציה של URI הפניה**: אימות מחמיר על רשימת לבנה של יעדי הפנייה  
- **הגנת קוד הרשאה**: קודים קצרים עם אכיפה לשימוש יחיד  
- **אימות זהות לקוח**: בדיקות תקפות חזקות של קרדנציאלים ונתוני מטה של לקוח  

## 6. **אבטחת ביצוע כלים**

### **סנדבוקס ובידוד**

**בידוד מבוסס מיכלים:**  
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

**בידוד תהליכים:**
- **הקשרים מבודדים**: כל הרצת כלי במרחב תהליכים מבודד  
- **תקשורת בין תהליכים**: מנגנוני IPC מאובטחים עם אימות  
- **ניטור תהליכים**: ניתוח התנהגות בזמן ריצה וזיהוי חריגות  
- **אכיפת משאבים**: גבולות חדים על CPU, זיכרון ופעולות I/O  

### **יישום עיקרון ההרשאה הנמוכה ביותר**

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

## 7. **בקרות אבטחה בשרשרת האספקה**

**סיכון OWASP MCP מטופל**: [MCP04 - התקפות שרשרת אספקה](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **אימות תלות**

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

### **ניטור מתמשך**

**זיהוי איומי שרשרת אספקה:**
- **מעקב בריאות התלויות**: הערכה מתמשכת של כל התלויות בנוגע לבעיות אבטחה  
- **אינטגרציה עם מודיעין איומים**: עדכונים בזמן אמת על איומים מתפתחים בשרשרת  
- **ניתוח התנהגותי**: זיהוי התנהגות חריגה ברכיבים חיצוניים  
- **תגובה אוטומטית**: הכלה מיידית של רכיבים שהושפעו  

## 8. **בקרות ניטור וזיהוי**

**סיכון OWASP MCP מטופל**: [MCP08 - חוסר במערכת ביקורת וטלאמרי](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **מערכת ניהול מידע ואירועים אבטחתיים (SIEM)**

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

**אנליטיקה התנהגותית:**
- **אנליטיקה להתנהגות משתמש (UBA)**: זיהוי דפוסי גישה חריגים  
- **אנליטיקה להתנהגות ישות (EBA)**: ניטור התנהגות שרת MCP וכלים  
- **זיהוי חריגות מבוסס למידת מכונה**: זיהוי איומי אבטחה מונחה בינה מלאכותית  
- **קורלציה עם מודיעין איומים**: התאמת פעילויות נצפות עם תבניות התקפה מוכרות  

## 9. **תגובה לתקריות ושיקום**

### **יכולות תגובה אוטומטיות**

**פעולות תגובה מידיות:**
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
- **שימור מסלולי ביקורת**: רישום בלתי נשנה עם שלמות קריפטוגרפית  
- **איסוף ראיות**: איסוף אוטומטי של פריטי אבטחה רלוונטיים  
- **שחזור קו זמן**: רצף מפורט של אירועים שהובילו לתקריות אבטחה  
- **הערכת השפעה**: הערכת היקף הפגיעה וחשיפת נתונים  

## **עקרונות מפתח בארכיטקטורת אבטחה**

### **הגנה בעומק**
- **שכבות אבטחה מרובות**: ללא נקודת כשל בודדת במבנה האבטחה  
- **בקרות מיותרות**: מדדי אבטחה חופפים עבור פונקציות קריטיות  
- **מנגנוני כשל בטוח**: ברירות מחדל מאובטחות כשהמערכות נתקעות בשגיאות או התקפות  

### **יישום Zero Trust**
- **לעולם אל תבטח, תמיד אמת**: אימות רציף של כל הישויות והבקשות  
- **עיקרון ההרשאה הנמוכה ביותר**: מינימום זכויות גישה לכל רכיב  
- **מיקרו-סגמנטציה**: בקרות רשת וגישה גרנולריות  

### **התפתחות אבטחה מתמדת**
- **התאמה לסביבה מאיימת**: עדכונים שוטפים לטיפול באיומים מתפתחים  
- **אפקטיביות בקרות אבטחה**: הערכה ושיפור מתמיד של הבקרות  
- **ציות למפרט**: התאמה לסטנדרטים מתפתחים של אבטחת MCP  

---

## **משאבי יישום**

### **תיעוד רשמי של MCP**
- [מפרט MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [שיטות אבטחה טובות של MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [מפרט הרשאה של MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **משאבי אבטחה של OWASP MCP**
- [מדריך האבטחה של OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 כולל יישום ב-Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - סיכוני אבטחה רשמיים של OWASP MCP  
- [סדנת פסגת אבטחת MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - הדרכת אבטחה מעשית ל-MCP ב-Azure  

### **פתרונות אבטחה של מייקרוסופט**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **תקני אבטחה**
- [שיטות אבטחה טובות ל-OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 לדגמי שפה גדולים](https://genai.owasp.org/)  
- [מסגרת הסייבר של NIST](https://www.nist.gov/cyberframework)  

---

> **חשוב**: בקרות אבטחה אלו משקפות את מפרט MCP הנוכחי (2025-11-25). יש לבדוק תמיד מול [התיעוד הרשמי](https://spec.modelcontextprotocol.io/) שכן התקנים ממשיכים להתפתח במהירות.

## מה הלאה

- חזרה ל: [סקירת מודול אבטחה](./README.md)
- המשך אל: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**הבהרה**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לשים לב כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. המסמך המקורי בשפתו המקורית נחשב למקור הסמכותי. למידע קריטי מומלץ להשתמש בתרגום מקצועי אנושי. אנו לא נושאים באחריות לכל אי-הבנות או פרשנויות שגויות הנובעות משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->