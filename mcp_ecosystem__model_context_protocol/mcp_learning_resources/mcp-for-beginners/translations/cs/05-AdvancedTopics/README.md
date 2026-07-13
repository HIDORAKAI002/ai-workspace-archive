# Pokročilá témata v MCP

[![Pokročilé MCP: Zabezpečené, škálovatelné a multimodální AI agenty](../../../translated_images/cs/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klikněte na obrázek výše pro sledování videa této lekce)_

Tato kapitola pokrývá řadu pokročilých témat v implementaci Model Context Protocol (MCP), včetně multimodální integrace, škálovatelnosti, nejlepších bezpečnostních praktik a integrace do podnikových systémů. Tato témata jsou klíčová pro vytváření robustních a produkčně připravených aplikací MCP, které dokážou pokrýt požadavky moderních AI systémů.

## Přehled

Tato lekce zkoumá pokročilé koncepty v implementaci Model Context Protocolu, se zaměřením na multimodální integraci, škálovatelnost, nejlepší bezpečnostní postupy a integraci do podnikových systémů. Tato témata jsou nezbytná pro budování produkčně použitelných aplikací MCP, které zvládnou složité požadavky v podnikových prostředích.

> **Pohlédnutí do budoucna:** několiku tématům níže se dotýká kandidátská verze specifikace MCP `2026-07-28` — Kořenové kontexty (5.4) a Výběr vzorků (5.6) staví na prvcích, které kandidátská verze označuje za zastaralé, a experimentální funkce Úkoly uvedená u Protokolových funkcí (5.16) se přesouvá do samostatného rozšíření Úkolů. Viz [Co se mění v MCP: Kandidátská verze 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pro podrobnosti.

## Výukové cíle

Na konci této lekce budete schopni:

- Implementovat multimodální schopnosti v rámci MCP
- Navrhnout škálovatelné MCP architektury pro scénáře s vysokou zátěží
- Použít nejlepší bezpečnostní praktiky v souladu s bezpečnostními principy MCP
- Integrovat MCP s podnikových AI systémy a frameworky
- Optimalizovat výkon a spolehlivost v produkčním prostředí

## Lekce a ukázkové projekty

| Odkaz | Název | Popis |
|------|-------|-------------|
| [5.1 Integrace s Azure](./mcp-integration/README.md) | Integrace s Azure | Naučte se, jak integrovat váš MCP server na Azure |
| [5.2 Multimodální ukázka](./mcp-multi-modality/README.md) | MCP multimodální ukázky | Ukázky pro audio, obraz a multimodální odpovědi |
| [5.3 MCP OAuth2 ukázka](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demo | Minimální Spring Boot aplikace ukazující OAuth2 s MCP, jako Autorizační i Resource server. Demonstruje bezpečné vydávání tokenů, chráněné koncové body, nasazení na Azure Container Apps a integraci API Management. |
| [5.4 Kořenové kontexty](./mcp-root-contexts/README.md) | Kořenové kontexty | Naučte se více o kořenových kontextech a jejich implementaci |
| [5.5 Směrování](./mcp-routing/README.md) | Směrování | Naučte se různé typy směrování |
| [5.6 Výběr vzorků](./mcp-sampling/README.md) | Výběr vzorků | Naučte se pracovat s výběrem vzorků |
| [5.7 Škálování](./mcp-scaling/README.md) | Škálování | Naučte se o škálování |
| [5.8 Bezpečnost](./mcp-security/README.md) | Bezpečnost | Zabezpečte svůj MCP server |
| [5.9 Webové vyhledávání MCP](./web-search-mcp/README.md) | Webové vyhledávání MCP | Python MCP server a klient integrující se SerpAPI pro vyhledávání webu, zpráv, produktů a otázek v reálném čase. Demonstruje orchestrace vícetoolů, integraci externích API a robustní zpracování chyb. |
| [5.10 Streamování v reálném čase](./mcp-realtimestreaming/README.md) | Streamování | Streamování dat v reálném čase se stalo nezbytným v dnešním světě založeném na datech, kde podniky a aplikace potřebují okamžitý přístup k informacím pro včasná rozhodnutí.|
| [5.11 Webové vyhledávání v reálném čase](./mcp-realtimesearch/README.md) | Webové vyhledávání | Jak MCP transformuje vyhledávání webu v reálném čase poskytováním standardizovaného přístupu ke správě kontextu napříč AI modely, vyhledávači a aplikacemi.|
| [5.12 Autentizace Entra ID pro Model Context Protocol servery](./mcp-security-entra/README.md) | Autentizace Entra ID | Microsoft Entra ID poskytuje robustní cloudové řešení pro správu identity a přístupu, které pomáhá zajistit, aby autorizovaní uživatelé a aplikace mohli komunikovat s vaším MCP serverem.|
| [5.13 Integrace Microsoft Foundry agentů](./mcp-foundry-agent-integration/README.md) | Integrace Microsoft Foundry | Naučte se, jak integrovat MCP servery s Microsoft Foundry agenty, což umožňuje silnou orchestraci nástrojů a podnikové AI schopnosti pomocí standardizovaných připojení k externím zdrojům dat.|
| [5.14 Kontextové inženýrství](./mcp-contextengineering/README.md) | Kontextové inženýrství | Budoucí příležitosti technik kontextového inženýrství pro MCP servery, včetně optimalizace kontextu, dynamického řízení kontextu a strategií pro efektivní tvorbu promptů v rámci MCP frameworků.|
| [5.15 Vlastní transport MCP](./mcp-transport/README.md) | Vlastní transport | Naučte se implementovat vlastní transportní mechanizmy pro specializované scénáře komunikace MCP.|
| [5.16 Hloubkový průzkum protokolových funkcí](./mcp-protocol-features/README.md) | Protokolové funkce | Ovládněte pokročilé protokolové funkce včetně notifikací o průběhu, zrušení požadavků, šablon zdrojů a vzorců zpracování chyb.|
| [5.17 Adversariální víceagentní uvažování](./mcp-adversarial-agents/README.md) | Adversariální agenti | Použijte dva agenty s protikladnými pozicemi, sdílející jeden MCP nástrojový set, aby zachytili halucinace, odhalili hraniční případy a vytvořili lépe kalibrované výstupy prostřednictvím strukturované debaty.|

> **Novinky ve specifikaci MCP 2025-11-25**: Specifikace nyní zahrnuje experimentální podporu pro **Úkoly** (dlouhotrvající operace s sledováním průběhu), **Anotace nástrojů** (metadata o chování nástrojů pro bezpečnost), **Žádosti o obsah URL** (požadování specifického obsahu URL od klientů) a rozšířené **Kořeny** (pro správu kontextu pracovního prostoru). Kompletní informace naleznete v [MCP Specifikaci changelogu](https://spec.modelcontextprotocol.io/).

## Další odkazy

Pro nejaktuálnější informace o pokročilých tématech MCP se podívejte na:
- [MCP dokumentace](https://modelcontextprotocol.io/)
- [MCP specifikace (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitář](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Bezpečnostní rizika a opatření
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostní trénink

## Klíčové poznatky

- Multimodální implementace MCP rozšiřují AI schopnosti nad rámec zpracování textů
- Škálovatelnost je nezbytná pro nasazení v podnikovém prostředí a lze jí řešit horizontálním i vertikálním škálováním
- Komplexní bezpečnostní opatření chrání data a zajišťují správnou kontrolu přístupu
- Podniková integrace s platformami jako Azure OpenAI a Microsoft AI Foundry rozšiřuje možnosti MCP
- Pokročilé implementace MCP těží z optimalizovaných architektur a pečlivého řízení prostředků

## Cvičení

Navrhněte podnikovou implementaci MCP pro specifický případ použití:

1. Určete multimodální požadavky pro váš případ použití
2. Nastíněte bezpečnostní opatření potřebná k ochraně citlivých dat
3. Navrhněte škálovatelnou architekturu, která zvládne proměnlivou zátěž
4. Naplánujte integrační body s podnikovými AI systémy
5. Zdokumentujte možné úzká místa výkonu a strategie jejich řešení

## Další zdroje

- [Azure OpenAI dokumentace](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentace](https://learn.microsoft.com/en-us/ai-services/)

---

## Co bude dál

Prozkoumejte lekce v tomto modulu začínající [5.1 MCP integrace](./mcp-integration/README.md)

Po dokončení tohoto modulu pokračujte do: [Modul 6: Příspěvky komunity](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->