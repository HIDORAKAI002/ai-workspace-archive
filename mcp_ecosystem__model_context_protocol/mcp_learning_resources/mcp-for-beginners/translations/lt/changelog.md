# Pakeitimų žurnalas: MCP pradedantiesiems mokymo programa

Šis dokumentas fiksuoja visas svarbias Model Context Protocol (MCP) pradedantiesiems mokymo programos pakeitimus. Pakeitimai dokumentuojami atvirkštine chronologine tvarka (naujausi pakeitimai pirmiausia).

## 2026 m. birželio 16 d.

### MCP specifikacijos suderinimas ir pavyzdžių tikrinimas

Patvirtinta mokymo programa pagal dabartinę **MCP Specification 2025-11-25** ir naujausius oficialius SDK, pataisyti likę pasenę specifikacijos atnaujinimai ir patvirtinta, kad pagrindiniai pavyzdžiai vis dar kompiliuojasi ir veikia.

#### Specifikacijos versijos pataisymai (2025-06-18 / 2025-03-26 → 2025-11-25)

Atnaujintas angliškas turinys, kuriame vis dar teigta, kad senesnė specifikacijos versija yra *dabartinė/naujausia* standartinė, ir pakeisti nuorodų adresai į kanoninį `modelcontextprotocol.io` specifikacijos kelią:
- **05-AdvancedTopics/mcp-security/README.md**: Atnaujintas „Dabartinis standartas“ antraštės ženklas, įvadas, pagrindinių saugumo principų antraštė, privalomų reikalavimų antraštė, Microsoft Entra ID skyrius, nuorodos į šaltinius ir ištekliai, bei uždarymo saugumo pranešimas (8 nuorodos) į 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atnaujinta papildomų išteklių specifikacijos nuoroda ir „Dabartinis standartas“ ženklas į 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Pakeistas pasenęs `2025-03-26` saugumo ir pasitikėjimo nuoroda nauja į dabartinę 2025-11-25 saugumo geriausių praktikų puslapį
- **03-GettingStarted/14-sampling/README.md**: Atnaujinta oficialių mėginių ėmimo dokumentacijos nuoroda į 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atnaujinta „dabartinės MCP specifikacijos“ nuoroda esamu laiku ir papildomų išteklių specifikacijos nuoroda į 2025-11-25 (istorinės SSE nutraukimo pastabos paliktos tikslumui)

#### Pavyzdžių tikrinimas pagal dabartinius SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` įdiegė `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` praeita be tipų klaidų — esami `McpServer`/`StdioServerTransport` API išlieka galiojantys
- **Python (03-GettingStarted/01-first-server/solution/python)**: Patikrinta izoliuotoje `.venv` naudojant `mcp[cli]` (1.27.2); `py_compile` praeita, o `FastMCP.list_tools()` teisingai grąžino `add` ir `subtract` įrankius
- Patvirtinta, kad visi pavyzdžių `@modelcontextprotocol/sdk` versijų intervalai (`>=1.26.0` / `^1.26.0` / `^1.27.0`) sklandžiai išsprendžiami į dabartinę `1.29.0` be API pakeitimų

#### Priklausomybių fiksavimo sulyginimas (uždarant versijų spragas)

Atnaujinti pasenę SDK fiksai, kad kiekvienas pavyzdys naudotų dabartinę MCP versiją, atitinkant repozitorijos konvenciją:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Pakeltas `@modelcontextprotocol/sdk` nuo `^1.8.0` iki `>=1.26.0` ir atnaujintas pasenęs paketo aprašymas „updated for MCP 2025-06-18“ į „aligned with MCP Specification 2025-11-25“
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ir **lab4/code/github_mcp_server/pyproject.toml**: Pakeltas tikslus fiksas `mcp==1.23.0` į `mcp>=1.26.0`; abu `uv.lock` failai perkurti (`uv lock`), todėl užrakto failai išsprendžiami į dabartinę `mcp 1.27.2` ir sinchronizuojami su manifestais

#### Mokymo programos spragų analizė — paskutinės specifikacijos funkcijų apimtis

Patikrinta, kad mokymo programa jau aprėpia visas MCP 2025-11-25 įvestas/plečiamas primityvas, taigi nėra turinio spragų:
- **Mėginių ėmimas**: pamoka 03-GettingStarted/14-sampling ir 05-AdvancedTopics/mcp-sampling
- **Iškėlimas (įskaitant URL režimą)**: dokumentuota 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features
- **Šaknys**: dokumentuota 00-Introduction, 01-CoreConcepts ir 05-AdvancedTopics/mcp-root-contexts
- **Užduotys (eksperimentinės, ilgalaikės operacijos)**: dokumentuota 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features
- **Įrankių anotacijos** (`readOnlyHint` / `destructiveHint`): dokumentuota 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features

### Saugumo stiprinimas ir priklausomybių pažeidžiamumų šalinimas

Atliktas pilnas saugumo patikrinimas visų priklausomybių manifestuose ir pavyzdžių šaltinio kode, po to pašalinti visi pranešti npm įspėjimai ir vienas kodų lygio pažeidžiamumas. Po pataisos, `npm audit` neberodo jokių pažeidžiamumų kiekviename tikrintame kataloge.

#### npm priklausomybių pažeidžiamumai (perdaviniai) — ištaisyti

Ištirti visi 15 įsirašytų `package-lock.json` failų. Pažeidžiamumai buvo riboti į perdavines priklausomybes, įtrauktas MCP Inspector kūrimo įrankio, OpenAI kliento ir MCP SDK; visi dabar išspręsti nepažeidžiant pavyzdžių:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ir **lab3/code/weather_mcp/inspector**: Pakeltas `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), kas išvalė susietus `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ir `ws` įspėjimus. Pridėta npm `overrides` įrašas, priversiantis pataisytą `shell-quote@1.8.4`, kad pašalintų likusį kritinį įspėjimą, kurį nešė `concurrently`; abu užrakto failai perkurti (dabar 0 pažeidžiamumų)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atnaujino perduodamą `qs` (vidutinis) į pataisytą leidimą
- **03-GettingStarted/samples/javascript**: `npm audit fix` atnaujino perduodamą `hono` (vidutinis) į pataisytą leidimą
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atnaujino perduodamą `form-data` (didelis) į pataisytą leidimą
- **03-GettingStarted/11-simple-auth/solution/typescript**: Sugeneruotas trūkstamas `package-lock.json`, kad projektas būtų atkuriamas ir turi audito galimybę (0 pažeidžiamumų)

#### Kodo lygio saugumo pataisa (OWASP A03: injekcija)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Pašalintas `shell=True` iš `open_in_vscode` įrankio. Ankstesnis `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` leido apdoroti shell metacharakterius aplankų keliuose per `cmd.exe` (komandų injekcijos rizika). Dabar tiesiogiai paleidžiamas išspręstas `Code.exe` su aplanku kaip argumentu — be shell — funkcionaliai lygu ir saugu

#### Python priklausomybių auditas

- Patikrinta visų Python reikalavimų rinkiniai naudojant `pip-audit`. `05-AdvancedTopics` ir `03-GettingStarted/samples/python` nepranešė apie jokių žinomų pažeidžiamumų (jų `mcp` / `httpx` / `pydantic` / `python-dotenv` versijų intervalai išsprendžiami į dabartines pataisytas versijas)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` užfiksavo perduodamą priklausomybę **`werkzeug` 3.1.1** su trimis `safe_join` Windows įrenginių vardo DoS įspėjimais — `CVE-2025-66221`, `CVE-2026-21860` ir `CVE-2026-27199` (visi ištaisyti 3.1.6). Pridėtas aiškus saugumo fiksas `werkzeug>=3.1.6`, kad būtų išspręsta įsigyta pataisyta versija; patikrinta, kad apribojimas išsprendžiamas sklandžiai su `chainlit` / `mcp` / `semantic-kernel` paketu

### Produkto pavadinimo pervardijimas

Atnaujintas visas mokymo programos turinys, kad atspindėtų Microsoft produktų pervardijimą:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Atnaujinta Discord bendruomenės nuoroda
- **AGENTS.md**: Atnaujintas Discord serverio paminėjimas
- **README.md**: Atnaujinti technologijų ekosistemos paminėjimai
- **study_guide.md**: Atnaujinti atvejo studijų paminėjimai
- **05-AdvancedTopics/README.md**: Atnaujintas 5.13 modulio pavadinimas ir aprašymas
- **05-AdvancedTopics/mcp-integration/README.md**: Atnaujinta skyriaus antraštė ir aprašymas
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Visas modulio pavadinimas ir turinys atnaujintas
- **05-AdvancedTopics/mcp-security-entra/README.md**: Atnaujinta tarpinė nuoroda
- **07-LessonsfromEarlyAdoption/README.md**: Atnaujinti atvejo studijų paminėjimai
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Atnaujinta 9 skyriaus antraštė, ženkleliai ir galimybės
- **08-BestPractices/README.md**: Atnaujinta Discord bendruomenės nuoroda
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Atnaujinta Discord kanalo nuoroda
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Atnaujinta modelio diegimo nuoroda
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Atnaujinta DI paslaugų lentelė
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Atnaujinti išteklių paminėjimai

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Atnaujinti pagrindiniai mokymo programos paminėjimai
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Atnaujintas modulio pavadinimas, apžvalga ir visi modulio antraštės
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Atnaujintas pavadinimas, mokymosi tikslai, diegimo instrukcijos ir ištekliai
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Atnaujintas pavadinimas, mokymosi tikslai, MCP serverių lentelė ir tarpinės nuorodos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Atnaujintas pavadinimas, ženkleliai, išankstinės sąlygos ir ištekliai
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Atnaujinti Agent Builder paminėjimai ir atsiliepimų nuoroda
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Atnaujintos išankstinės sąlygos ir plėtinio nuorodos

---

## 2026 m. balandžio 11 d.

### Nauja pamoka, dokumentacijos pataisymai ir priklausomybių atnaujinimai

#### Pridėtas naujas mokymo programos turinys

**05 modulis - Išplėstiniai dalykai**
- **Pamoka 5.17: Priešinga daugiapolė agentų samprotavimas su MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Naujas išsamus vadovas, apimantis priešiško debato modelį daugiapoliams sistemoms
  - Mermaid architektūros diagrama: du agentai → bendras MCP serveris → debato transkriptas → teisėjas → sprendimas
  - Bendras MCP įrankių serveris (`web_search` + `run_python`), įgyvendintas Python ir TypeScript
  - Priešiški sistemos raginimai (UŽ / PRIEŠ / Teisėjas) su aiškiais įrankių naudojimo reikalavimais
  - Debato organizatorius Python, TypeScript ir C#, valdantis raundus ir maršrutuojantis argumentus
  - MCP `ClientSession` sujungimas su tikrais įrankių kvietimais
  - Naudojimo atvejų lentelė (haliucinacijų aptikimas, grėsmių modeliavimas, API dizaino peržiūra, faktų patikrinimas, technologijų pasirinkimas)
  - Saugumo svarstymai: izoliuota vykdymo aplinka, įrankių kvietimų patikra, greičio ribojimas, audito žurnalas
  - Struktūruota pratimo dalis su trimis praktiniais scenarijais (kodo peržiūra, architektūros sprendimas, turinio moderavimas)

#### Dokumentacijos pataisymai

**03 modulis - Pradžia**
- **05-stdio-server/README.md**: Ištaisyta nepilna TypeScript stdio serverio pavyzdys — pridėtas trūkstamas transporto sukūrimas (`new StdioServerTransport()`) ir `server.connect(transport)` kvietimas, atitinkantis Python ir .NET pavyzdžius tame pačiame skyriuje
- **14-sampling/README.md**: Ištaisyta klaida — pataisyta „Sampling is an davanced features“ → „Sampling is an advanced feature“

#### Mokymo programos atnaujinimai

**Pagrindinis README.md**
- Pridėtas įrašas 5.17 (Priešinga daugiapolė agentų samprotavimas su MCP) mokymo lentelėje su tiesiogine nuoroda į naują pamoką

**05-AdvancedTopics/README.md**
- Pridėtas pamokos 5.17 eilutė prie pamokų lentelės

**study_guide.md**
- Pridėta Priešinės daugiapolių agentų samprotavimo tema minties žemėlapyje ir prozos aprašyme apie Išplėtinius dalykus

#### Kodo ir saugumo pataisymai

**05 modulis - Priešiški agentai (`mcp-adversarial-agents`)**
- **Saugumo pataisa — komandų injekcija**: TypeScript `run_python` įrankyje pakeistas `execSync` su šel shell interpolacija į `execFile` + `promisify`, pašalinant komandų injekcijos paviršių (LLM valdomas kodas dabar perduodamas kaip literalis argv elementas be šel apdorojimo)
- **MCP įrankio ciklo sujungimas**: Patobulintas Python diskusijų režisierius, kad naudotų `AsyncAnthropic` klientą (pakeičiant blokuojantį sinchroninį `Anthropic`), kiekvienam agento veiksmui perduodant tiesioginę `ClientSession`, įrankių apibrėžimus gaunant per `session.list_tools()` kiekvieną kartą ir siunčiant `tool_use` blokus per `session.call_tool()` cikle, kol modelis pateikia galutinį teksto atsakymą

#### Priklausomybių atnaujinimai

- Pakeltas `hono` iki 4.12.12 keliuose paketuose (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Pakeltas `@hono/node-server` nuo 1.19.11 iki 1.19.13 TypeScript paketuose
- Pakeltas `cryptography` nuo 46.0.5 iki 46.0.7 Python paketuose (10-StreamliningAIWorkflows laboratorijos 3 ir 4)
- Pakeltas `lodash` nuo 4.17.23 iki 4.18.1 10-StreamliningAIWorkflows inspektoriuje

#### Vertimai

- Sinchronizuoti vertimai daugiau nei 48 kalboms su naujausiais šaltinio pakeitimais (i18n atnaujinimas)

---

## 2026 m. vasario 5 d.

### Visas saugyklos validavimas ir navigacijos patobulinimai

#### Pridėtas naujas mokymo turinys

**Modulis 03 - Pradžia**
- **12-mcp-hosts/README.md**: Naujas išsamus vadovas MCP šeimininkų nustatymui
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigūracijos pavyzdžiai
  - JSON konfigūracijos šablonai visiems pagrindiniams šeimininkams
  - Transporto tipų palyginimo lentelė (stdio, SSE/HTTP, WebSocket)
  - Dažniausiai pasitaikančių ryšio problemų sprendimas
  - Saugumo gerosios praktikos šeimininko konfigūravimui

- **13-mcp-inspector/README.md**: Naujas MCP inspektoriaus derinimo vadovas
  - Įdiegimo būdai (npx, npm global, iš šaltinio)
  - Ryšys su serveriais per stdio ir HTTP/SSE
  - Testavimo įrankiai, ištekliai ir komandų srautai
  - VS Code integracija su MCP inspektoriumi
  - Dažnai pasitaikančios derinimo situacijos su sprendimais

**Modulis 04 - Praktinė įgyvendinimas**
- **pagination/README.md**: Naujas puslapiavimo įgyvendinimo vadovas
  - Kursoriaus pagrindu veikiantys puslapiavimo šablonai Python, TypeScript, Java kalbomis
  - Puslapio tvarkymas kliento pusėje
  - Kursoriaus dizaino strategijos (nepermatomas prieš struktūrizuotą)
  - Veikimo optimizavimo rekomendacijos

**Modulis 05 - Pažangios temos**
- **mcp-protocol-features/README.md**: Nauja išsami protokolo funkcijų apžvalga
  - Progreso pranešimų įgyvendinimas
  - Užklausų atšaukimo šablonai
  - Ištekliai su URI šablonais
  - Serverio gyvavimo ciklo valdymas
  - Registravimo lygių kontrolė
  - Klaidos valdymo šablonai su JSON-RPC kodais

#### Navigacijos pataisymai (atnaujinta daugiau nei 24 failai)

**Pagrindinių modulių README failai**  
Dabar rodo nuorodas į pirmą pamoką IR kitą modulį

**02-Security papildomi failai**  
Visi 5 papildomi saugumo dokumentai turi "Kas toliau" navigaciją:

**09-CaseStudy failai**  
Visuose atvejo studijų failuose yra seka navigacija:

**10-StreamliningAI laboratorijos**  
Pridėta "Kas toliau" skiltis modulyje 10 apžvalgoje ir modulyje 11

#### Kodo ir turinio pataisymai

**SDK ir priklausomybių atnaujinimai**  
Ištaisyta tuščia openai versija į `^4.95.0`  
SDK atnaujintas nuo `^1.8.0` iki `>=1.26.0`  
MCP versijos nustatymai atnaujinti iki `>=1.26.0`

**Kodo pataisymai**  
Ištaisyta negaliojanti modelio reikšmė `gpt-4o-mini` į `gpt-4.1-mini`

**Turinio pataisymai**  
Ištaisyta sugadinta nuoroda `READMEmd` → `README.md`, pataisytas mokymo antraštės pavadinimas `Module 1-3` → `Module 0-3`, pataisytas didžiųjų ir mažųjų raidžių netikslumas kelio varduose  
Pašalintas sugadintas dubliuotas 5-os atvejo studijos turinys

**Pradedančiųjų vadovas patobulinimai**  
Pridėta tinkama įžanga, mokymosi tikslai ir pradiniai reikalavimai pradedantiesiems

#### Mokymo programos atnaujinimai

**Pagrindinis README.md**  
Pridėti 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) į mokymo programos lentelę

**Modulių README failai**  
Pridėtos pamokos 12 ir 13 į pamokų sąrašą  
Pridėta Praktinių vadovų skiltis su puslapiavimo nuoroda  
Pridėtos pamokos 5.15 (Custom Transport) ir 5.16 (Protocol Features)

**study_guide.md**  
Atnaujintas minčių žemėlapis su visomis naujomis temomis: MCP šeimininkų nustatymas, MCP inspektorius, puslapiavimo strategijos, protokolo funkcijų išsamumas

## 2026 m. sausio 28 d.

### MCP specifikacijos 2025-11-25 atitikties peržiūra

#### Pagrindinių koncepcijų patobulinimai (01-CoreConcepts/)  
- **Naujas kliento primityvas - Roots**: Pridėta išsami dokumentacija apie Roots klientų primityvą, leidžiantį serveriams suprasti failų sistemos ribas ir prieigos teises  
- **Įrankių anotacijos**: Pridėta dokumentacija apie įrankių elgesio anotacijas (`readOnlyHint`, `destructiveHint`) geresniems įrankių vykdymo sprendimams  
- **Įrankių kvietimas imties metu**: Atnaujinta mėginių ėmimo dokumentacija, įtraukiant `tools` ir `toolChoice` parametrus, skirtus modeliui valdoma įrankių kvietimui imtuvų užklausų metu  
- **URL režimo iškvietimas**: Pridėta dokumentacija apie URL pagrindu vykdomus serverio inicijuotus išorinius tinklo veiksmus  
- **Užduotys (eksperimentinės)**: Pridėta nauja skiltis, aprašanti eksperimentinę Užduočių funkciją ilgalaikiam vykdymui ir atidėto rezultatų gavimo galimybę  
- **Piktogramų palaikymas**: Nurodyta, kad įrankiai, ištekliai, išteklių šablonai ir raginimai dabar gali turėti papildomas piktogramas kaip metaduomenis

#### Dokumentacijos atnaujinimai  
- **README.md**: Pridėtas MCP specifikacijos 2025-11-25 versijos nuoroda ir paaiškinimas apie datos pagrindu vykdomą versijavimą  
- **study_guide.md**: Atnaujintas mokymo programos žemėlapis, įtraukiant Užduotis ir įrankių anotacijas pagrindinių koncepcijų skiltyje; atnaujintas dokumento laiko žyma

#### Specifikacijos laikymosi patikra  
- **Protokolo versija**: Patvirtinta, kad visa dokumentacija nurodo esamą MCP specifikaciją 2025-11-25  
- **Architektūros suderinamumas**: Patvirtinta, kad dviklasės architektūros (Duomenų sluoksnis + Transporto sluoksnis) dokumentacija yra tiksli  
- **Primityvų dokumentacija**: Patvirtinta serverio primityvų (Ištekliai, Raginimai, Įrankiai) ir kliento primityvų (Imtuvai, Iškvietimas, Registravimas, Roots) dokumentacijos tikslumas  
- **Transporto mechanizmai**: Patvirtintas STDIO ir Streamable HTTP transporto dokumentacijos teisingumas  
- **Saugumo gairės**: Patvirtinta atitiktis dabartinėms MCP saugumo gerosioms praktikoms

#### Svarbios MCP 2025-11-25 funkcijos aprašytos  
- **OpenID Connect aptikimas**: Autentifikavimo serverio aptikimas naudojant OIDC  
- **OAuth kliento ID metaduomenų dokumentai**: Rekomenduojamas kliento registracijos mechanizmas  
- **JSON Schema 2020-12**: Numatytoji MCP schemų kalba  
- **SDK sluoksnių sistema**: Formalizuoti reikalavimai SDK funkcijų palaikymui ir palaikymui  
- **Valdymo struktūra**: Formalizuotos Darbo grupės ir Interesų grupės MCP valdyme

### Saugumo dokumentacijos didelis atnaujinimas (02-Security/)

#### MCP Saugumo susitikimo dirbtuvės (Sherpa) integracija  
- **Naujas praktinis mokymo išteklius**: Pridėta išsami integracija su [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) visoje saugumo dokumentacijoje  
- **Ekspedicijos maršruto aprašymas**: Dokumentuotas visas kelias nuo Pagrindinio stovyklos iki viršūnės  
- **OWASP atitikimas**: Visa saugumo informacija dabar atitinka OWASP MCP Azure Saugumo vadovo rizikas

#### OWASP MCP Top 10 integracija  
- **Nauja skiltis**: Pridėta OWASP MCP Top 10 saugumo rizikų lentelė su Azure mažinimo priemonėmis į pagrindinį saugumo README  
- **Rizikos pagrindu dokumentacija**: Atnaujintas mcp-security-controls-2025.md su OWASP MCP rizikų nuorodomis kiekvienam saugumo sričiai  
- **Referencinė architektūra**: Pridėta nuoroda į OWASP MCP Azure Saugumo vadovo referencinę architektūrą ir įgyvendinimo šablonus

#### Atnaujinti saugumo failai  
- **README.md**: Pridėta Sherpa dirbtuvių apžvalga, ekspedicijos maršruto lentelė, OWASP MCP Top 10 rizikų suvestinė ir praktinių mokymų skyrius  
- **mcp-security-controls-2025.md**: Atnaujinta antraštė iki 2026 m. vasario, pridėtos OWASP rizikos nuorodos (MCP01-MCP08), pataisyta spec versijos neatitikimas  
- **mcp-security-best-practices-2025.md**: Pridėta Sherpa ir OWASP išteklių skiltis, atnaujinta datos žyma  
- **mcp-best-practices.md**: Pridėtas praktinių mokymų skyrius su Sherpa ir OWASP nuorodomis  
- **azure-content-safety-implementation.md**: Pridėta OWASP MCP06 nuoroda, Sherpa Stovyklos 3 suderinamumas ir papildoma išteklių skiltis

#### Pridėtos naujos išteklių nuorodos  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Individualios OWASP MCP rizikų puslapiai (MCP01-MCP10)

### MCP specifikacijos 2025-11-25 atitikimas visoje mokymo programoje

#### Modulis 03 - Pradžia  
- **SDK dokumentacija**: Pridėtas Go SDK prie oficialaus SDK sąrašo; atnaujintos visos SDK nuorodos, kad atitiktų MCP specifikaciją 2025-11-25  
- **Transporto paaiškinimai**: Atnaujintos STDIO ir HTTP srautinio perdavimo transporto aprašys su aiškiomis spec nuorodomis

#### Modulis 04 - Praktinė įgyvendinimas  
- **SDK atnaujinimai**: Pridėtas Go SDK; atnaujintas SDK sąrašas su specifikacijos versijos nuoroda  
- **Autorizacijos specifikacija**: Atnaujinta MCP autorizacijos specifikacijos nuoroda į dabartinę 2025-11-25 versiją

#### Modulis 05 - Pažangios temos  
- **Naujos funkcijos**: Pridėta pastaba apie naujas MCP specifikacijos 2025-11-25 funkcijas (Užduotys, Įrankių anotacijos, URL režimo iškvietimas, Roots)  
- **Saugumo ištekliai**: Pridėta OWASP MCP Top 10 ir Sherpa dirbtuvių nuorodos prie papildomų išteklių

#### Modulis 06 - Bendruomenės indėliai  
- **SDK sąrašas**: Pridėti Swift ir Rust SDK; atnaujintas specifikacijos nuorodas į 2025-11-25  
- **Specifikacijos nuoroda**: Atnaujinta MCP specifikacijos nuoroda į tiesioginį specifikacijos URL

#### Modulis 07 - Ankstyvo priėmimo pamokos  
- **Išteklių atnaujinimai**: Pridėta MCP specifikacijos 2025-11-25 nuoroda ir OWASP MCP Top 10 prie papildomų išteklių

#### Modulis 08 - Geros praktikos  
- **Specifikacijos versija**: Atnaujinta MCP specifikacijos nuoroda į 2025-11-25  
- **Saugumo ištekliai**: Pridėta OWASP MCP Top 10 ir Sherpa dirbtuvių nuorodos prie papildomų išteklių

#### Modulis 10 - Dirbtinio intelekto darbų srautų optimizavimas  
- **Ženklo atnaujinimas**: Pakeistas MCP versijos ženklelis nuo SDK versijos (1.9.3) į specifikacijos versiją (2025-11-25)  
- **Išteklių nuorodos**: Atnaujinta MCP specifikacijos nuoroda; pridėta OWASP MCP Top 10

#### Modulis 11 - MCP serverio praktinės laboratorijos  
- **Specifikacijos nuoroda**: Atnaujinta MCP specifikacijos nuoroda į 2025-11-25 versiją  
- **Saugumo ištekliai**: Pridėta OWASP MCP Top 10 prie oficialių išteklių

## 2025 m. gruodžio 18 d.

### Saugumo dokumentacijos atnaujinimas - MCP specifikacija 2025-11-25

#### MCP saugumo gerosios praktikos (02-Security/mcp-best-practices.md) - specifikacijos versijos atnaujinimas  
- **Protokolo versijos atnaujinimas**: Atnaujinta nuoroda į naujausią MCP specifikaciją 2025-11-25 (išleistą 2025 m. lapkričio 25 d.)  
  - Atnaujintos visos specifikacijos versijos nuorodos nuo 2025-06-18 iki 2025-11-25  
  - Atnaujintos dokumento datos nuorodos nuo 2025 m. rugpjūčio 18 d. iki 2025 m. gruodžio 18 d.  
  - Patikrinta, kad visos specifikacijos URL nuorodos veda į dabartinę dokumentaciją  
- **Turinio patikra**: Išsami saugumo gerosios praktikos atitikties patikra pagal naujausius standartus  
  - **Microsoft saugumo sprendimai**: Patikrinta dabartinė terminologija ir nuorodos, įskaitant Prompt Shields (anksčiau „Jailbreak rizikos aptikimas“), Azure Content Safety, Microsoft Entra ID ir Azure Key Vault  
  - **OAuth 2.1 saugumas**: Patvirtintas atitikimas naujausioms OAuth saugumo gerosioms praktikoms  
  - **OWASP standartai**: Patikrinta, kad OWASP Top 10 LLM atitinka naujausius reikalavimus  
  - **Azure paslaugos**: Patikrinti visi Microsoft Azure dokumentacijos ir gerosios praktikos šaltiniai  
- **Standartų laikymasis**: Patvirtinta, kad visi nurodyti saugumo standartai yra aktualūs  
  - NIST AI rizikos valdymo sistema  
  - ISO 27001:2022  
  - OAuth 2.1 saugumo gerosios praktikos  
  - Azure saugumo ir atitikties sistemos  
- **Įgyvendinimo ištekliai**: Patikrinti visi įgyvendinimo vadovų nuorodos ir ištekliai  
  - Azure API valdymo autentifikavimo modeliai  
  - Microsoft Entra ID integracijos vadovai  
  - Azure Key Vault slaptų duomenų valdymas  
  - DevSecOps srautai ir stebėjimo sprendimai

### Dokumentacijos kokybės užtikrinimas  
- **Specifikacijos laikymasis**: Užtikrinta, kad visi būtini MCP saugumo reikalavimai (PRADEDAMA / DRAUDŽIAMA) atitinka naujausią specifikaciją  
- **Ištekliai yra naujausi**: Patikrinta, kad visi išoriniai Microsoft dokumentacijos, saugumo standartų ir įgyvendinimo vadovų nuorodos yra atnaujintos  
- **Gerosios praktikos aprėptis**: Patvirtinta išsami autentifikacijos, autorizacijos, DI grėsmių, tiekimo grandinės saugumo ir įmonių šablonų aprėptis

## 2025 m. spalio 6 d.

### Pradžios skyriaus išplėtimas – pažangus serverio naudojimas ir paprasta autentifikacija

#### Pažangus serverio naudojimas (03-GettingStarted/10-advanced)  
- **Pridėta nauja paskaita**: Išsamus vadovas pažangiam MCP serverio naudojimui, apimantis tiek įprastą, tiek žemo lygio serverio architektūras.  
  - **Įprastas kontra žemo lygio serveris**: Išsami palyginimų analizė ir kodo pavyzdžiai Python ir TypeScript abiem požiūriais.  
  - **Valdiklių pagrindu sukurtas dizainas**: Paaiškinimas apie valdiklių pagrindu vykdomą įrankių/ištekliaus/raginimų valdymą, užtikrinantį mastelį ir lanksčią serverio įgyvendinimą.  
  - **Praktiniai šablonai**: Tikri atvejai, kur žemo lygio serverio šablonai naudingi pažangioms funkcijoms ir architektūrai.
#### Paprasta autentifikacija (03-GettingStarted/11-simple-auth)
- **Pridėtas naujas skyrius**: Žingsnis po žingsnio vadovas, kaip įgyvendinti paprastą autentifikaciją MCP serveriuose.
  - **Autentifikacijos sąvokos**: Aiškus autentifikacijos ir autorizacijos bei kredencialų tvarkymo paaiškinimas.
  - **Bazinis autentifikacijos įgyvendinimas**: Tarpinio sluoksnio autentifikacijos modeliai Python (Starlette) ir TypeScript (Express) su kodo pavyzdžiais.
  - **Pereinamasis etapas prie pažangios saugos**: Parama, kaip pradėti nuo paprastos autentifikacijos ir pereiti prie OAuth 2.1 bei RBAC, su nuorodomis į pažangius saugumo modulius.

Šie papildymai suteikia praktišką, praktinį vadovą, kaip kurti tvirtesnes, saugesnes ir lankstesnes MCP serverio įgyvendinimo priemones, jungiančias pagrindines sąvokas su pažangiais gamybiniais modeliais.

## 2025 m. rugsėjo 29 d.

### MCP serverio duomenų bazės integracijos dirbtuvės – išsamus praktinis mokymosi kelias

#### 11-MCPServerHandsOnLabs – nauja visa duomenų bazės integracijos mokymo programa
- **Išsamus 13 dirbtuvių mokymosi kelias**: Pridėta išsami praktinė mokymo programa MCP serveriams su PostgreSQL duomenų bazės integracija
  - **Realios situacijos pavyzdys**: Zava Retail analitikos atvejis, demonstruojantis įmonių lygio modelius
  - **Struktūruotas mokymosi progresas**:
    - **Dirbtuvės 00-03: Pagrindai** – Įvadas, pagrindinė architektūra, sauga ir daugiavartotojiškumas, aplinkos paruošimas
    - **Dirbtuvės 04-06: MCP serverio kūrimas** – Duomenų bazės dizainas ir schema, MCP serverio įgyvendinimas, įrankių kūrimas  
    - **Dirbtuvės 07-09: Pažangios funkcijos** – Semantinės paieškos integracija, testavimas ir derinimas, VS Code integracija
    - **Dirbtuvės 10-12: Gamyba ir gerosios praktikos** – Diegimo strategijos, stebėjimas ir matomumas, gerosios praktikos ir optimizavimas
  - **Įmonių technologijos**: FastMCP karkasas, PostgreSQL su pgvector, Azure OpenAI įterpimai, Azure konteinerių taikymai, Application Insights
  - **Pažangios funkcijos**: Eilutės lygio sauga (RLS), semantinė paieška, daugiamačių duomenų prieiga, vektorinių įterpimų naudojimas, realaus laiko stebėsena

#### Terminologijos standartizavimas – modulių pakeitimas į dirbtuves
- **Išsamus dokumentacijos atnaujinimas**: Sistemiškai atnaujinti visi README failai 11-MCPServerHandsOnLabs, naudojant „Dirbtuvė“ vietoj „Modulio“
  - **Skyriaus antraštės**: „Šis modulis apima“ pakeista į „Ši dirbtuvė apima“ visuose 13 dirbtuvių komplektuose
  - **Turinio aprašas**: „Šis modulis suteikia...“ pakeista į „Ši dirbtuvė suteikia...“ visoje dokumentacijoje
  - **Mokymosi tikslai**: „Modulio pabaigoje...“ pakeista į „Dirbtuvių pabaigoje...“
  - **Navigacijos nuorodos**: Visos „Modulis XX:“ nuorodos pakeistos į „Dirbtuvė XX:“ tarpusavio nuorodose bei navigacijoje
  - **Baigimo sekimas**: „Baigus šį modulį...“ pakeista į „Baigus šią dirbtuvę...“
  - **Išsaugotos techninės nuorodos**: Python modulio nuorodos konfigūracijos failuose (pvz., `"module": "mcp_server.main"`) paliktos nepakitusios

#### Mokymosi vadovo patobulinimai (study_guide.md)
- **Vizualus mokymo plano žemėlapis**: pridėtas naujas skyrius „11. Duomenų bazės integracijos dirbtuvės“ su išsamia dirbtuvių struktūros vizualizacija
- **Sąrašas saugykloje**: atnaujintas iš dešimties į vienuolika pagrindinių skyrių su detaliu 11-MCPServerHandsOnLabs aprašymu
- **Mokymosi kelio vadovas**: patobulinti navigacijos nurodymai apimantys skyrius nuo 00 iki 11
- **Technologijų apimtis**: įtraukta informacija apie FastMCP, PostgreSQL, Azure paslaugų integraciją
- **Mokymosi rezultatai**: pabrėžtas gamybinio lygio serverio kūrimas, duomenų bazės integracijos modeliai ir įmonių sauga

#### Pagrindinio README struktūros patobulinimai
- **Terminologija pagrįsta dirbtuvėmis**: atnaujinta pagrindinė README.md 11-MCPServerHandsOnLabs naudojant nuoseklią „Dirbtuvė“ struktūrą
- **Mokymosi kelio organizavimas**: aiškus progresas nuo pagrindinių sąvokų per pažangų įgyvendinimą iki gamybinio diegimo
- **Realios situacijos fokusas**: pabrėžiamas praktinis, hands-on mokymasis su įmonių lygio modeliais ir technologijomis

### Dokumentacijos kokybės ir nuoseklumo gerinimai
- **Praktinio mokymosi pabrėžimas**: užtikrintas praktinis, dirbtuvių pagrindu pagrįstas požiūris visuose dokumentuose
- **Įmonių modelių akcentavimas**: išryškintos gamybinio lygio įgyvendinimai ir įmonių saugos aspektai
- **Technologijų integracija**: išsamus šiuolaikinių Azure paslaugų ir DI integracijos modelių aprėptis
- **Mokymosi progresas**: aiški, struktūruota eiga nuo pagrindų iki gamybos diegimo

## 2025 m. rugsėjo 26 d.

### Atvejų studijų patobulinimai – GitHub MCP registrų integracija

#### Atvejų studijos (09-CaseStudy/) – ekosistemos plėtros fokusas
- **README.md**: žymus išplėtimas su išsamia GitHub MCP registrų atvejo studija
  - **GitHub MCP registrų atvejo studija**: nauja išsami atvejo studija nagrinėjanti GitHub MCP registrų paleidimą 2025 m. rugsėjį
    - **Problemos analizė**: išsamus fragmentuoto MCP serverių aptikimo ir diegimo problemų nagrinėjimas
    - **Sprendimo architektūra**: GitHub centralizuoto registro sprendimas su vieno paspaudimo VS Code įdiegimu
    - **Verslo poveikis**: matomi geresni kūrėjų įsitraukimo ir produktyvumo rezultatai
    - **Strateginė vertė**: modulinio agentų diegimo ir tarppriemoninės sąveikos akcentas
    - **Ekosistemos plėtra**: pozicionavimas kaip pagrindinė agentinės integracijos platforma
  - **Patobulinta atvejo studijų struktūra**: visos septynios atvejo studijos atnaujintos nuoseklumu ir išsamiais aprašymais
    - Azure DI kelionių agentai: daugiaagentinis orkestravimas
    - Azure DevOps integracija: darbo srautų automatizavimas
    - Dokumentacijos gavimas realiu laiku: Python konsolės klientų įgyvendinimas
    - Interaktyvus studijų plano generatorius: Chainlit pokalbių žiniatinklio programa
    - Dokumentacija redaktoriuje: VS Code ir GitHub Copilot integracija
    - Azure API valdymas: įmonių API integracijos modeliai
    - GitHub MCP registras: ekosistemos plėtra ir bendruomenės platforma
  - **Išsami išvada**: pertvarkyta išvada pabrėžianti septynias atvejo studijas, apimančias kelis MCP įgyvendinimo aspektus
    - Įmonių integracija, daugiaagentinis orkestravimas, kūrėjų produktyvumas
    - Ekosistemos vystymas, švietimo taikymai
    - Išplėsti įžvalgos apie architektūrinius modelius, įgyvendinimo strategijas ir gerąsias praktikas
    - Pabrėžta MCP kaip subrendusio, gamybinio protokolo reikšmė

#### Mokymosi vadovo atnaujinimai (study_guide.md)
- **Vizualus mokymo plano žemėlapis**: atnaujintas minčių žemėlapis, įtraukiant GitHub MCP registrą atvejo studijų skyriuje
- **Atvejo studijų aprašymai**: pagerinti nuo bendrų aprašymų iki detalaus septynių išsamiausių atvejo studijų išskaidymo
- **Sąrašas saugykloje**: atnaujintas skyrius 10, atspindintis išsamią atvejo studijų aprėptį su konkrečiomis įgyvendinimo detalėmis
- **Keitimosi žurnalas**: pridėtas 2025 m. rugsėjo 26 d. įrašas, dokumentuojantis GitHub MCP registrų pridėjimą ir atvejo studijų patobulinimus
- **Datos atnaujinimai**: apačioje atnaujintas datos žymėjimas su naujausiu pataisymu (2025 m. rugsėjo 26 d.)

### Dokumentacijos kokybės patobulinimai
- **Nuoseklumo gerinimas**: standartizuotas atvejo studijų formatas ir struktūra visuose septyniuose pavyzdžiuose
- **Išsami aprėptis**: atvejo studijos apima įmonių, kūrėjų produktyvumo ir ekosistemos plėtros scenarijus
- **Strateginis pozicionavimas**: sustiprintas fokusas į MCP kaip pagrindinę agentinės sistemos platformą
- **Išteklių integracija**: atnaujinti papildomi ištekliai su GitHub MCP registrų nuoroda

## 2025 m. rugsėjo 15 d.

### Pažangi tematika – pasirinktiniai transportai ir konteksto inžinerija

#### MCP pasirinktinių transportų modulis (05-AdvancedTopics/mcp-transport/) – naujas pažangus įgyvendinimo gidas
- **README.md**: pilnas pasirinktinio MCP transporto mechanizmų įgyvendinimo vadovas
  - **Azure Event Grid transportas**: išsamus serverless įvykių varomas transporto įgyvendinimas
    - C#, TypeScript ir Python pavyzdžiai su Azure Functions integracija
    - Įvykių varomos architektūros modeliai mastelio MCP sprendimams
    - Webhook gavėjai ir push žinučių valdymas
  - **Azure Event Hubs transportas**: didelio pralaidumo srautinio perdavimo transporto įgyvendinimas
    - Realiojo laiko srautų perdavimas žemos delsos scenarijoms
    - Dalijimosi strategijos ir patikros taškų valdymas
    - Žinučių grupavimas ir našumo optimizavimas
  - **Įmonių integracijos modeliai**: gamybai pritaikyti architektūriniai pavyzdžiai
    - Išskirtinis MCP apdorojimas keliuose Azure Functions
    - Hibridinės transporto architektūros sujungiant kelis tipų transportus
    - Žinučių patvarumo, patikimumo ir klaidų tvarkymo strategijos
  - **Sauga ir stebėjimas**: Azure Key Vault integracija ir matomumo modeliai
    - Tvarkomos tapatybės autentifikacija ir mažiausios privilegijos principas
    - Application Insights telemetrija ir našumo stebėsena
    - Grandinės nutraukėjai ir klaidų tolerancijos modeliai
  - **Testavimo sistemos**: išsamios testavimo strategijos pasirinktinėms transporto priemonėms
    - Vienetinių testų atlikimas naudojant testų dublikatus ir mokymosi sistemas
    - Integracijos testavimas su Azure Test Containers
    - Našumo bei apkrovos testų svarstymai

#### Konteksto inžinerija (05-AdvancedTopics/mcp-contextengineering/) – kylančioji DI disciplina
- **README.md**: išsami konteksto inžinerijos kaip kylančios srities analizė
  - **Esminiai principai**: visapusiškas konteksčio dalinimasis, veiksmų sprendimų sąmoningumas ir konteksčio lango valdymas
  - **MCP protokolo suderinamumas**: kaip MCP dizainas sprendžia konteksto inžinerijos iššūkius
    - Konteksto lango apribojimai ir progresyvios įkėlimo strategijos
    - Reikšmingumo nustatymas ir dinamiškas konteksto gavimas
    - Daugiarūšių kontekstų tvarkymas ir saugumo aspektai
  - **Įgyvendinimo prieigos**: vienguba gija prieš daugiaagentines architektūras
    - Konteksto skaidymas ir prioritetizavimo metodai
    - Progresyvus konteksto įkėlimas ir suspaudimo strategijos
    - Sluoksniuotos konteksto prieigos ir gavimo optimizavimas
  - **Matuoklių sistema**: kylančios metrikos konteksto efektyvumo vertinimui
    - Įvesties efektyvumas, našumas, kokybė ir naudotojo patirtis
    - Eksperimentiniai metodai konteksto optimizavimui
    - Nesėkmių analizė ir tobulinimo metodologijos

#### Mokymo plano navigacijos atnaujinimai (README.md)
- **Išplėsta modulio struktūra**: atnaujinta mokymo programa įtraukiant naujus pažangius modulius
  - Pridėtos konteksto inžinerijos (5.14) ir pasirinktinių transportų (5.15) temos
  - Nuoseklus formatavimas ir navigacijos nuorodos visuose moduliuose
  - Atnaujinti aprašymai atspindintys dabartinę turinio apimtį

### Katalogo struktūros patobulinimai
- **Pavadinimų standartizavimas**: „mcp transport“ pakeistas į „mcp-transport“ nuoseklumo sutvarkymui su kitais pažangiais teminiais aplankais
- **Turinio organizavimas**: visi 05-AdvancedTopics aplankai dabar laikosi vienodo pavadinimų modelio (mcp-[tema])

### Dokumentacijos kokybės patobulinimai
- **MCP specifikacijos atitikimas**: visa nauja turinys nurodo MCP specifikaciją 2025-06-18
- **Daugiakalbiai pavyzdžiai**: išsamūs kodo pavyzdžiai C#, TypeScript ir Python kalbomis
- **Įmonių dėmesys**: gamybinio lygio modeliai ir Azure debesų integracija visuose skyriuose
- **Vizualinė dokumentacija**: Mermaid schemos architektūros ir srautų vaizdavimui

## 2025 m. rugpjūčio 18 d.

### Išsamus dokumentacijos atnaujinimas – MCP 2025-06-18 standartai

#### MCP saugumo geriausios praktikos (02-Security/) – pilnas modernizavimas
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: visiškas pertvarkymas atitinkantis MCP specifikaciją 2025-06-18
  - **Privalomi reikalavimai**: pridėti aiškūs MUST/MUST NOT reikalavimai pagal oficialią specifikaciją su aiškiais vizualiais ženklais
  - **12 pagrindinių saugumo praktikų**: restruktūrizuota iš 15 punktų į išsamias saugumo sritis
    - Tokenų saugumas ir autentifikacija su išorinio tapatybės tiekėjo integracija
    - Sesijų valdymas ir transporto saugumas su kriptografiniais reikalavimais
    - DI specifiškas grėsmių valdymas su Microsoft Prompt Shields integracija
    - Prieigos kontrolė ir leidimai su mažiausių privilegijų principu
    - Turinys saugumas ir stebėsena su Azure Content Safety integracija
    - Tiekimo grandinės saugumas su visapusiška komponentų patikra
    - OAuth saugumas ir „confused deputy“ atakų prevencija su PKCE įgyvendinimu
    - Incidentų valdymas ir atkūrimas su automatizuotomis galimybėmis
    - Atitiktis ir valdymas pagal teisės aktus
    - Pažangios saugumo valdymo priemonės su zero trust architektūra
    - Microsoft saugumo ekosistemos integracija su išsamiais sprendimais
    - Nuolatinė saugumo evoliucija su adaptuojamomis praktikomis
  - **Microsoft saugumo sprendimai**: sustiprintas integracijos vadovas Prompt Shields, Azure Content Safety, Entra ID ir GitHub Advanced Security
  - **Įgyvendinimo resursai**: sisteminti išsamių nuorodų sąrašai: oficiali MCP dokumentacija, Microsoft saugumo sprendimai, saugumo standartai ir įgyvendinimo vadovai

#### Pažangios saugumo priemonės (02-Security/) – įmonių įgyvendinimas
- **MCP-SECURITY-CONTROLS-2025.md**: visiškas pertvarkymas į išsamias įmonių klasės saugumo zonas
  - **9 išsamios saugumo sritys**: išplėstos nuo pagrindinių priemonių iki detalios įmonių sistemos
    - Pažangi autentifikacija ir autorizacija su Microsoft Entra ID integracija
    - Tokenų saugumas ir apsauga nuo neteisėto praeities naudojimo su išsamiu tikrinimu
    - Sesijų saugumo kontrolės su apsauga nuo užgrobstymo
    - DI specifinės saugumo priemonės nuo komandų injekcijos ir įrankių užnuodijimo
    - „Confused deputy“ atakų prevencija su OAuth tarpinio serverio saugumu
    - Įrankių vykdymo saugumas su sandboxing ir izolacija
    - Tiekimo grandinės saugumo kontrolės su priklausomybių patikra
    - Stebėjimo ir aptikimo priemonės su SIEM integracija
    - Incidentų valdymas ir atkūrimas su automatizacija
  - **Įgyvendinimo pavyzdžiai**: pridėti išsamūs YAML konfigūracijų blokai ir kodo pavyzdžiai
  - **Microsoft sprendimų integracija**: išsami Azure saugumo paslaugų, GitHub Advanced Security ir įmonių tapatybės valdymo aprėptis

#### Pažangių temų sauga (05-AdvancedTopics/mcp-security/) – gamybai paruoštas įgyvendinimas
- **README.md**: visiškas pertvarkymas į įmonių saugumo įgyvendinimą
  - **Dabartinės specifikacijos atitikimas**: atnaujinta pagal MCP specifikaciją 2025-06-18 su privalomais saugumo reikalavimais
  - **Patobulinta autentifikacija**: Microsoft Entra ID integracija su plačiais .NET ir Java Spring Security pavyzdžiais
  - **DI saugos integracija**: Microsoft Prompt Shields ir Azure Content Safety įgyvendinimas su detalizuotais Python pavyzdžiais
  - **Pažangių grėsmių šalinimas**: išsamūs pavyzdžiai
    - „Confused deputy“ atakų prevencija su PKCE ir naudotojo sutikimo patikra
    - Tokenų praeities naudojimo prevencija su auditorijos validavimu ir saugiu tokenų valdymu
    - Sesijų užgrobstymo prevencija su kriptografiniu surišimu ir elgesio analize
  - **Įmonių saugos integracija**: Azure Application Insights stebėsena, grėsmių aptikimo vamzdynai ir tiekimo grandinės saugumas
  - **Įgyvendinimo kontrolinis sąrašas**: aiškios privalomos ir rekomenduojamos saugumo priemonės su Microsoft saugumo ekosistemos privalumais

### Dokumentacijos kokybės ir standartų laikymosi gerinimas
- **Specifikacijos nuorodos**: Atnaujintos visos nuorodos į dabartinę MCP specifikaciją 2025-06-18
- **Microsoft saugumo ekosistema**: Patobulintos integracijos gairės visoje saugumo dokumentacijoje
- **Praktinė įgyvendinimas**: Pridėti išsamūs kodo pavyzdžiai .NET, Java ir Python su įmonės šablonais
- **Ištekliai organizavimas**: Išsami oficialios dokumentacijos, saugumo standartų ir diegimo gairių kategorija
- **Vizualūs indikatoriai**: Aiškus privalomų reikalavimų prieš rekomenduojamas praktikas žymėjimas


#### Pagrindinės sąvokos (01-CoreConcepts/) - Visiškas modernizavimas
- **Protokolo versijos atnaujinimas**: Atnaujinta, siekiant nurodyti dabartinę MCP specifikaciją 2025-06-18 su datos pagrindu versijavimo formatu (YYYY-MM-DD)
- **Architektūros patobulinimai**: Patobulinti šeimininkų, klientų ir serverių aprašai, atspindintys dabartinius MCP architektūros šablonus
  - Šeimininkai dabar aiškiai apibrėžti kaip dirbtinio intelekto programos, koordinuojančios kelis MCP klientų ryšius
  - Klientai aprašyti kaip protokolo jungtys, palaikančios vienas prie vieno serverio santykius
  - Serveriai patobulinti su vietinio ir nuotolinio diegimo scenarijais
- **Primitivų pertvarkymas**: Visiškas serverių ir klientų primityvų perkurimas
  - Serverių primityvai: Ištekliai (duomenų šaltiniai), Užklausos (šablonai), Įrankiai (vykdomos funkcijos) su išsamiu paaiškinimu ir pavyzdžiais
  - Klientų primityvai: Mėginimas (LLM pabaigos), Išgavimas (vartotojo įvestis), Registravimas (derinimas/monitoringas)
  - Atnaujinta su dabartiniais atradimo (`*/list`), gavimo (`*/get`) ir vykdymo (`*/call`) metodo šablonais
- **Protokolo architektūra**: Įvesta dviejų sluoksnių architektūros modelis
  - Duomenų sluoksnis: JSON-RPC 2.0 pagrindas su gyvavimo ciklo valdymu ir primityvais
  - Transporto sluoksnis: STDIO (vietinis) ir mokamas HTTP su SSE (nuotolinis) transporto mechanizmai
- **Saugumo pagrindas**: Išsamios saugumo principų gairės, įskaitant aiškų naudotojo sutikimą, duomenų privatumo apsaugą, įrankių vykdymo saugumą ir transporto sluoksnio saugumą
- **Komunikacijos modeliai**: Atnaujinti protokolo pranešimai, atvaizduojantys inicializavimo, atradimo, vykdymo ir informavimo srautus
- **Kodo pavyzdžiai**: Atnaujinti daugialypės kalbos pavyzdžiai (.NET, Java, Python, JavaScript), atspindintys dabartinius MCP SDK šablonus

#### Saugumas (02-Security/) - Išsamus saugumo pertvarkymas  
- **Standartų atitikimas**: Pilnas atitikimas MCP specifikacijos 2025-06-18 saugumo reikalavimams
- **Autentifikacijos evoliucija**: Dokumentuota evoliucija nuo pasirinktinų OAuth serverių iki išorinio tapatybės tiekėjo delegavimo (Microsoft Entra ID)
- **Dirbtinio intelekto grėsmių analizė**: Patobulintas šiuolaikinių dirbtinio intelekto atakų vektorių apžvalga
  - Išsamios užklausų injekcijų atakų scenarijai su realaus pasaulio pavyzdžiais
  - Įrankių užnuodijimo mechanizmai ir „rug pull“ atakų modeliai
  - Konteksto lango užnuodijimas ir modelio sumaišties atakos
- **Microsoft DI saugumo sprendimai**: Išsamus Microsoft saugumo ekosistemos aptarimas
  - DI užklausų skydai su pažangiu aptikimu, išryškinimu ir skyriklių technikomis
  - Azure turinio saugumo integracijos modeliai
  - GitHub pažangus saugumas tiekimo grandinės apsaugai
- **Pažangūs grėsmių mažinimai**: Išsamios saugumo kontrolės dėl
  - Seanso užgrobimo su MCP specifiniais atakų scenarijais ir kriptografiniais seanso ID reikalavimais
  - Sumišusio tarpininko problemos MCP tarpininkavimo scenarijuose su aiškiais sutikimo reikalavimais
  - Žetonų persiuntimo pažeidžiamumai su privalomomis patvirtinimo kontrolėmis
- **Tiekimo grandinės saugumas**: Išplėstas DI tiekimo grandinės aprėptis, įskaitant pamatinius modelius, įdėlių paslaugas, konteksto tiekėjus ir trečiųjų šalių API
- **Pagrindo saugumas**: Patobulinta integracija su įmonės saugumo šablonais, įskaitant nulio pasitikėjimo architektūrą ir Microsoft saugumo ekosistemą
- **Ištekliai organizavimas**: Klasifikuotos išsamios išteklių nuorodos pagal tipą (oficiali dokumentacija, standartai, tyrimai, Microsoft sprendimai, diegimo gairės)

### Dokumentacijos kokybės patobulinimai
- **Struktūrizuoti mokymosi tikslai**: Patobulinti mokymosi tikslai su konkrečiais, įgyvendinamais rezultatais
- **Tarpusavio nuorodos**: Pridėtos nuorodos tarp susijusių saugumo ir pagrindinių sąvokų temų
- **Dabartinė informacija**: Atnaujintos visos datos nuorodos ir specifikacijos nuorodos pagal dabartinius standartus
- **Įgyvendinimo gairės**: Pridėtos konkrečios, įgyvendinamos įgyvendinimo gairės abiejose sekcijose

## 2025 m. liepos 16 d.

### README ir naršymo patobulinimai
- Visiškai perprojektuotas mokymo programos naršymas README.md faile
- Pakeista `<details>` žymos į lengviau prieinamą lentelių formatą
- Sukurti alternatyvūs išdėstymo variantai naujame aplanke "alternative_layouts"
- Pridėti kortelių, skirtukų stiliaus ir akordeono stiliaus naršymo pavyzdžiai
- Atnaujintas saugyklos struktūros skyrius, įtraukiantis naujausius failus
- Patobulintas skyrius „Kaip naudotis šia mokymo programa“ su aiškiomis rekomendacijomis
- Atnaujintos MCP specifikacijos nuorodos su teisingais URL
- Pridėtas Konteksto inžinerijos skyrius (5.14) mokymo programos struktūroje

### Studijų vadovo atnaujinimai
- Visiškai peržiūrėtas studijų vadovas, atitinkantis dabartinę saugyklos struktūrą
- Pridėti nauji skyriai apie MCP klientus ir įrankius bei populiarius MCP serverius
- Atnaujinta Vizualinė mokymo programa, tiksliai atspindinti visas temas
- Patobulinti išplėstiniai temų aprašymai visoms specializuotoms sritims
- Atnaujintas atvejų tyrimų skyrius su realiais pavyzdžiais
- Pridėtas šis išsamus pakeitimų žurnalas

### Bendruomenės indėliai (06-CommunityContributions/)
- Pridėta išsami informacija apie MCP serverius vaizdo generavimui
- Pridėtas išsamus skyrius apie Claude naudojimą VSCode
- Pridėta Cline terminalo kliento diegimo ir naudojimo instrukcijos
- Atnaujintas MCP klientų skyrius, įtraukiant visas populiarias klientų parinktis
- Patobulinti indėlio pavyzdžiai su tikslesniais kodo pavyzdžiais

### Išplėstinės temos (05-AdvancedTopics/)
- Sutvarkyti visi specializuotų temų aplankai su nuosekliu vardinimu
- Pridėti konteksto inžinerijos medžiaga ir pavyzdžiai
- Pridėta Foundry agento integracijos dokumentacija
- Patobulinta Entra ID saugumo integracijos dokumentacija

## 2025 m. birželio 11 d.

### Pradinis kūrimas
- Išleista pirmoji MCP pradedantiesiems mokymo programos versija
- Sukurta pagrindinė struktūra visoms 10 pagrindinėms dalims
- Įgyvendinta Vizualinė mokymo programa naršymui
- Pridėti pirmieji pavyzdiniai projektai keliomis programavimo kalbomis

### Pradžia (03-GettingStarted/)
- Sukurti pirmieji serverio įgyvendinimo pavyzdžiai
- Pridėtos klientų kūrimo gairės
- Įtrauktos LLM klientų integracijos instrukcijos
- Pridėta VS Code integracijos dokumentacija
- Įgyvendinti Serverio siunčiamų įvykių (SSE) serverių pavyzdžiai

### Pagrindinės sąvokos (01-CoreConcepts/)
- Pridėtas išsamus klientų-serverių architektūros paaiškinimas
- Sukurta dokumentacija apie pagrindinius protokolo komponentus
- Dokumentuoti MCP žinučių šablonai

## 2025 m. gegužės 23 d.

### Saugyklos struktūra
- Inicializuota saugykla su pagrindine aplankų struktūra
- Sukurti README failai kiekvienai pagrindinei daliai
- Įdiegta vertimo infrastruktūra
- Pridėtos grafinės priemonės ir schemos

### Dokumentacija
- Sukurtas pradinis README.md su mokymo programos apžvalga
- Pridėtas CODE_OF_CONDUCT.md ir SECURITY.md
- Įdiegta SUPPORT.md su pagalbos gavimo gairėmis
- Sukurta preliminari studijų vadovo struktūra

## 2025 m. balandžio 15 d.

### Planavimas ir pagrindas
- Pradinio MCP pradedantiesiems mokymo programos planavimas
- Apibrėžti mokymosi tikslai ir tikslinė auditorija
- Numatyta 10 skyrių mokymo programos struktūra
- Sukurtas konceptualus pagrindas pavyzdžiams ir atvejų tyrimams
- Sukurti pradiniai prototipo pavyzdžiai pagrindinėms sąvokoms

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->