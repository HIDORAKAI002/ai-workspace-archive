# Esecuzione dell'esempio

Qui assumiamo che tu abbia già un codice server funzionante. Si prega di individuare un server da uno dei capitoli precedenti.

## Configurare mcp.json

Ecco un file di riferimento, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Modifica la voce server come necessario per indicare il percorso assoluto al tuo server, incluso il comando completo necessario per l'esecuzione.

Nel file di esempio citato sopra la voce server appare così:

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

Potresti dover inserire la root del repository GitHub, che può essere ottenuta con il comando `git rev-parse --show-toplevel`.

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

Questo corrisponde all'esecuzione di un comando come: `node build/index.js`.

- Modifica questa voce server per adattarla alla posizione del tuo file server o a ciò che è necessario per avviare il server a seconda del runtime scelto e della posizione del server.

## Utilizzare le funzionalità nel server

- Clicca sull'icona `play`, una volta aggiunto *mcp.json* nella cartella *./vscode*,

    Nota come l'icona degli strumenti cambierà per aumentare il numero di strumenti disponibili. L'icona degli strumenti si trova proprio sopra il campo della chat in GitHub Copilot.

## Eseguire uno strumento

- Digita un prompt nella tua finestra di chat che corrisponda alla descrizione del tuo strumento. Per esempio, per attivare lo strumento `add` digita qualcosa come "add 3 to 20".

    Dovresti vedere uno strumento presentato sopra la casella di testo della chat che ti indica di selezionarlo per eseguire lo strumento, come in questa immagine:

    ![VS Code indica che vuole eseguire uno strumento](../../../../../translated_images/it/vscode-agent.d5a0e0b897331060.webp)

    Selezionare lo strumento dovrebbe produrre un risultato numerico che dice "23" se il tuo prompt era come quello menzionato precedentemente.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->