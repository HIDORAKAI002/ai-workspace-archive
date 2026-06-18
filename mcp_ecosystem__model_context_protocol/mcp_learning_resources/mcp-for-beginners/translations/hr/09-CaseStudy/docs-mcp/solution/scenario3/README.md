# Scenario 3: Dokumentacija unutar uređivača s MCP serverom u VS Code-u

## Pregled

U ovom scenariju naučit ćete kako donijeti Microsoft Learn dokumentaciju izravno u vaše Visual Studio Code okruženje koristeći MCP server. Umjesto stalnog prebacivanja između kartica preglednika u potrazi za dokumentacijom, možete pristupati, pretraživati i referencirati službenu dokumentaciju izravno unutar vašeg uređivača. Ovakav pristup pojednostavljuje vaš tijek rada, omogućuje vam da ostanete usredotočeni i omogućuje besprijekornu integraciju s alatima poput GitHub Copilota.

- Pretražujte i čitajte dokumentaciju unutar VS Code-a bez napuštanja okruženja za kodiranje.
- Referencirajte dokumentaciju i umetnite poveznice izravno u svoje README ili datoteke tečajeva.
- Koristite GitHub Copilot i MCP zajedno za besprijekoran tijek rada s podrškom umjetne inteligencije.

## Ciljevi učenja

Na kraju ovog poglavlja razumjet ćete kako postaviti i koristiti MCP server unutar VS Code-a za unapređenje tijeka rada s dokumentacijom i razvojem. Moći ćete:

- Konfigurirati svoje radno okruženje za korištenje MCP servera za pretraživanje dokumentacije.
- Pretraživati i umetati dokumentaciju izravno iz VS Code-a.
- Kombinirati snagu GitHub Copilota i MCP-a za produktivniji, AI-pojačan tijek rada.

Ove vještine pomoći će vam da ostanete fokusirani, poboljšate kvalitetu dokumentacije i povećate svoju produktivnost kao programer ili tehnički pisac.

## Rješenje

Kako biste omogućili pristup dokumentaciji unutar uređivača, slijedit ćete niz koraka koji integriraju MCP server s VS Code-om i GitHub Copilotom. Ovo je rješenje idealno za autore tečajeva, pisce dokumentacije i programere koji žele zadržati fokus u uređivaču dok rade s dokumentacijom i Copilotom.

- Brzo dodajte referentne poveznice u README prilikom pisanja tečaja ili projektne dokumentacije.
- Koristite Copilot za generiranje koda, a MCP za trenutno pronalaženje i citiranje relevantne dokumentacije.
- Ostanite fokusirani u uređivaču i povećajte produktivnost.

### Vodič korak-po-korak

Za početak slijedite ove korake. Za svaki korak možete dodati snimku zaslona iz mape assets kako biste vizualno ilustrirali proces.

1. **Dodajte MCP konfiguraciju:**
   U korijenu svog projekta kreirajte datoteku `.vscode/mcp.json` i dodajte sljedeću konfiguraciju:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Ova konfiguracija govori VS Code-u kako se spojiti na [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Korak 1: Dodajte mcp.json u .vscode mapu](../../../../../../translated_images/hr/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Otvorite GitHub Copilot Chat ploču:**
   Ako još nemate instaliranu GitHub Copilot ekstenziju, idite na prikaz ekstenzija u VS Code-u i instalirajte je. Možete je preuzeti direktno s [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Zatim otvorite Copilot Chat ploču sa bočne trake.

   ![Korak 2: Otvorite Copilot Chat ploču](../../../../../../translated_images/hr/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Omogućite agent način i provjerite alate:**
   U Copilot Chat ploči omogućite agent način rada.

   ![Korak 3: Omogućite agent način i provjerite alate](../../../../../../translated_images/hr/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Nakon omogućavanja agent načina, provjerite da je MCP server naveden među dostupnim alatima. To osigurava da Copilot agent može pristupiti dokumentacijskom serveru kako bi dohvatilo relevantne informacije.
   
   ![Korak 3: Provjera MCP server alata](../../../../../../translated_images/hr/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Pokrenite novi chat i postavite upit agentu:**
   Otvorite novi chat u Copilot Chat ploči. Sada možete postavljati agentu upite vezane uz dokumentaciju. Agent će koristiti MCP server za dohvat i prikaz relevantne Microsoft Learn dokumentacije izravno u vašem uređivaču.

   - *"Pokušavam sastaviti plan učenja za temu X. Planiram je proučavati 8 tjedana, za svaki tjedan predloži sadržaj koji bih trebao proći."*

   ![Korak 4: Postavite upit agentu u chatu](../../../../../../translated_images/hr/step4-prompt-chat.12187bb001605efc.webp)

5. **Upit uživo:**

   > Pogledajmo upit uživo s odjela [#get-help](https://discord.gg/D6cRhjHWSC) u Microsoft Foundry Discord serveru ([prikaži izvornu poruku](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Tražim odgovore o tome kako implementirati multi-agentno rješenje s AI agentima razvijenim na Azure AI Foundry platformi. Vidim da nema direktne metode implementacije, poput Copilot Studio kanala. Koji su različiti načini za implementaciju za poslovne korisnike da bi mogli komunicirati i obaviti posao? Postoji mnogo članaka/blogova koji kažu da možemo koristiti Azure Bot servis koji može djelovati kao most između MS Teams i Azure AI Foundry agenata, hoće li ovo funkcionirati ako postavim Azure bot koji se spaja na Orchestrator agenta na Azure AI Foundry putem Azure funkcije za izvođenje orkestracije ili moram napraviti Azure funkciju za svakog AI agenta u multi-agentnom rješenju za orkestraciju u Bot Frameworku? Sve druge prijedloge su dobrodošle."*

   ![Korak 5: Upiti uživo](../../../../../../translated_images/hr/step5-live-queries.49db3e4a50bea273.webp)

   Agent će odgovoriti s relevantnim poveznicama na dokumentaciju i sažecima, koje možete izravno umetnuti u svoje markdown datoteke ili koristiti kao reference u svom kodu.
   
### Primjeri upita

Evo nekoliko primjera upita koje možete isprobati. Ovi upiti demonstriraju kako MCP server i Copilot mogu zajedno raditi na pružanju trenutne, kontekstualno osviještene dokumentacije i referenci bez napuštanja VS Code-a:

- "Pokaži mi kako koristiti Azure Functions trigger-e."
- "Umetni poveznicu na službenu dokumentaciju za Azure Key Vault."
- "Koje su najbolje prakse za osiguranje Azure resursa?"
- "Pronađi startni vodič za Azure AI servise."

Ovi upiti prikazat će kako MCP server i Copilot mogu funkcionirati zajedno i pružiti brzu, kontekstualno relevantnu dokumentaciju i reference bez napuštanja VS Code-a.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->