# Changelog: MCP kwa Mtaalamu wa Kuanza

Hati hii inahudumu kama rekodi ya mabadiliko yote muhimu yaliyofanywa kwenye mitaala ya Model Context Protocol (MCP) kwa Mtaalamu wa Kuanza. Mabadiliko yameandikwa kwa mpangilio wa mfululizo wa zamani hadi mpya (mabadiliko ya hivi karibuni kwanza).

## Juni 24, 2026

### Somo Jipya: Kutumia MCP katika programu ya Copilot

- [Sehemu ya Zana](./12-tooling/README.md) Imeongezwa sehemu ya zana.
- [MCP katika programu ya Copilot](./12-tooling/01-copilot-app/README.md)

## Juni 16, 2026

### Ulinganifu wa Maelezo ya MCP & Uhakiki wa Mfano

Ilithibitishwa mitaala dhidi ya **MCP Specification 2025-11-25** ya sasa na SDK rasmi za hivi karibuni, kisha ikarekebisha rejeleo zilizochelewa za maelezo na kuthibitisha sampuli kuu bado zinaweza kujengwa na kuendeshwa.

#### Marekebisho ya Toleo la Maelezo (2025-06-18 / 2025-03-26 → 2025-11-25)

Imesasisha maudhui ya Kiingereza ambapo bado yalidai toleo la zamani la maelezo ni kiwango cha *sasa/kisicho zaidi*, na kurejelea viungo kwa njia rasmi ya `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Imesasisha bango la "Kiwango cha Sasa", utangulizi, kichwa cha kanuni kuu za usalama, kichwa cha mahitaji ya lazima, sehemu ya Microsoft Entra ID, viungo vya Rejeleo & Rasilimali, na tangazo la mwisho la usalama (marejeleo 8) hadi 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Imesasisha kiungo cha Rasilimali Zaidi na bango la "Kiwango cha Sasa" hadi 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Imegawanya kiungo cha zamani cha `2025-03-26` cha usalama-na-aminifu na ukurasa wa mazoea bora ya usalama wa sasa wa 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Imesasisha kiungo rasmi cha hati ya sampuli hadi 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Imesasisha rejeleo ya sasa la "maelezo ya MCP" kwa wakati halisi na kiungo cha Rasilimali Zaidi hadi 2025-11-25 (maelezo ya kihistoria ya SSE-deprecation hayakuguswa kwa usahihi)

#### Uhakiki wa Mfano Kulingana na SDK za Sasa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ilitatua `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` ilipita bila makosa ya aina — APIs zilizopo za `McpServer`/`StdioServerTransport` bado ni halali
- **Python (03-GettingStarted/01-first-server/solution/python)**: Ilihakikiwa katika `.venv` pekee na `mcp[cli]` (1.27.2); `py_compile` ilipita na `FastMCP.list_tools()` ilirudisha zana za `add` na `subtract` kwa usahihi
- Ilithibitishwa mikoa yote ya toleo la sampuli `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) inaleta toleo la sasa `1.29.0` bila mabadiliko ya kuvunja API

#### Ulinganifu wa Pins za Kutegemea (kufunga mapengo ya toleo)

Imepandisha pins za SDK zilizozeeka ili kila sampuli ifuatilie toleo la sasa la MCP, likiendana na utaratibu wa repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Ilipandisha `@modelcontextprotocol/sdk` kutoka `^1.8.0` → `>=1.26.0` na kusasisha maelezo ya kifurushi yaliyochelewa `"updated for MCP 2025-06-18"` hadi `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** na **lab4/code/github_mcp_server/pyproject.toml**: Imebeba pin kamili `mcp==1.23.0` → `mcp>=1.26.0`; ilizalisha upya faili zote za `uv.lock` (`uv lock`) ili faili za kufunga ziwe na toleo la sasa `mcp 1.27.2` na ziende sambamba na faili za maelezo

#### Uchambuzi wa Mapengo ya Mitaala — Ufungaji wa Vipengele vya Maelezo ya Hivi Karibuni

Imethibitisha mitaala tayari inahusisha vitu vyote vilivyoanzishwa/kubadilishwa MCP 2025-11-25, hivyo hakuna mapengo ya maudhui yaliyobaki:
- **Sampling**: Somo 03-GettingStarted/14-sampling pamoja na 05-AdvancedTopics/mcp-sampling
- **Elicitation (pamoja na hali ya URL)**: Imeandikwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Imeandikwa katika 00-Introduction, 01-CoreConcepts, na 05-AdvancedTopics/mcp-root-contexts
- **Tasks (majaribio, shughuli za muda mrefu)**: Imeandikwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features
- **Manukuu ya Zana** (`readOnlyHint` / `destructiveHint`): Imeandikwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features

### Kuimarisha Usalama & Urejeshaji wa Udhaifu wa Kutegemea

Iliyafanya ukaguzi kamili wa usalama kwenye kila moja ya maelezo ya kutegemea na msimbo wa chanzo cha sampuli, kisha ikarekebisha arifa zote zilizoripotiwa za npm na ugunduzi mmoja wa kiwango cha msimbo. Baada ya urejeshaji, `npm audit` inaripoti **0 udhaifu** katika kila saraka iliyosababishwa.

#### Udhaifu wa Kutegemea npm (za mtiririko) — Imerekebishwa

Ilipitia faili zote 15 za `package-lock.json` zilizowekwa. Udhaifu ulikuwa mdogo tu kwa kutegemea wa mtiririko waliotumika na zana ya MCP Inspector dev, mteja wa OpenAI, na SDK ya MCP; vyote sasa vimetatuliwa bila kuvunja sampuli:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** na **lab3/code/weather_mcp/inspector**: Imepandisha `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), ambayo iliondoa taarifa za kutiliwa mashaka za `ajv`, `brace-expansion`, `diff`, `path-to-regexp` na `ws`. Imeongeza kipengele cha `overrides` cha npm kuufanya `shell-quote@1.8.4` uliorekebishwa kuondoa onyo la hatari lililobaki lililokuwa linatokana na `concurrently`; imesababisha upya faili zote za kufunga (sasa 0 udhaifu)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ilisahihisha `qs` (kati) ya mtiririko kwa toleo lililotengenezwa upya
- **03-GettingStarted/samples/javascript**: `npm audit fix` ilisahihisha `hono` (kati) ya mtiririko kwa toleo lililotengenezwa upya
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ilisahihisha `form-data` (kubwa) ya mtiririko kwa toleo lililotengenezwa upya
- **03-GettingStarted/11-simple-auth/solution/typescript**: Ilizalisha faili iliyokosekana ya `package-lock.json` ili mradi uweze kurudiwa na kuangaliwa (0 udhaifu)

#### Marekebisho ya Usalama wa Kiwango cha Msimbo (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Imeondoa `shell=True` kutoka kwa zana ya `open_in_vscode`. Awali `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` iliruhusu metacharacters za shell katika njia ya folda kutafsiriwa na `cmd.exe` (njia ya kuingiza amri zisizotarajiwa). Sasa inanzisha moja kwa moja `Code.exe` iliyotatuliwa na folda kama hoja — bila shell — ambayo ni sawa kiufundi na salama

#### Ukaguzi wa Kutegemea kwa Python

- Imekagua kila seti ya mahitaji ya Python kwa kutumia `pip-audit`. `05-AdvancedTopics` na `03-GettingStarted/samples/python` ziliripoti **hakuna udhaifu unaojulikana** (mikoa yao ya `mcp` / `httpx` / `pydantic` / `python-dotenv` inaleta matoleo ya sasa yaliyorekebishwa)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` ilibaini kutegemea kwa mtiririko wa **`werkzeug` 3.1.1** na arifa tatu za `safe_join` kuhusu majina ya kifaa cha Windows kuzuia huduma (DoS) — `CVE-2025-66221`, `CVE-2026-21860`, na `CVE-2026-27199` (vyote vimekamilishwa katika 3.1.6). Imeongeza pin maalum ya usalama `werkzeug>=3.1.6` ili toleo lililotengenezwa lipatikane; ilihakikisha vikwazo vinafunguka vizuri na stack ya `chainlit` / `mcp` / `semantic-kernel`

### Kubadilishwa kwa Jina la Bidhaa

Imesasisha maudhui yote ya mitaala kuendana na kubadilishwa jina la bidhaa za Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Imesasisha kiungo cha jamii ya Discord
- **AGENTS.md**: Imesasisha rejeleo la seva ya Discord
- **README.md**: Imesasisha rejeleo za mazingira ya teknolojia
- **study_guide.md**: Imesasisha rejeleo za utafiti wa kesi
- **05-AdvancedTopics/README.md**: Imesasisha kichwa cha Moduli 5.13 na maelezo
- **05-AdvancedTopics/mcp-integration/README.md**: Imesasisha kichwa cha sehemu na maelezo
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kubadilishwa kamili kwa kichwa cha moduli na maudhui
- **05-AdvancedTopics/mcp-security-entra/README.md**: Imesasisha kiungo cha rufaa
- **07-LessonsfromEarlyAdoption/README.md**: Imesasisha rejeleo za utafiti wa kesi
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Imesasisha kichwa cha Sehemu 9, bages, na uwezo
- **08-BestPractices/README.md**: Imesasisha kiungo cha jamii ya Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Imesasisha rejeleo la chaneli ya Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Imesasisha rejeleo la uanzishaji wa modeli
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Imesasisha jedwali la Huduma za AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Imesasisha rejeleo za rasilimali

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension kwa VS Code
- **README.md**: Imesasisha rejeleo kuu za mitaala
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Imesasisha kichwa cha moduli, muhtasari, na vichwa vya moduli vyote
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Imesasisha kichwa, malengo ya kujifunza, maelekezo ya usanidi, na rasilimali
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Imesasisha kichwa, malengo ya kujifunza, jedwali la mwenyeji wa MCP, na marejeleo ya muktadha
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Imesasisha kichwa, bages, masharti, na rasilimali
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Imesasisha rejeleo za Mjenzi wa Wakala na kiungo cha maoni
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Imesasisha masharti na rejeleo za upanuzi

---

## Aprili 11, 2026

### Somo Jipya, Marekebisho ya Hati, na Sasisho za Kutegemea

#### Maudhui Mapya ya Mitaala Yameongezwa

**Moduli 05 - Mada za Juu**
- **Somo 5.17: Uwezo wa Kujadiliana wa Wakala Wengi wenye Mapambano na MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Mwongozo mpana mpya unaofunika muundo wa mjadala wa upinzani kwa mifumo ya wakala wengi
  - Mchoro wa usanifu wa Mermaid: mawakala wawili → seva ya MCP iliyoshirikiwa → nakala ya mjadala → hakimu → uamuzi
  - Seva ya zana ya MCP iliyoshirikiwa (`web_search` + `run_python`) imetekelezwa kwa Python na TypeScript
  - Maelekezo ya mfumo yanayopingana (KWA / DHIDI / Hakimu) na mahitaji wazi ya matumizi ya zana
  - Muandaji wa mjadala katika Python, TypeScript, na C# akisimamia raundi na kuongoza hoja
  - Muunganisho wa MCP `ClientSession` kwa muandaji kwa wito halisi wa zana
  - Jedwali la matumizi (ugunduzi wa utengenezaji, mfano wa tishio, ukaguzi wa usanifu wa API, uhakiki wa ukweli, uchaguzi wa teknolojia)
  - Masuala ya usalama: utekelezaji salama, uthibitishaji wa wito wa zana, ukomo wa kiwango, kumbukumbu za ukaguzi
  - Mazoezi yaliyopangwa na matukio matatu ya vitendo (ukaguzi wa msimbo, uamuzi wa usanifu, ukaguzaji wa maudhui)

#### Marekebisho ya Hati

**Moduli 03 - Kuanza**
- **05-stdio-server/README.md**: Imerekebisha mfano usiokamilika wa seva ya TypeScript stdio — iliongeza uanzishaji usiokuwepo wa usafirishaji (`new StdioServerTransport()`) na wito wa `server.connect(transport)` kulingana na mifano ya Python na .NET iliyopo katika sehemu hiyo hiyo
- **14-sampling/README.md**: Imerekebisha makosa ya tahajia — Imebadilisha `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Sasisho za Mitaala

**README.md Kuu**
- Iliongeza kipengee 5.17 (Uwezo wa Kujadiliana wa Wakala Wengi wenye Mapambano na MCP) kwenye jedwali la mitaala kwa kiungo moja kwa moja kwa somo jipya

**05-AdvancedTopics/README.md**
- Iliongeza mstari wa Somo 5.17 kwenye jedwali la masomo

**study_guide.md**
- Iliongeza mada ya Uwezo wa Kujadiliana wa Wakala Wengi kwenye ramani ya mawazo na maelezo ya maandishi ya Mada za Juu

#### Marekebisho ya Msimbo na Usalama

**Moduli 05 - Mawakala wa Kupinga (`mcp-adversarial-agents`)**
- **Kurekebisha usalama — kuingizwa kwa amri**: Ilibadilisha uingilishaji wa shell wa `execSync` na `execFile` + `promisify` katika chombo cha TypeScript `run_python`, ikiondoa sehemu ya kuingizwa kwa amri (msimbo unaodhibitiwa na LLM sasa hupitishwa kama kipengele halisi cha argv bila ushirikiano wa shell)
- **Uunganishaji wa mzunguko wa chombo cha MCP**: Imesasisha mpangilio wa mjadala wa Python kutumia mteja wa `AsyncAnthropic` (kubadilisha `Anthropic` ya kushikilia), kupitisha `ClientSession` ya moja kwa moja kwa kila zamu ya wakala, kupata ufafanuzi wa zana kupitia `session.list_tools()` kila zamu, na kusambaza vipengele vya `tool_use` kupitia `session.call_tool()` katika mzunguko hadi mfano uachie jibu la mwisho la maandishi

#### Sasisho za Vitegemezi

- Imesasisha `hono` hadi 4.12.12 katika vifurushi vingi (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Imesasisha `@hono/node-server` kutoka 1.19.11 hadi 1.19.13 katika vifurushi vya TypeScript
- Imesasisha `cryptography` kutoka 46.0.5 hadi 46.0.7 katika vifurushi vya Python (maabara 3 na 4 za 10-StreamliningAIWorkflows)
- Imesasisha `lodash` kutoka 4.17.23 hadi 4.18.1 kwenye mkaguzi wa 10-StreamliningAIWorkflows

#### Tafsiri

- Imesawazisha tafsiri za lugha zaidi ya 48 na mabadiliko mapya ya chanzo (sasisho la i18n)

---

## Februari 5, 2026

### Uboreshaji wa Uthibitishaji na Uvinjari wa Repositori Nzima

#### Maudhui Mapya ya Mtaala Yameongezwa

**Moduli 03 - Kuanzisha**
- **12-mcp-hosts/README.md**: Mwongozo mpya kamili wa kuweka mazingira ya mwenyeji wa MCP
  - Mifano ya usanidi wa Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Violezo vya usanidi wa JSON kwa wenyeji wakuu wote
  - Jedwali la kulinganisha aina za usafirishaji (stdio, SSE/HTTP, WebSocket)
  - Utatuzi wa matatizo ya kawaida ya muunganisho
  - Mbinu bora za usalama kwa usanidi wa mwenyeji

- **13-mcp-inspector/README.md**: Mwongozo mpya wa urekebishaji wa kasoro kwa MCP Inspector
  - Njia za usakinishaji (npx, npm global, kutoka chanzo)
  - Kuunganisha kwa seva kupitia stdio na HTTP/SSE
  - Vyombo vya majaribio, rasilimali, na mchakato wa maelekezo
  - Muunganisho wa VS Code na MCP Inspector
  - Matukio ya kawaida ya urekebishaji na suluhisho

**Moduli 04 - Utekelezaji wa Kivitendo**
- **pagination/README.md**: Mwongozo mpya wa utekelezaji wa upangaji ukurasa
  - Mifano ya upangaji ukurasa kwa kutumia cursor kwa Python, TypeScript, Java
  - Usimamizi wa upangaji ukurasa upande wa mteja
  - Mikakati ya usanifu wa cursor (isiyo wazi dhidi ya iliyopangwa)
  - Mapendekezo ya kuongeza ufanisi

**Moduli 05 - Mada za Juu**
- **mcp-protocol-features/README.md**: Uchambuzi wa kina wa vipengele vya itifaki mpya
  - Utekelezaji wa taarifa za maendeleo
  - Mifano ya kughairi maombi
  - Violezo vya rasilimali zenye mifano ya URI
  - Usimamizi wa mzunguko wa maisha wa seva
  - Udhibiti wa ngazi za uandishi wa kumbukumbu
  - Mifumo ya kushughulikia makosa na nambari za JSON-RPC

#### Marekebisho ya Uvinjari (faili 24+ zimesasishwa)

**Viambatisho Vikuu vya Moduli**
 Sasa vina viungo kwa somo la kwanza NA moduli inayofuata

**Dhana ndogo za 02-Security**
- Nyaraka zote 5 za ziada za usalama sasa zina sehemu ya "Nini Kifuatacho":

**Faili za 09-CaseStudy**
- Faili zote za masomo ya kesi sasa zina uvinjari mfululizo:

**Maabara za 10-StreamliningAI**
Imeongezwa sehemu ya Nini Kifuatacho katika muhtasari wa Moduli 10 na Moduli 11

#### Marekebisho ya Msimbo na Maudhui

**Sasisho la SDK na Vitegemezi**
Imerekebisha toleo tupu la openai kuwa `^4.95.0`
Imesasisha SDK kutoka `^1.8.0` hadi `>=1.26.0`
Imesasisha vishikizo vya toleo la mcp kuwa `>=1.26.0`

**Marekebisho ya Msimbo**
Imerekebisha mfano usio halali `gpt-4o-mini` kuwa `gpt-4.1-mini`

**Marekebisho ya Maudhui**
Imerekebisha kiungo kilichovunjika `READMEmd` → `README.md`, imerekebisha kichwa cha mtaala `Module 1-3` → `Module 0-3`, imerekebisha njia yenye utofauti wa nafasi
Imeondoa nakala ya yaliyoharibika ya Somo la Kesi 5

**Uboreshaji wa Mwongozo kwa Waanzilishi**
Imeongeza utangulizi sahihi, malengo ya kujifunza, na masharti kwa waanzilishi

#### Sasisho za Mtaala

**README.md Mkuu**
- Imeongeza vipengele 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Vipengele vya Itifaki) kwenye jedwali la mtaala

**Viambatisho vya Moduli**
Imeongeza masomo 12 na 13 kwenye orodha ya masomo
Imeongeza sehemu ya Miongozo ya Vitendo yenye kiungo cha upangaji ukurasa
Imeongeza masomo 5.15 (Usafirishaji wa Kipekee) na 5.16 (Vipengele vya Itifaki)

**study_guide.md**
- Imesasisha ramani ya mawazo pamoja na mada mpya zote: Usanidi wa MCP Hosts, MCP Inspector, Mikakati ya Upangaji Ukurasa, Uchambuzi wa Vipengele vya Itifaki

## Januali 28, 2026

### Mapitio ya Uzingatiaji wa MCP Specification 2025-11-25

#### Maendeleo ya Dhana za Msingi (01-CoreConcepts/)
- **Mteja Mpya wa Msingi - Roots**: Imeongezwa nyaraka kamili juu ya mteja wa msingi wa Roots, kuwezesha seva kuelewa mipaka ya mfumo wa faili na ruhusa za ufikiaji
- **Maelezo ya Zana**: Imeongezwa nyaraka kuhusu maelezo ya tabia za zana (`readOnlyHint`, `destructiveHint`) kwa maamuzi bora ya utekelezaji wa zana
- **Kupiga Simu Zana Katika Sampuli**: Imesasisha nyaraka za Sampuli kuingiza vigezo vya `tools` na `toolChoice` kwa kuitwa kwa zana zinazopangwa na mfano wakati wa maombi ya sampuli
- **Uamsho wa Hali ya URL**: Imeongezwa nyaraka kuhusu uamsho wa hali ya URL kwa mwingiliano wa wavuti wa nje unaoanzishwa na seva
- **Kazi (Jaribio)**: Imeongeza sehemu mpya inayotoa nyaraka ya kipengele cha Kazi jaribio kwa vifuniko vya utekelezaji wa kudumu na urejeshaji wa matokeo kwa kuchelewesha
- **Msaada wa Ikoni**: Imetajwa kwamba zana, rasilimali, violezo vya rasilimali, na maelekezo sasa vinaweza kujumuisha ikoni kama metadata ya ziada

#### Sasisho za Nyaraka
- **README.md**: Imeongeza rejeleo la toleo la MCP Specification 2025-11-25 na maelezo ya utoaji wa toleo kulingana na tarehe
- **study_guide.md**: Imesasisha ramani ya mtaala kuingiza Kazi na Maelezo ya Zana katika sehemu ya Dhana za Msingi; imesasisha alama za nyaraka

#### Uthibitishaji wa Uzingatiaji wa Maelekezo
- **Toleo la Itifaki**: Imethibitisha kwamba nyaraka zote zinazingatia MCP Specification 2025-11-25
- **Muafaka wa Usanifu**: Imethibitisha usahihi wa nyaraka za usanifu wa tabaka mbili (Data Layer + Transport Layer)
- **Nyaraka za Msingi**: Imethibitisha nyaraka za misingi ya seva (Rasilimali, Maelekezo, Zana) na misingi ya mteja (Sampuli, Uamsho, Kumbukumbu, Roots)
- **Mbinu za Usafirishaji**: Imethibitisha usahihi wa nyaraka za usafirishaji wa STDIO na HTTP inayoweza kuchezeshwa
- **Mwongozo wa Usalama**: Imethibitisha muafaka na nyaraka za mbinu bora za usalama wa MCP zilizopo

#### Vipengele Muhimu vya MCP 2025-11-25 Vilivyorekodiwa
- **Ugunduzi wa OpenID Connect**: Ugunduzi wa seva za uthibitishaji kupitia OIDC
- **Nyaraka za Metadata za URI ya Mteja wa OAuth**: Njia iliyopendekezwa ya usajili mteja
- **Schema ya JSON 2020-12**: Lahaja ya chaguo-msingi kwa ufafanuzi wa maelezo ya MCP
- **Mfumo wa Ngazi za SDK**: Vigezo rasmi vya msaada na matengenezo ya vipengele vya SDK
- **Muundo wa Uongozi**: Vikundi vya Kazi na vikundi vya Maslahi vimeformalishwa katika uongozi wa MCP

### Sasisho Kuu la Nyaraka za Usalama (02-Security/)

#### Ulinganisho wa Warsha ya Mkutano wa Usalama wa MCP (Sherpa)
- **Rasilimali Mpya ya Mafunzo ya Vitendo**: Imeunganishwa kabisa na [Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/) katika nyaraka zote za usalama
- **Mwendelezo wa Safari ya Kambi**: Imeelezea mfululizo kamili wa kambi hadi kilele
- **Mlinganisho na OWASP**: Mwongozo wote wa usalama sasa unahusu hatari za Mwongozo wa Usalama wa MCP Azure wa OWASP

#### Uingiliano wa OWASP MCP Top 10
- **Sehemu Mpya**: Imongezwa Jedwali la Hatari 10 za Juu za Usalama wa MCP za OWASP na suluhisho za Azure kwenye README ya Usalama kuu
- **Nyaraka Zinazotegemea Hatari**: Imesasisha mcp-security-controls-2025.md kwa rejeleo za hatari za OWASP MCP kwa kila eneo la usalama
- **Mwongozo wa Muundo**: Imeunganishwa na muundo na mifano ya utekelezaji ya Mwongozo wa Usalama wa MCP Azure wa OWASP

#### Faili za Usalama Zilizosasishwa
- **README.md**: Imeongeza muhtasari wa Warsha ya Sherpa, jedwali la safari ya kambi, muhtasari wa hatari kuu 10 za OWASP MCP, na sehemu ya mafunzo ya vitendo
- **mcp-security-controls-2025.md**: Imesasisha kichwa hadi Februari 2026, kuongeza rejeleo za hatari za OWASP (MCP01-MCP08), kurekebisha tofauti ya toleo la maelezo
- **mcp-security-best-practices-2025.md**: Imeongeza Sherpa na sehemu ya rasilimali za OWASP, imesasisha tarehe
- **mcp-best-practices.md**: Imeongeza sehemu ya mafunzo ya vitendo na viungo vya Sherpa na OWASP
- **azure-content-safety-implementation.md**: Imeongeza rejeleo la OWASP MCP06, muafaka wa Kambi 3 wa Sherpa, na sehemu ya rasilimali za ziada

#### Viungo Vipya vya Rasilimali Vimeongezwa
- [Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/)
- [Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Kurasa za hatari binafsi za OWASP MCP (MCP01-MCP10)

### Muafaka wa Mtaala kwa MCP Specification 2025-11-25

#### Moduli 03 - Kuanzisha
- **Nyaraka za SDK**: Imeongeza Go SDK katika orodha rasmi ya SDK; imesasisha rejeleo zote za SDK kuendana na MCP Specification 2025-11-25
- **Ufafanuzi wa Usafirishaji**: Imesasisha maelezo ya usafirishaji wa STDIO na HTTP Streaming na rejeleo wazi za maelekezo

#### Moduli 04 - Utekelezaji wa Kivitendo
- **Sasisho la SDK**: Imeongeza Go SDK; imesasisha orodha ya SDK na rejeleo la toleo la maelezo
- **Maelezo ya Uidhinishaji**: Imeboresha kiungo cha maelezo ya Uidhinishaji wa MCP hadi toleo la sasa la 2025-11-25

#### Moduli 05 - Mada za Juu
- **Vipengele Vipya**: Imeongeza noti kuhusu vipengele vipya vya MCP Specification 2025-11-25 (Kazi, Maelezo ya Zana, Uamsho wa Hali ya URL, Roots)
- **Rasilimali za Usalama**: Imeongeza viungo vya OWASP MCP Top 10 na warsha ya Sherpa kwenye marejeleo ya ziada

#### Moduli 06 - Michango ya Jamii
- **Orodha ya SDK**: Imeongeza Swift na Rust SDK; imesasisha kiungo cha maelezo hadi 2025-11-25
- **Rejeleo la Maelezo**: Imesasisha kiungo cha MCP Specification hadi URL ya maelezo ya moja kwa moja

#### Moduli 07 - Masomo Kutoka kwa Matumizi ya Mapema
- **Sasisho za Rasilimali**: Imeongeza kiungo MCP Specification 2025-11-25 na OWASP MCP Top 10 kwenye rasilimali za ziada

#### Moduli 08 - Mbinu Bora
- **Toleo la Maelezo**: Imesasisha rejeleo la MCP Specification hadi 2025-11-25
- **Rasilimali za Usalama**: Imeongeza OWASP MCP Top 10 na warsha ya Sherpa kwenye marejeleo ya ziada

#### Moduli 10 - Kuunda Mtiririko wa AI
- **Sasisho la Bibini la Toleo la MCP**: Imebadilisha bibini la toleo la MCP kutoka toleo la SDK (1.9.3) hadi toleo la maelezo (2025-11-25)
- **Viungo vya Rasilimali**: Imeboresha MCP Specification kiungo; imeongeza OWASP MCP Top 10

#### Moduli 11 - Maabara za Mikono MCP Server
- **Rejeleo la Maelezo**: Imeboresha MCP Specification kiungo hadi toleo la 2025-11-25
- **Rasilimali za Usalama**: Imeongeza OWASP MCP Top 10 katika rasilimali rasmi

## Desemba 18, 2025

### Sasisho la Nyaraka za Usalama - MCP Specification 2025-11-25

#### Mbinu Bora za Usalama wa MCP (02-Security/mcp-best-practices.md) - Sasisho la Toleo
- **Sasisho la Toleo la Itifaki**: Imesasisha kurejelea toleo la MCP Specification 2025-11-25 (ilitolewa Novemba 25, 2025)
  - Imesasisha rejeleo zote za toleo kutoka 2025-06-18 hadi 2025-11-25
  - Imesasisha tarehe za nyaraka kutoka Agosti 18, 2025 hadi Desemba 18, 2025
  - Imethibitisha URLs zote za maelezo zinaonyesha nyaraka ya sasa
- **Uthibitishaji wa Maudhui**: Uthibitishaji wa kina wa mbinu bora za usalama dhidi ya viwango vya hivi karibuni
  - **Suluhisho za Usalama za Microsoft**: Imethibitisha neno na viungo vya sasa kwa Prompt Shields (awali "utambuzi wa hatari ya jailbreak"), Azure Content Safety, Microsoft Entra ID, na Azure Key Vault
  - **Usalama wa OAuth 2.1**: Imethibitisha muafaka na mbinu bora za usalama wa OAuth za hivi karibuni
  - **Viwango vya OWASP**: Imethibitisha kustaafu kwa marejeleo ya OWASP Top 10 kwa LLMs
  - **Huduma za Azure**: Imethibitisha viungo vyote vya maelezo ya Microsoft Azure na mbinu bora
- **Muafaka wa Viwango**: Viwango vyote vya usalama vinavyotumika vimebainika kuwa vya sasa
  - Mfumo wa Usimamizi wa Hatari wa AI wa NIST
  - ISO 27001:2022
  - Mbinu Bora za Usalama za OAuth 2.1
  - Miundo ya usalama na utii wa Azure
- **Rasilimali za Utekelezaji**: Imethibitisha viungo vyote vya mwongozo wa utekelezaji na rasilimali
  - Mbinu za uthibitishaji za Azure API Management
  - Mwongozo wa kuingiza Microsoft Entra ID
  - Usimamizi wa siri za Azure Key Vault
  - Mitiririko ya DevSecOps na suluhisho za ufuatiliaji

### Hakikisho la Ubora wa Nyaraka
- **Uzingatiaji wa Maelekezo**: Imethibitisha kwamba mahitaji yote ya MCP ya usalama (MUST/MUST NOT) yamezingatiwa kwa maelezo ya hivi karibuni
- **Uhalali wa Rasilimali**: Imethibitisha viungo vyote vya nje kwa nyaraka za Microsoft, viwango vya usalama, na miongozo ya utekelezaji
- **Ujumuishaji wa Mbinu Bora**: Imethibitisha kufunika kwa kina kwa uthibitishaji, uidhinishaji, hatari maalum za AI, usalama wa mnyororo wa usambazaji, na mifumo ya makampuni

## Oktoba 6, 2025

### Upanuzi wa Sehemu ya Kuanzisha – Matumizi ya Seva za Juu & Uthibitishaji Rahisi

#### Matumizi ya Seva za Juu (03-GettingStarted/10-advanced)
- **Sura Mpya Imeongezwa**: Imetambulisha mwongozo kamili wa matumizi ya seva za MCP za hali ya juu, ikijumuisha usanifu wa seva wa kawaida na wa ngazi ya chini.
  - **Regular vs. Low-Level Server**: Ulinganisho wa kina na mifano ya msimbo katika Python na TypeScript kwa mbinu zote mbili.
  - **Handler-Based Design**: Ufafanuzi wa usimamizi wa zana/rasilimali/maelekezo unaotegemea handler kwa utekelezaji wa seva unaoweza kupanuka na kubadilika.
  - **Practical Patterns**: Mienendo halisi ambapo mifumo ya seva za kiwango cha chini ni ya manufaa kwa vipengele vya hali ya juu na usanifu.

#### Simple Authentication (03-GettingStarted/11-simple-auth)
- **Sura Mpya Imeongezwa**: Mwongozo wa hatua kwa hatua wa kutekeleza uthibitishaji rahisi katika seva za MCP.
  - **Auth Concepts**: Ufafanuzi wazi wa uthibitishaji dhidi ya idhini, na usimamizi wa taarifa za kuingia.
  - **Basic Auth Implementation**: Mifano ya uthibitishaji inayotegemea middleware katika Python (Starlette) na TypeScript (Express), pamoja na sampuli za msimbo.
  - **Progression to Advanced Security**: Mwongozo wa kuanza na uthibitishaji rahisi na kuendelea hadi OAuth 2.1 na RBAC, pamoja na rejeleo za moduli za usalama wa hali ya juu.

Ongezeko hizi hutoa mwongozo wa vitendo, wa moja kwa moja wa kujenga utekelezaji wa seva za MCP zenye nguvu zaidi, salama, na zinazobadilika, zikivuka dhana za msingi hadi mifumo ya utengenezaji wa hali ya juu.

## Septemba 29, 2025

### Maabara za Muunganiko wa Hifadhidata ya MCP Server - Njia Kamili ya Kujifunza kwa Vitendo

#### 11-MCPServerHandsOnLabs - Mtaala Mpya Kamili wa Muunganiko wa Hifadhidata
- **Njia Kamili ya Kujifunza Maabara 13**: Iliongeza mtaala kamili wa vitendo wa kujenga seva za MCP tayari kwa utengenezaji zenye muunganiko wa hifadhidata ya PostgreSQL
  - **Utekelezaji wa Uhalisia Halisi**: Mfano wa matumizi ya uchambuzi wa Zava Retail unaoonyesha mifumo ya daraja la biashara
  - **Mpangilio wa Kukua kwa Kujifunza**:
    - **Maabara 00-03: Misingi** - Utangulizi, Usanifu wa Msingi, Usalama na Multi-Tenancy, Kuandaa Mazingira
    - **Maabara 04-06: Kujenga Seva ya MCP** - Ubunifu wa Hifadhidata & Schema, Utekelezaji wa Seva ya MCP, Maendeleo ya Zana  
    - **Maabara 07-09: Vipengele vya Hali ya Juu** - Muunganiko wa Utafutaji wa Semantiki, Upimaji & Utatuzi wa Hitilafu, Muunganiko wa VS Code
    - **Maabara 10-12: Uzalishaji & Mbinu Bora** - Mikakati ya Ueneaji, Ufuatiliaji & Uwezo wa Kutazamwa, Mbinu Bora & Uboreshaji
  - **Teknolojia za Biashara**: Mfumo wa FastMCP, PostgreSQL na pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Vipengele vya Hali ya Juu**: Usalama wa Ngazi ya Safu (RLS), utafutaji wa semantiki, ufikiaji wa data kwa wapangaji wengi, embeddings za vector, ufuatiliaji wa wakati halisi

#### Ulinganishaji wa Istilahi - Kubadilisha Moduli Kuwa Maabara
- **Sasisho Kamili la Nyaraka**: Imesasisha kwa mfumo nyaraka zote za README katika 11-MCPServerHandsOnLabs kutumia istilahi "Lab" badala ya "Module"
  - **Vichwa vya Sehemu**: Imesasisha "What This Module Covers" kuwa "What This Lab Covers" katika maabara zote 13
  - **Maelezo ya Maudhui**: Iliibadilisha "This module provides..." kuwa "This lab provides..." katika nyaraka zote
  - **Mizani ya Kujifunza**: Imesasisha "By the end of this module..." kuwa "By the end of this lab..."
  - **Viungo vya Kuongoza**: Imebadilisha marejeleo yote ya "Module XX:" kuwa "Lab XX:" katika marejeleo na njia za urambazaji
  - **Ufuatiliaji wa Kukamilika**: Imesasisha "After completing this module..." kuwa "After completing this lab..."
  - **Rejeleo za Kiufundi Zinazoendelea**: Imehifadhi rejeleo za moduli za Python katika faili za usanidi (mfano, `"module": "mcp_server.main"`)

#### Uboreshaji wa Mwongozo wa Kujifunza (study_guide.md)
- **Ramani ya Mtaala kwa Picha**: Imongeza sehemu mpya "11. Database Integration Labs" yenye mwonekano wa muundo kamili wa maabara
- **Muundo wa Hazina ya Faili**: Imesasisha kutoka sehemu kumi hadi kumi na moja za msingi na maelezo ya kina ya 11-MCPServerHandsOnLabs
- **Mwongozo wa Njia ya Kujifunza**: Imekamilisha maelekezo ya urambazaji kufunika sehemu 00-11
- **Ufungaji wa Teknolojia**: Imongeza maelezo ya FastMCP, PostgreSQL, na huduma za Azure
- **Matokeo ya Kujifunza**: Imesisitiza ujenzi wa seva zenye utendaji wa hali ya juu, mifumo ya muunganiko wa hifadhidata, na usalama wa biashara

#### Uboreshaji wa Muundo wa README Mkuu
- **Istilahi za Maabara**: Imesasisha README.md kuu katika 11-MCPServerHandsOnLabs kutumia muundo wa "Lab" mara kwa mara
- **Mpangilio wa Njia ya Kujifunza**: Mpangilio wazi kutoka dhana za msingi hadi utekelezaji wa hali ya juu na utoaji wa uzalishaji
- **Mwelekeo wa Hali ya Uhalisia**: Msisitizo wa kujifunza kwa vitendo kwa kutumia mifumo na teknolojia za daraja la biashara

### Uboreshaji wa Ubora & Ulinganifu wa Nyaraka
- **Msisitizo wa Kujifunza kwa Vitendo**: Umeimarisha njia ya maabara kwa vitendo katika nyaraka zote
- **Msisitizo wa Mifumo ya Biashara**: Imesisitiza utekelezaji wenye uzalishaji tayari na mtazamo wa usalama wa biashara
- **Muunganiko wa Teknolojia**: Ufungaji kamili wa huduma za kisasa za Azure na mifumo ya muunganiko wa AI
- **Mpangilio wa Kujifunza**: Njia wazi na iliyopangwa kutoka dhana za msingi hadi utoaji wa uzalishaji

## Septemba 26, 2025

### Uboreshaji wa Masomo ya Kesi - Muunganiko wa GitHub MCP Registry

#### Masomo ya Kesi (09-CaseStudy/) - Msisitizo wa Ukuaji wa Ekosistimu
- **README.md**: Upanuzi mkubwa kwa somo kamili la kesi ya GitHub MCP Registry
  - **Somo Kamili la Kesi ya GitHub MCP Registry**: Somo jipya kamili linalochunguza uzinduzi wa GitHub MCP Registry Septemba 2025
    - **Uchambuzi wa Tatizo**: Uchambuzi wa kina wa matatizo ya kugundua na kutengeneza seva za MCP zilizo kugawanyika
    - **Usanifu wa Suluhisho**: Mbinu ya usajili wa GitHub iliyojumuishwa na usakinishaji wa mara moja kwa VS Code
    - **Athari za Kibiashara**: Maboresho yanayoweza kupimika katika kuanzisha wahusika na uzalishaji kazi
    - **Thamani ya Mkakati**: Msisitizo wa utoaji wa wakala wa moduli na ushirikiano wa zana mbalimbali
    - **Ukuaji wa Ekosistimu**: Msimamo kama msingi wa jukwaa la ujumuishaji wa wakala
  - **Muundo Ulioboreshwa wa Masomo ya Kesi**: Imesasisha masomo yote saba ya kesi kwa mtindo thabiti na maelezo kamili
    - Wakala wa Safari wa Azure AI: Msisitizo wa kupanga wakala wengi
    - Muunganiko wa Azure DevOps: Msisitizo wa mchakato wa kazi
    - Upataji wa Nyaraka kwa Wakati Halisi: Utekelezaji wa mteja wa mstari wa amri wa Python
    - Mzalishaji wa Mpango wa Masomo wa Mazungumzo: App ya mtandao ya Chainlit
    - Nyaraka za Kuhaririwa: Muunganiko wa VS Code na GitHub Copilot
    - Usimamizi wa Azure API: Mifumo ya muunganiko ya API ya biashara
    - GitHub MCP Registry: Ukuaji wa ekosistimu na jukwaa la jamii
  - **Hitimisho Kamili**: Sehemu ya hitimisho imeandikwa upya ikisisitiza masomo saba ya kesi yanayogusa vipengele mbalimbali vya utekelezaji wa MCP
    - Muunganiko wa Biashara, Utaratibu wa Wakala Wengi, Uzalishaji wa Waendelezaji
    - Ukuaji wa Ekosistimu, Ugawaji wa Maombi ya Elimu
    - Mwelekeo wa kina katika mifumo ya usanifu, mbinu za utekelezaji, na mbinu bora
    - Msisitizo wa MCP kama itifaki iliyo imara na tayari kwa kutumia uzalishaji

#### Sasisho la Mwongozo wa Kujifunza (study_guide.md)
- **Ramani ya Mtaala kwa Picha**: Imesasisha ramani ya mawazo kuongeza GitHub MCP Registry katika sehemu ya Masomo ya Kesi
- **Maelezo ya Masomo ya Kesi**: Yameboreshwa kutoka maelezo ya jumla hadi kugawanywa kwa kina kwa masomo saba kamili ya kesi
- **Muundo wa Hazina ya Faili**: Sehemu ya 10 imesasishwa kuonyesha uangalizi kamili wa masomo ya kesi na maelezo ya utekelezaji husika
- **Muunganiko wa Mabadiliko**: Imeongeza kipengele cha tarehe 26 Septemba, 2025 kinacho eleza kuongeza GitHub MCP Registry na uboreshaji wa masomo ya kesi
- **Sasisho la Tarehe**: Muda wa chini umechaguliwa kufuatana na marekebisho ya hivi karibuni (26 Septemba, 2025)

### Uboreshaji wa Ubora wa Nyaraka
- **Ulinganifu Umeimarishwa**: Umeweka mtindo thabiti wa masomo ya kesi na muundo katika mifano saba yote
- **Muundo Kamili**: Masomo ya kesi sasa yanalenga biashara, uzalishaji wa waendelezaji, na ukuaji wa ekosistimu
- **Msimamo wa Kimkakati**: Msisitizo ulioboreshwa juu ya MCP kama msingi wa msingi wa usambazaji wa mifumo ya wakala
- **Muunganiko wa Rasilimali**: Imesasisha rasilimali za ziada kuongeza kiungo cha GitHub MCP Registry

## Septemba 15, 2025

### Upanuzi wa Mada za Hali ya Juu - Usafirishaji Maalum & Ufundi wa Muktadha

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Mwongozo Mpya wa Utekelezaji wa Hali ya Juu
- **README.md**: Mwongozo kamili wa utekelezaji wa mifumo maalum ya usafirishaji wa MCP
  - **Usafirishaji wa Azure Event Grid**: Utekelezaji kamili wa usafirishaji wa tukio usio na seva
    - Mifano ya C#, TypeScript, na Python na muunganiko wa Azure Functions
    - Mifumo ya usanifu inayotegemea tukio kwa suluhisho za MCP zinazoweza kupanuka
    - Kupokea webhook na usimamizi wa ujumbe wa kusukuma
  - **Usafirishaji wa Azure Event Hubs**: Utekelezaji wa usafirishaji wa mtiririko wa hali ya juu
    - Uwezo wa mtiririko wa wakati halisi kwa hali za ucheleweshaji mdogo
    - Mikakati ya kugawa sehemu na usimamizi wa alama za kache
    - Ukusanyaji wa ujumbe na uboreshaji wa utendaji
  - **Mifumo ya Muunganiko wa Biashara**: Mifano ya usanifu tayari kwa utengenezaji
    - Usindikaji wa MCP ulioenezwa katika Azure Functions nyingi
    - Mifumo ya usafirishaji ya mseto inayojumuisha aina mbalimbali za usafirishaji
    - Mikakati ya uimara wa ujumbe, uaminifu, na usimamizi wa makosa
  - **Usalama & Ufuatiliaji**: Muunganiko wa Azure Key Vault na mifumo ya kutazamwa
    - Uthibitishaji wa utambulisho ulioendeshwa na ruhusa ya chini kabisa
    - Ufuatiliaji wa telemetry na utendaji kwa Application Insights
    - Vipunguza mizunguko na mifumo ya uvumilivu makosa
  - **Mifumo ya Upimaji**: Mikakati kamili ya upimaji kwa usafirishaji maalum
    - Upimaji wa vipande na matumizi ya mifumo ya kuiga na kudanganya
    - Upimaji wa muunganiko na Azure Test Containers
    - Misingi ya upimaji wa utendaji na mzigo

#### Ufundi wa Muktadha (05-AdvancedTopics/mcp-contextengineering/) - Disipilini Inayoibuka ya AI
- **README.md**: Uchunguzi kamili wa ufundi wa muktadha kama uwanja unaochipuka
  - **Kanuni za Msingi**: Kushirikiana kamili kwa muktadha, ufahamu wa maamuzi ya hatua, na usimamizi wa dirisha la muktadha
  - **Ulinganifu na Itifaki ya MCP**: Jinsi muundo wa MCP unavyoshughulikia changamoto za ufundi wa muktadha
    - Vizingiti vya dirisha la muktadha na mikakati ya mzigo wa hatua
    - Uamuzi wa umuhimu na upokeaji wa muktadha unaobadilika
    - Usimamizi wa muktadha wa njia nyingi na masuala ya usalama
  - **Mbinu za Utekelezaji**: Mifumo ya mtiririko mmoja dhidi ya wakala wengi
    - Mbinu za kugawanya na kuweka kipaumbele kwa vipande vya muktadha
    - Mzigo wa hatua wa muktadha na mikakati ya kukandamiza
    - Mbinu za muktadha zenye tabaka na uboreshaji wa upokeaji
  - **Mfumo wa Upimaji**: Metriki zinazochipuka kwa tathmini ya ufanisi wa muktadha
    - Ufanisi wa pembejeo, utendaji, ubora, na uzoefu wa mtumiaji
    - Mbinu za majaribio kwa uboreshaji wa muktadha
    - Uchambuzi wa kushindwa na mbinu za kuboresha

#### Sasisho la Urambazaji wa Mtaala (README.md)
- **Muundo wa Moduli ulioboreshwa**: Imesasisha jedwali la mtaala kuongeza mada mpya za hali ya juu
  - Iliongeza Ufundi wa Muktadha (5.14) na Usafirishaji Maalum (5.15)
  - Muundo ulio thabiti na viungo vya urambazaji katika moduli zote
  - Maelezo yametengenezwa kufanana na wigo wa maudhui ya sasa

### Uboreshaji wa Muundo wa Saraka
- **Kutatua Msimbo**: Imebadilisha jina "mcp transport" kuwa "mcp-transport" ili kulingana na saraka nyingine za mada za hali ya juu
- **Mpangilio wa Maudhui**: Saraka zote za 05-AdvancedTopics sasa zifuata muundo unaofanana (mcp-[topic])

### Maboresho ya Ubora wa Nyaraka
- **Ulinganifu na Mwongozo wa MCP**: Yote maandishi mapya yanarejelea Mafafanuzi ya MCP ya tarehe 2025-06-18
- **Mifano ya Lugha Mbalimbali**: Sampuli kamili za msimbo katika C#, TypeScript, na Python
- **Msisitizo wa Biashara**: Mifumo tayari kwa utengenezaji na muunganiko wa wingu la Azure
- **Nyaraka za kuona**: Michoro ya Mermaid kwa usanifu na mtiririko wa michakato

## Agosti 18, 2025

### Sasisho Kamili la Nyaraka - Viwango vya MCP 2025-06-18

#### Mazoea Bora ya Usalama wa MCP (02-Security/) - Uboreshaji Kamili wa Kisasa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Uandishi upya kamili kulingana na Maelezo ya MCP 2025-06-18
  - **Mahitaji Yasiyopingika**: Imeongeza mahitaji ya wazi YA KULAZIMISHA/YASIYO KULAZIMISHA kutoka mwongozo rasmi na alama za kuona zilizo wazi
  - **Mazoea 12 Muhimu ya Usalama**: Imepangwa upya kutoka orodha ya vitu 15 hadi maeneo kamili ya usalama
    - Usalama wa Tokeni & Uthibitishaji kwa muunganiko wa mtoa utambulisho wa nje
    - Usimamizi wa Kikao & Usalama wa Usafirishaji kwa mahitaji ya usimbaji fiche
    - Ulinzi wa Kihalisia la AI kwa muunganiko wa Microsoft Prompt Shields
    - Udhibiti wa Mipaka & Ruhusa kwa kanuni ya ruhusa ya chini kabisa
    - Usalama wa Yaliyomo & Ufuatiliaji na muunganiko wa Azure Content Safety
    - Usalama wa Mnyororo wa Ugavi kwa ukaguzi wa vipengele kamili
    - Usalama wa OAuth & Kuzuia Shambulio la Confused Deputy kwa utekelezaji wa PKCE
    - Majibu na Urejeshaji wa Tukio kwa uwezo wa kiotomatiki
    - Uzingatiaji & Utawala kwa muunganisho wa kanuni
    - Udhibiti wa Usalama wa Hali ya Juu kwa usanifu wa zero trust
    - Muunganiko wa Mfumo wa Usalama wa Microsoft kwa suluhisho kamili
    - Mageuzi Endelevu ya Usalama kwa mazoea ya kuendeshwa kifedha
  - **Suluhisho za Usalama za Microsoft**: Mwongozo wa muunganiko wa Prompt Shields, Azure Content Safety, Entra ID, na GitHub Advanced Security
  - **Rasilimali za Utekelezaji**: Viungo vya rasilimali vilivyowekwa kwa makundi ya Nyaraka Rasmi za MCP, Suluhisho za Usalama za Microsoft, Viwango vya Usalama, na Mwongozo wa Utekelezaji

#### Udhibiti wa Usalama wa Hali ya Juu (02-Security/) - Utekelezaji wa Biashara
- **MCP-SECURITY-CONTROLS-2025.md**: Uboreshaji kamili wa mfumo wa usalama wa daraja la biashara
  - **Maeneo 9 Kamili ya Usalama**: Kuongezeka kutoka kwa udhibiti wa msingi hadi mfumo wa kina wa biashara
    - Uthibitishaji & Udhibiti wa Ruhusa wa Hali ya Juu kwa muunganiko wa Microsoft Entra ID
    - Usalama wa Tokeni & Udhibiti wa Kupita Tokeni kwa uthibitisho wa kina
    - Udhibiti wa Usalama wa Kikao kwa kuzuia uibaji
    - Udhibiti wa Usalama wa AI kupambana na sindano za maelekezo na sumu ya zana
    - Kuzuia Shambulio la Confused Deputy na usalama wa wakala wa OAuth
    - Usalama wa Utekelezaji wa Zana kwa sanduku la mchanga na kutengwa
    - Udhibiti wa Usalama wa Mnyororo wa Ugavi kwa ukaguzi wa utegemezi
    - Udhibiti wa Ufuatiliaji & Ugunduzi kwa muunganiko wa SIEM
    - Majibu na Urejeshaji wa Tukio yenye uwezo wa kiotomatiki
  - **Mifano ya Utekelezaji**: Imeongeza miundo ya usanidi wa YAML na mifano ya msimbo kwa undani
  - **Muunganiko wa Suluhisho za Microsoft**: Ufungaji wa huduma za usalama za Azure, GitHub Advanced Security, na usimamizi wa utambulisho wa biashara

#### Mada za Hali ya Juu za Usalama (05-AdvancedTopics/mcp-security/) - Utekelezaji Tayari kwa Uzalishaji
- **README.md**: Uandishi upya kamili kwa utekelezaji wa usalama wa biashara
  - **Ulinganifu na Maelezo ya Sasa**: Imesasishwa kulingana na Maelezo ya MCP 2025-06-18 na mahitaji ya usalama yasiyoweza kuepukika
  - **Uthibitishaji ulioimarishwa**: Muunganiko wa Microsoft Entra ID na mifano kamili ya .NET na Java Spring Security
  - **Muunganiko wa Usalama wa AI**: Utekelezaji wa Microsoft Prompt Shields na Azure Content Safety kwa mifano ya kina ya Python
  - **Kupambana na Vitisho vya Hali ya Juu**: Mifano kamili ya utekelezaji wa
    - Kuzuia Shambulio la Confused Deputy kwa PKCE na uthibitishaji wa ridhaa ya mtumiaji
    - Kuzuia Kupita Tokeni kwa uthibitishaji wa hadhira na usimamizi wa tokeni salama
    - Kuzuia Uchapaji Kikao kwa kufunga kwa kriptografia na uchambuzi wa mwenendo
  - **Uingizaji wa Usalama wa Kampuni**: Ufuatiliaji wa Azure Application Insights, mistari ya kugundua vitisho, na usalama wa mnyororo wa ugavi
  - **Orodha ya Ukaguzi wa Utekelezaji**: Udhibiti wa usalama uliodhibitishwa dhidi ya uliopendekezwa kwa manufaa ya mazingira ya usalama ya Microsoft

### Ubora wa Nyaraka & Ulinganifu wa Viwango
- **Rejeleo za Maelezo**: Kurekebisha marejeleo yote kwa MCP Specification 2025-06-18 ya sasa
- **Mazingira ya Usalama ya Microsoft**: Mwongozo ulioboreshwa wa kujumuisha katika nyaraka zote za usalama
- **Utekelezaji wa Vitendo**: Ongeza mifano ya kina ya msimbo kwa .NET, Java, na Python na mifumo ya kampuni
- **Mpangilio wa Rasilimali**: Kategorization kamili ya nyaraka rasmi, viwango vya usalama, na miongozo ya utekelezaji
- **Viashiria vya Kuona**: Uwekaji alama wazi wa matakwa ya lazima dhidi ya mazoea yanayopendekezwa


#### Dhana za Msingi (01-CoreConcepts/) - Uboreshaji Kamili wa Kisasa
- **Marekebisho ya Toleo la Itifaki**: Imebadilishwa kurejelea MCP Specification 2025-06-18 ya sasa kwa ufuatiliaji wa tarehe (muundo wa YYYY-MM-DD)
- **Usahihi wa Usaidizi**: Maelezo bora ya Hosts, Clients, na Servers kuakisi mifumo ya sasa ya usanifu wa MCP
  - Hosts sasa zinaelezwa wazi kama programu za AI zinazoandaa muunganisho wa wateja wengi wa MCP
  - Wateja wanaelezewa kama wanakopesha itifaki wanaoshikilia uhusiano wa moja kwa moja na seva
  - Seva zimeboreshwa na hali za usambazaji wa ndani dhidi ya mbali
- **Marekebisho ya Primitive**: Uboreshaji kamili wa primitives za seva na wateja
  - Primitives za Seva: Rasilimali (chanzo cha data), Prompts (vitembeleo), Vifaa (fungu la utekelezaji) kwa maelezo ya kina na mifano
  - Primitives za Mteja: Sampuli (kumaliza LLM), Utambuzi (maingizo ya mtumiaji), Kufuata (ugunduzi/ufuatiliaji)
  - Imeboreshwa na mifumo ya sasa ya kugundua (`*/list`), kupata (`*/get`), na kutekeleza (`*/call`)
- **Usanifu wa Itifaki**: Mkono wa tabaka mbili wa usanifu
  - Tabaka la Data: Msingi wa JSON-RPC 2.0 na usimamizi wa mizunguko ya maisha na primitives
  - Tabaka la Usafirishaji: STDIO (ndani ya eneo) na HTTP inayoweza kusogezwa na SSE (mbali) kama njia za usafirishaji
- **Mfumo wa Usalama**: Kanuni za usalama kamili ikijumuisha ridhaa wazi ya mtumiaji, ulinzi wa faragha ya data, usalama wa utekelezaji wa zana, na usalama wa tabaka la usafirishaji
- **Mifumo ya Mawasiliano**: Ujumbe wa itifaki umeboreshwa kuonesha awamu za kuanzisha, kugundua, kutekeleza, na arifa
- **Mifano ya Msimbo**: Mifano ya lugha nyingi imesasishwa (.NET, Java, Python, JavaScript) kuakisi mifumo mpya ya MCP SDK

#### Usalama (02-Security/) - Uboreshaji Kamili wa Usalama  
- **Ulinganifu wa Viwango**: Ulinganifu kamili na mahitaji ya usalama ya MCP Specification 2025-06-18
- **Mageuzi ya Uthibitishaji**: Mageuzi yaliyoripotiwa kutoka seva zilizotengenezwa kwa desturi za OAuth hadi utumwa wa mtoa utambulisho wa nje (Microsoft Entra ID)
- **Uchambuzi wa Vitisho vya AI**: Uzingatiaji ulioboreshwa wa mikondo ya mashambulizi ya AI ya kisasa
  - Mambo ya kina ya mashambulizi ya kuingiza prompts na mifano halisi
  - Mbinu za sumu ya zana na mifano ya mashambulizi ya "rug pull"
  - Sumukizi wa dirisha la muktadha na mashambulizi ya kuchanganya modeli
- **Suluhisho za Usalama za AI za Microsoft**: Ufungaji kamili wa mazingira ya usalama ya Microsoft
  - AI Prompt Shields zenye kugundua kisasa, kuangazia, na mbinu za mzunguko
  - Mifumo ya kuingiza Azure Content Safety
  - Usalama wa Juu wa GitHub kwa ulinzi wa mnyororo wa ugavi
- **Kuzuia Vitisho vya Juu**: Udhibiti wa usalama wa kina kwa
  - Kuchafuliwa kwa kikao kwa hali za mashambulizi maalum za MCP na mahitaji ya kitambulisho cha kikao kwa kriptografia
  - Matatizo ya wakili aliyechanganyikiwa katika hali za wakala wa MCP na mahitaji wazi ya ridhaa
  - Udhaifu wa kuingiza tokeni kwa udhibiti wa uthibitisho wa lazima
- **Usalama wa Mnyororo wa Ugavi**: Upanuzi wa ulinzi wa mnyororo wa AI ikijumuisha mifano ya msingi, huduma za embeddings, watoa muktadha, na API za watu wa tatu
- **Usalama wa Msingi**: Mwongozo ulioboreshwa wa ujumuishaji na mifumo ya usalama wa kampuni ikijumuisha usanifu wa kutokuwa na imani (zero trust) na mazingira ya usalama ya Microsoft
- **Mpangilio wa Rasilimali**: Viungo vya rasilimali vimekusanywa kwa makundi kwa aina (Nyaraka Rasmi, Viwango, Utafiti, Suluhisho za Microsoft, Miongozo ya Utekelezaji)

### Maboresho ya Ubora wa Nyaraka
- **Malengo ya Kujifunza Yaliyojengwa**: Malengo ya kujifunza yaliyoimarishwa na matokeo maalum, yanayoweza kutekelezeka
- **Rejeleo Mbalimbali**: Viungo viliongezwa kati ya mada zinazohusiana za usalama na dhana za msingi
- **Taarifa za Sasa**: Marekebisho ya tarehe zote na viungo vya maelezo kwa viwango vya sasa
- **Mwongozo wa Utekelezaji**: Mwongozo maalum wa utekelezaji uliyoongezwa katika sehemu zote mbili

## Julai 16, 2025

### README na Maboresho ya Uelekezaji
- Muundo kamili mpya wa uelekezaji wa mitaala katika README.md
- Kuondolewa kwa lebo za `<details>` na kufanyika kwa muundo wa meza unaoeleweka zaidi
- Kuanzisha chaguzi mbadala za muundo katika folda mpya "alternative_layouts"
- Ongeza mifano ya uelekezaji ya kadi, tabulated, na mtindo wa accordion
- Sasisha sehemu ya muundo wa hifadhidata ili kujumuisha faili zote za hivi karibuni
- Boresha sehemu ya "Jinsi ya Kutumia Mitaala Hii" kwa mapendekezo wazi
- Sasisha viungo vya mwongozo wa MCP kwa URL sahihi
- Ongeza sehemu ya Uhandisi wa Muktadha (5.14) katika muundo wa mitaala

### Maboresho ya Mwongozo wa Kujifunza
- Mwongozo wa kujifunza umetubirishwa kabisa kwa kuendana na muundo wa sasa wa hifadhidata
- Ongeza sehemu mpya za Wateja wa MCP na Zana, na Seva Maarufu za MCP
- Sasisha Ramani ya Mitaala ya Kuona kuakisi mada zote kwa usahihi
- Boreshwa maelezo ya Mada za Juu ili kufunika maeneo yote maalum
- Sasisha sehemu ya Uchunguzi wa Kesi ili kuonyesha mifano halisi
- Ongeza orodha kamili ya mabadiliko haya

### Michango ya Jamii (06-CommunityContributions/)
- Ongeza taarifa za kina kuhusu seva za MCP kwa uzalishaji wa picha
- Ongeza sehemu kamili ya matumizi ya Claude katika VSCode
- Ongeza miongozo ya usanidi na matumizi ya mteja wa terminal Cline
- Sasisha sehemu ya mteja MCP kujumuisha chaguzi zote maarufu za mteja
- Boreshwa mifano ya michango kwa sampuli sahihi zaidi za msimbo

### Mada Zaidi (05-AdvancedTopics/)
- Kupangilia folda zote za mada maalum kwa majina yanayolingana
- Ongeza nyenzo na mifano ya uhandisi wa muktadha
- Ongeza nyaraka za ujumuishaji wa wakala Foundry
- Boreshwa nyaraka za uingizaji wa usalama za Entra ID

## Juni 11, 2025

### Uundaji wa Awali
- Kutolewa toleo la kwanza la mitaala ya MCP kwa Waanzilishi
- Kuunda muundo wa msingi wa sehemu 10 kuu
- Kutekeleza Ramani ya Mitaala ya Kuona kwa uelekezaji
- Ongeza miradi ya awali ya mfano katika lugha nyingi za programu

### Kuanzisha (03-GettingStarted/)
- Kuunda mifano ya kwanza ya utekelezaji wa seva
- Ongeza mwongozo wa maendeleo wa mteja
- Kujumuisha maelekezo ya ujumuishaji wa mteja LLM
- Ongeza nyaraka za ujumuishaji wa VS Code
- Kutekeleza mifano ya Server-Sent Events (SSE)

### Dhana za Msingi (01-CoreConcepts/)
- Ongeza maelezo ya kina ya usanifu wa mteja-seva
- Kuandaa nyaraka juu ya vipengele muhimu vya itifaki
- Kurekodi mifumo ya ujumbe katika MCP

## Mei 23, 2025

### Muundo wa Hifadhidata
- Kuanzisha hifadhidata na muundo wa folda wa msingi
- Kuunda faili za README kwa kila sehemu kuu
- Kuweka miundombinu ya tafsiri
- Ongeza mali za picha na michoro

### Nyaraka
- Kuunda README.md ya awali na muhtasari wa mitaala
- Ongeza CODE_OF_CONDUCT.md na SECURITY.md
- Kuweka SUPPORT.md na mwongozo wa kupata msaada
- Kuunda muundo wa mwongozo wa kujifunza wa awali

## Aprili 15, 2025

### Mipango na Mfumo
- Mipango ya awali ya mitaala ya MCP kwa Waanzilishi
- Kufafanua malengo ya kujifunza na hadhira lengwa
- Kupanga muundo wa sehemu 10 wa mitaala
- Kuendeleza mfumo wa dhana kwa mifano na uchunguzi wa kesi
- Kuunda mifano ya kwanza ya majaribio kwa dhana muhimu

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->