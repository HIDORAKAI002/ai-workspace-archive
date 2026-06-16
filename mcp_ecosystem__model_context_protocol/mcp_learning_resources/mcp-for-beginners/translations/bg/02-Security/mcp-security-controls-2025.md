# MCP Контроли за сигурност - Актуализация февруари 2026 г.

> **Текущ стандарт**: Този документ отразява изискванията за сигурност на [MCP Спецификация 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) и официалните [MCP Най-добри практики за сигурност](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Протоколът за контекст на модела (MCP) е узрял значително с подобрени контроли за сигурност, адресиращи както традиционната софтуерна сигурност, така и специфични за ИИ заплахи. Този документ предоставя изчерпателни контролни мерки за сигурност за сигурни реализации на MCP, съгласувани с рамката OWASP MCP Top 10.

## 🏔️ Практическо обучение по сигурност

За практичен опит в прилагането на сигурност препоръчваме **[Работилница MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - изчерпателна ръководена експедиция за осигуряване сигурността на MCP сървъри в Azure чрез методологията "уязвим → експлоатиране → коригиране → валидиране".

Всички контролни мерки за сигурност в този документ са съобразени с **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, която предоставя референтни архитектури и специфични указания за внедряване в Azure за рисковете в OWASP MCP Top 10.

## **ЗАДЪЛЖИТЕЛНИ Изисквания за сигурност**

### **Критични забрани от MCP Спецификацията:**

> **ЗАБРАНЕНО**: MCP сървърите **НЕ ТРЯБВА** да приемат никакви токени, които не са изрично издадени за MCP сървъра  
>
> **ЗАБРАНЕНО**: MCP сървърите **НЕ ТРЯБВА** да използват сесии за удостоверяване  
>
> **ИЗИСКВА СЕ**: MCP сървърите, които изпълняват авторизация, **ТРЯБВА** да проверяват ВСИЧКИ входящи заявки  
>
> **ЗАДЪЛЖИТЕЛНО**: MCP прокси сървърите, използващи статични клиентски идентификатори, **ТРЯБВА** да получават съгласие от потребителя за всеки динамично регистриран клиент

---

## 1. **Контроли за удостоверяване и авторизация**

### **Интеграция с външен доставчик на идентичност**

**Текущ стандарт MCP (2025-11-25)** позволява MCP сървърите да делегират удостоверяването на външни доставчици на идентичност, което представлява значително подобрение в сигурността:

**Адресиран риск от OWASP MCP**: [MCP07 - Недостатъчно удостоверяване и авторизация](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Ползи за сигурността:**
1. **Премахва рисковете от персонализирано удостоверяване**: Намалява уязвимите места чрез избягване на персонализирани реализации на удостоверяване  
2. **Сигурност от корпоративно ниво**: Използва утвърдени доставчици на идентичност като Microsoft Entra ID с напреднали функции за сигурност  
3. **Централизирано управление на идентичността**: Опростява управлението на жизнения цикъл на потребителите, контрола на достъпа и одита за съответствие  
4. **Мултифакторно удостоверяване**: Наследява възможностите за MFA от корпоративните доставчици на идентичност  
5. **Политики за условен достъп**: Възползва се от контролирани според риска и адаптивни методи за удостоверяване

**Изисквания за изпълнение:**
- **Проверка на аудитория на токена**: Потвърждаване, че всички токени са изрично издадени за MCP сървъра  
- **Проверка на издателя**: Удостоверяване, че издателят на токена съответства на очаквания доставчик на идентичност  
- **Проверка на подписа**: Криптографска валидация на интегритета на токена  
- **Налагане на срокове на валидност**: Строго прилагане на ограниченията за време на токена  
- **Проверка на обхвата**: Осигуряване, че токените съдържат подходящи права за заявените операции

### **Сигурност на логиката за авторизация**

**Критични контроли:**
- **Всеобхватни одити на авторизацията**: Редовни прегледи на всички точки на вземане на решения за авторизация  
- **Безопасни по подразбиране решения**: Отказ на достъп, когато логиката за авторизация не може да вземе категорично решение  
- **Граници на разрешенията**: Ясно разделяне на различните нива на права и достъп до ресурси  
- **Логване на одита**: Пълно регистриране на всички решения за авторизация за мониторинг на сигурността  
- **Редовни прегледи на достъпа**: Периодична проверка на разрешенията и разпределението на правата на потребителите

## 2. **Сигурност на токените и контроли срещу пропускане на токени**

**Адресиран риск от OWASP MCP**: [MCP01 - Неправилно управление на токени и изтичане на тайни](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Предотвратяване на пропускане на токени**

**Пропускането на токени е изрично забранено** в Спецификацията за авторизация на MCP поради критични рискове за сигурността:

**Адресирани рискове за сигурността:**
- **Заобикаляне на контроли**: Пропуска жизненоважни контроли като ограничаване на честотата, проверка на заявките и мониторинг на трафика  
- **Разрушаване на отчетността**: Прави идентификацията на клиента невъзможна, компрометирайки одитните записи и разследването на инциденти  
- **Експлоатация чрез прокси**: Позволява злонамерени актьори да използват сървъри като проксита за неоторизиран достъп до данни  
- **Нарушаване на границите на доверие**: Разрушава доверителните предположения на downstream услуги за произхода на токените  
- **Странично разпространение**: Компрометирани токени в множество услуги позволяват разширяване на атаката

**Контроли за изпълнение:**
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

### **Сигурни модели за управление на токени**

**Най-добри практики:**
- **Краткоживотни токени**: Минимизиране на излагането чрез често въртене на токени  
- **Издаване точно навреме**: Издаване на токени само когато са необходими за конкретни операции  
- **Сигурно съхранение**: Използване на хардуерни модули за сигурност (HSM) или защитени хранилища за ключове  
- **Привързване на токена**: Свързване на токени със специфични клиенти, сесии или операции, когато е възможно  
- **Мониторинг и аларми**: Откриване в реално време на злоупотреба с токени или неоторизирани модели на достъп

## 3. **Контроли за сигурност на сесиите**

### **Предотвратяване на похищаване на сесии**

**Обсъждани вектори на атака:**
- **Инжектиране в подкани за похищаване на сесия**: Злонамерени събития, инжектирани в споделеното състояние на сесията  
- **Имперсонация на сесия**: Неоторизирана употреба на откраднати идентификатори на сесия за заобикаляне на удостоверяване  
- **Атаки с възобновяване на потоци**: Експлоатация на възстановяването на събития, изпращани от сървъра, за инжектиране на злонамерено съдържание

**Задължителни контролни мерки за сесии:**
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

**Сигурност при трансфер:**
- **Изискване за HTTPS**: Всички комуникации на сесии през TLS 1.3  
- **Атрибути на сигурни бисквитки**: HttpOnly, Secure, SameSite=Strict  
- **Закотвяне на сертификати**: За критични връзки за предотвратяване на MITM атаки

### **Съображения за състояние на сесиите - със състояние срещу без състояние**

**За реализации със състояние:**
- Общото състояние на сесията изисква допълнителна защита срещу инжектиране  
- Управлението на сесии на опашка изисква проверка на интегритет  
- Множество сървърни инстанции изискват сигурна синхронизация на сесийното състояние

**За реализации без състояние:**
- Управление на сесии чрез JWT или подобни токени  
- Криптографска проверка на интегритет на сесийното състояние  
- Намален обхват на атака, но изисква надеждна проверка на токените

## 4. **Специфични контроли за сигурност за ИИ**

**Адресирани рискове в OWASP MCP**:  
- [MCP06 - Саботаж на потока на подкани](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Отравяне на инструменти](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Инжектиране и изпълнение на команди](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Защита срещу инжектиране в подкани**

**Интеграция с Microsoft Prompt Shields:**  
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
  
**Контроли за изпълнение:**
- **Санитизация на входни данни**: Всеобхватна валидация и филтриране на всички потребителски входове  
- **Определяне на граници на съдържанието**: Ясно разделяне между системни инструкции и потребителско съдържание  
- **Йерархия на инструкциите**: Подходящи правила за приоритет при противоречиви инструкции  
- **Мониторинг на изхода**: Откриване на потенциално вредни или манипулирани изходни данни

### **Предотвратяване на отравяне на инструменти**

**Рамка за сигурност на инструментите:**  
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
  
**Динамично управление на инструменти:**
- **Работни потоци за одобрение**: Ясно съгласие от потребителя за промени в инструментите  
- **Възможности за връщане назад**: Способност за възстановяване на предишни версии на инструментите  
- **Одит на промени**: Пълна история на модификациите в дефинициите на инструментите  
- **Оценка на риска**: Автоматична оценка на сигурността на инструментите

## 5. **Предотвратяване на атаки на объркан заместник**

### **Сигурност на OAuth прокси**

**Контроли за предотвратяване на атаки:**  
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
  
**Изисквания за изпълнение:**
- **Проверка на потребителско съгласие**: Никога не пропускайте екраните за съгласие при динамична регистрация на клиенти  
- **Валидация на Redirect URI**: Строг контрол на позволените дестинации за пренасочване чрез бял списък  
- **Защита на кода за авторизация**: Краткоживотни кодове с изпълнение за еднократна употреба  
- **Потвърждаване на идентичността на клиента**: Здрава проверка на клиентските идентификации и метаданни

## 6. **Сигурност при изпълнение на инструменти**

### **Изпълнение в пясъчник и изолация**

**Изолация на базата на контейнери:**  
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
  
**Изолация на процеса:**
- **Отделни контексти на процеса**: Всяко изпълнение на инструмент в изолирано процесно пространство  
- **Междупроцесна комуникация**: Сигурни IPC механизми с валидация  
- **Мониторинг на процесите**: Анализ на поведение и откриване на аномалии на работно време  
- **Налагане на ресурси**: Строги ограничения за CPU, памет и операции с входно-изходни данни

### **Прилагане на принципа за най-малко привилегии**

**Управление на разрешенията:**  
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
  
## 7. **Контроли за сигурност на веригата на доставки**

**Адресиран риск от OWASP MCP**: [MCP04 - Атаки във веригата на доставки и манипулация на зависимости](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Проверка на зависимости**

**Изчерпателна сигурност на компонентите:**  
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
  
### **Непрекъснат мониторинг**

**Откриване на заплахи във веригата на доставки:**
- **Мониторинг на здравето на зависимости**: Непрекъсната оценка на всички зависимости за проблеми със сигурността  
- **Интеграция на разузнаване на заплахи**: Актуализации в реално време за възникващи заплахи във веригата на доставки  
- **Поведенчески анализ**: Откриване на необичайно поведение в външни компоненти  
- **Автоматизирана реакция**: Незабавно ограничаване на компрометирани компоненти

## 8. **Контроли за мониторинг и откриване**

**Адресиран риск от OWASP MCP**: [MCP08 - Липса на одит и телеметрия](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Информационно управление на сигурността и събитията (SIEM)**

**Изчерпателна стратегия за регистриране:**  
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
  
### **Откриване на заплахи в реално време**

**Анализ на поведението:**
- **Аналитика на потребителското поведение (UBA)**: Откриване на необичайни модели на достъп на потребители  
- **Аналитика на поведение на обекти (EBA)**: Мониторинг на поведението на MCP сървъри и инструменти  
- **Откриване на аномалии чрез машинно обучение**: ИИ за идентифициране на заплахи за сигурността  
- **Корелация с разузнаване за заплахи**: Съпоставяне на наблюдаваните дейности със известни модели на атаки

## 9. **Отговор при инциденти и възстановяване**

### **Автоматизирани възможности за реакция**

**Незабавни действия:**
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
  
### **Възможности за криминалистика**

**Поддръжка на разследване:**
- **Запазване на одитния след**: Непроменяема регистрация с криптографска цялост  
- **Събиране на доказателства**: Автоматизирано събиране на релевантни артефакти за сигурност  
- **Възстановяване на времевата линия**: Подробна последователност на събития, довели до инциденти  
- **Оценка на въздействието**: Оценяване на обхвата на компрометиране и излагане на данни

## **Ключови принципи на архитектурата за сигурност**

### **Защита в дълбочина**
- **Множество слоеве на сигурност**: Няма единична точка на провал в архитектурата за сигурност  
- **Резервирани контроли**: Наслагване на мерки за сигурност за критични функции  
- **Механизми за безопасност**: Сигурни настройки по подразбиране при грешки или атаки

### **Прилагане на Zero Trust**
- **Никога не се доверявай, винаги проверявай**: Непрекъсната валидация на всички обекти и заявки  
- **Принцип на най-малко привилегии**: Минимални права за всички компоненти  
- **Микросегментиране**: Фин контрол на мрежата и достъпа

### **Непрекъсната еволюция на сигурността**
- **Адаптация към ландшафта на заплахите**: Редовни актуализации за новопоявяващи се заплахи  
- **Ефективност на контрола на сигурността**: Постоянна оценка и подобрение на контролите  
- **Съответствие със спецификацията**: Съгласуваност с развиващите се стандарти за сигурност на MCP

---

## **Ресурси за изпълнение**

### **Официална MCP документация**
- [MCP Спецификация (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Най-добри практики за сигурност](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Спецификация за авторизация](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP ресурси за сигурност на MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Изчерпателен OWASP MCP Top 10 с указания за внедряване в Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Официални рискове за сигурност на OWASP MCP  
- [Работилница MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Практическо обучение по сигурност за MCP в Azure

### **Microsoft решения за сигурност**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Стандарти за сигурност**
- [Най-добри практики за OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 за големи езикови модели](https://genai.owasp.org/)  
- [Киберсигурностен рамков стандарт NIST](https://www.nist.gov/cyberframework)

---

> **Важно**: Тези контролни мерки за сигурност отразяват текущата MCP спецификация (2025-11-25). Винаги проверявайте последната [официална документация](https://spec.modelcontextprotocol.io/), тъй като стандартите се развиват бързо.

## Какво следва

- Върнете се на: [Обзор на модула за сигурност](./README.md)  
- Продължете към: [Модул 3: Започване](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->