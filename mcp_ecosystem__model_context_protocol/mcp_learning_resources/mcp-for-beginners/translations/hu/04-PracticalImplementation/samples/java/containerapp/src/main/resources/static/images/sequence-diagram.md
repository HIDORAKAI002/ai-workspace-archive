```mermaid
sequenceDiagram
    actor User
    participant WebApp as Webalkalmazás<br/>(ContentSafetyController)
    participant SafetyService as Tartalombiztonsági szolgáltatás
    participant AzureAPI as Azure Tartalom Biztonsági API
    participant LangChain as LangChain4j
    participant McpClient as MCP kliens
    participant McpServer as MCP kalkulátor szerver<br/>(Port 8080)
    participant CalcService as Kalkulátor szolgáltatás

    %% Felhasználói interakció
    User->>WebApp: Számítási prompt bevitele
    WebApp->>WebApp: PromptRequest létrehozása

    %% Tartalombiztonsági ellenőrzés
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Ellenőrizze, hogy a tartalom biztonságos-e<br/>(minden kategóriában súlyosság < 2)

    %% Feldolgozási folyamat - biztonságos tartalom
    alt A tartalom biztonságos
        SafetyService->>LangChain: Prompt átadása a Bot.chat()-nek
        LangChain->>McpClient: Prompt feldolgozása
        McpClient->>McpServer: Megfelelő kalkulátor eszköz hívása SSE-n keresztül
        McpServer->>CalcService: Számítás végrehajtása<br/>(összeadás, kivonás, szorzás, stb.)
        CalcService-->>McpServer: Számítás eredménye
        McpServer-->>McpClient: Eszköz végrehajtási eredmény
        McpClient-->>LangChain: Eszköz eredmény
        LangChain-->>SafetyService: Bot válasza
        SafetyService-->>WebApp: Eredménytérkép visszaadása<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Számítási eredmény és biztonsági információ megjelenítése
    else A tartalom nem biztonságos
        SafetyService-->>WebApp: Eredménytérkép visszaadása<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Biztonsági figyelmeztetés megjelenítése<br/>(számítás nélkül)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->