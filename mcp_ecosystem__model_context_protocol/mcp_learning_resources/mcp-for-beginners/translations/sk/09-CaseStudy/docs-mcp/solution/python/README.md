# Generátor študijného plánu s Chainlit & Microsoft Learn Docs MCP

## Požiadavky

- Python 3.8 alebo novší
- pip (správca balíkov Pythonu)
- Prístup na internet na pripojenie k serveru Microsoft Learn Docs MCP

## Inštalácia

1. Naklonujte si toto úložisko alebo si stiahnite súbory projektu.
2. Nainštalujte potrebné závislosti:

   ```bash
   pip install -r requirements.txt
   ```

## Použitie

### Scenár 1: Jednoduchý dotaz na Docs MCP
Príkazový klient, ktorý sa pripája k serveru Docs MCP, odosiela dotaz a vypisuje výsledok.

1. Spustite skript:
   ```bash
   python scenario1.py
   ```
2. Na výzvu zadajte svoju otázku k dokumentácii.

### Scenár 2: Generátor študijného plánu (webová aplikácia Chainlit)
Webové rozhranie (používajúce Chainlit), ktoré umožňuje používateľom generovať personalizovaný študijný plán týždeň po týždni pre akúkoľvek technickú tému.

1. Spustite aplikáciu Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Otvorte lokálnu URL adresu, ktorú vám terminál poskytne (napr. http://localhost:8000), vo svojom prehliadači.
3. V okne chatu zadajte tému štúdia a počet týždňov, počas ktorých chcete študovať (napr. „AI-900 certifikácia, 8 týždňov“).
4. Aplikácia odpovie študijným plánom týždeň po týždni vrátane odkazov na relevantnú dokumentáciu Microsoft Learn.

**Vyžadované premenné prostredia:**

Ak chcete použiť Scenár 2 (webová aplikácia Chainlit s Azure OpenAI), musíte nastaviť nasledujúce premenné prostredia v súbore `.env` v priečinku `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Vyplňte tieto hodnoty detailmi vášho zdroja Azure OpenAI pred spustením aplikácie.

> [!TIP]
> Svoj vlastný model si môžete jednoducho nasadiť pomocou [Microsoft Foundry](https://ai.azure.com/).

### Scenár 3: Dokumentácia v editore s MCP serverom vo VS Code

Namiesto prepínania záložiek prehliadača pri hľadaní dokumentácie môžete Microsoft Learn Docs priamo priniesť do vášho VS Code pomocou MCP servera. To vám umožní:
- Vyhľadávať a čítať dokumentáciu priamo vo VS Code bez odchodu z prostredia na písanie kódu.
- Odkazovať na dokumentáciu a vkladať odkazy priamo do súborov README alebo kurzov.
- Používať GitHub Copilot a MCP spolu pre hladký pracovný postup s podporou umelej inteligencie.

**Príklady použitia:**
- Rýchlo pridajte referenčné odkazy do README počas písania dokumentácie ku kurzu alebo projektu.
- Použite Copilot na generovanie kódu a MCP na okamžité nájdenie a citovanie relevantnej dokumentácie.
- Zostaňte sústredení vo vašom editore a zvýšte produktivitu.

> [!IMPORTANT]
> Uistite sa, že máte platnú konfiguráciu [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) vo vašom pracovnom priestore (umiestnenie je `.vscode/mcp.json`).

## Prečo Chainlit pre Scenár 2?

Chainlit je moderný open-source rámec na tvorbu konverzačných webových aplikácií. Umožňuje ľahko vytvárať chatové používateľské rozhrania, ktoré sa pripájajú k backendovým službám ako je Microsoft Learn Docs MCP server. Tento projekt používa Chainlit na poskytnutie jednoduchého, interaktívneho spôsobu generovania personalizovaných študijných plánov v reálnom čase. Využitím Chainlit môžete rýchlo vytvárať a nasadzovať chatové nástroje, ktoré zvyšujú produktivitu a učenie.

## Čo toto robí

Táto aplikácia umožňuje používateľom vytvoriť personalizovaný študijný plán tým, že jednoducho zadáte tému a dĺžku štúdia. Aplikácia spracuje váš vstup, požiada Microsoft Learn Docs MCP server o relevantný obsah a usporiada výsledky do štruktúrovaného študijného plánu týždeň po týždni. Odporúčania pre každý týždeň sú zobrazené v chate, čo uľahčuje sledovanie a sledovanie pokroku. Integrácia zabezpečuje, že vždy získate najnovšie a najrelevantnejšie vzdelávacie zdroje.

## Ukážkové otázky

Vyskúšajte tieto otázky v okne chatu, aby ste videli, ako aplikácia odpovedá:

- `AI-900 certifikácia, 8 týždňov`
- `Naučte sa Azure Functions, 4 týždne`
- `Azure DevOps, 6 týždňov`
- `Dátové inžinierstvo na Azure, 10 týždňov`
- `Základy Microsoft bezpečnosti, 5 týždňov`
- `Power Platform, 7 týždňov`
- `Azure AI služby, 12 týždňov`
- `Cloud architektúra, 9 týždňov`

Tieto príklady demonštrujú flexibilitu aplikácie pre rôzne vzdelávacie ciele a časové rámce.

## Odkazy

- [Chainlit dokumentácia](https://docs.chainlit.io/)
- [MCP dokumentácia](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->