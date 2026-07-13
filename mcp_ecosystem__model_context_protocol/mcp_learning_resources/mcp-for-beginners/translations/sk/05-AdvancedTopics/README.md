# Pokročilé témy v MCP

[![Pokročilé MCP: Bezpeční, škálovateľní a multimodálni AI agenti](../../../translated_images/sk/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite na obrázok vyššie pre zobrazenie videa k tejto lekcii)_

Táto kapitola pokrýva sériu pokročilých tém pri implementácii Model Context Protocol (MCP), vrátane multimodálnej integrácie, škálovateľnosti, najlepších bezpečnostných postupov a podnikovej integrácie. Témy sú kľúčové pre vytváranie robustných a produkčne pripravených aplikácií MCP, ktoré dokážu uspokojiť požiadavky moderných AI systémov.

## Prehľad

Táto lekcia skúma pokročilé koncepty implementácie Model Context Protocol, so zameraním na multimodálnu integráciu, škálovateľnosť, najlepšie bezpečnostné praktiky a podnikové integrácie. Témy sú zásadné pre tvorbu MCP aplikácií určených do produkčného prostredia, ktoré zvládajú komplexné požiadavky v podnikových prostrediach.

> **Pohľad do budúcnosti:** niekoľko tém nižšie je ovplyvnených kandidátom na vydanie špecifikácie MCP z `2026-07-28` — Root Contexts (5.4) a Sampling (5.6) stavajú na primitívach, ktoré kandidát označuje za zastarané, a experimentálna funkcia Tasks spomenutá v Protocol Features (5.16) sa presúva do samostatného rozšírenia Tasks. Viac informácií nájdete v [Čo sa mení v MCP: Kandidát vydania 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Ciele učenia

Na konci tejto lekcie budete schopní:

- Implementovať multimodálne schopnosti v rámci MCP systémov
- Navrhovať škálovateľné MCP architektúry pre scenáre s vysokou záťažou
- Aplikovať najlepšie bezpečnostné postupy v súlade s bezpečnostnými princípmi MCP
- Integrovať MCP s podnikových AI systémami a rámcami
- Optimalizovať výkon a spoľahlivosť v produkčnom prostredí

## Lekcie a ukážkové projekty

| Odkaz | Názov | Popis |
|------|-------|-------------|
| [5.1 Integrácia s Azure](./mcp-integration/README.md) | Integrácia s Azure | Naučte sa integrovať svoj MCP Server na Azure |
| [5.2 Ukážka multimodality](./mcp-multi-modality/README.md) | MCP multimodálne ukážky | Ukážky pre audio, obraz a multimodálnu odpoveď |
| [5.3 MCP OAuth2 ukážka](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demo | Minimálna aplikácia Spring Boot zobrazujúca OAuth2 s MCP, ako Autorizačný a Zdrojový server. Demonštruje bezpečné vydávanie tokenov, chránené endpointy, nasadenie do Azure Container Apps a integráciu API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root kontexty | Dozviete sa viac o root kontexte a ako ich implementovať |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Naučte sa rôzne typy routovania |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Naučte sa pracovať so samplingom |
| [5.7 Scaling](./mcp-scaling/README.md) | Škálovanie | Naučte sa o škálovaní |
| [5.8 Security](./mcp-security/README.md) | Bezpečnosť | Zaistite bezpečnosť svojho MCP Servera |
| [5.9 Ukážka Web Search MCP](./web-search-mcp/README.md) | Web Search MCP | Python MCP server a klient integrujúci SerpAPI pre vyhľadávanie na webe, novinky, produkty a otázky a odpovede v reálnom čase. Demonštruje orchestráciu viacerých nástrojov, integráciu externých API a robustnú správu chýb. |
| [5.10 Streamovanie v reálnom čase](./mcp-realtimestreaming/README.md) | Streaming | Streamovanie dát v reálnom čase sa stalo nevyhnutným v dnešnom svete riadenom dátami, kde podniky a aplikácie potrebujú okamžitý prístup k informáciám pre včasné rozhodovanie.|
| [5.11 Vyhľadávanie na webe v reálnom čase](./mcp-realtimesearch/README.md) | Web Search | Vyhľadávanie na webe v reálnom čase, ako MCP transformuje vyhľadávanie tým, že poskytuje štandardizovaný prístup k správe kontextu medzi AI modelmi, vyhľadávačmi a aplikáciami.| 
| [5.12 Overovanie Entra ID pre Model Context Protocol servery](./mcp-security-entra/README.md) | Overovanie Entra ID | Microsoft Entra ID poskytuje robustné riešenie na správu identity a prístupu v cloude, ktoré pomáha zabezpečiť, že len autorizovaní používatelia a aplikácie môžu komunikovať s vaším MCP serverom.|
| [5.13 Integrácia Microsoft Foundry Agenta](./mcp-foundry-agent-integration/README.md) | Integrácia Microsoft Foundry | Naučte sa integrovať Model Context Protocol servery s Microsoft Foundry agentmi, čo umožňuje silnú orchestráciu nástrojov a podnikové AI schopnosti s štandardizovanými pripojeniami k externým zdrojom dát.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Budúce príležitosti techník správy kontextu pre MCP servery, vrátane optimalizácie kontextu, dynamickej správy kontextu a stratégií efektívneho prompt engineeringu v rámci MCP systémov.|
| [5.15 MCP Vlastný Transport](./mcp-transport/README.md) | Vlastný transport | Naučte sa implementovať vlastné transportné mechanizmy pre špecializované MCP komunikačné scenáre.|
| [5.16 Detailné protokolové funkcie](./mcp-protocol-features/README.md) | Protokolové funkcie | Ovládnite pokročilé protokolové funkcie vrátane oznámení o priebehu, rušenia požiadaviek, šablón zdrojov a vzorov správy chýb.|
| [5.17 Adversariálne viacagentové uvažovanie](./mcp-adversarial-agents/README.md) | Adversariálni agenti | Použite dvoch agentov s opačnými stanoviskami, ktorí zdieľajú jednu MCP súpravu nástrojov, aby ste odhalili halucinácie, ukázali okrajové prípady a vyprodukovali lepšie kalibrované výstupy prostredníctvom štruktúrovanej debaty.|

> **Novinka v MCP špecifikácii 2025-11-25**: Špecifikácia teraz obsahuje experimentálnu podporu pre **Tasks** (dlhotrvajúce operácie so sledovaním priebehu), **Tool Annotations** (metadata o správaní nástrojov pre bezpečnosť), **URL Mode Elicitation** (žiadosť o konkrétny URL obsah od klientov) a vylepšené **Roots** (pre správu kontextu pracovného priestoru). Kompletné detaily nájdete v [zmenovom protokole MCP špecifikácie](https://spec.modelcontextprotocol.io/).

## Dodatočné odkazy

Pre najaktuálnejšie informácie o pokročilých témach MCP sa odkazujte na:
- [Dokumentácia MCP](https://modelcontextprotocol.io/)
- [Špecifikácia MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitár](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Bezpečnostné riziká a mitigácie
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostný tréning

## Kľúčové poznatky

- Multimodálne MCP implementácie rozširujú AI schopnosti nad rámec spracovania textu
- Škálovateľnosť je zásadná pre podnikové nasadenia a dá sa riešiť horizontálnym a vertikálnym škálovaním
- Komplexné bezpečnostné opatrenia chránia dáta a zabezpečujú správnu kontrolu prístupu
- Podniková integrácia s platformami ako Azure OpenAI a Microsoft AI Foundry zvyšuje schopnosti MCP
- Pokročilé MCP implementácie profitujú z optimalizovaných architektúr a dôslednej správy zdrojov

## Cvičenie

Navrhnite implementáciu MCP podnikovej úrovne pre konkrétny použiteľný prípad:

1. Identifikujte multimodálne požiadavky pre váš prípad použitia
2. Opíšte bezpečnostné kontroly potrebné na ochranu citlivých dát
3. Navrhnite škálovateľnú architektúru, ktorá zvládne meniacu sa záťaž
4. Naplánujte integračné body s podnikových AI systémami
5. Zdokumentujte potenciálne výkonnostné úzke miesta a stratégie ich zmiernenia

## Dodatočné zdroje

- [Dokumentácia Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentácia Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Čo ďalej

Preskúmajte lekcie v tomto module, začínajúc s: [5.1 MCP integrácia](./mcp-integration/README.md)

Po dokončení tohto modulu pokračujte na: [Modul 6: Príspevky komunity](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->