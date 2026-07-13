# Køre eksemplet

Her antager vi, at du allerede har en fungerende serverkode. Find venligst en server fra et af de tidligere kapitler.

## Opsæt mcp.json

Her er en fil, som du kan bruge som reference, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Ændr serverindgangen efter behov for at pege på den absolutte sti til din server inklusive den nødvendige fulde kommando for at køre den.

I eksempel filen nævnt ovenfor ser serverindgangen således ud:

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

Du skal måske angive GitHub repository-roden, som kan hentes med kommandoen `git rev-parse --show-toplevel`.

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

Dette svarer til at køre en kommando som: `node build/index.js`.

- Ændr denne serverindgang, så den passer til hvor din serverfil er placeret, eller hvad der er nødvendigt for at starte din server afhængigt af det valgte runtime og serverplacering.

## Brug funktionerne i serveren

- Klik på `play` ikonet, når du har tilføjet *mcp.json* til *./vscode* mappen,

    Bemærk, at værktøjsikonet ændrer sig for at øge antallet af tilgængelige værktøjer. Værktøjsikonet er placeret lige over chatfeltet i GitHub Copilot.

## Kør et værktøj

- Skriv en prompt i din chatvinduet, der matcher beskrivelsen af dit værktøj. For eksempel for at aktivere værktøjet `add` skal du skrive noget som "add 3 to 20".

    Du burde se et værktøj blive præsenteret over chattekstboksen, som indikerer, at du kan vælge at køre værktøjet, som vist i denne visuelle:

    ![VS Code angiver det vil køre et værktøj](../../../../../translated_images/da/vscode-agent.d5a0e0b897331060.webp)

    Hvis du vælger værktøjet, skulle det give et numerisk resultat der siger "23", hvis din prompt var som nævnt tidligere.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->