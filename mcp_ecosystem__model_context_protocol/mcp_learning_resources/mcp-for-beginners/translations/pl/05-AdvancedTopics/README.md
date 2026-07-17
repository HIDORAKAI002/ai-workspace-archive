# Zaawansowane Tematy w MCP

[![Zaawansowane MCP: Bezpieczne, Skalowalne i Wielomodalne Agentury AI](../../../translated_images/pl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknij powyższy obraz, aby obejrzeć wideo z tej lekcji)_

Ten rozdział obejmuje szereg zaawansowanych tematów dotyczących implementacji Model Context Protocol (MCP), w tym integrację wielomodalną, skalowalność, najlepsze praktyki bezpieczeństwa oraz integrację korporacyjną. Tematy te są kluczowe dla budowania solidnych i gotowych do produkcji aplikacji MCP, które mogą sprostać wymaganiom nowoczesnych systemów AI.

## Przegląd

Ta lekcja bada zaawansowane koncepcje implementacji Model Context Protocol, koncentrując się na integracji wielomodalnej, skalowalności, najlepszych praktykach bezpieczeństwa oraz integracji korporacyjnej. Tematy te są niezbędne do tworzenia produkcyjnych aplikacji MCP, które mogą obsługiwać złożone wymagania w środowiskach korporacyjnych.

> **Patrząc w przyszłość:** kilka poniższych tematów jest dotkniętych kandydatem do specyfikacji MCP z datą wydania `2026-07-28` — Root Contexts (5.4) i Sampling (5.6) bazują na prymitywach oznaczonych przez kandydata do wydania jako przestarzałe, a eksperymentalna funkcja Tasks wspomniana w Protocol Features (5.16) przechodzi do dedykowanego rozszerzenia Tasks. Szczegóły znajdziesz w [Co się zmienia w MCP: Kandydat do wydania 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Cele nauki

Pod koniec tej lekcji będziesz potrafił:

- Implementować możliwości wielomodalne w ramach MCP
- Projektować skalowalne architektury MCP na potrzeby scenariuszy o dużym zapotrzebowaniu
- Stosować najlepsze praktyki bezpieczeństwa zgodne z zasadami bezpieczeństwa MCP
- Integrować MCP z systemami i frameworkami AI w przedsiębiorstwach
- Optymalizować wydajność i niezawodność w środowiskach produkcyjnych

## Lekcje i przykładowe projekty

| Link | Tytuł | Opis |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integracja z Azure | Naucz się integrować swój serwer MCP na platformie Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Przykłady MCP Wielomodalnych  | Przykłady odpowiedzi audio, obrazów i wielomodalnych |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Minimalna aplikacja Spring Boot pokazująca OAuth2 z MCP, zarówno jako serwer autoryzacji jak i zasobów. Demonstruje bezpieczne wydawanie tokenów, chronione endpointy, wdrożenie w Azure Container Apps oraz integrację z API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts  | Dowiedz się więcej o root context i jak je implementować (przestarzałe w kandydacie do wydania `2026-07-28`; wciąż ważne dla `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Poznaj różne typy routingu |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Naucz się, jak pracować z samplingiem (przestarzałe w kandydacie do wydania `2026-07-28`; wciąż ważne dla `2025-11-25`) |
| [5.7 Scaling](./mcp-scaling/README.md) | Skalowanie  | Dowiedz się o skalowaniu |
| [5.8 Security](./mcp-security/README.md) | Bezpieczeństwo  | Zabezpiecz swój serwer MCP |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP serwer i klient integrujący się z SerpAPI dla wyszukiwania stron WWW, wiadomości, produktów i pytań i odpowiedzi w czasie rzeczywistym. Demonstruje orkiestrację wielu narzędzi, integrację z zewnętrznymi API i solidne obsługiwanie błędów. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Strumieniowanie danych w czasie rzeczywistym stało się niezbędne w dzisiejszym świecie opartym na danych, gdzie firmy i aplikacje wymagają natychmiastowego dostępu do informacji, aby podejmować terminowe decyzje.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Wyszukiwanie w czasie rzeczywistym | Jak MCP zmienia wyszukiwanie stron WWW w czasie rzeczywistym, zapewniając ustandaryzowane podejście do zarządzania kontekstem między modelami AI, wyszukiwarkami oraz aplikacjami.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Uwierzytelnianie Entra ID | Microsoft Entra ID zapewnia solidne, oparte na chmurze rozwiązanie do zarządzania tożsamością i dostępem, pomagając zapewnić, że tylko upoważnieni użytkownicy i aplikacje mogą wchodzić w interakcję z Twoim serwerem MCP.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integracja z Microsoft Foundry | Dowiedz się, jak integrować serwery Model Context Protocol z agentami Microsoft Foundry, umożliwiając potężną orkiestrację narzędzi i możliwości korporacyjnych AI z ustandaryzowanymi połączeniami z zewnętrznymi źródłami danych.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Inżynieria kontekstu | Przyszłe możliwości technik inżynieryjnych kontekstu dla serwerów MCP, w tym optymalizację kontekstu, dynamiczne zarządzanie kontekstem i strategie efektywnego tworzenia promptów w ramach MCP.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Niestandardowy Transport | Naucz się implementować niestandardowe mechanizmy transportu dla specjalistycznych scenariuszy komunikacji MCP.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Funkcje protokołu | Opanuj zaawansowane funkcje protokołu, w tym powiadomienia o postępie, anulowanie żądań, szablony zasobów i wzorce obsługi błędów.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agentury przeciwników | Użyj dwóch agentów o przeciwstawnych stanowiskach, dzielących jeden zestaw narzędzi MCP, aby wychwytywać halucynacje, ujawniać przypadki krawędziowe i generować lepiej skalibrowane wyniki poprzez ustrukturyzowaną debatę.|

> **Nowość w specyfikacji MCP 2025-11-25**: Specyfikacja zawiera teraz eksperymentalne wsparcie dla **Tasks** (operacji długotrwałych z monitorowaniem postępu), **Adnotacji narzędzi** (metadanych o zachowaniu narzędzi dla bezpieczeństwa), **URL Mode Elicitation** (żądania specyficznej zawartości URL od klientów) oraz rozszerzone **Roots** (do zarządzania kontekstem przestrzeni roboczej). Pełne szczegóły znajdziesz w [dzienniku zmian specyfikacji MCP](https://spec.modelcontextprotocol.io/).

## Dodatkowe odsyłacze

Aby uzyskać najnowsze informacje na temat zaawansowanych tematów MCP, odwołaj się do:
- [Dokumentacja MCP](https://modelcontextprotocol.io/)
- [Specyfikacja MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repozytorium GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Zagrożenia bezpieczeństwa i środki zaradcze
- [Warsztaty MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktyczne szkolenie z bezpieczeństwa

## Kluczowe Wnioski

- Implementacje MCP wielomodalnych rozszerzają możliwości AI poza przetwarzanie tekstu
- Skalowalność jest niezbędna dla wdrożeń korporacyjnych i może być realizowana przez skalowanie poziome i pionowe
- Kompleksowe środki bezpieczeństwa chronią dane i zapewniają właściwą kontrolę dostępu
- Integracja korporacyjna z platformami takimi jak Azure OpenAI i Microsoft AI Foundry wzmacnia możliwości MCP
- Zaawansowane implementacje MCP korzystają z optymalizowanych architektur i starannego zarządzania zasobami

## Ćwiczenie

Zaprojektuj implementację MCP klasy korporacyjnej dla konkretnego przypadku użycia:

1. Określ wymagania wielomodalne dla swojego przypadku użycia
2. Nakreśl środki bezpieczeństwa potrzebne do ochrony danych wrażliwych
3. Zaprojektuj skalowalną architekturę, która poradzi sobie z różnym obciążeniem
4. Zaplanuj punkty integracji z systemami AI przedsiębiorstwa
5. Udokumentuj potencjalne wąskie gardła wydajności i strategie ich łagodzenia

## Dodatkowe zasoby

- [Dokumentacja Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentacja Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Co dalej

Przeglądaj lekcje w tym module, zaczynając od: [5.1 Integracja MCP](./mcp-integration/README.md)

Po ukończeniu tego modułu przejdź do: [Moduł 6: Wkłady Społeczności](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->