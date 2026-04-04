# Weather MCP Server

Tai pavyzdinis MCP serveris parašytas Python kalba, kuris įgyvendina orų įrankius su imituotais atsakymais. Jis gali būti naudojamas kaip šablonas jūsų MCP serveriui. Šiame serveryje yra šios funkcijos:

- **Orų įrankis**: įrankis, kuris pateikia imituotą orų informaciją pagal nurodytą vietą.
- **Jungtis su Agent Builder**: funkcija, leidžianti prijungti MCP serverį prie Agent Builder testavimui ir derinimui.
- **Derinimas naudojant [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: funkcija, leidžianti derinti MCP serverį naudojant MCP Inspector.

## Pradėkite naudotis Weather MCP Server šablonu

> **Reikalavimai**
>
> Norėdami paleisti MCP serverį savo vietiniame kūrimo kompiuteryje, jums reikės:
>
> - [Python](https://www.python.org/)
> - (*Pasirinktinai - jei norite naudoti uv*) [uv](https://github.com/astral-sh/uv)
> - [Python derintuvo plėtinys](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Pasiruoškite aplinką

Yra du būdai paruošti aplinką šiam projektui. Galite pasirinkti vieną iš jų pagal savo pageidavimus.

> Pastaba: Perkraukite VSCode arba terminalą, kad po virtualios aplinkos sukūrimo būtų naudojamas virtualios aplinkos python.

| Būdas | Veiksmai |
| -------- | ----- |
| Naudojant `uv` | 1. Sukurkite virtualią aplinką: `uv venv` <br>2. Paleiskite VSCode komandą "***Python: Select Interpreter***" ir pasirinkite python iš sukurto virtualios aplinkos <br>3. Įdiekite priklausomybes (įskaitant vystymo priklausomybes): `uv pip install -r pyproject.toml --extra dev` |
| Naudojant `pip` | 1. Sukurkite virtualią aplinką: `python -m venv .venv` <br>2. Paleiskite VSCode komandą "***Python: Select Interpreter***" ir pasirinkite python iš sukurto virtualios aplinkos<br>3. Įdiekite priklausomybes (įskaitant vystymo priklausomybes): `pip install -e .[dev]` |

Paruošę aplinką galite paleisti serverį savo vietiniame kūrimo kompiuteryje per Agent Builder kaip MCP klientą, kad pradėtumėte darbą:
1. Atidarykite VS Code derinimo skydelį. Pasirinkite `Debug in Agent Builder` arba paspauskite `F5`, kad pradėtumėte derinti MCP serverį.
2. Naudokite AI Toolkit Agent Builder, kad išbandytumėte serverį su [šiuo užklausa](../../../../../../../../../../../open_prompt_builder). Serveris automatiškai prisijungs prie Agent Builder.
3. Spustelėkite `Run`, kad išbandytumėte serverį su užklausa.

**Sveikiname**! Sėkmingai paleidote Weather MCP serverį savo vietiniame kūrimo kompiuteryje per Agent Builder kaip MCP klientą.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Šablone įtrauktos dalys

| Aplankas / Failas | Turinys                                  |
| ----------------- | ---------------------------------------- |
| `.vscode`         | VSCode failai derinimui                   |
| `.aitk`           | AI Toolkit konfigūracijos                  |
| `src`             | Weather MCP serverio pradinio kodo katalogas |

## Kaip derinti Weather MCP Server

> Pastabos:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) yra vizualus kūrėjo įrankis MCP serveriams testuoti ir derinti.
> - Visos derinimo režimai palaiko sustabdymo taškus, todėl galite pridėti sustabdymo taškus į įrankio įgyvendinimo kodą.

| Derinimo režimas | Aprašymas | Derinimo žingsniai |
| ---------------- | --------- | ------------------ |
| Agent Builder | Derinkite MCP serverį Agent Builder per AI Toolkit. | 1. Atidarykite VS Code derinimo skydelį. Pasirinkite `Debug in Agent Builder` ir paspauskite `F5`, kad pradėtumėte derinti MCP serverį.<br>2. Naudokite AI Toolkit Agent Builder, kad išbandytumėte serverį su [šią užklausa](../../../../../../../../../../../open_prompt_builder). Serveris automatiškai prisijungs prie Agent Builder.<br>3. Spustelėkite `Run`, kad išbandytumėte serverį su užklausa. |
| MCP Inspector | Derinkite MCP serverį naudodami MCP Inspector. | 1. Įdiekite [Node.js](https://nodejs.org/)<br> 2. Paruoškite Inspector: `cd inspector` && `npm install` <br> 3. Atidarykite VS Code derinimo skydelį. Pasirinkite `Debug SSE in Inspector (Edge)` arba `Debug SSE in Inspector (Chrome)`. Paspauskite F5, kad pradėtumėte derinimą.<br> 4. Kai MCP Inspector paleidžiamas naršyklėje, spustelėkite mygtuką `Connect`, kad prisijungtumėte prie šio MCP serverio.<br> 5. Tada galite naudoti `List Tools`, pasirinkti įrankį, įvesti parametrus ir spustelėti `Run Tool`, kad derintumėte serverio kodą.<br> |

## Numatyti prievadai ir pritaikymai

| Derinimo režimas | Prievadai | Aprašymai | Pritaikymai | Pastaba |
| ---------------- | --------- | --------- | ----------- | ------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Redaguokite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), jei norite pakeisti aukščiau nurodytus prievadus. | Nėra |
| MCP Inspector | 3001 (Serveris); 5173 ir 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Redaguokite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), jei norite pakeisti aukščiau nurodytus prievadus. | Nėra |

## Atsiliepimai

Jei turite atsiliepimų ar pasiūlymų šiam šablonui, prašome atidaryti iškilusią problemą [AI Toolkit GitHub saugykloje](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:  
Šis dokumentas išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Pirminis dokumentas originalia kalba laikomas patikimiausiu šaltiniu. Svarbiai informacijai rekomenduojama pasitelkti profesionalų žmogaus vertimą. Mes neatsakome už bet kokius nesusipratimus ar klaidingą interpretavimą, kilusį naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->