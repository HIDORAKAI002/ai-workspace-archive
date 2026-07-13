# Mabadiliko: MCP kwa Mtaala wa Waanzilishi

Hati hii hutumika kama rekodi ya mabadiliko yote muhimu yaliyofanywa kwa mtaala wa Model Context Protocol (MCP) kwa Waanzilishi. Mabadiliko yameandikwa kwa mpangilio wa kinyume wa kihistoria (mabadiliko mapya kwanza).

## Julai 2, 2026

### Somo Jipya: Mwanaume Mkaguzi wa Utoaji wa Kielelezo wa MCP wa 2026-07-28

Imekuwepo na maelezo kuhusu mwanaume mkaguzi wa utoaji wa kielelezo wa MCP wa tarehe `2026-07-28` (ulimwengu ulitangazwa Mei 21, 2026; utoaji wa mwisho umepangwa Julai 28, 2026), uliopunguzwa kutoka kwenye [chapisho rasmi la blogu](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Msingi wa mtaala unabaki **MCP Specification 2025-11-25** hadi toleo jipya litakapotolewa, hivyo huu unaonyeshwa kama mwongozo wa kuangalia mbele badala ya kuandika upya masomo yaliyopo.

- **Mpya**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — somo kamili linalofunika msingi wa itifaki usiokuwa na nafasi (kutoa mchakato wa `initialize` na `Mcp-Session-Id`), vichwa vipya vya urudishaji `Mcp-Method`/`Mcp-Name`, metadata ya kuhifadhi `ttlMs`/`cacheScope`, W3C Trace Context katika `_meta`, mfumo rasmi wa Miongezeo (MCP Apps na kiendelezi kipya cha Kazi), SEPs sita za kuimarisha idhini, kutolewa rasmi kwa Roots/Sampling/Logging, na kuhamia kwenye muundo kamili wa JSON Schema 2020-12 kwa miundo ya zana.
- **Imesasishwa** na viashiria vya kuangalia mbele vinavyohusiana na somo jipya:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): taarifa kuhusu toleo la itifaki, sehemu za Sampling/Roots/Logging/Tasks, na "Nini kinachofuata"
  - [02-Security/README.md](./02-Security/README.md): kiashirio cha kuimarisha idhini
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): kiashirio cha usafirishaji usio na nafasi
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): kiashirio cha kutolewa kwa Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): kiashirio cha kutolewa kwa Logging na kiendelezi cha Kazi
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): kiashirio cha usafirishaji/usanidi wa kikao usio na nafasi
  - [README.md](./README.md): taarifa ya "Kuangalia mbele" katika sehemu ya maelezo na kipengee kipya `1.1` katika jedwali la moduli ya mtaala
  - [study_guide.md](./study_guide.md): kipengee cha kuangalia mbele chini ya muhtasari wa Misingi ya Msingi na taarifa ya ziada yenye tarehe
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): kiashirio kuhusu ramani ya usafirishaji ya `mcp-session-id` kabla ya mfano wa ombi usio na nafasi
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): kiashirio cha muhtasari wa moduli juu ya kutolewa kwa Root Contexts/Sampling na kiendelezi cha Kazi
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): kiashirio cha kuimarisha idhini

## Juni 24, 2026

### Somo Jipya: Kutumia MCP katika programu ya Copilot

- [Sehemu ya Zana](./12-tooling/README.md) Iliongeza sehemu ya zana.
- [MCP katika programu ya Copilot](./12-tooling/01-copilot-app/README.md)

## Juni 16, 2026

### Ulinganifu wa Maelezo ya MCP & Uthibitishaji wa Sampuli

Ilithibitisha mtaala dhidi ya **MCP Specification 2025-11-25** ya sasa na SDK za rasmi za hivi karibuni, kisha ikarekebisha marejeleo ya maelezo yaliyosalia kuwa ya zamani na kuthibitisha kuwa sampuli za msingi bado zinaweza kujengwa na kuendeshwa.

#### Marekebisho ya Topeo la Maelezo (2025-06-18 / 2025-03-26 → 2025-11-25)

Ilisasisha maudhui ya Kiingereza ambapo bado yalidai marekebisho ya awali ya toleo la maelezo kama kiwango cha *sasa/kisasa*, na kupeleka tena viungo kwenye njia za maelezo za msingi za `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Imesasisha bango la "Kiwango cha Sasa", utangulizi, kichwa cha kanuni za usalama za msingi, kichwa cha mahitaji ya lazima, sehemu ya Microsoft Entra ID, viungo vya Marejeleo & Rasilimali, na tangazo la kufunga usalama (marejeleo 8) hadi 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Imesasisha kiungo cha rasilimali za ziada na bango la "Kiwango cha Sasa" hadi 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Iliibadilisha kiungo cha zamani cha usalama-na-aminika `2025-03-26` na ukurasa wa mbinu bora za usalama wa sasa wa 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Imesasisha kiungo rasmi cha nyaraka za sampling hadi 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Imesasisha rejea ya sasa ya "maelezo ya MCP ya sasa" na kiungo cha rasilimali za ziada hadi 2025-11-25 (noti za kihistoria za kuachishwa kwa SSE zilibaki kwa usahihi)

#### Uthibitishaji wa Sampuli dhidi ya SDK za Sasa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ilitatua `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` ilipita bila makosa ya aina — APIs zilizopo za `McpServer`/`StdioServerTransport` bado ni halali
- **Python (03-GettingStarted/01-first-server/solution/python)**: Ilithibitishwa katika `.venv` iliyojengwa peke yake na `mcp[cli]` (1.27.2); `py_compile` ilipita na `FastMCP.list_tools()` ilirudisha vyema zana `add` na `subtract`
- Imethibitisha kuwa aina zote za toleo la `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) zinaleta toleo la sasa `1.29.0` bila kubadilisha API kwa maana ya kuvunja

#### Ulinganifu wa Sakinisho la Mtegemezi (kufunga mapengo ya toleo)

Iliongeza pins za SDK zilizotoka ili kila sampuli ifuatilie toleo la MCP la sasa, ikilingana na matumizi ya kiasili ya repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Imepandisha `@modelcontextprotocol/sdk` kutoka `^1.8.0` hadi `>=1.26.0` na imesasisha maelezo ya kifurushi ya zamani `"updated for MCP 2025-06-18"` kuwa `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** na **lab4/code/github_mcp_server/pyproject.toml**: Imepandisha pins zilizohitajika `mcp==1.23.0` hadi `mcp>=1.26.0`; imetengeneza upya faili zote mbili `uv.lock` (`uv lock`) ili faili za kufunga ziweke toleo la sasa `mcp 1.27.2` na zisiwe sawa na orodha za maonyesho

#### Uchambuzi wa Mapengo ya Mtaala — Ufunikaji wa Sifa za Toleo la Hivi Kari

Imethibitisha kuwa mtaala tayari unafunika vifaa vyote vilivyotolewa/kupanuliwa katika MCP 2025-11-25, hivyo hakuna mapengo ya maudhui yaliyobaki:
- **Sampling**: Somo 03-GettingStarted/14-sampling pamoja na 05-AdvancedTopics/mcp-sampling
- **Elicitation (pamoja na hali ya URL)**: Imeandikwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Imeandikwa katika 00-Introduction, 01-CoreConcepts, na 05-AdvancedTopics/mcp-root-contexts
- **Tasks (jaribio, operesheni za muda mrefu)**: Imeandikwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features
- **Maelezo ya Zana** (`readOnlyHint` / `destructiveHint`): Imeandikwa katika 01-CoreConcepts na 05-AdvancedTopics/mcp-protocol-features

### Kuimarishwa kwa Usalama & Urekebishaji wa Udhaifu wa Mtegemezi

Ilifanya ukaguzi kamili wa usalama katika kila hati ya orodha ya mtegemezi na msimbo wa chanzo wa sampuli, kisha ikarekebisha ushauri wote wa npm na ugunduzi mmoja wa ngazi ya msimbo. Baada ya urekebishaji, `npm audit` inaripoti **0 udhaifu** katika kila saraka iliyokaguliwa.

#### Udhaifu wa Mtegemezi wa npm (uhamaji) — Imerekebishwa

Ilikagua faili zote 15 za `package-lock.json` zilizowekwa. Udhaifu ulikuwa mdogo kwa utegemezi wa uhamaji ulioletwa na zana ya MCP Inspector ya maendeleo, mteja wa OpenAI, na SDK ya MCP; yote sasa yamepatiwa suluhisho bila kuvunja sampuli:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** na **lab3/code/weather_mcp/inspector**: Imepandisha `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), ambayo ilitambua ushauri wa bundled `ajv`, `brace-expansion`, `diff`, `path-to-regexp` na `ws`. Iliongeza kipengee cha `overrides` cha npm kilicholazimisha `shell-quote@1.8.4` kilichorekebishwa kufuta ushauri mkali uliobaki ulioletwa na `concurrently`; ilitengeneza upya faili zote mbili za kufunga (sasa 0 udhaifu)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ilisahihisha toleo la uhamaji la `qs` (kiasi)
- **03-GettingStarted/samples/javascript**: `npm audit fix` ilisahihisha toleo la uhamaji la `hono` (kiasi)
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ilisahihisha toleo la uhamaji la `form-data` (kikubwa)
- **03-GettingStarted/11-simple-auth/solution/typescript**: Ilizalisha faili iliyo fata wa `package-lock.json` ili mradi uweze kuzaa tena na ukaguliwe (0 udhaifu)

#### Marekebisho ya Usalama ya Ngazi ya Msimbo (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Iliondoa `shell=True` kutoka kwa zana ya `open_in_vscode`. Mlolongo uliotumika awali `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` uliruhusu tabia za shell katika njia ya folda kutafsiriwa na `cmd.exe` (njia ya sindano ya amri). Sasa inaanzisha faili lililotatuliwa la `Code.exe` moja kwa moja na folda kama hoja — hakuna shell — ambayo ni sawa na salama kivitendo

#### Ukaguzi wa Mtegemezi wa Python

- Ulikagua kila seti ya mahitaji ya Python na `pip-audit`. `05-AdvancedTopics` na `03-GettingStarted/samples/python` ziliorodhesha **hapana udhaifu unaojulikana** (masafa yao ya `mcp` / `httpx` / `pydantic` / `python-dotenv` yanatatua matoleo yaliyorekebishwa ya sasa)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` ilibaini utegemezi uliohamaji **`werkzeug` 3.1.1** wenye matangazo matatu ya uwezo wa kushambulia (DoS) kupitia `safe_join` kwenye majina ya vifaa vya Windows — `CVE-2025-66221`, `CVE-2026-21860`, na `CVE-2026-27199` (zote zilisuluhishwa kwenye 3.1.6). Iliongeza pin ya usalama wazi `werkzeug>=3.1.6` ili toleo lililorekebishwa lipatikane; ilithibitisha kipengele kinatatua vizuri na stack ya `chainlit` / `mcp` / `semantic-kernel`

### Kubadilisha Jina la Bidhaa

Ilisasisha maudhui yote ya mtaala kuakisi kubadilika jina la bidhaa la Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Imesasisha kiungo cha jamii ya Discord
- **AGENTS.md**: Imesasisha rejea ya seva ya Discord
- **README.md**: Imesasisha rejea za ikolojia ya teknolojia
- **study_guide.md**: Imesasisha rejea za masomo ya kesi
- **05-AdvancedTopics/README.md**: Imesasisha kichwa na maelezo ya Moduli 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Imesasisha kichwa cha sehemu na maelezo
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Imesasisha kichwa kikamilifu na maudhui ya moduli
- **05-AdvancedTopics/mcp-security-entra/README.md**: Imesasisha kiungo cha rufaa
- **07-LessonsfromEarlyAdoption/README.md**: Imesasisha rejea za masomo ya kesi
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Imesasisha kichwa cha Sehemu 9, alama, na uwezo
- **08-BestPractices/README.md**: Imesasisha kiungo cha jamii ya Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Imesasisha rejea za chaneli ya Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Imesasisha rejea ya kusambaza mfano
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Imesasisha jedwali la Huduma za AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Imesasisha rejea za rasilimali

#### AI Toolkit / AITK → Kiongezi cha Microsoft Foundry Toolkit kwa VS Code

- **README.md**: Marekebisho ya marejeleo makuu ya mtaala
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Kichwa cha moduli, muhtasari, na vichwa vyote vya moduli vimeboreshwa
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Kichwa, malengo ya kujifunza, maelekezo ya usanidi, na rasilimali vimeboreshwa
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Kichwa, malengo ya kujifunza, jedwali la mwenyeji wa MCP, na marejeleo ya msalaba yameboreshwa
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Kichwa, alama, mahitaji ya awali, na rasilimali vimeboreshwa
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Marejeleo ya Mjenzi wa Agent na kiungo cha maoni vimeboreshwa
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Mahitaji ya awali na marejeleo ya upanuzi yameboreshwa

---

## Aprili 11, 2026

### Somo Jipya, Marekebisho ya Nyaraka, na Sasisho za Tegemezi

#### Maudhui Mapya ya Mtaala Yameongezwa

**Moduli 05 - Mada za Juu**
- **Somo 5.17: Ufafanuzi wa Mawakala Wengi wa Kupanakato na MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Mwongozo mpana mpya unaojumuisha kielelezo cha mjadala wa wapinzani kwa mifumo ya mawakala wengi
  - Mchoro wa usanifu wa Mermaid: mawakala wawili → seva ya zana ya MCP inayoshirikiwa → usimulizi wa mjadala → hakimu → uamuzi
  - Seva ya zana ya MCP inayoshirikiwa (`web_search` + `run_python`) iliyotekelezwa kwa Python na TypeScript
  - Maelekezo ya mfumo yanayopingana (KWA / DHIDI YA / Hakimu) na mahitaji wazi ya matumizi ya zana
  - Msimamizi wa mjadala kwa Python, TypeScript, na C# anayesimamia raundi na utangazaji wa hoja
  - Uunganishaji wa MCP `ClientSession` kwa msimamizi kwenda kwa simu halisi za zana
  - Jedwali la matumizi ya kesi (ugundaji wa halusinasi, usanifu wa vitisho, mapitio ya usanifu wa API, uhakiki wa ukweli, uchaguzi wa teknolojia)
  - Mambo ya usalama: utekelezaji wa ndani ya sanduku la mchanga, uhakiki wa simu ya zana, mipaka ya kiwango, kumbukumbu za ukaguzi
  - Mazoezi yaliyopangwa na matukio matatu ya vitendo (mapitio ya nambari, uamuzi wa usanifu, ukaguzi wa maudhui)

#### Marekebisho ya Nyaraka

**Moduli 03 - Kuanzisha**
- **05-stdio-server/README.md**: Mfano wa seva ya stdio ya TypeScript usiokamilika umeboreshwa — imeongezwa utayarishaji wa usafirishaji uliokosekana (`new StdioServerTransport()`) na wito wa `server.connect(transport)` ili lifanane na mifano ya Python na .NET katika sehemu hiyo hiyo
- **14-sampling/README.md**: Marekebisho ya tahajia — Imerekebisha `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Sasisho za Mtaala

**README.md Kuu**
- Imeongezwa kipengele 5.17 (Ufafanuzi wa Mawakala Wengi wa Kupanakato na MCP) kwenye jedwali la mtaala kwa kiungo moja kwa moja cha somo jipya

**05-AdvancedTopics/README.md**
- Imeongezwa mstari wa Somo 5.17 kwenye jedwali la masomo

**study_guide.md**
- Imekuwa na mada ya Ufafanuzi wa Mawakala Wengi wa Kupanakato kwenye ramani ya mawazo na maelezo ya masomo ya Mada za Juu

#### Marekebisho ya Nambari na Usalama

**Moduli 05 - Mawakala Wapinzani (`mcp-adversarial-agents`)**
- **Marekebisho ya usalama — sindano ya amri**: Iliamuliwa kuchukua kutumia `execFile` + `promisify` badala ya `execSync` katika zana ya `run_python` ya TypeScript, kuondoa hatari ya sindano ya amri (sasa msimbo unaodhibitiwa na LLM hupitishwa kama kipengele halisi cha argv bila kuingiliwa na shel)
- **Uunganishaji wa zamu za zana za MCP**: Msimamizi wa mjadala aliyeboreshwa wa Python kutumia mteja wa `AsyncAnthropic` (kubadilisha `Anthropic` ya kusitisha njia), kupitisha `ClientSession` hai moja kwa moja kwa kila zamu ya wakala, kupata orodha ya zana kupitia `session.list_tools()` kila zamu, na kusambaza blokki za `tool_use` kupitia `session.call_tool()` mzunguko mpaka modeli itoke na jibu la matini la mwisho

#### Sasisho za Tegemezi

- Kuinua toleo la `hono` hadi 4.12.12 katika vifurushi vingi (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Kuinua `@hono/node-server` kutoka 1.19.11 hadi 1.19.13 katika vifurushi vya TypeScript
- Kuinua `cryptography` kutoka 46.0.5 hadi 46.0.7 katika vifurushi vya Python (maabara za 10-StreamliningAIWorkflows 3 na 4)
- Kuinua `lodash` kutoka 4.17.23 hadi 4.18.1 katika mkaguzi wa 10-StreamliningAIWorkflows

#### Tafsiri

- Kusawazisha tafsiri kwa lugha zaidi ya 48 na mabadiliko mapya ya chanzo (sasisho i18n)

---

## Februari 5, 2026

### Uhakiki wa Jumla wa Hazina na Maboresho ya Uvinjari

#### Maudhui Mapya ya Mtaala Yameongezwa

**Moduli 03 - Kuanzisha**
- **12-mcp-hosts/README.md**: Mwongozo mpana mpya wa kuanzisha mwenyeji wa MCP
  - Mifano ya usanidi wa Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Violezo vya usanidi vya JSON kwa wenyeji wote wakuu
  - Jedwali la kulinganisha aina za usafirishaji (stdio, SSE/HTTP, WebSocket)
  - Utatuzi wa matatizo ya kawaida ya muunganisho
  - Mazoea bora ya usalama kwa usanidi wa mwenyeji

- **13-mcp-inspector/README.md**: Mwongozo mpya wa urekebishaji kwa MCP Inspector
  - Njia za usakinishaji (npx, npm global, kutoka chanzo)
  - Kuunganishwa na seva kupitia stdio na HTTP/SSE
  - Zana za majaribio, rasilimali, na michakato ya maelekezo
  - Muunganiko wa VS Code na MCP Inspector
  - Matukio ya kawaida ya urekebishaji na suluhisho

**Moduli 04 - Utekelezaji wa Vitendo**
- **pagination/README.md**: Mwongozo mpya wa utekelezaji wa kurasa
  - Mitindo ya pagination kwa kutumia Cursor katika Python, TypeScript, Java
  - Usimamizi wa pagination upande wa mteja
  - Mikakati ya muundo wa Cursor (gumu dhidi ya iliyojumuishwa)
  - Mapendekezo ya uboreshaji wa utendaji

**Moduli 05 - Mada za Juu**
- **mcp-protocol-features/README.md**: Uchunguzi wa kina wa vipengele vya itifaki
  - Utekelezaji wa taarifa za maendeleo
  - Mitindo ya kughairi maombi
  - Violezo vya rasilimali na mifumo ya URI
  - Usimamizi wa maisha ya seva
  - Udhibiti wa viwango vya kumbukumbu
  - Mitindo ya utambuzi wa makosa na nambari za JSON-RPC

#### Marekebisho ya Uvinjari (Faili 24+ zimebadilishwa)

**README kuu za Moduli**
 Sasa zina viungo vya somo la kwanza NA moduli inayofuata

**Faili ndogo za 02-Security**
- Nyaraka 5 zote za usalama wa ziada sasa zina uvinjari wa "Nini Kifuatao":

**Faili za 09-CaseStudy**
- Faili zote za utafiti wa kesi sasa zina uvinjari wa mfuatano:

**Maabara za 10-StreamliningAI**
Imeongezwa sehemu ya Nini Kifuatao kwenye muhtasari wa Moduli 10 na Moduli 11

#### Marekebisho ya Nambari na Maudhui

**Sasisho za SDK na Tegemezi**
Toleo tupu la openai limezimwa hadi `^4.95.0`
SDK imeboreshwa kutoka `^1.8.0` hadi `>=1.26.0`
Pins za toleo la mcp zimesasishwa hadi `>=1.26.0`

**Marekebisho ya Nambari**
Mfano batili `gpt-4o-mini` umerekebishwa kuwa `gpt-4.1-mini`

**Marekebisho ya Maudhui**
Kiungo kilichovunjika `READMEmd` kimeboreshwa kuwa `README.md`, kichwa cha mtaala `Module 1-3` kimebadilishwa kuwa `Module 0-3`, njia yenye tofauti ya herufi zimeboreshwa
Maudhui ya nakala rudufu ya Utafiti wa Kesi 5 yaliyoharibika yameondolewa

**Maboresho ya Mwongozo kwa Waanzilishi**
Utangulizi mzuri, malengo ya kujifunza, na mahitaji ya awali yameongezwa kwa waanzilishi

#### Sasisho za Mtaala

**README.md Kuu**
- Imeongezwa vichwa 3.12 (Wenyeji wa MCP), 3.13 (Mchakato wa MCP), 4.1 (Pagination), 5.16 (Vipengele vya Protokoli) kwenye jedwali la mtaala

**README za Moduli**
Masomo 12 na 13 yameongezwa kwenye orodha ya masomo
Sehemu ya Mwongozo wa Vitendo imeongezwa na kiungo cha pagination
Masomo 5.15 (Usafirishaji wa Kawaida) na 5.16 (Vipengele vya Protokoli) yameongezwa

**study_guide.md**
- Ramani ya mawazo imesasishwa na mada zote mpya: Usanidi wa Wenyeji wa MCP, MCP Inspector, Mikakati ya Pagination, Uchunguzi wa Vipengele vya Protokoli

## Januari 28, 2026

### Ukaguzi wa Uzingatiaji wa Maelezo ya MCP 2025-11-25

#### Uboreshaji wa Dhana za Msingi (01-CoreConcepts/)
- **Mteja Mpya wa Kwanza - Mizizi**: Nyaraka mpana juu ya mteja wa mizizi, kuwezesha seva kuelewa mipaka ya mfumo wa faili na ruhusa za upatikanaji
- **Maelezo ya Zana**: Marejeleo juu ya maelezo ya tabia za zana (`readOnlyHint`, `destructiveHint`) kwa maamuzi bora ya utekelezaji wa zana
- **Kupiga Zana katika Sampuli**: Mwongozo wa Sampling umeboreshwa kujumuisha vigezo vya `tools` na `toolChoice` kwa simu za zana zinazoongozwa na mfano wakati wa maombi ya sampuli
- **Uamsho wa Hali ya URL**: Nyaraka juu ya uamsho wa msingi wa URL kwa mwingiliano wa wavuti wa nje unaoanzishwa na seva
- **Kazi (Jaribio)**: Sehemu mpya inayohusu kipengele cha Kazi kwa utekelezaji wa kudumu na kupokea matokeo kwa kuchelewesha
- **Msaada wa Ikoni**: Zana, rasilimali, violezo vya rasilimali, na maelekezo sasa vinaweza kujumuisha ikoni kama metadata ya ziada

#### Sasisho za Nyaraka
- **README.md**: Kumbukumbu ya toleo la Maelezo ya MCP 2025-11-25 na maelezo ya usimamizi wa toleo la tarehe
- **study_guide.md**: Ramani ya mtaala imesasishwa kujumuisha Kazi na Maelezo ya Zana katika sehemu ya Dhana za Msingi; muda wa nyaraka umesasishwa

#### Thibitisho la Uzingatiaji wa Maelezo
- **Toleo la Itifaki**: Thibitisha marejeleo yote ya nyaraka yanaendana na Maelezo ya MCP 2025-11-25
- **Muafaka wa Usanifu**: Imethibitishwa usahihi wa usanifu wa tabaka mbili (Tabaka la Data + Tabaka la Usafirishaji)
- **Nyaraka za Primitives**: Imethibitishwa primitives za seva (Rasilimali, Maelekezo, Zana) na primitives za mteja (Sampling, Elicitation, Logging, Roots)
- **Mekanismi za Usafirishaji**: Uhakikisho wa nyaraka za usafirishaji wa STDIO na HTTP Streamable
- **Mwongozo wa Usalama**: Uthibitisho wa muafaka na Maelezo ya Mazoea Bora ya Usalama ya MCP

#### Vipengele Vikuu vya MCP 2025-11-25 VilivyoNyarakishwa
- **Ugunduzi wa OpenID Connect**: Ugunduzi wa seva ya uthibitishaji kupitia OIDC
- **Nyaraka za Metadata za OAuth Client ID**: Mapendekezo ya mfumo wa usajili mteja
- **JSON Schema 2020-12**: Lugha ya msingi ya maelezo ya schema ya MCP
- **Mfumo wa Ngazi za SDK**: Mahitaji rasmi ya msaada na usimamizi wa vipengele vya SDK
- **Muundo wa Utawala**: Makundi ya Kazi na Makundi ya Maslahi yaliyopangwa rasmi katika utawala wa MCP

### Sasisho Kubwa la Nyaraka za Usalama (02-Security/)

#### Muunganiko wa Warsha ya Mkutano wa Usalama MCP (Sherpa)
- **Rasilimali Mpya ya Mafunzo ya Vitendo**: Imekuwa muunganiko mpana na [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) katika nyaraka zote za usalama
- **Mchakato wa Safari ya Kambi**: Nyaraka ya mchakato kamili kutoka Kambi ya Msingi hadi Mkutano Mkuu
- **Muafaka na OWASP**: Mwongozo wote wa usalama sasa unaendana na hatari za MCP za Azure za OWASP

#### Muunganiko wa OWASP MCP Top 10
- **Sehemu Mpya**: Jedwali la Hatari 10 Bora za OWASP MCP na hatua za Azure za kupunguza hatari limeongezwa kwenye README kuu ya Usalama
- **Nyaraka za Hatari Zilizotegemea Hatari**: mcp-security-controls-2025.md imesasishwa na marejeleo ya hatari za OWASP MCP kwa kila eneo la usalama
- **Usanifu wa Marejeleo**: Imeunganishwa na usanifu wa marejeleo wa Mwongozo wa Usalama wa OWASP MCP Azure na mifano ya utekelezaji

#### Faili za Usalama Zilizosasishwa
- **README.md**: Muhtasari wa warsha ya Sherpa, jedwali la njia ya safari, muhtasari wa hatari za OWASP MCP Top 10, na sehemu ya mafunzo ya vitendo
- **mcp-security-controls-2025.md**: Kichwa kimesasishwa hadi Februari 2026, marejeleo ya hatari za OWASP (MCP01-MCP08) yameongezwa, marekebisho ya tofauti ya toleo la maelezo
- **mcp-security-best-practices-2025.md**: Sehemu ya rasilimali za Sherpa na OWASP imeongezwa, muda umesasishwa
- **mcp-best-practices.md**: Sehemu ya mafunzo ya vitendo na viungo vya Sherpa na OWASP imeongezwa
- **azure-content-safety-implementation.md**: Marejeleo ya OWASP MCP06, muafaka wa Kambi 3 ya Sherpa, na sehemu ya rasilimali za ziada yameongezwa

#### Viungo Vipya vya Rasilimali Vilivyoongezwa
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Kurasa za hatari za OWASP MCP binafsi (MCP01-MCP10)

### Muafaka wa Maelezo ya MCP 2025-11-25 Kwa Mtaala wote

#### Moduli 03 - Kuanzisha
- **Nyaraka za SDK**: SDK ya Go imeongezwa kwenye orodha rasmi ya SDK; marejeleo yote ya SDK yamesasishwa kuendana na Maelezo ya MCP 2025-11-25
- **Ufafanuzi wa Usafirishaji**: Maelezo ya usafirishaji wa STDIO na HTTP Streaming yamesasishwa na marejeleo ya maelezo wazi

#### Moduli 04 - Utekelezaji wa Vitendo
- **Sasisho za SDK**: SDK ya Go imeongezwa; orodha ya SDK imesasishwa na kumbukumbu za toleo la maelezo
- **Maelezo ya Idhini**: Kiungo cha maelezo ya Idhini ya MCP kimesasishwa hadi toleo la sasa 2025-11-25

#### Moduli 05 - Mada za Juu
- **Vipengele Vipya**: Kumbukumbu ya vipengele vipya vya MCP Specification 2025-11-25 (Kazi, Maelezo ya Zana, Uamsho wa Hali ya URL, Mizizi)
- **Rasilimali za Usalama**: Viungo vya OWASP MCP Top 10 na warsha ya Sherpa vimeongezwa kwenye marejeleo ya ziada

#### Moduli 06 - Michango ya Jamii
- **Orodha ya SDK**: SDK za Swift na Rust zimeongezwa; kiungo cha maelezo kimesasishwa hadi 2025-11-25
- **Kumbukumbu ya Maelezo**: Kiungo cha Maelezo ya MCP kimesasishwa hadi URL ya moja kwa moja ya maelezo

#### Moduli 07 - Mafunzo kutoka kwa Matumizi ya Awali

- **Mabadiliko ya Rasilimali**: Imeongezwa kiungo cha MCP Specification 2025-11-25 na OWASP MCP Top 10 kwa rasilimali za ziada

#### Moduli 08 - Mazoezi Bora
- **Toleo la Maelezo**: Imeboreshwa rejeleo la MCP Specification kwa tarehe 2025-11-25
- **Rasilimali za Usalama**: Imeongezwa OWASP MCP Top 10 na warsha ya Sherpa kwa marejeleo ya ziada

#### Moduli 10 - Kuboresha Mchakato wa AI
- **Mabadiliko ya Bango**: Bango la toleo la MCP limebadilishwa kutoka toleo la SDK (1.9.3) kwenda toleo la maelezo (2025-11-25)
- **Viungo vya Rasilimali**: Kiungo cha MCP Specification kimeboreshwa; OWASP MCP Top 10 imeongezwa

#### Moduli 11 - Maabara za Mikono-Mikono za MCP Server
- **Rejeleo la Maelezo**: Kiungo cha MCP Specification kimeboreshwa kwa toleo la 2025-11-25
- **Rasilimali za Usalama**: OWASP MCP Top 10 imeongezwa katika rasilimali rasmi

## Desemba 18, 2025

### Sasisho la Nyaraka za Usalama - MCP Specification 2025-11-25

#### Mazoezi Bora ya Usalama ya MCP (02-Security/mcp-best-practices.md) - Sasisho la To leo la Maelezo
- **Sasisho la To leo la Itifaki**: Imeboreshwa kuonyesha MCP Specification ya hivi karibuni 2025-11-25 (ilitoa Novemba 25, 2025)
  - Rejeleo zote za toleo la maelezo zilibadilishwa kutoka 2025-06-18 hadi 2025-11-25
  - Rejeleo za tarehe za nyaraka zilibadilishwa kutoka Agosti 18, 2025 hadi Desemba 18, 2025
  - Imethibitishwa kuwa URL zote za maelezo zinaelekeza kwenye nyaraka za sasa
- **Uhakikisho wa Yaliyomo**: Uhakikisho mpana wa mazoezi bora ya usalama dhidi ya viwango vya hivi karibuni
  - **Suluhisho za Usalama za Microsoft**: Imethibitishwa istilahi na viungo vya sasa kwa Prompt Shields (zamani "ugunduzi wa hatari ya kufunguliwa tena"), Azure Content Safety, Microsoft Entra ID, na Azure Key Vault
  - **Usalama wa OAuth 2.1**: Imethibitisha muafaka na mazoezi bora ya hivi karibuni ya usalama wa OAuth
  - **Viwango vya OWASP**: Imethibitisha marejeleo ya OWASP Top 10 kwa LLMs yanabaki ya sasa
  - **Huduma za Azure**: Imethibitisha viungo vyote vya nyaraka za Microsoft Azure na mazoezi bora
- **Muafaka wa Vingwaosho**: Vingwaosho vyote vinavyotajwa vya usalama vimehakikiwa kuwa vya sasa
  - Mfumo wa Usimamizi wa Hatari wa AI wa NIST
  - ISO 27001:2022
  - Mazoezi Bora ya Usalama ya OAuth 2.1
  - Miundombinu ya usalama na uzingatiaji wa Azure
- **Rasilimali za Utekelezaji**: Viungo vyote vya mwongozo wa utekelezaji na rasilimali vimehakikiwa
  - Mifumo ya uthibitishaji wa Azure API Management
  - Miongozo ya ushirikiano wa Microsoft Entra ID
  - Usimamizi wa siri wa Azure Key Vault
  - Mipango ya DevSecOps na suluhisho za uangalizi

### Uhakikisho wa Ubora wa Nyaraka
- **Uzingatiaji wa Maelezo**: Imethibitisha mahitaji yote ya usalama wa MCP (Lazima/Harasimu) yanalingana na toleo la maelezo la hivi karibuni
- **Uhalali wa Rasilimali**: Imethibitisha viungo vyote vya nje kwa nyaraka za Microsoft, viwango vya usalama, na miongozo ya utekelezaji
- **Ujumuishaji wa Mazoezi Bora**: Imethibitisha upokeaji mpana wa uthibitishaji, idhini, vitisho maalum vya AI, usalama wa mnyororo wa usambazaji, na mifumo ya biashara

## Oktoba 6, 2025

### Upanuzi wa Sehemu ya Kuanzia – Matumizi ya Seva Yenye Ngazi za Juu & Uthibitishaji Rahisi

#### Matumizi ya Seva Yenye Ngazi za Juu (03-GettingStarted/10-advanced)
- **Sura Mpya Imeongezwa**: Ilianzisha mwongozo wa kina wa matumizi ya seva ya MCP yenye ngazi za juu, ikijumuisha usanifu wa seva wa kawaida na wa ngazi ya chini.
  - **Seva ya Kawaida dhidi ya Seva ya Ngazi ya Chini**: Ulinganisho wa kina na mifano ya msimbo kwa Python na TypeScript kwa njia zote mbili.
  - **Ubunifu wa Msimamizi**: Maelezo ya usimamizi wa zana/rasilimali/maombi kwa kutumia msimamizi kwa utekelezaji unaoweza kupanuka na kubadilika.
  - **Mifumo ya Kivitendo**: Hali halisi ambapo mifumo ya seva ya ngazi ya chini ni muhimu kwa vipengele vya juu na usanifu.

#### Uthibitishaji Rahisi (03-GettingStarted/11-simple-auth)
- **Sura Mpya Imeongezwa**: Mwongozo wa hatua kwa hatua wa utekelezaji wa uthibitishaji rahisi katika seva za MCP.
  - **Mafundisho ya Uthibitishaji**: Maelezo wazi ya tofauti kati ya uthibitishaji na idhini, na utunzaji wa maelezo ya uthibitishaji.
  - **Utekelezaji wa Uthibitishaji Msingi**: Mifumo ya uthibitishaji inayotumia middleware kwa Python (Starlette) na TypeScript (Express), pamoja na mifano ya msimbo.
  - **Maendeleo ya Usalama wa Juu**: Mwongozo wa kuanzia na uthibitishaji rahisi na kuendelea hadi OAuth 2.1 na RBAC, kwa marejeleo ya moduli za usalama za juu.

Mabadiliko haya yanatoa mwongozo wa kiutendaji, mikononi mwako kwa kujenga utekelezaji wa seva za MCP zenye nguvu zaidi, salama, na zinazobadilika, yakionyesha mafundisho ya msingi pamoja na mifumo ya uzalishaji yenye ngazi za juu.

## Septemba 29, 2025

### Maabara za Uunganishaji wa Hifadhidata za MCP Server - Njia Kamili ya Kujifunza Mikononi

#### 11-MCPServerHandsOnLabs - Mtaala Mpya wa Uunganishaji wa Hifadhidata Kamili
- **Njia Kamili ya Kujifunza Laboratwari 13**: Imeongezwa mtaala kamili wa mikono kwa kujenga seva za MCP zenye uzalishaji na uunganishaji wa hifadhidata ya PostgreSQL
  - **Utekelezaji Halisi**: Kesi ya matumizi ya uchambuzi wa Zava Retail ikionyesha mifumo ya daraja la biashara
  - **Mafunzo Yaliyopangwa**:
    - **Maabara 00-03: Misingi** - Utangulizi, Usanifu wa Msingi, Usalama & Utengezaji wa Wateja Wengi, Maandalizi ya Mazingira
    - **Maabara 04-06: Ujenzi wa MCP Server** - Ubunifu wa Hifadhidata & Mchoro wa Data, Utekelezaji wa MCP Server, Uundaji wa Zana
    - **Maabara 07-09: Vipengele vya Juu** - Uunganishaji wa Utafutaji wa Kimaana, Kupima & Kurekebisha Makosa, Uunganishaji wa VS Code
    - **Maabara 10-12: Uzalishaji & Mazoezi Bora** - Mikakati ya Usambazaji, Uangalizi & Uwezo wa Kuonekana, Mazoezi Bora & Uboreshaji
  - **Teknolojia za Biashara**: Mfumo wa FastMCP, PostgreSQL na pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Vipengele vya Juu**: Usalama wa ngazi ya safu za data (RLS), utafutaji wa kimaana, upatikanaji wa data kwa wateja wengi, embeddings ya vekta, uangalizi wa wakati halisi

#### Ulinganifu wa Istilahiji - Mabadiliko ya Moduli Kuwa Maabara
- **Sasisho Kamili la Nyaraka**: Faili zote za README katika 11-MCPServerHandsOnLabs zimebadiliwa kwa mfumo wa istilahi "Lab" badala ya "Module"
  - **Vichwa vya Sehemu**: Kivutio cha "Nini Moduli Hii Inashughulikia" kimebadilishwa kuwa "Nini Maabara Hii Inashughulikia" kwa maabara zote 13
  - **Maelezo ya Yaliyomo**: Maneno "Moduli hii inatoa..." yamebadilishwa kuwa "Maabara hii inatoa..." katika nyaraka zote
  - **Malengo ya Kujifunza**: Kivutio cha "Mwisho wa moduli hii..." kimebadilishwa kuwa "Mwisho wa maabara hii..."
  - **Viungo vya Urambazaji**: Marejeleo yote ya "Module XX:" yamebadilishwa kuwa "Lab XX:" katika marejeleo na urambazaji wa ndani
  - **Ufuatiliaji wa Kumaliza**: Shamiri "Baada ya kumaliza moduli hii..." imebadilishwa kuwa "Baada ya kumaliza maabara hii..."
  - **Rejeleo za Kiufundi Zilizohifadhiwa**: Rejeleo za moduli za Python katika mafaili ya usanidi zimehifadhiwa (mfano, `"module": "mcp_server.main"`)

#### Kuboresha Mwongozo wa Masomo (study_guide.md)
- **Ramani ya Mtaala wa Kuonekana**: Imeongezwa sehemu mpya "11. Maabara za Uunganishaji wa Hifadhidata" na muundo kamili wa maabara
- **Muundo wa Hifadhidata**: Imebadilishwa kutoka sehemu kumi hadi kumi na moja, ikijumuisha maelezo ya kina ya 11-MCPServerHandsOnLabs
- **Mwongozo wa Njia ya Kujifunza**: Amilishwa maelekezo ya urambazaji kwa kufunika sehemu 00-11
- **Mwonekano wa Teknolojia**: Imeongezwa maelezo ya FastMCP, PostgreSQL, na uunganishaji wa huduma za Azure
- **Matokeo ya Kujifunza**: Imesisitiza maendeleo ya seva za uzalishaji, mifumo ya uunganishaji wa hifadhidata, na usalama wa biashara

#### Kuboresha Muundo wa README Mkuu
- **Istilahiji ya Maabara**: README.md kuu katika 11-MCPServerHandsOnLabs imetumia jinsi ilivyo istilahi ya "Lab"
- **Mpangilio wa Njia ya Kujifunza**: Mwelekeo wazi kutoka kwa mafundisho ya msingi hadi utekelezaji wa ngazi ya juu na usambazaji
- **Mwelekeo wa Dunia Halisi**: Msisitizo wa njia ya mikononi ya kujifunza kwa mifumo ya biashara na teknolojia za daraja la juu

### Maboresho ya Ubora na Muafaka wa Nyaraka
- **Msisitizo wa Kujifunza Mikononi**: Kuimarisha njia ya maabara kwa vitendo katika nyaraka zote
- **Msisitizo wa Mifumo ya Biashara**: Kusisitiza utekelezaji wa tayari kwa uzalishaji na maoni ya usalama wa biashara
- **Uunganishaji wa Teknolojia**: Ufungaji wa kina wa huduma za kisasa za Azure na mifumo ya kuingiza AI
- **Mwelekeo wa Kujifunza**: Njia iliyo wazi na yenye hatua kutoka kwa mafundisho ya msingi hadi usambazaji wa uzalishaji

## Septemba 26, 2025

### Maboresho ya Tafiti za Kesi - Uunganishaji wa GitHub MCP Registry

#### Tafiti za Kesi (09-CaseStudy/) - Msisitizo wa Maendeleo ya Mfumo
- **README.md**: Upanuzi mkubwa wa tafiti za kesi za GitHub MCP Registry
  - **Tafiti za Kesi za GitHub MCP Registry**: Tafiti za kina za uzinduzi wa GitHub MCP Registry Septemba 2025
    - **Uchambuzi wa Tatizo**: Ukaguzi wa kina wa changamoto za ugunduzi na usambazaji wa seva za MCP zilizo vunjwa vipande
    - **Usanifu wa Suluhisho**: Njia ya usajili wa GitHub iliyozingatia usajili wa kati na usakinishaji kwa Bofya Moja la VS Code
    - **Athari za Biashara**: Maboresho yanayopimika katika kuanzisha waendelezaji na uzalishaji kazi
    - **Thamani ya Mkakati**: Msisitizo juu ya usambazaji wa mawakala wa moduli na usainisishaji wa zana kwa pamoja
    - **Maendeleo ya Mfumo**: Kuweka kama jukwaa la msingi kwa ushirikiano wa mawakala
  - **Muundo wa Tafiti za Kesi Ulioimarishwa**: Tafiti saba zote zimeboreshwa kwa mtindo unaoendana na maelezo kamili
    - Maelezo ya Wakala wa Safari wa Azure AI: Msisitizo wa kupanga mawakala kadhaa
    - Uunganishaji wa Azure DevOps: Msisitizo wa michakato ya kazi ya otomatiki
    - Utoaji wa Nyaraka kwa Wakati Halisi: Utekelezaji wa mteja wa console wa Python
    - Kizalishaji cha Mpango wa Kusoma wa Mazungumzo: Programu ya mtandao ya mazungumzo ya Chainlit
    - Nyaraka Zilizomo ndani ya Mhariri: Uunganishaji wa VS Code na GitHub Copilot
    - Usimamizi wa API wa Azure: Mifumo ya kuunganishwa kwa API ya biashara
    - GitHub MCP Registry: Kuendeleza mfumo na jukwaa la jamii
  - **Hitimisho Kamili**: Sehemu ya hitimisho imeandikwa upya ikionyesha tafiti saba zinazohusika na vipengele mbalimbali vya utekelezaji wa MCP
    - Uunganishaji wa Biashara, Usanidi wa Wakala Wengi, Uzalishaji wa Waendelezaji
    - Maendeleo ya Mfumo, Matumizi ya Elimu kwa Kategorisasi
    - Maelezo ya kina juu ya mifumo ya usanifu, mikakati ya utekelezaji, na mazoezi bora
    - Msisitizo juu ya MCP kama itifaki iliyokomaa na tayari kwa uzalishaji

#### Sasisho za Mwongozo wa Masomo (study_guide.md)
- **Ramani ya Mtaala ya Kuonekana**: Kusasisha ramani ya mawazo kujumuisha GitHub MCP Registry katika sehemu ya Tafiti za Kesi
- **Maelezo ya Tafiti za Kesi**: Kuongezea kutoka maelezo ya jumla hadi mgawanyo wa kina wa tafiti saba za kina
- **Muundo wa Hifadhidata**: Sasisho la sehemu ya 10 kuonyesha maelezo kamili ya tafiti za kesi na maelezo ya utekelezaji maalum
- **Uunganishaji wa Mabadiliko**: Kuongeza kipengele cha Septemba 26, 2025 kinachoandika kuongezwa kwa GitHub MCP Registry na maboresho ya tafiti za kesi
- **Sasisho la Tarehe**: Kusasisha alama ya wakati ya mguu wa habari kuonyesha marekebisho ya hivi karibuni (Septemba 26, 2025)

### Maboresho ya Ubora wa Nyaraka
- **Kuboresha Muafaka**: Kuimarisha muundo na mpangilio wa tafiti za kesi kwa mifano saba
- **Ufungaji Kamili**: Tafiti sasa zinafunika biashara, uzalishaji wa waendelezaji, na hali za maendeleo ya mfumo
- **Msisitizo wa Mkakati**: Kuimarisha MCP kama jukwaa la msingi la usambazaji wa mfumo wa mawakala
- **Uunganishaji wa Rasilimali**: Viungo vya rasilimali vya ziada vimesasishwa kujumuisha kiungo cha GitHub MCP Registry

## Septemba 15, 2025

### Upanuzi wa Mada za Juu - Usafirishaji wa Kina & Uhandisi wa Muktadha

#### Usafirishaji Mabadiliko ya MCP (05-AdvancedTopics/mcp-transport/) - Mwongozo Mpya wa Utekelezaji wa Juu
- **README.md**: Mwongozo kamili wa utekelezaji wa mifumo ya usafirishaji wa maalum ya MCP
  - **Usafirishaji wa Azure Event Grid**: Utekelezaji wa usafirishaji usio na seva unaotegemea tukio
    - Mifano ya C#, TypeScript, na Python pamoja na muingiliano wa Azure Functions
    - Mifumo ya usanifu inayotegemea tukio kwa suluhisho za MCP zinazoweza kupanuka
    - Wapokeaji wa webhook na usimamizi wa ujumbe unaosukumwa
  - **Usafirishaji wa Azure Event Hubs**: Utekelezaji wa usafirishaji wa mito yenye uwezo mkubwa
    - Uwezo wa mtiririko wa wakati halisi kwa hali za kuchelewa kwa chini sana
    - Mikakati ya kugawanya na usimamizi wa alama za kuangalia
    - Kuagiza jumla ya ujumbe na uboreshaji wa utendaji
  - **Mifumo ya Uunganishaji wa Biashara**: Mifano ya usanifu tayari kwa uzalishaji
    - Usindikaji wa MCP uliosambazwa kati ya Azure Functions nyingi
    - Miundombinu mchanganyiko ya usafirishaji inayochanganya aina nyingi za usafirishaji
    - Uthabiti wa ujumbe, uaminifu, na mikakati ya kushughulikia makosa
  - **Usalama & Uangalizi**: Muingiliano wa Azure Key Vault na mifumo ya uangalizi
    - Uthibitishaji wa utambulisho uliosimamiwa na upatikanaji wa ruhusa kidogo
    - Telemetri ya Application Insights na uangalizi wa utendaji
    - Vipunguza mzunguko na mifumo ya uvumilivu wa hitilafu
  - **Mifumo ya Kupima**: Mikakati kamili ya kupima usafirishaji wa maalum
    - Kupima vipande na mifumo ya kuiga na kuiga tabia
    - Kupima muunganisho na vyombo vya mipimo ya Azure Test Containers
    - Mawazo ya kupima utendaji na mzigo

#### Uhandisi wa Muktadha (05-AdvancedTopics/mcp-contextengineering/) - Fani Inayoibuka ya AI
- **README.md**: Utafiti mpana wa uhandisi wa muktadha kama fani inayochipuka
  - **Kanuni za Msingi**: Ushirikishaji kamili wa muktadha, ufahamu wa maamuzi ya vitendo, na usimamizi wa dirisha la muktadha
  - **Muafaka wa Itifaki ya MCP**: Jinsi usanifu wa MCP unavyoshughulikia changamoto za uhandisi wa muktadha
    - Vizingiti vya dirisha la muktadha na mikakati ya upakiaji hatua kwa hatua
    - Uteuzi wa umuhimu na upatikanaji wa muktadha kwa nguvu
    - Usimamizi wa muktadha wa aina nyingi na maoni ya usalama
  - **Njia za Utekelezaji**: Usanifu wa mtandao mmoja dhidi ya wa mawakala wengi
    - Mbinu za kugawanya na kuipa kipaumbele vipande vya muktadha
    - Mikakati ya upakiaji hatua kwa hatua wa muktadha na usimbaji
    - Mbinu za muktadha zilizopangwa kwa tabaka na uboreshaji wa upatikanaji
  - **Mfumo wa Upimaji**: Metriki zinazochipuka kwa tathmini ya ufanisi wa muktadha
    - Ufanisi wa pembejeo, utendaji, ubora, na uzoefu wa mtumiaji
    - Mbinu za majaribio za uboreshaji wa muktadha
    - Uchambuzi wa makosa na mbinu za kuboresha

#### Sasisho za Urambazaji wa Mtaala (README.md)
- **Muundo Ulioboreshwa wa Moduli**: Jedwali la mtaala limesasishwa kujumuisha mada za juu mpya
  - Imeongezwa Uhandisi wa Muktadha (5.14) na Usafirishaji Maalum (5.15)
  - Muundo wa muundo na viungo vya urambazaji vimeendana katika moduli zote
  - Maelezo yameboreshwa kuendana na wigo wa maudhui ya sasa

### Maboresho ya Muundo wa Saraka
- **Ulinganifu wa Majina**: "mcp transport" iliibadilishwa kuwa "mcp-transport" kwa ulinganifu na folda nyingine za mada za juu
- **Mpangilio wa Yaliyomo**: Folda zote za 05-AdvancedTopics sasa zina muundo wa majina unaoendana (mcp-[mada])

### Maboresho ya Ubora wa Nyaraka
- **Muafaka wa MCP Specification**: Yaliyomo yote mapya yanarejelea MCP Specification ya sasa 2025-06-18
- **Mifano ya Lugha Nyingi**: Mifano kamili ya msimbo kwa C#, TypeScript, na Python

- **Kuzingatia Biashara**: Mifumo tayari kwa uzalishaji na ushirikiano wa wingu wa Azure kote
- **Uandishi wa Picha**: Michoro ya Mermaid kwa usanifu na uonyeshaji wa mtiririko

## Agosti 18, 2025

### Sasisho Kamili la Uandishi wa Habari - Viwango vya MCP 2025-06-18

#### Mazoea Bora ya Usalama ya MCP (02-Security/) - Uboreshaji Kamili
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Uandishi upya kamili unaoendana na Maelezo ya MCP 2025-06-18
  - **Mahitaji ya Lazima**: Iliongezwa mahitaji ya wazi YA lazima/HAIpaswi kutoka kwa maelezo rasmi na vidokezo dhahiri vya kuona
  - **Mazoea 12 Msingi ya Usalama**: Imewekwa upya kutoka orodha ya vitu 15 hadi maeneo ya usalama kamili
    - Usalama wa Tokeni & Uthibitishaji na ushirikiano wa mtoaji wa utambulisho wa nje
    - Usimamizi wa Kikao & Usalama wa Usafirishaji na mahitaji ya usimbuaji fiche
    - Ulinzi wa Hatari ya KI-SASA wa AI na ushirikiano wa Microsoft Prompt Shields
    - Udhibiti wa Upatikanaji & Ruhusa kwa kanuni ya hadhi ya chini kabisa
    - Usalama wa Yaliyomo & Ufuatiliaji na ushirikiano wa Azure Content Safety
    - Usalama wa Mnyororo wa Ugavi na uhakikisho kamili wa vipengele
    - Usalama wa OAuth & Kuzuia Mtoaji Mchanganyiko na utekelezaji wa PKCE
    - Majibu ya Tukio & Urejeshaji na uwezo wa kiotomatiki
    - Uzingatiaji & Utawala na ulinganifu wa kanuni
    - Udhibiti wa Usalama wa Juu na usanifu wa imani sifuri
    - Ushirikiano wa Eneo la Usalama la Microsoft na suluhisho kamili
    - Mageuzi ya Kuendelea ya Usalama na mazoea yanayobadilika
  - **Suluhisho za Usalama za Microsoft**: Mwongozo wa ushirikiano ulioboreshwa kwa Prompt Shields, Azure Content Safety, Entra ID, na GitHub Advanced Security
  - **Rasilimali za Utekelezaji**: Viungo vya rasilimali kamili vilivyopangwa kwa Uandishi Rasmi wa MCP, Suluhisho za Usalama za Microsoft, Viwango vya Usalama, na Mwongozo wa Utekelezaji

#### Udhibiti wa Usalama wa Juu (02-Security/) - Utekelezaji wa Biashara
- **MCP-SECURITY-CONTROLS-2025.md**: Mabadiliko makubwa na mfumo wa usalama wa kiwango cha biashara
  - **Maeneo 9 Kamili ya Usalama**: Mbalimbali kutoka udhibiti wa msingi hadi mfumo wa kina wa biashara
    - Uthibitishaji wa Juu & Uidhinishaji na ushirikiano wa Microsoft Entra ID
    - Usalama wa Tokeni & Udhibiti wa Anti-Passthrough na uthibitishaji kamili
    - Udhibiti wa Usalama wa Kikao na kuzuia wizi wa kikao
    - Udhibiti wa Usalama wa KI-SASA wa AI na kuingizwa kwa prompt na kuzuia sumu ya zana
    - Kuzuia Shambulio la Mtoaji Mchanganyiko na usalama wa wakala wa OAuth
    - Usalama wa Utekelezaji wa Zana na kuwekewa mipaka ya sandbox na kutengwa
    - Udhibiti wa Usalama wa Mnyororo wa Ugavi na uhakikisho wa utegemezi
    - Udhibiti wa Ufuatiliaji & Ugunduzi na ushirikiano wa SIEM
    - Majibu ya Tukio & Urejeshaji na uwezo wa kiotomatiki
  - **Mifano ya Utekelezaji**: Iliongeza sehemu za usanidi za YAML kwa undani na mifano ya msimbo
  - **Ushirikiano wa Suluhisho za Microsoft**: Ufungaji wa huduma za usalama za Azure, GitHub Advanced Security, na usimamizi wa utambulisho wa biashara

#### Mada za Juu za Usalama (05-AdvancedTopics/mcp-security/) - Utekelezaji Tayari kwa Uzalishaji
- **README.md**: Uandishi upya wa kina kwa utekelezaji wa usalama wa biashara
  - **Ulinganifu wa Maelezo ya Sasa**: Imesasishwa kwa Maelezo ya MCP 2025-06-18 na mahitaji ya lazima ya usalama
  - **Uthibitishaji Ulioboreshwa**: Ushirikiano wa Microsoft Entra ID na mifano kamili ya .NET na Java Spring Security
  - **Ushirikiano wa Usalama wa AI**: Utekelezaji wa Microsoft Prompt Shields na Azure Content Safety na mifano ya kina ya Python
  - **Kuzuia Hatari za Juu**: Mifano kamili ya utekelezaji kwa
    - Kuzuia Shambulio la Mtoaji Mchanganyiko kwa PKCE na uthibitishaji wa ridhaa ya mtumiaji
    - Kuzuia Kupitishwa kwa Tokeni kwa uthibitishaji wa hadhira na usimamizi salama wa tokeni
    - Kuzuia Wizi wa Kikao kwa kufunga kwa cryptographic na uchambuzi wa tabia
  - **Ushirikiano wa Usalama wa Biashara**: Ufuatiliaji wa Azure Application Insights, njia za kugundua vitisho, na usalama wa mnyororo wa ugavi
  - **Orodha ya Kukagua Utekelezaji**: Udhibiti wa lazima dhidi ya ulio pendekezwa na faida za mazingira ya usalama ya Microsoft

### Ubora wa Uandishi wa Habari & Ulinganifu wa Viwango
- **Marejeleo ya Maelezo**: Imesasisha marejeleo yote kwa Maelezo ya MCP ya sasa 2025-06-18
- **Eneo la Usalama la Microsoft**: Mwongozo wa ushirikiano ulioboreshwa katika nyaraka zote za usalama
- **Utekelezaji wa Vitendo**: Iliongeza mifano ya kina ya msimbo katika .NET, Java, na Python yenye mifumo ya biashara
- **Mpangilio wa Rasilimali**: Usanidi kamili wa nyaraka rasmi, viwango vya usalama, na miongozo ya utekelezaji
- **Vidokezo vya Kuona**: Kuweka wazi mahitaji ya lazima dhidi ya mazoea yaliyopendekezwa


#### Dhana Msingi (01-CoreConcepts/) - Uboreshaji Kamili
- **Sasisho la Toleo la Protokoli**: Sasisho kwa marejeleo ya Maelezo ya MCP ya sasa 2025-06-18 na muundo wa tarehe (YYYY-MM-DD)
- **Kuboresha Usanifu**: Maelezo ya kina ya Wamiliki, Wateja, na Servers kuendana na mifumo ya usanifu ya MCP ya sasa
  - Wamiliki sasa wamefafanuliwa wazi kama programu za AI zinazoongoza uhusiano wa wateja wengi wa MCP
  - Wateja wameelezewa kama viunganishi wa itifaki vinavyoendeleza uhusiano wa moja kwa moja na server
  - Servers wameboreshwa kwa hali za uanzishaji wa ndani dhidi ya mbali
- **Mabadiliko ya Msingi**: Marekebisho kamili ya primitives za server na mteja
  - Primitives za Server: Rasilimali (vyanzo vya data), Prompts (mitindo), Zana (kazi zinazotekelezwa) na maelezo na mifano ya kina
  - Primitives za Mteja: Sampuli (ukamilishaji wa LLM), Ufafanua (ingizo la mtumiaji), Kufuata (kufuatilia/kukagua)
  - Imesasishwa na mifumo ya kisasa ya ugunduzi (`*/list`), upokeaji (`*/get`), na utekelezaji (`*/call`)
- **Usanifu wa Protokoli**: Imeanzishwa mfano wa usanifu wa tabaka mbili
  - Tabaka la Data: Msingi wa JSON-RPC 2.0 wenye usimamizi wa mzunguko wa maisha na primitives
  - Tabaka la Usafirishaji: STDIO (ndani) na HTTP inayopitisha mtiririko na SSE (mbali) kwa usafirishaji
- **Mfumo wa Usalama**: Kanuni kamili za usalama zikiwemo ridhaa wazi ya mtumiaji, ulinzi wa faragha ya data, usalama wa utekelezaji wa zana, na usalama wa tabaka la usafirishaji
- **Mifumo ya Mawasiliano**: Ujumbe wa itifaki ulisasishwa kuonyesha uanzishaji, ugundaji, utekelezaji, na mtiririko wa taarifa
- **Mifano ya Msimbo**: Mifano ya lugha nyingi ilifanyiwa marekebisho (.NET, Java, Python, JavaScript) kuendana na mifumo ya sasa ya MCP SDK

#### Usalama (02-Security/) - Kuboresha Kamili Usalama  
- **Ulinganifu wa Viwango**: Ulinganifu kamili na mahitaji ya usalama ya Maelezo ya MCP 2025-06-18
- **Mageuzi ya Uthibitishaji**: Mageuzi yaliyoandikwa kutoka seva za OAuth za kawaida hadi usimamizi wa mtoaji wa utambulisho wa nje (Microsoft Entra ID)
- **Uchambuzi wa Hatari za KI-SASA wa AI**: Ufungaji ulioboreshwa wa njia za kushambulia AI za kisasa
  - Mifano ya kina ya matukio ya shambulio la kuingiza prompt
  - Mbinu za sumu ya zana na mifumo ya shambulio la "rug pull"
  - Uchafu wa dirisha la muktadha na mashambulio ya kuchanganya modeli
- **Suluhisho za Usalama za AI za Microsoft**: Ufungaji wa kina wa mazingira ya usalama ya Microsoft
  - AI Prompt Shields zenye kugundua kwa hali ya juu, kuangazia, na mbinu za delimiter
  - Mifumo ya ushirikiano wa Azure Content Safety
  - GitHub Advanced Security kwa ulinzi wa mnyororo wa ugavi
- **Kuzuia Hatari za Juu**: Udhibiti wa kina wa usalama kwa
  - Uharibifu wa kikao na matukio ya shambulio maalum ya MCP na mahitaji ya nambari ya utambulisho wa kikao wa kriptografia
  - Matatizo ya mtoaji mchanganyiko katika hali za wakala wa MCP na mahitaji ya ridhaa wazi
  - Uraibu wa kuingia tokeni na udhibiti wa lazima wa uthibitishaji
- **Usalama wa Mnyororo wa Ugavi**: Ufungaji wa kina wa mnyororo wa ugavi wa AI ikijumuisha mifano ya msingi, huduma za embeddings, watoa muktadha, na API za watu wa tatu
- **Usalama wa Msingi**: Ushirikiano ulioboreshwa na mifumo ya usalama ya biashara ikiwa ni pamoja na usanifu wa imani sifuri na mazingira ya usalama ya Microsoft
- **Mpangilio wa Rasilimali**: Viungo vya rasilimali kamili vimepangwa kwa aina (Nyaraka Rasmi, Viwango, Utafiti, Suluhisho za Microsoft, Miongozo ya Utekelezaji)

### Maboresho ya Ubora wa Uandishi wa Habari
- **Malengo ya Kujifunza Yaliyopangwa**: Malengo ya kujifunza yameboreshwa na matokeo maalum, yanayotekelezeka 
- **Marejeo Mbalimbali**: Viungo vimeongezwa kati ya mada za usalama na dhana msingi zinazohusiana
- **Taarifa za Sasa**: Marejeleo yote ya tarehe na viungo vya maelezo yamesasishwa kwa viwango vya sasa
- **Mwongozo wa Utekelezaji**: Miongozo maalum, inayoendana ya utekelezaji imeongezwa katika sehemu zote mbili

## Julai 16, 2025

### Maboresho ya README na Uvinjari
- Mpangilio wa uvinjari wa mtaala umerekebishwa kabisa katika README.md
- Ilibadilishwa lebo za `<details>` na muundo wa meza wa urahisi zaidi
- Chaguo mbadala za muundo zimeundwa katika folda mpya "alternative_layouts"
- Mifano ya uvinjari ya kadi, mtindo wa tabo, na mtindo wa accordion imeongezwa
- Sehemu ya muundo wa hifadhi imesasishwa kujumuisha faili zote mpya kabisa
- Sehemu ya "Jinsi ya Kutumia Mtaala Huu" imeongezwa mapendekezo wazi
- Viungo vya maelezo ya MCP vimesasishwa kuelekeza URL sahihi
- Sehemu ya Uhandisi wa Muktadha (5.14) imeongezwa kwenye muundo wa mtaala

### Sasisho la Mwongozo wa Kusoma
- Mwongozo wa kusoma umerekebishwa kabisa kuendana na muundo wa sasa wa hifadhi
- Sehemu mpya za Wateja wa MCP na Zana, na Servers maarufu za MCP zimeongezwa
- Ramani ya Mtaala wa Picha imesasishwa kuonyesha mada zote kwa usahihi
- Maelezo ya Mada za Juu yameboreshwa kufunika maeneo yote maalum
- Sehemu ya Masomo ya Kesi imesasishwa kuonyesha mifano halisi
- Faili hii ya kumbukumbu ya mabadiliko imeongezwa

### Michango ya Jumuiya (06-CommunityContributions/)
- Taarifa za kina kuhusu seva za MCP kwa uzalishaji wa picha zimeongezwa
- Sehemu kamili kuhusu kutumia Claude ndani ya VSCode imeongezwa
- Maelekezo ya usanidi na matumizi ya mteja wa terminal wa Cline yameongezwa
- Sehemu ya mteja wa MCP imesasishwa kujumuisha chaguzi zote maarufu za mteja
- Mifano ya michango imboreshwa kwa kutumia mifano ya msimbo sahihi zaidi

### Mada za Juu (05-AdvancedTopics/)
- Folda zote za mada maalum zimepangwa kwa majina thabiti
- Vifaa na mifano ya uhandisi wa muktadha zimeongezwa
- Nyaraka za ushirikiano wa wakala Foundry zimeongezwa
- Nyaraka za ushirikiano wa usalama wa Entra ID ziliboreshwa

## Juni 11, 2025

### Uundaji wa Awali
- Toa toleo la kwanza la mtaala wa MCP kwa Waanzilishi
- Unda muundo wa msingi wa sehemu kuu 10 zote
- Tekeleza Ramani ya Mtaala wa Picha kwa urambazaji
- Toa miradi ya mfano ya awali katika lugha mbalimbali za programu

### Kuanzia (03-GettingStarted/)
- Tengeneza mifano ya utekelezaji wa seva ya kwanza
- Ongeza mwongozo wa maendeleo ya mteja
- Jumuisha maelekezo ya ushirikiano wa mteja LLM
- Ongeza nyaraka za ushirikiano wa VS Code
- Tekeleza mifano ya Server-Sent Events (SSE)

### Dhana Msingi (01-CoreConcepts/)
- Ongeza maelezo ya kina ya usanifu wa mteja-server
- Unda nyaraka kuhusu vipengele vikuu vya itifaki
- Tandaza mifumo ya ujumbe katika MCP

## Mei 23, 2025

### Muundo wa Hifadhi
- Anzisha hifadhi na muundo wa msingi wa folda
- Unda faili za README kwa kila sehemu kuu
- Weka miundombinu ya tafsiri
- Ongeza mali za picha na michoro

### Uandishi wa Habari
- Unda README.md ya awali yenye muhtasari wa mtaala
- Ongeza CODE_OF_CONDUCT.md na SECURITY.md
- Weka SUPPORT.md na mwongozo wa kupata msaada
- Unda muundo wa awali wa mwongozo wa kusoma

## Aprili 15, 2025

### Mipango na Mfumo
- Mipango ya awali kwa mtaala wa MCP kwa Waanzilishi
- Tambua malengo ya kujifunza na hadhira lengwa
- Eleza muundo wa sehemu 10 za mtaala
- Tengeneza mfumo wa dhana kwa mifano na masomo ya kesi
- Unda mifano ya awali ya majaribio kwa dhana kuu

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->