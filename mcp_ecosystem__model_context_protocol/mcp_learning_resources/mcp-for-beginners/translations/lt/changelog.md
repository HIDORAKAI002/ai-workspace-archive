# Keitimų žurnalas: MCP pradedantiesiems mokymo programa

Šis dokumentas tarnauja kaip įrašas apie visas reikšmingas Model Context Protocol (MCP) pradedantiesiems mokymo programos pakeitimus. Pakeitimai dokumentuojami atvirkštine chronologine tvarka (pirmiausia naujausi pakeitimai).

## 2026 m. liepos 2 d.

### Nauja pamoka: 2026-07-28 MCP specifikacijos išleidimo kandidatas

Pridėtas būsimasis `2026-07-28` MCP specifikacijos išleidimo kandidato (paskelbtas 2026 m. gegužės 21 d.; galutinis leidimas planuojamas 2026 m. liepos 28 d.) aprašymas, santrauka iš [oficialaus pranešimo tinklaraščio įrašo](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Mokymo programos pagrindas lieka **MCP specifikacija 2025-11-25** iki naujos versijos išleidimo, todėl tai pateikta kaip perspektyvinės gairės, o ne esamų pamokų perrašymas.

- **Nauja**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — pilna pamoka apimanti valstybės neturintį protokolo branduolį (pašalinant `initialize` rankos paspaudimą ir `Mcp-Session-Id`), naujus `Mcp-Method`/`Mcp-Name` maršrutizavimo antraštes, `ttlMs`/`cacheScope` talpyklos metaduomenis, W3C Trace Context `_meta`, formalią Išplėtimo sistemą (MCP Apps ir naują Tasks išplėtimą), šešis autorizacijos sustiprinimo SEP, Roots/Sampling/Logging pasenimą bei perėjimą prie pilno JSON Schema 2020-12 įrankių schemoms.
- **Atnaujinta** su perspektyviniais kreipiniais į naują pamoką:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protokolo versijos pastaba, Sampling/Roots/Logging/Tasks skyriai, ir „Kas toliau“
  - [02-Security/README.md](./02-Security/README.md): autorizacijos stiprinimo kreipinys
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): valstybės neturinčio transporto kreipinys
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Sampling pasenimo kreipinys
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Logging pasenimo ir Tasks išplėtimo kreipinys
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): valstybės neturinčio/sesijos maršrutizavimo kreipinys
  - [README.md](./README.md): „Žvilgsnis į priekį“ pastaba specifikacijos skiltyje ir naujas `1.1` įrašas mokymo programos modulių lentelėje
  - [study_guide.md](./study_guide.md): perspektyvinis punktas pagrindinių koncepcijų apžvalgoje ir datuota priedų pastaba
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): kreipinys į `mcp-session-id` transporto žemėlapį prieš valstybės neturinčio užklausos modelį
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): modulio apžvalgos kreipinys dėl Root Contexts/Sampling pasenimų ir Tasks išplėtimo
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): autorizacijos sustiprinimo kreipinys

## 2026 m. birželio 24 d.

### Nauja pamoka: MCP naudojimas Copilot programoje

- [Įrankių skyrius](./12-tooling/README.md) Pridėtas įrankių skyrius.
- [MCP Copilot programoje](./12-tooling/01-copilot-app/README.md)

## 2026 m. birželio 16 d.

### MCP specifikacijos suderinimas ir pavyzdžių patikra

Patikrinta mokymo programa pagal dabartinę **MCP specifikaciją 2025-11-25** ir naujausias oficialias SDK versijas, tada ištaisyti likę nebeaktualūs specifikacijos nurodymai ir patvirtinta, kad pagrindiniai pavyzdžiai vis dar kompiliuojasi ir veikia.

#### Specifikacijos versijų pataisymai (2025-06-18 / 2025-03-26 → 2025-11-25)

Atnaujintas anglų kalbos turinys, kuriame vis dar nurodoma, kad senesnė specifikacijos versija buvo *dabartinė/naujausia* standartas, ir nukreipta nuorodos į kanoninį `modelcontextprotocol.io` specifikacijos kelius:
- **05-AdvancedTopics/mcp-security/README.md**: Atnaujintas „Dabartinis standartas“ baneris, įvadas, pagrindiniai saugumo principų antraštė, privalomų reikalavimų antraštė, Microsoft Entra ID skiltis, Nuorodos ir Ištekliai žymos, bei uždarymo saugumo pastaba (8 nuorodos) į 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atnaujinta papildomų išteklių specifikacijos nuoroda ir „Dabartinis standartas“ baneris į 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Pakeista pasenusi `2025-03-26` saugumo ir patikimumo nuoroda į dabartinę 2025-11-25 saugumo gerosios praktikos puslapį
- **03-GettingStarted/14-sampling/README.md**: Atnaujinta oficialių Sampling dokumentų nuoroda į 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atnaujinta esamo laiko „dabartinės MCP specifikacijos“ nuoroda ir papildomų išteklių specifikacijos nuoroda į 2025-11-25 (istorinės SSE-pasenimo pastabos paliktos išlaikant tikslumą)

#### Pavyzdžių patikra pagal dabartines SDK versijas

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` įdiegtas `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` praeitas be tipo klaidų — esamos `McpServer`/`StdioServerTransport` API lieka galiojančios
- **Python (03-GettingStarted/01-first-server/solution/python)**: Patikrinta izoliuotoje `.venv` aplinkoje su `mcp[cli]` (1.27.2); `py_compile` praeitas ir `FastMCP.list_tools()` teisingai grąžino `add` ir `subtract` įrankius
- Patvirtinta, kad visi pavyzdžių `@modelcontextprotocol/sdk` versijų intervalai (`>=1.26.0` / `^1.26.0` / `^1.27.0`) švariai išsprendžiami iki dabartinio `1.29.0`, be API lūžimų

#### Priklausomybių versijų lyginimo korekcijos (uždaromos versijų spragos)

Pakeltas pasenusių SDK versijų prašymas, kad kiekvienas pavyzdys atitiktų dabartinį MCP leidimą, pagal viso repo konvenciją:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Pakeltas `@modelcontextprotocol/sdk` nuo `^1.8.0` iki `>=1.26.0` ir atnaujinta nebeaktuali pakuotės aprašymo eilutė „atnaujinta MCP 2025-06-18“ į „suderinta su MCP specifikacija 2025-11-25“
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ir **lab4/code/github_mcp_server/pyproject.toml**: Pakeltas tikslus pin `mcp==1.23.0` iki `mcp>=1.26.0`; abi `uv.lock` bylos atnaujintos (`uv lock`), kad jose būtų matoma dabartinė `mcp 1.27.2` ir būtų sinchronizuotos su manifestais

#### Mokymo programos spragų analizė — Naujausių specifikacijos funkcijų aprėptis

Patikrinta, kad mokymo programa jau apima visas MCP 2025-11-25 įvestas/išplėstas primityvas, todėl turinio spragų nėra:
- **Sampling**: Pamoka 03-GettingStarted/14-sampling ir 05-AdvancedTopics/mcp-sampling
- **Elicitation (įskaitant URL režimą)**: Dokumentuota 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumentuota 00-Introduction, 01-CoreConcepts ir 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimentiniai, ilgai trunkantys veiksmai)**: Dokumentuota 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features
- **Įrankių anotacijos** (`readOnlyHint` / `destructiveHint`): Dokumentuota 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features

### Saugumo sustiprinimas ir priklausomybių pažeidžiamumų šalinimas

Atliktas pilnas saugumo patikrinimas kiekviename priklausomybių manifeste ir pavyzdžių šaltinio kode, po to ištaisytos visos aptiktos npm rekomendacijos ir viena kodo lygio problema. Po pataisymo `npm audit` kiekviename tikrintame kataloge rodo **0 pažeidžiamumų**.

#### npm priklausomybių pažeidžiamumai (perkelti) — Ištaisyta

Patikrinti visi 15 įvykdytų `package-lock.json` failų. Pažeidžiamumai buvo susiję tik su perkeliamomis priklausomybėmis, kurias atitraukė MCP Inspector kūrimo įrankis, OpenAI klientas ir MCP SDK; visi dabar išspręsti nepažeidžiant pavyzdžių:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ir **lab3/code/weather_mcp/inspector**: Pakeltas `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), kuris pašalino susietų paketų `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ir `ws` rekomendacijas. Pridėtas npm `overrides` įrašas, verčiantis naudoti patch'intą `shell-quote@1.8.4`, kad būtų pašalinta kritinė rekomendacija, kurią atnešė `concurrently`; abi lockfailai atnaujinti (dabar 0 pažeidžiamumų)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atnaujino perkeliamą `qs` (vidutinio lygio pažeidžiamumą) į patch'intą versiją
- **03-GettingStarted/samples/javascript**: `npm audit fix` atnaujino perkeliamą `hono` (vidutinio lygio pažeidžiamumą) į patch'intą versiją
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atnaujino perkeliamą `form-data` (aukšto lygio pažeidžiamumą) į patch'intą versiją
- **03-GettingStarted/11-simple-auth/solution/typescript**: Sukurtas trūkstamas `package-lock.json`, kad projektas būtų atkuriamas ir tikrinamas (0 pažeidžiamumų)

#### Kodo lygio saugumo pataisa (OWASP A03: Injekcija)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Pašalinta `shell=True` iš `open_in_vscode` įrankio. Ankstesnis `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` leido šelmo metakirčiams aplanko kelyje būti interpretuojamiems komandų eilutės apvalkalo `cmd.exe` (komandų injekcijos vektorius). Dabar tiesiogiai paleidžiamas išspręstas `Code.exe` su aplanku kaip argumentu — be šelmo — funkciniu požiūriu ekvivalentiška ir saugu

#### Python priklausomybių auditavimas

- Patikrinti visi Python reikalavimų rinkiniai su `pip-audit`. `05-AdvancedTopics` ir `03-GettingStarted/samples/python` pranešė **be žinomų pažeidžiamumų** (jų `mcp` / `httpx` / `pydantic` / `python-dotenv` versijos aprėptys išsprendžiamos iki dabartinių pataisytų leidimų)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` pažymėjo perkeliamą priklausomybę **`werkzeug` 3.1.1** su trimis `safe_join` Windows įrenginių pavadinimų DoS rekomendacijomis — `CVE-2025-66221`, `CVE-2026-21860` ir `CVE-2026-27199` (visi sutvarkyti versijoje 3.1.6). Pridėtas aiškus saugumo pin`werkzeug>=3.1.6`, kad būtų išspręstas pataisytas leidimas; patikrinta, kad apribojimas tvarkingai išsprendžiamas su `chainlit` / `mcp` / `semantic-kernel` paketu

### Produkto pavadinimo perbraižymas

Atnaujintas visas mokymo programos turinys, atspindintis Microsoft produkto perbraižymą:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Atnaujinta Discord bendruomenės nuoroda
- **AGENTS.md**: Atnaujinta Discord serverio nuoroda
- **README.md**: Atnaujintos technologijų ekosistemos nuorodos
- **study_guide.md**: Atnaujintos atvejo studijų nuorodos
- **05-AdvancedTopics/README.md**: Atnaujintas 5.13 modulio pavadinimas ir aprašymas
- **05-AdvancedTopics/mcp-integration/README.md**: Atnaujintas skyriaus antraštės pavadinimas ir aprašymas
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Visas modulio pavadinimas ir turinio atnaujinimas
- **05-AdvancedTopics/mcp-security-entra/README.md**: Atnaujinta kryžminė nuoroda
- **07-LessonsfromEarlyAdoption/README.md**: Atnaujintos atvejo studijų nuorodos
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Atnaujinta 9 skyriaus antraštė, ženkleliai ir galimybės
- **08-BestPractices/README.md**: Atnaujinta Discord bendruomenės nuoroda
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Atnaujinta Discord kanalo nuoroda
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Atnaujinta modelio diegimo nuoroda
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Atnaujinta AI paslaugų lentelė
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Atnaujinta resursų nuoroda

#### AI įrankių rinkinys / AITK → Microsoft Foundry įrankių rinkinio išplėtimas VS Code

- **README.md**: Atnaujintos pagrindinės mokymo programos nuorodos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Atnaujintas modulio pavadinimas, apžvalga ir visi modulio antraštės
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Atnaujintas pavadinimas, mokymosi tikslai, sąrankos instrukcijos ir ištekliai
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Atnaujintas pavadinimas, mokymosi tikslai, MCP priimančiųjų lentelė ir kryžminės nuorodos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Atnaujintas pavadinimas, ženkleliai, išankstiniai reikalavimai ir ištekliai
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Atnaujintos Agent Builder nuorodos ir atsiliepimų nuoroda
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Atnaujinti išankstiniai reikalavimai ir pratęsimo nuorodos

---

## 2026 m. balandžio 11 d.

### Nauja pamoka, dokumentacijos pataisymai ir priklausomybių atnaujinimai

#### Pridėtas naujas mokymo turinys

**Modulis 05 - Pažangesnės temos**
- **Pamoka 5.17: Priešiškas daugelio agentų samprotavimas su MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Naujas išsamus vadovas, apimantis priešiško debato modelį daugelio agentų sistemoms
  - Mermaid architektūros diagrama: du agentai → bendras MCP serveris → debate transkriptas → teisėjas → verdiktas
  - Bendras MCP įrankių serveris (`web_search` + `run_python`), įgyvendintas Python ir TypeScript kalbomis
  - Priešiški sistemos užvedimai (PRIEŠ / UŽ / Teisėjas) su aiškiais įrankių naudojimo reikalavimais
  - Debato organizatorius Python, TypeScript ir C# kalbomis, valdo raundus ir nukreipia argumentus
  - MCP `ClientSession` prijungimas organizatoriui prie tikrų įrankių kvietimų
  - Panaudojimo atvejų lentelė (haliucinacijų aptikimas, grėsmės modeliavimas, API dizaino peržiūra, faktų tikrinimas, technologijų pasirinkimas)
  - Saugumo aspektai: izoliacija vykdymo metu, įrankių kvietimų patikra, dažnio ribojimas, audito žurnalavimas
  - Struktūruotas pratimas su trimis praktinėmis situacijomis (kodo peržiūra, architektūros sprendimas, turinio moderavimas)

#### Dokumentacijos pataisymai

**Modulis 03 - Pradžia**
- **05-stdio-server/README.md**: Pataisytas neužbaigtas TypeScript stdio serverio pavyzdys — pridėta trūkstama transporto inicializacija (`new StdioServerTransport()`) ir `server.connect(transport)` kvietimas, kad būtų suderinta su Python ir .NET pavyzdžiais toje pačioje skiltyje
- **14-sampling/README.md**: Pataisyta rašybos klaida — ištaisyta `"Sampling is an davanced features"` į `"Sampling is an advanced feature"`

#### Mokymo programos atnaujinimai

**Pagrindinis README.md**
- Pridėtas įrašas 5.17 (Priešiškas daugelio agentų samprotavimas su MCP) į mokymo programos lentelę su tiesiogine nuoroda į naują pamoką

**05-AdvancedTopics/README.md**
- Pridėtas pamokos 5.17 eilutė pamokų lentelėje

**study_guide.md**
- Pridėta tema „Priešiškas daugelio agentų samprotavimas“ minties žemėlapyje ir pažangiausių temų prose aprašyme

#### Kodo ir saugumo pataisymai

**Modulis 05 - Priešiški agentai (`mcp-adversarial-agents`)**
- **Saugumo pataisa — komandos injekcija**: `execSync` kabuko interpoliacija pakeista į `execFile` + `promisify` TypeScript `run_python` įrankyje, pašalinant galimybę komandos injekcijai (LLM valdomas kodas dabar perduodamas kaip tiesioginis argv elementas be kabuko dalyvavimo)
- **MCP įrankių ciklo prijungimas**: Atnaujintas Python debato organizatorius naudoti `AsyncAnthropic` klientą (vietoje blokuojančio sinchroninio `Anthropic`), perduoti gyvą `ClientSession` tiesiogiai kiekvienam agento raundui, gauti įrankių apibrėžimus per `session.list_tools()` kiekviename raunde ir vykdyti `tool_use` blokus per `session.call_tool()` ciklą iki kol modelis pateikia galutinį teksto atsakymą

#### Priklausomybių atnaujinimai

- Atnaujintas `hono` į 4.12.12 daugelyje paketų (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Atnaujintas `@hono/node-server` nuo 1.19.11 iki 1.19.13 TypeScript paketuose
- Atnaujinta `cryptography` nuo 46.0.5 iki 46.0.7 Python paketuose (10-StreamliningAIWorkflows laboratorijos 3 ir 4)
- Atnaujintas `lodash` nuo 4.17.23 iki 4.18.1 10-StreamliningAIWorkflows inspektoriuje

#### Vertimai

- Sinchronizuoti vertimai 48+ kalbų su naujausiais šaltinio pakeitimais (i18n atnaujinimas)

---

## 2026 m. vasario 5 d.

### Visuotinis saugos patikrinimas ir navigacijos patobulinimai

#### Pridėtas naujas mokymo turinys

**Modulis 03 - Pradžia**
- **12-mcp-hosts/README.md**: Naujas išsamus vadovas, kaip nustatyti MCP priimančiuosius
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigūracijos pavyzdžiai
  - JSON konfigūracijų šablonai visiems pagrindiniams priimančiosioms
  - Transporto tipų palyginimo lentelė (stdio, SSE/HTTP, WebSocket)
  - Dažniausiai pasitaikančių jungties problemų trikčių šalinimas
  - Saugumo geriausios praktikos priimamųjų konfigūravimui

- **13-mcp-inspector/README.md**: Naujas MCP Inspektoriaus derinimo vadovas
  - Įdiegimo būdai (npx, globalus npm, iš šaltinio)
  - Jungimasis prie serverių per stdio ir HTTP/SSE
  - Testavimo įrankiai, ištekliai ir užvedimų darbo eiga
  - VS Code integracija su MCP Inspektoriumi
  - Dažniausi derinimo scenarijai su sprendimais

**Modulis 04 - Praktinė įgyvendinimas**
- **pagination/README.md**: Naujas puslapiavimo įgyvendinimo vadovas
  - Pasienio pagrindu puslapiavimo šablonai Python, TypeScript, Java kalbomis
  - Kliento pusės puslapiavimo apdorojimas
  - Pasienio dizaino strategijos (nepermatomas vs struktūruotas)
  - Veikimo optimizavimo rekomendacijos

**Modulis 05 - Pažangesnės temos**
- **mcp-protocol-features/README.md**: Naujas protokolo funkcijų gilus analizė
  - Progreso pranešimų įgyvendinimas
  - Užklausų atšaukimo šablonai
  - Išteklių šablonai su URI šablonais
  - Serverio gyvavimo ciklo valdymas
  - Žurnalo lygių kontrolė
  - Klaidos valdymo šablonai su JSON-RPC kodais

#### Navigacijos pataisymai (atnaujinta daugiau kaip 24 failai)

**Pagrindinių modulių README failai**
 Dabar nuorodos rodo tiek į pirmą pamoką, tiek į kitą modulį

**02-Security pagalbiniai failai**
- Visi 5 papildomi saugos dokumentai dabar turi "Kas toliau" navigaciją:

**09-CaseStudy failai**
- Visi bylų nagrinėjimo failai dabar turi nuoseklią navigaciją:

**10-StreamliningAI laboratorijos**
Pridėta skyrius „Kas toliau“ modulio 10 apžvalgoje ir modulyje 11

#### Kodo ir turinio pataisymai

**SDK ir priklausomybių atnaujinimai**
Pataisyta tuščia openai versija į `^4.95.0`
Atnaujintas SDK nuo `^1.8.0` iki `>=1.26.0`
Atnaujintos mcp versijos ribos į `>=1.26.0`

**Kodo pataisymai**
Pataisytas neteisingas modelis `gpt-4o-mini` į `gpt-4.1-mini`

**Turinio pataisymai**
Pataisyta sugedusi nuoroda `READMEmd` → `README.md`, pataisytas mokymo programos antraštės klaidingas rašymas `Module 1-3` → `Module 0-3`, pataisytas failo kelias su didžiosiomis raidėmis
Pašalintas pažeistas Case Study 5 pasikartojantis turinys

**Pradedančiųjų gairių patobulinimai**
Pridėtas tinkamas įvadas, mokymosi tikslai ir išankstiniai reikalavimai pradedantiesiems

#### Mokymo programos atnaujinimai

**Pagrindinis README.md**
- Pridėti įrašai 3.12 (MCP priimančiosios), 3.13 (MCP inspektorius), 4.1 (puslapiavimas), 5.16 (protokolo funkcijos) mokymo programos lentelėje

**Modulių README failai**
Pridėtos pamokos 12 ir 13 į pamokų sąrašą
Pridėtas skyrius Praktiniai vadovai su nuoroda į puslapiavimą
Pridėtos pamokos 5.15 (Individualus transportas) ir 5.16 (Protokolo funkcijos)

**study_guide.md**
- Atnaujintas minties žemėlapis su visomis naujomis temomis: MCP priimančiųjų sąranka, MCP inspektorius, puslapiavimo strategijos, protokolo funkcijų gilus analizė

## 2026 m. sausio 28 d.

### MCP specifikacijos 2025-11-25 atitikties peržiūra

#### Pagrindinių koncepcijų patobulinimai (01-CoreConcepts/)
- **Naujas kliento primityvas – Šaknys (Roots)**: Pridėta išsami dokumentacija apie Roots kliento primityvą, leidžiantį serveriams suprasti failų sistemos ribas ir prieigos teises
- **Įrankių anotacijos**: Pridėta dokumentacija apie įrankių elgsenos anotacijas (`readOnlyHint`, `destructiveHint`) geresniam sprendimų priėmimui vykdant įrankius
- **Įrankių kvietimas mėginiuose (Sampling)**: Atnaujinta mėginių dokumentacija, įtraukiant `tools` ir `toolChoice` parametrus modelio valdomam įrankių kvietimui mėginių užklausose
- **URL režimo iškvietimas**: Pridėta dokumentacija apie URL pagrindu inicijuojamą išorinį serverio veiksmų užklausimą
- **Užduotys (eksperimentinės)**: Pridėtas naujas skyrius apie eksperimentines Užduočių funkcijas, skirtas patvariam vykdymui ir atidėto rezultatų gavimui
- **Piktogramų palaikymas**: Pastaba, kad įrankiai, ištekliai, išteklių šablonai ir užvedimai dabar gali turėti piktogramas kaip papildomą metaduomenį

#### Dokumentacijos atnaujinimai
- **README.md**: Pridėta MCP specifikacijos 2025-11-25 versijos nuoroda ir paaiškinimas apie datomis grįstą versijavimą
- **study_guide.md**: Atnaujintas mokymo programos žemėlapis, įtraukiant Užduotis ir Įrankių anotacijas Pagrindinių koncepcijų skyriuje; atnaujintas dokumento laiko žyma

#### Specifikacijos atitikties patikra
- **Protokolo versija**: Patikrinta, kad visa dokumentacija atitinka dabartinę MCP specifikaciją 2025-11-25
- **Architektūros suderinamumas**: Patvirtinta, kad dvi sluoksnių architektūra (duomenų sluoksnis + transporto sluoksnis) dokumentacijoje atitinka
- **Primityvų dokumentacija**: Patikrinti serverio primityvai (Ištekliai, Užvedimai, Įrankiai) ir kliento primityvai (Mėginimas, Iškvietimas, Žurnalo vedimas, Šaknys)
- **Transporto mechanizmai**: Patikrinta STDIO ir srauto HTTP transporto dokumentacijos tikslumas
- **Saugos gairės**: Patvirtintas atitikimas dabartinėms MCP saugos geriausioms praktikoms

#### Pagrindinės MCP 2025-11-25 funkcijos dokumentuotos
- **OpenID Connect atradimas**: Autentifikavimo serverio atradimas per OIDC
- **OAuth kliento ID metaduomenų dokumentai**: Rekomenduojamas kliento registracijos mechanizmas
- **JSON Schema 2020-12**: Numatytoji MCP schemų kalba
- **SDK sluoksniavimo sistema**: Formalizuoti reikalavimai SDK funkcionalumui ir palaikymui
- **Valdymo struktūra**: Formalizuotos darbo grupės ir interesų grupės MCP valdyme

### Saugumo dokumentacijos didelis atnaujinimas (02-Security/)

#### MCP saugumo susitikimo Sherpa integracija
- **Nauji praktiniai mokymo ištekliai**: Pridėta išsami integracija su [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) visoje saugos dokumentacijoje
- **Ekspedicijos maršrutas**: Dokumetuotas visas kelias nuo bazinio stovyklavietės iki viršūnės
- **OWASP suderinamumas**: Visa saugumo informacija dabar atitinka OWASP MCP Azure Security Guide rizikas

#### OWASP MCP Top 10 integracija
- **Naujas skyrius**: Pridėta OWASP MCP Top 10 saugumo rizikų lentelė su Azure mitigavimo priemonėmis pagrindiniame saugos README faile
- **Rizikomis grįsta dokumentacija**: Atnaujintas mcp-security-controls-2025.md su OWASP MCP rizikų nuorodomis kiekvienai saugos sričiai
- **Referencinė architektūra**: Nuoroda į OWASP MCP Azure Security Guide referencinę architektūrą ir įgyvendinimo šablonus

#### Atnaujinti saugos failai
- **README.md**: Pridėta Sherpa darbo seminaro apžvalga, ekspedicijos maršruto lentelė, OWASP MCP Top 10 rizikų santrauka ir praktinio mokymo skyrius
- **mcp-security-controls-2025.md**: Atnaujinta antraštė į 2026 m. vasarį, pridėtos OWASP rizikų nuorodos (MCP01-MCP08), pataisyta specifikacijos versijų neatitikimas
- **mcp-security-best-practices-2025.md**: Pridėtas Sherpa ir OWASP išteklių skyrius, atnaujinta datos žyma
- **mcp-best-practices.md**: Pridėtas praktinio mokymo skyrius su Sherpa ir OWASP nuorodomis
- **azure-content-safety-implementation.md**: Pridėta OWASP MCP06 nuoroda, Sherpa Camp 3 suderinimas ir papildomas išteklių skyrius

#### Pridėtos naujos išteklių nuorodos
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Atskiri OWASP MCP rizikų puslapiai (MCP01-MCP10)

### Visuotinis mokymo programos suderinamumas su MCP specifikacija 2025-11-25

#### Modulis 03 - Pradžia
- **SDK dokumentacija**: Pridėtas Go SDK prie oficialaus SDK sąrašo; atnaujintos visos SDK nuorodos, atitinkančios MCP specifikaciją 2025-11-25
- **Transporto paaiškinimai**: Atnaujinti STDIO ir HTTP srautinio transporto aprašymai su aiškiomis specifikacijos nuorodomis

#### Modulis 04 - Praktinė įgyvendinimas
- **SDK atnaujinimai**: Pridėtas Go SDK; atnaujintas SDK sąrašas su specifikacijos versijos nuoroda
- **Autorizacijos specifikacija**: Atnaujinta MCP Autorizacijos specifikacijos nuoroda į dabartinę 2025-11-25 versiją

#### Modulis 05 - Pažangesnės temos
- **Naujos funkcijos**: Pridėta pastaba apie naujas MCP specifikacijos 2025-11-25 funkcijas (Užduotys, Įrankių anotacijos, URL režimo iškvietimas, Šaknys)
- **Saugumo ištekliai**: Pridėtos OWASP MCP Top 10 ir Sherpa seminaro nuorodos kaip papildomi šaltiniai

#### Modulis 06 - Bendruomenės indėliai
- **SDK sąrašas**: Pridėti Swift ir Rust SDK; atnaujinta specifikacijos nuoroda į 2025-11-25
- **Specifikacijos nuoroda**: Atnaujinta MCP specifikacijos nuoroda į tiesioginį specifikacijos URL

#### Modulis 07 - Pamokos iš ankstyvojo priėmimo

- **Resursų atnaujinimai**: Pridėtas MCP specifikacijos 2025-11-25 nuoroda ir OWASP MCP Top 10 prie papildomų išteklių

#### Modulis 08 - Geriausios praktikos
- **Specifikacijos versija**: Atnaujinta MCP specifikacijos nuoroda į 2025-11-25
- **Saugumo ištekliai**: Pridėti OWASP MCP Top 10 ir Sherpa dirbtuvės prie papildomų nuorodų

#### Modulis 10 - Dirbtinio intelekto darbo srautų optimizavimas
- **Ženklo atnaujinimas**: MCP versijos ženklelis pakeistas iš SDK versijos (1.9.3) į specifikacijos versiją (2025-11-25)
- **Resursų nuorodos**: Atnaujinta MCP specifikacijos nuoroda; pridėtas OWASP MCP Top 10

#### Modulis 11 - MCP serverio praktinės dirbtuvės
- **Specifikacijos nuoroda**: Atnaujinta MCP specifikacijos nuoroda į 2025-11-25 versiją
- **Saugumo ištekliai**: Pridėtas OWASP MCP Top 10 prie oficialių išteklių

## 2025 m. gruodžio 18 d.

### Saugumo dokumentacijos atnaujinimas - MCP specifikacija 2025-11-25

#### MCP saugumo gerosios praktikos (02-Security/mcp-best-practices.md) - specifikacijos versijos atnaujinimas
- **Protokolo versijos atnaujinimas**: Atnaujinta nuoroda į naujausią MCP specifikaciją 2025-11-25 (išleista 2025 m. lapkričio 25 d.)
  - Atnaujintos visos specifikacijos versijos nuorodos nuo 2025-06-18 į 2025-11-25
  - Atnaujinti dokumento datos nuorodos nuo 2025 m. rugpjūčio 18 d. į 2025 m. gruodžio 18 d.
  - Patikrinta, kad visos specifikacijos URL nurodo į dabartinę dokumentaciją
- **Turinio patikra**: Išsami saugumo gerųjų praktikų atitikties naujausiems standartams patikra
  - **Microsoft saugumo sprendimai**: Patikrinta dabartinė terminologija ir nuorodos į Prompt Shields (anksčiau "Jailbreak rizikos aptikimas"), Azure turinio saugą, Microsoft Entra ID ir Azure Key Vault
  - **OAuth 2.1 saugumas**: Patvirtintas atitikimas naujausioms OAuth saugumo gerosioms praktikoms
  - **OWASP standartai**: Patikrinta, kad OWASP Top 10 LLM nuorodos išlieka aktualios
  - **Azure paslaugos**: Patikrinta visa Microsoft Azure dokumentacijos ir gerųjų praktikų nuorodų veikla
- **Standardų atitiktis**: Visos nurodytos saugumo standartų nuorodos yra aktualios
  - NIST DI rizikų valdymo sistema
  - ISO 27001:2022
  - OAuth 2.1 saugumo gerosios praktikos
  - Azure saugumo ir atitikties sistemos
- **Įgyvendinimo ištekliai**: Patikrintos visos įgyvendinimo gido nuorodos ir ištekliai
  - Azure API valdymo autentifikacijos šablonai
  - Microsoft Entra ID integracijos vadovai
  - Azure Key Vault slaptųjų duomenų valdymas
  - DevSecOps srautai ir monitoringas

### Dokumentacijos kokybės užtikrinimas
- **Specifikacijos atitiktis**: Užtikrinta, kad visi privalomi MCP saugumo reikalavimai (TURI/NETURI) atitinka naujausią specifikaciją
- **Išteklių aktualumas**: Patikrintos visos išorinės nuorodos į Microsoft dokumentaciją, saugumo standartus ir įgyvendinimo gidus
- **Geriausios praktikos aprėptis**: Patvirtinta išsami autentifikacijos, autorizacijos, DI specifinių grėsmių, tiekimo grandinės saugumo ir įmonių modelių aprėptis

## 2025 m. spalio 6 d.

### Skyriaus „Pradžia“ išplėtimas – pažangus serverio naudojimas ir paprasta autentifikacija

#### Pažangus serverio naudojimas (03-GettingStarted/10-advanced)
- **Pridėtas naujas skyrius**: Išsamus vadovas pažangiam MCP serverio naudojimui, apimantis tiek įprastas, tiek žemo lygio serverio architektūras.
  - **Įprastas vs. žemo lygio serveris**: Išsamus palyginimas ir kodų pavyzdžiai Python bei TypeScript kalbomis abiem atvejais.
  - **Handler pagrindu kuriamas dizainas**: Paaiškinimai, kaip valdyti įrankius/ištekliai/prašymus per handlerius siekiant lankstumo ir mastelio.
  - **Praktiniai modeliai**: Realūs scenarijai, kur žemo lygio serverio modeliai naudingi pažangioms funkcijoms ir architektūrai.

#### Paprasta autentifikacija (03-GettingStarted/11-simple-auth)
- **Pridėtas naujas skyrius**: Žingsnis po žingsnio vadovas, kaip įgyvendinti paprastą autentifikaciją MCP serveriuose.
  - **Autentifikacijos koncepcijos**: Aiškus autentifikacijos ir autorizacijos skirtumo bei kredencialų tvarkymo paaiškinimas.
  - **Paprastos autentifikacijos įgyvendinimas**: Middleware pagrindu sukurti autentifikacijos šablonai Python (Starlette) ir TypeScript (Express), su kodų pavyzdžiais.
  - **Perėjimas prie pažangaus saugumo**: Vadovai, kaip pradėti nuo paprastos autentifikacijos ir pereiti prie OAuth 2.1 bei RBAC, su nuorodomis į pažangius saugumo modulius.

Šie papildymai suteikia praktiškus, tiesioginius nurodymus, kaip kurti galingesnius, saugesnius ir lankstesnius MCP serverių įgyvendinimus, sujungiant pagrindines koncepcijas su pažangiais gamybos modeliais.

## 2025 m. rugsėjo 29 d.

### MCP serverio duomenų integracijos dirbtuvės – išsamus praktinių mokymų takas

#### 11-MCPServerHandsOnLabs – nauja išsami duomenų integracijos mokymo programa
- **Pilnas 13 dirbtuvių mokymo takas**: Pridėta išsami praktinių mokymų programa, skirta gamybai paruoštų MCP serverių kūrimui su PostgreSQL integracija
  - **Realios pasaulio įgyvendinimo atvejis**: Zava Retail analitikos pavyzdys, demonstruojantis įmonės lygio modelius
  - **Struktūruotas mokymosi planas**:
    - **Dirbtuvės 00-03: Pagrindai** – Įvadas, pagrindinė architektūra, saugumas ir kelių nuomininkų palaikymas, aplinkos paruošimas
    - **Dirbtuvės 04-06: MCP serverio kūrimas** – Duomenų bazės dizainas ir schema, MCP serverio įgyvendinimas, įrankių kūrimas
    - **Dirbtuvės 07-09: Pažangios funkcijos** – Semantinės paieškos integracija, testavimas ir derinimas, VS Code integracija
    - **Dirbtuvės 10-12: Gamyba ir geriausios praktikos** – Diegimo strategijos, stebėsena ir stebimumas, geriausios praktikos ir optimizavimas
  - **Įmonių technologijos**: FastMCP karkasas, PostgreSQL su pgvector, Azure OpenAI įterptiniai modeliai, Azure konteinerių programėlės, Application Insights
  - **Pažangios funkcijos**: Eilučių lygio saugumas (RLS), semantinė paieška, kelių nuomininkų duomenų prieiga, vektorinių įterpčių naudojimas, realaus laiko stebėsena

#### Terminų standartizavimas – modulio keitimas į dirbtuves
- **Išsamus dokumentacijos atnaujinimas**: Sistemiškai atnaujinti visi README failai 11-MCPServerHandsOnLabs, pakeičiant terminą „Modulis“ į „Dirbtuvės“
  - **Skyriaus antraštės**: Pakeista „What This Module Covers“ į „What This Lab Covers“ visuose 13 dirbtuvėse
  - **Turinio aprašymas**: „This module provides...“ pakeista į „This lab provides...“ visoje dokumentacijoje
  - **Mokymosi tikslai**: „By the end of this module...“ pakeista į „By the end of this lab...“
  - **Navigacijos nuorodos**: Visos „Module XX:“ nuorodos pakeistos į „Lab XX:“ kryžminėse nuorodose ir navigacijoje
  - **Užbaigimo sekimas**: Pakeista „After completing this module...“ į „After completing this lab...“
  - **Išsaugotos techninės nuorodos**: Išlaikyti Python modulio nuorodos konfigūracijos failuose (pvz., `"module": "mcp_server.main"`)

#### Studijų vadovo patobulinimai (study_guide.md)
- **Vizualus mokymo planas**: Pridėta nauja „11. Duomenų integracijos dirbtuvės“ dalis su išsamiu dirbtuvių struktūros vaizdavimu
- **Saugyklos struktūra**: Atnaujinta nuo dešimties iki vienuolikos pagrindinių skyrių su detalia 11-MCPServerHandsOnLabs aprašymu
- **Mokymosi kelio gairės**: Patobulinti navigacijos nurodymai apimantys skyrius 00-11
- **Technologijų aprėptis**: Pridėta FastMCP, PostgreSQL, Azure paslaugų integracijos detalės
- **Mokymosi rezultatai**: Pabrėžtas gamybai paruoštų serverių kūrimas, duomenų integracijos modeliai ir įmonių saugumas

#### Pagrindinio README struktūros patobulinimai
- **Dirbtuvių terminologija**: Pagrindiniame README.md faile 11-MCPServerHandsOnLabs nuosekliai naudojama „Dirbtuvės“ struktūra
- **Mokymosi kelio organizavimas**: Aiški pažanga nuo pagrindinių koncepcijų per pažangų įgyvendinimą iki gamybos diegimo
- **Realus praktinis dėmesys**: Pabrėžiamas praktinio, rankomis atlikto mokymosi svarba su įmonių lygmens modeliais ir technologijomis

### Dokumentacijos kokybės ir nuoseklumo patobulinimai
- **Praktinių mokymų akcentas**: Sustiprintas praktinis, dirbtuvių pagrindu vykdomas požiūris dokumentacijoje
- **Įmonių modelių fokusas**: Paryškintos gamybai paruoštos įgyvendinimo ir įmonių saugumo svarbos
- **Technologijų integracija**: Išsami šiuolaikinių Azure paslaugų ir DI integracijos modelių aprėptis
- **Mokymosi progreso struktūra**: Aiškus ir struktūruotas kelias nuo pagrindų iki gamybos

## 2025 m. rugsėjo 26 d.

### Atvejų studijų patobulinimai – GitHub MCP registracijos integracija

#### Atvejų studijos (09-CaseStudy/) – ekosistemos plėtojimo fokusas
- **README.md**: Pagrindinis plėtinys su išsamiu GitHub MCP registracijos atvejo studija
  - **GitHub MCP registracijos atvejo studija**: Nauja išsami atvejo studija apie GitHub MCP registracijos paleidimą 2025 m. rugsėjį
    - **Problemos analizė**: Išsamus fragmentuoto MCP serverių aptikimo ir diegimo iššūkių nagrinėjimas
    - **Sprendimo architektūra**: GitHub centralizuotos registracijos sprendimas su vieno paspaudimo VS Code įdiegimu
    - **Verslo poveikis**: Matuojami pagerėjimai kūrėjų įsisavinimo ir produktyvumo srityse
    - **Strateginė vertė**: Modulinio agentų diegimo ir įrankių tarpusavio sąveikos akcentavimas
    - **Ekosistemos plėtra**: Pozicionavimas kaip pagrindinė agentinės integracijos platforma
  - **Patobulinta atvejo studijų struktūra**: Atnaujintos visos septynios atvejų studijos nuosekliai su išsamiais aprašymais
    - Azure DI kelionių agentai: daugiaagentinė orkestracija
    - Azure DevOps integracija: darbo srautų automatizavimas
    - Realaus laiko dokumentacijos gavimas: Python konsolės klientas
    - Interaktyvus mokymosi plano generatorius: Chainlit pokalbių žiniatinklio programa
    - Redaktoriaus viduje esanti dokumentacija: VS Code ir GitHub Copilot integracija
    - Azure API valdymas: įmonių lygmens API integracijos modeliai
    - GitHub MCP registracija: ekosistemos plėtra ir bendruomenės platforma
  - **Išsami išvada**: Perrašytas išvados skyrius, pabrėžiantis septynias atvejų studijas, apimančias keletą MCP įgyvendinimo aspektų
    - Įmonių integracija, daugiaagentinė orkestracija, kūrėjų produktyvumas
    - Ekosistemos plėtra, švietimo programų kategorija
    - Išplėsti įžvalgų apie architektūros modelius, įgyvendinimo strategijas ir gerąsias praktikas
    - Akcentas MCP kaip brandžios, gamybai paruoštos protokolo svarbai

#### Studijų vadovo atnaujinimai (study_guide.md)
- **Vizualus mokymo planas**: Atnaujintas minčių žemėlapis, įtraukiant GitHub MCP registraciją į atvejų studijų skyrių
- **Atvejų studijų aprašymai**: Išplėsti nuo bendrų aprašymų iki išsamaus septynių atvejų studijų suskirstymo
- **Saugyklos struktūra**: Atnaujintas 10 skyrius, kad atspindėtų išsamią atvejo studijų aprėptį su konkrečiais įgyvendinimo duomenimis
- **Pakeitimų žurnalas**: Pridėta 2025 m. rugsėjo 26 d. įrašo apie GitHub MCP registracijos pridėjimą ir atvejo studijų patobulinimus
- **Datos atnaujinimai**: Atnaujintas poraštės laiko žymėjimas, atspindintis naujausią peržiūrą (2025 m. rugsėjo 26 d.)

### Dokumentacijos kokybės patobulinimai
- **Nuoseklumo gerinimas**: Standartizuota atvejų studijų formatas ir struktūra visuose septyniuose pavyzdžiuose
- **Išsami aprėptis**: Atvejų studijos dabar apima įmonių, kūrėjų produktyvumo ir ekosistemos plėtros scenarijus
- **Strateginis pozicionavimas**: Sustiprintas dėmesys MCP kaip pagrindinei agentinės sistemos diegimo platformai
- **Resursų integracija**: Papildomuose ištekliuose pridėta GitHub MCP registracijos nuoroda

## 2025 m. rugsėjo 15 d.

### Pažangių temų plėtra – individualūs transportai ir konteksto inžinerija

#### MCP individualūs transportai (05-AdvancedTopics/mcp-transport/) – naujas pažangios įgyvendinimo vadovas
- **README.md**: Pilnas vadovas, kaip įgyvendinti individualius MCP transportus
  - **Azure Event Grid transportas**: Išsamus be serverio įvykių valdomas transporto įgyvendinimas
    - C#, TypeScript ir Python pavyzdžiai su Azure Functions integracija
    - Įvykių varomosios architektūros modeliai mastelio MCP sprendimams
    - Webhook’imų priėmėjai ir pranešimų push valdymas
  - **Azure Event Hubs transportas**: Aukšto pralaidumo srautinio duomenų transporto įgyvendinimas
    - Realaus laiko srautų galimybės mažo delsimo scenarijoms
    - Skirstymo strategijos ir kontrolinių taškų valdymas
    - Pranešimų grupavimas ir našumo optimizavimas
  - **Įmonių integracijos modeliai**: Gamybai paruošti architektūros pavyzdžiai
    - Paskirstytas MCP apdorojimas per kelias Azure Functions
    - Hibridinės transporto architektūros, derinančios kelis transporto tipus
    - Pranešimų patvarumo, patikimumo ir klaidų tvarkymo strategijos
  - **Sauga ir stebėsena**: Azure Key Vault integracija ir stebimumo modeliai
    - Valdomos tapatybės autentifikacija ir mažiausių teisių prieiga
    - Application Insights telemetrija ir našumo stebėsena
    - Grandinių pertraukikliai ir atsparumo gedimams modeliai
  - **Testavimo sistemos**: Išsamios testavimo strategijos individualiems transportams
    - Vienetinių testų rašymas su testų stub’ais ir maketavimo bibliotekomis
    - Integraciniai testai su Azure Test Containers
    - Našumo ir apkrovos testavimo aspektai

#### Konteksto inžinerija (05-AdvancedTopics/mcp-contextengineering/) – nauja DI disciplinos sritis
- **README.md**: Išsamus konteksto inžinerijos kaip naujos srities tyrimas
  - **Pagrindiniai principai**: Pilnas konteksto dalijimasis, sprendimų priėmimo veiksmai ir konteksto lango valdymas
  - **MCP protokolo atitikimas**: Kaip MCP dizainas sprendžia konteksto inžinerijos iššūkius
    - Konteksto lango apribojimai ir palaipsnio užkrovimo strategijos
    - Aktualumo nustatymas ir dinaminis konteksto gavimas
    - Daugiabūdžio konteksto tvarkymas ir saugumo klausimai
  - **Įgyvendinimo būdai**: Vieno gijos prieš daugiaagentės architektūros
    - Konteksto gabalėlių grupavimas ir prioritetų taikymas
    - Palaipsnis konteksto užkrovimas ir suspaudimo metodikos
    - Sluoksniuotos konteksto tvarkymo priemonės ir gavimo optimizavimas
  - **Vertinimo sistema**: Naujų konteksto efektyvumo matavimo rodiklių kūrimas
    - Įvesties efektyvumas, našumas, kokybė ir vartotojo patirtis
    - Eksperimentinės konteksto optimizavimo priemonės
    - Gedimų analizė ir tobulinimo metodikos

#### Mokymo programos navigacijos atnaujinimai (README.md)
- **Patobulinta modulio struktūra**: Atnaujinta mokymo plano lentelė, įtraukiant naujas pažangias temas
  - Pridėta konteksto inžinerijos (5.14) ir individualaus transporto (5.15) įrašai
  - Nuoseklus formatavimas ir navigacijos nuorodos visuose moduliuose
  - Atnaujinti aprašymai, atspindintys dabartinį turinio apimtį

### Aplanko struktūros patobulinimai
- **Pavadinimų standartizavimas**: „mcp transport“ pervadinta į „mcp-transport“, siekiant atitikti kitų pažangių temų aplankų pavadinimus
- **Turinio organizavimas**: Visi 05-AdvancedTopics aplankai dabar vadinami pagal vieningą modelį (mcp-[tema])

### Dokumentacijos kokybės gerinimas
- **MCP specifikacijos atitikimas**: Visi nauji turiniai nurodo dabartinę MCP specifikaciją 2025-06-18
- **Daugiakalbiai pavyzdžiai**: Išsamūs kodo pavyzdžiai C#, TypeScript ir Python kalbomis

- **Įmonių dėmesys**: Produkcijai paruošti modeliai ir integracija su Azure debesimi visame procese
- **Vizuali dokumentacija**: Mermaid diagramos architektūros ir srautų vizualizavimui

## 2025 m. rugpjūčio 18 d.

### Išsamus dokumentacijos atnaujinimas - MCP 2025-06-18 standartai

#### MCP saugumo geriausios praktikos (02-Security/) - visiška modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: visiškas perrašymas, suderintas su MCP specifikacija 2025-06-18
  - **Privalomi reikalavimai**: pridėti aiškūs TURĖTI / NEDARYTI reikalavimai iš oficialios specifikacijos su aiškiais vizualiniais ženklais
  - **12 pagrindinių saugumo praktikų**: pertvarkytos iš 15 punkto sąrašo į išsamias saugumo sritis
    - Žetonų saugumas ir autentifikacija su išorinių tapatybės tiekėjų integracija
    - Sesijų valdymas ir transporto saugumas su kriptografiniais reikalavimais
    - AI specifinis grėsmių apsauga su Microsoft Prompt Shields integracija
    - Prieigos kontrolė ir leidimai pagal mažiausio privilegijų principą
    - Turinys saugumas ir stebėsena su Azure Content Safety integracija
    - Tiekimo grandinės saugumas su išsamia komponentų patikra
    - OAuth saugumas ir painaus tarpininko prevencija su PKCE įgyvendinimu
    - Incidentų reagavimas ir atkūrimas su automatizuotomis funkcijomis
    - Atitiktis ir valdymas su reguliavimo reikalavimais
    - Pažangios saugumo kontrolės su zero trust architektūra
    - Microsoft saugumo ekosistemos integracija su išsamiais sprendimais
    - Nuolatinė saugumo evoliucija su adaptacinėmis praktikomis
  - **Microsoft saugumo sprendimai**: patobulinti integracijos nurodymai Prompt Shields, Azure Content Safety, Entra ID ir GitHub Advanced Security sričiai
  - **Įgyvendinimo šaltiniai**: suskirstyti išsamūs nuorodų rinkiniai į oficialią MCP dokumentaciją, Microsoft saugumo sprendimus, saugumo standartus ir įgyvendinimo vadovus

#### Pažangios saugumo kontrolės (02-Security/) - įmonių lygio įgyvendinimas
- **MCP-SECURITY-CONTROLS-2025.md**: visiškas pertvarkymas su įmonių lygio saugumo sistema
  - **9 išsamios saugumo sritys**: išplečtos nuo pagrindinių kontrolės priemonių iki detalaus įmonių lygio sistemos
    - Pažangi autentifikacija ir autorizacija su Microsoft Entra ID integracija
    - Žetonų saugumas ir anti-praėjimo kontrolės su išsamia patikra
    - Sesijų saugumo kontrolės su pagrobimo prevencija
    - AI specifiniai saugumo kontrolės su užklausų įpurškimo ir įrankių užnuodijimo prevencija
    - Painaus tarpininko atakos prevencija su OAuth proxy saugumu
    - Įrankių vykdymo saugumas su smėlio dėžės ir izoliacijos mechanizmais
    - Tiekimo grandinės saugumo kontrolės su priklausomybių patikra
    - Stebėjimo ir aptikimo kontrolės su SIEM integracija
    - Incidentų reagavimas ir atkūrimas su automatizuotomis funkcijomis
  - **Įgyvendinimo pavyzdžiai**: pridėti išsamūs YAML konfigūracijos blokai ir kodo pavyzdžiai
  - **Microsoft sprendimų integracija**: išsamus Azure saugumo paslaugų, GitHub Advanced Security ir įmonių tapatybės valdymo aprašymas

#### Pažangių temų saugumas (05-AdvancedTopics/mcp-security/) - produkcijai paruoštas įgyvendinimas
- **README.md**: visiškas perrašymas įmonių lygio saugumo įgyvendinimui
  - **Esamos specifikacijos suderinimas**: atnaujintas pagal MCP specifikaciją 2025-06-18 su privalomais saugumo reikalavimais
  - **Patobulinta autentifikacija**: Microsoft Entra ID integracija su išsamiais .NET ir Java Spring Security pavyzdžiais
  - **AI saugumo integracija**: Microsoft Prompt Shields ir Azure Content Safety įgyvendinimas su detaliais Python pavyzdžiais
  - **Pažangių grėsmių mažinimas**: išsamūs įgyvendinimo pavyzdžiai
    - Painaus tarpininko atakos prevencija su PKCE ir vartotojo sutikimo patikra
    - Žetonų praėjimo prevencija su auditorijos patikra ir saugiu žetonų valdymu
    - Sesijos pagrobimo prevencija su kriptografine susiejimo ir elgesio analize
  - **Įmonės saugumo integracija**: Azure Application Insights stebėjimas, grėsmių aptikimo pipeline'ai ir tiekimo grandinės saugumas
  - **Įgyvendinimo kontrolinis sąrašas**: aiškiai atskirti privalomi ir rekomenduojami saugumo valdikliai su Microsoft saugumo ekosistemos privalumais

### Dokumentacijos kokybė ir standartų derinimas
- **Specifikacijų nuorodos**: atnaujintos visos nuorodos į dabartinę MCP specifikaciją 2025-06-18
- **Microsoft saugumo ekosistema**: patobulinti integracijos nurodymai visoje saugumo dokumentacijoje
- **Praktinis įgyvendinimas**: pridėti išsamūs kodo pavyzdžiai .NET, Java ir Python su įmonių modeliais
- **Šaltinių organizavimas**: išsami oficialios dokumentacijos, saugumo standartų ir įgyvendinimo vadovų kategorizacija
- **Vizualūs indikatoriai**: aiškus privalomų reikalavimų ir rekomenduojamų praktikų žymėjimas


#### Pagrindinės sąvokos (01-CoreConcepts/) - visiška modernizacija
- **Protokolo versijos atnaujinimas**: atnaujinta nuoroda į dabartinę MCP specifikaciją 2025-06-18 su datomis pagrįsta versija (YYYY-MM-DD formatu)
- **Architektūros patobulinimai**: patobulinti šeimininkų, klientų ir serverių aprašymai atspindintys dabartinius MCP architektūros modelius
  - Šeimininkai dabar aiškiai apibrėžti kaip AI programos koordinuojančios kelis MCP klientų ryšius
  - Klientai aprašyti kaip protokolo jungtys palaikančios vienas prie vieno serverio ryšį
  - Serveriai patobulinti su vietinių ir nuotolinių diegimo scenarijais
- **Pirminių elementų pertvarkymas**: visiškas serverių ir klientų pirminių elementų peržiūrėjimas
  - Serverių pirminiai elementai: Resursai (duomenų šaltiniai), Pasiūlymai (šablonai), Įrankiai (vykdomos funkcijos) su išsamiais paaiškinimais ir pavyzdžiais
  - Klientų pirminiai elementai: imties gavimas (LLM užbaigimai), informacijos rinkimas (naudotojo įvestis), registravimas (derinimas / stebėjimas)
  - Atnaujinti dabartiniai atradimo (`*/list`), gavimo (`*/get`) ir vykdymo (`*/call`) metodų modeliai
- **Protokolo architektūra**: įvesta dviejų sluoksnių architektūros modelis
  - Duomenų sluoksnis: JSON-RPC 2.0 pagrindas su gyvenimo ciklo valdymu ir pirminiais elementais
  - Transporto sluoksnis: STDIO (vietinis) ir nuotolinis Streamable HTTP su SSE transporto mechanizmais
- **Saugumo sistema**: išsamios saugumo principų apžvalga įskaitant aiškų vartotojo sutikimą, duomenų privatumo apsaugą, įrankių vykdymo saugumą ir transporto sluoksnio saugumą
- **Komunikacijos modeliai**: atnaujinti protokolo pranešimai rodo inicijavimą, atradimą, vykdymą ir pranešimų srautus
- **Kodo pavyzdžiai**: atnaujinti daugialypės kalbos pavyzdžiai (.NET, Java, Python, JavaScript) atspindintys dabartinius MCP SDK modelius

#### Saugumas (02-Security/) - išsamus saugumo pertvarkymas  
- **Standartų suderinimas**: visiškas suderinimas su MCP specifikacijos 2025-06-18 saugumo reikalavimais
- **Autentifikacijos evoliucija**: dokumentuota evoliucija nuo specializuotų OAuth serverių iki išorinių tapatybės tiekėjų delegavimo (Microsoft Entra ID)
- **AI specifinių grėsmių analizė**: pagerintas šiuolaikinių AI atakų vektorių aprėptis
  - Detalios užklausų įpurškimo atakos scenarijos su realiais pavyzdžiais
  - Įrankių užnuodijimo mechanizmai ir "rug pull" atakų modeliai
  - Konteksto lango užnuodijimo ir modelio painiavos atakos
- **Microsoft AI saugumo sprendimai**: išsami Microsoft saugumo ekosistemos aprėptis
  - AI Prompt Shields su pažangiu aptikimu, išryškinimu ir riboto žymėjimo technikomis
  - Azure Content Safety integracijos modeliai
  - GitHub Advanced Security tiekimo grandinės apsaugai
- **Pažangių grėsmių mažinimas**: detalios saugumo kontrolės
  - Sesijos pagrobimas su MCP specifinėmis atakų scenarijomis ir kriptografiškai saugiais sesijos ID reikalavimais
  - Painaus tarpininko problemos MCP proxy scenarijuose su aiškiais vartotojo sutikimo reikalavimais
  - Žetonų praėjimo pažeidžiamumai su privaloma patikros kontrole
- **Tiekimo grandinės saugumas**: išplėsta AI tiekimo grandinės aprėptis įskaitant bazinius modelius, įterpimų paslaugas, konteksto tiekėjus ir trečiųjų šalių API
- **Pagrindinis saugumas**: pagerinta integracija su įmonių saugumo modeliais, įskaitant zero trust architektūrą ir Microsoft saugumo ekosistemą
- **Šaltinių organizavimas**: suskirstyti išsamūs resursų nuorodų sąrašai pagal tipą (Oficiali dokumentacija, Standartai, Tyrimai, Microsoft sprendimai, Įgyvendinimo vadovai)

### Dokumentacijos kokybės patobulinimai
- **Struktūruoti mokymosi tikslai**: patobulinti mokymosi tikslai su specifiniais, praktiškais rezultatais
- **Kryžminės nuorodos**: pridėtos nuorodos tarp susijusių saugumo ir pagrindinių sąvokų temų
- **Dabartinė informacija**: atnaujintos visos datos ir specifikacijų nuorodos pagal dabartinius standartus
- **Įgyvendinimo gairės**: pridėtos specifinės ir praktiškos įgyvendinimo rekomendacijos abiejuose skyriuose

## 2025 m. liepos 16 d.

### README ir navigacijos patobulinimai
- Visiškai pertvarkyta mokymo plano navigacija README.md faile
- Pakeisti `<details>` žymės į prieinamesnį lentelės formatą
- Sukurti alternatyvūs maketai naujame "alternative_layouts" aplanke
- Pridėti kortelių, skirtukų ir akordeono tipo navigacijos pavyzdžiai
- Atnaujinta saugyklos struktūra su naujausių failų apžvalga
- Patobulinta skiltis "Kaip naudotis šiuo mokymo planu" su aiškiomis rekomendacijomis
- Atnaujintos MCP specifikacijos nuorodos su teisingais URL adresais
- Pridėta kontekstinės inžinerijos skiltis (5.14) mokymo plane

### Studijų vadovo atnaujinimai
- Visiškai perrašytas studijų vadovas suderinimui su dabartine saugyklos struktūra
- Pridėtos naujos MCP klientų ir įrankių bei populiarių MCP serverių skiltys
- Atnaujinta vizuali mokymo plano schema su tiksliu visų temų atvaizdavimu
- Patobulinti pažangių temų aprašymai apimant visus specializuotus sritis
- Atnaujinta atvejų studijų skiltis atspindint realius pavyzdžius
- Pridėtas šis išsamus pakeitimų žurnalas

### Bendruomenės indėliai (06-CommunityContributions/)
- Pridėta išsami informacija apie MCP serverius vaizdų generavimui
- Pridėta išsami skyrius apie Claude naudojimą VSCode aplinkoje
- Pridėti Cline terminalo kliento nustatymai ir naudojimo instrukcijos
- Atnaujinta MCP klientų skiltis su visomis populiariausiomis kliento galimybėmis
- Patobulinti indėlių pavyzdžiai su tikslesniais kodo pavyzdžiais

### Pažangios temos (05-AdvancedTopics/)
- Suorganizuoti visi specializuoti temų aplankai su nuosekliais pavadinimais
- Pridėta kontekstinės inžinerijos mokymo medžiaga ir pavyzdžiai
- Pridėta Foundry agento integracijos dokumentacija
- Patobulinta Entra ID saugumo integracijos dokumentacija

## 2025 m. birželio 11 d.

### Pradinis sukūrimas
- Išleista pirmoji MCP pradedantiesiems mokymo plano versija
- Sukurta pagrindinė visas 10 pagrindinių skyrių struktūra
- Įdiegta vizuali mokymo plano schema navigacijai
- Pridėti pradinių pavyzdžių projektai keliose programavimo kalbose

### Pradžia (03-GettingStarted/)
- Sukurti pirmieji serverių įgyvendinimo pavyzdžiai
- Pridėta klientų kūrimo gairių
- Įtrauktos LLM klientų integracijos instrukcijos
- Pridėta VS Code integracijos dokumentacija
- Įdiegti Server Sent Events (SSE) serverio pavyzdžiai

### Pagrindinės sąvokos (01-CoreConcepts/)
- Pridėtas išsamus kliento-serverio architektūros paaiškinimas
- Sukurta dokumentacija apie pagrindines protokolo sudedamąsias dalis
- Dokumentuotas MCP žinučių modelis

## 2025 m. gegužės 23 d.

### Saugyklos struktūra
- Inicializuota saugykla su pagrindine aplankų struktūra
- Sukurti README failai kiekvienam pagrindiniam skyriui
- Įdiegta vertimo infrastruktūra
- Pridėti vaizdo failai ir diagramos

### Dokumentacija
- Sukurtas pradinės README.md failas su mokymo plano apžvalga
- Pridėti CODE_OF_CONDUCT.md ir SECURITY.md failai
- Sukurtas SUPPORT.md failas su pagalbos gavimo gairėmis
- Sukurta preliminari studijų vadovo struktūra

## 2025 m. balandžio 15 d.

### Planavimas ir sistema
- Pradinis MCP pradedantiesiems mokymo plano planavimas
- Apibrėžti mokymosi tikslai ir tikslinė auditorija
- Aprašyta 10 skyrių mokymo plano struktūra
- Sukurtas konceptualus pavyzdžių ir atvejų studijų pagrindas
- Paruošti pirminiai prototipų pavyzdžiai esminėms sąvokoms

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->