# Muudatuste logi: MCP algajatele koolitusprogramm

See dokument on Model Context Protocol (MCP) algajate koolitusprogrammi oluliste muutuste ajalugu. Muudatused on dokumenteeritud pööratud kronoloogilises järjekorras (uusimad muudatused eespool).

## 16. juuni 2026

### MCP spetsifikatsiooni joondamine ja näidiste valideerimine

Valideeriti koolitusprogramm vastavalt praegusele **MCP Specification 2025-11-25** ja viimastele ametlikele SDK-dele, seejärel parandati allesjäänud aegunud spetsifikatsiooni viited ja kinnitati, et põhinäited endiselt ehituvad ja töötavad.

#### Spetsifikatsiooni versiooni parandused (2025-06-18 / 2025-03-26 → 2025-11-25)

Uuendati ingliskeelset sisu, kus väideti endiselt, et vanem spetsiifikatsiooni versioon on *praegune/viimane* standard, ning suunati lingid kanonilistele `modelcontextprotocol.io` spetsiifikatsiooni radadele:
- **05-AdvancedTopics/mcp-security/README.md**: Uuendati "Praegune standard" bännerit, sissejuhatust, põhiturvapõhimõtteid, kohustuslike nõuete teemat, Microsoft Entra ID lõiku, Viidete ja ressursside linke ning lõpus olevat turvateadet (8 viidet) versioonile 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Uuendati lisavahendite spetsifikatsiooni linki ja "Praegune standard" bännerit versioonile 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Asendati aegunud `2025-03-26` turbe-ja-usaldus lingi uuema praeguse 2025-11-25 turbeparimate tavade lehega
- **03-GettingStarted/14-sampling/README.md**: Uuendati ametlikku proovivõtmise dokumentatsiooni linki versioonile 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Uuendati oleviku ajavormi "praegune MCP spetsifikatsioon" viidet ja lisavahendite spetsifikatsiooni linki versioonile 2025-11-25 (ajaloolised SSE-väljaheitmise märkused jäeti täpsuse huvides alles)

#### Näidiste valideerimine praeguste SDK-dega

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` lahendas `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` läbis ilma tüübivigadeta — olemasolevad `McpServer`/`StdioServerTransport` API-d kehtivad
- **Python (03-GettingStarted/01-first-server/solution/python)**: Valideeriti isoleeritud `.venv` keskkonnas `mcp[cli]` (1.27.2); `py_compile` läbis ja `FastMCP.list_tools()` tagastas korrektselt `add` ja `subtract` tööriistad
- Kinnitatud, et kõik näidistes olevad `@modelcontextprotocol/sdk` versioonivahemikud (`>=1.26.0` / `^1.26.0` / `^1.27.0`) lahenevad korralikult praeguseks `1.29.0` versiooniks ilma tagurpidi ühilduvuse probleemideta

#### Sõltuvuste pinni joondamine (versioonilünkade sulgemine)

Värskendati aegunud SDK pinnid nii, et iga näide jälgib praegust MCP versiooni, olles kooskõlas kogu repoga suhtumisega:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Uuendati `@modelcontextprotocol/sdk` nimetuselt `^1.8.0` → `>=1.26.0` ja parandati vananenud `"updated for MCP 2025-06-18"` paketikirjeldus versioonile `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ja **lab4/code/github_mcp_server/pyproject.toml**: Uuendati täpne pin `mcp==1.23.0` → `mcp>=1.26.0`; mõlema `uv.lock` faili uuesti genereerimine (`uv lock`) nii, et need lahendavad praeguse `mcp 1.27.2` versiooni ja oleksid seadistustega sünkroonis

#### Koolitusprogrammi lünkade analüüs — uusima spetsifikatsiooni funktsioonide katvus

Kontrollitud, et koolitusprogramm käsitleb juba kõiki MCP 2025-11-25 lisatud/laiendatud primitiive, seega puuduvad sisulised lüngad:
- **Proovivõtt**: Õppetund 03-GettingStarted/14-sampling koos 05-AdvancedTopics/mcp-sampling
- **Elicitation (sh URL-režiim)**: Käsitletud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features osades
- **Juured**: Käsitletud 00-Introduction, 01-CoreConcepts ja 05-AdvancedTopics/mcp-root-contexts osades
- **Ülesanded (katsejärgus, pikaajalised toimingud)**: Käsitletud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features osades
- **Tööriistamärkused** (`readOnlyHint` / `destructiveHint`): Käsitletud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features osades

### Turvalisuse tugevdamine & sõltuvuste haavatavuste parandamine

Töötati läbi kõik sõltuvuste manifestid ja näidiste lähtekood, seejärel parandati kõik raporteeritud npm hoiatused ja üks koodi taseme probleem. Pärast parandusi näitas `npm audit` **0 haavatavust** igas auditeeritud kataloogis.

#### npm sõltuvuse haavatavused (kaudsed) — Parandatud

Auditist leiti kõik 15 `package-lock.json` faili. Haavatavused piirdusid MCP Inspector arendustööriista, OpenAI kliendi ja MCP SDK kaudsete sõltuvustega; kõik on nüüd lahendatud ilma näidiseid katkendamata:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ja **lab3/code/weather_mcp/inspector**: Uuendati `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), mis eemaldab kaasatud `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ja `ws` hoiatused. Lisati npm `overrides` kirje, mis sunnib valmislahendatud `shell-quote@1.8.4` kasutamist, et kõrvaldada vastuoluline kriitiline hoiatus, mida kandis `concurrently`; mõlema lukufaili uuesti genereerimine (nüüd 0 haavatavust)
- **03-GettingStarted/samples/typescript**: `npm audit fix` uuendas kaudse `qs` (mõõdukas) parandatud versioonile
- **03-GettingStarted/samples/javascript**: `npm audit fix` uuendas kaudse `hono` (mõõdukas) parandatud versioonile
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` uuendas kaudse `form-data` (kõrge) parandatud versioonile
- **03-GettingStarted/11-simple-auth/solution/typescript**: Loodi puuduolev `package-lock.json`, et projekt oleks korratav ja auditeeritav (0 haavatavust)

#### Koodi taseme turvaparandus (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Eemaldati `shell=True` `open_in_vscode` tööriistast. Varasem `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` lubas käsuviiba erimärke kaustatee sees `cmd.exe` poolt tõlgendada (käsku täitva ründevektorina). Nüüd käivitab lahendatud `Code.exe` otse kausta argumendina — ilma kestata — see on funktsionaalselt võrdväärne ja turvaline.

#### Python sõltuvuste audit

- Audiiti läbisid kõik Python nõuete komplektid `pip-audit` tööriistaga. `05-AdvancedTopics` ja `03-GettingStarted/samples/python` raporteerisid **pole teadaolevaid haavatavusi** (nende `mcp` / `httpx` / `pydantic` / `python-dotenv` versioonid lahenevad praegustele parandatud versioonidele)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` tuvastas kaudse sõltuvuse **`werkzeug` 3.1.1** kolme `safe_join` Windows seadme nime DoS hoiatusega — `CVE-2025-66221`, `CVE-2026-21860` ja `CVE-2026-27199` (kõik parandatud versioonis 3.1.6). Lisati konkreetne turvalisuse kaugversioon `werkzeug>=3.1.6`, et lahendada parandatud versioon; kinnitati, et piirang lahendub korralikult koos `chainlit` / `mcp` / `semantic-kernel` virnastusega

### Tootenime ümberbrändimine

Uuendati kogu koolitusprogrammi sisu kajastamaks Microsofti tootenime muutust:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Uuendatud Discordi kogukonna link
- **AGENTS.md**: Uuendatud Discordi serveri viide
- **README.md**: Uuendatud tehnoloogia ökosüsteemi viited
- **study_guide.md**: Uuendatud juhtumiuuringu viited
- **05-AdvancedTopics/README.md**: Uuendatud mooduli 5.13 pealkiri ja kirjeldus
- **05-AdvancedTopics/mcp-integration/README.md**: Uuendatud sektsiooni päis ja kirjeldus
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Täielik mooduli pealkirja ja sisu uuendus
- **05-AdvancedTopics/mcp-security-entra/README.md**: Uuendatud ristviide link
- **07-LessonsfromEarlyAdoption/README.md**: Uuendatud juhtumiuuringu viited
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Uuendatud sektsioon 9 päis, märgised ja võimekused
- **08-BestPractices/README.md**: Uuendatud Discordi kogukonna link
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Uuendatud Discordi kanali viide
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Uuendatud mudeli juurutamise viide
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Uuendatud AI teenuste tabel
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Uuendatud ressursside viited

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Uuendatud põhilised koolitusprogrammi viited
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Uuendatud mooduli pealkiri, ülevaade ja kõik mooduli päised
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Uuendatud pealkiri, õpieesmärgid, seadistuse juhised ja ressursid
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Uuendatud pealkiri, õpieesmärgid, MCP hostide tabel ja ristviited
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Uuendatud pealkiri, märgised, eeldused ja ressursid
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Uuendatud Agent Builder viited ja tagasiside link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Uuendatud eeldused ja laienduse viited

---

## 11. aprill 2026

### Uus õppetund, dokumentatsiooni parandused ja sõltuvuste uuendused

#### Lisatud uus koolitusprogrammi sisu

**Moodul 05 - Täiustatud teemad**
- **Õppetund 5.17: Vastuoluline mitme agendi mõtlemine MCP-ga** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Uus põhjalik juhend, mis käsitleb vastuolulisi debattmustreid mitme agendi süsteemides
  - Mermaid arhitektuuri diagramm: kaks agenti → jagatud MCP server → debatitekst → kohtunik → otsus
  - Jagatud MCP tööriista server (`web_search` + `run_python`), rakendatud Pythonis ja TypeScriptis
  - Vastuolulised süsteemi promptid (FOR / AGAINST / Kohtunik) koos kordumata tööriistakasutuse nõuetega
  - Debatikorraldaja Pythonis, TypeScriptis ja C#-s, juhtides voorusid ja argumentide marsruuti
  - MCP `ClientSession` ühendus korraldajale päris tööriista kõnede jaoks
  - Kasutusjuhtumite tabel (hallutsinatsiooni tuvastamine, ohumudelite koostamine, API disaini ülevaatus, faktiline kontroll, tehnoloogia valik)
  - Turvaküsimused: liivakastitud täitmine, tööriistakõnede valideerimine, kiirusepiiramine, auditeerimine
  - Struktureeritud harjutus kolme praktilise stsenaariumiga (koodiläbivaatus, arhitektuuri otsus, sisu modereerimine)

#### Dokumentatsiooni parandused

**Moodul 03 - Algus**
- **05-stdio-server/README.md**: Parandati puudulikku TypeScript stdio serveri näidet — lisati puuduolev transpordi instants (`new StdioServerTransport()`) ja `server.connect(transport)` kutsumine, et sarnaneda Python ja .NET näidetega samas osas
- **14-sampling/README.md**: Parandati trükiviga — "Sampling is an davanced features" → "Sampling is an advanced feature"

#### Koolitusprogrammi uuendused

**Põhi README.md**
- Lisati õppetund 5.17 (Vastuoluline mitme agendi mõtlemine MCP-ga) koolitusprogrammi tabelisse otselinkiga uuele õppetunnile

**05-AdvancedTopics/README.md**
- Lisati õppetund 5.17 rida õppetundide tabelisse

**study_guide.md**
- Lisati Vastuoluline mitme agendi mõtlemine teema mõttemudelisse ja kirjeldusse Täiustatud Teemade alla

#### Koodi ja turvaparandused

**Moodul 05 - Vastuolulised agendid (`mcp-adversarial-agents`)**
- **Turvaparandus — käsu süstimine**: Asendati TypeScript `run_python` tööriista `execSync` kestata interpoleerimine `execFile` + `promisify` kasutamisega, kõrvaldades käsu süstimise haavatavuse (LLM juhtimisel olev kood edastatakse nüüd sõnasõnalise argv elemendina ilma kestata)
- **MCP tööriistade tsükli juhtmestik**: Uuendatud Pythoni arutelu orkestreerijat kasutama `AsyncAnthropic` klienti (asendades blokeeriva sünkroonse `Anthropic`), edastada otse igale agendi voorule elav `ClientSession`, hankida tööriistade definitsioone iga vooru ajal `session.list_tools()` kaudu ning käivitada `tool_use` plokke tsükliliselt `session.call_tool()` abil kuni mudel väljastab lõpliku tekstivastuse

#### Sõltuvuste uuendused

- `hono` tõstetud versioonile 4.12.12 mitmes paketis (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- `@hono/node-server` versioon uuendatud 1.19.11 pealt 1.19.13-ni TypeScripti paketis
- `cryptography` versioon uuendatud 46.0.5 pealt 46.0.7-ni Python pakettides (10-StreamliningAIWorkflows laborid 3 ja 4)
- `lodash` versioon uuendatud 4.17.23 pealt 4.18.1-ni 10-StreamliningAIWorkflows inspectoris

#### Tõlked

- Sünkroniseeritud tõlked 48+ keeles viimaste lähte muudatustega (i18n uuendus)

---

## 5. veebruar 2026

### Üldine hoidla valideerimine ja navigeerimise täiustused

#### Lisatud uus õppekava sisu

**Moodul 03 - Algus**
- **12-mcp-hosts/README.md**: Uus põhjalik juhend MCP hostide seadistamiseks
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfiguratsiooni näited
  - Kõigi suuremate hostide JSON konfiguratsiooni mallid
  - Ülekande tüüpide võrdlustabel (stdio, SSE/HTTP, WebSocket)
  - Levinumate ühendusprobleemide veaotsing
  - Hostide konfiguratsiooni turvalisuse parimad tavad

- **13-mcp-inspector/README.md**: Uus MCP Inspectori silumise juhend
  - Paigaldusmeetodid (npx, npm globaalselt, lähtekoodist)
  - Ühendamine serveritega stdio ja HTTP/SSE kaudu
  - Testimise tööriistad, ressursid ja kutsete töövood
  - VS Code integratsioon MCP Inspectoriga
  - Levinumad silumise stsenaariumid koos lahendustega

**Moodul 04 - Praktiline rakendamine**
- **pagination/README.md**: Uus leheküpitusest (pagination) juhend
  - Kursori põhised leheküpitusmustrid Pythonis, TypeScriptis, Javas
  - Kliendipoolse leheküpitusest haldamine
  - Kursori disaini strateegiad (läbipaistmatu vs struktureeritud)
  - Tulemuslikkuse optimeerimise soovitused

**Moodul 05 - Täiustatud teemad**
- **mcp-protocol-features/README.md**: Uus protokolli funktsioonide põhjalik ülevaade
  - Progressiteavituste rakendamine
  - Päringute tühistamise mustrid
  - Ressursi mallid URI mustritega
  - Serveri elutsükli haldamine
  - Logimise taseme kontroll
  - Vigade käitlemise mustrid JSON-RPC koodidega

#### Navigeerimisparandused (üle 24 faili uuendatud)

**Põhimooduli README-d**
 Nüüd lingivad nii esimesse õppetundi kui ka järgmisse moodulisse

**02-Security alamfailid**
- Kõigil 5 täiendaval turvade dokumendil on nüüd "Mis Järgmine" navigeerimine:

**09-Juhtumiuuringu failid**
- Kõik juhtumiuuringu failid on nüüd järjestatud navigeerimisega:

**10-StreamliningAI laborid**
Lisatud Mis Järgmine osad Moodul 10 ülevaatele ja Moodul 11-le

#### Koodi ja sisu parandused

**SDK ja sõltuvuste uuendused**
Parandatud tühi openai versioon `^4.95.0`
Uuendatud SDK versioon `^1.8.0` pealt `>=1.26.0`
Uuendatud mcp versiooni piirangud `>=1.26.0`

**Koodiparandused**
Parandatud vigane mudel `gpt-4o-mini` versiooniks `gpt-4.1-mini`

**Sisupärandused**
Parandatud katkine link `READMEmd` → `README.md`, parandatud õppekava päis `Module 1-3` → `Module 0-3`, parandatud suurtähelisus failiteel
Eemaldatud vigase sisuga dubleeritud Juhtumiuuring 5 sisu

**Algajate juhendamise täiustused**
Lisatud nõuetekohane sissejuhatus, õppimise eesmärgid ja eeldused algajatele

#### Õppekava uuendused

**Põhi README.md**
- Lisatud kirjed 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Leheküpitus), 5.16 (Protokolli funktsioonid) õppekava tabelisse

**Moodulite README-d**
Lisatud õppetunnid 12 ja 13 õppetöö nimekirja
Lisatud praktiliste juhendite sektsioon koos leheküpitus lingiga
Lisatud õppetunnid 5.15 (Kohandatud Transport) ja 5.16 (Protokolli funktsioonid)

**study_guide.md**
- Uuendatud mõttekart sõltuvalt kõikidest uutest teemadest: MCP Hosts seadistamine, MCP Inspector, leheküpitusstrateegiad, protokolli funktsioonide süvadi

## 28. jaanuar 2026

### MCP Spetsifikatsiooni 2025-11-25 Vastavuse Ülevaade

#### Põhimõistete täiustused (01-CoreConcepts/)
- **Uus kliendi primitiiv - Roots**: Lisatud põhjalik dokumentatsioon Roots kliendi primitiivi kohta, mis võimaldab serveritel mõista failisüsteemipiiranguid ja juurdepääsuõigusi
- **Tööriistade annotatsioonid**: Lisatud tööriistade käitumisannotatsioonid (`readOnlyHint`, `destructiveHint`) paremate tööriista täitmise otsuste tagamiseks
- **Tööriistakutsed proovides**: Uuendatud proovide dokumentatsiooni, et kaasata `tools` ja `toolChoice` parameetrid mudelipõhiseks tööriistakutsumiseks proovipäringutes
- **URL režiimi väljakutse**: Lisatud dokumentatsioon serveri algatatud väliste veebisuhtluste kohta, mis põhineb URL-l
- **Ülesanded (katsealune)**: Lisatud uus sektsioon katsealuste Ülesannete funktsiooni kohta, mis toetab püsivaid täitmispakendeid ja edasilükatud tulemuste pärimist
- **Ikoonide tugi**: Märkused, et tööriistad, ressursid, ressursimallid ja kutsed võivad nüüd sisaldada ikoone täiendava metaandmetena

#### Dokumentatsiooni uuendused
- **README.md**: Lisatud MCP Spetsifikatsiooni 2025-11-25 versiooni viide ja kuupõhine versioonihaldus selgitus
- **study_guide.md**: Uuendatud õppekava kaart lisades Ülesanded ja tööriistade annotatsioonid põhimõistete sektsioonis; uuendatud dokumendi ajatemplit

#### Spetsifikatsiooni nõuete kontroll
- **Protokolli versioon**: Kontrollitud, et kogu dokumentatsioon viitab MCP Spetsifikatsioonile 2025-11-25
- **Arhitektuuri vastavus**: Kinnitatud kahekihiline arhitektuur (Andmekiht + Ülekandekiht) dokumentatsiooni täpsus
- **Primitiivide dokumentatsioon**: Kontrollitud serveriprimitiive (Ressursid, Kutsed, Tööriistad) ja kliendiprimitiive (Proovimine, Väljakutse, Logimine, Roots)
- **Ülekanne mehhanismid**: Kontrollitud STDIO ja voogedastatavat HTTP ülekannet dokumentatsiooni täpsus
- **Turvanõuanded**: Kinnitatud vastavus MCP turvalisuse parimate tavade dokumentatsioonile

#### Olulised MCP 2025-11-25 funktsioonid dokumenteeritud
- **OpenID Connect avastus**: Autentimise serveri avastus OIDC abil
- **OAuth kliendi ID metaandmed**: Soovitatud kliendi registreerimise mehhanism
- **JSON Schema 2020-12**: MCP skeemide vaikedialekt
- **SDK kihistussüsteem**: Formaliseeritud nõuded SDK funktsioonitoele ja hooldusele
- **Juhtimissüsteem**: Formaliseeritud töörühmad ja huvirühmad MCP juhtimises

### Turbe dokumentatsiooni suur uuendus (02-Security/)

#### MCP Security Summit Workshop (Sherpa) integratsioon
- **Uus praktiline koolitusvahend**: Lisatud põhjalik integratsioon [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) kogu turbedokumentatsioonis
- **Ekspeditsiooni marsruut**: Dokumenteeritud täielik laagrilt lavani edenemise rada
- **OWASP vastavus**: Kõik turvajuhtnöörid kaardistatud OWASP MCP Azure Security Guide riskidega

#### OWASP MCP Top 10 integratsioon
- **Uus jaotis**: Lisatud OWASP MCP Top 10 turvariskide tabel peamise turvade README-sse koos Azure leevendustega
- **Riskipõhine dokumentatsioon**: Uuendatud mcp-security-controls-2025.md OWASP MCP riskiviidetega iga turvadomeeni kohta
- **Viite arhitektuur**: Lingitud OWASP MCP Azure Security Guide viite arhitektuuri ja rakendusmustritega

#### Uuendatud turbefailid
- **README.md**: Lisatud Sherpa Worksopi ülevaade, marsruudi tabel, OWASP MCP Top 10 riskide kokkuvõte ja praktilise koolituse sektsioon
- **mcp-security-controls-2025.md**: Uuendatud päis veebruar 2026, lisatud OWASP riskiviited (MCP01-MCP08), parandatud versioonikonflikt
- **mcp-security-best-practices-2025.md**: Lisatud Sherpa ja OWASP ressursside sektsioon, uuendatud ajatempel
- **mcp-best-practices.md**: Lisatud praktilise koolituse sektsioon Sherpa ja OWASP linkidega
- **azure-content-safety-implementation.md**: Lisatud OWASP MCP06 viide, Sherpa laager 3 vastavus ja lisatud täiendavad ressurssid

#### Uued ressursilingid lisatud
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuaalsed OWASP MCP riskilehed (MCP01-MCP10)

### Õppekava MCP Spetsifikatsiooni 2025-11-25 kooskõlastus

#### Moodul 03 - Algus
- **SDK dokumentatsioon**: Lisatud Go SDK ametlikku SDK nimekirja; uuendatud kõik SDK viited MCP Spetsifikatsiooni 2025-11-25 kooskõla tagamiseks
- **Ülekanne täpsustus**: Uuendatud STDIO ja HTTP voogedastuse transpordi kirjeldused konkreetsete spetsifikatsiooniviidetega

#### Moodul 04 - Praktiline rakendamine
- **SDK uuendused**: Lisatud Go SDK; uuendatud SDK nimekiri koos spetsifikatsiooni versiooniviitega
- **Autorisatsiooni spetsifikatsioon**: Uuendatud MCP autorisatsiooni spetsifikatsiooni link uusimale 2025-11-25 versioonile

#### Moodul 05 - Täiustatud teemad
- **Uued funktsioonid**: Lisatud märkus MCP Spetsifikatsiooni 2025-11-25 uutest funktsioonidest (Ülesanded, tööriistade annotatsioonid, URL-režiimi väljakutse, Roots)
- **Turberessursid**: Lisatud OWASP MCP Top 10 ja Sherpa workshop lingid täiendavatesse allikatesse

#### Moodul 06 - Kogukonna panused
- **SDK nimekiri**: Lisatud Swift ja Rust SDK-d; uuendatud spetsifikatsiooni link 2025-11-25 versioonile
- **Spetsifikatsiooni viide**: Uuendatud MCP Spetsifikatsiooni otsesele URL-ile

#### Moodul 07 - Varajase kasutuse õppetunnid
- **Ressursi uuendused**: Lisatud MCP Spetsifikatsiooni 2025-11-25 link ja OWASP MCP Top 10 täiendavatesse ressurssidesse

#### Moodul 08 - Parimad tavad
- **Versioon**: Uuendatud MCP Spetsifikatsiooni viide 2025-11-25
- **Turberessursid**: Lisatud OWASP MCP Top 10 ja Sherpa workshop täiendavatesse viidetes

#### Moodul 10 - AI töövoogude sujuvamaks muutmine
- **Märgi uuendus**: Muudetud MCP versiooni märk SDK versioonilt (1.9.3) spetsifikatsiooni versioonile (2025-11-25)
- **Resursside lingid**: Uuendatud MCP Spetsifikatsiooni link; lisatud OWASP MCP Top 10

#### Moodul 11 - MCP serveri praktilised laborid
- **Spetsifikatsiooni link**: Uuendatud MCP Spetsifikatsiooni viide 2025-11-25 versioonile
- **Turberessursid**: Lisatud OWASP MCP Top 10 ametlikesse ressurssidesse

## 18. detsember 2025

### Turbedokumentatsiooni uuendus - MCP Spetsifikatsioon 2025-11-25

#### MCP turvalisuse parimad tavade dokumendid (02-Security/mcp-best-practices.md) - Spetsifikatsiooni versiooni uuendus
- **Protokolli versiooni uuendus**: Uuendatud viited uusimale MCP Spetsifikatsioonile 2025-11-25 (välja antud 25. novembril 2025)
  - Uuendatud kõik spetsifikatsiooni versiooni viited 2025-06-18 pealt 2025-11-25
  - Uuendatud dokumendi kuupäeva viited august 18, 2025 pealt detsember 18, 2025
  - Kontrollitud, et kõik spetsifikatsiooni URL-id viitavad ajakohasele dokumentatsioonile
- **Sisu valideerimine**: Põhjalik turvalisuse parimate tavade valideerimine viimaste standardite alusel
  - **Microsofti turbelahendused**: Kontrollitud ajakohast terminoloogiat ja linke Prompt Shieldide (varem "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID ja Azure Key Vault kohta
  - **OAuth 2.1 turvalisus**: Kinnitatud vastavus uusimatele OAuth turvalisuse parimatele tavadele
  - **OWASP standardid**: Kontrollitud OWASP Top 10 LLM-dele on ajakohased
  - **Azure teenused**: Kinnitatud kõik Microsoft Azure dokumentatsiooni lingid ja parimad tavad
- **Standardite nõuetele vastavus**: Kõik viidatud turbestandardid kinnitatud ajakohaseks
  - NIST AI riskijuhtimise raamistik
  - ISO 27001:2022
  - OAuth 2.1 turvalisuse parimad tavad
  - Azure turvalisuse ja vastavusraamistikud
- **Rakendusressursid**: Kontrollitud kõik rakendusjuhendi lingid ja ressursid
  - Azure API halduse autentimise mustrid
  - Microsoft Entra ID integratsiooni juhendid
  - Azure Key Vault saladuste haldus
  - DevSecOps torujuhtmed ja jälgimislahendused

### Dokumentatsiooni kvaliteedi tagamine
- **Spetsifikatsiooni nõuetele vastavus**: Kinnitatud kõik kohustuslikud MCP turbenõuded (PEAB/PEAB MITTE) vastavusse uusima spetsifikatsiooniga
- **Ressursside ajakohasus**: Kontrollitud kõik välised lingid Microsofti dokumentatsioonile, turbestandarditele ja rakendusjuhenditele
- **Parimate tavade katvus**: Kinnitatud põhjalik katvus autentimisel, autoriseerimisel, AI-spetsifilistel ohtudel, tarneahela turvalisusel ja ettevõtte mustritel

## 6. oktoober 2025

### Algusosa laiendus – Täiustatud serveri kasutamine ja lihtne autentimine

#### Täiustatud serveri kasutamine (03-GettingStarted/10-advanced)
- **Uus peatükk lisatud**: Esitatud põhjalik juhend MCP serveri täiustatud kasutamiseks, hõlmates nii regulaarseid kui madalal tasemel serveriarhitektuure.
  - **Tavapärane vs madala taseme server**: Detailne võrdlus ja koodinäited Pythoni ja TypeScripti keeltes mõlema lähenemise kohta.
  - **Handler-põhine disain**: Selgitus tööriistade/ressursside/kutsete haldamisest handlerite abil skaleeritavate ja paindlike serveri rakenduste jaoks.
  - **Praktilised mustrid**: Reaalmaailma stsenaariumid, kus madala taseme serverimustrid on kasulikud täiustatud funktsioonide ja arhitektuuri jaoks.
#### Lihtne autentimine (03-GettingStarted/11-simple-auth)
- **Uus peatükk lisatud**: Samm-sammult juhend lihtsa autentimise rakendamiseks MCP serverites.
  - **Autentimise kontseptsioonid**: Selge selgitus autentimise ja autoriseerimise erinevustest ning volituste haldamisest.
  - **Põhja autentimise rakendus**: Vahevara-põhised autentimismustrid Pythonis (Starlette) ja TypeScriptis (Express) koos koodinäidistega.
  - **Liikumine edasijõudnud turvalisuse poole**: Juhised lihtsa autentimise alustamiseks ja edasi liikumiseks OAuth 2.1 ning RBAC poole, viidetega edasijõudnud turvamiseksudele.

Need lisandused pakuvad praktilist ja käed-külge juhendit vastupidavamate, turvalisemate ja paindlikumate MCP serverite ehitamiseks, sidudes põhikontseptsioonid edasijõudnud tootmisprotsessidega.

## 29. september 2025

### MCP serveri andmebaasi integratsiooni laboris - põhjalik praktiline õpitee

#### 11-MCPServerHandsOnLabs - uus täielik andmebaasi integratsiooni õppekava  
- **Täielik 13-labora õpitee**: Lisatud põhjalik praktiline õppekava tootmisvalmis MCP serverite ehitamiseks PostgreSQL andmebaasi integratsiooniga  
  - **Tegeliku elu rakendus**: Zava Retail analüütika juhtum näidates ettevõtte tasemel mustreid  
  - **Struktureeritud õppeprotsess**:
    - **Laborid 00-03: Alused** – sissejuhatus, põhiarhitektuur, turvalisus ja mitmekasutajalisus, keskkonna seadistamine  
    - **Laborid 04-06: MCP serveri loomine** – andmebaasi kujundus ja skeem, MCP serveri rakendamine, tööriistade arendus  
    - **Laborid 07-09: Edasijõudnud funktsioonid** – semantilise otsingu integratsioon, testimine ja silumine, VS Code integratsioon  
    - **Laborid 10-12: Tootmine ja parimad tavad** – juurutamise strateegiad, jälgimine ja vaatlus, parimad tavad ja optimeerimine  
  - **Ettevõtte tehnoloogiad**: FastMCP raamistik, PostgreSQL koos pgvectoriga, Azure OpenAI manustamised, Azure Container Apps, Application Insights  
  - **Täpsemad funktsioonid**: ridade tasandi turvalisus (RLS), semantiline otsing, mitmekasutajaliidesega andmejuurdepääs, vektor-manustamised, reaalajas jälgimine  

#### Terminoloogia standardiseerimine – mooduli asendamine laboriga  
- **Põhjalik dokumentatsiooni uuendus**: Kõik README failid 11-MCPServerHandsOnLabs kataloogis on muudetud terminoloogiat kasutama "Labor" asemel "Moodul"  
  - **Sektsioonide päised**: "What This Module Covers" muudetud "What This Lab Covers" kõikides 13 laboris  
  - **Sisu kirjeldus**: "This module provides..." muudetud "This lab provides..." kogu dokumentatsioonis  
  - **Õpieesmärgid**: "By the end of this module..." muudetud "By the end of this lab..."  
  - **Navigatsioonilingid**: Kõik "Module XX:" viited muudetud "Lab XX:" ristviidetes ja navigatsioonis  
  - **Lõpetamise jälgimine**: "After completing this module..." muudetud "After completing this lab..."  
  - **Tehnilised viited säilitatud**: Näiteks Python mooduliviited konfiguratsioonides ("module": "mcp_server.main") on jäänud muutumatuks  

#### Õpijuhi täiustamine (study_guide.md)  
- **Visualiseeritud õppekava kaart**: Lisatud uus "11. Database Integration Labs" sektsioon koos põhjaliku labori struktuuri visualiseeringuga  
- **Repositsiooni struktuur**: Uuendatud kümnest kuni üheteistkümneni põhiosad, lisatud detailne 11-MCPServerHandsOnLabs kirjeldus  
- **Õppeteekonna juhised**: Täiustatud navigeerimisjuhiseid kattes sektsioonid 00-11  
- **Tehnoloogia ülevaade**: Lisatud FastMCP, PostgreSQL, Azure teenuste integratsiooni detailid  
- **Õpitulemused**: Rõhutatud tootmisvalmis serveriarendust, andmebaasi integratsiooni mustreid ja ettevõtte turvalisust  

#### Peamise README struktuuri täiustamine  
- **Laboripõhine terminoloogia**: Muudetud peamine README.md 11-MCPServerHandsOnLabs kaustas järjepidevalt kasutama "Labor" struktuuri  
- **Õppeteekonna organiseerimine**: Selge edenemine aluskontseptsioonidest edasijõudnud rakenduste ja tootmisse juurutamiseni  
- **Tegeliku elu fookus**: Rõhutatud praktilist, käed-külge õppimist ettevõtte tasemel mustrite ja tehnoloogiatega  

### Dokumentatsiooni kvaliteedi ja järjepidevuse paremaks muutmine  
- **Praktilise, laboripõhise lähenemise rõhutamine kogu dokumentatsioonis**  
- **Ettevõtte mustrid fookuses**: tootmisvalmis rakendused ja ettevõtte turbeküsimuste käsitlemine  
- **Tehnoloogiline integratsioon**: põhjalik tänapäevaste Azure teenuste ja tehisintellekti integratsioonimustrite kaasamine  
- **Õppeteekonna edenemine**: selge ja struktureeritud tee algkontseptsioonidest tootmisse juurutamiseni  

## 26. september 2025

### Juhtumiuuringute täiustamine - GitHub MCP registri integratsioon

#### Juhtumiuuringud (09-CaseStudy/) - Ökosüsteemi arenduse rõhk  
- **README.md**: Tohutu täiendamine mahuka GitHub MCP registri juhtumiuuringuga  
  - **GitHub MCP registri juhtumiuuring**: uus põhjalik juhtumiuuring, mis vaatleb GitHub MCP registri lansseerimist septembris 2025  
    - **Probleemi analüüs**: detailne ülevaade killustatud MCP serverite avastamise ja juurutamise raskustest  
    - **Lahenduse arhitektuur**: GitHubi tsentraliseeritud registri lähenemine koos ühe klikiga VS Code installiga  
    - **Äriline mõju**: mõõdetavad parandused arendajate kaasamises ja tootlikkuses  
    - **Strateegiline väärtus**: fookus modulaarsele agendi juurutusele ja tööriistadevahelisele koostalitlusele  
    - **Ökosüsteemi areng**: positsioneerimine agentlike integratsioonide aluste platvormina  
  - **Täiustatud juhtumiuuringute struktuur**: kõik seitse juhtumiuuringut uuendatud järjepideva vormingu ja põhjalike kirjeldustega  
    - Azure AI reisiagendid: mitmeagendi orkestreerimise rõhutamine  
    - Azure DevOps integratsioon: töövoogude automatiseerimise rõhk  
    - Reaalaaja dokumentatsiooni päring: Python konsooliklient  
    - Interaktiivne õppekava generaator: Chainlit vestlusveebirakendus  
    - Redaktori sees dokumentatsioon: VS Code ja GitHub Copiloti integratsioon  
    - Azure API haldus: ettevõtte API integratsiooni mustrid  
    - GitHub MCP registri: ökosüsteemi areng ja kogukonna platvorm  
  - **Põhjalik kokkuvõte**: ümberkirjutatud kokkuvõtte sektsioon, mis rõhutab seitsme juhtumiuuringu mitmekihilist käsitlust  
    - ettevõtte integratsioon, multi-agent orkestreerimine, arendajate tootlikkus  
    - ökosüsteemi areng, hariduslikud rakendused kategooriad  
    - täiustatud teadmised arhitektuurimustritest, rakendusstrateegiatest ja parimatest praktikatest  
    - rõhuasetus MCP-l kui küpsel, tootmisvalmis protokollil  

#### Õpijuhi uuendused (study_guide.md)  
- **Visualiseeritud õppekava kaart**: muudetud mõttemapile lisatud GitHub MCP registri asukoht juhtumiuuringute sektsioonis  
- **Juhtumiuuringute kirjeldus**: täiendatud üldisest kirjeldusest üksikasjaliku seitsme põhjaliku juhtumiuuringu jaotusega  
- **Repositsiooni struktuur**: uuendatud jaotis 10, et kajastada juhtumiuuringute laia valikut ja konkreetseid rakendusandmeid  
- **Muudatuste logi integreerimine**: lisatud 26. septembri 2025 sissekanne GitHub MCP registri lisamise ja juhtumiuuringu täiustuste kohta  
- **Kuupäeva uuendused**: Alumine temp lisatud viimase ülevaatuse (26. september 2025) kuupäevaga  

### Dokumentatsiooni kvaliteedi parandused  
- **Järjepidevuse tõstmine**: standardiseeritud juhtumiuuringute vorming ja struktuur kõigis seitse näites  
- **Põhjalik katvus**: juhtumiuuringud hõlmavad nüüd ettevõtte, arendaja tootlikkuse ja ökosüsteemi arengut  
- **Strateegiline positsioneerimine**: rõhutatud MCP-d alustalana agent-süsteemide juurutamiseks  
- **Vara integreerimine**: täiendatud täiendavate ressurssidena GitHub MCP registri link  

## 15. september 2025

### Edasijõudnud teemade laiendamine – kohandatud transpordid ja konteksti inseneriteadus

#### MCP kohandatud transpordid (05-AdvancedTopics/mcp-transport/) – uus edasijõudnud rakendusjuhend  
- **README.md**: täielik juhend kohandatud MCP transpordimehhanismide rakendamiseks  
  - **Azure Event Grid transpordi tugi**: täielik serveritu sündmuspõhise transpordi rakendus  
    - C#, TypeScript ja Python näited Azure Funktsioonide integratsiooniga  
    - sündmuspõhised arhitektuurimustrid skaleeritavate MCP lahenduste jaoks  
    - webhook vastuvõtjad ja sõnumite jõudmise push-mehhanismid  
  - **Azure Event Hubs transpordi tugi**: suure läbilaskevõimega voogedastus  
    - reaalajas voogedastuse võimalused madala latentsusega stsenaariumides  
    - jaotuskohad ja kontrollpunktide haldamine  
    - sõnumite pakendamine ja jõudluse optimeerimine  
  - **Ettevõtte integratsiooni mustrid**: tootmisvalmis arhitektuuri näited  
    - hajutatud MCP töötlus mitmest Azure Funktsioonist  
    - hübriidtranspordi arhitektuurid mitme transporditüübi kombineerimiseks  
    - sõnumite vastupidavus, usaldusväärsus ja vigade käsitlemise strateegiad  
  - **Turvalisus ja jälgimine**: Azure Key Vault integratsioon ja vaatlusmustrid  
    - halduslik identiteet ja minimaalsete õiguste ligipääs  
    - Application Insights telemeetria ja jõudluse jälgimine  
    - vooluringi katkestajad ja rikete talumise mustrid  
  - **Testimisraamistikud**: põhjalikud testimisstrateegiad kohandatud transpordile  
    - üksustestimine testtopside ja kahemõõtmeliste raamistikudega  
    - integratsioonitestimine Azure Test Containersiga  
    - jõudluse ja koormustestimise kaalutlused  

#### Konteksti inseneriteadus (05-AdvancedTopics/mcp-contextengineering/) – esilekerkiv tehisintellekti distsipliin  
- **README.md**: põhjalik uurimus konteksti inseneriteadusest kui tekkivast valdkonnast  
  - **Põhiprintsiibid**: täielik konteksti jagamine, tegevuste otsustusprotsessi teadlikkus ja konteksti akna haldamine  
  - **MCP protokolli sobivus**: kuidas MCP disain lahendab konteksti inseneriteaduse väljakutseid  
    - konteksti akna piirangud ja progressiivne laadimisstrateegia  
    - asjakohasuse määramine ja dünaamiline konteksti päring  
    - multimodaalne konteksti käsitlemine ja turvaküsimused  
  - **Rakendusviisid**: ühe lõimuga vs mitme agendi arkitektuurid  
    - kontekstitükkide haldamine ja prioriseerimine  
    - progressiivne konteksti laadimine ja kokkusurumise strateegiad  
    - kihiline lähenemine ja päringute optimeerimine  
  - **Mõõtmise raamistik**: tekkivad mõõdikud konteksti efektiivsuse hindamiseks  
    - sisendi efektiivsus, jõudlus, kvaliteet ja kasutajakogemus  
    - eksperimentaalsed lähenemised konteksti optimeerimiseks  
    - veaanalüüsid ja parendusmeetodid  

#### Õppekava navigeerimise uuendused (README.md)  
- **Täiendatud mooduli struktuur**: uuendatud õppekava tabel, lisades uued edasijõudnud teemad  
  - lisatud Konteksti inseneriteadus (5.14) ja Kohandatud transport (5.15) kirjed  
  - järjepidev vormindus ja navigeerimislingid kõigi moodulite vahel  
  - uuendatud kirjeldused vastavalt sisuala ulatusele  

### Kaustastruktuuri täiustused  
- **Nimede standardiseerimine**: muudetud "mcp transport" kausta nimi "mcp-transport" vastavuses teiste edasijõudnud teemade kaustadega  
- **Sisu organiseerimine**: kõik 05-AdvancedTopics kaustad järgivad nüüd ühtlast nimetamisstiili (mcp-[teema])  

### Dokumentatsiooni kvaliteedi täiustused  
- **MCP spetsifikatsiooniga kooskõlas**: kogu uus sisu viitab MCP spetsifikatsioonile 2025-06-18  
- **Mitmekeelsed näited**: põhjalikud koodinäited C#, TypeScript ja Python  
- **Ettevõtte fookus**: tootmisvalmis mustrid ja Azure pilve integreerimine kogu materjalis  
- **Visuaalne dokumentatsioon**: Mermaid diagrammid arhitektuuri ja andmevoo visualiseerimiseks  

## 18. august 2025

### Dokumentatsiooni põhjalik uuendus – MCP 2025-06-18 standardid

#### MCP turvalisuse parimad praktikad (02-Security/) – täielik moderniseerimine  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: täielik ümberkirjutus MCP spetsifikatsiooni 2025-06-18 järgi  
  - **Kohustuslikud nõuded**: lisatud selged MUST/MUST NOT nõuded ametliku spetsifikatsiooni järgi, visuaalsete märgenditega  
  - **12 põhiturvalisuse valdkonda**: muudetud 15-punktilisest loetelust põhjalikeks turvavaldkondadeks  
    - Token turvalisus ja autentimine koos välishalduri integreerimisega  
    - Sessioonihaldus ja transporditurve koos krüptograafiliste nõuetega  
    - Tehisintellekti spetsiifiline ohutõrje Microsoft Prompt Shields integratsiooniga  
    - Ligipääsu kontroll ja õigused vähima privileegi printsiibiga  
    - Sisuturve ja jälgimine Azure Content Safety integreerimisega  
    - Tarneahela turvalisus koos komponentide põhjaliku kontrolliga  
    - OAuth turvalisus ja Confused Deputy rünnete vältimine PKCE rakendusega  
    - Intsidendi käsitlemine ja taastumine automaatsete võimalustega  
    - Vastavus ja valitsemine regulatiivse kooskõla tagamiseks  
    - Edasijõudnud turvakontrollid nulluskse usalduse arhitektuuriga  
    - Microsofti turvasüsteemide integratsioon koos kõigi lahendustega  
    - Jätkuv turvaarendus kohanemisvõimeliste praktikatega  
  - **Microsofti turvalahendused**: täiustatud integreerimisjuhised Prompt Shields, Azure Content Safety, Entra ID ja GitHub Advanced Security’ga  
  - **Rakendusressursid**: põhjalikud ressursilingid korraldatud ametliku MCP dokumentatsiooni, Microsoft turvalahenduste, turvastandardite ja rakendamisjuhiste alla  

#### Täiustatud turvakontrollid (02-Security/) – ettevõtte taseme rakendus  
- **MCP-SECURITY-CONTROLS-2025.md**: täielik ülevaatamine ettevõtte tasemel turvaraamistikuga  
  - **9 põhjalikku turvavaldkonda**: laiendatud lihtsatelt kontrollidelt detailse ettevõtte taseme raamistikuni  
    - Täiustatud autentimine ja autoriseerimine koos Microsoft Entra ID integratsiooniga  
    - Tokeni turvalisus ja anti-passthrough kontrollid põhjaliku valideerimisega  
    - Sessiooni turbekontrollid kaaperdamise vältimiseks  
    - Tehisintellekti spetsiifilised turbekontrollid plii sissepritsumise ja tööriistamürgituse vastu  
    - Confused Deputy rünnete vältimine OAuth-proksi turvamehhanismidega  
    - Tööriistade täitmise turvalisus sandboxing’i ja isolatsiooniga  
    - Tarneahela turbekontrollid sõltuvuste kontrolliga  
    - Jälgimise ja avastamise kontseptsioonid SIEM integratsiooniga  
    - Intsidendikäsitlus ja taastumine automaatsete võimalustega  
  - **Rakendamisnäited**: lisatud detailne YAML konfiguratsiooniplokid ja koodinäited  
  - **Microsofti lahenduste integratsioon**: põhjalik ülevaade Azure turvateenustest, GitHub Advanced Security’st ja ettevõtte identiteedihaldusest  

#### Edasijõudnud teemade turvalisus (05-AdvancedTopics/mcp-security/) – tootmisvalmis rakendus  
- **README.md**: täielik ümberkirjutus ettevõtte turvalisuse rakendamiseks  
  - **Kehtiva spetsifikatsiooniga kooskõlas**: uuendatud vastavalt MCP spetsifikatsioonile 2025-06-18 koos kohustuslike turvanõuetega  
  - **Täiustatud autentimine**: Microsoft Entra ID integreerimine koos põhjalike .NET ja Java Spring Security näidetega  
  - **Tehisintellekti turvalisuse integratsioon**: Microsoft Prompt Shields ja Azure Content Safety rakendamine koos detailsete Python näidetega  
  - **Täiustatud ohutõrje**: põhjalikud rakendamisnäited  
    - Confused Deputy rünnete vältimine PKCE ja kasutaja nõusoleku valideerimisega  
    - Tokeni läbilaske takistamine publikumi valideerimise ja turvalise tokenihaldusega  
    - Sessiooni kaaperdamise vältimine krüptograafilise sidumise ja käitumisanalüüsiga  
  - **Ettevõtte turvaintegratsioon**: Azure Application Insights jälgimine, ohu äratustepipelines ja tarneahela turvalisus  
  - **Rakendamischecklist**: selge jaotus kohustuslikest ja soovitatavatest turvakontrollidest koos Microsofti turvaökosüsteemi eelistega  

### Dokumentatsiooni kvaliteet ja standardite kooskõla
- **Spetsifikatsiooni viited**: Uuendatud kõik viited kehtivale MCP Spetsifikatsioonile 2025-06-18
- **Microsofti turvasüsteem**: Täiendatud integreerimise juhiseid kogu turbedokumentatsioonis
- **Praktiline rakendamine**: Lisatud üksikasjalikud koodinäited .NET, Java ja Python keeles koos ettevõttemustritega
- **Ressursside organiseerimine**: Ulatuslik ametliku dokumentatsiooni, turvastandardite ja rakendusjuhendite kategoriseerimine
- **Visuaalsed indikaatorid**: Selged märgistused kohustuslike nõuete ja soovitatavate tavade vahel


#### Põhikontseptsioonid (01-CoreConcepts/) - Täielik moderniseerimine
- **Protokolli versiooni uuendus**: Uuendatud viide kehtivale MCP Spetsifikatsioonile 2025-06-18, kasutades kuupõhist versioonimist (YYYY-MM-DD formaat)
- **Arhitektuuri täpsustus**: Täiendatud kirjeldused Hostidest, klientidest ja serveritest, et kajastada praeguseid MCP arhitektuuri mustreid
  - Hostid on nüüd selgelt defineeritud kui tehisintellekti rakendused, mis koordineerivad mitut MCP kliendiühendust
  - Kliendid on kirjeldatud kui protokolli pistikupesad, mis hoiavad üksteisega ühe-ühele serverisuhtlust
  - Serverid on täiustatud kohaliku ja kaugpaigalduse stsenaariumitega
- **Primitiivide ümberkorraldus**: Serveri ja kliendi primitived täielik ülevaatus
  - Serveri primitived: Ressursid (andmeallikad), Käsklused (mallid), Tööriistad (täidetavad funktsioonid) koos üksikasjalike seletuste ja näidetega
  - Kliendi primitived: Proovivõtt (LLM vastused), Info kogumine (kasutaja sisend), Logimine (silumine/jälgimine)
  - Uuendatud kehtivate avastamise (`*/list`), päringu (`*/get`) ja täitmise (`*/call`) meetodimustrite järgi
- **Protokolli arhitektuur**: Tutvustatud kahekihilist arhitektuurimudelit
  - Andmekiht: JSON-RPC 2.0 alus koos elutsükli halduse ja primitivedega
  - Transpordikiht: STDIO (kohalik) ja voogetatav HTTP koos SSE-ga (kaug) transpordimehhanismid
- **Turvakomplekt**: Ulatuslikud turvapõhimõtted, sh selge kasutaja nõusolek, andmekaitse, tööriistade täitmise ohutus ja transpordikihi turvalisus
- **Kommunikatsioonimustrid**: Uuendatud protokolli sõnumid näitavad initsialiseerimist, avastamist, täitmist ja teavituste voogusid
- **Koodinäited**: Värskendatud mitmekeelsed näited (.NET, Java, Python, JavaScript) kehtivate MCP SDK mustrite kajastamiseks

#### Turvalisus (02-Security/) - Ulatuslik turvamuudatus  
- **Standardite kooskõla**: Täielik kooskõla MCP Spetsifikatsiooni 2025-06-18 turvanõuetega
- **Autentimise areng**: Dokumenteeritud ülevaade kohandatud OAuth serveritest kuni väliste identiteedipakkujate (Microsoft Entra ID) delegeerimiseni
- **AI-spetsiifiline ohuanalüüs**: Täiendatud kaastekus kaasaegsete tehisintellekti ründevektoritega
  - Üksikasjalikud stsenaariumid käsukirjete süstimise rünnakutest koos reaalse elu näidetega
  - Tööriistamürgitamise mehhanismid ja "rug pull" ründemustrid
  - Kontekstiakna mürgitamise ja mudelite segadusse ajamise rünnakud
- **Microsofti AI turvalahendused**: Ulatuslik ülevaade Microsofti turvasüsteemist
  - AI käskluste kaitsed täpse tuvastuse, esiletõstmise ja piiritlusmeetoditega
  - Azure Content Safety integreerimismustrid
  - GitHub Advanced Security tarneahela kaitseks
- **Edasijõudnud rünnakutõrje**: Üksikasjalikud turvakontrollid
  - Sessiooni kaaperdamine MCP-spetsiifiliste ründestseenaritega ja krüptograafiliste sessiooni-ID nõuetega
  - Segadusse ajamise probleemid MCP proksistiilides koos selgete nõusoleku nõuetega
  - Määratletud märgiste läbipääsu turvanõuded
- **Tarneahela turvalisus**: Laiendatud AI tarneahela katvus, sh aluspõhimudelite, lisateenuste, kontekstitarnijate ja kolmandate osapoolte API-dega
- **Turvalahenduste alus**: Täiendatud integreerimine ettevõtte turvapõhimustesse, sh nullusalu arhitektuur ja Microsofti turvasüsteem
- **Ressursside organiseerimine**: Kategooriatesse jaotatud ressursside lingid tüübi järgi (Ametlikud dokumendid, standardid, uurimused, Microsofti lahendused, rakendusjuhendid)

### Dokumentatsiooni kvaliteedi parandused
- **Struktureeritud õpieesmärgid**: Täiendatud õppimise eesmärke spetsiifiliste ja teostatavate tulemustega 
- **Ristlingid**: Lisatud lingid seotud turbe- ja põhikontseptsioonide vahel
- **Uuendatud info**: Kõik kuupäevad ja spetsifikatsioonilingid uuendatud kehtivatele standarditele
- **Rakendusjuhised**: Lisatud konkreetsed ja elluviidavad juhised mõlemasse ossa

## 16. juuli 2025

### README ja navigeerimise parandused
- Täiesti ümber kujundatud õppekava navigeerimine README.md-s
- Asendatud `<details>` sildid ligipääsetavama tabelipõhise vorminguga
- Loodud alternatiivsed paigutusvõimalused uues kaustas "alternative_layouts"
- Lisatud kaardipõhised, sakkidega ja akordioni stiilis navigeerimisnäited
- Uuendatud repositooriumi struktuuri jaotis kõigi viimaste failidega
- Täiendatud jaotis "Kuidas seda õppekava kasutada" selgete soovitustega
- Uuendatud MCP spetsifikatsiooni lingid õigetele URL-idele
- Lisatud kontekstitehnika jaotis (5.14) õppekava struktuuri

### Õppematerjali uuendused
- Täiesti ümber tehtud õppematerjalide juhend vastavuses praeguse repositooriumi struktuuriga
- Lisatud uued jaotised MCP klientide ja tööriistade, ning populaarsete MCP serverite kohta
- Uuendatud visuaalne õppekava kaart kõigi teemade täpseks kuvamiseks
- Täiustatud kirjeldused edasijõudnud teemadest, mis hõlmavad kõiki spetsialiseerunud valdkondi
- Uuendatud juhtumiuuringute jaotis tegelike näidetega
- Lisatud see põhjalik muudatuste logi

### Kogukonna panused (06-CommunityContributions/)
- Lisatud üksikasjalik info MCP serverite kohta pildigeneratsiooni tarvis
- Lisatud põhjalik jaotis Claude kasutamisest VSCode-s
- Lisatud Cline terminaalkliendi seadistuse ja kasutusjuhised
- Uuendatud MCP kliendijaotis kõigi populaarsete kliendivalikute kaasamiseks
- Täiustatud panuse näited täpsemate koodinäidetega

### Edasijõudnud teemad (05-AdvancedTopics/)
- Korrastatud kõik spetsialiseerunud teema kaustad järjepideva nimetusega
- Lisatud kontekstiinseneri materjalid ja näited
- Lisatud Foundry agendi integreerimise dokumentatsioon
- Täiustatud Entra ID turvaintegratsiooni dokumentatsioon

## 11. juuni 2025

### Esmane loomine
- Avaldatud MCP algajate õppekava esimene versioon
- Loodud põhistruktuur kõigi 10 põhiosa jaoks
- Rakendatud visuaalne õppekava kaart navigeerimiseks
- Lisatud esialgsed näidisprojektid mitmes programmeerimiskeeles

### Alustamine (03-GettingStarted/)
- Loodud esimesed serverite rakendamise näited
- Lisatud kliendi arenduse juhised
- Kaasatud LLM kliendi integratsioonijuhised
- Lisatud VS Code integratsiooni dokumentatsioon
- Rakendatud serveripoolsed sündmused (SSE) serverite näited

### Põhikontseptsioonid (01-CoreConcepts/)
- Lisatud põhjalik selgitus kliendi-serveri arhitektuurist
- Loodud dokumentatsioon peamistest protokollikomponentidest
- Dokumenteeritud sõnumimustrid MCP-s

## 23. mai 2025

### Repositooriumi struktuur
- Algatatud repositoorium põhikaustastruktuuriga
- Loodud README failid iga suurema osa jaoks
- Seadistatud tõlke infrastruktuur
- Lisatud pildimaterjalid ja diagrammid

### Dokumentatsioon
- Loodud esialgne README.md õppekava ülevaatega
- Lisatud käitumiskoodeks CODE_OF_CONDUCT.md ja turvameetmete kirjeldus SECURITY.md
- Seadistatud toetuse juhend SUPPORT.md
- Loodud algeline õppematerjali juhend

## 15. aprill 2025

### Planeerimine ja raamistik
- MCP algajate õppekava esmane planeerimine
- Määratletud õpieesmärgid ja sihtrühm
- Kirjeldatud õppekava 10-osaline struktuur
- Arendatud kontseptuaalne raamistik näidete ja juhtumiuuringute jaoks
- Loodud esialgsed prototüüpnäited võtmekontseptsioonidele

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->