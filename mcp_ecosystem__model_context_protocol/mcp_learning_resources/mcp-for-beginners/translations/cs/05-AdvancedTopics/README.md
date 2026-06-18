# Pokročilá témata v MCP

[![Pokročilé MCP: Bezpeční, škálovatelní a multimodální AI agenti](../../../translated_images/cs/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klikněte na obrázek výše pro zobrazení videa této lekce)_

Tato kapitola pokrývá sérii pokročilých témat v implementaci Model Context Protocol (MCP), včetně multimodální integrace, škálovatelnosti, bezpečnostních osvědčených postupů a integrace do podnikových systémů. Tato témata jsou klíčová pro vytváření robustních a produkčně připravených aplikací MCP, které mohou vyhovět požadavkům moderních AI systémů.

## Přehled

Tato lekce zkoumá pokročilé koncepty implementace Model Context Protocol, se zaměřením na multimodální integraci, škálovatelnost, bezpečnostní osvědčené postupy a integraci do podnikových systémů. Tato témata jsou nezbytná pro budování produkčních aplikací MCP, které zvládnou složité požadavky v podnikových prostředích.

## Cíle učení

Na konci této lekce budete schopni:

- Implementovat multimodální schopnosti v rámci rámců MCP
- Navrhnout škálovatelné architektury MCP pro náročné scénáře
- Aplikovat bezpečnostní osvědčené postupy v souladu s bezpečnostními principy MCP
- Integrovat MCP s podnikovými AI systémy a rámci
- Optimalizovat výkon a spolehlivost v produkčním prostředí

## Lekce a ukázkové projekty

| Odkaz | Název | Popis |
|------|-------|-------------|
| [5.1 Integrace s Azure](./mcp-integration/README.md) | Integrace s Azure | Naučte se, jak integrovat váš MCP server na Azure |
| [5.2 Multimodální ukázka](./mcp-multi-modality/README.md) | MCP multimodální ukázky  | Ukázky pro audio, obrázky a multimodální odpovědi |
| [5.3 MCP OAuth2 ukázka](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimální aplikace Spring Boot ukazující OAuth2 s MCP, jak jako autorizovaný, tak jako zdrojový server. Demonstruje zabezpečené vydávání tokenů, chráněné koncové body, nasazení Azure Container Apps a integraci správy API. |
| [5.4 Kořenové kontexty](./mcp-root-contexts/README.md) | Kořenové kontexty  | Zjistěte více o kořenovém kontextu a jak jej implementovat |
| [5.5 Směrování](./mcp-routing/README.md) | Směrování | Naučte se různé typy směrování |
| [5.6 Výběrové vzorkování](./mcp-sampling/README.md) | Výběrové vzorkování | Naučte se pracovat s výběrovým vzorkováním |
| [5.7 Škálování](./mcp-scaling/README.md) | Škálování  | Naučte se o škálování |
| [5.8 Bezpečnost](./mcp-security/README.md) | Bezpečnost  | Zabezpečte svůj MCP server |
| [5.9 Webové vyhledávání MCP](./web-search-mcp/README.md) | Webové vyhledávání MCP | Python MCP server a klient integrující se SerpAPI pro real-time web, zprávy, vyhledávání produktů a Q&A. Demonstruje orchestraci více nástrojů, integraci externích API a robustní zpracování chyb. |
| [5.10 Real-time streamování](./mcp-realtimestreaming/README.md) | Streamování  | Real-time streamování dat se stalo nezbytností v dnešním světě řízeném daty, kde podniky a aplikace vyžadují okamžitý přístup k informacím pro včasné rozhodování.|
| [5.11 Real-time webové vyhledávání](./mcp-realtimesearch/README.md) | Webové vyhledávání | Jak MCP transformuje real-time webové vyhledávání tím, že poskytuje standardizovaný přístup ke správě kontextu napříč AI modely, vyhledávači a aplikacemi.| 
| [5.12 Autentizace Entra ID pro MCP servery](./mcp-security-entra/README.md) | Autentizace Entra ID | Microsoft Entra ID poskytuje robustní cloudové řešení správy identity a přístupu, pomáhající zajistit, že pouze autorizovaní uživatelé a aplikace mohou komunikovat s vaším MCP serverem.|
| [5.13 Integrace Microsoft Foundry agentů](./mcp-foundry-agent-integration/README.md) | Integrace Microsoft Foundry | Naučte se, jak integrovat Model Context Protocol servery s Microsoft Foundry agenty, umožňující silnou orchestraci nástrojů a podnikové AI schopnosti se standardizovanými připojeními k externím zdrojům dat.|
| [5.14 Kontextová inženýrství](./mcp-contextengineering/README.md) | Kontextová inženýrství | Budoucí příležitosti technik kontextového inženýrství pro MCP servery, včetně optimalizace kontextu, dynamického řízení kontextu a strategií pro efektivní prompt inženýrství v rámci MCP.|
| [5.15 Vlastní přenos dat](./mcp-transport/README.md) | Vlastní přenos | Naučte se implementovat vlastní přenosové mechanismy pro specializované scénáře komunikace MCP.|
| [5.16 Hloubkový pohled do funkcí protokolu](./mcp-protocol-features/README.md) | Funkce protokolu | Ovládněte pokročilé funkce protokolu, včetně oznámení o průběhu, zrušení požadavků, šablon zdrojů a vzorů zpracování chyb.|
| [5.17 Adverzní multi-agentní rozumování](./mcp-adversarial-agents/README.md) | Adverzní agenti | Použijte dva agenty s opačnými postoji, sdílející jedinou sadu MCP nástrojů, k zachycení halucinací, odhalení okrajových případů a produkci lépe kalibrovaných výstupů prostřednictvím strukturované debaty.|

> **Novinky ve specifikaci MCP 2025-11-25**: Specifikace nyní zahrnuje experimentální podporu pro **Úlohy** (dlouhotrvající operace s sledováním průběhu), **Anotace nástrojů** (metadata o chování nástrojů pro bezpečnost), **URL režim vyžádání** (požadování konkrétního obsahu URL od klientů) a vylepšené **Kořeny** (pro správu kontextu pracovních prostor). Plné detaily najdete v [changelog specifikace MCP](https://spec.modelcontextprotocol.io/).

## Další odkazy

Pro nejaktuálnější informace o pokročilých tématech MCP využijte:
- [Dokumentace MCP](https://modelcontextprotocol.io/)
- [Specifikace MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitář](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Bezpečnostní rizika a opatření
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostní trénink

## Klíčové poznatky

- Multimodální implementace MCP rozšiřují AI schopnosti nad rámec zpracování textu
- Škálovatelnost je nezbytná pro podniková nasazení a lze ji řešit horizontálním i vertikálním škálováním
- Komplexní bezpečnostní opatření chrání data a zajišťují správnou kontrolu přístupu
- Podniková integrace s platformami jako Azure OpenAI a Microsoft AI Foundry rozšiřuje schopnosti MCP
- Pokročilé implementace MCP získávají díky optimalizovaným architekturám a pečlivému řízení zdrojů

## Cvičení

Navrhněte implementaci MCP na podnikové úrovni pro konkrétní případ použití:

1. Identifikujte multimodální požadavky pro váš případ použití
2. Nastíněte bezpečnostní kontroly potřebné k ochraně citlivých dat
3. Navrhněte škálovatelnou architekturu, která zvládne proměnlivou zátěž
4. Plánujte integrační body s podnikových AI systémy
5. Zdokumentujte potenciální výkonnostní úzká místa a strategie jejich zmírnění

## Další zdroje

- [Dokumentace Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentace Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Co dál

Prozkoumejte lekce v tomto modulu začínaje: [5.1 Integrace MCP](./mcp-integration/README.md)

Po dokončení tohoto modulu pokračujte do: [Modul 6: Příspěvky komunity](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->