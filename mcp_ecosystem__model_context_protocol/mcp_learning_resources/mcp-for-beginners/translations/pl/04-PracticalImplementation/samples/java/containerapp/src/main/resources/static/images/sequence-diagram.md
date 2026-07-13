```mermaid
sequenceDiagram
    actor User
    participant WebApp as Aplikacja Webowa<br/>(ContentSafetyController)
    participant SafetyService as Usługa Bezpieczeństwa Treści
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as Klient MCP
    participant McpServer as Serwer Kalkulatora MCP<br/>(Port 8080)
    participant CalcService as Usługa Kalkulatora

    %% Interakcja z użytkownikiem
    User->>WebApp: Wprowadź polecenie obliczenia
    WebApp->>WebApp: Utwórz PromptRequest

    %% Sprawdzenie bezpieczeństwa treści
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: WynikAnalizyTekstu
    SafetyService->>SafetyService: Sprawdź, czy treść jest bezpieczna<br/>(ciężkość < 2 dla wszystkich kategorii)

    %% Przepływ przetwarzania - Bezpieczna treść
    alt Treść jest bezpieczna
        SafetyService->>LangChain: Przekaż polecenie do Bot.chat()
        LangChain->>McpClient: Przetwórz polecenie
        McpClient->>McpServer: Wywołaj odpowiednie narzędzie kalkulatora przez SSE
        McpServer->>CalcService: Wykonaj obliczenie<br/>(dodaj, odejmij, pomnóż, itd.)
        CalcService-->>McpServer: Wynik obliczenia
        McpServer-->>McpClient: Wynik wykonania narzędzia
        McpClient-->>LangChain: Wynik narzędzia
        LangChain-->>SafetyService: Odpowiedź bota
        SafetyService-->>WebApp: Zwróć mapę wyników<br/>{isSafe: "true", botResponse: wynik, safetyResult: szczegóły}
        WebApp-->>User: Wyświetl wynik obliczenia i informacje o bezpieczeństwie
    else Treść nie jest bezpieczna
        SafetyService-->>WebApp: Zwróć mapę wyników<br/>{isSafe: "false", safetyResult: szczegóły}
        WebApp-->>User: Wyświetl ostrzeżenie o bezpieczeństwie<br/>(bez obliczenia)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->