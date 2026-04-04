# Weather MCP Server

Dit is een voorbeeld van een MCP Server in Python die werkt met weershulpmiddelen en mock-antwoorden. Het kan worden gebruikt als een sjabloon voor je eigen MCP Server. Het bevat de volgende functies:

- **Weather Tool**: Een hulpmiddel dat gemockte weersinformatie verstrekt op basis van de opgegeven locatie.
- **Git Clone Tool**: Een hulpmiddel dat een git-repository kloont naar een specifieke map.
- **VS Code Open Tool**: Een hulpmiddel dat een map opent in VS Code of VS Code Insiders.
- **Connect to Agent Builder**: Een functie waarmee je de MCP-server kunt verbinden met de Agent Builder voor testen en debuggen.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Een functie waarmee je de MCP-server kunt debuggen met behulp van de MCP Inspector.

## Aan de slag met de Weather MCP Server-sjabloon

> **Vereisten**
>
> Om de MCP Server op je lokale ontwikkelmachine te laten draaien, heb je nodig:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Vereist voor het git_clone_repo-hulpmiddel)
> - [VS Code](https://code.visualstudio.com/) of [VS Code Insiders](https://code.visualstudio.com/insiders/) (Vereist voor het open_in_vscode-hulpmiddel)
> - (*Optioneel - als je voorkeur uitgaat naar uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Omgeving voorbereiden

Er zijn twee methoden om de omgeving voor dit project op te zetten. Je kunt er een kiezen op basis van je voorkeur.

> Opmerking: Herstart VSCode of de terminal om er zeker van te zijn dat de Python van de virtuele omgeving wordt gebruikt nadat je die hebt aangemaakt.

| Methode | Stappen |
| -------- | ----- |
| Met `uv` | 1. Maak virtuele omgeving aan: `uv venv` <br>2. Voer VSCode-commando "***Python: Select Interpreter***" uit en selecteer de Python uit de aangemaakte virtuele omgeving <br>3. Installeer dependencies (inclusief dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| Met `pip` | 1. Maak virtuele omgeving aan: `python -m venv .venv` <br>2. Voer VSCode-commando "***Python: Select Interpreter***" uit en selecteer de Python uit de aangemaakte virtuele omgeving<br>3. Installeer dependencies (inclusief dev dependencies): `pip install -e .[dev]` |

Na het opzetten van de omgeving kun je de server op je lokale ontwikkelmachine draaien via Agent Builder als MCP Client om te beginnen:
1. Open het Debug-paneel in VS Code. Selecteer `Debug in Agent Builder` of druk op `F5` om het debuggen van de MCP-server te starten.
2. Gebruik de AI Toolkit Agent Builder om de server te testen met [deze prompt](../../../../../../../../../../../open_prompt_builder). De server wordt automatisch verbonden met de Agent Builder.
3. Klik op `Run` om de server te testen met de prompt.

**Gefeliciteerd**! Je hebt de Weather MCP Server succesvol draaien op je lokale ontwikkelmachine via Agent Builder als MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Wat zit er in de sjabloon

| Map / Bestand | Inhoud                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode-bestanden voor debuggen                   |
| `.aitk`      | Configuraties voor AI Toolkit                |
| `src`        | De broncode voor de weather mcp server   |

## Hoe debug je de Weather MCP Server

> Opmerkingen:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) is een visuele ontwikkelaarstool voor het testen en debuggen van MCP-servers.
> - Alle debugmodi ondersteunen breakpoints, dus je kunt breakpoints toevoegen aan de implementatiecode van het hulpmiddel.

## Beschikbare Hulpmiddelen

### Weather Tool
Het `get_weather`-hulpmiddel levert gemockte weersinformatie voor een opgegeven locatie.

| Parameter | Type | Beschrijving |
| --------- | ---- | ----------- |
| `location` | string | Locatie om het weer van op te halen (bijv. stadsnaam, staat of coördinaten) |

### Git Clone Tool
Het `git_clone_repo`-hulpmiddel kloont een git-repository naar een opgegeven map.

| Parameter | Type | Beschrijving |
| --------- | ---- | ----------- |
| `repo_url` | string | URL van de git-repository die gekloond moet worden |
| `target_folder` | string | Pad naar de map waar de repository naartoe gekloond moet worden |

Het hulpmiddel retourneert een JSON-object met:
- `success`: Boolean die aangeeft of de bewerking geslaagd is
- `target_folder` of `error`: Het pad van de gekloonde repository of een foutmelding

### VS Code Open Tool
Het `open_in_vscode`-hulpmiddel opent een map in de VS Code- of VS Code Insiders-applicatie.

| Parameter | Type | Beschrijving |
| --------- | ---- | ----------- |
| `folder_path` | string | Pad naar de te openen map |
| `use_insiders` | boolean (optioneel) | Of VS Code Insiders in plaats van reguliere VS Code gebruikt moet worden |

Het hulpmiddel retourneert een JSON-object met:
- `success`: Boolean die aangeeft of de bewerking geslaagd is
- `message` of `error`: Een bevestigingsbericht of een foutmelding

| Debugmodus | Beschrijving | Stappen om te debuggen |
| ---------- | ----------- | --------------- |
| Agent Builder | Debug de MCP-server in de Agent Builder via AI Toolkit. | 1. Open het Debug-paneel in VS Code. Selecteer `Debug in Agent Builder` en druk op `F5` om te starten met debuggen van de MCP-server.<br>2. Gebruik AI Toolkit Agent Builder om de server te testen met [deze prompt](../../../../../../../../../../../open_prompt_builder). De server wordt automatisch verbonden met de Agent Builder.<br>3. Klik op `Run` om de server met de prompt te testen. |
| MCP Inspector | Debug de MCP-server met behulp van de MCP Inspector. | 1. Installeer [Node.js](https://nodejs.org/)<br> 2. Zet de Inspector op: `cd inspector` && `npm install` <br> 3. Open het Debug-paneel in VS Code. Selecteer `Debug SSE in Inspector (Edge)` of `Debug SSE in Inspector (Chrome)`. Druk op F5 om te starten met debuggen.<br> 4. Wanneer MCP Inspector in de browser opent, klik op de knop `Connect` om deze MCP-server te verbinden.<br> 5. Daarna kun je `List Tools` uitvoeren, een hulpmiddel selecteren, parameters invoeren en `Run Tool` gebruiken om je servercode te debuggen.<br> |

## Standaard Poorten en aanpassingen

| Debugmodus | Poorten | Definities | Aanpassingen | Opmerkingen |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Pas [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) aan om bovenstaande poorten te wijzigen. | N.v.t. |
| MCP Inspector | 3001 (Server); 5173 en 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Pas [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) aan om bovenstaande poorten te wijzigen.| N.v.t. |

## Feedback

Als je feedback of suggesties hebt voor deze sjabloon, open dan een issue op de [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet als de gezaghebbende bron worden beschouwd. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->