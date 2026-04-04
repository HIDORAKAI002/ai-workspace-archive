# Studium przypadku: Azure AI Travel Agents – przykładowa implementacja

## Przegląd

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) to kompleksowe rozwiązanie referencyjne opracowane przez Microsoft, które pokazuje, jak zbudować wieloagentową aplikację do planowania podróży zasilaną sztuczną inteligencją, wykorzystując Model Context Protocol (MCP), Azure OpenAI oraz Azure AI Search. Projekt ten prezentuje najlepsze praktyki orkiestracji wielu agentów AI, integracji danych korporacyjnych oraz zapewniania bezpiecznej, rozszerzalnej platformy do zastosowań w rzeczywistych scenariuszach.

## Kluczowe funkcje
- **Orkiestracja wieloagentowa:** Wykorzystuje MCP do koordynowania wyspecjalizowanych agentów (np. agentów lotów, hoteli oraz planów podróży), którzy współpracują przy realizacji złożonych zadań planowania podróży.
- **Integracja danych korporacyjnych:** Łączy się z Azure AI Search oraz innymi źródłami danych korporacyjnych, aby dostarczać aktualne i istotne informacje do rekomendacji podróży.
- **Bezpieczna i skalowalna architektura:** Wykorzystuje usługi Azure do uwierzytelniania, autoryzacji oraz skalowalnego wdrażania, zgodnie z najlepszymi praktykami zabezpieczeń korporacyjnych.
- **Rozszerzalne narzędzia:** Implementuje wielokrotnie używane narzędzia MCP oraz szablony promptów, umożliwiając szybką adaptację do nowych dziedzin lub wymagań biznesowych.
- **Doświadczenie użytkownika:** Zapewnia interfejs konwersacyjny, umożliwiający użytkownikom interakcję z agentami podróży, zasilany przez Azure OpenAI oraz MCP.

## Architektura
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Opis diagramu architektury

Rozwiązanie Azure AI Travel Agents zostało zaprojektowane z myślą o modułowości, skalowalności oraz bezpiecznej integracji wielu agentów AI i źródeł danych korporacyjnych. Główne komponenty i przepływ danych przedstawiają się następująco:

- **Interfejs użytkownika:** Użytkownicy wchodzą w interakcję z systemem za pomocą konwersacyjnego interfejsu użytkownika (np. czat w witrynie lub bot w Teams), który wysyła zapytania użytkownika i odbiera rekomendacje podróży.
- **Serwer MCP:** Działa jako centralny koordynator, odbierając dane wejściowe od użytkownika, zarządzając kontekstem oraz koordynując działania wyspecjalizowanych agentów (np. FlightAgent, HotelAgent, ItineraryAgent) za pomocą Model Context Protocol.
- **Agenci AI:** Każdy agent odpowiada za określoną domenę (loty, hotele, plany podróży) i jest zaimplementowany jako narzędzie MCP. Agenci wykorzystują szablony promptów i logikę do przetwarzania żądań i generowania odpowiedzi.
- **Usługa Azure OpenAI:** Zapewnia zaawansowane rozumienie języka naturalnego oraz generowanie odpowiedzi, umożliwiając agentom interpretację intencji użytkownika i tworzenie konwersacyjnych odpowiedzi.
- **Azure AI Search i dane korporacyjne:** Agenci wyszukują informacje w Azure AI Search oraz innych źródłach danych korporacyjnych, aby uzyskać aktualne dane o lotach, hotelach i opcjach podróży.
- **Uwierzytelnianie i zabezpieczenia:** Integruje się z Microsoft Entra ID dla bezpiecznego uwierzytelniania i stosuje zasady dostępu o minimalnych uprawnieniach do wszystkich zasobów.
- **Wdrożenie:** Zaprojektowano do wdrożenia w Azure Container Apps, co zapewnia skalowalność, monitorowanie i efektywność operacyjną.

Ta architektura umożliwia płynną orkiestrację wielu agentów AI, bezpieczną integrację z danymi korporacyjnymi oraz stanowi solidną, rozszerzalną platformę do tworzenia specyficznych dla domeny rozwiązań AI.

## Szczegółowe wyjaśnienie diagramu architektury
Wyobraź sobie planowanie dużej podróży, podczas której zespół ekspertów pomaga Ci w każdym detalu. System Azure AI Travel Agents działa podobnie, wykorzystując różne części (jak członków zespołu), z których każda ma specjalne zadanie. Oto jak to wszystko się łączy:

### Interfejs użytkownika (UI):
Pomyśl o tym jak o recepcji Twojego agenta podróży. To tutaj Ty (użytkownik) zadajesz pytania lub składasz prośby, np. „Znajdź lot do Paryża”. Może to być okno czatu na stronie internetowej lub aplikacja do wiadomości.

### Serwer MCP (koordynator):
Serwer MCP jest jak menedżer, który słucha Twojego zapytania przy recepcji i decyduje, który specjalista powinien zająć się danym tematem. Śledzi przebieg konwersacji i dba, aby wszystko działało płynnie.

### Agenci AI (specjalistyczni asystenci):
Każdy agent to ekspert w określonym obszarze – jeden zna się na lotach, inny na hotelach, a jeszcze inny na planowaniu podróży. Gdy zadasz pytanie o podróż, Serwer MCP przekazuje Twoją prośbę odpowiedniemu agentowi/agentom. Agenci korzystają z wiedzy i narzędzi, aby znaleźć najlepsze opcje dla Ciebie.

### Usługa Azure OpenAI (ekspert językowy):
To jak posiadanie eksperta językowego, który dokładnie rozumie, o co pytasz, niezależnie od tego, jak to sformułujesz. Pomaga agentom rozumieć Twoje prośby i odpowiadać w naturalnym, konwersacyjnym języku.

### Azure AI Search i dane korporacyjne (biblioteka informacji):
Wyobraź sobie ogromną, aktualną bibliotekę ze wszystkimi najnowszymi informacjami o podróżach – rozkłady lotów, dostępność hoteli i inne. Agenci przeszukują tę bibliotekę, aby dostarczyć Ci najbardziej dokładne odpowiedzi.

### Uwierzytelnianie i zabezpieczenia (ochroniarz):
Podobnie jak ochroniarz sprawdza, kto może wejść do określonych miejsc, ta część systemu dba, aby tylko uprawnione osoby i agenci mieli dostęp do poufnych informacji. Chroni Twoje dane i prywatność.

### Wdrożenie w Azure Container Apps (budynek):
Wszyscy ci asystenci i narzędzia współpracują w bezpiecznym, skalowalnym budynku (chmurze). Oznacza to, że system może obsłużyć wielu użytkowników jednocześnie i jest zawsze dostępny, gdy go potrzebujesz.

## Jak to wszystko działa razem:

Zaczynasz, zadając pytanie na recepcji (UI).
Menedżer (Serwer MCP) ustala, który specjalista (agent) powinien Ci pomóc.
Specjalista korzysta z eksperta językowego (OpenAI), aby zrozumieć Twoją prośbę, oraz z biblioteki (AI Search), aby znaleźć najlepszą odpowiedź.
Ochroniarz (Uwierzytelnianie) dba, aby wszystko było bezpieczne.
Całość działa w niezawodnym, skalowalnym budynku (Azure Container Apps), dzięki czemu Twoje doświadczenie jest płynne i bezpieczne.
Ta współpraca umożliwia systemowi szybkie i bezpieczne planowanie Twojej podróży, tak jak zespół ekspertów ds. podróży współpracujących w nowoczesnym biurze!

## Implementacja techniczna
- **Serwer MCP:** Hostuje główną logikę orkiestracji, udostępnia narzędzia agentów i zarządza kontekstem wieloetapowych procesów planowania podróży.
- **Agenci:** Każdy agent (np. FlightAgent, HotelAgent) jest zaimplementowany jako narzędzie MCP z własnymi szablonami promptów i logiką.
- **Integracja z Azure:** Wykorzystuje Azure OpenAI do rozumienia języka naturalnego oraz Azure AI Search do pozyskiwania danych.
- **Zabezpieczenia:** Integruje się z Microsoft Entra ID do uwierzytelniania i stosuje politykę najmniejszych uprawnień do wszystkich zasobów.
- **Wdrożenie:** Wspiera wdrożenie w Azure Container Apps dla skalowalności i efektywności operacyjnej.

## Wyniki i wpływ
- Pokazuje, jak MCP może być użyte do orkiestracji wielu agentów AI w rzeczywistym, produkcyjnym scenariuszu.
- Przyspiesza rozwój rozwiązań poprzez dostarczanie wielokrotnie używalnych wzorców koordynacji agentów, integracji danych i bezpiecznego wdrażania.
- Służy jako wzorzec do tworzenia specyficznych dla domeny aplikacji zasilanych AI, wykorzystujących MCP oraz usługi Azure.

## Źródła
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Co dalej

- Powrót do: [Case Studies Overview](./README.md)
- Dalej: [Updating ADO Items from YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony przy użyciu usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że dążymy do jak największej dokładności, prosimy mieć na uwadze, że tłumaczenia automatyczne mogą zawierać błędy lub niedokładności. Oryginalny dokument w języku źródłowym należy traktować jako źródło autorytatywne. W przypadku informacji o krytycznym znaczeniu zaleca się skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->