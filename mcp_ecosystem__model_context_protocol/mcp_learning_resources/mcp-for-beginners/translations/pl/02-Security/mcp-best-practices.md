# Najlepsze praktyki zabezpieczeń MCP 2025

Ten kompleksowy przewodnik przedstawia kluczowe najlepsze praktyki zabezpieczeń dotyczące wdrażania systemów Model Context Protocol (MCP) na podstawie najnowszej **specyfikacji MCP 2025-11-25** oraz aktualnych standardów branżowych. Praktyki te odnoszą się zarówno do tradycyjnych zagadnień bezpieczeństwa, jak i specyficznych zagrożeń związanych ze sztuczną inteligencją, unikalnych dla wdrożeń MCP.

## Krytyczne wymagania bezpieczeństwa

### Obowiązkowe kontrole bezpieczeństwa (wymagania MUST)

1. **Weryfikacja tokenów**: Serwery MCP **NIE MOGĄ** akceptować jakichkolwiek tokenów, które nie zostały wyraźnie wydane dla samego serwera MCP  
2. **Weryfikacja autoryzacji**: Serwery MCP implementujące autoryzację **MUSZĄ** weryfikować WSZYSTKIE przychodzące żądania i **NIE MOGĄ** używać sesji do uwierzytelniania  
3. **Zgoda użytkownika**: Proxy MCP używające statycznych identyfikatorów klienta **MUSZĄ** uzyskać wyraźną zgodę użytkownika dla każdego dynamicznie rejestrowanego klienta  
4. **Bezpieczne identyfikatory sesji**: Serwery MCP **MUSZĄ** używać kryptograficznie bezpiecznych, niedeterministycznych identyfikatorów sesji generowanych za pomocą bezpiecznych generatorów liczb losowych

## Podstawowe praktyki bezpieczeństwa

### 1. Walidacja i oczyszczanie danych wejściowych
- **Kompleksowa walidacja wejścia**: Walidować i oczyszczać wszystkie dane wejściowe, aby zapobiegać atakom typu injection, problemom confused deputy oraz lukom wstrzyknięcia promptów  
- **Egzekwowanie schematów parametrów**: Wdrażać rygorystyczną walidację schematu JSON dla wszystkich parametrów narzędzi i wejść API  
- **Filtrowanie treści**: Wykorzystywać Microsoft Prompt Shields oraz Azure Content Safety do filtrowania złośliwych treści w promptach i odpowiedziach  
- **Oczyszczanie wyjść**: Walidować i oczyszczać wszystkie wyniki modeli przed ich prezentacją użytkownikom lub dalszym systemom

### 2. Doskonałość w uwierzytelnianiu i autoryzacji  
- **Zewnętrzni dostawcy tożsamości**: Delegować uwierzytelnianie do uznanych dostawców tożsamości (Microsoft Entra ID, dostawcy OAuth 2.1) zamiast tworzyć własne mechanizmy  
- **Szczegółowe uprawnienia**: Wdrażać granularne, specyficzne dla narzędzi pozwolenia zgodnie z zasadą najmniejszych uprawnień  
- **Zarządzanie cyklem życia tokenów**: Używać krótkotrwałych tokenów dostępu z bezpieczną rotacją i odpowiednią walidacją odbiorców  
- **Uwierzytelnianie wieloskładnikowe**: Wymagać MFA dla całego dostępu administracyjnego i operacji wrażliwych

### 3. Bezpieczne protokoły komunikacyjne
- **Bezpieczeństwo warstwy transportowej**: Stosować HTTPS/TLS 1.3 dla całej komunikacji MCP z odpowiednią walidacją certyfikatów  
- **Szyfrowanie end-to-end**: Wdrażać dodatkowe warstwy szyfrowania dla bardzo wrażliwych danych w tranzycie i podczas przechowywania  
- **Zarządzanie certyfikatami**: Utrzymywać odpowiednie zarządzanie cyklem życia certyfikatów z automatycznymi procesami odnawiania  
- **Egzekwowanie wersji protokołu**: Używać aktualnej wersji protokołu MCP (2025-11-25) z prawidłową negocjacją wersji.

### 4. Zaawansowane ograniczanie szybkości i ochrona zasobów  
- **Wielowarstwowe ograniczanie szybkości**: Wdrażać ograniczenia na poziomie użytkownika, sesji, narzędzi oraz zasobów, aby zapobiegać nadużyciom  
- **Adaptacyjne ograniczanie szybkości**: Korzystać z opartego na uczeniu maszynowym ograniczania szybkości, które dostosowuje się do wzorców użycia i wskaźników zagrożeń  
- **Zarządzanie limitami zasobów**: Ustawiać odpowiednie limity dla zasobów obliczeniowych, użycia pamięci i czasu wykonywania  
- **Ochrona przed DDoS**: Wdrażać kompleksowe systemy ochrony przed DDoS i analizy ruchu

### 5. Kompleksowe logowanie i monitorowanie  
- **Strukturalne logowanie audytowe**: Implementować szczegółowe, przeszukiwalne logi dla wszystkich operacji MCP, wykonania narzędzi oraz zdarzeń bezpieczeństwa  
- **Monitorowanie bezpieczeństwa w czasie rzeczywistym**: Wdrażać systemy SIEM z AI do wykrywania anomalii dla obciążeń MCP  
- **Logowanie zgodne z prywatnością**: Logować zdarzenia bezpieczeństwa z poszanowaniem wymogów ochrony danych i regulacji  
- **Integracja reagowania na incydenty**: Łączyć systemy logowania z zautomatyzowanymi procesami reagowania na incydenty

### 6. Udoskonalone praktyki bezpiecznego przechowywania  
- **Moduły bezpieczeństwa sprzętowego**: Korzystać z HSM do przechowywania kluczy (Azure Key Vault, AWS CloudHSM) dla krytycznych operacji kryptograficznych  
- **Zarządzanie kluczami szyfrowania**: Wdrażać odpowiednią rotację, segregację i kontrolę dostępu do kluczy szyfrowania  
- **Zarządzanie sekretami**: Przechowywać wszystkie klucze API, tokeny i dane uwierzytelniające w dedykowanych systemach zarządzania sekretami  
- **Klasyfikacja danych**: Klasyfikować dane według poziomu wrażliwości i stosować odpowiednie środki ochronne

### 7. Zaawansowane zarządzanie tokenami  
- **Zapobieganie przekazywaniu tokenów**: Wyraźnie zabraniać wzorców przekazywania tokenów, które omijają kontrole bezpieczeństwa  
- **Walidacja odbiorców tokenów**: Zawsze weryfikować, czy atrybuty audience tokenów odpowiadają tożsamości zamierzonego serwera MCP  
- **Autoryzacja oparta na claims**: Wdrażać granularną autoryzację opartą na claims tokenów i atrybutach użytkownika  
- **Powiązanie tokenów**: Powiązywać tokeny z konkretnymi sesjami, użytkownikami lub urządzeniami tam, gdzie to stosowne

### 8. Bezpieczne zarządzanie sesjami  
- **Kryptograficzne identyfikatory sesji**: Generować identyfikatory sesji za pomocą kryptograficznie bezpiecznych generatorów liczb losowych (nieprzewidywalnych sekwencji)  
- **Powiązanie z użytkownikiem**: Powiązywać identyfikatory sesji z informacjami specyficznymi dla użytkownika w bezpiecznych formatach, np. `<user_id>:<session_id>`  
- **Kontrola cyklu życia sesji**: Wdrażać właściwe mechanizmy wygasania, rotacji i unieważniania sesji  
- **Nagłówki bezpieczeństwa sesji**: Stosować odpowiednie nagłówki HTTP chroniące sesje

### 9. Specyficzne dla AI kontrole bezpieczeństwa  
- **Ochrona przed wstrzyknięciem promptów**: Wdrażać Microsoft Prompt Shields z technikami podświetlania, ograniczników i znakowania danych  
- **Zapobieganie zatruciu narzędzi**: Walidować metadane narzędzi, monitorować zmiany dynamiczne oraz weryfikować integralność narzędzi  
- **Walidacja wyników modeli**: Skanować wyniki modeli pod kątem potencjalnych wycieków danych, szkodliwych treści lub naruszeń polityk bezpieczeństwa  
- **Ochrona okna kontekstu**: Wdrażać kontrole zapobiegające zatruwaniu i manipulowaniu oknem kontekstu

### 10. Bezpieczeństwo wykonywania narzędzi  
- **Izolacja wykonywania**: Uruchamiać narzędzia w zwirtualizowanych, odizolowanych środowiskach kontenerowych z limitami zasobów  
- **Separacja uprawnień**: Wykonywać narzędzia z minimalnymi wymaganymi uprawnieniami oraz oddzielnymi kontami serwisowymi  
- **Izolacja sieciowa**: Wdrażać segmentację sieciową dla środowisk wykonawczych narzędzi  
- **Monitorowanie wykonania**: Monitorować wykonanie narzędzi pod kątem anomalii, wykorzystania zasobów i naruszeń bezpieczeństwa

### 11. Ciągła walidacja bezpieczeństwa  
- **Automatyczne testy bezpieczeństwa**: Integracja testów bezpieczeństwa z potokami CI/CD za pomocą narzędzi takich jak GitHub Advanced Security  
- **Zarządzanie lukami**: Regularne skanowanie wszystkich zależności, w tym modeli AI i usług zewnętrznych  
- **Testy penetracyjne**: Przeprowadzanie regularnych oceniań bezpieczeństwa skierowanych specjalnie na implementacje MCP  
- **Przeglądy kodu pod kątem bezpieczeństwa**: Wymuszanie obowiązkowych przeglądów kodu dla wszystkich zmian związanych z MCP

### 12. Bezpieczeństwo łańcucha dostaw AI  
- **Weryfikacja komponentów**: Weryfikować pochodzenie, integralność i bezpieczeństwo wszystkich komponentów AI (modele, embeddingi, API)  
- **Zarządzanie zależnościami**: Utrzymywać aktualne inwentarze wszystkich zależności oprogramowania i AI z nadzorem nad podatnościami  
- **Zaufane repozytoria**: Korzystać z weryfikowanych, zaufanych źródeł dla modeli AI, bibliotek i narzędzi  
- **Monitorowanie łańcucha dostaw**: Ciągłe monitorowanie naruszeń u dostawców usług AI i repozytoriów modeli

## Zaawansowane wzorce bezpieczeństwa

### Architektura Zero Trust dla MCP
- **Nigdy nie ufaj, zawsze weryfikuj**: Wdrażać ciągłą weryfikację wszystkich uczestników MCP  
- **Mikrosegmentacja**: Izolować komponenty MCP za pomocą granularnych kontroli sieciowych i tożsamościowych  
- **Dostęp warunkowy**: Wdrażać dostęp oparty na ryzyku, dostosowujący się do kontekstu i zachowania  
- **Ciągła ocena ryzyka**: Dynamicznie oceniać postawę bezpieczeństwa w oparciu o aktualne wskaźniki zagrożeń

### Prywatność-preserving Implementacja AI
- **Minimalizacja danych**: Udostępniać jedynie minimum niezbędnych danych dla każdej operacji MCP  
- **Prywatność różniczkowa**: Stosować techniki ochrony prywatności przy przetwarzaniu danych wrażliwych  
- **Szyfrowanie homomorficzne**: Wykorzystywać zaawansowane techniki szyfrowania do bezpiecznych obliczeń na zaszyfrowanych danych  
- **Uczenie federacyjne**: Wdrażać rozproszone podejścia do uczenia, zachowujące lokalność i prywatność danych

### Reagowanie na incydenty w systemach AI
- **Specyficzne procedury dla AI**: Opracować procedury reagowania na incydenty dostosowane do zagrożeń AI i MCP  
- **Automatyczne reagowanie**: Wdrażać automatyczne ograniczanie i remediację typowych incydentów bezpieczeństwa AI  
- **Możliwości śledcze**: Utrzymywać gotowość śledczą na incydenty naruszenia systemów AI i wycieków danych  
- **Procedury odzyskiwania**: Ustanowić procedury odzyskiwania po zatruciu modelu AI, atakach wstrzyknięcia promptów i naruszeniach usług

## Zasoby i standardy wdrożeniowe

### 🏔️ Praktyczne szkolenia z bezpieczeństwa
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Kompleksowe praktyczne warsztaty dotyczące zabezpieczeń serwerów MCP w Azure  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Architektura referencyjna i wytyczne OWASP MCP Top 10

### Oficjalna dokumentacja MCP
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Aktualna specyfikacja protokołu MCP  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Oficjalne wytyczne bezpieczeństwa  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Wzorce uwierzytelniania i autoryzacji  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Wymagania dotyczące zabezpieczeń warstwy transportowej

### Rozwiązania bezpieczeństwa Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Zaawansowana ochrona przed wstrzyknięciami promptów  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Kompleksowe filtrowanie treści AI  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Zarządzanie tożsamością i dostępem dla przedsiębiorstw  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Bezpieczne przechowywanie sekretów i poświadczeń  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Skanowanie bezpieczeństwa łańcucha dostaw i kodu

### Standardy i ramy bezpieczeństwa
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Aktualne wytyczne dotyczące bezpieczeństwa OAuth  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Ryzyka bezpieczeństwa aplikacji webowych  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Zagrożenia specyficzne dla AI  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Kompleksowe zarządzanie ryzykiem AI  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Systemy zarządzania bezpieczeństwem informacji

### Przewodniki i tutoriale wdrożeniowe
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Wzorce uwierzytelniania korporacyjnego  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integracja dostawcy tożsamości  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Najlepsze praktyki zarządzania tokenami  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Zaawansowane wzorce szyfrowania

### Zaawansowane zasoby bezpieczeństwa
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Praktyki bezpiecznego rozwoju oprogramowania  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - Testy bezpieczeństwa specyficzne dla AI  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodyka modelowania zagrożeń AI  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Techniki ochrony prywatności w AI

### Zgodność i zarządzanie
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Zgodność z prywatnością w systemach AI  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Odpowiedzialne wdrażanie AI  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Kontrole bezpieczeństwa dla dostawców usług AI  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Wymogi zgodności dla AI w ochronie zdrowia

### DevSecOps i automatyzacja
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Bezpieczne potoki rozwoju AI  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Ciągła walidacja bezpieczeństwa  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Bezpieczne wdrażanie infrastruktury  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Bezpieczeństwo konteneryzacji obciążeń AI

### Monitorowanie i reagowanie na incydenty  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Kompleksowe rozwiązania monitorujące  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Procedury reagowania na incydenty specyficzne dla AI  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Zarządzanie informacjami i zdarzeniami bezpieczeństwa  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Źródła informacji o zagrożeniach AI

## 🔄 Stałe doskonalenie

### Bądź na bieżąco z rozwijającymi się standardami
- **Aktualizacje specyfikacji MCP**: Monitoruj oficjalne zmiany specyfikacji MCP i komunikaty bezpieczeństwa  
- **Wywiad zagrożeń**: Subskrybuj źródła informacji o zagrożeniach bezpieczeństwa AI i bazy podatności  
- **Zaangażowanie społeczności**: Uczestnicz w dyskusjach i grupach roboczych społeczności bezpieczeństwa MCP  
- **Regularna ocena**: Przeprowadzaj kwartalne oceny stanu bezpieczeństwa i odpowiednio aktualizuj praktyki

### Wkład w bezpieczeństwo MCP
- **Badania bezpieczeństwa**: Wnoś wkład w badania bezpieczeństwa MCP i programy ujawniania luk  
- **Dzielenie się najlepszymi praktykami**: Udostępniaj społeczności implementacje bezpieczeństwa i wyciągnięte wnioski  
- **Tworzenie standardów**: Bierz udział w opracowywaniu specyfikacji MCP oraz tworzeniu standardów bezpieczeństwa  
- **Tworzenie narzędzi**: Twórz i udostępniaj narzędzia oraz biblioteki bezpieczeństwa dla ekosystemu MCP

---

*Ten dokument odzwierciedla najlepsze praktyki bezpieczeństwa MCP na dzień 18 grudnia 2025 roku, w oparciu o Specyfikację MCP z 25-11-2025. Praktyki bezpieczeństwa powinny być regularnie przeglądane i aktualizowane wraz z rozwojem protokołu i zmianami w krajobrazie zagrożeń.*

## Co dalej

- Przeczytaj: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Wróć do: [Security Module Overview](./README.md)  
- Kontynuuj do: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo iż dokładamy wszelkich starań, aby tłumaczenie było precyzyjne, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym powinien być uznawany za autorytatywne źródło. W przypadku informacji o krytycznym znaczeniu zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->