# De sample draaien

Hier gaan we ervan uit dat je al werkende server code hebt. Zoek een server uit een van de eerdere hoofdstukken.

## Stel mcp.json in

Hier is een bestand dat je als referentie gebruikt, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Pas de server entry aan indien nodig om het absolute pad naar je server aan te geven inclusief de volledige benodigde opdracht om te starten.

In het voorbeeldbestand hierboven ziet de server entry er als volgt uit:

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

Je moet mogelijk de root van de GitHub repository invoeren, die kan worden opgehaald met het commando `git rev-parse --show-toplevel`.

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

Dit komt overeen met het uitvoeren van een opdracht zoals: `node build/index.js`.

- Pas deze server entry aan zodat deze past bij waar je serverbestand zich bevindt of wat er nodig is om je server te starten, afhankelijk van de runtime en serverlocatie die je hebt gekozen.

## Gebruik de functionaliteiten in de server

- Klik op het `play` icoon zodra je *mcp.json* hebt toegevoegd aan de *./vscode* map,

    Zie dat het tool-icoon verandert om het aantal beschikbare tools te vergroten. Het tool-icoon bevindt zich direct boven het chatveld in GitHub Copilot.

## Een tool uitvoeren

- Typ een prompt in je chatvenster die overeenkomt met de beschrijving van je tool. Bijvoorbeeld om de tool `add` te starten typ iets als "add 3 to 20".

    Je zou een tool boven het tekstvak van de chat moeten zien worden gepresenteerd die je vraagt deze tool te selecteren om uit te voeren, zoals in deze afbeelding:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/nl/vscode-agent.d5a0e0b897331060.webp)

    Het selecteren van de tool zou een numeriek resultaat moeten opleveren met de waarde "23" als je prompt was zoals hierboven aangegeven.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->