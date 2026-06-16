# Kontrole bezpieczeństwa MCP - Aktualizacja luty 2026

> **Aktualny standard**: Dokument odzwierciedla wymagania bezpieczeństwa [specyfikacji MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) oraz oficjalne [Najlepsze praktyki bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Protokół Model Context (MCP) znacznie się rozwinął, wprowadzając ulepszone mechanizmy kontroli bezpieczeństwa, obejmujące zarówno tradycyjne zagrożenia z zakresu bezpieczeństwa oprogramowania, jak i specyficzne zagrożenia związane ze sztuczną inteligencją. Niniejszy dokument zapewnia kompleksowe kontrole bezpieczeństwa dla bezpiecznych implementacji MCP zgodnych z ramami OWASP MCP Top 10.

## 🏔️ Praktyczne szkolenie z bezpieczeństwa

Dla praktycznych doświadczeń z implementacją bezpieczeństwa zalecamy **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – kompleksową prowadzoną ekspedycję w zakresie zabezpieczania serwerów MCP w Azure, stosując metodologię „podatność → eksploatacja → naprawa → weryfikacja”.

Wszystkie kontrole bezpieczeństwa w tym dokumencie są zgodne z **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, który dostarcza gotowe architektury i konkretne wskazówki dotyczące implementacji w Azure dla ryzyk OWASP MCP Top 10.

## **OBOWIĄZKOWE wymagania bezpieczeństwa**

### **Krytyczne zakazy ze specyfikacji MCP:**

> **ZAKAZANE**: serwery MCP **NIE MOGĄ** akceptować żadnych tokenów, które nie zostały wyraźnie wystawione dla serwera MCP  
>
> **ZABRONIONE**: serwery MCP **NIE MOGĄ** używać sesji do uwierzytelniania  
>
> **WYMAGANE**: serwery MCP implementujące autoryzację **MUSZĄ** weryfikować WSZYSTKIE przychodzące żądania  
>
> **OBOWIĄZKOWE**: serwery proxy MCP używające statycznych identyfikatorów klienta **MUSZĄ** uzyskać zgodę użytkownika na każdego dynamicznie zarejestrowanego klienta  

---

## 1. **Kontrole uwierzytelniania i autoryzacji**

### **Integracja z zewnętrznym dostawcą tożsamości**

**Aktualny standard MCP (2025-11-25)** pozwala serwerom MCP delegować uwierzytelnianie do zewnętrznych dostawców tożsamości, co stanowi istotną poprawę bezpieczeństwa:

**Adresowane ryzyko OWASP MCP**: [MCP07 - Niewystarczające uwierzytelnianie i autoryzacja](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Korzyści bezpieczeństwa:**
1. **Eliminacja ryzyka niestandardowego uwierzytelniania**: ogranicza powierzchnię podatności unikając niestandardowych implementacji uwierzytelniania  
2. **Bezpieczeństwo korporacyjne**: wykorzystuje renomowanych dostawców tożsamości jak Microsoft Entra ID z zaawansowanymi funkcjami bezpieczeństwa  
3. **Scentralizowane zarządzanie tożsamościami**: upraszcza zarządzanie cyklem życia użytkownika, kontrolę dostępu i audyt zgodności  
4. **Uwierzytelnianie wieloskładnikowe**: dziedziczy funkcje MFA od dostawców korporacyjnych  
5. **Polityki dostępu warunkowego**: korzysta z kontroli dostępu opartego na ryzyku i adaptacyjnego uwierzytelniania  

**Wymagania implementacyjne:**
- **Walidacja odbiorcy tokena**: weryfikacja, że wszystkie tokeny są wyraźnie wystawione dla serwera MCP  
- **Weryfikacja wystawcy**: potwierdzenie zgodności wystawcy tokena z oczekiwanym dostawcą tożsamości  
- **Weryfikacja podpisu**: kryptograficzne potwierdzenie integralności tokena  
- **Egzekwowanie terminu ważności**: rygorystyczne przestrzeganie limitów czasu życia tokena  
- **Walidacja zakresu**: zapewnienie, że tokeny zawierają odpowiednie uprawnienia do żądanych operacji  

### **Bezpieczeństwo logiki autoryzacji**

**Krytyczne kontrole:**
- **Kompleksowe audyty autoryzacji**: regularne przeglądy bezpieczeństwa wszystkich punktów decyzyjnych autoryzacji  
- **Domyślne ustawienia bezpieczne**: odmowa dostępu, gdy logika autoryzacji nie może podjąć jednoznacznej decyzji  
- **Granice uprawnień**: wyraźne rozdzielenie różnych poziomów przywilejów i dostępu do zasobów  
- **Rejestrowanie audytowe**: pełne logowanie wszystkich decyzji autoryzacyjnych dla monitoringu bezpieczeństwa  
- **Regularne przeglądy dostępu**: okresowa weryfikacja uprawnień użytkowników i przypisań przywilejów  

## 2. **Bezpieczeństwo tokenów i kontrole anti-passthrough**

**Adresowane ryzyko OWASP MCP**: [MCP01 - Nieprawidłowe zarządzanie tokenami i ujawnienie sekretów](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Zapobieganie passthrough tokenów**

**Przekazywanie tokenów jest wyraźnie zabronione** w specyfikacji autoryzacji MCP ze względu na krytyczne zagrożenia bezpieczeństwa:

**Adresowane ryzyka bezpieczeństwa:**
- **Ominięcie kontroli**: pomija istotne mechanizmy bezpieczeństwa takie jak ograniczanie częstotliwości, walidacja żądań i monitorowanie ruchu  
- **Zanik odpowiedzialności**: uniemożliwia identyfikację klienta, niszcząc ścieżki audytu i możliwości dochodzenia incydentów  
- **Eksfiltracja przez proxy**: umożliwia złośliwym aktorom użycie serwerów jako pośredników do nieautoryzowanego dostępu do danych  
- **Naruszenie granicy zaufania**: łamie założenia usług downstream co do pochodzenia tokenów  
- **Ruch boczny**: skompromitowane tokeny w wielu usługach umożliwiają szerszą ekspansję ataków  

**Kontrole implementacyjne:**  
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

**Dobre praktyki:**
- **Tokeny krótkotrwałe**: minimalizacja okna ekspozycji przez częstą rotację tokenów  
- **Wydawanie na żądanie**: generowanie tokenów tylko wtedy, gdy są potrzebne do konkretnych operacji  
- **Bezpieczne przechowywanie**: użycie modułów bezpieczeństwa sprzętowego (HSM) lub bezpiecznych skarbców kluczy  
- **Powiązanie tokenów**: wiązanie tokenów z określonymi klientami, sesjami lub operacjami tam, gdzie to możliwe  
- **Monitorowanie i alerty**: wykrywanie w czasie rzeczywistym nieprawidłowego używania tokenów lub nieautoryzowanego dostępu  

## 3. **Kontrole bezpieczeństwa sesji**

### **Zapobieganie przejęciu sesji**

**Adresowane wektory ataku:**
- **Wstrzyknięcie podpowiedzi przejęcia sesji**: złośliwe zdarzenia wstrzykiwane do współdzielonego stanu sesji  
- **Podszywanie się pod sesję**: nieautoryzowane użycie skradzionych identyfikatorów sesji do pominięcia uwierzytelniania  
- **Ataki na wznawialny strumień**: wykorzystanie wznowienia serwera wysyłającego zdarzenia do wstrzyknięcia złośliwej zawartości  

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
- **Wymuszanie HTTPS**: cała komunikacja sesji przez TLS 1.3  
- **Atrybuty bezpiecznych ciasteczek**: HttpOnly, Secure, SameSite=Strict  
- **Pinowanie certyfikatów**: dla krytycznych połączeń w celu zapobiegania atakom MITM  

### **Rozważania dotyczące stanowości sesji**

**Dla implementacji stanowych:**  
- Współdzielony stan sesji wymaga dodatkowej ochrony przed atakami wstrzyknięcia  
- Zarządzanie sesjami w kolejkach wymaga weryfikacji integralności  
- Wiele instancji serwerów wymaga bezpiecznej synchronizacji stanu sesji  

**Dla implementacji bezstanowych:**  
- Zarządzanie sesjami oparte na JWT lub podobnych tokenach  
- Kryptograficzna weryfikacja integralności stanu sesji  
- Zmniejszona powierzchnia ataku, ale wymaga solidnej walidacji tokenów  

## 4. **Specyficzne kontrole bezpieczeństwa AI**

**Adresowane ryzyka OWASP MCP**:  
- [MCP06 - Podstępne przejęcie instrukcji](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
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
- **Sanityzacja danych wejściowych**: kompleksowa walidacja i filtrowanie wszystkich danych od użytkowników  
- **Definiowanie granic zawartości**: wyraźne oddzielenie instrukcji systemowych od zawartości użytkownika  
- **Hierarchia instrukcji**: właściwe reguły pierwszeństwa dla konfliktujących instrukcji  
- **Monitorowanie wyjścia**: wykrywanie potencjalnie szkodliwych lub zmanipulowanych wyników  

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
- **Procesy zatwierdzania**: wyraźna zgoda użytkownika na modyfikacje narzędzi  
- **Możliwości wycofania**: zdolność powrotu do poprzednich wersji narzędzi  
- **Audyt zmian**: pełna historia modyfikacji definicji narzędzi  
- **Ocena ryzyka**: automatyczna ewaluacja postawy bezpieczeństwa narzędzi  

## 5. **Zapobieganie atakom zakłóconego pełnomocnika**

### **Bezpieczeństwo proxy OAuth**

**Kontrole zapobiegawcze atakom:**  
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
- **Weryfikacja zgody użytkownika**: nigdy nie pomijać ekranów zgody podczas dynamicznej rejestracji klientów  
- **Walidacja URI przekierowania**: rygorystyczna walidacja według białej listy celów przekierowania  
- **Ochrona kodów autoryzacyjnych**: kody krótkotrwałe z wymuszaniem jednokrotnego użycia  
- **Weryfikacja tożsamości klienta**: solidna weryfikacja danych uwierzytelniających klienta i metadanych  

## 6. **Bezpieczeństwo wykonania narzędzi**

### **Sandboxing i izolacja**

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
- **Oddzielne konteksty procesów**: każde wykonanie narzędzia w izolowanej przestrzeni procesów  
- **Komunikacja międzyprocesowa**: bezpieczne mechanizmy IPC z weryfikacją  
- **Monitorowanie procesów**: analiza zachowania w czasie rzeczywistym i wykrywanie anomalii  
- **Egzekwowanie zasobów**: restrykcyjne limity CPU, pamięci i operacji I/O  

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

**Adresowane ryzyko OWASP MCP**: [MCP04 - Ataki na łańcuch dostaw oprogramowania i manipulacje zależnościami](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

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
- **Monitoring stanu zależności**: ciągła ocena wszystkich zależności pod kątem zagrożeń bezpieczeństwa  
- **Integracja informacji o zagrożeniach**: aktualizacje w czasie rzeczywistym dla pojawiających się zagrożeń łańcucha dostaw  
- **Analiza zachowań**: wykrywanie nietypowych zachowań w komponentach zewnętrznych  
- **Automatyczna reakcja**: natychmiastowe powstrzymywanie skompromitowanych komponentów  

## 8. **Kontrole monitoringu i wykrywania**

**Adresowane ryzyko OWASP MCP**: [MCP08 - Brak audytu i telemetrii](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Zarządzanie informacjami i zdarzeniami bezpieczeństwa (SIEM)**

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

**Analiza behawioralna:**  
- **Analiza zachowań użytkowników (UBA)**: wykrywanie nietypowych wzorców dostępu użytkowników  
- **Analiza zachowań podmiotów (EBA)**: monitoring zachowań serwerów MCP i narzędzi  
- **Wykrywanie anomalii z uczeniem maszynowym**: AI wspomagane identyfikowanie zagrożeń bezpieczeństwa  
- **Korelacja informacji o zagrożeniach**: dopasowywanie obserwowanych działań do znanych wzorców ataków  

## 9. **Reakcja na incydenty i odzyskiwanie**

### **Automatyczne zdolności reakcji**

**Natychmiastowe działania:**  
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
  
### **Zdolności śledcze**

**Wsparcie dochodzeniowe:**  
- **Zachowanie ścieżki audytowej**: niezmienialne logi z kryptograficzną integralnością  
- **Zbieranie dowodów**: automatyczne gromadzenie odpowiednich artefaktów bezpieczeństwa  
- **Rekonstrukcja osi czasu**: szczegółowa sekwencja zdarzeń prowadzących do incydentów bezpieczeństwa  
- **Ocena wpływu**: analiza zakresu kompromitacji i ujawnienia danych  

## **Kluczowe zasady architektury bezpieczeństwa**

### **Obrona wielowarstwowa**  
- **Wiele warstw bezpieczeństwa**: brak pojedynczych punktów awarii w architekturze bezpieczeństwa  
- **Redundantne kontrole**: nakładające się zabezpieczenia dla funkcji krytycznych  
- **Mechanizmy awaryjne**: bezpieczne domyślne ustawienia podczas błędów lub ataków  

### **Implementacja Zero Trust**  
- **Nigdy nie ufaj, zawsze weryfikuj**: ciągła walidacja wszystkich podmiotów i żądań  
- **Zasada najmniejszych uprawnień**: minimalne prawa dostępu dla wszystkich komponentów  
- **Mikroseparacja**: granularne kontrole sieci i dostępu  

### **Stały rozwój bezpieczeństwa**  
- **Adaptacja do krajobrazu zagrożeń**: regularne aktualizacje adresujące pojawiające się zagrożenia  
- **Skuteczność kontroli bezpieczeństwa**: nieustanna ocena i ulepszanie zabezpieczeń  
- **Zgodność ze specyfikacją**: dopasowanie do ewoluujących standardów bezpieczeństwa MCP  

---

## **Zasoby implementacyjne**

### **Oficjalna dokumentacja MCP**  
- [Specyfikacja MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Najlepsze praktyki bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Specyfikacja autoryzacji MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **Zasoby bezpieczeństwa OWASP MCP**  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kompleksowy OWASP MCP Top 10 z implementacją w Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficjalne ryzyka bezpieczeństwa MCP OWASP  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktyczne szkolenie z bezpieczeństwa MCP w Azure  

### **Rozwiązania bezpieczeństwa Microsoft**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Standardy bezpieczeństwa**  
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 dla dużych modeli językowych](https://genai.owasp.org/)  
- [Ramowy program cyberbezpieczeństwa NIST](https://www.nist.gov/cyberframework)  

---

> **Ważne**: Te kontrole bezpieczeństwa odzwierciedlają aktualną specyfikację MCP (2025-11-25). Zawsze weryfikuj w oparciu o najnowszą [oficjalną dokumentację](https://spec.modelcontextprotocol.io/), ponieważ standardy szybko się rozwijają.

## Co dalej

- Powrót do: [Przegląd modułu bezpieczeństwa](./README.md)  
- Kontynuuj do: [Moduł 3: Pierwsze kroki](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->