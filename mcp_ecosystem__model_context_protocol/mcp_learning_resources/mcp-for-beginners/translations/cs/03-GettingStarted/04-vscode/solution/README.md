# Spuštění ukázky

Předpokládáme, že už máte funkční kód serveru. Prosím najděte server z jedné z předchozích kapitol.

## Nastavení mcp.json

Zde je soubor, který použijete jako referenci, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Změňte položku serveru podle potřeby tak, aby ukazovala na absolutní cestu k vašemu serveru včetně potřebného úplného příkazu ke spuštění.

Ve výše uvedeném ukázkovém souboru položka serveru vypadá takto:

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

Možná budete muset zadat kořen repozitáře GitHub, který lze získat příkazem `git rev-parse --show-toplevel`.

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

Toto odpovídá spuštění příkazu takto: `node build/index.js`.

- Změňte tuto položku serveru tak, aby odpovídala umístění vašeho serverového souboru nebo tomu, co je potřeba ke spuštění serveru podle vybraného runtime a umístění serveru.

## Použití funkcí v serveru

- Klikněte na ikonu `play`, jakmile přidáte *mcp.json* do složky *./vscode*,

    Všimněte si, že se ikona nástrojů změní a počet dostupných nástrojů se zvýší. Ikona nástrojů je umístěná přímo nad polem chatu v GitHub Copilot.

## Spuštění nástroje

- Do okna chatu napište prompt, který odpovídá popisu vašeho nástroje. Například pro spuštění nástroje `add` napište něco jako „add 3 to 20“.

    Měli byste vidět, že se nad textovým polem chatu zobrazí nástroj s výzvou k výběru, který nástroj chcete spustit, jako na tomto obrázku:

    ![VS Code indikující, že chce spustit nástroj](../../../../../translated_images/cs/vscode-agent.d5a0e0b897331060.webp)

    Výběr nástroje by měl vrátit číselný výsledek „23“, pokud váš prompt byl jako zmíněné předtím.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->