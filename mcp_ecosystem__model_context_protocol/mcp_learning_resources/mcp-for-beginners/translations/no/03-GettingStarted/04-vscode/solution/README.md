# Kjøre eksempelet

Her antar vi at du allerede har en fungerende serverkode. Vennligst finn en server fra et av de tidligere kapitlene.

## Sett opp mcp.json

Her er en fil du kan bruke som referanse, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Endre serveroppføringen etter behov for å peke til den absolutte banen til serveren din, inkludert den nødvendige fullstendige kommandoen for å kjøre den.

I eksempelfilen nevnt over ser serveroppføringen slik ut:

<details>
<summary>node.js</summary>
```json
"hello-mcp": {
    "command": "node",
    "args": [
        "build/index.js"
    ]
}
```
</details>

<details>
<summary>.NET</summary>

Du må kanskje angi GitHub-repositoriets rotmappe, som kan hentes med kommandoen `git rev-parse --show-toplevel`.

```jsonc
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repository-root",
      "description": "The absolute path to the repository root"
    }
  ],
  "servers": {
    "calculator-mcp-dotnet": {
      "type": "stdio",
      "command": "dotnet",
      "args": [
        "run",
        "--project",
        "${input:repository-root}/03-GettingStarted/02-client/solution/server/server.csproj"
      ]
    }
  }
}
```

</details>

Dette tilsvarer å kjøre en kommando som: `node build/index.js`.

- Endre denne serveroppføringen slik at den passer til hvor serverfilen din er plassert, eller til det som trengs for å starte serveren, avhengig av valgt runtime og serverplassering.

## Bruk funksjonene i serveren

- Klikk på `play`-ikonet når du har lagt til *mcp.json* i *./vscode*-mappen,

    Observer at verktøyikonet endres og øker antallet tilgjengelige verktøy. Verktøyikonet finner du rett over chattefeltet i GitHub Copilot.

## Kjøre et verktøy

- Skriv inn et prompt i chattevinduet ditt som samsvarer med beskrivelsen av verktøyet ditt. For eksempel, for å aktivere verktøyet `add` skriv noe som "add 3 to 20".

    Du skal se et verktøy bli presentert over tekstboksen i chatten som indikerer at du kan velge å kjøre verktøyet, slik som i dette bildet:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/no/vscode-agent.d5a0e0b897331060.webp)

    Å velge verktøyet bør gi et numerisk resultat som sier "23" hvis prompten din var som nevnt tidligere.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->