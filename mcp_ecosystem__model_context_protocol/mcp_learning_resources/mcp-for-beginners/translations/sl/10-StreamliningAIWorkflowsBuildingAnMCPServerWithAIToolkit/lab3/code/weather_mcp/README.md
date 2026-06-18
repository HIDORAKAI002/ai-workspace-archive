# Weather MCP Server

To je vzorčni MCP strežnik v Pythonu, ki izvaja vremenska orodja z lažnimi odgovori. Uporablja se lahko kot osnova za vaš lasten MCP strežnik. Vključuje naslednje funkcije:

- **Vremensko orodje**: Orodje, ki zagotavlja lažne vremenske informacije glede na dano lokacijo.
- **Povezava z Agent Builderjem**: Funkcija, ki omogoča povezavo MCP strežnika z Agent Builderjem za testiranje in odpravljanje napak.
- **Odpravljanje napak v [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Funkcija, ki omogoča odpravljanje napak MCP strežnika z uporabo MCP Inspectorja.

## Začetek z Weather MCP Server predlogo

> **Pogoji**
>
> Za zagon MCP strežnika na lokalnem razvojnem računalniku potrebujete:
>
> - [Python](https://www.python.org/)
> - (*Neobvezno - če raje uporabljate uv*) [uv](https://github.com/astral-sh/uv)
> - [Razširitev za Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Priprava okolja

Obstajata dva pristopa za nastavitev okolja za ta projekt. Izberete lahko enega glede na svoje želje.

> Opomba: Ponovno naložite VSCode ali terminal, da zagotovite uporabo python iz virtualnega okolja po ustvarjanju virtualnega okolja.

| Pristop       | Koraki                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Uporaba `uv`  | 1. Ustvarite virtualno okolje: `uv venv` <br>2. Zaženite ukaz VSCode "***Python: Select Interpreter***" in izberite python iz ustvarjenega virtualnega okolja <br>3. Namestite odvisnosti (vključno z razvojnimi): `uv pip install -r pyproject.toml --extra dev` |
| Uporaba `pip` | 1. Ustvarite virtualno okolje: `python -m venv .venv` <br>2. Zaženite ukaz VSCode "***Python: Select Interpreter***" in izberite python iz ustvarjenega virtualnega okolja<br>3. Namestite odvisnosti (vključno z razvojnimi): `pip install -e .[dev]`                 |

Po nastavitvi okolja lahko strežnik zaženete na lokalnem razvojni računalniku preko Agent Builderja kot MCP klienta, da začnete:
1. Odprite razdelek za odpravljanje napak v VS Code. Izberite `Debug in Agent Builder` ali pritisnite `F5` za začetek odpravljanja napak MCP strežnika.
2. Uporabite Microsoft Foundry Toolkit Agent Builder za testiranje strežnika s [tem pozivom](../../../../../../../../../../../open_prompt_builder). Strežnik bo samodejno povezan z Agent Builderjem.
3. Kliknite `Run` za testiranje strežnika s pozivom.

**Čestitamo**! Uspešno ste zagnali Weather MCP Server na svojem lokalnem razvojni računalnik preko Agent Builderja kot MCP klienta.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Kaj je vključeno v predlogo

| Mapa / Datoteka | Vsebina                                    |
| --------------- | ------------------------------------------ |
| `.vscode`       | Datoteke za odpravljanje napak VSCode     |
| `.aitk`         | Konfiguracije za Microsoft Foundry Toolkit |
| `src`           | Izvorna koda za weather MCP strežnik      |

## Kako odpraviti napake Weather MCP Serverja

> Opombe:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizualno razvojno orodje za testiranje in odpravljanje napak MCP strežnikov.
> - Vsi načini odpravljanja napak podpirajo točke prekinitve, zato lahko dodate točke prekinitve v kodo implementacije orodja.

| Način odpravljanja napak | Opis | Koraki za odpravljanje napak |
| ----------------------- | ---- | ---------------------------- |
| Agent Builder            | Odpravljanje napak MCP strežnika v Agent Builderju preko Microsoft Foundry Toolkit. | 1. Odprite razdelek za odpravljanje napak v VS Code. Izberite `Debug in Agent Builder` in pritisnite `F5` za začetek odpravljanja napak MCP strežnika.<br>2. Uporabite Microsoft Foundry Toolkit Agent Builder za testiranje strežnika s [tem pozivom](../../../../../../../../../../../open_prompt_builder). Strežnik bo samodejno povezan z Agent Builderjem.<br>3. Kliknite `Run` za testiranje strežnika s pozivom. |
| MCP Inspector            | Odpravljanje napak MCP strežnika z uporabo MCP Inspectorja. | 1. Namestite [Node.js](https://nodejs.org/)<br> 2. Nastavite Inspector: `cd inspector` && `npm install` <br> 3. Odprite razdelek za odpravljanje napak v VS Code. Izberite `Debug SSE in Inspector (Edge)` ali `Debug SSE in Inspector (Chrome)`. Pritisnite F5 za začetek odpravljanja napak.<br> 4. Ko se MCP Inspector odpre v brskalniku, kliknite gumb `Connect` za povezavo s tem MCP strežnikom.<br> 5. Nato lahko `List Tools`, izberete orodje, vnesete parametre in `Run Tool` za odpravljanje napak vaše strežniške kode.<br> |

## Privzeti priključki in prilagoditve

| Način odpravljanja napak | Vrata  | Definicije                    | Prilagoditve                                                                                       | Opomba |
| ------------------------ | ------ | ---------------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| Agent Builder            | 3001   | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) za spremembo zgornjih vrat. | N/A    |
| MCP Inspector            | 3001 (strežnik); 5173 in 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) za spremembo zgornjih vrat. | N/A    |

## Povratne informacije

Če imate kakršnekoli povratne informacije ali predloge za to predlogo, odprite problem na [Microsoft Foundry Toolkit GitHub repozitoriju](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->