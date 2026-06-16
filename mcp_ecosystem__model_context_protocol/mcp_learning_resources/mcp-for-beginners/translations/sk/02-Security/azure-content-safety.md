# Pokročilá MCP bezpečnosť s Azure Content Safety

> **Riziko OWASP MCP riešené**: [MCP06 - Zneužitie toku zámeru](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety poskytuje niekoľko silných nástrojov, ktoré môžu zvýšiť bezpečnosť vašich implementácií MCP. Pre praktické skúsenosti s implementáciou pozrite si [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Ochranné štíty pre výzvy (Prompt Shields)

AI Prompt Shields od spoločnosti Microsoft poskytujú robustnú ochranu pred priamymi aj nepriamymi útokmi založenými na vkladaní výziev prostredníctvom:

1. **Pokročilá detekcia**: Používa strojové učenie na identifikáciu škodlivých pokynov vložených v obsahu.
2. **Zvýraznenie (Spotlighting)**: Transformuje vstupný text, aby AI systémy dokázali rozlíšiť platné pokyny od vonkajších vstupov.
3. **Ohraničenie a označovanie dát (Delimiters and Datamarking)**: Označuje hranice medzi dôveryhodnými a nedôveryhodnými dátami.
4. **Integrácia Content Safety**: Spolupracuje s Azure AI Content Safety na detekciu pokusov o jailbreak a škodlivého obsahu.
5. **Neustále aktualizácie**: Microsoft pravidelne aktualizuje ochranné mechanizmy proti objavujúcim sa hrozbám.

## Implementácia Azure Content Safety s MCP

Tento prístup poskytuje viacvrstvovú ochranu:
- Skenovanie vstupov pred spracovaním
- Overovanie výstupov pred ich vrátením
- Používanie blokovacích zoznamov pre známe škodlivé vzory
- Využitie priebežne aktualizovaných modelov content safety od Azure

## Zdroje pre Azure Content Safety

Ak chcete získať viac informácií o implementácii Azure Content Safety s vašimi MCP servermi, konzultujte tieto oficiálne zdroje:

1. [Azure AI Content Safety Dokumentácia](https://learn.microsoft.com/azure/ai-services/content-safety/) - Oficiálna dokumentácia pre Azure Content Safety.
2. [Dokumentácia Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Naučte sa, ako predchádzať útokom založeným na vkladaní výziev.
3. [Referenčný API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Podrobná referencia API pre implementáciu Content Safety.
4. [Rýchly štart: Azure Content Safety s C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Rýchly sprievodca implementáciou v C#.
5. [Knižnice klientov Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Knižnice klientov pre rôzne programovacie jazyky.
6. [Detekcia pokusov o jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Špecifické pokyny pre detekciu a prevenciu pokusov o jailbreak.
7. [Najlepšie postupy pre Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Najlepšie postupy pre efektívnu implementáciu content safety.

Pre podrobnejšiu implementáciu si pozrite náš [sprievodca implementáciou Azure Content Safety](./azure-content-safety-implementation.md).

## Čo ďalej

- Čítať: [Implementácia Azure Content Safety](./azure-content-safety-implementation.md)
- Návrat na: [Prehľad bezpečnostného modulu](./README.md)
- Pokračovať na: [Modul 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->