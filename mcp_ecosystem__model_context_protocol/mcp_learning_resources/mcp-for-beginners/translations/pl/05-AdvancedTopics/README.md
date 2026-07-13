# Zaawansowane Tematy w MCP

[![Zaawansowane MCP: Bezpieczne, Skalowalne i Wielomodalne Agenty AI](../../../translated_images/pl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknij powyższy obrazek, aby obejrzeć wideo z tej lekcji)_

Ten rozdział obejmuje szereg zaawansowanych tematów związanych z implementacją Model Context Protocol (MCP), w tym integrację wielomodalną, skalowalność, najlepsze praktyki w zakresie bezpieczeństwa oraz integrację korporacyjną. Tematy te są kluczowe dla budowania solidnych i gotowych do produkcji aplikacji MCP, które mogą sprostać wymaganiom nowoczesnych systemów AI.

## Przegląd

Ta lekcja bada zaawansowane koncepcje implementacji Model Context Protocol, koncentrując się na integracji wielomodalnej, skalowalności, najlepszych praktykach bezpieczeństwa oraz integracji korporacyjnej. Tematy te są niezbędne do budowy aplikacji MCP klasy produkcyjnej, które mogą obsługiwać złożone wymagania w środowiskach korporacyjnych.

> **Patrząc w przyszłość:** kilka tematów poniżej jest dotkniętych kandydatem do wersji specyfikacji MCP `2026-07-28` — Konteksty główne (5.4) oraz Próbkowanie (5.6) bazują na prymitywach oznaczonych przez kandydata do wersji jako przestarzałe, a eksperymentalna funkcja Zadań, odwołana w Cechach Protokołu (5.16), przechodzi do dedykowanego rozszerzenia Zadań. Szczegóły można znaleźć w [Co się zmienia w MCP: Kandydat do wersji 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Cele nauki

Do końca tej lekcji będziesz w stanie:

- Implementować możliwości wielomodalne w ramach MCP
- Projektować skalowalne architektury MCP na potrzeby scenariuszy o dużym zapotrzebowaniu
- Stosować najlepsze praktyki bezpieczeństwa zgodne z zasadami bezpieczeństwa MCP
- Integrować MCP z korporacyjnymi systemami i frameworkami AI
- Optymalizować wydajność i niezawodność w środowiskach produkcyjnych

## Lekcje i przykładowe projekty

| Link | Tytuł | Opis |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integracja z Azure | Naucz się, jak integrować swój serwer MCP na platformie Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Przykłady wielomodalne MCP | Przykłady odpowiedzi audio, obrazów i wielomodalnych |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Minimalna aplikacja Spring Boot pokazująca OAuth2 z MCP, zarówno jako serwer autoryzacji, jak i zasobów. Demonstruje bezpieczne wydawanie tokenów, chronione endpointy, wdrożenie na Azure Container Apps oraz integrację z API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Konteksty główne | Dowiedz się więcej o kontekście głównym i jak go implementować |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Naucz się różnych typów routingu |
| [5.6 Sampling](./mcp-sampling/README.md) | Próbkowanie | Poznaj sposób pracy z próbkowaniem |
| [5.7 Scaling](./mcp-scaling/README.md) | Skalowanie | Dowiedz się o skalowaniu |
| [5.8 Security](./mcp-security/README.md) | Bezpieczeństwo | Zabezpiecz swój serwer MCP |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Serwer i klient MCP w Pythonie integrujący się z SerpAPI dla wyszukiwania w czasie rzeczywistym w sieci, wiadomościach, produktach i Q&A. Demonstruje multi-narzędziową orkiestrację, integrację z zewnętrznym API oraz solidne obsługiwanie błędów. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Przesyłanie danych w czasie rzeczywistym stało się dziś niezbędne w świecie napędzanym danymi, gdzie firmy i aplikacje wymagają natychmiastowego dostępu do informacji, aby podejmować decyzje na bieżąco. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Wyszukiwanie w czasie rzeczywistym | Jak MCP zmienia wyszukiwanie internetowe w czasie rzeczywistym, oferując standardowe podejście do zarządzania kontekstem pomiędzy modelami AI, silnikami wyszukiwania i aplikacjami. |
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Uwierzytelnianie Entra ID | Microsoft Entra ID zapewnia solidne, oparte na chmurze rozwiązanie do zarządzania tożsamością i dostępem, pomagając zagwarantować, że tylko autoryzowani użytkownicy i aplikacje mogą komunikować się z twoim serwerem MCP. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integracja Microsoft Foundry | Naucz się, jak integrować serwery Model Context Protocol z agentami Microsoft Foundry, umożliwiając potężną orkiestrację narzędzi i możliwości AI w korporacjach z użyciem standardowych połączeń z zewnętrznymi źródłami danych. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Inżynieria kontekstu | Przyszłe możliwości technik inżynierii kontekstu dla serwerów MCP, w tym optymalizacja kontekstu, dynamiczne zarządzanie kontekstem oraz strategie efektywnej inżynierii promptów w ramach MCP. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Własny transport | Naucz się implementować mechanizmy własnego transportu dla specjalistycznych scenariuszy komunikacji MCP. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Cechy protokołu | Opanuj zaawansowane cechy protokołu, w tym powiadomienia o postępie, anulowanie żądań, szablony zasobów oraz wzorce obsługi błędów. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agenci przeciwni | Użyj dwóch agentów o przeciwnych stanowiskach, korzystających z pojedynczego zestawu narzędzi MCP, aby wychwycić halucynacje, ujawnić przypadki brzegowe i generować lepiej skalibrowane wyniki poprzez ustrukturyzowaną debatę. |

> **Nowość w specyfikacji MCP 2025-11-25**: Specyfikacja obejmuje teraz eksperymentalne wsparcie dla **Zadań** (operacje długotrwałe z monitorowaniem postępu), **Adnotacji narzędzi** (metadane na temat zachowania narzędzi dla bezpieczeństwa), **Trybu pozyskiwania URL** (żądanie konkretnej zawartości URL od klientów) oraz rozszerzone **Konteksty główne** (do zarządzania kontekstem przestrzeni roboczej). Szczegóły w [dzienniku zmian specyfikacji MCP](https://spec.modelcontextprotocol.io/).

## Dodatkowe odniesienia

Aby uzyskać najnowsze informacje na temat zaawansowanych tematów MCP, zapoznaj się z:
- [Dokumentacja MCP](https://modelcontextprotocol.io/)
- [Specyfikacja MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repozytorium GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Ryzyka bezpieczeństwa i środki zaradcze
- [Warsztaty MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktyczne szkolenie z bezpieczeństwa

## Kluczowe wnioski

- Wielomodalne implementacje MCP rozszerzają możliwości AI poza przetwarzanie tekstu
- Skalowalność jest kluczowa dla wdrożeń korporacyjnych i można ją realizować poprzez skalowanie poziome i pionowe
- Kompleksowe środki bezpieczeństwa chronią dane i zapewniają odpowiednią kontrolę dostępu
- Integracja korporacyjna z platformami takimi jak Azure OpenAI i Microsoft AI Foundry wzmacnia możliwości MCP
- Zaawansowane implementacje MCP korzystają z zoptymalizowanych architektur i starannego zarządzania zasobami

## Ćwiczenie

Zaprojektuj implementację MCP na poziomie korporacyjnym dla konkretnego przypadku użycia:

1. Zidentyfikuj wymagania wielomodalne dla swojego przypadku użycia
2. Nakreśl środki bezpieczeństwa potrzebne do ochrony danych wrażliwych
3. Zaprojektuj skalowalną architekturę, która poradzi sobie z różnym obciążeniem
4. Zaplanuj punkty integracji z korporacyjnymi systemami AI
5. Udokumentuj potencjalne wąskie gardła wydajności i strategie ich ograniczania

## Dodatkowe zasoby

- [Dokumentacja Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentacja Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Co dalej

Przeglądnij lekcje z tego modułu, zaczynając od: [5.1 MCP Integration](./mcp-integration/README.md)

Po zakończeniu tego modułu kontynuuj z: [Moduł 6: Wkład Społeczności](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->