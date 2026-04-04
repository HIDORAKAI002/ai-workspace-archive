# Kontrole bezpieczeństwa MCP - Aktualizacja luty 2026

> **Aktualny standard**: Dokument odzwierciedla wymagania bezpieczeństwa [Specyfikacji MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) oraz oficjalne [Najlepsze praktyki bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) znacznie dojrzał, wprowadzając ulepszone kontrole bezpieczeństwa obejmujące zarówno tradycyjne zagrożenia informatyczne, jak i specyficzne zagrożenia związane ze sztuczną inteligencją. Niniejszy dokument dostarcza wyczerpujących kontroli bezpieczeństwa dla bezpiecznych implementacji MCP zgodnych z ramami OWASP MCP Top 10.

## 🏔️ Praktyczne szkolenie z bezpieczeństwa

Dla praktycznego, warsztatowego doświadczenia w implementacji zabezpieczeń, polecamy **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – kompleksową prowadzoną wyprawę do zabezpieczania serwerów MCP w Azure, wykorzystującą metodologię "podatność → exploit → poprawka → weryfikacja".

Wszystkie kontrole bezpieczeństwa w tym dokumencie są zgodne z **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, która dostarcza referencyjne architektury oraz wytyczne implementacyjne specyficzne dla Azure, dotyczące zagrożeń z OWASP MCP Top 10.

## **WYMAGANE wymagania bezpieczeństwa**

### **Krytyczne zakazy ze Specyfikacji MCP:**

> **ZABRONIONE**: Serwery MCP **NIE MOGĄ** akceptować żadnych tokenów, które nie zostały wyraźnie wydane dla serwera MCP  
>
> **ZABRONIONE**: Serwery MCP **NIE MOGĄ** używać sesji do uwierzytelniania  
>
> **WYMAGANE**: Serwery MCP implementujące autoryzację **MUSZĄ** weryfikować WSZYSTKIE przychodzące żądania  
>
> **OBOWIĄZKOWE**: Serwery proxy MCP używające statycznych identyfikatorów klienta **MUSZĄ** uzyskiwać zgodę użytkownika dla każdego dynamicznie zarejestrowanego klienta

---

## 1. **Kontrole uwierzytelniania i autoryzacji**

### **Integracja z zewnętrznym dostawcą tożsamości**

**Aktualny standard MCP (2025-11-25)** pozwala serwerom MCP delegować uwierzytelnianie do zewnętrznych dostawców tożsamości, co stanowi istotną poprawę bezpieczeństwa:

**Adresowane ryzyko OWASP MCP**: [MCP07 - Niewystarczające uwierzytelnianie i autoryzacja](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Korzyści bezpieczeństwa:**
1. **Eliminacja ryzyka własnych implementacji uwierzytelniania**: Zmniejsza powierzchnię podatności poprzez unikanie niestandardowych implementacji uwierzytelniania  
2. **Bezpieczeństwo klasy korporacyjnej**: Wykorzystuje ugruntowanych dostawców tożsamości, takich jak Microsoft Entra ID, z zaawansowanymi funkcjami bezpieczeństwa  
3. **Centralne zarządzanie tożsamością**: Upraszcza zarządzanie cyklem życia użytkowników, kontrolę dostępu i audyty zgodności  
4. **Uwierzytelnianie wieloskładnikowe**: Dziedziczy możliwości MFA od dostawców tożsamości przedsiębiorstwa  
5. **Polityki dostępu warunkowego**: Korzysta z kontroli dostępu opartej na ryzyku i adaptacyjnego uwierzytelniania

**Wymagania implementacyjne:**
- **Weryfikacja odbiorcy tokena**: Sprawdzenie, czy wszystkie tokeny zostały wyraźnie wydane dla serwera MCP  
- **Weryfikacja wystawcy**: Walidacja, czy wystawca tokena odpowiada oczekiwanemu dostawcy tożsamości  
- **Weryfikacja podpisu**: Kryptograficzna walidacja integralności tokena  
- **Egzekwowanie terminu ważności**: Ścisłe przestrzeganie limitów życia tokenów  
- **Walidacja zakresu**: Zapewnienie, że tokeny zawierają odpowiednie uprawnienia dla żądanych operacji  

### **Bezpieczeństwo logiki autoryzacji**

**Krytyczne kontrole:**
- **Kompleksowe audyty autoryzacji**: Regularne przeglądy bezpieczeństwa wszystkich punktów decyzyjnych autoryzacji  
- **Domyślne zachowanie awaryjne**: Odmowa dostępu, gdy logika autoryzacji nie jest w stanie podjąć jednoznacznej decyzji  
- **Granice uprawnień**: Wyraźne rozdzielenie poziomów przywilejów i dostępu do zasobów  
- **Rejestrowanie audytu**: Pełne logowanie wszystkich decyzji autoryzacyjnych dla monitoringu bezpieczeństwa  
- **Regularne przeglądy dostępu**: Okresowa weryfikacja uprawnień użytkowników oraz przypisań przywilejów  

## 2. **Bezpieczeństwo tokenów i kontrole przeciwdziałające przekazywaniu tokenów**

**Adresowane ryzyko OWASP MCP**: [MCP01 - Niewłaściwe zarządzanie tokenami i ujawnienie sekretów](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Zapobieganie przekazywaniu tokenów**

**Przekazywanie tokenów jest wyraźnie zabronione** w Specyfikacji autoryzacji MCP z powodu krytycznych zagrożeń bezpieczeństwa:

**Adresowane ryzyka bezpieczeństwa:**
- **Omijanie kontroli**: Pomija istotne kontrole bezpieczeństwa, takie jak ograniczanie tempa, walidacja żądań i monitorowanie ruchu  
- **Brak odpowiedzialności**: Uniemożliwia identyfikację klienta, co psuje ścieżki audytu i analizę incydentów  
- **Eksfiltracja przez proxy**: Pozwala złośliwym podmiotom używać serwerów jako proxy dla nieautoryzowanego dostępu do danych  
- **Naruszenie granic zaufania**: Łamie założenia dotyczące pochodzenia tokenów w usługach downstream  
- **Przemieszczanie boczne**: Naruszone tokeny między wieloma usługami umożliwiają rozszerzenie ataku  

**Kontrole implementacji:**
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

### **Wzorce bezpiecznego zarządzania tokenami**

**Najlepsze praktyki:**
- **Tokeny krótkotrwałe**: Minimalizacja okna ekspozycji przez częstą rotację tokenów  
- **Wydawanie na żądanie**: Wydawanie tokenów tylko wtedy, gdy są potrzebne do konkretnych operacji  
- **Bezpieczne przechowywanie**: Użycie modułów bezpieczeństwa sprzętowego (HSM) lub bezpiecznych sejfów kluczy  
- **Powiązanie tokenów**: Przypisywanie tokenów do konkretnych klientów, sesji lub operacji, jeśli to możliwe  
- **Monitorowanie i alerty**: Wykrywanie w czasie rzeczywistym nadużyć tokenów lub nieautoryzowanych wzorców dostępu  

## 3. **Kontrole bezpieczeństwa sesji**

### **Zapobieganie przejęciu sesji**

**Ataki uwzględnione:**
- **Wstrzykiwanie promptów przejęcia sesji**: Złośliwe zdarzenia wstrzykiwane do dzielonego stanu sesji  
- **Podszywanie się pod sesję**: Nieautoryzowane użycie skradzionych identyfikatorów sesji do obejścia uwierzytelniania  
- **Ataki na wznawianie strumienia**: Wykorzystywanie wznowienia eventów serwerowych do wstrzykiwania złośliwych treści  

**Obowiązkowe kontrole sesji:**
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

**Bezpieczeństwo transportu:**
- **Egzekwowanie HTTPS**: Cała komunikacja sesji przez TLS 1.3  
- **Atrybuty bezpieczeństwa ciasteczek**: HttpOnly, Secure, SameSite=Strict  
- **Przypinanie certyfikatów**: Dla krytycznych połączeń, by zapobiegać atakom MITM  

### **Rozważania dotyczące stanowych i bezstanowych implementacji**

**Dla implementacji stanowych:**
- Wspólny stan sesji wymaga dodatkowej ochrony przed atakami wstrzykiwania  
- Zarządzanie sesjami kolejkowymi wymaga weryfikacji integralności  
- Wielokrotne instancje serwera muszą bezpiecznie synchronizować stan sesji  

**Dla implementacji bezstanowych:**
- Zarządzanie sesjami oparte na JWT lub podobnych tokenach  
- Kryptograficzna walidacja integralności stanu sesji  
- Zredukowana powierzchnia ataku, ale wymaga solidnej walidacji tokenów  

## 4. **Specyficzne kontrole bezpieczeństwa AI**

**Adresowane ryzyka OWASP MCP**:
- [MCP06 - Wstrzyknięcie promptów przez kontekstowe ładunki](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Zatrucie narzędzi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Wstrzyknięcie i wykonanie poleceń](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Obrona przed wstrzyknięciem promptów**

**Integracja Microsoft Prompt Shields:**
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

**Kontrole implementacyjne:**
- **Sanityzacja danych wejściowych**: Kompletna walidacja i filtrowanie wszystkich danych użytkownika  
- **Definicja granic treści**: Wyraźne oddzielenie instrukcji systemowych od zawartości użytkownika  
- **Hierarchia instrukcji**: Właściwe reguły priorytetu dla sprzecznych poleceń  
- **Monitorowanie wyjścia**: Wykrywanie potencjalnie szkodliwych lub zmanipulowanych wyników  

### **Zapobieganie zatruciu narzędzi**

**Ramowy model bezpieczeństwa narzędzi:**
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

**Dynamiczne zarządzanie narzędziami:**
- **Workflow zatwierdzeń**: Wyraźna zgoda użytkownika na modyfikacje narzędzi  
- **Możliwości wycofania**: Możliwość powrotu do poprzednich wersji narzędzi  
- **Audyt zmian**: Pełna historia modyfikacji definicji narzędzi  
- **Ocena ryzyka**: Automatyczna ocena bezpieczeństwa narzędzi  

## 5. **Zapobieganie atakowi „Confused Deputy”**

### **Bezpieczeństwo proxy OAuth**

**Kontrole zapobiegające atakom:**
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

**Wymagania implementacyjne:**
- **Weryfikacja zgody użytkownika**: Nigdy nie omijać ekranów zgody przy dynamicznej rejestracji klienta  
- **Weryfikacja URI przekierowań**: Ścisła walidacja whitelisty docelowych adresów przekierowań  
- **Ochrona kodu autoryzacyjnego**: Krótkotrwałe kody z egzekwowaniem jednorazowego użycia  
- **Weryfikacja tożsamości klienta**: Solidna walidacja poświadczeń klienta i metadanych  

## 6. **Bezpieczeństwo wykonania narzędzi**

### **Izolacja i sandboxing**

**Izolacja oparta na kontenerach:**
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
  
**Izolacja procesów:**
- **Oddzielne konteksty procesów**: Każde wykonanie narzędzia w izolowanej przestrzeni procesowej  
- **Bezpieczna komunikacja międzyprocesowa**: Mechanizmy IPC z walidacją  
- **Monitorowanie procesów**: Analiza zachowań w czasie rzeczywistym i wykrywanie anomalii  
- **Egzekwowanie limitów zasobów**: Twarde limity na CPU, pamięć i operacje I/O  

### **Implementacja zasady najmniejszych uprawnień**

**Zarządzanie uprawnieniami:**
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
  
## 7. **Kontrole bezpieczeństwa łańcucha dostaw**

**Adresowane ryzyko OWASP MCP**: [MCP04 - Ataki na łańcuch dostaw](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Weryfikacja zależności**

**Kompleksowe bezpieczeństwo komponentów:**
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
  
### **Ciągły monitoring**

**Wykrywanie zagrożeń łańcucha dostaw:**
- **Monitorowanie stanu zależności**: Ciągła ocena wszystkich zależności pod kątem problemów bezpieczeństwa  
- **Integracja informacji o zagrożeniach**: Aktualizacje w czasie rzeczywistym o nowo pojawiających się zagrożeniach łańcucha dostaw  
- **Analiza zachowania**: Detekcja nietypowego zachowania w komponentach zewnętrznych  
- **Automatyczna reakcja**: Natychmiastowe odizolowanie naruszonych komponentów  

## 8. **Kontrole monitorowania i wykrywania**

**Adresowane ryzyko OWASP MCP**: [MCP08 - Brak audytu i telemetrii](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **System zarządzania informacjami i zdarzeniami bezpieczeństwa (SIEM)**

**Kompleksowa strategia logowania:**
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
  
### **Wykrywanie zagrożeń w czasie rzeczywistym**

**Analiza zachowań:**
- **Analiza zachowań użytkowników (UBA)**: Wykrywanie nietypowych wzorców dostępu użytkowników  
- **Analiza zachowań podmiotów (EBA)**: Monitorowanie zachowań serwera MCP i narzędzi  
- **Wykrywanie anomalii oparte na ML**: Identyfikacja zagrożeń bezpieczeństwa wspierana przez AI  
- **Korelacja informacji o zagrożeniach**: Dopasowywanie obserwowanych aktywności do znanych wzorców ataków  

## 9. **Reagowanie na incydenty i odzyskiwanie**

### **Automatyczne możliwości reagowania**

**Natychmiastowe działania reakcyjne:**
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
  
### **Możliwości sądowo-śledcze**

**Wsparcie w dochodzeniu:**
- **Zachowanie ścieżek audytu**: Niezmienialne logowanie z integralnością kryptograficzną  
- **Zbieranie dowodów**: Automatyczne gromadzenie odpowiednich artefaktów bezpieczeństwa  
- **Rekonstrukcja osi czasu**: Szczegółowa sekwencja zdarzeń prowadzących do incydentów bezpieczeństwa  
- **Ocena wpływu**: Analiza zakresu naruszenia i ekspozycji danych  

## **Kluczowe zasady architektury bezpieczeństwa**

### **Obrona w głębi (Defense in Depth)**
- **Wielowarstwowe zabezpieczenia**: Brak pojedynczego punktu awarii w architekturze bezpieczeństwa  
- **Redundantne kontrole**: Nakładające się środki bezpieczeństwa dla funkcji krytycznych  
- **Mechanizmy zabezpieczające na wypadek błędów**: Bezpieczne domyślne zachowania przy błędach lub atakach  

### **Implementacja Zero Trust**
- **Nigdy nie ufaj, zawsze weryfikuj**: Ciągła walidacja wszystkich podmiotów i żądań  
- **Zasada najmniejszych uprawnień**: Minimalne prawa dostępu dla wszystkich komponentów  
- **Mikrosegmentacja**: Precyzyjne kontrole sieciowe i dostępu  

### **Ciągła ewolucja bezpieczeństwa**
- **Adaptacja do krajobrazu zagrożeń**: Regularne aktualizacje by uwzględniać nowe zagrożenia  
- **Skuteczność kontroli bezpieczeństwa**: Stała ocena i ulepszanie mechanizmów kontroli  
- **Zgodność ze specyfikacją**: Dopasowanie do ewoluujących standardów bezpieczeństwa MCP  

---

## **Zasoby implementacyjne**

### **Oficjalna dokumentacja MCP**
- [Specyfikacja MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Najlepsze praktyki bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Specyfikacja autoryzacji MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **Zasoby bezpieczeństwa OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kompleksowy OWASP MCP Top 10 z implementacją dla Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficjalne ryzyka bezpieczeństwa OWASP MCP  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktyczne szkolenie z bezpieczeństwa MCP na platformie Azure  

### **Rozwiązania bezpieczeństwa Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Standardy bezpieczeństwa**
- [Najlepsze praktyki bezpieczeństwa OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 dla dużych modeli językowych](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)  

---

> **Ważne**: Niniejsze kontrole bezpieczeństwa odzwierciedlają aktualną specyfikację MCP (2025-11-25). Zawsze weryfikuj z najnowszą [oficjalną dokumentacją](https://spec.modelcontextprotocol.io/), ponieważ standardy szybko się rozwijają.

## Co dalej

- Powrót do: [Przegląd modułu bezpieczeństwa](./README.md)
- Kontynuuj do: [Moduł 3: Rozpoczęcie pracy](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony przy użyciu automatycznej usługi tłumaczeniowej AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że dokładamy starań, aby tłumaczenie było jak najbardziej precyzyjne, prosimy pamiętać, że tłumaczenia automatyczne mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym powinien być traktowany jako źródło autorytatywne. W przypadku informacji istotnych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->