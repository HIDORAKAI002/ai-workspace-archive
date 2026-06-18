# Scenarij 3: Dokumentacija v urejevalniku z MCP strežnikom v VS Code

## Pregled

V tem scenariju se boste naučili, kako v svojo okolje Visual Studio Code neposredno vključiti Microsoft Learn Docs z uporabo MCP strežnika. Namesto stalnega preklapljanja med zavihki v brskalniku za iskanje dokumentacije lahko do uradne dokumentacije dostopate, jo iščete in sklicujete neposredno znotraj svojega urejevalnika. Ta pristop poenostavi vaš delovni tok, vas ohranja osredotočene in omogoča brezhibno integracijo z orodji, kot je GitHub Copilot.

- Iskanje in branje dokumentacije znotraj VS Code brez zapuščanja razvojnega okolja.
- Sklicevanje dokumentacije in vstavljanje povezav neposredno v vašo README ali datoteke tečajev.
- Uporaba GitHub Copilot in MCP skupaj za tekoč in umetni inteligenci podprt delovni tok dokumentacije.

## Cilji učenja

Na koncu tega poglavja boste razumeli, kako nastaviti in uporabljati MCP strežnik znotraj VS Code za izboljšanje vašega delovnega toka z dokumentacijo in razvojem. Naučili se boste:

- Konfigurirati svoje delovno okolje za uporabo MCP strežnika za iskanje dokumentacije.
- Iskati in vstaviti dokumentacijo neposredno iz VS Code.
- Združiti moč GitHub Copilot in MCP za bolj produktiven, z umetno inteligenco podprt delovni tok.

Te veščine vam bodo pomagale ostati osredotočeni, izboljšati kakovost dokumentacije in povečati vašo produktivnost kot razvijalec ali tehnični pisec.

## Rešitev

Za dostop do dokumentacije v urejevalniku boste sledili nizu korakov, ki integrirajo MCP strežnik z VS Code in GitHub Copilot. Ta rešitev je idealna za avtorje tečajev, pisce dokumentacije in razvijalce, ki želijo ohraniti osredotočenost v urejevalniku med delom z dokumentacijo in Copilotom.

- Hitro dodajanje referenčnih povezav v README med pisanjem dokumentacije za tečaj ali projekt.
- Uporaba Copilota za generiranje kode in MCP za takojšnjo najdbo in citiranje relevantne dokumentacije.
- Ostanite osredotočeni v svojem urejevalniku in povečajte produktivnost.

### Korak po korak vodič

Za začetek sledite tem korakom. Za vsak korak lahko dodate posnetek zaslona iz mape z viri, da proces vizualno ponazorite.

1. **Dodajte konfiguracijo MCP:**
   V korenski mapi svojega projekta ustvarite datoteko `.vscode/mcp.json` in dodajte naslednjo konfiguracijo:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Ta konfiguracija pove VS Code, kako se povezati z [`Microsoft Learn Docs MCP strežnikom`](https://github.com/MicrosoftDocs/mcp).
   
   ![Korak 1: Dodajte mcp.json v mapo .vscode](../../../../../../translated_images/sl/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Odprite ploščo GitHub Copilot Chat:**
   Če še nimate nameščene razširitve GitHub Copilot, pojdite v pogled Razširitve v VS Code in jo namestite. Lahko jo prenesete neposredno z [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Nato odprite ploščo Copilot Chat iz stranske vrstice.

   ![Korak 2: Odprite ploščo Copilot Chat](../../../../../../translated_images/sl/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Omogočite agentni način in preverite orodja:**
   V plošči Copilot Chat omogočite agentni način.

   ![Korak 3: Omogočite agentni način in preverite orodja](../../../../../../translated_images/sl/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Po omogočitvi agentnega načina preverite, ali je MCP strežnik naveden med razpoložljivimi orodji. To zagotavlja, da lahko Copilot agent dostopa do strežnika dokumentacije za pridobivanje relevantnih informacij.
   
   ![Korak 3: Preverite MCP strežnik kot orodje](../../../../../../translated_images/sl/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Začnite nov pogovor in spodbudite agenta:**
   Odprite nov pogovor v plošči Copilot Chat. Zdaj lahko agenta spodbudite z vprašanji o dokumentaciji. Agent bo uporabil MCP strežnik, da bo neposredno v vašem urejevalniku pridobil in prikazal ustrezno Microsoft Learn dokumentacijo.

   - *"Poskušam napisati študijski načrt za temo X. Namenjen bom študiju 8 tednov, za vsak teden predlagaj vsebino, ki bi jo moral vključiti."*

   ![Korak 4: Spodbudite agenta v pogovoru](../../../../../../translated_images/sl/step4-prompt-chat.12187bb001605efc.webp)

5. **Zahteva v živo:**

   > Vzemimo zahtevo v živo iz oddelka [#get-help](https://discord.gg/D6cRhjHWSC) v Microsoft Foundry Discordu ([poglej izvirno sporočilo](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Iščem odgovore na to, kako izvajati rešitev z več agenti z AI agenti, razvitimi na Azure AI Foundry. Vidim, da ni neposredne metode za izvajanje, kot so kanali Copilot Studio. Kakšni so različni načini za izvajanje tega za enterprise uporabnike, da lahko sodelujejo in opravijo delo?
Obstajajo številni članki/blogi, ki pravijo, da lahko uporabimo Azure Bot storitev za to delo, ki lahko deluje kot most med MS Teams in Azure AI Foundry Agenti, bo to delovalo, če nastavim Azure bota, ki se poveže z Orchestrator agentom na Azure AI Foundry preko Azure funkcije za izvedbo orkestracije ali moram ustvariti Azure funkcijo za vsakega od AI agentov, ki so del rešitve z več agenti, da opravim orkestracijo v okviru Bot Framework? Kakršni koli drugi predlogi so zelo dobrodošli.
"*

   ![Korak 5: Zahteve v živo](../../../../../../translated_images/sl/step5-live-queries.49db3e4a50bea273.webp)

   Agent bo odgovoril z ustreznimi povezavami do dokumentacije in povzetki, ki jih nato lahko neposredno vstavite v svoje markdown datoteke ali uporabite kot reference v svoji kodi.
   
### Primeri poizvedb

Tukaj je nekaj primerov poizvedb, ki jih lahko preizkusite. Te poizvedbe bodo pokazale, kako MCP strežnik in Copilot skupaj omogočata takojšnjo, kontekstualno zavestno dokumentacijo in reference brez zapuščanja VS Code:

- "Pokaži mi, kako uporabljati sprožilce Azure Functions."
- "Vstavi povezavo do uradne dokumentacije za Azure Key Vault."
- "Kakšne so najboljše prakse za varovanje virov v Azure?"
- "Najdi quickstart za Azure AI storitve."

Te poizvedbe bodo pokazale, kako MCP strežnik in Copilot skupaj omogočata takojšnjo, kontekstualno zavestno dokumentacijo in reference brez zapuščanja VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->