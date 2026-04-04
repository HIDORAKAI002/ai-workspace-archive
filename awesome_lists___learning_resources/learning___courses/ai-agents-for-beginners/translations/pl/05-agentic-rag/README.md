[![Agentic RAG](../../../translated_images/pl/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Kliknij obraz powyżej, aby obejrzeć wideo z tej lekcji)_

# Agentic RAG

Ta lekcja przedstawia kompleksowy przegląd Agentic Retrieval-Augmented Generation (Agentic RAG), pojawiającego się paradygmatu AI, w którym duże modele językowe (LLM) samodzielnie planują kolejne kroki, jednocześnie pozyskując informacje z zewnętrznych źródeł. W przeciwieństwie do statycznych wzorców „wyszukaj, a potem odczytaj”, Agentic RAG obejmuje iteracyjne wywołania LLM, przeplatane wywołaniami narzędzi lub funkcji oraz strukturyzowanymi wynikami. System ocenia wyniki, dopracowuje zapytania, wywołuje dodatkowe narzędzia w razie potrzeby i kontynuuje ten cykl, aż osiągnie satysfakcjonujące rozwiązanie.

## Wprowadzenie

Ta lekcja obejmie

- **Zrozumienie Agentic RAG:** Poznaj pojawiający się paradygmat w AI, w którym duże modele językowe (LLM) samodzielnie planują kolejne kroki, jednocześnie pobierając informacje z zewnętrznych źródeł danych.
- **Pojęcie iteracyjnego stylu Maker-Checker:** Zrozum pętlę iteracyjnych wywołań LLM, przeplataną wywołaniami narzędzi lub funkcji oraz strukturyzowanymi wynikami, zaprojektowaną w celu poprawy poprawności i obsługi błędnie sformułowanych zapytań.
- **Praktyczne zastosowania:** Zidentyfikuj scenariusze, w których Agentic RAG wyróżnia się, takie jak środowiska stawiające na poprawność, złożone interakcje z bazami danych i rozbudowane przepływy pracy.

## Cele nauki

Po ukończeniu tej lekcji będziesz wiedzieć/jak rozumieć:

- **Zrozumienie Agentic RAG:** Poznasz paradygmat AI, w którym duże modele językowe (LLM) samodzielnie planują kolejne kroki, jednocześnie pobierając informacje z zewnętrznych źródeł danych.
- **Iteracyjny styl Maker-Checker:** Pojmiesz koncepcję pętli iteracyjnych wywołań LLM, przeplatanych wywołaniami narzędzi lub funkcji i strukturyzowanymi wynikami, zaprojektowaną w celu poprawy poprawności i obsługi błędnych zapytań.
- **Przejmowanie procesu rozumowania:** Zrozumiesz zdolność systemu do przejmowania odpowiedzialności za proces rozumowania, podejmowania decyzji o sposobie podejścia do problemów bez polegania na uprzednio zdefiniowanych ścieżkach.
- **Przepływ pracy:** Zrozumiesz, jak model agentyczny samodzielnie decyduje o pobraniu raportów o trendach rynkowych, identyfikacji danych konkurencji, korelowaniu wewnętrznych metryk sprzedaży, syntezowaniu ustaleń i ocenie strategii.
- **Iteracyjne pętle, integracja narzędzi i pamięć:** Poznasz oparcie systemu na wzorcu interakcji w pętli, utrzymywaniu stanu i pamięci pomiędzy krokami, aby unikać powtarzających się pętli i podejmować bardziej świadome decyzje.
- **Obsługa trybów awaryjnych i samokorekta:** Zbadasz rozbudowane mechanizmy samokorekty systemu, w tym iteracyjne ponawianie zapytań, użycie narzędzi diagnostycznych oraz odwołanie się do nadzoru ludzkiego.
- **Granice agencji:** Zrozumiesz ograniczenia Agentic RAG, koncentrując się na autonomii specyficznej dla domeny, zależności od infrastruktury i poszanowaniu ograniczeń.
- **Praktyczne przypadki użycia i wartość:** Zidentyfikujesz scenariusze, w których Agentic RAG się wyróżnia, takie jak środowiska stawiające na poprawność, złożone interakcje z bazami danych i rozbudowane przepływy pracy.
- **Zarządzanie, przejrzystość i zaufanie:** Dowiesz się o znaczeniu zarządzania i przejrzystości, w tym wyjaśnialnego rozumowania, kontroli uprzedzeń i nadzoru ludzkiego.

## Czym jest Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) to pojawiający się paradygmat w AI, w którym duże modele językowe (LLM) samodzielnie planują kolejne kroki, jednocześnie pobierając informacje z zewnętrznych źródeł. W przeciwieństwie do statycznych wzorców „wyszukaj, a potem odczytaj”, Agentic RAG obejmuje iteracyjne wywołania LLM, przeplatane wywołaniami narzędzi lub funkcji oraz strukturyzowanymi wynikami. System ocenia uzyskane rezultaty, dopracowuje zapytania, w razie potrzeby wywołuje dodatkowe narzędzia i kontynuuje ten cykl, aż osiągnie satysfakcjonujące rozwiązanie. Ten iteracyjny styl „maker-checker” poprawia poprawność, radzi sobie z błędnie sformułowanymi zapytaniami i zapewnia wysoką jakość wyników.

System aktywnie przejmuje odpowiedzialność za swój proces rozumowania, przepisując nieudane zapytania, wybierając inne metody wyszukiwania i integrując wiele narzędzi — takich jak wyszukiwanie wektorowe w Azure AI Search, bazy danych SQL czy niestandardowe API — zanim sfinalizuje swoją odpowiedź. Cechą wyróżniającą systemu agentycznego jest jego zdolność do przejmowania procesu rozumowania. Tradycyjne implementacje RAG opierają się na uprzednio zdefiniowanych ścieżkach, podczas gdy system agentyczny autonomicznie określa sekwencję kroków na podstawie jakości znalezionych informacji.

## Definicja Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) to pojawiający się paradygmat w rozwoju AI, w którym LLM nie tylko pobierają informacje z zewnętrznych źródeł danych, ale także autonomicznie planują swoje kolejne kroki. W przeciwieństwie do statycznych wzorców „wyszukaj, a potem odczytaj” lub starannie zaprogramowanych sekwencji poleceń, Agentic RAG obejmuje pętlę iteracyjnych wywołań LLM, przeplataną wywołaniami narzędzi lub funkcji oraz strukturyzowanymi wynikami. Przy każdym kroku system ocenia uzyskane rezultaty, decyduje, czy dopracować zapytania, w razie potrzeby wywołuje dodatkowe narzędzia i kontynuuje ten cykl, aż osiągnie zadowalające rozwiązanie.

Ten iteracyjny styl działania „maker-checker” został zaprojektowany, aby poprawić poprawność, radzić sobie z błędnie sformułowanymi zapytaniami do zorganizowanych baz danych (np. NL2SQL) i zapewnić zrównoważone, wysokiej jakości wyniki. Zamiast polegać wyłącznie na starannie zaprojektowanych łańcuchach promptów, system aktywnie przejmuje proces rozumowania. Może przepisać zapytania, które zawiodły, wybrać inne metody wyszukiwania i zintegrować wiele narzędzi — takich jak wyszukiwanie wektorowe w Azure AI Search, bazy danych SQL czy niestandardowe API — zanim sfinalizuje odpowiedź. To eliminuje potrzebę nadmiernie skomplikowanych ram orkiestracji. Zamiast tego stosunkowo prosta pętla „wywołanie LLM → użycie narzędzia → wywołanie LLM → …” może generować złożone i dobrze ugruntowane wyniki.

![Agentic RAG Core Loop](../../../translated_images/pl/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Przejmowanie procesu rozumowania

Cechą wyróżniającą system jako „agentyczny” jest jego zdolność do przejmowania procesu rozumowania. Tradycyjne implementacje RAG często zależą od ludzi, którzy wcześniej definiują ścieżkę dla modelu: łańcuch myślenia, który określa, co i kiedy pobrać.
Gdy jednak system jest naprawdę agentyczny, wewnętrznie decyduje, jak podejść do problemu. Nie wykonuje tylko skryptu; autonomicznie określa sekwencję kroków na podstawie jakości znalezionych informacji.
Na przykład, jeśli poprosi się go o stworzenie strategii wprowadzenia produktu na rynek, nie będzie polegać wyłącznie na poleceniu, które opisuje cały proces badawczy i podejmowania decyzji. Zamiast tego model agentyczny samodzielnie zdecyduje, by:

1. Pobierać bieżące raporty o trendach rynkowych przy użyciu Bing Web Grounding
2. Identyfikować istotne dane o konkurencji przy użyciu Azure AI Search.
3.	Korelować historyczne wewnętrzne metryki sprzedaży przy użyciu Azure SQL Database.
4.	Syntetyzować ustalenia w spójną strategię orkiestrującą za pomocą Azure OpenAI Service.
5.	Oceniać strategię pod kątem luk lub niespójności, wywołując kolejną rundę pobierania informacji w razie potrzeby.
Wszystkie te kroki — dopracowywanie zapytań, wybór źródeł, iterowanie aż do „zadowolenia” z odpowiedzi — są decydowane przez model, a nie wstępnie zaprogramowane przez człowieka.

## Iteracyjne pętle, integracja narzędzi i pamięć

![Tool Integration Architecture](../../../translated_images/pl/tool-integration.0f569710b5c17c10.webp)

System agentyczny opiera się na wzorcu interakcji w pętli:

- **Początkowe wywołanie:** Cel użytkownika (czyli: polecenie użytkownika) jest przedstawiany LLM.
- **Wywołanie narzędzia:** Jeśli model zidentyfikuje brakujące informacje lub niejednoznaczne instrukcje, wybiera narzędzie lub metodę wyszukiwania — np. zapytanie do bazy wektorowej (np. Azure AI Search Hybrid search nad prywatnymi danymi) lub zorganizowane wywołanie SQL — aby zgromadzić więcej kontekstu.
- **Ocena i dopracowanie:** Po przejrzeniu zwróconych danych model decyduje, czy informacje są wystarczające. Jeśli nie, dopracowuje zapytanie, próbuje innego narzędzia lub dostosowuje podejście.
- **Powtarzaj, aż będzie zadowolony:** Ten cykl trwa, aż model uzna, że ma wystarczającą jasność i dowody, aby dostarczyć ostateczną, dobrze uzasadnioną odpowiedź.
- **Pamięć i stan:** Ponieważ system utrzymuje stan i pamięć pomiędzy krokami, może przypominać sobie poprzednie próby i ich wyniki, unikając powtarzających się pętli i podejmując bardziej świadome decyzje w miarę postępu.

Z biegiem czasu tworzy to poczucie ewoluującego zrozumienia, umożliwiając modelowi poruszanie się po złożonych, wieloetapowych zadaniach bez konieczności stałej interwencji człowieka lub przekształcania polecenia.

## Obsługa trybów awaryjnych i samokorekta

Autonomia Agentic RAG obejmuje również solidne mechanizmy samokorekty. Gdy system napotyka ślepe uliczki — na przykład pobiera nieistotne dokumenty lub napotyka błędnie sformułowane zapytania — może:

- **Iterować i ponawiać zapytania:** Zamiast zwracać niskowartościowe odpowiedzi, model podejmuje nowe strategie wyszukiwania, przepisuje zapytania do bazy danych lub przegląda alternatywne zbiory danych.
- **Używać narzędzi diagnostycznych:** System może wywołać dodatkowe funkcje zaprojektowane, by pomóc mu debugować kroki rozumowania lub potwierdzić poprawność pobranych danych. Narzędzia takie jak Azure AI Tracing będą ważne, aby umożliwić solidną obserwowalność i monitorowanie.
- **Wycofać się do nadzoru ludzkiego:** W scenariuszach o wysokich stawkach lub przy powtarzających się niepowodzeniach model może zgłosić niepewność i poprosić o wskazówki człowieka. Gdy człowiek dostarczy korekcyjne informacje zwrotne, model może włączyć tę lekcję do dalszej pracy.

To iteracyjne i dynamiczne podejście pozwala modelowi na ciągłe doskonalenie, zapewniając, że nie jest to system jednorazowy, lecz taki, który uczy się na podstawie popełnionych błędów w trakcie danej sesji.

![Self Correction Mechanism](../../../translated_images/pl/self-correction.da87f3783b7f174b.webp)

## Granice agencji

Pomimo autonomii w obrębie zadania, Agentic RAG nie jest równoważny z Ogólną Sztuczną Inteligencją. Jego zdolności „agentyczne” są ograniczone do narzędzi, źródeł danych i polityk dostarczonych przez ludzi. Nie może wymyślać własnych narzędzi ani wychodzić poza ustalone granice domeny. Zamiast tego świetnie sprawdza się w dynamicznej orkiestracji dostępnych zasobów.
Kluczowe różnice w porównaniu z bardziej zaawansowanymi formami AI obejmują:

1. **Autonomia specyficzna dla domeny:** Systemy Agentic RAG koncentrują się na osiąganiu celów zdefiniowanych przez użytkownika w znanej domenie, stosując strategie takie jak przepisywanie zapytań czy wybór narzędzi, aby poprawić wyniki.
2. **Zależność od infrastruktury:** Możliwości systemu zależą od narzędzi i danych zintegrowanych przez programistów. Nie może przekroczyć tych granic bez interwencji człowieka.
3. **Poszanowanie ograniczeń:** Wytyczne etyczne, zasady zgodności i polityki biznesowe pozostają bardzo ważne. Wolność agenta jest zawsze ograniczona przez środki bezpieczeństwa i mechanizmy nadzoru (miejmy nadzieję).

## Praktyczne przypadki użycia i wartość

Agentic RAG wyróżnia się w scenariuszach wymagających iteracyjnego dopracowywania i precyzji:

1. **Środowiska stawiające na poprawność:** W kontrolach zgodności, analizie regulacyjnej czy badaniach prawnych model agentyczny może wielokrotnie weryfikować fakty, konsultować wiele źródeł i przepisywać zapytania, aż wygeneruje gruntownie sprawdzoną odpowiedź.
2. **Złożone interakcje z bazami danych:** W przypadku pracy z danymi strukturyzowanymi, gdzie zapytania często mogą zawodzić lub wymagać dostosowania, system może autonomicznie dopracowywać zapytania przy użyciu Azure SQL lub Microsoft Fabric OneLake, zapewniając, że ostateczne pobranie danych odpowiada intencji użytkownika.
3. **Rozbudowane przepływy pracy:** Sesje trwające dłużej mogą ewoluować w miarę pojawiania się nowych informacji. Agentic RAG może ciągle integrować nowe dane, zmieniając strategie w miarę zdobywania wiedzy o przestrzeni problemowej.

## Zarządzanie, przejrzystość i zaufanie

W miarę jak systemy te stają się bardziej autonomiczne w swoim rozumowaniu, zarządzanie i przejrzystość są kluczowe:

- **Wyjaśnialne rozumowanie:** Model może dostarczyć ścieżkę audytu zapytań, które wykonał, źródeł, które skonsultował, oraz kroków rozumowania, jakie podjął, aby dojść do wniosku. Narzędzia takie jak Azure AI Content Safety i Azure AI Tracing / GenAIOps mogą pomóc w utrzymaniu przejrzystości i łagodzeniu ryzyk.
- **Kontrola uprzedzeń i zrównoważone pobieranie:** Programiści mogą dostosowywać strategie wyszukiwania, aby uwzględniać zrównoważone i reprezentatywne źródła danych, oraz regularnie audytować wyniki pod kątem uprzedzeń lub zniekształceń, używając niestandardowych modeli dla zaawansowanych organizacji data science korzystających z Azure Machine Learning.
- **Nadzór ludzki i zgodność:** W zadaniach wrażliwych przegląd ludzki pozostaje niezbędny. Agentic RAG nie zastępuje ludzkiego osądu w decyzjach o wysokich stawkach — wspomaga go, dostarczając bardziej gruntownie sprawdzone opcje.

Posiadanie narzędzi, które dostarczają jasny zapis działań, jest niezbędne. Bez nich debugowanie procesu wieloetapowego może być bardzo trudne. Zobacz następujący przykład od Literal AI (firma stojąca za Chainlit) dla uruchomienia agenta:

![AgentRunExample](../../../translated_images/pl/AgentRunExample.471a94bc40cbdc0c.webp)

## Zakończenie

Agentic RAG reprezentuje naturalną ewolucję w sposobie, w jaki systemy AI radzą sobie ze złożonymi, intensywnymi danych zadaniami. Dzięki przyjęciu wzorca interakcji w pętli, autonomicznemu wybieraniu narzędzi i dopracowywaniu zapytań aż do osiągnięcia wysokiej jakości wyniku, system wykracza poza statyczne wykonywanie poleceń w kierunku bardziej adaptacyjnego, świadomego kontekstu decydenta. Choć nadal ograniczony przez infrastrukturę zdefiniowaną przez ludzi i wytyczne etyczne, te agentyczne możliwości umożliwiają bogatsze, bardziej dynamiczne i ostatecznie bardziej użyteczne interakcje AI zarówno dla przedsiębiorstw, jak i użytkowników końcowych.

### Masz więcej pytań o Agentic RAG?

Dołącz do [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), aby spotkać innych uczących się, uczestniczyć w godzinach konsultacji i uzyskać odpowiedzi na swoje pytania dotyczące AI Agents.

## Dodatkowe zasoby
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Zaimplementuj Retrieval Augmented Generation (RAG) za pomocą Azure OpenAI Service: Dowiedz się, jak korzystać z własnych danych z Azure OpenAI Service. Ten moduł Microsoft Learn zapewnia kompleksowy przewodnik po implementacji RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Ocena aplikacji generatywnej AI za pomocą Microsoft Foundry: Ten artykuł obejmuje ocenę i porównanie modeli na publicznie dostępnych zbiorach danych, w tym aplikacji Agentic AI i architektur RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Czym jest Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Kompletny przewodnik po Retrieval Augmented Generation opartym na agentach – News from generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: przyspiesz swój RAG dzięki przekształcaniu zapytań i self-query! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Dodawanie warstw agentowych do RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Przyszłość asystentów wiedzy: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Jak zbudować systemy Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Wykorzystanie Microsoft Foundry Agent Service do skalowania agentów AI</a>

### Academic Papers

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iteracyjne udoskonalanie z samodzielną informacją zwrotną</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Agenci językowi z werbalnym uczeniem ze wzmocnieniem</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Duże modele językowe mogą się samokorygować za pomocą interaktywnej krytyki z użyciem narzędzi</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Przegląd Agentic RAG</a>

## Previous Lesson

[Wzorzec projektowy użycia narzędzi](../04-tool-use/README.md)

## Next Lesson

[Budowanie godnych zaufania agentów AI](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Zastrzeżenie:
Ten dokument został przetłumaczony przy użyciu usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Chociaż dokładamy starań, aby zapewnić dokładność, proszę pamiętać, że tłumaczenia automatyczne mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym należy uznać za źródło wiążące. W przypadku informacji o istotnym znaczeniu zaleca się skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->