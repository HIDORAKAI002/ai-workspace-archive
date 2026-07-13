# Muudatused: MCP algajate õppekava

See dokument teenib Model Context Protocol (MCP) algajate õppekava kõikide oluliste muudatuste arvestuseks. Muudatused on dokumenteeritud pööratud kronoloogilises järjekorras (esimesena uusimad muudatused).

## 2. juuli 2026

### Uus õppetund: 2026-07-28 MCP spetsifikatsiooni väljaandmise kandidaat

Lisatud käsitlus tulevasest `2026-07-28` MCP spetsifikatsiooni väljaandmise kandidaadist (avalikustatud 21. mail 2026; lõplik väljaanne planeeritud 28. juuliks 2026), kokkuvõtlikult [ametliku teadaande blogipostituse](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) põhjal. Õppekava baas jääb alles **MCP Specification 2025-11-25** tasemele kuni uue versiooni ilmumiseni, seega esitatakse see pigem tulevikku vaatava juhisena, mitte olemasolevate õppetundide ümberkirjutusena.

- **Uus**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — täielik õppetund, mis käsitleb staatilist protokolli tuuma (ühenduse alguse käepigistuse `initialize` ja `Mcp-Session-Id` eemaldamine), uusi `Mcp-Method`/`Mcp-Name` marsruutimispealkirju, `ttlMs`/`cacheScope` vahemälustamise metaandmeid, W3C Trace Context-i `_meta` sees, ametlikku laienduste raamistikku (MCP rakendused ja uus Tasks laiendus), kuut autoriseerimise tugevdust SEPs-i, Roots/Sampling/Logging vananenuks tunnistamist ja täieliku ülemineku JSON Schema 2020-12 jaoks tööriistade skeemides.
- **Uuendatud** koos tulevikku vaatavate kutsetega uuele õppetunnile:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protokolli versiooni märkus, Sampling/Roots/Logging/Tasks sektsioonid ja „Mis järgmiseks“
  - [02-Security/README.md](./02-Security/README.md): autoriseerimise tugevdamise kutse
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): staatilise transpordi kutse
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Sampling vananemise kutse
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Logging vananemise ja Tasks laienduse kutse
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): staatilise/seansi marsruutimise kutse
  - [README.md](./README.md): „Vaatame ette“ märkus spetsifikatsiooni jaotises ja uus `1.1` kirje õppekava mooduli tabelis
  - [study_guide.md](./study_guide.md): tulevikku vaatav punkt tuumkontseptsioonide ülevaates ja kuupäevastatud lisa
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): kutse `mcp-session-id` transpordikaardile staatilise päringumudeli eelkäijana
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): mooduli ülevaate kutse Root Contexts/Sampling vananemistele ja Tasks laiendusele
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): autoriseerimise tugevdamise kutse

## 24. juuni 2026

### Uus õppetund: MCP kasutamine Copilot rakenduses

- [Tööriistade sektsioon](./12-tooling/README.md) Lisatud tööriistade sektsioon.
- [MCP Copilot rakenduses](./12-tooling/01-copilot-app/README.md)

## 16. juuni 2026

### MCP spetsifikatsiooni joondamine ja näidiste valideerimine

Valideeritud õppekava vastu kehtivat **MCP Specification 2025-11-25** ja uusimaid ametlikke SDKsid, seejärel parandatud jäänud aegunud spetsifikatsiooni viited ning kinnitatud, et põhinäited endiselt kompileeruvad ja töötavad.

#### Spetsifikatsiooni versiooni parandused (2025-06-18 / 2025-03-26 → 2025-11-25)

Uuendatud ingliskeelset sisu, kus veel väideti, et vanem spetsifikatsioon on *kehtiv/viimane* standard ning suunatud lingid kanonilistele `modelcontextprotocol.io` spetsifikatsiooni aadressidele:
- **05-AdvancedTopics/mcp-security/README.md**: uuendatud „Praeguse standardi“ bänner, sissejuhatus, tuumturvafundamendid, kohustuslikud nõuded, Microsoft Entra ID sektsioon, viited ja ressursid ning turvateadete lõik (8 viidet) versioonile 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: uuendatud täiendavate ressursside spetsifikatsiooni link ja „Praeguse standardi“ bänner versioonile 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: asendatud aegunud `2025-03-26` turbe- ja usalduspõhimõtete link spetsifikatsiooni uuega 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: uuendatud ametliku proovivõtu dokumendi link versioonile 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: uuendatud olevikus oleva „praeguse MCP spetsifikatsiooni“ viide ja täiendavate ressursside spetsifikatsiooni link versioonile 2025-11-25 (ajaloolised SSE vananemise märkused jäetud muutmatuks täpsuse huvides)

#### Näidiste valideerimine kehtivate SDKde vastu

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` laadis `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` lõpetas ilma tüüpivigadeta — olemasolevad `McpServer`/`StdioServerTransport` APId on endiselt kehtivad
- **Python (03-GettingStarted/01-first-server/solution/python)**: valideeritud isoleeritud `.venv` keskkonnas koos `mcp[cli]` (1.27.2); `py_compile` õnnestus ja `FastMCP.list_tools()` tagastas õigesti tööriistad `add` ja `subtract`
- Kinnitatud, et kõik näidiste `@modelcontextprotocol/sdk` versioonivahemikud (`>=1.26.0` / `^1.26.0` / `^1.27.0`) lahenevad puhtalt kehtivale `1.29.0` versioonile ilma katkestavate API muudatusteta

#### Sõltuvuse pin versioonide joondamine (versioonilüngad kinni)

Uuendatud vananenud SDK pin numbreid nii, et iga näidis jälgib kehtivat MCP väljaannet, järgides kogu repositooriumi konventsiooni:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: uuendatud `@modelcontextprotocol/sdk` `^1.8.0` → `>=1.26.0` ja töölaua kirjeldus „updated for MCP 2025-06-18” asendatud kirjeldusega „aligned with MCP Specification 2025-11-25“
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ja **lab4/code/github_mcp_server/pyproject.toml**: täpne pin `mcp==1.23.0` asendatud `mcp>=1.26.0` vastu; mõlemas uuesti genereeritud `uv.lock` failid (`uv lock`), nii et lukufailid lahenduvad kehtivale `mcp 1.27.2` versioonile ja püsivad kooskõlas manifestidega

#### Õppekava sisulise lõhe analüüs — uusimate spetsifikatsiooni funktsioonide katvus

Kontrollitud, et õppekava katab juba kõik primitiivid, mis on MCP 2025-11-25 spetsifikatsioonis lisatud või laiendatud, seega puuduvad sisulised puudujäägid:
- **Sampling**: Õppetund 03-GettingStarted/14-sampling ja 05-AdvancedTopics/mcp-sampling
- **Elicitation (kaasa arvatud URL režiim)**: dokumenteeritud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features
- **Roots**: dokumenteeritud 00-Introduction, 01-CoreConcepts ja 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimentaalne, pikaajalised toimingud)**: dokumenteeritud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features
- **Tööriistade annotatsioonid** (`readOnlyHint` / `destructiveHint`): dokumenteeritud 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features

### Turvalisuse tugevdamine ja sõltuvuste haavatavuse kõrvaldamine

Läbinud täieliku turvakontrolli kõigi sõltuvusmanifesti ja näidiskoodi peal, seejärel kõrvaldanud kõik teatatud npm auditeadised ning ühe koodi tasandi leiu. Pärast parandusprotsessi on `npm audit` teatab **0 haavatavust** igas auditeeritud kataloogis.

#### npm sõltuvuste haavatavused (kaudsed) — parandatud

Auditeeritud kõik 15 kinnitatud `package-lock.json` faili. Haavatavused piirdusid kaudsete sõltuvustega, mida tõi sisse MCP Inspector arendustööriist, OpenAI klient ja MCP SDK; kõik parandasime ilma näidiseid rikkumata:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ja **lab3/code/weather_mcp/inspector**: tõstetud `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), mis kustutas kokku pandud advisories `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ja `ws` kohta. Lisatud npm `overrides` kirje, mis sunnib parandatud `shell-quote@1.8.4` kasutamist, et likvideerida kriitiline pöördumisadvisory, mida kandis `concurrently`; mõlema lukufaili uuesti genereerimine (nüüd 0 haavatavust)
- **03-GettingStarted/samples/typescript**: `npm audit fix` uuendas kaudse `qs` (mõõdukas) parandatud versioonile
- **03-GettingStarted/samples/javascript**: `npm audit fix` uuendas kaudse `hono` (mõõdukas) parandatud versioonile
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` uuendas kaudse `form-data` (kõrge) parandatud versioonile
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genereeris puudunud `package-lock.json`, et projekt oleks reprodutseeritav ja auditeeritav (0 haavatavust)

#### Koodi tasandi turvaparandus (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Eemaldatud `shell=True`` open_in_vscode` tööriistast. Varem `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` lubas kaustatee shelli metamärgiste tõlgendamist `cmd.exe` poolt (käskude süstimise vektor). Nüüd käivitab otse lahendatud `Code.exe` kausta argumendina — ilma shellita — mis on funktsionaalselt ekvivalentne ja ohutu

#### Python sõltuvuste audit

- Audititud kõik Python nõuete kogumikud `pip-audit` abil. `05-AdvancedTopics` ja `03-GettingStarted/samples/python` teatavad **puuduvatest teadaolevatest haavatavustest** (nende `mcp` / `httpx` / `pydantic` / `python-dotenv` vahemikud lahenevad kehtivatele parandatud väljaannetele)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` leidis kaudse sõltuvuse **`werkzeug` 3.1.1** kolmega `safe_join` Windows seadmenime DoS teatisega — `CVE-2025-66221`, `CVE-2026-21860` ja `CVE-2026-27199` (kõik parandatud versioonis 3.1.6). Lisatud selgesõnaline turvapind `werkzeug>=3.1.6`, nii et paranduslahendus leitakse; kinnitatud, et piirang lahendub korrektselt koos `chainlit` / `mcp` / `semantic-kernel` virnaga

### Tootenime ümberbrändimine

Uuendatud kogu õppekava sisu, et kajastada Microsofti toodete ümberbrändimist:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: uuendatud Discordi kogukonna link
- **AGENTS.md**: uuendatud Discordi serveri viide
- **README.md**: uuendatud tehnoloogia ökosüsteemi viited
- **study_guide.md**: uuendatud juhtumiuuringu viited
- **05-AdvancedTopics/README.md**: uuendatud mooduli 5.13 pealkirja ja kirjeldust
- **05-AdvancedTopics/mcp-integration/README.md**: uuendatud jaotise pealkiri ja kirjeldus
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: täielik mooduli pealkirja ja sisu värskendus
- **05-AdvancedTopics/mcp-security-entra/README.md**: uuendatud ristviide
- **07-LessonsfromEarlyAdoption/README.md**: uuendatud juhtumiuuringu viited
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: uuendatud jaotise 9 pealkiri, märgised ja võimekused
- **08-BestPractices/README.md**: uuendatud Discordi kogukonna link
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: uuendatud Discordi kanali viide
- **09-CaseStudy/docs-mcp/solution/python/README.md**: uuendatud mudeli juurutamise viide
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: uuendatud AI teenuste tabel
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: uuendatud ressursiviited

#### AI Toolbox / AITK → Microsoft Foundry Toolkit Extension VS Code jaoks
- **README.md**: Uuendatud peamise õppekava viited
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Uuendatud mooduli pealkiri, ülevaade ja kõik mooduli päised
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Uuendatud pealkiri, õpieesmärgid, seadistusjuhised ja ressursid
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Uuendatud pealkiri, õpieesmärgid, MCP hostide tabel ja ristviited
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Uuendatud pealkiri, märgid, eeltingimused ja ressursid
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Uuendatud Agent Builderi viited ja tagasiside link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Uuendatud eeltingimused ja laiendusviited

---

## 11. aprill 2026

### Uus õppetund, dokumentatsiooni parandused ja sõltuvuste uuendused

#### Lisatud uus õppekava sisu

**Moodul 05 - Täiustatud teemad**
- **Õppetund 5.17: Vastuoluline mitmeagendi mõtlemine MCP-ga** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Uus põhjalik juhend mitmeagendi süsteemide vastuolulise arutelu mustri kohta
  - Mermaid arhitektuuri diagramm: kaks agenti → jagatud MCP server → arutelu transkriptsioon → kohtunik → otsus
  - Jagatud MCP tööriistade server (`web_search` + `run_python`) teostatud Pythonis ja TypeScriptis
  - Vastanduvad süsteemipromptsid (POOLT / VASTU / Kohtunik) koos selgete tööriistakasutuse nõuetega
  - Arutelu orkestreerija Pythonis, TypeScriptis ja C#-s, juhib voorusid ja marsruudib argumente
  - MCP `ClientSession` ühendamine orkestreerijale reaalsete tööriistakõnede jaoks
  - Kasutusjuhtumite tabel (hallutsinatsioonide tuvastamine, ohu modelleerimine, API disaini ülevaade, faktikinnitamine, tehnoloogiate valik)
  - Turvakaalutlused: liivakasti käitus, tööriistakõnede valideerimine, kiirusepiirang, auditeerimislogi pidamine
  - Struktureeritud harjutus kolme praktilise stsenaariumiga (koodiläbivaatus, arhitektuuriline otsus, sisu modereerimine)

#### Dokumentatsiooni parandused

**Moodul 03 - Algus**
- **05-stdio-server/README.md**: Parandatud puudulik TypeScript stdio serveri näide — lisatud puuduva transpordi instantsi loomine (`new StdioServerTransport()`) ja `server.connect(transport)` kutsung, et järgneda sama sektsiooni Python ja .NET näidetele
- **14-sampling/README.md**: Parandatud kirjaviga — parandatud `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Õppekava uuendused

**Peamine README.md**
- Lisatud õppetund 5.17 (Vastuoluline mitmeagendi mõtlemine MCP-ga) õppekava tabelisse koos otselinkiga uuele õppetunnile

**05-AdvancedTopics/README.md**
- Õppetund 5.17 lisatud õppetundide tabelisse

**study_guide.md**
- Lisatud Vastuoluline mitmeagendi mõtlemine teema mõttekaardile ja täiendatud kirjeldus Täiustatud teemade sektsioonis

#### Koodi ja turvalisuse parandused

**Moodul 05 - Vastanduvad Agendid (`mcp-adversarial-agents`)**
- **Turvaparandus — käsu süstimine**: Asendatud TypeScripti `run_python` tööriista `execSync` shell-interpolatsioon `execFile` + `promisify` kasutamisega, eemaldades käsu süstimise haavatavuse (LLM-kontrollitud kood saadetakse nüüd kirjeldusega argv elemendina ilma shelli kaasamiseta)
- **MCP tööriistaringi ühendamine**: Uuendatud Python arutelu orkestreerijat kasutama `AsyncAnthropic` klienti (asendades blokeeriva sünkroonse `Anthropic`), läbisaadetakse elav `ClientSession` otse iga agendi vooru jaoks, hangitakse tööriistade definitsioonid `session.list_tools()` kaudu iga vooru ajal, saadetakse `tool_use` plokke `session.call_tool()` kaudu tsüklis, kuni mudel annab lõpliku tekstivastuse

#### Sõltuvuste uuendused

- Uuendatud `hono` versioonile 4.12.12 mitmetes pakettides (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Uuendatud `@hono/node-server` versioon 1.19.11 → 1.19.13 TypeScript pakettides
- Uuendatud `cryptography` versioon 46.0.5 → 46.0.7 Python pakettides (10-StreamliningAIWorkflows labid 3 ja 4)
- Uuendatud `lodash` versioon 4.17.23 → 4.18.1 10-StreamliningAIWorkflows inspectoris

#### Tõlked

- Sünkroniseeritud tõlked 48+ keeles viimaste lähtefailide muudatustega (i18n uuendus)

---

## 5. veebruar 2026

### Kogu hoidla valideerimine ja navigeerimise täiendused

#### Lisatud uus õppekava sisu

**Moodul 03 - Algus**
- **12-mcp-hosts/README.md**: Uus põhjalik juhend MCP hostide seadistamiseks
  - Näited Claude Desktopi, VS Code'i, Cursor’i, Cline’i, Windsurfi konfiguratsioonist
  - JSON konfiguratsiooni mallid kõigi peamiste hostide jaoks
  - Transporditüüpide võrdlustabel (stdio, SSE/HTTP, WebSocket)
  - Levinumate ühendusprobleemide tõrkeotsingu juhend
  - Hostikonfiguratsiooni turvalisuse parimad praktikad

- **13-mcp-inspector/README.md**: Uus MCP Inspectori silumisjuhend
  - Paigaldusmeetodid (npx, globaalne npm, lähtekoodist)
  - Ühendamine serveritega stdio ja HTTP/SSE kaudu
  - Tööriistade, ressursside ja promptide testimiskäigud
  - VS Code integratsioon MCP Inspectoriga
  - Levinumad silumisstsenaariumid koos lahendustega

**Moodul 04 - Praktiline rakendamine**
- **pagination/README.md**: Uus leheküljepõhise (pagination) juhend
  - Kursoripõhised leheküljepõhised mustrid Pythonis, TypeScriptis ja Javas
  - Kliendipoolse leheküljepõhise käsitlus
  - Kursori disainistrateegiad (opaqne vs struktureeritud)
  - Jõudluse optimeerimise soovitused

**Moodul 05 - Täiustatud teemad**
- **mcp-protocol-features/README.md**: Uus protokolli omaduste süvaanalüüs
  - Edusammute teatamise puhul rakendus
  - Päringu tühistamise mustrid
  - Ressursside mallid URI mustritega
  - Serveri elutsükli haldus
  - Logimise taseme juhtimine
  - Veahaldusmustrid koos JSON-RPC koodidega

#### Navigeerimise parandused (uuendatud 24+ faili)

**Peamised mooduli README-d**  
 Nüüd lingid nii esimesele õppetunnile KUI järgmisele moodulile

**02-Turvalisuse alamfailid**  
 Kõigil viiel täiendaval turvalisuse dokumendil on nüüd jaotis „Mis edasi“

**09-Juhtumiuuringu failid**  
 Kõigil juhtumiuuringu failidel on nüüd järjestikune navigeerimine

**10-StreamliningAI labid**  
 Lisatud „Mis edasi“ jaotis Mooduli 10 ülevaatesse ja Moodulisse 11

#### Koodi ja sisu parandused

**SDK ja sõltuvuste uuendused**  
 Parandatud tühja openai versiooni märk `^4.95.0`  
 Uuendatud SDK versioon `^1.8.0` → `>=1.26.0`  
 Uuendatud mcp versiooni ankurdus `>=1.26.0`

**Koodi parandused**  
 Parandatud kehtetu mudel `gpt-4o-mini` → `gpt-4.1-mini`

**Sisu parandused**  
 Parandatud katkine link `READMEmd` → `README.md`  
 Parandatud õppekava päis `Module 1-3` → `Module 0-3`  
 Parandatud failitee täpne kirjastiil  
 Eemaldatud rikutud duplikaat juhtumiuuring 5 sisu

**Algajate juhendamise täiendused**  
 Lisatud korrektne sissejuhatus, õpieesmärgid ja eeltingimused algajatele

#### Õppekava uuendused

**Peamine README.md**  
- Lisatud kirjed 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Leheküljepõhine), 5.16 (Protokolli omadused) õppekava tabelisse

**Moodulite README-d**  
 Lisatud õppetunnid 12 ja 13 õppetundide nimekirja  
 Lisatud praktiliste juhendite sektsioon koos leheküljepõhise lingiga  
 Lisatud õppetunnid 5.15 (Kohandatud transport) ja 5.16 (Protokolli omadused)

**study_guide.md**  
- Uuendatud mõttekaart kõigi uute teemadega: MCP Hosts seadistus, MCP Inspector, leheküljepõhise strateegiad, protokolli omadused süvaanalüüs

## 28. jaanuar 2026

### MCP Spetsifikatsiooni 2025-11-25 vastavuse ülevaade

#### Põhikontseptsioonide täiustamine (01-CoreConcepts/)
- **Uus kliendi primitiiv - Roots**: Lisatud põhjalik dokumentatsioon Roots kliendi primitiivi kohta, võimaldades serveritel mõista failisüsteemi piire ja ligipääsuõigusi
- **Tööriista annotatsioonid**: Lisatud dokumentatsioon tööriista käitumisannotatsioonide (`readOnlyHint`, `destructiveHint`) kohta paremate täitmisotsuste tegemiseks
- **Tööriista kutsumine proovitmisel (Sampling)**: Uuendatud proovitlemise dokumentatsiooni, lisades `tools` ja `toolChoice` parameetrid mudelipõhiseks tööriistade kutsumiseks proovitamise päringute ajal
- **URL režiimi esilekutsumine**: Lisatud dokumentatsioon väliste veebipõhiste seostuste esilekutsumiseks, mida server algatab
- **Ülesanded (katsefaas)**: Lisatud uus sektsioon, mis kirjeldab eksperimenteerivat Ülesannete funktsionaalsust vastupidavate täitmisümbriste ja edasilükatud tulemite toetamist
- **Ikonide tugi**: Märgitud, et tööriistades, ressurssides, ressursside mallides ja promptides saab nüüd kasutada ikoone lisametadata osana

#### Dokumentatsiooni uuendused
- **README.md**: Lisatud MCP Spetsifikatsiooni 2025-11-25 versiooni viide ja kuupõhine versioonihaldus
- **study_guide.md**: Uuendatud õppekava kaart sisaldamaks Ülesandeid ja Tööriista annotatsioone Põhikontseptsioonide sektsioonis; uuendatud dokumendi ajatempel

#### Spetsifikatsiooni vastavuse kontroll
- **Protokolli versioon**: Kinnitatud, et kogu dokumentatsioon viitab MCP Spetsifikatsioonile 2025-11-25
- **Arhitektuuri kooskõla**: Kinnitatud kahekihilise arhitektuuri (Andmekiht + Transpordikiht) dokumentatsiooni täpsus
- **Primitiivide dokumentatsioon**: Kinnitatud, et serveri primitiivid (Resources, Prompts, Tools) ja kliendi primitiivid (Sampling, Elicitation, Logging, Roots) on dokumenteeritud
- **Transpordimehhanismid**: Kinnitatud STDIO ja voogedastatava HTTP transpordi dokumentatsiooni täpsus
- **Turvalisuse juhised**: Kinnitatud kooskõla praeguste MCP turvalisuse parimate tavade dokumentatsiooniga

#### Peamised MCP 2025-11-25 funktsioonid dokumenteeritud
- **OpenID Connect avastamine**: Autentimisteenuse avastus läbi OIDC
- **OAuth kliendi ID metadokumendid**: Soovitatud kliendi registreerimise mehhanism
- **JSON Schema 2020-12**: MCP skeemide vaikediaktil
- **SDK kihistamise süsteem**: Formaliseeritud SDK funktsioonide toe ja hoolduse nõuded
- **Valitsemise struktuur**: Formaliseeritud töörühmad ja huvirühmad MCP valitsemises

### Turvalisuse dokumentatsiooni suur uuendus (02-Security/)

#### MCP Security Summit Workshop (Sherpa) integreerimine
- **Uus praktiline koolitusressurss**: Lisatud põhjalik integratsioon [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) kogu turvalisuse dokumentatsiooni ulatuses
- **Ekspeditsiooniraja katvus**: Dokumenteeritud kogu laagrist laagrini edenemise rada Baaslaagrist Tipp-laagrini
- **OWASP kooskõla**: Kõik turvajuhtnöörid nüüd kaardistatud OWASP MCP Azure Security Guide riskidele

#### OWASP MCP Top 10 integreerimine
- **Uus sektsioon**: Lisatud OWASP MCP Top 10 turvariskide tabel koos Azure leevendustega peamisse turvalisuse README-sse
- **Riskipõhine dokumentatsioon**: Uuendatud mcp-security-controls-2025.md, lisades OWASP MCP riskiviited iga turvalisuse domeeni kohta
- **Viited arhitektuurile**: Lingid OWASP MCP Azure Security Guide'i viitava arhitektuuri ja rakendusmustritele

#### Uuendatud turvalisuse failid
- **README.md**: Lisatud Sherpa töötuba ülevaade, ekspeditsiooniraja tabel, OWASP MCP Top 10 riskide kokkuvõte ja praktilise koolituse sektsioon
- **mcp-security-controls-2025.md**: Uuendatud päis veebruar 2026, lisatud OWASP riskiviited (MCP01-MCP08), parandatud versioonikonfliktid
- **mcp-security-best-practices-2025.md**: Lisatud Sherpa ja OWASP ressurssid sektsioon, uuendatud ajatempel
- **mcp-best-practices.md**: Lisatud praktilise koolituse sektsioon Sherpa ja OWASP linkidega
- **azure-content-safety-implementation.md**: Lisatud OWASP MCP06 viide, Sherpa Camp 3 kooskõla ja täiendav ressursside sektsioon

#### Lisatud uued ressursside lingid
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuaalsed OWASP MCP riskilehed (MCP01-MCP10)

### Õppekava MCP Spetsifikatsiooni 2025-11-25 kooskõla

#### Moodul 03 - Algus
- **SDK dokumentatsioon**: Lisatud Go SDK ametlikku SDK loendisse; uuendatud kõik SDK viited MCP Spetsifikatsioonile 2025-11-25 vastavaks
- **Transpordi täpsustused**: Uuendatud STDIO ja HTTP Streaming transpordi kirjeldused koos selgete spetsifikatsiooni viidetega

#### Moodul 04 - Praktiline rakendamine
- **SDK uuendused**: Lisatud Go SDK; uuendatud SDK loend viitega spetsifikatsiooni versioonile
- **Autoriseerimise spetsifikatsioon**: Uuendatud MCP autoriseerimise spetsifikatsiooni link praegusele 2025-11-25 versioonile

#### Moodul 05 - Täiustatud teemad
- **Uued funktsioonid**: Lisatud märkus MCP Spetsifikatsiooni 2025-11-25 uutest funktsioonidest (Ülesanded, Tööriista annotatsioonid, URL režiimi esilekutsumine, Roots)
- **Turbekresources**: Lisatud OWASP MCP Top 10 ja Sherpa töötuba täiendavate viidetena

#### Moodul 06 - Kogukonna panused
- **SDK nimekiri**: Lisatud Swift ja Rust SDKd; uuendatud viide spetsifikatsioonile 2025-11-25
- **Spetsifikatsiooni viide**: Uuendatud MCP Spetsifikatsiooni link otsepöördumiseks

#### Moodul 07 - Varajase kasutuse õppetunnid
- **Resursside uuendused**: Lisatud MCP spetsifikatsiooni 2025-11-25 link ja OWASP MCP Top 10 täiendavate ressursside hulka

#### Moodul 08 - Parimad tavad
- **Spetsifikatsiooni versioon**: Uuendatud MCP spetsifikatsiooni viide versioonile 2025-11-25
- **Turberessursid**: Lisatud OWASP MCP Top 10 ja Sherpa töötuba täiendavate viidetena

#### Moodul 10 - AI töövoogude sujuvamaks muutmine
- **Märgi uuendus**: Muudetud MCP versiooni märk SDK versioonilt (1.9.3) spetsifikatsiooni versioonile (2025-11-25)
- **Resursside lingid**: Uuendatud MCP spetsifikatsiooni link; lisatud OWASP MCP Top 10

#### Moodul 11 - MCP serveri praktilised laborid
- **Spetsifikatsiooni viide**: Uuendatud MCP spetsifikatsiooni link versioonile 2025-11-25
- **Turberessursid**: Lisatud OWASP MCP Top 10 ametlike ressurssidena

## 18. detsember 2025

### Turbedokumentatsiooni uuendus - MCP spetsifikatsioon 2025-11-25

#### MCP turbe parimad tavad (02-Security/mcp-best-practices.md) - spetsifikatsiooni versiooni uuendus
- **Protokolli versiooni uuendus**: Uuendatud viide uusimale MCP spetsifikatsioonile 2025-11-25 (välja antud 25. november 2025)
  - Uuendatud kõik spetsifikatsiooni versiooni viited versioonilt 2025-06-18 versioonile 2025-11-25
  - Uuendatud dokumendi kuupäeva viited 18. augustilt 2025 18. detsembrile 2025
  - Kontrollitud, et kõik spetsifikatsiooni URL-id viitaksid kehtivale dokumentatsioonile
- **Sisu valideerimine**: Turbe parimate tavade põhjalik valideerimine vastavalt uusimatele standarditele
  - **Microsofti turbelahendused**: Kontrollitud keelekasutust ja linke Prompt Shieldsi (varem "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID ja Azure Key Vaulti kohta
  - **OAuth 2.1 turve**: Kinnitatud vastavus uusimatele OAuth turbe parimatele tavadele
  - **OWASP standardid**: Kontrollitud, et LLM-ide jaoks mõeldud OWASP Top 10 viited on ajakohased
  - **Azure teenused**: Kinnitatud kõik Microsoft Azure dokumentatsiooni lingid ja parimad tavad
- **Standardite järgimine**: Kinnitatud kõik viidatud turbestandardid on ajakohased
  - NIST AI riskijuhtimise raamistik
  - ISO 27001:2022
  - OAuth 2.1 turbe parimad tavad
  - Azure turbe- ja vastavuse raamistikud
- **Rakendusressursid**: Kontrollitud kõik rakendamisjuhised ja ressursid
  - Azure API Managementi autentimismustrid
  - Microsoft Entra ID integratsioonijuhendid
  - Azure Key Vaulti saladuste haldus
  - DevSecOps torujuhtmed ja jälgimislahendused

### Dokumentatsiooni kvaliteedi tagamine
- **Spetsifikatsioonile vastavus**: Kinnitatud, et kõik kohustuslikud MCP turbenõuded (MUST/MUST NOT) vastavad uusimale spetsifikatsioonile
- **Resursside ajakohasus**: Kontrollitud kõiki väliseid linke Microsofti dokumentatsiooni, turbestandardite ja rakendusjuhendite poolel
- **Parimate tavade kogu**: Kinnitatud autentimise, autoriseerimise, AI-spetsiifiliste ohtude, tarneahela turbe ja ettevõtte musterite terviklik käsitlus

## 6. oktoober 2025

### Alustamise sektsiooni laiendus – Täiustatud serveri kasutamine ja lihtne autentimine

#### Täiustatud serveri kasutamine (03-GettingStarted/10-advanced)
- **Uus peatükk lisatud**: Esitatud põhjalik juhend täiustatud MCP serveri kasutamiseks, hõlmates nii tavapärast kui madala taseme serveriarhitektuuri.
  - **Tavaline vs madala taseme server**: Detailne võrdlus ja koodinäited Pythonis ja TypeScriptis mõlema lähenemise jaoks.
  - **Handler-põhine disain**: Selgitus tööriistade/resursside/käskude haldamiseks handleri kaudu, mis võimaldab skaleeritavaid ja paindlikke serverilaiendusi.
  - **Praktilised mustrid**: Reaalmaailma stsenaariumid, kus madala taseme serverimustrid toetavad täiustatud funktsioone ja arhitektuuri.

#### Lihtne autentimine (03-GettingStarted/11-simple-auth)
- **Uus peatükk lisatud**: Samm-sammuline juhend lihtsa autentimise rakendamiseks MCP serverites.
  - **Autentimise kontseptsioonid**: Selge eristamine autentimise ja autoriseerimise vahel ning mandaatide haldus.
  - **Põhja-autentimise rakendus**: Middleware-põhised autentimismustrid Pythonis (Starlette) ja TypeScriptis (Express), koos koodinäidetega.
  - **Edasi liikumine täiendatud turbele**: Soovitused järgmisteks sammudeks lihtsast autendist OAuth 2.1 ja RBAC suunas, viited täiendatud turbemoodulitele.

Need lisad pakuvad praktilist, käed-külge juhendit tugevamate, turvalisemate ja paindlikumate MCP serverite loomisel, ühendades aluskontseptsioonid täiendatud tootmismustritega.

## 29. september 2025

### MCP serveri andmebaasi integratsiooni laborisessioonid – põhjalik praktiline õppeprogramm

#### 11-MCPServerHandsOnLabs - uus täielik andmebaasi integratsiooni õppekava
- **Täielik 13-labori õppeprogramm**: Lisatud põhjalik käed-külge kursus tootmisküpse MCP serveri loomiseks PostgreSQL andmebaasi integratsiooniga
  - **Reaalmaailma rakendus**: Zava Retail andmeanalüüsi juhtum, näidates ettevõtte taseme mustreid
  - **Struktureeritud õppe edenemine**:
    - **Laborid 00-03: Alused** - Sissejuhatus, põhitarhitektuur, turvalisus ja mitmekordne rentimine, keskkonna seadistamine
    - **Laborid 04-06: MCP serveri ehitamine** - Andmebaasi disain ja skeem, MCP serveri rakendus, tööriistade arendus  
    - **Laborid 07-09: Täiustatud funktsioonid** - Semeantilise otsingu integratsioon, testimine ja silumine, VS Code integratsioon
    - **Laborid 10-12: Tootmine ja parimad tavad** - Raketistrateegiad, jälgimine ja vaadeldavus, parimad tavad ja optimeerimine
  - **Ettevõtte tehnoloogiad**: FastMCP raamistik, PostgreSQL koos pgvectoriga, Azure OpenAI vektorembeddingud, Azure Container Apps, Application Insights
  - **Täiustatud funktsioonid**: Rea taseme turve (RLS), semantilised otsingud, mitmetenantide andmejuurdepääs, vektori embeddingud, reaalajas jälgimine

#### Terminoloogia standardiseerimine - moodulist laboriks üleminek
- **Põhjalik dokumentatsiooni uuendus**: Süsteemne kõikide 11-MCPServerHandsOnLabs README-failide uuendamine, kasutades "Labor" terminoloogiat "Mooduli" asemel
  - **Sektsioonide päised**: Muudetud "Mida see moodul hõlmab" vormingust "Mida see labor hõlmab" kõigis 13 laboris
  - **Sisu kirjeldus**: Muudetud "See moodul pakub..." vormist "See labor pakub..." kogu dokumentatsioonis
  - **Õpieesmärgid**: Uuendatud "Selle mooduli lõpuks..." vormist "Selle labori lõpuks..."
  - **Navigeerimislingid**: Kõik "Moodul XX:" viited muudetud "Labor XX:" viideteks ristviidetes ja navigatsioonis
  - **Lõpetamise jälgimine**: Uuendatud "Pärast selle mooduli lõpetamist..." vormist "Pärast selle labori lõpetamist..."
  - **Tehniliste viidete säilitamine**: Hoiti alles Python mooduli viited konfiguratsioonifailides (näiteks `"module": "mcp_server.main"`)

#### Õppejuhendi täiustamine (study_guide.md)
- **Visuaalne õppekava kaart**: Lisatud uus "11. Andmebaasi integratsiooni laborid" sektsioon koos põhjaliku laboristruktuuri visualiseerimisega
- **Hoone struktuuri uuendus**: Laiendatud kümnest üheteist sektsioonini, lisatud detailne 11-MCPServerHandsOnLabs kirjeldus
- **Õpperaja juhised**: Täiustatud navigeerimisjuhised katmaks sektsioone 00-11
- **Tehnoloogia kajastus**: Lisatud FastMCP, PostgreSQL ja Azure teenuste integratsiooni üksikasjad
- **Õpitulemused**: Rõhutatud tootmisküpsete serverite arendamist, andmebaasi integratsiooni mustreid ja ettevõtte turvalisust

#### Põhidokument README struktuuri täiendus
- **Laboripõhine terminoloogia**: Uuendatud 11-MCPServerHandsOnLabs peamist README.md-d järjepidevalt kasutama "Labori" struktuuri
- **Õpperaja korraldus**: Selge edenemine alustaladest läbi täiustatud rakendamiseni ning tootmiskavani
- **Reaalmaailma fookus**: Rõhk praktilisel, käed-külge õppel koos ettevõtte taseme mustrite ja tehnoloogiatega

### Dokumentatsiooni kvaliteedi ja järjekindluse parandused
- **Praktilise õppe rõhutamine**: Tugevdatud praktiline, laboripõhine lähenemine kogu dokumentatsioonis
- **Ettevõtte mustrite rõhutamine**: Esile tõstetud tootmisküpsed lahendused ning ettevõtte turvalisuse kaalutlused
- **Tehnoloogiate integreerimine**: Põhjalik kaetus kaasaegsetest Azure teenustest ja AI integratsioonimustritest
- **Õppe edenemine**: Selge ning struktureeritud tee aluspõhimõtetest tootmisseadistamiseni

## 26. september 2025

### Juhtumiuuringute täiendus - GitHub MCP registri integratsioon

#### Juhtumiuuringud (09-CaseStudy/) - Ökosüsteemi arendamise fookus
- **README.md**: Oluline laiendus põhjaliku GitHub MCP registri juhtumiuuringuga
  - **GitHub MCP registri juhtumiuuring**: Uus põhjalik juhtumiuuring, mis analüüsib GitHub MCP registri käivitust 2025. aasta septembris
    - **Probleemi analüüs**: Üksikasjalik pilk killustatud MCP serveri avastamise ja juurutamise probleemidele
    - **Lahenduse arhitektuur**: GitHubi tsentraliseeritud registri lähenemine ühe klikiga VS Code installeerimiseks
    - **Äriline mõju**: Mõõdetavad parandused arendajate sisseelamisel ja tootlikkuses
    - **Strateegiline väärtus**: Moduulsete agendide juurutamise ja tööriistadevahelise ühilduvuse rõhutamine
    - **Ökosüsteemi areng**: Positsioneerimine agentuurse integratsiooni alusplatvormina
  - **Täiustatud juhtumiuuringute struktuur**: Uuendatud kõik seitse juhtumiuuringut järjepideva vormingu ja põhjalike kirjeldustega
    - Azure AI reisibürood: Mitme agendi orkestreerimise rõhuasetus
    - Azure DevOps integratsioon: Töövoogude automatiseerimise fookus
    - Reaalajas dokumentide päring: Python konsoolikliendi rakendus
    - Interaktiivne õppekava generaator: Chainlit vestlusveebirakendus
    - Redaktori sees dokumentatsioon: VS Code ja GitHub Copiloti integratsioon
    - Azure API Management: Ettevõtte API integratsiooni mustrid
    - GitHub MCP registri: Ökosüsteemi areng ja kogukonna platvorm
  - **Ülevaatlik kokkuvõte**: Ümber kirjutatud kokkuvõtte lõik, esile tuues seitse juhtumiuuringut, mis hõlmavad mitut MCP rakenduse dimensiooni
    - Ettevõtte integratsioon, mitme agendi orkestreerimine, arendaja tootlikkus
    - Ökosüsteemi areng, hariduslikud rakendused jaotamine
    - Täiustatud ülevaated arhitektuurimustritest, rakendusstrateegiatest ja parimatest tavadest
    - Rõhk MCP-süsteemi küpsusele ja tootmiskõlblikkusele

#### Õppejuhendi uuendused (study_guide.md)
- **Visuaalne õppekava kaart**: Uuendatud mõttekart koos GitHub MCP registri lisamisega juhtumiuuringute sektsiooni
- **Juhtumiuuringute kirjeldus**: Parandatud üldisest kirjeldusest detailseks seitsme juhtumiuuringu jaotuseks
- **Hoone struktuur**: Uuendatud sektsioon 10 kattmaks põhjalikku juhtumiuuringute sisu ning spetsiifilisi rakendusdetailid
- **Muudatuste logi integreerimine**: Lisatud 26. septembri 2025 kirje, mis dokumenteerib GitHub MCP registri lisamise ja juhtumiuuringute täiendused
- **Kuupäevade uuendamine**: Uuendatud jaluse ajatemplit viimase muudatuse (26. september 2025) kajastamiseks

### Dokumentatsiooni kvaliteedi täiustused
- **Järjepidevuse tõstmine**: Standardiseeritud juhtumiuuringute vorming ja struktuur kõikides seitsmes näites
- **Põhjalik katvus**: Juhtumiuuringud hõlmavad ettevõtet, arendajatootlikkust ja ökosüsteemi arendamist
- **Strateegiline positsioneerimine**: Täiustatud rõhk MCP-ile kui agendipõhise süsteemi juurutamise alusplatvormile
- **Ressursside integratsioon**: Ajakohastatud täiendavate ressursside hulka lisatud GitHub MCP registri link

## 15. september 2025

### Täiustatud teemade laiendus - kohandatud transpordimehhanismid ja konteksti inseneriteadus

#### MCP kohandatud transpordid (05-AdvancedTopics/mcp-transport/) - uus täiustatud rakendusjuhend
- **README.md**: Täielik juhend kohandatud MCP transpordimehhanismide rakendamiseks
  - **Azure Event Grid transport**: Põhjalik serverita sündmuspõhise transpordi rakendus
    - Näited C#, TypeScript ja Python keeltes koos Azure Functions integratsiooniga
    - Sündmuspõhise arhitektuuri mustrid skaleeritavate MCP lahenduste jaoks
    - Webhookide vastuvõtjad ja push-põhise sõnumihalduse käsitlus
  - **Azure Event Hubs transport**: Suure läbilaskevõimega voogedastuse transport
    - Madala latentsusega reaalajas voogedastuse võimalused
    - Partitsioneerimise strateegiad ja kontrollpunktide haldus
    - Sõnumite pakettimine ja jõudluse optimeerimine
  - **Ettevõtte integratsioonimustrid**: Tootmiskõlblikud arhitektuuri näited
    - Hajutatud MCP töötlemine mitme Azure Functioni vahel
    - Hübriidtranspordi arhitektuurid, kombineerides mitut transporditüüpi
    - Sõnumite vastupidavus, usaldusväärsus ja veakäsitluse strateegiad
  - **Turve ja jälgimine**: Azure Key Vault integratsioon ja jälgimismustrid
    - Juhtimatu identiteedi autentimine ja minimaalsete õiguste ligipääs
    - Application Insights telemeetria ja jõudlusmonitooring
    - Katkestusringid ja taluvusmustrid
  - **Testimisraamistikud**: Põhjalikud testistrateegiad kohandatud transporditehnoloogiatele
    - Ühiktestimine testtopside ja imitatsiooniraamistikega
    - Integratsioonitestid Azure Test Containersi kasutades
    - Jõudlus- ja koormustestimise kaalutlused

#### Konteksti inseneriteadus (05-AdvancedTopics/mcp-contextengineering/) - kerkiv AI distsipliin
- **README.md**: Põhjalik ülevaade konteksti inseneriteaduse kui kerkiva valdkonna uurimisest
  - **Põhiprintsiibid**: Täielik konteksti jagamine, tegevuste otsustamisvõime ja kontekstiakna haldus
  - **MCP protokolli vastavus**: Kuidas MCP disain lahendab konteksti inseneri väljakutsed
    - Kontekstiakna piirangud ja progressiivse laadimise strateegiad
    - Olulisuse määramine ja dünaamiline konteksti hankimine
    - Mitmemodaalne konteksti käsitlemine ja turvalisuse kaalutlused
  - **Rakenduslähenemised**: Ühe- vs mitmeagendilised arhitektuurid
    - Konteksti tükkideks jagamine ja prioriseerimistehnikad
    - Progressiivne konteksti laadimine ja kokkusurumise strateegiad
    - Kihilised konteksti lähenemised ja hankimise optimeerimine
  - **Mõõtmise raamistik**: Kerkivad meetrikad konteksti tõhususe hindamiseks
    - Sisendi efektiivsus, jõudlus, kvaliteet ja kasutajakogemuse kaalutlused
    - Eksperimentaalsed lähenemised konteksti optimeerimiseks
    - Ebaõnnestumiste analüüs ja täiustuse metsodoloogia

#### Õppekava navigeerimise uuendused (README.md)
- **Täiendatud moodulistruktuur**: Uuendatud õppekava tabel, lisades uued täiustatud teemad
  - Lisatud Konteksti inseneriteadus (5.14) ja Kohandatud transport (5.15) kirjeldused
  - Ühtlane vormistus ja navigeerimislingid kõigis moodulites
  - Uuendatud kirjeldused, et kajastada praegust sisukjustust

### Kaustastruktuuri täiustused
- **Nime standardiseerimine**: Muudetud "mcp transport" nimeks "mcp-transport" ühtlustamaks teiste täiustatud teema kaustadega
- **Sisu korraldus**: Kõik 05-AdvancedTopics kaustad järgivad nüüd ühtset nimetuskorda (mcp-[teema])

### Dokumentatsiooni kvaliteedi parandused
- **MCP spetsifikatsiooni kaasajastamine**: Kõik uued sisud viitavad kehtivale MCP spetsifikatsioonile 2025-06-18
- **Mitmekeelsete näidete kaasamine**: Põhjalikud koodinäited C#, TypeScripti ja Pythoni keeltes
- **Ettevõtte keskendumine**: Tootmiseks valmis mustrid ja Azure pilve integratsioon kogu ulatuses
- **Visuaalne dokumentatsioon**: Mermaid diagrammid arhitektuuri ja voogude visualiseerimiseks

## 18. august 2025

### Dokumentatsiooni põhjalik uuendus - MCP 2025-06-18 standardid

#### MCP turbe head tavad (02-Security/) - täielik moderniseerimine
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: täielik ümberkirjutus vastavalt MCP spetsifikatsioonile 2025-06-18
  - **Kohustuslikud nõuded**: lisatud selged PEAB/PEAB MITTE nõuded ametlikust spetsifikatsioonist koos visuaalsete indikaatoritega
  - **12 põhiturbepraktilist valdkonda**: 15-punktilisest loetelust ümberkorraldatud terviklikeks turbevaldkondadeks
    - Tokeni turve ja autentimine välise identiteedipakkuja integratsiooniga
    - Sessioonihaldus ja transpordi turve krüptograafiliste nõuetega
    - AI-spetsiifiline ohutõrje Microsoft Prompt Shieldsi integratsiooniga
    - Juurdepääsukontroll ja õigused põhimõttega minimaalne privileeg
    - Sisuturve ja jälgimine Azure Content Safety integratsiooniga
    - Tarneahela turve põhjaliku komponendi kontrolliga
    - OAuth turve ja Confused Deputy ennetus PKCE rakendusega
    - Sündmuste reageerimine ja taastevõime automaatsete võimalustega
    - Vastavus ja haldus regulatiivsete nõuetega kooskõlas
    - Täiustatud turbekontrollid null usaldusel põhineva arhitektuuriga
    - Microsofti turbeökosüsteemi integratsioon terviklahendustega
    - Jätkuv turbe areng kohanduvate praktikatega
  - **Microsofti turbelahendused**: parandatud juhised Prompt Shieldsi, Azure Content Safety, Entra ID ja GitHub Advanced Security integratsiooniks
  - **Rakendusressursid**: ressursilingid kategooriatesse ametlik MCP dokumentatsioon, Microsofti turbelahendused, turbestandardid ja rakendamisjuhendid

#### Täiustatud turbekontrollid (02-Security/) - ettevõtte rakendus
- **MCP-SECURITY-CONTROLS-2025.md**: täielik ümberkorraldus ettevõtte taseme turbepõhise raamistiku jaoks
  - **9 terviklikku turbevaldkonda**: laiendatud põhilistest kontrollidest detailse ettevõtte raamistiku juurde
    - Täiustatud autentimine ja autoriseerimine Microsoft Entra ID integratsiooniga
    - Tokeni turve ja Anti-Passthrough kontrollid põhjaliku valideerimisega
    - Sessiooniturbe kontrollid ülevõtmise ennetamiseks
    - AI-spetsiifilised turbekontrollid promptide süstimise ja tööriistamürgituse ennetamiseks
    - Confused Deputy rünnaku ennetus OAuth proxy turvega
    - Tööriistade käitusohutus kastistamise ja isoleerimisega
    - Tarneahela turbekontrollid sõltuvuste valideerimisega
    - Jälgimise ja tuvastamise kontrollid SIEM integratsiooniga
    - Sündmuste reageerimine ja taastevõime automaatsete võimalustega
  - **Rakenduse näited**: lisatud üksikasjalikud YAML konfiguratsiooniplokid ja koodinäited
  - **Microsofti lahenduste integratsioon**: Azure turvateenuste, GitHub Advanced Security ja ettevõtte identiteedihalduse põhjalik kajastus

#### Täiustatud teemade turve (05-AdvancedTopics/mcp-security/) - tootmiseks valmis rakendus
- **README.md**: täielik ümberkirjutus ettevõtte turbe rakendamiseks
  - **Käesoleva spetsifikatsiooniga kooskõlas**: uuendatud vastavaks MCP spetsifikatsioonile 2025-06-18 koos kohustuslike turbenõuetega
  - **Täiustatud autentimine**: Microsoft Entra ID integratsioon koos põhjalike .NET ja Java Spring Security näidetega
  - **AI turbe integratsioon**: Microsoft Prompt Shieldsi ja Azure Content Safety rakendamine üksikasjalike Python näidetega
  - **Täiustatud ohutõrje**: põhjalikud rakendamise näited
    - Confused Deputy rünnaku ennetamine PKCE ja kasutaja nõusoleku valideerimisega
    - Tokeni passthrough ennetamine auditooriumi valideerimise ja turvalise tokenihaldusega
    - Sessiooni ülevõtmise ennetamine krüptograafilise sidumise ja käitumusliku analüüsiga
  - **Ettevõtte turbe integratsioon**: Azure Application Insightsi jälgimine, ohutuvastuse torud ja tarneahela turve
  - **Rakendamise kontrollnimekiri**: selged kohustuslikud vs soovituslikud turbekontrollid koos Microsofti turbeökosüsteemi eelistega

### Dokumentatsiooni kvaliteedi ja standardite kooskõla
- **Spetsifikatsiooni viited**: uuendatud kõik viited MCP spetsifikatsioonile 2025-06-18
- **Microsofti turbeökosüsteem**: ühendamise juhendite täiustamine kogu turbedokumentatsioonis
- **Praktiline rakendus**: lisatud detailsemad koodinäited .NET, Java ja Python keeltes ettevõtte mustritega
- **Ressursside organiseerimine**: ametliku dokumentatsiooni, turbestandardite ja rakendamisjuhendite põhjalik kategooriatesse jagamine
- **Visuaalsed indikaatorid**: selge eristus kohustuslike nõuete ja soovitatud praktikate vahel


#### Põhikontseptsioonid (01-CoreConcepts/) - täielik moderniseerimine
- **Protokolli versiooni uuendus**: uuendatud viited MCP spetsifikatsioonile 2025-06-18 kuupõhise versiooniga (AAAA-KK-PP formaat)
- **Arhitektuuri täiendamine**: täiustatud Hosts-, Client- ja Server-komponentide kirjeldused vastavalt praegustele MCP arhitektuuri mustritele
  - Hostid määratletud selgelt kui AI rakendused mitme MCP kliendi ühenduse koordineerimiseks
  - Kliendid kirjeldatud kui protokolli lisad, hoides ühesuunalist kliendi-server suhteid
  - Serverid täiustatud lokaalse ja kaugdeploeerimise stsenaariumite toetamiseks
- **Primitiivide ümberkorraldamine**: serveri ja kliendi primitiivide täielik ülevaatamine
  - Serveri primitiivid: ressursid (andmeallikad), promptid (mallid), tööriistad (käideldavad funktsioonid) koos detailsete selgituste ja näidetega
  - Kliendi primitiivid: proovivõtt (LLM täitmised), väljatõmbamine (kasutaja sisend), logimine (silumine/jälgimine)
  - Uuendatud praegustele avastamise (`*/list`), päringu (`*/get`), ja täitmismeetodite (`*/call`) mustritele
- **Protokolli arhitektuur**: sisse toodud kahekihiline arhitektuuri mudel
  - Andmekiht: JSON-RPC 2.0 alus koos elutsükli halduse ja primitiividega
  - Transpordikiht: STDIO (kohalik) ja voogedastatavad HTTP koos SSE (kaug) transpordimehhanismidega
- **Turbe raamistik**: terviklikud turbeprintsiibid, sealhulgas eksplitsiitne kasutaja nõusolek, andmekaitse, tööriistade käitamise ohutus ja transpordikihi turve
- **Kommunikatsioonimustrid**: uuendatud protokolli sõnumid näitavad initsialiseerimise, avastamise, täitmise ja teavituste voogusid
- **Koodinäited**: värskendatud mitme keele näited (.NET, Java, Python, JavaScript) vastavalt praegustele MCP SDK mustritele

#### Turbe osa (02-Security/) - põhjalik turbe ümberkujundus  
- **Standardite kooskõla**: täielik vastavus MCP spetsifikatsiooni 2025-06-18 turbenõuetele
- **Autentimise areng**: dokumenteeritud areng kohandatud OAuth serveritest välise identiteedipakkuja volitamiseni (Microsoft Entra ID)
- **AI-spetsiifiline ohuanalüüs**: täiustatud kaan HSdeclined AI rünnakute vektorite mõistmine
  - üksikasjalikud promptide süstimise rünnaku stsenaariumid reaalse maailma näidetega
  - tööriistamürgituse mehhanismid ja "rug pull" ründe mustrid
  - kontekstiakna mürgitamine ja mudelite segaduse rünnakud
- **Microsofti AI turbelahendused**: Microsofti turbeökosüsteemi laialdane ülevaade
  - AI Prompt Shieldsid täiustatud tuvastuse, tähelepanu juhtimise ja delimitritehnikatega
  - Azure Content Safety integratsiooni mustrid
  - GitHub Advanced Security tarneahela kaitseks
- **Täiustatud ohutõrje**: detailne turbekontroll sessioonikaaperdamise ja MCP-spetsiifiliste rünnakute kohta
  - sessioonide kaaperdamine koos krüptograafiliste sessiooni-ID nõuetega
  - Confused deputy probleemid MCP proxy stsenaariumites koos selgete nõusoleku mehhanismidega
  - tokeni passthrough haavatavus koos kohustuslike valideerimiskontrollidega
- **Tarneahela turve**: laiendatud AI tarneahela kajastus, kaasates baasmodelle, embedinguteenuseid, kontekstipakkujaid ja kolmanda osapoole APIsid
- **Põhiturve**: täiustatud integratsioon ettevõtte turbemustritega, sealhulgas null usalduse arhitektuur ja Microsofti turbeökosüsteem
- **Ressursside organiseerimine**: põhjalikult kategoriseeritud ressursilingid tüübi kaupa (ametlikud dokumendid, standardid, uurimistöö, Microsofti lahendused, rakendamisjuhendid)

### Dokumentatsiooni kvaliteedi täiustused
- **Struktureeritud õppimise eesmärgid**: täiustatud õpieesmärgid spetsiifiliste ja rakendatavate tulemuste saavutamiseks
- **Ristviited**: lisatud lingid seotud turbe- ja põhikontseptsioonide teemade vahel
- **Ajakohane info**: uuendatud kõik kuupäeva viited ja spetsifikatsiooni lingid vastavalt kehtivatele standarditele
- **Rakendamise juhendid**: lisatud spetsiifilised, toepõhised rakendamissuunised mõlemas osas

## 16. juuli 2025

### README ja navigeerimise täiustused
- Täielikult ümber kujundatud õppekavade navigeerimine README.md-s
- Asendatud `<details>` sildid paremini ligipääsetava tabelipõhise vorminguga
- Loodud alternatiivsed paigutused uude kausta "alternative_layouts"
- Lisatud kaardipõhised, vahelehtedega ja akordeonilaadsed navigeerimise näited
- Uuendatud hoidla struktuuri sektsioon kõigi viimaste failidega
- Täiustatud "Kuidas seda õppekava kasutada" osa selgete soovitustega
- Uuendatud MCP spetsifikatsioonilingid õigele URL-ile
- Lisatud konteksti inseneri osa (5.14) õppekava struktuuri

### Õppematerjali uuendused
- Täielikult üle vaadatud õppematerjalide struktuur vastavalt praegusele hoidla ülesehitusele
- Lisatud uued sektsioonid MCP klientidest ja tööriistadest ning populaarsetest MCP serveritest
- Uuendatud visuaalne õppekava kaart kõigi teemade täpseks kajastamiseks
- Täiustatud täiendavate teemade kirjeldused kõigi spetsialiseerunud valdkondade jaoks
- Uuendatud juhtumiuuringute sektsioon tegelike näidetega
- Lisatud see põhjalik muudatustelog

### Kogukonna panused (06-CommunityContributions/)
- Lisatud detailne info MCP serverite kohta pildigeneratsiooni jaoks
- Lisatud põhjalik sektsioon Claude kasutamisest VSCode's
- Lisatud Cline terminalikliendi seadistuse ja kasutamise juhised
- Uuendatud MCP kliendiosakond kõigi populaarsete klientide valikutega
- Täiustatud panusenäited täpsemate koodinäidetega

### Täiustatud teemad (05-AdvancedTopics/)
- Kõik spetsialiseerunud teema kaustad organiseeritud järjepideva nimetamisega
- Lisatud konteksti insenerimise materjalid ja näited
- Lisatud Foundry agendi integratsiooni dokumentatsioon
- Täiustatud Entra ID turbe integratsiooni dokumentatsioon

## 11. juuni 2025

### Esialgne loomine
- Välja antud MCP algajate õppekava esimene versioon
- Loodud põhiline struktuur kõigi 10 põhiosakonna jaoks
- Rakendatud visuaalne õppekava kaart navigeerimiseks
- Lisatud esialgsed näidiskursused mitmes programmeerimiskeeles

### Alustamine (03-GettingStarted/)
- Loodud esimesed serveri rakendamise näited
- Lisatud kliendi arenduse juhised
- Kaasatud LLM kliendi integreerimise juhised
- Lisatud VS Code integratsiooni dokumentatsioon
- Rakendatud serveri poolt saadetavate sündmuste (SSE) serveri näited

### Põhikontseptsioonid (01-CoreConcepts/)
- Lisatud detailne kliendi-serveri arhitektuuri selgitus
- Loodud dokumentatsioon põhielementide kohta protokollis
- Dokumenteeritud sõnumivahetuse mustrid MCP-s

## 23. mai 2025

### Hoidla struktuur
- Initsialiseeritud hoidla põhilise kaustastruktuuriga
- Loodud README failid iga suure sektsiooni jaoks
- Paigaldatud tõlke infrastruktuur
- Lisatud pildifailid ja diagrammid

### Dokumentatsioon
- Loodud esialgne README.md koos õppekava ülevaatega
- Lisatud CODE_OF_CONDUCT.md ja SECURITY.md
- Paigaldatud SUPPORT.md koos abi saamise juhistega
- Loodud esialgne õppematerjali struktuur

## 15. aprill 2025

### Plaanime ja raamistik
- MCP algajate õppekava esialgne planeerimine
- Määratletud õpieesmärgid ja sihtrühm
- Kiriutatud 10-osaline õppekava struktuur
- Töötatud välja kontseptuaalne raamistik näidete ja juhtumiuuringute jaoks
- Loodud esialgsed prototüübi näited põhikontseptsioonidele

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->