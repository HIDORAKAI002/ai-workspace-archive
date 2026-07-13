```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web aplikacija<br/>(ContentSafetyController)
    participant SafetyService as Usluga sigurnosti sadržaja
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP klijent
    participant McpServer as MCP poslužitelj za izračun<br/>(Port 8080)
    participant CalcService as Usluga kalkulatora

    %% Interakcija korisnika
    User->>WebApp: Unesite upit za izračun
    WebApp->>WebApp: Kreiraj PromptRequest

    %% Provjera sigurnosti sadržaja
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: RezultatAnalizeTeksta
    SafetyService->>SafetyService: Provjeri je li sadržaj siguran<br/>(ozbiljnost < 2 za sve kategorije)

    %% Procesni tok - Siguran sadržaj
    alt Sadržaj je siguran
        SafetyService->>LangChain: Proslijedi upit Bot.chat()
        LangChain->>McpClient: Obradi upit
        McpClient->>McpServer: Pozovi odgovarajući alat kalkulatora putem SSE
        McpServer->>CalcService: Izvrši izračun<br/>(zbrajanje, oduzimanje, množenje itd.)
        CalcService-->>McpServer: Rezultat izračuna
        McpServer-->>McpClient: Rezultat izvršenja alata
        McpClient-->>LangChain: Rezultat alata
        LangChain-->>SafetyService: Odgovor bota
        SafetyService-->>WebApp: Vrati mapu rezultata<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Prikaži rezultat izračuna i informacije o sigurnosti
    else Sadržaj nije siguran
        SafetyService-->>WebApp: Vrati mapu rezultata<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Prikaži upozorenje o sigurnosti<br/>(bez izračuna)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->