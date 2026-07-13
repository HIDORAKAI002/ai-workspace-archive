# Protokol změn: MCP pro začátečníky – učební plán

Tento dokument slouží jako záznam všech významných změn provedených v učebním plánu Model Context Protocolu (MCP) pro začátečníky. Změny jsou zaznamenány v obráceném chronologickém pořadí (nejnovější změny nejdříve).

## 2. července 2026

### Nová lekce: Kandidát na vydání specifikace MCP 2026-07-28

Přidáno pokrytí nadcházejícího kandidáta na vydání specifikace MCP `2026-07-28` (oznámeno 21. května 2026; plánované finální vydání 28. července 2026), shrnuté z [oficiálního blogového příspěvku s oznámením](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Základ učebního plánu zůstává **MCP Specifikace 2025-11-25**, dokud nebude nová verze vydána, takže toto je uvedeno jako pohled do budoucna spíše než přepis existujících lekcí.

- **Nové**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — celá lekce pokrývající bezstavový jádrový protokol (odbavení odstranění handshake `initialize` a hlavičky `Mcp-Session-Id`), nové směrovací hlavičky `Mcp-Method`/`Mcp-Name`, metadata ke kešování `ttlMs`/`cacheScope`, W3C Trace Context v `_meta`, formální rozšíření Extensions (MCP aplikace a nové rozšíření Tasks), šest SEPs s tvrzenou autorizací, vyřazení Roots/Sampling/Logging a přechod na plný JSON Schema 2020-12 pro schémata nástrojů.
- **Aktualizováno** s odkazy na novou lekci:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): poznámka o verzi protokolu, sekce Sampling/Roots/Logging/Tasks a „Co dál“
  - [02-Security/README.md](./02-Security/README.md): upozornění na tvrzení autorizace
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): upozornění na bezstavový transport
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): upozornění na vyřazení Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): upozornění na vyřazení Logging a rozšíření Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): upozornění na bezstavový/směrovací režim
  - [README.md](./README.md): poznámka „Pohled dopředu“ v sekci specifikace a nový záznam `1.1` v tabulce modulů učebního plánu
  - [study_guide.md](./study_guide.md): budoucí bod pod přehledem základních pojmů a datovaná poznámka dodatku
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): upozornění na mapování transportu `mcp-session-id` před bezstavovým modelem požadavku
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): upozornění v přehledu modulu na vyřazení Root Contexts/Sampling a rozšíření Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): upozornění na tvrzení autorizace

## 24. června 2026

### Nová lekce: Použití MCP v aplikaci Copilot

- [Sekce Nástroje](./12-tooling/README.md) Přidána sekce nástrojů.
- [MCP v aplikaci Copilot](./12-tooling/01-copilot-app/README.md)

## 16. června 2026

### Zarovnání specifikace MCP a ověření příkladů

Ověřen učební plán vůči aktuální **MCP Specifikaci 2025-11-25** a nejnovějším oficiálním SDK, následně opraveny zastaralé odkazy na specifikaci a potvrzeno, že základní příklady stále fungují a běží.

#### Opravy verzí specifikace (2025-06-18 / 2025-03-26 → 2025-11-25)

Aktualizován anglický obsah tam, kde bylo stále uvedeno, že starší revize specifikace je *aktuálním/nejnovějším* standardem, a přesměrovány odkazy na kanonické cesty specifikace na `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Aktualizován banner „Aktuální standard“, úvod, hlavička hlavních bezpečnostních principů, povinných požadavků, sekce Microsoft Entra ID, odkazy Reference & Resources a závěrečná bezpečnostní poznámka (8 odkazů) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aktualizován odkaz na Additional Resources a banner „Aktuální standard“ na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Nahrazen zastaralý odkaz `2025-03-26` na bezpečnost a důvěru aktuální stránkou o bezpečnostních postupech 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Aktualizován oficiální odkaz na dokumentaci Sampling na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aktualizována současná reference „aktuální specifikace MCP“ v přítomném čase a odkaz na Additional Resources na 2025-11-25 (historické poznámky o ukončení SSE ponechány pro přesnost)

#### Ověření příkladů vůči aktuálním SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` vyřešil `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` prošel bez typových chyb — existující API `McpServer`/`StdioServerTransport` zůstávají platná
- **Python (03-GettingStarted/01-first-server/solution/python)**: Ověřeno v izolovaném `.venv` s `mcp[cli]` (1.27.2); `py_compile` prošel a `FastMCP.list_tools()` správně vrátil nástroje `add` a `subtract`
- Potvrzeno, že všechny rozsahy verzí `@modelcontextprotocol/sdk` v příkladech (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se čistě řeší na aktuální `1.29.0` bez porušení API

#### Slaďování verzí závislostí (uzavírání mezer ve verzích)

Aktualizovány zastaralé zámky SDK tak, aby každý příklad sledoval aktuální vydání MCP, v souladu s konvencí v celém repozitáři:

- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Zvýšena verze `@modelcontextprotocol/sdk` z `^1.8.0` na `>=1.26.0` a aktualizován zastaralý popis balíčku `"updated for MCP 2025-06-18"` na `"v souladu se specifikací MCP 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** a **lab4/code/github_mcp_server/pyproject.toml**: Zvýšena přesná verze `mcp==1.23.0` na `mcp>=1.26.0`; znovu vygenerovány oba soubory `uv.lock` (`uv lock`), takže lockfile nyní odkazují na aktuální `mcp 1.27.2` a zůstanou synchronizovány s manifesty

#### Analýza Mezer ve Výuce — Pokrytí Nejnovějších Specifikací

Ověřeno, že učební plán již pokrývá všechny primitivy zavedené/rozšířené ve specifikaci MCP 2025-11-25, tudíž nezůstávají žádné obsahové mezery:
- **Sampling**: Lekce 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (včetně režimu URL)**: Zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Zdokumentováno v 00-Introduction, 01-CoreConcepts a 05-AdvancedTopics/mcp-root-contexts
- **Úkoly (experimentální, dlouhotrvající operace)**: Zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Anotace nástrojů** (`readOnlyHint` / `destructiveHint`): Zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features

### Zpevnění Bezpečnosti & Odstranění Zranitelností v Závislostech

Provedena kompletní bezpečnostní kontrola všech manifestů závislostí a ukázkového zdrojového kódu, poté odstraněny všechny hlášené bezpečnostní upozornění npm a jedno zjištění na úrovni kódu. Po opravě `npm audit` hlásí **0 zranitelností** ve všech kontrolovaných adresářích.

#### Zranitelnosti závislostí npm (přechodné) — Opraveny

Provedena kontrola všech 15 zadaných souborů `package-lock.json`. Zranitelnosti byly omezeny na přechodné závislosti zavedené vývojovým nástrojem MCP Inspector, klientem OpenAI a MCP SDK; všechny nyní vyřešeny bez porušení vzorových projektů:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** a **lab3/code/weather_mcp/inspector**: Zvýšena verze `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), což odstranilo bezpečnostní upozornění balíčků `ajv`, `brace-expansion`, `diff`, `path-to-regexp` a `ws`. Přidán záznam npm `overrides` vynucující opravený `shell-quote@1.8.4` k odstranění zbývající kritické chyby přenášené `concurrently`; znovu vygenerovány oba lockfile (nyní 0 zranitelností)
- **03-GettingStarted/samples/typescript**: `npm audit fix` aktualizoval přechodný balíček `qs` (střední riziko) na opravnou verzi
- **03-GettingStarted/samples/javascript**: `npm audit fix` aktualizoval přechodný balíček `hono` (střední riziko) na opravnou verzi
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` aktualizoval přechodný balíček `form-data` (vysoké riziko) na opravnou verzi
- **03-GettingStarted/11-simple-auth/solution/typescript**: Vygenerován chybějící soubor `package-lock.json`, takže projekt je reprodukovatelný a auditovatelný (0 zranitelností)

#### Oprava Bezpečnosti na Úrovni Kódu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odebrána volba `shell=True` z nástroje `open_in_vscode`. Předchozí příkaz `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` umožňoval, aby shell metaznaky ve složkové cestě byly interpretovány `cmd.exe` (vektor příkazové injekce). Nyní spouští přímo nakonfigurovaný `Code.exe` se složkou jako argumentem — bez shellu — což je funkčně ekvivalentní a bezpečné

#### Kontrola Závislostí pro Python

- Prověřeno každé pythoní požadavkové nastavení pomocí `pip-audit`. `05-AdvancedTopics` a `03-GettingStarted/samples/python` nehlásí **žádné známé zranitelnosti** (jejich rozsahy `mcp` / `httpx` / `pydantic` / `python-dotenv` se odkazují na aktuální opravené verze)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` upozornil na přechodnou závislost **`werkzeug` 3.1.1** se třemi bezpečnostními upozorněními typu safe_join pro zařízení Windows – `CVE-2025-66221`, `CVE-2026-21860` a `CVE-2026-27199` (vše opraveno ve verzi 3.1.6). Přidána explicitní bezpečnostní závislost `werkzeug>=3.1.6`, aby byla vyřešena opravená verze; ověřeno, že omezení se čistí vyhodnocuje se zásobou `chainlit` / `mcp` / `semantic-kernel`

### Přejmenování Produktu

Aktualizován veškerý obsah kurikula tak, aby odrážel přejmenování produktu Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aktualizován odkaz na komunitu Discord
- **AGENTS.md**: Aktualizována reference serveru Discord
- **README.md**: Aktualizovány odkazy na technologický ekosystém
- **study_guide.md**: Aktualizovány reference případových studií
- **05-AdvancedTopics/README.md**: Aktualizován název a popis modulu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Aktualizován nadpis části a popis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kompletní aktualizace názvu a obsahu modulu
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aktualizován odkaz mezi dokumenty
- **07-LessonsfromEarlyAdoption/README.md**: Aktualizovány reference případových studií
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aktualizován nadpis sekce 9, odznaky a schopnosti
- **08-BestPractices/README.md**: Aktualizován odkaz na komunitu Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aktualizována reference kanálu Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aktualizována reference nasazení modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aktualizována tabulka AI služeb

- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aktualizovány odkazy na zdroje

#### AI Toolkit / AITK → Rozšíření Microsoft Foundry Toolkit pro VS Code

- **README.md**: Aktualizovány hlavní odkazy v osnově
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aktualizován název modulu, přehled a všechny záhlaví modulů
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aktualizován název, vzdělávací cíle, instrukce pro nastavení a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aktualizován název, vzdělávací cíle, tabulka MCP hostitelů a vzájemné odkazy
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aktualizován název, odznaky, předpoklady a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aktualizovány odkazy na Agent Builder a odkaz na zpětnou vazbu
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aktualizovány předpoklady a odkazy na rozšíření

---

## 11. dubna 2026

### Nová lekce, opravy dokumentace a aktualizace závislostí

#### Přidán nový obsah osnovy

**Modul 05 - Pokročilá témata**
- **Lekce 5.17: Adversariální multiagentní uvažování s MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nový komplexní průvodce pokrývající vzor adversariální debaty pro multiagentní systémy
  - Diagram architektury Mermaid: dva agenti → sdílený MCP server → zápis debaty → soudce → verdikt
  - Sdílený MCP nástrojový server (`web_search` + `run_python`) implementovaný v Pythonu a TypeScriptu
  - Protikladné systémové výzvy (PRO / PROTI / Soudce) s explicitními požadavky na použití nástrojů
  - Orchestrátor debaty v Pythonu, TypeScriptu a C#, který řídí kola a směruje argumenty
  - Zapojení MCP `ClientSession` pro orchestrátora pro skutečné volání nástrojů
  - Tabulka případů užití (detekce halucinací, modelování hrozeb, revize návrhu API, ověřování faktů, výběr technologií)
  - Bezpečnostní aspekty: sandboxové provádění, validace volání nástrojů, omezení rychlosti, auditní protokolování
  - Strukturované cvičení se třemi praktickými scénáři (kontrola kódu, rozhodování o architektuře, moderace obsahu)

#### Opravy dokumentace

**Modul 03 - Začínáme**
- **05-stdio-server/README.md**: Oprava neúplného příkladu TypeScript stdio serveru — přidání chybějícího vytvoření transportu (`new StdioServerTransport()`) a volání `server.connect(transport)` k souladu s příklady v Pythonu a .NET v téže sekci
- **14-sampling/README.md**: Oprava překlepu — oprava `"Sampling is an davanced features"` na `"Sampling is an advanced feature"`

#### Aktualizace osnovy

**Hlavní README.md**
- Přidán záznam 5.17 (Adversariální multiagentní uvažování s MCP) do tabulky osnovy s přímým odkazem na novou lekci

**05-AdvancedTopics/README.md**
- Přidán řádek Lekce 5.17 do tabulky lekcí

**study_guide.md**
- Přidán téma Adversariální multiagentní uvažování do myšlenkové mapy a popisu Pokročilých témat

#### Opravy kódu a bezpečnosti

**Modul 05 - Adversariální agenti (`mcp-adversarial-agents`)**
- **Bezpečnostní oprava — injektáž příkazů**: Nahrazení shellové interpolace `execSync` za `execFile` + `promisify` v TypeScript nástroji `run_python`, odstranění povrchu injektáže příkazů (kód řízený LLM je nyní předáván jako doslovný prvek argv bez zapojení shellu)
- **Zapojení smyčky MCP nástroje**: Aktualizace Python orchestrátoru debaty pro použití klienta `AsyncAnthropic` místo blokujícího synchonního `Anthropic`, předávání živé `ClientSession` přímo každému tahu agenta, získávání definic nástrojů přes `session.list_tools()` v každém tahu a vysílání bloků `tool_use` přes `session.call_tool()` v cyklu dokud model nevygeneruje konečnou textovou odpověď

#### Aktualizace závislostí

- Aktualizováno `hono` na verzi 4.12.12 v několika balíčcích (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Aktualizováno `@hono/node-server` z 1.19.11 na 1.19.13 v TypeScript balíčcích
- Aktualizováno `cryptography` z 46.0.5 na 46.0.7 v Python balíčcích (10-StreamliningAIWorkflows laboratoře 3 a 4)
- Aktualizováno `lodash` z 4.17.23 na 4.18.1 v inspektoru 10-StreamliningAIWorkflows

#### Překlady

- Synchronizace překladů pro 48+ jazyků s nejnovějšími změnami zdrojů (aktualizace i18n)

---

## 5. února 2026

### Vylepšení ověřování a navigace v celém repozitáři

#### Přidán nový obsah osnovy

**Modul 03 - Začínáme**
- **12-mcp-hosts/README.md**: Nový komplexní průvodce nastavením MCP hostitelů
  - Konfigurační příklady pro Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Šablony JSON konfigurace pro všechny hlavní hostitele
  - Tabulka porovnání typů transportu (stdio, SSE/HTTP, WebSocket)
  - Řešení běžných problémů s připojením
  - Bezpečnostní nejlepší postupy pro konfiguraci hostitelů

- **13-mcp-inspector/README.md**: Nový průvodce laděním MCP Inspectoru
  - Způsoby instalace (npx, npm globálně, ze zdroje)
  - Připojení k serverům přes stdio a HTTP/SSE
  - Testování nástrojů, zdrojů a pracovních postupů výzev
  - Integrace VS Code s MCP Inspectorem
  - Běžné ladicí scénáře s řešeními

**Modul 04 - Praktická implementace**
- **pagination/README.md**: Nový průvodce implementací stránkování
  - Vzory stránkování založeného na kurzoru v Pythonu, TypeScriptu, Javě
  - Zpracování stránkování na straně klienta
  - Strategie návrhu kurzoru (neprůhledný vs. strukturovaný)
  - Doporučení pro optimalizaci výkonu

**Modul 05 - Pokročilá témata**
- **mcp-protocol-features/README.md**: Nový detailní rozbor vlastností protokolu
  - Implementace notifikací průběhu
  - Vzory zrušení požadavku
  - Šablony zdrojů s URI vzory
  - Správa životního cyklu serveru
  - Řízení úrovně protokolování
  - Vzory zpracování chyb s JSON-RPC kódy

#### Opravy navigace (aktualizováno 24+ souborů)

**Hlavní modulové README**
 Nyní obsahují odkazy jak na první lekci, tak na další modul

**02-Security podřízené soubory**
- Všechny 5 doplňujících bezpečnostních dokumentů nyní obsahují navigaci "Co dál"

**09-CaseStudy soubory**
- Všechny případové studie nyní mají sekvenční navigaci

**10-StreamliningAI laboratoře**
Přidána sekce Co dál do přehledu Modulu 10 a Modulu 11

#### Opravy kódu a obsahu

**Aktualizace SDK a závislostí**
Opravená prázdná verze openai na `^4.95.0`
Aktualizováno SDK z `^1.8.0` na `>=1.26.0`
Aktualizovány verze mcp na `>=1.26.0`

**Opravy kódu**
Opravený neplatný model `gpt-4o-mini` na `gpt-4.1-mini`

**Opravy obsahu**
Opraven nefunkční odkaz `READMEmd` → `README.md`, oprava záhlaví osnovy `Module 1-3` → `Module 0-3`, oprava citlivosti na velká/malá písmena v cestě
Odstraněn poškozený duplicitní obsah Případové studie 5

**Vylepšení vedení pro začátečníky**
Přidán správný úvod, vzdělávací cíle a předpoklady pro začátečníky

#### Aktualizace osnovy

**Hlavní README.md**
- Přidány záznamy 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Stránkování), 5.16 (Vlastnosti protokolu) do tabulky osnovy

**Modulové README**
Přidány lekce 12 a 13 do seznamu lekcí
Přidána sekce Praktické průvodce s odkazem na stránkování
Přidány lekce 5.15 (Vlastní transport) a 5.16 (Vlastnosti protokolu)

**study_guide.md**
- Aktualizována myšlenková mapa se všemi novými tématy: Nastavení MCP hostitelů, MCP Inspector, strategie stránkování, detailní pohled na vlastnosti protokolu

## 28. ledna 2026

### Přezkum souladu se specifikací MCP 2025-11-25

#### Vylepšení základních konceptů (01-CoreConcepts/)
- **Nový primitiv klienta - Roots**: Přidána komplexní dokumentace k primitivu klienta Roots, který umožňuje serverům chápat hranice souborového systému a přístupová oprávnění
- **Anotace nástrojů**: Přidána dokumentace k behaviorálním anotacím nástrojů (`readOnlyHint`, `destructiveHint`) pro lepší rozhodování o spuštění nástroje
- **Volání nástrojů ve Sampling**: Aktualizována dokumentace Sampling o parametry `tools` a `toolChoice` pro model-řízené volání nástrojů při žádostech o sampling
- **URL Mode Elicitation**: Přidána dokumentace k elicitation režimu založenému na URL pro externí webové interakce inicializované serverem
- **Úkoly (Experimentální)**: Přidána nová sekce dokumentující experimentální funkci Úkoly pro trvalé obalování provádění a odložené načítání výsledků
- **Podpora ikon**: Poznamenáno, že nástroje, zdroje, šablony zdrojů a výzvy nyní mohou obsahovat ikony jako další metadata

#### Aktualizace dokumentace
- **README.md**: Přidána reference na verzi MCP Specification 2025-11-25 a vysvětlení verzování podle data
- **study_guide.md**: Aktualizována mapa osnovy o Úkoly a Anotace nástrojů v sekci Základní koncepty; aktualizován časový údaj dokumentu

#### Ověření souladu se specifikací
- **Verze protokolu**: Ověřeny všechny dokumentační odkazy na aktuální MCP Specification 2025-11-25
- **Shoda architektury**: Potvrzena přesnost dokumentace dvouvrstvé architektury (Datová vrstva + Transportní vrstva)
- **Dokumentace primitiv**: Validovány serverové primitivy (Zdroje, Výzvy, Nástroje) a klientské primitivy (Sampling, Elicitation, Protokolování, Roots)
- **Transportní mechanismy**: Ověřena přesnost dokumentace STDIO a Streamable HTTP transportu
- **Bezpečnostní pokyny**: Potvrzena shoda s aktuální dokumentací MCP Security Best Practices

#### Hlavní funkce MCP 2025-11-25 zdokumentovány
- **Objevování OpenID Connect**: Objevování auth serveru přes OIDC
- **Metadata dokumenty OAuth Client ID**: Doporučený mechanismus registrace klienta
- **JSON Schema 2020-12**: Výchozí dialekt pro definice schématu MCP
- **Systém tříd SDK**: Formalizované požadavky na podporu a údržbu funkcí SDK
- **Struktura řízení**: Formalizované Pracovní skupiny a Zájmové skupiny v správě MCP

### Hlavní aktualizace bezpečnostní dokumentace (02-Security/)

#### Integrace MCP Security Summit Workshop (Sherpa)
- **Nový zdroj praktického školení**: Přidána komplexní integrace s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) do celé bezpečnostní dokumentace
- **Pokrytí trasy expedice**: Zdokumentován kompletní postup od základního tábora po vrchol
- **Shoda s OWASP**: Veškerá bezpečnostní doporučení nyní mapují rizika z OWASP MCP Azure Security Guide

#### Integrace OWASP MCP Top 10
- **Nová sekce**: Přidána tabulka OWASP MCP Top 10 bezpečnostních rizik s mitigacemi Azure do hlavního bezpečnostního README
- **Dokumentace založená na rizicích**: Aktualizován dokument mcp-security-controls-2025.md o odkazy na OWASP MCP rizika pro každou bezpečnostní oblast
- **Referenční architektura**: Propojeno s OWASP MCP Azure Security Guide referenční architekturou a implementačními vzory

#### Aktualizované bezpečnostní soubory
- **README.md**: Přidán přehled Sherpa Workshopu, tabulka trasy expedice, shrnutí OWASP MCP Top 10 rizik a sekce praktického školení
- **mcp-security-controls-2025.md**: Aktualizováno záhlaví na únor 2026, přidány odkazy na OWASP rizika (MCP01-MCP08), opraveno nekonzistentní číslo specifikace
- **mcp-security-best-practices-2025.md**: Přidána sekce zdrojů Sherpa a OWASP, aktualizován časový údaj
- **mcp-best-practices.md**: Přidána sekce praktického školení s odkazy na Sherpa a OWASP
- **azure-content-safety-implementation.md**: Přidán odkaz na OWASP MCP06, sladění s Sherpa Camp 3, a rozšířená sekce zdrojů

#### Přidány nové odkazy na zdroje
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Jednotlivé stránky OWASP MCP rizik (MCP01-MCP10)

### Osnova v celém kurzu: Soulad se specifikací MCP 2025-11-25

#### Modul 03 - Začínáme
- **Dokumentace SDK**: Přidán Go SDK do oficiálního seznamu SDK; aktualizovány všechny odkazy SDK v souladu se specifikací MCP 2025-11-25
- **Upřesnění transportu**: Aktualizovány popisy STDIO a HTTP Streaming transportů s explicitními odkazy na specifikaci

#### Modul 04 - Praktická implementace
- **Aktualizace SDK**: Přidán Go SDK; aktualizován seznam SDK s referencí na verzi specifikace
- **Specifikace autorizace**: Aktualizován odkaz na MCP Authorization specifikaci na aktuální verzi 2025-11-25

#### Modul 05 - Pokročilá témata
- **Nové funkce**: Přidána poznámka o nových funkcích MCP Specification 2025-11-25 (Úkoly, Anotace nástrojů, URL Mode Elicitation, Roots)
- **Bezpečnostní zdroje**: Přidány odkazy na OWASP MCP Top 10 a Sherpa workshop jako doplňkové reference

#### Modul 06 - Přispění komunity
- **Seznam SDK**: Přidány Swift a Rust SDK; aktualizován odkaz na specifikaci na 2025-11-25
- **Odkaz na specifikaci**: Aktualizován odkaz MCP Specification na přímou URL specifikace

#### Modul 07 - Lekce z raného nasazení

- **Aktualizace zdrojů**: Přidán odkaz na MCP Specification 2025-11-25 a OWASP MCP Top 10 do doplňkových zdrojů

#### Modul 08 - Nejlepší postupy
- **Verze specifikace**: Aktualizována reference MCP Specification na verzi 2025-11-25
- **Bezpečnostní zdroje**: Přidán OWASP MCP Top 10 a Sherpa workshop do doplňkových odkazů

#### Modul 10 - Zjednodušení AI pracovních postupů
- **Aktualizace odznaku**: Změněn odznak verze MCP z verze SDK (1.9.3) na verzi specifikace (2025-11-25)
- **Odkazy na zdroje**: Aktualizován odkaz na MCP Specification; přidán OWASP MCP Top 10

#### Modul 11 - Praktické laboratoře MCP serveru
- **Reference specifikace**: Aktualizován odkaz na MCP Specification na verzi 2025-11-25
- **Bezpečnostní zdroje**: Přidán OWASP MCP Top 10 do oficiálních zdrojů

## 18. prosince 2025

### Aktualizace bezpečnostní dokumentace - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Aktualizace verze specifikace
- **Aktualizace verze protokolu**: Aktualizováno na nejnovější MCP Specification 2025-11-25 (vydáno 25. listopadu 2025)
  - Aktualizovány všechny odkazy na verzi specifikace z 18. 6. 2025 na 25. 11. 2025
  - Aktualizovány datumové odkazy v dokumentu z 18. srpna 2025 na 18. prosince 2025
  - Ověřeno, že všechny URL specifikace směřují na aktuální dokumentaci
- **Validace obsahu**: Komplexní kontrola bezpečnostních nejlepších postupů podle nejnovějších standardů
  - **Microsoft Security Solutions**: Ověřena aktuálnost terminologie a odkazů pro Prompt Shields (dříve "detekce rizika jailbreaku"), Azure Content Safety, Microsoft Entra ID a Azure Key Vault
  - **OAuth 2.1 Security**: Potvrzená shoda s nejnovějšími bezpečnostními postupy OAuth
  - **OWASP standardy**: Validována aktuálnost odkazů OWASP Top 10 pro LLM
  - **Azure služby**: Ověřeny všechny odkazy na Microsoft Azure dokumentaci a nejlepší postupy
- **Shoda se standardy**: Všechny odkazované bezpečnostní standardy potvrzeny jako aktuální
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Bezpečnostní a shodné rámce Azure
- **Implementační zdroje**: Ověřeny všechny odkazy a zdroje průvodců implementací
  - Vzory autentizace správy Azure API
  - Průvodce integrací Microsoft Entra ID
  - Správa tajemství Azure Key Vault
  - DevSecOps pipeline a monitorovací řešení

### Zajištění kvality dokumentace
- **Shoda se specifikací**: Zajištěno, že všechny povinné požadavky bezpečnosti MCP (MUST/MUST NOT) odpovídají nejnovější specifikaci
- **Aktualnost zdrojů**: Ověřeny všechny externí odkazy na Microsoft dokumentaci, bezpečnostní standardy a průvodce implementacemi
- **Pokrytí nejlepších postupů**: Potvrzeno komplexní pokrytí autentizace, autorizace, AI-specifických hrozeb, bezpečnosti dodavatelského řetězce a podnikových vzorů

## 6. října 2025

### Rozšíření sekce Začínáme – Pokročilé použití serveru a jednoduchá autentizace

#### Pokročilé použití serveru (03-GettingStarted/10-advanced)
- **Přidána nová kapitola**: Zaveden komplexní průvodce pokročilým použitím MCP serveru zahrnující jak běžné, tak nízkoúrovňové serverové architektury.
  - **Běžný vs. nízkoúrovňový server**: Detailní srovnání a ukázky kódu v Pythonu a TypeScriptu pro oba přístupy.
  - **Návrh založený na obslužných prvcích (handlers)**: Vysvětlení správy nástrojů/zdrojů/připomínek prostřednictvím handlerů pro škálovatelné a flexibilní implementace serveru.
  - **Praktické vzory**: Reálné scénáře, kde jsou nízkoúrovňové vzory serveru užitečné pro pokročilé funkce a architekturu.

#### Jednoduchá autentizace (03-GettingStarted/11-simple-auth)
- **Přidána nová kapitola**: Krok za krokem průvodce implementací jednoduché autentizace v MCP serverech.
  - **Koncepty autentizace**: Jasné vysvětlení rozdílu mezi autentizací a autorizací a zásad nakládání s přihlašovacími údaji.
  - **Implementace základní autentizace**: Vzory autentizace založené na middleware v Pythonu (Starlette) a TypeScriptu (Express), s ukázkami kódu.
  - **Pokrok k pokročilé bezpečnosti**: Návody, jak začít s jednoduchou autentizací a postupovat k OAuth 2.1 a RBAC, s odkazy na pokročilé bezpečnostní moduly.

Tyto doplňky poskytují praktické, prakticky orientované pokyny pro budování robustnějších, zabezpečenějších a flexibilnějších implementací MCP serveru, propojující základní koncepty s pokročilými produkčními vzory.

## 29. září 2025

### Laboratoře integrace databází MCP serveru – Komplexní praktická učební cesta

#### 11-MCPServerHandsOnLabs - Nový kompletní učební plán integrace databází
- **Kompletní 13-laboratorní učební cesta**: Přidán komplexní praktický kurz tvorby produkčně připravených MCP serverů s integrací databáze PostgreSQL
  - **Reálná implementace**: Use case Zava Retail analytiky ukazující podnikové vzory
  - **Strukturovaný postup učení**:
    - **Laboratoře 00-03: Základy** - Úvod, základní architektura, bezpečnost a multitenantnost, nastavení prostředí
    - **Laboratoře 04-06: Tvorba MCP serveru** - Návrh databáze a schématu, implementace MCP serveru, vývoj nástrojů  
    - **Laboratoře 07-09: Pokročilé funkce** - Integrace sémantického vyhledávání, testování a ladění, integrace s VS Code
    - **Laboratoře 10-12: Produkce a nejlepší postupy** - Strategie nasazení, monitorování a observability, nejlepší postupy a optimalizace
  - **Podnikové technologie**: Rámec FastMCP, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Pokročilé funkce**: Řízení přístupu na úrovni řádků (RLS), sémantické vyhledávání, přístup k datům pro více zákazníků, vektorová embedding, monitorování v reálném čase

#### Standardizace terminologie - převod modulu na laboratoř
- **Komplexní aktualizace dokumentace**: Systematicky aktualizovány všechny README soubory v 11-MCPServerHandsOnLabs k použití terminologie „Laboratoř“ místo „Modul“
  - **Nadpisy sekcí**: Aktualizováno „Co tento modul pokrývá“ na „Co tato laboratoř pokrývá“ napříč všemi 13 laboratořemi
  - **Popisy obsahu**: Změněno „Tento modul poskytuje...“ na „Tato laboratoř poskytuje...“ v dokumentaci
  - **Cíle učení**: Aktualizováno „Na konci tohoto modulu...“ na „Na konci této laboratoře...“
  - **Navigační odkazy**: Převod všech odkazů „Modul XX:“ na „Laboratoř XX:“ v křížových odkazech a navigaci
  - **Sledování dokončení**: Aktualizováno „Po dokončení tohoto modulu...“ na „Po dokončení této laboratoře...“
  - **Zachování technických odkazů**: Zachovány odkazy na Python moduly v konfiguračních souborech (např. `"module": "mcp_server.main"`)

#### Vylepšení průvodce studiem (study_guide.md)
- **Vizuální mapování kurikula**: Přidána nová sekce „11. Laboratoře integrace databází“ s přehledem struktury laboratoří
- **Struktura repozitáře**: Aktualizace z deseti na jedenáct hlavních sekcí s podrobným popisem 11-MCPServerHandsOnLabs
- **Pokyny pro studijní cestu**: Vylepšení navigačních instrukcí zahrnujících sekce 00-11
- **Pokrytí technologií**: Přidány podrobnosti o FastMCP, PostgreSQL a integraci Azure služeb
- **Výsledky učení**: Zvýraznění vývoje produkčně připravených serverů, vzorů integrace databází a podnikové bezpečnosti

#### Vylepšení struktury hlavního README
- **Terminologie založená na laboratořích**: Aktualizace hlavního README.md v 11-MCPServerHandsOnLabs k jednotnému použití struktury „Laboratoř“
- **Organizace studijní cesty**: Jasný postup od základních konceptů přes pokročilé implementace až po produkční nasazení
- **Důraz na reálný svět**: Zvýraznění praktického, laboratorního učení s podnikově orientovanými vzory a technologiemi

### Zlepšení kvality a konzistence dokumentace
- **Důraz na praktické učení**: Posílení praktického, laboratorního přístupu v celé dokumentaci
- **Důraz na podnikové vzory**: Zdůraznění produkčně připravených implementací a podnikových bezpečnostních aspektů
- **Integrace technologií**: Komplexní pokrytí moderních Azure služeb a AI integračních vzorů
- **Postup učení**: Jasná a strukturovaná cesta od základních konceptů k produkčnímu nasazení

## 26. září 2025

### Vylepšení případových studií – Integrace GitHub MCP Registry

#### Případové studie (09-CaseStudy/) - Důraz na vývoj ekosystému
- **README.md**: Rozsáhlé rozšíření s komplexní případovou studií GitHub MCP Registry
  - **Případová studie GitHub MCP Registry**: Nová podrobná případová studie mapující spuštění GitHub MCP Registry v září 2025
    - **Analýza problému**: Detailní rozbor fragmentace objevování a nasazení MCP serverů
    - **Architektura řešení**: Centralizovaný přístup registru GitHub s jedním kliknutím instalace ve VS Code
    - **Obchodní dopad**: Měřitelné zlepšení onboardingu vývojářů a produktivity
    - **Strategická hodnota**: Důraz na modulární nasazení agentů a interoperabilitu nástrojů
    - **Vývoj ekosystému**: Pozice jako základní platforma pro agentickou integraci
  - **Vylepšená struktura případové studie**: Aktualizovány všechny sedm případových studií jednotným formátováním a komplexními popisy
    - Azure AI Travel Agents: Důraz na orchestraci více agentů
    - Azure DevOps Integration: Zaměření na automatizaci workflow
    - Real-Time Documentation Retrieval: Implementace Python konzolového klienta
    - Interactive Study Plan Generator: Konverzační webová aplikace Chainlit
    - In-Editor Documentation: Integrace VS Code a GitHub Copilot
    - Azure API Management: Vzory podnikové integrace API
    - GitHub MCP Registry: Vývoj ekosystému a komunitní platforma
  - **Komplexní závěr**: Přepsaná závěrečná sekce zvýrazňující sedm případových studií pokrývajících více dimenzí implementace MCP
    - Podniková integrace, orchestraci více agentů, produktivitu vývojářů
    - Kategorizace vývoje ekosystému a vzdělávacích aplikací
    - Prohloubené poznatky o architektonických vzorech, implementačních strategiích a nejlepších postupech
    - Důraz na MCP jako vyspělý, produkčně připravený protokol

#### Aktualizace průvodce studiem (study_guide.md)
- **Vizuální mapa kurikula**: Aktualizace myšlenkové mapy o GitHub MCP Registry v sekci případových studií
- **Popis případových studií**: Vylepšení z obecného popisu na podrobný rozpis sedmi komplexních případových studií
- **Struktura repozitáře**: Aktualizace sekce 10, která odráží komplexní pokrytí případových studií se specifickými implementačními detaily
- **Integrace changelogu**: Přidáno záznam do 26. září 2025 dokumentující přidání GitHub MCP Registry a vylepšení případových studií
- **Aktualizace data**: Aktualizován časový údaj v patičce, aby odrážel poslední revizi (26. září 2025)

### Zlepšení kvality dokumentace
- **Zvýšení konzistence**: Standardizace formátování a struktury případových studií ve všech sedmi příkladech
- **Komplexní pokrytí**: Případové studie nyní zahrnují scénáře podnikové integrace, produktivity vývojářů a rozvoje ekosystému
- **Strategické postavení**: Zvýšený důraz na MCP jako základní platformu pro nasazení agentních systémů
- **Integrace zdrojů**: Aktualizace doplňkových zdrojů o odkaz na GitHub MCP Registry

## 15. září 2025

### Rozšíření pokročilých témat – Vlastní transporty a inženýrství kontextu

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Nový průvodce pokročilou implementací
- **README.md**: Kompletní průvodce implementací vlastních MCP transportních mechanismů
  - **Azure Event Grid Transport**: Komplexní implementace bezserverového event-driven transportu
    - Příklady v C#, TypeScriptu a Pythonu s integrací Azure Functions
    - Vzory event-driven architektury pro škálovatelná MCP řešení
    - Příjmače webhooků a push-based zpracování zpráv
  - **Azure Event Hubs Transport**: Implementace přenosu vysoké průchodnosti streamingu
    - Realtime streamingové schopnosti pro nízkolatenční scénáře
    - Strategie partitioningu a správa checkpointů
    - Batchování zpráv a optimalizace výkonu
  - **Vzory podnikové integrace**: Produkčně připravené architektonické příklady
    - Distribuované MCP zpracování přes více Azure Functions
    - Hybridní transportní architektury kombinující více typů transportů
    - Strategie trvanlivosti zpráv, spolehlivosti a zpracování chyb
  - **Bezpečnost a monitoring**: Integrace Azure Key Vault a vzory observability
    - Autentizace pomocí spravované identity a princip nejmenších práv
    - Telemetrie Application Insights a monitorování výkonu
    - Circuit breakers a vzory odolnosti proti chybám
  - **Testovací rámce**: Komplexní strategie testování vlastních transportů
    - Unit testy s testovacími dubléry a mocking frameworky
    - Integrační testování s Azure Test Containers
    - Zvážení výkonových a zatěžovacích testů

#### Inženýrství kontextu (05-AdvancedTopics/mcp-contextengineering/) - Vznikající disciplína AI
- **README.md**: Komplexní průzkum inženýrství kontextu jako vznikajícího oboru
  - **Základní principy**: Kompletní sdílení kontextu, povědomí o rozhodování akce a správa okna kontextu
  - **Soulad s protokolem MCP**: Jak design MCP řeší výzvy inženýrství kontextu
    - Omezení velikosti okna kontextu a strategie postupného načítání
    - Určování relevance a dynamické získávání kontextu
    - Multimodální zpracování kontextu a bezpečnostní aspekty
  - **Přístupy k implementaci**: Jednovláknové vs. víceagentní architektury
    - Chunkování a prioritizace kontextu
    - Postupné načítání a kompresní strategie kontextu
    - Vícevrstvé přístupy ke kontextu a optimalizace získávání
  - **Měřící rámec**: Vznikající metriky pro hodnocení efektivnosti kontextu
    - Efektivita vstupu, výkon, kvalita a zkušenost uživatele
    - Experimentální přístupy k optimalizaci kontextu
    - Analýza selhání a metodologie zlepšování

#### Aktualizace navigace kurikula (README.md)
- **Vylepšená struktura modulu**: Aktualizovaná tabulka kurikula zahrnující nová pokročilá témata
  - Přidány položky Inženýrství kontextu (5.14) a Vlastní transport (5.15)
  - Konzistentní formátování a navigační odkazy napříč všemi moduly
  - Aktualizované popisy reflektující aktuální rozsah obsahu

### Vylepšení struktury adresářů
- **Standardizace pojmenování**: Přejmenování „mcp transport“ na „mcp-transport“ pro konzistenci s ostatními složkami pokročilých témat
- **Organizace obsahu**: Všechny složky 05-AdvancedTopics nyní používají konzistentní vzor pojmenování (mcp-[téma])

### Zlepšení kvality dokumentace
- **Soulad se specifikací MCP**: Veškerý nový obsah odkazuje na aktuální MCP Specification 2025-06-18
- **Příklady v několika jazycích**: Komplexní příklady kódu v C#, TypeScriptu a Pythonu

- **Zaměření na podniky**: Produkčně připravené vzory a integrace Azure cloudu napříč
- **Vizualizace dokumentace**: Mermaid diagramy pro architekturu a vizualizaci toku

## 18. srpna 2025

### Komplexní aktualizace dokumentace - standardy MCP 2025-06-18

#### MCP Nejlepší bezpečnostní praktiky (02-Security/) - kompletní modernizace
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kompletní přepis sladěný se specifikací MCP 2025-06-18
  - **Povinné požadavky**: Přidány explicitní požadavky MUSÍ/NESMÍ z oficiální specifikace s jasnými vizuálními indikátory
  - **12 základních bezpečnostních praktik**: Přepracováno z 15 položek na komplexní bezpečnostní domény
    - Zabezpečení tokenů a autentizace s integrací externího poskytovatele identity
    - Správa relací a zabezpečení přenosu s kryptografickými požadavky
    - Ochrana specifická pro AI s integrací Microsoft Prompt Shields
    - Řízení přístupu a oprávnění s principem nejmenších práv
    - Bezpečnost obsahu a monitorování s integrací Azure Content Safety
    - Bezpečnost dodavatelského řetězce s komplexní verifikací komponent
    - OAuth bezpečnost a prevence Confused Deputy s implementací PKCE
    - Reakce na incidenty a zotavení s automatizovanými schopnostmi
    - Soulad a správa s regulatorním slaďováním
    - Pokročilá bezpečnostní opatření s zero trust architekturou
    - Integrace Microsoft bezpečnostního ekosystému s komplexními řešeními
    - Kontinuální vývoj bezpečnosti s adaptivními praktikami
  - **Microsoft bezpečnostní řešení**: Vylepšené integrační pokyny pro Prompt Shields, Azure Content Safety, Entra ID a GitHub Advanced Security
  - **Implementační zdroje**: Kategorizované komplexní odkazy na zdroje podle oficiální dokumentace MCP, Microsoft bezpečnostních řešení, bezpečnostních standardů a implementačních příruček

#### Pokročilá bezpečnostní opatření (02-Security/) - podniková implementace
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletní přepracování s bezpečnostním rámcem podnikové úrovně
  - **9 komplexních bezpečnostních domén**: Rozšířeno z základních kontrol na detailní podnikový rámec
    - Pokročilá autentizace a autorizace s integrací Microsoft Entra ID
    - Zabezpečení tokenů a anti-passthrough kontroly s komplexní validací
    - Kontroly zabezpečení relací s prevencí únosů
    - AI-specifická bezpečnostní opatření s prevencí prompt injection a otravování nástrojů
    - Prevence útoků Confused Deputy s OAuth proxy bezpečností
    - Zabezpečení spouštění nástrojů s sandboxováním a izolací
    - Bezpečnost opatření dodavatelského řetězce s verifikací závislostí
    - Kontroly monitorování a detekce s integrací SIEM
    - Reakce na incidenty a zotavení s automatizovanými schopnostmi
  - **Implementační příklady**: Přidány podrobné YAML konfigurační bloky a příklady kódu
  - **Integrace Microsoft řešení**: Komplexní pokrytí Azure bezpečnostních služeb, GitHub Advanced Security a podnikové správy identity

#### Pokročilá bezpečnostní témata (05-AdvancedTopics/mcp-security/) - produkčně připravená implementace
- **README.md**: Kompletní přepis pro podnikovou bezpečnostní implementaci
  - **Sladění s aktuální specifikací**: Aktualizováno na MCP specifikaci 2025-06-18 s povinnými bezpečnostními požadavky
  - **Vylepšená autentizace**: Integrace Microsoft Entra ID s komplexními příklady v .NET a Java Spring Security
  - **Integrace AI bezpečnosti**: Implementace Microsoft Prompt Shields a Azure Content Safety s podrobnými příklady v Pythonu
  - **Pokročilá mitigace hrozeb**: Komplexní implementační příklady pro
    - Prevence útoků Confused Deputy s PKCE a validací souhlasu uživatele
    - Prevence token passthrough s validací publika a bezpečnou správou tokenů
    - Prevence únosu relace s kryptografickým vázáním a behaviorální analýzou
  - **Integrace podnikové bezpečnosti**: Monitorování Azure Application Insights, pipeline detekce hrozeb a bezpečnost dodavatelského řetězce
  - **Kontrolní seznam implementace**: Jasné rozlišení povinných a doporučených bezpečnostních kontrol s výhodami Microsoft bezpečnostního ekosystému

### Kvalita dokumentace a slaďování se standardy
- **Odkazy na specifikace**: Aktualizovány všechny odkazy na aktuální MCP specifikaci 2025-06-18
- **Microsoft bezpečnostní ekosystém**: Vylepšené integrační pokyny ve všech bezpečnostních dokumentacích
- **Praktická implementace**: Přidány podrobné příklady kódu v .NET, Javě a Pythonu s podnikatelskými vzory
- **Organizace zdrojů**: Komplexní kategorizace oficiální dokumentace, bezpečnostních standardů a implementačních průvodců
- **Vizuální indikátory**: Jasné označení povinných požadavků oproti doporučeným praktikám


#### Základní koncepty (01-CoreConcepts/) - kompletní modernizace
- **Aktualizace verze protokolu**: Aktualizováno na odkaz na aktuální MCP specifikaci 2025-06-18 se zdrojováním podle data (formát RRRR-MM-DD)
- **Vylepšení architektury**: Vylepšené popisy Hostitelů, Klientů a Serverů, aby odrážely aktuální MCP architektonické vzory
  - Hostitelé nyní jasně definováni jako AI aplikace koordinující více MCP klientských připojení
  - Klienti popsáni jako protokoloví konektory udržující jedinečný vztah k serveru
  - Servery vylepšeny o scénáře lokálního vs. vzdáleného nasazení
- **Přepracování primitiv**: Kompletní přepracování serverových a klientských primitiv
  - Serverové primitivy: Zdroje (datové zdroje), Prompt šablony, Nástroje (prováděné funkce) s podrobnými vysvětleními a příklady
  - Klientské primitivy: Sampling (dokončení LLM), Elicitation (uživatelský vstup), Logging (ladění/monitoring)
  - Aktualizováno dle aktuálních vzorů metod discovery (`*/list`), retrieval (`*/get`) a execution (`*/call`)
- **Architektura protokolu**: Zaveden dvouvrstvý model architektury
  - Datová vrstva: Základ JSON-RPC 2.0 s řízením životního cyklu a primitiv
  - Transportní vrstva: STDIO (lokální) a Streamable HTTP s SSE (vzdálený) transportními mechanismy
- **Bezpečnostní rámec**: Komplexní bezpečnostní principy včetně explicitního uživatelského souhlasu, ochrany dat soukromí, bezpečnosti spouštění nástrojů a zabezpečení transportní vrstvy
- **Komunikační vzory**: Aktualizované protokolové zprávy znázorňující inicializaci, discovery, vykonávání a notifikační toky
- **Příklady kódu**: Obnovené příklady v několika jazycích (.NET, Java, Python, JavaScript) reflektující aktuální MCP SDK vzory

#### Bezpečnost (02-Security/) - komplexní bezpečnostní přepracování  
- **Slaďování se standardy**: Plné slaďování s bezpečnostními požadavky MCP specifikace 2025-06-18
- **Vývoj autentizace**: Dokumentovaný vývoj od vlastních OAuth serverů k delegaci externího poskytovatele identity (Microsoft Entra ID)
- **Analýza hrozeb specifických pro AI**: Zlepšené pokrytí moderních AI útoků  
  - Podrobné scénáře prompt injection útoků s reálnými příklady
  - Mechanismy otravování nástrojů a vzory útoků „rug pull“
  - Otravování kontextového okna a útoky na zmatení modelu
- **Microsoft AI bezpečnostní řešení**: Komplexní pokrytí Microsoft bezpečnostního ekosystému
  - AI Prompt Shields s pokročilou detekcí, zvýrazňováním a oddělovacími technikami
  - Integrační vzory Azure Content Safety
  - GitHub Advanced Security pro ochranu dodavatelského řetězce
- **Pokročilá mitigace hrozeb**: Detailní bezpečnostní kontroly pro
  - Únos relace s MCP-specifickými scénáři útoků a kryptografickými požadavky na ID relace
  - Problémy Confused Deputy v MCP proxy scénářích s explicitními požadavky na souhlas
  - Zranitelnosti token passthrough s povinnými kontrolami validace
- **Bezpečnost dodavatelského řetězce**: Rozšířené pokrytí AI dodavatelského řetězce včetně základních modelů, embedding služeb, poskytovatelů kontextu a API třetích stran
- **Základní bezpečnost**: Vylepšená integrace s podnikatelskými bezpečnostními vzory včetně architektury zero trust a Microsoft bezpečnostního ekosystému
- **Organizace zdrojů**: Kategorizované komplexní odkazy na zdroje podle typu (Oficiální dokumentace, standardy, výzkum, Microsoft řešení, implementační průvodce)

### Zlepšení kvality dokumentace
- **Strukturované učební cíle**: Vylepšené učební cíle s konkrétními, proveditelnými výsledky 
- **Křížové odkazy**: Přidány odkazy mezi příbuznými bezpečnostními a základními tématy
- **Aktuální informace**: Aktualizovány všechny datové odkazy a odkazy na specifikace na aktuální standardy
- **Implementační pokyny**: Přidány specifické, proveditelné implementační návody v obou sekcích

## 16. července 2025

### Vylepšení README a navigace
- Kompletně přepracovaná navigace kurikula v README.md
- Nahrazení tagů `<details>` více přístupným formátem založeným na tabulkách
- Vytvořeny alternativní možnosti rozložení ve složce „alternative_layouts“
- Přidány příklady navigace na kartách, v záložkách a akordeonovém stylu
- Aktualizována sekce struktury repozitáře o všechny nejnovější soubory
- Vylepšena sekce „Jak používat toto kurikulum“ s jasnými doporučeními
- Aktualizovány odkazy na specifikace MCP na správné URL
- Přidána sekce Context Engineering (5.14) do struktury kurikula

### Aktualizace studijní příručky
- Kompletně přepracována studijní příručka dle aktuální struktury repozitáře
- Přidány nové sekce pro MCP Klienty a Nástroje a populární MCP Servery
- Aktualizována Vizualní mapa kurikula s přesnou reprezentací všech témat
- Vylepšené popisy Pokročilých témat pokrývající všechna specializovaná pole
- Aktualizována sekce případových studií podle reálných příkladů
- Přidáván tento komplexní seznam změn

### Příspěvky komunity (06-CommunityContributions/)
- Přidány podrobné informace o MCP serverech pro generování obrázků
- Přidána komplexní sekce o používání Clauda ve VSCode
- Přidány pokyny k nastavení a používání terminálového klienta Cline
- Aktualizována sekce MCP klientů o všechny populární klientské možnosti
- Vylepšeny příklady příspěvků přesnějšími ukázkami kódu

### Pokročilá témata (05-AdvancedTopics/)
- Organizovány všechny specializované složky témat s konzistentním pojmenováním
- Přidány materiály a příklady pro Context Engineering
- Přidána dokumentace integrace Foundry agentů
- Vylepšena dokumentace bezpečnostní integrace Entra ID

## 11. června 2025

### Počáteční vytvoření
- Uvolněna první verze kurikula MCP pro začátečníky
- Vytvořena základní struktura všech 10 hlavních sekcí
- Implementována Vizualní mapa kurikula pro navigaci
- Přidány počáteční ukázkové projekty v několika programovacích jazycích

### Začínáme (03-GettingStarted/)
- Vytvořeny první příklady implementace serveru
- Přidány pokyny pro vývoj klienta
- Začleněny instrukce pro integraci LLM klienta
- Přidána dokumentace integrace VS Code
- Implementovány příklady serveru se Server-Sent Events (SSE)

### Základní koncepty (01-CoreConcepts/)
- Přidáno podrobné vysvětlení klient-server architektury
- Vytvořena dokumentace klíčových protokolových komponent
- Zdokumentovány vzory zpráv v MCP

## 23. května 2025

### Struktura repozitáře
- Inicializován repozitář se základní složkovou strukturou
- Vytvořeny README soubory pro každou hlavní sekci
- Nastavena infrastruktura pro překlady
- Přidány obrázkové zdroje a diagramy

### Dokumentace
- Vytvořen počáteční README.md s přehledem kurikula
- Přidány soubory CODE_OF_CONDUCT.md a SECURITY.md
- Nastaven SUPPORT.md s pokyny pro získání pomoci
- Vytvořena předběžná struktura studijní příručky

## 15. dubna 2025

### Plánování a rámec
- Počáteční plánování kurikula MCP pro začátečníky
- Definovány učební cíle a cílové publikum
- Nastíněna struktura kurikula s 10 sekcemi
- Vyvinut koncepční rámec pro příklady a případové studie
- Vytvořeny počáteční prototypové příklady pro klíčové koncepty

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->