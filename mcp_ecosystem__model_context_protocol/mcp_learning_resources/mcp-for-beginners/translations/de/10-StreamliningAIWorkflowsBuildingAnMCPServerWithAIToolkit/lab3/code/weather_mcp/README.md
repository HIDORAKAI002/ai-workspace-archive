# Weather MCP Server

Dies ist ein Beispiel für einen MCP-Server in Python, der Wettertools mit simulierten Antworten implementiert. Er kann als Gerüst für Ihren eigenen MCP-Server verwendet werden. Er enthält folgende Funktionen:

- **Weather Tool**: Ein Tool, das auf Basis des angegebenen Standorts simulierte Wetterinformationen bereitstellt.
- **Verbindung zum Agent Builder**: Eine Funktion, mit der Sie den MCP-Server mit dem Agent Builder zur Test- und Debugging-Zwecken verbinden können.
- **Debuggen im [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Eine Funktion, mit der Sie den MCP-Server mit dem MCP Inspector debuggen können.

## Einstieg mit der Weather MCP Server Vorlage

> **Voraussetzungen**
>
> Um den MCP-Server auf Ihrem lokalen Entwicklungsrechner auszuführen, benötigen Sie:
>
> - [Python](https://www.python.org/)
> - (*Optional - falls Sie uv bevorzugen*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Vorbereitung der Umgebung

Es gibt zwei Möglichkeiten, die Umgebung für dieses Projekt einzurichten. Sie können je nach Vorliebe eine auswählen.

> Hinweis: Starten Sie VSCode oder das Terminal neu, um sicherzustellen, dass nach dem Erstellen der virtuellen Umgebung der Python der virtuellen Umgebung verwendet wird.

| Vorgehensweise | Schritte |
| -------- | ----- |
| Verwendung von `uv` | 1. Virtuelle Umgebung erstellen: `uv venv` <br>2. In VSCode den Befehl "***Python: Interpreter auswählen***" ausführen und den Python-Interpreter aus der erstellten virtuellen Umgebung auswählen <br>3. Abhängigkeiten installieren (einschließlich Entwicklerabhängigkeiten): `uv pip install -r pyproject.toml --extra dev` |
| Verwendung von `pip` | 1. Virtuelle Umgebung erstellen: `python -m venv .venv` <br>2. In VSCode den Befehl "***Python: Interpreter auswählen***" ausführen und den Python-Interpreter aus der erstellten virtuellen Umgebung auswählen<br>3. Abhängigkeiten installieren (einschließlich Entwicklerabhängigkeiten): `pip install -e .[dev]` |

Nach dem Einrichten der Umgebung können Sie den Server auf Ihrem lokalen Entwicklungsrechner über Agent Builder als MCP Client ausführen, um zu starten:
1. Öffnen Sie im VS Code den Debug-Bereich. Wählen Sie `Debug in Agent Builder` oder drücken Sie `F5`, um das Debugging des MCP-Servers zu starten.
2. Verwenden Sie AI Toolkit Agent Builder, um den Server mit [diesem Prompt](../../../../../../../../../../../open_prompt_builder) zu testen. Der Server wird automatisch mit dem Agent Builder verbunden.
3. Klicken Sie auf `Run`, um den Server mit dem Prompt zu testen.

**Herzlichen Glückwunsch**! Sie haben erfolgreich den Weather MCP Server auf Ihrem lokalen Entwicklungsrechner über Agent Builder als MCP Client ausgeführt.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Was ist in der Vorlage enthalten

| Ordner / Datei | Inhalt                                     |
| -------------- | ----------------------------------------- |
| `.vscode`      | VSCode-Dateien für das Debugging          |
| `.aitk`        | Konfigurationen für AI Toolkit             |
| `src`          | Quellcode des Weather MCP Servers          |

## Wie Sie den Weather MCP Server debuggen

> Hinweise:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ist ein visuelles Entwickler-Tool zum Testen und Debuggen von MCP-Servern.
> - Alle Debug-Modi unterstützen Breakpoints, sodass Sie Breakpoints im Tool-Implementierungscode setzen können.

| Debug-Modus | Beschreibung | Schritte zum Debuggen |
| ----------- | ------------ | --------------------- |
| Agent Builder | Debuggen des MCP-Servers im Agent Builder über AI Toolkit. | 1. Öffnen Sie den Debugbereich in VS Code. Wählen Sie `Debug in Agent Builder` und drücken Sie `F5`, um das Debugging des MCP-Servers zu starten.<br>2. Verwenden Sie AI Toolkit Agent Builder, um den Server mit [diesem Prompt](../../../../../../../../../../../open_prompt_builder) zu testen. Der Server wird automatisch mit dem Agent Builder verbunden.<br>3. Klicken Sie auf `Run`, um den Server mit dem Prompt zu testen. |
| MCP Inspector | Debuggen des MCP-Servers mit dem MCP Inspector. | 1. Installieren Sie [Node.js](https://nodejs.org/)<br> 2. Richten Sie den Inspector ein: `cd inspector` und `npm install` <br> 3. Öffnen Sie dann den Debugbereich in VS Code. Wählen Sie `Debug SSE in Inspector (Edge)` oder `Debug SSE in Inspector (Chrome)`. Drücken Sie F5, um das Debuggen zu starten.<br> 4. Wenn MCP Inspector im Browser geöffnet wird, klicken Sie auf die Schaltfläche `Connect`, um diesen MCP-Server zu verbinden.<br> 5. Danach können Sie `List Tools` auswählen, ein Tool auswählen, Parameter eingeben und `Run Tool` drücken, um Ihren Servercode zu debuggen.<br> |

## Standardports und Anpassungen

| Debug-Modus | Ports | Definitionen | Anpassungen | Hinweis |
| ----------- | ----- | ------------ | ----------- | ------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Bearbeiten Sie [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), um obige Ports zu ändern. | N/A |
| MCP Inspector | 3001 (Server); 5173 und 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Bearbeiten Sie [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), um obige Ports zu ändern. | N/A |

## Feedback

Wenn Sie Feedback oder Vorschläge zu dieser Vorlage haben, öffnen Sie bitte ein Issue im [AI Toolkit GitHub Repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache ist als maßgebliche Quelle anzusehen. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->