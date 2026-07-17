## Alustamine  

[![Loo oma esimene MCP server](../../../translated_images/et/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Klõpsa ülalolevale pildile, et vaadata selle tunni videot)_

See sektsioon koosneb mitmest õppetunnist:

- **1 Sinu esimene server**, selles esimeses tunnis õpid kuidas luua oma esimene server ja uurida seda inspektori tööriistaga, väärtuslik viis oma serveri testimiseks ja silumiseks, [õppetundi](01-first-server/README.md)

- **2 Klient**, selles tunnis õpid kuidas kirjutada klient, kes suudab sinu serveriga ühenduse luua, [õppetundi](02-client/README.md)

- **3 Klient LLM-iga**, veel parem viis kliendi kirjutamiseks on lisada sellele LLM, et see saaks sinu serveriga "läbirääkimisi" pidada, mida teha, [õppetundi](03-llm-client/README.md)

- **4 GitHub Copilot Agent režiimi kasutamine MCP serveris Visual Studio Code’is**. Siin vaatame, kuidas käivitada meie MCP server Visual Studio Code’i sees, [õppetundi](04-vscode/README.md)

- **5 stdio transpordi server** stdio transport on soovitatud standard kohalikuks MCP serveri ja kliendi vaheliseks suhtluseks, pakkudes turvalist alamprotsessipõhist kommunikatsiooni koos sisseehitatud protsessi isolatsiooniga, [õppetundi](05-stdio-server/README.md)

- **6 HTTP voogedastus MCP-ga (voogedastatav HTTP)**. Õpi kaasaegse HTTP voogedastustranspordi kohta (soovitatav lähenemine kaugete MCP serverite puhul vastavalt [MCP spetsifikatsioonile 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), edenemise teavitusi ja kuidas rakendada mastaapseid, reaalajas MCP servereid ja kliente Streamable HTTP abil. [õppetundi](06-http-streaming/README.md)

- **7 Tehisintellekti komplekti kasutamine VSCode jaoks** oma MCP klientide ja serverite tarbimiseks ja testimiseks [õppetundi](07-aitk/README.md)

- **8 Testimine**. Siin keskendume eelkõige sellele, kuidas saame oma serverit ja klienti erinevalt testida, [õppetundi](08-testing/README.md)

- **9 Juhtimine**. See peatükk vaatleb erinevaid MCP lahenduste juurutamise viise, [õppetundi](09-deployment/README.md)

- **10 Täiustatud serveri kasutamine**. See peatükk käsitleb täiustatud serveri kasutamist, [õppetundi](./10-advanced/README.md)

- **11 Autentimine**. See peatükk käsitleb lihtsa autentimise lisamist, alates Basic Authist kuni JWT ja RBAC kasutamiseni. Soovitame alustada siit ja seejärel vaadata Täiustatud teemasid 5. peatükist ning sooritada täiendavat turvalisuse tugevdamist soovituste kaudu 2. peatükis, [õppetundi](./11-simple-auth/README.md)

- **12 MCP Hostid**. Konfigureeri ja kasuta populaarseid MCP hosti kliente nagu Claude Desktop, Cursor, Cline ja Windsurf. Õpi transporditüüpe ja probleemide lahendamist, [õppetundi](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. Silu ja testi oma MCP servereid interaktiivselt kasutades MCP Inspector tööriista. Õpi tõrkeotsingu tööriistu, ressursse ja protokolli sõnumeid, [õppetundi](./13-mcp-inspector/README.md)

- **14 Proovivõtt**. Loo MCP servereid, mis teevad koostööd MCP klientidega LLM-iga seotud ülesannetes (kehtetu alates `2026-07-28` vabastuse kandidaadist; endiselt kehtiv `2025-11-25`). [õppetundi](./14-sampling/README.md)

- **15 MCP rakendused**. Ehita MCP servereid, mis vastavad ka kasutajaliidese juhistega, [õppetundi](./15-mcp-apps/README.md)

Model Context Protocol (MCP) on avatud protokoll, mis standardiseerib, kuidas rakendused pakuvad konteksti LLM-idele. Mõtle MCP-le nagu USB-C pordile tehisintellekti rakenduste jaoks – see pakub standardiseeritud viisi AI mudelite ühendamiseks erinevate andmeallikate ja tööriistadega.

## Õpieesmärgid

Selle õppetunni lõpus oskad sa:

- Seadistada MCP arenduskeskkonnad C#, Java, Python, TypeScript ja JavaScript jaoks
- Ehita ja juuruta põhilisi MCP servereid koos kohandatud funktsioonidega (ressursid, promptid ja tööriistad)
- Loo hostrakendused, mis ühenduvad MCP serveritega
- Testida ja siluda MCP implementeeringuid
- Mõista tavalisi seadistamise väljakutseid ja nende lahendusi
- Ühendada oma MCP implementeeringud populaarsete LLM teenustega

## MCP keskkonna seadistamine

Enne kui hakkad töötama MCP-ga, on oluline ette valmistada oma arenduskeskkond ja mõista põhivoo. See sektsioon juhatab sind läbi esialgsete seadistusetappide, et tagada sujuv algus MCP-ga.

### Eeltingimused

Enne MCP arendusse sukeldumist veendu, et sul on:

- **Arenduskeskkond**: Sinu valitud keel (C#, Java, Python, TypeScript või JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm või mõni kaasaegne koodiredaktor
- **Paketihaldurid**: NuGet, Maven/Gradle, pip või npm/yarn
- **API võtmed**: Kõikide AI teenuste jaoks, mida plaanid oma hostrakendustes kasutada


### Ametlikud SDK-d

Järgmistes peatükkides näed lahendusi, mis on ehitatud Pythonis, TypeScript’is, Javas ja .NET-is. Siin on kõik ametlikult toetatud SDK-d.

MCP pakub ametlikke SDK-sid mitmele keeletagaplaneerimisele ([MCP Spetsifikatsioon 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Hooldatud koostöös Microsoftiga
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Hooldatud koostöös Spring AI-ga
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Ametlik TypeScript’i implementatsioon
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Ametlik Python’i implementatsioon (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Ametlik Kotlin’i implementatsioon
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Hooldatud koostöös Loopwork AI-ga
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Ametlik Rust’i implementatsioon
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Ametlik Go implementatsioon

## Peamised järeldused

- MCP arenduskeskkonna seadistamine on lihtne keelepõhiste SDK-dega
- MCP serverite ehitamine hõlmab tööriistade loomist ja registreerimist selgete skeemidega
- MCP kliendid ühenduvad serverite ja mudelitega, et kasutada laiendatud võimalusi
- Testimine ja silumine on MCP kasutusvarmuse tagamiseks olulised
- Juurutusvõimalused ulatuvad lokaalsest arendusest kuni pilvepõhiste lahendusteni

## Harjutamine

Meil on komplekt näidisprojekte, mis täiendavad kõigis selle sektsiooni peatükkides olevaid harjutusi. Lisaks on igal peatükil oma harjutused ja ülesanded

- [Java kalkulaator](./samples/java/calculator/README.md)
- [.Net kalkulaator](../../../03-GettingStarted/samples/csharp)
- [JavaScript kalkulaator](./samples/javascript/README.md)
- [TypeScript kalkulaator](./samples/typescript/README.md)
- [Python kalkulaator](../../../03-GettingStarted/samples/python)

## Lisamaterjalid

- [Agentide loomine Model Context Protocol abil Azure’is](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Kaug-MCP Azure Container Apps’is (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Mis järgmiseks

Alusta esimesest õppetunnist: [Sinu esimese MCP serveri loomine](01-first-server/README.md)

Kui oled selle mooduli lõpetanud, jätka: [Moodul 4: Praktiline teostus](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->