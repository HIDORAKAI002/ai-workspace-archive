# Mabadiliko ya Kumbukumbu: MCP kwa Mtaala wa Waanzilishi

Hati hii hutumika kama kumbukumbu ya mabadiliko yote muhimu yaliyofanywa kwenye mtaala wa Model Context Protocol (MCP) kwa Waanzilishi. Mabadiliko yameandikwa kwa mpangilio wa kurudi nyuma kwa wakati (mabadiliko mapya kwanza).

## Juni 16, 2026

### Ulinganifu wa Maelezo ya MCP & Uthibitishaji wa Sampuli

Imethibitishwa mtaala dhidi ya **MCP Specification 2025-11-25** iliyopo na SDK za hivi karibuni rasmi, kisha kurekebisha marejeo ya maelezo yaliyokuwa ya zamani na kuthibitisha sampuli kuu bado zinaweza kujengwa na kuendeshwa.

#### Marekebisho ya Toleo la Maelezo (2025-06-18 / 2025-03-26 → 2025-11-25)

Imesasisha maudhui ya Kiingereza ambapo bado yalidai marekebisho ya zamani ya spesifikesheni kama kiwango *cha sasa/cha hivi karibuni*, na kuangalia tena viungo kuelekea njia halali za maelezo za `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Imesasisha bango la "Kiwango Cha Sasa", utangulizi, kichwa cha kanuni kuu za usalama, kichwa cha mahitaji ya lazima, sehemu ya Microsoft Entra ID, viungo vya Marejeo & Rasilimali, na onyo la mwisho la usalama (marejeo 8) hadi 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Imesasisha kiungo cha rasilimali za ziada cha spesifikesheni na bango la "Kiwango Cha Sasa" hadi 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Ilibadilisha kiungo cha zamani cha `2025-03-26` cha usalama-na-uaminifu na kiungo cha ukurasa bora wa mazoea ya usalama wa 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Imesasisha kiungo rasmi cha nyaraka za sampuli hadi 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Imesasisha rejea la sasa la "maelezo ya MCP ya sasa" kwa wakati halisi na kiungo cha rasilimali za ziada hadi 2025-11-25 (maelezo ya kihistoria ya kusitishwa kwa SSE yaliyobaki kwa usahihi)

#### Uthibitishaji wa Sampuli Dhidi ya SDK za Sasa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ilitatua `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` ilipita bila makosa ya aina — APIs za `McpServer`/`StdioServerTransport` zilizopo bado ni halali
- **Python (03-GettingStarted/01-first-server/solution/python)**: Imeangaliwa katika .venv tofauti na `mcp[cli]` (1.27.2); `py_compile` ilipita na `FastMCP.list_tools()` ilirejesha vyema zana `add` na `subtract`
- Imethibitishwa kuwa viwango vyote vya toleo la sampuli `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) vinatatua kwa usafi hadi sasa `1.29.0` bila mabadiliko ya kuvunja API

#### Ulinganifu wa Mwinuko wa Tegemezi (kufunga mapengo ya toleo)

Imepandisha viungo vya SDK vilivyokuwa vya zamani ili kila sampuli ipate toleo la MCP la sasa, ikilingana na mila ya jumla ya hifadhidata:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Imeongeza `@modelcontextprotocol/sdk` kutoka `^1.8.0` → `>=1.26.0` na imesasisha maelezo ya kifurushi ya zamani `"updated for MCP 2025-06-18"` hadi `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** na **lab4/code/github_mcp_server/pyproject.toml**: Imeongeza pini sahihi `mcp==1.23.0` → `mcp>=1.26.0`; imetengeneza tena faili za `uv.lock` zote mbili (`uv lock`) ili lockfiles zitafunguka hadi sasa `mcp 1.27.2` na ziende sambamba na maelezo

#### Uchambuzi wa Mapengo ya Mtaala — Ufungaji wa Kipengele cha Spesifikesheni ya Hivi Karibuni

Imethibitisha mtaala tayari unafunika primitives zote zilizoanzishwa/kuongezwa katika MCP 2025-11-25, hivyo hakuna mapengo ya maudhui yaliyobaki:
- **Kuchora Sampuli**: Somo 03-GettingStarted/14-sampling pamoja na 05-AdvancedTopics/mcp-sampling
- **Utoaji Maelezo (pamoja na hali ya URL)**: Imedokumentiwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features
- **Mizizi**: Imedokumentiwa katika 00-Introduction, 01-CoreConcepts, na 05-AdvancedTopics/mcp-root-contexts
- **Kazi (jaribio, shughuli za muda mrefu)**: Imedokumentiwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features
- **Maelezo ya Zana** (`readOnlyHint` / `destructiveHint`): Imedokumentiwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features

### Uimarishaji wa Usalama & Urejeshaji wa Udhaifu wa Tegemezi

Iliendesha ukaguzi kamili wa usalama kwenye kila faili la maelezo ya tegemezi na msimbo wa sampuli, kisha kurekebisha taarifa zote za ushauri za npm na kengele moja ya kiwango cha msimbo. Baada ya kurekebisha, `npm audit` inaonyesha **udhaifu 0** katika kila saraka iliyoangaliwa.

#### Udhaifu wa Tegemezi wa npm (za mzunguko) — Imerekebishwa

Ilichunguza faili zote 15 za `package-lock.json` zilizoingia. Udhaifu ulikuwa kwa tegemezi za mzunguko zilizovutwa na kifaa cha MCP Inspector cha maendeleo, mteja wa OpenAI, na MCP SDK; zote sasa zimeshughulikiwa bila kuvunja sampuli:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** na **lab3/code/weather_mcp/inspector**: Imepandisha `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), ambayo iliondoa arifa za `ajv`, `brace-expansion`, `diff`, `path-to-regexp` na `ws` zilizoambatanishwa. Imekuwa entry ya `npm overrides` kulazimisha `shell-quote@1.8.4` iliyopachikwa kuondoa onyo lililosalia la hatari kubwa lililobebwa na `concurrently`; lockfiles zote mbili zilitengenezwa tena (sasa udhaifu 0)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ilisasisha `qs` (ya wastani) ya mzunguko hadi toleo lililosahihishwa
- **03-GettingStarted/samples/javascript**: `npm audit fix` ilisasisha `hono` (ya wastani) ya mzunguko hadi toleo lililosahihishwa
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ilisasisha `form-data` (ya juu) ya mzunguko hadi toleo lililosahihishwa
- **03-GettingStarted/11-simple-auth/solution/typescript**: Ilizalisha `package-lock.json` iliyokosekana ili mradi uweze kuzalika tena na kuangaliwa (udhaifu 0)

#### Rekebisho la Usalama la Kiwango cha Msimbo (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Iliondoa `shell=True` kutoka kwa zana ya `open_in_vscode`. `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` iliyopita iliruhusu tabia za shell katika njia ya folda kutafsiriwa na `cmd.exe` (njia ya sindano ya amri). Sasa inazindua `Code.exe` iliyotatuliwa moja kwa moja na folda kama hoja — hakuna shell — ambayo ni sawa kiutendaji na salama

#### Ukaguzi wa Tegemezi za Python

- Ilichunguza kila seti ya hitaji za Python kwa kutumia `pip-audit`. `05-AdvancedTopics` na `03-GettingStarted/samples/python` ziliripoti **hakuna udhaifu unaojulikana** (viwango vyao vya `mcp` / `httpx` / `pydantic` / `python-dotenv` vinatatua hadi toleo la sasa lililosahihishwa)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` ilionyesha tegemezi ya mzunguko **`werkzeug` 3.1.1** na arifa tatu za DoS za jina la kifaa cha Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, na `CVE-2026-27199` (zote zilizosahihishwa katika 3.1.6). Iliweka pini ya usalama wazi `werkzeug>=3.1.6` ili toleo lililosahihishwa lipate kutatuliwa; imethibitisha kikomo kinatatuliwa kwa usafi na mkusanyiko wa `chainlit` / `mcp` / `semantic-kernel`

### Kubadilisha Jina la Bidhaa

Imesasisha maudhui yote ya mtaala kuendana na kubadilisha jina la bidhaa za Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Imebadilisha kiungo cha jamii ya Discord
- **AGENTS.md**: Imebadilisha rejea la seva ya Discord
- **README.md**: Imebadilisha rejea za ikolojia ya teknolojia
- **study_guide.md**: Imebadilisha rejea za masomo ya kesi
- **05-AdvancedTopics/README.md**: Imesasisha kichwa na maelezo ya Moduli 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Imesasisha kichwa cha sehemu na maelezo
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Imesasisha kichwa kamili cha moduli na maudhui
- **05-AdvancedTopics/mcp-security-entra/README.md**: Imebadilisha kiungo cha marejeo ya msalaba
- **07-LessonsfromEarlyAdoption/README.md**: Imebadilisha rejea za masomo ya kesi
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Imesasisha kichwa cha Sehemu 9, beji, na uwezo
- **08-BestPractices/README.md**: Imebadilisha kiungo cha jamii ya Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Imebadilisha rejea ya kituo cha Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Imebadilisha rejea ya usambazaji wa modeli
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Imebadilisha jedwali la Huduma za AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Imebadilisha rejea za rasilimali

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension kwa VS Code
- **README.md**: Imebadilisha rejea kuu za mtaala
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Imebadilisha kichwa cha moduli, muhtasari, na vichwa vya moduli vyote
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Imebadilisha kichwa, malengo ya kujifunza, maelekezo ya usanidi, na rasilimali
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Imebadilisha kichwa, malengo ya kujifunza, jedwali la mwenyeji wa MCP, na Marejeo ya msalaba
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Imebadilisha kichwa, beji, mahitaji ya awali, na rasilimali
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Imebadilisha rejea za Mjenzi wa Wakala na kiungo cha maoni
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Imebadilisha mahitaji ya awali na rejea za ugani

---

## Aprili 11, 2026

### Somo Jipya, Marekebisho ya Nyaraka, na Sasisho za Tegemezi

#### Maudhui Mapya ya Mtaala Yameongezwa

**Moduli 05 - Mada Zinazoendelea**
- **Somo 5.17: Ufafanuzi wa Mawakala Wengi wa Kupinga kwa MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Mwongozo mpana mpya unaofunika muundo wa mzungumzo wa kupinga kwa mifumo ya mawakala wengi
  - Mchoro wa usanifu wa Mermaid: mawakala wawili → seva ya MCP ya pamoja → maandishi ya mdahalo → hakimu → uamuzi
  - Seva ya zana za MCP ya pamoja (`web_search` + `run_python`) iliyotekelezwa kwa Python na TypeScript
  - Viamsha mfumo vinavyopingana (KWA / DHIDI YA / Hakimu) kwa mahitaji ya matumizi ya zana wazi
  - Mpangilishi wa mdahalo katika Python, TypeScript, na C# anayesimamia raundi na kupeleka hoja
  - Uunganisho wa MCP `ClientSession` kwa mpangilishi kwa simu halisi za zana
  - Jedwali la matumizi (ugunduzi wa fikra potofu, uundaji wa tishio, mapitio ya muundo wa API, uhakiki wa ukweli, uchaguzi wa teknolojia)
  - Mambo ya usalama: utekelezaji wenye sandbox, uthibitishaji wa simu za zana, ukomo wa kiwango, kumbukumbu za ukaguzi
  - Mazoezi yaliyoandaliwa yenye matukio matatu ya vitendo (mapitio ya msimbo, uamuzi wa usanifu, ukaguzi wa maudhui)

#### Marekebisho ya Nyaraka

**Moduli 03 - Kuanzia**
- **05-stdio-server/README.md**: Imerekebisha mfano usio kamili wa seva ya stdio wa TypeScript — iliongeza uzalishaji wa usafirishaji uliokosekana (`new StdioServerTransport()`) na simu ya `server.connect(transport)` ili iendane na mifano ya Python na .NET katika sehemu hiyo hiyo
- **14-sampling/README.md**: Imerekebisha kosa la tahajia — lilibadilisha `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Sasisho za Mtaala

**README.md kuu**
- Imeongeza kipengele 5.17 (Ufafanuzi wa Mawakala Wengi wa Kupinga kwa MCP) kwenye jedwali la mtaala pamoja na kiungo cha moja kwa moja kwa somo jipya

**05-AdvancedTopics/README.md**
- Imeongeza safu ya Somo 5.17 kwenye jedwali la masomo

**study_guide.md**
- Imeongeza mada ya Ufafanuzi wa Mawakala Wengi wa Kupinga kwenye ramani ya akili na maelezo ya matini ya Mada Zinazoendelea

#### Marekebisho ya Msimbo na Usalama

**Moduli 05 - Mawakala wa Kupinga (`mcp-adversarial-agents`)**
- **Rekebisho la usalama — sindano ya amri**: Ilibadilisha usanichaji (`execSync`) wa shell na `execFile` + `promisify` katika zana ya TypeScript `run_python`, kuondoa uso wa sindano ya amri (msimbo unaodhibitiwa na LLM sasa unapitishwa kama kipengele cha argv halisi bila kuhusishwa na shell)
- **MCP tool loop wiring**: Imesasishwa Python debate orchestrator ili kutumia mteja `AsyncAnthropic` (kubadilisha `Anthropic` ya synchronous blocking), pita `ClientSession` ya moja kwa moja kwa kila zamu ya wakala, piga maelezo ya zana kupitia `session.list_tools()` kila zamu, na tuma bloksi za `tool_use` kupitia `session.call_tool()` katika mzunguko hadi mfano utoe jibu la mwisho la maandishi

#### Sasisho la Vitegemezi

- Imeongezwa `hono` hadi 4.12.12 katika vifurushi vingi (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Imeongezwa `@hono/node-server` kutoka 1.19.11 hadi 1.19.13 katika vifurushi vya TypeScript
- Imeongezwa `cryptography` kutoka 46.0.5 hadi 46.0.7 katika vifurushi vya Python (10-StreamliningAIWorkflows maabara 3 na 4)
- Imeongezwa `lodash` kutoka 4.17.23 hadi 4.18.1 katika mkaguzi wa 10-StreamliningAIWorkflows

#### Tafsiri

- Tafsiri zilisongezwa kwa lugha zaidi ya 48 kwa mabadiliko ya chanzo ya hivi karibuni (sasisho la i18n)

---

## Februari 5, 2026

### Uhakiki na Maboresho ya Uvinjari wa Hifadhi Pamoja

#### Maudhui Mapya ya Mtaala Yameongezwa

**Moduli 03 - Kuanzia**
- **12-mcp-hosts/README.md**: Mwongozo mpana mpya wa kupanga wamiliki wa MCP
  - Mifano ya usanidi ya Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Violezo vya usanidi vya JSON kwa wamiliki wakuu wote
  - Jedwali la kulinganisha aina za usafirishaji (stdio, SSE/HTTP, WebSocket)
  - Utatuzi wa matatizo ya kuunganishwa yanayojirudia mara nyingi
  - Mazoezi bora ya usalama kwa usanidi wa mwenyeji

- **13-mcp-inspector/README.md**: Mwongozo mpya wa kupima makosa wa MCP Inspector
  - Njia za usakinishaji (npx, npm global, kutoka chanzo)
  - Kuungana na seva kupitia stdio na HTTP/SSE
  - Zana za mtihani, rasilimali, na mtiririko wa maombi ya michoro
  - Muungano wa VS Code na MCP Inspector
  - Matukio ya kawaida ya kugundua kasoro na suluhisho

**Moduli 04 - Utekelezaji wa Kivitendo**
- **pagination/README.md**: Mwongozo mpya wa utekelezaji wa ukurasa kwa ukurasa
  - Mifano ya upangaji kwa kutumia cursor katika Python, TypeScript, Java
  - Usimamizi wa upangaji upande wa mteja
  - Mikakati ya muundo wa cursor (opaque dhidi ya muundo)
  - Mapendekezo ya kuboresha utendaji

**Moduli 05 - Mada za Juu**
- **mcp-protocol-features/README.md**: Uchunguzi wa kina wa sifa mpya za itifaki
  - Utekelezaji wa taarifa za maendeleo
  - Mifumo ya kughairi maombi
  - Violezo vya rasilimali zenye mifumo ya URI
  - Usimamizi wa mzunguko wa maisha wa seva
  - Udhibiti wa viwango vya kutengeneza rekodi
  - Mifumo ya kushughulikia makosa na nambari za JSON-RPC

#### Marekebisho ya Uvinjari (faili zaidi ya 24 zimesasishwa)

**Faili Kuu za Moduli README**
 Sasa huunganisha somo la kwanza NA moduli inayofuata

**Faili za Usaidizi wa Usalama 02**
- Hati zinazosaidia usalama tano sasa zina uvinjari wa "Nini Kifuatao":

**Faili za Utafiti wa Kesi 09**
- Faili zote za utafiti wa kesi sasa zina uvinjari wa mfuatano:

**Maabara za 10-StreamliningAI**
Imeongezwa sehemu ya Nini Kifuatao kwenye muhtasari wa Moduli 10 na Moduli 11

#### Marekebisho ya Msimbo na Maudhui

**SDK na Sasisho la Vitegemezi**
Imerekebisha toleo tupu la openai kuwa `^4.95.0`
Imesasisha SDK kutoka `^1.8.0` hadi `>=1.26.0`
Iliboresha toleo la mcp kuwa `>=1.26.0`

**Marekebisho ya Msimbo**
Imebadilisha mfano usio sahihi `gpt-4o-mini` kwa `gpt-4.1-mini`

**Marekebisho ya Maudhui**
Imerekebisha kiungo kilichovunjika `READMEmd` → `README.md`, marekebisho ya kichwa cha mtaala `Module 1-3` → `Module 0-3`, marekebisho ya njia zenye utofauti wa herufi kubwa/kidogo
Iliyatupa maudhui ya nakala rudufu yasiyo ya halali ya Utafiti wa Kesi 5

**Uboreshaji wa Mwongozo kwa Waanzilishi**
Imeongeza utangulizi sahihi, malengo ya kujifunza, na mahitaji kwa wanaoanza

#### Sasisho za Mtaala

**README.md Kuu**
- Imeongezwa ingizo 3.12 (Wamiliki wa MCP), 3.13 (Mchakato wa MCP), 4.1 (Kuorodhesha kwa Ukurasa), 5.16 (Sifa za Itifaki) kwenye jedwali la mtaala

**README za Moduli**
Iliyoongeza masomo 12 na 13 kwenye orodha ya masomo
Imeongeza sehemu ya Mwongozo wa Kivitendo na kiungo cha pagination
Iliyoongeza masomo 5.15 (Usafirishaji Maalum) na 5.16 (Sifa za Itifaki)

**study_guide.md**
- Imesasisha ramani ya mawazo na mada zote mpya: Usanidi wa Wamiliki wa MCP, MCP Inspector, Mikakati ya Pagination, Uchunguzi wa Sifa za Itifaki

## Jan 28, 2026

### Uhakiki wa Uzingatiaji wa Maelezo ya MCP 2025-11-25

#### Uboreshaji wa Misingi ya Mwelekeo (01-CoreConcepts/)
- **Mteja Mpya wa Awali - Roots**: Imeongezwa nyaraka kamili kuhusu mteja wa awali wa Roots, ikiwezesha seva kuelewa mipaka ya mfumo wa faili na ruhusa za upatikanaji
- **Maelezo ya Zana**: Imeongezwa nyaraka kuhusu maelezo ya tabia za zana (`readOnlyHint`, `destructiveHint`) kwa maamuzi bora ya utendakazi wa zana
- **Kupiga Zana katika Sampuli**: Imeboreshwa nyaraka ya Sampuli kujumuisha vigezo vya `tools` na `toolChoice` kwa simu za zana zinazoongoza mfano wakati wa maombi ya sampuli
- **Mfumo wa URL kwa Elimu**: Imeongezwa nyaraka juu ya elimu inayotegemea URL kwa mwingiliano wa wavuti wa nje unaoanzishwa na seva
- **Kazi (Jaribio)**: Imeongezwa sehemu mpya inayofafanua kazi za mfano kwa vifuniko vya utekelezaji vinavyohimili na upokeaji wa matokeo yaliyokataliwa
- **Msaada wa Ikoni**: Imeelezwa kuwa zana, rasilimali, violezo vya rasilimali, na michoro sasa zinaweza kujumuisha ikoni kama metadata ya ziada

#### Sasisho la Nyaraka
- **README.md**: Imeongeza rejea ya toleo la MCP Specification 2025-11-25 na maelezo ya utoaji wa toleo kwa tarehe
- **study_guide.md**: Imeboresha ramani ya mtaala kujumuisha Kazi na Maelezo ya Zana katika sehemu ya Misingi; imesasisha alama za nyaraka

#### Uthibitisho wa Uzingatiaji wa Maelezo
- **Toleo la Itifaki**: Imehakikiwa nyaraka zote zinaelezea MCP Specification ya sasa 2025-11-25
- **Muundo wa Mipangilio**: Imegundua usahihi wa nyaraka wa usanifu wa tabaka mbili (Tabaka la Data + Tabaka la Usafirishaji)
- **Nyaraka za Msingi**: Imehakikiwa vitu vya msingi vya seva (Rasilimali, Michoro, Zana) na vitu vya msingi vya mteja (Sampuli, Elimu, Kutengeneza Rekodi, Roots)
- **Mifumo ya Usafirishaji**: Imehakikiwa usahihi wa nyaraka wa usafirishaji wa STDIO na HTTP inayoweza kuweza kusambazwa
- **Mwongozo wa Usalama**: Imekubaliana na mwongozo wa sasa wa Mazoezi Bora ya Usalama wa MCP

#### Sifa Muhimu za MCP 2025-11-25 Zimeandikwa
- **Ugunduzi wa OpenID Connect**: Ugunduzi wa seva ya uthibitishaji kupitia OIDC
- **Nyaraka za Meta za Kitambulisho cha Mteja cha OAuth**: Mapendekezo ya usajili wa mteja
- **JSON Schema 2020-12**: Lahaja chaguo-msingi kwa ufafanuzi wa skima ya MCP
- **Mfumo wa Kiwanda cha SDK**: Mahitaji rasmi kwa usaidizi na matengenezo ya sifa za SDK
- **Muundo wa Utawala**: Makundi ya Kazi na Makundi ya Maslahi yaliyosajiliwa rasmi katika utawala wa MCP

### Sasisho Kuu la Nyaraka za Usalama (02-Security/)

#### Muunganiko wa Warsha ya Mkutano wa Usalama wa MCP (Sherpa)
- **Rasilimali Mpana ya Mafunzo ya Vitendo**: Imejumuisha kwa kina na [Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/) katika nyaraka zote za usalama
- **Mwendo wa Safari ya Msafara**: Imeandikia maendeleo kamili kutoka Kambi ya Msingi hadi Kilele
- **Ulinganisho wa OWASP**: Mwongozo wote wa usalama sasa unaendana na hatari za MCP Azure Usalama wa OWASP

#### Muunganiko wa OWASP MCP Top 10
- **Sehemu Mpya**: Imeongeza jedwali la hatari 10 kuu za OWASP MCP linalotokana na Azure kwenye README kuu ya Usalama
- **Nyaraka za Hatari**: Imeboresha mcp-security-controls-2025.md kwa marejeo ya hatari za OWASP MCP kwa kila eneo la usalama
- **Muundo wa Marejeleo**: Imeunganisha MWONGOZO wa OWASP MCP Azure Security Guide na mifano ya utekelezaji

#### Faili za Usalama Zimesasishwa
- **README.md**: Imeongeza muhtasari wa warsha ya Sherpa, jedwali la mnara wa msafara, muhtasari wa hatari kuu 10 za OWASP MCP, na sehemu ya mafunzo ya vitendo
- **mcp-security-controls-2025.md**: Imeboreshwa kichwa kuwa Februari 2026, imeongeza marejeo ya hatari za OWASP (MCP01-MCP08), imepata marekebisho ya utofauti wa toleo la spesho
- **mcp-security-best-practices-2025.md**: Imeongeza sehemu za Sherpa na OWASP, imesasisha kipindi cha tarehe
- **mcp-best-practices.md**: Imeongeza sehemu ya mafunzo ya vitendo na viungo vya Sherpa na OWASP
- **azure-content-safety-implementation.md**: Imeongeza marejeo ya OWASP MCP06, muafaka wa Kambi 3 wa Sherpa, na sehemu ya rasilimali za ziada

#### Viungo Vipya vya Rasilimali Vimeongezwa
- [Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/)
- [MWONGOZO wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Kurasa binafsi za hatari za OWASP MCP (MCP01-MCP10)

### Ulinganifu wa Mtaala na MCP Specification 2025-11-25

#### Moduli 03 - Kuanzia
- **Nyaraka za SDK**: Imeongeza SDK ya Go kwenye orodha rasmi ya SDK; imeboresha marejeo yote ya SDK ili yaendane na MCP Specification 2025-11-25
- **Ufafanuzi wa Usafirishaji**: Imeongeza maelezo ya usafirishaji STDIO na HTTP Streaming yenye marejeo wazi ya spesho

#### Moduli 04 - Utekelezaji wa Kivitendo
- **Sasisho za SDK**: Imeongeza SDK ya Go; imesasisha orodha ya SDK na rejea ya toleo la spesho
- **Spesho ya Idhini**: Imesasisha kiungo cha spesho cha Idhini ya MCP hadi toleo la sasa la 2025-11-25

#### Moduli 05 - Mada za Juu
- **Sifa Mpya**: Imeongeza maelezo kuhusu sifa mpya za MCP Specification 2025-11-25 (Kazi, Maelezo ya Zana, Elimu ya Mtindo wa URL, Roots)
- **Rasilimali za Usalama**: Imeongeza viungo vya OWASP MCP Top 10 na warsha ya Sherpa kwa marejeo ya ziada

#### Moduli 06 - Michango ya Jamii
- **Orodha ya SDK**: Imeongeza SDK za Swift na Rust; imesasisha kiungo cha spesho hadi 2025-11-25
- **Rejea ya Spesho**: Imeboresha kiungo cha MCP Specification hadi kiungo cha toleo halisi

#### Moduli 07 - Masomo kutoka kwa Utekelezaji wa Awali
- **Sasisho za Rasilimali**: Imeongeza kiungo cha MCP Specification 2025-11-25 na OWASP MCP Top 10 kwa rasilimali za ziada

#### Moduli 08 - Mazoezi Bora
- **Toleo la Spesho**: Imeboresha rejea ya MCP Specification hadi 2025-11-25
- **Rasilimali za Usalama**: Imeongeza OWASP MCP Top 10 na warsha ya Sherpa kwa marejeo ya ziada

#### Moduli 10 - Kurahisisha Mapitio ya AI
- **Sasisho la Bango**: Imebadilisha bango la toleo la MCP kutoka toleo la SDK (1.9.3) hadi toleo la spesho (2025-11-25)
- **Viungo vya Rasilimali**: Imeboresha kiungo cha MCP Specification; imeongeza OWASP MCP Top 10

#### Moduli 11 - Maabara za MCP Server
- **Rejea ya Spesho**: Imesasisha kiungo cha MCP Specification hadi toleo la 2025-11-25
- **Rasilimali za Usalama**: Imeongeza OWASP MCP Top 10 kwa rasilimali rasmi

## Desemba 18, 2025

### Sasisho la Nyaraka za Usalama - MCP Specification 2025-11-25

#### Mazoezi Bora ya Usalama ya MCP (02-Security/mcp-best-practices.md) - Sasisho la Toleo
- **Mabadiliko ya Toleo la Itifaki**: Imesasisha kurejelea version ya sasa ya MCP Specification 2025-11-25 (iliyotolewa Novemba 25, 2025)
  - Imebadilisha marejeo yote ya toleo la spesho kutoka 2025-06-18 hadi 2025-11-25
  - Imeboresha tarehe za nyaraka kutoka Agosti 18, 2025 hadi Desemba 18, 2025
  - Imehakikisha URLs zote za spesho zinajiunga na nyaraka za sasa
- **Uhakiki wa Maudhui**: Uhakiki wa kina wa mazoezi bora ya usalama dhidi ya viwango vya hivi karibuni
  - **Suluhisho za Usalama za Microsoft**: Imehakiki istilahi na viungo vya sasa vya Prompt Shields (zamani "ugunduzi wa hatari ya jailbreak"), Usalama wa Maudhui ya Azure, ID ya Microsoft Entra, na Azure Key Vault
  - **Usalama wa OAuth 2.1**: Imegundua mlingano na mazoezi bora ya usalama ya hivi karibuni ya OAuth
  - **Viwango vya OWASP**: Imehakiki marejeo ya OWASP Top 10 kwa LLMs bado ni ya sasa
  - **Huduma za Azure**: Imehakiki viungo vyote vya Microsoft Azure vya nyaraka na mazoezi bora
- **Ulinganifu wa Viwango**: Viwango vyote vya usalama vilivyoelezwa ni vya sasa
  - Mfumo wa NIST wa Usimamizi wa Hatari ya AI
  - ISO 27001:2022
  - Mazoezi Bora ya Usalama wa OAuth 2.1
  - Mifumo ya usalama na utii wa Azure
- **Rasilimali za Utekelezaji**: Viungo vyote vya mwongozo wa utekelezaji na rasilimali vimehakikiwa
  - Mifano ya uthibitishaji ya Azure API Management
  - Mwongozo wa muunganiko wa Microsoft Entra ID
  - Usimamizi wa siri za Azure Key Vault
  - Minyororo ya DevSecOps na suluhisho za ufuatiliaji

### Udhibitisho wa Ubora wa Nyaraka
- **Uzingatiaji wa Spesho**: Imehakikisha mahitaji yote ya lazima ya usalama wa MCP (LAZIMA/HARUSI) yanazingatia spesho ya hivi karibuni
- **Halijoto ya Rasilimali**: Imehakikisha viungo vyote vya nje vya nyaraka za Microsoft, viwango vya usalama, na miongozo ya utekelezaji ni vya sasa
- **Usambazaji wa Mazoezi Bora**: Imehakikisha usambazaji kamili wa uthibitishaji, idhini, vitisho vya AI, usalama wa mnyororo wa ugavi, na mifano ya biashara

## Oktoba 6, 2025

### Ukuzaji wa Sehemu ya Kuanzia – Matumizi ya Seva ya Juu na Uthibitishaji Rahisi

#### Matumizi ya Seva ya Juu (03-GettingStarted/10-advanced)
- **Sura Mpya Imeongezwa**: Imeanzisha mwongozo kamili wa matumizi ya juu ya seva ya MCP, ukijumuisha usanifu wa seva wa kawaida na wa kiwango cha chini.
  - **Seva ya Kawaida dhidi ya Seva ya Kiwango cha Chini**: Ulinganisho wa kina na mifano ya msimbo katika Python na TypeScript kwa njia zote mbili.
  - **Muundo wa Msimamizi**: Elezo la usimamizi wa zana/rasilimali/mchoro kwa kutumia muundo wa msimamizi kwa utekelezaji wa seva zinazoweza kupanuliwa na kubadilika.
  - **Mifumo ya Kivitendo**: Matukio halisi ambayo mifumo ya seva ya kiwango cha chini ina manufaa kwa sifa za juu na usanifu.
#### Uthibitishaji Rahisi (03-GettingStarted/11-simple-auth)
- **Sura Mpya Imeongezwa**: Mwongozo hatua kwa hatua wa kutekeleza uthibitishaji rahisi kwenye seva za MCP.
  - **Madhumuni ya Uthibitishaji**: Elezo wazi juu ya uthibitishaji dhidi ya idhini, na jinsi ya kushughulikia vyeti.
  - **Utekelezaji wa Msingi wa Uthibitishaji**: Mifano ya uthibitishaji iliyotegemea middleware katika Python (Starlette) na TypeScript (Express), ikiwa na sampuli za msimbo.
  - **Maendeleo ya Usalama wa Juu**: Mwongozo wa kuanza na uthibitishaji rahisi na kuendelea hadi OAuth 2.1 na RBAC, pamoja na marejeleo ya moduli za usalama wa hali ya juu.

Miongezo hii hutoa mwongozo wa vitendo, wa moja kwa moja kwa ujenzi wa utekelezaji thabiti, salama, na wenye ufanisi wa seva za MCP, ikivuka dhana za msingi hadi mifumo ya hali ya juu ya uzalishaji.

## Septemba 29, 2025

### Maabara za Mchoro wa Hifadhi Data za MCP Server - Njia Kamili ya Kujifunza kwa Vitendo

#### 11-MCPServerHandsOnLabs - Mtaala Mpya Kamili wa Uchanganuzi wa Hifadhi Data
- **Njia Kamili ya Kujifunza Maabara 13**: Mtaala kamili wa vitendo uliyoongezwa kwa ajili ya kujenga seva za MCP tayari kwa uzalishaji zenye uingizaji wa hifadhi ya data ya PostgreSQL
  - **Utekelezaji wa Dunia Halisi**: Mfano wa uchambuzi wa Zava Retail unaoonyesha mifumo ya kiwango cha biashara
  - **Maendeleo ya Kujifunza Yanayopangwa**:
    - **Maabara 00-03: Misingi** - Utangulizi, Miundo Muhimu, Usalama & Uendeshaji wa Wateja Wengi, Usanidi wa Mazingira
    - **Maabara 04-06: Ujenzi wa MCP Server** - Ubunifu wa Hifadhi Data & Mchoro, Utekelezaji wa MCP Server, Utengenezaji wa Vyombo  
    - **Maabara 07-09: Vipengele vya Juu** - Uingizaji wa Utafutaji wa Kimaana, Upimaji & Urejeshaji hitilafu, Uingizaji wa VS Code
    - **Maabara 10-12: Uzalishaji & Mazoezi Bora** - Mikakati ya Uanzishaji, Ufuatiliaji & Uwezo wa Kuchunguza, Mazoezi Bora & Uboreshaji
  - **Teknolojia za Kibiashara**: Fremu ya FastMCP, PostgreSQL na pgvector, Mijulisho ya Azure OpenAI, Azure Container Apps, Application Insights
  - **Vipengele vya Juu**: Usalama wa Ngazi ya Safu (RLS), utafutaji wa kimaana, upatikanaji wa data kwa wateja wengi, embeddings za vector, ufuatiliaji wa wakati halisi

#### Uwekaji Viwango vya Madoido - Mabadiliko ya Moduli Hadi Maabara
- **Marekebisho Kamili ya Nyaraka**: Imesasishwa kihususi vyote README katika 11-MCPServerHandsOnLabs kutumia istilahi ya "Lab" badala ya "Module"
  - **Vichwa vya Sehemu**: "Kile Moduli Hii Inachukua" kubadilishwa kuwa "Kile Lab Hii Inachukua" katika maabara zote 13
  - **Maelezo ya Yaliyomo**: "Moduli hii inatoa..." kubadilishwa kuwa "Lab hii inatoa..." katika nyaraka zote
  - **Malengo ya Kujifunza**: "Mwisho wa moduli hii..." kubadilishwa kuwa "Mwisho wa lab hii..."
  - **Viungo vya Uelekezaji**: Marejeleo yote ya "Moduli XX:" kubadilishwa kuwa "Lab XX:" katika rejea na urambazaji
  - **Ufuatiliaji wa Kukamilika**: "Baada ya kukamilisha moduli hii..." kubadilishwa kuwa "Baada ya kukamilisha lab hii..."
  - **Marejeleo ya Fani Kuhifadhiwa**: Marejeleo ya moduli za Python yamehifadhiwa katika faili za usanidi (mfano, `"module": "mcp_server.main"`)

#### Uboreshaji wa Mwongozo wa Kujifunza (study_guide.md)
- **Ramani ya Mtaala ya Kuonekana**: Kifungu kipya "11. Maabara za Uingizaji Hifadhi Data" kimeongezwa na muonekano wa muundo wa maabara
- **Muundo wa Hifadhidata**: Imebadilishwa kutoka sehemu kumi hadi kumi na moja kuu na maelezo ya kina ya 11-MCPServerHandsOnLabs
- **Mwongozo wa Njia ya Kujifunza**: Maelekezo ya urambazaji yaliboreshwa kufunika sehemu 00-11
- **Ufunuo wa Teknolojia**: Maelezo ya kuingizwa kwa FastMCP, PostgreSQL, na huduma za Azure
- **Matokeo ya Kujifunza**: Umekazia ujenzi wa seva tayari kwa uzalishaji, mifumo ya uingizaji wa hifadhi data, na usalama wa kitaalamu

#### Uboreshaji wa Muundo wa README Mkuu
- **Istilahi za Lab**: README.md kuu katika 11-MCPServerHandsOnLabs imesasishwa kutumia muundo wa "Lab" kwa uthabiti
- **Mpangilio wa Njia ya Kujifunza**: Maendeleo yanayoeleweka kutoka dhana za msingi hadi utekelezaji wa hali ya juu na uanzishaji wa uzalishaji
- **Msisitizo wa Dunia Halisi**: Umuhimu wa kujifunza kwa vitendo, kwa mifano ya kiwango cha biashara na teknolojia

### Maboresho ya Ubora & Muafaka wa Nyaraka
- **Msisitizo wa Kujifunza kwa Vitendo**: Njia ya mtihani yenye msingi wa maabara Imeimarishwa katika nyaraka zote
- **Msisitizo wa Mifumo ya Biashara**: Utekelezaji tayari kwa uzalishaji na kuzingatia usalama wa kitaalamu umeonyeshwa
- **Uingizaji wa Teknolojia**: Ufunuo wa kina wa huduma za kisasa za Azure na mifumo ya AI
- **Maendeleo ya Kujifunza**: Njia iliyo wazi, iliyo pangwa kutoka dhana msingi hadi uzalishaji

## Septemba 26, 2025

### Uboreshaji wa Usomaji wa Masuala - Uingizaji wa GitHub MCP Registry

#### Masomo ya Mfano (09-CaseStudy/) - Msisitizo wa Maendeleo ya Mizunguko
- **README.md**: Upanuzi mkubwa na somo la kina la GitHub MCP Registry
  - **Somo la Mfano la GitHub MCP Registry**: Somo jipya la kina likichunguza uzinduzi wa degere ya MCP ya GitHub Septemba 2025
    - **Uchambuzi wa Tatizo**: Uchambuzi wa kina wa kugawanyika na changamoto za kugundua na kuanzisha seva za MCP
    - **Mimarishaji wa Suluhisho**: Njia ya usajili wa GitHub yenye kitufe kimoja kwa usakinishaji wa VS Code
    - **Athari za Biashara**: Maboresho yanayopimika katika kuanzisha watengenezaji na uzalishaji
    - **Thamani ya Mkakati**: Msisitizo kwa usambazaji wa wakala kwa vipengele na utangamano wa zana mbalimbali
    - **Maendeleo ya Mizunguko**: Uwezeshaji kama jukwaa la msingi kwa ujumuishaji wa wakala
  - **Muundo wa Somo la Mfano Uboreshwa**: Somasomo saba zimesasishwa kwa ulinganifu na maelezo kamili
    - Wakala wa Safari wa Azure AI: Msisitizo wa usimamizi wa mawakala wengi
    - Uingizaji wa Azure DevOps: Msisitizo wa otomatiki kwa mtiririko wa kazi
    - Urejeshaji wa Nyaraka wa Wakati Halisi: Mtumiaji wa mistari ya amri Python
    - Mbunifu wa Mpango wa Kujifunza wa Mazungumzo: Programu ya mtandao ya Chainlit
    - Nyaraka Ndani ya Mhariri: Uingizaji wa VS Code na GitHub Copilot
    - Usimamizi wa API za Azure: Mifumo ya kiwango cha biashara ya API
    - GitHub MCP Registry: Maendeleo ya mzunguko na jukwaa la jamii
  - **Hitimisho Kamili**: Sehemu ya hitimisho imeandikwa upya ikionyesha masomo saba yanayohusiana na vipengele tofauti vya utekelezaji wa MCP
    - Uingizaji wa Biashara, Usimamizi wa Mawakala Wengi, Uzalishaji wa Watengenezaji
    - Maendeleo ya Mizunguko, Aina za Maombi ya Elimu
    - Maarifa ya mifumo ya usanifu, mikakati ya utekelezaji, na mazoezi bora
    - Msisitizo juu ya MCP kama itifaki iliyokomaa, tayari kwa uzalishaji

#### Sasisho za Mwongozo wa Kujifunza (study_guide.md)
- **Ramani ya Mtaala ya Kuonekana**: Ramani ya mawazo imesasishwa kuongeza GitHub MCP Registry katika sehemu ya Masomo ya Mfano
- **Maelezo ya Masomo ya Mfano**: Yameboreshwa kutoka maelezo ya jumla hadi uchanganuzi wa kina wa masomo saba ya kina
- **Muundo wa Hifadhidata**: Sehemu 10 imesasishwa kufanikisha mzunguko wa kina wa somo la mfano kwa maelezo maalum ya utekelezaji
- **Uingizaji wa Maboresho**: Imeongeza sajili ya Septemba 26, 2025 ikielezea uingizaji wa GitHub MCP Registry na maboresho ya somo la mfano
- **Sasisho za Tarehe**: Kipindi cha chini cha ukurasa kimesasishwa kuonyesha kifungu kipya (Septemba 26, 2025)

### Maboresho ya Ubora wa Nyaraka
- **Ulinganifu Imara**: Mfumo wa muundo wa masomo ya mfano umesanifiwa sawa katika mifano yote saba
- **Ufunuo wa Kina**: Masomo ya mfano sasa yanashughulikia biashara, uzalishaji wa watengenezaji, na maendeleo ya mzunguko
- **Uwekaji Mkakati**: Msisitizo umeongezwa kwenye MCP kama jukwaa la msingi la usambazaji wa mifumo ya wakala
- **Uingizaji wa Rasilimali**: Viungo vya ziada vimesasishwa kuja na GitHub MCP Registry

## Septemba 15, 2025

### Upanuzi wa Mada za Juu - Usafirishaji wa Kipekee & Uhandisi wa Muktadha

#### Usafirishaji wa Kipekee wa MCP (05-AdvancedTopics/mcp-transport/) - Mwongozo Mpya wa Utekelezaji wa Juu
- **README.md**: Mwongozo kamili wa utekelezaji wa mifumo ya usafirishaji wa MCP ya kipekee
  - **Usafirishaji wa Azure Event Grid**: Utekelezaji kamili wa usafirishaji usiokuwa na seva unaotegemea matukio
    - Sampuli za C#, TypeScript, na Python zilizo na uingizaji wa Azure Functions
    - Mifumo ya usanifu ya matukio ya nguvu kwa suluhisho za MCP zinazoweza kupanuka
    - Kupokea webhook na usimamizi wa ujumbe wa kusukuma
  - **Usafirishaji wa Azure Event Hubs**: Utekelezaji wa usafirishaji wa mtiririko wa juu
    - Uwezo wa mtiririko wa wakati halisi kwa hali za ucheleweshaji mdogo
    - Mikakati ya kugawanya na usimamizi wa alama za kukagua mara kwa mara
    - Kupanua ujumbe na uboreshaji wa utendaji
  - **Mifumo ya Kuunganisha Biashara**: Mifano ya usanifu tayari kwa uzalishaji
    - Ufanyaji kazi wa MCP uliogawanyika katika Azure Functions nyingi
    - Mifumo ya usafirishaji ya mchanganyiko inayochanganya aina mbalimbali za usafirishaji
    - Uthabiti wa ujumbe, usalama, na mikakati ya kushughulikia makosa
  - **Usalama & Ufuatiliaji**: Uingizaji wa Azure Key Vault na mifumo ya kuona
    - Uthibitishaji wa utambulisho uliodhibitiwa na ufikiaji wa haki chache tu
    - Telematiki ya Application Insights na ufuatiliaji wa utendaji
    - Vipenga vya mzunguko na mifumo ya uvumilivu wa makosa
  - **Mifumo ya Upimaji**: Mikakati kamili ya upimaji wa usafirishaji wa kipekee
    - Upimaji wa vitengo na matumizi ya tarakimu bandia na vifaa vya udanganyifu
    - Upimaji wa ujumuishaji kwa kutumia Azure Test Containers
    - Masuala ya utendaji na upimaji mzito

#### Uhandisi wa Muktadha (05-AdvancedTopics/mcp-contextengineering/) - Taasisi Inayoibuka ya AI
- **README.md**: Uchunguzi wa kina wa uhandisi wa muktadha kama taaluma inayoibuka
  - **Kanuni Muhimu**: Kushiriki muktadha kikamilifu, ufahamu wa maamuzi ya vitendo, na usimamizi wa dirisha la muktadha
  - **Ulinganifu na Itifaki ya MCP**: Jinsi usanifu wa MCP unavyoshughulikia changamoto za uhandisi wa muktadha
    - Vikwazo vya dirisha la muktadha na mikakati ya upakiaji wa hatua kwa hatua
    - Ufafanuzi wa umuhimu na upatikanaji wa muktadha unaobadilika
    - Usimamizi wa muktadha wa aina nyingi na vizingiti vya usalama
  - **Mbinu za Utekelezaji**: Miundo ya msalaba-mtitizo dhidi ya mifumo ya mawakala wengi
    - Ugawaji wa muktadha na mbinu za kipaumbele
    - Upakiaji wa muktadha wa hatua kwa hatua na mikakati ya usimbaji
    - Njia za muktadha wa tabaka na uboreshaji wa upatikanaji
  - **Mfumo wa Upimaji**: Viwango vinavyoibuka kwa tathmini ya ufanisi wa muktadha
    - Ufanisi wa pembejeo, utendaji, ubora, na uzoefu wa mtumiaji
    - Mbinu za majaribio kwa uboreshaji wa muktadha
    - Uchambuzi wa makosa na mbinu za kuboresha

#### Sasisho za Urambazaji wa Mtaala (README.md)
- **Muundo wa Moduli ulioimarishwa**: Meza ya mtaala imesasishwa kujumuisha mada mpya za juu
  - Imeongezwa Uhandisi wa Muktadha (5.14) na Usafirishaji wa Kipekee (5.15)
  - Muundo unaolingana na viungo vya urambazaji kwa moduli zote
  - Maelezo yamesasishwa kuonyesha upana wa kila somo

### Maboresho ya Muundo wa Saraka
- **Uwekaji Viwango vya Majina**: Jina "mcp transport" limebadilishwa kuwa "mcp-transport" kwa muafaka na folda nyingine za mada za juu
- **Muundo wa Yaliyomo**: Folda zote za 05-AdvancedTopics zifuate muundo thabiti wa majina (mcp-[kauli])

### Maboresho ya Ubora wa Nyaraka
- **Ulinganifu na Maelezo ya MCP**: Yaliyomo mapya yote yafuatana na MCP Specification 2025-06-18
- **Mifano ya Lugha Nyingi**: Sampuli za msimbo za kina kwa C#, TypeScript, na Python
- **Msisitizo wa Biashara**: Mifumo tayari kwa uzalishaji na uingizaji wa Azure cloud
- **Nyaraka za Kuonekana**: Michoro ya Mermaid kwa usanifu na muonekano wa mtiririko

## Agosti 18, 2025

### Sasisho Kamili la Nyaraka - Viwango MCP 2025-06-18

#### Mazoezi Bora ya Usalama wa MCP (02-Security/) - Ubadilishaji Kamili wa Kisasa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Uandikaji upya kamili ulandanifu na MCP Specification 2025-06-18
  - **Mahitaji ya Lazima**: Mahitaji ya wazi MUST/MUST NOT kutoka kwa maelezo rasmi ikiwa na viashiria vya kuona wazi
  - **Mazoezi 12 Muhimu ya Usalama**: Yamepangwa upya kutoka kwa orodha ya vitu 15 hadi maeneo kamili ya usalama
    - Usalama wa Tokeni & Uthibitishaji na uingizaji wa mtoa utambulisho wa nje
    - Usimamizi wa Kikao & Usalama wa Usafirishaji na mahitaji ya usimbaji
    - Ulinzi wa Vitisho vya AI kwa uingizaji wa Microsoft Prompt Shields
    - Udhibiti wa Upatikanaji & Ruhusa kwa kanuni ya upungufu wa ruhusa
    - Usalama wa Yaliyomo & Ufuatiliaji na uingizaji wa Azure Content Safety
    - Usalama wa Mnyororo wa Ugavi na uhakiki kamili wa vipengele
    - Usalama wa OAuth & Kuzuia Mwakala Mchanganyikiwa (Confused Deputy) na utekelezaji wa PKCE
    - Majibu ya Tukio & Urejeshaji kwa uwezo wa kiotomatiki
    - Uzingatiaji & Utawala kwa muafaka wa kanuni
    - Udhibiti wa Usalama wa Juu kwa usanifu wa kuamini sifuri
    - Uingizaji wa Mfumo wa Usalama wa Microsoft na suluhisho kamili
    - Mabadiliko Endelevu ya Usalama kwa mazoezi ya kuendana
  - **Suluhisho za Usalama za Microsoft**: Mwongozo boreshwa kwenye uingizaji wa Prompt Shields, Azure Content Safety, Entra ID, na GitHub Advanced Security
  - **Rasilimali za Utekelezaji**: Viungo vilivyokataliwa kwa makundi ya Nyaraka Rasmi za MCP, Suluhisho za Usalama za Microsoft, Viwango vya Usalama, na Mwongozo wa Utekelezaji

#### Udhibiti wa Usalama wa Juu (02-Security/) - Utekelezaji wa Kibiashara
- **MCP-SECURITY-CONTROLS-2025.md**: Marekebisho kamili ya mfumo wa usalama wa kiwango cha biashara
  - **Maeneo 9 ya Usalama Kamili**: Kuongezwa kutoka kwa udhibiti wa msingi hadi mfumo wa biashara wa kina
    - Uthibitishaji & Idhini ya Juu na uingizaji wa Microsoft Entra ID
    - Usalama wa Tokeni & Udhibiti dhidi ya Kupitishwa Vibaya kwa tokeni
    - Udhibiti wa Usalama wa Kikao na kuzuia ujambazi wa kikao
    - Udhibiti wa Usalama wa AI na kuzuia sindano za maelekezo na sumu ya zana
    - Kuzuia Shambulio la Mwakala Mchanganyikiwa na usalama wa proxy wa OAuth
    - Usalama wa Utekelezaji wa Zana na usanidi wa sandbox na kutojaliwa
    - Udhibiti wa Usalama wa Mnyororo wa Ugavi na uhakiki wa utegemezi
    - Udhibiti wa Ufuatiliaji & Ugunduzi na uingizaji wa SIEM
    - Majibu ya Tukio & Urejeshaji na uwezo wa kiotomatiki
  - **Mifano ya Utekelezaji**: Kuongezwa kwa vipande vya usanidi vya YAML na mifano ya msimbo
  - **Uingizaji wa Suluhisho za Microsoft**: Ufunuo kamili wa huduma za usalama za Azure, GitHub Advanced Security, na usimamizi wa utambulisho wa biashara

#### Mada za Juu za Usalama (05-AdvancedTopics/mcp-security/) - Utekelezaji Tayari kwa Uzalishaji
- **README.md**: Uandikaji upya kamili wa utekelezaji wa usalama wa biashara
  - **Ulinganifu na Maelezo ya Sasa**: Imesasishwa kwa MCP Specification 2025-06-18 na mahitaji ya usalama ya lazima
  - **Uthibitishaji ulioboreshwa**: Uingizaji wa Microsoft Entra ID na mifano kamili ya .NET na Java Spring Security
  - **Uingizaji wa Usalama wa AI**: Utekelezaji wa Microsoft Prompt Shields na Azure Content Safety na mifano ya kina ya Python
  - **Uzuiaji wa Vitisho vya Juu**: Mifano kamili ya utekelezaji kwa
    - Kuzuia Shambulio la Mwakala Mchanganyikiwa kwa PKCE na ukaguzi wa ridhaa ya mtumiaji
    - Kuzuia Kupitishwa Vibaya kwa tokeni kwa ukaguzi wa hadhira na usimamizi wa tokeni salama
    - Kuzuia Ujambazi wa Kikao kwa kufungamanisha usimbaji na uchambuzi wa tabia
  - **Uingizaji wa Usalama wa Biashara**: Ufuatiliaji wa Azure Application Insights, njia za kugundua vitisho, na usalama wa mnyororo wa ugavi
  - **Orodha ya Ukaguzi wa Utekelezaji**: Udhibiti wa lazima dhidi ya mapendekezo na faida za mfumo wa usalama wa Microsoft

### Ubora wa Nyaraka & Muafaka wa Viwango
- **Marejeleo ya Maelezo**: Imesasisha marejeleo yote kwa MCP Specification ya sasa 2025-06-18  
- **Mfumo wa Usalama wa Microsoft**: Kuimarisha mwongozo wa ushirikiano katika nyaraka zote za usalama  
- **Utekelezaji wa Kivitendo**: Kuongeza mifano ya kina ya msimbo katika .NET, Java, na Python ikiwa na mifumo ya biashara  
- **Umpangaji wa Rasilimali**: Uainishaji kamili wa nyaraka rasmi, viwango vya usalama, na miongozo ya utekelezaji  
- **Viashirio vya Vizuizi**: Kuweka wazi mahitaji ya lazima dhidi ya taratibu zinazopendekezwa  


#### Dhana za Msingi (01-CoreConcepts/) - Uboreshaji Kamili wa Kisasa  
- **Sasisho la Toleo la Itifaki**: Imesasisha kuwahusu MCP Specification ya sasa 2025-06-18 yenye toleo la tarehe (muundo YYYY-MM-DD)  
- **Uboreshaji wa Miundo**: Ufafanuzi ulioboreshwa wa Wamiliki, Wateja, na Seva kuonyesha mifumo ya hivi sasa ya MCP  
  - Wamiliki sasa wanafafanuliwa wazi kama programu za AI zinazoongoza muunganisho wa wateja wengi wa MCP  
  - Wateja wameelezewa kama viunganishi wa itifaki vinavyodumisha uhusiano wa mtu-kwa-mtu na seva  
  - Seva zimeboreshwa kwa mazingira ya usambazaji wa eneo la karibu dhidi ya mbali  
- **Marekebisho ya Primitives**: Mageuzi kamili ya primitives za seva na mteja  
  - Primitives za Seva: Rasilimali (vyanzo vya data), Maagizo (mifumo), Zana (kazi zinazotekelezwa) zikiwa na maelezo na mifano ya kina  
  - Primitives za Mteja: Sampuli (umalizaji wa LLM), Uombaji (ingizo la mtumiaji), Uandikaji (utambuzi/usimamizi wa makosa)  
  - Imesasishwa kwa mifumo ya sasa ya ugunduzi (`*/list`), upokeaji (`*/get`), na utekelezaji (`*/call`)  
- **Miundo ya Itifaki**: Imeanzisha mfano wa miundo ya tabaka mbili  
  - Tabaka la Data: Msingi wa JSON-RPC 2.0 na usimamizi wa mzunguko wa maisha pamoja na primitives  
  - Tabaka la Usafirishaji: STDIO (eneo la ndani) na HTTP inayoambukizwa kwa mtstream, pamoja na SSE (mbinu za usafirishaji wa mbali)  
- **Mfumo wa Usalama**: Kanuni kamili za usalama zikijumuisha ruhusa ya wazi ya mtumiaji, ulinzi wa usiri wa data, usalama wa utekelezaji wa zana, na usalama wa tabaka la usafirishaji  
- **Mifumo ya Mawasiliano**: Imesasisha ujumbe wa itifaki kuonyesha awamu za kuanzisha, kugundua, kutekeleza, na kutoa taarifa  
- **Mifano ya Msimbo**: Imerejesha mifano mingi kwa lugha tofauti (.NET, Java, Python, JavaScript) kuonyesha mifumo ya sasa ya MCP SDK  


#### Usalama (02-Security/) - Mageuzi Kamili ya Usalama  
- **Ulinganisho na Vigezo**: Ulinganisho kamili na mahitaji ya usalama ya MCP Specification 2025-06-18  
- **Mageuzi ya Uthibitishaji**: Imeandikwa mageuzi kutoka seva za desturi za OAuth hadi maelekezo ya huduma za utambulisho wa nje (Microsoft Entra ID)  
- **Uchambuzi wa Vitisho vya AI**: Utoaji wa taarifa kamili juu ya mbinu za kisasa za mashambulizi ya AI  
  - Mifano ya kina ya mashambulizi ya sindano ya maagizo  
  - Mbinu za uchafu wa zana na mifumo ya mashambulizi ya "rug pull"  
  - Uchafu wa dirisha la muktadha na mashambulizi ya kuchanganya mfano  
- **Suluhisho za Usalama za AI za Microsoft**: Utoaji wa taarifa kamili juu ya mfumo wa usalama wa Microsoft  
  - Vizuizi vya Maagizo ya AI vyenye ufuatiliaji wa hali ya juu, kuangazia, na mbinu za vipande vya mwisho  
  - Mifumo ya ushirikiano wa Azure Content Safety  
  - Usalama wa Juu wa GitHub kwa ulinzi wa mnyororo wa usambazaji  
- **Kupunguza Vitisho vya Juu**: Udhibiti wa usalama wa kina kwa  
  - Kunyang’anywa kwa vikao pamoja na mifano maalum ya mashambulizi ya MCP na mahitaji ya vitambulisho vya vikao vya usimbaji  
  - Shida za mchruma mchafu katika hali za wakala wa MCP zenye mahitaji wazi ya ruhusa  
  - Utegemezi usio salama wa tokeni zenye udhibiti wa kuthibitisha wa lazima  
- **Usalama wa Mnyororo wa Usambazaji**: Uenezi wa ulinzi wa AI wa mnyororo wa usambazaji ikijumuisha mifano ya msingi, huduma za embeddings, watoa muktadha, na API za wahusika wengine  
- **Usalama wa Msingi**: Ushirikiano ulioboreshwa na mifumo ya usalama ya biashara ikiwa ni pamoja na usanifu wa zero trust na mfumo wa usalama wa Microsoft  
- **Umpangaji wa Rasilimali**: Rasilimali pamoja zimeainishwa kwa makundi kulingana na aina (Nyaraka Rasmi, Viwango, Utafiti, Suluhisho za Microsoft, Miongozo ya Utekelezaji)  


### Maboresho ya Ubora wa Nyaraka  
- **Malengo Yaliyopangwa Kistramili**: Kuimarisha malengo ya kujifunza ikiwa na matokeo maalum, yanayoweza kutekelezwa  
- **Marejeleo ya Msingi**: Kuongeza viungo kati ya mada zinazohusiana za usalama na dhana za msingi  
- **Taarifa za Sasa**: Kuongeza saa marejeleo yote ya tarehe na viungo vya maelezo kwenye viwango vya sasa  
- **Mwongozo wa Utekelezaji**: Kuongeza miongozo maalum, inayotekelezeka katika sehemu zote mbili  


## Julai 16, 2025  

### README na Maboresho ya Uvutaji  
- Kubuni upya kabisa urambazaji wa mtaala katika README.md  
- Kubadilisha lebo za `<details>` kwa muundo wa meza unaofaa zaidi  
- Kuunda chaguzi mbadala za muundo katika folda mpya "alternative_layouts"  
- Kuongeza mifano ya urambazaji ya aina ya kadi, tab, na accordion  
- Kusasisha sehemu ya muundo wa hifadhidata ili kujumuisha faili zote za hivi karibuni  
- Kuimarisha sehemu ya "Jinsi ya Kutumia Mtaala Huu" kwa mapendekezo wazi  
- Kusasisha viungo vya maelezo ya MCP kwa URLs sahihi  
- Kuongeza sehemu ya Uhandisi wa Muktadha (5.14) katika muundo wa mtaala  


### Sasisho za Mwongozo wa Masomo  
- Kuandika upya kabisa mwongozo wa masomo ili kuendana na muundo wa hifadhidata wa sasa  
- Kuongeza sehemu mpya kwa MCP Wateja na Zana, na Seva Maarufu za MCP  
- Kusasisha Ramani ya Mtaala ya Maono kuonyesha mada zote kwa usahihi  
- Kuimarisha maelezo ya Mada za Juu kufunika maeneo yote maalum  
- Kusasisha sehemu za Masomo ya Kesi kuonyesha mifano halisi  
- Kuongeza muhtasari huu wa mabadiliko ya kina  


### Michango ya Jumuiya (06-CommunityContributions/)  
- Kuongeza habari za kina juu ya seva za MCP kwa uzalishaji wa picha  
- Kuongeza sehemu kamili juu ya kutumia Claude katika VSCode  
- Kuongeza maelekezo ya usanidi na matumizi ya mteja wa terminal wa Cline  
- Kusasisha sehemu ya wateja wa MCP kujumuisha chaguzi zote maarufu  
- Kuimarisha mifano ya michango kwa sampuli za msimbo zenye usahihi zaidi  


### Mada za Juu (05-AdvancedTopics/)  
- Kupangilia folda zote za mada maalum zikiwa na majina thabiti  
- Kuongeza nyenzo za uhandisi wa muktadha na mifano  
- Kuongeza nyaraka za ushirikiano wa wakala wa Foundry  
- Kuimarisha nyaraka za ushirikiano wa usalama wa Entra ID  


## Juni 11, 2025  

### Uundaji wa Awali  
- Kutolewa toleo la kwanza la mtaala wa MCP kwa Waanzilishi  
- Kuunda muundo wa msingi kwa sehemu kuu 10 zote  
- Kutekeleza Ramani ya Mtaala ya Maono kwa urambazaji  
- Kuongeza miradi ya mfano ya awali katika lugha mbalimbali za programu  


### Anza (03-GettingStarted/)  
- Kuunda mifano ya utekelezaji wa seva wa kwanza  
- Kuongeza miongozo ya maendeleo ya wateja  
- Kujumuisha maelekezo ya unganisho wa mteja wa LLM  
- Kuongeza nyaraka za ushirikiano na VS Code  
- Kutekeleza mifano ya seva za Matukio Yanayotumwa na Seva (SSE)  


### Dhana za Msingi (01-CoreConcepts/)  
- Kuongeza maelezo ya kina ya miundo ya mteja-seva  
- Kuunda nyaraka juu ya vipengele muhimu vya itifaki  
- Kurekodi mifumo ya ujumbe katika MCP  


## Mei 23, 2025  

### Muundo wa Hifadhidata  
- Kuanzisha hifadhidata na muundo wa folda wa msingi  
- Kuunda faili za README kwa kila sehemu kuu  
- Kusanidi miundombinu ya tafsiri  
- Kuongeza picha na michoro  


### Nyaraka  
- Kuunda README.md ya awali yenye muhtasari wa mtaala  
- Kuongeza CODE_OF_CONDUCT.md na SECURITY.md  
- Kusanidi SUPPORT.md yenye mwongozo wa kupata msaada  
- Kuunda muundo wa mwongozo wa masomo wa awali  


## Aprili 15, 2025  

### Mipango na Mfumo  
- Mipango ya awali ya mtaala wa MCP kwa Waanzilishi  
- Kutoa malengo ya kujifunza na hadhira lengwa  
- Kuweka muundo wa sehemu 10 za mtaala  
- Kuendeleza mfumo wa dhana kwa mifano na masomo ya kesi  
- Kuunda mifano ya awali ya dhana kuu

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->