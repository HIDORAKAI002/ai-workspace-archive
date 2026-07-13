# Rularea exemplului

Aici presupunem că aveți deja un cod de server care funcționează. Vă rugăm să localizați un server din unul dintre capitolele anterioare.

## Configurarea fișierului mcp.json

Iată un fișier pe care îl folosiți ca referință, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Modificați înregistrarea serverului după cum este necesar pentru a indica calea absolută către serverul vostru, inclusiv comanda completă necesară pentru a-l porni.

În exemplul de fișier menționat mai sus, înregistrarea serverului arată astfel:

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

Este posibil să trebuiască să introduceți directorul rădăcină al depozitului GitHub, care poate fi obținut folosind comanda `git rev-parse --show-toplevel`.

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

Aceasta corespunde rulării unei comenzi de genul: `node build/index.js`.

- Modificați această înregistrare a serverului pentru a se potrivi locului unde este localizat fișierul serverului vostru sau după cum este necesar pentru a porni serverul, în funcție de mediul de rulare și locația serverului alese.

## Folosirea funcționalităților serverului

- Dați clic pe iconița `play`, odată ce ați adăugat *mcp.json* în folderul *./vscode*,

    Observați schimbarea iconiței pentru uneltele care indică creșterea numărului de unelte disponibile. Iconița uneltelor este localizată chiar deasupra câmpului de chat în GitHub Copilot.

## Rularea unei unelte

- Scrieți un prompt în fereastra de chat care să corespundă descrierii uneltei voastre. De exemplu, pentru a activa uneltele `add`, scrieți ceva de genul „add 3 to 20”.

    Ar trebui să vedeți o unealtă prezentată deasupra casetei de text a chatului care vă indică să selectați pentru a rula unealta, așa cum este în acest exemplu vizual:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/ro/vscode-agent.d5a0e0b897331060.webp)

    Selectarea uneltei ar trebui să genereze un rezultat numeric care să afișeze „23” dacă promptul vostru a fost ca cel menționat anterior.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->