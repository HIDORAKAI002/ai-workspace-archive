# Ausführung des Beispiels

Hier gehen wir davon aus, dass Sie bereits funktionierenden Servercode haben. Bitte suchen Sie einen Server aus einem der vorherigen Kapitel.

## Einrichtung der mcp.json

Hier ist eine Datei, die Sie als Referenz verwenden können, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Ändern Sie den Server-Eintrag nach Bedarf, damit er auf den absoluten Pfad Ihres Servers zeigt, einschließlich des vollständigen Befehls zum Starten.

Im oben genannten Beispieldatei sieht der Server-Eintrag folgendermaßen aus:

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

Möglicherweise müssen Sie das Root-Verzeichnis des GitHub-Repositories eingeben, das Sie mit dem Befehl `git rev-parse --show-toplevel` abrufen können.

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

Dies entspricht dem Ausführen eines Befehls wie: `node build/index.js`.

- Ändern Sie diesen Server-Eintrag, damit er zu dem Speicherort Ihrer Serverdatei passt oder dem entspricht, was für den Start Ihres Servers entsprechend Ihrer gewählten Laufzeit und Serverposition benötigt wird.

## Nutzung der Funktionen im Server

- Klicken Sie auf das `play`-Symbol, nachdem Sie *mcp.json* zum Ordner *./vscode* hinzugefügt haben,

    Beobachten Sie, wie sich das Werkzeug-Symbol ändert und die Anzahl der verfügbaren Tools erhöht. Das Werkzeug-Symbol befindet sich direkt über dem Chat-Feld in GitHub Copilot.

## Werkzeug ausführen

- Geben Sie eine Aufforderung in Ihrem Chatfenster ein, die der Beschreibung Ihres Werkzeugs entspricht. Um z.B. das Werkzeug `add` zu starten, geben Sie etwas ein wie „add 3 to 20“.

    Sie sollten oberhalb des Chat-Textfelds ein Werkzeug angezeigt bekommen, das Sie auswählen können, um es auszuführen, etwa so:

    ![VS Code zeigt an, dass es ein Werkzeug ausführen möchte](../../../../../translated_images/de/vscode-agent.d5a0e0b897331060.webp)

    Wenn Sie das Werkzeug auswählen, sollte ein numerisches Ergebnis mit der Zahl „23“ angezeigt werden, wenn Ihre Eingabe wie zuvor beschrieben war.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->