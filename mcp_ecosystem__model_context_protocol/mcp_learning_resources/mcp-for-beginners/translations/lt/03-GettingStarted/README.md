## Pradžia  

[![Sukurkite savo pirmą MCP serverį](../../../translated_images/lt/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Spustelėkite aukščiau esantį vaizdą, kad peržiūrėtumėte šio pamokos vaizdo įrašą)_

Šiame skyriuje yra keletas pamokų:

- **1 Jūsų pirmasis serveris**, šioje pirmoje pamokoje jūs sužinosite, kaip sukurti savo pirmąjį serverį ir jį apžiūrėti naudojant inspektroriaus įrankį, vertingą būdą testuoti ir derinti savo serverį, [į pamoką](01-first-server/README.md)

- **2 Klientas**, šioje pamokoje sužinosite, kaip parašyti klientą, kuris gali prisijungti prie jūsų serverio, [į pamoką](02-client/README.md)

- **3 Klientas su LLM**, dar geresnis būdas rašyti klientą yra pridėti LLM, kad jis galėtų „derėtis“ su jūsų serveriu, ką daryti, [į pamoką](03-llm-client/README.md)

- **4 Naudojant serverio režimą kartu su GitHub Copilot Visual Studio Code**. Čia nagrinėjame, kaip paleisti mūsų MCP serverį iš Visual Studio Code aplinkos, [į pamoką](04-vscode/README.md)

- **5 stdio Transporto serveris** stdio transportas yra rekomenduojama standartinė vietinei MCP serverio ir kliento komunikacijai, teikianti saugų pokomandinių procesų pagrindu veikiantį komunikavimą su įmontuota procesų izoliacija [į pamoką](05-stdio-server/README.md)

- **6 HTTP transliacija su MCP (Streamable HTTP)**. Sužinokite apie modernų HTTP srautinį perdavimą (rekomenduojamą nuotoliniams MCP serveriams pagal [MCP specifikaciją 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), pažangos pranešimus ir kaip įgyvendinti mastelio keičiamus realaus laiko MCP serverius ir klientus naudojant Streamable HTTP. [į pamoką](06-http-streaming/README.md)

- **7 Naudojant AI įrankių rinkinių sutarties VSCode** MCP klientams ir serveriams testuoti bei naudoti [į pamoką](07-aitk/README.md)

- **8 Testavimas**. Čia ypač sutelksime dėmesį, kaip galime įvairiais būdais išbandyti savo serverį ir klientą, [į pamoką](08-testing/README.md)

- **9 Diegimas**. Šiame skyriuje apžvelgsime skirtingus būdus, kaip diegti savo MCP sprendimus, [į pamoką](09-deployment/README.md)

- **10 Pažangus serverio naudojimas**. Šiame skyriuje aptariamas pažangus serverio naudojimas, [į pamoką](./10-advanced/README.md)

- **11 Autentifikavimas**. Šiame skyriuje aptariama, kaip pridėti paprastą autentifikavimą nuo Basic Auth iki JWT ir RBAC naudojimo. Skatiname pradėti čia ir tada peržiūrėti Pažangias temas 5 skyriuje bei atlikti papildomą saugumo stiprinimą pagal rekomendacijas 2 skyriuje, [į pamoką](./11-simple-auth/README.md)

- **12 MCP prieglobos**. Sužinokite, kaip konfigūruoti ir naudoti populiarius MCP prieglobos klientus, įskaitant Claude Desktop, Cursor, Cline ir Windsurf. Sužinokite apie transporto tipus ir trikčių šalinimą, [į pamoką](./12-mcp-hosts/README.md)

- **13 MCP inspektrorius**. Interaktyviai derinkite ir testuokite savo MCP serverius naudodami MCP inspektroriaus įrankį. Sužinokite, kaip taisyti įrankius, resursus ir protokolo pranešimus, [į pamoką](./13-mcp-inspector/README.md)

- **14 Išmatuota apimtis**. Kurkite MCP serverius, kurie bendradarbiauja su MCP klientais LLM susijusiose užduotyse (nebeaktualu `2026-07-28` leidinio kandidatu; vis dar galioja `2025-11-25`) [į pamoką](./14-sampling/README.md)

- **15 MCP programėlės**. Kurkite MCP serverius, kurie taip pat atsako su vartotojo sąsajos instrukcijomis, [į pamoką](./15-mcp-apps/README.md)

Model Context Protocol (MCP) yra atvira protokolo specifikacija, standartizuojanti, kaip programos suteikia kontekstą LLM. Galvokite apie MCP kaip USB-C prievadą AI programoms – jis suteikia standartizuotą būdą prijungti AI modelius prie skirtingų duomenų šaltinių ir įrankių.

## Mokymosi tikslai

Pabaigę šią pamoką, sugebėsite:

- Paruošti MCP kūrimo aplinkas C#, Java, Python, TypeScript ir JavaScript kalboms
- Kurti ir diegti pagrindinius MCP serverius su pasirinktinių funkcijų (išteklių, raginimų ir įrankių) palaikymu
- Kurti prieglobos programas, jungiančias MCP serverius
- Testuoti ir derinti MCP realizacijas
- Suprasti bendras konfigūracijos problemas ir jų sprendimus
- Prisijungti prie populiarių LLM paslaugų naudojant MCP realizacijas

## MCP aplinkos parengimas

Prieš pradėdami darbą su MCP svarbu paruošti kūrimo aplinką ir suprasti pagrindinį darbo procesą. Šis skyrius padės jums atlikti pradinius nustatymus ir užtikrinti sklandų MCP naudojimą.

### Išankstinės sąlygos

Prieš pradedant MCP kūrimą, įsitikinkite, kad turite:

- **Kūrimo aplinka**: Jūsų pasirinktai kalbai (C#, Java, Python, TypeScript arba JavaScript)
- **IDE/Redaktorius**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm ar bet kurį modernų kodo redaktorių
- **Paketo valdymo priemonės**: NuGet, Maven/Gradle, pip arba npm/yarn
- **API raktai**: bet kuriai AI paslaugų, kurias planuojate naudoti prieglobos programose


### Oficialūs SDK

Kituose skyriuose pamatysite sprendimus, sukurtus naudojant Python, TypeScript, Java ir .NET. Čia pateikiami visi oficialiai palaikomi SDK.

MCP teikia oficialius SDK kelioms kalboms (atitinka [MCP specifikaciją 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Palaikomas bendradarbiaujant su Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Palaikomas bendradarbiaujant su Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Oficiali TypeScript įgyvendinimo versija
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Oficiali Python įgyvendinimo versija (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Oficiali Kotlin įgyvendinimo versija
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Palaikomas bendradarbiaujant su Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Oficiali Rust įgyvendinimo versija
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Oficiali Go įgyvendinimo versija

## Svarbiausios išvados

- MCP kūrimo aplinkos parengimas yra paprastas naudojant kalbai skirtus SDK
- MCP serverių kūrimas apima įrankių su aiškia schema kūrimą ir registravimą
- MCP klientai jungiasi prie serverių ir modelių, siekdami išplėstinių galimybių
- Testavimas ir derinimas yra būtini patikimoms MCP realizacijoms
- Diegimo galimybės svyruoja nuo vietinio kūrimo iki debesies sprendimų

## Praktika

Turime pavyzdžių rinkinį, kuris papildo pratimus visuose šio skyriaus skyriuose. Be to, kiekvienas skyrius turi savo pratimus ir užduotis.

- [Java skaičiuoklė](./samples/java/calculator/README.md)
- [.Net skaičiuoklė](../../../03-GettingStarted/samples/csharp)
- [JavaScript skaičiuoklė](./samples/javascript/README.md)
- [TypeScript skaičiuoklė](./samples/typescript/README.md)
- [Python skaičiuoklė](../../../03-GettingStarted/samples/python)

## Papildomi ištekliai

- [Kurti agentus naudojant Model Context Protocol Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Nuotolinis MCP su Azure konteinerių programomis (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP agentas](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Kas toliau

Pradėkite nuo pirmos pamokos: [Sukurti savo pirmą MCP serverį](01-first-server/README.md)

Baigę šią modulį, tęskite: [4 modulis: praktinė įgyvendinimas](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->