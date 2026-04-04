# Implementácia Azure Content Safety s MCP

> **OWASP MCP riešené riziko**: [MCP06 - Injektáž pokynov cez kontextuálne payloady](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Na posilnenie zabezpečenia MCP proti injektáži pokynov, otrave nástrojov a iným špecifickým zraniteľnostiam AI sa dôrazne odporúča integrácia Azure Content Safety. Tento implementačný návod je v súlade s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integrácia s MCP Serverom

Pre integráciu Azure Content Safety s vaším MCP serverom pridajte filter bezpečnosti obsahu ako middleware vo vašom pipeline spracovania požiadaviek:

1. Inicializujte filter počas spúšťania servera
2. Overte všetky prichádzajúce požiadavky nástrojov pred ich spracovaním
3. Skontrolujte všetky odchádzajúce odpovede pred ich odoslaním klientom
4. Logujte a vyhlasujte upozornenia pri porušeniach bezpečnosti
5. Implementujte vhodné ošetrenie chýb pri neúspešných kontrolách bezpečnosti obsahu

Týmto poskytujete robustnú obranu proti:
- útokom injektáže pokynov
- pokusom o otravu nástrojov
- exfiltrácii dát cez škodlivé vstupy
- generovaniu škodlivého obsahu

## Najlepšie praktiky pre integráciu Azure Content Safety

1. **Vlastné blokovacie zoznamy**: Vytvorte vlastné blokovacie zoznamy špecificky pre MCP vzory injektáže
2. **Ladanie závažnosti**: Prispôsobte prahové hodnoty závažnosti podľa vášho konkrétneho použitia a tolerancie rizika
3. **Komplexné pokrytie**: Aplikujte kontroly bezpečnosti obsahu na všetky vstupy a výstupy
4. **Optimalizácia výkonu**: Zvážte implementáciu cachovania pre opakujúce sa kontroly bezpečnosti obsahu
5. **Náhradné mechanizmy**: Definujte jasné náhradné správanie, keď sú služby bezpečnosti obsahu nedostupné
6. **Spätná väzba pre používateľa**: Poskytnite používateľom jasnú spätnú väzbu, keď je obsah zablokovaný z dôvodu bezpečnostných obáv
7. **Priebežné zlepšovanie**: Pravidelne aktualizujte blokovacie zoznamy a vzory na základe nových hrozieb

## Ďalšie zdroje

### OWASP MCP bezpečnostné usmernenia
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexný OWASP MCP Top 10 s implementáciou pre Azure
- [MCP06 - Injektáž pokynov](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Podrobné vzory na zmiernenie injektáže pokynov
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktický Camp 3: I/O Security pokrýva bezpečnosť obsahu

### Dokumentácia Azure
- [Prehľad Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentácia Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Rýchly štart Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Čo nasleduje

- Návrat na: [Prehľad bezpečnostného modulu](./README.md)
- Pokračovať na: [Modul 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:  
Tento dokument bol preložený pomocou služby automatického prekladu AI [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, prosím, berte na vedomie, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne výklady vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->