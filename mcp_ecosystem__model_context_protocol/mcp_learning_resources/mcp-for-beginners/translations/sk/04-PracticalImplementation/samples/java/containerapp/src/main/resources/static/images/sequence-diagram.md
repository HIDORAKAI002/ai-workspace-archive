```mermaid
sequenceDiagram
    actor User
    participant WebApp as Webová aplikácia<br/>(ContentSafetyController)
    participant SafetyService as Služba bezpečnosti obsahu
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP klient
    participant McpServer as MCP kalkulačný server<br/>(Port 8080)
    participant CalcService as Služba kalkulačky

    %% Interakcia s používateľom
    User->>WebApp: Zadajte výzvu na výpočet
    WebApp->>WebApp: Vytvoriť PromptRequest

    %% Kontrola bezpečnosti obsahu
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: Výsledok analýzy textu
    SafetyService->>SafetyService: Skontrolujte, či je obsah bezpečný<br/>(závažnosť < 2 pre všetky kategórie)

    %% Priebeh spracovania - bezpečný obsah
    alt Obsah je bezpečný
        SafetyService->>LangChain: Predaj výzvy do Bot.chat()
        LangChain->>McpClient: Spracovať výzvu
        McpClient->>McpServer: Zavolať príslušný kalkulačný nástroj cez SSE
        McpServer->>CalcService: Vykonať výpočet<br/>(sčítanie, odčítanie, násobenie, atď.)
        CalcService-->>McpServer: Výsledok výpočtu
        McpServer-->>McpClient: Výsledok vykonania nástroja
        McpClient-->>LangChain: Výsledok nástroja
        LangChain-->>SafetyService: Odpoveď bota
        SafetyService-->>WebApp: Vrátiť mapu výsledkov<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Zobraziť výsledok výpočtu a informácie o bezpečnosti
    else Obsah je nebezpečný
        SafetyService-->>WebApp: Vrátiť mapu výsledkov<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Zobraziť varovanie o bezpečnosti<br/>(bez výpočtu)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->