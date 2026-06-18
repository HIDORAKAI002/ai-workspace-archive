# Scenario 3: In-Editor Docs med MCP Server i VS Code

## Oversikt

I dette scenariet vil du lære hvordan du bringer Microsoft Learn Docs direkte inn i Visual Studio Code-miljøet ditt ved hjelp av MCP-serveren. I stedet for å stadig bytte nettleserfaner for å søke etter dokumentasjon, kan du få tilgang til, søke i og referere offisiell dokumentasjon rett inne i redigeringsprogrammet ditt. Denne tilnærmingen strømlinjeformer arbeidsflyten din, holder deg fokusert, og muliggjør sømløs integrasjon med verktøy som GitHub Copilot.

- Søk og les dokumentasjon inne i VS Code uten å forlate kode-miljøet ditt.
- Referer dokumentasjon og sett inn lenker direkte i README- eller kursfiler.
- Bruk GitHub Copilot og MCP sammen for en sømløs, AI-drevet dokumentasjonsarbeidsflyt.

## Læringsmål

Ved slutten av dette kapitlet vil du forstå hvordan du setter opp og bruker MCP-serveren inne i VS Code for å forbedre dokumentasjons- og utviklingsarbeidsflyten din. Du vil kunne:

- Konfigurere arbeidsområdet ditt for å bruke MCP-serveren til dokumentasjonsoppslag.
- Søke i og sette inn dokumentasjon direkte fra VS Code.
- Kombinere kraften i GitHub Copilot og MCP for en mer produktiv, AI-forbedret arbeidsflyt.

Disse ferdighetene vil hjelpe deg med å holde fokus, forbedre dokumentasjonskvaliteten og øke produktiviteten din som utvikler eller teknisk skribent.

## Løsning

For å oppnå dokumentasjonstilgang i redigeringsprogrammet, følger du en serie trinn som integrerer MCP-serveren med VS Code og GitHub Copilot. Denne løsningen er ideell for kursforfattere, dokumentasjonsforfattere og utviklere som ønsker å holde fokus i redigeringsprogrammet mens de arbeider med dokumentasjon og Copilot.

- Legg raskt til referanselenker i en README mens du skriver kurs- eller prosjektdokumentasjon.
- Bruk Copilot til å generere kode og MCP til umiddelbart å finne og sitere relevant dokumentasjon.
- Hold fokus i redigeringsprogrammet og øk produktiviteten.

### Trinn-for-trinn guide

For å komme i gang, følg disse trinnene. For hvert trinn kan du legge til et skjermbilde fra assets-mappen for å illustrere prosessen visuelt.

1. **Legg til MCP-konfigurasjonen:**
   I rotmappen av prosjektet ditt, opprett en `.vscode/mcp.json` fil og legg til følgende konfigurasjon:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Denne konfigurasjonen forteller VS Code hvordan den skal koble til [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Steg 1: Legg til mcp.json i .vscode-mappen](../../../../../../translated_images/no/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Åpne GitHub Copilot Chat-panelet:**
   Hvis du ikke allerede har installert GitHub Copilot-utvidelsen, gå til Utvidelser-visningen i VS Code og installer den. Du kan laste den ned direkte fra [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Åpne deretter Copilot Chat-panelet fra sidelinjen.

   ![Steg 2: Åpne Copilot Chat-panelet](../../../../../../translated_images/no/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Aktiver agentmodus og verifiser verktøy:**
   I Copilot Chat-panelet aktiverer du agentmodus.

   ![Steg 3: Aktiver agentmodus og verifiser verktøy](../../../../../../translated_images/no/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Etter å ha aktivert agentmodus, kontroller at MCP-serveren er listet som et av de tilgjengelige verktøyene. Dette sikrer at Copilot-agenten kan få tilgang til dokumentasjonsserveren for å hente relevant informasjon.
   
   ![Steg 3: Verifiser MCP-serververktøyet](../../../../../../translated_images/no/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Start en ny chat og spør agenten:**
   Åpne en ny chat i Copilot Chat-panelet. Du kan nå stille agenten spørsmål om dokumentasjon. Agenten vil bruke MCP-serveren til å hente og vise relevant Microsoft Learn-dokumentasjon direkte i redigeringsprogrammet ditt.

   - *"Jeg prøver å skrive en studieplan for tema X. Jeg skal studere det i 8 uker, for hver uke, foreslå innhold jeg bør ta."*

   ![Steg 4: Spør agenten i chat](../../../../../../translated_images/no/step4-prompt-chat.12187bb001605efc.webp)

5. **Live-spørring:**

   > La oss ta en live-spørring fra [#get-help](https://discord.gg/D6cRhjHWSC)-seksjonen i Microsoft Foundry Discord ([se originalmelding](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Jeg søker svar på hvordan man distribuerer en multi-agent løsning med AI-agenter utviklet på Azure AI Foundry. Jeg ser at det ikke finnes noen direkte distribusjonsmetode, som Copilot Studio-kanaler. Så, hva er de forskjellige måtene å gjøre denne distribusjonen på for bedriftsbrukere å samhandle og få jobben gjort?
Det finnes mange artikler/blogger som sier at vi kan bruke Azure Bot-tjenesten til å gjøre denne jobben som kan fungere som en bro mellom MS Teams og Azure AI Foundry-agenter, vil dette fungere hvis jeg setter opp en Azure bot som kobler til Orchestrator Agent på Azure AI Foundry via en Azure-funksjon for å utføre orkestreringen, eller må jeg lage en Azure-funksjon for hver av AI-agentene som er en del av multi-agent løsningen for å gjøre orkestreringen i Bot-rammeverket? Andre forslag er hjertelig velkomne."*

   ![Steg 5: Live-spørringer](../../../../../../translated_images/no/step5-live-queries.49db3e4a50bea273.webp)

   Agenten vil svare med relevante dokumentasjonslenker og sammendrag, som du deretter kan sette direkte inn i markdown-filene dine eller bruke som referanser i koden din.
   
### Eksempelspørringer

Her er noen eksempelforespørsler du kan prøve. Disse spørringene vil demonstrere hvordan MCP-serveren og Copilot kan jobbe sammen for å gi umiddelbar, kontekstbevisst dokumentasjon og referanser uten å forlate VS Code:

- "Vis meg hvordan jeg bruker Azure Functions triggers."
- "Sett inn en lenke til den offisielle dokumentasjonen for Azure Key Vault."
- "Hva er beste praksis for å sikre Azure-ressurser?"
- "Finn en quickstart for Azure AI-tjenester."

Disse spørringene vil demonstrere hvordan MCP-serveren og Copilot kan jobbe sammen for å gi umiddelbar, kontekstbevisst dokumentasjon og referanser uten å forlate VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->