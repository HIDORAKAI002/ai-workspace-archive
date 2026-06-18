# Weather MCP Server

Ovo je primjer MCP Servera u Pythonu koji implementira alate za vremensku prognozu s lažnim odgovorima. Može se koristiti kao osnova za vaš vlastiti MCP Server. Uključuje sljedeće značajke:

- **Weather Tool**: alat koji pruža lažne informacije o vremenu na temelju zadane lokacije.
- **Povezivanje s Agent Builderom**: značajka koja vam omogućuje povezivanje MCP servera s Agent Builderom radi testiranja i otklanjanja pogrešaka.
- **Debugiranje u [MCP Inspectoru](https://github.com/modelcontextprotocol/inspector)**: značajka koja vam omogućuje debugiranje MCP Servera pomoću MCP Inspectora.

## Početak rada s Weather MCP Server predloškom

> **Preduvjeti**
>
> Za pokretanje MCP Servera na vašem lokalnom razvojnom računalu trebat će vam:
>
> - [Python](https://www.python.org/)
> - (*Opcionalno - ako preferirate uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Priprema okoline

Postoje dva pristupa za postavljanje okoline za ovaj projekt. Možete odabrati jedan ovisno o vašim preferencijama.

> Napomena: Ponovno pokrenite VSCode ili terminal kako biste osigurali da se koristi Python iz virtualnog okruženja nakon što stvorite virtualno okruženje.

| Pristup | Koraci |
| -------- | ----- |
| Korištenje `uv` | 1. Stvorite virtualno okruženje: `uv venv` <br>2. Pokrenite VSCode naredbu "***Python: Select Interpreter***" i odaberite Python iz stvorenog virtualnog okruženja <br>3. Instalirajte ovisnosti (uključujući razvojne): `uv pip install -r pyproject.toml --extra dev` |
| Korištenje `pip` | 1. Stvorite virtualno okruženje: `python -m venv .venv` <br>2. Pokrenite VSCode naredbu "***Python: Select Interpreter***" i odaberite Python iz stvorenog virtualnog okruženja<br>3. Instalirajte ovisnosti (uključujući razvojne): `pip install -e .[dev]` |

Nakon što postavite okruženje, možete pokrenuti server na vašem lokalnom razvojnom računalu putem Agent Buildera kao MCP Klijenta za početak:
1. Otvorite VS Code Debug panel. Odaberite `Debug in Agent Builder` ili pritisnite `F5` za početak debugiranja MCP servera.
2. Koristite Microsoft Foundry Toolkit Agent Builder za testiranje servera s [ovim upitom](../../../../../../../../../../../open_prompt_builder). Server će se automatski povezati s Agent Builderom.
3. Kliknite `Run` za testiranje servera s upitom.

**Čestitamo**! Uspješno ste pokrenuli Weather MCP Server na svom lokalnom razvojnom računalu putem Agent Buildera kao MCP Klijenta.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Što je uključeno u predložak

| Mapа / Datoteka | Sadržaj                                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode datoteke za debugiranje               |
| `.aitk`      | Konfiguracije za Microsoft Foundry Toolkit   |
| `src`        | Izvorni kod za weather mcp server             |

## Kako debugirati Weather MCP Server

> Napomene:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizualni alat za razvijatelje za testiranje i debugiranje MCP servera.
> - Svi načini debugiranja podržavaju točke prekida (breakpoints), tako da možete dodavati točke prekida u kod implementacije alata.

| Način debugiranja | Opis | Koraci za debugiranje |
| ---------- | ----------- | --------------- |
| Agent Builder | Debugiranje MCP servera u Agent Builderu preko Microsoft Foundry Toolkita. | 1. Otvorite VS Code Debug panel. Odaberite `Debug in Agent Builder` i pritisnite `F5` za početak debugiranja MCP servera.<br>2. Koristite Microsoft Foundry Toolkit Agent Builder za testiranje servera s [ovim upitom](../../../../../../../../../../../open_prompt_builder). Server će se automatski povezati s Agent Builderom.<br>3. Kliknite `Run` za testiranje servera s upitom. |
| MCP Inspector | Debugiranje MCP servera koristeći MCP Inspector. | 1. Instalirajte [Node.js](https://nodejs.org/)<br> 2. Postavljanje Inspectora: `cd inspector` && `npm install` <br> 3. Otvorite VS Code Debug panel. Odaberite `Debug SSE in Inspector (Edge)` ili `Debug SSE in Inspector (Chrome)`. Pritisnite F5 za početak debugiranja.<br> 4. Kad se MCP Inspector pokrene u pregledniku, kliknite gumb `Connect` za povezivanje s ovim MCP serverom.<br> 5. Zatim možete `List Tools`, odabrati alat, unijeti parametre i `Run Tool` za debugiranje vašeg server koda.<br> |

## Zadani portovi i prilagodbe

| Način debugiranja | Portovi | Definicije | Prilagodbe | Napomena |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) za promjenu gore navedenih portova. | N/A |
| MCP Inspector | 3001 (Server); 5173 i 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) za promjenu gore navedenih portova.| N/A |

## Povratne informacije

Ako imate bilo kakve povratne informacije ili prijedloge za ovaj predložak, otvorite pitanja (issues) na [Microsoft Foundry Toolkit GitHub spremištu](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->