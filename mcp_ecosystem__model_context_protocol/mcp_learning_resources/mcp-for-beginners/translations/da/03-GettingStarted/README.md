## Kom godt i gang  

[![Build Your First MCP Server](../../../translated_images/da/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Klik på billedet ovenfor for at se videoen til denne lektion)_

Denne sektion består af flere lektioner:

- **1 Din første server**, i denne første lektion lærer du, hvordan du opretter din første server og inspicerer den med inspector-værktøjet, en værdifuld måde at teste og fejlsøge din server på, [til lektionen](01-first-server/README.md)

- **2 Klient**, i denne lektion lærer du at skrive en klient, der kan forbinde til din server, [til lektionen](02-client/README.md)

- **3 Klient med LLM**, en endnu bedre måde at skrive en klient på er ved at tilføje en LLM, så den kan "forhandle" med din server om, hvad der skal gøres, [til lektionen](03-llm-client/README.md)

- **4 Brug af server GitHub Copilot Agent-tilstand i Visual Studio Code**. Her ser vi på at køre vores MCP Server fra Visual Studio Code, [til lektionen](04-vscode/README.md)

- **5 stdio Transport Server** stdio-transport er standardanbefalingen for lokal MCP server-til-klient kommunikation og giver sikker kommunikation via underprocesser med indbygget procesisolation [til lektionen](05-stdio-server/README.md)

- **6 HTTP Streaming med MCP (Streamable HTTP)**. Lær om moderne HTTP streaming transport (den anbefalede metode til fjernservere ifølge [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), fremdrift-notifikationer, og hvordan man implementerer skalerbare, realtids MCP servere og klienter ved brug af Streamable HTTP. [til lektionen](06-http-streaming/README.md)

- **7 Udnyttelse af AI Toolkit til VSCode** til at forbruge og teste dine MCP-klienter og servere [til lektionen](07-aitk/README.md)

- **8 Testning**. Her fokuserer vi især på, hvordan vi kan teste vores server og klient på forskellige måder, [til lektionen](08-testing/README.md)

- **9 Udrulning**. Dette kapitel ser på forskellige måder at udrulle dine MCP-løsninger på, [til lektionen](09-deployment/README.md)

- **10 Avanceret serverbrug**. Dette kapitel dækker avanceret serverbrug, [til lektionen](./10-advanced/README.md)

- **11 Auth**. Dette kapitel dækker, hvordan man tilføjer simpel auth, fra Basic Auth til brug af JWT og RBAC. Du opfordres til at starte her og derefter se på Avancerede Emner i kapitel 5 og foretage yderligere sikkerhedshærdning via anbefalinger i kapitel 2, [til lektionen](./11-simple-auth/README.md)

- **12 MCP Hosts**. Konfigurer og brug populære MCP vært-klienter inklusive Claude Desktop, Cursor, Cline og Windsurf. Lær transporstyper og fejlfinding, [til lektionen](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. Fejlsøg og test dine MCP servere interaktivt ved hjælp af MCP Inspector-værktøjet. Lær at fejlsøge værktøjer, ressourcer og protokolbeskeder, [til lektionen](./13-mcp-inspector/README.md)

- **14 Sampling**. Opret MCP servere, der samarbejder med MCP klienter om LLM-relaterede opgaver (forældet i `2026-07-28` releasekandidat; stadig gyldigt for `2025-11-25`). [til lektionen](./14-sampling/README.md)

- **15 MCP Apps**. Byg MCP servere, der også svarer med UI-instruktioner, [til lektionen](./15-mcp-apps/README.md)

Model Context Protocol (MCP) er en åben protokol, der standardiserer, hvordan applikationer giver kontekst til LLMs. Tænk på MCP som en USB-C-port til AI-applikationer - det giver en standardiseret måde at forbinde AI-modeller til forskellige datakilder og værktøjer.

## Læringsmål

Når du har gennemført denne lektion, vil du kunne:

- Sætte udviklingsmiljøer op til MCP i C#, Java, Python, TypeScript og JavaScript
- Bygge og udrulle grundlæggende MCP servere med tilpassede funktioner (ressourcer, prompts og værktøjer)
- Oprette vært-applikationer, der forbinder til MCP servere
- Teste og fejlsøge MCP-implementeringer
- Forstå almindelige opsætningsudfordringer og deres løsninger
- Forbinde dine MCP-implementeringer til populære LLM-tjenester

## Opsætning af dit MCP-miljø

Før du begynder at arbejde med MCP, er det vigtigt at forberede dit udviklingsmiljø og forstå den grundlæggende arbejdsgang. Denne sektion vil guide dig gennem de indledende opsætningsskridt for at sikre en glidende start med MCP.

### Forudsætninger

Før du dykker ned i MCP-udvikling, sørg for at have:

- **Udviklingsmiljø**: For det valgte sprog (C#, Java, Python, TypeScript eller JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm eller en hvilken som helst moderne kodeeditor
- **Pakkestyring**: NuGet, Maven/Gradle, pip eller npm/yarn
- **API-nøgler**: Til eventuelle AI-tjenester, du planlægger at bruge i dine vært-applikationer


### Officielle SDK'er

I de kommende kapitler vil du se løsninger bygget med Python, TypeScript, Java og .NET. Her er alle de officielt understøttede SDK'er.

MCP tilbyder officielle SDK'er til flere sprog (i overensstemmelse med [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Vedligeholdt i samarbejde med Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Vedligeholdt i samarbejde med Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Den officielle TypeScript-implementering
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Den officielle Python-implementering (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Den officielle Kotlin-implementering
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Vedligeholdt i samarbejde med Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Den officielle Rust-implementering
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Den officielle Go-implementering

## Vigtige pointer

- Opsætning af et MCP udviklingsmiljø er ligetil med sprog-specifikke SDK'er
- At bygge MCP servere involverer at oprette og registrere værktøjer med klare skemaer
- MCP klienter forbinder til servere og modeller for at udnytte udvidede muligheder
- Testning og fejlsøgning er essentielt for pålidelige MCP-implementeringer
- Udrulningsmuligheder spænder fra lokal udvikling til cloud-baserede løsninger

## Praktisering

Vi har et sæt af eksempler, der supplerer de øvelser, du vil se i alle kapitler i denne sektion. Derudover har hvert kapitel også egne øvelser og opgaver.

- [Java Calculator](./samples/java/calculator/README.md)
- [.Net Calculator](../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](./samples/javascript/README.md)
- [TypeScript Calculator](./samples/typescript/README.md)
- [Python Calculator](../../../03-GettingStarted/samples/python)

## Yderligere ressourcer

- [Byg agenter ved hjælp af Model Context Protocol på Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Fjern-MCP med Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Hvad er det næste

Start med den første lektion: [Oprettelse af din første MCP Server](01-first-server/README.md)

Når du har gennemført denne modul, fortsæt til: [Modul 4: Praktisk implementering](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->