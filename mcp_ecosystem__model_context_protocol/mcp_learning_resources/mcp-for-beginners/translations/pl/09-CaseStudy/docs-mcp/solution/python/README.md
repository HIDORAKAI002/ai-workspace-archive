# Generator planu nauki z Chainlit i Microsoft Learn Docs MCP

## Wymagania wstępne

- Python 3.8 lub nowszy
- pip (menedżer pakietów Pythona)
- Dostęp do Internetu, aby połączyć się z serwerem Microsoft Learn Docs MCP

## Instalacja

1. Sklonuj to repozytorium lub pobierz pliki projektu.
2. Zainstaluj wymagane zależności:

   ```bash
   pip install -r requirements.txt
   ```

## Użycie

### Scenariusz 1: Proste zapytanie do Docs MCP
Klient wiersza poleceń łączący się z serwerem Docs MCP, wysyłający zapytanie i drukujący wynik.

1. Uruchom skrypt:
   ```bash
   python scenario1.py
   ```
2. Wprowadź pytanie dotyczące dokumentacji w wierszu poleceń.

### Scenariusz 2: Generator planu nauki (aplikacja internetowa Chainlit)
Interfejs internetowy (z użyciem Chainlit), który pozwala użytkownikom wygenerować spersonalizowany, tygodniowy plan nauki dla dowolnego tematu technicznego.

1. Uruchom aplikację Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Otwórz lokalny adres URL podany w terminalu (np. http://localhost:8000) w swojej przeglądarce.
3. W oknie czatu wpisz temat nauki oraz liczbę tygodni, przez które chcesz się uczyć (np. "Certyfikacja AI-900, 8 tygodni").
4. Aplikacja odpowie tygodniowym planem nauki, włącznie z linkami do odpowiedniej dokumentacji Microsoft Learn.

**Wymagane zmienne środowiskowe:**

Aby korzystać ze Scenariusza 2 (aplikacja internetowa Chainlit z Azure OpenAI), musisz ustawić następujące zmienne środowiskowe w pliku `.env` w katalogu `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Wypełnij te wartości szczegółami swojego zasobu Azure OpenAI przed uruchomieniem aplikacji.

> [!TIP]
> Możesz łatwo wdrożyć własne modele korzystając z [Microsoft Foundry](https://ai.azure.com/).

### Scenariusz 3: Dokumentacja w edytorze z serwerem MCP w VS Code

Zamiast przełączać się między zakładkami przeglądarki, aby przeszukać dokumentację, możesz wprowadzić Microsoft Learn Docs bezpośrednio do VS Code za pomocą serwera MCP. To umożliwia:
- Wyszukiwanie i czytanie dokumentacji bezpośrednio w VS Code, bez opuszczania środowiska kodowania.
- Odwoływanie się do dokumentów i wstawianie linków bezpośrednio do plików README lub kursów.
- Korzystanie jednocześnie z GitHub Copilot i MCP, co zapewnia płynny, zasilany AI workflow dokumentacji.

**Przykładowe zastosowania:**
- Szybkie dodawanie linków referencyjnych do README podczas pisania dokumentacji kursu lub projektu.
- Korzystanie z Copilota do generowania kodu i MCP do natychmiastowego odnajdowania oraz cytowania odpowiednich dokumentów.
- Pozostanie skupionym w edytorze i zwiększenie produktywności.

> [!IMPORTANT]
> Upewnij się, że masz ważną konfigurację [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) w swoim workspace (lokalizacja to `.vscode/mcp.json`).

## Dlaczego Chainlit dla Scenariusza 2?

Chainlit to nowoczesny, otwartoźródłowy framework do tworzenia konwersacyjnych aplikacji internetowych. Umożliwia łatwe tworzenie interfejsów czatu łączących się z usługami backendowymi, takimi jak serwer Microsoft Learn Docs MCP. Ten projekt wykorzystuje Chainlit, aby zapewnić prosty, interaktywny sposób generowania spersonalizowanych planów nauki w czasie rzeczywistym. Dzięki Chainlit możesz szybko budować i wdrażać narzędzia oparte na czacie, które zwiększają produktywność i proces nauki.

## Co to robi

Ta aplikacja pozwala użytkownikom tworzyć spersonalizowany plan nauki, po prostu wpisując temat i czas trwania. Aplikacja analizuje Twoje dane wejściowe, zapytuje serwer Microsoft Learn Docs MCP o odpowiednie materiały i organizuje wyniki w ustrukturyzowany, tygodniowy plan. Rekomendacje na każdy tydzień są wyświetlane na czacie, co ułatwia śledzenie i realizację postępów. Integracja zapewnia, że zawsze otrzymujesz najnowsze i najbardziej relewantne źródła nauki.

## Przykładowe zapytania

Wypróbuj te zapytania w oknie czatu, aby zobaczyć, jak reaguje aplikacja:

- `Certyfikacja AI-900, 8 tygodni`
- `Nauka Azure Functions, 4 tygodnie`
- `Azure DevOps, 6 tygodni`
- `Inżynieria danych na Azure, 10 tygodni`
- `Podstawy bezpieczeństwa Microsoft, 5 tygodni`
- `Power Platform, 7 tygodni`
- `Azure AI services, 12 tygodni`
- `Architektura chmury, 9 tygodni`

Te przykłady pokazują elastyczność aplikacji dla różnych celów nauki i ram czasowych.

## Źródła

- [Chainlit Documentation](https://docs.chainlit.io/)
- [MCP Documentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->