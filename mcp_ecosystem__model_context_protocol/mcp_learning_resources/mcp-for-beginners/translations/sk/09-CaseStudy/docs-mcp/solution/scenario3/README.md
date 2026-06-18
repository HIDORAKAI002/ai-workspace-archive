# Scenár 3: Dokumentácia v editore s MCP serverom vo VS Code

## Prehľad

V tomto scénari sa naučíte, ako priniesť Microsoft Learn Docs priamo do vášho prostredia Visual Studio Code pomocou MCP servera. Namiesto neustáleho prepínania kariet prehliadača za účelom vyhľadávania dokumentácie môžete priamo vo svojom editore pristupovať, vyhľadávať a odkazovať na oficiálnu dokumentáciu. Tento prístup zefektívňuje váš pracovný tok, udržiava vašu pozornosť a umožňuje bezproblémovú integráciu s nástrojmi ako GitHub Copilot.

- Vyhľadávajte a čítajte dokumenty vo VS Code bez opustenia vášho vývojového prostredia.
- Odkazujte na dokumentáciu a vkladajte odkazy priamo do vašich súborov README alebo kurzov.
- Používajte GitHub Copilot a MCP spolu pre bezproblémový, AI-poháňaný pracovný tok dokumentácie.

## Ciele učenia

Na konci tejto kapitoly budete vedieť, ako nastaviť a používať MCP server vo VS Code na zlepšenie vášho pracovného toku pri dokumentácii a vývoji. Budete schopní:

- Konfigurovať svoje pracovné prostredie na používanie MCP servera pre vyhľadávanie dokumentácie.
- Vyhľadávať a vkladať dokumentáciu priamo z VS Code.
- Kombinovať silu GitHub Copilota a MCP pre produktívnejší, AI-zlepšený pracovný tok.

Tieto zručnosti vám pomôžu zostať sústredení, zlepšiť kvalitu dokumentácie a zvýšiť vašu produktivitu ako vývojára alebo technického spisovateľa.

## Riešenie

Aby ste dosiahli prístup k dokumentácii priamo v editore, prejdete sériou krokov, ktoré integrujú MCP server s VS Code a GitHub Copilotom. Toto riešenie je ideálne pre autorov kurzov, tvorcov dokumentácie a vývojárov, ktorí chcú ostať sústredení v editore počas práce s dokumentáciou a Copilotom.

- Rýchlo pridajte odkazy na referencie do README počas písania kurzu alebo projektovej dokumentácie.
- Použite Copilota na generovanie kódu a MCP na okamžité vyhľadanie a citovanie relevantnej dokumentácie.
- Zostaňte sústredení vo svojom editore a zvýšte produktivitu.

### Podrobný návod krok za krokom

Ak chcete začať, postupujte podľa týchto krokov. Ku každému kroku môžete pridať snímku obrazovky z priečinka assets na vizuálne zobrazenie postupu.

1. **Pridajte konfiguráciu MCP:**
   V koreňovom adresári vášho projektu vytvorte súbor `.vscode/mcp.json` a pridajte nasledujúcu konfiguráciu:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Táto konfigurácia hovorí VS Code, ako sa pripojiť k [`Microsoft Learn Docs MCP serveru`](https://github.com/MicrosoftDocs/mcp).
   
   ![Krok 1: Pridanie mcp.json do priečinka .vscode](../../../../../../translated_images/sk/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Otvorte panel GitHub Copilot Chat:**
   Ak ešte nemáte nainštalované rozšírenie GitHub Copilot, prejdite do zobrazenia Rozšírenia vo VS Code a nainštalujte ho. Môžete ho stiahnuť priamo z [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Potom otvorte panel Copilot Chat z bočného panela.

   ![Krok 2: Otvorenie panela Copilot Chat](../../../../../../translated_images/sk/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Povolenie režimu agenta a overenie nástrojov:**
   V paneli Copilot Chat povolte režim agenta.

   ![Krok 3: Povolenie režimu agenta a overenie nástrojov](../../../../../../translated_images/sk/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Po povolení režimu agenta overte, či je MCP server uvedený medzi dostupnými nástrojmi. To zabezpečí, že Copilot agent bude mať prístup k serveru dokumentácie na získanie relevantných informácií.
   
   ![Krok 3: Overenie MCP server nástroja](../../../../../../translated_images/sk/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Spustite nový chat a zobrazte dotaz agentovi:**
   Otvorte nový chat v paneli Copilot Chat. Teraz môžete agentovi klásť otázky týkajúce sa dokumentácie. Agent použije MCP server na získanie a zobrazenie relevantnej Microsoft Learn dokumentácie priamo vo vašom editore.

   - *„Snažím sa napísať študijný plán pre tému X. Budem ju študovať 8 týždňov, pre každý týždeň navrhni obsah, ktorý by som mal prebrať.“*

   ![Krok 4: Zadanie otázky agentovi v chate](../../../../../../translated_images/sk/step4-prompt-chat.12187bb001605efc.webp)

5. **Živý dotaz:**

   > Vezmime si živý dotaz zo sekcie [#get-help](https://discord.gg/D6cRhjHWSC) v Microsoft Foundry Discorde ([zobraziť pôvodnú správu](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *„Hľadám odpovede na to, ako nasadiť multi-agentné riešenie s AI agentmi vyvinutými na Azure AI Foundry. Vidím, že neexistuje priama metóda nasadenia, ako napríklad kanály Copilot Studio. Aké sú teda rôzne spôsoby, ako dosiahnuť toto nasadenie pre podnikových používateľov, aby mohli komunikovať a vykonávať prácu?
Existuje mnoho článkov/blogov, ktoré hovoria, že môžeme použiť službu Azure Bot na splnenie tejto úlohy, ktorá môže fungovať ako most medzi MS Teams a Azure AI Foundry agentmi, bude to fungovať, ak nastavím Azure bota, ktorý sa pripojí k Orchestrator Agentovi na Azure AI Foundry cez Azure funkciu na vykonanie orchestrace, alebo musím vytvoriť Azure funkciu pre každého AI agenta v multi-agentnom riešení na orchestráciu v rámci Bot frameworku? Každé ďalšie návrhy sú vítané.“*

   ![Krok 5: Živé dotazy](../../../../../../translated_images/sk/step5-live-queries.49db3e4a50bea273.webp)

   Agent odpovie s relevantnými odkazmi na dokumentáciu a zhrnutiami, ktoré potom môžete priamo vložiť do svojich markdown súborov alebo použiť ako odkazy vo vašom kóde.
   
### Ukážkové dotazy

Tu je niekoľko príkladov dotazov, ktoré môžete vyskúšať. Tieto dotazy ukážu, ako MCP server a Copilot môžu spolupracovať na poskytnutí okamžitej, kontextovo uvedomelej dokumentácie a referencií bez opustenia VS Code:

- „Ukáž mi, ako používať spúšťače Azure Functions.“
- „Vlož odkaz na oficiálnu dokumentáciu pre Azure Key Vault.“
- „Aké sú najlepšie postupy na zabezpečenie zdrojov Azure?“
- „Nájdi rýchly štart pre Azure AI služby.“

Tieto dotazy demonštrujú, ako MCP server a Copilot môžu spolu poskytovať okamžitú, kontextovo citlivú dokumentáciu a odkazy bez nutnosti opustiť VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->