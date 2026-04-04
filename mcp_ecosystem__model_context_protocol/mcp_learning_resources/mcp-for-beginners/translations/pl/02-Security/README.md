# Bezpieczeństwo MCP: Kompleksowa Ochrona Systemów AI

[![Najlepsze praktyki bezpieczeństwa MCP](../../../translated_images/pl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknij powyższy obraz, aby obejrzeć wideo z tej lekcji)_

Bezpieczeństwo jest fundamentem projektowania systemów AI, dlatego traktujemy je jako naszą drugą sekcję. Zgodne jest to z zasadą Microsoft **Secure by Design** z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokół Model Context (MCP) wprowadza potężne nowe możliwości do aplikacji napędzanych sztuczną inteligencją, jednocześnie stawiając unikalne wyzwania związane z bezpieczeństwem, które wykraczają poza tradycyjne ryzyka oprogramowania. Systemy MCP stają w obliczu zarówno ugruntowanych problemów bezpieczeństwa (bezpieczne kodowanie, zasada najmniejszych uprawnień, bezpieczeństwo łańcucha dostaw), jak i nowych zagrożeń specyficznych dla AI, w tym wstrzykiwania promptów, zatruwania narzędzi, przechwytywania sesji, ataków elektronicznego „popędzania zdezorientowanego urzędnika” (confused deputy), podatności na przepuszczanie tokenów oraz dynamicznej modyfikacji uprawnień.

Ta lekcja omawia najważniejsze ryzyka bezpieczeństwa w implementacjach MCP — obejmując uwierzytelnianie, autoryzację, nadmierne uprawnienia, pośrednie wstrzykiwanie promptów, bezpieczeństwo sesji, problemy typu confused deputy, zarządzanie tokenami oraz podatności łańcucha dostaw. Nauczysz się praktycznych środków kontroli i najlepszych praktyk minimalizujących te zagrożenia, korzystając jednocześnie z rozwiązań Microsoft takich jak Prompt Shields, Azure Content Safety i GitHub Advanced Security, aby wzmocnić wdrożenie MCP.

## Cele nauki

Na koniec tej lekcji będziesz w stanie:

- **Identyfikować zagrożenia specyficzne dla MCP**: Rozpoznawać unikalne ryzyka bezpieczeństwa w systemach MCP, w tym wstrzykiwanie promptów, zatruwanie narzędzi, nadmierne uprawnienia, przechwytywanie sesji, problemy typu confused deputy, podatności na przepuszczanie tokenów oraz ryzyka łańcucha dostaw
- **Stosować środki kontroli bezpieczeństwa**: Wdrażać skuteczne zabezpieczenia, w tym solidne uwierzytelnianie, dostęp według zasady najmniejszych uprawnień, bezpieczne zarządzanie tokenami, kontrolę bezpieczeństwa sesji oraz weryfikację łańcucha dostaw
- **Wykorzystywać rozwiązania Microsoft dotyczące bezpieczeństwa**: Zrozumieć i wdrożyć Microsoft Prompt Shields, Azure Content Safety oraz GitHub Advanced Security dla ochrony obciążeń MCP
- **Weryfikować bezpieczeństwo narzędzi**: Rozpoznać znaczenie walidacji metadanych narzędzi, monitorowania dynamicznych zmian oraz obrony przed pośrednimi atakami z wstrzykiwaniem promptów
- **Integracja najlepszych praktyk**: Łączyć ugruntowane podstawy bezpieczeństwa (bezpieczne kodowanie, wzmacnianie serwera, zero trust) z kontrolami specyficznymi dla MCP dla kompleksowej ochrony

# Architektura i Kontrole Bezpieczeństwa MCP

Nowoczesne implementacje MCP wymagają warstwowych podejść do bezpieczeństwa, które obejmują zarówno tradycyjne aspekty bezpieczeństwa oprogramowania, jak i zagrożenia specyficzne dla AI. Dynamicznie rozwijająca się specyfikacja MCP nieustannie doskonali środki kontroli bezpieczeństwa, umożliwiając lepszą integrację z architekturami bezpieczeństwa przedsiębiorstw oraz ugruntowanymi najlepszymi praktykami.

Badania z [Microsoft Digital Defense Report](https://aka.ms/mddr) pokazują, że **98% zgłoszonych naruszeń można zapobiec przez solidną higienę bezpieczeństwa**. Najskuteczniejsza strategia ochrony łączy podstawowe praktyki bezpieczeństwa z kontrolami specyficznymi dla MCP — sprawdzone zabezpieczenia stanowią najbardziej efektywną bazę do ograniczenia ogólnego ryzyka.

## Aktualny Krajobraz Bezpieczeństwa

> **Uwaga:** Informacje te odzwierciedlają standardy bezpieczeństwa MCP na dzień **5 lutego 2026** zgodnie ze specyfikacją **MCP 2025-11-25**. Protokół MCP nadal szybko się rozwija, a przyszłe implementacje mogą wprowadzić nowe wzorce uwierzytelniania oraz ulepszone kontrole. Zawsze odwołuj się do aktualnej [Specyfikacji MCP](https://spec.modelcontextprotocol.io/), [repozytorium MCP na GitHub](https://github.com/modelcontextprotocol) oraz [dokumentacji najlepszych praktyk bezpieczeństwa](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) dla najnowszych wytycznych.

## 🏔️ Warsztaty MCP Security Summit (Sherpa)

Dla **praktycznego szkolenia z bezpieczeństwa** gorąco polecamy **MCP Security Summit Workshop** (Sherpa) – kompleksową, prowadzoną wyprawę do zabezpieczania serwerów MCP w Microsoft Azure.

### Przegląd Warsztatów

[Warsztaty MCP Security Summit](https://azure-samples.github.io/sherpa/) oferują praktyczne, możliwe do zastosowania szkolenie poprzez sprawdzoną metodologię „wrażliwość → exploit → naprawa → walidacja”. Doświadczysz:

- **Nauki przez łamanie rzeczy**: Poznasz luki poprzez wykorzystywanie celowo niebezpiecznych serwerów
- **Wykorzystania natywnych zabezpieczeń Azure**: Korzystasz z Azure Entra ID, Key Vault, API Management oraz AI Content Safety
- **Obrony w głębokości**: Przechodzisz przez obozy budujące kompleksowe warstwy zabezpieczeń
- **Zastosowania standardów OWASP**: Każda technika odpowiada [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Zdobycia produkcyjnego kodu**: Otrzymujesz działające, przetestowane implementacje

### Trasa Wyprawy

| Oboz | Temat | Zagrożenia OWASP Pokryte |
|------|-------|-------------------------|
| **Base Camp** | podstawy MCP i luki uwierzytelniania | MCP01, MCP07 |
| **Obóz 1: Tożsamość** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Obóz 2: Brama** | API Management, prywatne punkty końcowe, zarządzanie | MCP02, MCP07, MCP09 |
| **Obóz 3: Bezpieczeństwo I/O** | wstrzykiwanie promptów, ochrona PII, bezpieczeństwo treści | MCP03, MCP05, MCP06 |
| **Obóz 4: Monitorowanie** | Log Analytics, panele, wykrywanie zagrożeń | MCP08 |
| **Szczyt** | test integracji Red Team / Blue Team | Wszystkie |

**Zacznij:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Zagrożeń Bezpieczeństwa

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) przedstawia dziesięć najważniejszych zagrożeń bezpieczeństwa dla implementacji MCP:

| Ryzyko | Opis | Mitigacja na Azure |
|--------|------|--------------------|
| **MCP01** | Nieprawidłowe zarządzanie tokenami i wyciek sekretów | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalacja uprawnień przez narastanie zakresów (scope creep) | RBAC, Conditional Access |
| **MCP03** | Zatruwanie narzędzi | Weryfikacja narzędzi, sprawdzanie integralności |
| **MCP04** | Ataki na łańcuch dostaw | GitHub Advanced Security, skanowanie zależności |
| **MCP05** | Wstrzykiwanie i wykonywanie poleceń | Walidacja wejść, sandboxing |
| **MCP06** | Wstrzykiwanie promptów przez kontekstowe ładunki | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Niewystarczające uwierzytelnianie i autoryzacja | Azure Entra ID, OAuth 2.1 z PKCE |
| **MCP08** | Brak audytu i telemetrii | Azure Monitor, Application Insights |
| **MCP09** | Cienie serwerów MCP | Zarządzanie API Center, izolacja sieciowa |
| **MCP10** | Wstrzykiwanie kontekstu i nadmierne udostępnianie | Klasyfikacja danych, minimalizowanie ekspozycji |

### Ewolucja Uwierzytelniania MCP

Specyfikacja MCP znacznie się rozwinęła w podejściu do uwierzytelniania i autoryzacji:

- **Podejście oryginalne**: Wczesne specyfikacje wymagały od programistów implementacji własnych serwerów uwierzytelniania, gdzie serwery MCP działały jako serwery autoryzacji OAuth 2.0 zarządzające bezpośrednio uwierzytelnianiem użytkowników
- **Aktualny standard (2025-11-25)**: Zaktualizowana specyfikacja pozwala serwerom MCP delegować uwierzytelnianie do zewnętrznych dostawców tożsamości (takich jak Microsoft Entra ID), poprawiając postawę bezpieczeństwa i upraszczając implementację
- **Transport Layer Security**: Wzmocnione wsparcie dla bezpiecznych mechanizmów transportu ze stosownymi wzorcami uwierzytelniania dla połączeń lokalnych (STDIO) oraz zdalnych (Streamable HTTP)

## Bezpieczeństwo Uwierzytelniania i Autoryzacji

### Aktualne wyzwania związane z bezpieczeństwem

Nowoczesne implementacje MCP napotykają kilka wyzwań w obszarze uwierzytelniania i autoryzacji:

### Ryzyka i wektory ataków

- **Błędna logika autoryzacji**: Wadliwa implementacja autoryzacji w serwerach MCP może ujawniać wrażliwe dane i niepoprawnie stosować kontrolę dostępu
- **Kompromitacja tokenów OAuth**: Kradzież tokenów lokalnego serwera MCP umożliwia atakującym podszycie się pod serwery i uzyskanie dostępu do usług downstream
- **Podatności na przepuszczanie tokenów (token passthrough)**: Nieprawidłowe zarządzanie tokenami powoduje obejścia kontroli bezpieczeństwa oraz utratę śledzenia odpowiedzialności
- **Nadmierne uprawnienia**: Nadmocno uprawnione serwery MCP naruszają zasadę najmniejszych uprawnień i rozszerzają powierzchnię ataku

#### Przepuszczanie tokenów — krytyczny antywzorzec

**Przepuszczanie tokenów jest wyraźnie zakazane** w obecnej specyfikacji autoryzacji MCP ze względu na poważne skutki bezpieczeństwa:

##### Obejście kontroli bezpieczeństwa  
- Serwery MCP i API downstream implementują kluczowe kontrole (limitowanie liczby żądań, walidację żądań, monitorowanie ruchu), które zależą od prawidłowej weryfikacji tokenów  
- Bezpośrednie użycie tokenów klienta w API omija te podstawowe zabezpieczenia, podważając całą architekturę bezpieczeństwa  

##### Problemy z odpowiedzialnością i audytem  
- Serwery MCP nie mogą rozróżnić klientów używających tokenów wydanych upstream, co łamie ścieżki audytu  
- Logi serwerów zasobów downstream pokazują błędne źródła żądań zamiast faktycznych pośredników MCP  
- Dochodzenia incydentów i audyty zgodności stają się znacząco trudniejsze  

##### Ryzyko wycieku danych  
- Niewalidowane roszczenia tokenów umożliwiają złośliwcom z kradzionymi tokenami wykorzystanie serwerów MCP jako proxy do wycieku danych  
- Naruszenia granic zaufania pozwalają na nieautoryzowany dostęp, omijając zamierzone zabezpieczenia  

##### Wektory ataków wielousługowych  
- Skrajalne tokeny akceptowane przez wiele usług umożliwiają poruszanie się boczne między podłączonymi systemami  
- Założenia zaufania między usługami mogą być łamane, gdy pochodzenie tokenów nie jest weryfikowane  

### Kontrole bezpieczeństwa i łagodzenie ryzyk

**Krytyczne wymagania bezpieczeństwa:**

> **OBOWIĄZKOWE**: Serwery MCP **NIE MOGĄ** akceptować tokenów, które nie zostały wyraźnie wydane dla danego serwera MCP

#### Kontrole uwierzytelniania i autoryzacji

- **Dokładny przegląd autoryzacji**: Przeprowadzaj kompleksowe audyty logiki autoryzacji serwerów MCP, aby zapewnić dostęp tylko dla zamierzonych użytkowników i klientów  
  - **Przewodnik wdrożenia**: [Azure API Management jako brama uwierzytelniania dla serwerów MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Integracja tożsamości**: [Użycie Microsoft Entra ID do uwierzytelniania serwerów MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpieczne zarządzanie tokenami**: Wdrażaj [najlepsze praktyki Microsoft dotyczące walidacji i cyklu życia tokenów](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Weryfikuj dopasowanie tokena do publiczności (audience) serwera MCP  
  - Stosuj rotację tokenów oraz politykę wygasania  
  - Zapobiegaj powtórzeniom tokenów (replay attacks) i nieautoryzowanemu użyciu  

- **Chronione przechowywanie tokenów**: Zabezpieczaj tokeny szyfrowaniem w stanie spoczynku i podczas transmisji  
  - **Najlepsze praktyki**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Wdrożenie kontroli dostępu

- **Zasada najmniejszych uprawnień**: Przyznawaj serwerom MCP tylko minimalne uprawnienia potrzebne do zamierzonej funkcjonalności  
  - Regularnie przeglądaj i aktualizuj uprawnienia, aby zapobiec narastaniu uprawnień  
  - **Dokumentacja Microsoft**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrola dostępu oparta na rolach (RBAC)**: Implementuj precyzyjne przypisania ról  
  - Ograniczaj role do konkretnych zasobów i działań  
  - Unikaj szerokich lub niepotrzebnych uprawnień rozszerzających powierzchnię ataku  

- **Ciągły monitoring uprawnień**: Wdrażaj audyt i monitorowanie dostępu na bieżąco  
  - Monitoruj wzorce użycia uprawnień pod kątem anomalii  
  - Szybko eliminuj nadmierne lub nieużywane uprawnienia  

## Zagrożenia specyficzne dla AI

### Ataki z wstrzykiwaniem promptów i manipulacją narzędzi

Nowoczesne implementacje MCP stają w obliczu wyrafinowanych wektorów ataków charakterystycznych dla AI, których tradycyjne rozwiązania bezpieczeństwa nie są w stanie w pełni zaadresować:

#### **Pośrednie wstrzykiwanie promptów (Cross-Domain Prompt Injection)**

**Pośrednie wstrzykiwanie promptów** stanowi jedno z najważniejszych zagrożeń w systemach AI z obsługą MCP. Atakujący umieszczają złośliwe instrukcje w zewnętrznych treściach — dokumentach, stronach internetowych, mailach lub źródłach danych — które systemy AI następnie przetwarzają jak legalne polecenia.

**Scenariusze ataków:**  
- **Wstrzykiwanie oparte na dokumentach**: Złośliwe instrukcje ukryte w przetwarzanych dokumentach wywołujące niezamierzone działania AI  
- **Wykorzystywanie treści internetowych**: Zainfekowane strony zawierające osadzone prompt’y manipulujące zachowaniem AI podczas pobierania danych  
- **Ataki mailowe**: Złośliwe prompt’y w e-mailach powodujące wyciek informacji przez asystentów AI lub nieautoryzowane działania  
- **Zanieczyszczenie źródeł danych**: Skrossorowanie baz danych lub API dostarczających zawartość skażoną do systemów AI  

**Realny wpływ**: Ataki mogą powodować wyciek danych, naruszenia prywatności, generowanie szkodliwych treści oraz manipulację interakcjami użytkownika. Szczegółowa analiza dostępna w [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Schemat ataku wstrzykiwania promptów](../../../translated_images/pl/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataki zatruwania narzędzi**

**Zatruwanie narzędzi** kieruje się na metadane definiujące narzędzia MCP, wykorzystując sposób, w jaki modele LLM interpretują opisy i parametry narzędzi w celu podejmowania decyzji wykonawczych.

**Mechanizmy ataku:**  
- **Manipulacja metadanymi**: Wstrzyknięcie złośliwych instrukcji w opisy narzędzi, definicje parametrów lub przykłady użycia  
- **Niewidoczne instrukcje**: Ukryte prompt’y w metadanych narzędzi przetwarzane przez modele AI, niewidoczne dla użytkowników  
- **Dynamiczna modyfikacja narzędzi („Rug Pulls”)**: Narzędzia zatwierdzone przez użytkowników są później modyfikowane, by wykonywać złośliwe działania bez ich wiedzy  
- **Wstrzykiwanie parametrów**: Złośliwe treści osadzone w schematach parametrów narzędzi wpływające na działanie modelu  

**Ryzyko serwerów hostowanych**: Zdalne serwery MCP niosą podwyższone zagrożenia, ponieważ definicje narzędzi mogą być aktualizowane po początkowej akceptacji użytkownika, tworząc sytuacje, gdzie wcześniej bezpieczne narzędzia stają się szkodliwe. Pełna analiza w [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Schemat ataku zatruwania narzędzi](../../../translated_images/pl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatkowe wektory ataków AI**

- **Cross-Domain Prompt Injection (XPIA)**: Zaawansowane ataki wykorzystujące treści z wielu domen do obchodzenia kontroli bezpieczeństwa
- **Dynamiczna modyfikacja możliwości**: Zmiany możliwości narzędzi w czasie rzeczywistym, które wymykają się początkowym ocenom bezpieczeństwa  
- **Zatrucie okna kontekstowego**: Ataki manipulujące dużymi oknami kontekstowymi w celu ukrycia złośliwych instrukcji  
- **Ataki powodujące zamieszanie modelu**: Wykorzystywanie ograniczeń modelu do tworzenia nieprzewidywalnych lub niebezpiecznych zachowań  


### Wpływ ryzyk związanych z bezpieczeństwem AI

**Konsekwencje o wysokim wpływie:**  
- **Eksfiltracja danych**: Nieautoryzowany dostęp i kradzież wrażliwych danych przedsiębiorstwa lub danych osobowych  
- **Naruszenia prywatności**: Ujawnienie danych osobowych (PII) oraz poufnych danych biznesowych  
- **Manipulacja systemami**: Nieumyślne modyfikacje krytycznych systemów i przepływów pracy  
- **Kradzież poświadczeń**: Kompromitacja tokenów uwierzytelniających i danych dostępów do usług  
- **Ruch boczny**: Wykorzystanie przejętych systemów AI jako punktów przestankowych do szerszych ataków sieciowych  

### Rozwiązania Microsoft dotyczące bezpieczeństwa AI

#### **AI Prompt Shields: Zaawansowana ochrona przed atakami typu injection**

Microsoft **AI Prompt Shields** oferuje kompleksową ochronę przed zarówno bezpośrednimi, jak i pośrednimi atakami typu prompt injection dzięki wielowarstwowej ochronie:

##### **Podstawowe mechanizmy ochrony:**

1. **Zaawansowane wykrywanie i filtrowanie**  
   - Algorytmy uczenia maszynowego i techniki NLP wykrywają złośliwe instrukcje w treściach zewnętrznych  
   - Analiza w czasie rzeczywistym dokumentów, stron internetowych, e-maili oraz źródeł danych w celu identyfikacji osadzonych zagrożeń  
   - Kontekstowe rozumienie wzorców prawidłowych i złośliwych promptów  

2. **Techniki podświetlania**  
   - Rozróżnia instrukcje systemowe zaufane od potencjalnie przejętych danych zewnętrznych  
   - Metody transformacji tekstu zwiększające relewantność modelu przy jednoczesnym izolowaniu złośliwych treści  
   - Pomaga systemom AI utrzymać właściwą hierarchię instrukcji i ignorować wstrzyknięte komendy  

3. **Systemy ograniczników i znakowania danych**  
   - Wyraźne definiowanie granic pomiędzy zaufanymi komunikatami systemowymi a tekstem wejściowym zewnętrznym  
   - Specjalne znaczniki podkreślające granice między zaufanymi i niezaufanymi źródłami danych  
   - Jasne rozgraniczenie zapobiega zamieszaniu instrukcji i nieautoryzowanemu wykonywaniu poleceń  

4. **Ciągłe rozpoznawanie zagrożeń**  
   - Microsoft stale monitoruje pojawiające się wzory ataków i aktualizuje mechanizmy obronne  
   - Proaktywne polowanie na nowe techniki injection i wektory ataków  
   - Regularne aktualizacje modeli bezpieczeństwa w celu zachowania skuteczności wobec ewoluujących zagrożeń  

5. **Integracja Azure Content Safety**  
   - Część kompleksowego zestawu Azure AI Content Safety  
   - Dodatkowe wykrywanie prób jailbreak, treści szkodliwych oraz naruszeń polityk bezpieczeństwa  
   - Zunifikowana kontrola bezpieczeństwa we wszystkich komponentach aplikacji AI  

**Zasoby wdrożeniowe**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/pl/prompt-shield.ff5b95be76e9c78c.webp)


## Zaawansowane zagrożenia bezpieczeństwa MCP

### Luka w przejmowaniu sesji

**Przejęcie sesji** stanowi krytyczny wektor ataku w implementacjach MCP utrzymujących stan, gdzie nieautoryzowane podmioty zdobywają i wykorzystują legalne identyfikatory sesji do podszywania się pod klientów i wykonywania nieautoryzowanych działań.

#### **Scenariusze ataków i ryzyka**

- **Prompt injection przy przejęciu sesji**: Atakujący ze skradzionymi ID sesji wstrzykują złośliwe zdarzenia do serwerów współdzielących stan sesji, co może wywołać szkodliwe akcje lub dostęp do wrażliwych danych  
- **Bezpośrednie podszywanie się**: Skradzione ID sesji umożliwiają bezpośrednie wywołania serwera MCP, omijając uwierzytelnianie i traktując atakującego jako legalnego użytkownika  
- **Kompromitowane strumienie wznowienia**: Atakujący mogą przedwcześnie zakończyć żądania, przez co legitni klienci wznawiają sesje z potencjalnie złośliwą treścią  

#### **Kontrole bezpieczeństwa zarządzania sesjami**

**Wymagania krytyczne:**  
- **Weryfikacja autoryzacji**: Serwery MCP implementujące autoryzację **MUSZĄ** weryfikować WSZYSTKIE przychodzące żądania i **NIE MOGĄ** polegać na sesjach jako mechanizmie uwierzytelniania  
- **Bezpieczne generowanie sesji**: Użycie kryptograficznie bezpiecznych, niedeterministycznych ID sesji tworzonych przy pomocy generatorów liczb losowych  
- **Powiązanie z użytkownikiem**: Powiązywanie ID sesji z informacjami specyficznymi dla użytkownika, np. w formacie `<user_id>:<session_id>`, by zapobiegać nadużyciom sesji między użytkownikami  
- **Zarządzanie cyklem życia sesji**: Wdrożenie prawidłowego wygaśnięcia, rotacji i unieważniania sesji w celu ograniczenia okien podatności  
- **Bezpieczeństwo transportu**: Wymuszony HTTPS dla całej komunikacji, aby zapobiec przechwytywaniu ID sesji  

### Problem "Confused Deputy"

**Problem confused deputy** zachodzi, gdy serwery MCP działają jako proxy uwierzytelniające między klientami a usługami zewnętrznymi, co tworzy możliwość obejścia autoryzacji przez wykorzystanie statycznych identyfikatorów klienta.

#### **Mechanika ataku i ryzyka**

- **Omijanie zgody oparte na ciasteczkach**: Poprzednie uwierzytelnienie użytkownika generuje ciasteczka zgody, które atakujący wykorzystują przez złośliwe żądania autoryzacyjne z przygotowanymi URI przekierowań  
- **Kradzież kodów autoryzacyjnych**: Istniejące ciasteczka zgody mogą powodować, że serwery autoryzacyjne pomijają ekrany zgody i przekierowują kody na kontrolowane przez atakującego endpointy  
- **Nieautoryzowany dostęp do API**: Skradzione kody autoryzacyjne pozwalają na wymianę tokenów i podszywanie się pod użytkownika bez wyraźnej zgody  

#### **Strategie łagodzenia skutków**

**Obowiązkowe kontrole:**  
- **Wymagania dotyczące wyraźnej zgody**: Serwery proxy MCP z użyciem statycznych ID klientów **MUSZĄ** uzyskać zgodę użytkownika dla każdego dynamicznie rejestrowanego klienta  
- **Wdrożenie zabezpieczeń OAuth 2.1**: Stosowanie aktualnych najlepszych praktyk bezpieczeństwa OAuth, w tym PKCE (Proof Key for Code Exchange) dla wszystkich żądań autoryzacji  
- **Rygorystyczna walidacja klienta**: Implementacja ścisłej walidacji URI przekierowań i identyfikatorów klienta, by zapobiegać eksploatacji  

### Luka związana z przekazywaniem tokenów

**Przekazywanie tokenów** jest jawnie antywzorcowym rozwiązaniem, gdzie serwery MCP akceptują tokeny klienta bez prawidłowej walidacji i przekazują je dalej do API, co narusza specyfikacje autoryzacji MCP.

#### **Implikacje bezpieczeństwa**

- **Ominięcie kontroli**: Bezpośrednie użycie tokenów klienta do API omija kluczowe mechanizmy limitujące, walidujące i monitorujące  
- **Zniszczenie ścieżki audytu**: Tokeny wydane upstream utrudniają identyfikację klienta, co uniemożliwia dochodzenie incydentów  
- **Eksfiltracja danych przez proxy**: Niezwalidowane tokeny umożliwiają aktorom złośliwym wykorzystanie serwerów jako proxy dla nieautoryzowanego dostępu do danych  
- **Naruszenia granic zaufania**: Założenia zaufania serwisów downstream mogą być naruszone, gdy pochodzenie tokenów nie jest możliwe do weryfikacji  
- **Rozprzestrzenianie ataków wielousługowych**: Kompromitowane tokeny akceptowane w wielu usługach umożliwiają ruch boczny  

#### **Wymagane kontrole bezpieczeństwa**

**Wymagania bez kompromisów:**  
- **Walidacja tokenów**: Serwery MCP **NIE MOGĄ** akceptować tokenów niewydanych explicite dla serwera MCP  
- **Weryfikacja audytorium**: Zawsze weryfikować, czy pole aud (audience) tokena odpowiada tożsamości serwera MCP  
- **Prawidłowy cykl życia tokenów**: Stosowanie krótkotrwałych tokenów dostępu z bezpieczną rotacją  

## Bezpieczeństwo łańcucha dostaw systemów AI

Bezpieczeństwo łańcucha dostaw rozwinęło się poza tradycyjne zależności oprogramowania i obejmuje cały ekosystem AI. Nowoczesne implementacje MCP muszą rygorystycznie weryfikować i monitorować wszystkie komponenty związane z AI, gdyż każdy z nich może wprowadzać potencjalne podatności zagrażające integralności systemu.

### Rozszerzone komponenty łańcucha dostaw AI

**Tradycyjne zależności programowe:**  
- Biblioteki i frameworki open-source  
- Obrazy kontenerów i systemy bazowe  
- Narzędzia developerskie i potoki budowania  
- Komponenty infrastruktury i usługi  

**Elementy specyficzne dla łańcucha dostaw AI:**  
- **Modele bazowe**: Wstępnie wytrenowane modele od różnych dostawców wymagające weryfikacji pochodzenia  
- **Usługi osadzania**: Zewnętrzne usługi wektoryzacji i semantycznego wyszukiwania  
- **Dostawcy kontekstu**: Źródła danych, bazy wiedzy i repozytoria dokumentów  
- **Zewnętrzne API**: Usługi AI, potoki ML i końcówki przetwarzania danych  
- **Artefakty modelowe**: Wagi, konfiguracje oraz warianty modeli dostrajanych  
- **Źródła danych treningowych**: Zestawy danych używane do treningu i dostrajania modeli  

### Kompleksowa strategia bezpieczeństwa łańcucha dostaw

#### **Weryfikacja komponentów i zaufanie**  
- **Weryfikacja pochodzenia**: Sprawdzenie źródła, licencji i integralności wszystkich komponentów AI przed integracją  
- **Ocena bezpieczeństwa**: Przeprowadzanie skanowania podatności oraz przeglądów bezpieczeństwa modeli, źródeł danych i usług AI  
- **Analiza reputacji**: Ocena historii bezpieczeństwa i praktyk dostawców usług AI  
- **Weryfikacja zgodności**: Zapewnienie, że wszystkie komponenty spełniają wymogi bezpieczeństwa i regulacyjne organizacji  

#### **Bezpieczne potoki wdrożeniowe**  
- **Zautomatyzowane CI/CD z bezpieczeństwem**: Włączenie skanowania bezpieczeństwa we wszystkich etapach automatycznych potoków wdrożeniowych  
- **Integralność artefaktów**: Stosowanie weryfikacji kryptograficznej wszystkich wdrażanych artefaktów (kod, modele, konfiguracje)  
- **Wdrożenia etapowe**: Stosowanie progresywnych strategii wdrożeniowych z walidacją bezpieczeństwa na każdym etapie  
- **Zaufane repozytoria artefaktów**: Wdrażanie wyłącznie z weryfikowanych, bezpiecznych repozytoriów  

#### **Ciągły monitoring i reakcja**  
- **Skanowanie zależności**: Stały monitoring podatności wszystkich zależności programowych i komponentów AI  
- **Monitorowanie modeli**: Ciągła ocena zachowania modeli, dryfów wydajności oraz anomalii bezpieczeństwa  
- **Śledzenie stanu usług**: Monitorowanie dostępności, incydentów bezpieczeństwa i zmian polityk zewnętrznych usług AI  
- **Integracja wywiadu o zagrożeniach**: Uwzględnianie kanałów informacji o zagrożeniach specyficznych dla bezpieczeństwa AI i ML  

#### **Kontrola dostępu i zasada najmniejszych uprawnień**  
- **Uprawnienia na poziomie komponentów**: Ograniczanie dostępu do modeli, danych i usług wyłącznie do niezbędnych biznesowo  
- **Zarządzanie kontami usługowymi**: Wykorzystanie dedykowanych kont usługowych z minimalnymi wymaganymi uprawnieniami  
- **Segmentacja sieci**: Izolacja komponentów AI oraz ograniczenie dostępu sieciowego między usługami  
- **Kontrola API Gateway**: Użycie centralnych bram API do kontroli i monitoringu dostępu do zewnętrznych usług AI  

#### **Reagowanie na incydenty i odzyskiwanie**  
- **Procedury szybkiego reagowania**: Ustanowione procesy łatania lub wymiany skompromitowanych komponentów AI  
- **Rotacja poświadczeń**: Systemy automatyzujące rotację sekretów, kluczy API i danych dostępów  
- **Możliwości rollbacku**: Szybka możliwość przywrócenia wcześniejszych znanych i bezpiecznych wersji komponentów AI  
- **Odzyskiwanie po naruszeniach łańcucha dostaw**: Specyficzne procedury reagowania na kompromitacje usług upstream AI  

### Narzędzia Microsoft i integracja

**GitHub Advanced Security** zapewnia kompleksową ochronę łańcucha dostaw, w tym:  
- **Skanowanie sekretów**: Automatyczne wykrywanie poświadczeń, kluczy API i tokenów w repozytoriach  
- **Skanowanie zależności**: Ocena podatności zależności open-source oraz bibliotek  
- **Analiza CodeQL**: Statyczna analiza kodu pod kątem podatności i błędów programistycznych  
- **Wgląd w łańcuch dostaw**: Monitorowanie zdrowia i statusu bezpieczeństwa zależności  

**Integracja Azure DevOps i Azure Repos:**  
- Płynna integracja skanowania bezpieczeństwa w platformach deweloperskich Microsoft  
- Automatyczne kontrole bezpieczeństwa w potokach Azure Pipelines dla obciążeń AI  
- Egzekwowanie polityk bezpiecznego wdrażania komponentów AI  

**Praktyki wewnętrzne Microsoft:**  
Microsoft stosuje rozbudowane praktyki bezpieczeństwa łańcucha dostaw we wszystkich produktach. Dowiedz się o sprawdzonych podejściach w [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Najlepsze praktyki bezpieczeństwa podstawowego

Implementacje MCP dziedziczą i rozbudowują istniejącą postawę bezpieczeństwa organizacji. Wzmocnienie podstawowych praktyk bezpieczeństwa znacząco poprawia ogólne zabezpieczenia systemów AI i wdrożeń MCP.

### Podstawy bezpieczeństwa

#### **Bezpieczne praktyki programistyczne**  
- **Zgodność z OWASP**: Ochrona przed [OWASP Top 10](https://owasp.org/www-project-top-ten/) podatnościami aplikacji webowych  
- **Ochrony specyficzne dla AI**: Wdrożenie środków dla [OWASP Top 10 dla LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Bezpieczne zarządzanie sekretami**: Użycie dedykowanych sejfów na tokeny, klucze API i wrażliwe dane konfiguracyjne  
- **Szyfrowanie end-to-end**: Zapewnienie bezpiecznej komunikacji we wszystkich komponentach aplikacji i przepływach danych  
- **Walidacja wejść**: Rygorystyczna weryfikacja wszystkich danych wejściowych użytkowników, parametrów API oraz źródeł danych  

#### **Wzmacnianie infrastruktury**  
- **Uwierzytelnianie wieloskładnikowe**: Wymuszone MFA dla wszystkich kont administracyjnych i usługowych  
- **Zarządzanie łatami**: Automatyczne, terminowe łatanie systemów operacyjnych, frameworków i zależności  
- **Integracja dostawców tożsamości**: Centralne zarządzanie tożsamością przez przedsiębiorcze dostawców (Microsoft Entra ID, Active Directory)  
- **Segmentacja sieci**: Logiczna izolacja komponentów MCP w celu ograniczenia potencjału ruchu bocznego  
- **Zasada najmniejszych uprawnień**: Minimalne wymagane uprawnienia dla wszystkich komponentów i kont systemowych  

#### **Monitorowanie i wykrywanie zagrożeń**  
- **Kompleksowe logowanie**: Szczegółowe rejestrowanie aktywności aplikacji AI, w tym interakcji klient-serwer MCP  
- **Integracja SIEM**: Centralizacja informacji o bezpieczeństwie i zarządzanie zdarzeniami dla wykrywania anomalii  
- **Analiza zachowań**: Monitorowanie z wykorzystaniem AI w celu wykrywania nietypowych wzorców zachowań systemu i użytkowników  
- **Inteligencja zagrożeń**: Włączenie zewnętrznych kanałów informacji o zagrożeniach i wskaźników kompromitacji (IOC)  
- **Reakcja na incydenty**: Zdefiniowane procedury wykrywania, reagowania i odzyskiwania po incydentach bezpieczeństwa  

#### **Architektura Zero Trust**  
- **Nigdy nie ufaj, zawsze weryfikuj**: Ciągła weryfikacja użytkowników, urządzeń i połączeń sieciowych  
- **Mikrosegmentacja**: Szczegółowa kontrola sieciowa izolująca poszczególne ładunki robocze i usługi  
- **Bezpieczeństwo oparte na tożsamości**: Polityki bezpieczeństwa bazujące na zweryfikowanych tożsamościach zamiast lokalizacji sieciowej  
- **Ciągła ocena ryzyka**: Dynamiczna ocena postawy bezpieczeństwa na podstawie aktualnego kontekstu i zachowań  
- **Dostęp warunkowy**: Kontrole dostępu dostosowujące się do czynników ryzyka, lokalizacji i zaufania urządzenia  

### Wzorce integracji przedsiębiorstwa

#### **Integracja ekosystemu bezpieczeństwa Microsoft**  
- **Microsoft Defender for Cloud**: Kompleksowe zarządzanie postawą bezpieczeństwa chmury  
- **Azure Sentinel**: Natywne rozwiązanie SIEM i SOAR w chmurze do ochrony obciążeń AI  
- **Microsoft Entra ID**: Zarządzanie tożsamością i dostępem w przedsiębiorstwie z politykami dostępu warunkowego  
- **Azure Key Vault**: Centralne zarządzanie sekretami z wykorzystaniem modułu bezpieczeństwa sprzętowego (HSM)  
- **Microsoft Purview**: Zarządzanie danymi i zgodnością w źródłach danych AI oraz przepływach pracy  

#### **Zgodność i zarządzanie**  
- **Zgodność regulacyjna**: Zapewnienie, że implementacje MCP spełniają wymagania specyficzne dla branży (GDPR, HIPAA, SOC 2)  
- **Klasyfikacja danych**: Prawidłowa kategoryzacja i obsługa danych wrażliwych przetwarzanych przez systemy AI  
- **Ścieżki audytu**: Kompleksowe logowanie dla zgodności regulacyjnej i dochodzeń kryminalistycznych  
- **Kontrole prywatności**: Wdrażanie zasad privacy-by-design w architekturze systemów AI  
- **Zarządzanie zmianami**: Formalne procesy przeglądu bezpieczeństwa modyfikacji systemów AI  

Te podstawowe praktyki tworzą solidną bazę bezpieczeństwa, która zwiększa skuteczność specyficznych kontroli MCP i zapewnia kompleksową ochronę aplikacji napędzanych AI.
## Kluczowe Wnioski dotyczące Bezpieczeństwa

- **Warstwowe Podejście do Bezpieczeństwa**: Połącz podstawowe praktyki bezpieczeństwa (bezpieczne kodowanie, minimalne uprawnienia, weryfikacja łańcucha dostaw, ciągły monitoring) z kontrolami specyficznymi dla AI dla kompleksowej ochrony

- **Specyficzny Krajobraz Zagrożeń AI**: Systemy MCP napotykają unikalne ryzyka, takie jak wstrzykiwanie zapytań, zatrucie narzędzi, przejęcie sesji, problemy z „confused deputy”, podatności na przekazywanie tokenów oraz nadmierne uprawnienia, które wymagają specjalistycznych zabezpieczeń

- **Doskonałość w Uwierzytelnianiu i Autoryzacji**: Wdrożenie solidnego uwierzytelniania z użyciem zewnętrznych dostawców tożsamości (Microsoft Entra ID), egzekwowanie prawidłowej walidacji tokenów i nigdy nie akceptowanie tokenów, które nie zostały wyraźnie wydane dla Twojego serwera MCP

- **Zapobieganie Atakom AI**: Wykorzystaj Microsoft Prompt Shields i Azure Content Safety do obrony przed pośrednim wstrzykiwaniem zapytań i atakami zatrucia narzędzi, jednocześnie walidując metadane narzędzi i monitorując dynamiczne zmiany

- **Bezpieczeństwo Sesji i Transportu**: Używaj kryptograficznie bezpiecznych, niedeterministycznych identyfikatorów sesji powiązanych z tożsamościami użytkowników, wdrażaj właściwe zarządzanie cyklem życia sesji i nigdy nie używaj sesji do uwierzytelniania

- **Najlepsze Praktyki Bezpieczeństwa OAuth**: Zapobiegaj atakom typu confused deputy poprzez wyraźną zgodę użytkownika dla dynamicznie rejestrowanych klientów, właściwą implementację OAuth 2.1 z PKCE oraz ścisłą walidację URI przekierowań

- **Zasady Bezpieczeństwa Tokenów**: Unikaj antywzorców przekazywania tokenów, waliduj roszczenia audytorium tokenów, stosuj krótkotrwałe tokeny z bezpieczną rotacją i utrzymuj wyraźne granice zaufania

- **Kompleksowe Bezpieczeństwo Łańcucha Dostaw**: Traktuj wszystkie komponenty ekosystemu AI (modele, osadzenia, dostawców kontekstu, zewnętrzne API) z tym samym rygorem bezpieczeństwa jak tradycyjne zależności programowe

- **Ciągła Ewolucja**: Bądź na bieżąco z szybko ewoluującymi specyfikacjami MCP, aktywnie uczestnicz w standardach społeczności bezpieczeństwa i utrzymuj adaptacyjne postawy bezpieczeństwa w miarę dojrzewania protokołu

- **Integracja Bezpieczeństwa Microsoft**: Wykorzystaj kompleksowy ekosystem bezpieczeństwa Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) dla zwiększenia ochrony wdrożeń MCP

## Kompleksowe Zasoby

### **Oficjalna Dokumentacja Bezpieczeństwa MCP**
- [Specyfikacja MCP (Aktualna: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najlepsze Praktyki Bezpieczeństwa MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specyfikacja Autoryzacji MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repozytorium MCP na GitHub](https://github.com/modelcontextprotocol)

### **Zasoby Bezpieczeństwa OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kompleksowy OWASP MCP Top 10 z przewodnikiem po implementacji na Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficjalne zagrożenia bezpieczeństwa MCP według OWASP
- [Warsztaty MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktyczne szkolenie z bezpieczeństwa MCP na Azure

### **Standardy Bezpieczeństwa i Najlepsze Praktyki**
- [Najlepsze Praktyki Bezpieczeństwa OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Bezpieczeństwa Aplikacji Webowych](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 dla Dużych Modeli Językowych](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Badania i Analizy Bezpieczeństwa AI**
- [Wstrzykiwanie zapytań w MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Ataki zatrucia narzędziami (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing Badawczy Bezpieczeństwa MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Rozwiązania Bezpieczeństwa Microsoft**
- [Dokumentacja Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Usługa Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Bezpieczeństwo Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najlepsze Praktyki Zarządzania Tokenami w Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Przewodniki i Samouczki Implementacyjne**
- [Azure API Management jako Brama Uwierzytelniania MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Uwierzytelnianie Microsoft Entra ID z Serwerami MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Bezpieczne Przechowywanie i Szyfrowanie Tokenów (Wideo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps i Bezpieczeństwo Łańcucha Dostaw**
- [Bezpieczeństwo Azure DevOps](https://azure.microsoft.com/products/devops)
- [Bezpieczeństwo Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Podróż Bezpieczeństwa Łańcucha Dostaw Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatkowa Dokumentacja Bezpieczeństwa**

Dla kompleksowych wskazówek bezpieczeństwa, zapoznaj się z tymi wyspecjalizowanymi dokumentami w tej sekcji:

- **[Najlepsze Praktyki Bezpieczeństwa MCP 2025](./mcp-security-best-practices-2025.md)** - Kompletny zestaw najlepszych praktyk bezpieczeństwa dla implementacji MCP
- **[Implementacja Azure Content Safety](./azure-content-safety-implementation.md)** - Praktyczne przykłady implementacji integracji Azure Content Safety  
- **[Kontrole Bezpieczeństwa MCP 2025](./mcp-security-controls-2025.md)** - Najnowsze kontrole i techniki bezpieczeństwa dla wdrożeń MCP
- **[Szybki Przewodnik Najlepszych Praktyk MCP](./mcp-best-practices.md)** - Przewodnik szybkiego odniesienia do kluczowych praktyk bezpieczeństwa MCP

### **Praktyczne Szkolenia z Bezpieczeństwa**

- **[Warsztaty MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Kompleksowe warsztaty praktyczne zabezpieczania serwerów MCP na Azure z progresywnymi etapami od Base Camp do Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Architektura referencyjna i przewodnik implementacji dla wszystkich zagrożeń OWASP MCP Top 10

---

## Co dalej

Dalej: [Rozdział 3: Pierwsze kroki](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony za pomocą automatycznej usługi tłumaczeniowej AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że dokładamy wszelkich starań, aby tłumaczenie było jak najdokładniejsze, prosimy mieć na uwadze, że automatyczne przekłady mogą zawierać błędy lub niedokładności. Oryginalny dokument w języku źródłowym powinien być traktowany jako autorytatywne źródło. W przypadku istotnych informacji rekomendujemy skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->