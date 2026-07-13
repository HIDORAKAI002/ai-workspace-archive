# Köra exemplet

Här förutsätter vi att du redan har en fungerande serverkod. Vänligen hitta en server från ett av de tidigare kapitlen.

## Konfigurera mcp.json

Här är en fil du använder som referens, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Ändra serverposten efter behov för att peka ut den fullständiga sökvägen till din server inklusive den fullständiga kommandot som behövs för att köra.

I exempel filen som nämns ovan ser serverposten ut så här:

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

Du kan behöva ange GitHub-förvaret root, vilket kan hämtas från kommandot, `git rev-parse --show-toplevel`.

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

Detta motsvarar att köra ett kommando så här: `node build/index.js`.

- Ändra denna serverpost för att passa var din serverfil är placerad eller vad som behövs för att starta din server beroende på din valda runtime och serverplats.

## Använd funktionerna i servern

- Klicka på `play`-ikonen när du har lagt till *mcp.json* i *./vscode*-mappen,

    Observera att verktygsikonen ändras för att öka antalet tillgängliga verktyg. Verktygsikonen finns precis ovanför chattfältet i GitHub Copilot.

## Kör ett verktyg

- Skriv ett kommando i ditt chattfönster som matchar beskrivningen av ditt verktyg. Till exempel för att aktivera verktyget `add`, skriv något som "add 3 to 20".

    Du bör se ett verktyg presenteras ovanför chattens textruta som indikerar att du kan välja att köra verktyget som i denna bild:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/sv/vscode-agent.d5a0e0b897331060.webp)

    Att välja verktyget ska ge ett numeriskt resultat som säger "23" om din prompt var som vi nämnde tidigare.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->