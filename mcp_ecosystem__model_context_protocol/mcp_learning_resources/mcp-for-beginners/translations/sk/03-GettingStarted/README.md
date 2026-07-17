## Začíname  

[![Vytvorte svoj prvý MCP server](../../../translated_images/sk/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_

Táto sekcia sa skladá z niekoľkých lekcií:

- **1 Váš prvý server**, v tejto prvej lekcii sa naučíte, ako vytvoriť svoj prvý server a skontrolovať ho pomocou nástroja inspector, ktorý je cenným spôsobom testovania a ladenia vášho servera, [na lekciu](01-first-server/README.md)

- **2 Klient**, v tejto lekcii sa naučíte, ako napísať klienta, ktorý sa môže pripojiť k vášmu serveru, [na lekciu](02-client/README.md)

- **3 Klient s LLM**, ešte lepší spôsob písania klienta je pridať mu LLM, aby mohol „rokovať“ s vaším serverom o tom, čo robiť, [na lekciu](03-llm-client/README.md)

- **4 Spotrebovávanie serverového režimu GitHub Copilot Agent vo Visual Studio Code**. Tu sa pozrieme na spustenie nášho MCP servera priamo vo Visual Studio Code, [na lekciu](04-vscode/README.md)

- **5 stdio Transport Server** stdio transport je odporúčaným štandardom pre lokálnu komunikáciu MCP server - klient, poskytujúci bezpečnú komunikáciu založenú na podprocese s vnútornou izoláciou procesu [na lekciu](05-stdio-server/README.md)

- **6 HTTP Streaming s MCP (Streamable HTTP)**. Naučte sa o modernom HTTP streamingu (odporúčaný prístup pre vzdialené MCP servery podľa [MCP Špecifikácie 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), o notifikáciách postupu a o tom, ako implementovať škálovateľné, realtime MCP servery a klientov pomocou Streamable HTTP. [na lekciu](06-http-streaming/README.md)

- **7 Využívanie AI Toolkit pre VSCode** na používanie a testovanie vašich MCP klientov a serverov [na lekciu](07-aitk/README.md)

- **8 Testovanie**. Tu sa budeme hlavne zameriavať na to, ako môžeme testovať náš server a klienta rôznymi spôsobmi, [na lekciu](08-testing/README.md)

- **9 Nasadenie**. Táto kapitola sa pozrie na rôzne spôsoby nasadenia vašich MCP riešení, [na lekciu](09-deployment/README.md)

- **10 Pokročilé použitie servera**. Táto kapitola pokrýva pokročilé používanie servera, [na lekciu](./10-advanced/README.md)

- **11 Autentifikácia**. Táto kapitola pokrýva, ako pridať jednoduchú autentifikáciu, od Basic Auth po používanie JWT a RBAC. Odporúčame začať tu a potom sa pozrieť na pokročilé témy v kapitole 5 a vykonať dodatočné zabezpečenie podľa odporúčaní v kapitole 2, [na lekciu](./11-simple-auth/README.md)

- **12 MCP Hosts**. Konfigurujte a používajte populárnych MCP host klientov vrátane Claude Desktop, Cursor, Cline a Windsurf. Naučte sa typy transportov a riešenie problémov, [na lekciu](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. Interaktívne ladte a testujte vaše MCP servery pomocou nástroja MCP Inspector. Naučte sa riešiť problémy s nástrojmi, zdrojmi a protokolovými správami, [na lekciu](./13-mcp-inspector/README.md)

- **14 Sampling**. Vytvárajte MCP servery, ktoré spolupracujú s MCP klientmi na úlohách súvisiacich s LLM (zastaralé v `2026-07-28` vydaní kandidáta; stále platné pre `2025-11-25`). [na lekciu](./14-sampling/README.md)

- **15 MCP Apps**. Vytvárajte MCP servery, ktoré tiež odpovedajú s pokynmi k UI, [na lekciu](./15-mcp-apps/README.md)

Model Context Protocol (MCP) je otvorený protokol, ktorý štandardizuje spôsob, akým aplikácie poskytujú kontext LLM. Predstavte si MCP ako USB-C port pre AI aplikácie – poskytuje štandardizovaný spôsob pripojenia AI modelov k rôznym zdrojom dát a nástrojom.

## Ciele učenia

Na konci tejto lekcie budete schopní:

- Nastaviť vývojové prostredia pre MCP v C#, Java, Python, TypeScript a JavaScript
- Vytvárať a nasadzovať základné MCP servery s vlastnými funkciami (zdroje, prompti a nástroje)
- Vytvárať hostiteľské aplikácie, ktoré sa pripájajú ku MCP serverom
- Testovať a ladiť MCP implementácie
- Pochopiť bežné problémy s nastavovaním a ich riešenia
- Pripojiť vaše MCP implementácie k populárnym LLM službám

## Nastavenie vášho MCP prostredia

Pred začatím práce s MCP je dôležité pripraviť si vývojové prostredie a pochopiť základný pracovný postup. Táto sekcia vás prevedie úvodnými krokmi nastavenia, aby ste mali hladký štart s MCP.

### Predpoklady

Pred ponorením sa do vývoja MCP sa uistite, že máte:

- **Vývojové prostredie**: pre váš vybraný jazyk (C#, Java, Python, TypeScript alebo JavaScript)
- **IDE/Editory**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm alebo akýkoľvek moderný kódový editor
- **Správcovia balíkov**: NuGet, Maven/Gradle, pip alebo npm/yarn
- **API kľúče**: pre akékoľvek AI služby, ktoré plánujete používať vo vašich hostiteľských aplikáciách


### Oficiálne SDK

V nasledujúcich kapitolách uvidíte riešenia postavené pomocou Python, TypeScript, Java a .NET. Tu sú všetky oficiálne podporované SDK.

MCP poskytuje oficiálne SDK pre viaceré jazyky (v súlade s [MCP Špecifikáciou 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Udržiavaný v spolupráci s Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Udržiavaný v spolupráci so Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Oficiálna implementácia pre TypeScript
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Oficiálna implementácia pre Python (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Oficiálna implementácia pre Kotlin
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Udržiavaný v spolupráci s Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Oficiálna implementácia pre Rust
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Oficiálna implementácia pre Go

## Kľúčové zhrnutie

- Nastavenie MCP vývojového prostredia je jednoduché s jazykovo špecifickými SDK
- Vytváranie MCP serverov zahŕňa tvorbu a registráciu nástrojov s jasnými schémami
- MCP klienti sa pripájajú k serverom a modelom, aby využili rozšírené možnosti
- Testovanie a ladenie sú nevyhnutné pre spoľahlivé MCP implementácie
- Možnosti nasadenia siahajú od lokálneho vývoja až po riešenia v cloude

## Prax

Máme sadu vzorov, ktoré dopĺňajú cvičenia, ktoré uvidíte v každej kapitole v tejto sekcii. Každá kapitola má navyše svoje vlastné cvičenia a úlohy.

- [Java Kalkulačka](./samples/java/calculator/README.md)
- [.Net Kalkulačka](../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulačka](./samples/javascript/README.md)
- [TypeScript Kalkulačka](./samples/typescript/README.md)
- [Python Kalkulačka](../../../03-GettingStarted/samples/python)

## Ďalšie zdroje

- [Vytváranie agentov pomocou Model Context Protocol na Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Vzdialené MCP s Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Čo ďalej

Začnite prvou lekciou: [Vytvorenie vášho prvého MCP servera](01-first-server/README.md)

Akonáhle dokončíte tento modul, pokračujte na: [Modul 4: Praktická implementácia](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->