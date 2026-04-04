# Najlepsze praktyki bezpieczeństwa MCP - aktualizacja luty 2026

> **Ważne**: Ten dokument odzwierciedla najnowsze wymagania dotyczące bezpieczeństwa z [specyfikacji MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) oraz oficjalne [Najlepsze praktyki bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Zawsze odwołuj się do aktualnej specyfikacji, aby uzyskać najbardziej aktualne wskazówki.

## 🏔️ Praktyczne szkolenie z bezpieczeństwa

Dla praktycznego doświadczenia z implementacją zalecamy **[Warsztat MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** – kompleksową, prowadzoną ekspedycję po zabezpieczaniu serwerów MCP w Azure. Warsztat obejmuje wszystkie ryzyka z OWASP MCP Top 10 poprzez metodologię „ podatność → wykorzystanie → naprawa → walidacja”.

Wszystkie praktyki zawarte w tym dokumencie są zgodne z **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)**, który zawiera wskazówki dotyczące implementacji specyficznych dla Azure.

## Kluczowe praktyki bezpieczeństwa dla implementacji MCP

Model Context Protocol wprowadza unikalne wyzwania bezpieczeństwa wykraczające poza tradycyjne zabezpieczenia oprogramowania. Praktyki te obejmują zarówno podstawowe wymagania bezpieczeństwa, jak i zagrożenia specyficzne dla MCP, w tym wstrzykiwanie promptów, zatrucie narzędzi, przejmowanie sesji, problemy typu confused deputy oraz podatności w przekazywaniu tokenów.

### **OBOWIĄZKOWE wymagania bezpieczeństwa**

**Krytyczne wymagania ze specyfikacji MCP:**

### **OBOWIĄZKOWE wymagania bezpieczeństwa**

**Krytyczne wymagania ze specyfikacji MCP:**

> **NIE WOLNO**: Serwery MCP **NIE WOLNO** akceptować żadnych tokenów, które nie zostały wyraźnie wydane dla serwera MCP
> 
> **MUSZĄ**: Serwery MCP realizujące autoryzację **MUSZĄ** weryfikować WSZYSTKIE przychodzące żądania
>  
> **NIE WOLNO**: Serwery MCP **NIE WOLNO** używać sesji do uwierzytelniania
>
> **MUSZĄ**: Serwery proxy MCP używające statycznych identyfikatorów klienta **MUSZĄ** uzyskać zgodę użytkownika dla każdego dynamicznie zarejestrowanego klienta

---

## 1. **Bezpieczeństwo tokenów i uwierzytelnianie**

**Kontrole uwierzytelniania i autoryzacji:**
   - **Dokładny przegląd autoryzacji**: Przeprowadzaj kompleksowe audyty logiki autoryzacji serwera MCP, aby upewnić się, że tylko zamierzeni użytkownicy i klienci mają dostęp do zasobów
   - **Integracja z zewnętrznymi dostawcami tożsamości**: Korzystaj z uznanych dostawców tożsamości, takich jak Microsoft Entra ID, zamiast wdrażać własne mechanizmy uwierzytelniania
   - **Weryfikacja odbiorców tokenów**: Zawsze weryfikuj, że tokeny zostały wyraźnie wydane dla Twojego serwera MCP – nigdy nie akceptuj tokenów z wyżej położonych warstw
   - **Właściwy cykl życia tokenów**: Wdrażaj bezpieczne obracanie tokenów, polityki wygasania oraz zapobiegaj atakom typu replay tokenów

**Chronione przechowywanie tokenów:**
   - Używaj Azure Key Vault lub podobnych bezpiecznych magazynów poświadczeń dla wszystkich sekretów
   - Wdrażaj szyfrowanie tokenów zarówno w stanie spoczynku, jak i podczas transmisji
   - Regularna rotacja poświadczeń i monitorowanie nieautoryzowanego dostępu

## 2. **Zarządzanie sesją i bezpieczeństwo warstwy transportowej**

**Bezpieczne praktyki sesji:**
   - **Kryptograficznie bezpieczne identyfikatory sesji**: Używaj bezpiecznych, niedeterministycznych identyfikatorów sesji generowanych za pomocą bezpiecznych generatorów liczb losowych
   - **Powiązanie z użytkownikiem**: Przypisuj identyfikatory sesji do tożsamości użytkowników, stosując formaty takie jak `<user_id>:<session_id>`, aby zapobiegać nadużyciom sesji między użytkownikami
   - **Zarządzanie cyklem życia sesji**: Wdrażaj odpowiednie wygasanie, rotację i unieważnianie sesji, aby ograniczyć okna podatności
   - **Wymuszanie HTTPS/TLS**: Obowiązkowe użycie HTTPS we wszystkich komunikacjach, aby zapobiec przechwytywaniu identyfikatorów sesji

**Bezpieczeństwo warstwy transportowej:**
   - Konfiguruj TLS 1.3 tam, gdzie to możliwe, z odpowiednim zarządzaniem certyfikatami
   - Wdrażaj przypinanie certyfikatów dla krytycznych połączeń
   - Regularna rotacja certyfikatów i weryfikacja ich ważności

## 3. **Ochrona przed zagrożeniami specyficznymi dla AI** 🤖

**Obrona przed wstrzykiwaniem promptów:**
   - **Microsoft Prompt Shields**: Wdrażaj AI Prompt Shields dla zaawansowanego wykrywania i filtrowania złośliwych poleceń
   - **Sanityzacja wejścia**: Waliduj i oczyszczaj wszystkie dane wejściowe, aby zapobiec atakom wstrzykiwania i problemom typu confused deputy
   - **Granice treści**: Używaj systemów delimiterów i znakowania danych, aby odróżnić zaufane instrukcje od treści zewnętrznych

**Zapobieganie zatruciu narzędzi:**
   - **Weryfikacja metadanych narzędzi**: Wdrażaj kontrole integralności definicji narzędzi i monitoruj nieoczekiwane zmiany
   - **Dynamiczne monitorowanie narzędzi**: Monitoruj zachowanie w czasie rzeczywistym i ustaw alerty na nieoczekiwane wzorce wykonania
   - **Procesy zatwierdzania**: Wymagaj wyraźnej zgody użytkownika na modyfikacje narzędzi i zmiany ich możliwości

## 4. **Kontrola dostępu i uprawnienia**

**Zasada najmniejszych uprawnień:**
   - Przyznawaj serwerom MCP tylko minimalne uprawnienia wymagane do zamierzonej funkcjonalności
   - Wdrażaj kontrolę dostępu opartą na rolach (RBAC) z drobnym podziałem uprawnień
   - Regularne przeglądy uprawnień i ciągłe monitorowanie pod kątem eskalacji uprawnień

**Kontrola uprawnień w czasie działania:**
   - Nakładaj limity zasobów, aby zapobiec atakom polegającym na wyczerpaniu zasobów
   - Korzystaj z izolacji kontenerów dla środowisk wykonywania narzędzi  
   - Wdrażaj dostęp just-in-time do funkcji administracyjnych

## 5. **Bezpieczeństwo treści i monitorowanie**

**Wdrażanie bezpieczeństwa treści:**
   - **Integracja Azure Content Safety**: Korzystaj z Azure Content Safety do wykrywania szkodliwych treści, prób obejścia zabezpieczeń oraz naruszeń polityki
   - **Analiza zachowań**: Wdrażaj monitorowanie zachowania w czasie działania, aby wykrywać anomalie w działaniu serwera MCP i narzędzi
   - **Kompleksowe logowanie**: Rejestruj wszystkie próby uwierzytelniania, wywołania narzędzi oraz zdarzenia bezpieczeństwa w bezpiecznym, odpornym na manipulacje magazynie

**Ciągłe monitorowanie:**
   - Powiadomienia w czasie rzeczywistym o podejrzanych wzorcach i nieautoryzowanych próbach dostępu  
   - Integracja z systemami SIEM do scentralizowanego zarządzania zdarzeniami bezpieczeństwa
   - Regularne audyty bezpieczeństwa oraz testy penetracyjne implementacji MCP

## 6. **Bezpieczeństwo łańcucha dostaw**

**Weryfikacja komponentów:**
   - **Skanowanie zależności**: Korzystaj z automatycznych skanerów podatności dla wszystkich zależności oprogramowania i komponentów AI
   - **Weryfikacja pochodzenia**: Sprawdzaj pochodzenie, licencjonowanie i integralność modeli, źródeł danych oraz usług zewnętrznych
   - **Podpisane pakiety**: Używaj kryptograficznie podpisanych pakietów i weryfikuj podpisy przed wdrożeniem

**Bezpieczny pipeline deweloperski:**
   - **GitHub Advanced Security**: Wdrażaj skanowanie sekretów, analizę zależności i statyczną analizę CodeQL
   - **Bezpieczeństwo CI/CD**: Integruj walidację bezpieczeństwa na wszystkich etapach automatycznych pipeline'ów wdrożeniowych
   - **Integralność artefaktów**: Wdrażaj kryptograficzne metody weryfikacji dla wdrażanych artefaktów i konfiguracji

## 7. **Bezpieczeństwo OAuth i zapobieganie confused deputy**

**Implementacja OAuth 2.1:**
   - **Wdrożenie PKCE**: Używaj Proof Key for Code Exchange (PKCE) przy wszystkich żądaniach autoryzacji
   - **Wyraźna zgoda**: Uzyskuj zgodę użytkownika dla każdego dynamicznie zarejestrowanego klienta, aby zapobiec atakom typu confused deputy
   - **Weryfikacja URI przekierowania**: Wdrażaj ścisłą walidację URI przekierowań i identyfikatorów klienta

**Bezpieczeństwo proxy:**
   - Zapobiegaj ominięciu autoryzacji poprzez wykorzystanie statycznych identyfikatorów klienta
   - Wdrażaj odpowiednie procesy zgody dla dostępu do API stron trzecich
   - Monitoruj kradzież kodów autoryzacyjnych i nieautoryzowany dostęp do API

## 8. **Reakcja na incydenty i odzyskiwanie**

**Szybkie reakcje:**
   - **Automatyczna reakcja**: Wdrażaj automatyczne systemy do rotacji poświadczeń i ograniczania zagrożeń
   - **Procedury rollbacku**: Możliwość szybkiego przywrócenia znanych dobrych konfiguracji i komponentów
   - **Możliwości kryminalistyczne**: Szczegółowe ścieżki audytu i logowania do badania incydentów

**Komunikacja i koordynacja:**
   - Jasne procedury eskalacji incydentów bezpieczeństwa
   - Integracja z zespołami reagowania na incydenty organizacji
   - Regularne symulacje incydentów bezpieczeństwa i ćwiczenia tabletop

## 9. **Zgodność i nadzór**

**Zgodność regulacyjna:**
   - Zapewnij, że implementacje MCP spełniają wymogi branżowe (GDPR, HIPAA, SOC 2)
   - Wdrażaj klasyfikację danych i kontrole prywatności dla przetwarzania danych AI
   - Utrzymuj kompletną dokumentację do audytów zgodności

**Zarządzanie zmianami:**
   - Formalne przeglądy bezpieczeństwa dla wszystkich modyfikacji systemu MCP
   - Kontrola wersji i procesy zatwierdzania zmian konfiguracji
   - Regularne oceny zgodności i analiza luk

## 10. **Zaawansowane środki bezpieczeństwa**

**Architektura Zero Trust:**
   - **Nigdy nie ufaj, zawsze weryfikuj**: Ciągła weryfikacja użytkowników, urządzeń i połączeń
   - **Mikrosegmentacja**: Szczegółowe kontrole sieci izolujące poszczególne komponenty MCP
   - **Dostęp warunkowy**: Kontrole dostępu oparte na ryzyku, dostosowujące się do kontekstu i zachowania

**Ochrona aplikacji w czasie działania:**
   - **Runtime Application Self-Protection (RASP)**: Wdrażaj techniki RASP dla wykrywania zagrożeń w czasie rzeczywistym
   - **Monitorowanie wydajności aplikacji**: Obserwuj anomalie wydajności mogące wskazywać na ataki
   - **Dynamiczne polityki bezpieczeństwa**: Wdrażaj polityki bezpieczeństwa dostosowujące się do aktualnego krajobrazu zagrożeń

## 11. **Integracja z ekosystemem bezpieczeństwa Microsoft**

**Kompleksowe rozwiązania Microsoft Security:**
   - **Microsoft Defender for Cloud**: Zarządzanie postawą bezpieczeństwa w chmurze dla obciążeń MCP
   - **Azure Sentinel**: Natywne w chmurze SIEM i SOAR do zaawansowanego wykrywania zagrożeń
   - **Microsoft Purview**: Zarządzanie danymi i zgodnością dla przepływów AI oraz źródeł danych

**Zarządzanie tożsamością i dostępem:**
   - **Microsoft Entra ID**: Zarządzanie tożsamością korporacyjną z politykami dostępu warunkowego
   - **Privileged Identity Management (PIM)**: Dostęp just-in-time i procesy zatwierdzania funkcji administracyjnych
   - **Identity Protection**: Kontrola dostępu w oparciu o ryzyko oraz automatyczna reakcja na zagrożenia

## 12. **Ciągła ewolucja bezpieczeństwa**

**Bycie na bieżąco:**
   - **Monitorowanie specyfikacji**: Regularne przeglądy aktualizacji specyfikacji MCP i zmian w wytycznych bezpieczeństwa
   - **Wywiad dotyczący zagrożeń**: Integracja kanałów informacji o zagrożeniach specyficznych dla AI i wskaźników kompromitacji
   - **Zaangażowanie społeczności bezpieczeństwa**: Aktywny udział w społeczności bezpieczeństwa MCP oraz programach ujawniania podatności

**Adaptacyjne bezpieczeństwo:**
   - **Bezpieczeństwo oparte na uczeniu maszynowym**: Wykorzystuj wykrywanie anomalii oparte na ML dla identyfikacji nowych wzorców ataków
   - **Predykcyjna analiza bezpieczeństwa**: Wdrażaj modele prognostyczne dla proaktywnego wykrywania zagrożeń
   - **Automatyzacja bezpieczeństwa**: Automatyczna aktualizacja polityk bezpieczeństwa na podstawie wywiadu o zagrożeniach oraz zmian w specyfikacji

---

## **Kluczowe zasoby dotyczące bezpieczeństwa**

### **Oficjalna dokumentacja MCP**
- [Specyfikacja MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najlepsze praktyki bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specyfikacja autoryzacji MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Zasoby OWASP MCP dotyczące bezpieczeństwa**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kompletne OWASP MCP Top 10 z implementacją dla Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficjalne ryzyka bezpieczeństwa MCP według OWASP
- [Warsztat MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktyczne szkolenie z bezpieczeństwa MCP na platformie Azure

### **Rozwiązania bezpieczeństwa Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Standardy bezpieczeństwa**
- [Najlepsze praktyki bezpieczeństwa OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 dla dużych modeli językowych](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Przewodniki wdrożeniowe**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID z serwerami MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Uwaga bezpieczeństwa**: Praktyki bezpieczeństwa MCP rozwijają się bardzo dynamicznie. Zawsze weryfikuj względem aktualnej [specyfikacji MCP](https://spec.modelcontextprotocol.io/) oraz [oficjalnej dokumentacji bezpieczeństwa](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) przed wdrożeniem.

## Co dalej

- Przeczytaj: [Kontrole bezpieczeństwa MCP 2025](./mcp-security-controls-2025.md)
- Powrót do: [Przegląd modułu bezpieczeństwa](./README.md)
- Kontynuuj do: [Moduł 3: Pierwsze kroki](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony przy użyciu usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Chociaż dokładamy wszelkich starań, aby zapewnić poprawność, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym należy uważać za źródło autorytatywne. W przypadku informacji o znaczeniu krytycznym zaleca się skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->