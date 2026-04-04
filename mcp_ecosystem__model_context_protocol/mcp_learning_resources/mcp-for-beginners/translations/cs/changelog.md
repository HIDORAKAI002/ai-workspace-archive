# Změnový protokol: MCP pro Začátečníky Kurz

Tento dokument slouží jako záznam všech významných změn provedených v kurzu Model Context Protocol (MCP) pro Začátečníky. Změny jsou zaznamenány v obráceném chronologickém pořadí (nejnovější změny první).

## 5. února 2026

### Vylepšení ověřování a navigace v celém repozitáři

#### Přidán nový obsah kurzu

**Modul 03 - Začínáme**
- **12-mcp-hosts/README.md**: Nový komplexní průvodce nastavením MCP hostitelů
  - Příklady konfigurací Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Šablony konfigurace JSON pro všechny hlavní hostitele
  - Tabulka porovnání typů transportů (stdio, SSE/HTTP, WebSocket)
  - Řešení běžných problémů s připojením
  - Bezpečnostní nejlepší postupy pro konfiguraci hostitele

- **13-mcp-inspector/README.md**: Nový průvodce laděním MCP Inspectoru
  - Metody instalace (npx, npm globálně, ze zdroje)
  - Připojení k serverům přes stdio a HTTP/SSE
  - Nástroje pro testování, zdroje a pracovní postupy s prompty
  - Integrace VS Code s MCP Inspectorem
  - Běžné scénáře ladění s řešeními

**Modul 04 - Praktická Implementace**
- **pagination/README.md**: Nový průvodce implementací stránkování
  - Vzorové stránkování založené na kurzoru v Pythonu, TypeScriptu, Javě
  - Zpracování stránkování na klientské straně
  - Strategie návrhu kurzoru (neprůhledný vs. strukturovaný)
  - Doporučení pro optimalizaci výkonu

**Modul 05 - Pokročilá Témata**
- **mcp-protocol-features/README.md**: Nový podrobný přehled funkcí protokolu
  - Implementace notifikací postupu
  - Vzory pro zrušení požadavků
  - Šablony zdrojů s URI vzory
  - Řízení životního cyklu serveru
  - Kontrola úrovní protokolování
  - Vzory pro zpracování chyb s JSON-RPC kódy

#### Opravy navigace (aktualizováno více než 24 souborů)

**Hlavní moduly README**
 Nyní odkazují jak na první lekci, tak na další modul

**Podadresáře 02-Security**
- Všech 5 doplňkových bezpečnostních dokumentů nyní obsahuje navigaci "Co dál"

**Soubory 09-CaseStudy**
- Všechny případové studie nyní mají sekvenční navigaci

**10-StreamliningAI Labs**
Přidána sekce Co dál na přehled Modulu 10 a Modul 11

#### Opravy kódu a obsahu

**Aktualizace SDK a závislostí**
Opravená prázdná verze openai na `^4.95.0`
Aktualizováno SDK z `^1.8.0` na `>=1.26.0`
Aktualizovány verze mcp na `>=1.26.0`

**Opravy kódu**
Opraven neplatný model `gpt-4o-mini` na `gpt-4.1-mini`

**Opravy obsahu**
Opraven nefunkční odkaz `READMEmd` → `README.md`, opraven nadpis kurzu `Module 1-3` → `Module 0-3`, opraven citlivý na velikost písmen v cestě
Odstraněn poškozený duplicitní obsah Case Study 5

**Vylepšení pro začátečníky**
Přidán správný úvod, učební cíle a předpoklady pro začátečníky

#### Aktualizace kurikula

**Hlavní README.md**
- Přidány položky 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) do tabulky kurikula

**README modulů**
Přidány lekce 12 a 13 do seznamu lekcí
Přidána sekce Praktické průvodce s odkazem na stránkování
Přidány lekce 5.15 (Custom Transport) a 5.16 (Protocol Features)

**study_guide.md**
- Aktualizovaná myšlenková mapa se všemi novými tématy: Nastavení MCP Hosts, MCP Inspector, Strategie stránkování, Detailní přehled funkcí protokolu

## 28. ledna 2026

### Kontrola souladu se specifikací MCP 2025-11-25

#### Vylepšení základních konceptů (01-CoreConcepts/)
- **Nový klientský primitiv - Roots**: Přidána komplexní dokumentace o klientském primitivu Roots, který umožňuje serverům pochopit hranice souborového systému a přístupová oprávnění
- **Anotace nástrojů**: Přidána dokumentace k behaviorálním anotacím nástrojů (`readOnlyHint`, `destructiveHint`) pro lepší rozhodování o provádění nástrojů
- **Volání nástrojů při Sampling**: Aktualizována dokumentace Sampling o parametry `tools` a `toolChoice` pro volání nástrojů řízené modelem během samplingových požadavků
- **URL Mode Elicitation**: Přidána dokumentace k elicitačnímu režimu založenému na URL pro externí webové interakce zahájené serverem
- **Úkoly (experimentální)**: Přidána nová sekce dokumentující experimentální funkci Úkoly pro trvale udržitelné exekuční obaly a odložené získávání výsledků
- **Podpora ikon**: Uvedeno, že nástroje, zdroje, šablony a promptové vzory nyní mohou zahrnovat ikony jako další metadata

#### Aktualizace dokumentace
- **README.md**: Přidána reference na verzi specifikace MCP 2025-11-25 a vysvětlení verzování podle data
- **study_guide.md**: Aktualizována mapa kurikula, aby zahrnovala Úkoly a Anotace nástrojů v sekci Základní Koncepty; aktualizováno časové razítko dokumentu

#### Ověření souladu se specifikací
- **Verze protokolu**: Ověřeno, že veškerá dokumentace odkazuje na aktuální specifikaci MCP 2025-11-25
- **Soulad architektury**: Potvrzena správnost dokumentace dvouvrstvé architektury (Datová vrstva + Transportní vrstva)
- **Dokumentace primitiv**: Validovány serverové primitivy (Zdroje, Prompty, Nástroje) a klientské primitivy (Sampling, Elicitation, Logging, Roots)
- **Transportní mechanismy**: Ověřena správnost dokumentace transportů STDIO a Streamable HTTP
- **Bezpečnostní směrnice**: Potvrzen soulad s aktuální dokumentací bezpečnostních nejlepších praktik MCP

#### Hlavní funkce MCP 2025-11-25 zdokumentované
- **OpenID Connect Discovery**: Objevování autentizačního serveru přes OIDC
- **OAuth Client ID Metadata dokumenty**: Doporučený mechanismus registrace klienta
- **JSON Schema 2020-12**: Výchozí dialekt pro definice schema MCP
- **SDK Tiering systém**: Formalizované požadavky na podporu funkcí SDK a údržbu
- **Struktura řízení**: Formalizované pracovní skupiny a zájmové skupiny v řízení MCP

### Hlavní aktualizace bezpečnostní dokumentace (02-Security/)

#### Integrace MCP Security Summit Workshop (Sherpa)
- **Nový praktický tréninkový zdroj**: Přidána komplexní integrace s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ve všech bezpečnostních dokumentech
- **Pokrytí trasy expedice**: Zdokumentován kompletní postup od základního tábora po vrchol Summit
- **Soulad s OWASP**: Veškeré bezpečnostní pokyny nyní mapovány na rizika ze zprávy OWASP MCP Azure Security Guide

#### Integrace OWASP MCP Top 10
- **Nová sekce**: Přidána tabulka top 10 bezpečnostních rizik OWASP MCP s mitigacemi Azure do hlavního bezpečnostního README
- **Dokumentace založená na rizicích**: Aktualizován mcp-security-controls-2025.md se vztahem k OWASP MCP rizikům pro každou bezpečnostní doménu
- **Referenční architektura**: Odkazováno na referenční architekturu a implementační vzory OWASP MCP Azure Security Guide

#### Aktualizované bezpečnostní soubory
- **README.md**: Přidán přehled Sherpa Workshop, tabulka trasy expedice, shrnutí OWASP MCP Top 10 rizik a sekce praktického výcviku
- **mcp-security-controls-2025.md**: Aktualizován hlavičkový údaj na únor 2026, přidány reference OWASP rizik (MCP01-MCP08), opraveno nejednotné číslo verze specifikace
- **mcp-security-best-practices-2025.md**: Přidána sekce zdrojů Sherpa a OWASP, aktualizováno časové razítko
- **mcp-best-practices.md**: Přidána sekce praktického tréninku s odkazy na Sherpa a OWASP
- **azure-content-safety-implementation.md**: Přidána reference na OWASP MCP06, sladění s Sherpa Camp 3 a sekce doplňkových zdrojů

#### Přidány nové odkazy na zdroje
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuální stránky OWASP MCP rizik (MCP01-MCP10)

### Soulad kurikula se specifikací MCP 2025-11-25

#### Modul 03 - Začínáme
- **Dokumentace SDK**: Přidán Go SDK do oficiálního seznamu SDK; aktualizovány všechny odkazy na SDK v souladu se specifikací MCP 2025-11-25
- **Upřesnění transportu**: Aktualizovány popisy STDIO a HTTP Streaming transportů s explicitními odkazy na specifikaci

#### Modul 04 - Praktická implementace
- **Aktualizace SDK**: Přidán Go SDK; aktualizován seznam SDK s odkazem na verzi specifikace
- **Specifikace autorizace**: Aktualizován odkaz na specifikaci autorizace MCP na aktuální verzi 2025-11-25

#### Modul 05 - Pokročilá témata
- **Nové funkce**: Přidána poznámka o nových funkcích MCP Specification 2025-11-25 (Úkoly, Anotace nástrojů, URL Mode Elicitation, Roots)
- **Bezpečnostní zdroje**: Přidány odkazy na OWASP MCP Top 10 a Sherpa workshop do doplňkových zdrojů

#### Modul 06 - Přispění komunity
- **Seznam SDK**: Přidán Swift a Rust SDK; aktualizován odkaz na specifikaci na 2025-11-25
- **Reference na specifikaci**: Aktualizován odkaz na přímé URL specifikace MCP

#### Modul 07 - Lekce z rané adopce
- **Aktualizace zdrojů**: Přidán odkaz na MCP Specification 2025-11-25 a OWASP MCP Top 10 do doplňkových zdrojů

#### Modul 08 - Nejlepší postupy
- **Verze specifikace**: Aktualizován odkaz na specifikaci MCP na 2025-11-25
- **Bezpečnostní zdroje**: Přidány OWASP MCP Top 10 a Sherpa workshop do doplňkových zdrojů

#### Modul 10 - Zefektivnění AI pracovních toků
- **Aktualizace odznaku**: Změněna verze MCP odznaku z verze SDK (1.9.3) na verzi specifikace (2025-11-25)
- **Odkazy na zdroje**: Aktualizován odkaz na MCP Specification; přidán OWASP MCP Top 10

#### Modul 11 - Praktické laboratoře MCP Serveru
- **Odkaz na specifikaci**: Aktualizován odkaz MCP Specification na verzi 2025-11-25
- **Bezpečnostní zdroje**: Přidán OWASP MCP Top 10 do oficiálních zdrojů

## 18. prosince 2025

### Aktualizace bezpečnostní dokumentace - MCP Specification 2025-11-25

#### MCP bezpečnostní nejlepší postupy (02-Security/mcp-best-practices.md) - aktualizace verze specifikace
- **Aktualizace verze protokolu**: Aktualizováno na referenci nejnovější verze MCP Specification 2025-11-25 (vydáno 25. listopadu 2025)
  - Aktualizovány všechny zmínky o verzi specifikace z 2025-06-18 na 2025-11-25
  - Datum dokumentu aktualizováno z 18. srpna 2025 na 18. prosince 2025
  - Ověřeno, že všechny URL na specifikace vedou na aktuální dokumentaci
- **Validace obsahu**: Komplexní ověření bezpečnostních nejlepších postupů vůči aktuálním standardům
  - **Microsoft Security řešení**: Ověřena aktuálnost terminologie a odkazů pro Prompt Shields (dříve "detekce jailbreak rizika"), Azure Content Safety, Microsoft Entra ID a Azure Key Vault
  - **OAuth 2.1 bezpečnost**: Potvrzen soulad s nejnovějšími bezpečnostními postupy OAuth
  - **OWASP standardy**: Validace OWASP Top 10 pro LLMs zůstává aktuální
  - **Azure služby**: Kontrola všech odkazů a nejlepších praktik Microsoft Azure
- **Srovnání se standardy**: Potvrzeno, že všechny odkazované bezpečnostní standardy jsou aktuální
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure bezpečnostní a compliance rámce
- **Dostupné implementační zdroje**: Ověřeny všechny odkazy na průvodce implementací a zdroje
  - Autentizační vzory Azure API Management
  - Průvodce integrací Microsoft Entra ID
  - Správa tajemství Azure Key Vault
  - DevSecOps pipelines a monitorovací řešení

### Zajištění kvality dokumentace
- **Soulad se specifikací**: Ověřeno, že všechny povinné bezpečnostní požadavky MCP (MUST/MUST NOT) odpovídají nejnovější specifikaci
- **Aktualizace zdrojů**: Ověřeno, že všechny externí odkazy na Microsoft dokumentaci, bezpečnostní standardy a průvodce implementací jsou aktuální
- **Pokrytí nejlepších postupů**: Potvrzeno komplexní zahrnutí autentizace, autorizace, AI-specifických hrozeb, bezpečnosti dodavatelského řetězce a podnikových vzorů

## 6. října 2025

### Rozšíření sekce Začínáme – Pokročilé využití serveru a jednoduchá autentizace

#### Pokročilé využití serveru (03-GettingStarted/10-advanced)
- **Přidána nová kapitola**: Představena komplexní příručka pokročilého využití MCP serveru, zahrnující jak běžnou, tak nízkoúrovňovou serverovou architekturu
  - **Běžný vs. nízkoúrovňový server**: Podrobná komparace a ukázky kódu v Pythonu a TypeScriptu pro oba přístupy
  - **Design založený na handlerech**: Vysvětlení řízení nástrojů/zdrojů/promptů pomocí handlerů pro škálovatelné a flexibilní implementace serveru
  - **Praktické vzory**: Reálné scénáře, kde jsou nízkoúrovňové serverové vzory přínosné pro pokročilé funkce a architekturu

#### Jednoduchá autentizace (03-GettingStarted/11-simple-auth)
- **Přidána nová kapitola**: Krok za krokem průvodce implementací jednoduché autentizace v MCP serverech
  - **Koncepty autentizace**: Jasné vysvětlení rozdílu mezi autentizací a autorizací a zpracováním přihlašovacích údajů
  - **Implementace základní autentizace**: Vzory autentizace pomocí middleware v Pythonu (Starlette) a TypeScriptu (Express), s ukázkami kódu
  - **Postup k pokročilé bezpečnosti**: Návod, jak začít s jednoduchou autentizací a posunout se k OAuth 2.1 a RBAC s odkazy na pokročilé bezpečnostní moduly

Tyto dodatky poskytují praktické, interaktivní návody pro vytváření robustnějších, bezpečnějších a flexibilnějších implementací MCP serverů a propojují základní koncepty s pokročilými produkčními vzory.

## 29. září 2025

### Laboratoře integrace databáze MCP Serveru – Komplexní praktická výuka

#### 11-MCPServerHandsOnLabs – Nový kompletní kurz integrace databází
- **Kompletní 13-laboratorní učební cesta**: Přidán komplexní praktický učební plán pro vytvoření produkčně připravených MCP serverů s integrací databáze PostgreSQL  
  - **Reálná implementace**: Případová studie Zava Retail analytics demonstrující podnikové vzory  
  - **Strukturovaný postup učení**:  
    - **Laboratoře 00-03: Základy** - Úvod, Základní architektura, Bezpečnost a víceuživatelskost, Nastavení prostředí  
    - **Laboratoře 04-06: Tvorba MCP serveru** - Návrh databáze a schéma, Implementace MCP serveru, Vývoj nástrojů  
    - **Laboratoře 07-09: Pokročilé funkce** - Integrace sémantického vyhledávání, Testování a ladění, Integrace s VS Code  
    - **Laboratoře 10-12: Produkce a nejlepší postupy** - Strategie nasazení, Monitorování a observabilita, Nejlepší postupy a optimalizace  
  - **Podnikové technologie**: Rámec FastMCP, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights  
  - **Pokročilé funkce**: Řízení přístupu na úrovni řádků (RLS), sémantické vyhledávání, multi-tenant datový přístup, vektorové embeddingy, monitorování v reálném čase  

#### Standardizace terminologie – konverze modulu na laboratoř  
- **Komplexní aktualizace dokumentace**: Systematická aktualizace všech README souborů v 11-MCPServerHandsOnLabs s použitím terminologie „laboratoř“ místo „modul“  
  - **Nadpisy sekcí**: Aktualizace „Co tento modul pokrývá“ na „Co tato laboratoř pokrývá“ ve všech 13 laboratořích  
  - **Popis obsahu**: Změna „Tento modul poskytuje...“ na „Tato laboratoř poskytuje...“ v celé dokumentaci  
  - **Cíle učení**: Aktualizace „Na konci tohoto modulu...“ na „Na konci této laboratoře...“  
  - **Navigační odkazy**: Převod všech odkazů „Modul XX:“ na „Laboratoř XX:“ v křížových odkazech a navigaci  
  - **Sledování dokončení**: Aktualizace „Po dokončení tohoto modulu...“ na „Po dokončení této laboratoře...“  
  - **Zachování technických odkazů**: Zachování odkazů na Python moduly v konfiguračních souborech (např. `"module": "mcp_server.main"`)  

#### Vylepšení studijní příručky (study_guide.md)  
- **Vizualizace struktury kurikula**: Přidána nová sekce „11. Laboratoře integrace databáze“ s komplexní vizualizací struktury laboratoří  
- **Struktura repozitáře**: Aktualizováno ze 10 na 11 hlavních sekcí s podrobným popisem 11-MCPServerHandsOnLabs  
- **Instrukce pro studijní cestu**: Rozšířené navigační pokyny pokrývající sekce 00-11  
- **Pokrytí technologií**: Přidány podrobnosti o integraci FastMCP, PostgreSQL a Azure služeb  
- **Výsledky učení**: Zdůraznění vývoje produkčně připravených serverů, vzorů integrace databáze a podnikové bezpečnosti  

#### Vylepšení hlavní struktury README  
- **Terminologie založená na laboratořích**: Aktualizace hlavního README.md v 11-MCPServerHandsOnLabs s konzistentním použitím struktury „laboratoř“  
- **Organizace studijní cesty**: Jasný postup od základů přes pokročilou implementaci až po nasazení do produkce  
- **Zaměření na praxi**: Důraz na praktické, hands-on učení s podnikově vyspělými vzory a technologiemi  

### Zlepšení kvality a konzistence dokumentace  
- **Důraz na praktické učení**: Posílení praktického, laboratorního přístupu v celé dokumentaci  
- **Zaměření na podnikové vzory**: Zvýraznění produkčně připravených implementací a podnikových bezpečnostních aspektů  
- **Integrace technologií**: Komplexní pokrytí moderních služeb Azure a vzorů integrace AI  
- **Postup učení**: Jasná, strukturovaná cesta od základních konceptů k produkčnímu nasazení  

## 26. září 2025

### Vylepšení případových studií – integrace GitHub MCP Registry  

#### Případové studie (09-CaseStudy/) – Zaměření na vývoj ekosystému  
- **README.md**: Rozsáhlé rozšíření s komplexní případovou studií GitHub MCP Registry  
  - **Případová studie GitHub MCP Registry**: Nová detailní případová studie zkoumající spuštění registru GitHub MCP v září 2025  
    - **Analýza problému**: Detailní rozbor fragmentovaného vyhledávání a nasazení MCP serverů  
    - **Architektura řešení**: Centralizovaný přístup k registru s jedním kliknutím pro instalaci ve VS Code  
    - **Obchodní dopad**: Měřitelné zlepšení onboardingu vývojářů a produktivity  
    - **Strategická hodnota**: Zaměření na modulární nasazování agentů a interoperabilitu mezi nástroji  
    - **Vývoj ekosystému**: Pozice jako základní platforma pro agentní integraci  
  - **Vylepšená struktura případových studií**: Aktualizace všech sedmi případových studií s jednotným formátováním a podrobnými popisy  
    - Azure AI Travel Agents: zdůraznění multi-agentní orchestraci  
    - Azure DevOps Integration: zaměření na automatizaci pracovních toků  
    - Real-Time Documentation Retrieval: implementace Python konzolového klienta  
    - Interactive Study Plan Generator: webová aplikace Chainlit pro konverzační plánování  
    - In-Editor Documentation: integrace s VS Code a GitHub Copilot  
    - Azure API Management: podnikové vzory integrace API  
    - GitHub MCP Registry: vývoj ekosystému a platforma pro komunitu  
  - **Komplexní závěr**: Přepsaná závěrečná část zdůrazňující sedm případových studií pokrývajících více rozměrů implementace MCP  
    - Podniková integrace, multi-agentní orchestraci, produktivitu vývojářů  
    - Vývoj ekosystému, vzdělávací aplikace s kategorizací  
    - Vylepšené pohledy na architektonické vzory, implementační strategie a nejlepší postupy  
    - Důraz na MCP jako zralý, produkčně připravený protokol  

#### Aktualizace studijní příručky (study_guide.md)  
- **Vizualizace struktury kurikula**: Aktualizace myšlenkové mapy o GitHub MCP Registry v sekci případových studií  
- **Popis případových studií**: Rozšíření z obecných popisů na detailní rozbor sedmi komplexních případových studií  
- **Struktura repozitáře**: Aktualizace sekce 10 na komplexní pokrytí případových studií s konkrétními detaily implementací  
- **Integrace changelogu**: Přidán záznam k 26. září 2025 dokumentující přidání GitHub MCP Registry a zlepšení případových studií  
- **Aktualizace datumu**: Aktualizace časové známky v patičce na nejnovější revizi (26. září 2025)  

### Zlepšení kvality dokumentace  
- **Zvýšení konzistence**: Standardizace formátování a struktury případových studií ve všech sedmi příkladech  
- **Komplexní pokrytí**: Případové studie nyní pokrývají scénáře pro podnik, produktivitu vývojáře a vývoj ekosystému  
- **Strategické postavení**: Zvýraznění MCP jako základní platformy pro nasazení agentních systémů  
- **Integrace zdrojů**: Aktualizace doplňkových zdrojů o odkaz na GitHub MCP Registry  

## 15. září 2025

### Rozšíření pokročilých témat – vlastní transporty a engineering kontextu  

#### Vlastní MCP transporty (05-AdvancedTopics/mcp-transport/) – Nový průvodce pokročilou implementací  
- **README.md**: Kompletní průvodce implementací vlastních MCP transportních mechanismů  
  - **Azure Event Grid transport**: Komplexní bezserverová event-driven transportní implementace  
    - Příklady v C#, TypeScript a Python s integrací Azure Functions  
    - Event-driven architektonické vzory pro škálovatelné MCP řešení  
    - Příjemci webhooků a push-based zpracování zpráv  
  - **Azure Event Hubs transport**: Implementace transportu s vysokou propustností  
    - Možnosti streamingu v reálném čase pro scénáře s nízkou latencí  
    - Strategie partitioningu a správa checkpointů  
    - Batching zpráv a optimalizace výkonu  
  - **Podnikové integrační vzory**: Produkčně připravené architektonické příklady  
    - Distribuované MCP zpracování přes více Azure Functions  
    - Hybridní transportní architektury kombinující různé typy transportů  
    - Strategie pro trvanlivost, spolehlivost a zpracování chyb  
  - **Bezpečnost a monitorování**: Integrace Azure Key Vault a vzory observability  
    - Autentizace s Managed Identity a princip nejmenších práv  
    - Telemetrie Application Insights a monitorování výkonu  
    - Obvody přerušení a vzory odolnosti vůči chybám  
  - **Testovací frameworky**: Komplexní strategie testování vlastních transportů  
    - Jednotkové testování s testovacími dubléry a frameworky pro mocking  
    - Integrační testování s Azure Test Containers  
    - Úvahy o výkonovém a zatěžovacím testování  

#### Engineering kontextu (05-AdvancedTopics/mcp-contextengineering/) – Nově vznikající disciplína AI  
- **README.md**: Komplexní průzkum engineeringu kontextu jako nově se rozvíjející oblasti  
  - **Základní principy**: Kompletní sdílení kontextu, uvědomění rozhodnutí o akcích a správa kontextowego okna  
  - **Soulad s protokolem MCP**: Jak design MCP řeší výzvy engineeringu kontextu  
    - Omezení velikosti kontextového okna a strategie postupného načítání  
    - Určování relevance a dynamické získávání kontextu  
    - Více-modální zpracování kontextu a bezpečnostní aspekty  
  - **Přístupy implementace**: Jednovláknové vs. multi-agentní architektury  
    - Techniky dělení kontextu a prioritizace  
    - Postupné načítání kontextu a kompresní strategie  
    - Vrstvené přístupy ke kontextu a optimalizace získávání  
  - **Měřicí rámec**: Nově vznikající metriky pro hodnocení efektivity kontextu  
    - Efektivita vstupu, výkon, kvalita a uživatelská zkušenost  
    - Experimentální přístupy k optimalizaci kontextu  
    - Analýzy selhání a metodologie zlepšení  

#### Aktualizace navigace kurikula (README.md)  
- **Vylepšená struktura modulů**: Aktualizovaná tabulka kurikula zahrnující nová pokročilá témata  
  - Přidány položky Engineering kontextu (5.14) a Vlastní transport (5.15)  
  - Konzistentní formátování a navigační odkazy napříč všemi moduly  
  - Aktualizované popisy odrážející současný rozsah obsahu  

### Vylepšení struktury adresářů  
- **Standardizace pojmenování**: Přejmenování „mcp transport“ na „mcp-transport“ pro konzistenci s ostatními složkami pokročilých témat  
- **Organizace obsahu**: Všechny složky 05-AdvancedTopics nyní používají konzistentní pojmenování (mcp-[téma])  

### Zlepšení kvality dokumentace  
- **Soulad se specifikací MCP**: Veškerý nový obsah odkazuje na aktuální MCP Specification 2025-06-18  
- **Vícejazyčné příklady**: Komplexní kódové ukázky v C#, TypeScript a Python  
- **Zaměření na podniky**: Produkčně připravené vzory a integrace cloudových služeb Azure  
- **Vizualizace dokumentace**: Mermaid diagramy pro architekturu a vizualizaci toků  

## 18. srpna 2025

### Kompletní aktualizace dokumentace – standardy MCP 2025-06-18  

#### Nejlepší bezpečnostní postupy MCP (02-Security/) – Kompletní modernizace  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Úplné přepsání sladěné se specifikací MCP 2025-06-18  
  - **Povinné požadavky**: Přidány explicitní požadavky MUSÍ/NESMÍ podle oficiální specifikace s jasnými vizuálními indikátory  
  - **12 základních bezpečnostních praktík**: Přestrukturováno z 15 položek do komplexních bezpečnostních domén  
    - Bezpečnost tokenů a autentizace s integrací externího poskytovatele identity  
    - Správa relací a zabezpečení přenosu s kryptografickými požadavky  
    - Ochrana specifická pro AI s integrací Microsoft Prompt Shields  
    - Řízení přístupu a oprávnění podle principu nejmenších práv  
    - Bezpečnost obsahu a monitorování s Azure Content Safety  
    - Bezpečnost dodavatelského řetězce s komplexní verifikací komponent  
    - OAuth bezpečnost a prevence útoku zmateného zprostředkovatele s implementací PKCE  
    - Reakce na incidenty a obnova s automatizovanými schopnostmi  
    - Soulad a správa podle předpisů  
    - Pokročilé bezpečnostní kontroly se zero trust architekturou  
    - Integrace s Microsoft Security Ecosystem s komplexními řešeními  
    - Neustálý rozvoj bezpečnosti s adaptivními postupy  
  - **Microsoft bezpečnostní řešení**: Vylepšené pokyny k integraci Prompt Shields, Azure Content Safety, Entra ID a GitHub Advanced Security  
  - **Zdroje implementace**: Kategorizované odkazy na oficiální dokumentaci MCP, Microsoft bezpečnostní řešení, bezpečnostní standardy a průvodce implementací  

#### Pokročilé bezpečnostní kontroly (02-Security/) – Podniková implementace  
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletní revize s podnikově orientovaným bezpečnostním rámcem  
  - **9 komplexních bezpečnostních domén**: Rozšířeno z základních kontrol na detailní podnikový rámec  
    - Pokročilá autentizace a autorizace s integrací Microsoft Entra ID  
    - Bezpečnost tokenů a kontroly proti průchodu (anti-passthrough) s kompletní validací  
    - Kontroly zabezpečení relací s prevencí únosu relace  
    - AI-specifické bezpečnostní kontroly proti injekci promptů a otrávení nástrojů  
    - Prevence útoku zmateného zprostředkovatele s OAuth proxy bezpečností  
    - Bezpečnost při spouštění nástrojů s sandboxingem a izolací  
    - Kontroly bezpečnosti dodavatelského řetězce s ověřením závislostí  
    - Monitorování a detekce s integrací SIEM  
    - Reakce na incidenty a obnova s automatizovanými procesy  
  - **Příklady implementace**: Přidány podrobné YAML konfigurační bloky a ukázky kódu  
  - **Integrace Microsoft řešení**: Komplexní pokrytí bezpečnostních služeb Azure, GitHub Advanced Security a podnikových systémů správy identity  

#### Pokročilá bezpečnostní témata (05-AdvancedTopics/mcp-security/) – Produkčně připravená implementace  
- **README.md**: Kompletní přepsání podnikové implementace bezpečnosti  
  - **Aktualizace na současnou specifikaci**: Revize na MCP Specification 2025-06-18 s povinnými bezpečnostními požadavky  
  - **Vylepšená autentizace**: Integrace Microsoft Entra ID s komplexními příklady v .NET a Java Spring Security  
  - **Integrace AI bezpečnosti**: Implementace Microsoft Prompt Shields a Azure Content Safety s detailními Python ukázkami  
  - **Pokročilá mitigace hrozeb**: Kompletní příklady implementace pro  
    - Prevence útoku zmateného zprostředkovatele pomocí PKCE a validačního souhlasu uživatele  
    - Prevence průchodu tokenu s validací publika a bezpečnou správou tokenů  
    - Prevence únosu relace s kryptografickým propojením a behaviorální analýzou  
  - **Integrace podnikové bezpečnosti**: Monitorování Azure Application Insights, pipeline detekce hrozeb a zabezpečení dodavatelského řetězce  
  - **Kontrolní seznam implementace**: Jasné rozlišení povinných a doporučených bezpečnostních kontrol s přínosy Microsoft bezpečnostního ekosystému  

### Zlepšení kvality dokumentace a soulad se standardy  
- **Reference specifikace**: Aktualizace všech odkazů na aktuální MCP Specification 2025-06-18  
- **Microsoft bezpečnostní ekosystém**: Vylepšené pokyny pro integraci napříč veškerou bezpečnostní dokumentací  
- **Praktická implementace**: Přidány detailní příklady kódu v .NET, Java a Python s podnikatelskými vzory  
- **Organizace zdrojů**: Komplexní kategorizace oficiální dokumentace, bezpečnostních standardů a průvodců implementací  
- **Vizuální indikátory**: Jasné označení povinných požadavků oproti doporučeným praktikám  

#### Základní koncepty (01-CoreConcepts/) – Kompletní modernizace  
- **Aktualizace verze protokolu**: Aktualizace na odkazování na současnou MCP Specification 2025-06-18 s formátem verze podle data (RRRR-MM-DD)  
- **Zlepšení architektury**: Vylepšené popisy Hostitelů, Klientů a Serverů reflektující současné architektonické vzory MCP
  - Hostitelé nyní jasně definováni jako AI aplikace koordinující více klientských připojení MCP
  - Klienti popsáni jako protokoloví konektory udržující vztahy server-jednoduše-jedna
  - Servery rozšířeny o scénáře lokálního vs. vzdáleného nasazení
- **Primitivní restrukturalizace**: Kompletní přepracování serverových a klientských primitiv
  - Serverové primitivy: Zdroje (datové zdroje), Výzvy (šablony), Nástroje (spustitelné funkce) s podrobnými vysvětleními a příklady
  - Klientské primitivy: Vzorkování (dokončení LLM), Elicitace (uživatelský vstup), Protokolování (ladění/monitorování)
  - Aktualizováno s aktuálními vzory metod objevování (`*/list`), získávání (`*/get`) a vykonávání (`*/call`)
- **Architektura protokolu**: Zaveden model dvouvrstvé architektury
  - Datová vrstva: Základ JSON-RPC 2.0 s řízením životního cyklu a primitivy
  - Přenosová vrstva: Mechanismy přenosu STDIO (lokální) a Streamable HTTP se SSE (vzdálený)
- **Rámec zabezpečení**: Komplexní bezpečnostní principy včetně explicitního souhlasu uživatele, ochrany soukromí dat, bezpečnosti vykonávání nástrojů a zabezpečení přenosové vrstvy
- **Vzory komunikace**: Aktualizované zprávy protokolu znázorňující inicializaci, objevování, vykonávání a notifikace
- **Příklady kódu**: Aktualizované vícejazyčné příklady (.NET, Java, Python, JavaScript) odrážející aktuální vzory MCP SDK

#### Zabezpečení (02-Security/) - Komplexní přehled bezpečnosti  
- **Soulad se standardy**: Plné sladění s bezpečnostními požadavky MCP Specifikace 2025-06-18
- **Vývoj autentizace**: Dokumentovaný vývoj od vlastních OAuth serverů k delegaci externím poskytovatelům identity (Microsoft Entra ID)
- **Analýza hrozeb specifických pro AI**: Rozšířené pokrytí moderních vektorů útoků AI
  - Detailní scénáře útoků injektáží výzev s reálnými příklady
  - Mechanismy otravování nástrojů a vzory útoků „rug pull“
  - Otravování kontextového okna a útoky zmatení modelu
- **Microsoft AI bezpečnostní řešení**: Komplexní pokrytí ekosystému bezpečnosti Microsoftu
  - AI prompt štíty s pokročilou detekcí, zvýrazňováním a technikami oddělovačů
  - Vzory integrace Azure Content Safety
  - GitHub Advanced Security pro ochranu dodavatelského řetězce
- **Pokročilá mitigace hrozeb**: Detailní bezpečnostní kontroly pro
  - Převzetí relace se scénáři útoků specifickými pro MCP a požadavky na kryptografické ID relace
  - Problémy „confused deputy“ v MCP proxy scénářích s explicitními požadavky na souhlas
  - Zranitelnosti předávání tokenů s povinnými validačními kontrolami
- **Bezpečnost dodavatelského řetězce**: Rozšířené pokrytí dodavatelského řetězce AI včetně základních modelů, embeddingových služeb, poskytovatelů kontextu a API třetích stran
- **Zabezpečení základu**: Vylepšená integrace s podnikových bezpečnostními vzory včetně architektury zero trust a ekosystému bezpečnosti Microsoft
- **Organizace zdrojů**: Kategorizované komplexní odkazy na zdroje podle typu (Oficiální dokumentace, Standardy, Výzkum, Microsoft řešení, Implementační průvodce)

### Zlepšení kvality dokumentace
- **Strukturované cíle učení**: Vylepšené cíle učení s konkrétními, akčními výsledky
- **Křížové odkazy**: Přidány odkazy mezi příbuznými tématy bezpečnosti a základních konceptů
- **Aktuální informace**: Aktualizovány všechny datumové reference a odkazy na specifikace na aktuální standardy
- **Pokyny k implementaci**: Přidány konkrétní, akční implementační pokyny napříč oběma sekcemi

## 16. července 2025

### README a vylepšení navigace
- Kompletně přepracovaná navigace kurikula v README.md
- Nahrazeny značky `<details>` přístupnějším formátem založeným na tabulkách
- Vytvořeny alternativní možnosti rozvržení v nové složce "alternative_layouts"
- Přidány příklady navigace ve stylu karet, záložek a akordeonu
- Aktualizována sekce struktury repozitáře o všechny nejnovější soubory
- Vylepšena část "Jak používat toto kurikulum" s jasnými doporučeními
- Aktualizovány odkazy na specifikaci MCP tak, aby ukazovaly na správné URL
- Přidána sekce Context Engineering (5.14) do struktury kurikula

### Aktualizace studijního průvodce
- Kompletně revidován studijní průvodce tak, aby odpovídal aktuální struktuře repozitáře
- Přidány nové sekce pro MCP klienty a nástroje a populární MCP servery
- Aktualizována vizuální mapa kurikula pro přesné zobrazení všech témat
- Vylepšeny popisy pokročilých témat pokrývajících všechny specializované oblasti
- Aktualizována sekce případových studií s reálnými příklady
- Přidán tento komplexní changelog

### Příspěvky komunity (06-CommunityContributions/)
- Přidány podrobné informace o MCP serverech pro generování obrázků
- Přidána komplexní sekce o používání Claude ve VSCode
- Přidány návody pro nastavení a používání terminálového klienta Cline
- Aktualizována sekce MCP klientů o všechny populární možnosti klientů
- Vylepšeny příklady příspěvků s přesnějšími ukázkami kódu

### Pokročilá témata (05-AdvancedTopics/)
- Organizovány všechny specializované tematické složky s konzistentním pojmenováním
- Přidány materiály a příklady o Context Engineering
- Přidána dokumentace integrace agenta Foundry
- Vylepšena dokumentace integrace bezpečnosti Entra ID

## 11. června 2025

### První vytvoření
- Uvolněna první verze kurikula MCP pro začátečníky
- Vytvořena základní struktura všech 10 hlavních sekcí
- Implementována vizuální mapa kurikula pro navigaci
- Přidány počáteční ukázkové projekty ve více programovacích jazycích

### Začínáme (03-GettingStarted/)
- Vytvořeny první příklady implementace serveru
- Přidány pokyny k vývoji klienta
- Zahrnuta dokumentace integrace LLM klienta
- Přidána dokumentace integrace do VS Code
- Implementovány příklady serveru Server-Sent Events (SSE)

### Základní koncepty (01-CoreConcepts/)
- Přidáno podrobné vysvětlení klient-server architektury
- Vytvořena dokumentace klíčových komponent protokolu
- Zdokumentovány vzory zasílání zpráv v MCP

## 23. května 2025

### Struktura repozitáře
- Inicializována repozitář se základní strukturou složek
- Vytvořeny README soubory pro každou hlavní sekci
- Nastavena infrastruktura pro překlady
- Přidány obrazové zdroje a diagramy

### Dokumentace
- Vytvořen počáteční README.md s přehledem kurikula
- Přidány soubory CODE_OF_CONDUCT.md a SECURITY.md
- Nastaven soubor SUPPORT.md s pokyny, jak získat pomoc
- Vytvořena předběžná struktura studijního průvodce

## 15. dubna 2025

### Plánování a rámec
- Počáteční plánování kurikula MCP pro začátečníky
- Definovány cíle učení a cílová skupina
- Návrh 10-členné struktury kurikula
- Vypracován koncepční rámec pro příklady a případové studie
- Vytvořeny počáteční prototypové příklady klíčových konceptů

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:
Tento dokument byl přeložen pomocí služby automatického překladu AI [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, uvědomte si prosím, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho původním jazyce by měl být považován za autoritativní zdroj. Pro důležité informace se doporučuje využít profesionální lidský překlad. Nejsme odpovědni za jakékoliv nedorozumění nebo nesprávné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->