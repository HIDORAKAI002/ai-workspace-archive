# Zagon vzorca

Tu predpostavljamo, da že imate delujočo kodo strežnika. Prosim, poiščite strežnik iz enega izmed prejšnjih poglavij.

## Nastavitev mcp.json

Tukaj je datoteka, ki jo uporabljate kot referenco, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Spremenite vnos strežnika po potrebi, da kaže absolutno pot do vašega strežnika, vključno s popolnim potrebnim ukazom za zagon.

V zgornji primer datoteke videti vnos strežnika takole:

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

Morda boste morali vnesti korenski imenik GitHub repozitorija, ki ga lahko dobite z ukazom `git rev-parse --show-toplevel`.

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

To ustreza izvajanju ukaza kot je: `node build/index.js`.

- Spremenite ta vnos strežnika glede na to, kje se nahaja vaša datoteka strežnika ali glede na to, kaj je potrebno za zagon strežnika, odvisno od izbranega runtime in lokacije strežnika.

## Uporaba funkcij strežnika

- Kliknite ikono `play`, ko ste dodali *mcp.json* v mapo *./vscode*,

    Opazite, da se ikona orodij spremeni in poveča število razpoložljivih orodij. Ikona orodij je locirana tik nad poljem za klepet v GitHub Copilotu.

## Zaženite orodje

- V svoj klepet vpišite poziv, ki se ujema z opisom vašega orodja. Na primer, da sprožite orodje `add`, vpišite nekaj takega kot "add 3 to 20".

    Nad poljem za vnos besedila v klepet bi morali videti predstavitev orodja, ki vas poziva, da ga izberete za zagon, kot na tem prikazu:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/sl/vscode-agent.d5a0e0b897331060.webp)

    Izbira orodja bi morala pokazati numerični rezultat "23", če je vaš poziv bil kot prej omenjen.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->