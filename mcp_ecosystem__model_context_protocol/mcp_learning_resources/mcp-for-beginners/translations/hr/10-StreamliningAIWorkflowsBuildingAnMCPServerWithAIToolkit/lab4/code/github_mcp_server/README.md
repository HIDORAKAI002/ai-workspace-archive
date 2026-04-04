# Weather MCP Server

Ovo je primjer MCP Servera u Pythonu koji implementira alate za vremensku prognozu s lažnim odgovorima. Može se koristiti kao osnova za vlastiti MCP Server. Uključuje sljedeće značajke:

- **Weather Tool**: alat koji pruža lažne vremenske informacije na temelju zadane lokacije.
- **Git Clone Tool**: alat koji klonira git repozitorij u određenu mapu.
- **VS Code Open Tool**: alat koji otvara mapu u VS Code ili VS Code Insiders.
- **Connect to Agent Builder**: značajka koja vam omogućuje povezivanje MCP servera s Agent Builderom za testiranje i otklanjanje pogrešaka.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: značajka koja vam omogućuje otklanjanje pogrešaka MCP Servera pomoću MCP Inspectora.

## Početak rada s Weather MCP Server predloškom

> **Preduvjeti**
>
> Za pokretanje MCP Servera na vašem lokalnom razvojnom računalu, potrebni su vam:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (potrebno za alat git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) ili [VS Code Insiders](https://code.visualstudio.com/insiders/) (potrebno za alat open_in_vscode)
> - (*Opcionalno - ako preferirate uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Priprema okruženja

Postoje dva pristupa za postavljanje okruženja za ovaj projekt. Možete odabrati onaj koji vam više odgovara.

> Napomena: Ponovno učitajte VSCode ili terminal kako biste osigurali korištenje Python virtualnog okruženja nakon stvaranja virtualnog okruženja.

| Pristup | Koraci |
| -------- | ----- |
| Korištenje `uv` | 1. Kreirajte virtualno okruženje: `uv venv` <br>2. Pokrenite VSCode naredbu "***Python: Select Interpreter***" i odaberite Python iz kreiranog virtualnog okruženja <br>3. Instalirajte ovisnosti (uključujući razvojne): `uv pip install -r pyproject.toml --extra dev` |
| Korištenje `pip` | 1. Kreirajte virtualno okruženje: `python -m venv .venv` <br>2. Pokrenite VSCode naredbu "***Python: Select Interpreter***" i odaberite Python iz kreiranog virtualnog okruženja<br>3. Instalirajte ovisnosti (uključujući razvojne): `pip install -e .[dev]` |

Nakon postavljanja okruženja, možete pokrenuti server na svom lokalnom razvojnom računalu putem Agent Buildera kao MCP klijenta za početak rada:
1. Otvorite VS Code Debug panel. Odaberite `Debug in Agent Builder` ili pritisnite `F5` za početak otklanjanja pogrešaka MCP servera.
2. Koristite AI Toolkit Agent Builder za testiranje servera s [ovim promptom](../../../../../../../../../../../open_prompt_builder). Server će biti automatski povezan s Agent Builderom.
3. Kliknite `Run` za testiranje servera s promptom.

**Čestitamo**! Uspješno ste pokrenuli Weather MCP Server na svom lokalnom razvojnom računalu putem Agent Buildera kao MCP klijenta.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Što je uključeno u predložak

| Mapa / Datoteka | Sadržaj                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode datoteke za otklanjanje pogrešaka                   |
| `.aitk`      | Konfiguracije za AI Toolkit                |
| `src`        | Izvorni kod za weather mcp server          |

## Kako otkloniti pogreške Weather MCP Servera

> Napomene:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizualni alat za programere za testiranje i otklanjanje pogrešaka MCP servera.
> - Svi načini otklanjanja pogrešaka podržavaju prekidne točke, pa možete postaviti prekidne točke u kod implementacije alata.

## Dostupni alati

### Weather Tool
Alat `get_weather` pruža lažne vremenske informacije za određenu lokaciju.

| Parametar | Tip | Opis |
| --------- | ---- | ----------- |
| `location` | string | Lokacija za koju se traži vremenska prognoza (npr. ime grada, država ili koordinate) |

### Git Clone Tool
Alat `git_clone_repo` klonira git repozitorij u određenu mapu.

| Parametar | Tip | Opis |
| --------- | ---- | ----------- |
| `repo_url` | string | URL git repozitorija koji se klonira |
| `target_folder` | string | Put do mape u koju će se repozitorij klonirati |

Alat vraća JSON objekt s:
- `success`: Boolean koji označava je li operacija bila uspješna
- `target_folder` ili `error`: Put kloniranog repozitorija ili poruka o pogrešci

### VS Code Open Tool
Alat `open_in_vscode` otvara mapu u VS Code ili VS Code Insiders aplikaciji.

| Parametar | Tip | Opis |
| --------- | ---- | ----------- |
| `folder_path` | string | Put do mape koja se otvara |
| `use_insiders` | boolean (opcionalno) | Koristiti li VS Code Insiders umjesto regularnog VS Code-a |

Alat vraća JSON objekt s:
- `success`: Boolean koji označava je li operacija bila uspješna
- `message` ili `error`: Potvrda ili poruka o pogrešci

| Način otklanjanja pogrešaka | Opis | Koraci za otklanjanje pogrešaka |
| ---------- | ----------- | --------------- |
| Agent Builder | Otklanjanje pogrešaka MCP servera u Agent Builderu putem AI Toolkit-a. | 1. Otvorite VS Code Debug panel. Odaberite `Debug in Agent Builder` i pritisnite `F5` za početak otklanjanja pogrešaka MCP servera.<br>2. Koristite AI Toolkit Agent Builder za testiranje servera s [ovim promptom](../../../../../../../../../../../open_prompt_builder). Server će biti automatski povezan s Agent Builderom.<br>3. Kliknite `Run` za testiranje servera s promptom. |
| MCP Inspector | Otklanjanje pogrešaka MCP servera koristeći MCP Inspector. | 1. Instalirajte [Node.js](https://nodejs.org/)<br> 2. Postavite Inspector: `cd inspector` && `npm install` <br> 3. Otvorite VS Code Debug panel. Odaberite `Debug SSE in Inspector (Edge)` ili `Debug SSE in Inspector (Chrome)`. Pritisnite F5 za početak otklanjanja pogrešaka.<br> 4. Kada se MCP Inspector pokrene u pregledniku, kliknite gumb `Connect` da povežete ovaj MCP server.<br> 5. Zatim možete `List Tools`, odabrati alat, unijeti parametre i `Run Tool` za otklanjanje pogrešaka vašeg koda.<br> |

## Zadani portovi i prilagodbe

| Način otklanjanja pogrešaka | Portovi | Definicije | Prilagodbe | Napomena |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) za promjenu navedenih portova. | N/A |
| MCP Inspector | 3001 (Server); 5173 i 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) za promjenu navedenih portova.| N/A |

## Povratne informacije

Ako imate bilo kakve povratne informacije ili prijedloge za ovaj predložak, molimo otvorite issue na [AI Toolkit GitHub spremištu](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:  
Ovaj dokument je preveden pomoću AI prevoditeljske usluge [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati službenim i autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakva nesporazuma ili pogrešna tumačenja proizašla iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->