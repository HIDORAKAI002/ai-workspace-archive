# Weather MCP Server

Dies ist ein Beispiel für einen MCP-Server in Python, der Wettertools mit simulierten Antworten implementiert. Er kann als Gerüst für Ihren eigenen MCP-Server verwendet werden. Er umfasst die folgenden Funktionen:

- **Weather Tool**: Ein Tool, das simulierte Wetterinformationen basierend auf dem angegebenen Ort bereitstellt.
- **Verbindung zum Agent Builder**: Eine Funktion, die es Ihnen ermöglicht, den MCP-Server zum Testen und Debuggen mit dem Agent Builder zu verbinden.
- **Debuggen im [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Eine Funktion, die es ermöglicht, den MCP-Server mit dem MCP Inspector zu debuggen.

## Erste Schritte mit der Weather MCP Server Vorlage

> **Voraussetzungen**
>
> Um den MCP-Server auf Ihrem lokalen Entwicklungssystem auszuführen, benötigen Sie:
>
> - [Python](https://www.python.org/)
> - (*Optional - wenn Sie uv bevorzugen*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Umgebung vorbereiten

Es gibt zwei Ansätze, um die Umgebung für dieses Projekt einzurichten. Sie können je nach Präferenz einen der beiden wählen.

> Hinweis: Laden Sie VSCode oder das Terminal neu, um sicherzustellen, dass die Python-Umgebung aus dem virtuellen Environment nach dessen Erstellung verwendet wird.

| Ansatz | Schritte |
| -------- | ----- |
| Verwendung von `uv` | 1. Virtuelle Umgebung erstellen: `uv venv` <br>2. Führen Sie in VSCode den Befehl "***Python: Interpreter auswählen***" aus und wählen Sie den Python-Interpreter aus der erstellten virtuellen Umgebung aus <br>3. Installieren Sie die Abhängigkeiten (einschließlich Entwicklungsabhängigkeiten): `uv pip install -r pyproject.toml --extra dev` |
| Verwendung von `pip` | 1. Virtuelle Umgebung erstellen: `python -m venv .venv` <br>2. Führen Sie in VSCode den Befehl "***Python: Interpreter auswählen***" aus und wählen Sie den Python-Interpreter aus der erstellten virtuellen Umgebung aus<br>3. Installieren Sie die Abhängigkeiten (einschließlich Entwicklungsabhängigkeiten): `pip install -e .[dev]` |

Nach dem Einrichten der Umgebung können Sie den Server auf Ihrem lokalen Entwicklungssystem über den Agent Builder als MCP-Client starten, um loszulegen:
1. Öffnen Sie das Debug-Panel in VS Code. Wählen Sie `Debug im Agent Builder` oder drücken Sie `F5`, um das Debuggen des MCP-Servers zu starten.
2. Verwenden Sie den Microsoft Foundry Toolkit Agent Builder, um den Server mit [diesem Prompt](../../../../../../../../../../../open_prompt_builder) zu testen. Der Server wird automatisch mit dem Agent Builder verbunden.
3. Klicken Sie auf `Run`, um den Server mit dem Prompt zu testen.

**Herzlichen Glückwunsch**! Sie haben den Weather MCP Server erfolgreich auf Ihrem lokalen Entwicklungssystem über den Agent Builder als MCP-Client ausgeführt.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Was ist in der Vorlage enthalten

| Ordner / Datei | Inhalt                                      |
| -------------- | ------------------------------------------ |
| `.vscode`      | VSCode-Dateien für das Debugging           |
| `.aitk`        | Konfigurationen für Microsoft Foundry Toolkit |
| `src`          | Quellcode für den Weather MCP Server       |

## Wie man den Weather MCP Server debuggt

> Hinweise:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ist ein visuelles Entwickler-Tool zum Testen und Debuggen von MCP-Servern.
> - Alle Debug-Modi unterstützen Breakpoints, sodass Sie Haltepunkte im Tool-Implementierungscode hinzufügen können.

| Debug-Modus | Beschreibung | Schritte zum Debuggen |
| ----------- | ------------ | --------------------- |
| Agent Builder | Debuggen des MCP-Servers im Agent Builder über Microsoft Foundry Toolkit. | 1. Öffnen Sie das Debug-Panel in VS Code. Wählen Sie `Debug im Agent Builder` und drücken Sie `F5`, um das Debuggen des MCP-Servers zu starten.<br>2. Verwenden Sie den Microsoft Foundry Toolkit Agent Builder, um den Server mit [diesem Prompt](../../../../../../../../../../../open_prompt_builder) zu testen. Der Server wird automatisch mit dem Agent Builder verbunden.<br>3. Klicken Sie auf `Run`, um den Server mit dem Prompt zu testen. |
| MCP Inspector | Debuggen des MCP-Servers mit dem MCP Inspector. | 1. Installieren Sie [Node.js](https://nodejs.org/)<br> 2. Richten Sie den Inspector ein: `cd inspector` && `npm install` <br> 3. Öffnen Sie das Debug-Panel in VS Code. Wählen Sie `Debug SSE in Inspector (Edge)` oder `Debug SSE in Inspector (Chrome)`. Drücken Sie F5, um das Debuggen zu starten.<br> 4. Wenn der MCP Inspector im Browser startet, klicken Sie auf die Schaltfläche `Connect`, um diesen MCP-Server zu verbinden.<br> 5. Dann können Sie „Tools auflisten“, ein Tool auswählen, Parameter eingeben und „Tool ausführen“, um Ihren Servercode zu debuggen.<br> |

## Standardports und Anpassungen

| Debug-Modus | Ports | Definitionen | Anpassungen | Hinweis |
| ----------- | ----- | ------------ | ----------- | ------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Bearbeiten Sie [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), um die oben genannten Ports zu ändern. | N/A |
| MCP Inspector | 3001 (Server); 5173 und 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Bearbeiten Sie [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), um die oben genannten Ports zu ändern. | N/A |

## Feedback

Wenn Sie Feedback oder Vorschläge zu dieser Vorlage haben, öffnen Sie bitte ein Issue im [Microsoft Foundry Toolkit GitHub Repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->