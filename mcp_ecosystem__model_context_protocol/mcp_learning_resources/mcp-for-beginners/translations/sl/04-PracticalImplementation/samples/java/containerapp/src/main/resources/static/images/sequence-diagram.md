```mermaid
sequenceDiagram
    actor User
    participant WebApp as Spletna aplikacija<br/>(ContentSafetyController)
    participant SafetyService as Storitev varnosti vsebine
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP odjemalec
    participant McpServer as MCP strežnik kalkulatorja<br/>(Vrata 8080)
    participant CalcService as Storitev kalkulatorja

    %% Interakcija z uporabnikom
    User->>WebApp: Vnesite poziv za izračun
    WebApp->>WebApp: Ustvari PromptRequest

    %% Preverjanje varnosti vsebine
    WebApp->>SafetyService: processPrompt(poziv)
    SafetyService->>AzureAPI: analyzeText(poziv)
    AzureAPI-->>SafetyService: Rezultat analize besedila
    SafetyService->>SafetyService: Preveri, ali je vsebina varna<br/>(resnost < 2 za vse kategorije)

    %% Potek obdelave - varna vsebina
    alt Vsebina je varna
        SafetyService->>LangChain: Posreduj poziv v Bot.chat()
        LangChain->>McpClient: Obdelaj poziv
        McpClient->>McpServer: Pokliči ustrezno orodje kalkulatorja preko SSE
        McpServer->>CalcService: Izvedi izračun<br/>(seštevanje, odštevanje, množenje itd.)
        CalcService-->>McpServer: Rezultat izračuna
        McpServer-->>McpClient: Rezultat izvajanja orodja
        McpClient-->>LangChain: Rezultat orodja
        LangChain-->>SafetyService: Odgovor bota
        SafetyService-->>WebApp: Vrni zemljevid rezultatov<br/>{isSafe: "true", botResponse: rezultat, safetyResult: podrobnosti}
        WebApp-->>User: Prikaži rezultat izračuna in varnostne informacije
    else Vsebina ni varna
        SafetyService-->>WebApp: Vrni zemljevid rezultatov<br/>{isSafe: "false", safetyResult: podrobnosti}
        WebApp-->>User: Prikaži varnostno opozorilo<br/>(brez izračuna)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->