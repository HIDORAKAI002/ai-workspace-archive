# Pokročilá témata v MCP

[![Pokročilé MCP: Bezpeční, škálovatelní a multimodální AI agenti](../../../translated_images/cs/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klikněte na obrázek výše pro zobrazení videa této lekce)_

Tato kapitola pokrývá řadu pokročilých témat v implementaci Model Context Protocol (MCP), včetně multimodální integrace, škálovatelnosti, osvědčených bezpečnostních postupů a integrace do podnikových systémů. Tato témata jsou klíčová pro tvorbu robustních a produkčně připravených MCP aplikací, které dokážou splnit požadavky moderních AI systémů.

## Přehled

Tato lekce zkoumá pokročilé koncepty implementace Model Context Protocol, zaměřuje se na multimodální integraci, škálovatelnost, osvědčené bezpečnostní postupy a integraci do podnikových prostředí. Tato témata jsou nezbytná pro tvorbu produkčně orientovaných MCP aplikací, které zvládnou složité požadavky v podnikových prostředích.

> **Pohled do budoucna:** několik níže uvedených témat je ovlivněno kandidátem na vydání specifikace MCP `2026-07-28` — Root Contexts (5.4) a Sampling (5.6) staví na prvcích, které jsou v kandidátovi označeny jako zastaralé, a experimentální funkce Tasks zmiňovaná v Protocol Features (5.16) přesouvá na samostatné rozšíření Tasks. Podrobnosti najdete v [Co se mění v MCP: Kandidát na vydání 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Cíle učení

Na konci této lekce budete schopni:

- Implementovat multimodální schopnosti v rámci MCP frameworků
- Navrhnout škálovatelnou architekturu MCP pro scénáře s vysokou zátěží
- Uplatnit osvědčené bezpečnostní postupy v souladu s bezpečnostními principy MCP
- Integrovat MCP s podnikovými AI systémy a frameworky
- Optimalizovat výkon a spolehlivost v produkčním prostředí

## Lekce a ukázkové projekty

| Odkaz | Název | Popis |
|------|-------|-------------|
| [5.1 Integrace s Azure](./mcp-integration/README.md) | Integrace s Azure | Naučte se, jak propojit svůj MCP Server na Azure |
| [5.2 Multimodální ukázka](./mcp-multi-modality/README.md) | MCP multimodální ukázky | Ukázky pro audio, obraz a multimodální odpovědi |
| [5.3 MCP OAuth2 ukázka](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimální aplikace ve Spring Boot ukazující OAuth2 s MCP, jak jako autorizační, tak jako zdrojový server. Demonstruje bezpečné vydávání tokenů, chráněné koncové body, nasazení na Azure Container Apps a integraci s API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root Contexts | Naučte se více o root kontextu a jeho implementaci (zastaralé v kandidátu na vydání `2026-07-28`; stále platné pro `2025-11-25`) |
| [5.5 Směrování](./mcp-routing/README.md) | Směrování | Naučte se různé typy směrování |
| [5.6 Sampling](./mcp-sampling/README.md) | Výběr vzorků | Naučte se pracovat s výběrem vzorků (zastaralé v kandidátu na vydání `2026-07-28`; stále platné pro `2025-11-25`) |
| [5.7 Škálování](./mcp-scaling/README.md) | Škálování | Naučte se o škálování |
| [5.8 Bezpečnost](./mcp-security/README.md) | Bezpečnost | Zabezpečte svůj MCP Server |
| [5.9 Webové vyhledávání MCP](./web-search-mcp/README.md) | Web Search MCP | Python server a klient MCP integrující SerpAPI pro vyhledávání na webu, v novinkách, produktech a Q&A v reálném čase. Demonstruje orchestraci více nástrojů, integraci externího API a robustní zpracování chyb. |
| [5.10 Streaming v reálném čase](./mcp-realtimestreaming/README.md) | Streaming | Streaming dat v reálném čase se stal nezbytným v dnešním světě řízeném daty, kde firmy a aplikace potřebují okamžitý přístup k informacím pro včasná rozhodnutí. |
| [5.11 Reálné webové vyhledávání](./mcp-realtimesearch/README.md) | Web Search | Jak MCP transformuje reálné webové vyhledávání poskytováním standardizovaného přístupu k řízení kontextu napříč AI modely, vyhledávači a aplikacemi. |
| [5.12 Autentizace Entra ID pro MCP Servery](./mcp-security-entra/README.md) | Autentizace Entra ID | Microsoft Entra ID poskytuje robustní cloudové řešení pro správu identit a přístupu, které zajistí, že pouze oprávnění uživatelé a aplikace mohou komunikovat s vaším MCP serverem. |
| [5.13 Integrace Microsoft Foundry agentů](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integrace | Naučte se integrovat MCP servery s Microsoft Foundry agenty, což umožňuje silnou orchestraci nástrojů a podnikové AI schopnosti se standardizovanými připojeními k externím datovým zdrojům. |
| [5.14 Kontextové inženýrství](./mcp-contextengineering/README.md) | Kontextové inženýrství | Budoucí příležitosti technik kontextového inženýrství pro MCP servery, včetně optimalizace kontextu, dynamického řízení kontextu a strategií efektivního návrhu promptů v MCP frameworcích. |
| [5.15 Vlastní transport MCP](./mcp-transport/README.md) | Vlastní transport | Naučte se implementovat vlastní transportní mechanismy pro specializované scénáře komunikace MCP. |
| [5.16 Hloubkový pohled na funkce protokolu](./mcp-protocol-features/README.md) | Funkce protokolu | Ovládněte pokročilé funkce protokolu včetně notifikací o pokroku, rušení požadavků, šablon zdrojů a vzorů zpracování chyb. |
| [5.17 Adversární multiagentní uvažování](./mcp-adversarial-agents/README.md) | Adversární agenti | Použijte dva agenty s opačnými stanovisky sdílející jeden MCP nástrojový set k odhalení halucinací, identifikaci hraničních případů a produkci lépe kalibrovaných výstupů prostřednictvím strukturované debaty. |

> **Novinky ve specifikaci MCP 2025-11-25**: Specifikace nyní zahrnuje experimentální podporu pro **Úkoly** (dlouhotrvající operace s sledováním pokroku), **Anotace nástrojů** (metadata o chování nástrojů pro bezpečnost), **Vyžádání režimu URL** (požadování specifického obsahu URL od klientů) a vylepšené **Roots** (pro správu pracovního kontextu). Podrobnosti naleznete v [záznamu změn specifikace MCP](https://spec.modelcontextprotocol.io/).

## Další odkazy

Pro nejaktuálnější informace o pokročilých tématech MCP navštivte:
- [Dokumentaci MCP](https://modelcontextprotocol.io/)
- [Specifikaci MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitář](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Bezpečnostní rizika a opatření
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostní trénink

## Hlavní závěry

- Multimodální implementace MCP rozšiřují AI schopnosti nad rámec zpracování textu
- Škálovatelnost je nezbytná pro podnikové nasazení a lze ji řešit horizontálním i vertikálním škálováním
- Komplexní bezpečnostní opatření chrání data a zajišťují správnou kontrolu přístupu
- Podniková integrace s platformami jako Azure OpenAI a Microsoft AI Foundry rozšiřuje možnosti MCP
- Pokročilé MCP implementace těží z optimalizovaných architektur a pečlivého řízení zdrojů

## Cvičení

Navrhněte produkční MCP implementaci pro konkrétní případ použití:

1. Určete multimodální požadavky pro váš případ použití
2. Nastíněte bezpečnostní kontroly potřebné k ochraně citlivých dat
3. Navrhněte škálovatelnou architekturu, která zvládne proměnlivou zátěž
4. Naplánujte integrační body s podnikových AI systémy
5. Zdokumentujte možné úzká místa výkonu a strategie jejich zmírnění

## Další zdroje

- [Dokumentace Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentace Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Co dál

Prozkoumejte lekce v tomto modulu začínající s: [5.1 MCP Integrace](./mcp-integration/README.md)

Po dokončení tohoto modulu pokračujte na: [Modul 6: Příspěvky komunity](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->