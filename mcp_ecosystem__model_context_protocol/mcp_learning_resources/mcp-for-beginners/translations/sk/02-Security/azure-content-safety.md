# Pokročilá bezpečnosť MCP s Azure Content Safety

> **Riziko MCP od OWASP riešené**: [MCP06 - Vkladanie príkazov cez kontextové náplne](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety poskytuje niekoľko výkonných nástrojov, ktoré môžu posilniť bezpečnosť vašich implementácií MCP. Pre praktické skúsenosti s implementáciou si pozrite [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Ochrana výziev

Microsoft AI Prompt Shields poskytuje robustnú ochranu pred priamymi aj nepriame vkladanie príkazov do výziev prostredníctvom:

1. **Pokročilá detekcia**: Používa strojové učenie na identifikáciu škodlivých inštrukcií vložených do obsahu.
2. **Zvýraznenie**: Transformuje vstupný text, aby AI systémy vedeli rozlíšiť platné príkazy od externých vstupov.
3. **Oddeľovače a označovanie dát**: Označuje hranice medzi dôveryhodnými a nedôveryhodnými údajmi.
4. **Integrácia Content Safety**: Spolupracuje s Azure AI Content Safety na detekciu pokusov o jailbreak a škodlivý obsah.
5. **Priebežné aktualizácie**: Microsoft pravidelne aktualizuje ochranné mechanizmy proti rastúcim hrozbám.

## Implementácia Azure Content Safety s MCP

Tento prístup poskytuje viacvrstvovú ochranu:
- Skontrolovanie vstupov pred spracovaním
- Overenie výstupov pred vrátením
- Použitie blokovacích zoznamov pre známe škodlivé vzory
- Využitie neustále aktualizovaných modelov content safety od Azure

## Zdroje k Azure Content Safety

Ak chcete zistiť viac o implementácii Azure Content Safety s vašimi MCP servermi, pozrite si tieto oficiálne zdroje:

1. [Documentácia Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Oficiálna dokumentácia Azure Content Safety.
2. [Documentácia Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Naučte sa, ako zabrániť útokom na vkladanie do výziev.
3. [Referenčné API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Podrobná API referencia pre implementáciu Content Safety.
4. [Rýchly štart: Azure Content Safety s C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Rýchly návod na implementáciu v C#.
5. [Knižnice klienta Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Knižnice klienta pre rôzne programovacie jazyky.
6. [Detekcia pokusov o jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Špecifické usmernenia na detekciu a zabránenie jailbreak pokusov.
7. [Najlepšie postupy pre Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Najlepšie postupy pre efektívnu implementáciu content safety.

Pre podrobnejšiu implementáciu si pozrite náš [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Čo ďalej

- Prečítajte si: [Implementácia Azure Content Safety](./azure-content-safety-implementation.md)
- Návrat na: [Prehľad bezpečnostného modulu](./README.md)
- Pokračujte na: [Modul 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, majte prosím na pamäti, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Neručíme za akékoľvek nedorozumenia alebo nesprávne výklady vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->