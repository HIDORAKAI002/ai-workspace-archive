```mermaid
sequenceDiagram
    actor User
    participant WebApp as Aplicație Web<br/>(ContentSafetyController)
    participant SafetyService as Serviciu de Siguranță a Conținutului
    participant AzureAPI as API-ul Azure Content Safety
    participant LangChain as LangChain4j
    participant McpClient as Client MCP
    participant McpServer as Server Calculator MCP<br/>(Port 8080)
    participant CalcService as Serviciul Calculator

    %% Interacțiunea Utilizatorului
    User->>WebApp: Introdu promptul de calcul
    WebApp->>WebApp: Creează PromptRequest

    %% Verificare Siguranță a Conținutului
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: Rezultat Analiză Text
    SafetyService->>SafetyService: Verifică dacă conținutul este sigur<br/>(severitate < 2 pentru toate categoriile)

    %% Flux de Procesare - Conținut Sigur
    alt Conținutul este sigur
        SafetyService->>LangChain: Trimite promptul către Bot.chat()
        LangChain->>McpClient: Procesează promptul
        McpClient->>McpServer: Apelează instrumentul de calcul adecvat prin SSE
        McpServer->>CalcService: Execută calculul<br/>(adunare, scădere, înmulțire etc.)
        CalcService-->>McpServer: Rezultat calcul
        McpServer-->>McpClient: Rezultat execuție instrument
        McpClient-->>LangChain: Rezultat instrument
        LangChain-->>SafetyService: Răspuns Bot
        SafetyService-->>WebApp: Returnează harta rezultatelor<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Afișează rezultatul calculului și informații de siguranță
    else Conținut nesigur
        SafetyService-->>WebApp: Returnează harta rezultatelor<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Afișează avertisment de siguranță<br/>(fără calcul)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->