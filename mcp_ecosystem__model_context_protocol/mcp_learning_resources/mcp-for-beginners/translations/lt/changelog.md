# Changelog: MCP pradedantiesiems programos mokymo medžiaga

Šis dokumentas yra įrašas apie svarbius Model Context Protocol (MCP) pradedantiesiems mokymo medžiagos pakeitimus. Pakeitimai dokumentuojami atvirkštine chronologine tvarka (pirmiausia naujausi pakeitimai).

## 2026 m. birželio 24 d.

### Nauja pamoka: MCP naudojimas Copilot programoje

- Pridėta [Įrankių skiltis](./12-tooling/README.md).
- [MCP Copilot programoje](./12-tooling/01-copilot-app/README.md)

## 2026 m. birželio 16 d.

### MCP specifikacijos suderinimas ir pavyzdžių patvirtinimas

Patvirtinta mokymo medžiaga pagal dabartinę **MCP Specification 2025-11-25** ir naujausius oficialius SDK, pataisyti pasenusios specifikacijos nuorodos ir patvirtinta, kad pagrindiniai pavyzdžiai tebeveikia ir kompiliuojasi.

#### Specifikacijos versijų pataisymai (2025-06-18 / 2025-03-26 → 2025-11-25)

Atnaujintas anglų kalbos turinys, kuriame dar buvo nurodyta senesnė specifikacijos versija kaip *dabartinė/naujausia* standartas, ir patikslintos nuorodos į kanoninį `modelcontextprotocol.io` specifikacijos kelius:
- **05-AdvancedTopics/mcp-security/README.md**: Atnaujintas „Dabartinis standartas“ baneris, įvadas, pagrindinių saugumo principų antraštė, privalomi reikalavimai, Microsoft Entra ID skyrius, Nuorodos ir ištekliai, bei uždarymo saugumo pranešimas (8 nuorodos) į 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atnaujinta papildomų išteklių specifikacijos nuoroda ir „Dabartinis standartas“ baneris į 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Pakeista pasenusi `2025-03-26` saugumo ir pasitikėjimo nuoroda į naują 2025-11-25 saugumo gerų praktikų puslapį
- **03-GettingStarted/14-sampling/README.md**: Atnaujinta oficialių mėginių ėmimo dokumentų nuoroda į 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atnaujinta esamo laiko „dabartinė MCP specifikacija“ nuoroda ir papildomų išteklių specifikacijos nuoroda į 2025-11-25 (istoriniai SSE nebenaudojimo pastebėjimai palikti be pakeitimų)

#### Pavyzdžių patvirtinimas su dabartiniais SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` įdiegė `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` buvo sėkmingas be tipo klaidų — esami `McpServer`/`StdioServerTransport` API tebegalioja
- **Python (03-GettingStarted/01-first-server/solution/python)**: Patikrinta izoliuotoje `.venv` aplinkoje su `mcp[cli]` (1.27.2); `py_compile` sėkmingai praeita, o `FastMCP.list_tools()` teisingai grąžino `add` ir `subtract` įrankius
- Patvirtinta, kad visi pavyzdžių `@modelcontextprotocol/sdk` versijų intervalai (`>=1.26.0` / `^1.26.0` / `^1.27.0`) sėkmingai atsinaujina iki dabartinės `1.29.0` versijos be API nesuderinamumo

#### Priklausomybių versijų suderinimas (uždarant skirtumus)

Pakeltos pasenusios SDK versijos, kad kiekvienas pavyzdys naudotų dabartinę MCP versiją, pagal viso repo konvenciją:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Pakelta `@modelcontextprotocol/sdk` nuo `^1.8.0` iki `>=1.26.0` ir atnaujintas pasenusio „atnaujinta MCP 2025-06-18“ aprašymas į „suderinta su MCP Specification 2025-11-25“
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ir **lab4/code/github_mcp_server/pyproject.toml**: Pakeltas tikslius `mcp==1.23.0` į `mcp>=1.26.0`; abu `uv.lock` failai atnaujinti (`uv lock`), kad priklausomybės spręstųsi iki dabartinės `mcp 1.27.2` ir būtų sinchronizuotos su manifestais

#### Mokymo medžiagos trūkumų analizė — naujausios specifikacijos įtrauktos funkcijos

Patvirtinta, kad mokymo medžiaga jau apima visas MCP 2025-11-25 įvestas/išplėstas primityvas, todėl trūkumų nėra:
- **Mėginių ėmimas**: pamokos 03-GettingStarted/14-sampling ir 05-AdvancedTopics/mcp-sampling
- **Jautrinimas (įskaitant URL režimą)**: aprašyta 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features
- **Šaknys**: aprašyta 00-Introduction, 01-CoreConcepts ir 05-AdvancedTopics/mcp-root-contexts
- **Užduotys (eksperimentinės, ilgalaikės operacijos)**: aprašyta 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features
- **Įrankių anotacijos** (`readOnlyHint` / `destructiveHint`): aprašyta 01-CoreConcepts ir 05-AdvancedTopics/mcp-protocol-features

### Saugumo sustiprinimas ir priklausomybių pažeidžiamumo šalinimas

Atliktas visų priklausomybių manifestų ir pavyzdžių šaltinio kodo saugumo patikrinimas, pašalintos visos praneštos npm pažeidžiamybės ir vienas kodo lygio saugumo radinys. Po šalinimo komandą `npm audit` rodė **0 pažeidžiamumų** visose tikrintose direktorijose.

#### npm priklausomybių pažeidžiamumai (transityvūs) — pašalinti

Patikrinta visų 15 įsipareigotų `package-lock.json` failų saugumas. Pažeidžiamumai buvo susiję su transityviosiomis priklausomybėmis, kurias įtraukė MCP Inspector kūrimo įrankis, OpenAI klientas ir MCP SDK; visi jie dabar išspręsti nepažeidžiant pavyzdžių:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ir **lab3/code/weather_mcp/inspector**: Pakelta `@modelcontextprotocol/inspector` versija (`0.16.6` / `0.14.1` → `0.22.0`), kuris išsprendė kartu rodytas advices `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ir `ws`. Pridėta npm `overrides` taisyklė, priverčianti naudoti pataisytą `shell-quote@1.8.4`, panaikinant likusią kritinę pažeidžiamybę per `concurrently`; abu lockfailai atnaujinti (dabar 0 pažeidžiamumų)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atnaujino transityvų `qs` (vidutinė grėsmė) į pataisytą versiją
- **03-GettingStarted/samples/javascript**: `npm audit fix` atnaujino transityvų `hono` (vidutinė grėsmė) į pataisytą versiją
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atnaujino transityvų `form-data` (didelė grėsmė) į pataisytą versiją
- **03-GettingStarted/11-simple-auth/solution/typescript**: Sukurtas trūkstamas `package-lock.json`, kad projektas būtų atkuriamas ir tikrinamas (0 pažeidžiamumų)

#### Kodo lygio saugumo pataisa (OWASP A03: injekcija)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Pašalinta `shell=True` iš įrankio `open_in_vscode`. Ankstesnis `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` leido įvesti aplanko kelią su shell metasimboliais, kurie būdavo interpretuojami `cmd.exe` (komandų injekcijos rizika). Dabar vykdomas tiesioginis `Code.exe` paleidimas su aplanku kaip argumentu — be shell, funkciškai lygu ir saugu.

#### Python priklausomybių tikrinimas

- Patikrinta visos Python priklausomybių rinkiniai su `pip-audit`. `05-AdvancedTopics` ir `03-GettingStarted/samples/python` nerado **žinomų pažeidžiamumų** (jų `mcp` / `httpx` / `pydantic` / `python-dotenv` versijų intervalai veda į dabartines pataisytas versijas)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` pažymėjo transityvią priklausomybę **`werkzeug` 3.1.1** su trimis `safe_join` Windows įrenginių pavadinimų DoS pažeidžiamumais — `CVE-2025-66221`, `CVE-2026-21860` ir `CVE-2026-27199` (visi ištaisyti 3.1.6). Pridėtas saugumo apribojimas `werkzeug>=3.1.6`, kad būtų sprendžiama pataisyta versija; patvirtinta su `chainlit` / `mcp` / `semantic-kernel` rinkiniais, kad apribojimas sprendžiasi sėkmingai.

### Produkto pavadinimo keitimas

Atnaujinta visa mokymo medžiaga, atspindinti Microsoft produktų prekės ženklo pasikeitimą:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Atnaujinta Discord bendruomenės nuoroda
- **AGENTS.md**: Atnaujintas Discord serverio paminėjimas
- **README.md**: Atnaujinti technologinės ekosistemos paminėjimai
- **study_guide.md**: Atnaujintos atvejo studijų nuorodos
- **05-AdvancedTopics/README.md**: Atnaujintas 5.13 modulio pavadinimas ir aprašymas
- **05-AdvancedTopics/mcp-integration/README.md**: Atnaujintas skyriaus pavadinimas ir aprašymas
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Viso modulio pavadinimo ir turinio atnaujinimas
- **05-AdvancedTopics/mcp-security-entra/README.md**: Atnaujinta kryžminė nuoroda
- **07-LessonsfromEarlyAdoption/README.md**: Atnaujintos atvejo studijų nuorodos
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Atnaujinta 9 skyriaus antraštė, ženkleliai, galimybės
- **08-BestPractices/README.md**: Atnaujinta Discord bendruomenės nuoroda
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Atnaujintas Discord kanalo paminėjimas
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Atnaujinta modelių diegimo nuoroda
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Atnaujinta DI paslaugų lentelė
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Atnaujintos išteklių nuorodos

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Atnaujintos pagrindinės mokymo medžiagos nuorodos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Atnaujintas modulio pavadinimas, apžvalga ir visi modulio skyriai
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Atnaujinti pavadinimas, mokymosi tikslai, diegimo instrukcijos ir ištekliai
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Atnaujinti pavadinimas, mokymosi tikslai, MCP šeimininkų lentelė ir kryžminės nuorodos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Atnaujintos pavadinimas, ženkleliai, išankstinės sąlygos ir ištekliai
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Atnaujinti Agent Builder nuorodos ir atsiliepimų nuoroda
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Atnaujintos išankstinės sąlygos ir priedų nuorodos

---

## 2026 m. balandžio 11 d.

### Nauja pamoka, dokumentacijos pataisymai ir priklausomybių atnaujinimai

#### Pridėtas naujas mokymo turinys

**Modulis 05 - Pažangios temos**  
- **Pamoka 5.17: Konkurencinis daugiaprocesinis samprotavimas su MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Naujas išsamus vadovas apie konkurencinį debatų modelį daugiaprocesinėms sistemoms
  - Mermaid architektūros diagrama: du agentai → bendras MCP serveris → debato transkriptas → teisėjas → verdiktas
  - Bendras MCP įrankių serveris (`web_search` + `run_python`), įdiegtas Python ir TypeScript
  - Priešinės sistemos komandos (PRIEŠ / UŽ / Teisėjas) su aiškiais įrankių naudojimo reikalavimais
  - Debatų vedėjas Python, TypeScript ir C# kalbomis, valdo raundus ir argumentų maršrutizavimą
  - MCP `ClientSession` prijungimas vedėjui realiems įrankių kvietimams
  - Panaudojimo scenarijų lentelė (klaidingo suvokimo aptikimas, grėsmių modeliavimas, API dizaino apžvalga, faktų patikra, technologijų pasirinkimas)
  - Saugumo aspektai: izoliuotas vykdymas, įrankių kvietimų patikra, kvotų ribojimas, audito žurnalas
  - Struktūrizuota praktinė užduotis su trimis scenarijais (kodo apžvalga, architektūros sprendimas, turinio moderavimas)

#### Dokumentacijos pataisymai

**Modulis 03 - Pradžia**  
- **05-stdio-server/README.md**: Ištaisyta nepilna TypeScript stdio serverio pavyzdžio dalis — pridėtas trūkstamas transporto inicializavimas (`new StdioServerTransport()`) ir kvietimas `server.connect(transport)`, kad atitiktų Python ir .NET pavyzdžius tame pačiame skyriuje  
- **14-sampling/README.md**: Ištaisyta rašybos klaida — pataisyta frazė `"Sampling is an davanced features"` į `"Sampling is an advanced feature"`  

#### Mokymo medžiagos atnaujinimai

**Pagrindinis README.md**  
- Pridėta įrašas 5.17 (Konkurencinis daugiaprocesinis samprotavimas su MCP) į mokymo medžiagos lentelę su tiesiogine nuoroda į naują pamoką  

**05-AdvancedTopics/README.md**  
- Pridėtas pamokos 5.17 įrašas pamokų lentelėje  

**study_guide.md**  
- Pridėta tema „Konkurencinis daugiaprocesinis samprotavimas“ į minties žemėlapį ir pažangias temų aprašymą  

#### Kodo ir saugumo pataisymai

**Modulis 05 - Konkurentiniai agentai (`mcp-adversarial-agents`)**
- **Saugumo pataisa — komandos injekcija**: TypeScript `run_python` įrankyje `execSync` apvalkalinė interpolacija pakeista į `execFile` + `promisify`, pašalinant komandos injekcijos paviršių (LLM valdomas kodas dabar perduodamas kaip pažodinis argv elementas be apvalkalo)
- **MCP įrankio ciklo sujungimas**: Python diskusijų koordinatorių atnaujinta naudoti `AsyncAnthropic` klientą (pakeičiant blokuojantį sinchroninį `Anthropic`), tiesiogiai perduodant gyvą `ClientSession` kiekvieno agento ėjimui, įrankių apibrėžimai kiekvienu ėjimu gaunami per `session.list_tools()`, `tool_use` blokai siunčiami cikle per `session.call_tool()` tol, kol modelis suformuoja galutinį teksto atsakymą

#### Priklausomybių atnaujinimai

- Atnaujintas `hono` į 4.12.12 daugelyje paketų (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Atnaujintas `@hono/node-server` nuo 1.19.11 iki 1.19.13 TypeScript paketuose
- Atnaujintas `cryptography` nuo 46.0.5 iki 46.0.7 Python paketuose (10-StreamliningAIWorkflows laboratorijose 3 ir 4)
- Atnaujintas `lodash` nuo 4.17.23 iki 4.18.1 10-StreamliningAIWorkflows inspektoriuje

#### Vertimai

- Sinchronizuoti vertimai daugiau nei 48 kalbomis su naujausiais šaltinio pakeitimais (i18n atnaujinimas)

---

## 2026 m. vasario 5 d.

### Visos saugyklos patvirtinimo ir navigacijos patobulinimai

#### Pridėtas naujas mokymo turinys

**Modulis 03 - Pradžia**
- **12-mcp-hosts/README.md**: Naujas išsamus vadovas MCP nuomotojų nustatymui
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigūracijos pavyzdžiai
  - JSON konfigūracijos šablonai visiems pagrindiniams nuomotojams
  - Transporto tipų palyginimo lentelė (stdio, SSE/HTTP, WebSocket)
  - Dažnų ryšio problemų sprendimai
  - Saugumo geriausios praktikos nuomotojų konfigūracijai

- **13-mcp-inspector/README.md**: Naujas MCP inspektoriaus derinimo vadovas
  - Įdiegimo būdai (npx, npm global, iš šaltinio)
  - Jungtys prie serverių per stdio ir HTTP/SSE
  - Įrankių, resursų ir užklausų darbo srautų testavimas
  - VS Code integracija su MCP inspektoriumi
  - Dažnos derinimo situacijos ir sprendimai

**Modulis 04 - Praktinė įgyvendinimas**
- **pagination/README.md**: Naujas puslapiavimo įgyvendinimo vadovas
  - Baigtinio žymeklio pagrindu pagrįsti puslapiavimo modeliai Python, TypeScript, Java
  - Kliento pusės puslapiavimo valdymas
  - Žymeklio dizaino strategijos (nepermatomas vs struktūrizuotas)
  - Produktyvumo optimizavimo rekomendacijos

**Modulis 05 - Pažangios temos**
- **mcp-protocol-features/README.md**: Naujas gilus protokolo funkcijų apžvalga
  - Progreso pranešimų įgyvendinimas
  - Užklausų atšaukimo modeliai
  - Išteklų šablonai su URI modeliais
  - Serverio gyvavimo ciklo valdymas
  - Registravimo lygių valdymas
  - Klaidų valdymo modeliai su JSON-RPC kodais

#### Navigacijos pataisymai (atnaujinta daugiau nei 24 failai)

**Pagrindinio modulio README failai**
 Dabar nuorodos veda tiek į pirmą pamoką, TIEK į kitą modulį

**02-Security poskyriai**
- Visi 5 papildomi saugumo dokumentai dabar turi „Kas toliau“ navigaciją:

**09-CaseStudy failai**
- Visi bylos tyrimų failai dabar turi sekamą navigaciją:

**10-StreamliningAI laboratorijos**
Pridėta sekamo skyriaus dalis į Modulio 10 apžvalgą ir Modulio 11 apžvalgą

#### Kodo ir turinio pataisymai

**SDK ir priklausomybių atnaujinimai**
Ištaisyta tuščia openai versija į `^4.95.0`
Atnaujintas SDK nuo `^1.8.0` iki `>=1.26.0`
Atnaujinti mcp versijos pinai į `>=1.26.0`

**Kodo pataisymai**
Ištaisyta negaliojanti modelio `gpt-4o-mini` į `gpt-4.1-mini`

**Turinio pataisymai**
Ištaisyta sulaužyta nuoroda `READMEmd` → `README.md`, pataisytas mokymo temos antraštės pavadinimas `Module 1-3` → `Module 0-3`, pataisytas didžiąja ir mažąja raide nesuderintas kelias
Pašalintas sugadintas dubliuotas Bylos tyrimas 5 turinys

**Pradedančiųjų vadovybės patobulinimai**
Pridėta tinkama įžanga, mokymosi tikslai ir reikalingos žinios pradedantiesiems

#### Mokymo plano atnaujinimai

**Pagrindinis README.md**
- Pridėti įrašai 3.12 (MCP Nuomotojai), 3.13 (MCP Inspektorius), 4.1 (Puslapiavimas), 5.16 (Protokolo funkcijos) į mokymo planų lentelę

**Modulių README failai**
Pridėtos pamokos 12 ir 13 į pamokų sąrašą
Pridėtas skyrius Praktiniai vadovai su puslapiavimo nuoroda
Pridėtos pamokos 5.15 (Pasirinktinis transportas) ir 5.16 (Protokolo funkcijos)

**study_guide.md**
- Atnaujinta žemėlapio diagrama su visomis naujomis temomis: MCP nuomotojų nustatymas, MCP inspektorius, puslapiavimo strategijos, protokolo funkcijų giluminis apžvalga

## 2026 m. sausio 28 d.

### MCP specifikacijos 2025-11-25 atitikimo peržiūra

#### Pagrindinių sąvokų patobulinimai (01-CoreConcepts/)
- **Naujas kliento primityvas - Roots**: Pridėta išsami dokumentacija apie Roots kliento primityvą, leidžiantį serveriams suprasti failų sistemos ribas ir prieigos teises
- **Įrankių anotacijos**: Pridėta dokumentacija apie įrankių elgesio anotacijas (`readOnlyHint`, `destructiveHint`) geresniam sprendimų priėmimui vykdant įrankius
- **Įrankių kvietimas mėgdžiojimo metu**: Atkoreguota mėgdžiojimo dokumentacija, įtraukta `tools` ir `toolChoice` parametrai modeliui leidžiantį kvietimus įrankiams per mėgdžiojimo užklausas
- **URL režimo inicijavimas**: Pridėta dokumentacija apie URL pagrindu inicijuojamus serverio išorinius interneto sąveikos veiksmus
- **Užduotys (Eksperimentinis)**: Pridėtas naujas skyrius apie eksperimentinę Užduočių funkciją, skirtą patvariam vykdymui ir atidėto rezultato gavimui
- **Piktogramų palaikymas**: Nurodyta, kad įrankiai, ištekliai, išteklių šablonai ir užklausos gali turėti piktogramas kaip papildomą metaduomenį

#### Dokumentacijos atnaujinimai
- **README.md**: Pridėta MCP specifikacijos 2025-11-25 versijos nuoroda ir versijavimo pagal datą paaiškinimas
- **study_guide.md**: Atnaujintas mokymo planas, įtraukiant Užduotis ir Įrankių anotacijas Pagrindinių sąvokų skyriuje; atnaujintas dokumento laiko žymeklis

#### Specifikacijos atitikimo patikra
- **Protokolo versija**: Patvirtinta, kad visa dokumentacija atitinka MCP specifikaciją 2025-11-25
- **Architektūros suderinamumas**: Patvirtinta dviejų sluoksnių architektūra (Duomenų sluoksnis + Transporto sluoksnis)
- **Primityvų dokumentacija**: Patikrinta serverio primityvai (Ištekliai, Užklausos, Įrankiai) ir kliento primityvai (Mėgdžiojimas, Inicijavimas, Registravimas, Roots)
- **Transporto mechanizmai**: Patikrinta STDIO ir streaminamas HTTP transporto dokumentacijos tikslumas
- **Saugumo gairės**: Patvirtinta, kad atitinka naujausias MCP saugumo geriausias praktikas

#### Pagrindinės MCP 2025-11-25 funkcijos dokumentuotos
- **OpenID Connect atradimas**: Autentifikavimo serverio atradimas per OIDC
- **OAuth kliento ID metaduomenų dokumentai**: Rekomenduojamas kliento registracijos mechanizmas
- **JSON Schema 2020-12**: Numatytoji MCP schemos šnekta
- **SDK sluoksnių sistema**: Formalizuoti reikalavimai SDK funkcijų palaikymui ir priežiūrai
- **Valdymo struktūra**: Oficialus darbo grupių ir interesų grupių įforminimas MCP valdyme

### Didelis saugumo dokumentacijos atnaujinimas (02-Security/)

#### MCP saugumo viršūnių dirbtuvių (Sherpa) integracija
- **Naujas praktinių mokymų šaltinis**: Pridėta išsami integracija su [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) visoje saugumo dokumentacijoje
- **Ekspedicijos maršruto aprėptis**: Dokumentuotas visas kelias nuo Bazinio stovyklo iki Viršūnės
- **OWASP atitiktis**: Visa saugumo informacija susieta su OWASP MCP Azure Security Guide rizikomis

#### OWASP MCP Top 10 integracija
- **Naujas skyrius**: Pridėta OWASP MCP Top 10 saugumo rizikų lentelė su Azure rizikos mažinimo priemonėmis pagrindiniame saugumo README
- **Rizikomis grindžiama dokumentacija**: Atnaujintas mcp-security-controls-2025.md su OWASP MCP rizikų nuorodomis kiekvienai saugumo sričiai
- **Atitinkamos architektūros nuoroda**: Susieta su OWASP MCP Azure Security Guide referencine architektūra ir įgyvendinimo modeliais

#### Atnaujinti saugumo failai
- **README.md**: Pridėta Sherpa dirbtuvių apžvalga, ekspedicijos maršruto lentelė, OWASP MCP Top 10 rizikų santrauka ir praktinių mokymų skyrius
- **mcp-security-controls-2025.md**: Atnaujinta antraštė į 2026 m. vasarį, pridėtos OWASP rizikų nuorodos (MCP01-MCP08), ištaisyta specifikacijos versijos neatitikimas
- **mcp-security-best-practices-2025.md**: Pridėta Sherpa ir OWASP šaltinių skiltis, atnaujintas laiko žymeklis
- **mcp-best-practices.md**: Pridėtas praktinių mokymų skyrius su Sherpa ir OWASP nuorodomis
- **azure-content-safety-implementation.md**: Pridėta OWASP MCP06 nuoroda, Sherpa stovyklos 3 atitikmuo ir papildoma šaltinių skiltis

#### Pridėtos naujos nuorodos į išteklius
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individualios OWASP MCP rizikų puslapiai (MCP01–MCP10)

### Visos mokymo medžiagos MCP specifikacijos 2025-11-25 suderinamumas

#### Modulis 03 - Pradžia
- **SDK dokumentacija**: Pridėtas Go SDK oficialių SDK sąraše; atnaujintos visos SDK nuorodos suderintos su MCP specifikacija 2025-11-25
- **Transporto paaiškinimai**: Atnaujinti STDIO ir HTTP srautinio transporto aprašymai su aiškiomis specifikacijos nuorodomis

#### Modulis 04 - Praktinis įgyvendinimas
- **SDK atnaujinimai**: Pridėtas Go SDK; atnaujintas SDK sąrašas su specifikacijos versijos nuoroda
- **Autorizacijos specifikacija**: Atnaujinta MCP autorizacijos specifikacijos nuoroda į dabartinę 2025-11-25 versiją

#### Modulis 05 - Pažangios temos
- **Naujos funkcijos**: Pridėtas pranešimas apie MCP specifikacijos 2025-11-25 naujoves (Užduotys, Įrankių anotacijos, URL režimo inicijavimas, Roots)
- **Saugumo šaltiniai**: Pridėtos OWASP MCP Top 10 ir Sherpa dirbtuvių nuorodos papildomoms nuorodoms

#### Modulis 06 - Bendruomenės indėlis
- **SDK sąrašas**: Pridėti Swift ir Rust SDK; atnaujinta specifikacijos nuoroda į 2025-11-25
- **Specifikacijos nuoroda**: Atnaujinta nuoroda į tiesioginį MCP specifikacijos URL

#### Modulis 07 - Ankstyvosios pritaikymo pamokos
- **Ištekliai**: Pridėta MCP specifikacijos 2025-11-25 nuoroda ir OWASP MCP Top 10 į papildomų šaltinių sąrašą

#### Modulis 08 - Geriausios praktikos
- **Specifikacijos versija**: Atnaujinta MCP specifikacijos nuoroda į 2025-11-25
- **Saugumo šaltiniai**: Pridėta OWASP MCP Top 10 ir Sherpa dirbtuvių nuorodos papildomų nuorodų skyriuje

#### Modulis 10 - Dirbtinio intelekto darbo srautų tobulinimas
- **Ženklo atnaujinimas**: MCP versijos ženklelis pakeistas nuo SDK versijos (1.9.3) į specifikacijos versiją (2025-11-25)
- **Ištekliai**: Atnaujinta MCP specifikacijos nuoroda; pridėta OWASP MCP Top 10

#### Modulis 11 - MCP serverio praktiškos laboratorijos
- **Specifikacijos nuoroda**: Atnaujinta MCP specifikacijos nuoroda į 2025-11-25 versiją
- **Saugumo ištekliai**: Pridėtas OWASP MCP Top 10 į oficialių išteklių sąrašą

## 2025 m. gruodžio 18 d.

### Saugumo dokumentacijos atnaujinimas - MCP specifikacija 2025-11-25

#### MCP saugumo gerosios praktikos (02-Security/mcp-best-practices.md) - specifikacijos versijos atnaujinimas
- **Protokolo versijos atnaujinimas**: Atnaujinta, kad nurodyta naujausia MCP specifikacija 2025-11-25 (išleista 2025 m. lapkričio 25 d.)
  - Atnaujintos visos specifikacijos versijos nuorodos nuo 2025-06-18 į 2025-11-25
  - Dokumento datos nuorodos atnaujintos nuo 2025 m. rugpjūčio 18 d. į 2025 m. gruodžio 18 d.
  - Patikrinta, kad visos specifikacijos URL nuorodos veda į naujausią dokumentaciją
- **Turinio tikrinimas**: Išsamus saugumo gerosios praktikos tikrinimas pagal naujausius standartus
  - **Microsoft saugumo sprendimai**: Patikrinti dabartiniai terminai ir nuorodos į Prompt Shields (anksčiau „Jailbreak rizikos aptikimas“), Azure Content Safety, Microsoft Entra ID ir Azure Key Vault
  - **OAuth 2.1 saugumas**: Patvirtintas atitikimas naujausioms OAuth saugumo gerosioms praktikoms
  - **OWASP standartai**: Patikrintos galiojančios OWASP Top 10 LLM
  - **Azure paslaugos**: Patikrinta visa Microsoft Azure dokumentacija ir rekomenduojamos praktikos
- **Standartų suderinamumas**: Patvirtinta visų naudojamų saugumo standartų galiojimas
  - NIST AI rizikos valdymo sistema
  - ISO 27001:2022
  - OAuth 2.1 saugumo gerosios praktikos
  - Azure saugumo ir atitikties pagrindai
- **Įgyvendinimo ištekliai**: Patikrintos visos nuorodos į įgyvendinimo vadovus ir šaltinius
  - Azure API valdymo autentifikacijos modeliai
  - Microsoft Entra ID integracijos gairės
  - Azure Key Vault slaptų duomenų valdymo instrukcijos
  - DevSecOps pajėgų ir stebėsenos sprendimai

### Dokumentacijos kokybės užtikrinimas
- **Specifikacijos atitikimas**: Užtikrinta, kad visi privalomi MCP saugumo reikalavimai (BŪTINA/BŪTINA NE) atitinka naujausią specifikaciją
- **Išteklių aktualumas**: Patikrintos visos išorinės Microsoft dokumentacijos, saugumo standartų ir įgyvendinimo gairių nuorodos
- **Geriausių praktikų apimtis**: Patvirtinta išsami autentifikacijos, autorizacijos, AI specifinių grėsmių, tiekimo grandinės saugumo ir įmonių modelių aprėptis

## 2025 m. spalio 6 d.

### Pradžios skyriaus išplėtimas – pažangus serverio naudojimas ir paprasta autentifikacija

#### Pažangus serverio naudojimas (03-GettingStarted/10-advanced)
- **Pridėta nauja skyrius**: Pateiktas išsamus vadovas apie pažangų MCP serverio naudojimą, aprėpiantis tiek įprastą, tiek žemo lygio serverio architektūras.
  - **Įprastinis vs Žemo Lygio Serveris**: Išsamus palyginimas ir kodų pavyzdžiai Python ir TypeScript abiem požiūriais.
  - **Handler'io pagrindu sukurta architektūra**: Paaiškinimas apie handler'io pagrindu valdomų įrankių/išteklių/priminimų valdymą mastelio keitimo ir lanksčiam serverių įgyvendinimui.
  - **Praktiniai šablonai**: Realybės scenarijai, kur žemo lygio serverio šablonai naudingi pažangioms funkcijoms ir architektūrai.

#### Paprastas autentifikavimas (03-GettingStarted/11-simple-auth)
- **Naujas skyrius pridėtas**: Žingsnis po žingsnio gidas, kaip įgyvendinti paprastą autentifikavimą MCP serveriuose.
  - **Autentifikavimo sampratos**: Aiškus autentifikavimo ir autorizacijos, bei kredencialų tvarkymo paaiškinimas.
  - **Paprastas autentifikavimo įgyvendinimas**: Tarpinio programinės įrangos (middleware) pagrindu sukurti autentifikavimo šablonai Python (Starlette) ir TypeScript (Express) su kodo pavyzdžiais.
  - **Tolesnis žingsnis į pažangią saugą**: Nurodymai, kaip pradėti nuo paprastos autentifikacijos ir pereiti prie OAuth 2.1 bei RBAC, su nuorodomis į pažangius saugumo modulius.

Šie papildymai suteikia praktiškas, rankomis vadovaujamas rekomendacijas, kaip kurti tvirtesnius, saugesnius ir lankstesnius MCP serverio įgyvendinimus, jungiant pagrindines sampratas su pažangiais gamybos šablonais.

## 2025 m. rugsėjo 29 d.

### MCP serverio duomenų bazės integracijos laboratorijos – išsamus praktinis mokymosi kelias

#### 11-MCPServerHandsOnLabs – naujas pilnas duomenų bazės integracijos mokymo planas
- **Pilnas 13 laboratorijų mokymosi kelias**: pridėtas išsamus praktinis mokymo planas kuriant gamybinės klasės MCP serverius su PostgreSQL duomenų bazės integracija
  - **Realybės įgyvendinimas**: Zava Retail analizės atvejis demonstruojantis įmonių lygio šablonus
  - **Struktūruotas mokymosi progresas**:
    - **Laboratorijos 00-03: Pagrindai** – Įvadas, Pagrindinė architektūra, Saugumas ir daugiavartotojiškumas, Aplinkos paruošimas
    - **Laboratorijos 04-06: MCP serverio kūrimas** – Duomenų bazės dizainas ir schema, MCP serverio įgyvendinimas, Įrankių kūrimas  
    - **Laboratorijos 07-09: Pažangios funkcijos** – Semantinio paieškos integracija, testavimas ir derinimas, VS Code integracija
    - **Laboratorijos 10-12: Gamyba ir geriausios praktikos** – Diegimo strategijos, stebėjimas ir stebėjimo priemonės, geriausios praktikos ir optimizavimas
  - **Verslo technologijos**: FastMCP karkasas, PostgreSQL su pgvector, Azure OpenAI įdėjiniai, Azure Container Apps, Application Insights
  - **Pažangios funkcijos**: Eilutės lygio saugumas (RLS), semantinė paieška, daugiavartotojiškas duomenų prieigos valdymas, vektoriaus įdėjiniai, realaus laiko stebėjimas

#### Terminologijos standartizavimas – modulio keitimas į laboratoriją
- **Išsamus dokumentacijos atnaujinimas**: sistemingai atnaujinti visi README failai 11-MCPServerHandsOnLabs dalyje, keista „Modulis“ į „Laboratorija“
  - **Skyriaus antraštės**: „Kas apima šį modulį“ pakeista į „Kas apima šią laboratoriją“ visuose 13 laboratorijų aprašuose
  - **Turinio aprašymas**: “Šis modulis teikia…” pakeista į „Ši laboratorija teikia...“ visoje dokumentacijoje
  - **Mokymosi tikslai**: „Iki šio modulio pabaigos...“ atnaujinta į „Iki šios laboratorijos pabaigos...“
  - **Navigacijos nuorodos**: visos „Modulis XX:“ nuorodos pakeistos į „Laboratorija XX:“ tarp kryžminių nuorodų ir navigacijos
  - **Pabaigos sekimo atnaujinimai**: „Po šio modulio užbaigimo...“ atnaujinta į „Po šios laboratorijos užbaigimo...“
  - **Išsaugotos techninės nuorodos**: Python modulio nuorodos konfigūracijos failuose (pvz., `"module": "mcp_server.main"`) paliktos nepakitusios

#### Mokymosi gido patobulinimai (study_guide.md)
- **Vizualus mokymo planas**: pridėtas naujas skyrius „11. Duomenų bazės integracijos laboratorijos“ su išsamia laboratorijų struktūros vizualizacija
- **Saugyklos struktūra**: atnaujintas iš dešimties į vienuolika pagrindinių skyrių su išsamia aprašo 11-MCPServerHandsOnLabs
- **Mokymosi kelio nurodymai**: patobulinti navigacijos nurodymai, apimantys skyrius 00–11
- **Technologijų aprėptis**: pridėta FastMCP, PostgreSQL, Azure paslaugų integracijos informacija
- **Mokymosi rezultatai**: pabrėžtas gamybinės klasės serverių kūrimas, duomenų bazės integracijos šablonai ir verslo saugumas

#### Pagrindinio README struktūros patobulinimas
- **Laboratorijų terminologija**: pagrindinis README.md faile 11-MCPServerHandsOnLabs dalyje nuosekliai naudojama „Laboratorijos“ struktūra
- **Mokymosi kelio organizavimas**: aiškus progresas nuo pagrindinių sampratų iki pažangaus įgyvendinimo ir gamybinio diegimo
- **Realios praktikos dėmesys**: akcentas į praktinį mokymąsi su verslo lygio šablonais ir technologijomis

### Dokumentacijos kokybės ir nuoseklumo tobulinimai
- **Praktinio mokymosi akcentas**: sustiprinta laboratorijomis grįsto praktinio mokymosi svarba visoje dokumentacijoje
- **Verslo šablonų dėmesys**: išryškinti gamybinės klasės įgyvendinimai ir verslo saugumo aspektai
- **Technologijų integracija**: išsamus naujausių Azure paslaugų ir AI integravimo šablonų aprėptis
- **Mokymosi progresas**: aiškus, struktūruotas kelias nuo pagrindinių sampratų iki gamybinio diegimo

## 2025 m. rugsėjo 26 d.

### Atvejo studijų patobulinimai – GitHub MCP registrų integracija

#### Atvejo studijos (09-CaseStudy/) – ekosistemos vystymo dėmesys
- **README.md**: didelis išplėtimas su išsamia GitHub MCP registrų atvejo studija
  - **GitHub MCP registrų atvejo studija**: nauja išsami atvejo studija, nagrinėjanti GitHub MCP registro startą 2025 m. rugsėjį
    - **Problemos analizė**: detali fragmentuoto MCP serverių aptikimo ir diegimo iššukių analizė
    - **Sprendimo architektūra**: GitHub centralizuota registrų sistema su vieno paspaudimo VS Code diegimu
    - **Verslo poveikis**: matomi pagerėjimai kūrėjų integracijos ir produktyvumo srityse
    - **Strateginė vertė**: modulinio agentų diegimo ir kryžminių įrankių sąveikos akcentas
    - **Ekosistemos vystymas**: pozicionavimas kaip pagrindinė agentinė integracijos platforma
  - **Patobulinta atvejo studijų struktūra**: visos septynios atvejo studijos atnaujintos su nuoseklia forma ir išsamiais aprašymais
    - Azure AI kelionių agentai: daugagentės orkestracijos akcentas
    - Azure DevOps integracija: darbo eigos automatizavimo dėmesys
    - Realaus laiko dokumentacijos gavimas: Python konsolės kliento įgyvendinimas
    - Interaktyvus mokymosi plano generatorius: Chainlit pokalbių žiniatinklio programėlė
    - Redaktoriaus viduje dokumentacija: VS Code ir GitHub Copilot integracija
    - Azure API valdymas: įmonių API integracijos šablonai
    - GitHub MCP registras: ekosistemos ir bendruomenės platformos kūrimas
  - **Išsami išvada**: perrašytas išvadinis skyrius, apimantis septynias atvejo studijas, apimančias daugelį MCP įgyvendinimo dimensijų
    - Įmonių integracija, daugagentė orkestracija, kūrėjų produktyvumas
    - Ekosistemos vystymas, švietimo programų kategorija
    - Patobulintos įžvalgos apie architektūrinius šablonus, įgyvendinimo strategijas ir geriausias praktikas
    - Akcentas į MCP kaip brandžią, gamybos lygio protokolą

#### Mokymosi vadovo atnaujinimai (study_guide.md)
- **Vizualus mokymo planas**: atnaujintas minčių žemėlapis, įtraukiant GitHub MCP registrą į Atvejo studijų skyrių
- **Atvejo studijų aprašymas**: patobulintas nuo bendrinių aprašų iki išsamaus septynių atvejo studijų skaidymo
- **Saugyklos struktūra**: atnaujintas skyrius 10, apimantis išsamų atvejo studijų aprėptį su specifinėmis įgyvendinimo detalėmis
- **Pakeitimų žurnalas (Changelog)**: pridėtas 2025 m. rugsėjo 26 d. įrašas, dokumentuojantis GitHub MCP registro pridėjimą ir atvejo studijų patobulinimus
- **Datos atnaujinimai**: atnaujintas poraštės laiko žymeklis į naujausią versiją (2025 m. rugsėjo 26 d.)

### Dokumentacijos kokybės gerinimai
- **Nuoseklumo stiprinimas**: standartizuotas atvejo studijų formatas ir struktūra visuose septyniuose pavyzdžiuose
- **Išsami aprėptis**: atvejo studijos dabar apima įmonių, kūrėjų produktyvumo ir ekosistemos vystymo scenarijus
- **Strateginis pozicionavimas**: sustiprintas akcentas į MCP kaip pagrindinę agentinių sistemų diegimo platformą
- **Išteklių integracija**: papildomi ištekliai atnaujinti, įtraukiant GitHub MCP registrą

## 2025 m. rugsėjo 15 d.

### Pažangių temų plėtra – Tinkinti transportai ir konteksto inžinerija

#### MCP tinkinti transportai (05-AdvancedTopics/mcp-transport/) – naujas pažangaus įgyvendinimo gidas
- **README.md**: pilnas vadovas, kaip įgyvendinti pasirinktinius MCP transporto mechanizmus
  - **Azure Event Grid transportas**: išsamus serverless įvykių valdomo transporto įgyvendinimas
    - C#, TypeScript ir Python pavyzdžiai su Azure Functions integracija
    - Įvykių valdomos architektūros šablonai mastelio didinimui MCP sprendimuose
    - Webhook gavėjai ir push pagrindu message valdymas
  - **Azure Event Hubs transportas**: aukšto pralaidumo srautinio duomenų transporto įgyvendinimas
    - Realaus laiko srautinės duomenų galimybės, skirtos žemo delsos scenarijoms
    - Particionavimo strategijos ir atrankos taškų valdymas
    - Žinučių grupavimas ir našumo optimizavimas
  - **Įmonių integracijos šablonai**: gamybinės architektūros pavyzdžiai
    - Paskirstytas MCP apdorojimas per kelias Azure Functions
    - Hibridiniai transporto architektūros deriniai
    - Žinučių patvarumas, patikimumas ir klaidų valdymo strategijos
  - **Sauga ir stebėjimas**: Azure Key Vault integracija ir stebėjimo šablonai
    - Tvarkoma tapatybės autentifikacija ir mažiausių privilegijų prieigos politika
    - Application Insights telemetrija ir našumo stebėjimas
    - Grandinės nutrūkimo ir gedimų tolerancijos šablonai
  - **Testavimo pagrindai**: išsamios testavimo strategijos tinkintiems transportams
    - Vienetinis testavimas su testų dubleriais ir modeliavimu
    - Integracinis testavimas su Azure Test Containers
    - Našumo ir apkrovos testavimo svarstymai

#### Konteksto inžinerija (05-AdvancedTopics/mcp-contextengineering/) – besiformuojanti AI sritis
- **README.md**: išsamus konteksto inžinerijos kaip naujos srities tyrimas
  - **Pagrindinės principai**: pilnas konteksto dalinimasis, veiksmų sprendimų sąmoningumas ir konteksto lango valdymas
  - **MCP protokolo suderinamumas**: kaip MCP dizainas sprendžia konteksto inžinerijos iššūkius
    - Konteksto lango ribojimai ir progresyvios užklausos strategijos
    - Reikšmingumo nustatymas ir dinaminis konteksto gavimas
    - Daugiarūšis konteksto valdymas ir saugumo aspektai
  - **Įgyvendinimo metodai**: viengubos gijos vs daugagentės architektūros
    - Konteksto fragmentavimas ir prioritetų nustatymas
    - Progresyvus konteksto užkrovimas ir suspaudimo metodikos
    - Sluoksniuotas konteksto požiūris ir gavimo optimizavimas
  - **Matavimo sistema**: besiformuojantys rodikliai konteksto efektyvumo vertinimui
    - Įvesties efektyvumas, našumas, kokybė ir naudotojo patirtis
    - Eksperimentiniai metodai konteksto optimizavimui
    - Gedimų analizė ir tobulinimo metodologijos

#### Mokymo planų navigacijos atnaujinimai (README.md)
- **Patobulinta modulio struktūra**: atnaujinta mokymo planų lentelė, įtraukiant naujas pažangias temas
  - Įtrauktos temos: Konteksto inžinerija (5.14) ir Tinkintas transportas (5.15)
  - Nuoseklaus formatavimo ir navigacijos nuorodų palaikymas visuose moduliuose
  - Atnaujinti aprašymai, atspindintys esamą turinio aprėptį

### Katalogo struktūros patobulinimai
- **Pavadinimų standartizavimas**: „mcp transport“ pervadintas į „mcp-transport“ siekiant nuoseklumo su kitais pažangių temų katalogais
- **Turinio organizavimas**: visi 05-AdvancedTopics katalogai dabar naudoto šabloną mcp-[tema]

### Dokumentacijos kokybės patobulinimai
- **MCP specifikacijos suderinamumas**: visas naujas turinys atitinka MCP specifikaciją 2025-06-18
- **Daugiakalbiai pavyzdžiai**: išsamūs kodo pavyzdžiai C#, TypeScript ir Python kalbomis
- **Įmonių orientacija**: gamybiniai šablonai ir Azure debesų integracija visoje medžiagoje
- **Vizualinė dokumentacija**: Mermaid diagramos architektūros ir srautų vizualizacijai

## 2025 m. rugpjūčio 18 d.

### Dokumentacijos išsamus atnaujinimas – MCP 2025-06-18 standartai

#### MCP saugumo geriausios praktikos (02-Security/) – pilna modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: pilnas perrašymas, suderintas su MCP specifikacija 2025-06-18
  - **Privalomi reikalavimai**: pridėti aiškūs MUST/MUST NOT reikalavimai pagal oficialią specifikaciją su aiškiais vizualiniais ženklais
  - **12 pagrindinių saugumo sritčių**: pertvarkyta iš 15 punktų į išsamių saugumo sričių sąrašą
    - Žetonų saugumas ir autentifikavimas su išorinio tapatybės teikėjo integracija
    - Sesijų valdymas ir transporto saugumas su kriptografiniais reikalavimais
    - AI specifinė grėsmių apsauga su Microsoft Prompt Shields integracija
    - Prieigos kontrolė ir leidimai pagal mažiausių teisių principą
    - Turinys saugumas ir stebėjimas su Azure Content Safety integracija
    - Tiekimo grandinės saugumas su komponentų tikrinimu
    - OAuth saugumas ir sukčiavimo prevencija su PKCE įgyvendinimu
    - Incidentų valdymas ir atkūrimas su automatizuotomis galimybėmis
    - Atitiktis ir valdymas su reguliavimo reikalavimais
    - Pažangūs saugumo valdikliai su nulinės pasitikėjimo architektūra
    - Microsoft saugumo ekosistemos integracija su išsamiais sprendimais
    - Nuolatinis saugumo evoliucijos procesas su adaptuotomis praktikomis
  - **Microsoft saugumo sprendimai**: tobulinti integracijos gairės su Prompt Shields, Azure Content Safety, Entra ID ir GitHub Advanced Security
  - **Įgyvendinimo ištekliai**: išsamios nuorodos pagal kategorijas: Oficialus MCP dokumentas, Microsoft saugumo sprendimai, saugumo standartai ir įgyvendinimo gidas

#### Pažangūs saugumo valdikliai (02-Security/) – įmonių įgyvendinimas
- **MCP-SECURITY-CONTROLS-2025.md**: pilnas pertvarkymas su įmonių lygio saugumo rėmu
  - **9 išsamios saugumo sritys**: išplėsta nuo bazinių kontrolės sričių iki detalaus įmonių saugumo modelio
    - Pažangus autentifikavimas ir autorizacija su Microsoft Entra ID integracija
    - Žetonų saugumas ir anti-passthrough kontrolės su išsamiu patvirtinimu
    - Sesijų saugumo valdikliai su užgrobtumo prevencija
    - AI specifiniai saugumo valdikliai su priminimų injekcijų ir įrankių apsinuodijimo prevencija
    - Sukčiavimo atakų prevencija su OAuth tarpinio serverio saugumu
    - Įrankių vykdymo saugumas su saugos konteineriais ir izoliuotumo politika
    - Tiekimo grandinės saugumo kontorliai su priklausomybių tikrinimu
    - Stebėjimo ir aptikimo valdikliai su SIEM integracija
    - Incidentų valdymas ir atkūrimas su automatizuotomis funkcijomis
  - **Įgyvendinimo pavyzdžiai**: pridėti detalūs YAML konfigūracijos blokai ir kodo pavyzdžiai
  - **Microsoft sprendimų integracija**: išsami Azure saugumo paslaugų, GitHub Advanced Security ir įmoninės tapatybės valdymo apžvalga

#### Pažangių temų saugumas (05-AdvancedTopics/mcp-security/) – gamybinio lygio įgyvendinimas
- **README.md**: pilnas perrašymas įmonių lygio saugumo įgyvendinimui
  - **Dabartinės specifikacijos suderinamumas**: atnaujinta pagal MCP specifikaciją 2025-06-18 su privalomais saugumo reikalavimais
  - **Patobulinta autentifikacija**: Microsoft Entra ID integracija su išsamiais .NET ir Java Spring Security pavyzdžiais
  - **AI saugumo integracija**: Microsoft Prompt Shields ir Azure Content Safety įgyvendinimas su detaliais Python pavyzdžiais
  - **Pažangi grėsmių mažinimas**: išsamūs įgyvendinimo pavyzdžiai
    - Sukčiavimo atakų prevencija su PKCE ir naudotojo sutikimo patikrinimu
    - Žetonų perleidimo prevencija su auditorijos patikra ir saugiu žetonų valdymu
    - Sesijos užgrobimo prevencija naudojant kriptografinį susiejimą ir elgesio analizę
  - **Įmonių saugumo integracija**: Azure Application Insights stebėsena, grėsmių aptikimo srautai ir tiekimo grandinės saugumas
  - **Įgyvendinimo kontrolinis sąrašas**: Aiškus privalomų ir rekomenduojamų saugumo priemonių skyrimas su Microsoft saugumo ekosistemos privalumais

### Dokumentacijos kokybė ir standartų atitikimas
- **Specifikacijos nuorodos**: Atnaujintos visos nuorodos į dabartinę MCP specifikaciją 2025-06-18
- **Microsoft saugumo ekosistema**: Pagerintos integracijos gairės visoje saugumo dokumentacijoje
- **Praktinis įgyvendinimas**: Pridėti išsamūs kodo pavyzdžiai .NET, Java ir Python kalbomis su verslo raštais
- **Išteklių organizavimas**: Išsamus oficialios dokumentacijos, saugumo standartų ir įgyvendinimo gidų kategorizavimas
- **Vizualūs indikatoriai**: Aiškus privalomų reikalavimų ir rekomenduojamų praktikų žymėjimas


#### Pagrindinės sąvokos (01-CoreConcepts/) – visiškas modernizavimas
- **Protoko versijos atnaujinimas**: Atnaujinta nuoroda į dabartinę MCP specifikaciją 2025-06-18 su datos pagrindu versijavimu (YYYY-MM-DD formatas)
- **Architektūros patobulinimai**: Patobulinti aprašymai apie šeimininkus, klientus ir serverius, atspindintys dabartinius MCP architektūros modelius
  - Šeimininkai dabar aiškiai apibrėžti kaip DI taikomosios programos, koordinuojančios kelias MCP kliento jungtis
  - Klientai aprašyti kaip protokolo jungtys, palaikančios vienas prie vieno serverio ryšius
  - Serveriai patobulinti su vietinės ir nuotolinės diegimo scenarijomis
- **Primitivų pertvarkymas**: Visiškas serverio ir kliento primityvų peržiūrėjimas
  - Serverio primityvai: Ištekliai (duomenų šaltiniai), Užklausos (šablonai), Įrankiai (vykdomos funkcijos) su išsamiu paaiškinimu ir pavyzdžiais
  - Kliento primityvai: Imimas mėginys (LLM užbaigimai), Informacijos rinkimas (vartotojo įvestis), Įrašymas (derinimas/stebėjimas)
  - Atnaujinta su dabartiniais atradimo (`*/list`), gavimo (`*/get`) ir vykdymo (`*/call`) metodų modeliais
- **Protoko architektūra**: Pristatytas dviejų sluoksnių architektūros modelis
  - Duomenų sluoksnis: JSON-RPC 2.0 pagrindas su gyvenimo ciklo valdymu ir primityvais
  - Perdavimų sluoksnis: STDIO (vietinis) ir srautu perduodamas HTTP su SSE (nuotolinis) perdavimo mechanizmai
- **Saugumo sistema**: Išsamios saugumo principų gairės, įskaitant aiškų vartotojo sutikimą, duomenų privatumo apsaugą, įrankių vykdymo saugumą ir perdavimo sluoksnio saugumą
- **Komunikacijos modeliai**: Atnaujinti protokolo pranešimai, atspindintys inicializaciją, atradimą, vykdymą ir pranešimus
- **Kodo pavyzdžiai**: Atnaujinti kelių kalbų (.NET, Java, Python, JavaScript) pavyzdžiai, atitinkantys dabartinius MCP SDK modelius

#### Saugumas (02-Security/) – visapusiškas saugumo perrašymas  
- **Standartų suderinimas**: Pilnas MCP specifikacijos 2025-06-18 saugumo reikalavimų įgyvendinimas
- **Autentifikacijos raida**: Aprašyta evoliucija nuo pasirinktinio OAuth serverių iki išorinio tapatybės teikėjo delegavimo (Microsoft Entra ID)
- **DI specifinis grėsmių analizė**: Patobulintas šiuolaikinių DI atakų modelių aptarimas
  - Išsamios užklausų injekcijos atakų scenarijos su realiais pavyzdžiais
  - Įrankių užnuodijimo mechanizmai ir „rug pull“ atakų modeliai
  - Konteksto lango užnuodijimas ir modelio painiavos atakos
- **Microsoft DI saugumo sprendimai**: Išsamus Microsoft saugumo ekosistemos aptarimas
  - DI užklausų skydai su pažangiomis aptikimo, išryškinimo ir skirtukų technikomis
  - Azure turinio saugos integracijos modeliai
  - GitHub pažangus saugumas tiekimo grandinės apsaugai
- **Pažangių grėsmių šalinimas**: Išsamios saugumo priemonės
  - Sesijos užgrobimo atvejai su MCP specifinėmis atakų situacijomis ir kriptografiniais sesijos ID reikalavimais
  - Painiausios atstovo problemos MCP proxy scenarijuose su aiškiais sutikimo reikalavimais
  - Žetonų persiuntimo pažeidžiamumai su privaloma patvirtinimo kontrole
- **Tiekimo grandinės saugumas**: Išplėstas DI tiekimo grandinės atvaizdavimas įskaitant pagrindinius modelius, reprezentacijų paslaugas, konteksto tiekėjus ir trečiųjų šalių API
- **Pagrindo saugumas**: Pagerinta integracija įmonių saugumo raštuose, įskaitant nulinės pasitikėjimo architektūrą ir Microsoft saugumo ekosistemą
- **Išteklių organizavimas**: Kategorizuotos išsamios išteklių nuorodos pagal tipą (Oficiali dokumentacija, Standartai, Tyrimai, Microsoft sprendimai, Įgyvendinimo gidai)

### Dokumentacijos kokybės patobulinimai
- **Struktūrizuoti mokymosi tikslai**: Pagerinti mokymosi tikslai su konkrečiais ir veiksmingais rezultatais 
- **Kryžminės nuorodos**: Pridėtos nuorodos tarp susijusių saugumo ir pagrindinių sąvokų temų
- **Dabartinė informacija**: Atnaujintos visos datos nuorodos ir specifikacijų saitai į dabartinius standartus
- **Įgyvendinimo gairės**: Pridėtos konkrečios, veiksmingos įgyvendinimo instrukcijos abiejuose skyriuose

## 2025 m. liepos 16 d.

### README ir navigacijos patobulinimai
- Visiškai pertvarkyta programos eiga README.md faile
- Vietoje `<details>` žymų panaudotas labiau prieinamas lentelių formatas
- Sukurtos alternatyvios išdėstymo parinktys naujame kataloge "alternative_layouts"
- Pridėti kortelių tipo, skirtukų stiliaus ir akordeono stiliaus navigacijos pavyzdžiai
- Atnaujinta saugyklos struktūros dalis, įtraukiant visus naujausius failus
- Patobulinta skiltis "Kaip naudotis šia programa" su aiškiomis rekomendacijomis
- Atnaujintos MCP specifikacijos nuorodos į teisingus URL
- Pridėta Konteksto inžinerijos skiltis (5.14) programos struktūroje

### Studijų gido atnaujinimai
- Visiškai peržiūrėtas studijų gidas, atitinkantis dabartinę saugyklos struktūrą
- Pridėtos naujos skiltys MCP klientams ir įrankiams, bei populiariems MCP serveriams
- Atnaujinta vizualinė programos schema, tiksliai atspindinti visas temas
- Patobulinti išplėstiniai teminiai aprašymai, aprėpiantys visas specializuotas sritis
- Atnaujinta atvejų analizės skiltis, atspindinti tikrus pavyzdžius
- Pridėtas šis išsamus pakeitimų žurnalas

### Bendruomenės indėliai (06-CommunityContributions/)
- Pridėta išsami informacija apie MCP serverius vaizdų generavimui
- Pridėta išsami skiltis apie Claude naudojimą VSCode
- Pridėtos instrukcijos, kaip įdiegti ir naudoti Cline terminalo klientą
- Atnaujinta MCP klientų dalis, įtraukiant visus populiarius klientus
- Patobulinti indėlių pavyzdžiai su tikslesniais kodo pavyzdžiais

### Išplėstinės temos (05-AdvancedTopics/)
- Sutvarkyti visi specializuotų temų katalogai su nuosekliomis pavadinimų konvencijomis
- Pridėti konteksto inžinerijos medžiaga ir pavyzdžiai
- Pridėta Foundry agento integracijos dokumentacija
- Patobulinta Entra ID saugumo integracijos dokumentacija

## 2025 m. birželio 11 d.

### Pradinis sukūrimas
- Išleista pirmoji MCP pradedantiesiems programos versija
- Sukurta pagrindinė visa 10 pagrindinių skyrių struktūra
- Įgyvendinta vizualinė programos schema navigacijai
- Pridėti pradiniai pavyzdiniai projektai keliomis programavimo kalbomis

### Pradžia (03-GettingStarted/)
- Sukurti pirmieji serverio įgyvendinimo pavyzdžiai
- Pridėta klientų kūrimo gairių
- Įtraukta LLM kliento integracijos instrukcijos
- Pridėta VS Code integracijos dokumentacija
- Įgyvendinti Server-Sent Events (SSE) serverio pavyzdžiai

### Pagrindinės sąvokos (01-CoreConcepts/)
- Pridėtas išsamus klientų-serverių architektūros paaiškinimas
- Sukurta dokumentacija apie pagrindines protokolo dalis
- Dokumentuoti žinučių modeliai MCP protokole

## 2025 m. gegužės 23 d.

### Saugyklos struktūra
- Inicializuota saugykla su pagrindine katalogų struktūra
- Sukurti README failai kiekvienam pagrindiniam skyriui
- Įdiegta vertimo infrastruktūra
- Pridėtos vaizdų medžiagos ir diagramų failai

### Dokumentacija
- Sukurtas pradinio README.md su programos apžvalga
- Pridėti CODE_OF_CONDUCT.md ir SECURITY.md
- Sukurtas SUPPORT.md su pagalbos gavimo gairėmis
- Sukurta preliminari studijų gido struktūra

## 2025 m. balandžio 15 d.

### Planavimas ir sistema
- Pradinis MCP pradedantiesiems programos planavimas
- Apibrėžti mokymosi tikslai ir tikslinė auditorija
- Apžvelgta 10 skyrių programos struktūra
- Sukurtas konceptualus pagrindas pavyzdžiams ir atvejų analizėms
- Sukurti pradiniai prototipo pavyzdžiai pagrindinėms sąvokoms

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->