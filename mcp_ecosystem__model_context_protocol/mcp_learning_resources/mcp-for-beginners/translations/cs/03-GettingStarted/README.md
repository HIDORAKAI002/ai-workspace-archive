## Začínáme  

[![Vytvořte svůj první MCP server](../../../translated_images/cs/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Klikněte na obrázek výše pro shlédnutí videa k této lekci)_

Tato sekce obsahuje několik lekcí:

- **1 Váš první server**, v této první lekci se naučíte, jak vytvořit svůj první server a prozkoumat ho pomocí nástroje inspector, což je cenný způsob, jak testovat a debugovat svůj server, [k lekci](01-first-server/README.md)

- **2 Klient**, v této lekci se naučíte, jak napsat klienta, který se může připojit k vašemu serveru, [k lekci](02-client/README.md)

- **3 Klient s LLM**, ještě lepší způsob, jak napsat klienta, je přidat mu LLM, aby mohl „vyjednávat“ se serverem, co dělat, [k lekci](03-llm-client/README.md)

- **4 Využití režimu agent GitHub Copilot pro server MCP ve Visual Studio Code**. Zde se podíváme, jak spustit náš MCP Server přímo ve Visual Studio Code, [k lekci](04-vscode/README.md)

- **5 stdio Transport Server** stdio transport je doporučený standard pro místní komunikaci mezi MCP serverem a klientem, poskytuje zabezpečenou komunikaci založenou na podsystémech s vestavěnou izolací procesů [k lekci](05-stdio-server/README.md)

- **6 HTTP streamování s MCP (Streamable HTTP)**. Naučte se o moderním HTTP streaming transportu (doporučený způsob pro vzdálené MCP servery podle [MCP Specifikace 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), ohlášení progresu a jak implementovat škálovatelné, real-time MCP servery a klienty pomocí Streamable HTTP. [k lekci](06-http-streaming/README.md)

- **7 Využití AI nástrojů pro VSCode** ke konzumaci a testování vašich MCP klientů a serverů [k lekci](07-aitk/README.md)

- **8 Testování**. Zde se zaměříme zejména na způsoby, jak můžeme testovat náš server a klienty různými způsoby, [k lekci](08-testing/README.md)

- **9 Nasazení**. Tato kapitola se podívá na různé způsoby nasazení vašich MCP řešení, [k lekci](09-deployment/README.md)

- **10 Pokročilé používání serveru**. Tato kapitola pokrývá pokročilé používání serveru, [k lekci](./10-advanced/README.md)

- **11 Autentifikace**. Tato kapitola ukazuje, jak přidat jednoduchou autentifikaci, od Basic Auth po použití JWT a RBAC. Doporučujeme začít zde a pak se podívat na pokročilá témata v kapitole 5 a provést další bezpečnostní zpřísnění dle doporučení v kapitole 2, [k lekci](./11-simple-auth/README.md)

- **12 MCP Hostitelé**. Nakonfigurujte a používejte populární MCP host klienty včetně Claude Desktop, Cursor, Cline a Windsurf. Naučte se typy transportu a řešení problémů, [k lekci](./12-mcp-hosts/README.md)

- **13 MCP Inspektor**. Debugujte a testujte interaktivně své MCP servery pomocí nástroje MCP Inspektor. Naučte se řešit problémy, zdroje a protokolové zprávy, [k lekci](./13-mcp-inspector/README.md)

- **14 Sampling**. Vytvořte MCP servery, které spolupracují s MCP klienty na úkolech souvisejících s LLM (zastaralé ve vydání kandidáta na verzi `2026-07-28`; stále platné pro `2025-11-25`). [k lekci](./14-sampling/README.md)

- **15 MCP Aplikace**. Vytvářejte MCP servery, které také odpovídají s instrukcemi pro uživatelské rozhraní, [k lekci](./15-mcp-apps/README.md)

Model Context Protocol (MCP) je otevřený protokol, který standardizuje, jak aplikace poskytují kontext LLM. Přemýšlejte o MCP jako o USB-C portu pro AI aplikace – poskytuje standardizovaný způsob připojení AI modelů k různým datovým zdrojům a nástrojům.

## Výukové cíle

Na konci této lekce budete schopni:

- Nastavit vývojová prostředí pro MCP v C#, Java, Python, TypeScript a JavaScriptu
- Vytvářet a nasazovat základní MCP servery s vlastními funkcemi (zdroje, výzvy a nástroje)
- Vytvářet hostitelské aplikace, které se připojují k MCP serverům
- Testovat a ladit implementace MCP
- Pochopit běžné výzvy při nastavování a jejich řešení
- Připojit své MCP implementace k populárním LLM službám

## Nastavení vašeho MCP prostředí

Než začnete pracovat s MCP, je důležité připravit si vývojové prostředí a pochopit základní pracovní postup. Tato sekce vás provede počátečními kroky nastavení pro hladký start s MCP.

### Požadavky

Než se pustíte do vývoje s MCP, ujistěte se, že máte:

- **Vývojové prostředí**: Pro vámi vybraný jazyk (C#, Java, Python, TypeScript nebo JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm nebo jakýkoliv moderní editor kódu
- **Správce balíčků**: NuGet, Maven/Gradle, pip nebo npm/yarn
- **API klíče**: Pro jakékoliv AI služby, které plánujete použít ve svých host aplikacích


### Oficiální SDK

V nadcházejících kapitolách uvidíte řešení vytvořená pomocí Python, TypeScript, Java a .NET. Zde jsou všechny oficiálně podporované SDK.

MCP poskytuje oficiální SDK pro více jazyků (v souladu s [MCP Specifikací 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Udržováno ve spolupráci s Microsoftem
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Udržováno ve spolupráci se Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Oficiální implementace TypeScriptu
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Oficiální implementace Pythonu (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Oficiální implementace Kotlinu
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Udržováno ve spolupráci s Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Oficiální implementace Rustu
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Oficiální implementace Go

## Klíčové body

- Nastavení vývojového prostředí MCP je jednoduché s jazykově specifickými SDK
- Vytváření MCP serverů zahrnuje tvorbu a registraci nástrojů s jasnými schématy
- MCP klienti se připojují k serverům a modelům, aby využili rozšířené možnosti
- Testování a ladění jsou nezbytné pro spolehlivé implementace MCP
- Možnosti nasazení sahají od lokálního vývoje po cloudová řešení

## Procvičování

Máme sadu ukázek, které doplňují cvičení, jež uvidíte ve všech kapitolách této sekce. Kromě toho má každá kapitola své vlastní cvičení a úkoly

- [Java Kalkulačka](./samples/java/calculator/README.md)
- [.Net Kalkulačka](../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulačka](./samples/javascript/README.md)
- [TypeScript Kalkulačka](./samples/typescript/README.md)
- [Python Kalkulačka](../../../03-GettingStarted/samples/python)

## Další zdroje

- [Vytváření agentů pomocí Model Context Protocol na Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Remote MCP s Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Co dál

Začněte první lekcí: [Vytvoření vašeho prvního MCP serveru](01-first-server/README.md)

Jakmile dokončíte tento modul, pokračujte na: [Modul 4: Praktická implementace](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->