# Spustenie príkladu

Tu predpokladáme, že už máte funkčný serverový kód. Nájdite si prosím server z niektorej z predchádzajúcich kapitol.

## Nastavenie mcp.json

Tu je súbor, ktorý používate ako referenciu, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Zmente položku server podľa potreby, aby ukazovala na absolútnu cestu k vášmu serveru vrátane potrebného plného príkazu na spustenie.

V príkladovom súbore uvedenom vyššie vyzerá položka server takto:

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

Možno bude potrebné zadať koreň GitHub repozitára, ktorý môžete získať príkazom `git rev-parse --show-toplevel`.

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

To zodpovedá spusteniu príkazu v tomto tvare: `node build/index.js`.

- Zmente túto položku server tak, aby vyhovovala umiestneniu vášho serverového súboru alebo aby zodpovedala tomu, čo je potrebné na spustenie servera podľa použitého runtime a umiestnenia servera.

## Použitie funkcií na serveri

- Kliknite na ikonu `play`, keď pridáte *mcp.json* do priečinka *./vscode*,

    všimnite si, že sa ikona nástrojov zmení a zvýši sa počet dostupných nástrojov. Ikona nástrojov sa nachádza priamo nad chatovacím poľom v GitHub Copilot.

## Spustenie nástroja

- Napíšte vo vašom chatovacom okne prompt (výzvu), ktorá zodpovedá popisu vášho nástroja. Napríklad na spustenie nástroja `add` napíšte niečo ako "pridaj 3 k 20".

    Nad textovým poľom chatu by sa mal zobraziť nástroj na výber na spustenie, podobne ako je to na tomto obrázku:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/sk/vscode-agent.d5a0e0b897331060.webp)

    Výber nástroja by mal priniesť číselný výsledok "23", ak ste zadali prompt, ktorý sme spomenuli vyššie.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->