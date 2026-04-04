# Weather MCP Server

Ovo je primjer MCP servera u Pythonu koji implementira vremenske alate s simuliranim odgovorima. Može se koristiti kao osnova za vaš vlastiti MCP server. Uključuje sljedeće značajke:

- **Weather Tool**: alat koji pruža simulirane vremenske informacije na temelju zadane lokacije.
- **Povezivanje s Agent Builderom**: značajka koja vam omogućuje povezivanje MCP servera s Agent Builderom za testiranje i ispravljanje pogrešaka.
- **Debugiranje u [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: značajka koja vam omogućuje ispravljanje MCP servera pomoću MCP Inspectora.

## Početak rada s predloškom Weather MCP Servera

> **Preduvjeti**
>
> Za pokretanje MCP servera na vašem lokalnom razvojnome računalu trebat će vam:
>
> - [Python](https://www.python.org/)
> - (*Opcionalno - ako preferirate uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Priprema okruženja

Postoje dva pristupa postavljanju okruženja za ovaj projekt. Možete odabrati jedan ovisno o vašim željama.

> Napomena: Ponovno učitajte VSCode ili terminal kako biste osigurali da se koristi Python iz virtualnog okruženja nakon njegovog stvaranja.

| Pristup | Koraci |
| -------- | ----- |
| Korištenje `uv` | 1. Kreirajte virtualno okruženje: `uv venv` <br>2. Pokrenite VSCode naredbu "***Python: Select Interpreter***" i odaberite Python iz kreiranog virtualnog okruženja <br>3. Instalirajte ovisnosti (uključujući razvojne): `uv pip install -r pyproject.toml --extra dev` |
| Korištenje `pip` | 1. Kreirajte virtualno okruženje: `python -m venv .venv` <br>2. Pokrenite VSCode naredbu "***Python: Select Interpreter***" i odaberite Python iz kreiranog virtualnog okruženja<br>3. Instalirajte ovisnosti (uključujući razvojne): `pip install -e .[dev]` |

Nakon postavljanja okruženja, možete pokrenuti server na vašem lokalnom računalu putem Agent Buildera kao MCP klijent da biste započeli:
1. Otvorite VS Code Debug panel. Odaberite `Debug in Agent Builder` ili pritisnite `F5` za početak ispravljanja MCP servera.
2. Koristite AI Toolkit Agent Builder za testiranje servera s [ovim upitom](../../../../../../../../../../../open_prompt_builder). Server će se automatski povezati s Agent Builderom.
3. Kliknite `Run` za testiranje servera s upitom.

**Čestitamo**! Uspješno ste pokrenuli Weather MCP Server na vašem lokalnom računalu putem Agent Buildera kao MCP klijenta.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Što je uključeno u predložak

| Mapa / Datoteka | Sadržaj                                         |
| ---------------- | ---------------------------------------------- |
| `.vscode`        | VSCode datoteke za ispravljanje pogrešaka     |
| `.aitk`          | Konfiguracije za AI Toolkit                     |
| `src`            | Izvorni kod za Weather MCP server               |

## Kako ispravljati Weather MCP Server

> Napomene:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizualni razvojni alat za testiranje i ispravljanje MCP servera.
> - Svi načini ispravljanja podržavaju točke prekida, tako da možete dodavati točke prekida u kod implementacije alata.

| Način ispravljanja | Opis | Koraci za debug |
| ------------------ | ----- | --------------- |
| Agent Builder | Ispravljanje MCP servera u Agent Builderu putem AI Toolkit-a. | 1. Otvorite VS Code Debug panel. Odaberite `Debug in Agent Builder` i pritisnite `F5` za početak ispravljanja MCP servera.<br>2. Koristite AI Toolkit Agent Builder za testiranje servera s [ovim upitom](../../../../../../../../../../../open_prompt_builder). Server će se automatski povezati s Agent Builderom.<br>3. Kliknite `Run` za testiranje servera s upitom. |
| MCP Inspector | Ispravljanje MCP servera pomoću MCP Inspectora. | 1. Instalirajte [Node.js](https://nodejs.org/)<br> 2. Postavite Inspector: `cd inspector` && `npm install` <br> 3. Otvorite VS Code Debug panel. Odaberite `Debug SSE in Inspector (Edge)` ili `Debug SSE in Inspector (Chrome)`. Pritisnite F5 za početak ispravljanja.<br> 4. Kada se MCP Inspector pokrene u pregledniku, kliknite gumb `Connect` za povezivanje ovog MCP servera.<br> 5. Zatim možete `List Tools`, odabrati alat, unijeti parametre i `Run Tool` za ispravljanje koda servera.<br> |

## Zadani portovi i prilagodbe

| Način ispravljanja | Portovi | Definicije | Prilagodbe | Napomena |
| ------------------ | -------- | ---------- | ----------- | -------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) za promjenu navedenih portova. | Nema |
| MCP Inspector | 3001 (Server); 5173 i 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) za promjenu navedenih portova.| Nema |

## Povratne informacije

Ako imate bilo kakve povratne informacije ili prijedloge za ovaj predložak, molimo otvorite problem na [AI Toolkit GitHub spremištu](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument je preveden pomoću AI usluge za prevođenje [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatizirani prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba se smatrati službenim i autoritativnim izvorom. Za važne informacije preporučujemo profesionalni ljudski prijevod. Nismo odgovorni za bilo kakve nesporazume ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->