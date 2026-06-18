# Záznam změn: MCP pro začátečníky - osnovy

Tento dokument slouží jako záznam všech významných změn provedených v osnovách Model Context Protocol (MCP) pro začátečníky. Změny jsou zapisovány v obráceném chronologickém pořadí (nejnovější změny jsou první).

## 16. června 2026

### Zarovnání specifikace MCP a validace vzorků

Ověřili jsme osnovy vůči aktuální **MCP specifikaci 2025-11-25** a nejnovějším oficiálním SDK, poté jsme opravili zbývající zastaralé odkazy na specifikaci a potvrdili, že základní vzorky se stále sestavují a spouštějí.

#### Opravy verzí specifikace (2025-06-18 / 2025-03-26 → 2025-11-25)

Aktualizovali jsme anglický obsah, kde se stále uvádělo, že starší revize specifikace je *aktuální/nejnovější* standard a přesměrovali odkazy na kanonické cesty specifikace na `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Aktualizováno bannery "Current Standard", úvod, nadpisy hlavních bezpečnostních principů, povinných požadavků, sekce Microsoft Entra ID, odkazy na Reference & Resources a závěrečné bezpečnostní upozornění (8 odkazů) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aktualizován odkaz na specifikaci v sekci Další zdroje a banner "Current Standard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Nahrazen zastaralý odkaz `2025-03-26` odkazem na aktuální stránku s osvědčenými bezpečnostními postupy 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Aktualizován oficiální odkaz na dokumentaci pro sampling na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aktualizována přítomná reference „current MCP specification“ a odkaz na specifikaci v sekci Další zdroje na 2025-11-25 (historické poznámky ke zrušení SSE ponechány pro přesnost)

#### Validace vzorků vůči aktuálním SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` vyřešil `@modelcontextprotocol/sdk@1.29.0`; příkaz `tsc --noEmit` prošel bez typových chyb — existující API `McpServer`/`StdioServerTransport` zůstávají platná
- **Python (03-GettingStarted/01-first-server/solution/python)**: Ověřeno v izolovaném `.venv` s `mcp[cli]` (1.27.2); `py_compile` prošel a `FastMCP.list_tools()` správně vrátil nástroje `add` a `subtract`
- Potvrzeno, že všechny rozsahy verzí `@modelcontextprotocol/sdk` ve vzorcích (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se čistě řeší na aktuální `1.29.0` bez zásadních změn API

#### Zarovnání verzí závislostí (uzavření mezer ve verzích)

Zvýšili jsme zastaralé SDK piny, aby každý vzorek sledoval aktuální vydání MCP, v souladu s konvencí celého repozitáře:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Zvýšení `@modelcontextprotocol/sdk` z `^1.8.0` → `>=1.26.0` a aktualizace zastaralého popisu balíčku „updated for MCP 2025-06-18“ na „aligned with MCP Specification 2025-11-25“
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** a **lab4/code/github_mcp_server/pyproject.toml**: Zvýšení přesného pinu `mcp==1.23.0` → `mcp>=1.26.0`; regenerováno obou `uv.lock` souborů (`uv lock`) tak, aby lockfiles odkazovaly na aktuální `mcp 1.27.2` a byly synchronizovány s manifesty

#### Analýza výklenků osnov — pokrytí funkcí nové specifikace

Ověřili jsme, že osnovy již pokrývají všechny primitivy zavedené/rozšířené ve verzi MCP 2025-11-25, tedy žádné výpadky obsahu nezůstávají:
- **Sampling**: Lekce 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (včetně režimu URL)**: zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Roots**: zdokumentováno v 00-Introduction, 01-CoreConcepts a 05-AdvancedTopics/mcp-root-contexts
- **Úkoly (experimentální, dlouhotrvající operace)**: zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Anotace nástrojů** (`readOnlyHint` / `destructiveHint`): zdokumentováno v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features

### Zesílení bezpečnosti a odstranění zranitelností závislostí

Provedli jsme kompletní bezpečnostní audit všech manifestů závislostí a zdrojového kódu vzorků, následně odstranili všechny nahlášené bezpečnostní problémy npm i jedno zjištění v kódu. Po opravách hlásí `npm audit` **0 zranitelností** ve všech kontrolovaných složkách.

#### Zranitelnosti transitivních npm závislostí — opraveno

Ověřili jsme všech 15 nahraných `package-lock.json` souborů. Zranitelnosti byly omezeny na transitivní závislosti, které přinášel vývojářský nástroj MCP Inspector, klient OpenAI a MCP SDK; všechny jsou nyní vyřešeny bez narušení funkčnosti vzorků:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** a **lab3/code/weather_mcp/inspector**: Zvýšeno `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), což odstranilo reporty o `ajv`, `brace-expansion`, `diff`, `path-to-regexp` a `ws`; přidán záznam npm `overrides` vynucující opravenou verzi `shell-quote@1.8.4` pro odstranění kritické zranitelnosti přenášené `concurrently`; regenerovány oba lockfiles (nyní 0 zranitelností)
- **03-GettingStarted/samples/typescript**: `npm audit fix` aktualizováno transitivní `qs` (středně vážné) na opravené vydání
- **03-GettingStarted/samples/javascript**: `npm audit fix` aktualizováno transitivní `hono` (středně vážné) na opravené vydání
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` aktualizováno transitivní `form-data` (vysoké) na opravené vydání
- **03-GettingStarted/11-simple-auth/solution/typescript**: Vygenerován chybějící `package-lock.json` soubor, aby byl projekt reprodukovatelný a auditovatelný (0 zranitelností)

#### Oprava bezpečnosti na úrovni kódu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odebráno `shell=True` z nástroje `open_in_vscode`. Předchozí příkaz `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` umožňoval interpretaci shellových metaznaků ve složkové cestě pomocí `cmd.exe` (vektor příkazové injekce). Nyní spouští přímo vyřešený `Code.exe` s adresářem jako argumentem — bez shellu — což je funkčně ekvivalentní a bezpečné.

#### Audit Python závislostí

- Proveden audit všech Python requirements balíčků pomocí `pip-audit`. `05-AdvancedTopics` a `03-GettingStarted/samples/python` nehlásily žádné známé zranitelnosti (rozsahy `mcp` / `httpx` / `pydantic` / `python-dotenv` odkazují na aktuální opravená vydání)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` označil transitivní závislost **`werkzeug` 3.1.1** se třemi alerty týkajícími se `safe_join` Windows device-name DoS — `CVE-2025-66221`, `CVE-2026-21860` a `CVE-2026-27199` (vše vyřešeno ve verzi 3.1.6). Přidán explicitní bezpečnostní pin `werkzeug>=3.1.6` pro zajištění stažení opravené verze; ověřeno, že toto omezení je bezproblémově kompatibilní se stackem `chainlit` / `mcp` / `semantic-kernel`

### Přejmenování produktové značky

Aktualizován veškerý obsah osnov odrážející rebranding produktů Microsoftu:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aktualizován odkaz na Discord komunitu
- **AGENTS.md**: Aktualizován odkaz na Discord server
- **README.md**: Aktualizovány odkazy na technologický ekosystém
- **study_guide.md**: Aktualizovány odkazy na případové studie
- **05-AdvancedTopics/README.md**: Aktualizován název a popis modulu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Aktualizován nadpis sekce a popis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kompletní aktualizace názvu modulu a obsahu
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aktualizován křížový odkaz
- **07-LessonsfromEarlyAdoption/README.md**: Aktualizovány odkazy na případové studie
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aktualizován nadpis sekce 9, odznaky a schopnosti
- **08-BestPractices/README.md**: Aktualizován odkaz na Discord komunitu
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aktualizován odkaz na Discord kanál
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aktualizován odkaz na nasazení modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aktualizována tabulka AI služeb
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aktualizovány odkazy na zdroje

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension pro VS Code
- **README.md**: Aktualizovány hlavní odkazy v osnovách
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aktualizován název modulu, přehled a všechny nadpisy modulů
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aktualizován název, vzdělávací cíle, pokyny pro nastavení a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aktualizován název, vzdělávací cíle, tabulka MCP hostitelů a křížové odkazy
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aktualizován název, odznaky, předpoklady a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aktualizovány odkazy na Agent Builder a zpětnou vazbu
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aktualizovány předpoklady a odkazy na rozšíření

---

## 11. dubna 2026

### Nová lekce, opravy dokumentace a aktualizace závislostí

#### Přidán nový obsah osnov

**Modul 05 - Pokročilá témata**
- **Lekce 5.17: Adversariální multi-agentní uvažování s MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nový komplexní průvodce pokrývající vzor adversariální debaty pro multi-agentní systémy
  - Mermaid diagram architektury: dva agenti → sdílený MCP server → přepis debaty → soudce → verdikt
  - Sdílený MCP server nástrojů (`web_search` + `run_python`) implementován v Pythonu a TypeScriptu
  - Protikladné systémové výzvy (PRO / PROTI / soudce) s explicitními požadavky na používání nástrojů
  - Orchestrace debaty v Pythonu, TypeScriptu a C# spravující kola a směrování argumentů
  - Zapojení MCP `ClientSession` pro orchestrátora do skutečných volání nástrojů
  - Tabulka případů použití (detekce halucinací, modelování hrozeb, revize návrhu API, faktická kontrola, výběr technologie)
  - Bezpečnostní úvahy: sandboxové prostředí, validace volání nástrojů, omezení rychlosti, auditní logování
  - Strukturované cvičení se třemi praktickými scénáři (kontrola kódu, rozhodnutí o architektuře, moderace obsahu)

#### Opravy dokumentace

**Modul 03 - Začínáme**
- **05-stdio-server/README.md**: Opravený neúplný příklad TypeScript stdio serveru — přidána chybějící instanciace transportu (`new StdioServerTransport()`) a volání `server.connect(transport)`, aby odpovídal příkladům v Pythonu a .NET ve stejné sekci
- **14-sampling/README.md**: Oprava překlepu — změněno `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Aktualizace osnov

**Hlavní README.md**
- Přidán záznam 5.17 (Adversariální multi-agentní uvažování s MCP) do tabulky osnov s přímým odkazem na novou lekci

**05-AdvancedTopics/README.md**
- Přidán řádek lekce 5.17 do tabulky lekcí

**study_guide.md**
- Přidáno téma Adversariální multi-agentní uvažování do myšlenkové mapy a popis pokročilých témat

#### Opravy kódu a bezpečnosti

**Modul 05 - Adversariální agenti (`mcp-adversarial-agents`)**
- **Bezpečnostní oprava — příkazová injekce**: Nahrazeno volání `execSync` s interpolací shellu za `execFile` + `promisify` v TypeScript nástroji `run_python`, čímž je odstraněna plocha pro příkazovou injekci (kód řízený LLM je nyní předáván jako doslovný prvek argv bez zapojení shellu)
- **Zapojení smyčky nástroje MCP**: Aktualizován orchestrátor debat v Pythonu tak, aby používal klienta `AsyncAnthropic` (nahrazujícího blokující synchronní `Anthropic`), předával živou `ClientSession` přímo ke každému tahu agenta, získával definice nástrojů přes `session.list_tools()` při každém tahu a spouštěl bloky `tool_use` přes `session.call_tool()` v cyklu, dokud model nevygeneruje konečnou textovou odpověď

#### Aktualizace závislostí

- Zvýšení verze `hono` na 4.12.12 napříč více balíčky (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Zvýšení verze `@hono/node-server` z 1.19.11 na 1.19.13 v TypeScript balíčcích
- Zvýšení verze `cryptography` z 46.0.5 na 46.0.7 v Python balíčcích (10-StreamliningAIWorkflows laboratoře 3 a 4)
- Zvýšení verze `lodash` z 4.17.23 na 4.18.1 v inspektoru 10-StreamliningAIWorkflows

#### Překlady

- Synchronizace překladů pro více než 48 jazyků s nejnovějšími změnami zdroje (aktualizace i18n)

---

## 5. února 2026

### Vylepšení validace a navigace napříč repozitářem

#### Přidání nového obsahu kurikula

**Modul 03 - Začínáme**
- **12-mcp-hosts/README.md**: Nový komplexní průvodce nastavením MCP hostitelů
  - Konfigurační příklady pro Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Šablony JSON konfigurace pro všechny hlavní hostitele
  - Tabulka porovnání typů transportu (stdio, SSE/HTTP, WebSocket)
  - Řešení běžných problémů s připojením
  - Bezpečnostní nejlepší praktiky pro konfiguraci hostů

- **13-mcp-inspector/README.md**: Nový průvodce laděním MCP Inspektoru
  - Metody instalace (npx, globální npm, ze zdroje)
  - Připojení na servery přes stdio a HTTP/SSE
  - Testování nástrojů, zdrojů a pracovních postupů promptů
  - Integrace MCP Inspektoru s VS Code
  - Běžné ladící scénáře s řešeními

**Modul 04 - Praktická implementace**
- **pagination/README.md**: Nový průvodce implementací stránkování
  - Vzory stránkování založeného na kurzoru v Pythonu, TypeScriptu, Javě
  - Zpracování stránkování na straně klienta
  - Strategie návrhu kurzoru (opak + strukturovaný)
  - Doporučení pro optimalizaci výkonu

**Modul 05 - Pokročilá témata**
- **mcp-protocol-features/README.md**: Nový detailní přehled funkcí protokolu
  - Implementace notifikací o průběhu
  - Vzory pro rušení požadavků
  - Šablony zdrojů s URI vzory
  - Správa životního cyklu serveru
  - Řízení úrovně logování
  - Vzory zpracování chyb s JSON-RPC kódy

#### Opravy navigace (aktualizováno více než 24 souborů)

**Hlavní modul README**
 Nyní odkazuje jak na první lekci, TAK i na další modul

**Podadresáře 02-Security**
- Všech 5 doplňkových bezpečnostních dokumentů nyní obsahuje navigaci "Co dál"

**Soubory 09-CaseStudy**
- Všechny soubory případových studií nyní mají sekvenční navigaci

**Laboratoře 10-StreamliningAI**
Přidána sekce Co dál do přehledu modulu 10 i modulu 11

#### Opravy kódu a obsahu

**Aktualizace SDK a závislostí**
Opravená prázdná verze openai na `^4.95.0`
Aktualizace SDK z `^1.8.0` na `>=1.26.0`
Aktualizace verzí mcp na `>=1.26.0`

**Opravy kódu**
Opraven neplatný model `gpt-4o-mini` na `gpt-4.1-mini`

**Opravy obsahu**
Opraveny nefunkční odkazy `READMEmd` → `README.md`, opraven nadpis kurikula `Module 1-3` → `Module 0-3`, opravena cesta citlivá na velikost písmen
Odstraněn poškozený duplicitní obsah Case Study 5

**Vylepšení pro začátečníky**
Přidán správný úvod, cíle učení a předpoklady pro začátečníky

#### Aktualizace kurikula

**Hlavní README.md**
- Přidány položky 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Stránkování), 5.16 (Funkce protokolu) do tabulky kurikula

**Modulové README**
Přidány lekce 12 a 13 do seznamu lekcí
Přidána sekce Praktické průvodce s odkazem na stránkování
Přidány lekce 5.15 (Vlastní transport) a 5.16 (Funkce protokolu)

**study_guide.md**
- Aktualizována myšlenková mapa o všechny nové témata: Nastavení MCP Hosts, MCP Inspector, Strategie stránkování, Podrobný přehled funkcí protokolu

## 28. ledna 2026

### Revize souladu se specifikací MCP 2025-11-25

#### Vylepšení základních konceptů (01-CoreConcepts/)
- **Nový klientský primitiv – Roots**: Přidána podrobná dokumentace klientského primitivu Roots, umožňující serverům chápat hranice systému souborů a přístupová oprávnění
- **Anotace nástrojů**: Přidána dokumentace k behaviorálním anotacím nástrojů (`readOnlyHint`, `destructiveHint`) pro lepší rozhodování o provádění nástrojů
- **Volání nástrojů při Sampling**: Aktualizována dokumentace Sampling o parametry `tools` a `toolChoice` pro modelem řízené volání nástrojů během samplingových požadavků
- **Režim vyvolání URL**: Přidána dokumentace k URL založenému vyvolání pro serverem iniciované externí webové interakce
- **Úkoly (experimentální)**: Přidána nová sekce dokumentující experimentální funkci Úkoly pro trvalé obalování vykonávání a odložené získávání výsledků
- **Podpora ikon**: Upozornění, že nástroje, zdroje, šablony zdrojů a prompty mohou nyní obsahovat ikony jako dodatečná metadata

#### Aktualizace dokumentace
- **README.md**: Přidána reference na verzi MCP Specification 2025-11-25 a vysvětlení verzování podle data
- **study_guide.md**: Aktualizována mapa kurikula tak, aby zahrnovala Úkoly a Anotace nástrojů v sekci Základní koncepty; aktualizován časový údaj dokumentu

#### Ověření souladu se specifikací
- **Verze protokolu**: Ověřeno, že veškerá dokumentace odkazuje na aktuální MCP Specification 2025-11-25
- **Architektura**: Potvrzená správnost dokumentace dvouvrstvé architektury (Datová vrstva + Přenosová vrstva)
- **Dokumentace primitiv**: Ověřena dokumentace serverových primitiv (Zdroje, Prompty, Nástroje) a klientských primitiv (Sampling, Elicitation, Logging, Roots)
- **Přenosové mechanismy**: Ověřena správnost dokumentace STDIO a Streamable HTTP přenosů
- **Bezpečnostní doporučení**: Potvrzená shoda s aktuální dokumentací MCP Best Practices pro bezpečnost

#### Klíčové vlastnosti MCP 2025-11-25 zdokumentované
- **OpenID Connect Discovery**: Objevování autentizačního serveru přes OIDC
- **Metadata dokumenty klientského ID OAuth**: Doporučený mechanismus registrace klienta
- **JSON Schema 2020-12**: Výchozí dialekt pro definice schémat MCP
- **Systém tříd SDK**: Formalizované požadavky na podporu a údržbu funkcí SDK
- **Správa governance**: Formalizace pracovních skupin a zájmových skupin v rámci správy MCP

### Hlavní aktualizace bezpečnostní dokumentace (02-Security/)

#### Integrace MCP Security Summit Workshop (Sherpa)
- **Nový zdroj praktického školení**: Přidána komplexní integrace s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) v celém rozsahu bezpečnostní dokumentace
- **Pokrytí trasy expedice**: Zdokumentován celý postup od základního tábora k vrcholu summitu
- **Soulad s OWASP**: Veškerá bezpečnostní doporučení nyní mapována na MCP Azure Security Guide založený na OWASP

#### Integrace OWASP MCP Top 10
- **Nová sekce**: Přidána tabulka OWASP MCP Top 10 bezpečnostních rizik s mitigacemi pro Azure do hlavního bezpečnostního README
- **Dokumentace řízená riziky**: Aktualizován soubor mcp-security-controls-2025.md s odkazy na rizika OWASP MCP pro jednotlivé bezpečnostní oblasti
- **Referenční architektura**: Přidány odkazy na referenční architekturu a implementační vzory OWASP MCP Azure Security Guide

#### Aktualizované bezpečnostní soubory
- **README.md**: Přidán přehled Sherpa Workshopu, tabulka trasy expedice, shrnutí OWASP MCP Top 10 rizik a sekce praktického školení
- **mcp-security-controls-2025.md**: Aktualizován záhlaví na únor 2026, přidány odkazy na rizika OWASP MCP (MCP01-MCP08), opraveny nesrovnalosti ve verzi specifikace
- **mcp-security-best-practices-2025.md**: Přidána sekce zdrojů Sherpa a OWASP, aktualizován časový údaj
- **mcp-best-practices.md**: Přidána sekce praktického školení s odkazy na Sherpa a OWASP
- **azure-content-safety-implementation.md**: Přidán odkaz OWASP MCP06, sladění s Sherpa Camp 3 a přidaná sekce dalších zdrojů

#### Přidány nové odkazy na zdroje
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuální stránky rizik OWASP MCP (MCP01-MCP10)

### Shoda kurikula se specifikací MCP 2025-11-25

#### Modul 03 - Začínáme
- **Dokumentace SDK**: Přidán Go SDK do oficiálního seznamu SDK; aktualizovány všechny odkazy na SDK v souladu se specifikací MCP 2025-11-25
- **Upřesnění transportu**: Aktualizován popis STDIO a HTTP streamingu s explicitními odkazy na specifikaci

#### Modul 04 - Praktická implementace
- **Aktualizace SDK**: Přidán Go SDK; aktualizovaný seznam SDK s odkazem na verzi specifikace
- **Autorizace**: Aktualizován odkaz na specifikaci autorizace MCP na aktuální verzi 2025-11-25

#### Modul 05 - Pokročilá témata
- **Nové funkce**: Přidána poznámka o nových funkcích MCP Specification 2025-11-25 (Úkoly, Anotace nástrojů, Režim vyvolání URL, Roots)
- **Bezpečnostní zdroje**: Přidány odkazy na OWASP MCP Top 10 a Sherpa workshop do doplňkových zdrojů

#### Modul 06 - Komunitní příspěvky
- **Seznam SDK**: Přidány Swift a Rust SDK; aktualizován odkaz na specifikaci na 2025-11-25
- **Odkaz na specifikaci**: Aktualizován odkaz na přímou URL specifikace MCP

#### Modul 07 - Lekce z rané adopce
- **Aktualizace zdrojů**: Přidán odkaz na MCP Specification 2025-11-25 a OWASP MCP Top 10 do doplňkových zdrojů

#### Modul 08 - Nejlepší postupy
- **Verze specifikace**: Aktualizováno na MCP Specification 2025-11-25
- **Bezpečnostní zdroje**: Přidány odkazy na OWASP MCP Top 10 a Sherpa workshop do doplňkových zdrojů

#### Modul 10 - Urychlení pracovních toků AI
- **Aktualizace odznaku**: Změněn odznak MCP verze z SDK verze (1.9.3) na verzi specifikace (2025-11-25)
- **Odkazy na zdroje**: Aktualizován odkaz na MCP Specification; přidán OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Odkaz na specifikaci**: Aktualizován na verzi MCP Specification 2025-11-25
- **Bezpečnostní zdroje**: Přidán OWASP MCP Top 10 do oficiálních zdrojů

## 18. prosince 2025

### Aktualizace bezpečnostní dokumentace - MCP Specification 2025-11-25

#### MCP Bezpečnostní osvědčené postupy (02-Security/mcp-best-practices.md) - aktualizace verze specifikace
- **Aktualizace verze protokolu**: Aktualizováno na referenci nejnovější MCP Specification 2025-11-25 (vydáno 25. listopadu 2025)
  - Aktualizovány všechny odkazy na verze specifikace z 2025-06-18 na 2025-11-25
  - Aktualizovány datumové reference z 18. srpna 2025 na 18. prosince 2025
  - Ověřeno, že všechny URL specifikací ukazují na aktuální dokumentaci
- **Validace obsahu**: Komplexní ověření bezpečnostních osvědčených postupů vůči nejnovějším standardům
  - **Microsoft Security Solutions**: Ověřena aktuálnost terminologie a odkazů na Prompt Shields (dříve "detekce jailbreak rizika"), Azure Content Safety, Microsoft Entra ID a Azure Key Vault
  - **OAuth 2.1 Security**: Potvrzeno souladu s nejnovějšími bezpečnostními osvědčenými postupy OAuth
  - **Standardy OWASP**: Ověřena aktuálnost referencí na OWASP Top 10 pro LLMs
  - **Služby Azure**: Ověřeny všechny odkazy a osvědčené postupy Microsoft Azure
- **Soulad se standardy**: Všechny odkazované bezpečnostní standardy potvrzeny jako aktuální
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Rámce bezpečnosti a souladu Azure
- **Implementační zdroje**: Ověřeny všechny odkazy na implementační průvodce a zdroje
  - Vzory autentizace Azure API Management
  - Průvodce integrací Microsoft Entra ID
  - Správa tajemství Azure Key Vault
  - DevSecOps pipelines a monitorovací řešení

### Zajištění kvality dokumentace
- **Soulad se specifikací**: Zajištěno, že všechny povinné MCP bezpečnostní požadavky (MUST/MUST NOT) odpovídají nejnovější specifikaci
- **Aktualizovanost zdrojů**: Ověřeny všechny externí odkazy na dokumentaci Microsoftu, bezpečnostní standardy a implementační průvodce
- **Pokrytí osvědčených postupů**: Potvrzeno kompletní pokrytí autentizace, autorizace, hrozeb specifických pro AI, bezpečnosti dodavatelského řetězce a podnikových vzorů

## 6. října 2025

### Rozšíření sekce Začínáme – pokročilé použití serveru a jednoduchá autentizace

#### Pokročilé použití serveru (03-GettingStarted/10-advanced)
- **Přidána nová kapitola**: Zaveden komplexní průvodce pokročilým použitím MCP serveru zahrnující jak běžné, tak nízkoúrovňové serverové architektury
  - **Běžný vs. nízkoúrovňový server**: Detailní porovnání a příklady kódu v Pythonu a TypeScriptu pro obě varianty
  - **Návrh založený na handlerech**: Vysvětlení správy nástrojů/zdrojů/promptů přes handlery pro škálovatelné a flexibilní serverové implementace
  - **Praktické vzory**: Reálné scénáře, kde jsou nízkoúrovňové serverové vzory výhodné pro pokročilé funkce a architekturu
#### Jednoduché ověřování (03-GettingStarted/11-simple-auth)
- **Přidána nová kapitola**: Krok za krokem průvodce implementací jednoduchého ověřování na serverech MCP.
  - **Koncepty ověřování**: Jasné vysvětlení rozdílu mezi ověřováním a autorizací a nakládání s přihlašovacími údaji.
  - **Základní implementace ověřování**: Vzorové vzory ověřování založeného na middleware pro Python (Starlette) a TypeScript (Express) s ukázkami kódu.
  - **Přechod k pokročilé bezpečnosti**: Návod na start s jednoduchým ověřováním a postup k OAuth 2.1 a RBAC s odkazy na pokročilé bezpečnostní moduly.

Tyto doplňky poskytují praktické, prakticky zaměřené návody pro tvorbu robustnějších, zabezpečených a flexibilních implementací serveru MCP, které propojují základní koncepty s pokročilými produkčními vzory.

## 29. září 2025

### MCP Server Database Integration Labs – Komplexní praktická učební cesta

#### 11-MCPServerHandsOnLabs – Nový kompletní kurz integrace databází
- **Kompletní 13-laboratorní učební cesta**: Přidán komplexní praktický kurz pro budování produkčně připravených MCP serverů s integrací PostgreSQL databáze
  - **Reálná implementace**: Use case analýzy Zava Retail demonstrující podnikové vzory
  - **Strukturovaný postup učení**:
    - **Laboratoře 00-03: Základy** – Úvod, základní architektura, bezpečnost a více-nájmovost, příprava prostředí
    - **Laboratoře 04-06: Budování MCP serveru** – Návrh databáze a schéma, implementace MCP serveru, vývoj nástrojů  
    - **Laboratoře 07-09: Pokročilé funkce** – Integrace sémantického vyhledávání, testování a ladění, integrace VS Code
    - **Laboratoře 10-12: Produkce a osvědčené postupy** – Strategie nasazení, monitoring a sledovatelnost, nejlepší praktiky a optimalizace
  - **Podnikové technologie**: Rámec FastMCP, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Pokročilé funkce**: Úroveň bezpečnosti záznamů (RLS), sémantické vyhledávání, více-nájemnický přístup k datům, vektorová embedování, monitorování v reálném čase

#### Standardizace terminologie – Převod modulů na laboratoře
- **Komplexní aktualizace dokumentace**: Systémově aktualizovány všechny README soubory v 11-MCPServerHandsOnLabs, nahrazení termínu „Module“ termínem „Lab“
  - **Názvy sekcí**: „Co tento modul pokrývá“ změněno na „Co tato laboratoř pokrývá“ ve všech 13 laboratořích
  - **Popis obsahu**: „Tento modul poskytuje...“ změněno na „Tato laboratoř poskytuje...“ v celé dokumentaci
  - **Výukové cíle**: „Ke konci tohoto modulu...“ změněno na „Ke konci této laboratoře...“
  - **Odkazy na navigaci**: Veškerá zmínka o „Module XX:“ převedena na „Lab XX:“ v křížových odkazech a navigaci
  - **Sledování dokončení**: „Po dokončení tohoto modulu...“ změněno na „Po dokončení této laboratoře...“
  - **Zachování technických odkazů**: Odkazy na Python moduly ponechány beze změny v konfiguračních souborech (např. `"module": "mcp_server.main"`)

#### Vylepšení studijního průvodce (study_guide.md)
- **Vizualizace učebního plánu**: Přidána nová sekce „11. Database Integration Labs“ s komplexní strukturou laboratoří
- **Struktura repozitáře**: Aktualizace z deseti na jedenáct hlavních sekcí s podrobným popisem 11-MCPServerHandsOnLabs
- **Instrukce pro učební cestu**: Vylepšená navigace pokrývající sekce 00-11
- **Pokrytí technologií**: Přidány detaily integrace FastMCP, PostgreSQL a Azure služeb
- **Výsledky učení**: Zdůrazněna produkčně připravená tvorba serveru, databázové integrační vzory a podniková bezpečnost

#### Vylepšení struktury hlavního README
- **Terminologie založená na laboratořích**: Hlavní README.md v 11-MCPServerHandsOnLabs konzistentně používá strukturu „Laboratoř“
- **Organizace učební cesty**: Jasný postup od základních konceptů přes pokročilou implementaci k nasazení do produkce
- **Reálné zaměření**: Důraz na praktické, laboratorní učení s podnikové vzory a technologiemi

### Zlepšení kvality a konzistence dokumentace
- **Důraz na praktické učení**: Posílení praktického, laboratorního přístupu v celé dokumentaci
- **Zaměření na podnikové vzory**: Zvýraznění produkčně připravených implementací a podnikové bezpečnosti
- **Integrace technologií**: Komplexní pokrytí moderních Azure služeb a AI integračních vzorů
- **Progres učení**: Jasná, strukturovaná cesta od základů k produkčnímu nasazení

## 26. září 2025

### Vylepšení případových studií – Integrace GitHub MCP Registry

#### Případové studie (09-CaseStudy/) – Zaměření na vývoj ekosystému
- **README.md**: Rozsáhlá rozšířená verze s komplexní případovou studií GitHub MCP Registry
  - **Případová studie GitHub MCP Registry**: Nová podrobná případová studie zkoumající spuštění GitHub MCP Registry v září 2025
    - **Analýza problému**: Podrobná analýza fragmentovaných výzev objevování a nasazení MCP serverů
    - **Architektura řešení**: Centralizovaný přístup GitHub registry s jedním kliknutím instalace do VS Code
    - **Dopad na byznys**: Měřitelné zlepšení onboardingu vývojářů a produktivity
    - **Strategická hodnota**: Zaměření na modulární nasazení agentů a interoperabilitu mezi nástroji
    - **Vývoj ekosystému**: Pozice jako základní platformy pro agentní integrace
  - **Vylepšená struktura případových studií**: Aktualizace všech sedmi případových studií s konzistentním formátováním a komplexním popisem
    - Azure AI Travel Agents: Zdůraznění multi-agentní orchestrace
    - Azure DevOps Integrace: Zaměření na automatizaci workflow
    - Real-time Dokumentační dotazování: Implementace python konzolového klienta
    - Interaktivní generátor studijního plánu: Chainlit konverzační webová aplikace
    - Dokumentace v editoru: Integrace VS Code a GitHub Copilot
    - Azure API Management: Vzory integrace podnikových API
    - GitHub MCP Registry: Vývoj ekosystému a komunitní platformy
  - **Komplexní závěr**: Přepsaná závěrečná část zdůrazňující sedm případových studií pokrývajících více dimenzí implementace MCP
    - Podniková integrace, multi-agentní orchestrace, produktivita vývojářů
    - Vývoj ekosystému, vzdělávací aplikace klasifikace
    - Prohloubené poznatky o architektonických vzorech, strategiích implementace a osvědčených postupech
    - Důraz na MCP jako zralý, produkčně připravený protokol

#### Aktualizace studijního průvodce (study_guide.md)
- **Vizualizace učebního plánu**: Aktualizace myšlenkové mapy s přidáním GitHub MCP Registry do sekce případových studií
- **Popis případových studií**: Rozšíření z obecného popisu na podrobný rozbor sedmi komplexních případových studií
- **Struktura repozitáře**: Aktualizace sekce 10 reflektující komplexní pokrytí případových studií se specifickými detaily implementace
- **Integrace změn v dokumentaci**: Přidán záznam z 26. září 2025 dokumentující doplnění GitHub MCP Registry a vylepšení případových studií
- **Aktualizace data**: Aktuální časové razítko v patičce aktualizováno na 26. září 2025

### Zlepšení kvality dokumentace
- **Zvýšení konzistence**: Standardizace formátování a struktury případových studií ve všech sedmi příkladech
- **Komplexní pokrytí**: Případové studie nyní zahrnují scénáře podnikové integrace, produktivity vývojářů a rozvoje ekosystému
- **Strategické umístění**: Vylepšené zaměření na MCP jako základní platformu pro deploy agentních systémů
- **Integrace zdrojů**: Aktualizované doplňkové zdroje o odkaz na GitHub MCP Registry

## 15. září 2025

### Rozšíření pokročilých témat – Vlastní transporty a Inženýrství kontextu

#### MCP vlastní transporty (05-AdvancedTopics/mcp-transport/) – Nový pokročilý průvodce implementací
- **README.md**: Kompletní průvodce implementací vlastních MCP transportních mechanismů
  - **Azure Event Grid Transport**: Komplexní implementace bezserverového event-driven transportu
    - Příklady v C#, TypeScript a Python s integrací Azure Functions
    - Vzory architektury orientované na události pro škálovatelné MCP řešení
    - Příjemci webhooků a push-based zpracování zpráv
  - **Azure Event Hubs Transport**: Implementace streamovacího transportu s vysokou propustností
    - Real-time streamingové schopnosti pro scénáře s nízkou latencí
    - Strategie partitioningu a správy checkpointů
    - Šaržování zpráv a optimalizace výkonu
  - **Podnikové integrační vzory**: Produkčně připravené architektonické příklady
    - Distribuované MCP zpracování napříč Azure Functions
    - Hybridní transportní architektury kombinující různé typy transportů
    - Strategie trvalosti zpráv, spolehlivosti a zpracování chyb
  - **Bezpečnost a monitoring**: Integrace Azure Key Vault a vzory sledovatelnosti
    - Ověřování pomocí spravované identity a princip minimálních práv
    - Telemetrie Application Insights a monitoring výkonu
    - Obvody přerušovačů a vzory odolnosti vůči chybám
  - **Testovací rámce**: Komplexní testovací strategie pro vlastní transporty
    - Jednotkové testy s test doubles a mocking frameworky
    - Integrační testování s Azure Test Containers
    - Úvahy o testování výkonu a zatížení

#### Inženýrství kontextu (05-AdvancedTopics/mcp-contextengineering/) – Vznikající disciplína AI
- **README.md**: Komplexní průzkum inženýrství kontextu jako vznikajícího pole
  - **Základní principy**: Kompletní sdílení kontextu, uvědomování si rozhodování o akcích a správa kontextového okna
  - **Soulad s MCP protokolem**: Jak design MCP řeší výzvy inženýrství kontextu
    - Omezení velikosti kontextového okna a strategie postupného načítání
    - Určení relevance a dynamický dotaz kontextu
    - Zpracování multimodálního kontextu a bezpečnostní aspekty
  - **Přístupy k implementaci**: Jednovláknové versus multi-agentní architektury
    - Techniky dělení a priorizace kontextových částí
    - Postupné načítání a kompresní strategie kontextu
    - Vícevrstvé přístupy ke kontextu a optimalizace dotazování
  - **Měřicí rámec**: Vznikající metriky pro hodnocení efektivity kontextu
    - Efektivita vstupu, výkon, kvalita a uživatelská zkušenost
    - Experimentální přístupy k optimalizaci kontextu
    - Analýza chyb a metodologie zlepšování

#### Aktualizace navigace kurikula (README.md)
- **Vylepšená struktura modulu**: Aktualizace tabulky kurikula o nová pokročilá témata
  - Přidání položek Context Engineering (5.14) a Custom Transport (5.15)
  - Konzistentní formátování a navigační odkazy ve všech modulech
  - Aktualizované popisy reflektující aktuální rozsah obsahu

### Vylepšení struktury adresářů
- **Standardizace názvů**: Přejmenování „mcp transport“ na „mcp-transport“ pro konzistenci s ostatními složkami pokročilých témat
- **Organizace obsahu**: Všechny složky 05-AdvancedTopics nyní používají konzistentní vzor pojmenování (mcp-[téma])

### Vylepšení kvality dokumentace
- **Soulad se specifikací MCP**: Veškerý nový obsah odkazuje na MCP Specification 2025-06-18
- **Příklady v několika jazycích**: Komplexní ukázky kódu v C#, TypeScript a Python
- **Podnikové zaměření**: Produkčně připravené vzory a integrace s Azure cloudem
- **Vizualizace dokumentace**: Mermaid diagramy pro vizualizaci architektury a toků

## 18. srpna 2025

### Komplexní aktualizace dokumentace – Standardy MCP 2025-06-18

#### Nejlepší praktiky bezpečnosti MCP (02-Security/) – Kompletní modernizace
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kompletní přepsání v souladu se specifikací MCP 2025-06-18
  - **Povinné požadavky**: Přidány explicitní požadavky MUST/MUST NOT oficiální specifikace s jasnými vizuálními indikátory
  - **12 základních bezpečnostních praktik**: Přestrukturováno z 15 položek na komplexní bezpečnostní domény
    - Bezpečnost tokenů a ověřování s integrací externího poskytovatele identity
    - Správa relací a bezpečnost transportu s kryptografickými požadavky
    - Ochrana specifická pro AI s integrací Microsoft Prompt Shields
    - Řízení přístupu a oprávnění s principem nejmenších práv
    - Bezpečnost obsahu a monitoring s integrací Azure Content Safety
    - Bezpečnost dodavatelského řetězce s komplexní verifikací komponent
    - Bezpečnost OAuth a prevence „Confused Deputy“ s implementací PKCE
    - Reakce na incidenty a obnova s automatizovanými schopnostmi
    - Soulad a governance s regulativními požadavky
    - Pokročilé bezpečnostní kontroly s architekturou zero trust
    - Integrace Microsoft bezpečnostního ekosystému s komplexními řešeními
    - Kontinuální vývoj bezpečnosti s adaptivními postupy
  - **Microsoft bezpečnostní řešení**: Vylepšené návody na integraci Prompt Shields, Azure Content Safety, Entra ID a GitHub Advanced Security
  - **Implementační zdroje**: Kategorizované odkazy dle oficiální dokumentace MCP, bezpečnostních řešení Microsoftu, bezpečnostních standardů a průvodců implementací

#### Pokročilé bezpečnostní kontroly (02-Security/) – Podniková implementace
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletní revize s podnikovým bezpečnostním rámcem
  - **9 komplexních bezpečnostních domén**: Rozšířeno z základních kontrol na detailní podnikový rámec
    - Pokročilé ověřování a autorizace s integrací Microsoft Entra ID
    - Bezpečnost tokenů a proti-přesměrovací kontroly s komplexní validací
    - Kontroly bezpečnosti relací s prevencí únosu relace
    - AI-specifické bezpečnostní kontroly s prevencí injekcí do promptů a otravy nástrojů
    - Prevence útoku „Confused Deputy“ s OAuth proxy bezpečností
    - Bezpečnost spuštění nástrojů s sandboxingem a izolací
    - Kontroly bezpečnosti dodavatelského řetězce s ověřováním závislostí
    - Monitoring a detekce s integrací SIEM
    - Reakce na incidenty a obnova s automatizovanými postupy
  - **Implementační příklady**: Přidány detailní YAML konfigurační bloky a ukázky kódu
  - **Integrace Microsoft řešení**: Kompletní pokrytí Azure bezpečnostních služeb, GitHub Advanced Security a podnikové správy identity

#### Bezpečnost pokročilých témat (05-AdvancedTopics/mcp-security/) – Produkčně připravená implementace
- **README.md**: Kompletní přepis pro podnikovou bezpečnostní implementaci
  - **Soulad s aktuální specifikací**: Aktualizace dle MCP Specification 2025-06-18 s povinnými bezpečnostními požadavky
  - **Vylepšené ověřování**: Integrace Microsoft Entra ID s komplexními příklady v .NET a Java Spring Security
  - **Integrace AI bezpečnosti**: Implementace Microsoft Prompt Shields a Azure Content Safety s detailními příklady v Pythonu
  - **Pokročilá mitigace hrozeb**: Kompletní příklady implementace pro
    - Prevence útoku „Confused Deputy“ s PKCE a validací uživatelského souhlasu
    - Prevence přesměrování tokenů s validací audience a bezpečným řízením tokenů
    - Prevence únosu relace s kryptografickým vázáním a behaviorální analýzou
  - **Podniková bezpečnostní integrace**: Monitoring Azure Application Insights, pipeline pro detekci hrozeb a bezpečnost dodavatelského řetězce
  - **Kontrolní seznam implementace**: Jasně definované povinné versus doporučené bezpečnostní kontroly s výhodami Microsoft bezpečnostního ekosystému

### Kvalita dokumentace a sladění se standardy
- **Odkazy na specifikace**: Aktualizovány všechny odkazy na aktuální specifikaci MCP 2025-06-18  
- **Ekosystém zabezpečení Microsoft**: Rozšířené návody k integraci ve všech dokumentech o zabezpečení  
- **Praktická implementace**: Přidány podrobné ukázky kódu v .NET, Javě a Pythonu s podnikatelskými vzory  
- **Organizace zdrojů**: Komplexní kategorizace oficiální dokumentace, bezpečnostních standardů a implementačních průvodců  
- **Vizuální indikátory**: Jasné označení povinných požadavků vs. doporučených postupů  


#### Základní koncepty (01-CoreConcepts/) - Kompletní modernizace  
- **Aktualizace verze protokolu**: Aktualizace na aktuální specifikaci MCP 2025-06-18 s verzováním na základě data (formát RRRR-MM-DD)  
- **Upřesnění architektury**: Vylepšené popisy Hostitelů, Klientů a Serverů reflektující aktuální architektonické vzory MCP  
  - Hostitelé nyní jasně definováni jako AI aplikace koordinující více klientských připojení MCP  
  - Klienti popsáni jako protokoloví konektory udržující vztah jeden na jednoho se serverem  
  - Servery rozšířeny o scénáře lokální a vzdálené implementace  
- **Přepracování primitiv**: Kompletní předělání primitiv serveru a klienta  
  - Primitiva serveru: Zdrojové prostředky (datové zdroje), Výzvy (šablony), Nástroje (vykonatelné funkce) s podrobnými vysvětleními a příklady  
  - Primitiva klienta: Vzorkování (doplnění LLM), Dotazování (uživatelský vstup), Logování (debugging/monitorování)  
  - Aktualizováno podle současných vzorů metod pro objevování (`*/list`), získávání (`*/get`) a vykonávání (`*/call`)  
- **Architektura protokolu**: Zaveden dvouvrstvý model architektury  
  - Vrstva dat: Základ na JSON-RPC 2.0 s řízením životního cyklu a primitivy  
  - Transportní vrstva: STDIO (lokální) a streamovatelný HTTP s SSE (vzdálený) přenosová mechanismy  
- **Bezpečnostní rámec**: Komplexní bezpečnostní principy zahrnující explicitní souhlas uživatele, ochranu soukromí dat, bezpečnost vykonávání nástrojů a zabezpečení transportní vrstvy  
- **Komunikační vzory**: Aktualizované protokolové zprávy zobrazuje inicializační, objevovací, vykonávací a notifikační toky  
- **Příklady kódu**: Aktualizované vícejazyčné příklady (.NET, Java, Python, JavaScript) reflektující aktuální vzory MCP SDK  

#### Zabezpečení (02-Security/) - Komplexní revize zabezpečení  
- **Soulad se standardy**: Plná shoda s bezpečnostními požadavky specifikace MCP 2025-06-18  
- **Vývoj autentizace**: Dokumentován vývoj od vlastních OAuth serverů k delegaci na externí poskytovatele identity (Microsoft Entra ID)  
- **Analýza hrozeb pro AI**: Rozšířený popis moderních útoků v oblasti AI  
  - Detailní scénáře útoků na injektáž promptů s reálnými příklady  
  - Mechanismy otravy nástrojů a vzory útoků "rug pull"  
  - Otrava kontextového okna a útoky na zmatení modelu  
- **Bezpečnostní řešení Microsoft AI**: Komplexní pokrytí ekosystému zabezpečení Microsoft  
  - AI Prompt Shields s pokročilou detekcí, zdůrazňováním a technikami oddělovačů  
  - Vzory integrace Azure Content Safety  
  - GitHub Advanced Security pro ochranu dodavatelského řetězce  
- **Pokročilá mitigace hrozeb**: Podrobné bezpečnostní kontroly pro  
  - Únos relace s MCP-specifickými scénáři útoků a požadavky na kryptografické ID relace  
  - Problémy zmatku zástupce v MCP proxy scénářích s explicitními požadavky na souhlas  
  - Zranitelnosti průchodu tokenů s povinnými validačními kontrolami  
- **Zabezpečení dodavatelského řetězce**: Rozšířený popis AI dodavatelského řetězce zahrnující základy modelů, embeddingové služby, poskytovatele kontextu a API třetích stran  
- **Základní zabezpečení**: Vylepšená integrace s podnikatelskými bezpečnostními vzory včetně architektury „zero trust“ a ekosystému zabezpečení Microsoft  
- **Organizace zdrojů**: Kategorizované komplexní zdrojové odkazy podle typu (Oficiální dokumentace, Standardy, Výzkum, Microsoft řešení, Implementační průvodce)  

### Vylepšení kvality dokumentace  
- **Strukturované cíle učení**: Vylepšené učební cíle s konkrétními, akčními výsledky  
- **Křížové odkazy**: Přidány odkazy mezi příbuznými tématy bezpečnosti a základními koncepty  
- **Aktuální informace**: Všechny datové odkazy a odkazy na specifikace aktualizovány na aktuální standardy  
- **Pokyny k implementaci**: Přidány konkrétní, akční implementační návody v obou sekcích  

## 16. července 2025  

### Vylepšení README a navigace  
- Kompletně přepracovaná navigace kurikula v README.md  
- Nahrazení značek `<details>` přístupnějším formátem založeným na tabulkách  
- Vytvořeny alternativní možnosti rozvržení v nové složce "alternative_layouts"  
- Přidány příklady navigace v kartách, záložkovém stylu a stylu akordeonu  
- Aktualizována sekce struktury repozitáře zahrnující všechny nejnovější soubory  
- Vylepšena sekce „Jak používat toto kurikulum“ s jasnými doporučeními  
- Aktualizovány odkazy na specifikaci MCP na správné URL  
- Přidána sekce Context Engineering (5.14) do struktury kurikula  

### Aktualizace studijní příručky  
- Kompletně revidovaná studijní příručka v souladu s aktuální strukturou repozitáře  
- Přidány nové sekce pro MCP klienty a nástroje a populární MCP servery  
- Aktualizována vizuální mapa kurikula tak, aby přesně odrážela všechna témata  
- Vylepšené popisy pokročilých témat pokrývající všechna specializovaná pole  
- Aktualizována sekce případových studií s reálnými příklady  
- Přidán tento komplexní changelog  

### Příspěvky komunity (06-CommunityContributions/)  
- Přidány podrobné informace o MCP serverech pro generování obrázků  
- Přidána komplexní sekce ohledně použití Claude ve VSCode  
- Přidány pokyny k nastavení a používání terminálového klienta Cline  
- Aktualizována sekce MCP klientů zahrnující všechny populární klienty  
- Rozšířeny příklady příspěvků o přesnější vzorky kódu  

### Pokročilá témata (05-AdvancedTopics/)  
- Organizovány všechny specializované složky témat s konzistentním pojmenováním  
- Přidány materiály a příklady k inženýrství kontextu  
- Přidána dokumentace k integraci agenta Foundry  
- Vylepšena dokumentace integrace zabezpečení Entra ID  

## 11. června 2025  

### První vytvoření  
- Vydána první verze kurikula MCP pro začátečníky  
- Vytvořena základní struktura všech 10 hlavních sekcí  
- Implementována vizuální mapa kurikula pro navigaci  
- Přidány počáteční ukázkové projekty ve více programovacích jazycích  

### Začínáme (03-GettingStarted/)  
- Vytvořeny první příklady implementace serveru  
- Přidány návody k vývoji klienta  
- Začleněny instrukce pro integraci LLM klienta  
- Přidána dokumentace integrace VS Code  
- Implementovány příklady serveru s Server-Sent Events (SSE)  

### Základní koncepty (01-CoreConcepts/)  
- Přidáno detailní vysvětlení klient-server architektury  
- Vytvořena dokumentace klíčových komponent protokolu  
- Zdokumentovány vzory zasílání zpráv v MCP  

## 23. května 2025  

### Struktura repozitáře  
- Inicializován repozitář se základní strukturou složek  
- Vytvořeny README soubory pro každou hlavní sekci  
- Nastavena infrastruktura pro překlady  
- Přidány obrazové zdroje a diagramy  

### Dokumentace  
- Vytvořeno úvodní README.md s přehledem kurikula  
- Přidány soubory CODE_OF_CONDUCT.md a SECURITY.md  
- Nastaven soubor SUPPORT.md s pokyny pro získání pomoci  
- Vytvořena předběžná struktura studijní příručky  

## 15. dubna 2025  

### Plánování a rámec  
- Úvodní plánování kurikula MCP pro začátečníky  
- Definovány učební cíle a cílové publikum  
- Nastíněna struktura kurikula rozdělená do 10 sekcí  
- Vyvinut konceptuální rámec pro příklady a případové studie  
- Vytvořeny počáteční prototypové příklady pro klíčové koncepty

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->