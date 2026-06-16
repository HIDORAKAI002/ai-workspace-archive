# MCP Контроль безпеки - оновлення за лютий 2026

> **Поточний стандарт**: Цей документ відображає вимоги безпеки [MCP Специфікації 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) та офіційні [Кращі практики безпеки MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Протокол Контексту Моделі (MCP) значно зріс у зрілості з посиленням засобів контролю безпеки, які охоплюють як традиційну безпеку програмного забезпечення, так і загрози, специфічні для ШІ. Цей документ надає всебічні засоби контролю безпеки для безпечних впроваджень MCP, узгоджені з рамками OWASP MCP Top 10.

## 🏔️ Практичне навчання з безпеки

Для практичного, практичного досвіду впровадження безпеки ми рекомендуємо **[Майстер-клас MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** — комплексну керовану експедицію з забезпечення безпеки серверів MCP у Azure за методикою «вразливий → експлуатувати → виправити → перевірити».

Всі засоби контролю безпеки в цьому документі відповідають **[Довіднику з безпеки OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)**, який надає архітектурні приклади та специфічні для Azure рекомендації з реалізації для ризиків OWASP MCP Top 10.

## **ОБОВ'ЯЗКОВІ вимоги до безпеки**

### **Критичні заборони з MCP Специфікації:**

> **ЗАБОРОНЕНО**: Сервери MCP **НЕ МОЖУТЬ** приймати будь-які токени, які не були явно видані для сервера MCP  
>
> **ЗАБОРОНЕНО**: Сервери MCP **НЕ МОЖУТЬ** використовувати сесії для аутентифікації  
>
> **НЕОБХІДНО**: Сервери MCP, що реалізують авторизацію, **МАЮТЬ** перевіряти ВСІ вхідні запити  
>
> **ОБОВ'ЯЗКОВО**: Проксі-сервери MCP, які використовують статичні ідентифікатори клієнтів, **МАЮТЬ** отримувати згоду користувача для кожного динамічно зареєстрованого клієнта

---

## 1. **Контроль аутентифікації та авторизації**

### **Інтеграція зовнішнього провайдера ідентифікації**

**Поточний стандарт MCP (2025-11-25)** дозволяє серверам MCP делегувати аутентифікацію зовнішнім провайдерам ідентифікації, що є значним покращенням безпеки:

**Ризик OWASP MCP, що усувається**: [MCP07 - Недостатня аутентифікація та авторизація](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Переваги безпеки:**
1. **Уникнення ризиків власної аутентифікації**: Зменшує площу вразливості, уникнення саморобних реалізацій аутентифікації  
2. **Підприємницький рівень безпеки**: Використання усталених провайдерів ідентифікації, таких як Microsoft Entra ID, з розширеними функціями безпеки  
3. **Централізоване управління ідентифікацією**: Спрощує життєвий цикл користувача, контроль доступу та аудит відповідності  
4. **Багатофакторна аутентифікація**: Спадкування можливостей MFA від підприємницьких провайдерів  
5. **Політики умовного доступу**: Використовує контроль доступу на основі ризиків та адаптивну аутентифікацію  

**Вимоги до впровадження:**
- **Перевірка аудиторії токена**: Переконатись, що всі токени явно видані для сервера MCP  
- **Перевірка видавця**: Валідація, що видавець токена співпадає з очікуваним провайдером ідентифікації  
- **Перевірка підпису**: Криптографічна валідація цілісності токена  
- **Дотримання терміну дії**: Строге дотримання обмежень часу життя токена  
- **Перевірка обсягів дозволів**: Забезпечення, що токени містять відповідні дозволи для запитуваних операцій  

### **Безпека логіки авторизації**

**Критичні засоби контролю:**
- **Повні аудити авторизації**: Регулярний огляд безпеки всіх точок прийняття рішень з авторизації  
- **Безпечні налаштування за замовчуванням**: Відмова в доступі, якщо логіка авторизації не може дати чітку відповідь  
- **Обмеження прав**: Чітке розмежування рівнів привілеїв та доступу до ресурсів  
- **Логування аудитів**: Повне ведення журналів усіх рішень авторизації для моніторингу безпеки  
- **Регулярний перегляд доступу**: Періодична перевірка дозволів користувачів та призначень привілеїв  

## 2. **Безпека токенів і контроль за передачами**

**Ризик OWASP MCP, що усувається**: [MCP01 - Неправильне керування токенами та розкриття секретів](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Заборона передачі токенів**

**Пряме передавання токенів категорично заборонено** в MCP Специфікації авторизації через критичні ризики безпеки:

**Вирішувані загрози:**
- **Обхід контролю**: Оминає ключові заходи безпеки, як-от обмеження швидкості, валідацію запитів і моніторинг трафіку  
- **Відсутність підзвітності**: Робить ідентифікацію клієнта неможливою, порушуючи журнали аудиту та розслідування інцидентів  
- **Екфільтрація через проксі**: Дозволяє зловмисникам використовувати сервери як проксі для несанкціонованого доступу до даних  
- **Порушення меж довіри**: Порушує припущення довіри нижчестоячих сервісів щодо походження токенів  
- **Бічний рух**: Компрометовані токени в багатьох сервісах сприяють розширенню атаки  

**Контрольні заходи впровадження:**
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

### **Безпечні шаблони керування токенами**

**Кращі практики:**
- **Короткочасні токени**: Мінімізувати час експозиції шляхом частої ротації токенів  
- **Видача за потребою**: Видавати токени лише тоді, коли вони потрібні для конкретних операцій  
- **Безпечне зберігання**: Використовувати апаратні модулі безпеки (HSM) або захищені сховища ключів  
- **Прив’язка токенів**: За можливості прив’язувати токени до конкретних клієнтів, сесій або операцій  
- **Моніторинг та оповіщення**: Виявлення в реальному часі неправильного використання токенів або несанкціонованого доступу  

## 3. **Контролі безпеки сесії**

### **Запобігання захопленню сесій**

**Опрацьовані вектори атак:**
- **Ін’єкція запрошення до захоплення сесії**: Зловмисні події, впроваджені до спільного стану сесії  
- **Імперсонація сесії**: Несанкціоноване використання викрадених ідентифікаторів сесії для обходу аутентифікації  
- **Атаки з відновленням потоку**: Використання відновлення подій від сервера для впровадження шкідливого контенту  

**Обов’язкові заходи безпеки сесії:**
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

**Безпека транспорту:**
- **Обов’язкове HTTPS**: Весь трафік сесії через TLS 1.3  
- **Безпечні атрибути cookie**: HttpOnly, Secure, SameSite=Strict  
- **Фіксація сертифікатів**: Для критичних підключень для запобігання атакам MITM  

### **Розгляд стану сесії: стейтфул vs стейтлес**

**Для stateful впроваджень:**
- Спільний стан сесії потребує додаткового захисту від ін’єкцій  
- Керування сесіями на основі черг потребує перевірки цілісності  
- Кілька серверних інстанцій потребують безпечної синхронізації стану сесії  

**Для stateless впроваджень:**
- Керування сесіями через JWT або подібні токени  
- Криптографічна верифікація цілісності стану сесії  
- Зменшена площа для атак, але потребує надійної валідації токенів  

## 4. **Специфічні для ШІ контрзаходи безпеки**

**Опрацьовані ризики OWASP MCP**:
- [MCP06 - Саботаж потоку запитів](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Отруєння інструментів](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Ін’єкція команд і виконання](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Захист від ін’єкції підказок**

**Інтеграція Microsoft Prompt Shields:**
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

**Контрольні заходи:**
- **Санітизація вхідних даних**: Комплексна валідація та фільтрація всіх вхідних користувацьких даних  
- **Визначення меж вмісту**: Чітке розмежування між інструкціями системи та вмістом користувача  
- **Ієрархія інструкцій**: Правила пріоритету для конфліктних інструкцій  
- **Моніторинг вихідних даних**: Виявлення потенційно шкідливого або підробленого виводу  

### **Запобігання отруєнню інструментів**

**Рамки безпеки інструментів:**
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

**Динамічне керування інструментами:**
- **Процеси затвердження**: Явна згода користувача для змін інструментів  
- **Можливість відкату**: Відновлення попередніх версій інструментів  
- **Аудит змін**: Повна історія змін визначень інструментів  
- **Оцінка ризиків**: Автоматизована оцінка безпеки інструментів  

## 5. **Запобігання атакам "Confused Deputy"**

### **Безпека OAuth проксі**

**Контрольні заходи запобігання атакам:**
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

**Вимоги до впровадження:**
- **Перевірка згоди користувача**: Ніколи не пропускати екрани згоди для динамічної реєстрації клієнтів  
- **Валідація Redirect URI**: Строгий перевірений за білим списком список дозволених адрес переадресації  
- **Захист коду авторизації**: Коди з коротким терміном життя та одноразовим використанням  
- **Перевірка ідентичності клієнта**: Надійна валідація облікових даних клієнта та метаданих  

## 6. **Безпека виконання інструментів**

### **Ізоляція та пісочниця**

**Ізоляція на базі контейнерів:**
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

**Ізоляція процесів:**
- **Окремі контексти процесів**: Кожне виконання інструмента в ізольованому процесному просторі  
- **Міжпроцесна взаємодія**: Безпечні механізми IPC з валідацією  
- **Моніторинг процесів**: Аналіз поведінки під час виконання та виявлення аномалій  
- **Обмеження ресурсів**: Жорсткі ліміти CPU, пам’яті та операцій введення/виводу  

### **Реалізація найменших привілеїв**

**Управління дозволами:**
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

## 7. **Контроль безпеки ланцюга постачання**

**Опрацьований ризик OWASP MCP**: [MCP04 - Атаки на ланцюг постачання ПЗ та підміна залежностей](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Перевірка залежностей**

**Всебічна безпека компонентів:**
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

### **Безперервний моніторинг**

**Виявлення загроз ланцюга постачання:**
- **Моніторинг здоров’я залежностей**: Безперервна оцінка всіх залежностей на предмет вразливостей  
- **Інтеграція розвідувальних даних про загрози**: Оновлення в реальному часі про нові загрози ланцюга постачання  
- **Аналіз поведінки**: Виявлення аномальної поведінки зовнішніх компонентів  
- **Автоматична реакція**: Негайне ізолювання скомпрометованих компонентів  

## 8. **Контроль моніторингу та виявлення**

**Опрацьований ризик OWASP MCP**: [MCP08 - Відсутність аудиту та телеметрії](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Системи управління інформацією про безпеку та подіями (SIEM)**

**Всебічна стратегія логування:**
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

### **Виявлення загроз у режимі реального часу**

**Аналітика поведінки:**
- **Аналітика поведінки користувачів (UBA)**: Виявлення аномальних шаблонів доступу користувачів  
- **Аналітика поведінки об’єктів (EBA)**: Моніторинг поведінки серверів MCP та інструментів  
- **Виявлення аномалій за допомогою машинного навчання**: Ідентифікація загроз безпеки з підтримкою ШІ  
- **Кореляція розвідувальних даних про загрози**: Порівняння спостережуваних дій з відомими патернами атак  

## 9. **Реагування на інциденти та відновлення**

### **Автоматизовані можливості реагування**

**Негайні заходи реагування:**
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

### **Функції криміналістики**

**Підтримка розслідувань:**
- **Збереження аудиторського сліду**: Незмінне логування з криптографічною цілісністю  
- **Збір доказів**: Автоматизоване збирання релевантних артефактів безпеки  
- **Відтворення хронології**: Детальна послідовність подій, що призвели до інцидентів безпеки  
- **Оцінка впливу**: Визначення масштабу компрометації та витоку даних  

## **Ключові принципи архітектури безпеки**

### **Глибокий захист (Defense in Depth)**
- **Багаторівневі шари безпеки**: Відсутність єдиного вузького місця в архітектурі безпеки  
- **Резервні контролі**: Перекриваючі заходи безпеки для критичних функцій  
- **Механізми безпечного відмовлення**: Безпечні налаштування за замовчуванням при помилках або атаках  

### **Впровадження Zero Trust**
- **Ніколи не довіряй, завжди перевіряй**: Постійна валідація всіх сутностей та запитів  
- **Принцип найменших привілеїв**: Мінімальні права доступу для всіх компонентів  
- **Мікросегментація**: Детальний контроль мережевого трафіку та доступу  

### **Безперервна еволюція безпеки**
- **Адаптація до ландшафту загроз**: Регулярні оновлення для усунення нових загроз  
- **Оцінка ефективності засобів контролю**: Постійне вдосконалення заходів безпеки  
- **Відповідність специфікації**: Узгодження з оновленнями стандартів безпеки MCP  

---

## **Ресурси для впровадження**

### **Офіційна документація MCP**
- [MCP Специфікація (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Кращі практики безпеки MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Специфікація авторизації MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Ресурси OWASP MCP безпеки**
- [Довідник OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) — Повний OWASP MCP Top 10 з Azure впровадженням  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) — Офіційні ризики безпеки MCP  
- [Майстер-клас MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) — Практичне навчання безпеці MCP в Azure  

### **Рішення Microsoft для безпеки**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Стандарти безпеки**
- [Кращі практики безпеки OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 для великих мов моделей](https://genai.owasp.org/)
- [Кібербезпековий фреймворк NIST](https://www.nist.gov/cyberframework)

---

> **Важливо**: Ці засоби контролю безпеки відображають поточну специфікацію MCP (2025-11-25). Завжди перевіряйте актуальність за останньою [офіційною документацією](https://spec.modelcontextprotocol.io/), оскільки стандарти швидко розвиваються.

## Що далі

- Повернутися до: [Огляд модуля безпеки](./README.md)
- Продовжити до: [Модуль 3: Початок роботи](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->