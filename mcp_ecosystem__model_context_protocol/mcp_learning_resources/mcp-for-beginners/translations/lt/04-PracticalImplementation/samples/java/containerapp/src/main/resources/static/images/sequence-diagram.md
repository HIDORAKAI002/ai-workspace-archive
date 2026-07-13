```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web programa<br/>(ContentSafetyController)
    participant SafetyService as Turinys saugos paslauga
    participant AzureAPI as Azure turinio saugos API
    participant LangChain as LangChain4j
    participant McpClient as MCP klientas
    participant McpServer as MCP skaičiuoklės serveris<br/>(Prievadas 8080)
    participant CalcService as Skaičiuoklės paslauga

    %% Vartotojo sąveika
    User->>WebApp: Įveskite skaičiavimo užklausą
    WebApp->>WebApp: Kurti PromptRequest

    %% Turinys saugos patikrinimas
    WebApp->>SafetyService: apdorotiUžklausą(prompt)
    SafetyService->>AzureAPI: analizuotiTekstą(prompt)
    AzureAPI-->>SafetyService: AnalizuotiTekstoRezultatas
    SafetyService->>SafetyService: Patikrinti, ar turinys saugus<br/>(rimtumas < 2 visoms kategorijoms)

    %% Apdorojimo eiga - saugus turinys
    alt Turinys yra saugus
        SafetyService->>LangChain: Perduoti užklausą Bot.chat()
        LangChain->>McpClient: Apdoroti užklausą
        McpClient->>McpServer: Kvieskite tinkamą skaičiuoklės įrankį per SSE
        McpServer->>CalcService: Vykdyti skaičiavimą<br/>(sudėti, atimti, dauginti ir kt.)
        CalcService-->>McpServer: Skaičiavimo rezultatas
        McpServer-->>McpClient: Įrankio vykdymo rezultatas
        McpClient-->>LangChain: Įrankio rezultatas
        LangChain-->>SafetyService: Boto atsakymas
        SafetyService-->>WebApp: Grąžinti rezultatų žemėlapį<br/>{isSafe: "true", botResponse: rezultatas, safetyResult: detalės}
        WebApp-->>User: Rodyti skaičiavimo rezultatą ir saugos informaciją
    else Turinys nėra saugus
        SafetyService-->>WebApp: Grąžinti rezultatų žemėlapį<br/>{isSafe: "false", safetyResult: detalės}
        WebApp-->>User: Rodyti saugos įspėjimą<br/>(be skaičiavimo)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->