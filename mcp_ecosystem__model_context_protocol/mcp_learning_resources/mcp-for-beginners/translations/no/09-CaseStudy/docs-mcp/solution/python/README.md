# Studieplan-generator med Chainlit og Microsoft Learn Docs MCP

## Forutsetninger

- Python 3.8 eller høyere
- pip (Python pakkebehandler)
- Internett-tilgang for å koble til Microsoft Learn Docs MCP-serveren

## Installasjon

1. Klon dette depotet eller last ned prosjektfilene.
2. Installer de nødvendige avhengighetene:

   ```bash
   pip install -r requirements.txt
   ```

## Bruk

### Scenario 1: Enkel forespørsel til Docs MCP
En kommandolinjeklient som kobler til Docs MCP-serveren, sender en forespørsel og skriver ut resultatet.

1. Kjør skriptet:
   ```bash
   python scenario1.py
   ```
2. Skriv inn dokumentasjonsspørsmålet ditt ved ledeteksten.

### Scenario 2: Studieplan-generator (Chainlit Web-app)
Et nettbasert grensesnitt (ved bruk av Chainlit) som lar brukere generere en personlig, uke-for-uke studieplan for et teknisk emne.

1. Start Chainlit-appen:
   ```bash
   chainlit run scenario2.py
   ```
2. Åpne den lokale URL-en som vises i terminalen (f.eks. http://localhost:8000) i nettleseren din.
3. I chatte-vinduet skriver du inn studietemaet ditt og antall uker du vil studere (f.eks. "AI-900 sertifisering, 8 uker").
4. Appen svarer med en uke-for-uke studieplan, inkludert lenker til relevant Microsoft Learn-dokumentasjon.

**Miljøvariabler som kreves:**

For å bruke Scenario 2 (Chainlit web-app med Azure OpenAI) må du sette følgende miljøvariabler i en `.env`-fil i `python`-katalogen:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Fyll inn disse verdiene med dine Azure OpenAI-ressursdetaljer før du kjører appen.

> [!TIP]
> Du kan enkelt distribuere dine egne modeller ved hjelp av [Microsoft Foundry](https://ai.azure.com/).

### Scenario 3: Dokumentasjon i redigeringsprogrammet med MCP-server i VS Code

I stedet for å bytte nettleserfaner for å søke i dokumentasjon, kan du bringe Microsoft Learn Docs direkte inn i VS Code ved å bruke MCP-serveren. Dette gjør at du kan:
- Søke og lese dokumentasjon inne i VS Code uten å forlate kode-miljøet ditt.
- Referere til dokumentasjon og sette inn lenker direkte i README- eller kursfiler.
- Bruke GitHub Copilot og MCP sammen for en sømløs, AI-drevet dokumentasjonsflyt.

**Eksempler på brukstilfeller:**
- Legg raskt til referanselenker i en README mens du skriver kurs- eller prosjekt-dokumentasjon.
- Bruk Copilot for å generere kode og MCP for å umiddelbart finne og sitere relevant dokumentasjon.
- Hold fokus i editoren og øk produktiviteten.

> [!IMPORTANT]
> Sørg for at du har en gyldig [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) konfigurasjon i arbeidsområdet ditt (plassering er `.vscode/mcp.json`).

## Hvorfor Chainlit for Scenario 2?

Chainlit er et moderne open-source rammeverk for å bygge konversasjonelle webapplikasjoner. Det gjør det enkelt å lage chattebaserte brukergrensesnitt som kobles til backend-tjenester som Microsoft Learn Docs MCP-serveren. Dette prosjektet bruker Chainlit for å tilby en enkel, interaktiv måte å generere personlige studieplaner i sanntid på. Ved å bruke Chainlit kan du raskt bygge og distribuere chattebaserte verktøy som øker produktiviteten og læringen.

## Hva dette gjør

Denne appen lar brukere lage en personlig studieplan ved enkelt å skrive inn et tema og en varighet. Appen analyserer innputten, sender en forespørsel til Microsoft Learn Docs MCP-serveren for relevant innhold, og organiserer resultatene i en strukturert uke-for-uke plan. Anbefalingene for hver uke vises i chatten, noe som gjør det lett å følge og holde oversikt over fremgangen. Integrasjonen sikrer at du alltid får de nyeste og mest relevante læringsressursene.

## Eksempelforespørsler

Prøv disse forespørslene i chatte-vinduet for å se hvordan appen svarer:

- `AI-900 sertifisering, 8 uker`
- `Lær Azure Functions, 4 uker`
- `Azure DevOps, 6 uker`
- `Data engineering på Azure, 10 uker`
- `Microsoft sikkerhetsgrunnlag, 5 uker`
- `Power Platform, 7 uker`
- `Azure AI-tjenester, 12 uker`
- `Skyarkitektur, 9 uker`

Disse eksemplene viser appens fleksibilitet for ulike læringsmål og tidsrammer.

## Referanser

- [Chainlit-dokumentasjon](https://docs.chainlit.io/)
- [MCP-dokumentasjon](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->