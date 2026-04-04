# Weather MCP Server

Dies ist ein Beispiel für einen MCP-Server in Python, der Wettertools mit simulierten Antworten implementiert. Er kann als Gerüst für Ihren eigenen MCP-Server verwendet werden. Folgende Funktionen sind enthalten:

- **Wetter-Tool**: Ein Tool, das simulierte Wetterinformationen basierend auf dem angegebenen Ort bereitstellt.
- **Git Clone Tool**: Ein Tool, das ein Git-Repository in einen angegebenen Ordner klont.
- **VS Code Open Tool**: Ein Tool, das einen Ordner in VS Code oder VS Code Insiders öffnet.
- **Verbindung zum Agent Builder**: Eine Funktion, die es ermöglicht, den MCP-Server für Tests und Debugging mit dem Agent Builder zu verbinden.
- **Debugging im [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Eine Funktion, die das Debuggen des MCP-Servers mit dem MCP Inspector ermöglicht.

## Erste Schritte mit der Weather MCP Server-Vorlage

> **Voraussetzungen**
>
> Um den MCP-Server auf Ihrer lokalen Entwicklungsmaschine auszuführen, benötigen Sie:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (erforderlich für das git_clone_repo-Tool)
> - [VS Code](https://code.visualstudio.com/) oder [VS Code Insiders](https://code.visualstudio.com/insiders/) (erforderlich für das open_in_vscode-Tool)
> - (*Optional - falls Sie uv bevorzugen*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Umgebung vorbereiten

Es gibt zwei Möglichkeiten, die Umgebung für dieses Projekt einzurichten. Sie können je nach Vorliebe eine wählen.

> Hinweis: Laden Sie VSCode oder das Terminal neu, um sicherzustellen, dass nach dem Erstellen der virtuellen Umgebung das Python aus der virtuellen Umgebung verwendet wird.

| Vorgehensweise | Schritte |
| -------- | ----- |
| Verwendung von `uv` | 1. Virtuelle Umgebung erstellen: `uv venv` <br>2. VSCode-Befehl "***Python: Select Interpreter***" ausführen und das Python aus der erstellten virtuellen Umgebung auswählen <br>3. Abhängigkeiten installieren (inklusive Dev-Abhängigkeiten): `uv pip install -r pyproject.toml --extra dev` |
| Verwendung von `pip` | 1. Virtuelle Umgebung erstellen: `python -m venv .venv` <br>2. VSCode-Befehl "***Python: Select Interpreter***" ausführen und das Python aus der erstellten virtuellen Umgebung auswählen<br>3. Abhängigkeiten installieren (inklusive Dev-Abhängigkeiten): `pip install -e .[dev]` | 

Nachdem Sie die Umgebung eingerichtet haben, können Sie den Server auf Ihrer lokalen Entwicklungsmaschine über den Agent Builder als MCP-Client starten:
1. Öffnen Sie das Debug-Panel in VS Code. Wählen Sie `Debug in Agent Builder` oder drücken Sie `F5`, um das Debuggen des MCP-Servers zu starten.
2. Verwenden Sie AI Toolkit Agent Builder, um den Server mit [diesem Prompt](../../../../../../../../../../../open_prompt_builder) zu testen. Der Server wird automatisch mit dem Agent Builder verbunden.
3. Klicken Sie auf `Run`, um den Server mit dem Prompt zu testen.

**Herzlichen Glückwunsch**! Sie haben den Weather MCP Server erfolgreich auf Ihrer lokalen Entwicklungsmaschine über den Agent Builder als MCP-Client ausgeführt.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Was ist in der Vorlage enthalten

| Ordner / Datei | Inhalt                                     |
| -------------- | ----------------------------------------- |
| `.vscode`      | VSCode-Dateien zum Debuggen                |
| `.aitk`        | Konfigurationen für AI Toolkit             |
| `src`          | Quellcode für den Weather MCP Server       |

## So debuggen Sie den Weather MCP Server

> Hinweise:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ist ein visuelles Entwicklerwerkzeug zum Testen und Debuggen von MCP-Servern.
> - Alle Debug-Modi unterstützen Breakpoints, sodass Sie Haltepunkte im Code der Tool-Implementierung hinzufügen können.

## Verfügbare Tools

### Weather Tool
Das Tool `get_weather` liefert simulierte Wetterinformationen für einen angegebenen Ort.

| Parameter | Typ | Beschreibung |
| --------- | --- | ------------ |
| `location` | string | Ort, für den das Wetter ermittelt werden soll (z.B. Stadtname, Bundesland oder Koordinaten) |

### Git Clone Tool
Das Tool `git_clone_repo` klont ein Git-Repository in einen angegebenen Ordner.

| Parameter | Typ | Beschreibung |
| --------- | --- | ------------ |
| `repo_url` | string | URL des Git-Repositories, das geklont werden soll |
| `target_folder` | string | Pfad des Ordners, in den das Repository geklont werden soll |

Das Tool gibt ein JSON-Objekt zurück mit:
- `success`: Boolean, der angibt, ob die Operation erfolgreich war
- `target_folder` oder `error`: Pfad des geklonten Repositories oder eine Fehlermeldung

### VS Code Open Tool
Das Tool `open_in_vscode` öffnet einen Ordner in der VS Code- oder VS Code Insiders-Anwendung.

| Parameter | Typ | Beschreibung |
| --------- | --- | ------------ |
| `folder_path` | string | Pfad des zu öffnenden Ordners |
| `use_insiders` | boolean (optional) | Ob VS Code Insiders anstelle des normalen VS Code verwendet werden soll |

Das Tool gibt ein JSON-Objekt zurück mit:
- `success`: Boolean, der angibt, ob die Operation erfolgreich war
- `message` oder `error`: Eine Bestätigungsnachricht oder eine Fehlermeldung

| Debug-Modus | Beschreibung | Schritte zum Debuggen |
| ----------- | ------------ | --------------------- |
| Agent Builder | Debuggen Sie den MCP-Server im Agent Builder über AI Toolkit. | 1. Öffnen Sie das Debug-Panel in VS Code. Wählen Sie `Debug in Agent Builder` und drücken Sie `F5`, um das Debuggen des MCP-Servers zu starten.<br>2. Verwenden Sie AI Toolkit Agent Builder, um den Server mit [diesem Prompt](../../../../../../../../../../../open_prompt_builder) zu testen. Der Server wird automatisch mit dem Agent Builder verbunden.<br>3. Klicken Sie auf `Run`, um den Server mit dem Prompt zu testen. |
| MCP Inspector | Debuggen Sie den MCP-Server mit dem MCP Inspector. | 1. Installieren Sie [Node.js](https://nodejs.org/)<br>2. Richten Sie den Inspector ein: `cd inspector` && `npm install` <br>3. Öffnen Sie das Debug-Panel in VS Code. Wählen Sie `Debug SSE in Inspector (Edge)` oder `Debug SSE in Inspector (Chrome)`. Drücken Sie F5, um das Debuggen zu starten.<br>4. Wenn der MCP Inspector im Browser startet, klicken Sie auf die Schaltfläche `Connect`, um diesen MCP-Server zu verbinden.<br>5. Danach können Sie `List Tools` auswählen, ein Tool auswählen, Parameter eingeben und `Run Tool` anklicken, um Ihren Servercode zu debuggen.<br> |

## Standardports und Anpassungen

| Debug-Modus | Ports | Definitionen | Anpassungen | Hinweis |
| ----------- | ----- | ------------ | ----------- | ------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Bearbeiten Sie [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), um die oben genannten Ports zu ändern. | N/A |
| MCP Inspector | 3001 (Server); 5173 und 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Bearbeiten Sie [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), um die oben genannten Ports zu ändern. | N/A |

## Feedback

Wenn Sie Feedback oder Vorschläge für diese Vorlage haben, eröffnen Sie bitte ein Issue im [AI Toolkit GitHub-Repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mithilfe des KI-Übersetzungsdienstes [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, kann es bei automatischen Übersetzungen zu Fehlern oder Ungenauigkeiten kommen. Das ursprüngliche Dokument in seiner Originalsprache ist als maßgebliche Quelle zu betrachten. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->