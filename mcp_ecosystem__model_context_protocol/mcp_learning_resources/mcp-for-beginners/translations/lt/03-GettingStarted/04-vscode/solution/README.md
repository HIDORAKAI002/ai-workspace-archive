# Paleidžiame pavyzdį

Čia prielaidžia, kad jau turite veikiantį serverio kodą. Prašome rasti serverį iš vieno iš ankstesnių skyrių.

## Paruoškite mcp.json

Štai failas, kurį naudosite kaip pavyzdį, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Pakeiskite serverio įrašą pagal poreikį, nurodydami absoliutų kelią į jūsų serverį kartu su reikalinga pilna komanda paleidimui.

Pavyzdiniame faile, paminėtame aukščiau, serverio įrašas atrodo taip:

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

Galbūt reikės įvesti GitHub saugyklos šaknį, kurią galima gauti komanda `git rev-parse --show-toplevel`.

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

Tai atitinka komandos vykdymą taip: `node build/index.js`.

- Pakeiskite šį serverio įrašą taip, kad atitiktų jūsų serverio failo vietą arba kas reikalinga paleidimui, atsižvelgiant į jūsų pasirinktą vykdymo aplinką ir serverio vietą.

## Naudokite serverio funkcijas

- Spustelėkite piktogramą `play`, kai pridėsite *mcp.json* į *./vscode* aplanką,

    Stebėkite, kaip keičiasi įrankių piktograma ir padidėja galimų įrankių skaičius. Įrankių piktograma yra tiesiai virš pokalbio lauko GitHub Copilot.

## Paleiskite įrankį

- Įveskite užklausą pokalbio lange, kuri atitinka jūsų įrankio aprašymą. Pavyzdžiui, norėdami paleisti įrankį `add`, įveskite kažką panašaus į „add 3 to 20“.

    Turėtumėte matyti, kaip virš pokalbio teksto lauko atsiranda įrankis, leidžiantis pasirinkti jį paleisti, kaip parodyta šioje iliustracijoje:

    ![VS Code rodantis, kad nori paleisti įrankį](../../../../../translated_images/lt/vscode-agent.d5a0e0b897331060.webp)

    Pasirinkus įrankį, turėtų būti pateikta skaitinė reikšmė „23“, jei jūsų užklausa buvo tokia, kaip minėjome anksčiau.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->