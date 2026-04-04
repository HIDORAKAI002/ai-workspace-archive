# Führen Sie das Beispiel aus

## Virtuelle Umgebung erstellen

```sh
python -m venv venv
source ./venv/bin/activate
```

## Abhängigkeiten installieren

```sh
pip install "mcp[cli]"
```

## Server starten

```sh
uvicorn server:app --port 8000
```

## Testen Sie den Server mit GitHub Copilot und VS Code

Fügen Sie den Eintrag wie folgt in mcp.json ein:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Stellen Sie sicher, dass Sie im Server auf "starten" klicken.

Fügen Sie in GitHub Copilot die folgende Eingabeaufforderung ein:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Beim ersten Mal werden Sie gefragt, ob Sie eine Sampling-Aktion akzeptieren möchten, danach werden Sie gebeten, das Tool auszuführen, um "create_blog" zu akzeptieren. Sie sollten eine Antwort ähnlich wie folgt sehen:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache ist als maßgebliche Quelle zu betrachten. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->