# A minta futtatása

Itt azt feltételezzük, hogy már van egy működő szerverkódod. Kérjük, keress egy szervert az előző fejezetek egyikéből.

## Az mcp.json beállítása

Itt van egy hivatkozási fájl, a [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Módosítsd a server bejegyzést szükség szerint, hogy mutasson a szervered abszolút elérési útjára, beleértve a futtatáshoz szükséges teljes parancsot is.

A fent említett példafájlban a server bejegyzés így néz ki:

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

Előfordulhat, hogy a GitHub-tároló gyökérkönyvtárát kell megadnod, amely lekérdezhető a `git rev-parse --show-toplevel` parancsból.

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

Ez megfelel egy olyan parancs futtatásának, mint: `node build/index.js`.

- Módosítsd ezt a server bejegyzést, hogy illeszkedjen a szerverfájlod helyéhez vagy ahhoz, amire szükséged van a szerver indításához a választott futtatókörnyezettől és szerverhelytől függően.

## A funkciók használata a szerveren

- Kattints a `play` ikonra, miután hozzáadtad az *mcp.json*-t a *./vscode* mappához,

    Figyeld meg, hogy az eszköz ikon változik, jelezve, hogy növekedett a rendelkezésre álló eszközök száma. Az eszköz ikon a chat mező fölött található a GitHub Copilotban.

## Egy eszköz futtatása

- Írj be egy parancsot a csevegőablakba, amely illeszkedik az eszközöd leírásához. Például az `add` eszköz aktiválásához írj valami ilyesmit: "add 3 to 20".

    Látni fogsz egy eszközt a chat szövegdoboz fölött, amely arra utal, hogy válaszd ki az eszközt a futtatáshoz, mint az alábbi vizuális példán:

    ![VS Code jelezve, hogy futtatni akar egy eszközt](../../../../../translated_images/hu/vscode-agent.d5a0e0b897331060.webp)

    Az eszköz kiválasztása egy numerikus eredményt fog adni, például "23", ha a parancsod úgy nézett ki, ahogy korábban említettük.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->