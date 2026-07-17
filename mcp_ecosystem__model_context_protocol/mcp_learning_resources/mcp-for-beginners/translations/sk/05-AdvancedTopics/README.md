# Pokročilé témy v MCP

[![Pokročilé MCP: Bezpeční, škálovateľní a multimodálni AI agenti](../../../translated_images/sk/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_

Táto kapitola zahŕňa sériu pokročilých tém v implementácii Model Context Protocol (MCP), vrátane multimodálnej integrácie, škálovateľnosti, najlepších bezpečnostných postupov a integrácie do podnikového prostredia. Tieto témy sú kľúčové pre budovanie robustných a produkčne pripravených aplikácií MCP, ktoré dokážu splniť požiadavky moderných AI systémov.

## Prehľad

Táto lekcia skúma pokročilé koncepty v implementácii Model Context Protocol, so zameraním na multimodálnu integráciu, škálovateľnosť, najlepšie bezpečnostné praktiky a integráciu do podnikového prostredia. Témy sú nevyhnutné pre tvorbu produkčných MCP aplikácií, ktoré zvládnu zložité požiadavky v podnikových prostrediach.

> **Pohľad dopredu:** niekoľko tém nižšie je ovplyvnených kandidátskou verziou špecifikácie MCP `2026-07-28` — Root Contexts (5.4) a Sampling (5.6) stavajú na primitívach, ktoré kandidát označuje za zastarané, a experimentálna funkcia Tasks uvedená v Protocol Features (5.16) sa presúva do vyhradenej Tasks rozšírenia. Viac informácií nájdete v [Čo sa mení v MCP: kandidátska verzia 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Ciele učenia

Na konci tejto lekcie budete vedieť:

- Implementovať multimodálne schopnosti v rámci MCP rámcov
- Navrhnúť škálovateľné MCP architektúry pre scenáre s vysokou záťažou
- Aplikovať najlepšie bezpečnostné praktiky podľa princípov bezpečnosti MCP
- Integrovať MCP s podnikmi AI systémami a rámcami
- Optimalizovať výkon a spoľahlivosť v produkčnom prostredí

## Lekcie a ukážkové projekty

| Odkaz | Názov | Popis |
|------|-------|-------------|
| [5.1 Integrácia s Azure](./mcp-integration/README.md) | Integrácia s Azure | Naučte sa, ako integrovať váš MCP server na Azure |
| [5.2 Multimodálny príklad](./mcp-multi-modality/README.md) | Ukážky MCP multimodality | Ukážky pre audio, obraz a multimodálnu odpoveď |
| [5.3 MCP OAuth2 demo](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demo | Minimálna Spring Boot aplikácia ukazujúca OAuth2 s MCP, ako autorizačný a zdrojový server. Demonštruje bezpečné vydávanie tokenov, chránené koncové body, nasadenie Azure Container Apps a integráciu API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root kontexty | Naučte sa viac o root kontexte a ako ich implementovať (zastaralé v kandidátskej verzii `2026-07-28`; platné pre `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Smerovanie | Naučte sa rôzne typy smerovania |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Naučte sa pracovať s samplingom (zastaralé v kandidátskej verzii `2026-07-28`; platné pre `2025-11-25`) |
| [5.7 Škálovanie](./mcp-scaling/README.md) | Škálovanie | Naučte sa o škálovaní |
| [5.8 Bezpečnosť](./mcp-security/README.md) | Bezpečnosť | Zaistite bezpečnosť vášho MCP servera |
| [5.9 Webové vyhľadávanie MCP](./web-search-mcp/README.md) | MCP Webové vyhľadávanie | Python MCP server a klient integrujúci SerpAPI pre vyhľadávanie webu, noviniek, produktov a Q&A v reálnom čase. Demonštruje orchestráciu viacerých nástrojov, integráciu externých API a robustné spracovanie chýb. |
| [5.10 Prúdové spracovanie v reálnom čase](./mcp-realtimestreaming/README.md) | Streaming | Prúdové spracovanie dát v reálnom čase sa stalo nevyhnutným vo svete riadenom dátami, kde firmy a aplikácie vyžadujú okamžitý prístup k informáciám pre včasné rozhodovanie. |
| [5.11 Webové vyhľadávanie v reálnom čase](./mcp-realtimesearch/README.md) | Webové vyhľadávanie | Ako MCP transformuje vyhľadávanie na webe v reálnom čase tým, že poskytuje štandardizovaný prístup k správe kontextu naprieč AI modelmi, vyhľadávacími nástrojmi a aplikáciami. |
| [5.12 Overovanie Entra ID pre MCP servere](./mcp-security-entra/README.md) | Overovanie Entra ID | Microsoft Entra ID poskytuje robustné cloudové riešenie pre správu identity a prístupu, ktoré zabezpečuje, že len autorizovaní používatelia a aplikácie môžu komunikovať s vaším MCP serverom. |
| [5.13 Integrácia Microsoft Foundry agenta](./mcp-foundry-agent-integration/README.md) | Integrácia Microsoft Foundry | Naučte sa integrovať Model Context Protocol servery s Microsoft Foundry agentmi, čo umožňuje výkonnú orchestráciu nástrojov a podnikové AI schopnosti pomocou štandardizovaných pripojení k externým dátovým zdrojom. |
| [5.14 Inžinierstvo kontextu](./mcp-contextengineering/README.md) | Inžinierstvo kontextu | Budúce možnosti inžinierstva kontextu pre MCP servery, vrátane optimalizácie kontextu, dynamickej správy kontextu a stratégií na efektívne promptové inžinierstvo v MCP rámcoch. |
| [5.15 MCP vlastný transport](./mcp-transport/README.md) | Vlastný transport | Naučte sa implementovať vlastné transportné mechanizmy pre špecializované MCP komunikačné scenáre. |
| [5.16 Hĺbkový pohľad na protokolové funkcie](./mcp-protocol-features/README.md) | Protokolové funkcie | Ovládnite pokročilé protokolové funkcie vrátane notifikácií o priebehu, zrušenia požiadaviek, šablón zdrojov a vzorov spracovania chýb. |
| [5.17 Adversariálna multi-agentná argumentácia](./mcp-adversarial-agents/README.md) | Adversariálni agenti | Použite dvoch agentov s opačnými postojmi, ktorí zdieľajú jediný MCP nástrojový set, na odhaľovanie halucinácií, vyplývanie hraničných prípadov a produkciu lepšie kalibrovaných výstupov cez štruktúrovanú debatu. |

> **Nové v MCP špecifikácii 2025-11-25**: Špecifikácia teraz zahŕňa experimentálnu podporu pre **Tasks** (dlhotrvajúce operácie so sledovaním priebehu), **Anotácie nástrojov** (metadata o správaní nástrojov z hľadiska bezpečnosti), **URL mód vyžiadania** (požiadavka konkrétneho URL obsahu od klientov) a rozšírené **Roots** (pre správu pracovného priestoru kontextu). Pre kompletné informácie navštívte [zmeny v MCP špecifikácii](https://spec.modelcontextprotocol.io/).

## Ďalšie odkazy

Pre najaktuálnejšie informácie o pokročilých témach MCP odporúčame:
- [Dokumentácia MCP](https://modelcontextprotocol.io/)
- [Špecifikácia MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitár](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Bezpečnostné riziká a opatrenia
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostný tréning

## Kľúčové poznatky

- Multimodálne MCP implementácie rozširujú AI schopnosti nad rámec spracovania textu
- Škálovateľnosť je nevyhnutná pre podnikové nasadenia a rieši sa horizontálnym a vertikálnym škálovaním
- Komplexné bezpečnostné opatrenia chránia dáta a zabezpečujú správnu kontrolu prístupu
- Podniková integrácia s platformami ako Azure OpenAI a Microsoft AI Foundry rozširuje MCP schopnosti
- Pokročilé MCP implementácie profitujú z optimalizovaných architektúr a starostlivej správy zdrojov

## Cvičenie

Navrhnite produkčnú MCP implementáciu pre konkrétny prípad použitia:

1. Identifikujte multimodálne požiadavky pre váš prípad použitia
2. Následujte bezpečnostné kontroly potrebné na ochranu citlivých dát
3. Navrhnite škálovateľnú architektúru schopnú zvládnuť rôzne zaťaženie
4. Naplánujte integračné body s podnikovými AI systémami
5. Zdokumentujte potenciálne úzke miesta a stratégie ich zmiernenia

## Ďalšie zdroje

- [Dokumentácia Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentácia Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Čo ďalej

Preskúmajte lekcie v tomto module začínajúc [5.1 MCP Integrácia](./mcp-integration/README.md)

Po dokončení tohto modulu pokračujte na: [Modul 6: Príspevky komunity](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->