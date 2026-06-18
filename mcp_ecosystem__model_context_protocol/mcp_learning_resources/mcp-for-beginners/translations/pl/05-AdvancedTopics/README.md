# Zaawansowane tematy MCP

[![Zaawansowany MCP: Bezpieczni, skalowalni i multimodalni agenci AI](../../../translated_images/pl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknij powyższy obraz, aby obejrzeć wideo z tej lekcji)_

Ten rozdział obejmuje serię zaawansowanych tematów dotyczących implementacji Model Context Protocol (MCP), w tym integrację multimodalną, skalowalność, najlepsze praktyki bezpieczeństwa oraz integrację w przedsiębiorstwach. Te tematy są kluczowe dla budowy solidnych i gotowych do produkcji aplikacji MCP, które mogą sprostać wymaganiom nowoczesnych systemów AI.

## Przegląd

Ta lekcja bada zaawansowane koncepcje implementacji Model Context Protocol, koncentrując się na integracji multimodalnej, skalowalności, najlepszych praktykach bezpieczeństwa i integracji korporacyjnej. Tematy te są niezbędne do tworzenia wysokiej klasy aplikacji MCP, które mogą obsługiwać złożone wymagania w środowiskach biznesowych.

## Cele nauki

Po zakończeniu tej lekcji będziesz w stanie:

- Implementować funkcje multimodalne w ramach MCP
- Projektować skalowalne architektury MCP na potrzeby scenariuszy o dużym zapotrzebowaniu
- Stosować najlepsze praktyki bezpieczeństwa zgodne z zasadami bezpieczeństwa MCP
- Integracja MCP z przedsiębiorczymi systemami i frameworkami AI
- Optymalizować wydajność i niezawodność w środowiskach produkcyjnych

## Lekcje i przykładowe projekty

| Link | Tytuł | Opis |
|------|-------|-------------|
| [5.1 Integracja z Azure](./mcp-integration/README.md) | Integracja z Azure | Naucz się, jak integrować swój serwer MCP na platformie Azure |
| [5.2 Przykład multimodalny](./mcp-multi-modality/README.md) | Przykłady multimodalne MCP | Przykłady dla odpowiedzi audio, obrazów i multimodalnych |
| [5.3 MCP OAuth2 przykład](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Minimalna aplikacja Spring Boot demonstrująca OAuth2 z MCP, zarówno jako serwer autoryzacji jak i zasobów. Pokazuje bezpieczne wydawanie tokenów, chronione końcówki, wdrożenie w Azure Container Apps oraz integrację z API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Konteksty główne | Dowiedz się więcej o kontekstach głównych i jak je implementować |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Poznaj różne typy routingu |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Naucz się, jak pracować z próbkowaniem |
| [5.7 Skalowanie](./mcp-scaling/README.md) | Skalowanie | Dowiedz się o skalowaniu |
| [5.8 Bezpieczeństwo](./mcp-security/README.md) | Bezpieczeństwo | Zabezpiecz swój serwer MCP |
| [5.9 Przykład wyszukiwania w sieci MCP](./web-search-mcp/README.md) | Wyszukiwanie w sieci MCP | Serwer i klient Python MCP integrujący się z SerpAPI do wyszukiwania w sieci, wiadomości, produktów oraz Q&A w czasie rzeczywistym. Demonstruje orkiestrację wielu narzędzi, integrację z zewnętrznym API i solidne obsługiwanie błędów. |
| [5.10 Transmisja strumieniowa w czasie rzeczywistym](./mcp-realtimestreaming/README.md) | Streaming | Transmisja danych w czasie rzeczywistym stała się nieodzowna w dzisiejszym świecie napędzanym danymi, gdzie firmy i aplikacje wymagają natychmiastowego dostępu do informacji, by podejmować szybkie decyzje. |
| [5.11 Wyszukiwanie w sieci w czasie rzeczywistym](./mcp-realtimesearch/README.md) | Wyszukiwanie w sieci | Real-time web search, jak MCP przekształca wyszukiwanie w sieci w czasie rzeczywistym, oferując ustandaryzowane podejście do zarządzania kontekstem pomiędzy modelami AI, silnikami wyszukiwania i aplikacjami. |
| [5.12 Uwierzytelnianie Entra ID dla serwerów Model Context Protocol](./mcp-security-entra/README.md) | Uwierzytelnianie Entra ID | Microsoft Entra ID zapewnia solidne rozwiązanie zarządzania tożsamością i dostępem w chmurze, pomagając zagwarantować, że tylko autoryzowani użytkownicy i aplikacje mogą komunikować się z Twoim serwerem MCP. |
| [5.13 Integracja agenta Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Integracja Microsoft Foundry | Naucz się integrować serwery Model Context Protocol z agentami Microsoft Foundry, co umożliwia potężną orkiestrację narzędzi i funkcje AI dla przedsiębiorstw z ustandaryzowanymi połączeniami do zewnętrznych źródeł danych. |
| [5.14 Inżynieria kontekstu](./mcp-contextengineering/README.md) | Inżynieria kontekstu | Przyszłe możliwości technik inżynierii kontekstu dla serwerów MCP, w tym optymalizacja kontekstu, dynamiczne zarządzanie kontekstem i strategie efektywnego prompt engineering w ramach MCP. |
| [5.15 Własny transport MCP](./mcp-transport/README.md) | Własny transport | Naucz się implementować własne mechanizmy transportu dla specjalistycznych scenariuszy komunikacji MCP. |
| [5.16 Głębokie zanurzenie w funkcje protokołu](./mcp-protocol-features/README.md) | Funkcje protokołu | Opanuj zaawansowane funkcje protokołu, w tym powiadomienia o postępie, anulowanie żądań, szablony zasobów i wzorce obsługi błędów. |
| [5.17 Adwersarialne rozumowanie wieloagentowe](./mcp-adversarial-agents/README.md) | Agenci adwersarialni | Użyj dwóch agentów o przeciwstawnych stanowiskach, współdzielących zestaw narzędzi MCP, aby wychwytywać halucynacje, ujawniać przypadki graniczne oraz generować lepiej skalibrowane wyniki poprzez strukturalną debatę. |

> **Nowość w specyfikacji MCP z dnia 2025-11-25**: Specyfikacja zawiera teraz eksperymentalne wsparcie dla **Zadań** (operacji długotrwałych z monitorowaniem postępu), **Adnotacji narzędzi** (metadane o zachowaniu narzędzi dla bezpieczeństwa), **URL Mode Elicitation** (żądanie określonych treści URL od klientów) oraz rozszerzonych **Roots** (do zarządzania kontekstem przestrzeni roboczej). Pełne szczegóły znajdują się w [changelog specyfikacji MCP](https://spec.modelcontextprotocol.io/).

## Dodatkowe odniesienia

Dla najnowszych informacji o zaawansowanych tematach MCP, zobacz:
- [Dokumentacja MCP](https://modelcontextprotocol.io/)
- [Specyfikacja MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repozytorium GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – ryzyka bezpieczeństwa i środki zaradcze
- [Warsztaty MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) – praktyczne szkolenie z bezpieczeństwa

## Kluczowe wnioski

- Implementacje multimodalne MCP rozszerzają możliwości AI poza przetwarzanie tekstu
- Skalowalność jest niezbędna w zastosowaniach korporacyjnych i może być realizowana poprzez skalowanie poziome i pionowe
- Kompleksowe środki bezpieczeństwa chronią dane i zapewniają odpowiednią kontrolę dostępu
- Integracje korporacyjne z platformami takimi jak Azure OpenAI i Microsoft AI Foundry wzmacniają możliwości MCP
- Zaawansowane implementacje MCP korzystają z optymalizowanych architektur i starannego zarządzania zasobami

## Ćwiczenie

Zaprojektuj implementację MCP klasy korporacyjnej dla konkretnego przypadku użycia:

1. Zidentyfikuj wymagania multimodalne dla swojego przypadku użycia
2. Nakreśl kontrole bezpieczeństwa potrzebne do ochrony danych wrażliwych
3. Zaprojektuj skalowalną architekturę zdolną do obsługi zmiennego obciążenia
4. Zaplanuj punkty integracji z przedsiębiorczymi systemami AI
5. Udokumentuj potencjalne wąskie gardła wydajności i strategie ich łagodzenia

## Dodatkowe zasoby

- [Dokumentacja Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentacja Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Co dalej

Przeglądaj lekcje w tym module, zaczynając od: [5.1 Integracja MCP](./mcp-integration/README.md)

Po ukończeniu tego modułu kontynuuj: [Moduł 6: Wkłady społeczności](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->