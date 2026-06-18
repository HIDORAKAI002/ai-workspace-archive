# Weather MCP Server

Tai yra pavyzdinis MCP serveris Python, įgyvendinantis oro sąlygų įrankius su modeliuotais atsakymais. Jis gali būti naudojamas kaip karkasas jūsų pačių MCP serveriui. Jame yra šios funkcijos:

- **Oro sąlygų įrankis**: įrankis, teikiantis modeliuotą oro sąlygų informaciją pagal nurodytą vietą.
- **Prisijungti prie Agent Builder**: funkcija, leidžianti prijungti MCP serverį prie Agent Builder testavimui ir derinimui.
- **Derinti [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: funkcija, leidžianti derinti MCP serverį naudojant MCP Inspector.

## Pradėkite naudoti Weather MCP Server šabloną

> **Reikalavimai**
>
> Norint paleisti MCP serverį vietiniame kūrimo kompiuteryje, reikės:
>
> - [Python](https://www.python.org/)
> - (*Pasirenkama - jei pageidaujate uv*) [uv](https://github.com/astral-sh/uv)
> - [Python derintuvo plėtinys](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Paruoškite aplinką

Yra du būdai šio projekto aplinkai paruošti. Galite pasirinkti bet kurį pagal savo pageidavimą.

> Pastaba: perkraukite VSCode arba terminalą, kad po virtualios aplinkos sukūrimo būtų naudojamas virtualios aplinkos Python.

| Būdas    | Veiksmai |
| -------- | -------- |
| Naudojant `uv` | 1. Sukurkite virtualią aplinką: `uv venv` <br>2. Paleiskite VSCode komandą "***Python: Select Interpreter***" ir pasirinkite virtualios aplinkos Python<br>3. Įdiekite priklausomybes (įskaitant kūrimo priklausomybes): `uv pip install -r pyproject.toml --extra dev` |
| Naudojant `pip` | 1. Sukurkite virtualią aplinką: `python -m venv .venv` <br>2. Paleiskite VSCode komandą "***Python: Select Interpreter***" ir pasirinkite virtualios aplinkos Python<br>3. Įdiekite priklausomybes (įskaitant kūrimo priklausomybes): `pip install -e .[dev]` |

Paruošę aplinką, galite paleisti serverį vietiniame kūrimo kompiuteryje per Agent Builder kaip MCP klientą, kad pradėtumėte:
1. Atidarykite VS Code Derinimo (Debug) skydelį. Pasirinkite `Debug in Agent Builder` arba paspauskite `F5`, kad pradėtumėte MCP serverio derinimą.
2. Naudokite Microsoft Foundry Toolkit Agent Builder, kad išbandytumėte serverį su [šiuo klausinimu](../../../../../../../../../../../open_prompt_builder). Serveris automatiškai prisijungs prie Agent Builder.
3. Spustelėkite `Run`, kad išbandytumėte serverį su klausimu.

**Sveikiname**! Jūs sėkmingai paleidote Weather MCP Server vietiniame kūrimo kompiuteryje per Agent Builder kaip MCP klientą.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Ką šablone rasite

| Aplankas / Failas | Turinys                                     |
| ----------------- | ------------------------------------------- |
| `.vscode`         | VSCode failai derinimui                      |
| `.aitk`           | Konfigūracijos Microsoft Foundry Toolkit   |
| `src`             | Weather MCP serverio šaltinio kodas          |

## Kaip derinti Weather MCP Server

> Pastabos:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) yra vizualus kūrėjo įrankis MCP serverių testavimui ir derinimui.
> - Visi derinimo režimai palaiko pertraukos taškus (breakpoints), tad galite pridėti pertraukos taškus į įrankio įgyvendinimo kodą.

| Derinimo režimas | Aprašymas | Derinimo žingsniai |
| ---------------- | --------- | ------------------ |
| Agent Builder    | Derinkite MCP serverį Agent Builder aplinkoje per Microsoft Foundry Toolkit. | 1. Atidarykite VS Code Derinimo skydelį. Pasirinkite `Debug in Agent Builder` ir paspauskite `F5`, kad pradėtumėte MCP serverio derinimą.<br>2. Naudokite Microsoft Foundry Toolkit Agent Builder, kad išbandytumėte serverį su [šiuo klausinimu](../../../../../../../../../../../open_prompt_builder). Serveris automatiškai prisijungs prie Agent Builder.<br>3. Spustelėkite `Run`, kad išbandytumėte serverį su klausimu. |
| MCP Inspector   | Derinkite MCP serverį naudodami MCP Inspector. | 1. Įdiekite [Node.js](https://nodejs.org/)<br> 2. Paruoškite Inspector: `cd inspector` && `npm install` <br> 3. Atidarykite VS Code Derinimo skydelį. Pasirinkite `Debug SSE in Inspector (Edge)` arba `Debug SSE in Inspector (Chrome)`. Paspauskite F5, kad pradėtumėte derinimą.<br> 4. Kai MCP Inspector atsidarys naršyklėje, spustelėkite mygtuką `Connect`, kad prijungtumėte šį MCP serverį.<br> 5. Tada galite `List Tools`, pasirinkti įrankį, įvesti parametrus ir `Run Tool`, kad derintumėte savo serverio kodą.<br> |

## Numatyti prievadai ir pritaikymai

| Derinimo režimas | Prievadai | Aprašymai | Pritaikymai | Pastaba |
| ---------------- | --------- | --------- | ----------- | ------- |
| Agent Builder    | 3001      | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Redaguokite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), kad pakeistumėte aukščiau nurodytus prievadus. | N/A |
| MCP Inspector    | 3001 (Server); 5173 ir 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Redaguokite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), kad pakeistumėte aukščiau nurodytus prievadus. | N/A |

## Atsiliepimai

Jei turite kokių nors atsiliepimų ar pasiūlymų dėl šio šablono, prašome atidaryti problemą [Microsoft Foundry Toolkit GitHub saugykloje](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->