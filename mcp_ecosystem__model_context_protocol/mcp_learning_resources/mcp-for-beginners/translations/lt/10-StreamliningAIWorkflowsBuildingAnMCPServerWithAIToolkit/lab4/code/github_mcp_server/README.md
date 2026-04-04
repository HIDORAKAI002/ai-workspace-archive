# Weather MCP Server

Tai yra pavyzdinis MCP serveris Python kalba, įgyvendinantis orų įrankius su modeliuotais atsakymais. Jį galima naudoti kaip karkasą savo MCP serveriui kurti. Jame yra šios funkcijos:

- **Orų įrankis**: įrankis, teikiantis orų informaciją pagal pateiktą vietovę.
- **Git klonavimo įrankis**: įrankis, klonuojantis git repozitoriją į nurodytą aplanką.
- **VS Code atidarymo įrankis**: įrankis, atidarantis aplanką VS Code ar VS Code Insiders programoje.
- **Ryšys su Agent Builder**: funkcija leidžianti prijungti MCP serverį prie Agent Builder testavimui ir derinimui.
- **Derinimas [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: funkcija leidžianti derinti MCP serverį naudojant MCP Inspector.

## Pradėkite naudotis Weather MCP Server šablonu

> **Reikalavimai**
>
> Norint paleisti MCP serverį savo vietiniame vystymo kompiuteryje, reikės:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Reikalinga git_clone_repo įrankiui)
> - [VS Code](https://code.visualstudio.com/) arba [VS Code Insiders](https://code.visualstudio.com/insiders/) (Reikalinga open_in_vscode įrankiui)
> - (*Pasirinktinai - jei norite naudoti uv*) [uv](https://github.com/astral-sh/uv)
> - [Python derintuvo plėtinys](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Paruoškite aplinką

Yra du būdai paruošti šio projekto aplinką. Galite pasirinkti bet kurį pagal savo pageidavimus.

> Pastaba: Perkraukite VSCode arba terminalą, kad įsitikintumėte, jog naudojamas virtualios aplinkos python po jos sukūrimo.

| Būdas | Žingsniai |
| -------- | ----- |
| Naudojant `uv` | 1. Sukurkite virtualią aplinką: `uv venv` <br>2. Vykdykite VSCode komandą "***Python: Select Interpreter***" ir pasirinkite python iš sukurtos virtualios aplinkos <br>3. Įdiekite priklausomybes (įskaitant kūrimo priklausomybes): `uv pip install -r pyproject.toml --extra dev` |
| Naudojant `pip` | 1. Sukurkite virtualią aplinką: `python -m venv .venv` <br>2. Vykdykite VSCode komandą "***Python: Select Interpreter***" ir pasirinkite python iš sukurtos virtualios aplinkos <br>3. Įdiekite priklausomybes (įskaitant kūrimo priklausomybes): `pip install -e .[dev]` |

Paruošę aplinką, galite vietiniame vystymo kompiuteryje paleisti serverį per Agent Builder kaip MCP klientą, kad pradėtumėte:
1. Atidarykite VS Code derinimo panelę. Pasirinkite `Debug in Agent Builder` arba paspauskite `F5`, kad pradėtumėte derinti MCP serverį.
2. Naudokite AI Toolkit Agent Builder, kad išbandytumėte serverį su [šiuo užklausa](../../../../../../../../../../../open_prompt_builder). Serveris automatiškai prisijungs prie Agent Builder.
3. Spauskite `Run`, kad patikrintumėte serverį su užklausa.

**Sveikiname**! Sėkmingai paleidote Weather MCP Server vietiniame vystymo kompiuteryje per Agent Builder kaip MCP klientą.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Ką šablonas apima

| Aplankas / failas | Turinys                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode failai derinimui                      |
| `.aitk`      | AI Toolkit konfigūracijos                     |
| `src`        | Pagrindinis kodas orų mcp serveriui           |

## Kaip derinti Weather MCP Server

> Pastabos:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) yra vizualus kūrėjo įrankis MCP serverių testavimui ir derinimui.
> - Visos derinimo režimai palaiko taškus pertraukimui, tad galite pridėti pertraukimo taškus į įrankio įgyvendinimo kodą.

## Galimi įrankiai

### Orų įrankis
Įrankis `get_weather` teikia modeliuotą orų informaciją nustatytai vietovei.

| Parametras | Tipas | Aprašymas |
| --------- | ---- | ----------- |
| `location` | eilutė | Vietovė, kuriai gauti orų informaciją (pvz., miesto pavadinimas, valstija arba koordinatės) |

### Git klonavimo įrankis
Įrankis `git_clone_repo` klonuoja git repozitoriją į nurodytą aplanką.

| Parametras | Tipas | Aprašymas |
| --------- | ---- | ----------- |
| `repo_url` | eilutė | Git repozitorijos URL, kurią reikia klonuoti |
| `target_folder` | eilutė | Kelias į aplanką, kur reikia klonuoti repozitoriją |

Įrankis grąžina JSON objektą su:
- `success`: Boolean, nurodantis ar operacija buvo sėkminga
- `target_folder` arba `error`: Klonuotos repozitorijos kelias arba klaidos žinutė

### VS Code atidarymo įrankis
Įrankis `open_in_vscode` atidaro aplanką VS Code arba VS Code Insiders programoje.

| Parametras | Tipas | Aprašymas |
| --------- | ---- | ----------- |
| `folder_path` | eilutė | Kelias į aplanką, kurį reikia atidaryti |
| `use_insiders` | boolean (pasirinktinė) | Ar naudoti VS Code Insiders vietoje įprasto VS Code |

Įrankis grąžina JSON objektą su:
- `success`: Boolean, nurodantis ar operacija buvo sėkminga
- `message` arba `error`: Patvirtinimo žinutė arba klaidos pranešimas

| Derinimo režimas | Aprašymas | Derinimo žingsniai |
| ---------- | ----------- | --------------- |
| Agent Builder | Derinkite MCP serverį Agent Builder per AI Toolkit. | 1. Atidarykite VS Code derinimo panelę. Pasirinkite `Debug in Agent Builder` ir paspauskite `F5`, kad pradėtumėte derinti MCP serverį.<br>2. Naudokite AI Toolkit Agent Builder, kad išbandytumėte serverį su [šiuo užklausa](../../../../../../../../../../../open_prompt_builder). Serveris automatiškai prisijungs prie Agent Builder.<br>3. Spauskite `Run`, kad patikrintumėte serverį su užklausa. |
| MCP Inspector | Derinkite MCP serverį naudodami MCP Inspector. | 1. Įdiekite [Node.js](https://nodejs.org/)<br>2. Paruoškite Inspector aplinką: `cd inspector` && `npm install`<br>3. Atidarykite VS Code derinimo panelę. Pasirinkite `Debug SSE in Inspector (Edge)` arba `Debug SSE in Inspector (Chrome)`. Paspauskite F5, kad pradėtumėte derinimą.<br>4. Kai MCP Inspector startuos naršyklėje, spauskite mygtuką `Connect`, kad prijungtumėte šį MCP serverį.<br>5. Tada galite `List Tools`, pasirinkti įrankį, įvesti parametrus ir `Run Tool`, kad derintumėte serverio kodą.<br> |

## Numatyti prievadai ir pritaikymai

| Derinimo režimas | Prievadai | Aprašymai | Pritaikymai | Pastaba |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Redaguokite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) norėdami pakeisti aukščiau nurodytus prievadus. | Nėra |
| MCP Inspector | 3001 (Serveris); 5173 ir 3000 (Inspectorius) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Redaguokite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) norėdami pakeisti aukščiau nurodytus prievadus. | Nėra |

## Atsiliepimai

Jei turite pasiūlymų ar pastabų dėl šio šablono, prašome atidaryti klausimą [AI Toolkit GitHub saugykloje](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:  
Šis dokumentas buvo išverstas naudojant AI vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogaus vertimą. Mes neatsakome už bet kokius nesusipratimus ar klaidingas interpretacijas, kilusias naudojant šį vertimą.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->