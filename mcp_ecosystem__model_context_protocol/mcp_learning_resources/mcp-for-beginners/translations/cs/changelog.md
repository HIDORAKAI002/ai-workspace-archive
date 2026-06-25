# Záznam změn: Curriculum MCP pro začátečníky

Tento dokument slouží jako záznam o všech významných změnách provedených v kurikulu Model Context Protocol (MCP) pro začátečníky. Změny jsou dokumentovány v obráceném chronologickém pořadí (nejnovější změny první).

## 24. června 2026

### Nová lekce: Používání MCP v aplikaci Copilot

- [Sekce nástrojů](./12-tooling/README.md) Přidána sekce nástrojů.
- [MCP v aplikaci Copilot](./12-tooling/01-copilot-app/README.md)

## 16. června 2026

### Zarovnání specifikace MCP a validace ukázek

Ověřili jsme kurikulum vůči aktuální **specifikaci MCP 2025-11-25** a nejnovějším oficiálním SDK, poté opravili zbývající zastaralé odkazy na specifikace a potvrdili, že základní ukázky stále sestaví a běží.

#### Opravy verzí specifikace (2025-06-18 / 2025-03-26 → 2025-11-25)

Aktualizovaný anglický obsah, kde stále uváděl starší revizi specifikace jako *aktuální/nejnovější* standard, a přesměrované odkazy na kanonické cesty specifikace `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Aktualizováno banner „Current Standard“, úvod, hlavní zásady zabezpečení, nadpis povinných požadavků, sekce Microsoft Entra ID, odkazy Reference a Zdroje, a závěrečná bezpečnostní poznámka (8 odkazů) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aktualizován odkaz na dodatečné zdroje a banner „Current Standard“ na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Nahrazen zastaralý odkaz `2025-03-26` na stránku zabezpečení a důvěry aktuální stránkou s nejlepšími bezpečnostními praktikami 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Aktualizován odkaz na oficiální dokumentaci vzorkování na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aktualizována reference „aktuální specifikace MCP“ v přítomném čase a odkaz na dodatečné zdroje na 2025-11-25 (historické poznámky o ukončení SSE ponechány pro přesnost)

#### Validace ukázek vůči aktuálním SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` vyřešil `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` bez chyb typů — existující API `McpServer`/`StdioServerTransport` zůstávají platná
- **Python (03-GettingStarted/01-first-server/solution/python)**: Ověřeno v izolovaném `.venv` s `mcp[cli]` (1.27.2); `py_compile` proběhla a `FastMCP.list_tools()` správně vrátila nástroje `add` a `subtract`
- Potvrzeno, že všechny rozsahy verzí `@modelcontextprotocol/sdk` v ukázkách (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se bez problémů vyřeší na aktuální `1.29.0` bez lámání API

#### Zarovnání verzí závislostí (uzavření mezer verzí)

Aktualizovány zastaralé SDK pevné verze, aby každá ukázka sledovala aktuální vydání MCP podle konvence celého repozitáře:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Aktualizace `@modelcontextprotocol/sdk` z `^1.8.0` → `>=1.26.0` a aktualizace zastaralého popisu balíčku „updated for MCP 2025-06-18“ na „aligned with MCP Specification 2025-11-25“
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** a **lab4/code/github_mcp_server/pyproject.toml**: Aktualizováno přesné pnutí `mcp==1.23.0` → `mcp>=1.26.0`; oba soubory `uv.lock` (uv lock) byly regenerované tak, aby se vyřešily na aktuální `mcp 1.27.2` a zůstaly synchronizované s manifesty

#### Analýza mezer kurikula — pokrytí funkcí poslední specifikace

Ověřili jsme, že kurikulum již pokrývá všechny primitivy zavedené/rozšířené ve specifikaci MCP 2025-11-25, takže neexistují žádné obsahové mezery:
- **Vzorkování**: Lekce 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (včetně režimu URL)**: Zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Zdokumentováno v 00-Introduction, 01-CoreConcepts a 05-AdvancedTopics/mcp-root-contexts
- **Úkoly (experimentální, dlouhotrvající operace)**: Zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Anotace nástrojů** (`readOnlyHint` / `destructiveHint`): Zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features

### Zesílení bezpečnosti a náprava zranitelností závislostí

Proveden kompletní bezpečnostní audit všech manifestů závislostí a zdrojového kódu ukázek, poté napraveny všechny nahlášené npm bezpečnostní upozornění a jedna bezpečnostní chyba na úrovni kódu. Po opravě `npm audit` hlásí **0 zranitelností** ve všech auditovaných adresářích.

#### Zranitelnosti závislostí npm (tranzitivní) — Opraveno

Audity všech 15 zadaných `package-lock.json` souborů. Zranitelnosti se týkaly pouze tranzitivních závislostí načítaných vývojářským nástrojem MCP Inspector, klientem OpenAI a SDK MCP; všechny jsou nyní vyřešeny, aniž by došlo k porušení ukázek:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** a **lab3/code/weather_mcp/inspector**: Aktualizace `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), kterým byly odstraněny bezpečnostní upozornění na zahrnuté balíčky `ajv`, `brace-expansion`, `diff`, `path-to-regexp` a `ws`. Přidán záznam npm `overrides` vynucující opravený `shell-quote@1.8.4` pro odstranění zbývajícího kritického upozornění u `concurrently`; oba lock soubory byly regenerovány (nyní 0 zranitelností)
- **03-GettingStarted/samples/typescript**: `npm audit fix` aktualizoval tranzitivní `qs` (střední riziko) na opravené vydání
- **03-GettingStarted/samples/javascript**: `npm audit fix` aktualizoval tranzitivní `hono` (střední riziko) na opravené vydání
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` aktualizoval tranzitivní `form-data` (vysoké riziko) na opravené vydání
- **03-GettingStarted/11-simple-auth/solution/typescript**: Vygenerován chybějící `package-lock.json`, aby byl projekt reprodukovatelný a auditovatelný (0 zranitelností)

#### Oprava bezpečnosti na úrovni kódu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odstraněno `shell=True` z nástroje `open_in_vscode`. Předchozí `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` umožňoval interpretaci shell metaznaků ve složkové cestě `cmd.exe` (vektor příkazové injekce). Nyní spouští přímo rozpoznaný `Code.exe` s cestou jako argumentem — bez shellu — což je funkčně ekvivalentní a bezpečné.

#### Audit závislostí Pythonu

- Auditováno každé požadavkové nastavení Pythonu pomocí `pip-audit`. `05-AdvancedTopics` a `03-GettingStarted/samples/python` nehlásily **žádné známé zranitelnosti** (jejich rozsahy `mcp` / `httpx` / `pydantic` / `python-dotenv` se vyřeší na aktuální opravená vydání)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` označil tranzitivní závislost **`werkzeug` 3.1.1** se třemi upozorněními na bezpečnostní problém `safe_join` pojmenování zařízení Windows DoS — `CVE-2025-66221`, `CVE-2026-21860`, a `CVE-2026-27199` (všechny opravené ve verzi 3.1.6). Přidáno explicitní bezpečnostní pnutí `werkzeug>=3.1.6`, takže se řeší opravené vydání; ověřeno, že omezení se vyřeší čistě spolu s balíčky `chainlit` / `mcp` / `semantic-kernel`

### Přejmenování produktové značky

Aktualizován veškerý obsah kurikula, aby odrážel rebranding produktů Microsoftu:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aktualizován odkaz na komunitu Discord
- **AGENTS.md**: Aktualizována reference na Discord server
- **README.md**: Aktualizovány odkazy na technologický ekosystém
- **study_guide.md**: Aktualizovány odkazy ve studijní případové studii
- **05-AdvancedTopics/README.md**: Aktualizován název a popis modulu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Aktualizován nadpis sekce a popis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kompletní aktualizace názvu a obsahu modulu
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aktualizován křížový odkaz
- **07-LessonsfromEarlyAdoption/README.md**: Aktualizovány odkazy případových studií
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aktualizován nadpis sekce 9, odznaky a možnosti
- **08-BestPractices/README.md**: Aktualizován odkaz na komunitu Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aktualizována reference na kanál Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aktualizována reference nasazení modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aktualizována tabulka AI služeb
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aktualizovány reference zdrojů

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Aktualizovány hlavní reference kurikula
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aktualizován název modulu, přehled a všechny nadpisy modulů
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aktualizován název, cíle učení, instrukce nastavení a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aktualizován název, cíle učení, tabulka MCP hostů a křížové odkazy
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aktualizovány název, odznaky, předpoklady a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aktualizovány reference Agent Builder a odkaz na zpětnou vazbu
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aktualizovány předpoklady a reference na rozšíření

---

## 11. dubna 2026

### Nová lekce, opravy dokumentace a aktualizace závislostí

#### Přidán nový obsah kurikula

**Modul 05 - Pokročilá témata**
- **Lekce 5.17: Adversariální multi-agentní uvažování s MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nový komplexní průvodce pokrývající vzor adversariální debaty pro multi-agentní systémy
  - Mermaid diagram architektury: dva agenti → sdílený MCP server → přepis debaty → rozhodčí → verdikt
  - Sdílený MCP nástrojový server (`web_search` + `run_python`) implementovaný v Pythonu a TypeScriptu
  - Protikladné systémové prompty (PROTI / PRO / Rozhodčí) s explicitními požadavky na užití nástrojů
  - Orchestrátor debaty v Pythonu, TypeScriptu a C# spravující kola a směrující argumenty
  - Zapojení MCP `ClientSession` pro orchestrátora k volání skutečných nástrojů
  - Tabulka případů užití (detekce halucinací, modelování hrozeb, recenze návrhu API, ověřování faktů, technologický výběr)
  - Bezpečnostní úvahy: sandboxované vykonávání, validace volání nástrojů, omezení rychlosti, auditní záznamy
  - Strukturované cvičení se třemi praktickými scénáři (revize kódu, rozhodnutí o architektuře, moderace obsahu)

#### Opravy dokumentace

**Modul 03 - Začínáme**
- **05-stdio-server/README.md**: Opraven neúplný příklad TypeScript stdio serveru — přidána chybějící instanciace transportu (`new StdioServerTransport()`) a volání `server.connect(transport)` pro shodu s příklady v Pythonu a .NET ve stejné sekci
- **14-sampling/README.md**: Opraven překlep — opravena hláška `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Aktualizace kurikula

**Hlavní README.md**
- Přidán záznam 5.17 (Adversariální multi-agentní uvažování s MCP) do tabulky kurikula s přímým odkazem na novou lekci

**05-AdvancedTopics/README.md**
- Přidán řádek Lekce 5.17 do tabulky lekcí

**study_guide.md**
- Přidáno téma Adversariální multi-agentní uvažování do myšlenkové mapy a popis v textu pokročilých témat

#### Opravy kódu a bezpečnosti

**Modul 05 - Adversariální agenti (`mcp-adversarial-agents`)**
- **Oprava bezpečnostní chyby — injekce příkazů**: Nahrazeno shellové interpolování `execSync` funkcí `execFile` + `promisify` v nástroji `run_python` v TypeScriptu, čímž se odstranilo riziko injekce příkazů (kód řízený LLM je nyní předáván jako literální prvek argv bez účasti shellu)
- **Zapojení smyčky nástroje MCP**: Aktualizován Python debate orchestrátor na použití klienta `AsyncAnthropic` (nahrazuje blokující synchronní `Anthropic`), předávání živé `ClientSession` přímo každému kroku agenta, získávání definic nástrojů přes `session.list_tools()` v každém kroku a odesílání bloků `tool_use` přes `session.call_tool()` ve smyčce dokud model nevygeneruje finální textovou odpověď

#### Aktualizace závislostí

- Zvýšena verze `hono` na 4.12.12 v několika balíčcích (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Zvýšena verze `@hono/node-server` z 1.19.11 na 1.19.13 v TypeScript balíčcích
- Zvýšena verze `cryptography` z 46.0.5 na 46.0.7 v Python balíčcích (laboratoře 3 a 4 v 10-StreamliningAIWorkflows)
- Zvýšena verze `lodash` z 4.17.23 na 4.18.1 v inspektoru 10-StreamliningAIWorkflows

#### Překlady

- Synchronizovány překlady pro 48+ jazyků s nejnovějšími změnami zdrojového kódu (aktualizace i18n)

---

## 5. února 2026

### Vylepšení validace a navigace v celém repozitáři

#### Přidán nový obsah kurikula

**Modul 03 - Začínáme**
- **12-mcp-hosts/README.md**: Nový komplexní průvodce nastavením MCP hostitelů
  - Konfigurace Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Šablony JSON konfigurací pro všechny hlavní hostitele
  - Tabulka srovnání typů transportu (stdio, SSE/HTTP, WebSocket)
  - Řešení běžných problémů s připojením
  - Nejlepší bezpečnostní praxe pro konfiguraci hostitelů

- **13-mcp-inspector/README.md**: Nový průvodce laděním MCP Inspectoru
  - Způsoby instalace (npx, globální npm, ze zdroje)
  - Připojování k serverům přes stdio a HTTP/SSE
  - Testovací nástroje, zdroje a workflow promptů
  - Integrace MCP Inspectoru s VS Code
  - Běžné ladící scénáře s řešeními

**Modul 04 - Praktická implementace**
- **pagination/README.md**: Nový průvodce implementací stránkování
  - Vzory stránkování založené na kurzoru v Pythonu, TypeScriptu, Javě
  - Zpracování stránkování na straně klienta
  - Strategie návrhu kurzoru (neprůhledný vs. strukturovaný)
  - Doporučení pro optimalizaci výkonu

**Modul 05 - Pokročilá témata**
- **mcp-protocol-features/README.md**: Nový podrobný popis funkcí protokolu
  - Implementace notifikací o průběhu
  - Vzory rušení požadavků
  - Šablony zdrojů s URI vzory
  - Správa životního cyklu serveru
  - Řízení úrovně logování
  - Vzory zpracování chyb s JSON-RPC kódy

#### Opravy navigace (aktualizováno 24+ souborů)

**Hlavní README modulů**  
 Nyní odkazují jak na první lekci, tak na další modul

**Podadresáře 02-Security**  
 Všech 5 doplňkových bezpečnostních dokumentů nyní obsahuje navigaci "Co dál?"

**Souborové sady 09-CaseStudy**  
 Všechny soubory případových studií nyní mají sekvenční navigaci

**Laboratoře 10-StreamliningAI**  
 Přidána sekce Co dál k přehledu modulu 10 a modulu 11

#### Opravy kódu a obsahu

**Aktualizace SDK a závislostí**  
Opraveno prázdné označení verze openai na `^4.95.0`  
Aktualizován SDK z `^1.8.0` na `>=1.26.0`  
Aktualizovány pevné verze mcp na `>=1.26.0`

**Opravy kódu**  
Opraven neplatný model `gpt-4o-mini` na `gpt-4.1-mini`

**Opravy obsahu**  
Opraven nefunkční odkaz `READMEmd` → `README.md`, opraven záhlaví kurikula `Module 1-3` → `Module 0-3`, opraven citlivý na velikost písmen odkaz  
Odstraněn poškozený duplicitní obsah Case Study 5

**Zlepšení pro začátečníky**  
Přidán náležitý úvod, cíle učení a předpoklady pro začátečníky

#### Aktualizace kurikula

**Hlavní README.md**  
- Přidány položky 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagekování), 5.16 (Funkce protokolu) do tabulky kurikula

**README modulů**  
Přidány lekce 12 a 13 do seznamu lekcí  
Přidána sekce Praktické průvodce s odkazem na stránkování  
Přidány lekce 5.15 (Vlastní transport) a 5.16 (Funkce protokolu)

**study_guide.md**  
- Aktualizována myšlenková mapa o všech nových tématech: Nastavení MCP Hosts, MCP Inspector, Strategie stránkování, Podrobný rozbor funkcí protokolu

## 28. ledna 2026

### Revize souladu se specifikací MCP 2025-11-25

#### Vylepšení základních konceptů (01-CoreConcepts/)
- **Nový klientský primitiv – Roots**: Přidána komplexní dokumentace klientského primitiva Roots umožňující serverům chápat hranice souborového systému a přístupová práva
- **Anotace nástrojů**: Přidána dokumentace anotací chování nástrojů (`readOnlyHint`, `destructiveHint`) pro lepší rozhodování o vykonávání nástroje
- **Volání nástrojů při vzorkování**: Aktualizována dokumentace Sampling o parametry `tools` a `toolChoice` pro řízené vykonávání nástrojů během vzorkovacích požadavků
- **URL režim vyvolání**: Přidána dokumentace pro URL založené vyvolávání externích webových interakcí iniciovaných serverem
- **Úkoly (experimentální)**: Přidána nová sekce dokumentující experimentální funkci Úkolů pro trvalé exekuční obaly a odložené získávání výsledků
- **Podpora ikon**: Zaznamenáno, že nástroje, zdroje, šablony zdrojů a prompty mohou obsahovat ikony jako další metadata

#### Aktualizace dokumentace
- **README.md**: Přidána reference na verzi specifikace MCP 2025-11-25 a vysvětlení číslování verzí podle data
- **study_guide.md**: Aktualizována mapa kurikula o Úkoly a Anotace nástrojů v sekci Základní koncepty; aktualizováno datum dokumentu

#### Ověření souladu se specifikací
- **Verze protokolu**: Potvrzeno, že veškerá dokumentace odkazuje na aktuální specifikaci MCP 2025-11-25
- **Architektonická shoda**: Potvrzena správnost dvouvrstvé architektury (Datová vrstva + Transportní vrstva)
- **Dokumentace primitiv**: Ověřena dokumentace serverových primitiv (Soubory, Prompty, Nástroje) a klientských primitiv (Sampling, Elicitation, Logování, Roots)
- **Mechanismy transportu**: Ověřena správnost dokumentace přenosu STDIO a Streamable HTTP
- **Bezpečnostní návody**: Potvrzena shoda s aktuálními bezpečnostními nejlepšími postupy MCP

#### Klíčové zdokumentované funkce MCP 2025-11-25
- **Objevování OpenID Connect**: Objevování autentizačních serverů přes OIDC
- **Metadata OAuth Client ID dokumenty**: Doporučený mechanismus registrace klientů
- **JSON Schema 2020-12**: Výchozí dialekt pro definice schémat MCP
- **Systém úrovní SDK**: Formalizované požadavky na podporu a údržbu funkcí SDK
- **Řídící struktura**: Formalizované pracovní a zájmové skupiny v správě MCP

### Velká aktualizace bezpečnostní dokumentace (02-Security/)

#### Integrace MCP Security Summit Workshop (Sherpa)
- **Nový praktický školicí zdroj**: Přidána komplexní integrace s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ve všech bezpečnostních dokumentech
- **Pokrytí expedice**: Zdokumentován celý průběh expedice od Base Camp po Summit
- **Soulad s OWASP**: Veškerá bezpečnostní doporučení nyní mapována na OWASP MCP Azure Security Guide rizika

#### Integrace OWASP MCP Top 10
- **Nová sekce**: Přidána tabulka OWASP MCP Top 10 bezpečnostních rizik s mitigacemi Azure do hlavního bezpečnostního README
- **Rizikově založená dokumentace**: Aktualizován dokument mcp-security-controls-2025.md o odkazy na rizika OWASP MCP pro každou doménu bezpečnosti
- **Referenční architektura**: Odkaz na OWASP MCP Azure Security Guide referenční architekturu a implementační vzory

#### Aktualizované bezpečnostní soubory
- **README.md**: Přidán přehled Sherpa Workshopu, tabulka trasy expedice, shrnutí OWASP MCP Top 10 rizik a sekce praktického školení
- **mcp-security-controls-2025.md**: Aktualizováno záhlaví na únor 2026, přidány odkazy na rizika OWASP (MCP01-MCP08), opraveny nesrovnalosti ve verzi specifikace
- **mcp-security-best-practices-2025.md**: Přidána sekce zdrojů Sherpa a OWASP, aktualizováno datum
- **mcp-best-practices.md**: Přidána sekce praktického školení s odkazy na Sherpa a OWASP
- **azure-content-safety-implementation.md**: Přidán odkaz na OWASP MCP06, sladění se Sherpa Camp 3 a sekce doplňkových zdrojů

#### Přidány nové odkazy na zdroje
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuální stránky rizik OWASP MCP (MCP01-MCP10)

### Soulad kurikula s MCP Specification 2025-11-25

#### Modul 03 - Začínáme
- **Dokumentace SDK**: Přidán Go SDK do oficiálního seznamu SDK; aktualizovány všechny odkazy na SDK v souladu s MCP Specification 2025-11-25
- **Upřesnění transportu**: Aktualizovány popisy transportu STDIO a HTTP Streaming s explicitními odkazy na specifikaci

#### Modul 04 - Praktická implementace
- **Aktualizace SDK**: Přidán Go SDK; seznam SDK aktualizován o verzi specifikace
- **Specifikace autorizace**: Aktualizován odkaz na MCP Authorizaci na aktuální verzi 2025-11-25

#### Modul 05 - Pokročilá témata
- **Nové funkce**: Přidána poznámka o nových funkcích MCP Specification 2025-11-25 (Úkoly, Anotace nástrojů, URL režim vyvolání, Roots)
- **Bezpečnostní zdroje**: Přidány odkazy na OWASP MCP Top 10 a Sherpa Workshop do doplňkových zdrojů

#### Modul 06 - Příspěvky komunity
- **Seznam SDK**: Přidány Swift a Rust SDK; aktualizován odkaz na specifikaci na 2025-11-25
- **Reference specifikace**: Aktualizován odkaz na MCP Specification na přímý URL ke specifikaci

#### Modul 07 - Lekce z raného nasazení
- **Aktualizace zdrojů**: Přidán odkaz na MCP Specification 2025-11-25 a OWASP MCP Top 10 do doplňkových zdrojů

#### Modul 08 - Nejlepší praxe
- **Verze specifikace**: Aktualizován odkaz na MCP Specification na 2025-11-25
- **Bezpečnostní zdroje**: Přidány OWASP MCP Top 10 a Sherpa Workshop do doplňkových zdrojů

#### Modul 10 - Streamlining AI Workflows
- **Aktualizace odznaku**: Změna odznaku verze MCP z verze SDK (1.9.3) na verzi specifikace (2025-11-25)
- **Odkazy na zdroje**: Aktualizován odkaz na MCP Specification; přidán OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Reference specifikace**: Aktualizován odkaz na MCP Specification na verzi 2025-11-25
- **Bezpečnostní zdroje**: Přidán OWASP MCP Top 10 do oficiálních zdrojů

## 18. prosince 2025

### Aktualizace bezpečnostní dokumentace - MCP Specification 2025-11-25

#### MCP Nejlepší bezpečnostní praxe (02-Security/mcp-best-practices.md) - Aktualizace verze specifikace
- **Aktualizace verze protokolu**: Přechod na nejnovější MCP Specification 2025-11-25 (vydáno 25. listopadu 2025)
  - Aktualizovány všechny odkazy na verzi specifikace z 2025-06-18 na 2025-11-25
  - Aktualizovány datumové reference dokumentu z 18. srpna 2025 na 18. prosince 2025
  - Ověřeno, že všechny URL odkazující na specifikaci směřují na aktuální dokumentaci
- **Validace obsahu**: Komplexní kontrola bezpečnostních nejlepších praktik vůči aktuálním standardům
  - **Microsoft bezpečnostní řešení**: Ověřena aktuálnost pojmů a odkazů na Prompt Shields (dříve "detekce rizika Jailbreak"), Azure Content Safety, Microsoft Entra ID a Azure Key Vault
  - **OAuth 2.1 Bezpečnost**: Potvrzen soulad s nejnovějšími bezpečnostními praktikami OAuth
  - **OWASP standardy**: Ověřena aktuálnost odkazů na OWASP Top 10 pro LLM
  - **Azure služby**: Ověřeny všechny odkazy a nejlepší praxe Microsoft Azure dokumentace
- **Soulad se standardy**: Všechny zmíněné bezpečnostní standardy potvrzeny jako aktuální
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Nejlepší bezpečnostní praktiky OAuth 2.1
  - Bezpečnostní a shodné rámce Azure
- **Implementační zdroje**: Ověřeny všechny odkazy na průvodce implementací a zdroje
  - Vzory autentizace Azure API Management
  - Průvodce integrací Microsoft Entra ID
  - Správa tajemství v Azure Key Vault
  - DevSecOps pipeline a monitorovací řešení

### Zajištění kvality dokumentace
- **Soulad se specifikací**: Ověřeno, že všechny povinné požadavky bezpečnosti MCP (MUSÍ/MUSÍ NE) odpovídají nejnovější specifikaci
- **Aktuálnost zdrojů**: Ověřeny všechny externí odkazy na dokumentaci Microsoftu, bezpečnostní standardy a průvodce implementací
- **Pokrytí nejlepších praktik**: Potvrzena komplexní pokrytí autentizace, autorizace, AI-specifických hrozeb, bezpečnosti dodavatelského řetězce a podnikových vzorů

## 6. října 2025

### Rozšíření sekce Začínáme – Pokročilé použití serveru & jednoduchá autentizace

#### Pokročilé použití serveru (03-GettingStarted/10-advanced)
- **Přidána nová kapitola**: Přehledné zavedení pokročilého použití MCP serveru pokrývající jak běžné, tak nízkovrstvé architektury serverů.
  - **Běžný vs. Nízkourovňový Server**: Podrobný srovnání a ukázky kódu v Pythonu a TypeScriptu pro oba přístupy.
  - **Návrh založený na Handlech**: Vysvětlení správy nástrojů/zdrojů/promptů založené na handlerech pro škálovatelné a flexibilní implementace serveru.
  - **Praktické vzory**: Reálné scénáře, kde jsou nízkourovňové vzory serveru přínosné pro pokročilé funkce a architekturu.

#### Jednoduchá autentizace (03-GettingStarted/11-simple-auth)
- **Přidána nová kapitola**: Krok za krokem průvodce implementací jednoduché autentizace v MCP serverech.
  - **Pojmy autentizace**: Jasné vysvětlení autentizace vs. autorizace a práce s přihlašovacími údaji.
  - **Základní implementace autentizace**: Middleware založené vzory autentizace v Pythonu (Starlette) a TypeScriptu (Express) s ukázkami kódu.
  - **Postup k pokročilé bezpečnosti**: Návod jak začít s jednoduchou autentizací a posunout se k OAuth 2.1 a RBAC s odkazy na pokročilé bezpečnostní moduly.

Tyto přídavky poskytují praktické, hands-on pokyny pro vytváření robustnějších, bezpečnějších a flexibilnějších implementací MCP serverů, propojují základní koncepty s pokročilými produkčními vzory.

## 29. září 2025

### MCP Server Integrace databáze - Komplexní praktická výuka

#### 11-MCPServerHandsOnLabs - Nová kompletní databázová integrační učebnice
- **Kompletní 13-laboratorní výukový plán**: Přidána komplexní praktická učebnice pro tvorbu produkčně připravených MCP serverů s integrací PostgreSQL databáze
  - **Reálná implementace**: Případová studie Zava Retail analytics ukazující podnikové vzory
  - **Strukturovaný výukový postup**:
    - **Laboratoře 00-03: Základy** – Úvod, základní architektura, bezpečnost a multitenancy, nastavení prostředí
    - **Laboratoře 04-06: Tvorba MCP serveru** – Návrh databáze a schéma, implementace MCP serveru, vývoj nástrojů  
    - **Laboratoře 07-09: Pokročilé funkce** – Integrace sémantického vyhledávání, testování a ladění, integrace s VS Code
    - **Laboratoře 10-12: Produkce a osvědčené postupy** – Strategie nasazení, monitoring a observabilita, nejlepší praktiky a optimalizace
  - **Podnikové technologie**: Framework FastMCP, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Pokročilé funkce**: Row Level Security (RLS), sémantické vyhledávání, přístup k datům více tenantů, vektorové embeddingy, monitoring v reálném čase

#### Standardizace terminologie – konverze modul -> laboratoř
- **Komplexní aktualizace dokumentace**: Systematicky aktualizovány všechny README soubory v 11-MCPServerHandsOnLabs na terminologii „Laboratoř“ místo „Modul“
  - **Nadpisy sekcí**: Aktualizováno „Co tento modul pokrývá“ na „Co tato laboratoř pokrývá“ ve všech 13 laboratořích
  - **Popisy obsahu**: Změněno „Tento modul poskytuje...“ na „Tato laboratoř poskytuje...“ napříč dokumentací
  - **Cíle učení**: Aktualizováno „Na konci tohoto modulu...“ na „Na konci této laboratoře...“
  - **Odkazy na navigaci**: Převod všech odkazů „Modul XX:“ na „Laboratoř XX:“ v křížových odkazech a navigaci
  - **Sledování dokončení**: Aktualizováno „Po dokončení tohoto modulu...“ na „Po dokončení této laboratoře...“
  - **Zachování technických odkazů**: Zachovány odkazy na Python moduly v konfiguračních souborech (např. `"module": "mcp_server.main"`)

#### Vylepšení studijního průvodce (study_guide.md)
- **Vizualizace průběhu kurikula**: Přidána nová sekce „11. Database Integration Labs“ s vizualizací struktury laboratoří
- **Struktura repozitáře**: Aktualizace z deseti na jedenáct hlavních sekcí s podrobným popisem 11-MCPServerHandsOnLabs
- **Pokyny ke studijní cestě**: Rozšířena navigace pro sekce 00-11
- **Pokrytí technologií**: Přidány podrobnosti o FastMCP, PostgreSQL, integracích služeb Azure
- **Výsledky učení**: Zdůrazněna tvorba produkčně připravených serverů, vzory integrace databází a podniková bezpečnost

#### Vylepšení struktury hlavního README
- **Termínologie založená na laboratořích**: Aktualizováno hlavní README.md v 11-MCPServerHandsOnLabs pro konzistentní použití „Laboratoř“
- **Organizace studijní cesty**: Jasný postup od základních konceptů přes pokročilou implementaci k produkčnímu nasazení
- **Zaměření na praxi**: Důraz na praktické, hands-on učení s podnikovými vzory a technologiemi

### Zlepšení kvality a konzistence dokumentace
- **Důraz na praktické učení**: Posílen přístup založený na laboratorních cvičeních v celé dokumentaci
- **Zaměření na podnikové vzory**: Zvýrazněna produkčně připravená řešení a bezpečnostní aspekty pro firmy
- **Integrace technologií**: Kompletní pokrytí moderních služeb Azure a AI integračních vzorů
- **Progres studia**: Jasná, strukturovaná cesta od základních konceptů po produkční nasazení

## 26. září 2025

### Vylepšení případových studií - Integrace GitHub MCP Registry

#### Případové studie (09-CaseStudy/) – Zaměření na rozvoj ekosystému
- **README.md**: Významné rozšíření s komplexní případovou studií GitHub MCP Registry
  - **Případová studie GitHub MCP Registry**: Nová komplexní studie zkoumající spuštění GitHub MCP Registry v září 2025
    - **Analýza problému**: Podrobná analýza fragmentované detekce a nasazení MCP serverů
    - **Architektura řešení**: Centralizovaný registry přístup GitHubu s jedním kliknutím instalace do VS Code
    - **Obchodní dopad**: Měřitelné zlepšení onboardingu vývojářů a produktivity
    - **Strategická hodnota**: Zaměření na modulární nasazení agentů a interoperabilitu nástrojů
    - **Rozvoj ekosystému**: Položení základu platformy pro agentickou integraci
  - **Vylepšená struktura případových studií**: Aktualizace všech sedmi případových studií s jednotným formátováním a komplexními popisy
    - Azure AI Travel Agents: Důraz na orchestraci více agentů
    - Integrace Azure DevOps: Zaměření na automatizaci workflow
    - Reálný čas načítání dokumentace: Implementace konzolového klienta v Pythonu
    - Generátor interaktivních studijních plánů: Konverzační webová aplikace Chainlit
    - Dokumentace v editoru: Integrace VS Code a GitHub Copilot
    - Správa Azure API: Podnikové integrační vzory API
    - GitHub MCP Registry: Vývoj ekosystému a komunitní platforma
  - **Komplexní závěr**: Přepsaná závěrečná část zdůrazňující sedm případových studií pokrývajících různá MCP aplikační témata
    - Podniková integrace, orchestraci multi-agentů, produktivitu vývojářů
    - Rozvoj ekosystému, vzdělávací aplikace
    - Zdůraznění architektonických vzorů, implementačních strategií a osvědčených postupů
    - Důraz na MCP jako zralý, produkčně připravený protokol

#### Aktualizace studijního průvodce (study_guide.md)
- **Vizualizace průběhu kurikula**: Aktualizovaný myšlenkový map obsahující GitHub MCP Registry v sekci případových studií
- **Popisy případových studií**: Rozšíření z obecných popisů na detailní rozpis sedmi komplexních studií
- **Struktura repozitáře**: Aktualizace sekce 10 pro pokrytí případových studií se specifickými implementačními detaily
- **Integrace changelogu**: Přidán záznam ze 26. září 2025 dokumentující přidání GitHub MCP Registry a vylepšení případových studií
- **Datum aktualizací**: Aktualizováno časové razítko v patičce na nejnovější revizi (26. září 2025)

### Vylepšení kvality dokumentace
- **Konsistence formátu**: Standardizace formátu a struktury případových studií ve všech sedmi příkladech
- **Komplexní pokrytí**: Případové studie zahrnují scénáře podnikové integrace, produktivity vývojářů a rozvoje ekosystému
- **Strategické postavení**: Zvýraznění MCP jako základní platformy pro nasazení agentních systémů
- **Integrace zdrojů**: Aktualizace dalších zdrojů s odkazem na GitHub MCP Registry

## 15. září 2025

### Rozšíření pokročilých témat – Vlastní transporty a kontextové inženýrství

#### Vlastní MCP transporty (05-AdvancedTopics/mcp-transport/) – Nový pokročilý průvodce implementací
- **README.md**: Kompletní průvodce implementací vlastních MCP transportních mechanismů
  - **Azure Event Grid Transport**: Komplexní bezserverová implementace event-driven transportu
    - Příklady v C#, TypeScriptu a Pythonu s integrací Azure Functions
    - Vzory event-driven architektury pro škálovatelné MCP řešení
    - Příjemci webhooků a push-based zpracování zpráv
  - **Azure Event Hubs Transport**: Implementace high-throughput streaming transportu
    - Real-time streaming schopnosti pro scénáře s nízkou latencí
    - Strategie partitioningu a správa checkpointů
    - Batching zpráv a optimalizace výkonu
  - **Podnikové integrační vzory**: Produkčně připravené architektonické příklady
    - Distribuované MCP zpracování přes více Azure Functions
    - Hybridní transportní architektury kombinující více typů transportů
    - Strategie pro trvanlivost, spolehlivost a řešení chyb zpráv
  - **Bezpečnost a monitoring**: Integrace Azure Key Vault a vzory observability
    - Autentizace přes managed identity a princip nejnižších práv
    - Telemetrie Application Insights a monitorování výkonu
    - Circuit breakers a vzory odolnosti vůči chybám
  - **Testovací frameworky**: Komplexní strategie testování vlastních transportů
    - Jednotkové testy s test doubles a mocking frameworky
    - Integrační testy s Azure Test Containers
    - Úvahy pro výkonové a zátěžové testování

#### Kontextové inženýrství (05-AdvancedTopics/mcp-contextengineering/) – Vznikající disciplína AI
- **README.md**: Komplexní průzkum kontextového inženýrství jako nového oboru
  - **Základní principy**: Kompletní sdílení kontextu, uvědomění rozhodování akcí a správa kontextového okna
  - **Soulad s MCP protokolem**: Jak MCP návrh řeší výzvy kontextového inženýrství
    - Omezení kontextového okna a strategie progresivního načítání
    - Určení relevance a dynamické vyhledávání kontextu
    - Více-modální zpracování kontextu a bezpečnostní aspekty
  - **Implementační přístupy**: Jednovláknová vs. multi-agentní architektura
    - Techniky dělení kontextu a prioritizace
    - Progresivní načítání a strategie komprese kontextu
    - Vrstvené přístupy ke kontextu a optimalizace vyhledávání
  - **Měřící rámec**: Nově vznikající metriky pro hodnocení efektivity kontextu
    - Efektivita vstupu, výkon, kvalita a uživatelská zkušenost
    - Experimentální metody optimalizace kontextu
    - Analýzy selhání a metodologie zlepšování

#### Aktualizace navigace kurikula (README.md)
- **Vylepšená struktura modulu**: Aktualizována tabulka kurikula o nové pokročilé témata
  - Přidány položky Kontextové inženýrství (5.14) a Vlastní transport (5.15)
  - Konzistentní formátování a navigační odkazy ve všech modulech
  - Aktualizovány popisy reflektující současný rozsah obsahu

### Vylepšení struktury adresářů
- **Standardizace pojmenování**: Přejmenování „mcp transport“ na „mcp-transport“ z důvodu konzistence s ostatními složkami pokročilých témat
- **Organizace obsahu**: Všechny složky 05-AdvancedTopics nyní používají jednotný vzor pojmenování (mcp-[téma])

### Zvýšení kvality dokumentace
- **Soulad se specifikací MCP**: Veškerý nový obsah odkazuje na aktuální MCP Specification 2025-06-18
- **Vícejazyčné příklady**: Komplexní ukázky kódu v C#, TypeScriptu a Pythonu
- **Podnikový fokus**: Produkčně připravené vzory a integrace do Azure cloudu napříč dokumentací
- **Vizualizace dokumentace**: Mermaid diagramy pro architekturu a vizualizaci toků

## 18. srpna 2025

### Komplexní aktualizace dokumentace – standardy MCP 2025-06-18

#### Nejlepší bezpečnostní postupy MCP (02-Security/) – Kompletní modernizace
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kompletní přepis sladěný s MCP Specification 2025-06-18
  - **Povinné požadavky**: Přidány explicitní požadavky MUST/MUST NOT z oficiální specifikace s výraznými vizuálními indikátory
  - **12 základních bezpečnostních praktik**: Přestrukturalizováno z 15 položek na komplexní bezpečnostní domény
    - Bezpečnost tokenů a autentizace s integrací externích poskytovatelů identity
    - Správa relací a bezpečnost přenosu s kryptografickými požadavky
    - Ochrana proti AI-specifickým hrozbám s integrací Microsoft Prompt Shields
    - Řízení přístupu a oprávnění dle principu nejmenších práv
    - Bezpečnost obsahu a monitoring s Azure Content Safety
    - Bezpečnost dodavatelského řetězce s komplexní verifikací komponent
    - OAuth bezpečnost a prevence „confused deputy“ útoků s implementací PKCE
    - Incident response a zotavení s automatizovanými schopnostmi
    - Soulad a řízení s regulacemi
    - Pokročilé bezpečnostní kontroly s architekturou zero trust
    - Integrace Microsoft bezpečnostního ekosystému s kompletními řešeními
    - Neustálý vývoj bezpečnosti s adaptivními praktikami
  - **Microsoft bezpečnostní řešení**: Vylepšené návody k integraci Prompt Shields, Azure Content Safety, Entra ID a GitHub Advanced Security
  - **Implementační zdroje**: Kategorizované odkazy na zdroje dle Oficiální MCP dokumentace, Microsoft bezpečnostní řešení, bezpečnostní standardy a průvodce implementací

#### Pokročilé bezpečnostní kontroly (02-Security/) – Enterprise implementace
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletní přehodnocení s podnikovým bezpečnostním rámcem
  - **9 komplexních bezpečnostních domén**: Rozšíření z základních kontrol na detailní podnikový framework
    - Pokročilá autentizace a autorizace s integrací Microsoft Entra ID
    - Bezpečnost tokenů a kontroly proti průchodu s komplexní validací
    - Ovládání bezpečnosti relací s prevencí únosů relací
    - AI-specifické bezpečnostní kontroly proti injekcím promptů a otravě nástrojů
    - Prevence „confused deputy“ útoků s OAuth proxy bezpečností
    - Bezpečnost spuštění nástrojů se sandboxingem a izolací
    - Bezpečnost dodavatelského řetězce s ověřováním závislostí
    - Ovládání monitoringu a detekce s integrací SIEM
    - Incident response a zotavení s automatizací
  - **Implementační příklady**: Přidány podrobné YAML konfigurační bloky a ukázky kódu
  - **Integrace Microsoft řešení**: Komplexní pokrytí Azure bezpečnostních služeb, GitHub Advanced Security a podnikové správy identity

#### Bezpečnost pokročilých témat (05-AdvancedTopics/mcp-security/) – Produkčně připravená implementace
- **README.md**: Kompletní přepis pro podnikovou bezpečnostní implementaci
  - **Soulad s aktuální specifikací**: Aktualizováno dle MCP Specification 2025-06-18 s povinnými bezpečnostními požadavky
  - **Vylepšená autentizace**: Integrace Microsoft Entra ID s komplexními .NET a Java Spring Security příklady
  - **Integrace AI bezpečnosti**: Implementace Microsoft Prompt Shields a Azure Content Safety s podrobnými ukázkami v Pythonu
  - **Pokročilá mitigace hrozeb**: Kompletní implementace pro
    - Prevence „confused deputy“ útoků s PKCE a validací uživatelského souhlasu
    - Prevence průchodu tokenů s validací audience a bezpečnou správou tokenů
    - Prevence únosu relace pomocí kryptografického vázání a behaviorální analýzy
  - **Integrace podnikové bezpečnosti**: Monitorování Azure Application Insights, pipeline detekce hrozeb a zabezpečení dodavatelského řetězce
  - **Kontrolní seznam implementace**: Jasné rozlišení povinných a doporučených bezpečnostních opatření s výhodami Microsoft bezpečnostního ekosystému

### Kvalita dokumentace a sladění se standardy
- **Odkazy na specifikace**: Aktualizovány všechny odkazy na aktuální MCP specifikaci 2025-06-18
- **Microsoft bezpečnostní ekosystém**: Vylepšené pokyny pro integraci napříč celou bezpečnostní dokumentací
- **Praktická implementace**: Přidány podrobné ukázky kódu v .NET, Java a Python s podnikových vzory
- **Organizace zdrojů**: Komplexní kategorizace oficiální dokumentace, bezpečnostních standardů a průvodců implementací
- **Vizualní indikátory**: Jasné označení povinných požadavků oproti doporučeným postupům


#### Základní koncepty (01-CoreConcepts/) – Kompletní modernizace
- **Aktualizace verze protokolu**: Aktualizace s odkazem na aktuální MCP specifikaci 2025-06-18 s verzováním podle data (formát RRRR-MM-DD)
- **Upřesnění architektury**: Vylepšené popisy Hostitelů, Klientů a Serverů tak, aby odrážely aktuální architektonické vzory MCP
  - Hostitelé nyní jasně definováni jako AI aplikace koordinující více klientských připojení MCP
  - Klienti popsáni jako konektory protokolu udržující vztahy jeden na jednoho se serverem
  - Servery rozšířeny o scénáře nasazení lokální vs. vzdálené
- **Přepracování primitiv**: Kompletní přepracování serverových a klientských primitiv
  - Serverové primitivy: Zdrojové (datové zdroje), Výzvy (šablony), Nástroje (spustitelné funkce) s podrobnými vysvětleními a příklady
  - Klientské primitivy: Vzorkování (dokončení LLM), Elicitace (uživatelský vstup), Logování (ladění/monitorování)
  - Aktualizováno podle aktuálních vzorů metod discovery (`*/list`), retrieval (`*/get`) a execution (`*/call`)
- **Architektura protokolu**: Zaveden dvouvrstvý model architektury
  - Datová vrstva: Základ JSON-RPC 2.0 s řízením životního cyklu a primitivy
  - Přenosová vrstva: STDIO (lokální) a Streamable HTTP s SSE (vzdálený) přenosové mechanismy
- **Bezpečnostní rámec**: Komplexní bezpečnostní principy včetně explicitního uživatelského souhlasu, ochrany soukromí dat, bezpečného spouštění nástrojů a zabezpečení přenosové vrstvy
- **Komunikační vzory**: Aktualizované zprávy protokolu ukazující inicializační, discovery, execution a notification toky
- **Ukázky kódu**: Osvěženy příklady v několika jazycích (.NET, Java, Python, JavaScript) odpovídající aktuálním vzorům SDK MCP

#### Bezpečnost (02-Security/) – Komplexní přepracování bezpečnosti  
- **Sladění se standardy**: Plné sladění s bezpečnostními požadavky MCP specifikace 2025-06-18
- **Evoluce autentizace**: Dokumentovaná evoluce od vlastních OAuth serverů po delegaci na externí poskytovatele identity (Microsoft Entra ID)
- **Analýza hrozeb specifických pro AI**: Rozšířené pokrytí moderních útoků na AI
  - Podrobné scénáře útoků na injektování promptů s reálnými příklady
  - Mechanismy otravování nástrojů a vzory útoků typu "rug pull"
  - Otravování kontextového okna a útoky záměny modelu
- **Microsoft bezpečnostní řešení pro AI**: Komplexní pokrytí Microsoft bezpečnostního ekosystému
  - AI promptové štíty s pokročilými detekčními, zvýrazňovacími a oddělovacími technikami
  - Integrace Azure Content Safety
  - GitHub Advanced Security pro ochranu dodavatelského řetězce
- **Pokročilá mitigace hrozeb**: Podrobné bezpečnostní kontroly pro
  - Únos relace s MCP-specifickými scénáři a kryptografickými požadavky na ID relace
  - Problémy „confused deputy“ v MCP proxy scénářích s explicitními požadavky na souhlas
  - Zranitelnosti průchodu tokenů s povinnými validačními kontrolami
- **Zabezpečení dodavatelského řetězce**: Rozšířené pokrytí řetězce AI včetně základních modelů, embeddingových služeb, poskytovatelů kontextu a API třetích stran
- **Zabezpečení základen**: Vylepšená integrace s podnikových bezpečnostních vzory včetně zero trust architektury a Microsoft bezpečnostního ekosystému
- **Organizace zdrojů**: Kategorizované komplexní odkazy na zdroje podle typu (Oficiální dokumentace, Standardy, Výzkum, Microsoft řešení, Průvodce implementací)

### Zlepšení kvality dokumentace
- **Strukturované učební cíle**: Vylepšené učební cíle s konkrétními a proveditelnými výsledky
- **Křížové odkazy**: Přidány odkazy mezi souvisejícími tématy bezpečnosti a základními koncepty
- **Aktuální informace**: Aktualizovány všechny datumové odkazy a odkazy na specifikace podle platných standardů
- **Pokyny k implementaci**: Přidány specifické a akční pokyny k implementaci v obou sekcích

## 16. července 2025

### README a zlepšení navigace
- Kompletně přepracovaná navigace učebního plánu v README.md
- Nahrazeny značky `<details>` přístupnějším formátem založeným na tabulkách
- Vytvořeny alternativní možnosti rozložení v nové složce "alternative_layouts"
- Přidány příklady navigace v kartách, v záložkách a v rozbalovacím stylu Accordion
- Aktualizována sekce struktury repozitáře o všechny nejnovější soubory
- Vylepšena sekce „Jak používat tento učební plán“ s jasnými doporučeními
- Aktualizovány odkazy na MCP specifikace, aby směřovaly na správné URL
- Přidána sekce Context Engineering (5.14) do struktury učebního plánu

### Aktualizace studijního průvodce
- Kompletně přepracován studijní průvodce tak, aby odpovídal současné struktuře repozitáře
- Přidány nové sekce pro MCP klienty a nástroje a populární MCP servery
- Aktualizována vizuální mapa učebního plánu pro přesné zobrazení všech témat
- Vylepšeny popisy pokročilých témat pro pokrytí všech specializovaných oblastí
- Aktualizována sekce případových studií tak, aby odrážela skutečné příklady
- Přidán tento komplexní changelog

### Příspěvky komunity (06-CommunityContributions/)
- Přidány podrobné informace o MCP serverech pro generování obrázků
- Přidána kompletní sekce o používání Claude ve VSCode
- Přidány instrukce pro nastavení a používání terminálového klienta Cline
- Aktualizována sekce MCP klientů zahrnující všechny populární klientské možnosti
- Vylepšeny příklady příspěvků s přesnějšími ukázkami kódu

### Pokročilá témata (05-AdvancedTopics/)
- Uspořádány všechny specializované složky témat se sjednoceným pojmenováním
- Přidány materiály a příklady kontext engineeringu
- Přidána dokumentace integrace agenta Foundry
- Vylepšena dokumentace zabezpečení integrace Entra ID

## 11. června 2025

### První vytvoření
- Vydána první verze MCP pro začátečníky
- Vytvořena základní struktura deseti hlavních sekcí
- Implementována vizuální mapa učebního plánu pro navigaci
- Přidány první vzorové projekty v několika programovacích jazycích

### Začínáme (03-GettingStarted/)
- Vytvořeny první příklady implementace serveru
- Přidány pokyny pro vývoj klienta
- Začleněna dokumentace integrace LLM klienta
- Přidána dokumentace pro VS Code integraci
- Implementovány příklady serveru využívající Server-Sent Events (SSE)

### Základní koncepty (01-CoreConcepts/)
- Přidáno podrobné vysvětlení klient-server architektury
- Vytvořena dokumentace klíčových komponent protokolu
- Zdokumentovány vzory zpráv v MCP

## 23. května 2025

### Struktura repozitáře
- Inicializován repozitář se základní strukturou složek
- Vytvořeny README soubory pro každou hlavní sekci
- Nastavena infrastruktura pro překlady
- Přidány obrazové zdroje a diagramy

### Dokumentace
- Vytvořen počáteční README.md s přehledem učebního plánu
- Přidány CODE_OF_CONDUCT.md a SECURITY.md
- Nastaven SUPPORT.md s pokyny, jak hledat pomoc
- Vytvořena předběžná struktura studijního průvodce

## 15. dubna 2025

### Plánování a rámec
- Počáteční plánování učebního plánu MCP pro začátečníky
- Definovány učební cíle a cílová skupina
- Nastíněna desetisekční struktura učebního plánu
- Vyvinut konceptuální rámec pro příklady a případové studie
- Vytvořeny počáteční prototypové příklady hlavních konceptů

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->