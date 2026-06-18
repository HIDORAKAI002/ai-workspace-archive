# Studieplangenerator med Chainlit & Microsoft Learn Docs MCP

## Forudsætninger

- Python 3.8 eller nyere
- pip (Python-pakkehåndtering)
- Internetadgang for at oprette forbindelse til Microsoft Learn Docs MCP-serveren

## Installation

1. Klon dette repository eller download projektfilerne.
2. Installer de nødvendige afhængigheder:

   ```bash
   pip install -r requirements.txt
   ```

## Brug

### Scenario 1: Simpel forespørgsel til Docs MCP
En kommandolinjeklient, der opretter forbindelse til Docs MCP-serveren, sender en forespørgsel og udskriver resultatet.

1. Kør scriptet:
   ```bash
   python scenario1.py
   ```
2. Indtast dit dokumentationsspørgsmål ved prompten.

### Scenario 2: Studieplangenerator (Chainlit Web App)
En webbaseret grænseflade (ved brug af Chainlit), der tillader brugere at generere en personlig, uge-for-uge studieplan for ethvert teknisk emne.

1. Start Chainlit-appen:
   ```bash
   chainlit run scenario2.py
   ```
2. Åbn den lokale URL, som vises i din terminal (f.eks. http://localhost:8000) i din browser.
3. Indtast i chatvinduet dit studiemne og antal uger, du ønsker at studere (f.eks. "AI-900 certificering, 8 uger").
4. Appen vil svare med en uge-for-uge studieplan, inklusiv links til relevant Microsoft Learn-dokumentation.

**Påkrævede miljøvariable:**

For at bruge Scenario 2 (Chainlit webapp med Azure OpenAI) skal du sætte følgende miljøvariable i en `.env`-fil i `python`-mappen:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Udfyld disse værdier med dine Azure OpenAI-ressourcedetaljer før du kører appen.

> [!TIP]
> Du kan nemt udrulle dine egne modeller ved brug af [Microsoft Foundry](https://ai.azure.com/).

### Scenario 3: Dokumentation i editoren med MCP-server i VS Code

I stedet for at skifte browserfaner for at søge i dokumentationen, kan du hente Microsoft Learn Docs direkte ind i din VS Code via MCP-serveren. Dette giver dig mulighed for at:
- Søge og læse dokumentation direkte i VS Code uden at forlade dit kode-miljø.
- Referere til dokumentation og indsætte links direkte i dine README- eller kursusfiler.
- Bruge GitHub Copilot og MCP sammen for en problemfri AI-drevet dokumentationsarbejdsgang.

**Eksempler på brugssituationer:**
- Tilføje referencelinks hurtigt til et README, mens du skriver kursus- eller projekt-dokumentation.
- Bruge Copilot til at generere kode og MCP til straks at finde og citere relevante dokumenter.
- Forblive fokuseret i editoren og øge produktiviteten.

> [!IMPORTANT]
> Sørg for, at du har en gyldig [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) konfiguration i dit workspace (placering er `.vscode/mcp.json`).

## Hvorfor Chainlit til Scenario 2?

Chainlit er et moderne open source-framework til at bygge konverserende webapplikationer. Det gør det nemt at skabe chat-baserede brugerflader, som forbinder til backend-tjenester som Microsoft Learn Docs MCP-serveren. Dette projekt bruger Chainlit til at tilbyde en simpel, interaktiv måde at generere personlige studieplaner i realtid. Ved at udnytte Chainlit kan du hurtigt bygge og deployere chat-baserede værktøjer, der øger produktivitet og læring.

## Hvad denne app gør

Denne app giver brugere mulighed for at oprette en personlig studieplan ved blot at indtaste et emne og en varighed. Appen analyserer din input, forespørger Microsoft Learn Docs MCP-serveren for relevant indhold og organiserer resultaterne i en struktureret uge-for-uge plan. Hver uges anbefalinger vises i chatten, hvilket gør det nemt at følge og tracke din fremgang. Integration sikrer, at du altid får de nyeste og mest relevante læringsressourcer.

## Eksempelspørgsmål

Prøv disse forespørgsler i chatvinduet for at se, hvordan appen svarer:

- `AI-900 certificering, 8 uger`
- `Lær Azure Functions, 4 uger`
- `Azure DevOps, 6 uger`
- `Data engineering på Azure, 10 uger`
- `Microsoft sikkerhedsgrundlag, 5 uger`
- `Power Platform, 7 uger`
- `Azure AI-tjenester, 12 uger`
- `Cloud-arkitektur, 9 uger`

Disse eksempler viser appens fleksibilitet for forskellige læringsmål og tidsrammer.

## Referencer

- [Chainlit Dokumentation](https://docs.chainlit.io/)
- [MCP Dokumentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->