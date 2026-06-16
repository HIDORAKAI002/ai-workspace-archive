# MCP Контроль Безопасности - Обновление Февраль 2026

> **Текущий Стандарт**: Этот документ отражает требования безопасности [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) и официальные [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Протокол Контекста Модели (MCP) значительно развился благодаря улучшенным средствам безопасности, охватывающим как традиционные проблемы безопасности ПО, так и специфические угрозы ИИ. Этот документ обеспечивает полный набор контролей безопасности для защищённых реализаций MCP, согласованных с фреймворком OWASP MCP Top 10.

## 🏔️ Практическое Обучение Безопасности

Для практического опыта реализации безопасности мы рекомендуем **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** — всеобъемлющий пошаговый курс по обеспечению безопасности серверов MCP в Azure с использованием методологии «уязвимость → эксплойт → исправление → проверка».

Все средства безопасности в этом документе соответствуют **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, который предоставляет эталонные архитектуры и рекомендации по реализации для рисков OWASP MCP Top 10 в Azure.

## **ОБЯЗАТЕЛЬНЫЕ Требования Безопасности**

### **Критические Запреты из MCP Specification:**

> **ЗАПРЕЩЕНО**: MCP серверам **НЕЛЬЗЯ** принимать токены, не выданные явно для MCP сервера  
>
> **ЗАПРЕЩЕНО**: MCP серверам **НЕЛЬЗЯ** использовать сессии для аутентификации  
>
> **ТРЕБУЕТСЯ**: MCP серверам, реализующим авторизацию, **НУЖНО** проверять ВСЕ входящие запросы  
>
> **ОБЯЗАТЕЛЬНО**: MCP прокси, использующие статические client ID, **ДОЛЖНЫ** получать согласие пользователя для каждого динамически зарегистрированного клиента

---

## 1. **Контроли Аутентификации и Авторизации**

### **Интеграция с Внешним Провайдером Удостоверений**

**Текущий Стандарт MCP (2025-11-25)** позволяет MCP серверам делегировать аутентификацию внешним провайдерам удостоверений, что представляет собой значительное улучшение безопасности:

**Адресуемый Риск OWASP MCP**: [MCP07 - Недостаточная аутентификация и авторизация](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Преимущества безопасности:**
1. **Исключение рисков собственной аутентификации**: Снижает поверхность уязвимостей, избегая кастомных реализаций аутентификации  
2. **Корпоративный уровень безопасности**: Использование проверенных провайдеров удостоверений, таких как Microsoft Entra ID, с расширенными функциями защиты  
3. **Централизованное управление учетными записями**: Упрощает управление жизненным циклом пользователей, контроль доступа и аудит соответствия  
4. **Многофакторная аутентификация**: Использует MFA корпоративных провайдеров  
5. **Политики условного доступа**: Выгода от контроля доступа на основе риска и адаптивной аутентификации

**Требования к реализации:**
- **Проверка аудитории токена**: Подтверждение, что все токены выданы явно для MCP сервера  
- **Проверка издателя**: Проверка соответствия издателя токена ожидаемому провайдеру удостоверений  
- **Проверка подписи**: Криптографическая валидация целостности токена  
- **Контроль срока действия**: Строгое соблюдение ограничения времени жизни токена  
- **Проверка области действия**: Удостовериться, что токены имеют нужные разрешения для запрашиваемых операций

### **Безопасность Логики Авторизации**

**Критические контроли:**
- **Полные аудиты авторизации**: Регулярные проверки безопасности всех точек принятия решений по авторизации  
- **Безопасные по умолчанию**: Отказ в доступе, если логика авторизации не может принять однозначное решение  
- **Границы разрешений**: Четкое разграничение уровней привилегий и доступа к ресурсам  
- **Логирование аудита**: Полный журнал всех решений по авторизации для мониторинга безопасности  
- **Регулярные обзоры доступа**: Периодическая проверка разрешений пользователей и назначенных прав

## 2. **Безопасность Токенов и Контроли Запрета Проброса**

**Адресуемый Риск OWASP MCP**: [MCP01 - Неверное управление токенами и раскрытие секретов](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Запрет на Проброс Токенов**

**Проброс токенов непосредственно запрещен** в спецификации MCP по причинам критических рисков безопасности:

**Адресуемые риски:**
- **Обход контроля**: Пропуск основных механизмов безопасности, таких как ограничение частоты запросов, валидация и мониторинг трафика  
- **Проблемы с ответственностью**: Невозможность идентификации клиентов, нарушение журналов и расследований  
- **Эксплуатация прокси**: Возможность злоумышленников использовать серверы как прокси для несанкционированного доступа к данным  
- **Нарушение границ доверия**: Нарушение предположений downstream-сервисов о происхождении токенов  
- **Латеральное перемещение**: Использование украденных токенов для расширения атаки через несколько сервисов

**Контроли реализации:**
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

### **Безопасные Шаблоны Управления Токенами**

**Лучшие практики:**
- **Кратковременные токены**: Минимизация окна воздействия через частую ротацию  
- **Выдача по запросу**: Токены выдаются лишь для конкретных операций по необходимости  
- **Безопасное хранение**: Использование аппаратных модулей безопасности (HSM) или надёжных хранилищ ключей  
- **Привязка токенов**: При возможности привязывать токены к конкретным клиентам, сессиям или операциям  
- **Мониторинг и оповещение**: Обнаружение в реальном времени злоупотреблений токенами и несанкционированного доступа

## 3. **Контроли Безопасности Сессий**

### **Предотвращение Захвата Сессии**

**Обрабатываемые векторы атак:**
- **Инъекция в подсказки для захвата сессии**: Вставка вредоносных событий в общую сессионную логику  
- **Имитация сессии**: Несанкционированное использование украденных ID сессий для обхода аутентификации  
- **Атаки с возобновлением потока данных**: Использование механизма возобновления SSE для внедрения вредоносного кода

**Обязательные контроли сессий:**
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

**Защита транспортного уровня:**
- **Принудительное HTTPS**: Все данные сессий передаются только по TLS 1.3  
- **Атрибуты защищенных куки**: HttpOnly, Secure, SameSite=Strict  
- **Закрепление сертификатов**: Для критичных соединений с целью предотвращения MITM-атак

### **Обоснования Stateful vs Stateless**

**Для Stateful реализаций:**
- Общая сессионная информация требует дополнительной защиты от инъекций  
- Очередная модель управления сессиями должна обеспечиваться проверкой целостности  
- Несколько инстансов серверов требуют безопасной синхронизации сессий

**Для Stateless реализаций:**
- Использование JWT или подобных токенов для управления сессиями  
- Криптографическая проверка целостности состояния сессий  
- Меньшая поверхность атаки, но необходима строгая валидация токенов

## 4. **Специфические Контроли Безопасности для ИИ**

**Адресуемые риски OWASP MCP**:  
- [MCP06 - Подмена Потока Подсказок](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Отравление Инструментов](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Внедрение Команд и Их Выполнение](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Защита от Инъекции Подсказок**

**Интеграция Microsoft Prompt Shields:**
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

**Контроли реализации:**
- **Очистка ввода**: Всесторонняя проверка и фильтрация всех пользовательских вводов  
- **Определение границ контента**: Ясное разграничение системных инструкций и пользовательского контента  
- **Иерархия инструкций**: Корректное определение приоритета конфликтующих команд  
- **Мониторинг вывода**: Обнаружение потенциально опасных или искаженных результатов

### **Предотвращение Отравления Инструментов**

**Фреймворк безопасности для инструментов:**
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

**Динамическое управление инструментами:**
- **Процессы утверждения**: Явное согласие пользователя на изменения инструментов  
- **Возможность отката**: Поддержка возврата к предыдущим версиям  
- **Аудит изменений**: Полная история модификаций описаний инструментов  
- **Оценка рисков**: Автоматическая проверка безопасности инструментов

## 5. **Защита от Атак «Смущённый Дьяк»**

### **Безопасность OAuth прокси**

**Контроли предотвращения атак:**
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

**Требования реализации:**
- **Проверка согласия пользователя**: Никогда не пропускать экран согласия при динамической регистрации клиентов  
- **Валидация Redirect URI**: Жёсткий белый список для проверки мест перенаправления  
- **Защита кодов авторизации**: Коды с коротким сроком действия и однократным использованием  
- **Проверка идентификаторов клиентов**: Надёжная проверка учётных данных и метаданных клиента

## 6. **Безопасность Выполнения Инструментов**

### **Песочница и Изоляция**

**Изоляция на базе контейнеров:**
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

**Изоляция процессов:**
- **Отдельные контексты процессов**: Каждый инструмент выполняется в изолированной области процесса  
- **Межпроцессное взаимодействие**: Безопасные механизмы IPC с проверкой  
- **Мониторинг процессов**: Анализ поведения в рантайме и обнаружение аномалий  
- **Ограничение ресурсов**: Жёсткие лимиты CPU, памяти и I/O

### **Реализация Минимальных Привилегий**

**Управление разрешениями:**
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

## 7. **Контроли Безопасности Цепочки Поставок**

**Адресуемый риск OWASP MCP**: [MCP04 - Атаки на цепочку поставок ПО и подмена зависимостей](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Проверка Зависимостей**

**Полная безопасность компонентов:**
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

### **Непрерывный Мониторинг**

**Обнаружение угроз цепочки поставок:**
- **Мониторинг состояния зависимостей**: Непрерывная оценка безопасности всех зависимостей  
- **Интеграция с разведкой угроз**: Обновления в реальном времени по новым угрозам цепочки поставок  
- **Анализ поведения**: Выявление аномального поведения внешних компонентов  
- **Автоматический ответ**: Немедленное изолирование скомпрометированных компонентов

## 8. **Контроли Мониторинга и Обнаружения**

**Адресуемый риск OWASP MCP**: [MCP08 - Отсутствие аудита и телеметрии](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **SIEM (Управление Информацией и Событиями Безопасности)**

**Стратегия комплексного логирования:**
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

### **Обнаружение угроз в реальном времени**

**Аналитика поведения:**
- **User Behavior Analytics (UBA)**: Обнаружение необычной активности пользователей  
- **Entity Behavior Analytics (EBA)**: Мониторинг поведения серверов MCP и инструментов  
- **Машинное обучение для выявления аномалий**: AI обеспечивает распознавание угроз безопасности  
- **Корреляция с разведкой угроз**: Сопоставление активности с известными схемами атак

## 9. **Реагирование на Инциденты и Восстановление**

### **Автоматизированный ответ**

**Немедленные действия:**
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

### **Форензическая поддержка**

**Поддержка расследований:**
- **Сохранение аудита**: Неизменяемый журнал с криптографической целостностью  
- **Сбор доказательств**: Автоматический сбор релевантных артефактов безопасности  
- **Реконструкция хронологии**: Подробный отчет о событиях, приведших к инцидентам  
- **Оценка влияния**: Анализ степени компрометации и утечки данных

## **Ключевые Принципы Безопасной Архитектуры**

### **Защита в Глубину**
- **Многоуровневая безопасность**: Отсутствие единой точки отказа  
- **Избыточные меры**: Перекрывающиеся контроли для критичных функций  
- **Безопасные по умолчанию**: Защита при ошибках и атаках

### **Реализация Zero Trust**
- **Никому не доверять, всё проверять**: Постоянная проверка всех сущностей и запросов  
- **Принцип минимальных прав**: Минимальный доступ для всех компонентов  
- **Микросегментация**: Гранулярный контроль сети и доступа

### **Постоянное Эволюционирование Безопасности**
- **Адаптация к угрозам**: Регулярные обновления для новых угроз  
- **Эффективность контролей**: Непрерывное улучшение и оценка средств защиты  
- **Соответствие спецификации**: Совпадение с меняющимися стандартами MCP

---

## **Ресурсы для Реализации**

### **Официальная Документация MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Безопасность OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Полный обзор OWASP MCP Top 10 с реализацией в Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Официальные риски безопасности MCP от OWASP  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Практическое обучение безопасности MCP в Azure

### **Решения Безопасности Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Стандарты Безопасности**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 для больших языковых моделей](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Важно**: Эти контролы безопасности отражают текущую спецификацию MCP (2025-11-25). Всегда сверяйтесь с последней [официальной документацией](https://spec.modelcontextprotocol.io/), так как стандарты быстро развиваются.

## Что дальше

- Вернуться к: [Обзор модуля безопасности](./README.md)  
- Продолжить к: [Модуль 3: Начало работы](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->