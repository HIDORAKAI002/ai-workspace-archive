# Implementácia Azure Content Safety s MCP

> **OWASP MCP riešené riziko**: [MCP06 - Úmyselná manipulácia príkazov (Intent Flow Subversion)](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Na posilnenie bezpečnosti MCP proti injektácii príkazov, otrave nástrojov a ďalším špecifickým zraniteľnostiam AI sa vysoko odporúča integrácia Azure Content Safety. Tento implementačný návod je v súlade s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integrácia s MCP serverom

Na integráciu Azure Content Safety s vaším MCP serverom pridajte filter obsahovej bezpečnosti ako middleware do vášho spracovateľského reťazca požiadaviek:

1. Inicializujte filter pri štarte servera  
2. Overte všetky prichádzajúce požiadavky na nástroje pred spracovaním  
3. Skontrolujte všetky odchádzajúce odpovede pred ich odoslaním klientom  
4. Zaznamenávajte a varujte pri porušeniach bezpečnosti  
5. Implementujte vhodné spracovanie chýb pre neúspešné kontroly obsahovej bezpečnosti  

Týmto zabezpečíte robustnú ochranu proti:  
- útokom prostredníctvom injektáže príkazov  
- pokusom o otravu nástrojov  
- úniku dát cez škodlivé vstupy  
- generovaniu škodlivého obsahu  

## Najlepšie praktiky pre integráciu Azure Content Safety

1. **Vlastné blokovacie zoznamy**: Vytvorte vlastné blokovacie zoznamy špecificky pre MCP vzory injektáže  
2. **Ladenie závažnosti**: Nastavte prahové hodnoty závažnosti podľa vášho konkrétneho prípadu použitia a tolerancie rizika  
3. **Komplexné pokrytie**: Používajte kontroly obsahovej bezpečnosti na všetky vstupy i výstupy  
4. **Optimalizácia výkonu**: Zvážte implementáciu cachovania pre opakované kontroly obsahovej bezpečnosti  
5. **Náhradné mechanizmy**: Definujte jasné záložné správanie, keď služby obsahovej bezpečnosti nie sú dostupné  
6. **Spätná väzba používateľom**: Poskytnite používateľom jasnú spätnú väzbu pri blokovaní obsahu z dôvodu bezpečnosti  
7. **Neustále zlepšovanie**: Pravidelne aktualizujte blokovacie zoznamy a vzory na základe nových hrozieb  

## Dodatočné zdroje

### OWASP MCP bezpečnostné usmernenia
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexný OWASP MCP Top 10 s implementáciou v Azure  
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Podrobné vzory na zmiernenie injektáže príkazov  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktický Camp 3: I/O Security pokrýva obsahovú bezpečnosť  

### Dokumentácia Azure
- [Prehľad Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Dokumentácia Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Rýchly štart Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Čo ďalej

- Návrat na: [Prehľad bezpečnostného modulu](./README.md)  
- Pokračovať na: [Modul 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->