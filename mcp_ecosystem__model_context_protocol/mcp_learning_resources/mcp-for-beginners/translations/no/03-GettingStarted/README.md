## Komme i gang  

[![Build Your First MCP Server](../../../translated_images/no/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Klikk på bildet over for å se videoen av denne leksjonen)_

Denne seksjonen består av flere leksjoner:

- **1 Din første server**, i denne første leksjonen vil du lære å opprette din første server og undersøke den med inspeksjonsverktøyet, en verdifull måte å teste og feilsøke serveren din på, [til leksjonen](01-first-server/README.md)

- **2 Klient**, i denne leksjonen vil du lære å skrive en klient som kan koble til serveren din, [til leksjonen](02-client/README.md)

- **3 Klient med LLM**, en enda bedre måte å skrive en klient på er ved å legge til en LLM som kan "forhandle" med serveren om hva som skal gjøres, [til leksjonen](03-llm-client/README.md)

- **4 Bruke en server i GitHub Copilot Agent-modus i Visual Studio Code**. Her ser vi på hvordan vi kjører MCP-serveren vår fra Visual Studio Code, [til leksjonen](04-vscode/README.md)

- **5 stdio Transport Server** stdio-transport er den anbefalte standarden for lokal MCP server-til-klient kommunikasjon, og gir sikker kommunikasjonsprosess med innebygd prosessisolasjon [til leksjonen](05-stdio-server/README.md)

- **6 HTTP streaming med MCP (Streamable HTTP)**. Lær om moderne HTTP streaming-transport (den anbefalte tilnærmingen for eksterne MCP-servere i henhold til [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), fremdriftsvarsler, og hvordan du implementerer skalerbare, sanntids MCP-servere og klienter med Streamable HTTP. [til leksjonen](06-http-streaming/README.md)

- **7 Bruke AI Toolkit for VSCode** for å bruke og teste MCP-klienter og -servere dine [til leksjonen](07-aitk/README.md)

- **8 Testing**. Her skal vi spesielt fokusere på hvordan vi kan teste serveren og klienten på forskjellige måter, [til leksjonen](08-testing/README.md)

- **9 Distribuering**. Dette kapitlet ser på ulike måter å distribuere MCP-løsningene dine på, [til leksjonen](09-deployment/README.md)

- **10 Avansert serverbruk**. Dette kapitlet dekker avansert serverbruk, [til leksjonen](./10-advanced/README.md)

- **11 Autentisering**. Dette kapitlet viser hvordan du legger til enkel autentisering, fra Basic Auth til bruk av JWT og RBAC. Du oppfordres til å starte her og deretter se på avanserte emner i kapittel 5 og utføre ekstra sikkerhetstiltak gjennom anbefalinger i kapittel 2, [til leksjonen](./11-simple-auth/README.md)

- **12 MCP-verter**. Konfigurer og bruk populære MCP-vertklienter inkludert Claude Desktop, Cursor, Cline og Windsurf. Lær om transporttyper og feilsøking, [til leksjonen](./12-mcp-hosts/README.md)

- **13 MCP Inspektør**. Feilsøk og test MCP-servere dine interaktivt med MCP Inspektør-verktøyet. Lær feilsøkingsverktøy, ressurser og protokollmeldinger, [til leksjonen](./13-mcp-inspector/README.md)

- **14 Sampling**. Lag MCP-servere som samarbeider med MCP-klienter om oppgaver relatert til LLM (utgått i `2026-07-28` release-kandidat; fortsatt gyldig for `2025-11-25`). [til leksjonen](./14-sampling/README.md)

- **15 MCP-apper**. Bygg MCP-servere som også svarer med UI-instruksjoner, [til leksjonen](./15-mcp-apps/README.md)

Model Context Protocol (MCP) er en åpen protokoll som standardiserer hvordan applikasjoner gir kontekst til LLM-er. Se på MCP som en USB-C-port for AI-applikasjoner - det gir en standardisert måte å koble AI-modeller til ulike datakilder og verktøy.

## Læringsmål

Ved slutten av denne leksjonen vil du kunne:

- Sette opp utviklingsmiljøer for MCP i C#, Java, Python, TypeScript og JavaScript
- Bygge og distribuere grunnleggende MCP-servere med tilpassede funksjoner (ressurser, prompt og verktøy)
- Lage vertsprogrammer som kobler til MCP-servere
- Teste og feilsøke MCP-implementasjoner
- Forstå vanlige utfordringer ved oppsett og løsningene deres
- Koble dine MCP-implementasjoner til populære LLM-tjenester

## Sette opp MCP-miljøet ditt

Før du begynner å jobbe med MCP, er det viktig å forberede utviklingsmiljøet ditt og forstå den grunnleggende arbeidsflyten. Denne seksjonen leder deg gjennom de innledende oppsettsstegene for å sikre en god start med MCP.

### Forutsetninger

Før du begynner utvikling med MCP, sørg for at du har:

- **Utviklingsmiljø**: For ditt valgte språk (C#, Java, Python, TypeScript eller JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm eller en annen moderne kodeditor
- **Pakkehåndterere**: NuGet, Maven/Gradle, pip eller npm/yarn
- **API-nøkler**: For alle AI-tjenester du planlegger å bruke i vertsprogrammene dine


### Offisielle SDK-er

I de kommende kapitlene vil du se løsninger bygget med Python, TypeScript, Java og .NET. Her er alle de offisielt støttede SDK-ene.

MCP tilbyr offisielle SDK-er for flere språk (tilpasset [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Vedlikeholdt i samarbeid med Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Vedlikeholdt i samarbeid med Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Den offisielle TypeScript-implementeringen
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Den offisielle Python-implementeringen (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Den offisielle Kotlin-implementeringen
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Vedlikeholdt i samarbeid med Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Den offisielle Rust-implementeringen
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Den offisielle Go-implementeringen

## Viktige punkter

- Å sette opp et MCP-utviklingsmiljø er enkelt med språkspesifikke SDK-er
- Å bygge MCP-servere innebærer å lage og registrere verktøy med klare skjemaer
- MCP-klienter kobler til servere og modeller for å utnytte utvidede funksjoner
- Testing og feilsøking er essensielt for pålitelige MCP-implementasjoner
- Distribusjonsmuligheter spenner fra lokal utvikling til skybaserte løsninger

## Øving

Vi har et sett med eksempler som supplerer øvelsene du vil finne i alle kapitlene i denne seksjonen. I tillegg har hvert kapittel også egne øvelser og oppgaver

- [Java Kalkulator](./samples/java/calculator/README.md)
- [.Net Kalkulator](../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulator](./samples/javascript/README.md)
- [TypeScript Kalkulator](./samples/typescript/README.md)
- [Python Kalkulator](../../../03-GettingStarted/samples/python)

## Tilleggsressurser

- [Bygg agenter med Model Context Protocol på Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Fjern-MCP med Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Hva nå

Start med den første leksjonen: [Opprette din første MCP-server](01-first-server/README.md)

Når du har fullført dette modulen, fortsett til: [Modul 4: Praktisk implementering](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->