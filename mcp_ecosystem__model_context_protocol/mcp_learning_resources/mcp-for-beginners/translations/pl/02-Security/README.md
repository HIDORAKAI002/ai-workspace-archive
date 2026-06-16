# MCP Security: Kompleksowa ochrona systemów AI

[![Najlepsze praktyki MCP Security](../../../translated_images/pl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknij powyższy obraz, aby obejrzeć film z tej lekcji)_

Bezpieczeństwo jest podstawą projektowania systemów AI, dlatego traktujemy je jako naszą drugą sekcję. Jest to zgodne z zasadą Microsoftu **Secure by Design** z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) wprowadza potężne nowe możliwości do aplikacji napędzanych sztuczną inteligencją, jednocześnie wprowadzając unikalne wyzwania bezpieczeństwa wykraczające poza tradycyjne zagrożenia programowe. Systemy MCP stają w obliczu zarówno ustalonych problemów bezpieczeństwa (bezpieczne kodowanie, zasada najmniejszych uprawnień, bezpieczeństwo łańcucha dostaw), jak i nowych, specyficznych dla AI zagrożeń, takich jak injekcja promptów, zatruwanie narzędzi, przejęcie sesji, ataki confused deputy, luki związane z przekazywaniem tokenów i dynamiczna modyfikacja możliwości.

Ta lekcja bada najważniejsze ryzyka bezpieczeństwa w implementacjach MCP — obejmując uwierzytelnianie, autoryzację, nadmierne uprawnienia, pośrednią injekcję promptów, bezpieczeństwo sesji, problemy confused deputy, zarządzanie tokenami i podatności łańcucha dostaw. Nauczysz się praktycznych środków kontroli i najlepszych praktyk mających na celu zmniejszenie tych ryzyk, korzystając z rozwiązań Microsoft takich jak Prompt Shields, Azure Content Safety oraz GitHub Advanced Security, by wzmocnić wdrożenie MCP.

## Cele nauki

Do końca tej lekcji będziesz potrafił:

- **Rozpoznawać zagrożenia specyficzne dla MCP**: Identyfikować unikalne ryzyka bezpieczeństwa w systemach MCP, w tym injekcję promptów, zatruwanie narzędzi, nadmierne uprawnienia, przejęcie sesji, problemy confused deputy, luki w przekazywaniu tokenów i ryzyka łańcucha dostaw
- **Stosować środki bezpieczeństwa**: Wdrażać skuteczne łagodzenia, w tym solidne uwierzytelnianie, dostęp według zasady najmniejszych uprawnień, bezpieczne zarządzanie tokenami, kontrole bezpieczeństwa sesji oraz weryfikację łańcucha dostaw
- **Wykorzystać rozwiązania bezpieczeństwa Microsoft**: Rozumieć i wdrażać Microsoft Prompt Shields, Azure Content Safety oraz GitHub Advanced Security do ochrony obciążeń MCP
- **Weryfikować bezpieczeństwo narzędzi**: Rozpoznawać znaczenie walidacji metadanych narzędzi, monitorowania dynamicznych zmian i obrony przed pośrednimi atakami z injekcją promptów
- **Integracja najlepszych praktyk**: Łączyć ustalone podstawy bezpieczeństwa (bezpieczne kodowanie, wzmacnianie serwerów, zero trust) z kontrolami specyficznymi dla MCP w pełnej ochronie

# Architektura bezpieczeństwa MCP i środki kontroli

Nowoczesne implementacje MCP wymagają warstwowych podejść do bezpieczeństwa, które uwzględniają zarówno tradycyjne zagrożenia programowe, jak i specyficzne dla AI ataki. Dynamicznie rozwijająca się specyfikacja MCP ciągle doskonali środki kontroli bezpieczeństwa, co umożliwia lepszą integrację z architekturami bezpieczeństwa przedsiębiorstw i ustalonymi najlepszymi praktykami.

Badania z [Microsoft Digital Defense Report](https://aka.ms/mddr) pokazują, że **98% zgłoszonych naruszeń można by zapobiec dzięki solidnej higienie bezpieczeństwa**. Najskuteczniejsza strategia ochrony łączy podstawowe praktyki bezpieczeństwa z kontrolami specyficznymi dla MCP — sprawdzone środki bazowe pozostają najważniejsze w zmniejszaniu ogólnego ryzyka.

## Obecny krajobraz bezpieczeństwa

> **Uwaga:** Informacje te odzwierciedlają standardy bezpieczeństwa MCP z dnia **5 lutego 2026 r.**, zgodne ze specyfikacją **MCP 2025-11-25**. Protokół MCP nadal szybko się rozwija, a przyszłe implementacje mogą wprowadzać nowe wzorce uwierzytelniania i rozszerzone środki kontroli. Zawsze odwołuj się do aktualnej [Specyfikacji MCP](https://spec.modelcontextprotocol.io/), [repozytorium MCP na GitHub](https://github.com/modelcontextprotocol) oraz [dokumentacji najlepszych praktyk bezpieczeństwa](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) po najnowsze wskazówki.

## 🏔️ Warsztaty MCP Security Summit (Sherpa)

Na **praktyczne szkolenie z bezpieczeństwa** zdecydowanie polecamy **MCP Security Summit Workshop** (Sherpa) — kompleksową, prowadzoną wyprawę zabezpieczania serwerów MCP na platformie Microsoft Azure.

### Przegląd warsztatu

[Warsztaty MCP Security Summit](https://azure-samples.github.io/sherpa/) oferują praktyczne, wykonalne szkolenie za pomocą sprawdzonej metodologii „łatwo podatny na atak → wykorzystanie → naprawa → weryfikacja”. W trakcie:

- **Uczysz się przez łamanie zabezpieczeń**: Doświadczasz podatności na własnej skórze, hackując celowo niebezpieczne serwery
- **Korzystasz z natywnych zabezpieczeń Azure**: Wykorzystujesz Azure Entra ID, Key Vault, API Management i AI Content Safety
- **Stosujesz obronę w głębi**: Przechodzisz przez kolejne obozy budujące wszechstronne warstwy zabezpieczeń
- **Stosujesz standardy OWASP**: Każda technika ma powiązanie z [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Otrzymujesz kod produkcyjny**: Zyskujesz działające, przetestowane implementacje

### Trasa wyprawy

| Obozowisko | Temat | Pokrywane ryzyka OWASP |
|------------|--------|-------------------------|
| **Obóz bazowy** | Podstawy MCP i podatności uwierzytelniania | MCP01, MCP07 |
| **Obóz 1: Tożsamość** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Obóz 2: Gateway** | API Management, prywatne punkty końcowe, zarządzanie | MCP02, MCP06, MCP07, MCP09 |
| **Obóz 3: Bezpieczeństwo I/O** | Injkecja promptów, ochrona PII, bezpieczeństwo treści | MCP03, MCP05, MCP06, MCP10 |
| **Obóz 4: Monitorowanie** | Log Analytics, pulpity nawigacyjne, wykrywanie zagrożeń | MCP04, MCP08 |
| **Szczyt** | Test integracji Red Team / Blue Team | Wszystkie |

**Rozpocznij:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 zagrożeń bezpieczeństwa

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) szczegółowo opisuje dziesięć najważniejszych zagrożeń bezpieczeństwa dla implementacji MCP:

| Ryzyko | Opis | Środki łagodzące w Azure |
|--------|-------|--------------------------|
| **MCP01** | Niewłaściwe zarządzanie tokenami i ujawnianie sekretów | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalacja uprawnień poprzez rozszerzanie zakresu | RBAC, Conditional Access |
| **MCP03** | Zatruwanie narzędzi | Walidacja narzędzi, weryfikacja integralności |
| **MCP04** | Ataki na łańcuch dostaw oprogramowania i manipulacja zależnościami | GitHub Advanced Security, skanowanie zależności |
| **MCP05** | Injkecja i wykonanie poleceń | Walidacja wejścia, sandboxing |
| **MCP06** | Podstępny przepływ intencji | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Niewystarczające uwierzytelnianie i autoryzacja | Azure Entra ID, OAuth 2.1 z PKCE |
| **MCP08** | Brak audytu i telemetryki | Azure Monitor, Application Insights |
| **MCP09** | Cieniowe serwery MCP | Zarządzanie centrami API, izolacja sieci |
| **MCP10** | Iniekcja kontekstu i nadmierne ujawnianie | Klasyfikacja danych, minimalna ekspozycja |

### Ewolucja uwierzytelniania MCP

Specyfikacja MCP znacznie rozwinęła podejście do uwierzytelniania i autoryzacji:

- **Podejście oryginalne**: Wczesne specyfikacje wymagały od deweloperów implementacji własnych serwerów uwierzytelniania, a serwery MCP działały jako serwery autoryzacji OAuth 2.0 zarządzające bezpośrednio uwierzytelnianiem użytkowników
- **Obecny standard (2025-11-25)**: Zaktualizowana specyfikacja pozwala serwerom MCP delegować uwierzytelnianie zewnętrznym dostawcom tożsamości (takim jak Microsoft Entra ID), poprawiając postawę bezpieczeństwa i zmniejszając złożoność implementacji
- **Bezpieczeństwo warstwy transportowej**: Ulepszone wsparcie dla bezpiecznych mechanizmów transportu z właściwymi wzorcami uwierzytelniania zarówno dla połączeń lokalnych (STDIO), jak i zdalnych (Streamable HTTP)

## Bezpieczeństwo uwierzytelniania i autoryzacji

### Aktualne wyzwania bezpieczeństwa

Nowoczesne implementacje MCP napotykają kilka problemów z uwierzytelnianiem i autoryzacją:

### Ryzyka i wektory ataków

- **Niewłaściwie skonfigurowana logika autoryzacji**: Wadliwe implementacje autoryzacji w serwerach MCP mogą ujawniać wrażliwe dane i niepoprawnie stosować kontrole dostępu
- **Kompromitacja tokena OAuth**: Kradzież tokena lokalnego serwera MCP umożliwia atakującym podszywanie się pod serwery i dostęp do usług zewnętrznych
- **Luki w przekazywaniu tokenów**: Niewłaściwe obchodzenie się z tokenami tworzy obejścia zabezpieczeń i luki w rozliczalności
- **Nadmierne uprawnienia**: Zbyt rozbudzone uprawnienia serwerów MCP naruszają zasadę najmniejszych uprawnień i rozszerzają powierzchnię ataku

#### Przekazywanie tokenów: krytyczny antywzorzec

**Przekazywanie tokenów jest wyraźnie zabronione** w obecnej specyfikacji autoryzacji MCP z powodu poważnych implikacji bezpieczeństwa:

##### Obejście kontroli bezpieczeństwa
- Serwery MCP i powiązane API implementują krytyczne środki bezpieczeństwa (ograniczenia liczby zapytań, walidacja żądań, monitorowanie ruchu), które zależą od poprawnej walidacji tokenów
- Bezpośrednie użycie tokenów klienta do API omija te kluczowe zabezpieczenia, podważając architekturę bezpieczeństwa

##### Problemy z rozliczalnością i audytem  
- Serwery MCP nie są w stanie odróżnić klientów używających tokenów wydanych upstream, co psuje ścieżki audytu
- Logi serwerów zasobów downstream pokazują mylące źródła zapytań, a nie faktyczne pośredniczące serwery MCP
- Dochodzenia incydentów i audyty zgodności stają się znacznie trudniejsze

##### Ryzyko wycieku danych
- Niezwalidowane roszczenia tokenów umożliwiają złośliwym aktorom z kradzionymi tokenami korzystanie z serwerów MCP jako pośredników do wyprowadzania danych
- Naruszenia granic zaufania pozwalają na nieautoryzowane wzorce dostępu, omijające zamierzone zabezpieczenia

##### Wektory ataków wielousługowych
- Przejęte tokeny akceptowane przez wiele usług umożliwiają poruszanie się boczne między systemami powiązanymi
- Założenia zaufania między usługami mogą zostać złamane, gdy pochodzenie tokenów nie jest weryfikowane

### Środki kontroli bezpieczeństwa i łagodzenia

**Krytyczne wymagania bezpieczeństwa:**

> **WYMAGANE**: Serwery MCP **NIE MOGĄ** akceptować żadnych tokenów, które nie zostały wyraźnie wystawione dla tego serwera MCP

#### Kontrole uwierzytelniania i autoryzacji

- **Rygorystyczny przegląd autoryzacji**: Przeprowadzaj kompleksowe audyty logiki autoryzacji serwerów MCP, aby zapewnić dostęp wyłącznie uprawnionym użytkownikom i klientom
  - **Przewodnik wdrożenia**: [Azure API Management jako brama uwierzytelniania dla serwerów MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integracja tożsamości**: [Użycie Microsoft Entra ID dla uwierzytelniania serwera MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpieczne zarządzanie tokenami**: Wdrażaj [zalecenia Microsoft dotyczące walidacji i cyklu życia tokenów](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Waliduj roszczenia audience tokena względem tożsamości serwera MCP
  - Stosuj odpowiednią rotację i daty ważności tokenów
  - Zapobiegaj atakom powtórzeniowym i nieautoryzowanemu użyciu tokenów

- **Chronione przechowywanie tokenów**: Zabezpieczaj przechowywanie tokenów szyfrowaniem w stanie spoczynku i podczas przesyłu
  - **Najlepsze praktyki**: [Zasady bezpiecznego przechowywania i szyfrowania tokenów](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Wdrożenie kontroli dostępu

- **Zasada najmniejszych uprawnień**: Przydziel serwerom MCP tylko minimalne uprawnienia potrzebne do zamierzonej funkcjonalności
  - Regularne przeglądy i aktualizacje uprawnień, aby zapobiec rozszerzaniu zakresu
  - **Dokumentacja Microsoft**: [Bezpieczny dostęp według zasady najmniejszych uprawnień](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrola dostępu oparta na rolach (RBAC)**: Wdrażaj precyzyjne przypisania ról
  - Zakresuj role ściśle do konkretnych zasobów i czynności
  - Unikaj szerokich lub zbędnych uprawnień, które rozszerzają powierzchnię ataku

- **Ciągły monitoring uprawnień**: Wdrażaj stały audyt dostępu i monitorowanie
  - Monitoruj wzorce użycia uprawnień pod kątem anomalii
  - Szybko usuwaj nadmierne lub nieużywane uprawnienia

## Specyficzne dla AI zagrożenia bezpieczeństwa

### Ataki z injekcją promptów i manipulacją narzędzi

Nowoczesne implementacje MCP napotykają zaawansowane, specyficzne dla AI wektory ataków, których tradycyjne środki bezpieczeństwa nie są w stanie w pełni powstrzymać:

#### **Pośrednia injekcja promptów (Cross-Domain Prompt Injection)**

**Pośrednia injekcja promptów** to jedno z najpoważniejszych zagrożeń w systemach AI opartych na MCP. Atakujący wbudowują złośliwe instrukcje w zewnętrzną zawartość — dokumenty, strony internetowe, e-maile lub źródła danych — które systemy AI następnie traktują jako prawidłowe polecenia.

**Scenariusze ataku:**
- **Iniekcja w dokumentach**: Złośliwe instrukcje ukryte w dokumentach przetwarzanych przez AI, które wywołują niezamierzone działania
- **Eksploatacja treści webowych**: Podrabiane strony internetowe zawierające wbudowane promptów modyfikujące zachowanie AI podczas web scrapingu
- **Ataki oparte na e-mailach**: Złośliwe prompt w wiadomościach e-mail powodujące wycieki informacji lub nieautoryzowane operacje przez asystentów AI
- **Zanieczyszczenie źródeł danych**: Podrabiane bazy danych lub API dostarczające skażoną treść do systemów AI

**Realne skutki**: Ataki mogą prowadzić do wycieków danych, naruszenia prywatności, generowania szkodliwych treści oraz manipulacji interakcjami użytkowników. Szczegółową analizę zobacz na [Prompt Injection w MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram ataku injekcji promptów](../../../translated_images/pl/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataki zatruwania narzędzi**

**Zatruwanie narzędzi** atakuje metadane definiujące narzędzia MCP, wykorzystując sposób, w jaki modele językowe interpretują opisy narzędzi i parametry decydujące o wykonywaniu poleceń.

**Mechanizmy ataku:**
- **Manipulacja metadanymi**: Atakujący wstrzykują złośliwe instrukcje do opisów narzędzi, definicji parametrów lub przykładów użycia
- **Niewidoczne instrukcje**: Ukryte prompt w metadanych narzędzi przetwarzanych przez modele AI, ale niewidoczne dla użytkowników
- **Dynamiczna modyfikacja narzędzi („rzut na dywan”)**: Narzędzia zatwierdzone przez użytkowników są później zmieniane w celu wykonania złośliwych działań bez świadomości użytkownika
- **Iniekcja parametrów**: Złośliwe treści zawarte w schematach parametrów narzędzi wpływające na zachowanie modelu

**Ryzyka serwerów hostowanych**: Zdalne serwery MCP stanowią większe ryzyko, ponieważ definicje narzędzi mogą być aktualizowane po początkowej akceptacji użytkownika, tworząc scenariusze, w których wcześniej bezpieczne narzędzia stają się złośliwe. Szczegółową analizę zobacz na [Ataki zatruwania narzędzi (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram ataku zatruwania narzędzi](../../../translated_images/pl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatkowe wektory ataków AI**

- **Cross-Domain Prompt Injection (XPIA)**: Zaawansowane ataki wykorzystujące treści z wielu domen do obejścia kontroli bezpieczeństwa
- **Dynamiczna modyfikacja możliwości**: Zmiany zdolności narzędzi w czasie rzeczywistym, które umykają początkowym ocenom bezpieczeństwa  
- **Zatrucie okna kontekstu**: Ataki manipulujące dużymi oknami kontekstu, aby ukryć złośliwe instrukcje  
- **Ataki zdezorientowanego modelu**: Wykorzystywanie ograniczeń modelu do tworzenia nieprzewidywalnych lub niebezpiecznych zachowań  


### Wpływ ryzyka bezpieczeństwa AI

**Konsekwencje o wysokim wpływie:**  
- **Eksfiltracja danych**: Nieautoryzowany dostęp i kradzież poufnych danych przedsiębiorstw lub danych osobowych  
- **Naruszenia prywatności**: Ujawnienie danych osobowych (PII) i poufnych informacji biznesowych  
- **Manipulacja systemem**: Niezamierzone modyfikacje krytycznych systemów i procesów  
- **Kradzież poświadczeń**: Kompromitacja tokenów uwierzytelniających i poświadczeń usług  
- **Ruch boczny**: Wykorzystanie skompromitowanych systemów AI jako punktów zaczepienia do szerszych ataków sieciowych  

### Rozwiązania Microsoft AI dotyczące bezpieczeństwa

#### **AI Prompt Shields: Zaawansowana ochrona przed atakami wstrzyknięć**

Microsoft **AI Prompt Shields** zapewnia wszechstronną ochronę przed bezpośrednimi i pośrednimi atakami wstrzyknięć promptów dzięki wielu warstwom zabezpieczeń:

##### **Kluczowe mechanizmy ochrony:**

1. **Zaawansowane wykrywanie i filtrowanie**  
   - Algorytmy uczenia maszynowego i techniki NLP wykrywają złośliwe instrukcje w zewnętrznej treści  
   - Analiza w czasie rzeczywistym dokumentów, stron internetowych, e-maili i źródeł danych pod kątem ukrytych zagrożeń  
   - Kontekstowe rozróżnianie legalnych i złośliwych wzorców poleceń  

2. **Techniki podświetlania**  
   - Rozróżnia instrukcje zaufanego systemu od potencjalnie skompromitowanych zewnętrznych danych wejściowych  
   - Metody transformacji tekstu zwiększające relewantność modelu, jednocześnie izolujące złośliwą zawartość  
   - Pomaga systemom AI utrzymywać właściwą hierarchię instrukcji i ignorować wstrzyknięte polecenia  

3. **Systemy ograniczników i znakowania danych**  
   - Wyraźne definiowanie granic między zaufanymi komunikatami systemowymi a zewnętrznym tekstem wejściowym  
   - Specjalne markery podkreślają granice między źródłami danych zaufanymi i niezaufanymi  
   - Jasne oddzielenie zapobiega dezorientacji instrukcji i nieautoryzowanemu wykonywaniu poleceń  

4. **Ciągła inteligencja zagrożeń**  
   - Microsoft stale monitoruje nowe wzorce ataków i aktualizuje zabezpieczenia  
   - Proaktywne poszukiwanie zagrożeń, nowych technik wstrzyknięć i wektorów ataku  
   - Regularne aktualizacje modeli bezpieczeństwa w celu utrzymania skuteczności wobec rozwijających się zagrożeń  

5. **Integracja z Azure Content Safety**  
   - Część kompleksowego zestawu Azure AI Content Safety  
   - Dodatkowe wykrywanie prób jailbreaków, szkodliwej treści i naruszeń polityk bezpieczeństwa  
   - Ujednolicone kontrole bezpieczeństwa w całych komponentach aplikacji AI  

**Zasoby wdrożeniowe**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/pl/prompt-shield.ff5b95be76e9c78c.webp)  


## Zaawansowane zagrożenia bezpieczeństwa MCP

### Luki w zabezpieczeniach przejęcia sesji

**Przejęcie sesji** to krytyczny wektor ataku w stanowych implementacjach MCP, gdzie nieuprawnione podmioty uzyskują i nadużywają prawidłowych identyfikatorów sesji, by podszywać się pod klientów i wykonywać nieautoryzowane działania.  

#### **Scenariusze ataków i ryzyka**  

- **Wstrzyknięcie polecenia po przejęciu sesji**: Atakujący ze skradzionymi ID sesji wstrzykują złośliwe zdarzenia do serwerów współdzielących stan sesji, co może wywołać szkodliwe działania lub dostęp do wrażliwych danych  
- **Bezpośrednie podszywanie się**: Skradzione ID sesji umożliwiają bezpośrednie wywołania serwera MCP omijające uwierzytelnianie, traktując napastników jak legalnych użytkowników  
- **Skompromitowane strumienie z możliwością wznowienia**: Atakujący mogą przedwcześnie przerwać żądania, powodując, że legalni klienci wznowią je z potencjalnie złośliwą zawartością  

#### **Kontrole bezpieczeństwa zarządzania sesją**

**Krytyczne wymagania:**  
- **Weryfikacja uprawnień**: Serwery MCP implementujące autoryzację **MUSZĄ** weryfikować **WSZYSTKIE** przychodzące żądania i **NIE WOLNO** polegać na sesjach jako metodzie uwierzytelniania  
- **Bezpieczne generowanie sesji**: Używać kryptograficznie bezpiecznych, niedeterministycznych ID sesji generowanych przez bezpieczne generatory liczb losowych  
- **Powiązanie z użytkownikiem**: Wiązać ID sesji z informacjami specyficznymi dla użytkownika używając formatu `<user_id>:<session_id>`, by zapobiegać nadużyciom między użytkownikami  
- **Zarządzanie cyklem życia sesji**: Wprowadzić właściwe wygasanie, rotację oraz unieważnianie sesji w celu ograniczenia okna podatności  
- **Bezpieczeństwo komunikacji**: Wymagać HTTPS dla całej komunikacji, aby zapobiec przechwytywaniu ID sesji  

### Problem zdezorientowanego pełnomocnika (Confused Deputy)

Problem **zdezorientowanego pełnomocnika** występuje, gdy serwery MCP działają jako proxy uwierzytelniające między klientami a usługami zewnętrznymi, co stwarza możliwość obejścia autoryzacji przez wykorzystanie statycznych identyfikatorów klienta.

#### **Mechanika ataku i ryzyka**

- **Obejście zgody na podstawie ciasteczek**: Poprzednie uwierzytelnienie użytkownika tworzy ciasteczka zgody, które atakujący wykorzystują poprzez złośliwe żądania autoryzacji z przygotowanymi URI przekierowań  
- **Kradzież kodu autoryzacyjnego**: Istniejące ciasteczka zgody mogą powodować pominięcie ekranów zgody przez serwery autoryzacji, przekierowując kody do kontrolowanych przez atakującego punktów końcowych  
- **Nieautoryzowany dostęp do API**: Skradzione kody autoryzacyjne umożliwiają wymianę tokenów i podszywanie się pod użytkowników bez wyraźnej zgody  

#### **Strategie łagodzenia**

**Wymagane kontrole:**  
- **Wymagania dotyczące wyraźnej zgody**: Serwery proxy MCP używające statycznych ID klienta **MUSZĄ** uzyskiwać zgodę użytkownika dla każdego dynamicznie rejestrowanego klienta  
- **Implementacja bezpieczeństwa OAuth 2.1**: Stosować obecne najlepsze praktyki bezpieczeństwa OAuth, w tym PKCE (Proof Key for Code Exchange) dla wszystkich żądań autoryzacji  
- **Ścisła walidacja klientów**: Realizować rygorystyczną walidację URI przekierowań i identyfikatorów klientów, by zapobiec nadużyciom  

### Luki w zabezpieczeniach tokenów przekazywanych dalej  

**Token passthrough** to jawny antywzorzec, w którym serwery MCP akceptują tokeny klientów bez prawidłowej walidacji i przekazują je do dalszych API, naruszając specyfikacje autoryzacji MCP.

#### **Implikacje bezpieczeństwa**

- **Ominięcie kontroli**: Bezpośrednie wykorzystanie tokenów klienta do API omija krytyczne ograniczenia limitowania, walidację i monitorowanie  
- **Zniekształcenie ścieżki audytu**: Tokeny wydane upstream uniemożliwiają identyfikację klienta, utrudniając dochodzenia incydentów  
- **Eksfiltracja danych przez proxy**: Niezwalidowane tokeny pozwalają złośliwym podmiotom używać serwerów jako proxy do nieautoryzowanego dostępu do danych  
- **Naruszenie granicy zaufania**: Zakładane zaufanie usług downstream może zostać naruszone, gdy pochodzenie tokenów nie może być zweryfikowane  
- **Rozszerzenie ataków na wiele usług**: Skompromitowane tokeny akceptowane w wielu serwisach umożliwiają ruch boczny  

#### **Wymagane kontrole bezpieczeństwa**

**Wymagania bezwzględne:**  
- **Weryfikacja tokenów**: Serwery MCP **NIE MOGĄ** akceptować tokenów niewyraźnie wydanych dla serwera MCP  
- **Weryfikacja odbiorcy (audience)**: Zawsze weryfikować, czy odbiorca tokena odpowiada identyfikatorowi serwera MCP  
- **Prawidłowy cykl życia tokena**: Wdrażać krótkotrwałe tokeny dostępu z praktykami bezpiecznej rotacji  


## Bezpieczeństwo łańcucha dostaw systemów AI

Bezpieczeństwo łańcucha dostaw wyewoluowało poza tradycyjne zależności oprogramowania, obejmując cały ekosystem AI. Nowoczesne implementacje MCP muszą rygorystycznie weryfikować i monitorować wszystkie komponenty związane z AI, ponieważ każdy z nich wprowadza potencjalne podatności, które mogą zagrozić integralności systemu.

### Rozszerzone komponenty łańcucha dostaw AI

**Tradycyjne zależności oprogramowania:**  
- Biblioteki i frameworki open source  
- Obrazy kontenerów i systemy bazowe  
- Narzędzia developerskie i pipeline’y buildów  
- Komponenty infrastruktury i usługi  

**Specyficzne elementy łańcucha dostaw AI:**  
- **Modele bazowe**: Wstępnie wytrenowane modele od różnych dostawców wymagające weryfikacji pochodzenia  
- **Usługi embedujące**: Zewnętrzne usługi wektoryzacji i wyszukiwania semantycznego  
- **Dostawcy kontekstu**: Źródła danych, bazy wiedzy i repozytoria dokumentów  
- **API firm trzecich**: Zewnętrzne usługi AI, pipeline’y ML i punkty końcowe przetwarzania danych  
- **Artefakty modeli**: Wagi, konfiguracje i wersje wytrenowanych modeli  
- **Źródła danych treningowych**: Zbiory danych wykorzystywane do treningu i dopasowywania modeli  

### Kompleksowa strategia bezpieczeństwa łańcucha dostaw

#### **Weryfikacja komponentów i zaufanie**  
- **Weryfikacja pochodzenia**: Sprawdzać pochodzenie, licencjonowanie i integralność wszystkich komponentów AI przed integracją  
- **Ocena bezpieczeństwa**: Przeprowadzać skanowania podatności i przeglądy bezpieczeństwa modeli, źródeł danych oraz usług AI  
- **Analiza reputacji**: Ocena historii bezpieczeństwa i praktyk dostawców usług AI  
- **Weryfikacja zgodności**: Zapewniać, że wszystkie komponenty spełniają wymagania organizacyjne dotyczące bezpieczeństwa i regulacji  

#### **Bezpieczne pipeline’y wdrożeń**  
- **Automatyzacja CI/CD pod kątem bezpieczeństwa**: Integracja skanowania bezpieczeństwa na wszystkich etapach pipeline’u wdrożeniowego  
- **Integralność artefaktów**: Wdrażanie kryptograficznej weryfikacji wszystkich artefaktów (kod, modele, konfiguracje)  
- **Wdrażanie etapowe**: Stosowanie progresywnych strategii wdrożeniowych z walidacją bezpieczeństwa na każdym etapie  
- **Zaufane repozytoria artefaktów**: Wdrażanie tylko z zweryfikowanych, zabezpieczonych rejestrów i repozytoriów artefaktów  

#### **Ciągły monitoring i reakcja**  
- **Skanowanie zależności**: Stały monitoring podatności wszystkich zależności oprogramowania i komponentów AI  
- **Monitoring modeli**: Ciągła ocena zachowania modeli, dryfu wydajności i anomalii bezpieczeństwa  
- **Śledzenie stanu usług**: Monitorowanie dostępności zewnętrznych usług AI, incydentów bezpieczeństwa i zmian polityk  
- **Integracja wywiadu zagrożeń**: Uwzględnianie kanałów wywiadowczych dotyczących zagrożeń specyficznych dla AI i ML  

#### **Kontrola dostępu i zasada najmniejszych uprawnień**  
- **Uprawnienia na poziomie komponentów**: Ograniczanie dostępu do modeli, danych i usług zgodnie z potrzebami biznesowymi  
- **Zarządzanie kontami usługowymi**: Stosowanie dedykowanych kont usługowych z minimalnymi niezbędnymi uprawnieniami  
- **Segmentacja sieci**: Izolowanie komponentów AI i ograniczanie dostępu sieciowego między usługami  
- **Kontrole bramki API**: Użycie scentralizowanych bramek API do kontroli i monitorowania dostępu do zewnętrznych usług AI  

#### **Reagowanie na incydenty i odzyskiwanie**  
- **Procedury szybkiej reakcji**: Ustanowione procesy łatania lub wymiany skompromitowanych komponentów AI  
- **Rotacja poświadczeń**: Automatyzacja rotacji sekretów, kluczy API i poświadczeń usług  
- **Możliwość rollbacku**: Szybkie przywracanie poprzednich, znanych dobrych wersji komponentów AI  
- **Odzyskiwanie po naruszeniach łańcucha dostaw**: Specyficzne procedury reagowania na kompromitacje usług AI upstream  

### Narzędzia i integracja Microsoft w zakresie bezpieczeństwa

**GitHub Advanced Security** oferuje kompleksową ochronę łańcucha dostaw, w tym:  
- **Skanowanie sekretów**: Automatyczne wykrywanie poświadczeń, kluczy API i tokenów w repozytoriach  
- **Skanowanie zależności**: Ocena podatności zależności open source i bibliotek  
- **Analiza CodeQL**: Statyczna analiza kodu pod kątem podatności i błędów programistycznych  
- **Analizy łańcucha dostaw**: Widoczność kondycji i statusu bezpieczeństwa zależności  

**Integracja z Azure DevOps i Azure Repos:**  
- Bezproblemowa integracja skanowania bezpieczeństwa na platformach deweloperskich Microsoft  
- Automatyczne kontrole bezpieczeństwa w Azure Pipelines dla obciążeń AI  
- Egzekwowanie polityk dla bezpiecznego wdrażania komponentów AI  

**We wnętrzu Microsoft:**  
Microsoft wdraża szerokie praktyki bezpieczeństwa łańcucha dostaw we wszystkich produktach. Poznaj sprawdzone podejścia w [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Najlepsze praktyki bezpieczeństwa podstawowego

Implementacje MCP dziedziczą i budują na istniejącej postawie bezpieczeństwa organizacji. Wzmocnienie podstawowych praktyk bezpieczeństwa znacznie poprawia ogólne bezpieczeństwo systemów AI i wdrożeń MCP.

### Podstawowe fundamenty bezpieczeństwa

#### **Bezpieczne praktyki tworzenia oprogramowania**  
- **Zgodność z OWASP**: Ochrona przed podatnościami aplikacji webowych [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Ochrona specyficzna dla AI**: Implementacja kontroli dla [OWASP Top 10 dla LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Bezpieczne zarządzanie sekretami**: Używanie dedykowanych sejfów na tokeny, klucze API i wrażliwe dane konfiguracyjne  
- **Szyfrowanie end-to-end**: Implementacja bezpiecznej komunikacji we wszystkich komponentach aplikacji i przepływach danych  
- **Weryfikacja danych wejściowych**: Rygorystyczna walidacja wszystkich danych użytkownika, parametrów API i źródeł danych  

#### **Wzmacnianie infrastruktury**  
- **Uwierzytelnianie wieloskładnikowe (MFA)**: Wymagane dla wszystkich kont administracyjnych i serwisowych  
- **Zarządzanie poprawkami**: Automatyczne i terminowe stosowanie poprawek dla systemów operacyjnych, frameworków i zależności  
- **Integracja dostawców tożsamości**: Centralne zarządzanie tożsamością przez korporacyjne dostawców tożsamości (Microsoft Entra ID, Active Directory)  
- **Segmentacja sieci**: Logiczne izolowanie komponentów MCP w celu ograniczenia potencjału ruchu bocznego  
- **Zasada najmniejszych uprawnień**: Minimalne niezbędne uprawnienia dla wszystkich komponentów systemowych i kont  

#### **Monitorowanie i wykrywanie zagrożeń**  
- **Kompleksowe logowanie**: Szczegółowe logi aktywności aplikacji AI, w tym interakcji klient-serwer MCP  
- **Integracja SIEM**: Centralne zarządzanie informacjami i zdarzeniami bezpieczeństwa do wykrywania anomalii  
- **Analiza behawioralna**: Monitorowanie zasilane AI do wykrywania nietypowych wzorców w zachowaniu systemu i użytkowników  
- **Inteligencja zagrożeń**: Integracja zewnętrznych kanałów wywiadowczych i wskaźników kompromitacji (IOC)  
- **Reagowanie na incydenty**: Dobrze zdefiniowane procedury wykrywania, reagowania i odzyskiwania po incydentach bezpieczeństwa  

#### **Architektura Zero Trust**  
- **Nigdy nie ufaj, zawsze weryfikuj**: Ciągła weryfikacja użytkowników, urządzeń i połączeń sieciowych  
- **Mikrosegmentacja**: Granularna kontrola sieci izolująca pojedyncze obciążenia i usługi  
- **Bezpieczeństwo ukierunkowane na tożsamość**: Polityki bezpieczeństwa bazujące na zweryfikowanych tożsamościach, a nie lokalizacji sieciowej  
- **Ciągła ocena ryzyka**: Dynamiczna ewaluacja postawy bezpieczeństwa na podstawie aktualnego kontekstu i zachowania  
- **Dostęp warunkowy**: Kontrole dostępu adaptujące się w zależności od czynników ryzyka, lokalizacji i zaufania do urządzenia  

### Wzorce integracji korporacyjnej

#### **Integracja ekosystemu bezpieczeństwa Microsoft**  
- **Microsoft Defender for Cloud**: Kompleksowe zarządzanie postawą bezpieczeństwa chmury  
- **Azure Sentinel**: Natywne w chmurze SIEM i SOAR dla ochrony obciążeń AI  
- **Microsoft Entra ID**: Korporacyjne zarządzanie tożsamością i dostępem z politykami dostępu warunkowego  
- **Azure Key Vault**: Centralne zarządzanie sekretami z modułem sprzętowym HSM  
- **Microsoft Purview**: Zarządzanie danymi i zgodnością dla źródeł danych i procesów AI  

#### **Zgodność i zarządzanie**  
- **Zgodność regulacyjna**: Zapewnienie spełnienia wymagań branżowych (GDPR, HIPAA, SOC 2)  
- **Klasyfikacja danych**: Prawidłowa kategoryzacja i zarządzanie wrażliwymi danymi przetwarzanymi przez systemy AI  
- **Ścieżki audytu**: Kompleksowe logowanie dla wymogów zgodności i dochodzeń kryminalistycznych  
- **Kontrole prywatności**: Implementacja zasad prywatności od podstaw w architekturze systemów AI  
- **Zarządzanie zmianami**: Formalne procesy przeglądu bezpieczeństwa modyfikacji systemów AI  

Te podstawowe praktyki tworzą solidną bazę bezpieczeństwa, która zwiększa skuteczność specyficznych mechanizmów bezpieczeństwa MCP i zapewnia kompleksową ochronę aplikacji opartych na AI.

## Kluczowe wnioski dotyczące bezpieczeństwa
- **Wielowarstwowe podejście do bezpieczeństwa**: Połącz podstawowe praktyki bezpieczeństwa (bezpieczne kodowanie, minimalne uprawnienia, weryfikacja łańcucha dostaw, ciągły monitoring) ze specyficznymi kontrolami AI dla kompleksowej ochrony

- **Specyficzne zagrożenia dla AI**: Systemy MCP napotykają unikalne ryzyka, w tym wstrzykiwanie promptów, zatruwanie narzędzi, przejmowanie sesji, problem tzw. zdezorientowanego pełnomocnika, luki w przekazywaniu tokenów i nadmierne uprawnienia, które wymagają specjalistycznych środków zaradczych

- **Doskonałość uwierzytelniania i autoryzacji**: Wdrażaj solidne uwierzytelnianie przy użyciu zewnętrznych dostawców tożsamości (Microsoft Entra ID), egzekwuj właściwą walidację tokenów i nigdy nie akceptuj tokenów niejawnie wydanych dla twojego serwera MCP

- **Zapobieganie atakom na AI**: Wdrażaj Microsoft Prompt Shields i Azure Content Safety, aby bronić się przed pośrednim wstrzykiwaniem promptów i atakami zatruwania narzędzi, jednocześnie walidując metadane narzędzi oraz monitorując dynamiczne zmiany

- **Bezpieczeństwo sesji i transportu**: Używaj kryptograficznie bezpiecznych, niedeterministycznych identyfikatorów sesji powiązanych z tożsamościami użytkowników, implementuj właściwe zarządzanie cyklem życia sesji i nigdy nie używaj sesji do uwierzytelniania

- **Najlepsze praktyki zabezpieczeń OAuth**: Zapobiegaj atakom typu zdezorientowany pełnomocnik poprzez wyraźną zgodę użytkownika dla dynamicznie rejestrowanych klientów, prawidłową implementację OAuth 2.1 z PKCE oraz ścisłą walidację URI przekierowań  

- **Zasady bezpieczeństwa tokenów**: Unikaj antywzorów przekazywania tokenów, waliduj deklaracje odbiorców tokenów, stosuj tokeny o krótkim okresie ważności z bezpieczną rotacją oraz utrzymuj jasne granice zaufania

- **Kompleksowe zabezpieczenia łańcucha dostaw**: Traktuj wszystkie komponenty ekosystemu AI (modele, osadzenia, dostawców kontekstu, zewnętrzne API) z taką samą rygorystyczną dbałością o bezpieczeństwo jak tradycyjne zależności oprogramowania

- **Ciągła ewolucja**: Pozostań na bieżąco z szybko rozwijającymi się specyfikacjami MCP, wspieraj standardy społeczności bezpieczeństwa i utrzymuj adaptacyjne postawy bezpieczeństwa w miarę dojrzewania protokołu

- **Integracja z Microsoft Security**: Wykorzystuj kompleksowy ekosystem bezpieczeństwa Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) dla zwiększonej ochrony wdrożeń MCP

## Kompleksowe zasoby

### **Oficjalna dokumentacja bezpieczeństwa MCP**
- [Specyfikacja MCP (Obecna: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najlepsze praktyki bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specyfikacja autoryzacji MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repozytorium MCP na GitHub](https://github.com/modelcontextprotocol)

### **Zasoby bezpieczeństwa MCP OWASP**
- [Przewodnik bezpieczeństwa OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) – Kompleksowy OWASP MCP Top 10 wraz z wytycznymi wdrożeniowymi dla Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Oficjalne ryzyka bezpieczeństwa MCP według OWASP
- [Warsztaty MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktyczne szkolenia z bezpieczeństwa MCP w Azure

### **Standardy bezpieczeństwa i najlepsze praktyki**
- [Najlepsze praktyki bezpieczeństwa OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 bezpieczeństwa aplikacji webowych](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 dla dużych modeli językowych](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Raport Microsoft Digital Defense](https://aka.ms/mddr)

### **Badania i analizy bezpieczeństwa AI**
- [Wstrzykiwanie promptów w MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Ataki zatruwania narzędzi (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing badań bezpieczeństwa MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Rozwiązania bezpieczeństwa Microsoft**
- [Dokumentacja Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Usługa Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Bezpieczeństwo Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najlepsze praktyki zarządzania tokenami w Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Przewodniki wdrożeniowe i samouczki**
- [Azure API Management jako brama uwierzytelniania MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Uwierzytelnianie Microsoft Entra ID z serwerami MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Bezpieczne przechowywanie i szyfrowanie tokenów (wideo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps i bezpieczeństwo łańcucha dostaw**
- [Bezpieczeństwo Azure DevOps](https://azure.microsoft.com/products/devops)
- [Bezpieczeństwo Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Podróż bezpieczeństwa łańcucha dostaw Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatkowa dokumentacja bezpieczeństwa**

Dla kompleksowych wytycznych dotyczących bezpieczeństwa odwołaj się do specjalistycznych dokumentów w tej sekcji:

- **[Najlepsze praktyki bezpieczeństwa MCP 2025](./mcp-security-best-practices-2025.md)** – Kompletny zbiór najlepszych praktyk bezpieczeństwa dla implementacji MCP
- **[Implementacja Azure Content Safety](./azure-content-safety-implementation.md)** – Przykłady praktycznej integracji Azure Content Safety  
- **[Kontrole bezpieczeństwa MCP 2025](./mcp-security-controls-2025.md)** – Najnowsze kontrole i techniki bezpieczeństwa dla wdrożeń MCP
- **[Szybkie odniesienie najlepszych praktyk MCP](./mcp-best-practices.md)** – Przewodnik szybkiego dostępu do kluczowych praktyk bezpieczeństwa MCP
- **[BlueHat 2026: Zabezpieczanie przyszłości AI: Zabezpieczanie MCP z wykorzystaniem wzorców defense in depth](https://www.youtube.com/watch?v=cVWB58kEt-Y)** – Wzorce defense-in-depth z Microsoft Security Response Center (MSRC)

### **Praktyczne szkolenia z bezpieczeństwa**

- **[Warsztaty MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** – Kompleksowe praktyczne warsztaty dotyczące zabezpieczania serwerów MCP w Azure, z progresywnymi kampami od Base Camp do Summit
- **[Przewodnik bezpieczeństwa OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** – Architektura referencyjna i wskazówki wdrożeniowe dla wszystkich zagrożeń OWASP MCP Top 10

---

## Co dalej

Następny: [Rozdział 3: Zaczynamy](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->