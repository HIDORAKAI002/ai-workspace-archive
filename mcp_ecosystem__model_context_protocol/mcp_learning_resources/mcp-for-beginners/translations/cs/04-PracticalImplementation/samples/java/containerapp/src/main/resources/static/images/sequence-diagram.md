```mermaid
sequenceDiagram
    actor User
    participant WebApp as Webová aplikace<br/>(ContentSafetyController)
    participant SafetyService as Služba pro bezpečnost obsahu
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP klient
    participant McpServer as MCP server pro výpočty<br/>(Port 8080)
    participant CalcService as Služba kalkulačky

    %% Uživatelská interakce
    User->>WebApp: Zadejte výpočetní dotaz
    WebApp->>WebApp: Vytvořit PromptRequest

    %% Kontrola bezpečnosti obsahu
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: Výsledek analýzy textu
    SafetyService->>SafetyService: Zkontrolujte, zda je obsah bezpečný<br/>(závažnost < 2 pro všechny kategorie)

    %% Průběh zpracování - Bezpečný obsah
    alt Obsah je bezpečný
        SafetyService->>LangChain: Předat dotaz do Bot.chat()
        LangChain->>McpClient: Zpracovat dotaz
        McpClient->>McpServer: Zavolat vhodný kalkulační nástroj přes SSE
        McpServer->>CalcService: Proveďte výpočet<br/>(sčítání, odčítání, násobení, atd.)
        CalcService-->>McpServer: Výsledek výpočtu
        McpServer-->>McpClient: Výsledek provedení nástroje
        McpClient-->>LangChain: Výsledek nástroje
        LangChain-->>SafetyService: Odpověď bota
        SafetyService-->>WebApp: Vrátit mapu výsledků<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Zobrazit výsledek výpočtu a informace o bezpečnosti
    else Obsah je nebezpečný
        SafetyService-->>WebApp: Vrátit mapu výsledků<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Zobrazit varování o bezpečnosti<br/>(bez výpočtu)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->