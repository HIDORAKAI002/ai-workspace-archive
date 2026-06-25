# Muutuste logi: MCP algajate õppekava

See dokument toimib kõigi olulisemate muudatuste salvestusena, mis on tehtud Model Context Protocoli (MCP) algajate õppekavale. Muudatused on dokumenteeritud pööratud kronoloogilises järjekorras (uusimad muudatused eespool).

## 24. juuni 2026

### Uus õppetund: MCP kasutamine Copilot rakenduses

- [Tööriistade ala](./12-tooling/README.md) Lisati tööriistade ala.
- [MCP Copilot rakenduses](./12-tooling/01-copilot-app/README.md)

## 16. juuni 2026

### MCP spetsifikatsiooni joondamine & näidiste valideerimine

Valideeriti õppekava kehtiva **MCP spetsifikatsioon 2025-11-25** ning viimaste ametlike SDK-dega, seejärel parandati vananenud spetsifikatsiooni viited ja kinnitati, et põhinäidised endiselt ehituvad ja töötavad.

#### Spetsifikatsiooni versiooni parandused (2025-06-18 / 2025-03-26 → 2025-11-25)

Uuendati ingliskeelset sisu, kus veel väideti, et vanem spetsifikatsiooni revisjon on *praegune/viimane* standard ning suunati lingid kanonilistele `modelcontextprotocol.io` spetsifikatsiooni teekondadele:
- **05-AdvancedTopics/mcp-security/README.md**: Uuendati „Praeguse standardi“ bännerit, sissejuhatust, põhiturvapõhimõtete pealkirja, kohustuslike nõuete peatükke, Microsoft Entra ID jaotist, Viited & Ressursid linke ning lõpetavat turvateadet (8 viidet) versioonile 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Uuendati Täiendavate ressursside spetsifikatsiooni linki ja „Praeguse standardi“ bännerit versioonile 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Asendati aegunud `2025-03-26` turbe- ja usalduslink praegusega 2025-11-25 turvaliste parimate tavade leheküljele
- **03-GettingStarted/14-sampling/README.md**: Uuendati ametliku proovivõtmise dokumentatsiooni linki versioonile 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Uuendati oleviku-vormis „praeguse MCP spetsifikatsiooni“ viidet ja Täiendavate ressursside spetsifikatsiooni linki versioonile 2025-11-25 (ajaloolised SSE-kasutusest eemaldamise märkused jäeti täpsuse huvides muutmata)

#### Näidiste valideerimine kehtivate SDK-dega

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` lahendas `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` möödus tüübivigu saamata — olemasolevad `McpServer`/`StdioServerTransport` API-d kehtivad endiselt
- **Python (03-GettingStarted/01-first-server/solution/python)**: Valideeritud isoleeritud `.venv`-keskkonnas koos `mcp[cli]` (1.27.2); `py_compile` õnnestus ja `FastMCP.list_tools()` tagastas korrektselt `add` ja `subtract` tööriistad
- Kinnitatud, et kõik näidistes määratud `@modelcontextprotocol/sdk` versioonivahemikud (`>=1.26.0` / `^1.26.0` / `^1.27.0`) lahenevad puhtalt praeguse `1.29.0` versiooni peale ilma katkestavate API muudatusteta

#### Sõltuvuste versioonide joondamine (versioonilüngad suletud)

Uuendati aegunud SDK versioonimärke nii, et iga näidis jälgib praeguse MCP versiooni, vastavalt repokogumiku konventsioonile:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Uuendati `@modelcontextprotocol/sdk` `^1.8.0` → `>=1.26.0` ja muudetud aegunud `"updated for MCP 2025-06-18"` pakendi kirjeldus `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ja **lab4/code/github_mcp_server/pyproject.toml**: Uuendatud täpne versioonipin `mcp==1.23.0` → `mcp>=1.26.0`; mõlema `uv.lock` faili regenereerimine (`uv lock`), nii et lukufailid lahenduvad praegusele `mcp 1.27.2` versioonile ja püsivad synkoniseeritud manifestidega

#### Õppekava lünkade analüüs — viimase spetsifikatsiooni funktsioonide katvus

Kinnitatud, et õppekava katab juba kõik MCP 2025-11-25 versioonis tutvustatud/laiendatud primitiivid, seega puuduvad sisulised lüngad:
- **Proovivõtt**: Õppetund 03-GettingStarted/14-sampling koos 05-AdvancedTopics/mcp-sampling
- **Eksamipõhine info saamine (kaasaarvatud URL režiim)**: Dokumenteeritud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features all
- **Juured**: Dokumenteeritud 00-Introduction, 01-CoreConcepts ja 05-AdvancedTopics/mcp-root-contexts all
- **Ülesanded (katsefaas, pika kestusega operatsioonid)**: Dokumenteeritud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features all
- **Tööriistade annotatsioonid** (`readOnlyHint` / `destructiveHint`): Dokumenteeritud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features all

### Turvalisuse tugevdamine & sõltuvuste haavatavuste parandamine

Tehtud kogu sõltuvuste manifestidele ja näidiste lähtekoodile täismahus turvaaudit ja parandatud kõik npm audititeated ning üks koodipõhine leid. Pärast parandusi näitas `npm audit` **0 haavatavust** kõigis auditeeritud kataloogides.

#### npm sõltuvuste haavatavused (transitiivsed) — parandatud

Auditeeritud 15 kohustuslikku `package-lock.json` faili. Haavatavused olid piirdunud MCP Inspectori arendustööriista, OpenAI kliendi ja MCP SDK mootmetega; kõik nüüd lahendatud ilma näidiseid rikkumata:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ja **lab3/code/weather_mcp/inspector**: Uuendati `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), mis kõrvaldas kokkupandud `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ja `ws` teated. Lisati npm `overrides` kirje, mis sunnib paigatud `shell-quote@1.8.4` kasutamist, et kõrvaldada `concurrently` kriitiline järelevalve-ese; mõlema lukufaili regenereerimine (nüüd 0 haavatavust)
- **03-GettingStarted/samples/typescript**: `npm audit fix` uuendas transitiivset `qs` (keskmine) osaliselt parandatud versioonile
- **03-GettingStarted/samples/javascript**: `npm audit fix` uuendas transitiivset `hono` (keskmine) osaliselt parandatud versioonile
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` uuendas transitiivset `form-data` (kõrge) osaliselt parandatud versioonile
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genereeritud puuduolev `package-lock.json`, et projekt oleks taaskäivitatav ja auditeeritav (0 haavatavust)

#### Koodipõhine turvaparandus (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Eemaldatud `shell=True` `open_in_vscode` tööriistast. Varasem `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` lubas kausta tee shelli meta-märke `cmd.exe` poolt tõlgendada (käskude süstimise võimalus). Nüüd käivitab lahendatud `Code.exe` otse kausta argumendiga — ilma shellita — mis on funktsionaalselt ekvivalentne ja turvaline

#### Pythoni sõltuvuste audit

- Auditeeritud iga Python nõuete komplekt `pip-audit` abil. `05-AdvancedTopics` ja `03-GettingStarted/samples/python` ei leidnud ühtegi teadaolevat haavatavust (nende `mcp` / `httpx` / `pydantic` / `python-dotenv` versioonivahemikud lahenduvad praegustele parandatud versioonidele)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` tuvastas transitiivse sõltuvuse **`werkzeug` 3.1.1** kolme `safe_join` Windows seadme-nime DoS hoiatusena — `CVE-2025-66221`, `CVE-2026-21860` ja `CVE-2026-27199` (kõik parandatud versioonis 3.1.6). Lisatud ekspressiivne turvapinnistus `werkzeug>=3.1.6`, et lahendada parandatud versioon; kinnitatud, et piirang lahendub puhtalt koos `chainlit` / `mcp` / `semantic-kernel` paketihulgaga

### Tootenime ümberbrändimine

Uuendatud kogu õppekava sisu vastavalt Microsofti toote ümbernimekirjale:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Uuendatud Discord kogukonna link
- **AGENTS.md**: Uuendatud Discord serveri viide
- **README.md**: Uuendatud tehnoloogia ökosüsteemi viited
- **study_guide.md**: Uuendatud juhtumiuuringu viited
- **05-AdvancedTopics/README.md**: Uuendatud mooduli 5.13 pealkiri ja kirjeldus
- **05-AdvancedTopics/mcp-integration/README.md**: Uuendatud jaotise pealkiri ja kirjeldus
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Täielik mooduli pealkirja ja sisu uuendus
- **05-AdvancedTopics/mcp-security-entra/README.md**: Uuendatud ristviide
- **07-LessonsfromEarlyAdoption/README.md**: Uuendatud juhtumiuuringute viited
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Uuendatud jaotise 9 pealkiri, märgised ja võimed
- **08-BestPractices/README.md**: Uuendatud Discord kogukonna link
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Uuendatud Discord kanali viide
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Uuendatud mudelite juurutuse viide
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Uuendatud AI teenuste tabel
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Uuendatud ressursside viited

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Uuendatud peamised õppekava viited
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Uuendatud mooduli pealkiri, ülevaade ja kõik mooduli pealkirjad
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Uuendatud pealkiri, õpieesmärgid, häälestusjuhend ja ressursid
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Uuendatud pealkiri, õpieesmärgid, MCP hostide tabel ja ristviited
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Uuendatud pealkiri, märgised, eeltingimused ja ressursid
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Uuendatud agentide koostaja viited ja tagasiside link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Uuendatud eeltingimused ja laienduse viited

---

## 11. aprill 2026

### Uus õppetund, dokumentatsiooni parandused ja sõltuvuste uuendused

#### Lisatud uus õppekava sisu

**Moodul 05 - Täiendavad teemad**
- **Õppetund 5.17: Vastanduv mitme-agendi mõtlemine MCP-ga** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Uus põhjalik juhend vastanduva väitluse mustri kohta mitme-agendi süsteemides
  - Mermaid arhitektuuri diagramm: kaks agenti → jagatud MCP server → väitluse transkript → kohtunik → otsus
  - Jagatud MCP tööriistade server (`web_search` + `run_python`) Pythonis ja TypeScriptis
  - Vastuolulised süsteemi käsklused (FOR / AGAINST / Kohtunik) koos otseste tööriista kasutuse nõuetega
  - Väitluse orkestreerija Pythonis, TypeScriptis ja C#-s, haldades voorusid ja argumentide teed
  - MCP `ClientSession` ühendamine orkestreerijale päris tööriistade kutsumiseks
  - Kasutusjuhtude tabel (hallutsinatsioonide tuvastamine, ohuhalduse modelleerimine, API disaini ülevaade, faktide kontroll, tehnoloogiate valik)
  - Turvakaalutlused: liivakasti täitmine, tööriistakutsete valideerimine, päringute piiramise, auditi logimine
  - Struktureeritud harjutus kolmes praktilises stsenaariumis (koodi ülevaade, arhitektuurilised otsused, sisumodereerimine)

#### Dokumentatsiooni parandused

**Moodul 03 - Algus**
- **05-stdio-server/README.md**: Parandati puudulik TypeScript stdio serveri näidis — lisati puuduolev transpordi loomine (`new StdioServerTransport()`) ja `server.connect(transport)` kutse, et sobitada Python ja .NET näidetega samas jaotises
- **14-sampling/README.md**: Parandati kirjaviga — parandatud `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Õppekava uuendused

**Põhijuhend README.md**
- Lisatud sissekanne 5.17 (Vastanduv mitme-agendi mõtlemine MCP-ga) õppekava tabelisse uue õppetunni otselinkiga

**05-AdvancedTopics/README.md**
- Lisatud õppetunni 5.17 rida õppetundide tabelisse

**study_guide.md**
- Lisatud Vastanduv mitme-agendi mõtlemine teema mõttekaardile ja täiendatud kirjeldusse Täiendavate teemade osas

#### Kood ja turvaparandused

**Moodul 05 - Vastanduvad Agendid (`mcp-adversarial-agents`)**
- **Turvaparandus — käsu süstimine**: Asendati TypeScripti tööriistas `run_python` kasutatud `execSync` kestliku interpolatsioon `execFile` + `promisify` kombinatsiooniga, mis kõrvaldab käsu süstimise võimaluse (LLM-i juhitav kood edastatakse nüüd sõnasõnalise argv elemendina, ilma kestas sekkumiseta).
- **MCP tööriista silmuse ühendamine**: Uuendati Pythoni debatiorganisaatorit kasutama `AsyncAnthropic` klienti (asendades blokeeriva sünkroonse `Anthropic`), edastama iga agendi vooru otse elava `ClientSession` kaudu, tooma tööriistade definitsioonid iga vooru ajal `session.list_tools()` abil ning saatma `tool_use` plokid läbi `session.call_tool()` silmuse kuni mudel tagastab lõpliku tekstivastuse.

#### Sõltuvuste uuendused

- Uuendati `hono` versioonini 4.12.12 mitmetes pakettides (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Uuendati `@hono/node-server` versioon 1.19.11 pealt 1.19.13-ni TypeScripti pakettides
- Uuendati `cryptography` versioon 46.0.5 pealt 46.0.7-ni Python pakettides (10-StreamliningAIWorkflows labid 3 ja 4)
- Uuendati `lodash` versioon 4.17.23 versioonile 4.18.1 10-StreamliningAIWorkflows inspector

#### Tõlked

- Sünkroniseeriti tõlked 48+ keelele koos viimaste lähtefailide muudatustega (i18n uuendus)

---

## 5. veebruar 2026

### Kogu repo valideerimise ja navigatsiooni täiustused

#### Lisatud uus õppekava sisu

**Moodul 03 - Alustamine**
- **12-mcp-hosts/README.md**: Uus põhjalik juhend MCP hostide seadistamiseks
  - Claude Desktopi, VS Code’i, Cursor’i, Cline’i, Windsurfi konfiguratsiooni näited
  - Kõigi peamiste hostide JSON konfiguratsioonimalled
  - Ülekandeliikide võrdlustabel (stdio, SSE/HTTP, WebSocket)
  - Üldlevinud ühendusprobleemide lahendamine
  - Turvalisuse parimad praktikad hostide seadistamisel

- **13-mcp-inspector/README.md**: Uus silumise juhend MCP Inspektorile
  - Paigaldusviisid (npx, globaalne npm, lähtekoodist)
  - Ühendus serveritega stdio ja HTTP/SSE kaudu
  - Tööriistade, ressursside ja promptide testimisvood
  - VS Code integratsioon MCP Inspektoriga
  - Kõrvaldamine ja tavalised silumisstsenaariumid koos lahendustega

**Moodul 04 - Praktiline rakendamine**
- **pagination/README.md**: Uus leheküljendamise rakendamise juhend
  - Pythoni, TypeScripti ja Java kursori-põhise leheküljendamise mustrid
  - Kliendipoolne leheküljenduse haldamine
  - Kursori disainistrateegiad (läbipaistev vs struktuurne)
  - Jõudluse optimeerimise soovitused

**Moodul 05 - Täiustatud teemad**
- **mcp-protocol-features/README.md**: Uus süvitsiminek protokolli funktsioonidesse
  - Edusammu teavituste rakendamine
  - Päringu tühistamise mustrid
  - Ressursside mallid URI mustritega
  - Serveri elutsükli haldus
  - Logimisastme kontroll
  - Vea käsitlemise mustrid JSON-RPC koodidega

#### Navigatsiooni parandused (uuendatud 24+ faili)

**Põhimooduli README-d**
 Nüüd lingitakse nii esimesele õppetunnile KUI ka järgmisele moodulile

**02-Security alamfailid**
- Kõigil 5 lisaturve dokumendil on nüüd "Mis Järgmiseks" navigeerimine:

**09-CaseStudy failid**
- Kõik juhtumiuuringu failid toetavad nüüd järjestikust navigeerimist:

**10-StreamliningAI labs**
Lisati "Mis Järgmiseks" sektsioon mooduli 10 ülevaatele ja moodulile 11

#### Koodi ja sisu parandused

**SDK ja sõltuvuste uuendused**
Parandati tühi openai versioon `^4.95.0`
Uuendati SDK versioonilt `^1.8.0` versioonile `>=1.26.0`
Uuendati mcp versiooni pinnid `>=1.26.0`

**Koodiparandused**
Parandati vigane mudel `gpt-4o-mini` parameetriks `gpt-4.1-mini`

**Sisu parandused**
Parandati katkine link `READMEmd` → `README.md`, parandati õppekava päis `Module 1-3` → `Module 0-3`, parandati tõstutundlik failitee
Eemaldati rikutud dubleeritud juhtumiuuringu 5 sisu

**Algajatele suunatud juhised**
Lisati adekvaatne sissejuhatus, õppimise eesmärgid ja eeltingimused algajatele

#### Õppekava uuendused

**Põhijuhend README.md**
- Lisati kirjed 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Leheküljendus), 5.16 (Protokolli funktsioonid) õppekavasse

**Mooduli README-d**
Lisati 12. ja 13. õppetunnid
Lisati praktiliste juhendite sektsioon koos leheküljenduse lingiga
Lisati 5.15 (Kohandatud transpordid) ja 5.16 (Protokollifunktsioonid)

**study_guide.md**
- Uuendati mõttekaarti kõigi uute teemadega: MCP Hosts Setup, MCP Inspector, Leheküljendamise strateegiad, Protokollifunktsioonide süvitsi

## 28. jaanuar 2026

### MCP Spetsifikatsiooni 2025-11-25 vastavuse ülevaatus

#### Põhimõistete täiustused (01-CoreConcepts/)
- **Uus kliendi primitiiv - Roots**: Lisatud põhjalik dokumentatsioon Roots kliendiprimitiivi kohta, mis võimaldab serveritel mõista failisüsteemi piire ja ligipääsuõigusi
- **Tööriistamärkused**: Lisatud dokumentatsioon tööriistade käitumise annotatsioonide (`readOnlyHint`, `destructiveHint`) kohta paremate täitmisotsuste tegemiseks
- **Tööriistade kasutamine proovimisel**: Uuendatud proovimise dokumentatsiooni lisades `tools` ja `toolChoice` parameetrid mudeli juhitud tööriistakutseks proovimispäringute ajal
- **URL režiimi kutsumine**: Lisatud dokumentatsioon URL-põhise väljakutse sündmuste kohta serveripoolselt algatatud veebisiseste interaktsioonide jaoks
- **Ülesanded (eksperimentaalne)**: Lisatud uus sektsioon eksperimentaalse Tasks-funktsiooni kohta kestvate täitmismähiste ja hilisemate tulemuste pärimise jaoks
- **Ikonidest tugi**: Märgitud, et tööriistad, ressursid, ressursimallid ja promptid võivad nüüd sisaldada ikoone täiendava metaandmetena

#### Dokumentatsiooni uuendused
- **README.md**: Lisatud MCP Spetsifikatsiooni 2025-11-25 versiooni viide ja kuupõhine versioonihaldus
- **study_guide.md**: Uuendatud õppekava kaart lisades ülesanded ja tööriistamärkused Põhimõistete sektsiooni; uuendatud dokumendi ajatemplit

#### Spetsifikatsiooni vastavuse kontroll
- **Protokolli versioon**: Kinnitatud, et kogu dokumentatsioon viitab praegusele MCP Spetsifikatsioon 2025-11-25-le
- **Arhitektuuri vastavus**: Kinnitatud kaheetapiline arhitektuur (andmekiht + ülekandekiht)
- **Primitiivide dokumentatsioon**: Kontrollitud serveri primitiivide (ressursid, promtid, tööriistad) ja kliendi primitiivide (proovimine, kutsumine, logimine, Roots) dokumentatsiooni õigsus
- **Ülekandemehhanismid**: Kontrollitud STDIO ja voogedastatava HTTP transpordi dokumentatsiooni täpsus
- **Turvajuhised**: Kinnitatud vastavus MCP turvalisuse parimatele tavadele

#### Olulised MCP 2025-11-25 funktsioonid dokumenteeritud
- **OpenID Connect Discover**: Autentimisteenuse leidmine OIDC kaudu
- **OAuth kliendi ID metaandmete dokumendid**: Soovitatav kliendi registreerimise mehhanism
- **JSON Schema 2020-12**: MCP skeemi definitsioonide vaike-dialekt
- **SDK kihistuse süsteem**: SDK funktsioonide toe ja hoolduse formaalsed nõuded
- **Valitsemisstruktuur**: MCP haldusorganite töögruppide ja huvigrupide formaalsed kirjeldused

### Turvedokumentatsiooni suurem uuendus (02-Security/)

#### MCP Security Summit Workshop (Sherpa) integreerimine
- **Uus praktiline koolitusallikas**: Lisatud põhjalik integratsioon [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) kõigi turvedokumentide hulka
- **Ekspeditsiooni marsruudi aruanne**: Dokumenteeritud täielik laagrilt laagrile liikumine baasilegust tippu
- **OWASP vastavus**: Kõik turvajuhised kaardistatud OWASP MCP Azure Security Guide riskidele

#### OWASP MCP Top 10 integratsioon
- **Uus sektsioon**: Lisatud OWASP MCP Top 10 turvariskide tabel koos Azure leevendusmeetmetega peamisse turve README-sse
- **Riskipõhine dokumentatsioon**: Uuendatud mcp-security-controls-2025.md, lisades OWASP MCP riskiviited iga turvavaldkonna kohta
- **Võrdlusarhitektuur**: Lingitud OWASP MCP Azure Security Guide’i võrdlusarhitektuuri ja rakendamise mustritega

#### Uuendatud turvefailid
- **README.md**: Lisatud Sherpa Workshop ülevaade, ekspeditsiooni marsruudi tabel, OWASP MCP Top 10 riskide kokkuvõte ning praktilise koolituse sektsioon
- **mcp-security-controls-2025.md**: Uuendatud päis veebruar 2026, lisatud OWASP riskiviited (MCP01-MCP08), parandatud spetsifikatsiooni versiooni ebajärjekindlus
- **mcp-security-best-practices-2025.md**: Lisatud Sherpa ja OWASP ressursside sektsioon, uuendatud ajatempli info
- **mcp-best-practices.md**: Lisatud praktilise koolituse sektsioon Sherpa ja OWASP linkidega
- **azure-content-safety-implementation.md**: Lisatud OWASP MCP06 viide, Sherpa Laager 3 vastavus ja täiendavate ressursside sektsioon

#### Lisatud uued ressursilinkid
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuaalsed OWASP MCP riskilehed (MCP01-MCP10)

### Õppekava MCP Spetsifikatsiooni 2025-11-25 laiem vastavus

#### Moodul 03 - Alustamine
- **SDK dokumentatsioon**: Lisatud Go SDK ametlikku SDK nimekirja; uuendatud kõik SDK viited vastavaks MCP Spetsifikatsioon 2025-11-25 versioonile
- **Transpordi selgitused**: Uuendatud STDIO ja HTTP Streaming transpordi kirjeldused rõhutades spetsiifilisi spetsifikatsiooni viiteid

#### Moodul 04 - Praktiline rakendamine
- **SDK uuendused**: Lisatud Go SDK; uuendatud SDK nimekiri spetsifikatsiooni versiooniviitega
- **Autoriseerimise spetsifikatsioon**: Uuendatud MCP autoriseerimise spetsifikatsiooni link praegusele versioonile 2025-11-25

#### Moodul 05 - Täiustatud teemad
- **Uued funktsioonid**: Lisatud märkus MCP Spetsifikatsiooni 2025-11-25 uutest funktsioonidest (Ülesanded, Tööriistade annotatsioonid, URL režiimi kutsumine, Roots)
- **Turbeallikad**: Lisatud OWASP MCP Top 10 ja Sherpa workshop lingid täiendavatesse viidetesse

#### Moodul 06 - Kogukonna panused
- **SDK nimekiri**: Lisatud Swift ja Rust SDK-d; uuendatud spetsifikatsiooni link versioonile 2025-11-25
- **Spetsifikatsiooni viide**: Uuendatud MCP Spetsifikatsiooni link otse spetsifikatsiooni URL-ile

#### Moodul 07 - Varajase kasutuse õppetunnid
- **Ressursside uuendused**: Lisatud MCP Spetsifikatsiooni 2025-11-25 link ja OWASP MCP Top 10 täiendavatesse ressurssidesse

#### Moodul 08 - Parimad praktikad
- **Spetsifikatsiooni versioon**: Uuendatud MCP Spetsifikatsiooni viiteks versioon 2025-11-25
- **Turberessursid**: Lisatud OWASP MCP Top 10 ja Sherpa workshop täiendavatesse ressurssidesse

#### Moodul 10 - Tehisintellekti töövoogude kiirendamine
- **Märgi uuendus**: Muudetud MCP versiooni märk SDK versioonilt (1.9.3) spetsifikatsiooni versioonile (2025-11-25)
- **Ressursilinkid**: Uuendatud MCP Spetsifikatsiooni link; lisatud OWASP MCP Top 10

#### Moodul 11 - MCP serveri praktilised laborid
- **Spetsifikatsiooni viide**: Uuendatud MCP Spetsifikatsiooni link versioonile 2025-11-25
- **Turberessursid**: Lisatud OWASP MCP Top 10 ametlikesse ressurssidesse

## 18. detsember 2025

### Turvealane dokumentatsiooni uuendus - MCP Spetsifikatsioon 2025-11-25

#### MCP Turvalisuse parimad praktikad (02-Security/mcp-best-practices.md) - spetsifikatsiooni versiooni uuendus
- **Protokolli versiooni uuendus**: Uuendatud referents uuele MCP Spetsifikatsioonile 2025-11-25 (avalikustatud 25. november 2025)
  - Uuendatud kõik spetsifikatsiooni versiooniviited 2025-06-18 pealt 2025-11-25-le
  - Uuendatud dokumendi kuupäeva viited 18. august 2025 pealt 18. detsember 2025-le
  - Kontrollitud, et kõik spetsifikatsiooni URL-id osutavad kehtivale dokumentatsioonile
- **Sisu valideerimine**: Turvalisuse parimate tavade põhjalik kontroll viimaste standardite alusel
  - **Microsofti turvelahendused**: Kontrollitud praegused terminid ja lingid Prompt Shields-i (varasemalt „Jailbreak risk detection“), Azure Content Safety, Microsoft Entra ID ja Azure Key Vault’i kohta
  - **OAuth 2.1 turvalisus**: Kinnitatud vastavus uusimatele OAuth turvalisuse parimatele tavadele
  - **OWASP standardid**: Kontrollitud, et OWASP LLMide Top 10 viited on ajakohased
  - **Azure teenused**: Kinnitatud, et kõik Microsoft Azure’i dokumentatsiooni lingid ja parimad praktikad on aktuaalsed
- **Standarditele vastavus**: Kõik viidatud turvastandardid kehtivad
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 turvalisuse parimad tavad
  - Azure turbe- ja vastavusraamistikud
- **Rakendusressursid**: Kontrollitud kõikide rakendusjuhendite ja ressursside lingid
  - Azure API-halduse autentimine
  - Microsoft Entra ID integratsioonijuhendid
  - Azure Key Vault salajaste haldus
  - DevSecOps torujuhtmete ja jälgimislahenduste juhendid

### Dokumentatsiooni kvaliteedikontroll
- **Spetsifikatsiooni vastavus**: Kinnitust leidnud, et kõik kohustuslikud MCP turvanõuded (PEAB/PEAB MITTE) vastavad viimasele spetsifikatsioonile
- **Ressursside ajakohasus**: Kontrollitud kõik välised lingid Microsofti dokumentatsiooni, turvastandardite ja rakendamisjuhendite juurde
- **Parimate tavade katvus**: Kontrollitud põhjalikku kattuvust autentimise, autoriseerimise, tehisintellekti spetsiifiliste ohtude, tarneahela turbe ja ettevõtte mustrite osas

## 6. oktoober 2025

### Alustamise sektsiooni laiendus – Täiustatud serverikasutus & Lihtne autentimine

#### Täiustatud serverikasutus (03-GettingStarted/10-advanced)
- **Lisatud uus peatükk**: Esitatud põhjalik juhend täiustatud MCP serveri kasutamiseks, hõlmates nii tavalisi kui madala taseme serveriarhitektuure.
  - **Tavapärane vs. madalama taseme server**: üksikasjalik võrdlus ja koodinäited Pythonis ja TypeScriptis mõlema lähenemise kohta.
  - **Handler-põhine disain**: juhtide-põhise tööriista/resurssi/käivitaja haldamise selgitus skaleeritavate ja paindlike serverite rakenduste jaoks.
  - **Praktilised mustrid**: reaalmaailma stsenaariumid, kus madalama taseme serverimustrid on kasulikud täiustatud funktsioonide ja arhitektuuri jaoks.

#### Lihtne autentimine (03-GettingStarted/11-simple-auth)
- **Uus peatükk lisatud**: samm-sammult juhend lihtsa autentimise rakendamiseks MCP serverites.
  - **Autendi kontseptsioonid**: selge selgitus autentimise vs autoriseerimise ja volikirjade käsitlemise kohta.
  - **Põhiline autendi rakendus**: vahemikukihi-põhised autentimismustrid Pythonis (Starlette) ja TypeScriptis (Express), koos koodinäidetega.
  - **Edenemine täiustatud turvalisusesse**: juhised lihtsast autendist alustamiseks ja liikumiseks OAuth 2.1 ja RBAC suunas, viidates täiustatud turbemoodulitele.

Need lisandused pakuvad praktilisi, käed-külge juhiseid vastupidavamate, turvalisemate ja paindlikumate MCP serveritek rakenduste ehitamiseks, ühendades aluskontseptsioonid täiustatud tootmispraktikatega.

## 29. september 2025

### MCP serveri andmebaasi integratsioonilaborid - põhjalik praktiline õppeteekond

#### 11-MCPServerHandsOnLabs - uus täielik andmebaasi integratsiooni õppekava
- **Täielik 13-laboriline õppekava**: lisatud põhjalik praktiline õppekava tootmisvalmis MCP serverite loomise jaoks PostgreSQL andmebaasi integratsiooniga
  - **Reaalmaailma rakendus**: Zava Retaili analüütika kasutusjuht, demonstreerides ettevõtte-tasemel mustreid
  - **Struktureeritud õppenõlv**:
    - **Laborid 00-03: Alused** - sissejuhatus, põhialus arhitektuur, turvalisus & mitmekasutajalisus, keskkonna seadistus
    - **Laborid 04-06: MCP serveri ehitamine** - andmebaasi kavandamine ja skeem, MCP serveri realiseerimine, tööriistade arendus  
    - **Laborid 07-09: Täiustatud funktsioonid** - semantilise otsingu integreerimine, testimine ja silumine, VS Code integreerimine
    - **Laborid 10-12: Tootmine & parimad praktikad** - juurutusstrateegiad, monitooring ja jälgitavus, parimad praktikad ja optimeerimine
  - **Ettevõtte tehnoloogiad**: FastMCP raamistik, PostgreSQL koos pgvectoriga, Azure OpenAI vektorkujundused, Azure Container Apps, Application Insights
  - **Täiustatud funktsioonid**: Read taseme turvalisus (RLS), semantiline otsing, mitme kliendi andmetele ligipääs, vektorkujundused, reaalajas monitooring

#### Terminoloogia standardiseerimine – mooduli asendamine laboriga
- **Põhjalik dokumentatsiooni uuendus**: süsteemne kõigi README failide uuendamine 11-MCPServerHandsOnLabs kaustas, et kasutada "labor" terminoloogiat "mooduli" asemel
  - **Sektsioonide päised**: uuendatud "Mis see moodul katab" versioonile "Mis see labor katab" kõigi 13 labori puhul
  - **Sisu kirjeldus**: muudetud "See moodul pakub..." versioonile "See labor pakub..." kogu dokumentatsioonis
  - **Õpieesmärgid**: uuendatud "Selle mooduli lõpuks..." versioonile "Selle labori lõpuks..." 
  - **Navigeerimislingid**: muudetud kõik viited "Moodul XX:" versioonile "Labor XX:" ristviidetes ja navigeerimises
  - **Lõpetamise jälgimine**: uuendatud "Pärast selle mooduli lõpetamist..." versioonile "Pärast selle labori lõpetamist..."
  - **Tehnilised viited säilitatud**: säilitati Python mooduliviited konfiguratsioonifailides (nt `"module": "mcp_server.main"`)

#### Õpijuhendi täiendus (study_guide.md)
- **Visuaalne õppekava kaart**: lisatud uus sektsioon "11. Andmebaasi integratsiooni laborid" koos põhjaliku labori struktuuri visualiseerimisega
- **Repositsiooni struktuur**: uuendatud kümnest ühestteist peasektsiooni koos detailse 11-MCPServerHandsOnLabs kirjeldusega
- **Õpitee juhised**: täiustatud navigeerimisjuhised, hõlmates sektsioone 00-11
- **Tehnoloogia kajastus**: lisatud FastMCP, PostgreSQL, Azure teenuste integratsiooni detailid
- **Õpitulemused**: rõhutatud tootmisvalmis serveriarendus, andmebaasi integratsiooni mustrid ja ettevõtte turvalisus

#### Peamise README struktuuri täiendus
- **Laboripõhine terminoloogia**: uuendatud põhifail README.md failis 11-MCPServerHandsOnLabs järjekindlalt kasutama "labor" struktuuri
- **Õpitee korraldus**: selge etenemine aluskontseptsioonidelt läbi täiustatud rakendamise tootmise juurutamiseni
- **Reaalmaailma fookus**: rõhk praktilisel, käed-külge õppel koos ettevõtte-tasemel mustrite ja tehnoloogiatega

### Dokumentatsiooni kvaliteedi ja järjepidevuse parandused
- **Praktilise õppimise rõhutamine**: rõhutatud praktilist, laboripõhist lähenemist kogu dokumentatsioonis
- **Ettevõtte mustrite keskendus**: esile toodud tootmisvalmis rakendused ja ettevõtte turvalisuse aspektid
- **Tehnoloogia integreerimine**: põhjalik kajastus tänapäeva Azure teenustest ja tehisintellekti integratsioonimustritest
- **Õppe edenemine**: selge, struktureeritud tee põhilistest kontseptsioonidest tootmise juurutamiseni

## 26. september 2025

### Juhtumiuuringute täiendus - GitHub MCP registri integratsioon

#### Juhtumiuuringud (09-CaseStudy/) – ökosüsteemi arenduse fookus
- **README.md**: ulatuslik laiendus koos põhjaliku GitHub MCP registri juhtumiuuringuga
  - **GitHub MCP registri juhtumiuuring**: uus põhjalik juhtumiuuring, mis käsitleb GitHub MCP registri lansseerimist 2025. aasta septembris
    - **Probleemi analüüs**: üksikasjalik killustunud MCP serverite avastamise ja juurutamise väljakutsete läbivaatus
    - **Lahenduse arhitektuur**: GitHubi tsentraliseeritud registri lähenemine ühe klikiga VS Code installatsiooniga
    - **Äriline mõju**: mõõdetavad parendused arendajate sisseelamisel ja tootlikkuses
    - **Strateegiline väärtus**: keskendumine modulaarsele agendi juurutamisele ja tööriistadevahelisele koostalitlusele
    - **Ökosüsteemi areng**: positsioneerimine alustalaks agentide integratsiooni platvormil
  - **Põhjalikult täiendatud juhtumiuuringute struktuur**: uuendatud kõik seitse juhtumiuuringut järjepideva vormingu ja põhjalike kirjeldustega
    - Azure AI reisikorraldajad: mitme-agendi orkestreerimise rõhuasetus
    - Azure DevOps integratsioon: töövoo automatiseerimise fookus
    - Reaalajas dokumentatsiooni hankimine: Python konsooli kliendi rakendus
    - Interaktiivne õppeplaani generaator: Chainlit vestlusveebirakendus
    - Redaktori sees dokumentatsioon: VS Code ja GitHub Copilot integratsioon
    - Azure API haldus: ettevõtte API integratsiooni mustrid
    - GitHub MCP registri platvorm: ökosüsteemi areng ja kogukonna platvorm
  - **Laiendatud kokkuvõte**: ümber kirjutatud kokkuvõtte sektsioon, mis toob esile seitsme juhtumiuuringu mitmekesise katvuse MCP rakendusdimensioonides
    - Ettevõtte integratsioon, mitme-agendi orkestreerimine, arendaja tootlikkus
    - Ökosüsteemi areng, haridusliku rakendused kategoorias
    - Suurendatud arusaam arhitektuurimustritest, rakendamisstrateegiatest ja parimatest tavastest
    - Rõhk MCP-le kui küps, tootmisvalmis protokollile

#### Õpijuhendi uuendused (study_guide.md)
- **Visuaalne õppekava kaart**: uuendatud mõttekart mindmap, lisades GitHub MCP registri juhtumiuuringute sektsiooni
- **Juhtumiuuringute kirjeldused**: täiustatud üldistest kirjeldustest detailseks seitse põhjaliku juhtumiuuringu jaotuseks
- **Repositsiooni struktuur**: uuendatud sektsioon 10, peegeldamaks juhtumiuuringu põhjalikumat kajastust konkreetsete rakendusdetailidega
- **Muuda logi integreerimine**: lisatud 26. septembri 2025 märge GitHub MCP registri lisamise ja juhtumiuuringute täiustuste kohta
- **Kuupäevade uuendused**: lõpu tempel uuendatud peegeldamaks viimast muudatuse kuupäeva (26. september 2025)

### Dokumentatsiooni kvaliteedi parandused
- **Järjepidevuse parandamine**: juhtumiuuringute vormingu ja struktuuri ühtlustamine kõigi seitsme näite puhul
- **Põhjalik katvus**: juhtumiuuringud hõlmavad nüüd ettevõtte, arendaja tootlikkuse ja ökosüsteemi arenduse stsenaariume
- **Strateegiline positsioneerimine**: tugevdatud rõhk MCP-le kui alustavale agentide süsteemi juurutamise platvormile
- **Resursside integreerimine**: täiendatud täiendavate ressursside nimekirja, lisades GitHub MCP registri lingi

## 15. september 2025

### Täiustatud teemade laiendus – kohandatud transpordid & konteksti inseneritöö

#### MCP kohandatud transpordid (05-AdvancedTopics/mcp-transport/) – uus täiustatud rakendusjuhend
- **README.md**: täielik juhend MCP kohandatud transpordimehhanismide realiseerimiseks
  - **Azure Event Gridi transport**: põhjalik serverivaba sündmuspõhine transpordi realiseerimine
    - C#, TypeScripti ja Pythoni näited Azure Functions integratsiooniga
    - Sündmuspõhise arhitektuuri mustrid skaleeritavate MCP lahenduste jaoks
    - Webhooki vastuvõtjad ja push-põhine sõnumite haldus
  - **Azure Event Hubsi transport**: kõrge läbilaskvusega voostreami transpordi realiseerimine
    - reaalajas voostreami võimekused madala latentsusega stsenaariumide jaoks
    - jaotamise strateegiad ja järkjärgulise halduse mehhanism
    - sõnumite grupeerimine ja jõudluse optimeerimine
  - **Ettevõtte integratsiooni mustrid**: tootmisvalmis arhitektuuri näited
    - jaotatud MCP töötlus mitme Azure Functioni vahel
    - hübriidtranspordi arhitektuuride kombineerimine mitmete transporditüüpidega
    - sõnumite vastupidavuse, töökindluse ja veahaldusstrateegiad
  - **Turvalisus & monitooring**: Azure Key Vaulti integratsioon ja jälgitavuse mustrid
    - hallatud identiteedi autentimine ja minimaalsete õiguste ligipääs
    - Application Insights telemeetria ja jõudluse jälgimine
    - vooluringi kaitsjad ja rikke kindluse mustrid
  - **Testimise raamistikud**: ulatuslikud testimisstrateegiad kohandatud transpordidele
    - ühikutestimine testtopside ja mockimise raamistikuga
    - integratsioonitestimine Azure Test Containersiga
    - jõudluse ja koormustestimise kaalutlused

#### Konteksti inseneritöö (05-AdvancedTopics/mcp-contextengineering/) – tekkiv AI valdkond
- **README.md**: ulatuslik konteksti inseneritöö põhimõtete uurimine kui tekkiv valdkond
  - **Tuumikpõhimõtted**: täielik konteksti jagamine, tegevuse tegemise teadlikkus ja konteksti akna juhtimine
  - **MCP protokolli joondus**: kuidas MCP disain lahendab konteksti inseneritöö väljakutseid
    - konteksti akna piirangud ja progressiivse laadimise strateegiad
    - asjakohasuse määramine ja dünaamiline konteksti hankimine
    - multimeedia konteksti haldamine ja turvalisuse kaalutlused
  - **Rakenduslähenemised**: ühe lõime- vs mitme agendi arhitektuurid
    - konteksti lõikude jaotamine ja prioritiseerimise tehnikad
    - progressiivne konteksti laadimine ja kokkusurumisstrateegiad
    - kihiline konteksti lähenemine ja hankimise optimeerimine
  - **Mõõtmisraamistik**: tekkivad mõõdikud konteksti efektiivsuse hindamiseks
    - sisendi tõhusus, jõudlus, kvaliteet ja kasutajakogemuse kaalutlused
    - eksperimentaalsed lähenemised konteksti optimeerimiseks
    - ebaõnnestumiste analüüs ja parendusmeetodid

#### Õppekava navigeerimise uuendused (README.md)
- **Täiendatud moodulistruktuur**: õppekava tabeli uuendus uute täiustatud teemade lisamiseks
  - lisatud Konteksti inseneritöö (5.14) ja Kohandatud transport (5.15) kirjed
  - järjepidev vormindus ja navigeerimislingid kõigis moodulites
  - uuendatud kirjeldused kajastamaks praegust sisuala

### Kaustastruktuuri parandused
- **Nimede standardiseerimine**: "mcp transport" kausta ümbernimetamine "mcp-transport" vastavalt teistele täiustatud teemade kaustadele
- **Sisu korraldus**: kõik 05-AdvancedTopics kaustad järjepideva nimekujundusega (mcp-[teema])

### Dokumentatsiooni kvaliteedi täiustused
- **MCP spetsifikatsiooni joondus**: kogu uus sisu viitab MCP spetsifikatsioonile 2025-06-18
- **Mitmekeelsete näidete komplekt**: põhjalikud koodinäited C#, TypeScripti ja Pythoni keeltes
- **Ettevõtte fookus**: tootmisvalmis mustrid ja Azure pilve integratsioon kogu ulatuses
- **Visuaalne dokumentatsioon**: Mermaid diagrammid arhitektuuri ja andmevoo visualiseerimiseks

## 18. august 2025

### Dokumentatsiooni põhjalik uuendus – MCP 2025-06-18 standardid

#### MCP turvalisuse parimad praktikad (02-Security/) – täielik moderniseerimine
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: täielik ümberkirjutus MCP spetsifikatsiooni 2025-06-18 alusel
  - **Nõutavad tingimused**: lisatud MCP ametlikust spetsifikatsioonist tingimuslikud PEAB/PEAB MITTE nõuded selgete visuaalsete indikaatoritega
  - **12 põhiturvalisuse valdkonda**: struktureeritud 15-punktilisest nimekirjast täielikeks turvalisusvaldkondadeks
    - Tokeni turvalisus & autentimine välise identiteedipakkuja integratsiooniga
    - Sessiooni haldus & transporditurve krüptograafiliste nõuetega
    - AI-spetsiifiline ohtude kaitse Microsofti Prompt Shieldsi integratsiooniga
    - Ligipääsu kontroll & õigused vähima privileegiga põhimõtte järgi
    - Sisu ohutus & monitooring Azure Content Safety integratsiooniga
    - Tarneahela turvalisus koostisosade tervikliku kontrolliga
    - OAuth turvalisus & segipaisatud esindaja ennetamine PKCE rakendusega
    - Juhtumite reageerimine & taastumine automatiseeritud võimalustega
    - Vastavus & haldus regulatiivse kooskõlastusega
    - Täiustatud turvakontrollid nulliusalduse arhitektuuriga
    - Microsofti turvasüsteemide integratsioon tervikuna
    - Jätkuv turvalisuse areng kohanduvate praktikatega
  - **Microsofti turvalahendused**: täiustatud integreerimisjuhised Prompt Shieldsi, Azure Content Safety, Entra ID ja GitHub Advanced Securityga
  - **Rakendusressursid**: klassifitseeritud põhjalikud ressursilingid ametliku MCP dokumentatsiooni, Microsofti julgeoleku lahenduste, turvastandardite ja rakendusjuhendite kategooriates

#### Täiustatud turvakontrollid (02-Security/) – ettevõtte rakendusraamistik
- **MCP-SECURITY-CONTROLS-2025.md**: täielik ümberkorraldus ettevõtte-tasemel turbestruktuuriks
  - **9 põhjalikku turvalisuse valdkonda**: laiendatud põhilistest kontrollidest detailseks ettevõttesüsteemi raamistiku osaks
    - Täiustatud autentimise & autoriseerimise integratsioon Microsoft Entra ID-ga
    - Tokeni turvalisus & anti-passthrough kontrollid põhjaliku valideerimisega
    - Seansi turvakontrollid kõrgepinge ennetamisega
    - AI-spetsiifilised turvakontrollid, sh käivituse süstimise ja tööriista mürgistamise kaitse
    - Segipaisatud esindaja rünnaku ennetus OAuth proksiga
    - Tööriistade käivitamise turvalisus liivakasti ja isoleerimisega
    - Tarneahela turvakontrollid sõltuvuste valideerimisega
    - Monitooring & avastamine SIEM integratsiooniga
    - Juhtumite reageerimine & taastumine automatiseeritud vahenditega
  - **Rakendamise näited**: lisatud detailsed YAML konfiguratsiooni plokid ja koodinäited
  - **Microsofti lahenduste integratsioon**: põhjalik Azure turvateenuste, GitHub Advanced Security ja ettevõtte identiteedihalduse kaasamine

#### Täiustatud teemade turvalisus (05-AdvancedTopics/mcp-security/) – tootmisvalmis rakendus
- **README.md**: täielik ümberkirjutus ettevõtte-taseme turberakenduste jaoks
  - **Praeguse spetsifikatsiooni järgimine**: uuendatud MCP spetsifikatsioonile 2025-06-18 koos kohustuslike turvanõuetega
  - **Täiustatud autentimine**: Microsoft Entra ID integratsioon .NET ja Java Spring Securityga detailsete näidetega
  - **AI turvaintegratsioon**: Microsoft Prompt Shields ja Azure Content Safety realiseerimine koos põhjalike Pythoni näidetega
  - **Täiustatud ohutõrje**: põhjalikud rakendusnäited kohta
    - Segipaisatud esindaja rünnaku ennetamine PKCE ja kasutajalubade valideerimisega
    - Tokeni läbipääsu ennetamine audientsi valideerimise ja turvalise tokeni haldusega
    - Sessiokaaperdamise tõrje, kasutades krüptograafilist sidumist ja käitumuslikku analüüsi
  - **Ettevõtte turvalisuse integratsioon**: Azure Application Insightsi jälgimine, ohutuvastuse torustikud ja tarneahela turvalisus
  - **Rakendamise kontrollnimekiri**: Selged kohustuslikud vs soovituslikud turvakontrollid Microsofti turveelu kasudega

### Dokumentatsiooni kvaliteet ja standardite kooskõla
- **Spetsifikatsiooni viited**: Kõik viited värskendatud praeguse MCP spetsifikatsiooni 2025-06-18 peale
- **Microsofti turueelu**: Täiustatud integreerimisjuhised kõigis turvadokumentides
- **Praktiline rakendamine**: Lisatud üksikasjalikud koodinäited .NET, Java ja Python keeles koos ettevõtte mustritega
- **Ressursside organiseerimine**: Ülevaatlik ametlike dokumentide, turvastandardite ja rakendusjuhendite kategooriseerimine
- **Visuaalsed indikaatorid**: Selge märgistamine kohustuslike nõuete vs soovituslike tavade vahel


#### Põhikontseptsioonid (01-CoreConcepts/) - Täielik moderniseerimine
- **Protokolli versiooni uuendus**: Viidatud praegusele MCP spetsifikatsioonile 2025-06-18 kuupõhise versioonimisega (YYYY-MM-DD vorming)
- **Arhitektuuri täpsustamine**: Täiustatud Hosts, Clients ja Servers kirjelduseid, et kajastada MCP arhitektuuri mustreid
  - Hosts on nüüd selgelt defineeritud kui AI rakendused, mis koordineerivad mitut MCP kliendiühendust
  - Clients kirjeldatud kui protokolli ühendajad, säilitades ühe-ühte serveri suhted
  - Servers täiustatud lokaalse ja kaugdeploymendi stsenaariumitega
- **Primitiivide ümberkorraldus**: Serveri ja kliendi primitiivide täielik uuendus
  - Serveri primitiivid: Ressursid (andmeallikad), Käsklused (mallid), Tööriistad (täidetavad funktsioonid) koos detailsete seletuste ja näidetega
  - Kliendi primitiivid: Proovivõtt (LLM täitmised), Küsitlemine (kasutaja sisend), Logimine (silumine/jälgimine)
  - Uuendatud praeguste avastamise (`*/list`), pärimise (`*/get`) ja teostamise (`*/call`) meetodimustritega
- **Protokolli arhitektuur**: Loodud kahekihiline arhitektuuri mudel
  - Andmekiht: JSON-RPC 2.0 alus koos elutsükli halduse ja primitiividega
  - Transportkiht: STDIO (kohalik) ja voogedastatav HTTP koos SSE-ga (kaugtransport)
- **Turvakeskkond**: Kõikehõlmavad turvapõhimõtted sealhulgas selge kasutaja nõusolek, andmekaitse, tööriistade täitmise turvalisus ja transpordikihi turvalisus
- **Kommunikatsioonimustrid**: Protokolli sõnumid uuendatud, et näidata initsialiseerimist, avastamist, täitmist ja teavitusi
- **Koodi näited**: Uuendatud mitmekeelsed näited (.NET, Java, Python, JavaScript) kooskõlas praeguste MCP SDK mustritega

#### Turvalisus (02-Security/) - Kõikehõlmav turvauuendus  
- **Standardite kooskõla**: Täielik vastavus MCP spetsifikatsiooni 2025-06-18 turvanõuetele
- **Autentimise areng**: Dokumenteeritud areng kohandatud OAuth serveritest välistesse identiteedipakkujatesse delegeerimisele (Microsoft Entra ID)
- **AI-spetsiifiline ohuanalüüs**: Täiustatud kaaperdamisgeened kaasaegsete AI ründevektorite kohta
  - Üksikasjalikud prompt-süstimise ründe stsenaariumid reaalse elu näidetega
  - Tööriista mürgitamise mehhanismid ja "rug pull" ründemustrid
  - Kontekstiakna mürgitamise ja mudeli segadusse ajamise rünnakud
- **Microsofti AI turvalahendused**: Kõikehõlmav Microsofti turveelu käsitlus
  - AI prompt-shieldid edasijõudnud tuvastuse, esiletõstmise ja piiritlemistehnikatega
  - Azure Content Safety integratsioonimustrid
  - GitHub Advanced Security tarneahela kaitseks
- **Edelate ohtude leevendamine**: Detailiseeritud turvakontrollid
  - Sessiokaaperdamine MCP-spetsiifiliste ründestsenaariumite ja krüptograafiliste seansi ID nõuetega
  - Segadusseajamise probleemid MCP puhvrisel stsenaariumis, kus nõutakse selgesõnalist nõusolekut
  - Tokeni läbilaske haavatavused koos kohustusliku valideerimisega
- **Tarneahela turvalisus**: Laiendatud AI tarneahela katvus, sealhulgas alustalad, manustamise teenused, kontekstipakkujad ja kolmandate osapoolte API-d
- **Aluste turvalisus**: Täiustatud integreerimine ettevõtte turvaprototüüpidega, sealhulgas nullusaldus arhitektuur ja Microsofti turveelu
- **Ressursside organiseerimine**: Kõiki ressursiviiteid kategooriate kaupa (ametlikud dokumendid, standardid, teadus, Microsofti lahendused, rakendusjuhendid)

### Dokumentatsiooni kvaliteedi parandused
- **Struktureeritud õpieesmärgid**: Täiustatud õpieesmärgid spetsiifiliste ja teostatavate tulemustega 
- **Ristviited**: Lisatud lingid omavahel seotud turva- ja põhikontseptsioonide teemade vahel
- **Praegune info**: Kõik kuupäevad ja spetsifikatsiooni lingid värskendatud kehtivatele standarditele
- **Rakendamisjuhised**: Lisatud spetsiifilised juhendid mõlemas osas

## 16. juuli 2025

### README ja navigeerimise täiustused
- Taasdisainitud kogu õppekava navigeerimine README.md failis
- Asendatud `<details>` sildid ligipääsetavama tabelipõhise vorminguga
- Loodud alternatiivsed paigutusvalikud uues "alternative_layouts" kaustas
- Lisatud kaardipõhised, vahekaartidega ja akordionstiilis navigeerimisnäited
- Uuendatud hoidla struktuuri osakond, mis sisaldab kõiki viimaseid faile
- Täiustatud "Kuidas seda õppekava kasutada" jaotis selgete soovitustega
- Värskendatud MCP spetsifikatsiooni lingid õigetele URL-idele
- Lisatud kontekstitöötluse sektsioon (5.14) õppekavasse

### Õpikuuuendused
- Täiesti ümber kujundatud õpi juhend kooskõlas praeguse hoidla struktuuriga
- Lisatud uued sektsioonid MCP klientide ja tööriistade ning populaarsete MCP serverite kohta
- Uuendatud visuaalne õppekava kaart, mis peegeldab kõiki teemasid täpselt
- Täiustatud edasijõudnud teemade kirjeldused, katmaks kõiki erialasid
- Uuendatud juhtumiuuringute sektsioon reaalse elu näidete peegeldamiseks
- Lisatud see põhjalik muudatuste logi

### Kogukonna panused (06-CommunityContributions/)
- Lisatud põhjalik info MCP serverite kohta pildigeneratsiooniks
- Lisatud põhjalik sektsioon Claude kasutamisest VSCode’is
- Lisatud Cline terminalikliendi seadistuse ja kasutusjuhised
- Uuendatud MCP kliendi sektsioon kõigi populaarsete kliendivalikutega
- Täiustatud panuse näiteid täpsemate koodinäidetega

### Edasijõudnud teemad (05-AdvancedTopics/)
- Kogu erialade kaustad organiseeritud ühtse nimetusega
- Lisatud kontekstitöötluse materjalid ja näited
- Lisatud Foundry agente integreerimise dokumentatsioon
- Täiustatud Entra ID turvalisuse integratsiooni dokumentatsioon

## 11. juuni 2025

### Algne loomine
- Välja antud MCP for Beginners õppekava esimene versioon
- Loodud põhiline struktuur kõigi 10 põhiosaga
- Rakendatud visuaalne õppekava kaart navigeerimiseks
- Lisatud algsed näidisprojektid mitmes programmeerimiskeeles

### Alustamine (03-GettingStarted/)
- Loodud esimesed serveri rakenduse näited
- Lisatud kliendi arendamise juhised
- Kaasatud LLM kliendi integreerimise juhised
- Lisatud VS Code integreerimise dokumentatsioon
- Rakendatud Server-Sent Events (SSE) serveri näited

### Põhikontseptsioonid (01-CoreConcepts/)
- Lisatud kliendi-serveri arhitektuuri üksikasjalik selgitus
- Loodud dokumentatsioon põhiprotokolli komponentide kohta
- Dokumenteeritud sõnumimustreid MCP-s

## 23. mai 2025

### Hoidla struktuur
- Initsialiseeritud hoidla põhilise kaustastruktuuriga
- Loodud README failid iga suurema sektsiooni jaoks
- Seadistatud tõlkimise infrastruktuur
- Lisatud pildiressursid ja skeemid

### Dokumentatsioon
- Loodud esimene README.md koos ülevaatega õppekavast
- Lisatud CODE_OF_CONDUCT.md ja SECURITY.md
- Seadistatud SUPPORT.md abi saamise juhistega
- Loodud eeluuringu juhendi struktuur

## 15. aprill 2025

### Planeerimine ja raamistik
- MCP for Beginners õppekava esmane planeerimine
- Määratletud õpieesmärgid ja sihtgrupp
- Koostatud 10-osaline õppekava struktuur
- Arendatud kontseptuaalne raamistik näidete ja juhtumiuuringute jaoks
- Loodud esialgsed prototüübi näited põhikontseptsioonide jaoks

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->