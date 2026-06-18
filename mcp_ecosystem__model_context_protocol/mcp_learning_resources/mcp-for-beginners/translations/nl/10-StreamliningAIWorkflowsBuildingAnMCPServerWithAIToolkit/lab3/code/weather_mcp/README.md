# Weather MCP Server

Dit is een voorbeeld van een MCP Server in Python die weerhulpmiddelen implementeert met mock-reacties. Het kan worden gebruikt als een basis voor je eigen MCP Server. Het bevat de volgende functies:

- **Weerhulpmiddel**: Een hulpmiddel dat gemockte weerinformatie geeft op basis van de opgegeven locatie.
- **Verbinden met Agent Builder**: Een functie die je in staat stelt om de MCP-server te verbinden met de Agent Builder voor testen en debuggen.
- **Debuggen in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Een functie waarmee je de MCP Server kunt debuggen met behulp van de MCP Inspector.

## Aan de slag met de Weather MCP Server template

> **Vereisten**
> 
> Om de MCP Server op je lokale ontwikkelmachine te kunnen draaien, heb je nodig:
> 
> - [Python](https://www.python.org/)
> - (*Optioneel - als je uv verkiest*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Voorbereiden van de omgeving

Er zijn twee manieren om de omgeving voor dit project op te zetten. Je kunt er één kiezen op basis van je voorkeur.

> Opmerking: Herlaad VSCode of de terminal om zeker te stellen dat de python van de virtuele omgeving wordt gebruikt nadat je de virtuele omgeving hebt aangemaakt.

| Aanpak | Stappen |
| -------- | ----- |
| Gebruik van `uv` | 1. Maak virtuele omgeving aan: `uv venv` <br>2. Voer VSCode commando "***Python: Select Interpreter***" uit en selecteer de python van de aangemaakte virtuele omgeving <br>3. Installeer afhankelijkheden (inclusief dev afhankelijkheden): `uv pip install -r pyproject.toml --extra dev` |
| Gebruik van `pip` | 1. Maak virtuele omgeving aan: `python -m venv .venv` <br>2. Voer VSCode commando "***Python: Select Interpreter***" uit en selecteer de python van de aangemaakte virtuele omgeving<br>3. Installeer afhankelijkheden (inclusief dev afhankelijkheden): `pip install -e .[dev]` |

Na het opzetten van de omgeving kun je de server draaien op je lokale ontwikkelmachine via Agent Builder als MCP Client om te beginnen:
1. Open het Debug-paneel in VS Code. Selecteer `Debug in Agent Builder` of druk op `F5` om de MCP server te debuggen.
2. Gebruik Microsoft Foundry Toolkit Agent Builder om de server te testen met [deze prompt](../../../../../../../../../../../open_prompt_builder). De server wordt automatisch verbonden met de Agent Builder.
3. Klik op `Run` om de server met de prompt te testen.

**Gefeliciteerd**! Je hebt de Weather MCP Server succesvol op je lokale ontwikkelmachine draaien via Agent Builder als MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Wat zit er in de template

| Map / Bestand| Inhoud                                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode bestanden voor debugging              |
| `.aitk`      | Configuraties voor Microsoft Foundry Toolkit |
| `src`        | De broncode voor de weather mcp server       |

## Hoe debug je de Weather MCP Server

> Notities:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) is een visuele ontwikkelaarstool voor het testen en debuggen van MCP servers.
> - Alle debug-modi ondersteunen breakpoints, je kunt dus breakpoints toevoegen aan de tool-implementatiecode.

| Debug Modus | Beschrijving | Stappen om te debuggen |
| ---------- | ----------- | ---------------------- |
| Agent Builder | Debug de MCP server in Agent Builder via Microsoft Foundry Toolkit. | 1. Open het Debug-paneel in VS Code. Selecteer `Debug in Agent Builder` en druk op `F5` om de MCP server te debuggen.<br>2. Gebruik Microsoft Foundry Toolkit Agent Builder om de server te testen met [deze prompt](../../../../../../../../../../../open_prompt_builder). De server wordt automatisch verbonden met Agent Builder.<br>3. Klik op `Run` om de server met de prompt te testen. |
| MCP Inspector | Debug de MCP server met de MCP Inspector. | 1. Installeer [Node.js](https://nodejs.org/)<br> 2. Zet Inspector op: `cd inspector` && `npm install` <br> 3. Open het Debug-paneel in VS Code. Selecteer `Debug SSE in Inspector (Edge)` of `Debug SSE in Inspector (Chrome)`. Druk op F5 om te starten met debuggen.<br> 4. Wanneer MCP Inspector in de browser wordt geopend, klik op de `Connect` knop om deze MCP server te verbinden.<br> 5. Dan kun je `List Tools` doen, een tool selecteren, parameters invoeren, en `Run Tool` om je servercode te debuggen.<br> |

## Standaard poorten en aanpassingen

| Debug Modus | Poorten | Definities | Aanpassingen | Opmerking |
| ---------- | ------- | ----------- | ------------ | --------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Bewerk [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) om bovenstaande poorten te wijzigen. | N.v.t. |
| MCP Inspector | 3001 (Server); 5173 en 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Bewerk [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) om bovenstaande poorten te wijzigen. | N.v.t. |

## Feedback

Als je feedback of suggesties hebt voor deze template, open dan een issue in de [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->