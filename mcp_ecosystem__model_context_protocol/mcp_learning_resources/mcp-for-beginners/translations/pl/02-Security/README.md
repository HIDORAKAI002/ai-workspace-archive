# MCP Security: Kompleksowa ochrona systemów AI

[![MCP Security Best Practices](../../../translated_images/pl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknij powyższy obrazek, aby obejrzeć wideo z tej lekcji)_

Bezpieczeństwo jest fundamentem projektowania systemów AI, dlatego priorytetowo traktujemy je jako naszą drugą sekcję. Zgodne jest to z zasadą Microsoft **Secure by Design** z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) wprowadza potężne nowe możliwości dla aplikacji napędzanych AI, jednocześnie stawiając unikalne wyzwania bezpieczeństwa wykraczające poza tradycyjne zagrożenia oprogramowania. Systemy MCP mierzą się zarówno z ugruntowanymi problemami bezpieczeństwa (bezpieczne kodowanie, najmniejsze uprawnienia, bezpieczeństwo łańcucha dostaw), jak i nowymi zagrożeniami specyficznymi dla AI, w tym wstrzykiwaniem promptów, zatruciem narzędzi, przejmowaniem sesji, atakami z „confused deputy”, lukami w przekazywaniu tokenów oraz dynamicznymi modyfikacjami uprawnień.

Ta lekcja omawia najważniejsze ryzyka bezpieczeństwa w implementacjach MCP — dotyczące uwierzytelniania, autoryzacji, nadmiernych uprawnień, pośredniego wstrzykiwania promptów, zabezpieczeń sesji, problemów z „confused deputy”, zarządzania tokenami oraz podatności łańcucha dostaw. Nauczysz się praktycznych środków zaradczych i najlepszych praktyk do ograniczania tych ryzyk, wykorzystując rozwiązania Microsoft, takie jak Prompt Shields, Azure Content Safety i GitHub Advanced Security, aby wzmocnić swoją instalację MCP.

## Cele nauki

Po ukończeniu tej lekcji będziesz potrafił:

- **Identyfikować zagrożenia specyficzne dla MCP**: Rozpoznawać unikalne ryzyka bezpieczeństwa w systemach MCP, w tym wstrzykiwanie promptów, zatrucie narzędzi, nadmierne uprawnienia, przejmowanie sesji, problemy z „confused deputy”, luki w przekazywaniu tokenów oraz ryzyka łańcucha dostaw
- **Stosować środki bezpieczeństwa**: Wdrażać skuteczne środki zaradcze, w tym solidne uwierzytelnianie, dostęp na zasadzie najmniejszych uprawnień, bezpieczne zarządzanie tokenami, zabezpieczenia sesji i weryfikację łańcucha dostaw
- **Wykorzystywać rozwiązania Microsoft Security**: Zrozumieć i wdrażać Microsoft Prompt Shields, Azure Content Safety oraz GitHub Advanced Security dla ochrony obciążeń MCP
- **Weryfikować bezpieczeństwo narzędzi**: Dostrzegać znaczenie walidacji metadanych narzędzi, monitorowania dynamicznych zmian i obrony przed pośrednimi atakami wstrzykiwania promptów
- **Integracja najlepszych praktyk**: Łączyć ustalone fundamenty bezpieczeństwa (bezpieczne kodowanie, hardening serwera, zero trust) z kontrolami specyficznymi dla MCP dla kompleksowej ochrony

# Architektura bezpieczeństwa MCP i kontrole

Nowoczesne implementacje MCP wymagają wielowarstwowego podejścia do bezpieczeństwa, które uwzględnia zarówno tradycyjne bezpieczeństwo oprogramowania, jak i specyficzne zagrożenia AI. Dynamicznie rozwijająca się specyfikacja MCP stale doskonali swoje mechanizmy bezpieczeństwa, umożliwiając lepszą integrację z architekturami bezpieczeństwa przedsiębiorstw i sprawdzonymi najlepszymi praktykami.

Badania z [Microsoft Digital Defense Report](https://aka.ms/mddr) pokazują, że **98% zgłoszonych naruszeń zostałoby zapobiegniętych dzięki solidnej higienie bezpieczeństwa**. Najskuteczniejsza strategia ochrony łączy podstawowe praktyki bezpieczeństwa z kontrolami specyficznymi dla MCP — sprawdzone, podstawowe środki bezpieczeństwa pozostają najistotniejsze w ograniczaniu ogólnego ryzyka.

## Aktualny krajobraz bezpieczeństwa

> **Uwaga:** Informacje odzwierciedlają standardy bezpieczeństwa MCP na dzień **5 lutego 2026**, zgodnie ze specyfikacją **MCP 2025-11-25**. Protokół MCP szybko się rozwija, a przyszłe implementacje mogą wprowadzić nowe wzorce uwierzytelniania i ulepszone kontrole. Zawsze odwołuj się do aktualnej [specyfikacji MCP](https://spec.modelcontextprotocol.io/), [repozytorium MCP na GitHub](https://github.com/modelcontextprotocol) oraz [dokumentacji najlepszych praktyk bezpieczeństwa](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) po najnowsze wytyczne.

> **Na przyszłość:** kandydat na wersję `2026-07-28` wzmacnia autoryzację — klienci muszą weryfikować parametr `iss` w odpowiedziach autoryzacji (RFC 9207), deklarować typ aplikacji OpenID Connect `application_type` podczas Dynamicznej Rejestracji Klienta oraz wiązać zarejestrowane poświadczenia z wystawiającym serwerem autoryzacji. Zobacz [Co się zmienia w MCP: kandydat na wersję 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) dla pełnej listy SEP autoryzacji.

## 🏔️ Warsztaty MCP Security Summit (Sherpa)

Dla **praktycznego szkolenia z bezpieczeństwa** gorąco polecamy **MCP Security Summit Workshop** (Sherpa) — kompleksową, prowadzoną wyprawę do zabezpieczania serwerów MCP w Microsoft Azure.

### Przegląd warsztatów

[Warsztaty MCP Security Summit](https://azure-samples.github.io/sherpa/) oferują praktyczne, wykonalne szkolenie z zakresu bezpieczeństwa oparte na sprawdzonej metodologii „wrażliwość → exploit → naprawa → walidacja”. Nauczysz się:

- **Przez łamanie zabezpieczeń**: Doświadczyć luk przez atakowanie celowo niechronionych serwerów
- **Wykorzystując natywne zabezpieczenia Azure**: Korzystać z Azure Entra ID, Key Vault, API Management oraz AI Content Safety
- **Zasady obrony w głąb (Defense-in-Depth)**: Przechodzić kolejne etapy budując wielowarstwową ochronę
- **Zastosowanie standardów OWASP**: Każda technika jest powiązana z [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Gotowy kod produkcyjny**: Uzyskać działające, przetestowane implementacje

### Trasa wyprawy

| Obóz | Temat | Zagrożenia OWASP omawiane |
|------|-------|---------------------------|
| **Obóz bazowy** | Podstawy MCP i luki w uwierzytelnianiu | MCP01, MCP07 |
| **Obóz 1: Tożsamość** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Obóz 2: Brama** | API Management, prywatne punkty końcowe, zarządzanie | MCP02, MCP06, MCP07, MCP09 |
| **Obóz 3: Bezpieczeństwo I/O** | Wstrzykiwanie promptów, ochrona PII, bezpieczeństwo treści | MCP03, MCP05, MCP06, MCP10 |
| **Obóz 4: Monitorowanie** | Log Analytics, panele, wykrywanie zagrożeń | MCP04, MCP08 |
| **Szczyt** | Test integracji Red Team / Blue Team | Wszystkie |

**Zacznij tutaj**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 zagrożeń bezpieczeństwa

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) opisuje dziesięć najważniejszych zagrożeń bezpieczeństwa dla implementacji MCP:

| Zagrożenie | Opis | Środki ochrony w Azure |
|------------|-------|------------------------|
| **MCP01** | Błędne zarządzanie tokenami i wyciek sekretów | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalacja uprawnień przez rozszerzanie zakresów | RBAC, Conditional Access |
| **MCP03** | Zatrucie narzędzi | Walidacja narzędzi, weryfikacja integralności |
| **MCP04** | Ataki na łańcuch dostaw oprogramowania i manipulacje zależnościami | GitHub Advanced Security, skanowanie zależności |
| **MCP05** | Wstrzyknięcie i wykonanie poleceń | Walidacja wejścia, sandboxing |
| **MCP06** | Podrabianie przepływu intencji | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Niewystarczające uwierzytelnianie i autoryzacja | Azure Entra ID, OAuth 2.1 z PKCE |
| **MCP08** | Brak audytu i telemetrii | Azure Monitor, Application Insights |
| **MCP09** | Cieniowe serwery MCP | Zarządzanie API Center, izolacja sieciowa |
| **MCP10** | Wstrzykiwanie kontekstu i nadmierne udostępnianie | Klasyfikacja danych, minimalna ekspozycja |

### Ewolucja uwierzytelniania MCP

Specyfikacja MCP znacznie się rozwinęła w kwestii uwierzytelniania i autoryzacji:

- **Początkowe podejście**: Wczesne wersje wymagały implementacji niestandardowych serwerów uwierzytelniania, gdzie serwery MCP działały jako serwery autoryzacji OAuth 2.0 zarządzające bezpośrednio uwierzytelnianiem użytkowników
- **Obecny standard (2025-11-25)**: Zaktualizowana specyfikacja zezwala serwerom MCP na delegowanie uwierzytelniania do zewnętrznych dostawców tożsamości (np. Microsoft Entra ID), poprawiając postawę bezpieczeństwa i upraszczając implementację
- **Bezpieczeństwo warstwy transportowej**: Ulepszone wsparcie dla bezpiecznych mechanizmów transportu z odpowiednimi wzorcami uwierzytelniania zarówno dla połączeń lokalnych (STDIO), jak i zdalnych (Streamable HTTP)

## Bezpieczeństwo uwierzytelniania i autoryzacji

### Aktualne wyzwania bezpieczeństwa

Nowoczesne implementacje MCP napotykają kilka wyzwań dotyczących uwierzytelniania i autoryzacji:

### Ryzyka i wektory ataku

- **Błędna logika autoryzacji**: Wadliwa implementacja autoryzacji w serwerach MCP może ujawniać wrażliwe dane i błędnie stosować kontrole dostępu
- **Kompromitacja tokenów OAuth**: Kradzież tokenów lokalnego serwera MCP umożliwia atakującym podszywanie się pod serwer oraz dostęp do usług downstream
- **Luki w przekazywaniu tokenów**: Nieprawidłowa obsługa tokenów powoduje pomijanie kontroli bezpieczeństwa i luki w rozliczalności
- **Nadmierne uprawnienia**: Nadmierne uprawnienia serwerów MCP łamią zasady najmniejszych uprawnień i rozszerzają powierzchnię ataku

#### Przekazywanie tokenów: krytyczny antywzorzec

**Przekazywanie tokenów jest wyraźnie zabronione** w obecnej specyfikacji autoryzacji MCP ze względu na poważne implikacje bezpieczeństwa:

##### Obejście kontroli bezpieczeństwa
- Serwery MCP oraz API downstream implementują kluczowe zabezpieczenia (limitowanie liczby żądań, walidację żądań, monitorowanie ruchu), które zależą od poprawnej walidacji tokenów
- Bezpośrednie wykorzystanie tokenów klienta do API omija te istotne zabezpieczenia, podważając architekturę bezpieczeństwa

##### Problemy z rozliczalnością i audytem  
- Serwery MCP nie potrafią odróżnić klientów używających tokenów wydanych upstream, co łamie ścieżki audytu
- Logi serwerów zasobów downstream pokazują błędne pochodzenie żądań zamiast faktycznych pośredników MCP
- Dochodzenia incydentów i audyty zgodności stają się znacznie utrudnione

##### Ryzyko eksfiltracji danych
- Nieweryfikowane roszczenia w tokenach pozwalają złośliwym aktorom na wykorzystanie skradzionych tokenów do używania serwerów MCP jako proxy do wydobywania danych
- Naruszenia granicy zaufania umożliwiają nieautoryzowane wzorce dostępu pomijające zamierzone kontrole

##### Wektory ataków wielousługowych
- Składane tokeny akceptowane przez wiele usług ułatwiają ruch boczny między powiązanymi systemami
- Założenia zaufania między usługami mogą zostać złamane, gdy pochodzenie tokenów nie jest weryfikowane

### Kontrole bezpieczeństwa i środki zaradcze

**Krytyczne wymagania bezpieczeństwa:**

> **OBOWIĄZKOWE**: Serwery MCP **NIE MOGĄ** akceptować tokenów, które nie zostały wyraźnie wystawione dla danego serwera MCP

#### Kontrole uwierzytelniania i autoryzacji

- **Dokładny przegląd autoryzacji**: Przeprowadzaj kompleksowe audyty logiki autoryzacji serwera MCP, aby upewnić się, że tylko zamierzeni użytkownicy i klienci mają dostęp do wrażliwych zasobów
  - **Przewodnik wdrożenia**: [Azure API Management jako brama uwierzytelniania dla serwerów MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integracja tożsamości**: [Używanie Microsoft Entra ID do uwierzytelniania serwerów MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpieczne zarządzanie tokenami**: Stosuj [najlepsze praktyki Microsoft dotyczące walidacji tokenów i cyklu życia](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Weryfikuj, czy odbiorca tokena zgadza się z tożsamością serwera MCP
  - Wdrażaj odpowiednią rotację i politykę wygaśnięcia tokenów
  - Zapobiegaj atakom powtórnego odtwarzania tokenów i nieautoryzowanemu użyciu

- **Chronione przechowywanie tokenów**: Zabezpieczaj tokeny szyfrowaniem zarówno w spoczynku, jak i w trakcie transmisji
  - **Najlepsze praktyki**: [Zasady bezpiecznego przechowywania i szyfrowania tokenów](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementacja kontroli dostępu

- **Zasada najmniejszych uprawnień**: Nadawaj serwerom MCP tylko minimalne uprawnienia niezbędne do działania
  - Regularne przeglądy i aktualizacje uprawnień w celu zapobiegania eskalacji
  - **Dokumentacja Microsoft**: [Bezpieczny dostęp o najmniejszych uprawnieniach](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrola dostępu oparta na rolach (RBAC)**: Wdrażaj precyzyjne przypisywanie ról
  - Dokładnie definiuj role dla konkretnych zasobów i akcji
  - Unikaj nadmiernych lub niepotrzebnych uprawnień rozszerzających powierzchnię ataku

- **Ciągły monitoring uprawnień**: Wprowadź nieprzerwany audyt i monitoring dostępu
  - Obserwuj wzorce użycia uprawnień pod kątem anomalii
  - Szybko usuwaj nadmiarowe lub nieużywane uprawnienia

## Specyficzne zagrożenia dla AI

### Ataki wstrzykiwania promptów i manipulacji narzędziami

Nowoczesne implementacje MCP stają przed zaawansowanymi, specyficznymi dla AI wektorami ataków, które tradycyjne środki bezpieczeństwa nie są w stanie w pełni zaadresować:

#### **Pośrednie wstrzykiwanie promptów (Cross-Domain Prompt Injection)**

**Pośrednie wstrzykiwanie promptów** to jedno z najpoważniejszych zagrożeń w systemach AI korzystających z MCP. Atakujący umieszczają złośliwe instrukcje w zewnętrznych treściach — dokumentach, stronach internetowych, e-mailach lub źródłach danych — które systemy AI później interpretują jako prawidłowe polecenia.

**Scenariusze ataku:**
- **Wstrzykiwanie w dokumentach**: Złośliwe instrukcje ukryte w przetwarzanych dokumentach wywołujące niezamierzone działania AI
- **Wykorzystanie treści internetowych**: Zainfekowane strony internetowe zawierające osadzone prompty manipulujące zachowaniem AI podczas ich pobierania
- **Ataki poprzez e-maile**: Złośliwe prompty w wiadomościach e-mail powodujące wyciek informacji lub nieautoryzowane akcje asystentów AI
- **Zanieczyszczenie źródeł danych**: Zainfekowane bazy danych lub API dostarczające skażoną treść dla systemów AI

**Realne skutki**: Te ataki mogą prowadzić do eksfiltracji danych, naruszeń prywatności, generowania szkodliwych treści i manipulacji interakcjami użytkownika. Szczegółowa analiza dostępna na [Prompt Injection w MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/pl/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataki zatrucia narzędzi**

**Zatrucie narzędzi** atakuje metadane definiujące narzędzia MCP, wykorzystując sposób, w jaki modele LLM interpretują opisy i parametry tych narzędzi w procesie podejmowania decyzji o wykonaniu.

**Mechanizmy ataku:**
- **Manipulacja metadanymi**: Atakujący wstrzykują złośliwe instrukcje w opisy narzędzi, definicje parametrów lub przykłady użycia
- **Niewidoczne instrukcje**: Ukryte prompty w metadanych narzędzi przetwarzane przez modele AI, niewidoczne dla użytkowników
- **Dynamiczna modyfikacja narzędzi („Rug Pulls”)**: Narzędzia zatwierdzone przez użytkowników są później modyfikowane do złośliwych działań bez ich wiedzy
- **Wstrzykiwanie parametrów**: Złośliwa zawartość w schematach parametrów narzędzi wpływająca na zachowanie modeli
**Ryzyka serwera hostowanego**: Zdalne serwery MCP niosą podwyższone ryzyko, ponieważ definicje narzędzi mogą być aktualizowane po początkowej akceptacji użytkownika, co stwarza scenariusze, w których wcześniej bezpieczne narzędzia stają się złośliwe. Dla kompleksowej analizy zobacz [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram ataku wstrzyknięcia narzędzi](../../../translated_images/pl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatkowe wektory ataków AI**

- **Cross-Domain Prompt Injection (XPIA)**: Zaawansowane ataki wykorzystujące treści z wielu domen do ominięcia zabezpieczeń
- **Dynamiczna modyfikacja funkcji**: Zmiany możliwości narzędzi w czasie rzeczywistym, które unikają wstępnych ocen bezpieczeństwa
- **Zatrucie okna kontekstu**: Ataki manipulujące dużymi oknami kontekstowymi w celu ukrycia złośliwych instrukcji
- **Ataki model confusion**: Wykorzystywanie ograniczeń modeli do tworzenia nieprzewidywalnych lub niebezpiecznych zachowań


### Wpływ ryzyk bezpieczeństwa AI

**Konsekwencje o wysokim wpływie:**
- **Eksfiltracja danych**: Nieautoryzowany dostęp i kradzież wrażliwych danych przedsiębiorstwa lub danych osobowych
- **Naruszenia prywatności**: Ujawnienie danych osobowych (PII) i poufnych danych biznesowych  
- **Manipulacja systemem**: Niezamierzone modyfikacje krytycznych systemów i procesów
- **Kradzież poświadczeń**: Kompromitacja tokenów uwierzytelniających i poświadczeń usług
- **Ruch boczny**: Wykorzystanie skompromitowanych systemów AI jako punktów zaczepienia do szerszych ataków sieciowych

### Rozwiązania bezpieczeństwa AI Microsoft

#### **AI Prompt Shields: Zaawansowana ochrona przed atakami wstrzyknięcia**

Microsoft **AI Prompt Shields** zapewnia kompleksową obronę przed bezpośrednimi i pośrednimi atakami typu prompt injection dzięki wielu warstwom zabezpieczeń:

##### **Podstawowe mechanizmy ochronne:**

1. **Zaawansowane wykrywanie i filtrowanie**
   - Algorytmy uczenia maszynowego i techniki NLP wykrywają złośliwe instrukcje w zewnętrznej treści
   - Analiza w czasie rzeczywistym dokumentów, stron internetowych, e-maili i źródeł danych pod kątem osadzonych zagrożeń
   - Kontekstowe rozróżnianie wzorców legalnych i złośliwych promptów

2. **Techniki spotlightingu**  
   - Rozróżnia zaufane instrukcje systemowe od potencjalnie skompromitowanych zewnętrznych wejść
   - Metody transformacji tekstu zwiększające relewantność modelu przy izolowaniu złośliwej zawartości
   - Pomaga systemom AI utrzymać właściwą hierarchię instrukcji i ignorować wstrzyknięte polecenia

3. **Systemy delimiterów i znakowania danych**
   - Jawne definiowanie granic między zaufanymi komunikatami systemowymi a zewnętrznym tekstem wejściowym
   - Specjalne znaczniki wyróżniające granice między zaufanymi i niezaufanymi źródłami danych
   - Jasne oddzielenie zapobiega pomyłkom instrukcji i nieautoryzowanemu wykonywaniu poleceń

4. **Ciągłe monitorowanie zagrożeń**
   - Microsoft nieustannie monitoruje pojawiające się wzorce ataków i aktualizuje zabezpieczenia
   - Proaktywne poszukiwanie nowych technik wstrzyknięć i wektorów ataku
   - Regularne aktualizacje modeli bezpieczeństwa zapewniające skuteczność wobec ewoluujących zagrożeń

5. **Integracja Azure Content Safety**
   - Część kompleksowego pakietu Azure AI Content Safety
   - Dodatkowe wykrywanie prób jailbreaku, szkodliwej zawartości i naruszeń polityk bezpieczeństwa
   - Zunifikowane kontrolki bezpieczeństwa we wszystkich komponentach aplikacji AI

**Zasoby implementacyjne**: [Dokumentacja Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Ochrona Microsoft Prompt Shields](../../../translated_images/pl/prompt-shield.ff5b95be76e9c78c.webp)


## Zaawansowane zagrożenia bezpieczeństwa MCP

### Luki w przejmowaniu sesji

**Przejęcie sesji** stanowi krytyczny wektor ataku w stanowych implementacjach MCP, gdzie nieautoryzowane strony uzyskują i wykorzystują legalne identyfikatory sesji, by podszywać się pod klientów i wykonywać nieautoryzowane działania.

#### **Scenariusze i ryzyka ataków**

- **Przejęcie sesji z wstrzyknięciem promptu**: Atakujący z kradzionymi identyfikatorami sesji wstrzykują złośliwe zdarzenia do serwerów dzielących stan sesji, co może wywołać szkodliwe akcje lub dostęp do danych wrażliwych
- **Bezpośrednie podszycie**: Skradzione identyfikatory sesji umożliwiają bezpośrednie wywołania serwera MCP z pominięciem uwierzytelniania, traktując atakujących jako legalnych użytkowników
- **Skompromitowane strumienie wznawialne**: Atakujący mogą przedwcześnie zakończyć żądania, powodując, że legalni klienci wznawiają sesję z potencjalnie złośliwą zawartością

#### **Kontrole bezpieczeństwa zarządzania sesją**

**Krytyczne wymagania:**
- **Weryfikacja autoryzacji**: Serwery MCP implementujące autoryzację **MUSZĄ** weryfikować WSZYSTKIE przychodzące żądania i **NIE MOGĄ** polegać na sesjach jako metodzie uwierzytelniania
- **Bezpieczne generowanie sesji**: Stosować kryptograficznie bezpieczne, niedeterministyczne identyfikatory sesji generowane przez bezpieczne generatory liczb losowych
- **Powiązanie specyficzne dla użytkownika**: Wiązać identyfikatory sesji z informacjami użytkownika za pomocą formatów typu `<user_id>:<session_id>`, aby zapobiec krzyżowemu używaniu sesji
- **Zarządzanie cyklem życia sesji**: Implementować właściwe wygasanie, rotację i unieważnianie sesji, by ograniczyć okna podatności
- **Bezpieczeństwo transmisji**: Wymagać HTTPS dla całej komunikacji, by zapobiec przechwytywaniu identyfikatorów sesji

### Problem Confused Deputy

**Problem confused deputy** pojawia się, gdy serwery MCP działają jako proxy uwierzytelniające między klientami a usługami zewnętrznymi, tworząc możliwości obejścia autoryzacji przez wykorzystywanie statycznych identyfikatorów klienta.

#### **Mechanika ataku i ryzyka**

- **Omijanie zgody oparte na ciasteczkach**: Wcześniejsza autoryzacja użytkownika tworzy ciasteczka zgody, które atakujący wykorzystują przez złośliwe żądania autoryzacyjne z przygotowanymi URI przekierowań
- **Kradzież kodów autoryzacyjnych**: Istniejące ciasteczka zgody mogą spowodować pominięcie ekranów zgody przez serwery autoryzacyjne, które przekierowują kody do punktów kontrolowanych przez atakującego  
- **Nieautoryzowany dostęp do API**: Skradzione kody autoryzacyjne umożliwiają wymianę tokenów i podszywanie się pod użytkowników bez wyraźnej zgody

#### **Strategie łagodzenia**

**Wymagane kontrole:**
- **Wymogi jasnej zgody**: Proxy MCP wykorzystujące statyczne identyfikatory klienta **MUSI** uzyskiwać zgodę użytkownika dla każdego dynamicznie rejestrowanego klienta
- **Wdrożenie bezpieczeństwa OAuth 2.1**: Stosować najlepsze praktyki bezpieczeństwa OAuth, w tym PKCE (Proof Key for Code Exchange) dla wszystkich żądań autoryzacyjnych
- **Ścisła walidacja klienta**: Wdrażać rygorystyczną walidację URI przekierowania i identyfikatorów klienta, aby zapobiec nadużyciom

### Luki w ujawnianiu tokenów  

**Token passthrough** to jawny antywzorzec polegający na zaakceptowaniu tokenów klienta przez serwery MCP bez odpowiedniej walidacji i przekazywaniu ich do dalszych API, łamiąc specyfikacje autoryzacji MCP.

#### **Implikacje bezpieczeństwa**

- **Ominięcie kontroli**: Bezpośrednie użycie tokenów klienta do API pomija krytyczne ograniczenia limitów, walidacje i monitorowanie
- **Zanieczyszczenie śladu audytu**: Tokeny wydane upstream uniemożliwiają identyfikację klienta, co psuje zdolność do badania incydentów
- **Eksfiltracja danych przez proxy**: Niezwalidowane tokeny umożliwiają złośliwcom wykorzystanie serwerów jako proxy do nieautoryzowanego dostępu
- **Naruszenia granic zaufania**: Założenia zaufania usług downstream mogą zostać złamane, gdy pochodzenie tokenów jest nieweryfikowalne
- **Rozprzestrzenianie ataków na wiele usług**: Kompromitowane tokeny akceptowane w wielu usługach umożliwiają ruch boczny

#### **Wymagane kontrole bezpieczeństwa**

**Bezwarunkowe wymagania:**
- **Walidacja tokenów**: Serwery MCP **NIE MOGĄ** akceptować tokenów nie wydanych explicit dla serwera MCP
- **Weryfikacja audytorium**: Zawsze weryfikować, czy claims audytorium tokenu odpowiada tożsamości serwera MCP
- **Prawidłowy cykl życia tokenu**: Implementować krótkotrwałe tokeny dostępu z bezpieczną rotacją


## Bezpieczeństwo łańcucha dostaw dla systemów AI

Bezpieczeństwo łańcucha dostaw poszerzyło się poza tradycyjne zależności oprogramowania, obejmując cały ekosystem AI. Nowoczesne implementacje MCP muszą rygorystycznie weryfikować i monitorować wszystkie komponenty powiązane z AI, ponieważ każdy z nich wprowadza potencjalne podatności mogące zagrozić integralności systemu.

### Rozszerzone komponenty łańcucha dostaw AI

**Tradycyjne zależności oprogramowania:**
- Biblioteki open-source i frameworki
- Obrazy kontenerów i systemy bazowe  
- Narzędzia deweloperskie i pipeline’y buildów
- Komponenty infrastruktury i usługi

**Elementy specyficzne dla łańcucha dostaw AI:**
- **Modele fundamentowe**: Wstępnie wytrenowane modele od różnych dostawców wymagające weryfikacji pochodzenia
- **Usługi osadzania**: Zewnętrzne usługi wektorowe i semantyczne wyszukiwanie
- **Dostawcy kontekstu**: Źródła danych, bazy wiedzy i repozytoria dokumentów  
- **API stron trzecich**: Zewnętrzne usługi AI, pipeline’y ML i punkty przetwarzania danych
- **Artefakty modelu**: Wagi, konfiguracje i warianty modeli fine-tuned
- **Źródła danych szkoleniowych**: Zbiory danych wykorzystywane do trenowania i dostrajania modeli

### Kompleksowa strategia bezpieczeństwa łańcucha dostaw

#### **Weryfikacja komponentów i zaufanie**
- **Weryfikacja pochodzenia**: Sprawdzanie źródła, licencjonowania i integralności wszystkich komponentów AI przed integracją
- **Ocena bezpieczeństwa**: Przeprowadzanie skanowania podatności i przeglądów bezpieczeństwa modeli, źródeł danych i usług AI
- **Analiza reputacji**: Ocena historii bezpieczeństwa i praktyk dostawców usług AI
- **Weryfikacja zgodności**: Zapewnienie, że wszystkie komponenty spełniają wymagania bezpieczeństwa organizacji i regulacji

#### **Bezpieczne pipeline’y wdrożeniowe**  
- **Zautomatyzowane bezpieczeństwo CI/CD**: Integracja skanowania bezpieczeństwa w całych pipeline'ach wdrożeniowych
- **Integralność artefaktów**: Stosowanie weryfikacji kryptograficznej wszystkich wdrażanych artefaktów (kod, modele, konfiguracje)
- **Etapowe wdrożenia**: Wykorzystanie progresywnych strategii wdrożenia z walidacją bezpieczeństwa na każdym etapie
- **Zaufane repozytoria artefaktów**: Wdrażanie tylko z zweryfikowanych, bezpiecznych rejestrów i repozytoriów

#### **Ciągłe monitorowanie i reakcja**
- **Skanowanie zależności**: Ongoing monitoring podatności dla wszystkich zależności oprogramowania i komponentów AI
- **Monitorowanie modeli**: Stała ocena zachowania modeli, dryfu wydajności i anomalii bezpieczeństwa
- **Śledzenie stanu usług**: Monitorowanie zewnętrznych usług AI pod kątem dostępności, incydentów bezpieczeństwa i zmian polityk
- **Integracja wywiadu o zagrożeniach**: Włączenie kanałów informacji o zagrożeniach specyficznych dla ryzyk AI i ML

#### **Kontrola dostępu i zasada najmniejszych uprawnień**
- **Uprawnienia na poziomie komponentów**: Ograniczanie dostępu do modeli, danych i usług na podstawie konieczności biznesowej
- **Zarządzanie kontami usług**: Implementacja dedykowanych kont usług z minimalnymi wymaganymi uprawnieniami
- **Segmentacja sieci**: Izolowanie komponentów AI i ograniczanie dostępu sieciowego między usługami
- **Kontrole bramy API**: Używanie scentralizowanych bram API do kontroli i monitorowania dostępu do zewnętrznych usług AI

#### **Reakcja na incydenty i odzyskiwanie**
- **Procedury szybkiej reakcji**: Ustanowione procesy łatania lub wymiany skompromitowanych komponentów AI
- **Rotacja poświadczeń**: Zautomatyzowane systemy rotacji sekretów, kluczy API i poświadczeń usług
- **Możliwości cofania zmian**: Umiejętność szybkiego powrotu do poprzednich, sprawdzonych wersji komponentów AI
- **Odzyskiwanie po naruszeniach łańcucha dostaw**: Specyficzne procedury reagowania na kompromitacje usług AI upstream

### Narzędzia i integracja bezpieczeństwa Microsoft

**GitHub Advanced Security** oferuje kompleksową ochronę łańcucha dostaw, w tym:
- **Skanowanie sekretów**: Automatyczna detekcja poświadczeń, kluczy API i tokenów w repozytoriach
- **Skanowanie zależności**: Ocena podatności zależności open-source i bibliotek
- **Analiza CodeQL**: Statyczna analiza kodu pod kątem luk bezpieczeństwa i błędów
- **Wgląd w łańcuch dostaw**: Widoczność stanu zdrowia i bezpieczeństwa zależności

**Integracja Azure DevOps i Azure Repos:**
- Płynna integracja skanowania bezpieczeństwa w platformach rozwojowych Microsoft
- Automatyczne kontrole bezpieczeństwa w Azure Pipelines dla obciążeń AI
- Egzekwowanie polityk bezpiecznego wdrażania komponentów AI

**Praktyki wewnętrzne Microsoft:**
Microsoft wdraża rozległe praktyki bezpieczeństwa łańcucha dostaw we wszystkich produktach. Poznaj sprawdzone podejścia w [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Najlepsze praktyki bezpieczeństwa fundamentów

Implementacje MCP dziedziczą i budują na istniejącym zabezpieczeniu organizacji. Wzmacnianie podstawowych praktyk bezpieczeństwa znacząco zwiększa ogólne bezpieczeństwo systemów AI i wdrożeń MCP.

### Podstawowe zasady bezpieczeństwa

#### **Praktyki bezpiecznego rozwoju**
- **Zgodność z OWASP**: Ochrona przed [OWASP Top 10](https://owasp.org/www-project-top-ten/) podatnościami aplikacji webowych
- **Ochrona specyficzna dla AI**: Wdrażanie kontroli dla [OWASP Top 10 dla LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Bezpieczne zarządzanie sekretami**: Wykorzystywanie dedykowanych sejfów na tokeny, klucze API i poufne dane konfiguracyjne
- **Szyfrowanie end-to-end**: Zapewnianie bezpiecznej komunikacji we wszystkich komponentach i przepływach danych aplikacji
- **Walidacja wejścia**: Rygorystyczna weryfikacja wszystkich danych wejściowych użytkownika, parametrów API i źródeł danych

#### **Usztywnianie infrastruktury**
- **Uwierzytelnianie wieloskładnikowe**: Obowiązkowe MFA dla wszystkich kont administracyjnych i usługowych
- **Zarządzanie aktualizacjami**: Automatyczne, terminowe łatki systemów operacyjnych, frameworków i zależności  
- **Integracja dostawcy tożsamości**: Centralne zarządzanie tożsamością przez korporacyjnych dostawców tożsamości (Microsoft Entra ID, Active Directory)
- **Segmentacja sieci**: Logiczna izolacja komponentów MCP w celu ograniczenia potencjału ruchu bocznego
- **Zasada najmniejszych uprawnień**: Minimalne wymagane uprawnienia dla wszystkich komponentów i kont systemu

#### **Monitorowanie i wykrywanie zagrożeń**
- **Kompletne logowanie**: Szczegółowe logi działań aplikacji AI, w tym interakcje klient-serwer MCP
- **Integracja SIEM**: Centralne zarządzanie informacjami i zdarzeniami bezpieczeństwa dla wykrywania anomalii
- **Analiza behawioralna**: Monitorowanie oparte na AI do wykrywania niestandardowych wzorców zachowań systemu i użytkowników
- **Wywiad o zagrożeniach**: Integracja z kanałami zewnętrznych zagrożeń i wskaźnikami kompromitacji (IOC)
- **Reakcja na incydenty**: Definiowane procedury wykrywania, reagowania i odzyskiwania po incydentach bezpieczeństwa

#### **Architektura Zero Trust**
- **Nigdy nie ufaj, zawsze weryfikuj**: Ciągła weryfikacja użytkowników, urządzeń i połączeń sieciowych
- **Mikrosegmentacja**: Granularne kontrole sieci izolujące pojedyncze obciążenia i usługi
- **Bezpieczeństwo skoncentrowane na tożsamości**: Polityki bezpieczeństwa oparte na zweryfikowanych tożsamościach, a nie lokalizacji sieciowej
- **Ciągła ocena ryzyka**: Dynamiczna ewaluacja postawy bezpieczeństwa na podstawie aktualnego kontekstu i zachowań
- **Dostęp warunkowy**: Kontrole dostępu dopasowujące się na podstawie czynników ryzyka, lokalizacji i zaufania do urządzenia

### Wzorce integracji korporacyjnej

#### **Integracja ekosystemu bezpieczeństwa Microsoft**
- **Microsoft Defender for Cloud**: Kompleksowe zarządzanie postawą bezpieczeństwa chmury
- **Azure Sentinel**: Natywne w chmurze SIEM i SOAR do ochrony obciążeń AI
- **Microsoft Entra ID**: Korporacyjne zarządzanie tożsamością i dostępem z politykami dostępu warunkowego
- **Azure Key Vault**: Centralne zarządzanie sekretami z modułem bezpieczeństwa sprzętowego (HSM)
- **Microsoft Purview**: Zarządzanie danymi i zgodnością dla źródeł danych AI i procesów

#### **Zgodność i zarządzanie**
- **Zgodność regulacyjna**: Zapewnienie, że implementacje MCP spełniają wymagania branżowe dotyczące zgodności (GDPR, HIPAA, SOC 2)
- **Klasyfikacja danych**: Właściwa kategoryzacja i obsługa danych wrażliwych przetwarzanych przez systemy AI  
- **Ślady audytu**: Obszerne logowanie w celu spełnienia wymogów regulacyjnych i badań kryminalistycznych  
- **Kontrole prywatności**: Wdrażanie zasad prywatności od podstaw w architekturze systemów AI  
- **Zarządzanie zmianami**: Formalne procesy przeglądu bezpieczeństwa modyfikacji systemów AI  

Te podstawowe praktyki tworzą solidną bazę bezpieczeństwa, która zwiększa skuteczność specyficznych dla MCP kontroli bezpieczeństwa oraz zapewnia kompleksową ochronę aplikacji opartych na AI.

## Kluczowe wnioski dotyczące bezpieczeństwa

- **Wielowarstwowe podejście do bezpieczeństwa**: Połączenie podstawowych praktyk bezpieczeństwa (bezpieczne kodowanie, najmniejsze uprawnienia, weryfikacja łańcucha dostaw, ciągłe monitorowanie) z kontrolami specyficznymi dla AI dla kompleksowej ochrony  

- **Specyfika zagrożeń dla AI**: Systemy MCP napotykają unikalne ryzyka takie jak wstrzykiwanie poleceń, zatruwanie narzędzi, przejmowanie sesji, problemy z confused deputy, podatności na przekazywanie tokenów oraz nadmierne uprawnienia, które wymagają specjalistycznych środków zaradczych  

- **Doskonałość w uwierzytelnianiu i autoryzacji**: Wdrożenie solidnego uwierzytelniania przy użyciu zewnętrznych dostawców tożsamości (Microsoft Entra ID), egzekwowanie właściwej walidacji tokenów i nigdy nie akceptowanie tokenów nie wydanych jednoznacznie dla Twojego serwera MCP  

- **Zapobieganie atakom na AI**: Wdrażanie Microsoft Prompt Shields i Azure Content Safety jako ochrony przed pośrednim wstrzykiwaniem poleceń i zatruwaniem narzędzi, a także weryfikacja metadanych narzędzi i monitorowanie dynamicznych zmian  

- **Bezpieczeństwo sesji i transportu**: Stosowanie kryptograficznie bezpiecznych, niedeterministycznych identyfikatorów sesji powiązanych z tożsamością użytkownika, wdrażanie właściwego zarządzania cyklem życia sesji i nigdy nie używanie sesji do uwierzytelniania  

- **Najlepsze praktyki bezpieczeństwa OAuth**: Zapobieganie atakom confused deputy poprzez wyraźną zgodę użytkownika dla klientów rejestrowanych dynamicznie, prawidłową implementację OAuth 2.1 z PKCE oraz ścisłą walidację przekierowań URI  

- **Zasady bezpieczeństwa tokenów**: Unikanie antywzorca przekazywania tokenów, walidacja roszczeń dotyczących odbiorców tokenów, stosowanie tokenów krótkotrwałych z bezpieczną rotacją i utrzymywanie jasnych granic zaufania  

- **Kompleksowe bezpieczeństwo łańcucha dostaw**: Traktowanie wszystkich komponentów ekosystemu AI (modele, embeddingi, dostawcy kontekstu, zewnętrzne API) z taką samą rygorystycznością bezpieczeństwa jak tradycyjne zależności oprogramowania  

- **Ciągła ewolucja**: Bieżące śledzenie szybko ewoluujących specyfikacji MCP, aktywny udział w standardach społeczności bezpieczeństwa oraz utrzymanie adaptacyjnych postaw bezpieczeństwa wraz z dojrzewaniem protokołu  

- **Integracja z bezpieczeństwem Microsoft**: Wykorzystanie wszechstronnego ekosystemu bezpieczeństwa Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) w celu zwiększenia ochrony wdrożeń MCP  

## Kompleksowe zasoby

### **Oficjalna dokumentacja bezpieczeństwa MCP**  
- [Specyfikacja MCP (Aktualna: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Najlepsze praktyki bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Specyfikacja autoryzacji MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  
- [Repozytorium MCP na GitHub](https://github.com/modelcontextprotocol)  

### **Zasoby OWASP dotyczące bezpieczeństwa MCP**  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Kompleksowy OWASP MCP Top 10 z wytycznymi implementacyjnymi dla Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Oficjalne zagrożenia bezpieczeństwa MCP według OWASP  
- [Warsztat MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktyczne szkolenie z bezpieczeństwa MCP na platformie Azure  

### **Standardy bezpieczeństwa i najlepsze praktyki**  
- [Najlepsze praktyki bezpieczeństwa OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 dla bezpieczeństwa aplikacji webowych](https://owasp.org/www-project-top-ten/)  
- [OWASP Top 10 dla dużych modeli językowych](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- [Raport Microsoft Digital Defense](https://aka.ms/mddr)  

### **Badania i analizy bezpieczeństwa AI**  
- [Wstrzykiwanie poleceń w MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)  
- [Ataki zatruwania narzędzi (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)  
- [Przegląd badań bezpieczeństwa MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)  

### **Rozwiązania bezpieczeństwa Microsoft**  
- [Dokumentacja Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Usługa Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Bezpieczeństwo Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [Najlepsze praktyki zarządzania tokenami w Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  

### **Przewodniki i samouczki dotyczące implementacji**  
- [Azure API Management jako brama uwierzytelniania MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Uwierzytelnianie Microsoft Entra ID z serwerami MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)  
- [Bezpieczne przechowywanie i szyfrowanie tokenów (wideo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

### **DevOps i bezpieczeństwo łańcucha dostaw**  
- [Bezpieczeństwo Azure DevOps](https://azure.microsoft.com/products/devops)  
- [Bezpieczeństwo Azure Repos](https://azure.microsoft.com/products/devops/repos/)  
- [Droga Microsoft do zabezpieczenia łańcucha dostaw oprogramowania](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)  

## **Dodatkowa dokumentacja bezpieczeństwa**

Dla kompleksowych wskazówek dotyczących bezpieczeństwa odnieś się do specjalistycznych dokumentów w tym rozdziale:

- **[Najlepsze praktyki bezpieczeństwa MCP 2025](./mcp-security-best-practices-2025.md)** – Kompletny zestaw najlepszych praktyk bezpieczeństwa dla implementacji MCP  
- **[Implementacja Azure Content Safety](./azure-content-safety-implementation.md)** – Praktyczne przykłady implementacji integracji Azure Content Safety  
- **[Kontrole bezpieczeństwa MCP 2025](./mcp-security-controls-2025.md)** – Najnowsze kontrole i techniki bezpieczeństwa dla wdrożeń MCP  
- **[Szybki przewodnik po najlepszych praktykach MCP](./mcp-best-practices.md)** – Zestawienie kluczowych praktyk bezpieczeństwa MCP  
- **[BlueHat 2026: Zabezpieczanie przyszłości AI: Zabezpieczanie MCP z użyciem wzorców obrony wielowarstwowej](https://www.youtube.com/watch?v=cVWB58kEt-Y)** – Wzorce obrony warstwowej od Microsoft Security Response Center (MSRC)  

### **Praktyczne szkolenia z bezpieczeństwa**

- **[Warsztat MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** – Kompleksowy warsztat praktyczny z zabezpieczania serwerów MCP na platformie Azure z progresywnymi kampami od Base Camp do Summit  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** – Architektura referencyjna i wskazówki wdrożeniowe dla wszystkich zagrożeń OWASP MCP Top 10  

---

## Co dalej

Następny rozdział: [Rozdział 3: Pierwsze kroki](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->