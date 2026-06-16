# MCP Контроле безбедности - Фебруар 2026. ажурирање

> **Тренутни стандард**: Овај документ одражава захтеве за безбедност из [MCP спецификације 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) и званичне [MCP најбоље праксе за безбедност](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Протокол моделског контекста (MCP) је значајно унапређен са побољшаним контролама безбедности које обухватају како традиционалне безбедносне захтеве софтвера тако и претње специфичне за вештачку интелигенцију. Овај документ пружа свеобухватне контроле безбедности за сигурне имплементације MCP-а усклађене са OWASP MCP Top 10 оквиром.

## 🏔️ Практичне обуке безбедности

За практично искуство у имплементацији безбедности, препоручујемо **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - детаљну вођену експедицију ка обезбеђивању MCP сервера на Azure-у користећи методологију "ранив → експлоатиши → поправи → провери".

Све контроле безбедности у овом документу усаглашене су са **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, који пружа референтне архитектуре и смернице за имплементацију на Azure-у у вези са OWASP MCP Top 10 ризицима.

## **ОБАВЕЗНИ Безбедносни Захтеви**

### **Критичне Забране из MCP спецификације:**

> **ЗАБРАЊЕНО**: MCP сервери **НЕ СМЕЈУ** прихватати токене који нису експлицитно издати за MCP сервер  
>
> **ЗАБРАЊЕНО**: MCP сервери **НЕ СМЕЈУ** користити сесије за аутентификацију  
>
> **ЗАХТЕВАНО**: MCP сервери који имплементирају ауторизацију **МОРАЈУ** проверити СВЕ долазне захтеве  
>
> **ОБАВЕЗНО**: MCP прокси сервери који користе статичке client ID-ове **МОРАЈУ** добити сагласност корисника за сваког динамички регистрованог клијента

---

## 1. **Контроле аутентификације и ауторизације**

### **Интеграција спољашњег провајдера идентитета**

**Тренутни MCP стандард (2025-11-25)** дозвољава MCP серверима да делегирају аутентификацију спољашњим провајдерима идентитета, што представља значајно безбедносно унапређење:

**Ризик OWASP MCP адресиран**: [MCP07 - Недовољна аутентификација и ауторизација](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Безбедносне предности:**
1. **Уклања ризике прилагођене аутентификације**: Смањује површину рањивости избегавањем прилагођених имплементација аутентификације
2. **Безбедност корпоративног нивоа**: Користи утврђене провајдере идентитета као што је Microsoft Entra ID са напредним безбедносним функцијама
3. **Централизовано управљање идентитетом**: Једноставније управљање животним циклусом корисника, контролом приступа и ревизијом усаглашености
4. **Мултифакторска аутентификација**: Наслеђује MFA могућности од корпоративних провајдера идентитета
5. **Политике условног приступа**: Искористи контроле приступа засноване на ризику и адаптивну аутентификацију

**Захтеви за имплементацију:**
- **Валидација публике токена**: Проверите да ли су сви токени експлицитно издати за MCP сервер
- **Валидација издаваоца**: Верификујте да издаваоц токена одговара очекиваном провајдеру идентитета
- **Потписна верификација**: Криптографска верификација интегритета токена
- **Примењивање истека**: Строго спровођење ограничења трајања токена
- **Валидација опсега**: Осигурајте да токени садрже одговарајуће дозволе за захтеване операције

### **Безбедност логике ауторизације**

**Критичне контроле:**
- **Комплетне ревизије ауторизације**: Редовни безбедносни прегледи свих тачака доношења одлука о ауторизацији  
- **Безбедни подразумевани услови**: Одбиј приступ када логика ауторизације не може донети коначну одлуку  
- **Граничне дозволе**: Јасна разграничења између различитих нивоа привилегија и приступа ресурсима  
- **Логовање одлука**: Потпуно евидентирање свих одлука о ауторизацији за безбедносни надзор  
- **Редовне провере приступа**: Периодична верификација дозвола корисника и додељених привилегија

## 2. **Безбедност токена и контроле против преноса**

**Ризик OWASP MCP адресиран**: [MCP01 - Погрешна управа токена и излагање тајни](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Превенција преноса токена**

**Пренос токена је експлицитно забрањен** у MCP спецификацији за ауторизацију због критичних ризика безбедности:

**Ризици безбедности који се адресирају:**
- **Обилажење контрола**: Заобилази важне контроле као што су ограничење брзине, валидација захтева и мониторинг саобраћаја  
- **Проблеми одговорности**: Онемогућава идентификацију клијента, кварећи ревизијске трагове и истраге инцидената  
- **Извлачење преко проксија**: Омогућава злоћудним актерима да користе сервере као прокси за неовлашћен приступ подацима  
- **Прекидани граници поверења**: Крши претпоставке о пореклу токена у сервисима низводно  
- **Латерално кретање**: Компромитовани токени омогућавају шире нападе између више сервиса

**Контроле за имплементацију:**
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

### **Обрасци сигурног управљања токенима**

**Најбоље праксе:**
- **Токени са кратким роком важења**: Минимизирајте време излагања честом ротацијом токена  
- **Издавање на захтев**: Издавање токена само када је потребно за специфичне операције  
- **Сигурно чување**: Користите хардверске безбедносне модуле (HSM) или сигурне ковчеге кључева  
- **Везивање токена**: Вежите токене за одређене клијенте, сесије или операције где је то могуће  
- **Мониторинг и узбуњивање**: Детекција у реалном времену злоупотребе токена или неовлашћених приступа

## 3. **Контроле безбедности сесије**

### **Превенција отмице сесије**

**Адресирани напади:**
- **Prompt Injection у отмици сесије**: Злонамерни догађаји убризгани у дељени контекст сесије  
- **Имитација сесије**: Неовлашћена употреба украдених ID-јева сесије за заобилажење аутентификације  
- **Напади наставка стрима**: Искоришћавање наставка сервером послатих догађаја за убризгавање злонамерног садржаја

**Обавезне контроле сесије:**
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

**Транспортна безбедност:**
- **Присила на коришћење HTTPS**: Сва комуникација сесије преко TLS 1.3  
- **Атрибути безбедних колачића**: HttpOnly, Secure, SameSite=Strict  
- **Пиновање сертификата**: За критичне конекције да би се спречили MITM напади

### **Разматрања о државности сесија**

**За државне (stateful) имплементације:**
- Дељено стање сесије захтева додатну заштиту против инекција  
- Управљање сесијама у реду захтева верификацију интегритета  
- Више инстанци сервера захтевају сигурну синхронизацију стања сесије

**За бездржавне (stateless) имплементације:**
- Управљање сесијама засновано на JWT или сличним токенима  
- Криптографска верификација интегритета стања сесије  
- Смањена површина напада али захтева јаку валидацију токена

## 4. **Безбедносне контроле специфичне за вештачку интелигенцију**

**Адресирани OWASP MCP ризици**:  
- [MCP06 - Саботажа тока намера](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Зараживање алата](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Инјекција и извршење команди](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Заштита од Prompt Injection напада**

**Интеграција Microsoft Prompt Shields:**  
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
  
**Контроле имплементације:**
- **Санитизација улазних података**: Комплетна валидација и филтрирање свих корисничких уноса  
- **Дефинисање граница садржаја**: Јасна разграничења између системских инструкција и корисничког садржаја  
- **Хијерархија инструкција**: Правилна примена правила прeстижу уколико постоје конфликтне инструкције  
- **Мониторинг излаза**: Детекција потенцијално штетних или манипулисаних излаза

### **Превенција тровања алата**

**Безбедносни оквир алата:**  
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
  
**Динамичко управљање алатима:**  
- **Радни токови одобрења**: Јасна сагласност корисника за измене алата  
- **Могућност враћања промена**: Опције за опоравак претходних верзија алата  
- **Ревизија промена**: Потпуно праћење историје измена у дефиницијама алата  
- **Процена ризика**: Аутоматизована процена безбедносног стања алата

## 5. **Превенција напада Confused Deputy**

### **OAuth Proxy безбедност**

**Контроле за превенцију напада:**
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
  
**Захтеви за имплементацију:**
- **Валидација корисничке сагласности**: Никад не прескачите екране сагласности за динамичку регистрацију клијената  
- **Валидација Redirect URI**: Строга валидација дозволјених одредишних URI-јева на бази беле листе  
- **Заштита кодова ауторизације**: Краткотрајни кодови са применом једнократне употребе  
- **Верификација идентитета клијента**: Робустна верификација акредитива и метаподатака клијента

## 6. **Безбедност извршавања алата**

### **Песак кутија и изолација**

**Изолација заснована на контејнерима:**  
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
  
**Изолација процеса:**  
- **Одвојени контексти процеса**: Свако извршавање алата у изолованом процесном простору  
- **Међупроцесна комуникација**: Сигурни IPC механизми са валидацијом  
- **Надзор процеса**: Анализа понашања у току извршавања и детекција аномалија  
- **Ограничавања ресурса**: Строга ограничења CPU, меморије и I/O операција

### **Имплементација најмањег привилегија**

**Управљање дозволама:**  
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
  
## 7. **Контроле безбедности ланца снабдевања**

**Ризик OWASP MCP адресиран**: [MCP04 - Напади на софтверски ланац снабдевања и манипулације зависностима](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Верификација зависности**

**Свеобухватна безбедност компоненти:**  
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
  
### **Континуирани мониторинг**

**Детекција претњи ланцу снабдевања:**
- **Мониторинг здравља зависности**: Континуирана процена свих зависности по питању безбедности  
- **Интеграција обавештајних података о претњама**: Ажурирања у реалном времену о појављујућим претњама ланцу снабдевања  
- **Бихејвиорална анализа**: Детекција необичног понашања у спољним компонентама  
- **Аутоматизовани одговор**: Одмахно изоловање компромитованих компоненти

## 8. **Контроле мониторинга и детекције**

**Ризик OWASP MCP адресиран**: [MCP08 - Недостатак ревизије и телеметрије](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **СИЕМ (Security Information and Event Management)**

**Стратегија свеобухватног логовања:**  
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
  
### **Детекција претњи у реалном времену**

**Бихејвиорална анализа:**  
- **User Behavior Analytics (UBA)**: Детекција необичних образаца приступа корисника  
- **Entity Behavior Analytics (EBA)**: Мониторинг понашања MCP сервера и алата  
- **Машинско учење за детекцију аномалија**: AI-подржано препознавање безбедносних претњи  
- **Корелација обавештајних података о претњама**: Усклађивање посматраних активности са познатим образцима напада

## 9. **Одговор на инциденте и опоравак**

### **Аутоматизоване могућности одговора**

**Одмах предузете радње:**  
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
  
### **Форензичке могућности**

**Подршка истраживању:**  
- **Чување ревизијског трагa**: Неменијајуће логовање са криптографским интегритетом  
- **Прикупљање доказа**: Аутоматизовано сабирање релевантних безбедносних артефаката  
- **Реконструкција временске линије**: Детаљан низ догађаја који воде до безбедносних инцидената  
- **Процена утицаја**: Евалуација обима компромитовања и излагања подацима

## **Кључни принципи безбедносне архитектуре**

### **Одбрана у дубину**
- **Више слојева безбедности**: Ниједна једина тачка квара у архитектури безбедности  
- **Резервне контроле**: Преклапајуће мере безбедности за критичне функције  
- **Механизми безбедносних подразумеваних вредности**: Сигурни подразумевани услови када системи наиђу на грешке или нападе

### **Имплементација принципа Zero Trust**
- **Никада не веруј, увек проверавај**: Континуирана верификација свих ентитета и захтева  
- **Принцип најмањих привилегија**: Минимална права приступа за све компоненте  
- **Микро-сегментација**: Детаљне контроле мреже и приступа

### **Континуирани развој безбедности**
- **Прилагођавање пејзажу претњи**: Редовна ажурирања за новонастале претње  
- **Ефикасност контрола безбедности**: Континуирано оцењивање и унапређење контрола  
- **Усклађеност са спецификацијом**: Усклађеност са развијајућим MCP безбедносним стандардима

---

## **Ресурси за имплементацију**

### **Званична MCP документација**
- [MCP Спецификација (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Најбоље праксе за безбедност](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Спецификација ауторизације](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP безбедносни ресурси**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Свеобухватни OWASP MCP Top 10 са Azure имплементацијом  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Званични OWASP MCP безбедносни ризици  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Практична обука безбедности MCP на Azure-у

### **Microsoft безбедносна решења**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Безбедносни стандарди**
- [OAuth 2.0 најбоље праксе безбедности (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 за велике језичке моделе](https://genai.owasp.org/)  
- [NIST оквир за сајбер безбедност](https://www.nist.gov/cyberframework)

---

> **Важно**: Ове контроле безбедности одражавају текућу MCP спецификацију (2025-11-25). Увек проверавајте са најновијом [званичном документацијом](https://spec.modelcontextprotocol.io/) јер се стандарди брзо развијају.

## Шта следи

- Врати се на: [Преглед модула безбедности](./README.md)  
- Настави на: [Модул 3: Почетак рада](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->