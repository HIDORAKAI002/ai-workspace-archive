# Esecuzione di questo esempio

Questa è la soluzione Rust per l'esempio client LLM. È necessario avere installato un toolchain Rust; vedi la [guida all'installazione ufficiale](https://www.rust-lang.org/tools/install).

Il client chiama un modello tramite l'endpoint di inferenza dei modelli GitHub (`https://models.github.ai/inference/chat`) e legge il tuo token di accesso personale GitHub (PAT) dalla variabile d'ambiente `OPENAI_API_KEY`.

> [!NOTE]
> Altre soluzioni in questo repository usano `GITHUB_TOKEN`. Per Rust, imposta `OPENAI_API_KEY` allo stesso valore per corrispondere alla configurazione del client OpenAI.

## -0- Imposta il tuo token GitHub

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Compila l'esempio

```bash
cargo build
```

## -2- Esegui l'esempio

```bash
cargo run
```

Il client avvia il server MCP calcolatore, recupera la sua lista di strumenti e usa il modello (`openai/gpt-5-mini`) per chiamare lo strumento `add`. Dovresti vedere un output che indica la chiamata allo strumento (ad esempio, "Calling tool: add") e il risultato di quella chiamata.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->