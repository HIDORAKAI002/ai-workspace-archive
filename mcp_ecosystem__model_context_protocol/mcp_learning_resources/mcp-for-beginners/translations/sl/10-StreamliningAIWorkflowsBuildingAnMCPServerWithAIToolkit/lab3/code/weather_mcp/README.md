# Weather MCP strežnik

To je vzorčni MCP strežnik v Pythonu, ki izvaja vremenska orodja z lažnimi odgovori. Uporablja se lahko kot ogrodje za vaš lasten MCP strežnik. Vključuje naslednje funkcije:

- **Vremensko orodje**: Orodje, ki zagotavlja lažne vremenske informacije glede na dano lokacijo.
- **Povezava z Agent Builderjem**: Funkcija, ki omogoča povezavo MCP strežnika z Agent Builderjem za testiranje in odpravljanje napak.
- **Odpravljanje napak v [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Funkcija, ki omogoča odpravljanje napak MCP strežnika z uporabo MCP Inspectorja.

## Začnite z vzorcem Weather MCP strežnika

> **Predpogoji**
>
> Za zagon MCP strežnika na vaši lokalni razvojni napravi potrebujete:
>
> - [Python](https://www.python.org/)
> - (*Neobvezno - če želite uporabiti uv*) [uv](https://github.com/astral-sh/uv)
> - [Razširitev Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Priprava okolja

Obstajata dva pristopa za nastavitev okolja za ta projekt. Izberete lahko kateregakoli glede na svoje preference.

> Opomba: Ponovno naložite VSCode ali terminal, da zagotovite uporabo python iz virtualnega okolja po ustvarjanju virtualnega okolja.

| Pristop    | Koraki |
| --------- | ------- |
| Uporaba `uv` | 1. Ustvarite virtualno okolje: `uv venv` <br>2. Zaženite ukaz v VSCode "***Python: Select Interpreter***" in izberite python iz ustvarjenega virtualnega okolja <br>3. Namestite odvisnosti (vključno z razvojnimi odvisnostmi): `uv pip install -r pyproject.toml --extra dev` |
| Uporaba `pip` | 1. Ustvarite virtualno okolje: `python -m venv .venv` <br>2. Zaženite ukaz v VSCode "***Python: Select Interpreter***" in izberite python iz ustvarjenega virtualnega okolja<br>3. Namestite odvisnosti (vključno z razvojnimi odvisnostmi): `pip install -e .[dev]` |

Po nastavitvi okolja lahko strežnik zaženete na svoji lokalni razvojni napravi preko Agent Builderja kot MCP klienta za začetek:
1. Odprite Debug ploščo v VS Code. Izberite `Debug in Agent Builder` ali pritisnite `F5` za začetek odpravljanja napak MCP strežnika.
2. Uporabite AI Toolkit Agent Builder za testiranje strežnika z [tem pozivom](../../../../../../../../../../../open_prompt_builder). Strežnik bo samodejno povezan z Agent Builderjem.
3. Kliknite `Run`, da testirate strežnik z danim pozivom.

**Čestitamo**! Uspešno ste zagnali Weather MCP strežnik na svoji lokalni razvojni napravi preko Agent Builderja kot MCP klienta.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Kaj je vključeno v vzorec

| Mapa / Datoteka | Vsebina                                    |
| --------------- | ------------------------------------------- |
| `.vscode`       | Datoteke VSCode za odpravljanje napak      |
| `.aitk`         | Nastavitve za AI Toolkit                     |
| `src`           | Izvorna koda za vremenski MCP strežnik      |

## Kako odpraviti napake Weather MCP strežnika

> Opombe:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizualno orodje za razvijalce za testiranje in odpravljanje napak MCP strežnikov.
> - Vsi načini odpravljanja napak podpirajo prelome, zato lahko dodate prelome v kodo implementacije orodja.

| Način odpravljanja napak | Opis | Koraki za odpravljanje napak |
| ------------------------ | ----- | ---------------------------- |
| Agent Builder            | Odpravljanje napak MCP strežnika v Agent Builderju preko AI Toolkit. | 1. Odprite Debug ploščo v VS Code. Izberite `Debug in Agent Builder` in pritisnite `F5` za začetek odpravljanja napak MCP strežnika.<br>2. Uporabite AI Toolkit Agent Builder za testiranje strežnika z [tem pozivom](../../../../../../../../../../../open_prompt_builder). Strežnik bo samodejno povezan z Agent Builderjem.<br>3. Kliknite `Run`, da testirate strežnik z danim pozivom. |
| MCP Inspector           | Odpravljanje napak MCP strežnika z uporabo MCP Inspectorja. | 1. Namestite [Node.js](https://nodejs.org/)<br> 2. Nastavite Inspector: `cd inspector` && `npm install` <br> 3. Odprite Debug ploščo v VS Code. Izberite `Debug SSE in Inspector (Edge)` ali `Debug SSE in Inspector (Chrome)`. Pritisnite F5 za začetek odpravljanja.<br> 4. Ko se MCP Inspector zažene v brskalniku, kliknite gumb `Connect` za povezavo tega MCP strežnika.<br> 5. Nato lahko `List Tools`, izberete orodje, vnesete parametre in `Run Tool` za odpravljanje napak vaše strežniške kode.<br> |

## Privzeti priključki in prilagoditve

| Način odpravljanja napak | Priključki | Definicije | Prilagoditve | Opomba |
| ------------------------ | ---------- | ----------- | ------------ | ------- |
| Agent Builder           | 3001       | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) za spremembo zgornjih priključkov. | N/A |
| MCP Inspector           | 3001 (strežnik); 5173 in 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) za spremembo zgornjih priključkov. | N/A |

## Povratne informacije

Če imate kakršne koli povratne informacije ali predloge glede tega vzorca, odprite zadevo na [AI Toolkit GitHub repozitoriju](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Opozorilo**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatski prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku naj se šteje za avtoritativni vir. Za ključne informacije priporočamo strokovni človeški prevod. Ne odgovarjamo za morebitne nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->