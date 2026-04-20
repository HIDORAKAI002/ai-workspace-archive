# Budowanie Agentów do Użytkowania Komputera (CUA)

Agenci do użytkowania komputera mogą wchodzić w interakcje ze stronami internetowymi tak, jak robiłaby to osoba: otwierając przeglądarkę, analizując stronę i podejmując kolejną najlepszą akcję na podstawie tego, co widzą. W tej lekcji zbudujesz agenta automatyzującego przeglądarkę, który wyszukuje na Airbnb, wyodrębnia strukturalne dane ofert i identyfikuje najtańszy pobyt w Sztokholmie.

Lekcja łączy Browser-Use do nawigacji sterowanej przez AI, Playwright i Chrome DevTools Protocol (CDP) do kontroli przeglądarki, Azure OpenAI do rozumowania wspieranego wzrokiem oraz Pydantic do strukturalnego wyodrębniania.

## Wprowadzenie

Ta lekcja obejmie:

- Zrozumienie, kiedy agenci do użytkowania komputera są lepszym rozwiązaniem niż automatyzacja wyłącznie przez API
- Łączenie Browser-Use z Playwright i CDP dla niezawodnego zarządzania cyklem życia przeglądarki
- Używanie Azure OpenAI vision oraz strukturalnego wyjścia Pydantic do wyodrębniania danych ofert z dynamicznych stron internetowych
- Decydowanie, kiedy stosować rozwiązanie agent-first, actor-first lub hybrydowy przepływ automatyzacji przeglądarki

## Cele Nauki

Po ukończeniu tej lekcji będziesz umiał:

- Skonfigurować Browser-Use z Azure OpenAI i Playwright
- Zbudować przepływ automatyzacji przeglądarki, który nawiguję po rzeczywistej stronie i obsługuje dynamiczne elementy UI
- Wyodrębniać typowane wyniki z widocznej zawartości strony i przekształcać je w dalszą logikę biznesową
- Wybrać między wzorcami agenta i aktora na podstawie przewidywalności zadania przeglądarki

## Przykład Kodów

Ta lekcja zawiera jeden samouczek w notebooku:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Uruchamia sesję Chrome przez CDP, wyszukuje na Airbnb oferty ze Sztokholmu, wyodrębnia ceny za pomocą Browser-Use vision i zwraca najtańszą opcję jako dane strukturalne.

## Wymagania Wstępne

- Python 3.12+
- Skonfigurowane wdrożenie Azure OpenAI w Twoim środowisku
- Zainstalowany lokalnie Chrome lub Chromium
- Zainstalowane zależności Playwright
- Podstawowa znajomość async w Pythonie

## Konfiguracja

Zainstaluj pakiety używane w notebooku:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Ustaw zmienne środowiskowe Azure OpenAI używane przez notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opcjonalne: domyślnie używa najnowszej wersji API, jeśli pominięte
AZURE_OPENAI_API_VERSION=...
```

## Przegląd Architektury

Notebook demonstruje hybrydowy przepływ automatyzacji przeglądarki:

1. Chrome uruchamia się z włączonym CDP, aby zarówno Playwright, jak i Browser-Use mogły współdzielić tę samą sesję przeglądarki.
2. Agent Browser-Use zajmuje się otwartymi zadaniami nawigacyjnymi, takimi jak otwieranie Airbnb, zamykanie wyskakujących okienek i wyszukiwanie Sztokholmu.
3. Aktywna strona jest analizowana ze strukturalnym schematem Pydantic w celu wyodrębnienia tytułów ofert, cen za noc, ocen i adresów URL.
4. Logika Pythona porównuje wyodrębnione oferty i podświetla najtańszy wynik.

Takie podejście zachowuje elastyczne rozumowanie oparte na wizji, z którego słynie Browser-Use, przy jednoczesnym zapewnieniu deterministycznej kontroli przeglądarki wtedy, gdy jest to potrzebne.

## Kluczowe Wnioski i Najlepsze Praktyki

### Kiedy używać Agenta a kiedy Aktora

| Scenariusz         | Użyj Agenta                | Użyj Aktora                        |
|--------------------|----------------------------|----------------------------------|
| Dynamiczne układy  | Tak, AI potrafi dostosować się do zmian strony | Nie, łamliwe selektory mogą zawodzić |
| Znana struktura     | Nie, agent jest wolniejszy niż bezpośrednia kontrola | Tak, szybki i precyzyjny           |
| Znajdowanie elementów | Tak, naturalny język działa dobrze             | Nie, wymagane są dokładne selektory |
| Kontrola czasu      | Nie, mniej przewidywalne                        | Tak, pełna kontrola nad oczekiwaniami i powtórkami |
| Złożone przepływy   | Tak, radzi sobie z nieoczekiwanymi stanami UI  | Nie, wymaga jawnego rozgałęziania |

### Najlepsze praktyki Browser-Use

1. Zacznij od agenta do eksploracji i dynamicznej nawigacji.
2. Przejdź do bezpośredniej kontroli strony, gdy interakcja stanie się przewidywalna.
3. Używaj modeli struktur danych, aby wyodrębnione dane były walidowane i typowane.
4. Dodawaj opóźnienia strategicznie po akcjach wywołujących widoczne zmiany UI.
5. Rób zrzuty ekranu podczas iteracji, aby łatwiej diagnozować błędy.
6. Spodziewaj się zmian stron i projektuj strategie zapasowe dla wyskakujących okienek i przesunięć układu.
7. Łącz wzorce agenta i aktora, aby uzyskać zarówno elastyczność, jak i precyzję.

### Zastosowania w rzeczywistym świecie

- Rezerwacje podróży i monitorowanie cen
- Porównywanie cen i dostępności w e-commerce
- Strukturalne wyodrębnianie danych z dynamicznych stron
- Testowanie UI z uwzględnieniem wizji i weryfikacja
- Monitorowanie stron internetowych i alerty
- Inteligentne wypełnianie formularzy w wieloetapowych procesach

## Dodatkowe zasoby

- [Szablon integracji Browser-Use z Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parametry aktora i wyodrębnianie treści w Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Konfiguracja kursu](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Ten dokument został przetłumaczony przy użyciu usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Chociaż dążymy do dokładności, prosimy pamiętać, że tłumaczenia automatyczne mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym powinien być uznawany za wiarygodne źródło. W przypadku informacji krytycznych zaleca się skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->