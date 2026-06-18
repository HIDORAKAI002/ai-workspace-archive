# Pokročilé témy v MCP

[![Pokročilé MCP: Bezpeční, škálovateľní a multimodálni AI agenti](../../../translated_images/sk/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_

Táto kapitola pokrýva sériu pokročilých tém v implementácii Model Context Protocol (MCP), vrátane multimodálnej integrácie, škálovateľnosti, osvedčených bezpečnostných praktík a integrácie do podnikového prostredia. Tieto témy sú kľúčové pre tvorbu robustných a do produkcie pripravených aplikácií MCP, ktoré dokážu splniť požiadavky moderných AI systémov.

## Prehľad

Táto lekcia skúma pokročilé koncepty v implementácii Model Context Protocol, so zameraním na multimodálnu integráciu, škálovateľnosť, bezpečnostné osvedčené postupy a integráciu do podnikového prostredia. Tieto témy sú nevyhnutné pre budovanie produkčne zrelých MCP aplikácií, ktoré zvládnu komplexné požiadavky v podnikovom prostredí.

## Ciele učenia

Na konci tejto lekcie budete schopní:

- Implementovať multimodálne schopnosti v rámci MCP rámcov
- Navrhovať škálovateľné MCP architektúry pre scenáre s vysokou záťažou
- Použiť bezpečnostné osvedčené postupy v súlade s bezpečnostnými princípmi MCP
- Integrovať MCP s podnikovými AI systémami a rámcami
- Optimalizovať výkon a spoľahlivosť v produkčnom prostredí

## Lekcie a vzorové projekty

| Link | Názov | Popis |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrácia s Azure | Naučte sa, ako integrovať váš MCP server na Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP multimodálne vzory | Vzory pre audio, obrázok a multimodálnu odpoveď |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demo | Minimálna aplikácia Spring Boot ukazujúca OAuth2 s MCP, ako autorizačný a resource server. Demonštruje bezpečné vydávanie tokenov, chránené endpointy, nasadenie do Azure Container Apps a integráciu s API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root kontexty | Naučte sa viac o root kontextoch a ich implementácii |
| [5.5 Routing](./mcp-routing/README.md) | Smerovanie | Naučte sa rôzne typy smerovania |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Naučte sa, ako pracovať so samplingom |
| [5.7 Scaling](./mcp-scaling/README.md) | Škálovanie | Naučte sa o škálovaní |
| [5.8 Security](./mcp-security/README.md) | Bezpečnosť | Zabezpečte svoj MCP server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Webové vyhľadávanie MCP | Python MCP server a klient integrujúci sa so SerpAPI pre vyhľadávanie webu, správ, produktov a Q&A v reálnom čase. Demonštruje multi-nástrojovú koordináciu, integráciu externých API a robustné spracovanie chýb. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streamovanie | Streamovanie dát v reálnom čase je dnes kľúčové v dátami riadenom svete, kde podniky a aplikácie potrebujú okamžitý prístup k informáciám pre rýchle rozhodovanie. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Webové vyhľadávanie | Reálne webové vyhľadávanie – ako MCP transformuje vyhľadávanie webu v reálnom čase poskytovaním štandardizovaného prístupu k správe kontextu naprieč AI modelmi, vyhľadávačmi a aplikáciami. |
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Overovanie Entra ID | Microsoft Entra ID poskytuje robustné cloudové riešenie pre správu identít a prístupov, ktoré pomáha zabezpečiť, že iba autorizovaní používatelia a aplikácie môžu komunikovať s vaším MCP serverom. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrácia Microsoft Foundry | Naučte sa, ako integrovať Model Context Protocol servery s Microsoft Foundry agentmi, čo umožňuje výkonnú orchestráciu nástrojov a podnikové AI schopnosti so štandardizovanými pripojeniami na externé dátové zdroje. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Kontext inžinierstvo | Budúce možnosti techník kontext inžinierstva pre MCP servery vrátane optimalizácie kontextu, dynamickej správy kontextu a stratégií efektívneho prompt engineeringu v rámci MCP rámcov. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Vlastný transport | Naučte sa implementovať vlastné transportné mechanizmy pre špecializované komunikačné scenáre MCP. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Funkcie protokolu | Ovládnite pokročilé funkcie protokolu vrátane oznámení o priebehu, zrušenia požiadaviek, šablón zdrojov a vzorov spracovania chýb. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversariálni agenti | Použite dvoch agentov s opačnými postojmi, zdieľajúcich jedinú súpravu MCP nástrojov, aby ste odhalili halucinácie, identifikovali okrajové prípady a vyprodukovali lepšie kalibrované výstupy prostredníctvom štruktúrovanej debaty. |

> **Novinka v MCP špecifikácii 2025-11-25**: Špecifikácia teraz obsahuje experimentálnu podporu pre **Úlohy** (dlhotrvajúce operácie s monitorovaním priebehu), **Anotácie nástrojov** (metadata o správaní nástrojov pre bezpečnosť), **Elicitáciu URL režimu** (vyžiadanie obsahu konkrétnej URL od klientov) a vylepšené **Rooty** (pre správu kontextu pracovného priestoru). Kompletné detaily nájdete v [MCP changeloge špecifikácie](https://spec.modelcontextprotocol.io/).

## Dodatočné odkazy

Pre najaktuálnejšie informácie o pokročilých témach MCP si pozrite:
- [MCP dokumentácia](https://modelcontextprotocol.io/)
- [MCP špecifikácia (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitár](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - bezpečnostné riziká a opatrenia
- [MCP Security Summit workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - praktický bezpečnostný tréning

## Kľúčové poznatky

- Multimodálne implementácie MCP rozširujú AI schopnosti nad rámec spracovania textu
- Škálovateľnosť je nevyhnutná pre podnikové nasadenia a môže sa riešiť horizontálnym a vertikálnym škálovaním
- Komplexné bezpečnostné opatrenia chránia dáta a zabezpečujú správnu kontrolu prístupu
- Podniková integrácia s platformami ako Azure OpenAI a Microsoft AI Foundry rozširuje schopnosti MCP
- Pokročilé implementácie MCP profitujú z optimalizovaných architektúr a starostlivého manažmentu zdrojov

## Cvičenie

Navrhnite podnikové MCP riešenie pre konkrétny prípad použitia:

1. Určte multimodálne požiadavky vášho prípadu použitia
2. Načrtnite bezpečnostné kontroly potrebné na ochranu citlivých dát
3. Navrhnite škálovateľnú architektúru, ktorá zvládne rôzne zaťaženie
4. Naplánujte integračné body s podnikových AI systémami
5. Zdokumentujte možné úzke miesta výkonu a stratégie ich zmiernenia

## Dodatočné zdroje

- [Azure OpenAI dokumentácia](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentácia](https://learn.microsoft.com/en-us/ai-services/)

---

## Čo ďalej

Preskúmajte lekcie v tomto module začínajúc: [5.1 MCP integrácia](./mcp-integration/README.md)

Po dokončení tohto modulu pokračujte na: [Modul 6: Príspevky komunity](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->