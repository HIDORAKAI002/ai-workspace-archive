# Ausführen dieses Beispiels

Dies ist die Rust-Lösung für das LLM-Client-Beispiel. Du benötigst eine installierte Rust-Toolchain; siehe die [offizielle Installationsanleitung](https://www.rust-lang.org/tools/install).

Der Client ruft ein Modell über den GitHub Models Inference-Endpunkt (`https://models.github.ai/inference/chat`) auf und liest dein GitHub-Personal-Access-Token (PAT) aus der Umgebungsvariable `OPENAI_API_KEY`.

> [!NOTE]
> Andere Lösungen in diesem Repository verwenden `GITHUB_TOKEN`. Für Rust setze `OPENAI_API_KEY` auf denselben Wert, um die OpenAI-Client-Konfiguration anzupassen.

## -0- Setze dein GitHub-Token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Baue das Beispiel

```bash
cargo build
```

## -2- Führe das Beispiel aus

```bash
cargo run
```

Der Client startet den Rechner-MCP-Server, ruft dessen Werkzeugliste ab und verwendet das Modell (`openai/gpt-5-mini`), um das Werkzeug `add` aufzurufen. Du solltest eine Ausgabe sehen, die den Werkzeugaufruf anzeigt (zum Beispiel "Calling tool: add") und das Ergebnis dieses Aufrufs.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->