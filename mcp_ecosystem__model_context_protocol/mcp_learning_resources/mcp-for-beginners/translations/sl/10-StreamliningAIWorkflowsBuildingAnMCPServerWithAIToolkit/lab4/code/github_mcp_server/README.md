# Weather MCP strežnik

To je vzorčni MCP strežnik v Pythonu, ki implementira vremenska orodja z lažnimi odgovori. Uporablja se lahko kot osnova za vaš lasten MCP strežnik. Vključuje naslednje funkcije:

- **Vremensko orodje**: Orodje, ki zagotavlja lažne vremenske informacije glede na dano lokacijo.
- **Orodje za kloniranje Git repozitorija**: Orodje, ki klonira git repozitorij v določeno mapo.
- **Orodje za odpiranje v VS Code**: Orodje, ki odpre mapo v VS Code ali VS Code Insiders.
- **Povezava z Agent Builderjem**: Funkcija, ki vam omogoča povezavo MCP strežnika z Agent Builderjem za testiranje in odpravljanje napak.
- **Odpiranje v [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Funkcija, ki vam omogoča odpravljanje napak MCP strežnika z uporabo MCP Inspectorja.

## Začetek z Weather MCP strežnikovo predlogo

> **Pogoji**
>
> Za zagon MCP strežnika na vašem lokalnem razvojni napravi potrebujete:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (zahtevano za orodje git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) ali [VS Code Insiders](https://code.visualstudio.com/insiders/) (zahtevano za orodje open_in_vscode)
> - (*neobvezno - če raje uporabljate uv*) [uv](https://github.com/astral-sh/uv)
> - [Razširitev za Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Priprava okolja

Za nastavitev okolja za ta projekt obstajata dva pristopa. Izberete lahko enega glede na vaše preference.

> Opomba: Ponovno naložite VSCode ali terminal, da zagotovite uporabo Pythona iz virtualnega okolja po kreiranju virtualnega okolja.

| Pristop      | Koraki                                              |
| ------------ | -------------------------------------------------- |
| Z uporabo `uv` | 1. Ustvari virtualno okolje: `uv venv` <br>2. Zaženi ukaz VSCode "***Python: Select Interpreter***" in izberi python iz ustvarjenega virtualnega okolja <br>3. Namesti odvisnosti (vključno z razvojnimi): `uv pip install -r pyproject.toml --extra dev` |
| Z uporabo `pip` | 1. Ustvari virtualno okolje: `python -m venv .venv` <br>2. Zaženi ukaz VSCode "***Python: Select Interpreter***" in izberi python iz ustvarjenega virtualnega okolja <br>3. Namesti odvisnosti (vključno z razvojnimi): `pip install -e .[dev]` |

Po nastavitvi okolja lahko strežnik zaženete na svoji lokalni razvojni napravi preko Agent Builderja kot MCP klienta za prvo uporabo:
1. Odprite debuggersko ploščo v VS Code. Izberite `Debug in Agent Builder` ali pritisnite `F5` za začetek odpravljanja napak MCP strežnika.
2. Uporabite AI Toolkit Agent Builder za test strežnika z [tem pozivom](../../../../../../../../../../../open_prompt_builder). Strežnik bo samodejno povezan z Agent Builderjem.
3. Kliknite `Run` za test strežnika z danim pozivom.

**Čestitamo**! Uspešno ste zagnali Weather MCP strežnik na svoji lokalni razvojni napravi preko Agent Builderja kot MCP klienta.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Kaj je vključeno v predlogo

| Mapa / Datoteka | Vsebina                                     |
| --------------- | ------------------------------------------- |
| `.vscode`       | Datoteke VSCode za odpravljanje napak      |
| `.aitk`         | Konfiguracije za AI Toolkit                  |
| `src`           | Izvorna koda za Weather MCP strežnik        |

## Kako odpraviti napake v Weather MCP strežniku

> Opombe:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizualno razvojno orodje za testiranje in odpravljanje napak MCP strežnikov.
> - Vsi načini odpravljanja napak podpirajo prekinitvene točke, zato lahko dodate prekinitvene točke v kodo orodij.

## Razpoložljiva orodja

### Vremensko orodje
Orodje `get_weather` zagotavlja lažne vremenske informacije za določeno lokacijo.

| Parameter  | Tip    | Opis                                           |
| ---------- | ------ | ---------------------------------------------- |
| `location` | niz    | Lokacija za pridobitev vremenskih podatkov (npr. ime mesta, država ali koordinate) |

### Orodje za kloniranje Git repozitorija
Orodje `git_clone_repo` klonira git repozitorij v določeno mapo.

| Parameter      | Tip    | Opis                                    |
| -------------- | ------ | ---------------------------------------|
| `repo_url`     | niz    | URL git repozitorija za kloniranje     |
| `target_folder`| niz    | Pot do mape, kamor naj bo repozitorij kloniran |

Orodje vrne JSON objekt z:
- `success`: Boolean, ki označuje, če je bila operacija uspešna
- `target_folder` ali `error`: Pot kloniranega repozitorija ali sporočilo o napaki

### Orodje za odpiranje v VS Code
Orodje `open_in_vscode` odpre mapo v aplikaciji VS Code ali VS Code Insiders.

| Parameter    | Tip     | Opis                                              |
| ------------ | ------- | ------------------------------------------------- |
| `folder_path`| niz     | Pot do mape, ki naj se odpre                       |
| `use_insiders` | boolean (neobvezno) | Ali uporabiti VS Code Insiders namesto običajnega VS Code |

Orodje vrne JSON objekt z:
- `success`: Boolean, ki označuje, če je bila operacija uspešna
- `message` ali `error`: Potrditveno sporočilo ali sporočilo o napaki

| Način odpravljanja | Opis                                                               | Koraki za odpravljanje napak                                                                       |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Agent Builder      | Odpravljanje MCP strežnika v Agent Builderju preko AI Toolkit.    | 1. Odprite debuggersko ploščo v VS Code. Izberite `Debug in Agent Builder` in pritisnite `F5` za začetek odpravljenja napak MCP strežnika.<br>2. Uporabite AI Toolkit Agent Builder za test strežnika z [tem pozivom](../../../../../../../../../../../open_prompt_builder). Strežnik bo samodejno povezan z Agent Builderjem.<br>3. Kliknite `Run` za test strežnika z danim pozivom. |
| MCP Inspector      | Odpravljanje MCP strežnika z uporabo MCP Inspectorja.              | 1. Namestite [Node.js](https://nodejs.org/)<br> 2. Nastavite Inspector: `cd inspector` && `npm install` <br> 3. Odprite debuggersko ploščo v VS Code. Izberite `Debug SSE in Inspector (Edge)` ali `Debug SSE in Inspector (Chrome)`. Pritisnite F5 za začetek odpravljanja.<br> 4. Ko se MCP Inspector zažene v brskalniku, kliknite gumb `Connect` za povezavo tega MCP strežnika.<br> 5. Nato lahko `List Tools`, izberete orodje, vnesete parametre in `Run Tool` za odpravljanje vaše kode strežnika.<br> |

## Privzeti priključki in prilagoditve

| Način odpravljanja | Priključki               | Definicije                               | Prilagoditve                                                                                          | Opomba |
| ------------------ | ----------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------ |
| Agent Builder      | 3001                    | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)        | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), da spremenite zgornje priključke. | N/A    |
| MCP Inspector      | 3001 (strežnik); 5173 in 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Uredite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), da spremenite zgornje priključke. | N/A    |

## Povratne informacije

Če imate kakršne koli povratne informacije ali predloge za to predlogo, odprite vprašanje na [AI Toolkit GitHub repozitorju](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo storitve za prevajanje z umetno inteligenco [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da avtomatski prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku velja za avtoritativni vir. Za kritične informacije priporočamo strokovni človeški prevod. Za morebitna nesporazume ali napačne razlage, ki izhajajo iz uporabe tega prevoda, ne odgovarjamo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->